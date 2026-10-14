import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Read en.vtt and vi.vtt
with open('scripts/matt_walker_sleep.en.vtt', 'r', encoding='utf-8') as f:
    en_vtt = f.read()

with open('scripts/matt_walker_sleep.vi.vtt', 'r', encoding='utf-8') as f:
    vi_vtt = f.read()

def parse_vtt(vtt_text):
    cues = []
    # Match cues
    pattern = re.compile(r'(\d{2}:\d{2}:\d{2}\.\d{3}|\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3}|\d{2}:\d{2}\.\d{3})\s*\n([\s\S]*?)(?=\n\n|\Z)')
    
    def to_secs(ts):
        parts = ts.split(':')
        if len(parts) == 3:
            return float(parts[0]) * 3600 + float(parts[1]) * 60 + float(parts[2])
        elif len(parts) == 2:
            return float(parts[0]) * 60 + float(parts[1])
        return 0.0

    for m in pattern.finditer(vtt_text):
        start = to_secs(m.group(1))
        end = to_secs(m.group(2))
        text = m.group(3).strip()
        # Clean tags like <c.color...>, </c>, <v ...>
        text = re.sub(r'<[^>]+>', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        if text:
            cues.append({'start': start, 'end': end, 'text': text})
    return cues

en_cues = parse_vtt(en_vtt)
vi_cues = parse_vtt(vi_vtt)

print(f"EN cues: {len(en_cues)}")
print(f"VI cues: {len(vi_cues)}")

for i in range(min(5, len(en_cues))):
    print(f"EN [{en_cues[i]['start']:.2f} - {en_cues[i]['end']:.2f}]: {en_cues[i]['text']}")
for i in range(min(5, len(vi_cues))):
    print(f"VI [{vi_cues[i]['start']:.2f} - {vi_cues[i]['end']:.2f}]: {vi_cues[i]['text']}")
