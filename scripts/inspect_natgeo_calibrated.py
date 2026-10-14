import json
import re

with open('scripts/natgeo_25_calibrated.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total segments: {len(data)}")
for i, s in enumerate(data):
    tokens = re.findall(r'\b[A-Za-z0-9_]+\b', s['text'])
    print(f"{i:02d} [{s['startTime']:6.2f} - {s['endTime']:6.2f}] ({len(tokens):2d}w): {s['text']}")
