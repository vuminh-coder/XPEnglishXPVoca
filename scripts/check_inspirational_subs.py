import os
import json

for it in [f"mov_insp_{i:02d}" for i in range(1, 13) if i != 11]:
    files = [f for f in os.listdir('scripts/subtitles_27') if f.startswith(it)]
    if files:
        d = json.load(open(f'scripts/subtitles_27/{files[0]}', encoding='utf-8'))
        print(f"[{it}] {files[0]} -> {len(d.get('events', []))} events")
    else:
        print(f"[{it}] NO FILE")
