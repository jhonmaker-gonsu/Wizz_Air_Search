#!/usr/bin/env node

/**
 * Rebuilds data.js from Wizz Air's All You Can Fly availability PDF.
 * Usage: node scripts/update-routes-from-pdf.js <availability.pdf> [--root <dir>] [--dry-run]
 *
 *   --root <dir>  operate on data.js / index.html / README.md / auto-added-airports.json in <dir>
 *                 (default: the repository root)
 *   --dry-run     compute everything and print a summary, but write no files
 *
 * Environment: GEMINI_API_KEY (optional, AI fallback for new airports),
 *              AUTO_ADD_AIRPORTS=false (kill switch for automatic airport registration),
 *              AUTOADD_BUDGET_MS (global wall-clock budget for all auto-add network work, default 360000),
 *              AUTOADD_PROBE=true (report reachability of the auto-add data sources).
 */
const { execFileSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { autoAddAirports } = require('./lib/autoadd');
const B = require('./lib/budget');
const { addAirport: defaultAddAirport, loadData, selfCheck } = require('./lib/datajs-insert');

const aliases = {
    'Aalesund': 'Alesund',
    'Basel/Mulhouse': 'Basel-Mulhouse',
    'Brussels': 'Brussels Charleroi',
    'Chania': 'Chania (Crete)',
    'Cluj': 'Cluj-Napoca',
    'Cologne/Bonn': 'Cologne',
    'Faro': 'Faro (Algarve)',
    'Giza': 'Cairo (Sphinx)',
    'Heraklion': 'Heraklion (Crete)',
    'Kefallinia': 'Kefalonia',
    'Kerkyra': 'Corfu',
    'Klaipeda/Palanga': 'Palanga',
    'Kosice': 'Košice',
    'Leeds/Bradford': 'Leeds',
    'Madeira': 'Funchal (Madeira)',
    'Malmo': 'Malmö',
    'Nis': 'Niš',
    'Palma De Mallorca': 'Mallorca',
    'Poprad/Tatry': 'Poprad-Tatry',
    'Rzeszow': 'Rzeszów',
    'Sharm el-Sheikh': 'Sharm El Sheikh',
    'Szczytno': 'Olsztyn-Mazury',
    'Targu-Mures': 'Târgu-Mures',
    'Tromso': 'Tromsø',
    'Zakinthos Island': 'Zakynthos'
};

function parsePdfRoutes(text) {
    const pairs = [];
    for (const line of text.replace(/\f/g, '\n').split(/\r?\n/)) {
        if (/Departure period:|Last run:|Please note:|Terms & Conditions|Departure City|Page \d/.test(line)) continue;
        const columns = line.trim().split(/\s{2,}/);
        if (columns.length !== 2 && columns.length !== 4) continue;

        for (let index = 0; index < columns.length; index += 2) {
            if (!/^\d{4}-\d{2}-\d{2}/.test(columns[index])) {
                pairs.push([aliases[columns[index]] || columns[index], aliases[columns[index + 1]] || columns[index + 1]]);
            }
        }
    }
    return pairs;
}

// Normalizes a name for fuzzy comparison: lowercase, fold known diacritics that
// NFKD won't decompose, strip combining marks, then strip everything but [a-z0-9].
function normalizeAirportName(name) {
    if (!name) return '';
    const diacriticMap = { 'ø': 'o', 'æ': 'ae', 'ß': 'ss', 'ł': 'l', 'đ': 'd' };
    let text = name.toLowerCase();
    text = [...text].map((ch) => diacriticMap[ch] || ch).join('');
    text = text.normalize('NFKD');
    text = text.replace(/[̀-ͯ]/g, '');
    text = text.replace(/[^a-z0-9]/g, '');
    return text;
}

// Every normalized form a name could plausibly be written as: the whole string,
// the string with parenthetical groups removed, and (for either) each "/"-separated
// segment. The CONTENTS of a parenthetical group are deliberately NOT a variant: a
// qualifier such as "(Algarve)" or "(Crete)" is shared by different airports, so
// "Portimao (Algarve)" must never resolve to "Faro (Algarve)" through it alone.
function nameVariants(name) {
    if (!name) return new Set();
    const rawVariants = new Set([name]);
    rawVariants.add(name.replace(/\([^)]*\)/g, ''));

    const expanded = new Set(rawVariants);
    for (const v of rawVariants) {
        if (v.includes('/')) {
            for (const part of v.split('/')) expanded.add(part);
        }
    }

    const variants = new Set();
    for (const v of expanded) {
        const norm = normalizeAirportName(v);
        if (norm) variants.add(norm);
    }
    return variants;
}

const RAW_BLOCK_RE = /    const rawFlightData = `[^`]*`/s;
const DEFAULT_ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
    const args = { pdf: null, root: DEFAULT_ROOT, dryRun: false };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--root') args.root = path.resolve(argv[++i] || '');
        else if (a === '--dry-run') args.dryRun = true;
        else if (!args.pdf) args.pdf = a;
    }
    return args;
}

const sha256 = (text) => crypto.createHash('sha256').update(text).digest('hex');
const oneLine = (s) => String(s).replace(/[\r\n%]+/g, ' ');

/**
 * Checks that every airport used in the routes has a complete registry entry.
 * Returns [{name, gaps:[...]}]. Never throws; never fails the job.
 */
function checkMetadata(dataSourceText, routesList) {
    const D = loadData(dataSourceText);
    const names = [...new Set(routesList.flatMap((route) => route.split(' - ')))].sort((a, b) => a.localeCompare(b));
    const result = [];
    for (const name of names) {
        const code = D.airportCodes[name];
        const gaps = [];
        if (!code) gaps.push('airportCodes');
        if (!D.cityNames[name]) gaps.push('cityNames');
        if (!D.countryMap[name]) gaps.push('countryMap');
        if (!D.regionMap[name]) gaps.push('regionMap');
        if (typeof D.schengenMap[name] !== 'boolean') gaps.push('schengenMap');
        if (!D.airportGoogleMap[name]) gaps.push('airportGoogleMap');
        if (!code || !D.airportFullNames[code]) gaps.push('airportFullNames');
        if (gaps.length) result.push({ name, gaps });
    }
    return { gapList: result, airportCount: names.length };
}

async function main(argv, env = process.env, deps = {}) {
    const args = parseArgs(argv);
    if (!args.pdf) {
        throw new Error('Usage: node scripts/update-routes-from-pdf.js <availability.pdf> [--root <dir>] [--dry-run]');
    }
    const pdfPath = args.pdf;
    const root = args.root;
    const dataPath = path.join(root, 'data.js');
    const indexPath = path.join(root, 'index.html');
    const readmePath = path.join(root, 'README.md');
    const addedLogPath = path.join(root, 'auto-added-airports.json');
    const summary = (text) => { if (env.GITHUB_STEP_SUMMARY) fs.appendFileSync(env.GITHUB_STEP_SUMMARY, text); };
    const pdfText = typeof deps.pdfText === 'string' ? deps.pdfText : execFileSync('pdftotext', ['-layout', pdfPath, '-'], { encoding: 'utf8' });
    const addAirport = deps.addAirport || defaultAddAirport;

    const originalSource = fs.readFileSync(dataPath, 'utf8');
    const dataBlock = originalSource.match(RAW_BLOCK_RE);
    if (!dataBlock) throw new Error('Could not find rawFlightData in data.js.');

    const airportCodesBlock = originalSource.match(/const airportCodes = (\{[\s\S]*?\n    \});/);
    if (!airportCodesBlock) throw new Error('Could not find airportCodes in data.js.');
    const airportNames = new Set([...airportCodesBlock[1].matchAll(/^        '([^']+)':/gm)].map((match) => match[1]));
    const previousRoutes = dataBlock[0].match(/`([\s\S]*)`/)[1].trim().split('\n');
    const normalizedPreviousRoute = (route) => route.replace(/London \([^)]*\)/g, 'London');
    const routes = [];

    for (const pair of parsePdfRoutes(pdfText)) {
        if (pair.includes('London')) {
            const matchingRoutes = previousRoutes.filter((route) => normalizedPreviousRoute(route) === pair.join(' - '));
            routes.push(...(matchingRoutes.length ? matchingRoutes : [pair.map((city) => city === 'London' ? 'London (LTN)' : city).join(' - ')]));
        } else {
            routes.push(pair.join(' - '));
        }
    }

    const uniqueRoutes = [...new Set(routes)].sort((a, b) => a.localeCompare(b));
    const unknownAirports = [...new Set(uniqueRoutes.flatMap((route) => route.split(' - ')).filter((city) => !airportNames.has(city)))];

    // Tier 3: normalized-variant fallback for names that survived tiers 1 (aliases)
    // and 2 (exact airportNames match) unresolved. Build the variant -> registry-name
    // index once, then resolve each unknown name only if it maps to exactly one
    // distinct registry name (2+ matches, e.g. "Crete" vs. Chania/Heraklion, or
    // "London" vs. LGW/LTN, must NOT be guessed).
    const variantIndex = new Map();
    for (const registryName of airportNames) {
        for (const variant of nameVariants(registryName)) {
            if (!variantIndex.has(variant)) variantIndex.set(variant, new Set());
            variantIndex.get(variant).add(registryName);
        }
    }

    const resolvedNames = new Map();
    const unresolvedNames = [];
    for (const city of unknownAirports) {
        const matched = new Set();
        for (const variant of nameVariants(city)) {
            const hit = variantIndex.get(variant);
            if (hit) {
                for (const registryName of hit) matched.add(registryName);
            }
        }
        if (matched.size === 1) {
            resolvedNames.set(city, [...matched][0]);
        } else {
            unresolvedNames.push(city);
        }
    }

    let finalRoutes = uniqueRoutes;
    if (resolvedNames.size) {
        finalRoutes = finalRoutes.map((route) => route.split(' - ').map((city) => resolvedNames.get(city) || city).join(' - '));
        finalRoutes = [...new Set(finalRoutes)].sort((a, b) => a.localeCompare(b));
    }

    // One wall-clock budget for ALL auto-add network work (probe + auto-add), so the job can never run
    // into the workflow's timeout-minutes. Started only if there is network work to do.
    const probe = String(env.AUTOADD_PROBE || '').toLowerCase() === 'true';
    if (probe || unresolvedNames.length) B.start(B.budgetFromEnv(env));

    let additions = [];
    let autoNotes = [];
    const autoWarnings = [];
    const autoFailures = new Map();
    let autoAttempted = false;
    let budgetExhausted = false;
    try {
        // Optional source probe (workflow_dispatch input): reports whether the honest auto-add data
        // sources are reachable from this machine, even when nothing needs to be added.
        if (probe) {
            const lines = await probeSources(env);
            for (const l of lines) console.log(`[probe] ${l}`);
            // failures also as annotations, so they show up on the run page without opening the log
            for (const l of lines.filter((x) => /UNAVAILABLE|^Wiki(pedia|data): /.test(x))) console.log(`::warning::Source probe: ${oneLine(l)}`);
            summary(`\n### Auto-add source probe\n${lines.map((l) => `- ${l}`).join('\n')}\n`);
        }

        // Tier 3.5: try to register brand-new airports automatically (never throws; any
        // name that cannot be fully and validly resolved falls through to tier 4).
        if (unresolvedNames.length) {
            autoAttempted = true;
            try {
                const result = await autoAddAirports({ names: unresolvedNames, routes: finalRoutes, data: loadData(originalSource), env });
                additions = result.entries;
                if (result.disabled) {
                    autoAttempted = false; // kill switch: behave exactly like the old script (tier 4 only)
                    console.log('::notice::Automatic airport registration is disabled (AUTO_ADD_AIRPORTS=false).');
                }
                autoNotes = result.notes;
                autoWarnings.push(...(result.warnings || []));
                budgetExhausted = !!result.budgetExhausted;
                for (const f of result.failures) autoFailures.set(f.name, f.reason);
            } catch (error) {
                autoNotes.push(`auto-add crashed: ${oneLine(error && error.message)}`);
                for (const name of unresolvedNames) autoFailures.set(name, 'auto-add crashed');
            }
        }
    } finally {
        B.clear();
    }
    for (const w of autoWarnings) {
        console.log(`::warning::${oneLine(w)}`);
        summary(`\n⚠️ ${oneLine(w)}\n`);
    }
    if (budgetExhausted) {
        const w = `Auto-add stopped: auto-add time budget exhausted (limit ${Math.round(B.total() / 1000)} s); the remaining unresolved airports were given up and only their routes are skipped`;
        console.log(`::warning::${w}`);
        summary(`\n⚠️ ${w}\n`);
    }

    const dropRoutesFor = (routeList, names) => routeList.filter((route) => !route.split(' - ').some((city) => names.includes(city)));
    const render = (routeList, entries) => {
        let out = originalSource;
        for (const entry of entries) out = addAirport(out, entry);
        return out.replace(RAW_BLOCK_RE, () => `    const rawFlightData = \`${routeList.join('\n')}\``);
    };

    let unresolvedAfter = unresolvedNames.filter((name) => !additions.some((a) => a.name === name));
    let routesAfter = dropRoutesFor(finalRoutes, unresolvedAfter);
    let newSource;
    if (additions.length) {
        let problems;
        try {
            newSource = render(routesAfter, additions);
            problems = selfCheck(originalSource, newSource, additions, routesAfter.length);
        } catch (error) {
            // e.g. insertEntry refusing to overwrite an existing key: never lose the day's route update.
            problems = [`inserting the new airports failed: ${oneLine(error && error.message)}`];
        }
        if (deps.forceSelfCheckFail) problems.push('forced failure (test hook)');
        if (problems.length) {
            console.log(`::warning::Auto-added airports discarded, data.js self-check failed: ${oneLine(problems.slice(0, 5).join('; '))}`);
            for (const a of additions) autoFailures.set(a.name, 'data.js self-check failed');
            unresolvedAfter = unresolvedAfter.concat(additions.map((a) => a.name));
            additions = [];
            routesAfter = dropRoutesFor(finalRoutes, unresolvedAfter);
            newSource = render(routesAfter, []);
        }
    } else {
        newSource = render(routesAfter, []);
    }
    finalRoutes = routesAfter;

    // Tier 4: still unresolved -> drop only the routes touching this city (keep
    // everything else) and flag it instead of hard-failing the whole job.
    if (unresolvedAfter.length) {
        console.log(`::warning::Unrecognized airport(s) skipped: ${unresolvedAfter.join(', ')}`);
        summary(`\n⚠️ Unrecognized airport(s), routes skipped: ${unresolvedAfter.join(', ')}\n`);
        if (autoAttempted) {
            for (const name of unresolvedAfter) {
                const reason = autoFailures.get(name);
                if (reason) console.log(`::warning::Auto-add failed for ${oneLine(name)}: ${oneLine(reason)}`);
            }
            summary(`\n| Airport | Why auto-add did not register it |\n|---|---|\n${unresolvedAfter.map((n) => `| ${n} | ${oneLine(autoFailures.get(n) || 'not attempted')} |`).join('\n')}\n`);
        }
    }
    if (autoAttempted && autoNotes.length) {
        for (const note of autoNotes) console.log(`[auto-add] ${oneLine(note)}`);
        summary(`\n<details><summary>Auto-add notes</summary>\n\n${autoNotes.map((n) => `- ${oneLine(n)}`).join('\n')}\n\n</details>\n`);
    }

    // Record additions.
    const today = new Date().toISOString().slice(0, 10);
    const logEntries = additions.map((a) => ({
        name: a.name, code: a.code, date: today, aiUsed: a.aiUsed,
        cityJa: a.cityJa, countryJa: a.countryJa, region: a.region, schengen: a.schengen, fullJa: a.fullJa, googleMap: a.gmap,
        sources: a.sources
    }));
    for (const a of additions) console.log(`::notice::Auto-added airport ${oneLine(a.name)} (${a.code}) to data.js${a.aiUsed ? ' [AI used]' : ''}`);
    if (additions.length) {
        summary(`\n### Auto-added airports\n\n| Airport | IATA | City | Airport name | Sources | AI |\n|---|---|---|---|---|---|\n${additions.map((a) =>
            `| ${a.name} | ${a.code} | ${a.cityJa} | ${a.fullJa} | code: ${a.sources.code}; city: ${a.sources.cityJa}; name: ${a.sources.fullJa} | ${a.aiUsed ? 'yes' : 'no'} |`).join('\n')}\n`);
    }

    // Metadata completeness check (warn only, never fail).
    try {
        const { gapList, airportCount } = checkMetadata(newSource, finalRoutes);
        if (gapList.length) {
            for (const g of gapList) console.log(`::warning::Airport metadata incomplete for ${oneLine(g.name)}: missing ${g.gaps.join(', ')}`);
            summary(`\n### Airport metadata gaps\n\n| Airport | Missing |\n|---|---|\n${gapList.map((g) => `| ${g.name} | ${g.gaps.join(', ')} |`).join('\n')}\n`);
        }
        console.log(`Metadata check: ${airportCount} airports in routes, ${gapList.length} with gaps.`);
    } catch (error) {
        console.log(`::warning::Airport metadata check could not run: ${oneLine(error && error.message)}`);
    }

    if (args.dryRun) {
        console.log(`[dry-run] no files written; data.js would have sha256=${sha256(newSource)}, ${additions.length} airport(s) added.`);
    } else {
        fs.writeFileSync(dataPath, newSource);
        if (additions.length) {
            let previous = [];
            try { const parsed = JSON.parse(fs.readFileSync(addedLogPath, 'utf8')); if (Array.isArray(parsed)) previous = parsed; } catch { /* missing or unreadable: start fresh */ }
            fs.writeFileSync(addedLogPath, JSON.stringify(previous.concat(logEntries), null, 2) + '\n');
        }
    }

    const lastRun = pdfText.match(/Last run:\s*\n\s*(\d{4})-(\d{2})-(\d{2})/);
    if (lastRun && !args.dryRun) {
        const [, year, month, day] = lastRun;
        const japaneseDate = `${year}年${Number(month)}月${Number(day)}日`;
        const snapshotDate = `${year}-${month}-${day}`;
        fs.writeFileSync(indexPath, fs.readFileSync(indexPath, 'utf8').replace(
            /All You Can Fly 最新空席データ（\d{4}年\d{1,2}月\d{1,2}日更新）/,
            `All You Can Fly 最新空席データ（${japaneseDate}更新）`
        ));
        fs.writeFileSync(readmePath, fs.readFileSync(readmePath, 'utf8').replace(
            /## V2（\d{4}-\d{2}-\d{2}）/,
            `## V2（${snapshotDate}）`
        ));
    }

    console.log(`Updated ${finalRoutes.length} routes from ${pdfPath}.`);
    return { routes: finalRoutes.length, added: additions.map((a) => a.name), skipped: unresolvedAfter };
}

/** Probes ONLY the honest data sources (Wizz station list API, OurAirports CSV, Wikipedia, Wikidata), all with the repo User-Agent. */
async function probeSources(env) {
    const S = require('./lib/airport-sources');
    S.resetHttpLog();
    const lines = [`User-Agent: ${S.USER_AGENT}`];
    const w = await S.loadWizzStations({ WIZZ_API_URL: env.WIZZ_API_URL });
    lines.push(w.statusLine);
    if (w.error) lines.push(S.wizzUnavailableWarning(w));
    const oa = await S.loadOurAirports({});
    lines.push(oa.statusLine);
    try { const c = await S.wikipediaCityJa('Sibiu', 'RO'); lines.push(`Wikipedia langlinks (Sibiu -> ${c}): HTTP ok`); } catch (e) { lines.push(`Wikipedia: ${e.status ? 'HTTP ' + e.status : e.message}`); }
    try { const a = await S.wikidataAirportJa('SBZ', (oa.byIata && oa.byIata.SBZ || [])[0]); lines.push(`Wikidata SPARQL (SBZ -> ${a}): HTTP ok`); } catch (e) { lines.push(`Wikidata: ${e.status ? 'HTTP ' + e.status : e.message}`); }
    lines.push(`Gemini key configured: ${String(env.GEMINI_API_KEY || '').trim() ? 'yes' : 'no'}`);
    lines.push(`Requests: ${S.getHttpLog().join(' | ')}`);
    return lines;
}

module.exports = { main, parsePdfRoutes, checkMetadata };

if (require.main === module) {
    main(process.argv.slice(2), process.env).catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
