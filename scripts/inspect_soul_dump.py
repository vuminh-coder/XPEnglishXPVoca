import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('scripts/soul_transcript_full.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

print('Page Title:', d.get('pageTitle'))
print('Total segments in json:', len(d.get('segments', [])))
for s in d.get('segments', []):
    print(f"[{s.get('timestamp')}] {s.get('text')[:100]}...")

tracks = d.get('captionTracks', [])
print(f'Caption tracks found: {len(tracks)}')
for t in tracks:
    print('Track lang:', t.get('languageCode'), 'name:', t.get('name'), 'baseUrl:', t.get('baseUrl')[:90] if t.get('baseUrl') else '')
