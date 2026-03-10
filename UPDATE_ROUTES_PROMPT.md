# Wizz Air Multipass ルート更新プロンプト

以下の手順で `data.js` と `Airport.txt` を最新のMultipassルートに更新してください。

---

## タスク概要

Wizz Air Multipass（All You Can Fly）の現在利用可能なルートを予約UIから抽出し、アプリのデータを更新する。

---

## ステップ1：予約UIからルート抽出

Playwright Python でブラウザを自動操作し、全出発空港のルートを抽出する。

### ログイン情報
- URL: https://wizzair.com
- メール: habukin@icloud.com
- パスワード: EMIKA555kawa！

### 抽出スクリプト

```python
import subprocess
subprocess.run(['pip', 'install', 'playwright', '-q'])
subprocess.run(['playwright', 'install', 'chromium'], capture_output=True)

from playwright.sync_api import sync_playwright
import json, time, re

def extract_routes():
    all_routes = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        # ログイン
        page.goto('https://wizzair.com')
        time.sleep(3)
        # ログインボタンをクリック → メール・パスワード入力
        # （ページ構造に合わせて調整）

        # Multipass検索ページへ
        page.goto('https://wizzair.com/ja-jp/flights/multipass')
        time.sleep(3)

        # FROM フィールド（input[type='text'] の0番目）
        # TO フィールド（input[type='text'] の2番目）
        # FROM選択後にTabキーでTOフィールドへ移動するとドロップダウンが開く

        inputs = page.query_selector_all("input[type='text']")
        from_input = inputs[0]

        # 全出発空港を取得
        from_input.click()
        time.sleep(1)
        from_options = page.query_selector_all('[role="option"]')
        airports = []
        for opt in from_options:
            text = opt.inner_text().strip()
            m = re.search(r'\(([A-Z]{3})\)', text)
            if m:
                airports.append((m.group(1), text))

        print(f"出発空港数: {len(airports)}")

        for iata, label in airports:
            try:
                # FROM 選択
                from_input = page.query_selector_all("input[type='text']")[0]
                from_input.click(click_count=3)
                from_input.type(label.split('(')[0].strip())
                time.sleep(1)
                opts = page.query_selector_all('[role="option"]')
                for opt in opts:
                    if iata in opt.inner_text():
                        opt.click()
                        break

                # Tab でTO フィールドへ移動
                time.sleep(0.5)
                page.keyboard.press('Tab')
                time.sleep(1.5)

                # TO の選択肢を取得
                dest_opts = page.query_selector_all('[role="option"]')
                destinations = []
                for opt in dest_opts:
                    text = opt.inner_text().strip()
                    m = re.search(r'\(([A-Z]{3})\)', text)
                    if m:
                        destinations.append(m.group(1))

                all_routes[iata] = destinations
                print(f"  {iata}: {len(destinations)}ルート")

                # リセット（Escapeまたは別の場所をクリック）
                page.keyboard.press('Escape')
                time.sleep(0.5)

            except Exception as e:
                print(f"  {iata}: エラー - {e}")
                all_routes[iata] = []

        browser.close()

    return all_routes

routes = extract_routes()
with open('all_routes_from_booking.json', 'w') as f:
    json.dump(routes, f, indent=2)
print(f"保存完了: {sum(len(v) for v in routes.values())} ルート")
```

---

## ステップ2：new_rawFlightData.txt を生成

```python
import json

with open('all_routes_from_booking.json') as f:
    data = json.load(f)

# data.js の airportCodes から逆引きマップを作成
# （IATA → data.js での都市名）
# 注意: 'Burgas': 'BOJ' のように data.js の都市名キーを使う

IATA_TO_DATAJS = {
    # data.js の airportCodes を逆引き
    # 例: 'ABZ': 'Aberdeen', 'AUH': 'Abu Dhabi', ...
    # ← data.js から全エントリを転記する
}

pairs = set()
for dep_iata, dest_list in data.items():
    dep_name = IATA_TO_DATAJS.get(dep_iata)
    if not dep_name:
        print(f"WARNING: {dep_iata} が未マッピング")
        continue
    for dest_iata in dest_list:
        dest_name = IATA_TO_DATAJS.get(dest_iata)
        if not dest_name:
            print(f"WARNING: {dest_iata} が未マッピング")
            continue
        pairs.add(f"{dep_name} - {dest_name}")

lines = sorted(pairs)
with open('new_rawFlightData.txt', 'w') as f:
    f.write('\n'.join(lines))
print(f"生成ルート数: {len(lines)}")
```

---

## ステップ3：data.js を更新

### 3-1. rawFlightData を置換

```python
import re

with open('new_rawFlightData.txt') as f:
    new_routes = f.read().strip()

with open('data.js', 'r') as f:
    content = f.read()

pattern = r'(    const rawFlightData = `)([^`]*)(`;)'
new_content = re.sub(pattern,
    f'    const rawFlightData = `{new_routes}`',
    content, flags=re.DOTALL)

with open('data.js', 'w') as f:
    f.write(new_content)
print("rawFlightData 更新完了")
```

### 3-2. 新規空港の追加

抽出結果に **data.js に存在しない IATA コード**が含まれている場合、以下の5つのマップすべてに追加する：

- `airportCodes`: `'都市名': 'IATA'`
- `cityNames`: `'都市名': '日本語名'`
- `countryMap`: `'都市名': '国名（日本語）'`
- `regionMap`: `'都市名': '地域（西欧/東欧/南欧/北欧/中東）'`
- `schengenMap`: `'都市名': true/false`

さらに `airportGoogleMap` と `airportFullNames` にも追加する。

### 3-3. loungeData の更新

新規空港ごとに **Priority Pass** でラウンジが利用できるか確認し、ある場合は `loungeData` に追加する。

- 確認URL: https://www.prioritypass.com/ja/lounges
- 空港名またはIATAコードで検索する
- ラウンジがある場合、日本語ページのURLを `loungeData` に追加：

```javascript
'都市名': 'https://www.prioritypass.com/ja/lounges/国名/空港スラッグ', // 空港名（英語）
```

- URLの形式は既存エントリに合わせて `/ja/lounges/...` とする（`/ja-JP/` ではない）
- ラウンジが**ない**場合は追加しない
- 同一物理空港で複数の都市名エントリがある場合（例: `Basel` と `Basel-Mulhouse`）は**同じURL**を両方に設定する

#### 2026-03時点のラウンジ有無（参考）

| 空港 | IATA | ラウンジ |
|------|------|---------|
| Alexandria | HBE | ✅ あり |
| Basel-Mulhouse | MLH | ✅ あり（`Basel` と同一URL） |
| Bucharest Baneasa | BBU | ❌ なし |
| Paris Orly | ORY | ✅ あり |
| Stockholm Arlanda | ARN | ✅ あり（`Stockholm` と同一URL） |
| Venice Treviso | TSF | ❌ なし |
| Warsaw Modlin | WMI | ✅ あり |

---

## ステップ4：Airport.txt を更新

新規空港を以下の形式でアルファベット順（IATAコード順）に追加：

```javascript
{ code: 'XXX', city: '都市名（日本語）', airport: '空港名（日本語）', country: '国名', schengen: true/false },
```

---

## 重要な注意事項

- **FROM選択後は必ずTabキーでTOフィールドへ移動**してからドロップダウンを取得する（Escapeやclickだと開かない）
- 複数空港が同一都市にある場合（例: London LGW / London LTN, Stockholm NYO / Stockholm Arlanda ARN）は**別エントリとして**data.jsに登録する
- `rawFlightData` の都市名は **data.js の airportCodes のキー**と完全一致させる
- 抽出後は `node --check data.js` で構文確認する

---

## 現在の空港名マッピング（data.js 準拠、2026-03更新）

| IATA | data.js での都市名 |
|------|----------------|
| ABZ | Aberdeen |
| AUH | Abu Dhabi |
| AGA | Agadir |
| AES | Alesund |
| AHO | Alghero |
| ALC | Alicante |
| AMM | Amman |
| AOI | Ancona |
| ESB | Ankara |
| AYT | Antalya |
| ATH | Athens |
| BCM | Bacau |
| GYD | Baku |
| BNX | Banja Luka |
| BCN | Barcelona |
| BRI | Bari |
| BSL | Basel |
| MLH | Basel-Mulhouse |
| BEG | Belgrade |
| BGY | Bergamo |
| BGO | Bergen |
| BER | Berlin |
| BIO | Bilbao |
| BLL | Billund |
| BHX | Birmingham |
| BLQ | Bologna |
| BOD | Bordeaux |
| GHV | Brasov |
| BTS | Bratislava |
| BDS | Brindisi |
| CRL | Brussels Charleroi |
| OTP | Bucharest |
| BBU | Bucharest Baneasa |
| BUD | Budapest |
| BOJ | Burgas |
| SPX | Cairo (Sphinx) |
| CDT | Castellon |
| CTA | Catania |
| CHQ | Chania (Crete) |
| RMO | Chisinau |
| CLJ | Cluj-Napoca |
| CGN | Cologne |
| CIY | Comiso |
| CND | Constanta |
| CPH | Copenhagen |
| CFU | Corfu |
| CRA | Craiova |
| DLM | Dalaman |
| DEB | Debrecen |
| DTM | Dortmund |
| DXB | Dubai |
| DBV | Dubrovnik |
| EIN | Eindhoven |
| FAO | Faro (Algarve) |
| HHN | Frankfurt |
| FDH | Friedrichshafen |
| FUE | Fuerteventura |
| FNC | Funchal (Madeira) |
| GDN | Gdansk |
| GOA | Genoa |
| GLA | Glasgow |
| GOT | Gothenburg |
| LPA | Gran Canaria |
| GNB | Grenoble |
| LWN | Gyumri |
| HAM | Hamburg |
| HAU | Haugesund |
| HER | Heraklion (Crete) |
| HBE | Alexandria |
| HRG | Hurghada |
| IAS | Iasi |
| IBZ | Ibiza |
| IST | Istanbul |
| JED | Jeddah |
| KLX | Kalamata |
| FKB | Karlsruhe/Baden-Baden |
| KTW | Katowice |
| KUN | Kaunas |
| EFL | Kefalonia |
| KSC | Košice |
| KRK | Krakow |
| KUT | Kutaisi |
| SUF | Lamezia Terme |
| LMP | Lampedusa |
| LCA | Larnaca |
| LBA | Leeds |
| LIS | Lisbon |
| LPL | Liverpool |
| LJU | Ljubljana |
| LGW | London (LGW) |
| LTN | London (LTN) |
| LUZ | Lublin |
| LYS | Lyon |
| MST | Maastricht |
| MAD | Madrid |
| AGP | Malaga |
| PMI | Mallorca |
| MMX | Malmö |
| MLA | Malta |
| RAK | Marrakech |
| RMF | Marsa Alam |
| MED | Medina |
| FMM | Memmingen |
| MAH | Menorca |
| MXP | Milan |
| JMK | Mykonos |
| NAP | Naples |
| NCE | Nice |
| INI | Niš |
| NUE | Nuremberg |
| OHD | Ohrid |
| OLB | Olbia |
| SZY | Olsztyn-Mazury |
| OMR | Oradea |
| OSL | Oslo |
| PLQ | Palanga |
| PMO | Palermo |
| PFO | Paphos |
| BVA | Paris |
| ORY | Paris Orly |
| PEG | Perugia |
| PSR | Pescara |
| PSA | Pisa |
| PDV | Plovdiv |
| TGD | Podgorica |
| TAT | Poprad-Tatry |
| OPO | Porto |
| POZ | Poznan |
| PRG | Prague |
| PRN | Pristina |
| RDO | Radom |
| KEF | Reykjavik |
| RHO | Rhodes |
| RJK | Rijeka |
| RMI | Rimini |
| FCO | Rome |
| RZE | Rzeszów |
| TRF | Sandefjord |
| SDR | Santander |
| JTR | Santorini |
| SJJ | Sarajevo |
| SUJ | Satu Mare |
| SVQ | Sevilla |
| SSH | Sharm El Sheikh |
| SBZ | Sibiu |
| JSI | Skiathos |
| SKP | Skopje |
| SOF | Sofia |
| SPU | Split |
| SVG | Stavanger |
| NYO | Stockholm |
| ARN | Stockholm Arlanda |
| STR | Stuttgart |
| SCV | Suceava |
| SZZ | Szczecin |
| TLL | Tallinn |
| TLV | Tel Aviv |
| TFS | Tenerife |
| SKG | Thessaloniki |
| TSR | Timisoara |
| TIA | Tirana |
| TRS | Trieste |
| TOS | Tromsø |
| TRD | Trondheim |
| TRN | Turin |
| TKU | Turku |
| TZL | Tuzla |
| TGM | Târgu-Mures |
| VLC | Valencia |
| VAR | Varna |
| VCE | Venice |
| TSF | Venice Treviso |
| VRN | Verona |
| VIE | Vienna |
| VNO | Vilnius |
| WAW | Warsaw |
| WMI | Warsaw Modlin |
| WRO | Wroclaw |
| EVN | Yerevan |
| ZTH | Zakynthos |
| ZAZ | Zaragoza |
