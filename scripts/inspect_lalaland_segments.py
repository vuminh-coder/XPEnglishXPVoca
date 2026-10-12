import json

with open('scripts/lalaland_audio.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total segments: {len(data['segments'])}")
for idx, seg in enumerate(data['segments']):
    print(f"[{idx:02d}] {seg['start']:6.2f}s - {seg['end']:6.2f}s | {seg['text'].strip()}")
