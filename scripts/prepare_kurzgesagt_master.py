import json

def main():
    with open('scripts/kurzgesagt_raw.en.json3', 'r', encoding='utf-8') as f:
        sub = json.load(f)

    raw_lines = []
    for e in sub.get('events', []):
        if not e.get('segs'):
            continue
        text = ''.join(s.get('utf8', '') for s in e.get('segs', [])).strip().replace('\n', ' ')
        if text:
            start = e.get('tStartMs', 0) / 1000.0
            duration = e.get('dDurationMs', 0) / 1000.0
            raw_lines.append({
                'idx': len(raw_lines),
                'start': start,
                'end': round(start + duration, 2),
                'text': text
            })

    print(f"Total raw lines: {len(raw_lines)}")
    for i in range(33, min(100, len(raw_lines))):
        l = raw_lines[i]
        print(f"line[{i:2d}]: [{l['start']:6.2f} - {l['end']:6.2f}] {l['text']}")

if __name__ == '__main__':
    main()
