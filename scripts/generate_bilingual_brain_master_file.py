import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

# 1. ARPABET TO IPA MAPPING
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
    'didnt': 'ˈdɪdənt',
    'shes': 'ʃiːz',
    'youre': 'jʊr',
    'its': 'ɪts',
    'lets': 'lɛts',
})

def get_word_ipa(w):
    clean = w.lower().strip(".,?!:;\"'()[]¿¡-—‘’“”")
    if not clean:
        return ""
    if clean in cmu_map:
        return cmu_map[clean]
    no_apos = clean.replace("'", "").replace("’", "")
    if no_apos in cmu_map:
        return cmu_map[no_apos]
    parts = clean.split('-')
    if len(parts) > 1 and all(p in cmu_map for p in parts):
        return ' '.join(cmu_map[p] for p in parts)
    return clean

def sentence_to_ipa(sentence):
    tokens = sentence.split()
    ipas = []
    for t in tokens:
        ipa = get_word_ipa(t)
        if ipa:
            ipas.append(ipa)
    return "/" + " ".join(ipas) + "/"

# 2. LOAD EN.JSON3 CUES
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

# Manual metadata for all 39 segments
meta = [
    # 0
    {
        "translationVi": "Bạn có nói tiếng Tây Ban Nha? Bạn có nói tiếng Pháp? Bạn có nói tiếng Trung không?",
        "properNouns": ["Hablas", "español", "Parlez-vous", "français", "你会说中文吗"],
        "keywords": ["español", "français", "中文"],
        "explanationAi": "Lời chào mở đầu bằng 3 ngoại ngữ phổ biến (Tây Ban Nha, Pháp, Quan Thoại) gợi mở chủ đề đa ngôn ngữ toàn cầu."
    },
    # 1
    {
        "translationVi": "Nếu bạn đã trả lời 'sí' (có), 'oui' (vâng), hoặc '会' (biết) và bạn đang xem video này bằng tiếng Anh,",
        "properNouns": ["English", "sí", "oui", "会"],
        "keywords": ["answered", "watching", "English"],
        "explanationAi": "Tình huống chuyển giao từ lời đáp ngoại ngữ sang ngữ cảnh tiếp nhận nội dung bằng tiếng Anh."
    },
    # 2
    {
        "translationVi": "rất có thể bạn thuộc về bộ phận đa số những người song ngữ và đa ngôn ngữ trên thế giới.",
        "properNouns": [],
        "keywords": ["chances", "belong", "bilingual", "multilingual", "majority"],
        "explanationAi": "'chances are' là thành ngữ chỉ xác suất cao; 'bilingual and multilingual majority' nhấn mạnh đa số dân số toàn cầu biết từ 2 ngôn ngữ trở lên."
    },
    # 3
    {
        "translationVi": "Và bên cạnh việc đi du lịch dễ dàng hơn hay xem phim không cần phụ đề,",
        "properNouns": [],
        "keywords": ["besides", "easier", "traveling", "movies", "subtitles"],
        "explanationAi": "'besides having an easier time' dùng để bổ sung các lợi ích thực tế đời sống trước khi phân tích cơ chế giải phẫu não bộ."
    },
    # 4
    {
        "translationVi": "việc biết từ hai ngôn ngữ trở lên đồng nghĩa với việc bộ não của bạn có thể thực sự mang cấu trúc và vận hành khác biệt so với những người bạn đơn ngữ.",
        "properNouns": [],
        "keywords": ["knowing", "languages", "brain", "differently", "monolingual"],
        "explanationAi": "'monolingual' chỉ người chỉ nói một ngôn ngữ; 'look and work differently' ám chỉ khác biệt về cả cấu trúc lẫn chức năng sinh lý thần kinh."
    },
    # 5
    {
        "translationVi": "Vậy thực sự biết một ngôn ngữ có nghĩa là gì?",
        "properNouns": [],
        "keywords": ["really", "mean", "know", "language"],
        "explanationAi": "Câu hỏi tu từ bản lề đặt nền móng định nghĩa lại khái niệm năng lực ngôn ngữ theo thang đo khoa học thần kinh."
    },
    # 6
    {
        "translationVi": "Năng lực ngôn ngữ thường được đo lường qua hai kỹ năng chủ động là nói và viết, cùng hai kỹ năng tiếp nhận là nghe và đọc.",
        "properNouns": [],
        "keywords": ["typically", "measured", "active parts", "passive parts", "speaking", "writing", "listening", "reading"],
        "explanationAi": "Phân loại 4 kỹ năng cốt lõi thành 'active' (sản sinh: nói, viết) và 'passive'/'receptive' (tiếp nhận: nghe, đọc)."
    },
    # 7
    {
        "translationVi": "Trong khi một người song ngữ cân bằng sở hữu năng lực gần như tương đương nhau ở mọi kỹ năng trong cả hai ngôn ngữ,",
        "properNouns": [],
        "keywords": ["balanced bilingual", "near equal", "abilities", "across the board"],
        "explanationAi": "'balanced bilingual' là người song ngữ hoàn hảo; 'across the board' là thành ngữ mang nghĩa toàn diện trên mọi phương diện."
    },
    # 8
    {
        "translationVi": "hầu hết những người song ngữ trên khắp thế giới biết và sử dụng các ngôn ngữ của mình theo những tỷ lệ khác nhau.",
        "properNouns": [],
        "keywords": ["bilinguals", "around the world", "varying proportions"],
        "explanationAi": "'varying proportions' chỉ tỷ lệ phân bổ năng lực và tần suất sử dụng không đồng đều giữa các ngôn ngữ."
    },
    # 9
    {
        "translationVi": "Và tùy thuộc vào hoàn cảnh cũng như cách thức tiếp thu từng ngôn ngữ, họ có thể được phân loại thành ba nhóm tổng quát.",
        "properNouns": [],
        "keywords": ["depending", "situation", "acquired", "classified", "three general types"],
        "explanationAi": "'acquired' ám chỉ quá trình đắc thụ ngôn ngữ tự nhiên; báo hiệu 3 nhóm phân loại: compound, coordinate, và subordinate."
    },
    # 10
    {
        "translationVi": "Ví dụ, hãy lấy trường hợp của Gabriella, người có gia đình di cư đến Mỹ từ Peru khi cô bé mới hai tuổi.",
        "properNouns": ["Gabriella", "US", "Peru"],
        "keywords": ["immigrates", "Peru", "two-years old"],
        "explanationAi": "Trường hợp điển hình của người tiếp thu ngôn ngữ song song từ thời ấu thơ trước lứa tuổi hình thành khái niệm độc lập."
    },
    # 11
    {
        "translationVi": "Với tư cách là người song ngữ phức hợp, Gabriella phát triển hai mã ngôn ngữ cùng một lúc gắn liền với một hệ khái niệm duy nhất,",
        "properNouns": ["Gabriella"],
        "keywords": ["compound bilingual", "linguistic codes", "simultaneously", "single set of concepts"],
        "explanationAi": "'compound bilingual' (song ngữ phức hợp) hình thành khi trẻ học đồng thời 2 thứ tiếng cùng lúc, dùng chung 1 hệ khái niệm nhận thức trong não bộ."
    },
    # 12
    {
        "translationVi": "học cả tiếng Anh và tiếng Tây Ban Nha khi cô bé bắt đầu xử lý và nhận thức thế giới xung quanh mình.",
        "properNouns": ["English", "Spanish"],
        "keywords": ["learning", "English", "Spanish", "process the world"],
        "explanationAi": "Mô tả cơ chế tiếp nhận song song: từ 'water' và 'agua' cùng gắn vào một hình ảnh trừu tượng của nước."
    },
    # 13
    {
        "translationVi": "Người anh trai tuổi thiếu niên của cô bé, mặt khác, có thể là người song ngữ tọa độ, vận hành với hai hệ khái niệm tách biệt,",
        "properNouns": [],
        "keywords": ["coordinate bilingual", "working", "two sets of concepts"],
        "explanationAi": "'coordinate bilingual' (song ngữ tọa độ) học 2 ngôn ngữ ở 2 môi trường tách biệt, sở hữu hai mạng lưới khái niệm riêng biệt."
    },
    # 14
    {
        "translationVi": "học tiếng Anh tại trường, trong khi vẫn tiếp tục nói tiếng Tây Ban Nha ở nhà và với bạn bè.",
        "properNouns": ["English", "Spanish"],
        "keywords": ["English", "school", "Spanish", "home", "friends"],
        "explanationAi": "Minh họa phân định môi trường học thuật (tiếng Anh) tách biệt với môi trường gia đình, tình cảm (tiếng Tây Ban Nha)."
    },
    # 15
    {
        "translationVi": "Cuối cùng, cha mẹ của Gabriella nhiều khả năng là những người song ngữ phụ thuộc, những người học ngôn ngữ thứ hai thông qua việc lọc qua ngôn ngữ mẹ đẻ.",
        "properNouns": ["Gabriella's"],
        "keywords": ["subordinate bilinguals", "secondary language", "filtering", "primary language"],
        "explanationAi": "'subordinate bilingual' (song ngữ phụ thuộc) là người học ngôn ngữ thứ hai khi đã trưởng thành, luôn dịch ngầm qua tiếng mẹ đẻ."
    },
    # 16
    {
        "translationVi": "Bởi vì tất cả các nhóm người song ngữ đều có thể trở nên cực kỳ thành thạo một ngôn ngữ bất kể giọng điệu hay phát âm, sự khác biệt này có thể không dễ nhận thấy đối với một người quan sát thông thường.",
        "properNouns": [],
        "keywords": ["proficient", "regardless", "accent", "pronunciation", "apparent", "casual observer"],
        "explanationAi": "'casual observer' chỉ người quan sát bề ngoài; dù phong cách học tập khác nhau nhưng đều đạt độ thành thạo lưu loát."
    },
    # 17
    {
        "translationVi": "Thế nhưng những tiến bộ gần đây trong công nghệ chẩn đoán hình ảnh não bộ đã giúp các nhà thần kinh ngôn ngữ học có được cái nhìn sâu sắc về cách các khía cạnh cụ thể của việc học ngôn ngữ tác động lên bộ não song ngữ.",
        "properNouns": [],
        "keywords": ["advances", "brain imaging technology", "neurolinguists", "glimpse", "bilingual brain"],
        "explanationAi": "'neurolinguists' là các nhà thần kinh ngôn ngữ học; fMRI và PET scan mở ra khả năng quan sát trực tiếp hoạt động điện não."
    },
    # 18
    {
        "translationVi": "Ai cũng biết rằng bán cầu não trái chiếm ưu thế hơn và mang tính phân tích trong các quá trình tư duy logic,",
        "properNouns": [],
        "keywords": ["well known", "left hemisphere", "dominant", "analytical", "logical processes"],
        "explanationAi": "'left hemisphere' (bán cầu não trái) chuyên trách xử lý ngôn ngữ ngữ pháp, toán học và logic tuần tự."
    },
    # 19
    {
        "translationVi": "trong khi bán cầu não phải hoạt động tích cực hơn trong các khía cạnh cảm xúc và xã hội, dù điều này chỉ mang tính tương đối về mức độ chứ không phải sự phân tách tuyệt đối.",
        "properNouns": [],
        "keywords": ["right hemisphere", "emotional", "social", "matter of degree", "absolute split"],
        "explanationAi": "'matter of degree, not an absolute split' nhấn mạnh sự phối hợp liên tục giữa hai bán cầu qua thể chai (corpus callosum)."
    },
    # 20
    {
        "translationVi": "Thực tế là ngôn ngữ bao gồm cả hai loại chức năng này, trong khi sự chuyên biệt hóa bán cầu não phát triển dần theo độ tuổi, đã dẫn đến giả thuyết về giai đoạn then chốt.",
        "properNouns": [],
        "keywords": ["lateralization", "develops gradually", "critical period hypothesis"],
        "explanationAi": "'lateralization' (sự chuyên biệt hóa bán cầu); 'critical period hypothesis' (giả thuyết giai đoạn then chốt) cho rằng trẻ em tiếp thu ngôn ngữ dễ dàng nhất trước tuổi dậy thì."
    },
    # 21
    {
        "translationVi": "Theo lý thuyết này, trẻ em học ngôn ngữ dễ dàng hơn vì tính mềm dẻo của bộ não đang phát triển cho phép chúng sử dụng cả hai bán cầu não trong quá trình tiếp thu ngôn ngữ,",
        "properNouns": [],
        "keywords": ["theory", "plasticity", "developing brains", "both hemispheres", "language acquisition"],
        "explanationAi": "'plasticity' (tính mềm dẻo thần kinh) của não bộ trẻ nhỏ cho phép phân bổ chức năng ngôn ngữ trên diện rộng ở cả hai bán cầu."
    },
    # 22
    {
        "translationVi": "trong khi ở hầu hết người trưởng thành, chức năng ngôn ngữ đã bị khu biệt hóa về một bán cầu não duy nhất, thường là bán cầu trái.",
        "properNouns": [],
        "keywords": ["adults", "lateralized", "one hemisphere", "left"],
        "explanationAi": "Ở người lớn, vùng Broca và Wernicke bên bán cầu trái xử lý gần như toàn bộ cú pháp và từ vựng, hạn chế sự tham gia của bán cầu phải."
    },
    # 23
    {
        "translationVi": "Nếu điều này là đúng, việc học một ngôn ngữ từ thời thơ ấu có thể mang lại cho bạn sự thấu hiểu toàn diện hơn về các ngữ cảnh cảm xúc và xã hội của nó.",
        "properNouns": [],
        "keywords": ["childhood", "holistic grasp", "social", "emotional contexts"],
        "explanationAi": "'holistic grasp' là sự nắm bắt toàn diện, trực giác sâu sắc thay vì chỉ phân tích logic máy móc."
    },
    # 24
    {
        "translationVi": "Ngược lại, nghiên cứu gần đây chỉ ra rằng những người học ngôn ngữ thứ hai khi đã trưởng thành thể hiện ít thiên kiến cảm xúc hơn và có cách tiếp cận hợp lý hơn",
        "properNouns": [],
        "keywords": ["Conversely", "recent research", "adulthood", "less emotional bias", "rational approach"],
        "explanationAi": "Hiện tượng 'Foreign Language Effect': sử dụng ngôn ngữ thứ hai giúp cá nhân giảm bớt phản ứng bộc phát từ hạch hạnh nhân (amygdala) và suy nghĩ duy lý hơn."
    },
    # 25
    {
        "translationVi": "khi đối mặt với các vấn đề bằng ngôn ngữ thứ hai so với khi dùng tiếng mẹ đẻ của mình.",
        "properNouns": [],
        "keywords": ["confronting problems", "second language", "native one"],
        "explanationAi": "Khi giải quyết các bài toán đạo đức hoặc rủi ro tài chính bằng ngoại ngữ, con người đưa ra quyết định lý trí và khách quan hơn."
    },
    # 26
    {
        "translationVi": "Thế nhưng bất kể bạn tiếp thu thêm các ngôn ngữ vào thời điểm nào, việc sử dụng đa ngôn ngữ luôn mang lại cho bộ não của bạn những lợi thế vô cùng đáng kinh ngạc.",
        "properNouns": [],
        "keywords": ["regardless", "acquire", "multilingual", "remarkable advantages"],
        "explanationAi": "Khẳng định rằng dù học lúc nhỏ hay khi đã lớn tuổi, lợi ích sinh học thần kinh của đa ngôn ngữ vẫn luôn tồn tại."
    },
    # 27
    {
        "translationVi": "Một vài trong số đó thậm chí có thể nhìn thấy được trên ảnh chụp, chẳng hạn như mật độ chất xám cao hơn - nơi chứa phần lớn tế bào thần kinh và khớp thần kinh synap,",
        "properNouns": [],
        "keywords": ["visible", "higher density", "grey matter", "neurons", "synapses"],
        "explanationAi": "'grey matter' (chất xám) chứa thân nơ-ron và xi-náp; mật độ chất xám dày đặc phản ánh khả năng xử lý thông tin vượt trội."
    },
    # 28
    {
        "translationVi": "và hoạt động điện não mạnh mẽ hơn ở một số vùng nhất định khi kích hoạt ngôn ngữ thứ hai.",
        "properNouns": [],
        "keywords": ["activity", "regions", "engaging", "second language"],
        "explanationAi": "Hoạt động thần kinh gia tăng phản ánh sự phối hợp liên vùng giữa thùy trán, thùy thái dương và thùy đỉnh."
    },
    # 29
    {
        "translationVi": "Cường độ rèn luyện thể chất thần kinh cao mà bộ não song ngữ nhận được suốt cuộc đời cũng có thể giúp trì hoãn sự khởi phát của các căn bệnh như Alzheimer và chứng suy giảm trí nhớ lên tới năm năm.",
        "properNouns": ["Alzheimer's"],
        "keywords": ["heightened workout", "delay the onset", "Alzheimer's", "dementia", "five years"],
        "explanationAi": "'cognitive reserve' (kho dự trữ nhận thức) giúp người song ngữ chống chọi lại sự thoái hóa myelin và tổn thương não muộn hơn 4-5 năm so với người đơn ngữ."
    },
    # 30
    {
        "translationVi": "Ý niệm về những lợi ích nhận thức to lớn của việc biết song ngữ có thể có vẻ hiển nhiên vào ngày nay, nhưng điều đó từng khiến các chuyên gia thời kỳ trước kinh ngạc.",
        "properNouns": [],
        "keywords": ["cognitive benefits", "bilingualism", "intuitive", "surprised", "earlier experts"],
        "explanationAi": "Bước chuyển lịch sử trong ngành ngôn ngữ học: từ định kiến tiêu cực ban đầu sang công nhận khoa học hiện đại."
    },
    # 31
    {
        "translationVi": "Trước thập niên 1960, song ngữ từng bị coi là một bất lợi gây cản trở và làm chậm quá trình phát triển của trẻ nhỏ",
        "properNouns": [],
        "keywords": ["Before the 1960s", "handicap", "slowed", "development"],
        "explanationAi": "'handicap' (rào cản/bất lợi); các quan niệm giáo dục cũ từng sai lầm cho rằng học 2 thứ tiếng sẽ gây rối loạn nhận thức."
    },
    # 32
    {
        "translationVi": "do ép buộc chúng phải tiêu tốn quá nhiều năng lượng để phân biệt giữa các ngôn ngữ, một quan điểm chủ yếu dựa trên các nghiên cứu thiếu sót và sai lệch.",
        "properNouns": [],
        "keywords": ["forcing", "distinguishing", "languages", "flawed studies"],
        "explanationAi": "'flawed studies' là những nghiên cứu có khiếm khuyết phương pháp luận nghiêm trọng trong quá khứ."
    },
    # 33
    {
        "translationVi": "Và mặc dù một nghiên cứu gần đây hơn quả thực có chỉ ra rằng thời gian phản xạ và số lỗi sai có tăng nhẹ đối với một số học sinh song ngữ trong các bài kiểm tra chéo ngôn ngữ,",
        "properNouns": [],
        "keywords": ["recent study", "reaction times", "errors increase", "cross-language tests"],
        "explanationAi": "Thời gian phản xạ hơi chậm hơn do não phải thực hiện thêm tác vụ ức chế ngôn ngữ không kích hoạt (inhibition process)."
    },
    # 34
    {
        "translationVi": "nghiên cứu đó cũng chứng minh rằng nỗ lực và sự tập trung cần thiết để chuyển đổi qua lại giữa các ngôn ngữ đã kích hoạt nhiều hoạt động hơn, và có khả năng củng cố sức mạnh cho vỏ não trước trán lưng bên.",
        "properNouns": [],
        "keywords": ["effort", "attention", "switch between languages", "strengthened", "dorsolateral prefrontal cortex"],
        "explanationAi": "'dorsolateral prefrontal cortex' (DLPFC - vỏ não trước trán lưng bên) là trung tâm đầu não của sự tập trung và kiểm soát hành vi."
    },
    # 35
    {
        "translationVi": "Đây chính là phần não bộ đóng vai trò chủ chốt trong chức năng điều hành, giải quyết vấn đề, chuyển đổi linh hoạt giữa các nhiệm vụ, và duy trì sự tập trung trong khi lọc bỏ các thông tin gây nhiễu.",
        "properNouns": [],
        "keywords": ["executive function", "problem solving", "switching between tasks", "filtering out irrelevant information"],
        "explanationAi": "'executive function' (chức năng điều hành cấp cao) bao gồm khả năng ức chế xao nhãng, trí nhớ làm việc (working memory) và tính linh hoạt nhận thức."
    },
    # 36
    {
        "translationVi": "Vì vậy, mặc dù song ngữ có thể không nhất thiết làm cho bạn thông minh hơn, nhưng nó thực sự giúp bộ não của bạn khỏe mạnh hơn, phức tạp hơn và được kích hoạt gắn kết chủ động hơn,",
        "properNouns": [],
        "keywords": ["necessarily", "smarter", "healthy", "complex", "actively engaged"],
        "explanationAi": "Tổng kết luận điểm khoa học: không thổi phồng chỉ số IQ mà nhấn mạnh vào độ dẻo dai sinh học thần kinh và sức khỏe tinh thần dài hạn."
    },
    # 37
    {
        "translationVi": "và ngay cả khi bạn không có được may mắn học ngôn ngữ thứ hai từ thời thơ ấu, thì không bao giờ là quá muộn để tự ban tặng cho chính mình một món quà tuyệt vời",
        "properNouns": [],
        "keywords": ["good fortune", "second language", "child", "never too late", "do yourself a favor"],
        "explanationAi": "'do yourself a favor' là lời khuyên chân thành và khích lệ người học ở mọi độ tuổi bắt đầu học ngoại ngữ."
    },
    # 38
    {
        "translationVi": "và thực hiện bước nhảy vọt ngôn ngữ từ câu chào 'Hello' sang 'Hola', 'Bonjour' hay '你好', bởi vì đối với bộ não của chúng ta, một chút rèn luyện nhỏ cũng có thể mang lại hiệu quả to lớn và lâu dài.",
        "properNouns": ["Hello", "Hola", "Bonjour", "你好"],
        "keywords": ["linguistic leap", "exercise", "go a long way"],
        "explanationAi": "'a little exercise can go a long way' là thông điệp kết bài truyền cảm hứng sâu sắc: rèn luyện trí não đều đặn mỗi ngày sẽ mang lại lợi ích nhận thức trọn đời."
    }
]

assert len(meta) == len(grouping)

master_segments = []
for idx, g in enumerate(grouping):
    c_start = en_cues[g[0]]['start']
    c_end = en_cues[g[-1]]['end']
    txt = ' '.join([en_cues[i]['text'] for i in g]).replace('  ', ' ')
    ipa = sentence_to_ipa(txt)
    m_info = meta[idx]
    
    # Calculate tokenCount matching regex \b[A-Za-z0-9_]+\b
    m_tokens = re.findall(r'\b[A-Za-z0-9_]+\b', txt)
    tok_count = len(m_tokens)
    
    seg = {
        "orderIndex": idx,
        "startTime": c_start,
        "endTime": c_end,
        "text": txt,
        "translationVi": m_info["translationVi"],
        "ipaUs": ipa,
        "properNouns": m_info["properNouns"],
        "keywords": m_info["keywords"],
        "explanationAi": m_info["explanationAi"],
        "tokenCount": tok_count
    }
    master_segments.append(seg)

# Write calibrated json
with open('scripts/ted_bilingual_39_calibrated.json', 'w', encoding='utf-8') as f:
    json.dump(master_segments, f, ensure_ascii=False, indent=2)

print(f"Calibrated json saved with {len(master_segments)} segments.")
for s in master_segments:
    print(f"Seg {s['orderIndex']:02d}: {s['startTime']:6.2f} - {s['endTime']:6.2f} | tok={s['tokenCount']:2d} | {s['text'][:55]}...")
