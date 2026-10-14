import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

# Arpabet to IPA mapping for General American
ARPABET_TO_IPA = {
    'AA': 'ɑː', 'AA0': 'ɑː', 'AA1': 'ˈɑː', 'AA2': 'ˌɑː',
    'AE': 'æ',  'AE0': 'æ',  'AE1': 'ˈæ',  'AE2': 'ˌæ',
    'AH': 'ʌ',  'AH0': 'ə',  'AH1': 'ˈʌ',  'AH2': 'ˌʌ',
    'AO': 'ɔː', 'AO0': 'ɔː', 'AO1': 'ˈɔː', 'AO2': 'ˌɔː',
    'AW': 'aʊ', 'AW0': 'aʊ', 'AW1': 'ˈaʊ', 'AW2': 'ˌaʊ',
    'AY': 'aɪ', 'AY0': 'aɪ', 'AY1': 'ˈaɪ', 'AY2': 'ˌaɪ',
    'B': 'b',
    'CH': 'tʃ',
    'D': 'd',
    'DH': 'ð',
    'EH': 'e',  'EH0': 'e',  'EH1': 'ˈe',  'EH2': 'ˌe',
    'ER': 'ɜːr', 'ER0': 'ər', 'ER1': 'ˈɜːr', 'ER2': 'ˌɜːr',
    'EY': 'eɪ', 'EY0': 'eɪ', 'EY1': 'ˈeɪ', 'EY2': 'ˌeɪ',
    'F': 'f',
    'G': 'ɡ',
    'HH': 'h',
    'IH': 'ɪ',  'IH0': 'ɪ',  'IH1': 'ˈɪ',  'IH2': 'ˌɪ',
    'IY': 'iː', 'IY0': 'i',  'IY1': 'ˈiː', 'IY2': 'ˌiː',
    'JH': 'dʒ',
    'K': 'k',
    'L': 'l',
    'M': 'm',
    'N': 'n',
    'NG': 'ŋ',
    'OW': 'oʊ', 'OW0': 'oʊ', 'OW1': 'ˈoʊ', 'OW2': 'ˌoʊ',
    'OY': 'ɔɪ', 'OY0': 'ɔɪ', 'OY1': 'ˈɔɪ', 'OY2': 'ˌɔɪ',
    'P': 'p',
    'R': 'r',
    'S': 's',
    'SH': 'ʃ',
    'T': 't',
    'TH': 'θ',
    'UH': 'ʊ',  'UH0': 'ʊ',  'UH1': 'ˈʊ',  'UH2': 'ˌʊ',
    'UW': 'uː', 'UW0': 'u',  'UW1': 'ˈuː', 'UW2': 'ˌuː',
    'V': 'v',
    'W': 'w',
    'Y': 'j',
    'Z': 'z',
    'ZH': 'ʒ'
}

# Parse cmudict
cmu_map = {}
with open('scripts/cmudict.dict', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        parts = line.split()
        word = parts[0].lower()
        # Remove variant like word(2)
        word = re.sub(r'\(\d+\)$', '', word)
        phones = parts[1:]
        ipa_parts = []
        stress = ''
        for p in phones:
            ipa_char = ARPABET_TO_IPA.get(p, '')
            if ipa_char.startswith('ˈ'):
                stress = 'ˈ'
                ipa_char = ipa_char[1:]
            elif ipa_char.startswith('ˌ'):
                if not stress:
                    stress = 'ˌ'
                ipa_char = ipa_char[1:]
            ipa_parts.append(ipa_char)
        full_ipa = stress + ''.join(ipa_parts)
        if word not in cmu_map:
            cmu_map[word] = full_ipa

print(f"Loaded {len(cmu_map)} words from cmudict")

# Test some sleep-related words
for w in ['testicles', 'hippocampus', 'superpower', 'sleep', 'deprivation', 'dementia', 'alzheimer']:
    print(f"{w} -> /{cmu_map.get(w, 'NOT FOUND')}/")
