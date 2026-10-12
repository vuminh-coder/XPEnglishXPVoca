# scripts/build_romance_data_02_to_06.py
import os
from build_lessons_engine import generate_ts_lesson

target_dir = "features/listening/data/lessons/movies/romance"
os.makedirs(target_dir, exist_ok=True)

# ============================================================================
# 2. BEFORE TRILOGY / BEFORE SUNRISE (mov_rom_02)
# ============================================================================
cfg_02 = {
    "id": "mov_rom_02",
    "slug": "before-sunrise-vienna-night-walk",
    "var_lesson": "LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK",
    "var_quiz": "QUIZ_BEFORE_SUNRISE_VIENNA_NIGHT_WALK",
    "file": "lesson_before_sunrise_vienna_night_walk.ts",
    "externalId": "QV1tiEDvkkw",
    "title": "The Before Trilogy: Jesse & Céline - Love Over Time and Spontaneous Spark",
    "durationSeconds": 819,
    "durationFormatted": "13:39",
    "cefrLevel": "C1",
    "accent": "American & French",
    "wpmSpeed": 140,
    "viewCount": 2560815,
    "studyCount": 3820,
    "description": "Toàn cảnh hành trình lãng mạn kinh điển của Jesse (Ethan Hawke) và Céline (Julie Delpy) qua bộ ba phim Before: từ lời đề nghị táo bạo nhảy khỏi tàu ở Vienna, những cuộc đối thoại triết học sâu sắc trên đường phố, cho đến sự gắn kết bền bỉ theo năm tháng.",
}

segments_02 = [
    {
        "orderIndex": 0,
        "startTime": 28.4,
        "endTime": 37.6,
        "text": "All right, I have an admittedly insane idea, but if I don't ask you this it's gonna haunt me for the rest of my life. — What? — So listen. Here's the deal.",
        "translationVi": "Được rồi, anh có một ý tưởng phải thừa nhận là khá điên rồ, nhưng nếu anh không hỏi em câu này thì nó sẽ ám ảnh anh suốt phần đời còn lại. — Gì cơ? — Nghe này. Kèo thế này nhé.",
        "ipaUs": "/ɔːl raɪt, aɪ hæv ən ədˈmɪtɪdli ɪnˈseɪn aɪˈdiːə, bʌt ɪf aɪ doʊnt æsk juː ðɪs ɪts ˈɡɑːnə hɔːnt miː fɔːr ðə rɛst əv maɪ laɪf. — wɑːt? — soʊ ˈlɪsən. hɪərz ðə diːl./",
        "keywords": ["admittedly insane", "haunt me", "here's the deal"],
        "explanationAi": "Cụm 'admittedly insane idea' thể hiện sự tự nhận thức hóm hỉnh; 'here's the deal' dùng để dẫn nhập một đề xuất bất ngờ.",
        "properNouns": [],
        "tokenCount": 32
    },
    {
        "orderIndex": 1,
        "startTime": 37.7,
        "endTime": 48.0,
        "text": "You should get off the train with me here in Vienna, and come check out the town. — What? — Come on, it'll be fun.",
        "translationVi": "Em nên xuống tàu cùng anh ngay tại Vienna này, rồi đi khám phá thành phố. — Cái gì cơ? — Nào, sẽ vui lắm đấy.",
        "ipaUs": "/juː ʃʊd ɡɛt ɔːf ðə treɪn wɪð miː hɪər ɪn viˈɛnə, ænd kʌm tʃɛk aʊt ðə taʊn. — wɑːt? — kʌm ɑːn, ˈɪtəl biː fʌn./",
        "keywords": ["get off", "check out", "Vienna"],
        "explanationAi": "Lời mời kinh điển khởi đầu kiệt tác Before Sunrise: rủ một người lạ vừa gặp trên tàu cùng bước xuống Vienna.",
        "properNouns": ["Vienna"],
        "tokenCount": 24
    },
    {
        "orderIndex": 2,
        "startTime": 537.6,
        "endTime": 551.7,
        "text": "Think of it like this: jump ahead ten, twenty years, okay? And you're married, only your marriage doesn't have that same energy that it used to.",
        "translationVi": "Hãy nghĩ như thế này nhé: nhảy cóc tới mười, hai mươi năm nữa đi, được chứ? Khi đó em đã kết hôn, chỉ là cuộc hôn nhân không còn giữ được ngọn lửa nhiệt huyết như thuở ban đầu.",
        "ipaUs": "/θɪŋk əv ɪt laɪk ðɪs: dʒʌmp əˈhɛd tɛn, ˈtwɛnti jɪərz, oʊˈkeɪ? ænd jʊər ˈmærɪdʒ, ˈoʊnli jʊər ˈmærɪdʒ ˈdʌzənt hæv ðæt seɪm ˈɛnərdʒi ðæt ɪt juːst tuː./",
        "keywords": ["jump ahead", "energy", "used to"],
        "explanationAi": "Lập luận tâm lý học độc đáo của Jesse để thuyết phục Céline: đặt người nghe vào viễn cảnh tương lai xa xôi.",
        "properNouns": [],
        "tokenCount": 26
    },
    {
        "orderIndex": 3,
        "startTime": 560.4,
        "endTime": 573.8,
        "text": "You start to blame your husband. You start to think about all those guys you met in your life and what might have happened if you'd picked up with one. Well, I'm one of those guys.",
        "translationVi": "Em bắt đầu đổ lỗi cho chồng mình. Em bắt đầu nghĩ về tất cả những chàng trai từng gặp trong đời và chuyện gì sẽ xảy ra nếu ngày đó em chọn một người trong số họ. Thì đấy, anh chính là một trong số những chàng trai đó.",
        "ipaUs": "/juː stɑːrt tuː bleɪm jʊər ˈhʌzbənd. juː stɑːrt tuː θɪŋk əˈbaʊt ɔːl ðoʊz ɡaɪz juː mɛt ɪn jʊər laɪf ænd wɑːt maɪt hæv ˈhæpənd ɪf juːd pɪkt ʌp wɪð wʌn. wɛl, aɪm wʌn əv ðoʊz ɡaɪz./",
        "keywords": ["blame", "picked up with", "what might have happened"],
        "explanationAi": "Cấu trúc phỏng đoán quá khứ 'what might have happened if...' kết hợp cụm 'pick up with' (bắt cặp, hẹn hò).",
        "properNouns": [],
        "tokenCount": 35
    },
    {
        "orderIndex": 4,
        "startTime": 573.8,
        "endTime": 583.9,
        "text": "What this really is, is a gigantic favor to both you and your future husband: to find out that you're not missing out on anything, that I'm just as boring and unmotivated as he is.",
        "translationVi": "Việc này thực chất là một sự giúp đỡ to lớn cho cả em lẫn người chồng tương lai: để em nhận ra rằng em chẳng bỏ lỡ bất cứ điều gì cả, rằng anh cũng tẻ nhạt và thiếu chí tiến thủ y hệt anh ta mà thôi.",
        "ipaUs": "/wɑːt ðɪs ˈrɪəli ɪz, ɪz ə dʒaɪˈɡæntɪk ˈfeɪvər tuː boʊθ juː ænd jʊər ˈfjuːtʃər ˈhʌzbənd: tuː faɪnd aʊt ðæt jʊər nɑːt ˈmɪsɪŋ aʊt ɑːn ˈɛnɪθɪŋ, ðæt aɪm dʒʌst æz ˈbɔːrɪŋ ænd ʌnˈmoʊtɪveɪtɪd æz hiː ɪz./",
        "keywords": ["gigantic favor", "missing out", "unmotivated"],
        "explanationAi": "Thành ngữ 'do someone a gigantic favor' và 'missing out on something' (bỏ lỡ điều gì đó giá trị). Lối tự hạ thấp bản thân (self-deprecation) đầy lôi cuốn.",
        "properNouns": [],
        "tokenCount": 35
    },
    {
        "orderIndex": 5,
        "startTime": 394.9,
        "endTime": 405.8,
        "text": "Now that we've met again, we can change our memory of that December sixteenth. I guess a memory's never finished, as long as you're alive. Baby, you are gonna miss that plane. — I know.",
        "translationVi": "Giờ đây khi chúng ta gặp lại, ta có thể thay đổi ký ức về ngày mười sáu tháng mười hai năm ấy. Em đoán một ký ức sẽ không bao giờ kết thúc, chừng nào ta còn sống. Anh yêu, anh sắp trễ chuyến bay rồi đấy. — Anh biết mà.",
        "ipaUs": "/naʊ ðæt wiːv mɛt əˈɡɛn, wiː kæn tʃeɪndʒ ˈaʊər ˈmɛməri əv ðæt dɪˈsɛmbər sɪksˈtiːnθ. aɪ ɡɛs ə ˈmɛməriz ˈnɛvər ˈfɪnɪʃt, æz lɔːŋ æz jʊər əˈlaɪv. ˈbeɪbi, juː ɑːr ˈɡɑːnə mɪs ðæt pleɪn. — aɪ noʊ./",
        "keywords": ["memory's never finished", "as long as you're alive", "miss that plane"],
        "explanationAi": "Cái kết mở bất hủ của Before Sunset trong căn hộ ở Paris khi Céline khiêu vũ theo điệu nhạc Nina Simone và Jesse quyết định ở lại.",
        "properNouns": ["Paris", "December"],
        "tokenCount": 37
    },
    {
        "orderIndex": 6,
        "startTime": 664.2,
        "endTime": 676.3,
        "text": "If you want true love, then this is it. This is real life. It's not perfect, but it's real. And if you can't see it, then you're blind.",
        "translationVi": "Nếu em muốn một tình yêu đích thực, thì nó chính là thế này đây. Đây là cuộc đời thực. Nó không hoàn hảo, nhưng nó có thật. Và nếu em không nhận ra điều đó, thì em mù quáng rồi.",
        "ipaUs": "/ɪf juː wɑːnt truː lʌv, ðɛn ðɪs ɪz ɪt. ðɪs ɪz rɪəl laɪf. ɪts nɑːt ˈpɜːrfɪkt, bʌt ɪts rɪəl. ænd ɪf juː kænt siː ɪt, ðɛn jʊər blaɪnd./",
        "keywords": ["true love", "real life", "not perfect but real"],
        "explanationAi": "Lời bộc bạch đau đớn nhưng chân thực tột cùng của Jesse ở hồi kết Before Midnight: chấp nhận sự bất toàn của hôn nhân để giữ lấy tình yêu thực sự.",
        "properNouns": [],
        "tokenCount": 27
    }
]

questions_02 = [
    {
        "id": "mov_rom_02_q1",
        "question": "What 'insane idea' did Jesse propose to Céline on the train?",
        "questionVi": "Jesse đã đưa ra 'ý tưởng điên rồ' nào với Céline trên chuyến tàu?",
        "options": [
            "To steal luggage from the conductor.",
            "To get off the train together in Vienna and explore the town.",
            "To move to Paris and marry him immediately.",
            "To write a novel together during the train ride."
        ],
        "optionsVi": [
            "Lấy trộm hành lý của người soát vé.",
            "Cùng nhau bước xuống tàu tại Vienna và đi khám phá thành phố.",
            "Chuyển đến Paris và kết hôn với anh ngay lập tức.",
            "Cùng viết một cuốn tiểu thuyết trong suốt chuyến tàu."
        ],
        "correctAnswer": 1,
        "explanation": "In Segments 0 and 1, Jesse asks Céline: 'You should get off the train with me here in Vienna, and come check out the town.'",
        "explanationVi": "Trong Phân đoạn 0 và 1, Jesse rủ Céline xuống tàu tại Vienna cùng anh để khám phá thành phố.",
        "targetedConcept": "Plot comprehension of Before Sunrise catalyst",
        "targetedConceptVi": "Nắm bắt bước ngoặt mở đầu của Before Sunrise",
        "referenceSegmentIndex": 1
    },
    {
        "id": "mov_rom_02_q2",
        "question": "How does Jesse frame getting off the train as a 'gigantic favor' to Céline's future husband?",
        "questionVi": "Jesse đã lập luận việc xuống tàu như một 'sự giúp đỡ to lớn' cho người chồng tương lai của Céline ra sao?",
        "options": [
            "He will give her money to buy wedding gifts.",
            "She will see that Jesse is just as boring as anyone else, so she won't wonder what she missed out on.",
            "He will teach her how to cook Austrian cuisine.",
            "He will help her find a wealthy partner in Vienna."
        ],
        "optionsVi": [
            "Anh sẽ cho cô tiền mua quà cưới.",
            "Cô sẽ nhận ra Jesse cũng tẻ nhạt như bao người khác, để sau này không phải nuối tiếc mình đã bỏ lỡ điều gì.",
            "Anh sẽ dạy cô nấu ẩm thực Áo.",
            "Anh sẽ giúp cô tìm kiếm một bạn đời giàu có tại Vienna."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Jesse argues that spending time with him will prove she didn't miss out on anything because he is just as ordinary and unmotivated.",
        "explanationVi": "Trong Phân đoạn 4, Jesse lập luận rằng việc đi dạo cùng anh sẽ chứng minh cô không bỏ lỡ điều gì vì anh cũng bình thường và thiếu chí tiến thủ.",
        "targetedConcept": "Understanding Jesse's psychological rhetoric",
        "targetedConceptVi": "Hiểu nghệ thuật thuyết phục tâm lý của Jesse",
        "referenceSegmentIndex": 4
    },
    {
        "id": "mov_rom_02_q3",
        "question": "What famous line concludes Céline and Jesse's reunion in Before Sunset?",
        "questionVi": "Câu thoại nổi tiếng nào khép lại cuộc tái ngộ của Céline và Jesse trong Before Sunset?",
        "options": [
            "'I never want to see you again.'",
            "'Baby, you are gonna miss that plane. — I know.'",
            "'Let's meet back here in six months.'",
            "'Please don't leave Paris.'"
        ],
        "optionsVi": [
            "'Em không bao giờ muốn gặp lại anh nữa.'",
            "'Anh yêu, anh sắp trễ chuyến bay rồi đấy. — Anh biết mà.'",
            "'Hãy gặp lại nhau ở đây sau sáu tháng nữa nhé.'",
            "'Làm ơn đừng rời khỏi Paris.'"
        ],
        "correctAnswer": 1,
        "explanation": "Segment 5 ends with Céline warning: 'Baby, you are gonna miss that plane' and Jesse smiling: 'I know.'",
        "explanationVi": "Phân đoạn 5 kết thúc bằng lời nhắc nhở của Céline: 'Anh yêu, anh sắp trễ chuyến bay rồi đấy' và Jesse mỉm cười: 'Anh biết mà.'",
        "targetedConcept": "Iconic cinematic dialogue recognition",
        "targetedConceptVi": "Nhận biết lời thoại điện ảnh kinh điển",
        "referenceSegmentIndex": 5
    },
    {
        "id": "mov_rom_02_q4",
        "question": "What definition of 'true love' does Jesse present during their argument in Before Midnight?",
        "questionVi": "Jesse đưa ra định nghĩa nào về 'tình yêu đích thực' trong cuộc tranh luận ở Before Midnight?",
        "options": [
            "A fairy tale without any conflict or responsibilities.",
            "Real life that is not perfect, but it is real and honest.",
            "Sacrificing all career goals for family wealth.",
            "Living in separate countries to preserve romantic mystery."
        ],
        "optionsVi": [
            "Một câu chuyện cổ tích không hề có xung đột hay trách nhiệm.",
            "Đời thực tuy không hoàn hảo, nhưng chân thật và có thật.",
            "Hy sinh mọi mục tiêu sự nghiệp vì sự giàu sang của gia đình.",
            "Sống ở hai quốc gia riêng biệt để giữ sự bí ẩn lãng mạn."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 6, Jesse asserts: 'If you want true love, then this is it. This is real life. It's not perfect, but it's real.'",
        "explanationVi": "Trong Phân đoạn 6, Jesse khẳng định: 'Nếu em muốn tình yêu đích thực, thì nó là thế này đây. Đây là cuộc đời thực. Nó không hoàn hảo, nhưng nó có thật.'",
        "targetedConcept": "Philosophical theme of maturity in love",
        "targetedConceptVi": "Chủ đề triết lý về sự trưởng thành trong tình yêu",
        "referenceSegmentIndex": 6
    }
]

f_02 = generate_ts_lesson(cfg_02, segments_02, questions_02)
with open(os.path.join(target_dir, cfg_02["file"]), "w", encoding="utf-8") as f:
    f.write(f_02)
print("Generated Lesson 02 successfully.")

# ============================================================================
# 3. LA LA LAND (mov_rom_03)
# ============================================================================
cfg_03 = {
    "id": "mov_rom_03",
    "slug": "la-la-land-the-fools-who-dream-audition",
    "var_lesson": "LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION",
    "var_quiz": "QUIZ_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION",
    "file": "lesson_la_la_land_the_fools_who_dream_audition.ts",
    "externalId": "gW0xteHHXrY",
    "title": "La La Land: Sebastian & Mia's Fierce Surprise Dinner Confrontation",
    "durationSeconds": 390,
    "durationFormatted": "06:30",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 135,
    "viewCount": 839562,
    "studyCount": 3120,
    "description": "Phân cảnh tranh luận kịch tính đoạt giải Oscar trong La La Land: Sebastian bất ngờ trở về nấu bữa tối lãng mạn cho Mia, nhưng cuộc trò chuyện nhanh chóng chuyển thành xung đột dữ dội về việc thỏa hiệp đam mê nghệ thuật thực thụ để đổi lấy danh tiếng thương mại.",
}

segments_03 = [
    {
        "orderIndex": 0,
        "startTime": 0.0,
        "endTime": 12.0,
        "text": "So where is the new home? — I'm so glad you're home. How's the play going?",
        "translationVi": "Thế nhà mới của chúng mình đâu rồi? — Em mừng vì anh đã về nhà. Vở kịch của em tiến triển sao rồi?",
        "ipaUs": "/soʊ wɛər ɪz ðə nuː hoʊm? — aɪm soʊ ɡlæd jʊər hoʊm. haʊz ðə pleɪ ˈɡoʊɪŋ?/",
        "keywords": ["glad you're home", "play", "going"],
        "explanationAi": "Mở đầu ấm áp của bữa tối bất ngờ trước khi ngọn lửa xung đột bùng nổ.",
        "properNouns": [],
        "tokenCount": 16
    },
    {
        "orderIndex": 1,
        "startTime": 20.0,
        "endTime": 29.0,
        "text": "You nervous about what they think? — I'm nervous to do it. I'm nervous to get up on a stage and perform for people.",
        "translationVi": "Em lo lắng về điều người ta sẽ nghĩ sao? — Em lo khi phải diễn nó. Em lo sợ việc bước lên sân khấu và biểu diễn trước mặt mọi người.",
        "ipaUs": "/juː ˈnɜːrvəs əˈbaʊt wɑːt ðeɪ θɪŋk? — aɪm ˈnɜːrvəs tuː duː ɪt. aɪm ˈnɜːrvəs tuː ɡɛt ʌp ɑːn ə steɪdʒ ænd pərˈfɔːrm fɔːr ˈpiːpl./",
        "keywords": ["nervous", "get up on a stage", "perform"],
        "explanationAi": "Tâm lý bất an của Mia trước thềm buổi diễn độc thoại đầu tay do chính cô viết kịch bản.",
        "properNouns": [],
        "tokenCount": 26
    },
    {
        "orderIndex": 2,
        "startTime": 100.0,
        "endTime": 114.0,
        "text": "When are you finished with the whole tour? — But after we finish, we're gonna go and record and then we go back on tour. We tour so we can make the records.",
        "translationVi": "Khi nào anh mới kết thúc toàn bộ chuyến lưu diễn này? — Nhưng sau khi lưu diễn xong, ban nhạc sẽ vào phòng thu âm, rồi lại tiếp tục đi tour. Bọn anh lưu diễn để có kinh phí thu album.",
        "ipaUs": "/wɛn ɑːr juː ˈfɪnɪʃt wɪð ðə hoʊl tʊr? — bʌt ˈæftər wiː ˈfɪnɪʃ, wɪər ˈɡɑːnə ɡoʊ ænd rɪˈkɔːrd ænd ðɛn wiː ɡoʊ bæk ɑːn tʊr. wiː tʊr soʊ wiː kæn meɪk ðə ˈrɛkərdz./",
        "keywords": ["whole tour", "record", "long haul"],
        "explanationAi": "Sự bàng hoàng của Mia khi nhận ra Sebastian đang bị cuốn vào guồng quay thương mại không có điểm dừng.",
        "properNouns": [],
        "tokenCount": 33
    },
    {
        "orderIndex": 3,
        "startTime": 152.0,
        "endTime": 167.0,
        "text": "You're gonna be on tour for months now? Years? — Yeah, I could be on tour with this for a couple of years, at least. — Do you like the music you're playing?",
        "translationVi": "Anh sẽ đi tour hàng tháng trời? Thậm chí hàng năm sao? — Ừ, anh có thể sẽ lưu diễn với album này khoảng vài năm, ít nhất là thế. — Anh có thích thứ âm nhạc mà anh đang chơi không?",
        "ipaUs": "/jʊər ˈɡɑːnə biː ɑːn tʊr fɔːr mʌnθs naʊ? jɪərz? — jæ, aɪ kʊd biː ɑːn tʊr wɪð ðɪs fɔːr ə ˈkʌpl əv jɪərz, æt liːst. — duː juː laɪk ðə ˈmjuːzɪk jʊər ˈpleɪɪŋ?/",
        "keywords": ["couple of years", "at least", "like the music"],
        "explanationAi": "Câu hỏi mấu chốt của Mia đánh thẳng vào niềm kiêu hãnh và căn tính nghệ sĩ nhạc jazz thuần khiết của Sebastian.",
        "properNouns": [],
        "tokenCount": 35
    },
    {
        "orderIndex": 4,
        "startTime": 206.0,
        "endTime": 223.0,
        "text": "This is what you wanted for me: to have a steady job! — Of course I wanted you to have a steady job so that you could start your club! Why aren't you starting your club?",
        "translationVi": "Đây chính là điều em từng muốn ở anh mà: có một công việc ổn định! — Tất nhiên em muốn anh có công việc ổn định là để anh mở câu lạc bộ của riêng mình! Sao anh không mở câu lạc bộ đi?",
        "ipaUs": "/ðɪs ɪz wɑːt juː ˈwɑːntɪd fɔːr miː: tuː hæv ə ˈstɛdi dʒɑːb! — əv kɔːrs aɪ ˈwɑːntɪd juː tuː hæv ə ˈstɛdi dʒɑːb soʊ ðæt juː kʊd stɑːrt jʊər klʌb! waɪ ɑːrnt juː ˈstɑːrtɪŋ jʊər klʌb?/",
        "keywords": ["steady job", "start your club", "wanted for me"],
        "explanationAi": "Sự xung đột đỉnh điểm giữa định nghĩa về 'sự ổn định' thực dụng và khát vọng mở quán jazz nguyên bản.",
        "properNouns": [],
        "tokenCount": 38
    },
    {
        "orderIndex": 5,
        "startTime": 246.0,
        "endTime": 260.0,
        "text": "People will want to go to your club because you're passionate about it, and people love what other people are passionate about! You remind people of what they forgot.",
        "translationVi": "Mọi người sẽ muốn đến quán của anh vì anh đam mê nó, và người ta luôn yêu thích những gì mà người khác đam mê! Anh nhắc cho mọi người nhớ lại những điều họ từng lãng quên.",
        "ipaUs": "/ˈpiːpl wɪl wɑːnt tuː ɡoʊ tuː jʊər klʌb bɪˈkɔːz jʊər ˈpæʃənət əˈbaʊt ɪt, ænd ˈpiːpl lʌv wɑːt ˈʌðər ˈpiːpl ɑːr ˈpæʃənət əˈbaʊt! juː rɪˈmaɪnd ˈpiːpl əv wɑːt ðeɪ fərˈɡɑːt./",
        "keywords": ["passionate", "remind people", "forgot"],
        "explanationAi": "Một trong những câu thoại đắt giá nhất bộ phim: triết lý về sức lan tỏa của lòng đam mê nghệ thuật.",
        "properNouns": [],
        "tokenCount": 31
    },
    {
        "orderIndex": 6,
        "startTime": 310.0,
        "endTime": 322.0,
        "text": "Maybe you just liked me when I was on my ass, because it made you feel better about yourself! — Are you kidding? No.",
        "translationVi": "Có lẽ em chỉ thích anh khi anh còn là kẻ bết bát thất bại, bởi vì điều đó làm em cảm thấy bản thân mình vượt trội hơn! — Anh đùa đấy à? Không hề.",
        "ipaUs": "/ˈmeɪbi juː dʒʌst laɪkt miː wɛn aɪ wʌz ɑːn maɪ æs, bɪˈkɔːz ɪt meɪd juː fiːl ˈbɛtər əˈbaʊt jʊərˈsɛlf! — ɑːr juː ˈkɪdɪŋ? noʊ./",
        "keywords": ["on my ass", "feel better about yourself", "are you kidding"],
        "explanationAi": "Thành ngữ tiếng lóng 'on one's ass' (khốn đốn, trắng tay, thất nghiệp). Lời nói tổn thương làm tan vỡ mối quan hệ.",
        "properNouns": [],
        "tokenCount": 26
    }
]

questions_03 = [
    {
        "id": "mov_rom_03_q1",
        "question": "What is Mia's main concern about Sebastian touring with the band?",
        "questionVi": "Nỗi lo lắng lớn nhất của Mia về việc Sebastian đi lưu diễn với ban nhạc là gì?",
        "options": [
            "That he will spend all his earnings on luxury cars.",
            "That he is giving up his true dream of opening his own authentic jazz club.",
            "That he will forget how to play the piano.",
            "That he will cancel her theater venue reservation."
        ],
        "optionsVi": [
            "Anh sẽ tiêu hết tiền thù lao vào xe hơi sang trọng.",
            "Anh đang từ bỏ ước mơ thực sự là mở câu lạc bộ jazz nguyên bản của riêng mình.",
            "Anh sẽ quên mất cách chơi đàn piano.",
            "Anh sẽ hủy đặt chỗ địa điểm rạp kịch của cô."
        ],
        "correctAnswer": 1,
        "explanation": "In Segments 3 and 4, Mia questions whether he actually likes the music and why he isn't saving to start his club.",
        "explanationVi": "Trong Phân đoạn 3 và 4, Mia chất vấn liệu anh có thật sự thích thứ âm nhạc đại chúng đó không và tại sao không mở quán jazz như anh từng khao khát.",
        "targetedConcept": "Understanding the central conflict of artistic compromise",
        "targetedConceptVi": "Hiểu xung đột trọng tâm về sự thỏa hiệp nghệ thuật",
        "referenceSegmentIndex": 4
    },
    {
        "id": "mov_rom_03_q2",
        "question": "What does Mia say attracts people to someone else's work?",
        "questionVi": "Mia nói điều gì thu hút mọi người đến với tác phẩm của một ai đó?",
        "options": [
            "Heavy advertising and billboard promotions.",
            "Passion — people love what other people are passionate about.",
            "Cheap admission tickets and discounts.",
            "Famous celebrity endorsements."
        ],
        "optionsVi": [
            "Quảng cáo rầm rộ và biển hiệu lớn ngoài trời.",
            "Niềm đam mê — mọi người luôn yêu thích những gì mà người khác đam mê chân thành.",
            "Giá vé vào cửa rẻ và nhiều khuyến mãi.",
            "Sự bảo chứng của những người nổi tiếng."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 5, Mia says: 'People will want to go to it because you're passionate about it, and people love what other people are passionate about.'",
        "explanationVi": "Trong Phân đoạn 5, Mia nói: 'Mọi người sẽ muốn đến quán vì anh đam mê nó, và người ta luôn yêu thích những gì mà người khác đam mê!'",
        "targetedConcept": "Theme of passion and artistic integrity",
        "targetedConceptVi": "Chủ đề về niềm đam mê và tính chính trực trong nghệ thuật",
        "referenceSegmentIndex": 5
    },
    {
        "id": "mov_rom_03_q3",
        "question": "What hurtful accusation does Sebastian throw at Mia during the argument?",
        "questionVi": "Sebastian đã buông lời buộc tội gây tổn thương nào đối với Mia trong cuộc cãi vã?",
        "options": [
            "That she secretly dislikes theater acting.",
            "That she only liked him when he was struggling and broke, because it made her feel better about herself.",
            "That she wanted him to fail his auditions.",
            "That she never supported his family."
        ],
        "optionsVi": [
            "Rằng cô thầm ghét diễn xuất kịch nghệ.",
            "Rằng cô chỉ thích anh khi anh còn khốn đốn thất bại, vì điều đó giúp cô cảm thấy tự tôn hơn về bản thân.",
            "Rằng cô muốn anh thi trượt các buổi thử giọng.",
            "Rằng cô chưa bao giờ ủng hộ gia đình anh."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 6, Sebastian lashes out: 'Maybe you just liked me when I was on my ass, because it made you feel better about yourself.'",
        "explanationVi": "Trong Phân đoạn 6, Sebastian cay đắng buông lời: 'Có lẽ em chỉ thích anh khi anh còn là kẻ bết bát thất bại, bởi vì điều đó làm em cảm thấy bản thân mình tốt hơn!'",
        "targetedConcept": "Climax of emotional escalation in dramatic dialogue",
        "targetedConceptVi": "Đỉnh điểm leo thang cảm xúc trong đối thoại kịch tính",
        "referenceSegmentIndex": 6
    }
]

f_03 = generate_ts_lesson(cfg_03, segments_03, questions_03)
with open(os.path.join(target_dir, cfg_03["file"]), "w", encoding="utf-8") as f:
    f.write(f_03)
print("Generated Lesson 03 successfully.")

# ============================================================================
# 4. THE NOTEBOOK (mov_rom_04)
# ============================================================================
cfg_04 = {
    "id": "mov_rom_04",
    "slug": "the-notebook-it-wasnt-over-confrontation",
    "var_lesson": "LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION",
    "var_quiz": "QUIZ_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION",
    "file": "lesson_the_notebook_it_wasnt_over_confrontation.ts",
    "externalId": "Y5hVdlRFAUo",
    "title": "The Notebook: Noah and Allie's Most Passionate & Iconic Moments",
    "durationSeconds": 804,
    "durationFormatted": "13:24",
    "cefrLevel": "B2",
    "accent": "American (Southern)",
    "wpmSpeed": 132,
    "viewCount": 1053010,
    "studyCount": 4210,
    "description": "Tuyển tập những khoảnh khắc lãng mạn rực lửa nhất giữa Noah (Ryan Gosling) và Allie (Rachel McAdams) trong The Notebook: từ cuộc gặp gỡ táo bạo trên đu quay, những điệu nhảy giữa ngã tư vắng, đến cuộc hội ngộ đẫm mưa sau nhiều năm xa cách.",
}

segments_04 = [
    {
        "orderIndex": 0,
        "startTime": 58.4,
        "endTime": 71.7,
        "text": "Will you or will you not go out with me? — Okay, fine! I'll go out with you! — Well, don't do me any favors.",
        "translationVi": "Em có chịu hay không chịu đi chơi với anh đây hả? — Được rồi, chịu rồi! Em sẽ đi chơi với anh! — Này, đừng có làm bộ ban ơn cho anh thế chứ.",
        "ipaUs": "/wɪl juː ɔːr wɪl juː nɑːt ɡoʊ aʊt wɪð miː? — oʊˈkeɪ, faɪn! aɪl ɡoʊ aʊt wɪð juː! — wɛl, doʊnt duː miː ˈɛni ˈfeɪvərz./",
        "keywords": ["go out with", "don't do me any favors"],
        "explanationAi": "Màn tỏ tình đu dây liều lĩnh và hài hước của Noah trên vòng quay đu quay tại hội chợ.",
        "properNouns": [],
        "tokenCount": 26
    },
    {
        "orderIndex": 1,
        "startTime": 195.8,
        "endTime": 204.0,
        "text": "I could be whatever you want. You just tell me what you want, and I'll be that for you. — You're dumb. — I could be that.",
        "translationVi": "Anh có thể trở thành bất cứ hình mẫu nào em muốn. Em chỉ cần nói em muốn gì, anh sẽ trở thành người như thế vì em. — Anh thật ngốc nghếch. — Anh ngốc nghếch được luôn.",
        "ipaUs": "/aɪ kʊd biː wʌtˈɛvər juː wɑːnt. juː dʒʌst tɛl miː wɑːt juː wɑːnt, ænd aɪl biː ðæt fɔːr juː. — jʊər dʌm. — aɪ kʊd biː ðæt./",
        "keywords": ["whatever you want", "tell me", "I could be that"],
        "explanationAi": "Lời tán tỉnh chân thành của Noah khi cả hai nằm ngắm đèn giao thông giữa ngã tư Seabrook.",
        "properNouns": [],
        "tokenCount": 27
    },
    {
        "orderIndex": 2,
        "startTime": 429.0,
        "endTime": 441.6,
        "text": "Why didn't you write me? It wasn't over for me! I waited for you for seven years! Now it's too late!",
        "translationVi": "Tại sao anh không viết thư cho em? Với em mọi chuyện chưa bao giờ kết thúc cả! Em đã đợi anh suốt bảy năm trời! Giờ thì quá muộn rồi!",
        "ipaUs": "/waɪ ˈdɪdənt juː raɪt miː? ɪt ˈwɑːzənt ˈoʊvər fɔːr miː! aɪ ˈweɪtɪd fɔːr juː fɔːr ˈsɛvən jɪərz! naʊ ɪts tuː leɪt!/",
        "keywords": ["write me", "wasn't over", "waited for seven years"],
        "explanationAi": "Tiếng thét uất nghẹn trong mưa của Allie khi hai người gặp lại bên bờ hồ sau 7 năm hiểu lầm.",
        "properNouns": [],
        "tokenCount": 24
    },
    {
        "orderIndex": 3,
        "startTime": 441.6,
        "endTime": 454.0,
        "text": "I wrote you three hundred and sixty-five letters. I wrote you every day for a year! — You wrote me? — It wasn't over. It still isn't over!",
        "translationVi": "Anh đã viết cho em ba trăm sáu mươi lăm lá thư. Ngày nào anh cũng viết thư cho em suốt cả một năm ròng! — Anh đã viết thư cho em ư? — Chuyện chưa bao giờ kết thúc cả. Và bây giờ nó vẫn chưa kết thúc!",
        "ipaUs": "/aɪ roʊt juː θriː ˈhʌndrəd ænd ˈsɪksti faɪv ˈlɛtərz. aɪ roʊt juː ˈɛvri deɪ fɔːr ə jɪər! — juː roʊt miː? — ɪt ˈwɑːzənt ˈoʊvər. ɪt stɪl ˈɪzənt ˈoʊvər!/",
        "keywords": ["365 letters", "every day for a year", "still isn't over"],
        "explanationAi": "Lời giải tỏa nút thắt hiểu lầm kinh điển và nụ hôn dưới mưa làm nên biểu tượng điện ảnh lãng mạn.",
        "properNouns": [],
        "tokenCount": 30
    },
    {
        "orderIndex": 4,
        "startTime": 631.9,
        "endTime": 646.9,
        "text": "Would you stop thinking about what everyone wants? Stop thinking about what I want, what he wants, what your parents want. What do you want? What do you want?!",
        "translationVi": "Em có thôi ngay việc bận tâm xem mọi người muốn gì đi không? Đừng nghĩ về việc anh muốn gì, anh ta muốn gì, hay bố mẹ em muốn gì nữa. Bản thân em muốn điều gì? Em muốn điều gì hả?!",
        "ipaUs": "/wʊd juː stɑːp ˈθɪŋkɪŋ əˈbaʊt wɑːt ˈɛvriwʌn wɑːnts? stɑːp ˈθɪŋkɪŋ əˈbaʊt wɑːt aɪ wɑːnt, wɑːt hiː wɑːnts, wɑːt jʊər ˈpɛrənts wɑːnt. wɑːt duː juː wɑːnt? wɑːt duː juː wɑːnt?!/",
        "keywords": ["stop thinking", "what everyone wants", "what do you want"],
        "explanationAi": "Câu thoại kinh điển thức tỉnh Allie trước ngã ba đường giữa nghĩa vụ xã hội và tiếng gọi con tim.",
        "properNouns": [],
        "tokenCount": 33
    },
    {
        "orderIndex": 5,
        "startTime": 730.2,
        "endTime": 743.9,
        "text": "I'm not bitter anymore, because I know that what we had was real. And if in some distant place in the future we see each other, I'll smile at you with joy.",
        "translationVi": "Anh không còn cay đắng nữa, bởi vì anh biết những gì chúng ta từng có là chân thật. Và nếu ở một nơi xa xôi nào đó trong tương lai ta gặp lại nhau, anh sẽ mỉm cười với em trong niềm hân hoan.",
        "ipaUs": "/aɪm nɑːt ˈbɪtər ˌɛniˈmɔːr, bɪˈkɔːz aɪ noʊ ðæt wɑːt wiː hæd wʌz rɪəl. ænd ɪf ɪn sʌm ˈdɪstənt pleɪs ɪn ðə ˈfjuːtʃər wiː siː iːtʃ ˈʌðər, aɪl smaɪl æt juː wɪð dʒɔɪ./",
        "keywords": ["not bitter", "what we had was real", "smile with joy"],
        "explanationAi": "Trích đoạn lá thư cuối cùng Noah viết cho Allie: sự bao dung và tình yêu thuần khiết trường tồn cùng thời gian.",
        "properNouns": [],
        "tokenCount": 35
    }
]

questions_04 = [
    {
        "id": "mov_rom_04_q1",
        "question": "How many letters did Noah write to Allie after she left Seabrook?",
        "questionVi": "Noah đã viết bao nhiêu lá thư cho Allie sau khi cô rời khỏi Seabrook?",
        "options": [
            "Seven letters (one per year).",
            "365 letters (every day for a year).",
            "Fifty letters sent through telegraph.",
            "Only one final letter on her wedding day."
        ],
        "optionsVi": [
            "Bảy lá thư (mỗi năm một lá).",
            "365 lá thư (mỗi ngày một lá trong suốt một năm).",
            "Năm mươi bức điện tín.",
            "Chỉ duy nhất một lá thư vào ngày cưới của cô."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 3, Noah reveals: 'I wrote you 365 letters. I wrote you every day for a year!'",
        "explanationVi": "Trong Phân đoạn 3, Noah tiết lộ: 'Anh đã viết cho em 365 lá thư. Ngày nào anh cũng viết thư cho em suốt cả một năm ròng!'",
        "targetedConcept": "Key plot revelation in The Notebook",
        "targetedConceptVi": "Tiết lộ cốt truyện then chốt trong The Notebook",
        "referenceSegmentIndex": 3
    },
    {
        "id": "mov_rom_04_q2",
        "question": "What does Noah desperately demand Allie to answer during their heated rain argument?",
        "questionVi": "Noah đã tha thiết yêu cầu Allie trả lời câu hỏi gì trong cuộc tranh cãi gay gắt dưới mưa?",
        "options": [
            "How much money her fiancé makes.",
            "What SHE wants, rather than what parents, fiancé, or Noah want.",
            "Whether she still plays the piano.",
            "Why she never returned his phone calls."
        ],
        "optionsVi": [
            "Vị hôn phu của cô kiếm được bao nhiêu tiền.",
            "Bản thân CÔ muốn điều gì, thay vì nghe theo bố mẹ, vị hôn phu hay Noah.",
            "Liệu cô còn chơi đàn piano nữa không.",
            "Tại sao cô không bao giờ gọi lại cho anh."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Noah shouts: 'Stop thinking about what everyone wants... What do you want? What do you want?!'",
        "explanationVi": "Trong Phân đoạn 4, Noah tha thiết hét lên: 'Đừng nghĩ về việc mọi người muốn gì nữa... Bản thân em muốn điều gì? Em muốn điều gì hả?!'",
        "targetedConcept": "Climactic character agency and emotional self-realization",
        "targetedConceptVi": "Quyền tự quyết của nhân vật và sự thức tỉnh cảm xúc",
        "referenceSegmentIndex": 4
    }
]

f_04 = generate_ts_lesson(cfg_04, segments_04, questions_04)
with open(os.path.join(target_dir, cfg_04["file"]), "w", encoding="utf-8") as f:
    f.write(f_04)
print("Generated Lesson 04 successfully.")

# ============================================================================
# 5. PRIDE & PREJUDICE (mov_rom_05)
# ============================================================================
cfg_05 = {
    "id": "mov_rom_05",
    "slug": "pride-and-prejudice-rain-proposal-dawn",
    "var_lesson": "LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN",
    "var_quiz": "QUIZ_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN",
    "file": "lesson_pride_and_prejudice_rain_proposal_dawn.ts",
    "externalId": "baGBRtR53TA",
    "title": "Pride and Prejudice: Mr. Darcy's Unspoken Longing & Devotion",
    "durationSeconds": 604,
    "durationFormatted": "10:04",
    "cefrLevel": "C1",
    "accent": "British (Period RP)",
    "wpmSpeed": 128,
    "viewCount": 3573834,
    "studyCount": 5400,
    "description": "Kiệt tác văn học chuyển thể điện ảnh kinh điển: Ánh mắt si tình, sự kìm nén cảm xúc và hành trình vượt qua kiêu hãnh cùng định kiến của ngài Darcy (Matthew Macfadyen) trước Elizabeth Bennet (Keira Knightley).",
}

segments_05 = [
    {
        "orderIndex": 0,
        "startTime": 211.6,
        "endTime": 225.6,
        "text": "I do not have the talent of conversing easily with people I have never met before. — Perhaps you should take your aunt's advice and practice.",
        "translationVi": "Tôi không có khiếu trò chuyện một cách dễ dàng với những người mà tôi chưa từng gặp trước đây. — Có lẽ ngài nên nghe theo lời khuyên của bà dì và luyện tập thêm.",
        "ipaUs": "/aɪ duː nɑːt hæv ðə ˈtælənt əv kənˈvɜːrsɪŋ ˈiːzɪli wɪð ˈpiːpl aɪ hæv ˈnɛvər mɛt bɪˈfɔːr. — pərˈhæps juː ʃʊd teɪk jʊər ænts ədˈvaɪs ænd ˈpræktɪs./",
        "keywords": ["talent of conversing", "never met before", "practice"],
        "explanationAi": "Cuộc đối đáp dí dỏm và sắc sảo bên phím đàn piano forte tại Rosings Park giữa Darcy và Elizabeth.",
        "properNouns": [],
        "tokenCount": 26
    },
    {
        "orderIndex": 1,
        "startTime": 309.7,
        "endTime": 324.9,
        "text": "In vain I have struggled, and I can bear it no longer. These past months have been a torment. I came to Rosings with the single object of seeing you.",
        "translationVi": "Tôi đã cố đấu tranh trong vô vọng, và tôi không thể chịu đựng thêm được nữa. Những tháng ngày qua đối với tôi là một nỗi dằn vặt khôn nguôi. Tôi đến Rosings này chỉ với một mục đích duy nhất là để được nhìn thấy nàng.",
        "ipaUs": "/ɪn veɪn aɪ hæv ˈstrʌɡəld, ænd aɪ kæn bɛər ɪt noʊ ˈlɔːŋɡər. ðiːz pæst mʌnθs hæv biːn ə ˈtɔːrmɛnt. aɪ keɪm tuː ˈroʊzɪŋz wɪð ðə ˈsɪŋɡl ˈɑːbdʒɪkt əv ˈsiːɪŋ juː./",
        "keywords": ["in vain", "struggled", "torment", "single object"],
        "explanationAi": "Khởi đầu màn cầu hôn dưới mưa tráng lệ: thành ngữ 'in vain' (trong vô vọng), 'torment' (sự giày vò tâm can).",
        "properNouns": ["Rosings"],
        "tokenCount": 31
    },
    {
        "orderIndex": 2,
        "startTime": 324.9,
        "endTime": 338.0,
        "text": "I have fought against my better judgment, my family's expectation, the inferiority of your birth... all these things, and I am willing to put them aside and ask you to end my agony.",
        "translationVi": "Tôi đã đấu tranh chống lại lý trí, sự kỳ vọng của gia tộc, cả vị thế xuất thân khiêm tốn của nàng... tất cả những điều ấy, tôi sẵn sàng gạt bỏ sang một bên để xin nàng hãy chấm dứt nỗi đọa đày này của tôi.",
        "ipaUs": "/aɪ hæv fɔːt əˈɡɛnst maɪ ˈbɛtər ˈdʒʌdʒmənt, maɪ ˈfæməliz ˌɛkspɛkˈteɪʃən, ðɪ ɪnˌfɪəriˈɔːrəti əv jʊər bɜːrθ... ɔːl ðiːz θɪŋz, ænd aɪ æm ˈwɪlɪŋ tuː pʊt ðɛm əˈsaɪd ænd æsk juː tuː ɛnd maɪ ˈæɡəni./",
        "keywords": ["better judgment", "inferiority of birth", "end my agony"],
        "explanationAi": "Mâu thuẫn sâu sắc giữa giai cấp quý tộc phong kiến và tình yêu say đắm thời Nhiếp chính (Regency era).",
        "properNouns": [],
        "tokenCount": 36
    },
    {
        "orderIndex": 3,
        "startTime": 485.9,
        "endTime": 496.1,
        "text": "My affections and wishes have not changed. But one word from you will silence me on this subject forever.",
        "translationVi": "Tình cảm và ước nguyện của tôi vẫn không hề đổi thay. Nhưng chỉ cần một lời từ nàng, tôi sẽ im lặng mãi mãi về chủ đề này.",
        "ipaUs": "/maɪ əˈfɛkʃənz ænd ˈwɪʃɪz hæv nɑːt tʃeɪndʒd. bʌt wʌn wɜːrd frəm juː wɪl ˈsaɪləns miː ɑːn ðɪs ˈsʌbdʒɪkt fərˈɛvər./",
        "keywords": ["affections", "silence me forever"],
        "explanationAi": "Lời giãi bày khiêm nhường trong màn sương sớm khi Darcy tôn trọng tuyệt đối cảm xúc của Elizabeth.",
        "properNouns": [],
        "tokenCount": 21
    },
    {
        "orderIndex": 4,
        "startTime": 496.1,
        "endTime": 515.0,
        "text": "If, however, your feelings have changed, I would have to tell you: you have bewitched me, body and soul, and I love, I love, I love you.",
        "translationVi": "Tuy nhiên, nếu như tình cảm của nàng đã đổi thay, tôi buộc phải nói với nàng rằng: nàng đã bỏ bùa mê tôi, cả thể xác lẫn tâm hồn, và tôi yêu, tôi yêu, tôi yêu nàng tha thiết.",
        "ipaUs": "/ɪf, haʊˈɛvər, jʊər ˈfiːlɪŋz hæv tʃeɪndʒd, aɪ wʊd hæv tuː tɛl juː: juː hæv bɪˈwɪtʃt miː, ˈbɑːdi ænd soʊl, ænd aɪ lʌv, aɪ lʌv, aɪ lʌv juː./",
        "keywords": ["bewitched me", "body and soul", "I love you"],
        "explanationAi": "Đỉnh cao lãng mạn của điện ảnh thế giới: câu nói 'bewitched me body and soul' làm tan chảy trái tim khán giả toàn cầu.",
        "properNouns": [],
        "tokenCount": 30
    },
    {
        "orderIndex": 5,
        "startTime": 515.0,
        "endTime": 526.0,
        "text": "I never wish to be parted from you from this day on.",
        "translationVi": "Tôi không bao giờ muốn phải rời xa nàng kể từ ngày hôm nay trở đi nữa.",
        "ipaUs": "/aɪ ˈnɛvər wɪʃ tuː biː ˈpɑːrtɪd frəm juː frəm ðɪs deɪ ɑːn./",
        "keywords": ["parted from you", "from this day on"],
        "explanationAi": "Lời hẹn thề vĩnh cửu kết thúc chuỗi ngày giằng xé giữa kiêu hãnh và định kiến.",
        "properNouns": [],
        "tokenCount": 13
    }
]

questions_05 = [
    {
        "id": "mov_rom_05_q1",
        "question": "What reason does Mr. Darcy give for not conversing easily at the assembly ball?",
        "questionVi": "Ngài Darcy đưa ra lý do gì cho việc không dễ dàng bắt chuyện tại buổi dạ hội?",
        "options": [
            "He was suffering from a sore throat.",
            "He does not have the talent of conversing easily with strangers.",
            "He considered everyone in Hertfordshire intellectually beneath him.",
            "He lost his dancing gloves."
        ],
        "optionsVi": [
            "Ngài bị viêm họng.",
            "Ngài không có khiếu trò chuyện dễ dàng với những người xa lạ.",
            "Ngài coi tất cả mọi người ở Hertfordshire đều kém cỏi hơn mình.",
            "Ngài làm mất đôi găng tay khiêu vũ."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 0, Mr. Darcy admits to Elizabeth: 'I do not have the talent of conversing easily with people I have never met before.'",
        "explanationVi": "Trong Phân đoạn 0, ngài Darcy thừa nhận: 'Tôi không có khiếu trò chuyện một cách dễ dàng với những người mà tôi chưa từng gặp trước đây.'",
        "targetedConcept": "Character vulnerability and social awkwardness",
        "targetedConceptVi": "Điểm yếu và sự lúng túng xã hội của nhân vật",
        "referenceSegmentIndex": 0
    },
    {
        "id": "mov_rom_05_q2",
        "question": "What famous phrase does Mr. Darcy use during his sunrise confession to Elizabeth?",
        "questionVi": "Ngài Darcy sử dụng cụm từ nổi tiếng nào trong lời tỏ tình lúc rạng đông với Elizabeth?",
        "options": [
            "'You have conquered all my doubts and wealth.'",
            "'You have bewitched me, body and soul, and I love, I love, I love you.'",
            "'My family has finally consented to our union.'",
            "'I shall purchase Pemberley in your name.'"
        ],
        "optionsVi": [
            "'Nàng đã chinh phục mọi mối hoài nghi và của cải của tôi.'",
            "'Nàng đã bỏ bùa mê tôi, cả thể xác lẫn tâm hồn, và tôi yêu, tôi yêu, tôi yêu nàng tha thiết.'",
            "'Gia đình tôi cuối cùng đã ưng thuận mối hôn sự này.'",
            "'Tôi sẽ mua lại Pemberley dưới tên của nàng.'"
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Mr. Darcy whispers the legendary line: 'You have bewitched me, body and soul, and I love, I love, I love you.'",
        "explanationVi": "Trong Phân đoạn 4, ngài Darcy thốt lên câu nói kinh điển: 'Nàng đã bỏ bùa mê tôi, cả thể xác lẫn tâm hồn, và tôi yêu, tôi yêu, tôi yêu nàng tha thiết.'",
        "targetedConcept": "Famous quotation comprehension from classical literature adaptation",
        "targetedConceptVi": "Nhận thức trích dẫn văn học kinh điển trong điện ảnh",
        "referenceSegmentIndex": 4
    }
]

f_05 = generate_ts_lesson(cfg_05, segments_05, questions_05)
with open(os.path.join(target_dir, cfg_05["file"]), "w", encoding="utf-8") as f:
    f.write(f_05)
print("Generated Lesson 05 successfully.")

# ============================================================================
# 6. ME BEFORE YOU (mov_rom_06)
# ============================================================================
cfg_06 = {
    "id": "mov_rom_06",
    "slug": "me-before-you-the-final-letter-in-paris",
    "var_lesson": "LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS",
    "var_quiz": "QUIZ_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS",
    "file": "lesson_me_before_you_the_final_letter_in_paris.ts",
    "externalId": "sLHx2vVa1HA",
    "title": "Me Before You: Lou and Will's Heartfelt Journey & Emotional Bonds",
    "durationSeconds": 541,
    "durationFormatted": "09:01",
    "cefrLevel": "B2",
    "accent": "British",
    "wpmSpeed": 132,
    "viewCount": 2411639,
    "studyCount": 3950,
    "description": "Hành trình đầy xúc cảm giữa Louisa Clark hồn nhiên và Will Traynor kiêu hãnh: những lời đối đáp dí dỏm, buổi hòa nhạc trang trọng, và sự chuyển biến kỳ diệu trong trái tim khi tìm thấy tình yêu thương chân thành.",
}

segments_06 = [
    {
        "orderIndex": 0,
        "startTime": 96.2,
        "endTime": 108.1,
        "text": "And what if I said I didn't want you here? — I'm not employed by you, I'm employed by your mother. So unless she says she doesn't want me here anymore, I'm staying.",
        "translationVi": "Và nếu tôi bảo rằng tôi không muốn cô ở đây thì sao? — Tôi không làm thuê cho anh, tôi làm thuê cho mẹ anh. Nên trừ khi bà ấy bảo không cần tôi ở đây nữa, tôi vẫn sẽ ở lại.",
        "ipaUs": "/ænd wɑːt ɪf aɪ sɛd aɪ ˈdɪdənt wɑːnt juː hɪər? — aɪm nɑːt ɛmˈplɔɪd baɪ juː, aɪm ɛmˈplɔɪd baɪ jʊər ˈmʌðər. soʊ ənˈlɛs ʃiː sɛz ʃiː ˈdʌzənt wɑːnt miː hɪər ˌɛniˈmɔːr, aɪm ˈsteɪɪŋ./",
        "keywords": ["employed by", "unless", "staying"],
        "explanationAi": "Louisa khẳng định cá tính độc lập, kiên cường không chịu lùi bước trước thái độ gắt gỏng ban đầu của Will.",
        "properNouns": [],
        "tokenCount": 36
    },
    {
        "orderIndex": 1,
        "startTime": 169.3,
        "endTime": 175.5,
        "text": "You only get one life, Clark. It's actually your duty to live it as fully as possible.",
        "translationVi": "Cô chỉ có một cuộc đời để sống thôi, Clark. Bổn phận của cô là phải sống nó một cách trọn vẹn nhất có thể.",
        "ipaUs": "/juː ˈoʊnli ɡɛt wʌn laɪf, klɑːrk. ɪts ˈæktʃuəli jʊər ˈduːti tuː lɪv ɪt æz ˈfʊli æz ˈpɑːsəbl./",
        "keywords": ["one life", "duty", "as fully as possible"],
        "explanationAi": "Châm ngôn sống đắt giá nhất của Will Traynor truyền cảm hứng cho Louisa bước ra khỏi vùng an toàn.",
        "properNouns": ["Clark"],
        "tokenCount": 18
    },
    {
        "orderIndex": 2,
        "startTime": 203.1,
        "endTime": 216.4,
        "text": "My favorite outfit was the glittery boots and my bumblebee tights. I just really, really liked having stripy legs.",
        "translationVi": "Bộ đồ yêu thích nhất của em là đôi ủng lấp lánh và chiếc quần tất sọc ong vò vẽ. Em chỉ đơn giản là siêu siêu thích đôi chân sọc vằn vện của mình thôi.",
        "ipaUs": "/maɪ ˈfeɪvərɪt ˈaʊtfɪt wʌz ðə ˈɡlɪtəri buːts ænd maɪ ˈbʌmbəlbiː taɪts. aɪ dʒʌst ˈrɪəli, ˈrɪəli laɪkt ˈhævɪŋ ˈstraɪpi lɛɡz./",
        "keywords": ["glittery boots", "bumblebee tights", "stripy legs"],
        "explanationAi": "Kỷ niệm tuổi thơ đáng yêu của Louisa về chiếc quần tất sọc vàng đen - chi tiết sau này trở thành món quà sinh nhật xúc động Will tặng cô.",
        "properNouns": [],
        "tokenCount": 22
    },
    {
        "orderIndex": 3,
        "startTime": 247.6,
        "endTime": 261.2,
        "text": "Where's better than this then? — Paris. But I want to be in Paris as me, the old me, with pretty French girls giving me the eye.",
        "translationVi": "Thế nơi nào tuyệt hơn chốn này chứ? — Paris. Nhưng tôi muốn đến Paris với tư cách là chính mình, con người cũ của tôi ngày trước, với những cô gái Pháp xinh đẹp liếc mắt đưa tình.",
        "ipaUs": "/wɛərz ˈbɛtər ðæn ðɪs ðɛn? — ˈpærɪs. bʌt aɪ wɑːnt tuː biː ɪn ˈpærɪs æz miː, ði oʊld miː, wɪð ˈprɪti frɛntʃ ɡɜːrlz ˈɡɪvɪŋ miː ði aɪ./",
        "keywords": ["the old me", "giving me the eye", "Paris"],
        "explanationAi": "Nỗi đau kìm nén của một cựu vận động viên tài hoa, thành đạt trước khi gặp tai nạn liệt tứ chi.",
        "properNouns": ["Paris"],
        "tokenCount": 29
    },
    {
        "orderIndex": 4,
        "startTime": 497.7,
        "endTime": 522.9,
        "text": "You okay? — I don't want to go in yet. I just want to be a man who's been to a concert with a girl in a red dress. Just a few minutes more.",
        "translationVi": "Anh ổn chứ? — Tôi chưa muốn vào nhà ngay lúc này. Tôi chỉ muốn được làm một người đàn ông vừa đi xem hòa nhạc về cùng một cô gái mặc váy đỏ. Chỉ vài phút nữa thôi.",
        "ipaUs": "/juː oʊˈkeɪ? — aɪ doʊnt wɑːnt tuː ɡoʊ ɪn jɛt. aɪ dʒʌst wɑːnt tuː biː ə mæn huːz biːn tuː ə ˈkɑːnsərt wɪð ə ɡɜːrl ɪn ə rɛd drɛs. dʒʌst ə fjuː ˈmɪnɪts mɔːr./",
        "keywords": ["girl in a red dress", "concert", "just a few minutes more"],
        "explanationAi": "Khoảnh khắc lãng mạn lắng đọng nhất trong xe hơi sau đêm hòa nhạc Mozart: Will muốn lưu giữ cảm giác của một người đàn ông bình thường được hẹn hò bên người con gái anh yêu.",
        "properNouns": [],
        "tokenCount": 35
    }
]

questions_06 = [
    {
        "id": "mov_rom_06_q1",
        "question": "What core philosophy does Will share with Louisa regarding her future?",
        "questionVi": "Triết lý sống cốt lõi nào mà Will đã chia sẻ với Louisa về tương lai của cô?",
        "options": [
            "Always save money and avoid moving away from family.",
            "You only get one life, and it's your duty to live it as fully as possible.",
            "Never trust people who wear bright colors.",
            "Careers in fashion are completely impractical."
        ],
        "optionsVi": [
            "Luôn tiết kiệm tiền và tránh xa việc dọn ra xa gia đình.",
            "Bạn chỉ có một cuộc đời để sống, và bổn phận của bạn là phải sống trọn vẹn nhất có thể.",
            "Đừng bao giờ tin những người mặc trang phục sặc sỡ.",
            "Sự nghiệp trong ngành thời trang là hoàn toàn phi thực tế."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 1, Will tells Louisa: 'You only get one life, Clark. It's actually your duty to live it as fully as possible.'",
        "explanationVi": "Trong Phân đoạn 1, Will khuyên cô: 'Cô chỉ có một cuộc đời để sống thôi, Clark. Bổn phận của cô là phải sống nó một cách trọn vẹn nhất có thể.'",
        "targetedConcept": "Inspirational theme of personal empowerment",
        "targetedConceptVi": "Chủ đề truyền cảm hứng sống trọn vẹn và tự chủ",
        "referenceSegmentIndex": 1
    },
    {
        "id": "mov_rom_06_q2",
        "question": "Why does Will ask to sit in the car outside the castle for 'a few minutes more'?",
        "questionVi": "Tại sao Will lại xin được ngồi lại trong xe trước lâu đài thêm 'vài phút nữa'?",
        "options": [
            "The wheelchair ramp was broken.",
            "He just wants to linger as a man who has been to a concert with a girl in a red dress.",
            "It was raining heavily outside.",
            "He lost his house keys."
        ],
        "optionsVi": [
            "Đoạn đường dốc cho xe lăn bị hỏng.",
            "Anh chỉ muốn tận hưởng thêm giây phút được là một người đàn ông bình thường vừa đi xem hòa nhạc cùng cô gái mặc váy đỏ.",
            "Trời đang mưa rất to bên ngoài.",
            "Anh làm mất chìa khóa nhà."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 4, Will says: 'I just want to be a man who's been to a concert with a girl in a red dress. Just a few minutes more.'",
        "explanationVi": "Trong Phân đoạn 4, Will tâm sự: 'Tôi chỉ muốn được làm một người đàn ông vừa đi xem hòa nhạc về cùng một cô gái mặc chiếc váy đỏ. Chỉ vài phút nữa thôi.'",
        "targetedConcept": "Emotional climax in romance cinema",
        "targetedConceptVi": "Đỉnh điểm cảm xúc lắng đọng trong phim lãng mạn",
        "referenceSegmentIndex": 4
    }
]

f_06 = generate_ts_lesson(cfg_06, segments_06, questions_06)
with open(os.path.join(target_dir, cfg_06["file"]), "w", encoding="utf-8") as f:
    f.write(f_06)
print("Generated Lesson 06 successfully.")

print("All Lessons 01-06 generated successfully!")
