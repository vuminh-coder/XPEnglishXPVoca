import json
import os
from build_lessons_engine import generate_ts_lesson

target_dir = "features/listening/data/lessons/movies/inspirational"
os.makedirs(target_dir, exist_ok=True)

# ============================================================================
# 7. mov_insp_07: Whiplash
# ============================================================================
cfg_07 = {
    "id": "mov_insp_07",
    "slug": "whiplash-there-are-no-two-words-harmful",
    "var_lesson": "LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL",
    "var_quiz": "QUIZ_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL",
    "file": "lesson_whiplash_there_are_no_two_words_harmful.ts",
    "externalId": "gfceCnMJZ3c",
    "title": "Whiplash: 'Not My Tempo' Masterclass & Fletcher's Philosophy",
    "durationSeconds": 349,
    "durationFormatted": "05:49",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 145,
    "viewCount": 3161204,
    "studyCount": 5890,
    "description": "Màn đối đầu kịch tính nghẹt thở giữa người thầy độc đoán Terence Fletcher (J.K. Simmons) và tay trống trẻ Andrew Neyman (Miles Teller): 'Không có hai từ nào trong tiếng Anh độc hại hơn cụm từ Good Job (Làm tốt lắm).'",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_07 = [
    {
        "orderIndex": 0,
        "startTime": 25.0,
        "endTime": 36.5,
        "text": "Were you rushing or were you dragging? Answer me! If you deliberately sabotage my band, I will gut you like a pig.",
        "translationVi": "Cậu đang đánh nhanh hơn nhịp hay chậm hơn nhịp? Trả lời tôi mau! Nếu cậu cố tình phá hoại ban nhạc của tôi, tôi sẽ không tha cho cậu đâu.",
        "ipaUs": "/wɜːr juː ˈrʌʃɪŋ ɔːr wɜːr juː ˈdræɡɪŋ? ˈænsər miː! ɪf juː dɪˈlɪbərətli ˈsæbəˌtɑːʒ maɪ bænd, aɪ wɪl ɡʌt juː laɪk ə pɪɡ./",
        "keywords": ["rushing", "dragging", "deliberately sabotage", "tempo"],
        "explanationAi": "Thuật ngữ nhịp điệu âm nhạc: 'rushing' (đánh vượt nhịp/nhanh hơn), 'dragging' (đánh trễ nhịp/chậm hơn tempo chỉ định).",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 48.0,
        "endTime": 59.5,
        "text": "Start counting. In four. One, two, three, four... Not quite my tempo. Try it again. Faster. Now drag.",
        "translationVi": "Bắt đầu đếm nhịp. Nhịp bốn. Một, hai, ba, bốn... Chưa chuẩn nhịp của tôi. Thử lại lần nữa. Nhanh hơn. Giờ thì lại trễ rồi.",
        "ipaUs": "/stɑːrt ˈkaʊntɪŋ. ɪn fɔːr. wʌn, tuː, θriː, fɔːr... nɑːt kwaɪt maɪ ˈtɛmpoʊ. traɪ ɪt əˈɡɛn. ˈfæstər. naʊ dræɡ./",
        "keywords": ["start counting", "not quite my tempo", "drag"],
        "explanationAi": "Cụm thoại biểu tượng 'Not quite my tempo' tạo nên thương hiệu của bộ phim, thể hiện sự cầu toàn khốc liệt.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 160.0,
        "endTime": 178.0,
        "text": "I was there to push people beyond what's expected of them. I believe that is an absolute necessity. Otherwise, we're depriving the world of the next Louis Armstrong, the next Charlie Parker.",
        "translationVi": "Tôi ở đó là để thúc đẩy người ta vượt qua khỏi những gì mà thiên hạ kỳ vọng ở họ. Tôi tin rằng điều đó là một sự tất yếu tuyệt đối. Nếu không, chúng ta đang tước đoạt của thế giới một Louis Armstrong hay Charlie Parker tiếp theo.",
        "ipaUs": "/aɪ wʌz ðɛr tuː pʊʃ ˈpiːpəl bɪˈjɑːnd wʌts ɪkˈspɛktɪd əv ðɛm. aɪ bɪˈliːv ðæt ɪz ən ˈæbsəˌluːt nəˈsɛsəti. ˈʌðərˌwaɪz, wɪr dɪˈpraɪvɪŋ ðə wɜːrld əv ðə nɛkst ˈluːɪs ˈɑːrmˌstrɔːŋ, ðə nɛkst ˈtʃɑːrli ˈpɑːrkər./",
        "keywords": ["push people beyond", "absolute necessity", "depriving the world"],
        "explanationAi": "Động từ 'deprive somebody of something' mang nghĩa 'tước đoạt của ai điều gì quý giá'. Lập luận bào chữa cho phương pháp sư phạm cực đoan của Fletcher.",
        "properNouns": ["Louis Armstrong", "Charlie Parker"]
    },
    {
        "orderIndex": 3,
        "startTime": 179.0,
        "endTime": 195.0,
        "text": "There are no two words in the English language more harmful than 'good job'.",
        "translationVi": "Không có hai từ nào trong tiếng Anh lại gây hại và nguy hiểm hơn hai chữ 'Làm tốt lắm'.",
        "ipaUs": "/ðɛr ɑːr noʊ tuː wɜːrdz ɪn ðɪ ˈɪŋɡlɪʃ ˈlæŋɡwɪdʒ mɔːr ˈhɑːrmfəl ðæn ɡʊd dʒɑːb./",
        "keywords": ["no two words", "more harmful", "good job"],
        "explanationAi": "Triết lý gây tranh cãi gay gắt: Fletcher cho rằng lời khen ngợi dễ dãi sẽ triệt tiêu động lực vươn tới sự vĩ đại và tạo ra sự tự mãn tầm thường.",
        "properNouns": []
    }
]

questions_07 = [
    {
        "id": "q_mov_insp_07_1",
        "question": "What is Fletcher's fundamental justification for his aggressive teaching style?",
        "questionVi": "Lý lẽ bào chữa cốt lõi của Fletcher cho phong cách huấn luyện khốc liệt của mình là gì?",
        "options": [
            "He believes true genius can only emerge when artists are pushed far beyond normal expectations",
            "He wants his students to drop out and pursue business careers instead",
            "He receives financial bonuses whenever a student achieves perfect rhythm",
            "He is bound by strict institutional rules established by the conservatory dean"
        ],
        "optionsVi": [
            "Ông tin thiên tài thực sự chỉ xuất hiện khi người nghệ sĩ bị đẩy vượt xa những kỳ vọng thông thường",
            "Ông muốn học trò bỏ học để đi làm kinh doanh",
            "Ông nhận thưởng tiền nếu học trò đạt nhịp chuẩn",
            "Ông bị ràng buộc bởi nội quy khắt khe của nhạc viện"
        ],
        "correctAnswer": 0,
        "explanation": "Fletcher argues that without extreme pressure, society will never nurture another Charlie Parker.",
        "explanationVi": "Fletcher lý luận rằng nếu không có áp lực cùng cực, nhân loại sẽ không bao giờ có được một Charlie Parker thứ hai.",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Character Motivation Analysis",
        "targetedConceptVi": "Phân tích động cơ nhân vật"
    },
    {
        "id": "q_mov_insp_07_2",
        "question": "Why does Fletcher consider the phrase 'good job' so harmful?",
        "questionVi": "Tại sao Fletcher lại coi cụm từ 'good job' (làm tốt lắm) là vô cùng tai hại?",
        "options": [
            "Because he believes compliments breed complacency and prevent students from reaching greatness",
            "Because he thinks English grammar rules forbid repetitive praises",
            "Because praising students requires too much verbal energy during rehearsal",
            "Because students will demand higher wages from orchestra managers"
        ],
        "optionsVi": [
            "Bởi vì ông tin lời khen tạo ra sự tự mãn tầm thường và cản trở học trò chạm tới đỉnh cao vĩ đại",
            "Bởi vì ông cho rằng ngữ pháp tiếng Anh cấm khen lặp đi lặp lại",
            "Bởi vì khen học trò làm tốn quá nhiều sức khi luyện tập",
            "Bởi vì học trò sẽ đòi cát-xê cao hơn"
        ],
        "correctAnswer": 0,
        "explanation": "Fletcher views 'good job' as an excuse for mediocrity that prevents musicians from striving further.",
        "explanationVi": "Fletcher coi 'good job' là sự thỏa hiệp với thói tầm thường, triệt tiêu động lực bứt phá.",
        "referenceSegmentIndex": 3,
        "targetedConcept": "Thematic Philosophy",
        "targetedConceptVi": "Triết lý chủ đề tác phẩm"
    }
]

# ============================================================================
# 8. mov_insp_08: The Theory of Everything
# ============================================================================
cfg_08 = {
    "id": "mov_insp_08",
    "slug": "theory-of-everything-where-there-is-life-hope",
    "var_lesson": "LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE",
    "var_quiz": "QUIZ_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE",
    "file": "lesson_theory_of_everything_where_there_is_life_hope.ts",
    "externalId": "0RdvRJGl-_w",
    "title": "The Theory of Everything: Stephen Hawking's Ending Speech",
    "durationSeconds": 318,
    "durationFormatted": "05:18",
    "cefrLevel": "B2",
    "accent": "British",
    "wpmSpeed": 118,
    "viewCount": 1321038,
    "studyCount": 4720,
    "description": "Diễn xuất đỉnh cao đoạt giải Oscar của Eddie Redmayne hóa thân thành Giáo sư Stephen Hawking trong bài phát biểu xúc động lay động hàng triệu trái tim: 'Chừng nào còn sự sống, chừng đó còn có hy vọng.'",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_08 = [
    {
        "orderIndex": 0,
        "startTime": 20.0,
        "endTime": 38.5,
        "text": "It is clear that we are just an advanced breed of primates on a minor planet orbiting around a very average star, in the outer suburb of one among a hundred billion galaxies.",
        "translationVi": "Rõ ràng là chúng ta chỉ là một giống linh trưởng tiến hóa trên một hành tinh nhỏ bé quay quanh một ngôi sao hết sức bình thường, ở vùng ngoại ô heo hút của một trong số hàng trăm tỷ thiên hà.",
        "ipaUs": "/ɪt ɪz klɪr ðæt wiː ɑːr dʒʌst ən ədˈvænst briːd əv ˈpraɪmeɪts ɑːn ə ˈmaɪnər ˈplænɪt ˈɔːrbɪtɪŋ əˈraʊnd ə ˈvɛri ˈævərɪdʒ stɑːr, ɪn ðɪ ˈaʊtər ˈsʌbɜːrb əv wʌn əˈmʌŋ ə ˈhʌndrəd ˈbɪljən ˈɡæləksiz./",
        "keywords": ["breed of primates", "orbiting around", "outer suburb", "galaxies"],
        "explanationAi": "Cách diễn đạt vũ trụ học sâu sắc mở đầu: đặt vị thế con người trong vũ trụ bao la để làm nổi bật sự kỳ diệu của nhận thức.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 40.0,
        "endTime": 58.0,
        "text": "BUT... ever since the dawn of civilization, people have craved for an understanding of the underlying order of the world. There ought to be something very special about the boundary conditions of the universe.",
        "translationVi": "NHƯNG... kể từ bình minh của nền văn minh, con người đã luôn khao khát thấu hiểu trật tự sâu xa của thế giới. Hẳn phải có điều gì đó hết sức đặc biệt về các điều kiện biên của vũ trụ.",
        "ipaUs": "/bʌt... ˈɛvər sɪns ðə dɔːn əv ˌsɪvələˈzeɪʃən, ˈpiːpəl hæv kreɪvd fɔːr ən ˌʌndərˈstændɪŋ əv ðɪ ˌʌndərˈlaɪɪŋ ˈɔːrdər əv ðə wɜːrld. ðɛr ɔːt tuː biː ˈsʌmθɪŋ ˈvɛri ˈspɛʃəl əˈbaʊt ðə ˈbaʊndəri kənˈdɪʃənz əv ðə ˈjuːnəˌvɜːrs./",
        "keywords": ["dawn of civilization", "craved for", "underlying order", "boundary conditions"],
        "explanationAi": "Cụm 'dawn of civilization' (thuở sơ khai văn minh) và 'crave for' (khao khát mãnh liệt) nêu bật trí tò mò bất tận của loài người.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 65.0,
        "endTime": 84.5,
        "text": "And what could be more special than that there is no boundary? And there should be no boundary to human endeavor. We are all different. However bad life may seem, there is always something you can do, and succeed at.",
        "translationVi": "Và điều gì có thể đặc biệt hơn việc vũ trụ không hề có đường biên giới? Và cũng không nên có bất kỳ giới hạn nào cho nỗ lực của con người. Mỗi chúng ta đều khác biệt. Dù cuộc sống có vẻ tồi tệ đến đâu, luôn có điều gì đó bạn có thể làm, và thành công.",
        "ipaUs": "/ænd wʌt kʊd biː mɔːr ˈspɛʃəl ðæn ðæt ðɛr ɪz noʊ ˈbaʊndəri? ænd ðɛr ʃʊd biː noʊ ˈbaʊndəri tuː ˈhjuːmən ɪnˈdɛvər. wiː ɑːr ɔːl ˈdɪfərənt. ˌhaʊˈɛvər bæd laɪf meɪ siːm, ðɛr ɪz ˈɔːlweɪz ˈsʌmθɪŋ juː kæn duː, ænd səkˈsiːd æt./",
        "keywords": ["no boundary", "human endeavor", "succeed at"],
        "explanationAi": "Từ 'endeavor' (nỗ lực kiên định, hoài bão). Khẳng định ý chí vượt lên số phận bệnh tật của Stephen Hawking.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 85.0,
        "endTime": 96.0,
        "text": "While there's life, there is hope.",
        "translationVi": "Chừng nào còn sự sống, chừng đó còn có hy vọng.",
        "ipaUs": "/waɪl ðɛrz laɪf, ðɛr ɪz hoʊp./",
        "keywords": ["while there's life", "there is hope"],
        "explanationAi": "Thành ngữ Latinh cổ 'Dum spiro spero' được dịch sang Anh ngữ giản dị nhưng lay động lòng người.",
        "properNouns": []
    }
]

questions_08 = [
    {
        "id": "q_mov_insp_08_1",
        "question": "What parallel does Stephen Hawking draw between the boundaries of the universe and human endeavor?",
        "questionVi": "Stephen Hawking so sánh tương đồng điều gì giữa ranh giới của vũ trụ và nỗ lực của con người?",
        "options": [
            "Just as the universe may have no boundary, there should be no boundary to what humans can strive for",
            "Both human effort and the universe are bounded by mathematical restrictions",
            "Human exploration should stop at the edge of the solar system",
            "Science will eventually prove that boundaries are necessary for order"
        ],
        "optionsVi": [
            "Cũng giống như vũ trụ không hề có biên giới, hoài bão và nỗ lực của con người cũng không nên có giới hạn",
            "Cả nỗ lực của con người lẫn vũ trụ đều bị giới hạn bởi toán học",
            "Thám hiểm nhân loại nên dừng lại ở rìa hệ mặt trời",
            "Khoa học rồi sẽ chứng minh ranh giới là cần thiết"
        ],
        "correctAnswer": 0,
        "explanation": "Hawking connects cosmic boundarylessness to the boundless potential of human spirit: 'There should be no boundary to human endeavor.'",
        "explanationVi": "Hawking kết nối tính không biên giới của vũ trụ với tiềm năng vô hạn của ý chí con người.",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Scientific & Philosophical Analogy",
        "targetedConceptVi": "So sánh tương quan khoa học và triết học"
    }
]

# ============================================================================
# 9. mov_insp_09: A Beautiful Mind
# ============================================================================
cfg_09 = {
    "id": "mov_insp_09",
    "slug": "a-beautiful-mind-nobel-prize-speech",
    "var_lesson": "LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH",
    "var_quiz": "QUIZ_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH",
    "file": "lesson_a_beautiful_mind_nobel_prize_speech.ts",
    "externalId": "rrZBpTZmGfI",
    "title": "A Beautiful Mind: John Nash's Nobel Prize Acceptance Speech",
    "durationSeconds": 517,
    "durationFormatted": "08:37",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 120,
    "viewCount": 106950,
    "studyCount": 3890,
    "description": "Nhà toán học thiên tài John Nash (Russell Crowe) đứng trên bục vinh quang nhận giải Nobel Kinh tế, tri ân người vợ Alicia (Jennifer Connelly) đã cùng ông vượt qua căn bệnh tâm thần phân liệt bằng tình yêu thương vô điều kiện.",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_09 = [
    {
        "orderIndex": 0,
        "startTime": 50.0,
        "endTime": 68.0,
        "text": "I've always believed in numbers, in the equations and logics that lead to reason. But I've asked myself, what truly is logic? Who decides reason?",
        "translationVi": "Tôi luôn đặt niềm tin vào những con số, vào những phương trình và tính logic dẫn lối đến lý trí. Nhưng tôi tự hỏi chính mình, điều gì mới thực sự là logic? Ai là người định đoạt lý trí?",
        "ipaUs": "/aɪv ˈɔːlweɪz bɪˈliːvd ɪn ˈnʌmbərz, ɪn ðɪ ɪˈkweɪʒənz ænd ˈlɑːdʒɪks ðæt liːd tuː ˈriːzən. bʌt aɪv æskt maɪˈsɛlf, wʌt ˈtruːli ɪz ˈlɑːdʒɪk? huː dɪˈsaɪdz ˈriːzən?/",
        "keywords": ["believed in numbers", "equations and logics", "lead to reason"],
        "explanationAi": "Lời mở đầu chân thành của một nhà toán học hàng đầu khi suy ngẫm về giới hạn của thuần lý tính.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 72.0,
        "endTime": 92.5,
        "text": "My quest has taken me through the physical, the metaphysical, the delusional, and back. And I have made the most important discovery of my career, the most important discovery of my life:",
        "translationVi": "Hành trình tìm kiếm của tôi đã đưa tôi qua thế giới vật chất, siêu hình, qua cả những ảo giác hoang tưởng, và quay trở về. Và tôi đã tìm ra khám phá quan trọng nhất trong sự nghiệp, phát kiến trọng đại nhất của đời mình:",
        "ipaUs": "/maɪ kwɛst hæz ˈteɪkən miː θruː ðə ˈfɪzɪkəl, ðə ˌmɛtəˈfɪzɪkəl, ðə dɪˈluːʒənəl, ænd bæk. ænd aɪ hæv meɪd ðə moʊst ɪmˈpɔːrtənt dɪˈskʌvəri əv maɪ kəˈrɪr, ðə moʊst ɪmˈpɔːrtənt dɪˈskʌvəri əv maɪ laɪf:/",
        "keywords": ["quest", "metaphysical", "delusional", "most important discovery"],
        "explanationAi": "Từ vựng triết học và tâm thần học: 'metaphysical' (siêu hình), 'delusional' (thuộc về hoang tưởng/ảo giác).",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 95.0,
        "endTime": 115.0,
        "text": "It is only in the mysterious equations of love that any logical reasons can be found. I am only here tonight because of you. You are the reason I am. You are all my reasons.",
        "translationVi": "Chỉ trong những phương trình bí ẩn của tình yêu thương, mọi lý do mang tính logic mới có thể được tìm thấy. Đêm nay tôi có thể đứng ở đây, hoàn toàn là vì có em. Em là lý do tôi tồn tại. Em là tất cả lý do của đời tôi.",
        "ipaUs": "/ɪt ɪz ˈoʊnli ɪn ðə mɪˈstɪriəs ɪˈkweɪʒənz əv lʌv ðæt ˈɛni ˈlɑːdʒɪkəl ˈriːzənz kæn biː faʊnd. aɪ æm ˈoʊnli hɪr təˈnaɪt bɪˈkɔːz əv juː. juː ɑːr ðə ˈriːzən aɪ æm. juː ɑːr ɔːl maɪ ˈriːzənz./",
        "keywords": ["mysterious equations of love", "the reason I am", "all my reasons"],
        "explanationAi": "Cấu trúc nhấn mạnh 'It is only in... that...': Tình yêu là phương trình toán học thiêng liêng nhất cứu rỗi tâm hồn con người.",
        "properNouns": []
    }
]

questions_09 = [
    {
        "id": "q_mov_insp_09_1",
        "question": "What is the 'most important discovery' of John Nash's life, according to his Nobel speech?",
        "questionVi": "'Khám phá quan trọng nhất' trong cuộc đời John Nash theo bài phát biểu nhận giải Nobel là gì?",
        "options": [
            "That only in the mysterious equations of love can any truly logical reasons be found",
            "A breakthrough calculation solving non-cooperative game theory equations",
            "A pharmaceutical formula curing mental health conditions completely",
            "A mathematical proof invalidating classical economics"
        ],
        "optionsVi": [
            "Rằng chỉ trong những phương trình bí ẩn của tình yêu thương, mọi lý do mang tính logic mới được tìm thấy",
            "Một phép tính đột phá giải quyết lý thuyết trò chơi phi hợp tác",
            "Một công thức dược phẩm chữa khỏi hoàn toàn bệnh tâm thần",
            "Một chứng minh toán học bác bỏ kinh tế học cổ điển"
        ],
        "correctAnswer": 0,
        "explanation": "Nash declares that love, personified by his devoted wife Alicia, is the ultimate anchor of logic and sanity.",
        "explanationVi": "Nash khẳng định tình yêu của người vợ Alicia chính là điểm tựa tối thượng của lý trí và cuộc sống.",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Climactic Speech Theme",
        "targetedConceptVi": "Chủ đề cao trào của bài phát biểu"
    }
]

# ============================================================================
# 10. mov_insp_10: Cast Away
# ============================================================================
cfg_10 = {
    "id": "mov_insp_10",
    "slug": "cast-away-keep-breathing-tomorrow-sun-rises",
    "var_lesson": "LESSON_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES",
    "var_quiz": "QUIZ_CAST_AWAY_KEEP_BREATHING_TOMORROW_SUN_RISES",
    "file": "lesson_cast_away_keep_breathing_tomorrow_sun_rises.ts",
    "externalId": "zXGaEMlRw5M",
    "title": "Cast Away: Chuck Noland's Setting Sail & Survival Philosophy",
    "durationSeconds": 344,
    "durationFormatted": "05:44",
    "cefrLevel": "B1",
    "accent": "American",
    "wpmSpeed": 125,
    "viewCount": 2274112,
    "studyCount": 5120,
    "description": "Chuck Noland (Tom Hanks) sau 4 năm cô độc trên đảo hoang quyết định căng buồm vượt trùng khơi và đúc kết triết lý sinh tồn bất hủ: 'Tôi phải tiếp tục hít thở, bởi ngày mai mặt trời lại mọc, và ai biết được thủy triều sẽ mang tới điều gì.'",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_10 = [
    {
        "orderIndex": 0,
        "startTime": 20.0,
        "endTime": 35.5,
        "text": "I was going to die there. Totally alone. I was going to get sick, or get injured or something. The only choice I had, the only thing I could control was when, and how, and where it would happen.",
        "translationVi": "Tôi đã ngỡ mình sẽ chết ở nơi đó. Hoàn toàn cô độc. Tôi sẽ bị ngã bệnh, hoặc bị thương tật hay điều gì đó. Sự lựa chọn duy nhất tôi có, thứ duy nhất tôi kiểm soát được là khi nào, ra sao và ở đâu điều đó sẽ xảy đến.",
        "ipaUs": "/aɪ wʌz ˈɡoʊɪŋ tuː daɪ ðɛr. ˈtoʊtəli əˈloʊn. aɪ wʌz ˈɡoʊɪŋ tuː ɡɛt sɪk, ɔːr ɡɛt ˈɪndʒərd ɔːr ˈsʌmθɪŋ. ðɪ ˈoʊnli tʃɔɪs aɪ hæd, ðɪ ˈoʊnli θɪŋ aɪ kʊd kənˈtroʊl wʌz wɛn, ænd haʊ, ænd wɛr ɪt wʊd ˈhæpən./",
        "keywords": ["totally alone", "only choice I had", "could control"],
        "explanationAi": "Cấu trúc phản ánh tâm trạng bế tắc tột cùng: nhận thức về sự bất lực nhưng vẫn tìm kiếm quyền tự quyết.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 60.0,
        "endTime": 78.5,
        "text": "And I had this feeling like somebody was wrapping their arms around me. And I knew, somehow, that I had to stay alive. Somehow, I had to keep breathing.",
        "translationVi": "Và rồi tôi có cảm giác như có ai đó đang ôm chặt lấy tôi. Và tôi biết, bằng một cách nào đó, tôi phải sống sót. Bằng mọi giá, tôi phải tiếp tục hít thở.",
        "ipaUs": "/ænd aɪ hæd ðɪs ˈfiːlɪŋ laɪk ˈsʌmˌbɑːdi wʌz ˈræpɪŋ ðɛr ɑːrmz əˈraʊnd miː. ænd aɪ njuː, ˈsʌmˌhaʊ, ðæt aɪ hæd tuː steɪ əˈlaɪv. ˈsʌmˌhaʊ, aɪ hæd tuː kiːp ˈbriːðɪŋ./",
        "keywords": ["wrapping their arms", "stay alive", "keep breathing"],
        "explanationAi": "Cụm động từ 'keep breathing' (tiếp tục thở/tiếp tục nuôi hy vọng) trở thành biểu tượng tinh thần kiên cường của nhân vật.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 80.0,
        "endTime": 99.0,
        "text": "Even though there was no reason to hope. And all my logic said that I would never see this place again. So that's what I did. I stayed alive. I kept breathing.",
        "translationVi": "Dù cho chẳng còn bất kỳ lý do nào để hy vọng. Và mọi lý trí của tôi đều bảo rằng tôi sẽ chẳng bao giờ nhìn thấy nơi này nữa. Nên đó là những gì tôi đã làm. Tôi đã sống sót. Tôi đã tiếp tục thở.",
        "ipaUs": "/ˈiːvən ðoʊ ðɛr wʌz noʊ ˈriːzən tuː hoʊp. ænd ɔːl maɪ ˈlɑːdʒɪk sɛd ðæt aɪ wʊd ˈnɛvər siː ðɪs pleɪs əˈɡɛn. soʊ ðæts wʌt aɪ dɪd. aɪ steɪd əˈlaɪv. aɪ kɛpt ˈbriːðɪŋ./",
        "keywords": ["no reason to hope", "stayed alive", "kept breathing"],
        "explanationAi": "Sự đối lập giữa 'logic' tuyệt vọng và bản năng sinh tồn mãnh liệt của con người.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 105.0,
        "endTime": 125.0,
        "text": "And now, here I am. I know what I have to do now. I've got to keep breathing. Because tomorrow the sun will rise. Who knows what the tide could bring?",
        "translationVi": "Và giờ đây, tôi đang đứng ở đây. Tôi biết việc mình phải làm lúc này. Tôi phải tiếp tục hít thở. Bởi vì ngày mai mặt trời sẽ lại mọc. Và ai biết được thủy triều sẽ mang tới điều gì?",
        "ipaUs": "/ænd naʊ, hɪr aɪ æm. aɪ noʊ wʌt aɪ hæv tuː duː naʊ. aɪv ɡɑːt tuː kiːp ˈbriːðɪŋ. bɪˈkɔːz təˈmɑːroʊ ðə sʌn wɪl raɪz. huː noʊz wʌt ðə taɪd kʊd brɪŋ?/",
        "keywords": ["tomorrow the sun will rise", "what the tide could bring"],
        "explanationAi": "Câu kết bất hủ của bộ phim: Niềm tin rằng mỗi ngày mới luôn ẩn chứa cơ hội đổi thay kỳ diệu ('what the tide could bring').",
        "properNouns": []
    }
]

questions_10 = [
    {
        "id": "q_mov_insp_10_1",
        "question": "What is the ultimate life lesson Chuck Noland learns from his years of solitary survival on the island?",
        "questionVi": "Bài học cuộc đời tối hậu mà Chuck Noland đúc kết sau những năm tháng sinh tồn đơn độc trên hoang đảo là gì?",
        "options": [
            "To keep breathing and endure each day, because tomorrow the sun rises and the tide may bring unexpected hope",
            "To never board another international flight again",
            "That technology is unnecessary for human happiness",
            "That professional career achievements are the only things that matter"
        ],
        "optionsVi": [
            "Tiếp tục kiên trì hít thở qua từng ngày, bởi ngày mai mặt trời lại mọc và thủy triều có thể mang tới hy vọng bất ngờ",
            "Không bao giờ bước chân lên một chuyến bay quốc tế nào nữa",
            "Rằng công nghệ là hoàn toàn không cần thiết cho hạnh phúc",
            "Rằng thành tựu sự nghiệp là điều duy nhất có ý nghĩa"
        ],
        "correctAnswer": 0,
        "explanation": "Chuck emphasizes: 'I gotta keep breathing. Because tomorrow the sun will rise. Who knows what the tide could bring?'",
        "explanationVi": "Chuck nhấn mạnh: 'Phải tiếp tục thở. Bởi ngày mai mặt trời lại mọc. Ai biết được thủy triều sẽ mang lại điều gì?'",
        "referenceSegmentIndex": 3,
        "targetedConcept": "Resilience & Endurance",
        "targetedConceptVi": "Sự kiên cường và sức chịu đựng"
    }
]

# ============================================================================
# 12. mov_insp_12: 12 Angry Men
# ============================================================================
cfg_12 = {
    "id": "mov_insp_12",
    "slug": "12-angry-men-juror-8-first-doubt-sequence",
    "var_lesson": "LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE",
    "var_quiz": "QUIZ_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE",
    "file": "lesson_12_angry_men_juror_8_first_doubt_sequence.ts",
    "externalId": "ngbEpZ0tTjI",
    "title": "12 Angry Men: Juror 8 Classic Deliberation & Reasonable Doubt",
    "durationSeconds": 6276,
    "durationFormatted": "104:36",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 140,
    "viewCount": 3662164,
    "studyCount": 6120,
    "description": "Kiệt tác pháp lý - kịch nghệ vĩ đại: Bồi thẩm viên số 8 (Henry Fonda) là người duy nhất bỏ phiếu 'Vô tội' (Not Guilty) giữa 11 phiếu kết tội, kiên quyết đòi hỏi một cuộc thảo luận nghiêm túc trước khi định đoạt mạng sống của một con người.",
    "categoryId": "cat_inspirational_life",
    "categorySlug": "inspirational-life",
    "categoryName": "Phim Truyền Cảm Hứng & Triết Lý"
}

segments_12 = [
    {
        "orderIndex": 0,
        "startTime": 55.0,
        "endTime": 70.0,
        "text": "Eleven for guilty, one for not guilty. — Boy, oh boy. There's always one. — Well, what do we do now? — I guess we talk.",
        "translationVi": "Mười một phiếu có tội, một phiếu vô tội. — Trời đất ơi. Lúc nào cũng có một người như thế. — Vậy giờ chúng ta làm gì? — Tôi nghĩ chúng ta thảo luận.",
        "ipaUs": "/ɪˈlɛvən fɔːr ˈɡɪlti, wʌn fɔːr nɑːt ˈɡɪlti. — bɔɪ, oʊ bɔɪ. ðɛrz ˈɔːlweɪz wʌn. — wɛl, wʌt duː wiː duː naʊ? — aɪ ɡɛs wiː tɔːk./",
        "keywords": ["guilty", "not guilty", "we talk"],
        "explanationAi": "Thuật ngữ bồi thẩm đoàn: 'guilty' (kết tội), 'not guilty' (vô tội/chưa đủ chứng cứ kết án tử hình).",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 75.0,
        "endTime": 92.5,
        "text": "You really think he's innocent? — I don't know. — Then why did you vote not guilty? — There were eleven votes for guilty. It's not easy for me to raise my hand and send a boy off to die without talking about it first.",
        "translationVi": "Ông thực sự nghĩ thằng bé vô tội sao? — Tôi không biết. — Vậy tại sao ông lại bỏ phiếu vô tội? — Đã có 11 phiếu tuyên có tội. Thật không dễ dàng để tôi giơ tay tiễn một thiếu niên lên ghế điện mà không hề thảo luận về nó trước.",
        "ipaUs": "/juː ˈriːəli θɪŋk hiːz ˈɪnəsənt? — aɪ doʊnt noʊ. — ðɛn waɪ dɪd juː voʊt nɑːt ˈɡɪlti? — ðɛr wɜːr ɪˈlɛvən voʊts fɔːr ˈɡɪlti. ɪts nɑːt ˈiːzi fɔːr miː tuː reɪz maɪ hænd ænd sɛnd ə bɔɪ ɔːf tuː daɪ wɪðˈaʊt ˈtɔːkɪŋ əˈbaʊt ɪt fɜːrst./",
        "keywords": ["innocent", "raise my hand", "send a boy off to die", "without talking"],
        "explanationAi": "Nguyên tắc cốt lõi của công lý: dũng khí đứng lên độc lập để bảo vệ quyền được xét xử công bằng.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 110.0,
        "endTime": 128.5,
        "text": "We're talking about somebody's life here. We can't decide it in five minutes. Suppose we're wrong? A guy's life is at stake here. What if we make a mistake?",
        "translationVi": "Chúng ta đang bàn về sinh mạng của một con người ở đây. Chúng ta không thể định đoạt nó chỉ trong năm phút. Giả sử chúng ta sai thì sao? Tính mạng một người đang lâm nguy. Chuyện gì xảy ra nếu chúng ta phạm sai lầm?",
        "ipaUs": "/wɪr ˈtɔːkɪŋ əˈbaʊt ˈsʌmˌbɑːdiz laɪf hɪr. wiː kænt dɪˈsaɪd ɪt ɪn faɪv ˈmɪnɪts. səˈpoʊz wɪr rɔːŋ? ə ɡaɪz laɪf ɪz æt steɪk hɪr. wʌt ɪf wiː meɪk ə mɪˈsteɪk?/",
        "keywords": ["somebody's life", "at stake", "make a mistake", "reasonable doubt"],
        "explanationAi": "Thành ngữ pháp lý đắt giá: 'at stake' mang nghĩa 'đang gặp nguy hiểm, bị đe dọa sinh tử'.",
        "properNouns": []
    }
]

questions_12 = [
    {
        "id": "q_mov_insp_12_1",
        "question": "Why did Juror 8 vote 'not guilty' even though he wasn't completely certain of the boy's innocence?",
        "questionVi": "Tại sao Bồi thẩm viên số 8 lại bỏ phiếu 'vô tội' dù ông chưa hoàn toàn chắc chắn về sự vô tội của cậu bé?",
        "options": [
            "He felt it was unacceptable to send a young boy to execution without a thorough, careful deliberation",
            "He was secretly related to the defendant's family",
            "He wanted to delay the verdict so he could attend a baseball game later",
            "He disliked the prosecutor's closing remarks"
        ],
        "optionsVi": [
            "Ông cảm thấy không thể chấp nhận việc đưa một thiếu niên đến án tử hình mà không thảo luận kỹ lưỡng",
            "Ông có quan hệ họ hàng bí mật với gia đình bị cáo",
            "Ông muốn trì hoãn phán quyết để lát sau đi xem bóng chày",
            "Ông không thích lời kết luận của công tố viên"
        ],
        "correctAnswer": 0,
        "explanation": "Juror 8 explains that when a human life is at stake, justice demands conscientious scrutiny rather than hasty dismissal.",
        "explanationVi": "Bồi thẩm viên số 8 chỉ ra rằng khi sinh mạng một con người đang bị đe dọa, công lý đòi hỏi sự xem xét thấu đáo chứ không thể qua loa.",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Judicial Conscience & Civic Duty",
        "targetedConceptVi": "Lương tâm tư pháp và trách nhiệm công dân"
    }
]

# Write lessons 07 to 12
all_remaining = [
    (cfg_07, segments_07, questions_07),
    (cfg_08, segments_08, questions_08),
    (cfg_09, segments_09, questions_09),
    (cfg_10, segments_10, questions_10),
    (cfg_12, segments_12, questions_12),
]

for cfg, segs, qs in all_remaining:
    content = generate_ts_lesson(cfg, segs, qs)
    path = os.path.join(target_dir, cfg["file"])
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {cfg['file']}")
