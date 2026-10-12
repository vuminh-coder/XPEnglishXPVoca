import json

with open('scripts/about_time_lines.json', 'r', encoding='utf-8') as f:
    lines = json.load(f)

for l in lines:
    idx = l['idx']
    if 1705 <= idx <= 1810:
        print(f"[{idx}] {l['text']}")
