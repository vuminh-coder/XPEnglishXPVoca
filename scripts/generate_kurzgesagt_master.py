import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load raw subtitles
with open('scripts/kurzgesagt_raw.en.json3', 'r', encoding='utf-8') as f:
    sub = json.load(f)

raw_events = []
for e in sub.get('events', []):
    if not e.get('segs'):
        continue
    t = ''.join(s.get('utf8', '') for s in e['segs']).strip().replace('\n', ' ')
    if t:
        start = round(e['tStartMs'] / 1000.0, 2)
        end = round((e['tStartMs'] + e.get('dDurationMs', 0)) / 1000.0, 2)
        raw_events.append({
            'start': start,
            'end': end,
            'text': t
        })

print(f"Total raw events: {len(raw_events)}")

# Load existing 21 calibrated segments
with open('scripts/kurzgesagt_21_calibrated.json', 'r', encoding='utf-8') as f:
    calib_21 = json.load(f)

print(f"Loaded {len(calib_21)} calibrated segments")

# Define full segMap for 58 segments
segMap = [
  # Segments 1..21 (raw lines 0..32)
  [0], [1, 2], [3, 4], [5, 6], [7], [8], [9, 10], [11], [12], [13],
  [14, 15], [16, 17], [18, 19], [20, 21, 22], [23], [24], [25], [26],
  [27, 28], [29], [30, 31, 32],
  # Segments 22..58 (raw lines 33..99)
  [33, 34, 35],
  [36, 37],
  [38, 39],
  [40],
  [41],
  [42, 43],
  [44, 45],
  [46],
  [47],
  [48, 49, 50],
  [51, 52],
  [53],
  [54, 55],
  [56],
  [57, 58],
  [59, 60],
  [61, 62, 63],
  [64],
  [65],
  [66, 67],
  [68, 69],
  [70],
  [71, 72],
  [73, 74],
  [75, 76],
  [77],
  [78, 79],
  [80, 81, 82],
  [83, 84],
  [85, 86],
  [87, 88],
  [89],
  [90, 91],
  [92, 93],
  [94, 95],
  [96, 97, 98],
  [99]
]

print(f"Total segments defined in segMap: {len(segMap)}")

# Print texts for segments 22..58 to review
for seg_idx in range(21, len(segMap)):
    indices = segMap[seg_idx]
    text = ' '.join(raw_events[i]['text'] for i in indices)
    st = raw_events[indices[0]]['start']
    et = raw_events[indices[-1]]['end']
    print(f"Seg {seg_idx+1:02d}: [{st:6.2f} - {et:6.2f}] {text}")
