import os
import json

for it in ['mov_sit_07', 'mov_sit_08', 'mov_sit_09', 'mov_sit_11']:
    matching = [f for f in os.listdir('scripts/subtitles_27') if f.startswith(it)]
    if not matching:
        print(f"[{it}] NO FILE FOUND")
        continue
    fname = matching[0]
    data = json.load(open(f'scripts/subtitles_27/{fname}', encoding='utf-8'))
    events = data.get('events', [])
    print(f"\n[{it}] {fname} -> {len(events)} events | info: {data.get('vid')}")
    for ev in events[:6]:
        print(f"   {ev['start']:6.1f}s - {ev['end']:6.1f}s: {ev['text']}")
