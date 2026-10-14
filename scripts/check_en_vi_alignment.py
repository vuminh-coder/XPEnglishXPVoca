import sys
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

print(f"EN cues: {len(en_cues)}, VI cues: {len(vi_cues)}")

# Let's see alignment by matching start times or closest times
aligned = []
vi_idx = 0
for i, en in enumerate(en_cues):
    # Find matching vi cue by closest start time
    best_vi = None
    best_diff = 999
    for j in range(max(0, vi_idx - 5), min(len(vi_cues), vi_idx + 10)):
        diff = abs(vi_cues[j]['start'] - en['start'])
        if diff < best_diff:
            best_diff = diff
            best_vi = (j, vi_cues[j])
    if best_vi and best_diff < 1.0:
        vi_idx = best_vi[0]
        aligned.append((en, best_vi[1]))
    else:
        aligned.append((en, None))

matched = sum(1 for en, vi in aligned if vi is not None)
print(f"Matched {matched}/{len(en_cues)} cues by timestamp within 1.0s")

for i in range(10):
    en, vi = aligned[i]
    vi_txt = vi['text'] if vi else 'NONE'
    print(f"[{i}] EN [{en['start']:.2f}]: {en['text']}")
    print(f"    VI: {vi_txt}")
