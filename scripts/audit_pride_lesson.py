import json
import re

with open('features/listening/data/lessons/movies/romance/lesson_pride_and_prejudice_rain_proposal_dawn.ts', 'r', encoding='utf-8') as f:
    text = f.read()

segments = re.findall(r'orderIndex:\s*(\d+),\s*startTime:\s*([\d\.]+),\s*endTime:\s*([\d\.]+),\s*text:\s*"(.*?)"', text)
print(f"Total segments currently in file: {len(segments)}")

with open('scripts/pride_audio.json', 'r', encoding='utf-8') as f:
    whisper_data = json.load(f)

print(f"Total whisper segments: {len(whisper_data['segments'])}")
for idx, s, e, t in segments:
    print(f"Segment [{idx}] {float(s):5.1f}s - {float(e):5.1f}s | {t}")
