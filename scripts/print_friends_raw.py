import json

with open('scripts/subs/v1xXlxDHWPU.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

print(f"Total raw segments: {len(d['segments'])}")
for i, s in enumerate(d['segments']):
    print(f"{i:03d} [{s['start']:.1f} - {s['end']:.1f}]: {s['text'].strip()}")
