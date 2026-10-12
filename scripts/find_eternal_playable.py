import subprocess
import json

queries = [
    "Eternal Sunshine of the Spotless Mind Joel Clementine meet scene",
    "Eternal Sunshine of the Spotless Mind full scene Montauk",
    "Eternal Sunshine of the Spotless Mind best conversation scenes",
    "Eternal Sunshine of the Spotless Mind movie clips Jim Carrey Kate Winslet",
    "Eternal Sunshine of the Spotless Mind scenes 1080p"
]

cands = []
seen = set()

for q in queries:
    cmd = [
        "yt-dlp", "--no-update",
        f"ytsearch10:{q}",
        "--print", "%(id)s|%(duration)s|%(view_count)s|%(like_count)s|%(title)s"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    for line in res.stdout.splitlines():
        if "|" in line:
            parts = line.split("|")
            vid = parts[0].strip()
            if len(vid) == 11 and vid not in seen:
                seen.add(vid)
                try:
                    dur = int(parts[1].strip() or 0)
                    views = int(parts[2].strip() or 0)
                    likes = int(parts[3].strip() or 0)
                    title = "|".join(parts[4:]).strip()
                    if dur >= 300 and views >= 100000:
                        cands.append({"id": vid, "dur": dur, "views": views, "likes": likes, "title": title})
                except Exception:
                    pass

print(f"Found {len(cands)} candidates for Eternal Sunshine:")
for c in cands:
    print(f"  {c['id']} | {round(c['dur']/60,1)}m | {c['views']:,} views | {c['likes']:,} likes | {c['title']}")

with open("scripts/eternal_cands.json", "w", encoding="utf-8") as f:
    json.dump([c['id'] for c in cands], f)
