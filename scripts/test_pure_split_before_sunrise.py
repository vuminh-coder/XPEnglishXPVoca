import sys
sys.path.append('scripts')
from test_segments_builder import segments_data

pure_list = []
for seg in segments_data:
    txt = seg['text']
    # Check if there is ' - ' in text
    if ' - ' in txt:
        parts = [p.strip() for p in txt.split(' - ') if p.strip()]
        for p in parts:
            pure_list.append({
                "parentIndex": seg['orderIndex'],
                "start": seg['startTime'],
                "end": seg['endTime'],
                "text": p
            })
    else:
        pure_list.append({
            "parentIndex": seg['orderIndex'],
            "start": seg['startTime'],
            "end": seg['endTime'],
            "text": txt
        })

print(f"Total pure segments generated: {len(pure_list)}")
for i, s in enumerate(pure_list[:25]):
    print(f"[{i:2d}] parent={s['parentIndex']:2d} | {s['text']}")
