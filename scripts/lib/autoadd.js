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

const TOTAL_BUDGET_MS = 8 * 60 * 1000;

/**
 * @param {object} p
 * @param {string[]} p.names           still-unresolved PDF names (after aliases)
 * @param {string[]} p.routes          routes ("A - B") that mention them
 * @param {object}   p.data            evaluated AIRPORT_DATA of the current data.js
 * @param {object}   p.env             process env (AUTO_ADD_AIRPORTS, GEMINI_API_KEY, ...)
 * @returns {Promise<{entries:object[], failures:{name:string,reason:string}[], notes:string[], skipped?:string}>}
 */
async function autoAddAirports({ names, routes, data, env }) {
    const notes = [];
    const failures = [];
    const entries = [];
    const failAll = (reason) => ({ entries: [], failures: names.map((name) => ({ name, reason })), notes, skipped: reason });

    if (String(env.AUTO_ADD_AIRPORTS || '').trim().toLowerCase() === 'false') return { ...failAll('auto-add disabled (AUTO_ADD_AIRPORTS=false)'), disabled: true };
    if (!names.length) return { entries, failures, notes };
    if (names.length > V.MAX_NEW_AIRPORTS) {
        return failAll(`${names.length} unrecognized airports (> ${V.MAX_NEW_AIRPORTS}); PDF parsing likely broke, adding none`);
    }

    const started = Date.now();
    const ai = new AiClient(env.GEMINI_API_KEY);
    if (!ai.available) notes.push(ai.skipReason);

    const OA = await S.loadOurAirports(env);
    notes.push(OA.statusLine);
    if (OA.error) return { ...failAll('OurAirports data unavailable'), notes };
    const wizz = await S.loadWizzStations(env);
    notes.push(wizz.statusLine);
    const wizzOk = !wizz.error;

    const codeToIso = (code) => {
        const w = wizzOk && wizz.byIata[code];
        if (w && w.countryCode) return w.countryCode;
        const oa = S.oaByCode(OA, code) || (OA.byIata[code] || [])[0];
        return oa ? oa.iso_country : null;
    };
    const { table: countryTable, conflicts } = buildCountryTable(data, codeToIso);
    if (conflicts.length) notes.push(`country table conflicts (majority used): ${conflicts.join('; ')}`);

    const usedCodes = new Set(Object.values(data.airportCodes));
    for (const c of Object.keys(data.airportFullNames)) usedCodes.add(c);
    const usedKeys = new Set(Object.keys(data.airportCodes));
    const nameByCode = Object.fromEntries(Object.entries(data.airportCodes).map(([n, c]) => [c, n]));

    for (const name of names) {
        if (Date.now() - started > TOTAL_BUDGET_MS) { failures.push({ name, reason: 'time budget for auto-add exhausted' }); continue; }
        try {
            const r = await buildEntry({ name, routes, data, OA, wizz: wizzOk ? wizz : null, ai, countryTable, usedCodes, usedKeys, nameByCode });
            if (r.entry) { entries.push(r.entry); usedCodes.add(r.entry.code); usedKeys.add(r.entry.name); }
            else failures.push({ name, reason: r.reason });
        } catch (e) {
            failures.push({ name, reason: `unexpected error: ${e && e.message ? e.message : e}` });
        }
    }
    if (ai.calls) notes.push(`AI calls made: ${ai.calls}${ai.rateLimited ? ' (rate limited, stopped)' : ''}`);
    return { entries, failures, notes };
}

async function buildEntry({ name, routes, data, OA, wizz, ai, countryTable, usedCodes, usedKeys, nameByCode }) {
    if (!V.validRegistryKey(name)) return { reason: 'registry key fails validation' };
    const src = { code: null, cityJa: null, fullJa: null };
    const srcErrors = [];
    let aiUsed = false;

    const counterpartCodes = new Set();
    for (const rt of routes) {
        const parts = rt.split(' - ');
        if (!parts.includes(name)) continue;
        for (const other of parts) if (other !== name && data.airportCodes[other]) counterpartCodes.add(data.airportCodes[other]);
    }

    const res = S.resolveCode(name, counterpartCodes, wizz, OA);
    let code = res.code, iso = res.iso, oa = res.oa;
    if (code) src.code = res.tier;

    const isKnownCode = (c) => !!(wizz && wizz.byIata[c]) || !!S.oaByCode(OA, c);
    const oaCountry = (c) => { const r = S.oaByCode(OA, c); return r ? r.iso_country : null; };

    // One research per airport; the (untrusted) answer is validated once against the code/country rules.
    let checked;
    const getAi = async () => {
        if (checked) return checked;
        const raw = await ai.research({ name, candidates: res.candidates || [], hintCode: res.needsAiConfirm ? code : undefined });
        if (!raw.ok) return (checked = raw);
        const problems = V.validateAiOutput(raw.data, { expectedCode: code || undefined, isKnownCode, oaCountry, countryTable, needCity: false, needAirport: false });
        if (!code && res.candidates && res.candidates.length && !res.candidates.some((c) => c.iata === raw.data.iata)) {
            problems.push(`iata ${raw.data.iata} not among Wizz candidates`);
        }
        return (checked = problems.length ? { ok: false, reason: `AI output rejected: ${problems.join('; ')}` } : { ok: true, data: raw.data });
    };

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
    try { cityJa = await S.wikipediaCityJa(base, iso); } catch (e) { srcErrors.push(`wikipedia: ${e.status ? 'HTTP ' + e.status : e.message}`); }
    if (cityJa && V.validCityJa(cityJa)) src.cityJa = 'wikipedia'; else cityJa = null;

    // ---- airport name (JA)
    let fullJa = null;
    try { fullJa = await S.wikidataAirportJa(code, oa); } catch (e) { srcErrors.push(`wikidata: ${e.status ? 'HTTP ' + e.status : e.message}`); }
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

module.exports = { autoAddAirports, COUNTRY_EN };
