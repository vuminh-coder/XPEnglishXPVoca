import json

with open('scripts/subs/gW0xteHHXrY.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

cues = data['segments']
print(f"Total cues: {len(cues)}")

# Let's see the text of every cue
for i, c in enumerate(cues):
    t = c['text'].strip()
    s = c['start']
    e = c['end']
    print(f"[{i:03d}] {s:5.1f}s-{e:5.1f}s: {t}")
