import json

with open("scripts/pride_audio.json", "r", encoding="utf-8") as f:
    d = json.load(f)

for s in d["segments"]:
    if 165 <= s["start"] <= 206:
        print(f"{s['start']:6.2f}s -> {s['end']:6.2f}s | {s['text'].strip()}")
        if "words" in s:
            w_str = " ".join([f"{w['word']}({w['start']:.1f}-{w['end']:.1f})" for w in s["words"]])
            print("   words:", w_str)
