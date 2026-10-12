import json
import subprocess
import os

romance_lessons = [
    ("mov_rom_01", "features/listening/data/lessons/movies/romance/lesson_about_time_extraordinary_ordinary_life.ts"),
    ("mov_rom_02", "features/listening/data/lessons/movies/romance/lesson_before_sunrise_vienna_night_walk.ts"),
    ("mov_rom_03", "features/listening/data/lessons/movies/romance/lesson_la_la_land_the_fools_who_dream_audition.ts"),
    ("mov_rom_04", "features/listening/data/lessons/movies/romance/lesson_the_notebook_it_wasnt_over_confrontation.ts"),
    ("mov_rom_05", "features/listening/data/lessons/movies/romance/lesson_pride_and_prejudice_rain_proposal_dawn.ts"),
    ("mov_rom_06", "features/listening/data/lessons/movies/romance/lesson_me_before_you_the_final_letter_in_paris.ts"),
    ("mov_rom_07", "features/listening/data/lessons/movies/romance/lesson_her_theodore_samantha_deepest_connection.ts"),
    ("mov_rom_08", "features/listening/data/lessons/movies/romance/lesson_500_days_of_summer_expectations_vs_reality.ts"),
    ("mov_rom_09", "features/listening/data/lessons/movies/romance/lesson_titanic_flying_first_class_dinner_extended.ts"),
    ("mov_rom_10", "features/listening/data/lessons/movies/romance/lesson_eternal_sunshine_meet_me_in_montauk.ts"),
    ("mov_rom_11", "features/listening/data/lessons/movies/romance/lesson_notting_hill_im_also_just_a_girl.ts"),
    ("mov_rom_12", "features/listening/data/lessons/movies/romance/lesson_flipped_the_sycamore_tree_and_basket_boys.ts"),
]

results = []
for code, path in romance_lessons:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    import re
    m = re.search(r'externalId:\s*["\']([a-zA-Z0-9_-]{11})["\']', content)
    ext_id = m.group(1) if m else "UNKNOWN"
    
    cmd = ["yt-dlp", "--no-update", "--dump-json", f"https://www.youtube.com/watch?v={ext_id}"]
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
        if res.returncode == 0:
            data = json.loads(res.stdout)
            duration = data.get("duration", 0)
            views = data.get("view_count", 0)
            likes = data.get("like_count", 0)
            title = data.get("title", "")
            results.append({
                "code": code,
                "file": path,
                "ext_id": ext_id,
                "title": title,
                "duration": duration,
                "duration_min": round(duration / 60, 2),
                "views": views,
                "likes": likes,
                "valid_duration_5m": duration >= 300,
                "valid_views_100k": (views or 0) >= 100000
            })
        else:
            results.append({
                "code": code,
                "file": path,
                "ext_id": ext_id,
                "error": res.stderr[:200]
            })
    except Exception as e:
        results.append({
            "code": code,
            "file": path,
            "ext_id": ext_id,
            "error": str(e)
        })

print(json.dumps(results, indent=2))
with open("scripts/audit_romance_requirements.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)
