import os
import re
import json
import yt_dlp

folders = {
    'romance': 'features/listening/data/lessons/movies/romance',
    'inspirational': 'features/listening/data/lessons/movies/inspirational',
    'sitcoms': 'features/listening/data/lessons/movies/sitcoms',
    'animation': 'features/listening/data/lessons/movies/animation'
}

all_lessons = []

for cat, fpath in folders.items():
    if not os.path.exists(fpath):
        continue
    for fname in os.listdir(fpath):
        if fname.startswith('lesson_') and fname.endswith('.ts'):
            full_path = os.path.join(fpath, fname)
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find lesson id
            id_m = re.search(r'id:\s*["\'](mov_[a-z]+_\d+)["\']', content)
            slug_m = re.search(r'slug:\s*["\']([^"\']+)["\']', content)
            title_m = re.search(r'title:\s*["\']([^"\']+)["\']', content)
            ext_m = re.search(r'externalId:\s*["\']([^"\']+)["\']', content)
            dur_m = re.search(r'durationSeconds:\s*(\d+)', content)
            
            # Count segments
            seg_matches = re.findall(r'orderIndex:\s*\d+', content)
            
            all_lessons.append({
                'category': cat,
                'file': fname,
                'path': full_path,
                'id': id_m.group(1) if id_m else 'unknown',
                'slug': slug_m.group(1) if slug_m else 'unknown',
                'title': title_m.group(1) if title_m else 'unknown',
                'externalId': ext_m.group(1) if ext_m else 'unknown',
                'localDuration': int(dur_m.group(1)) if dur_m else 0,
                'segmentCount': len(seg_matches)
            })

all_lessons.sort(key=lambda x: (x['category'], x['id']))
print(f"Total movie lessons found: {len(all_lessons)}")

ydl_opts = {
    'skip_download': True,
    'quiet': True,
    'no_warnings': True,
}

audit_results = []

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    for idx, l in enumerate(all_lessons):
        ext_id = l['externalId']
        print(f"[{idx+1}/{len(all_lessons)}] Checking {l['id']} ({ext_id}) - {l['title'][:40]}...")
        
        info_dict = None
        error_msg = None
        try:
            url = f"https://www.youtube.com/watch?v={ext_id}"
            info_dict = ydl.extract_info(url, download=False)
        except Exception as e:
            error_msg = str(e)
            print(f"   --> ERROR: {error_msg[:100]}")
            
        yt_duration = info_dict.get('duration', 0) if info_dict else 0
        yt_views = info_dict.get('view_count', 0) if info_dict else 0
        yt_likes = info_dict.get('like_count', 0) if info_dict else 0
        yt_title = info_dict.get('title', '') if info_dict else ''
        
        # Check criteria:
        # 1. duration >= 300s (5 minutes)
        # 2. views >= 100,000
        # 3. no error
        is_duration_valid = yt_duration >= 300
        is_views_valid = (yt_views is not None and yt_views >= 100000)
        has_error = error_msg is not None
        
        status = "PASS"
        issues = []
        if has_error:
            status = "FAIL"
            issues.append(f"YouTube Error: {error_msg[:60]}")
        else:
            if not is_duration_valid:
                status = "FAIL"
                issues.append(f"Duration {yt_duration}s < 300s ({yt_duration//60}:{yt_duration%60:02d})")
            if not is_views_valid:
                status = "FAIL"
                issues.append(f"Views {yt_views:,} < 100,000")
                
        res_entry = {
            **l,
            'ytDuration': yt_duration,
            'ytViews': yt_views,
            'ytLikes': yt_likes,
            'ytTitle': yt_title,
            'status': status,
            'issues': issues
        }
        audit_results.append(res_entry)
        print(f"   --> Result: {status} | Duration: {yt_duration}s ({yt_duration//60}:{yt_duration%60:02d}) | Views: {yt_views:,} | Issues: {', '.join(issues) if issues else 'None'}")

with open('scripts/all_48_audit_results.json', 'w', encoding='utf-8') as f:
    json.dump(audit_results, f, indent=2, ensure_ascii=False)

pass_count = sum(1 for r in audit_results if r['status'] == 'PASS')
fail_count = sum(1 for r in audit_results if r['status'] == 'FAIL')

print("\n" + "="*80)
print(f"AUDIT SUMMARY: {pass_count} PASSED / {fail_count} FAILED out of {len(audit_results)} lessons")
print("="*80)
for r in audit_results:
    if r['status'] == 'FAIL':
        print(f"[FAIL] {r['category'].upper()} | {r['id']} ({r['externalId']}) | {r['title']} | Issues: {'; '.join(r['issues'])}")
