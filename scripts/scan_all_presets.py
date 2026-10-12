import re
import json

targets = [
    "features/listening/data/curatedLevelLessons.ts",
    "features/listening/data/defaultVideoPresets.ts",
    "features/listening/data/listeningMockData.ts",
    "features/listening/data/videoCatalogMockData.ts"
]

all_vids = {}

for path in targets:
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Match objects with id, title, and externalId / youtubeUrl
        # Pattern for externalId: "..."
        for m in re.finditer(r'externalId:\s*["\']([^"\']+)["\']', content):
            vid = m.group(1)
            all_vids.setdefault(vid, []).append((path, "externalId"))
            
        for m in re.finditer(r'youtube(?:Url|\.com/watch\?v=|\.com/embed/|youtu\.be/)(?:["\':\s]*|=)?([a-zA-Z0-9_-]{11})', content):
            vid = m.group(1)
            all_vids.setdefault(vid, []).append((path, "url"))
            
    except Exception as e:
        print(f"Error reading {path}: {e}")

print(f"Total unique video IDs found in preset files: {len(all_vids)}")
for v, occ in all_vids.items():
    print(f"{v} -> {len(occ)} occurrences in {[o[0] for o in occ]}")

with open("scripts/presets_vids.json", "w", encoding="utf-8") as out:
    json.dump(all_vids, out, indent=2)
