import json

with open('scripts/subs/72okAeSn5Tc.json', encoding='utf-8') as f:
    data = json.load(f)

segs = data['segments']
print('Total raw segments:', len(segs))
print('--- FIRST 15 ---')
for s in segs[:15]:
    txt = s['text'].strip()
    if txt:
        print(f"[{s['start']:5.1f}s -> {s['end']:5.1f}s] {txt}")

print('--- MIDDLE 15 (100-115) ---')
for s in segs[100:115]:
    txt = s['text'].strip()
    if txt:
        print(f"[{s['start']:5.1f}s -> {s['end']:5.1f}s] {txt}")

print('--- LAST 15 ---')
for s in segs[-15:]:
    txt = s['text'].strip()
    if txt:
        print(f"[{s['start']:5.1f}s -> {s['end']:5.1f}s] {txt}")
