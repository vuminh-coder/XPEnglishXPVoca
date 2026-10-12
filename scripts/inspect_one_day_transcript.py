import json

data = json.load(open('scripts/one_day_official_full_transcript.json', encoding='utf-8'))
print(f"Total raw items: {len(data)}")

for item in data:
    idx = item["index"]
    ts = item["timestamp"]
    raw = item["rawText"]
    parts = item.get("textParts", [])
    text = " ".join([p for p in parts if not p.endswith("seconds") and not p.endswith("second")])
    print(f"[{idx:02d}] {ts:>5} | {text}")
