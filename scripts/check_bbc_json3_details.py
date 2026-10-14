import json

with open('scripts/bbc_brain_official.en-GB.json3', 'r', encoding='utf-8') as f:
    data = json.load(f)

for i, e in enumerate(data.get('events', [])[:15]):
    t0 = e.get('tStartMs', 0)
    dur = e.get('dDurationMs', 0)
    segs = e.get('segs', [])
    txt = ''.join(s.get('utf8', '') for s in segs).replace('\n', ' ')
    print(f"Event {i+1:2d}: {t0/1000:6.2f}s - {(t0+dur)/1000:6.2f}s | segs count: {len(segs)} | '{txt}'")
    if len(segs) > 1:
        print("   Offsets:", [(s.get('utf8'), s.get('tOffsetMs')) for s in segs])
