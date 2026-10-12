import yt_dlp
import json
import os
import requests
import re

replacements = json.load(open('scripts/final_27_replacements_selected.json', encoding='utf-8'))
os.makedirs('scripts/subtitles_27', exist_ok=True)

ydl_opts = {
    'skip_download': True,
    'quiet': True,
    'no_warnings': True,
}

sub_summary = {}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    for item_id, info in replacements.items():
        vid = info['id']
        print(f"[{item_id}] Fetching subtitles for {vid} ({info['title'][:40]})...")
        try:
            video_info = ydl.extract_info(f"https://www.youtube.com/watch?v={vid}", download=False)
            subs = video_info.get('subtitles', {})
            auto_subs = video_info.get('automatic_captions', {})
            
            sub_url = None
            sub_type = None
            
            # Prefer official en
            for lang in ['en', 'en-US', 'en-GB', 'en-orig']:
                if lang in subs:
                    for fmt in subs[lang]:
                        if fmt.get('ext') == 'json3':
                            sub_url = fmt.get('url')
                            sub_type = f"official_{lang}_json3"
                            break
                        elif fmt.get('ext') == 'vtt' and not sub_url:
                            sub_url = fmt.get('url')
                            sub_type = f"official_{lang}_vtt"
                if sub_url: break
                
            # Fallback to auto captions
            if not sub_url:
                for lang in ['en', 'en-US', 'en-GB']:
                    if lang in auto_subs:
                        for fmt in auto_subs[lang]:
                            if fmt.get('ext') == 'json3':
                                sub_url = fmt.get('url')
                                sub_type = f"auto_{lang}_json3"
                                break
                            elif fmt.get('ext') == 'vtt' and not sub_url:
                                sub_url = fmt.get('url')
                                sub_type = f"auto_{lang}_vtt"
                    if sub_url: break
            
            events = []
            if sub_url:
                resp = requests.get(sub_url, timeout=10)
                if 'json3' in sub_type:
                    data = resp.json()
                    raw_events = data.get('events', [])
                    for ev in raw_events:
                        t_start = ev.get('tStartMs', 0) / 1000.0
                        d_dur = ev.get('dDurationMs', 0) / 1000.0
                        t_end = t_start + d_dur
                        text = "".join([s.get('utf8', '') for s in ev.get('segs', [])]).strip()
                        text = re.sub(r'\s+', ' ', text)
                        if text and text != '\n':
                            events.append({'start': t_start, 'end': t_end, 'text': text})
                elif 'vtt' in sub_type:
                    lines = resp.text.splitlines()
                    # simple vtt parser
                    # ...
                    pass
                print(f"  -> {sub_type}: {len(events)} segments extracted")
            else:
                print(f"  -> NO captions found on YouTube")
                
            out_file = f"scripts/subtitles_27/{item_id}_{vid}.json"
            with open(out_file, 'w', encoding='utf-8') as f:
                json.dump({'info': info, 'subType': sub_type, 'events': events}, f, indent=2, ensure_ascii=False)
                
            sub_summary[item_id] = {
                'id': vid,
                'subType': sub_type,
                'eventCount': len(events),
                'file': out_file
            }
        except Exception as e:
            print(f"  -> ERROR: {e}")
            sub_summary[item_id] = {'id': vid, 'error': str(e)}

with open('scripts/subtitles_27_summary.json', 'w', encoding='utf-8') as f:
    json.dump(sub_summary, f, indent=2, ensure_ascii=False)

print("\nFinished extracting subtitles!")
