import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/ted_bilingual_brain.en.json3', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

en_cues = []
for ev in en_data.get('events', []):
    segs = ev.get('segs', [])
    text = ''.join([s.get('utf8', '') for s in segs]).replace('\n', ' ').strip()
    if text:
        t_start = ev.get('tStartMs', 0) / 1000.0
        d_dur = ev.get('dDurationMs', 0) / 1000.0
        en_cues.append({'start': round(t_start, 2), 'end': round(t_start + d_dur, 2), 'text': text})

grouping = [
    [0], [1], [2], [3, 4], [5, 6], [7], [8, 9], [10, 11], [12, 13], [14, 15],
    [16, 17], [18, 19, 20], [21, 22], [23, 24], [25, 26], [27, 28, 29], [30, 31, 32], [33, 34, 35],
    [36, 37], [38, 39], [40, 41, 42], [43, 44, 45, 46], [47, 48], [49, 50], [51, 52, 53],
    [54, 55], [56, 57], [58, 59, 60], [61], [62, 63, 64], [65, 66, 67], [68, 69],
    [70, 71], [72, 73, 74], [75, 76, 77], [78, 79, 80], [81, 82], [83, 84, 85], [86, 87, 88]
]

segments = []
for idx, g in enumerate(grouping):
    c_start = en_cues[g[0]]['start']
    c_end = en_cues[g[-1]]['end']
    txt = ' '.join([en_cues[i]['text'] for i in g]).replace('  ', ' ')
    segments.append({'orderIndex': idx, 'start': c_start, 'end': c_end, 'text': txt})

def clean_words(s):
    s = s.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    s = s.replace('--', ' ').replace('—', ' ').replace("'", "")
    s = re.sub(r'[\?¿!,.:;"\(\)]+', ' ', s)
    return [w.strip().lower() for w in s.split() if w.strip()]

all_raw_text = ' '.join([c['text'] for c in en_cues])
raw_words = clean_words(all_raw_text)

lesson_words = []
for s in segments:
    lesson_words.extend(clean_words(s['text']))

print(f"Raw words count: {len(raw_words)}")
print(f"Lesson words count: {len(lesson_words)}")

if raw_words == lesson_words:
    print("VERBATIM MATCH 100%: ZERO DIFFS!")
else:
    print("DIFFS DETECTED:")
    for i in range(max(len(raw_words), len(lesson_words))):
        rw = raw_words[i] if i < len(raw_words) else "<EOF>"
        lw = lesson_words[i] if i < len(lesson_words) else "<EOF>"
        if rw != lw:
            print(f"Mismatch at index {i}: raw='{rw}', lesson='{lw}'")
            break
