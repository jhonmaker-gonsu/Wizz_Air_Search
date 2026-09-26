'use strict';
/**
 * Orchestrates automatic registry entries for PDF city names that are still unresolved
 * after the alias / exact / normalized-variant tiers. Never throws: any name that cannot be
 * fully and validly resolved is returned in `failures` so the caller falls through to the
 * existing "drop routes + warn" behaviour.
 */
const S = require('./airport-sources');
const { AiClient } = require('./airport-ai');
const { buildCountryTable, COUNTRY_EN } = require('./country-table');
const V = require('./validate');
const B = require('./budget');
const { SECTIONS } = require('./datajs-insert');
const NAME_KEYED_SECTIONS = SECTIONS.filter((s) => s !== 'airportFullNames');

/**
 * @param {object} p
 * @param {string[]} p.names           still-unresolved PDF names (after aliases)
 * @param {string[]} p.routes          routes ("A - B") that mention them
 * @param {object}   p.data            evaluated AIRPORT_DATA of the current data.js
 * @param {object}   p.env             process env (AUTO_ADD_AIRPORTS, GEMINI_API_KEY, ...)
 * @returns {Promise<{entries:object[], failures:{name:string,reason:string}[], notes:string[], warnings:string[], budgetExhausted:boolean, skipped?:string}>}
 */
async function autoAddAirports({ names, routes, data, env }) {
    const notes = [];
    const warnings = []; // ::warning:: lines main() prints (station list problems etc.)
    const failures = [];
    const entries = [];
    const failAll = (reason, extra = {}) => ({ entries: [], failures: names.map((name) => ({ name, reason })), notes, warnings, budgetExhausted: false, skipped: reason, ...extra });
    const BUDGET_REASON = 'auto-add time budget exhausted';

    if (String(env.AUTO_ADD_AIRPORTS || '').trim().toLowerCase() === 'false') return { ...failAll('auto-add disabled (AUTO_ADD_AIRPORTS=false)'), disabled: true };
    if (!names.length) return { entries, failures, notes, warnings, budgetExhausted: false };
    if (names.length > V.MAX_NEW_AIRPORTS) {
        return failAll(`${names.length} unrecognized airports (> ${V.MAX_NEW_AIRPORTS}); PDF parsing likely broke, adding none`);
    }

    // One wall-clock budget for all auto-add work (main() may already have started it for the source probe).
    const ownBudget = !B.active();
    if (ownBudget) B.start(B.budgetFromEnv(env));
    try {
        return await resolveAll({ names, routes, data, env, notes, warnings, failAll, BUDGET_REASON });
    } finally {
        if (ownBudget) B.clear();
    }
}

async function resolveAll({ names, routes, data, env, notes, warnings, failAll, BUDGET_REASON }) {
    const failures = [];
    const entries = [];
    const ai = new AiClient(env.GEMINI_API_KEY);
    if (!ai.available) notes.push(ai.skipReason);

    const OA = await S.loadOurAirports(env);
    notes.push(OA.statusLine);
    if (OA.budget || B.expired()) return failAll(BUDGET_REASON, { budgetExhausted: true });
    if (OA.error) return failAll('OurAirports data unavailable');
    const wizz = await S.loadWizzStations(env);
    notes.push(wizz.statusLine);
    if (wizz.budget || B.expired()) return failAll(BUDGET_REASON, { budgetExhausted: true });
    const wizzOk = !wizz.error;
    if (!wizzOk) warnings.push(S.wizzUnavailableWarning(wizz));

    const { countryTable, conflicts } = validationContext(data, OA, wizzOk ? wizz : null);
    if (conflicts.length) notes.push(`country table conflicts (majority used): ${conflicts.join('; ')}`);

    // Used keys = union over ALL registry sections (data.js also holds orphan keys, e.g. map URLs for
    // 'Keflavik' / 'Tenerife South', that are not in airportCodes); used codes also include airportFullNames.
    const usedCodes = new Set(Object.values(data.airportCodes));
    for (const c of Object.keys(data.airportFullNames)) usedCodes.add(c);
    const usedKeys = new Set();
    for (const sec of NAME_KEYED_SECTIONS) for (const k of Object.keys(data[sec] || {})) usedKeys.add(k);
    const nameByCode = Object.fromEntries(Object.entries(data.airportCodes).map(([n, c]) => [c, n]));

    let budgetExhausted = false;
    for (const name of names) {
        if (budgetExhausted || B.expired()) { budgetExhausted = true; failures.push({ name, reason: BUDGET_REASON }); continue; }
        try {
            const r = await buildEntry({ name, routes, data, OA, wizz: wizzOk ? wizz : null, ai, countryTable, usedCodes, usedKeys, nameByCode });
            if (r.entry) { entries.push(r.entry); usedCodes.add(r.entry.code); usedKeys.add(r.entry.name); }
            else failures.push({ name, reason: r.reason });
        } catch (e) {
            if (e instanceof B.BudgetError) { budgetExhausted = true; failures.push({ name, reason: BUDGET_REASON }); }
            else failures.push({ name, reason: `unexpected error: ${e && e.message ? e.message : e}` });
        }
    }
    if (ai.calls) notes.push(`AI calls made: ${ai.calls}${ai.rateLimited ? ' (rate limited, stopped)' : ''}`);
    if (budgetExhausted) notes.push(`auto-add time budget (${Math.round(B.total() / 1000)} s) exhausted after ${Math.round(B.elapsedMs() / 1000)} s`);
    return { entries, failures, notes, warnings, budgetExhausted };
}

/**
 * Everything validateAiOutput() needs, built from the loaded sources exactly as auto-add does.
 * wizz: the loaded station list, or null when it is unavailable. Shared with the AI probe (ai-probe.js).
 */
function validationContext(data, OA, wizz) {
    const codeToIso = (code) => {
        const w = wizz && wizz.byIata[code];
        if (w && w.countryCode) return w.countryCode;
        const oa = S.oaByCode(OA, code) || (OA.byIata[code] || [])[0];
        return oa ? oa.iso_country : null;
    };
    const { table: countryTable, conflicts } = buildCountryTable(data, codeToIso);
    return { countryTable, conflicts, ...aiValidators(OA, wizz) };
}
function aiValidators(OA, wizz) {
    const isKnownCode = (c) => !!(wizz && wizz.byIata[c]) || !!S.oaByCode(OA, c);
    const oaCountry = (c) => { const r = S.oaByCode(OA, c); return r ? r.iso_country : null; };
    return { isKnownCode, oaCountry };
}

/** IATA codes of the other endpoints of the routes that mention `name`. */
function counterpartCodesFor(name, routes, data) {
    const counterpartCodes = new Set();
    for (const rt of routes) {
        const parts = rt.split(' - ');
        if (!parts.includes(name)) continue;
        for (const other of parts) if (other !== name && data.airportCodes[other]) counterpartCodes.add(data.airportCodes[other]);
    }
    return counterpartCodes;
}

/**
 * One AI research for `name` (res = resolveCode() result, code = the code resolved so far or null),
 * validated against the code/country rules. The model output is untrusted: `data` is only usable when ok.
 * On rejection `rejected` carries the raw output for the AI probe's report (never written anywhere).
 */
async function validatedAiResearch({ name, res, code, ai, isKnownCode, oaCountry, countryTable }) {
    const raw = await ai.research({ name, candidates: res.candidates || [], hintCode: res.needsAiConfirm ? code : undefined });
    if (!raw.ok) return raw;
    const problems = V.validateAiOutput(raw.data, { expectedCode: code || undefined, isKnownCode, oaCountry, countryTable, needCity: false, needAirport: false });
    // raw.data may be null / a non-object (model answered `null`): validateAiOutput already rejected it above
    const outIata = raw.data && typeof raw.data === 'object' ? raw.data.iata : undefined;
    if (!code && res.candidates && res.candidates.length && raw.data && typeof raw.data === 'object' && !res.candidates.some((c) => c.iata === outIata)) {
        problems.push(`iata ${outIata} not among Wizz candidates`);
    }
    return problems.length ? { ok: false, reason: `AI output rejected: ${problems.join('; ')}`, rejected: raw.data } : { ok: true, data: raw.data };
}

async function buildEntry({ name, routes, data, OA, wizz, ai, countryTable, usedCodes, usedKeys, nameByCode }) {
    if (!V.validRegistryKey(name)) return { reason: 'registry key fails validation' };
    // Checked before any network call: data.js may hold this key in some section (orphan map URL etc.),
    // and insertion would refuse to overwrite it.
    if (usedKeys.has(name)) return { reason: 'validation failed: registry key already exists (in some data.js section)' };
    const src = { code: null, cityJa: null, fullJa: null };
    const srcErrors = [];
    let aiUsed = false;

    const res = S.resolveCode(name, counterpartCodesFor(name, routes, data), wizz, OA);
    let code = res.code, iso = res.iso, oa = res.oa;
    if (code) src.code = res.tier;

    const { isKnownCode, oaCountry } = aiValidators(OA, wizz);

    // One research per airport; the (untrusted) answer is validated once against the code/country rules.
    // `code` is captured at the first call, i.e. before the AI result can change it (as before).
    let checked;
    const getAi = async () => checked || (checked = await validatedAiResearch({ name, res, code, ai, isKnownCode, oaCountry, countryTable }));

    // ---- code
    if (!code || res.needsAiConfirm) {
        const r = await getAi();
        if (!r.ok) return { reason: `code not resolved (${res.tier}${res.note ? ' ' + res.note : ''}); ${r.reason}` };
        if (res.needsAiConfirm && r.data.iata !== code) return { reason: `AI did not confirm OurAirports code ${code} (said ${r.data.iata})` };
        code = r.data.iata; oa = S.oaByCode(OA, code); iso = oa && oa.iso_country;
        src.code = res.needsAiConfirm ? 'oaMunicipality+ai-confirmed' : 'ai(validated against Wizz/OurAirports)';
        aiUsed = true;
    }
    if (!V.validIata(code)) return { reason: 'IATA invalid' };
    if (usedCodes.has(code)) return { reason: `IATA ${code} already used${nameByCode[code] ? ' by ' + nameByCode[code] : ''}` };
    if (!oa) return { reason: `no scheduled OurAirports record for ${code}` };
    if (!iso || iso !== oa.iso_country) return { reason: `country mismatch for ${code} (Wizz ${iso} vs OurAirports ${oa.iso_country})` };

    // ---- country / region / schengen
    const row = countryTable[iso];
    if (!row) return { reason: `country ${iso} not in country table` };

    // ---- city (JA)
    const base = name.split('/')[0].replace(/\s*\([^)]*\)/g, '').trim();
    let cityJa = null;
    try { cityJa = await S.wikipediaCityJa(base, iso); } catch (e) { if (e instanceof B.BudgetError) throw e; srcErrors.push(`wikipedia: ${e.status ? 'HTTP ' + e.status : e.message}`); }
    if (cityJa && V.validCityJa(cityJa)) src.cityJa = 'wikipedia'; else cityJa = null;

    // ---- airport name (JA)
    let fullJa = null;
    try { fullJa = await S.wikidataAirportJa(code, oa); } catch (e) { if (e instanceof B.BudgetError) throw e; srcErrors.push(`wikidata: ${e.status ? 'HTTP ' + e.status : e.message}`); }
    if (fullJa && V.validAirportJa(fullJa)) src.fullJa = 'wikidata'; else fullJa = null;

    // ---- AI only for what is still missing
    if (!cityJa || !fullJa) {
        const r = await getAi();
        if (r.ok) {
            if (!cityJa && V.validCityJa(r.data.cityJa)) { cityJa = r.data.cityJa; src.cityJa = 'ai'; aiUsed = true; }
            if (!fullJa && V.validAirportJa(r.data.airportJa)) { fullJa = r.data.airportJa; src.fullJa = 'ai'; aiUsed = true; }
        } else if (!cityJa) return { reason: `Japanese city name not found (Wikipedia${srcErrors.length ? ': ' + srcErrors.join(', ') : ''}); ${r.reason}` };
    }
    if (!cityJa) return { reason: 'Japanese city name not found and AI output unusable' };
    if (!fullJa) { // built name, last resort
        fullJa = `${cityJa}${/International/.test(oa.name) ? '国際空港' : '空港'}`; src.fullJa = 'built';
    }

    const entry = {
        name, code, cityJa, countryJa: row.ja, region: row.region, schengen: row.schengen,
        gmap: S.googleMapUrl(oa, code), fullJa, iso,
        sources: { ...src, country: 'country-table', region: 'country-table', schengen: 'country-table', gmap: 'ourairports' }, aiUsed
    };
    const problems = V.validateEntry(entry, { usedCodes, usedKeys });
    if (problems.length) return { reason: `validation failed: ${problems.join('; ')}` };
    return { entry };
}

module.exports = { autoAddAirports, COUNTRY_EN, validationContext, counterpartCodesFor, validatedAiResearch };
