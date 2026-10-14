import re

with open('scripts/oxford_meeting.en.vtt', 'r', encoding='utf-8') as f:
    text = f.read()

def parse_ts(ts):
    parts = ts.split(':')
    return float(parts[0])*3600 + float(parts[1])*60 + float(parts[2])

blocks = re.split(r'\n\n+', text.strip())
cues = []
for b in blocks:
    if '-->' in b:
        lines = b.split('\n')
        m = re.match(r'(\d+:\d+:\d+\.\d+)\s+-->\s+(\d+:\d+:\d+\.\d+)', lines[0])
        if m:
            s_sec = parse_ts(m.group(1))
            e_sec = parse_ts(m.group(2))
            if 235.0 <= s_sec <= 338.0:
                content = ' '.join(lines[1:]).strip()
                # fix apostrophes
                content = content.replace('', "'")
                cues.append((s_sec, e_sec, content))

print(f"Total VTT cues in range 235-338s: {len(cues)}")
for s, e, c in cues:
    print(f"[{s:6.2f} -> {e:6.2f}] {c}")
