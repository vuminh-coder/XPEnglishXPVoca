import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

# 1. Load ARPABET to IPA converter
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

cmu_map = {}
with open('scripts/cmudict.dict', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        parts = line.split()
        word = parts[0].lower()
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

# Special overrides
cmu_map.update({
    'hablas': 'ˈaβlas',
    'español': 'espaˈɲol',
    'parlez-vous': 'pɑːrleɪˈvuː',
    'parlezvous': 'pɑːrleɪˈvuː',
    'français': 'fʁɑ̃sɛ',
    'francais': 'fʁɑ̃sɛ',
    'sí': 'siː',
    'si': 'siː',
    'oui': 'wiː',
    '会': 'hweɪ',
    '你': 'niː',
    '说': 'ʃwɔː',
    '中文': 'ʈʂʊŋwən',
    '吗': 'ma',
    'hola': 'ˈoʊlə',
    'bonjour': 'bɔ̃ˈʒuʁ',
    '你好': 'niː haʊ',
    'gabriella': 'ˌɡæbriˈɛlə',
    'gabriellas': 'ˌɡæbriˈɛləz',
    'peru': 'pəˈruː',
    'dorsolateral': 'ˌdɔːrsoʊˈlætərəl',
    'prefrontal': 'priːˈfrʌntəl',
    'lateralization': 'ˌlætərəlaɪˈzeɪʃən',
    'lateralized': 'ˈlætərəˌlaɪzd',
    'neurolinguists': 'ˌnʊroʊˈlɪŋɡwɪsts',
    'neurolinguist': 'ˌnʊroʊˈlɪŋɡwɪst',
    'alzheimers': 'ˈɑːltshaɪmərz',
    'alzheimer': 'ˈɑːltshaɪmər',
    'synapses': 'ˈsɪnæpsɪz',
    'crosslanguage': 'krɔːsˈlæŋɡwɪdʒ',
    'two-years': 'ˈtuː jɪrz',
    'twoyears': 'ˈtuː jɪrz',
    '1960s': 'ˌnaɪnˈtiːn ˈsɪkstiz',
    'bilinguals': 'baɪˈlɪŋɡwəlz',
    'hemispheres': 'ˈhɛmɪˌsfɪərz',
    'immigrates': 'ˈɪmɪˌɡreɪts',
    'plasticity': 'plæˈstɪsɪti',
})

def get_word_ipa(w):
    clean = w.lower().strip(".,?!:;\"'()[]¿¡-—‘’“”")
    if not clean:
        return ""
    if clean in cmu_map:
        return cmu_map[clean]
    # Check without apostrophe
    no_apos = clean.replace("'", "").replace("’", "")
    if no_apos in cmu_map:
        return cmu_map[no_apos]
    # Check parts
    parts = clean.split('-')
    if len(parts) > 1 and all(p in cmu_map for p in parts):
        return ' '.join(cmu_map[p] for p in parts)
    return clean

def sentence_to_ipa(sentence):
    # Split by spaces and words
    tokens = sentence.split()
    ipas = []
    for t in tokens:
        ipa = get_word_ipa(t)
        if ipa:
            ipas.append(ipa)
    return "/" + " ".join(ipas) + "/"

# 2. Load en.json3 cues
with open('scripts/ted_bilingual_brain.en.json3', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

en_cues = []
for ev in en_data.get('events', []):
    segs = ev.get('segs', [])
    text = ''.join([s.get('utf8', '') for s in segs]).replace('\n', ' ').strip()
    if text:
        t_start = ev.get('tStartMs', 0) / 1000.0
        d_dur = ev.get('dDurationMs', 0) / 1000.0
        en_cues.append({'start': round(t_start, 2), 'end': round(t_start + d_dur, 2), 'text': text})

grouping = [
    [0], [1], [2], [3, 4], [5, 6], [7], [8, 9], [10, 11], [12, 13], [14, 15],
    [16, 17], [18, 19, 20], [21, 22], [23, 24], [25, 26], [27, 28, 29], [30, 31, 32], [33, 34, 35],
    [36, 37], [38, 39], [40, 41, 42], [43, 44, 45, 46], [47, 48], [49, 50], [51, 52, 53],
    [54, 55], [56, 57], [58, 59, 60], [61], [62, 63, 64], [65, 66, 67], [68, 69],
    [70, 71], [72, 73, 74], [75, 76, 77], [78, 79, 80], [81, 82], [83, 84, 85], [86, 87, 88]
]

print(f"Total grouping segments: {len(grouping)}")

# Let's inspect each segment text and construct metadata
master_segments = []

# Translations, explanations, proper nouns, keywords definitions for all 39 segments
# We will define a structured dictionary for each of the 39 segments.
