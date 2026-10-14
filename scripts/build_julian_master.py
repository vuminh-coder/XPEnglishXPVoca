# -*- coding: utf-8 -*-
"""
Builder script to generate master lesson_julian_treasure.ts
Covers all 65 master segments across 598 seconds (09:58) of Julian Treasure's legendary TED talk.
"""
import re
import json

segments_data = [
    {
        "orderIndex": 0,
        "startTime": 13.96,
        "endTime": 17.63,
        "text": "The human voice: It's the instrument we all play.",
        "translationVi": "Giọng nói con người: Đó là thứ nhạc cụ mà tất cả chúng ta đều chơi.",
        "ipaUs": "/ðə ˈhjuːmən vɔɪs ɪts ði ˈɪnstrəmənt wiː ɔːl pleɪ/",
        "properNouns": [],
        "keywords": ["human voice", "instrument", "play"],
        "explanationAi": "Ẩn dụ 'instrument we all play' xem giọng nói như một nhạc cụ tinh xảo mà bất kỳ ai cũng sử dụng hàng ngày."
    },
    {
        "orderIndex": 1,
        "startTime": 18.61,
        "endTime": 23.92,
        "text": "It's the most powerful sound in the world, probably. It's the only one that can start a war or say \"I love you.\"",
        "translationVi": "Có lẽ đó là âm thanh quyền năng nhất trên thế giới. Đó là thứ duy nhất có thể khơi mào một cuộc chiến tranh hoặc cất lời 'Anh yêu em'.",
        "ipaUs": "/ɪts ðə moʊst ˈpaʊərfl saʊnd ɪn ðə wɜːrld ˈprɑːbəbli ɪts ði ˈoʊnli wʌn ðæt kæn stɑːrt ə wɔːr ɔːr seɪ aɪ lʌv juː/",
        "properNouns": [],
        "keywords": ["powerful sound", "start a war", "say I love you"],
        "explanationAi": "Sự đối lập tu từ giữa 'start a war' (khơi mào chiến tranh) và 'say I love you' nhấn mạnh biên độ cảm xúc và sức mạnh khôn lường của tiếng nói."
    },
    {
        "orderIndex": 2,
        "startTime": 23.94,
        "endTime": 29.32,
        "text": "And yet many people have the experience that when they speak, people don't listen to them. And why is that?",
        "translationVi": "Thế nhưng nhiều người lại trải qua cảm giác rằng khi họ cất tiếng, chẳng ai lắng nghe họ cả. Và tại sao lại như vậy?",
        "ipaUs": "/ænd jet ˈmeni ˈpiːpl hæv ði ɪkˈspɪriəns ðæt wen ðeɪ spiːk ˈpiːpl doʊnt ˈlɪsn tuː ðem ænd waɪ ɪz ðæt/",
        "properNouns": [],
        "keywords": ["and yet", "experience", "listen to them"],
        "explanationAi": "'And yet' là liên từ chuyển ý tương phản mạnh mẽ. Cụm 'listen to someone' chỉ sự tập trung lắng nghe và thấu hiểu."
    },
    {
        "orderIndex": 3,
        "startTime": 29.35,
        "endTime": 33.11,
        "text": "How can we speak powerfully to make change in the world?",
        "translationVi": "Làm thế nào để chúng ta có thể nói một cách đầy thuyết phục và uy lực nhằm tạo ra sự thay đổi cho thế giới?",
        "ipaUs": "/haʊ kæn wiː spiːk ˈpaʊərfəli tuː meɪk tʃeɪndʒ ɪn ðə wɜːrld/",
        "properNouns": [],
        "keywords": ["speak powerfully", "make change", "the world"],
        "explanationAi": "'Speak powerfully' diễn đạt kỹ năng nói dõng dạc, truyền cảm hứng và tác động sâu sắc đến người nghe."
    },
    {
        "orderIndex": 4,
        "startTime": 33.48,
        "endTime": 37.67,
        "text": "What I'd like to suggest, there are a number of habits that we need to move away from.",
        "translationVi": "Điều tôi muốn gợi ý là: có một số thói quen xấu mà chúng ta cần phải từ bỏ.",
        "ipaUs": "/wʌt aɪd laɪk tuː səɡˈdʒest ðer ɑːr ə ˈnʌmbər əv ˈhæbɪts ðæt wiː niːd tuː muːv əˈweɪ frʌm/",
        "properNouns": [],
        "keywords": ["suggest", "habits", "move away from"],
        "explanationAi": "'Move away from something' là cụm động từ chỉ hành động né tránh, từ bỏ hoặc tránh xa một thói quen tiêu cực."
    },
    {
        "orderIndex": 5,
        "startTime": 37.69,
        "endTime": 41.42,
        "text": "I've assembled for your pleasure here seven deadly sins of speaking.",
        "translationVi": "Tôi đã tổng hợp lại đây để các bạn cùng tham khảo: bảy thói xấu chết người trong giao tiếp.",
        "ipaUs": "/aɪv əˈsembld fɔːr jʊər ˈpleʒər hɪr ˈsevn ˈdedli sɪnz əv ˈspiːkɪŋ/",
        "properNouns": [],
        "keywords": ["assembled", "for your pleasure", "deadly sins of speaking"],
        "explanationAi": "'Seven deadly sins' mượn khái niệm 'bảy mối tội đầu' trong thần học để chỉ 7 sai lầm nghiêm trọng nhất hủy hoại khả năng giao tiếp."
    },
    {
        "orderIndex": 6,
        "startTime": 41.44,
        "endTime": 49.11,
        "text": "I'm not pretending this is an exhaustive list, but these seven, I think, are pretty large habits that we can all fall into.",
        "translationVi": "Tôi không dám nhận đây là danh sách đầy đủ toàn diện, nhưng bảy điều này, theo tôi, là những thói quen khá lớn mà tất cả chúng ta đều có thể mắc phải.",
        "ipaUs": "/aɪm nɑːt prɪˈtendɪŋ ðɪs ɪz ən ɪɡˈzɔːstɪv lɪst bʌt ðiːz ˈsevn aɪ θɪŋk ɑːr ˈprɪti lɑːrdʒ ˈhæbɪts ðæt wiː kæn ɔːl fɔːl ˈɪntuː/",
        "properNouns": [],
        "keywords": ["exhaustive list", "habits", "fall into"],
        "explanationAi": "'Exhaustive list' là danh sách thấu đáo, bao quát không bỏ sót điều gì. 'Fall into a habit' nghĩa là vô tình hình thành một thói quen xấu."
    },
    {
        "orderIndex": 7,
        "startTime": 49.13,
        "endTime": 54.10,
        "text": "First, gossip. Speaking ill of somebody who's not present.",
        "translationVi": "Thứ nhất: Ngồi lê đôi mách. Nói xấu một ai đó không có mặt tại đây.",
        "ipaUs": "/fɜːrst ˈɡɑːsɪp ˈspiːkɪŋ ɪl əv ˈsʌmbədi huːz nɑːt ˈpreznt/",
        "properNouns": [],
        "keywords": ["gossip", "speaking ill of", "not present"],
        "explanationAi": "'Speak ill of somebody' là thành ngữ chuẩn nghĩa là nói xấu, rèm pha hoặc bôi nhọ người khác sau lưng."
    },
    {
        "orderIndex": 8,
        "startTime": 54.70,
        "endTime": 60.70,
        "text": "Not a nice habit, and we know perfectly well the person gossiping, five minutes later, will be gossiping about us.",
        "translationVi": "Chẳng phải thói quen tốt đẹp gì, và chúng ta thừa biết rằng kẻ đang ngồi buôn chuyện kia, năm phút sau, sẽ lại đem chính chúng ta ra làm đề tài đàm tiếu.",
        "ipaUs": "/nɑːt ə naɪs ˈhæbɪt ænd wiː noʊ ˈpɜːrfɪktli wel ðə ˈpɜːrsn ˈɡɑːsɪpɪŋ faɪv ˈmɪnɪts ˈleɪtər wɪl biː ˈɡɑːsɪpɪŋ əˈbaʊt ʌs/",
        "properNouns": [],
        "keywords": ["know perfectly well", "person gossiping", "five minutes later"],
        "explanationAi": "'Know perfectly well' nhấn mạnh sự nhận thức rõ ràng, hiển nhiên không cần bàn cãi."
    },
    {
        "orderIndex": 9,
        "startTime": 61.77,
        "endTime": 72.00,
        "text": "Second, judging. We know people who are like this in conversation, and it's very hard to listen to somebody if you know that you're being judged and found wanting at the same time.",
        "translationVi": "Thứ hai, sự phán xét. Chúng ta đều biết những người có tính cách này trong khi trò chuyện, và thật khó để lắng nghe một ai đó nếu bạn biết rằng mình đang bị soi xét và chê bai cùng một lúc.",
        "ipaUs": "/ˈsekənd ˈdʒʌdʒɪŋ wiː noʊ ˈpiːpl huː ɑːr laɪk ðɪs ɪn ˌkɑːnvərˈseɪʃn ænd ɪts ˈveri hɑːrd tuː ˈlɪsn tuː ˈsʌmbədi ɪf juː noʊ ðæt jʊər ˈbiːɪŋ dʒʌdʒd ænd faʊnd ˈwɑːntɪŋ æt ðə seɪm taɪm/",
        "properNouns": [],
        "keywords": ["judging", "in conversation", "found wanting", "at the same time"],
        "explanationAi": "'Found wanting' là thành ngữ cổ bắt nguồn từ Kinh Thánh, nghĩa là bị đánh giá là thiếu sót, không đạt chuẩn hoặc không đủ phẩm chất."
    },
    {
        "orderIndex": 10,
        "startTime": 72.03,
        "endTime": 80.14,
        "text": "Third, negativity. You can fall into this. My mother, in the last years of her life, became very negative, and it's hard to listen.",
        "translationVi": "Thứ ba: Sự tiêu cực. Bạn rất dễ rơi vào điều này. Mẹ tôi, trong những năm tháng cuối đời, đã trở nên vô cùng tiêu cực, và thật khó để lắng nghe.",
        "ipaUs": "/θɜːrd ˌneɡəˈtɪvəti juː kæn fɔːl ˈɪntuː ðɪs maɪ ˈmʌðər ɪn ðə læst jɪrz əv hɜːr laɪf bɪˈkeɪm ˈveri ˈneɡətɪv ænd ɪts hɑːrd tuː ˈlɪsn/",
        "properNouns": [],
        "keywords": ["negativity", "fall into this", "last years of life", "negative"],
        "explanationAi": "Julian chia sẻ câu chuyện chân thực về mẹ mình để minh họa rằng năng lượng tiêu cực (negativity) tạo nên rào cản tâm lý khiến người khác ngại lắng nghe."
    },
    {
        "orderIndex": 11,
        "startTime": 80.17,
        "endTime": 89.61,
        "text": "I remember one day, I said to her, \"It's October 1 today,\" and she said, \"I know, isn't it dreadful?\" It's hard to listen when somebody's that negative.",
        "translationVi": "Tôi còn nhớ một hôm, tôi nói với bà: 'Hôm nay là mùng 1 tháng Mười rồi mẹ ạ,' và bà đáp: 'Mẹ biết chứ, chẳng phải quá tồi tệ hay sao?' Thật khó để lắng nghe khi ai đó tiêu cực đến mức ấy.",
        "ipaUs": "/aɪ rɪˈmembər wʌn deɪ aɪ sed tuː hɜːr ɪts ɑːkˈtoʊbər fɜːrst təˈdeɪ ænd ʃiː sed aɪ noʊ ˈɪznt ɪt ˈdredfl ɪts hɑːrd tuː ˈlɪsn wen ˈsʌmbədiz ðæt ˈneɡətɪv/",
        "properNouns": ["October"],
        "keywords": ["October 1", "dreadful", "hard to listen", "negative"],
        "explanationAi": "Tính từ 'dreadful' mang sắc thái khó chịu, ghê sợ hoặc tồi tệ theo lối nói điển hình của người Anh."
    },
    {
        "orderIndex": 12,
        "startTime": 90.93,
        "endTime": 98.95,
        "text": "And another form of negativity, complaining. Well, this is the national art of the U.K. It's our national sport.",
        "translationVi": "Và một dạng tiêu cực khác nữa: Than phiền. Chà, đây chính là môn nghệ thuật quốc gia của Vương quốc Anh. Đó là môn thể thao dân tộc của chúng tôi.",
        "ipaUs": "/ænd əˈnʌðər fɔːrm əv ˌneɡəˈtɪvəti kəmˈpleɪnɪŋ wel ðɪs ɪz ðə ˈnæʃnəl ɑːrt əv ðə juː keɪ ɪts ˈaʊər ˈnæʃnəl spɔːrt/",
        "properNouns": ["U.K."],
        "keywords": ["form of negativity", "complaining", "national art", "national sport"],
        "explanationAi": "Julian tự trào văn hóa Anh bằng cách ví von thói than vãn (complaining) như 'national art' hay 'national sport'."
    },
    {
        "orderIndex": 13,
        "startTime": 98.98,
        "endTime": 107.19,
        "text": "We complain about the weather, sport, about politics, about everything, but actually, complaining is viral misery. It's not spreading sunshine and lightness in the world.",
        "translationVi": "Chúng tôi ca thán về thời tiết, thể thao, chính trị, về đủ mọi thứ trên đời, nhưng thực ra thói than vãn là sự khốn khổ dễ lây lan. Nó không hề gieo rắc ánh nắng hay niềm hân hoan cho thế giới.",
        "ipaUs": "/wiː kəmˈpleɪn əˈbaʊt ðə ˈweðər spɔːrt əˈbaʊt ˈpɑːlətɪks əˈbaʊt ˈevriθɪŋ bʌt ˈæktʃuəli kəmˈpleɪnɪŋ ɪz ˈvaɪrəl ˈmɪzəri ɪts nɑːt ˈspredɪŋ ˈsʌnʃaɪn ænd ˈlaɪtnəs ɪn ðə wɜːrld/",
        "properNouns": [],
        "keywords": ["complain about", "viral misery", "spreading sunshine", "lightness"],
        "explanationAi": "Cụm 'viral misery' (nỗi đau khổ lây lan như virus) đối lập với 'spreading sunshine and lightness' (lan tỏa sự tươi sáng và nhẹ nhõm)."
    },
    {
        "orderIndex": 14,
        "startTime": 108.29,
        "endTime": 115.47,
        "text": "Excuses. We've all met this guy. Maybe we've all been this guy. Some people have a blamethrower.",
        "translationVi": "Bào chữa. Tất cả chúng ta đều từng gặp kiểu người này. Có lẽ tất cả chúng ta cũng từng là người như thế. Một số người sở hữu một 'khẩu súng phun lỗi'.",
        "ipaUs": "/ɪkˈskjuːsɪz wiːv ɔːl met ðɪs ɡaɪ ˈmeɪbi wiːv ɔːl biːn ðɪs ɡaɪ sʌm ˈpiːpl hæv ə ˈbleɪmθroʊər/",
        "properNouns": [],
        "keywords": ["excuses", "met this guy", "blamethrower"],
        "explanationAi": "'Blamethrower' là từ ghép sáng tạo hài hước (nhại theo 'flamethrower' - súng phun lửa), chỉ người luôn trút mọi tội lỗi lên đầu người khác."
    },
    {
        "orderIndex": 15,
        "startTime": 115.49,
        "endTime": 122.96,
        "text": "They just pass it on to everybody else and don't take responsibility for their actions, and again, hard to listen to somebody who is being like that.",
        "translationVi": "Họ chỉ biết đùn đẩy trách nhiệm sang mọi người xung quanh mà không chịu nhận trách nhiệm cho hành vi của mình, và một lần nữa, thật khó để lắng nghe một người như vậy.",
        "ipaUs": "/ðeɪ dʒʌst pæs ɪt ɑːn tuː ˈevribədi els ænd doʊnt teɪk rɪˌspɑːnsəˈbɪləti fɔːr ðer ˈækʃnz ænd əˈɡen hɑːrd tuː ˈlɪsn tuː ˈsʌmbədi huː ɪz ˈbiːɪŋ laɪk ðæt/",
        "properNouns": [],
        "keywords": ["pass it on", "take responsibility", "actions", "hard to listen"],
        "explanationAi": "'Pass it on' (đùn đẩy) và 'take responsibility for actions' (chịu trách nhiệm về hành động) là các diễn đạt thiết yếu về trách nhiệm cá nhân."
    },
    {
        "orderIndex": 16,
        "startTime": 122.98,
        "endTime": 130.61,
        "text": "Penultimate, the sixth of the seven, embroidery, exaggeration. It demeans our language, actually, sometimes.",
        "translationVi": "Áp chót, điều thứ sáu trong bảy tật xấu: Thêu dệt, phóng đại. Đôi khi nó thực sự làm hạ thấp và tầm thường hóa ngôn ngữ của chúng ta.",
        "ipaUs": "/pɪˈnʌltɪmət ðə sɪksθ əv ðə ˈsevn ɪmˈbrɔɪdəri ɪɡˌzædʒəˈreɪʃn ɪt dɪˈmiːnz ˈaʊər ˈlæŋɡwɪdʒ ˈæktʃuəli ˈsʌmtaɪmz/",
        "properNouns": [],
        "keywords": ["penultimate", "embroidery", "exaggeration", "demeans our language"],
        "explanationAi": "'Penultimate' nghĩa là vị trí kế chót (thứ 6/7). 'Embroidery' ẩn dụ cho việc thêu hoa dệt gấm, phóng đại sự việc quá mức."
    },
    {
        "orderIndex": 17,
        "startTime": 130.64,
        "endTime": 144.30,
        "text": "For example, if I see something that really is awesome, what do I call it? And then, of course, this exaggeration becomes lying, and we don't want to listen to people we know are lying to us.",
        "translationVi": "Chẳng hạn, nếu tôi nhìn thấy thứ gì đó thực sự tuyệt đỉnh, tôi sẽ gọi nó là gì đây? Và rồi dĩ nhiên, sự phóng đại này sẽ biến thành dối trá, và chúng ta không hề muốn lắng nghe những kẻ mà ta biết là đang lừa dối mình.",
        "ipaUs": "/fɔːr ɪɡˈzæmpl ɪf aɪ siː ˈsʌmθɪŋ ðæt ˈrɪəli ɪz ˈɔːsəm wʌt duː aɪ kɔːl ɪt ænd ðen əv kɔːrs ðɪs ɪɡˌzædʒəˈreɪʃn bɪˈkʌmz ˈlaɪɪŋ ænd wiː doʊnt wɑːnt tuː ˈlɪsn tuː ˈpiːpl wiː noʊ ɑːr ˈlaɪɪŋ tuː ʌs/",
        "properNouns": [],
        "keywords": ["really is awesome", "exaggeration", "becomes lying", "lying to us"],
        "explanationAi": "Julian phê phán việc lạm dụng những từ cảm thán như 'awesome' làm chai sạn ngôn từ, dẫn đến sự thiếu trung thực."
    },
    {
        "orderIndex": 18,
        "startTime": 144.32,
        "endTime": 154.74,
        "text": "And finally, dogmatism. The confusion of facts with opinions. When those two things get conflated, you're listening into the wind.",
        "translationVi": "Và cuối cùng: Tính giáo điều. Sự nhầm lẫn giữa sự thật khách quan và ý kiến chủ quan. Khi hai điều đó bị đánh đồng, bạn giống như đang lắng nghe vào hư không.",
        "ipaUs": "/ænd ˈfaɪnəli ˈdɔːɡmətɪzəm ðə kənˈfjuːʒn əv fækts wɪð əˈpɪnjənz wen ðoʊz tuː θɪŋz ɡet kənˈfleɪtɪd jʊər ˈlɪsnɪŋ ˈɪntuː ðə wɪnd/",
        "properNouns": [],
        "keywords": ["dogmatism", "confusion of facts", "opinions", "conflated", "listening into the wind"],
        "explanationAi": "'Conflate' có nghĩa là gộp chung hoặc đánh đồng hai khái niệm khác nhau. 'Listening into the wind' diễn tả việc lắng nghe vô nghĩa, trôi tuột."
    },
    {
        "orderIndex": 19,
        "startTime": 154.76,
        "endTime": 160.52,
        "text": "You know, somebody is bombarding you with their opinions as if they were true. It's difficult to listen to that.",
        "translationVi": "Bạn biết đấy, một người nào đó liên tục oanh tạc bạn bằng các ý kiến cá nhân cứ như thể chúng là chân lý. Rất khó chịu khi phải lắng nghe điều đó.",
        "ipaUs": "/juː noʊ ˈsʌmbədi ɪz bɑːmˈbɑːrdɪŋ juː wɪð ðer əˈpɪnjənz æz ɪf ðeɪ wɜːr truː ɪts ˈdɪfɪkəlt tuː ˈlɪsn tuː ðæt/",
        "properNouns": [],
        "keywords": ["bombarding you", "opinions", "as if they were true", "difficult to listen"],
        "explanationAi": "'Bombard someone with something' là ẩn dụ quân sự miêu tả việc dồn dập áp đặt quan điểm khiến người đối diện ngột ngạt."
    },
    {
        "orderIndex": 20,
        "startTime": 160.55,
        "endTime": 170.15,
        "text": "So here they are, seven deadly sins of speaking. These are things I think we need to avoid. But is there a positive way to think about this? Yes, there is.",
        "translationVi": "Đó chính là bảy tật xấu chết người trong giao tiếp. Đây là những điều tôi cho rằng chúng ta cần tránh. Nhưng liệu có cách tiếp cận tích cực hơn về vấn đề này không? Chắc chắn là có.",
        "ipaUs": "/soʊ hɪr ðeɪ ɑːr ˈsevn ˈdedli sɪnz əv ˈspiːkɪŋ ðiːz ɑːr θɪŋz aɪ θɪŋk wiː niːd tuː əˈvɔɪd bʌt ɪz ðer ə ˈpɑːzətɪv weɪ tuː θɪŋk əˈbaʊt ðɪs jes ðer ɪz/",
        "properNouns": [],
        "keywords": ["seven deadly sins", "need to avoid", "positive way", "yes there is"],
        "explanationAi": "Julian chuyển đổi mạch diễn thuyết từ phê phán 7 tật xấu sang xây dựng giải pháp tích cực."
    },
    {
        "orderIndex": 21,
        "startTime": 170.46,
        "endTime": 181.63,
        "text": "I'd like to suggest that there are four really powerful cornerstones, foundations, that we can stand on if we want our speech to be powerful and to make change in the world.",
        "translationVi": "Tôi muốn gợi ý rằng có bốn nền tảng, bốn trụ cột vô cùng vững chắc mà chúng ta có thể dựa vào nếu muốn lời nói của mình tràn đầy uy lực và tạo ra sự thay đổi cho thế giới.",
        "ipaUs": "/aɪd laɪk tuː səɡˈdʒest ðæt ðer ɑːr fɔːr ˈrɪəli ˈpaʊərfl ˈkɔːrnərstoʊnz faʊnˈdeɪʃnz ðæt wiː kæn stænd ɑːn ɪf wiː wɑːnt ˈaʊər spiːtʃ tuː biː ˈpaʊərfl ænd tuː meɪk tʃeɪndʒ ɪn ðə wɜːrld/",
        "properNouns": [],
        "keywords": ["cornerstones", "foundations", "stand on", "make change"],
        "explanationAi": "'Cornerstone' và 'foundation' là các ẩn dụ kiến trúc chỉ nền móng thiết yếu để xây dựng một phong cách giao tiếp thuyết phục."
    },
    {
        "orderIndex": 22,
        "startTime": 182.29,
        "endTime": 191.55,
        "text": "Fortunately, these things spell a word. The word is \"hail,\" and it has a great definition as well. I'm not talking about the stuff that falls from the sky and hits you on the head.",
        "translationVi": "Thật may mắn, bốn yếu tố này ghép lại thành một từ. Từ đó là 'hail' (hoan nghênh), và bản thân nó cũng có một định nghĩa tuyệt vời. Tôi không nói về những hạt mưa đá rơi từ trên trời xuống đầu bạn đâu nhé.",
        "ipaUs": "/ˈfɔːrtʃənətli ðiːz θɪŋz spel ə wɜːrd ðə wɜːrd ɪz heɪl ænd ɪt hæz ə ɡreɪt ˌdefɪˈnɪʃn æz wel aɪm nɑːt ˈtɔːkɪŋ əˈbaʊt ðə stʌf ðæt fɔːlz frʌm ðə skaɪ ænd hɪts juː ɑːn ðə hed/",
        "properNouns": ["HAIL"],
        "keywords": ["spell a word", "hail", "definition", "falls from the sky"],
        "explanationAi": "Julian chơi chữ thú vị giữa danh từ 'hail' (mưa đá) và động từ 'hail' (hoan nghênh, chào đón nồng nhiệt)."
    },
    {
        "orderIndex": 23,
        "startTime": 191.57,
        "endTime": 201.80,
        "text": "I'm talking about this definition, to greet or acclaim enthusiastically, which is how I think our words will be received if we stand on these four things. So what do they stand for? See if you can guess.",
        "translationVi": "Tôi đang nói về định nghĩa này: chào đón hoặc tán dương một cách nhiệt thành, đó cũng chính là cách mà lời nói của chúng ta sẽ được đón nhận nếu ta đứng vững trên bốn nền tảng này. Vậy chúng viết tắt cho điều gì? Hãy thử đoán xem nhé.",
        "ipaUs": "/aɪm ˈtɔːkɪŋ əˈbaʊt ðɪs ˌdefɪˈnɪʃn tuː ɡriːt ɔːr əˈkleɪm ɪnˌθuːziˈæstɪkli wɪtʃ ɪz haʊ aɪ θɪŋk ˈaʊər wɜːrdz wɪl biː rɪˈsiːvd ɪf wiː stænd ɑːn ðiːz fɔːr θɪŋz soʊ wʌt duː ðeɪ stænd fɔːr siː ɪf juː kæn ɡes/",
        "properNouns": [],
        "keywords": ["definition", "greet or acclaim", "enthusiastically", "stand for"],
        "explanationAi": "Cụm 'acclaim enthusiastically' giải thích tầng nghĩa tích cực của từ 'hail', biểu thị sự đón nhận nồng nhiệt từ người nghe."
    },
    {
        "orderIndex": 24,
        "startTime": 202.32,
        "endTime": 208.23,
        "text": "The H, honesty, of course, being true in what you say, being straight and clear.",
        "translationVi": "Chữ H, chính là Honesty (Sự chân thành), dĩ nhiên rồi: luôn nói đúng sự thật, thẳng thắn và rõ ràng.",
        "ipaUs": "/ðiː eɪtʃ ˈɑːnəsti əv kɔːrs ˈbiːɪŋ truː ɪn wʌt juː seɪ ˈbiːɪŋ streɪt ænd klɪr/",
        "properNouns": ["H", "Honesty"],
        "keywords": ["honesty", "being true", "straight and clear"],
        "explanationAi": "'Honesty' là chữ cái đầu tiên của mô hình HAIL, định nghĩa ngắn gọn là 'straight and clear' (ngay thẳng và sáng tỏ)."
    },
    {
        "orderIndex": 25,
        "startTime": 208.25,
        "endTime": 217.42,
        "text": "The A is authenticity, just being yourself. A friend of mine described it as standing in your own truth, which I think is a lovely way to put it.",
        "translationVi": "Chữ A là Authenticity (Tính chân thực), đơn giản là hãy là chính mình. Một người bạn của tôi đã miêu tả điều đó là 'đứng vững trong sự thật của chính bạn', một cách diễn đạt vô cùng tinh tế.",
        "ipaUs": "/ðiː eɪ ɪz ˌɔːθenˈtɪsəti dʒʌst ˈbiːɪŋ jʊərˈself ə frend əv maɪn dɪˈskraɪbd ɪt æz ˈstændɪŋ ɪn jʊər oʊn truːθ wɪtʃ aɪ θɪŋk ɪz ə ˈlʌvli weɪ tuː pʊt ɪt/",
        "properNouns": ["A", "Authenticity"],
        "keywords": ["authenticity", "being yourself", "standing in your own truth", "lovely way to put it"],
        "explanationAi": "'Standing in your own truth' là cách nói thi vị về việc sống thật và tự tin với bản ngã độc bản của chính mình."
    },
    {
        "orderIndex": 26,
        "startTime": 217.44,
        "endTime": 223.70,
        "text": "The I is integrity, being your word, actually doing what you say, and being somebody people can trust.",
        "translationVi": "Chữ I là Integrity (Sự chính trực), giữ đúng lời hứa, thực sự làm những gì bạn nói và trở thành người mà mọi người có thể tin cậy.",
        "ipaUs": "/ðiː aɪ ɪz ɪnˈteɡrəti ˈbiːɪŋ jʊər wɜːrd ˈæktʃuəli ˈduːɪŋ wʌt juː seɪ ænd ˈbiːɪŋ ˈsʌmbədi ˈpiːpl kæn trʌst/",
        "properNouns": ["I", "Integrity"],
        "keywords": ["integrity", "being your word", "doing what you say", "trust"],
        "explanationAi": "'Being your word' nghĩa là lời nói đi đôi với việc làm, phẩm chất cốt lõi của uy tín và sự chính trực."
    },
    {
        "orderIndex": 27,
        "startTime": 224.36,
        "endTime": 232.64,
        "text": "And the L is love. I don't mean romantic love, but I do mean wishing people well, for two reasons.",
        "translationVi": "Và chữ L là Love (Lòng trắc ẩn). Tôi không ám chỉ tình yêu đôi lứa lãng mạn, mà là thực tâm mong cầu điều tốt lành cho mọi người, vì hai lý do.",
        "ipaUs": "/ænd ðiː el ɪz lʌv aɪ doʊnt miːn roʊˈmæntɪk lʌv bʌt aɪ duː miːn ˈwɪʃɪŋ ˈpiːpl wel fɔːr tuː ˈriːznz/",
        "properNouns": ["L", "Love"],
        "keywords": ["love", "romantic love", "wishing people well", "two reasons"],
        "explanationAi": "Julian định nghĩa 'Love' trong giao tiếp là thiện ý hướng thiện (wishing people well) thay vì tình cảm lãng mạn thông thường."
    },
    {
        "orderIndex": 28,
        "startTime": 232.66,
        "endTime": 242.00,
        "text": "First of all, I think absolute honesty may not be what we want. I mean, my goodness, you look ugly this morning. Perhaps that's not necessary.",
        "translationVi": "Trước hết, tôi nghĩ sự thành thật tuyệt đối có lẽ không phải là điều chúng ta mong muốn. Ý tôi là: 'Trời đất ơi, sáng nay trông bạn xấu xí thế.' Có lẽ điều đó là không cần thiết.",
        "ipaUs": "/fɜːrst əv ɔːl aɪ θɪŋk ˈæbsəluːt ˈɑːnəsti meɪ nɑːt biː wʌt wiː wɑːnt aɪ miːn maɪ ˈɡʊdnəs juː lʊk ˈʌɡli ðɪs ˈmɔːrnɪŋ pərˈhæps ðæts nɑːt ˈnesəseri/",
        "properNouns": [],
        "keywords": ["absolute honesty", "my goodness", "look ugly", "not necessary"],
        "explanationAi": "Ví dụ hóm hỉnh 'my goodness, you look ugly this morning' cho thấy sự thật thà trần trụi nếu thiếu vắng lòng trắc ẩn sẽ trở thành sự tàn nhẫn."
    },
    {
        "orderIndex": 29,
        "startTime": 242.02,
        "endTime": 254.67,
        "text": "Tempered with love, of course, honesty is a great thing. But also, if you're really wishing somebody well, it's very hard to judge them at the same time. I'm not even sure you can do those two things simultaneously.",
        "translationVi": "Khi được dung hòa với lòng trắc ẩn, lòng chân thành là một điều tuyệt vời. Nhưng hơn thế, nếu bạn thực tâm cầu chúc điều tốt lành cho ai đó, bạn rất khó lòng phán xét họ cùng một lúc. Tôi thậm chí không tin bạn có thể làm đồng thời hai việc đó.",
        "ipaUs": "/ˈtempərd wɪð lʌv əv kɔːrs ˈɑːnəsti ɪz ə ɡreɪt θɪŋ bʌt ˈɔːlsoʊ ɪf jʊər ˈrɪəli ˈwɪʃɪŋ ˈsʌmbədi wel ɪts ˈveri hɑːrd tuː dʒʌdʒ ðem æt ðə seɪm taɪm aɪm nɑːt ˈiːvn ʃʊr juː kæn duː ðoʊz tuː θɪŋz ˌsaɪmlˈteɪniəsli/",
        "properNouns": [],
        "keywords": ["tempered with love", "honesty", "judge them", "simultaneously"],
        "explanationAi": "'Tempered with' nghĩa là được tiết chế hoặc dung hòa. Trạng từ 'simultaneously' nhấn mạnh tính bất khả thi khi vừa muốn điều tốt đẹp lại vừa phán xét ai đó."
    },
    {
        "orderIndex": 30,
        "startTime": 255.31,
        "endTime": 262.61,
        "text": "So hail. Also, now that's what you say, and it's like the old song, it is what you say, it's also the way that you say it.",
        "translationVi": "Đó là mô hình HAIL. Ngoài ra, đó mới chỉ là nội dung bạn nói; và như câu hát xưa: quan trọng là điều bạn nói, nhưng cũng cốt ở cách bạn nói ra điều đó.",
        "ipaUs": "/soʊ heɪl ˈɔːlsoʊ naʊ ðæts wʌt juː seɪ ænd ɪts laɪk ði oʊld sɔːŋ ɪt ɪz wʌt juː seɪ ɪts ˈɔːlsoʊ ðə weɪ ðæt juː seɪ ɪt/",
        "properNouns": ["HAIL"],
        "keywords": ["hail", "what you say", "old song", "the way that you say it"],
        "explanationAi": "Julian chuyển chủ đề từ nội dung thông điệp (what you say) sang hình thức và kỹ thuật truyền tải âm thanh (how you say it)."
    },
    {
        "orderIndex": 31,
        "startTime": 262.64,
        "endTime": 269.79,
        "text": "You have an amazing toolbox. This instrument is incredible, and yet this is a toolbox that very few people have ever opened.",
        "translationVi": "Bạn đang sở hữu một hộp dụng cụ đáng kinh ngạc. Loại nhạc cụ này quả là phi thường, vậy mà đây lại là chiếc hộp dụng cụ mà hiếm ai từng mở ra.",
        "ipaUs": "/juː hæv ən əˈmeɪzɪŋ ˈtuːlbɑːks ðɪs ˈɪnstrəmənt ɪz ɪnˈkredəbl ænd jet ðɪs ɪz ə ˈtuːlbɑːks ðæt ˈveri fjuː ˈpiːpl hæv ˈevər ˈoʊpənd/",
        "properNouns": [],
        "keywords": ["amazing toolbox", "instrument", "incredible", "ever opened"],
        "explanationAi": "'Toolbox' là hình ảnh ẩn dụ cho tập hợp các kỹ thuật điều khiển giọng nói (register, timbre, prosody, pace, pitch, volume)."
    },
    {
        "orderIndex": 32,
        "startTime": 269.81,
        "endTime": 278.42,
        "text": "I'd like to have a little rummage in there with you now and just pull a few tools out that you might like to take away and play with, which will increase the power of your speaking.",
        "translationVi": "Bây giờ tôi muốn cùng các bạn lục lọi một chút vào trong chiếc hộp đó, và lôi ra vài món công cụ mà các bạn có thể mang về trải nghiệm, giúp gia tăng uy lực cho giọng nói của mình.",
        "ipaUs": "/aɪd laɪk tuː hæv ə ˈlɪtl ˈrʌmɪdʒ ɪn ðer wɪð juː naʊ ænd dʒʌst pʊl ə fjuː tuːlz aʊt ðæt juː maɪt laɪk tuː teɪk əˈweɪ ænd pleɪ wɪð wɪtʃ wɪl ɪnˈkriːs ðə ˈpaʊər əv jʊər ˈspiːkɪŋ/",
        "properNouns": [],
        "keywords": ["rummage", "pull a few tools out", "play with", "increase the power"],
        "explanationAi": "'Have a little rummage' là cụm từ rất đặc trưng của tiếng Anh-Anh, nghĩa là lục tìm, xới tìm đồ vật trong một không gian chứa."
    },
    {
        "orderIndex": 33,
        "startTime": 278.44,
        "endTime": 286.21,
        "text": "Register, for example. Now, falsetto register may not be very useful most of the time, but there's a register in between.",
        "translationVi": "Chẳng hạn như Âm vực (Register). Âm vực giả thanh (falsetto) có thể không hữu ích lắm trong hầu hết các trường hợp, nhưng vẫn có khoảng âm vực ở giữa.",
        "ipaUs": "/ˈredʒɪstər fɔːr ɪɡˈzæmpl naʊ fɔːlˈsetoʊ ˈredʒɪstər meɪ nɑːt biː ˈveri ˈjuːsfl moʊst əv ðə taɪm bʌt ðerz ə ˈredʒɪstər ɪn bɪˈtwiːn/",
        "properNouns": [],
        "keywords": ["register", "falsetto register", "useful", "in between"],
        "explanationAi": "'Register' trong thanh nhạc và ngữ âm học chỉ âm vực hoặc quãng giọng. 'Falsetto' là giọng gió, giọng giả thanh ở nốt cao."
    },
    {
        "orderIndex": 34,
        "startTime": 286.23,
        "endTime": 291.92,
        "text": "I'm not going to get very technical about this for any of you who are voice coaches. You can locate your voice, however.",
        "translationVi": "Tôi sẽ không đi quá sâu vào khía cạnh học thuật cho những ai ở đây là huấn luyện viên thanh nhạc. Tuy nhiên, bạn hoàn toàn có thể định vị giọng nói của mình.",
        "ipaUs": "/aɪm nɑːt ˈɡoʊɪŋ tuː ɡet ˈveri ˈteknɪkl əˈbaʊt ðɪs fɔːr ˈeni əv juː huː ɑːr vɔɪs ˈkoʊtʃɪz juː kæn loʊˈkeɪt jʊər vɔɪs haʊˈevər/",
        "properNouns": [],
        "keywords": ["technical", "voice coaches", "locate your voice"],
        "explanationAi": "'Voice coach' là chuyên gia huấn luyện phát âm và ngữ điệu. 'Locate your voice' nghĩa là nhận biết vị trí đặt âm thanh trong cơ thể."
    },
    {
        "orderIndex": 35,
        "startTime": 291.94,
        "endTime": 298.96,
        "text": "So if I talk up here in my nose, you can hear the difference. If I go down here in my throat, which is where most of us speak from most of the time.",
        "translationVi": "Nếu tôi phát âm tít trên mũi thế này, các bạn có thể nghe thấy sự khác biệt. Hoặc nếu tôi hạ xuống dưới cổ họng, nơi mà hầu hết chúng ta đều phát ra âm thanh phần lớn thời gian.",
        "ipaUs": "/soʊ ɪf aɪ tɔːk ʌp hɪr ɪn maɪ noʊz juː kæn hɪr ðə ˈdɪfrəns ɪf aɪ ɡoʊ daʊn hɪr ɪn maɪ θroʊt wɪtʃ ɪz wer moʊst əv ʌs spiːk frʌm moʊst əv ðə taɪm/",
        "properNouns": [],
        "keywords": ["in my nose", "hear the difference", "in my throat", "speak from"],
        "explanationAi": "Julian trực quan hóa các vị trí cộng hưởng âm thanh: giọng mũi (nasal voice) và giọng họng (throat voice)."
    },
    {
        "orderIndex": 36,
        "startTime": 298.99,
        "endTime": 304.71,
        "text": "But if you want weight, you need to go down here to the chest. You hear the difference?",
        "translationVi": "Nhưng nếu bạn muốn giọng nói có sức nặng và uy lực, bạn cần phải hạ sâu xuống tận lồng ngực. Các bạn có nghe thấy sự khác biệt không?",
        "ipaUs": "/bʌt ɪf juː wɑːnt weɪt juː niːd tuː ɡoʊ daʊn hɪr tuː ðə tʃest juː hɪr ðə ˈdɪfrəns/",
        "properNouns": [],
        "keywords": ["want weight", "down to the chest", "hear the difference"],
        "explanationAi": "'Chest voice' (giọng ngực) mang lại độ trầm ấm, quyền uy và 'weight' (sức nặng tâm lý) trong nghệ thuật hùng biện."
    },
    {
        "orderIndex": 37,
        "startTime": 304.73,
        "endTime": 315.81,
        "text": "We vote for politicians with lower voices, it's true, because we associate depth with power and with authority. That's register.",
        "translationVi": "Chúng ta thường bỏ phiếu cho các chính trị gia sở hữu giọng trầm hơn, đó là sự thật, bởi chúng ta thường vô thức liên kết độ trầm sâu với quyền lực và thẩm quyền. Đó chính là âm vực.",
        "ipaUs": "/wiː voʊt fɔːr ˌpɑːləˈtɪʃnz wɪð ˈloʊər ˈvɔɪsɪz ɪts truː bɪˈkəz wiː əˈsoʊʃieɪt depθ wɪð ˈpaʊər ænd wɪð əˈθɔːrəti ðæts ˈredʒɪstər/",
        "properNouns": [],
        "keywords": ["politicians", "lower voices", "associate depth with power", "authority", "register"],
        "explanationAi": "Khái niệm tâm lý học xã hội: con người có xu hướng liên hệ tần số trầm sâu với năng lực lãnh đạo và tính thẩm quyền ('depth with power and authority')."
    },
    {
        "orderIndex": 38,
        "startTime": 316.13,
        "endTime": 325.91,
        "text": "Then we have timbre. It's the way your voice feels. Again, the research shows that we prefer voices which are rich, smooth, warm, like hot chocolate.",
        "translationVi": "Tiếp theo là Âm sắc (Timbre). Đó là cảm giác mà giọng nói của bạn mang lại. Một lần nữa, nghiên cứu chỉ ra rằng chúng ta chuộng những chất giọng trầm ấm, mượt mà và nồng nàn như một ly sô-cô-la nóng.",
        "ipaUs": "/ðen wiː hæv ˈtæmbər ɪts ðə weɪ jʊər vɔɪs fiːlz əˈɡen ðə rɪˈsɜːrtʃ ʃoʊz ðæt wiː prɪˈfɜːr ˈvɔɪsɪz wɪtʃ ɑːr rɪtʃ smuːð wɔːrm laɪk hɑːt ˈtʃɔːklət/",
        "properNouns": [],
        "keywords": ["timbre", "way your voice feels", "rich smooth warm", "hot chocolate"],
        "explanationAi": "'Timbre' (âm sắc, màu giọng) được ví von sinh động như 'hot chocolate' (đậm đà, êm dịu, ngọt ngào)."
    },
    {
        "orderIndex": 39,
        "startTime": 326.63,
        "endTime": 332.58,
        "text": "Well if that's not you, that's not the end of the world, because you can train. Go and get a voice coach.",
        "translationVi": "Nếu đó không phải là chất giọng tự nhiên của bạn thì cũng chẳng phải tận thế đâu, vì bạn hoàn toàn có thể rèn luyện được. Hãy tìm cho mình một chuyên gia thanh nhạc.",
        "ipaUs": "/wel ɪf ðæts nɑːt juː ðæts nɑːt ði end əv ðə wɜːrld bɪˈkəz juː kæn treɪn ɡoʊ ænd ɡet ə vɔɪs koʊtʃ/",
        "properNouns": [],
        "keywords": ["not the end of the world", "can train", "voice coach"],
        "explanationAi": "'Not the end of the world' là thành ngữ phổ biến mang hàm ý trấn an rằng mọi việc hoàn toàn có thể khắc phục được."
    },
    {
        "orderIndex": 40,
        "startTime": 332.61,
        "endTime": 339.41,
        "text": "And there are amazing things you can do with breathing, with posture, and with exercises to improve the timbre of your voice.",
        "translationVi": "Có những điều tuyệt vời mà bạn có thể làm thông qua hơi thở, tư thế và các bài tập luyện để cải thiện âm sắc của giọng nói.",
        "ipaUs": "/ænd ðer ɑːr əˈmeɪzɪŋ θɪŋz juː kæn duː wɪð ˈbriːðɪŋ wɪð ˈpɑːstʃər ænd wɪð ˈeksərsaɪzɪz tuː ɪmˈpruːv ðə ˈtæmbər əv jʊər vɔɪs/",
        "properNouns": [],
        "keywords": ["breathing", "posture", "exercises", "improve timbre"],
        "explanationAi": "Ba trụ cột vật lý điều chỉnh âm sắc: 'breathing' (kiểm soát hơi thở), 'posture' (tư thế đứng mở rộng lồng ngực), và 'exercises' (các bài tập giãn cơ quan phát âm)."
    },
    {
        "orderIndex": 41,
        "startTime": 339.44,
        "endTime": 348.29,
        "text": "Then prosody. I love prosody. This is the sing-song, the meta-language that we use in order to impart meaning. It's root one for meaning in conversation.",
        "translationVi": "Kế tiếp là Ngữ điệu (Prosody). Tôi cực kỳ yêu thích ngữ điệu. Đây chính là giai điệu trầm bổng, thứ siêu ngôn ngữ chúng ta sử dụng để truyền tải ý nghĩa. Đó là cội nguồn số một của ý nghĩa trong giao tiếp.",
        "ipaUs": "/ðen ˈprɑːsədi aɪ lʌv ˈprɑːsədi ðɪs ɪz ðə sɪŋ sɔːŋ ðə ˈmetə ˈlæŋɡwɪdʒ ðæt wiː juːz ɪn ˈɔːrdər tuː ɪmˈpɑːrt ˈmiːnɪŋ ɪts ruːt wʌn fɔːr ˈmiːnɪŋ ɪn ˌkɑːnvərˈseɪʃn/",
        "properNouns": [],
        "keywords": ["prosody", "sing-song", "meta-language", "impart meaning", "root one"],
        "explanationAi": "'Prosody' (ngữ điệu, tiết tấu lời nói) đóng vai trò 'meta-language' (siêu ngôn ngữ) giúp người nghe nắm bắt thái độ và cảm xúc ngầm ẩn."
    },
    {
        "orderIndex": 42,
        "startTime": 348.31,
        "endTime": 359.52,
        "text": "People who speak all on one note are really quite hard to listen to if they don't have any prosody at all. That's where the word \"monotonic\" comes from, or monotonous, monotone.",
        "translationVi": "Những người nói chuyện với cùng một tông giọng đều đều thực sự rất khó nghe nếu họ hoàn toàn không có ngữ điệu. Đó chính là nguồn gốc của từ 'đơn điệu' (monotonic), hay buồn tẻ, đều đều.",
        "ipaUs": "/ˈpiːpl huː spiːk ɔːl ɑːn wʌn noʊt ɑːr ˈrɪəli kwaɪt hɑːrd tuː ˈlɪsn tuː ɪf ðeɪ doʊnt hæv ˈeni ˈprɑːsədi æt ɔːl ðæts wer ðə wɜːrd ˌmɑːnəˈtɑːnɪk kʌmz frʌm ɔːr məˈnɑːtənəs ˈmɑːnətoʊn/",
        "properNouns": [],
        "keywords": ["on one note", "monotonic", "monotonous", "monotone"],
        "explanationAi": "Gốc từ Hy Lạp 'monotone' (mono = một, tone = tông giọng) giải thích trạng thái nói đều đều ru ngủ người nghe."
    },
    {
        "orderIndex": 43,
        "startTime": 360.31,
        "endTime": 368.80,
        "text": "Also, we have repetitive prosody now coming in, where every sentence ends as if it were a question when it's actually not a question, it's a statement?",
        "translationVi": "Bên cạnh đó, hiện nay chúng ta còn gặp kiểu ngữ điệu lặp đi lặp lại, khi mà mọi câu nói đều lên giọng ở cuối như thể đó là một câu hỏi dù thực chất nó là một câu trần thuật?",
        "ipaUs": "/ˈɔːlsoʊ wiː hæv rɪˈpetətɪv ˈprɑːsədi naʊ ˈkʌmɪŋ ɪn wer ˈevri ˈsentəns endz æz ɪf ɪt wɜːr ə ˈkwestʃən wen ɪts ˈæktʃuəli nɑːt ə ˈkwestʃən ɪts ə ˈsteɪtmənt/",
        "properNouns": [],
        "keywords": ["repetitive prosody", "ends as if a question", "not a question", "statement"],
        "explanationAi": "Hiện tượng ngôn ngữ học 'upspeak' hoặc 'high rising terminal' (lên giọng cuối câu trần thuật) làm giảm sự quyết đoán và uy lực của thông điệp."
    },
    {
        "orderIndex": 44,
        "startTime": 371.15,
        "endTime": 379.98,
        "text": "And if you repeat that one, it's actually restricting your ability to communicate through prosody, which I think is a shame, so let's try and break that habit.",
        "translationVi": "Và nếu bạn lặp đi lặp lại tật xấu đó, nó thực sự bóp nghẹt khả năng biểu đạt cảm xúc qua ngữ điệu của bạn, một điều rất đáng tiếc, nên hãy cố gắng từ bỏ thói quen đó nhé.",
        "ipaUs": "/ænd ɪf juː rɪˈpiːt ðæt wʌn ɪts ˈæktʃuəli rɪˈstrɪktɪŋ jʊər əˈbɪləti tuː kəˈmjuːnɪkeɪt θruː ˈprɑːsədi wɪtʃ aɪ θɪŋk ɪz ə ʃeɪm soʊ lets traɪ ænd breɪk ðæt ˈhæbɪt/",
        "properNouns": [],
        "keywords": ["restricting", "ability to communicate", "break that habit"],
        "explanationAi": "'Break a habit' là cụm động từ chuẩn chỉ việc chấm dứt hoặc thay đổi một thói quen xấu đã ăn sâu vào tiềm thức."
    },
    {
        "orderIndex": 45,
        "startTime": 381.31,
        "endTime": 392.19,
        "text": "Pace. I can get very excited by saying something really quickly, or I can slow right down to emphasize, and at the end of that, of course, is our old friend silence.",
        "translationVi": "Tốc độ (Pace). Tôi có thể trở nên vô cùng hào hứng khi nói một điều gì đó thật nhanh, hoặc tôi có thể nói thật chậm rãi để nhấn mạnh, và ở tận cùng của điều đó, tất nhiên, là người bạn cũ của chúng ta: Sự im lặng.",
        "ipaUs": "/peɪs aɪ kæn ɡet ˈveri ɪkˈsaɪtɪd baɪ ˈseɪɪŋ ˈsʌmθɪŋ ˈrɪəli ˈkwɪkli ɔːr aɪ kæn sloʊ raɪt daʊn tuː ˈemfəsaɪz ænd æt ði end əv ðæt əv kɔːrs ɪz ˈaʊər oʊld frend ˈsaɪləns/",
        "properNouns": [],
        "keywords": ["pace", "excited", "slow down to emphasize", "silence"],
        "explanationAi": "Sự biến hóa về 'pace' (tốc độ nói) và 'silence' (khoảng lặng nghệ thuật) là công cụ kịch tính hàng đầu để thu hút sự chú ý của thính giả."
    },
    {
        "orderIndex": 46,
        "startTime": 394.56,
        "endTime": 403.06,
        "text": "There's nothing wrong with a bit of silence in a talk, is there? We don't have to fill it with ums and ahs. It can be very powerful.",
        "translationVi": "Chẳng có gì sai khi tạo ra một chút khoảng lặng trong bài nói cả, đúng không nào? Chúng ta không nhất thiết phải lấp đầy nó bằng những tiếng ừ, à ngắc ngứ. Khoảng lặng có thể mang lại sức mạnh to lớn.",
        "ipaUs": "/ðerz ˈnʌθɪŋ rɔːŋ wɪð ə bɪt əv ˈsaɪləns ɪn ə tɔːk ɪz ðer wiː doʊnt hæv tuː fɪl ɪt wɪð ʌmz ænd ɑːz ɪt kæn biː ˈveri ˈpaʊərfl/",
        "properNouns": [],
        "keywords": ["nothing wrong with", "silence in a talk", "ums and ahs", "very powerful"],
        "explanationAi": "'Ums and ahs' (từ đệm ngắc ngứ) là thói quen xấu khi người nói sợ sự im lặng; Julian khuyên hãy tự tin biến im lặng thành khoảng dừng quyền lực (pregnant pause)."
    },
    {
        "orderIndex": 47,
        "startTime": 403.82,
        "endTime": 416.13,
        "text": "Of course, pitch often goes along with pace to indicate arousal, but you can do it just with pitch. Where did you leave my keys? Where did you leave my keys? So, slightly different meaning in those two deliveries.",
        "translationVi": "Tất nhiên, cao độ thường đi liền với tốc độ để thể hiện sự phấn khích, nhưng bạn cũng có thể điều chỉnh chỉ bằng cao độ. 'Cậu để chìa khóa của tôi ở đâu?' 'CẬU để chìa khóa của tôi ở đâu?!' Hai cách truyền tải mang lại sắc thái ý nghĩa hoàn toàn khác nhau.",
        "ipaUs": "/əv kɔːrs pɪtʃ ˈɔːfn ɡoʊz əˈlɔːŋ wɪð peɪs tuː ˈɪndɪkeɪt əˈraʊzl bʌt juː kæn duː ɪt dʒʌst wɪð pɪtʃ wer dɪd juː liːv maɪ kiːz wer dɪd juː liːv maɪ kiːz soʊ ˈslaɪtli ˈdɪfrənt ˈmiːnɪŋ ɪn ðoʊz tuː dɪˈlɪvəriz/",
        "properNouns": [],
        "keywords": ["pitch", "goes along with pace", "different meaning", "deliveries"],
        "explanationAi": "'Delivery' trong nghệ thuật diễn thuyết là phong cách thể hiện và phát âm thông điệp trước công chúng."
    },
    {
        "orderIndex": 48,
        "startTime": 416.16,
        "endTime": 427.50,
        "text": "And finally, volume. I can get really excited by using volume. Sorry about that, if I startled anybody. Or, I can have you really pay attention by getting very quiet.",
        "translationVi": "Và cuối cùng: Âm lượng (Volume). Tôi có thể trở nên cực kỳ cuồng nhiệt bằng cách tăng âm lượng. Xin lỗi nhé, nếu tôi vừa làm ai đó giật mình. Hoặc, tôi có thể khiến các bạn phải thực sự dỏng tai chú ý bằng cách nói thật khẽ.",
        "ipaUs": "/ænd ˈfaɪnəli ˈvɑːljuːm aɪ kæn ɡet ˈrɪəli ɪkˈsaɪtɪd baɪ ˈjuːzɪŋ ˈvɑːljuːm ˈsɑːri əˈbaʊt ðæt ɪf aɪ ˈstɑːrtld ˈenibədi ɔːr aɪ kæn hæv juː ˈrɪəli peɪ əˈtenʃn baɪ ˈɡetɪŋ ˈveri ˈkwaɪət/",
        "properNouns": [],
        "keywords": ["volume", "startled", "pay attention", "getting very quiet"],
        "explanationAi": "'Startle someone' là làm ai đó giật thót mình. Việc chuyển đột ngột sang âm lượng nhỏ ('getting very quiet') buộc thính giả phải tập trung lắng nghe tuyệt đối."
    },
    {
        "orderIndex": 49,
        "startTime": 428.71,
        "endTime": 441.09,
        "text": "Some people broadcast the whole time. Try not to do that. That's called sodcasting, imposing your sound on people around you carelessly and inconsiderately. Not nice.",
        "translationVi": "Một số người nói oang oang suốt cả buổi. Hãy cố gắng đừng làm như thế. Điều đó được gọi là 'sodcasting' — hành vi áp đặt âm thanh của mình lên những người xung quanh một cách cẩu thả và thiếu tế nhị. Thật chẳng hay ho gì.",
        "ipaUs": "/sʌm ˈpiːpl ˈbrɔːdkæst ðə hoʊl taɪm traɪ nɑːt tuː duː ðæt ðæts kɔːld ˈsɑːdkæstɪŋ ɪmˈpoʊzɪŋ jʊər saʊnd ɑːn ˈpiːpl əˈraʊnd juː ˈkerləsli ænd ˌɪnkənˈsɪdərətli nɑːt naɪs/",
        "properNouns": [],
        "keywords": ["broadcast", "sodcasting", "imposing your sound", "inconsiderately"],
        "explanationAi": "'Sodcasting' là tiếng lóng của người Anh chỉ hành vi bật nhạc hoặc nói quá to ở nơi công cộng gây phiền hà cho người khác."
    },
    {
        "orderIndex": 50,
        "startTime": 441.12,
        "endTime": 454.67,
        "text": "Of course, where this all comes into play most of all is when you've got something really important to do. It might be standing on a stage like this and giving a talk to people. It might be proposing marriage, asking for a raise, a wedding speech.",
        "translationVi": "Dĩ nhiên, tất cả những điều này sẽ phát huy tác dụng rõ rệt nhất khi bạn có một việc hệ trọng cần thực hiện. Đó có thể là khi đứng trên sân khấu như thế này để diễn thuyết, khi cầu hôn, xin tăng lương, hay phát biểu trong đám cưới.",
        "ipaUs": "/əv kɔːrs wer ðɪs ɔːl kʌmz ˈɪntuː pleɪ moʊst əv ɔːl ɪz wen juːv ɡɑːt ˈsʌmθɪŋ ˈrɪəli ɪmˈpɔːrtnt tuː duː ɪt maɪt biː ˈstændɪŋ ɑːn ə steɪdʒ laɪk ðɪs ænd ˈɡɪvɪŋ ə tɔːk tuː ˈpiːpl ɪt maɪt biː prəˈpoʊzɪŋ ˈmærɪdʒ ˈæskɪŋ fɔːr ə reɪz ə ˈwedɪŋ spiːtʃ/",
        "properNouns": [],
        "keywords": ["comes into play", "proposing marriage", "asking for a raise", "wedding speech"],
        "explanationAi": "Thành ngữ 'come into play' nghĩa là bắt đầu phát huy tác dụng hoặc có ảnh hưởng quan trọng trong hoàn cảnh thực tế."
    },
    {
        "orderIndex": 51,
        "startTime": 454.69,
        "endTime": 467.07,
        "text": "Whatever it is, if it's really important, you owe it to yourself to look at this toolbox and the engine that it's going to work on, and no engine works well without being warmed up. Warm up your voice.",
        "translationVi": "Dù là việc gì đi chăng nữa, nếu nó thực sự hệ trọng, bạn nợ bản thân việc nhìn lại hộp công cụ này và cỗ máy mà nó vận hành; và chẳng có cỗ máy nào hoạt động trơn tru mà không được khởi động. Hãy khởi động giọng nói của bạn.",
        "ipaUs": "/wʌtˈevər ɪt ɪz ɪf ɪts ˈrɪəli ɪmˈpɔːrtnt juː oʊ ɪt tuː jʊərˈself tuː lʊk æt ðɪs ˈtuːlbɑːks ænd ði ˈendʒɪn ðæt ɪts ˈɡoʊɪŋ tuː wɜːrk ɑːn ænd noʊ ˈendʒɪn wɜːrks wel wɪˈðaʊt ˈbiːɪŋ wɔːrmd ʌp wɔːrm ʌp jʊər vɔɪs/",
        "properNouns": [],
        "keywords": ["owe it to yourself", "toolbox", "engine", "warm up your voice"],
        "explanationAi": "'You owe it to yourself' là lời khuyên mạnh mẽ: bạn có bổn phận với chính bản thân mình phải chuẩn bị kỹ càng."
    },
    {
        "orderIndex": 52,
        "startTime": 467.48,
        "endTime": 481.83,
        "text": "Actually, let me show you how to do that. Would you all like to stand up for a moment? I'm going to show you the six vocal warm-up exercises that I do before every talk I ever do. Any time you're going to talk to anybody important, do these.",
        "translationVi": "Thực ra, để tôi chỉ cho bạn cách làm điều đó. Mọi người có thể đứng dậy một chút được không? Tôi sẽ chỉ cho bạn 6 bài tập khởi động giọng nói mà tôi luôn thực hiện trước bất kỳ bài diễn thuyết nào. Bất cứ khi nào bạn chuẩn bị nói chuyện với một ai đó quan trọng, hãy làm những bài tập này.",
        "ipaUs": "/ˈæktʃuəli let miː ʃoʊ juː haʊ tuː duː ðæt wʊd juː ɔːl laɪk tuː stænd ʌp fɔːr ə ˈmoʊmənt aɪm ˈɡoʊɪŋ tuː ʃoʊ juː ðə sɪks ˈvoʊkl wɔːrm ʌp ˈeksərsaɪzɪz ðæt aɪ duː bɪˈfɔːr ˈevri tɔːk aɪ ˈevər duː ˈeni taɪm jʊər ˈɡoʊɪŋ tuː tɔːk tuː ˈenibədi ɪmˈpɔːrtnt duː ðiːz/",
        "properNouns": [],
        "keywords": ["stand up", "six vocal warm-up exercises", "before every talk", "important"],
        "explanationAi": "Khởi động thanh quản ('vocal warm-up') giải phóng căng thẳng ở cơ hoành, cổ và môi trước khi phát biểu trước công chúng."
    },
    {
        "orderIndex": 53,
        "startTime": 481.86,
        "endTime": 492.37,
        "text": "First, arms up, deep breath in, and sigh out, ahhhhh, like that. One more time: ahhhh, very good.",
        "translationVi": "Đầu tiên: giơ hai tay lên cao, hít một hơi thật sâu, và thở hắt ra: 'Aaaaa,' như thế này nhé. Một lần nữa nào: 'Aaaaa,' rất tốt.",
        "ipaUs": "/fɜːrst ɑːrmz ʌp diːp breθ ɪn ænd saɪ aʊt ɑː laɪk ðæt wʌn mɔːr taɪm ɑː ˈveri ɡʊd/",
        "properNouns": [],
        "keywords": ["arms up", "deep breath in", "sigh out", "one more time"],
        "explanationAi": "Bài tập thở cơ hoành (deep diaphragmatic breathing) kết hợp tiếng thở dài để giải tỏa áp lực lồng ngực."
    },
    {
        "orderIndex": 54,
        "startTime": 492.39,
        "endTime": 499.41,
        "text": "Now we're going to warm up our lips, and we're going to go Ba, Ba, Ba, Ba, Ba, Ba, Ba, Ba. Very good.",
        "translationVi": "Bây giờ chúng ta sẽ khởi động cho đôi môi, và chúng ta sẽ phát âm: 'Ba, Ba, Ba, Ba, Ba, Ba, Ba, Ba.' Rất tuyệt vời.",
        "ipaUs": "/naʊ wɪr ˈɡoʊɪŋ tuː wɔːrm ʌp ˈaʊər lɪps ænd wɪr ˈɡoʊɪŋ tuː ɡoʊ bɑː bɑː bɑː bɑː bɑː bɑː bɑː bɑː ˈveri ɡʊd/",
        "properNouns": [],
        "keywords": ["warm up our lips", "Ba Ba Ba Ba", "very good"],
        "explanationAi": "Âm đôi môi bật hơi /b/ kích hoạt tuần hoàn máu và sự dẻo dai của cơ môi trước khi phát âm."
    },
    {
        "orderIndex": 55,
        "startTime": 499.44,
        "endTime": 506.83,
        "text": "And now, brrrrrrrrrr, just like when you were a kid. Brrrr. Now your lips should be coming alive.",
        "translationVi": "Và bây giờ: 'Brrrrrrrrrr,' giống hệt như hồi các bạn còn bé vậy. 'Brrrr.' Giờ thì đôi môi của bạn đã bắt đầu tràn đầy sức sống rồi đấy.",
        "ipaUs": "/ænd naʊ br̩ː dʒʌst laɪk wen juː wɜːr ə kɪd br̩ː naʊ jʊər lɪps ʃʊd biː ˈkʌmɪŋ əˈlaɪv/",
        "properNouns": [],
        "keywords": ["lip trill", "when you were a kid", "lips coming alive"],
        "explanationAi": "Kỹ thuật rung môi ('lip trill' hay 'lip roll') là bài tập thư giãn cơ miệng kinh điển của các ca sĩ và diễn giả chuyên nghiệp."
    },
    {
        "orderIndex": 56,
        "startTime": 506.85,
        "endTime": 515.04,
        "text": "We're going to do the tongue next with exaggerated la, la, la, la, la, la, la, la, la. Beautiful. You're getting really good at this.",
        "translationVi": "Tiếp theo chúng ta sẽ khởi động lưỡi với âm 'la, la, la, la, la, la, la, la, la' thật dứt khoát và cường điệu. Tuyệt đẹp. Các bạn đang làm rất cừ đấy.",
        "ipaUs": "/wɪr ˈɡoʊɪŋ tuː duː ðə tʌŋ nekst wɪð ɪɡˈzædʒəreɪtɪd lɑː lɑː lɑː lɑː lɑː lɑː lɑː lɑː lɑː ˈbjuːtɪfl jʊər ˈɡetɪŋ ˈrɪəli ɡʊd æt ðɪs/",
        "properNouns": [],
        "keywords": ["the tongue", "exaggerated", "la la la", "getting really good"],
        "explanationAi": "Âm /l/ đánh vào đầu vòm họng giúp giải phóng đầu lưỡi để phát âm chuẩn xác từng phụ âm."
    },
    {
        "orderIndex": 57,
        "startTime": 515.07,
        "endTime": 520.15,
        "text": "And then, roll an R: Rrrrrrr. That's like champagne for the tongue.",
        "translationVi": "Và sau đó là rung đầu lưỡi với âm R: 'Rrrrrrr.' Nó giống như một ly sâm-panh sảng khoái dành riêng cho chiếc lưỡi vậy.",
        "ipaUs": "/ænd ðen roʊl ən ɑːr r̩ː ðæts laɪk ʃæmˈpeɪn fɔːr ðə tʌŋ/",
        "properNouns": ["R"],
        "keywords": ["roll an R", "champagne for the tongue"],
        "explanationAi": "Cách ví von 'champagne for the tongue' miêu tả cảm giác tê rần sảng khoái khi thực hiện kỹ thuật cuộn lưỡi rung âm R."
    },
    {
        "orderIndex": 58,
        "startTime": 520.17,
        "endTime": 528.56,
        "text": "Finally, and if I can only do one, the pros call this the siren. It's really good. It starts with \"we\" and goes to \"aw.\" The \"we\" is high, the \"aw\" is low.",
        "translationVi": "Cuối cùng, và nếu tôi chỉ được chọn làm một bài duy nhất, giới chuyên nghiệp gọi đây là 'tiếng còi báo động'. Nó cực kỳ hiệu quả: bắt đầu bằng âm 'we' và lượn xuống âm 'aw'. Âm 'we' ở nốt cao, còn 'aw' ở nốt trầm.",
        "ipaUs": "/ˈfaɪnəli ænd ɪf aɪ kæn ˈoʊnli duː wʌn ðə proʊz kɔːl ðɪs ðə ˈsaɪrən ɪts ˈrɪəli ɡʊd ɪt stɑːrts wɪð wiː ænd ɡoʊz tuː ɔː ðə wiː ɪz haɪ ði ɔː ɪz loʊ/",
        "properNouns": [],
        "keywords": ["the pros", "the siren", "we and aw", "high and low"],
        "explanationAi": "'Vocal siren' là kỹ thuật trượt âm mượt mà giữa các quãng giọng từ cao xuống thấp để mở rộng âm vực."
    },
    {
        "orderIndex": 59,
        "startTime": 528.59,
        "endTime": 538.21,
        "text": "So you go, weeeaawww, weeeaawww. Fantastic. Give yourselves a round of applause. Take a seat, thank you.",
        "translationVi": "Thế nên bạn sẽ tạo âm: 'Weeeaawww, weeeaawww.' Tuyệt vời lắm. Hãy tự thưởng cho mình một tràng pháo tay nào. Xin mời các bạn ngồi xuống, cảm ơn mọi người.",
        "ipaUs": "/soʊ juː ɡoʊ wiːˈɔː wiːˈɔː fænˈtæstɪk ɡɪv jʊərˈselvz ə raʊnd əv əˈplɔːz teɪk ə siːt θæŋk juː/",
        "properNouns": [],
        "keywords": ["weeeaawww", "fantastic", "round of applause", "take a seat"],
        "explanationAi": "'Give someone a round of applause' là thành ngữ kinh điển mời khán giả vỗ tay tán thưởng."
    },
    {
        "orderIndex": 60,
        "startTime": 539.71,
        "endTime": 549.08,
        "text": "Next time you speak, do those in advance. Now let me just put this in context to close. This is a serious point here. This is where we are now, right?",
        "translationVi": "Lần tới khi chuẩn bị phát biểu, hãy tập những bài đó từ trước nhé. Giờ hãy để tôi đặt điều này vào bối cảnh chung để khép lại bài nói. Đây là một điểm hết sức nghiêm túc. Đây chính là thực trạng của chúng ta hiện nay, phải không nào?",
        "ipaUs": "/nekst taɪm juː spiːk duː ðoʊz ɪn ədˈvæns naʊ let miː dʒʌst pʊt ðɪs ɪn ˈkɑːntekst tuː kloʊz ðɪs ɪz ə ˈsɪriəs pɔɪnt hɪr ðɪs ɪz wer wiː ɑːr naʊ raɪt/",
        "properNouns": [],
        "keywords": ["in advance", "put this in context", "serious point", "where we are now"],
        "explanationAi": "'Put something in context' nghĩa là đặt một vấn đề vào bức tranh tổng thể sâu rộng hơn để nhìn nhận đúng giá trị."
    },
    {
        "orderIndex": 61,
        "startTime": 549.10,
        "endTime": 558.77,
        "text": "We speak not very well to people who simply aren't listening in an environment that's all about noise and bad acoustics. I have talked about that on this stage in different phases.",
        "translationVi": "Chúng ta nói không hay cho những người vốn chẳng thèm lắng nghe trong một môi trường đầy rẫy tiếng ồn và âm học tồi tệ. Tôi đã từng chia sẻ về điều đó trên sân khấu này trong các bài diễn thuyết trước.",
        "ipaUs": "/wiː spiːk nɑːt ˈveri wel tuː ˈpiːpl huː ˈsɪmpli ɑːrnt ˈlɪsnɪŋ ɪn ən ɪnˈvaɪrənmənt ðæts ɔːl əˈbaʊt nɔɪz ænd bæd əˈkuːstɪks aɪ hæv tɔːkt əˈbaʊt ðæt ɑːn ðɪs steɪdʒ ɪn ˈdɪfrənt ˈfeɪzɪz/",
        "properNouns": [],
        "keywords": ["speak not very well", "not listening", "noise", "bad acoustics"],
        "explanationAi": "Julian Treasure là chuyên gia âm học nổi tiếng; ông nêu bật nghịch lý hiện đại: tiếng ồn (noise) và phòng ốc kém âm học (bad acoustics) làm hao tổn sự chú ý."
    },
    {
        "orderIndex": 62,
        "startTime": 558.80,
        "endTime": 567.58,
        "text": "What would the world be like if we were speaking powerfully to people who were listening consciously in environments which were actually fit for purpose?",
        "translationVi": "Thế giới này sẽ ra sao nếu chúng ta biết cất tiếng nói một cách đầy uy lực cho những người đang chủ động lắng nghe trong những môi trường thực sự phù hợp với mục đích giao tiếp?",
        "ipaUs": "/wʌt wʊd ðə wɜːrld biː laɪk ɪf wiː wɜːr ˈspiːkɪŋ ˈpaʊərfəli tuː ˈpiːpl huː wɜːr ˈlɪsnɪŋ ˈkɑːnʃəsli ɪn ɪnˈvaɪrənmənts wɪtʃ wɜːr ˈæktʃuəli fɪt fɔːr ˈpɜːrpəs/",
        "properNouns": [],
        "keywords": ["speaking powerfully", "listening consciously", "environments", "fit for purpose"],
        "explanationAi": "Cụm 'fit for purpose' mang nghĩa hoàn toàn phù hợp và đáp ứng xuất sắc công năng thiết kế. 'Listening consciously' là lắng nghe bằng toàn bộ tâm trí."
    },
    {
        "orderIndex": 63,
        "startTime": 567.60,
        "endTime": 579.52,
        "text": "Or to make that a bit larger, what would the world be like if we were creating sound consciously and consuming sound consciously and designing all our environments consciously for sound?",
        "translationVi": "Hoặc nhìn rộng ra hơn một chút: thế giới này sẽ ra sao nếu chúng ta chủ động tạo ra âm thanh một cách có ý thức, cảm thụ âm thanh một cách có ý thức và thiết kế mọi môi trường sống xung quanh ta một cách có ý thức vì âm thanh?",
        "ipaUs": "/ɔːr tuː meɪk ðæt ə bɪt ˈlɑːrdʒər wʌt wʊd ðə wɜːrld biː laɪk ɪf wiː wɜːr kriˈeɪtɪŋ saʊnd ˈkɑːnʃəsli ænd kənˈsuːmɪŋ saʊnd ˈkɑːnʃəsli ænd dɪˈzaɪnɪŋ ɔːl ˈaʊər ɪnˈvaɪrənmənts ˈkɑːnʃəsli fɔːr saʊnd/",
        "properNouns": [],
        "keywords": ["make that a bit larger", "creating sound consciously", "consuming sound", "designing environments"],
        "explanationAi": "Cấu trúc điệp từ 'consciously' nhấn mạnh tầm quan trọng của chánh niệm và sự tỉnh thức trong việc kiến tạo thế giới âm thanh."
    },
    {
        "orderIndex": 64,
        "startTime": 579.55,
        "endTime": 590.39,
        "text": "That would be a world that does sound beautiful, and one where understanding would be the norm, and that is an idea worth spreading. Thank you.",
        "translationVi": "Đó sẽ là một thế giới ngập tràn thanh âm tuyệt mỹ, nơi mà sự thấu hiểu trở thành chuẩn mực tự nhiên; và đó chính là một ý tưởng xứng đáng được lan tỏa. Xin chân thành cảm ơn.",
        "ipaUs": "/ðæt wʊd biː ə wɜːrld ðæt dʌz saʊnd ˈbjuːtɪfl ænd wʌn wer ˌʌndərˈstændɪŋ wʊd biː ðə nɔːrm ænd ðæt ɪz ən aɪˈdɪə wɜːrθ ˈspredɪŋ θæŋk juː/",
        "properNouns": [],
        "keywords": ["sound beautiful", "understanding would be the norm", "idea worth spreading", "thank you"],
        "explanationAi": "Julian kết thúc bằng khẩu hiệu kinh điển của TED: 'an idea worth spreading' (ý tưởng đáng lan tỏa), nâng tầm nghệ thuật nói lên mức độ kiến tạo văn minh nhân loại."
    }
]

# Compute exact tokenCount for every segment
for seg in segments_data:
    seg["tokenCount"] = len(re.findall(r'\b[A-Za-z0-9_]+\b', seg["text"]))

# Construct 8 CEFR B2 Quiz Questions
quiz_questions = [
    {
        "id": "q_vid_julian_treasure_speak_1",
        "question": "According to Julian Treasure, what metaphor does he use to describe the human voice?",
        "questionEn": "According to Julian Treasure, what metaphor does he use to describe the human voice?",
        "questionVi": "Theo Julian Treasure, ông sử dụng phép ẩn dụ nào để miêu tả giọng nói của con người?",
        "options": [
            "The instrument that we all play",
            "A digital signal transmitter",
            "A fragile biological echo",
            "An uncontrollable emotional reaction"
        ],
        "optionsEn": [
            "The instrument that we all play",
            "A digital signal transmitter",
            "A fragile biological echo",
            "An uncontrollable emotional reaction"
        ],
        "optionsVi": [
            "Một loại nhạc cụ mà tất cả chúng ta đều chơi",
            "Một bộ phát tín hiệu kỹ thuật số",
            "Một tiếng vọng sinh học mong manh",
            "Một phản ứng cảm xúc không thể kiểm soát"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segment 0, Julian Treasure opens with: "The human voice: It\'s the instrument we all play. It\'s the most powerful sound in the world, probably."',
        "explanationEn": 'In Segment 0, Julian Treasure opens with: "The human voice: It\'s the instrument we all play. It\'s the most powerful sound in the world, probably."',
        "explanationVi": 'Trong câu 0, Julian Treasure mở đầu: "Giọng nói con người: Đó là thứ nhạc cụ mà tất cả chúng ta đều chơi. Có lẽ đó là âm thanh quyền năng nhất trên thế giới."',
        "referenceSegmentIndex": 0,
        "targetedConcept": "Ẩn dụ nhạc cụ của giọng nói (The Instrument We All Play Metaphor)",
        "targetedConceptEn": "The Instrument We All Play Metaphor",
        "targetedConceptVi": "Ẩn dụ nhạc cụ của giọng nói"
    },
    {
        "id": "q_vid_julian_treasure_speak_2",
        "question": "What is identified as the first of the seven deadly sins of speaking, and why does Julian condemn it?",
        "questionEn": "What is identified as the first of the seven deadly sins of speaking, and why does Julian condemn it?",
        "questionVi": "Điều gì được xác định là thói xấu đầu tiên trong bảy tật xấu chết người khi giao tiếp, và tại sao Julian lại lên án nó?",
        "options": [
            "Gossip — speaking ill of someone not present, knowing they will gossip about us later",
            "Exaggeration — magnifying facts until they turn into complete legal perjury",
            "Dogmatism — assuming listeners already possess advanced scientific credentials",
            "Monotone delivery — inducing sleep in public lecture halls"
        ],
        "optionsEn": [
            "Gossip — speaking ill of someone not present, knowing they will gossip about us later",
            "Exaggeration — magnifying facts until they turn into complete legal perjury",
            "Dogmatism — assuming listeners already possess advanced scientific credentials",
            "Monotone delivery — inducing sleep in public lecture halls"
        ],
        "optionsVi": [
            "Ngồi lê đôi mách (Gossip) — nói xấu người vắng mặt, và thừa biết kẻ đó lát sau cũng sẽ nói xấu mình",
            "Phóng đại — thêu dệt sự thật cho đến khi trở thành tội khai man trước pháp luật",
            "Giáo điều — mặc định người nghe đã sở hữu học hàm khoa học tiên tiến",
            "Nói giọng đều đều — ru ngủ khán giả trong các giảng đường công cộng"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segments 7 & 8, Julian defines gossip as: "Speaking ill of somebody who\'s not present... and we know perfectly well the person gossiping, five minutes later, will be gossiping about us."',
        "explanationEn": 'In Segments 7 & 8, Julian defines gossip as: "Speaking ill of somebody who\'s not present... and we know perfectly well the person gossiping, five minutes later, will be gossiping about us."',
        "explanationVi": 'Trong câu 7 & 8, Julian định nghĩa thói ngồi lê đôi mách: "Nói xấu một ai đó không có mặt tại đây... và chúng ta thừa biết kẻ đang buôn chuyện kia, năm phút sau, sẽ lại đem chính chúng ta ra làm đề tài đàm tiếu."',
        "referenceSegmentIndex": 7,
        "targetedConcept": "Thói xấu thứ nhất: Ngồi lê đôi mách (Deadly Sin #1: Gossip)",
        "targetedConceptEn": "Deadly Sin #1: Gossip",
        "targetedConceptVi": "Thói xấu thứ nhất: Ngồi lê đôi mách"
    },
    {
        "id": "q_vid_julian_treasure_speak_3",
        "question": "What metaphor does Julian Treasure coin in Segment 14 to describe people who make chronic excuses?",
        "questionEn": "What metaphor does Julian Treasure coin in Segment 14 to describe people who make chronic excuses?",
        "questionVi": "Julian Treasure sáng tạo phép ẩn dụ nào trong câu 14 để mô tả những người có thói quen liên tục bào chữa?",
        "options": [
            "A blamethrower — passing faults onto others without taking responsibility",
            "An echo chamber — constantly repeating obsolete political slogans",
            "A sonic wall — blocking incoming counterarguments with pure volume",
            "A revolving turnstile — allowing superficial acquaintances to pass through"
        ],
        "optionsEn": [
            "A blamethrower — passing faults onto others without taking responsibility",
            "An echo chamber — constantly repeating obsolete political slogans",
            "A sonic wall — blocking incoming counterarguments with pure volume",
            "A revolving turnstile — allowing superficial acquaintances to pass through"
        ],
        "optionsVi": [
            "Khẩu súng phun lỗi (Blamethrower) — đùn đẩy lỗi lầm sang người khác mà không nhận trách nhiệm",
            "Phòng tiếng vang — liên tục lặp lại các khẩu hiệu chính trị lỗi thời",
            "Bức tường âm thanh — chặn đứng các phản biện bằng âm lượng thuần túy",
            "Cửa xoay tự động — để những người quen xã giao hời hợt đi qua"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segments 14 & 15, Julian states: "Some people have a blamethrower. They just pass it on to everybody else and don\'t take responsibility for their actions."',
        "explanationEn": 'In Segments 14 & 15, Julian states: "Some people have a blamethrower. They just pass it on to everybody else and don\'t take responsibility for their actions."',
        "explanationVi": 'Trong câu 14 & 15, Julian nói: "Một số người sở hữu một khẩu súng phun lỗi. Họ chỉ biết đùn đẩy trách nhiệm sang mọi người xung quanh mà không chịu nhận trách nhiệm cho hành vi của mình."',
        "referenceSegmentIndex": 14,
        "targetedConcept": "Căn bệnh bao biện & Khẩu súng phun lỗi (The Blamethrower Metaphor)",
        "targetedConceptEn": "The Blamethrower Metaphor",
        "targetedConceptVi": "Căn bệnh bao biện & Khẩu súng phun lỗi"
    },
    {
        "id": "q_vid_julian_treasure_speak_4",
        "question": "What four foundational cornerstones form the acronym HAIL according to Julian Treasure?",
        "questionEn": "What four foundational cornerstones form the acronym HAIL according to Julian Treasure?",
        "questionVi": "Bốn nền tảng trụ cột nào tạo nên từ viết tắt HAIL theo chia sẻ của Julian Treasure?",
        "options": [
            "Honesty, Authenticity, Integrity, and Love",
            "Harmony, Articulation, Intellect, and Logic",
            "Humility, Audacity, Inspiration, and Leadership",
            "Honor, Authority, Insight, and Loyalty"
        ],
        "optionsEn": [
            "Honesty, Authenticity, Integrity, and Love",
            "Harmony, Articulation, Intellect, and Logic",
            "Humility, Audacity, Inspiration, and Leadership",
            "Honor, Authority, Insight, and Loyalty"
        ],
        "optionsVi": [
            "Honesty (Chân thành), Authenticity (Chân thực), Integrity (Chính trực), và Love (Lòng trắc ẩn)",
            "Harmony (Hòa hợp), Articulation (Rõ ràng), Intellect (Trí tuệ), và Logic (Lập luận)",
            "Humility (Khiêm nhường), Audacity (Táo bạo), Inspiration (Truyền cảm hứng), và Leadership (Lãnh đạo)",
            "Honor (Danh dự), Authority (Thẩm quyền), Insight (Thấu suốt), và Loyalty (Trung thành)"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segments 24 to 27, Julian spells out HAIL: Honesty (being true, straight and clear), Authenticity (just being yourself), Integrity (being your word), and Love (wishing people well).',
        "explanationEn": 'In Segments 24 to 27, Julian spells out HAIL: Honesty (being true, straight and clear), Authenticity (just being yourself), Integrity (being your word), and Love (wishing people well).',
        "explanationVi": 'Trong các câu 24 đến 27, Julian giải nghĩa mô hình HAIL: Honesty (nói thật, thẳng thắn), Authenticity (là chính mình), Integrity (giữ lời hứa), và Love (thiện ý mong điều tốt lành cho mọi người).',
        "referenceSegmentIndex": 22,
        "targetedConcept": "Bốn trụ cột HAIL trong nghệ thuật giao tiếp (The Four Cornerstones: HAIL)",
        "targetedConceptEn": "The Four Cornerstones: HAIL",
        "targetedConceptVi": "Bốn trụ cột HAIL trong nghệ thuật giao tiếp"
    },
    {
        "id": "q_vid_julian_treasure_speak_5",
        "question": "Why do people tend to vote for politicians with lower voices, according to research cited by Julian?",
        "questionEn": "Why do people tend to vote for politicians with lower voices, according to research cited by Julian?",
        "questionVi": "Tại sao mọi người có xu hướng bỏ phiếu cho các chính trị gia có giọng trầm hơn, theo nghiên cứu được Julian trích dẫn?",
        "options": [
            "Because we subconsciously associate vocal depth with power and authority",
            "Because higher-pitched voices damage parliamentary audio broadcasting equipment",
            "Because low frequencies travel farther across open agricultural rallies",
            "Because speech coaches charge lower hourly fees to train baritone speakers"
        ],
        "optionsEn": [
            "Because we subconsciously associate vocal depth with power and authority",
            "Because higher-pitched voices damage parliamentary audio broadcasting equipment",
            "Because low frequencies travel farther across open agricultural rallies",
            "Because speech coaches charge lower hourly fees to train baritone speakers"
        ],
        "optionsVi": [
            "Bởi vì chúng ta vô thức liên kết độ trầm sâu của giọng nói với quyền lực và thẩm quyền",
            "Vì giọng nói the thé làm hỏng thiết bị truyền thanh trong nghị viện",
            "Vì tần số thấp truyền đi xa hơn trong các cuộc vận động cử tri ngoài trời",
            "Vì các chuyên gia giọng nói lấy học phí rẻ hơn đối với người có giọng trầm"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segment 37, Julian explains: "We vote for politicians with lower voices, it\'s true, because we associate depth with power and with authority. That\'s register."',
        "explanationEn": 'In Segment 37, Julian explains: "We vote for politicians with lower voices, it\'s true, because we associate depth with power and with authority. That\'s register."',
        "explanationVi": 'Trong câu 37, Julian giải thích: "Chúng ta thường bỏ phiếu cho các chính trị gia sở hữu giọng trầm hơn, đó là sự thật, bởi chúng ta thường vô thức liên kết độ trầm sâu với quyền lực và thẩm quyền. Đó chính là âm vực."',
        "referenceSegmentIndex": 37,
        "targetedConcept": "Tâm lý học âm vực và sự tín nhiệm (Register and Perceived Authority)",
        "targetedConceptEn": "Register and Perceived Authority",
        "targetedConceptVi": "Tâm lý học âm vực và sự tín nhiệm"
    },
    {
        "id": "q_vid_julian_treasure_speak_6",
        "question": "What sensory comparison does Julian use to describe the optimal timbre of a speaking voice?",
        "questionEn": "What sensory comparison does Julian use to describe the optimal timbre of a speaking voice?",
        "questionVi": "Julian sử dụng phép so sánh cảm giác nào để miêu tả âm sắc lý tưởng của một giọng nói?",
        "options": [
            "Voices which are rich, smooth, and warm, like hot chocolate",
            "Crisp and sharp like freshly sliced green apples",
            "Clear and metallic like a polished silver trumpet",
            "Brisk and energetic like sparkling mineral water"
        ],
        "optionsEn": [
            "Voices which are rich, smooth, and warm, like hot chocolate",
            "Crisp and sharp like freshly sliced green apples",
            "Clear and metallic like a polished silver trumpet",
            "Brisk and energetic like sparkling mineral water"
        ],
        "optionsVi": [
            "Những chất giọng trầm ấm, mượt mà và nồng nàn như một ly sô-cô-la nóng",
            "Thanh giòn và sắc sảo như những lát táo xanh mới cắt",
            "Trong trẻo và mang âm vang kim loại như chiếc kèn trumpet bạc",
            "Nhanh nhẹn và tràn trề năng lượng như nước khoáng có ga"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segment 38, Julian notes: "Again, the research shows that we prefer voices which are rich, smooth, warm, like hot chocolate."',
        "explanationEn": 'In Segment 38, Julian notes: "Again, the research shows that we prefer voices which are rich, smooth, warm, like hot chocolate."',
        "explanationVi": 'Trong câu 38, Julian ghi nhận: "Một lần nữa, nghiên cứu chỉ ra rằng chúng ta chuộng những chất giọng trầm ấm, mượt mà và nồng nàn như một ly sô-cô-la nóng."',
        "referenceSegmentIndex": 38,
        "targetedConcept": "Âm sắc ấm áp và khả năng rèn luyện (Timbre and Voice Coaching)",
        "targetedConceptEn": "Timbre and Voice Coaching",
        "targetedConceptVi": "Âm sắc ấm áp và khả năng rèn luyện"
    },
    {
        "id": "q_vid_julian_treasure_speak_7",
        "question": "What modern vocal habit regarding prosody does Julian criticize as restricting communicative power?",
        "questionEn": "What modern vocal habit regarding prosody does Julian criticize as restricting communicative power?",
        "questionVi": "Thói quen phát âm hiện đại nào liên quan đến ngữ điệu bị Julian chỉ trích vì làm thui chột uy lực giao tiếp?",
        "options": [
            "Ending every sentence as if it were a question when it is actually a statement (upspeak)",
            "Whispering secrets during confidential corporate board meetings",
            "Speaking in iambic pentameter during casual dinner conversations",
            "Pausing for longer than five seconds before uttering any adjective"
        ],
        "optionsEn": [
            "Ending every sentence as if it were a question when it is actually a statement (upspeak)",
            "Whispering secrets during confidential corporate board meetings",
            "Speaking in iambic pentameter during casual dinner conversations",
            "Pausing for longer than five seconds before uttering any adjective"
        ],
        "optionsVi": [
            "Lên giọng ở cuối mỗi câu như thể đang hỏi dù thực chất đó là câu trần thuật (tật upspeak)",
            "Nói thì thầm những bí mật trong các cuộc họp hội đồng quản trị doanh nghiệp",
            "Nói theo thể thơ năm chữ iambic trong các bữa tối trò chuyện thân mật",
            "Ngập ngừng dừng lại hơn 5 giây trước khi thốt ra bất kỳ tính từ nào"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segments 43 & 44, Julian describes repetitive prosody: "where every sentence ends as if it were a question when it\'s actually not a question, it\'s a statement? ... it\'s actually restricting your ability to communicate through prosody."',
        "explanationEn": 'In Segments 43 & 44, Julian describes repetitive prosody: "where every sentence ends as if it were a question when it\'s actually not a question, it\'s a statement? ... it\'s actually restricting your ability to communicate through prosody."',
        "explanationVi": 'Trong các câu 43 & 44, Julian mô tả tật ngữ điệu lặp lại: "mọi câu nói đều lên giọng ở cuối như thể đó là một câu hỏi dù thực chất nó là một câu trần thuật?... nó thực sự bóp nghẹt khả năng biểu đạt cảm xúc qua ngữ điệu của bạn."',
        "referenceSegmentIndex": 43,
        "targetedConcept": "Ngữ điệu, tính đơn điệu và tật lên giọng cuối câu (Prosody, Monotonic Speech & Upspeak)",
        "targetedConceptEn": "Prosody, Monotonic Speech & Upspeak",
        "targetedConceptVi": "Ngữ điệu, tính đơn điệu và tật lên giọng cuối câu"
    },
    {
        "id": "q_vid_julian_treasure_speak_8",
        "question": "In his visionary conclusion, what does Julian envision if humanity speaks and listens consciously?",
        "questionEn": "In his visionary conclusion, what does Julian envision if humanity speaks and listens consciously?",
        "questionVi": "Trong phần kết đầy tầm nhìn của mình, Julian mộng ước điều gì nếu nhân loại biết nói và lắng nghe một cách có ý thức?",
        "options": [
            "A world that sounds beautiful, and one where understanding would be the norm",
            "A world where all musical instruments are superseded by voice synthesizers",
            "A society where silence is legally enforced in public urban transit networks",
            "An international agreement banning all conversational complaints in workplaces"
        ],
        "optionsEn": [
            "A world that sounds beautiful, and one where understanding would be the norm",
            "A world where all musical instruments are superseded by voice synthesizers",
            "A society where silence is legally enforced in public urban transit networks",
            "An international agreement banning all conversational complaints in workplaces"
        ],
        "optionsVi": [
            "Một thế giới ngập tràn thanh âm tuyệt mỹ, nơi mà sự thấu hiểu trở thành chuẩn mực tự nhiên",
            "Một thế giới nơi mọi nhạc cụ đều bị thay thế bởi máy tổng hợp âm thanh",
            "Một xã hội nơi sự im lặng được thực thi nghiêm ngặt theo luật pháp trên phương tiện công cộng",
            "Một hiệp định quốc tế cấm triệt để việc than phiền trong môi trường làm việc"
        ],
        "correctAnswer": 0,
        "explanation": 'In Segment 64, Julian concludes: "That would be a world that does sound beautiful, and one where understanding would be the norm, and that is an idea worth spreading."',
        "explanationEn": 'In Segment 64, Julian concludes: "That would be a world that does sound beautiful, and one where understanding would be the norm, and that is an idea worth spreading."',
        "explanationVi": 'Trong câu 64, Julian đúc kết: "Đó sẽ là một thế giới ngập tràn thanh âm tuyệt mỹ, nơi mà sự thấu hiểu trở thành chuẩn mực tự nhiên; và đó chính là một ý tưởng xứng đáng được lan tỏa."',
        "referenceSegmentIndex": 64,
        "targetedConcept": "Tầm nhìn về thế giới của sự thấu hiểu (Conscious Sound & Universal Understanding)",
        "targetedConceptEn": "Conscious Sound & Universal Understanding",
        "targetedConceptVi": "Tầm nhìn về thế giới của sự thấu hiểu"
    }
]

file_content = f'''import {{ MockVideoLesson, VideoQuizData }} from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for Julian Treasure
 * 8 CEFR B2 Questions covering the entire 09:58 master lecture:
 * The 7 Deadly Sins of Speaking, The HAIL Framework, The Vocal Toolbox, Vocal Warm-ups, and Conscious Sound.
 */
export const QUIZ_JULIAN_TREASURE: VideoQuizData = {{
  lessonId: "vid_julian_treasure_speak",
  lessonTitle: "Julian Treasure: How to Speak So That People Want to Listen",
  totalQuestions: 8,
  xpReward: 40,
  questions: {json.dumps(quiz_questions, ensure_ascii=False, indent=4)},
  generatedBy: "CONTEXTUAL_FALLBACK",
}};

/**
 * Julian Treasure: How to speak so that people want to listen
 * Slug: julian-treasure-how-to-speak-so-people-listen
 * YouTube ID: eIho2S0ZahI (51,652,770 views)
 * Category: cat_ted_ed (TED-Ed & Tư Duy Sâu)
 * 100% Calibrated Verbatim from Official TED YouTube Subtitles
 * Full Master Coverage: 65 Segments across all 09:58 (598 seconds)
 */
export const LESSON_JULIAN_TREASURE: MockVideoLesson = {{
  id: "vid_julian_treasure_speak",
  slug: "julian-treasure-how-to-speak-so-people-listen",
  title: "Julian Treasure: How to Speak So That People Want to Listen",
  description: "Chuyên gia âm thanh Julian Treasure giải mã nghệ thuật truyền tải thông điệp quyền năng: nhận diện 7 tật xấu chết người trong giao tiếp (gossip, judging, negativity, complaining, excuses, exaggeration, dogmatism), mô hình 4 trụ cột HAIL, bộ công cụ âm thanh (register, timbre, prosody, pace, pitch, volume) và bài tập khởi động giọng nói chuyên nghiệp trong bài diễn thuyết TED kinh điển hơn 51 triệu lượt xem.",
  sourceType: "YOUTUBE",
  externalId: "eIho2S0ZahI",
  thumbnailUrl: "https://img.youtube.com/vi/eIho2S0ZahI/hqdefault.jpg",
  durationSeconds: 598,
  durationFormatted: "09:58",
  cefrLevel: "B2",
  supportedTypes: "BOTH",
  categoryId: "cat_ted_ed",
  categorySlug: "ted-ed",
  categoryName: "TED-Ed & Tư Duy Sâu",
  accent: "en-GB",
  wpmSpeed: 148,
  viewCount: 51652770,
  studyCount: 184500,
  quiz: QUIZ_JULIAN_TREASURE,
  segments: {json.dumps(segments_data, ensure_ascii=False, indent=4)},
}};
'''

# Write to file
target_path = "features/listening/data/lessons/lesson_julian_treasure.ts"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(file_content)

print(f"Successfully generated {target_path} with {len(segments_data)} segments and {len(quiz_questions)} quiz questions!")
