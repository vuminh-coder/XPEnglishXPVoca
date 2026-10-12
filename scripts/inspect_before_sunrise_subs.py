import json
import re

with open('scripts/before_sunrise_official_full_transcript.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total extracted segments: {len(data)}")
for item in data:
    idx = item['index']
    ts = item['timestamp']
    txt = item['rawText'].replace(ts, '', 1).strip()
    txt = re.sub(r'^\d+\s*(seconds|minute,\s*\d+\s*seconds|minutes,\s*\d+\s*seconds)\s*', '', txt)
    print(f"[{idx:02d}] {ts:>5} | {txt}")
