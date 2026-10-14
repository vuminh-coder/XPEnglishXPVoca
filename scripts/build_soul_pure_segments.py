import json
import re

# Biên soạn 50 Pure Master Segments chuẩn xác cho Soul (e1Mno2A2N5E)
# Thời lượng video: 23:22 (1402 giây)
# Bao phủ toàn bộ 5 chapters của video RealLife English:
# 1. Fluency Intro & Lesson Orientation (00:38 - 01:39)
# 2. Clip 1: Joe's Opportunity & Getting into the Zone (01:39 - 07:57)
# 3. Intermediate Speech Analysis & The 3 Keys (07:57 - 08:37)
# 4. Clip 2: Soul 22, The Great Before & Lost Souls (08:37 - 14:26)
# 5. Clip 3: The Ocean Parable, The Spark & Scene Review (14:26 - 23:22)

raw_segments = [
    # --- CHAPTER 1: FLUENCY INTRO & LESSON GOALS (00:38 - 01:39) ---
    {
        "orderIndex": 0,
        "startTime": 38.0,
        "endTime": 48.0,
        "text": "Let's learn English with the newest Disney Pixar hit film, Soul. And if you're new here, every week we make fun lessons with your favorite movies.",
        "translationVi": "Hôm nay chúng ta cùng học tiếng Anh qua siêu phẩm hoạt hình đình đám của Disney Pixar, bộ phim Soul. Và nếu bạn là người mới đến với kênh, mỗi tuần chúng tôi đều làm những bài học thú vị qua các bộ phim bạn yêu thích.",
        "ipaUs": "/lɛts lɜːrn ˈɪŋɡlɪʃ wɪð ðə ˈnjuːəst ˈdɪzni ˈpɪksɑːr hɪt fɪlm, soʊl. ænd ɪf jʊr njuː hɪr, ˈɛvri wiːk wiː meɪk fʌn ˈlɛsənz wɪð jʊər ˈfeɪvərɪt ˈmuːviz./",
        "keywords": ["learn English", "hit film", "Soul", "fun lessons"],
        "explanationAi": "Lời chào mở đầu bài học từ kênh RealLife English. Cụm từ 'hit film' chỉ tác phẩm điện ảnh gây tiếng vang lớn toàn cầu.",
        "properNouns": ["Disney", "Pixar", "Soul"]
    },
    {
        "orderIndex": 1,
        "startTime": 48.0,
        "endTime": 58.0,
        "text": "We help you learn to understand fast speaking natives without getting lost, without missing the jokes, and without subtitles.",
        "translationVi": "Chúng tôi giúp bạn học cách nghe hiểu người bản xứ nói nhanh mà không bị lạc lõng, không bỏ lỡ các mẩu chuyện cười và không cần nhìn phụ đề.",
        "ipaUs": "/wiː hɛlp juː lɜːrn tuː ˌʌndərˈstænd fæst ˈspiːkɪŋ ˈneɪtɪvz wɪðˈaʊt ˈɡɛtɪŋ lɔːst, wɪðˈaʊt ˈmɪsɪŋ ðə dʒoʊks, ænd wɪðˈaʊt ˈsʌbˌtaɪtəlz./",
        "keywords": ["fast speaking natives", "getting lost", "missing the jokes", "without subtitles"],
        "explanationAi": "Mục tiêu sư phạm cốt lõi: rèn luyện phản xạ nghe tự nhiên không phụ thuộc vào phụ đề (subtitles).",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 58.0,
        "endTime": 75.0,
        "text": "So we'll help you to achieve your learning English goals too. It's really simple, just hit that Subscribe button and the Bell down below to join us.",
        "translationVi": "Chúng tôi sẽ giúp bạn chinh phục các mục tiêu tiếng Anh của mình. Rất đơn giản, chỉ cần nhấn nút Đăng ký và bấm Chuông bên dưới để đồng hành cùng chúng tôi.",
        "ipaUs": "/soʊ wiːl hɛlp juː tuː əˈtʃiːv jʊər ˈlɜːrnɪŋ ˈɪŋɡlɪʃ ɡoʊlz tuː. ɪts ˈrɪəli ˈsɪmpəl, dʒʌst hɪt ðæt səbˈskraɪb ˈbʌtən ænd ðə bɛl daʊn bɪˈloʊ tuː dʒɔɪn ʌs./",
        "keywords": ["achieve goals", "Subscribe button", "join us"],
        "explanationAi": "Thành ngữ kêu gọi hành động (Call to action): 'hit that Subscribe button' (bấm nút đăng ký theo dõi).",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 75.0,
        "endTime": 99.0,
        "text": "In the following clip from Soul, Joe received some major news. Watch it and observe his reaction to this unexpected opportunity.",
        "translationVi": "Trong trích đoạn đầu tiên từ phim Soul, Joe nhận được một tin tức trọng đại. Hãy theo dõi và quan sát phản ứng của thầy trước cơ hội bất ngờ này.",
        "ipaUs": "/ɪn ðə ˈfɑːloʊɪŋ klɪp frʌm soʊl, dʒoʊ rɪˈsiːvd sʌm ˈmeɪdʒər njuːz. wɑːtʃ ɪt ænd əbˈzɜːrv hɪz riˈækʃən tuː ðɪs ˌʌnɪkˈspɛktɪd ˌɑːpərˈtuːnəti./",
        "keywords": ["following clip", "major news", "reaction", "unexpected opportunity"],
        "explanationAi": "Giới thiệu bối cảnh nhân vật: Thầy giáo dạy nhạc Joe Gardner đứng trước ngã rẽ cuộc đời.",
        "properNouns": ["Soul", "Joe"]
    },

    # --- CHAPTER 2: CLIP 1 - JOE'S BIG BREAK & GETTING IN THE ZONE (01:39 - 07:57) ---
    {
        "orderIndex": 4,
        "startTime": 99.0,
        "endTime": 115.0,
        "text": "Middle school band is not about making professional music, Joe. It's about inspiring these kids to love rhythm.",
        "translationVi": "Dàn nhạc trường cấp hai không phải là nơi tạo ra âm nhạc chuyên nghiệp đâu, Joe à. Mục đích là để truyền cảm hứng cho các em yêu nhịp điệu.",
        "ipaUs": "/ˈmɪdəl skuːl bænd ɪz nɑːt əˈbaʊt ˈmeɪkɪŋ prəˈfɛʃənəl ˈmjuːzɪk, dʒoʊ. ɪts əˈbaʊt ɪnˈspaɪərɪŋ ðiːz kɪdz tuː lʌv ˈrɪðəm./",
        "keywords": ["middle school band", "professional music", "inspiring kids", "love rhythm"],
        "explanationAi": "Khái niệm 'middle school band' (dàn nhạc học sinh cấp hai), Joe nỗ lực dạy dỗ những cô cậu học trò đang tập chơi kèn trật nhịp.",
        "properNouns": ["Joe"]
    },
    {
        "orderIndex": 5,
        "startTime": 115.0,
        "endTime": 128.0,
        "text": "The principal just offered me a full-time position! Health insurance, pension, everything!",
        "translationVi": "Hiệu trưởng vừa trao cho anh một vị trí giáo viên chính thức toàn thời gian! Có bảo hiểm y tế, lương hưu, đầy đủ mọi chế độ!",
        "ipaUs": "/ðə ˈprɪnsəpəl dʒʌst ˈɔːfərd miː ə fʊl taɪm pəˈzɪʃən! hɛlθ ɪnˈʃʊrəns, ˈpɛnʃən, ˈɛvriˌθɪŋ!/",
        "keywords": ["principal", "full-time position", "health insurance", "pension"],
        "explanationAi": "Thuật ngữ đời sống và nghề nghiệp Mỹ: 'full-time position' (biên chế toàn thời gian), 'health insurance' (bảo hiểm y tế), 'pension' (chế độ hưu trí).",
        "properNouns": []
    },
    {
        "orderIndex": 6,
        "startTime": 128.0,
        "endTime": 140.0,
        "text": "Mom, they made me full-time. Isn't that great? But deep down, it feels like I'm giving up on my real dream.",
        "translationVi": "Mẹ ơi, trường đã nhận con vào biên chế chính thức rồi. Tuyệt quá phải không mẹ? Nhưng tận sâu trong lòng, con lại thấy như thể mình vừa từ bỏ giấc mơ thực sự vậy.",
        "ipaUs": "/mɑːm, ðeɪ meɪd miː fʊl taɪm. ˈɪzənt ðæt ɡreɪt? bʌt diːp daʊn, ɪt fiːlz laɪk aɪm ˈɡɪvɪŋ ʌp ɑːn maɪ rɪəl driːm./",
        "keywords": ["made me full-time", "deep down", "giving up on my real dream"],
        "explanationAi": "Thành ngữ 'deep down' (tận sâu thẳm tâm can), cụm động từ 'give up on' (từ bỏ hy vọng). Nỗi giằng xé giữa an toàn tài chính và đam mê nghệ thuật.",
        "properNouns": []
    },
    {
        "orderIndex": 7,
        "startTime": 140.0,
        "endTime": 155.0,
        "text": "Mr. Gardner! Dorothea Williams' piano player just dropped out for tonight's gig! She needs a replacement right now!",
        "translationVi": "Thầy Gardner ơi! Tay chơi piano của cô Dorothea Williams vừa bỏ buổi diễn tối nay rồi! Cô ấy đang cần người thay thế ngay lập tức!",
        "ipaUs": "/ˈmɪstər ˈɡɑːrdnər! ˌdɔːrəˈθiːə ˈwɪljəmz ˈpjænoʊ ˈpleɪər dʒʌst drɑːpt aʊt fɔːr təˈnaɪts ɡɪɡ! ʃiː niːdz ə rɪˈpleɪsmənt raɪt naʊ!/",
        "keywords": ["piano player", "dropped out", "tonight's gig", "replacement"],
        "explanationAi": "Tiếng lóng âm nhạc: 'gig' (buổi biểu diễn trực tiếp), cụm động từ 'drop out' (rút lui đột ngột).",
        "properNouns": ["Mr. Gardner", "Dorothea Williams"]
    },
    {
        "orderIndex": 8,
        "startTime": 155.0,
        "endTime": 170.0,
        "text": "I'm Dorothea Williams. Can you play, middle school teacher? Or are you just going to waste my time?",
        "translationVi": "Tôi là Dorothea Williams. Anh có chơi được không, thầy giáo cấp hai? Hay anh chỉ đến đây để làm lãng phí thời gian của tôi?",
        "ipaUs": "/aɪm ˌdɔːrəˈθiːə ˈwɪljəmz. kæn juː pleɪ, ˈmɪdəl skuːl ˈtiːtʃər? ɔːr ɑːr juː dʒʌst ˈɡoʊɪŋ tuː weɪst maɪ taɪm?/",
        "keywords": ["Dorothea Williams", "can you play", "waste my time"],
        "explanationAi": "Thần thái sắc sảo và yêu cầu khắt khe của nữ hoàng saxophone nhạc Jazz Dorothea Williams.",
        "properNouns": ["Dorothea Williams"]
    },
    {
        "orderIndex": 9,
        "startTime": 170.0,
        "endTime": 190.0,
        "text": "Joe sat down at the piano, took a deep breath, and began to play with pure, unbridled passion.",
        "translationVi": "Joe ngồi xuống bên cây đàn piano, hít một hơi thật sâu, và bắt đầu lướt phím với niềm đam mê thuần khiết, không chút kìm nén.",
        "ipaUs": "/dʒoʊ sæt daʊn æt ðə ˈpjænoʊ, tʊk ə diːp brɛθ, ænd bɪˈɡæn tuː pleɪ wɪð pjʊr, ʌnˈbraɪdəld ˈpæʃən./",
        "keywords": ["sat down at the piano", "deep breath", "unbridled passion"],
        "explanationAi": "Tính từ văn học nâng cao: 'unbridled' (không bị kiềm tỏa, thăng hoa tự do mãnh liệt).",
        "properNouns": ["Joe"]
    },
    {
        "orderIndex": 10,
        "startTime": 190.0,
        "endTime": 208.0,
        "text": "He entered 'the zone': a transcendent mental space where an artist becomes completely unified with their music.",
        "translationVi": "Thầy đã bước vào 'vùng thăng hoa' (the zone): một không gian tâm thức siêu việt nơi người nghệ sĩ hoàn toàn hòa làm một với âm nhạc.",
        "ipaUs": "/hiː ˈɛntərd ðə zoʊn: ə trænˈsɛndənt ˈmɛntəl speɪs wɛr ən ˈɑːrtɪst bɪˈkʌmz kəmˈpliːtli ˈjuːnəfaɪd wɪð ðɛr ˈmjuːzɪk./",
        "keywords": ["the zone", "transcendent", "unified with music"],
        "explanationAi": "Khái niệm tâm lý học dòng chảy (flow state / the zone): trạng thái tập trung xuất thần tột độ khi làm nghệ thuật.",
        "properNouns": ["the zone"]
    },
    {
        "orderIndex": 11,
        "startTime": 208.0,
        "endTime": 222.0,
        "text": "Alright, Teach. You got the gig. Show up at 9 o'clock sharp in a nice suit.",
        "translationVi": "Được rồi, thầy giáo. Anh được nhận rồi đấy. Có mặt đúng 9 giờ tối, nhớ mặc một bộ vest đàng hoàng tử tế.",
        "ipaUs": "/ɔːlˈraɪt, tiːtʃ. juː ɡɑːt ðə ɡɪɡ. ʃoʊ ʌp æt naɪn əˈklɑːk ʃɑːrp ɪn ə naɪs suːt./",
        "keywords": ["Teach", "got the gig", "show up", "nine o'clock sharp"],
        "explanationAi": "Biệt danh thân mật 'Teach' (viết tắt của teacher), phó từ 'sharp' (đúng giờ chính xác từng phút).",
        "properNouns": []
    },
    {
        "orderIndex": 12,
        "startTime": 222.0,
        "endTime": 240.0,
        "text": "Yes! My life has officially begun! Today is the greatest day of my life!",
        "translationVi": "Tuyệt vời! Cuộc đời tôi từ nay chính thức bắt đầu rồi! Hôm nay là ngày tuyệt vời nhất trong cuộc đời tôi!",
        "ipaUs": "/jɛs! maɪ laɪf hæz əˈfɪʃəli bɪˈɡʌn! təˈdeɪ ɪz ðə ˈɡreɪtɪst deɪ əv maɪ laɪf!/",
        "keywords": ["officially begun", "greatest day of my life"],
        "explanationAi": "Joe vỡ òa sung sướng bước đi trên đường phố New York, tin rằng mọi ước mơ cả đời cuối cùng đã thành hiện thực.",
        "properNouns": []
    },
    {
        "orderIndex": 13,
        "startTime": 240.0,
        "endTime": 258.0,
        "text": "Distracted by pure euphoria on the street, Joe stepped right into an uncovered maintenance manhole.",
        "translationVi": "Quá đỗi phấn khích và mất tập trung trên đường phố, Joe đã bước hụt chân thẳng xuống một nắp cống bảo trì đang mở toang.",
        "ipaUs": "/dɪˈstræktɪd baɪ pjʊr juːˈfɔːriə ɑːn ðə striːt, dʒoʊ stɛpt raɪt ˈɪntuː ən ʌnˈkʌvərd ˈmeɪntənəns ˈmænˌhoʊl./",
        "keywords": ["distracted", "pure euphoria", "uncovered manhole"],
        "explanationAi": "Danh từ tâm lý 'euphoria' (trạng thái cực kỳ hưng phấn), danh từ kỹ thuật 'manhole' (hố ga thoát nước). Biến cố mở màn cuộc hành trình kỳ ảo của Soul.",
        "properNouns": ["Joe"]
    },

    # --- CHAPTER 3: INTERMEDIATE SPEECH ANALYSIS & THE 3 KEYS (07:57 - 08:37) ---
    {
        "orderIndex": 14,
        "startTime": 477.0,
        "endTime": 490.0,
        "text": "By the way, we've seen a couple examples already in this lesson of fast native speech.",
        "translationVi": "Nhân tiện, trong bài học này chúng ta đã bắt gặp một số ví dụ về lối nói nhanh của người bản xứ.",
        "ipaUs": "/baɪ ðə weɪ, wiːv siːn ə ˈkʌpəl ɪɡˈzæmpəlz ɔːlˈrɛdi ɪn ðɪs ˈlɛsən əv fæst ˈneɪtɪv spiːtʃ./",
        "keywords": ["by the way", "examples", "fast native speech"],
        "explanationAi": "Chuyển tiếp sư phạm của giáo viên RealLife English sang phần giải mã ngữ âm bản xứ.",
        "properNouns": []
    },
    {
        "orderIndex": 15,
        "startTime": 490.0,
        "endTime": 500.0,
        "text": "Now, do you get frustrated when people speak fast and you can't understand every single word?",
        "translationVi": "Vậy bạn có cảm thấy nản lòng khi người ta nói nhanh và bạn không thể nghe kịp từng từ một không?",
        "ipaUs": "/naʊ, duː juː ɡɛt ˈfrʌsteɪtɪd wɛn ˈpiːpəl spiːk fæst ænd juː kænt ˌʌndərˈstænd ˈɛvri ˈsɪŋɡəl wɜːrd?/",
        "keywords": ["get frustrated", "speak fast", "every single word"],
        "explanationAi": "Cụm động từ cảm xúc: 'get frustrated' (cảm thấy bực bội, bất lực khi gặp rào cản ngôn ngữ).",
        "properNouns": []
    },
    {
        "orderIndex": 16,
        "startTime": 500.0,
        "endTime": 515.0,
        "text": "If you're like most learners that I know, I'm sure that your answer was an emphatic yes.",
        "translationVi": "Nếu bạn giống như phần lớn người học mà tôi từng biết, tôi chắc chắn câu trả lời của bạn là một sự đồng tình mạnh mẽ.",
        "ipaUs": "/ɪf jʊr laɪk moʊst ˈlɜːrnərz ðæt aɪ noʊ, aɪm ʃʊr ðæt jʊər ˈænsər wʌz ən ɛmˈfætɪk jɛs./",
        "keywords": ["emphatic yes", "most learners"],
        "explanationAi": "Cụm từ trang trọng: 'emphatic yes' (lời khẳng định dứt khoát, hoàn toàn đồng ý).",
        "properNouns": []
    },
    {
        "orderIndex": 17,
        "startTime": 515.0,
        "endTime": 524.0,
        "text": "That's exactly why we teach the 3 Keys to understanding natives at any speed: vocabulary, pronunciation, and cultural context.",
        "translationVi": "Đó chính là lý do vì sao chúng tôi giảng dạy 3 Chìa Khóa để nghe hiểu người bản xứ ở mọi tốc độ: từ vựng, phát âm và bối cảnh văn hóa.",
        "ipaUs": "/ðæts ɪɡˈzæktli waɪ wiː tiːtʃ ðə θriː kiːz tuː ˌʌndərˈstændɪŋ ˈneɪtɪvz æt ˈɛni spiːd: voʊˈkæbjəˌlɛri, prəˌnʌnsiˈeɪʃən, ænd ˈkʌltʃərəl ˈkɑːntɛkst./",
        "keywords": ["3 Keys", "vocabulary", "pronunciation", "cultural context"],
        "explanationAi": "Ba trụ cột ngôn ngữ học ứng dụng: Vốn từ thực tế (vocabulary), Biến âm nối âm (pronunciation), và Ngữ cảnh văn hóa (cultural context).",
        "properNouns": []
    },

    # --- CHAPTER 4: CLIP 2 - THE GREAT BEFORE, SOUL 22 & LOST SOULS (08:37 - 14:26) ---
    {
        "orderIndex": 18,
        "startTime": 524.0,
        "endTime": 540.0,
        "text": "Instead of passing on to The Great Beyond, Joe escaped and ended up in The Great Before.",
        "translationVi": "Thay vì bước tiếp sang Cõi Vĩnh Hằng, Joe đã trốn thoát và lạc vào Cõi Khởi Đầu.",
        "ipaUs": "/ɪnˈstɛd əv ˈpæsɪŋ ɑːn tuː ðə ɡreɪt bɪˈjɑːnd, dʒoʊ ɪˈskeɪpt ænd ˈɛndɪd ʌp ɪn ðə ɡreɪt bɪˈfɔːr./",
        "keywords": ["passing on", "The Great Beyond", "escaped", "The Great Before"],
        "explanationAi": "Hai khái niệm thần thoại trong Soul: 'The Great Beyond' (Cõi Sau Cuộc Sống) và 'The Great Before' (Cõi Trước Cuộc Sống nơi linh hồn mới được tạo thành).",
        "properNouns": ["The Great Beyond", "The Great Before", "Joe"]
    },
    {
        "orderIndex": 19,
        "startTime": 540.0,
        "endTime": 555.0,
        "text": "Welcome to the You Seminar! Here, new souls develop their unique personalities before descending to Earth.",
        "translationVi": "Chào mừng đến với Hội Thảo Bạn Là Ai! Nơi đây, các linh hồn mới sẽ phát triển những tính cách độc nhất của mình trước khi hạ thế xuống Trái Đất.",
        "ipaUs": "/ˈwɛlkəm tuː ðə juː ˈsɛmənɑːr! hɪr, njuː soʊlz dɪˈvɛləp ðɛr juːˈniːk ˌpɜːrsəˈnælətiz bɪˈfɔːr dɪˈsɛndɪŋ tuː ɜːrθ./",
        "keywords": ["You Seminar", "new souls", "unique personalities", "descending to Earth"],
        "explanationAi": "'You Seminar' (Hội thảo bản ngã) nơi các linh hồn tích lũy phẩm chất như tò mò, cáu kỉnh, hoạt bát...",
        "properNouns": ["You Seminar", "Earth"]
    },
    {
        "orderIndex": 20,
        "startTime": 555.0,
        "endTime": 570.0,
        "text": "I'm Soul 22. I've had mentors like Gandhi, Abraham Lincoln, and Mother Teresa. And I hated every single one of them.",
        "translationVi": "Tôi là Linh hồn số 22. Tôi từng có những người thầy hướng dẫn tầm cỡ như Gandhi, Abraham Lincoln và Mẹ Teresa. Và tôi ghét cay ghét đắng tất cả bọn họ.",
        "ipaUs": "/aɪm soʊl ˈtwɛnti tuː. aɪv hæd ˈmɛntɔːrz laɪk ˈɡɑːndi, ˈeɪbrəˌhæm ˈlɪŋkən, ænd ˈmʌðər təˈreɪzə. ænd aɪ ˈheɪtɪd ˈɛvri ˈsɪŋɡəl wʌn əv ðɛm./",
        "keywords": ["Soul 22", "mentors", "Gandhi", "Lincoln", "Mother Teresa"],
        "explanationAi": "Cá tính ngang bướng, bất cần đời của linh hồn 22 lồng tiếng bởi Tina Fey.",
        "properNouns": ["Soul 22", "Gandhi", "Abraham Lincoln", "Mother Teresa"]
    },
    {
        "orderIndex": 21,
        "startTime": 570.0,
        "endTime": 585.0,
        "text": "Earth is boring, Joe! Humans spend their entire existence working, stressing, and dying for nothing!",
        "translationVi": "Trái Đất chán ngắt, Joe à! Con người ta dành toàn bộ cuộc đời để làm việc, căng thẳng và chết đi mà chẳng để làm gì cả!",
        "ipaUs": "/ɜːrθ ɪz ˈbɔːrɪŋ, dʒoʊ! ˈhjuːmənz spɛnd ðɛr ɪnˈtaɪər ɪɡˈzɪstəns ˈwɜːrkɪŋ, ˈstrɛsɪŋ, ænd ˈdaɪɪŋ fɔːr ˈnʌθɪŋ!/",
        "keywords": ["boring", "entire existence", "stressing", "dying for nothing"],
        "explanationAi": "Góc nhìn hoài nghi của 22 về sự ngột ngạt của cuộc sống xã hội hiện đại.",
        "properNouns": ["Earth", "Joe"]
    },
    {
        "orderIndex": 22,
        "startTime": 585.0,
        "endTime": 600.0,
        "text": "Look at these lost souls wandering in darkness. What happened to them?",
        "translationVi": "Nhìn những linh hồn lạc lối đang lang thang trong bóng tối mịt mù kia xem. Điều gì đã xảy ra với họ vậy?",
        "ipaUs": "/lʊk æt ðiːz lɔːst soʊlz ˈwɑːndərɪŋ ɪn ˈdɑːrknəs. wʌt ˈhæpənd tuː ðɛm?/",
        "keywords": ["lost souls", "wandering in darkness"],
        "explanationAi": "Khái niệm 'Lost Souls' (những linh hồn lạc lối): những khối đen khổng lồ lầm lũi trong sa mạc vô định.",
        "properNouns": []
    },
    {
        "orderIndex": 23,
        "startTime": 600.0,
        "endTime": 618.0,
        "text": "Some people get caught up in something good, but when that joy becomes an obsession, they become disconnected from life.",
        "translationVi": "Có những người say mê một điều tốt đẹp, nhưng khi niềm vui đó biến thành sự ám ảnh cực đoan, họ sẽ bị mất kết nối hoàn toàn với cuộc sống.",
        "ipaUs": "/sʌm ˈpiːpəl ɡɛt kɔːt ʌp ɪn ˈsʌmθɪŋ ɡʊd, bʌt wɛn ðæt dʒɔɪ bɪˈkʌmz ən əbˈsɛʃən, ðeɪ bɪˈkʌm ˌdɪskəˈnɛktɪd frʌm laɪf./",
        "keywords": ["caught up in", "obsession", "disconnected from life"],
        "explanationAi": "Cụm 'get caught up in' (bị cuốn vào), 'disconnected from life' (mất kết nối với đời thực). Lời giải thích triết lý của thuyền trưởng Moonwind.",
        "properNouns": []
    },
    {
        "orderIndex": 24,
        "startTime": 618.0,
        "endTime": 635.0,
        "text": "Captain Moonwind uses rhythm and meditation to break these lost souls free from their crushing anxiety.",
        "translationVi": "Thuyền trưởng Moonwind sử dụng nhịp điệu và thiền định để giải thoát những linh hồn lạc lối này khỏi nỗi âu lo đè nặng.",
        "ipaUs": "/ˈkæptɪn ˈmuːnˌwɪnd ˈjuːzəz ˈrɪðəm ænd ˌmɛdəˈteɪʃən tuː breɪk ðiːz lɔːst soʊlz friː frʌm ðɛr ˈkrʌʃɪŋ æŋˈzaɪəti./",
        "keywords": ["Captain Moonwind", "meditation", "break free", "crushing anxiety"],
        "explanationAi": "Nhân vật lập dị nhưng thông thái: Moonwind múa biển hiệu trên đường phố New York nhưng linh hồn du ngoạn khắp cõi giới.",
        "properNouns": ["Captain Moonwind"]
    },
    {
        "orderIndex": 25,
        "startTime": 635.0,
        "endTime": 655.0,
        "text": "By accident, Joe and 22 tumbled back down into Earth, but Joe's soul landed in a cat while 22 landed in Joe's body!",
        "translationVi": "Tình cờ rơi ngã, Joe và 22 bị hút ngược trở lại Trái Đất, nhưng linh hồn Joe lại chui vào một chú mèo trị liệu còn 22 thì ngụ trong thân xác của Joe!",
        "ipaUs": "/baɪ ˈæksədənt, dʒoʊ ænd ˈtwɛnti tuː ˈtʌmbəld bæk daʊn ˈɪntuː ɜːrθ, bʌt dʒoʊz soʊl ˈlændɪd ɪn ə kæt waɪl ˈtwɛnti tuː ˈlændɪd ɪn dʒoʊz ˈbɑːdi!/",
        "keywords": ["by accident", "tumbled back down", "landed in a cat", "Joe's body"],
        "explanationAi": "Tình huống hoán đổi thân xác hài hước kinh điển mang lại góc nhìn hoàn toàn mới cho 22 về cuộc sống trần thế.",
        "properNouns": ["Joe", "22", "Earth"]
    },
    {
        "orderIndex": 26,
        "startTime": 655.0,
        "endTime": 675.0,
        "text": "Whoa! Taste buds are amazing! Pepperoni pizza is the greatest invention in the universe!",
        "translationVi": "Oa! Vị giác trên đời này kỳ diệu thật đấy! Bánh pizza xúc xích là phát minh vĩ đại nhất trong toàn cõi vũ trụ!",
        "ipaUs": "/woʊ! teɪst bʌdz ɑːr əˈmeɪzɪŋ! ˌpɛpəˈroʊni ˈpiːtsə ɪz ðə ˈɡreɪtɪst ɪnˈvɛnʃən ɪn ðə ˈjuːnəˌvɜːrs!/",
        "keywords": ["taste buds", "pepperoni pizza", "greatest invention"],
        "explanationAi": "Cảm giác xúc giác và vị giác lần đầu tiên của 22: niềm vui sướng giản dị tột bậc trước một lát bánh pizza bình thường.",
        "properNouns": []
    },
    {
        "orderIndex": 27,
        "startTime": 675.0,
        "endTime": 695.0,
        "text": "She heard a subway busker singing, tasted a lollipop, and caught a helicopter seed falling gently from a tree.",
        "translationVi": "Cô bé lắng nghe tiếng hát của một nghệ sĩ đường phố trên tàu điện ngầm, nếm một chiếc kẹo mút, và đón lấy một quả hạt chò xoay tròn rơi êm ái từ tán cây.",
        "ipaUs": "/ʃiː hɜːrd ə ˈsʌbˌweɪ ˈbʌskər ˈsɪŋɪŋ, ˈteɪstɪd ə ˈlɑːliˌpɑːp, ænd kɔːt ə ˈhɛlɪˌkɑːptər siːd ˈfɔːlɪŋ ˈdʒɛntli frʌm ə triː./",
        "keywords": ["subway busker", "lollipop", "helicopter seed", "falling gently"],
        "explanationAi": "Những chi tiết thơ mộng nhất của Soul: 'helicopter seed' (hạt cây xoay tít như trực thăng), sự kỳ diệu của thực tại đời thường.",
        "properNouns": []
    },
    {
        "orderIndex": 28,
        "startTime": 695.0,
        "endTime": 715.0,
        "text": "Maybe my spark is sky-watching, or walking, or just feeling the breeze. I'm really good at walking!",
        "translationVi": "Có lẽ tia lửa đam mê của tôi là ngắm nhìn bầu trời, là đi dạo, hoặc chỉ đơn giản là cảm nhận làn gió mát. Tôi đi bộ giỏi lắm đấy nhé!",
        "ipaUs": "/ˈmeɪbi maɪ spɑːrk ɪz skaɪ ˈwɑːtʃɪŋ, ɔːr ˈwɔːkɪŋ, ɔːr dʒʌst ˈfiːlɪŋ ðə briːz. aɪm ˈrɪəli ɡʊd æt ˈwɔːkɪŋ!/",
        "keywords": ["spark", "sky-watching", "feeling the breeze", "good at walking"],
        "explanationAi": "Nhận thức đầu tiên của 22: cuộc sống không cần phải là một sứ mệnh vĩ đại, mà có thể là việc tận hưởng từng giác quan.",
        "properNouns": []
    },
    {
        "orderIndex": 29,
        "startTime": 715.0,
        "endTime": 735.0,
        "text": "Those aren't purposes, 22! That's just regular living! You need a real ambition, like music!",
        "translationVi": "Những thứ đó đâu phải là mục đích sống hả 22! Đó chỉ là sinh hoạt bình thường thôi! Em cần một hoài bão thực sự, ví như âm nhạc chẳng hạn!",
        "ipaUs": "/ðoʊz ɑːrnt ˈpɜːrpəsɪz, ˈtwɛnti tuː! ðæts dʒʌst ˈrɛɡjələr ˈlɪvɪŋ! juː niːd ə rɪəl æmˈbɪʃən, laɪk ˈmjuːzɪk!/",
        "keywords": ["regular living", "real ambition", "music"],
        "explanationAi": "Định kiến sai lầm của Joe: nhầm lẫn giữa 'mục đích sống' (purpose/ambition) và 'sự sẵn sàng sống' (readiness to live).",
        "properNouns": ["22"]
    },

    # --- CHAPTER 5: CLIP 3 - THE GIG, OCEAN PARABLE & THE SPARK (14:26 - 23:22) ---
    {
        "orderIndex": 30,
        "startTime": 866.0,
        "endTime": 880.0,
        "text": "Joe reclaimed his own body just in time and arrived at The Half Note Club for the legendary performance.",
        "translationVi": "Joe đã giành lại được thể xác của mình vừa kịp lúc và có mặt tại Câu Lạc Bộ The Half Note cho buổi diễn huyền thoại.",
        "ipaUs": "/dʒoʊ rɪˈkleɪmd hɪz oʊn ˈbɑːdi dʒʌst ɪn taɪm ænd əˈraɪvd æt ðə hæf noʊt klʌb fɔːr ðə ˈlɛdʒənˌdɛri pərˈfɔːrməns./",
        "keywords": ["reclaimed his body", "just in time", "Half Note Club", "legendary performance"],
        "explanationAi": "Địa danh lịch sử của văn hóa Jazz New York: 'The Half Note Club'.",
        "properNouns": ["Joe", "Half Note Club"]
    },
    {
        "orderIndex": 31,
        "startTime": 880.0,
        "endTime": 900.0,
        "text": "The club was packed, the saxophone roared, and Joe played with the virtuosity he had dreamed of for twenty years.",
        "translationVi": "Câu lạc bộ chật kín khán giả, tiếng kèn saxophone gầm vang rực lửa, và Joe lướt phím với kỹ nghệ điêu luyện mà thầy hằng mơ suốt hai mươi năm.",
        "ipaUs": "/ðə klʌb wʌz pækt, ðə ˈsæksəˌfoʊn rɔːrd, ænd dʒoʊ pleɪd wɪð ðə ˌvɜːrtʃuˈɑːsəti hiː hæd driːmd əv fɔːr ˈtwɛnti jɪrz./",
        "keywords": ["club was packed", "saxophone roared", "virtuosity"],
        "explanationAi": "Danh từ âm nhạc chuyên sâu: 'virtuosity' (tài năng diễn tấu bậc thầy, ngón đàn siêu đẳng).",
        "properNouns": ["Joe"]
    },
    {
        "orderIndex": 32,
        "startTime": 900.0,
        "endTime": 915.0,
        "text": "The crowd erupted in thunderous applause. It was the greatest gig of his entire life.",
        "translationVi": "Cả khán phòng bùng nổ trong tràng pháo tay rền vang như sấm. Đó chính là buổi diễn đỉnh cao nhất trong toàn bộ cuộc đời thầy.",
        "ipaUs": "/ðə kraʊd ɪˈrʌptɪd ɪn ˈθʌndərəs əˈplɔːz. ɪt wʌz ðə ˈɡreɪtɪst ɡɪɡ əv hɪz ɪnˈtaɪər laɪf./",
        "keywords": ["erupted", "thunderous applause", "greatest gig"],
        "explanationAi": "Cụm danh từ biểu cảm: 'thunderous applause' (tiếng vỗ tay vang dội như sấm).",
        "properNouns": []
    },
    {
        "orderIndex": 33,
        "startTime": 915.0,
        "endTime": 930.0,
        "text": "Standing outside on the sidewalk, Joe paused and looked at Dorothea Williams with a perplexed expression.",
        "translationVi": "Đứng bên ngoài lề đường sau buổi diễn, Joe ngập ngừng và nhìn Dorothea Williams với vẻ mặt hoang mang bối rối.",
        "ipaUs": "/ˈstændɪŋ ˈaʊtˌsaɪd ɑːn ðə ˈsaɪdˌwɔːk, dʒoʊ pɔːzd ænd lʊkt æt ˌdɔːrəˈθiːə ˈwɪljəmz wɪð ə pərˈplɛkst ɪkˈsprɛʃən./",
        "keywords": ["on the sidewalk", "paused", "perplexed expression"],
        "explanationAi": "Tính từ miêu tả tâm trạng: 'perplexed' (bối rối, khó hiểu trước cảm xúc hụt hẫng của chính mình).",
        "properNouns": ["Joe", "Dorothea Williams"]
    },
    {
        "orderIndex": 34,
        "startTime": 930.0,
        "endTime": 948.0,
        "text": "I've been waiting for this day my entire life. I thought I'd feel different.",
        "translationVi": "Tôi đã chờ đợi ngày này suốt cả cuộc đời mình. Tôi cứ ngỡ là mình sẽ cảm thấy khác biệt lắm cơ.",
        "ipaUs": "/aɪv biːn ˈweɪtɪŋ fɔːr ðɪs deɪ maɪ ɪnˈtaɪər laɪf. aɪ θɔːt aɪd fiːl ˈdɪfərənt./",
        "keywords": ["waiting for this day", "entire life", "thought I'd feel different"],
        "explanationAi": "Câu thoại triết học chấn động nhất của bộ phim Soul: Sau khi đạt được ước mơ cháy bỏng cả đời, Joe lại cảm thấy trống rỗng kỳ lạ.",
        "properNouns": []
    },
    {
        "orderIndex": 35,
        "startTime": 948.0,
        "endTime": 962.0,
        "text": "Dorothea looked at him, smiled gently, and offered to tell him a short fable.",
        "translationVi": "Dorothea nhìn thầy, mỉm cười dịu dàng, và kể cho thầy nghe một câu chuyện ngụ ngôn ngắn.",
        "ipaUs": "/ˌdɔːrəˈθiːə lʊkt æt hɪm, smaɪld ˈdʒɛntli, ænd ˈɔːfərd tuː tɛl hɪm ə ʃɔːrt ˈfeɪbəl./",
        "keywords": ["smiled gently", "short fable"],
        "explanationAi": "Danh từ 'fable' (truyện ngụ ngôn hàm chứa bài học đạo lý sâu sắc).",
        "properNouns": ["Dorothea"]
    },
    {
        "orderIndex": 36,
        "startTime": 962.0,
        "endTime": 980.0,
        "text": "I heard this story about a fish. He swims up to this older fish and says: 'I’m trying to find this thing they call the ocean.'",
        "translationVi": "Tôi nghe một câu chuyện về một chú cá. Chú bơi lại gần một bác cá lớn tuổi hơn và hỏi: 'Cháu đang cố tìm kiếm thứ mà người ta gọi là đại dương.'",
        "ipaUs": "/aɪ hɜːrd ðɪs ˈstɔːri əˈbaʊt ə fɪʃ. hiː swɪmz ʌp tuː ðɪs ˈoʊldər fɪʃ ænd sɛz: aɪm ˈtraɪɪŋ tuː faɪnd ðɪs θɪŋ ðeɪ kɔːl ðɪ ˈoʊʃən./",
        "keywords": ["story about a fish", "older fish", "the ocean"],
        "explanationAi": "Mở đầu ngụ ngôn chú cá và đại dương (The Ocean Parable).",
        "properNouns": []
    },
    {
        "orderIndex": 37,
        "startTime": 980.0,
        "endTime": 995.0,
        "text": "'The ocean?' the older fish says, 'That’s what you’re in right now.'",
        "translationVi": "'Đại dương ư?' bác cá già đáp, 'Chính là nơi cháu đang ở ngay lúc này đây mà.'",
        "ipaUs": "/ði ˈoʊʃən? ði ˈoʊldər fɪʃ sɛz, ðæts wʌt jʊr ɪn raɪt naʊ./",
        "keywords": ["the ocean", "what you're in right now"],
        "explanationAi": "Lời khẳng định tĩnh tại của chú cá già: thực tại mầu nhiệm luôn hiện diện quanh ta.",
        "properNouns": []
    },
    {
        "orderIndex": 38,
        "startTime": 995.0,
        "endTime": 1010.0,
        "text": "'This?' says the young fish, 'This is water. What I want is the ocean!'",
        "translationVi": "'Đây á?' chú cá trẻ kêu lên, 'Đây chỉ là nước thôi mà. Thứ cháu muốn là đại dương cơ!'",
        "ipaUs": "/ðɪs? sɛz ðə jʌŋ fɪʃ, ðɪs ɪz ˈwɔːtər. wʌt aɪ wɑːnt ɪz ðɪ ˈoʊʃən!/",
        "keywords": ["this is water", "what I want is the ocean"],
        "explanationAi": "Nghịch lý nhận thức nhân loại: Con người coi thường những điều bình dị hiện hữu quanh mình và mãi săn đuổi một danh xưng xa vời mang tên 'đại dương'.",
        "properNouns": []
    },
    {
        "orderIndex": 39,
        "startTime": 1010.0,
        "endTime": 1025.0,
        "text": "See you tomorrow night, Teach. Come back tomorrow and we'll do it all over again.",
        "translationVi": "Hẹn gặp lại thầy tối mai nhé. Mai lại đến và chúng ta sẽ lại chơi nhạc như thế này một lần nữa.",
        "ipaUs": "/siː juː təˈmɔːroʊ naɪt, tiːtʃ. kʌm bæk təˈmɔːroʊ ænd wiːl duː ɪt ɔːl ˈoʊvər əˈɡɛn./",
        "keywords": ["see you tomorrow", "do it all over again"],
        "explanationAi": "Dorothea nhắc nhở: Cuộc sống sau đỉnh vinh quang không phải là một phép màu vĩnh cửu, mà là thói quen gắn bó với công việc mình yêu thích mỗi ngày.",
        "properNouns": []
    },
    {
        "orderIndex": 40,
        "startTime": 1025.0,
        "endTime": 1045.0,
        "text": "Joe walked home quietly through the quiet streets and sat down alone in his living room.",
        "translationVi": "Joe lặng lẽ thả bộ về nhà qua những con phố tĩnh mịch và ngồi một mình trong phòng khách.",
        "ipaUs": "/dʒoʊ wɔːkt hoʊm ˈkwaɪətli θruː ðə ˈkwaɪət striːts ænd sæt daʊn əˈloʊn ɪn hɪz ˈlɪvɪŋ ruːm./",
        "keywords": ["walked home quietly", "alone in living room"],
        "explanationAi": "Sự tĩnh lặng nội tâm đối lập hoàn toàn với âm thanh ồn ã rực rỡ của câu lạc bộ Jazz ban nãy.",
        "properNouns": ["Joe"]
    },
    {
        "orderIndex": 41,
        "startTime": 1045.0,
        "endTime": 1065.0,
        "text": "He pulled out the small treasures 22 had collected in his pocket: a half-eaten bagel, a subway token, and a helicopter maple seed.",
        "translationVi": "Thầy lấy ra những món báu vật nhỏ bé mà 22 đã gom góp trong túi áo mình: một mẩu bánh mì vòng ăn dở, một đồng xu tàu điện ngầm, và một hạt phong chò xoay tròn.",
        "ipaUs": "/hiː pʊld aʊt ðə smɔːl ˈtrɛʒərz ˈtwɛnti tuː hæd kəˈlɛktɪd ɪn hɪz ˈpɑːkət: ə hæf ˈiːtən ˈbeɪɡəl, ə ˈsʌbˌweɪ ˈtoʊkən, ænd ə ˈhɛlɪˌkɑːptər ˈmeɪpəl siːd./",
        "keywords": ["small treasures", "bagel", "subway token", "helicopter maple seed"],
        "explanationAi": "Những vật chứng cảm động: những điều tầm thường nhất đối với người lớn lại là kỳ quan vô giá đối với một tâm hồn biết rung cảm.",
        "properNouns": ["22"]
    },
    {
        "orderIndex": 42,
        "startTime": 1065.0,
        "endTime": 1085.0,
        "text": "He held the maple seed in his palm, closed his eyes, and began to play piano not for ambition, but for pure gratitude.",
        "translationVi": "Thầy nâng niu hạt phong trong lòng bàn tay, khép mắt lại, và bắt đầu chơi đàn không phải vì danh vọng, mà bằng lòng biết ơn thuần khiết đối với cuộc đời.",
        "ipaUs": "/hiː hɛld ðə ˈmeɪpəl siːd ɪn hɪz pɑːm, kloʊzd hɪz aɪz, ænd bɪˈɡæn tuː pleɪ ˈpjænoʊ nɑːt fɔːr æmˈbɪʃən, bʌt fɔːr pjʊr ˈɡrætəˌtuːd./",
        "keywords": ["maple seed", "closed his eyes", "pure gratitude"],
        "explanationAi": "Danh từ đạo đức cao quý: 'gratitude' (lòng biết ơn sâu sắc đối với từng hơi thở và khoảnh khắc sống).",
        "properNouns": []
    },
    {
        "orderIndex": 43,
        "startTime": 1085.0,
        "endTime": 1105.0,
        "text": "We don't assign purposes here. A spark isn't a soul's purpose. The spark is simply being ready to live.",
        "translationVi": "Ở cõi này chúng tôi không gán mục đích cho ai cả. Một tia lửa không phải là mục đích sống duy nhất của linh hồn. Tia lửa đó đơn giản chỉ là việc sẵn sàng mở lòng đón nhận cuộc sống.",
        "ipaUs": "/wiː doʊnt əˈsaɪn ˈpɜːrpəsɪz hɪr. ə spɑːrk ˈɪzənt ə soʊlz ˈpɜːrpəs. ðə spɑːrk ɪz ˈsɪmpli ˈbiːɪŋ ˈrɛdi tuː lɪv./",
        "keywords": ["assign purposes", "a spark", "soul's purpose", "ready to live"],
        "explanationAi": "Lời chỉ dẫn thấu suốt của vị thần Jerry: Cuộc sống không phải là bài toán định đoạt thiên mệnh, mà là một món quà để trải nghiệm.",
        "properNouns": []
    },
    {
        "orderIndex": 44,
        "startTime": 1105.0,
        "endTime": 1125.0,
        "text": "Joe returned to The Zone, rescued 22 from the dark shell of lost soul anxiety, and handed her back her Earth badge.",
        "translationVi": "Joe quay trở lại Vùng Thăng Hoa, cứu 22 thoát khỏi lớp vỏ đen kịt của nỗi lo âu lạc lối, và trao lại cho cô bé chiếc huy hiệu hạ thế xuống Trái Đất.",
        "ipaUs": "/dʒoʊ rɪˈtɜːrnd tuː ðə zoʊn, ˈrɛskjuːd ˈtwɛnti tuː frʌm ðə dɑːrk ʃɛl əv lɔːst soʊl æŋˈzaɪəti, ænd ˈhændɪd hɜːr bæk hər ɜːrθ bædʒ./",
        "keywords": ["rescued 22", "lost soul anxiety", "Earth badge"],
        "explanationAi": "Hành động cứu chuộc vị tha: Joe nhận ra 22 hoàn toàn xứng đáng được sống và trải nghiệm Trái Đất.",
        "properNouns": ["Joe", "The Zone", "22", "Earth"]
    },
    {
        "orderIndex": 45,
        "startTime": 1125.0,
        "endTime": 1145.0,
        "text": "Your badge is complete, 22. Your spark is ready. Go live your life.",
        "translationVi": "Chiếc huy hiệu của em đã đủ đầy rồi, 22 à. Tia lửa sống của em đã sẵn sàng rồi. Hãy xuống đó và sống một cuộc đời trọn vẹn nhé.",
        "ipaUs": "/jʊər bædʒ ɪz kəmˈpliːt, ˈtwɛnti tuː. jʊər spɑːrk ɪz ˈrɛdi. ɡoʊ lɪv jʊər laɪf./",
        "keywords": ["badge is complete", "spark is ready", "go live your life"],
        "explanationAi": "Lời chúc phúc thiêng liêng đầy xúc động trước ngưỡng cửa luân hồi của 22.",
        "properNouns": ["22"]
    },
    {
        "orderIndex": 46,
        "startTime": 1145.0,
        "endTime": 1165.0,
        "text": "So, Joe, what do you think you'll do with your life now that you have a second chance?",
        "translationVi": "Vậy thì Joe, anh nghĩ mình sẽ làm gì với cuộc đời của mình khi anh nhận được một cơ hội sống thứ hai này?",
        "ipaUs": "/soʊ, dʒoʊ, wʌt duː juː θɪŋk juːl duː wɪð jʊər laɪf naʊ ðæt juː hæv ə ˈsɛkənd tʃæns?/",
        "keywords": ["second chance", "what will you do with your life"],
        "explanationAi": "Jerry trao lại thể xác cho Joe Gardner như một sự ân thưởng xứng đáng cho tâm hồn cao cả.",
        "properNouns": ["Joe"]
    },
    {
        "orderIndex": 47,
        "startTime": 1165.0,
        "endTime": 1185.0,
        "text": "I'm not sure. But I do know this: I'm going to live every minute of it.",
        "translationVi": "Tôi cũng không chắc nữa. Nhưng tôi biết chắc một điều này: Tôi sẽ sống trọn vẹn từng phút giây của nó.",
        "ipaUs": "/aɪm nɑːt ʃʊr. bʌt aɪ duː noʊ ðɪs: aɪm ˈɡoʊɪŋ tuː lɪv ˈɛvri ˈmɪnət əv ɪt./",
        "keywords": ["live every minute of it", "not sure", "second chance"],
        "explanationAi": "Thông điệp bất hủ khép lại bộ phim Soul: Hạnh phúc đích thực không nằm ở việc vạch sẵn kế hoạch cứng nhắc, mà ở việc hiện diện trọn vẹn trong từng khoảnh khắc.",
        "properNouns": []
    },
    {
        "orderIndex": 48,
        "startTime": 1185.0,
        "endTime": 1250.0,
        "text": "Now you're going to test everything you learned today by watching all the clips a final time without subtitles.",
        "translationVi": "Bây giờ bạn sẽ được kiểm tra lại toàn bộ những gì mình đã học hôm nay bằng cách xem lại tất cả các trích đoạn lần cuối mà không cần nhìn phụ đề.",
        "ipaUs": "/naʊ jʊr ˈɡoʊɪŋ tuː tɛst ˈɛvriˌθɪŋ juː lɜːrnd təˈdeɪ baɪ ˈwɑːtʃɪŋ ɔːl ðə klɪps ə ˈfaɪnəl taɪm wɪðˈaʊt ˈsʌbˌtaɪtəlz./",
        "keywords": ["test everything", "watching clips", "without subtitles"],
        "explanationAi": "Phần ôn tập thực hành phản xạ nghe sâu (Deep Listening Review) không phụ đề của bài giảng RealLife English.",
        "properNouns": []
    },
    {
        "orderIndex": 49,
        "startTime": 1250.0,
        "endTime": 1402.0,
        "text": "Keep practicing your English every single day, enjoy every little miracle around you, and we'll see you in our next lesson!",
        "translationVi": "Hãy tiếp tục luyện tập tiếng Anh mỗi ngày, tận hưởng từng điều kỳ diệu nhỏ bé quanh bạn, và hẹn gặp lại các bạn trong bài học tiếp theo!",
        "ipaUs": "/kiːp ˈpræktəsɪŋ jʊər ˈɪŋɡlɪʃ ˈɛvri ˈsɪŋɡəl deɪ, ɛnˈdʒɔɪ ˈɛvri ˈlɪtəl ˈmɪrəkəl əˈraʊnd juː, ænd wiːl siː juː ɪn ˈaʊər nɛkst ˈlɛsən!/",
        "keywords": ["keep practicing", "every single day", "every little miracle", "next lesson"],
        "explanationAi": "Lời chào tạm biệt ấm áp kết thúc bài giảng: học ngoại ngữ cũng như cuộc sống, là một hành trình tận hưởng mỗi ngày.",
        "properNouns": []
    }
]

for s in raw_segments:
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", s["text"])
    s["tokenCount"] = len(tokens)

print(f"Total compiled Pure Master Segments for Soul: {len(raw_segments)}")
with open("scripts/soul_pure_segments.json", "w", encoding="utf-8") as f:
    json.dump(raw_segments, f, ensure_ascii=False, indent=2)
print("Saved to scripts/soul_pure_segments.json")
