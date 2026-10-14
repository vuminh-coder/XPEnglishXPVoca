import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('features/listening/data/lessons/lesson_airport_checkin.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract segments
seg_blocks = re.findall(r'orderIndex:\s*(\d+).*?text:\s*["\'](.*?)["\'].*?translationVi:\s*["\'](.*?)["\'].*?ipaUs:\s*["\'](.*?)["\'].*?tokenCount:\s*(\d+)', content, re.DOTALL)

print(f"Extracted segments: {len(seg_blocks)}")
mismatches = 0
for idx, txt, vi, ipa, tok in seg_blocks:
    expected_tok = len(re.findall(r'\b[A-Za-z0-9_]+\b', txt))
    stored_tok = int(tok)
    if expected_tok != stored_tok:
        print(f"Mismatch at seg {idx}: stored={stored_tok}, expected={expected_tok}, text='{txt}'")
        mismatches += 1
    if not (ipa.startswith('/') and ipa.endswith('/')):
        print(f"Invalid IPA at seg {idx}: {ipa}")
print(f"Token mismatches: {mismatches}")

# Extract quiz questions
q_matches = re.findall(r'id:\s*["\'](q_airport_checkin_\d+)["\'].*?referenceSegmentIndex:\s*(\d+)', content, re.DOTALL)
print(f"Extracted quiz questions: {len(q_matches)}")
for qid, ref_idx in q_matches:
    print(f"  {qid}: ref_idx={ref_idx}")
