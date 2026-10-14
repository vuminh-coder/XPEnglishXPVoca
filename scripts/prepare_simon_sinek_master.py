import json
import re

# Load CMUDict
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
        if not line or line.startswith('#'): continue
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
                if not stress: stress = 'ˌ'
                ipa_char = ipa_char[1:]
            ipa_parts.append(ipa_char)
        full_ipa = stress + ''.join(ipa_parts)
        if word not in cmu_map:
            cmu_map[word] = full_ipa

manual_ipa = {
    'sinek': 'ˈsaɪnək',
    'orator': 'ˈɔːrətər',
    'codify': 'ˈkɑːdɪfaɪ',
    'status': 'ˈsteɪtəs',
    'quo': 'kwoʊ',
    'usp': 'ˌjuː es ˈpiː',
    'pda': 'ˌpiː diː ˈeɪ',
    'pdas': 'ˌpiː diː ˈeɪz',
    'dvr': 'ˌdiː viː ˈɑːr',
    'meh': 'me',
    'interpersonally': 'ˌɪntərˈpɜːrsənəli',
    'uninspiring': 'ˌʌnɪnˈspaɪərɪŋ',
    'differentiated': 'ˌdɪfəˈrenʃieɪtɪd',
    'fuzziest': 'ˈfʌziɪst',
    'eminently': 'ˈemɪnəntli',
    'structurally': 'ˈstrʌktʃərəli'
}
cmu_map.update(manual_ipa)

def text_to_ipa(sentence):
    raw_words = re.findall(r"\b[A-Za-z0-9_'–-]+\b", sentence)
    ipa_tokens = []
    for w in raw_words:
        w_clean = w.lower().replace("'", "").replace('-', '')
        w_orig = w.lower()
        if w_orig in cmu_map:
            ipa_tokens.append(cmu_map[w_orig])
        elif w_clean in cmu_map:
            ipa_tokens.append(cmu_map[w_clean])
        else:
            parts = w.lower().split('-')
            part_ipas = [cmu_map.get(p, p) for p in parts if p]
            if part_ipas:
                ipa_tokens.append(' '.join(part_ipas))
            else:
                ipa_tokens.append(w.lower())
    full = ' '.join(ipa_tokens)
    cleaned = re.sub(r'[,.;:!?]', '', full).strip()
    return f"/{cleaned}/"

# Master Segments Specification: 00:16.26 -> 05:50.09 (Total: 334s speech coverage)
segments_spec = [
    # 00:16 - 00:27 [Part 1: The Core Inquiries]
    {
        "start": 16.26, "end": 20.22,
        "text": "How do you explain when things don't go as we assume?",
        "vi": "Làm thế nào bạn giải thích được khi mọi việc không diễn ra như chúng ta vẫn nghĩ?",
        "properNouns": [],
        "keywords": ["explain", "assume"],
        "explanationAi": "Câu hỏi tu từ gợi mở: 'assume' nghĩa là giả định, mặc định điều gì đó là đúng mà chưa kiểm chứng."
    },
    {
        "start": 20.26, "end": 27.22,
        "text": "Or better, how do you explain when others are able to achieve things that seem to defy all of the assumptions?",
        "vi": "Hay đúng hơn, làm sao bạn giải thích được khi những người khác có thể đạt được những điều dường như đi ngược lại mọi quy luật thông thường?",
        "properNouns": [],
        "keywords": ["achieve", "defy", "assumptions"],
        "explanationAi": "Cụm 'defy assumptions' là cách diễn đạt đắt giá trong IELTS Speaking/Writing: bất chấp hoặc đi ngược lại các giả định."
    },
    # 00:27 - 00:36 [Apple Paradox]
    {
        "start": 27.26, "end": 31.22,
        "text": "For example: Why is Apple so innovative?",
        "vi": "Ví dụ: Tại sao Apple lại đổi mới sáng tạo đến thế?",
        "properNouns": ["Apple"],
        "keywords": ["innovative"],
        "explanationAi": "Tính từ 'innovative' (đột phá, đổi mới sáng tạo), trọng âm rơi vào âm tiết đầu tiên /ˈɪnəveɪtɪv/."
    },
    {
        "start": 31.26, "end": 36.22,
        "text": "Year after year, after year, they're more innovative than all their competition.",
        "vi": "Hết năm này qua năm khác, họ luôn đổi mới vượt trội hơn mọi đối thủ cạnh tranh.",
        "properNouns": [],
        "keywords": ["year after year", "competition"],
        "explanationAi": "'Year after year' nhấn mạnh tính bền bỉ lặp đi lặp lại qua thời gian; 'competition' dùng như danh từ tập hợp chỉ các đối thủ."
    },
    # 00:36 - 00:48 [Apple Resources Equivalence]
    {
        "start": 36.26, "end": 38.22,
        "text": "And yet, they're just a computer company.",
        "vi": "Thế nhưng, họ cũng chỉ là một công ty máy tính.",
        "properNouns": [],
        "keywords": ["and yet", "computer company"],
        "explanationAi": "'And yet' là liên từ chuyển ý tương phản mạnh mẽ (tuy nhiên, vậy mà)."
    },
    {
        "start": 38.26, "end": 40.22,
        "text": "They're just like everyone else.",
        "vi": "Họ cũng giống hệt như bao người khác.",
        "properNouns": [],
        "keywords": ["just like everyone else"],
        "explanationAi": "Cấu trúc so sánh đồng đẳng nhấn mạnh sự bình thường về mặt quy mô và bản chất ban đầu."
    },
    {
        "start": 40.26, "end": 45.36,
        "text": "They have the same access to the same talent, the same agencies, the same consultants, the same media.",
        "vi": "Họ có cùng khả năng tiếp cận nhân tài, các đại lý, chuyên gia tư vấn và các kênh truyền thông như nhau.",
        "properNouns": [],
        "keywords": ["access", "talent", "agencies", "consultants", "media"],
        "explanationAi": "Điệp từ 'the same' liệt kê 4 nguồn lực cốt lõi chứng minh Apple không có ưu thế độc quyền về tài nguyên."
    },
    {
        "start": 45.39, "end": 48.82,
        "text": "Then why is it that they seem to have something different?",
        "vi": "Vậy tại sao họ dường như lại sở hữu một điều gì đó khác biệt?",
        "properNouns": [],
        "keywords": ["seem to have", "something different"],
        "explanationAi": "Cấu trúc nhấn mạnh 'Why is it that...' dùng để xoáy sâu vào nghịch lý cần giải mã."
    },
    # 00:50 - 01:02 [Martin Luther King]
    {
        "start": 50.26, "end": 54.22,
        "text": "Why is it that Martin Luther King led the Civil Rights Movement?",
        "vi": "Tại sao Martin Luther King lại là người dẫn dắt Phong trào Dân quyền?",
        "properNouns": ["Martin Luther King", "Civil Rights Movement"],
        "keywords": ["civil rights movement", "led"],
        "explanationAi": "Tên riêng 'Martin Luther King' và phong trào đấu tranh nhân quyền lịch sử 'Civil Rights Movement'."
    },
    {
        "start": 54.26, "end": 60.99,
        "text": "He wasn't the only man who suffered in pre-civil rights America, and he certainly wasn't the only great orator of the day.",
        "vi": "Ông không phải người duy nhất chịu áp bức ở nước Mỹ thời kỳ tiền dân quyền, và ông cũng chắc chắn không phải nhà hùng biện xuất sắc duy nhất thời bấy giờ.",
        "properNouns": ["America"],
        "keywords": ["suffered", "pre-civil rights", "orator", "of the day"],
        "explanationAi": "'Orator' là nhà hùng biện xuất chúng; cụm 'of the day' mang nghĩa 'của thời đại đó, đương thời'."
    },
    {
        "start": 61.02, "end": 62.22,
        "text": "Why him?",
        "vi": "Tại sao lại là ông ấy?",
        "properNouns": [],
        "keywords": ["why him"],
        "explanationAi": "Câu hỏi ngắn gọn dứt khoát tạo điểm nhấn kịch tính trong nghệ thuật thuyết trình trước công chúng."
    },
    # 01:02 - 01:18 [The Wright Brothers]
    {
        "start": 62.26, "end": 68.22,
        "text": "And why is it that the Wright brothers were able to figure out controlled, powered man flight",
        "vi": "Và tại sao anh em nhà Wright lại có thể tìm ra chuyến bay có người lái, có động cơ và được kiểm soát,",
        "properNouns": ["Wright"],
        "keywords": ["wright brothers", "figure out", "controlled", "powered man flight"],
        "explanationAi": "Cụm 'powered man flight' chỉ kỳ tích chuyến bay có động cơ đầu tiên của nhân loại năm 1903."
    },
    {
        "start": 68.26, "end": 73.29,
        "text": "when there were certainly other teams who were better qualified, better funded --",
        "vi": "trong khi chắc chắn có những đội ngũ khác có chuyên môn cao hơn, được cấp vốn dồi dào hơn --",
        "properNouns": [],
        "keywords": ["better qualified", "better funded"],
        "explanationAi": "Cặp tính từ ghép so sánh hơn 'better-qualified' (trình độ cao hơn) và 'better-funded' (tiềm lực tài chính dồi dào hơn)."
    },
    {
        "start": 73.32, "end": 78.22,
        "text": "and they didn't achieve powered man flight, and the Wright brothers beat them to it.",
        "vi": "vậy mà họ không làm được, và anh em nhà Wright đã vượt mặt họ.",
        "properNouns": ["Wright"],
        "keywords": ["achieve", "beat them to it"],
        "explanationAi": "Thành ngữ 'beat someone to it' nghĩa là đi trước một bước hoặc hoàn thành mục tiêu trước đối thủ."
    },
    # 01:18 - 01:35 [The Discovery]
    {
        "start": 78.26, "end": 80.16,
        "text": "There's something else at play here.",
        "vi": "Có một yếu tố khác đang âm thầm tác động ở đây.",
        "properNouns": [],
        "keywords": ["at play"],
        "explanationAi": "Thành ngữ 'at play' chỉ các yếu tố ngầm đang phát huy ảnh hưởng hoặc chi phối kết quả."
    },
    {
        "start": 81.39, "end": 85.22,
        "text": "About three and a half years ago, I made a discovery.",
        "vi": "Khoảng ba năm rưỡi trước, tôi đã có một phát hiện.",
        "properNouns": [],
        "keywords": ["discovery"],
        "explanationAi": "Cụm 'made a discovery' (tìm ra phát kiến) mở đầu cho bước ngoặt nhận thức của diễn giả."
    },
    {
        "start": 85.26, "end": 91.22,
        "text": "And this discovery profoundly changed my view on how I thought the world worked,",
        "vi": "Và phát hiện này đã thay đổi sâu sắc cách nhìn nhận của tôi về cách thế giới vận hành,",
        "properNouns": [],
        "keywords": ["profoundly changed", "world worked"],
        "explanationAi": "Phó từ 'profoundly' (một cách sâu sắc, căn bản) thể hiện mức độ tác động to lớn đến thế giới quan."
    },
    {
        "start": 91.26, "end": 95.26,
        "text": "and it even profoundly changed the way in which I operate in it.",
        "vi": "và nó thậm chí còn thay đổi sâu sắc cách tôi hành động trong cuộc sống.",
        "properNouns": [],
        "keywords": ["operate"],
        "explanationAi": "Động từ 'operate' ở đây mang nghĩa hành động, ra quyết định và vận hành cuộc sống cá nhân/doanh nghiệp."
    },
    # 01:37 - 02:03 [The Pattern & The Golden Circle]
    {
        "start": 97.26, "end": 100.22,
        "text": "As it turns out, there's a pattern.",
        "vi": "Hóa ra, có một quy luật chung.",
        "properNouns": [],
        "keywords": ["as it turns out", "pattern"],
        "explanationAi": "'As it turns out' là cụm từ chuyển tiếp quen thuộc dẫn dắt vào phát hiện thực tế bất ngờ."
    },
    {
        "start": 100.26, "end": 111.22,
        "text": "As it turns out, all the great inspiring leaders and organizations in the world, whether it's Apple or Martin Luther King or the Wright brothers, they all think, act and communicate the exact same way.",
        "vi": "Hóa ra, tất cả những nhà lãnh đạo và tổ chức truyền cảm hứng vĩ đại trên thế giới, dù là Apple, Martin Luther King hay anh em nhà Wright, họ đều suy nghĩ, hành động và truyền đạt thông điệp theo cùng một phương thức chính xác.",
        "properNouns": ["Apple", "Martin Luther King", "Wright"],
        "keywords": ["inspiring leaders", "communicate", "exact same way"],
        "explanationAi": "Bộ ba động từ song song 'think, act and communicate' là trọng tâm lý thuyết của Simon Sinek."
    },
    {
        "start": 111.26, "end": 115.22,
        "text": "And it's the complete opposite to everyone else.",
        "vi": "Và cách làm đó hoàn toàn trái ngược với phần còn lại của thế giới.",
        "properNouns": [],
        "keywords": ["complete opposite", "everyone else"],
        "explanationAi": "'Complete opposite' (hoàn toàn đối lập) nêu bật tính dị biệt của những người có tư duy đột phá."
    },
    {
        "start": 115.26, "end": 121.22,
        "text": "All I did was codify it, and it's probably the world's simplest idea.",
        "vi": "Tất cả những gì tôi làm là hệ thống hóa nó lại, và đây có lẽ là ý tưởng giản đơn nhất thế giới.",
        "properNouns": [],
        "keywords": ["codify", "simplest idea"],
        "explanationAi": "'Codify' nghĩa là đúc kết, hệ thống hóa các hiện tượng rời rạc thành khung quy chuẩn lý thuyết."
    },
    {
        "start": 121.26, "end": 123.26,
        "text": "I call it the golden circle.",
        "vi": "Tôi gọi nó là Vòng Tròn Vàng.",
        "properNouns": ["Golden Circle"],
        "keywords": ["golden circle"],
        "explanationAi": "Thuật ngữ định danh 'The Golden Circle' (Vòng Tròn Vàng) gồm 3 vòng tròn đồng tâm: Why, How, What."
    },
    # 02:11 - 02:22 [Why How What & The Terms]
    {
        "start": 131.56, "end": 134.22,
        "text": "Why? How? What?",
        "vi": "Tại sao? Thế nào? Cái gì?",
        "properNouns": [],
        "keywords": ["why", "how", "what"],
        "explanationAi": "Ba câu hỏi cốt lõi xếp từ tâm ra ngoài: Why (Tại sao), How (Thế nào), What (Cái gì)."
    },
    {
        "start": 134.26, "end": 140.22,
        "text": "This little idea explains why some organizations and some leaders are able to inspire where others aren't.",
        "vi": "Ý tưởng nhỏ bé này giải thích tại sao một số tổ chức và lãnh đạo có thể truyền cảm hứng trong khi số khác thì không.",
        "properNouns": [],
        "keywords": ["inspire"],
        "explanationAi": "'Inspire' (truyền cảm hứng, thôi thúc hành động) là mục tiêu xuyên suốt bài diễn thuyết."
    },
    {
        "start": 140.26, "end": 142.22,
        "text": "Let me define the terms really quickly.",
        "vi": "Hãy để tôi định nghĩa các thuật ngữ này thật nhanh chóng.",
        "properNouns": [],
        "keywords": ["define the terms"],
        "explanationAi": "Cụm 'define the terms' thường dùng trong văn phong học thuật khi giải thích các khái niệm mới."
    },
    {
        "start": 142.26, "end": 147.99,
        "text": "Every single person, every single organization on the planet knows what they do, 100 percent.",
        "vi": "Mỗi cá nhân, mỗi tổ chức duy nhất trên hành tinh này đều biết rõ 100% điều họ làm.",
        "properNouns": [],
        "keywords": ["every single person", "organization", "planet"],
        "explanationAi": "'What they do' là tầng ngoài cùng: sản phẩm hoặc dịch vụ hữu hình mà doanh nghiệp bán ra thị trường."
    },
    {
        "start": 149.26, "end": 151.22,
        "text": "Some know how they do it,",
        "vi": "Một số người biết họ làm điều đó như thế nào,",
        "properNouns": [],
        "keywords": ["how they do it"],
        "explanationAi": "'How they do it' là tầng giữa: phương pháp, quy trình vận hành hoặc công nghệ độc quyền."
    },
    {
        "start": 151.26, "end": 156.22,
        "text": "whether you call it your differentiated value proposition or your proprietary process or your USP.",
        "vi": "dù bạn gọi đó là tuyên bố giá trị khác biệt, quy trình độc quyền hay điểm bán hàng độc nhất (USP).",
        "properNouns": [],
        "keywords": ["differentiated value proposition", "proprietary process", "USP"],
        "explanationAi": "Các thuật ngữ kinh doanh cao cấp: 'value proposition' (tuyên ngôn giá trị), 'proprietary' (độc quyền), 'USP' (Unique Selling Proposition)."
    },
    {
        "start": 156.26, "end": 160.99,
        "text": "But very, very few people or organizations know why they do what they do.",
        "vi": "Nhưng có rất, rất ít cá nhân hoặc tổ chức thực sự biết tại sao họ lại làm những việc họ đang làm.",
        "properNouns": [],
        "keywords": ["very few", "why they do"],
        "explanationAi": "'Why' là tâm điểm của vòng tròn: lý do tồn tại sâu xa, mục đích và niềm tin cốt lõi."
    },
    {
        "start": 161.02, "end": 163.22,
        "text": "And by \"why\" I don't mean \"to make a profit.\"",
        "vi": "Và khi nói 'tại sao', tôi không hề có ý ám chỉ 'để kiếm lợi nhuận.'",
        "properNouns": [],
        "keywords": ["make a profit"],
        "explanationAi": "Diễn giả phân biệt rõ: kiếm tiền/lợi nhuận không phải là lý do tồn tại (Why), mà chỉ là hệ quả."
    },
    {
        "start": 163.26, "end": 165.22,
        "text": "That's a result. It's always a result.",
        "vi": "Đó là một kết quả. Nó luôn luôn là một kết quả.",
        "properNouns": [],
        "keywords": ["result"],
        "explanationAi": "Khẳng định dứt khoát: lợi nhuận là kết quả đầu ra tự nhiên của một mục đích rõ ràng."
    },
    {
        "start": 165.26, "end": 167.22,
        "text": "By \"why,\" I mean: What's your purpose?",
        "vi": "Khi nói 'tại sao', ý tôi là: Mục đích của bạn là gì?",
        "properNouns": [],
        "keywords": ["purpose"],
        "explanationAi": "'Purpose' (mục đích tối thượng) trả lời cho câu hỏi bạn được sinh ra hay tổ chức được tạo ra để làm gì."
    },
    {
        "start": 167.26, "end": 169.69,
        "text": "What's your cause? What's your belief?",
        "vi": "Lý tưởng của bạn là gì? Niềm tin của bạn là gì?",
        "properNouns": [],
        "keywords": ["cause", "belief"],
        "explanationAi": "'Cause' ở đây là lý tưởng phụng sự cao cả; 'belief' là niềm tin cốt lõi dẫn dắt mọi quyết định."
    },
    {
        "start": 169.72, "end": 173.22,
        "text": "Why does your organization exist?",
        "vi": "Tại sao tổ chức của bạn lại tồn tại?",
        "properNouns": [],
        "keywords": ["organization exist"],
        "explanationAi": "Câu hỏi căn bản về lý do hiện diện của một doanh nghiệp trong xã hội."
    },
    {
        "start": 173.26, "end": 175.62,
        "text": "Why do you get out of bed in the morning?",
        "vi": "Tại sao bạn lại thức dậy vào mỗi buổi sáng?",
        "properNouns": [],
        "keywords": ["get out of bed"],
        "explanationAi": "Hình ảnh ẩn dụ gần gũi: động lực thức dậy mỗi ngày phản ánh ngọn lửa đam mê bên trong."
    },
    {
        "start": 175.66, "end": 178.22,
        "text": "And why should anyone care?",
        "vi": "Và tại sao người khác lại phải bận tâm?",
        "properNouns": [],
        "keywords": ["why should anyone care"],
        "explanationAi": "Câu hỏi mấu chốt trong tiếp thị và lãnh đạo: làm sao để mọi người cảm thấy gắn kết và quan tâm."
    },
    # 02:58 - 03:15 [Outside-In vs Inside-Out]
    {
        "start": 178.26, "end": 182.99,
        "text": "As a result, the way we think, we act, the way we communicate is from the outside in, it's obvious.",
        "vi": "Hệ quả là, cách chúng ta suy nghĩ, hành động và truyền đạt thông điệp là từ ngoài vào trong, điều đó rất rõ ràng.",
        "properNouns": [],
        "keywords": ["from the outside in", "obvious"],
        "explanationAi": "'From the outside in' (từ ngoài vào trong): bắt đầu từ cái rõ nhất (What) đến cái mơ hồ nhất (Why)."
    },
    {
        "start": 183.02, "end": 185.72,
        "text": "We go from the clearest thing to the fuzziest thing.",
        "vi": "Chúng ta đi từ điều rõ ràng nhất đến điều mơ hồ nhất.",
        "properNouns": [],
        "keywords": ["clearest", "fuzziest"],
        "explanationAi": "Cặp tính từ tương phản 'clearest' (rõ nét nhất) và 'fuzziest' (mơ hồ, mờ mịt nhất)."
    },
    {
        "start": 185.76, "end": 192.86,
        "text": "But the inspired leaders and the inspired organizations -- regardless of their size, regardless of their industry --",
        "vi": "Nhưng những nhà lãnh đạo và tổ chức truyền cảm hứng -- bất kể quy mô, bất kể ngành nghề nào --",
        "properNouns": [],
        "keywords": ["inspired leaders", "regardless of size", "industry"],
        "explanationAi": "Cụm 'regardless of' (bất kể, không phân biệt) nhấn mạnh tính phổ quát của nguyên lý."
    },
    {
        "start": 192.89, "end": 195.99,
        "text": "all think, act and communicate from the inside out.",
        "vi": "đều suy nghĩ, hành động và truyền đạt thông điệp từ trong ra ngoài.",
        "properNouns": [],
        "keywords": ["from the inside out"],
        "explanationAi": "'From the inside out' (từ trong ra ngoài): xuất phát điểm luôn là 'Tại sao' (Why) rồi mới đến 'Như thế nào' và 'Cái gì'."
    },
    # 03:17 - 03:36 [Apple Example: Normal Pitch]
    {
        "start": 197.79, "end": 202.66,
        "text": "Let me give you an example. I use Apple because they're easy to understand and everybody gets it.",
        "vi": "Hãy để tôi lấy một ví dụ. Tôi chọn Apple vì họ rất dễ hiểu và ai cũng nắm bắt được.",
        "properNouns": ["Apple"],
        "keywords": ["example", "easy to understand", "gets it"],
        "explanationAi": "Khẩu ngữ 'everybody gets it' nghĩa là ai cũng thấu hiểu và quen thuộc với trường hợp này."
    },
    {
        "start": 202.66, "end": 208.76,
        "text": "If Apple were like everyone else, a marketing message from them might sound like this:",
        "vi": "Nếu Apple cũng giống như bao người khác, một thông điệp tiếp thị của họ có thể sẽ nghe như thế này:",
        "properNouns": ["Apple"],
        "keywords": ["marketing message", "sound like"],
        "explanationAi": "Câu điều kiện loại 2 giả định tình huống không có thật ở hiện tại: 'If Apple were like everyone else'."
    },
    {
        "start": 208.76, "end": 210.26,
        "text": "\"We make great computers.",
        "vi": "\"Chúng tôi sản xuất những chiếc máy tính tuyệt vời.",
        "properNouns": [],
        "keywords": ["make great computers"],
        "explanationAi": "Thông điệp mở đầu bằng tầng 'What' (chúng tôi làm ra máy tính)."
    },
    {
        "start": 211.26, "end": 215.22,
        "text": "They're beautifully designed, simple to use and user friendly.",
        "vi": "Chúng được thiết kế đẹp mắt, sử dụng đơn giản và thân thiện với người dùng.",
        "properNouns": [],
        "keywords": ["beautifully designed", "simple to use", "user friendly"],
        "explanationAi": "Bộ ba tính từ mô tả tầng 'How' (tính năng sản phẩm)."
    },
    {
        "start": 215.26, "end": 216.56,
        "text": "Want to buy one?\"",
        "vi": "Bạn có muốn mua một chiếc không?\"",
        "properNouns": [],
        "keywords": ["want to buy"],
        "explanationAi": "Lời mời chào bán hàng thô sơ theo phong cách truyền thống."
    },
    {
        "start": 217.46, "end": 220.22,
        "text": "\"Meh.\" That's how most of us communicate.",
        "vi": "\"Thường thôi.\" Đó là cách hầu hết chúng ta đang truyền đạt thông điệp.",
        "properNouns": [],
        "keywords": ["meh", "communicate"],
        "explanationAi": "Thán từ 'Meh' biểu thị thái độ thờ ơ, không chút hào hứng của người nghe."
    },
    {
        "start": 220.26, "end": 224.86,
        "text": "That's how most marketing and sales are done, that's how we communicate interpersonally.",
        "vi": "Đó là cách hầu hết các hoạt động tiếp thị và bán hàng diễn ra, và cũng là cách chúng ta giao tiếp giữa các cá nhân.",
        "properNouns": [],
        "keywords": ["marketing and sales", "interpersonally"],
        "explanationAi": "'Interpersonally' (mang tính tương tác giữa các cá nhân với nhau)."
    },
    {
        "start": 224.89, "end": 232.32,
        "text": "We say what we do, we say how we're different or better and we expect some sort of a behavior, a purchase, a vote, something like that.",
        "vi": "Chúng ta nói điều mình làm, nói chúng ta khác biệt hay ưu việt hơn thế nào, và kỳ vọng một hành vi nào đó, một đơn mua hàng, một lá phiếu bầu, đại loại như vậy.",
        "properNouns": [],
        "keywords": ["expect behavior", "purchase", "vote"],
        "explanationAi": "Cụm 'expect some sort of a behavior' chỉ sự kỳ vọng người khác hành động theo ý mình bằng logic bề ngoài."
    },
    # 03:52 - 04:08 [Law Firm & Car Examples]
    {
        "start": 232.36, "end": 237.72,
        "text": "Here's our new law firm: We have the best lawyers with the biggest clients, we always perform for our clients.",
        "vi": "Đây là công ty luật mới của chúng tôi: Chúng tôi có những luật sư giỏi nhất với những khách hàng lớn nhất, chúng tôi luôn mang lại kết quả tốt nhất cho khách hàng.",
        "properNouns": [],
        "keywords": ["law firm", "best lawyers", "biggest clients", "perform"],
        "explanationAi": "Ví dụ minh họa cách quảng cáo tự khen ngợi sáo rỗng của các công ty dịch vụ."
    },
    {
        "start": 237.76, "end": 244.22,
        "text": "Here's our new car: It gets great gas mileage, it has leather seats. Buy our car. But it's uninspiring.",
        "vi": "Đây là chiếc xe hơi mới của chúng tôi: Nó rất tiết kiệm xăng, có ghế bọc da. Hãy mua xe của chúng tôi. Nhưng nó hoàn toàn không truyền được chút cảm hứng nào.",
        "properNouns": [],
        "keywords": ["gas mileage", "leather seats", "uninspiring"],
        "explanationAi": "'Gas mileage' (mức tiêu hao nhiên liệu); 'uninspiring' (nhàm chán, tẻ nhạt, thiếu sức lôi cuốn)."
    },
    # 04:08 - 04:33 [How Apple Actually Communicates]
    {
        "start": 244.26, "end": 246.89,
        "text": "Here's how Apple actually communicates.",
        "vi": "Đây là cách Apple thực sự truyền đạt thông điệp.",
        "properNouns": ["Apple"],
        "keywords": ["actually communicates"],
        "explanationAi": "Chuyển tiếp sang bản thông điệp thực tế đầy sức hút của Apple."
    },
    {
        "start": 248.26, "end": 256.22,
        "text": "\"Everything we do, we believe in challenging the status quo. We believe in thinking differently.",
        "vi": "\"Trong mọi việc chúng tôi làm, chúng tôi tin vào việc thách thức nguyên trạng. Chúng tôi tin vào tư duy khác biệt.",
        "properNouns": [],
        "keywords": ["challenging the status quo", "thinking differently"],
        "explanationAi": "'Status quo' (tình trạng hiện tại, nguyên trạng); khẩu hiệu kinh điển 'Think Different' của Apple."
    },
    {
        "start": 256.92, "end": 263.22,
        "text": "The way we challenge the status quo is by making our products beautifully designed, simple to use and user friendly.",
        "vi": "Cách chúng tôi thách thức nguyên trạng là làm cho các sản phẩm của mình được thiết kế đẹp mắt, sử dụng đơn giản và thân thiện với người dùng.",
        "properNouns": [],
        "keywords": ["challenge the status quo", "beautifully designed"],
        "explanationAi": "Tầng 'How' đóng vai trò là bằng chứng cụ thể hóa cho niềm tin 'Why' ở tầng lõi."
    },
    {
        "start": 263.26, "end": 266.99,
        "text": "We just happen to make great computers. Want to buy one?\"",
        "vi": "Chúng tôi chỉ tình cờ làm ra những chiếc máy tính tuyệt vời. Bạn có muốn mua một chiếc không?\"",
        "properNouns": [],
        "keywords": ["just happen to make"],
        "explanationAi": "Cụm 'just happen to make' biến sản phẩm hữu hình (What) thành một hệ quả phụ tự nhiên chứ không phải mục đích tối thượng."
    },
    {
        "start": 268.16, "end": 271.42,
        "text": "Totally different, right? You're ready to buy a computer from me.",
        "vi": "Hoàn toàn khác biệt, phải không? Bạn đã sẵn sàng mua một chiếc máy tính từ tôi rồi.",
        "properNouns": [],
        "keywords": ["totally different", "ready to buy"],
        "explanationAi": "Hiệu ứng tâm lý thuyết phục tức thì khi đảo ngược thứ tự truyền đạt."
    },
    {
        "start": 271.46, "end": 273.66,
        "text": "I just reversed the order of the information.",
        "vi": "Tôi chỉ đơn giản là đảo ngược thứ tự của các luồng thông tin.",
        "properNouns": [],
        "keywords": ["reversed the order"],
        "explanationAi": "Kỹ thuật 'reversed the order': bắt đầu từ Tại sao (Why) thay vì Cái gì (What)."
    },
    # 04:33 - 05:00 [People Don't Buy What You Do]
    {
        "start": 273.69, "end": 279.99,
        "text": "What it proves to us is that people don't buy what you do; people buy why you do it.",
        "vi": "Điều này chứng minh cho chúng ta thấy: Mọi người không mua những gì bạn làm; người ta mua lý do tại sao bạn làm điều đó.",
        "properNouns": [],
        "keywords": ["people don't buy what you do", "buy why you do it"],
        "explanationAi": "Châm ngôn định hình thương hiệu nổi tiếng nhất của Simon Sinek trong thế kỷ 21."
    },
    {
        "start": 279.99, "end": 287.22,
        "text": "This explains why every single person in this room is perfectly comfortable buying a computer from Apple.",
        "vi": "Điều này giải thích tại sao mọi người trong khán phòng này đều hoàn toàn thoải mái khi mua một chiếc máy tính từ Apple.",
        "properNouns": ["Apple"],
        "keywords": ["perfectly comfortable"],
        "explanationAi": "'Perfectly comfortable' (hoàn toàn an tâm, tự nhiên, không hề đắn đo)."
    },
    {
        "start": 287.26, "end": 294.22,
        "text": "But we're also perfectly comfortable buying an MP3 player from Apple, or a phone from Apple, or a DVR from Apple.",
        "vi": "Nhưng chúng ta cũng hoàn toàn thoải mái khi mua máy nghe nhạc MP3 từ Apple, điện thoại từ Apple, hay đầu ghi hình DVR từ Apple.",
        "properNouns": ["Apple"],
        "keywords": ["MP3 player", "phone", "DVR"],
        "explanationAi": "Khả năng mở rộng dải sản phẩm không biên giới khi khách hàng mua vì lý do (Why) chứ không đóng khung vào ngành máy tính."
    },
    {
        "start": 294.26, "end": 296.79,
        "text": "As I said before, Apple's just a computer company.",
        "vi": "Như tôi đã nói trước đó, Apple cũng chỉ là một công ty máy tính.",
        "properNouns": ["Apple"],
        "keywords": ["as I said before"],
        "explanationAi": "Nhắc lại tiền đề so sánh ban đầu để chuẩn bị phản biện các đối thủ cùng thời."
    },
    {
        "start": 296.82, "end": 300.22,
        "text": "Nothing distinguishes them structurally from any of their competitors.",
        "vi": "Không có điều gì phân biệt họ về mặt cấu trúc với bất kỳ đối thủ cạnh tranh nào.",
        "properNouns": [],
        "keywords": ["distinguishes", "structurally", "competitors"],
        "explanationAi": "'Distinguish structurally' (phân biệt về mặt cấu trúc tổ chức, nguồn nhân lực hay tài chính)."
    },
    {
        "start": 300.26, "end": 305.22,
        "text": "Their competitors are equally qualified to make all of these products. In fact, they tried.",
        "vi": "Các đối thủ của họ cũng có năng lực hoàn toàn tương đương để sản xuất tất cả các sản phẩm này. Trên thực tế, họ đã từng thử.",
        "properNouns": [],
        "keywords": ["equally qualified", "in fact", "tried"],
        "explanationAi": "'Equally qualified' (có năng lực, chuyên môn tương đương)."
    },
    # 05:05 - 05:30 [Gateway & Dell Failure]
    {
        "start": 305.26, "end": 308.22,
        "text": "A few years ago, Gateway came out with flat-screen TVs.",
        "vi": "Một vài năm trước, Gateway đã tung ra dòng tivi màn hình phẳng.",
        "properNouns": ["Gateway"],
        "keywords": ["came out with", "flat-screen TVs"],
        "explanationAi": "'Came out with' là cụm động từ chỉ việc ra mắt, trình làng sản phẩm mới trên thị trường."
    },
    {
        "start": 308.26, "end": 313.22,
        "text": "They're eminently qualified to make flat-screen TVs. They've been making flat-screen monitors for years.",
        "vi": "Họ hoàn toàn có năng lực vượt trội để sản xuất tivi màn hình phẳng. Họ đã sản xuất màn hình vi tính phẳng trong nhiều năm.",
        "properNouns": [],
        "keywords": ["eminently qualified", "flat-screen monitors"],
        "explanationAi": "'Eminently qualified' (vô cùng có tư cách, năng lực chuyên môn không thể bàn cãi)."
    },
    {
        "start": 313.26, "end": 314.82,
        "text": "Nobody bought one.",
        "vi": "Không một ai thèm mua.",
        "properNouns": [],
        "keywords": ["nobody bought"],
        "explanationAi": "Câu kết ngắn gọn phản ánh sự thất bại thương mại ê chề của Gateway."
    },
    {
        "start": 317.92, "end": 330.06,
        "text": "Dell came out with MP3 players and PDAs, and they make great quality products, and they can make perfectly well-designed products -- and nobody bought one.",
        "vi": "Dell cũng tung ra máy nghe nhạc MP3 và thiết bị kỹ thuật số cá nhân PDA, họ sản xuất ra những sản phẩm chất lượng tuyệt vời, thiết kế hoàn hảo -- vậy mà không một ai mua.",
        "properNouns": ["Dell"],
        "keywords": ["MP3 players", "PDAs", "well-designed"],
        "explanationAi": "Trường hợp thất bại của Dell với dòng máy nghe nhạc DJ Ditty khi cạnh tranh với iPod."
    },
    {
        "start": 330.09, "end": 334.09,
        "text": "In fact, talking about it now, we can't even imagine buying an MP3 player from Dell.",
        "vi": "Trên thực tế, khi nói về điều đó bây giờ, chúng ta thậm chí không thể tưởng tượng nổi việc sẽ mua một chiếc máy nghe nhạc MP3 từ Dell.",
        "properNouns": ["Dell"],
        "keywords": ["can't even imagine"],
        "explanationAi": "Tâm lý định vị thương hiệu: người tiêu dùng không thể gắn kết cảm xúc với thương hiệu chỉ định nghĩa mình bằng 'What'."
    },
    {
        "start": 334.12, "end": 337.96,
        "text": "Why would you buy one from a computer company? But we do it every day.",
        "vi": "Tại sao bạn lại đi mua nó từ một công ty máy tính cơ chứ? Thế nhưng chúng ta lại làm điều đó mỗi ngày với Apple.",
        "properNouns": [],
        "keywords": ["computer company", "every day"],
        "explanationAi": "Nghịch lý nhận thức được giải mã trọn vẹn bằng lý thuyết Vòng Tròn Vàng."
    },
    # 05:38 - 05:50 [Core Business Philosophy Conclusion]
    {
        "start": 337.99, "end": 340.46,
        "text": "People don't buy what you do; they buy why you do it.",
        "vi": "Mọi người không mua những gì bạn làm; người ta mua lý do tại sao bạn làm điều đó.",
        "properNouns": [],
        "keywords": ["people don't buy what you do", "buy why you do it"],
        "explanationAi": "Điệp khúc châm ngôn được nhắc lại lần 2 để khắc sâu vào tiềm thức người nghe."
    },
    {
        "start": 340.49, "end": 346.02,
        "text": "The goal is not to do business with everybody who needs what you have.",
        "vi": "Mục tiêu không phải là làm ăn với tất cả những ai có nhu cầu về những thứ bạn có.",
        "properNouns": [],
        "keywords": ["goal", "do business", "needs what you have"],
        "explanationAi": "Triết lý kinh doanh đỉnh cao: loại bỏ tư duy bán hàng đại trà không chọn lọc."
    },
    {
        "start": 346.06, "end": 350.09,
        "text": "The goal is to do business with people who believe what you believe.",
        "vi": "Mục tiêu là làm ăn với những người cùng chia sẻ niềm tin với những gì bạn tin tưởng.",
        "properNouns": [],
        "keywords": ["believe what you believe"],
        "explanationAi": "Đích đến tối thượng của lãnh đạo truyền cảm hứng: tìm kiếm những người đồng điệu về lý tưởng và niềm tin."
    }
]

print(f"Total master segments defined: {len(segments_spec)}")

processed_segments = []
for idx, seg in enumerate(segments_spec, start=1):
    text = seg["text"]
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", text)
    ipa = text_to_ipa(text)
    processed_segments.append({
        "orderIndex": idx,
        "startTime": seg["start"],
        "endTime": seg["end"],
        "text": text,
        "translationVi": seg["vi"],
        "ipaUs": ipa,
        "keywords": seg["keywords"],
        "explanationAi": seg["explanationAi"],
        "properNouns": seg["properNouns"],
        "tokenCount": len(tokens)
    })

with open('scripts/simon_sinek_master_segments.json', 'w', encoding='utf-8') as f:
    json.dump(processed_segments, f, ensure_ascii=False, indent=2)

print("Saved to scripts/simon_sinek_master_segments.json successfully!")
