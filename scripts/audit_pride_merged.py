import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
content = open('features/listening/data/lessons/movies/romance/lesson_pride_and_prejudice.ts', encoding='utf-8').read()
texts = re.findall(r'"text":\s*"([^"]+)"', content)

print(f"Total segments: {len(texts)}")
merged = [t for t in texts if '—' in t or ' - ' in t or t.startswith('- ')]
print(f"Merged segments: {len(merged)}")
for i, m in enumerate(merged):
    print(f"  {i+1}: {m[:80]}")
