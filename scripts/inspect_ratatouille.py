import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('scripts/ratatouille_transcript_full.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

segs = d.get('segments', [])
print(f"Total extracted segments: {len(segs)}")

def parse_ts(ts_str):
    parts = ts_str.split(':')
    if len(parts) == 2:
        return int(parts[0]) * 60 + int(parts[1])
    elif len(parts) == 3:
        return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
    return 0

clean_list = []
for s in segs:
    raw = s['rawText']
    ts = s['timestamp']
    sec = parse_ts(ts)
    txt = re.sub(r'^\d+\s+(seconds?|minutes?(,\s*\d+\s*seconds?)?)\s*', '', raw)
    txt = re.sub(r'\[(music|screaming|crying|laughter|groaning and screaming)\]', '', txt).strip()
    if txt and len(txt) > 2:
        clean_list.append({'sec': sec, 'ts': ts, 'text': txt})

print(f"Clean lines count: {len(clean_list)}")
for idx, c in enumerate(clean_list[:25]):
    print(f"{idx}: [{c['ts']} / {c['sec']}s] {c['text']}")

print('...\nMiddle lines (50-75):')
for idx, c in enumerate(clean_list[50:75], start=50):
    print(f"{idx}: [{c['ts']} / {c['sec']}s] {c['text']}")

print('...\nLast lines (150-end):')
for idx, c in enumerate(clean_list[150:], start=150):
    print(f"{idx}: [{c['ts']} / {c['sec']}s] {c['text']}")
