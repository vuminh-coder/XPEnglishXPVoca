import whisper
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
model = whisper.load_model("base")
res = model.transcribe("cast_away_monologue.mp3", language="en", word_timestamps=True)
with open("cast_away_word_timestamps.json", "w", encoding="utf-8") as f:
    json.dump(res, f, ensure_ascii=False, indent=2)

print("Finished word-level transcription!")
for s in res['segments']:
    words_str = " ".join([f"{w['word']}({w['start']:.2f}-{w['end']:.2f})" for w in s.get('words', [])])
    print(f"[{s['start']:.2f} -> {s['end']:.2f}] {s['text']}")
    print(f"   Words: {words_str}\n")
