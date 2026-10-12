import json
import re

with open('scripts/lalaland_audio.json', 'r', encoding='utf-8') as f:
    wdata = json.load(f)

with open('features/listening/data/lessons/movies/romance/lesson_la_la_land_the_fools_who_dream_audition.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Extract segments
pattern = r'orderIndex:\s*(\d+).*?startTime:\s*([\d\.]+).*?endTime:\s*([\d\.]+).*?text:\s*"(.*?)"'
segments = re.findall(pattern, ts_content, re.DOTALL)

print(f"Total TS segments: {len(segments)}")
for idx, st, et, text in segments:
    st_f, et_f = float(st), float(et)
    # Find whisper words overlapping with this range
    matching_whisper = []
    for ws in wdata['segments']:
        if ws['end'] >= st_f and ws['start'] <= et_f:
            matching_whisper.append(f"[{ws['start']:.1f}-{ws['end']:.1f}: {ws['text'].strip()}]")
    print(f"\n--- Segment {idx} ({st_f:.1f}s - {et_f:.1f}s) ---")
    print(f"TS  TEXT: {text}")
    print(f"W MATCH: {' '.join(matching_whisper)}")
