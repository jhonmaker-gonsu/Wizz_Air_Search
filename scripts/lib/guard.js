'use strict';
/**
 * Safety guard for the daily route update. update-routes-from-pdf.js runs it after the airport matching
 * and BEFORE it writes any file. When a hard check fails it throws GuardError: nothing is written, the
 * script exits 1, the workflow's commit step is skipped and the Pages deploy (workflow_run, success only)
 * does not run, so the site keeps the data it already has. FORCE_UPDATE=true (the manual workflow input
 * force_update) turns the hard failures of that one run into warnings.
 *
 * Limits are derived from 58 daily PDFs (2026-07-30 .. 2026-10-02): 683..1312 routes, 146..162 airports,
 * 123..150 departure airports, largest day-over-day change -23.0% / +33.3% routes (largest drop over 3 days
 * -35.2%) and -8.2% departure airports (-13.4% over any span), no duplicate rows, and the same header lines
 * and complete "Page k of M" footers in every file. One airport carries 8.3-12.5% of all routes on its busiest day.
 */
const LIMITS = Object.freeze({
    minRoutes: 300,       // hard: routes in the PDF and routes to publish (lowest observed: 683)
    minAirports: 100,     // hard: airports in the routes to publish (lowest observed: 146)
    maxDropPct: 45,       // hard: route fall vs data.js (worst observed: -23.0% in 1 day, -35.2% in 3 days)
    maxDepDropPct: 20,    // hard: departure-airport fall vs data.js (worst observed: -8.2% in 1 day, -13.4% over any span);
    //                       the PDF is sorted by departure city, so a cut-off list loses departure airports first
    maxSkippedPct: 5,     // hard: routes dropped for unrecognized airports (one large airport alone is 5-12.5%)
    warnRisePct: 50,      // warning: route rise vs data.js (worst observed: +33.3% in 1 day)
    warnAgeDays: 2        // warning: "Last run" date at least this many days before today (regenerated daily 07:00 CET)
});

// Every column-header line of the 58 sampled PDFs has exactly this shape; the parser relies on this column order.
const HEADER_RE = /^\s*Departure City\s+Arrival City(?:\s+Departure City\s+Arrival City)?\s*$/;
const SITE_DATE_RE = /All You Can Fly 最新空席データ（(\d{4})年(\d{1,2})月(\d{1,2})日更新）/;

class GuardError extends Error {
    constructor(message) { super(message); this.name = 'GuardError'; }
}

const pad2 = (n) => String(n).padStart(2, '0');
const fmtPct = (p) => `${p > 0 ? '+' : ''}${p.toFixed(1)}%`;
const dayNumber = (iso) => Math.floor(Date.parse(`${iso}T00:00:00Z`) / 86400000);
const airportCount = (routes) => new Set(routes.flatMap((route) => route.split(' - '))).size;
const departureCount = (routes) => new Set(routes.map((route) => route.split(' - ')[0])).size;
// GitHub workflow commands: one line, '%' / CR / LF encoded (an unencoded '%' would be mangled).
const cmd = (s) => String(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');

function headerOk(pdfText) {
    const lines = pdfText.replace(/\f/g, '\n').split(/\r?\n/).filter((line) => /Departure City|Arrival City/.test(line));
    return lines.length > 0 && lines.every((line) => HEADER_RE.test(line));
}

/** "Page k of M" footers: true when pages 1..M are all present exactly once (a cut-off PDF misses the last ones). */
function pagesComplete(pdfText) {
    const footers = [...pdfText.matchAll(/Page[ \t]+(\d+)[ \t]+of[ \t]+(\d+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
    const total = footers.length ? footers[0][1] : 0;
    const seen = footers.map(([k]) => k).sort((a, b) => a - b);
    return total > 0 && footers.every(([, t]) => t === total) && seen.length === total && seen.every((k, i) => k === i + 1);
}

/** Date currently shown on the site (index.html), YYYY-MM-DD, or null. */
function siteDate(indexHtml) {
    const m = String(indexHtml || '').match(SITE_DATE_RE);
    return m ? `${m[1]}-${pad2(m[2])}-${pad2(m[3])}` : null;
}

/**
 * The numbers the guard decides on.
 *   pdfPairs        parsePdfRoutes() output: every route row of the PDF (aliases applied)
 *   candidateRoutes routes after London / name matching, before unrecognized airports are dropped
 *   routes          the routes that would be written to data.js
 *   previousRoutes  the routes currently in data.js (the last successful publish)
 *   lastRun         the match the date line is written from (null when the PDF has none)
 */
function measure({ pdfText, pdfPairs, candidateRoutes, routes, previousRoutes, lastRun, indexHtml, now }) {
    const rows = pdfPairs.map((pair) => pair.join(' - '));
    const parsedRoutes = new Set(rows).size;
    return {
        headerOk: headerOk(pdfText),
        pagesOk: pagesComplete(pdfText),
        lastRunDate: lastRun ? `${lastRun[1]}-${lastRun[2]}-${lastRun[3]}` : null,
        siteDate: siteDate(indexHtml),
        today: new Date(now).toISOString().slice(0, 10),
        duplicateRows: rows.length - parsedRoutes,
        parsedRoutes,
        candidateRoutes: candidateRoutes.length,
        routes: routes.length,
        airports: airportCount(routes),
        departures: departureCount(routes),
        skippedRoutes: candidateRoutes.length - routes.length,
        previousRoutes: previousRoutes.length,
        previousDepartures: departureCount(previousRoutes)
    };
}

/** Pure decision. checks: the hard checks (table rows); failures / warnings: one-line reasons. */
function evaluate(m, L = LIMITS) {
    const changePct = m.previousRoutes > 0 ? ((m.routes - m.previousRoutes) / m.previousRoutes) * 100 : 0;
    const depChangePct = m.previousDepartures > 0 ? ((m.departures - m.previousDepartures) / m.previousDepartures) * 100 : 0;
    const skippedPct = m.candidateRoutes > 0 ? (m.skippedRoutes / m.candidateRoutes) * 100 : 0;
    const comparable = m.previousRoutes >= L.minRoutes; // no relative checks against a tiny / empty previous publish
    const checks = [
        { label: 'Column headers "Departure City / Arrival City"', value: m.headerOk ? 'as expected' : 'missing or changed', limit: 'unchanged layout', ok: m.headerOk,
            why: 'the PDF layout changed: the "Departure City / Arrival City" column headers are missing or different' },
        { label: '"Last run:" date', value: m.lastRunDate || 'not found', limit: 'present', ok: !!m.lastRunDate,
            why: 'the PDF layout changed: no "Last run:" date found (the update date on the site could not be set)' },
        { label: 'Page footers "Page k of M"', value: m.pagesOk ? 'all pages present' : 'pages missing or footers changed', limit: 'pages 1..M', ok: m.pagesOk,
            why: 'the PDF is incomplete or its layout changed: the "Page k of M" footers do not cover every page' },
        { label: 'Routes in the PDF', value: String(m.parsedRoutes), limit: `≥ ${L.minRoutes}`, ok: m.parsedRoutes >= L.minRoutes,
            why: `the PDF contains only ${m.parsedRoutes} routes (minimum ${L.minRoutes})` },
        { label: 'Routes to publish', value: String(m.routes), limit: `≥ ${L.minRoutes}`, ok: m.routes >= L.minRoutes,
            why: `only ${m.routes} routes would be published (minimum ${L.minRoutes})` },
        { label: 'Airports to publish', value: String(m.airports), limit: `≥ ${L.minAirports}`, ok: m.airports >= L.minAirports,
            why: `only ${m.airports} airports would be published (minimum ${L.minAirports})` },
        { label: `Routes vs the published data (${m.previousRoutes})`, value: fmtPct(changePct), limit: `≥ -${L.maxDropPct}%`,
            ok: !(comparable && changePct < -L.maxDropPct),
            why: `routes fell ${fmtPct(changePct)} vs the published data (${m.previousRoutes} -> ${m.routes}; limit -${L.maxDropPct}%)` },
        { label: `Departure airports vs the published data (${m.previousDepartures})`, value: `${m.departures} (${fmtPct(depChangePct)})`, limit: `≥ -${L.maxDepDropPct}%`,
            ok: !(comparable && depChangePct < -L.maxDepDropPct),
            why: `departure airports fell ${fmtPct(depChangePct)} vs the published data (${m.previousDepartures} -> ${m.departures}; limit -${L.maxDepDropPct}%): the list looks cut off` },
        { label: 'Routes dropped (unrecognized airports)', value: `${m.skippedRoutes} (${skippedPct.toFixed(1)}%)`, limit: `≤ ${L.maxSkippedPct}%`, ok: skippedPct <= L.maxSkippedPct,
            why: `${m.skippedRoutes} routes (${skippedPct.toFixed(1)}%) would be dropped because their airports are not recognized (limit ${L.maxSkippedPct}%)` }
    ];
    const warnings = [];
    if (m.previousRoutes > 0 && changePct > L.warnRisePct) warnings.push(`routes rose ${fmtPct(changePct)} vs the published data (${m.previousRoutes} -> ${m.routes}); check the PDF if this looks wrong`);
    if (m.duplicateRows > 0) warnings.push(`the PDF lists ${m.duplicateRows} duplicate route row(s); duplicates are ignored`);
    if (m.lastRunDate) {
        const age = dayNumber(m.today) - dayNumber(m.lastRunDate);
        if (age >= L.warnAgeDays) warnings.push(`the PDF "Last run" date ${m.lastRunDate} is ${age} days old; Wizz Air may have stopped regenerating it`);
        if (m.siteDate && m.lastRunDate < m.siteDate) warnings.push(`the PDF (${m.lastRunDate}) is older than the data on the site (${m.siteDate})`);
    }
    return { checks, failures: checks.filter((c) => !c.ok).map((c) => c.why), warnings, changePct };
}

/** Prints the verdict: ::warning:: / ::error:: lines for the run page, a section for the job summary. */
function report(verdict, m, { force, log, summary }) {
    for (const w of verdict.warnings) log(`::warning::${cmd(`Safety guard: ${w}`)}`);
    const table = `| Check | This PDF | Limit | Result |\n|---|---|---|---|\n${verdict.checks.map((c) =>
        `| ${c.label} | ${c.value} | ${c.limit} | ${c.ok ? 'ok' : '**FAILED**'} |`).join('\n')}\n`;
    const warningList = verdict.warnings.length ? `\n${verdict.warnings.map((w) => `- ⚠️ ${w}`).join('\n')}\n` : '';
    const failures = verdict.failures;
    if (!failures.length) {
        log(`Safety guard passed: ${m.routes} routes, ${m.airports} airports (published before: ${m.previousRoutes}, ${fmtPct(verdict.changePct)}).`);
        summary(`\n✅ Safety guard passed: ${m.routes} routes, ${m.airports} airports (published before: ${m.previousRoutes}; ${fmtPct(verdict.changePct)}).${force ? ' force_update was set but not needed.' : ''}\n${warningList}`);
        return;
    }
    const head = failures[0] + (failures.length > 1 ? ` (+${failures.length - 1} more failed check(s), see the job summary)` : '');
    if (force) {
        log(`::warning::${cmd(`force_update: publishing although the safety guard failed: ${head}`)}`);
        summary(`\n### ⚠️ force_update was used: safety guard overridden\n\nThis manual run publishes the PDF although these checks failed:\n\n${table}${warningList}`);
        return;
    }
    log(`::error::${cmd(`Route data NOT updated, the site keeps its current data: ${head}. If this change is real, run "Update Wizz Air availability" manually with force_update checked.`)}`);
    summary(`\n### ⛔ Route data NOT updated: the safety guard refused this PDF\n\n${table}${warningList}\n` +
        `Nothing was written, committed or deployed: the site keeps its current data (${m.previousRoutes} routes, updated ${m.siteDate || 'date unknown'}).\n\n` +
        'If the change is real, open Actions → **Update Wizz Air availability** → **Run workflow** and tick **force_update**.\n');
}

/** pdftotext could not read the download (HTML error page, empty or cut-off file): report it, return the error to throw. */
function unreadable(error, { log, summary }) {
    const detail = String((error && (error.stderr || error.message)) || 'unknown error').split('\n').map((s) => s.trim()).find(Boolean) || 'unknown error';
    const why = `the downloaded file is not a readable PDF (pdftotext: ${detail.slice(0, 160)})`;
    log(`::error::${cmd(`Route data NOT updated, the site keeps its current data: ${why}`)}`);
    summary(`\n### ⛔ Route data NOT updated: the downloaded file is not a readable PDF\n\npdftotext: \`${detail.slice(0, 160).replace(/`/g, "'")}\`\n\n` +
        'Nothing was written, committed or deployed: the site keeps its current data. The next scheduled run downloads the PDF again.\n');
    return new GuardError(why);
}

module.exports = { LIMITS, GuardError, measure, evaluate, report, unreadable, headerOk, pagesComplete, siteDate };
