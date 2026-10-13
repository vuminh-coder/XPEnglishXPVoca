import json

with open('scripts/beautiful_mind_raw.json', encoding='utf-8') as f:
    snippets = json.load(f)

print(f"Total snippets: {len(snippets)}")
for i, s in enumerate(snippets):
    end = s['start'] + s['duration']
    print(f"[{i:03d}] {s['start']:6.2f}s - {end:6.2f}s: {s['text']}")
