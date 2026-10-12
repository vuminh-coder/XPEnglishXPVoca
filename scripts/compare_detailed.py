import json
import re

# Load Whisper JSON
with open('scripts/cand_audio.json', 'r', encoding='utf-8') as f:
    whisper_data = json.load(f)

# Read TS file
with open('features/listening/data/lessons/movies/romance/lesson_before_sunrise_vienna_night_walk.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Extract segments from TS file
import re
segments_match = re.findall(r'orderIndex:\s*(\d+).*?startTime:\s*([\d\.]+).*?endTime:\s*([\d\.]+).*?text:\s*"(.*?)",', ts_content, re.DOTALL)

print(f"=== TS FILE SEGMENTS COUNT: {len(segments_match)} ===")
for seg in segments_match:
    idx, st, et, text = seg
    print(f"TS [{int(idx):02d}] ({float(st):5.1f}s - {float(et):5.1f}s): {text}")

print("\n=== WHISPER RAW SEGMENTS COUNT: " + str(len(whisper_data['segments'])) + " ===")
for i, s in enumerate(whisper_data['segments']):
    print(f"W  [{i:02d}] ({s['start']:5.1f}s - {s['end']:5.1f}s): {s['text'].strip()}")
