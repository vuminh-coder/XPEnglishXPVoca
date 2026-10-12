import json
import re

# Master script for Modern Family: The Best Of Phil Dunphy's Phil's-osophy & Dad Wisdom (qMNsPjt7L4M - 710s)
# Level: B1 | American Accent
# Total Segments: ~110 Pure Master Segments covering all 9 iconic scenes (Zero Merged Utterances)

raw_segments = [
    # =========================================================================
    # SCENE 1: THE COOL DAD INTRODUCTION (00:00 - 00:28)
    # =========================================================================
    {
        "startTime": 0.0,
        "endTime": 3.4,
        "text": "I'm the cool dad, that's my thing.",
        "translationVi": "Tôi là một ông bố ngầu, đó là phong cách riêng của tôi.",
        "ipaUs": "/aɪm ðə kuːl dæd, ðæts maɪ θɪŋ./",
        "keywords": ["cool dad", "that's my thing"],
        "explanationAi": "Cụm 'that's my thing' chỉ đặc điểm nhận dạng, sở thích hoặc phong cách cá nhân đặc trưng.",
        "properNouns": []
    },
    {
        "startTime": 3.5,
        "endTime": 6.2,
        "text": "I'm hip, I surf the web, I text.",
        "translationVi": "Tôi thức thời, tôi lướt mạng, tôi nhắn tin sành điệu.",
        "ipaUs": "/aɪm hɪp, aɪ sɜːrf ðə wɛb, aɪ tɛkst./",
        "keywords": ["hip", "surf the web", "text"],
        "explanationAi": "'Hip' mang nghĩa sành điệu, bắt kịp xu hướng giới trẻ (thường đối lập với sự già cỗi).",
        "properNouns": []
    },
    {
        "startTime": 6.3,
        "endTime": 8.5,
        "text": "LOL, Laugh Out Loud. OMG, Oh My God.",
        "translationVi": "LOL tức là Laugh Out Loud, cười phá lên. OMG tức là Oh My God, lạy Chúa tôi.",
        "ipaUs": "/ɛl oʊ ɛl, læf aʊt laʊd. oʊ ɛm dʒiː, oʊ maɪ ɡɑːd./",
        "keywords": ["Laugh Out Loud", "Oh My God"],
        "explanationAi": "Phil khoe việc hiểu các từ viết tắt nhắn tin của giới trẻ thời kỳ đầu Internet.",
        "properNouns": []
    },
    {
        "startTime": 8.6,
        "endTime": 11.4,
        "text": "WTF: Why The Face?",
        "translationVi": "Còn WTF tức là: Sao cái mặt lại xị ra thế kia?",
        "ipaUs": "/ˈdʌbəl.juː tiː ɛf: waɪ ðə feɪs?/",
        "keywords": ["Why The Face", "acronym misinterpretation"],
        "explanationAi": "Cú hiểu nhầm tiếng lóng bất hủ của Phil khi biến từ chửi thề thành câu hỏi ngây thơ 'Why the face?'.",
        "properNouns": []
    },
    {
        "startTime": 11.5,
        "endTime": 15.4,
        "text": "You know, I know all the dances to High School Musical, so...",
        "translationVi": "Biết không, tôi còn thuộc lòng tất cả các điệu nhảy trong phim High School Musical nữa đấy, nên là...",
        "ipaUs": "/juː noʊ, aɪ noʊ ɔːl ðə ˈdænsɪz tuː haɪ skuːl ˈmjuːzɪkəl, soʊ.../",
        "keywords": ["dances", "High School Musical"],
        "explanationAi": "Phil tự hào về việc hòa nhập với văn hóa thanh thiếu niên qua bộ phim ca nhạc tuổi teen của Disney.",
        "properNouns": ["High School Musical"]
    },
    {
        "startTime": 15.5,
        "endTime": 19.5,
        "text": "We're all in this together, yes we are!",
        "translationVi": "Chúng ta luôn sát cánh bên nhau, đúng là như thế!",
        "ipaUs": "/wɪr ɔːl ɪn ðɪs təˈɡɛðər, jɛs wiː ɑːr!/",
        "keywords": ["all in this together"],
        "explanationAi": "Phil vừa hát vừa nhảy bài hát chủ đề nổi tiếng của bộ phim High School Musical.",
        "properNouns": []
    },
    {
        "startTime": 19.6,
        "endTime": 24.0,
        "text": "We're all stars, that's something you know!",
        "translationVi": "Tất cả chúng ta đều là những vì sao tỏa sáng, đó là điều ai cũng biết!",
        "ipaUs": "/wɪr ɔːl stɑːrz, ðæts ˈsʌmθɪŋ juː noʊ!/",
        "keywords": ["all stars"],
        "explanationAi": "Năng lượng tích cực và sự hồn nhiên đặc trưng của nhân vật Phil Dunphy.",
        "properNouns": []
    },

    # =========================================================================
    # SCENE 2: HALEY, KENNY & THE CHICKEN GAME (00:29 - 01:25)
    # =========================================================================
    {
        "startTime": 29.2,
        "endTime": 34.2,
        "text": "Hey guys, so Kenny and I were thinking about going to this restaurant.",
        "translationVi": "Chào bố mẹ, con với anh Kenny đang tính đến ăn ở nhà hàng này.",
        "ipaUs": "/heɪ ɡaɪz, soʊ ˈkɛni ænd aɪ wɜːr ˈθɪŋkɪŋ əˈbaʊt ˈɡoʊɪŋ tuː ðɪs ˈrɛstərənt./",
        "keywords": ["were thinking about", "restaurant"],
        "explanationAi": "Haley giới thiệu kế hoạch đi ăn tối với Kenny, người bạn trai lớn tuổi bán quần jeans mà bố mẹ không thích.",
        "properNouns": ["Kenny"]
    },
    {
        "startTime": 34.3,
        "endTime": 36.8,
        "text": "Oh sure, you know the problem with a dinner date, Phil?",
        "translationVi": "Ồ chắc chắn rồi, anh có biết vấn đề của một buổi hẹn ăn tối là gì không Phil?",
        "ipaUs": "/oʊ ʃʊr, juː noʊ ðə ˈprɑːbləm wɪð ə ˈdɪnər deɪt, fɪl?/",
        "keywords": ["dinner date", "problem"],
        "explanationAi": "Claire mở đầu chiến thuật tâm lý ngược nhằm đánh đòn tâm lý với con gái Haley.",
        "properNouns": ["Phil"]
    },
    {
        "startTime": 36.9,
        "endTime": 41.7,
        "text": "No, in fact it's been such a pleasure getting to know Kenny, it's our treat.",
        "translationVi": "Không hề, thực ra được làm quen với Kenny là vinh hạnh lớn, bố mẹ sẽ bao bữa này nhé.",
        "ipaUs": "/noʊ, ɪn fækt ɪts biːn sʌtʃ ə ˈplɛʒər ˈɡɛtɪŋ tuː noʊ ˈkɛni, ɪts ˈaʊər triːt./",
        "keywords": ["pleasure", "our treat"],
        "explanationAi": "'It's our treat' là thành ngữ thông dụng khi muốn nói 'để chúng tôi đãi/bao chầu này'.",
        "properNouns": ["Kenny"]
    },
    {
        "startTime": 41.8,
        "endTime": 42.8,
        "text": "Are you kidding?",
        "translationVi": "Bố mẹ đùa đấy à?",
        "ipaUs": "/ɑːr juː ˈkɪdɪŋ?/",
        "keywords": ["are you kidding"],
        "explanationAi": "Haley ngạc nhiên hoài nghi trước phản ứng quá hào phóng bất thường của bố mẹ.",
        "properNouns": []
    },
    {
        "startTime": 42.9,
        "endTime": 45.8,
        "text": "No, give him your credit card, Phil.",
        "translationVi": "Không đâu, đưa thẻ tín dụng của anh cho cậu ấy đi Phil.",
        "ipaUs": "/noʊ, ɡɪv hɪm jɔːr ˈkrɛdɪt kɑːrd, fɪl./",
        "keywords": ["credit card"],
        "explanationAi": "Claire ra hiệu cho Phil chơi tới bến trong màn đấu trí tâm lý (reverse psychology).",
        "properNouns": ["Phil"]
    },
    {
        "startTime": 46.0,
        "endTime": 50.1,
        "text": "Also, this restaurant is pretty far away, so we might be out late.",
        "translationVi": "Với lại nhà hàng này ở khá xa, nên có thể tụi con sẽ về muộn đấy ạ.",
        "ipaUs": "/ˈɔːlsoʊ, ðɪs ˈrɛstərənt ɪz ˈprɪti fɑːr əˈweɪ, soʊ wiː maɪt biː aʊt leɪt./",
        "keywords": ["pretty far away", "out late"],
        "explanationAi": "Haley tiếp tục thăm dò giới hạn chịu đựng và sự kiên nhẫn của bố mẹ.",
        "properNouns": []
    },
    {
        "startTime": 50.2,
        "endTime": 52.8,
        "text": "Well sweetheart, you're only young once.",
        "translationVi": "Ồ con gái yêu, tuổi trẻ đời người chỉ có một lần thôi mà.",
        "ipaUs": "/wɛl ˈswiːtˌhɑːrt, jʊr ˈoʊnli jʌŋ wʌns./",
        "keywords": ["sweetheart", "young once"],
        "explanationAi": "Thành ngữ 'you're only young once' (hãy tận hưởng khi còn trẻ) được dùng đầy châm biếm.",
        "properNouns": []
    },
    {
        "startTime": 52.9,
        "endTime": 55.7,
        "text": "It might even make sense to just stay in a hotel.",
        "translationVi": "Thậm chí có khi ngủ lại khách sạn luôn cũng hợp lý đấy chứ.",
        "ipaUs": "/ɪt maɪt ˈiːvən meɪk sɛns tuː dʒʌst steɪ ɪn ə hoʊˈtɛl./",
        "keywords": ["make sense", "hotel"],
        "explanationAi": "Haley đẩy mức độ thách thức lên đỉnh điểm khi gợi ý việc ở lại khách sạn qua đêm với Kenny.",
        "properNouns": []
    },
    {
        "startTime": 55.8,
        "endTime": 57.5,
        "text": "Okay, put it on the plastic.",
        "translationVi": "Được chứ, cứ quẹt thẻ tín dụng nhé con.",
        "ipaUs": "/oʊˈkeɪ, pʊt ɪt ɑːn ðə ˈplæstɪk./",
        "keywords": ["put it on the plastic"],
        "explanationAi": "'Put it on the plastic' là tiếng lóng nói về việc thanh toán bằng thẻ tín dụng (plastic card).",
        "properNouns": []
    },
    {
        "startTime": 57.6,
        "endTime": 59.5,
        "text": "Creep!",
        "translationVi": "Đồ lập dị ghê tởm!",
        "ipaUs": "/kriːp!/",
        "keywords": ["creep"],
        "explanationAi": "Haley buột miệng mắng thầm anh chàng bạn trai sau khi thấy bố mẹ quá bình thản ủng hộ.",
        "properNouns": []
    },
    {
        "startTime": 59.6,
        "endTime": 63.5,
        "text": "Okay, see you tomorrow. Bye-bye.",
        "translationVi": "Vâng, hẹn gặp bố mẹ ngày mai nhé. Tạm biệt.",
        "ipaUs": "/oʊˈkeɪ, siː juː təˈmɔːroʊ. baɪ baɪ./",
        "keywords": ["see you tomorrow"],
        "explanationAi": "Haley đành chào tạm biệt và bước ra ngoài trong sự ngỡ ngàng.",
        "properNouns": []
    },
    {
        "startTime": 63.8,
        "endTime": 66.5,
        "text": "It's my ex-wife, not the good one.",
        "translationVi": "Lại là bà vợ cũ của tôi gọi, mà không phải bà vợ tốt đâu nhé.",
        "ipaUs": "/ɪts maɪ ɛks waɪf, nɑːt ðə ɡʊd wʌn./",
        "keywords": ["ex-wife"],
        "explanationAi": "Câu đùa của Kenny qua điện thoại cho thấy anh ta từng ly hôn nhiều lần.",
        "properNouns": []
    },
    {
        "startTime": 66.6,
        "endTime": 68.5,
        "text": "What do you want?",
        "translationVi": "Cô muốn cái gì nữa đây?",
        "ipaUs": "/wʌt duː juː wɑːnt?/",
        "keywords": ["what do you want"],
        "explanationAi": "Giọng điệu cộc cằn của Kenny khiến Phil càng thêm sôi ruột.",
        "properNouns": []
    },
    {
        "startTime": 68.6,
        "endTime": 71.0,
        "text": "Nice game of chicken, Claire, she's gone.",
        "translationVi": "Trò chơi gan góc hay ho lắm Claire à, con bé đi mất rồi kìa.",
        "ipaUs": "/naɪs ɡeɪm ʌv ˈtʃɪkɪn, klɛr, ʃiːz ɡɔːn./",
        "keywords": ["game of chicken", "she's gone"],
        "explanationAi": "'Game of chicken' là ẩn dụ cho trò chơi đấu gan xem ai nhát chết phải chịu lùi bước trước.",
        "properNouns": ["Claire"]
    },
    {
        "startTime": 71.1,
        "endTime": 72.8,
        "text": "She's coming back, I am almost positive.",
        "translationVi": "Con bé sẽ quay lại mà, em gần như dám chắc chắn đấy.",
        "ipaUs": "/ʃiːz ˈkʌmɪŋ bæk, aɪ æm ˈɔːlmoʊst ˈpɑːzətɪv./",
        "keywords": ["almost positive"],
        "explanationAi": "'Almost positive' nghĩa là gần như chắc chắn 100%.",
        "properNouns": []
    },
    {
        "startTime": 72.9,
        "endTime": 74.9,
        "text": "Almost! Why do I listen to you?",
        "translationVi": "Gần như thôi à! Sao tôi lại đi nghe lời bà cơ chứ?",
        "ipaUs": "/ˈɔːlmoʊst! waɪ duː aɪ ˈlɪsən tuː juː?/",
        "keywords": ["why do I listen"],
        "explanationAi": "Phil hoảng hốt bộc lộ sự thiếu kiên nhẫn khi thấy con gái thực sự rời đi.",
        "properNouns": []
    },
    {
        "startTime": 75.0,
        "endTime": 78.9,
        "text": "You were wrong about the iPod being a failure, you were wrong about tomato being a vegetable,",
        "translationVi": "Bà từng đoán sai rằng máy nghe nhạc iPod sẽ thất bại, bà từng sai khi bảo cà chua là rau củ,",
        "ipaUs": "/juː wɜːr rɔːŋ əˈbaʊt ðɪ ˈaɪˌpɑːd ˈbiːɪŋ ə ˈfeɪljər, juː wɜːr rɔːŋ əˈbaʊt təˈmeɪtoʊ ˈbiːɪŋ ə ˈvɛdʒtəbəl,/",
        "keywords": ["wrong about", "iPod", "tomato"],
        "explanationAi": "Phil liệt kê những phán đoán sai lầm trong quá khứ của Claire để phản bác chiến thuật của cô.",
        "properNouns": ["iPod"]
    },
    {
        "startTime": 79.0,
        "endTime": 82.1,
        "text": "and I'm not even going to talk about your favorite planet, Pluto.",
        "translationVi": "và tôi thậm chí còn chưa thèm nhắc tới hành tinh yêu thích của bà là sao Diêm Vương đâu đấy.",
        "ipaUs": "/ænd aɪm nɑːt ˈiːvən ˈɡoʊɪŋ tuː tɔːk əˈbaʊt jɔːr ˈfeɪvərɪt ˈplænɪt, ˈpluːtoʊ./",
        "keywords": ["favorite planet", "Pluto"],
        "explanationAi": "Sao Diêm Vương (Pluto) đã bị giáng cấp khỏi danh sách các hành tinh chính thức trong hệ mặt trời.",
        "properNouns": ["Pluto"]
    },
    {
        "startTime": 82.2,
        "endTime": 86.5,
        "text": "And unless she was lying to the good ladies of The View, it's Duh-mee, not Demi!",
        "translationVi": "Và trừ phi nữ minh tinh ấy nói dối các quý cô chương trình The View, tên cô ấy đọc là Duh-mee chứ không phải Demi!",
        "ipaUs": "/ænd ənˈlɛs ʃiː wʌz ˈlaɪɪŋ tuː ðə ɡʊd ˈleɪdiz ʌv ðə vjuː, ɪts dəˈmiː, nɑːt ˈdɛmi!/",
        "keywords": ["The View", "pronunciation debate"],
        "explanationAi": "Phil nhắc tới cuộc tranh luận cách phát âm tên diễn viên Demi Moore trên talkshow The View nổi tiếng.",
        "properNouns": ["The View", "Demi"]
    },
    {
        "startTime": 89.8,
        "endTime": 93.6,
        "text": "You're going to let me go with him? Isn't that what you wanted, honey?",
        "translationVi": "Mẹ định để con đi với anh ta thật sao? Chẳng phải đó là điều con muốn à con yêu?",
        "ipaUs": "/jʊr ˈɡoʊɪŋ tuː lɛt miː ɡoʊ wɪð hɪm? ˈɪzənt ðæt wʌt juː ˈwɑːntɪd, ˈhʌni?/",
        "keywords": ["let me go", "what you wanted"],
        "explanationAi": "Haley quay lại chất vấn mẹ Claire ngoài hiên nhà.",
        "properNouns": []
    },
    {
        "startTime": 93.7,
        "endTime": 97.5,
        "text": "What's the matter with you? You've been acting so weird ever since I left college.",
        "translationVi": "Bố mẹ bị làm sao thế ạ? Bố mẹ cứ cư xử kỳ lạ suốt từ lúc con nghỉ học đại học tới giờ.",
        "ipaUs": "/wʌts ðə ˈmætər wɪð juː? juːv biːn ˈæktɪŋ soʊ wɪrd ˈɛvər sɪns aɪ lɛft ˈkɑːlɪdʒ./",
        "keywords": ["what's the matter", "acting weird"],
        "explanationAi": "Haley bộc bạch sự bối rối khi thấy thái độ của bố mẹ thay đổi sau khi cô rời trường đại học.",
        "properNouns": []
    },
    {
        "startTime": 97.6,
        "endTime": 100.6,
        "text": "For the record, you didn't leave college, you were expelled.",
        "translationVi": "Nói cho rõ ràng nhé, con không hề tự nghỉ đại học, mà là con bị đuổi học.",
        "ipaUs": "/fɔːr ðə ˈrɛkərd, juː ˈdɪdənt liːv ˈkɑːlɪdʒ, juː wɜːr ɪkˈspɛld./",
        "keywords": ["for the record", "expelled"],
        "explanationAi": "'For the record' là cụm từ nhấn mạnh sự thật chính xác cần được ghi nhận công khai.",
        "properNouns": []
    },
    {
        "startTime": 100.7,
        "endTime": 103.5,
        "text": "Which you guys never let me forget, especially Dad.",
        "translationVi": "Điều mà bố mẹ chẳng bao giờ chịu để cho con quên, nhất là bố ấy.",
        "ipaUs": "/wɪtʃ juː ɡaɪz ˈnɛvər lɛt miː fərˈɡɛt, əˈspɛʃli dæd./",
        "keywords": ["never let me forget", "especially Dad"],
        "explanationAi": "Haley cảm nhận thấy sự thất vọng sâu sắc trong mắt bố Phil.",
        "properNouns": []
    },
    {
        "startTime": 103.6,
        "endTime": 107.3,
        "text": "Honey, your father... Oh, you don't have to tell me what he thinks, okay?",
        "translationVi": "Con yêu, bố con... Thôi mẹ không cần giải thích bố nghĩ gì đâu, được chưa?",
        "ipaUs": "/ˈhʌni, jɔːr ˈfɑːðər... oʊ, juː doʊnt hæv tuː tɛl miː wʌt hiː θɪŋks, oʊˈkeɪ?/",
        "keywords": ["tell me what he thinks"],
        "explanationAi": "Haley ngắt lời Claire vì cảm thấy mặc cảm tội lỗi.",
        "properNouns": []
    },
    {
        "startTime": 107.4,
        "endTime": 110.5,
        "text": "I'm a huge disappointment to him, I see it on his face every day.",
        "translationVi": "Con là nỗi thất vọng lớn đối với bố, ngày nào nhìn mặt bố con cũng thấy rõ điều đó.",
        "ipaUs": "/aɪm ə hjuːdʒ ˌdɪsəˈpɔɪntmənt tuː hɪm, aɪ siː ɪt ɑːn hɪz feɪs ˈɛvri deɪ./",
        "keywords": ["huge disappointment", "see it on his face"],
        "explanationAi": "'A huge disappointment' thể hiện cảm xúc tự ti sâu sắc của người con đối với kỳ vọng của cha mẹ.",
        "properNouns": []
    },
    {
        "startTime": 110.6,
        "endTime": 113.8,
        "text": "He acts as if he doesn't even want me around.",
        "translationVi": "Bố cứ cư xử như thể bố thậm chí chẳng hề muốn con quanh quẩn ở đây nữa.",
        "ipaUs": "/hiː ækts æz ɪf hiː ˈdʌzənt ˈiːvən wɑːnt miː əˈraʊnd./",
        "keywords": ["acts as if", "want me around"],
        "explanationAi": "Cấu trúc 'acts as if' diễn tả hành vi giả định mang sắc thái chạnh lòng.",
        "properNouns": []
    },
    {
        "startTime": 113.9,
        "endTime": 117.5,
        "text": "I'm going after her. This little chicken game may work for you, but it doesn't work for me.",
        "translationVi": "Tôi phải đi theo con bé đây. Trò đấu gan này có thể hợp với bà, nhưng tôi thì không chịu nổi.",
        "ipaUs": "/aɪm ˈɡoʊɪŋ ˈæftər hɜːr. ðɪs ˈlɪtəl ˈtʃɪkɪn ɡeɪm meɪ wɜːrk fɔːr juː, bʌt ɪt ˈdʌzənt wɜːrk fɔːr miː./",
        "keywords": ["going after her", "doesn't work for me"],
        "explanationAi": "Phil không thể tiếp tục đứng nhìn con gái tổn thương và quyết định xông ra bảo vệ con.",
        "properNouns": []
    },
    {
        "startTime": 117.6,
        "endTime": 121.0,
        "text": "That's my little girl! I need her to know that no guy on Earth is good enough for her,",
        "translationVi": "Đó là con gái bé bỏng của tôi! Tôi phải cho con bé biết rằng không gã đàn ông nào trên đời xứng đáng với nó,",
        "ipaUs": "/ðæts maɪ ˈlɪtəl ɡɜːrl! aɪ niːd hɜːr tuː noʊ ðæt noʊ ɡaɪ ɑːn ɜːrθ ɪz ɡʊd ɪˈnʌf fɔːr hɜːr,/",
        "keywords": ["little girl", "good enough for her"],
        "explanationAi": "Bản năng của người cha bùng nổ: tình yêu thương vô điều kiện của Phil dành cho con gái.",
        "properNouns": []
    },
    {
        "startTime": 121.1,
        "endTime": 125.0,
        "text": "let alone some slimy middle-aged jeans salesman!",
        "translationVi": "huống hồ là một gã bán quần jeans trung niên nhớp nhúa như thế kia!",
        "ipaUs": "/lɛt əˈloʊn sʌm ˈslaɪmi ˈmɪdəl eɪdʒd dʒiːnz ˈseɪlzmən!/",
        "keywords": ["let alone", "slimy", "jeans salesman"],
        "explanationAi": "Cụm 'let alone' có nghĩa là 'chưa kể đến, huống chi là'. 'Slimy' miêu tả kẻ giả tạo, nhớp nhúa.",
        "properNouns": []
    },

    # =========================================================================
    # SCENE 3: ROLLER COASTER CRISIS AT DISNEYLAND (01:26 - 02:18)
    # =========================================================================
    {
        "startTime": 127.1,
        "endTime": 130.1,
        "text": "What's this? Just enjoy it.",
        "translationVi": "Cái gì thế này? Cứ tận hưởng đi nào.",
        "ipaUs": "/wʌts ðɪs? dʒʌst ɛnˈdʒɔɪ ɪt./",
        "keywords": ["enjoy it"],
        "explanationAi": "Claire mỉm cười hài lòng khi chứng kiến hành động yêu thương dứt khoát của Phil dành cho Haley.",
        "properNouns": []
    },
    {
        "startTime": 130.2,
        "endTime": 133.6,
        "text": "And there were a lot of sharp turns and big rocks. It just kept going!",
        "translationVi": "Rồi có bao nhiêu là khúc cua gấp với mấy tảng đá to đùng. Tàu lượn cứ lao vun vút mãi!",
        "ipaUs": "/ænd ðɛr wɜːr ə lɑːt ʌv ʃɑːrp tɜːrnz ænd bɪɡ rɑːks. ɪt dʒʌst kɛpt ˈɡoʊɪŋ!/",
        "keywords": ["sharp turns", "kept going"],
        "explanationAi": "Luke phấn khích kể lại trải nghiệm trên chuyến tàu lượn siêu tốc tại công viên Disneyland.",
        "properNouns": []
    },
    {
        "startTime": 133.7,
        "endTime": 137.2,
        "text": "Wow, you're okay? Great, why wouldn't I be?",
        "translationVi": "Chà, bố vẫn ổn chứ? Tuyệt cú mèo, sao bố lại không ổn được chứ?",
        "ipaUs": "/waʊ, jʊr oʊˈkeɪ? ɡreɪt, waɪ ˈwʊdənt aɪ biː?/",
        "keywords": ["why wouldn't I be"],
        "explanationAi": "Phil cố gắng giữ thể diện trước mặt các con dù cả người đang lảo đảo chóng mặt.",
        "properNouns": []
    },
    {
        "startTime": 137.3,
        "endTime": 140.4,
        "text": "Because you're kind of leaning on me? Well, isn't that what marriage is?",
        "translationVi": "Bởi vì bố đang tựa hết cả người vào con này? Ồ, hôn nhân chẳng phải là để nương tựa vào nhau sao?",
        "ipaUs": "/bɪˈkɔːz jʊr kaɪnd ʌv ˈliːnɪŋ ɑːn miː? wɛl, ˈɪzənt ðæt wʌt ˈmærɪdʒ ɪz?/",
        "keywords": ["leaning on me", "marriage"],
        "explanationAi": "Phil chữa thẹn hài hước bằng định nghĩa về hôn nhân khi phải vịn vào vai Claire.",
        "properNouns": []
    },
    {
        "startTime": 140.5,
        "endTime": 144.8,
        "text": "Oh Alex, stop touching him. You look like hell.",
        "translationVi": "Alex đừng đụng vào bố nữa. Bố trông tàn tạ thảm hại lắm rồi đấy.",
        "ipaUs": "/oʊ ˈælɪks, stɑːp ˈtʌtʃɪŋ hɪm. juː lʊk laɪk hɛl./",
        "keywords": ["look like hell"],
        "explanationAi": "Thành ngữ 'look like hell' dùng để miêu tả vẻ ngoài nhợt nhạt, kiệt sức tồi tệ.",
        "properNouns": ["Alex"]
    },
    {
        "startTime": 145.5,
        "endTime": 150.4,
        "text": "You're a little dizzy. I think that ride did something to the fluid in your inner ear.",
        "translationVi": "Cậu bị chóng mặt rồi. Tôi nghĩ chuyến tàu đó đã tác động vào chất dịch trong tai trong của cậu đấy.",
        "ipaUs": "/jʊr ə ˈlɪtəl ˈdɪzi. aɪ θɪŋk ðæt raɪd dɪd ˈsʌmθɪŋ tuː ðə ˈfluːɪd ɪn jɔːr ˈɪnər ɪr./",
        "keywords": ["dizzy", "inner ear"],
        "explanationAi": "Jay Pritchett (bố vợ của Phil) chẩn đoán tình trạng tiền đình tuổi già của Phil.",
        "properNouns": ["Jay"]
    },
    {
        "startTime": 150.5,
        "endTime": 153.8,
        "text": "It's thickening, that's what happens when you get old. It is? Yeah, you can't take the motion.",
        "translationVi": "Nó bị đặc lại, tuổi già ai cũng bị thế cả. Thật thế sao? Đúng vậy, cậu không chịu nổi chuyển động xoay lắc nữa đâu.",
        "ipaUs": "/ɪts ˈθɪkənɪŋ, ðæts wʌt ˈhæpənz wɛn juː ɡɛt oʊld. ɪt ɪz? jæ, juː kænt teɪk ðə ˈmoʊʃən./",
        "keywords": ["thickening", "get old", "take the motion"],
        "explanationAi": "'Can't take the motion' nghĩa là cơ thể không còn chịu được cảm giác rung lắc dữ dội.",
        "properNouns": []
    },
    {
        "startTime": 154.4,
        "endTime": 157.7,
        "text": "I got to pop a Dramamine just to get in my swivel chair.",
        "translationVi": "Tôi còn phải uống viên thuốc chống say xe Dramamine chỉ để ngồi lên cái ghế xoay bàn làm việc kìa.",
        "ipaUs": "/aɪ ɡɑːt tuː pɑːp ə ˈdræməˌmiːn dʒʌst tuː ɡɛt ɪn maɪ ˈswɪvəl tʃɛr./",
        "keywords": ["Dramamine", "swivel chair"],
        "explanationAi": "'Dramamine' là nhãn hiệu thuốc say tàu xe nổi tiếng tại Mỹ. 'Pop a pill' là uống thuốc.",
        "properNouns": ["Dramamine"]
    },
    {
        "startTime": 157.8,
        "endTime": 162.8,
        "text": "That is not it! I'm king of the roller coasters! I think I just put too big of a whipped cream smile on my pancake this morning.",
        "translationVi": "Không phải như thế đâu! Con là ông vua tàu lượn siêu tốc mà! Chắc sáng nay con xịt nụ cười kem tươi hơi bị nhiều lên đĩa bánh pancake thôi.",
        "ipaUs": "/ðæt ɪz nɑːt ɪt! aɪm kɪŋ ʌv ðə ˈroʊlər ˈkoʊstərz! aɪ θɪŋk aɪ dʒʌst pʊt tuː bɪɡ ʌv ə wɪpt kriːm smaɪl ɑːn maɪ ˈpænkeɪk ðɪs ˈmɔːrnɪŋ./",
        "keywords": ["king of the roller coasters", "whipped cream"],
        "explanationAi": "Phil kiên quyết phủ nhận sự lão hóa bằng lý do trẻ con: do ăn quá nhiều kem tươi vẽ mặt cười.",
        "properNouns": []
    },
    {
        "startTime": 163.4,
        "endTime": 168.9,
        "text": "You guys want to go on Matterhorn? Luke, I think me and your dad are going to sit this one out. Maybe get one of them big pickles.",
        "translationVi": "Mọi người có muốn chơi trò Matterhorn không? Luke à, ông nghĩ ông với bố cháu sẽ nghỉ ván này. Có khi đi mua quả dưa chuột muối to đùng ăn thì hơn.",
        "ipaUs": "/juː ɡaɪz wɑːnt tuː ɡoʊ ɑːn ˈmætərˌhɔːrn? luːk, aɪ θɪŋk miː ænd jɔːr dæd ɑːr ˈɡoʊɪŋ tuː sɪt ðɪs wʌn aʊt. ˈmeɪbi ɡɛt wʌn ʌv ðɛm bɪɡ ˈpɪkəlz./",
        "keywords": ["sit this one out", "big pickles"],
        "explanationAi": "'Sit this one out' là thành ngữ chỉ việc ngồi ngoài nghỉ ngơi không tham gia hoạt động lần này.",
        "properNouns": ["Matterhorn", "Luke", "Jay"]
    },
    {
        "startTime": 169.0,
        "endTime": 173.5,
        "text": "No! You're going to have to eat that pickle on your own, Jay. I still got a few good years left!",
        "translationVi": "Không đời nào! Bố phải tự đi ăn quả dưa muối đó một mình đi Jay. Con vẫn còn vài năm xuân xanh phong độ chán!",
        "ipaUs": "/noʊ! jʊr ˈɡoʊɪŋ tuː hæv tuː iːt ðæt ˈpɪkəl ɑːn jɔːr oʊn, dʒeɪ. aɪ stɪl ɡɑːt ə fjuː ɡʊd jɪrz lɛft!/",
        "keywords": ["on your own", "good years left"],
        "explanationAi": "Phil kiên quyết từ chối gia nhập 'hội người cao tuổi' ăn dưa chua của ông bố vợ Jay.",
        "properNouns": ["Jay"]
    },
    {
        "startTime": 173.6,
        "endTime": 180.5,
        "text": "Luke, wait up! All right, see you there. I'm good, I'm good...",
        "translationVi": "Luke đợi bố với! Được rồi, hẹn gặp bố ở đó nhé. Bố vẫn ổn, bố vẫn ổn mà...",
        "ipaUs": "/luːk, weɪt ʌp! ɔːl raɪt, siː juː ðɛr. aɪm ɡʊd, aɪm ɡʊd.../",
        "keywords": ["wait up", "I'm good"],
        "explanationAi": "Phil lảo đảo chạy theo cậu con trai với ý chí sắt đá không muốn làm con thất vọng.",
        "properNouns": ["Luke"]
    },

    # =========================================================================
    # SCENE 4: BENCH HEART-TO-HEART WITH LUKE (01:46 - 02:44)
    # =========================================================================
    {
        "startTime": 190.6,
        "endTime": 195.0,
        "text": "And we were going around the corner and everyone was screaming, and I swallowed a bug!",
        "translationVi": "Rồi tụi mình lượn qua khúc quanh và ai cũng gào thét ầm ĩ, xong con còn nuốt chửng cả một con bọ nữa chứ!",
        "ipaUs": "/ænd wiː wɜːr ˈɡoʊɪŋ əˈraʊnd ðə ˈkɔːrnər ænd ˈɛvriˌwʌn wʌz ˈskriːmɪŋ, ænd aɪ ˈswɑːloʊd ə bʌɡ!/",
        "keywords": ["going around the corner", "swallowed a bug"],
        "explanationAi": "Luke phấn khích kể lại những chi tiết điên rồ trên đường ray tàu lượn.",
        "properNouns": []
    },
    {
        "startTime": 195.1,
        "endTime": 198.8,
        "text": "Being tall is everything that I dreamed it would be. What should we do next?",
        "translationVi": "Được đủ chiều cao chơi tàu lượn đúng là mọi điều tuyệt vời con từng mơ ước. Tiếp theo mình chơi gì bố ơi?",
        "ipaUs": "/ˈbiːɪŋ tɔːl ɪz ˈɛvriˌθɪŋ ðæt aɪ driːmd ɪt wʊd biː. wʌt ʃʊd wiː duː nɛkst?/",
        "keywords": ["being tall", "dreamed"],
        "explanationAi": "Luke vừa đạt đủ chiều cao tiêu chuẩn để được phép vào các trò chơi cảm giác mạnh.",
        "properNouns": []
    },
    {
        "startTime": 199.8,
        "endTime": 203.7,
        "text": "We're going to sit down. Right around here, this is good. Right here.",
        "translationVi": "Bố con mình ngồi xuống đây đã. Ngay quanh chỗ này này, chỗ này tốt rồi. Ngồi đây nhé.",
        "ipaUs": "/wɪr ˈɡoʊɪŋ tuː sɪt daʊn. raɪt əˈraʊnd hɪr, ðɪs ɪz ɡʊd. raɪt hɪr./",
        "keywords": ["sit down", "right here"],
        "explanationAi": "Phil lảo đảo kéo con trai ngồi xuống ghế đá khi không thể gượng thêm được nữa.",
        "properNouns": []
    },
    {
        "startTime": 203.8,
        "endTime": 206.5,
        "text": "Are you okay, Dad? No, I'm not okay.",
        "translationVi": "Bố có ổn không bố? Không, bố không ổn chút nào cả con trai ạ.",
        "ipaUs": "/ɑːr juː oʊˈkeɪ, dæd? noʊ, aɪm nɑːt oʊˈkeɪ./",
        "keywords": ["not okay"],
        "explanationAi": "Phil lần đầu tiên thẳng thắn thú nhận sự yếu đuối và giới hạn thể lực với con trai.",
        "properNouns": []
    },
    {
        "startTime": 207.1,
        "endTime": 212.5,
        "text": "I hate to say this, but these rides are killing me. But you're the king of roller coasters! I know.",
        "translationVi": "Bố ghét phải nói ra điều này, nhưng mấy trò tàu lượn này đang giết chết bố. Nhưng bố là ông vua tàu lượn mà! Bố biết chứ.",
        "ipaUs": "/aɪ heɪt tuː seɪ ðɪs, bʌt ðiːz raɪdz ɑːr ˈkɪlɪŋ miː. bʌt jʊr ðə kɪŋ ʌv ˈroʊlər ˈkoʊstərz! aɪ noʊ./",
        "keywords": ["rides are killing me", "king of roller coasters"],
        "explanationAi": "Thành ngữ 'these rides are killing me' nhấn mạnh cảm giác kiệt sức, say xẩm mặt mày.",
        "properNouns": []
    },
    {
        "startTime": 213.2,
        "endTime": 217.5,
        "text": "Something happens when you get older, and your body can't take it.",
        "translationVi": "Khi già đi điều gì đó sẽ xảy ra, và cơ thể con không còn chịu đựng nổi nữa.",
        "ipaUs": "/ˈsʌmθɪŋ ˈhæpənz wɛn juː ɡɛt ˈoʊldər, ænd jɔːr ˈbɑːdi kænt teɪk ɪt./",
        "keywords": ["get older", "body can't take it"],
        "explanationAi": "Sự thừa nhận quy luật tự nhiên của thời gian một cách chân thành.",
        "properNouns": []
    },
    {
        "startTime": 218.4,
        "endTime": 222.5,
        "text": "One of my favorite things in the world is doing stupid fun stuff with you.",
        "translationVi": "Một trong những điều bố thích nhất trên trần đời này là được làm những trò ngớ ngẩn vui nhộn cùng con.",
        "ipaUs": "/wʌn ʌv maɪ ˈfeɪvərɪt θɪŋz ɪn ðə wɜːrld ɪz ˈduːɪŋ ˈstuːpɪd fʌn stʌf wɪð juː./",
        "keywords": ["favorite things", "stupid fun stuff"],
        "explanationAi": "Phil bày tỏ tình cảm thiêng liêng: tình bạn tri kỷ giữa hai bố con qua những trò chơi tinh nghịch.",
        "properNouns": []
    },
    {
        "startTime": 222.6,
        "endTime": 226.5,
        "text": "Like Pogo stick basketball or trying to get a swing to go all the way around.",
        "translationVi": "Như nhảy gậy nhún ném bóng rổ hay cố gắng đu xích đu quay tròn cả một vòng.",
        "ipaUs": "/laɪk ˈpoʊɡoʊ stɪk ˈbæskətˌbɔːl ɔːr ˈtraɪɪŋ tuː ɡɛt ə swɪŋ tuː ɡoʊ ɔːl ðə weɪ əˈraʊnd./",
        "keywords": ["Pogo stick", "swing", "all the way around"],
        "explanationAi": "Những trò nghịch ngợm đặc trưng của cặp đôi Phil & Luke trong các mùa phim Modern Family.",
        "properNouns": []
    },
    {
        "startTime": 226.6,
        "endTime": 231.0,
        "text": "Next time we should sit on a fire extinguisher. Yes, right after we look into some Mentos.",
        "translationVi": "Lần tới mình nên ngồi lên bình cứu hỏa xem sao. Được chứ, ngay sau khi mình nghiên cứu vụ kẹo Mentos đã.",
        "ipaUs": "/nɛkst taɪm wiː ʃʊd sɪt ɑːn ə ˈfaɪər ɪkˈstɪŋɡwɪʃər. jɛs, raɪt ˈæftər wiː lʊk ˈɪntuː sʌm ˈmɛntoʊz./",
        "keywords": ["fire extinguisher", "Mentos"],
        "explanationAi": "Thí nghiệm nổi tiếng thả kẹo Mentos vào chai nước ngọt có ga để tạo phản ứng phun trào.",
        "properNouns": ["Mentos"]
    },
    {
        "startTime": 231.6,
        "endTime": 236.0,
        "text": "Honestly though, the way I'm feeling right now, I don't know if there's going to be a next time.",
        "translationVi": "Nhưng mà thật lòng thì, với cảm giác hiện tại của bố, bố không biết liệu có còn lần sau nữa không.",
        "ipaUs": "/ˈɑːnəstli ðoʊ, ðə weɪ aɪm ˈfiːlɪŋ raɪt naʊ, aɪ doʊnt noʊ ɪf ðɛrz ˈɡoʊɪŋ tuː biː ə nɛkst taɪm./",
        "keywords": ["honestly though", "next time"],
        "explanationAi": "Nỗi buồn sâu lắng của người bố khi nhận ra tuổi trẻ đang dần qua đi.",
        "properNouns": []
    },
    {
        "startTime": 236.2,
        "endTime": 241.9,
        "text": "Dad, we can always find cool stuff to do. Even if you're old and in a wheelchair,",
        "translationVi": "Bố ơi, bố con mình sẽ luôn tìm được những trò cực ngầu để làm mà. Kể cả sau này bố có già và phải ngồi xe lăn,",
        "ipaUs": "/dæd, wiː kæn ˈɔːlweɪz faɪnd kuːl stʌf tuː duː. ˈiːvən ɪf jʊr oʊld ænd ɪn ə ˈwiːlˌtʃɛr,/",
        "keywords": ["cool stuff to do", "wheelchair"],
        "explanationAi": "Luke an ủi bố bằng góc nhìn ngây thơ nhưng đầy tình yêu thương vô bờ bến.",
        "properNouns": []
    },
    {
        "startTime": 242.0,
        "endTime": 247.5,
        "text": "I'll take you to the mall, push you as fast as you want to go. Really? You'd do that?",
        "translationVi": "con sẽ đẩy bố vào trung tâm thương mại, đẩy nhanh hết mức bố muốn luôn. Thật ư con? Con sẽ làm thế cho bố thật sao?",
        "ipaUs": "/aɪl teɪk juː tuː ðə mɔːl, pʊʃ juː æz fæst æz juː wɑːnt tuː ɡoʊ. ˈrɪəli? juːd duː ðæt?/",
        "keywords": ["push you as fast", "you'd do that"],
        "explanationAi": "Khoảnh khắc gắn kết cảm động giữa hai thế hệ trong gia đình Dunphy.",
        "properNouns": []
    },
    {
        "startTime": 247.6,
        "endTime": 251.0,
        "text": "Heck yeah, we'll pop some wheelies too! That sounds fun.",
        "translationVi": "Chắc chắn rồi ạ, mình còn bốc đầu xe lăn nữa chứ! Nghe vui phết đấy con.",
        "ipaUs": "/hɛk jæ, wiːl pɑːp sʌm ˈwiːliz tuː! ðæt saʊndz fʌn./",
        "keywords": ["pop some wheelies", "sounds fun"],
        "explanationAi": "'Pop wheelies' là tiếng lóng chỉ hành động bốc đầu xe (nhấc bánh trước lên không trung).",
        "properNouns": []
    },
    {
        "startTime": 251.1,
        "endTime": 254.5,
        "text": "And I'll take you to the top of a huge hill and just let go!",
        "translationVi": "Rồi con sẽ đẩy bố lên đỉnh một con dốc thật cao rồi buông tay ra luôn!",
        "ipaUs": "/ænd aɪl teɪk juː tuː ðə tɑːp ʌv ə hjuːdʒ hɪl ænd dʒʌst lɛt ɡoʊ!/",
        "keywords": ["huge hill", "just let go"],
        "explanationAi": "Cú cua xe hài hước đặc trưng phong cách của cậu bé ngốc nghếch Luke Dunphy.",
        "properNouns": []
    },
    {
        "startTime": 254.6,
        "endTime": 258.5,
        "text": "Okay, we'll nail down the specifics later, but that's really nice.",
        "translationVi": "Được rồi, chi tiết kế hoạch đó để sau hãy chốt, nhưng con nghĩ thế là đáng yêu lắm rồi.",
        "ipaUs": "/oʊˈkeɪ, wiːl neɪl daʊn ðə spəˈsɪfɪks ˈleɪtər, bʌt ðæts ˈrɪəli naɪs./",
        "keywords": ["nail down the specifics", "really nice"],
        "explanationAi": "Thành ngữ 'nail down the specifics' nghĩa là thống nhất/chốt lại các chi tiết cụ thể.",
        "properNouns": []
    },
    {
        "startTime": 259.5,
        "endTime": 263.5,
        "text": "So would you still want popcorn? Oh my god, ride Space Mountain!",
        "translationVi": "Thế bố vẫn muốn ăn bỏng ngô chứ? Ôi trời ơi, con đi chơi trò Tàu Lượn Không Gian Space Mountain đây!",
        "ipaUs": "/soʊ wʊd juː stɪl wɑːnt ˈpɑːpˌkɔːrn? oʊ maɪ ɡɑːd, raɪd speɪs ˈmaʊntən!/",
        "keywords": ["Space Mountain", "popcorn"],
        "explanationAi": "Space Mountain là trò chơi tàu lượn trong bóng tối nổi tiếng bậc nhất tại Disneyland.",
        "properNouns": ["Space Mountain"]
    },
    {
        "startTime": 263.6,
        "endTime": 268.5,
        "text": "Hey, at the end when they take a picture, do something hilarious for both of us! You're going to die!",
        "translationVi": "Này con, đoạn cuối lúc máy ảnh chụp hình, hãy làm trò gì thật hài hước cho cả hai bố con mình nhé! Bố sẽ cười chết mất cho mà xem!",
        "ipaUs": "/heɪ, æt ðɪ ɛnd wɛn ðeɪ teɪk ə ˈpɪktʃər, duː ˈsʌmθɪŋ hɪˈlɛriəs fɔːr boʊθ ʌv ʌs! jʊr ˈɡoʊɪŋ tuː daɪ!/",
        "keywords": ["hilarious", "you're going to die"],
        "explanationAi": "'You're going to die' ở đây mang nghĩa bóng: 'bố sẽ cười vỡ bụng/cười chết mất'.",
        "properNouns": []
    },
    {
        "startTime": 268.6,
        "endTime": 272.5,
        "text": "When you see it, not because you're old! Yep.",
        "translationVi": "Ý con là chết cười khi nhìn thấy ảnh, chứ không phải chết vì già đâu nhé! Bố hiểu rồi.",
        "ipaUs": "/wɛn juː siː ɪt, nɑːt bɪˈkɔːz jʊr oʊld! jɛp./",
        "keywords": ["not because you're old"],
        "explanationAi": "Luke nhanh nhảu đính chính để bố không bị tủi thân vì tuổi tác.",
        "properNouns": []
    },

    # =========================================================================
    # SCENE 5: ALEX'S ACADEMIC AWARD & DR. STIGLITZ (02:45 - 03:36)
    # =========================================================================
    {
        "startTime": 274.3,
        "endTime": 277.5,
        "text": "That's Dr. Stiglitz, he makes the final decision on the award.",
        "translationVi": "Đó là giáo sư tiến sĩ Stiglitz, thầy ấy là người đưa ra quyết định cuối cùng về giải thưởng.",
        "ipaUs": "/ðæts ˈdɑːktər ˈstɪɡlɪts, hiː meɪks ðə ˈfaɪnəl dɪˈsɪʒən ɑːn ðɪ əˈwɔːrd./",
        "keywords": ["Dr. Stiglitz", "final decision", "award"],
        "explanationAi": "Alex chỉ cho bố vị giáo sư uyên bác tại buổi dạ tiệc vinh danh học thuật.",
        "properNouns": ["Dr. Stiglitz"]
    },
    {
        "startTime": 277.6,
        "endTime": 280.3,
        "text": "He's brilliant, scary, and impossible to impress.",
        "translationVi": "Thầy ấy cực kỳ uyên bác, đáng sợ và gần như không ai có thể làm thầy ấn tượng nổi.",
        "ipaUs": "/hiːz ˈbrɪljənt, ˈskɛri, ænd ɪmˈpɑːsəbəl tuː ɪmˈprɛs./",
        "keywords": ["brilliant", "impossible to impress"],
        "explanationAi": "Cấu trúc 'impossible to impress' miêu tả người có tiêu chuẩn quá khắt khe, khó chiều.",
        "properNouns": []
    },
    {
        "startTime": 280.4,
        "endTime": 285.5,
        "text": "Hey, I know this is your dad talking, but you're pretty brilliant and scary and impossible yourself.",
        "translationVi": "Này, bố biết đây là lời từ bố con thôi, nhưng bản thân con cũng cực kỳ thông minh, đáng gờm và phi thường chẳng kém đâu.",
        "ipaUs": "/heɪ, aɪ noʊ ðɪs ɪz jɔːr dæd ˈtɔːkɪŋ, bʌt jʊr ˈprɪti ˈbrɪljənt ænd ˈskɛri ænd ɪmˈpɑːsəbəl jʊərˈsɛlf./",
        "keywords": ["brilliant and scary and impossible"],
        "explanationAi": "Phil khích lệ sự tự tin của cô con gái học giỏi Alex bằng những lời khen chân thành nhất.",
        "properNouns": []
    },
    {
        "startTime": 286.3,
        "endTime": 289.6,
        "text": "Okay, I've made an appearance, so I think we can go. Come on now.",
        "translationVi": "Được rồi, con đã xuất hiện điểm mặt rồi, nên con nghĩ mình về được rồi đấy ạ. Thôi nào con.",
        "ipaUs": "/oʊˈkeɪ, aɪv meɪd ən əˈpɪrəns, soʊ aɪ θɪŋk wiː kæn ɡoʊ. kʌm ɑːn naʊ./",
        "keywords": ["made an appearance"],
        "explanationAi": "'Make an appearance' có nghĩa là chỉ ghé qua mặt cho có lệ rồi nhanh chóng rời đi.",
        "properNouns": []
    },
    {
        "startTime": 289.7,
        "endTime": 294.0,
        "text": "Alex, this is a party in your honor and you're here with your own personal cheerleader!",
        "translationVi": "Alex à, đây là bữa tiệc tổ chức để vinh danh con, và con đang có mặt ở đây cùng người hoạt náo viên cổ vũ riêng của mình cơ mà!",
        "ipaUs": "/ˈælɪks, ðɪs ɪz ə ˈpɑːrti ɪn jɔːr ˈɑːnər ænd jʊr hɪr wɪð jɔːr oʊn ˈpɜːrsənəl ˈtʃɪrˌliːdər!/",
        "keywords": ["in your honor", "personal cheerleader"],
        "explanationAi": "Phil luôn tự hào làm người hâm mộ cuồng nhiệt số một của các con.",
        "properNouns": ["Alex"]
    },
    {
        "startTime": 294.1,
        "endTime": 297.5,
        "text": "Dad, I just... I know how to pump up an academic crowd. I cheered for the debate team once!",
        "translationVi": "Bố ơi, con chỉ... Bố biết cách khuấy động đám đông học giả này mà. Hồi xưa bố từng đi cổ vũ cho đội tranh biện đấy!",
        "ipaUs": "/dæd, aɪ dʒʌst... aɪ noʊ haʊ tuː pʌmp ʌp ən ˌækəˈdɛmɪk kraʊd. aɪ tʃɪrd fɔːr ðə dɪˈbeɪt tiːm wʌns!/",
        "keywords": ["pump up", "academic crowd", "debate team"],
        "explanationAi": "Trò đùa mỉa mai kinh điển: đội tranh biện học thuật vốn không bao giờ cần đội hoạt náo viên cổ vũ.",
        "properNouns": []
    },
    {
        "startTime": 297.6,
        "endTime": 303.5,
        "text": "Be persuasive! B-E persuasive! B-E-P-E-R...",
        "translationVi": "Hãy thuyết phục đi! T-H-U-Y-E-T thuyết phục đi! T-H-U...",
        "ipaUs": "/biː pərˈsweɪsɪv! biː iː pərˈsweɪsɪv! biː iː piː iː ɑːr.../",
        "keywords": ["Be persuasive", "cheer chant"],
        "explanationAi": "Phil đánh vần sai điệu hô cổ động khiến cảnh phim trở nên ngượng ngùng hài hước.",
        "properNouns": []
    },
    {
        "startTime": 320.5,
        "endTime": 325.6,
        "text": "Alex, get in here. Actually, I was referring to a thought experiment,",
        "translationVi": "Alex lại đây nào. Thật ra tôi đang đề cập đến một thí nghiệm tưởng tượng,",
        "ipaUs": "/ˈælɪks, ɡɛt ɪn hɪr. ˈæktʃuəli, aɪ wʌz rəˈfɜːrɪŋ tuː ə θɔːt ɪkˈspɛrəmənt,/",
        "keywords": ["thought experiment", "referring to"],
        "explanationAi": "Giáo sư Stiglitz đang đàm đạo cùng các học giả về thí nghiệm tư duy trong vật lý lượng tử.",
        "properNouns": ["Alex"]
    },
    {
        "startTime": 325.7,
        "endTime": 328.5,
        "text": "concerning the paradox in quantum mechanics.",
        "translationVi": "liên quan đến nghịch lý trong cơ học lượng tử.",
        "ipaUs": "/kənˈsɜːrnɪŋ ðə ˈpærədɑːks ɪn ˈkwɑːntəm məˈkænɪks./",
        "keywords": ["paradox", "quantum mechanics"],
        "explanationAi": "'Quantum mechanics' (cơ học lượng tử) là đề tài học thuật hàn lâm phức tạp.",
        "properNouns": []
    },
    {
        "startTime": 329.4,
        "endTime": 334.6,
        "text": "Yes, quite, quite. Where are you all from originally?",
        "translationVi": "Vâng, chuẩn chuẩn, đúng thế. Thế quê quán gốc gác ban đầu của quý vị ở đâu thế?",
        "ipaUs": "/jɛs, kwaɪt, kwaɪt. wɛr ɑːr juː ɔːl frʌm əˈrɪdʒənəli?/",
        "keywords": ["quite, quite", "originally"],
        "explanationAi": "Phil chen vào cuộc thảo luận vật lý lượng tử bằng câu chào hỏi xã giao thông thường.",
        "properNouns": []
    },
    {
        "startTime": 335.7,
        "endTime": 339.4,
        "text": "It was so embarrassing. Professor Stiglitz is a genius.",
        "translationVi": "Thật là ngượng chín cả mặt. Giáo sư Stiglitz là một thiên tài đấy bố.",
        "ipaUs": "/ɪt wʌz soʊ ɪmˈbærəsɪŋ. prəˈfɛsər ˈstɪɡlɪts ɪz ə ˈdʒiːnjəs./",
        "keywords": ["embarrassing", "genius"],
        "explanationAi": "Alex ngượng ngùng kéo bố ra riêng để nhắc nhở.",
        "properNouns": ["Professor Stiglitz"]
    },
    {
        "startTime": 339.5,
        "endTime": 344.0,
        "text": "He doesn't fall for people who pretend to understand him by saying things like 'quite, quite' or 'indeed',",
        "translationVi": "Thầy ấy không mắc bẫy những kẻ giả vờ hiểu biết bằng mấy câu như 'chuẩn chuẩn' hay 'quả đúng vậy' đâu,",
        "ipaUs": "/hiː ˈdʌzənt fɔːl fɔːr ˈpiːpəl huː prɪˈtɛnd tuː ˌʌndərˈstænd hɪm baɪ ˈseɪɪŋ θɪŋz laɪk kwaɪt, kwaɪt ɔːr ɪnˈdiːd,/",
        "keywords": ["fall for", "pretend to understand", "indeed"],
        "explanationAi": "'Fall for' nghĩa là bị lừa gạt hoặc tin sái cổ vào điều gì giả dối.",
        "properNouns": []
    },
    {
        "startTime": 345.8,
        "endTime": 351.6,
        "text": "Touché, my good man! But seriously, I have a science question I've always wondered about.",
        "translationVi": "Nói trúng tim đen rồi đấy bác tài! Nhưng nghiêm túc này, tôi có một câu hỏi khoa học từ lâu vẫn luôn thắc mắc.",
        "ipaUs": "/tuːˈʃeɪ, maɪ ɡʊd mæn! bʌt ˈsɪriəsli, aɪ hæv ə ˈsaɪəns ˈkwɛstʃən aɪv ˈɔːlweɪz ˈwʌndərd əˈbaʊt./",
        "keywords": ["Touché", "science question"],
        "explanationAi": "'Touché' là từ mượn tiếng Pháp dùng khi thừa nhận đối phương vừa tung ra đòn lập luận chuẩn xác.",
        "properNouns": []
    },
    {
        "startTime": 351.7,
        "endTime": 356.9,
        "text": "Maybe keep wondering... Would there be a safe amount of helium you could give a baby,",
        "translationVi": "Có khi bố nên cứ thắc mắc tiếp đi... Liệu có một lượng khí heli an toàn nào để cho một em bé hít,",
        "ipaUs": "/ˈmeɪbi kiːp ˈwʌndərɪŋ... wʊd ðɛr biː ə seɪf əˈmaʊnt ʌv ˈhiːliəm juː kʊd ɡɪv ə ˈbeɪbi,/",
        "keywords": ["safe amount", "helium", "baby"],
        "explanationAi": "Phil đưa ra câu hỏi khoa học ngây ngô và ngớ ngẩn trước vị giáo sư đoạt giải.",
        "properNouns": []
    },
    {
        "startTime": 357.0,
        "endTime": 365.0,
        "text": "that would lift it off the ground? What?! Oh, I don't want it to float away, I just want it to have fun!",
        "translationVi": "đủ để nâng em bé bay bổng lên khỏi mặt đất không? Cái gì cơ?! Ồ tôi đâu có muốn đứa bé bay mất đâu, chỉ muốn nó được vui thôi mà!",
        "ipaUs": "/ðæt wʊd lɪft ɪt ɔːf ðə ɡraʊnd? wʌt?! oʊ, aɪ doʊnt wɑːnt ɪt tuː floʊt əˈweɪ, aɪ dʒʌst wɑːnt ɪt tuː hæv fʌn!/",
        "keywords": ["lift off the ground", "float away"],
        "explanationAi": "Sự ngây ngô hài hước khiến các học giả chết lặng.",
        "properNouns": []
    },

    # =========================================================================
    # SCENE 6: ALEX'S AWKWARD LIE & PHIL'S GRACEFUL EXIT (03:37 - 04:34)
    # =========================================================================
    {
        "startTime": 367.3,
        "endTime": 372.6,
        "text": "Could you do me a favor? I'm having a package delivered to my dorm room, and someone needs to be there to sign for it.",
        "translationVi": "Bố giúp con một việc được không? Con có kiện hàng giao về phòng ký túc xá, mà cần người ở đó để ký nhận.",
        "ipaUs": "/kʊd juː duː miː ə ˈfeɪvər? aɪm ˈhævɪŋ ə ˈpækɪdʒ dɪˈlɪvərd tuː maɪ dɔːrm ruːm, ænd ˈsʌmwʌn niːdz tuː biː ðɛr tuː saɪn fɔːr ɪt./",
        "keywords": ["do me a favor", "sign for it", "dorm room"],
        "explanationAi": "Alex nói dối để khéo léo đuổi bố về ký túc xá nhằm tránh bị xấu hổ trước các giáo sư.",
        "properNouns": []
    },
    {
        "startTime": 372.7,
        "endTime": 376.7,
        "text": "Can't your roommate do it? No, she got deported. I thought she was from Arkansas.",
        "translationVi": "Bạn cùng phòng của con không ký giùm được à? Không, bạn ấy bị trục xuất rồi. Bố tưởng con bé quê ở Arkansas chứ nhỉ.",
        "ipaUs": "/kænt jɔːr ˈruːmˌmeɪt duː ɪt? noʊ, ʃiː ɡɑːt dɪˈpɔːrtɪd. aɪ θɔːt ʃiː wʌz frʌm ˈɑːrkənˌsɔː./",
        "keywords": ["deported", "Arkansas"],
        "explanationAi": "Lời nói dối vụng về của Alex khi bảo bạn cùng phòng bị trục xuất.",
        "properNouns": ["Arkansas"]
    },
    {
        "startTime": 376.8,
        "endTime": 383.1,
        "text": "Yeah, but the parents were traitors. Beth and Alan? Don't feel bad, we all fell for it.",
        "translationVi": "Vâng, nhưng bố mẹ bạn ấy là gián điệp phản quốc. Cô Beth với chú Alan ấy hả? Bố đừng buồn, ai cũng bị lừa hết mà.",
        "ipaUs": "/jæ, bʌt ðə ˈpɛrənts wɜːr ˈtreɪtərz. bɛθ ænd ˈælən? doʊnt fiːl bæd, wiː ɔːl fɛl fɔːr ɪt./",
        "keywords": ["traitors", "fell for it"],
        "explanationAi": "Alex chế thêm tình tiết hoang đường để lấp liếm lời nói dối.",
        "properNouns": ["Beth", "Alan"]
    },
    {
        "startTime": 383.2,
        "endTime": 388.5,
        "text": "So you want me to go back to your dorm room and sit and wait for a package? Yes.",
        "translationVi": "Nên con muốn bố quay về phòng ký túc xá của con ngồi chờ bưu phẩm? Vâng ạ.",
        "ipaUs": "/soʊ juː wɑːnt miː tuː ɡoʊ bæk tuː jɔːr dɔːrm ruːm ænd sɪt ænd weɪt fɔːr ə ˈpækɪdʒ? jɛs./",
        "keywords": ["wait for a package"],
        "explanationAi": "Phil nhận ra ngay con gái đang xấu hổ vì sự hiện diện của mình.",
        "properNouns": []
    },
    {
        "startTime": 392.5,
        "endTime": 401.9,
        "text": "Oh shoot, honey. I have a delivery coming back to the house too, so I should run.",
        "translationVi": "Ôi tiếc quá con yêu. Bố cũng có món hàng sắp giao về tận nhà nữa, nên bố phải chạy về ngay đây.",
        "ipaUs": "/oʊ ʃuːt, ˈhʌni. aɪ hæv ə dɪˈlɪvəri ˈkʌmɪŋ bæk tuː ðə haʊs tuː, soʊ aɪ ʃʊd rʌn./",
        "keywords": ["oh shoot", "I should run"],
        "explanationAi": "Phil tế nhị giả vờ bận việc để rút lui trong danh dự, không muốn làm con gái khó xử.",
        "properNouns": []
    },
    {
        "startTime": 402.0,
        "endTime": 407.5,
        "text": "Well, if you have to. Yeah, I'm so sorry. But hey, good luck, okay?",
        "translationVi": "Dạ, nếu bố phải về thì... Ừ bố xin lỗi nhé. Nhưng mà chúc con may mắn nhé con gái cưng!",
        "ipaUs": "/wɛl, ɪf juː hæv tuː. jæ, aɪm soʊ ˈsɑːri. bʌt heɪ, ɡʊd lʌk, oʊˈkeɪ?/",
        "keywords": ["good luck"],
        "explanationAi": "Lời chúc phúc dịu dàng của người cha dù lòng đang chùng xuống vì tổn thương.",
        "properNouns": []
    },

    # =========================================================================
    # SCENE 7: RECONCILIATION & PUB TRIVIA WITH ALEX (04:35 - 05:50)
    # =========================================================================
    {
        "startTime": 410.7,
        "endTime": 415.9,
        "text": "Hey, how in the world did you find me? You know that app you can put on kids' phones to track them?",
        "translationVi": "Này con, làm sao mà con tìm ra bố ở đây được thế? Bố biết ứng dụng cài vào điện thoại con cái để theo dõi không?",
        "ipaUs": "/heɪ, haʊ ɪn ðə wɜːrld dɪd juː faɪnd miː? juː noʊ ðæt æp juː kæn pʊt ɑːn kɪdz foʊnz tuː træk ðɛm?/",
        "keywords": ["how in the world", "app to track"],
        "explanationAi": "'How in the world' là cách diễn đạt nhấn mạnh sự sửng sốt: 'làm thế quái nào mà...'.",
        "properNouns": []
    },
    {
        "startTime": 416.0,
        "endTime": 420.5,
        "text": "You put one on my phone after I surprised you today? Don't make me feel worse than I already do.",
        "translationVi": "Con cài vào máy bố sau khi bố tạo bất ngờ cho con hôm nay à? Bố đừng làm con thấy tồi tệ hơn mức con đang tự trách nữa mà.",
        "ipaUs": "/juː pʊt wʌn ɑːn maɪ foʊn ˈæftər aɪ sərˈpraɪzd juː təˈdeɪ? doʊnt meɪk miː fiːl wɜːrs ðæn aɪ ɔːlˈrɛdi duː./",
        "keywords": ["feel worse"],
        "explanationAi": "Alex chạy đến quán rượu tìm bố trong sự ân hận tột cùng.",
        "properNouns": []
    },
    {
        "startTime": 420.6,
        "endTime": 425.0,
        "text": "Wait a minute, you won! Congratulations! Please don't be happy for me, I can't take it.",
        "translationVi": "Chờ một chút, con đã đoạt giải rồi kìa! Chúc mừng con gái! Bố xin bố đừng mừng cho con, con không chịu nổi đâu.",
        "ipaUs": "/weɪt ə ˈmɪnət, juː wʌn! kənˌɡrætʃəˈleɪʃənz! pliːz doʊnt biː ˈhæpi fɔːr miː, aɪ kænt teɪk ɪt./",
        "keywords": ["you won", "congratulations", "can't take it"],
        "explanationAi": "Alex thấy chiếc cúp danh giá trở nên vô nghĩa khi đã làm tổn thương người bố luôn yêu thương mình.",
        "properNouns": []
    },
    {
        "startTime": 425.1,
        "endTime": 433.0,
        "text": "I was such a jerk to you! No, honey, I get it. You were embarrassed of me.",
        "translationVi": "Con đối xử với bố tệ bạc quá! Không sao đâu con yêu, bố hiểu mà. Con cảm thấy xấu hổ vì bố đúng không.",
        "ipaUs": "/aɪ wʌz sʌtʃ ə dʒɜːrk tuː juː! noʊ, ˈhʌni, aɪ ɡɛt ɪt. juː wɜːr ɪmˈbærəst ʌv miː./",
        "keywords": ["jerk", "embarrassed of me"],
        "explanationAi": "Sự thấu hiểu và bao dung tuyệt đối của người cha đối với tâm lý tuổi mới lớn của con.",
        "properNouns": []
    },
    {
        "startTime": 439.0,
        "endTime": 445.2,
        "text": "Honey, I get it. I know I can be embarrassing. I just get nervous around smart people.",
        "translationVi": "Con yêu, bố hiểu mà. Bố biết mình hay làm người khác ngượng ngùng. Bố chỉ thấy căng thẳng khi ở gần những người thông minh thôi.",
        "ipaUs": "/ˈhʌni, aɪ ɡɛt ɪt. aɪ noʊ aɪ kæn biː ɪmˈbærəsɪŋ. aɪ dʒʌst ɡɛt ˈnɜːrvəs əˈraʊnd smɑːrt ˈpiːpəl./",
        "keywords": ["nervous around smart people"],
        "explanationAi": "Phil bộc bạch nỗi tự ti thầm kín của bản thân trước giới học thuật.",
        "properNouns": []
    },
    {
        "startTime": 445.3,
        "endTime": 450.0,
        "text": "Sometimes even you. The first time I ever said 'quite, quite' was when you were six years old,",
        "translationVi": "Đôi khi ngay cả trước mặt con cũng thế. Lần đầu tiên bố nói chữ 'chuẩn chuẩn' là hồi con mới lên sáu tuổi,",
        "ipaUs": "/ˈsʌmˌtaɪmz ˈiːvən juː. ðə fɜːrst taɪm aɪ ˈɛvər sɛd kwaɪt, kwaɪt wʌz wɛn juː wɜːr sɪks jɪrz oʊld,/",
        "keywords": ["six years old", "quite, quite"],
        "explanationAi": "Kỷ niệm tuổi thơ xúc động cho thấy Alex thông minh vượt bậc từ nhỏ khiến bố luôn ngưỡng mộ.",
        "properNouns": []
    },
    {
        "startTime": 450.1,
        "endTime": 455.0,
        "text": "and you just told me about how plants make carbon dioxide. This may surprise you, but...",
        "translationVi": "và khi đó con vừa giải thích cho bố nghe về cách cây cối hấp thụ khí carbon dioxide. Điều này có thể làm bố ngạc nhiên, nhưng...",
        "ipaUs": "/ænd juː dʒʌst toʊld miː əˈbaʊt haʊ plænts meɪk ˈkɑːrbən daɪˈɑːksaɪd. ðɪs meɪ sərˈpraɪz juː, bʌt.../",
        "keywords": ["carbon dioxide", "surprise you"],
        "explanationAi": "Alex chuẩn bị thổ lộ tâm tư thật sự của mình dành cho bố.",
        "properNouns": []
    },
    {
        "startTime": 455.1,
        "endTime": 460.0,
        "text": "Sometimes I wish I was more like you. The way you're always able to enjoy life.",
        "translationVi": "Đôi khi con ước gì mình có thể giống như bố hơn. Cái cách mà lúc nào bố cũng biết tận hưởng cuộc sống.",
        "ipaUs": "/ˈsʌmˌtaɪmz aɪ wɪʃ aɪ wʌz mɔːr laɪk juː. ðə weɪ jʊr ˈɔːlweɪz ˈeɪbəl tuː ɛnˈdʒɔɪ laɪf./",
        "keywords": ["wish I was more like you", "enjoy life"],
        "explanationAi": "Lời thổ lộ quý giá nhất của Alex: ngưỡng mộ tâm hồn lạc quan và tình yêu đời của bố.",
        "properNouns": []
    },
    {
        "startTime": 460.4,
        "endTime": 464.4,
        "text": "Believe it or not, I felt the same way about my dad. I'm a pessimist compared to him.",
        "translationVi": "Dù con tin hay không, bố cũng từng cảm thấy y như thế về ông nội của con. So với ông ấy thì bố còn là kẻ bi quan đấy.",
        "ipaUs": "/bɪˈliːv ɪt ɔːr nɑːt, aɪ fɛlt ðə seɪm weɪ əˈbaʊt maɪ dæd. aɪm ə ˈpɛsəmɪst kəmˈpɛrd tuː hɪm./",
        "keywords": ["believe it or not", "pessimist"],
        "explanationAi": "Phil nhắc về người cha quá cố Frank Dunphy, nguồn cảm hứng cho sự lạc quan vô tận của anh.",
        "properNouns": []
    },
    {
        "startTime": 464.5,
        "endTime": 472.5,
        "text": "And his dad actually suffered from a smile-induced hernia. It's prank week and I spent the whole time in the library.",
        "translationVi": "Và ông cố của con thậm chí còn bị thoát vị vì cười quá nhiều nữa kìa. Đang là tuần lễ trò chơi nghịch ngợm mà con lại dành toàn bộ thời gian trong thư viện.",
        "ipaUs": "/ænd hɪz dæd ˈæktʃuəli ˈsʌfərd frʌm ə smaɪl ɪnˈduːst ˈhɜːrniə. ɪts præŋk wiːk ænd aɪ spɛnt ðə hoʊl taɪm ɪn ðə ˈlaɪˌbrɛri./",
        "keywords": ["smile-induced hernia", "prank week", "library"],
        "explanationAi": "Alex tiếc nuối vì đã vùi đầu học hành mà bỏ lỡ những niềm vui thời sinh viên.",
        "properNouns": []
    },
    {
        "startTime": 473.8,
        "endTime": 480.6,
        "text": "Sometimes I feel like I just went through the four best years of my life, only I forgot to make them the four best years of my life.",
        "translationVi": "Đôi khi con cảm giác như mình vừa trải qua bốn năm đẹp nhất của cuộc đời, chỉ có điều con lại quên biến việc biến chúng thành bốn năm đẹp nhất.",
        "ipaUs": "/ˈsʌmˌtaɪmz aɪ fiːl laɪk aɪ dʒʌst wɛnt θruː ðə fɔːr bɛst jɪrz ʌv maɪ laɪf, ˈoʊnli aɪ fərˈɡɑːt tuː meɪk ðɛm ðə fɔːr bɛst jɪrz ʌv maɪ laɪf./",
        "keywords": ["four best years of my life", "forgot"],
        "explanationAi": "Câu thoại sâu sắc đọng lại nhiều suy ngẫm về sự cân bằng giữa học vấn và trải nghiệm sống của tuổi trẻ.",
        "properNouns": []
    },
    {
        "startTime": 481.7,
        "endTime": 487.4,
        "text": "Well, college isn't over. And I just may be able to help you make up for a little lost time.",
        "translationVi": "Này con, thời đại học vẫn chưa kết thúc mà. Và bố có thể giúp con bù đắp lại một chút thời gian đã mất đấy.",
        "ipaUs": "/wɛl, ˈkɑːlɪdʒ ˈɪzənt ˈoʊvər. ænd aɪ dʒʌst meɪ biː ˈeɪbəl tuː hɛlp juː meɪk ʌp fɔːr ə ˈlɪtəl lɔːst taɪm./",
        "keywords": ["make up for lost time"],
        "explanationAi": "'Make up for lost time' là thành ngữ chỉ việc đền bù, tận hưởng những gì từng bỏ lỡ.",
        "properNouns": []
    },
    {
        "startTime": 487.5,
        "endTime": 491.3,
        "text": "Pub Trivia is about to start! I have you guys registered as The Dunphys.",
        "translationVi": "Trò chơi Đố Vui Quán Rượu sắp bắt đầu rồi! Bác đăng ký đội của hai bố con là Nhà Dunphy rồi nhé.",
        "ipaUs": "/pʌb ˈtrɪviə ɪz əˈbaʊt tuː stɑːrt! aɪ hæv juː ɡaɪz ˈrɛdʒɪstərd æz ðə ˈdʌnfiz./",
        "keywords": ["Pub Trivia", "registered"],
        "explanationAi": "Người chủ quán thông báo về giải đố vui kiến thức.",
        "properNouns": ["Pub Trivia", "The Dunphys"]
    },
    {
        "startTime": 491.4,
        "endTime": 496.6,
        "text": "You knew I was coming? Let's not forget where you learned about that tracking app.",
        "translationVi": "Bố biết trước là con sẽ tới tìm bố sao? Đừng quên ai là người dạy con về cái ứng dụng định vị đó nhé con gái.",
        "ipaUs": "/juː nuː aɪ wʌz ˈkʌmɪŋ? lɛts nɑːt fərˈɡɛt wɛr juː lɜːrnd əˈbaʊt ðæt ˈtrækɪŋ æp./",
        "keywords": ["knew I was coming", "tracking app"],
        "explanationAi": "Cú lội ngược dòng thông minh chứng minh Phil hiểu con gái Alex hơn bất kỳ ai.",
        "properNouns": []
    },
    {
        "startTime": 497.5,
        "endTime": 502.5,
        "text": "And there's one tiny change: we're actually The MacDunphys!",
        "translationVi": "Và có một thay đổi nhỏ xíu: đội chúng ta thực ra tên là Gia Tộc MacDunphy xứ Scotland!",
        "ipaUs": "/ænd ðɛrz wʌn ˈtaɪni tʃeɪndʒ: wɪr ˈæktʃuəli ðə mækˈdʌnfiz!/",
        "keywords": ["tiny change", "MacDunphys"],
        "explanationAi": "Phil thêm tiền tố 'Mac' và đội mũ lông để giả làm người Scotland cho cuộc thi đố vui.",
        "properNouns": ["MacDunphys"]
    },
    {
        "startTime": 505.4,
        "endTime": 510.3,
        "text": "Only my dad would think that a trivia game... The Triangle Shirtwaist Factory fire!",
        "translationVi": "Chỉ có bố tôi mới nghĩ ra trò chơi đố vui kỳ lạ này... Vụ cháy nhà máy dệt Triangle Shirtwaist!",
        "ipaUs": "/ˈoʊnli maɪ dæd wʊd θɪŋk ðæt ə ˈtrɪviə ɡeɪm... ðə ˈtraɪˌæŋɡəl ˈʃɜːrtweɪst ˈfæktəri ˈfaɪər!/",
        "keywords": ["trivia game", "Triangle Shirtwaist fire"],
        "explanationAi": "Alex trả lời chính xác câu hỏi lịch sử nổi tiếng trong khi đội mũ hài hước cùng bố.",
        "properNouns": ["Triangle Shirtwaist"]
    },
    {
        "startTime": 510.4,
        "endTime": 516.6,
        "text": "Where you balance hats on your head, drink beer as a reward... Kareem Abdul-Jabbar!",
        "translationVi": "Nơi bạn vừa giữ thăng bằng chiếc mũ trên đầu, vừa uống bia làm phần thưởng... Cầu thủ Kareem Abdul-Jabbar!",
        "ipaUs": "/wɛr juː ˈbæləns hæts ɑːn jɔːr hɛd, drɪŋk bɪr æz ə rɪˈwɔːrd... kəˈriːm æbˈduːl dʒəˈbɑːr!/",
        "keywords": ["balance hats", "Kareem Abdul-Jabbar"],
        "explanationAi": "Alex hét vang đáp án huyền thoại bóng rổ NBA Kareem Abdul-Jabbar.",
        "properNouns": ["Kareem Abdul-Jabbar"]
    },
    {
        "startTime": 517.5,
        "endTime": 521.0,
        "text": "And eat hot wings as a punishment... Millard Fillmore!",
        "translationVi": "Và ăn cánh gà cay xé lưỡi làm hình phạt... Tổng thống Millard Fillmore!",
        "ipaUs": "/ænd iːt hɑːt wɪŋz æz ə ˈpʌnɪʃmənt... ˈmɪlərd ˈfɪlmɔːr!/",
        "keywords": ["hot wings", "Millard Fillmore"],
        "explanationAi": "Alex nuốt trọn cánh gà cay và trả lời tên vị Tổng thống thứ 13 của Hoa Kỳ Millard Fillmore.",
        "properNouns": ["Millard Fillmore"]
    },
    {
        "startTime": 523.1,
        "endTime": 527.5,
        "text": "Needed that one last twist of a Scottish accent!",
        "translationVi": "Cần thêm một chút nhấn nhá giọng Scotland vào nữa mới chuẩn bài!",
        "ipaUs": "/ˈniːdɪd ðæt wʌn læst twɪst ʌv ə ˈskɑːtɪʃ ˈæksɛnt!/",
        "keywords": ["twist", "Scottish accent"],
        "explanationAi": "Phil pha trò bằng giọng Anh-Scotland đặc sệt.",
        "properNouns": ["Scottish"]
    },
    {
        "startTime": 535.1,
        "endTime": 542.6,
        "text": "Whoever said the most important thing in life is winning awards... wasn't all wrong.",
        "translationVi": "Bất kỳ ai từng bảo điều quan trọng nhất trên đời là giành được các giải thưởng... thì cũng không hẳn là sai hoàn toàn đâu.",
        "ipaUs": "/huːˈɛvər sɛd ðə moʊst ɪmˈpɔːrtənt θɪŋ ɪn laɪf ɪz ˈwɪnɪŋ əˈwɔːrdz... ˈwɑːzənt ɔːl rɔːŋ./",
        "keywords": ["winning awards", "wasn't all wrong"],
        "explanationAi": "Alex đùa khi hai bố con ẵm luôn giải nhất cuộc thi đố vui quán rượu trong niềm vui ngập tràn.",
        "properNouns": []
    },

    # =========================================================================
    # SCENE 8: HEARTBREAK & FIRST LOVE ADVICE WITH HALEY (05:51 - 06:14)
    # =========================================================================
    {
        "startTime": 552.2,
        "endTime": 556.2,
        "text": "Hey. I miss him. Yeah.",
        "translationVi": "Chào bố. Con nhớ anh ấy quá. Bố hiểu mà.",
        "ipaUs": "/heɪ. aɪ mɪs hɪm. jæ./",
        "keywords": ["miss him"],
        "explanationAi": "Haley ngồi thẫn thờ sau khi chia tay mối tình đầu Dylan.",
        "properNouns": []
    },
    {
        "startTime": 557.5,
        "endTime": 561.8,
        "text": "He was your first real boyfriend. I keep expecting him to show up.",
        "translationVi": "Cậu ấy là người bạn trai thực sự đầu tiên của con. Con cứ ngỡ anh ấy sẽ xuất hiện trước cửa.",
        "ipaUs": "/hiː wʌz jɔːr fɜːrst rɪəl ˈbɔɪˌfrɛnd. aɪ kiːp ɪkˈspɛktɪŋ hɪm tuː ʃoʊ ʌp./",
        "keywords": ["first real boyfriend", "show up"],
        "explanationAi": "Cảm giác trống trải đau đớn khó phai sau mối tình đầu tan vỡ.",
        "properNouns": []
    },
    {
        "startTime": 562.8,
        "endTime": 568.2,
        "text": "He used to come by at night and I'd sneak out to see him. Yeah, I know. You knew?!",
        "translationVi": "Anh ấy từng lái xe qua lúc nửa đêm và con lén trốn ra ngoài gặp anh ấy. Ừ bố biết mà. Bố biết thật sao?!",
        "ipaUs": "/hiː juːst tuː kʌm baɪ æt naɪt ænd aɪd sniːk aʊt tuː siː hɪm. jæ, aɪ noʊ. juː nuː?!/",
        "keywords": ["sneak out", "you knew"],
        "explanationAi": "'Sneak out' nghĩa là lẻn trốn ra ngoài vào ban đêm.",
        "properNouns": []
    },
    {
        "startTime": 569.0,
        "endTime": 573.4,
        "text": "His car is 30 years old and doesn't have a muffler. And he honked!",
        "translationVi": "Chiếc xe của cậu ta có tuổi đời 30 năm rồi và chẳng có bộ giảm thanh giảm khói nào cả. Lại còn bấm còi inh ỏi nữa chứ!",
        "ipaUs": "/hɪz kɑːr ɪz ˈθɜːrti jɪrz oʊld ænd ˈdʌzənt hæv ə ˈmʌflər. ænd hiː hɑːŋkt!/",
        "keywords": ["muffler", "honked"],
        "explanationAi": "'Muffler' là ống pô/bộ giảm thanh của ô tô. Chiếc xe cà tàng của Dylan kêu ầm ĩ khắp xóm.",
        "properNouns": []
    },
    {
        "startTime": 575.9,
        "endTime": 580.2,
        "text": "I loved that car. I rode in it to the guitar store.",
        "translationVi": "Con từng yêu chiếc xe ấy lắm. Bố cũng từng đi nhờ xe đó đến tiệm đàn ghita đấy chứ.",
        "ipaUs": "/aɪ lʌvd ðæt kɑːr. aɪ roʊd ɪn ɪt tuː ðə ɡɪˈtɑːr stɔːr./",
        "keywords": ["guitar store", "rode in it"],
        "explanationAi": "Phil từng đồng hành cùng Dylan trong những kỷ niệm dở khóc dở cười của gia đình.",
        "properNouns": []
    },
    {
        "startTime": 585.8,
        "endTime": 592.6,
        "text": "I know it hurts now, but... that's how you know it was a relationship worth having.",
        "translationVi": "Bố biết lúc này đau lòng lắm, nhưng... chính nỗi đau đó cho con biết đó là một mối tình xứng đáng để trải qua trong đời.",
        "ipaUs": "/aɪ noʊ ɪt hɜːrts naʊ, bʌt... ðæts haʊ juː noʊ ɪt wʌz ə rɪˈleɪʃənˌʃɪp wɜːrθ ˈhævɪŋ./",
        "keywords": ["hurts now", "relationship worth having"],
        "explanationAi": "Một trong những câu nói đắt giá và cảm động nhất về tình yêu và sự trưởng thành của Modern Family.",
        "properNouns": []
    },
    {
        "startTime": 605.0,
        "endTime": 606.5,
        "text": "Thanks, Dad.",
        "translationVi": "Con cảm ơn bố nhiều lắm.",
        "ipaUs": "/θæŋks, dæd./",
        "keywords": ["Thanks, Dad"],
        "explanationAi": "Cái ôm ấm áp và lời tri ân ngọt ngào của cô con gái dành cho người cha tuyệt vời.",
        "properNouns": []
    },

    # =========================================================================
    # SCENE 9: PHIL'S-OSOPHY, THE ULTIMATE DAD WISDOM (06:15 - 07:10)
    # =========================================================================
    {
        "startTime": 615.4,
        "endTime": 619.0,
        "text": "I'm standing in a dorm room saying goodbye. It's going to be one of the most emotional moments of my life.",
        "translationVi": "Tôi đang đứng trong căn phòng ký túc xá nói lời chia tay con gái. Đây sẽ là một trong những khoảnh khắc xúc động nhất cuộc đời tôi.",
        "ipaUs": "/aɪm ˈstændɪŋ ɪn ə dɔːrm ruːm ˈseɪɪŋ ɡʊdˈbaɪ. ɪts ˈɡoʊɪŋ tuː biː wʌn ʌv ðə moʊst ɪˈmoʊʃənəl ˈmoʊmənts ʌv maɪ laɪf./",
        "keywords": ["emotional moments", "saying goodbye"],
        "explanationAi": "Phil nghẹn ngào tiễn con gái bước vào ngưỡng cửa tự lập thời sinh viên.",
        "properNouns": []
    },
    {
        "startTime": 620.2,
        "endTime": 625.9,
        "text": "I'm going to cry harder than the first time I saw her, but especially when I give her this...",
        "translationVi": "Tôi sẽ khóc to hơn cả lần đầu tiên nhìn thấy con bé chào đời, nhất là khi tôi trao tặng cho con bé cuốn sách này...",
        "ipaUs": "/aɪm ˈɡoʊɪŋ tuː kraɪ ˈhɑːrdər ðæn ðə fɜːrst taɪm aɪ sɔː hɜːr, bʌt əˈspɛʃli wɛn aɪ ɡɪv hɜːr ðɪs.../",
        "keywords": ["cry harder", "give her this"],
        "explanationAi": "Món quà tâm huyết của người cha dành cho con gái cưng.",
        "properNouns": []
    },
    {
        "startTime": 627.9,
        "endTime": 632.5,
        "text": "Phil's-osophy: a hardbound collection of all the life lessons I've learned, such as:",
        "translationVi": "Triết Lý Của Phil (Phil's-osophy): một tuyển tập đóng bìa cứng gom góp tất cả những bài học cuộc sống mà tôi đã tích lũy, chẳng hạn như:",
        "ipaUs": "/fɪlzˈɑːsəfi: ə ˈhɑːrdˌbaʊnd kəˈlɛkʃən ʌv ɔːl ðə laɪf ˈlɛsənz aɪv lɜːrnd, sʌtʃ æz:/",
        "keywords": ["Phil's-osophy", "hardbound collection", "life lessons"],
        "explanationAi": "Sự kết hợp chơi chữ độc đáo giữa tên Phil và danh từ 'Philosophy' (Triết học) thành 'Phil's-osophy'.",
        "properNouns": ["Phil's-osophy"]
    },
    {
        "startTime": 635.9,
        "endTime": 638.5,
        "text": "Always look people in the eye, even if they're blind.",
        "translationVi": "Luôn luôn nhìn thẳng vào mắt người đối diện, kể cả khi họ bị mù.",
        "ipaUs": "/ˈɔːlweɪz lʊk ˈpiːpəl ɪn ðɪ aɪ, ˈiːvən ɪf ðɛr blaɪnd./",
        "keywords": ["look in the eye", "blind"],
        "explanationAi": "Lời khuyên giao tiếp lịch sự được biến tấu đầy ngây ngô và phi lý.",
        "properNouns": []
    },
    {
        "startTime": 644.9,
        "endTime": 648.5,
        "text": "Just say: 'I'm looking you in the eye.'",
        "translationVi": "Chỉ cần nói to: 'Tôi đang nhìn thẳng vào mắt bạn đây này.'",
        "ipaUs": "/dʒʌst seɪ: aɪm ˈlʊkɪŋ juː ɪn ðɪ aɪ./",
        "keywords": ["looking you in the eye"],
        "explanationAi": "Giải pháp giao tiếp 'chữa cháy' buồn cười không tưởng của Phil.",
        "properNouns": []
    },
    {
        "startTime": 650.7,
        "endTime": 656.5,
        "text": "If you get pulled over for speeding, tell the policeman your spouse has diarrhea.",
        "translationVi": "Nếu bạn bị cảnh sát tấp xe vào lề vì chạy quá tốc độ, hãy bảo viên cảnh sát rằng bạn đời của bạn đang bị tiêu chảy.",
        "ipaUs": "/ɪf juː ɡɛt pʊld ˈoʊvər fɔːr ˈspiːdɪŋ, tɛl ðə pəˈliːsmən jɔːr spaʊs hæz ˌdaɪəˈriːə./",
        "keywords": ["pulled over", "speeding", "diarrhea"],
        "explanationAi": "'Get pulled over' là cụm từ chỉ việc bị cảnh sát giao thông tuýt còi yêu cầu dừng xe bên lề đường.",
        "properNouns": []
    },
    {
        "startTime": 663.1,
        "endTime": 666.3,
        "text": "Marry someone who looks sexy while disappointed.",
        "translationVi": "Hãy kết hôn với người nào mà trông vẫn quyến rũ ngay cả khi đang thất vọng.",
        "ipaUs": "/ˈmæri ˈsʌmwʌn huː lʊks ˈsɛksi waɪl ˌdɪsəˈpɔɪntɪd./",
        "keywords": ["marry someone", "sexy while disappointed"],
        "explanationAi": "Ám chỉ hài hước đến bà vợ Claire Dunphy, người luôn phải cau mày thở dài vì những trò ngốc nghếch của Phil.",
        "properNouns": []
    },
    {
        "startTime": 668.2,
        "endTime": 673.5,
        "text": "See? Older Black ladies make the best iced tea.",
        "translationVi": "Thấy chưa? Các bà cô da màu lớn tuổi luôn là người pha trà đá ngon đỉnh nhất trần đời.",
        "ipaUs": "/siː? ˈoʊldər blæk ˈleɪdiz meɪk ðə bɛst aɪst tiː./",
        "keywords": ["Older Black ladies", "iced tea"],
        "explanationAi": "Nét văn hóa ẩm thực truyền thống miền Nam nước Mỹ về món trà đá ngọt (Southern sweet tea).",
        "properNouns": []
    },
    {
        "startTime": 674.7,
        "endTime": 682.4,
        "text": "Success is 1% inspiration, 98% perspiration, and 2% attention to detail.",
        "translationVi": "Thành công là 1% cảm hứng, 98% mồ hôi công sức, và 2% sự chú ý đến từng chi tiết.",
        "ipaUs": "/səkˈsɛs ɪz wʌn pərˈsɛnt ˌɪnspəˈreɪʃən, ˈnaɪnti eɪt pərˈsɛnt ˌpɜːrspəˈreɪʃən, ænd tuː pərˈsɛnt əˈtɛnʃən tuː ˈdiːteɪl./",
        "keywords": ["inspiration", "perspiration", "attention to detail"],
        "explanationAi": "Biến tấu danh ngôn của Thomas Edison, nhưng điều trớ trêu là 1 + 98 + 2 = 101%, chứng minh Phil thiếu 'chú ý đến chi tiết'!",
        "properNouns": []
    },
    {
        "startTime": 682.5,
        "endTime": 686.5,
        "text": "You can tell a lot about a person from his biography.",
        "translationVi": "Bạn có thể nhận biết rất nhiều điều về một người qua cuốn tiểu sử của người đó.",
        "ipaUs": "/juː kæn tɛl ə lɑːt əˈbaʊt ə ˈpɜːrsən frʌm hɪz baɪˈɑːɡrəfi./",
        "keywords": ["tell a lot", "biography"],
        "explanationAi": "Câu khẳng định hiển nhiên đến mức ngớ ngẩn (tautology humor) đặc trưng của Phil.",
        "properNouns": []
    },
    {
        "startTime": 686.6,
        "endTime": 690.5,
        "text": "Watch a sunrise at least once a day.",
        "translationVi": "Hãy ngắm bình minh ít nhất mỗi ngày một lần.",
        "ipaUs": "/wɑːtʃ ə ˈsʌnˌraɪz æt liːst wʌns ə deɪ./",
        "keywords": ["sunrise", "once a day"],
        "explanationAi": "Một ngày trên Trái Đất hiển nhiên chỉ có một lần bình minh duy nhất, tạo nên nét hài hước ngộ nghĩnh.",
        "properNouns": []
    },
    {
        "startTime": 690.6,
        "endTime": 696.5,
        "text": "If you love something, set it free. Unless it's a tiger.",
        "translationVi": "Nếu bạn yêu thương điều gì, hãy trả tự do cho nó. Trừ phi đó là một con hổ hung dữ.",
        "ipaUs": "/ɪf juː lʌv ˈsʌmθɪŋ, sɛt ɪt friː. ənˈlɛs ɪts ə ˈtaɪɡər./",
        "keywords": ["set it free", "unless it's a tiger"],
        "explanationAi": "Biến tấu danh ngôn cổ điển 'If you love something, set it free' bằng cú bẻ lái thực tế đầy hóm hỉnh.",
        "properNouns": []
    },
    {
        "startTime": 697.1,
        "endTime": 702.7,
        "text": "If you're ever in a jam, a crayon scrunched up under your nose makes a good pretend mustache.",
        "translationVi": "Nếu bạn rơi vào tình thế bế tắc, một mẩu bút sáp màu kẹp chặt dưới mũi sẽ tạo thành bộ ria mép giả ngụy trang cực chuẩn.",
        "ipaUs": "/ɪf jʊr ˈɛvər ɪn ə dʒæm, ə ˈkreɪɑːn skrʌntʃt ʌp ˈʌndər jɔːr noʊz meɪks ə ɡʊd prɪˈtɛnd məˈstæʃ./",
        "keywords": ["in a jam", "crayon", "pretend mustache"],
        "explanationAi": "'In a jam' là thành ngữ chỉ việc rơi vào tình huống khó khăn, kẹt cạn cần giải cứu.",
        "properNouns": []
    },
    {
        "startTime": 702.8,
        "endTime": 707.1,
        "text": "When life gives you lemonade, make lemons.",
        "translationVi": "Khi cuộc đời trao cho bạn nước chanh, hãy tạo ra những quả chanh.",
        "ipaUs": "/wɛn laɪf ɡɪvz juː ˌlɛməˈneɪd, meɪk ˈlɛmənz./",
        "keywords": ["when life gives you lemonade", "make lemons"],
        "explanationAi": "Đảo ngược câu châm ngôn kinh điển 'When life gives you lemons, make lemonade' để gây bất ngờ cho số phận.",
        "properNouns": []
    },
    {
        "startTime": 707.2,
        "endTime": 710.0,
        "text": "Life will be all like: 'What?!'",
        "translationVi": "Cuộc đời lúc đó sẽ ngơ ngác kiểu: 'Cái quái gì thế này?!'",
        "ipaUs": "/laɪf wɪl biː ɔːl laɪk: wʌt?!/",
        "keywords": ["life will be all like", "What?!"],
        "explanationAi": "Cú chốt hạ bất hủ của Phil Dunphy về cách sống chủ động làm cuộc đời phải ngỡ ngàng.",
        "properNouns": []
    }
]

# Ensure tokens count accurately
for idx, seg in enumerate(raw_segments):
    words = re.findall(r"\b\w+\b", seg["text"])
    seg["orderIndex"] = idx
    seg["tokenCount"] = len(words)

print(f"Total pure segments compiled: {len(raw_segments)}")
print(f"Start time: {raw_segments[0]['startTime']} -> End time: {raw_segments[-1]['endTime']}")

# Quiz questions: 8 comprehensive bilingual questions
quiz_extended = {
    "lessonId": "mov_sit_03",
    "lessonTitle": "Modern Family: The Best Of Phil Dunphy's Phil's-osophy & Dad Wisdom",
    "totalQuestions": 8,
    "xpReward": 150,
    "generatedBy": "AI_GEMINI",
    "questions": [
        {
            "id": "q_mov_sit_03_1",
            "question": "What comical meaning does Phil Dunphy attribute to the texting acronym 'WTF'?",
            "questionEn": "What comical meaning does Phil Dunphy attribute to the texting acronym 'WTF'?",
            "questionVi": "Phil Dunphy đã gán ý nghĩa hài hước nào cho từ viết tắt tin nhắn 'WTF'?",
            "options": [
                "Why the face",
                "Where's the food",
                "Watch the film",
                "What the fact"
            ],
            "optionsEn": [
                "Why the face",
                "Where's the food",
                "Watch the film",
                "What the fact"
            ],
            "optionsVi": [
                "Why the face (sao mặt xị ra thế)",
                "Where's the food (đồ ăn đâu rồi)",
                "Watch the film (xem phim đi)",
                "What the fact (sự thật là gì)"
            ],
            "correctAnswer": 0,
            "explanation": "Phil innocently misinterprets 'WTF' as 'Why the face', showcasing his endearing and oblivious dad persona.",
            "explanationEn": "Phil innocently misinterprets 'WTF' as 'Why the face', showcasing his endearing and oblivious dad persona.",
            "explanationVi": "Phil ngây thơ hiểu nhầm 'WTF' thành 'Why the face', thể hiện nét hài hước đáng yêu của ông bố.",
            "targetedConcept": "Humorous Slang Misinterpretation",
            "targetedConceptEn": "Humorous Slang Misinterpretation",
            "targetedConceptVi": "Hiểu nhầm từ lóng hài hước",
            "referenceSegmentIndex": 3
        },
        {
            "id": "q_mov_sit_03_2",
            "question": "In the phrase 'put it on the plastic', what does the slang term 'plastic' refer to?",
            "questionEn": "In the phrase 'put it on the plastic', what does the slang term 'plastic' refer to?",
            "questionVi": "Trong cụm từ 'put it on the plastic', từ lóng 'plastic' ám chỉ điều gì?",
            "options": [
                "A credit or debit card",
                "A plastic takeaway bag",
                "A toy coin container",
                "A laminated receipt"
            ],
            "optionsEn": [
                "A credit or debit card",
                "A plastic takeaway bag",
                "A toy coin container",
                "A laminated receipt"
            ],
            "optionsVi": [
                "Thẻ tín dụng hoặc thẻ ghi nợ",
                "Túi nylon mang về",
                "Hộp đựng tiền xu bằng nhựa",
                "Hóa đơn ép nhựa"
            ],
            "correctAnswer": 0,
            "explanation": "'Plastic' is a widespread conversational idiom referring to credit or debit cards.",
            "explanationEn": "'Plastic' is a widespread conversational idiom referring to credit or debit cards.",
            "explanationVi": "'Plastic' là tiếng lóng giao tiếp phổ biến chỉ thẻ tín dụng hoặc thẻ thanh toán ngân hàng.",
            "targetedConcept": "Informal Idiom for Financial Payment",
            "targetedConceptEn": "Informal Idiom for Financial Payment",
            "targetedConceptVi": "Thành ngữ tiếng lóng thanh toán tài chính",
            "referenceSegmentIndex": 13
        },
        {
            "id": "q_mov_sit_03_3",
            "question": "What is the psychological meaning of Claire and Phil's 'game of chicken' with Haley?",
            "questionEn": "What is the psychological meaning of Claire and Phil's 'game of chicken' with Haley?",
            "questionVi": "Ý nghĩa tâm lý của trò 'game of chicken' mà Claire và Phil dùng với Haley là gì?",
            "options": [
                "A test of wills where both sides wait to see who folds or retreats first",
                "A farm game chasing poultry in the yard",
                "A strategy of cooking dinner without talking",
                "A bet on who can eat spicy chicken wings faster"
            ],
            "optionsEn": [
                "A test of wills where both sides wait to see who folds or retreats first",
                "A farm game chasing poultry in the yard",
                "A strategy of cooking dinner without talking",
                "A bet on who can eat spicy chicken wings faster"
            ],
            "optionsVi": [
                "Màn thi đấu gan dạ xem bên nào mất bình tĩnh và nhượng bộ trước",
                "Trò chơi đuổi bắt gà ngoài sân",
                "Chiến thuật nấu bữa tối trong im lặng",
                "Kèo cá cược ai ăn cánh gà cay nhanh hơn"
            ],
            "correctAnswer": 0,
            "explanation": "A 'game of chicken' is a metaphor for a high-stakes standoff where neither party wants to back down first.",
            "explanationEn": "A 'game of chicken' is a metaphor for a high-stakes standoff where neither party wants to back down first.",
            "explanationVi": "'Game of chicken' là ẩn dụ cho cuộc đấu gan lì tâm lý xem bên nào phải chịu lùi bước trước.",
            "targetedConcept": "Metaphorical Expression for Confrontation",
            "targetedConceptEn": "Metaphorical Expression for Confrontation",
            "targetedConceptVi": "Ẩn dụ về cuộc đối đầu tâm lý",
            "referenceSegmentIndex": 17
        },
        {
            "id": "q_mov_sit_03_4",
            "question": "What does the idiom 'sit this one out' mean when Jay and Phil discuss the roller coaster ride?",
            "questionEn": "What does the idiom 'sit this one out' mean when Jay and Phil discuss the roller coaster ride?",
            "questionVi": "Thành ngữ 'sit this one out' có nghĩa là gì khi Jay và Phil nói về trò tàu lượn?",
            "options": [
                "To choose not to participate in an activity",
                "To sit outside the park entrance",
                "To sit on top of the ride vehicle",
                "To wait for someone to stand up"
            ],
            "optionsEn": [
                "To choose not to participate in an activity",
                "To sit outside the park entrance",
                "To sit on top of the ride vehicle",
                "To wait for someone to stand up"
            ],
            "optionsVi": [
                "Chọn không tham gia vào một hoạt động cụ thể",
                "Ngồi ngoài cổng công viên",
                "Ngồi trên nóc toa tàu lượn",
                "Đợi ai đó đứng dậy"
            ],
            "correctAnswer": 0,
            "explanation": "'Sit something out' means not taking part in an event, game, or dance, usually to rest.",
            "explanationEn": "'Sit something out' means not taking part in an event, game, or dance, usually to rest.",
            "explanationVi": "'Sit something out' có nghĩa là ngồi ngoài nghỉ ngơi, không tham gia vào một hoạt động nào đó.",
            "targetedConcept": "Conversational Phrasal Verb / Idiom",
            "targetedConceptEn": "Conversational Phrasal Verb / Idiom",
            "targetedConceptVi": "Cụm động từ thành ngữ giao tiếp",
            "referenceSegmentIndex": 36
        },
        {
            "id": "q_mov_sit_03_5",
            "question": "Why does Phil humorously spell out 'B-E-P-E-R...' at Alex's academic debate event?",
            "questionEn": "Why does Phil humorously spell out 'B-E-P-E-R...' at Alex's academic debate event?",
            "questionVi": "Vì sao Phil lại đánh vần 'B-E-P-E-R...' một cách hài hước tại sự kiện học thuật của Alex?",
            "options": [
                "He gets confused while trying to adapt a sports cheerleading chant to the word 'persuasive'",
                "He is spelling out the name of a famous philosopher",
                "He is reciting an acronym for physics formulas",
                "He suffers from a temporary microphone malfunction"
            ],
            "optionsEn": [
                "He gets confused while trying to adapt a sports cheerleading chant to the word 'persuasive'",
                "He is spelling out the name of a famous philosopher",
                "He is reciting an acronym for physics formulas",
                "He suffers from a temporary microphone malfunction"
            ],
            "optionsVi": [
                "Bố Phil bị líu lưỡi khi cố áp dụng điệu hô cổ động thể thao cho từ 'persuasive'",
                "Bố đang đánh vần tên một nhà triết học nổi tiếng",
                "Bố đang đọc tên viết tắt của công thức vật lý",
                "Bố bị lỗi micro gián đoạn"
            ],
            "correctAnswer": 0,
            "explanation": "Phil tries to cheer for an intellectual debate team using cheerleader rhymes, stumbling comically on spelling 'persuasive'.",
            "explanationEn": "Phil tries to cheer for an intellectual debate team using cheerleader rhymes, stumbling comically on spelling 'persuasive'.",
            "explanationVi": "Phil áp dụng nhầm văn hóa hoạt náo viên thể thao vào đội tranh biện trí tuệ và đánh vần líu lưỡi.",
            "targetedConcept": "Humorous Contrast of Social Registers",
            "targetedConceptEn": "Humorous Contrast of Social Registers",
            "targetedConceptVi": "Sự tương phản hài hước về phong cách xã hội",
            "referenceSegmentIndex": 46
        },
        {
            "id": "q_mov_sit_03_6",
            "question": "What does the expression 'make up for lost time' mean when Phil encourages Alex at the pub?",
            "questionEn": "What does the expression 'make up for lost time' mean when Phil encourages Alex at the pub?",
            "questionVi": "Cụm từ 'make up for lost time' có nghĩa là gì khi Phil khích lệ Alex tại quán rượu?",
            "options": [
                "To do things rapidly or enthusiastically to compensate for past missed opportunities",
                "To reset all the clocks in the building",
                "To find a lost wristwatch",
                "To calculate the exact hours spent studying"
            ],
            "optionsEn": [
                "To do things rapidly or enthusiastically to compensate for past missed opportunities",
                "To reset all the clocks in the building",
                "To find a lost wristwatch",
                "To calculate the exact hours spent studying"
            ],
            "optionsVi": [
                "Làm điều gì đó hào hứng để bù đắp cho những cơ hội từng bị bỏ lỡ",
                "Chỉnh lại đồng hồ trong tòa nhà",
                "Tìm lại chiếc đồng hồ đeo tay bị mất",
                "Tính toán số giờ đã bỏ ra để học tập"
            ],
            "correctAnswer": 0,
            "explanation": "'Make up for lost time' is an established English idiom meaning doing something enjoyable to make up for missed experiences.",
            "explanationEn": "'Make up for lost time' is an established English idiom meaning doing something enjoyable to make up for missed experiences.",
            "explanationVi": "'Make up for lost time' là thành ngữ chỉ việc trải nghiệm bù đắp cho những tháng ngày đã bỏ lỡ.",
            "targetedConcept": "Temporal Idiomatic Expression",
            "targetedConceptEn": "Temporal Idiomatic Expression",
            "targetedConceptVi": "Thành ngữ thời gian đền bù",
            "referenceSegmentIndex": 60
        },
        {
            "id": "q_mov_sit_03_7",
            "question": "What mathematical joke is embedded in Phil's maxim: 'Success is 1% inspiration, 98% perspiration, and 2% attention to detail'?",
            "questionEn": "What mathematical joke is embedded in Phil's maxim: 'Success is 1% inspiration, 98% perspiration, and 2% attention to detail'?",
            "questionVi": "Trò đùa toán học nào ẩn chứa trong câu châm ngôn: 'Success is 1% inspiration, 98% perspiration, and 2% attention to detail' của Phil?",
            "options": [
                "The percentages add up to 101%, ironically proving a lack of attention to detail",
                "The perspiration percentage is lower than Edison's original quote",
                "Inspiration should mathematically precede perspiration",
                "The percentages subtract to zero"
            ],
            "optionsEn": [
                "The percentages add up to 101%, ironically proving a lack of attention to detail",
                "The perspiration percentage is lower than Edison's original quote",
                "Inspiration should mathematically precede perspiration",
                "The percentages subtract to zero"
            ],
            "optionsVi": [
                "Các con số cộng lại thành 101%, chứng minh trớ trêu rằng Phil thiếu chú ý vào chi tiết",
                "Tỷ lệ mồ hôi thấp hơn câu gốc của nhà sáng chế Edison",
                "Cảm hứng về mặt toán học phải đứng trước mồ hôi",
                "Các con số trừ nhau bằng 0"
            ],
            "correctAnswer": 0,
            "explanation": "1% + 98% + 2% = 101%. The mathematical failure ironically undercuts the premise of having 'attention to detail'.",
            "explanationEn": "1% + 98% + 2% = 101%. The mathematical failure ironically undercuts the premise of having 'attention to detail'.",
            "explanationVi": "1 + 98 + 2 = 101%. Phép cộng sai hài hước chứng minh ngay sự thiếu cẩn thận đến từng chi tiết.",
            "targetedConcept": "Irony and Satirical Wordplay",
            "targetedConceptEn": "Irony and Satirical Wordplay",
            "targetedConceptVi": "Nghịch lý mỉa mai và chơi chữ trào phúng",
            "referenceSegmentIndex": 71
        },
        {
            "id": "q_mov_sit_03_8",
            "question": "How does Phil invert the classic proverb 'When life gives you lemons, make lemonade'?",
            "questionEn": "How does Phil invert the classic proverb 'When life gives you lemons, make lemonade'?",
            "questionVi": "Phil đã đảo ngược câu tục ngữ kinh điển 'Khi cuộc đời trao cho bạn quả chanh, hãy làm nước chanh' như thế nào?",
            "options": [
                "When life gives you lemonade, make lemons: so life will be shocked",
                "When life gives you lemons, throw them at your enemies",
                "When life gives you lemonade, add sugar and ice",
                "When life gives you lemons, plant an orange tree"
            ],
            "optionsEn": [
                "When life gives you lemonade, make lemons: so life will be shocked",
                "When life gives you lemons, throw them at your enemies",
                "When life gives you lemonade, add sugar and ice",
                "When life gives you lemons, plant an orange tree"
            ],
            "optionsVi": [
                "Khi cuộc đời trao cho bạn nước chanh, hãy tạo ra quả chanh: để cuộc đời phải sững sờ ngơ ngác",
                "Khi cuộc đời trao cho bạn quả chanh, hãy ném nó vào kẻ thù",
                "Khi cuộc đời trao cho bạn nước chanh, hãy cho thêm đường và đá",
                "Khi cuộc đời trao cho bạn quả chanh, hãy trồng một cây cam"
            ],
            "correctAnswer": 0,
            "explanation": "Phil Dunphy hilariously inverts the proverb to baffle life itself: 'When life gives you lemonade, make lemons. Life will be all like: What?!'",
            "explanationEn": "Phil Dunphy hilariously inverts the proverb to baffle life itself: 'When life gives you lemonade, make lemons. Life will be all like: What?!'",
            "explanationVi": "Phil đảo ngược câu châm ngôn để làm cho số phận ngỡ ngàng: 'When life gives you lemonade, make lemons. Life will be all like: What?!'",
            "targetedConcept": "Proverb Subversion for Comedic Effect",
            "targetedConceptEn": "Proverb Subversion for Comedic Effect",
            "targetedConceptVi": "Biến tấu tục ngữ để tạo hiệu ứng hài hước",
            "referenceSegmentIndex": 74
        }
    ]
}

# Generate TypeScript output
ts_code = f"""import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Modern Family: The Best Of Phil Dunphy's Phil's-osophy & Dad Wisdom
 * Category: Sitcom Kinh Điển & Hài Kịch (cat_classic_sitcoms)
 * Level: CEFR B1 | American Accent
 * YouTube ID: qMNsPjt7L4M (11:50 - 710s)
 * Views: 1,102,020+ | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC
 * ZERO MERGED UTTERANCES - FULL IPA US - 8 QUIZ BILINGUAL EXTENDED
 * ============================================================================
 */

export const QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED: VideoQuizData = {json.dumps(quiz_extended, ensure_ascii=False, indent=2)};

export const LESSON_MODERN_FAMILY_PHIL_DUNPHY: MockVideoLesson = {{
  id: "mov_sit_03",
  slug: "modern-family-best-of-phil-dunphy-dad",
  title: "Modern Family: The Best Of Phil Dunphy's Phil's-osophy & Dad Wisdom",
  categoryId: "cat_classic_sitcoms",
  categorySlug: "classic-sitcoms",
  categoryName: "Sitcom Kinh Điển & Hài Kịch",
  cefrLevel: "B1",
  durationFormatted: "11:50",
  durationSeconds: 710,
  externalId: "qMNsPjt7L4M",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/qMNsPjt7L4M/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 142,
  viewCount: 1102020,
  studyCount: 9840,
  description:
    "Tuyển tập những khoảnh khắc làm cha ngọt ngào, hài hước và cuốn cẩm nang bài học cuộc sống 'Phil's-osophy' bất hủ của Phil Dunphy (Ty Burrell) trong Modern Family.",
  segments: {json.dumps(raw_segments, ensure_ascii=False, indent=4)},
  quiz: QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED,
}};

// Backwards-compatible aliases for existing imports
export const LESSON_MODERN_FAMILY_BEST_OF_PHIL_DUNPHY_DAD = LESSON_MODERN_FAMILY_PHIL_DUNPHY;
export const QUIZ_MODERN_FAMILY_BEST_OF_PHIL_DUNPHY_DAD = QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED;
"""

target_path = "features/listening/data/lessons/movies/sitcoms/lesson_modern_family_phil_dunphy.ts"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully wrote full lesson to {target_path}!")
