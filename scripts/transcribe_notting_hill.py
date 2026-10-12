import whisper
import json
import os

audio_path = "scripts/audio/sM4rv42qyvk.mp3"
os.makedirs("scripts/subs", exist_ok=True)

print("Loading Whisper model...")
model = whisper.load_model("base")

print("Transcribing Notting Hill audio...")
result = model.transcribe(audio_path, language="en", verbose=True)

out_json = "scripts/subs/sM4rv42qyvk.json"
with open(out_json, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"Saved transcript to {out_json} successfully with {len(result['segments'])} segments!")
