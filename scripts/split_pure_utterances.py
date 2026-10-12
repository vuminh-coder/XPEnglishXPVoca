import json

lines = json.load(open('scripts/about_time_lines.json', encoding='utf-8'))

# Opening lines from 0:00 to 0:21
opening = [
    {"speaker": "Dad", "text": "I have something very important to tell you."},
    {"speaker": "Dad", "text": "Or, let me check, do you want to know the big secret,"},
    {"speaker": "Dad", "text": "or would you rather find it out for yourself like I did?"},
    {"speaker": "Tim", "text": "Oh, Christ, there's another secret?"},
    {"speaker": "Dad", "text": "Less dramatic."},
    {"speaker": "Dad", "text": "Much more important."},
    {"speaker": "Dad", "text": "The real mothership."}
]

scene_lines = [l for l in lines if 1705 <= l['idx'] <= 1774]

all_utterances = []
for op in opening:
    all_utterances.append(op)

for sl in scene_lines:
    txt = sl['text']
    # Check if multiple lines separated by -
    if txt.startswith('- '):
        parts = [p.strip() for p in txt.split('- ') if p.strip()]
        for p in parts:
            all_utterances.append({"idx": sl['idx'], "text": p})
    else:
        all_utterances.append({"idx": sl['idx'], "text": txt})

# Ending line after 1774
all_utterances.append({"idx": 1775, "text": "It's okay, I'm home now."})

print(f"Total individual pure utterances: {len(all_utterances)}")
for i, u in enumerate(all_utterances):
    print(f"[{i:2d}] {u['text']}")
