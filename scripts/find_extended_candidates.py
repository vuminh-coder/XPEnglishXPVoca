import yt_dlp
import json

queries = {
    'mov_insp_02': [
        'The Pursuit of Happyness best scenes Will Smith',
        'The Pursuit of Happyness full scene English Will Smith'
    ],
    'mov_insp_12': [
        '12 Angry Men best scenes Henry Fonda',
        '12 Angry Men full scene English 1957'
    ],
    'mov_ani_08': [
        'The Lion King best scenes English Simba',
        'The Lion King iconic scenes Simba Mufasa'
    ],
    'mov_ani_10': [
        'Tangled best scenes Rapunzel Flynn Rider',
        'Tangled funny moments scenes English'
    ],
    'mov_ani_12': [
        'Monsters Inc best moments scenes Mike Sulley',
        'Monsters Inc funny moments English'
    ],
    'mov_insp_01': [
        'Good Will Hunting best scenes Robin Williams Matt Damon',
    ],
    'mov_insp_03': [
        'Dead Poets Society best moments Robin Williams',
    ],
    'mov_insp_04': [
        'The Shawshank Redemption best moments Morgan Freeman',
    ],
    'mov_insp_05': [
        'Forrest Gump best moments Tom Hanks',
    ],
    'mov_ani_01': [
        'Kung Fu Panda best moments Master Oogway Po',
    ],
    'mov_ani_02': [
        'Inside Out best scenes Joy Sadness',
    ],
    'mov_ani_06': [
        'Up Pixar best scenes Carl Russell',
    ],
    'mov_sit_09': [
        'The Big Bang Theory Sheldon Cooper funniest moments compilation',
    ]
}

ydl_opts = {
    'skip_download': True,
    'quiet': True,
    'no_warnings': True,
    'extract_flat': 'in_playlist'
}

extended_candidates = {}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    for item_id, q_list in queries.items():
        matched = []
        for q in q_list:
            print(f"Searching {item_id}: '{q}'...")
            try:
                res = ydl.extract_info(f"ytsearch10:{q}", download=False)
                for e in res.get('entries', []):
                    if not e: continue
                    dur = e.get('duration') or 0
                    views = e.get('view_count') or 0
                    vid = e.get('id')
                    title = e.get('title', '')
                    if dur >= 300 and views >= 100000:
                        matched.append({
                            'id': vid,
                            'title': title,
                            'duration': dur,
                            'views': views
                        })
            except Exception as err:
                print(f"  Error: {err}")
        extended_candidates[item_id] = matched
        print(f"  -> Total found for {item_id}: {len(matched)}")

with open('scripts/extended_candidates.json', 'w', encoding='utf-8') as f:
    json.dump(extended_candidates, f, indent=2, ensure_ascii=False)
print("Saved to scripts/extended_candidates.json")
