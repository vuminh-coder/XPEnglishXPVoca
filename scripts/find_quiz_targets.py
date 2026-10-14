import json

with open('scripts/matt_walker_raw_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

for i, s in enumerate(segs):
    t = s['text'].lower()
    if '40 percent' in t:
        print(f"Q4 Target: Segment {i} -> {s['text']}")
    if 'natural killer' in t:
        print(f"Q6 Target: Segment {i} -> {s['text']}")
    if 'heart attack' in t:
        print(f"Q7 Target: Segment {i} -> {s['text']}")
    if 'staying in bed awake' in t:
        print(f"Q8 Solution: Segment {i} -> {s['text']}")
