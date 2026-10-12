import re

with open("scripts/pride_yt_sub.en.vtt", "r", encoding="utf-8") as f:
    lines = f.readlines()

clean_lines = []
for line in lines:
    line = line.strip()
    if not line or line.startswith("WEBVTT") or line.startswith("Kind:") or line.startswith("Language:"):
        continue
    if "-->" in line:
        continue
    text = re.sub(r"<[^>]+>", "", line)
    text = text.replace("[Music]", "").strip()
    if text and (not clean_lines or clean_lines[-1] != text):
        clean_lines.append(text)

print(f"Total lines: {len(clean_lines)}")
for idx in range(50, len(clean_lines)):
    print(f"[{idx:02d}] {clean_lines[idx]}")
