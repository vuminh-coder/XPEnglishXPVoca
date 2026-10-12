import yt_dlp
import json
import os

queries = {
    # SITCOMS (4 items)
    'mov_sit_07': 'How I Met Your Mother Barney Stinson best moments scenes',
    'mov_sit_08': 'Brooklyn Nine Nine Jake Peralta funniest moments interrogations',
    'mov_sit_09': 'The Big Bang Theory Sheldon Cooper funniest scenes roommate agreement',
    'mov_sit_11': 'Ted Lasso best moments darts scene be curious',

    # INSPIRATIONAL (11 items)
    'mov_insp_01': 'Good Will Hunting park bench monologue best scene Robin Williams Matt Damon',
    'mov_insp_02': 'The Pursuit of Happyness Will Smith protect your dream best scenes',
    'mov_insp_03': 'Dead Poets Society Robin Williams Carpe Diem O Captain best scene',
    'mov_insp_04': 'The Shawshank Redemption Morgan Freeman Tim Robbins get busy living best scenes',
    'mov_insp_05': 'Forrest Gump life is like a box of chocolates Tom Hanks best scenes',
    'mov_insp_06': 'The Intern Robert De Niro Anne Hathaway best scenes wisdom',
    'mov_insp_07': 'Whiplash Miles Teller JK Simmons not my tempo best scene',
    'mov_insp_08': 'The Theory of Everything Eddie Redmayne Stephen Hawking speech scene',
    'mov_insp_09': 'A Beautiful Mind Russell Crowe Nobel prize speech scene',
    'mov_insp_10': 'Cast Away Tom Hanks Chuck Noland Wilson best scenes',
    'mov_insp_12': '12 Angry Men Juror 8 Henry Fonda reasonable doubt scene',

    # ANIMATION (12 items)
    'mov_ani_01': 'Kung Fu Panda Master Oogway wisdom peach tree scene',
    'mov_ani_02': 'Inside Out Joy Sadness Anxiety core memories best scene',
    'mov_ani_03': 'Soul Pixar Joe Gardner 22 spark piano scene',
    'mov_ani_04': 'Ratatouille Anton Ego review Remy cooking best scene',
    'mov_ani_05': 'Coco Remember Me Mama Coco Miguel best scenes',
    'mov_ani_06': 'Up Pixar Carl Ellie adventure book married life scene',
    'mov_ani_07': 'Zootopia Judy Nick try everything confession best scenes',
    'mov_ani_08': 'The Lion King Simba Mufasa Rafiki remember who you are scene',
    'mov_ani_09': 'Finding Nemo Dory just keep swimming Marlin best scenes',
    'mov_ani_10': 'Tangled Rapunzel Flynn Rider lantern scene I see the light',
    'mov_ani_11': 'WALL-E Captain earth plant Eva best scenes',
    'mov_ani_12': 'Monsters Inc Sulley Mike Boo goodbye scene'
}

ydl_opts = {
    'skip_download': True,
    'quiet': True,
    'no_warnings': True,
    'extract_flat': 'in_playlist'
}

candidates_by_item = {}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    for item_id, q in queries.items():
        print(f"Searching for {item_id}: '{q}'...")
        search_query = f"ytsearch10:{q}"
        try:
            res = ydl.extract_info(search_query, download=False)
            entries = res.get('entries', [])
            matched = []
            for e in entries:
                if not e:
                    continue
                dur = e.get('duration') or 0
                views = e.get('view_count') or 0
                vid = e.get('id')
                title = e.get('title', '')
                
                # Check >= 300s (5 min) and views >= 100k
                if dur >= 300 and views >= 100000:
                    matched.append({
                        'id': vid,
                        'title': title,
                        'duration': dur,
                        'views': views
                    })
            candidates_by_item[item_id] = matched
            print(f"  -> Found {len(matched)} candidates with dur >= 300s & views >= 100k")
        except Exception as err:
            print(f"  -> Search error: {err}")
            candidates_by_item[item_id] = []

with open('scripts/replacement_candidates.json', 'w', encoding='utf-8') as f:
    json.dump(candidates_by_item, f, indent=2, ensure_ascii=False)

print("Saved candidates to scripts/replacement_candidates.json")
