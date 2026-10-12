import json

with open('scripts/subs/gW0xteHHXrY.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

segs = data.get('segments', [])
print(f"Total Whisper segments: {len(segs)}")
with open('scripts/laland_whisper_cues.txt', 'w', encoding='utf-8') as out:
    for i, s in enumerate(segs):
        line = f"[{i:02d}] {s['start']:6.2f}s -> {s['end']:6.2f}s: {s['text'].strip()}"
        out.write(line + "\n")
        print(line)
print("Saved all cues to scripts/laland_whisper_cues.txt")
