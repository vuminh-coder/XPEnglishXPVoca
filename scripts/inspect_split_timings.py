import re

with open('scripts/natgeo_auto_sub.en.vtt', 'r', encoding='utf-8') as f:
    text = f.read()

def to_sec(ts):
    h, m, s = ts.split(':')
    return round(int(h)*3600 + int(m)*60 + float(s), 2)

cues = re.findall(r'(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})[^\n]*\n(.*?)(?=\n\d{2}:\d{2}:\d{2}\.\d{3}|\Z)', text, re.DOTALL)
spoken = []
for start, end, body in cues:
    s_sec = to_sec(start)
    e_sec = to_sec(end)
    if e_sec - s_sec > 0.05:
        lines = [l.strip() for l in body.split('\n') if l.strip()]
        if lines:
            cleaned = re.sub(r'<[^>]+>', '', lines[-1]).strip()
            if cleaned and cleaned != '[Music]' and cleaned != 'you':
                spoken.append((s_sec, e_sec, cleaned))

# Let's inspect cues between 55s and 70s (emissions)
print("--- 55s to 70s ---")
for s, e, t in spoken:
    if 55 <= s <= 72:
        print(f"[{s:6.2f} - {e:6.2f}]: {t}")

# Let's inspect cues between 135s and 175s
print("\n--- 135s to 175s ---")
for s, e, t in spoken:
    if 135 <= s <= 175:
        print(f"[{s:6.2f} - {e:6.2f}]: {t}")
