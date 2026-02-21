import re
import json

with open('/Users/gon/Downloads/Wizz Air日本語検索サイト/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

city_names_match = re.search(r'const cityNames = \{([\s\S]*?)\};', data_js)

cities = {}
for line in city_names_match.group(1).split('\n'):
    line = line.strip()
    if not line: continue
    line = re.sub(r'//.*', '', line)
    match = re.match(r"'([^']+)'\s*:\s*'([^']+)'", line)
    if match:
        cities[match.group(1)] = match.group(2)
        
lounges = []
with open('/Users/gon/Downloads/Wizz Air日本語検索サイト/Lounge_Airports.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for line in lines[1:]: # skip header
        parts = line.strip().split('\t')
        if len(parts) >= 3:
            lounges.append({
                'region': parts[0],
                'name': parts[1],
                'url': parts[2]
            })

lounge_data = {}
for en_name, ja_name in cities.items():
    matched = []
    # special handling for London
    if en_name == 'London (LGW)':
        ja_match = 'ガトウィック'
    elif en_name == 'London (LTN)':
        ja_match = 'ルートン'
    elif en_name == 'Milan':
        ja_match = 'マルペンサ' # Primary maybe? or just 'ミラノ'
    elif en_name == 'Paris':
        ja_match = 'ボーヴェ' # BVA
    elif en_name == 'Rome':
        ja_match = 'フィウミチーノ'
    elif en_name == 'Frankfurt':
        ja_match = 'ハーン'
    elif en_name == 'Venice':
        ja_match = 'マルコ・ポーロ'
    elif en_name == 'Warsaw':
        ja_match = 'ショパン'
    elif en_name == 'Bucharest':
        ja_match = 'アンリ・コアンダ'
    else:
        ja_match = ja_name
        
    for l in lounges:
        if ja_match in l['name']:
            matched.append(l)
    
    if len(matched) == 1:
        lounge_data[en_name] = {'url': matched[0]['url'], 'name': matched[0]['name']}
    elif len(matched) > 1:
        # Multiple matches, just take the first one
        lounge_data[en_name] = {'url': matched[0]['url'], 'name': matched[0]['name']}
    else:
        # fallback for partial matches
        for l in lounges:
            if en_name.lower() in l['name'].lower():
                matched.append(l)
        if matched:
            lounge_data[en_name] = {'url': matched[0]['url'], 'name': matched[0]['name']}

print(f"Matched {len(lounge_data)} out of {len(cities)} airports.")

js_output = "const loungeData = {\n"
for k, v in lounge_data.items():
    js_output += f"    '{k}': '{v['url']}', // {v['name']}\n"
js_output += "};\n\n"
js_output += "const premiumLounges = []; // ADD PREMIUM LOUNGE URLS HERE\n"

with open('/Users/gon/Downloads/Wizz Air日本語検索サイト/lounge_mapping.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

