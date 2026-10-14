import json
import re

segs = json.load(open('scripts/kurzgesagt_master_58_segments.json', encoding='utf-8'))

def dictation_tokens(sentence):
    raw_words = sentence.strip().split()
    tokens = []
    for raw in raw_words:
        clean = re.sub(r'^[^\w]+|[^\w]+$', '', raw)
        if clean:
            tokens.append(clean)
    return tokens

diff_count = 0
total_tokens = 0
for s in segs:
    dt = len(dictation_tokens(s['text']))
    t_regex = len(re.findall(r'\b[A-Za-z0-9_]+\b', s['text']))
    total_tokens += dt
    if t_regex != dt:
        print(f"Seg {s['orderIndex']}: regex={t_regex} vs dictation={dt} | text=\"{s['text']}\"")
        diff_count += 1

print(f"Total tokens: {total_tokens}")
print(f"Done. Diffs between regex and dictation tokens: {diff_count}")
