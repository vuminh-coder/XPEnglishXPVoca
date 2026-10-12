import subprocess
import json

# Check segment from 0s to 50s
cmd = [
    "ffmpeg", "-y", "-ss", "0", "-to", "50",
    "-i", "scripts/pride_audio.mp3",
    "scripts/pride_start.mp3"
]
subprocess.run(cmd, capture_output=True)

res = subprocess.run([
    "C:\\Users\\VU VAN MINH\\AppData\\Local\\Programs\\Python\\Python313\\Scripts\\whisper.exe",
    "scripts/pride_start.mp3",
    "--model", "base",
    "--word_timestamps", "True",
    "--output_dir", "scripts",
    "--output_format", "json"
], capture_output=True, text=True)

with open("scripts/pride_start.json", "r", encoding="utf-8") as f:
    d = json.load(f)

print("=== SPEECH FROM 0s to 50s ===")
for s in d["segments"]:
    txt = s["text"].strip()
    if txt and txt != "[MUSIC PLAYING]":
        print(f"{s['start']:6.2f}s -> {s['end']:6.2f}s | {txt}")
        if "words" in s:
            w_str = " ".join([f"{w['word']}({w['start']:.1f}-{w['end']:.1f})" for w in s["words"]])
            print("   words:", w_str)
