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

lines = text.split('\n')
i = 0
items = []

while i < len(lines):
    line = lines[i].strip()
    m = re.match(r'(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})', line)
    if m:
        start = parse_time(m.group(1))
        end = parse_time(m.group(2))
        i += 1
        content_lines = []
        while i < len(lines) and lines[i].strip() and not re.match(r'(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->', lines[i]):
            clean = re.sub(r'<[^>]+>', '', lines[i])
            clean = clean.replace('&gt;&gt;', '')
            clean = clean.replace('&#39;', "'")
            clean = clean.replace('&quot;', '"')
            clean = clean.replace('&amp;', '&').strip()
            if clean:
                content_lines.append(clean)
            i += 1
        text_block = ' '.join(content_lines).strip()
        if text_block:
            items.append({'start': round(start, 2), 'end': round(end, 2), 'text': text_block})
    else:
        i += 1

# Rolling deduplication: YouTube VTT often has duplicate lines
cleaned_items = []
last_text = ""
for item in items:
    # Filter out pure noise/repeats
    t = item['text']
    # If the text starts with the last text, or is repeated
    if t != last_text:
        # Also clean up duplicate phrases inside single line if repeated
        cleaned_items.append(item)
        last_text = t

print(f"Total parsed raw cues: {len(items)}")
print(f"Total deduplicated cues: {len(cleaned_items)}")

with open('scripts/notebook_raw_cues.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_items, f, ensure_ascii=False, indent=2)

for idx, it in enumerate(cleaned_items[:30]):
    print(f"[{idx:02d}] {it['start']:06.1f}s - {it['end']:06.1f}s: {it['text']}")
