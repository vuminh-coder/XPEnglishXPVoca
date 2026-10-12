import re
import json

def parse_time(t_str):
    parts = t_str.split(':')
    h = int(parts[0])
    m = int(parts[1])
    s = float(parts[2])
    return h * 3600 + m * 60 + s

with open('scripts/subs/Y5hVdlRFAUo.en.vtt', 'r', encoding='utf-8') as f:
    text = f.read()

blocks = text.split('\n\n')
all_cues = []

for block in blocks:
    lines = [l.strip() for l in block.split('\n') if l.strip()]
    if len(lines) < 2:
        continue
    m = re.search(r'(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})', lines[0])
    content_lines = lines[1:]
    if not m and len(lines) > 2:
        m = re.search(r'(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})', lines[1])
        content_lines = lines[2:]
    if not m:
        continue
    start = parse_time(m.group(1))
    end = parse_time(m.group(2))
    
    clean_lines = []
    for line in content_lines:
        c = re.sub(r'<[^>]+>', '', line)
        c = c.replace('&gt;&gt;', '').replace('&#39;', "'").replace('&quot;', '"').replace('&amp;', '&').strip()
        if c:
            clean_lines.append(c)
    text_c = ' '.join(clean_lines).strip()
    if text_c:
        all_cues.append({'start': round(start, 2), 'end': round(end, 2), 'text': text_c})

print(f"Total parsed cues: {len(all_cues)}")

# Let's inspect cues between 330s and 430s
print("\n--- CUES BETWEEN 330s and 430s ---")
for c in all_cues:
    if 330 <= c['start'] <= 430:
        print(f"[{c['start']:06.1f}s - {c['end']:06.1f}s]: {c['text']}")

# Let's inspect cues between 460s and 510s
print("\n--- CUES BETWEEN 460s and 510s ---")
for c in all_cues:
    if 460 <= c['start'] <= 510:
        print(f"[{c['start']:06.1f}s - {c['end']:06.1f}s]: {c['text']}")

# Let's inspect cues between 650s and 730s
print("\n--- CUES BETWEEN 650s and 730s ---")
for c in all_cues:
    if 650 <= c['start'] <= 730:
        print(f"[{c['start']:06.1f}s - {c['end']:06.1f}s]: {c['text']}")
