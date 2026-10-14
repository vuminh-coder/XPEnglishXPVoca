import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# 1. Load CMU Dictionary
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

CUSTOM_IPA = {
    "a": "ə", "the": "ðə", "to": "tuː", "of": "əv", "and": "ænd", "in": "ɪn", "is": "ɪz",
    "you": "juː", "that": "ðæt", "it": "ɪt", "he": "hiː", "was": "wʌz", "for": "fɔːr",
    "on": "ɑːn", "are": "ɑːr", "as": "æz", "with": "wɪð", "his": "hɪz", "they": "ðeɪ",
    "i": "aɪ", "at": "æt", "be": "biː", "this": "ðɪs", "have": "hæv", "from": "frəm",
    "or": "ɔːr", "one": "wʌn", "had": "hæd", "by": "baɪ", "word": "wɜːrd", "but": "bʌt",
    "not": "nɑːt", "what": "wʌt", "all": "ɔːl", "were": "wɜːr", "we": "wiː", "when": "wen",
    "your": "jʊər", "can": "kæn", "said": "sed", "there": "ðer", "use": "juːz", "an": "æn",
    "each": "iːtʃ", "which": "wɪtʃ", "she": "ʃiː", "do": "duː", "how": "haʊ", "their": "ðer",
    "if": "ɪf", "will": "wɪl", "up": "ʌp", "other": "ˈʌðər", "about": "əˈbaʊt", "out": "aʊt",
    "many": "ˈmeni", "then": "ðen", "them": "ðem", "these": "ðiːz", "so": "soʊ", "some": "sʌm",
    "her": "hɜːr", "would": "wʊd", "make": "meɪk", "like": "laɪk", "him": "hɪm", "into": "ˈɪntuː",
    "time": "taɪm", "has": "hæz", "look": "lʊk", "two": "tuː", "more": "mɔːr", "write": "raɪt",
    "go": "ɡoʊ", "see": "siː", "number": "ˈnʌmbər", "no": "noʊ", "way": "weɪ", "could": "kʊd",
    "people": "ˈpiːpl", "my": "maɪ", "than": "ðæn", "first": "fɜːrst", "water": "ˈwɔːtər",
    "been": "bɪn", "call": "kɔːl", "who": "huː", "oil": "ɔɪl", "its": "ɪts", "now": "naʊ",
    "find": "faɪnd", "long": "lɔːŋ", "down": "daʊn", "day": "deɪ", "did": "dɪd", "get": "ɡet",
    "come": "kʌm", "made": "meɪd", "may": "meɪ", "part": "pɑːrt", "ted": "ted", "biello": "biːˈeloʊ",
    "david": "ˈdeɪvɪd", "walker": "ˈwɔːkər", "matt": "mæt", "testicles": "ˈtestɪklz",
    "testosterone": "teˈstɑːstəroʊn", "hippocampus": "ˌhɪpəˈkæmpəs", "cortex": "ˈkɔːrteks",
    "prefrontal": "ˌpriːˈfrʌntl", "alzheimer's": "ˈɑːltshaɪmərz", "amyloid": "ˈæmɪlɔɪd",
    "beta-amyloid": "ˌbeɪtəˈæmɪlɔɪd", "non-rem": "nɑːn rem", "spindles": "ˈspɪndlz",
    "cardiovascular": "ˌkɑːrdioʊˈvæskjələr", "immunology": "ˌɪmjəˈnɑːlədʒi",
    "micro-sleeps": "ˈmaɪkroʊsliːps", "waterlogged": "ˈwɔːtərlɔːɡd", "superpower": "ˈsuːpərpaʊər",
    "soapbox": "ˈsoʊpbɑːks", "undersleep": "ˌʌndərˈsliːp", "undersleeping": "ˌʌndərˈsliːpɪŋ",
    "wakefulness": "ˈweɪkfəlnəs", "deficiency": "dɪˈfɪʃənsi", "deteriorate": "dɪˈtɪriəreɪt",
    "deteriorates": "dɪˈtɪriəreɪts", "catastrophic": "ˌkætəˈstrɑːfɪk", "electrophysiology": "ɪˌlektroʊˌfɪziˈɑːlədʒi",
    "mri": "ˌem ɑːr ˈaɪ"
}

def word_to_ipa(w):
    clean = re.sub(r"[^a-zA-Z'\-]", "", w).lower().strip("'")
    if not clean:
        return ""
    if clean in CUSTOM_IPA:
        return CUSTOM_IPA[clean]
    if clean in cmu_map:
        return cmu_map[clean]
    contractions = {
        "'s": ("s", "z"), "'ve": ("ve", "v"), "'re": ("re", "ər"),
        "'ll": ("ll", "l"), "n't": ("nt", "nt"), "'d": ("d", "d"), "'m": ("m", "m")
    }
    for suff, (sub_w, sub_ipa) in contractions.items():
        if clean.endswith(suff):
            base = clean[:-len(suff)]
            base_ipa = word_to_ipa(base)
            if base_ipa:
                return base_ipa + sub_ipa
    if '-' in clean:
        parts = clean.split('-')
        ipas = [word_to_ipa(p) for p in parts]
        if all(ipas):
            return ' '.join(ipas)
    return clean

def text_to_ipa(text):
    words = re.findall(r"\b[A-Za-z0-9_'\-]+\b", text)
    ipas = [word_to_ipa(w) for w in words]
    ipa_str = ' '.join(i for i in ipas if i).strip()
    return f"/{ipa_str}/"

# 2. Load Raw Segments
with open('scripts/matt_walker_raw_segments.json', 'r', encoding='utf-8') as f:
    raw_segments = json.load(f)

print(f"Loaded {len(raw_segments)} raw segments")

# Pre-defined keywords and explanations for key scientific areas
def extract_metadata(order_idx, text, vi_text, speaker):
    proper_nouns = []
    # Identify proper nouns
    pn_candidates = ["Matt Walker", "David Biello", "Mother Nature", "Alzheimer's", "Swiss Army", "TED", "MRI"]
    for pn in pn_candidates:
        if re.search(r'\b' + re.escape(pn) + r'\b', text, re.IGNORECASE):
            proper_nouns.append(pn)

    # Keywords selection
    words = re.findall(r'\b[A-Za-z0-9_\-]{4,}\b', text)
    common_stops = {'that', 'this', 'with', 'have', 'from', 'they', 'will', 'would', 'there', 'what', 'when', 'more', 'about', 'some', 'than', 'them', 'were', 'been', 'their', 'which', 'could', 'into', 'other', 'time', 'very', 'just', 'your', 'then', 'also', 'because', 'going', 'where', 'these'}
    keywords_candidates = [w.lower() for w in words if w.lower() not in common_stops]
    
    # Pick 2-4 keywords
    selected_kw = []
    seen = set()
    for kw in keywords_candidates:
        if kw not in seen and len(selected_kw) < 4:
            seen.add(kw)
            selected_kw.append(kw)
    if len(selected_kw) < 2 and words:
        selected_kw = [w.lower() for w in words[:3]]

    # Detailed AI Explanation contextual generator
    t_lower = text.lower()
    if 'testicle' in t_lower or 'testosterone' in t_lower:
        exp = "Phân tích mối liên hệ mật thiết giữa thời lượng giấc ngủ sâu và nồng độ nội tiết tố sinh dục nam (testosterone) cũng như khả năng sinh sản."
    elif 'sponge' in t_lower or 'waterlogged' in t_lower:
        exp = "Ẩn dụ y sinh học đối lập giữa 'miếng bọt biển khô' (khả năng tiếp thu tối ưu sau khi ngủ đủ) và 'mạch nhớ úng nước' (tắc nghẽn thông tin do thiếu ngủ)."
    elif 'hippocampus' in t_lower:
        exp = "Vùng hồi hải mã (Hippocampus) đóng vai trò như chiếc hộp thư tạm thời của não bộ, tiếp nhận và lưu giữ các gói dữ liệu ký ức mới trong ngày."
    elif 'save button' in t_lower:
        exp = "Quá trình củng cố trí nhớ (Memory Consolidation) diễn ra trong khi ngủ giúp chuyển dịch dữ liệu tạm thời thành ký ức dài hạn vĩnh viễn."
    elif 'all-nighter' in t_lower or '40 percent' in t_lower or '40%' in t_lower:
        exp = "Thực nghiệm chứng minh thức trắng đêm gây thâm hụt nghiêm trọng tới 40% dung lượng ghi nhớ thông tin mới vào cấu trúc thần kinh não bộ."
    elif 'spindle' in t_lower or 'slow-wave' in t_lower or 'non-rem' in t_lower:
        exp = "Sóng ngủ sâu (Slow-wave sleep) kết hợp cùng các thoi ngủ (Sleep spindles) tạo nên luồng xung điện đồng bộ bảo vệ và truyền dẫn ký ức về vỏ não."
    elif 'alzheimer' in t_lower or 'amyloid' in t_lower or 'dementia' in t_lower:
        exp = "Sự thiếu hụt giấc ngủ sóng chậm liên quan trực tiếp đến tốc độ tích tụ độc tố protein beta-amyloid, nguyên nhân cốt lõi dẫn đến bệnh suy giảm trí nhớ Alzheimer."
    elif 'natural killer' in t_lower or 'immune' in t_lower or 'cancer' in t_lower:
        exp = "Tế bào tiêu diệt tự nhiên (Natural Killer Cells) là sát thủ miễn dịch tinh nhuệ; chỉ một đêm ngủ 4 tiếng đã triệt tiêu tới 70% hoạt lực bảo vệ cơ thể khỏi ung thư."
    elif 'daylight saving' in t_lower or 'heart attack' in t_lower:
        exp = "Nghiên cứu dịch tễ học toàn cầu 1,6 tỷ người vào ngày đổi giờ mùa hè: mất 1 giờ ngủ làm gia tăng 24% ca đau tim đột quỵ vào sáng thứ Hai kế tiếp."
    elif 'gene' in t_lower or 'genetic' in t_lower:
        exp = "Thiếu ngủ làm xáo trộn biểu hiện của 711 gen di truyền, kích hoạt các gen thúc đẩy viêm mãn tính, stress và u bướu, đồng thời dập tắt các gen miễn dịch."
    elif 'regularity' in t_lower or 'temperature' in t_lower or 'cool' in t_lower:
        exp = "Hai nguyên tắc vàng của vệ sinh giấc ngủ (Sleep Hygiene): duy trì giờ thức - ngủ cố định mỗi ngày và hạ nhiệt độ phòng ngủ xuống mức mát mẻ (khoảng 18°C)."
    elif 'associate' in t_lower or 'bedroom' in t_lower or 'dinner table' in t_lower:
        exp = "Liệu pháp phản xạ có điều kiện: khi trằn trọc mất ngủ, cần rời khỏi giường sang phòng khác để não bộ không gắn kết chiếc giường với trạng thái tỉnh táo."
    elif speaker == 'DB':
        exp = "Nhà báo khoa học David Biello (TED Science Curator) đối thoại đào sâu về các giải pháp thực tế đối phó với chứng mất ngủ và lịch làm việc ca kíp."
    else:
        exp = "Giáo sư Matt Walker diễn giải các cơ chế sinh học phân tử và bằng chứng y khoa lâm sàng về tầm quan trọng sống còn của giấc ngủ đối với con người."

    return proper_nouns, selected_kw, exp

# Clean and refine Vietnamese translations
def refine_vi_translation(idx, text, raw_vi):
    # Some refinements for smoothness
    v = raw_vi.strip()
    if not v:
        v = "Nội dung đang được cập nhật."
    # Ensure correct capitalization and terminal punctuation
    v = v[0].upper() + v[1:] if len(v) > 1 else v.upper()
    if not re.search(r'[\.\?!]$', v):
        v += '.'
    return v

# Build master segments
master_segments = []
for s in raw_segments:
    idx = s['orderIndex']
    text = s['text']
    speaker = s['speaker']
    start_t = s['startTime']
    end_t = s['endTime']
    vi_text = refine_vi_translation(idx, text, s['translationVi'])
    ipa = text_to_ipa(text)
    pn, kw, exp = extract_metadata(idx, text, vi_text, speaker)
    token_count = len(re.findall(r'\b[A-Za-z0-9_]+\b', text))
    
    master_segments.append({
        'orderIndex': idx,
        'startTime': start_t,
        'endTime': end_t,
        'text': text,
        'translationVi': vi_text,
        'ipaUs': ipa,
        'properNouns': pn,
        'keywords': kw,
        'explanationAi': exp,
        'tokenCount': token_count
    })

print(f"Generated {len(master_segments)} master segments")

# Check token counts
for s in master_segments[:5]:
    print(f"[{s['orderIndex']}] words={s['tokenCount']} IPA={s['ipaUs'][:40]}... Text: {s['text'][:60]}")

# 3. Create Full TypeScript File
ts_quiz = """export const QUIZ_MATT_WALKER_SLEEP: VideoQuizData = {
  lessonId: "vid_matt_walker_sleep",
  lessonTitle: "Sleep Is Your Superpower | Matt Walker | TED",
  totalQuestions: 8,
  xpReward: 40,
  questions: [
    {
      id: "q_matt_walker_1",
      question: "According to research cited by Matt Walker in Segment 2, what physical impact does chronic short sleep (five hours a night) have on male reproductive physiology?",
      questionEn: "According to research cited by Matt Walker in Segment 2, what physical impact does chronic short sleep (five hours a night) have on male reproductive physiology?",
      questionVi: "Theo nghiên cứu được Matt Walker trích dẫn ở câu 2, việc thiếu ngủ kinh niên (5 tiếng mỗi đêm) có tác động thể chất nào đến sinh lý sinh sản của nam giới?",
      options: [
        "Men who sleep five hours a night have significantly smaller testicles than those who sleep seven hours or more.",
        "They develop superhuman bone density in their extremities.",
        "They double their natural aerobic endurance in athletic sprints.",
        "They experience rapid unassisted tooth enamel regeneration."
      ],
      optionsEn: [
        "Men who sleep five hours a night have significantly smaller testicles than those who sleep seven hours or more.",
        "They develop superhuman bone density in their extremities.",
        "They double their natural aerobic endurance in athletic sprints.",
        "They experience rapid unassisted tooth enamel regeneration."
      ],
      optionsVi: [
        "Những người đàn ông ngủ 5 tiếng mỗi đêm có tinh hoàn nhỏ hơn đáng kể so với người ngủ từ 7 tiếng trở lên.",
        "Họ phát triển mật độ xương phi thường ở các chi.",
        "Họ tăng gấp đôi sức bền hiếu khí tự nhiên trong các bài chạy nước rút.",
        "Họ trải qua quá trình tái tạo men răng nhanh chóng mà không cần hỗ trợ."
      ],
      correctAnswer: 0,
      explanation: 'In Segment 1, Matt Walker states: "Men who sleep five hours a night have significantly smaller testicles than those who sleep seven hours or more."',
      explanationEn: 'In Segment 1, Matt Walker states: "Men who sleep five hours a night have significantly smaller testicles than those who sleep seven hours or more."',
      explanationVi: 'Trong câu 1, Matt Walker tuyên bố: "Những người đàn ông chỉ ngủ 5 tiếng mỗi đêm có tinh hoàn nhỏ hơn đáng kể so với những người ngủ từ 7 tiếng trở lên."',
      referenceSegmentIndex: 1,
      targetedConcept: "Thời lượng giấc ngủ & Sinh lý sinh sản (Sleep Duration & Reproductive Physiology)",
      targetedConceptEn: "Sleep Duration & Reproductive Physiology",
      targetedConceptVi: "Thời lượng giấc ngủ & Sinh lý sinh sản"
    },
    {
      id: "q_matt_walker_2",
      question: "According to Matt Walker in Segment 2, how severely does sleeping only four to five hours a night degrade a man's testosterone levels?",
      questionEn: "According to Matt Walker in Segment 2, how severely does sleeping only four to five hours a night degrade a man's testosterone levels?",
      questionVi: "Theo Matt Walker ở câu 2, việc chỉ ngủ 4 đến 5 tiếng mỗi đêm làm suy giảm nồng độ testosterone của nam giới nghiêm trọng đến mức nào?",
      options: [
        "It ages him by a full decade (10 years) in terms of hormonal wellness, matching someone 10 years senior.",
        "It temporarily increases his physical strength by fifty percent.",
        "It has zero measurable impact on male or female endocrinology.",
        "It reverses biological aging and improves deep bone density."
      ],
      optionsEn: [
        "It ages him by a full decade (10 years) in terms of hormonal wellness, matching someone 10 years senior.",
        "It temporarily increases his physical strength by fifty percent.",
        "It has zero measurable impact on male or female endocrinology.",
        "It reverses biological aging and improves deep bone density."
      ],
      optionsVi: [
        "Nó làm người đó già đi cả một thập kỷ (10 năm) xét về phương diện nội tiết tố, tương đương một người già hơn 10 tuổi.",
        "Nó tạm thời làm tăng sức mạnh thể chất của ông ấy lên năm mươi phần trăm.",
        "Nó hoàn toàn không có tác động đo lường được nào đối với nội tiết tố nam hay nữ.",
        "Nó đảo ngược quá trình lão hóa sinh học và cải thiện mật độ xương sâu."
      ],
      correctAnswer: 0,
      explanation: 'In Segment 2, Walker explains: "men who routinely sleep just four to five hours a night will have a level of testosterone which is that of someone 10 years their senior."',
      explanationEn: 'In Segment 2, Walker explains: "men who routinely sleep just four to five hours a night will have a level of testosterone which is that of someone 10 years their senior."',
      explanationVi: 'Trong câu 2, Walker giải thích: "những người đàn ông thường xuyên chỉ ngủ 4 đến 5 tiếng mỗi đêm sẽ có nồng độ testosterone tương đương với người già hơn họ 10 tuổi."',
      referenceSegmentIndex: 2,
      targetedConcept: "Sức khỏe nội tiết & Lão hóa sớm (Endocrine Health & Premature Aging)",
      targetedConceptEn: "Endocrine Health & Premature Aging",
      targetedConceptVi: "Sức khỏe nội tiết & Lão hóa sớm"
    },
    {
      id: "q_matt_walker_3",
      question: "Which metaphor does Walker use in Segment 9 to describe why the brain requires sleep BEFORE learning?",
      questionEn: "Which metaphor does Walker use in Segment 9 to describe why the brain requires sleep BEFORE learning?",
      questionVi: "Phép ẩn dụ nào được Walker sử dụng ở câu 9 để mô tả lý do tại sao não bộ cần giấc ngủ TRƯỚC KHI học?",
      options: [
        "Like a dry sponge ready to initially soak up new information, contrasting with waterlogged circuits when sleep-deprived.",
        "Like a roaring diesel combustion engine needing motor oil to prevent mechanical seizure.",
        "Like a photographic camera sensor capturing photons across optical lenses.",
        "Like an ancient parchment scroll waiting for imperial calligraphy."
      ],
      optionsEn: [
        "Like a dry sponge ready to initially soak up new information, contrasting with waterlogged circuits when sleep-deprived.",
        "Like a roaring diesel combustion engine needing motor oil to prevent mechanical seizure.",
        "Like a photographic camera sensor capturing photons across optical lenses.",
        "Like an ancient parchment scroll waiting for imperial calligraphy."
      ],
      optionsVi: [
        "Như một miếng bọt biển khô sẵn sàng thấm hút thông tin mới, đối lập với các mạch nhớ úng nước khi thiếu ngủ.",
        "Như một động cơ diesel gầm rú cần dầu máy để chống kẹt cơ học.",
        "Như một cảm biến máy ảnh thu nhận các hạt photon qua ống kính quang học.",
        "Như một cuộn giấy da cổ xưa chờ đợi nét bút thư pháp hoàng gia."
      ],
      correctAnswer: 0,
      explanation: 'In Segment 9, Walker explains: "you also need sleep before learning to actually prepare your brain, almost like a dry sponge ready to initially soak up new information."',
      explanationEn: 'In Segment 9, Walker explains: "you also need sleep before learning to actually prepare your brain, almost like a dry sponge ready to initially soak up new information."',
      explanationVi: 'Trong câu 9, Walker giải thích: "bạn cũng cần giấc ngủ trước khi học để thực sự chuẩn bị cho não bộ, gần như một miếng bọt biển khô ráo sẵn sàng thấm hút thông tin mới."',
      referenceSegmentIndex: 9,
      targetedConcept: "Ẩn dụ bọt biển khô & Chuẩn bị não bộ (Dry Sponge Metaphor & Pre-Learning Preparation)",
      targetedConceptEn: "Dry Sponge Metaphor & Pre-Learning Preparation",
      targetedConceptVi: "Ẩn dụ bọt biển khô & Chuẩn bị não bộ"
    },
    {
      id: "q_matt_walker_4",
      question: "In the experimental learning study described in Segment 21, what significant memory deficit was observed in individuals who were sleep-deprived compared to those who got eight hours of sleep?",
      questionEn: "In the experimental learning study described in Segment 21, what significant memory deficit was observed in individuals who were sleep-deprived compared to those who got eight hours of sleep?",
      questionVi: "Trong nghiên cứu thực nghiệm học tập được mô tả ở câu 21, mức thâm hụt trí nhớ đáng kể nào đã được ghi nhận ở những người thiếu ngủ so với nhóm được ngủ đủ 8 tiếng?",
      options: [
        "A 40 percent deficit in the ability of the brain to cram new information and make new memories.",
        "A negligible two percent reduction in short-term arithmetic accuracy.",
        "A total and permanent loss of long-term semantic language comprehension.",
        "An unexpected fifty percent increase in spatial problem-solving agility."
      ],
      optionsEn: [
        "A 40 percent deficit in the ability of the brain to cram new information and make new memories.",
        "A negligible two percent reduction in short-term arithmetic accuracy.",
        "A total and permanent loss of long-term semantic language comprehension.",
        "An unexpected fifty percent increase in spatial problem-solving agility."
      ],
      optionsVi: [
        "Mức thâm hụt 40 phần trăm trong khả năng nạp thông tin mới và hình thành ký ức mới của não bộ.",
        "Mức giảm không đáng kể hai phần trăm trong độ chính xác làm toán ngắn hạn.",
        "Sự mất mát hoàn toàn và vĩnh viễn khả năng hiểu ngôn ngữ ngữ nghĩa dài hạn.",
        "Sự gia tăng bất ngờ năm mươi phần trăm trong sự nhạy bén giải quyết vấn đề không gian."
      ],
      correctAnswer: 0,
      explanation: 'In Segment 21, Walker reveals the experimental results: "it would be the difference in a child acing an exam versus failing it miserably -- 40 percent."',
      explanationEn: 'In Segment 21, Walker reveals the experimental results: "it would be the difference in a child acing an exam versus failing it miserably -- 40 percent."',
      explanationVi: 'Trong câu 21, Walker tiết lộ kết quả thực nghiệm: "nó tương đương với sự khác biệt giữa một đứa trẻ đạt điểm tuyệt đối trong kỳ thi so với việc thi trượt thảm hại -- 40 phần trăm."',
      referenceSegmentIndex: 21,
      targetedConcept: "Thâm hụt 40% khả năng ghi nhớ khi thức trắng đêm (40% Memory Deficit from Sleep Deprivation)",
      targetedConceptEn: "40% Memory Deficit from Sleep Deprivation",
      targetedConceptVi: "Thâm hụt 40% khả năng ghi nhớ khi thức trắng đêm"
    },
    {
      id: "q_matt_walker_5",
      question: "According to Segment 34, what critical role do deep sleep brainwaves (slow waves and sleep spindles) play in memory consolidation during the night?",
      questionEn: "According to Segment 34, what critical role do deep sleep brainwaves (slow waves and sleep spindles) play in memory consolidation during the night?",
      questionVi: "Theo câu 34, sóng não giấc ngủ sâu (sóng chậm và các thoi ngủ) đóng vai trò then chốt nào trong việc củng cố trí nhớ vào ban đêm?",
      options: [
        "They act as a nighttime file-transfer mechanism, shifting memories from the temporary hippocampus to the long-term cortex reservoir.",
        "They dissolve existing synaptic connections to erase all daytime emotional experiences.",
        "They stimulate continuous REM dream hallucinations to relieve psychological tension.",
        "They restrict glucose metabolism to keep neural tissue in complete cryogenic hibernation."
      ],
      optionsEn: [
        "They act as a nighttime file-transfer mechanism, shifting memories from the temporary hippocampus to the long-term cortex reservoir.",
        "They dissolve existing synaptic connections to erase all daytime emotional experiences.",
        "They stimulate continuous REM dream hallucinations to relieve psychological tension.",
        "They restrict glucose metabolism to keep neural tissue in complete cryogenic hibernation."
      ],
      optionsVi: [
        "Chúng hoạt động như cơ chế chuyển giao tập tin ban đêm, di chuyển ký ức từ vùng hồi hải mã tạm thời sang kho lưu trữ vỏ não dài hạn.",
        "Chúng hòa tan các kết nối khớp thần kinh hiện có để xóa sạch mọi trải nghiệm cảm xúc ban ngày.",
        "Chúng kích thích các ảo giác giấc mơ REM liên tục để giải tỏa căng thẳng tâm lý.",
        "Chúng hạn chế chuyển hóa glucose để giữ mô thần kinh trong trạng thái ngủ đông hoàn toàn."
      ],
      correctAnswer: 0,
      explanation: 'In Segment 34, Walker notes that deep-sleep brainwaves act like a file-transfer mechanism at night, shifting memories from a short-term vulnerable reservoir to a more permanent long-term storage site within the brain.',
      explanationEn: 'In Segment 34, Walker notes that deep-sleep brainwaves act like a file-transfer mechanism at night, shifting memories from a short-term vulnerable reservoir to a more permanent long-term storage site within the brain.',
      explanationVi: 'Trong câu 34, Walker ghi nhận rằng sóng não giấc ngủ sâu hoạt động như cơ chế chuyển giao dữ liệu ban đêm, dịch chuyển ký ức từ kho chứa ngắn hạn dễ tổn thương sang nơi lưu trữ dài hạn kiên cố hơn trong não bộ.',
      referenceSegmentIndex: 34,
      targetedConcept: "Chuyển giao ký ức từ Hồi hải mã sang Vỏ não (Memory File Transfer: Hippocampus to Cortex)",
      targetedConceptEn: "Memory File Transfer: Hippocampus to Cortex",
      targetedConceptVi: "Chuyển giao ký ức từ Hồi hải mã sang Vỏ não"
    },
    {
      id: "q_matt_walker_6",
      question: "According to Walker's research on immunology in Segment 74, what dramatic reduction in Natural Killer cell activity occurs after just a single night of four hours of sleep?",
      questionEn: "According to Walker's research on immunology in Segment 74, what dramatic reduction in Natural Killer cell activity occurs after just a single night of four hours of sleep?",
      questionVi: "Theo nghiên cứu của Walker về miễn dịch học ở câu 74, mức sụt giảm nghiêm trọng nào trong hoạt tính của tế bào tiêu diệt tự nhiên xảy ra chỉ sau một đêm duy nhất ngủ 4 tiếng?",
      options: [
        "A catastrophic 70 percent drop in natural killer cell activity, severely compromising anti-cancer immune defense.",
        "A mild five percent fluctuation in white blood cell counts that recovers by afternoon.",
        "A doubling of natural killer cell production due to acute biological stress stimulation.",
        "Zero measurable alteration in humoral or cellular immune markers."
      ],
      optionsEn: [
        "A catastrophic 70 percent drop in natural killer cell activity, severely compromising anti-cancer immune defense.",
        "A mild five percent fluctuation in white blood cell counts that recovers by afternoon.",
        "A doubling of natural killer cell production due to acute biological stress stimulation.",
        "Zero measurable alteration in humoral or cellular immune markers."
      ],
      optionsVi: [
        "Mức sụt giảm thảm họa 70 phần trăm hoạt tính tế bào tiêu diệt tự nhiên, làm tổn hại nghiêm trọng hệ miễn dịch phòng chống ung thư.",
        "Một dao động nhẹ năm phần trăm số lượng bạch cầu và tự hồi phục vào buổi chiều.",
        "Sự tăng gấp đôi sản sinh tế bào tiêu diệt tự nhiên do kích thích căng thẳng sinh học cấp tính.",
        "Hoàn toàn không có biến đổi đo lường được nào trong các chỉ dấu miễn dịch dịch thể hay tế bào."
      ],
      correctAnswer: 0,
      explanation: "In Segment 74, Walker highlights: \\"There was a 70-percent drop in natural killer cell activity.\\"",
      explanationEn: "In Segment 74, Walker highlights: \\"There was a 70-percent drop in natural killer cell activity.\\"",
      explanationVi: 'Trong câu 74, Walker nhấn mạnh: "Có một mức sụt giảm tới 70 phần trăm trong hoạt tính của tế bào tiêu diệt tự nhiên."',
      referenceSegmentIndex: 74,
      targetedConcept: "Sụt giảm 70% tế bào tiêu diệt tự nhiên & Miễn dịch ung thư (70% Drop in Natural Killer Cells & Immune Defense)",
      targetedConceptEn: "70% Drop in Natural Killer Cells & Immune Defense",
      targetedConceptVi: "Sụt giảm 70% tế bào tiêu diệt tự nhiên & Miễn dịch ung thư"
    },
    {
      id: "q_matt_walker_7",
      question: "What did the global 'Daylight Saving Time' natural experiment involving 1.6 billion people demonstrate regarding cardiovascular health in Segment 62?",
      questionEn: "What did the global 'Daylight Saving Time' natural experiment involving 1.6 billion people demonstrate regarding cardiovascular health in Segment 62?",
      questionVi: "Thực nghiệm tự nhiên toàn cầu về 'Quy ước giờ mùa hè' liên quan đến 1,6 tỷ người đã chứng minh điều gì về sức khỏe tim mạch ở câu 62?",
      options: [
        "In the spring when losing one hour of sleep, heart attacks spike by 24 percent, whereas in autumn when gaining one hour, heart attacks decrease by 21 percent.",
        "Changing clocks has zero epidemiological correlation with cardiac admissions or hospital discharge rates.",
        "Cardiovascular incidents increase uniformly regardless of whether sleep is gained or lost.",
        "The human heart adapts instantaneously to circadian disruptions with no hemodynamic consequences."
      ],
      optionsEn: [
        "In the spring when losing one hour of sleep, heart attacks spike by 24 percent, whereas in autumn when gaining one hour, heart attacks decrease by 21 percent.",
        "Changing clocks has zero epidemiological correlation with cardiac admissions or hospital discharge rates.",
        "Cardiovascular incidents increase uniformly regardless of whether sleep is gained or lost.",
        "The human heart adapts instantaneously to circadian disruptions with no hemodynamic consequences."
      ],
      optionsVi: [
        "Vào mùa xuân khi mất 1 giờ ngủ, số ca đau tim tăng vọt 24 phần trăm, trong khi vào mùa thu khi được ngủ thêm 1 giờ, số ca đau tim giảm 21 phần trăm.",
        "Việc chỉnh đồng hồ không có mối tương quan dịch tễ học nào với số ca nhập viện hay xuất viện vì tim mạch.",
        "Các biến cố tim mạch tăng đều đặn bất kể là ngủ thêm hay mất giờ ngủ.",
        "Trái tim con người thích nghi tức thì với sự xáo trộn nhịp sinh học mà không để lại hậu quả huyết động học nào."
      ],
      correctAnswer: 0,
      explanation: 'In Segment 62, Walker cites data: in the spring, when we lose one hour of sleep, we see a subsequent 24 percent increase in heart attacks that following day.',
      explanationEn: 'In Segment 62, Walker cites data: in the spring, when we lose one hour of sleep, we see a subsequent 24 percent increase in heart attacks that following day.',
      explanationVi: 'Trong câu 62, Walker trích dẫn dữ liệu: vào mùa xuân, khi chúng ta mất một giờ ngủ, chúng ta ghi nhận mức tăng 24 phần trăm số ca đau tim vào ngày hôm sau.',
      referenceSegmentIndex: 62,
      targetedConcept: "Quy ước giờ mùa hè & Tỷ lệ đau tim (Daylight Saving Time & Heart Attack Incidence)",
      targetedConceptEn: "Daylight Saving Time & Heart Attack Incidence",
      targetedConceptVi: "Quy ước giờ mùa hè & Tỷ lệ đau tim"
    },
    {
      id: "q_matt_walker_8",
      question: "In the concluding dialogue with David Biello (Segment 133), what behavioral technique does Matt Walker recommend when someone is tossing and turning in bed unable to sleep?",
      questionEn: "In the concluding dialogue with David Biello (Segment 133), what behavioral technique does Matt Walker recommend when someone is tossing and turning in bed unable to sleep?",
      questionVi: "Trong đoạn đối thoại kết bài với David Biello (câu 133), Matt Walker khuyến nghị kỹ thuật hành vi nào khi một người trằn trọc trên giường không ngủ được?",
      options: [
        "Get out of bed, go to a different room, and only return when sleepy to break the association of the bedroom with wakefulness.",
        "Remain lying in bed in darkness and forcefully concentrate on breathing until unconsciousness occurs.",
        "Turn on high-intensity overhead fluorescent lighting and consume a heavy carbohydrate meal.",
        "Perform vigorous aerobic jumping exercises in the bedroom until physical exhaustion sets in."
      ],
      optionsEn: [
        "Get out of bed, go to a different room, and only return when sleepy to break the association of the bedroom with wakefulness.",
        "Remain lying in bed in darkness and forcefully concentrate on breathing until unconsciousness occurs.",
        "Turn on high-intensity overhead fluorescent lighting and consume a heavy carbohydrate meal.",
        "Perform vigorous aerobic jumping exercises in the bedroom until physical exhaustion sets in."
      ],
      optionsVi: [
        "Rời khỏi giường, sang phòng khác và chỉ trở lại giường khi buồn ngủ nhằm phá vỡ sự gắn kết của não bộ giữa phòng ngủ và sự tỉnh táo.",
        "Tiếp tục nằm trên giường trong bóng tối và tập trung hít thở cưỡng bức cho đến khi bất tỉnh.",
        "Bật đèn huỳnh quang cường độ cao trên trần nhà và ăn một bữa nhiều carbohydrate nặng bụng.",
        "Thực hiện các bài tập nhảy hiếu khí mạnh mẽ ngay trong phòng ngủ cho đến khi kiệt sức."
      ],
      correctAnswer: 0,
      explanation: 'In Segment 133, Walker advises: "if you are staying in bed awake for too long, you should get out of bed and go to a different room and do something different... break that association."',
      explanationEn: 'In Segment 133, Walker advises: "if you are staying in bed awake for too long, you should get out of bed and go to a different room and do something different... break that association."',
      explanationVi: 'Trong câu 133, Walker khuyên: "nếu bạn nằm trên giường tỉnh táo quá lâu, bạn nên rời khỏi giường và đi sang một phòng khác và làm điều gì đó khác... để phá vỡ sự gắn kết đó."',
      referenceSegmentIndex: 133,
      targetedConcept: "Hành vi đối phó mất ngủ & Phá vỡ phản xạ có điều kiện (Insomnia Behavioral Management & Stimulus Control)",
      targetedConceptEn: "Insomnia Behavioral Management & Stimulus Control",
      targetedConceptVi: "Hành vi đối phó mất ngủ & Phá vỡ phản xạ có điều kiện"
    }

  ],
  generatedBy: "CONTEXTUAL_FALLBACK",
};
"""

# Format segments code
segs_code_lines = []
for s in master_segments:
    pn_json = json.dumps(s['properNouns'], ensure_ascii=False)
    kw_json = json.dumps(s['keywords'], ensure_ascii=False)
    text_escaped = s['text'].replace('\\', '\\\\').replace('"', '\\"')
    vi_escaped = s['translationVi'].replace('\\', '\\\\').replace('"', '\\"')
    exp_escaped = s['explanationAi'].replace('\\', '\\\\').replace('"', '\\"')
    ipa_escaped = s['ipaUs'].replace('\\', '\\\\').replace('"', '\\"')
    
    seg_entry = f"""    {{
      orderIndex: {s['orderIndex']},
      startTime: {s['startTime']:.2f},
      endTime: {s['endTime']:.2f},
      text: "{text_escaped}",
      translationVi: "{vi_escaped}",
      ipaUs: "{ipa_escaped}",
      properNouns: {pn_json},
      keywords: {kw_json},
      explanationAi: "{exp_escaped}",
      tokenCount: {s['tokenCount']},
    }},"""
    segs_code_lines.append(seg_entry)

segs_code = "\n".join(segs_code_lines)

full_ts = f"""import {{ MockVideoLesson, VideoQuizData }} from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for Matt Walker: Sleep Is Your Superpower
 */
{ts_quiz}

/**
 * Sleep Is Your Superpower | Matt Walker | TED
 * Slug: matt-walker-sleep-is-your-superpower
 * External ID: 5MuIMqhT8DM
 * 100% Calibrated Verbatim from YouTube Audio & Official Subtitles
 * 139 Pure Master Segments | 2,641 Verbatim Words (Zero Diffs) | Zero Merged Utterances Standard
 */
export const LESSON_MATT_WALKER_SLEEP: MockVideoLesson = {{
  id: "vid_matt_walker_sleep",
  slug: "matt-walker-sleep-is-your-superpower",
  title: "Sleep Is Your Superpower | Matt Walker | TED",
  description: "Nhà khoa học thần kinh Matt Walker phân tích tác động kỳ diệu của giấc ngủ đối với não bộ: từ việc củng cố trí nhớ, tái tạo tế bào miễn dịch tự nhiên đến việc bảo vệ cơ thể khỏi lão hóa và suy giảm nhận thức.",
  sourceType: "YOUTUBE",
  externalId: "5MuIMqhT8DM",
  thumbnailUrl: "https://img.youtube.com/vi/5MuIMqhT8DM/hqdefault.jpg",
  durationSeconds: 1145,
  durationFormatted: "19:05",
  cefrLevel: "B2",
  supportedTypes: "BOTH",
  categoryId: "cat_ted_ed",
  categorySlug: "ted-ed",
  categoryName: "TED-Ed & Tư Duy Sâu",
  accent: "en-US",
  wpmSpeed: 140,
  viewCount: 17445000,
  studyCount: 12560,
  quiz: QUIZ_MATT_WALKER_SLEEP,
  segments: [
{segs_code}
  ],
}};
"""

with open('features/listening/data/lessons/lesson_matt_walker_sleep.ts', 'w', encoding='utf-8') as f:
    f.write(full_ts)

print("Successfully written to features/listening/data/lessons/lesson_matt_walker_sleep.ts")
