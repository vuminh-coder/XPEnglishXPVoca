import json

with open('scripts/cand_audio.json', 'r', encoding='utf-8') as f:
    whisper_data = json.load(f)

print(f"Total Whisper segments: {len(whisper_data['segments'])}")
for i, s in enumerate(whisper_data['segments']):
    print(f"[{i:02d}] ({s['start']:5.1f}s - {s['end']:5.1f}s) -> {s['text'].strip()}")
