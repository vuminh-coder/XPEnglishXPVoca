import json

with open('scripts/notebook_extracted_words.json', 'r', encoding='utf-8') as f:
    words = json.load(f)

print(f"Total words: {len(words)}")
print(f"Start time of first word: {words[0]['time']}s: {words[0]['word']}")
print(f"End time of last word: {words[-1]['time']}s: {words[-1]['word']}")

# Let's inspect the distribution of words across the 804 seconds timeline
# Group words into sentence-like clusters when gap > 1.5 seconds
sentences = []
cur_words = []
cur_start = words[0]['time']
prev_time = words[0]['time']

for w in words:
    if w['time'] - prev_time > 2.5 and cur_words:
        sentences.append({
            'start': cur_start,
            'end': prev_time + 1.0,
            'text': ' '.join([x['word'] for x in cur_words])
        })
        cur_words = [w]
        cur_start = w['time']
    else:
        cur_words.append(w)
    prev_time = w['time']

if cur_words:
    sentences.append({
        'start': cur_start,
        'end': prev_time + 1.0,
        'text': ' '.join([x['word'] for x in cur_words])
    })

print(f"\nTotal sentence clusters: {len(sentences)}")
for i, s in enumerate(sentences):
    print(f"[{i:02d}] {s['start']:06.1f}s - {s['end']:06.1f}s ({len(s['text'].split())} w): {s['text'][:80]}...")

with open('scripts/notebook_sentence_clusters.json', 'w', encoding='utf-8') as f:
    json.dump(sentences, f, ensure_ascii=False, indent=2)
