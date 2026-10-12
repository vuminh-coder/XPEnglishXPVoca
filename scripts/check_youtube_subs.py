import urllib.request
import json
import re
import xml.etree.ElementTree as ET

video_id = '1qlLS47uBD4'
url = f'https://www.youtube.com/watch?v={video_id}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        
    title_match = re.search(r'<title>(.*?)</title>', html)
    page_title = title_match.group(1) if title_match else 'Unknown'

    captions_match = re.search(r'"captionTracks":(\[.*?\])', html)
    if captions_match:
        data = json.loads(captions_match.group(1))
        track = data[0]
        caption_url = track.get('baseUrl')
        
        cap_req = urllib.request.Request(caption_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(cap_req) as cap_resp:
            xml_data = cap_resp.read().decode('utf-8')
            root = ET.fromstring(xml_data)
            
            subs = []
            for text_el in root.findall('.//text'):
                start = float(text_el.get('start', '0'))
                dur = float(text_el.get('dur', '0'))
                text = "".join(text_el.itertext()).strip()
                # Unescape HTML entities
                text = text.replace('&quot;', '"').replace('&#39;', "'").replace('&amp;', '&')
                subs.append({
                    'start': start,
                    'end': round(start + dur, 2),
                    'dur': dur,
                    'text': text
                })
            
            output = {
                'videoId': video_id,
                'pageTitle': page_title,
                'captionLanguage': track.get('languageCode'),
                'totalCaptions': len(subs),
                'captions': subs
            }
            
            with open('scripts/youtube_captions_dump.json', 'w', encoding='utf-8') as f:
                json.dump(output, f, ensure_ascii=False, indent=2)
            print(f"SUCCESS: Dumped {len(subs)} captions to scripts/youtube_captions_dump.json")
    else:
        print("No captionTracks found")
except Exception as e:
    print('Error:', e)
