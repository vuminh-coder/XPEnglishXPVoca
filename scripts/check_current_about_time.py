import json
import re

with open('features/listening/data/lessons/movies/romance/lesson_about_time.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Match segments
pattern = re.compile(r'\{\s*"orderIndex":\s*(\d+),\s*"startTime":\s*([0-9.]+),\s*"endTime":\s*([0-9.]+),\s*"text":\s*"(.*?)"', re.DOTALL)
matches = pattern.findall(content)

print(f"Total segments found: {len(matches)}")
for idx, start, end, text in matches:
    print(f"[{idx}] {float(start):6.1f}s -> {float(end):6.1f}s (dur: {float(end)-float(start):4.1f}s): {text}")
