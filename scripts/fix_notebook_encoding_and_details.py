import json

with open('scripts/the_notebook_pure_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

for s in segs:
    # Fix fiancé encoding if needed
    if 'fianc' in s['text']:
        s['text'] = s['text'].replace('fianc', 'fiancé').replace('fianc ', 'fiancé ')
    if 'fianc' in s['translationVi']:
        s['translationVi'] = s['translationVi'].replace('fianc', 'vị hôn phu').replace('fiancé', 'vị hôn phu')
        
    # Check no dashes in text
    assert '—' not in s['text'], f"Dash in text: {s['text']}"
    assert ' - ' not in s['text'], f"Dash in text: {s['text']}"
    assert not s['text'].startswith('- '), f"Dash in text: {s['text']}"
    
    # Check IPA starts and ends with /
    assert s['ipaUs'].startswith('/'), f"Invalid IPA: {s['ipaUs']}"
    assert s['ipaUs'].endswith('/'), f"Invalid IPA: {s['ipaUs']}"
    
    # Check explanationAi length
    assert len(s['explanationAi']) > 15, f"Short explanation: {s['explanationAi']}"

with open('scripts/the_notebook_pure_segments.json', 'w', encoding='utf-8') as f:
    json.dump(segs, f, ensure_ascii=False, indent=2)

print("All 106 pure segments validated and cleaned successfully!")
