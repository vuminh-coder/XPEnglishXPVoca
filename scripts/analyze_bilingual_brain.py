import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/ted_bilingual_brain.en.json3', 'r', encoding='utf-8') as f:
    data = json.load(f)

events = data.get('events', [])
cues = []
for ev in events:
    segs = ev.get('segs', [])
    text = ''.join([s.get('utf8', '') for s in segs]).replace('\n', ' ').strip()
    if text:
        t_start = ev.get('tStartMs', 0) / 1000.0
        d_dur = ev.get('dDurationMs', 0) / 1000.0
        cues.append({'start': round(t_start, 2), 'end': round(t_start + d_dur, 2), 'text': text})

print(f"Total non-empty cues: {len(cues)}")
print(f"Start of video: {cues[0]['start']}s, End of video: {cues[-1]['end']}s")
for i, c in enumerate(cues[:10]):
    print(f"Cue {i:02d}: [{c['start']:6.2f} -> {c['end']:6.2f}] {c['text']}")
print("...")
for i, c in enumerate(cues[-10:], start=len(cues)-10):
    print(f"Cue {i:02d}: [{c['start']:6.2f} -> {c['end']:6.2f}] {c['text']}")
