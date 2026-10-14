import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

# Load cmudict
cmu_words = set()
with open('scripts/cmudict.dict', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        word = line.split()[0].lower()
        word = re.sub(r'\(\d+\)$', '', word)
        cmu_words.add(word)

# Load transcript
with open('scripts/ted_bilingual_brain.en.json3', 'r', encoding='utf-8') as f:
    data = json.load(f)

events = data.get('events', [])
all_text = []
for ev in events:
    segs = ev.get('segs', [])
    txt = ''.join([s.get('utf8', '') for s in segs]).replace('\n', ' ')
    all_text.append(txt)
full_text = ' '.join(all_text)

raw_words = re.findall(r'\b[A-Za-z0-9_\'\’\-]+\b', full_text)
clean_unique_words = sorted(list(set([w.lower().replace("'", "").replace("’", "").replace("-", "") for w in raw_words if w.strip()])))

missing = []
for w in clean_unique_words:
    if w not in cmu_words:
        missing.append(w)

print(f"Total unique words: {len(clean_unique_words)}")
print(f"Missing in cmudict ({len(missing)}):")
for m in missing:
    print(f"  - {m}")
