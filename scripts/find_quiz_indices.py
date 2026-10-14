import json

with open('scripts/matt_walker_raw_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

print(f"Total segments: {len(segs)}")

# Q1: Testicles (Segment 1)
# Q2: Testosterone decade (Segment 2 or 3)
# Q3: Dry sponge (Segment 11)
# Q4: 40 percent deficit (Segment 17 or 18)
# Q5: File transfer hippocampus to cortex
# Q6: Natural killer cells 70% drop
# Q7: Daylight saving time 24% increase heart attacks
# Q8: Tossing and turning in bed

for i, s in enumerate(segs):
    t = s['text'].lower()
    if 'smaller testicles' in t:
        print(f"Q1 Target: Segment {i} -> {s['text']}")
    if '10 years their senior' in t:
        print(f"Q2 Target: Segment {i} -> {s['text']}")
    if 'dry sponge' in t:
        print(f"Q3 Target: Segment {i} -> {s['text']}")
    if '40 percent deficit' in t:
        print(f"Q4 Target: Segment {i} -> {s['text']}")
    if 'file-transfer' in t or 'file transfer' in t:
        print(f"Q5 Target: Segment {i} -> {s['text']}")
    if '70 percent drop' in t:
        print(f"Q6 Target: Segment {i} -> {s['text']}")
    if '24 percent increase' in t:
        print(f"Q7 Target: Segment {i} -> {s['text']}")
    if 'tossing and turning' in t:
        print(f"Q8 Target: Segment {i} -> {s['text']}")
