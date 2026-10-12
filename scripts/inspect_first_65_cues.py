import json

with open('scripts/monsters_inc_cleaned_cues.json', 'r', encoding='utf-8') as f:
    cues = json.load(f)

print(f"Total cues: {len(cues)}")
print("\n--- CUES 0 to 64 ---")
for i in range(0, min(65, len(cues))):
    c = cues[i]
    print(f"{i:03d}: [{c['timestamp']} - {c['seconds']}s] {c['text']}")
