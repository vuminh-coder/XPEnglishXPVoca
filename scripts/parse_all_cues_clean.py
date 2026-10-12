import json
import re

with open('scripts/before_sunrise_official_full_transcript.json', 'r', encoding='utf-8') as f:
    cues = json.load(f)

print(f"Total raw cues: {len(cues)}")
results = []
for c in cues:
    parts = c.get('textParts', [])
    if not parts:
        txt = ""
    elif len(parts) >= 2 and re.search(r'(second|minute)', parts[0], re.I):
        txt = ' '.join(parts[1:]).strip()
    elif len(parts) == 1 and re.search(r'^\d+\s+(second|minute)', parts[0], re.I):
        txt = ""
    else:
        txt = ' '.join(parts).strip()
    results.append({
        'index': c['index'],
        'timestamp': c['timestamp'],
        'text': txt
    })

with open('scripts/all_cues_output.txt', 'w', encoding='utf-8') as out:
    for r in results:
        out.write(f"CUE_{r['index']:02d} [{r['timestamp']}]: {r['text']}\n")

empty_cues = [r for r in results if not r['text']]
print(f"Empty cues count: {len(empty_cues)}")
if empty_cues:
    print("Empty cues:", empty_cues)
print("Done writing correctly extracted utf-8 text file.")
