import glob
import re

all_files = glob.glob('**/*.ts', recursive=True) + glob.glob('**/*.tsx', recursive=True) + glob.glob('**/*.json', recursive=True)
all_files = [f for f in all_files if not any(x in f for x in ['node_modules', '.next', '.git', 'scripts', 'embed_check_results'])]

ids_map = {}
for f in all_files:
    try:
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
        
        # Matches externalId: "..."
        for m in re.finditer(r'externalId[\'":\s]+([a-zA-Z0-9_-]{11})', content):
            vid = m.group(1)
            ids_map.setdefault(vid, set()).add(f)
            
        # Matches youtube links
        for m in re.finditer(r'(?:youtube\.com/(?:watch\?v=|embed/)|youtu\.be/|img\.youtube\.com/vi/)([a-zA-Z0-9_-]{11})', content):
            vid = m.group(1)
            ids_map.setdefault(vid, set()).add(f)
    except Exception:
        pass

print(f"Total unique YouTube IDs found across repository: {len(ids_map)}")
for vid, files in sorted(ids_map.items()):
    flist = ", ".join(sorted(files))
    print(f"{vid:12} | {flist}")
