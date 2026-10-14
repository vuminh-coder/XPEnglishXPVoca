import json
import re

def clean_words(s):
    s = re.sub(r'^(David Biello|Matt Walker|DB|MW):\s*', '', s, flags=re.MULTILINE)
    s = s.replace('‘', "'").replace('’', "'").replace('“', '"').replace('”', '"')
    s = s.replace('--', ' ')
    s = re.sub(r'[\'"]+', '', s)
    s = re.sub(r'[^a-zA-Z0-9\s]', ' ', s)
    return [w.strip().lower() for w in s.split() if w.strip()]

with open('scripts/matt_walker_sleep.en.json3', 'r', encoding='utf-8') as f:
    j3 = json.load(f)

raw_words = []
for ev in j3['events']:
    if 'segs' in ev:
        txt = ''.join(s.get('utf8', '') for s in ev['segs']).replace('\n', ' ')
        if txt.strip() not in ['(Laughter)', '(Applause)', '(Cheering)', '(Music)']:
            raw_words.extend(clean_words(txt))

with open('scripts/matt_walker_raw_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

lesson_words = []
for seg in segs:
    lesson_words.extend(clean_words(seg['text']))

print(f'raw_words: {len(raw_words)}')
print(f'lesson_words: {len(lesson_words)}')

for i in range(max(len(raw_words), len(lesson_words))):
    w1 = raw_words[i] if i < len(raw_words) else None
    w2 = lesson_words[i] if i < len(lesson_words) else None
    if w1 != w2:
        print(f'Diff at #{i}: raw={w1} vs lesson={w2}')
        print('Raw context:', raw_words[max(0, i-4):i+5])
        print('Lesson context:', lesson_words[max(0, i-4):i+5])
        break
