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

# Handle cue 284 with 2 speakers:
# Matt Walker: You're welcome. DB: Yes, thank you, thank you.
expanded_cues = []
for c in clean_cues:
    if "Matt Walker: You're welcome." in c['en'] and "DB: Yes, thank you, thank you." in c['en']:
        mid_time = round((c['start'] + c['end']) / 2, 2)
        expanded_cues.append({
            'start': c['start'],
            'end': mid_time,
            'en': "You're welcome.",
            'vi': "Không có chi.",
            'speaker': 'MW'
        })
        expanded_cues.append({
            'start': mid_time,
            'end': c['end'],
            'en': "Yes, thank you, thank you.",
            'vi': "Vâng, cảm ơn, cảm ơn anh.",
            'speaker': 'DB'
        })
    else:
        # Check speaker tag
        en_text = c['en']
        speaker = 'MW'
        if re.search(r'\b(David Biello|DB):\s*', en_text):
            speaker = 'DB'
        elif re.search(r'\b(Matt Walker|MW):\s*', en_text):
            speaker = 'MW'
        
        # Clean speaker prefixes
        clean_en = re.sub(r'^(David Biello|Matt Walker|DB|MW):\s*', '', en_text).strip()
        clean_vi = re.sub(r'^(David Biello|Matt Walker|DB|MW):\s*', '', c['vi']).strip()
        
        expanded_cues.append({
            'start': c['start'],
            'end': c['end'],
            'en': clean_en,
            'vi': clean_vi,
            'speaker': speaker
        })

print(f"Total expanded verbal cues: {len(expanded_cues)}")

# Now group into natural sentences
segments = []
curr_cues = []

def finish_group(cues_group):
    if not cues_group:
        return None
    start_t = round(cues_group[0]['start'], 2)
    end_t = round(cues_group[-1]['end'], 2)
    en_full = ' '.join(c['en'] for c in cues_group).strip()
    vi_full = ' '.join(c['vi'] for c in cues_group if c['vi']).strip()
    # Normalize spaces around punctuation
    en_full = re.sub(r'\s+', ' ', en_full)
    vi_full = re.sub(r'\s+', ' ', vi_full)
    speaker = cues_group[0]['speaker']
    return {
        'start': start_t,
        'end': end_t,
        'en': en_full,
        'vi': vi_full,
        'speaker': speaker
    }

for i, cue in enumerate(expanded_cues):
    curr_cues.append(cue)
    
    # Check if end of sentence
    # Ends with ., ?, ! or ellipsis followed by capital
    ends_punct = bool(re.search(r'[\.\?!]["\']?$', cue['en']))
    
    # Check next cue speaker
    next_speaker_diff = False
    if i + 1 < len(expanded_cues):
        if expanded_cues[i+1]['speaker'] != cue['speaker']:
            next_speaker_diff = True
        # Gap > 2.5s
        if expanded_cues[i+1]['start'] - cue['end'] > 2.5:
            ends_punct = True

    # Word count of current group
    words = (' '.join(c['en'] for c in curr_cues)).split()
    
    if (ends_punct and len(words) >= 4) or next_speaker_diff or len(words) >= 35:
        seg = finish_group(curr_cues)
        if seg:
            segments.append(seg)
        curr_cues = []

if curr_cues:
    seg = finish_group(curr_cues)
    if seg:
        segments.append(seg)

print(f"Total natural segments formed: {len(segments)}")

# Print sample segments
for i in range(12):
    s = segments[i]
    print(f"[{i}] [{s['start']:.2f}s - {s['end']:.2f}s] ({s['speaker']}): {s['en']}")
    print(f"     VI: {s['vi']}")

print("\n--- Last 8 segments ---")
for i in range(max(0, len(segments) - 8), len(segments)):
    s = segments[i]
    print(f"[{i}] [{s['start']:.2f}s - {s['end']:.2f}s] ({s['speaker']}): {s['en']}")
    print(f"     VI: {s['vi']}")
