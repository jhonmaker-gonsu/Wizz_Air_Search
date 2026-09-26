'use strict';
/**
 * Data sources for auto-adding airports: Wizz Air station list, OurAirports CSV,
 * Wikidata (JA airport name) and English Wikipedia (JA city name).
 * All network access goes through httpRequest(): the single honest repo User-Agent (never a
 * browser-style one; bot protection such as AWS WAF CAPTCHA pages is NOT worked around),
 * 20 s timeout, up to 3 retries, >= 1.5 s spacing for Wikimedia hosts, JSON only parsed after
 * checking status and content-type, and every wait / fetch is bounded by the global budget
 * (see budget.js).
 */
const fs = require('node:fs');
const { COUNTRY_EN } = require('./country-table');
const B = require('./budget');

const REPO_URL = 'https://github.com/jhonmaker-gonsu/Wizz_Air_Search';
const USER_AGENT = `WizzAYCF-registry-bot/1.0 (+${REPO_URL})`;
// Base URL of the Wizz Air station-list API. Hard-coded on purpose: the only way to learn the current
// version from wizzair.com is its home page, which sits behind AWS WAF bot protection (CAPTCHA) and is
// not fetched. When the version goes stale the request fails, the job warns and falls back to
// OurAirports (see loadWizzStations); a maintainer then bumps this constant (or sets env WIZZ_API_URL).
const WIZZ_API_URL = 'https://be.wizzair.com/29.18.0/Api';
const OA_URL = 'https://davidmegginson.github.io/ourairports-data/airports.csv';

let fetchImpl = (...args) => globalThis.fetch(...args);
let wikimediaGapMs = 1500;
let sleepImpl = (ms) => new Promise((r) => setTimeout(r, ms));
const lastCall = { wikimedia: 0 };
const httpLog = []; // "GET url -> status" lines for the step summary

function setFetch(f) { fetchImpl = f || ((...args) => globalThis.fetch(...args)); }
function setWikimediaGap(ms) { wikimediaGapMs = ms; }
function setSleep(f) { sleepImpl = f; }
function getHttpLog() { return httpLog; }
function resetHttpLog() { httpLog.length = 0; }

class HttpError extends Error {
    constructor(message, status, fatal = false) { super(message); this.status = status; this.fatal = fatal; }
}

/** Redacts anything key-like before it can reach a log line. */
function safeUrl(url) { return String(url).replace(/([?&](?:key|api_key)=)[^&]*/gi, '$1REDACTED').slice(0, 120); }

/** fetch + read body, aborted (and rejected) after `ms` even if the fetch implementation ignores the signal. */
async function fetchText(url, init, ms, budgetBound) {
    const ctrl = new AbortController();
    let timer;
    const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => {
            ctrl.abort();
            reject(budgetBound ? new B.BudgetError() : Object.assign(new Error('request timed out'), { name: 'TimeoutError' }));
        }, ms);
    });
    const work = (async () => {
        const res = await fetchImpl(url, { ...init, signal: ctrl.signal });
        return { res, text: await res.text() };
    })();
    work.catch(() => { /* late rejection after abort/timeout */ });
    try { return await Promise.race([work, timeout]); } finally { clearTimeout(timer); }
}

async function httpRequest(url, opts = {}) {
    const { headers = {}, expect = 'text', retries = 3, timeoutMs = 20000, method = 'GET', body, retryOn429 = true } = opts;
    const host = new URL(url).hostname;
    const wikimedia = /(^|\.)(wikipedia|wikidata|wikimedia)\.org$/.test(host);
    let lastErr;
    for (let attempt = 1; attempt <= retries; attempt++) {
        if (B.expired()) throw new B.BudgetError();
        if (wikimedia) {
            const wait = lastCall.wikimedia + wikimediaGapMs - Date.now();
            if (wait > 0) {
                if (wait >= B.remaining()) throw new B.BudgetError();
                await sleepImpl(wait);
            }
            lastCall.wikimedia = Date.now();
            if (B.expired()) throw new B.BudgetError();
        }
        const left = B.remaining(); // Infinity while no budget is active
        const budgetBound = left < timeoutMs;
        try {
            const { res, text } = await fetchText(url, { method, body, headers: { ...headers, 'User-Agent': USER_AGENT } }, Math.min(timeoutMs, left), budgetBound);
            const ctype = (res.headers && res.headers.get && res.headers.get('content-type')) || '';
            httpLog.push(`${method} ${safeUrl(url)} -> HTTP ${res.status}`);
            if (res.status >= 200 && res.status < 300) {
                if (expect === 'json' && !/json/i.test(ctype)) throw new HttpError(`unexpected content-type "${ctype}"`, res.status, true);
                return { status: res.status, text, contentType: ctype, json: () => JSON.parse(text) };
            }
            const retriable = (res.status === 429 && retryOn429) || res.status >= 500;
            const err = new HttpError(`HTTP ${res.status}`, res.status, !retriable);
            if (err.fatal) throw err;
            lastErr = err;
        } catch (e) {
            if (e.fatal) throw e;
            if (!(e instanceof HttpError)) httpLog.push(`${method} ${safeUrl(url)} -> ${e.name}`);
            lastErr = e;
        }
        if (attempt < retries) {
            const wait = 1000 * attempt;
            if (wait >= B.remaining()) throw new B.BudgetError();
            await sleepImpl(wait);
        }
    }
    throw lastErr || new Error('request failed');
}

// ---------------------------------------------------------------- name matching
function norm(name) {
    if (!name) return '';
    const dm = { 'ø': 'o', 'æ': 'ae', 'ß': 'ss', 'ł': 'l', 'đ': 'd' };
    let t = name.toLowerCase();
    t = [...t].map((c) => dm[c] || c).join('');
    return t.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
}
function variants(name) {
    const raw = new Set([name, name.replace(/\([^)]*\)/g, '')]);
    for (const m of name.matchAll(/\(([^)]*)\)/g)) raw.add(m[1]);
    const ex = new Set(raw);
    for (const v of raw) for (const p of v.split(/\/|\s[–-]\s/)) ex.add(p);
    for (const v of [...ex]) ex.add(v.replace(/\bisland\b/i, ''));
    return new Set([...ex].map(norm).filter(Boolean));
}
function tokensOf(s) { return s.split(/[\s\/()\-–,]+/).filter(Boolean).map(norm).filter(Boolean); }
function lev(a, b) {
    const m = a.length, n = b.length;
    const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    return d[m][n];
}
function foldAscii(s) {
    const dm = { 'ø': 'o', 'Ø': 'O', 'æ': 'ae', 'ß': 'ss', 'ł': 'l', 'Ł': 'L', 'đ': 'd', 'ı': 'i' };
    return [...s].map((c) => dm[c] || c).join('').normalize('NFKD').replace(/[̀-ͯ]/g, '');
}

// ---------------------------------------------------------------- Wizz station list
function parseWizzMap(json) {
    const stations = (json.cities || [])
        .filter((c) => !c.isFakeStation && /^[A-Z]{3}$/.test(c.iata))
        .map((s) => ({ ...s, shortName: String(s.shortName || '').trim(), aliases: (s.aliases || []).map((a) => String(a).trim()) }));
    return { stations, byIata: Object.fromEntries(stations.map((s) => [s.iata, s])) };
}

const WIZZ_API_RE = /^https:\/\/[a-z0-9.-]+\.wizzair\.com\/[0-9.]+\/Api$/i;

/**
 * Returns {stations, byIata, statusLine} or {error, status, statusLine}. Never throws.
 * Exactly one request (bot User-Agent, no retry) to `${WIZZ_API_URL}/asset/map`. Any failure (non-200,
 * non-JSON, WAF/CAPTCHA challenge, stale API version) is reported, never worked around.
 */
async function loadWizzStations(env = {}) {
    if (env.AUTOADD_WIZZ_JSON) {
        try { return { ...parseWizzMap(JSON.parse(fs.readFileSync(env.AUTOADD_WIZZ_JSON, 'utf8'))), statusLine: `Wizz station list: local file ${env.AUTOADD_WIZZ_JSON}` }; }
        catch (e) { return { error: e.message, statusLine: `Wizz station list: cannot read ${env.AUTOADD_WIZZ_JSON}` }; }
    }
    const base = env.WIZZ_API_URL && WIZZ_API_RE.test(env.WIZZ_API_URL) ? env.WIZZ_API_URL : WIZZ_API_URL;
    try {
        const r = await httpRequest(`${base}/asset/map?languageCode=en-gb`, { expect: 'json', retries: 1 });
        const parsed = parseWizzMap(r.json());
        if (!parsed.stations.length) throw new Error('empty station list');
        return { ...parsed, statusLine: `Wizz station list reachable: asset/map HTTP ${r.status} (${parsed.stations.length} stations)` };
    } catch (e) {
        const budget = e instanceof B.BudgetError;
        const what = budget ? 'time budget exhausted' : (e.status ? `HTTP ${e.status}` : e.message);
        return { error: what, status: budget ? null : (e.status || null), budget, statusLine: `Wizz station list UNAVAILABLE: ${what}` };
    }
}

/** The warning text for a failed station-list load (same wording for auto-add and the probe). */
function wizzUnavailableWarning(w) {
    return `Wizz station list unavailable (${w.status ? 'HTTP ' + w.status : w.error}); the API version in scripts/lib/airport-sources.js may be stale — bump WIZZ_API_URL by hand`;
}

/** Candidate Wizz stations for a PDF name. tier: exact | prefix | fuzzy | none */
function wizzCandidates(stations, pdfName) {
    const pv = variants(pdfName);
    const names = (s) => [s.shortName, ...s.aliases];
    let c = stations.filter((s) => names(s).some((n) => [...variants(n)].some((v) => pv.has(v))));
    if (c.length) {
        const exactShort = c.filter((s) => [...variants(s.shortName)].some((v) => pv.has(v)));
        if (exactShort.length && exactShort.length < c.length) c = exactShort;
        return { tier: 'exact', c };
    }
    const pt = tokensOf(pdfName.replace(/\bisland\b/i, ''));
    c = stations.filter((s) => names(s).some((n) => { const st = tokensOf(n); return pt.length && pt.every((t, i) => st[i] === t); }));
    if (c.length) return { tier: 'prefix', c };
    const pn = norm(pdfName.replace(/\bisland\b/i, ''));
    const tol = pn.length >= 7 ? 2 : 1;
    c = stations.filter((s) => names(s).some((n) => [norm(n), tokensOf(n)[0] || ''].some((x) => x && lev(x, pn) <= tol)));
    if (c.length) return { tier: 'fuzzy', c };
    return { tier: 'none', c: [] };
}

// ---------------------------------------------------------------- OurAirports
function parseCSV(t) {
    const rows = []; let row = [], f = '', q = false;
    for (let i = 0; i < t.length; i++) {
        const ch = t[i];
        if (q) { if (ch === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += ch; }
        else if (ch === '"') q = true;
        else if (ch === ',') { row.push(f); f = ''; }
        else if (ch === '\n') { row.push(f); rows.push(row); row = []; f = ''; }
        else if (ch !== '\r') f += ch;
    }
    if (f || row.length) { row.push(f); rows.push(row); }
    return rows;
}

/** Returns {recs, byIata, statusLine} or {error, statusLine}. Never throws. */
async function loadOurAirports(env = {}) {
    let text, statusLine;
    try {
        if (env.AUTOADD_OA_CSV) { text = fs.readFileSync(env.AUTOADD_OA_CSV, 'utf8'); statusLine = `OurAirports: local file ${env.AUTOADD_OA_CSV}`; }
        else {
            const r = await httpRequest(OA_URL, { timeoutMs: 60000 });
            text = r.text; statusLine = `OurAirports CSV reachable: HTTP ${r.status}`;
        }
        const rows = parseCSV(text);
        const h = rows.shift();
        if (!h || !h.includes('iata_code') || !h.includes('scheduled_service')) throw new Error('unexpected CSV header');
        const recs = rows.filter((r) => r.length === h.length).map((r) => Object.fromEntries(h.map((k, i) => [k, r[i]])));
        const byIata = {};
        for (const r of recs) if (r.iata_code) (byIata[r.iata_code] = byIata[r.iata_code] || []).push(r);
        return { recs, byIata, statusLine };
    } catch (e) {
        return { error: e.message, budget: e instanceof B.BudgetError, statusLine: `OurAirports UNAVAILABLE: ${e.status ? 'HTTP ' + e.status : e.message}` };
    }
}
const isAirportType = (r) => /_airport$/.test(r.type);
function oaByCode(OA, code) {
    const rs = (OA.byIata[code] || []).filter((r) => r.scheduled_service === 'yes' && isAirportType(r));
    if (rs.length) return rs[0];
    return OA.recs.find((r) => r.scheduled_service === 'yes' && isAirportType(r) && (r.keywords || '').split(/,\s*/).includes(code)) || null;
}
function oaByName(OA, name, iso) {
    const n = norm(name);
    const hits = OA.recs.filter((r) => r.iata_code && r.scheduled_service === 'yes' && /^(large|medium)_airport$/.test(r.type) &&
        (!iso || r.iso_country === iso) &&
        (r.municipality || '').split(/[\s,()\/]+/).concat([r.municipality || '']).some((m) => norm(m) === n));
    return hits.length === 1 ? hits[0] : null;
}

/**
 * D1 code resolution. Returns {code, iso, oa, tier, note, needsAiConfirm} or {code:null, tier, note, candidates}.
 * wizz may be null (unreachable). counterpartCodes: IATA codes of the other endpoints of the routes.
 */
function resolveCode(pdfName, counterpartCodes, wizz, OA) {
    if (wizz && wizz.stations) {
        const c = wizzCandidates(wizz.stations, pdfName);
        let pick = null, tier = c.tier, note = '';
        if (c.c.length === 1) pick = c.c[0];
        else if (c.c.length > 1) {
            const sc = c.c.map((s) => ({ s, k: (s.connections || []).filter((x) => counterpartCodes.has(x.iata)).length })).sort((a, b) => b.k - a.k);
            note = sc.map((x) => `${x.s.iata}:${x.k}`).join(',');
            if (sc[0].k >= 2 && sc[0].k >= 2 * sc[1].k) { pick = sc[0].s; tier += '+routes'; } else tier += '+ambiguous';
        }
        const candidates = c.c.map((s) => ({ iata: s.iata, shortName: s.shortName }));
        if (pick) {
            const oa = oaByCode(OA, pick.iata);
            if (oa) return { code: pick.iata, iso: pick.countryCode, oa, tier, note, candidates };
            const alt = oaByName(OA, pick.shortName, pick.countryCode);
            // The Wizz station itself was matched by name; OurAirports only corrects its IATA code
            // (e.g. Wizz ALY -> HBE, the airport Wizz actually flies to). Same country + same name required.
            if (alt) return { code: alt.iata_code, iso: alt.iso_country, oa: alt, tier: `${tier}+oaFix(${pick.iata})`, note, candidates };
            return { code: null, tier: `${tier}+notInOurAirports(${pick.iata})`, note, candidates };
        }
        if (c.c.length === 0) {
            // OurAirports alone is unreliable; only accept its code if it is also a Wizz station.
            const oa = oaByName(OA, pdfName.split('/')[0], null);
            if (oa && wizz.byIata[oa.iata_code]) return { code: oa.iata_code, iso: oa.iso_country, oa, tier: 'oaMunicipality+wizzStation', note, candidates };
        }
        return { code: null, tier, note, candidates };
    }
    // Wizz list unreachable: OurAirports municipality match only, must be confirmed by AI.
    const oa = oaByName(OA, pdfName.split('/')[0], null);
    if (oa) return { code: oa.iata_code, iso: oa.iso_country, oa, tier: 'oaMunicipality(no-wizz-list)', needsAiConfirm: true, candidates: [] };
    return { code: null, tier: 'none(no-wizz-list)', candidates: [] };
}

function googleMapUrl(oa, code) {
    return `https://www.google.com/maps/search/${foldAscii(oa.name).replace(/[^A-Za-z0-9]+/g, '+').replace(/^\+|\+$/g, '')}+${code}`;
}

// ---------------------------------------------------------------- Wikidata / Wikipedia
async function wikidataAirportJa(code, oa) {
    if (!/^[A-Z]{3}$/.test(code)) return null;
    const en = oa && oa.wikipedia_link ? decodeURIComponent(oa.wikipedia_link.split('/wiki/')[1] || '').replace(/_/g, ' ') : null;
    const q = `SELECT ?a ?ja ?enTitle WHERE { ?a wdt:P238 "${code}". OPTIONAL{?a rdfs:label ?ja FILTER(LANG(?ja)="ja")} OPTIONAL{?e schema:about ?a; schema:isPartOf <https://en.wikipedia.org/>; schema:name ?enTitle} }`;
    const r = await httpRequest('https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(q), { headers: { Accept: 'application/sparql-results+json' }, expect: 'json' });
    const rows = r.json().results.bindings;
    const dash = (s) => s.replace(/[–-]/g, '-');
    const row = rows.length === 1 ? rows[0] : rows.find((b) => en && b.enTitle && dash(b.enTitle.value) === dash(en));
    const ja = row && row.ja && row.ja.value;
    return ja && /(空港|飛行場)$/.test(ja) ? ja : null;
}

async function wikipediaCityJa(base, iso) {
    if (!base) return null;
    const titles = [COUNTRY_EN[iso] ? `${base}, ${COUNTRY_EN[iso]}` : null, base].filter(Boolean);
    const u = 'https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=langlinks|pageprops&ppprop=disambiguation&lllang=ja&titles=' + encodeURIComponent(titles.join('|'));
    const j = (await httpRequest(u, { expect: 'json' })).json();
    if (!j.query || !j.query.pages) return null;
    const nm = {}; for (const x of (j.query.normalized || [])) nm[x.from] = x.to;
    const rd = {}; for (const x of (j.query.redirects || [])) rd[x.from] = x.to;
    for (const t of titles) {
        let t2 = nm[t] || t; t2 = rd[t2] || t2;
        const p = Object.values(j.query.pages).find((pg) => pg.title === t2);
        if (!p || p.missing !== undefined || (p.pageprops && 'disambiguation' in p.pageprops) || !p.langlinks) continue;
        let ja = p.langlinks[0]['*'].replace(/\s*[（(].*[)）]$/, '');
        if (/空港$/.test(ja)) continue;
        if (ja.length > 2) ja = ja.replace(/(?<!諸)島$/, '');
        return ja;
    }
    return null;
}

module.exports = {
    REPO_URL, USER_AGENT, WIZZ_API_URL, httpRequest, HttpError, setFetch, setWikimediaGap, setSleep, getHttpLog, resetHttpLog,
    norm, variants, lev, foldAscii, parseWizzMap, loadWizzStations, wizzUnavailableWarning, wizzCandidates,
    parseCSV, loadOurAirports, oaByCode, oaByName, resolveCode, googleMapUrl, wikidataAirportJa, wikipediaCityJa
};
