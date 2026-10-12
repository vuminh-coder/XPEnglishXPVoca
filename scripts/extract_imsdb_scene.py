path = r'C:\Users\VU VAN MINH\.gemini\antigravity\brain\75160da0-6646-41c9-817c-8e932ebd6caa\.system_generated\steps\4922\content.md'
with open(path, 'r', encoding='latin-1') as f:
    text = f.read()

idx = text.lower().find("how's the play going")
print("Index:", idx)
if idx != -1:
    scene = text[max(0, idx - 800): idx + 6000]
    with open('scripts/laland_dinner_scene_script.txt', 'w', encoding='utf-8') as out:
        out.write(scene)
    print("Saved scene to scripts/laland_dinner_scene_script.txt")
else:
    print("Not found with exact string, searching 'play going'")
    idx2 = text.lower().find("play going")
    print("Index 2:", idx2)
