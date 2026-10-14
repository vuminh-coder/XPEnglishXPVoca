import re

with open('features/listening/data/lessons/movies/animation/lesson_kung_fu_panda.ts', encoding='utf-8') as f:
    c = f.read()

seg_texts = re.findall(r'orderIndex:\s*(\d+),.*?text:\s*"(.*?)",', c, re.DOTALL)
for idx, text in seg_texts:
    print(f"[{idx}] {text}")
