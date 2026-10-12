import re
import json

def time_to_sec(t_str):
    parts = t_str.split(':')
    return float(parts[0]) * 3600 + float(parts[1]) * 60 + float(parts[2])

def parse_vtt(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    blocks = re.split(r'\n\n+', content.strip())
    cues = []
    
    for block in blocks:
        lines = block.strip().split('\n')
        time_line = None
        text_lines = []
        for line in lines:
            if '-->' in line:
                time_line = line
            elif time_line and line.strip() and not line.startswith('WEBVTT') and not line.startswith('Kind:') and not line.startswith('Language:'):
                text_lines.append(line.strip())
        
        if time_line and text_lines:
            match = re.search(r'(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})', time_line)
            if match:
                start_str, end_str = match.groups()
                clean_text = ' '.join(text_lines)
                clean_text = re.sub(r'<[^>]+>', '', clean_text)
                clean_text = clean_text.replace('&gt;&gt;', '').strip()
                clean_text = re.sub(r'\s+', ' ', clean_text)
                if clean_text:
                    cues.append({
                        'start': time_to_sec(start_str),
                        'end': time_to_sec(end_str),
                        'start_str': start_str,
                        'end_str': end_str,
                        'text': clean_text
                    })
    return cues

cues = parse_vtt('scripts/video_01_subs.en-orig.vtt')

# Filter duplicate consecutive rolling lines from auto-captions
filtered = []
for c in cues:
    txt = c['text']
    # If the text is just repeating the previous text partially, merge
    if filtered and txt.startswith(filtered[-1]['text']):
        filtered[-1]['end'] = c['end']
        filtered[-1]['text'] = txt
    elif filtered and filtered[-1]['text'] == txt:
        filtered[-1]['end'] = max(filtered[-1]['end'], c['end'])
    else:
        filtered.append(c)

with open('scripts/parsed_actual_speech.json', 'w', encoding='utf-8') as f:
    json.dump(filtered, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(filtered)} filtered speech items.")
