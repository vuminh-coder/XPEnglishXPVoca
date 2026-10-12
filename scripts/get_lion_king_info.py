import urllib.request
import re
import json

url = 'https://www.youtube.com/watch?v=HeQTJE99OXo'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print('HTML length:', len(html))
        
        # Save html or inspect ytInitialPlayerResponse
        match = re.search(r'ytInitialPlayerResponse\s*=\s*({.+?});', html)
        if match:
            try:
                data = json.loads(match.group(1))
                videoDetails = data.get('videoDetails', {})
                print("Title:", videoDetails.get('title'))
                print("LengthSeconds:", videoDetails.get('lengthSeconds'))
                print("ShortDescription:\n", videoDetails.get('shortDescription'))
                
                # Check caption tracks
                captions = data.get('captions', {}).get('playerCaptionsTracklistRenderer', {}).get('captionTracks', [])
                print("Caption tracks:", len(captions))
                for c in captions:
                    print(c.get('languageCode'), c.get('name'), c.get('baseUrl'))
            except Exception as e:
                print("Error parsing json:", e)
        else:
            print("No ytInitialPlayerResponse found")

        # Check ytInitialData for chapters
        match_data = re.search(r'ytInitialData\s*=\s*({.+?});</script>', html)
        if match_data:
            print("ytInitialData found")
            with open('scripts/ytInitialData_lionking.json', 'w', encoding='utf-8') as f:
                f.write(match_data.group(1))
except Exception as e:
    print('Error:', e)
