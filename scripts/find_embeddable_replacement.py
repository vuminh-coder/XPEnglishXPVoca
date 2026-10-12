import subprocess
import json
import urllib.request
import re

def search_candidates(query, count=5):
    cmd = [
        "yt-dlp",
        f"ytsearch{count}:{query}",
        "--dump-json",
        "--no-playlist",
        "--ignore-errors"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")
    candidates = []
    for line in res.stdout.strip().split("\n"):
        if not line.strip():
            continue
        try:
            d = json.loads(line)
            candidates.append({
                "id": d.get("id"),
                "title": d.get("title"),
                "duration": d.get("duration"),
                "uploader": d.get("uploader"),
                "view_count": d.get("view_count")
            })
        except Exception:
            pass
    return candidates

def test_embed_fast(vid):
    # Check if embed page allows playback by checking if embed returns 200 and oEmbed returns 200
    oembed_url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
    try:
        req = urllib.request.Request(oembed_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as resp:
            if resp.status != 200:
                return False
    except Exception:
        return False
    return True

if __name__ == "__main__":
    queries = [
        ("Her Theodore Samantha", "ne6p6642Tw4"),
        ("500 Days of Summer expectations reality", "u82hnJ4m344"),
        ("Titanic Jack Rose flying scene", "1ygdXYm8mAI"),
        ("Notting Hill I'm also just a girl", "gZ_qXm_0oJk"),
        ("Flipped Sycamore Tree scene", "34xS1l_z34U"),
        ("English Hotel Check In conversation", "P7X7Cq_9c0s"),
        ("English Ordering Food Restaurant conversation", "G9bFzV7p6m0"),
        ("Doctor Consultation English conversation", "V5a7g9Gz8d0"),
        ("Professional Phone Call Business English", "7V1UjX9m_eQ"),
        ("BBC 6 Minute English Laughter Medicine", "uQ7t8w4A0xk")
    ]
    
    for q, old_id in queries:
        print(f"\nSearching for: {q} (Old: {old_id})...")
        cands = search_candidates(q, count=4)
        print(f"Found {len(cands)} candidates:")
        for c in cands:
            print(f"  - {c['id']}: {c['title']} ({c.get('duration')}s) by {c.get('uploader')}")
