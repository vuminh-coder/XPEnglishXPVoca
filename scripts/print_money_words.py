import json

with open("scripts/money.en.json3", "r", encoding="utf-8") as f:
    data = json.load(f)

word_events = []
for e in data["events"]:
    start_ms = e.get("tStartMs", 0)
    for s in e.get("segs", []):
        txt = s.get("utf8", "").strip()
        if txt and txt != "\n":
            offset_ms = s.get("tOffsetMs", 0)
            t = (start_ms + offset_ms) / 1000.0
            word_events.append((t, txt))

# Deduplicate rolling window
unique_words = []
for i, (t, w) in enumerate(word_events):
    last = unique_words[-1] if unique_words else None
    if last and last[1] == w and abs(t - word_events[i-1][0]) < 0.5:
        continue
    unique_words.append((t, w))

for idx, (t, w) in enumerate(unique_words):
    print(f"{idx:3d}: [{t:5.2f}s] {w}")
