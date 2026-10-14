import urllib.request
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request(
    'https://www.youtube.com/watch?v=lpLFjQ-bRv8',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        player_match = re.search(r'ytInitialPlayerResponse\s*=\s*({.+?});', html)
        if player_match:
            data = json.loads(player_match.group(1))
            tracks = data.get('captions', {}).get('playerCaptionsTracklistRenderer', {}).get('captionTracks', [])
            for t in tracks:
                url = t.get('baseUrl')
                print("Base url:", url)
                sub_req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                with urllib.request.urlopen(sub_req) as s_resp:
                    content = s_resp.read().decode('utf-8')
                    print(f"Content length: {len(content)}, preview: {content[:300]}")
                    with open('scripts/jensen_huang_raw.xml', 'w', encoding='utf-8') as f_out:
                        f_out.write(content)
                    print("Saved xml!")
except Exception as e:
    print('Error:', e)
