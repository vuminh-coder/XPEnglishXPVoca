import json

items = json.load(open('scripts/one_day_official_full_transcript.json', encoding='utf-8'))

def parse_ts(ts_str):
    parts = ts_str.split(':')
    if len(parts) == 2:
        return int(parts[0]) * 60 + int(parts[1])
    elif len(parts) == 3:
        return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
    return 0

for i, it in enumerate(items):
    sec = parse_ts(it['timestamp'])
    next_sec = parse_ts(items[i+1]['timestamp']) if i + 1 < len(items) else 604
    print(f"Index {i:02d} | {sec:03d}s - {next_sec:03d}s ({it['timestamp']}) | {it['rawText'][:80]}")
