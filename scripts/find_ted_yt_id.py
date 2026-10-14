import re

path = r'C:\Users\VU VAN MINH\.gemini\antigravity\brain\75160da0-6646-41c9-817c-8e932ebd6caa\.system_generated\steps\11123\content.md'
content = open(path, encoding='utf-8').read()

matches = re.findall(r'youtube\.com[^\s"\'<>]+', content)
print('YouTube links:', set(matches))

ids = re.findall(r'["\']([A-Za-z0-9_-]{11})["\']', content)
for i in set(ids):
    if 'video' in content[max(0, content.find(i)-50):content.find(i)+50].lower():
        print('Candidate video ID:', i)
