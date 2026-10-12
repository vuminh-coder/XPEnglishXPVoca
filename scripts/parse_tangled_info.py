import json

for enc in ['utf-16', 'utf-8', 'cp1252']:
    try:
        with open('scripts/tangled_ytdlp_info.json', 'r', encoding=enc) as f:
            info = json.load(f)
            print(f'Decoded with {enc}!')
            break
    except Exception:
        pass

print('Title:', info.get('title'))
print('Duration:', info.get('duration'))
print('Description first 300 chars:')
print((info.get('description') or '')[:300].encode('ascii', errors='replace').decode('ascii'))
print('Chapters:')
for ch in info.get('chapters') or []:
    title = ch.get('title', '').encode('ascii', errors='replace').decode('ascii')
    print(f"  {ch.get('start_time')}s - {ch.get('end_time')}s: {title}")
