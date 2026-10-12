# -*- coding: utf-8 -*-
"""
Parse and generate 100% Pure Segments (Zero Merged Utterances) for 500 Days of Summer (AS47hWRO0bw).
Duration: 10:24 (624s)
"""
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/summer_panel_raw_text.txt', 'r', encoding='utf-8') as f:
    raw_lines = [l.strip() for l in f if l.strip()]

# Parse timestamps and texts
# Format in file:
# 0:01
# 1 second
# text text text
# 0:09 ...

items = []
i = 0
while i < len(raw_lines):
    line = raw_lines[i]
    m = re.match(r'^(\d+):(\d{2})$', line)
    if m:
        mins = int(m.group(1))
        secs = int(m.group(2))
        total_sec = mins * 60 + secs
        
        # next line might be duration text like "1 second", "9 seconds", etc.
        text_lines = []
        i += 1
        while i < len(raw_lines) and not re.match(r'^\d+:\d{2}$', raw_lines[i]) and not raw_lines[i].startswith('Chapter'):
            if not re.search(r'^\d+\s*(second|minute|hour)', raw_lines[i], re.I) and not raw_lines[i].startswith('[Music]') and not raw_lines[i].startswith('[Applause]'):
                text_lines.append(raw_lines[i])
            i += 1
        
        content = " ".join(text_lines).strip()
        if content:
            items.append({
                "time": total_sec,
                "text": content
            })
    else:
        i += 1

print(f"Extracted {len(items)} raw time-aligned blocks from panel text.")
for idx, it in enumerate(items[:10]):
    print(f"  {idx}: [{it['time']}s] {it['text'][:60]}")

with open('scripts/summer_extracted_blocks.json', 'w', encoding='utf-8') as out:
    json.dump(items, out, ensure_ascii=False, indent=2)
