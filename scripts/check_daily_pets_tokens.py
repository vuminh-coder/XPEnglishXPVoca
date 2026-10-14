import sys, re

sys.stdout.reconfigure(encoding='utf-8')

# Read lesson_daily_pets.ts
with open('features/listening/data/lessons/lesson_daily_pets.ts', 'r', encoding='utf-8') as f:
    code = f.read()

# Extract segments
import re
segments_block = code[code.find('segments: ['):code.rfind(']')]
raw_segs = re.findall(r'orderIndex:\s*(\d+).*?text:\s*["\'](.*?)["\'].*?ipaUs:\s*["\'](.*?)["\'].*?tokenCount:\s*(\d+)', segments_block, re.DOTALL)

print(f"Extracted segments: {len(raw_segs)}")
for idx, txt, ipa, tok in raw_segs:
    expected_tok = len(re.findall(r'\b[A-Za-z0-9_]+\b', txt))
    print(f"Seg {int(idx):02d}: stored_tok={tok}, expected_tok={expected_tok}, ipa='{ipa[:30]}...' | '{txt[:45]}'")
