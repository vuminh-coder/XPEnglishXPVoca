import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

import urllib.request
import json
import re

video_id = '1qlLS47uBD4'
url = f'https://www.youtube.com/watch?v={video_id}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

captions_match = re.search(r'"captionTracks":(\[.*?\])', html)
if captions_match:
    data = json.loads(captions_match.group(1))
    for i, t in enumerate(data):
        lang = t.get('languageCode')
        b_url = t.get('baseUrl')
        print(f"Track {i}: lang={lang}")
        
        # Try fetching
        try:
            r = urllib.request.Request(b_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(r) as cr:
                content = cr.read().decode('utf-8')
                with open(f'scripts/youtube_captions_raw_{lang}.xml', 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fetched raw track {lang}, length={len(content)}")
        except Exception as e:
            print(f"Error: {e}")
