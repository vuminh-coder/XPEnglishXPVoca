import json
import yt_dlp
import sys
sys.stdout.reconfigure(encoding='utf-8')

p1 = json.load(open('scripts/verified_playable_picks.json', encoding='utf-8'))
ydl = yt_dlp.YoutubeDL({'skip_download': True, 'quiet': True})
for it in ['mov_insp_07', 'mov_insp_08', 'mov_insp_10']:
    for c in p1.get(it, []):
        try:
            info = ydl.extract_info(f"https://www.youtube.com/watch?v={c['id']}", download=False)
            auto = info.get('automatic_captions', {})
            subs = info.get('subtitles', {})
            has_sub = ('en' in auto) or ('en' in subs)
            print(it, c['id'], c['duration'], 'has_sub:', has_sub, c['title'][:40])
        except Exception as e:
            print(it, c['id'], 'error:', e)
