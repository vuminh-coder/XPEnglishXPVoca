import subprocess
import json
import re

MOVIE_QUERIES = {
    "mov_rom_01": [
        "About Time The Secret Formula for Happiness",
        "About Time movie scenes Tim and Mary romance",
        "About Time best scenes"
    ],
    "mov_rom_02": [
        "Before Sunrise best conversation scenes Vienna",
        "Before Sunrise movie scenes",
        "Before Sunset best conversation Paris scenes",
        "Before Sunrise full scene"
    ],
    "mov_rom_03": [
        "La La Land Seb and Mia romantic scenes",
        "La La Land best scenes",
        "La La Land scenes Emma Stone Ryan Gosling",
        "La La Land romantic scenes compilation"
    ],
    "mov_rom_04": [
        "The Notebook Noah Allie romantic scenes",
        "The Notebook best scenes Ryan Gosling Rachel McAdams",
        "The Notebook scenes full"
    ],
    "mov_rom_05": [
        "Pride and Prejudice 2005 Darcy Elizabeth best scenes",
        "Pride and Prejudice 2005 romantic scenes",
        "Pride and Prejudice 2005 scenes Keira Knightley"
    ],
    "mov_rom_06": [
        "Me Before You Will and Lou best romantic scenes",
        "Me Before You scenes Emilia Clarke Sam Claflin",
        "Me Before You best scenes"
    ],
    "mov_rom_07": [
        "Her Theodore and Samantha conversations",
        "Her 2013 best scenes Joaquin Phoenix Scarlett Johansson",
        "Her 2013 scenes"
    ],
    "mov_rom_08": [
        "500 Days of Summer Tom and Summer best scenes",
        "500 Days of Summer romantic scenes",
        "500 Days of Summer scenes Joseph Gordon-Levitt Zooey Deschanel"
    ],
    "mov_rom_09": [
        "Titanic Jack and Rose romantic scenes",
        "Titanic Jack and Rose best scenes Leonardo DiCaprio Kate Winslet",
        "Titanic scenes Leonardo DiCaprio"
    ],
    "mov_rom_10": [
        "Eternal Sunshine of the Spotless Mind Joel Clementine scenes",
        "Eternal Sunshine best scenes Jim Carrey Kate Winslet",
        "Eternal Sunshine of the Spotless Mind scenes"
    ],
    "mov_rom_11": [
        "Notting Hill Hugh Grant Julia Roberts best scenes",
        "Notting Hill romantic scenes",
        "Notting Hill best scenes"
    ],
    "mov_rom_12": [
        "Flipped Bryce and Juli best scenes",
        "Flipped 2010 scenes romance",
        "Flipped movie scenes"
    ]
}

def search_movie(code, queries):
    results = []
    seen = set()
    for q in queries:
        cmd = [
            "yt-dlp", "--no-update",
            f"ytsearch5:{q}",
            "--print", "%(id)s|%(duration)s|%(view_count)s|%(like_count)s|%(title)s"
        ]
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=20)
            for line in res.stdout.splitlines():
                line = line.strip()
                if not line or "|" not in line:
                    continue
                parts = line.split("|")
                if len(parts) >= 5:
                    vid = parts[0].strip()
                    if vid in seen or len(vid) != 11:
                        continue
                    seen.add(vid)
                    try:
                        dur = int(parts[1].strip() or 0)
                        views = int(parts[2].strip() or 0)
                        likes = int(parts[3].strip() or 0)
                        title = "|".join(parts[4:]).strip()
                        
                        # User criteria: duration >= 300s (5m) and views >= 100000
                        if dur >= 300 and views >= 100000:
                            results.append({
                                "code": code,
                                "id": vid,
                                "duration": dur,
                                "duration_min": round(dur / 60, 2),
                                "views": views,
                                "likes": likes,
                                "title": title
                            })
                    except Exception:
                        pass
        except Exception as e:
            print(f"Error on {q}: {e}")
    return results

all_movie_cands = {}
for code, queries in MOVIE_QUERIES.items():
    print(f"Searching candidates for {code}...")
    cands = search_movie(code, queries)
    # Sort by views desc
    cands.sort(key=lambda x: (x.get("views") or 0), reverse=True)
    all_movie_cands[code] = cands
    print(f"  -> Found {len(cands)} candidates for {code}")
    for c in cands[:3]:
        print(f"     [{c['duration_min']}m | {c['views']:,} views | {c['likes']:,} likes] {c['id']} - {c['title']}")

with open("scripts/romance_candidates_by_movie.json", "w", encoding="utf-8") as f:
    json.dump(all_movie_cands, f, indent=2)

print("\nSaved to scripts/romance_candidates_by_movie.json")
