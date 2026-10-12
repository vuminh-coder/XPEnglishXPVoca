import json

with open('scripts/before_sunrise_official_full_transcript.json', 'r', encoding='utf-8') as f:
    cues = json.load(f)

print(f"Total cues: {len(cues)}")
for i, c in enumerate(cues):
    tp = [t for t in c.get('textParts', []) if not ('second' in t or 'minute' in t)]
    txt = ' '.join(tp).strip()
    ts = c['timestamp']
    print(f"[{i:02d}] {ts} (len={len(txt)}): {txt}")
