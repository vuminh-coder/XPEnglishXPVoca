import re

with open('scripts/oxford_meeting.en.vtt', 'r', encoding='utf-8') as f:
    text = f.read()

def parse_ts(ts):
    parts = ts.split(':')
    return float(parts[0])*3600 + float(parts[1])*60 + float(parts[2])

blocks = re.split(r'\n\n+', text.strip())
for b in blocks:
    if '-->' in b:
        lines = b.split('\n')
        m = re.match(r'(\d+:\d+:\d+\.\d+)\s+-->\s+(\d+:\d+:\d+\.\d+)', lines[0])
        if m:
            s_sec = parse_ts(m.group(1))
            e_sec = parse_ts(m.group(2))
            if 230.0 <= s_sec <= 360.0:
                content = ' '.join(lines[1:])
                print(f'{s_sec:6.2f} - {e_sec:6.2f}: {content}')
