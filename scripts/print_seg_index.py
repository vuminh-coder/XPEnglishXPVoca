import json

with open('scripts/la_la_land_raw_segments.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for i, x in enumerate(data):
    print(f"{i}: [{x['startTime']}-{x['endTime']}] {x['text']}")
