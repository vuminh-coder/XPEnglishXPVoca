import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

# 1. Parse en.json3 cues
with open('scripts/ted_bilingual_brain.en.json3', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

en_cues = []
for ev in en_data.get('events', []):
    segs = ev.get('segs', [])
    text = ''.join([s.get('utf8', '') for s in segs]).replace('\n', ' ').strip()
    if text:
        t_start = ev.get('tStartMs', 0) / 1000.0
        d_dur = ev.get('dDurationMs', 0) / 1000.0
        en_cues.append({'start': round(t_start, 2), 'end': round(t_start + d_dur, 2), 'text': text})

# 2. Parse vi.vtt cues
with open('scripts/ted_bilingual_brain.vi.vtt', 'r', encoding='utf-8') as f:
    vi_lines = f.read().splitlines()

vi_cues = []
current_time = None
current_text = []

def parse_time(ts):
    parts = ts.split(':')
    if len(parts) == 3:
        h, m, s = parts
        return round(int(h)*3600 + int(m)*60 + float(s), 2)
    elif len(parts) == 2:
        m, s = parts
        return round(int(m)*60 + float(s), 2)
    return 0.0

for line in vi_lines:
    line = line.strip()
    if '-->' in line:
        if current_time and current_text:
            vi_cues.append({'start': current_time[0], 'end': current_time[1], 'text': ' '.join(current_text)})
        m = re.match(r'([0-9:.]+)\s*-->\s*([0-9:.]+)', line)
        if m:
            current_time = (parse_time(m.group(1)), parse_time(m.group(2)))
            current_text = []
    elif current_time:
        if line and not line.startswith('WEBVTT') and not line.startswith('Kind:') and not line.startswith('Language:') and not line.startswith('Translator:') and not line.startswith('Reviewer:'):
            current_text.append(line)

if current_time and current_text:
    vi_cues.append({'start': current_time[0], 'end': current_time[1], 'text': ' '.join(current_text)})

print(f"EN cues: {len(en_cues)}, VI cues: {len(vi_cues)}")

# Let's inspect alignment
for i in range(min(15, len(en_cues))):
    en = en_cues[i]
    # find vi cues that overlap
    matching_vi = [v['text'] for v in vi_cues if (v['start'] <= en['end'] and v['end'] >= en['start'])]
    print(f"[{en['start']:6.2f} - {en['end']:6.2f}] EN: {en['text']}")
    print(f"                   VI: {' / '.join(matching_vi)}")
