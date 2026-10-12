import urllib.request
import re
import json

test_vids = [
    ("About Time", "1qlLS47uBD4"),
    ("Before Sunrise", "DQ8Q6VuyB74"),
    ("La La Land", "FAmaskY8eXE"),
    ("The Notebook", "EemLsTG5fX8"),
    ("Pride & Prejudice", "YlETBQHBm9w"),
    ("Me Before You", "Eh993__rOxA"),
    ("Her", "ne6p6642Tw4"),
    ("500 Days of Summer", "u82hnJ4m344"),
    ("Titanic", "1ygdXYm8mAI"),
    ("Eternal Sunshine", "yE-f1alkq9I"),
    ("Notting Hill", "gZ_qXm_0oJk"),
    ("Flipped", "34xS1l_z34U"),
    ("Rewrite The Stars", "pRfmrE0ToTo"),
    ("Kurzgesagt", "tybKnGZRwcU"),
    ("BBC Sunken Ship", "doOlP7NLUwc")
]

for title, vid in test_vids:
    url = f"https://www.youtube.com/embed/{vid}"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://localhost:3000/'
    })
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
            # Find ytInitialPlayerResponse
            m = re.search(r'ytInitialPlayerResponse\s*=\s*({.+?});(?:var|<\/script)', html)
            if m:
                data = json.loads(m.group(1))
                play = data.get("playabilityStatus", {})
                status = play.get("status")
                playable_in_embed = play.get("playableInEmbed")
                reason = play.get("reason")
                error_screen = play.get("errorScreen")
                print(f"{vid:12} | {title:20} | status: {status:10} | playableInEmbed: {str(playable_in_embed):5} | reason: {reason}")
            else:
                # check string
                m2 = re.search(r'"playabilityStatus":\{"status":"([^"]+)"', html)
                st = m2.group(1) if m2 else "NO_STATUS"
                print(f"{vid:12} | {title:20} | fallback status: {st}")
    except Exception as e:
        print(f"{vid:12} | {title:20} | ERROR: {e}")
