import json
import re

with open('scripts/before_sunrise_raw_segments.json', 'r', encoding='utf-8') as f:
    segments = json.load(f)

pure_segments = []

for seg in segments:
    txt = seg['text']
    if ' - ' in txt:
        parts = [p.strip() for p in txt.split(' - ') if p.strip()]
        # Split time equally among parts
        total_dur = seg['endTime'] - seg['startTime']
        part_dur = total_dur / len(parts)
        for i, p in enumerate(parts):
            p_start = round(seg['startTime'] + i * part_dur, 1)
            p_end = round(seg['startTime'] + (i + 1) * part_dur, 1)
            pure_segments.append({
                "startTime": p_start,
                "endTime": p_end,
                "text": p,
                "translationVi": seg['translationVi'], # Will refine translations
                "ipaUs": seg['ipaUs'],
                "keywords": seg['keywords'],
                "explanationAi": seg['explanationAi'],
                "properNouns": seg.get('properNouns', [])
            })
    else:
        pure_segments.append(seg)

print(f"Old segments count: {len(segments)}")
print(f"New zero-merged segments count: {len(pure_segments)}")

# Verify no more ' - '
for idx, s in enumerate(pure_segments):
    assert ' - ' not in s['text'], f"Still has ' - ' in segment {idx}: {s['text']}"
    assert not s['text'].startswith('- '), f"Starts with '- ' in segment {idx}: {s['text']}"

print("All segments 100% free of dashes!")
