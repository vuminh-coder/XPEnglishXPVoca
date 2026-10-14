# -*- coding: utf-8 -*-
import json
import re

with open('scripts/julian_treasure.en.json3', encoding='utf-8') as f:
    rawJson = json.load(f)

def clean_words(s):
    s = s.replace('’', "'").replace('‘', "'").replace('”', '"').replace('“', '"')
    s = s.replace('--', ' ').replace("'", '').replace('"', '')
    s = re.sub(r'[^a-zA-Z0-9\s]', ' ', s)
    return [w.strip().lower() for w in s.split() if w.strip()]

events = [e for e in rawJson.get('events', []) if 'segs' in e and e.get('tStartMs', 0) >= 13900]
raw_words = []
for e in events:
    txt = ''.join(s.get('utf8', '') for s in e['segs']).replace('\n', ' ')
    txt = re.sub(r'\(Laughter\)|\(Applause\)|\(Higher pitch\)|\(Loud\)', '', txt)
    raw_words.extend(clean_words(txt))

with open('features/listening/data/lessons/lesson_julian_treasure.ts', encoding='utf-8') as f:
    content = f.read()

seg_texts = re.findall(r'"text":\s*"((?:\\.|[^"\\])*)"', content)
lesson_words = []
for t in seg_texts:
    t_clean = t.replace('\\"', '"')
    lesson_words.extend(clean_words(t_clean))

print(f"raw_words count: {len(raw_words)}")
print(f"lesson_words count: {len(lesson_words)}")
if raw_words == lesson_words:
    print("PERFECT 100% MATCH! Zero diffs across the entire talk!")
else:
    print(f"Difference of {abs(len(raw_words) - len(lesson_words))} words.")
    min_len = min(len(raw_words), len(lesson_words))
    for i in range(min_len):
        if raw_words[i] != lesson_words[i]:
            print(f"First diff at index {i}: raw='{raw_words[i]}' vs lesson='{lesson_words[i]}'")
            print("raw context:   ", raw_words[max(0, i-4):i+5])
            print("lesson context:", lesson_words[max(0, i-4):i+5])
            break
