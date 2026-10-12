import json

yt = json.load(open('scripts/about_time_yt_dom_transcript.json', encoding='utf-8'))
lines = json.load(open('scripts/about_time_lines.json', encoding='utf-8'))

print("=== YOUTUBE AUTO CAPTIONS (31 ITEMS) ===")
for y in yt:
    print(f"[{y['timestamp']}] {y['textParts'][-1]}")

print("\n=== MOVIE SCENE LINES (INDEX 1705 to 1775) ===")
scene_lines = [l for l in lines if 1705 <= l['idx'] <= 1774]
print(f"Total scene lines: {len(scene_lines)}")
for l in scene_lines:
    print(f"[{l['idx']}] {l['text']}")
