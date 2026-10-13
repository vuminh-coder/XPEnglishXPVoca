from youtube_transcript_api import YouTubeTranscriptApi
import urllib.request
import re
import json

video_id = 'QmMHP6JxU4s'
print('Fetching info for', video_id)
url = f'https://www.youtube.com/watch?v={video_id}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

view_m = re.search(r'"viewCount":"(\d+)"', html)
if view_m:
    print('View Count:', view_m.group(1))

length_m = re.search(r'"approxDurationMs":"(\d+)"', html)
if length_m:
    dur_sec = int(length_m.group(1)) // 1000
    print(f'Duration: {dur_sec}s ({dur_sec//60}:{dur_sec%60:02d})')

title_m = re.search(r'"title":"([^"]+)"', html)
if title_m:
    print('Title:', title_m.group(1))

api = YouTubeTranscriptApi()
try:
    transcript = api.fetch(video_id)
    raw = transcript.to_raw_data()
    print(f'Transcript found! Total raw items: {len(raw)}')
    with open('scripts/scratch_forrest_gump_transcript.json', 'w', encoding='utf-8') as f:
        json.dump(raw, f, ensure_ascii=False, indent=2)
except Exception as e:
    print('Transcript error:', e)
