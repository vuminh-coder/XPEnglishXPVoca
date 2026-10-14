import json
import re

with open('scripts/ratatouille_pure_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

for i, s in enumerate(segs):
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", s['text'])
    if s['tokenCount'] != len(tokens):
        print(f"Index {i}: declared {s['tokenCount']} vs regex {len(tokens)} -> {s['text']}")
