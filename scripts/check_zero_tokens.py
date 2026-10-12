import re

with open('features/listening/data/lessons/movies/romance/lesson_before_sunrise.ts', 'r', encoding='utf-8') as f:
    c = f.read()

counts = re.findall(r'"tokenCount":\s*(\d+)', c)
print('Token counts:', [int(x) for x in counts])
for idx, val in enumerate(counts):
    if int(val) == 0:
        print(f"Segment {idx} has tokenCount == 0")
