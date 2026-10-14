import re
path = r'C:\Users\VU VAN MINH\.gemini\antigravity\brain\75160da0-6646-41c9-817c-8e932ebd6caa\.system_generated\steps\11123\content.md'
content = open(path, encoding='utf-8').read()

idx = content.find('Download transcript')
if idx != -1:
    print(content[idx-200:idx+100])
