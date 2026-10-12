import re, glob, json

def parse_vtt(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    has_word_tags = '<c>' in content
    time_pat = re.compile(r'(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})\.(\d{3})')
    def to_secs(h, m, s, ms):
        return int(h)*3600 + int(m)*60 + int(s) + int(ms)/1000.0

    lines = content.splitlines()
    cues = []
    cur_start, cur_end = None, None
    if has_word_tags:
        for line in lines:
            m = time_pat.search(line)
            if m:
                cur_start = to_secs(m.group(1), m.group(2), m.group(3), m.group(4))
                cur_end = to_secs(m.group(5), m.group(6), m.group(7), m.group(8))
            elif cur_start is not None and '<c>' in line:
                clean_text = re.sub(r'<[^>]+>', '', line).strip()
                if clean_text: cues.append((cur_start, cur_end, clean_text))
    else:
        cur_text = []
        for line in lines:
            m = time_pat.search(line)
            if m:
                if cur_start is not None and cur_text:
                    t = ' '.join(cur_text).strip()
                    if t: cues.append((cur_start, cur_end, t))
                cur_start = to_secs(m.group(1), m.group(2), m.group(3), m.group(4))
                cur_end = to_secs(m.group(5), m.group(6), m.group(7), m.group(8))
                cur_text = []
            elif cur_start is not None:
                t = line.strip()
                if t and not t.startswith('NOTE') and not t.isdigit():
                    cur_text.append(t)
        if cur_start is not None and cur_text:
            t = ' '.join(cur_text).strip()
            if t: cues.append((cur_start, cur_end, t))
            
    # merge into coherent phrases
    phrases = []
    buf = []
    p_start = None
    p_end = None
    for s, e, txt in cues:
        if p_start is None: p_start = s
        p_end = e
        buf.append(txt)
        combined = ' '.join(buf)
        if (p_end - p_start >= 4.0 and any(combined.endswith(x) for x in ['.', '?', '!', ',', '--'])) or (p_end - p_start >= 8.0) or len(combined.split()) >= 14:
            phrases.append({'start': round(p_start, 1), 'end': round(p_end, 1), 'text': combined})
            buf = []
            p_start = None
    if buf:
        phrases.append({'start': round(p_start, 1), 'end': round(p_end, 1), 'text': ' '.join(buf)})
    return phrases

meta = {
    'iUB-sCiZIUw': 'About Time',
    'QV1tiEDvkkw': 'Before Trilogy',
    'gW0xteHHXrY': 'La La Land',
    'Y5hVdlRFAUo': 'The Notebook',
    'baGBRtR53TA': 'Pride & Prejudice',
    'sLHx2vVa1HA': 'Me Before You',
    'ESI7jRy2yAk': 'One Day',
    'AS47hWRO0bw': '500 Days of Summer',
    'OSqS2ESN_ys': 'Titanic',
    '9lo1ncSInLI': 'Eternal Sunshine',
    'sM4rv42qyvk': 'Notting Hill',
    'KTUvOpY89RE': 'Flipped'
}

for vid, name in meta.items():
    phr = parse_vtt(f'scripts/subs/{vid}.en.vtt')
    print(f"=== {name} ({vid}): {len(phr)} phrases ===")
    for p in phr[:3]:
        s, e, t = p['start'], p['end'], p['text']
        print(f"   [{s}s - {e}s]: {t[:80]}")
