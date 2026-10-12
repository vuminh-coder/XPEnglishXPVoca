from build_28_segments import segments_data
for s in segments_data:
    if len(s['keywords']) < 2:
        print(f"Segment {s['orderIndex']}: {len(s['keywords'])} keywords -> {s['text']}")
