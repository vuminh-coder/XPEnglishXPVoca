import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('scripts/inside_out_transcript_full.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

segs = data.get('segments', [])
print(f'Total extracted segments: {len(segs)}')
for idx, s in enumerate(segs[:20]):
    print(f"{idx}: [{s.get('timestamp')}] {s.get('text')}")
print('...')
for idx, s in enumerate(segs[50:65], start=50):
    print(f"{idx}: [{s.get('timestamp')}] {s.get('text')}")
print('...')
for idx, s in enumerate(segs[-15:], start=len(segs)-15):
    print(f"{idx}: [{s.get('timestamp')}] {s.get('text')}")
