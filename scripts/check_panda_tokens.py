import re

with open('features/listening/data/lessons/movies/animation/lesson_kung_fu_panda.ts', encoding='utf-8') as f:
    content = f.read()

seg_blocks = re.findall(r'\{\s*orderIndex:\s*(\d+),.*?text:\s*"(.*?)",.*?tokenCount:\s*(\d+),', content, re.DOTALL)
print(f"Matched blocks: {len(seg_blocks)}")
mismatches = []
for order_idx, text, tok in seg_blocks:
    regex_count = len(re.findall(r'\b[A-Za-z0-9_]+\b', text))
    if regex_count != int(tok):
        mismatches.append((order_idx, regex_count, int(tok), text))

print(f"Mismatches: {len(mismatches)}")
for m in mismatches:
    print(f"Segment {m[0]}: regex={m[1]} vs stated={m[2]} | {m[3][:40]}")
