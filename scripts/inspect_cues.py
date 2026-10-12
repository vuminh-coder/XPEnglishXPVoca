import json

with open('scripts/monsters_inc_cleaned_cues.json', 'r', encoding='utf-8') as f:
    cues = json.load(f)

print(f"Total cues: {len(cues)}")
print("\n--- CUES 25 to 65 ---")
for c in cues[25:65]:
    print(f"[{c['timestamp']} - {c['seconds']}s] {c['text']}")

print("\n--- CUES 65 to 125 ---")
for c in cues[65:]:
    print(f"[{c['timestamp']} - {c['seconds']}s] {c['text']}")
