import re

with open('scripts/jensen_huang_auto.en.vtt', 'r', encoding='utf-8') as f:
    text = f.read()

# Pattern for word timestamps: <HH:MM:SS.mmm><c> word</c>
# or lines with timestamps
lines = text.split('\n')
tokens = []

for l in lines:
    if '-->' in l:
        continue
    # find all words and timestamps
    # e.g. from<00:00:00.280><c> the</c><00:00:00.480><c> moment</c>
    matches = re.finditer(r'(?:<(\d+:\d+:\d+\.\d+)>)?\s*(?:<c>)?\s*([a-zA-Z0-9_\'\-]+)(?:</c>)?', l)
    for m in matches:
        w = m.group(2)
        ts = m.group(1)
        if w:
            tokens.append((w, ts))

print(f"Total tokens extracted: {len(tokens)}")
for w, ts in tokens[:30]:
    print(f"  {w} @ {ts}")
