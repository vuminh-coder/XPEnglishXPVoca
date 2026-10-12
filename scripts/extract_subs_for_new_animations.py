import yt_dlp
import json
import requests
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

new_anims = {
    'mov_ani_01': ('SAY6Mptrj5s', 1652, 2453009, "Learn English with Kung Fu Panda [Intermediate Lesson]"),
    'mov_ani_02': ('D635dqEmcfY', 1592, 785382, "Learn ENGLISH with INSIDE OUT — First Day of School"),
    'mov_ani_03': ('e1Mno2A2N5E', 1402, 1119240, "Learn English with Disney+ | Soul [Advanced Lesson]"),
    'mov_ani_04': ('8WRjQAKUlio', 1421, 3090371, "Learn English with RATATOUILLE — Remy Meets Linguini"),
    'mov_ani_05': ('EQ9RFbIHrFw', 978, 835393, "Learn English With Disney Movies | Coco [Advanced Lesson]"),
    'mov_ani_06': ('0zbPeoZzcPg', 1446, 1608833, "Learn English with UP — Disney Movie"),
    'mov_ani_07': ('FikAJxtVgOY', 1676, 5918376, "Learn English with Zootopia"),
    'mov_ani_08': ('HeQTJE99OXo', 1444, 1453059, "Learn English with The Lion King | DISNEY CLASSICS"),
    'mov_ani_11': ('bpqVe3GvUZU', 677, 5067131, "WALL-E CLIP COMPILATION (2008) Pixar"),
    'mov_ani_12': ('_kafLt9bNyU', 1059, 277436, "Learn English with MONSTERS INC.")
}

ydl = yt_dlp.YoutubeDL({'skip_download': True, 'quiet': True})

for item_id, (vid, dur, views, title) in new_anims.items():
    print(f"[{item_id}] Extracting subs for {vid} ({title[:35]})...")
    try:
        info = ydl.extract_info(f"https://www.youtube.com/watch?v={vid}", download=False)
        subs = info.get('subtitles', {})
        auto_subs = info.get('automatic_captions', {})
        
        sub_url = None
        sub_type = None
        for lang in ['en', 'en-US', 'en-GB', 'en-orig']:
            if lang in subs:
                for fmt in subs[lang]:
                    if fmt.get('ext') == 'json3':
                        sub_url = fmt.get('url')
                        sub_type = f"official_{lang}_json3"
                        break
            if sub_url: break
            
        if not sub_url:
            for lang in ['en', 'en-US', 'en-GB']:
                if lang in auto_subs:
                    for fmt in auto_subs[lang]:
                        if fmt.get('ext') == 'json3':
                            sub_url = fmt.get('url')
                            sub_type = f"auto_{lang}_json3"
                            break
                if sub_url: break
                
        events = []
        if sub_url:
            resp = requests.get(sub_url, timeout=10)
            data = resp.json()
            for ev in data.get('events', []):
                t_start = ev.get('tStartMs', 0) / 1000.0
                d_dur = ev.get('dDurationMs', 0) / 1000.0
                t_end = t_start + d_dur
                text = "".join([s.get('utf8', '') for s in ev.get('segs', [])]).strip()
                text = re.sub(r'\s+', ' ', text)
                if text and text != '\n':
                    events.append({'start': t_start, 'end': t_end, 'text': text})
        print(f"  -> {sub_type}: {len(events)} events extracted")
        
        out_file = f"scripts/subtitles_27/{item_id}_{vid}.json"
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump({
                'itemId': item_id,
                'vid': vid,
                'title': title,
                'duration': dur,
                'views': views,
                'subType': sub_type,
                'events': events
            }, f, indent=2, ensure_ascii=False)
            
    except Exception as e:
        print(f"  -> ERROR: {e}")

print("Completed extracting new animation subs!")
