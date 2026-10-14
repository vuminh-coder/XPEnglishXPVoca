import re
import json

# Word timings from vtt
with open('scripts/jensen_huang_auto.en.vtt', 'r', encoding='utf-8') as f:
    vtt = f.read()

# Parse word-level timestamps:
# format: word<timestamp><c> next_word</c>
# Let's extract all words with their start time in seconds
word_timestamps = []
current_time = 0.0

for line in vtt.split('\n'):
    m_range = re.match(r'(\d+:\d+:\d+\.\d+)\s*-->\s*(\d+:\d+:\d+\.\d+)', line)
    if m_range:
        parts = m_range.group(1).split(':')
        current_time = int(parts[0]) * 3600 + int(parts[1]) * 60 + float(parts[2])
        continue
    
    # Extract timestamps within line
    tokens = re.finditer(r'(?:<(\d+:\d+:\d+\.\d+)>)?\s*(?:<c>)?\s*([a-zA-Z0-9_\'\-]+)(?:</c>)?', line)
    for tok in tokens:
        ts_str = tok.group(1)
        w = tok.group(2)
        if ts_str:
            p = ts_str.split(':')
            t_sec = int(p[0]) * 3600 + int(p[1]) * 60 + float(p[2])
            current_time = t_sec
        if w and w.lower() not in ['webvtt', 'kind', 'captions', 'language', 'en']:
            word_timestamps.append((w.lower(), round(current_time, 2)))

print(f"Total word tokens with time: {len(word_timestamps)}")
# Sample
for i in range(min(25, len(word_timestamps))):
    print(f"  {word_timestamps[i][0]} @ {word_timestamps[i][1]}s")
