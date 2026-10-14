import json

with open("scripts/money.en.json3", "r", encoding="utf-8") as f:
    data = json.load(f)

for idx, e in enumerate(data["events"]):
    start = e["tStartMs"] / 1000.0
    dur = e.get("dDurationMs", 0) / 1000.0
    end = start + dur
    text = "".join([s.get("utf8", "") for s in e.get("segs", [])]).replace("\n", " ").strip()
    if text:
        print(f"Event {idx} [{start:.2f}s - {end:.2f}s] ({dur:.2f}s): \"{text}\"")
