import json

segments_data = [
    {
        "orderIndex": 0,
        "startTime": 0.6,
        "endTime": 7.8,
        "text": "I have something very important to tell you. Or, let me check, do you want to know the big secret,",
        "translationVi": "Bố có một điều vô cùng quan trọng muốn nói với con. Hoặc để bố xem nào, con có muốn biết bí mật lớn này không,",
        "ipaUs": "/aɪ hæv ˈsʌmθɪŋ ˈvɛri ɪmˈpɔːrtənt tuː tɛl juː. ɔːr, lɛt miː tʃɛk, duː juː wɑːnt tuː noʊ ðə bɪɡ ˈsiːkrət,/",
        "keywords": ["important", "tell you", "big secret"],
        "explanationAi": "Cách mở đầu ấm áp, hóm hỉnh đặc trưng của người cha (Bill Nighy) trước khi truyền lại bài học nhân sinh tối hậu cho con trai.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 7.8,
        "endTime": 13.5,
        "text": "or would you rather find it out for yourself like I did?",
        "translationVi": "hay con muốn tự mình trải nghiệm và nhận ra nó, giống như bố ngày trước?",
        "ipaUs": "/ɔːr wʊd juː ˈræðər faɪnd ɪt aʊt fɔːr jʊərˈsɛlf laɪk aɪ dɪd?/",
        "keywords": ["would rather", "find out", "for yourself"],
        "explanationAi": "Cấu trúc 'would rather + V' dùng để diễn tả sự ưu tiên; 'find out for yourself' nghĩa là tự mình khám phá, tự thân trải nghiệm.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 13.5,
        "endTime": 17.5,
        "text": "Oh, Christ, there's another secret?",
        "translationVi": "Trời đất, lại còn có thêm một bí mật nữa ạ?",
        "ipaUs": "/oʊ, kraɪst, ðɛrz əˈnʌðər ˈsiːkrət?/",
        "keywords": ["Christ", "another secret"],
        "explanationAi": "Thán từ 'Oh, Christ' là phản xạ tự nhiên của Tim khi ngạc nhiên tột độ vì nghĩ năng lực du hành thời gian đã là bí mật lớn nhất rồi.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 17.5,
        "endTime": 21.5,
        "text": "Less dramatic. Much more important. The real mothership.",
        "translationVi": "Ít kịch tính hơn. Nhưng quan trọng hơn nhiều. Đây mới là con tàu mẹ đích thực (bí mật tối thượng).",
        "ipaUs": "/lɛs drəˈmætɪk. mʌtʃ mɔːr ɪmˈpɔːrtənt. ðə rɪəl ˈmʌðərˌʃɪp./",
        "keywords": ["less dramatic", "much more important", "mothership"],
        "explanationAi": "Hình ảnh ẩn dụ 'mothership' (tàu mẹ) ám chỉ bí quyết gốc rễ, nền tảng tối hậu chi phối toàn bộ ý nghĩa cuộc sống.",
        "properNouns": []
    },
    {
        "orderIndex": 4,
        "startTime": 21.5,
        "endTime": 31.0,
        "text": "No, go on. Tell me. Let's save some time.",
        "translationVi": "Thôi nào, bố nói luôn đi. Đỡ mất thì giờ của đôi bên.",
        "ipaUs": "/noʊ, ɡoʊ ɑːn. tɛl miː. lɛts seɪv sʌm taɪm./",
        "keywords": ["go on", "tell me", "save time"],
        "explanationAi": "Cụm 'save some time' (tiết kiệm thời gian) là lời chơi chữ hóm hỉnh đầy ý vị của Tim đối với một người có năng lực du hành thời gian.",
        "properNouns": []
    },
    {
        "orderIndex": 5,
        "startTime": 31.0,
        "endTime": 42.0,
        "text": "And so he told me his secret formula for happiness. Part one of the two part plan was that I should just get on with ordinary life,",
        "translationVi": "Và thế là bố đã truyền lại cho tôi công thức bí mật để có được hạnh phúc. Phần một trong kế hoạch hai bước là tôi cứ tiếp tục sống một cuộc đời bình thường,",
        "ipaUs": "/ænd soʊ hiː toʊld miː hɪz ˈsiːkrət ˈfɔːrmjələ fɔːr ˈhæpinəs. pɑːrt wʌn əv ðə tuː pɑːrt plæn wʌz ðæt aɪ ʃʊd dʒʌst ɡɛt ɑːn wɪð ˈɔːrdnɛri laɪf,/",
        "keywords": ["secret formula", "two part plan", "get on with", "ordinary life"],
        "explanationAi": "Cụm 'get on with ordinary life' nhắc nhở con người ta dấn thân vào đời thực, đối diện với những trải nghiệm thường nhật thay vì trốn tránh.",
        "properNouns": []
    },
    {
        "orderIndex": 6,
        "startTime": 42.0,
        "endTime": 50.0,
        "text": "living it day by day, like anyone else.",
        "translationVi": "sống trọn từng ngày như bao người khác.",
        "ipaUs": "/ˈlɪvɪŋ ɪt deɪ baɪ deɪ, laɪk ˈɛniwʌn ɛls./",
        "keywords": ["day by day", "anyone else"],
        "explanationAi": "Cụm 'day by day' thể hiện sự kiên định sống trọn vẹn từng ngày mà không lo lắng viển vông về tương lai.",
        "properNouns": []
    },
    {
        "orderIndex": 7,
        "startTime": 50.0,
        "endTime": 56.5,
        "text": "This is our current statement with a revised paragraph there, highlighted.",
        "translationVi": "Đây là bản báo cáo hiện tại của chúng ta với một đoạn được sửa đổi ở đó, đã gạch chân nổi bật.",
        "ipaUs": "/ðɪs ɪz ˈaʊər ˈkɜːrənt ˈsteɪtmənt wɪð ə rɪˈvaɪzd ˈpærəɡræf ðɛr, ˈhaɪˌlaɪtɪd./",
        "keywords": ["current statement", "revised paragraph", "highlighted"],
        "explanationAi": "Ngôn ngữ văn phòng luật sư chuẩn mực của Anh; 'revised' (đã sửa đổi), 'highlighted' (đã bôi đậm/làm nổi bật).",
        "properNouns": []
    },
    {
        "orderIndex": 8,
        "startTime": 56.5,
        "endTime": 62.0,
        "text": "Rupert. Rupert, is that the best you can do?",
        "translationVi": "Rupert. Rupert à, đó là tất cả những gì anh làm được sao?",
        "ipaUs": "/ˈruːpərt. ˈruːpərt, ɪz ðæt ðə bɛst juː kæn duː?/",
        "keywords": ["best you can do", "can do"],
        "explanationAi": "Câu chất vấn gay gắt của sếp trong phòng luật bộc lộ áp lực công việc nặng nề mà Tim và Rupert phải chịu đựng.",
        "properNouns": ["Rupert"]
    },
    {
        "orderIndex": 9,
        "startTime": 62.0,
        "endTime": 68.0,
        "text": "No. Absolutely not. We can change that. — Item number two.",
        "translationVi": "Dạ không. Hoàn toàn không ạ. Chúng tôi sửa lại được ngay. — Chuyển sang mục số hai.",
        "ipaUs": "/noʊ. ˌæbsəˈluːtli nɑːt. wiː kæn tʃeɪndʒ ðæt. — ˈaɪtəm ˈnʌmbər tuː./",
        "keywords": ["absolutely not", "change that", "item number two"],
        "explanationAi": "Phản xạ khép nép, nhẫn nhịn giải quyết vấn đề dưới sức ép cấp trên trong ngày đầu tiên của Tim.",
        "properNouns": []
    },
    {
        "orderIndex": 10,
        "startTime": 68.0,
        "endTime": 76.5,
        "text": "Good afternoon, sir. Are you eating in or taking away today? — Take away, please. — Yeah? No problem.",
        "translationVi": "Xin chào anh. Hôm nay anh dùng tại quán hay mang đi ạ? — Mang về giúp tôi nhé. — Vâng ạ, không vấn đề gì.",
        "ipaUs": "/ɡʊd ˌæftərˈnuːn, sɜːr. ɑːr juː ˈiːtɪŋ ɪn ɔːr ˈteɪkɪŋ əˈweɪ təˈdeɪ? — teɪk əˈweɪ, pliːz. — jɛə? noʊ ˈprɑːbləm./",
        "keywords": ["eating in", "taking away", "take away", "no problem"],
        "explanationAi": "Cụm giao tiếp thường nhật tại quán ăn nhanh phong cách Anh: 'eating in or taking away' (ăn tại chỗ hay mang về).",
        "properNouns": []
    },
    {
        "orderIndex": 11,
        "startTime": 76.5,
        "endTime": 85.0,
        "text": "Lovely, that's 4.24 then, please, sir. — Thank you kindly.",
        "translationVi": "Tuyệt quá, của anh hết bốn bảng hai mươi tư xu ạ. — Cảm ơn cô nhiều nhé.",
        "ipaUs": "/ˈlʌvli, ðæts fɔːr ˈtwɛnti fɔːr ðɛn, pliːz, sɜːr. — θæŋk juː ˈkaɪndli./",
        "keywords": ["lovely", "four twenty four", "thank you kindly"],
        "explanationAi": "Từ 'lovely' là cách diễn đạt thân thiện đặc trưng của người Anh; 'thank you kindly' là lời cảm ơn lịch thiệp cổ điển.",
        "properNouns": []
    },
    {
        "orderIndex": 12,
        "startTime": 85.0,
        "endTime": 95.8,
        "text": "Lovely. And there's your change, sir. 76 pence change. — Thanks. — Thank you. Hello there. Are you eating in or taking away?",
        "translationVi": "Dạ đây, gửi anh tiền thối lại ạ. Bảy mươi sáu xu tiền thối. — Cảm ơn cô. — Cảm ơn anh. Xin chào quý khách tiếp theo. Anh dùng tại quán hay mang về ạ?",
        "ipaUs": "/ˈlʌvli. ænd ðɛrz jʊər tʃeɪndʒ, sɜːr. ˈsɛvnti sɪks pɛns tʃeɪndʒ. — θæŋks. — θæŋk juː. hɛˈloʊ ðɛr. ɑːr juː ˈiːtɪŋ ɪn ɔːr ˈteɪkɪŋ əˈweɪ?/",
        "keywords": ["change", "pence", "eating in", "taking away"],
        "explanationAi": "Nhịp sống hối hả tại London được phản ánh qua lời thối tiền và câu chào khách liên tục của cô thu ngân.",
        "properNouns": []
    },
    {
        "orderIndex": 13,
        "startTime": 95.8,
        "endTime": 108.5,
        "text": "Do you find the Defendant, John Welbeck, guilty or not guilty of fraud? — Not guilty. — And that is the verdict of you all? — Yes.",
        "translationVi": "Bồi thẩm đoàn tuyên bố Bị cáo John Welbeck có tội hay không có tội về hành vi gian lận? — Không có tội. — Và đó là phán quyết đồng thuận của toàn thể quý vị chứ? — Vâng, đúng vậy.",
        "ipaUs": "/duː juː faɪnd ðə dɪˈfɛndənt, dʒɑːn ˈwɛlbɛk, ˈɡɪlti ɔːr nɑːt ˈɡɪlti əv frɔːd? — nɑːt ˈɡɪlti. — ænd ðæt ɪz ðə ˈvɜːrdɪkt əv juː ɔːl? — jɛs./",
        "keywords": ["Defendant", "guilty", "not guilty", "fraud", "verdict"],
        "explanationAi": "Thuật ngữ pháp lý Anh-Mỹ chuẩn mực: 'Defendant' (bị cáo), 'verdict' (phán quyết của bồi thẩm đoàn), 'fraud' (tội lừa đảo gian lận).",
        "properNouns": ["John Welbeck"]
    },
    {
        "orderIndex": 14,
        "startTime": 108.5,
        "endTime": 118.2,
        "text": "Thank you. You may be seated. — Thank God. — Let the Defendant be discharged.",
        "translationVi": "Cảm ơn quý vị. Xin mời ngồi. — Tạ ơn Chúa. — Cho phép bị cáo được phóng thích tự do.",
        "ipaUs": "/θæŋk juː. juː meɪ biː ˈsiːtɪd. — θæŋk ɡɑːd. — lɛt ðə dɪˈfɛndənt biː dɪsˈtʃɑːrdʒd./",
        "keywords": ["be seated", "thank God", "discharged"],
        "explanationAi": "Khẩu lệnh tòa án 'Let the Defendant be discharged' tuyên bố bị cáo hoàn toàn trắng án và được trả tự do.",
        "properNouns": []
    },
    {
        "orderIndex": 15,
        "startTime": 118.2,
        "endTime": 126.5,
        "text": "Be upstanding in court.",
        "translationVi": "Toàn thể phiên tòa đứng dậy cung nghinh hội đồng xét xử.",
        "ipaUs": "/biː ʌpˈstændɪŋ ɪn kɔːrt./",
        "keywords": ["be upstanding", "in court"],
        "explanationAi": "Nghi thức truyền thống của tòa án Anh khi thẩm phán chuẩn bị rời phòng xử án.",
        "properNouns": []
    },
    {
        "orderIndex": 16,
        "startTime": 126.5,
        "endTime": 134.0,
        "text": "Lights out? — Yeah. Tough day.",
        "translationVi": "Tắt đèn hết rồi à? — Ừ. Một ngày thật nhọc nhằn.",
        "ipaUs": "/laɪts aʊt? — jɛə. tʌf deɪ./",
        "keywords": ["lights out", "tough day"],
        "explanationAi": "Cuộc đối thoại ngắn trên ga tàu điện ngầm London thể hiện sự kiệt sức của Tim sau một ngày đầy áp lực.",
        "properNouns": []
    },
    {
        "orderIndex": 17,
        "startTime": 134.0,
        "endTime": 141.5,
        "text": "But then came part two of Dad's plan. He told me to live every day again almost exactly the same.",
        "translationVi": "Nhưng rồi đến phần hai trong kế hoạch của bố. Bố bảo tôi hãy sống lại mỗi ngày gần như y hệt như thế.",
        "ipaUs": "/bʌt ðɛn keɪm pɑːrt tuː əv dædz plæn. hiː toʊld miː tuː lɪv ˈɛvri deɪ əˈɡɛn ˈɔːlmoʊst ɪɡˈzæktli ðə seɪm./",
        "keywords": ["part two", "live every day again", "exactly the same"],
        "explanationAi": "Cốt lõi triết lý của bộ phim: sống lại cùng một ngày nhưng với một tâm thức hoàn toàn khác biệt.",
        "properNouns": []
    },
    {
        "orderIndex": 18,
        "startTime": 141.5,
        "endTime": 158.0,
        "text": "The first time with all the tensions and worries that stop us noticing how sweet the world can be, but the second time noticing.",
        "translationVi": "Lần đầu tiên cùng với tất cả sự căng thẳng và lo âu đã ngăn ta nhận ra thế giới ngọt ngào đến nhường nào, nhưng lần thứ hai thì hãy nhận ra nó.",
        "ipaUs": "/ðə fɜːrst taɪm wɪð ɔːl ðə ˈtɛnʃənz ænd ˈwɜːriz ðæt stɑːp ʌs ˈnoʊtɪsɪŋ haʊ swiːt ðə wɜːrld kæn biː, bʌt ðə ˈsɛkənd taɪm ˈnoʊtɪsɪŋ./",
        "keywords": ["tensions", "worries", "noticing", "sweet"],
        "explanationAi": "Thông điệp nhân sinh đẹp đẽ bậc nhất: hạnh phúc không nằm ở việc thay đổi hoàn cảnh, mà nằm ở khả năng để tâm cảm nhận vẻ ngọt ngào của cuộc sống.",
        "properNouns": []
    },
    {
        "orderIndex": 19,
        "startTime": 158.0,
        "endTime": 168.0,
        "text": "Okay, Dad. Let's give it a go.",
        "translationVi": "Được rồi bố. Để con thử xem sao.",
        "ipaUs": "/oʊˈkeɪ, dæd. lɛts ɡɪv ɪt ə ɡoʊ./",
        "keywords": ["give it a go", "let's give"],
        "explanationAi": "Thành ngữ 'give it a go' thể hiện tinh thần sẵn sàng dấn thân và trải nghiệm.",
        "properNouns": []
    },
    {
        "orderIndex": 20,
        "startTime": 168.0,
        "endTime": 195.0,
        "text": "What's our statement at the moment? This is it with the revised... Rupert, this does not pass. Is this the best you can do? I'll leave you two to thrash this out. — Ooh.",
        "translationVi": "Bản báo cáo của chúng ta hiện giờ thế nào rồi? Dạ đây là bản đã sửa... Rupert à, bản này không đạt đâu. Đó là tất cả những gì anh làm được sao? Tôi để hai anh tự bàn bạc giải quyết dứt điểm việc này đấy. — Ôi chao.",
        "ipaUs": "/wɑːts ˈaʊər ˈsteɪtmənt æt ðə ˈmoʊmənt? ðɪs ɪz ɪt wɪð ðə rɪˈvaɪzd... ˈruːpərt, ðɪs dʌz nɑːt pæs. ɪz ðɪs ðə bɛst juː kæn duː? aɪl liːv juː tuː tuː θræʃ ðɪs aʊt. — uː./",
        "keywords": ["statement", "does not pass", "thrash this out"],
        "explanationAi": "Phrasal verb 'thrash out' nghĩa là thảo luận kỹ lưỡng, tranh luận thẳng thắn để tìm ra giải pháp chung.",
        "properNouns": ["Rupert"]
    },
    {
        "orderIndex": 21,
        "startTime": 195.0,
        "endTime": 220.0,
        "text": "Good afternoon, sir. — Good afternoon. Are you eating in or taking away today? — Take away, please. Would you like a bag? — That's fine. Lovely. That's 6.23 then, please. And enjoy the rest of your day. — Thank you. Bye-bye. — Hello, there.",
        "translationVi": "Xin chào anh. — Chào cô. Hôm nay anh dùng tại quán hay mang về ạ? — Mang về giúp tôi nhé. Anh có cần túi đựng không ạ? — Không cần đâu, thế này ổn rồi. Tuyệt quá. Của anh hết sáu bảng hai mươi ba xu ạ. Chúc anh một ngày tốt lành nhé. — Cảm ơn cô. Tạm biệt. — Xin chào quý khách.",
        "ipaUs": "/ɡʊd ˌæftərˈnuːn, sɜːr. — ɡʊd ˌæftərˈnuːn. ɑːr juː ˈiːtɪŋ ɪn ɔːr ˈteɪkɪŋ əˈweɪ təˈdeɪ? — teɪk əˈweɪ, pliːz. wʊd juː laɪk ə bæɡ? — ðæts faɪn. ˈlʌvli. ðæts sɪks ˈtwɛnti θriː ðɛn, pliːz. ænd ɪnˈdʒɔɪ ðə rɛst əv jʊər deɪ. — θæŋk juː. baɪ baɪ. — hɛˈloʊ, ðɛr./",
        "keywords": ["good afternoon", "enjoy the rest of your day", "bye-bye"],
        "explanationAi": "Lần thứ hai Tim không vội vã mà trao nụ cười và ánh mắt ấm áp cho cô thu ngân, khiến khoảnh khắc mua bán đời thường bừng sáng niềm vui.",
        "properNouns": []
    },
    {
        "orderIndex": 22,
        "startTime": 220.0,
        "endTime": 245.5,
        "text": "Look around you! — What? — Isn't this room beautiful? — Yeah. — Come on. — Not guilty. — Fantastic!",
        "translationVi": "Nhìn quanh cậu xem này! — Gì cơ? — Căn phòng này chẳng phải đẹp tuyệt vời sao? — Ừ, công nhận. — Đi nào. — Tuyên bố không có tội. — Tuyệt vời làm sao!",
        "ipaUs": "/lʊk əˈraʊnd juː! — wɑːt? — ˈɪznt ðɪs ruːm ˈbjuːtɪfəl? — jɛə. — kʌm ɑːn. — nɑːt ˈɡɪlti. — fænˈtæstɪk!/",
        "keywords": ["look around", "beautiful", "not guilty", "fantastic"],
        "explanationAi": "Tim dừng lại ngắm nhìn nét đẹp cổ kính của phòng xử án và hân hoan chúc mừng chiến thắng cùng đồng nghiệp thay vì căng thẳng nín thở như lần đầu.",
        "properNouns": []
    },
    {
        "orderIndex": 23,
        "startTime": 245.5,
        "endTime": 255.3,
        "text": "So not such a bad day after all? — No. It was pretty good really. Very good day, actually, as it turns out.",
        "translationVi": "Hóa ra hôm nay cũng không đến nỗi tệ nhỉ? — Không hề. Thực ra ngày hôm nay khá tuyệt. Một ngày rất tuyệt vời là đằng khác.",
        "ipaUs": "/soʊ nɑːt sʌtʃ ə bæd deɪ ˈæftər ɔːl? — noʊ. ɪt wʌz ˈprɪti ɡʊd ˈrɪəli. ˈvɛri ɡʊd deɪ, ˈæktʃuəli, æz ɪt tɜːrnz aʊt./",
        "keywords": ["after all", "pretty good", "as it turns out"],
        "explanationAi": "Cụm 'as it turns out' thể hiện kết quả thực tế hóa ra lại tích cực hơn nhiều so với dự đoán ban đầu.",
        "properNouns": []
    },
    {
        "orderIndex": 24,
        "startTime": 255.3,
        "endTime": 273.7,
        "text": "Well, that's a relief, because if it had been a very bad day, I thought I might have had to have had sex with you to make up for it. Goodnight. — Mmm.",
        "translationVi": "Thế thì nhẹ cả người, vì nếu hôm nay là một ngày tồi tệ, em đã nghĩ có khi mình phải ngủ với anh để bù đắp lại rồi đấy. Chúc ngủ ngon nhé. — Ừm.",
        "ipaUs": "/wɛl, ðæts ə rɪˈliːf, bɪˈkɔːz ɪf ɪt hæd biːn ə ˈvɛri bæd deɪ, aɪ θɔːt aɪ maɪt hæv hæd tuː hæv sɛks wɪð juː tuː meɪk ʌp fɔːr ɪt. ɡʊdˈnaɪt. — mmm./",
        "keywords": ["relief", "might have had to", "make up for", "goodnight"],
        "explanationAi": "Lời bông đùa duyên dáng và quyến rũ của Mary (Rachel McAdams) với cấu trúc câu điều kiện loại 3 hỗn hợp.",
        "properNouns": []
    },
    {
        "orderIndex": 25,
        "startTime": 273.7,
        "endTime": 290.3,
        "text": "It was a very, very bad day. It went very, very badly. I got fired from my job. And then I killed a man.",
        "translationVi": "Đó là một ngày vô cùng, vô cùng tồi tệ luôn. Nó diễn ra tệ hại kinh khủng. Anh vừa bị đuổi việc. Xong rồi còn lỡ tay giết người nữa.",
        "ipaUs": "/ɪt wʌz ə ˈvɛri, ˈvɛri bæd deɪ. ɪt wɛnt ˈvɛri, ˈvɛri ˈbædli. aɪ ɡɑːt ˈfaɪərd frəm maɪ dʒɑːb. ænd ðɛn aɪ kɪld ə mæn./",
        "keywords": ["bad day", "very badly", "got fired", "killed a man"],
        "explanationAi": "Màn 'quay xe' đảo ngược tình huống kinh điển của Tim khi lập tức bịa ra thảm họa để được người yêu an ủi ngọt ngào.",
        "properNouns": []
    },
    {
        "orderIndex": 26,
        "startTime": 290.3,
        "endTime": 305.0,
        "text": "That is a very bad day. — It's terrible. — Yeah. Like the worst day ever.",
        "translationVi": "Đúng là một ngày tồi tệ thật đấy. — Khủng khiếp lắm em ơi. — Ừ. Đúng là ngày tồi tệ nhất trần đời.",
        "ipaUs": "/ðæt ɪz ə ˈvɛri bæd deɪ. — ɪts ˈtɛrəbl. — jɛə. laɪk ðə wɜːrst deɪ ˈɛvər./",
        "keywords": ["terrible", "worst day ever"],
        "explanationAi": "Sự ăn ý của Mary khi giả vờ hùa theo vở kịch của Tim với giọng điệu vừa ân cần vừa hài hước.",
        "properNouns": []
    },
    {
        "orderIndex": 27,
        "startTime": 305.0,
        "endTime": 323.0,
        "text": "So sorry. — It's okay, I'm home now.",
        "translationVi": "Em vô cùng chia buồn với anh nha. — Không sao đâu em, anh về đến nhà rồi mà.",
        "ipaUs": "/soʊ ˈsɑːri. — ɪts oʊˈkeɪ, aɪm hoʊm naʊ./",
        "keywords": ["so sorry", "home now"],
        "explanationAi": "Cái ôm ngọt ngào khép lại phân cảnh: sau tất cả những xô bồ của thế giới, hạnh phúc lớn nhất chính là trở về nhà trong vòng tay người mình yêu.",
        "properNouns": []
    }
]

print("Built 28 master segments!")
