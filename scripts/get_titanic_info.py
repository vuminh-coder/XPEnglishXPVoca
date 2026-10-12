import subprocess
import json

try:
    cmd = ["yt-dlp", "--dump-json", "https://www.youtube.com/watch?v=OSqS2ESN_ys"]
    res = subprocess.run(cmd, capture_output=True, text=True, check=True)
    data = json.loads(res.stdout)
    print("Title:", data.get("title"))
    print("Duration:", data.get("duration"))
    print("Views:", data.get("view_count"))
    print("Subtitles:", list(data.get("subtitles", {}).keys()))
    print("Auto-caps:", list(data.get("automatic_captions", {}).keys())[:10])
except Exception as e:
    print("Error:", e)
