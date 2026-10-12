import subprocess
import json

queries = [
    ("English for Hotel Check In conversation LinguaTV", "hotel"),
    ("Ordering Food in a Restaurant English conversation Learn English", "restaurant"),
    ("At the Doctor English conversation medical English", "doctor"),
    ("Business English phone call telephone conversation Oxford", "phone"),
    ("BBC 6 Minute English laughter medicine", "laughter")
]

all_cands = []
for q, tag in queries:
    cmd = ["yt-dlp", f"ytsearch4:{q}", "--dump-json", "--no-playlist", "--ignore-errors"]
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")
    for line in res.stdout.strip().split("\n"):
        if not line.strip(): continue
        try:
            d = json.loads(line)
            all_cands.append({
                "tag": tag,
                "id": d.get("id"),
                "title": d.get("title"),
                "duration": d.get("duration"),
                "uploader": d.get("uploader")
            })
        except Exception:
            pass

with open("scripts/general_cands.json", "w", encoding="utf-8") as f:
    json.dump(all_cands, f, indent=2)

print(f"Total candidates found: {len(all_cands)}")
for c in all_cands:
    print(f"[{c['tag']}] {c['id']}: {c['title']} ({c['duration']}s)")
