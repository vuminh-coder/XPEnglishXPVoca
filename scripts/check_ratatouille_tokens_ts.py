import re

with open('features/listening/data/lessons/movies/animation/lesson_ratatouille.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# find segments section
segments_start = content.find('segments: [')
segments_content = content[segments_start:]

import json
# let's parse segments by json or regex
# each segment has "text": "...", "tokenCount": N
pattern = re.compile(r'"orderIndex":\s*(\d+).*?"text":\s*"([^"]+)".*?"tokenCount":\s*(\d+)', re.DOTALL)
for m in pattern.finditer(segments_content):
    idx = int(m.group(1))
    text = m.group(2)
    tc = int(m.group(3))
    # Note: javascript regex \b[A-Za-z0-9_]+\b/g
    # in python:
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", text)
    if tc != len(tokens):
        print(f"Segment {idx}: declared {tc} != actual {len(tokens)} -> text: {text}")
