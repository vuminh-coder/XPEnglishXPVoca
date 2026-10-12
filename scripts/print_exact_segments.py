import json

with open('scripts/cand_audio.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for idx, seg in enumerate(data['segments']):
    print(f"[{idx}] {seg['start']:.2f}s - {seg['end']:.2f}s: {repr(seg['text'])}")
