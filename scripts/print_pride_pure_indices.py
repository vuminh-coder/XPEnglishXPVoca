import json

with open('scripts/all_pure_pride_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

anchors = [
    'frighten me', 'talent of conversing', 'practice', 'struggled in vain',
    'inferiority', 'ardently', 'London', 'fond of walking', 'perjured',
    'all for you', 'affections', 'bewitched', 'parted from you',
    'hands are cold', 'Shut the door', 'less worthy'
]

for i, s in enumerate(segs):
    for a in anchors:
        if a.lower() in s['text'].lower():
            print(f"seg[{i}]: {s['text']}")
