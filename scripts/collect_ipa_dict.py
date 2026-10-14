import sys
import os
import glob
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

dict_map = {}

# Scan all lesson files
lesson_files = glob.glob('features/listening/data/lessons/**/*.ts', recursive=True)
print(f"Found {len(lesson_files)} lesson files")

for fpath in lesson_files:
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Match segments with text and ipaUs
        # orderIndex, text, ipaUs
        matches = re.findall(r'text:\s*"([^"]+)",[\s\S]*?ipaUs:\s*"([^"]+)"', content)
        for text, ipa in matches:
            words = re.findall(r'[A-Za-z0-9_\']+', text.lower())
            clean_ipa = ipa.strip().strip('/').strip()
            ipa_tokens = clean_ipa.split()
            # If word count matches ipa token count approximately
            if len(words) == len(ipa_tokens):
                for w, ip in zip(words, ipa_tokens):
                    w_clean = re.sub(r'[^a-z0-9]', '', w)
                    if w_clean and w_clean not in dict_map:
                        dict_map[w_clean] = ip
    except Exception as e:
        pass

print(f"Total vocabulary words in collected dictionary: {len(dict_map)}")
with open('scripts/extracted_ipa_dict.json', 'w', encoding='utf-8') as f:
    json.dump(dict_map, f, ensure_ascii=False, indent=2)
