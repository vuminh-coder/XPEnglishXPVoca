import urllib.request
import json
import re

url = 'https://www.youtube.com/watch?v=9lo1ncSInLI'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')

matches = re.findall(r'"captionTracks":(\[.*?\])', html)
print('Caption tracks matches found:', len(matches))
if matches:
    tracks = json.loads(matches[0])
    for t in tracks:
        print("Track:", t.get('vssId'), t.get('languageCode'), t.get('name', {}).get('simpleText'), t.get('baseUrl')[:60])
        # Download first track
        track_url = t.get('baseUrl') + '&fmt=json3'
        track_req = urllib.request.Request(track_url, headers={'User-Agent': 'Mozilla/5.0'})
        cap_json = urllib.request.urlopen(track_req).read().decode('utf-8')
        with open('scripts/eternal_sunshine_raw_captions.json', 'w', encoding='utf-8') as f:
            f.write(cap_json)
        print("Saved scripts/eternal_sunshine_raw_captions.json successfully!")
else:
    print("No direct captionTracks in HTML. Checking playerCaptionsTracklistRenderer...")
    m2 = re.findall(r'"playerCaptionsTracklistRenderer":(\{.*?\})', html)
    print("playerCaptionsTracklistRenderer found:", len(m2))
