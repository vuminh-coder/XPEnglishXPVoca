import os
import json
import subprocess
import whisper

vids = [
    ("gW0xteHHXrY", "La La Land Argument"),
    ("OSqS2ESN_ys", "Titanic"),
    ("9lo1ncSInLI", "Eternal Sunshine")
]

os.makedirs("scripts/audio", exist_ok=True)
os.makedirs("scripts/subs", exist_ok=True)

print("Loading Whisper model...")
model = whisper.load_model("base")

for vid, name in vids:
    target_vtt = f"scripts/subs/{vid}.en.vtt"
    if os.path.exists(target_vtt):
        print(f"Already exists: {target_vtt}")
        continue
        
    audio_path = f"scripts/audio/{vid}.mp3"
    if not os.path.exists(audio_path):
        print(f"Downloading audio for {vid} ({name})...")
        cmd = [
            "yt-dlp", "--no-update",
            "--extractor-args", "youtube:player_client=android",
            "-f", "ba/b",
            "-x", "--audio-format", "mp3",
            "-o", f"scripts/audio/{vid}.%(ext)s",
            vid
        ]
        subprocess.run(cmd, check=True)
        
    print(f"Transcribing {vid} ({name}) with Whisper...")
    result = model.transcribe(audio_path, language="en")
    
    with open(f"scripts/subs/{vid}.json", "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)
        
    with open(target_vtt, "w", encoding="utf-8") as f:
        f.write("WEBVTT\n\n")
        for seg in result["segments"]:
            s = seg["start"]
            e = seg["end"]
            text = seg["text"].strip()
            
            def fmt_time(secs):
                h = int(secs // 3600)
                m = int((secs % 3600) // 60)
                sec = int(secs % 60)
                ms = int((secs - int(secs)) * 1000)
                return f"{h:02d}:{m:02d}:{sec:02d}.{ms:03d}"
                
            f.write(f"{fmt_time(s)} --> {fmt_time(e)}\n{text}\n\n")
            
    print(f"Completed {vid} -> {target_vtt}")

print("ALL 3 VIDEOS SUCCESSFULLY TRANSCRIBED BY WHISPER!")
