import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/matt_walker_sleep.en.vtt', 'r', encoding='utf-8') as f:
    en_vtt = f.read()

with open('scripts/matt_walker_sleep.vi.vtt', 'r', encoding='utf-8') as f:
    vi_vtt = f.read()

def parse_vtt(vtt_text):
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

en_cues = parse_vtt(en_vtt)
vi_cues = parse_vtt(vi_vtt)

# Filter non-verbal cues
en_cues_clean = [c for c in en_cues if c['text'] not in ['(Laughter)', '(Applause)']]

print(f"Non-verbal removed: {len(en_cues)} -> {len(en_cues_clean)}")

# Check sentence endings
# A sentence ends if text ends with ., ?, ! or ends with " or ' preceded by punctuation
# Also watch for speaker transitions like DB:, MW:, David Biello:, Matt Walker:
def clean_speaker(text):
    text = re.sub(r'^(DB|MW|CA|David Biello|Matt Walker|Chris Anderson):\s*', '', text)
    return text

# Let's inspect how cues group into full sentences
sentences = []
curr_words = []
curr_cues = []

for cue in en_cues_clean:
    text = cue['text']
    curr_cues.append(cue)
    # Check if end of sentence
    # Ends with ., ?, ! or contains speaker change
    is_speaker_change = bool(re.search(r'\b(DB|MW|CA|David Biello|Matt Walker):\s*', text))
    clean_t = clean_speaker(text)
    
    # Check if ends with terminal punctuation
    ends_punct = bool(re.search(r'[\.\?!]["\']?$', clean_t))
    
    if ends_punct or is_speaker_change:
        # Check gap to next cue if any
        start_t = curr_cues[0]['start']
        end_t = curr_cues[-1]['end']
        combined_text = ' '.join(c['text'] for c in curr_cues)
        sentences.append({
            'start': start_t,
            'end': end_t,
            'text': combined_text,
            'cue_count': len(curr_cues)
        })
        curr_cues = []

if curr_cues:
    sentences.append({
        'start': curr_cues[0]['start'],
        'end': curr_cues[-1]['end'],
        'text': ' '.join(c['text'] for c in curr_cues),
        'cue_count': len(curr_cues)
    })

print(f"Total raw sentences formed: {len(sentences)}")
print("\n--- Last 25 sentences ---")
for i in range(max(0, len(sentences) - 25), len(sentences)):
    print(f"[{i}] [{sentences[i]['start']:.2f} - {sentences[i]['end']:.2f}] (cues: {sentences[i]['cue_count']}): {sentences[i]['text']}")
