import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('features/listening/data/lessons/lesson_ted_bilingual_brain.ts', 'r', encoding='utf-8') as f:
    ts = f.read()

seg_matches = re.findall(r'orderIndex:\s*(\d+),\s*startTime:\s*([0-9.]+),\s*endTime:\s*([0-9.]+),\s*text:\s*["\'](.*?)["\']', ts)
print(f"Old segments count: {len(seg_matches)}")
for idx, st, et, txt in seg_matches:
    print(f"Old Seg {int(idx):02d} [{float(st):6.2f} -> {float(et):6.2f}]: {txt}")
