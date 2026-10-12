with open('C:/Users/VU VAN MINH/.gemini/antigravity/brain/75160da0-6646-41c9-817c-8e932ebd6caa/.system_generated/steps/1474/content.md', 'r', encoding='utf-8') as f:
    c = f.read()

import re
matches = re.findall(r'<p class="cue-line" data-cue-idx="(\d+)"[^>]*>(.*?)</p>', c)
cues = {}
for idx, text in matches:
    cues.setdefault(int(idx), []).append(text.replace('&#039;', "'").replace('&quot;', '"'))

for idx in sorted(cues.keys()):
    if 1690 <= idx <= 1706:
        print(f"{idx}: {' '.join(cues[idx])}")
