# scripts/build_romance_data_01_to_06.py
import os
from build_lessons_engine import generate_ts_lesson

print("Generating Lessons 01 to 06...")

target_dir = "features/listening/data/lessons/movies/romance"
os.makedirs(target_dir, exist_ok=True)

# ============================================================================
# 1. ABOUT TIME (mov_rom_01)
# ============================================================================
cfg_01 = {
    "id": "mov_rom_01",
    "slug": "about-time-extraordinary-ordinary-life",
    "var_lesson": "LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE",
    "var_quiz": "QUIZ_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE",
    "file": "lesson_about_time_extraordinary_ordinary_life.ts",
    "externalId": "iUB-sCiZIUw",
    "title": "About Time: Tim Learns the Secret Formula for Happiness (Extended)",
    "durationSeconds": 323,
    "durationFormatted": "05:23",
    "cefrLevel": "B2",
    "accent": "British (RP)",
    "wpmSpeed": 130,
    "viewCount": 553924,
    "studyCount": 2350,
    "description": "Phân cảnh xúc động và sâu sắc bậc nhất trong kiệt tác About Time: Tim thực hành công thức hai bước đạt đến hạnh phúc đích thực do người cha (Bill Nighy) truyền lại. Bằng cách sống lại ngày thứ hai trọn vẹn, Tim học cách buông bỏ căng thẳng, mỉm cười với mọi người xung quanh và trân trọng từng khoảnh khắc ngọt ngào bên Mary.",
}

segments_01 = [
    {
        "orderIndex": 0,
        "startTime": 0.6,
        "endTime": 6.9,
        "text": "I have something very important to tell you. Or, let me check, do you want to know the big secret?",
        "translationVi": "Bố có một điều vô cùng quan trọng cần nói với con. Hoặc để bố xem nào, con có muốn biết bí mật lớn này không?",
        "ipaUs": "/aɪ hæv ˈsʌmθɪŋ ˈvɛri ɪmˈpɔːrtənt tuː tɛl juː. ɔːr, lɛt miː tʃɛk, duː juː wɑːnt tuː noʊ ðə bɪɡ ˈsiːkrət?/",
        "keywords": ["important", "secret", "tell"],
        "explanationAi": "Cách mở đầu thân tình, hóm hỉnh đặc trưng của người cha (Bill Nighy) trước khi truyền lại bài học nhân sinh tối hậu.",
        "properNouns": [],
        "tokenCount": 21
    },
    {
        "orderIndex": 1,
        "startTime": 6.9,
        "endTime": 10.2,
        "text": "Or would you rather find it out for yourself, like I did?",
        "translationVi": "Hay là con muốn tự mình trải nghiệm và nhận ra nó, giống như bố ngày trước?",
        "ipaUs": "/ɔːr wʊd juː ˈræðər faɪnd ɪt aʊt fɔːr jʊərˈsɛlf, laɪk aɪ dɪd?/",
        "keywords": ["would rather", "find out", "for yourself"],
        "explanationAi": "Cấu trúc 'would rather + V' dùng để diễn tả sự lựa chọn ưu tiên giữa hai phương án.",
        "properNouns": [],
        "tokenCount": 12
    },
    {
        "orderIndex": 2,
        "startTime": 10.2,
        "endTime": 18.3,
        "text": "Oh Christ, there's another secret? Less dramatic, but much more important. The real secret.",
        "translationVi": "Trời đất, lại còn bí mật nào nữa ạ? Ít kịch tính hơn, nhưng quan trọng hơn nhiều. Bí mật thực sự đấy.",
        "ipaUs": "/oʊ kraɪst, ðɛrz əˈnʌðər ˈsiːkrət? lɛs drəˈmætɪk, bʌt mʌtʃ mɔːr ɪmˈpɔːrtənt. ðə rɪəl ˈsiːkrət./",
        "keywords": ["dramatic", "much more important", "real"],
        "explanationAi": "Lời cảm thán 'Oh Christ' thể hiện phản xạ hài hước tự nhiên của Tim; 'much more' dùng để nhấn mạnh cấp độ so sánh hơn.",
        "properNouns": [],
        "tokenCount": 16
    },
    {
        "orderIndex": 3,
        "startTime": 21.8,
        "endTime": 30.1,
        "text": "Oh, go on, tell me. Let's save some time. And so he told me his secret formula for happiness.",
        "translationVi": "Thôi nào, bố nói luôn đi, đỡ tốn thời gian. Và thế là bố đã nói cho tôi nghe công thức bí mật để có được hạnh phúc.",
        "ipaUs": "/oʊ, ɡoʊ ɑːn, tɛl miː. lɛts seɪv sʌm taɪm. ænd soʊ hiː toʊld miː hɪz ˈsiːkrət ˈfɔːrmjələ fɔːr ˈhæpinəs./",
        "keywords": ["go on", "save time", "secret formula"],
        "explanationAi": "Phrasal verb 'go on' mang hàm ý hối thúc đối phương tiếp tục câu chuyện.",
        "properNouns": [],
        "tokenCount": 20
    },
    {
        "orderIndex": 4,
        "startTime": 31.8,
        "endTime": 45.8,
        "text": "Part one of the two-part plan was that I should just get on with ordinary life, living it day by day like anyone else.",
        "translationVi": "Phần một trong kế hoạch hai bước là tôi cứ tiếp tục sống một cuộc sống bình thường, sống trọn từng ngày như bao người khác.",
        "ipaUs": "/pɑːrt wʌn əv ðə tuː pɑːrt plæn wʌz ðæt aɪ ʃʊd dʒʌst ɡɛt ɑːn wɪð ˈɔːrdnɛri laɪf, ˈlɪvɪŋ ɪt deɪ baɪ deɪ laɪk ˈɛniwʌn ɛls./",
        "keywords": ["two-part plan", "get on with", "ordinary life"],
        "explanationAi": "Thành ngữ 'get on with ordinary life' nghĩa là tiếp tục nhịp sống đời thường không âu lo hay lạm dụng siêu năng lực.",
        "properNouns": [],
        "tokenCount": 24
    },
    {
        "orderIndex": 5,
        "startTime": 50.3,
        "endTime": 65.6,
        "text": "This statement was revised with a paragraph highlighted from the statute objectives. Is that the best you can do? No, absolutely not, we can change that.",
        "translationVi": "Bản báo cáo này đã được sửa đổi với một đoạn được gạch chân từ mục tiêu pháp lệnh. Đó là tất cả những gì anh làm được sao? Dạ không, hoàn toàn không ạ, chúng tôi sửa được ngay.",
        "ipaUs": "/ðɪs ˈsteɪtmənt wʌz rɪˈvaɪzd wɪð ə ˈpærəɡræf ˈhaɪˌlaɪtɪd frəm ðə ˈstætʃuːt əbˈdʒɛktɪvz. ɪz ðæt ðə bɛst juː kæn duː? noʊ, ˌæbsəˈluːtli nɑːt, wiː kæn tʃeɪndʒ ðæt./",
        "keywords": ["revised", "statute objectives", "absolutely not"],
        "explanationAi": "Tình huống căng thẳng trong phòng xử án London thể hiện áp lực thường nhật của Tim trong ngày đầu tiên.",
        "properNouns": [],
        "tokenCount": 26
    },
    {
        "orderIndex": 6,
        "startTime": 74.3,
        "endTime": 85.0,
        "text": "Good afternoon, sir. Eating in or taking away today? — Take away, please. — Lovely, that's four pounds twenty-four then.",
        "translationVi": "Xin chào anh. Hôm nay anh dùng tại chỗ hay mang về ạ? — Mang về giúp tôi nhé. — Tuyệt quá, của anh hết bốn bảng hai mươi tư xu ạ.",
        "ipaUs": "/ɡʊd ˌæftərˈnuːn, sɜːr. ˈiːtɪŋ ɪn ɔːr ˈteɪkɪŋ əˈweɪ təˈdeɪ? — teɪk əˈweɪ, pliːz. — ˈlʌvli, ðæts fɔːr paʊndz ˈtwɛnti fɔːr ðɛn./",
        "keywords": ["eating in", "taking away", "lovely"],
        "explanationAi": "Cụm giao tiếp thường gặp tại các quán ăn nhanh phong cách Anh: 'eat in' (ăn tại chỗ) vs 'take away' (mang đi).",
        "properNouns": [],
        "tokenCount": 20
    },
    {
        "orderIndex": 7,
        "startTime": 96.0,
        "endTime": 109.0,
        "text": "Do you find the defendant John Welbeck guilty or not guilty of fraud? — Not guilty. — And that is the verdict of you all? — Yes.",
        "translationVi": "Bồi thẩm đoàn tuyên bố bị cáo John Welbeck có tội hay không có tội về hành vi gian lận? — Không có tội. — Đó là phán quyết chung của toàn thể bồi thẩm đoàn chứ? — Vâng, đúng vậy.",
        "ipaUs": "/duː juː faɪnd ðə dɪˈfɛndənt dʒɑːn ˈwɛlbɛk ˈɡɪlti ɔːr nɑːt ˈɡɪlti əv frɔːd? — nɑːt ˈɡɪlti. — ænd ðæt ɪz ðə ˈvɜːrdɪkt əv juː ɔːl? — jɛs./",
        "keywords": ["defendant", "not guilty", "verdict"],
        "explanationAi": "Thuật ngữ pháp lý Anh-Mỹ: 'verdict' (phán quyết của bồi thẩm đoàn), 'fraud' (tội lừa đảo gian lận).",
        "properNouns": ["John Welbeck"],
        "tokenCount": 26
    },
    {
        "orderIndex": 8,
        "startTime": 124.6,
        "endTime": 141.3,
        "text": "Tough day. But then came part two of Dad's plan: he told me to live every day again almost exactly the same.",
        "translationVi": "Một ngày thật nhọc nhằn. Nhưng rồi đến phần hai trong kế hoạch của bố: bố bảo tôi hãy sống lại mỗi ngày gần như y hệt như thế.",
        "ipaUs": "/tʌf deɪ. bʌt ðɛn keɪm pɑːrt tuː əv dædz plæn: hiː toʊld miː tuː lɪv ˈɛvri deɪ əˈɡɛn ˈɔːlmoʊst ɪɡˈzæktli ðə seɪm./",
        "keywords": ["tough day", "part two", "live every day again"],
        "explanationAi": "Bước ngoặt triết lý của bộ phim: sống lại cùng một ngày nhưng với tâm thế tỉnh thức và trân trọng.",
        "properNouns": [],
        "tokenCount": 23
    },
    {
        "orderIndex": 9,
        "startTime": 141.4,
        "endTime": 158.2,
        "text": "The first time with all the tensions and worries that stop us noticing how sweet the world can be, but the second time noticing.",
        "translationVi": "Lần đầu tiên cùng với tất cả sự căng thẳng và lo âu đã ngăn ta nhận ra thế giới ngọt ngào đến nhường nào, nhưng lần thứ hai thì hãy nhận ra nó.",
        "ipaUs": "/ðə fɜːrst taɪm wɪð ɔːl ðə ˈtɛnʃənz ænd ˈwɜːriz ðæt stɑːp ʌs ˈnoʊtɪsɪŋ haʊ swiːt ðə wɜːrld kæn biː, bʌt ðə ˈsɛkənd taɪm ˈnoʊtɪsɪŋ./",
        "keywords": ["tensions", "worries", "noticing how sweet"],
        "explanationAi": "Thông điệp cốt lõi của tác phẩm: vẻ đẹp của cuộc sống nằm ở khả năng hiện diện và cảm nhận những điều nhỏ bé.",
        "properNouns": [],
        "tokenCount": 25
    },
    {
        "orderIndex": 10,
        "startTime": 245.5,
        "endTime": 255.3,
        "text": "So, not such a bad day after all? — No, it's pretty good really, very good day actually.",
        "translationVi": "Hóa ra hôm nay cũng không đến nỗi tệ nhỉ? — Không hề, thực ra ngày hôm nay khá tuyệt, thật sự rất tuyệt vời.",
        "ipaUs": "/soʊ, nɑːt sʌtʃ ə bæd deɪ ˈæftər ɔːl? — noʊ, ɪts ˈprɪti ɡʊd ˈrɪəli, ˈvɛri ɡʊd deɪ ˈæktʃuəli./",
        "keywords": ["after all", "pretty good", "actually"],
        "explanationAi": "Cụm 'after all' diễn tả sự việc hóa ra trái ngược với dự đoán ban đầu (hóa ra, rốt cuộc).",
        "properNouns": [],
        "tokenCount": 19
    },
    {
        "orderIndex": 11,
        "startTime": 255.3,
        "endTime": 273.7,
        "text": "Well, that's a relief, because if it had been a very bad day, I thought I might have had to have had sex with you to make up for it.",
        "translationVi": "Thế thì nhẹ cả người, vì nếu hôm nay là một ngày tồi tệ, em đã nghĩ có khi mình phải ngủ với anh để bù đắp lại rồi đấy.",
        "ipaUs": "/wɛl, ðæts ə rɪˈliːf, bɪˈkɔːz ɪf ɪt hæd biːn ə ˈvɛri bæd deɪ, aɪ θɔːt aɪ maɪt hæv hæd tuː hæv sɛks wɪð juː tuː meɪk ʌp fɔːr ɪt./",
        "keywords": ["relief", "might have had to", "make up for"],
        "explanationAi": "Cấu trúc câu điều kiện loại 3 hỗn hợp kết hợp lối bông đùa dí dỏm cực kỳ duyên dáng của Mary (Rachel McAdams).",
        "properNouns": [],
        "tokenCount": 30
    },
    {
        "orderIndex": 12,
        "startTime": 273.7,
        "endTime": 290.3,
        "text": "It was a very, very bad day! It went very, very badly! I got fired from my job, and then I killed a man!",
        "translationVi": "Đó là một ngày vô cùng, vô cùng tồi tệ luôn! Nó diễn ra tệ hại kinh khủng! Anh vừa bị đuổi việc, xong rồi còn lỡ tay giết người nữa!",
        "ipaUs": "/ɪt wʌz ə ˈvɛri, ˈvɛri bæd deɪ! ɪt wɛnt ˈvɛri, ˈvɛri ˈbædli! aɪ ɡɑːt ˈfaɪərd frəm maɪ dʒɑːb, ænd ðɛn aɪ kɪld ə mæn!/",
        "keywords": ["got fired", "badly", "killed a man"],
        "explanationAi": "Màn đảo ngược tình huống hài hước kinh điển của Tim khi lập tức 'sửa lời' để đòi quyền lợi ngọt ngào từ bạn gái.",
        "properNouns": [],
        "tokenCount": 24
    },
    {
        "orderIndex": 13,
        "startTime": 290.3,
        "endTime": 322.8,
        "text": "That is a very bad day. It's terrible, the worst day ever. I'm so sorry.",
        "translationVi": "Đúng là một ngày tồi tệ thật đấy. Khủng khiếp quá, ngày tồi tệ nhất từ trước đến nay. Em vô cùng chia buồn với anh nha.",
        "ipaUs": "/ðæt ɪz ə ˈvɛri bæd deɪ. ɪts ˈtɛrəbl, ðə wɜːrst deɪ ˈɛvər. aɪm soʊ ˈsɑːri./",
        "keywords": ["terrible", "worst day ever", "so sorry"],
        "explanationAi": "Sự ăn ý ngọt ngào, ấm áp khép lại phân cảnh kinh điển về hạnh phúc đời thường trong About Time.",
        "properNouns": [],
        "tokenCount": 16
    }
]

questions_01 = [
    {
        "id": "mov_rom_01_q1",
        "question": "What is 'Part One' of the father's secret formula for happiness?",
        "questionVi": "Bước một trong công thức hạnh phúc bí mật của người cha là gì?",
        "options": [
            "To travel back in time every morning to win the lottery.",
            "To just get on with ordinary life, living it day by day like anyone else.",
            "To avoid all difficult cases at the courtroom.",
            "To read all classical literature books in the family library."
        ],
        "optionsVi": [
            "Quay ngược thời gian mỗi sáng để trúng xổ số.",
            "Cứ tiếp tục sống một cuộc đời bình thường, sống trọn từng ngày như bao người khác.",
            "Tránh mọi vụ kiện phức tạp tại phòng xử án.",
            "Đọc tất cả sách văn học cổ điển trong thư viện gia đình."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Tim states: 'Part one of the two-part plan was that I should just get on with ordinary life, living it day by day like anyone else.'",
        "explanationVi": "Trong Phân đoạn 4, Tim kể lại: 'Phần một trong kế hoạch hai bước là tôi cứ tiếp tục sống một cuộc sống bình thường, sống trọn từng ngày như bao người khác.'",
        "targetedConcept": "Understanding the first step of happiness formula",
        "targetedConceptVi": "Hiểu bước đầu tiên của công thức hạnh phúc",
        "referenceSegmentIndex": 4
    },
    {
        "id": "mov_rom_01_q2",
        "question": "What does the father advise Tim to do in 'Part Two' of the plan?",
        "questionVi": "Người cha khuyên Tim làm gì trong bước hai của kế hoạch?",
        "options": [
            "To change every past mistake to make huge profits.",
            "To live every day again almost exactly the same, but this time noticing how sweet the world can be.",
            "To quit his job as a lawyer immediately.",
            "To travel fifty years into the future."
        ],
        "optionsVi": [
            "Thay đổi mọi sai lầm quá khứ để kiếm lợi nhuận khổng lồ.",
            "Sống lại mỗi ngày gần như y hệt, nhưng lần này hãy để tâm cảm nhận thế giới ngọt ngào đến nhường nào.",
            "Nghỉ việc luật sư ngay lập tức.",
            "Du hành năm mươi năm tới tương lai."
        ],
        "correctAnswer": 1,
        "explanation": "In Segments 8 and 9, Tim explains that part two is to live each day again, noticing the sweetness of the world that was missed due to tensions and worries.",
        "explanationVi": "Trong Phân đoạn 8 và 9, Tim giải thích phần hai là sống lại từng ngày, để tâm nhận ra vẻ ngọt ngào của thế giới từng bị căng thẳng và lo âu che lấp.",
        "targetedConcept": "Core philosophy of the movie",
        "targetedConceptVi": "Triết lý cốt lõi của tác phẩm",
        "referenceSegmentIndex": 9
    },
    {
        "id": "mov_rom_01_q3",
        "question": "Why did Mary jokingly offer to sleep with Tim when he came home?",
        "questionVi": "Tại sao Mary lại nói đùa rằng cô sẽ ngủ với Tim khi anh về nhà?",
        "options": [
            "Because he brought her a huge birthday present.",
            "Because she thought if he had had a very bad day, she might make up for it.",
            "Because they were celebrating winning the lottery.",
            "Because he had finally quit his stressful job."
        ],
        "optionsVi": [
            "Vì anh mang về cho cô một món quà sinh nhật lớn.",
            "Vì cô nghĩ nếu anh vừa trải qua một ngày tồi tệ, cô có thể ngủ cùng để bù đắp cho anh.",
            "Vì họ đang ăn mừng việc trúng số.",
            "Vì anh đã xin nghỉ công việc đầy áp lực."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 11, Mary remarks: 'if it had been a very bad day, I thought I might have had to have had sex with you to make up for it.'",
        "explanationVi": "Trong Phân đoạn 11, Mary dí dỏm nói: 'nếu hôm nay là một ngày tồi tệ, em đã nghĩ có khi mình phải ngủ với anh để bù đắp lại rồi đấy.'",
        "targetedConcept": "Playful banter between romantic partners",
        "targetedConceptVi": "Lời đối đáp bông đùa duyên dáng giữa đôi tình nhân",
        "referenceSegmentIndex": 11
    },
    {
        "id": "mov_rom_01_q4",
        "question": "How did Tim instantly react after hearing Mary's playful condition?",
        "questionVi": "Tim đã phản ứng ngay lập tức thế nào sau khi nghe điều kiện bông đùa của Mary?",
        "options": [
            "He confessed he had the best day ever.",
            "He jokingly claimed it was a very bad day, that he got fired and killed a man.",
            "He got angry and went straight to sleep.",
            "He traveled back in time to change his answer."
        ],
        "optionsVi": [
            "Anh thú nhận mình vừa có một ngày tuyệt vời nhất đời.",
            "Anh lập tức nói ngược lại rằng ngày hôm nay siêu tệ hại, anh vừa bị đuổi việc và giết người.",
            "Anh nổi giận và đi ngủ ngay lập tức.",
            "Anh quay ngược thời gian để thay đổi câu trả lời."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 12, Tim quickly flips his story: 'It was a very, very bad day! It went very, very badly! I got fired from my job, and then I killed a man!'",
        "explanationVi": "Trong Phân đoạn 12, Tim lập tức 'quay xe': 'Đó là một ngày vô cùng tồi tệ luôn! Anh vừa bị đuổi việc, xong rồi còn giết người nữa!'",
        "targetedConcept": "Comedic reversal in romantic dialogue",
        "targetedConceptVi": "Nghệ thuật đảo ngược tình huống hài hước trong đối thoại",
        "referenceSegmentIndex": 12
    },
    {
        "id": "mov_rom_01_q5",
        "question": "What is the meaning of the phrasal verb 'make up for' in this conversation?",
        "questionVi": "Ý nghĩa của cụm động từ 'make up for' trong cuộc đối thoại này là gì?",
        "options": [
            "To apply cosmetics to one's face.",
            "To compensate for an unpleasant event or loss.",
            "To invent a fictional story.",
            "To reconcile after an argument."
        ],
        "optionsVi": [
            "Trang điểm mỹ phẩm lên mặt.",
            "Đền bù, bù đắp cho một điều không may mắn hoặc mất mát.",
            "Bịa ra một câu chuyện hư cấu.",
            "Làm lành sau một cuộc cãi vã."
        ],
        "correctAnswer": 1,
        "explanation": "'Make up for' means to compensate for something bad or deficient with something positive.",
        "explanationVi": "'Make up for' có nghĩa là bù đắp, đền bù cho một trải nghiệm không vui bằng một điều tốt đẹp.",
        "targetedConcept": "Phrasal verb vocabulary mastery",
        "targetedConceptVi": "Nắm vững ngữ nghĩa cụm động từ thông dụng",
        "referenceSegmentIndex": 11
    },
    {
        "id": "mov_rom_01_q6",
        "question": "What primary lesson does Tim learn about time travel by the end of the film?",
        "questionVi": "Bài học lớn nhất mà Tim rút ra được về năng lực du hành thời gian ở cuối phim là gì?",
        "options": [
            "To endlessly travel back to amass wealth.",
            "To live every single day as if it were the final day of his extraordinary, ordinary life without needing to go back.",
            "To keep time travel a permanent secret from all family members.",
            "To only use time travel during sports competitions."
        ],
        "optionsVi": [
            "Liên tục quay lại quá khứ để tích lũy tiền tài.",
            "Sống trọn vẹn từng ngày như thể đó là ngày cuối cùng của cuộc đời bình thường mà phi thường, không cần phải quay lại nữa.",
            "Giữ kín bí mật du hành thời gian với mọi thành viên gia đình.",
            "Chỉ dùng du hành thời gian trong các giải thi đấu thể thao."
        ],
        "correctAnswer": 1,
        "explanation": "Tim ultimately goes beyond his father's formula: he stops traveling back altogether and instead lives every single day to the fullest as an extraordinary ordinary life.",
        "explanationVi": "Tim cuối cùng đã vượt qua cả công thức của người cha: anh không còn quay lại quá khứ nữa mà trân trọng sống từng ngày như một cuộc đời bình thường nhưng vô cùng phi thường.",
        "targetedConcept": "Theme synthesis of About Time",
        "targetedConceptVi": "Tổng hợp chủ đề tư tưởng kiệt tác About Time",
        "referenceSegmentIndex": 13
    }
]

file_01_content = generate_ts_lesson(cfg_01, segments_01, questions_01)
with open(os.path.join(target_dir, cfg_01["file"]), "w", encoding="utf-8") as f:
    f.write(file_01_content)
print(f"Generated {cfg_01['file']} successfully.")

# Save status
print("Lesson 01 generation complete.")
