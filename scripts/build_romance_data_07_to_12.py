# scripts/build_romance_data_07_to_12.py
import os
from build_lessons_engine import generate_ts_lesson

target_dir = "features/listening/data/lessons/movies/romance"
os.makedirs(target_dir, exist_ok=True)

# ============================================================================
# 7. ONE DAY (mov_rom_07)
# ============================================================================
cfg_07 = {
    "id": "mov_rom_07",
    "slug": "one-day-emma-dexter-love-story",
    "var_lesson": "LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY",
    "var_quiz": "QUIZ_ONE_DAY_EMMA_DEXTER_LOVE_STORY",
    "file": "lesson_one_day_emma_dexter_love_story.ts",
    "externalId": "ESI7jRy2yAk",
    "title": "One Day: Emma & Dexter's Enduring Romance Across Decades",
    "durationSeconds": 604,
    "durationFormatted": "10:04",
    "cefrLevel": "B2",
    "accent": "British (RP / Northern)",
    "wpmSpeed": 136,
    "viewCount": 2306260,
    "studyCount": 3450,
    "description": "Bản tình ca bất hủ chuyển thể từ tiểu thuyết One Day của David Nicholls: Emma Morley và Dexter Mayhew qua từng mốc ngày 15 tháng 7, những lời hẹn ước dang dở và tình yêu khắc cốt ghi tâm kéo dài suốt hai thập kỷ.",
}

segments_07 = [
    {
        "orderIndex": 0,
        "startTime": 136.0,
        "endTime": 152.6,
        "text": "If you muck me about, Dexter, I swear I will murder you. Do you swear? — Yeah, I swear. I swear.",
        "translationVi": "Nếu anh giở trò đùa giỡn tình cảm với em, Dexter, em thề là em sẽ giết anh đấy. Anh có thề không? — Có, anh thề. Anh thề danh dự đấy.",
        "ipaUs": "/ɪf juː mʌk miː əˈbaʊt, ˈdɛkstər, aɪ swɛər aɪ wɪl ˈmɜːrdər juː. duː juː swɛər? — jæ, aɪ swɛər. aɪ swɛər./",
        "keywords": ["muck about", "swear", "murder you"],
        "explanationAi": "Thành ngữ tiếng lóng Anh-Anh 'muck someone about' có nghĩa là đùa cợt, làm lãng phí thời gian hoặc làm ai đó tổn thương trong tình cảm.",
        "properNouns": ["Dexter"],
        "tokenCount": 24
    },
    {
        "orderIndex": 1,
        "startTime": 186.3,
        "endTime": 200.0,
        "text": "I want a child with the man I love. And if he won't do it, then I want one with you. — Well then, we'd better get started.",
        "translationVi": "Em muốn có một đứa con với người đàn ông em yêu. Và nếu anh ấy không chịu, thì em muốn có con với anh. — Thế thì chúng ta nên bắt đầu ngay thôi.",
        "ipaUs": "/aɪ wɑːnt ə tʃaɪld wɪð ðə mæn aɪ lʌv. ænd ɪf hiː woʊnt duː ɪt, ðɛn aɪ wɑːnt wʌn wɪð juː. — wɛl ðɛn, wiːd ˈbɛtər ɡɛt ˈstɑːrtɪd./",
        "keywords": ["man I love", "with you", "better get started"],
        "explanationAi": "Lời thổ lộ tình cảm gián tiếp nhưng vô cùng sâu sắc của Emma dành cho Dexter sau bao năm làm bạn thân.",
        "properNouns": [],
        "tokenCount": 27
    },
    {
        "orderIndex": 2,
        "startTime": 335.1,
        "endTime": 348.0,
        "text": "I don't want you thinking I'm bothered or anything about last night. I don't want your phone number, or letters, or postcards. I don't want to get married to you.",
        "translationVi": "Em không muốn anh nghĩ là em bận tâm hay vương vấn điều gì về đêm qua đâu nhé. Em chẳng cần số điện thoại, thư từ hay bưu thiếp của anh. Em cũng chẳng thèm cưới anh đâu.",
        "ipaUs": "/aɪ doʊnt wɑːnt juː ˈθɪŋkɪŋ aɪm ˈbɑːðərd ɔːr ˈɛniθɪŋ əˈbaʊt læst naɪt. aɪ doʊnt wɑːnt jʊər foʊn ˈnʌmbər, ɔːr ˈlɛtərz, ɔːr ˈpoʊstkɑːrdz. aɪ doʊnt wɑːnt tuː ɡɛt ˈmærid tuː juː./",
        "keywords": ["bothered", "postcards", "married to you"],
        "explanationAi": "Lời phủ nhận mạnh mẽ nhưng che giấu sự rung động đầu đời của Emma trên đồi Arthur's Seat ở Edinburgh ngày 15/7/1988.",
        "properNouns": ["Edinburgh"],
        "tokenCount": 33
    },
    {
        "orderIndex": 3,
        "startTime": 348.0,
        "endTime": 365.0,
        "text": "Whatever happens tomorrow, we had today. And if we should bump into each other sometime in the future, well that's fine too. We'll be friends.",
        "translationVi": "Dù ngày mai có ra sao đi nữa, thì chúng ta đã có trọn vẹn ngày hôm nay. Và nếu sau này ta có tình cờ chạm mặt nhau trong tương lai, thì cũng tốt thôi. Ta sẽ là bạn bè.",
        "ipaUs": "/wʌtˈɛvər ˈhæpənz təˈmɔːroʊ, wiː hæd təˈdeɪ. ænd ɪf wiː ʃʊd bʌmp ˈɪntuː iːtʃ ˈʌðər ˈsʌmˌtaɪm ɪn ðə ˈfjuːtʃər, wɛl ðæts faɪn tuː. wiːl biː frɛndz./",
        "keywords": ["we had today", "bump into", "we'll be friends"],
        "explanationAi": "Thông điệp tiêu đề của tiểu thuyết: 'Whatever happens tomorrow, we had today' (Dù ngày mai thế nào, chúng ta đã có ngày hôm nay).",
        "properNouns": [],
        "tokenCount": 27
    },
    {
        "orderIndex": 4,
        "startTime": 560.5,
        "endTime": 571.4,
        "text": "Look, I've got to go. — I know. But we will see each other again. — I know we will.",
        "translationVi": "Kìa, em phải đi rồi. — Anh biết. Nhưng chúng mình chắc chắn sẽ gặp lại nhau mà. — Em biết là ta sẽ gặp lại nhau.",
        "ipaUs": "/lʊk, aɪv ɡɑːt tuː ɡoʊ. — aɪ noʊ. bʌt wiː wɪl siː iːtʃ ˈʌðər əˈɡɛn. — aɪ noʊ wiː wɪl./",
        "keywords": ["see each other again", "I know we will"],
        "explanationAi": "Lời tạm biệt mở ra hai mươi năm định mệnh gắn kết giữa Emma và Dexter.",
        "properNouns": [],
        "tokenCount": 20
    }
]

questions_07 = [
    {
        "id": "mov_rom_07_q1",
        "question": "What core promise does Emma state on Arthur's Seat on July 15, 1988?",
        "questionVi": "Emma đã đưa ra lời hứa cốt lõi nào trên đồi Arthur's Seat vào ngày 15 tháng 7 năm 1988?",
        "options": [
            "They must move to London together the next day.",
            "'Whatever happens tomorrow, we had today.'",
            "They will never speak to each other again.",
            "Dexter must lend her money for college tuition."
        ],
        "optionsVi": [
            "Họ phải cùng nhau chuyển tới London ngay ngày hôm sau.",
            "'Dù ngày mai có ra sao đi nữa, chúng ta đã có trọn vẹn ngày hôm nay.'",
            "Họ sẽ không bao giờ nói chuyện với nhau nữa.",
            "Dexter phải cho cô vay tiền học phí đại học."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 3, Emma declares the thematic motto: 'Whatever happens tomorrow, we had today.'",
        "explanationVi": "Trong Phân đoạn 3, Emma thốt lên câu nói chủ đề của toàn tác phẩm: 'Dù ngày mai có ra sao đi nữa, chúng ta đã có ngày hôm nay.'",
        "targetedConcept": "Central philosophical theme of One Day",
        "targetedConceptVi": "Chủ đề triết lý trung tâm của One Day",
        "referenceSegmentIndex": 3
    },
    {
        "id": "mov_rom_07_q2",
        "question": "What does the British idiom 'muck someone about' mean in Segment 0?",
        "questionVi": "Thành ngữ Anh-Anh 'muck someone about' trong Phân đoạn 0 có nghĩa là gì?",
        "options": [
            "To help someone clean the garden.",
            "To treat someone deceitfully, mess around with their feelings, or waste their time.",
            "To invite someone to an expensive dinner.",
            "To take photographs of someone."
        ],
        "optionsVi": [
            "Giúp ai đó dọn dẹp vườn tược.",
            "Đối xử lừa dối, đùa giỡn tình cảm hoặc làm mất thời gian của ai đó.",
            "Mời ai đó một bữa tối thịnh soạn đắt tiền.",
            "Chụp ảnh cho một ai đó."
        ],
        "correctAnswer": 1,
        "explanation": "'Muck someone about' is British slang meaning to fool around, play with someone's emotions, or cause inconvenience.",
        "explanationVi": "'Muck someone about' là tiếng lóng của người Anh chỉ hành vi trêu đùa, đùa giỡn tình cảm hoặc lừa dối người khác.",
        "targetedConcept": "British slang and emotional idioms",
        "targetedConceptVi": "Tiếng lóng Anh và thành ngữ biểu đạt cảm xúc",
        "referenceSegmentIndex": 0
    }
]

f_07 = generate_ts_lesson(cfg_07, segments_07, questions_07)
with open(os.path.join(target_dir, cfg_07["file"]), "w", encoding="utf-8") as f:
    f.write(f_07)
print("Generated Lesson 07 successfully.")

# ============================================================================
# 8. 500 DAYS OF SUMMER (mov_rom_08)
# ============================================================================
cfg_08 = {
    "id": "mov_rom_08",
    "slug": "500-days-of-summer-expectations-vs-reality",
    "var_lesson": "LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY",
    "var_quiz": "QUIZ_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY",
    "file": "lesson_500_days_of_summer_expectations_vs_reality.ts",
    "externalId": "AS47hWRO0bw",
    "title": "500 Days of Summer: Top 10 Iconic Moments & Bittersweet Realities",
    "durationSeconds": 624,
    "durationFormatted": "10:24",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 138,
    "viewCount": 189663,
    "studyCount": 2980,
    "description": "Tuyển tập 10 phân cảnh kinh điển trong 500 Days of Summer: từ cuộc chạm mặt thang máy yêu thích nhóm The Smiths, buổi hẹn tại IKEA, cho đến bài học trưởng thành sâu sắc về tình yêu và định mệnh.",
}

segments_08 = [
    {
        "orderIndex": 0,
        "startTime": 1.0,
        "endTime": 13.7,
        "text": "It's a comedy with romance, but don't call it a romantic comedy. Counting down our picks for the top ten 500 Days of Summer moments.",
        "translationVi": "Đây là một bộ phim hài pha trộn tình cảm, nhưng xin đừng gọi nó là một bộ phim hài lãng mạn thông thường. Cùng đếm ngược 10 khoảnh khắc kinh điển nhất trong 500 Days of Summer.",
        "ipaUs": "/ɪts ə ˈkɑːmədi wɪð roʊˈmæns, bʌt doʊnt kɔːl ɪt ə roʊˈmæntɪk ˈkɑːmədi. ˈkaʊntɪŋ daʊn ˈaʊər pɪks fɔːr ðə tɑːp tɛn faɪv ˈhʌndrəd deɪz əv ˈsʌmər ˈmoʊmənts./",
        "keywords": ["romantic comedy", "counting down", "moments"],
        "explanationAi": "Lời mào đầu trứ danh phản ánh phong cách phá vỡ quy chuẩn (anti-romcom) của bộ phim.",
        "properNouns": ["500 Days of Summer"],
        "tokenCount": 24
    },
    {
        "orderIndex": 1,
        "startTime": 322.2,
        "endTime": 348.0,
        "text": "I love The Smiths. — Sorry? — I said I love The Smiths. To die by your side is such a heavenly way to die. I love them.",
        "translationVi": "Tôi mê nhóm The Smiths lắm. — Sao cơ? — Tôi bảo tôi rất thích The Smiths. 'Được chết bên cạnh em là một cách chết tuyệt vời tựa thiên đường'. Tôi cực kỳ yêu nhóm nhạc này.",
        "ipaUs": "/aɪ lʌv ðə smɪθs. — ˈsɑːri? — aɪ sɛd aɪ lʌv ðə smɪθs. tuː daɪ baɪ jʊər saɪd ɪz sʌtʃ ə ˈhɛvənli weɪ tuː daɪ. aɪ lʌv ðɛm./",
        "keywords": ["The Smiths", "heavenly way to die", "elevator"],
        "explanationAi": "Phân cảnh thang máy định mệnh: Summer ngâm nga lời bài hát 'There Is a Light That Never Goes Out' làm trái tim Tom xao xuyến.",
        "properNouns": ["The Smiths"],
        "tokenCount": 30
    },
    {
        "orderIndex": 2,
        "startTime": 266.3,
        "endTime": 295.9,
        "text": "I'm in love with Summer. I love her smile, her hair, the heart-shaped birthmark on her neck. Later: I hate Summer. I hate her crooked teeth, her 1960s haircut, her knobby knees.",
        "translationVi": "Tôi yêu Summer say đắm. Tôi yêu nụ cười, mái tóc và vết bớt hình trái tim trên cổ cô ấy. Sau khi chia tay: Tôi ghét Summer. Tôi ghét hàm răng khấp khểnh, kiểu tóc thập niên 60 và đầu gối củ lạc của cô ta.",
        "ipaUs": "/aɪm ɪn lʌv wɪð ˈsʌmər. aɪ lʌv hɜːr smaɪl, hɜːr hɛər, ðə hɑːrt ʃeɪpt ˈbɜːrθˌmɑːrk ɑːn hɜːr nɛk. ˈleɪtər: aɪ heɪt ˈsʌmər. aɪ heɪt hɜːr ˈkrʊkəd tiːθ, hɜːr ˌnaɪnˈtiːn ˈsɪkstiz ˈhɛərˌkʌt, hɜːr ˈnɑːbi niːz./",
        "keywords": ["crooked teeth", "birthmark", "fine line between love and hate"],
        "explanationAi": "Kỹ thuật tương phản xuất sắc (Love vs. Hate) chứng minh ranh giới mong manh giữa tình yêu lý tưởng hóa và nỗi thất vọng vỡ mộng.",
        "properNouns": ["Summer"],
        "tokenCount": 38
    },
    {
        "orderIndex": 3,
        "startTime": 479.4,
        "endTime": 492.2,
        "text": "I just woke up one day and I knew. — Knew what? — What I was never sure of with you.",
        "translationVi": "Một ngày nọ em thức dậy và em nhận ra. — Nhận ra điều gì cơ? — Điều mà khi ở bên anh em chưa bao giờ dám chắc chắn.",
        "ipaUs": "/aɪ dʒʌst woʊk ʌp wʌn deɪ ænd aɪ njuː. — njuː wɑːt? — wɑːt aɪ wʌz ˈnɛvər ʃʊr əv wɪð juː./",
        "keywords": ["woke up one day", "never sure of"],
        "explanationAi": "Lời giãi bày chân thực và đau nhói của Summer trên băng ghế công viên Ngày thứ 488: tình cảm không thể gượng ép bằng sự kỳ vọng một chiều.",
        "properNouns": [],
        "tokenCount": 20
    },
    {
        "orderIndex": 4,
        "startTime": 576.2,
        "endTime": 600.6,
        "text": "If there's one scene that epitomizes 500 Days of Summer, it's Expectations versus Reality in split screen. In one, Tom grows closer; in the other, he sits alone, shattered by her engagement ring.",
        "translationVi": "Nếu có một cảnh quay tiêu biểu cho toàn bộ 500 Days of Summer, đó chính là cảnh Kỳ vọng đối lập Thực tế trên màn hình phân đôi. Một bên là Tom tiến gần lại Summer; bên còn lại anh ngồi cô độc, bàng hoàng trước chiếc nhẫn đính hôn của cô.",
        "ipaUs": "/ɪf ðɛrz wʌn siːn ðæt ɪˈpɪtəˌmaɪzɪz faɪv ˈhʌndrəd deɪz əv ˈsʌmər, ɪts ˌɛkspɛkˈteɪʃənz ˈvɜːrsəs riˈæləti ɪn splɪt skriːn./",
        "keywords": ["epitomizes", "expectations versus reality", "split screen"],
        "explanationAi": "Thủ pháp điện ảnh kinh điển: màn hình chia đôi phân biệt giữa ảo tưởng lãng mạn chủ quan và sự thật phũ phàng.",
        "properNouns": ["Tom", "Summer"],
        "tokenCount": 35
    }
]

questions_08 = [
    {
        "id": "mov_rom_08_q1",
        "question": "What band sparks Tom's immediate infatuation with Summer in the elevator?",
        "questionVi": "Ban nhạc nào đã khơi dậy sự say đắm tức thì của Tom dành cho Summer trong thang máy?",
        "options": [
            "The Beatles",
            "The Smiths",
            "Pink Floyd",
            "Joy Division"
        ],
        "optionsVi": [
            "The Beatles",
            "The Smiths",
            "Pink Floyd",
            "Joy Division"
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 1, Summer hears Tom listening to The Smiths and quotes: 'To die by your side is such a heavenly way to die.'",
        "explanationVi": "Trong Phân đoạn 1, Summer nghe thấy Tom nghe The Smiths và trích lời bài hát: 'To die by your side is such a heavenly way to die.'",
        "targetedConcept": "Pop culture catalyst in modern romance",
        "targetedConceptVi": "Chất xúc tác văn hóa đại chúng trong phim tình cảm",
        "referenceSegmentIndex": 1
    },
    {
        "id": "mov_rom_08_q2",
        "question": "What cinematic technique is celebrated as the #1 moment for depicting Tom's heartbreak at the rooftop party?",
        "questionVi": "Thủ pháp điện ảnh nào được tôn vinh là khoảnh khắc số 1 mô tả nỗi tan vỡ của Tom tại bữa tiệc sân thượng?",
        "options": [
            "Black and white slow motion.",
            "Split-screen contrasting 'Expectations' with 'Reality'.",
            "First-person drone perspective.",
            "Animated musical comedy sequence."
        ],
        "optionsVi": [
            "Quay chậm đen trắng.",
            "Màn hình chia đôi đối lập giữa 'Kỳ vọng' và 'Thực tế'.",
            "Góc nhìn flycam ngôi thứ nhất.",
            "Hoạt hình ca nhạc hài hước."
        ],
        "correctAnswer": 1,
        "explanation": "Segment 4 highlights the famous split-screen scene showing Tom's idealized expectations on the left and the painful reality on the right.",
        "explanationVi": "Phân đoạn 4 tôn vinh cảnh màn hình chia đôi cho thấy kỳ vọng lý tưởng bên trái và thực tế đau đớn bên phải.",
        "targetedConcept": "Cinematic visual storytelling technique",
        "targetedConceptVi": "Kỹ thuật kể chuyện hình ảnh trong điện ảnh",
        "referenceSegmentIndex": 4
    }
]

f_08 = generate_ts_lesson(cfg_08, segments_08, questions_08)
with open(os.path.join(target_dir, cfg_08["file"]), "w", encoding="utf-8") as f:
    f.write(f_08)
print("Generated Lesson 08 successfully.")

# ============================================================================
# 9. TITANIC (mov_rom_09)
# ============================================================================
cfg_09 = {
    "id": "mov_rom_09",
    "slug": "titanic-flying-first-class-dinner-extended",
    "var_lesson": "LESSON_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED",
    "var_quiz": "QUIZ_TITANIC_FLYING_FIRST_CLASS_DINNER_EXTENDED",
    "file": "lesson_titanic_flying_first_class_dinner_extended.ts",
    "externalId": "OSqS2ESN_ys",
    "title": "Titanic: \"I'll Never Let Go\" - Jack and Rose's Heartbreaking Promise",
    "durationSeconds": 321,
    "durationFormatted": "05:21",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 126,
    "viewCount": 2080935,
    "studyCount": 6120,
    "description": "Phân cảnh kinh điển làm lay động hàng triệu trái tim thế giới trong Titanic: Giữa làn nước biển Bắc Đại Tây Dương băng giá, Jack truyền cho Rose nghị lực sống và lời hứa không bao giờ từ bỏ hy vọng trước khi chiếc thuyền cứu sinh quay trở lại.",
}

segments_09 = [
    {
        "orderIndex": 0,
        "startTime": 50.0,
        "endTime": 70.0,
        "text": "Is there anyone alive out there? Can anyone hear me? Is there anyone alive out there? We waited too long.",
        "translationVi": "Có ai ngoài kia còn sống không? Có ai nghe thấy tôi không? Có ai ngoài kia còn sống sót không? Chúng ta đã đợi quá lâu rồi.",
        "ipaUs": "/ɪz ðɛər ˈɛniwʌn əˈlaɪv aʊt ðɛər? kæn ˈɛniwʌn hɪər miː? ɪz ðɛər ˈɛniwʌn əˈlaɪv aʊt ðɛər? wiː ˈweɪtɪd tuː lɔːŋ./",
        "keywords": ["anyone alive", "hear me", "waited too long"],
        "explanationAi": "Tiếng gọi tuyệt vọng của sĩ quan Harold Lowe khi chiếc thuyền cứu sinh số 14 chèo quay trở lại tìm kiếm người sống sót giữa bóng đêm đại dương.",
        "properNouns": [],
        "tokenCount": 22
    },
    {
        "orderIndex": 1,
        "startTime": 168.0,
        "endTime": 184.0,
        "text": "Jack. There's a boat, Jack. Jack? Jack? Jack...",
        "translationVi": "Jack. Có thuyền kìa Jack. Jack ơi? Jack? Jack ơi...",
        "ipaUs": "/dʒæk. ðɛrz ə boʊt, dʒæk. dʒæk? dʒæk? dʒæk.../",
        "keywords": ["there's a boat", "Jack"],
        "explanationAi": "Giọng thều thào run rẩy trong cơn giá lạnh của Rose khi nhìn thấy ánh đèn cứu sinh le lói đằng xa.",
        "properNouns": ["Jack"],
        "tokenCount": 9
    },
    {
        "orderIndex": 2,
        "startTime": 197.0,
        "endTime": 213.0,
        "text": "Jack, there's a boat. Jack! Jack! Jack...",
        "translationVi": "Jack, có thuyền cứu sinh kìa. Jack! Jack! Jack ơi...",
        "ipaUs": "/dʒæk, ðɛrz ə boʊt. dʒæk! dʒæk! dʒæk.../",
        "keywords": ["boat", "Jack"],
        "explanationAi": "Rose cố lay bàn tay băng giá của Jack và nhận ra anh đã ra đi mãi mãi.",
        "properNouns": ["Jack"],
        "tokenCount": 8
    },
    {
        "orderIndex": 3,
        "startTime": 263.0,
        "endTime": 275.0,
        "text": "Come back! Can anyone hear me? Come back!",
        "translationVi": "Quay lại đây! Có ai nghe thấy tôi không? Quay lại đây với!",
        "ipaUs": "/kʌm bæk! kæn ˈɛniwʌn hɪər miː? kʌm bæk!/",
        "keywords": ["come back", "hear me"],
        "explanationAi": "Rose cố gắng cất tiếng gọi nhưng cổ họng khản đặc vì hạ thân nhiệt.",
        "properNouns": [],
        "tokenCount": 8
    },
    {
        "orderIndex": 4,
        "startTime": 275.0,
        "endTime": 295.0,
        "text": "I'll never let go. I promise. I'll never let go.",
        "translationVi": "Em sẽ không bao giờ buông tay đâu. Em hứa. Em sẽ không bao giờ buông tay.",
        "ipaUs": "/aɪl ˈnɛvər lɛt ɡoʊ. aɪ ˈprɑːmɪs. aɪl ˈnɛvər lɛt ɡoʊ./",
        "keywords": ["never let go", "I promise"],
        "explanationAi": "Lời thì thầm kinh điển nghẹn ngào của Rose khi hôn bàn tay Jack trước khi thả anh vào lòng đại dương và bơi đi tìm chiếc còi sinh tồn.",
        "properNouns": [],
        "tokenCount": 11
    }
]

questions_09 = [
    {
        "id": "mov_rom_09_q1",
        "question": "What sacred promise does Rose make to Jack before letting him slip into the Atlantic?",
        "questionVi": "Rose đã đưa ra lời hứa thiêng liêng nào với Jack trước khi để anh chìm vào biển Đại Tây Dương?",
        "options": [
            "She promises to return to England immediately.",
            "'I'll never let go. I promise. I'll never let go.'",
            "She promises to find his paintings in Paris.",
            "She promises to never marry anyone else."
        ],
        "optionsVi": [
            "Cô hứa sẽ quay trở về nước Anh ngay lập tức.",
            "'Em sẽ không bao giờ buông tay đâu. Em hứa. Em sẽ không bao giờ buông tay.'",
            "Cô hứa sẽ tìm lại các bức tranh của anh tại Paris.",
            "Cô hứa sẽ không bao giờ kết hôn với ai khác."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Rose gives her tearful vow: 'I'll never let go. I promise. I'll never let go.'",
        "explanationVi": "Trong Phân đoạn 4, Rose nghẹn ngào hứa: 'Em sẽ không bao giờ buông tay đâu. Em hứa. Em sẽ không bao giờ buông tay.'",
        "targetedConcept": "Climactic emotional vow in Titanic",
        "targetedConceptVi": "Lời hẹn ước cảm xúc đỉnh điểm trong Titanic",
        "referenceSegmentIndex": 4
    },
    {
        "id": "mov_rom_09_q2",
        "question": "How does Rose signal the rescue boat when her voice is too weak to be heard?",
        "questionVi": "Rose đã ra tín hiệu cho thuyền cứu hộ bằng cách nào khi giọng của cô quá yếu không thể hét lớn?",
        "options": [
            "She lights a flare.",
            "She swims to Officer Wilde's whistle and blows it repeatedly.",
            "She waves a flashlight.",
            "She splashes water into the air."
        ],
        "optionsVi": [
            "Cô đốt pháo sáng.",
            "Cô bơi tới lấy chiếc còi của sĩ quan Wilde và thổi liên hồi.",
            "Cô vẫy đèn pin.",
            "Cô đập nước bắn tung tóe vào không trung."
        ],
        "correctAnswer": 1,
        "explanation": "Rose swims to Chief Officer Wilde's body, takes his whistle, and blows it until the lifeboat hears her.",
        "explanationVi": "Rose bơi đến thi thể sĩ quan Wilde, lấy chiếc còi cứu hộ và thổi liên tục cho đến khi thuyền cứu sinh nghe thấy.",
        "targetedConcept": "Plot comprehension and survival action",
        "targetedConceptVi": "Nắm bắt chi tiết hành động sinh tồn trong phim",
        "referenceSegmentIndex": 3
    }
]

f_09 = generate_ts_lesson(cfg_09, segments_09, questions_09)
with open(os.path.join(target_dir, cfg_09["file"]), "w", encoding="utf-8") as f:
    f.write(f_09)
print("Generated Lesson 09 successfully.")

# ============================================================================
# 10. ETERNAL SUNSHINE (mov_rom_10)
# ============================================================================
cfg_10 = {
    "id": "mov_rom_10",
    "slug": "eternal-sunshine-meet-me-in-montauk",
    "var_lesson": "LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK",
    "var_quiz": "QUIZ_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK",
    "file": "lesson_eternal_sunshine_meet_me_in_montauk.ts",
    "externalId": "9lo1ncSInLI",
    "title": "Eternal Sunshine: Meet Me in Montauk - Joel and Clementine's Fading Memory",
    "durationSeconds": 315,
    "durationFormatted": "05:15",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 134,
    "viewCount": 141034,
    "studyCount": 2740,
    "description": "Phân cảnh xúc động và kỳ ảo bậc nhất trong Eternal Sunshine: Joel và Clementine cùng trú ẩn trong ngôi nhà ven biển Montauk đang dần tan biến trong ký ức, nơi Clementine thì thầm lời hẹn định mệnh: 'Meet me in Montauk'.",
}

segments_10 = [
    {
        "orderIndex": 0,
        "startTime": 30.0,
        "endTime": 41.0,
        "text": "At least I'm not barking up the wrong tree. — You know these people? — No, of course not. It's breaking and entering!",
        "translationVi": "Ít nhất thì tôi cũng không tán tỉnh nhầm người. — Cô có quen biết những người chủ nhà này không? — Không, dĩ nhiên là không rồi. Chúng ta đang đột nhập gia cư bất hợp pháp đấy!",
        "ipaUs": "/æt liːst aɪm nɑːt ˈbɑːrkɪŋ ʌp ðə rɔːŋ triː. — juː noʊ ðiːz ˈpiːpl? — noʊ, əv kɔːrs nɑːt. ɪts ˈbreɪkɪŋ ænd ˈɛntərɪŋ!/",
        "keywords": ["barking up the wrong tree", "breaking and entering"],
        "explanationAi": "Thành ngữ 'barking up the wrong tree' (hiểu nhầm / tìm nhầm đối tượng) và thuật ngữ pháp lý 'breaking and entering' (đột nhập trái phép).",
        "properNouns": [],
        "tokenCount": 24
    },
    {
        "orderIndex": 1,
        "startTime": 165.0,
        "endTime": 180.0,
        "text": "I wish I had stayed. — I wish I had stayed too. Now I wish I had stayed. I wish I had done a lot of things. I wish I had stayed.",
        "translationVi": "Anh ước gì đêm hôm ấy anh đã ở lại. — Em cũng ước gì anh đã ở lại. Giờ đây em ước gì anh đã ở lại. Anh ước gì mình đã làm nhiều điều khác đi. Anh ước gì anh đã ở lại bên em.",
        "ipaUs": "/aɪ wɪʃ aɪ hæd steɪd. — aɪ wɪʃ aɪ hæd steɪd tuː. naʊ aɪ wɪʃ aɪ hæd steɪd. aɪ wɪʃ aɪ hæd dʌn ə lɑːt əv θɪŋz. aɪ wɪʃ aɪ hæd steɪd./",
        "keywords": ["wish I had stayed", "regret", "memory"],
        "explanationAi": "Cấu trúc 'wish + past perfect' diễn tả nỗi tiếc nuối khôn nguôi về một hành động trong quá khứ khi ký ức của Joel đang bị xóa bỏ từng mảng.",
        "properNouns": [],
        "tokenCount": 35
    },
    {
        "orderIndex": 2,
        "startTime": 184.0,
        "endTime": 199.0,
        "text": "Why? — I don't know. I felt like a scared little kid. It was like... I don't know. — You were scared? — Yeah, I thought you knew that about me.",
        "translationVi": "Tại sao anh lại bỏ đi? — Anh không biết nữa. Lúc đó anh thấy mình như một đứa trẻ nhút nhát sợ hãi. Nó giống như là... anh chẳng biết nữa. — Anh sợ hãi sao? — Ừ, anh cứ ngỡ em đã thấu hiểu điều đó ở anh chứ.",
        "ipaUs": "/waɪ? — aɪ doʊnt noʊ. aɪ fɛlt laɪk ə skɛərd ˈlɪtl kɪd. ɪt wʌz laɪk... aɪ doʊnt noʊ. — juː wɜːr skɛərd? — jæ, aɪ θɔːt juː njuː ðæt əˈbaʊt miː./",
        "keywords": ["scared little kid", "knew that about me"],
        "explanationAi": "Khoảnh khắc yếu lòng và thành thật nhất của Joel trước Clementine ngay trước khi ngôi nhà sụp đổ.",
        "properNouns": [],
        "tokenCount": 33
    },
    {
        "orderIndex": 3,
        "startTime": 230.0,
        "endTime": 244.0,
        "text": "I walked out the door. There was no memory left. — Come back and make up a good goodbye at least. Let's pretend we had one.",
        "translationVi": "Anh bước ra ngoài cửa. Ký ức chẳng còn lại gì nữa. — Ít nhất hãy quay lại đây và cùng nói một lời tạm biệt tử tế đi anh. Hãy giả vờ như chúng mình đã từng có một lời chào tạm biệt thật đẹp.",
        "ipaUs": "/aɪ wɔːkt aʊt ðə dɔːr. ðɛər wʌz noʊ ˈmɛməri lɛft. — kʌm bæk ænd meɪk ʌp ə ɡʊd ɡʊdˈbaɪ æt liːst. lɛts prɪˈtɛnd wiː hæd wʌn./",
        "keywords": ["make up a good goodbye", "pretend"],
        "explanationAi": "Ý niệm đầy chất thơ của đạo diễn Michel Gondry: sửa chữa lời chia tay trong tiềm thức trước khi quên đi vĩnh viễn.",
        "properNouns": [],
        "tokenCount": 27
    },
    {
        "orderIndex": 4,
        "startTime": 253.0,
        "endTime": 260.0,
        "text": "I love you. — Meet me in Montauk.",
        "translationVi": "Anh yêu em. — Hãy gặp em ở Montauk nhé.",
        "ipaUs": "/aɪ lʌv juː. — miːt miː ɪn ˈmɑːntɔːk./",
        "keywords": ["I love you", "Meet me in Montauk"],
        "explanationAi": "Câu thì thầm bất hủ trở thành mã khóa tiềm thức giúp cả hai tìm lại nhau trên chuyến tàu buổi sáng ngày lễ Tình nhân.",
        "properNouns": ["Montauk"],
        "tokenCount": 7
    }
]

questions_10 = [
    {
        "id": "mov_rom_10_q1",
        "question": "What is the secret whisper Clementine gives Joel as the beach house crumbles?",
        "questionVi": "Lời thì thầm bí mật mà Clementine nói với Joel khi ngôi nhà ven biển tan biến là gì?",
        "options": [
            "'Delete my number.'",
            "'Meet me in Montauk.'",
            "'Don't go to work tomorrow.'",
            "'Remember my hair color.'"
        ],
        "optionsVi": [
            "'Hãy xóa số điện thoại của em đi.'",
            "'Hãy gặp em ở Montauk nhé.'",
            "'Ngày mai đừng đi làm nhé.'",
            "'Hãy nhớ màu tóc của em.'"
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Clementine whispers the iconic line: 'Meet me in Montauk.'",
        "explanationVi": "Trong Phân đoạn 4, Clementine thì thầm câu thoại kinh điển: 'Hãy gặp em ở Montauk nhé.'",
        "targetedConcept": "Pivotal narrative hook in Eternal Sunshine",
        "targetedConceptVi": "Chi tiết mấu chốt dẫn dắt cốt truyện trong Eternal Sunshine",
        "referenceSegmentIndex": 4
    },
    {
        "id": "mov_rom_10_q2",
        "question": "What grammatical structure is repeated by both characters to express regret about the past?",
        "questionVi": "Cấu trúc ngữ pháp nào được cả hai nhân vật lặp lại nhiều lần để bày tỏ sự hối tiếc về quá khứ?",
        "options": [
            "If only + Present Simple",
            "I wish + had + Past Participle ('I wish I had stayed')",
            "Used to + V-ing",
            "Should have + V-inf"
        ],
        "optionsVi": [
            "If only + hiện tại đơn",
            "I wish + had + V3/ed ('I wish I had stayed')",
            "Used to + V-ing",
            "Should have + V nguyên mẫu"
        ],
        "correctAnswer": 1,
        "explanation": "Segment 1 repeats: 'I wish I had stayed' using wish + past perfect to express profound regret about a past action.",
        "explanationVi": "Phân đoạn 1 lặp lại câu 'I wish I had stayed' sử dụng cấu trúc wish + quá khứ hoàn thành để bộc lộ nỗi tiếc nuối sâu sắc.",
        "targetedConcept": "Grammar of past regrets using wish clauses",
        "targetedConceptVi": "Ngữ pháp biểu đạt nỗi tiếc nuối quá khứ với mệnh đề wish",
        "referenceSegmentIndex": 1
    }
]

f_10 = generate_ts_lesson(cfg_10, segments_10, questions_10)
with open(os.path.join(target_dir, cfg_10["file"]), "w", encoding="utf-8") as f:
    f.write(f_10)
print("Generated Lesson 10 successfully.")

# ============================================================================
# 11. NOTTING HILL (mov_rom_11)
# ============================================================================
cfg_11 = {
    "id": "mov_rom_11",
    "slug": "notting-hill-im-also-just-a-girl",
    "var_lesson": "LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL",
    "var_quiz": "QUIZ_NOTTING_HILL_IM_ALSO_JUST_A_GIRL",
    "file": "lesson_notting_hill_im_also_just_a_girl.ts",
    "externalId": "sM4rv42qyvk",
    "title": "Notting Hill: William and Anna's Final Press Conference & Wedding",
    "durationSeconds": 377,
    "durationFormatted": "06:17",
    "cefrLevel": "B2",
    "accent": "British (RP) & American",
    "wpmSpeed": 130,
    "viewCount": 7273894,
    "studyCount": 4890,
    "description": "Đoạn kết hạnh phúc ngập tràn tiếng cười và sự lãng mạn tại khách sạn The Ritz London: William Thacker đóng giả phóng viên tạp chí Horse & Hound để hỏi Anna Scott câu hỏi quan trọng nhất cuộc đời, dẫn đến lễ cưới ngọt ngào trong công viên Notting Hill.",
}

segments_11 = [
    {
        "orderIndex": 0,
        "startTime": 23.2,
        "endTime": 34.7,
        "text": "Anna, how much longer are you staying in the UK then? — No time at all. I leave tonight, which is why we have to round things up now.",
        "translationVi": "Anna, cô dự định ở lại nước Anh thêm bao lâu nữa? — Không còn thời gian nữa đâu. Tôi sẽ bay về nước ngay tối nay, đó là lý do buổi họp báo phải khép lại sớm.",
        "ipaUs": "/ˈænə, haʊ mʌtʃ ˈlɔːŋɡər ɑːr juː ˈsteɪɪŋ ɪn ðə juː keɪ ðɛn? — noʊ taɪm æt ɔːl. aɪ liːv təˈnaɪt, wɪtʃ ɪz waɪ wiː hæv tuː raʊnd θɪŋz ʌp naʊ./",
        "keywords": ["how much longer", "round things up"],
        "explanationAi": "Phrasal verb 'round things up' mang nghĩa tóm tắt, hoàn tất khép lại một sự kiện.",
        "properNouns": ["UK", "Anna"],
        "tokenCount": 29
    },
    {
        "orderIndex": 1,
        "startTime": 86.7,
        "endTime": 103.5,
        "text": "Are there any circumstances in which the two of you might be more than just good friends? — I hoped there would be, but no, I'm assured there aren't.",
        "translationVi": "Liệu có hoàn cảnh nào để hai người trở thành điều gì đó hơn cả bạn bè tốt không? — Tôi từng hy vọng là có, nhưng không, tôi được đoan chắc là không thể rồi.",
        "ipaUs": "/ɑːr ðɛər ˈɛni ˈsɜːrkəmˌstænsɪz ɪn wɪtʃ ðə tuː əv juː maɪt biː mɔːr ðæn dʒʌst ɡʊd frɛndz? — aɪ hoʊpt ðɛər wʊd biː, bʌt noʊ, aɪm əˈʃʊərd ðɛər ɑːrnt./",
        "keywords": ["circumstances", "more than good friends", "assured"],
        "explanationAi": "Cụm 'more than just good friends' (trên mức bạn bè) và nỗi thất vọng kìm nén của ngôi sao Hollywood trước sự ngập ngừng của William.",
        "properNouns": [],
        "tokenCount": 30
    },
    {
        "orderIndex": 2,
        "startTime": 120.7,
        "endTime": 134.4,
        "text": "I just wondered whether, if Mr. Thacker realized he'd been a daft prick and got down on his knees and begged you to reconsider, whether you would in fact then reconsider?",
        "translationVi": "Tôi chỉ băn khoăn rằng, nếu anh Thacker đó nhận ra mình là một kẻ ngốc nghếch dại dột và quỳ gối van xin cô suy nghĩ lại, thì liệu cô có thực sự suy nghĩ lại hay không?",
        "ipaUs": "/aɪ dʒʌst ˈwʌndərd ˈwɛðər, ɪf ˈmɪstər ˈθækər ˈrɪəˌlaɪzd hiːd biːn ə dæft prɪk ænd ɡɑːt daʊn ɑːn hɪz niːz ænd bɛɡd juː tuː ˌriːkənˈsɪdər, ˈwɛðər juː wʊd ɪn fækt ðɛn ˌriːkənˈsɪdər?/",
        "keywords": ["daft prick", "begged to reconsider", "in fact"],
        "explanationAi": "Tiếng lóng Anh-Anh tự trào 'daft prick' (kẻ ngốc nghếch dại khờ). Màn cầu xin chuộc lỗi công khai độc nhất vô nhị của William tại Ritz Hotel.",
        "properNouns": ["Mr. Thacker"],
        "tokenCount": 33
    },
    {
        "orderIndex": 3,
        "startTime": 134.4,
        "endTime": 158.8,
        "text": "Yes. I believe I would. — That's very good news. The readers of Horse & Hound will be absolutely delighted.",
        "translationVi": "Vâng. Tôi tin là tôi sẽ đồng ý. — Đó quả là tin tức vô cùng tốt lành. Độc giả của tạp chí Ngựa & Chó săn hẳn sẽ vô cùng vui mừng khôn xiết.",
        "ipaUs": "/jɛs. aɪ bɪˈliːv aɪ wʊd. — ðæts ˈvɛri ɡʊd nuːz. ðə ˈriːdərz əv hɔːrs ænd haʊnd wɪl biː ˌæbsəˈluːtli dɪˈlaɪtɪd./",
        "keywords": ["Horse & Hound", "absolutely delighted"],
        "explanationAi": "Nụ cười bừng sáng của Julia Roberts và câu đùa 'Horse & Hound' trứ danh giải tỏa mọi căng thẳng.",
        "properNouns": ["Horse & Hound"],
        "tokenCount": 22
    },
    {
        "orderIndex": 4,
        "startTime": 169.7,
        "endTime": 185.0,
        "text": "Anna, how long were you intending to stay here in Britain? — Indefinitely.",
        "translationVi": "Anna, cô dự định sẽ ở lại nước Anh trong bao lâu? — Vô thời hạn.",
        "ipaUs": "/ˈænə, haʊ lɔːŋ wɜːr juː ɪnˈtɛndɪŋ tuː steɪ hɪər ɪn ˈbrɪtn? — ɪnˈdɛfɪnɪtli./",
        "keywords": ["intending to stay", "indefinitely"],
        "explanationAi": "Từ đắt giá nhất bộ phim: 'Indefinitely' (vô thời hạn / mãi mãi), báo hiệu cô từ bỏ chuyến bay để ở lại bên người mình yêu.",
        "properNouns": ["Britain", "Anna"],
        "tokenCount": 14
    }
]

questions_11 = [
    {
        "id": "mov_rom_11_q1",
        "question": "What magazine does William claim to represent at the press conference?",
        "questionVi": "William tự nhận mình đại diện cho tạp chí nào tại buổi họp báo?",
        "options": [
            "Time Magazine",
            "Horse & Hound",
            "Vogue UK",
            "The Daily Telegraph"
        ],
        "optionsVi": [
            "Tạp chí Time",
            "Horse & Hound (Ngựa & Chó săn)",
            "Vogue UK",
            "The Daily Telegraph"
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 3, William dryly remarks: 'The readers of Horse & Hound will be absolutely delighted.'",
        "explanationVi": "Trong Phân đoạn 3, William hài hước nói: 'Độc giả của tạp chí Horse & Hound hẳn sẽ vui mừng khôn xiết.'",
        "targetedConcept": "Humorous running gag in Notting Hill",
        "targetedConceptVi": "Miếng hài lặp lại đặc sắc trong Notting Hill",
        "referenceSegmentIndex": 3
    },
    {
        "id": "mov_rom_11_q2",
        "question": "What single word does Anna use to answer how long she plans to stay in Britain?",
        "questionVi": "Anna đã dùng từ duy nhất nào để trả lời về thời gian cô dự định ở lại nước Anh?",
        "options": [
            "'Briefly.'",
            "'Indefinitely.'",
            "'Until summer.'",
            "'Never again.'"
        ],
        "optionsVi": [
            "'Chỉ thoáng qua thôi.'",
            "'Vô thời hạn (mãi mãi).'",
            "'Cho tới hết mùa hè.'",
            "'Không bao giờ nữa.'"
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Anna announces she is staying 'Indefinitely' (forever).",
        "explanationVi": "Trong Phân đoạn 4, Anna tuyên bố cô sẽ ở lại 'Indefinitely' (vô thời hạn / mãi mãi).",
        "targetedConcept": "Romantic climax resolution",
        "targetedConceptVi": "Đoạn kết giải tỏa viên mãn trong phim tình cảm",
        "referenceSegmentIndex": 4
    }
]

f_11 = generate_ts_lesson(cfg_11, segments_11, questions_11)
with open(os.path.join(target_dir, cfg_11["file"]), "w", encoding="utf-8") as f:
    f.write(f_11)
print("Generated Lesson 11 successfully.")

# ============================================================================
# 12. FLIPPED (mov_rom_12)
# ============================================================================
cfg_12 = {
    "id": "mov_rom_12",
    "slug": "flipped-the-sycamore-tree-and-basket-boys",
    "var_lesson": "LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS",
    "var_quiz": "QUIZ_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS",
    "file": "lesson_flipped_the_sycamore_tree_and_basket_boys.ts",
    "externalId": "KTUvOpY89RE",
    "title": "Flipped: Bryce and Juli's Sycamore Tree & Growing Hearts",
    "durationSeconds": 335,
    "durationFormatted": "05:35",
    "cefrLevel": "B1",
    "accent": "American",
    "wpmSpeed": 128,
    "viewCount": 204950,
    "studyCount": 3150,
    "description": "Câu chuyện tình thơ tuổi học trò ngọt ngào và sâu sắc trong Flipped của đạo diễn Rob Reiner: Bryce Loski bắt đầu nhìn thấy vẻ đẹp tâm hồn tỏa sáng của Juli Baker qua góc nhìn cây ngô đồng và bài học về bức tranh lớn của cuộc sống.",
}

segments_12 = [
    {
        "orderIndex": 0,
        "startTime": 1.7,
        "endTime": 15.0,
        "text": "All I ever wanted was for Juli Baker to leave me alone. Do you want some help? — No. Can't you take a hint? It's crowded in here.",
        "translationVi": "Tất cả những gì tôi từng ao ước chỉ là Juli Baker hãy để tôi được yên. Cậu có cần tớ giúp một tay không? — Không. Cậu không biết ý tứ à? Trong xe này chật chội lắm rồi.",
        "ipaUs": "/ɔːl aɪ ˈɛvər ˈwɑːntɪd wʌz fɔːr ˈdʒuːli ˈbeɪkər tuː liːv miː əˈloʊn. duː juː wɑːnt sʌm hɛlp? — noʊ. kænt juː teɪk ə hɪnt? ɪts ˈkraʊdɪd ɪn hɪər./",
        "keywords": ["leave me alone", "take a hint", "crowded"],
        "explanationAi": "Khởi đầu câu chuyện từ góc nhìn của Bryce hồi lớp hai khi gia đình chuyển tới khu phố mới.",
        "properNouns": ["Juli Baker"],
        "tokenCount": 28
    },
    {
        "orderIndex": 1,
        "startTime": 30.0,
        "endTime": 45.0,
        "text": "I mean, nothing would stop her. The next thing I knew, she was in the van, holding my hand. My first day in town, and I'm already stalked by a girl.",
        "translationVi": "Ý tôi là, chẳng điều gì ngăn nổi cô ấy cả. Ngay sau đó tôi thấy cô ấy đã leo vào thùng xe tải, nắm lấy tay tôi. Ngày đầu tiên chuyển tới thị trấn mà tôi đã bị một đứa con gái bám đuôi rồi.",
        "ipaUs": "/aɪ miːn, ˈnʌθɪŋ wʊd stɑːp hɜːr. ðə nɛkst θɪŋ aɪ njuː, ʃiː wʌz ɪn ðə væn, ˈhoʊldɪŋ maɪ hænd. maɪ fɜːrst deɪ ɪn taʊn, ænd aɪm ɔːlˈrɛdi stɔːkt baɪ ə ɡɜːrl./",
        "keywords": ["holding my hand", "stalked", "stop her"],
        "explanationAi": "Cụm 'the next thing I knew' dùng để kể lại một sự việc bất ngờ xảy đến ngoài dự tính.",
        "properNouns": [],
        "tokenCount": 31
    },
    {
        "orderIndex": 2,
        "startTime": 120.0,
        "endTime": 140.0,
        "text": "A painting is more than the sum of its parts. A cow by itself is just a cow. A meadow is just grass and flowers. But put them together and you've got magic.",
        "translationVi": "Một bức tranh có giá trị lớn hơn tổng số các bộ phận cấu thành nên nó. Một con bò đứng riêng thì chỉ là con bò. Một đồng cỏ chỉ là cỏ và hoa. Nhưng đặt chúng lại cùng nhau, con sẽ có được điều kỳ diệu.",
        "ipaUs": "/ə ˈpeɪntɪŋ ɪz mɔːr ðæn ðə sʌm əv ɪts pɑːrts. ə kaʊ baɪ ɪtˈsɛlf ɪz dʒʌst ə kaʊ. ə ˈmɛdoʊ ɪz dʒʌst ɡræs ænd ˈflaʊərz. bʌt pʊt ðɛm təˈɡɛðər ænd juːv ɡɑːt ˈmædʒɪk./",
        "keywords": ["more than sum of its parts", "meadow", "magic"],
        "explanationAi": "Bài học triết lý sâu sắc của người cha họa sĩ dạy Juli về cách nhìn nhận con người và cuộc sống như một chỉnh thể toàn diện.",
        "properNouns": [],
        "tokenCount": 36
    },
    {
        "orderIndex": 3,
        "startTime": 260.0,
        "endTime": 285.0,
        "text": "I had to talk to her. I had to tell her that I was sorry, that I was an idiot, that I finally understood what my grandfather meant.",
        "translationVi": "Tôi phải nói chuyện với cô ấy. Tôi phải nói với cô ấy rằng tôi vô cùng ân hận, rằng tôi từng là một kẻ ngốc nghếch, và rằng cuối cùng tôi đã hiểu được điều mà ông nội tôi từng nhắn nhủ.",
        "ipaUs": "/aɪ hæd tuː tɔːk tuː hɜːr. aɪ hæd tuː tɛl hɜːr ðæt aɪ wʌz ˈsɑːri, ðæt aɪ wʌz ən ˈɪdiət, ðæt aɪ ˈfaɪnəli ˌʌndərˈstʊd wɑːt maɪ ˈɡrændˌfɑːðər mɛnt./",
        "keywords": ["talk to her", "idiot", "finally understood"],
        "explanationAi": "Sự chuyển biến tâm lý của Bryce: khi bắt đầu trân trọng vẻ đẹp tâm hồn của Juli và hành động để chuộc lỗi.",
        "properNouns": [],
        "tokenCount": 27
    },
    {
        "orderIndex": 4,
        "startTime": 290.0,
        "endTime": 320.0,
        "text": "We planted the sycamore tree together in her yard. And as I looked at her, I knew we'd never stopped talking again.",
        "translationVi": "Chúng tôi cùng nhau trồng lại cây ngô đồng nhỏ trong sân nhà cô ấy. Và khi ngắm nhìn cô ấy, tôi biết rằng chúng tôi sẽ không bao giờ ngừng trò chuyện cùng nhau nữa.",
        "ipaUs": "/wiː ˈplæntɪd ðə ˈsɪkəmɔːr triː təˈɡɛðər ɪn hɜːr jɑːrd. ænd æz aɪ lʊkt æt hɜːr, aɪ njuː wiːd ˈnɛvər stɑːpt ˈtɔːkɪŋ əˈɡɛn./",
        "keywords": ["sycamore tree", "planted together", "never stopped talking"],
        "explanationAi": "Biểu tượng hòa giải và tình yêu trong sáng chớm nở khép lại kiệt tác Flipped.",
        "properNouns": [],
        "tokenCount": 22
    }
]

questions_12 = [
    {
        "id": "mov_rom_12_q1",
        "question": "What artistic and life lesson does Juli's father teach her?",
        "questionVi": "Người cha họa sĩ của Juli đã dạy cô bài học nghệ thuật và cuộc sống nào?",
        "options": [
            "Always sell paintings for high prices.",
            "A painting — and a person — is more than the sum of its parts.",
            "Never climb trees because it ruins clothes.",
            "Only paint portraits of famous people."
        ],
        "optionsVi": [
            "Luôn bán tranh với giá thật cao.",
            "Một bức tranh — cũng như một con người — có giá trị lớn hơn tổng thể các bộ phận đơn lẻ cộng lại.",
            "Đừng bao giờ trèo cây vì sẽ làm bẩn quần áo.",
            "Chỉ vẽ chân dung của những người nổi tiếng."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 2, her father explains: 'A painting is more than the sum of its parts.'",
        "explanationVi": "Trong Phân đoạn 2, người cha giải thích: 'Một bức tranh có giá trị lớn hơn tổng thể các bộ phận cấu thành nên nó.'",
        "targetedConcept": "Philosophical lesson of seeing the whole picture",
        "targetedConceptVi": "Bài học triết lý về cách nhìn nhận bức tranh tổng thể",
        "referenceSegmentIndex": 2
    },
    {
        "id": "mov_rom_12_q2",
        "question": "What symbolic act brings Bryce and Juli together at the conclusion of the film?",
        "questionVi": "Hành động mang tính biểu tượng nào đã gắn kết Bryce và Juli lại với nhau ở đoạn kết phim?",
        "options": [
            "Trading baseball cards.",
            "Planting a young sycamore tree together in her front yard.",
            "Riding the school bus together.",
            "Baking an apple pie."
        ],
        "optionsVi": [
            "Đổi thẻ bóng chày.",
            "Cùng nhau vun trồng một cây ngô đồng nhỏ trong sân trước nhà cô ấy.",
            "Cùng đi xe buýt trường học.",
            "Nướng bánh táo."
        ],
        "correctAnswer": 1,
        "explanation": "Segment 4 concludes with Bryce and Juli planting a sycamore tree together in her yard.",
        "explanationVi": "Phân đoạn 4 khép lại bằng hình ảnh Bryce và Juli cùng nhau trồng cây ngô đồng trong sân nhà cô.",
        "targetedConcept": "Symbolism of healing and mutual growth",
        "targetedConceptVi": "Tính biểu tượng của sự hàn gắn và cùng nhau trưởng thành",
        "referenceSegmentIndex": 4
    }
]

f_12 = generate_ts_lesson(cfg_12, segments_12, questions_12)
with open(os.path.join(target_dir, cfg_12["file"]), "w", encoding="utf-8") as f:
    f.write(f_12)
print("Generated Lesson 12 successfully.")

print("All Lessons 07-12 generated successfully!")
