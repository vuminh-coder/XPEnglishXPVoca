import subprocess
import json

# Let's inspect where speech occurs between 200s and 265s
cmd = [
    "ffmpeg", "-y", "-ss", "200", "-to", "265",
    "-i", "scripts/pride_audio.mp3",
    "scripts/pride_ending.mp3"
]
subprocess.run(cmd, capture_output=True)

# Transcribe ending slice
res = subprocess.run([
    "C:\\Users\\VU VAN MINH\\AppData\\Local\\Programs\\Python\\Python313\\Scripts\\whisper.exe",
    "scripts/pride_ending.mp3",
    "--model", "base",
    "--word_timestamps", "True",
    "--output_dir", "scripts",
    "--output_format", "json"
], capture_output=True, text=True)

with open("scripts/pride_ending.json", "r", encoding="utf-8") as f:
    d = json.load(f)

print("=== SPEECH FROM 200s to 265s ===")
for s in d["segments"]:
    abs_s = 200 + s["start"]
    abs_e = 200 + s["end"]
    txt = s["text"].strip()
    if txt:
        print(f"{abs_s:6.2f}s -> {abs_e:6.2f}s | {txt}")
        if "words" in s:
            w_str = " ".join([f"{w['word']}({200+w['start']:.1f}-{200+w['end']:.1f})" for w in s["words"]])
            print("   words:", w_str)
