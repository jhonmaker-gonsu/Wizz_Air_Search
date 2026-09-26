'use strict';
/**
 * Section-aware insertion of new airports into data.js, plus a post-write self-check.
 * data.js is an IIFE with `const X = {...};` blocks. Entries are inserted at the first
 * key that sorts after the new one; airportFullNames is keyed by IATA code.
 */
const vm = require('node:vm');

const SECTIONS = ['airportCodes', 'cityNames', 'countryMap', 'regionMap', 'schengenMap', 'airportGoogleMap', 'airportFullNames'];
const KEY_RE = /^        '((?:[^'\\]|\\.)*)':/;
const SCHENGEN_COMMENT_COL = 36;

const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

function section(src, name) {
    const re = new RegExp(`\\n    const ${name} = \\{\\n([\\s\\S]*?)\\n    \\};`);
    const m = re.exec(src);
    if (!m) throw new Error('section not found: ' + name);
    return { start: m.index + m[0].indexOf('{\n') + 2, body: m[1] };
}
function keysOf(body) { return [...body.matchAll(/^        '((?:[^'\\]|\\.)*)':/gm)].map((m) => m[1]); }

function insertEntry(src, name, key, valueLiteral, comment) {
    const { start, body } = section(src, name);
    const lines = body.split('\n');
    if (keysOf(body).includes(key)) throw new Error(`refuse overwrite ${name}[${key}]`);
    const entryIdx = lines.map((l, i) => (/^        '/.test(l) ? i : -1)).filter((i) => i >= 0);
    const keyAt = (i) => lines[i].match(KEY_RE)[1];
    const pos = entryIdx.find((i) => keyAt(i).localeCompare(key, 'en') > 0);
    let line = `        ${q(key)}: ${valueLiteral}`;
    if (name === 'schengenMap' && comment) {
        const b = line + ',';
        line = (b.length >= SCHENGEN_COMMENT_COL ? b + ' ' : b.padEnd(SCHENGEN_COMMENT_COL)) + `// ${comment}`;
    } else line += ',';
    if (pos === undefined) {
        // appending after the last entry; the last entry may lack a trailing comma
        const li = entryIdx[entryIdx.length - 1];
        const hadTrailing = /,\s*(\/\/.*)?$/.test(lines[li]);
        if (!hadTrailing) {
            lines[li] = lines[li].replace(/^(.*?)(\s*\/\/.*)?$/, (m, a, c) => a + ',' + (c || ''));
            line = line.replace(/,(\s*)(\/\/.*)$/, ' $1$2').replace(/,$/, '');
        }
        lines.splice(li + 1, 0, line);
    } else lines.splice(pos, 0, line);
    return src.slice(0, start) + lines.join('\n') + src.slice(start + body.length);
}

/** e: {name, code, cityJa, countryJa, region, schengen, gmap, fullJa} */
function addAirport(src, e) {
    src = insertEntry(src, 'airportCodes', e.name, q(e.code));
    src = insertEntry(src, 'cityNames', e.name, q(e.cityJa));
    src = insertEntry(src, 'countryMap', e.name, q(e.countryJa));
    src = insertEntry(src, 'regionMap', e.name, q(e.region));
    src = insertEntry(src, 'schengenMap', e.name, String(e.schengen), e.countryJa);
    src = insertEntry(src, 'airportGoogleMap', e.name, q(e.gmap));
    src = insertEntry(src, 'airportFullNames', e.code, q(e.fullJa));
    return src;
}

/** Evaluates data.js source in a vm sandbox and returns window.AIRPORT_DATA (throws on any error). */
function loadData(src) {
    const w = {};
    vm.runInNewContext(`(function (window) {\n${src}\n})(__w)`, { __w: w }, { timeout: 5000 });
    if (!w.AIRPORT_DATA) throw new Error('window.AIRPORT_DATA not set');
    return w.AIRPORT_DATA;
}

const J = (v) => JSON.stringify(v);

/**
 * Self-check of the rewritten data.js. Returns a list of problems (empty = ok).
 * origSrc: data.js before any change; newSrc: after additions + rawFlightData rewrite.
 */
function selfCheck(origSrc, newSrc, entries, expectedRouteCount) {
    const problems = [];
    let O, N;
    try { O = loadData(origSrc); } catch (e) { return [`original data.js does not evaluate: ${e.message}`]; }
    try { N = loadData(newSrc); } catch (e) { return [`new data.js does not evaluate: ${e.message}`]; }
    const added = { keys: new Set(entries.map((e) => e.name)), codes: new Set(entries.map((e) => e.code)) };
    for (const sec of Object.keys(O)) {
        if (sec === 'rawFlightData') continue;
        if (!(sec in N)) { problems.push(`section ${sec} missing`); continue; }
        if (Array.isArray(O[sec])) { if (J(O[sec]) !== J(N[sec])) problems.push(`section ${sec} changed`); continue; }
        for (const [k, v] of Object.entries(O[sec])) if (J(N[sec][k]) !== J(v)) problems.push(`${sec}[${k}] changed`);
        const extra = Object.keys(N[sec]).filter((k) => !(k in O[sec]));
        const allowed = sec === 'airportFullNames' ? added.codes : added.keys;
        const isAddable = SECTIONS.includes(sec);
        for (const k of extra) if (!isAddable || !allowed.has(k)) problems.push(`${sec} gained unexpected key ${k}`);
    }
    for (const e of entries) {
        for (const sec of SECTIONS) {
            const k = sec === 'airportFullNames' ? e.code : e.name;
            if (!(k in N[sec])) problems.push(`${sec} lacks new key ${k}`);
        }
    }
    const routeCount = String(N.rawFlightData).trim() ? String(N.rawFlightData).trim().split('\n').length : 0;
    if (routeCount !== expectedRouteCount) problems.push(`rawFlightData has ${routeCount} routes, expected ${expectedRouteCount}`);
    return problems;
}

/** Removes the given registry names (and their codes in airportFullNames) from the 7 sections. Test helper. */
function stripAirports(src, names, codes) {
    for (const sec of SECTIONS) {
        const { start, body } = section(src, sec);
        const drop = sec === 'airportFullNames' ? new Set(codes) : new Set(names);
        const kept = body.split('\n').filter((l) => { const m = l.match(KEY_RE); return !(m && drop.has(m[1].replace(/\\'/g, "'"))); });
        src = src.slice(0, start) + kept.join('\n') + src.slice(start + body.length);
    }
    return src;
}

module.exports = { SECTIONS, q, section, keysOf, insertEntry, addAirport, loadData, selfCheck, stripAirports };
