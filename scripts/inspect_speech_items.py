import json

with open('scripts/parsed_actual_speech.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

# Let's inspect all items
for i, it in enumerate(items):
    print(f"{i+1:02d} [{it['start']:.1f}s - {it['end']:.1f}s]: {it['text']}")
