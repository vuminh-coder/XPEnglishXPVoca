# -*- coding: utf-8 -*-
import re

with open('scripts/subs/sLHx2vVa1HA.en.vtt', 'r', encoding='utf-8') as f:
    text = f.read()

def vtt_to_sec(ts):
    p = ts.split(':')
    return int(p[0])*3600 + int(p[1])*60 + float(p[2])

blocks = text.split('\n\n')
raw_cues = []
for b in blocks:
    lines = [l.strip() for l in b.split('\n') if l.strip()]
    if not lines:
        continue
    cue_line = None
    for l in lines:
        if '-->' in l:
            cue_line = l
            break
    if not cue_line:
        continue
    m = re.match(r'(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})', cue_line)
    if not m:
        continue
    start_sec = vtt_to_sec(m.group(1))
    end_sec = vtt_to_sec(m.group(2))
    content_lines = lines[lines.index(cue_line)+1:]
    cue_text = ' '.join(content_lines)
    cue_text = re.sub(r'<[^>]+>', '', cue_text).strip()
    if cue_text and cue_text != '[Music]':
        raw_cues.append((start_sec, end_sec, cue_text))

print(f"Total raw non-music cues: {len(raw_cues)}")

# Let's inspect deduplicated text stream
cleaned = []
for s, e, t in raw_cues:
    if not cleaned:
        cleaned.append([s, e, t])
    else:
        prev_s, prev_e, prev_t = cleaned[-1]
        if t == prev_t:
            cleaned[-1][1] = max(prev_e, e)
        elif t.startswith(prev_t):
            cleaned[-1][1] = max(prev_e, e)
            cleaned[-1][2] = t
        else:
            cleaned.append([s, e, t])

print(f"Total unique cues: {len(cleaned)}")
with open('scripts/me_before_you_clean_cues.txt', 'w', encoding='utf-8') as out:
    for i, (s, e, t) in enumerate(cleaned):
        m_s = int(s // 60)
        sec_s = int(s % 60)
        m_e = int(e // 60)
        sec_e = int(e % 60)
        line = f"[{i:03d}] {m_s:02d}:{sec_s:02d} - {m_e:02d}:{sec_e:02d} ({s:.1f}s - {e:.1f}s): {t}\n"
        out.write(line)

print("Saved clean cues to scripts/me_before_you_clean_cues.txt")
