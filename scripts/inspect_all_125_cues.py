import json

with open('scripts/monsters_inc_cleaned_cues.json', 'r', encoding='utf-8') as f:
    cues = json.load(f)

print(f"Total cues: {len(cues)}")
for i, c in enumerate(cues):
    print(f"{i:03d}: [{c['timestamp']} - {c['seconds']}s] {c['text']}")
