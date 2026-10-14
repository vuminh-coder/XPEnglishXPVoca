import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

sub_en = json.load(open('scripts/simon_sinek_ted.en.json3', encoding='utf-8'))
events_en = [e for e in sub_en['events'] if e.get('tStartMs', 0) >= 16000 and e.get('tStartMs', 0) <= 351260 and e.get('segs')]

for idx, e in enumerate(events_en):
    t_start = e['tStartMs'] / 1000.0
    t_dur = e.get('dDurationMs', 0) / 1000.0
    t_end = t_start + t_dur
    txt = ''.join([s.get('utf8', '') for s in e.get('segs', [])]).replace('\n', ' ').strip()
    print(f"[{idx:03d}] {t_start:06.2f} -> {t_end:06.2f} ({t_dur:04.2f}s): {txt}")
