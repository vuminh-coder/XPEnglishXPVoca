import os
import re

dir_path = 'features/listening/data/lessons/movies/animation'
files = [
    'lesson_monsters_inc.ts',
    'lesson_walle.ts',
    'lesson_tangled.ts',
    'lesson_finding_dory.ts',
    'lesson_the_lion_king.ts',
    'lesson_zootopia.ts',
    'lesson_up.ts',
    'lesson_coco.ts',
    'lesson_ratatouille.ts',
    'lesson_soul.ts',
    'lesson_inside_out.ts',
    'lesson_kung_fu_panda.ts',
]

print("Checking animation lessons from bottom to top:")
for f in files:
    p = os.path.join(dir_path, f)
    if not os.path.exists(p):
        print(f"MISSING: {f}")
        continue
    with open(p, 'r', encoding='utf-8') as fh:
        c = fh.read()
    
    ext_id = re.search(r'externalId:\s*"([^"]+)"', c)
    ext_id = ext_id.group(1) if ext_id else 'N/A'
    
    dur = re.search(r'durationFormatted:\s*"([^"]+)"', c)
    dur = dur.group(1) if dur else 'N/A'
    
    segs = len(re.findall(r'["\']?orderIndex["\']?:', c))
    quizzes = len(re.findall(r'["\']?id["\']?:\s*"q_', c))
    
    print(f"[{f:28s}] ID: {ext_id:12s} | Dur: {dur:6s} | Segments: {segs:2d} | Quiz: {quizzes:2d}")
