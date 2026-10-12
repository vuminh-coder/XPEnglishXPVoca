import yt_dlp
import json
import os
import requests
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

data_p1 = json.load(open('scripts/verified_playable_picks.json', encoding='utf-8'))
data_p2 = json.load(open('scripts/verified_extended_picks.json', encoding='utf-8'))

os.makedirs('scripts/subtitles_27', exist_ok=True)

def get_candidates(item_id):
    c1 = data_p1.get(item_id, [])
    c2 = data_p2.get(item_id, [])
    seen = set()
    combined = []
    for c in c1 + c2:
        if c['id'] not in seen:
            seen.add(c['id'])
            combined.append(c)
    # Filter only duration >= 300 and views >= 100k
    valid = [c for c in combined if c['duration'] >= 300 and c['views'] >= 100000]
    valid.sort(key=lambda x: x['views'], reverse=True)
    return valid

items_to_process = [
    # Sitcoms (4)
    "mov_sit_07", "mov_sit_08", "mov_sit_09", "mov_sit_11",
    # Inspirational (11)
    "mov_insp_01", "mov_insp_02", "mov_insp_03", "mov_insp_04", "mov_insp_05", 
    "mov_insp_06", "mov_insp_07", "mov_insp_08", "mov_insp_09", "mov_insp_10", "mov_insp_12",
    # Animation (12)
    "mov_ani_01", "mov_ani_02", "mov_ani_03", "mov_ani_04", "mov_ani_05", "mov_ani_06",
    "mov_ani_07", "mov_ani_08", "mov_ani_09", "mov_ani_10", "mov_ani_11", "mov_ani_12"
]

ydl_opts = {
    'skip_download': True,
    'quiet': True,
    'no_warnings': True,
}

final_selected_lessons = {}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    for it in items_to_process:
        cands = get_candidates(it)
        print(f"\n==========================================")
        print(f"Processing {it} ({len(cands)} candidates available)...")
        print(f"==========================================")
        
        success_info = None
        
        for cand in cands:
            vid = cand['id']
            clean_title = cand['title'].encode('ascii', 'ignore').decode('ascii')
            print(f"Trying candidate: {vid} ({cand['duration']}s | {cand['views']:,} views) - {clean_title[:50]}...")
            
            try:
                video_info = ydl.extract_info(f"https://www.youtube.com/watch?v={vid}", download=False)
                subs = video_info.get('subtitles', {})
                auto_subs = video_info.get('automatic_captions', {})
                
                sub_url = None
                sub_type = None
                
                # Check official subs
                for lang in ['en', 'en-US', 'en-GB', 'en-orig']:
                    if lang in subs:
                        for fmt in subs[lang]:
                            if fmt.get('ext') == 'json3':
                                sub_url = fmt.get('url')
                                sub_type = f"official_{lang}_json3"
                                break
                    if sub_url: break
                    
                # Check auto subs
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
                            
                print(f"   -> Success! Extracted {len(events)} events (subType: {sub_type})")
                
                # Save subtitle file
                out_file = f"scripts/subtitles_27/{it}_{vid}.json"
                with open(out_file, 'w', encoding='utf-8') as f:
                    json.dump({
                        'itemId': it,
                        'vid': vid,
                        'title': cand['title'],
                        'duration': cand['duration'],
                        'views': cand['views'],
                        'subType': sub_type,
                        'events': events
                    }, f, indent=2, ensure_ascii=False)
                
                success_info = {
                    'itemId': it,
                    'externalId': vid,
                    'title': cand['title'],
                    'durationSeconds': cand['duration'],
                    'views': cand['views'],
                    'subType': sub_type,
                    'eventCount': len(events),
                    'subtitleFile': out_file
                }
                break # candidate succeeded! Move to next item
                
            except Exception as e:
                print(f"   -> Candidate failed: {str(e)[:100]}")
                continue
                
        if success_info:
            final_selected_lessons[it] = success_info
            print(f"==> SELECTED FOR {it}: {success_info['externalId']}")
        else:
            print(f"==> ERROR: NO CANDIDATE SUCCEEDED FOR {it}!")

with open('scripts/all_27_final_selected_with_subs.json', 'w', encoding='utf-8') as f:
    json.dump(final_selected_lessons, f, indent=2, ensure_ascii=False)

print(f"\nCOMPLETED: {len(final_selected_lessons)}/27 items successfully matched and extracted!")
