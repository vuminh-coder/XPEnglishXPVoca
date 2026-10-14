import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/pets_11_calibrated.json', 'r', encoding='utf-8') as f:
    calibrated = json.load(f)

for seg in calibrated:
    # clean ipaUs
    ipa = seg.get('ipaUs', '').strip()
    ipa = re.sub(r'[\.,;]+', '', ipa).strip()
    if not ipa.startswith('/'):
        ipa = '/' + ipa
    if not ipa.endswith('/'):
        ipa = ipa + '/'
    seg['ipaUs'] = ipa
    
    # calculate exact regex tokenCount
    tokens = re.findall(r'\b[A-Za-z0-9_]+\b', seg['text'])
    seg['tokenCount'] = len(tokens)
    print(f"Seg {seg['orderIndex']:02d}: tok={seg['tokenCount']:2d} | ipa={seg['ipaUs'][:35]}... | {seg['text']}")

# Save back to calibrated json
with open('scripts/pets_11_calibrated.json', 'w', encoding='utf-8') as f:
    json.dump(calibrated, f, ensure_ascii=False, indent=2)

print("\nSuccessfully updated scripts/pets_11_calibrated.json!")
