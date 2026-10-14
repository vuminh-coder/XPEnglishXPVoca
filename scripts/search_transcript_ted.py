path = r'C:\Users\VU VAN MINH\.gemini\antigravity\brain\75160da0-6646-41c9-817c-8e932ebd6caa\.system_generated\steps\11123\content.md'
content = open(path, encoding='utf-8').read()

import re
# Look for transcript or sentences
if 'transcript' in content.lower():
    print('Found "transcript" in content!')
    # print context around transcript
    for m in re.finditer(r'transcript', content, re.IGNORECASE):
        start = max(0, m.start() - 100)
        end = min(len(content), m.end() + 500)
        print('--- SNIPPET ---')
        print(content[start:end])
else:
    print('No transcript word found')
