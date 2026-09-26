'use strict';
/**
 * Country table keyed by ISO 3166-1 alpha-2 code.
 * Country (JA), region and Schengen status depend only on the country, so the
 * table is derived from the airports that are already in data.js (joined
 * code -> ISO via the Wizz station list / OurAirports) and topped up with a
 * few countries that are not in data.js yet.
 */

// Countries not yet present in data.js. Existing countries (e.g. Malta) are derived
// from data.js, never overridden here.
const EXTRA_COUNTRIES = {
    LV: { ja: 'ラトビア', region: '北欧', schengen: true },
    LU: { ja: 'ルクセンブルク', region: '西欧', schengen: true },
    IE: { ja: 'アイルランド', region: '西欧', schengen: false },
    KW: { ja: 'クウェート', region: '中東', schengen: false },
    OM: { ja: 'オマーン', region: '中東', schengen: false },
    QA: { ja: 'カタール', region: '中東', schengen: false },
    BH: { ja: 'バーレーン', region: '中東', schengen: false },
    LB: { ja: 'レバノン', region: '中東', schengen: false },
    TN: { ja: 'チュニジア', region: '中東', schengen: false },
    UZ: { ja: 'ウズベキスタン', region: '中東', schengen: false },
    KZ: { ja: 'カザフスタン', region: '中東', schengen: false },
    MV: { ja: 'モルディブ', region: '中東', schengen: false },
    UA: { ja: 'ウクライナ', region: '東欧', schengen: false }
};

// English country names used to disambiguate Wikipedia titles ("Sibiu, Romania").
const COUNTRY_EN = {
    AE: 'United Arab Emirates', AL: 'Albania', AM: 'Armenia', AT: 'Austria', AZ: 'Azerbaijan',
    BA: 'Bosnia and Herzegovina', BE: 'Belgium', BG: 'Bulgaria', CH: 'Switzerland', CY: 'Cyprus',
    CZ: 'Czech Republic', DE: 'Germany', DK: 'Denmark', EE: 'Estonia', EG: 'Egypt', ES: 'Spain',
    FI: 'Finland', FR: 'France', GB: 'United Kingdom', GE: 'Georgia', GR: 'Greece', HR: 'Croatia',
    HU: 'Hungary', IL: 'Israel', IS: 'Iceland', IT: 'Italy', JO: 'Jordan', LT: 'Lithuania',
    MA: 'Morocco', MD: 'Moldova', ME: 'Montenegro', MK: 'North Macedonia', MT: 'Malta',
    NL: 'Netherlands', NO: 'Norway', PL: 'Poland', PT: 'Portugal', RO: 'Romania', RS: 'Serbia',
    SA: 'Saudi Arabia', SE: 'Sweden', SI: 'Slovenia', SK: 'Slovakia', TR: 'Turkey', XK: 'Kosovo',
    LV: 'Latvia', LU: 'Luxembourg', IE: 'Ireland', KW: 'Kuwait', OM: 'Oman', QA: 'Qatar',
    BH: 'Bahrain', LB: 'Lebanon', TN: 'Tunisia', UZ: 'Uzbekistan', KZ: 'Kazakhstan',
    MV: 'Maldives', UA: 'Ukraine'
};

/**
 * @param {object} data     evaluated window.AIRPORT_DATA
 * @param {(code:string)=>string|null} codeToIso
 * @returns {{table: object, conflicts: string[]}}
 */
function buildCountryTable(data, codeToIso) {
    const votes = {};
    for (const [name, code] of Object.entries(data.airportCodes)) {
        const iso = codeToIso(code);
        if (!iso || !data.countryMap[name] || !data.regionMap[name] || typeof data.schengenMap[name] !== 'boolean') continue;
        const key = JSON.stringify([data.countryMap[name], data.regionMap[name], data.schengenMap[name]]);
        (votes[iso] = votes[iso] || {})[key] = ((votes[iso] || {})[key] || 0) + 1;
    }
    const table = {};
    const conflicts = [];
    for (const [iso, counts] of Object.entries(votes)) {
        const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const [ja, region, schengen] = JSON.parse(ranked[0][0]);
        table[iso] = { ja, region, schengen };
        if (ranked.length > 1) conflicts.push(`${iso}: ${ranked.map(([k, n]) => `${k}x${n}`).join(' vs ')}`);
    }
    for (const [iso, row] of Object.entries(EXTRA_COUNTRIES)) {
        if (!table[iso]) table[iso] = { ...row };
    }
    return { table, conflicts };
}

module.exports = { EXTRA_COUNTRIES, COUNTRY_EN, buildCountryTable };
