import json, re

# Build 55 Pure Master Segments for A Beautiful Mind (mov_insp_09)
# YouTube ID: rrZBpTZmGfI (08:37 - 517s)

raw_segments = [
    # Act 1: Meeting Thomas King & The Nobel Notification (9.0s - 95.0s)
    {
        "orderIndex": 0,
        "startTime": 9.68,
        "endTime": 15.50,
        "text": "Goodbye, have a nice day.",
        "translationVi": "Tạm biệt thầy, chúc thầy một ngày tốt lành.",
        "ipaUs": "/ˌɡʊdˈbaɪ, hæv ə naɪs deɪ./",
        "keywords": ["have a nice day"],
        "explanationAi": "Lời chào của sinh viên khi chào tạm biệt Giáo sư John Nash trên khuôn viên Đại học Princeton.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 15.50,
        "endTime": 20.87,
        "text": "Excuse me, Professor Nash?",
        "translationVi": "Xin thứ lỗi, có phải Giáo sư Nash không ạ?",
        "ipaUs": "/ɪkˈskjuːs miː, prəˈfɛsər næʃ?/",
        "keywords": ["Professor Nash"],
        "explanationAi": "Người đàn ông lạ mặt trong âu phục lịch sự tiếp cận John Nash.",
        "properNouns": ["Nash"]
    },
    {
        "orderIndex": 2,
        "startTime": 20.87,
        "endTime": 30.80,
        "text": "Can you see him? Forgive me, I'm just always suspicious of new people.",
        "translationVi": "Cậu có nhìn thấy ông ta không? Tha lỗi cho tôi, tôi luôn có chút ngờ vực trước những người lạ.",
        "ipaUs": "/kæn juː siː hɪm? fərˈɡɪv miː, aɪm dʒʌst ˈɔːlweɪz səˈspɪʃəs əv njuː ˈpiːpəl./",
        "keywords": ["suspicious of new people", "can you see him"],
        "explanationAi": "Phản xạ sinh tồn của Nash: ông phải hỏi sinh viên bên cạnh để xác nhận người lạ kia là người thật hay ảo giác hoang tưởng.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 30.80,
        "endTime": 36.95,
        "text": "Yes, I see him, Professor. See you next week!",
        "translationVi": "Dạ em thấy ông ấy mà thầy. Hẹn gặp lại thầy tuần sau ạ!",
        "ipaUs": "/jɛs, aɪ siː hɪm, prəˈfɛsər. siː juː nɛkst wiːk!/",
        "keywords": ["see you next week"],
        "explanationAi": "Lời khẳng định của sinh viên giúp Nash yên tâm rằng người đối diện hoàn toàn có thật.",
        "properNouns": []
    },
    {
        "orderIndex": 4,
        "startTime": 36.95,
        "endTime": 40.45,
        "text": "So now that I know that you are real, what can I do for you?",
        "translationVi": "Vậy bây giờ tôi đã biết anh là người thật rồi, tôi có thể giúp gì cho anh đây?",
        "ipaUs": "/soʊ naʊ ðæt aɪ noʊ ðæt juː ɑːr ˈriːəl, wɑːt kæn aɪ duː fɔːr juː?/",
        "keywords": ["you are real"],
        "explanationAi": "Sự hóm hỉnh chân thành của John Nash sau khi xác thực thực tại.",
        "properNouns": []
    },
    {
        "orderIndex": 5,
        "startTime": 40.45,
        "endTime": 46.28,
        "text": "My name is Thomas King. I'm from the Nobel Committee.",
        "translationVi": "Tôi tên là Thomas King. Tôi đến từ Ủy ban Giải thưởng Nobel.",
        "ipaUs": "/maɪ neɪm ɪz ˈtɑːməs kɪŋ. aɪm frʌm ðə noʊˈbɛl kəˈmɪti./",
        "keywords": ["Nobel Committee"],
        "explanationAi": "Đại diện chính thức của Viện Hàn lâm Khoa học Hoàng gia Thụy Điển tự giới thiệu thân phận.",
        "properNouns": ["Thomas King", "Nobel Committee"]
    },
    {
        "orderIndex": 6,
        "startTime": 46.28,
        "endTime": 54.00,
        "text": "And I'm here to tell you that you're being considered for the Nobel Prize.",
        "translationVi": "Và tôi tới đây để thông báo với giáo sư rằng thầy đang được xem xét trao giải thưởng Nobel.",
        "ipaUs": "/ænd aɪm hɪr tuː tɛl juː ðæt jʊr ˈbiːɪŋ kənˈsɪdərd fɔːr ðə noʊˈbɛl praɪz./",
        "keywords": ["considered for the Nobel Prize"],
        "explanationAi": "Thông báo mang tính bước ngoặt vinh quang sau nhiều thập kỷ chìm trong bóng tối bệnh tật.",
        "properNouns": ["Nobel Prize"]
    },
    {
        "orderIndex": 7,
        "startTime": 54.00,
        "endTime": 61.58,
        "text": "I'm just a little stunned. Over the past few years, your equilibrium has become a cornerstone of modern economics.",
        "translationVi": "Tôi hơi sững sờ một chút. Trong những năm qua, thế cân bằng của thầy đã trở thành nền tảng trụ cột của kinh tế học hiện đại.",
        "ipaUs": "/aɪm dʒʌst ə ˈlɪtl̩ stʌnd. ˈoʊvər ðə pæst fjuː jɪrz, jɔːr ˌiːkwəˈlɪbriəm hæz bɪˈkʌm ə ˈkɔːrnərˌstoʊn əv ˈmɑːdərn ˌiːkəˈnɑːmɪks./",
        "keywords": ["cornerstone of modern economics", "equilibrium"],
        "explanationAi": "Cân bằng Nash (Nash Equilibrium) - phát kiến toán học đột phá đoạt giải Nobel Kinh tế 1994.",
        "properNouns": []
    },
    {
        "orderIndex": 8,
        "startTime": 61.58,
        "endTime": 68.30,
        "text": "Well, certainly everybody likes that one. What about my other work?",
        "translationVi": "Chà, tất nhiên ai cũng thích công trình đó rồi. Thế còn những công trình nghiên cứu khác của tôi thì sao?",
        "ipaUs": "/wɛl, ˈsɜːrtn̩li ˈɛvriˌbɑːdi laɪks ðæt wʌn. wɑːt əˈbaʊt maɪ ˈʌðər wɜːrk?/",
        "keywords": ["other work"],
        "explanationAi": "Phản xạ kiêu hãnh của nhà toán học thuần túy đối với các định lý hình học vi phân và phương trình vi phân.",
        "properNouns": []
    },
    {
        "orderIndex": 9,
        "startTime": 68.30,
        "endTime": 76.50,
        "text": "The manifold embedding? The application of your bargaining problem to FCC bandwidth auctions and antitrust cases?",
        "translationVi": "Định lý nhúng đa tạp ư? Ứng dụng bài toán đàm phán của thầy vào các cuộc đấu giá băng thông FCC và các vụ kiện chống độc quyền?",
        "ipaUs": "/ðə ˈmænəˌfoʊld ɪmˈbɛdɪŋ? ðɪ ˌæplɪˈkeɪʃən əv jɔːr ˈbɑːrɡɪnɪŋ ˈprɑːbləm tuː ˌɛfˌsiːˈsiː ˈbændˌwɪdθ ˈɔːkʃənz ænd ˌæntiˈtrʌst ˈkeɪsɪz?/",
        "keywords": ["manifold embedding", "bargaining problem", "antitrust cases"],
        "explanationAi": "Các ứng dụng thực tiễn khổng lồ của lý thuyết trò chơi Nash trong viễn thông và luật kinh tế.",
        "properNouns": ["FCC"]
    },
    {
        "orderIndex": 10,
        "startTime": 76.50,
        "endTime": 84.71,
        "text": "Yes, we took all of that into consideration. Shall we have tea?",
        "translationVi": "Vâng, chúng tôi đã cân nhắc tất cả những điều đó. Chúng ta vào uống tách trà nhé?",
        "ipaUs": "/jɛs, wiː tʊk ɔːl əv ðæt ˈɪntuː kənˌsɪdəˈreɪʃən. ʃæl wiː hæv tiː?/",
        "keywords": ["shall we have tea", "consideration"],
        "explanationAi": "Thomas King khéo léo mời Nash vào phòng trà giảng viên của Princeton.",
        "properNouns": []
    },
    {
        "orderIndex": 11,
        "startTime": 84.71,
        "endTime": 92.50,
        "text": "I don't go in there. I usually just eat my sandwich in the library.",
        "translationVi": "Tôi không hay vào trong đó đâu. Tôi thường chỉ ăn bánh mì kẹp trong thư viện thôi.",
        "ipaUs": "/aɪ doʊnt ɡoʊ ɪn ðɛr. aɪ ˈjuːʒuəli dʒʌst iːt maɪ ˈsændwɪtʃ ɪn ðə ˈlaɪˌbrɛri./",
        "keywords": ["eat my sandwich in the library"],
        "explanationAi": "Thói quen thu mình, khép kín của Nash trong nhiều năm để tránh sự kỳ thị của người đời.",
        "properNouns": []
    },
    {
        "orderIndex": 12,
        "startTime": 92.50,
        "endTime": 99.50,
        "text": "Come on, John. Let's have some tea. It's a big day.",
        "translationVi": "Đi nào John. Hãy uống một tách trà. Hôm nay là một ngày trọng đại mà.",
        "ipaUs": "/kʌm ɑːn, dʒɑːn. lɛts hæv sʌm tiː. ɪts ə bɪɡ deɪ./",
        "keywords": ["big day"],
        "explanationAi": "Lời động viên ấm áp của Thomas King dẫn lối cho Nash bước vào căn phòng danh dự.",
        "properNouns": ["John"]
    },

    # Act 2: The Faculty Tea Room & The Assessment (99.0s - 200.0s)
    {
        "orderIndex": 13,
        "startTime": 100.00,
        "endTime": 110.57,
        "text": "Most commercially available brands of tea are not suitable to my palate, you see.",
        "translationVi": "Hầu hết các nhãn hiệu trà thương mại trên thị trường đều không hợp khẩu vị của tôi cho lắm, anh thấy đấy.",
        "ipaUs": "/moʊst kəˈmɜːrʃəli əˈveɪləbəl brændz əv tiː ɑːr nɑːt ˈsuːtəbəl tuː maɪ ˈpælət, juː siː./",
        "keywords": ["suitable to my palate"],
        "explanationAi": "'Palate' (khẩu vị, khiếu thưởng thức); tính cách lập dị, tỉ mỉ của giáo sư toán học.",
        "properNouns": []
    },
    {
        "orderIndex": 14,
        "startTime": 110.57,
        "endTime": 120.00,
        "text": "There are some northern Indian teas which often have a distinctive flavor that I enjoy.",
        "translationVi": "Có vài loại trà miền bắc Ấn Độ với hương vị đặc trưng mà tôi khá ưa thích.",
        "ipaUs": "/ðɛr ɑːr sʌm ˈnɔːrðərn ˈɪndiən tiːz wɪtʃ ˈɔːfən hæv ə dɪˈstɪŋktɪv ˈfleɪvər ðæt aɪ ɛnˈdʒɔɪ./",
        "keywords": ["northern Indian teas", "distinctive flavor"],
        "explanationAi": "Chi tiết trò chuyện đời thường giúp Nash lấy lại sự tự nhiên trong giao tiếp xã hội.",
        "properNouns": ["Indian"]
    },
    {
        "orderIndex": 15,
        "startTime": 120.00,
        "endTime": 128.00,
        "text": "I have not been in this room for quite some many years.",
        "translationVi": "Tôi đã không bước chân vào căn phòng này suốt nhiều năm trời rồi.",
        "ipaUs": "/aɪ hæv nɑːt biːn ɪn ðɪs ruːm fɔːr kwaɪt sʌm ˈmɛni jɪrz./",
        "keywords": ["many years"],
        "explanationAi": "Căn phòng trà giảng viên từng là nơi gắn liền với những ám ảnh quá khứ của ông.",
        "properNouns": []
    },
    {
        "orderIndex": 16,
        "startTime": 128.00,
        "endTime": 135.02,
        "text": "Thank you, young lady. Things have certainly changed around here.",
        "translationVi": "Cảm ơn cô gái trẻ. Mọi thứ quanh đây quả thực đã đổi thay nhiều quá.",
        "ipaUs": "/θæŋk juː, jʌŋ ˈleɪdi. θɪŋz hæv ˈsɜːrtn̩li tʃeɪndʒd əˈraʊnd hɪr./",
        "keywords": ["things have changed"],
        "explanationAi": "Nash cảm ơn người phục vụ trà và ngắm nhìn không gian hoài niệm.",
        "properNouns": []
    },
    {
        "orderIndex": 17,
        "startTime": 145.60,
        "endTime": 153.34,
        "text": "I would have thought the nominations for the Nobel Prize would be secret.",
        "translationVi": "Tôi cứ ngỡ việc đề cử cho giải thưởng Nobel là hoàn toàn tuyệt mật chứ.",
        "ipaUs": "/aɪ wʊd hæv θɔːt ðə ˌnɑːmɪˈneɪʃənz fɔːr ðə noʊˈbɛl praɪz wʊd biː ˈsiːkrət./",
        "keywords": ["nominations secret", "Nobel Prize"],
        "explanationAi": "Thắc mắc hợp lý của Nash về quy trình bảo mật khắt khe của giải thưởng Nobel.",
        "properNouns": ["Nobel Prize"]
    },
    {
        "orderIndex": 18,
        "startTime": 153.34,
        "endTime": 159.55,
        "text": "I would have thought you would only find out if you won or lost.",
        "translationVi": "Tôi cứ nghĩ người ta chỉ biết kết quả khi mình đã thắng hay thua mà thôi.",
        "ipaUs": "/aɪ wʊd hæv θɔːt juː wʊd ˈoʊnli faɪnd aʊt ɪf juː wʌn ɔːr lɔːst./",
        "keywords": ["won or lost"],
        "explanationAi": "Nash đặt câu hỏi nghi vấn về sự xuất hiện bất ngờ của Thomas King.",
        "properNouns": []
    },
    {
        "orderIndex": 19,
        "startTime": 159.55,
        "endTime": 168.58,
        "text": "That is generally the case, yes. But these are special circumstances.",
        "translationVi": "Thông thường thì đúng là như vậy. Nhưng đây là một trường hợp hoàn toàn đặc biệt.",
        "ipaUs": "/ðæt ɪz ˈdʒɛnrəli ðə keɪs, jɛs. bʌt ðiːz ɑːr ˈspɛʃəl ˈsɜːrkəmˌstænsɪz./",
        "keywords": ["special circumstances"],
        "explanationAi": "Thomas King thừa nhận tính chất nhạy cảm liên quan đến tình trạng sức khỏe tâm thần của ứng viên.",
        "properNouns": []
    },
    {
        "orderIndex": 20,
        "startTime": 168.58,
        "endTime": 176.28,
        "text": "The awards are substantial, and the public image of the Nobel is paramount.",
        "translationVi": "Giải thưởng này vô cùng tầm vóc, và hình ảnh trước công chúng của giải Nobel là điều tối quan trọng.",
        "ipaUs": "/ði əˈwɔːrdz ɑːr səbˈstænʃəl, ænd ðə ˈpʌblɪk ˈɪmɪdʒ əv ðə noʊˈbɛl ɪz ˈpærəˌmaʊnt./",
        "keywords": ["public image", "paramount"],
        "explanationAi": "'Paramount' (tối thượng, quan trọng bậc nhất); lý do thực sự khiến Ủy ban phải cử người đi thị sát.",
        "properNouns": ["Nobel"]
    },
    {
        "orderIndex": 21,
        "startTime": 176.28,
        "endTime": 183.69,
        "text": "Ah, I see. So you came here to find out if I was crazy?",
        "translationVi": "À, tôi hiểu rồi. Hóa ra anh tới đây là để xem liệu tôi có bị điên hay không chứ gì?",
        "ipaUs": "/ɑː, aɪ siː. soʊ juː keɪm hɪr tuː faɪnd aʊt ɪf aɪ wʌz ˈkreɪzi?/",
        "keywords": ["find out if I was crazy"],
        "explanationAi": "Nash nhìn thấu tâm lý đối phương bằng sự thẳng thắn sắc bén và không hề lảng tránh.",
        "properNouns": []
    },
    {
        "orderIndex": 22,
        "startTime": 183.69,
        "endTime": 190.14,
        "text": "To find out if I'd screw everything up: dance around the podium, strip naked, and squawk like a chicken?",
        "translationVi": "Để xem liệu tôi có làm hỏng bét mọi chuyện: nhảy nhót quanh bục phát biểu, cởi sạch quần áo và kêu quang quác như một con gà hay không?",
        "ipaUs": "/tuː faɪnd aʊt ɪf aɪd skruː ˈɛvriˌθɪŋ ʌp: dæns əˈraʊnd ðə ˈpoʊdiəm, strɪp ˈneɪkɪd, ænd skwɔːk laɪk ə ˈtʃɪkɪn?/",
        "keywords": ["screw everything up", "squawk like a chicken"],
        "explanationAi": "Lối hài hước tự trào cay đắng vạch trần định kiến của xã hội về người mắc bệnh tâm thần phân liệt.",
        "properNouns": []
    },
    {
        "orderIndex": 23,
        "startTime": 190.14,
        "endTime": 197.17,
        "text": "Something like that, yeah. Would I embarrass you?",
        "translationVi": "Đại loại là như thế đấy, vâng. Liệu tôi có làm các anh bẽ mặt không ư?",
        "ipaUs": "/ˈsʌmθɪŋ laɪk ðæt, jæ. wʊd aɪ ɪmˈbærəs juː?/",
        "keywords": ["embarrass you"],
        "explanationAi": "Câu hỏi trực diện về nỗi lo sợ bẽ mặt quốc tế của ban tổ chức.",
        "properNouns": []
    },
    {
        "orderIndex": 24,
        "startTime": 197.17,
        "endTime": 204.04,
        "text": "Yes, it is possible. You see, I am crazy. I take the newer medications.",
        "translationVi": "Vâng, điều đó hoàn toàn có thể xảy ra. Anh thấy đấy, tôi bị điên thật mà. Tôi vẫn đang uống các loại thuốc thế hệ mới.",
        "ipaUs": "/jɛs, ɪt ɪz ˈpɑːsəbəl. juː siː, aɪ æm ˈkreɪzi. aɪ teɪk ðə ˈnjuːər ˌmɛdɪˈkeɪʃənz./",
        "keywords": ["newer medications"],
        "explanationAi": "Sự trung thực tuyệt đối của John Nash đối với tình trạng bệnh lý của mình.",
        "properNouns": []
    },

    # Act 3: Diet of the Mind & The Pen Ceremony (204.0s - 315.0s)
    {
        "orderIndex": 25,
        "startTime": 204.04,
        "endTime": 213.93,
        "text": "I still see things that are not here. I just choose not to acknowledge them.",
        "translationVi": "Tôi vẫn nhìn thấy những thứ không hề tồn tại ở đây. Chỉ là tôi lựa chọn không thèm đoái hoài thừa nhận chúng mà thôi.",
        "ipaUs": "/aɪ stɪl siː θɪŋz ðæt ɑːr nɑːt hɪr. aɪ dʒʌst tʃuːz nɑːt tuː əkˈnɑːlɪdʒ ðɛm./",
        "keywords": ["choose not to acknowledge"],
        "explanationAi": "Bí quyết kiên cường kiểm soát tâm thần phân liệt: không phải xóa bỏ hoàn toàn mà là dùng ý chí tỉnh thức từ chối tương tác.",
        "properNouns": []
    },
    {
        "orderIndex": 26,
        "startTime": 213.93,
        "endTime": 223.50,
        "text": "Like a diet of the mind, I choose not to indulge certain appetites: like my appetite for patterns, my appetite to imagine.",
        "translationVi": "Như một chế độ ăn kiêng của tâm trí, tôi chọn không nuông chiều những cơn thèm muốn nhất định: như thèm tìm kiếm các quy luật, hay thèm tưởng tượng.",
        "ipaUs": "/laɪk ə ˈdaɪət əv ðə maɪnd, aɪ tʃuːz nɑːt tuː ɪnˈdʌldʒ ˈsɜːrtn̩ ˈæpɪˌtaɪts: laɪk maɪ ˈæpɪˌtaɪt fɔːr ˈpætərnz, maɪ ˈæpɪˌtaɪt tuː ɪˈmædʒɪn./",
        "keywords": ["diet of the mind", "appetite for patterns"],
        "explanationAi": "Ẩn dụ 'diet of the mind' (chế độ ăn kiêng cho tâm trí) thể hiện kỷ luật tự giác tột cùng để giữ gìn sự minh mẫn.",
        "properNouns": []
    },
    {
        "orderIndex": 27,
        "startTime": 235.00,
        "endTime": 245.00,
        "text": "A senior Princeton professor approaches the table, unclips his fountain pen, and places it with reverence in front of Nash.",
        "translationVi": "Một giáo sư kỳ cựu của Princeton bước lại gần bàn, tháo chiếc bút máy của mình ra và kính cẩn đặt nó trước mặt Nash.",
        "ipaUs": "/ə ˈsiːnjər ˈprɪnstən prəˈfɛsər əˈproʊtʃɪz ðə ˈteɪbəl, ʌnˈklɪps hɪz ˈfaʊntn̩ pɛn, ænd ˈpleɪsɪz ɪt wɪð ˈrɛvərəns ɪn frʌnt əv næʃ./",
        "keywords": ["fountain pen", "with reverence"],
        "explanationAi": "Nghi thức tặng bút truyền thống tại Princeton: sự tôn vinh cao quý nhất mà các học giả dành cho một bộ óc vĩ đại.",
        "properNouns": ["Princeton", "Nash"]
    },
    {
        "orderIndex": 28,
        "startTime": 245.00,
        "endTime": 252.00,
        "text": "Professor Nash, it's good to have you here, John.",
        "translationVi": "Giáo sư Nash, thật tuyệt vời khi có anh ở đây, John à.",
        "ipaUs": "/prəˈfɛsər næʃ, ɪts ɡʊd tuː hæv juː hɪr, dʒɑːn./",
        "keywords": ["good to have you here"],
        "explanationAi": "Lời chào đón chân thành của đồng nghiệp xóa nhòa mọi khoảng cách và định kiến bệnh tật.",
        "properNouns": ["Nash", "John"]
    },
    {
        "orderIndex": 29,
        "startTime": 252.00,
        "endTime": 259.00,
        "text": "It's an honor, sir.",
        "translationVi": "Thật là một niềm vinh dự to lớn, thưa giáo sư.",
        "ipaUs": "/ɪts ən ˈɑːnər, sɜːr./",
        "keywords": ["an honor"],
        "explanationAi": "Vị giáo sư thứ hai bước tới đặt chiếc bút tiếp theo.",
        "properNouns": []
    },
    {
        "orderIndex": 30,
        "startTime": 259.00,
        "endTime": 266.00,
        "text": "A privilege, Professor.",
        "translationVi": "Quả là một đặc ân, thưa Giáo sư.",
        "ipaUs": "/ə ˈprɪvəlɪdʒ, prəˈfɛsər./",
        "keywords": ["a privilege"],
        "explanationAi": "Từng chiếc bút máy được xếp ngay ngắn, phủ kín mặt bàn trước sự xúc động ngỡ ngàng của Nash.",
        "properNouns": []
    },
    {
        "orderIndex": 31,
        "startTime": 266.00,
        "endTime": 285.00,
        "text": "One by one, the distinguished faculty members line up silently, offering their cherished pens in profound respect.",
        "translationVi": "Từng người một, các thành viên giảng đoàn xuất chúng lặng lẽ xếp hàng, trang trọng dâng tặng những cây bút quý giá với lòng kính trọng vô biên.",
        "ipaUs": "/wʌn baɪ wʌn, ðə dɪˈstɪŋɡwɪʃt ˈfækəlti ˈmɛmbərz laɪn ʌp ˈsaɪləntli, ˈɔːfərɪŋ ðɛr ˈtʃɛrɪʃt pɛnz ɪn prəˈfaʊnd rɪˈspɛkt./",
        "keywords": ["distinguished faculty", "cherished pens", "profound respect"],
        "explanationAi": "Cảnh tượng vinh danh học thuật lay động hàng triệu trái tim khán giả toàn cầu.",
        "properNouns": []
    },
    {
        "orderIndex": 32,
        "startTime": 289.35,
        "endTime": 295.00,
        "text": "Thank you. That was certainly most unexpected.",
        "translationVi": "Cảm ơn quý vị. Điều này quả thực là hoàn toàn bất ngờ ngoài sức tưởng tượng của tôi.",
        "ipaUs": "/θæŋk juː. ðæt wʌz ˈsɜːrtn̩li moʊst ˌʌnɪkˈspɛktɪd./",
        "keywords": ["most unexpected"],
        "explanationAi": "Nash nghẹn ngào nhìn bàn bút máy, và Thomas King mỉm cười biết rằng người đàn ông này xứng đáng nhận giải Nobel hơn bất kỳ ai.",
        "properNouns": []
    },

    # Act 4: The Nobel Acceptance Speech (315.0s - 425.0s)
    {
        "orderIndex": 33,
        "startTime": 320.00,
        "endTime": 329.01,
        "text": "The Grand Auditorium in Stockholm erupts in applause as Professor John Nash steps to the podium to receive the Nobel Prize in Economics.",
        "translationVi": "Đại hội trường tại Stockholm vỡ òa trong tiếng pháo tay khi Giáo sư John Nash bước lên bục nhận Giải Nobel Kinh tế năm 1994.",
        "ipaUs": "/ðə ɡrænd ˌɔːdɪˈtɔːriəm ɪn ˈstɑːkhoʊm ɪˈrʌpts ɪn əˈplɔːz æz prəˈfɛsər dʒɑːn næʃ stɛps tuː ðə ˈpoʊdiəm tuː rɪˈsiːv ðə noʊˈbɛl praɪz ɪn ˌiːkəˈnɑːmɪks./",
        "keywords": ["Grand Auditorium in Stockholm", "Nobel Prize in Economics"],
        "explanationAi": "Đỉnh cao danh vọng quốc tế ghi nhận công trình lý thuyết trò chơi của Nash.",
        "properNouns": ["Stockholm", "John Nash", "Nobel Prize in Economics"]
    },
    {
        "orderIndex": 34,
        "startTime": 329.01,
        "endTime": 336.63,
        "text": "I've always believed in numbers, in the equations and logics that lead to reason.",
        "translationVi": "Tôi luôn luôn đặt niềm tin vào những con số, vào những phương trình và tính logic dẫn lối đến lý trí.",
        "ipaUs": "/aɪv ˈɔːlweɪz bɪˈliːvd ɪn ˈnʌmbərz, ɪn ðɪ ɪˈkweɪʒənz ænd ˈlɑːdʒɪks ðæt liːd tuː ˈriːzən./",
        "keywords": ["equations and logics", "lead to reason"],
        "explanationAi": "Mở đầu bài phát biểu: tóm lược nửa đời cống hiến cho toán học thuần túy của Nash.",
        "properNouns": []
    },
    {
        "orderIndex": 35,
        "startTime": 336.63,
        "endTime": 346.60,
        "text": "But after a lifetime of such pursuits, I ask: what truly is logic? Who decides reason?",
        "translationVi": "Nhưng sau một đời mải miết kiếm tìm những thứ đó, tôi tự hỏi: điều gì mới thực sự là logic? Ai là người định đoạt lý trí?",
        "ipaUs": "/bʌt ˈæftər ə ˈlaɪfˌtaɪm əv sʌtʃ pərˈsuːts, aɪ æsk: wɑːt ˈtruːli ɪz ˈlɑːdʒɪk? huː dɪˈsaɪdz ˈriːzən?/",
        "keywords": ["lifetime of such pursuits", "who decides reason"],
        "explanationAi": "Câu hỏi triết học sâu sắc về ranh giới mong manh giữa trí tuệ siêu việt và sự điên rồ.",
        "properNouns": []
    },
    {
        "orderIndex": 36,
        "startTime": 346.60,
        "endTime": 355.00,
        "text": "My quest has taken me through the physical, the metaphysical, the delusional, and back.",
        "translationVi": "Hành trình kiếm tìm của tôi đã đưa tôi qua thế giới vật chất, thế giới siêu hình, qua cả những ảo giác hoang tưởng, và trở về.",
        "ipaUs": "/maɪ kwɛst hæz ˈteɪkən miː θruː ðə ˈfɪzɪkəl, ðə ˌmɛtəˈfɪzɪkəl, ðə dɪˈluːʒənəl, ænd bæk./",
        "keywords": ["physical", "metaphysical", "delusional and back"],
        "explanationAi": "'Delusional and back' (đi qua cõi hoang tưởng rồi quay về): tóm lược bi kịch và chiến thắng vĩ đại trước bệnh tật.",
        "properNouns": []
    },
    {
        "orderIndex": 37,
        "startTime": 355.00,
        "endTime": 364.00,
        "text": "And I have made the most important discovery of my career, the most important discovery of my life:",
        "translationVi": "Và tôi đã tìm ra khám phá quan trọng nhất trong sự nghiệp, phát kiến trọng đại nhất của cả đời mình:",
        "ipaUs": "/ænd aɪ hæv meɪd ðə moʊst ɪmˈpɔːrtənt dɪˈskʌvəri əv maɪ kəˈrɪr, ðə moʊst ɪmˈpɔːrtənt dɪˈskʌvəri əv maɪ laɪf:/",
        "keywords": ["most important discovery of my life"],
        "explanationAi": "Cú chuyển hướng ngoạn mục từ định lý toán học sang chân lý tình cảm con người.",
        "properNouns": []
    },
    {
        "orderIndex": 38,
        "startTime": 364.00,
        "endTime": 376.00,
        "text": "It is only in the mysterious equations of love that any logical reasons can be found.",
        "translationVi": "Chỉ trong những phương trình bí ẩn của tình yêu thương, mọi lý do mang tính logic mới có thể được tìm thấy.",
        "ipaUs": "/ɪt ɪz ˈoʊnli ɪn ðə mɪˈstɪriəs ɪˈkweɪʒənz əv lʌv ðæt ˈɛni ˈlɑːdʒɪkəl ˈriːzənz kæn biː faʊnd./",
        "keywords": ["mysterious equations of love", "logical reasons"],
        "explanationAi": "Luận điểm thăng hoa của tác phẩm: tình yêu thương chính là phương trình vĩ đại nhất bảo vệ tâm trí con người khỏi sự hủy diệt.",
        "properNouns": []
    },
    {
        "orderIndex": 39,
        "startTime": 376.00,
        "endTime": 386.00,
        "text": "John looks down with infinite tenderness directly into the tear-filled eyes of his devoted wife, Alicia.",
        "translationVi": "John đưa mắt nhìn xuống với tình yêu thương vô bờ bến, hướng thẳng vào đôi mắt đẫm lệ của người vợ hiền Alicia.",
        "ipaUs": "/dʒɑːn lʊks daʊn wɪð ˈɪnfɪnət ˈtɛndərnɪs dəˈrɛktli ˈɪntuː ðə tɪr fɪld aɪz əv hɪz dɪˈvoʊtɪd waɪf, əˈliːʃə./",
        "keywords": ["infinite tenderness", "devoted wife Alicia"],
        "explanationAi": "Khoảnh khắc kết nối thiêng liêng giữa hai người bạn đời đã cùng nhau đi qua địa ngục.",
        "properNouns": ["John", "Alicia"]
    },
    {
        "orderIndex": 40,
        "startTime": 386.00,
        "endTime": 392.13,
        "text": "I am only here tonight because of you.",
        "translationVi": "Đêm nay tôi có thể đứng được ở đây, hoàn toàn là vì có em.",
        "ipaUs": "/aɪ æm ˈoʊnli hɪr təˈnaɪt bɪˈkɔːz əv juː./",
        "keywords": ["because of you"],
        "explanationAi": "Lời tri ân sâu sắc nhất dành cho người phụ nữ đã không bao giờ từ bỏ ông.",
        "properNouns": []
    },
    {
        "orderIndex": 41,
        "startTime": 392.13,
        "endTime": 396.00,
        "text": "You are the reason I am.",
        "translationVi": "Em chính là lý do tôi tồn tại trên cõi đời này.",
        "ipaUs": "/juː ɑːr ðə ˈriːzən aɪ æm./",
        "keywords": ["the reason I am"],
        "explanationAi": "Khẳng định Alicia là nguồn cội cứu rỗi sinh mạng và lý trí của Nash.",
        "properNouns": []
    },
    {
        "orderIndex": 42,
        "startTime": 396.00,
        "endTime": 402.26,
        "text": "You are all my reasons.",
        "translationVi": "Em là tất cả những lý do của đời tôi.",
        "ipaUs": "/juː ɑːr ɔːl maɪ ˈriːzənz./",
        "keywords": ["all my reasons"],
        "explanationAi": "Câu thoại tình cảm kinh điển làm rung động hàng triệu con tim trên toàn thế giới.",
        "properNouns": []
    },
    {
        "orderIndex": 43,
        "startTime": 402.26,
        "endTime": 406.05,
        "text": "Thank you.",
        "translationVi": "Xin cảm ơn quý vị.",
        "ipaUs": "/θæŋk juː./",
        "keywords": ["thank you"],
        "explanationAi": "Nash khép lại bài phát biểu giản dị nhưng đầy uy lực.",
        "properNouns": []
    },
    {
        "orderIndex": 44,
        "startTime": 406.05,
        "endTime": 425.00,
        "text": "The Swedish Royal Academy, the King of Sweden, and the international audience rise in a roaring standing ovation.",
        "translationVi": "Viện Hàn lâm Hoàng gia Thụy Điển, Quốc vương Thụy Điển cùng toàn thể khán giả quốc tế đồng loạt đứng dậy vỗ tay vang dội.",
        "ipaUs": "/ðə ˈswiːdɪʃ ˈrɔɪəl əˈkædəmi, ðə kɪŋ əv ˈswiːdn̩, ænd ðɪ ˌɪntərˈnæʃnəl ˈɔːdiəns raɪz ɪn ə ˈrɔːrɪŋ ˈstændɪŋ oʊˈveɪʃən./",
        "keywords": ["Swedish Royal Academy", "standing ovation"],
        "explanationAi": "Sự tán dương xứng đáng cho thiên tài và lòng dũng cảm phi thường.",
        "properNouns": ["Swedish Royal Academy", "Sweden"]
    },
    {
        "orderIndex": 45,
        "startTime": 425.00,
        "endTime": 440.00,
        "text": "Alicia clutches her handkerchief, weeping tears of relief and triumphant joy as John touches the gold Nobel medal on his lapel.",
        "translationVi": "Alicia nắm chặt chiếc khăn tay, rơi những giọt nước mắt nhẹ nhõm và hạnh phúc tột cùng khi John khẽ chạm tay vào tấm huy chương vàng Nobel trên ve áo.",
        "ipaUs": "/əˈliːʃə klʌtʃɪz hɜːr ˈhæŋkərtʃɪf, ˈwiːpɪŋ tɪrz əv rɪˈliːf ænd traɪˈʌmfənt dʒɔɪ æz dʒɑːn ˈtʌtʃɪz ðə ɡoʊld noʊˈbɛl ˈmɛdəl ɑːn hɪz ləˈpɛl./",
        "keywords": ["weeping tears of relief", "gold Nobel medal"],
        "explanationAi": "Chiếc huy chương vàng Nobel là phần thưởng cho toán học, nhưng tình yêu của Alicia mới là phần thưởng cho cuộc đời ông.",
        "properNouns": ["Alicia", "John", "Nobel"]
    },

    # Act 5: Leaving the Hall & The Peaceful Farewell (440.0s - 517.0s)
    {
        "orderIndex": 46,
        "startTime": 460.00,
        "endTime": 467.52,
        "text": "After the gala, John and Alicia step into the quiet marble lobby, preparing to return to their hotel.",
        "translationVi": "Sau buổi dạ tiệc, John và Alicia bước ra sảnh cẩm thạch yên tĩnh, chuẩn bị lên xe trở về khách sạn.",
        "ipaUs": "/ˈæftər ðə ˈɡeɪlə, dʒɑːn ænd əˈliːʃə stɛp ˈɪntuː ðə ˈkwaɪət ˈmɑːrbəl ˈlɑːbi, prɪˈpɛrɪŋ tuː rɪˈtɜːrn tuː ðɛr hoʊˈtɛl./",
        "keywords": ["marble lobby", "after the gala"],
        "explanationAi": "Không khí tĩnh lặng sau những tràng pháo tay rực rỡ.",
        "properNouns": ["John", "Alicia"]
    },
    {
        "orderIndex": 47,
        "startTime": 467.52,
        "endTime": 473.59,
        "text": "Shall I call for the car? Are you ready to go now?",
        "translationVi": "Em gọi xe nhé? Anh đã sẵn sàng về chưa?",
        "ipaUs": "/ʃæl aɪ kɔːl fɔːr ðə kɑːr? ɑːr juː ˈrɛdi tuː ɡoʊ naʊ?/",
        "keywords": ["call for the car", "ready to go"],
        "explanationAi": "Sự chăm sóc ân cần quen thuộc của Alicia dành cho chồng.",
        "properNouns": []
    },
    {
        "orderIndex": 48,
        "startTime": 473.59,
        "endTime": 478.00,
        "text": "Because I am. Yes indeed, yes. Thank you so much.",
        "translationVi": "Bởi vì em đã sẵn sàng rồi. Đúng vậy, về thôi em. Cảm ơn em rất nhiều.",
        "ipaUs": "/bɪˈkɔːz aɪ æm. jɛs ɪnˈdiːd, jɛs. θæŋk juː soʊ mʌtʃ./",
        "keywords": ["yes indeed", "thank you so much"],
        "explanationAi": "Nash mỉm cười thanh thản, sẵn sàng trở về với cuộc sống bình dị.",
        "properNouns": []
    },
    {
        "orderIndex": 49,
        "startTime": 478.00,
        "endTime": 485.00,
        "text": "As Alicia fixes the wool coat and silver pin over his shoulders, she notices him pause and gaze across the hall.",
        "translationVi": "Khi Alicia chỉnh lại chiếc áo khoác len và chiếc ghim cài bạc trên vai ông, cô nhận thấy ông bỗng khựng lại nhìn sang phía bên kia sảnh.",
        "ipaUs": "/æz əˈliːʃə ˈfɪksɪz ðə wʊl koʊt ænd ˈsɪlvər pɪn ˈoʊvər hɪz ˈʃoʊldərz, ʃiː ˈnoʊtɪsɪz hɪm pɔːz ænd ɡeɪz əˈkrɔːs ðə hɔːl./",
        "keywords": ["silver pin", "pause and gaze"],
        "explanationAi": "Cử chỉ ấm áp của người vợ đan xen với khoảnh khắc nội tâm cuối cùng của Nash.",
        "properNouns": ["Alicia"]
    },
    {
        "orderIndex": 50,
        "startTime": 485.00,
        "endTime": 490.00,
        "text": "What is it, John? What's wrong?",
        "translationVi": "Có chuyện gì thế anh John? Có điều gì không ổn sao?",
        "ipaUs": "/wɑːt ɪz ɪt, dʒɑːn? wɑːts rɔːŋ?/",
        "keywords": ["what's wrong"],
        "explanationAi": "Alicia lo lắng hỏi han khi thấy ánh mắt chồng dừng lại.",
        "properNouns": ["John"]
    },
    {
        "orderIndex": 51,
        "startTime": 490.00,
        "endTime": 493.09,
        "text": "Nothing.",
        "translationVi": "Không có gì đâu em.",
        "ipaUs": "/ˈnʌθɪŋ./",
        "keywords": ["nothing"],
        "explanationAi": "Câu trả lời nhẹ nhõm báo hiệu sự giải thoát và chấp nhận bình an.",
        "properNouns": []
    },
    {
        "orderIndex": 52,
        "startTime": 493.09,
        "endTime": 502.26,
        "text": "In the distance, Charles, young Marcee, and Parcher stand quietly watching him—unvanquished, yet completely harmless.",
        "translationVi": "Ở đằng xa, ba ảo ảnh Charles, cô bé Marcee và mật vụ Parcher vẫn đứng lặng lẽ nhìn ông—chúng không biến mất, nhưng giờ đây đã hoàn toàn vô hại.",
        "ipaUs": "/ɪn ðə ˈdɪstəns, tʃɑːrlz, jʌŋ mɑːrˈsiː, ænd ˈpɑːrtʃər stænd ˈkwaɪətli ˈwɑːtʃɪŋ hɪm—ʌnˈvæŋkwɪʃt, jɛt kəmˈpliːtli ˈhɑːrmlɪs./",
        "keywords": ["harmless", "unvanquished"],
        "explanationAi": "Chi tiết triết lý thiên tài: căn bệnh tâm thần phân liệt không bao giờ biến mất hoàn toàn, nhưng Nash đã học cách chung sống hòa bình với nó bằng lý trí.",
        "properNouns": ["Charles", "Marcee", "Parcher"]
    },
    {
        "orderIndex": 53,
        "startTime": 502.26,
        "endTime": 510.00,
        "text": "Come with me, young lady.",
        "translationVi": "Đi cùng anh nào, cô gái trẻ.",
        "ipaUs": "/kʌm wɪð miː, jʌŋ ˈleɪdi./",
        "keywords": ["come with me", "young lady"],
        "explanationAi": "Cách gọi âu yếm John Nash dành cho Alicia, nhắc nhớ tình yêu nồng nàn thuở ban đầu.",
        "properNouns": []
    },
    {
        "orderIndex": 54,
        "startTime": 510.00,
        "endTime": 517.84,
        "text": "Hand in hand, John and Alicia walk out into the crisp Swedish night, embracing the triumph of a beautiful mind.",
        "translationVi": "Tay trong tay, John và Alicia cùng nhau bước ra màn đêm Thụy Điển trong trẻo, đón nhận trọn vẹn chiến thắng của một tâm hồn đẹp.",
        "ipaUs": "/hænd ɪn hænd, dʒɑːn ænd əˈliːʃə wɔːk aʊt ˈɪntuː ðə krɪsp ˈswiːdɪʃ naɪt, ɛmˈbreɪsɪŋ ðə traɪˈʌmf əv ə ˈbjuːtəfəl maɪnd./",
        "keywords": ["hand in hand", "triumph of a beautiful mind"],
        "explanationAi": "Cái kết tráng lệ tôn vinh sức mạnh kỳ diệu của tình yêu và ý chí con người.",
        "properNouns": ["John", "Alicia"]
    }
]

# Strict tokenCount via regex
for seg in raw_segments:
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", seg["text"])
    seg["tokenCount"] = len(tokens)

# Define 8 Comprehensive CEFR B2 Questions
quiz_questions = [
    {
        "id": "q_mov_insp_09_1",
        "question": "Why does John Nash ask a nearby student if he can see Thomas King before engaging in conversation?",
        "questionEn": "Why does John Nash ask a nearby student if he can see Thomas King before engaging in conversation?",
        "questionVi": "Tại sao John Nash lại phải hỏi một sinh viên gần đó xem cậu ấy có nhìn thấy Thomas King không trước khi trò chuyện?",
        "options": [
            "To verify whether the stranger is a real physical person or another schizophrenic hallucination",
            "To test the student's observational alertness ahead of an upcoming economics examination",
            "Because King was standing behind an opaque decorative column that obscured Nash's peripheral vision",
            "To introduce the student to a representative of the Swedish Royal Academy for future research grants"
        ],
        "optionsEn": [
            "To verify whether the stranger is a real physical person or another schizophrenic hallucination",
            "To test the student's observational alertness ahead of an upcoming economics examination",
            "Because King was standing behind an opaque decorative column that obscured Nash's peripheral vision",
            "To introduce the student to a representative of the Swedish Royal Academy for future research grants"
        ],
        "optionsVi": [
            "Để xác thực xem người lạ mặt đó là người thật hay lại là một ảo giác hoang tưởng của chứng tâm thần phân liệt",
            "Để kiểm tra sự nhạy bén quan sát của sinh viên trước kỳ thi kinh tế sắp tới",
            "Bởi vì King đứng sau một cây cột trang trí làm khuất tầm nhìn của Nash",
            "Để giới thiệu sinh viên với đại diện Viện Hàn lâm Hoàng gia Thụy Điển xin học bổng"
        ],
        "correctAnswer": 0,
        "explanation": "Nash relies on trusted peers to verify reality because of his lifelong battle with vivid schizophrenic hallucinations.",
        "explanationEn": "Nash relies on trusted peers to verify reality because of his lifelong battle with vivid schizophrenic hallucinations.",
        "explanationVi": "Nash dựa vào người xung quanh để xác nhận thực tại vì cuộc chiến cả đời với những ảo ảnh chân thực của bệnh tâm thần phân liệt.",
        "targetedConcept": "Coping Strategies for Schizophrenia",
        "targetedConceptEn": "Coping Strategies for Schizophrenia",
        "targetedConceptVi": "Chiến lược ứng phó với bệnh tâm thần phân liệt",
        "referenceSegmentIndex": 2
    },
    {
        "id": "q_mov_insp_09_2",
        "question": "What is the primary motive behind Thomas King's personal visit to Princeton University?",
        "questionEn": "What is the primary motive behind Thomas King's personal visit to Princeton University?",
        "questionVi": "Động cơ chính yếu đằng sau chuyến thăm trực tiếp của Thomas King tới Đại học Princeton là gì?",
        "options": [
            "To discreetly evaluate Nash's mental stability and ensure he will not cause public embarrassment at the Nobel ceremony",
            "To recruit Nash as the permanent executive director of the International Monetary Fund",
            "To confiscate handwritten mathematical proofs regarding federal telecommunications auction collusion",
            "To present Nash with an honorary professorship on behalf of Cambridge University"
        ],
        "optionsEn": [
            "To discreetly evaluate Nash's mental stability and ensure he will not cause public embarrassment at the Nobel ceremony",
            "To recruit Nash as the permanent executive director of the International Monetary Fund",
            "To confiscate handwritten mathematical proofs regarding federal telecommunications auction collusion",
            "To present Nash with an honorary professorship on behalf of Cambridge University"
        ],
        "optionsVi": [
            "Để kín đáo đánh giá sự ổn định tâm lý của Nash và đảm bảo ông sẽ không gây bẽ mặt trước công chúng tại lễ trao giải Nobel",
            "Để tuyển dụng Nash làm giám đốc điều hành thường trực của Quỹ Tiền tệ Quốc tế",
            "Để tịch thu các chứng minh toán học viết tay liên quan đến đấu giá viễn thông",
            "Để trao cho Nash chức danh giáo sư danh dự thay mặt Đại học Cambridge"
        ],
        "correctAnswer": 0,
        "explanation": "The Nobel Committee dispatched King under 'special circumstances' to ensure Nash's behavior wouldn't damage the Nobel image.",
        "explanationEn": "The Nobel Committee dispatched King under 'special circumstances' to ensure Nash's behavior wouldn't damage the Nobel image.",
        "explanationVi": "Ủy ban Nobel cử King tới dưới 'trường hợp đặc biệt' để kiểm tra nhằm bảo vệ hình ảnh trang trọng của giải thưởng.",
        "targetedConcept": "Institutional Discretion & Public Image",
        "targetedConceptEn": "Institutional Discretion & Public Image",
        "targetedConceptVi": "Sự thận trọng của tổ chức & Hình ảnh công chúng",
        "referenceSegmentIndex": 20
    },
    {
        "id": "q_mov_insp_09_3",
        "question": "What metaphor does Nash use to explain how he manages his unceasing hallucinations?",
        "questionEn": "What metaphor does Nash use to explain how he manages his unceasing hallucinations?",
        "questionVi": "Nash sử dụng ẩn dụ nào để giải thích cách ông kiểm soát những ảo giác không bao giờ dứt của mình?",
        "options": [
            "A 'diet of the mind' where he deliberately refuses to indulge his appetite for patterns and imaginary connections",
            "An intellectual firewall that electronically purges irrational thoughts from his cerebral cortex",
            "A chess tournament where he sacrifices pawns to defend his cognitive king",
            "An algebraic equation where negative variables cancel out psychosomatic symptoms"
        ],
        "optionsEn": [
            "A 'diet of the mind' where he deliberately refuses to indulge his appetite for patterns and imaginary connections",
            "An intellectual firewall that electronically purges irrational thoughts from his cerebral cortex",
            "A chess tournament where he sacrifices pawns to defend his cognitive king",
            "An algebraic equation where negative variables cancel out psychosomatic symptoms"
        ],
        "optionsVi": [
            "Một 'chế độ ăn kiêng cho tâm trí', nơi ông chủ động từ chối nuông chiều thói thèm tìm kiếm quy luật và liên tưởng viển vông",
            "Một bức tường lửa trí tuệ loại bỏ những suy nghĩ phi lý khỏi vỏ não",
            "Một ván cờ vua nơi ông hy sinh quân tốt để bảo vệ quân vua nhận thức",
            "Một phương trình đại số nơi các biến âm triệt tiêu các triệu chứng tâm lý"
        ],
        "correctAnswer": 0,
        "explanation": "Nash describes disciplining his mind like a diet: 'Like a diet of the mind, I choose not to indulge certain appetites.'",
        "explanationEn": "Nash describes disciplining his mind like a diet: 'Like a diet of the mind, I choose not to indulge certain appetites.'",
        "explanationVi": "Nash miêu tả việc rèn luyện nhận thức như chế độ ăn kiêng: 'Như một chế độ ăn kiêng cho tâm trí, tôi chọn không nuông chiều những cơn thèm muốn'.",
        "targetedConcept": "Cognitive Self-Discipline: Diet of the Mind",
        "targetedConceptEn": "Cognitive Self-Discipline: Diet of the Mind",
        "targetedConceptVi": "Kỷ luật nhận thức: Chế độ ăn kiêng tâm trí",
        "referenceSegmentIndex": 26
    },
    {
        "id": "q_mov_insp_09_4",
        "question": "What is the symbolic meaning of the 'Pen Ceremony' performed by Princeton faculty members in the tea room?",
        "questionEn": "What is the symbolic meaning of the 'Pen Ceremony' performed by Princeton faculty members in the tea room?",
        "questionVi": "Ý nghĩa biểu tượng của 'Nghi thức tặng bút' được các giảng viên Princeton thực hiện trong phòng trà là gì?",
        "options": [
            "It is the university's highest traditional gesture of reverence and recognition for a colleague's lifetime achievement",
            "It symbolizes an administrative vote to expel a member from departmental budget discussions",
            "It is a formal request for the recipient to grade undergraduate calculus examination papers",
            "It marks the mandatory retirement of a tenured professor reaching pension age"
        ],
        "optionsEn": [
            "It is the university's highest traditional gesture of reverence and recognition for a colleague's lifetime achievement",
            "It symbolizes an administrative vote to expel a member from departmental budget discussions",
            "It is a formal request for the recipient to grade undergraduate calculus examination papers",
            "It marks the mandatory retirement of a tenured professor reaching pension age"
        ],
        "optionsVi": [
            "Đó là cử chỉ truyền thống cao quý nhất của đại học thể hiện sự kính trọng và công nhận thành tựu trọn đời của một đồng nghiệp",
            "Nó tượng trưng cho cuộc bỏ phiếu truất quyền tham gia thảo luận ngân sách của thành viên",
            "Đó là lời đề nghị trang trọng yêu cầu người nhận chấm bài thi giải tích sinh viên",
            "Nó đánh dấu sự nghỉ hưu bắt buộc của một giáo sư đã đến tuổi hưởng lương hưu"
        ],
        "correctAnswer": 0,
        "explanation": "The pen ceremony is Princeton's sacred tradition acknowledging a scholar whose monumental work has earned universal peer respect.",
        "explanationEn": "The pen ceremony is Princeton's sacred tradition acknowledging a scholar whose monumental work has earned universal peer respect.",
        "explanationVi": "Nghi thức tặng bút là truyền thống thiêng liêng của Princeton nhằm công nhận học giả có công trình vĩ đại nhận được sự tôn kính tuyệt đối.",
        "targetedConcept": "Academic Reverence: The Pen Ceremony",
        "targetedConceptEn": "Academic Reverence: The Pen Ceremony",
        "targetedConceptVi": "Sự tôn vinh học thuật: Nghi thức tặng bút",
        "referenceSegmentIndex": 31
    },
    {
        "id": "q_mov_insp_09_5",
        "question": "What philosophical question does John Nash raise regarding human reason at the start of his Nobel acceptance speech?",
        "questionEn": "What philosophical question does John Nash raise regarding human reason at the start of his Nobel acceptance speech?",
        "questionVi": "Câu hỏi triết học nào mà John Nash đã đặt ra liên quan đến lý trí con người khi mở đầu bài diễn văn nhận giải Nobel?",
        "options": [
            "What truly is logic, and who decides what constitutes reason after a lifetime pursuing mathematical certainty?",
            "Whether artificial intelligence algorithms will eventually replace human economic game theorists",
            "How can nation states equitably distribute wealth in competitive post-industrial marketplaces?",
            "Can biological evolution explain the origin of prime numbers in infinite set theories?"
        ],
        "optionsEn": [
            "What truly is logic, and who decides what constitutes reason after a lifetime pursuing mathematical certainty?",
            "Whether artificial intelligence algorithms will eventually replace human economic game theorists",
            "How can nation states equitably distribute wealth in competitive post-industrial marketplaces?",
            "Can biological evolution explain the origin of prime numbers in infinite set theories?"
        ],
        "optionsVi": [
            "Điều gì mới thực sự là logic, và ai là người định đoạt lý trí sau cả một đời mải miết theo đuổi tính xác thực toán học?",
            "Liệu các thuật toán trí tuệ nhân tạo có thay thế các nhà lý thuyết trò chơi kinh tế học?",
            "Làm thế nào để các quốc gia phân phối của cải công bằng trong thị trường hậu công nghiệp?",
            "Liệu tiến hóa sinh học có thể giải thích nguồn gốc của các số nguyên tố trong lý thuyết tập hợp vô hạn?"
        ],
        "correctAnswer": 0,
        "explanation": "Nash questions pure rationality: 'But after a lifetime of such pursuits, I ask: what truly is logic? Who decides reason?'",
        "explanationEn": "Nash questions pure rationality: 'But after a lifetime of such pursuits, I ask: what truly is logic? Who decides reason?'",
        "explanationVi": "Nash chất vấn thuần lý tính: 'Sau cả một đời mải miết kiếm tìm, tôi tự hỏi: điều gì mới thực sự là logic? Ai định đoạt lý trí?'.",
        "targetedConcept": "Philosophical Inquiry into Pure Reason",
        "targetedConceptEn": "Philosophical Inquiry into Pure Reason",
        "targetedConceptVi": "Chất vấn triết học về thuần lý trí",
        "referenceSegmentIndex": 35
    },
    {
        "id": "q_mov_insp_09_6",
        "question": "What does John Nash identify as 'the most important discovery of my life' during his Nobel speech?",
        "questionEn": "What does John Nash identify as 'the most important discovery of my life' during his Nobel speech?",
        "questionVi": "John Nash đã khẳng định điều gì là 'khám phá quan trọng nhất của đời tôi' trong bài phát biểu nhận giải Nobel?",
        "options": [
            "That only in the mysterious equations of love can any truly logical reasons be found",
            "The mathematical proof of Nash equilibrium in non-cooperative game theory",
            "The biochemical formulation of antipsychotic medication that suppressed his symptoms",
            "The proof that Riemannian manifolds can be isometrically embedded into Euclidean spaces"
        ],
        "optionsEn": [
            "That only in the mysterious equations of love can any truly logical reasons be found",
            "The mathematical proof of Nash equilibrium in non-cooperative game theory",
            "The biochemical formulation of antipsychotic medication that suppressed his symptoms",
            "The proof that Riemannian manifolds can be isometrically embedded into Euclidean spaces"
        ],
        "optionsVi": [
            "Rằng chỉ trong những phương trình bí ẩn của tình yêu thương, mọi lý do mang tính logic mới có thể được tìm thấy",
            "Chứng minh toán học về trạng thái cân bằng Nash trong lý thuyết trò chơi phi hợp tác",
            "Công thức hóa sinh của thuốc chống loạn thần giúp ức chế các triệu chứng của ông",
            "Chứng minh rằng các đa tạp Riemann có thể được nhúng đẳng cự vào không gian Euclid"
        ],
        "correctAnswer": 0,
        "explanation": "Nash concludes his lifelong quest by identifying love as the ultimate logic: 'It is only in the mysterious equations of love that any logical reasons can be found.'",
        "explanationEn": "Nash concludes his lifelong quest by identifying love as the ultimate logic: 'It is only in the mysterious equations of love that any logical reasons can be found.'",
        "explanationVi": "Nash đúc kết hành trình đời mình bằng việc coi tình yêu là logic tối thượng: 'Chỉ trong những phương trình bí ẩn của tình yêu, mọi lý do logic mới được tìm thấy'.",
        "targetedConcept": "The Mysterious Equations of Love",
        "targetedConceptEn": "The Mysterious Equations of Love",
        "targetedConceptVi": "Những phương trình bí ẩn của tình yêu",
        "referenceSegmentIndex": 38
    },
    {
        "id": "q_mov_insp_09_7",
        "question": "What is the enduring status of John Nash's hallucinations as depicted in the film's final moments outside the gala hall?",
        "questionEn": "What is the enduring status of John Nash's hallucinations as depicted in the film's final moments outside the gala hall?",
        "questionVi": "Trạng thái lâu dài của những ảo ảnh của John Nash được thể hiện như thế nào trong những khoảnh khắc cuối cùng của bộ phim bên ngoài sảnh dạ tiệc?",
        "options": [
            "Charles, Marcee, and Parcher remain present in his visual field, but they are recognized as harmless and powerless over his reality",
            "The hallucinations have been completely cured and permanently eliminated by revolutionary neurological therapy",
            "The delusions have grown aggressively violent and forcefully seize control of his motor speech functions",
            "Nash has embraced the hallucinations as co-authors on his future scientific publications"
        ],
        "optionsEn": [
            "Charles, Marcee, and Parcher remain present in his visual field, but they are recognized as harmless and powerless over his reality",
            "The hallucinations have been completely cured and permanently eliminated by revolutionary neurological therapy",
            "The delusions have grown aggressively violent and forcefully seize control of his motor speech functions",
            "Nash has embraced the hallucinations as co-authors on his future scientific publications"
        ],
        "optionsVi": [
            "Charles, Marcee và Parcher vẫn xuất hiện trong tầm mắt ông, nhưng chúng được nhận diện là hoàn toàn vô hại và bất lực trước thực tại của ông",
            "Những ảo giác đã được chữa khỏi hoàn toàn và biến mất vĩnh viễn nhờ liệu pháp thần kinh mang tính cách mạng",
            "Những hoang tưởng trở nên hung hăng bạo lực và chiếm quyền kiểm soát khả năng ngôn ngữ của ông",
            "Nash đã đón nhận các ảo ảnh như những đồng tác giả cho các bài báo khoa học tương lai"
        ],
        "correctAnswer": 0,
        "explanation": "The figures still stand in the shadows, representing that while chronic schizophrenia never truly vanishes, he has mastered living peacefully alongside them.",
        "explanationEn": "The figures still stand in the shadows, representing that while chronic schizophrenia never truly vanishes, he has mastered living peacefully alongside them.",
        "explanationVi": "Các hình bóng vẫn đứng trong bóng tối, thể hiện rằng dù căn bệnh không bao giờ biến mất, ông đã làm chủ việc chung sống hòa bình bên cạnh chúng.",
        "targetedConcept": "Acceptance, Peaceful Coexistence & Inner Mastery",
        "targetedConceptEn": "Acceptance, Peaceful Coexistence & Inner Mastery",
        "targetedConceptVi": "Sự chấp nhận, Chung sống hòa bình & Làm chủ nội tâm",
        "referenceSegmentIndex": 52
    },
    {
        "id": "q_mov_insp_09_8",
        "question": "How does John Nash's relationship with Alicia represent the central emotional thesis of A Beautiful Mind?",
        "questionEn": "How does John Nash's relationship with Alicia represent the central emotional thesis of A Beautiful Mind?",
        "questionVi": "Mối quan hệ giữa John Nash và Alicia đại diện cho luận điểm cảm xúc trung tâm của A Beautiful Mind như thế nào?",
        "options": [
            "Unconditional spousal loyalty and compassionate devotion serve as the indispensable anchor that rescues human genius from psychological oblivion",
            "Professional marriage contracts provide superior financial safeguards against academic unemployment",
            "Intellectual compatibility in advanced mathematics is the sole criterion for enduring marital happiness",
            "Codependency in marriage prevents patients from seeking specialized medical institutionalization"
        ],
        "optionsEn": [
            "Unconditional spousal loyalty and compassionate devotion serve as the indispensable anchor that rescues human genius from psychological oblivion",
            "Professional marriage contracts provide superior financial safeguards against academic unemployment",
            "Intellectual compatibility in advanced mathematics is the sole criterion for enduring marital happiness",
            "Codependency in marriage prevents patients from seeking specialized medical institutionalization"
        ],
        "optionsVi": [
            "Lòng thủy chung vô điều kiện và sự tận tụy giàu lòng trắc ẩn của người bạn đời chính là điểm tựa không thể thiếu cứu rỗi thiên tài khỏi sự quên lãng tâm lý",
            "Hợp đồng hôn nhân chuyên nghiệp mang lại sự bảo đảm tài chính vượt trội trước nạn thất nghiệp học thuật",
            "Sự tương thích trí tuệ trong toán học cao cấp là tiêu chí duy nhất cho hạnh phúc hôn nhân bền vững",
            "Sự phụ thuộc lẫn nhau trong hôn nhân ngăn cản bệnh nhân tìm kiếm sự chăm sóc tại bệnh viện chuyên khoa"
        ],
        "optionsVi": [
            "Lòng thủy chung vô điều kiện và sự tận tụy giàu lòng trắc ẩn của người bạn đời chính là điểm tựa không thể thiếu cứu rỗi thiên tài khỏi sự quên lãng tâm lý",
            "Hợp đồng hôn nhân chuyên nghiệp mang lại sự bảo đảm tài chính vượt trội trước nạn thất nghiệp học thuật",
            "Sự tương thích trí tuệ trong toán học cao cấp là tiêu chí duy nhất cho hạnh phúc hôn nhân bền vững",
            "Sự phụ thuộc lẫn nhau trong hôn nhân ngăn cản bệnh nhân tìm kiếm sự chăm sóc tại bệnh viện chuyên khoa"
        ],
        "correctAnswer": 0,
        "explanation": "Alicia's steadfast love and sacrifice provided the vital anchor that enabled Nash to anchor himself in reality and reclaim his life.",
        "explanationEn": "Alicia's steadfast love and sacrifice provided the vital anchor that enabled Nash to anchor himself in reality and reclaim his life.",
        "explanationVi": "Tình yêu kiên định và sự hy sinh của Alicia mang lại điểm tựa sống còn giúp Nash neo giữ mình trong thực tại và giành lại cuộc đời.",
        "targetedConcept": "The Transformative Power of Unconditional Love",
        "targetedConceptEn": "The Transformative Power of Unconditional Love",
        "targetedConceptVi": "Sức mạnh chuyển hóa của tình yêu vô điều kiện",
        "referenceSegmentIndex": 42
    }
]

# Write complete TypeScript lesson file
code = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: A Beautiful Mind: John Nash's Nobel Prize Acceptance Speech
 * Category: Phim Truyền Cảm Hứng & Triết Lý (cat_inspirational_life)
 * Level: CEFR B2 | American
 * YouTube ID: rrZBpTZmGfI (08:37 - 517s)
 * Views: 106,950 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC
 * ZERO MERGED UTTERANCES: TÁCH RIÊNG RẼ TỪNG PHÁT NGÔN CỦA MỖI NHÂN VẬT
 * ============================================================================
 */

export const QUIZ_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH: VideoQuizData = {json.dumps({
    "lessonId": "mov_insp_09",
    "lessonTitle": "A Beautiful Mind: John Nash's Nobel Prize Acceptance Speech",
    "totalQuestions": 8,
    "xpReward": 100,
    "generatedBy": "AI_GEMINI",
    "questions": quiz_questions
}, ensure_ascii=False, indent=2)};

export const LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH: MockVideoLesson = {{
  id: "mov_insp_09",
  slug: "a-beautiful-mind-nobel-prize-speech",
  title: "A Beautiful Mind: John Nash's Nobel Prize Acceptance Speech",
  categoryId: "cat_inspirational_life",
  categorySlug: "inspirational-life",
  categoryName: "Phim Truyền Cảm Hứng & Triết Lý",
  cefrLevel: "B2",
  durationFormatted: "08:37",
  durationSeconds: 517,
  externalId: "rrZBpTZmGfI",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/rrZBpTZmGfI/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 120,
  viewCount: 106950,
  studyCount: 3890,
  description:
    "Nhà toán học thiên tài John Nash (Russell Crowe) đứng trên bục vinh quang nhận giải Nobel Kinh tế, tri ân người vợ Alicia (Jennifer Connelly) đã cùng ông vượt qua căn bệnh tâm thần phân liệt bằng tình yêu thương vô điều kiện.",
  segments: {json.dumps(raw_segments, ensure_ascii=False, indent=4)},
  quiz: QUIZ_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH,
}};

export default LESSON_A_BEAUTIFUL_MIND_NOBEL_PRIZE_SPEECH;
'''

with open("features/listening/data/lessons/movies/inspirational/lesson_a_beautiful_mind.ts", "w", encoding="utf-8") as f:
    f.write(code)

print(f"Generated lesson_a_beautiful_mind.ts with {len(raw_segments)} segments and {len(quiz_questions)} quiz questions!")
