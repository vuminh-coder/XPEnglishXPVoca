import yt_dlp
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

targets = {
    'mov_ani_01': 'Learn English with Kung Fu Panda',
    'mov_ani_02': 'Learn English with Inside Out',
    'mov_ani_03': 'Learn English with Soul Pixar',
    'mov_ani_04': 'Learn English with Ratatouille',
    'mov_ani_05': 'Learn English with Coco Pixar',
    'mov_ani_06': 'Learn English with Up Pixar',
    'mov_ani_07': 'Learn English with Zootopia',
    'mov_ani_08': 'Learn English with The Lion King',
    'mov_ani_11': 'Learn English with WALL-E Pixar',
    'mov_ani_12': 'Learn English with Monsters Inc'
}

ydl = yt_dlp.YoutubeDL({'skip_download': True, 'quiet': True, 'extract_flat': 'in_playlist'})
found = {}

for it, q in targets.items():
    res = ydl.extract_info(f'ytsearch6:{q}', download=False)
    matches = []
    for e in res.get('entries', []):
        if not e: continue
        dur = e.get('duration') or 0
        views = e.get('view_count') or 0
        if dur >= 300 and views >= 100000:
            matches.append({
                'id': e.get('id'),
                'title': e.get('title'),
                'duration': dur,
                'views': views
            })
    found[it] = matches
    print(f"[{it}] {q} -> Found {len(matches)} matches")
    for m in matches[:2]:
        print(f"   {m['id']} ({m['duration']}s | {m['views']:,} views) - {m['title'][:50]}")

with open('scripts/learn_english_animation_cands.json', 'w', encoding='utf-8') as f:
    json.dump(found, f, indent=2, ensure_ascii=False)
print("Saved to scripts/learn_english_animation_cands.json")
