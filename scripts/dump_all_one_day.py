import json

data = json.load(open('scripts/one_day_official_full_transcript.json', encoding='utf-8'))
print(f"Total extracted transcript items: {len(data)}")

for item in data:
    idx = item["index"]
    ts = item["timestamp"]
    raw = item["rawText"]
    print(f"[{idx:02d}] {ts} -> {raw}")
