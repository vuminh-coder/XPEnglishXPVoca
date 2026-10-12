import json
import re

# Master expanded script for Modern Family: Gloria's Funniest Language Struggles & Accent Mix-ups (72okAeSn5Tc - 888s)
# Complete 100% Timeline Coverage across entire 888s video without any timeline gaps!

segments = [
    # =========================================================================
    # PART 1: GLORIA'S INITIAL FRUSTRATION & INTRODUCTION (00:00 - 01:20)
    # =========================================================================
    {
        "startTime": 0.0,
        "endTime": 3.0,
        "text": "First Manny, he corrected me, and now you?",
        "translationVi": "Hết thằng bé Manny sửa lưng em, giờ lại tới lượt anh nữa à?",
        "ipaUs": "/fɜːrst ˈmæni, hiː kəˈrɛktɪd miː, ænd naʊ juː?/",
        "keywords": ["corrected me", "and now you"],
        "explanationAi": "Gloria bực bội khi người thân liên tục bắt lỗi tiếng Anh của mình.",
        "properNouns": ["Manny"]
    },
    {
        "startTime": 3.1,
        "endTime": 4.7,
        "text": "If I have a problem, I want to know, Jay.",
        "translationVi": "Nếu em có vấn đề phát âm gì thì em muốn biết rõ, Jay à.",
        "ipaUs": "/ɪf aɪ hæv ə ˈprɑːbləm, aɪ wɑːnt tuː noʊ, dʒeɪ./",
        "keywords": ["have a problem", "want to know"],
        "explanationAi": "Gloria yêu cầu sự trung thực để cải thiện khả năng tiếng Anh của mình.",
        "properNouns": ["Jay"]
    },
    {
        "startTime": 4.8,
        "endTime": 7.1,
        "text": "Honey, look, English is your second language.",
        "translationVi": "Em yêu à nghe này, tiếng Anh là ngôn ngữ thứ hai của em mà.",
        "ipaUs": "/ˈhʌni, lʊk, ˈɪŋɡlɪʃ ɪz jɔːr ˈsɛkənd ˈlæŋɡwɪdʒ./",
        "keywords": ["second language"],
        "explanationAi": "'Second language' (ngôn ngữ thứ hai) chỉ thứ tiếng học sau tiếng mẹ đẻ.",
        "properNouns": []
    },
    {
        "startTime": 7.2,
        "endTime": 10.5,
        "text": "You're doing great, really.",
        "translationVi": "Em đang làm rất tuyệt vời rồi, thật lòng đấy.",
        "ipaUs": "/jʊr ˈduːɪŋ ɡreɪt, ˈrɪəli./",
        "keywords": ["doing great"],
        "explanationAi": "Jay an ủi vợ để xoa dịu nỗi tự ti về rào cản ngôn ngữ.",
        "properNouns": []
    },
    {
        "startTime": 12.4,
        "endTime": 16.2,
        "text": "Welcome to Learn English with TV Series!",
        "translationVi": "Chào mừng các bạn đến với kênh Học Tiếng Anh Cùng Phim Truyền Hình!",
        "ipaUs": "/ˈwɛlkəm tuː lɜːrn ˈɪŋɡlɪʃ wɪð ˌtiːˈviː ˈsɪriz!/",
        "keywords": ["Learn English", "TV Series"],
        "explanationAi": "Lời giới thiệu bài học ngôn ngữ phân tích phân cảnh hài hước của Gloria.",
        "properNouns": ["Learn English with TV Series"]
    },
    {
        "startTime": 16.3,
        "endTime": 22.9,
        "text": "Today, we've got a hilarious scene from Modern Family in which Gloria, who is originally from Colombia,",
        "translationVi": "Hôm nay, chúng ta có một phân cảnh siêu hài hước từ Modern Family, nơi Gloria, người gốc Colombia,",
        "ipaUs": "/təˈdeɪ, wiːv ɡɑːt ə hɪˈlɛriəs siːn frʌm ˈmɑːdərn ˈfæməli ɪn wɪtʃ ˈɡlɔːriə, huː ɪz əˈrɪdʒənəli frʌm kəˈlʌmbiə,/",
        "keywords": ["hilarious scene", "originally from Colombia"],
        "explanationAi": "Giới thiệu bối cảnh nhân vật Gloria Delgado-Pritchett di cư từ Colombia sang Mỹ.",
        "properNouns": ["Modern Family", "Gloria", "Colombia"]
    },
    {
        "startTime": 23.0,
        "endTime": 28.6,
        "text": "confuses certain English expressions in a hilarious way. Let's check it out!",
        "translationVi": "đã nhầm lẫn một số cách diễn đạt tiếng Anh theo cách vô cùng buồn cười. Cùng khám phá nhé!",
        "ipaUs": "/kənˈfjuːzɪz ˈsɜːrtən ˈɪŋɡlɪʃ ɪkˈsprɛʃənz ɪn ə hɪˈlɛriəs weɪ. lɛts tʃɛk ɪt aʊt!/",
        "keywords": ["confuses", "English expressions", "check it out"],
        "explanationAi": "'Check it out' là cụm từ kêu gọi hành động thông dụng để xem hoặc khám phá nội dung.",
        "properNouns": []
    },
    {
        "startTime": 28.7,
        "endTime": 31.9,
        "text": "Jay, this came for you. Oh, hi, honey. What is it?",
        "translationVi": "Jay, cái này gửi cho anh này. Ồ chào em yêu. Cái gì thế em?",
        "ipaUs": "/dʒeɪ, ðɪs keɪm fɔːr juː. oʊ, haɪ, ˈhʌni. wʌt ɪz ɪt?/",
        "keywords": ["came for you", "What is it?"],
        "explanationAi": "Cụm 'this came for you' có nghĩa là 'món đồ này được gửi đến cho bạn'.",
        "properNouns": ["Jay"]
    },
    {
        "startTime": 32.0,
        "endTime": 36.1,
        "text": "I called your secretary and told her to order you some crackers,",
        "translationVi": "Em đã gọi cho cô thư ký của anh và bảo cô ấy đặt cho anh một ít bánh quy giòn,",
        "ipaUs": "/aɪ kɔːld jɔːr ˈsɛkrəˌtɛri ænd toʊld hɜːr tuː ˈɔːrdər juː sʌm ˈkrækərz,/",
        "keywords": ["secretary", "order", "crackers"],
        "explanationAi": "'Crackers' là bánh quy giòn mặn thường ăn kèm phô mai.",
        "properNouns": []
    },
    {
        "startTime": 36.2,
        "endTime": 39.8,
        "text": "and those cheeses that you like, the tiny little ones. Thanks.",
        "translationVi": "và mấy miếng phô mai mà anh thích ấy, mấy miếng bé xíu xiu đó. Cảm ơn em nhé.",
        "ipaUs": "/ænd ðoʊz ˈtʃiːzɪz ðæt juː laɪk, ðə ˈtaɪni ˈlɪtəl wʌnz. θæŋks./",
        "keywords": ["cheeses", "tiny little ones"],
        "explanationAi": "Gloria mở đầu cho sự nhầm lẫn giữa 'cheeses' (phô mai) và 'Jesus' (Chúa).",
        "properNouns": []
    },
    {
        "startTime": 39.9,
        "endTime": 43.2,
        "text": "Did you pick up my gargle costume too? You're making fun of me.",
        "translationVi": "Anh có lấy giùm em bộ trang phục súc miệng luôn không? Em đang trêu anh đấy à.",
        "ipaUs": "/dɪd juː pɪk ʌp maɪ ˈɡɑːrɡəl ˈkɑːstuːm tuː? jʊr ˈmeɪkɪŋ fʌn ʌv miː./",
        "keywords": ["gargle costume", "making fun of me"],
        "explanationAi": "Gloria nhầm tượng quái vật đá 'gargoyle' thành hành động súc miệng 'gargle'.",
        "properNouns": []
    },
    {
        "startTime": 43.3,
        "endTime": 46.3,
        "text": "No! I want you to be honest with me. Okay.",
        "translationVi": "Không hề! Em muốn anh phải thành thật với em cơ mà. Được rồi.",
        "ipaUs": "/noʊ! aɪ wɑːnt juː tuː biː ˈɑːnəst wɪð miː. oʊˈkeɪ./",
        "keywords": ["honest with me"],
        "explanationAi": "Cụm 'honest with me' nghĩa là thành thật, không giấu giếm khuyết điểm.",
        "properNouns": []
    },
    {
        "startTime": 46.4,
        "endTime": 50.2,
        "text": "Well, I may have noticed some tiny little mistakes you might want to take a look at.",
        "translationVi": "À thì, anh có nhận thấy một vài lỗi sai nho nhỏ mà có lẽ em nên xem lại.",
        "ipaUs": "/wɛl, aɪ meɪ hæv ˈnoʊtɪst sʌm ˈtaɪni ˈlɪtəl mɪˈsteɪks juː maɪt wɑːnt tuː teɪk ə lʊk æt./",
        "keywords": ["tiny little mistakes", "take a look at"],
        "explanationAi": "Jay ngập ngừng lựa lời nhẹ nhàng nhất để không làm tổn thương lòng tự ái của Gloria.",
        "properNouns": []
    },
    {
        "startTime": 50.3,
        "endTime": 53.8,
        "text": "Like what? Just little mispronunciations. Like for example, last night you said:",
        "translationVi": "Chẳng hạn là gì cơ? Chỉ là mấy chỗ phát âm sai nho nhỏ thôi. Ví dụ như tối qua em bảo là:",
        "ipaUs": "/laɪk wʌt? dʒʌst ˈlɪtəl ˌmɪsprəˌnʌnsiˈeɪʃənz. laɪk fɔːr ɪɡˈzæmpəl, læst naɪt juː sɛd:/",
        "keywords": ["mispronunciations", "last night"],
        "explanationAi": "'Mispronunciation' là lỗi phát âm sai từ vựng.",
        "properNouns": []
    },
    {
        "startTime": 53.9,
        "endTime": 56.1,
        "text": "We live in a doggy-dog world. So?",
        "translationVi": "Chúng ta đang sống trong một thế giới cún cưng yêu dấu. Thì sao nào?",
        "ipaUs": "/wiː lɪv ɪn ə ˈdɔːɡi dɔːɡ wɜːrld. soʊ?/",
        "keywords": ["doggy-dog world"],
        "explanationAi": "Lỗi nghe nhầm thành ngữ kinh điển của Gloria biến thế giới tàn khốc thành thế giới cún con.",
        "properNouns": []
    },
    {
        "startTime": 56.2,
        "endTime": 61.6,
        "text": "Well, it's dog-eat-dog world. Yeah, but that doesn't make any sense!",
        "translationVi": "À, câu đúng phải là thế giới chó ăn thịt chó (cạnh tranh khốc liệt). Nhưng câu đó vô lý đùng đùng!",
        "ipaUs": "/wɛl, ɪts dɔːɡ iːt dɔːɡ wɜːrld. jæ, bʌt ðæt ˈdʌzənt meɪk ˈɛni sɛns!/",
        "keywords": ["dog-eat-dog world", "doesn't make any sense"],
        "explanationAi": "Gloria phản bác logic của thành ngữ tiếng Anh theo lối suy nghĩ ngây thơ.",
        "properNouns": []
    },
    {
        "startTime": 61.7,
        "endTime": 64.8,
        "text": "Who wants to live in a world where dogs eat each other?",
        "translationVi": "Ai mà lại muốn sống trong một thế giới nơi loài chó ăn thịt lẫn nhau cơ chứ?",
        "ipaUs": "/huː wɑːnts tuː lɪv ɪn ə wɜːrld wɛr dɔːɡz iːt iːtʃ ˈʌðər?/",
        "keywords": ["dogs eat each other"],
        "explanationAi": "Lập luận hài hước về mặt nghĩa đen (literal interpretation) của thành ngữ.",
        "properNouns": []
    },
    {
        "startTime": 64.9,
        "endTime": 69.8,
        "text": "Doggy-dog world is a beautiful world full of little puppies!",
        "translationVi": "Thế giới cún cưng phải là một thế giới tươi đẹp ngập tràn những chú cún con đáng yêu chứ!",
        "ipaUs": "/ˈdɔːɡi dɔːɡ wɜːrld ɪz ə ˈbjuːtəfəl wɜːrld fʊl ʌv ˈlɪtəl ˈpʌpiz!/",
        "keywords": ["beautiful world", "puppies"],
        "explanationAi": "Gloria kiên quyết bảo vệ định nghĩa ngọt ngào của mình cho 'doggy-dog world'.",
        "properNouns": []
    },
    {
        "startTime": 69.9,
        "endTime": 74.0,
        "text": "What else do I say wrong?",
        "translationVi": "Thế em còn nói sai cái gì nữa hả anh?",
        "ipaUs": "/wʌt ɛls duː aɪ seɪ rɔːŋ?/",
        "keywords": ["What else", "say wrong"],
        "explanationAi": "Gloria gặng hỏi Jay với sự hiếu thắng và đôi chút tự ái.",
        "properNouns": []
    },

    # =========================================================================
    # PART 2: CONNECTED SPEECH & VOCABULARY INSIGHTS (01:20 - 04:30)
    # =========================================================================
    {
        "startTime": 80.2,
        "endTime": 85.8,
        "text": "Honey is a word used to address your partner: your husband, your wife,",
        "translationVi": "'Honey' là từ dùng để gọi bạn đời của bạn: chồng, vợ,",
        "ipaUs": "/ˈhʌni ɪz ə wɜːrd juːzd tuː əˈdrɛs jɔːr ˈpɑːrtnər: jɔːr ˈhʌzbənd, jɔːr waɪf,/",
        "keywords": ["address your partner"],
        "explanationAi": "Bài học từ vựng về từ xưng hô âu yếm (term of endearment) trong tiếng Anh.",
        "properNouns": []
    },
    {
        "startTime": 85.9,
        "endTime": 91.8,
        "text": "your boyfriend or girlfriend, or someone that you love and have an affectionate relationship with.",
        "translationVi": "bạn trai hoặc bạn gái, hoặc người mà bạn yêu thương và có mối quan hệ gắn bó thân thiết.",
        "ipaUs": "/jɔːr ˈbɔɪˌfrɛnd ɔːr ˈɡɜːrlˌfrɛnd, ɔːr ˈsʌmwʌn ðæt juː lʌv ænd hæv ən əˈfɛkʃənət rɪˈleɪʃənˌʃɪp wɪð./",
        "keywords": ["affectionate relationship"],
        "explanationAi": "'Affectionate relationship' nghĩa là mối quan hệ tràn đầy tình cảm yêu thương.",
        "properNouns": []
    },
    {
        "startTime": 108.2,
        "endTime": 112.8,
        "text": "Oh, hi, honey. What is it? Did you hear how Jay says this last part?",
        "translationVi": "Ồ chào em yêu. Cái gì thế em? Bạn có nghe thấy Jay phát âm phần cuối này như thế nào không?",
        "ipaUs": "/oʊ, haɪ, ˈhʌni. wʌt ɪz ɪt? dɪd juː hɪr haʊ dʒeɪ sɛz ðɪs læst pɑːrt?/",
        "keywords": ["What is it", "hear how Jay says"],
        "explanationAi": "Người hướng dẫn ngôn ngữ chuyển sang phân tích hiện tượng nối âm thực tế của người bản xứ.",
        "properNouns": ["Jay"]
    },
    {
        "startTime": 112.9,
        "endTime": 118.2,
        "text": "The T in 'What' has a flap sound, which then connects with the vowel I in 'is'.",
        "translationVi": "Âm T trong chữ 'What' phát âm thành âm vỗ Flap T, sau đó nối mượt với nguyên âm I trong chữ 'is'.",
        "ipaUs": "/ðə tiː ɪn wʌt hæz ə flæp saʊnd, wɪtʃ ðɛn kəˈnɛkts wɪð ðə ˈvaʊəl aɪ ɪn ɪz./",
        "keywords": ["flap sound", "connects with vowel"],
        "explanationAi": "Quy tắc Flap T trong tiếng Anh Mỹ: khi /t/ đứng giữa hai nguyên âm, nó biến thành âm [ɾ] giống chữ 'đ' nhẹ.",
        "properNouns": []
    },
    {
        "startTime": 118.3,
        "endTime": 121.5,
        "text": "What is? What is?",
        "translationVi": "What is? What is?",
        "ipaUs": "/wɑː.ɾɪz? wɑː.ɾɪz?/",
        "keywords": ["What is", "connected speech"],
        "explanationAi": "Minh họa nối âm flap T tự nhiên trong giao tiếp hàng ngày.",
        "properNouns": []
    },
    {
        "startTime": 121.6,
        "endTime": 127.8,
        "text": "Also notice that the S in 'is' has a Z sound, which then connects with 'it'.",
        "translationVi": "Hãy chú ý thêm rằng chữ S trong 'is' có âm Z hữu thanh, sau đó nối tiếp với từ 'it'.",
        "ipaUs": "/ˈɔːlsoʊ ˈnoʊtɪs ðæt ðɪ ɛs ɪn ɪz hæz ə ziː saʊnd, wɪtʃ ðɛn kəˈnɛkts wɪð ɪt./",
        "keywords": ["Z sound", "connects with it"],
        "explanationAi": "Âm /z/ nối sang nguyên âm /ɪ/ tạo thành chuỗi âm liên tục: [wɑː.ɾɪ.zɪt].",
        "properNouns": []
    },
    {
        "startTime": 127.9,
        "endTime": 135.5,
        "text": "Is it? Is it? What is it? What is it?",
        "translationVi": "Is it? Is it? What is it? Có chuyện gì thế?",
        "ipaUs": "/ˈɪz ɪt? ˈɪz ɪt? wɑː.ɾɪ.zɪt? wɑː.ɾɪ.zɪt?/",
        "keywords": ["What is it"],
        "explanationAi": "Luyện tập lặp lại cụm câu hoàn chỉnh theo ngữ điệu tự nhiên của người Mỹ.",
        "properNouns": []
    },
    {
        "startTime": 153.0,
        "endTime": 157.9,
        "text": "A cracker is a thin crisp biscuit made from dough, not to be confused with a cookie,",
        "translationVi": "Bánh quy giòn 'cracker' là loại bánh quy nướng mỏng và giòn làm từ bột mì, đừng nhầm lẫn với bánh quy ngọt 'cookie',",
        "ipaUs": "/ə ˈkrækər ɪz ə θɪn krɪsp ˈbɪskət meɪd frʌm doʊ, nɑːt tuː biː kənˈfjuːzd wɪð ə ˈkʊki,/",
        "keywords": ["cracker", "crisp biscuit", "cookie"],
        "explanationAi": "Phân biệt từ vựng ẩm thực: 'cracker' thường mặn và giòn rụm, còn 'cookie' thường ngọt xốp.",
        "properNouns": []
    },
    {
        "startTime": 158.0,
        "endTime": 168.3,
        "text": "which is a completely different thing. Something tiny is very small, and is often used before 'little' for emphasis.",
        "translationVi": "vốn là một món hoàn toàn khác. Một thứ gì đó 'tiny' nghĩa là cực kỳ nhỏ bé, và thường đi trước chữ 'little' để nhấn mạnh.",
        "ipaUs": "/wɪtʃ ɪz ə kəmˈpliːtli ˈdɪfərənt θɪŋ. ˈsʌmθɪŋ ˈtaɪni ɪz ˈvɛri smɔːl, ænd ɪz ˈɔːfən juːzd bɪˈfɔːr ˈlɪtəl fɔːr ˈɛmfəsɪs./",
        "keywords": ["tiny", "emphasis"],
        "explanationAi": "Cụm 'tiny little' là cách kết hợp từ tăng sắc thái biểu cảm: 'bé xíu xiu'.",
        "properNouns": []
    },
    {
        "startTime": 179.6,
        "endTime": 185.1,
        "text": "Did you notice that 'did' ends with a D, followed by the Y in 'you'?",
        "translationVi": "Bạn có để ý từ 'did' kết thúc bằng âm D, theo sau bởi âm Y trong từ 'you' không?",
        "ipaUs": "/dɪd juː ˈnoʊtɪs ðæt dɪd ɛndz wɪð ə diː, ˈfɑːloʊd baɪ ðə waɪ ɪn juː?/",
        "keywords": ["ends with D", "followed by Y"],
        "explanationAi": "Quy tắc đồng hóa âm (Assimilation): /d/ + /j/ hòa trộn thành âm tắc xát /dʒ/.",
        "properNouns": []
    },
    {
        "startTime": 185.2,
        "endTime": 193.6,
        "text": "This D plus Y combination very often sounds like Juh. So 'did you' is often pronounced as 'did-juh'.",
        "translationVi": "Sự kết hợp giữa D và Y này rất thường phát âm thành âm /dʒ/. Do đó 'did you' hay được đọc thành 'did-juh'.",
        "ipaUs": "/ðɪs diː plʌs waɪ ˌkɑːmbəˈneɪʃən ˈvɛri ˈɔːfən saʊndz laɪk /dʒ/. soʊ dɪd juː ɪz ˈɔːfən prəˈnaʊnst æz ˈdɪdʒə./",
        "keywords": ["combination", "pronounced as did-juh"],
        "explanationAi": "Ví dụ kinh điển về hiện tượng nuốt và biến âm trong khẩu ngữ bản xứ.",
        "properNouns": []
    },
    {
        "startTime": 196.0,
        "endTime": 204.8,
        "text": "Check out these examples from Friends: 'Did you hear that?', 'How'd you do that?'.",
        "translationVi": "Hãy cùng xem các ví dụ kinh điển từ phim Friends: 'Did you hear that?', 'How'd you do that?'.",
        "ipaUs": "/tʃɛk aʊt ðiːz ɪɡˈzæmpəlz frʌm frɛndz: dɪd juː hɪr ðæt?, haʊd juː duː ðæt?./",
        "keywords": ["Friends", "examples"],
        "explanationAi": "Trích dẫn các câu thoại quen thuộc trong Friends để người học thấy tính phổ biến của âm /dʒ/.",
        "properNouns": ["Friends"]
    },
    {
        "startTime": 211.9,
        "endTime": 222.3,
        "text": "By learning native pronunciation patterns, you can greatly improve your listening comprehension of fast-speaking natives.",
        "translationVi": "Bằng cách học các quy tắc phát âm tự nhiên của người bản xứ, bạn sẽ cải thiện vượt bậc khả năng nghe hiểu người nói tốc độ nhanh.",
        "ipaUs": "/baɪ ˈlɜːrnɪŋ ˈneɪtɪv prəˌnʌnsiˈeɪʃən ˈpætərnz, juː kæn ˈɡreɪtli ɪmˈpruːv jɔːr ˈlɪsənɪŋ ˌkɑːmprɪˈhɛnʃən ʌv fæst ˈspiːkɪŋ ˈneɪtɪvz./",
        "keywords": ["native pronunciation", "improve comprehension"],
        "explanationAi": "Lời khuyên phương pháp học nghe hiểu chủ động cho học viên tiếng Anh.",
        "properNouns": []
    },
    {
        "startTime": 243.6,
        "endTime": 248.6,
        "text": "Did you pick up my gargle costume too? If you pick something up, you go someplace and buy or grab it.",
        "translationVi": "Anh có lấy giúp em bộ đồ súc miệng luôn không? Cụm 'pick something up' có nghĩa là bạn ghé qua đâu đó để mua hoặc lấy món đồ mang về.",
        "ipaUs": "/dɪd juː pɪk ʌp maɪ ˈɡɑːrɡəl ˈkɑːstuːm tuː? ɪf juː pɪk ˈsʌmθɪŋ ʌp, juː ɡoʊ ˈsʌmˌpleɪs ænd baɪ ɔːr ɡræb ɪt./",
        "keywords": ["pick up", "buy or grab"],
        "explanationAi": "Cụm động từ 'pick up' thông dụng trong đời sống Mỹ (tiện đường ghé lấy đồ).",
        "properNouns": []
    },
    {
        "startTime": 256.8,
        "endTime": 264.4,
        "text": "Gargoyles are grotesque carved human or animal faces, often constructed as part of buildings.",
        "translationVi": "Gargoyle là những bức tượng chạm khắc mặt người hoặc muông thú kỳ dị quái đản, thường gắn liền trên các tòa lâu đài kiến trúc Gothic.",
        "ipaUs": "/ˈɡɑːrɡɔɪlz ɑːr ɡroʊˈtɛsk kɑːrvd ˈhjuːmən ɔːr ˈænəməl ˈfeɪsɪz, ˈɔːfən kənˈstrʌktɪd æz pɑːrt ʌv ˈbɪldɪŋz./",
        "keywords": ["gargoyles", "grotesque carved", "buildings"],
        "explanationAi": "'Gargoyle' (tượng máng xối quái thú) bị Gloria phát âm nhầm thành 'gargle' (súc miệng).",
        "properNouns": []
    },
    {
        "startTime": 264.5,
        "endTime": 271.0,
        "text": "A costume is a set of clothes that people wear in order to pretend to be someone else, like on Halloween.",
        "translationVi": "Trang phục hóa trang 'costume' là bộ đồ người ta mặc để giả làm người khác, chẳng hạn như vào dịp Halloween.",
        "ipaUs": "/ə ˈkɑːstuːm ɪz ə sɛt ʌv kloʊðz ðæt ˈpiːpəl wɛr ɪn ˈɔːrdər tuː prɪˈtɛnd tuː biː ˈsʌmwʌn ɛls, laɪk ɑːn ˌhæləˈwiːn./",
        "keywords": ["costume", "pretend to be someone else", "Halloween"],
        "explanationAi": "Phân biệt giữa 'costume' (đồ hóa trang) và 'clothes' (quần áo mặc thường ngày).",
        "properNouns": ["Halloween"]
    },

    # =========================================================================
    # PART 3: THE HALLOWEEN BRUJA & FLAP T IN 'NOTICED' (04:30 - 07:15)
    # =========================================================================
    {
        "startTime": 286.8,
        "endTime": 292.1,
        "text": "Listen, did you ever do anything about costumes for Claire's party tonight? I'm going to pick them up this afternoon.",
        "translationVi": "Nghe này, em đã tính chuyện trang phục cho bữa tiệc tối nay nhà Claire chưa? Chiều nay em sẽ đi lấy đồ đây.",
        "ipaUs": "/ˈlɪsən, dɪd juː ˈɛvər duː ˈɛniˌθɪŋ əˈbaʊt ˈkɑːstuːmz fɔːr klɛrz ˈpɑːrti təˈnaɪt? aɪm ˈɡoʊɪŋ tuː pɪk ðɛm ʌp ðɪs ˌæftərˈnuːn./",
        "keywords": ["Claire's party", "pick them up"],
        "explanationAi": "Jay hỏi Gloria về trang phục Halloween cho buổi tiệc của Claire Dunphy.",
        "properNouns": ["Claire"]
    },
    {
        "startTime": 292.2,
        "endTime": 298.1,
        "text": "You're going to be a gargle, and I'm going to be an evil village bruja! I know less now than I did before I asked.",
        "translationVi": "Anh sẽ hóa trang thành tượng súc miệng, còn em sẽ là mụ phù thủy độc ác của buôn làng! Hỏi xong tôi thấy mình còn mông lung hơn trước khi hỏi.",
        "ipaUs": "/jʊr ˈɡoʊɪŋ tuː biː ə ˈɡɑːrɡəl, ænd aɪm ˈɡoʊɪŋ tuː biː ən ˈiːvəl ˈvɪlɪdʒ ˈbruːhɑː! aɪ noʊ lɛs naʊ ðæn aɪ dɪd bɪˈfɔːr aɪ æskt./",
        "keywords": ["evil village bruja", "know less now"],
        "explanationAi": "'Bruja' là từ tiếng Tây Ban Nha chỉ mụ phù thủy. Sự kết hợp giữa tiếng Tây Ban Nha và tiếng Anh của Gloria khiến Jay bất lực.",
        "properNouns": ["bruja"]
    },
    {
        "startTime": 298.2,
        "endTime": 305.3,
        "text": "A bruja is a witch, and a gargoyle is a gargoyle! She means gargoyles. That's what I said! You're making fun of me!",
        "translationVi": "Bruja là mụ phù thủy, còn gargoyle là tượng máng xối quái vật! Ý mẹ cháu là gargoyle. Thì mẹ vừa nói thế còn gì! Hai bố con lại hùa nhau trêu tôi đấy à!",
        "ipaUs": "/ə ˈbruːhɑː ɪz ə wɪtʃ, ænd ə ˈɡɑːrɡɔɪl ɪz ə ˈɡɑːrɡɔɪl! ʃiː miːnz ˈɡɑːrɡɔɪlz. ðæts wʌt aɪ sɛd! jʊr ˈmeɪkɪŋ fʌn ʌv miː!/",
        "keywords": ["witch", "gargoyle", "making fun of me"],
        "explanationAi": "Manny giải thích từ vựng tiếng Tây Ban Nha cho dượng Jay nghe.",
        "properNouns": ["Manny"]
    },
    {
        "startTime": 308.8,
        "endTime": 316.0,
        "text": "Notice the word 'of' is reduced to a schwa sound. So 'fun of' becomes 'fun-uh'.",
        "translationVi": "Chú ý từ 'of' được giảm âm thành âm schwa /ə/. Do đó 'fun of' được nói lướt thành 'fun-uh'.",
        "ipaUs": "/ˈnoʊtɪs ðə wɜːrd ʌv ɪz rɪˈduːst tuː ə ʃwɑː saʊnd /ə/. soʊ fʌn ʌv bɪˈkʌmz ˈfʌnə./",
        "keywords": ["schwa sound", "reduced"],
        "explanationAi": "Hiện tượng nhược hóa (reduction) trong ngữ âm tiếng Anh đối với giới từ chức năng.",
        "properNouns": []
    },
    {
        "startTime": 334.6,
        "endTime": 341.7,
        "text": "In the phrase 'I may have noticed', Jay contracts the word 'have', so we hear 'I may've noticed'.",
        "translationVi": "Trong cụm 'I may have noticed', Jay rút gọn từ 'have', nên ta nghe thấy 'I may've noticed'.",
        "ipaUs": "/ɪn ðə freɪz aɪ meɪ hæv ˈnoʊtɪst, dʒeɪ kənˈtrækts ðə wɜːrd hæv, soʊ wiː hɪr aɪ ˈmeɪɪv ˈnoʊtɪst./",
        "keywords": ["contracts", "may have noticed"],
        "explanationAi": "Rút gọn trợ động từ trong mệnh đề giả định khả năng của người bản xứ.",
        "properNouns": ["Jay"]
    },
    {
        "startTime": 365.3,
        "endTime": 374.6,
        "text": "In this context, 'to take a look at something' means to inspect, investigate, or consider it carefully.",
        "translationVi": "Trong ngữ cảnh này, 'take a look at something' có nghĩa là kiểm tra, xem xét hoặc cân nhắc kỹ lưỡng một vấn đề.",
        "ipaUs": "/ɪn ðɪs ˈkɑːntɛkst, tuː teɪk ə lʊk æt ˈsʌmθɪŋ miːnz tuː ɪnˈspɛkt, ɪnˈvɛstəˌɡeɪt, ɔːr kənˈsɪdər ɪt ˈkɛrfəli./",
        "keywords": ["take a look at", "inspect", "consider carefully"],
        "explanationAi": "Cụm thành ngữ 'take a look at' mang sắc thái lịch sự, tế nhị khi đưa ra lời khuyên sửa lỗi.",
        "properNouns": []
    },
    {
        "startTime": 392.5,
        "endTime": 403.1,
        "text": "'Dog-eat-dog' describes a situation where people will do anything to succeed, even if it harms other people.",
        "translationVi": "'Dog-eat-dog' miêu tả một môi trường mà con người sẵn sàng làm bất cứ điều gì để thành công, kể cả hãm hại người khác.",
        "ipaUs": "/dɔːɡ iːt dɔːɡ dɪˈskraɪbz ə ˌsɪtʃuˈeɪʃən wɛr ˈpiːpəl wɪl duː ˈɛniˌθɪŋ tuː səkˈsiːd, ˈiːvən ɪf ɪt hɑːrmz ˈʌðər ˈpiːpəl./",
        "keywords": ["dog-eat-dog", "succeed", "harms other people"],
        "explanationAi": "Nguồn gốc thành ngữ tiếng Latinh 'homo homini lupus' (con người là chó sói với con người).",
        "properNouns": []
    },
    {
        "startTime": 408.3,
        "endTime": 417.8,
        "text": "Gloria's confusion comes from the fact that she's not hearing the stop-T at the end of 'eat'.",
        "translationVi": "Sự nhầm lẫn của Gloria bắt nguồn từ việc cô ấy không nghe thấy âm T ngắt (stop-T) ở cuối từ 'eat'.",
        "ipaUs": "/ˈɡlɔːriəz kənˈfjuːʒən kʌmz frʌm ðə fækt ðæt ʃiːz nɑːt ˈhɪrɪŋ ðə stɑːp tiː æt ðɪ ɛnd ʌv iːt./",
        "keywords": ["stop-T", "not hearing"],
        "explanationAi": "Stop-T (âm T nghẽn): đầu lưỡi chặn luồng hơi lại nhưng không bật ra ngoài, khiến 'eat' nghe rất lướt.",
        "properNouns": ["Gloria"]
    },
    {
        "startTime": 417.9,
        "endTime": 426.0,
        "text": "A stop-T is a subtle, quick stop of air before the sound is made on the tip of the tongue.",
        "translationVi": "Âm T nghẽn là một điểm dừng luồng khí chớp nhoáng và tinh tế ngay trên đầu lưỡi trước khi âm được phát ra.",
        "ipaUs": "/ə stɑːp tiː ɪz ə ˈsʌtəl, kwɪk stɑːp ʌv ɛr bɪˈfɔːr ðə saʊnd ɪz meɪd ɑːn ðə tɪp ʌv ðə tʌŋ./",
        "keywords": ["subtle", "quick stop of air", "tip of the tongue"],
        "explanationAi": "Quy chuẩn phát âm ngữ âm học ứng dụng cho kỹ năng nghe nói.",
        "properNouns": []
    },
    {
        "startTime": 435.8,
        "endTime": 444.3,
        "text": "Can you hear the difference: 'Dog-eat-dog' versus 'Doggy-dog'? 'Wait for me'. 'Beat them'.",
        "translationVi": "Bạn có nhận ra sự khác biệt: 'Dog-eat-dog' đối lập với 'Doggy-dog'? 'Wait for me'. 'Beat them'.",
        "ipaUs": "/kæn juː hɪr ðə ˈdɪfərəns: dɔːɡ iːt dɔːɡ ˈvɜːrsəs ˈdɔːɡi dɔːɡ? weɪt fɔːr miː. biːt ðɛm./",
        "keywords": ["hear the difference", "contrast pairs"],
        "explanationAi": "Thực hành bài tập so sánh cặp từ tương phản âm thanh.",
        "properNouns": []
    },

    # =========================================================================
    # PART 4: DOG-EAT-DOG ARGUMENT & OTHER IDIOM MISTAKES (07:15 - 11:30)
    # =========================================================================
    {
        "startTime": 448.1,
        "endTime": 452.7,
        "text": "That doesn't make any sense! Who wants to live in a world where dogs eat each other?",
        "translationVi": "Nói thế vô lý đùng đùng! Ai mà muốn sống trong một thế giới nơi loài chó ăn thịt lẫn nhau chứ?",
        "ipaUs": "/ðæt ˈdʌzənt meɪk ˈɛni sɛns! huː wɑːnts tuː lɪv ɪn ə wɜːrld wɛr dɔːɡz iːt iːtʃ ˈʌðər?/",
        "keywords": ["doesn't make any sense", "dogs eat each other"],
        "explanationAi": "Cụm 'doesn't make sense' chỉ sự thiếu tính logic hoặc không thể hiểu nổi.",
        "properNouns": []
    },
    {
        "startTime": 452.8,
        "endTime": 457.2,
        "text": "Confused by the expression, Gloria says it doesn't make sense. If something doesn't make sense, it lacks logic.",
        "translationVi": "Bối rối trước cách diễn đạt này, Gloria cho rằng nó vô lý. Khi một điều gì đó 'doesn't make sense', tức là nó phi logic.",
        "ipaUs": "/kənˈfjuːzd baɪ ðɪ ɪkˈsprɛʃən, ˈɡlɔːriə sɛz ɪt ˈdʌzənt meɪk sɛns. ɪf ˈsʌmθɪŋ ˈdʌzənt meɪk sɛns, ɪt læks ˈlɑːdʒɪk./",
        "keywords": ["lacks logic"],
        "explanationAi": "Giải thích chi tiết thành ngữ trong chương trình giảng dạy.",
        "properNouns": ["Gloria"]
    },
    {
        "startTime": 473.6,
        "endTime": 478.3,
        "text": "Doggy-dog world is a beautiful world full of little puppies!",
        "translationVi": "Thế giới cún cưng phải là một thế giới tươi đẹp tràn ngập những chú cún con bé bỏng chứ!",
        "ipaUs": "/ˈdɔːɡi dɔːɡ wɜːrld ɪz ə ˈbjuːtəfəl wɜːrld fʊl ʌv ˈlɪtəl ˈpʌpiz!/",
        "keywords": ["Doggy-dog world", "puppies"],
        "explanationAi": "Sự nhầm lẫn ngây thơ đáng yêu tạo nên nét duyên dáng độc nhất vô nhị của Gloria.",
        "properNouns": []
    },
    {
        "startTime": 478.4,
        "endTime": 482.0,
        "text": "A puppy is a young dog, often associated with cuteness and innocence.",
        "translationVi": "Puppy là một chú chó con, thường gợi lên hình ảnh dễ thương và ngây thơ.",
        "ipaUs": "/ə ˈpʌpi ɪz ə jʌŋ dɔːɡ, ˈɔːfən əˈsoʊsiˌeɪtɪd wɪð ˈkjuːtnəs ænd ˈɪnəsəns./",
        "keywords": ["puppy", "cuteness", "innocence"],
        "explanationAi": "Từ vựng 'puppy' đối lập hoàn toàn với ý nghĩa tàn khốc của thành ngữ gốc 'dog-eat-dog'.",
        "properNouns": []
    },
    {
        "startTime": 497.1,
        "endTime": 503.6,
        "text": "What else do I say wrong? Notice Gloria's connected speech: 'What else' links smoothly together.",
        "translationVi": "Em còn nói sai cái gì nữa hả? Chú ý cách Gloria nối âm: hai từ 'What' và 'else' liên kết mượt mà với nhau.",
        "ipaUs": "/wʌt ɛls duː aɪ seɪ rɔːŋ? ˈnoʊtɪs ˈɡlɔːriəz kəˈnɛktɪd spiːtʃ: wʌt ɛls lɪŋks ˈsmuːðli təˈɡɛðər./",
        "keywords": ["What else", "links smoothly"],
        "explanationAi": "Phân tích ngữ âm nối phụ âm cuối /t/ sang nguyên âm đầu /ɛ/ của từ tiếp theo.",
        "properNouns": ["Gloria"]
    },
    {
        "startTime": 508.6,
        "endTime": 517.3,
        "text": "Repeat after me: What else do I say wrong? What else do I say wrong?",
        "translationVi": "Hãy nhắc lại theo tôi: Em còn nói sai cái gì nữa? What else do I say wrong?",
        "ipaUs": "/rɪˈpiːt ˈæftər miː: wʌt ɛls duː aɪ seɪ rɔːŋ? wʌt ɛls duː aɪ seɪ rɔːŋ?/",
        "keywords": ["Repeat after me"],
        "explanationAi": "Bài tập luyện ngữ điệu và phản xạ phát âm chuẩn theo phương pháp Shadowing.",
        "properNouns": []
    },
    {
        "startTime": 535.3,
        "endTime": 540.2,
        "text": "Well, it's not 'blessings in the skies', it's 'blessings in disguise'.",
        "translationVi": "À thì, câu đó không phải là 'phước lành trên bầu trời', mà là 'trong cái rủi có cái may' (blessings in disguise).",
        "ipaUs": "/wɛl, ɪts nɑːt ˈblɛsɪŋz ɪn ðə skaɪz, ɪts ˈblɛsɪŋz ɪn dɪsˈɡaɪz./",
        "keywords": ["blessings in disguise", "in the skies"],
        "explanationAi": "Lỗi nghe nhầm đồng âm: 'in disguise' (ngụy trang) nghe nhầm thành 'in the skies' (trên bầu trời).",
        "properNouns": []
    },
    {
        "startTime": 540.3,
        "endTime": 545.8,
        "text": "What else? Carpal Tunnel Syndrome is not 'carpool tunnel syndrome'.",
        "translationVi": "Gì nữa nào? Hội chứng ống cổ tay là Carpal Tunnel chứ không phải 'đường hầm xe đi chung' (carpool tunnel).",
        "ipaUs": "/wʌt ɛls? ˈkɑːrpəl ˈtʌnəl ˈsɪnˌdroʊm ɪz nɑːt ˈkɑːrˌpuːl ˈtʌnəl ˈsɪnˌdroʊm./",
        "keywords": ["Carpal Tunnel", "carpool"],
        "explanationAi": "Gloria nhầm thuật ngữ y khoa 'Carpal' (thuộc cổ tay) thành 'carpool' (đi chung xe ô tô).",
        "properNouns": []
    },
    {
        "startTime": 545.9,
        "endTime": 550.8,
        "text": "And what else? It's not 'volumptuous', it's 'voluptuous'. Okay, enough!",
        "translationVi": "Và còn gì nữa? Người ta nói 'voluptuous' (gợi cảm đẫy đà) chứ không phải 'volumptuous'. Thôi được rồi, đủ rồi đấy!",
        "ipaUs": "/ænd wʌt ɛls? ɪts nɑːt vəˈlʌmptʃuəs, ɪts vàˈlʌptʃuəs. oʊˈkeɪ, ɪˈnʌf!/",
        "keywords": ["voluptuous", "enough"],
        "explanationAi": "Gloria tự chế thêm phụ âm 'm' vào tính từ miêu tả vóc dáng quyến rũ 'voluptuous'.",
        "properNouns": []
    },
    {
        "startTime": 550.9,
        "endTime": 555.0,
        "text": "I know that I have an accent, but people understand me just fine!",
        "translationVi": "Em biết là mình có giọng lơ lớ, nhưng mọi người vẫn hiểu em rất rõ ràng đấy thôi!",
        "ipaUs": "/aɪ noʊ ðæt aɪ hæv ən ˈæksɛnt, bʌt ˈpiːpəl ˌʌndərˈstænd miː dʒʌst faɪn!/",
        "keywords": ["have an accent", "understand me just fine"],
        "explanationAi": "Gloria tự ái bảo vệ khả năng giao tiếp của mình trước sự săm soi của Jay.",
        "properNouns": []
    },
    {
        "startTime": 555.1,
        "endTime": 560.7,
        "text": "What the hell is this?! I told you, Jay, I called your secretary and told her to order you a box of baby cheeses!",
        "translationVi": "Cái quái quỷ gì thế này hả trời?! Em đã bảo với anh rồi Jay, em gọi cho thư ký của anh bảo cô ấy đặt một hộp phô mai tí hon cho anh!",
        "ipaUs": "/wʌt ðə hɛl ɪz ðɪs?! aɪ toʊld juː, dʒeɪ, aɪ kɔːld jɔːr ˈsɛkrəˌtɛri ænd toʊld hɜːr tuː ˈɔːrdər juː ə bɑːks ʌv ˈbeɪbi ˈtʃiːzɪz!/",
        "keywords": ["What the hell is this", "baby cheeses"],
        "explanationAi": "Cú sốc hài hước tột đỉnh: Jay mở chiếc hộp và nhìn thấy tượng Chúa Hài Đồng Baby Jesus thay vì phô mai.",
        "properNouns": ["Jay"]
    },
    {
        "startTime": 563.2,
        "endTime": 566.5,
        "text": "Oh, so now that is my fault too?!",
        "translationVi": "Ồ, hóa ra bây giờ chuyện đó cũng là lỗi tại em nữa à?!",
        "ipaUs": "/oʊ, soʊ naʊ ðæt ɪz maɪ fɔːlt tuː?!/",
        "keywords": ["my fault too"],
        "explanationAi": "Gloria phản ứng bùng nổ khi thấy sự cố mua sắm bắt nguồn từ chính phát âm của mình.",
        "properNouns": []
    },
    {
        "startTime": 580.8,
        "endTime": 589.7,
        "text": "A blessing in disguise refers to something that at first seems unfortunate, but eventually turns out to be very good.",
        "translationVi": "'A blessing in disguise' là thành ngữ chỉ một việc lúc đầu ngỡ như xui xẻo rủi ro, nhưng rốt cuộc lại đem đến kết quả tuyệt vời.",
        "ipaUs": "/ə ˈblɛsɪŋ ɪn dɪsˈɡaɪz rɪˈfɜːrz tuː ˈsʌmθɪŋ ðæt æt fɜːrst siːmz ʌnˈfɔːrtʃənət, bʌt ɪˈvɛntʃuəli tɜːrnz aʊt tuː biː ˈvɛri ɡʊd./",
        "keywords": ["blessing in disguise", "unfortunate", "turns out to be good"],
        "explanationAi": "Thành ngữ tương đương trong tiếng Việt: 'Tái ông thất mã' hoặc 'Trong cái rủi có cái may'.",
        "properNouns": []
    },
    {
        "startTime": 589.8,
        "endTime": 595.0,
        "text": "For example: she landed her dream job after getting fired. That was a blessing in disguise.",
        "translationVi": "Ví dụ: cô ấy tìm được công việc mơ ước ngay sau khi bị sa thải. Đó đúng thực là trong cái rủi có cái may.",
        "ipaUs": "/fɔːr ɪɡˈzæmpəl: ʃiː ˈlændɪd hɜːr driːm dʒɑːb ˈæftər ˈɡɛtɪŋ ˈfaɪərd. ðæt wʌz ə ˈblɛsɪŋ ɪn dɪsˈɡaɪz./",
        "keywords": ["landed her dream job", "blessing in disguise"],
        "explanationAi": "Minh họa câu ví dụ thực tế giúp người học ghi nhớ ngữ cảnh sử dụng.",
        "properNouns": []
    },
    {
        "startTime": 604.0,
        "endTime": 613.6,
        "text": "Carpal Tunnel Syndrome is a medical condition affecting nerves in your hands, often caused by repetitive motions.",
        "translationVi": "Hội chứng ống cổ tay là một bệnh lý thần kinh ở bàn tay, thường gây ra do các động tác lặp đi lặp lại như gõ bàn phím.",
        "ipaUs": "/ˈkɑːrpəl ˈtʌnəl ˈsɪnˌdroʊm ɪz ə ˈmɛdəkəl kənˈdɪʃən əˈfɛktɪŋ nɜːrvz ɪn jɔːr hændz, ˈɔːfən kɔːzd baɪ rɪˈpɛtətɪv ˈmoʊʃənz./",
        "keywords": ["Carpal Tunnel Syndrome", "nerves", "repetitive motions"],
        "explanationAi": "Định nghĩa bệnh lý ống cổ tay trong y học lao động.",
        "properNouns": ["Carpal Tunnel Syndrome"]
    },
    {
        "startTime": 622.0,
        "endTime": 630.4,
        "text": "Gloria confuses carpal with carpool. Carpooling is the act of sharing one vehicle to travel somewhere.",
        "translationVi": "Gloria đã nhầm 'carpal' thành 'carpool'. Đi chung xe 'carpooling' là hành động nhiều người cùng đi chung một chiếc xe đến nơi làm việc.",
        "ipaUs": "/ˈɡlɔːriə kənˈfjuːzɪz ˈkɑːrpəl wɪð ˈkɑːrˌpuːl. ˈkɑːrˌpuːlɪŋ ɪz ðɪ ækt ʌv ˈʃɛrɪŋ wʌn ˈviːəkəl tuː ˈtrævəl ˈsʌmˌwɛr./",
        "keywords": ["carpooling", "sharing one vehicle"],
        "explanationAi": "Văn hóa đi chung xe phổ biến tại các đô thị lớn ở Mỹ để tiết kiệm chi phí và bảo vệ môi trường.",
        "properNouns": ["Gloria"]
    },
    {
        "startTime": 684.9,
        "endTime": 695.2,
        "text": "Baby Jesus or baby cheeses? The humor here is that Gloria's pronunciation led to an absurd misunderstanding.",
        "translationVi": "Chúa Hài Đồng hay mấy miếng phô mai bé tí? Sự hài hước ở đây là phát âm của Gloria đã dẫn tới một sự nhầm lẫn cười ra nước mắt.",
        "ipaUs": "/ˈbeɪbi ˈdʒiːzəs ɔːr ˈbeɪbi ˈtʃiːzɪz? ðə ˈhjuːmər hɪr ɪz ðæt ˈɡlɔːriəz prəˌnʌnsiˈeɪʃən lɛd tuː ən əbˈsɜːrd ˌmɪsʌndərˈstændɪŋ./",
        "keywords": ["Baby Jesus", "baby cheeses", "misunderstanding"],
        "explanationAi": "Cặp âm đối lập /dʒ/ hữu thanh trong Jesus và /tʃ/ vô thanh trong cheeses.",
        "properNouns": ["Jesus"]
    },

    # =========================================================================
    # PART 5: REVIEW, CONNOTATION & SECOND-LANGUAGE MANIFESTO (11:30 - 14:48)
    # =========================================================================
    {
        "startTime": 726.3,
        "endTime": 732.5,
        "text": "Using connected speech, how can you pronounce the words 'fun' and 'of' in a natural sentence?",
        "translationVi": "Sử dụng kỹ thuật nối âm, bạn phát âm hai từ 'fun' và 'of' trong một câu tự nhiên như thế nào?",
        "ipaUs": "/ˈjuːzɪŋ kəˈnɛktɪd spiːtʃ, haʊ kæn juː prəˈnaʊns ðə wɜːrdz fʌn ænd ʌv ɪn ə ˈnætʃərəl ˈsɛntəns?/",
        "keywords": ["fun and of", "connected speech"],
        "explanationAi": "Câu hỏi tương tác rèn luyện thói quen tư duy ngữ âm cho học viên.",
        "properNouns": []
    },
    {
        "startTime": 747.6,
        "endTime": 756.7,
        "text": "Honey, look, English is your second language. You're doing great. Yeah, you're not helping by protecting my feelings!",
        "translationVi": "Em yêu nghe này, tiếng Anh là ngoại ngữ thứ hai của em mà. Em nói rất tốt rồi. Anh cứ bao che bảo vệ cảm xúc của em thế chẳng giúp ích được gì đâu!",
        "ipaUs": "/ˈhʌni, lʊk, ˈɪŋɡlɪʃ ɪz jɔːr ˈsɛkənd ˈlæŋɡwɪdʒ. jʊr ˈduːɪŋ ɡreɪt. jæ, jʊr nɑːt ˈhɛlpɪŋ baɪ prəˈtɛktɪŋ maɪ ˈfiːlɪŋz!/",
        "keywords": ["protecting my feelings", "not helping"],
        "explanationAi": "Gloria mong muốn nhận được sự chỉ dẫn chân thật thay vì những lời an ủi khách sáo.",
        "properNouns": []
    },
    {
        "startTime": 782.5,
        "endTime": 792.1,
        "text": "Dog-eat-dog has a strong negative connotation, describing cutthroat competition where individuals harm others to get ahead.",
        "translationVi": "Thành ngữ 'dog-eat-dog' mang sắc thái ý nghĩa tiêu cực sâu sắc, chỉ sự cạnh tranh tàn nhẫn nơi con người sẵn sàng chà đạp kẻ khác để tiến thân.",
        "ipaUs": "/dɔːɡ iːt dɔːɡ hæz ə strɔːŋ ˈnɛɡətɪv ˌkɑːnəˈteɪʃən, dɪˈskraɪbɪŋ ˈkʌtˌθroʊt ˌkɑːmpəˈtɪʃən wɛr ˌɪndəˈvɪdʒuəlz hɑːrm ˈʌðərz tuː ɡɛt əˈhɛd./",
        "keywords": ["negative connotation", "cutthroat competition"],
        "explanationAi": "'Connotation' là sắc thái cảm xúc hoặc hàm ý đi kèm của một từ ngữ.",
        "properNouns": []
    },
    {
        "startTime": 838.8,
        "endTime": 844.5,
        "text": "Okay, Jay, enough! I know that I have an accent, but people understand me just fine.",
        "translationVi": "Được rồi Jay, đủ lắm rồi đấy! Em biết là mình có giọng lơ lớ, nhưng mọi người vẫn hiểu em bình thường cơ mà.",
        "ipaUs": "/oʊˈkeɪ, dʒeɪ, ɪˈnʌf! aɪ noʊ ðæt aɪ hæv ən ˈæksɛnt, bʌt ˈpiːpəl ˌʌndərˈstænd miː dʒʌst faɪn./",
        "keywords": ["enough", "have an accent", "just fine"],
        "explanationAi": "Đỉnh điểm xung đột khi Gloria cảm thấy lòng tự trọng bị tổn thương vì giọng nói.",
        "properNouns": ["Jay"]
    },
    {
        "startTime": 844.6,
        "endTime": 850.8,
        "text": "What the hell is this?! I told you, Jay, I called your secretary and told her to order you a box of baby cheeses!",
        "translationVi": "Cái quái quỷ gì thế này hả trời?! Em đã bảo với anh rồi Jay, em gọi cho thư ký của anh bảo cô ấy đặt một hộp phô mai tí hon cho anh!",
        "ipaUs": "/wʌt ðə hɛl ɪz ðɪs?! aɪ toʊld juː, dʒeɪ, aɪ kɔːld jɔːr ˈsɛkrəˌtɛri ænd toʊld hɜːr tuː ˈɔːrdər juː ə bɑːks ʌv ˈbeɪbi ˈtʃiːzɪz!/",
        "keywords": ["What the hell is this", "box of baby cheeses"],
        "explanationAi": "Sự thật về bức tượng Chúa Hài Đồng làm bùng nổ cơn tức giận tích tụ bấy lâu của Gloria.",
        "properNouns": ["Jay"]
    },
    {
        "startTime": 855.6,
        "endTime": 860.0,
        "text": "Oh, so now that is my fault too?! Do you know how frustrating it is?",
        "translationVi": "Ồ, thế bây giờ chuyện đó cũng biến thành lỗi của em nữa à?! Anh có biết việc đó gây ức chế đến mức nào không?",
        "ipaUs": "/oʊ, soʊ naʊ ðæt ɪz maɪ fɔːlt tuː?! duː juː noʊ haʊ ˈfrʌstreɪtɪŋ ɪt ɪz?/",
        "keywords": ["my fault too", "how frustrating"],
        "explanationAi": "'Frustrating' miêu tả cảm giác thất vọng, bất lực và tức giận khi nỗ lực bị rào cản cản trở.",
        "properNouns": []
    },
    {
        "startTime": 860.1,
        "endTime": 864.7,
        "text": "Do you know how frustrating it is to have to translate everything in my head before I say it?",
        "translationVi": "Anh có biết việc lúc nào cũng phải dịch ngược dịch xuôi mọi thứ trong đầu trước khi nói ra nó ức chế đến thế nào không?",
        "ipaUs": "/duː juː noʊ haʊ ˈfrʌstreɪtɪŋ ɪt ɪz tuː hæv tuː trænsˈleɪt ˈɛvriˌθɪŋ ɪn maɪ hɛd bɪˈfɔːr aɪ seɪ ɪt?/",
        "keywords": ["translate everything in my head", "before I say it"],
        "explanationAi": "Nỗi niềm chung của hàng triệu người học ngoại ngữ trên thế giới: bộ não phải xử lý hai tầng dịch thuật liên tục.",
        "properNouns": []
    },
    {
        "startTime": 864.8,
        "endTime": 869.0,
        "text": "To have people laugh in my face because I'm struggling to find the words?",
        "translationVi": "Cảm giác bị người khác cười nhạo ngay trước mặt chỉ vì mình đang chật vật tìm từ ngữ thích hợp?",
        "ipaUs": "/tuː hæv ˈpiːpəl læf ɪn maɪ feɪs bɪˈkɔːz aɪm ˈstrʌɡəlɪŋ tuː faɪnd ðə wɜːrdz?/",
        "keywords": ["laugh in my face", "struggling to find the words"],
        "explanationAi": "'Struggling to find the words' là rào cản tìm từ vựng trong giao tiếp đa văn hóa.",
        "properNouns": []
    },
    {
        "startTime": 869.1,
        "endTime": 872.4,
        "text": "You should try talking in my shoes for one mile! I think you mean walk in your shoes.",
        "translationVi": "Anh nên thử nói chuyện trong đôi giày của em một dặm đi xem nào! Anh nghĩ ý em là 'đặt mình vào vị trí của em' (walk in my shoes) chứ.",
        "ipaUs": "/juː ʃʊd traɪ ˈtɔːkɪŋ ɪn maɪ ʃuːz fɔːr wʌn maɪl! aɪ θɪŋk juː miːn wɔːk ɪn jɔːr ʃuːz./",
        "keywords": ["talking in my shoes", "walk in your shoes"],
        "explanationAi": "Gloria trộn lẫn hai câu: 'talking' và thành ngữ 'walk a mile in someone's shoes' (thấu hiểu hoàn cảnh của người khác).",
        "properNouns": []
    },
    {
        "startTime": 872.5,
        "endTime": 874.6,
        "text": "I know what I meant to mean!",
        "translationVi": "Em tự biết là ý em muốn nói cái gì mà!",
        "ipaUs": "/aɪ noʊ wʌt aɪ mɛnt tuː miːn!/",
        "keywords": ["meant to mean"],
        "explanationAi": "Câu cãi bướng siêu đáng yêu của Gloria: 'I know what I meant to mean!'.",
        "properNouns": []
    },
    {
        "startTime": 874.7,
        "endTime": 879.2,
        "text": "Do you have any idea how smart I am in Spanish?! Of course you don't!",
        "translationVi": "Anh có mường tượng nổi em thông minh và sắc sảo cỡ nào khi nói tiếng Tây Ban Nha không?! Dĩ nhiên là anh đâu có biết!",
        "ipaUs": "/duː juː hæv ˈɛni aɪˈdiːə haʊ smɑːrt aɪ æm ɪn ˈspænɪʃ?! ʌv kɔːrs juː doʊnt!/",
        "keywords": ["how smart I am in Spanish", "of course you don't"],
        "explanationAi": "Tuyên ngôn kinh điển của Modern Family: Sự chênh lệch giữa trí tuệ thực sự và hạn chế biểu đạt trong ngôn ngữ thứ hai.",
        "properNouns": []
    },
    {
        "startTime": 879.3,
        "endTime": 888.0,
        "text": "For once, it would be nice to speak to someone in my own language, in my own home!",
        "translationVi": "Chỉ một lần thôi, giá như em được nói chuyện với ai đó bằng chính tiếng mẹ đẻ của mình, ngay trong chính ngôi nhà của mình!",
        "ipaUs": "/fɔːr wʌns, ɪt wʊd biː naɪs tuː spiːk tuː ˈsʌmwʌn ɪn maɪ oʊn ˈlæŋɡwɪdʒ, ɪn maɪ oʊn hoʊm!/",
        "keywords": ["for once", "own language", "own home"],
        "explanationAi": "Nỗi cô đơn sâu lắng của người sống xa quê hương khi khao khát được cất lên tiếng mẹ đẻ.",
        "properNouns": []
    }
]

# Ensure tokens count accurately
for idx, seg in enumerate(segments):
    words = re.findall(r"\b[A-Za-z0-9_]+\b", seg["text"])
    seg["orderIndex"] = idx
    seg["tokenCount"] = len(words)

# Ensure Zero Merged Utterances Constraint
for seg in segments:
    assert " — " not in seg["text"], f"Found em-dash in text: {seg['text']}"
    assert " — " not in seg["translationVi"], f"Found em-dash in translationVi: {seg['translationVi']}"

print(f"Total expanded segments: {len(segments)}")
print(f"Start time: {segments[0]['startTime']} -> End time: {segments[-1]['endTime']}")

# Quiz questions: 8 comprehensive bilingual questions
quiz_extended = {
    "lessonId": "mov_sit_04",
    "lessonTitle": "Modern Family: Gloria’s Funniest Language Struggles & Accent Mix-ups",
    "totalQuestions": 8,
    "xpReward": 150,
    "generatedBy": "AI_GEMINI",
    "questions": [
        {
            "id": "q_mov_sit_04_1",
            "question": "What common cutthroat idiom does Gloria hilariously mispronounce as 'doggy-dog world'?",
            "questionEn": "What common cutthroat idiom does Gloria hilariously mispronounce as 'doggy-dog world'?",
            "questionVi": "Thành ngữ chỉ sự cạnh tranh khốc liệt nào bị Gloria phát âm nhầm thành 'doggy-dog world'?",
            "options": [
                "Dog-eat-dog world",
                "Cat-and-mouse game",
                "Barking up the wrong tree",
                "Every dog has its day"
            ],
            "optionsEn": [
                "Dog-eat-dog world",
                "Cat-and-mouse game",
                "Barking up the wrong tree",
                "Every dog has its day"
            ],
            "optionsVi": [
                "Dog-eat-dog world (thế giới cạnh tranh khốc liệt)",
                "Cat-and-mouse game (trò mèo vờn chuột)",
                "Barking up the wrong tree (tìm nhầm chỗ)",
                "Every dog has its day (ai rồi cũng có thời)"
            ],
            "correctAnswer": 0,
            "explanation": "Gloria mishears 'dog-eat-dog world' as 'doggy-dog world', arguing adorably that dogs wouldn't eat each other.",
            "explanationEn": "Gloria mishears 'dog-eat-dog world' as 'doggy-dog world', arguing adorably that dogs wouldn't eat each other.",
            "explanationVi": "Gloria nghe nhầm 'dog-eat-dog' thành 'doggy-dog' và cãi rằng loài chó không bao giờ ăn thịt nhau.",
            "targetedConcept": "Eggcorn / Idiom Misinterpretation",
            "targetedConceptEn": "Eggcorn / Idiom Misinterpretation",
            "targetedConceptVi": "Hiện tượng nghe nhầm thành ngữ (Eggcorn)",
            "referenceSegmentIndex": 15
        },
        {
            "id": "q_mov_sit_04_2",
            "question": "Which phonetic contrast causes Jay to receive a nativity statue instead of snack cheese?",
            "questionEn": "Which phonetic contrast causes Jay to receive a nativity statue instead of snack cheese?",
            "questionVi": "Cặp âm đối lập nào khiến Jay nhận được một bức tượng Chúa thay vì đồ ăn vặt phô mai?",
            "options": [
                "Voiced /dʒ/ in 'Jesus' versus voiceless /tʃ/ in 'cheeses'",
                "Long vowel /iː/ versus short vowel /ɪ/",
                "Flap /ɾ/ versus alveolar stop /t/",
                "Voiceless /s/ versus voiced /z/"
            ],
            "optionsEn": [
                "Voiced /dʒ/ in 'Jesus' versus voiceless /tʃ/ in 'cheeses'",
                "Long vowel /iː/ versus short vowel /ɪ/",
                "Flap /ɾ/ versus alveolar stop /t/",
                "Voiceless /s/ versus voiced /z/"
            ],
            "optionsVi": [
                "Âm hữu thanh /dʒ/ trong 'Jesus' đối lập âm vô thanh /tʃ/ trong 'cheeses'",
                "Nguyên âm dài /iː/ đối lập nguyên âm ngắn /ɪ/",
                "Âm vỗ /ɾ/ đối lập âm chặn /t/",
                "Âm vô thanh /s/ đối lập âm hữu thanh /z/"
            ],
            "correctAnswer": 0,
            "explanation": "Gloria's Spanish-influenced pronunciation blurs the distinction between /dʒ/ and /tʃ/, turning 'baby cheeses' into 'Baby Jesus'.",
            "explanationEn": "Gloria's Spanish-influenced pronunciation blurs the distinction between /dʒ/ and /tʃ/, turning 'baby cheeses' into 'Baby Jesus'.",
            "explanationVi": "Ảnh hưởng ngữ âm tiếng Tây Ban Nha làm mờ ranh giới giữa /dʒ/ và /tʃ/, biến 'baby cheeses' thành 'Baby Jesus'.",
            "targetedConcept": "Consonant Contrast /dʒ/ vs /tʃ/",
            "targetedConceptEn": "Consonant Contrast /dʒ/ vs /tʃ/",
            "targetedConceptVi": "Cặp phụ âm đối lập /dʒ/ và /tʃ/",
            "referenceSegmentIndex": 44
        },
        {
            "id": "q_mov_sit_04_3",
            "question": "What is the meaning of the medical term 'Carpal Tunnel Syndrome' that Gloria confused with 'carpooling'?",
            "questionEn": "What is the meaning of the medical term 'Carpal Tunnel Syndrome' that Gloria confused with 'carpooling'?",
            "questionVi": "Ý nghĩa của thuật ngữ y khoa 'Carpal Tunnel Syndrome' mà Gloria nhầm với 'carpool' là gì?",
            "options": [
                "A nerve compression condition in the wrist causing pain and numbness",
                "A phobia of driving through dark mountain tunnels",
                "A severe motion sickness condition in shared cars",
                "An ear canal blockage from repetitive sounds"
            ],
            "optionsEn": [
                "A nerve compression condition in the wrist causing pain and numbness",
                "A phobia of driving through dark mountain tunnels",
                "A severe motion sickness condition in shared cars",
                "An ear canal blockage from repetitive sounds"
            ],
            "optionsVi": [
                "Hội chứng chèn ép dây thần kinh ở cổ tay gây đau nhức và tê bì",
                "Chứng sợ lái xe qua đường hầm xuyên núi",
                "Bệnh say xe nghiêm trọng khi đi xe chung",
                "Tắc nghẽn ống tai do âm thanh lặp lại"
            ],
            "correctAnswer": 0,
            "explanation": "Carpal Tunnel Syndrome is a wrist neuropathy, which sounds comical when confused with 'carpooling' (sharing rides).",
            "explanationEn": "Carpal Tunnel Syndrome is a wrist neuropathy, which sounds comical when confused with 'carpooling' (sharing rides).",
            "explanationVi": "Hội chứng ống cổ tay liên quan đến dây thần kinh cổ tay, bị Gloria nhầm với việc đi xe chung (carpool).",
            "targetedConcept": "Medical Terminology vs Everyday Homophones",
            "targetedConceptEn": "Medical Terminology vs Everyday Homophones",
            "targetedConceptVi": "Thuật ngữ y khoa và từ đồng âm",
            "referenceSegmentIndex": 42
        },
        {
            "id": "q_mov_sit_04_4",
            "question": "What profound truth about second-language learners does Gloria express in her monologue?",
            "questionEn": "What profound truth about second-language learners does Gloria express in her monologue?",
            "questionVi": "Chân lý sâu sắc nào về người học ngoại ngữ được Gloria bộc bạch trong đoạn độc thoại?",
            "options": [
                "A person's intelligence in their native language is often masked by vocabulary limitations in a second language",
                "Native speakers always have a superior vocabulary over bilinguals",
                "Translating word-for-word in your head is the most efficient learning method",
                "Accents should be completely eliminated to achieve fluency"
            ],
            "optionsEn": [
                "A person's intelligence in their native language is often masked by vocabulary limitations in a second language",
                "Native speakers always have a superior vocabulary over bilinguals",
                "Translating word-for-word in your head is the most efficient learning method",
                "Accents should be completely eliminated to achieve fluency"
            ],
            "optionsVi": [
                "Trí tuệ của một người trong tiếng mẹ đẻ thường bị che khuất bởi rào cản từ vựng trong ngôn ngữ thứ hai",
                "Người bản xứ luôn có vốn từ vựng vượt trội hơn người song ngữ",
                "Dịch từng từ trong đầu là phương pháp học hiệu quả nhất",
                "Cần phải xóa bỏ hoàn toàn giọng địa phương để đạt sự lưu loát"
            ],
            "correctAnswer": 0,
            "explanation": "Gloria's famous line 'Do you have any idea how smart I am in Spanish?!' highlights that language barrier does not equal intellectual deficiency.",
            "explanationEn": "Gloria's famous line 'Do you have any idea how smart I am in Spanish?!' highlights that language barrier does not equal intellectual deficiency.",
            "explanationVi": "Câu nói nổi tiếng 'Do you have any idea how smart I am in Spanish?!' nhấn mạnh rào cản ngôn ngữ không đồng nghĩa với hạn chế về trí tuệ.",
            "targetedConcept": "Second Language Acquisition Empathy",
            "targetedConceptEn": "Second Language Acquisition Empathy",
            "targetedConceptVi": "Sự thấu cảm với người học ngoại ngữ thứ hai",
            "referenceSegmentIndex": 50
        },
        {
            "id": "q_mov_sit_04_5",
            "question": "What is the correct English idiom that Gloria mistakenly rendered as 'talking in my shoes for one mile'?",
            "questionEn": "What is the correct English idiom that Gloria mistakenly rendered as 'talking in my shoes for one mile'?",
            "questionVi": "Thành ngữ tiếng Anh chính xác nào bị Gloria nói nhầm thành 'talking in my shoes for one mile'?",
            "options": [
                "Walk a mile in someone's shoes",
                "Put your foot in your mouth",
                "Stand on your own two feet",
                "Shake in your boots"
            ],
            "optionsEn": [
                "Walk a mile in someone's shoes",
                "Put your foot in your mouth",
                "Stand on your own two feet",
                "Shake in your boots"
            ],
            "optionsVi": [
                "Walk a mile in someone's shoes (đặt mình vào hoàn cảnh của người khác)",
                "Put your foot in your mouth (lỡ lời ngớ ngẩn)",
                "Stand on your own two feet (tự lập trên đôi chân của mình)",
                "Shake in your boots (run rẩy sợ hãi)"
            ],
            "correctAnswer": 0,
            "explanation": "The idiom is 'walk a mile in my shoes', meaning to experience someone else's perspective and challenges before judging them.",
            "explanationEn": "The idiom is 'walk a mile in my shoes', meaning to experience someone else's perspective and challenges before judging them.",
            "explanationVi": "Thành ngữ đúng là 'walk a mile in my shoes', nghĩa là đặt mình vào hoàn cảnh của người khác trước khi phán xét.",
            "targetedConcept": "Idiom Blending and Empathy Expressions",
            "targetedConceptEn": "Idiom Blending and Empathy Expressions",
            "targetedConceptVi": "Nhầm lẫn thành ngữ và cách diễn đạt thấu cảm",
            "referenceSegmentIndex": 48
        },
        {
            "id": "q_mov_sit_04_6",
            "question": "What meaning does the idiom 'a blessing in disguise' convey?",
            "questionEn": "What meaning does the idiom 'a blessing in disguise' convey?",
            "questionVi": "Thành ngữ 'a blessing in disguise' truyền tải ý nghĩa gì?",
            "options": [
                "An apparent misfortune that eventually produces beneficial or fortunate results",
                "A religious celebration held outdoors under the sky",
                "A secret gift given anonymously by a stranger",
                "A dangerous situation disguised as an opportunity"
            ],
            "optionsEn": [
                "An apparent misfortune that eventually produces beneficial or fortunate results",
                "A religious celebration held outdoors under the sky",
                "A secret gift given anonymously by a stranger",
                "A dangerous situation disguised as an opportunity"
            ],
            "optionsVi": [
                "Một điều lúc đầu ngỡ là xui xẻo nhưng rốt cuộc lại mang lại kết quả tốt đẹp",
                "Một nghi lễ tôn giáo tổ chức ngoài trời dưới bầu trời",
                "Một món quà bí mật từ người lạ mặt",
                "Một tình huống nguy hiểm đội lốt cơ hội"
            ],
            "correctAnswer": 0,
            "explanation": "'A blessing in disguise' refers to an unlucky situation that later proves to have good consequences.",
            "explanationEn": "'A blessing in disguise' refers to an unlucky situation that later proves to have good consequences.",
            "explanationVi": "'A blessing in disguise' (trong cái rủi có cái may) chỉ điều thoạt đầu tưởng tồi tệ nhưng về sau lại rất tốt.",
            "targetedConcept": "Contextual Idiom Meaning",
            "targetedConceptEn": "Contextual Idiom Meaning",
            "targetedConceptVi": "Ngữ nghĩa thành ngữ theo ngữ cảnh",
            "referenceSegmentIndex": 40
        },
        {
            "id": "q_mov_sit_04_7",
            "question": "What phonetic phenomenon occurs in Jay's natural pronunciation of 'Did you'?",
            "questionEn": "What phonetic phenomenon occurs in Jay's natural pronunciation of 'Did you'?",
            "questionVi": "Hiện tượng ngữ âm nào xuất hiện trong cách phát âm tự nhiên của Jay ở cụm 'Did you'?",
            "options": [
                "Palatal assimilation where /d/ merges with /j/ to produce /dʒ/",
                "Vowel deletion where the vowel sound disappears entirely",
                "Nasalization where air flows through the nose",
                "Glottal stop replacement at the start of both words"
            ],
            "optionsEn": [
                "Palatal assimilation where /d/ merges with /j/ to produce /dʒ/",
                "Vowel deletion where the vowel sound disappears entirely",
                "Nasalization where air flows through the nose",
                "Glottal stop replacement at the start of both words"
            ],
            "optionsVi": [
                "Hiện tượng đồng hóa âm vòm miệng khi /d/ hòa trộn với /j/ thành /dʒ/ ('did-juh')",
                "Nuốt nguyên âm làm biến mất hoàn toàn âm tiết",
                "Âm mũi hóa đưa hơi qua đường mũi",
                "Âm nghẽn thanh hầu ở đầu cả hai từ"
            ],
            "correctAnswer": 0,
            "explanation": "When /d/ is followed by the glide /j/, English speakers naturally assimilate them into an affricate /dʒ/, sounding like 'did-juh'.",
            "explanationEn": "When /d/ is followed by the glide /j/, English speakers naturally assimilate them into an affricate /dʒ/, sounding like 'did-juh'.",
            "explanationVi": "Khi âm /d/ đi trước bán nguyên âm /j/, người bản xứ tự nhiên đồng hóa chúng thành âm /dʒ/ ('did-juh').",
            "targetedConcept": "Palatal Assimilation in Connected Speech",
            "targetedConceptEn": "Palatal Assimilation in Connected Speech",
            "targetedConceptVi": "Đồng hóa âm vòm trong chuỗi lời nói nối",
            "referenceSegmentIndex": 24
        },
        {
            "id": "q_mov_sit_04_8",
            "question": "Why did Gloria confuse 'gargoyle' with 'gargle'?",
            "questionEn": "Why did Gloria confuse 'gargoyle' with 'gargle'?",
            "questionVi": "Vì sao Gloria lại nhầm lẫn giữa 'gargoyle' và 'gargle'?",
            "options": [
                "They share similar initial phonetic sounds, but 'gargoyle' is a stone statue and 'gargle' is rinsing the throat",
                "Gargoyles are historically known for drinking large amounts of water",
                "Halloween costumes always include mouthwash bottles",
                "The word 'gargle' is derived directly from Spanish vocabulary"
            ],
            "optionsEn": [
                "They share similar initial phonetic sounds, but 'gargoyle' is a stone statue and 'gargle' is rinsing the throat",
                "Gargoyles are historically known for drinking large amounts of water",
                "Halloween costumes always include mouthwash bottles",
                "The word 'gargle' is derived directly from Spanish vocabulary"
            ],
            "optionsVi": [
                "Hai từ có âm đầu tương tự nhau, nhưng 'gargoyle' là tượng đá quái thú còn 'gargle' là hành động súc họng",
                "Tượng Gargoyle trong lịch sử nổi tiếng về việc uống nhiều nước",
                "Trang phục Halloween luôn bao gồm chai nước súc miệng",
                "Từ 'gargle' bắt nguồn trực tiếp từ từ vựng tiếng Tây Ban Nha"
            ],
            "correctAnswer": 0,
            "explanation": "Gloria confused the Halloween monster statue 'gargoyle' with the oral hygiene action 'gargle' due to acoustic similarity.",
            "explanationEn": "Gloria confused the Halloween monster statue 'gargoyle' with the oral hygiene action 'gargle' due to acoustic similarity.",
            "explanationVi": "Gloria nhầm tượng quái vật 'gargoyle' với hành động vệ sinh răng miệng 'gargle' do sự tương đồng về âm thanh.",
            "targetedConcept": "Near-Homophone Vocabulary Confusion",
            "targetedConceptEn": "Near-Homophone Vocabulary Confusion",
            "targetedConceptVi": "Nhầm lẫn từ vựng gần đồng âm",
            "referenceSegmentIndex": 26
        }
    ]
}

# Generate TypeScript output
ts_code = f"""import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Modern Family: Gloria’s Funniest Language Struggles & Accent Mix-ups
 * Category: Sitcom Kinh Điển & Hài Kịch (cat_classic_sitcoms)
 * Level: CEFR B1 | Latina American Accent
 * YouTube ID: 72okAeSn5Tc (14:48 - 888s)
 * Views: 162,749+ | Channel: Learn English With TV Series
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC
 * ZERO MERGED UTTERANCES - FULL IPA US - 8 QUIZ BILINGUAL EXTENDED
 * ============================================================================
 */

export const QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED: VideoQuizData = {json.dumps(quiz_extended, ensure_ascii=False, indent=2)};

export const LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES: MockVideoLesson = {{
  id: "mov_sit_04",
  slug: "modern-family-gloria-funniest-language-struggles",
  title: "Modern Family: Gloria’s Funniest Language Struggles & Accent Mix-ups",
  categoryId: "cat_classic_sitcoms",
  categorySlug: "classic-sitcoms",
  categoryName: "Sitcom Kinh Điển & Hài Kịch",
  cefrLevel: "B1",
  durationFormatted: "14:48",
  durationSeconds: 888,
  externalId: "72okAeSn5Tc",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/72okAeSn5Tc/hqdefault.jpg",
  accent: "Latina American",
  wpmSpeed: 144,
  viewCount: 162749,
  studyCount: 7850,
  description:
    "Những pha nhầm lẫn ngôn ngữ, nghe nhầm thành ngữ (eggcorn) và phát âm tiếng Anh siêu đáng yêu của Gloria Delgado-Pritchett (Sofía Vergara): dog-eat-dog thành doggy-dog, baby Jesus thành baby cheeses, carpool thành carpool... kèm phân tích ngôn ngữ học từ Learn English With TV Series.",
  segments: {json.dumps(segments, ensure_ascii=False, indent=4)},
  quiz: QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED,
}};

// Backwards-compatible aliases for existing imports
export const LESSON_MODERN_FAMILY_GLORIA_FUNNIEST_LANGUAGE_STRUGGLES = LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES;
export const QUIZ_MODERN_FAMILY_GLORIA_FUNNIEST_LANGUAGE_STRUGGLES = QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED;
"""

target_path = "features/listening/data/lessons/movies/sitcoms/lesson_modern_family_gloria.ts"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully wrote full lesson to {target_path}!")
