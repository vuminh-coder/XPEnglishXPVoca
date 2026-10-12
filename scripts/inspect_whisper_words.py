import json

with open('scripts/cand_audio.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for s in data['segments']:
    print(f"Segment: {s['start']:.2f}s - {s['end']:.2f}s | {s['text']}")
    if 'words' in s:
        words_str = " ".join([f"{w['word']}({w['start']:.2f}-{w['end']:.2f})" for w in s['words']])
        print(f"  Words: {words_str}")
