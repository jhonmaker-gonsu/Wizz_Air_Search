#!/usr/bin/env node

/**
 * Rebuilds data.js from Wizz Air's All You Can Fly availability PDF.
 * Usage: node scripts/update-routes-from-pdf.js /path/to/aycf-availability.pdf
 */
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const pdfPath = process.argv[2];
if (!pdfPath) {
    throw new Error('Usage: node scripts/update-routes-from-pdf.js <availability.pdf>');
}

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'data.js');
const indexPath = path.join(root, 'index.html');
const readmePath = path.join(root, 'README.md');
const pdfText = execFileSync('pdftotext', ['-layout', pdfPath, '-'], { encoding: 'utf8' });

const aliases = {
    'Aalesund': 'Alesund',
    'Basel/Mulhouse': 'Basel-Mulhouse',
    'Brussels': 'Brussels Charleroi',
    'Chania': 'Chania (Crete)',
    'Cluj': 'Cluj-Napoca',
    'Cologne/Bonn': 'Cologne',
    'Faro': 'Faro (Algarve)',
    'Giza': 'Cairo (Sphinx)',
    'Heraklion': 'Heraklion (Crete)',
    'Kefallinia': 'Kefalonia',
    'Kerkyra': 'Corfu',
    'Klaipeda/Palanga': 'Palanga',
    'Kosice': 'Košice',
    'Leeds/Bradford': 'Leeds',
    'Madeira': 'Funchal (Madeira)',
    'Malmo': 'Malmö',
    'Nis': 'Niš',
    'Palma De Mallorca': 'Mallorca',
    'Poprad/Tatry': 'Poprad-Tatry',
    'Rzeszow': 'Rzeszów',
    'Sharm el-Sheikh': 'Sharm El Sheikh',
    'Szczytno': 'Olsztyn-Mazury',
    'Targu-Mures': 'Târgu-Mures',
    'Tromso': 'Tromsø',
    'Zakinthos Island': 'Zakynthos'
};

function parsePdfRoutes(text) {
    const pairs = [];
    for (const line of text.replace(/\f/g, '\n').split(/\r?\n/)) {
        if (/Departure period:|Last run:|Please note:|Terms & Conditions|Departure City|Page \d/.test(line)) continue;
        const columns = line.trim().split(/\s{2,}/);
        if (columns.length !== 2 && columns.length !== 4) continue;

        for (let index = 0; index < columns.length; index += 2) {
            if (!/^\d{4}-\d{2}-\d{2}/.test(columns[index])) {
                pairs.push([aliases[columns[index]] || columns[index], aliases[columns[index + 1]] || columns[index + 1]]);
            }
        }
    }
    return pairs;
}

let dataSource = fs.readFileSync(dataPath, 'utf8');
const dataBlock = dataSource.match(/    const rawFlightData = `[^`]*`/s);
if (!dataBlock) throw new Error('Could not find rawFlightData in data.js.');

const airportCodesBlock = dataSource.match(/const airportCodes = (\{[\s\S]*?\n    \});/);
if (!airportCodesBlock) throw new Error('Could not find airportCodes in data.js.');
const airportNames = new Set([...airportCodesBlock[1].matchAll(/^        '([^']+)':/gm)].map((match) => match[1]));
const previousRoutes = dataBlock[0].match(/`([\s\S]*)`/)[1].trim().split('\n');
const normalizedPreviousRoute = (route) => route.replace(/London \([^)]*\)/g, 'London');
const routes = [];

for (const pair of parsePdfRoutes(pdfText)) {
    if (pair.includes('London')) {
        const matchingRoutes = previousRoutes.filter((route) => normalizedPreviousRoute(route) === pair.join(' - '));
        routes.push(...(matchingRoutes.length ? matchingRoutes : [pair.map((city) => city === 'London' ? 'London (LTN)' : city).join(' - ')]));
    } else {
        routes.push(pair.join(' - '));
    }
}

const uniqueRoutes = [...new Set(routes)].sort((a, b) => a.localeCompare(b));
const unknownAirports = [...new Set(uniqueRoutes.flatMap((route) => route.split(' - ')).filter((city) => !airportNames.has(city)))];
if (unknownAirports.length) {
    throw new Error(`New airport metadata is required before updating: ${unknownAirports.join(', ')}`);
}

dataSource = dataSource.replace(dataBlock[0], `    const rawFlightData = \`${uniqueRoutes.join('\n')}\``);
fs.writeFileSync(dataPath, dataSource);

const lastRun = pdfText.match(/Last run:\s*\n\s*(\d{4})-(\d{2})-(\d{2})/);
if (lastRun) {
    const [, year, month, day] = lastRun;
    const japaneseDate = `${year}年${Number(month)}月${Number(day)}日`;
    const snapshotDate = `${year}-${month}-${day}`;
    fs.writeFileSync(indexPath, fs.readFileSync(indexPath, 'utf8').replace(
        /All You Can Fly 最新空席データ（\d{4}年\d{1,2}月\d{1,2}日更新）/,
        `All You Can Fly 最新空席データ（${japaneseDate}更新）`
    ));
    fs.writeFileSync(readmePath, fs.readFileSync(readmePath, 'utf8').replace(
        /## V2（\d{4}-\d{2}-\d{2}）/,
        `## V2（${snapshotDate}）`
    ));
}

console.log(`Updated ${uniqueRoutes.length} routes from ${pdfPath}.`);
