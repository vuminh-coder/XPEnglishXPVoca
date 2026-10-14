import urllib.request
import json
import re
import sys
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')

video_id = 'Uky-jgd3M3E'
url = f'https://www.youtube.com/watch?v={video_id}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    title_m = re.search(r'<title>(.*?)</title>', html)
    page_title = title_m.group(1) if title_m else 'Unknown'
    print('Title:', page_title)
    
    cap_m = re.search(r'"captionTracks":(\[.*?\])', html)
    if cap_m:
        data = json.loads(cap_m.group(1))
        print(f'Found {len(data)} caption tracks')
        for idx, t in enumerate(data):
            print(f"  Track {idx}: lang={t.get('languageCode')} name={t.get('name', {}).get('simpleText')} kind={t.get('kind')}")
            
        en_track = next((t for t in data if t.get('languageCode') == 'en' and t.get('kind') != 'asr'), None)
        if not en_track:
            en_track = next((t for t in data if t.get('languageCode') == 'en'), data[0])
            
        base_url = en_track.get('baseUrl')
        print('Base URL:', base_url[:80])
        # Try both direct and with &fmt=srv1 or &fmt=json3
        cap_url = base_url + '&fmt=json3' if '&fmt=' not in base_url else base_url
        cap_req = urllib.request.Request(cap_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(cap_req) as cr:
            raw_content = cr.read().decode('utf-8')
            print('Downloaded bytes:', len(raw_content))
            try:
                js_data = json.loads(raw_content)
                events = js_data.get('events', [])
                subs = []
                for ev in events:
                    if 'segs' in ev:
                        start = ev.get('tStartMs', 0) / 1000.0
                        dur = ev.get('dDurationMs', 0) / 1000.0
                        txt = ''.join([s.get('utf8', '') for s in ev['segs']]).strip()
                        if txt and txt != '\n':
                            subs.append({'start': round(start, 2), 'end': round(start + dur, 2), 'text': txt})
                print(f'JSON3 fetched {len(subs)} lines!')
                with open('scripts/inside_out_raw_captions.json', 'w', encoding='utf-8') as f:
                    json.dump({'videoId': video_id, 'title': page_title, 'captions': subs}, f, ensure_ascii=False, indent=2)
                print('Saved to scripts/inside_out_raw_captions.json')
            except Exception as e_json:
                print('JSON parse error:', e_json)
                root = ET.fromstring(raw_content)
    else:
        print('No captionTracks found via regex in HTML')
except Exception as e:
    print('Error:', e)
