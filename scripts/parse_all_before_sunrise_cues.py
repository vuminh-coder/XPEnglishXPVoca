import json
import re

with open('scripts/before_sunrise_official_full_transcript.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

def parse_time(ts):
    parts = ts.split(':')
    if len(parts) == 2:
        return int(parts[0]) * 60 + int(parts[1])
    elif len(parts) == 3:
        return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
    return 0

for i, item in enumerate(items):
    sec = parse_time(item['timestamp'])
    next_sec = parse_time(items[i+1]['timestamp']) if i + 1 < len(items) else 819
    txt = item['textParts'][-1]
    print(f"[{i:02d}] {sec:3d}s - {next_sec:3d}s ({next_sec - sec:2d}s) | {item['timestamp']} | {txt}")
