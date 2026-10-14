import re

content = open('features/listening/data/lessons/movies/animation/lesson_tangled.ts', encoding='utf-8').read()
segments = re.findall(r'orderIndex:\s*(\d+),\s*startTime:\s*([0-9.]+),\s*endTime:\s*([0-9.]+),\s*text:\s*"(.*?)"', content, re.DOTALL)
print(f"Found {len(segments)} segments in lesson_tangled.ts:")
for idx, s, e, text in segments:
    print(f"[{idx}] {s}s-{e}s: {text}")
