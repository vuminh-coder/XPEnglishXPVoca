import whisper
import json
import sys

# Set standard output encoding to utf-8
sys.stdout.reconfigure(encoding='utf-8')

print("Loading Whisper model...")
model = whisper.load_model("base")
print("Transcribing cast_away_audio.mp3 with verbose=False...")
result = model.transcribe("cast_away_audio.mp3", language="en", verbose=False)

with open("cast_away_whisper_result.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("Transcription complete! Segments found:", len(result.get("segments", [])))
for seg in result.get("segments", []):
    print(f"[{seg['start']:.2f} -> {seg['end']:.2f}] {seg['text']}")
