import glob
import re
import urllib.request
import urllib.error
import json
import sys
from concurrent.futures import ThreadPoolExecutor

files = glob.glob('features/listening/data/lessons/**/*.ts', recursive=True)
lessons = []
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    m_id = re.search(r'id:\s*["\']([^"\']+)["\']', content)
    m_ext = re.search(r'externalId:\s*["\']([^"\']+)["\']', content)
    m_title = re.search(r'title:\s*["\']([^"\']+)["\']', content)
    if m_id and m_ext:
        lessons.append({
            "id": m_id.group(1),
            "externalId": m_ext.group(1),
            "title": m_title.group(1) if m_title else "",
            "file": f
        })

print(f"Total lessons to check: {len(lessons)}", flush=True)

def check_video(item):
    vid = item["externalId"]
    embed_url = f"https://www.youtube.com/embed/{vid}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'http://localhost:3000/'
    }
    
    status = "UNKNOWN"
    reason = ""
    try:
        req = urllib.request.Request(embed_url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
            # Look for playabilityStatus
            m_play = re.search(r'"playabilityStatus":\s*\{"status":"([^"]+)"', html)
            if not m_play:
                m_play = re.search(r'"status":"(OK|UNPLAYABLE|ERROR|LOGIN_REQUIRED)"', html)
            
            p_status = m_play.group(1) if m_play else ""
            
            # Check reasons
            m_reason = re.search(r'"reason":"([^"]+)"', html)
            if m_reason:
                reason = m_reason.group(1)
            
            if "Playback on other websites has been disabled by the video owner" in html:
                status = "BLOCKED_BY_OWNER"
                reason = "Playback on other websites has been disabled by the video owner (Error 150/101)"
            elif '"playableInEmbed":false' in html or '"playableInEmbed": false' in html:
                status = "BLOCKED_BY_OWNER"
                reason = "playableInEmbed: false"
            elif p_status == "UNPLAYABLE":
                status = "UNPLAYABLE"
            elif p_status == "ERROR":
                status = "ERROR"
            elif p_status == "LOGIN_REQUIRED":
                status = "AGE_RESTRICTED"
            elif p_status == "OK":
                status = "PLAYABLE"
            elif "Video unavailable" in html:
                status = "UNAVAILABLE"
            else:
                status = "PLAYABLE"
    except urllib.error.HTTPError as e:
        status = f"HTTP_{e.code}"
        reason = str(e)
    except Exception as e:
        status = "REQ_ERROR"
        reason = str(e)
        
    return {
        **item,
        "status": status,
        "reason": reason
    }

results = []
with ThreadPoolExecutor(max_workers=20) as executor:
    for res in executor.map(check_video, lessons):
        results.append(res)
        tag = "[OK]" if res["status"] == "PLAYABLE" else f"[{res['status']}]"
        print(f"{tag:20} | {res['id']:18} | {res['externalId']:12} | {res['reason'][:40]} | {res['title'][:40]}", flush=True)

with open("scripts/embed_check_results.json", "w", encoding="utf-8") as out:
    json.dump(results, out, ensure_ascii=False, indent=2)

print("\n" + "="*80, flush=True)
print("SUMMARY OF RESTRICTED / BLOCKED / UNPLAYABLE VIDEOS:", flush=True)
print("="*80, flush=True)
blocked_list = [r for r in results if r["status"] != "PLAYABLE"]
print(f"Total problematic videos found: {len(blocked_list)}", flush=True)
for b in blocked_list:
    print(f"-> ID: {b['id']} | YouTube: {b['externalId']} | Status: {b['status']} | Reason: {b['reason']}")
    print(f"   File: {b['file']}")
    print(f"   Title: {b['title']}\n")
