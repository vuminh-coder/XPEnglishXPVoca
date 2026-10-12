import json

with open("scripts/me_before_you_raw_segments.json", "r", encoding="utf-8") as f:
    segs = json.load(f)

short_segs = [(s["orderIndex"], s["text"], len(s["explanationAi"])) for s in segs if len(s["explanationAi"]) <= 35]
print(f"Short explanations count: {len(short_segs)}")
for idx, text, l in short_segs:
    print(f"[{idx:03d}] ({l} chars) \"{text}\"")
