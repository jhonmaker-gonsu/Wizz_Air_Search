'use strict';
/**
 * AI probe (workflow_dispatch input probe_ai, env AUTOADD_PROBE_AI=true).
 * Runs the REAL Gemini resolver - the same AiClient.research() + validatedAiResearch() the auto-add
 * path uses - on airports that are already in data.js, and compares the validated result with the
 * registry entry. It writes nothing (main() forces --dry-run) and prints only statuses, latencies,
 * sanitized API error messages and the (short, validated or rejected) model fields.
 * Hard cap: MAX_REQUESTS generateContent requests per run, no retries (a 429 stops all AI calls).
 */
const S = require('./airport-sources');
const { AiClient, KEY_LIKE, sanitizeApiText } = require('./airport-ai');
const { validationContext, counterpartCodesFor, validatedAiResearch } = require('./autoadd');
const V = require('./validate');
const B = require('./budget');

// Sibiu: simple katakana names (シビウ / シビウ国際空港). Niš: diacritic registry key and a long,
// style-dependent airport name (ニシュ・コンスタンティヌス大帝空港), non-Schengen country.
const PROBE_AIRPORTS = ['Sibiu', 'Niš'];
const MAX_REQUESTS = 4;

/** Model-provided value for a log line: JSON-quoted, key-checked, at most 60 characters. */
function shown(v, key) {
    if (v === undefined) return '(missing)';
    return sanitizeApiText(JSON.stringify(v), key, 60).text;
}
const md = (s) => String(s).replace(/[|`<\[\]\\]/g, ' '); // no tables/HTML/links/code spans from untrusted text

/**
 * @returns {Promise<{lines:string[], warnings:string[], summary:string, requests:number}>}
 */
async function probeAi({ env, data, airports = PROBE_AIRPORTS }) {
    const key = String(env.GEMINI_API_KEY || '').trim();
    const lines = [];
    const warnings = [];
    const rows = [];
    const out = (l) => lines.push(l);
    if (!key) {
        out('Gemini key configured: no - AI probe skipped (0 requests)');
        return finish({ lines, warnings, rows, key, requests: 0 });
    }
    const ai = new AiClient(key, { maxRequests: MAX_REQUESTS, retries: 1 });
    out(`Gemini key configured: yes; request cap ${MAX_REQUESTS}, no retries; airports: ${airports.join(', ')}`);
    const OA = await S.loadOurAirports(env);
    out(OA.statusLine);
    if (OA.error) { warnings.push('AI probe: OurAirports unavailable, cannot validate - skipped'); return finish({ lines, warnings, rows, key, requests: ai.calls }); }
    const wizz = await S.loadWizzStations(env);
    out(wizz.statusLine);
    const wz = wizz.error ? null : wizz;
    const ctx = validationContext(data, OA, wz);
    const routes = String(data.rawFlightData || '').trim().split('\n');

    for (const name of airports) {
        const regCode = data.airportCodes[name];
        if (!regCode) { out(`${name}: not in data.js - skipped`); continue; }
        const reg = { iata: regCode, country: ctx.oaCountry(regCode), cityJa: data.cityNames[name], airportJa: data.airportFullNames[regCode] };
        const res = S.resolveCode(name, counterpartCodesFor(name, routes, data), wz, OA);
        out(`${name}: resolveCode -> ${res.code || '-'} (${res.tier}${res.note ? ' ' + res.note : ''}); Wizz candidates: ${(res.candidates || []).map((c) => c.iata).join(',') || '-'}`);
        const t0 = ai.trace.length;
        let r;
        try {
            r = await validatedAiResearch({ name, res, code: res.code, ai, ...ctx });
        } catch (e) {
            r = { ok: false, reason: e instanceof B.BudgetError ? 'auto-add time budget exhausted' : `unexpected error: ${e && e.name}` };
        }
        for (const t of ai.trace.slice(t0)) {
            out(`${name}: ${t.kind} ${t.model} -> ${t.status ? 'HTTP ' + t.status : 'no HTTP status'}, ${t.ms} ms` +
                (t.kind === 'research' && t.status === 200 ? `, grounded: ${t.queries ? 'yes (' + t.queries + ' search queries)' : 'NO (0 search queries)'}` : '') +
                (t.error ? `; ${t.error}` : ''));
            if (t.withheld) warnings.push(`AI probe: an API error message for ${name} contained key-like text and was withheld`);
        }
        const got = r.ok ? r.data : r.rejected;
        const verdict = r.ok ? 'ACCEPTED by validateAiOutput' : `NOT accepted: ${sanitizeApiText(r.reason, key).text}`;
        out(`${name}: ${verdict}`);
        const row = { name, verdict: r.ok ? 'accepted' : 'not accepted', fields: [] };
        if (got && typeof got === 'object') {
            const usable = { iata: V.validIata(got.iata), country: typeof got.countryIso2 === 'string', cityJa: V.validCityJa(got.cityJa), airportJa: V.validAirportJa(got.airportJa) };
            const val = { iata: got.iata, country: got.countryIso2, cityJa: got.cityJa, airportJa: got.airportJa };
            for (const f of ['iata', 'country', 'cityJa', 'airportJa']) {
                const m = val[f] === reg[f];
                out(`${name}:   ${f.padEnd(9)} AI ${shown(val[f], key)} | data.js ${JSON.stringify(reg[f])} | ${m ? 'match' : 'MISMATCH'}${usable[f] ? '' : ' | fails validation'}`);
                row.fields.push({ f, ai: shown(val[f], key), reg: JSON.stringify(reg[f]), match: m });
            }
            row.pass = r.ok && val.iata === reg.iata && val.country === reg.country;
        } else row.pass = false;
        out(`${name}: probe result ${row.pass ? 'PASS' : 'FAIL'} (PASS = accepted and iata + country match data.js; Japanese names are informational)`);
        if (!row.pass) warnings.push(`AI probe: ${name} ${row.verdict}${r.ok ? ' but iata/country differ from data.js' : ''}`);
        rows.push(row);
    }
    out(`Gemini requests sent: ${ai.calls}/${MAX_REQUESTS}${ai.rateLimited ? ' (stopped after HTTP 429)' : ''}`);
    return finish({ lines, warnings, rows, key, requests: ai.calls });
}

/** Builds the summary and fails closed: if any output text contains key-like text, nothing but a notice is printed. */
function finish({ lines, warnings, rows, key, requests }) {
    let summary = `\n### AI probe (real Gemini calls, dry run)\n\n${lines.map((l) => `- ${md(l)}`).join('\n')}\n`;
    if (rows.length) {
        summary += `\n| Airport | Field | AI | data.js | |\n|---|---|---|---|---|\n` + rows.flatMap((r) => [
            ...r.fields.map((x) => `| ${md(r.name)} | ${x.f} | ${md(x.ai)} | ${md(x.reg)} | ${x.match ? 'match' : 'MISMATCH'} |`),
            `| ${md(r.name)} | **result** | ${r.verdict} | | ${r.pass ? 'PASS' : 'FAIL'} |`]).join('\n') + '\n';
    }
    const all = [...lines, ...warnings, summary].join('\n');
    if (KEY_LIKE.test(all) || (key.length >= 8 && all.includes(key))) {
        const w = 'AI probe output withheld: it contained key-like text';
        return { lines: [w], warnings: [w], summary: `\n### AI probe\n\n${w}\n`, requests };
    }
    return { lines, warnings, summary, requests };
}

module.exports = { probeAi, PROBE_AIRPORTS, MAX_REQUESTS };
