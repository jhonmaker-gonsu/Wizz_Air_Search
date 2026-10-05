// localStorage-corruption probe (audit row B4).  Paste into the page / Browser javascript_tool on the served index.html
// (or: await (0, eval)(await (await fetch('/scripts/browser-storage-probe.js')).text())).
// For every corrupted value of `favorites` / `visitedAirports` it loads the SAME page in a hidden same-origin iframe (so the
// page's own start-up code runs against that storage) and checks that the page came up: the ranking list has one chip per
// airport, `favorites` / `visitedAirports` are Sets of strings (the page script ran to the end), and a search works.  It also makes localStorage.setItem
// throw (quota / blocked storage) and clicks a star: the click must still work.  The original localStorage values are restored
// in `finally`; the iframes are removed.  Returns { pass, cases:[...] }.
(async () => {
    const KEYS = ['favorites', 'visitedAirports'];
    const saved = {};
    try { for (const k of KEYS) saved[k] = localStorage.getItem(k); } catch (e) { return { pass: false, error: 'localStorage unavailable in the probe page: ' + e }; }
    const expectedAirports = (typeof uniqueCities !== 'undefined') ? uniqueCities.length : null;
    const CASES = [
        ['invalid JSON "{"', '{', []],
        ['object {"a":1}', '{"a":1}', []],
        ['string "x"', '"x"', []],
        ['number 5', '5', []],
        ['JSON null', 'null', []],
        ['empty string', '', []],
        ['array with non-strings', '[1,null,{"a":1},"Larnaca"]', ['Larnaca']],
        ['valid array (control)', '["Larnaca","Budapest"]', ['Larnaca', 'Budapest']]
    ];
    const cases = [];
    const loadFrame = (n) => new Promise((resolve) => {
        const f = document.createElement('iframe');
        f.style.cssText = 'position:fixed;left:-9999px;top:0;width:800px;height:600px;border:0';
        const timer = setTimeout(() => resolve({ f, timeout: true }), 8000);
        f.onload = () => { clearTimeout(timer); resolve({ f }); };
        f.src = location.pathname + '?storage-probe=' + n;
        document.body.appendChild(f);
    });
    try {
        let n = 0;
        for (const [label, raw, keep] of CASES) {
            for (const k of KEYS) localStorage.setItem(k, raw);
            const { f, timeout } = await loadFrame(++n);
            const r = { label, raw, ok: false };
            try {
                if (timeout) throw new Error('iframe did not load');
                const w = f.contentWindow, d = f.contentDocument;
                const chips = d.querySelectorAll('#rankingGrid .airport-chip').length;
                const fav = JSON.parse(w.eval('JSON.stringify([...favorites])'));
                const vis = JSON.parse(w.eval('JSON.stringify([...visitedAirports])'));
                const favSection = d.querySelectorAll('#favoritesGrid .airport-chip').length;
                // the page must respond: a search works
                const i = d.getElementById('searchInput'); i.value = 'ポーランド'; i.dispatchEvent(new w.InputEvent('input', { bubbles: true }));
                const found = d.querySelectorAll('#flightsGrid .flight-group').length;
                const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
                r.chips = chips; r.expectedChips = expectedAirports; r.favorites = fav; r.visited = vis; r.favoriteChips = favSection; r.searchCards = found;
                r.ok = chips === expectedAirports && same(fav, keep) && same(vis, keep) && favSection === keep.length && found > 0;
            } catch (e) {
                r.error = String(e && e.message || e).slice(0, 160); r.crashed = true;
            }
            cases.push(r);
            if (f.parentNode) f.parentNode.removeChild(f);
        }
        // storage that refuses writes (quota exceeded / blocked): the star click must still work and nothing may throw
        for (const k of KEYS) { saved[k] === null ? localStorage.removeItem(k) : localStorage.setItem(k, saved[k]); }
        const errs = [];
        const onErr = (e) => { errs.push(String(e.message || e)); e.preventDefault(); };
        window.addEventListener('error', onErr);
        const origSet = Storage.prototype.setItem;
        let favBefore = [...favorites];
        const r = { label: 'setItem throws (quota / blocked storage)', ok: false };
        try {
            Storage.prototype.setItem = function () { throw new DOMException('quota', 'QuotaExceededError'); };
            document.getElementById('homeButton').click();
            const si = document.getElementById('searchInput'); si.value = 'ポーランド'; si.dispatchEvent(new InputEvent('input', { bubbles: true }));
            const btn = document.querySelector('#flightsGrid .star-btn');
            const en = btn.dataset.favAirport; const was = favorites.has(en);
            btn.click(); btn.click();
            r.uncaughtErrors = errs.slice(0, 3);
            r.ok = errs.length === 0 && favorites.has(en) === was;
        } catch (e) { r.error = String(e).slice(0, 160); } finally {
            Storage.prototype.setItem = origSet; window.removeEventListener('error', onErr);
            favorites.clear(); favBefore.forEach((a) => favorites.add(a));
            si_reset();
        }
        cases.push(r);
        function si_reset() { try { const si = document.getElementById('searchInput'); si.value = ''; si.dispatchEvent(new InputEvent('input', { bubbles: true })); document.getElementById('homeButton').click(); } catch { /* ignore */ } }
    } finally {
        try { for (const k of KEYS) { saved[k] === null ? localStorage.removeItem(k) : localStorage.setItem(k, saved[k]); } } catch { /* ignore */ }
        document.querySelectorAll('iframe[src*="storage-probe"]').forEach((x) => x.remove());
    }
    return { pass: cases.length > 0 && cases.every((c) => c.ok), expectedAirports, cases };
})();
