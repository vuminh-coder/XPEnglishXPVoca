import json

with open('scripts/subs/9lo1ncSInLI.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

segments = d['segments']

print(f"Total Whisper segments: {len(segments)}")

# Let's see the full transcript with start and end times:
for i, s in enumerate(segments):
    print(f"[{i:03d}] {s['start']:6.2f}s - {s['end']:6.2f}s | {s['text']}")
