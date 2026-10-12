import json
import re

with open('features/listening/data/lessons/movies/romance/lesson_the_notebook.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract segments block
seg_match = re.search(r'segments:\s*(\[\s*\{.*?\}\s*\])\s*\}\s*;', content, re.DOTALL)
if not seg_match:
    print("Could not find segments block")
    exit(1)

# Clean and load JSON
raw_json = seg_match.group(1)
# Some keys might not be quoted or trailing commas
# Let's write a small node script or parse with python regex
segments = []
matches = re.finditer(r'\{\s*"orderIndex":\s*(\d+),\s*"startTime":\s*([0-9.]+),\s*"endTime":\s*([0-9.]+),\s*"text":\s*"([^"]+)",\s*"ipaUs":\s*"([^"]+)",\s*"translationVi":\s*"([^"]+)",\s*"keywords":\s*(\[[^\]]*\]),\s*"explanationAi":\s*"([^"]+)"', content)

for m in matches:
    segments.append({
        "orderIndex": int(m.group(1)),
        "startTime": float(m.group(2)),
        "endTime": float(m.group(3)),
        "text": m.group(4),
        "ipaUs": m.group(5),
        "translationVi": m.group(6),
        "keywords": json.loads(m.group(7)),
        "explanationAi": m.group(8)
    })

print(f"Parsed {len(segments)} segments successfully.")
with open('scripts/notebook_current_parsed_segments.json', 'w', encoding='utf-8') as out:
    json.dump(segments, out, ensure_ascii=False, indent=2)
