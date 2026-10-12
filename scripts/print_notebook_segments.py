import json

with open('scripts/the_notebook_pure_segments.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for i, x in enumerate(data):
    print(f"{i}: [{x['startTime']}-{x['endTime']}] {x['text']}")
