import urllib.request
import urllib.error
import json

bad_ids = [
    ('Dead Poets Society', 'viL7crj0jsw'),
    ('Forrest Gump', 'uPIEn0M8su0'),
    ('Good Will Hunting', 'qM-gZintWDc'),
    ('The Pursuit of Happyness', 'UZb2NOHPA2A'),
    ('Scent of a Woman', 'fT2khh00v8g'),
    ('The Shawshank Redemption', '7tkzqph37a0'),
    ('The Theory of Everything', 'WvP4_ZJ24vQ'),
    ('The Intern', 'rF8rJg-v7aM'),
    ('Whiplash', 'xDAsABdk3GQ'),
    ('Eternal Sunshine', 'yE-f1alkq9I'),
    ('Flipped', '34xS1l_z34U'),
    ('Her', 'ne6p6642Tw4')
]

for title, vid in bad_ids:
    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = json.load(resp)
            print(f"EXISTS: {vid} | {title} -> {data.get('title')}")
    except urllib.error.HTTPError as e:
        print(f"DEAD/UNAVAILABLE ({e.code}): {vid} | {title}")
    except Exception as e:
        print(f"ERR: {vid} | {title} -> {e}")
