import json
import re

with open('scripts/notebook_extracted_words.json', 'r', encoding='utf-8') as f:
    words = json.load(f)

# Let's inspect the entire sequence of words and their times
print(f"Total words: {len(words)}")

# Group words into clean sentences
# Print every 20 words with timestamps
for i in range(0, len(words), 25):
    chunk = words[i:i+25]
    t_start = chunk[0]['time']
    t_end = chunk[-1]['time']
    text = ' '.join([w['word'] for w in chunk])
    print(f"[{t_start:05.1f}s - {t_end:05.1f}s]: {text}")
