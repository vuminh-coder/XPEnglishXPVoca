import re
import json

content = open('features/listening/data/lessons/movies/animation/lesson_the_lion_king.ts', encoding='utf-8').read()

# Extract segments array
start = content.find('segments: [')
if start != -1:
    end = content.find('quiz:', start)
    segments_str = content[start + len('segments: ['):end].strip()
    if segments_str.endswith('],'):
        segments_str = segments_str[:-2]
    # parse with regex
    segments = re.findall(r'\{\s*"orderIndex":\s*(\d+),\s*"startTime":\s*([0-9.]+),\s*"endTime":\s*([0-9.]+),\s*"text":\s*"(.*?)"', content, re.DOTALL)
    print(f"Total regex matched segments: {len(segments)}")
    for idx, s, e, text in segments:
        print(f"[{idx}] {s}s-{e}s: {text}")
