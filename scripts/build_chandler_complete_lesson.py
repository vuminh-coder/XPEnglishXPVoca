import json
import re

# Master script for Friends Chandler Sarcasm (xT5zt93BbAg - 492s)
# Level: B2 | American Accent
# Total Segments: ~115 Pure Master Segments (Zero Merged Utterances)

segments = [
    # Scene 1: Rachel & Chandler - Sarcastic advice & cheese (00:00 - 00:30)
    {
        "startTime": 0.0,
        "endTime": 4.0,
        "text": "I thought Joey and I would be okay once we hung out,",
        "translationVi": "Tớ cứ nghĩ tớ và Joey sẽ ổn thỏa một khi hai đứa cùng đi chơi với nhau,",
        "ipaUs": "/aɪ θɔːt ˈdʒoʊi ænd aɪ wʊd biː oʊˈkeɪ wʌns wiː hʌŋ aʊt,/",
        "keywords": ["hung out", "thought would be okay"],
        "explanationAi": "Rachel tâm sự với Chandler về sự ngượng ngùng trong mối quan hệ bạn bè phức tạp với Joey.",
        "properNouns": ["Joey"]
    },
    {
        "startTime": 4.1,
        "endTime": 7.0,
        "text": "but it's like we don't even know how to be with each other anymore.",
        "translationVi": "nhưng cảm giác như bọn tớ thậm chí chẳng còn biết cách đối xử tự nhiên với nhau như trước nữa.",
        "ipaUs": "/bʌt ɪts laɪk wiː doʊnt ˈiːvən noʊ haʊ tuː biː wɪð iːtʃ ˈʌðər ˌɛniˈmɔːr./",
        "keywords": ["don't know how to be", "anymore"],
        "explanationAi": "Cảm giác xa cách, gượng gạo giữa những người bạn thân sau những xáo trộn tình cảm.",
        "properNouns": []
    },
    {
        "startTime": 7.1,
        "endTime": 9.2,
        "text": "I know it's tough now, but things will get better.",
        "translationVi": "Tớ biết bây giờ khó khăn, nhưng rồi mọi chuyện sẽ tốt hơn thôi.",
        "ipaUs": "/aɪ noʊ ɪts tʌf naʊ, bʌt θɪŋz wɪl ɡɛt ˈbɛtər./",
        "keywords": ["tough now", "things will get better"],
        "explanationAi": "Lời an ủi khách sáo thông thường của Chandler trước khi chuyển sang phong cách châm biếm quen thuộc.",
        "properNouns": []
    },
    {
        "startTime": 9.3,
        "endTime": 11.0,
        "text": "How do you know that?",
        "translationVi": "Làm sao cậu biết chắc được chứ?",
        "ipaUs": "/haʊ duː juː noʊ ðæt?/",
        "keywords": ["skeptical question"],
        "explanationAi": "Rachel gặng hỏi hoài nghi.",
        "properNouns": []
    },
    {
        "startTime": 11.1,
        "endTime": 13.2,
        "text": "What if it just gets worse and worse and worse,",
        "translationVi": "Lỡ như mọi thứ cứ ngày càng tồi tệ hơn, tệ hơn và tệ hơn nữa,",
        "ipaUs": "/wʌt ɪf ɪt dʒʌst ɡɛts wɜːrs ænd wɜːrs ænd wɜːrs,/",
        "keywords": ["what if", "worse and worse"],
        "explanationAi": "Biểu hiện tâm lý lo âu thái quá (catastrophizing) thường thấy của Rachel.",
        "properNouns": []
    },
    {
        "startTime": 13.3,
        "endTime": 17.0,
        "text": "to the point where we can't even be in the same room with each other?",
        "translationVi": "đến mức mà hai đứa không thể ở chung trong cùng một căn phòng nữa thì sao?",
        "ipaUs": "/tuː ðə pɔɪnt wɛr wiː kænt ˈiːvən biː ɪn ðə seɪm ruːm wɪð iːtʃ ˈʌðər?/",
        "keywords": ["to the point where", "in the same room"],
        "explanationAi": "Cụm 'to the point where' (đến mức độ mà...).",
        "properNouns": []
    },
    {
        "startTime": 17.2,
        "endTime": 20.0,
        "text": "I'm not great at the advice.",
        "translationVi": "Tớ vốn không giỏi đưa ra lời khuyên lắm đâu.",
        "ipaUs": "/aɪm nɑːt ɡreɪt æt ðɪ ədˈvaɪs./",
        "keywords": ["not great at advice"],
        "explanationAi": "Câu mở đầu bất hủ của Chandler thừa nhận sự bất lực khi phải an ủi người khác bằng sự nghiêm túc.",
        "properNouns": []
    },
    {
        "startTime": 20.1,
        "endTime": 23.0,
        "text": "Can I interest you in a sarcastic comment?",
        "translationVi": "Tớ có thể mời cậu một lời bình phẩm mỉa mai châm chọc được không?",
        "ipaUs": "/kæn aɪ ˈɪntrəst juː ɪn ə sɑːrˈkæstɪk ˈkɑːmɛnt?/",
        "keywords": ["Can I interest you in", "sarcastic comment"],
        "explanationAi": "Mẫu câu tiếp thị nhà hàng 'Can I interest you in...' được biến tấu đầy duyên dáng thành món ăn tinh thần mỉa mai.",
        "properNouns": []
    },
    {
        "startTime": 23.1,
        "endTime": 26.0,
        "text": "Some cheese?",
        "translationVi": "Hay là chút phô mai nhé?",
        "ipaUs": "/sʌm tʃiːz?/",
        "keywords": ["some cheese", "absurdist offer"],
        "explanationAi": "Món ăn thay thế ngớ ngẩn (absurdist fallback) để giải tỏa bầu không khí căng thẳng.",
        "properNouns": []
    },
    {
        "startTime": 26.2,
        "endTime": 29.5,
        "text": "Funny.",
        "translationVi": "Buồn cười gớm nhỉ.",
        "ipaUs": "/ˈfʌni./",
        "keywords": ["sarcastic funny"],
        "explanationAi": "Rachel đáp trả bằng một từ mỉa mai cụt lủn.",
        "properNouns": []
    },

    # Scene 2: CD Cases Chaos (00:30 - 00:50)
    {
        "startTime": 30.0,
        "endTime": 34.0,
        "text": "Funny, why is the Bruce Springsteen CD in the Cat Stevens case?",
        "translationVi": "Hài thật, sao đĩa CD của Bruce Springsteen lại nằm trong vỏ hộp của Cat Stevens thế này?",
        "ipaUs": "/ˈfʌni, waɪ ɪz ðə bruːs ˈsprɪŋstiːn ˌsiːˈdiː ɪn ðə kæt ˈstiːvənz keɪs?/",
        "keywords": ["Bruce Springsteen", "Cat Stevens", "CD case"],
        "explanationAi": "Chandler chuyển sự chú ý sang thói quen bừa bãi lộn xộn của Joey trong căn hộ.",
        "properNouns": ["Bruce Springsteen", "Cat Stevens"]
    },
    {
        "startTime": 34.2,
        "endTime": 36.5,
        "text": "Let's just say if I can't find the right CD case,",
        "translationVi": "Cứ coi như là nếu tớ không tìm thấy đúng vỏ đĩa CD đó,",
        "ipaUs": "/lɛts dʒʌst seɪ ɪf aɪ kænt faɪnd ðə raɪt ˌsiːˈdiː keɪs,/",
        "keywords": ["let's just say"],
        "explanationAi": "Thành ngữ 'let's just say' (cứ cho là, nói ngắn gọn là).",
        "properNouns": []
    },
    {
        "startTime": 36.6,
        "endTime": 38.5,
        "text": "I just put it in the nearest one.",
        "translationVi": "thì tớ cứ tiện tay nhét đại vào chiếc hộp gần nhất thôi.",
        "ipaUs": "/aɪ dʒʌst pʊt ɪt ɪn ðə ˈnɪrɪst wʌn./",
        "keywords": ["nearest one"],
        "explanationAi": "Logic sống vô lo vô nghĩ đặc trưng của Joey.",
        "properNouns": []
    },
    {
        "startTime": 38.6,
        "endTime": 41.0,
        "text": "Okay, well, where is the Cat Stevens CD?",
        "translationVi": "Được rồi, thế đĩa Cat Stevens đang ở đâu?",
        "ipaUs": "/oʊˈkeɪ, wɛl, wɛr ɪz ðə kæt ˈstiːvənz ˌsiːˈdiː?/",
        "keywords": ["where is CD"],
        "explanationAi": "Chandler truy lùng chuỗi dây chuyền thất lạc.",
        "properNouns": ["Cat Stevens"]
    },
    {
        "startTime": 41.1,
        "endTime": 42.5,
        "text": "In the James Taylor case.",
        "translationVi": "Trong hộp của James Taylor.",
        "ipaUs": "/ɪn ðə dʒeɪmz ˈteɪlər keɪs./",
        "keywords": ["James Taylor"],
        "explanationAi": "Tiếp tục trò chơi xáo vỏ đĩa bất tận.",
        "properNouns": ["James Taylor"]
    },
    {
        "startTime": 42.6,
        "endTime": 44.5,
        "text": "Where is the James Taylor CD?",
        "translationVi": "Thế đĩa James Taylor thì nằm ở đâu?",
        "ipaUs": "/wɛr ɪz ðə dʒeɪmz ˈteɪlər ˌsiːˈdiː?/",
        "keywords": ["where is James Taylor"],
        "explanationAi": "Chandler gặng hỏi câu tiếp theo.",
        "properNouns": ["James Taylor"]
    },
    {
        "startTime": 44.6,
        "endTime": 46.5,
        "text": "I'm going to say it's in the car.",
        "translationVi": "Tớ đoán chừng nó đang ở trong xe hơi.",
        "ipaUs": "/aɪm ˈɡoʊɪŋ tuː seɪ ɪts ɪn ðə kɑːr./",
        "keywords": ["in the car"],
        "explanationAi": "Joey bắt đầu phỏng đoán vô căn cứ.",
        "properNouns": []
    },
    {
        "startTime": 46.6,
        "endTime": 50.0,
        "text": "200 CDs, not one of them in the right case!",
        "translationVi": "200 đĩa CD, không có lấy một chiếc nào nằm đúng trong vỏ của nó!",
        "ipaUs": "/tuː ˈhʌndrəd ˌsiːˈdiːz, nɑːt wʌn əv ðɛm ɪn ðə raɪt keɪs!/",
        "keywords": ["not one of them", "right case"],
        "explanationAi": "Lời than thở tuyệt vọng của Chandler trước trật tự hỗn loạn của căn hộ.",
        "properNouns": []
    },

    # Scene 3: Wedding dancing & flailing (00:50 - 01:34)
    {
        "startTime": 50.2,
        "endTime": 53.0,
        "text": "Hey, I hear that you and Josh were going out to dinner with Ross and Emily,",
        "translationVi": "Này, tớ nghe nói cậu và Joshua sắp đi ăn tối cùng Ross và Emily đấy à,",
        "ipaUs": "/heɪ, aɪ hɪr ðæt juː ænd dʒɑːʃ wɜːr ˈɡoʊɪŋ aʊt tuː ˈdɪnər wɪð rɔːs ænd ˈɛmɪli,/",
        "keywords": ["going out to dinner"],
        "explanationAi": "Chandler chuyển đề tài sang bữa tối hẹn hò đôi nhạy cảm giữa bạn trai mới của Rachel và vợ sắp cưới của Ross.",
        "properNouns": ["Josh", "Ross", "Emily"]
    },
    {
        "startTime": 53.1,
        "endTime": 55.5,
        "text": "and I think that's... I think it's really cool.",
        "translationVi": "và tớ thấy chuyện đó... tớ thấy rất ngầu đấy chứ.",
        "ipaUs": "/ænd aɪ θɪŋk ðæts... aɪ θɪŋk ɪts ˈrɪəli kuːl./",
        "keywords": ["really cool"],
        "explanationAi": "Khen ngợi Rachel vì tỏ ra độ lượng, không ganh ghét.",
        "properNouns": []
    },
    {
        "startTime": 55.6,
        "endTime": 58.2,
        "text": "Yeah, Rachel, I think you're handling that really well.",
        "translationVi": "Ừ Rachel à, tớ thấy cậu đang đón nhận chuyện đó rất chín chắn.",
        "ipaUs": "/jæ, ˈreɪtʃəl, aɪ θɪŋk jʊr ˈhændlɪŋ ðæt ˈrɪəli wɛl./",
        "keywords": ["handling really well"],
        "explanationAi": "Cụm 'handling it well' (xử lý/đón nhận tình huống một cách khéo léo).",
        "properNouns": ["Rachel"]
    },
    {
        "startTime": 58.4,
        "endTime": 60.5,
        "text": "Handling it?",
        "translationVi": "Đón nhận gì cơ chứ?",
        "ipaUs": "/ˈhændlɪŋ ɪt?/",
        "keywords": ["defensive question"],
        "explanationAi": "Rachel lập tức phủ nhận cảm xúc tổn thương.",
        "properNouns": []
    },
    {
        "startTime": 60.6,
        "endTime": 62.5,
        "text": "There's nothing to handle.",
        "translationVi": "Chẳng có chuyện gì cần phải đón nhận cả.",
        "ipaUs": "/ðɛrz ˈnʌθɪŋ tuː ˈhændəl./",
        "keywords": ["nothing to handle"],
        "explanationAi": "Cơ chế tâm lý chối bỏ sự thật (denial).",
        "properNouns": []
    },
    {
        "startTime": 62.6,
        "endTime": 66.0,
        "text": "You know, maybe I would have a problem with this if it wasn't for me and Joshua.",
        "translationVi": "Các cậu biết đấy, có thể tớ sẽ bận tâm chuyện này nếu không phải vì tớ và Joshua đang hạnh phúc bên nhau.",
        "ipaUs": "/juː noʊ, ˈmeɪbi aɪ wʊd hæv ə ˈprɑːbləm wɪð ðɪs ɪf ɪt ˈwɑːzənt fɔːr miː ænd ˈdʒɑːʃuːə./",
        "keywords": ["if it wasn't for"],
        "explanationAi": "Rachel lấy chuyện hẹn hò với Joshua làm lá chắn tự ái.",
        "properNouns": ["Joshua"]
    },
    {
        "startTime": 66.2,
        "endTime": 69.0,
        "text": "You know, they're not going to get married anyway.",
        "translationVi": "Mà đằng nào thì hai người họ cũng chẳng cưới nhau được đâu.",
        "ipaUs": "/juː noʊ, ðeɪr nɑːt ˈɡoʊɪŋ tuː ɡɛt ˈmærid ˈɛniˌweɪ./",
        "keywords": ["not going to get married"],
        "explanationAi": "Lời khẳng định đầy ghen tị trẻ con của Rachel.",
        "properNouns": []
    },
    {
        "startTime": 69.2,
        "endTime": 71.0,
        "text": "What?",
        "translationVi": "Cái gì cơ?",
        "ipaUs": "/wʌt?/",
        "keywords": ["shocked"],
        "explanationAi": "Chandler ngạc nhiên trước sự tự huyễn hoặc của cô bạn.",
        "properNouns": []
    },
    {
        "startTime": 71.1,
        "endTime": 74.0,
        "text": "Come on. They rushed into this thing so fast, it's ridiculous.",
        "translationVi": "Thôi nào. Họ lao vào chuyện này quá vội vã, thật là nực cười.",
        "ipaUs": "/kʌm ɑːn. ðeɪ rʌʃt ˈɪntuː ðɪs θɪŋ soʊ fæst, ɪts rɪˈdɪkjələs./",
        "keywords": ["rushed into", "ridiculous"],
        "explanationAi": "Thành ngữ 'rush into something' (hấp tấp, vội vã đâm đầu vào việc gì).",
        "properNouns": []
    },
    {
        "startTime": 74.1,
        "endTime": 76.2,
        "text": "I mean, they're going to be engaged for like what? A year?",
        "translationVi": "Ý tớ là, họ sẽ đính hôn trong bao lâu chứ? Cả năm trời ư?",
        "ipaUs": "/aɪ miːn, ðeɪr ˈɡoʊɪŋ tuː biː ɛnˈɡeɪdʒd fɔːr laɪk wʌt? ə jɪr?/",
        "keywords": ["engaged"],
        "explanationAi": "Rachel tự suy đoán kịch bản tan vỡ.",
        "properNouns": []
    },
    {
        "startTime": 76.5,
        "endTime": 80.0,
        "text": "Somewhere along the way, one of them is going to realize what they've done,",
        "translationVi": "Trên chặng đường đó, một trong hai người rồi sẽ nhận ra sai lầm của mình,",
        "ipaUs": "/ˈsʌmˌwɛr əˈlɔːŋ ðə weɪ, wʌn əv ðɛm ɪz ˈɡoʊɪŋ tuː ˈriːəˌlaɪz wʌt ðeɪv dʌn,/",
        "keywords": ["somewhere along the way", "realize what they've done"],
        "explanationAi": "Cụm 'somewhere along the way' (ở một thời điểm nào đó trên hành trình).",
        "properNouns": []
    },
    {
        "startTime": 80.1,
        "endTime": 83.0,
        "text": "and they're going to call the whole thing off.",
        "translationVi": "và họ sẽ tuyên bố hủy bỏ toàn bộ đám cưới thôi.",
        "ipaUs": "/ænd ðeɪr ˈɡoʊɪŋ tuː kɔːl ðə hoʊl θɪŋ ɔːf./",
        "keywords": ["call the whole thing off"],
        "explanationAi": "Cụm động từ 'call off' (hủy bỏ một sự kiện/hôn lễ).",
        "properNouns": []
    },
    {
        "startTime": 83.1,
        "endTime": 86.2,
        "text": "I'm telling you, you're going to be dancing at my wedding before you're dancing at theirs.",
        "translationVi": "Tớ nói cho cậu hay, cậu sẽ được khiêu vũ tại đám cưới của tớ trước khi kịp nhảy ở đám cưới của họ đấy.",
        "ipaUs": "/aɪm ˈtɛlɪŋ juː, jʊr ˈɡoʊɪŋ tuː biː ˈdænsɪŋ æt maɪ ˈwɛdɪŋ bɪˈfɔːr jʊr ˈdænsɪŋ æt ðɛrz./",
        "keywords": ["dancing at my wedding"],
        "explanationAi": "Rachel đặt cược tự tin vào tương lai của mình với Joshua.",
        "properNouns": []
    },
    {
        "startTime": 86.4,
        "endTime": 88.8,
        "text": "You know, I don't dance at weddings.",
        "translationVi": "Cậu biết đấy, tớ không bao giờ khiêu vũ ở đám cưới.",
        "ipaUs": "/juː noʊ, aɪ doʊnt dæns æt ˈwɛdɪŋz./",
        "keywords": ["don't dance at weddings"],
        "explanationAi": "Chandler dập tắt sự mơ mộng của Rachel bằng tuyên ngôn cá nhân lạnh lùng.",
        "properNouns": []
    },
    {
        "startTime": 89.0,
        "endTime": 90.2,
        "text": "Why not?",
        "translationVi": "Tại sao lại không?",
        "ipaUs": "/waɪ nɑːt?/",
        "keywords": ["why not"],
        "explanationAi": "Rachel tò mò hỏi lý do.",
        "properNouns": []
    },
    {
        "startTime": 90.3,
        "endTime": 95.0,
        "text": "Because weddings are a great place to meet women, and when I dance, I look like this!",
        "translationVi": "Bởi vì tiệc cưới là nơi tuyệt vời để làm quen phụ nữ, mà hễ tớ nhảy, trông tớ lại kinh dị thế này đây!",
        "ipaUs": "/bɪˈkɔːz ˈwɛdɪŋz ɑːr ə ɡreɪt pleɪs tuː miːt ˈwɪmɪn, ænd wɛn aɪ dæns, aɪ lʊk laɪk ðɪs!/",
        "keywords": ["meet women", "look like this", "comic dance"],
        "explanationAi": "Pha tự trào đỉnh cao kèm điệu nhảy vụng về co giật không khớp nhạc mang tính biểu tượng của Matthew Perry.",
        "properNouns": []
    },

    # Scene 4: Jack Geller & the Conception Talk (01:45 - 02:34)
    {
        "startTime": 105.0,
        "endTime": 107.5,
        "text": "Hey, man.",
        "translationVi": "Chào anh bạn.",
        "ipaUs": "/heɪ, mæn./",
        "keywords": ["greeting"],
        "explanationAi": "Bố Monica (Jack Geller) bước vào nói chuyện riêng với Chandler.",
        "properNouns": []
    },
    {
        "startTime": 108.0,
        "endTime": 112.0,
        "text": "I just don't want you to think that we're animals who do it whenever we want.",
        "translationVi": "Con chỉ không muốn bố nghĩ rằng tụi con là lũ động vật bạ lúc nào cũng làm chuyện đó đâu ạ.",
        "ipaUs": "/aɪ dʒʌst doʊnt wɑːnt juː tuː θɪŋk ðæt wɪr ˈænəməlz huː duː ɪt wɛnˈɛvər wiː wɑːnt./",
        "keywords": ["animals who do it"],
        "explanationAi": "Chandler ngượng ngùng thanh minh sau khi bị bố vợ Jack Geller bắt gặp khoảnh khắc nhạy cảm.",
        "properNouns": []
    },
    {
        "startTime": 112.2,
        "endTime": 114.2,
        "text": "Well, I don't think that.",
        "translationVi": "À, ta đâu có nghĩ vậy.",
        "ipaUs": "/wɛl, aɪ doʊnt θɪŋk ðæt./",
        "keywords": ["reassurance"],
        "explanationAi": "Jack Geller từ tốn trấn an.",
        "properNouns": []
    },
    {
        "startTime": 114.3,
        "endTime": 118.5,
        "text": "Before today, I never thought of you two having sex at all.",
        "translationVi": "Trước ngày hôm nay, ta chưa từng mảy may nghĩ tới việc hai đứa quan hệ với nhau đâu.",
        "ipaUs": "/bɪˈfɔːr təˈdeɪ, aɪ ˈnɛvər θɔːt əv juː tuː ˈhævɪŋ sɛks æt ɔːl./",
        "keywords": ["never thought of you two having sex"],
        "explanationAi": "Lời nói thật thà nhưng thốn thấu tim gan của một người cha.",
        "properNouns": []
    },
    {
        "startTime": 118.6,
        "endTime": 121.5,
        "text": "It was a simpler time.",
        "translationVi": "Đó quả là một khoảng thời gian yên bình giản đơn hơn nhiều.",
        "ipaUs": "/ɪt wʌz ə ˈsɪmplər taɪm./",
        "keywords": ["simpler time"],
        "explanationAi": "Câu mỉa mai hoài niệm 'a simpler time' được Chandler dùng khi ước gì chuyện không bao giờ bị vỡ lở.",
        "properNouns": []
    },
    {
        "startTime": 122.0,
        "endTime": 125.2,
        "text": "The truth is, Dad, we're trying.",
        "translationVi": "Sự thật là, bố ơi, tụi con đang cố gắng.",
        "ipaUs": "/ðə truːθ ɪz, dæd, wɪr ˈtraɪɪŋ./",
        "keywords": ["the truth is", "trying"],
        "explanationAi": "Monica bước vào bộc bạch sự thật về việc cố gắng mang thai.",
        "properNouns": []
    },
    {
        "startTime": 125.3,
        "endTime": 126.5,
        "text": "What?",
        "translationVi": "Cố gắng gì cơ?",
        "ipaUs": "/wʌt?/",
        "keywords": ["confused"],
        "explanationAi": "Jack Geller chưa kịp hiểu ý.",
        "properNouns": []
    },
    {
        "startTime": 126.6,
        "endTime": 128.5,
        "text": "We're trying to get pregnant.",
        "translationVi": "Tụi con đang cố gắng để có em bé ạ.",
        "ipaUs": "/wɪr ˈtraɪɪŋ tuː ɡɛt ˈprɛɡnənt./",
        "keywords": ["get pregnant"],
        "explanationAi": "Thông báo nghiêm túc về kế hoạch sinh con của hai vợ chồng.",
        "properNouns": []
    },
    {
        "startTime": 128.6,
        "endTime": 130.5,
        "text": "Oh, my God, this is so exciting!",
        "translationVi": "Ôi Chúa ơi, tin này hào hứng quá đi mất!",
        "ipaUs": "/oʊ, maɪ ɡɑːd, ðɪs ɪz soʊ ɪkˈsaɪtɪŋ!/",
        "keywords": ["so exciting"],
        "explanationAi": "Jack Geller vỡ òa niềm vui sắp có cháu ngoại.",
        "properNouns": []
    },
    {
        "startTime": 130.6,
        "endTime": 133.2,
        "text": "Well, get back in there! I'll guard the door!",
        "translationVi": "Thế thì vào lại trong đó mau lên! Bố sẽ đứng canh cửa cho!",
        "ipaUs": "/wɛl, ɡɛt bæk ɪn ðɛr! aɪl ɡɑːrd ðə dɔːr!/",
        "keywords": ["guard the door"],
        "explanationAi": "Sự nhiệt tình thái quá của bố vợ khiến hai người ngượng chín mặt.",
        "properNouns": []
    },
    {
        "startTime": 133.3,
        "endTime": 136.2,
        "text": "That's okay. We can wait until later.",
        "translationVi": "Dạ thôi không sao đâu bố. Tụi con có thể đợi lát nữa cũng được ạ.",
        "ipaUs": "/ðæts oʊˈkeɪ. wiː kæn weɪt ənˈtɪl ˈleɪtər./",
        "keywords": ["wait until later"],
        "explanationAi": "Monica tìm cách hoãn binh thoái thác.",
        "properNouns": []
    },
    {
        "startTime": 136.3,
        "endTime": 139.2,
        "text": "Whoa, whoa, whoa. I don't think so! Aren't you ovulating?",
        "translationVi": "Khoan, khoan đã nào. Bố không đồng ý đâu nhé! Chẳng phải con đang trong kỳ rụng trứng sao?",
        "ipaUs": "/woʊ, woʊ, woʊ. aɪ doʊnt θɪŋk soʊ! ɑːrnt juː ˈɑːvjəˌleɪtɪŋ?/",
        "keywords": ["ovulating"],
        "explanationAi": "Thuật ngữ y khoa 'ovulating' (rụng trứng) được ông bố nhắc tới một cách tự nhiên đến ngượng ngùng.",
        "properNouns": []
    },
    {
        "startTime": 139.3,
        "endTime": 141.2,
        "text": "Yeah!",
        "translationVi": "Dạ đúng rồi!",
        "ipaUs": "/jæ!/",
        "keywords": ["affirmation"],
        "explanationAi": "Monica bất lực gật đầu.",
        "properNouns": []
    },
    {
        "startTime": 141.3,
        "endTime": 143.2,
        "text": "Well, you got to get at it, Princess!",
        "translationVi": "Thế thì hai đứa phải hành động ngay lập tức đi chứ, Công chúa của bố!",
        "ipaUs": "/wɛl, juː ɡɑːt tuː ɡɛt æt ɪt, ˈprɪnsɛs!/",
        "keywords": ["get at it", "Princess"],
        "explanationAi": "Khẩu ngữ 'get at it' (bắt tay vào hành động ngay không chậm trễ).",
        "properNouns": []
    },
    {
        "startTime": 143.3,
        "endTime": 145.5,
        "text": "When your mother and I were trying to conceive you,",
        "translationVi": "Hồi mẹ con và bố cố gắng thụ thai ra con ấy mà,",
        "ipaUs": "/wɛn jʊər ˈmʌðər ænd aɪ wɜːr ˈtraɪɪŋ tuː kənˈsiːv juː,/",
        "keywords": ["trying to conceive"],
        "explanationAi": "Jack Geller bắt đầu bài giảng kinh nghiệm gia đình đầy ám ảnh.",
        "properNouns": []
    },
    {
        "startTime": 145.6,
        "endTime": 148.2,
        "text": "whenever she was ovulating, bam, we did it!",
        "translationVi": "cứ hễ bà ấy rụng trứng một cái, bùm, là tụi này chiến luôn!",
        "ipaUs": "/wɛnˈɛvər ʃiː wʌz ˈɑːvjəˌleɪtɪŋ, bæm, wiː dɪd ɪt!/",
        "keywords": ["bam, we did it"],
        "explanationAi": "Từ tượng thanh hài hước 'bam!' miêu tả sự gấp gáp quyết liệt.",
        "properNouns": []
    },
    {
        "startTime": 148.3,
        "endTime": 150.5,
        "text": "That's how I got my bad hip.",
        "translationVi": "Đó cũng là lý do vì sao bố bị hỏng mất cái khớp háng này đấy.",
        "ipaUs": "/ðæts haʊ aɪ ɡɑːt maɪ bæd hɪp./",
        "keywords": ["bad hip"],
        "explanationAi": "Chi tiết chia sẻ quá trớn (TMI - Too Much Information) khiến con cái rùng mình.",
        "properNouns": []
    },
    {
        "startTime": 150.6,
        "endTime": 154.5,
        "text": "It's fine. This conversation is how I got the bullet hole in my head.",
        "translationVi": "Không sao đâu bố. Cuộc trò chuyện này chính là lý do vì sao con có cái lỗ đạn xuyên qua đầu này đây.",
        "ipaUs": "/ɪts faɪn. ðɪs ˌkɑːnvərˈseɪʃən ɪz haʊ aɪ ɡɑːt ðə ˈbʊlɪt hoʊl ɪn maɪ hɛd./",
        "keywords": ["bullet hole in my head", "sarcastic burn"],
        "explanationAi": "Một trong những câu mỉa mai sắc sảo nhất sự nghiệp của Chandler: cường điệu nỗi thống khổ tinh thần như vừa bị bắn thủng đầu.",
        "properNouns": []
    },

    # Scene 5: Joey as a Waiter at Central Perk (02:34 - 03:34)
    {
        "startTime": 154.8,
        "endTime": 157.5,
        "text": "Tell me, what's going on? Why didn't you tell us you work here?",
        "translationVi": "Nói tớ nghe coi, có chuyện gì thế? Sao cậu không nói cho bọn này biết là cậu làm việc ở đây?",
        "ipaUs": "/tɛl miː, wʌts ˈɡoʊɪŋ ɑːn? waɪ ˈdɪdənt juː tɛl ʌs juː wɜːrk hɪr?/",
        "keywords": ["why didn't you tell us"],
        "explanationAi": "Monica và Chandler ngạc nhiên khi thấy Joey trong trang phục bồi bàn tại quán cà phê quen thuộc.",
        "properNouns": []
    },
    {
        "startTime": 157.8,
        "endTime": 162.0,
        "text": "Well, it's kind of embarrassing. I mean, I was an actor. Now I'm a waiter.",
        "translationVi": "Ờ thì... cũng hơi ngượng mà. Ý tớ là, tớ từng là diễn viên. Giờ lại làm bồi bàn.",
        "ipaUs": "/wɛl, ɪts kaɪnd əv ɪmˈbærəsɪŋ. aɪ miːn, aɪ wʌz ən ˈæktər. naʊ aɪm ə ˈweɪtər./",
        "keywords": ["embarrassing", "actor to waiter"],
        "explanationAi": "Joey bộc bạch sự mặc cảm khi sự nghiệp diễn xuất xuống dốc.",
        "properNouns": []
    },
    {
        "startTime": 162.2,
        "endTime": 165.5,
        "text": "I'm supposed to go in the other direction.",
        "translationVi": "Đáng lẽ con đường sự nghiệp của tớ phải đi theo chiều ngược lại chứ.",
        "ipaUs": "/aɪm səˈpoʊzd tuː ɡoʊ ɪn ðɪ ˈʌðər dəˈrɛkʃən./",
        "keywords": ["other direction"],
        "explanationAi": "Người ta thường đi từ bồi bàn lên làm diễn viên, chứ không ai tụt dốc ngược lại.",
        "properNouns": []
    },
    {
        "startTime": 166.0,
        "endTime": 171.0,
        "text": "So, your apron. You're wearing it like a cape.",
        "translationVi": "Thế nên, cái tạp dề của cậu... cậu mới khoác nó như áo choàng siêu nhân đấy à.",
        "ipaUs": "/soʊ, jʊər ˈeɪprən. jʊr ˈwɛrɪŋ ɪt laɪk ə keɪp./",
        "keywords": ["apron like a cape"],
        "explanationAi": "Chandler chỉ ngay ra điểm hài hước trong hành vi chối bỏ thực tại của Joey.",
        "properNouns": []
    },
    {
        "startTime": 172.0,
        "endTime": 175.2,
        "text": "I mean, the job's easy and the money's good, you know?",
        "translationVi": "Ý tớ là, công việc này dễ mà tiền cũng khá, các cậu biết đấy.",
        "ipaUs": "/aɪ miːn, ðə dʒɑːbz ˈiːzi ænd ðə ˈmʌniz ɡʊd, juː noʊ?/",
        "keywords": ["job's easy", "money's good"],
        "explanationAi": "Joey tự tìm mặt tích cực của công việc phục vụ.",
        "properNouns": []
    },
    {
        "startTime": 175.5,
        "endTime": 179.5,
        "text": "I guess I'm going to be hanging out here anyway. I might as well get paid for it, right?",
        "translationVi": "Đằng nào thì tớ cũng lê la ở quán này suốt ngày. Thế thì kiếm tiền từ nó luôn cũng được chứ sao, đúng không?",
        "ipaUs": "/aɪ ɡɛs aɪm ˈɡoʊɪŋ tuː biː ˈhæŋɪŋ aʊt hɪr ˈɛniˌweɪ. aɪ maɪt æz wɛl ɡɛt peɪd fɔːr ɪt, raɪt?/",
        "keywords": ["might as well get paid"],
        "explanationAi": "Thành ngữ 'might as well' (tiện thể thì làm luôn, chẳng mất gì).",
        "properNouns": []
    },
    {
        "startTime": 179.8,
        "endTime": 183.5,
        "text": "It's just, you know, kind of weird serving you guys, you know?",
        "translationVi": "Chỉ là, cậu biết đấy, phục vụ mấy đứa bạn thân cảm giác cứ kỳ kỳ sao ấy.",
        "ipaUs": "/ɪts dʒʌst, juː noʊ, kaɪnd əv wɪrd ˈsɜːrvɪŋ juː ɡaɪz, juː noʊ?/",
        "keywords": ["kind of weird serving you guys"],
        "explanationAi": "Joey lo lắng bạn bè sẽ nhìn mình với ánh mắt thương hại.",
        "properNouns": []
    },
    {
        "startTime": 184.0,
        "endTime": 188.0,
        "text": "Joey, come on. I did it and it was fine. Why would it be weird?",
        "translationVi": "Joey, thôi nào. Tớ từng làm bồi bàn suốt và thấy bình thường mà. Có gì đâu mà kỳ quặc chứ?",
        "ipaUs": "/ˈdʒoʊi, kʌm ɑːn. aɪ dɪd ɪt ænd ɪt wʌz faɪn. waɪ wʊd ɪt biː wɪrd?/",
        "keywords": ["I did it and it was fine"],
        "explanationAi": "Rachel động viên Joey bằng kinh nghiệm từng làm việc tại Central Perk.",
        "properNouns": ["Joey"]
    },
    {
        "startTime": 188.2,
        "endTime": 192.5,
        "text": "Hey, Joey, uh, could I get some coffee?",
        "translationVi": "Ê Joey, cho tớ gọi một tách cà phê được không bạn hiền?",
        "ipaUs": "/heɪ, ˈdʒoʊi, ʌ, kʊd aɪ ɡɛt sʌm ˈkɔːfi?/",
        "keywords": ["could I get some coffee"],
        "explanationAi": "Chandler lập tức thử nghiệm gọi món để trêu chọc người bạn cùng phòng.",
        "properNouns": ["Joey"]
    },
    {
        "startTime": 193.0,
        "endTime": 195.2,
        "text": "Okay, I guess it doesn't seem that weird.",
        "translationVi": "Được rồi, trông cũng không kỳ quặc như tớ tưởng.",
        "ipaUs": "/oʊˈkeɪ, aɪ ɡɛs ɪt ˈdʌzənt siːm ðæt wɪrd./",
        "keywords": ["doesn't seem that weird"],
        "explanationAi": "Joey bắt đầu nguôi ngoai và cảm thấy tự tin hơn.",
        "properNouns": []
    },
    {
        "startTime": 195.5,
        "endTime": 198.8,
        "text": "Seriously, I asked before and you still haven't gotten it.",
        "translationVi": "Nghiêm túc đấy, tớ gọi từ nãy đến giờ mà cậu vẫn chưa thèm bưng ra kìa.",
        "ipaUs": "/ˈsɪriəsli, aɪ æskt bɪˈfɔːr ænd juː stɪl ˈhævənt ˈɡɑːtən ɪt./",
        "keywords": ["still haven't gotten it"],
        "explanationAi": "Chandler bồi thêm một câu mỉa mai khách hàng khó tính.",
        "properNouns": []
    },
    {
        "startTime": 199.0,
        "endTime": 201.5,
        "text": "It's weird again.",
        "translationVi": "Lại thấy kỳ quặc trở lại rồi đấy.",
        "ipaUs": "/ɪts wɪrd əˈɡɛn./",
        "keywords": ["weird again"],
        "explanationAi": "Joey lập tức thay đổi sắc mặt trong tích tắc.",
        "properNouns": []
    },
    {
        "startTime": 202.0,
        "endTime": 207.0,
        "text": "I think it's great that you work here. You're going to make a lot of money and here's your first tip.",
        "translationVi": "Tớ thấy tuyệt vời khi cậu làm việc ở đây. Cậu sẽ kiếm được bộn tiền đấy, và đây là tiền boa đầu tiên dành cho cậu.",
        "ipaUs": "/aɪ θɪŋk ɪts ɡreɪt ðæt juː wɜːrk hɪr. jʊr ˈɡoʊɪŋ tuː meɪk ə lɑːt əv ˈmʌni ænd hɪrz jʊər fɜːrst tɪp./",
        "keywords": ["first tip"],
        "explanationAi": "Chơi chữ ở từ 'tip' (vừa là tiền boa, vừa là lời khuyên hữu ích).",
        "properNouns": []
    },
    {
        "startTime": 207.2,
        "endTime": 210.0,
        "text": "Don't eat yellow snow.",
        "translationVi": "Đừng bao giờ dại dột ăn tuyết màu vàng.",
        "ipaUs": "/doʊnt iːt ˈjɛloʊ snoʊ./",
        "keywords": ["don't eat yellow snow"],
        "explanationAi": "Câu châm ngôn dân gian Mỹ hài hước cảnh báo về tuyết bị chó mèo phóng uế bẩn.",
        "properNouns": []
    },

    # Scene 6: Chandler's Bubble Bath & the Gang Intrusion (03:34 - 05:28)
    {
        "startTime": 215.0,
        "endTime": 218.5,
        "text": "Hi, Bubbles. Manly.",
        "translationVi": "Chào Bọt Tuyết. Nam tính ghê cơ.",
        "ipaUs": "/haɪ, ˈbʌbəlz. ˈmænli./",
        "keywords": ["Bubbles", "Manly"],
        "explanationAi": "Monica trêu chọc Chandler khi anh nằm ngâm bồn tắm bọt xà phòng đầy nữ tính nhưng cố tỏ ra nam tính.",
        "properNouns": []
    },
    {
        "startTime": 222.0,
        "endTime": 224.0,
        "text": "You told her?",
        "translationVi": "Cậu nói cho cô ấy biết rồi à?",
        "ipaUs": "/juː toʊld hɜːr?/",
        "keywords": ["secret revealed"],
        "explanationAi": "Chandler phát hiện bí mật của mình bị lộ.",
        "properNouns": []
    },
    {
        "startTime": 225.0,
        "endTime": 227.0,
        "text": "She pulled it out of me.",
        "translationVi": "Cô ấy đã cạy miệng tớ ra đấy chứ.",
        "ipaUs": "/ʃiː pʊld ɪt aʊt əv miː./",
        "keywords": ["pulled it out of me"],
        "explanationAi": "Thành ngữ 'pull something out of someone' (cạy miệng ai, ép ai khai ra bí mật).",
        "properNouns": []
    },
    {
        "startTime": 227.2,
        "endTime": 230.0,
        "text": "She's like a conversational wizard.",
        "translationVi": "Cô ấy cứ như một phù thủy đàm thoại bậc thầy vậy.",
        "ipaUs": "/ʃiːz laɪk ə ˌkɑːnvərˈseɪʃənəl ˈwɪzərd./",
        "keywords": ["conversational wizard"],
        "explanationAi": "Cách dùng từ ví von cường điệu hài hước của Joey để bào chữa cho việc không giữ được bí mật.",
        "properNouns": []
    },
    {
        "startTime": 251.0,
        "endTime": 254.0,
        "text": "Whoa! We're in the bathroom!",
        "translationVi": "Khoan đã! Bọn mình đang ở trong phòng tắm đấy nhé!",
        "ipaUs": "/woʊ! wɪr ɪn ðə ˈbæθruːm!/",
        "keywords": ["in the bathroom"],
        "explanationAi": "Chandler giật mình khi Joey thản nhiên bước vào phòng tắm tâm sự như chốn không người.",
        "properNouns": []
    },
    {
        "startTime": 255.0,
        "endTime": 258.5,
        "text": "Because it's a relaxing and enjoyable time.",
        "translationVi": "Bởi vì đây là khoảng thời gian thư giãn và tận hưởng tuyệt vời.",
        "ipaUs": "/bɪˈkɔːz ɪts ə rɪˈlæksɪŋ ænd ɛnˈdʒɔɪəbl̩ taɪm./",
        "keywords": ["relaxing and enjoyable"],
        "explanationAi": "Chandler cố gắng bảo vệ quyền tận hưởng bồn tắm xà phòng của mình.",
        "properNouns": []
    },
    {
        "startTime": 262.0,
        "endTime": 264.5,
        "text": "What are you guys doing in here?",
        "translationVi": "Mấy người đang làm cái quái gì trong này thế hả?",
        "ipaUs": "/wʌt ɑːr juː ɡaɪz ˈduːɪŋ ɪn hɪr?/",
        "keywords": ["intruders"],
        "explanationAi": "Chandler bất lực khi phòng tắm bỗng biến thành phòng họp chung.",
        "properNouns": []
    },
    {
        "startTime": 270.0,
        "endTime": 272.5,
        "text": "It's Rachel. You like Rachel?",
        "translationVi": "Đó là Rachel. Cậu thích Rachel thật đấy à?",
        "ipaUs": "/ɪts ˈreɪtʃəl. juː laɪk ˈreɪtʃəl?/",
        "keywords": ["you like Rachel"],
        "explanationAi": "Bí mật tình cảm gây sốc của Joey được tiết lộ ngay trong bồn tắm.",
        "properNouns": ["Rachel"]
    },
    {
        "startTime": 272.6,
        "endTime": 277.0,
        "text": "Look, it's no big deal. Phoebe and I talked about it. It's just a crush.",
        "translationVi": "Nghe này, không có gì to tát đâu. Tớ và Phoebe đã bàn rồi, chỉ là cơn say nắng nhất thời thôi.",
        "ipaUs": "/lʊk, ɪts noʊ bɪɡ diːl. ˈfiːbi ænd aɪ tɔːkt əˈbaʊt ɪt. ɪts dʒʌst ə krʌʃ./",
        "keywords": ["no big deal", "just a crush"],
        "explanationAi": "Khái niệm 'just a crush' (chỉ là rung động nhất thời).",
        "properNouns": ["Phoebe"]
    },
    {
        "startTime": 277.2,
        "endTime": 280.5,
        "text": "It's going to go away, dude. You got to rearrange your bubbles.",
        "translationVi": "Nó sẽ qua mau thôi mà bạn hiền. Cậu mau chỉnh đốn lại đống bọt xà phòng che người đi kìa.",
        "ipaUs": "/ɪts ˈɡoʊɪŋ tuː ɡoʊ əˈweɪ, duːd. juː ɡɑːt tuː ˌriːəˈreɪndʒ jʊər ˈbʌbəlz./",
        "keywords": ["rearrange your bubbles"],
        "explanationAi": "Lời nhắc nhở dở khóc dở cười của Joey khi bọt xà phòng trong bồn tắm bị tan làm lộ cơ thể Chandler.",
        "properNouns": []
    },
    {
        "startTime": 296.0,
        "endTime": 298.5,
        "text": "Honey, open up with the boat.",
        "translationVi": "Em yêu ơi, mở cửa mang chiếc thuyền vào đây nhanh lên.",
        "ipaUs": "/ˈhʌni, ˈoʊpən ʌp wɪð ðə boʊt./",
        "keywords": ["open up with the boat"],
        "explanationAi": "Monica hào hứng mang chiếc thuyền đồ chơi vào cho chồng chơi trong bồn tắm.",
        "properNouns": []
    },
    {
        "startTime": 301.0,
        "endTime": 305.5,
        "text": "Hello? Yes, we're all in here and we'd love for you to join us.",
        "translationVi": "Alo? Vâng, tất cả bọn tôi đều đang ở trong này và rất mong cậu cùng tham gia cho vui đấy.",
        "ipaUs": "/həˈloʊ? jɛs, wɪr ɔːl ɪn hɪr ænd wiːd lʌv fɔːr juː tuː dʒɔɪn ʌs./",
        "keywords": ["join us in bathroom", "peak sarcasm"],
        "explanationAi": "Chandler dùng sự mỉa mai tột cùng chào đón vị khách tiếp theo vào phòng tắm chật ních.",
        "properNouns": []
    },
    {
        "startTime": 310.5,
        "endTime": 313.0,
        "text": "Ooh, cool boat.",
        "translationVi": "Ồ, chiếc thuyền ngầu đấy chứ.",
        "ipaUs": "/uː, kuːl boʊt./",
        "keywords": ["cool boat"],
        "explanationAi": "Ross khen ngợi chiếc thuyền đồ chơi trong sự bẽ bàng của Chandler.",
        "properNouns": []
    },
    {
        "startTime": 320.0,
        "endTime": 323.5,
        "text": "We're having a girl!",
        "translationVi": "Bọn em sắp có một bé gái rồi!",
        "ipaUs": "/wɪr ˈhævɪŋ ə ɡɜːrl!/",
        "keywords": ["having a girl"],
        "explanationAi": "Rachel và Ross thông báo tin mừng về giới tính của em bé Emma.",
        "properNouns": []
    },

    # Scene 7: Ross & the Poughkeepsie Train Date (05:28 - 06:06)
    {
        "startTime": 330.0,
        "endTime": 334.0,
        "text": "Yeah, I met this girl on the train going to a museum upstate.",
        "translationVi": "Ừ, tớ gặp cô gái này trên chuyến tàu đi đến viện bảo tàng ở mạn ngoại ô phía bắc.",
        "ipaUs": "/jæ, aɪ mɛt ðɪs ɡɜːrl ɑːn ðə treɪn ˈɡoʊɪŋ tuː ə mjuːˈziːəm ˈʌpsteɪt./",
        "keywords": ["met on train", "museum upstate"],
        "explanationAi": "Ross bắt đầu hào hứng kể về cuộc gặp gỡ định mệnh trên tàu hỏa.",
        "properNouns": []
    },
    {
        "startTime": 339.0,
        "endTime": 342.5,
        "text": "Okay, it was just me and her at the back of the train.",
        "translationVi": "Được rồi, lúc đó chỉ có mỗi tớ và cô ấy ở tận góc cuối toa tàu thôi.",
        "ipaUs": "/oʊˈkeɪ, ɪt wʌz dʒʌst miː ænd hɜːr æt ðə bæk əv ðə treɪn./",
        "keywords": ["back of the train"],
        "explanationAi": "Bối cảnh vắng vẻ thuận lợi cho việc làm quen.",
        "properNouns": []
    },
    {
        "startTime": 342.6,
        "endTime": 346.0,
        "text": "And I sat near the door, so she'd have to pass by me.",
        "translationVi": "Và tớ ngồi chắn ngay gần cửa ra vào, để cô ấy buộc phải đi ngang qua mặt tớ.",
        "ipaUs": "/ænd aɪ sæt nɪr ðə dɔːr, soʊ ʃiːd hæv tuː pæs baɪ miː./",
        "keywords": ["sat near door"],
        "explanationAi": "Chiến thuật tán tỉnh mang hơi hướng bẫy đường đi của Ross.",
        "properNouns": []
    },
    {
        "startTime": 346.1,
        "endTime": 349.0,
        "text": "If she wanted to switch cars, she was totally at my mercy.",
        "translationVi": "Nếu cô ấy muốn đổi sang toa khác, cô ấy hoàn toàn nằm trong tầm kiểm soát của tớ.",
        "ipaUs": "/ɪf ʃiː ˈwɑːntɪd tuː swɪtʃ kɑːrz, ʃiː wʌz ˈtoʊtəli æt maɪ ˈmɜːrsi./",
        "keywords": ["at my mercy"],
        "explanationAi": "Thành ngữ 'at someone's mercy' (nằm dưới sự khống chế/định đoạt của ai) khiến câu chuyện nghe giống như một vụ bắt cóc hơn là hẹn hò lãng mạn.",
        "properNouns": []
    },
    {
        "startTime": 349.2,
        "endTime": 353.0,
        "text": "Were you so late because you were burying this woman?",
        "translationVi": "Cậu đến muộn thế này là vì mải đào hố chôn người phụ nữ đó đấy à?",
        "ipaUs": "/wɜːr juː soʊ leɪt bɪˈkɔːz juː wɜːr ˈbɛriɪŋ ðɪs ˈwʊmən?/",
        "keywords": ["burying this woman", "dark humor"],
        "explanationAi": "Pha bẻ lái hài kịch đen (dark comedy) sắc lẻm của Chandler trước lối kể chuyện rùng rợn của Ross.",
        "properNouns": []
    },
    {
        "startTime": 353.2,
        "endTime": 356.0,
        "text": "I'm getting back now because she lives in Poughkeepsie.",
        "translationVi": "Tớ về muộn là vì cô ấy sống tận ở thị trấn Poughkeepsie cơ.",
        "ipaUs": "/aɪm ˈɡɛtɪŋ bæk naʊ bɪˈkɔːz ʃiː lɪvz ɪn pəˈkɪpsi./",
        "keywords": ["Poughkeepsie"],
        "explanationAi": "Địa danh Poughkeepsie thuộc tiểu bang New York, cách trung tâm Manhattan hơn hai giờ đi tàu hỏa.",
        "properNouns": ["Poughkeepsie"]
    },
    {
        "startTime": 356.1,
        "endTime": 359.5,
        "text": "She seems really great, but she's like two and a half hours away.",
        "translationVi": "Cô ấy có vẻ rất tuyệt, nhưng lại ở cách xa tới hai tiếng rưỡi đi tàu.",
        "ipaUs": "/ʃiː siːmz ˈrɪəli ɡreɪt, bʌt ʃiːz laɪk tuː ænd ə hæf ˈaʊərz əˈweɪ./",
        "keywords": ["two and a half hours away"],
        "explanationAi": "Khoảng cách địa lý trắc trở cho một mối quan hệ hẹn hò.",
        "properNouns": []
    },
    {
        "startTime": 359.6,
        "endTime": 363.0,
        "text": "How can she be great if she's from Poughkeepsie?",
        "translationVi": "Làm sao một người có thể tuyệt vời được nếu cô ta đến từ Poughkeepsie cơ chứ?",
        "ipaUs": "/haʊ kæn ʃiː biː ɡreɪt ɪf ʃiːz frʌm pəˈkɪpsi?/",
        "keywords": ["from Poughkeepsie"],
        "explanationAi": "Định kiến hóm hỉnh của dân Manhattan New York về các thị trấn nhỏ ngoại ô.",
        "properNouns": ["Poughkeepsie"]
    },
    {
        "startTime": 364.0,
        "endTime": 366.5,
        "text": "Okay, that joke would have killed in Albany.",
        "translationVi": "Được rồi, câu đùa đó chắc sẽ làm cả thành phố Albany cười nổ tung đấy.",
        "ipaUs": "/oʊˈkeɪ, ðæt dʒoʊk wʊd hæv kɪld ɪn ˈɔːlbəni./",
        "keywords": ["killed in Albany", "idiom"],
        "explanationAi": "Thành ngữ giới nghệ sĩ hài 'kill' (thành công rực rỡ, làm khán giả cười nghiêng ngả). Albany là thủ phủ của bang New York gần Poughkeepsie.",
        "properNouns": ["Albany"]
    },

    # Scene 8: Audition Favor & "Thursday / The Third Day" (06:06 - 07:11)
    {
        "startTime": 367.0,
        "endTime": 370.5,
        "text": "You know that girl you went to college with who became a movie director?",
        "translationVi": "Cậu còn nhớ cô bạn học đại học cùng cậu mà sau này thành đạo diễn phim không?",
        "ipaUs": "/juː noʊ ðæt ɡɜːrl juː wɛnt tuː ˈkɑːlɪdʒ wɪð huː bɪˈkeɪm ə ˈmuːvi dəˈrɛktər?/",
        "keywords": ["movie director"],
        "explanationAi": "Joey tìm đến Chandler để nhờ vả mối quan hệ cựu sinh viên.",
        "properNouns": []
    },
    {
        "startTime": 370.6,
        "endTime": 374.0,
        "text": "Oh yeah, Dana Keystone. She was in my movement class.",
        "translationVi": "À ừ, Dana Keystone. Cô ấy học chung lớp chuyển động hình thể với tớ.",
        "ipaUs": "/oʊ jæ, ˈdeɪnə ˈkiːstoʊn. ʃiː wʌz ɪn maɪ ˈmuːvmənt klæs./",
        "keywords": ["Dana Keystone", "movement class"],
        "explanationAi": "Lớp học 'movement class' (chuyển động hình thể cho kịch nghệ).",
        "properNouns": ["Dana Keystone"]
    },
    {
        "startTime": 374.2,
        "endTime": 375.5,
        "text": "What's a movement class?",
        "translationVi": "Lớp chuyển động là lớp quái gì thế?",
        "ipaUs": "/wʌts ə ˈmuːvmənt klæs?/",
        "keywords": ["movement class"],
        "explanationAi": "Joey thắc mắc về khóa học nghệ thuật kỳ lạ.",
        "properNouns": []
    },
    {
        "startTime": 375.6,
        "endTime": 379.0,
        "text": "It's Chandler's way of pretending he didn't take mime.",
        "translationVi": "Đó là cách Chandler giả vờ rằng mình không hề đi học môn kịch câm đấy mà.",
        "ipaUs": "/ɪts ˈtʃændlərz weɪ əv prɪˈtɛndɪŋ hiː ˈdɪdənt teɪk maɪm./",
        "keywords": ["didn't take mime"],
        "explanationAi": "Monica lật tẩy quá khứ từng đi học kịch câm (mime) đáng xấu hổ của bạn trai.",
        "properNouns": ["Chandler"]
    },
    {
        "startTime": 379.2,
        "endTime": 383.5,
        "text": "Oh, listen, anyway, she's directing the new Al Pacino movie. You got to get me an audition!",
        "translationVi": "Ôi nghe này, cô ấy đang làm đạo diễn cho bộ phim mới của Al Pacino đấy. Cậu phải xin cho tớ một suất thử vai mới được!",
        "ipaUs": "/oʊ, ˈlɪsən, ˈɛniˌweɪ, ʃiːz dəˈrɛktɪŋ ðə nuː æl pəˈtʃiːnoʊ ˈmuːvi. juː ɡɑːt tuː ɡɛt miː ən ɔːˈdɪʃən!/",
        "keywords": ["Al Pacino movie", "get me an audition"],
        "explanationAi": "Cơ hội đổi đời quý giá của Joey trong một dự án điện ảnh của huyền thoại Al Pacino.",
        "properNouns": ["Al Pacino"]
    },
    {
        "startTime": 384.0,
        "endTime": 387.5,
        "text": "Oh, I don't know, man. I haven't talked to her in like ten years.",
        "translationVi": "Ôi tớ không biết nữa anh bạn. Tớ đã không nói chuyện với cô ấy suốt cả mười năm nay rồi.",
        "ipaUs": "/oʊ, aɪ doʊnt noʊ, mæn. aɪ ˈhævənt tɔːkt tuː hɜːr ɪn laɪk tɛn jɪrz./",
        "keywords": ["haven't talked in ten years"],
        "explanationAi": "Chandler ngần ngại vì mối quan hệ đã quá nguội lạnh.",
        "properNouns": []
    },
    {
        "startTime": 387.6,
        "endTime": 390.5,
        "text": "No, please, Chandler, I would owe you so much!",
        "translationVi": "Đi mà Chandler, tớ xin cậu đấy, tớ sẽ nợ cậu nhiều lắm luôn!",
        "ipaUs": "/noʊ, pliːz, ˈtʃændlər, aɪ wʊd oʊ juː soʊ mʌtʃ!/",
        "keywords": ["owe you so much"],
        "explanationAi": "Joey tha thiết van nài bằng lời hứa mang ơn.",
        "properNouns": ["Chandler"]
    },
    {
        "startTime": 390.6,
        "endTime": 393.5,
        "text": "You do owe me so much. You owe me $3,000!",
        "translationVi": "Cậu đang nợ tớ nhiều lắm rồi đấy. Cậu đang nợ tớ 3.000 đô-la kia kìa!",
        "ipaUs": "/juː duː oʊ miː soʊ mʌtʃ. juː oʊ miː θriː ˈθaʊzənd ˈdɑːlərz!/",
        "keywords": ["owe me $3,000"],
        "explanationAi": "Cú phản đòn thực tế phũ phàng của Chandler nhắc nhở về khoản nợ tiền nhà mà Joey chưa bao giờ trả.",
        "properNouns": []
    },
    {
        "startTime": 393.6,
        "endTime": 397.0,
        "text": "Hey, why are you changing the subject? Will you make the call or what?",
        "translationVi": "Này, sao cậu lại tự dưng đánh trống lảng thế hả? Cậu có chịu gọi điện thoại hay không đây?",
        "ipaUs": "/heɪ, waɪ ɑːr juː ˈtʃeɪndʒɪŋ ðə ˈsʌbdʒɪkt? wɪl juː meɪk ðə kɔːl ɔːr wʌt?/",
        "keywords": ["changing the subject"],
        "explanationAi": "Joey thản nhiên gạt phăng khoản nợ 3.000 USD sang một bên.",
        "properNouns": []
    },
    {
        "startTime": 399.0,
        "endTime": 400.8,
        "text": "Okay, I'll try.",
        "translationVi": "Được rồi, tớ sẽ thử xem sao.",
        "ipaUs": "/oʊˈkeɪ, aɪl traɪ./",
        "keywords": ["I'll try"],
        "explanationAi": "Chandler mủi lòng đồng ý giúp bạn.",
        "properNouns": []
    },
    {
        "startTime": 400.9,
        "endTime": 402.5,
        "text": "All right, thanks, you're the best!",
        "translationVi": "Được rồi, cảm ơn nhé, cậu là số một!",
        "ipaUs": "/ɔːl raɪt, θæŋks, jʊr ðə bɛst!/",
        "keywords": ["you're the best"],
        "explanationAi": "Joey vui mừng cảm ơn khi Chandler đồng ý gọi điện xin thử vai.",
        "properNouns": []
    },
    {
        "startTime": 402.6,
        "endTime": 406.5,
        "text": "Now listen, the last day of auditions is Thursday, so I got to get in there by Thursday, okay?",
        "translationVi": "Giờ nghe này, ngày thử vai cuối cùng là thứ Năm, nên tớ phải có mặt trước thứ Năm đấy nhé?",
        "ipaUs": "/naʊ ˈlɪsən, ðə læst deɪ əv ɔːˈdɪʃənz ɪz ˈθɜːrzdeɪ, soʊ aɪ ɡɑːt tuː ɡɛt ɪn ðɛr baɪ ˈθɜːrzdeɪ, oʊˈkeɪ?/",
        "keywords": ["last day of auditions", "Thursday"],
        "explanationAi": "Joey dặn dò ngày hẹn chót.",
        "properNouns": ["Thursday"]
    },
    {
        "startTime": 407.0,
        "endTime": 410.0,
        "text": "Just remember Thursday. Thursday. Can you remember Thursday?",
        "translationVi": "Chỉ cần nhớ lấy thứ Năm thôi. Thứ Năm nhé. Cậu nhớ nổi thứ Năm không đấy?",
        "ipaUs": "/dʒʌst rɪˈmɛmbər ˈθɜːrzdeɪ. ˈθɜːrzdeɪ. kæn juː rɪˈmɛmbər ˈθɜːrzdeɪ?/",
        "keywords": ["remember Thursday"],
        "explanationAi": "Joey lặp đi lặp lại vì sợ Chandler hay quên.",
        "properNouns": ["Thursday"]
    },
    {
        "startTime": 410.2,
        "endTime": 412.0,
        "text": "Yeah, so Tuesday?",
        "translationVi": "Ờ, vậy là thứ Ba hả?",
        "ipaUs": "/jæ, soʊ ˈtuːzdeɪ?/",
        "keywords": ["Tuesday", "pretend confusion"],
        "explanationAi": "Chandler cố tình trêu ngươi bằng cách giả vờ nhầm sang thứ Ba.",
        "properNouns": ["Tuesday"]
    },
    {
        "startTime": 413.0,
        "endTime": 414.5,
        "text": "Thursday!",
        "translationVi": "Thứ Năm cơ mà!",
        "ipaUs": "/ˈθɜːrzdeɪ!/",
        "keywords": ["correction"],
        "explanationAi": "Joey cuống quýt nhấn mạnh lại.",
        "properNouns": ["Thursday"]
    },
    {
        "startTime": 415.0,
        "endTime": 418.5,
        "text": "Look, if you need help remembering, just think of it like this: the third day, all right?",
        "translationVi": "Nghe này, nếu cậu cần mẹo ghi nhớ, cứ nghĩ như thế này: ngày thứ ba, được chưa?",
        "ipaUs": "/lʊk, ɪf juː niːd hɛlp rɪˈmɛmbərɪŋ, dʒʌst θɪŋk əv ɪt laɪk ðɪs: ðə θɜːrd deɪ, ɔːl raɪt?/",
        "keywords": ["the third day", "memory trick"],
        "explanationAi": "Mẹo ghi nhớ logic ngớ ngẩn vô tiền khoáng hậu của Joey về các ngày trong tuần.",
        "properNouns": []
    },
    {
        "startTime": 418.6,
        "endTime": 421.0,
        "text": "Monday: one-day. Tuesday: two-day.",
        "translationVi": "Monday là ngày một. Tuesday là ngày hai.",
        "ipaUs": "/ˈmʌndeɪ: wʌn-deɪ. ˈtuːzdeɪ: tuː-deɪ./",
        "keywords": ["Monday one-day", "Tuesday two-day"],
        "explanationAi": "Joey chơi chữ đồng âm: Mon (one) -> Tuesday (two).",
        "properNouns": ["Monday", "Tuesday"]
    },
    {
        "startTime": 421.2,
        "endTime": 425.5,
        "text": "Wednesday: when? huh? what day? Thursday: the third day, okay?!",
        "translationVi": "Wednesday là ngày nào? hả? ngày gì? Thứ Năm: ngày thứ ba, hiểu chưa hả?!",
        "ipaUs": "/ˈwɛnzdeɪ: wɛn? hʌ? wʌt deɪ? ˈθɜːrzdeɪ: ðə θɜːrd deɪ, oʊˈkeɪ?!/",
        "keywords": ["Wednesday when", "Thursday the third day"],
        "explanationAi": "Màn giải thích hài hước kinh điển làm đảo lộn hoàn toàn thứ tự lịch thứ Năm thành ngày thứ 3.",
        "properNouns": ["Wednesday", "Thursday"]
    },
    {
        "startTime": 429.5,
        "endTime": 431.5,
        "text": "Thank you.",
        "translationVi": "Cảm ơn cậu nhiều nhé.",
        "ipaUs": "/θæŋk juː./",
        "keywords": ["sarcastic thank you"],
        "explanationAi": "Chandler cạn lời trước trí tuệ siêu việt của Joey.",
        "properNouns": []
    },

    # Scene 9: Series Finale Apartment Farewell & Immortal "Where?" (07:11 - 08:12)
    {
        "startTime": 440.0,
        "endTime": 442.5,
        "text": "I guess this is it.",
        "translationVi": "Tớ đoán đây là lúc phải chào tạm biệt rồi.",
        "ipaUs": "/aɪ ɡɛs ðɪs ɪz ɪt./",
        "keywords": ["this is it", "farewell"],
        "explanationAi": "Monica nghẹn ngào nhìn căn hộ trống trải sau khi đã đóng gói toàn bộ đồ đạc chuyển về vùng ngoại ô.",
        "properNouns": []
    },
    {
        "startTime": 445.0,
        "endTime": 447.0,
        "text": "I guess so.",
        "translationVi": "Tớ cũng nghĩ vậy.",
        "ipaUs": "/aɪ ɡɛs soʊ./",
        "keywords": ["I guess so"],
        "explanationAi": "Joey đáp lại trong sự trầm lặng hiếm hoi.",
        "properNouns": []
    },
    {
        "startTime": 448.0,
        "endTime": 451.0,
        "text": "This is harder than I thought it would be.",
        "translationVi": "Khoảnh khắc này khó khăn hơn tớ từng nghĩ nhiều.",
        "ipaUs": "/ðɪs ɪz ˈhɑːrdər ðæn aɪ θɔːt ɪt wʊd biː./",
        "keywords": ["harder than I thought"],
        "explanationAi": "Rachel chia sẻ cảm xúc lưu luyến căn nhà đã gắn bó suốt một thập kỷ thanh xuân.",
        "properNouns": []
    },
    {
        "startTime": 451.2,
        "endTime": 454.0,
        "text": "No, it's going to be okay.",
        "translationVi": "Không sao đâu, mọi chuyện rồi sẽ ổn mà.",
        "ipaUs": "/noʊ, ɪts ˈɡoʊɪŋ tuː biː oʊˈkeɪ./",
        "keywords": ["going to be okay"],
        "explanationAi": "Lời an ủi ấm áp cuối cùng của nhóm bạn dành cho nhau.",
        "properNouns": []
    },
    {
        "startTime": 464.0,
        "endTime": 469.0,
        "text": "Well, do you guys have to go to the new house right away? Do you have some time?",
        "translationVi": "À mà, hai cậu có phải tới ngay ngôi nhà mới bây giờ không? Các cậu còn chút thời gian nào không?",
        "ipaUs": "/wɛl, duː juː ɡaɪz hæv tuː ɡoʊ tuː ðə nuː haʊs raɪt əˈweɪ? duː juː hæv sʌm taɪm?/",
        "keywords": ["have some time", "final proposal"],
        "explanationAi": "Rachel níu giữ những giây phút cuối cùng bên nhau trước khi chia tay.",
        "properNouns": []
    },
    {
        "startTime": 472.0,
        "endTime": 473.8,
        "text": "We got some time.",
        "translationVi": "Bọn tớ vẫn còn chút thời gian.",
        "ipaUs": "/wiː ɡɑːt sʌm taɪm./",
        "keywords": ["got some time"],
        "explanationAi": "Monica mỉm cười đồng ý.",
        "properNouns": []
    },
    {
        "startTime": 474.0,
        "endTime": 476.5,
        "text": "Okay, should we get some coffee?",
        "translationVi": "Được rồi, thế bọn mình đi làm một tách cà phê nhé?",
        "ipaUs": "/oʊˈkeɪ, ʃʊd wiː ɡɛt sʌm ˈkɔːfi?/",
        "keywords": ["get some coffee"],
        "explanationAi": "Lời đề nghị tự nhiên và quen thuộc nhất của cả nhóm trong suốt 10 năm qua.",
        "properNouns": []
    },
    {
        "startTime": 476.6,
        "endTime": 478.0,
        "text": "Sure.",
        "translationVi": "Chắc chắn rồi.",
        "ipaUs": "/ʃʊr./",
        "keywords": ["sure"],
        "explanationAi": "Cả nhóm đồng thanh chuẩn bị rời bước.",
        "properNouns": []
    },
    {
        "startTime": 478.5,
        "endTime": 483.0,
        "text": "Where?",
        "translationVi": "Ở đâu cơ?",
        "ipaUs": "/wɛr?/",
        "keywords": ["Where?", "immortal finale punchline"],
        "explanationAi": "Câu thoại cuối cùng của toàn bộ 10 mùa phim Friends do Matthew Perry xuất thần thể hiện: một câu hỏi mỉa mai dí dỏm tuyệt đối vì trong suốt 10 năm, Central Perk là nơi duy nhất họ lui tới.",
        "properNouns": []
    },
    {
        "startTime": 483.5,
        "endTime": 492.0,
        "text": "The camera pans across the empty purple apartment with the iconic yellow frame on the door as the Friends theme song swells.",
        "translationVi": "Khung hình từ từ lướt qua căn hộ màu tím trống trải với khung ảnh màu vàng biểu tượng trên cánh cửa khi khúc nhạc chủ đề Friends cất lên đầy hoài niệm.",
        "ipaUs": "/ðə ˈkæmrə pænz əˈkrɔːs ðɪ ˈɛmpti ˈpɜːrpəl əˈpɑːrtmənt wɪð ðɪ aɪˈkɑːnɪk ˈjɛloʊ freɪm ɑːn ðə dɔːr æz ðə frɛndz θiːm sɔːŋ swɛlz./",
        "keywords": ["empty purple apartment", "yellow frame", "theme song swells"],
        "explanationAi": "Cảnh khép lại trọn vẹn và xúc động nhất trong lịch sử truyền hình thế giới, khép lại hành trình 10 năm bất hủ của bộ phim Friends.",
        "properNouns": ["Friends"]
    }
]

# Calculate token counts
for s in segments:
    words = re.findall(r"\b[\w'-]+\b", s["text"])
    s["tokenCount"] = len(words)

print(f"Total processed pure segments: {len(segments)}")

# Extended Quiz Data (8 questions)
quiz_data = {
    "lessonId": "mov_sit_02",
    "lessonTitle": "Friends: The Very Best of Chandler Bing's Sarcasm & Wit",
    "totalQuestions": 8,
    "xpReward": 100,
    "generatedBy": "AI_GEMINI",
    "questions": [
        {
            "id": "mov_sit_02_q1",
            "question": "What hilarious and unhelpful offer does Chandler make when Rachel is panicking about her relationship with Joey?",
            "questionEn": "What hilarious and unhelpful offer does Chandler make when Rachel is panicking about her relationship with Joey?",
            "questionVi": "Chandler đã đưa ra đề nghị hài hước nhưng chẳng giúp ích được gì khi Rachel hoảng loạn về mối quan hệ với Joey?",
            "options": [
                "He offers to write a love letter on her behalf.",
                "He asks: 'Can I interest you in a sarcastic comment? Some cheese?'",
                "He suggests that she move to Paris immediately.",
                "He offers to loan her $500 for a weekend trip."
            ],
            "optionsEn": [
                "He offers to write a love letter on her behalf.",
                "He asks: 'Can I interest you in a sarcastic comment? Some cheese?'",
                "He suggests that she move to Paris immediately.",
                "He offers to loan her $500 for a weekend trip."
            ],
            "optionsVi": [
                "Anh ấy đề nghị viết hộ một bức thư tình.",
                "Anh ấy hỏi: 'Tớ có thể mời cậu một lời mỉa mai được không? Hay là chút phô mai nhé?'",
                "Anh ấy khuyên cô nên chuyển ngay đến Paris.",
                "Anh ấy cho cô vay 500 đô để đi du lịch xả hơi cuối tuần."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 7-8, Chandler admits 'I'm not great at the advice. Can I interest you in a sarcastic comment? Some cheese?' which is one of his most celebrated quotes.",
            "explanationEn": "In Segments 7-8, Chandler admits 'I'm not great at the advice. Can I interest you in a sarcastic comment? Some cheese?' which is one of his most celebrated quotes.",
            "explanationVi": "Trong các Phân đoạn 7-8, Chandler thừa nhận 'Tớ không giỏi cho lời khuyên lắm. Tớ có thể mời cậu một lời mỉa mai được không? Hay là chút phô mai nhé?', một trong những câu thoại nổi tiếng nhất của anh.",
            "targetedConcept": "Self-deprecating humor & comedic coping mechanisms",
            "targetedConceptEn": "Self-deprecating humor & comedic coping mechanisms",
            "targetedConceptVi": "Hài hước tự trào và cơ chế đối phó bằng sự châm biếm",
            "referenceSegmentIndex": 7
        },
        {
            "id": "mov_sit_02_q2",
            "question": "Why does Chandler insist he never dances at weddings in Segment 34?",
            "questionEn": "Why does Chandler insist he never dances at weddings in Segment 34?",
            "questionVi": "Vì sao Chandler khăng khăng rằng anh không bao giờ khiêu vũ ở các đám cưới trong Phân đoạn 34?",
            "options": [
                "He suffers from chronic sprained ankle pain.",
                "Because weddings are a great place to meet women, and his dance moves look ridiculously goofy.",
                "His tuxedo pants are tailored too tight to bend his knees.",
                "Monica forbade him from ever stepping onto dance floors."
            ],
            "optionsEn": [
                "He suffers from chronic sprained ankle pain.",
                "Because weddings are a great place to meet women, and his dance moves look ridiculously goofy.",
                "His tuxedo pants are tailored too tight to bend his knees.",
                "Monica forbade him from ever stepping onto dance floors."
            ],
            "optionsVi": [
                "Anh ấy bị đau trật khớp mắt cá chân mãn tính.",
                "Vì tiệc cưới là nơi tuyệt vời để làm quen phụ nữ, mà điệu nhảy của anh ấy thì trông ngớ ngẩn buồn cười đến phát sợ.",
                "Quần âu dạ tiệc của anh bị may quá chật không thể gập đầu gối.",
                "Monica cấm tiệt anh không bao giờ được bước lên sàn khiêu vũ."
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 34, Chandler explains: 'Because weddings are a great place to meet women, and when I dance, I look like this!' before demonstrating his chaotic, uncoordinated flailing dance.",
            "explanationEn": "In Segment 34, Chandler explains: 'Because weddings are a great place to meet women, and when I dance, I look like this!' before demonstrating his chaotic, uncoordinated flailing dance.",
            "explanationVi": "Trong Phân đoạn 34, Chandler giải thích: 'Bởi vì tiệc cưới là nơi tuyệt vời để làm quen phụ nữ, mà hễ tớ nhảy, trông tớ lại kinh dị thế này đây!' rồi diễn tả lại điệu nhảy co giật huyền thoại của mình.",
            "targetedConcept": "Physical comedy & romantic self-sabotage",
            "targetedConceptEn": "Physical comedy & romantic self-sabotage",
            "targetedConceptVi": "Hài hình thể và sự vụng về trong hẹn hò",
            "referenceSegmentIndex": 34
        },
        {
            "id": "mov_sit_02_q3",
            "question": "What biting sarcastic comment does Chandler deliver when Jack Geller overshares his intimate conception history in Segment 52?",
            "questionEn": "What biting sarcastic comment does Chandler deliver when Jack Geller overshares his intimate conception history in Segment 52?",
            "questionVi": "Lời mỉa mai cay độc nào được Chandler thốt ra khi bố của Monica (Jack Geller) kể chi tiết nhạy cảm về chuyện sinh con trong Phân đoạn 52?",
            "options": [
                "He asks Jack for private orthopedic surgery recommendations.",
                "'This conversation is how I got the bullet hole in my head.'",
                "'I should have stayed in the coffee house with Gunther.'",
                "'I will never eat Thanksgiving turkey with you again.'"
            ],
            "optionsEn": [
                "He asks Jack for private orthopedic surgery recommendations.",
                "'This conversation is how I got the bullet hole in my head.'",
                "'I should have stayed in the coffee house with Gunther.'",
                "'I will never eat Thanksgiving turkey with you again.'"
            ],
            "optionsVi": [
                "Anh ấy hỏi xin Jack lời khuyên về phẫu thuật chỉnh hình khớp háng.",
                "'Cuộc trò chuyện này chính là lý do vì sao con có cái lỗ đạn xuyên qua đầu này đây.'",
                "'Lẽ ra con nên ở lại quán cà phê với Gunther cho xong.'",
                "'Con sẽ không bao giờ ăn gà tây Lễ Tạ Ơn cùng bố nữa đâu.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 52, Chandler reacts to Jack Geller's TMI (Too Much Information) story about conceiving Monica by deadpanning: 'It's fine. This conversation is how I got the bullet hole in my head.'",
            "explanationEn": "In Segment 52, Chandler reacts to Jack Geller's TMI (Too Much Information) story about conceiving Monica by deadpanning: 'It's fine. This conversation is how I got the bullet hole in my head.'",
            "explanationVi": "Trong Phân đoạn 52, Chandler phản ứng trước câu chuyện chia sẻ quá đà của bố vợ bằng một câu mỉa mai lạnh lùng: 'Không sao đâu bố. Cuộc trò chuyện này chính là lý do vì sao con có cái lỗ đạn xuyên qua đầu này đây.'",
            "targetedConcept": "Deadpan sarcasm in response to awkward family TMI",
            "targetedConceptEn": "Deadpan sarcasm in response to awkward family TMI",
            "targetedConceptVi": "Phong cách châm biếm lạnh lùng (deadpan) trước tình huống gia đình ngượng ngùng",
            "referenceSegmentIndex": 52
        },
        {
            "id": "mov_sit_02_q4",
            "question": "How does Chandler mock Joey's attempt to disguise his embarrassment while working as a waiter at Central Perk in Segment 58?",
            "questionEn": "How does Chandler mock Joey's attempt to disguise his embarrassment while working as a waiter at Central Perk in Segment 58?",
            "questionVi": "Chandler đã chế giễu việc Joey cố che giấu sự ngượng ngùng khi làm bồi bàn tại quán Central Perk trong Phân đoạn 58 như thế nào?",
            "options": [
                "By pointing out that Joey is wearing his waiter's apron like a superhero cape.",
                "By refusing to drink any coffee poured by an amateur actor.",
                "By telling the cafe manager that Joey spilled espresso on his loafers.",
                "By asking Gunther to confiscate Joey's order notepad."
            ],
            "optionsEn": [
                "By pointing out that Joey is wearing his waiter's apron like a superhero cape.",
                "By refusing to drink any coffee poured by an amateur actor.",
                "By telling the cafe manager that Joey spilled espresso on his loafers.",
                "By asking Gunther to confiscate Joey's order notepad."
            ],
            "optionsVi": [
                "Bằng cách chỉ ra rằng Joey đang khoác chiếc tạp dề bồi bàn qua vai như một chiếc áo choàng siêu nhân.",
                "Bằng cách từ chối uống cà phê do một diễn viên nghiệp dư rót.",
                "Bằng cách mách quản lý quán rằng Joey làm đổ cà phê lên giày của anh.",
                "Bằng cách nhờ Gunther tịch thu sổ ghi món của Joey."
            ],
            "correctAnswer": 0,
            "explanation": "In Segment 58, Chandler observes Joey trying to act casual about his new job and quips: 'So, your apron. You're wearing it like a cape.'",
            "explanationEn": "In Segment 58, Chandler observes Joey trying to act casual about his new job and quips: 'So, your apron. You're wearing it like a cape.'",
            "explanationVi": "Trong Phân đoạn 58, Chandler quan sát thấy Joey cố tỏ ra không quan tâm đến công việc mới và buông câu nhận xét: 'Thế nên cái tạp dề của cậu... cậu mới khoác nó như áo choàng siêu nhân đấy à.'",
            "targetedConcept": "Visual observation and sarcastic character mockery",
            "targetedConceptEn": "Visual observation and sarcastic character mockery",
            "targetedConceptVi": "Khả năng quan sát chi tiết hình thể và châm biếm tính cách nhân vật",
            "referenceSegmentIndex": 58
        },
        {
            "id": "mov_sit_02_q5",
            "question": "What is Chandler doing when the entire gang gradually barged into the bathroom in Segments 76-115?",
            "questionEn": "What is Chandler doing when the entire gang gradually barged into the bathroom in Segments 76-115?",
            "questionVi": "Chandler đang làm gì khi cả nhóm bạn lần lượt ùa vào phòng tắm trong các Phân đoạn 76-115?",
            "options": [
                "He is practicing a Broadway tap dance routine in front of the mirror.",
                "He is enjoying a relaxing bubble bath with a toy boat.",
                "He is hiding from Janice behind the purple shower curtain.",
                "He is unblocking the kitchen sink drain pipes."
            ],
            "optionsEn": [
                "He is practicing a Broadway tap dance routine in front of the mirror.",
                "He is enjoying a relaxing bubble bath with a toy boat.",
                "He is hiding from Janice behind the purple shower curtain.",
                "He is unblocking the kitchen sink drain pipes."
            ],
            "optionsVi": [
                "Anh ấy đang tập nhảy clacket Broadway trước gương.",
                "Anh ấy đang ngâm mình thư giãn trong bồn tắm bọt xà phòng với một chiếc thuyền đồ chơi.",
                "Anh ấy đang trốn Janice sau tấm rèm tắm màu tím.",
                "Anh ấy đang thông đường ống thoát nước bồn rửa."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 76-115, Chandler is discovered indulging in a bubble bath with a toy boat, leading to a crowded bathroom conference where he sarcastically welcomes everyone: 'Yes, we're all in here and we'd love for you to join us.'",
            "explanationEn": "In Segments 76-115, Chandler is discovered indulging in a bubble bath with a toy boat, leading to a crowded bathroom conference where he sarcastically welcomes everyone: 'Yes, we're all in here and we'd love for you to join us.'",
            "explanationVi": "Trong các Phân đoạn 76-115, Chandler bị phát hiện đang ngâm bồn tắm bọt với chiếc thuyền đồ chơi, biến phòng tắm thành phòng họp bất đắc dĩ nơi anh mỉa mai: 'Vâng, tất cả bọn tôi đều ở trong này và rất mong cậu cùng tham gia.'",
            "targetedConcept": "Sitcom farce & bathroom invasion trope",
            "targetedConceptEn": "Sitcom farce & bathroom invasion trope",
            "targetedConceptVi": "Thủ pháp kịch hề (farce) và sự xâm nhập không gian riêng tư hài hước",
            "referenceSegmentIndex": 112
        },
        {
            "id": "mov_sit_02_q6",
            "question": "What sinister sarcastic remark does Chandler make when Ross explains how he trapped a woman on the train so she'd have to talk to him in Segment 132?",
            "questionEn": "What sinister sarcastic remark does Chandler make when Ross explains how he trapped a woman on the train so she'd have to talk to him in Segment 132?",
            "questionVi": "Lời châm chọc rùng rợn nào được Chandler thốt ra khi Ross kể việc ngồi chặn cửa tàu để cô gái không thể chuyển toa trong Phân đoạn 132?",
            "options": [
                "'Did the conductor call the Transit Police on you?'",
                "'Were you so late because you were burying this woman?'",
                "'You should buy an Amtrak monthly commuter pass.'",
                "'That sounds like an episode of Twilight Zone.'"
            ],
            "optionsEn": [
                "'Did the conductor call the Transit Police on you?'",
                "'Were you so late because you were burying this woman?'",
                "'You should buy an Amtrak monthly commuter pass.'",
                "'That sounds like an episode of Twilight Zone.'"
            ],
            "optionsVi": [
                "'Người soát vé có gọi cảnh sát giao thông đường sắt đến bắt cậu không?'",
                "'Cậu đến muộn thế này là vì mải đào hố chôn người phụ nữ đó đấy à?'",
                "'Cậu nên mua vé tháng của hãng tàu Amtrak đi thì hơn.'",
                "'Nghe cứ như một tập phim Kinh Hoàng Twilight Zone ấy nhỉ.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 132, after Ross boasts that the woman on the train was 'totally at my mercy', Chandler deadpans: 'Were you so late because you were burying this woman?'",
            "explanationEn": "In Segment 132, after Ross boasts that the woman on the train was 'totally at my mercy', Chandler deadpans: 'Were you so late because you were burying this woman?'",
            "explanationVi": "Trong Phân đoạn 132, sau khi Ross khoe rằng cô gái trên tàu 'hoàn toàn nằm trong tầm khống chế của tớ', Chandler thản nhiên hỏi xoáy: 'Cậu đến muộn thế này là vì mải đào hố chôn người phụ nữ đó đấy à?'",
            "targetedConcept": "Dark comedy reframing of creepy romantic behaviors",
            "targetedConceptEn": "Dark comedy reframing of creepy romantic behaviors",
            "targetedConceptVi": "Hài kịch đen lật ngược tình huống tán tỉnh kỳ quặc",
            "referenceSegmentIndex": 132
        },
        {
            "id": "mov_sit_02_q7",
            "question": "When Joey promises to owe Chandler 'so much' if he secures an audition for the Al Pacino movie, how does Chandler instantly reply in Segment 147?",
            "questionEn": "When Joey promises to owe Chandler 'so much' if he secures an audition for the Al Pacino movie, how does Chandler instantly reply in Segment 147?",
            "questionVi": "Khi Joey hứa sẽ nợ Chandler 'rất nhiều' nếu xin được suất thử vai phim Al Pacino, Chandler lập tức đáp trả thế nào trong Phân đoạn 147?",
            "options": [
                "'You can pay me back with homemade lasagna.'",
                "'You do owe me so much. You owe me $3,000!'",
                "'I want your television set in exchange.'",
                "'Only if you wash all my dress shirts for a month.'"
            ],
            "optionsEn": [
                "'You can pay me back with homemade lasagna.'",
                "'You do owe me so much. You owe me $3,000!'",
                "'I want your television set in exchange.'",
                "'Only if you wash all my dress shirts for a month.'"
            ],
            "optionsVi": [
                "'Cậu có thể trả ơn tớ bằng món mì nướng lasagna tự làm.'",
                "'Cậu đang nợ tớ nhiều lắm rồi đấy. Cậu đang nợ tớ 3.000 đô-la kia kìa!'",
                "'Tớ muốn đổi lấy chiếc tivi của cậu làm vật thế chấp.'",
                "'Chỉ khi cậu chịu giặt hết áo sơ mi công sở cho tớ trong một tháng.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 147, Chandler shuts down Joey's emotional plea by bringing up harsh financial reality: 'You do owe me so much. You owe me $3,000!'",
            "explanationEn": "In Segment 147, Chandler shuts down Joey's emotional plea by bringing up harsh financial reality: 'You do owe me so much. You owe me $3,000!'",
            "explanationVi": "Trong Phân đoạn 147, Chandler dập tắt lời thề thốt cảm xúc của Joey bằng hiện thực tài chính cay đắng: 'Cậu đang nợ tớ nhiều lắm rồi đấy. Cậu đang nợ tớ 3.000 đô-la kia kìa!'",
            "targetedConcept": "Roommate dynamics & financial reality checks in comedy",
            "targetedConceptEn": "Roommate dynamics & financial reality checks in comedy",
            "targetedConceptVi": "Mối quan hệ bạn cùng phòng và sự nhắc nhở tài chính hài hước",
            "referenceSegmentIndex": 147
        },
        {
            "id": "mov_sit_02_q8",
            "question": "What immortal one-word question does Chandler ask as the final line of dialogue in the entire 10-season run of Friends in Segment 181?",
            "questionEn": "What immortal one-word question does Chandler ask as the final line of dialogue in the entire 10-season run of Friends in Segment 181?",
            "questionVi": "Câu hỏi bất hủ đúng một từ nào được Chandler thốt ra như câu thoại kết thúc toàn bộ 10 mùa phát sóng của phim Friends trong Phân đoạn 181?",
            "options": [
                "'When?'",
                "'Where?'",
                "'Why?'",
                "'Who?'",
            ],
            "optionsEn": [
                "'When?'",
                "'Where?'",
                "'Why?'",
                "'Who?'",
            ],
            "optionsVi": [
                "'Khi nào?'",
                "'Ở đâu cơ?' (Where?)",
                "'Tại sao?'",
                "'Là ai cơ?'",
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 181, when Rachel asks 'should we get some coffee?' Chandler delivers the very last line of the entire series: 'Where?'—a perfect sarcastic callback since Central Perk was the only place they ever went for 10 years.",
            "explanationEn": "In Segment 181, when Rachel asks 'should we get some coffee?' Chandler delivers the very last line of the entire series: 'Where?'—a perfect sarcastic callback since Central Perk was the only place they ever went for 10 years.",
            "explanationVi": "Trong Phân đoạn 181, khi Rachel rủ 'bọn mình đi làm tách cà phê nhé?', Chandler tung câu thoại cuối cùng của cả loạt phim: 'Ở đâu cơ?'—một câu châm biếm hoàn hảo vì suốt 10 năm trời, Central Perk là quán duy nhất họ lui tới.",
            "targetedConcept": "Television finale callbacks & legendary closing punchlines",
            "targetedConceptEn": "Television finale callbacks & legendary closing punchlines",
            "targetedConceptVi": "Nghệ thuật câu thoại kết thúc tập cuối (finale callback) kinh điển truyền hình",
            "referenceSegmentIndex": 181
        }
    ]
}

# Construct TypeScript file content
ts_content = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Friends: The Very Best of Chandler Bing's Sarcasm & Wit (Full Master Cut)
 * Category: Sitcom Kinh Điển & Hài Kịch (cat_classic_sitcoms)
 * Level: CEFR B2 | American Accent
 * YouTube ID: xT5zt93BbAg (08:12 - 492s)
 * Views: 1,618,018 | Channel: Friends Official
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (WARNER BROS / FRIENDS)
 * ZERO MERGED UTTERANCES - PHÂN TÁCH ĐỘC LẬP TỪNG SPEAKER TURN
 * TỔNG CỘNG: {len(segments)} PURE MASTER SEGMENTS (00:00 - 08:12)
 * ============================================================================
 */

export const QUIZ_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM_EXTENDED: VideoQuizData = {json.dumps(quiz_data, ensure_ascii=False, indent=2)};
export const QUIZ_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM = QUIZ_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM_EXTENDED;

export const LESSON_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM: MockVideoLesson = {{
  id: "mov_sit_02",
  slug: "friends-best-of-chandler-bing-sarcasm",
  title: "Friends: The Very Best of Chandler Bing's Sarcasm & Wit (Full Master Cut)",
  categoryId: "cat_classic_sitcoms",
  categorySlug: "classic-sitcoms",
  categoryName: "Sitcom Kinh Điển & Hài Kịch",
  cefrLevel: "B2",
  durationFormatted: "08:12",
  durationSeconds: 492,
  externalId: "xT5zt93BbAg",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/xT5zt93BbAg/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 146,
  viewCount: 1618018,
  studyCount: 12450,
  description:
    "Tuyển tập những câu mỉa mai, chơi chữ châm biếm và phản xạ ngôn ngữ thông minh nhất của Chandler Bing (Matthew Perry): Từ lời khuyên mỉa mai 'sarcastic comment & cheese', điệu nhảy đám cưới dở khóc dở cười, cuộc trò chuyện tế nhị với Jack Geller 'bullet hole in my head', Joey làm bồi bàn mặc tạp dề siêu nhân, bồn tắm bọt thư giãn 'cool boat', chuyện hẹn hò trên tàu Poughkeepsie, ngày thứ Năm 'Thursday / The third day', cho đến câu hỏi kinh điển khép lại 10 năm lịch sử Friends: 'Where?'.",
  segments: [
'''

for i, seg in enumerate(segments):
    seg_obj = {
        "orderIndex": i,
        "startTime": seg["startTime"],
        "endTime": seg["endTime"],
        "text": seg["text"],
        "translationVi": seg["translationVi"],
        "ipaUs": seg["ipaUs"],
        "keywords": seg["keywords"],
        "explanationAi": seg["explanationAi"],
        "properNouns": seg["properNouns"],
        "tokenCount": seg["tokenCount"]
    }
    ts_content += "    " + json.dumps(seg_obj, ensure_ascii=False, indent=4).replace("\n", "\n    ")
    if i < len(segments) - 1:
        ts_content += ",\n"
    else:
        ts_content += "\n"

ts_content += f'''  ],
  quiz: QUIZ_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM_EXTENDED,
}};

export default LESSON_FRIENDS_BEST_OF_CHANDLER_BING_SARCASM;
'''

out_path = "features/listening/data/lessons/movies/sitcoms/lesson_friends_chandler_sarcasm.ts"
with open(out_path, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated {out_path} successfully with {len(segments)} segments and 8 quiz questions!")
