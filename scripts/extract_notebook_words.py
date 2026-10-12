import re
import json

def parse_time(t_str):
    parts = t_str.split(':')
    h = int(parts[0])
    m = int(parts[1])
    s = float(parts[2])
    return h * 3600 + m * 60 + s

with open('scripts/subs/Y5hVdlRFAUo.en.vtt', 'r', encoding='utf-8') as f:
    text = f.read()

# In YouTube VTT, lines with word-level tags <hh:mm:ss.sss><c> word</c> exist!
# Example: >> Have<00:00:04.880><c> you</c><00:00:05.120><c> slipped</c><00:00:05.440><c> your</c><00:00:05.759><c> leg?</c>
# Let's extract the exact word stream with timestamps!

word_stream = []

blocks = text.split('\n\n')
for block in blocks:
    lines = [l.strip() for l in block.split('\n') if l.strip()]
    if len(lines) < 2:
        continue
    
    # Look for timestamp line
    m_time = re.search(r'(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})', lines[0])
    content_lines = lines[1:]
    if not m_time and len(lines) > 2:
        m_time = re.search(r'(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})', lines[1])
        content_lines = lines[2:]
    
    if not m_time:
        continue
    
    cue_start = parse_time(m_time.group(1))
    cue_end = parse_time(m_time.group(2))
    
    for line in content_lines:
        line_clean = line.replace('&gt;&gt;', '').replace('&#39;', "'").replace('&quot;', '"').replace('&amp;', '&').strip()
        if not line_clean:
            continue
        # Check if line contains word timing tags: <00:00:04.880><c> word</c>
        # Often the first word doesn't have a leading tag, but follows the cue_start!
        # Let's match all word segments
        if '<' in line_clean and '>' in line_clean:
            # Tokenize: words and tags
            # e.g.: Have<00:00:04.880><c> you</c><00:00:05.120><c> slipped</c>
            parts = re.split(r'(<\d{2}:\d{2}:\d{2}\.\d{3}>)', line_clean)
            cur_time = cue_start
            for p in parts:
                p = p.strip()
                if not p:
                    continue
                tag_m = re.match(r'<(\d{2}:\d{2}:\d{2}\.\d{3})>', p)
                if tag_m:
                    cur_time = parse_time(tag_m.group(1))
                else:
                    # Clean tags like <c>, </c>
                    w_clean = re.sub(r'</?c>', '', p).strip()
                    if w_clean:
                        for single_word in w_clean.split():
                            word_stream.append({
                                'time': round(cur_time, 2),
                                'word': single_word
                            })

# Let's deduplicate word_stream by (word, time)
unique_words = []
last_w = None
last_t = -1
for w in word_stream:
    if w['word'] == last_w and abs(w['time'] - last_t) < 0.5:
        continue
    unique_words.append(w)
    last_w = w['word']
    last_t = w['time']

print(f"Total word tokens extracted: {len(unique_words)}")
sample_text = ' '.join([w['word'] for w in unique_words])
print(f"Sample full text length (words): {len(unique_words)}")

with open('scripts/notebook_extracted_words.json', 'w', encoding='utf-8') as f:
    json.dump(unique_words, f, ensure_ascii=False, indent=2)

with open('scripts/notebook_full_spoken_text.txt', 'w', encoding='utf-8') as f:
    f.write(sample_text)

print(f"First 200 words preview:\n{' '.join([w['word'] for w in unique_words[:200]])}")
