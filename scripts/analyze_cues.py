import json

with open('scripts/monsters_inc_cleaned_cues.json', 'r', encoding='utf-8') as f:
    cues = json.load(f)

print(f"Total cues loaded: {len(cues)}")

# Let's inspect cue durations and boundaries
for i in range(len(cues)):
    c = cues[i]
    start_sec = c['seconds']
    next_sec = cues[i+1]['seconds'] if i+1 < len(cues) else 1059
    c['duration'] = next_sec - start_sec

print("Done inspecting.")
