import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Read en.vtt & vi.vtt
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

non_verbal = {'(Laughter)', '(Applause)', '(Cheering)', '(Music)', '(Tiếng cười)', '(Tiếng vỗ tay)', '(Vỗ tay)'}

# Align en & vi
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

clean_cues = [c for c in aligned_cues if c['en'] not in non_verbal and c['vi'] not in non_verbal]

# Expand special cues
expanded = []
for c in clean_cues:
    if "Matt Walker: You're welcome." in c['en'] and "DB: Yes, thank you, thank you." in c['en']:
        mid = round((c['start'] + c['end']) / 2, 2)
        expanded.append({
            'start': c['start'], 'end': mid,
            'en': "You're welcome.",
            'vi': "Không có gì.",
            'speaker': 'MW'
        })
        expanded.append({
            'start': mid, 'end': c['end'],
            'en': "Yes, thank you, thank you.",
            'vi': "Vâng, cảm ơn, cảm ơn anh.",
            'speaker': 'DB'
        })
    elif "Great job, Matt." in c['en']:
        expanded.append({
            'start': c['start'], 'end': c['end'],
            'en': "Great job, Matt.",
            'vi': "Làm tốt lắm, Matt.",
            'speaker': 'DB'
        })
    else:
        speaker = 'MW'
        if re.search(r'\b(David Biello|DB):\s*', c['en']):
            speaker = 'DB'
        clean_en = re.sub(r'^(David Biello|Matt Walker|DB|MW):\s*', '', c['en']).strip()
        clean_vi = re.sub(r'^(David Biello|Matt Walker|DB|MW):\s*', '', c['vi']).strip()
        expanded.append({
            'start': c['start'], 'end': c['end'],
            'en': clean_en, 'vi': clean_vi,
            'speaker': speaker
        })

print(f"Total expanded cues: {len(expanded)}")

# Group into natural sentences
raw_groups = []
curr = []

for i, c in enumerate(expanded):
    curr.append(c)
    words = (' '.join(x['en'] for x in curr)).split()
    ends_punct = bool(re.search(r'[\.\?!]["\']?$', c['en']))
    
    next_diff_spk = False
    gap = 0
    if i + 1 < len(expanded):
        if expanded[i+1]['speaker'] != c['speaker']:
            next_diff_spk = True
        gap = expanded[i+1]['start'] - c['end']
        
    # Grouping conditions:
    # 1. Next speaker is different
    # 2. Ends with sentence punctuation AND has at least 5 words OR gap > 1.8s
    # 3. Exceeds 32 words and ends with comma or natural clause boundary
    if next_diff_spk:
        raw_groups.append(curr)
        curr = []
    elif ends_punct and (len(words) >= 6 or gap > 1.5):
        raw_groups.append(curr)
        curr = []
    elif len(words) >= 30 and (ends_punct or re.search(r'[,;:]$', c['en'])):
        raw_groups.append(curr)
        curr = []

if curr:
    raw_groups.append(curr)

print(f"Raw sentence groups: {len(raw_groups)}")

# Save to json for inspection
out_segs = []
for idx, grp in enumerate(raw_groups):
    s_time = round(grp[0]['start'], 2)
    e_time = round(grp[-1]['end'], 2)
    en_txt = ' '.join(x['en'] for x in grp).strip()
    vi_txt = ' '.join(x['vi'] for x in grp if x['vi']).strip()
    en_txt = re.sub(r'\s+', ' ', en_txt)
    vi_txt = re.sub(r'\s+', ' ', vi_txt)
    spk = grp[0]['speaker']
    out_segs.append({
        'orderIndex': idx,
        'startTime': s_time,
        'endTime': e_time,
        'text': en_txt,
        'translationVi': vi_txt,
        'speaker': spk
    })

with open('scripts/matt_walker_raw_segments.json', 'w', encoding='utf-8') as f:
    json.dump(out_segs, f, ensure_ascii=False, indent=2)

print(f"Saved {len(out_segs)} segments to scripts/matt_walker_raw_segments.json")
