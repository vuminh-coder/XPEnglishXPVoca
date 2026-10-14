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

print("Existing 18 segments match cues 0 to 35:")
# Let's list cues 0 to 35 and how they were grouped into 18 segments:
# 0: [cue 0]
# 1: [cue 1]
# 2: [cue 2]
# 3: [cue 3, 4]
# 4: [cue 5, 6]
# 5: [cue 7]
# 6: [cue 8, 9]
# 7: [cue 10, 11]
# 8: [cue 12, 13]
# 9: [cue 14, 15]
# 10: [cue 16, 17]
# 11: [cue 18, 19, 20]
# 12: [cue 21, 22]
# 13: [cue 23, 24]
# 14: [cue 25, 26]
# 15: [cue 27, 28, 29]
# 16: [cue 30, 31, 32]
# 17: [cue 33, 34, 35]

print("\nCues from 36 to 88:")
for i in range(36, len(en_cues)):
    c = en_cues[i]
    print(f"Cue {i:02d}: [{c['start']:6.2f} - {c['end']:6.2f}] {c['text']}")
