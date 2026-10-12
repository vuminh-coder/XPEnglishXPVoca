import yt_dlp
import requests
import json
import xml.etree.ElementTree as ET

vid = "_kafLt9bNyU"
ydl = yt_dlp.YoutubeDL({'skip_download': True, 'quiet': True})
info = ydl.extract_info(f"https://www.youtube.com/watch?v={vid}", download=False)

print(f"Title: {info.get('title')}")
print(f"Duration: {info.get('duration')}s")

auto_subs = info.get('automatic_captions', {})
subs = info.get('subtitles', {})

found_vtt = None
found_srv = None
found_json3 = None

for lang in ['en', 'en-US', 'en-GB']:
    target = subs.get(lang) or auto_subs.get(lang)
    if target:
        for fmt in target:
            ext = fmt.get('ext')
            url = fmt.get('url')
            if ext == 'vtt' and not found_vtt:
                found_vtt = (lang, url)
            elif ext == 'srv3' and not found_srv:
                found_srv = (lang, url)
            elif ext == 'json3' and not found_json3:
                found_json3 = (lang, url)

print(f"found_vtt: {bool(found_vtt)}, found_srv: {bool(found_srv)}, found_json3: {bool(found_json3)}")

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

if found_vtt:
    lang, url = found_vtt
    r = requests.get(url, headers=headers, timeout=15)
    print(f"VTT Status: {r.status_code}, len: {len(r.text)}")
    with open("scripts/monsters_inc.vtt", "w", encoding="utf-8") as f:
        f.write(r.text)
    print("Saved scripts/monsters_inc.vtt")

if found_json3:
    lang, url = found_json3
    r = requests.get(url, headers=headers, timeout=15)
    print(f"JSON3 Status: {r.status_code}, len: {len(r.text)}")
    with open("scripts/monsters_inc_raw.json", "w", encoding="utf-8") as f:
        f.write(r.text)
    print("Saved scripts/monsters_inc_raw.json")
