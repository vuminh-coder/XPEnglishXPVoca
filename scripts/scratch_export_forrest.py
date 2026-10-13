import json

with open('scripts/scratch_forrest_gump_transcript.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

with open('scripts/scratch_forrest_lines_utf8.txt', 'w', encoding='utf-8') as out:
    for i, it in enumerate(items):
        start = it['start']
        end = start + it['duration']
        out.write(f"[{i:03d}] {start:6.2f}s - {end:6.2f}s: {it['text']}\n")

print(f"Exported {len(items)} lines to scratch_forrest_lines_utf8.txt")
