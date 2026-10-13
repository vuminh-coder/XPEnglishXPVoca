import whisper
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
model = whisper.load_model("medium") # Dùng medium model để cực kỳ chính xác!
prompt = "We both had done the math. Kelly added it all up and she knew she had to let me go. I added it up, and knew that I had lost her. 'Cause I was never gonna get off that island. I was gonna die there, totally alone. I mean, I was gonna get sick, or I was gonna get injured or something. The only choice I had, the only thing I could control, was when, and how, and where that was gonna happen. So, I made a rope, and I went up to the peak to hang myself. I had to test it, you know, of course. You know me. And the weight of the log snapped the branch of the tree. So I couldn't even kill myself the way I wanted to. I had power over nothing. And that's when this feeling came over me like a warm blanket. I knew, somehow, that I had to stay alive. Somehow. I had to keep breathing, even though there was no reason to hope. And all my logic said that I would never see this place again. So that's what I did. I stayed alive. I kept breathing. And then one day that logic was proven all wrong because the tide came in, gave me a sail. And now here I am. I'm back, in Memphis, talking to you. I have ice in my glass. And I've lost her all over again. I'm so sad that I don't have Kelly. But I'm so grateful that she was with me on that island. And I know what I have to do now. I gotta keep breathing. Because tomorrow the sun will rise. Who knows what the tide could bring."

res = model.transcribe("cast_away_monologue.mp3", language="en", initial_prompt=prompt, word_timestamps=True)
with open("cast_away_medium_transcription.json", "w", encoding="utf-8") as f:
    json.dump(res, f, ensure_ascii=False, indent=2)

print("Transcription with medium model complete!")
for s in res['segments']:
    print(f"[{s['start']:.2f} -> {s['end']:.2f}] {s['text']}")
