#!/usr/bin/env node
/**
 * Regression gate for direction-aware connection counts (no dependencies).
 *
 * Loads data.js in a vm, then runs the REAL derivation code extracted from index.html
 * (flightsData parse, uniqueCities, connectionsMap, outbound/inbound maps, connectionStats,
 * buildDetailConnections) and asserts, for every airport:
 *   - outbound + inbound - both == union (計)
 *   - detail chips == union; chips per direction == stats; 'out' + 'both' == outbound, 'in' + 'both' == inbound
 *   - route-list group for the airport (unfiltered) has exactly `outbound` destination chips
 *   - airports with no departures never get a route-list group
 *   - list header / sort selector (real setResultsHeader, displayFlights, displayAirports, updateTabView on a
 *     stub DOM): a search with no results shows "検索結果 0" with the sort selector hidden; the route list
 *     shows "出発空港 N / 路線 N" with the selector visible; the airport list never shows the selector
 * Usage: node scripts/check-connection-counts.js [--root <dir>] [--airport Larnaca]
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const args = process.argv.slice(2);
const root = args.includes('--root') ? args[args.indexOf('--root') + 1] : path.join(__dirname, '..');
const showAirport = args.includes('--airport') ? args[args.indexOf('--airport') + 1] : 'Larnaca';

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const dataJs = fs.readFileSync(path.join(root, 'data.js'), 'utf8');

function slice(startMarker, endMarker) {
    const a = html.indexOf(startMarker);
    if (a < 0) throw new Error(`marker not found in index.html: ${startMarker}`);
    const b = html.indexOf(endMarker, a);
    if (b < 0) throw new Error(`end marker not found in index.html: ${endMarker}`);
    return html.slice(a, b);
}

// Pieces of the real page script, in page order.
const code = [
    slice('const {\n            airportCodes = {}', '// 空港コードマッピング'),
    slice('const flightsData = rawFlightData', 'let filteredFlights'),
    'let uniqueCities = [];',
    slice('// ユニークな都市リスト作成', 'let storageAvailable'),
    'this.__out = { flightsData, uniqueCities, connectionsMap, outboundMap, inboundMap, connectionStats, formatConnectionStats, buildDetailConnections };'
].join('\n');

const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(dataJs, ctx, { filename: 'data.js' });
vm.runInContext(code, ctx, { filename: 'index.html#extracted' });
const P = ctx.__out;

let failures = 0;
const fail = (msg) => { failures++; if (failures <= 30) console.error('FAIL', msg); };

// Data sanity (reported, not fatal unless it breaks counts)
const lines = P.flightsData.map((f) => `${f.from} - ${f.to}`);
const dupLines = lines.length - new Set(lines).size;
const selfLoops = P.flightsData.filter((f) => f.from === f.to).length;
const unknownCodes = [...new Set(P.flightsData.flatMap((f) => [f.fromCode === '???' ? f.from : null, f.toCode === '???' ? f.to : null]).filter(Boolean))];

// Route-list grouping exactly as displayFlights() does it (unfiltered = home, no search).
const groupDest = new Map();
P.flightsData.forEach((f) => {
    if (!groupDest.has(f.from)) groupDest.set(f.from, new Set());
    groupDest.get(f.from).add(f.to);
});

let oneWayAirports = 0, arrivalOnly = [], departureOnly = [];
for (const city of P.uniqueCities) {
    const name = city.en;
    const s = P.connectionStats(name);
    const out = P.outboundMap.get(name) || new Set();
    const inb = P.inboundMap.get(name) || new Set();
    const both = [...out].filter((x) => inb.has(x)).length;
    if (s.outbound + s.inbound - both !== s.total) fail(`${name}: ${s.outbound}+${s.inbound}-${both} != ${s.total}`);
    const chips = P.buildDetailConnections(name);
    if (chips.length !== s.total) fail(`${name}: detail chips ${chips.length} != total ${s.total}`);
    const n = (d) => chips.filter((c) => c.dir === d).length;
    if (n('out') + n('both') !== s.outbound) fail(`${name}: out+both chips != outbound`);
    if (n('in') + n('both') !== s.inbound) fail(`${name}: in+both chips != inbound`);
    if (n('both') !== both) fail(`${name}: both chips != intersection`);
    if (new Set(chips.map((c) => c.en)).size !== chips.length) fail(`${name}: duplicate detail chips`);
    const header = P.formatConnectionStats(name);
    if (header !== `出発先 ${s.outbound} / 到着元 ${s.inbound} / 計 ${s.total}`) fail(`${name}: header text ${header}`);
    const g = groupDest.get(name);
    if (s.outbound === 0) {
        if (g) fail(`${name}: arrival-only airport has a route-list group`);
        arrivalOnly.push(name);
    } else if (!g || g.size !== s.outbound) fail(`${name}: route-list group chips ${g ? g.size : 0} != outbound ${s.outbound}`);
    if (s.inbound === 0) departureOnly.push(name);
    if (n('out') + n('in') > 0) oneWayAirports++;
}

const L = P.connectionStats(showAirport);
console.log(`routes=${P.flightsData.length} airports=${P.uniqueCities.length} duplicateLines=${dupLines} selfLoops=${selfLoops} unknownCodes=${JSON.stringify(unknownCodes)}`);
console.log(`airports with >=1 one-way connection: ${oneWayAirports}`);
console.log(`arrival-only (${arrivalOnly.length}): ${arrivalOnly.sort().join(', ')}`);
console.log(`departure-only (${departureOnly.length}): ${departureOnly.sort().join(', ')}`);
console.log(`${showAirport}: ${P.formatConnectionStats(showAirport)}; route-list group chips=${(groupDest.get(showAirport) || new Set()).size}; →のみ=${P.buildDetailConnections(showAirport).filter((c) => c.dir === 'out').map((c) => c.en).join(', ')}; ←のみ=${P.buildDetailConnections(showAirport).filter((c) => c.dir === 'in').map((c) => c.en).join(', ')}`);
// ---------------------------------------------------------------- list header / sort selector states
{
    const el = () => {
        const cls = new Set();
        return { innerHTML: '', value: '', classList: { toggle: (c, on) => (on ? cls.add(c) : cls.delete(c)), add: (c) => cls.add(c), remove: (c) => cls.delete(c), contains: (c) => cls.has(c) } };
    };
    const dom = { resultsCountLabel: el(), sortSelect: el(), flightsGrid: el() };
    const uiCtx = {
        window: {}, console,
        document: { getElementById: (id) => dom[id] || el() },
        favoritesSection: el(), rankingSection: el(), resultsContainer: el(), searchInput: el(),
        currentFilter: 'all', searchMode: 'routes', currentSort: 'default',
        renderRankingSection() {}, schengenBadge: () => '', formatCountryLabel: (x) => x, isFavorite: () => false, getLoungeIndicator: () => ''
    };
    vm.createContext(uiCtx);
    vm.runInContext(dataJs, uiCtx, { filename: 'data.js' });
    vm.runInContext([
        code.replace(/this\.__out = [^\n]*/, ''),
        slice('        function updateTabView() {', '        function hiraganaToKatakana('),
        slice('        function displayFlights(flights) {', '        const flightsGrid = document.getElementById'),
        'this.__ui = { displayFlights, displayAirports, updateTabView, flightsData, uniqueCities, setSearchMode: (m) => { searchMode = m; } };'
    ].join('\n'), uiCtx, { filename: 'index.html#ui' });
    const U = uiCtx.__ui;
    const label = () => dom.resultsCountLabel.innerHTML.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const sortShown = () => !dom.sortSelect.classList.contains('is-hidden');
    const expectState = (name, re, sort) => {
        if (!re.test(label()) || sortShown() !== sort) fail(`ui ${name}: header "${label()}", sort ${sortShown() ? 'shown' : 'hidden'}`);
        else console.log(`ui ${name}: header "${label()}", sort ${sortShown() ? 'shown' : 'hidden'}`);
    };
    uiCtx.searchInput.value = 'zzz';
    U.setSearchMode('routes'); U.displayFlights([]); U.updateTabView();
    expectState('route search, no results', /^検索結果 0$/, false);
    if (!/no-results/.test(dom.flightsGrid.innerHTML)) fail('ui route search, no results: no .no-results card');
    U.displayFlights(U.flightsData); U.updateTabView();
    expectState('route list', /^出発空港 \d+ \/ 路線 \d+$/, true);
    U.setSearchMode('airports'); U.displayAirports([]); U.updateTabView();
    expectState('airport search, no results', /^検索結果 0$/, false);
    U.displayAirports(U.uniqueCities.slice(0, 3)); U.updateTabView();
    expectState('airport list', /^空港 3$/, false);
    U.setSearchMode('routes'); U.displayFlights([]); U.updateTabView();
    U.displayFlights(U.flightsData); U.updateTabView();
    expectState('route list after an empty search', /^出発空港 \d+ \/ 路線 \d+$/, true);
}

// ---------------------------------------------------------------- data.js consistency (lounges, country labels, regions)
{
    const D = ctx.window.AIRPORT_DATA;
    // A Priority Pass lounge page belongs to ONE airport. match_lounges.py once matched by city name, so the low-cost satellite
    // airports got the lounge of their city's main airport (Frankfurt Hahn -> Frankfurt Main with the crown icon, Paris Beauvais -> CDG,
    // Stockholm Skavsta -> Arlanda). Those three entries were deleted: each must stay absent, or point at a page naming the airport itself.
    const SATELLITES = [['Frankfurt', 'HHN', ['hahn', 'hhn']], ['Paris', 'BVA', ['beauvais', 'bva']], ['Stockholm', 'NYO', ['skavsta', 'nyo']]];
    for (const [key, code, tokens] of SATELLITES) {
        if (D.airportCodes[key] !== code) { console.log(`lounge: ${key} is no longer ${code} in airportCodes (${D.airportCodes[key]}); check not applicable`); continue; }
        const url = D.loungeData[key];
        if (!url) console.log(`lounge: ${key} (${code}) has no lounge entry (correct: no matching Priority Pass page)`);
        else if (tokens.some((t) => url.toLowerCase().includes(t))) console.log(`lounge: ${key} (${code}) -> ${url} (names the airport)`);
        else fail(`lounge: ${key} (${code}) carries ${url}, which does not name that airport (main-airport lounge on a satellite airport)`);
    }
    for (const key of Object.keys(D.loungeData)) if (!(key in D.airportCodes)) fail(`lounge: loungeData key ${key} is not a registry airport`);
    // The two Scottish airports are labelled like every other UK airport (owner decision; they were "スコットランド" before).
    for (const key of ['Aberdeen', 'Glasgow']) {
        if (D.countryMap[key] !== D.countryMap['London (LTN)']) fail(`country: ${key} is "${D.countryMap[key]}", other UK airports are "${D.countryMap['London (LTN)']}"`);
    }
    if (Object.values(D.countryMap).includes('スコットランド')) fail('country: a stray "スコットランド" label is still in countryMap');
    // Region totals: every airport of the routes is in exactly one region and the regions add up to the airport total.
    const regionCount = {};
    for (const city of P.uniqueCities) { const r = D.regionMap[city.en]; regionCount[r] = (regionCount[r] || 0) + 1; }
    const regionSum = Object.values(regionCount).reduce((a, b) => a + b, 0);
    if (regionSum !== P.uniqueCities.length || Object.keys(regionCount).some((r) => !['西欧', '東欧', '南欧', '北欧', '中東'].includes(r))) fail(`regions: ${JSON.stringify(regionCount)} do not add up to ${P.uniqueCities.length} airports in the 5 known regions`);
    else console.log(`regions: ${JSON.stringify(regionCount)} = ${regionSum} airports`);
}

if (failures) { console.error(`${failures} invariant failure(s)`); process.exit(1); }
console.log(`OK: all invariants hold for ${P.uniqueCities.length} airports (L.total=${L.total})`);
