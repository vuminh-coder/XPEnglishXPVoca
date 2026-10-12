import json

with open("scripts/subs/sM4rv42qyvk.json", "r", encoding="utf-8") as f:
    d = json.load(f)

print(f"Total Whisper segments: {len(d['segments'])}")
for idx, s in enumerate(d['segments']):
    print(f"[{idx:02d}] {s['start']:6.2f}s -> {s['end']:6.2f}s | {s['text'].strip()}")
