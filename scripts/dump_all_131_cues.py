import json

with open('scripts/subs/gW0xteHHXrY.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

segs = data['segments']
print(f"Total whisper segments: {len(segs)}")

with open('scripts/all_laland_131_cues.txt', 'w', encoding='utf-8') as out:
    for i, s in enumerate(segs):
        out.write(f"[{i:03d}] {s['start']:6.2f}s -> {s['end']:6.2f}s: {s['text'].strip()}\n")

print("Done dumping to scripts/all_laland_131_cues.txt")
