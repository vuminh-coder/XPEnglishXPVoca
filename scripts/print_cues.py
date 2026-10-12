import sys
from inspect_all_phrases import parse_vtt

vid = sys.argv[1] if len(sys.argv) > 1 else 'iUB-sCiZIUw'
phr = parse_vtt(f'scripts/subs/{vid}.en.vtt')
print(f"Total phrases: {len(phr)} for {vid}")
for i, p in enumerate(phr):
    print(f"{i:02d} [{p['start']}s - {p['end']}s]: {p['text']}")
