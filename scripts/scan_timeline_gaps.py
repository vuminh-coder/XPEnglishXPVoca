import json

with open("scripts/me_before_you_raw_segments.json", "r", encoding="utf-8") as f:
    segs = json.load(f)

print(f"Total segments: {len(segs)}")
gaps = []
for i in range(len(segs) - 1):
    cur_end = segs[i]["endTime"]
    next_start = segs[i+1]["startTime"]
    gap = next_start - cur_end
    if gap > 3.0:
        gaps.append((i, segs[i]["text"], cur_end, segs[i+1]["text"], next_start, gap))

print(f"Found {len(gaps)} gaps > 3.0 seconds:")
for idx, t1, e1, t2, s2, g in gaps:
    print(f"Gap {g:5.1f}s between [{idx:03d}] ({e1:5.1f}s) '{t1[:30]}' and [{idx+1:03d}] ({s2:5.1f}s) '{t2[:30]}'")
