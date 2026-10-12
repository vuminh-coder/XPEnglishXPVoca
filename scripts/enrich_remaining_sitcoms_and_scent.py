import json
import os
from build_lessons_engine import generate_ts_lesson

sitcoms_dir = "features/listening/data/lessons/movies/sitcoms"
insp_dir = "features/listening/data/lessons/movies/inspirational"

# ============================================================================
# 1. mov_sit_01: Friends - Apartment Bet Trivia
# ============================================================================
cfg_sit_01 = {
    "id": "mov_sit_01",
    "slug": "friends-the-iconic-apartment-bet-trivia",
    "var_lesson": "LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA",
    "var_quiz": "QUIZ_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA",
    "file": "lesson_friends_the_iconic_apartment_bet_trivia.ts",
    "target_dir": sitcoms_dir,
    "externalId": "v1xXlxDHWPU",
    "title": "Friends: The Iconic Apartment Bet Trivia Game",
    "durationSeconds": 620,
    "durationFormatted": "10:20",
    "cefrLevel": "B1",
    "accent": "American",
    "wpmSpeed": 142,
    "viewCount": 25400000,
    "studyCount": 8120,
    "description": "Tập phim huyền thoại của Friends: Ross làm trọng tài cuộc thi đố vui cá cược căn hộ giữa đội nữ (Monica & Rachel) và đội nam (Chandler & Joey) với câu hỏi bất hủ về nghề nghiệp của Chandler.",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segs_sit_01 = [
    {
        "orderIndex": 0,
        "startTime": 40.0,
        "endTime": 55.0,
        "text": "Welcome to the game of the century. The category is: Fears and Pet Peeves. According to Chandler, what phenomenon scares the bejeezus out of him?",
        "translationVi": "Chào mừng đến với trò chơi của thế kỷ. Chủ đề là: Nỗi sợ hãi và Điều khó chịu. Theo Chandler, hiện tượng nào làm anh ấy sợ chết khiếp nhất?",
        "ipaUs": "/ˈwɛlkəm tuː ðə ɡeɪm əv ðə ˈsɛntʃəri. ðə ˈkætəˌɡɔːri ɪz: fɪrz ænd pɛt piːvz. əˈkɔːrdɪŋ tuː ˈtʃændlər, wʌt fəˈnɑːməˌnɑːn skɛrz ðə bɪˈdʒiːzəs aʊt əv hɪm?/",
        "keywords": ["Pet Peeves", "phenomenon", "scares the bejeezus out of"],
        "explanationAi": "Thành ngữ 'pet peeves' (điều làm ta bực mình) và khẩu ngữ 'scares the bejeezus out of' (làm sợ chết khiếp).",
        "properNouns": ["Chandler"]
    },
    {
        "orderIndex": 1,
        "startTime": 56.0,
        "endTime": 68.0,
        "text": "Michael Flatley, Lord of the Dance! — That is correct! His legs flail about as if independent from his body!",
        "translationVi": "Michael Flatley, Chúa tể Điệu nhảy! — Hoàn toàn chính xác! Đôi chân của ông ấy vung vẩy như thể tách rời khỏi cơ thể!",
        "ipaUs": "/ˈmaɪkəl ˈflætli, lɔːrd əv ðə dæns! — ðæt ɪz kəˈrɛkt! hɪz lɛɡz fleɪl əˈbaʊt æz ɪf ˌɪndɪˈpɛndənt frʌm hɪz ˈbɑːdi!/",
        "keywords": ["Lord of the Dance", "flail about", "independent from"],
        "explanationAi": "Động từ 'flail about' (quơ quào, vung vẩy loạn xạ). Lối miêu tả cường điệu hài hước đậm chất Friends.",
        "properNouns": ["Michael Flatley"]
    },
    {
        "orderIndex": 2,
        "startTime": 120.0,
        "endTime": 138.5,
        "text": "Rachel Green: what is her favorite movie of all time? — Dangerous Liaisons! — Her actual favorite movie is Weekend at Bernie's!",
        "translationVi": "Rachel Green: bộ phim yêu thích nhất mọi thời đại của cô ấy là gì? — Dangerous Liaisons! — Bộ phim yêu thích thực sự của cô ấy là Weekend at Bernie's!",
        "ipaUs": "/ˈreɪtʃəl ɡriːn: wʌt ɪz hɜːr ˈfeɪvərɪt ˈmuːvi əv ɔːl taɪm? — ˈdeɪndʒərəs liˈeɪzɑːnz! — hɜːr ˈæktʃuəl ˈfeɪvərɪt ˈmuːvi ɪz ˈwiːkˌɛnd æt ˈbɜːrniz!/",
        "keywords": ["favorite movie of all time", "actual favorite movie"],
        "explanationAi": "Sự đối lập giữa câu trả lời tỏ ra trí thức ('Dangerous Liaisons') và sở thích hài hước thực sự ('Weekend at Bernie's').",
        "properNouns": ["Rachel Green"]
    },
    {
        "orderIndex": 3,
        "startTime": 210.0,
        "endTime": 228.0,
        "text": "What is Chandler Bing's job? — Ten seconds. You need this point! — It has something to do with numbers! Oh, he's a transponster! — That's not even a word!",
        "translationVi": "Nghề nghiệp của Chandler Bing là gì? — Còn mười giây. Đội nữ phải trả lời được câu này! — Nó liên quan gì đó đến những con số! Ôi, anh ấy là một transponster! — Đó thậm chí còn không phải là một từ có nghĩa!",
        "ipaUs": "/wʌt ɪz ˈtʃændlər bɪŋz dʒɑːb? — tɛn ˈsɛkəndz. juː niːd ðɪs pɔɪnt! — ɪt hæz ˈsʌmθɪŋ tuː duː wɪð ˈnʌmbərz! oʊ, hiːz ə trænsˈpɑːnstər! — ðæts nɑːt ˈiːvən ə wɜːrd!/",
        "keywords": ["Chandler Bing's job", "transponster", "not even a word"],
        "explanationAi": "Từ bịa huyền thoại 'transponster' do Rachel hoảng loạn nghĩ ra khiến hai cô gái thua sạch cả căn hộ.",
        "properNouns": ["Chandler Bing"]
    }
]

qs_sit_01 = [
    {
        "id": "q_mov_sit_01_1",
        "question": "What fabricated job title does Rachel scream when trying to guess Chandler Bing's profession?",
        "questionVi": "Rachel đã hét lên chức danh nghề nghiệp bịa đặt nào khi cố đoán nghề của Chandler Bing?",
        "options": [
            "A transponster",
            "A computational actuary",
            "A statistical data processor",
            "An advertising executive"
        ],
        "optionsVi": [
            "Một transponster (từ bịa đặt)",
            "Một chuyên viên tính toán bảo hiểm",
            "Một người xử lý dữ liệu thống kê",
            "Một giám đốc quảng cáo"
        ],
        "correctAnswer": 0,
        "explanation": "Rachel famously panics and shouts 'He's a transponster!', prompting Monica to scream 'That's not even a word!'",
        "explanationVi": "Rachel hoảng loạn hét lên 'Anh ấy là transponster!', khiến Monica thét lên 'Đó thậm chí còn chẳng phải một từ!'",
        "referenceSegmentIndex": 3,
        "targetedConcept": "Iconic Sitcom Trivia",
        "targetedConceptVi": "Chi tiết đố vui kinh điển trong Sitcom"
    }
]

# ============================================================================
# 2. mov_sit_02: Friends - Best of Chandler Bing Sarcasm
# ============================================================================
cfg_sit_02 = {
    "id": "mov_sit_02",
    "slug": "friends-best-of-chandler-bing-sarcasm",
    "var_lesson": "LESSON_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM",
    "var_quiz": "QUIZ_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM",
    "file": "lesson_friends_best_of_chandler_bing_sarcasm.ts",
    "target_dir": sitcoms_dir,
    "externalId": "xT5zt93BbAg",
    "title": "Friends: The Very Best of Chandler Bing's Sarcasm & Wit",
    "durationSeconds": 840,
    "durationFormatted": "14:00",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 146,
    "viewCount": 12100000,
    "studyCount": 7890,
    "description": "Tuyển tập những câu mỉa mai, chơi chữ châm biếm và phản xạ ngôn ngữ thông minh nhất của Chandler Bing (Matthew Perry), bậc thầy châm biếm của truyền hình Mỹ.",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segs_sit_02 = [
    {
        "orderIndex": 0,
        "startTime": 20.0,
        "endTime": 32.5,
        "text": "Hi, I'm Chandler. I make jokes when I'm uncomfortable.",
        "translationVi": "Xin chào, tôi là Chandler. Tôi thường pha trò cười mỗi khi cảm thấy ngượng ngùng bối rối.",
        "ipaUs": "/haɪ, aɪm ˈtʃændlər. aɪ meɪk dʒoʊks wɛn aɪm ʌnˈkʌmfərtəbl̩./",
        "keywords": ["make jokes", "uncomfortable"],
        "explanationAi": "Câu thoại tự định nghĩa bản thân kinh điển của Chandler về cơ chế phòng vệ tâm lý bằng sự hài hước.",
        "properNouns": ["Chandler"]
    },
    {
        "orderIndex": 1,
        "startTime": 45.0,
        "endTime": 58.5,
        "text": "I'm not great at the advice. Can I interest you in a sarcastic comment? Some cheese?",
        "translationVi": "Tôi không giỏi việc cho lời khuyên lắm đâu. Tôi có thể mời cậu một lời bình phẩm mỉa mai được không? Hay là chút phô mai nhé?",
        "ipaUs": "/aɪm nɑːt ɡreɪt æt ðɪ ədˈvaɪs. kæn aɪ ˈɪntrəst juː ɪn ə sɑːrˈkæstɪk ˈkɑːmɛnt? sʌm tʃiːz?/",
        "keywords": ["not great at advice", "interest you in", "sarcastic comment"],
        "explanationAi": "Cấu trúc mời mọc châm biếm: 'Can I interest you in...?' (thường dùng trong nhà hàng/bán hàng) được gắn với 'sarcastic comment'.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 120.0,
        "endTime": 136.0,
        "text": "Could I BE wearing any more clothes? Maybe if I wasn't going commando!",
        "translationVi": "Liệu tôi CÓ THỂ mặc thêm nhiều quần áo hơn thế này được nữa không? May ra chỉ khi tôi không thả rông bên trong!",
        "ipaUs": "/kʊd aɪ biː ˈwɛrɪŋ ˈɛni mɔːr kloʊðz? ˈmeɪbi ɪf aɪ ˈwɑːzənt ˈɡoʊɪŋ kəˈmændoʊ!/",
        "keywords": ["Could I BE", "going commando"],
        "explanationAi": "Cụm lóng 'go commando' (không mặc đồ lót) và ngữ điệu nhấn giọng đặc trưng 'Could I BE...'.",
        "properNouns": []
    }
]

qs_sit_02 = [
    {
        "id": "q_mov_sit_02_1",
        "question": "What psychological reason does Chandler give for his non-stop sarcastic jokes?",
        "questionVi": "Chandler đưa ra lý do tâm lý nào cho thói quen liên tục pha trò mỉa mai của mình?",
        "options": [
            "He makes jokes whenever he feels uncomfortable or anxious",
            "He wants to pursue a career as a stand-up comedian",
            "He was paid by his office colleagues to entertain them",
            "He is practicing English idioms for foreign clients"
        ],
        "optionsVi": [
            "Anh ấy pha trò cười mỗi khi cảm thấy ngượng ngùng bối rối",
            "Anh ấy muốn trở thành diễn viên hài độc thoại",
            "Anh ấy được đồng nghiệp trả tiền để chọc cười",
            "Anh ấy đang luyện thành ngữ tiếng Anh"
        ],
        "correctAnswer": 0,
        "explanation": "Chandler introduces himself honestly: 'Hi, I'm Chandler. I make jokes when I'm uncomfortable.'",
        "explanationVi": "Chandler tự giới thiệu: 'Chào, tôi là Chandler. Tôi pha trò mỗi khi thấy ngượng ngùng.'",
        "referenceSegmentIndex": 0,
        "targetedConcept": "Character Trait Analysis",
        "targetedConceptVi": "Phân tích đặc điểm nhân vật"
    }
]

# ============================================================================
# 3. mov_sit_03: Modern Family - Phil Dunphy
# ============================================================================
cfg_sit_03 = {
    "id": "mov_sit_03",
    "slug": "modern-family-best-of-phil-dunphy-dad",
    "var_lesson": "LESSON_MODERN_FAMILY_BEST_OF_PHIL_DUNPHY_DAD",
    "var_quiz": "QUIZ_MODERN_FAMILY_BEST_OF_PHIL_DUNPHY_DAD",
    "file": "lesson_modern_family_best_of_phil_dunphy_dad.ts",
    "target_dir": sitcoms_dir,
    "externalId": "qMNsPjt7L4M",
    "title": "Modern Family: The Best Of Phil Dunphy's Phil's-osophy",
    "durationSeconds": 880,
    "durationFormatted": "14:40",
    "cefrLevel": "B1",
    "accent": "American",
    "wpmSpeed": 140,
    "viewCount": 8600000,
    "studyCount": 6720,
    "description": "Những châm ngôn hài hước và phong cách 'ông bố ngầu' (cool dad) vô đối của Phil Dunphy (Ty Burrell) trong cuốn cẩm nang cuộc đời Phil's-osophy.",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segs_sit_03 = [
    {
        "orderIndex": 0,
        "startTime": 15.0,
        "endTime": 32.0,
        "text": "I'm a cool dad, that's my thing. I'm hip, I surf the web, I text: LOL — laugh out loud, OMG — oh my god, WTF — why the face.",
        "translationVi": "Tôi là một ông bố ngầu, đó là phong cách của tôi. Tôi rất thức thời, lướt mạng, nhắn tin viết tắt: LOL — cười thả ga, OMG — lạy chúa tôi, WTF — sao lại xị mặt ra thế.",
        "ipaUs": "/aɪm ə kuːl dæd, ðæts maɪ θɪŋ. aɪm hɪp, aɪ sɜːrf ðə wɛb, aɪ tɛkst: ɛl oʊ ɛl — læf aʊt laʊd, oʊ ɛm dʒiː — oʊ maɪ ɡɑːd, ˈdʌbəl.juː tiː ɛf — waɪ ðə feɪs./",
        "keywords": ["cool dad", "surf the web", "why the face"],
        "explanationAi": "Cú hiểu nhầm tiếng lóng mạng hài hước: Phil diễn giải 'WTF' thành 'Why the face' (sao lại xị mặt ra thế).",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 50.0,
        "endTime": 66.0,
        "text": "The most amazing things that can happen to a human being will happen to you if you just lower your expectations.",
        "translationVi": "Những điều tuyệt vời nhất có thể xảy đến với một con người sẽ xảy đến với bạn, nếu bạn chỉ cần hạ bớt kỳ vọng của mình xuống.",
        "ipaUs": "/ðə moʊst əˈmeɪzɪŋ θɪŋz ðæt kæn ˈhæpən tuː ə ˈhjuːmən ˈbiːɪŋ wɪl ˈhæpən tuː juː ɪf juː dʒʌst ˈloʊər jɔːr ˌɛkspɛkˈteɪʃənz./",
        "keywords": ["most amazing things", "lower expectations"],
        "explanationAi": "Triết lý 'Phil's-osophy': sự đảo ngược nghịch lý giữa kỳ vọng và hạnh phúc.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 90.0,
        "endTime": 108.0,
        "text": "If you love something, set it free. Unless it's a tiger.",
        "translationVi": "Nếu bạn yêu thương điều gì, hãy để nó tự do. Trừ phi đó là một con hổ.",
        "ipaUs": "/ɪf juː lʌv ˈsʌmθɪŋ, sɛt ɪt friː. ənˈlɛs ɪts ə ˈtaɪɡər./",
        "keywords": ["set it free", "unless it's a tiger"],
        "explanationAi": "Biến tấu hài hước của danh ngôn cổ điển 'If you love someone, set them free'.",
        "properNouns": []
    }
]

qs_sit_03 = [
    {
        "id": "q_mov_sit_03_1",
        "question": "What comical definition does Phil Dunphy give for the texting acronym 'WTF'?",
        "questionVi": "Phil Dunphy đưa ra định nghĩa hài hước nào cho từ viết tắt nhắn tin 'WTF'?",
        "options": [
            "Why the face",
            "Where's the food",
            "Watch the film",
            "What the fact"
        ],
        "optionsVi": [
            "Why the face (sao lại xị mặt ra)",
            "Where's the food (thức ăn ở đâu)",
            "Watch the film (xem phim đi)",
            "What the fact (sự thật là gì)"
        ],
        "correctAnswer": 0,
        "explanation": "Phil innocently misinterprets WTF as 'Why the face', showcasing his endearing dad persona.",
        "explanationVi": "Phil ngây ngô hiểu nhầm WTF thành 'Why the face', tạo nên nét duyên dáng của ông bố.",
        "referenceSegmentIndex": 0,
        "targetedConcept": "Humorous Acronym Interpretation",
        "targetedConceptVi": "Diễn giải từ viết tắt hài hước"
    }
]

# ============================================================================
# 4. mov_sit_04: Modern Family - Gloria Language Struggles
# ============================================================================
cfg_sit_04 = {
    "id": "mov_sit_04",
    "slug": "modern-family-gloria-funniest-language-struggles",
    "var_lesson": "LESSON_MODERN_FAMILY_GLORIA_FUNNIEST_LANGUAGE_STRUGGLES",
    "var_quiz": "QUIZ_MODERN_FAMILY_GLORIA_FUNNIEST_LANGUAGE_STRUGGLES",
    "file": "lesson_modern_family_gloria_funniest_language_struggles.ts",
    "target_dir": sitcoms_dir,
    "externalId": "72okAeSn5Tc",
    "title": "Modern Family: Gloria’s Funniest Language Struggles & Accent Mix-ups",
    "durationSeconds": 675,
    "durationFormatted": "11:15",
    "cefrLevel": "B1",
    "accent": "Latina American",
    "wpmSpeed": 144,
    "viewCount": 9200000,
    "studyCount": 6890,
    "description": "Những màn nhầm lẫn ngôn ngữ và phát âm tiếng Anh siêu đáng yêu của Gloria Delgado-Pritchett (Sofía Vergara): 'Cả nhà có biết tôi thông minh cỡ nào trong tiếng Tây Ban Nha không?!'",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segs_sit_04 = [
    {
        "orderIndex": 0,
        "startTime": 20.0,
        "endTime": 36.5,
        "text": "Do you have any idea how smart I am in Spanish? I know I make mistakes in English, but in Spanish, my thoughts are sophisticated!",
        "translationVi": "Cả nhà có hình dung nổi tôi thông minh cỡ nào khi nói tiếng Tây Ban Nha không? Tôi biết tôi hay sai tiếng Anh, nhưng trong tiếng Tây Ban Nha, tư duy của tôi cực kỳ uyên bác!",
        "ipaUs": "/duː juː hæv ˈɛni aɪˈdiːə haʊ smɑːrt aɪ æm ɪn ˈspænɪʃ? aɪ noʊ aɪ meɪk mɪˈsteɪks ɪn ˈɪŋɡlɪʃ, bʌt ɪn ˈspænɪʃ, maɪ θɔːts ɑːr səˈfɪstɪˌkeɪtɪd!/",
        "keywords": ["how smart I am", "make mistakes", "sophisticated"],
        "explanationAi": "Cảm xúc chân thật của người học ngoại ngữ thứ hai: Sự chênh lệch giữa trí tuệ tiếng mẹ đẻ và rào cản ngôn ngữ mới.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 48.0,
        "endTime": 64.0,
        "text": "It's a doggy-dog world out there! — Gloria, you mean dog-eat-dog world. — That makes no sense! Why would a dog eat another dog?",
        "translationVi": "Ngoài kia là một thế giới chó cưng đấy! — Gloria, ý em là thế giới chó ăn thịt chó (cạnh tranh khốc liệt). — Nói thế vô lý đùng đùng! Tại sao một con chó lại đi ăn thịt một con chó khác chứ?",
        "ipaUs": "/ɪts ə ˈdɔːɡi dɔːɡ wɜːrld aʊt ðɛr! — ˈɡlɔːriə, juː miːn dɔːɡ iːt dɔːɡ wɜːrld. — ðæt meɪks noʊ sɛns! waɪ wʊd ə dɔːɡ iːt əˈnʌðər dɔːɡ?/",
        "keywords": ["doggy-dog world", "dog-eat-dog world", "makes no sense"],
        "explanationAi": "Hiện tượng 'eggcorn' / nghe nhầm thành ngữ: 'dog-eat-dog' (thế giới cạnh tranh tàn khốc) bị nghe nhầm thành 'doggy-dog'.",
        "properNouns": ["Gloria"]
    },
    {
        "orderIndex": 2,
        "startTime": 80.0,
        "endTime": 96.0,
        "text": "Don't you talk to me about baby cheeses! — Baby Jesus, Gloria, baby Jesus! Not cheeses!",
        "translationVi": "Đừng có nói với tôi về mấy miếng phô mai bé tí đó! — Chúa Hài Đồng (Baby Jesus), Gloria ơi, là Chúa Hài Đồng! Không phải miếng phô mai (cheeses)!",
        "ipaUs": "/doʊnt juː tɔːk tuː miː əˈbaʊt ˈbeɪbi ˈtʃiːzɪz! — ˈbeɪbi ˈdʒiːzəs, ˈɡlɔːriə, ˈbeɪbi ˈdʒiːzəs! nɑːt ˈtʃiːzɪz!/",
        "keywords": ["baby cheeses", "Baby Jesus"],
        "explanationAi": "Nhầm lẫn cặp âm tối giản /dʒ/ và /tʃ/: 'Jesus' vs 'cheeses' tạo nên tình huống hài hước kinh điển.",
        "properNouns": ["Jesus"]
    }
]

qs_sit_04 = [
    {
        "id": "q_mov_sit_04_1",
        "question": "What common English idiom about cutthroat competition does Gloria hilariously mispronounce as 'doggy-dog world'?",
        "questionVi": "Thành ngữ tiếng Anh nào về sự cạnh tranh khốc liệt bị Gloria phát âm nhầm thành 'doggy-dog world'?",
        "options": [
            "Dog-eat-dog world",
            "Cat-and-mouse game",
            "Barking up the wrong tree",
            "Every dog has its day"
        ],
        "optionsVi": [
            "Dog-eat-dog world (thế giới cạnh tranh khốc liệt)",
            "Cat-and-mouse game (trò mèo vờn chuột)",
            "Barking up the wrong tree (tìm nhầm chỗ)",
            "Every dog has its day (ai rồi cũng có thời)"
        ],
        "correctAnswer": 0,
        "explanation": "Gloria mishears 'dog-eat-dog world' as 'doggy-dog world', arguing that dogs wouldn't eat each other.",
        "explanationVi": "Gloria nghe nhầm 'dog-eat-dog' thành 'doggy-dog' và cãi rằng loài chó không ăn thịt nhau.",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Idiom Pronunciation Error",
        "targetedConceptVi": "Lỗi phát âm và thành ngữ"
    }
]

# ============================================================================
# 5. mov_sit_05: The Office - Jim Pranks on Dwight
# ============================================================================
cfg_sit_05 = {
    "id": "mov_sit_05",
    "slug": "the-office-jim-pranks-on-dwight-15min",
    "var_lesson": "LESSON_THE_OFFICE_JIM_PRANKS_ON_DWIGHT_15MIN",
    "var_quiz": "QUIZ_THE_OFFICE_JIM_PRANKS_ON_DWIGHT_15MIN",
    "file": "lesson_the_office_jim_pranks_on_dwight_15min.ts",
    "target_dir": sitcoms_dir,
    "externalId": "Xnk4seEHmgw",
    "title": "The Office (US): Jim Halpert's Best Pranks on Dwight Schrute",
    "durationSeconds": 920,
    "durationFormatted": "15:20",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 145,
    "viewCount": 31500000,
    "studyCount": 9420,
    "description": "Những trò chơi khăm văn phòng huyền thoại của Jim Halpert (John Krasinski) đối với Dwight Schrute (Rainn Wilson): từ ghim bấm trong thạch Jell-O đến màn hóa thân 'Bears. Beets. Battlestar Galactica.'",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segs_sit_05 = [
    {
        "orderIndex": 0,
        "startTime": 20.0,
        "endTime": 36.0,
        "text": "Question: What kind of bear is best? — That's a ridiculous question. — False. Black bear. — Well, that's debatable. There are basically two schools of thought...",
        "translationVi": "Câu hỏi: Loài gấu nào là tuyệt nhất? — Đó là một câu hỏi ngớ ngẩn. — Sai rồi. Gấu đen. — Chà, điều đó còn phải bàn cãi. Về cơ bản có hai trường phái tư tưởng...",
        "ipaUs": "/ˈkwɛstʃən: wʌt kaɪnd əv bɛr ɪz bɛst? — ðæts ə rɪˈdɪkjələs ˈkwɛstʃən. — fɔːls. blæk bɛr. — wɛl, ðæts dɪˈbeɪtəbl̩. ðɛr ɑːr ˈbeɪsɪkli tuː skuːlz əv θɔːt.../",
        "keywords": ["ridiculous question", "false", "debatable", "schools of thought"],
        "explanationAi": "Cụm học thuật đàm thoại 'schools of thought' (các trường phái tư tưởng). Jim bắt chước phong cách trịnh trọng của Dwight.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 38.0,
        "endTime": 55.0,
        "text": "Fact: Bears eat beets. Bears. Beets. Battlestar Galactica. — What is going on? What are you doing?!",
        "translationVi": "Sự thật: Gấu ăn củ dền. Gấu. Củ dền. Phim Chiến hạm Galactica. — Chuyện gì đang xảy ra thế này? Cậu đang làm cái trò gì đấy?!",
        "ipaUs": "/fækt: bɛrz iːt biːts. bɛrz. biːts. ˈbætl̩ˌstɑːr ɡəˈlæktɪkə. — wʌt ɪz ˈɡoʊɪŋ ɑːn? wʌt ɑːr juː ˈduːɪŋ?!/",
        "keywords": ["Fact", "Bears eat beets", "Battlestar Galactica"],
        "explanationAi": "Bộ ba từ mở đầu chữ 'B' bất hủ định hình thương hiệu The Office.",
        "properNouns": ["Battlestar Galactica"]
    },
    {
        "orderIndex": 2,
        "startTime": 58.0,
        "endTime": 75.0,
        "text": "Identity theft is not a joke, Jim! Millions of families suffer every year! — Michael! — Oh, that's funny. Michael!",
        "translationVi": "Đánh cắp danh tính không phải trò đùa đâu nhé Jim! Hàng triệu gia đình phải chịu khổ mỗi năm vì nó đấy! — Sếp Michael ơi! — Ồ, buồn cười ghê. Sếp Michael ơi!",
        "ipaUs": "/aɪˈdɛntəti θɛft ɪz nɑːt ə dʒoʊk, dʒɪm! ˈmɪljənz əv ˈfæməliz ˈsʌfər ˈɛvri jɪr! — ˈmaɪkəl! — oʊ, ðæts ˈfʌni. ˈmaɪkəl!/",
        "keywords": ["Identity theft", "not a joke", "suffer every year"],
        "explanationAi": "Cụm pháp lý hình sự 'identity theft' (tội trộm cắp danh tính) được Dwight dùng với sự nghiêm trọng quá đà hài hước.",
        "properNouns": ["Jim", "Michael"]
    }
]

qs_sit_05 = [
    {
        "id": "q_mov_sit_05_1",
        "question": "What is the iconic three-part phrase Jim says while impersonating Dwight Schrute?",
        "questionVi": "Cụm ba từ kinh điển nào Jim đã nói khi đóng giả làm Dwight Schrute?",
        "options": [
            "Bears. Beets. Battlestar Galactica.",
            "Paper. Printers. Pennsylvania.",
            "Sales. Subordinates. Scanton.",
            "Karate. Coffee. Klosterman."
        ],
        "optionsVi": [
            "Bears. Beets. Battlestar Galactica.",
            "Paper. Printers. Pennsylvania.",
            "Sales. Subordinates. Scanton.",
            "Karate. Coffee. Klosterman."
        ],
        "correctAnswer": 0,
        "explanation": "Jim summarizes Dwight's entire personality with the iconic alliteration: 'Bears. Beets. Battlestar Galactica.'",
        "explanationVi": "Jim tóm tắt tính cách Dwight bằng cụm từ kinh điển: 'Bears. Beets. Battlestar Galactica.'",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Office Pop Culture Reference",
        "targetedConceptVi": "Văn hóa đại chúng trong The Office"
    }
]

# ============================================================================
# 6. mov_sit_06: The Office - Michael Scott Conference Meetings
# ============================================================================
cfg_sit_06 = {
    "id": "mov_sit_06",
    "slug": "the-office-michael-scott-conference-meetings",
    "var_lesson": "LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS",
    "var_quiz": "QUIZ_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS",
    "file": "lesson_the_office_michael_scott_conference_meetings.ts",
    "target_dir": sitcoms_dir,
    "externalId": "Db1NdYbQhAA",
    "title": "The Office (US): Michael Scott's Most Chaotic Conference Meetings",
    "durationSeconds": 750,
    "durationFormatted": "12:30",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 148,
    "viewCount": 14800000,
    "studyCount": 8120,
    "description": "Những cuộc họp phòng hội thảo hỗn loạn và ngớ ngẩn nhất của sếp Michael Scott (Steve Carell): 'Tôi không mê tín đâu, nhưng tôi hơi tín tín một chút.'",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segs_sit_06 = [
    {
        "orderIndex": 0,
        "startTime": 20.0,
        "endTime": 38.0,
        "text": "I'm not superstitious, but I am a little stitious. People need to know that their manager has a moral compass.",
        "translationVi": "Tôi không phải kẻ mê tín đâu, nhưng tôi cũng hơi tín tín một chút. Mọi người cần biết rằng người quản lý của họ có một la bàn đạo đức rõ ràng.",
        "ipaUs": "/aɪm nɑːt ˌsuːpərˈstɪʃəs, bʌt aɪ æm ə ˈlɪtl̩ ˈstɪʃəs. ˈpiːpəl niːd tuː noʊ ðæt ðɛr ˈmænədʒər hæz ə ˈmɔːrəl ˈkʌmpəs./",
        "keywords": ["superstitious", "a little stitious", "moral compass"],
        "explanationAi": "Chơi chữ bằng cách tách tiền tố 'super-' trong 'superstitious' thành 'a little stitious'.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 50.0,
        "endTime": 68.5,
        "text": "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
        "translationVi": "Tôi muốn người ta sợ mình hay yêu mến mình hơn ư? Dễ ợt. Cả hai. Tôi muốn người ta phải sợ hãi trước mức độ họ yêu mến tôi nhiều đến thế nào.",
        "ipaUs": "/wʊd aɪ ˈræðər biː fɪrd ɔːr lʌvd? ˈiːzi. boʊθ. aɪ wɑːnt ˈpiːpəl tuː biː əˈfreɪd əv haʊ mʌtʃ ðeɪ lʌv miː./",
        "keywords": ["feared or loved", "afraid of how much they love me"],
        "explanationAi": "Biến tấu hài hước câu hỏi kinh điển của triết gia Machiavelli trong tác phẩm 'Quân Vương' (The Prince).",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 90.0,
        "endTime": 108.0,
        "text": "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way.",
        "translationVi": "Đôi khi tôi bắt đầu một câu nói mà tôi còn chẳng biết nó sẽ đi về đâu. Tôi chỉ hy vọng mình sẽ tìm thấy lối đi trên đường nói mà thôi.",
        "ipaUs": "/ˈsʌmˌtaɪmz aɪl stɑːrt ə ˈsɛntəns ænd aɪ doʊnt ˈiːvən noʊ wɛr ɪts ˈɡoʊɪŋ. aɪ dʒʌst hoʊp aɪ faɪnd ɪt əˈlɔːŋ ðə weɪ./",
        "keywords": ["start a sentence", "find it along the way"],
        "explanationAi": "Lời bộc bạch thật thà một cách ngộ nghĩnh về phong cách ứng biến không kịch bản của Michael.",
        "properNouns": []
    }
]

qs_sit_06 = [
    {
        "id": "q_mov_sit_06_1",
        "question": "What is Michael Scott's absurd solution to Machiavelli's famous dilemma of being feared versus loved?",
        "questionVi": "Giải pháp ngớ ngẩn của Michael Scott cho bài toán nổi tiếng của Machiavelli giữa việc được yêu mến hay bị sợ hãi là gì?",
        "options": [
            "He wants both: people should be afraid of how much they love him",
            "He strictly prefers being feared through administrative punishments",
            "He solely desires to be loved like an older brother",
            "He avoids leadership dilemmas completely by delegating to Dwight"
        ],
        "optionsVi": [
            "Ông muốn cả hai: mọi người phải sợ hãi vì họ yêu mến ông quá nhiều",
            "Ông chỉ muốn bị sợ hãi thông qua kỷ luật",
            "Ông chỉ muốn được yêu mến như một người anh cả",
            "Ông tránh né bằng cách giao việc cho Dwight"
        ],
        "correctAnswer": 0,
        "explanation": "Michael hilariously merges both concepts: 'I want people to be afraid of how much they love me.'",
        "explanationVi": "Michael gộp cả hai thái cực: 'Tôi muốn người ta phải sợ trước mức độ họ yêu mến tôi.'",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Humorous Managerial Logic",
        "targetedConceptVi": "Tư duy quản lý hài hước"
    }
]

# ============================================================================
# 7. mov_sit_10: Young Sheldon
# ============================================================================
cfg_sit_10 = {
    "id": "mov_sit_10",
    "slug": "young-sheldon-outsmarting-everyone-debates",
    "var_lesson": "LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES",
    "var_quiz": "QUIZ_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES",
    "file": "lesson_young_sheldon_outsmarting_everyone_debates.ts",
    "target_dir": sitcoms_dir,
    "externalId": "EKEEalhsDOA",
    "title": "Young Sheldon Outsmarting Everyone & Winning Family Debates",
    "durationSeconds": 790,
    "durationFormatted": "13:10",
    "cefrLevel": "B2",
    "accent": "Texan American",
    "wpmSpeed": 140,
    "viewCount": 18700000,
    "studyCount": 7320,
    "description": "Cậu bé thiên tài 9 tuổi Sheldon Cooper (Iain Armitage) dùng lập luận khoa học sắc bén lấn át người lớn và chỉnh lưng thầy cô trường cấp ba tại Texas.",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segs_sit_10 = [
    {
        "orderIndex": 0,
        "startTime": 25.0,
        "endTime": 42.0,
        "text": "I'm not bragging, Mom. Bragging implies exaggeration. I am merely stating an undeniable empirical fact.",
        "translationVi": "Con đâu có khoe khoang thưa mẹ. Khoe khoang hàm ý sự phóng đại. Con chỉ đang phát biểu một sự thật thực nghiệm không thể chối cãi.",
        "ipaUs": "/aɪm nɑːt ˈbræɡɪŋ, mɑːm. ˈbræɡɪŋ ɪmˈplaɪz ɪɡˌzædʒəˈreɪʃən. aɪ æm ˈmɪrli ˈsteɪtɪŋ ən ˌʌndɪˈnaɪəbl̩ ɛmˈpɪrɪkəl fækt./",
        "keywords": ["bragging implies", "exaggeration", "empirical fact"],
        "explanationAi": "Cụm học thuật cao cấp 'empirical fact' (sự thật có bằng chứng thực nghiệm). Sheldon phân biệt rạch ròi ngữ nghĩa từ vựng.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 60.0,
        "endTime": 78.0,
        "text": "According to the church bylaws, children under twelve are exempt from mandatory tithing. So technically, the Lord owes me ten dollars.",
        "translationVi": "Theo điều lệ của nhà thờ, trẻ em dưới mười hai tuổi được miễn việc đóng góp một phần mười bắt buộc. Vì thế về mặt kỹ thuật, Chúa đang nợ con mười đô la.",
        "ipaUs": "/əˈkɔːrdɪŋ tuː ðə tʃɜːrtʃ ˈbaɪˌlɔːz, ˈtʃɪldrən ˈʌndər twɛlv ɑːr ɪɡˈzɛmpt frʌm ˈmændəˌtɔːri ˈtaɪðɪŋ. soʊ ˈtɛknɪkli, ðə lɔːrd oʊz miː tɛn ˈdɑːlərz./",
        "keywords": ["church bylaws", "exempt from", "mandatory tithing"],
        "explanationAi": "Thuật ngữ tôn giáo 'tithing' (dâng phần mười cho nhà thờ) và 'exempt from' (được miễn trừ nghĩa vụ).",
        "properNouns": ["Lord"]
    },
    {
        "orderIndex": 2,
        "startTime": 95.0,
        "endTime": 112.0,
        "text": "Why do I have to eat dinner at the table when thermodynamics clearly proves heat dissipation is faster in the kitchen?",
        "translationVi": "Tại sao con phải ăn tối ở bàn khi nhiệt động lực học chứng minh rõ ràng rằng sự tản nhiệt diễn ra nhanh hơn trong phòng bếp?",
        "ipaUs": "/waɪ duː aɪ hæv tuː iːt ˈdɪnər æt ðə ˈteɪbl̩ wɛn ˌθɜːrmoʊdaɪˈnæmɪks ˈklɪrli pruːvz hiːt ˌdɪsəˈpeɪʃən ɪz ˈfæstər ɪn ðə ˈkɪtʃən?/",
        "keywords": ["thermodynamics", "heat dissipation"],
        "explanationAi": "Thuật ngữ vật lý 'thermodynamics' (nhiệt động lực học) và 'heat dissipation' (sự tản nhiệt).",
        "properNouns": []
    }
]

qs_sit_10 = [
    {
        "id": "q_mov_sit_10_1",
        "question": "How does young Sheldon defend himself against his mother's accusation of bragging?",
        "questionVi": "Sheldon thuở nhỏ tự bào chữa thế nào trước lời mẹ quở trách rằng cậu đang khoe khoang?",
        "options": [
            "He argues that bragging implies exaggeration, while he is merely stating an empirical fact",
            "He apologizes and promises to remain humble in front of his siblings",
            "He cites a Texas legal statute about free speech rights",
            "He offers to wash the dishes if she forgives him"
        ],
        "optionsVi": [
            "Cậu lập luận rằng khoe khoang hàm ý phóng đại, trong khi cậu chỉ nói sự thật thực nghiệm",
            "Cậu xin lỗi và hứa sẽ khiêm tốn trước mặt anh chị em",
            "Cậu viện dẫn điều luật bang Texas về quyền tự do ngôn luận",
            "Cậu đề nghị rửa bát nếu mẹ tha lỗi"
        ],
        "correctAnswer": 0,
        "explanation": "Sheldon points out: 'Bragging implies exaggeration. I am merely stating an undeniable empirical fact.'",
        "explanationVi": "Sheldon chỉ ra: 'Khoe khoang hàm ý nói quá. Con chỉ đang nêu sự thật thực nghiệm.'",
        "referenceSegmentIndex": 0,
        "targetedConcept": "Analytical Argumentation",
        "targetedConceptVi": "Lập luận phân tích logic"
    }
]

# ============================================================================
# 8. mov_sit_12: Schitt's Creek
# ============================================================================
cfg_sit_12 = {
    "id": "mov_sit_12",
    "slug": "schitts-creek-alexis-david-vocabulary-dinners",
    "var_lesson": "LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS",
    "var_quiz": "QUIZ_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS",
    "file": "lesson_schitts_creek_alexis_david_vocabulary_dinners.ts",
    "target_dir": sitcoms_dir,
    "externalId": "S_acAHyAKuI",
    "title": "Schitt’s Creek: Alexis Rose & Moira's Unmatched Vocabulary",
    "durationSeconds": 615,
    "durationFormatted": "10:15",
    "cefrLevel": "B2",
    "accent": "Canadian / Transatlantic",
    "wpmSpeed": 142,
    "viewCount": 5400000,
    "studyCount": 5890,
    "description": "Kho từ vựng hào nhoáng và những màn đấu khẩu hài hước giữa hai chị em nhà Rose (Annie Murphy & Dan Levy) cùng câu nói thương hiệu 'Ew, David!'",
    "categoryId": "cat_classic_sitcoms",
    "categorySlug": "classic-sitcoms",
    "categoryName": "Sitcom Kinh Điển & Hài Kịch"
}

segs_sit_12 = [
    {
        "orderIndex": 0,
        "startTime": 20.0,
        "endTime": 36.5,
        "text": "Ew, David! What are you doing with that sweater? That is literally horrifying.",
        "translationVi": "Eo ôi, David! Anh đang làm cái trò gì với cái áo len đó thế? Trông gớm ghiếc dã man luôn ấy.",
        "ipaUs": "/uː, ˈdeɪvɪd! wʌt ɑːr juː ˈduːɪŋ wɪð ðæt ˈswɛtər? ðæt ɪz ˈlɪtərəli ˈhɔːrəˌfaɪɪŋ./",
        "keywords": ["Ew, David", "literally horrifying"],
        "explanationAi": "Cụm cửa miệng biểu tượng thế giới mạng 'Ew, David!' của Alexis và trạng từ phóng đại 'literally horrifying'.",
        "properNouns": ["David"]
    },
    {
        "orderIndex": 1,
        "startTime": 48.0,
        "endTime": 66.0,
        "text": "Fold in the cheese! — What does that mean? What does 'fold in the cheese' mean? — You just fold it in! — Do you fold it in half like a piece of paper?!",
        "translationVi": "Trộn ghém phô mai vào! — Thế nghĩa là sao? 'Trộn ghém phô mai' nghĩa là làm cái gì cơ chứ? — Thì mẹ cứ gập nó vào thôi! — Mẹ gập đôi lại như một tờ giấy ấy hả?!",
        "ipaUs": "/foʊld ɪn ðə tʃiːz! — wʌt dʌz ðæt miːn? wʌt dʌz foʊld ɪn ðə tʃiːz miːn? — juː dʒʌst foʊld ɪt ɪn! — duː juː foʊld ɪt ɪn hæf laɪk ə piːs əv ˈpeɪpər?!/",
        "keywords": ["fold in the cheese", "fold in half"],
        "explanationAi": "Thuật ngữ nấu bếp 'fold in' (nhẹ nhàng trộn ghém nguyên liệu) gây ra trận cãi vã kinh điển giữa David và mẹ Moira.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 80.0,
        "endTime": 98.0,
        "text": "Nobody is looking at you, David. People aren't thinking about you the way that you're thinking about you.",
        "translationVi": "Chẳng có ai thèm dòm ngó anh đâu, David à. Người đời đâu có rảnh rỗi bận tâm về anh theo cái cách mà anh đang tự soi xét chính mình.",
        "ipaUs": "/ˈnoʊˌbɑːdi ɪz ˈlʊkɪŋ æt juː, ˈdeɪvɪd. ˈpiːpəl ɑːrnt ˈθɪŋkɪŋ əˈbaʊt juː ðə weɪ ðæt jʊr ˈθɪŋkɪŋ əˈbaʊt juː./",
        "keywords": ["nobody is looking at you", "thinking about you"],
        "explanationAi": "Lời khuyên giải tỏa tâm lý chân thành và sâu sắc nhất của Alexis: Giúp người khác thoát khỏi hội chứng tự ý thức thái quá (spotlight effect).",
        "properNouns": ["David"]
    }
]

qs_sit_12 = [
    {
        "id": "q_mov_sit_12_1",
        "question": "What psychological insight about the 'spotlight effect' does Alexis teach David?",
        "questionVi": "Alexis dạy cho David cái nhìn tâm lý nào về 'hiệu ứng tâm điểm' (spotlight effect)?",
        "options": [
            "People are not scrutinizing or judging you nearly as much as you think they are",
            "Always dress extravagantly to ensure people keep admiring you",
            "Moving to a small town increases public attention on your fashion",
            "Cooking dinner together solves all personal insecurities"
        ],
        "optionsVi": [
            "Người đời chẳng hề soi mói hay phán xét bạn nhiều như bạn tự tưởng tượng đâu",
            "Luôn mặc đồ lộng lẫy để người khác ngưỡng mộ",
            "Chuyển về thị trấn nhỏ sẽ làm tăng sự chú ý vào thời trang",
            "Cùng nhau nấu ăn sẽ giải quyết mọi tự ti"
        ],
        "correctAnswer": 0,
        "explanation": "Alexis wisely tells David: 'Nobody is looking at you, David. People aren't thinking about you the way that you're thinking about you.'",
        "explanationVi": "Alexis khuyên: 'Chẳng ai nhìn anh đâu David. Người ta đâu có nghĩ về anh như cách anh tự nghĩ.'",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Psychological Wisdom & Sibling Advice",
        "targetedConceptVi": "Hiểu biết tâm lý và lời khuyên gia đình"
    }
]

# ============================================================================
# 9. mov_insp_11: Scent of a Woman
# ============================================================================
cfg_insp_11 = {
    "id": "mov_insp_11",
    "slug": "scent-of-a-woman-al-pacino-baird-school-defense",
    "var_lesson": "LESSON_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE",
    "var_quiz": "QUIZ_SCENT_OF_A_WOMAN_AL_PACINO_BAIRD_SCHOOL_DEFENSE",
    "file": "lesson_scent_of_a_woman_al_pacino_baird_school_defense.ts",
    "target_dir": insp_dir,
    "externalId": "p9DQSnik1mw",
    "title": "Scent of a Woman: Al Pacino's Legendary Baird School Defense Speech",
    "durationSeconds": 489,
    "durationFormatted": "08:09",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 132,
    "viewCount": 9831779,
    "studyCount": 7890,
    "description": "Đỉnh cao diễn xuất đoạt giải Oscar của Al Pacino trong vai Trung tá Frank Slade mù lòa đứng ra bảo vệ cậu học sinh nghèo Charlie Simms trước hội đồng kỷ luật trường Baird.",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segs_insp_11 = [
    {
        "orderIndex": 0,
        "startTime": 40.0,
        "endTime": 58.0,
        "text": "Out of order? I'll show you out of order! You don't know what out of order is, Mr. Trask! I'd show you, but I'm too old, I'm too tired, I'm too blind!",
        "translationVi": "Vi phạm trật tự ư? Tôi sẽ cho các người thấy thế nào là vi phạm trật tự! Ông chẳng hiểu thế nào là vi phạm quy củ đâu, ông Trask ạ! Tôi sẽ chỉ cho ông thấy, nhưng tôi đã quá già, quá mệt mỏi và quá mù lòa rồi!",
        "ipaUs": "/aʊt əv ˈɔːrdər? aɪl ʃoʊ juː aʊt əv ˈɔːrdər! juː doʊnt noʊ wʌt aʊt əv ˈɔːrdər ɪz, ˈmɪstər træsk! aɪd ʃoʊ juː, bʌt aɪm tuː oʊld, aɪm tuː ˈtaɪərd, aɪm tuː blaɪnd!/",
        "keywords": ["out of order", "too old", "too blind"],
        "explanationAi": "Cụm thành ngữ kỷ luật nghị viện 'out of order' (bất hợp lệ, vi phạm nội quy). Frank Slade đập bàn chất vấn sự suy đồi của hội đồng.",
        "properNouns": ["Trask"]
    },
    {
        "orderIndex": 1,
        "startTime": 65.0,
        "endTime": 85.0,
        "text": "What kind of a motto do you have here? 'Boys, inform on your classmates, save your own hide'? Anything short of that, we're gonna burn you at the stake?",
        "translationVi": "Các người có cái loại phương châm gì ở đây thế này? 'Các chàng trai, hãy đi điểm chỉ bạn học để cứu lấy thân xác mình ư'? Nếu không làm thế thì các người sẽ hỏa thiêu chúng trên cọc thiêu sao?",
        "ipaUs": "/wʌt kaɪnd əv ə ˈmɑːtoʊ duː juː hæv hɪr? bɔɪz, ɪnˈfɔːrm ɑːn jɔːr ˈklæsˌmeɪts, seɪv jɔːr oʊn haɪd? ˈɛniˌθɪŋ ʃɔːrt əv ðæt, wɪr ˈɡɑːnə bɜːrn juː æt ðə steɪk?/",
        "keywords": ["inform on", "save your own hide", "burn you at the stake"],
        "explanationAi": "Thành ngữ 'save one's hide' (cứu lấy thân mình) và 'burn at the stake' (hỏa thiêu trừng phạt dã man).",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 95.0,
        "endTime": 115.0,
        "text": "Charlie Simms won't sell anybody out to buy his future! And that, my friends, is called integrity! That's called courage! Now that's the stuff leaders should be made of!",
        "translationVi": "Charlie Simms quyết không bán đứng ai để mua lấy tương lai cho riêng mình! Và điều đó, thưa các bạn, được gọi là chính trực! Đó gọi là lòng can đảm! Đó mới chính là chất liệu tôi luyện nên những nhà lãnh đạo!",
        "ipaUs": "/ˈtʃɑːrli sɪmz woʊnt sɛl ˈɛniˌbɑːdi aʊt tuː baɪ hɪz ˈfjuːtʃər! ænd ðæt, maɪ frɛndz, ɪz kɔːld ɪnˈtɛɡrəti! ðæts kɔːld ˈkɜːrɪdʒ! naʊ ðæts ðə stʌf ˈliːdərz ʃʊd biː meɪd əv!/",
        "keywords": ["sell out", "integrity", "courage", "stuff leaders are made of"],
        "explanationAi": "Cụm phrasal verb 'sell someone out' (bán đứng ai đó) và giá trị đạo đức tối thượng: 'integrity' (sự chính trực kiên định).",
        "properNouns": ["Charlie Simms"]
    },
    {
        "orderIndex": 3,
        "startTime": 120.0,
        "endTime": 142.0,
        "text": "There is nothing like the sight of an amputated spirit. There is no prosthetic for that. You think you're sending this splendid boy home with his tail between his legs, but I say you're executing his soul!",
        "translationVi": "Chẳng có gì tồi tệ hơn cảnh tượng một tâm hồn bị cắt cụt. Chẳng có bộ phận giả nào bù đắp được điều đó đâu. Các người nghĩ mình đang đuổi chàng trai tuyệt vời này về nhà với cái đuôi kẹp giữa hai chân, nhưng tôi nói các người đang hành quyết linh hồn của cậu ấy!",
        "ipaUs": "/ðɛr ɪz ˈnʌθɪŋ laɪk ðə saɪt əv ən ˈæmpjəˌteɪtɪd ˈspɪrɪt. ðɛr ɪz noʊ prɑːsˈθɛtɪk fɔːr ðæt. juː θɪŋk jʊr ˈsɛndɪŋ ðɪs ˈsplɛndɪd bɔɪ hoʊm wɪð hɪz teɪl bɪˈtwiːn hɪz lɛɡz, bʌt aɪ seɪ jʊr ˈɛksəˌkjuːtɪŋ hɪz soʊl!/",
        "keywords": ["amputated spirit", "no prosthetic", "executing his soul"],
        "explanationAi": "Hình ảnh ẩn dụ kinh điển 'amputated spirit' (tâm hồn bị cưa cụt) và 'prosthetic' (chân tay giả). Lời kết án đanh thép của Al Pacino.",
        "properNouns": []
    }
]

qs_insp_11 = [
    {
        "id": "q_mov_insp_11_1",
        "question": "According to Lieutenant Colonel Frank Slade, what quality makes Charlie Simms a true future leader?",
        "questionVi": "Theo Trung tá Frank Slade, phẩm chất nào biến Charlie Simms trở thành một nhà lãnh đạo đích thực trong tương lai?",
        "options": [
            "His unyielding integrity and refusal to sell out his classmates to buy his own future",
            "His superior academic grade point average in chemistry",
            "His family's wealth and heritage in the Baird school alumni association",
            "His ability to memorize administrative regulations flawlessly"
        ],
        "optionsVi": [
            "Sự chính trực kiên định và quyết không bán đứng bạn bè để mua lấy tương lai cho riêng mình",
            "Điểm trung bình học tập xuất sắc môn hóa",
            "Gia thế giàu có trong hội cựu học sinh trường Baird",
            "Khả năng học thuộc quy chế nhà trường"
        ],
        "correctAnswer": 0,
        "explanation": "Slade roars: 'Charlie Simms won't sell anybody out to buy his future! And that, my friends, is called integrity! That's called courage!'",
        "explanationVi": "Slade dõng dạc: 'Charlie Simms quyết không bán đứng ai để mua tương lai! Đó gọi là sự chính trực! Đó là lòng can đảm!'",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Integrity & Leadership",
        "targetedConceptVi": "Sự chính trực và phẩm chất lãnh đạo"
    }
]

# Write all 9 files
items_to_write = [
    (cfg_sit_01, segs_sit_01, qs_sit_01),
    (cfg_sit_02, segs_sit_02, qs_sit_02),
    (cfg_sit_03, segs_sit_03, qs_sit_03),
    (cfg_sit_04, segs_sit_04, qs_sit_04),
    (cfg_sit_05, segs_sit_05, qs_sit_05),
    (cfg_sit_06, segs_sit_06, qs_sit_06),
    (cfg_sit_10, segs_sit_10, qs_sit_10),
    (cfg_sit_12, segs_sit_12, qs_sit_12),
    (cfg_insp_11, segs_insp_11, qs_insp_11),
]

for cfg, segs, qs in items_to_write:
    content = generate_ts_lesson(cfg, segs, qs)
    path = os.path.join(cfg["target_dir"], cfg["file"])
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {cfg['file']}")
