'use strict';
/** Strict validation for anything that ends up in data.js. All values that came
 *  from the network or from an AI model are treated purely as untrusted data. */

const RE_IATA = /^[A-Z]{3}$/;
// Japanese text allowed in registry strings. "＝／" are required: 17 existing names use them.
const RE_JA = /^[぀-ヿ一-鿿・ー（）()＝／ A-Za-z0-9\-\/]+$/;
const RE_KEY = /^[\p{L}\p{M}0-9 .()'\/-]+$/u;
const RE_GMAP = /^https:\/\/www\.google\.com\/maps\/search\/[A-Za-z0-9+]+$/;
const REGIONS = new Set(['西欧', '中東', '北欧', '南欧', '東欧']);

const MAX_NEW_AIRPORTS = 5;

function validRegistryKey(name) {
    return typeof name === 'string' && name.length > 0 && name.length <= 40 &&
        RE_KEY.test(name) && !name.includes(' - ') && !name.includes('`');
}
function validIata(code) { return typeof code === 'string' && RE_IATA.test(code); }
function validCityJa(s) { return typeof s === 'string' && s.length > 0 && s.length <= 20 && RE_JA.test(s); }
function validAirportJa(s) {
    return typeof s === 'string' && s.length > 0 && s.length <= 40 && RE_JA.test(s) && /(空港|飛行場)$/.test(s);
}

/**
 * Validates a complete registry entry. Returns a list of problems (empty = ok).
 * ctx: { usedCodes:Set, usedKeys:Set }
 */
function validateEntry(e, ctx) {
    const p = [];
    if (!validRegistryKey(e.name)) p.push('registry key invalid');
    if (ctx.usedKeys.has(e.name)) p.push('registry key already exists');
    if (!validIata(e.code)) p.push('IATA invalid');
    else if (ctx.usedCodes.has(e.code)) p.push(`IATA ${e.code} already used`);
    if (!validCityJa(e.cityJa)) p.push(`cityJa invalid (${JSON.stringify(e.cityJa)})`);
    if (!validAirportJa(e.fullJa)) p.push(`airport name invalid (${JSON.stringify(e.fullJa)})`);
    if (typeof e.countryJa !== 'string' || !RE_JA.test(e.countryJa)) p.push('countryJa invalid');
    if (!REGIONS.has(e.region)) p.push('region invalid');
    if (typeof e.schengen !== 'boolean') p.push('schengen invalid');
    if (typeof e.gmap !== 'string' || !RE_GMAP.test(e.gmap)) p.push('googleMap URL invalid');
    return p;
}

/**
 * Validates raw AI output. Every check must pass or the result is discarded.
 * ctx: { expectedCode?:string, isKnownCode(code):bool, oaCountry(code):string|null,
 *        countryTable:object, needCode:bool, needCity:bool, needAirport:bool }
 */
function validateAiOutput(out, ctx) {
    const p = [];
    if (!out || typeof out !== 'object') return ['AI output is not an object'];
    if (out.found !== true) return ['AI reported not found'];
    if (!validIata(out.iata)) p.push('AI iata not ^[A-Z]{3}$');
    else {
        if (ctx.expectedCode && out.iata !== ctx.expectedCode) p.push(`AI iata ${out.iata} != resolved ${ctx.expectedCode}`);
        if (!ctx.isKnownCode(out.iata)) p.push(`AI iata ${out.iata} is neither a Wizz station nor a scheduled OurAirports airport`);
        const oaIso = ctx.oaCountry(out.iata);
        if (!oaIso) p.push('no OurAirports country for AI iata');
        else if (out.countryIso2 !== oaIso) p.push(`AI country ${out.countryIso2} != OurAirports ${oaIso}`);
        else if (!ctx.countryTable[oaIso]) p.push(`country ${oaIso} not in country table`);
    }
    if (ctx.needCity && !validCityJa(out.cityJa)) p.push('AI cityJa invalid');
    if (ctx.needAirport && !validAirportJa(out.airportJa)) p.push('AI airportJa invalid');
    return p;
}

module.exports = { RE_IATA, RE_JA, RE_KEY, MAX_NEW_AIRPORTS, REGIONS, validRegistryKey, validIata, validCityJa, validAirportJa, validateEntry, validateAiOutput };
