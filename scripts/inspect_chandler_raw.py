import json

with open('scripts/subs/xT5zt93BbAg.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

segs = d['segments']
print(f"Total segments: {len(segs)}")
for i, s in enumerate(segs):
    st = s['start']
    en = s['end']
    txt = s['text'].strip()
    print(f"{i:03d} [{st:05.1f} - {en:05.1f}]: {txt}")
