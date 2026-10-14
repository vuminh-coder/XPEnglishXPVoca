import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Read json3
with open('scripts/matt_walker_sleep.en.json3', 'r', encoding='utf-8') as f:
    j3_data = json.load(f)

# Extract words from json3
j3_events = j3_data.get('events', [])
j3_words = []
for ev in j3_events:
    segs = ev.get('segs', [])
    text = ''.join(s.get('utf8', '') for s in segs).strip()
    if not text:
        continue
    # Remove non-verbal
    if text in ['(Laughter)', '(Applause)', '(Cheering)', '(Music)']:
        continue
    # Clean speaker tags: DB:, MW:, David Biello:, Matt Walker:
    text = re.sub(r'\b(David Biello|Matt Walker|DB|MW):\s*', '', text)
    # Tokenize words
    words = re.findall(r'[A-Za-z0-9_\']+', text)
    j3_words.extend(words)

# Read segments
with open('scripts/matt_walker_raw_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

seg_words = []
for s in segs:
    text = s['text']
    words = re.findall(r'[A-Za-z0-9_\']+', text)
    seg_words.extend(words)

print(f"Total words in JSON3: {len(j3_words)}")
print(f"Total words in Segments: {len(seg_words)}")

# Compare word by word
diffs = []
for i in range(max(len(j3_words), len(seg_words))):
    w1 = j3_words[i] if i < len(j3_words) else '<MISSING>'
    w2 = seg_words[i] if i < len(seg_words) else '<MISSING>'
    if w1.lower() != w2.lower():
        diffs.append((i, w1, w2))

print(f"Total word diffs: {len(diffs)}")
for i, w1, w2 in diffs[:20]:
    ctx1 = ' '.join(j3_words[max(0, i-3):i+4])
    ctx2 = ' '.join(seg_words[max(0, i-3):i+4])
    print(f"Diff at #{i}: JSON3='{w1}' vs SEG='{w2}'")
    print(f"   J3:  {ctx1}")
    print(f"   SEG: {ctx2}")
