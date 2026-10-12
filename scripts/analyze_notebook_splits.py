import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('scripts/notebook_current_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

for s in segs:
    text = s['text']
    trans = s['translationVi']
    parts = [p.strip() for p in text.split('—') if p.strip()]
    if len(parts) > 1:
        print(f"Seg {s['orderIndex']} [{s['startTime']}-{s['endTime']}]: {len(parts)} parts")
        for idx, p in enumerate(parts):
            print(f"   part {idx+1}: {p}")
    else:
        print(f"Seg {s['orderIndex']} [{s['startTime']}-{s['endTime']}]: PURE -> {text[:60]}")
