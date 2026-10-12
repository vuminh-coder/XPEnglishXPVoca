import json

with open('scripts/lalaland_audio.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for s in data['segments']:
    print(f"[{s['start']:6.2f} - {s['end']:6.2f}] {s['text']}")
    if 'words' in s:
        print("   " + " ".join([f"{w['word']}({w['start']:.1f}-{w['end']:.1f})" for w in s['words']]))
