// State sweep for the list views. Paste into the page console (or Browser javascript_tool).
// Drives the REAL UI (input events, filter-button clicks) through every list state and checks that
// every number on screen equals what is listed. Works on the old and the new index.html.
// Read-only: favorites/visited are modified in memory only (never saved) and restored afterwards.
(() => {
    const out = [];
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const visible = (el) => el && !el.closest('.is-hidden') && el.offsetParent !== null;
    const stats = (en) => ({
        o: (typeof outboundMap !== 'undefined' && outboundMap.get(en) || new Set()).size,
        i: (typeof inboundMap !== 'undefined' && inboundMap.get(en) || new Set()).size,
        t: (connectionsMap.get(en) || new Set()).size
    });
    function check(state) {
        const errs = [];
        const grid = $('#flightsGrid');
        const header = $('.results-count').textContent.replace(/\s+/g, ' ').trim();
        const groups = $$('.flight-group', grid);
        const chips = $$('.airport-chip', grid);
        const resultsShown = visible($('#resultsContainer'));
        const nums = (header.match(/\d+/g) || []).map(Number);
        if (resultsShown) {
            if (/路線/.test(header)) {
                const depGroups = groups.filter((g) => $$('.airport-chip', g).length > 0).length;
                if (nums[0] !== depGroups) errs.push(`header 出発空港 ${nums[0]} but ${depGroups} departure groups listed`);
                if (nums[1] !== chips.length) errs.push(`header 路線 ${nums[1]} but ${chips.length} route chips listed`);
            } else if (/^国/.test(header)) {
                if (nums[0] !== groups.length) errs.push(`header 国 ${nums[0]} but ${groups.length} country groups`);
                if (nums[1] !== chips.length) errs.push(`header 空港 ${nums[1]} but ${chips.length} airport chips`);
            } else if (/^空港/.test(header)) {
                if (nums[0] !== groups.length) errs.push(`header 空港 ${nums[0]} but ${groups.length} cards`);
            } else errs.push(`unrecognised header "${header}"`);
            if (visible($('#sortSelect')) && !/路線/.test(header)) errs.push('route sort selector shown in a non-route list');
            for (const g of groups) {
                const meta = $('.airport-meta', g);
                if (!meta) continue;
                const t = meta.textContent;
                const en = g.dataset.airport;
                const n = $$('.airport-chip', g).length;
                const s = stats(en);
                const m = t.match(/出発先 (\d+) \/ 到着元 (\d+) \/ 計 (\d+)/);
                const old = t.match(/接続数: (\d+)/);
                if (m) {
                    if (+m[1] !== s.o || +m[2] !== s.i || +m[3] !== s.t) errs.push(`${en}: card "${t.trim()}" != data ${JSON.stringify(s)}`);
                    const shown = t.match(/表示 (\d+)/);
                    if (n > 0 && n !== (shown ? +shown[1] : +m[1])) errs.push(`${en}: ${n} chips listed vs card ${t.trim()}`);
                    if (n === 0 && !$('.airport-meta-hint', g)) errs.push(`${en}: card counts connections but lists none and has no tap hint`);
                } else if (old) {
                    if (+old[1] !== s.t) errs.push(`${en}: 接続数 ${old[1]} != ${s.t}`);
                    if (n !== +old[1]) errs.push(`${en}: card says 接続数 ${old[1]} but lists ${n} airports`);
                }
            }
        }
        const rank = $('#rankingSection');
        if (visible(rank)) {
            for (const c of $$('#rankingGrid .airport-chip')) {
                const k = +(c.textContent.match(/接続数: ?(\d+)/) || [])[1];
                if (k !== stats(c.dataset.airport).t) errs.push(`ranking ${c.dataset.airport}: ${k} != ${stats(c.dataset.airport).t}`);
            }
        }
        out.push({ state, header: resultsShown ? header : '(results hidden)', groups: groups.length, chips: chips.length,
                   ranking: visible(rank) ? $$('#rankingGrid .airport-chip').length : 0, errors: errs.length, sample: errs.slice(0, 3) });
    }
    const type = (v) => { const i = $('#searchInput'); i.value = v; i.dispatchEvent(new Event('input', { bubbles: true })); if (typeof closeDetailView === 'function') closeDetailView(); };
    const click = (f) => $(`.filter-btn[data-filter="${f}"]`).click();
    const home = () => { $('#homeButton').click(); };

    home(); check('home');
    for (const t of ['ラル', 'らる', 'lar', 'ポーランド', 'Poland', 'キプロス', 'ア', 'a', 'lc', 'w6', 'zzz']) { home(); type(t); check(`search "${t}"`); }
    for (const f of ['西欧', '東欧', '南欧', '北欧', '中東', 'lounge']) { home(); click(f); check(`tab ${f}`); }
    // sort selector while an airport list is shown
    home(); type('ラル'); const ss = $('#sortSelect'); ss.value = 'ja-asc'; ss.dispatchEvent(new Event('change')); check('search "ラル" then sort 出発地順'); ss.value = 'default';
    // autocomplete country pick (the dropdown path)
    home(); type('キプ'); const ci = $('.autocomplete-item[data-country]'); if (ci) { ci.click(); check('autocomplete country キプロス'); }
    // visited / favorites (in memory only)
    const savedV = [...visitedAirports], savedF = [...favorites];
    ['Larnaca', 'Budapest', 'Brasov', 'Paphos'].forEach((a) => visitedAirports.add(a));
    ['Larnaca', 'Brasov'].forEach((a) => favorites.add(a));
    home(); click('visited-airports'); check('tab 行った空港');
    if ($('.filter-btn[data-filter="visited-countries"]')) { home(); click('visited-countries'); check('tab 行った国'); }
    else { currentFilter = 'visited-countries'; renderVisitedCountriesTab(); updateTabView(); check('行った国 (no button; rendered directly)'); }
    home(); click('favorites'); check('tab お気に入り');
    visitedAirports.clear(); savedV.forEach((a) => visitedAirports.add(a));
    favorites.clear(); savedF.forEach((a) => favorites.add(a));
    home();
    return out;
})();
