import re
import json

def parse_vtt(fpath):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    blocks = content.split('\n\n')
    cues = []
    seen = set()

    for b in blocks:
        lines = [l.strip() for l in b.strip().split('\n') if l.strip()]
        if not lines or lines[0].startswith('WEBVTT') or lines[0].startswith('Kind:') or lines[0].startswith('Language:'):
            continue
        
        # Find timestamp line
        ts_line_idx = -1
        for i, l in enumerate(lines):
            if '-->' in l:
                ts_line_idx = i
                break
        if ts_line_idx == -1:
            continue
        
        m = re.match(r'(\d+:\d+:\d+\.\d+)\s*-->\s*(\d+:\d+:\d+\.\d+)', lines[ts_line_idx])
        if not m:
            continue
        
        def to_sec(ts):
            parts = ts.split(':')
            return int(parts[0]) * 3600 + int(parts[1]) * 60 + float(parts[2])

        st = to_sec(m.group(1))
        et = to_sec(m.group(2))
        
        text_lines = lines[ts_line_idx + 1:]
        clean_text_lines = []
        for tl in text_lines:
            # remove word-level tags like <00:00:00.280><c>
            cleaned = re.sub(r'<[^>]+>', '', tl).strip()
            if cleaned:
                clean_text_lines.append(cleaned)
        
        # take the last non-empty line or join
        if clean_text_lines:
            t = clean_text_lines[-1]
            if t not in seen:
                seen.add(t)
                cues.append({'start': round(st, 2), 'end': round(et, 2), 'text': t})

    return cues

cues = parse_vtt('scripts/jensen_huang_auto.en.vtt')
print(f"Total raw parsed cues: {len(cues)}")
for i, c in enumerate(cues):
    print(f"{i:2d}: [{c['start']:6.2f} - {c['end']:6.2f}] {c['text']}")
