// State sweep for the list views. Paste into the page console (or Browser javascript_tool).
// Drives the REAL UI (input events, filter-button clicks) through every list state and checks that
// every number on screen equals what is listed. The first part works on the old and the new index.html; the last part
// ("behaviour checks": star clicks, search while on a tab, default order, empty 行った空港 tab, IME / similar-name search) checks
// fixes of the audit rows B1, B2, B5, B6, B7, B13 and reports every failure as an error of its own state line.
// Read-only: favorites/visited are modified in memory only (never saved: saveFavorites is stubbed while stars are clicked) and restored afterwards.
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
            const empty = $$('.no-results', grid).some(visible);
            if (empty || /^検索結果/.test(header)) {
                // 結果なし: 件数は 0 だけ、並び替えは出さない、一覧は空で「検索結果なし」カードがある
                if (!/^検索結果 0$/.test(header)) errs.push(`no-results state shows header "${header}" (expected "検索結果 0")`);
                if (visible($('#sortSelect'))) errs.push('sort selector shown with no results');
                if (groups.length || chips.length) errs.push(`no-results state still lists ${groups.length} groups / ${chips.length} chips`);
                if (!empty) errs.push('header says 検索結果 0 but no .no-results card is shown');
            } else if (/路線/.test(header)) {
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
    for (const t of ['ラル', 'らる', 'lar', 'ポーランド', 'Poland', 'キプロス', 'ア', 'a', 'lc', 'w6', 'zzz', 'ｚｚｚ', '該当なし']) { home(); type(t); check(`search "${t}"`); }
    // 結果なし → 路線一覧に戻ると並び替えも戻る
    home(); type('zzz'); type('lc'); check('search "zzz" then "lc"');
    if (!visible($('#sortSelect'))) out.push({ state: 'search "zzz" then "lc"', errors: 1, sample: ['sort selector not restored after an empty search'] });
    for (const f of ['西欧', '東欧', '南欧', '北欧', '中東', 'lounge']) { home(); click(f); check(`tab ${f}`); }
    // sort selector while an airport list is shown
    home(); type('ラル'); const ss = $('#sortSelect'); ss.value = 'ja-asc'; ss.dispatchEvent(new Event('change')); check('search "ラル" then sort 出発地順'); ss.value = 'default'; ss.dispatchEvent(new Event('change')); // back to the default order for the checks below
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

    // ------------------------------------------------------------------ behaviour checks (audit B1, B2, B5, B6, B7, B13)
    const realSave = window.saveFavorites;
    window.saveFavorites = () => { /* read-only sweep: star clicks must not write localStorage */ };
    const fails = (state, msgs) => out.push({ state, header: '-', groups: 0, chips: 0, ranking: 0, errors: msgs.length, sample: msgs.slice(0, 3) });
    const activeTab = () => { const b = $('.filter-btn.active'); return b ? b.dataset.filter : null; };
    const headerText = () => $('.results-count').textContent.replace(/\s+/g, ' ').trim();
    const listKeys = () => $$('#flightsGrid [data-airport]').map((e) => e.dataset.airport).join('|');
    const detailIsOpen = () => !$('#detailView').classList.contains('is-hidden');
    const input = (v, init = {}) => { const i = $('#searchInput'); i.value = v; i.dispatchEvent(new InputEvent('input', { bubbles: true, ...init })); };
    try {
        ['Larnaca', 'Budapest', 'Brasov', 'Paphos'].forEach((a) => visitedAirports.add(a));

        // B1: a star click must not re-render the list (it used to replace any airport list with all routes)
        const starContexts = [['tab 西欧', () => click('西欧')], ['tab 東欧', () => click('東欧')], ['tab 南欧', () => click('南欧')], ['tab 北欧', () => click('北欧')],
            ['tab 中東', () => click('中東')], ['tab ラウンジあり', () => click('lounge')], ['tab 行った空港', () => click('visited-airports')],
            ['search ポーランド (country list)', () => type('ポーランド')], ['search ラル (airport list)', () => type('ラル')], ['search lc (route list)', () => type('lc')]];
        for (const [label, enter] of starContexts) {
            home(); enter();
            const errs = [];
            const btn = $('#flightsGrid .star-btn');
            if (!btn) { fails(`star in ${label}`, ['no star button found in this list']); continue; }
            const en = btn.dataset.favAirport, was = favorites.has(en);
            const before = [headerText(), listKeys(), activeTab(), visible($('#sortSelect'))].join(' # ');
            btn.click();
            const after = [headerText(), listKeys(), activeTab(), visible($('#sortSelect'))].join(' # ');
            if (before !== after) errs.push(`list changed by the star click: "${before.split(' # ')[0]}" -> "${after.split(' # ')[0]}", tab ${before.split(' # ')[2]} -> ${after.split(' # ')[2]}`);
            if (favorites.has(en) === was) errs.push(`${en}: favorite state did not change`);
            const nowBtn = $$('#flightsGrid .star-btn').find((b) => b.dataset.favAirport === en);
            if (!nowBtn || nowBtn.classList.contains('active') !== favorites.has(en)) errs.push(`${en}: the on-screen star does not show the favorite state`);
            if (nowBtn) nowBtn.click(); // back to the original state
            if (favorites.has(en) !== was) errs.push(`${en}: second click did not restore the state`);
            check(`star in ${label}`);
            if (errs.length) fails(`star in ${label} (behaviour)`, errs);
        }

        // B5: starting a search switches to the "all" tab; clearing it shows the home state (no stale 行った空港 / 北欧 / お気に入り view)
        favorites.add('Larnaca');
        const polish = uniqueCities.filter((c) => c.country === 'ポーランド').length;
        for (const tab of ['西欧', '東欧', '南欧', '北欧', '中東', 'lounge', 'visited-airports', 'favorites']) {
            home(); click(tab);
            type('ポーランド');
            const errs = [];
            if (activeTab() !== 'all') errs.push(`tab ${tab} still highlighted while searching (active: ${activeTab()})`);
            if (!visible($('#resultsContainer')) || headerText() !== `空港 ${polish}`) errs.push(`search result is "${headerText()}" (expected 空港 ${polish}, all regions)`);
            if (visible($('#favoritesSection'))) errs.push('favorites section visible during a search');
            check(`search ポーランド while on tab ${tab}`);
            type('');
            if (activeTab() !== 'all' || !visible($('#rankingSection')) || visible($('#resultsContainer'))) errs.push(`after clearing the search: tab ${activeTab()}, ranking ${visible($('#rankingSection'))}, results ${visible($('#resultsContainer'))} (expected home)`);
            check(`cleared search after tab ${tab}`);
            if (errs.length) fails(`search while on tab ${tab} (behaviour)`, errs);
        }
        favorites.delete('Larnaca');

        // B6: デフォルト順 restores the original order after another sort
        {
            $('#sortSelect').value = 'default'; currentSort = 'default';
            home(); type('lc');
            const errs = [];
            const order = () => $$('#flightsGrid .flight-group').map((g) => g.dataset.airport).join('|');
            const sortTo = (v) => { const ss = $('#sortSelect'); ss.value = v; ss.dispatchEvent(new Event('change', { bubbles: true })); };
            if (!/路線/.test(headerText())) errs.push(`search "lc" is not a route list ("${headerText()}")`);
            else {
                const first = order();
                sortTo('ja-asc'); const asc = order();
                if (asc === first) errs.push('出発地順（あ→ん） did not change the order');
                sortTo('default'); if (order() !== first) errs.push('デフォルト順 after あ→ん does not restore the original order');
                sortTo('ja-desc'); const desc = order();
                if (desc === asc || desc === first) errs.push('出発地順（ん→あ） gave the same order as another sort');
                sortTo('default'); if (order() !== first) errs.push('デフォルト順 after ん→あ does not restore the original order');
                check('route list after sort changes');
            }
            $('#sortSelect').value = 'default'; currentSort = 'default';
            if (errs.length) fails('default order after sorting (behaviour)', errs);
        }

        // B13: an empty 行った空港 tab says how to register, not "検索結果なし"
        {
            visitedAirports.clear(); home(); click('visited-airports');
            const errs = [];
            const text = $('#flightsGrid').textContent.replace(/\s+/g, ' ');
            if (!/登録/.test(text) || /別のキーワード/.test(text)) errs.push(`empty-state text is "${text.trim()}"`);
            check('tab 行った空港 (empty)');
            if (errs.length) fails('empty 行った空港 tab (behaviour)', errs);
            ['Larnaca', 'Budapest', 'Brasov', 'Paphos'].forEach((a) => visitedAirports.add(a));
        }

        // B2 / B7: no auto-open while composing or when a longer name starts with the typed text; full-width input works
        {
            const errs = [];
            const probe = (value, init) => { home(); input(value, init); const open = detailIsOpen() ? currentDetailAirport : null; closeDetailView(); return open; };
            if (probe('ber') !== null) errs.push('"ber" opened an airport although Bergen / Bergamo also start with it');
            if (probe('bri') !== null) errs.push('"bri" opened an airport although Brindisi also starts with it');
            if (probe('bergen') !== 'Bergen') errs.push('"bergen" did not open Bergen');
            if (probe('brindisi') !== 'Brindisi') errs.push('"brindisi" did not open Brindisi');
            if (probe('ぽると', { isComposing: true }) !== null) errs.push('"ぽると" opened an airport while the IME was composing');
            if (probe('ぽると') !== null) errs.push('"ぽると" opened an airport although ポルトガル also starts with it');
            for (const t of ['bud', 'budapest', 'ブダペスト']) if (probe(t) !== 'Budapest') errs.push(`"${t}" did not open Budapest directly`);
            if (probe('ＢＵＤ') !== 'Budapest' || probe('Ｂｕｄａｐｅｓｔ') !== 'Budapest' || probe('ﾌﾞﾀﾞﾍﾟｽﾄ') !== 'Budapest') errs.push('full-width / half-width Budapest did not open Budapest');
            home(); { const i = $('#searchInput'); input('ブダペスト', { isComposing: true }); const early = detailIsOpen(); closeDetailView(); i.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, data: 'ブダペスト' })); if (early) errs.push('composing "ブダペスト" opened the detail page'); if (!detailIsOpen() || currentDetailAirport !== 'Budapest') errs.push('the end of the composition did not open Budapest'); closeDetailView(); }
            home(); input('ｚｚｚ'); if (!/^検索結果 0$/.test(headerText())) errs.push(`"ｚｚｚ" header is "${headerText()}"`);
            home();
            if (errs.length) fails('search auto-open / full-width input (behaviour)', errs);
        }
    } finally {
        window.saveFavorites = realSave;
        visitedAirports.clear(); savedV.forEach((a) => visitedAirports.add(a));
        favorites.clear(); savedF.forEach((a) => favorites.add(a));
        $('#sortSelect').value = 'default'; currentSort = 'default';
        home();
    }
    return out;
})();
