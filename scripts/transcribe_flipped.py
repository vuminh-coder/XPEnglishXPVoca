import whisper
import json
import os

audio_path = "scripts/audio/KTUvOpY89RE.mp3"
os.makedirs("scripts/subs", exist_ok=True)

print("Loading Whisper model...")
model = whisper.load_model("base")

print("Transcribing Flipped audio...")
result = model.transcribe(audio_path, language="en", verbose=True)

out_json = "scripts/subs/KTUvOpY89RE.json"
with open(out_json, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"Saved transcript to {out_json} successfully with {len(result['segments'])} segments!")
