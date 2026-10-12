import json
import os
from build_lessons_engine import generate_ts_lesson

target_dir = "features/listening/data/lessons/movies/inspirational"
os.makedirs(target_dir, exist_ok=True)

# ============================================================================
# 1. mov_insp_01: Good Will Hunting
# ============================================================================
cfg_01 = {
    "id": "mov_insp_01",
    "slug": "good-will-hunting-park-bench-monologue",
    "var_lesson": "LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE",
    "var_quiz": "QUIZ_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE",
    "file": "lesson_good_will_hunting_park_bench_monologue.ts",
    "externalId": "8GY3sO47YYo",
    "title": "Good Will Hunting: Robin Williams' Park Bench Monologue",
    "durationSeconds": 301,
    "durationFormatted": "05:01",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 134,
    "viewCount": 4704113,
    "studyCount": 5420,
    "description": "Phân cảnh kinh điển đoạt giải Oscar của Robin Williams (bác sĩ tâm lý Sean Maguire) khi dạy cho Will Hunting (Matt Damon) bài học thấm thía: kiến thức sách vở không bao giờ thay thế được trải nghiệm sống và sự dũng cảm yêu thương.",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_01 = [
    {
        "orderIndex": 0,
        "startTime": 24.5,
        "endTime": 35.8,
        "text": "If I asked you about art, you'd probably give me the skinny on every art book ever written. Michelangelo, you know a lot about him.",
        "translationVi": "Nếu tôi hỏi cậu về nghệ thuật, cậu có thể kể vanh vách mọi cuốn sách từng viết. Michelangelo ư, cậu biết mọi thứ về ông ấy.",
        "ipaUs": "/ɪf aɪ æskt juː əˈbaʊt ɑːrt, juːd ˈprɑːbəbli ɡɪv miː ðə ˈskɪni ɑːn ˈɛvri ɑːrt bʊk ˈɛvər ˈrɪtn̩. ˌmaɪkəlˈændʒəloʊ, juː noʊ ə lɑːt əˈbaʊt hɪm./",
        "keywords": ["the skinny on", "art book ever written", "Michelangelo"],
        "explanationAi": "Thành ngữ Mỹ đặc thù 'give someone the skinny on something' nghĩa là cung cấp thông tin chi tiết, toàn diện về một chủ đề.",
        "properNouns": ["Michelangelo"]
    },
    {
        "orderIndex": 1,
        "startTime": 36.2,
        "endTime": 47.9,
        "text": "Life's work, political aspirations, him and the Pope, sexual orientation, the whole works, right? But I'll bet you can't tell me what it smells like in the Sistine Chapel.",
        "translationVi": "Sự nghiệp trọn đời, tham vọng chính trị, mối quan hệ với Giáo hoàng, xu hướng tính dục, tường tận mọi ngóc ngách, phải không? Nhưng tôi cá cậu chẳng biết mùi hương trong Nhà nguyện Sistine như thế nào.",
        "ipaUs": "/laɪfs wɜːrk, pəˈlɪtɪkəl ˌæspəˈreɪʃənz, hɪm ænd ðə poʊp, ˈsɛkʃuəl ˌɔːriənˈteɪʃən, ðə hoʊl wɜːrks, raɪt? bʌt aɪl bɛt juː kænt tɛl miː wʌt ɪt smɛlz laɪk ɪn ðə sɪsˈtiːn ˈtʃæpəl./",
        "keywords": ["political aspirations", "the whole works", "Sistine Chapel"],
        "explanationAi": "Cụm thành ngữ 'the whole works' mang nghĩa 'tất cả mọi chi tiết liên quan'. Đối lập giữa lý thuyết và cảm nhận thực tế.",
        "properNouns": ["Pope", "Sistine Chapel"]
    },
    {
        "orderIndex": 2,
        "startTime": 48.4,
        "endTime": 59.8,
        "text": "You've never actually stood there and looked up at that beautiful ceiling. If I asked you about women, you'd probably give me a syllabus about your favorites.",
        "translationVi": "Cậu chưa từng thực sự đứng ở đó và ngước mắt nhìn lên vòm trần tráng lệ ấy. Nếu tôi hỏi về phụ nữ, cậu sẽ đọc vanh vách một danh sách những hình mẫu cậu thích.",
        "ipaUs": "/juːv ˈnɛvər ˈæktʃuəli stʊd ðɛr ænd lʊkt ʌp æt ðæt ˈbjuːtɪfəl ˈsiːlɪŋ. ɪf aɪ æskt juː əˈbaʊt ˈwɪmɪn, juːd ˈprɑːbəbli ɡɪv miː ə ˈsɪləbəs əˈbaʊt jɔːr ˈfeɪvərɪts./",
        "keywords": ["stood there", "beautiful ceiling", "syllabus"],
        "explanationAi": "Sean dùng từ 'syllabus' (đề cương học phần) để châm biếm cách Will tiếp cận tình cảm con người như một môn học sách vở.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 62.0,
        "endTime": 76.5,
        "text": "You may have even been laid a few times. But you can't tell me what it feels like to wake up next to a woman and feel truly happy.",
        "translationVi": "Cậu có thể từng ngủ với vài người. Nhưng cậu chẳng thể nói cho tôi biết cảm giác thức dậy bên cạnh một người phụ nữ và cảm thấy thực sự hạnh phúc là như thế nào.",
        "ipaUs": "/juː meɪ ˈiːvən biːn leɪd ə fjuː taɪmz. bʌt juː kænt tɛl miː wʌt ɪt fiːlz laɪk tuː weɪk ʌp nɛkst tuː ə ˈwʊmən ænd fiːl ˈtruːli ˈhæpi./",
        "keywords": ["feel truly happy", "wake up next to", "genuine emotion"],
        "explanationAi": "Cấu trúc 'feel truly happy' nhấn mạnh chiều sâu của cảm xúc chân thực so với sự thỏa mãn thể xác đơn thuần.",
        "properNouns": []
    },
    {
        "orderIndex": 4,
        "startTime": 105.0,
        "endTime": 121.5,
        "text": "You don't know about real loss, because that only occurs when you love something more than you love yourself. I doubt you've ever dared to love anybody that much.",
        "translationVi": "Cậu chẳng hiểu gì về sự mất mát thực sự, bởi điều đó chỉ xảy ra khi cậu yêu một ai đó nhiều hơn chính bản thân mình. Tôi ngờ rằng cậu chưa từng dám yêu ai đến nhường ấy.",
        "ipaUs": "/juː doʊnt noʊ əˈbaʊt ˈriːəl lɔːs, bɪˈkɔːz ðæt ˈoʊnli əˈkɜːrz wɛn juː lʌv ˈsʌmθɪŋ mɔːr ðæn juː lʌv jərˈsɛlf. aɪ daʊt juːv ˈɛvər dɛrd tuː lʌv ˈɛniˌbɑːdi ðæt mʌtʃ./",
        "keywords": ["real loss", "love something more", "dared to love"],
        "explanationAi": "Điểm mấu chốt của triết lý sống: tình yêu thương đòi hỏi sự dám hy sinh và tổn thương ('dared to love').",
        "properNouns": []
    },
    {
        "orderIndex": 5,
        "startTime": 210.0,
        "endTime": 226.5,
        "text": "I can't learn anything from you I can't read in some book. Unless you want to talk about who you are. Then I'm fascinated. I'm in. But you don't want to do that, do you, sport?",
        "translationVi": "Tôi chẳng học được điều gì từ cậu mà tôi không thể đọc trong một cuốn sách. Trừ phi cậu muốn trò chuyện về con người thật của cậu. Khi đó tôi sẽ lắng nghe say mê. Nhưng cậu đâu muốn làm vậy, đúng không nhóc?",
        "ipaUs": "/aɪ kænt lɜːrn ˈɛniˌθɪŋ frʌm juː aɪ kænt riːd ɪn sʌm bʊk. ənˈlɛs juː wɑːnt tuː tɔːk əˈbaʊt huː juː ɑːr. ðɛn aɪm ˈfæsəˌneɪtɪd. aɪm ɪn. bʌt juː doʊnt wɑːnt tuː duː ðæt, duː juː, spɔːrt?/",
        "keywords": ["fascinated", "I'm in", "who you are", "sport"],
        "explanationAi": "Cụm đàm thoại 'I'm in' nghĩa là tôi sẵn sàng tham gia / ủng hộ. 'Sport' là cách gọi thân mật nhưng hơi châm biếm người trẻ tuổi.",
        "properNouns": []
    }
]

questions_01 = [
    {
        "id": "q_mov_insp_01_1",
        "question": "What main contrast does Sean emphasize between Will's book knowledge and real experience?",
        "questionVi": "Sean nhấn mạnh sự đối lập cốt lõi nào giữa kiến thức sách vở của Will và trải nghiệm thực tế?",
        "options": [
            "Will knows facts about art and history but has never experienced their real sensory and emotional reality",
            "Will has traveled to Rome but never studied the history of Michelangelo",
            "Will knows how to paint but lacks an understanding of chemical pigments",
            "Will prefers reading fiction rather than studying classical literature"
        ],
        "optionsVi": [
            "Will thuộc làu sự kiện nghệ thuật và lịch sử nhưng chưa từng trải nghiệm cảm xúc và giác quan thực tế",
            "Will đã đi du lịch Rome nhưng chưa từng học lịch sử về Michelangelo",
            "Will biết vẽ tranh nhưng thiếu hiểu biết về chất liệu màu vẽ",
            "Will thích đọc truyện hư cấu hơn là học văn học cổ điển"
        ],
        "correctAnswer": 0,
        "explanation": "Sean explains that Will can quote everything about Michelangelo and the Sistine Chapel, yet has never stood there to feel its true essence.",
        "explanationVi": "Sean chỉ ra Will có thể trích dẫn mọi điều về Michelangelo nhưng chưa từng đứng dưới trần Nhà nguyện Sistine để cảm nhận.",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Philosophical Comprehension",
        "targetedConceptVi": "Đọc hiểu tư tưởng triết lý"
    },
    {
        "id": "q_mov_insp_01_2",
        "question": "According to Sean, when does 'real loss' truly occur in life?",
        "questionVi": "Theo Sean, sự 'mất mát thực sự' trong cuộc đời chỉ xảy ra khi nào?",
        "options": [
            "When you fail an academic test or lose a job competition",
            "When you love someone more than you love yourself",
            "When you run out of financial resources and shelter",
            "When people realize their childhood dreams were unrealistic"
        ],
        "optionsVi": [
            "Khi bạn trượt một kỳ thi học thuật hoặc mất việc làm",
            "Khi bạn yêu một ai đó nhiều hơn yêu chính bản thân mình",
            "Khi bạn cạn kiệt tài chính và không có nơi ăn chốn ở",
            "Khi con người nhận ra những ước mơ thuở nhỏ là viển vông"
        ],
        "correctAnswer": 1,
        "explanation": "Sean states: 'Real loss only occurs when you love something more than you love yourself.'",
        "explanationVi": "Sean khẳng định mất mát thực sự chỉ xảy ra khi ta yêu ai đó hơn cả bản thân mình.",
        "referenceSegmentIndex": 4,
        "targetedConcept": "Emotional Understanding",
        "targetedConceptVi": "Thấu hiểu chiều sâu cảm xúc"
    },
    {
        "id": "q_mov_insp_01_3",
        "question": "What is the meaning of the colloquial expression 'the skinny on' in Sean's speech?",
        "questionVi": "Cụm thành ngữ khẩu ngữ 'the skinny on' trong lời thoại của Sean mang ý nghĩa gì?",
        "options": [
            "A superficial and careless summary with omitted details",
            "The essential, comprehensive inside facts and detailed information",
            "A physical medical diagnosis about weight loss",
            "An unofficial rumor with questionable credibility"
        ],
        "optionsVi": [
            "Một bản tóm tắt hời hợt bỏ sót nhiều chi tiết",
            "Những thông tin cốt lõi, chi tiết và chính xác nhất về một chủ đề",
            "Một chẩn đoán y khoa về tình trạng sụt cân",
            "Một lời đồn thổi không chính thống thiếu kiểm chứng"
        ],
        "correctAnswer": 1,
        "explanation": "'The skinny on' is American slang meaning the inside facts or complete details about something.",
        "explanationVi": "'The skinny on' là thành ngữ tiếng Anh-Mỹ chỉ những thông tin tường tận, chi tiết cốt lõi.",
        "referenceSegmentIndex": 0,
        "targetedConcept": "Idiomatic Collocations",
        "targetedConceptVi": "Cụm thành ngữ khẩu ngữ"
    },
    {
        "id": "q_mov_insp_01_4",
        "question": "What condition does Sean set if Will wants him to truly listen and be fascinated?",
        "questionVi": "Sean đưa ra điều kiện gì nếu Will muốn ông thực sự lắng nghe và say mê trò chuyện?",
        "options": [
            "Will must solve an unsolved mathematical proof on the board",
            "Will must be willing to open up and talk honestly about who he really is",
            "Will must apologize for insulting Sean's late wife",
            "Will must enroll in a prestigious university program"
        ],
        "optionsVi": [
            "Will phải giải được một bài toán hóc búa trên bảng",
            "Will phải sẵn lòng mở lòng và nói thật về con người thực sự của mình",
            "Will phải xin lỗi vì đã xúc phạm người vợ quá cố của Sean",
            "Will phải nộp đơn vào một trường đại học danh tiếng"
        ],
        "correctAnswer": 1,
        "explanation": "Sean tells Will: 'Unless you want to talk about who you are. Then I'm fascinated. I'm in.'",
        "explanationVi": "Sean nói: 'Trừ phi cậu muốn trò chuyện về con người thật của cậu. Khi đó tôi sẽ lắng nghe say mê.'",
        "referenceSegmentIndex": 5,
        "targetedConcept": "Core Message Interpretation",
        "targetedConceptVi": "Diễn giải thông điệp cốt lõi"
    }
]

# ============================================================================
# 2. mov_insp_02: The Pursuit of Happyness
# ============================================================================
cfg_02 = {
    "id": "mov_insp_02",
    "slug": "pursuit-of-happyness-basketball-happiness",
    "var_lesson": "LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS",
    "var_quiz": "QUIZ_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS",
    "file": "lesson_pursuit_of_happyness_basketball_happiness.ts",
    "externalId": "pKoH9GkEKxQ",
    "title": "The Pursuit of Happyness: Chris Gardner's Dream & Protection Speech",
    "durationSeconds": 1218,
    "durationFormatted": "20:18",
    "cefrLevel": "B1",
    "accent": "American",
    "wpmSpeed": 128,
    "viewCount": 6912635,
    "studyCount": 6310,
    "description": "Khoảnh khắc xúc động nhất khi Chris Gardner (Will Smith) dặn dò con trai trên sân bóng rổ: 'Đừng bao giờ để ai nói rằng con không thể làm được điều gì, kể cả là bố. Nếu con có ước mơ, con phải bảo vệ nó.'",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_02 = [
    {
        "orderIndex": 0,
        "startTime": 48.0,
        "endTime": 58.5,
        "text": "Hey. Don't ever let somebody tell you you can't do something. Not even me. All right?",
        "translationVi": "Này con. Đừng bao giờ để bất kỳ ai nói rằng con không thể làm được điều gì. Kể cả là bố. Được chứ?",
        "ipaUs": "/heɪ. doʊnt ˈɛvər lɛt ˈsʌmˌbɑːdi tɛl juː juː kænt duː ˈsʌmθɪŋ. nɑːt ˈiːvən miː. ɔːl raɪt?/",
        "keywords": ["don't ever let", "tell you you can't", "not even me"],
        "explanationAi": "Cấu trúc mệnh lệnh phủ định mạnh mẽ: 'Don't ever let somebody + V(bare)'. Thể hiện sự tôn trọng tuyệt đối ước mơ của con.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 59.0,
        "endTime": 66.5,
        "text": "You got a dream... You gotta protect it.",
        "translationVi": "Con có một ước mơ... Con phải bảo vệ nó.",
        "ipaUs": "/juː ɡɑːt ə driːm... juː ˈɡɑːtə prəˈtɛkt ɪt./",
        "keywords": ["got a dream", "gotta protect it"],
        "explanationAi": "'You gotta' = 'You have got to' (con phải làm điều gì đó). Câu nói trở thành một trong những câu thoại truyền cảm hứng kinh điển nhất thế giới.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 67.0,
        "endTime": 76.5,
        "text": "People can't do something themselves, they wanna tell you you can't do it.",
        "translationVi": "Khi người ta không làm được điều gì đó, họ sẽ muốn nói với con rằng con cũng chẳng thể làm được.",
        "ipaUs": "/ˈpiːpəl kænt duː ˈsʌmθɪŋ ðəmˈsɛlvz, ðeɪ ˈwɑːnə tɛl juː juː kænt duː ɪt./",
        "keywords": ["themselves", "wanna tell you"],
        "explanationAi": "Hiện tượng tâm lý xã hội phản ánh qua câu thoại: sự hoài nghi của người khác thường bắt nguồn từ chính giới hạn của họ.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 77.0,
        "endTime": 84.5,
        "text": "If you want something, go get it. Period.",
        "translationVi": "Nếu con muốn điều gì, hãy giành lấy nó. Chấm hết.",
        "ipaUs": "/ɪf juː wɑːnt ˈsʌmθɪŋ, ɡoʊ ɡɛt ɪt. ˈpɪriəd./",
        "keywords": ["go get it", "period"],
        "explanationAi": "Từ 'Period' trong văn nói Mỹ đặt ở cuối câu khẳng định dứt khoát: không cần tranh cãi hay bàn lùi thêm nữa.",
        "properNouns": []
    },
    {
        "orderIndex": 4,
        "startTime": 312.0,
        "endTime": 325.0,
        "text": "This part of my life, this little part, is called happiness. It was the moment I realized perseverance truly breaks barriers.",
        "translationVi": "Phần này của cuộc đời tôi, một phần nhỏ bé này, được gọi là hạnh phúc. Đó là khoảnh khắc tôi nhận ra sự kiên trì thực sự phá vỡ mọi rào cản.",
        "ipaUs": "/ðɪs pɑːrt əv maɪ laɪf, ðɪs ˈlɪtl̩ pɑːrt, ɪz kɔːld ˈhæpinəs. ɪt wʌz ðə ˈmoʊmənt aɪ ˈriːəˌlaɪzd ˌpɜːrsəˈvɪrəns ˈtruːli breɪks ˈbæriərz./",
        "keywords": ["part of my life", "called happiness", "perseverance", "breaks barriers"],
        "explanationAi": "Cấu trúc độc thoại nội tâm phân chương cuộc đời của Chris Gardner qua các cung bậc cảm xúc.",
        "properNouns": []
    }
]

questions_02 = [
    {
        "id": "q_mov_insp_02_1",
        "question": "What is the core rule Chris Gardner gives to his young son regarding his dreams?",
        "questionVi": "Quy tắc cốt lõi mà Chris Gardner dặn dò con trai về ước mơ là gì?",
        "options": [
            "Never let anyone tell you that you cannot achieve something, even your own father",
            "Listen carefully to criticism and abandon dreams that seem too challenging",
            "Always follow safe career paths approved by society",
            "Focus only on basketball practice and ignore academic schoolwork"
        ],
        "optionsVi": [
            "Đừng bao giờ để bất kỳ ai nói con không thể làm được, kể cả chính người cha của con",
            "Luôn lắng nghe lời chỉ trích và từ bỏ ước mơ nếu thấy quá khó khăn",
            "Luôn chọn những con đường an toàn được xã hội định hướng",
            "Chỉ tập trung luyện bóng rổ và bỏ qua việc học ở trường"
        ],
        "correctAnswer": 0,
        "explanation": "Chris explicitly says: 'Don't ever let somebody tell you you can't do something. Not even me. You got a dream, you gotta protect it.'",
        "explanationVi": "Chris nói rõ: 'Đừng bao giờ để ai nói con không thể làm được. Kể cả là bố. Có ước mơ thì phải bảo vệ nó.'",
        "referenceSegmentIndex": 0,
        "targetedConcept": "Parental Advice Comprehension",
        "targetedConceptVi": "Hiểu lời khuyên dạy của cha"
    },
    {
        "id": "q_mov_insp_02_2",
        "question": "Why do people often discourage others from pursuing big goals, according to Chris?",
        "questionVi": "Theo Chris, tại sao người đời thường hay bàn lùi khi người khác theo đuổi mục tiêu lớn?",
        "options": [
            "Because they are jealous of younger people's physical athletic ability",
            "Because they cannot accomplish it themselves, so they project their limitations",
            "Because there are strict government regulations against pursuing dreams",
            "Because dreams require too much monetary investment"
        ],
        "optionsVi": [
            "Bởi vì họ ghen tị với thể lực của những người trẻ tuổi hơn",
            "Bởi vì họ không thể tự mình làm được, nên họ áp đặt giới hạn của họ lên người khác",
            "Bởi vì có những quy định khắt khe của chính quyền",
            "Bởi vì ước mơ đòi hỏi quá nhiều chi phí tiền bạc"
        ],
        "correctAnswer": 1,
        "explanation": "Chris points out: 'People can't do something themselves, they wanna tell you you can't do it.'",
        "explanationVi": "Chris giải thích: Khi bản thân họ không làm được, họ sẽ muốn nói rằng con cũng không thể làm được.",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Social Psychology Insight",
        "targetedConceptVi": "Hiểu tâm lý xã hội con người"
    },
    {
        "id": "q_mov_insp_02_3",
        "question": "What does the conversational word 'Period' indicate at the end of Chris's statement?",
        "questionVi": "Từ khẩu ngữ 'Period' ở cuối câu khẳng định của Chris mang ý nghĩa gì?",
        "options": [
            "A grammatical symbol indicating a question",
            "A final, definitive statement with no room for debate or excuses",
            "A temporary pause before continuing another discussion",
            "An indication of academic timetable sessions"
        ],
        "optionsVi": [
            "Một ký hiệu ngữ pháp chỉ câu hỏi",
            "Lời khẳng định dứt khoát cuối cùng, không có chỗ cho tranh cãi hay viện cớ",
            "Một khoảng dừng tạm thời trước khi thảo luận tiếp",
            "Chỉ các tiết học trong thời khóa biểu"
        ],
        "correctAnswer": 1,
        "explanation": "'Period' used colloquially emphasizes that the matter is settled definitively.",
        "explanationVi": "'Period' dùng trong khẩu ngữ để nhấn mạnh vấn đề đã được chốt dứt khoát, không bàn cãi nữa.",
        "referenceSegmentIndex": 3,
        "targetedConcept": "Colloquial Usage",
        "targetedConceptVi": "Cách dùng khẩu ngữ Mỹ"
    }
]

# ============================================================================
# 3. mov_insp_03: Dead Poets Society
# ============================================================================
cfg_03 = {
    "id": "mov_insp_03",
    "slug": "dead-poets-society-carpe-diem-captain",
    "var_lesson": "LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN",
    "var_quiz": "QUIZ_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN",
    "file": "lesson_dead_poets_society_carpe_diem_captain.ts",
    "externalId": "8x0COtH4Vrw",
    "title": "Dead Poets Society: Robin Williams 'Rip It Out' & Carpe Diem",
    "durationSeconds": 333,
    "durationFormatted": "05:33",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 142,
    "viewCount": 701047,
    "studyCount": 4980,
    "description": "Thầy giáo John Keating (Robin Williams) yêu cầu học sinh xé toang trang sách giáo khoa đo lường thơ ca khô khan của Tiến sĩ Pritchard để khám phá bản chất thực sự của nghệ thuật, đam mê và triết lý sống 'Carpe Diem' (Nắm bắt ngày hôm nay).",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_03 = [
    {
        "orderIndex": 0,
        "startTime": 0.88,
        "endTime": 11.5,
        "text": "Gentlemen, open your text to page 21 of the introduction. Mr. Perry, will you read the opening paragraph of the preface?",
        "translationVi": "Thưa các quý ông, hãy mở sách giáo khoa đến trang 21 của phần giới thiệu. Trò Perry, em đọc đoạn văn mở đầu lời tựa được chứ?",
        "ipaUs": "/ˈdʒɛntəlmɪn, ˈoʊpən jɔːr tɛkst tuː peɪdʒ ˈtwɛnti wʌn əv ðə ˌɪntrəˈdʌkʃən. ˈmɪstər ˈpɛri, wɪl juː riːd ðə ˈoʊpənɪŋ ˈpærəˌɡræf əv ðə ˈprɛfəs?/",
        "keywords": ["open your text", "opening paragraph", "preface"],
        "explanationAi": "Cụm danh từ học thuật 'preface' (lời nói đầu/tựa sách) và câu hỏi lời mời lịch sự trong lớp học: 'will you read...?'",
        "properNouns": ["Perry"]
    },
    {
        "orderIndex": 1,
        "startTime": 32.0,
        "endTime": 44.5,
        "text": "To fully understand poetry, we must first be fluent with its meter, rhyme, and figures of speech, then ask two questions: How artfully has the objective been rendered?",
        "translationVi": "Để hiểu thấu đáo một bài thơ, trước tiên ta phải thành thạo nhịp điệu, vần điệu và các biện pháp tu từ, sau đó đặt hai câu hỏi: Mục tiêu được thể hiện khéo léo đến mức nào?",
        "ipaUs": "/tuː ˈfʊli ˌʌndərˈstænd ˈpoʊɪtri, wiː mʌst fɜːrst biː ˈfluːənt wɪð ɪts ˈmiːtər, raɪm, ænd ˈfɪɡjərz əv spiːtʃ, ðɛn æsk tuː ˈkwɛstʃənz: haʊ ˈɑːrtfəli hæz ðɪ əbˈdʒɛktɪv biːn ˈrɛndərd?/",
        "keywords": ["meter, rhyme", "figures of speech", "artfully", "rendered"],
        "explanationAi": "Thuật ngữ phân tích văn học cổ điển: 'figures of speech' (biện pháp tu từ), 'meter' (thể thơ/nhịp thơ), 'rendered' (được diễn tả/thể hiện).",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 85.0,
        "endTime": 99.0,
        "text": "Excrement! That's what I think of Mr. J. Evans Pritchard. We're not laying pipe, we're talking about poetry. How can you describe poetry like American Bandstand?",
        "translationVi": "Nhảm nhí! Đó là những gì tôi nghĩ về ngài J. Evans Pritchard. Chúng ta đâu có đi đặt ống nước, chúng ta đang bàn về thi ca! Làm sao có thể đánh giá thơ ca như bảng xếp hạng âm nhạc?",
        "ipaUs": "/ˈɛkskrəmənt! ðæts wʌt aɪ θɪŋk əv ˈmɪstər dʒeɪ ˈɛvənz ˈprɪtʃərd. wɪr nɑːt ˈleɪɪŋ paɪp, wɪr ˈtɔːkɪŋ əˈbaʊt ˈpoʊɪtri. haʊ kæn juː dɪˈskraɪb ˈpoʊɪtri laɪk əˈmɛrɪkən ˈbændˌstænd?/",
        "keywords": ["excrement", "laying pipe", "describe poetry", "American Bandstand"],
        "explanationAi": "Keating phản bác gay gắt cách tiếp cận cơ học, định lượng khô khan đối với nghệ thuật.",
        "properNouns": ["Pritchard", "American Bandstand"]
    },
    {
        "orderIndex": 3,
        "startTime": 105.0,
        "endTime": 118.0,
        "text": "Rip it out! Go on, rip out the entire page! I want to hear the ripping of Mr. Pritchard! Rip it out, gentlemen, tear it out!",
        "translationVi": "Xé toang nó ra! Nào, xé cả trang giấy ra! Tôi muốn nghe thấy tiếng xé toạc bài học của ngài Pritchard! Xé nó đi các quý ông, rách toạc nó ra!",
        "ipaUs": "/rɪp ɪt aʊt! ɡoʊ ɑːn, rɪp aʊt ðɪ ɪnˈtaɪər peɪdʒ! aɪ wɑːnt tuː hɪr ðə ˈrɪpɪŋ əv ˈmɪstər ˈprɪtʃərd! rɪp ɪt aʊt, ˈdʒɛntəlmɪn, tɛr ɪt aʊt!/",
        "keywords": ["rip it out", "entire page", "tear it out"],
        "explanationAi": "Động từ hành động mạnh 'rip out' / 'tear out' thể hiện cuộc nổi loạn về tư tưởng tự do và giải phóng trí tưởng tượng sáng tạo.",
        "properNouns": ["Pritchard"]
    },
    {
        "orderIndex": 4,
        "startTime": 155.0,
        "endTime": 172.0,
        "text": "We don't read and write poetry because it's cute. We read and write poetry because we are members of the human race. And the human race is filled with passion.",
        "translationVi": "Chúng ta đọc và viết thơ không phải vì nó dễ thương. Chúng ta đọc và viết thơ vì chúng ta là thành viên của giống loài nhân loại. Và nhân loại thì luôn ngập tràn đam mê.",
        "ipaUs": "/wiː doʊnt riːd ænd raɪt ˈpoʊɪtri bɪˈkɔːz ɪts kjuːt. wiː riːd ænd raɪt ˈpoʊɪtri bɪˈkɔːz wiː ɑːr ˈmɛmbərz əv ðə ˈhjuːmən reɪs. ænd ðə ˈhjuːmən reɪs ɪz fɪld wɪð ˈpæʃən./",
        "keywords": ["human race", "filled with passion", "noble pursuits"],
        "explanationAi": "Cấu trúc điệp từ nhấn mạnh: 'We read and write poetry because...'. Tôn vinh bản chất nhân bản cốt lõi của con người.",
        "properNouns": []
    },
    {
        "orderIndex": 5,
        "startTime": 173.0,
        "endTime": 190.5,
        "text": "Medicine, law, business, engineering, these are noble pursuits and necessary to sustain life. But poetry, beauty, romance, love, these are what we stay alive for.",
        "translationVi": "Y học, luật pháp, kinh doanh, kỹ thuật, đây là những hoài bão cao quý và cần thiết để duy trì sự sống. Nhưng thi ca, vẻ đẹp, sự lãng mạn, tình yêu, đó mới là những điều chúng ta sống vì chúng.",
        "ipaUs": "/ˈmɛdɪsən, lɔː, ˈbɪznəs, ˌɛndʒəˈnɪrɪŋ, ðiːz ɑːr ˈnoʊbəl pərˈsuːts ænd ˈnɛsəˌsɛri tuː səˈsteɪn laɪf. bʌt ˈpoʊɪtri, ˈbjuːti, roʊˈmæns, lʌv, ðiːz ɑːr wʌt wiː steɪ əˈlaɪv fɔːr./",
        "keywords": ["noble pursuits", "sustain life", "stay alive for"],
        "explanationAi": "Phân biệt sâu sắc giữa 'sustain life' (duy trì sinh tồn thể xác) và 'what we stay alive for' (lý do và ý nghĩa đích thực để sống).",
        "properNouns": []
    }
]

questions_03 = [
    {
        "id": "q_mov_insp_03_1",
        "question": "Why does John Keating order his students to rip the introduction page out of their books?",
        "questionVi": "Tại sao thầy giáo John Keating lại yêu cầu học sinh xé toạc trang giới thiệu trong sách?",
        "options": [
            "Because he rejects the rigid, mathematical attempt to grade and measure poetry like a technical calculation",
            "Because the book contained multiple printer typographical errors",
            "Because the school principal ordered him to use a different textbook edition",
            "Because the students failed to memorize the poem before class"
        ],
        "optionsVi": [
            "Bởi vì thầy bác bỏ nỗ lực máy móc, toán học hóa nhằm chấm điểm và đo lường thi ca như một bài tính kỹ thuật",
            "Bởi vì cuốn sách chứa nhiều lỗi in ấn của nhà xuất bản",
            "Bởi vì hiệu trưởng yêu cầu dùng một phiên bản sách khác",
            "Bởi vì học sinh không thuộc thơ trước giờ lên lớp"
        ],
        "correctAnswer": 0,
        "explanation": "Keating believes poetry is born from passion and the human spirit, not mechanical coordinate graphs.",
        "explanationVi": "Thầy Keating tin rằng thơ ca xuất phát từ tâm hồn và đam mê, không phải đồ thị toạ độ cơ học.",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Educational Philosophy",
        "targetedConceptVi": "Triết lý giáo dục nhân văn"
    },
    {
        "id": "q_mov_insp_03_2",
        "question": "What distinction does Keating make between fields like medicine or business and fields like poetry or romance?",
        "questionVi": "Thầy Keating chỉ ra sự khác biệt nào giữa ngành nghề như y khoa, kinh doanh và thi ca, tình yêu?",
        "options": [
            "Medicine and business sustain biological life, but poetry and love are what make life worth living",
            "Medicine earns more financial income than literature and creative writing",
            "Business requires physical strength whereas poetry only needs patience",
            "Law is outdated while engineering is modern"
        ],
        "optionsVi": [
            "Y khoa và kinh doanh duy trì sự sống sinh học, còn thi ca và tình yêu mới là điều khiến cuộc sống đáng sống",
            "Y khoa kiếm nhiều tiền hơn so với viết văn sáng tạo",
            "Kinh doanh đòi hỏi thể lực còn làm thơ chỉ cần kiên nhẫn",
            "Luật pháp đã lỗi thời trong khi kỹ thuật hiện đại hơn"
        ],
        "correctAnswer": 0,
        "explanation": "Keating eloquently summarizes: 'Medicine, law, business, engineering... are necessary to sustain life. But poetry, beauty, romance, love, these are what we stay alive for.'",
        "explanationVi": "Keating đúc kết: Y học, luật, kinh doanh giúp duy trì sự sống, nhưng thi ca và tình yêu mới là lý do ta sống.",
        "referenceSegmentIndex": 5,
        "targetedConcept": "Philosophical Distinction",
        "targetedConceptVi": "Phân định triết học sâu sắc"
    }
]

# ============================================================================
# 4. mov_insp_04: The Shawshank Redemption
# ============================================================================
cfg_04 = {
    "id": "mov_insp_04",
    "slug": "shawshank-redemption-get-busy-living-pacific",
    "var_lesson": "LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC",
    "var_quiz": "QUIZ_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC",
    "file": "lesson_shawshank_redemption_get_busy_living_pacific.ts",
    "externalId": "accOHNw_qX8",
    "title": "The Shawshank Redemption: Hope & Choice Words",
    "durationSeconds": 3312,
    "durationFormatted": "55:12",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 130,
    "viewCount": 9828423,
    "studyCount": 7150,
    "description": "Kiệt tác điện ảnh vĩ đại nhất mọi thời đại về sức mạnh của Hy Vọng (Hope) và tinh thần tự do bất diệt. Lời thoại bất hủ của Andy Dufresne và Red: 'Get busy living, or get busy dying' (Bận rộn để sống, hay bận rộn để chết dần mòn).",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_04 = [
    {
        "orderIndex": 0,
        "startTime": 45.0,
        "endTime": 58.5,
        "text": "I have no idea to this day what those two Italian ladies were singing about. Truth is, I don't want to know.",
        "translationVi": "Cho đến tận ngày hôm nay, tôi vẫn chẳng hiểu hai quý cô người Ý đó hát về điều gì. Sự thật là, tôi cũng chẳng muốn biết.",
        "ipaUs": "/aɪ hæv noʊ aɪˈdiːə tuː ðɪs deɪ wʌt ðoʊz tuː ɪˈtæljən ˈleɪdiz wɜːr ˈsɪŋɪŋ əˈbaʊt. truːθ ɪz, aɪ doʊnt wɑːnt tuː noʊ./",
        "keywords": ["no idea to this day", "Italian ladies", "truth is"],
        "explanationAi": "Red hồi tưởng lại khoảnh khắc Andy phát khúc ca Mozart qua loa phát thanh toàn trại giam Shawshank.",
        "properNouns": ["Italian"]
    },
    {
        "orderIndex": 1,
        "startTime": 59.0,
        "endTime": 73.0,
        "text": "Some things are best left unsaid. I'd like to think they were singing about something so beautiful it can't be expressed in words, and makes your heart ache because of it.",
        "translationVi": "Có những điều tốt nhất là không nên nói ra thành lời. Tôi muốn tin rằng họ hát về một điều gì đó đẹp đẽ đến mức ngôn từ không thể diễn tả, và khiến trái tim bạn phải nhói đau vì nó.",
        "ipaUs": "/sʌm θɪŋz ɑːr bɛst lɛft ʌnˈsɛd. aɪd laɪk tuː θɪŋk ðeɪ wɜːr ˈsɪŋɪŋ əˈbaʊt ˈsʌmθɪŋ soʊ ˈbjuːtɪfəl ɪt kænt biː ɪkˈsprɛst ɪn wɜːrdz, ænd meɪks jɔːr hɑːrt eɪk bɪˈkɔːz əv ɪt./",
        "keywords": ["best left unsaid", "heart ache", "expressed in words"],
        "explanationAi": "Cụm thành ngữ 'best left unsaid' (tốt hơn hết là để thầm lặng). Nhấn mạnh sức mạnh phi ngôn ngữ của cái đẹp nghệ thuật.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 74.0,
        "endTime": 88.5,
        "text": "Those voices soared higher and farther than anybody in a gray place dares to dream. It was like some beautiful bird flapped into our drab little cage and made those walls dissolve away.",
        "translationVi": "Những thanh âm ấy bay vút lên cao hơn và xa hơn bất cứ điều gì mà những con người trong chốn xám xịt này dám mơ ước. Nó tựa như một cánh chim tuyệt đẹp bay lượn vào lồng giam tù túng và làm những bức tường kia tan biến.",
        "ipaUs": "/ðoʊz ˈvɔɪsɪz sɔːrd ˈhaɪər ænd ˈfɑːrðər ðæn ˈɛniˌbɑːdi ɪn ə ɡreɪ pleɪs dɛrz tuː driːm. ɪt wʌz laɪk sʌm ˈbjuːtɪfəl bɜːrd flæpt ˈɪntuː ˈaʊər dræb ˈlɪtl̩ keɪdʒ ænd meɪd ðoʊz wɔːlz dɪˈzɑːlv əˈweɪ./",
        "keywords": ["soared higher", "gray place", "drab little cage", "dissolve away"],
        "explanationAi": "Hình ảnh ẩn dụ kỳ vĩ: 'bird flapped into our drab little cage', phá vỡ ranh giới giam cầm của tâm hồn.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 120.0,
        "endTime": 133.5,
        "text": "There are places in this world that aren't made out of stone. That there's something inside that they can't get to, that they can't touch. That's yours. — What are you talking about? — Hope.",
        "translationVi": "Có những nơi trên cõi đời này không được xây bằng đá. Nơi có một thứ gì đó sâu thẳm bên trong mà họ không thể chạm tới, không thể vươn tới được. Đó là của bạn. — Cậu đang nói về điều gì thế? — Hy vọng.",
        "ipaUs": "/ðɛr ɑːr ˈpleɪsɪz ɪn ðɪs wɜːrld ðæt ɑːrnt meɪd aʊt əv stoʊn. ðæt ðɛrz ˈsʌmθɪŋ ɪnˈsaɪd ðæt ðeɪ kænt ɡɛt tuː, ðæt ðeɪ kænt tʌtʃ. ðæts jɔːrz. — wʌt ɑːr juː ˈtɔːkɪŋ əˈbaʊt? — hoʊp./",
        "keywords": ["made out of stone", "can't touch", "Hope"],
        "explanationAi": "Andy khẳng định sự tự do nội tâm bất khả xâm phạm trước mọi chấn song nhà tù.",
        "properNouns": []
    },
    {
        "orderIndex": 4,
        "startTime": 180.0,
        "endTime": 192.5,
        "text": "Remember Red, hope is a good thing, maybe the best of things, and no good thing ever dies. Get busy living, or get busy dying.",
        "translationVi": "Hãy nhớ nhé Red, hy vọng là một điều tốt đẹp, có thể là điều tốt đẹp nhất, và không điều tốt đẹp nào phải chết cả. Bận rộn để sống, hay bận rộn để chết dần mòn.",
        "ipaUs": "/rɪˈmɛmbər rɛd, hoʊp ɪz ə ɡʊd θɪŋ, ˈmeɪbi ðə bɛst əv θɪŋz, ænd noʊ ɡʊd θɪŋ ˈɛvər daɪz. ɡɛt ˈbɪzi ˈlɪvɪŋ, ɔːr ɡɛt ˈbɪzi ˈdaɪɪŋ./",
        "keywords": ["hope is a good thing", "no good thing ever dies", "get busy living"],
        "explanationAi": "Châm ngôn sống huyền thoại: 'Get busy living, or get busy dying'. Lựa chọn chủ động đứng lên tìm kiếm tự do.",
        "properNouns": ["Red"]
    }
]

questions_04 = [
    {
        "id": "q_mov_insp_04_1",
        "question": "What metaphor does Red use to describe the Mozart opera playing through the prison speakers?",
        "questionVi": "Red đã sử dụng hình ảnh ẩn dụ nào để miêu tả bản nhạc opera Mozart phát qua loa nhà tù?",
        "options": [
            "A beautiful bird flying into their drab cage and dissolving the prison walls away",
            "A violent storm shaking the foundations of the prison courtyard",
            "A loud military bell signaling the end of inspection",
            "A forgotten memory from their childhood school days"
        ],
        "optionsVi": [
            "Một chú chim tuyệt đẹp bay vào chiếc lồng giam u ám và làm tan biến những bức tường nhà tù",
            "Một cơn bão dữ dội làm rung chuyển sân trại giam",
            "Một tiếng chuông quân sự inh ỏi báo hiệu kết thúc giờ điểm danh",
            "Một ký ức bị lãng quên từ thời còn đi học"
        ],
        "correctAnswer": 0,
        "explanation": "Red says: 'It was like some beautiful bird flapped into our drab little cage and made those walls dissolve away.'",
        "explanationVi": "Red miêu tả: Như một chú chim tuyệt đẹp bay lượn vào lồng giam tù túng và làm những bức tường kia tan biến.",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Metaphorical Analysis",
        "targetedConceptVi": "Phân tích nghệ thuật ẩn dụ"
    },
    {
        "id": "q_mov_insp_04_2",
        "question": "According to Andy's famous letter, what quality does 'hope' possess?",
        "questionVi": "Theo bức thư nổi tiếng của Andy, 'hy vọng' sở hữu phẩm chất gì?",
        "options": [
            "It is a dangerous delusion that always leads to despair",
            "It is a good thing, maybe the best of things, and no good thing ever dies",
            "It is only useful for people who have wealth and political connections",
            "It will fade away gradually as years pass inside stone walls"
        ],
        "optionsVi": [
            "Đó là một ảo tưởng nguy hiểm luôn dẫn đến tuyệt vọng",
            "Đó là một điều tốt đẹp, có thể là điều tốt đẹp nhất, và không điều tốt đẹp nào phải chết cả",
            "Nó chỉ hữu ích với những ai có tiền tài và quan hệ chính trị",
            "Nó sẽ dần phai nhạt theo năm tháng sau những bức tường đá"
        ],
        "correctAnswer": 1,
        "explanation": "Andy writes: 'Hope is a good thing, maybe the best of things, and no good thing ever dies.'",
        "explanationVi": "Andy viết: 'Hy vọng là một điều tốt đẹp, có thể là điều tốt nhất, và không điều tốt đẹp nào phải chết.'",
        "referenceSegmentIndex": 4,
        "targetedConcept": "Core Moral Message",
        "targetedConceptVi": "Thông điệp đạo đức cốt lõi"
    }
]

# ============================================================================
# 5. mov_insp_05: Forrest Gump
# ============================================================================
cfg_05 = {
    "id": "mov_insp_05",
    "slug": "forrest-gump-box-of-chocolates-jennys-grave",
    "var_lesson": "LESSON_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE",
    "var_quiz": "QUIZ_FORREST_GUMP_BOX_OF_CHOCOLATES_JENNYS_GRAVE",
    "file": "lesson_forrest_gump_box_of_chocolates_jennys_grave.ts",
    "externalId": "QmMHP6JxU4s",
    "title": "Forrest Gump: Tom Hanks on Becoming Gump & Life is Like a Box of Chocolates",
    "durationSeconds": 396,
    "durationFormatted": "06:36",
    "cefrLevel": "B1",
    "accent": "American",
    "wpmSpeed": 122,
    "viewCount": 15177691,
    "studyCount": 8200,
    "description": "Tom Hanks chia sẻ trực tiếp về phân cảnh và câu nói bất hủ đã định hình văn hóa đại chúng: 'Mẹ tôi luôn nói, cuộc đời như một hộp kẹo sô-cô-la. Bạn sẽ không bao giờ biết trước mình sẽ nhận được viên kẹo nào.'",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_05 = [
    {
        "orderIndex": 0,
        "startTime": 15.0,
        "endTime": 28.5,
        "text": "My mama always said, 'Life was like a box of chocolates. You never know what you're gonna get.'",
        "translationVi": "Mẹ tôi luôn nói: 'Cuộc đời như một hộp sô-cô-la. Con chẳng bao giờ biết trước mình sẽ nhận được viên kẹo nào.'",
        "ipaUs": "/maɪ ˈmɑːmə ˈɔːlweɪz sɛd, laɪf wʌz laɪk ə bɑːks əv ˈtʃɑːkləts. juː ˈnɛvər noʊ wʌt jʊr ˈɡɑːnə ɡɛt./",
        "keywords": ["box of chocolates", "never know", "gonna get"],
        "explanationAi": "Câu thoại nổi tiếng nhất lịch sử điện ảnh thể hiện thái độ đón nhận bất ngờ của cuộc sống với sự bao dung và lạc quan.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 45.0,
        "endTime": 58.0,
        "text": "Mama always had a way of explaining things so I could understand them. You have to do the best with what God gave you.",
        "translationVi": "Mẹ luôn có cách giải thích mọi việc thật giản dị để tôi có thể hiểu được. Con phải nỗ lực hết mình với những gì Chúa đã ban cho con.",
        "ipaUs": "/ˈmɑːmə ˈɔːlweɪz hæd ə weɪ əv ɪkˈspleɪnɪŋ θɪŋz soʊ aɪ kʊd ˌʌndərˈstænd ðɛm. juː hæv tuː duː ðə bɛst wɪð wʌt ɡɑːd ɡeɪv juː./",
        "keywords": ["a way of explaining", "do the best with", "God gave you"],
        "explanationAi": "Cấu trúc 'do the best with what you have': tối ưu hóa năng lực bản thân thay vì than vãn.",
        "properNouns": ["God"]
    },
    {
        "orderIndex": 2,
        "startTime": 110.0,
        "endTime": 125.0,
        "text": "I don't know if we each have a destiny, or if we're all just floating around accidental-like on a breeze.",
        "translationVi": "Tôi không rõ liệu mỗi chúng ta có một số phận định sẵn, hay tất cả chúng ta chỉ đang trôi dạt ngẫu nhiên theo một làn gió.",
        "ipaUs": "/aɪ doʊnt noʊ ɪf wiː iːtʃ hæv ə ˈdɛstɪni, ɔːr ɪf wɪr ɔːl dʒʌst ˈfloʊtɪŋ əˈraʊnd ˌæksəˈdɛntl̩ laɪk ɑːn ə briːz./",
        "keywords": ["have a destiny", "floating around", "accidental-like", "on a breeze"],
        "explanationAi": "Hình tượng chiếc lông vũ bay lơ lửng mở đầu và kết thúc phim, tượng trưng cho sự đan xen giữa định mệnh và sự ngẫu nhiên.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 126.0,
        "endTime": 139.5,
        "text": "I think maybe it's both. Maybe both is happening at the same time. I miss you, Jenny. If there's anything you need, I won't be far away.",
        "translationVi": "Tôi nghĩ có lẽ là cả hai. Có lẽ cả hai điều đều đang diễn ra cùng một lúc. Anh nhớ em, Jenny. Nếu em cần bất cứ điều gì, anh sẽ không ở đâu xa.",
        "ipaUs": "/aɪ θɪŋk ˈmeɪbi ɪts boʊθ. ˈmeɪbi boʊθ ɪz ˈhæpənɪŋ æt ðə seɪm taɪm. aɪ mɪs juː, ˈdʒɛni. ɪf ðɛrz ˈɛniˌθɪŋ juː niːd, aɪ woʊnt biː fɑːr əˈweɪ./",
        "keywords": ["at the same time", "I won't be far away", "both is happening"],
        "explanationAi": "Sự thông thái thuần khiết của Forrest: chấp nhận cả hai mặt của thực tại mà không cần phán xét phức tạp.",
        "properNouns": ["Jenny"]
    }
]

questions_05 = [
    {
        "id": "q_mov_insp_05_1",
        "question": "What is the philosophical meaning of the 'box of chocolates' metaphor?",
        "questionVi": "Ý nghĩa triết lý của hình ảnh ẩn dụ 'hộp kẹo sô-cô-la' là gì?",
        "options": [
            "Life is unpredictable, and we must accept whatever circumstances come our way with gratitude",
            "People should always buy luxury candy during holidays",
            "Every person has a sweet personality if given enough compliments",
            "Future success can be measured by monetary wealth"
        ],
        "optionsVi": [
            "Cuộc đời là không thể lường trước, và ta cần đón nhận mọi biến cố xảy đến với lòng biết ơn",
            "Mọi người nên mua kẹo đắt tiền vào dịp lễ tết",
            "Mỗi người đều có tính cách ngọt ngào nếu được khen ngợi",
            "Thành công trong tương lai có thể đo đếm bằng tiền bạc"
        ],
        "correctAnswer": 0,
        "explanation": "The metaphor emphasizes that life is full of unexpected surprises and unpredictable journeys.",
        "explanationVi": "Ẩn dụ nhấn mạnh cuộc sống luôn ngập tràn những ngã rẽ và bất ngờ khó đoán định.",
        "referenceSegmentIndex": 0,
        "targetedConcept": "Metaphorical Meaning",
        "targetedConceptVi": "Ý nghĩa ẩn dụ triết lý"
    }
]

# ============================================================================
# 6. mov_insp_06: The Intern
# ============================================================================
cfg_06 = {
    "id": "mov_insp_06",
    "slug": "the-intern-ben-whittacker-gentleman-wisdom",
    "var_lesson": "LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM",
    "var_quiz": "QUIZ_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM",
    "file": "lesson_the_intern_ben_whittacker_gentleman_wisdom.ts",
    "externalId": "XVYZxarPOhM",
    "title": "The Intern: Ben Whittacker Ultimate Gentleman Wisdom",
    "durationSeconds": 1892,
    "durationFormatted": "31:32",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 136,
    "viewCount": 835439,
    "studyCount": 5120,
    "description": "Quý ông Ben Whittaker (Robert De Niro) 70 tuổi tái xuất với vai trò thực tập sinh cao tuổi tại công ty thời trang khởi nghiệp, đem đến sự điềm đạm, phong cách quý ông cổ điển và bài học: 'Trải nghiệm cuộc đời không bao giờ lỗi thời.'",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_06 = [
    {
        "orderIndex": 0,
        "startTime": 20.0,
        "endTime": 34.5,
        "text": "Retirement is an ongoing, relentless effort in creativity. I tried everything: golf, books, movies, pinochle. The problem is, anywhere you go, you're on your own.",
        "translationVi": "Nghỉ hưu là một nỗ lực sáng tạo liên tục và không ngừng nghỉ. Tôi đã thử mọi thứ: đánh golf, đọc sách, xem phim, chơi bài. Vấn đề là, đi đâu bạn cũng chỉ có một mình.",
        "ipaUs": "/rɪˈtaɪərmənt ɪz ən ˈɑːnˌɡoʊɪŋ, rɪˈlɛntləs ˈɛfərt ɪn ˌkriːeɪˈtɪvəti. aɪ traɪd ˈɛvriˌθɪŋ: ɡɑːlf, bʊks, ˈmuːviz, ˈpiːnʌkl̩. ðə ˈprɑːbləm ɪz, ˈɛniˌwɛr juː ɡoʊ, jʊr ɑːn jɔːr oʊn./",
        "keywords": ["ongoing, relentless effort", "retirement", "on your own"],
        "explanationAi": "Cặp tính từ miêu tả cường độ cao 'ongoing, relentless' nhấn mạnh sự tìm kiếm ý nghĩa sống không dừng lại ở tuổi già.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 55.0,
        "endTime": 69.5,
        "text": "Musicians don't retire; they stop when there's no more music in them. Well, I still have music in me, absolutely, without a doubt.",
        "translationVi": "Những nhạc sĩ đâu có nghỉ hưu; họ chỉ dừng lại khi không còn âm nhạc bên trong tâm hồn mình. Và tôi, tôi chắc chắn vẫn còn âm nhạc dạt dào bên trong mình.",
        "ipaUs": "/mjuːˈzɪʃənz doʊnt rɪˈtaɪər; ðeɪ stɑːp wɛn ðɛrz noʊ mɔːr ˈmjuːzɪk ɪn ðɛm. wɛl, aɪ stɪl hæv ˈmjuːzɪk ɪn miː, ˌæbsəˈluːtli, wɪðˈaʊt ə daʊt./",
        "keywords": ["music in them", "without a doubt", "absolutely"],
        "explanationAi": "Trích dẫn triết lý nổi tiếng của Louis Armstrong: 'music in you' đại diện cho niềm đam mê và khát khao cống hiến cho đời.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 140.0,
        "endTime": 155.0,
        "text": "Why do men carry handkerchiefs? One of the last vestiges of the chivalrous gent. It's for offering to a woman when she cries, not for yourself.",
        "translationVi": "Tại sao đàn ông lại mang theo khăn tay? Đó là một trong những tàn tích cuối cùng của phong thái quý ông hiệp sĩ. Khăn tay là để trao cho một người phụ nữ khi cô ấy khóc, chứ không phải cho chính mình.",
        "ipaUs": "/waɪ duː mɛn ˈkæri ˈhæŋkərtʃɪfs? wʌn əv ðə læst ˈvɛstɪdʒɪz əv ðə ˈʃɪvəlrəs dʒɛnt. ɪts fɔːr ˈɔːfərɪŋ tuː ə ˈwʊmən wɛn ʃiː kraɪz, nɑːt fɔːr jərˈsɛlf./",
        "keywords": ["vestiges", "chivalrous gent", "offering to a woman"],
        "explanationAi": "Từ vựng thanh lịch: 'vestiges' (dấu tích còn sót lại), 'chivalrous' (hào hiệp, ga-lăng theo chuẩn mực quý tộc).",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 230.0,
        "endTime": 244.5,
        "text": "Experience never gets old. Don't ever doubt yourself or think you need someone else to validate what you built with your own two hands.",
        "translationVi": "Kinh nghiệm trải đời không bao giờ trở nên cũ kỹ. Đừng bao giờ hoài nghi bản thân hay nghĩ rằng cô cần ai khác công nhận những gì cô đã tự tay gầy dựng.",
        "ipaUs": "/ɪkˈspɪriəns ˈnɛvər ɡɛts oʊld. doʊnt ˈɛvər daʊt jərˈsɛlf ɔːr θɪŋk juː niːd ˈsʌmˌwʌn ɛls tuː ˈvælɪdeɪt wʌt juː bɪlt wɪð jɔːr oʊn tuː hændz./",
        "keywords": ["experience never gets old", "doubt yourself", "validate"],
        "explanationAi": "Thông điệp cốt lõi của bộ phim: sự kết hợp hoàn hảo giữa năng lượng trẻ trung sáng tạo và kinh nghiệm điềm tĩnh.",
        "properNouns": []
    }
]

questions_06 = [
    {
        "id": "q_mov_insp_06_1",
        "question": "What does Ben mean by quoting the line that 'musicians stop when there is no more music in them'?",
        "questionVi": "Ben có ý gì khi trích dẫn câu nói 'nhạc sĩ chỉ dừng lại khi không còn âm nhạc bên trong tâm hồn'?",
        "options": [
            "He still possesses energy, enthusiasm, and a profound desire to contribute to the world",
            "He wants to start an instrumental jazz band in his neighborhood",
            "He used to play the piano professionally before his retirement",
            "He believes only artists have true job security in modern society"
        ],
        "optionsVi": [
            "Ông vẫn tràn đầy năng lượng, nhiệt huyết và khát khao cống hiến cho xã hội",
            "Ông muốn thành lập một ban nhạc jazz tại khu phố",
            "Ông từng là nghệ sĩ dương cầm chuyên nghiệp trước khi nghỉ hưu",
            "Ông tin chỉ có nghệ sĩ mới có sự nghiệp ổn định trong thời hiện đại"
        ],
        "correctAnswer": 0,
        "explanation": "Ben uses the metaphor to express that he still has vitality, purpose, and capability to work and connect with people.",
        "explanationVi": "Ben dùng ẩn dụ để thể hiện ông vẫn tràn trề sức sống, ý chí cống hiến và năng lực kết nối với xã hội.",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Metaphorical Interpretation",
        "targetedConceptVi": "Diễn giải ẩn dụ tinh tế"
    }
]

# Generate all 6 lessons
all_6 = [
    (cfg_01, segments_01, questions_01),
    (cfg_02, segments_02, questions_02),
    (cfg_03, segments_03, questions_03),
    (cfg_04, segments_04, questions_04),
    (cfg_05, segments_05, questions_05),
    (cfg_06, segments_06, questions_06),
]

for cfg, segs, qs in all_6:
    content = generate_ts_lesson(cfg, segs, qs)
    path = os.path.join(target_dir, cfg["file"])
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {cfg['file']}")
