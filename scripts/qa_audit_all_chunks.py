import subprocess
import json

# Let's inspect the entire audio from 60s to 146s in 15s chunks
chunks = [
    (65, 80, "chunk_65_80"),
    (75, 90, "chunk_75_90"),
    (85, 100, "chunk_85_100"),
    (95, 110, "chunk_95_110"),
    (105, 120, "chunk_105_120"),
    (115, 130, "chunk_115_130"),
    (125, 146, "chunk_125_146")
]

for start, end, label in chunks:
    dur = end - start
    mp3_file = f"scripts/{label}.mp3"
    subprocess.run([
        "ffmpeg", "-y", "-ss", str(start), "-t", str(dur),
        "-i", "scripts/notebook_audio.mp3",
        mp3_file
    ], capture_output=True)

    res = subprocess.run([
        "C:\\Users\\VU VAN MINH\\AppData\\Local\\Programs\\Python\\Python313\\Scripts\\whisper.exe",
        mp3_file,
        "--model", "small",
        "--language", "en",
        "--output_dir", "scripts",
        "--output_format", "txt"
    ], capture_output=True, text=True)

    txt_file = f"scripts/{label}.txt"
    try:
        with open(txt_file, "r", encoding="utf-8") as f:
            content = f.read().strip()
    except Exception:
        content = "EMPTY"

    print(f"[{start:3d}s - {end:3d}s] {label}:")
    print(f"    --> {content}")
