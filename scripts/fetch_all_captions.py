import urllib.request
import json
import re
import os

vids = {
    'mov_insp_07': 'gfceCnMJZ3c',
    'mov_insp_08': '0RdvRJGl-_w',
    'mov_insp_10': 'zXGaEMlRw5M',
    'mov_ani_01': 'SAY6Mptrj5s',
    'mov_ani_02': 'D635dqEmcfY',
    'mov_ani_03': 'e1Mno2A2N5E',
    'mov_ani_04': '8WRjQAKUlio',
    'mov_ani_05': 'EQ9RFbIHrFw',
    'mov_ani_06': '0zbPeoZzcPg',
    'mov_ani_07': 'FikAJxtVgOY',
    'mov_ani_08': 'HeQTJE99OXo',
    'mov_ani_09': '2Q1gTWxZcj0',
    'mov_ani_10': 'uQ2rJKiiRiU',
    'mov_ani_11': 'bpqVe3GvUZU',
    'mov_ani_12': '_kafLt9bNyU'
}

os.makedirs('scripts/subtitles_27', exist_ok=True)
hdr = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for k, vid in vids.items():
    out_file = f'scripts/subtitles_27/{k}_{vid}.json'
    if os.path.exists(out_file) and os.path.getsize(out_file) > 1000:
        print(f"Skipping {k} ({vid}) - already downloaded ({os.path.getsize(out_file)} bytes)")
        continue
    try:
        url = f'https://www.youtube.com/watch?v={vid}'
        req = urllib.request.Request(url, headers=hdr)
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        matches = re.findall(r'"captionTracks":(\[.*?\])', html)
        if matches:
            tracks = json.loads(matches[0])
            en_tracks = [t for t in tracks if 'en' in t.get('vssId', '') or 'en' in t.get('languageCode', '')]
            target_track = en_tracks[0] if en_tracks else tracks[0]
            base_url = target_track.get('baseUrl') + '&fmt=json3'
            
            cap_req = urllib.request.Request(base_url, headers=hdr)
            cap_data = urllib.request.urlopen(cap_req, timeout=10).read().decode('utf-8', errors='ignore')
            with open(out_file, 'w', encoding='utf-8') as f:
                f.write(cap_data)
            print(f"Downloaded {k} ({vid}): {len(cap_data)} bytes")
        else:
            print(f"No captionTracks for {k} ({vid})")
    except Exception as e:
        print(f"Error for {k} ({vid}): {e}")
