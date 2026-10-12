import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

dirs = [
    ('romance', 'features/listening/data/lessons/movies/romance'),
    ('sitcoms', 'features/listening/data/lessons/movies/sitcoms'),
    ('inspirational', 'features/listening/data/lessons/movies/inspirational'),
    ('animation', 'features/listening/data/lessons/movies/animation')
]

for cat_name, cat_dir in dirs:
    print(f"\n=== {cat_name.upper()} ===")
    files = [f for f in os.listdir(cat_dir) if f.startswith('lesson_') and f.endswith('.ts')]
    for f in sorted(files):
        p = os.path.join(cat_dir, f)
        txt = open(p, 'r', encoding='utf-8').read()
        id_m = re.search(r'id:\s*"(mov_[^"]+)"', txt)
        slug_m = re.search(r'slug:\s*"([^"]+)"', txt)
        title_m = re.search(r'title:\s*"([^"]+)"', txt)
        lid = id_m.group(1) if id_m else '?'
        slug = slug_m.group(1) if slug_m else '?'
        title = title_m.group(1) if title_m else '?'
        print(f"[{lid}] File: {f}")
        print(f"       Title: {title}")
        print(f"       Slug:  {slug}")
