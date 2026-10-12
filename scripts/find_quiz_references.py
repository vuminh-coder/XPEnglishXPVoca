import json

with open('scripts/before_sunrise_raw_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

targets = [
    ("Q1", "you should get off the train with me here in Vienna"),
    ("Q2", "space in between"),
    ("Q3", "people talking was so evocative"),
    ("Q4", "dissolve into molecules"),
    ("Q5", "Milkshake!"),
    ("Q6", "branches in the river"),
    ("Q7", "82-year-old self"),
    ("Q8", "It's not perfect, but it's real")
]

for q_label, pattern in targets:
    for idx, s in enumerate(segs):
        if pattern.lower() in s['text'].lower():
            print(f"{q_label} -> Segment {idx:3d}: {s['text'][:60]}...")
            break
