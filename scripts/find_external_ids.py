import os
import re

pattern = re.compile(r'externalId[\s:]+[\'\"]([a-zA-Z0-9_-]{11})[\'\"]')
found = {}

for root, dirs, files in os.walk('.'):
    if any(p in root for p in ['node_modules', '.next', '.git', '.system_generated']):
        continue
    for f in files:
        if f.endswith(('.ts', '.tsx', '.json', '.js')) and not f.startswith('audit_') and not f.startswith('all_errors'):
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                    matches = pattern.findall(content)
                    if matches:
                        found[path] = set(matches)
            except Exception:
                pass

print(f"Total files with externalId: {len(found)}")
for p, ids in sorted(found.items()):
    print(f"{p}: {len(ids)} ids -> {list(ids)[:3]}")
