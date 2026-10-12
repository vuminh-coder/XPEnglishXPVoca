import json
import re

with open('scripts/walle_transcript_full.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def parse_time(ts_str):
    parts = list(map(int, ts_str.split(':')))
    if len(parts) == 2:
        return parts[0] * 60 + parts[1]
    elif len(parts) == 3:
        return parts[0] * 3600 + parts[1] * 60 + parts[2]
    return 0

cleaned_cues = []
for i, s in enumerate(data['segments']):
    raw = s['text']
    ts = s['timestamp']
    sec = parse_time(ts)
    
    # Strip leading time strings
    cleaned = re.sub(r'^\d+\s*minutes?,?\s*\d*\s*seconds?\s*', '', raw, flags=re.I)
    cleaned = re.sub(r'^\d+\s*seconds?\s*', '', cleaned, flags=re.I).strip()
    
    # Filter out pure music cues
    if cleaned in ['[Music]', '[Applause]', '']:
        continue
        
    cleaned_cues.append({
        'index': i,
        'timestamp': ts,
        'seconds': sec,
        'text': cleaned
    })

print(f"Total cleaned dialogue cues: {len(cleaned_cues)}")
for c in cleaned_cues:
    print(f"[{c['index']:02d}] {c['timestamp']} ({c['seconds']}s): {c['text']}")

with open('scripts/walle_cleaned_cues.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_cues, f, ensure_ascii=False, indent=2)
print("Saved to scripts/walle_cleaned_cues.json")
