import subprocess
import json

res = subprocess.run(['yt-dlp', '--dump-json', 'https://www.youtube.com/watch?v=0zbPeoZzcPg'], capture_output=True, text=True, encoding='utf-8')
data = json.loads(res.stdout)
with open('scripts/up_info.json', 'w', encoding='utf-8') as f:
    json.dump({
        'title': data.get('title'),
        'description': data.get('description'),
        'chapters': data.get('chapters')
    }, f, indent=2, ensure_ascii=False)
print("Saved up_info.json")
