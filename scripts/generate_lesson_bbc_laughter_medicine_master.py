import json
import re
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

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
    'bbc': 'ˌbiː biː ˈsiː',
    'bbclearningenglish': 'ˌbiː biː ˈsiː ˈlɜːrnɪŋ ˈɪŋɡlɪʃ',
    'com': 'kɑːm',
    'juan': 'hwɑːn',
    'risology': 'rɪˈsɑːlədʒi',
    'gelotology': 'ˌdʒeləˈtɑːlədʒi',
    'gelos': 'ˈɡeɪlɑːs',
    'comology': 'kəˈmɑːlədʒi',
    'sniggering': 'ˈsnɪɡərɪŋ',
    'outwork': 'ˌaʊtˈwɜːrk',
    'feel-good': 'ˈfiːl ɡʊd',
    'feelgood': 'ˈfiːl ɡʊd',
    'stand-up': 'ˈstænd ʌp',
    'standup': 'ˈstænd ʌp',
    'gonna': 'ˈɡənə',
    'gotta': 'ˈɡɑːtə',
    'byrne': 'bɜːrn'
}
cmu_map.update(manual_ipa)

def text_to_ipa(sentence):
    raw_words = re.findall(r"\b[A-Za-z0-9_'–-]+\b", sentence)
    ipa_tokens = []
    for w in raw_words:
        w_lower = w.lower().replace("'", "").replace('-', '')
        w_original_lower = w.lower()
        if w_original_lower in cmu_map:
            ipa_tokens.append(cmu_map[w_original_lower])
        elif w_lower in cmu_map:
            ipa_tokens.append(cmu_map[w_lower])
        else:
            parts = w.lower().split('-')
            part_ipas = [cmu_map.get(p, p) for p in parts if p]
            if part_ipas:
                ipa_tokens.append(' '.join(part_ipas))
            else:
                ipa_tokens.append(w_lower)
    return '/' + ' '.join(ipa_tokens) + '/'

# Raw Segment Specifications
raw_segments = [
    # 1 - 2: Intro
    {
        "start": 0.16, "end": 6.71,
        "text": "This is a download from BBC Learning English. To find out more, visit our website.",
        "vi": "Đây là bản tải xuống từ BBC Learning English. Để tìm hiểu thêm, hãy truy cập trang web của chúng tôi.",
        "properNouns": ["BBC", "Learning English"],
        "keywords": ["download", "learning", "visit", "website"],
        "explanationAi": "Cụm danh từ 'a download from' chỉ bản tin hoặc tệp ghi âm được tải về từ đài truyền thông. 'To find out more' là mệnh đề chỉ mục đích (để tìm hiểu thêm thông tin)."
    },
    {
        "start": 6.72, "end": 12.07,
        "text": "6 Minute English from bbclearningenglish.com.",
        "vi": "Chương trình 6 Minute English từ bbclearningenglish.com.",
        "properNouns": ["6 Minute English", "BBC"],
        "keywords": ["minute", "english"],
        "explanationAi": "Đoạn nhạc hiệu nhận diện chương trình luyện nghe podcast định dạng 6 phút trứ danh của đài BBC London."
    },
    # 3 - 5: Greetings
    {
        "start": 12.08, "end": 15.52,
        "text": "Hello and welcome to 6 Minute English. I'm Alice...",
        "vi": "Xin chào và chào mừng các bạn đến với 6 Minute English. Tôi là Alice...",
        "properNouns": ["6 Minute English", "Alice"],
        "keywords": ["welcome", "minute", "english"],
        "explanationAi": "Cấu trúc chào mừng người nghe quen thuộc của host: 'welcome to' đi cùng danh từ tên chương trình."
    },
    {
        "start": 15.52, "end": 20.48,
        "text": "...and I'm Neil. OK Alice, I've got something for you here... a question...",
        "vi": "...và tôi là Neil. Được rồi Alice, tôi có một điều này dành cho bạn ở đây... một câu hỏi...",
        "properNouns": ["Neil", "Alice"],
        "keywords": ["question", "something"],
        "explanationAi": "Thành ngữ 'have got something for you' dùng để thu hút sự chú ý trước khi đưa ra câu đố bất ngờ."
    },
    {
        "start": 20.48, "end": 22.15,
        "text": "Yeah?",
        "vi": "Vâng, sao thế?",
        "properNouns": [],
        "keywords": ["yeah"],
        "explanationAi": "Thán từ xác nhận trong giao tiếp thân mật, thể hiện sự chú ý và sẵn sàng lắng nghe."
    },
    # 6 - 11: Joke
    {
        "start": 22.16, "end": 28.00,
        "text": "Ready? What is the Mexican version of One Direction?",
        "vi": "Sẵn sàng chưa? Phiên bản Mexico của ban nhạc One Direction là gì?",
        "properNouns": ["Mexican", "One Direction"],
        "keywords": ["ready", "mexican", "version", "direction"],
        "explanationAi": "Câu đố chữ (pun). 'Mexican version' chỉ phiên bản mang phong cách Mexico. 'One Direction' là nhóm nhạc pop nổi tiếng."
    },
    {
        "start": 28.00, "end": 30.63,
        "text": "Um... No idea.",
        "vi": "Ừm... Tôi chịu, không biết đâu.",
        "properNouns": [],
        "keywords": ["idea"],
        "explanationAi": "Cụm 'no idea' là cách diễn đạt ngắn gọn thông dụng của 'I have no idea' (Tôi hoàn toàn không biết)."
    },
    {
        "start": 30.64, "end": 34.79,
        "text": "Juan Direction! Get it?",
        "vi": "Juan Direction! Hiểu chưa hả?",
        "properNouns": ["Juan Direction"],
        "keywords": ["direction"],
        "explanationAi": "Lối chơi chữ hài hước dựa trên tên tiếng Tây Ban Nha 'Juan' phát âm gần giống với từ 'One' trong tiếng Anh. 'Get it?' nghĩa là bạn có hiểu ý đùa không."
    },
    {
        "start": 34.80, "end": 35.83,
        "text": "Very good...",
        "vi": "Rất hay đấy...",
        "properNouns": [],
        "keywords": ["good"],
        "explanationAi": "Câu phản hồi mỉa mai nhẹ nhàng (dry sarcasm) của Alice trước câu chuyện đùa ngô nghê của Neil."
    },
    {
        "start": 35.84, "end": 38.23,
        "text": "Juan Direction... You know?",
        "vi": "Juan Direction ấy... Bạn biết mà đúng không?",
        "properNouns": ["Juan Direction"],
        "keywords": ["direction", "know"],
        "explanationAi": "Neil nhắc lại tên gọi để đảm bảo Alice không bỏ sót sự tương đồng ngữ âm dí dỏm."
    },
    {
        "start": 38.24, "end": 39.99,
        "text": "Yes, yes, I get it.",
        "vi": "Vâng, vâng, tôi hiểu rồi mà.",
        "properNouns": [],
        "keywords": ["get"],
        "explanationAi": "'I get it' đồng nghĩa với 'I understand the joke' (Tôi bắt kịp điểm gây cười rồi)."
    },
    # 12 - 18: Theme introduction
    {
        "start": 40.00, "end": 44.71,
        "text": "Never mind. Can you guess what the subject of today's show is instead?",
        "vi": "Thôi bỏ qua đi. Thay vào đó, bạn có đoán được chủ đề của buổi phát sóng hôm nay là gì không?",
        "properNouns": [],
        "keywords": ["mind", "guess", "subject", "show", "instead"],
        "explanationAi": "'Never mind' dùng khi muốn chuyển đề tài. Cụm 'subject of today's show' chỉ chủ đề trọng tâm của bài học."
    },
    {
        "start": 44.72, "end": 46.50,
        "text": "Is it bad jokes?",
        "vi": "Có phải là về những trò đùa dở tệ không?",
        "properNouns": [],
        "keywords": ["bad", "jokes"],
        "explanationAi": "Alice trêu Neil bằng cách gọi câu đùa của anh là 'bad jokes' (chuyện đùa nhạt nhẽo)."
    },
    {
        "start": 46.50, "end": 48.87,
        "text": "Come on! That was a good little gag!",
        "vi": "Thôi nào! Đó là một mẩu chuyện đùa dí dỏm hay đấy chứ!",
        "properNouns": [],
        "keywords": ["gag", "good", "little"],
        "explanationAi": "'Gag' là danh từ chỉ mẩu chuyện cười, trò hề ngắn. 'Come on!' thể hiện sự phân trần hóm hỉnh."
    },
    {
        "start": 48.88, "end": 54.00,
        "text": "Yes. The subject of today's show is... what makes us laugh.",
        "vi": "Đúng vậy. Chủ đề của chương trình hôm nay là... điều gì khiến chúng ta cười.",
        "properNouns": [],
        "keywords": ["subject", "laugh"],
        "explanationAi": "Mệnh đề danh ngữ 'what makes us laugh' làm bổ ngữ giải thích rõ ràng đề tài nghiên cứu tâm lý nụ cười."
    },
    {
        "start": 54.00, "end": 59.67,
        "text": "And in this context, to get something, for example a gag – or joke, means to understand it.",
        "vi": "Và trong ngữ cảnh này, 'to get something', ví dụ như một mẩu chuyện đùa – hay trò cười, có nghĩa là thấu hiểu nó.",
        "properNouns": [],
        "keywords": ["context", "gag", "joke", "means", "understand"],
        "explanationAi": "Neil định nghĩa từ vựng: cụm 'to get something' đối với chuyện hài có nghĩa là hiểu được ý tứ gây cười."
    },
    {
        "start": 59.68, "end": 64.00,
        "text": "We all like to laugh – well not you Alice apparently – but most of us do!",
        "vi": "Tất cả chúng ta đều thích cười – à trừ bạn ra Alice rõ ràng là thế – nhưng hầu hết chúng ta đều thích!",
        "properNouns": ["Alice"],
        "keywords": ["laugh", "apparently"],
        "explanationAi": "Trạng từ 'apparently' (rõ ràng là, dường như là) được dùng để đùa vui về tính cách nghiêm túc của Alice."
    },
    {
        "start": 64.00, "end": 71.03,
        "text": "It's good for our health, it reduces stress and releases feel-good hormones in the body.",
        "vi": "Nụ cười rất tốt cho sức khỏe, nó làm giảm căng thẳng và giải phóng các hormone tạo cảm giác hưng phấn trong cơ thể.",
        "properNouns": [],
        "keywords": ["health", "reduces", "stress", "releases", "hormones"],
        "explanationAi": "Tính từ ghép 'feel-good' bổ nghĩa cho 'hormones' (như endorphin) giúp cải thiện tâm trạng và giảm bớt âu lo."
    },
    # 19 - 23: Quiz question
    {
        "start": 71.04, "end": 76.79,
        "text": "OK, thank you, Neil. But how about answering today's quiz question?",
        "vi": "Được rồi, cảm ơn Neil. Nhưng bạn thấy sao về việc trả lời câu hỏi đố hôm nay?",
        "properNouns": ["Neil"],
        "keywords": ["answering", "quiz", "question"],
        "explanationAi": "Cấu trúc 'how about + V-ing' được Alice dùng để mở màn câu hỏi trắc nghiệm của tuần."
    },
    {
        "start": 76.80, "end": 82.50,
        "text": "Which Greek word means the study of laughter and its effects on the body?",
        "vi": "Từ gốc Hy Lạp nào có nghĩa là ngành nghiên cứu về tiếng cười và những tác động của nó đối với cơ thể?",
        "properNouns": ["Greek"],
        "keywords": ["greek", "study", "laughter", "effects", "body"],
        "explanationAi": "'The study of laughter' chỉ ngành khoa học nghiên cứu nụ cười. 'Effects on the body' nghĩa là tác động sinh học lên cơ thể."
    },
    {
        "start": 82.50, "end": 91.03,
        "text": "Is it a) risology, b) gelotology? or c) comology?",
        "vi": "Đó là a) risology, b) gelotology, hay c) comology?",
        "properNouns": [],
        "keywords": ["risology", "gelotology", "comology"],
        "explanationAi": "Ba thuật ngữ khoa học mang hậu tố '-ology' (ngành học/môn khoa học) xuất phát từ các gốc từ cổ điển."
    },
    {
        "start": 91.04, "end": 99.83,
        "text": "That's difficult and I'm going to say c) comology because it's got sort of the word 'comedy' in it, you see.",
        "vi": "Câu đó khó thật đấy và tôi xin chọn c) comology bởi vì nó có chứa từ 'comedy' (hài kịch) trong đó, bạn thấy đấy.",
        "properNouns": [],
        "keywords": ["difficult", "comology", "comedy"],
        "explanationAi": "Neil suy luận theo liên tưởng bề mặt từ 'comedy' (hài kịch) nên chọn comology, đây là phỏng đoán sai lầm."
    },
    {
        "start": 99.84, "end": 103.59,
        "text": "Oh, very good. OK. Well, we'll find out later if you're right.",
        "vi": "Ồ, rất tốt. Được rồi. Chà, lát nữa chúng ta sẽ cùng tìm hiểu xem bạn có đúng hay không nhé.",
        "properNouns": [],
        "keywords": ["find", "later", "right"],
        "explanationAi": "Cụm 'find out' mang nghĩa khám phá ra sự thật hoặc đáp án chuẩn xác ở phần sau của chương trình."
    },
    # 24 - 29: Social aspects of laughter
    {
        "start": 103.60, "end": 107.99,
        "text": "Now, did you know, we rarely laugh when we're on our own?",
        "vi": "Nào, bạn có biết rằng, chúng ta rất hiếm khi cười khi chỉ có một mình không?",
        "properNouns": [],
        "keywords": ["rarely", "laugh"],
        "explanationAi": "'On our own' mang nghĩa 'alone' (đơn độc, một mình). Trạng từ tần suất 'rarely' nhấn mạnh tính hiếm thấy."
    },
    {
        "start": 108.00, "end": 111.83,
        "text": "Laughter is a social thing that we generally like to share with other people.",
        "vi": "Tiếng cười là một hiện tượng mang tính xã hội mà chúng ta thường thích sẻ chia cùng người khác.",
        "properNouns": [],
        "keywords": ["laughter", "social", "generally", "share"],
        "explanationAi": "Tính từ 'social' mô tả hành vi mang tính tương tác cộng đồng. 'Share with other people' nghĩa là chia sẻ cùng người khác."
    },
    {
        "start": 111.84, "end": 116.07,
        "text": "Really? I laugh when I'm watching cartoons on my own – don't you, Alice?",
        "vi": "Thật sao? Tôi vẫn cười khi xem phim hoạt hình một mình mà – bạn không thế sao, Alice?",
        "properNouns": ["Alice"],
        "keywords": ["cartoons", "watching"],
        "explanationAi": "Câu hỏi đuôi 'don't you?' dùng để tìm kiếm sự đồng cảm hoặc thăm dò thói quen xem phim hoạt hình (cartoons)."
    },
    {
        "start": 116.08, "end": 117.75,
        "text": "No, Neil, I don't.",
        "vi": "Không, Neil, tôi không làm thế đâu.",
        "properNouns": ["Neil"],
        "keywords": [],
        "explanationAi": "Câu phủ định dứt khoát của Alice tạo nên nét tương phản tính cách hài hước giữa hai người dẫn."
    },
    {
        "start": 117.76, "end": 124.71,
        "text": "Anyway, some researchers believe that the purpose of laughter is related to the way we bond with each other.",
        "vi": "Dù sao đi nữa, một số nhà nghiên cứu tin rằng mục đích của tiếng cười có liên quan đến cách chúng ta gắn kết với nhau.",
        "properNouns": [],
        "keywords": ["researchers", "purpose", "laughter", "related", "bond"],
        "explanationAi": "'Be related to' (có liên quan tới). Động từ 'bond with each other' mang nghĩa kết nối và xây dựng tình cảm thân thiết."
    },
    {
        "start": 124.72, "end": 127.35,
        "text": "And the more we laugh, the more we bond as a group.",
        "vi": "Và chúng ta càng cười nhiều, chúng ta càng gắn bó khăng khít hơn như một tập thể.",
        "properNouns": [],
        "keywords": ["laugh", "bond", "group"],
        "explanationAi": "Cấu trúc so sánh đồng tiến kép 'The more... the more...' nhấn mạnh mối quan hệ tỷ lệ thuận giữa việc cười và sự đoàn kết nhóm."
    },
    # 30 - 33: Stand-up comedy introduction
    {
        "start": 127.36, "end": 129.91,
        "text": "Interesting idea.",
        "vi": "Một ý tưởng thật thú vị.",
        "properNouns": [],
        "keywords": ["interesting", "idea"],
        "explanationAi": "Lời nhận xét ngắn gọn thể hiện sự đồng tình trước giả thuyết khoa học về sự gắn kết bầy đàn."
    },
    {
        "start": 129.92, "end": 140.07,
        "text": "It could explain why stand-up comedy – where a comedian performs in front of and talks directly to their audience – is very popular entertainment.",
        "vi": "Điều đó có thể giải thích tại sao hài độc thoại – nơi nghệ sĩ hài biểu diễn trước và nói chuyện trực tiếp với khán giả – lại là loại hình giải trí rất được yêu thích.",
        "properNouns": [],
        "keywords": ["stand-up comedy", "comedian", "performs", "audience", "entertainment"],
        "explanationAi": "Thuật ngữ sân khấu 'stand-up comedy' (hài độc thoại). Mệnh đề quan hệ giải thích 'where a comedian performs in front of and talks directly to their audience'."
    },
    {
        "start": 140.08, "end": 142.47,
        "text": "But what does it take to keep your audience laughing?",
        "vi": "Nhưng cần phải có những yếu tố gì để giữ cho khán giả của bạn không ngừng cười?",
        "properNouns": [],
        "keywords": ["audience", "laughing"],
        "explanationAi": "Thành ngữ 'what does it take' đặt ra câu hỏi về năng lực, bí quyết và sự rèn luyện cần thiết để thành công."
    },
    {
        "start": 142.48, "end": 147.99,
        "text": "Let's listen to Steve Byrne, a successful US comedian talking about this.",
        "vi": "Chúng ta hãy cùng lắng nghe Steve Byrne, một nghệ sĩ hài người Mỹ thành danh, chia sẻ về điều này.",
        "properNouns": ["Steve Byrne", "US"],
        "keywords": ["successful", "comedian", "talking"],
        "explanationAi": "Giới thiệu nhân vật khách mời: danh hài Steve Byrne người Mỹ với cụm danh từ 'a successful US comedian'."
    },
    # 34 - 37: Steve Byrne - finding your voice
    {
        "start": 148.00, "end": 157.00,
        "text": "The one single thing an aspiring comedian should do is to write, write, write and talk about the things that make them laugh.",
        "vi": "Điều duy nhất mà một diễn viên hài đầy hoài bão nên làm là viết, viết, viết không ngừng và nói về những điều khiến chính bản thân họ bật cười.",
        "properNouns": [],
        "keywords": ["aspiring", "comedian", "write", "laugh"],
        "explanationAi": "Tính từ 'aspiring' chỉ người đang nỗ lực đạt được hoài bão trong sự nghiệp. Điệp từ 'write, write, write' nhấn mạnh sự rèn luyện miệt mài."
    },
    {
        "start": 157.00, "end": 160.00,
        "text": "Selfishness – time to be selfish – time to be a little narcissistic.",
        "vi": "Sự vị kỷ – đã đến lúc phải biết vị kỷ – đã đến lúc phải tự ái tự tôn một chút.",
        "properNouns": [],
        "keywords": ["selfishness", "selfish", "narcissistic"],
        "explanationAi": "Steve Byrne nêu ra triết lý sáng tạo: nghệ sĩ phải xuất phát từ sự say mê cá nhân ('selfish', 'narcissistic') để tạo nét độc đáo."
    },
    {
        "start": 160.00, "end": 164.23,
        "text": "What is it that makes you laugh? Because that will get you closer to finding your voice.",
        "vi": "Điều gì là thứ khiến chính bạn bật cười? Bởi vì điều đó sẽ đưa bạn đến gần hơn với việc tìm ra tiếng nói riêng của mình.",
        "properNouns": [],
        "keywords": ["closer", "finding", "voice"],
        "explanationAi": "Thành ngữ nghệ thuật 'find your voice' chỉ việc khám phá và định hình phong cách biểu diễn độc bản của bản thân."
    },
    {
        "start": 164.24, "end": 167.75,
        "text": "Because ultimately that's why people come see you.",
        "vi": "Bởi vì suy cho cùng, đó chính là lý do vì sao mọi người lại đến xem bạn biểu diễn.",
        "properNouns": [],
        "keywords": ["ultimately", "people"],
        "explanationAi": "Trạng từ 'ultimately' nghĩa là xét đến cùng. Khán giả tìm đến một danh hài là vì tiếng nói và phong cách riêng biệt của họ."
    },
    # 38 - 43: Discussion on narcissistic & finding voice
    {
        "start": 167.76, "end": 175.00,
        "text": "So comedians need to be selfish and narcissistic – that sounds pretty negative!",
        "vi": "Vậy là các nghệ sĩ hài cần phải vị kỷ và tự luyến ư – nghe có vẻ khá tiêu cực đấy chứ!",
        "properNouns": [],
        "keywords": ["comedians", "selfish", "narcissistic", "negative"],
        "explanationAi": "'Sounds pretty negative' thể hiện phản ứng bất ngờ khi thấy danh hài khuyến khích đức tính thường bị coi là xấu trong đạo đức."
    },
    {
        "start": 175.00, "end": 176.50,
        "text": "Yes, it does.",
        "vi": "Đúng vậy, nghe đúng là thế.",
        "properNouns": [],
        "keywords": [],
        "explanationAi": "Câu phụ họa tán đồng của Alice dẫn dắt vào phần giải thích chi tiết ý nghĩa ngữ dụng của từ."
    },
    {
        "start": 176.50, "end": 182.63,
        "text": "Narcissistic means being too interested in yourself – for example your appearance or other personal qualities.",
        "vi": "'Narcissistic' có nghĩa là quá bận tâm đến bản thân – chẳng hạn như ngoại hình hay những phẩm chất cá nhân khác của bạn.",
        "properNouns": [],
        "keywords": ["narcissistic", "interested", "appearance", "qualities"],
        "explanationAi": "Định nghĩa từ vựng: 'narcissistic' (bắt nguồn từ thần thoại chàng Narcissus) miêu tả người quá tự mê đắm ngoại hình và tính cách của mình."
    },
    {
        "start": 182.64, "end": 187.03,
        "text": "And aspiring means wanting to be successful in your chosen career.",
        "vi": "Và 'aspiring' có nghĩa là khao khát được thành công trong sự nghiệp mà bạn đã lựa chọn.",
        "properNouns": [],
        "keywords": ["aspiring", "successful", "career"],
        "explanationAi": "Định nghĩa 'aspiring': ôm ấp ước mơ và nỗ lực đạt được thành tựu lớn trong một ngành nghề (chosen career)."
    },
    {
        "start": 187.04, "end": 191.99,
        "text": "And what does Steve mean when he says comedians need to find their voice?",
        "vi": "Thế còn Steve có ý gì khi ông ấy nói rằng các nghệ sĩ hài cần phải tìm ra tiếng nói riêng của họ?",
        "properNouns": ["Steve"],
        "keywords": ["mean", "comedians", "voice"],
        "explanationAi": "Neil hỏi về ý nghĩa cụ thể của việc 'tìm thấy tiếng nói' (find their voice) trong giới sân khấu biểu diễn."
    },
    {
        "start": 192.00, "end": 199.59,
        "text": "Well, he means they need to talk about what they think in a way that's unique – meaning unusual or special – to them.",
        "vi": "À, ông ấy muốn nói rằng họ cần phải giãi bày những suy nghĩ của mình theo cách độc nhất vô nhị – nghĩa là khác thường hay đặc biệt – mang dấu ấn của riêng họ.",
        "properNouns": [],
        "keywords": ["unique", "unusual", "special"],
        "explanationAi": "'Unique' (độc nhất) được làm rõ thông qua hai từ đồng nghĩa 'unusual' (khác lạ) và 'special' (đặc biệt)."
    },
    # 44 - 51: Steve Byrne - turning 40 & perseverance
    {
        "start": 199.60, "end": 207.19,
        "text": "OK. Let's listen to Steve again talking about turning 40 and what he finds funny about that.",
        "vi": "Được rồi. Hãy cùng nghe Steve chia sẻ tiếp về việc bước sang tuổi 40 và điều ông ấy thấy hài hước về điều đó nhé.",
        "properNouns": ["Steve"],
        "keywords": ["turning", "funny"],
        "explanationAi": "Cụm 'turning 40' diễn tả cột mốc bước sang tuổi tứ tuần. 'What he finds funny' chỉ những góc nhìn trào phúng cá nhân."
    },
    {
        "start": 207.20, "end": 212.31,
        "text": "When you turn 40 you will hear this in your life and hopefully you'll hear it the rest of your life.",
        "vi": "Khi bạn bước sang tuổi 40, bạn sẽ nghe thấy điều này trong đời và hy vọng rằng bạn sẽ còn được nghe nó trong suốt quãng đời còn lại.",
        "properNouns": [],
        "keywords": ["turn", "hear", "hopefully", "rest"],
        "explanationAi": "Steve Byrne mở đầu tiết mục hài độc thoại bằng quan sát thực tế về những lời nhận xét tuổi tác."
    },
    {
        "start": 212.32, "end": 217.91,
        "text": "'You look good for 40. You look good for 52. You look great for 63.'",
        "vi": "'Trông anh phong độ so với tuổi 40 đấy. Trông anh tuyệt so với tuổi 52. Trông cụ vẫn tuyệt vời so với tuổi 63.'",
        "properNouns": [],
        "keywords": ["look", "good", "great"],
        "explanationAi": "Lối dùng giới từ 'for' chỉ sự so sánh tương quan: đẹp/trẻ trung so với độ tuổi già đi."
    },
    {
        "start": 217.92, "end": 222.00,
        "text": "You never hear that when you're young. You never hear: 'You look good for 19.'",
        "vi": "Bạn không bao giờ nghe thấy điều đó khi còn trẻ. Bạn chẳng bao giờ nghe ai bảo: 'Trông cậu được đấy so với tuổi 19'.",
        "properNouns": [],
        "keywords": ["never", "young"],
        "explanationAi": "Nghệ thuật tương phản gây cười: thanh niên tuổi 19 không ai khen là 'nhìn được so với tuổi' vì sự tươi trẻ là tất yếu."
    },
    {
        "start": 222.00, "end": 227.00,
        "text": "You think there's gonna be some secret potion or some magic shortcut to it all.",
        "vi": "Bạn tưởng rằng sẽ có một thứ thuốc tiên bí mật hay con đường tắt diệu kỳ nào đó cho tất cả những điều này.",
        "properNouns": [],
        "keywords": ["secret", "potion", "magic", "shortcut"],
        "explanationAi": "Ẩn dụ 'secret potion' (thần dược bí mật) và 'magic shortcut' (đường tắt mầu nhiệm) chỉ ảo tưởng muốn thành công không tốn công sức."
    },
    {
        "start": 227.00, "end": 229.75,
        "text": "It's writing and getting up on stage.",
        "vi": "Tất cả chỉ là viết lách và bước lên sân khấu biểu diễn.",
        "properNouns": [],
        "keywords": ["writing", "stage"],
        "explanationAi": "Bản chất nghề nghiệp hài kịch: lao động viết kịch bản hàng ngày và sự dũng cảm bước lên sân khấu đối diện khán giả."
    },
    {
        "start": 229.76, "end": 233.83,
        "text": "It takes a lot of perseverance and it's such a competitive occupation.",
        "vi": "Nó đòi hỏi rất nhiều sự kiên trì bền bỉ và đó là một nghề nghiệp có tính cạnh tranh khốc liệt như vậy đấy.",
        "properNouns": [],
        "keywords": ["perseverance", "competitive", "occupation"],
        "explanationAi": "'Perseverance' (tính kiên nhẫn vượt khó) và 'competitive occupation' (nghề nghiệp cạnh tranh gay gắt đào thải cao)."
    },
    {
        "start": 233.84, "end": 237.43,
        "text": "You know, you've just got to outwork everybody.",
        "vi": "Bạn biết đấy, bạn buộc phải làm việc chăm chỉ vượt qua tất cả mọi người.",
        "properNouns": [],
        "keywords": ["outwork", "everybody"],
        "explanationAi": "Động từ 'outwork' mang nghĩa nỗ lực lao động nhiều hơn, chăm chỉ hơn tất cả những người khác."
    },
    # 52 - 59: Discussion on turning 40 & work ethic
    {
        "start": 237.44, "end": 241.00,
        "text": "Well, we heard Steve making his audience laugh there.",
        "vi": "Chà, chúng ta vừa nghe Steve chọc cười khán giả của ông ấy ở đoạn vừa rồi.",
        "properNouns": ["Steve"],
        "keywords": ["audience", "laugh"],
        "explanationAi": "Cấu trúc 'hear someone doing something' chỉ việc chứng kiến/nghe thấy hành động đang diễn ra."
    },
    {
        "start": 241.00, "end": 244.63,
        "text": "And by the way, Alice, you look fantastic for 40.",
        "vi": "Và nhân tiện thì, Alice, trông bạn vẫn vô cùng tuyệt vời so với tuổi 40 đấy nhé.",
        "properNouns": ["Alice"],
        "keywords": ["fantastic"],
        "explanationAi": "Neil áp dụng ngay câu đùa của Steve để trêu chọc tuổi tác của Alice, tạo tình huống hài hước giữa hai người bạn dẫn."
    },
    {
        "start": 244.64, "end": 248.23,
        "text": "That's not funny, Neil. I'm only 39 and you know it!",
        "vi": "Chẳng buồn cười chút nào đâu, Neil. Tôi mới chỉ 39 tuổi thôi và bạn thừa biết điều đó mà!",
        "properNouns": ["Neil"],
        "keywords": ["funny"],
        "explanationAi": "Alice lập tức đính chính tuổi thật của mình chưa tới 40, phản bác trò trêu đùa của Neil."
    },
    {
        "start": 248.24, "end": 254.55,
        "text": "Anyway, moving on, Steve says there's no magic potion or shortcut to success.",
        "vi": "Dù sao đi nữa, chuyển sang phần tiếp theo, Steve nói rằng không có thần dược hay con đường tắt nào dẫn tới thành công cả.",
        "properNouns": ["Steve"],
        "keywords": ["magic", "potion", "shortcut", "success"],
        "explanationAi": "Alice chuyển chủ đề ('moving on') và tổng kết lại bài học cốt lõi: thành công không có lối đi tắt."
    },
    {
        "start": 254.56, "end": 257.83,
        "text": "You have to work hard – it doesn't happen by itself.",
        "vi": "Bạn phải làm việc chăm chỉ – thành công không bao giờ tự nhiên ập đến.",
        "properNouns": [],
        "keywords": ["work", "hard", "happen"],
        "explanationAi": "'Happen by itself' chỉ việc cái gì đó tự nhiên xảy ra mà không cần nỗ lực hay sự tác động."
    },
    {
        "start": 257.84, "end": 263.00,
        "text": "And perseverance means to keep on trying to achieve something even when it's difficult.",
        "vi": "Và 'perseverance' có nghĩa là tiếp tục kiên trì cố gắng đạt được điều gì đó ngay cả khi gặp muôn vàn khó khăn.",
        "properNouns": [],
        "keywords": ["perseverance", "trying", "achieve", "difficult"],
        "explanationAi": "Định nghĩa từ vựng trọng tâm: 'perseverance' là tính nhẫn nại, kiên trì theo đuổi mục đích tới cùng bất chấp gian nan."
    },
    {
        "start": 263.00, "end": 269.11,
        "text": "He says you have to outwork everybody – which means to work harder than everybody else.",
        "vi": "Ông ấy nói bạn phải 'outwork everybody' – có nghĩa là làm việc nỗ lực và chăm chỉ hơn bất kỳ ai khác.",
        "properNouns": [],
        "keywords": ["outwork", "harder", "everybody"],
        "explanationAi": "Định nghĩa 'outwork everybody': nỗ lực lao động và cống hiến vượt trên toàn bộ các đối thủ cùng lĩnh vực."
    },
    {
        "start": 269.12, "end": 273.75,
        "text": "Steve certainly doesn't make comedy sound much fun, does he?",
        "vi": "Steve quả thực không làm cho nghề hài kịch nghe có vẻ vui vẻ cho lắm, phải không nào?",
        "properNouns": ["Steve"],
        "keywords": ["comedy", "fun"],
        "explanationAi": "Câu hỏi đuôi 'does he?' bày tỏ cảm nhận rằng phía sau ánh hào quang sân khấu là sự lao động gian nan, mệt nhọc."
    },
    # 60 - 63: Depression and comedy paradox (introverts vs extroverts)
    {
        "start": 273.76, "end": 281.59,
        "text": "No. In fact some people say there's a connection between depression and comedy – that comedians can be introverted and depressive.",
        "vi": "Đúng thế. Trên thực tế một số người nói rằng có mối liên hệ giữa bệnh trầm cảm và hài kịch – rằng các danh hài có thể rất hướng nội và dễ u uất.",
        "properNouns": [],
        "keywords": ["connection", "depression", "comedy", "introverted", "depressive"],
        "explanationAi": "Mối nghịch lý tâm lý học sâu sắc: nghệ sĩ làm người khác cười thường phải đối mặt với nỗi u sầu, hướng nội và chứng trầm cảm."
    },
    {
        "start": 281.60, "end": 283.00,
        "text": "Is that right?",
        "vi": "Có đúng thế không nhỉ?",
        "properNouns": [],
        "keywords": ["right"],
        "explanationAi": "Câu hỏi bày tỏ sự ngạc nhiên trước nghịch lý về thế giới nội tâm của các danh hài."
    },
    {
        "start": 283.00, "end": 289.11,
        "text": "Introverts are generally quiet people who are more interested in their own thoughts and feelings than in spending time with other people.",
        "vi": "Người hướng nội thường là những người trầm tính, những người quan tâm đến suy nghĩ và cảm xúc nội tâm của chính mình nhiều hơn là giao lưu cùng người khác.",
        "properNouns": [],
        "keywords": ["introverts", "quiet", "thoughts", "feelings", "spending"],
        "explanationAi": "Định nghĩa học thuật về 'introverts' (người hướng nội): những người thích sự yên tĩnh và suy tư nội tâm."
    },
    {
        "start": 289.12, "end": 294.79,
        "text": "Yes, you'd think that most comedians would be extroverts – people who are lively and enjoy the company of others.",
        "vi": "Đúng vậy, bạn hẳn sẽ nghĩ rằng hầu hết nghệ sĩ hài đều là người hướng ngoại – những người hoạt bát và yêu thích sự hiện diện bên cạnh những người khác.",
        "properNouns": [],
        "keywords": ["extroverts", "lively", "company"],
        "explanationAi": "Định nghĩa 'extroverts' (người hướng ngoại). 'Enjoy the company of others' nghĩa là thích tụ tập, vui vầy cùng bạn bè."
    },
    # 64 - 68: Quiz Answer
    {
        "start": 294.80, "end": 299.35,
        "text": "OK I think it's time for the answer to our quiz question, Neil.",
        "vi": "Được rồi, tôi nghĩ đã đến lúc công bố câu trả lời cho câu đố của chúng ta hôm nay, Neil à.",
        "properNouns": ["Neil"],
        "keywords": ["answer", "quiz", "question"],
        "explanationAi": "Alice thông báo chuyển sang phần giải đáp câu đố đầu giờ."
    },
    {
        "start": 299.36, "end": 313.11,
        "text": "I asked: Which Greek word means the study of laughter and its effects on the body? Is it a) risology, b) gelotology? or c) comology?",
        "vi": "Tôi đã hỏi: Từ gốc Hy Lạp nào có nghĩa là ngành nghiên cứu tiếng cười và các tác động của nó lên cơ thể? Đó là a) risology, b) gelotology, hay c) comology?",
        "properNouns": ["Greek"],
        "keywords": ["greek", "laughter", "effects", "body", "risology", "gelotology", "comology"],
        "explanationAi": "Alice nhắc lại câu hỏi và 3 phương án để người nghe kiểm tra lại trí nhớ và đáp án của mình."
    },
    {
        "start": 313.12, "end": 319.67,
        "text": "Yes. I said c) comology, which I think I'm beginning to regret now.",
        "vi": "Vâng. Tôi đã chọn c) comology, điều mà bây giờ tôi nghĩ mình đang bắt đầu thấy hối hận rồi đấy.",
        "properNouns": [],
        "keywords": ["comology", "regret"],
        "explanationAi": "Neil thừa nhận sự bất an về phán đoán sai lầm ban đầu của mình với động từ 'regret' (hối tiếc)."
    },
    {
        "start": 319.68, "end": 324.63,
        "text": "Yes, well, indeed. Sorry, I'm afraid that's the wrong answer.",
        "vi": "Vâng, quả đúng là như vậy rồi. Rất tiếc, tôi e rằng đó là một câu trả lời sai.",
        "properNouns": [],
        "keywords": ["indeed", "afraid", "wrong", "answer"],
        "explanationAi": "Alice lịch sự xác nhận Neil đã đoán sai bằng cụm từ 'I'm afraid that's the wrong answer'."
    },
    {
        "start": 324.64, "end": 331.83,
        "text": "It's actually b) gelotology – which comes from the Greek word, gelos, meaning laughter.",
        "vi": "Đáp án đúng thực ra là b) gelotology – bắt nguồn từ từ Hy Lạp 'gelos', có nghĩa là tiếng cười.",
        "properNouns": ["Greek", "gelos"],
        "keywords": ["gelotology", "greek", "laughter"],
        "explanationAi": "Nguồn gốc từ vựng học (etymology): Gelotology xuất phát từ tiếng Hy Lạp 'gelos' (tiếng cười), là ngành khoa học nghiên cứu tác động thể chất và tâm lý của nụ cười."
    },
    # 69 - 80: Vocabulary review
    {
        "start": 331.84, "end": 336.07,
        "text": "OK. You can stop sniggering now, Alice and just tell us today's words once again?",
        "vi": "Được rồi. Bạn có thể thôi cười khúc khích được rồi đấy Alice, và nhắc lại các từ vựng của ngày hôm nay một lần nữa đi chứ?",
        "properNouns": ["Alice"],
        "keywords": ["sniggering", "words"],
        "explanationAi": "Động từ 'sniggering' (cười khúc khích mỉa mai). Neil bảo Alice ngừng trêu chọc và chuyển sang phần ôn tập từ vựng."
    },
    {
        "start": 336.08, "end": 337.19,
        "text": "Alright then. Here they are:",
        "vi": "Được thôi. Các từ vựng đó đây:",
        "properNouns": [],
        "keywords": [],
        "explanationAi": "Lời dẫn tự nhiên bước vào phần tổng kết 10 từ vựng cốt lõi của bài học."
    },
    {
        "start": 337.20, "end": 341.59,
        "text": "get something, for example a joke",
        "vi": "'get something', ví dụ như hiểu được một câu chuyện đùa",
        "properNouns": [],
        "keywords": ["get", "example", "joke"],
        "explanationAi": "Thành ngữ khẩu ngữ: 'get something' nghĩa là hiểu được ý tứ hoặc câu chuyện đùa của người khác."
    },
    {
        "start": 341.60, "end": 343.75,
        "text": "gag",
        "vi": "'gag' – mẩu chuyện đùa, trò hề",
        "properNouns": [],
        "keywords": ["gag"],
        "explanationAi": "Danh từ ngắn gọn chỉ mẩu tiếu lâm, mảng miếng hài kịch ngắn."
    },
    {
        "start": 343.76, "end": 347.11,
        "text": "stand-up comedy",
        "vi": "'stand-up comedy' – hài độc thoại",
        "properNouns": [],
        "keywords": ["stand-up comedy"],
        "explanationAi": "Thể loại biểu diễn nghệ thuật kịch nói mà một nghệ sĩ đứng độc thoại trực tiếp với khán giả."
    },
    {
        "start": 347.12, "end": 349.99,
        "text": "narcissistic",
        "vi": "'narcissistic' – tự ái tự tôn, say mê bản thân thái quá",
        "properNouns": [],
        "keywords": ["narcissistic"],
        "explanationAi": "Tính từ chỉ người luôn quá bận tâm và ngưỡng mộ ngoại hình hoặc phẩm chất của chính mình."
    },
    {
        "start": 350.00, "end": 352.87,
        "text": "aspiring",
        "vi": "'aspiring' – đầy hoài bão, khát khao vươn lên",
        "properNouns": [],
        "keywords": ["aspiring"],
        "explanationAi": "Tính từ miêu tả người có ước mơ cháy bỏng và đang nỗ lực đạt được thành công trong sự nghiệp."
    },
    {
        "start": 352.88, "end": 355.59,
        "text": "unique",
        "vi": "'unique' – độc nhất vô nhị, khác biệt đặc trưng",
        "properNouns": [],
        "keywords": ["unique"],
        "explanationAi": "Tính từ chỉ nét độc đáo, duy nhất và khác biệt của một người hay một vật thể."
    },
    {
        "start": 355.60, "end": 358.63,
        "text": "perseverance",
        "vi": "'perseverance' – sự kiên trì, bền bỉ vượt khó",
        "properNouns": [],
        "keywords": ["perseverance"],
        "explanationAi": "Danh từ chỉ phẩm chất nhẫn nại, kiên định tới cùng trước mọi chướng ngại vật."
    },
    {
        "start": 358.64, "end": 360.71,
        "text": "outwork",
        "vi": "'outwork' – làm việc nỗ lực vượt trên người khác",
        "properNouns": [],
        "keywords": ["outwork"],
        "explanationAi": "Động từ chỉ hành động cống hiến thời gian và công sức nhiều hơn hẳn bất kỳ đối thủ nào."
    },
    {
        "start": 360.72, "end": 362.63,
        "text": "introverts",
        "vi": "'introverts' – những người hướng nội",
        "properNouns": [],
        "keywords": ["introverts"],
        "explanationAi": "Danh từ chỉ nhóm người trầm tĩnh, thích hướng vào thế giới nội tâm cá nhân."
    },
    {
        "start": 362.64, "end": 364.71,
        "text": "extroverts",
        "vi": "'extroverts' – những người hướng ngoại",
        "properNouns": [],
        "keywords": ["extroverts"],
        "explanationAi": "Danh từ chỉ nhóm người sôi nổi, hoạt bát, thích giao du và tương tác xã hội."
    },
    # 81 - 84: Outro
    {
        "start": 364.72, "end": 368.31,
        "text": "Well, that just about brings us to the end of today's 6 Minute English.",
        "vi": "Chà, điều đó xem như đã đưa chúng ta đến hồi kết của chương trình 6 Minute English hôm nay rồi.",
        "properNouns": ["6 Minute English"],
        "keywords": ["brings", "minute", "english"],
        "explanationAi": "Cụm câu kết chương trình: 'brings us to the end of today's programme'."
    },
    {
        "start": 368.32, "end": 370.00,
        "text": "See you next time.",
        "vi": "Hẹn gặp lại các bạn vào lần tới.",
        "properNouns": [],
        "keywords": ["see", "time"],
        "explanationAi": "Lời chào tạm biệt và hẹn gặp lại thính giả trong các số phát sóng tiếp theo."
    },
    {
        "start": 370.00, "end": 371.03,
        "text": "Bye.",
        "vi": "Tạm biệt.",
        "properNouns": [],
        "keywords": [],
        "explanationAi": "Lời chào tạm biệt ngắn gọn kết thúc buổi ghi hình của Alice và Neil."
    },
    {
        "start": 371.04, "end": 374.00,
        "text": "6 Minute English from the BBC.",
        "vi": "Chương trình 6 Minute English từ đài BBC.",
        "properNouns": ["6 Minute English", "BBC"],
        "keywords": ["minute", "english", "bbc"],
        "explanationAi": "Đoạn nhạc hiệu bản quyền thương hiệu đài phát thanh BBC London."
    }
]

print(f"Total raw segments: {len(raw_segments)}")

# Process each segment
processed_segments = []
for idx, seg in enumerate(raw_segments, start=1):
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

# Build Quiz data
quiz_questions = [
    {
        "id": "q_bbc_laughter_med_1",
        "question": "What punny joke does Neil tell Alice to open the programme?",
        "questionEn": "What punny joke does Neil tell Alice to open the programme?",
        "questionVi": "Neil đã kể câu chuyện đùa chơi chữ nào với Alice để mở đầu chương trình?",
        "options": [
            "What is the Mexican version of One Direction? Juan Direction!",
            "Why did the tomato blush? Because it saw the salad dressing!",
            "What's a rat's favourite game? Hide and squeak!",
            "Why do we never tell secrets on a farm? Because the potatoes have eyes!",
        ],
        "optionsEn": [
            "What is the Mexican version of One Direction? Juan Direction!",
            "Why did the tomato blush? Because it saw the salad dressing!",
            "What's a rat's favourite game? Hide and squeak!",
            "Why do we never tell secrets on a farm? Because the potatoes have eyes!",
        ],
        "optionsVi": [
            "Phiên bản Mexico của ban nhạc One Direction là gì? Juan Direction!",
            "Tại sao quả cà chua lại đỏ mặt? Vì nó thấy nước sốt xà lách!",
            "Trò chơi yêu thích của chuột là gì? Trốn và kêu chít chít!",
            "Tại sao đừng bao giờ nói bí mật ở nông trại? Vì củ khoai tây có mắt!",
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 6 and 8, Neil asks: 'What is the Mexican version of One Direction? Juan Direction! Get it?' — playing on the Spanish name 'Juan' sounding like the English word 'One'.",
        "explanationEn": "In Segments 6 and 8, Neil asks: 'What is the Mexican version of One Direction? Juan Direction! Get it?' — playing on the Spanish name 'Juan' sounding like the English word 'One'.",
        "explanationVi": "Trong câu 6 và 8, Neil đố: 'Phiên bản Mexico của ban nhạc One Direction là gì? Juan Direction! Hiểu chưa hả?' — chơi chữ dựa trên tên riêng tiếng Tây Ban Nha 'Juan' phát âm gần giống từ 'One'.",
        "referenceSegmentIndex": 8,
        "targetedConcept": "Chơi chữ mở đầu (Pun: Juan Direction Joke)",
        "targetedConceptEn": "Pun: Juan Direction Joke",
        "targetedConceptVi": "Chơi chữ mở đầu"
    },
    {
        "id": "q_bbc_laughter_med_2",
        "question": "According to Neil, what physical and mental health benefits does laughter provide to our bodies?",
        "questionEn": "According to Neil, what physical and mental health benefits does laughter provide to our bodies?",
        "questionVi": "Theo lời Neil, tiếng cười mang lại những lợi ích thể chất và tinh thần nào cho cơ thể chúng ta?",
        "options": [
            "It is good for health, reduces stress, and releases feel-good hormones in the body",
            "It permanently cures chronic clinical insomnia without any medical therapy",
            "It doubles human lung capacity and triples metabolic speed instantly",
            "It completely replaces the biological necessity for daily physical exercise",
        ],
        "optionsEn": [
            "It is good for health, reduces stress, and releases feel-good hormones in the body",
            "It permanently cures chronic clinical insomnia without any medical therapy",
            "It doubles human lung capacity and triples metabolic speed instantly",
            "It completely replaces the biological necessity for daily physical exercise",
        ],
        "optionsVi": [
            "Nụ cười tốt cho sức khỏe, làm giảm căng thẳng và giải phóng các hormone tạo cảm giác hưng phấn trong cơ thể",
            "Nó chữa khỏi hoàn toàn chứng mất ngủ kinh niên mà không cần bất kỳ liệu pháp y tế nào",
            "Nó làm tăng gấp đôi dung tích phổi và tăng gấp ba tốc độ trao đổi chất ngay lập tức",
            "Nó thay thế hoàn toàn sự cần thiết sinh học của việc tập thể dục hàng ngày",
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 18, Neil explains: 'It's good for our health, it reduces stress and releases feel-good hormones in the body.'",
        "explanationEn": "In Segment 18, Neil explains: 'It's good for our health, it reduces stress and releases feel-good hormones in the body.'",
        "explanationVi": "Trong câu 18, Neil giải thích: 'Nụ cười rất tốt cho sức khỏe, nó làm giảm căng thẳng và giải phóng các hormone tạo cảm giác hưng phấn trong cơ thể.'",
        "referenceSegmentIndex": 18,
        "targetedConcept": "Lợi ích sinh lý học của nụ cười (Physiological Benefits of Laughter)",
        "targetedConceptEn": "Physiological Benefits of Laughter",
        "targetedConceptVi": "Lợi ích sinh lý học của nụ cười"
    },
    {
        "id": "q_bbc_laughter_med_3",
        "question": "Which Greek-derived word specifically denotes the scientific study of laughter and its effects on the body?",
        "questionEn": "Which Greek-derived word specifically denotes the scientific study of laughter and its effects on the body?",
        "questionVi": "Từ gốc Hy Lạp nào biểu thị cụ thể ngành nghiên cứu khoa học về tiếng cười và các tác động của nó lên cơ thể?",
        "options": [
            "Gelotology (derived from the Greek word 'gelos' meaning laughter)",
            "Risology (from the Latin root risor)",
            "Comology (derived from the modern theatrical concept of comedy)",
            "Giggleology (informal colloquial slang)",
        ],
        "optionsEn": [
            "Gelotology (derived from the Greek word 'gelos' meaning laughter)",
            "Risology (from the Latin root risor)",
            "Comology (derived from the modern theatrical concept of comedy)",
            "Giggleology (informal colloquial slang)",
        ],
        "optionsVi": [
            "Gelotology (bắt nguồn từ từ tiếng Hy Lạp 'gelos' có nghĩa là tiếng cười)",
            "Risology (từ gốc Latin risor)",
            "Comology (bắt nguồn từ khái niệm sân khấu kịch nghệ hiện đại comedy)",
            "Giggleology (từ lóng thân mật không chính thức)",
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 68, Alice reveals: 'It's actually b) gelotology – which comes from the Greek word, gelos, meaning laughter.'",
        "explanationEn": "In Segment 68, Alice reveals: 'It's actually b) gelotology – which comes from the Greek word, gelos, meaning laughter.'",
        "explanationVi": "Trong câu 68, Alice tiết lộ: 'Đáp án đúng thực ra là b) gelotology – bắt nguồn từ từ Hy Lạp gelos, có nghĩa là tiếng cười.'",
        "referenceSegmentIndex": 68,
        "targetedConcept": "Thuật ngữ khoa học Gelotology (Scientific Study of Laughter)",
        "targetedConceptEn": "Scientific Study of Laughter",
        "targetedConceptVi": "Thuật ngữ khoa học Gelotology"
    },
    {
        "id": "q_bbc_laughter_med_4",
        "question": "What have researchers discovered about the social nature and primary evolutionary purpose of laughter?",
        "questionEn": "What have researchers discovered about the social nature and primary evolutionary purpose of laughter?",
        "questionVi": "Các nhà nghiên cứu đã phát hiện ra điều gì về bản chất xã hội và mục đích tiến hóa chính của nụ cười?",
        "options": [
            "We rarely laugh alone because laughter helps humans bond with each other as a cohesive group",
            "Humans laugh primarily to intimidate predators and defend their physical territory",
            "Laughter is entirely an individual autonomic reflex with zero social implications",
            "People laugh more frequently in solitary isolation than in social gatherings",
        ],
        "optionsEn": [
            "We rarely laugh alone because laughter helps humans bond with each other as a cohesive group",
            "Humans laugh primarily to intimidate predators and defend their physical territory",
            "Laughter is entirely an individual autonomic reflex with zero social implications",
            "People laugh more frequently in solitary isolation than in social gatherings",
        ],
        "optionsVi": [
            "Chúng ta rất hiếm khi cười một mình bởi vì tiếng cười giúp con người gắn kết với nhau như một tập thể bền chặt",
            "Con người cười chủ yếu để đe dọa thú săn mồi và bảo vệ lãnh thổ vật lý của họ",
            "Tiếng cười hoàn toàn là một phản xạ tự động của cá nhân mà không mang ý nghĩa xã hội nào",
            "Con người cười thường xuyên hơn khi ở một mình cô độc so với khi tụ họp xã hội",
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 28-29, Alice explains: '...the purpose of laughter is related to the way we bond with each other. And the more we laugh, the more we bond as a group.'",
        "explanationEn": "In Segments 28-29, Alice explains: '...the purpose of laughter is related to the way we bond with each other. And the more we laugh, the more we bond as a group.'",
        "explanationVi": "Trong câu 28-29, Alice giải thích: '...mục đích của tiếng cười có liên quan đến cách chúng ta gắn kết với nhau. Và chúng ta càng cười nhiều, chúng ta càng gắn bó khăng khít hơn như một tập thể.'",
        "referenceSegmentIndex": 28,
        "targetedConcept": "Chức năng gắn kết xã hội (Social Bonding Function of Laughter)",
        "targetedConceptEn": "Social Bonding Function of Laughter",
        "targetedConceptVi": "Chức năng gắn kết xã hội"
    },
    {
        "id": "q_bbc_laughter_med_5",
        "question": "According to comedian Steve Byrne, what essential advice should an aspiring comedian follow?",
        "questionEn": "According to comedian Steve Byrne, what essential advice should an aspiring comedian follow?",
        "questionVi": "Theo danh hài Steve Byrne, một diễn viên hài đầy hoài bão cần tuân theo lời khuyên thiết yếu nào?",
        "options": [
            "Write relentlessly and selfishly focus on what makes themselves laugh to find their unique voice",
            "Imitate famous senior comedians word-for-word until gaining audience popularity",
            "Rely exclusively on spontaneous stage improvisation without writing any scripts beforehand",
            "Hire ghostwriters to craft punchlines tailored strictly to commercial market trends",
        ],
        "optionsEn": [
            "Write relentlessly and selfishly focus on what makes themselves laugh to find their unique voice",
            "Imitate famous senior comedians word-for-word until gaining audience popularity",
            "Rely exclusively on spontaneous stage improvisation without writing any scripts beforehand",
            "Hire ghostwriters to craft punchlines tailored strictly to commercial market trends",
        ],
        "optionsVi": [
            "Viết kịch bản miệt mài và vị kỷ tập trung vào những điều khiến chính bản thân bật cười để tìm ra tiếng nói độc bản",
            "Bắt chước từng câu từng chữ các danh hài tiền bối nổi tiếng cho đến khi được khán giả yêu mến",
            "Chỉ dựa hoàn toàn vào sự ngẫu hứng tức thì trên sân khấu mà không cần viết kịch bản trước",
            "Thuê người viết thuê để sáng tác các câu chốt hài hước theo sát xu hướng thương mại",
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 34-36, Steve Byrne advises: 'The one single thing an aspiring comedian should do is to write, write, write and talk about the things that make them laugh... Because that will get you closer to finding your voice.'",
        "explanationEn": "In Segments 34-36, Steve Byrne advises: 'The one single thing an aspiring comedian should do is to write, write, write and talk about the things that make them laugh... Because that will get you closer to finding your voice.'",
        "explanationVi": "Trong câu 34-36, Steve Byrne khuyên: 'Điều duy nhất mà một diễn viên hài đầy hoài bão nên làm là viết, viết, viết không ngừng và nói về những điều khiến chính bản thân họ bật cười... Bởi vì điều đó sẽ đưa bạn đến gần hơn với việc tìm ra tiếng nói riêng của mình.'",
        "referenceSegmentIndex": 34,
        "targetedConcept": "Lời khuyên sáng tác của Steve Byrne (Comedic Voice & Writing Practice)",
        "targetedConceptEn": "Comedic Voice & Writing Practice",
        "targetedConceptVi": "Lời khuyên sáng tác của Steve Byrne"
    },
    {
        "id": "q_bbc_laughter_med_6",
        "question": "What observational comedy joke does Steve Byrne tell regarding turning 40 years old?",
        "questionEn": "What observational comedy joke does Steve Byrne tell regarding turning 40 years old?",
        "questionVi": "Steve Byrne đã kể câu chuyện hài quan sát nào liên quan đến cột mốc bước sang tuổi 40?",
        "options": [
            "People start praising you with 'You look good for 40', which you never hear at young ages like 19",
            "Doctors prescribe magical youth potions the moment a person reaches 40 years of age",
            "Stand-up comedians are automatically forced into permanent retirement at age 40",
            "People at 40 universally lose the neurological capacity to experience genuine amusement",
        ],
        "optionsEn": [
            "People start praising you with 'You look good for 40', which you never hear at young ages like 19",
            "Doctors prescribe magical youth potions the moment a person reaches 40 years of age",
            "Stand-up comedians are automatically forced into permanent retirement at age 40",
            "People at 40 universally lose the neurological capacity to experience genuine amusement",
        ],
        "optionsVi": [
            "Mọi người bắt đầu khen 'Trông anh được đấy so với tuổi 40', điều bạn chẳng bao giờ nghe ở tuổi trẻ như 19",
            "Bác sĩ kê đơn thuốc tiên trẻ mãi không già ngay khoảnh khắc một người chạm mốc 40 tuổi",
            "Các nghệ sĩ hài độc thoại tự động bị buộc phải giải nghệ vĩnh viễn ở tuổi 40",
            "Mọi người ở tuổi 40 đều mất đi khả năng thần kinh để cảm nhận sự hài hước chân thực",
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 46-47, Steve observes: ''You look good for 40. You look good for 52...' You never hear that when you're young. You never hear: 'You look good for 19.''",
        "explanationEn": "In Segments 46-47, Steve observes: ''You look good for 40. You look good for 52...' You never hear that when you're young. You never hear: 'You look good for 19.''",
        "explanationVi": "Trong câu 46-47, Steve quan sát: ''Trông anh phong độ so với tuổi 40 đấy...'. Bạn không bao giờ nghe thấy điều đó khi còn trẻ. Bạn chẳng bao giờ nghe ai bảo: 'Trông cậu được đấy so với tuổi 19''.",
        "referenceSegmentIndex": 46,
        "targetedConcept": "Quan sát hài hước về tuổi 40 (Turning 40 Observational Comedy)",
        "targetedConceptEn": "Turning 40 Observational Comedy",
        "targetedConceptVi": "Quan sát hài hước về tuổi 40"
    },
    {
        "id": "q_bbc_laughter_med_7",
        "question": "What psychological paradox do Alice and Neil discuss regarding comedians' personalities?",
        "questionEn": "What psychological paradox do Alice and Neil discuss regarding comedians' personalities?",
        "questionVi": "Nghịch lý tâm lý học nào được Alice và Neil thảo luận liên quan đến tính cách của các nghệ sĩ hài?",
        "options": [
            "While expected to be extroverts, many comedians are actually quiet introverts who struggle with depression",
            "All comedians have identical cheerful temperaments on and off stage without exception",
            "Comedians never experience any negative emotions because laughter permanently immunizes them",
            "Introverted people are completely incapable of performing stand-up comedy professionally",
        ],
        "optionsEn": [
            "While expected to be extroverts, many comedians are actually quiet introverts who struggle with depression",
            "All comedians have identical cheerful temperaments on and off stage without exception",
            "Comedians never experience any negative emotions because laughter permanently immunizes them",
            "Introverted people are completely incapable of performing stand-up comedy professionally",
        ],
        "optionsVi": [
            "Dù được kỳ vọng là người hướng ngoại, nhiều nghệ sĩ hài thực ra lại là người hướng nội trầm lặng và phải vật lộn với trầm cảm",
            "Mọi nghệ sĩ hài đều có tính khí vui vẻ giống hệt nhau cả trên sân khấu lẫn ngoài đời mà không có ngoại lệ",
            "Các nghệ sĩ hài không bao giờ trải qua cảm xúc tiêu cực vì tiếng cười mang lại miễn dịch vĩnh viễn cho họ",
            "Những người hướng nội hoàn toàn không có khả năng biểu diễn hài độc thoại chuyên nghiệp",
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 60-63, Alice and Neil discuss how some people connect comedy with depression, noting that while people expect comedians to be extroverts, many are introverted.",
        "explanationEn": "In Segments 60-63, Alice and Neil discuss how some people connect comedy with depression, noting that while people expect comedians to be extroverts, many are introverted.",
        "explanationVi": "Trong câu 60-63, Alice và Neil thảo luận về mối liên hệ giữa hài kịch và trầm cảm, chỉ ra rằng dù công chúng nghĩ nghệ sĩ hài hướng ngoại, nhiều người thực chất lại hướng nội và trầm uất.",
        "referenceSegmentIndex": 60,
        "targetedConcept": "Nghịch lý hài kịch và trầm cảm (Comedy and Depression Paradox)",
        "targetedConceptEn": "Comedy and Depression Paradox",
        "targetedConceptVi": "Nghịch lý hài kịch và trầm cảm"
    },
    {
        "id": "q_bbc_laughter_med_8",
        "question": "What does the targeted vocabulary word 'outwork' mean according to Steve Byrne and Neil?",
        "questionEn": "What does the targeted vocabulary word 'outwork' mean according to Steve Byrne and Neil?",
        "questionVi": "Từ vựng trọng tâm 'outwork' có nghĩa là gì theo lời Steve Byrne và Neil?",
        "options": [
            "To work harder and put in more effort than everybody else in a competitive occupation",
            "To delegate all your tedious tasks to other workers in an office environment",
            "To retire early after achieving a single viral comedic success on television",
            "To refuse to collaborate with colleagues on any creative project whatsoever",
        ],
        "optionsEn": [
            "To work harder and put in more effort than everybody else in a competitive occupation",
            "To delegate all your tedious tasks to other workers in an office environment",
            "To retire early after achieving a single viral comedic success on television",
            "To refuse to collaborate with colleagues on any creative project whatsoever",
        ],
        "optionsVi": [
            "Làm việc chăm chỉ, nỗ lực và cống hiến nhiều hơn bất kỳ ai khác trong một nghề nghiệp đầy tính cạnh tranh",
            "Ủy thác toàn bộ công việc tẻ nhạt của bạn cho những nhân viên khác trong văn phòng",
            "Nghỉ hưu sớm sau khi đạt được một thành công hài kịch lan truyền duy nhất trên truyền hình",
            "Từ chối hợp tác với đồng nghiệp trong bất kỳ dự án sáng tạo nào",
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 58, Neil defines the phrase: 'He says you have to outwork everybody – which means to work harder than everybody else.'",
        "explanationEn": "In Segment 58, Neil defines the phrase: 'He says you have to outwork everybody – which means to work harder than everybody else.'",
        "explanationVi": "Trong câu 58, Neil định nghĩa cụm từ: 'Ông ấy nói bạn phải outwork everybody – có nghĩa là làm việc nỗ lực và chăm chỉ hơn bất kỳ ai khác.'",
        "referenceSegmentIndex": 58,
        "targetedConcept": "Từ vựng trọng tâm Outwork (Target Vocabulary: Outwork)",
        "targetedConceptEn": "Target Vocabulary: Outwork",
        "targetedConceptVi": "Từ vựng trọng tâm Outwork"
    }
]

# Generate TypeScript file content
ts_code = '''import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for BBC Learning English: What Makes Us Laugh? (Is Laughter the Best Medicine?)
 * Category: cat_bbc_6min (BBC 6 Minute English)
 * 8 CEFR-aligned contextual questions covering comedy psychology, social bonding, gelotology, and perseverance
 */
export const QUIZ_BBC_LAUGHTER_MEDICINE: VideoQuizData = {
  lessonId: "vid_bbc_laughter_medicine",
  lessonTitle: "BBC Learning English: What Makes Us Laugh? - 6 Minute English",
  totalQuestions: 8,
  xpReward: 40,
  questions: ''' + json.dumps(quiz_questions, ensure_ascii=False, indent=4) + ''',
  generatedBy: "CONTEXTUAL_FALLBACK",
};

/**
 * Master Video Lesson: BBC Learning English - What Makes Us Laugh?
 * Slug: bbc-learning-english-is-laughter-the-best-medicine
 * YouTube ID: jIt35Ey2GN4
 * Duration: 376s (06:16)
 * Zero Merged Utterances Standard: 84 Pure Master Segments
 * Accent: British English (en-GB)
 */
export const LESSON_BBC_LAUGHTER_MEDICINE: MockVideoLesson = {
  id: "vid_bbc_laughter_medicine",
  slug: "bbc-learning-english-is-laughter-the-best-medicine",
  title: "BBC Learning English: What Makes Us Laugh?",
  description:
    "Chương trình 6 Minute English từ đài BBC với hai người dẫn Alice và Neil cùng diễn viên hài người Mỹ Steve Byrne khám phá khoa học về tiếng cười, hài độc thoại (stand-up comedy), sự bền chí (perseverance), nỗ lực vượt bậc (outwork) và nghịch lý tính cách của người làm hài kịch.",
  sourceType: "YOUTUBE",
  externalId: "jIt35Ey2GN4",
  thumbnailUrl: "https://img.youtube.com/vi/jIt35Ey2GN4/hqdefault.jpg",
  durationSeconds: 376,
  durationFormatted: "06:16",
  cefrLevel: "B1",
  supportedTypes: "BOTH",
  categoryId: "cat_bbc_6min",
  categorySlug: "bbc-6-minute",
  categoryName: "BBC 6 Minute English",
  accent: "en-GB",
  wpmSpeed: 145,
  viewCount: 465000,
  studyCount: 42100,
  quiz: QUIZ_BBC_LAUGHTER_MEDICINE,
  segments: ''' + json.dumps(processed_segments, ensure_ascii=False, indent=4) + '''
};
'''

# Write to file
target_path = 'features/listening/data/lessons/lesson_bbc_laughter_medicine.ts'
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(ts_code)

print(f"Successfully wrote {len(processed_segments)} segments to {target_path}")

# Also save JSON reference for auditing tests
audit_data = {
    "externalId": "jIt35Ey2GN4",
    "title": "BBC Learning English: What Makes Us Laugh?",
    "durationSeconds": 376,
    "segmentCount": len(processed_segments),
    "segments": processed_segments
}
with open('scripts/bbc_what_makes_us_laugh_official.json', 'w', encoding='utf-8') as f:
    json.dump(audit_data, f, ensure_ascii=False, indent=2)

print("Saved audit reference to scripts/bbc_what_makes_us_laugh_official.json")
