import re

path = r'C:\Users\VU VAN MINH\.gemini\antigravity\brain\75160da0-6646-41c9-817c-8e932ebd6caa\.system_generated\steps\11123\content.md'
content = open(path, encoding='utf-8').read()

m = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>[^<]*<span>Download transcript</span>', content)
print('Download transcript hrefs:', m)

# Also check for any transcript text block
m_text = re.findall(r'href="([^"]*transcript[^"]*)"', content)
print('Other transcript links:', m_text)
