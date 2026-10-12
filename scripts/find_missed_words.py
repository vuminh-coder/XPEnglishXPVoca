import json
import re

with open('scripts/all_50_notebook_segments.json', 'r', encoding='utf-8') as f:
    segments = json.load(f)

with open('scripts/notebook_extracted_words.json', 'r', encoding='utf-8') as f:
    all_words = json.load(f)

# Let's inspect each word in all_words and see if it's captured in any segment!
seg_all_text = ' '.join([s['text'].lower() for s in segments])
# remove punctuation
seg_words_clean = set(re.findall(r'\b[a-z0-9]+\b', seg_all_text))

unmatched = []
for w in all_words:
    clean_w = re.sub(r'[^a-z0-9]', '', w['word'].lower())
    if clean_w and clean_w not in seg_words_clean:
        unmatched.append(w)

print(f"Total words in video: {len(all_words)}")
print(f"Total unique words in segments: {len(seg_words_clean)}")
print(f"Unmatched words count: {len(unmatched)}")
print("\nSample unmatched words:")
for u in unmatched[:50]:
    print(f"[{u['time']:06.1f}s]: {u['word']}")

with open('scripts/notebook_unmatched_words.json', 'w', encoding='utf-8') as f:
    json.dump(unmatched, f, ensure_ascii=False, indent=2)
