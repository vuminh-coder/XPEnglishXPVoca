import json

with open('scripts/before_sunrise_official_full_transcript.json', 'r', encoding='utf-8') as f:
    raw_cues = json.load(f)

# Helper to get clean text for cue
def get_cue_text(c):
    parts = c.get('textParts', [])
    if not parts:
        return ""
    if len(parts) >= 2 and ('second' in parts[0] or 'minute' in parts[0]):
        return ' '.join(parts[1:]).strip()
    return ' '.join(parts).strip()

cues = [{'idx': c['index'], 'ts': c['timestamp'], 'text': get_cue_text(c)} for c in raw_cues]

# Let's inspect the poem cues 84-89
print("Poem cues:")
for i in range(84, 90):
    print(cues[i])

# Let's inspect end cues 90-94
print("End cues:")
for i in range(90, 95):
    print(cues[i])
