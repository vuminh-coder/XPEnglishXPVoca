import json

with open('scripts/about_time_official_full_transcript.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

print(f"Total items in official youtube transcript: {len(items)}")
for item in items:
    print(f"[{item['timestamp']}] {item['textParts'][-1]}")
