import json

with open('scripts/about_time_lines.json', 'r', encoding='utf-8') as f:
    lines = json.load(f)

print(f"Total lines: {len(lines)}")
for l in lines:
    print(f"{l['idx']}: {l['text']}")
