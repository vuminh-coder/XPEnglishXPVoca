import json

with open('scripts/matt_walker_sleep.en.json3', 'r', encoding='utf-8') as f:
    data = json.load(f)

events = data.get('events', [])
text_events = []
for ev in events:
    segs = ev.get('segs', [])
    text = ''.join(s.get('utf8', '') for s in segs).strip()
    if text:
        start = ev.get('tStartMs', 0) / 1000.0
        dur = ev.get('dDurationMs', 0) / 1000.0
        text_events.append({'start': start, 'end': start + dur, 'text': text})

print(f"Total events: {len(text_events)}")
for i in range(275, len(text_events)):
    ev = text_events[i]
    print(f"{i}: [{ev['start']:.2f}s - {ev['end']:.2f}s] {repr(ev['text'])}")
