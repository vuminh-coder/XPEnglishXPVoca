import json
import re

# Read parsed words
with open('scripts/jit_parsed_words.txt', 'r', encoding='utf-8') as f:
    word_lines = [l.strip().split('\t') for l in f if l.strip()]

words = [(float(t), w) for t, w in word_lines]
print(f"Total words: {len(words)}")

# Read official transcript
with open('scripts/jit_bbc_transcript_official.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace unicode quotes
text = text.replace('\u2019', "'").replace('\u2026', '...').replace('\u201c', '"').replace('\u201d', '"').replace('\u2018', "'").replace('\u2013', '–')

print("Official text loaded successfully")
