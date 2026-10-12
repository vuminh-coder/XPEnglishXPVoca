import re

with open('features/listening/data/lessons/movies/romance/lesson_la_la_land.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'\{\s*"orderIndex":\s*(\d+),\s*"startTime":\s*([0-9.]+),\s*"endTime":\s*([0-9.]+),\s*"text":\s*"(.*?)"', re.DOTALL)
matches = pattern.findall(content)

print(f"Total segments found in lesson_la_la_land.ts: {len(matches)}")
for idx, start, end, text in matches:
    dur = float(end) - float(start)
    has_dash = '—' in text or ' - ' in text
    print(f"[{idx:2s}] {float(start):6.1f}s -> {float(end):6.1f}s (dur: {dur:4.1f}s) {'[MERGED]' if has_dash else ''}: {text[:75]}...")
