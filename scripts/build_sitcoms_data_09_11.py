import json
import os
from build_lessons_engine import generate_ts_lesson

target_dir = "features/listening/data/lessons/movies/sitcoms"

# ============================================================================
# 3. mov_sit_09: The Big Bang Theory - Sheldon Cooper
# ============================================================================
cfg_09 = {
    "id": "mov_sit_09",
    "slug": "the-big-bang-theory-sheldon-roommate-agreement",
    "var_lesson": "LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT",
    "var_quiz": "QUIZ_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT",
    "file": "lesson_the_big_bang_theory_sheldon_roommate_agreement.ts",
    "externalId": "WjM9M-AdNho",
    "title": "The Big Bang Theory: 12 Times Sheldon Showed His True Genius & Eccentricity",
    "durationSeconds": 1328,
    "durationFormatted": "22:08",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 148,
    "viewCount": 6059786,
    "studyCount": 5120,
    "description": "Những phân đoạn đối đáp khoa học đỉnh cao và lập luận quái đản nhất của Tiến sĩ Sheldon Cooper (Jim Parsons): từ các điều khoản Hợp đồng Bạn cùng phòng (Roommate Agreement), chỗ ngồi bất khả xâm phạm trên sofa, đến thuyết dây và giải Nobel.",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segments_09 = [
    {
        "orderIndex": 0,
        "startTime": 2.0,
        "endTime": 9.5,
        "text": "If we win, I'll be the fourth woman ever to win a Nobel in physics. — Wow, that is a huge deal!",
        "translationVi": "Nếu chúng mình chiến thắng, em sẽ là người phụ nữ thứ tư trong lịch sử giành giải Nobel vật lý. — Chà, đó thực sự là một cột mốc trọng đại!",
        "ipaUs": "/ɪf wiː wɪn, aɪl biː ðə fɔːrθ ˈwʊmən ˈɛvər tuː wɪn ə noʊˈbɛl ɪn ˈfɪzɪks. — waʊ, ðæt ɪz ə hjuːdʒ diːl!/",
        "keywords": ["fourth woman ever", "Nobel in physics", "huge deal"],
        "explanationAi": "Hiện tượng ngữ pháp: thứ tự số thứ tự ('fourth woman ever') và cụm từ đàm thoại 'huge deal' (sự kiện trọng đại).",
        "properNouns": ["Nobel"]
    },
    {
        "orderIndex": 1,
        "startTime": 25.0,
        "endTime": 36.5,
        "text": "In the winter, that seat is close enough to the radiator to remain warm, and yet not so close as to cause perspiration.",
        "translationVi": "Vào mùa đông, chỗ ngồi đó đủ gần lò sưởi để giữ ấm, nhưng lại không quá gần đến mức gây toát mồ hôi.",
        "ipaUs": "/ɪn ðə ˈwɪntər, ðæt siːt ɪz kloʊs ɪˈnʌf tuː ðə ˈreɪdiˌeɪtər tuː rɪˈmeɪn wɔːrm, ænd jɛt nɑːt soʊ kloʊs æz tuː kɔːz ˌpɜːrspəˈreɪʃən./",
        "keywords": ["close enough", "radiator", "remain warm", "perspiration"],
        "explanationAi": "Lý giải khoa học trứ danh của Sheldon về 'chỗ ngồi của tôi' (my spot): sử dụng từ vựng y khoa chính xác 'perspiration' thay vì 'sweat'.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 78.4,
        "endTime": 89.2,
        "text": "According to Section 8, Subsection C of the Roommate Agreement, pets of any kind are banned, unless they are service animals.",
        "translationVi": "Theo Mục 8, Tiểu mục C của Hợp đồng Bạn cùng phòng, thú cưng dưới mọi hình thức đều bị cấm, trừ phi chúng là động vật hỗ trợ.",
        "ipaUs": "/əˈkɔːrdɪŋ tuː ˈsɛkʃən eɪt, ˈsʌbˌsɛkʃən siː əv ðə ˈruːmˌmeɪt əˈɡriːmənt, pɛts əv ˈɛni kaɪnd ɑːr bænd, ənˈlɛs ðeɪ ɑːr ˈsɜːrvɪs ˈænɪməlz./",
        "keywords": ["Roommate Agreement", "pets are banned", "service animals"],
        "explanationAi": "Thuật ngữ pháp lý công dân: 'Section/Subsection' (điều/khoản) và 'service animals' (động vật nghiệp vụ / trợ giúp người khuyết tật).",
        "properNouns": ["Roommate Agreement"]
    },
    {
        "orderIndex": 3,
        "startTime": 145.0,
        "endTime": 156.0,
        "text": "Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors...",
        "translationVi": "Kéo cắt bao, bao bọc búa, búa đập thằn lằn, thằn lằn đầu độc Spock, Spock đập nát kéo...",
        "ipaUs": "/ˈsɪzərz kʌts ˈpeɪpər, ˈpeɪpər ˈkʌvərz rɑːk, rɑːk ˈkrʌʃɪz ˈlɪzərd, ˈlɪzərd ˈpɔɪzənz spɑːk, spɑːk ˈsmæʃɪz ˈsɪzərz.../",
        "keywords": ["rock paper scissors lizard Spock", "crushes", "poisons", "smashes"],
        "explanationAi": "Quy tắc mở rộng trò chơi oẳn tù tì Rock-Paper-Scissors-Lizard-Spock kinh điển của giới khoa học máy tính và văn hóa geek.",
        "properNouns": ["Spock"]
    },
    {
        "orderIndex": 4,
        "startTime": 230.0,
        "endTime": 242.0,
        "text": "I'm not crazy. My mother had me tested. Bazinga! You have fallen victim to another one of my classic pranks.",
        "translationVi": "Tôi không hề bị điên nhé. Mẹ tôi đã đưa tôi đi xét nghiệm đàng hoàng rồi. Bazinga! Cậu đã sập bẫy một trò chơi khăm kinh điển nữa của tôi rồi.",
        "ipaUs": "/aɪm nɑːt ˈkreɪzi. maɪ ˈmʌðər hæd miː ˈtɛstɪd. bəˈzɪŋɡə! juː hæv ˈfɔːlən ˈvɪktɪm tuː əˈnʌðər wʌn əv maɪ ˈklæsɪk præŋks./",
        "keywords": ["had me tested", "Bazinga", "fallen victim to", "classic pranks"],
        "explanationAi": "Cấu trúc nhờ vả / bị động sai khiến 'have someone tested' và câu cảm thán thương hiệu 'Bazinga!' của Sheldon.",
        "properNouns": ["Bazinga"]
    },
    {
        "orderIndex": 5,
        "startTime": 360.0,
        "endTime": 372.0,
        "text": "Geology is not a real science. It's just a bunch of dirt and rocks! Physics is the origin of all universal principles.",
        "translationVi": "Địa chất học chẳng phải là một môn khoa học thực thụ. Nó chỉ là một đống đất cát và sỏi đá mà thôi! Vật lý học mới chính là cội nguồn của mọi nguyên lý vũ trụ.",
        "ipaUs": "/dʒiˈɑːlədʒi ɪz nɑːt ə rɪəl ˈsaɪəns. ɪts dʒʌst ə bʌntʃ əv dɜːrt ænd rɑːks! ˈfɪzɪks ɪz ðɪ ˈɔːrɪdʒɪn əv ɔːl ˌjuːnɪˈvɜːrsəl ˈprɪnsəplz./",
        "keywords": ["geology", "dirt and rocks", "physics", "universal principles"],
        "explanationAi": "Định kiến học thuật hài hước của Sheldon nâng tầm vật lý lý thuyết lên đỉnh cao phân cấp khoa học tự nhiên.",
        "properNouns": []
    }
]

quiz_09 = [
    {
        "id": "mov_sit_09_q1",
        "question": "Why is Sheldon's spot on the couch so scientifically ideal during winter?",
        "questionVi": "Tại sao chỗ ngồi của Sheldon trên ghế sofa lại lý tưởng về mặt khoa học vào mùa đông?",
        "options": [
            "Because it has a built-in electric heating blanket.",
            "It is close enough to the radiator to remain warm, but not so close as to cause perspiration.",
            "It is directly in front of the front door to greet delivery drivers.",
            "It allows him to watch television without wearing prescription glasses."
        ],
        "optionsVi": [
            "Vì nó có gắn sẵn chăn sưởi điện.",
            "Nó đủ gần lò sưởi để giữ ấm, nhưng không quá gần đến mức gây toát mồ hôi.",
            "Nó nằm ngay trước cửa ra vào để chào người giao hàng.",
            "Nó cho phép anh xem tivi mà không cần đeo kính có độ."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 1, Sheldon explains his exact thermodynamic reasoning for his spot.",
        "explanationVi": "Trong Phân đoạn 1, Sheldon giải thích chính xác lý lẽ nhiệt động học về chỗ ngồi bất khả xâm phạm của mình.",
        "targetedConcept": "Sheldon's iconic thermodynamic spot explanation",
        "targetedConceptVi": "Lý giải nhiệt động học kinh điển về chỗ ngồi của Sheldon",
        "referenceSegmentIndex": 1
    },
    {
        "id": "mov_sit_09_q2",
        "question": "What is Sheldon Cooper's signature exclamation after pulling a prank?",
        "questionVi": "Câu cảm thán thương hiệu của Sheldon Cooper sau khi chơi khăm ai đó là gì?",
        "options": ["'Eureka!'", "'Bazinga!'", "'Checkmate!'", "'Surprise!'"],
        "optionsVi": ["'Eureka!'", "'Bazinga!'", "'Checkmate!'", "'Surprise!'"],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Sheldon shouts his world-famous catchphrase: 'Bazinga!'",
        "explanationVi": "Trong Phân đoạn 4, Sheldon thốt lên câu cửa miệng nổi tiếng toàn cầu: 'Bazinga!'",
        "targetedConcept": "Pop-culture catchphrase recognition",
        "targetedConceptVi": "Nhận biết câu khẩu hiệu văn hóa đại chúng",
        "referenceSegmentIndex": 4
    }
]

# ============================================================================
# 4. mov_sit_11: Ted Lasso - Darts Scene & Best Moments
# ============================================================================
cfg_11 = {
    "id": "mov_sit_11",
    "slug": "ted-lasso-be-curious-not-judgmental-darts",
    "var_lesson": "LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS",
    "var_quiz": "QUIZ_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS",
    "file": "lesson_ted_lasso_be_curious_not_judgmental_darts.ts",
    "externalId": "t1bveUz8RD0",
    "title": "Ted Lasso: The Iconic Darts Scene & Top Inspirational Comedy Moments",
    "durationSeconds": 1047,
    "durationFormatted": "17:27",
    "cefrLevel": "B2",
    "accent": "American & British",
    "wpmSpeed": 138,
    "viewCount": 1855225,
    "studyCount": 4650,
    "description": "Tuyển tập những khoảnh khắc điện ảnh truyền hình đoạt giải Emmy đỉnh cao của Ted Lasso (Jason Sudeikis): từ màn ném phi tiêu đánh bại Rupert với triết lý 'Be curious, not judgmental', đến nghệ thuật lãnh đạo vị tha và thấu cảm.",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segments_11 = [
    {
        "orderIndex": 0,
        "startTime": 37.5,
        "endTime": 50.0,
        "text": "I have something I need to tell you. I lied to you. I hired you because I wanted this team to lose. I wanted you to fail.",
        "translationVi": "Tôi có điều này cần phải nói với anh. Tôi đã lừa dối anh. Tôi thuê anh về vì tôi muốn đội bóng này thua cuộc. Tôi muốn anh phải thất bại thảm hại.",
        "ipaUs": "/aɪ hæv ˈsʌmθɪŋ aɪ niːd tuː tɛl juː. aɪ laɪd tuː juː. aɪ ˈhaɪərd juː bɪˈkɔːz aɪ ˈwɑːntɪd ðɪs tiːm tuː luːz. aɪ ˈwɑːntɪd juː tuː feɪl./",
        "keywords": ["lied to you", "hired you", "wanted you to fail"],
        "explanationAi": "Lời thú tội chấn động của Rebecca Welton khi trút bỏ gánh nặng thù hận đối với người chồng cũ.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 50.9,
        "endTime": 62.0,
        "text": "I sabotaged you every chance I had. It was me who hired that photographer. I'm sorry.",
        "translationVi": "Tôi đã phá hoại anh trong mọi cơ hội mà tôi có được. Chính tôi là người đã thuê tay thợ săn ảnh đó. Tôi thực sự xin lỗi anh.",
        "ipaUs": "/aɪ ˈsæbəˌtɑːʒd juː ˈɛvri tʃæns aɪ hæd. ɪt wʌz miː huː ˈhaɪərd ðæt fəˈtɑːɡrəfər. aɪm ˈsɑːri./",
        "keywords": ["sabotaged", "every chance", "hired that photographer"],
        "explanationAi": "Động từ 'sabotage' (ngấm ngầm phá hoại) và cấu trúc nhấn mạnh 'It was me who...'.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 62.5,
        "endTime": 74.0,
        "text": "Divorce is hard. It makes folks do things they never thought they'd do. I forgive you.",
        "translationVi": "Ly hôn là một chuyện khó khăn. Nó khiến con người ta làm những điều mà họ chưa từng nghĩ mình sẽ làm. Tôi tha thứ cho cô.",
        "ipaUs": "/dɪˈvɔːrs ɪz hɑːrd. ɪt meɪks foʊks duː θɪŋz ðeɪ ˈnɛvər θɔːt ðeɪd duː. aɪ fərˈɡɪv juː./",
        "keywords": ["divorce is hard", "makes folks do things", "I forgive you"],
        "explanationAi": "Đỉnh cao lòng vị tha của Ted Lasso: chấp nhận nỗi đau của người khác và tha thứ ngay lập tức không chút oán hờn.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 235.0,
        "endTime": 248.0,
        "text": "Guys have underestimated me my entire life. And for years, I never understood why. It used to really bother me.",
        "translationVi": "Cả đời tôi luôn bị cánh đàn ông đánh giá thấp. Và suốt bao năm trời, tôi chẳng thể hiểu nổi lý do tại sao. Điều đó từng khiến tôi rất phiền lòng.",
        "ipaUs": "/ɡaɪz hæv ˌʌndərˈɛstəˌmeɪtɪd miː maɪ ɪnˈtaɪər laɪf. ænd fɔːr jɪərz, aɪ ˈnɛvər ˌʌndərˈstʊd waɪ. ɪt juːst tuː ˈrɪəli ˈbɑːðər miː./",
        "keywords": ["underestimated", "entire life", "used to bother me"],
        "explanationAi": "Khởi đầu màn ném phi tiêu kinh điển tại quán rượu trước ánh mắt ngạo mạn của Rupert: động từ 'underestimate' (đánh giá thấp).",
        "properNouns": ["Rupert"]
    },
    {
        "orderIndex": 4,
        "startTime": 249.0,
        "endTime": 262.0,
        "text": "Then one day, I was driving my boy to school and I saw a quote by Walt Whitman painted on the wall: 'Be curious, not judgmental.'",
        "translationVi": "Rồi một ngày nọ, khi tôi đang lái xe đưa con trai đến trường, tôi thấy một câu danh ngôn của Walt Whitman được sơn trên tường: 'Hãy tò mò học hỏi, đừng vội phán xét.'",
        "ipaUs": "/ðɛn wʌn deɪ, aɪ wʌz ˈdraɪvɪŋ maɪ bɔɪ tuː skuːl ænd aɪ sɔː ə kwoʊt baɪ wɔːlt ˈwɪtmən ˈpeɪntɪd ɑːn ðə wɔːl: biː ˈkjʊriəs, nɑːt ˌdʒʌdʒˈmɛntl./",
        "keywords": ["quote", "Walt Whitman", "Be curious, not judgmental"],
        "explanationAi": "Triết lý sống làm lay động hàng triệu khán giả toàn cầu: cặp tính từ tương phản 'curious' (ham hiểu biết, tò mò) và 'judgmental' (hay quy chụp, phán xét).",
        "properNouns": ["Walt Whitman"]
    },
    {
        "orderIndex": 5,
        "startTime": 263.0,
        "endTime": 277.0,
        "text": "If they were curious, they would have asked questions like: 'Have you played a lot of darts, Ted?' To which I would have said: 'Yes, every Sunday with my dad.' Barbecue sauce.",
        "translationVi": "Nếu họ chịu tò mò tìm hiểu, họ đã hỏi những câu như: 'Anh có chơi phi tiêu nhiều không hả Ted?' Mà nếu thế thì tôi đã trả lời: 'Có chứ, mỗi Chủ nhật tôi đều chơi với bố.' Nước sốt thịt nướng.",
        "ipaUs": "/ɪf ðeɪ wɜːr ˈkjʊriəs, ðeɪ wʊd hæv æskt ˈkwɛstʃənz laɪk: hæv juː pleɪd ə lɑːt əv dɑːrts, tɛd? tuː wɪtʃ aɪ wʊd hæv sɛd: jɛs, ˈɛvri ˈsʌndeɪ wɪð maɪ dæd. ˈbɑːrbɪˌkjuː sɔːs./",
        "keywords": ["if they were curious", "played a lot of darts", "Barbecue sauce"],
        "explanationAi": "Cấu trúc câu điều kiện loại 3 hỗn hợp (Mixed Conditional) kết hợp câu chốt hạ chiến thắng 'Barbecue sauce' khi ném trúng hồng tâm Bullseye.",
        "properNouns": []
    }
]

quiz_11 = [
    {
        "id": "mov_sit_11_q1",
        "question": "What famous quote by Walt Whitman does Ted recite during the legendary darts game?",
        "questionVi": "Câu danh ngôn nổi tiếng nào của Walt Whitman được Ted đọc trong ván phi tiêu kinh điển?",
        "options": [
            "'Winning isn't everything, it's the only thing.'",
            "'Be curious, not judgmental.'",
            "'Keep your friends close, and enemies closer.'",
            "'Practice makes permanent, not perfect.'"
        ],
        "optionsVi": [
            "'Chiến thắng không phải là tất cả, nó là điều duy nhất.'",
            "'Hãy tò mò học hỏi, đừng vội phán xét.'",
            "'Hãy giữ bạn bè ở gần, và giữ kẻ thù ở gần hơn.'",
            "'Luyện tập tạo nên sự thuần thục, không phải hoàn hảo.'"
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Ted shares the quote: 'Be curious, not judgmental.'",
        "explanationVi": "Trong Phân đoạn 4, Ted chia sẻ câu châm ngôn cốt lõi: 'Be curious, not judgmental.'",
        "targetedConcept": "Core thematic philosophy of Ted Lasso",
        "targetedConceptVi": "Triết lý sống trọng tâm của Ted Lasso",
        "referenceSegmentIndex": 4
    },
    {
        "id": "mov_sit_11_q2",
        "question": "How does Ted respond when Rebecca confesses that she sabotaged his team?",
        "questionVi": "Ted phản ứng như thế nào khi Rebecca thú nhận rằng cô đã ngấm ngầm phá hoại đội bóng của anh?",
        "options": [
            "He yells at her and demands a huge financial compensation.",
            "He understands that divorce is painful and says: 'I forgive you.'",
            "He calls the press to expose her sabotage publicly.",
            "He walks out and refuses to coach AFC Richmond again."
        ],
        "optionsVi": [
            "Anh quát mắng cô và đòi bồi thường tài chính khổng lồ.",
            "Anh thấu hiểu nỗi đau ly hôn và nói: 'Tôi tha thứ cho cô.'",
            "Anh gọi báo chí đến để phơi bày sự việc trước công chúng.",
            "Anh bỏ đi và từ chối dẫn dắt AFC Richmond."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 2, Ted shows unconditional empathy: 'Divorce is hard... I forgive you.'",
        "explanationVi": "Trong Phân đoạn 2, Ted bộc lộ sự thấu cảm bao dung: 'Ly hôn là một chuyện khó khăn... Tôi tha thứ cho cô.'",
        "targetedConcept": "Radical empathy and character compassion",
        "targetedConceptVi": "Sự thấu cảm sâu sắc và lòng nhân ái của nhân vật",
        "referenceSegmentIndex": 2
    }
]

with open(os.path.join(target_dir, cfg_09["file"]), "w", encoding="utf-8") as f:
    f.write(generate_ts_lesson(cfg_09, segments_09, quiz_09))
print(f"Generated {cfg_09['file']}")

with open(os.path.join(target_dir, cfg_11["file"]), "w", encoding="utf-8") as f:
    f.write(generate_ts_lesson(cfg_11, segments_11, quiz_11))
print(f"Generated {cfg_11['file']}")
