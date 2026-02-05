(function () {
const airportCodes = {
    'Aberdeen': 'ABZ',
    'Abu Dhabi': 'AUH',
    'Agadir': 'AGA',
    'Alesund': 'AES',
    'Alghero': 'AHO',
    'Alicante': 'ALC',
    'Amman': 'AMM',
    'Ancona': 'AOI',
    'Ankara': 'ESB',
    'Antalya': 'AYT',
    'Athens': 'ATH',
    'Bacau': 'BCM',
    'Baku': 'GYD',
    'Banja Luka': 'BNX',
    'Barcelona': 'BCN',
    'Bari': 'BRI',
    'Basel': 'BSL',
    'Belgrade': 'BEG',
    'Bergamo': 'BGY',
    'Bergen': 'BGO',
    'Berlin': 'BER',
    'Bilbao': 'BIO',
    'Billund': 'BLL',
    'Birmingham': 'BHX',
    'Bologna': 'BLQ',
    'Bordeaux': 'BOD',
    'Brasov': 'GHV',
    'Bratislava': 'BTS',
    'Brindisi': 'BDS',
    'Brussels Charleroi': 'CRL',
    'Bucharest': 'OTP',
    'Budapest': 'BUD',
    'Burgas': 'BOJ',
    'Cairo (Sphinx)': 'SPX',
    'Castellon': 'CDT',
    'Catania': 'CTA',
    'Chania (Crete)': 'CHQ',
    'Chisinau': 'RMO',
    'Cluj-Napoca': 'CLJ',
    'Cologne': 'CGN',
    'Comiso': 'CIY',
    'Constanta': 'CND',
    'Copenhagen': 'CPH',
    'Corfu': 'CFU',
    'Craiova': 'CRA',
    'Dalaman': 'DLM',
    'Debrecen': 'DEB',
    'Dortmund': 'DTM',
    'Dubai': 'DXB',
    'Dubrovnik': 'DBV',
    'Eindhoven': 'EIN',
    'Faro (Algarve)': 'FAO',
    'Frankfurt': 'FRA',
    'Friedrichshafen': 'FDH',
    'Fuerteventura': 'FUE',
    'Funchal (Madeira)': 'FNC',
    'Gdansk': 'GDN',
    'Genoa': 'GOA',
    'Glasgow': 'GLA',
    'Gothenburg': 'GOT',
    'Gran Canaria': 'LPA',
    'Grenoble': 'GNB',
    'Gyumri': 'LWN',
    'Hamburg': 'HAM',
    'Haugesund': 'HAU',
    'Heraklion (Crete)': 'HER',
    'Hurghada': 'HRG',
    'Iasi': 'IAS',
    'Ibiza': 'IBZ',
    'Istanbul': 'IST',
    'Jeddah': 'JED',
    'Kalamata': 'KLX',
    'Karlsruhe/Baden-Baden': 'FKB',
    'Katowice': 'KTW',
    'Kaunas': 'KUN',
    'Kefalonia': 'EFL',
    'Košice': 'KSC',
    'Krakow': 'KRK',
    'Kutaisi': 'KUT',
    'Lamezia Terme': 'SUF',
    'Lampedusa': 'LMP',
    'Larnaca': 'LCA',
    'Leeds': 'LBA',
    'Lisbon': 'LIS',
    'Liverpool': 'LPL',
    'Ljubljana': 'LJU',
    'London (LGW)': 'LGW',
    'London (LTN)': 'LTN',
    'Lublin': 'LUZ',
    'Lyon': 'LYS',
    'Maastricht': 'MST',
    'Madrid': 'MAD',
    'Malaga': 'AGP',
    'Mallorca': 'PMI',
    'Malmö': 'MMX',
    'Malta': 'MLA',
    'Marrakech': 'RAK',
    'Marsa Alam': 'RMF',
    'Medina': 'MED',
    'Memmingen': 'FMM',
    'Menorca': 'MAH',
    'Milan': 'MXP',
    'Mykonos': 'JMK',
    'Naples': 'NAP',
    'Nice': 'NCE',
    'Niš': 'INI',
    'Nuremberg': 'NUE',
    'Ohrid': 'OHD',
    'Olbia': 'OLB',
    'Olsztyn-Mazury': 'SZY',
    'Oradea': 'OMR',
    'Oslo': 'OSL',
    'Palanga': 'PLQ',
    'Palermo': 'PMO',
    'Paphos': 'PFO',
    'Paris': 'BVA',
    'Perugia': 'PEG',
    'Pescara': 'PSR',
    'Pisa': 'PSA',
    'Plovdiv': 'PDV',
    'Podgorica': 'TGD',
    'Poprad-Tatry': 'TAT',
    'Porto': 'OPO',
    'Poznan': 'POZ',
    'Prague': 'PRG',
    'Pristina': 'PRN',
    'Radom': 'RDO',
    'Reykjavik': 'KEF',
    'Rhodes': 'RHO',
    'Rijeka': 'RJK',
    'Rimini': 'RMI',
    'Rome': 'FCO',
    'Rzeszów': 'RZE',
    'Sandefjord': 'TRF',
    'Santander': 'SDR',
    'Santorini': 'JTR',
    'Sarajevo': 'SJJ',
    'Satu Mare': 'SUJ',
    'Sevilla': 'SVQ',
    'Sharm El Sheikh': 'SSH',
    'Sibiu': 'SBZ',
    'Skiathos': 'JSI',
    'Skopje': 'SKP',
    'Sofia': 'SOF',
    'Split': 'SPU',
    'Stavanger': 'SVG',
    'Stockholm': 'NYO',
    'Stuttgart': 'STR',
    'Suceava': 'SCV',
    'Szczecin': 'SZZ',
    'Tallinn': 'TLL',
    'Tel Aviv': 'TLV',
    'Tenerife': 'TFS',
    'Thessaloniki': 'SKG',
    'Timisoara': 'TSR',
    'Tirana': 'TIA',
    'Trieste': 'TRS',
    'Tromsø': 'TOS',
    'Trondheim': 'TRD',
    'Turin': 'TRN',
    'Turku': 'TKU',
    'Tuzla': 'TZL',
    'Târgu-Mures': 'TGM',
    'Valencia': 'VLC',
    'Varna': 'VAR',
    'Venice': 'VCE',
    'Verona': 'VRN',
    'Vienna': 'VIE',
    'Vilnius': 'VNO',
    'Warsaw': 'WAW',
    'Wroclaw': 'WRO',
    'Yerevan': 'EVN',
    'Zakynthos': 'ZTH',
    'Zaragoza': 'ZAZ'
};

const cityNames = {
    'Aberdeen': 'アバディーン',
    'Abu Dhabi': 'アブダビ',
    'Agadir': 'アガディール',
    'Alesund': 'オーレスン',
    'Alghero': 'アルゲーロ',
    'Alicante': 'アリカンテ',
    'Amman': 'アンマン',
    'Ancona': 'アンコーナ',
    'Ankara': 'アンカラ',
    'Antalya': 'アンタルヤ',
    'Athens': 'アテネ',
    'Bacau': 'バカウ',
    'Baku': 'バクー',
    'Banja Luka': 'バニャ・ルカ',
    'Barcelona': 'バルセロナ',
    'Bari': 'バーリ',
    'Basel': 'バーゼル',
    'Belgrade': 'ベオグラード',
    'Bergamo': 'ベルガモ',
    'Bergen': 'ベルゲン',
    'Berlin': 'ベルリン',
    'Bilbao': 'ビルバオ',
    'Billund': 'ビルン',
    'Birmingham': 'バーミンガム',
    'Bologna': 'ボローニャ',
    'Bordeaux': 'ボルドー',
    'Brasov': 'ブラショフ',
    'Bratislava': 'ブラチスラバ',
    'Brindisi': 'ブリンディジ',
    'Brussels Charleroi': 'ブリュッセル',
    'Bucharest': 'ブカレスト',
    'Budapest': 'ブダペスト',
    'Burgas': 'ブルガス',
    'Cairo (Sphinx)': 'カイロ（スフィンクス）',
    'Castellon': 'カステリョン',
    'Catania': 'カターニア',
    'Chania (Crete)': 'ハニア',
    'Chisinau': 'キシナウ',
    'Cluj-Napoca': 'クルージュ',
    'Cologne': 'ケルン',
    'Comiso': 'コミーゾ',
    'Constanta': 'コンスタンツァ',
    'Copenhagen': 'コペンハーゲン',
    'Corfu': 'コルフ',
    'Craiova': 'クラヨーヴァ',
    'Dalaman': 'ダラマン',
    'Debrecen': 'デブレツェン',
    'Dortmund': 'ドルトムント',
    'Dubai': 'ドバイ',
    'Dubrovnik': 'ドゥブロヴニク',
    'Eindhoven': 'アイントホーフェン',
    'Faro (Algarve)': 'ファロ',
    'Frankfurt': 'フランクフルト',
    'Friedrichshafen': 'フリードリヒスハーフェン',
    'Fuerteventura': 'フエルテベントゥラ',
    'Funchal (Madeira)': 'フンシャル',
    'Gdansk': 'グダニスク',
    'Genoa': 'ジェノバ',
    'Glasgow': 'グラスゴー',
    'Gothenburg': 'ヨーテボリ',
    'Gran Canaria': 'グラン・カナリア',
    'Grenoble': 'グルノーブル',
    'Gyumri': 'ギュムリ',
    'Hamburg': 'ハンブルク',
    'Haugesund': 'ハウゲスン',
    'Heraklion (Crete)': 'イラクリオン',
    'Hurghada': 'フルガダ',
    'Iasi': 'ヤシ',
    'Ibiza': 'イビサ',
    'Istanbul': 'イスタンブール',
    'Jeddah': 'ジッダ',
    'Kalamata': 'カラマタ',
    'Karlsruhe/Baden-Baden': 'カールスルーエ',
    'Katowice': 'カトヴィツェ',
    'Kaunas': 'カウナス',
    'Kefalonia': 'ケファロニア',
    'Košice': 'コシツェ',
    'Krakow': 'クラクフ',
    'Kutaisi': 'クタイシ',
    'Lamezia Terme': 'ラメーツィア',
    'Lampedusa': 'ランペドゥーザ',
    'Larnaca': 'ラルナカ',
    'Leeds': 'リーズ',
    'Lisbon': 'リスボン',
    'Liverpool': 'リバプール',
    'Ljubljana': 'リュブリャナ',
    'London (LGW)': 'ロンドン・ガトウィック空港',
    'London (LTN)': 'ロンドン・ルートン空港',
    'Lublin': 'ルブリン',
    'Lyon': 'リヨン',
    'Maastricht': 'マーストリヒト',
    'Madrid': 'マドリード',
    'Malaga': 'マラガ',
    'Mallorca': 'マヨルカ',
    'Malmö': 'マルメ',
    'Malta': 'マルタ',
    'Marrakech': 'マラケシュ',
    'Marsa Alam': 'マルサ・アラム',
    'Medina': 'メディナ',
    'Memmingen': 'メミンゲン',
    'Menorca': 'メノルカ',
    'Milan': 'ミラノ',
    'Mykonos': 'ミコノス',
    'Naples': 'ナポリ',
    'Nice': 'ニース',
    'Niš': 'ニシュ',
    'Nuremberg': 'ニュルンベルク',
    'Ohrid': 'オフリド',
    'Olbia': 'オルビア',
    'Olsztyn-Mazury': 'オルシュティン',
    'Oradea': 'オラデア',
    'Oslo': 'オスロ',
    'Palanga': 'パランガ',
    'Palermo': 'パレルモ',
    'Paphos': 'パフォス',
    'Paris': 'パリ',
    'Perugia': 'ペルージャ',
    'Pescara': 'ペスカーラ',
    'Pisa': 'ピサ',
    'Plovdiv': 'プロヴディフ',
    'Podgorica': 'ポドゴリツァ',
    'Poprad-Tatry': 'ポプラト',
    'Porto': 'ポルト',
    'Poznan': 'ポズナン',
    'Prague': 'プラハ',
    'Pristina': 'プリシュティナ',
    'Radom': 'ラドム',
    'Reykjavik': 'レイキャビク',
    'Rhodes': 'ロードス',
    'Rijeka': 'リエカ',
    'Rimini': 'リミニ',
    'Rome': 'ローマ',
    'Rzeszów': 'ジェシュフ',
    'Sandefjord': 'サンデフィヨルド',
    'Santander': 'サンタンデール',
    'Santorini': 'サントリーニ',
    'Sarajevo': 'サラエボ',
    'Satu Mare': 'サトゥ・マーレ',
    'Sevilla': 'セビリア',
    'Sharm El Sheikh': 'シャルム・エル・シェイク',
    'Sibiu': 'シビウ',
    'Skiathos': 'スキアトス',
    'Skopje': 'スコピエ',
    'Sofia': 'ソフィア',
    'Split': 'スプリト',
    'Stavanger': 'スタヴァンゲル',
    'Stockholm': 'ストックホルム',
    'Stuttgart': 'シュトゥットガルト',
    'Suceava': 'スチャヴァ',
    'Szczecin': 'シュチェチン',
    'Tallinn': 'タリン',
    'Tel Aviv': 'テルアビブ',
    'Tenerife': 'テネリフェ',
    'Thessaloniki': 'テッサロニキ',
    'Timisoara': 'ティミショアラ',
    'Tirana': 'ティラナ',
    'Trieste': 'トリエステ',
    'Tromsø': 'トロムソ',
    'Trondheim': 'トロンハイム',
    'Turin': 'トリノ',
    'Turku': 'トゥルク',
    'Tuzla': 'トゥズラ',
    'Târgu-Mures': 'トゥルグ・ムレシュ',
    'Valencia': 'バレンシア',
    'Varna': 'ヴァルナ',
    'Venice': 'ヴェネツィア',
    'Verona': 'ヴェローナ',
    'Vienna': 'ウィーン',
    'Vilnius': 'ヴィリニュス',
    'Warsaw': 'ワルシャワ',
    'Wroclaw': 'ヴロツワフ',
    'Yerevan': 'エレバン',
    'Zakynthos': 'ザキントス',
    'Zaragoza': 'サラゴサ'
};

const countryMap = {
    'Aberdeen': 'スコットランド',
    'Abu Dhabi': 'UAE',
    'Agadir': 'モロッコ',
    'Alesund': 'ノルウェー',
    'Alghero': 'イタリア',
    'Alicante': 'スペイン',
    'Amman': 'ヨルダン',
    'Ancona': 'イタリア',
    'Ankara': 'トルコ',
    'Antalya': 'トルコ',
    'Athens': 'ギリシャ',
    'Bacau': 'ルーマニア',
    'Baku': 'アゼルバイジャン',
    'Banja Luka': 'ボスニア',
    'Barcelona': 'スペイン',
    'Bari': 'イタリア',
    'Basel': 'スイス',
    'Belgrade': 'セルビア',
    'Bergamo': 'イタリア',
    'Bergen': 'ノルウェー',
    'Berlin': 'ドイツ',
    'Bilbao': 'スペイン',
    'Billund': 'デンマーク',
    'Birmingham': 'イギリス',
    'Bologna': 'イタリア',
    'Bordeaux': 'フランス',
    'Brasov': 'ルーマニア',
    'Bratislava': 'スロバキア',
    'Brindisi': 'イタリア',
    'Brussels Charleroi': 'ベルギー',
    'Bucharest': 'ルーマニア',
    'Budapest': 'ハンガリー',
    'Burgas': 'ブルガリア',
    'Cairo (Sphinx)': 'エジプト',
    'Castellon': 'スペイン',
    'Catania': 'イタリア',
    'Chania (Crete)': 'ギリシャ',
    'Chisinau': 'モルドバ',
    'Cluj-Napoca': 'ルーマニア',
    'Cologne': 'ドイツ',
    'Comiso': 'イタリア',
    'Constanta': 'ルーマニア',
    'Copenhagen': 'デンマーク',
    'Corfu': 'ギリシャ',
    'Craiova': 'ルーマニア',
    'Dalaman': 'トルコ',
    'Debrecen': 'ハンガリー',
    'Dortmund': 'ドイツ',
    'Dubai': 'UAE',
    'Dubrovnik': 'クロアチア',
    'Eindhoven': 'オランダ',
    'Faro (Algarve)': 'ポルトガル',
    'Frankfurt': 'ドイツ',
    'Friedrichshafen': 'ドイツ',
    'Fuerteventura': 'スペイン',
    'Funchal (Madeira)': 'ポルトガル',
    'Gdansk': 'ポーランド',
    'Genoa': 'イタリア',
    'Glasgow': 'スコットランド',
    'Gothenburg': 'スウェーデン',
    'Gran Canaria': 'スペイン',
    'Grenoble': 'フランス',
    'Gyumri': 'アルメニア',
    'Hamburg': 'ドイツ',
    'Haugesund': 'ノルウェー',
    'Heraklion (Crete)': 'ギリシャ',
    'Hurghada': 'エジプト',
    'Iasi': 'ルーマニア',
    'Ibiza': 'スペイン',
    'Istanbul': 'トルコ',
    'Jeddah': 'サウジアラビア',
    'Kalamata': 'ギリシャ',
    'Karlsruhe/Baden-Baden': 'ドイツ',
    'Katowice': 'ポーランド',
    'Kaunas': 'リトアニア',
    'Kefalonia': 'ギリシャ',
    'Košice': 'スロバキア',
    'Krakow': 'ポーランド',
    'Kutaisi': 'ジョージア',
    'Lamezia Terme': 'イタリア',
    'Lampedusa': 'イタリア',
    'Larnaca': 'キプロス',
    'Leeds': 'イギリス',
    'Lisbon': 'ポルトガル',
    'Liverpool': 'イギリス',
    'Ljubljana': 'スロベニア',
    'London (LGW)': 'イギリス',
    'London (LTN)': 'イギリス',
    'Lublin': 'ポーランド',
    'Lyon': 'フランス',
    'Maastricht': 'オランダ',
    'Madrid': 'スペイン',
    'Malaga': 'スペイン',
    'Mallorca': 'スペイン',
    'Malmö': 'スウェーデン',
    'Malta': 'マルタ',
    'Marrakech': 'モロッコ',
    'Marsa Alam': 'エジプト',
    'Medina': 'サウジアラビア',
    'Memmingen': 'ドイツ',
    'Menorca': 'スペイン',
    'Milan': 'イタリア',
    'Mykonos': 'ギリシャ',
    'Naples': 'イタリア',
    'Nice': 'フランス',
    'Niš': 'セルビア',
    'Nuremberg': 'ドイツ',
    'Ohrid': '北マケドニア',
    'Olbia': 'イタリア',
    'Olsztyn-Mazury': 'ポーランド',
    'Oradea': 'ルーマニア',
    'Oslo': 'ノルウェー',
    'Palanga': 'リトアニア',
    'Palermo': 'イタリア',
    'Paphos': 'キプロス',
    'Paris': 'フランス',
    'Perugia': 'イタリア',
    'Pescara': 'イタリア',
    'Pisa': 'イタリア',
    'Plovdiv': 'ブルガリア',
    'Podgorica': 'モンテネグロ',
    'Poprad-Tatry': 'スロバキア',
    'Porto': 'ポルトガル',
    'Poznan': 'ポーランド',
    'Prague': 'チェコ',
    'Pristina': 'コソボ',
    'Radom': 'ポーランド',
    'Reykjavik': 'アイスランド',
    'Rhodes': 'ギリシャ',
    'Rijeka': 'クロアチア',
    'Rimini': 'イタリア',
    'Rome': 'イタリア',
    'Rzeszów': 'ポーランド',
    'Sandefjord': 'ノルウェー',
    'Santander': 'スペイン',
    'Santorini': 'ギリシャ',
    'Sarajevo': 'ボスニア',
    'Satu Mare': 'ルーマニア',
    'Sevilla': 'スペイン',
    'Sharm El Sheikh': 'エジプト',
    'Sibiu': 'ルーマニア',
    'Skiathos': 'ギリシャ',
    'Skopje': '北マケドニア',
    'Sofia': 'ブルガリア',
    'Split': 'クロアチア',
    'Stavanger': 'ノルウェー',
    'Stockholm': 'スウェーデン',
    'Stuttgart': 'ドイツ',
    'Suceava': 'ルーマニア',
    'Szczecin': 'ポーランド',
    'Tallinn': 'エストニア',
    'Tel Aviv': 'イスラエル',
    'Tenerife': 'スペイン',
    'Thessaloniki': 'ギリシャ',
    'Timisoara': 'ルーマニア',
    'Tirana': 'アルバニア',
    'Trieste': 'イタリア',
    'Tromsø': 'ノルウェー',
    'Trondheim': 'ノルウェー',
    'Turin': 'イタリア',
    'Turku': 'フィンランド',
    'Tuzla': 'ボスニア',
    'Târgu-Mures': 'ルーマニア',
    'Valencia': 'スペイン',
    'Varna': 'ブルガリア',
    'Venice': 'イタリア',
    'Verona': 'イタリア',
    'Vienna': 'オーストリア',
    'Vilnius': 'リトアニア',
    'Warsaw': 'ポーランド',
    'Wroclaw': 'ポーランド',
    'Yerevan': 'アルメニア',
    'Zakynthos': 'ギリシャ',
    'Zaragoza': 'スペイン'
};

const regionMap = {
    'Aberdeen': '西欧',
    'Abu Dhabi': '中東',
    'Agadir': '中東',
    'Alesund': '北欧',
    'Alghero': '南欧',
    'Alicante': '南欧',
    'Amman': '中東',
    'Ancona': '南欧',
    'Ankara': '中東',
    'Antalya': '中東',
    'Athens': '南欧',
    'Bacau': '東欧',
    'Baku': '中東',
    'Banja Luka': '東欧',
    'Barcelona': '南欧',
    'Bari': '南欧',
    'Basel': '西欧',
    'Belgrade': '東欧',
    'Bergamo': '南欧',
    'Bergen': '北欧',
    'Berlin': '西欧',
    'Bilbao': '南欧',
    'Billund': '北欧',
    'Birmingham': '西欧',
    'Bologna': '南欧',
    'Bordeaux': '西欧',
    'Brasov': '東欧',
    'Bratislava': '東欧',
    'Brindisi': '南欧',
    'Brussels Charleroi': '西欧',
    'Bucharest': '東欧',
    'Budapest': '東欧',
    'Burgas': '東欧',
    'Cairo (Sphinx)': '中東',
    'Castellon': '南欧',
    'Catania': '南欧',
    'Chania (Crete)': '南欧',
    'Chisinau': '東欧',
    'Cluj-Napoca': '東欧',
    'Cologne': '西欧',
    'Comiso': '南欧',
    'Constanta': '東欧',
    'Copenhagen': '北欧',
    'Corfu': '南欧',
    'Craiova': '東欧',
    'Dalaman': '中東',
    'Dortmund': '西欧',
    'Dubai': '中東',
    'Dubrovnik': '南欧',
    'Eindhoven': '西欧',
    'Faro (Algarve)': '南欧',
    'Frankfurt': '西欧',
    'Friedrichshafen': '西欧',
    'Fuerteventura': '南欧',
    'Funchal (Madeira)': '南欧',
    'Gdansk': '東欧',
    'Genoa': '南欧',
    'Glasgow': '西欧',
    'Gothenburg': '北欧',
    'Gran Canaria': '南欧',
    'Grenoble': '西欧',
    'Gyumri': '中東',
    'Hamburg': '西欧',
    'Haugesund': '北欧',
    'Heraklion (Crete)': '南欧',
    'Hurghada': '中東',
    'Iasi': '東欧',
    'Ibiza': '南欧',
    'Istanbul': '中東',
    'Jeddah': '中東',
    'Kalamata': '南欧',
    'Karlsruhe/Baden-Baden': '西欧',
    'Katowice': '東欧',
    'Kaunas': '北欧',
    'Kefalonia': '南欧',
    'Košice': '東欧',
    'Krakow': '東欧',
    'Kutaisi': '中東',
    'Lamezia Terme': '南欧',
    'Lampedusa': '南欧',
    'Larnaca': '南欧',
    'Leeds': '西欧',
    'Lisbon': '南欧',
    'Liverpool': '西欧',
    'Ljubljana': '東欧',
    'London (LGW)': '西欧',
    'London (LTN)': '西欧',
    'Lublin': '東欧',
    'Lyon': '西欧',
    'Maastricht': '西欧',
    'Madrid': '南欧',
    'Malaga': '南欧',
    'Mallorca': '南欧',
    'Malmö': '北欧',
    'Malta': '南欧',
    'Marrakech': '中東',
    'Marsa Alam': '中東',
    'Medina': '中東',
    'Memmingen': '西欧',
    'Menorca': '南欧',
    'Milan': '南欧',
    'Mykonos': '南欧',
    'Naples': '南欧',
    'Nice': '西欧',
    'Niš': '東欧',
    'Nuremberg': '西欧',
    'Ohrid': '東欧',
    'Olbia': '南欧',
    'Olsztyn-Mazury': '東欧',
    'Oradea': '東欧',
    'Oslo': '北欧',
    'Palanga': '北欧',
    'Palermo': '南欧',
    'Paphos': '南欧',
    'Paris': '西欧',
    'Perugia': '南欧',
    'Pescara': '南欧',
    'Pisa': '南欧',
    'Plovdiv': '東欧',
    'Podgorica': '東欧',
    'Poprad-Tatry': '東欧',
    'Porto': '南欧',
    'Poznan': '東欧',
    'Prague': '東欧',
    'Pristina': '東欧',
    'Radom': '東欧',
    'Reykjavik': '北欧',
    'Rhodes': '南欧',
    'Rijeka': '南欧',
    'Rimini': '南欧',
    'Rome': '南欧',
    'Rzeszów': '東欧',
    'Sandefjord': '北欧',
    'Santander': '南欧',
    'Santorini': '南欧',
    'Sarajevo': '東欧',
    'Satu Mare': '東欧',
    'Sevilla': '南欧',
    'Sharm El Sheikh': '中東',
    'Sibiu': '東欧',
    'Skiathos': '南欧',
    'Skopje': '東欧',
    'Sofia': '東欧',
    'Split': '南欧',
    'Stavanger': '北欧',
    'Stockholm': '北欧',
    'Stuttgart': '西欧',
    'Suceava': '東欧',
    'Szczecin': '東欧',
    'Tallinn': '北欧',
    'Tel Aviv': '中東',
    'Tenerife': '南欧',
    'Thessaloniki': '南欧',
    'Timisoara': '東欧',
    'Tirana': '東欧',
    'Trieste': '南欧',
    'Tromsø': '北欧',
    'Trondheim': '北欧',
    'Turin': '南欧',
    'Turku': '北欧',
    'Tuzla': '東欧',
    'Târgu-Mures': '東欧',
    'Valencia': '南欧',
    'Varna': '東欧',
    'Venice': '南欧',
    'Verona': '南欧',
    'Vienna': '東欧',
    'Vilnius': '北欧',
    'Warsaw': '東欧',
    'Wroclaw': '東欧',
    'Yerevan': '中東',
    'Zakynthos': '南欧',
    'Zaragoza': '南欧'
};

const rawFlightData = `Aberdeen - Gdansk
Abu Dhabi - Budapest
Abu Dhabi - Cluj-Napoca
Abu Dhabi - Katowice
Abu Dhabi - Krakow
Abu Dhabi - Larnaca
Abu Dhabi - Sofia
Agadir - Katowice
Agadir - Warsaw
Alesund - Gdansk
Alghero - Belgrade
Alghero - Bucharest
Alghero - Budapest
Alghero - Sofia
Alghero - Tirana
Alghero - Warsaw
Alicante - Belgrade
Alicante - Bratislava
Alicante - Bucharest
Alicante - Budapest
Alicante - Cluj-Napoca
Alicante - Gdansk
Alicante - Katowice
Alicante - Milan
Alicante - Rome
Alicante - Warsaw
Amman - Budapest
Ancona - Tirana
Ankara - Budapest
Antalya - Bucharest
Antalya - Budapest
Antalya - Cluj-Napoca
Athens - Bratislava
Athens - Bucharest
Athens - Budapest
Athens - Chisinau
Athens - Craiova
Athens - Gdansk
Athens - Katowice
Athens - Kutaisi
Athens - Larnaca
Athens - Tel Aviv
Athens - Tirana
Athens - Venice
Athens - Warsaw
Bacau - Rome
Baku - Budapest
Baku - Rome
Banja Luka - Basel
Banja Luka - Dortmund
Barcelona - Belgrade
Barcelona - Bratislava
Barcelona - Bucharest
Barcelona - Budapest
Barcelona - Chisinau
Barcelona - Cluj-Napoca
Barcelona - Craiova
Barcelona - Gdansk
Barcelona - Iasi
Barcelona - Katowice
Barcelona - Krakow
Barcelona - Kutaisi
Barcelona - Larnaca
Barcelona - Milan
Barcelona - Podgorica
Barcelona - Rome
Barcelona - Skopje
Barcelona - Sofia
Barcelona - Timisoara
Barcelona - Tirana
Barcelona - Venice
Barcelona - Vienna
Barcelona - Vilnius
Barcelona - Warsaw
Barcelona - Wroclaw
Bari - Bucharest
Bari - Budapest
Bari - Chisinau
Bari - Cluj-Napoca
Bari - Craiova
Bari - Skopje
Bari - Sofia
Bari - Timisoara
Bari - Tirana
Bari - Warsaw
Bari - Wroclaw
Bari - Yerevan
Basel - Banja Luka
Basel - Belgrade
Basel - Bratislava
Basel - Bucharest
Basel - Budapest
Basel - Cluj-Napoca
Basel - Iasi
Basel - Krakow
Basel - Niš
Basel - Ohrid
Basel - Podgorica
Basel - Poznan
Basel - Sibiu
Basel - Skopje
Basel - Sofia
Basel - Timisoara
Basel - Tirana
Basel - Tuzla
Basel - Târgu-Mures
Basel - Warsaw
Basel - Wroclaw
Belgrade - Alghero
Belgrade - Alicante
Belgrade - Barcelona
Belgrade - Basel
Belgrade - Bergamo
Belgrade - Berlin
Belgrade - Chania (Crete)
Belgrade - Dortmund
Belgrade - Eindhoven
Belgrade - Friedrichshafen
Belgrade - Gothenburg
Belgrade - Grenoble
Belgrade - Hamburg
Belgrade - Karlsruhe/Baden-Baden
Belgrade - Larnaca
Belgrade - Madrid
Belgrade - Malmö
Belgrade - Malta
Belgrade - Memmingen
Belgrade - Nice
Belgrade - Palermo
Belgrade - Paris
Belgrade - Pisa
Belgrade - Rome
Belgrade - Stockholm
Bergamo - Belgrade
Bergamo - Bucharest
Bergamo - Chisinau
Bergamo - Cluj-Napoca
Bergamo - Craiova
Bergamo - Iasi
Bergamo - Oradea
Bergamo - Sibiu
Bergamo - Sofia
Bergamo - Suceava
Bergamo - Timisoara
Bergamo - Tirana
Bergamo - Târgu-Mures
Bergamo - Varna
Bergamo - Warsaw
Bergen - Budapest
Bergen - Gdansk
Bergen - Krakow
Bergen - Szczecin
Bergen - Vilnius
Bergen - Warsaw
Berlin - Belgrade
Berlin - Bratislava
Berlin - Bucharest
Berlin - Budapest
Berlin - Chisinau
Berlin - Cluj-Napoca
Berlin - Kutaisi
Berlin - Skopje
Berlin - Tirana
Berlin - Tuzla
Berlin - Varna
Bilbao - Budapest
Bilbao - Krakow
Bilbao - Rome
Bilbao - Warsaw
Billund - Bucharest
Billund - Budapest
Billund - Chisinau
Billund - Cluj-Napoca
Billund - Gdansk
Billund - Iasi
Billund - Katowice
Billund - Tirana
Billund - Vilnius
Birmingham - Bucharest
Birmingham - Budapest
Birmingham - Craiova
Birmingham - Rome
Birmingham - Sibiu
Birmingham - Suceava
Bologna - Bucharest
Bologna - Catania
Bologna - Chisinau
Bologna - Cluj-Napoca
Bologna - Craiova
Bologna - Iasi
Bologna - Skopje
Bologna - Suceava
Bologna - Timisoara
Bologna - Tirana
Bologna - Warsaw
Bordeaux - Bucharest
Bordeaux - Rome
Bordeaux - Venice
Brasov - Budapest
Brasov - Dortmund
Brasov - Katowice
Brasov - Memmingen
Brasov - Milan
Brasov - Naples
Brasov - Nuremberg
Brasov - Rome
Brasov - Warsaw
Bratislava - Alicante
Bratislava - Athens
Bratislava - Barcelona
Bratislava - Basel
Bratislava - Berlin
Bratislava - Bucharest
Bratislava - Chisinau
Bratislava - Dortmund
Bratislava - Košice
Bratislava - Kutaisi
Bratislava - Lamezia Terme
Bratislava - Larnaca
Bratislava - Malaga
Bratislava - Mykonos
Bratislava - Naples
Bratislava - Niš
Bratislava - Ohrid
Bratislava - Oslo
Bratislava - Palermo
Bratislava - Plovdiv
Bratislava - Pristina
Bratislava - Rome
Bratislava - Skopje
Bratislava - Tel Aviv
Bratislava - Tirana
Bratislava - Tuzla
Bratislava - Varna
Bratislava - Warsaw
Bratislava - Yerevan
Brindisi - Bucharest
Brindisi - Katowice
Brindisi - Warsaw
Brussels Charleroi - Bucharest
Brussels Charleroi - Budapest
Brussels Charleroi - Chisinau
Brussels Charleroi - Cluj-Napoca
Brussels Charleroi - Craiova
Brussels Charleroi - Iasi
Brussels Charleroi - Kutaisi
Brussels Charleroi - Skopje
Brussels Charleroi - Sofia
Brussels Charleroi - Suceava
Brussels Charleroi - Timisoara
Brussels Charleroi - Tirana
Brussels Charleroi - Târgu-Mures
Brussels Charleroi - Varna
Brussels Charleroi - Warsaw
Bucharest - Alghero
Bucharest - Alicante
Bucharest - Antalya
Bucharest - Athens
Bucharest - Barcelona
Bucharest - Bari
Bucharest - Basel
Bucharest - Bergamo
Bucharest - Berlin
Bucharest - Billund
Bucharest - Birmingham
Bucharest - Bologna
Bucharest - Bordeaux
Bucharest - Bratislava
Bucharest - Brindisi
Bucharest - Brussels Charleroi
Bucharest - Budapest
Bucharest - Castellon
Bucharest - Catania
Bucharest - Chisinau
Bucharest - Cologne
Bucharest - Copenhagen
Bucharest - Corfu
Bucharest - Dortmund
Bucharest - Dubai
Bucharest - Eindhoven
Bucharest - Faro (Algarve)
Bucharest - Frankfurt
Bucharest - Gdansk
Bucharest - Gran Canaria
Bucharest - Hamburg
Bucharest - Heraklion (Crete)
Bucharest - Kefalonia
Bucharest - Krakow
Bucharest - Larnaca
Bucharest - Leeds
Bucharest - Lisbon
Bucharest - Liverpool
Bucharest - Lyon
Bucharest - Maastricht
Bucharest - Madrid
Bucharest - Malaga
Bucharest - Mallorca
Bucharest - Malta
Bucharest - Marrakech
Bucharest - Memmingen
Bucharest - Milan
Bucharest - Mykonos
Bucharest - Naples
Bucharest - Nice
Bucharest - Nuremberg
Bucharest - Paris
Bucharest - Pescara
Bucharest - Pisa
Bucharest - Porto
Bucharest - Prague
Bucharest - Rome
Bucharest - Sandefjord
Bucharest - Santander
Bucharest - Santorini
Bucharest - Sevilla
Bucharest - Stockholm
Bucharest - Stuttgart
Bucharest - Tel Aviv
Bucharest - Tenerife
Bucharest - Turin
Bucharest - Turku
Bucharest - Valencia
Bucharest - Venice
Bucharest - Warsaw
Bucharest - Wroclaw
Bucharest - Yerevan
Bucharest - Zakynthos
Bucharest - Zaragoza
Budapest - Abu Dhabi
Budapest - Alghero
Budapest - Alicante
Budapest - Amman
Budapest - Ankara
Budapest - Antalya
Budapest - Athens
Budapest - Baku
Budapest - Barcelona
Budapest - Bari
Budapest - Basel
Budapest - Bergen
Budapest - Berlin
Budapest - Bilbao
Budapest - Billund
Budapest - Birmingham
Budapest - Brasov
Budapest - Brussels Charleroi
Budapest - Bucharest
Budapest - Burgas
Budapest - Cairo (Sphinx)
Budapest - Catania
Budapest - Chisinau
Budapest - Copenhagen
Budapest - Corfu
Budapest - Dortmund
Budapest - Dubai
Budapest - Eindhoven
Budapest - Funchal (Madeira)
Budapest - Gdansk
Budapest - Genoa
Budapest - Gran Canaria
Budapest - Heraklion (Crete)
Budapest - Hurghada
Budapest - Istanbul
Budapest - Jeddah
Budapest - Kalamata
Budapest - Kefalonia
Budapest - Krakow
Budapest - Kutaisi
Budapest - Lamezia Terme
Budapest - Larnaca
Budapest - Lisbon
Budapest - Madrid
Budapest - Malaga
Budapest - Mallorca
Budapest - Malta
Budapest - Marrakech
Budapest - Memmingen
Budapest - Menorca
Budapest - Milan
Budapest - Naples
Budapest - Nice
Budapest - Paris
Budapest - Podgorica
Budapest - Reykjavik
Budapest - Rhodes
Budapest - Rimini
Budapest - Rome
Budapest - Santorini
Budapest - Sharm El Sheikh
Budapest - Skopje
Budapest - Stockholm
Budapest - Stuttgart
Budapest - Tallinn
Budapest - Tel Aviv
Budapest - Tenerife
Budapest - Thessaloniki
Budapest - Tirana
Budapest - Turin
Budapest - Târgu-Mures
Budapest - Valencia
Budapest - Varna
Budapest - Venice
Budapest - Vilnius
Budapest - Warsaw
Budapest - Wroclaw
Budapest - Yerevan
Budapest - Zakynthos
Burgas - Budapest
Burgas - Gdansk
Burgas - Katowice
Burgas - Lublin
Burgas - Warsaw
Cairo (Sphinx) - Budapest
Cairo (Sphinx) - Milan
Cairo (Sphinx) - Rome
Castellon - Bucharest
Castellon - Cluj-Napoca
Catania - Bologna
Catania - Bucharest
Catania - Budapest
Catania - Cluj-Napoca
Catania - Gdansk
Catania - Katowice
Catania - Memmingen
Catania - Milan
Catania - Prague
Catania - Sharm El Sheikh
Catania - Turin
Catania - Venice
Catania - Verona
Catania - Vilnius
Catania - Warsaw
Catania - Wroclaw
Chania (Crete) - Belgrade
Chania (Crete) - Rome
Chania (Crete) - Warsaw
Chisinau - Athens
Chisinau - Barcelona
Chisinau - Bari
Chisinau - Bergamo
Chisinau - Berlin
Chisinau - Billund
Chisinau - Bologna
Chisinau - Bratislava
Chisinau - Brussels Charleroi
Chisinau - Bucharest
Chisinau - Budapest
Chisinau - Copenhagen
Chisinau - Dortmund
Chisinau - Frankfurt
Chisinau - Hamburg
Chisinau - Karlsruhe/Baden-Baden
Chisinau - Katowice
Chisinau - Larnaca
Chisinau - Maastricht
Chisinau - Memmingen
Chisinau - Milan
Chisinau - Naples
Chisinau - Nice
Chisinau - Nuremberg
Chisinau - Paris
Chisinau - Prague
Chisinau - Rome
Chisinau - Sofia
Chisinau - Turin
Chisinau - Venice
Chisinau - Verona
Chisinau - Vienna
Chisinau - Warsaw
Chisinau - Wroclaw
Cluj-Napoca - Abu Dhabi
Cluj-Napoca - Alicante
Cluj-Napoca - Antalya
Cluj-Napoca - Barcelona
Cluj-Napoca - Bari
Cluj-Napoca - Basel
Cluj-Napoca - Bergamo
Cluj-Napoca - Berlin
Cluj-Napoca - Billund
Cluj-Napoca - Bologna
Cluj-Napoca - Brussels Charleroi
Cluj-Napoca - Castellon
Cluj-Napoca - Catania
Cluj-Napoca - Corfu
Cluj-Napoca - Dortmund
Cluj-Napoca - Eindhoven
Cluj-Napoca - Heraklion (Crete)
Cluj-Napoca - Larnaca
Cluj-Napoca - Leeds
Cluj-Napoca - Lisbon
Cluj-Napoca - Lyon
Cluj-Napoca - Madrid
Cluj-Napoca - Malaga
Cluj-Napoca - Mallorca
Cluj-Napoca - Malmö
Cluj-Napoca - Marrakech
Cluj-Napoca - Memmingen
Cluj-Napoca - Milan
Cluj-Napoca - Naples
Cluj-Napoca - Nuremberg
Cluj-Napoca - Paris
Cluj-Napoca - Rome
Cluj-Napoca - Sandefjord
Cluj-Napoca - Stockholm
Cluj-Napoca - Stuttgart
Cluj-Napoca - Tel Aviv
Cluj-Napoca - Valencia
Cluj-Napoca - Venice
Cluj-Napoca - Vienna
Cluj-Napoca - Zakynthos
Cluj-Napoca - Zaragoza
Cologne - Bucharest
Cologne - Podgorica
Cologne - Skopje
Cologne - Tirana
Cologne - Tuzla
Comiso - Tirana
Constanta - Rome
Copenhagen - Bucharest
Copenhagen - Budapest
Copenhagen - Chisinau
Copenhagen - Gdansk
Copenhagen - Iasi
Copenhagen - Warsaw
Corfu - Bucharest
Corfu - Budapest
Corfu - Cluj-Napoca
Corfu - Katowice
Corfu - Milan
Corfu - Rome
Corfu - Warsaw
Craiova - Athens
Craiova - Barcelona
Craiova - Bari
Craiova - Bergamo
Craiova - Birmingham
Craiova - Bologna
Craiova - Brussels Charleroi
Craiova - Dortmund
Craiova - Madrid
Craiova - Memmingen
Craiova - Naples
Craiova - Paris
Craiova - Rome
Debrecen - Eindhoven
Debrecen - Larnaca
Debrecen - Tel Aviv
Dortmund - Banja Luka
Dortmund - Belgrade
Dortmund - Brasov
Dortmund - Bratislava
Dortmund - Bucharest
Dortmund - Budapest
Dortmund - Chisinau
Dortmund - Cluj-Napoca
Dortmund - Craiova
Dortmund - Gdansk
Dortmund - Iasi
Dortmund - Katowice
Dortmund - Kutaisi
Dortmund - Niš
Dortmund - Ohrid
Dortmund - Olsztyn-Mazury
Dortmund - Oradea
Dortmund - Podgorica
Dortmund - Pristina
Dortmund - Sibiu
Dortmund - Skopje
Dortmund - Sofia
Dortmund - Suceava
Dortmund - Timisoara
Dortmund - Tirana
Dortmund - Tuzla
Dortmund - Târgu-Mures
Dortmund - Varna
Dortmund - Vilnius
Dortmund - Warsaw
Dortmund - Wroclaw
Dortmund - Yerevan
Dubai - Bucharest
Dubai - Budapest
Dubrovnik - Gdansk
Dubrovnik - Warsaw
Eindhoven - Belgrade
Eindhoven - Bucharest
Eindhoven - Budapest
Eindhoven - Cluj-Napoca
Eindhoven - Debrecen
Eindhoven - Gdansk
Eindhoven - Iasi
Eindhoven - Katowice
Eindhoven - Krakow
Eindhoven - Skopje
Eindhoven - Sofia
Eindhoven - Tirana
Eindhoven - Varna
Eindhoven - Vilnius
Eindhoven - Warsaw
Eindhoven - Wroclaw
Faro (Algarve) - Bucharest
Faro (Algarve) - Katowice
Faro (Algarve) - Warsaw
Frankfurt - Bucharest
Frankfurt - Chisinau
Frankfurt - Kutaisi
Frankfurt - Sibiu
Frankfurt - Skopje
Frankfurt - Timisoara
Frankfurt - Tirana
Frankfurt - Tuzla
Frankfurt - Varna
Friedrichshafen - Belgrade
Friedrichshafen - Skopje
Fuerteventura - Katowice
Fuerteventura - Warsaw
Funchal (Madeira) - Budapest
Funchal (Madeira) - Gdansk
Funchal (Madeira) - Katowice
Funchal (Madeira) - Vienna
Funchal (Madeira) - Warsaw
Gdansk - Aberdeen
Gdansk - Alesund
Gdansk - Alicante
Gdansk - Athens
Gdansk - Barcelona
Gdansk - Bergen
Gdansk - Billund
Gdansk - Bucharest
Gdansk - Budapest
Gdansk - Burgas
Gdansk - Catania
Gdansk - Copenhagen
Gdansk - Dortmund
Gdansk - Dubrovnik
Gdansk - Eindhoven
Gdansk - Funchal (Madeira)
Gdansk - Gothenburg
Gdansk - Hamburg
Gdansk - Haugesund
Gdansk - Heraklion (Crete)
Gdansk - Larnaca
Gdansk - Liverpool
Gdansk - Madrid
Gdansk - Malaga
Gdansk - Mallorca
Gdansk - Milan
Gdansk - Nice
Gdansk - Oslo
Gdansk - Podgorica
Gdansk - Poprad-Tatry
Gdansk - Reykjavik
Gdansk - Rijeka
Gdansk - Rome
Gdansk - Split
Gdansk - Stavanger
Gdansk - Stockholm
Gdansk - Tallinn
Gdansk - Tenerife
Gdansk - Tirana
Gdansk - Tromsø
Gdansk - Trondheim
Gdansk - Turku
Gdansk - Verona
Gdansk - Vilnius
Genoa - Budapest
Genoa - Krakow
Genoa - Tirana
Genoa - Warsaw
Glasgow - Milan
Glasgow - Rome
Gothenburg - Belgrade
Gothenburg - Gdansk
Gothenburg - Skopje
Gothenburg - Tuzla
Gran Canaria - Bucharest
Gran Canaria - Budapest
Gran Canaria - Wroclaw
Grenoble - Belgrade
Grenoble - Vilnius
Grenoble - Warsaw
Gyumri - Larnaca
Hamburg - Belgrade
Hamburg - Bucharest
Hamburg - Chisinau
Hamburg - Gdansk
Hamburg - Kutaisi
Hamburg - Podgorica
Hamburg - Sibiu
Hamburg - Skopje
Hamburg - Sofia
Hamburg - Tirana
Hamburg - Tuzla
Hamburg - Varna
Hamburg - Yerevan
Haugesund - Gdansk
Heraklion (Crete) - Bucharest
Heraklion (Crete) - Budapest
Heraklion (Crete) - Cluj-Napoca
Heraklion (Crete) - Gdansk
Heraklion (Crete) - Krakow
Heraklion (Crete) - Milan
Heraklion (Crete) - Rome
Heraklion (Crete) - Warsaw
Hurghada - Budapest
Hurghada - Rome
Hurghada - Vienna
Iasi - Barcelona
Iasi - Basel
Iasi - Bergamo
Iasi - Billund
Iasi - Bologna
Iasi - Brussels Charleroi
Iasi - Copenhagen
Iasi - Dortmund
Iasi - Eindhoven
Iasi - Istanbul
Iasi - Larnaca
Iasi - Liverpool
Iasi - Madrid
Iasi - Memmingen
Iasi - Paris
Iasi - Pescara
Iasi - Prague
Iasi - Rome
Iasi - Tel Aviv
Iasi - Turin
Iasi - Valencia
Iasi - Venice
Ibiza - Rome
Istanbul - Budapest
Istanbul - Iasi
Jeddah - Budapest
Jeddah - Milan
Jeddah - Rome
Jeddah - Vienna
Kalamata - Budapest
Kalamata - Tirana
Karlsruhe/Baden-Baden - Belgrade
Karlsruhe/Baden-Baden - Chisinau
Karlsruhe/Baden-Baden - Podgorica
Karlsruhe/Baden-Baden - Sibiu
Karlsruhe/Baden-Baden - Skopje
Karlsruhe/Baden-Baden - Suceava
Karlsruhe/Baden-Baden - Timisoara
Karlsruhe/Baden-Baden - Tirana
Katowice - Abu Dhabi
Katowice - Agadir
Katowice - Alicante
Katowice - Athens
Katowice - Barcelona
Katowice - Billund
Katowice - Brasov
Katowice - Brindisi
Katowice - Burgas
Katowice - Catania
Katowice - Chisinau
Katowice - Corfu
Katowice - Dortmund
Katowice - Eindhoven
Katowice - Faro (Algarve)
Katowice - Fuerteventura
Katowice - Funchal (Madeira)
Katowice - Kutaisi
Katowice - Lamezia Terme
Katowice - Larnaca
Katowice - Maastricht
Katowice - Madrid
Katowice - Malaga
Katowice - Malta
Katowice - Naples
Katowice - Ohrid
Katowice - Pisa
Katowice - Podgorica
Katowice - Porto
Katowice - Reykjavik
Katowice - Rijeka
Katowice - Rimini
Katowice - Rome
Katowice - Split
Katowice - Tenerife
Katowice - Tirana
Kefalonia - Bucharest
Kefalonia - Budapest
Kefalonia - Rome
Košice - Bratislava
Košice - Rome
Krakow - Abu Dhabi
Krakow - Barcelona
Krakow - Basel
Krakow - Bergen
Krakow - Bilbao
Krakow - Bucharest
Krakow - Budapest
Krakow - Eindhoven
Krakow - Genoa
Krakow - Heraklion (Crete)
Krakow - Larnaca
Krakow - Lyon
Krakow - Malaga
Krakow - Milan
Krakow - Nice
Krakow - Oslo
Krakow - Rome
Krakow - Sofia
Krakow - Split
Krakow - Stavanger
Krakow - Tallinn
Krakow - Tel Aviv
Krakow - Tirana
Krakow - Valencia
Krakow - Venice
Krakow - Verona
Krakow - Vilnius
Kutaisi - Athens
Kutaisi - Barcelona
Kutaisi - Berlin
Kutaisi - Bratislava
Kutaisi - Brussels Charleroi
Kutaisi - Budapest
Kutaisi - Dortmund
Kutaisi - Frankfurt
Kutaisi - Hamburg
Kutaisi - Katowice
Kutaisi - Larnaca
Kutaisi - Lyon
Kutaisi - Madrid
Kutaisi - Memmingen
Kutaisi - Milan
Kutaisi - Paris
Kutaisi - Poznan
Kutaisi - Prague
Kutaisi - Rome
Kutaisi - Thessaloniki
Kutaisi - Venice
Kutaisi - Vienna
Kutaisi - Vilnius
Kutaisi - Warsaw
Kutaisi - Wroclaw
Lamezia Terme - Bratislava
Lamezia Terme - Budapest
Lamezia Terme - Katowice
Lamezia Terme - Sofia
Lamezia Terme - Warsaw
Lampedusa - Milan
Lampedusa - Rome
Larnaca - Abu Dhabi
Larnaca - Athens
Larnaca - Barcelona
Larnaca - Belgrade
Larnaca - Bratislava
Larnaca - Bucharest
Larnaca - Budapest
Larnaca - Chisinau
Larnaca - Cluj-Napoca
Larnaca - Debrecen
Larnaca - Gdansk
Larnaca - Gyumri
Larnaca - Iasi
Larnaca - Katowice
Larnaca - Krakow
Larnaca - Kutaisi
Larnaca - Milan
Larnaca - Prague
Larnaca - Radom
Larnaca - Rome
Larnaca - Skopje
Larnaca - Sofia
Larnaca - Suceava
Larnaca - Tel Aviv
Larnaca - Thessaloniki
Larnaca - Timisoara
Larnaca - Tirana
Larnaca - Tuzla
Larnaca - Târgu-Mures
Larnaca - Venice
Larnaca - Vienna
Larnaca - Vilnius
Larnaca - Warsaw
Larnaca - Wroclaw
Larnaca - Yerevan
Leeds - Bucharest
Leeds - Cluj-Napoca
Leeds - Warsaw
Lisbon - Bucharest
Lisbon - Budapest
Lisbon - Cluj-Napoca
Lisbon - Rome
Lisbon - Warsaw
Liverpool - Bucharest
Liverpool - Gdansk
Liverpool - Iasi
Liverpool - Warsaw
Ljubljana - Podgorica
Ljubljana - Skopje
Lublin - Burgas
Lublin - Maastricht
Lublin - Rijeka
Lublin - Split
Lyon - Bucharest
Lyon - Cluj-Napoca
Lyon - Krakow
Lyon - Kutaisi
Lyon - Skopje
Lyon - Sofia
Lyon - Tirana
Maastricht - Bucharest
Maastricht - Chisinau
Maastricht - Katowice
Maastricht - Lublin
Maastricht - Podgorica
Maastricht - Tuzla
Madrid - Belgrade
Madrid - Bucharest
Madrid - Budapest
Madrid - Cluj-Napoca
Madrid - Craiova
Madrid - Gdansk
Madrid - Iasi
Madrid - Katowice
Madrid - Kutaisi
Madrid - Milan
Madrid - Rome
Madrid - Sibiu
Madrid - Skopje
Madrid - Sofia
Madrid - Timisoara
Madrid - Tirana
Madrid - Venice
Madrid - Warsaw
Madrid - Wroclaw
Malaga - Bratislava
Malaga - Bucharest
Malaga - Budapest
Malaga - Cluj-Napoca
Malaga - Gdansk
Malaga - Katowice
Malaga - Krakow
Malaga - Milan
Malaga - Rome
Malaga - Sofia
Malaga - Tirana
Malaga - Vienna
Malaga - Vilnius
Malaga - Warsaw
Malaga - Wroclaw
Mallorca - Bucharest
Mallorca - Budapest
Mallorca - Cluj-Napoca
Mallorca - Gdansk
Mallorca - Milan
Mallorca - Naples
Mallorca - Rome
Mallorca - Sofia
Mallorca - Tirana
Mallorca - Warsaw
Malmö - Belgrade
Malmö - Cluj-Napoca
Malmö - Podgorica
Malmö - Skopje
Malmö - Tirana
Malmö - Tuzla
Malta - Belgrade
Malta - Bucharest
Malta - Budapest
Malta - Katowice
Malta - Rome
Malta - Skopje
Malta - Tirana
Malta - Warsaw
Marrakech - Bucharest
Marrakech - Budapest
Marrakech - Cluj-Napoca
Marrakech - Milan
Marrakech - Rome
Marrakech - Sofia
Marrakech - Warsaw
Marsa Alam - Milan
Marsa Alam - Rome
Memmingen - Belgrade
Memmingen - Brasov
Memmingen - Bucharest
Memmingen - Budapest
Memmingen - Catania
Memmingen - Chisinau
Memmingen - Cluj-Napoca
Memmingen - Craiova
Memmingen - Iasi
Memmingen - Kutaisi
Memmingen - Niš
Memmingen - Ohrid
Memmingen - Podgorica
Memmingen - Pristina
Memmingen - Sibiu
Memmingen - Skopje
Memmingen - Sofia
Memmingen - Suceava
Memmingen - Timisoara
Memmingen - Tirana
Memmingen - Tuzla
Memmingen - Târgu-Mures
Memmingen - Varna
Memmingen - Yerevan
Menorca - Budapest
Menorca - Rome
Menorca - Warsaw
Milan - Alicante
Milan - Barcelona
Milan - Brasov
Milan - Bucharest
Milan - Budapest
Milan - Cairo (Sphinx)
Milan - Catania
Milan - Chisinau
Milan - Cluj-Napoca
Milan - Corfu
Milan - Gdansk
Milan - Glasgow
Milan - Heraklion (Crete)
Milan - Jeddah
Milan - Krakow
Milan - Kutaisi
Milan - Lampedusa
Milan - Larnaca
Milan - Madrid
Milan - Malaga
Milan - Mallorca
Milan - Marrakech
Milan - Marsa Alam
Milan - Ohrid
Milan - Olbia
Milan - Podgorica
Milan - Pristina
Milan - Reykjavik
Milan - Sevilla
Milan - Sharm El Sheikh
Milan - Skiathos
Milan - Skopje
Milan - Suceava
Milan - Tel Aviv
Milan - Tenerife
Milan - Tirana
Milan - Valencia
Milan - Vilnius
Milan - Warsaw
Milan - Yerevan
Milan - Zakynthos
Mykonos - Bratislava
Mykonos - Bucharest
Mykonos - Rome
Naples - Brasov
Naples - Bratislava
Naples - Bucharest
Naples - Budapest
Naples - Chisinau
Naples - Cluj-Napoca
Naples - Craiova
Naples - Katowice
Naples - Mallorca
Naples - Sharm El Sheikh
Naples - Skopje
Naples - Sofia
Naples - Tel Aviv
Naples - Timisoara
Naples - Tirana
Naples - Warsaw
Naples - Yerevan
Nice - Belgrade
Nice - Bucharest
Nice - Budapest
Nice - Chisinau
Nice - Gdansk
Nice - Krakow
Nice - Rome
Nice - Sofia
Nice - Tirana
Nice - Vilnius
Nice - Warsaw
Nice - Wroclaw
Niš - Basel
Niš - Bratislava
Niš - Dortmund
Niš - Memmingen
Nuremberg - Brasov
Nuremberg - Bucharest
Nuremberg - Chisinau
Nuremberg - Cluj-Napoca
Nuremberg - Sibiu
Nuremberg - Skopje
Nuremberg - Timisoara
Nuremberg - Tirana
Nuremberg - Varna
Ohrid - Basel
Ohrid - Bratislava
Ohrid - Dortmund
Ohrid - Katowice
Ohrid - Memmingen
Ohrid - Milan
Ohrid - Vienna
Ohrid - Wroclaw
Olbia - Milan
Olbia - Rome
Olbia - Warsaw
Olsztyn-Mazury - Dortmund
Oradea - Bergamo
Oradea - Dortmund
Oradea - Rome
Oslo - Bratislava
Oslo - Gdansk
Oslo - Krakow
Oslo - Palanga
Oslo - Szczecin
Palanga - Oslo
Palermo - Belgrade
Palermo - Bratislava
Palermo - Warsaw
Paphos - Warsaw
Paphos - Yerevan
Paris - Belgrade
Paris - Bucharest
Paris - Budapest
Paris - Chisinau
Paris - Cluj-Napoca
Paris - Craiova
Paris - Iasi
Paris - Kutaisi
Paris - Podgorica
Paris - Rome
Paris - Skopje
Paris - Sofia
Paris - Timisoara
Paris - Tirana
Paris - Tuzla
Paris - Târgu-Mures
Paris - Warsaw
Paris - Yerevan
Perugia - Tirana
Pescara - Bucharest
Pescara - Iasi
Pescara - Tirana
Pisa - Belgrade
Pisa - Bucharest
Pisa - Katowice
Pisa - Tirana
Pisa - Warsaw
Plovdiv - Bratislava
Podgorica - Barcelona
Podgorica - Basel
Podgorica - Budapest
Podgorica - Cologne
Podgorica - Dortmund
Podgorica - Gdansk
Podgorica - Hamburg
Podgorica - Karlsruhe/Baden-Baden
Podgorica - Katowice
Podgorica - Ljubljana
Podgorica - Maastricht
Podgorica - Malmö
Podgorica - Memmingen
Podgorica - Milan
Podgorica - Paris
Podgorica - Poznan
Podgorica - Rome
Podgorica - Rzeszów
Podgorica - Vilnius
Podgorica - Warsaw
Podgorica - Wroclaw
Poprad-Tatry - Gdansk
Porto - Bucharest
Porto - Katowice
Porto - Rome
Porto - Warsaw
Poznan - Basel
Poznan - Kutaisi
Poznan - Podgorica
Poznan - Tirana
Prague - Bucharest
Prague - Catania
Prague - Chisinau
Prague - Iasi
Prague - Kutaisi
Prague - Larnaca
Prague - Rome
Prague - Skopje
Prague - Sofia
Prague - Tirana
Prague - Yerevan
Pristina - Bratislava
Pristina - Dortmund
Pristina - Memmingen
Pristina - Milan
Pristina - Rome
Pristina - Vienna
Radom - Larnaca
Radom - Tirana
Reykjavik - Budapest
Reykjavik - Gdansk
Reykjavik - Katowice
Reykjavik - Milan
Reykjavik - Vilnius
Reykjavik - Warsaw
Reykjavik - Wroclaw
Rhodes - Budapest
Rhodes - Rome
Rhodes - Tel Aviv
Rhodes - Warsaw
Rijeka - Gdansk
Rijeka - Katowice
Rijeka - Lublin
Rimini - Budapest
Rimini - Katowice
Rimini - Sofia
Rimini - Tirana
Rome - Alicante
Rome - Bacau
Rome - Baku
Rome - Barcelona
Rome - Belgrade
Rome - Bilbao
Rome - Birmingham
Rome - Bordeaux
Rome - Brasov
Rome - Bratislava
Rome - Bucharest
Rome - Budapest
Rome - Cairo (Sphinx)
Rome - Chania (Crete)
Rome - Chisinau
Rome - Cluj-Napoca
Rome - Constanta
Rome - Corfu
Rome - Craiova
Rome - Gdansk
Rome - Glasgow
Rome - Heraklion (Crete)
Rome - Hurghada
Rome - Iasi
Rome - Ibiza
Rome - Jeddah
Rome - Katowice
Rome - Kefalonia
Rome - Košice
Rome - Krakow
Rome - Kutaisi
Rome - Lampedusa
Rome - Larnaca
Rome - Lisbon
Rome - Madrid
Rome - Malaga
Rome - Mallorca
Rome - Malta
Rome - Marrakech
Rome - Marsa Alam
Rome - Menorca
Rome - Mykonos
Rome - Nice
Rome - Olbia
Rome - Oradea
Rome - Paris
Rome - Podgorica
Rome - Porto
Rome - Prague
Rome - Pristina
Rome - Rhodes
Rome - Rzeszów
Rome - Santorini
Rome - Sarajevo
Rome - Sevilla
Rome - Sharm El Sheikh
Rome - Sibiu
Rome - Skiathos
Rome - Skopje
Rome - Sofia
Rome - Suceava
Rome - Tallinn
Rome - Tel Aviv
Rome - Tenerife
Rome - Timisoara
Rome - Tirana
Rome - Târgu-Mures
Rome - Valencia
Rome - Varna
Rome - Warsaw
Rome - Yerevan
Rome - Zakynthos
Rome - Zaragoza
Rzeszów - Podgorica
Rzeszów - Rome
Sandefjord - Bucharest
Sandefjord - Cluj-Napoca
Sandefjord - Skopje
Sandefjord - Tirana
Sandefjord - Warsaw
Santander - Bucharest
Santander - Sofia
Santander - Tirana
Santorini - Bucharest
Santorini - Budapest
Santorini - Rome
Santorini - Warsaw
Sarajevo - Rome
Sevilla - Bucharest
Sevilla - Milan
Sevilla - Rome
Sevilla - Warsaw
Sharm El Sheikh - Budapest
Sharm El Sheikh - Catania
Sharm El Sheikh - Milan
Sharm El Sheikh - Naples
Sharm El Sheikh - Rome
Sharm El Sheikh - Venice
Sibiu - Basel
Sibiu - Bergamo
Sibiu - Birmingham
Sibiu - Dortmund
Sibiu - Frankfurt
Sibiu - Hamburg
Sibiu - Karlsruhe/Baden-Baden
Sibiu - Madrid
Sibiu - Memmingen
Sibiu - Nuremberg
Sibiu - Rome
Skiathos - Milan
Skiathos - Rome
Skopje - Barcelona
Skopje - Bari
Skopje - Basel
Skopje - Berlin
Skopje - Bologna
Skopje - Bratislava
Skopje - Brussels Charleroi
Skopje - Budapest
Skopje - Cologne
Skopje - Dortmund
Skopje - Eindhoven
Skopje - Frankfurt
Skopje - Friedrichshafen
Skopje - Gothenburg
Skopje - Hamburg
Skopje - Karlsruhe/Baden-Baden
Skopje - Larnaca
Skopje - Ljubljana
Skopje - Lyon
Skopje - Madrid
Skopje - Malmö
Skopje - Malta
Skopje - Memmingen
Skopje - Milan
Skopje - Naples
Skopje - Nuremberg
Skopje - Paris
Skopje - Prague
Skopje - Rome
Skopje - Sandefjord
Skopje - Stockholm
Skopje - Stuttgart
Skopje - Venice
Sofia - Abu Dhabi
Sofia - Alghero
Sofia - Barcelona
Sofia - Bari
Sofia - Basel
Sofia - Bergamo
Sofia - Brussels Charleroi
Sofia - Chisinau
Sofia - Dortmund
Sofia - Eindhoven
Sofia - Hamburg
Sofia - Krakow
Sofia - Lamezia Terme
Sofia - Larnaca
Sofia - Lyon
Sofia - Madrid
Sofia - Malaga
Sofia - Mallorca
Sofia - Marrakech
Sofia - Memmingen
Sofia - Naples
Sofia - Nice
Sofia - Paris
Sofia - Prague
Sofia - Rimini
Sofia - Rome
Sofia - Santander
Sofia - Stuttgart
Sofia - Tel Aviv
Sofia - Turin
Sofia - Valencia
Sofia - Warsaw
Split - Gdansk
Split - Katowice
Split - Krakow
Split - Lublin
Split - Warsaw
Split - Wroclaw
Stavanger - Gdansk
Stavanger - Krakow
Stockholm - Belgrade
Stockholm - Bucharest
Stockholm - Budapest
Stockholm - Cluj-Napoca
Stockholm - Gdansk
Stockholm - Skopje
Stockholm - Tirana
Stockholm - Warsaw
Stuttgart - Bucharest
Stuttgart - Budapest
Stuttgart - Cluj-Napoca
Stuttgart - Skopje
Stuttgart - Sofia
Stuttgart - Tirana
Suceava - Bergamo
Suceava - Birmingham
Suceava - Bologna
Suceava - Brussels Charleroi
Suceava - Dortmund
Suceava - Karlsruhe/Baden-Baden
Suceava - Larnaca
Suceava - Memmingen
Suceava - Milan
Suceava - Rome
Suceava - Venice
Suceava - Vienna
Szczecin - Bergen
Szczecin - Oslo
Tallinn - Budapest
Tallinn - Gdansk
Tallinn - Krakow
Tallinn - Rome
Tallinn - Tirana
Tallinn - Venice
Tallinn - Vilnius
Tallinn - Warsaw
Tel Aviv - Athens
Tel Aviv - Bratislava
Tel Aviv - Bucharest
Tel Aviv - Budapest
Tel Aviv - Cluj-Napoca
Tel Aviv - Debrecen
Tel Aviv - Iasi
Tel Aviv - Krakow
Tel Aviv - Larnaca
Tel Aviv - Milan
Tel Aviv - Naples
Tel Aviv - Rhodes
Tel Aviv - Rome
Tel Aviv - Sofia
Tel Aviv - Thessaloniki
Tel Aviv - Varna
Tel Aviv - Venice
Tel Aviv - Vienna
Tel Aviv - Vilnius
Tel Aviv - Warsaw
Tenerife - Bucharest
Tenerife - Budapest
Tenerife - Gdansk
Tenerife - Katowice
Tenerife - Milan
Tenerife - Rome
Tenerife - Tirana
Tenerife - Vienna
Tenerife - Warsaw
Thessaloniki - Budapest
Thessaloniki - Kutaisi
Thessaloniki - Larnaca
Thessaloniki - Tel Aviv
Timisoara - Barcelona
Timisoara - Bari
Timisoara - Basel
Timisoara - Bergamo
Timisoara - Bologna
Timisoara - Brussels Charleroi
Timisoara - Dortmund
Timisoara - Frankfurt
Timisoara - Karlsruhe/Baden-Baden
Timisoara - Larnaca
Timisoara - Madrid
Timisoara - Memmingen
Timisoara - Naples
Timisoara - Nuremberg
Timisoara - Paris
Timisoara - Rome
Timisoara - Valencia
Timisoara - Venice
Timisoara - Zakynthos
Tirana - Alghero
Tirana - Ancona
Tirana - Athens
Tirana - Barcelona
Tirana - Bari
Tirana - Basel
Tirana - Bergamo
Tirana - Berlin
Tirana - Billund
Tirana - Bologna
Tirana - Bratislava
Tirana - Brussels Charleroi
Tirana - Budapest
Tirana - Cologne
Tirana - Comiso
Tirana - Dortmund
Tirana - Eindhoven
Tirana - Frankfurt
Tirana - Gdansk
Tirana - Genoa
Tirana - Hamburg
Tirana - Kalamata
Tirana - Karlsruhe/Baden-Baden
Tirana - Katowice
Tirana - Krakow
Tirana - Larnaca
Tirana - Lyon
Tirana - Madrid
Tirana - Malaga
Tirana - Mallorca
Tirana - Malmö
Tirana - Malta
Tirana - Memmingen
Tirana - Milan
Tirana - Naples
Tirana - Nice
Tirana - Nuremberg
Tirana - Paris
Tirana - Perugia
Tirana - Pescara
Tirana - Pisa
Tirana - Poznan
Tirana - Prague
Tirana - Radom
Tirana - Rimini
Tirana - Rome
Tirana - Sandefjord
Tirana - Santander
Tirana - Stockholm
Tirana - Stuttgart
Tirana - Tallinn
Tirana - Tenerife
Tirana - Trieste
Tirana - Turin
Tirana - Valencia
Tirana - Venice
Tirana - Verona
Tirana - Vienna
Tirana - Vilnius
Tirana - Warsaw
Tirana - Wroclaw
Trieste - Tirana
Tromsø - Gdansk
Trondheim - Gdansk
Turin - Bucharest
Turin - Budapest
Turin - Catania
Turin - Chisinau
Turin - Iasi
Turin - Sofia
Turin - Tirana
Turin - Warsaw
Turku - Bucharest
Turku - Gdansk
Turku - Vilnius
Tuzla - Basel
Tuzla - Berlin
Tuzla - Bratislava
Tuzla - Cologne
Tuzla - Dortmund
Tuzla - Frankfurt
Tuzla - Gothenburg
Tuzla - Hamburg
Tuzla - Larnaca
Tuzla - Maastricht
Tuzla - Malmö
Tuzla - Memmingen
Tuzla - Paris
Târgu-Mures - Basel
Târgu-Mures - Bergamo
Târgu-Mures - Brussels Charleroi
Târgu-Mures - Budapest
Târgu-Mures - Dortmund
Târgu-Mures - Larnaca
Târgu-Mures - Memmingen
Târgu-Mures - Paris
Târgu-Mures - Rome
Valencia - Bucharest
Valencia - Budapest
Valencia - Cluj-Napoca
Valencia - Iasi
Valencia - Krakow
Valencia - Milan
Valencia - Rome
Valencia - Sofia
Valencia - Timisoara
Valencia - Tirana
Valencia - Venice
Valencia - Warsaw
Varna - Bergamo
Varna - Berlin
Varna - Bratislava
Varna - Brussels Charleroi
Varna - Budapest
Varna - Dortmund
Varna - Eindhoven
Varna - Frankfurt
Varna - Hamburg
Varna - Memmingen
Varna - Nuremberg
Varna - Rome
Varna - Tel Aviv
Varna - Wroclaw
Venice - Athens
Venice - Barcelona
Venice - Bordeaux
Venice - Bucharest
Venice - Budapest
Venice - Catania
Venice - Chisinau
Venice - Cluj-Napoca
Venice - Iasi
Venice - Krakow
Venice - Kutaisi
Venice - Larnaca
Venice - Madrid
Venice - Sharm El Sheikh
Venice - Skopje
Venice - Suceava
Venice - Tallinn
Venice - Tel Aviv
Venice - Timisoara
Venice - Tirana
Venice - Valencia
Venice - Warsaw
Venice - Yerevan
Verona - Catania
Verona - Chisinau
Verona - Gdansk
Verona - Krakow
Verona - Tirana
Verona - Warsaw
Vienna - Barcelona
Vienna - Chisinau
Vienna - Cluj-Napoca
Vienna - Funchal (Madeira)
Vienna - Hurghada
Vienna - Jeddah
Vienna - Kutaisi
Vienna - Larnaca
Vienna - Malaga
Vienna - Ohrid
Vienna - Pristina
Vienna - Suceava
Vienna - Tel Aviv
Vienna - Tenerife
Vienna - Tirana
Vienna - Yerevan
Vilnius - Barcelona
Vilnius - Bergen
Vilnius - Billund
Vilnius - Budapest
Vilnius - Catania
Vilnius - Dortmund
Vilnius - Eindhoven
Vilnius - Gdansk
Vilnius - Grenoble
Vilnius - Krakow
Vilnius - Kutaisi
Vilnius - Larnaca
Vilnius - Malaga
Vilnius - Milan
Vilnius - Nice
Vilnius - Podgorica
Vilnius - Reykjavik
Vilnius - Tallinn
Vilnius - Tel Aviv
Vilnius - Tirana
Vilnius - Turku
Warsaw - Agadir
Warsaw - Alghero
Warsaw - Alicante
Warsaw - Athens
Warsaw - Barcelona
Warsaw - Bari
Warsaw - Basel
Warsaw - Bergamo
Warsaw - Bergen
Warsaw - Bilbao
Warsaw - Bologna
Warsaw - Brasov
Warsaw - Bratislava
Warsaw - Brindisi
Warsaw - Brussels Charleroi
Warsaw - Bucharest
Warsaw - Budapest
Warsaw - Burgas
Warsaw - Catania
Warsaw - Chania (Crete)
Warsaw - Chisinau
Warsaw - Copenhagen
Warsaw - Corfu
Warsaw - Dortmund
Warsaw - Dubrovnik
Warsaw - Eindhoven
Warsaw - Faro (Algarve)
Warsaw - Fuerteventura
Warsaw - Funchal (Madeira)
Warsaw - Genoa
Warsaw - Grenoble
Warsaw - Heraklion (Crete)
Warsaw - Kutaisi
Warsaw - Lamezia Terme
Warsaw - Larnaca
Warsaw - Leeds
Warsaw - Lisbon
Warsaw - Liverpool
Warsaw - Madrid
Warsaw - Malaga
Warsaw - Mallorca
Warsaw - Malta
Warsaw - Marrakech
Warsaw - Menorca
Warsaw - Milan
Warsaw - Naples
Warsaw - Nice
Warsaw - Olbia
Warsaw - Palermo
Warsaw - Paphos
Warsaw - Paris
Warsaw - Pisa
Warsaw - Podgorica
Warsaw - Porto
Warsaw - Reykjavik
Warsaw - Rhodes
Warsaw - Rome
Warsaw - Sandefjord
Warsaw - Santorini
Warsaw - Sevilla
Warsaw - Sofia
Warsaw - Split
Warsaw - Stockholm
Warsaw - Tallinn
Warsaw - Tel Aviv
Warsaw - Tenerife
Warsaw - Tirana
Warsaw - Turin
Warsaw - Valencia
Warsaw - Venice
Warsaw - Verona
Warsaw - Zakynthos
Wroclaw - Barcelona
Wroclaw - Bari
Wroclaw - Basel
Wroclaw - Bucharest
Wroclaw - Budapest
Wroclaw - Catania
Wroclaw - Chisinau
Wroclaw - Dortmund
Wroclaw - Eindhoven
Wroclaw - Gran Canaria
Wroclaw - Kutaisi
Wroclaw - Larnaca
Wroclaw - Madrid
Wroclaw - Malaga
Wroclaw - Nice
Wroclaw - Ohrid
Wroclaw - Podgorica
Wroclaw - Reykjavik
Wroclaw - Split
Wroclaw - Tirana
Wroclaw - Varna
Yerevan - Bari
Yerevan - Bratislava
Yerevan - Bucharest
Yerevan - Budapest
Yerevan - Dortmund
Yerevan - Hamburg
Yerevan - Larnaca
Yerevan - Memmingen
Yerevan - Milan
Yerevan - Naples
Yerevan - Paphos
Yerevan - Paris
Yerevan - Prague
Yerevan - Rome
Yerevan - Venice
Yerevan - Vienna
Zakynthos - Bucharest
Zakynthos - Budapest
Zakynthos - Cluj-Napoca
Zakynthos - Milan
Zakynthos - Rome
Zakynthos - Timisoara
Zakynthos - Warsaw
Zaragoza - Bucharest
Zaragoza - Cluj-Napoca
Zaragoza - Rome
London (LGW) - Antalya
Antalya - London (LGW)
London (LGW) - Budapest
Budapest - London (LGW)
London (LGW) - Catania
Catania - London (LGW)
London (LGW) - Dalaman
Dalaman - London (LGW)
London (LGW) - Faro (Algarve)
Faro (Algarve) - London (LGW)
London (LGW) - Grenoble
Grenoble - London (LGW)
London (LGW) - Istanbul
Istanbul - London (LGW)
London (LGW) - Jeddah
Jeddah - London (LGW)
London (LGW) - Krakow
Krakow - London (LGW)
London (LGW) - Larnaca
Larnaca - London (LGW)
London (LGW) - Lyon
Lyon - London (LGW)
London (LGW) - Medina
Medina - London (LGW)
London (LGW) - Malaga
Malaga - London (LGW)
London (LGW) - Marrakech
Marrakech - London (LGW)
London (LGW) - Podgorica
Podgorica - London (LGW)
London (LGW) - Prague
Prague - London (LGW)
London (LGW) - Sharm El Sheikh
Sharm El Sheikh - London (LGW)
London (LGW) - Tel Aviv
Tel Aviv - London (LGW)
London (LGW) - Tirana
Tirana - London (LGW)
London (LGW) - Valencia
Valencia - London (LGW)
London (LGW) - Varna
Varna - London (LGW)
London (LGW) - Warsaw
Warsaw - London (LGW)
London (LGW) - Wroclaw
Wroclaw - London (LGW)
London (LTN) - Alicante
Alicante - London (LTN)
London (LTN) - Amman
Amman - London (LTN)
London (LTN) - Antalya
Antalya - London (LTN)
London (LTN) - Athens
Athens - London (LTN)
London (LTN) - Bacau
Bacau - London (LTN)
London (LTN) - Barcelona
Barcelona - London (LTN)
London (LTN) - Belgrade
Belgrade - London (LTN)
London (LTN) - Bilbao
Bilbao - London (LTN)
London (LTN) - Bordeaux
Bordeaux - London (LTN)
London (LTN) - Burgas
Burgas - London (LTN)
London (LTN) - Brasov
Brasov - London (LTN)
London (LTN) - Bratislava
Bratislava - London (LTN)
London (LTN) - Bucharest
Bucharest - London (LTN)
London (LTN) - Budapest
Budapest - London (LTN)
London (LTN) - Cairo (Sphinx)
Cairo (Sphinx) - London (LTN)
London (LTN) - Chania (Crete)
Chania (Crete) - London (LTN)
London (LTN) - Chisinau
Chisinau - London (LTN)
London (LTN) - Cluj-Napoca
Cluj-Napoca - London (LTN)
London (LTN) - Constanta
Constanta - London (LTN)
London (LTN) - Corfu
Corfu - London (LTN)
London (LTN) - Craiova
Craiova - London (LTN)
London (LTN) - Debrecen
Debrecen - London (LTN)
London (LTN) - Dortmund
Dortmund - London (LTN)
London (LTN) - Faro (Algarve)
Faro (Algarve) - London (LTN)
London (LTN) - Gdansk
Gdansk - London (LTN)
London (LTN) - Grenoble
Grenoble - London (LTN)
London (LTN) - Hurghada
Hurghada - London (LTN)
London (LTN) - Iasi
Iasi - London (LTN)
London (LTN) - Istanbul
Istanbul - London (LTN)
London (LTN) - Katowice
Katowice - London (LTN)
London (LTN) - Kaunas
Kaunas - London (LTN)
London (LTN) - Košice
Košice - London (LTN)
London (LTN) - Krakow
Krakow - London (LTN)
London (LTN) - Larnaca
Larnaca - London (LTN)
London (LTN) - Lublin
Lublin - London (LTN)
London (LTN) - Lyon
Lyon - London (LTN)
London (LTN) - Madrid
Madrid - London (LTN)
London (LTN) - Milan
Milan - London (LTN)
London (LTN) - Mykonos
Mykonos - London (LTN)
London (LTN) - Mallorca
Mallorca - London (LTN)
London (LTN) - Plovdiv
Plovdiv - London (LTN)
London (LTN) - Poprad-Tatry
Poprad-Tatry - London (LTN)
London (LTN) - Poznan
Poznan - London (LTN)
London (LTN) - Prague
Prague - London (LTN)
London (LTN) - Pristina
Pristina - London (LTN)
London (LTN) - Rhodes
Rhodes - London (LTN)
London (LTN) - Rome
Rome - London (LTN)
London (LTN) - Sarajevo
Sarajevo - London (LTN)
London (LTN) - Satu Mare
Satu Mare - London (LTN)
London (LTN) - Sevilla
Sevilla - London (LTN)
London (LTN) - Sharm El Sheikh
Sharm El Sheikh - London (LTN)
London (LTN) - Sibiu
Sibiu - London (LTN)
London (LTN) - Skopje
Skopje - London (LTN)
London (LTN) - Sofia
Sofia - London (LTN)
London (LTN) - Split
Split - London (LTN)
London (LTN) - Suceava
Suceava - London (LTN)
London (LTN) - Tallinn
Tallinn - London (LTN)
London (LTN) - Tel Aviv
Tel Aviv - London (LTN)
London (LTN) - Timisoara
Timisoara - London (LTN)
London (LTN) - Tirana
Tirana - London (LTN)
London (LTN) - Târgu-Mures
Târgu-Mures - London (LTN)
London (LTN) - Tromsø
Tromsø - London (LTN)
London (LTN) - Turin
Turin - London (LTN)
London (LTN) - Valencia
Valencia - London (LTN)
London (LTN) - Varna
Varna - London (LTN)
London (LTN) - Venice
Venice - London (LTN)
London (LTN) - Vienna
Vienna - London (LTN)
London (LTN) - Vilnius
Vilnius - London (LTN)
London (LTN) - Warsaw
Warsaw - London (LTN)
London (LTN) - Wroclaw
Wroclaw - London (LTN)
London (LTN) - Yerevan
Yerevan - London (LTN)
London (LTN) - Zakynthos
Zakynthos - London (LTN)`;

const airportGoogleMap = {
'Aberdeen': 'https://www.google.com/maps/search/Aberdeen+International+Airport+ABZ',
'Abu Dhabi': 'https://www.google.com/maps/search/Zayed+International+Airport+AUH',
'Agadir': 'https://www.google.com/maps/search/Agadir+Al+Massira+Airport+AGA',
'Alesund': 'https://www.google.com/maps/search/Alesund+Airport+AES',
'Alghero': 'https://www.google.com/maps/search/Alghero+Fertilia+Airport+AHO',
'Alicante': 'https://www.google.com/maps/search/Alicante+Elche+Miguel+Hernandez+Airport+ALC',
'Amman': 'https://www.google.com/maps/search/Queen+Alia+International+Airport+AMM',
'Ancona': 'https://www.google.com/maps/search/Ancona+Airport+AOI',
'Ankara': 'https://www.google.com/maps/search/Ankara+Esenboga+Airport+ESB',
'Antalya': 'https://www.google.com/maps/search/Antalya+Airport+AYT',
'Athens': 'https://www.google.com/maps/search/Athens+International+Airport+ATH',
'Bacau': 'https://www.google.com/maps/search/Bacau+George+Enescu+International+Airport+BCM',
'Baku': 'https://www.google.com/maps/search/Heydar+Aliyev+International+Airport+GYD',
'Banja Luka': 'https://www.google.com/maps/search/Banja+Luka+International+Airport+BNX',
'Barcelona': 'https://www.google.com/maps/search/Barcelona+El+Prat+Airport+BCN',
'Bari': 'https://www.google.com/maps/search/Bari+Karol+Wojtyla+Airport+BRI',
'Basel': 'https://www.google.com/maps/search/EuroAirport+Basel+Mulhouse+Freiburg+BSL',
'Belgrade': 'https://www.google.com/maps/search/Belgrade+Nikola+Tesla+Airport+BEG',
'Bergamo': 'https://www.google.com/maps/search/Orio+al+Serio+International+Airport+BGY',
'Bergen': 'https://www.google.com/maps/search/Bergen+Airport+BGO',
'Berlin': 'https://www.google.com/maps/search/Berlin+Brandenburg+Airport+BER',
'Bilbao': 'https://www.google.com/maps/search/Bilbao+Airport+BIO',
'Billund': 'https://www.google.com/maps/search/Billund+Airport+BLL',
'Birmingham': 'https://www.google.com/maps/search/Birmingham+Airport+BHX',
'Bologna': 'https://www.google.com/maps/search/Bologna+Guglielmo+Marconi+Airport+BLQ',
'Bordeaux': 'https://www.google.com/maps/search/Bordeaux+Merignac+Airport+BOD',
'Brasov': 'https://www.google.com/maps/search/Brasov+Ghimbav+International+Airport+GHV',
'Bratislava': 'https://www.google.com/maps/search/Bratislava+Airport+BTS',
'Brindisi': 'https://www.google.com/maps/search/Brindisi+Airport+BDS',
'Brussels Charleroi': 'https://www.google.com/maps/search/Brussels+South+Charleroi+Airport+CRL',
'Bucharest': 'https://www.google.com/maps/search/Henri+Coanda+International+Airport+OTP',
'Budapest': 'https://www.google.com/maps/search/Budapest+Ferenc+Liszt+International+Airport+BUD',
'Burgas': 'https://www.google.com/maps/search/Burgas+Airport+BOJ',
'Cairo (Sphinx)': 'https://www.google.com/maps/search/Sphinx+International+Airport+SPX',
'Cairo Sphinx': 'https://www.google.com/maps/search/Sphinx+International+Airport+SPX',
'Castellon': 'https://www.google.com/maps/search/Castellon+Airport+CDT',
'Catania': 'https://www.google.com/maps/search/Catania+Fontanarossa+Airport+CTA',
'Chania': 'https://www.google.com/maps/search/Chania+International+Airport+CHQ',
'Chania (Crete)': 'https://www.google.com/maps/search/Chania+%28Crete%29+Airport+CHQ%27%2C+%27Chisinau%27%3A+%27RMO%27%2C+%27Cluj-Napoca%27%3A+%27CLJ',
'Chisinau': 'https://www.google.com/maps/search/Chisinau+International+Airport+RMO',
'Cluj-Napoca': 'https://www.google.com/maps/search/Avram+Iancu+Cluj+International+Airport+CLJ',
'Cologne': 'https://www.google.com/maps/search/Cologne+Bonn+Airport+CGN',
'Comiso': 'https://www.google.com/maps/search/Comiso+Airport+CIY',
'Constanta': 'https://www.google.com/maps/search/Mihail+Kogalniceanu+International+Airport+CND',
'Copenhagen': 'https://www.google.com/maps/search/Copenhagen+Airport+CPH',
'Corfu': 'https://www.google.com/maps/search/Corfu+International+Airport+CFU',
'Craiova': 'https://www.google.com/maps/search/Craiova+International+Airport+CRA',
'Dalaman': 'https://www.google.com/maps/search/Dalaman+Airport+DLM',
'Debrecen': 'https://www.google.com/maps/search/Debrecen+International+Airport+DEB',
'Dortmund': 'https://www.google.com/maps/search/Dortmund+Airport+DTM',
'Dubai': 'https://www.google.com/maps/search/Dubai+International+Airport+DXB',
'Dubrovnik': 'https://www.google.com/maps/search/Dubrovnik+Airport+DBV',
'Eindhoven': 'https://www.google.com/maps/search/Eindhoven+Airport+EIN',
'Faro': 'https://www.google.com/maps/search/Faro+Airport+FAO',
'Faro (Algarve)': 'https://www.google.com/maps/search/Faro+%28Algarve%29+Airport+FAO%27%2C+%27Frankfurt%27%3A+%27FRA%27%2C+%27Friedrichshafen%27%3A+%27FDH',
'Frankfurt': 'https://www.google.com/maps/search/Frankfurt+Airport+FRA',
'Friedrichshafen': 'https://www.google.com/maps/search/Friedrichshafen+Airport+FDH',
'Fuerteventura': 'https://www.google.com/maps/search/Fuerteventura+Airport+FUE',
'Funchal (Madeira)': 'https://www.google.com/maps/search/Funchal+%28Madeira%29+Airport+FNC',
'Gdansk': 'https://www.google.com/maps/search/Gdansk+Lech+Walesa+Airport+GDN',
'Genoa': 'https://www.google.com/maps/search/Genoa+Cristoforo+Colombo+Airport+GOA',
'Glasgow': 'https://www.google.com/maps/search/Glasgow+Airport+GLA',
'Gothenburg': 'https://www.google.com/maps/search/Goteborg+Landvetter+Airport+GOT',
'Gran Canaria': 'https://www.google.com/maps/search/Gran+Canaria+Airport+LPA',
'Grenoble': 'https://www.google.com/maps/search/Grenoble+Alpes+Isere+Airport+GNB',
'Gyumri': 'https://www.google.com/maps/search/Shirak+International+Airport+LWN',
'Hamburg': 'https://www.google.com/maps/search/Hamburg+Airport+HAM',
'Haugesund': 'https://www.google.com/maps/search/Haugesund+Airport+HAU',
'Heraklion': 'https://www.google.com/maps/search/Heraklion+International+Airport+HER',
'Heraklion (Crete)': 'https://www.google.com/maps/search/Heraklion+%28Crete%29+Airport+HER%27%2C+%27Hurghada%27%3A+%27HRG%27%2C+%27Iasi%27%3A+%27IAS%27%2C+%27Ibiza%27%3A+%27IBZ',
'Hurghada': 'https://www.google.com/maps/search/Hurghada+International+Airport+HRG',
'Iasi': 'https://www.google.com/maps/search/Iasi+International+Airport+IAS',
'Ibiza': 'https://www.google.com/maps/search/Ibiza+Airport+IBZ',
'Istanbul': 'https://www.google.com/maps/search/Istanbul+Airport+IST',
'Jeddah': 'https://www.google.com/maps/search/King+Abdulaziz+International+Airport+JED',
'Kalamata': 'https://www.google.com/maps/search/Kalamata+International+Airport+KLX',
'Karlsruhe/Baden-Baden': 'https://www.google.com/maps/search/Karlsruhe+Baden+Baden+Airport+FKB',
'Katowice': 'https://www.google.com/maps/search/Katowice+Airport+KTW',
'Kaunas': 'https://www.google.com/maps/search/Kaunas+Airport+KUN',
'Kefalonia': 'https://www.google.com/maps/search/Kefalonia+International+Airport+EFL',
'Keflavik': 'https://www.google.com/maps/search/Keflavik+International+Airport+KEF',
'Kosice': 'https://www.google.com/maps/search/Kosice+International+Airport+KSC',
'Košice': 'https://www.google.com/maps/search/Ko%C5%A1ice+Airport+KSC',
'Krakow': 'https://www.google.com/maps/search/Krakow+John+Paul+II+International+Airport+KRK',
'Kutaisi': 'https://www.google.com/maps/search/Kutaisi+International+Airport+KUT',
'Lamezia Terme': 'https://www.google.com/maps/search/Lamezia+Terme+International+Airport+SUF',
'Lampedusa': 'https://www.google.com/maps/search/Lampedusa+Airport+LMP',
'Larnaca': 'https://www.google.com/maps/search/Larnaca+International+Airport+LCA',
'Leeds': 'https://www.google.com/maps/search/Leeds+Bradford+Airport+LBA',
'Leeds Bradford': 'https://www.google.com/maps/search/Leeds+Bradford+Airport+LBA',
'Lisbon': 'https://www.google.com/maps/search/Lisbon+Airport+LIS',
'Liverpool': 'https://www.google.com/maps/search/Liverpool+John+Lennon+Airport+LPL',
'Ljubljana': 'https://www.google.com/maps/search/Ljubljana+Joze+Pucnik+Airport+LJU',
'London': 'https://www.google.com/maps/search/London+Luton+Airport+LTN',
'London (LGW)': 'https://www.google.com/maps/search/London+Gatwick+Airport+LGW',
'London (LTN)': 'https://www.google.com/maps/search/London+Luton+Airport+LTN',
'London Luton': 'https://www.google.com/maps/search/London+Luton+Airport+LTN',
'Lublin': 'https://www.google.com/maps/search/Lublin+Airport+LUZ',
'Lyon': 'https://www.google.com/maps/search/Lyon+Saint+Exupery+Airport+LYS',
'Maastricht': 'https://www.google.com/maps/search/Maastricht+Aachen+Airport+MST',
'Madeira': 'https://www.google.com/maps/search/Madeira+Airport+FNC',
'Madrid': 'https://www.google.com/maps/search/Adolfo+Suarez+Madrid+Barajas+Airport+MAD',
'Malaga': 'https://www.google.com/maps/search/Malaga+Costa+del+Sol+Airport+AGP',
'Mallorca': 'https://www.google.com/maps/search/Palma+de+Mallorca+Airport+PMI',
'Malmö': 'https://www.google.com/maps/search/Malmo+Airport+MMX',
'Malta': 'https://www.google.com/maps/search/Malta+International+Airport+MLA',
'Marrakech': 'https://www.google.com/maps/search/Marrakesh+Menara+Airport+RAK',
'Marsa Alam': 'https://www.google.com/maps/search/Marsa+Alam+International+Airport+RMF',
'Medina': 'https://www.google.com/maps/search/Prince+Mohammad+bin+Abdulaziz+International+Airport+MED',
'Memmingen': 'https://www.google.com/maps/search/Memmingen+Airport+FMM',
'Menorca': 'https://www.google.com/maps/search/Menorca+Airport+MAH',
'Milan': 'https://www.google.com/maps/search/Milan+Malpensa+Airport+MXP',
'Milan Bergamo': 'https://www.google.com/maps/search/Orio+al+Serio+International+Airport+BGY',
'Milan Malpensa': 'https://www.google.com/maps/search/Milan+Malpensa+Airport+MXP',
'Mykonos': 'https://www.google.com/maps/search/Mykonos+International+Airport+JMK',
'Naples': 'https://www.google.com/maps/search/Naples+International+Airport+NAP',
'Nice': 'https://www.google.com/maps/search/Nice+Cote+d \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'Azur+Airport+NCE',
'Nis': 'https://www.google.com/maps/search/Nis+Constantine+the+Great+Airport+INI',
'Niš': 'https://www.google.com/maps/search/Ni%C5%A1+Airport+INI%27%2C+%27Nuremberg%27%3A+%27NUE%27%2C+%27Ohrid%27%3A+%27OHD%27%2C+%27Olbia%27%3A+%27OLB',
'Nuremberg': 'https://www.google.com/maps/search/Nuremberg+Airport+NUE',
'Ohrid': 'https://www.google.com/maps/search/Ohrid+St.+Paul+the+Apostle+Airport+OHD',
'Olbia': 'https://www.google.com/maps/search/Olbia+Costa+Smeralda+Airport+OLB',
'Olsztyn-Mazury': 'https://www.google.com/maps/search/Olsztyn+Mazury+Airport+SZY',
'Oradea': 'https://www.google.com/maps/search/Oradea+International+Airport+OMR',
'Oslo': 'https://www.google.com/maps/search/Oslo+Airport+OSL',
'Palanga': 'https://www.google.com/maps/search/Palanga+International+Airport+PLQ',
'Palermo': 'https://www.google.com/maps/search/Falcone+Borsellino+Airport+PMO',
'Paphos': 'https://www.google.com/maps/search/Paphos+International+Airport+PFO',
'Paris': 'https://www.google.com/maps/search/Paris+Beauvais+Airport+BVA',
'Paris Beauvais': 'https://www.google.com/maps/search/Paris+Beauvais+Airport+BVA',
'Perugia': 'https://www.google.com/maps/search/Perugia+San+Francesco+d \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'Assisi+Airport+PEG',
'Pescara': 'https://www.google.com/maps/search/Abruzzo+Airport+PSR',
'Pisa': 'https://www.google.com/maps/search/Pisa+International+Airport+PSA',
'Plovdiv': 'https://www.google.com/maps/search/Plovdiv+Airport+PDV',
'Podgorica': 'https://www.google.com/maps/search/Podgorica+Airport+TGD',
'Poprad-Tatry': 'https://www.google.com/maps/search/Poprad+Tatry+Airport+TAT',
'Porto': 'https://www.google.com/maps/search/Porto+Airport+OPO',
'Poznan': 'https://www.google.com/maps/search/Poznan+Lawica+Airport+POZ',
'Prague': 'https://www.google.com/maps/search/Vaclav+Havel+Airport+Prague+PRG',
'Pristina': 'https://www.google.com/maps/search/Pristina+International+Airport+PRN',
'Radom': 'https://www.google.com/maps/search/Warsaw+Radom+Airport+RDO',
'Reykjavik': 'https://www.google.com/maps/search/Reykjavik+Airport+KEF',
'Rhodes': 'https://www.google.com/maps/search/Rhodes+International+Airport+RHO',
'Rijeka': 'https://www.google.com/maps/search/Rijeka+Airport+RJK',
'Rimini': 'https://www.google.com/maps/search/Federico+Fellini+International+Airport+RMI',
'Rome': 'https://www.google.com/maps/search/Rome+Fiumicino+Airport+FCO',
'Rome Fiumicino': 'https://www.google.com/maps/search/Rome+Fiumicino+Airport+FCO',
'Rzeszow': 'https://www.google.com/maps/search/Rzeszow+Jasionka+Airport+RZE',
'Rzeszów': 'https://www.google.com/maps/search/Rzesz%C3%B3w+Airport+RZE',
'Sandefjord': 'https://www.google.com/maps/search/Sandefjord+Airport+Torp+TRF',
'Santander': 'https://www.google.com/maps/search/Santander+Airport+SDR',
'Santorini': 'https://www.google.com/maps/search/Santorini+International+Airport+JTR',
'Sarajevo': 'https://www.google.com/maps/search/Sarajevo+International+Airport+SJJ',
'Satu Mare': 'https://www.google.com/maps/search/Satu+Mare+International+Airport+SUJ',
'Sevilla': 'https://www.google.com/maps/search/Seville+Airport+SVQ',
'Sharm El Sheikh': 'https://www.google.com/maps/search/Sharm+El+Sheikh+International+Airport+SSH',
'Sibiu': 'https://www.google.com/maps/search/Sibiu+International+Airport+SBZ',
'Skiathos': 'https://www.google.com/maps/search/Skiathos+International+Airport+JSI',
'Skopje': 'https://www.google.com/maps/search/Skopje+International+Airport+SKP',
'Sofia': 'https://www.google.com/maps/search/Sofia+Airport+SOF',
'Split': 'https://www.google.com/maps/search/Split+Airport+SPU',
'Stavanger': 'https://www.google.com/maps/search/Stavanger+Airport+Sola+SVG',
'Stockholm': 'https://www.google.com/maps/search/Stockholm+Skavsta+Airport+NYO',
'Stockholm Skavsta': 'https://www.google.com/maps/search/Stockholm+Skavsta+Airport+NYO',
'Stuttgart': 'https://www.google.com/maps/search/Stuttgart+Airport+STR',
'Suceava': 'https://www.google.com/maps/search/Suceava+Stefan+cel+Mare+International+Airport+SCV',
'Szczecin': 'https://www.google.com/maps/search/Szczecin+Goleniow+Airport+SZZ',
'Tallinn': 'https://www.google.com/maps/search/Tallinn+Airport+TLL',
'Targu Mures': 'https://www.google.com/maps/search/Targu+Mures+Transilvania+Airport+TGM',
'Tel Aviv': 'https://www.google.com/maps/search/Ben+Gurion+Airport+TLV',
'Tenerife': 'https://www.google.com/maps/search/Tenerife+South+Airport+TFS',
'Tenerife South': 'https://www.google.com/maps/search/Tenerife+South+Airport+TFS',
'Thessaloniki': 'https://www.google.com/maps/search/Thessaloniki+Airport+Makedonia+SKG',
'Timisoara': 'https://www.google.com/maps/search/Timisoara+Traian+Vuia+International+Airport+TSR',
'Tirana': 'https://www.google.com/maps/search/Tirana+International+Airport+TIA',
'Trieste': 'https://www.google.com/maps/search/Trieste+Airport+TRS',
'Tromsø': 'https://www.google.com/maps/search/Tromso+Airport+TOS',
'Trondheim': 'https://www.google.com/maps/search/Trondheim+Airport+TRD',
'Turin': 'https://www.google.com/maps/search/Turin+Airport+TRN',
'Turku': 'https://www.google.com/maps/search/Turku+Airport+TKU',
'Tuzla': 'https://www.google.com/maps/search/Tuzla+International+Airport+TZL',
'Târgu-Mures': 'https://www.google.com/maps/search/T%C3%A2rgu-Mures+Airport+TGM',
'Valencia': 'https://www.google.com/maps/search/Valencia+Airport+VLC',
'Varna': 'https://www.google.com/maps/search/Varna+Airport+VAR',
'Venice': 'https://www.google.com/maps/search/Venice+Marco+Polo+Airport+VCE',
'Verona': 'https://www.google.com/maps/search/Verona+Villafranca+Airport+VRN',
'Vienna': 'https://www.google.com/maps/search/Vienna+International+Airport+VIE',
'Vilnius': 'https://www.google.com/maps/search/Vilnius+International+Airport+VNO',
'Warsaw': 'https://www.google.com/maps/search/Warsaw+Chopin+Airport+WAW',
'Wroclaw': 'https://www.google.com/maps/search/Wroclaw+Copernicus+Airport+WRO',
'Yerevan': 'https://www.google.com/maps/search/Zvartnots+International+Airport+EVN',
'Zakynthos': 'https://www.google.com/maps/search/Zakynthos+International+Airport+ZTH',
'Zaragoza': 'https://www.google.com/maps/search/Zaragoza+Airport+ZAZ'
};

const airportFullNames = {
    'ABZ': 'アバディーン国際空港',
    'AES': 'オーレスン空港',
    'AGA': 'アガディール＝アルマシラ空港',
    'AGP': 'マラガ＝コスタ・デル・ソル空港',
    'AHO': 'アルゲーロ＝フェルティリア空港',
    'ALC': 'アリカンテ＝エルチェ空港',
    'AMM': 'クィーンアリア国際空港',
    'AOI': 'アンコーナ空港',
    'ATH': 'アテネ国際空港',
    'AUH': 'ザイード国際空港',
    'AYT': 'アンタルヤ空港',
    'BCM': 'バカウ空港',
    'BCN': 'バルセロナ＝エル・プラット空港',
    'BDS': 'ブリンディジ空港',
    'BEG': 'ベオグラード・ニコラ・テスラ空港',
    'BER': 'ベルリン・ブランデンブルク国際空港',
    'BGO': 'ベルゲン空港',
    'BGY': 'ミラノ・ベルガモ空港',
    'BHX': 'バーミンガム空港',
    'BIO': 'ビルバオ空港',
    'BLL': 'ビルン空港',
    'BLQ': 'ボローニャ空港',
    'BNX': 'バニャ・ルカ国際空港',
    'BOD': 'ボルドー＝メリニャック空港',
    'BOJ': 'ブルガス空港',
    'BRI': 'バーリ空港',
    'BSL': 'ユーロエアポート・バーゼル＝ミュールーズ空港',
    'BTS': 'ブラチスラバ空港',
    'BUD': 'ブダペスト・フェレンツ・リスト国際空港',
    'BVA': 'パリ・ボーヴェ空港',
    'CDT': 'カステリョン＝コスタ・アサール空港',
    'CFU': 'コルフ国際空港',
    'CGN': 'ケルン・ボン空港',
    'CHQ': 'ハニア国際空港',
    'CIY': 'コミゾ空港',
    'CLJ': 'クルージュ＝ナポカ国際空港',
    'CND': 'コンスタンツァ空港',
    'CPH': 'コペンハーゲン空港',
    'CRA': 'クラヨーヴァ空港',
    'CRL': 'ブリュッセル・サウス・シャルルロワ空港',
    'CTA': 'カターニア＝フォンターナロッサ空港',
    'DBV': 'ドゥブロヴニク空港',
    'DEB': 'デブレツェン国際空港',
    'DLM': 'ダラマン空港',
    'DTM': 'ドルトムント空港',
    'DXB': 'ドバイ国際空港',
    'EFL': 'ケファロニア空港',
    'EIN': 'アイントホーフェン空港',
    'ESB': 'エセンボーア国際空港',
    'EVN': 'ズヴァルトノッツ国際空港',
    'FAO': 'ファロ空港',
    'FCO': 'ローマ・フィウミチーノ空港',
    'FDH': 'フリードリヒスハーフェン空港',
    'FKB': 'カールスルーエ／バーデン＝バーデン空港',
    'FMM': 'メミンゲン空港',
    'FNC': 'マデイラ空港',
    'FRA': 'フランクフルト空港',
    'FUE': 'フエルテベントゥラ空港',
    'GDN': 'グダニスク空港',
    'GLA': 'グラスゴー空港',
    'GNB': 'グルノーブル空港',
    'GOA': 'ジェノバ空港',
    'GOT': 'ヨーテボリ・ランドヴェッテル空港',
    'GYD': 'ヘイダル・アリエフ国際空港',
    'HAM': 'ハンブルク空港',
    'HAU': 'ハウゲスン空港',
    'HER': 'ヘラクリオン国際空港',
    'HRG': 'ハルガダ国際空港',
    'IAS': 'ヤシ国際空港',
    'IBZ': 'イビサ空港',
    'INI': 'ニシュ・コンスタンティヌス大帝空港',
    'IST': 'イスタンブール空港',
    'JED': 'キング・アブドゥルアジーズ国際空港',
    'JMK': 'ミコノス空港',
    'JSI': 'スキアトス空港',
    'JTR': 'サントリーニ空港',
    'KEF': 'ケプラヴィーク国際空港',
    'KLX': 'カラマタ空港',
    'KRK': 'クラクフ空港',
    'KSC': 'コシツェ空港',
    'KTW': 'カトヴィツェ空港',
    'KUN': 'カウナス空港',
    'KUT': 'クタイシ空港',
    'LBA': 'リーズ・ブラッドフォード空港',
    'LCA': 'ラルナカ国際空港',
    'LGW': 'ロンドン・ガトウィック空港',
    'LHR': 'ロンドン・ヒースロー空港',
    'LIS': 'リスボン空港',
    'LJU': 'リュブリャナ空港',
    'LMP': 'ランペドゥーザ空港',
    'LPA': 'グラン・カナリア空港',
    'LPL': 'リバプール空港',
    'LTN': 'ロンドン・ルートン空港',
    'LUZ': 'ルブリン空港',
    'LWN': 'ギュムリ・シラク空港',
    'LYS': 'リヨン空港',
    'MAD': 'マドリード・バラハス空港',
    'MAH': 'メノルカ空港',
    'MED': 'メディナ空港',
    'MLA': 'マルタ国際空港',
    'MMX': 'マルメ空港',
    'MST': 'マーストリヒト・アーヘン空港',
    'MXP': 'ミラノ・マルペンサ空港',
    'NAP': 'ナポリ国際空港',
    'NCE': 'ニース・コートダジュール空港',
    'NUE': 'ニュルンベルク空港',
    'NYO': 'ストックホルム・スカブスタ空港',
    'OHD': 'オフリド空港',
    'OLB': 'オルビア空港',
    'OMR': 'オラデア国際空港',
    'OPO': 'ポルト空港',
    'OSL': 'オスロ・ガーデモエン空港',
    'OTP': 'ブカレスト・アンリ・コアンダ国際空港',
    'PDV': 'プロヴディフ空港',
    'PEG': 'ペルージャ空港',
    'PFO': 'パフォス国際空港',
    'PLQ': 'パランガ国際空港',
    'PMI': 'パルマ・デ・マヨルカ空港',
    'PMO': 'パレルモ空港',
    'POZ': 'ポズナン空港',
    'PRG': 'プラハ・ヴァーツラフ・ハヴェル空港',
    'PRN': 'プリシュティナ国際空港',
    'PSA': 'ピサ・ガリレオ・ガリレイ空港',
    'PSR': 'ペスカーラ空港',
    'RAK': 'マラケシュ・メナラ空港',
    'RDO': 'ワルシャワ・ラドム空港',
    'RHO': 'ロドス空港',
    'RJK': 'リエカ空港',
    'RMF': 'マルサアラム国際空港',
    'RMI': 'リミニ・フェデリコ・フェリーニ空港',
    'RMO': 'キシナウ国際空港',
    'RZE': 'ジェシュフ＝ヤションカ空港',
    'SBZ': 'シビウ国際空港',
    'SCV': 'スチャヴァ空港',
    'SDR': 'サンタンデール空港',
    'SJJ': 'サラエボ国際空港',
    'SKG': 'テッサロニキ空港',
    'SKP': 'スコピエ国際空港',
    'SOF': 'ソフィア空港',
    'SPU': 'スプリト空港',
    'SPX': 'スフィンクス国際空港',
    'SSH': 'シャルム・エル・シェイク国際空港',
    'STR': 'シュトゥットガルト空港',
    'SUF': 'ラメーツィア・テルメ空港',
    'SUJ': 'サトゥ・マーレ空港',
    'SVG': 'スタヴァンゲル空港',
    'SVQ': 'セビリア空港',
    'SZY': 'オルシュティン＝マズーリ空港',
    'SZZ': 'シュチェチン＝ゴレニュフ空港',
    'TAT': 'ポプラド＝タトリ空港',
    'TFS': 'テネリフェ・サウス空港',
    'TGD': 'ポドゴリツァ空港',
    'TGM': 'トゥルグ・ムレシュ空港',
    'TIA': 'ティラナ国際空港',
    'TKU': 'トゥルク空港',
    'TLL': 'タリン空港',
    'TLV': 'ベン・グリオン国際空港',
    'TOS': 'トロムソ空港',
    'TRD': 'トロンハイム空港',
    'TRF': 'サンデフヨルド空港トルプ',
    'TRN': 'トリノ空港',
    'TRS': 'トリエステ空港',
    'TSR': 'ティミショアラ空港',
    'TZL': 'トゥズラ国際空港',
    'VAR': 'ヴァルナ空港',
    'VCE': 'ヴェネツィア・マルコ・ポーロ空港',
    'VIE': 'ウィーン国際空港',
    'VLC': 'バレンシア空港',
    'VNO': 'ヴィリニュス国際空港',
    'VRN': 'ヴェローナ空港',
    'WAW': 'ワルシャワ・ショパン空港',
    'WRO': 'ヴロツワフ空港',
    'ZAZ': 'サラゴサ空港',
    'ZTH': 'ザキントス空港'
};

window.AIRPORT_DATA = {airportCodes, cityNames, countryMap, regionMap, rawFlightData, airportGoogleMap, airportFullNames };
})();
