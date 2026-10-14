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

# Grouping definitions: list of cue index ranges (inclusive)
grouping = [
    [0],        # Seg 0
    [1],        # Seg 1
    [2],        # Seg 2
    [3, 4],     # Seg 3
    [5, 6],     # Seg 4
    [7],        # Seg 5
    [8, 9],     # Seg 6
    [10, 11],   # Seg 7
    [12, 13],   # Seg 8
    [14, 15],   # Seg 9
    [16, 17],   # Seg 10
    [18, 19, 20],# Seg 11
    [21, 22],   # Seg 12
    [23, 24],   # Seg 13
    [25, 26],   # Seg 14
    [27, 28, 29],# Seg 15
    [30, 31, 32],# Seg 16
    [33, 34, 35],# Seg 17
    # Remaining:
    [36, 37],   # Seg 18
    [38, 39],   # Seg 19
    [40, 41, 42],# Seg 20
    [43, 44, 45, 46],# Seg 21
    [47, 48],   # Seg 22
    [49, 50],   # Seg 23
    [51, 52, 53],# Seg 24
    [54, 55],   # Seg 25
    [56, 57],   # Seg 26
    [58, 59, 60],# Seg 27
    [61],       # Seg 28
    [62, 63, 64],# Seg 29
    [65, 66, 67],# Seg 30
    [68, 69],   # Seg 31
    [70, 71],   # Seg 32
    [72, 73, 74],# Seg 33
    [75, 76, 77],# Seg 34
    [78, 79, 80],# Seg 35
    [81, 82],   # Seg 36
    [83, 84, 85],# Seg 37
    [86, 87, 88],# Seg 38
]

# Verify all cues 0..88 covered exactly once
covered = []
for g in grouping:
    covered.extend(g)
assert covered == list(range(len(en_cues))), f"Missing or duplicate cues! Covered {len(covered)} vs {len(en_cues)}"

print(f"Total Master Segments: {len(grouping)}")

segments = []
for idx, g in enumerate(grouping):
    c_start = en_cues[g[0]]['start']
    c_end = en_cues[g[-1]]['end']
    txt = ' '.join([en_cues[i]['text'] for i in g]).replace('  ', ' ')
    dur = round(c_end - c_start, 2)
    segments.append({'orderIndex': idx, 'start': c_start, 'end': c_end, 'duration': dur, 'text': txt})

for s in segments:
    print(f"Seg {s['orderIndex']:02d} [{s['start']:6.2f} -> {s['end']:6.2f} ({s['duration']:5.2f}s)]: {s['text'][:75]}...")
