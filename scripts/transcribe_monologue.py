import whisper
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
print("Loading Whisper...")
model = whisper.load_model("base")
print("Transcribing cast_away_monologue.mp3...")
res = model.transcribe("cast_away_monologue.mp3", language="en", verbose=False)
with open("cast_away_monologue_whisper.json", "w", encoding="utf-8") as f:
    json.dump(res, f, ensure_ascii=False, indent=2)

print(f"Total Segments: {len(res['segments'])}")
for s in res['segments']:
    print(f"[{s['start']:.2f} -> {s['end']:.2f}] {s['text']}")
