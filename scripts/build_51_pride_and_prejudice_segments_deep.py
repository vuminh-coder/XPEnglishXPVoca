# -*- coding: utf-8 -*-
"""
Script to construct all 51 Master Segments for Pride & Prejudice: Mr. Darcy's Unspoken Longing & Devotion
(mov_rom_05, baGBRtR53TA, 10:04 / 604s).
100% Verbatim Dialogue Coverage from 00:00 to 10:04.
"""

import json

segments = [
    # Scene 1: Arrival at Netherfield in the Mud (0.0s - 72.0s)
    {
        "orderIndex": 0,
        "startTime": 1.7,
        "endTime": 7.4,
        "text": "He's about the best butcher in the county, if I could introduce the ladies.",
        "translationVi": "Ông ấy là người bán thịt cừ khôi nhất trong toàn hạt này, nếu tôi có thể hân hạnh giới thiệu cho các quý cô.",
        "ipaUs": "/hiːz əˈbaʊt ðə bɛst ˈbʊtʃər ɪn ðə ˈkaʊnti, ɪf aɪ kʊd ˌɪntrəˈduːs ðə ˈleɪdiz./",
        "keywords": ["best butcher", "in the county", "introduce the ladies"],
        "explanationAi": "Lời mở đầu câu chuyện phiếm xã giao hài hước tại phòng khách Netherfield về những thương nhân địa phương.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 7.4,
        "endTime": 17.1,
        "text": "Apparently Lady Bathurst is redecorating her boudoir in the French style. A little unpatriotic, don't you think?",
        "translationVi": "Nghe đồn phu nhân Bathurst đang bài trí lại phòng trang điểm theo phong cách Pháp. Có chút thiếu tinh thần ái quốc, chàng có nghĩ vậy không?",
        "ipaUs": "/əˈpærəntli ˈleɪdi ˈbæθərst ɪz ˌriːˈdɛkəreɪtɪŋ hɜːr ˈbuːdwɑːr ɪn ðə frɛntʃ staɪl. ə ˈlɪtl ˌʌnˌpeɪtriˈɑːtɪk, doʊnt juː θɪŋk?/",
        "keywords": ["Lady Bathurst", "redecorating her boudoir", "French style", "unpatriotic"],
        "explanationAi": "Caroline Bingley bóng gió châm chọc xu hướng bài trí phong cách Pháp giữa bối cảnh đối đầu Anh - Pháp thời kỳ Nhiếp chính (Regency era).",
        "properNouns": ["Lady Bathurst", "French"]
    },
    {
        "orderIndex": 2,
        "startTime": 17.1,
        "endTime": 34.7,
        "text": "Miss Elizabeth Bennet.",
        "translationVi": "Thưa quý vị, tiểu thư Elizabeth Bennet đã tới.",
        "ipaUs": "/mɪs ɪˈlɪzəbəθ ˈbɛnɪt./",
        "keywords": ["Miss Elizabeth Bennet"],
        "explanationAi": "Quản gia trang trọng xướng tên khi Elizabeth bất ngờ xuất hiện tại Netherfield sau khi tự mình vượt dặm đường bùn lầy đến chăm sóc chị gái Jane.",
        "properNouns": ["Elizabeth Bennet"]
    },
    {
        "orderIndex": 3,
        "startTime": 34.7,
        "endTime": 45.3,
        "text": "Good Lord, Miss Elizabeth, did you walk here?",
        "translationVi": "Lạy Chúa lòng lành, tiểu thư Elizabeth, nàng đã đi bộ băng qua cánh đồng để đến tận đây ư?",
        "ipaUs": "/ɡʊd lɔːrd, mɪs ɪˈlɪzəbəθ, dɪd juː wɔːk hɪər?/",
        "keywords": ["good Lord", "walk here"],
        "explanationAi": "Sự sửng sốt tột độ của Charles Bingley và ngài Darcy khi chứng kiến một tiểu thư tự mình cuốc bộ nhiều dặm đường sình lầy thời tiết xấu.",
        "properNouns": ["Elizabeth"]
    },
    {
        "orderIndex": 4,
        "startTime": 45.3,
        "endTime": 64.4,
        "text": "I did. I'm so sorry. How is my sister? — She's upstairs. — Thank you.",
        "translationVi": "Vâng, tôi đã đi bộ. Thành thật xin thứ lỗi cho sự đường đột này. Chị gái tôi hiện giờ ra sao rồi? — Cô ấy đang ở trên lầu. — Xin cảm ơn ngài.",
        "ipaUs": "/aɪ dɪd. aɪm soʊ ˈsɑːri. haʊ ɪz maɪ ˈsɪstər? — ʃiːz ˌʌpˈstɛərz. — θæŋk juː./",
        "keywords": ["how is my sister", "upstairs", "thank you"],
        "explanationAi": "Tình chị em thắm thiết vượt lên trên mọi câu nệ lễ nghi xã hội thượng lưu khi Elizabeth bất chấp mưa gió để ở bên Jane.",
        "properNouns": []
    },
    {
        "orderIndex": 5,
        "startTime": 64.4,
        "endTime": 72.0,
        "text": "My goodness, did you see her hem? Six inches deep in mud! She looked positively medieval.",
        "translationVi": "Trời đất ơi, ngài có thấy gấu váy của cô ta không? Lấm lem bùn đất sâu đến tận sáu phân! Trông cô ta hệt như một kẻ thời Trung Cổ vậy.",
        "ipaUs": "/maɪ ˈɡʊdnəs, dɪd juː siː hɜːr hɛm? sɪks ˈɪntʃɪz diːp ɪn mʌd! ʃiː lʊkt ˈpɑːzətɪvli ˌmɛdiˈiːvl./",
        "keywords": ["see her hem", "deep in mud", "positively medieval"],
        "explanationAi": "Caroline Bingley châm biếm ngoại hình lấm lem bùn đất của Elizabeth hòng hạ thấp cô, nhưng Darcy lại nhìn thấy nét khỏe khoắn rạng ngời.",
        "properNouns": []
    },

    # Scene 2: The Accomplished Woman Discussion (72.0s - 116.0s)
    {
        "orderIndex": 6,
        "startTime": 72.0,
        "endTime": 78.5,
        "text": "I cannot boast of knowing more than half a dozen women in all my acquaintance that are truly accomplished. — Nor I, to be sure.",
        "translationVi": "Em chẳng dám khoe rằng mình quen biết quá nửa tá phụ nữ thực sự tài đức vẹn toàn trong số tất cả những người em quen. — Anh cũng vậy, chắc chắn rồi.",
        "ipaUs": "/aɪ ˈkænɑːt boʊst əv ˈnoʊɪŋ mɔːr ðæn hæf ə ˈdʌzn ˈwɪmɪn ɪn ɔːl maɪ əˈkweɪntəns ðæt ɑːr ˈtruːli əˈkɑːmplɪʃt. — nɔːr aɪ, tuː biː ʃʊər./",
        "keywords": ["cannot boast", "half a dozen", "truly accomplished"],
        "explanationAi": "Bàn luận về tiêu chuẩn 'người phụ nữ hoàn hảo' (an accomplished woman) - thước đo chuẩn mực giáo dục quý tộc khắt khe thế kỷ 19.",
        "properNouns": []
    },
    {
        "orderIndex": 7,
        "startTime": 78.5,
        "endTime": 83.5,
        "text": "Goodness, you must comprehend a great deal in the idea. — I do. Absolutely.",
        "translationVi": "Trời ơi, hẳn là các vị phải bao hàm rất nhiều tiêu chuẩn khắt khe trong khái niệm ấy. — Quả đúng vậy. Chắc chắn là như thế.",
        "ipaUs": "/ˈɡʊdnəs, juː mʌst ˌkɑːmprɪˈhɛnd ə ɡreɪt diːl ɪn ðɪ aɪˈdiːə. — aɪ duː. ˌæbsəˈluːtli./",
        "keywords": ["comprehend a great deal", "absolutely"],
        "explanationAi": "Elizabeth hoài nghi về tiêu chuẩn khắt khe, trong khi Darcy khẳng định sự kiên định về mẫu người phụ nữ mà chàng tôn trọng.",
        "properNouns": []
    },
    {
        "orderIndex": 8,
        "startTime": 83.5,
        "endTime": 88.5,
        "text": "She must have a thorough knowledge of music, singing, drawing, dancing, and the modern languages to deserve the word.",
        "translationVi": "Một người phụ nữ phải am hiểu tường tận về âm nhạc, ca hát, hội họa, khiêu vũ và các sinh ngữ hiện đại thì mới xứng đáng với danh xưng ấy.",
        "ipaUs": "/ʃiː mʌst hæv ə ˈθɜːroʊ ˈnɑːlɪdʒ əv ˈmjuːzɪk, ˈsɪŋɪŋ, ˈdrɔːɪŋ, ˈdænsɪŋ, ænd ðə ˈmɑːdərn ˈlæŋɡwɪdʒɪz tuː dɪˈzɜːrv ðə wɜːrd./",
        "keywords": ["thorough knowledge", "modern languages", "deserve the word"],
        "explanationAi": "Danh sách các môn nghệ thuật và tài khéo mà các thiếu nữ thượng lưu bắt buộc phải thụ đắc để được coi là môn đăng hộ đối.",
        "properNouns": []
    },
    {
        "orderIndex": 9,
        "startTime": 88.5,
        "endTime": 94.2,
        "text": "And something in her air and manner of walking...",
        "translationVi": "Và còn phải có một nét gì đó thật đặc biệt trong thần thái cùng dáng điệu bước đi của nàng...",
        "ipaUs": "/ænd ˈsʌmθɪŋ ɪn hɜːr ɛər ænd ˈmænər əv ˈwɔːkɪŋ.../",
        "keywords": ["something in her air", "manner of walking"],
        "explanationAi": "Darcy bất ngờ thêm vào tiêu chuẩn thần thái tự nhiên và dáng đi - ngầm ám chỉ bước chân kiên cường băng qua bùn lầy của Elizabeth.",
        "properNouns": []
    },
    {
        "orderIndex": 10,
        "startTime": 94.2,
        "endTime": 116.0,
        "text": "And, of course, she must improve her mind by extensive reading.",
        "translationVi": "Và tất nhiên, nàng còn phải không ngừng trau dồi tâm trí mình bằng việc đọc sách thật sâu rộng nữa.",
        "ipaUs": "/ænd, əv kɔːrs, ʃiː mʌst ɪmˈpruːv hɜːr maɪnd baɪ ɪkˈstɛnsɪv ˈriːdɪŋ./",
        "keywords": ["improve her mind", "extensive reading"],
        "explanationAi": "Caroline Bingley vội vàng bổ sung điều kiện đọc sách khi nhìn thấy sự say mê của Darcy dành cho trí tuệ và sách vở.",
        "properNouns": []
    },

    # Scene 3: The Netherfield Ball (116.0s - 130.0s)
    {
        "orderIndex": 11,
        "startTime": 116.0,
        "endTime": 130.0,
        "text": "May I have the next dance, Miss Elizabeth? — ...Thank you.",
        "translationVi": "Tôi có thể xin vinh hạnh được khiêu vũ điệu tiếp theo cùng tiểu thư Elizabeth không? — ...Xin cảm ơn ngài.",
        "ipaUs": "/meɪ aɪ hæv ðə nɛkst dæns, mɪs ɪˈlɪzəbəθ? — ...θæŋk juː./",
        "keywords": ["next dance", "Miss Elizabeth", "thank you"],
        "explanationAi": "Khoảnh khắc ngỡ ngàng tại dạ vũ Netherfield khi Darcy bất ngờ phá vỡ định kiến kiêu ngạo để tiến tới mời Elizabeth khiêu vũ.",
        "properNouns": ["Elizabeth"]
    },

    # Scene 4: Rosings Park - Lady Catherine de Bourgh (130.0s - 160.0s)
    {
        "orderIndex": 12,
        "startTime": 130.7,
        "endTime": 145.3,
        "text": "Mr. Darcy! What are you doing here? — Mr. Darcy! I had no idea we had the honour. Miss Elizabeth, I'm a guest here...",
        "translationVi": "Ngài Darcy! Ngài làm gì ở đây thế này? — Ngài Darcy! Ta không hề biết là chúng ta lại có vinh dự này. Tiểu thư Elizabeth, cháu là khách ở đây...",
        "ipaUs": "/ˈmɪstər ˈdɑːrsi! wʌt ɑːr juː ˈduːɪŋ hɪər? — ˈmɪstər ˈdɑːrsi! aɪ hæd noʊ aɪˈdiːə wiː hæd ðɪ ˈɑːnər. mɪs ɪˈlɪzəbəθ, aɪm ə ɡɛst hɪər.../",
        "keywords": ["what are you doing here", "had the honour", "guest here"],
        "explanationAi": "Sự xuất hiện đường đột của Darcy tại trang viên Rosings Park của phu nhân quyền quý Lady Catherine de Bourgh.",
        "properNouns": ["Darcy", "Elizabeth"]
    },
    {
        "orderIndex": 13,
        "startTime": 145.3,
        "endTime": 160.8,
        "text": "Though you have no instrument of your own, you're very welcome to come to Rosings and play on the pianoforte in the housekeeper's room. — Thank you. — You'll be in nobody's way in that part of the house.",
        "translationVi": "Dù cháu không có nhạc cụ riêng, cháu rất hoan nghênh đến Rosings này để tập đàn piano forte trong phòng bà quản gia. — Cháu xin cảm ơn. — Cháu sẽ chẳng vướng chân ai ở góc nhà đó cả.",
        "ipaUs": "/ðoʊ juː hæv noʊ ˈɪnstrəmənt əv jʊər oʊn, jʊər ˈvɛri ˈwɛlkəm tuː kʌm tuː ˈroʊzɪŋz ænd pleɪ ɑːn ðə piˌænəʊˈfɔːti ɪn ðə ˈhaʊsˌkiːpərz ruːm. — θæŋk juː. — jʊl biː ɪn ˈnoʊbədiz weɪ ɪn ðæt pɑːrt əv ðə haʊs./",
        "keywords": ["no instrument", "Rosings", "housekeeper's room", "nobody's way"],
        "explanationAi": "Thái độ trịch thượng gia trưởng đặc trưng của Lady Catherine de Bourgh khi ban ơn nhưng vẫn phân định đẳng cấp sâu sắc.",
        "properNouns": ["Rosings"]
    },

    # Scene 5: Pianoforte Banter & Darcy Awkwardness at Rosings (160.8s - 234.0s)
    {
        "orderIndex": 14,
        "startTime": 160.8,
        "endTime": 170.5,
        "text": "You mean to frighten me, Mr. Darcy, by coming in all your state to hear me? But I won't be alarmed even if your sister does play so well.",
        "translationVi": "Ngài định dọa tôi sợ sao, ngài Darcy, khi mang theo cả vẻ uy nghiêm đạo mạo đến để nghe tôi đàn? Nhưng tôi sẽ chẳng hề nao núng đâu, dẫu cho em gái ngài có chơi đàn điêu luyện đến thế nào.",
        "ipaUs": "/juː miːn tuː ˈfraɪtn miː, ˈmɪstər ˈdɑːrsi, baɪ ˈkʌmɪŋ ɪn ɔːl jʊər steɪt tuː hɪər miː? bʌt aɪ woʊnt biː əˈlɑːrmd ˈiːvn ɪf jʊər ˈsɪstər dʌz pleɪ soʊ wɛl./",
        "keywords": ["frighten me", "all your state", "won't be alarmed"],
        "explanationAi": "Elizabeth thách thức sự đạo mạo cứng nhắc của Darcy bằng nét hóm hỉnh duyên dáng bên phím đàn piano forte.",
        "properNouns": ["Darcy"]
    },
    {
        "orderIndex": 15,
        "startTime": 170.5,
        "endTime": 176.5,
        "text": "I am well enough acquainted with you, Miss Elizabeth, to know that I cannot alarm you, even should I wish it.",
        "translationVi": "Tôi hiểu rõ tiểu thư Elizabeth đủ nhiều để biết rằng tôi chẳng thể nào làm nàng nao núng, ngay cả khi tôi có muốn làm vậy đi chăng nữa.",
        "ipaUs": "/aɪ æm wɛl ɪˈnʌf əˈkweɪntɪd wɪð juː, mɪs ɪˈlɪzəbəθ, tuː noʊ ðæt aɪ ˈkænɑːt əˈlɑːrm juː, ˈiːvn ʃʊd aɪ wɪʃ ɪt./",
        "keywords": ["well enough acquainted", "cannot alarm you", "should I wish it"],
        "explanationAi": "Darcy mỉm cười kín đáo thừa nhận sự kiên cường và cá tính độc lập không bao giờ khuất phục của Elizabeth.",
        "properNouns": ["Elizabeth"]
    },
    {
        "orderIndex": 16,
        "startTime": 176.5,
        "endTime": 184.9,
        "text": "What was my friend like in Hertfordshire? — You really care to know? Prepare yourself for something very dreadful.",
        "translationVi": "Bạn tôi khi ở hạt Hertfordshire là người như thế nào vậy? — Ngài thật sự muốn biết sao? Hãy chuẩn bị tinh thần đón nhận một điều gì đó hết sức khủng khiếp đi.",
        "ipaUs": "/wʌt wʌz maɪ frɛnd laɪk ɪn ˈhɑːrtfərdʃɪər? — juː ˈriːəli kɛər tuː noʊ? prɪˈpɛər jʊərˈsɛlf fɔːr ˈsʌmθɪŋ ˈvɛri ˈdrɛdfʊl./",
        "keywords": ["friend like in Hertfordshire", "prepare yourself", "very dreadful"],
        "explanationAi": "Đại tá Fitzwilliam xen vào cuộc trò chuyện, tạo cơ hội cho Elizabeth bóc mẽ tính kiêu ngạo của Darcy tại vũ hội Meryton.",
        "properNouns": ["Hertfordshire", "Fitzwilliam"]
    },
    {
        "orderIndex": 17,
        "startTime": 184.9,
        "endTime": 193.5,
        "text": "The first time I saw him at the assembly, he danced with nobody at all, even though gentlemen were scarce and there was more than one young lady sitting down without a partner.",
        "translationVi": "Lần đầu tiên tôi gặp ngài ấy tại vũ hội hội trường, ngài ấy chẳng thèm khiêu vũ với bất kỳ ai, mặc dù các quý ông thì khan hiếm mà có biết bao cô gái trẻ phải ngồi lẻ loi không có bạn nhảy.",
        "ipaUs": "/ðə fɜːrst taɪm aɪ sɔː hɪm æt ðɪ əˈsɛmbli, hiː dænst wɪð ˈnoʊbədi æt ɔːl, ˈiːvn ðoʊ ˈdʒɛntlmɪn wɜːr skɛərs ænd ðɛər wʌz mɔːr ðæn wʌn jʌŋ ˈleɪdi ˈsɪtɪŋ daʊn wɪˈðaʊt ə ˈpɑːrtnər./",
        "keywords": ["at the assembly", "gentlemen were scarce", "without a partner"],
        "explanationAi": "Nhắc lại khởi nguồn của Định kiến: thái độ lạnh lùng xa cách của Darcy khi chê Elizabeth 'tạm được nhưng chưa đủ đẹp để cám dỗ tôi'.",
        "properNouns": []
    },
    {
        "orderIndex": 18,
        "startTime": 193.5,
        "endTime": 200.0,
        "text": "I knew nobody beyond my own party. — Oh, and nobody can be introduced in a ballroom!",
        "translationVi": "Tôi đâu có quen biết ai ngoài những người trong nhóm của mình. — Ồ, và chẳng có ai có thể được giới thiệu làm quen trong một phòng khiêu vũ cả nhỉ!",
        "ipaUs": "/aɪ njuː ˈnoʊbədi bɪˈjɑːnd maɪ oʊn ˈpɑːrti. — oʊ, ænd ˈnoʊbədi kæn biː ˌɪntrəˈduːst ɪn ə ˈbɔːlruːm!/",
        "keywords": ["beyond my own party", "introduced in a ballroom"],
        "explanationAi": "Lời bào chữa vụng về của Darcy bị Elizabeth bẻ gãy tức thì bằng sự châm chọc sắc sảo về quy ước xã giao.",
        "properNouns": []
    },
    {
        "orderIndex": 19,
        "startTime": 200.0,
        "endTime": 216.8,
        "text": "Fitzwilliam, I need you. — I do not have the talent of conversing easily with people I have never met before.",
        "translationVi": "Fitzwilliam, tôi cần cậu một lát. — Tôi không có cái khiếu trò chuyện một cách dễ dàng với những người mà tôi chưa từng gặp trước đây.",
        "ipaUs": "/fɪtsˈwɪljəm, aɪ niːd juː. — aɪ duː nɑːt hæv ðə ˈtælənt əv kənˈvɜːrsɪŋ ˈiːzɪli wɪð ˈpiːpl aɪ hæv ˈnɛvər mɛt bɪˈfɔːr./",
        "keywords": ["Fitzwilliam", "talent of conversing", "never met before"],
        "explanationAi": "Darcy lần đầu tiên bộc lộ sự tổn thương và điểm yếu xã hội: chàng không phải kiêu ngạo vì coi khinh người khác, mà vì sự vụng về nhút nhát bẩm sinh.",
        "properNouns": ["Fitzwilliam"]
    },
    {
        "orderIndex": 20,
        "startTime": 216.8,
        "endTime": 234.0,
        "text": "Perhaps you should take your aunt's advice and practice.",
        "translationVi": "Có lẽ ngài nên nghe theo lời khuyên của bà dì ngài và tập luyện thêm đi.",
        "ipaUs": "/pərˈhæps juː ʃʊd teɪk jʊər ænts ədˈvaɪs ænd ˈpræktɪs./",
        "keywords": ["take your aunt's advice", "practice"],
        "explanationAi": "Elizabeth đối đáp đầy tinh nghịch, tạo nên một trong những khoảng khắc giao cảm ánh mắt sâu sắc nhất giữa hai nhân vật.",
        "properNouns": []
    },

    # Scene 6: Awkward Visit at Hunsford Parsonage (234.0s - 308.0s)
    {
        "orderIndex": 21,
        "startTime": 234.8,
        "endTime": 252.6,
        "text": "Mr. Darcy. Please, do be seated. I'm afraid Mr. and Mrs. Collins have gone on business to the village.",
        "translationVi": "Ngài Darcy. Xin mời ngài ngồi. Tôi e rằng ông bà Collins đã có việc bận đi vào trong làng rồi.",
        "ipaUs": "/ˈmɪstər ˈdɑːrsi. pliːz, duː biː ˈsiːtɪd. aɪm əˈfreɪd ˈmɪstər ænd ˈmɪsɪz ˈkɑːlɪnz hæv ɡɔːn ɑːn ˈbɪznəs tuː ðə ˈvɪlɪdʒ./",
        "keywords": ["do be seated", "gone on business", "to the village"],
        "explanationAi": "Elizabeth bỡ ngỡ khi Darcy bất ngờ ghé thăm một mình tại nhà mục sư Hunsford trong lúc vợ chồng Collins vắng nhà.",
        "properNouns": ["Darcy", "Collins"]
    },
    {
        "orderIndex": 22,
        "startTime": 252.6,
        "endTime": 262.9,
        "text": "This is a charming house. I believe my aunt did a great deal to it when Mr. Collins first arrived.",
        "translationVi": "Đây quả là một ngôi nhà duyên dáng. Tôi tin rằng bà dì tôi đã giúp đỡ rất nhiều khi ông Collins mới chuyển đến đây.",
        "ipaUs": "/ðɪs ɪz ə ˈtʃɑːrmɪŋ haʊs. aɪ bɪˈliːv maɪ ænt dɪd ə ɡreɪt diːl tuː ɪt wɛn ˈmɪstər ˈkɑːlɪnz fɜːrst əˈraɪvd./",
        "keywords": ["charming house", "my aunt did a great deal"],
        "explanationAi": "Darcy lúng túng tìm chủ đề xã giao về công lao trang trí nhà cửa của Lady Catherine để che giấu sự hồi hộp khi được ở riêng bên Elizabeth.",
        "properNouns": ["Collins"]
    },
    {
        "orderIndex": 23,
        "startTime": 262.9,
        "endTime": 277.5,
        "text": "I believe so. She could not have bestowed her kindness on a more grateful subject.",
        "translationVi": "Tôi cũng tin là vậy. Bà ấy khó lòng ban phát lòng tốt của mình cho một đối tượng nào biết ơn hơn thế.",
        "ipaUs": "/aɪ bɪˈliːv soʊ. ʃiː kʊd nɑːt hæv bɪˈstoʊd hɜːr ˈkaɪndnəs ɑːn ə mɔːr ˈɡreɪtfʊl ˈsʌbdʒɪkt./",
        "keywords": ["bestowed her kindness", "grateful subject"],
        "explanationAi": "Elizabeth mỉa mai ngầm tính xu nịnh bợ đỡ quá mức của ông mục sư Collins đối với phu nhân Catherine de Bourgh.",
        "properNouns": []
    },
    {
        "orderIndex": 24,
        "startTime": 277.5,
        "endTime": 293.4,
        "text": "Shall I call for some tea? — No, thank you. Good day, Miss Elizabeth. It's been a pleasure.",
        "translationVi": "Tôi gọi trà mang lên nhé? — Không, xin cảm ơn nàng. Chúc tiểu thư Elizabeth một ngày tốt lành. Thật là một vinh hạnh.",
        "ipaUs": "/ʃæl aɪ kɔːl fɔːr sʌm tiː? — noʊ, θæŋk juː. ɡʊd deɪ, mɪs ɪˈlɪzəbəθ. ɪts biːn ə ˈplɛʒər./",
        "keywords": ["call for some tea", "good day", "been a pleasure"],
        "explanationAi": "Sự kìm nén cảm xúc bùng nổ khiến Darcy không thể ngồi yên, chàng hoảng hốt bỏ đi ngay trước khi kịp thốt lên lời yêu.",
        "properNouns": ["Elizabeth"]
    },
    {
        "orderIndex": 25,
        "startTime": 293.4,
        "endTime": 308.0,
        "text": "What on earth have you done to poor Mr. Darcy? — I have no idea.",
        "translationVi": "Cậu đã làm cái quái gì với ngài Darcy tội nghiệp thế hả? — Mình chịu, chẳng có manh mối nào cả.",
        "ipaUs": "/wʌt ɑːn ɜːrθ hæv juː dʌn tuː pʊər ˈmɪstər ˈdɑːrsi? — aɪ hæv noʊ aɪˈdiːə./",
        "keywords": ["what on earth", "poor Mr. Darcy", "no idea"],
        "explanationAi": "Charlotte Lucas kinh ngạc trước thái độ bồn chồn mất kiểm soát của một quý tộc quyền uy bậc nhất như Darcy.",
        "properNouns": ["Darcy"]
    },

    # Scene 7: The First Rain Proposal at Apollo Temple (308.0s - 338.0s)
    {
        "orderIndex": 26,
        "startTime": 308.4,
        "endTime": 315.7,
        "text": "Miss Elizabeth. I have struggled in vain, and I can bear it no longer. These past months have been a torment.",
        "translationVi": "Tiểu thư Elizabeth. Tôi đã đấu tranh trong vô vọng, và tôi không thể chịu đựng thêm được nữa. Những tháng ngày qua đối với tôi là một nỗi dằn vặt khôn nguôi.",
        "ipaUs": "/mɪs ɪˈlɪzəbəθ. aɪ hæv ˈstrʌɡəld ɪn veɪn, ænd aɪ kæn bɛər ɪt noʊ ˈlɔːŋɡər. ðiːz pæst mʌnθs hæv biːn ə ˈtɔːrmɛnt./",
        "keywords": ["struggled in vain", "bear it no longer", "a torment"],
        "explanationAi": "Mở đầu màn cầu hôn giông bão kinh điển tại đền thần Apollo: nỗi đau xé lòng của Darcy khi tình yêu chiến thắng lý trí.",
        "properNouns": ["Elizabeth"]
    },
    {
        "orderIndex": 27,
        "startTime": 315.7,
        "endTime": 318.8,
        "text": "I came to Rosings with the single object of seeing you. I had to see you.",
        "translationVi": "Tôi đến Rosings này chỉ với một mục đích duy nhất là để được nhìn thấy nàng. Tôi buộc phải gặp được nàng.",
        "ipaUs": "/aɪ keɪm tuː ˈroʊzɪŋz wɪð ðə ˈsɪŋɡl ˈɑːbdʒɪkt əv ˈsiːɪŋ juː. aɪ hæd tuː siː juː./",
        "keywords": ["single object", "seeing you", "had to see you"],
        "explanationAi": "Thú nhận mục đích thật sự đằng sau chuyến viếng thăm người dì: tất cả chỉ là cái cớ để được nhìn thấy Elizabeth.",
        "properNouns": ["Rosings"]
    },
    {
        "orderIndex": 28,
        "startTime": 318.8,
        "endTime": 326.5,
        "text": "I have fought against my better judgment, my family's expectation, the inferiority of your birth, my rank and circumstance... all these things, and I am willing to put them aside and ask you to end my agony.",
        "translationVi": "Tôi đã đấu tranh chống lại lý trí, sự kỳ vọng của gia tộc, địa vị xuất thân khiêm tốn của nàng, cả phẩm hàm và hoàn cảnh của tôi... tất cả những điều ấy, tôi sẵn sàng gạt bỏ sang một bên để xin nàng hãy chấm dứt nỗi đọa đày này của tôi.",
        "ipaUs": "/aɪ hæv fɔːt əˈɡɛnst maɪ ˈbɛtər ˈdʒʌdʒmənt, maɪ ˈfæməliz ˌɛkspɛkˈteɪʃən, ðɪ ɪnˌfɪəriˈɔːrəti əv jʊər bɜːrθ, maɪ ræŋk ænd ˈsɜːrkəmstæns... ɔːl ðiːz θɪŋz, ænd aɪ æm ˈwɪlɪŋ tuː pʊt ðɛm əˈsaɪd ænd æsk juː tuː ɛnd maɪ ˈæɡəni./",
        "keywords": ["better judgment", "inferiority of birth", "rank and circumstance", "end my agony"],
        "explanationAi": "Sai lầm chí mạng trong lời cầu hôn: Darcy xúc phạm gia thế của Elizabeth trong khi nghĩ rằng sự hạ mình của mình là một ân huệ.",
        "properNouns": []
    },
    {
        "orderIndex": 29,
        "startTime": 326.5,
        "endTime": 338.0,
        "text": "I don't understand. — I love you. Most ardently.",
        "translationVi": "Tôi không hiểu. — Tôi yêu nàng. Tha thiết và nồng cháy khôn cùng.",
        "ipaUs": "/aɪ doʊnt ˌʌndərˈstænd. — aɪ lʌv juː. moʊst ˈɑːrdntli./",
        "keywords": ["don't understand", "I love you", "most ardently"],
        "explanationAi": "Câu thoại bất hủ của điện ảnh lãng mạn thế giới: trạng từ 'ardently' thể hiện ngọn lửa si tình cháy bỏng ẩn dưới lớp băng giá quý tộc.",
        "properNouns": []
    },

    # Scene 8: The Pemberley Surprise Encounter (338.0s - 408.0s)
    {
        "orderIndex": 30,
        "startTime": 340.3,
        "endTime": 353.7,
        "text": "I thought you were in London! — No. No, I'm not. No, I had some business with my steward.",
        "translationVi": "Tôi cứ ngỡ ngài đang ở London cơ mà! — Không. Không, tôi không ở đó. Không, tôi có chút công việc cần giải quyết với người quản gia của mình.",
        "ipaUs": "/aɪ θɔːt juː wɜːr ɪn ˈlʌndən! — noʊ. noʊ, aɪm nɑːt. noʊ, aɪ hæd sʌm ˈbɪznəs wɪð maɪ ˈstuːərd./",
        "keywords": ["in London", "not", "business with my steward"],
        "explanationAi": "Cuộc chạm trán bất ngờ gây thót tim tại điền trang Pemberley: cả hai đều bối rối tột độ khi đối diện sau lời từ chối giông bão.",
        "properNouns": ["London"]
    },
    {
        "orderIndex": 31,
        "startTime": 353.7,
        "endTime": 368.2,
        "text": "I'm in Derbyshire with my aunt and uncle. — And are you having a pleasant trip? — Very pleasant. Tomorrow we go to Matlock.",
        "translationVi": "Tôi đang ở Derbyshire cùng với dì và dượng của tôi. — Và chuyến đi của nàng có vui vẻ không? — Rất dễ chịu. Ngày mai chúng tôi sẽ tới Matlock.",
        "ipaUs": "/aɪm ɪn ˈdɑːrbiʃɪər wɪð maɪ ænt ænd ˈʌŋkl. — ænd ɑːr juː ˈhævɪŋ ə ˈplɛznt trɪp? — ˈvɛri ˈplɛznt. təˈmɑːroʊ wiː ɡoʊ tuː ˈmætlɑːk./",
        "keywords": ["Derbyshire", "pleasant trip", "Matlock"],
        "explanationAi": "Sự thay đổi ngoạn mục trong thái độ của Darcy: chàng chủ động bắt chuyện lịch thiệp, ân cần và tôn trọng gia đình Elizabeth.",
        "properNouns": ["Derbyshire", "Matlock"]
    },
    {
        "orderIndex": 32,
        "startTime": 368.2,
        "endTime": 377.9,
        "text": "Tomorrow? Are you staying at Lambton? — Yes, at the Rose and Crown.",
        "translationVi": "Ngày mai sao? Nàng có đang trọ lại ở Lambton không? — Vâng, tại quán Rose and Crown.",
        "ipaUs": "/təˈmɑːroʊ? ɑːr juː ˈsteɪɪŋ æt ˈlæmbtən? — jɛs, æt ðə roʊz ænd kraʊn./",
        "keywords": ["staying at Lambton", "Rose and Crown"],
        "explanationAi": "Darcy cẩn thận ghi nhớ từng địa điểm lưu trú của Elizabeth để có thể đến thăm và giới thiệu cô với em gái.",
        "properNouns": ["Lambton", "Rose and Crown"]
    },
    {
        "orderIndex": 33,
        "startTime": 377.9,
        "endTime": 393.1,
        "text": "I'm so sorry to intrude. They said that the house was open for visitors. I had... I had no idea.",
        "translationVi": "Tôi vô cùng xin lỗi vì đã đường đột ghé thăm. Người ta bảo rằng dinh thự mở cửa cho khách tham quan. Tôi... tôi thực sự không hề hay biết ngài có ở đây.",
        "ipaUs": "/aɪm soʊ ˈsɑːri tuː ɪnˈtruːd. ðeɪ sɛd ðæt ðə haʊs wʌz ˈoʊpən fɔːr ˈvɪzɪtərz. aɪ hæd... aɪ hæd noʊ aɪˈdiːə./",
        "keywords": ["sorry to intrude", "open for visitors", "no idea"],
        "explanationAi": "Elizabeth ngượng ngùng thanh minh vì e sợ Darcy hiểu lầm cô cố tình theo dõi hoặc tìm kiếm chàng.",
        "properNouns": []
    },
    {
        "orderIndex": 34,
        "startTime": 393.1,
        "endTime": 408.0,
        "text": "May I see you back to the village? — No, I'm very fond of walking. — Yes. Yes, I know. Good day, Miss Elizabeth.",
        "translationVi": "Tôi có thể hộ tống nàng quay trở lại làng được không? — Không cần đâu, tôi rất thích đi bộ. — Vâng. Vâng, tôi biết điều đó. Chúc nàng một ngày tốt lành, tiểu thư Elizabeth.",
        "ipaUs": "/meɪ aɪ siː juː bæk tuː ðə ˈvɪlɪdʒ? — noʊ, aɪm ˈvɛri fɑːnd əv ˈwɔːkɪŋ. — jɛs. jɛs, aɪ noʊ. ɡʊd deɪ, mɪs ɪˈlɪzəbəθ./",
        "keywords": ["see you back", "fond of walking", "yes I know"],
        "explanationAi": "Câu nói 'Yes, I know' thể hiện sự quan sát và ghi nhớ sâu sắc từng sở thích nhỏ nhất của Darcy dành cho người con gái chàng yêu.",
        "properNouns": ["Elizabeth"]
    },

    # Scene 9: Introducing Georgiana Darcy at Pemberley (408.0s - 445.0s)
    {
        "orderIndex": 35,
        "startTime": 408.0,
        "endTime": 417.0,
        "text": "My brother has told me so much about you. I feel as if we are friends already. — Oh, thank you.",
        "translationVi": "Anh trai em đã kể với em rất nhiều điều về chị. Em cảm thấy dường như chúng ta đã là những người bạn thân thiết từ lâu rồi vậy. — Ồ, cảm ơn em.",
        "ipaUs": "/maɪ ˈbrʌðər hæz toʊld miː soʊ mʌtʃ əˈbaʊt juː. aɪ fiːl æz ɪf wiː ɑːr frɛndz ɔːlˈrɛdi. — oʊ, θæŋk juː./",
        "keywords": ["told me so much", "friends already", "thank you"],
        "explanationAi": "Georgiana Darcy bày tỏ sự quý mến chân thành, chứng minh Darcy đã nói về Elizabeth bằng tất cả sự trân trọng và say đắm.",
        "properNouns": []
    },
    {
        "orderIndex": 36,
        "startTime": 417.0,
        "endTime": 425.2,
        "text": "What a beautiful pianoforte! My brother gave it to me. He shouldn't have. — Yes, I should. — Oh, very well then. Easily persuaded, is she not?",
        "translationVi": "Cây đàn piano forte này đẹp làm sao! Anh trai đã tặng nó cho em. Lẽ ra anh ấy không nên tốn kém như vậy. — Đúng là anh nên tặng chứ. — Ồ, thế thì tuyệt quá. Con bé rất dễ bị thuyết phục, phải không ngài?",
        "ipaUs": "/wʌt ə ˈbjuːtəfʊl piˌænəʊˈfɔːti! maɪ ˈbrʌðər ɡeɪv ɪt tuː miː. hiː ˈʃʊdnt hæv. — jɛs, aɪ ʃʊd. — oʊ, ˈvɛri wɛl ðɛn. ˈiːzɪli pərˈsweɪdɪd, ɪz ʃiː nɑːt?/",
        "keywords": ["beautiful pianoforte", "gave it to me", "easily persuaded"],
        "explanationAi": "Bầu không khí ấm áp, tràn đầy tình thân gia đình tại Pemberley hoàn toàn xóa bỏ định kiến trước đây của Elizabeth về sự lạnh lùng của Darcy.",
        "properNouns": []
    },
    {
        "orderIndex": 37,
        "startTime": 425.2,
        "endTime": 433.4,
        "text": "Your unfortunate brother wants her to put up with my playing for a whole evening. — But he says you play so well.",
        "translationVi": "Người anh trai bất hạnh của chị lại muốn chị phải chịu đựng tiếng đàn của em suốt cả một buổi tối đấy ạ. — Nhưng anh ấy bảo là chị chơi đàn rất hay mà.",
        "ipaUs": "/jʊər ʌnˈfɔːrtʃənət ˈbrʌðər wɑːnts hɜːr tuː pʊt ʌp wɪð maɪ ˈpleɪɪŋ fɔːr ə hoʊl ˈiːvnɪŋ. — bʌt hiː sɛz juː pleɪ soʊ wɛl./",
        "keywords": ["unfortunate brother", "put up with", "play so well"],
        "explanationAi": "Georgiana vô tình tiết lộ lời khen ngợi nồng hậu mà Darcy luôn dành cho ngón đàn của Elizabeth.",
        "properNouns": []
    },
    {
        "orderIndex": 38,
        "startTime": 433.4,
        "endTime": 445.0,
        "text": "Then he has perjured himself most profoundly. — No, I said played quite well. — Oh, 'quite well' is not 'very well'. I'm satisfied.",
        "translationVi": "Thế thì ngài ấy vừa mới phạm tội khai man một cách trầm trọng rồi. — Không hề, tôi đã bảo là nàng chơi 'khá hay' cơ mà. — Ồ, 'khá hay' thì chưa phải là 'rất hay'. Tôi hài lòng rồi.",
        "ipaUs": "/ðɛn hiː hæz ˈpɜːrdʒərd hɪmˈsɛlf moʊst prəˈfaʊndli. — noʊ, aɪ sɛd pleɪd kwaɪt wɛl. — oʊ, kwaɪt wɛl ɪz nɑːt ˈvɛri wɛl. aɪm ˈsætɪsfaɪd./",
        "keywords": ["perjured himself", "quite well", "not very well", "satisfied"],
        "explanationAi": "Màn trêu đùa dí dỏm bằng thuật ngữ pháp lý 'perjured' (khai man) thể hiện sự hòa hợp trí tuệ tuyệt vời giữa Elizabeth và Darcy.",
        "properNouns": []
    },

    # Scene 10: The Misty Dawn Proposal (445.0s - 540.0s)
    {
        "orderIndex": 39,
        "startTime": 445.0,
        "endTime": 451.5,
        "text": "I couldn't sleep. — Nor I. My aunt... — Yes, she was here.",
        "translationVi": "Tôi không tài nào chợp mắt được. — Tôi cũng vậy. Bà dì của tôi... — Vâng, bà ấy đã đến tận nhà tôi đêm qua.",
        "ipaUs": "/aɪ ˈkʊdnt sliːp. — nɔːr aɪ. maɪ ænt... — jɛs, ʃiː wʌz hɪər./",
        "keywords": ["couldn't sleep", "nor I", "my aunt", "was here"],
        "explanationAi": "Cuộc hội ngộ định mệnh giữa cánh đồng sương sớm Longbourn sau đêm Lady Catherine đến đe dọa ép Elizabeth thề không lấy Darcy.",
        "properNouns": []
    },
    {
        "orderIndex": 40,
        "startTime": 451.5,
        "endTime": 454.5,
        "text": "How can I ever make amends for such behavior?",
        "translationVi": "Làm sao tôi có thể bù đắp lại cho hành vi khiếm nhã đến dường ấy của bà ấy đây?",
        "ipaUs": "/haʊ kæn aɪ ˈɛvər meɪk əˈmɛndz fɔːr sʌtʃ bɪˈheɪvjər?/",
        "keywords": ["make amends", "such behavior"],
        "explanationAi": "Thành ngữ 'make amends' (chuộc lỗi, đền bù): Darcy xấu hổ sâu sắc trước sự thô bạo và trịch thượng của gia tộc mình.",
        "properNouns": []
    },
    {
        "orderIndex": 41,
        "startTime": 454.5,
        "endTime": 461.5,
        "text": "After what you have done for Lydia, and I suspect for Jane also, it is I who should be making amends.",
        "translationVi": "Sau tất cả những gì ngài đã làm vì Lydia, và tôi ngờ rằng cả vì Jane nữa, chính tôi mới là người cần phải tạ lỗi và đền đáp.",
        "ipaUs": "/ˈæftər wʌt juː hæv dʌn fɔːr ˈlɪdiə, ænd aɪ səˈspɛkt fɔːr dʒeɪn ˈɔːlsoʊ, ɪt ɪz aɪ huː ʃʊd biː ˈmeɪkɪŋ əˈmɛndz./",
        "keywords": ["done for Lydia", "suspect for Jane", "making amends"],
        "explanationAi": "Elizabeth vỡ òa lòng biết ơn khi phát hiện Darcy đã bí mật dùng tiền bạc và danh dự chuộc lỗi, dàn xếp hôn lễ cứu thoát Lydia khỏi vết nhơ.",
        "properNouns": ["Lydia", "Jane"]
    },
    {
        "orderIndex": 42,
        "startTime": 461.5,
        "endTime": 468.0,
        "text": "You must know... surely you must know, it was all for you.",
        "translationVi": "Nàng ắt hẳn phải biết... chắc chắn nàng phải biết rằng, tất cả những điều ấy tôi đều làm vì nàng.",
        "ipaUs": "/juː mʌst noʊ... ˈʃʊərli juː mʌst noʊ, ɪt wʌz ɔːl fɔːr juː./",
        "keywords": ["must know", "surely you must know", "all for you"],
        "explanationAi": "Darcy bước lại gần giãi bày sự tận tụy thầm lặng: chàng không hành động vì sĩ diện quý tộc, mà thuần túy vì tình yêu cao thượng dành cho Elizabeth.",
        "properNouns": []
    },
    {
        "orderIndex": 43,
        "startTime": 468.0,
        "endTime": 478.5,
        "text": "You are too generous to trifle with me. I believe you spoke with my aunt last night, and that has taught me to hope as I had scarcely allowed myself before.",
        "translationVi": "Nàng quá đỗi bao dung để có thể đùa giỡn với tôi. Tôi tin rằng nàng đã nói chuyện với dì tôi đêm qua, và điều đó đã cho tôi niềm hy vọng mà trước đây tôi chưa từng dám cho phép mình mơ tới.",
        "ipaUs": "/juː ɑːr tuː ˈdʒɛnərəs tuː ˈtraɪfl wɪð miː. aɪ bɪˈliːv juː spoʊk wɪð maɪ ænt læst naɪt, ænd ðæt hæz tɔːt miː tuː hoʊp æz aɪ hæd ˈskɛərsli əˈlaʊd maɪˈsɛlf bɪˈfɔːr./",
        "keywords": ["too generous", "trifle with me", "taught me to hope"],
        "explanationAi": "Thành ngữ 'trifle with' (đùa cợt tình cảm): Darcy nhận ra việc Elizabeth kiên quyết từ chối khuất phục Lady Catherine chính là dấu hiệu của tình cảm.",
        "properNouns": []
    },
    {
        "orderIndex": 44,
        "startTime": 478.5,
        "endTime": 485.5,
        "text": "If your feelings are still what they were last April, tell me so at once.",
        "translationVi": "Nếu tình cảm của nàng vẫn giống như hồi tháng Tư năm ngoái, xin hãy nói cho tôi biết ngay lúc này.",
        "ipaUs": "/ɪf jʊər ˈfiːlɪŋz ɑːr stɪl wʌt ðeɪ wɜːr læst ˈeɪprəl, tɛl miː soʊ æt wʌns./",
        "keywords": ["feelings still what they were", "last April", "at once"],
        "explanationAi": "Nhắc về mốc thời gian 'last April' khi Elizabeth thẳng thừng từ chối lời cầu hôn dưới mưa tại đền Apollo.",
        "properNouns": ["April"]
    },
    {
        "orderIndex": 45,
        "startTime": 485.5,
        "endTime": 497.0,
        "text": "My affections and wishes have not changed. But one word from you will silence me on this subject forever.",
        "translationVi": "Tình cảm và ước nguyện của tôi vẫn không hề đổi thay. Nhưng chỉ cần một lời từ nàng, tôi sẽ im lặng mãi mãi về chủ đề này.",
        "ipaUs": "/maɪ əˈfɛkʃənz ænd ˈwɪʃɪz hæv nɑːt tʃeɪndʒd. bʌt wʌn wɜːrd frəm juː wɪl ˈsaɪləns miː ɑːn ðɪs ˈsʌbdʒɪkt fərˈɛvər./",
        "keywords": ["affections and wishes", "silence me on this subject forever"],
        "explanationAi": "Sự tôn trọng tuyệt đối của Darcy dành cho tự do ý chí và cảm xúc của người phụ nữ chàng tôn thờ.",
        "properNouns": []
    },
    {
        "orderIndex": 46,
        "startTime": 497.0,
        "endTime": 511.5,
        "text": "If, however, your feelings have changed, I would have to tell you: you have bewitched me, body and soul, and I love, I love, I love you.",
        "translationVi": "Tuy nhiên, nếu như tình cảm của nàng đã đổi thay, tôi buộc phải nói với nàng rằng: nàng đã bỏ bùa mê tôi, cả thể xác lẫn tâm hồn, và tôi yêu, tôi yêu, tôi yêu nàng tha thiết.",
        "ipaUs": "/ɪf, haʊˈɛvər, jʊər ˈfiːlɪŋz hæv tʃeɪndʒd, aɪ wʊd hæv tuː tɛl juː: juː hæv bɪˈwɪtʃt miː, ˈbɑːdi ænd soʊl, ænd aɪ lʌv, aɪ lʌv, aɪ lʌv juː./",
        "keywords": ["feelings have changed", "bewitched me", "body and soul", "I love you"],
        "explanationAi": "Đỉnh cao lãng mạn vĩ đại của văn học và điện ảnh: lời thú nhận 'bewitched me body and soul' phá tan mọi định kiến và rào cản giai cấp.",
        "properNouns": []
    },
    {
        "orderIndex": 47,
        "startTime": 511.5,
        "endTime": 525.0,
        "text": "I never wish to be parted from you from this day on.",
        "translationVi": "Tôi không bao giờ muốn phải rời xa nàng kể từ ngày hôm nay trở đi nữa.",
        "ipaUs": "/aɪ ˈnɛvər wɪʃ tuː biː ˈpɑːrtɪd frəm juː frəm ðɪs deɪ ɑːn./",
        "keywords": ["never wish", "parted from you", "from this day on"],
        "explanationAi": "Lời nguyện thề gắn bó trọn đời đánh dấu cái kết viên mãn cho hành trình từ kiêu hãnh và định kiến đến tình yêu đích thực.",
        "properNouns": []
    },
    {
        "orderIndex": 48,
        "startTime": 525.0,
        "endTime": 540.0,
        "text": "Well then... Your hands are cold.",
        "translationVi": "Vậy thì... Đôi bàn tay của ngài lạnh quá.",
        "ipaUs": "/wɛl ðɛn... jʊər hændz ɑːr koʊld./",
        "keywords": ["well then", "hands are cold"],
        "explanationAi": "Cử chỉ dịu dàng tột bậc khi Elizabeth cầm lấy đôi tay lạnh buốt vì sương sớm của Darcy và hôn lên trán cùng mu bàn tay chàng.",
        "properNouns": []
    },

    # Scene 11: Dawn Climax & Mr. Bennet's Study (575.0s - 604.0s)
    {
        "orderIndex": 49,
        "startTime": 578.0,
        "endTime": 588.0,
        "text": "Shut the door, please, Elizabeth.",
        "translationVi": "Hãy đóng cửa lại, Elizabeth yêu quý của cha.",
        "ipaUs": "/ʃʌt ðə dɔːr, pliːz, ɪˈlɪzəbəθ./",
        "keywords": ["shut the door", "please Elizabeth"],
        "explanationAi": "Mr. Bennet gọi con gái cưng vào thư phòng riêng sau khi Darcy đến chính thức xin phép cha cưới cô.",
        "properNouns": ["Elizabeth"]
    },
    {
        "orderIndex": 50,
        "startTime": 588.0,
        "endTime": 604.0,
        "text": "I could not have parted with you, my dear Lizzy, to anyone less worthy.",
        "translationVi": "Cha không thể nào gả con gái cưng Lizzy của cha cho bất kỳ ai kém xứng đáng hơn ngài ấy.",
        "ipaUs": "/aɪ kʊd nɑːt hæv ˈpɑːrtɪd wɪð juː, maɪ dɪər ˈlɪzi, tuː ˈɛniwʌn lɛs ˈwɜːrði./",
        "keywords": ["parted with you", "dear Lizzy", "less worthy"],
        "explanationAi": "Lời chúc phúc xúc động đẫm lệ của người cha khi nhận ra ngài Darcy chính là tri kỷ duy nhất xứng đáng với linh hồn kiêu hãnh của Elizabeth.",
        "properNouns": ["Lizzy"]
    }
]

# Calculate token counts
for seg in segments:
    words = seg["text"].strip().split()
    seg["tokenCount"] = len(words)

output_file = "scripts/all_51_pride_and_prejudice_segments.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(segments, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(segments)} segments to {output_file}")
