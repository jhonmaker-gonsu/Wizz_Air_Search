(function () {
    const airportCodes = {
        'Aberdeen': 'ABZ',
        'Abu Dhabi': 'AUH',
        'Agadir': 'AGA',
        'Alesund': 'AES',
        'Alexandria': 'HBE',
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
        'Basel-Mulhouse': 'MLH',
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
        'Bucharest Baneasa': 'BBU',
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
        'Frankfurt': 'HHN',
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
        'Paris Orly': 'ORY',
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
        'Stockholm Arlanda': 'ARN',
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
        'Venice Treviso': 'TSF',
        'Verona': 'VRN',
        'Vienna': 'VIE',
        'Vilnius': 'VNO',
        'Warsaw': 'WAW',
        'Warsaw Modlin': 'WMI',
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
        'Alexandria': 'アレクサンドリア',
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
        'Basel-Mulhouse': 'バーゼル・ミュルーズ',
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
        'Bucharest Baneasa': 'ブカレスト・バネアサ',
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
        'Paris Orly': 'パリ・オルリー',
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
        'Stockholm Arlanda': 'ストックホルム・アーランダ',
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
        'Venice Treviso': 'ヴェネツィア・トレヴィーゾ',
        'Verona': 'ヴェローナ',
        'Vienna': 'ウィーン',
        'Vilnius': 'ヴィリニュス',
        'Warsaw': 'ワルシャワ',
        'Warsaw Modlin': 'ワルシャワ・モドリン',
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
        'Alexandria': 'エジプト',
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
        'Basel-Mulhouse': 'フランス',
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
        'Bucharest Baneasa': 'ルーマニア',
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
        'Paris Orly': 'フランス',
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
        'Stockholm Arlanda': 'スウェーデン',
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
        'Venice Treviso': 'イタリア',
        'Verona': 'イタリア',
        'Vienna': 'オーストリア',
        'Vilnius': 'リトアニア',
        'Warsaw': 'ポーランド',
        'Warsaw Modlin': 'ポーランド',
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
        'Alexandria': '中東',
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
        'Basel-Mulhouse': '西欧',
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
        'Bucharest Baneasa': '東欧',
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
        'Paris Orly': '西欧',
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
        'Stockholm Arlanda': '北欧',
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
        'Venice Treviso': '南欧',
        'Verona': '南欧',
        'Vienna': '東欧',
        'Vilnius': '北欧',
        'Warsaw': '東欧',
        'Warsaw Modlin': '東欧',
        'Wroclaw': '東欧',
        'Yerevan': '中東',
        'Zakynthos': '南欧',
        'Zaragoza': '南欧'
    };

    // シェンゲン協定圏内かどうか（true = 圏内、false = 圏外）
    const schengenMap = {
        'Aberdeen': false,          // イギリス
        'Abu Dhabi': false,         // UAE
        'Agadir': false,            // モロッコ
        'Alesund': true,            // ノルウェー（シェンゲン加盟）
        'Alexandria': false,        // エジプト
        'Alghero': true,            // イタリア
        'Alicante': true,           // スペイン
        'Amman': false,             // ヨルダン
        'Ancona': true,             // イタリア
        'Ankara': false,            // トルコ
        'Antalya': false,           // トルコ
        'Athens': true,             // ギリシャ
        'Bacau': true,              // ルーマニア（2024年加盟）
        'Baku': false,              // アゼルバイジャン
        'Banja Luka': false,        // ボスニア・ヘルツェゴビナ
        'Barcelona': true,          // スペイン
        'Bari': true,               // イタリア
        'Basel': true,              // スイス（シェンゲン加盟）
        'Basel-Mulhouse': true,     // フランス（シェンゲン加盟）
        'Belgrade': false,          // セルビア
        'Bergamo': true,            // イタリア
        'Bergen': true,             // ノルウェー
        'Berlin': true,             // ドイツ
        'Bilbao': true,             // スペイン
        'Billund': true,            // デンマーク
        'Birmingham': false,        // イギリス
        'Bologna': true,            // イタリア
        'Bordeaux': true,           // フランス
        'Brasov': true,             // ルーマニア
        'Bratislava': true,         // スロバキア
        'Brindisi': true,           // イタリア
        'Brussels Charleroi': true, // ベルギー
        'Bucharest': true,          // ルーマニア
        'Bucharest Baneasa': true,  // ルーマニア
        'Budapest': true,           // ハンガリー
        'Burgas': true,             // ブルガリア（2024年加盟）
        'Cairo (Sphinx)': false,    // エジプト
        'Castellon': true,          // スペイン
        'Catania': true,            // イタリア
        'Chania (Crete)': true,     // ギリシャ
        'Chisinau': false,          // モルドバ
        'Cluj-Napoca': true,        // ルーマニア
        'Cologne': true,            // ドイツ
        'Comiso': true,             // イタリア
        'Constanta': true,          // ルーマニア
        'Copenhagen': true,         // デンマーク
        'Corfu': true,              // ギリシャ
        'Craiova': true,            // ルーマニア
        'Dalaman': false,           // トルコ
        'Debrecen': true,           // ハンガリー
        'Dortmund': true,           // ドイツ
        'Dubai': false,             // UAE
        'Dubrovnik': true,          // クロアチア（2023年加盟）
        'Eindhoven': true,          // オランダ
        'Faro (Algarve)': true,     // ポルトガル
        'Frankfurt': true,          // ドイツ
        'Friedrichshafen': true,    // ドイツ
        'Fuerteventura': true,      // スペイン
        'Funchal (Madeira)': true,  // ポルトガル
        'Gdansk': true,             // ポーランド
        'Genoa': true,              // イタリア
        'Glasgow': false,           // イギリス
        'Gothenburg': true,         // スウェーデン
        'Gran Canaria': true,       // スペイン
        'Grenoble': true,           // フランス
        'Gyumri': false,            // アルメニア
        'Hamburg': true,            // ドイツ
        'Haugesund': true,          // ノルウェー
        'Heraklion (Crete)': true,  // ギリシャ
        'Hurghada': false,          // エジプト
        'Iasi': true,               // ルーマニア
        'Ibiza': true,              // スペイン
        'Istanbul': false,          // トルコ
        'Jeddah': false,            // サウジアラビア
        'Kalamata': true,           // ギリシャ
        'Karlsruhe/Baden-Baden': true, // ドイツ
        'Katowice': true,           // ポーランド
        'Kaunas': true,             // リトアニア
        'Kefalonia': true,          // ギリシャ
        'Košice': true,             // スロバキア
        'Krakow': true,             // ポーランド
        'Kutaisi': false,           // ジョージア
        'Lamezia Terme': true,      // イタリア
        'Lampedusa': true,          // イタリア
        'Larnaca': false,           // キプロス（EU加盟だがシェンゲン非加盟）
        'Leeds': false,             // イギリス
        'Lisbon': true,             // ポルトガル
        'Liverpool': false,         // イギリス
        'Ljubljana': true,          // スロベニア
        'London (LGW)': false,      // イギリス
        'London (LTN)': false,      // イギリス
        'Lublin': true,             // ポーランド
        'Lyon': true,               // フランス
        'Maastricht': true,         // オランダ
        'Madrid': true,             // スペイン
        'Malaga': true,             // スペイン
        'Mallorca': true,           // スペイン
        'Malmö': true,              // スウェーデン
        'Malta': false,             // マルタ（EU加盟だがシェンゲン非加盟）
        'Marrakech': false,         // モロッコ
        'Marsa Alam': false,        // エジプト
        'Medina': false,            // サウジアラビア
        'Memmingen': true,          // ドイツ
        'Menorca': true,            // スペイン
        'Milan': true,              // イタリア
        'Mykonos': true,            // ギリシャ
        'Naples': true,             // イタリア
        'Nice': true,               // フランス
        'Niš': false,               // セルビア
        'Nuremberg': true,          // ドイツ
        'Ohrid': false,             // 北マケドニア
        'Olbia': true,              // イタリア
        'Olsztyn-Mazury': true,     // ポーランド
        'Oradea': true,             // ルーマニア
        'Oslo': true,               // ノルウェー
        'Palanga': true,            // リトアニア
        'Palermo': true,            // イタリア
        'Paphos': false,            // キプロス
        'Paris': true,              // フランス
        'Paris Orly': true,         // フランス
        'Perugia': true,            // イタリア
        'Pescara': true,            // イタリア
        'Pisa': true,               // イタリア
        'Plovdiv': true,            // ブルガリア
        'Podgorica': false,         // モンテネグロ
        'Poprad-Tatry': true,       // スロバキア
        'Porto': true,              // ポルトガル
        'Poznan': true,             // ポーランド
        'Prague': true,             // チェコ
        'Pristina': false,          // コソボ
        'Radom': true,              // ポーランド
        'Reykjavik': true,          // アイスランド（シェンゲン加盟）
        'Rhodes': true,             // ギリシャ
        'Rijeka': true,             // クロアチア
        'Rimini': true,             // イタリア
        'Rome': true,               // イタリア
        'Rzeszów': true,            // ポーランド
        'Sandefjord': true,         // ノルウェー
        'Santander': true,          // スペイン
        'Santorini': true,          // ギリシャ
        'Sarajevo': false,          // ボスニア・ヘルツェゴビナ
        'Satu Mare': true,          // ルーマニア
        'Sevilla': true,            // スペイン
        'Sharm El Sheikh': false,   // エジプト
        'Sibiu': true,              // ルーマニア
        'Skiathos': true,           // ギリシャ
        'Skopje': false,            // 北マケドニア
        'Sofia': true,              // ブルガリア
        'Split': true,              // クロアチア
        'Stavanger': true,          // ノルウェー
        'Stockholm': true,          // スウェーデン
        'Stockholm Arlanda': true,  // スウェーデン
        'Stuttgart': true,          // ドイツ
        'Suceava': true,            // ルーマニア
        'Szczecin': true,           // ポーランド
        'Tallinn': true,            // エストニア
        'Tel Aviv': false,          // イスラエル
        'Tenerife': true,           // スペイン
        'Thessaloniki': true,       // ギリシャ
        'Timisoara': true,          // ルーマニア
        'Tirana': false,            // アルバニア
        'Trieste': true,            // イタリア
        'Tromsø': true,             // ノルウェー
        'Trondheim': true,          // ノルウェー
        'Turin': true,              // イタリア
        'Turku': true,              // フィンランド
        'Tuzla': false,             // ボスニア・ヘルツェゴビナ
        'Târgu-Mures': true,        // ルーマニア
        'Valencia': true,           // スペイン
        'Varna': true,              // ブルガリア
        'Venice': true,             // イタリア
        'Venice Treviso': true,     // イタリア
        'Verona': true,             // イタリア
        'Vienna': true,             // オーストリア
        'Vilnius': true,            // リトアニア
        'Warsaw': true,             // ポーランド
        'Warsaw Modlin': true,      // ポーランド
        'Wroclaw': true,            // ポーランド
        'Yerevan': false,           // アルメニア
        'Zakynthos': true,          // ギリシャ
        'Zaragoza': true            // スペイン
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
Alexandria - Rome
Alghero - Belgrade
Alghero - Bucharest
Alghero - Budapest
Alghero - Skopje
Alghero - Sofia
Alghero - Tirana
Alghero - Warsaw Modlin
Alicante - Belgrade
Alicante - Bratislava
Alicante - Bucharest
Alicante - Budapest
Alicante - Cluj-Napoca
Alicante - Gdansk
Alicante - Katowice
Alicante - London (LTN)
Alicante - Milan
Alicante - Rome
Alicante - Warsaw
Amman - Budapest
Amman - London (LTN)
Ancona - Tirana
Ankara - Budapest
Antalya - Bucharest
Antalya - Budapest
Antalya - Cluj-Napoca
Antalya - London (LGW)
Antalya - London (LTN)
Athens - Bratislava
Athens - Bucharest
Athens - Bucharest Baneasa
Athens - Budapest
Athens - Chisinau
Athens - Craiova
Athens - Gdansk
Athens - Katowice
Athens - Kutaisi
Athens - London (LTN)
Athens - Tel Aviv
Athens - Tirana
Athens - Venice
Athens - Warsaw Modlin
Bacau - London (LTN)
Bacau - Rome
Baku - Budapest
Baku - Rome
Banja Luka - Basel-Mulhouse
Banja Luka - Dortmund
Barcelona - Belgrade
Barcelona - Bratislava
Barcelona - Bucharest
Barcelona - Bucharest Baneasa
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
Barcelona - London (LTN)
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
Barcelona - Warsaw Modlin
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
Basel - Bratislava
Basel - Bucharest Baneasa
Basel - Budapest
Basel - Cluj-Napoca
Basel - Iasi
Basel - Krakow
Basel - Poznan
Basel - Sofia
Basel - Timisoara
Basel - Târgu-Mures
Basel - Warsaw
Basel - Warsaw Modlin
Basel - Wroclaw
Basel-Mulhouse - Banja Luka
Basel-Mulhouse - Belgrade
Basel-Mulhouse - Chisinau
Basel-Mulhouse - Niš
Basel-Mulhouse - Ohrid
Basel-Mulhouse - Podgorica
Basel-Mulhouse - Skopje
Basel-Mulhouse - Tirana
Basel-Mulhouse - Tuzla
Belgrade - Alghero
Belgrade - Alicante
Belgrade - Barcelona
Belgrade - Basel-Mulhouse
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
Belgrade - London (LTN)
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
Bergamo - Bucharest Baneasa
Bergamo - Chisinau
Bergamo - Cluj-Napoca
Bergamo - Craiova
Bergamo - Iasi
Bergamo - Oradea
Bergamo - Sibiu
Bergamo - Skopje
Bergamo - Sofia
Bergamo - Suceava
Bergamo - Timisoara
Bergamo - Tirana
Bergamo - Târgu-Mures
Bergamo - Varna
Bergamo - Warsaw
Bergamo - Warsaw Modlin
Bergen - Budapest
Bergen - Gdansk
Bergen - Krakow
Bergen - Szczecin
Bergen - Vilnius
Bergen - Warsaw Modlin
Berlin - Belgrade
Berlin - Bratislava
Berlin - Bucharest
Berlin - Budapest
Berlin - Chisinau
Berlin - Cluj-Napoca
Berlin - Kutaisi
Berlin - Skopje
Berlin - Timisoara
Berlin - Tirana
Berlin - Tuzla
Berlin - Varna
Bilbao - Budapest
Bilbao - Krakow
Bilbao - London (LTN)
Bilbao - Milan
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
Birmingham - Timisoara
Bologna - Bucharest
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
Bordeaux - London (LTN)
Bordeaux - Rome
Bordeaux - Venice
Brasov - Budapest
Brasov - Dortmund
Brasov - Katowice
Brasov - London (LTN)
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
Bratislava - Kutaisi
Bratislava - Lamezia Terme
Bratislava - Larnaca
Bratislava - London (LTN)
Bratislava - Malaga
Bratislava - Mykonos
Bratislava - Naples
Bratislava - Nice
Bratislava - Niš
Bratislava - Ohrid
Bratislava - Oslo
Bratislava - Palermo
Bratislava - Plovdiv
Bratislava - Podgorica
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
Brindisi - Warsaw Modlin
Brussels Charleroi - Bucharest
Brussels Charleroi - Bucharest Baneasa
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
Bucharest - Bergamo
Bucharest - Berlin
Bucharest - Billund
Bucharest - Birmingham
Bucharest - Bologna
Bucharest - Bordeaux
Bucharest - Bratislava
Bucharest - Brindisi
Bucharest - Brussels Charleroi
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
Bucharest - Gdansk
Bucharest - Gran Canaria
Bucharest - Hamburg
Bucharest - Heraklion (Crete)
Bucharest - Kefalonia
Bucharest - Larnaca
Bucharest - Leeds
Bucharest - Lisbon
Bucharest - Liverpool
Bucharest - London (LTN)
Bucharest - Lyon
Bucharest - Madrid
Bucharest - Malaga
Bucharest - Mallorca
Bucharest - Malta
Bucharest - Marrakech
Bucharest - Memmingen
Bucharest - Milan
Bucharest - Mykonos
Bucharest - Nice
Bucharest - Nuremberg
Bucharest - Paris
Bucharest - Paris Orly
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
Bucharest - Venice Treviso
Bucharest - Yerevan
Bucharest - Zakynthos
Bucharest - Zaragoza
Bucharest Baneasa - Athens
Bucharest Baneasa - Barcelona
Bucharest Baneasa - Basel
Bucharest Baneasa - Bergamo
Bucharest Baneasa - Brussels Charleroi
Bucharest Baneasa - Budapest
Bucharest Baneasa - Frankfurt
Bucharest Baneasa - Hamburg
Bucharest Baneasa - Krakow
Bucharest Baneasa - Memmingen
Bucharest Baneasa - Naples
Bucharest Baneasa - Nice
Bucharest Baneasa - Stockholm
Bucharest Baneasa - Turin
Bucharest Baneasa - Warsaw
Bucharest Baneasa - Wroclaw
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
Budapest - Bucharest Baneasa
Budapest - Burgas
Budapest - Cairo (Sphinx)
Budapest - Catania
Budapest - Chisinau
Budapest - Copenhagen
Budapest - Corfu
Budapest - Dortmund
Budapest - Dubai
Budapest - Dubrovnik
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
Budapest - London (LGW)
Budapest - London (LTN)
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
Budapest - Paris Orly
Budapest - Podgorica
Budapest - Reykjavik
Budapest - Rhodes
Budapest - Rimini
Budapest - Rome
Budapest - Santorini
Budapest - Sharm El Sheikh
Budapest - Skopje
Budapest - Sofia
Budapest - Stockholm Arlanda
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
Burgas - London (LTN)
Burgas - Lublin
Burgas - Warsaw
Cairo (Sphinx) - Budapest
Cairo (Sphinx) - London (LTN)
Cairo (Sphinx) - Milan
Cairo (Sphinx) - Rome
Castellon - Bucharest
Castellon - Cluj-Napoca
Catania - Bucharest
Catania - Budapest
Catania - Cluj-Napoca
Catania - Gdansk
Catania - Katowice
Catania - Memmingen
Catania - Podgorica
Catania - Prague
Catania - Sharm El Sheikh
Catania - Tel Aviv
Catania - Tirana
Catania - Vilnius
Catania - Warsaw
Catania - Wroclaw
Chania (Crete) - Belgrade
Chania (Crete) - London (LTN)
Chania (Crete) - Rome
Chania (Crete) - Warsaw
Chisinau - Athens
Chisinau - Barcelona
Chisinau - Bari
Chisinau - Basel-Mulhouse
Chisinau - Bergamo
Chisinau - Berlin
Chisinau - Billund
Chisinau - Bologna
Chisinau - Bratislava
Chisinau - Brussels Charleroi
Chisinau - Bucharest
Chisinau - Budapest
Chisinau - Cologne
Chisinau - Copenhagen
Chisinau - Dortmund
Chisinau - Frankfurt
Chisinau - Hamburg
Chisinau - Karlsruhe/Baden-Baden
Chisinau - Larnaca
Chisinau - London (LTN)
Chisinau - Memmingen
Chisinau - Milan
Chisinau - Naples
Chisinau - Nice
Chisinau - Nuremberg
Chisinau - Paris
Chisinau - Prague
Chisinau - Rhodes
Chisinau - Rimini
Chisinau - Rome
Chisinau - Sofia
Chisinau - Stuttgart
Chisinau - Turin
Chisinau - Venice
Chisinau - Verona
Chisinau - Warsaw Modlin
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
Cluj-Napoca - Dubrovnik
Cluj-Napoca - Eindhoven
Cluj-Napoca - Heraklion (Crete)
Cluj-Napoca - Larnaca
Cluj-Napoca - Leeds
Cluj-Napoca - Lisbon
Cluj-Napoca - London (LTN)
Cluj-Napoca - Madrid
Cluj-Napoca - Malaga
Cluj-Napoca - Mallorca
Cluj-Napoca - Malmö
Cluj-Napoca - Malta
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
Cluj-Napoca - Venice Treviso
Cluj-Napoca - Zakynthos
Cluj-Napoca - Zaragoza
Cologne - Bucharest
Cologne - Chisinau
Cologne - Podgorica
Cologne - Skopje
Cologne - Tirana
Cologne - Tuzla
Comiso - Tirana
Constanta - London (LTN)
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
Corfu - London (LTN)
Corfu - Milan
Corfu - Rome
Corfu - Sofia
Corfu - Warsaw
Craiova - Athens
Craiova - Barcelona
Craiova - Bari
Craiova - Bergamo
Craiova - Birmingham
Craiova - Bologna
Craiova - Brussels Charleroi
Craiova - Dortmund
Craiova - London (LTN)
Craiova - Madrid
Craiova - Memmingen
Craiova - Naples
Craiova - Paris
Craiova - Rome
Craiova - Venice
Dalaman - London (LGW)
Debrecen - Eindhoven
Debrecen - Larnaca
Debrecen - London (LTN)
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
Dortmund - London (LTN)
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
Dubrovnik - Budapest
Dubrovnik - Cluj-Napoca
Dubrovnik - Gdansk
Dubrovnik - Katowice
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
Faro (Algarve) - London (LGW)
Faro (Algarve) - London (LTN)
Faro (Algarve) - Warsaw
Frankfurt - Bucharest Baneasa
Frankfurt - Chisinau
Frankfurt - Kutaisi
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
Gdansk - London (LTN)
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
Gdansk - Stockholm Arlanda
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
Grenoble - London (LGW)
Grenoble - London (LTN)
Grenoble - Vilnius
Grenoble - Warsaw
Gyumri - Larnaca
Hamburg - Belgrade
Hamburg - Bucharest
Hamburg - Bucharest Baneasa
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
Heraklion (Crete) - Tel Aviv
Heraklion (Crete) - Warsaw
Hurghada - Budapest
Hurghada - London (LTN)
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
Iasi - London (LTN)
Iasi - Madrid
Iasi - Memmingen
Iasi - Milan
Iasi - Paris
Iasi - Pisa
Iasi - Prague
Iasi - Rome
Iasi - Tel Aviv
Iasi - Turin
Iasi - Valencia
Iasi - Venice Treviso
Ibiza - Rome
Istanbul - Budapest
Istanbul - Iasi
Istanbul - London (LGW)
Istanbul - London (LTN)
Jeddah - Budapest
Jeddah - London (LGW)
Jeddah - Milan
Jeddah - Rome
Jeddah - Vienna
Kalamata - Budapest
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
Katowice - Corfu
Katowice - Dortmund
Katowice - Dubrovnik
Katowice - Eindhoven
Katowice - Faro (Algarve)
Katowice - Fuerteventura
Katowice - Funchal (Madeira)
Katowice - Kutaisi
Katowice - Lamezia Terme
Katowice - Larnaca
Katowice - London (LTN)
Katowice - Maastricht
Katowice - Madrid
Katowice - Malaga
Katowice - Malta
Katowice - Naples
Katowice - Ohrid
Katowice - Podgorica
Katowice - Porto
Katowice - Reykjavik
Katowice - Rijeka
Katowice - Rimini
Katowice - Rome
Katowice - Split
Katowice - Tenerife
Katowice - Tirana
Katowice - Varna
Kaunas - London (LTN)
Kefalonia - Bucharest
Kefalonia - Budapest
Kefalonia - Rome
Košice - London (LTN)
Košice - Rome
Krakow - Abu Dhabi
Krakow - Barcelona
Krakow - Basel
Krakow - Bergen
Krakow - Bilbao
Krakow - Bucharest Baneasa
Krakow - Budapest
Krakow - Eindhoven
Krakow - Genoa
Krakow - Heraklion (Crete)
Krakow - Larnaca
Krakow - London (LGW)
Krakow - London (LTN)
Krakow - Lyon
Krakow - Malaga
Krakow - Milan
Krakow - Nice
Krakow - Oslo
Krakow - Rhodes
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
Kutaisi - Vilnius
Kutaisi - Warsaw
Kutaisi - Wroclaw
Lamezia Terme - Bratislava
Lamezia Terme - Budapest
Lamezia Terme - Katowice
Lamezia Terme - Sofia
Lamezia Terme - Warsaw
Larnaca - Abu Dhabi
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
Larnaca - London (LGW)
Larnaca - London (LTN)
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
Larnaca - Varna
Larnaca - Venice
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
London (LGW) - Antalya
London (LGW) - Budapest
London (LGW) - Dalaman
London (LGW) - Faro (Algarve)
London (LGW) - Grenoble
London (LGW) - Istanbul
London (LGW) - Jeddah
London (LGW) - Krakow
London (LGW) - Larnaca
London (LGW) - Lyon
London (LGW) - Malaga
London (LGW) - Marrakech
London (LGW) - Medina
London (LGW) - Podgorica
London (LGW) - Prague
London (LGW) - Santorini
London (LGW) - Sharm El Sheikh
London (LGW) - Tel Aviv
London (LGW) - Tirana
London (LGW) - Valencia
London (LGW) - Warsaw
London (LGW) - Wroclaw
London (LTN) - Alicante
London (LTN) - Amman
London (LTN) - Antalya
London (LTN) - Athens
London (LTN) - Bacau
London (LTN) - Barcelona
London (LTN) - Belgrade
London (LTN) - Bilbao
London (LTN) - Bordeaux
London (LTN) - Brasov
London (LTN) - Bratislava
London (LTN) - Bucharest
London (LTN) - Budapest
London (LTN) - Burgas
London (LTN) - Cairo (Sphinx)
London (LTN) - Chania (Crete)
London (LTN) - Chisinau
London (LTN) - Cluj-Napoca
London (LTN) - Constanta
London (LTN) - Corfu
London (LTN) - Craiova
London (LTN) - Debrecen
London (LTN) - Dortmund
London (LTN) - Faro (Algarve)
London (LTN) - Gdansk
London (LTN) - Grenoble
London (LTN) - Hurghada
London (LTN) - Iasi
London (LTN) - Istanbul
London (LTN) - Katowice
London (LTN) - Kaunas
London (LTN) - Košice
London (LTN) - Krakow
London (LTN) - Larnaca
London (LTN) - Lublin
London (LTN) - Lyon
London (LTN) - Madrid
London (LTN) - Mallorca
London (LTN) - Milan
London (LTN) - Mykonos
London (LTN) - Plovdiv
London (LTN) - Poprad-Tatry
London (LTN) - Poznan
London (LTN) - Prague
London (LTN) - Pristina
London (LTN) - Rhodes
London (LTN) - Rome
London (LTN) - Sarajevo
London (LTN) - Satu Mare
London (LTN) - Sevilla
London (LTN) - Sharm El Sheikh
London (LTN) - Sibiu
London (LTN) - Skopje
London (LTN) - Sofia
London (LTN) - Split
London (LTN) - Suceava
London (LTN) - Tallinn
London (LTN) - Tel Aviv
London (LTN) - Timisoara
London (LTN) - Tirana
London (LTN) - Tromsø
London (LTN) - Turin
London (LTN) - Târgu-Mures
London (LTN) - Valencia
London (LTN) - Varna
London (LTN) - Venice
London (LTN) - Vienna
London (LTN) - Vilnius
London (LTN) - Warsaw
London (LTN) - Wroclaw
London (LTN) - Yerevan
London (LTN) - Zakynthos
Lublin - Burgas
Lublin - London (LTN)
Lublin - Maastricht
Lublin - Rijeka
Lublin - Split
Lyon - Bucharest
Lyon - Krakow
Lyon - Kutaisi
Lyon - London (LGW)
Lyon - London (LTN)
Lyon - Skopje
Lyon - Sofia
Lyon - Tirana
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
Madrid - London (LTN)
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
Malaga - London (LGW)
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
Mallorca - London (LTN)
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
Malta - Cluj-Napoca
Malta - Katowice
Malta - Rome
Malta - Skopje
Malta - Tirana
Malta - Warsaw
Malta - Warsaw Modlin
Marrakech - Bucharest
Marrakech - Budapest
Marrakech - Cluj-Napoca
Marrakech - London (LGW)
Marrakech - Milan
Marrakech - Rome
Marrakech - Sofia
Marrakech - Warsaw
Marsa Alam - Milan
Marsa Alam - Rome
Medina - London (LGW)
Memmingen - Belgrade
Memmingen - Brasov
Memmingen - Bucharest
Memmingen - Bucharest Baneasa
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
Milan - Bilbao
Milan - Brasov
Milan - Bucharest
Milan - Budapest
Milan - Cairo (Sphinx)
Milan - Chisinau
Milan - Cluj-Napoca
Milan - Corfu
Milan - Gdansk
Milan - Glasgow
Milan - Heraklion (Crete)
Milan - Iasi
Milan - Jeddah
Milan - Krakow
Milan - Kutaisi
Milan - Larnaca
Milan - London (LTN)
Milan - Madrid
Milan - Malaga
Milan - Mallorca
Milan - Marrakech
Milan - Marsa Alam
Milan - Ohrid
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
Mykonos - London (LTN)
Mykonos - Rome
Naples - Brasov
Naples - Bratislava
Naples - Bucharest Baneasa
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
Nice - Bratislava
Nice - Bucharest
Nice - Bucharest Baneasa
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
Niš - Basel-Mulhouse
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
Ohrid - Basel-Mulhouse
Ohrid - Bratislava
Ohrid - Dortmund
Ohrid - Katowice
Ohrid - Memmingen
Ohrid - Milan
Ohrid - Vienna
Ohrid - Wroclaw
Olbia - Warsaw
Olsztyn-Mazury - Dortmund
Oradea - Bergamo
Oradea - Dortmund
Oradea - Rome
Oslo - Bratislava
Oslo - Gdansk
Oslo - Krakow
Oslo - Palanga
Oslo - Rome
Oslo - Szczecin
Palanga - Oslo
Palermo - Belgrade
Palermo - Bratislava
Palermo - Sharm El Sheikh
Palermo - Skopje
Palermo - Sofia
Palermo - Tel Aviv
Palermo - Warsaw Modlin
Paphos - Warsaw Modlin
Paphos - Yerevan
Paris - Belgrade
Paris - Bucharest
Paris - Chisinau
Paris - Cluj-Napoca
Paris - Craiova
Paris - Iasi
Paris - Kutaisi
Paris - Podgorica
Paris - Skopje
Paris - Sofia
Paris - Timisoara
Paris - Tirana
Paris - Tuzla
Paris - Târgu-Mures
Paris - Yerevan
Paris Orly - Bucharest
Paris Orly - Budapest
Paris Orly - Rome
Paris Orly - Warsaw
Perugia - Tirana
Pescara - Bucharest
Pescara - Tirana
Pisa - Belgrade
Pisa - Bucharest
Pisa - Iasi
Pisa - Tirana
Pisa - Warsaw
Plovdiv - Bratislava
Plovdiv - London (LTN)
Podgorica - Barcelona
Podgorica - Basel-Mulhouse
Podgorica - Bratislava
Podgorica - Budapest
Podgorica - Catania
Podgorica - Cologne
Podgorica - Dortmund
Podgorica - Gdansk
Podgorica - Hamburg
Podgorica - Karlsruhe/Baden-Baden
Podgorica - Katowice
Podgorica - Ljubljana
Podgorica - London (LGW)
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
Poprad-Tatry - London (LTN)
Porto - Bucharest
Porto - Katowice
Porto - Rome
Porto - Warsaw
Poznan - Basel
Poznan - Kutaisi
Poznan - London (LTN)
Poznan - Podgorica
Poznan - Tirana
Prague - Bucharest
Prague - Catania
Prague - Chisinau
Prague - Iasi
Prague - Kutaisi
Prague - Larnaca
Prague - London (LGW)
Prague - London (LTN)
Prague - Rome
Prague - Skopje
Prague - Sofia
Prague - Timisoara
Prague - Tirana
Prague - Yerevan
Pristina - Bratislava
Pristina - Dortmund
Pristina - London (LTN)
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
Rhodes - Chisinau
Rhodes - Krakow
Rhodes - London (LTN)
Rhodes - Rome
Rhodes - Sofia
Rhodes - Tel Aviv
Rhodes - Warsaw
Rhodes - Yerevan
Rijeka - Gdansk
Rijeka - Katowice
Rijeka - Lublin
Rimini - Budapest
Rimini - Chisinau
Rimini - Katowice
Rimini - Sofia
Rimini - Tirana
Rimini - Warsaw Modlin
Rome - Alexandria
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
Rome - Larnaca
Rome - Lisbon
Rome - London (LTN)
Rome - Madrid
Rome - Malaga
Rome - Mallorca
Rome - Malta
Rome - Marrakech
Rome - Marsa Alam
Rome - Menorca
Rome - Mykonos
Rome - Nice
Rome - Oradea
Rome - Oslo
Rome - Paris Orly
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
Santorini - London (LGW)
Santorini - Rome
Santorini - Warsaw
Sarajevo - London (LTN)
Sarajevo - Rome
Satu Mare - London (LTN)
Sevilla - Bucharest
Sevilla - London (LTN)
Sevilla - Milan
Sevilla - Rome
Sevilla - Warsaw
Sharm El Sheikh - Budapest
Sharm El Sheikh - Catania
Sharm El Sheikh - London (LGW)
Sharm El Sheikh - London (LTN)
Sharm El Sheikh - Milan
Sharm El Sheikh - Naples
Sharm El Sheikh - Palermo
Sharm El Sheikh - Rome
Sharm El Sheikh - Venice
Sibiu - Bergamo
Sibiu - Birmingham
Sibiu - Dortmund
Sibiu - Hamburg
Sibiu - Karlsruhe/Baden-Baden
Sibiu - London (LTN)
Sibiu - Madrid
Sibiu - Memmingen
Sibiu - Nuremberg
Sibiu - Rome
Skiathos - Milan
Skiathos - Rome
Skopje - Alghero
Skopje - Barcelona
Skopje - Bari
Skopje - Basel-Mulhouse
Skopje - Bergamo
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
Skopje - London (LTN)
Skopje - Lyon
Skopje - Madrid
Skopje - Malmö
Skopje - Malta
Skopje - Memmingen
Skopje - Milan
Skopje - Naples
Skopje - Nuremberg
Skopje - Palermo
Skopje - Paris
Skopje - Prague
Skopje - Rome
Skopje - Sandefjord
Skopje - Stockholm Arlanda
Skopje - Stuttgart
Skopje - Venice Treviso
Sofia - Abu Dhabi
Sofia - Alghero
Sofia - Barcelona
Sofia - Bari
Sofia - Basel
Sofia - Bergamo
Sofia - Brussels Charleroi
Sofia - Budapest
Sofia - Chisinau
Sofia - Corfu
Sofia - Dortmund
Sofia - Eindhoven
Sofia - Hamburg
Sofia - Krakow
Sofia - Lamezia Terme
Sofia - Larnaca
Sofia - London (LTN)
Sofia - Lyon
Sofia - Madrid
Sofia - Malaga
Sofia - Mallorca
Sofia - Marrakech
Sofia - Memmingen
Sofia - Naples
Sofia - Nice
Sofia - Palermo
Sofia - Paris
Sofia - Prague
Sofia - Rhodes
Sofia - Rimini
Sofia - Rome
Sofia - Santander
Sofia - Stuttgart
Sofia - Tel Aviv
Sofia - Turin
Sofia - Valencia
Sofia - Warsaw
Sofia - Warsaw Modlin
Split - Gdansk
Split - Katowice
Split - Krakow
Split - London (LTN)
Split - Lublin
Split - Warsaw
Split - Wroclaw
Stavanger - Gdansk
Stavanger - Krakow
Stockholm - Belgrade
Stockholm - Bucharest
Stockholm - Bucharest Baneasa
Stockholm - Cluj-Napoca
Stockholm - Warsaw
Stockholm Arlanda - Budapest
Stockholm Arlanda - Gdansk
Stockholm Arlanda - Skopje
Stockholm Arlanda - Tirana
Stuttgart - Bucharest
Stuttgart - Budapest
Stuttgart - Chisinau
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
Suceava - London (LTN)
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
Tallinn - London (LTN)
Tallinn - Rome
Tallinn - Tirana
Tallinn - Venice
Tallinn - Vilnius
Tallinn - Warsaw
Tel Aviv - Athens
Tel Aviv - Bratislava
Tel Aviv - Bucharest
Tel Aviv - Budapest
Tel Aviv - Catania
Tel Aviv - Cluj-Napoca
Tel Aviv - Debrecen
Tel Aviv - Heraklion (Crete)
Tel Aviv - Iasi
Tel Aviv - Krakow
Tel Aviv - Larnaca
Tel Aviv - London (LGW)
Tel Aviv - London (LTN)
Tel Aviv - Milan
Tel Aviv - Naples
Tel Aviv - Palermo
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
Timisoara - Berlin
Timisoara - Birmingham
Timisoara - Bologna
Timisoara - Brussels Charleroi
Timisoara - Dortmund
Timisoara - Frankfurt
Timisoara - Karlsruhe/Baden-Baden
Timisoara - Larnaca
Timisoara - London (LTN)
Timisoara - Madrid
Timisoara - Memmingen
Timisoara - Naples
Timisoara - Nuremberg
Timisoara - Paris
Timisoara - Prague
Timisoara - Rome
Timisoara - Valencia
Timisoara - Venice Treviso
Timisoara - Zakynthos
Tirana - Alghero
Tirana - Ancona
Tirana - Athens
Tirana - Barcelona
Tirana - Bari
Tirana - Basel-Mulhouse
Tirana - Bergamo
Tirana - Berlin
Tirana - Billund
Tirana - Bologna
Tirana - Bratislava
Tirana - Brussels Charleroi
Tirana - Budapest
Tirana - Catania
Tirana - Cologne
Tirana - Comiso
Tirana - Dortmund
Tirana - Eindhoven
Tirana - Frankfurt
Tirana - Gdansk
Tirana - Genoa
Tirana - Hamburg
Tirana - Karlsruhe/Baden-Baden
Tirana - Katowice
Tirana - Krakow
Tirana - Larnaca
Tirana - London (LGW)
Tirana - London (LTN)
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
Tirana - Stockholm Arlanda
Tirana - Stuttgart
Tirana - Tallinn
Tirana - Trieste
Tirana - Turin
Tirana - Valencia
Tirana - Venice Treviso
Tirana - Verona
Tirana - Vilnius
Tirana - Warsaw
Tirana - Wroclaw
Trieste - Tirana
Tromsø - Gdansk
Tromsø - London (LTN)
Trondheim - Gdansk
Turin - Bucharest
Turin - Bucharest Baneasa
Turin - Budapest
Turin - Chisinau
Turin - Iasi
Turin - London (LTN)
Turin - Sofia
Turin - Tirana
Turin - Warsaw
Turku - Bucharest
Turku - Gdansk
Turku - Vilnius
Tuzla - Basel-Mulhouse
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
Târgu-Mures - London (LTN)
Târgu-Mures - Memmingen
Târgu-Mures - Paris
Târgu-Mures - Rome
Valencia - Bucharest
Valencia - Budapest
Valencia - Cluj-Napoca
Valencia - Iasi
Valencia - Krakow
Valencia - London (LGW)
Valencia - London (LTN)
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
Varna - Katowice
Varna - Larnaca
Varna - London (LTN)
Varna - Memmingen
Varna - Nuremberg
Varna - Rome
Varna - Tel Aviv
Varna - Warsaw Modlin
Varna - Wroclaw
Venice - Athens
Venice - Barcelona
Venice - Bordeaux
Venice - Budapest
Venice - Chisinau
Venice - Craiova
Venice - Krakow
Venice - Kutaisi
Venice - Larnaca
Venice - London (LTN)
Venice - Madrid
Venice - Sharm El Sheikh
Venice - Suceava
Venice - Tallinn
Venice - Tel Aviv
Venice - Valencia
Venice - Warsaw
Venice - Yerevan
Venice Treviso - Bucharest
Venice Treviso - Cluj-Napoca
Venice Treviso - Iasi
Venice Treviso - Skopje
Venice Treviso - Timisoara
Venice Treviso - Tirana
Verona - Chisinau
Verona - Gdansk
Verona - Krakow
Verona - Tirana
Verona - Warsaw
Vienna - Barcelona
Vienna - Funchal (Madeira)
Vienna - Hurghada
Vienna - Jeddah
Vienna - London (LTN)
Vienna - Malaga
Vienna - Ohrid
Vienna - Pristina
Vienna - Suceava
Vienna - Tel Aviv
Vienna - Tenerife
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
Vilnius - London (LTN)
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
Warsaw - Alicante
Warsaw - Barcelona
Warsaw - Bari
Warsaw - Basel
Warsaw - Bergamo
Warsaw - Bilbao
Warsaw - Bologna
Warsaw - Brasov
Warsaw - Bratislava
Warsaw - Brussels Charleroi
Warsaw - Bucharest Baneasa
Warsaw - Budapest
Warsaw - Burgas
Warsaw - Catania
Warsaw - Chania (Crete)
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
Warsaw - London (LGW)
Warsaw - London (LTN)
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
Warsaw - Paris Orly
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
Warsaw Modlin - Alghero
Warsaw Modlin - Athens
Warsaw Modlin - Barcelona
Warsaw Modlin - Basel
Warsaw Modlin - Bergamo
Warsaw Modlin - Bergen
Warsaw Modlin - Brindisi
Warsaw Modlin - Chisinau
Warsaw Modlin - Malta
Warsaw Modlin - Palermo
Warsaw Modlin - Paphos
Warsaw Modlin - Rimini
Warsaw Modlin - Sofia
Warsaw Modlin - Varna
Wroclaw - Barcelona
Wroclaw - Bari
Wroclaw - Basel
Wroclaw - Bucharest Baneasa
Wroclaw - Budapest
Wroclaw - Catania
Wroclaw - Chisinau
Wroclaw - Dortmund
Wroclaw - Eindhoven
Wroclaw - Gran Canaria
Wroclaw - Kutaisi
Wroclaw - Larnaca
Wroclaw - London (LGW)
Wroclaw - London (LTN)
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
Yerevan - London (LTN)
Yerevan - Memmingen
Yerevan - Milan
Yerevan - Naples
Yerevan - Paphos
Yerevan - Paris
Yerevan - Prague
Yerevan - Rhodes
Yerevan - Rome
Yerevan - Venice
Zakynthos - Bucharest
Zakynthos - Budapest
Zakynthos - Cluj-Napoca
Zakynthos - London (LTN)
Zakynthos - Milan
Zakynthos - Rome
Zakynthos - Timisoara
Zakynthos - Warsaw
Zaragoza - Bucharest
Zaragoza - Cluj-Napoca
Zaragoza - Rome`

    const airportGoogleMap = {
        'Aberdeen': 'https://www.google.com/maps/search/Aberdeen+International+Airport+ABZ',
        'Abu Dhabi': 'https://www.google.com/maps/search/Zayed+International+Airport+AUH',
        'Agadir': 'https://www.google.com/maps/search/Agadir+Al+Massira+Airport+AGA',
        'Alesund': 'https://www.google.com/maps/search/Alesund+Airport+AES',
        'Alexandria': 'https://www.google.com/maps/search/Borg+El+Arab+Airport+HBE',
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
        'Basel-Mulhouse': 'https://www.google.com/maps/search/EuroAirport+Basel+Mulhouse+Freiburg+MLH',
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
        'Bucharest Baneasa': 'https://www.google.com/maps/search/Baneasa+Aurel+Vlaicu+International+Airport+BBU',
        'Budapest': 'https://www.google.com/maps/search/Budapest+Ferenc+Liszt+International+Airport+BUD',
        'Burgas': 'https://www.google.com/maps/search/Burgas+Airport+BOJ',
        'Cairo (Sphinx)': 'https://www.google.com/maps/search/Sphinx+International+Airport+SPX',
        'Cairo Sphinx': 'https://www.google.com/maps/search/Sphinx+International+Airport+SPX',
        'Castellon': 'https://www.google.com/maps/search/Castellon+Airport+CDT',
        'Catania': 'https://www.google.com/maps/search/Catania+Fontanarossa+Airport+CTA',
        'Chania': 'https://www.google.com/maps/search/Chania+International+Airport+CHQ',
        'Chania (Crete)': 'https://www.google.com/maps/search/Chania+%28Crete%29+Airport+CHQ',
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
        'Faro (Algarve)': 'https://www.google.com/maps/search/Faro+%28Algarve%29+Airport+FAO',
        'Frankfurt': 'https://www.google.com/maps/place/%E3%83%95%E3%83%A9%E3%83%B3%E3%82%AF%E3%83%95%E3%83%AB%E3%83%88%EF%BC%9D%E3%83%8F%E3%83%BC%E3%83%B3%E7%A9%BA%E6%B8%AF/data=!4m2!3m1!1s0x0:0x3db29c6e96461c58?sa=X&ved=1t:2428&ictx=111',
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
        'Heraklion (Crete)': 'https://www.google.com/maps/search/Heraklion+%28Crete%29+Airport+HER',
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
        'Niš': 'https://www.google.com/maps/search/Ni%C5%A1+Airport+INI',
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
        'Paris Orly': 'https://www.google.com/maps/search/Paris+Orly+Airport+ORY',
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
        'Stockholm Arlanda': 'https://www.google.com/maps/search/Stockholm+Arlanda+Airport+ARN',
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
        'Venice Treviso': 'https://www.google.com/maps/search/Treviso+Antonio+Canova+Airport+TSF',
        'Verona': 'https://www.google.com/maps/search/Verona+Villafranca+Airport+VRN',
        'Vienna': 'https://www.google.com/maps/search/Vienna+International+Airport+VIE',
        'Vilnius': 'https://www.google.com/maps/search/Vilnius+International+Airport+VNO',
        'Warsaw': 'https://www.google.com/maps/search/Warsaw+Chopin+Airport+WAW',
        'Warsaw Modlin': 'https://www.google.com/maps/search/Warsaw+Modlin+Airport+WMI',
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
        'ARN': 'ストックホルム・アーランダ空港',
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
        'BBU': 'ブカレスト・バネアサ空港',
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
        'HHN': 'フランクフルト＝ハーン空港',
        'FUE': 'フエルテベントゥラ空港',
        'GDN': 'グダニスク空港',
        'GLA': 'グラスゴー空港',
        'GNB': 'グルノーブル空港',
        'GOA': 'ジェノバ空港',
        'GOT': 'ヨーテボリ・ランドヴェッテル空港',
        'GYD': 'ヘイダル・アリエフ国際空港',
        'HAM': 'ハンブルク空港',
        'HAU': 'ハウゲスン空港',
        'HBE': 'アレクサンドリア・ボルグ・エル・アラブ空港',
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
        'MLH': 'ユーロエアポート・バーゼル＝ミュールーズ空港',
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
        'ORY': 'パリ・オルリー空港',
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
        'TSF': 'トレヴィーゾ・アントニオ・カノーヴァ空港',
        'TSR': 'ティミショアラ空港',
        'TZL': 'トゥズラ国際空港',
        'VAR': 'ヴァルナ空港',
        'VCE': 'ヴェネツィア・マルコ・ポーロ空港',
        'VIE': 'ウィーン国際空港',
        'VLC': 'バレンシア空港',
        'VNO': 'ヴィリニュス国際空港',
        'VRN': 'ヴェローナ空港',
        'WAW': 'ワルシャワ・ショパン空港',
        'WMI': 'ワルシャワ・モドリン空港',
        'WRO': 'ヴロツワフ空港',
        'ZAZ': 'サラゴサ空港',
        'ZTH': 'ザキントス空港'
    };

    const loungeData = {
        'Aberdeen': 'https://www.prioritypass.com/ja/lounges/united-kingdom/aberdeen-international', // アバディーン国際空港(Aberdeen International)
        'Abu Dhabi': 'https://www.prioritypass.com/ja/lounges/united-arab-emirates/abu-dhabi-international', // アブダビ国際空港(Abu Dhabi Intl)
        'Agadir': 'https://www.prioritypass.com/ja/lounges/morocco/agadir-al-massira-intl', // アガディール・アル・マシーラ国際空港(Agadir Al Massira Intl)
        'Alexandria': 'https://www.prioritypass.com/ja/lounges/egypt/borg-el-arab-international', // アレクサンドリア・ボルグ・エル・アラブ空港(Borg El Arab International)
        'Alicante': 'https://www.prioritypass.com/ja/lounges/spain/alicante-airport', // アリカンテ空港(Alicante)
        'Amman': 'https://www.prioritypass.com/ja/lounges/jordan/amman-queen-alia-international', // アンマン・クィーンアリア国際空港(Amman Queen Alia International)
        'Ankara': 'https://www.prioritypass.com/ja/lounges/turkey/ankara-esenboga', // アンカラ・エセンボーア空港(Ankara Esenboga)
        'Antalya': 'https://www.prioritypass.com/ja/lounges/turkey/antalya-international', // アンタルヤ国際空港(Antalya International)
        'Athens': 'https://www.prioritypass.com/ja/lounges/greece/athens-international', // アテネ国際空港(Athens International)
        'Baku': 'https://www.prioritypass.com/ja/lounges/azerbaijan/baku-heydar-aliyev-intl', // バクー・ヘイダル・アリエフ国際空港(Baku Heydar Aliyev Intl)
        'Barcelona': 'https://www.prioritypass.com/ja/lounges/spain/barcelona-el-prat', // バルセロナ・エル・プラット国際空港(Barcelona El Prat)
        'Bari': 'https://www.prioritypass.com/ja/lounges/italy/bari-palese', // バーリ・パレーゼ空港(Bari Palese)
        'Basel': 'https://www.prioritypass.com/ja/lounges/switzerland/basel-mulhouse-euroairport', // ユーロエアポート・バーゼル＝ミュールーズ空港(Basel-Mulhouse-Freiburg EuroAirport)
        'Basel-Mulhouse': 'https://www.prioritypass.com/ja/lounges/switzerland/basel-mulhouse-euroairport', // ユーロエアポート・バーゼル＝ミュールーズ空港(Basel-Mulhouse-Freiburg EuroAirport)
        'Belgrade': 'https://www.prioritypass.com/ja/lounges/serbia/belgrade-nikola-tesla', // ベオグラード・ニコラ・テスラ空港(Belgrade Nikola Tesla)
        'Bergamo': 'https://www.prioritypass.com/ja/lounges/italy/milan-bergamo-orio-al-serio', // ミラノ・ベルガモ・オーリオ・アル・セーリオ(Milan Bergamo Orio Al Serio)
        'Bergen': 'https://www.prioritypass.com/ja/lounges/norway/bergen-flesland', // ベルゲン空港(Bergen Flesland)
        'Berlin': 'https://www.prioritypass.com/ja/lounges/germany/berlin-brandenburg-international', // ベルリン・ブランデンブルク国際空港(Berlin Brandenburg International)
        'Bilbao': 'https://www.prioritypass.com/ja/lounges/spain/bilbao-airport', // ビルバオ空港(Bilbao)
        'Billund': 'https://www.prioritypass.com/ja/lounges/denmark/billund-airport', // ビルン空港(Billund)
        'Birmingham': 'https://www.prioritypass.com/ja/lounges/united-kingdom/birmingham-airport', // バーミンガム空港(Birmingham)
        'Bologna': 'https://www.prioritypass.com/ja/lounges/italy/bologna-g-marconi', // ボローニャ・マルコーニ空港(Bologna G. Marconi)
        'Bordeaux': 'https://www.prioritypass.com/ja/lounges/france/bordeaux-merignac', // ボルドー・メリニャック空港(Bordeaux Merignac)
        'Bratislava': 'https://www.prioritypass.com/ja/lounges/slovak-republic/bratislava-letisko-mr-stefanik', // ブラチスラバ・ミラン・ラスチスラウ・シュテファーニク(Bratislava M.R. Stefanik)
        'Bucharest': 'https://www.prioritypass.com/ja/lounges/romania/bucharest-henri-coanda-intl', // ブカレスト・アンリ・コアンダ国際空港(Bucharest Henri Coanda Intl)
        'Budapest': 'https://www.prioritypass.com/ja/lounges/hungary/budapest-liszt-ferenc-intl', // ブダペスト・リスト・フェレンツ国際空港(Budapest Liszt Ferenc Intl)
        'Burgas': 'https://www.prioritypass.com/ja/lounges/bulgaria/burgas-airport', // ブルガス空港(Burgas)
        'Catania': 'https://www.prioritypass.com/ja/lounges/italy/catania-fontanarossa', // カターニア・フォンターナロッサ空港(Catania Fontanarossa)
        'Chisinau': 'https://www.prioritypass.com/ja/lounges/moldova/chisinau-international', // キシナウ国際空港(Chisinau International)
        'Cluj-Napoca': 'https://www.prioritypass.com/ja/lounges/romania/cluj-napoca-international', // クルジュ＝ナポカ国際空港(Cluj-Napoca International)
        'Cologne': 'https://www.prioritypass.com/ja/lounges/germany/colognebonn-international', // ケルン・ボン国際空港(Cologne/Bonn International)
        'Copenhagen': 'https://www.prioritypass.com/ja/lounges/denmark/copenhagen-airport', // コペンハーゲン・カストラップ空港(Copenhagen Kastrup)
        'Corfu': 'https://www.prioritypass.com/ja/lounges/greece/corfu-ioannis-kapodistrias-intl', // コルフ・イオアニス・カポディストリアス国際空港(Corfu Ioannis Kapodistrias Intl)
        'Dalaman': 'https://www.prioritypass.com/ja/lounges/turkey/dalaman-airport', // ダラマン空港(Dalaman)
        'Dubai': 'https://www.prioritypass.com/ja/lounges/united-arab-emirates/al-maktoum-international', // ドバイ・アール・マクトゥーム国際空港(Dubai Al Maktoum Intl)
        'Dubrovnik': 'https://www.prioritypass.com/ja/lounges/croatia/dubrovnik-cilipi-konavle', // ドゥブロヴニク・ルジェル・ボシュコヴィッチ空港(Dubrovnik Ruder Boskovic)
        'Faro (Algarve)': 'https://www.prioritypass.com/ja/lounges/portugal/faro-international', // ファロ国際空港(Faro International)
        'Frankfurt': 'https://www.prioritypass.com/ja/lounges/germany/frankfurt-main', // フランクフルト・アム・マイン(Frankfurt Main)
        'Fuerteventura': 'https://www.prioritypass.com/ja/lounges/spain/fuerteventura-airport', // フエルテベントゥラ島(Fuerteventura)
        'Gdansk': 'https://www.prioritypass.com/ja/lounges/poland/gdansk-lech-walesa', // グダニスク・レフ・ワレサ空港(Gdansk Lech Walesa)
        'Glasgow': 'https://www.prioritypass.com/ja/lounges/united-kingdom/glasgow-international', // グラスゴー国際空港(Glasgow International)
        'Gothenburg': 'https://www.prioritypass.com/ja/lounges/sweden/gothenburg-landvetter', // ヨーテボリ・ランドヴェッテル(Gothenburg Landvetter)
        'Gran Canaria': 'https://www.prioritypass.com/ja/lounges/spain/gran-canaria-las-palmas', // グランカナリア(ラスパルマス)空港(Gran Canaria Las Palmas)
        'Hamburg': 'https://www.prioritypass.com/ja/lounges/germany/hamburg-fuhlsbuttel', // ハンブルク空港(Hamburg Fuhlsbuettel)
        'Heraklion (Crete)': 'https://www.prioritypass.com/ja/lounges/greece/heraklion-kazantzakis-intl', // イラクリオン・カザンザキス国際空港(Heraklion Kazantzakis Intl)
        'Hurghada': 'https://www.prioritypass.com/ja/lounges/egypt/hurghada-intl', // フルガダ国際空港(Hurghada Intl)
        'Ibiza': 'https://www.prioritypass.com/ja/lounges/spain/ibiza-airport', // イビサ空港(Ibiza)
        'Istanbul': 'https://www.prioritypass.com/ja/lounges/turkey/istanbul-airport', // イスタンブール(Istanbul)
        'Jeddah': 'https://www.prioritypass.com/ja/lounges/saudi-arabia/jeddah-king-a-aziz-intl', // ジェッダ・キング・アブドゥルアズィーズ国際空港(Jeddah King A Aziz Intl)
        'Katowice': 'https://www.prioritypass.com/ja/lounges/poland/katowice-pyrzowice-intl', // カトヴィツェ国際空港(Katowice Pyrzowice Intl)
        'Košice': 'https://www.prioritypass.com/ja/lounges/slovak-republic/kosice-international', // コシツェ国際空港(Kosice International)
        'Krakow': 'https://www.prioritypass.com/ja/lounges/poland/krakow-john-paul-ii-balice', // ヨハネパウロ2世・クラクフ・バリツェ国際空港(Krakow John Paul II) - バリツェ(Balice)
        'Larnaca': 'https://www.prioritypass.com/ja/lounges/cyprus/larnaca-international', // ラルナカ国際空港(Larnaca International)
        'Leeds': 'https://www.prioritypass.com/ja/lounges/united-kingdom/leeds-bradford-international', // リーズ・ブラッドフォード国際空港(Leeds Bradford International)
        'Lisbon': 'https://www.prioritypass.com/ja/lounges/portugal/lisbon-international', // リスボン国際空港(Lisbon International)
        'Liverpool': 'https://www.prioritypass.com/ja/lounges/united-kingdom/liverpool-john-lennon', // リバプール・ジョン・レノン(Liverpool John Lennon)
        'Ljubljana': 'https://www.prioritypass.com/ja/lounges/slovenia/ljubljana', // リュブリャナ空港(Ljubljana)
        'London (LGW)': 'https://www.prioritypass.com/ja/lounges/united-kingdom/london-gatwick', // ロンドン・ガトウィック(London Gatwick)
        'London (LTN)': 'https://www.prioritypass.com/ja/lounges/united-kingdom/london-luton', // ロンドン・ルートン空港(London Luton)
        'Lublin': 'https://www.prioritypass.com/ja/lounges/poland/lublin-swidnik-airport', // ルブリン・シフィドニク(Lubin Swidnik)
        'Lyon': 'https://www.prioritypass.com/ja/lounges/france/lyon-st-exupery', // リヨン・サン＝テグジュペリ国際空港(Lyon St Exupéry)
        'Madrid': 'https://www.prioritypass.com/ja/lounges/spain/madrid-barajas', // マドリード・アドルフォ・スアレス・バラハス空港(Madrid Adolfo Suarez-Barajas)
        'Malaga': 'https://www.prioritypass.com/ja/lounges/spain/malaga-airport', // マラガ空港(Malaga)
        'Mallorca': 'https://www.prioritypass.com/ja/lounges/spain/palma-de-mallorca-airport', // パルマ・デ・マヨルカ(Palma de Mallorca)
        'Malta': 'https://www.prioritypass.com/ja/lounges/malta/malta-international', // マルタ国際空港(Malta International)
        'Marsa Alam': 'https://www.prioritypass.com/ja/lounges/egypt/marsa-alam-intl', // マルサ・アラム国際空港(Marsa Alam Intl)
        'Menorca': 'https://www.prioritypass.com/ja/lounges/spain/menorca-airport', // メノルカ島(Menorca)
        'Milan': 'https://www.prioritypass.com/ja/lounges/italy/milan-malpensa', // ミラノ・マルペンサ空港(Milan Malpensa)
        'Mykonos': 'https://www.prioritypass.com/ja/lounges/greece/mykonos', // ミコノス島空港(Mykonos)
        'Naples': 'https://www.prioritypass.com/ja/lounges/italy/naples-capodichino', // ナポリ・カポディキーノ国際空港(Naples Capodichino)
        'Nice': 'https://www.prioritypass.com/ja/lounges/france/nice-cote-d-azur', // ニース・コート・ダジュール空港(Nice Cote d Azur)
        'Nuremberg': 'https://www.prioritypass.com/ja/lounges/germany/nuremberg-airport', // ニュルンベルグ空港(Nuremberg)
        'Ohrid': 'https://www.prioritypass.com/ja/lounges/macedonia/ohrid-st-paul-the-apostle', // オフリド・セント・ポール・ザ・アポストール空港(Ohrid St. Paul the Apostle)
        'Oslo': 'https://www.prioritypass.com/ja/lounges/norway/oslo-gardermoen', // オスロ・ガーデモエン空港(Oslo Gardermoen)
        'Palermo': 'https://www.prioritypass.com/ja/lounges/italy/palermo-falcone-borsellino', // パレルモ・ファルコーネ ボルセリーノ空港(Palermo Falcone Borsellino)
        'Paphos': 'https://www.prioritypass.com/ja/lounges/cyprus/paphos-international', // パフォス国際空港(Paphos International)
        'Paris': 'https://www.prioritypass.com/ja/lounges/france/paris-cdg', // パリ＝シャルル・ド・ゴール空港(Paris Charles de Gaulle)
        'Paris Orly': 'https://www.prioritypass.com/ja/lounges/france/orly', // パリ・オルリー空港(Paris Orly)
        'Pisa': 'https://www.prioritypass.com/ja/lounges/italy/pisa-galileo-galilei-intl', // ピサ・ガリレオ・ガリレイ国際空港(Pisa Galileo Galilei Intl)
        'Porto': 'https://www.prioritypass.com/ja/lounges/portugal/porto-francisco-scarneiro-int', // ポルト・フランシスコ・サ・カルネイロ国際空港(Porto Francisco S.Carneiro Int)
        'Poznan': 'https://www.prioritypass.com/ja/lounges/poland/poznan-lawica', // ポズナン・ワヴィツァ空港(Poznan Lawica)
        'Prague': 'https://www.prioritypass.com/ja/lounges/czech-republic/prague-vaclav-havel', // プラハ・ヴァーツラフ・ハヴェル国際空港(Prague Vaclav Havel)
        'Reykjavik': 'https://www.prioritypass.com/ja/lounges/iceland/reykjavik-keflavik-international', // レイキャビク・ケプラヴィーク国際空港(Reykjavik Keflavik International)
        'Rhodes': 'https://www.prioritypass.com/ja/lounges/greece/rhodes-diagoras-international', // ロドス・ディアゴラス国際空港(Rhodes Diagoras International)
        'Rome': 'https://www.prioritypass.com/ja/lounges/italy/rome-fiumicino', // ローマ・フィウミチーノ(Rome Fiumicino)
        'Rzeszów': 'https://www.prioritypass.com/ja/lounges/poland/rzeszow-jasionka', // ジェシュフ (Rzeszow) - Jasionka
        'Sarajevo': 'https://www.prioritypass.com/ja/lounges/bosnia-herzegovina/sarajevo-international', // サラエボ国際空港(Sarajevo International)
        'Sevilla': 'https://www.prioritypass.com/ja/lounges/spain/seville-san-pablo', // セビリア国際空港(Sevilla International)
        'Sharm El Sheikh': 'https://www.prioritypass.com/ja/lounges/egypt/sharm-el--sheikh-intl', // シャルム・エル・シェイク国際空港(Sharm el- Sheikh Intl)
        'Skopje': 'https://www.prioritypass.com/ja/lounges/macedonia/skopje-alexander-the-great', // スコピエ国際線ラウンジ
        'Sofia': 'https://www.prioritypass.com/ja/lounges/bulgaria/sofia-airport', // ソフィア空港(Sofia)
        'Stavanger': 'https://www.prioritypass.com/ja/lounges/norway/stavanger-sola', // スタバンゲル空港(Stavanger Sola)
        'Stockholm': 'https://www.prioritypass.com/ja/lounges/sweden/stockholm-arlanda', // ストックホルム・アーランダ(Stockholm Arlanda)
        'Stockholm Arlanda': 'https://www.prioritypass.com/ja/lounges/sweden/stockholm-arlanda', // ストックホルム・アーランダ空港(Stockholm Arlanda)
        'Tallinn': 'https://www.prioritypass.com/ja/lounges/estonia/tallinn-airport', // タリン・レナルトメリ空港(Tallinn Lennart Meri)
        'Tenerife': 'https://www.prioritypass.com/ja/lounges/spain/tenerife-south-reina-sofia', // テネリフェ・スール・レイナ・ソフィア国際空港(Tenerife South Reina Sofia)
        'Thessaloniki': 'https://www.prioritypass.com/ja/lounges/greece/thessaloniki', // テッサロニキ・マケドニア国際空港(Thessaloniki Makedonia)
        'Timisoara': 'https://www.prioritypass.com/ja/lounges/romania/timisoara-intl', // ティミショアラ国際空港(Timisoara Intl)
        'Tirana': 'https://www.prioritypass.com/ja/lounges/albania/tirana-nene-tereza-intl', // ティラナ・マザー・テレサ国際空港(Tirana Nene Tereza Intl)
        'Trieste': 'https://www.prioritypass.com/ja/lounges/italy/trieste-friuli-venezia-giulia', // トリエステ・フリウリ＝ヴェネツィア・ジュリア空港(Trieste Friuli Venezia Giulia)
        'Turin': 'https://www.prioritypass.com/ja/lounges/italy/turin-sandro-pertini', // トリノ・サンドロ・ペルティーニ国際空港(Turin Sandro Pertini)
        'Valencia': 'https://www.prioritypass.com/ja/lounges/spain/valencia-airport', // バレンシア空港(Valencia)
        'Varna': 'https://www.prioritypass.com/ja/lounges/bulgaria/varna-airport', // ヴァルナ空港(Varna)
        'Venice': 'https://www.prioritypass.com/ja/lounges/italy/venice-marco-polo', // ヴェネツィア・マルコ・ポーロ国際空港(Venice Marco Polo)
        'Vienna': 'https://www.prioritypass.com/ja/lounges/austria/vienna-schwechat', // ウィーン・シュヴェヒャート(Vienna Schwechat)
        'Vilnius': 'https://www.prioritypass.com/ja/lounges/lithuania/vilnius-intl', // ヴィリニュス国際空港(Vilnius International)
        'Warsaw': 'https://www.prioritypass.com/ja/lounges/poland/warsaw-frederic-chopin', // ワルシャワ・フレデリック・ショパン空港(Warsaw Frederic Chopin)
        'Warsaw Modlin': 'https://www.prioritypass.com/ja/lounges/poland/warsaw-modlin', // ワルシャワ・モドリン空港(Warsaw Modlin)
        'Wroclaw': 'https://www.prioritypass.com/ja/lounges/poland/wroclaw-nicolaus-copernicus', // ブロツラフ・コペルニクス国際空港(Wroclaw Nicolaus Copernicus)
        'Yerevan': 'https://www.prioritypass.com/ja/lounges/armenia/yerevan-zvartnots-intl', // エレバン・ズヴァルトノッツ国際空港(Yerevan Zvartnots Intl)
    };

    const premiumLounges = [
        // ADD PREMIUM LOUNGE URLS HERE
        'https://www.prioritypass.com/ja/lounges/united-arab-emirates/abu-dhabi-international',
        'https://www.prioritypass.com/ja/lounges/germany/frankfurt-main',
        'https://www.prioritypass.com/ja/lounges/united-kingdom/london-gatwick',
        'https://www.prioritypass.com/ja/lounges/italy/rome-fiumicino'
    ];

    window.AIRPORT_DATA = { airportCodes, cityNames, countryMap, regionMap, schengenMap, rawFlightData, airportGoogleMap, airportFullNames, loungeData, premiumLounges };
})();
