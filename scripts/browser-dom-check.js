// Paste into the page console (or javascript_tool) on the deployed site / local copy.
// Renders the detail view for EVERY airport in BOTH sort modes and the unfiltered route list,
// and checks the DOM against the direction maps. Returns a summary object.
(() => {
    const parse = (t) => { const m = t.match(/出発先 (\d+) \/ 到着元 (\d+) \/ 計 (\d+)/); return m ? m.slice(1).map(Number) : null; };
    const errors = [];
    const sel = document.getElementById('detailSort');
    for (const city of uniqueCities) {
        for (const mode of ['count', 'country']) {
            sel.value = mode; detailSortMode = mode;
            renderDetailView(city.en);
            const h = parse(document.getElementById('detailCount').textContent);
            const chips = document.querySelectorAll('#detailGrid .airport-chip');
            const outOnly = [...chips].filter((c) => /→のみ/.test(c.textContent)).length;
            const inOnly = [...chips].filter((c) => /←のみ/.test(c.textContent)).length;
            const both = chips.length - outOnly - inOnly;
            if (!h) { errors.push(`${city.en}/${mode}: header unparsable`); continue; }
            const [o, i, t] = h;
            if (chips.length !== t) errors.push(`${city.en}/${mode}: chips ${chips.length} != 計 ${t}`);
            if (outOnly + both !== o) errors.push(`${city.en}/${mode}: →のみ+both ${outOnly + both} != 出発先 ${o}`);
            if (inOnly + both !== i) errors.push(`${city.en}/${mode}: ←のみ+both ${inOnly + both} != 到着元 ${i}`);
            if (t !== connectionsMap.get(city.en).size) errors.push(`${city.en}: 計 != connectionsMap`);
        }
    }
    sel.value = 'count'; detailSortMode = 'count';
    closeDetailView();
    displayFlights(flightsData);
    const groups = document.querySelectorAll('#flightsGrid .flight-group');
    for (const g of groups) {
        const h = parse(g.querySelector('.airport-meta').textContent);
        const n = g.querySelectorAll('.airport-chip').length;
        if (!h || n !== h[0]) errors.push(`group ${g.dataset.airport}: chips ${n} != 出発先 ${h && h[0]}`);
        if (/表示/.test(g.querySelector('.airport-meta').textContent)) errors.push(`group ${g.dataset.airport}: unexpected （表示 n） when unfiltered`);
    }
    renderDetailView('Larnaca');
    return { airports: uniqueCities.length, groups: groups.length, errors: errors.slice(0, 20), errorCount: errors.length,
             larnacaHeader: document.getElementById('detailCount').textContent };
})();
