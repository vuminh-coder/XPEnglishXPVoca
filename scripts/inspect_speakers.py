import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

def parse_vtt(path):
    with open(path, 'r', encoding='utf-8') as f:
        vtt_text = f.read()
    cues = []
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
        text = re.sub(r'<[^>]+>', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        if text:
            cues.append({'start': start, 'end': end, 'text': text})
    return cues

en_cues = parse_vtt('scripts/matt_walker_sleep.en.vtt')
vi_cues = parse_vtt('scripts/matt_walker_sleep.vi.vtt')

# Filter non-verbal
non_verbal = {'(Laughter)', '(Applause)', '(Cheering)', '(Music)', '(Tiếng cười)', '(Tiếng vỗ tay)', '(Vỗ tay)'}

# Align en & vi 1:1 first
aligned_cues = []
vi_idx = 0
for i, en in enumerate(en_cues):
    best_vi = None
    best_diff = 999
    for j in range(max(0, vi_idx - 3), min(len(vi_cues), vi_idx + 6)):
        diff = abs(vi_cues[j]['start'] - en['start'])
        if diff < best_diff:
            best_diff = diff
            best_vi = (j, vi_cues[j])
    if best_vi and best_diff < 1.0:
        vi_idx = best_vi[0]
        aligned_cues.append({'start': en['start'], 'end': en['end'], 'en': en['text'], 'vi': best_vi[1]['text']})
    else:
        aligned_cues.append({'start': en['start'], 'end': en['end'], 'en': en['text'], 'vi': ''})

# Clean non-verbal
clean_cues = [c for c in aligned_cues if c['en'] not in non_verbal and c['vi'] not in non_verbal]

print(f"Clean verbal cues: {len(clean_cues)}")

# Let's inspect cues with speaker transitions
for i, c in enumerate(clean_cues):
    if re.search(r'\b(David Biello|Matt Walker|DB|MW):\s*', c['en']):
        print(f"Cue {i} [{c['start']:.2f}-{c['end']:.2f}]: {c['en']}")
