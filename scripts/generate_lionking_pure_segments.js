const fs = require('fs');

const segments = [
  // Scene 1: Mufasa's Royal Teaching & Lesson Introduction (0 - 4)
  {
    orderIndex: 0,
    startTime: 0.0,
    endTime: 9.5,
    text: "Look, Simba. Everything the light touches is our kingdom.",
    translationVi: "Hãy nhìn xem, Simba. Tất cả những nơi nào mà ánh sáng chạm tới đều là vương quốc của chúng ta.",
    ipaUs: "/lʊk, ˈsɪmbə. ˈɛvriˌθɪŋ ðə laɪt ˈtʌtʃɪz ɪz ˈaʊər ˈkɪŋdəm./",
    keywords: ["light touches", "our kingdom"],
    explanationAi: "Mệnh đề quan hệ giản lược 'the light touches' bổ nghĩa cho 'Everything', câu mở đầu tôn nghiêm của Vua Mufasa truyền dạy quy luật vũ trụ.",
    properNouns: ["Simba"]
  },
  {
    orderIndex: 1,
    startTime: 10.0,
    endTime: 18.5,
    text: "A king's time as ruler rises and falls like the sun.",
    translationVi: "Thời gian trị vì của một bậc quân vương cũng mọc lên và lặn xuống như vầng thái dương.",
    ipaUs: "/ə kɪŋz taɪm æz ˈruːlər ˈraɪzɪz ænd fɔːlz laɪk ðə sʌn./",
    keywords: ["ruler", "rises and falls", "like the sun"],
    explanationAi: "Phép so sánh ẩn dụ 'rises and falls like the sun' biểu trưng cho quy luật sinh thành và hoại diệt của mọi triều đại.",
    properNouns: []
  },
  {
    orderIndex: 2,
    startTime: 19.0,
    endTime: 37.0,
    text: "One day, Simba, the sun will set on my time here, and will rise with you as the new king.",
    translationVi: "Một ngày nào đó, Simba à, mặt trời sẽ lặn xuống khép lại thời khắc của cha nơi đây, và sẽ lại mọc lên rạng rỡ cùng con trong tư cách một tân vương.",
    ipaUs: "/wʌn deɪ, ˈsɪmbə, ðə sʌn wɪl sɛt ɑːn maɪ taɪm hɪr, ænd wɪl raɪz wɪð juː æz ðə nuː kɪŋ./",
    keywords: ["sun will set", "new king"],
    explanationAi: "Thành ngữ 'the sun sets on someone's time' (thời đại/triều đại của ai đó đi đến hồi kết) truyền cảm hứng về sự tiếp nối thế hệ thiêng liêng.",
    properNouns: ["Simba"]
  },
  {
    orderIndex: 3,
    startTime: 38.0,
    endTime: 56.0,
    text: "Welcome to Learn English with TV Series, where we learn natural English with Disney's classic animation The Lion King!",
    translationVi: "Chào mừng các bạn đến với Học tiếng Anh qua Phim truyền hình, nơi chúng ta học tiếng Anh tự nhiên cùng tuyệt phẩm hoạt hình kinh điển The Lion King của Disney!",
    ipaUs: "/ˈwɛlkəm tuː lɜːrn ˈɪŋɡlɪʃ wɪð ˌtiːˈviː ˈsɪriz, wɛr wiː lɜːrn ˈnætʃrəl ˈɪŋɡlɪʃ wɪð ˈdɪzniːz ˈklæsɪk ˌænəˈmeɪʃən ðə ˈlaɪən kɪŋ!/",
    keywords: ["classic animation", "The Lion King"],
    explanationAi: "Lời giới thiệu đầy năng lượng của người dẫn chương trình giới thiệu bài học đàm thoại và phân tích phương ngữ tự nhiên.",
    properNouns: ["Disney", "The Lion King"]
  },
  {
    orderIndex: 4,
    startTime: 57.0,
    endTime: 74.0,
    text: "Today we will explore natural pronunciation, witty wordplay, and life philosophies with Timon, Pumbaa, and Simba.",
    translationVi: "Hôm nay chúng ta sẽ khám phá ngữ âm tự nhiên, lối chơi chữ hóm hỉnh và triết lý nhân sinh cùng Timon, Pumbaa và Simba.",
    ipaUs: "/təˈdeɪ wiː wɪl ɪkˈsplɔːr ˈnætʃrəl prəˌnʌnsiˈeɪʃən, ˈwɪti ˈwɜːrdˌpleɪ, ænd laɪf fəˈlɑːsəfiz wɪð ˈtaɪmən, ˈpʊmbɑː, ænd ˈsɪmbə./",
    keywords: ["natural pronunciation", "witty wordplay", "life philosophies"],
    explanationAi: "Thuật ngữ học thuật 'witty wordplay' (lối chơi chữ dí dỏm) và 'life philosophies' (triết lý sống) đặt nền móng cho các phân tích ngữ nghĩa tiếp theo.",
    properNouns: ["Timon", "Pumbaa", "Simba"]
  },

  // Scene 2: Desert Rescue & Debating Whether to Keep a Lion (5 - 13)
  {
    orderIndex: 5,
    startTime: 105.0,
    endTime: 118.0,
    text: "Yee-haw! Clear the road! Get out of the way!",
    translationVi: "Hây-za! Dẹp đường mau! Tránh hết ra nào!",
    ipaUs: "/jiː-hɔː! klɪr ðə roʊd! ɡɛt aʊt ʌv ðə weɪ!/",
    keywords: ["clear the road", "get out of the way"],
    explanationAi: "Thán từ miền viễn tây 'Yee-haw!' cùng mệnh lệnh khẩn thiết 'clear the road' thể hiện sự ồn ào hài hước khi Timon và Pumbaa lao tới đuổi đàn kền kền.",
    properNouns: []
  },
  {
    orderIndex: 6,
    startTime: 120.0,
    endTime: 135.0,
    text: "Hey, Timon, look at him. He's so cute, and all alone. Can we keep him?",
    translationVi: "Này Timon, nhìn cậu bé này xem. Nhìn đáng yêu quá, lại bơ vơ có một mình. Chúng mình nuôi cậu ấy được không?",
    ipaUs: "/heɪ, ˈtaɪmən, lʊk æt hɪm. hiz soʊ kjuːt, ænd ɔːl əˈloʊn. kæn wiː kiːp hɪm?/",
    keywords: ["all alone", "can we keep him"],
    explanationAi: "Cụm 'all alone' (hoàn toàn đơn độc) và câu hỏi ngây thơ 'Can we keep him?' gợi nhớ cách trẻ con xin nuôi thú cưng trong gia đình.",
    properNouns: ["Timon"]
  },
  {
    orderIndex: 7,
    startTime: 138.0,
    endTime: 155.0,
    text: "Pumbaa, are you nuts? You nearly killed us! He's a lion! Lions eat guys like us!",
    translationVi: "Pumbaa, cậu bị điên rồi à? Cậu suýt nữa hại chết cả hai đứa mình đấy! Cậu ta là sư tử! Sư tử xơi tái những gã bé nhỏ như tụi mình!",
    ipaUs: "/ˈpʊmbɑː, ɑːr juː nʌts? juː ˈnɪrli kɪld ʌs! hiz ə ˈlaɪən! ˈlaɪənz iːt ɡaɪz laɪk ʌs!/",
    keywords: ["are you nuts", "nearly killed us", "guys like us"],
    explanationAi: "Thành ngữ tiếng lóng 'are you nuts?' (= are you crazy?) và hiện thực khắc nghiệt của chuỗi thức ăn tự nhiên giữa loài săn mồi và con mồi.",
    properNouns: ["Pumbaa"]
  },
  {
    orderIndex: 8,
    startTime: 158.0,
    endTime: 168.0,
    text: "But he's so little!",
    translationVi: "Nhưng mà cậu ấy còn bé tí teo thế này cơ mà!",
    ipaUs: "/bʌt hiz soʊ ˈlɪtəl!/",
    keywords: ["so little"],
    explanationAi: "Lời nài nỉ ngây ngô nhấn mạnh vóc dáng non nớt của chú sư tử con để biện minh cho lòng trắc ẩn của Pumbaa.",
    properNouns: []
  },
  {
    orderIndex: 9,
    startTime: 170.0,
    endTime: 180.0,
    text: "He's gonna get bigger!",
    translationVi: "Cậu ta rồi sẽ lớn tướng lên cho mà xem!",
    ipaUs: "/hiz ˈɡɑːnə ɡɛt ˈbɪɡər!/",
    keywords: ["gonna get bigger"],
    explanationAi: "Sử dụng dạng rút gọn 'gonna' (going to) và so sánh tăng tiến 'get bigger' thể hiện sự thực tế và nỗi lo sợ của chồn Timon.",
    properNouns: []
  },
  {
    orderIndex: 10,
    startTime: 182.0,
    endTime: 195.0,
    text: "Maybe he'll be on our side.",
    translationVi: "Có khi cậu ấy sẽ đứng về phía chúng mình thì sao.",
    ipaUs: "/ˈmeɪbi hiːl biː ɑːn ˈaʊər saɪd./",
    keywords: ["on our side"],
    explanationAi: "Thành ngữ 'on someone's side' (ủng hộ, bảo vệ và đồng minh cùng phe với ai đó) mở ra bước ngoặt suy nghĩ mang tính chiến lược.",
    properNouns: []
  },
  {
    orderIndex: 11,
    startTime: 198.0,
    endTime: 212.0,
    text: "A-ha! That's the stupidest thing I ever heard!",
    translationVi: "A-ha! Đó là điều ngu ngốc nhất trần đời mà tớ từng được nghe đấy!",
    ipaUs: "/ɑː-hɑː! ðæts ðə ˈstjuːpɪdɪst θɪŋ aɪ ˈɛvər hɜːrd!/",
    keywords: ["stupidest thing", "ever heard"],
    explanationAi: "Cấu trúc so sánh bậc nhất 'the stupidest thing' kèm mệnh đề hiện tại hoàn thành rút gọn nhấn mạnh sự bác bỏ gay gắt của Timon.",
    properNouns: []
  },
  {
    orderIndex: 12,
    startTime: 215.0,
    endTime: 238.0,
    text: "Wait a second. What if he's on our side? Having a lion around might not be such a bad idea.",
    translationVi: "Khoan đã nào. Nhỡ đâu cậu ta về phe mình thật thì sao nhỉ? Có một chú sư tử kè kè bên cạnh có khi lại chẳng phải ý tồi chút nào.",
    ipaUs: "/weɪt ə ˈsɛkənd. wʌt ɪf hiz ɑːn ˈaʊər saɪd? ˈhævɪŋ ə ˈlaɪən əˈraʊnd maɪt nɑːt biː sʌtʃ ə bæd aɪˈdiːə./",
    keywords: ["what if", "not such a bad idea"],
    explanationAi: "Cấu trúc giả định 'what if' và phủ định giảm nhẹ 'might not be such a bad idea' (có thể là một ý tưởng khá thông minh).",
    properNouns: []
  },
  {
    orderIndex: 13,
    startTime: 242.0,
    endTime: 260.0,
    text: "If he's with us, who's gonna mess with us?",
    translationVi: "Nếu cậu ta ở cùng phe ta, thì đứa nào dám bén mảng đến gây sự với tụi mình nữa chứ?",
    ipaUs: "/ɪf hiz wɪð ʌs, huːz ˈɡɑːnə mɛs wɪð ʌs?/",
    keywords: ["mess with us"],
    explanationAi: "Cụm động từ khẩu ngữ 'mess with someone' (gây sự, trêu chọc hoặc đe dọa ai đó), câu hỏi tu từ khẳng định lợi thế bảo hộ của động vật săn mồi đầu bảng.",
    properNouns: []
  },

  // Scene 3: Simba Wakes Up & Past Grief (14 - 24)
  {
    orderIndex: 14,
    startTime: 285.0,
    endTime: 298.0,
    text: "You okay, kid?",
    translationVi: "Nhóc ổn chứ, nhóc tì?",
    ipaUs: "/juː oʊˈkeɪ, kɪd?/",
    keywords: ["you okay", "kid"],
    explanationAi: "Hiện tượng tỉnh lược trợ động từ (auxiliary verb dropping) rất đặc trưng trong giao tiếp thân mật: 'You okay?' thay vì 'Are you okay?'.",
    properNouns: []
  },
  {
    orderIndex: 15,
    startTime: 300.0,
    endTime: 312.0,
    text: "I guess so.",
    translationVi: "Chắc là vậy.",
    ipaUs: "/aɪ ɡɛs soʊ./",
    keywords: ["guess so"],
    explanationAi: "Câu trả lời ngắn buông xuôi 'I guess so' bộc lộ tâm trạng u uất, thiếu sinh khí của một đứa trẻ vừa trải qua chấn thương tâm lý nặng nề.",
    properNouns: []
  },
  {
    orderIndex: 16,
    startTime: 315.0,
    endTime: 335.0,
    text: "You nearly died! I saved you! Well, Pumbaa helped. A little.",
    translationVi: "Nhóc suýt toi mạng rồi đấy! Tớ đã cứu nhóc đấy nhé! À thì, Pumbaa cũng có giúp một tay. Một tẹo teo thôi.",
    ipaUs: "/juː ˈnɪrli daɪd! aɪ seɪvd juː! wɛl, ˈpʊmbɑː hɛlpt. ə ˈlɪtəl./",
    keywords: ["nearly died", "saved you", "a little"],
    explanationAi: "Tính cách thích vơ công trạng của Timon thể hiện qua trạng từ 'nearly' và cụm hạ thấp công lao của bạn 'a little'.",
    properNouns: ["Pumbaa"]
  },
  {
    orderIndex: 17,
    startTime: 338.0,
    endTime: 350.0,
    text: "Thanks for your help.",
    translationVi: "Cảm ơn sự giúp đỡ của hai bạn.",
    ipaUs: "/θæŋks fɔːr jʊər hɛlp./",
    keywords: ["thanks for your help"],
    explanationAi: "Lời cảm ơn lịch sự nhưng đượm buồn của Simba khi lầm lũi quay lưng bước đi một mình vào hoang mạc.",
    properNouns: []
  },
  {
    orderIndex: 18,
    startTime: 352.0,
    endTime: 368.0,
    text: "Hey, where are you going? Where you from?",
    translationVi: "Này, nhóc đang đi đâu đấy? Nhóc từ đâu tới vậy?",
    ipaUs: "/heɪ, wɛr ɑːr juː ˈɡoʊɪŋ? wɛr juː frʌm?/",
    keywords: ["where are you going", "where you from"],
    explanationAi: "Câu hỏi tỉnh lược trợ động từ tiếp theo 'Where you from?' thể hiện sự tò mò chân thành của cư dân rừng nhiệt đới.",
    properNouns: []
  },
  {
    orderIndex: 19,
    startTime: 370.0,
    endTime: 385.0,
    text: "Doesn't matter. I can't go back.",
    translationVi: "Không quan trọng đâu. Tôi không thể quay về được nữa rồi.",
    ipaUs: "/ˈdʌzənt ˈmætər. aɪ kænt ɡoʊ bæk./",
    keywords: ["doesn't matter", "can't go back"],
    explanationAi: "Cụm 'doesn't matter' (chẳng còn ý nghĩa gì nữa) và 'can't go back' (không thể quay đầu) phơi bày nỗi mặc cảm tội lỗi sâu sắc của chú sư tử trẻ.",
    properNouns: []
  },
  {
    orderIndex: 20,
    startTime: 388.0,
    endTime: 402.0,
    text: "What did you do, kid?",
    translationVi: "Nhóc đã gây ra chuyện gì à?",
    ipaUs: "/wʌt dɪd juː duː, kɪd?/",
    keywords: ["what did you do"],
    explanationAi: "Câu hỏi thăm dò trực diện về sai lầm trong quá khứ.",
    properNouns: []
  },
  {
    orderIndex: 21,
    startTime: 405.0,
    endTime: 425.0,
    text: "Something terrible. But I don't want to talk about it.",
    translationVi: "Một chuyện khủng khiếp lắm. Nhưng tôi không muốn nhắc lại chuyện đó.",
    ipaUs: "/ˈsʌmθɪŋ ˈtɛrəbəl. bʌt aɪ doʊnt wɑːnt tuː tɔːk əˈbaʊt ɪt./",
    keywords: ["something terrible", "don't want to talk about it"],
    explanationAi: "Đại từ bất định đi với tính từ 'Something terrible' và lời khước từ tâm sự 'don't want to talk about it' giữ kín bí mật về cái chết của người cha.",
    properNouns: []
  },
  {
    orderIndex: 22,
    startTime: 428.0,
    endTime: 440.0,
    text: "Good. We don't want to hear about it.",
    translationVi: "Tốt thôi. Tụi này cũng chẳng hề muốn nghe chuyện đó làm gì.",
    ipaUs: "/ɡʊd. wiː doʊnt wɑːnt tuː hɪr əˈbaʊt ɪt./",
    keywords: ["don't want to hear about it"],
    explanationAi: "Phản ứng hài hước, phũ phàng nhưng giải tỏa áp lực của Timon: không ép đối phương phải bộc bạch vết thương lòng.",
    properNouns: []
  },
  {
    orderIndex: 23,
    startTime: 442.0,
    endTime: 458.0,
    text: "Come on, Timon! Anything we can do to help?",
    translationVi: "Thôi nào, Timon! Có điều gì tụi mình có thể làm để giúp nhóc không?",
    ipaUs: "/kʌm ɑːn, ˈtaɪmən! ˈɛniˌθɪŋ wiː kæn duː tuː hɛlp?/",
    keywords: ["come on", "anything we can do"],
    explanationAi: "Lời giãi bày chân thành và ấm áp của lợn rừng Pumbaa đối lập với sự cay nghiệt bề ngoài của chồn Timon.",
    properNouns: ["Timon"]
  },
  {
    orderIndex: 24,
    startTime: 460.0,
    endTime: 475.0,
    text: "Not unless you can change the past.",
    translationVi: "Trừ phi các bạn có thể thay đổi được quá khứ.",
    ipaUs: "/nɑːt ənˈlɛs juː kæn tʃeɪndʒ ðə pæst./",
    keywords: ["unless", "change the past"],
    explanationAi: "Liên từ điều kiện 'unless' (= if not). Simba chạm đến nghịch lý lớn nhất của đời người: không ai có thể quay ngược thời gian để sửa đổi quá khứ.",
    properNouns: []
  },

  // Scene 4: Wordplay & The Food Chain (25 - 29)
  {
    orderIndex: 25,
    startTime: 478.0,
    endTime: 495.0,
    text: "Gee, he looks blue.",
    translationVi: "Chà, trông cậu nhóc buồn bã xám xịt quá.",
    ipaUs: "/dʒiː, hiː lʊks bluː./",
    keywords: ["looks blue"],
    explanationAi: "Thành ngữ chỉ tâm trạng 'look blue' (trông u uất, buồn bã). Từ cảm thán 'Gee' biểu thị sự xót xa ngạc nhiên.",
    properNouns: []
  },
  {
    orderIndex: 26,
    startTime: 498.0,
    endTime: 512.0,
    text: "I'd say brownish-gold.",
    translationVi: "Tớ thì lại thấy cậu ta màu nâu vàng óng cơ.",
    ipaUs: "/aɪd seɪ ˈbraʊnɪʃ-ɡoʊld./",
    keywords: ["brownish-gold"],
    explanationAi: "Hiểu nhầm hài hước (humorous literal interpretation): Timon bắt bẻ Pumbaa theo nghĩa đen của màu sắc lông với hậu tố '-ish' (mang sắc thái nâu vàng).",
    properNouns: []
  },
  {
    orderIndex: 27,
    startTime: 515.0,
    endTime: 532.0,
    text: "No, no, no. I mean he's depressed!",
    translationVi: "Không, không phải thế. Ý tớ là cậu ta đang bị suy sụp trầm cảm ấy!",
    ipaUs: "/noʊ, noʊ, noʊ. aɪ miːn hiz dɪˈprɛst!/",
    keywords: ["depressed"],
    explanationAi: "Tính từ tâm lý học 'depressed' (chán nản, tuyệt vọng) giải thích lại nghĩa bóng thực sự của thành ngữ 'looks blue'.",
    properNouns: []
  },
  {
    orderIndex: 28,
    startTime: 535.0,
    endTime: 550.0,
    text: "Kid, what's eating you?",
    translationVi: "Này nhóc, có nỗi muộn phiền gì đang gặm nhấm tâm can nhóc thế?",
    ipaUs: "/kɪd, wʌts ˈiːtɪŋ juː?/",
    keywords: ["what's eating you"],
    explanationAi: "Thành ngữ hội thoại 'what's eating you?' (= what is bothering/worrying you? - điều gì đang làm bạn phiền lòng).",
    properNouns: []
  },
  {
    orderIndex: 29,
    startTime: 552.0,
    endTime: 575.0,
    text: "Nothing! He's at the top of the food chain! Ha-ha-ha, the food chain!",
    translationVi: "Chẳng có con nào xơi được nó đâu! Nó đứng trên đỉnh chuỗi thức ăn mà! Ha ha ha, chuỗi thức ăn đấy!",
    ipaUs: "/ˈnʌθɪŋ! hiz æt ðə tɑːp ʌv ðə fuːd tʃeɪn! hɑː-hɑː-hɑː, ðə fuːd tʃeɪn!/",
    keywords: ["top of the food chain"],
    explanationAi: "Chơi chữ nghĩa đen xuất sắc: Timon xuyên tạc động từ 'eat' trong câu hỏi thành việc bị ăn thịt, cười khoái trá trước vị thế động vật săn mồi đầu bảng.",
    properNouns: []
  },

  // Scene 5: Putting the Past Behind You & Turning Your Back (30 - 36)
  {
    orderIndex: 30,
    startTime: 655.0,
    endTime: 678.0,
    text: "You know, kid, in times like this, my buddy Timon here says: you got to put your behind in your past.",
    translationVi: "Nhóc biết không, vào những lúc thế này, chiến hữu Timon của tớ đây hay bảo: nhóc phải đặt cái mông đít của mình vào trong quá khứ.",
    ipaUs: "/juː noʊ, kɪd, ɪn taɪmz laɪk ðɪs, maɪ ˈbʌdi ˈtaɪmən hɪr sɛz: juː ɡɑːt tuː pʊt jʊər bɪˈhaɪnd ɪn jʊər pæst./",
    keywords: ["buddy", "behind in your past"],
    explanationAi: "Lỗi chơi chữ nhầm từ kinh điển (malapropism): Pumbaa nhầm lẫn giới từ 'behind' (phía sau) với danh từ lóng 'behind' (cái mông/bàn tọa).",
    properNouns: ["Timon"]
  },
  {
    orderIndex: 31,
    startTime: 682.0,
    endTime: 700.0,
    text: "No, no, no! Amateur! Lie down before you hurt yourself!",
    translationVi: "Không, sai bét nhè rồi! Đồ nghiệp dư! Nằm xuống ngay kẻo tự làm chấn thương bản thân bây giờ!",
    ipaUs: "/noʊ, noʊ, noʊ! ˈæmətər! laɪ daʊn bɪˈfɔːr juː hɜːrt jərˈsɛlf!/",
    keywords: ["amateur", "hurt yourself"],
    explanationAi: "Từ vựng mỉa mai 'amateur' (kẻ học đòi nghiệp dư) và phản ứng giãy nảy đầy khoa trương của Timon khi nghe bạn mình bóp méo triết lý.",
    properNouns: []
  },
  {
    orderIndex: 32,
    startTime: 702.0,
    endTime: 720.0,
    text: "It's: you got to put your past behind you!",
    translationVi: "Phải là thế này: nhóc phải để lại quá khứ ở phía sau lưng mình!",
    ipaUs: "/ɪts: juː ɡɑːt tuː pʊt jʊər pæst bɪˈhaɪnd juː!/",
    keywords: ["put your past behind you"],
    explanationAi: "Thành ngữ cốt lõi 'put your past behind you' (quên đi dĩ vãng, gác lại muộn phiền quá khứ để hướng về tương lai).",
    properNouns: []
  },
  {
    orderIndex: 33,
    startTime: 725.0,
    endTime: 745.0,
    text: "Look, kid. Bad things happen, and you can't do anything about it, right?",
    translationVi: "Nghe này nhóc. Những chuyện tồi tệ cứ xảy ra, và nhóc chẳng thể làm gì để thay đổi được nó, đúng không?",
    ipaUs: "/lʊk, kɪd. bæd θɪŋz ˈhæpən, ænd juː kænt duː ˈɛniˌθɪŋ əˈbaʊt ɪt, raɪt?/",
    keywords: ["bad things happen", "can't do anything"],
    explanationAi: "Đặt câu hỏi dẫn dắt 'right?' để lôi kéo sự đồng thuận của Simba về tính bất khả kháng của biến cố cuộc đời.",
    properNouns: []
  },
  {
    orderIndex: 34,
    startTime: 748.0,
    endTime: 755.0,
    text: "Right.",
    translationVi: "Đúng thế ạ.",
    ipaUs: "/raɪt./",
    keywords: ["right"],
    explanationAi: "Sự đồng tình ngây thơ của Simba trước khi bị bẻ cong tư duy bởi lập luận bất ngờ của Timon.",
    properNouns: []
  },
  {
    orderIndex: 35,
    startTime: 758.0,
    endTime: 782.0,
    text: "Wrong! When the world turns its back on you, you turn your back on the world!",
    translationVi: "Sai bét! Khi cả thế giới này quay lưng lại với nhóc, thì nhóc hãy quay lưng lại với cả thế giới!",
    ipaUs: "/rɔːŋ! wɛn ðə wɜːrld tɜːrnz ɪts bæk ɑːn juː, juː tɜːrn jʊər bæk ɑːn ðə wɜːrld!/",
    keywords: ["turn your back on"],
    explanationAi: "Thành ngữ tương phản mạnh mẽ 'turn one's back on' (quay lưng chối bỏ, mặc kệ sự đời), triết lý trốn chạy thực tại đầy tự do nhưng liều lĩnh của Timon.",
    properNouns: []
  },
  {
    orderIndex: 36,
    startTime: 785.0,
    endTime: 800.0,
    text: "Well, that's not what I was taught.",
    translationVi: "Nhưng... đó đâu phải là những gì tôi được cha dạy bảo.",
    ipaUs: "/wɛl, ðæts nɑːt wʌt aɪ wʌz tɔːt./",
    keywords: ["not what I was taught"],
    explanationAi: "Cấu trúc bị động 'what I was taught' (những gì tôi được giáo dục), phản ánh sự giằng xé nội tâm giữa gia giáo vương triều và lối sống buông thả.",
    properNouns: []
  },

  // Scene 6: Hakuna Matata & The Bug Buffet (37 - 48)
  {
    orderIndex: 37,
    startTime: 805.0,
    endTime: 825.0,
    text: "Then maybe you need a new lesson. Repeat after me: Hakuna Matata!",
    translationVi: "Thế thì có lẽ nhóc cần một bài học mới toanh rồi. Nhắc lại theo tớ nào: Hakuna Matata!",
    ipaUs: "/ðɛn ˈmeɪbi juː niːd ə nuː ˈlɛsən. rɪˈpiːt ˈæftər miː: həˈkuːnə məˈtɑːtə!/",
    keywords: ["new lesson", "repeat after me", "Hakuna Matata"],
    explanationAi: "Cụm mệnh lệnh lớp học 'Repeat after me' và khẩu hiệu tiếng Swahili trứ danh 'Hakuna Matata'.",
    properNouns: ["Hakuna Matata"]
  },
  {
    orderIndex: 38,
    startTime: 828.0,
    endTime: 835.0,
    text: "What?",
    translationVi: "Cái gì cơ?",
    ipaUs: "/wʌt?/",
    keywords: ["what"],
    explanationAi: "Sự ngơ ngác tự nhiên trước một cụm từ ngoại lai chưa từng nghe thấy tại Pride Rock.",
    properNouns: []
  },
  {
    orderIndex: 39,
    startTime: 838.0,
    endTime: 852.0,
    text: "Hakuna Matata. It means no worries!",
    translationVi: "Hakuna Matata. Nó có nghĩa là chẳng có gì phải bận tâm lo lắng cả!",
    ipaUs: "/həˈkuːnə məˈtɑːtə. ɪt miːnz noʊ ˈwɜːriz!/",
    keywords: ["Hakuna Matata", "no worries"],
    explanationAi: "Khẩu hiệu 'no worries' giải phóng con người khỏi âu lo, ám ảnh và trách nhiệm xã hội.",
    properNouns: ["Hakuna Matata"]
  },
  {
    orderIndex: 40,
    startTime: 855.0,
    endTime: 865.0,
    text: "What's a motto?",
    translationVi: "Châm ngôn là cái gì thế?",
    ipaUs: "/wʌts ə ˈmɑːtoʊ?/",
    keywords: ["motto"],
    explanationAi: "Danh từ 'motto' (phương châm, khẩu hiệu sống định hướng hành vi của một cá nhân hay tổ chức).",
    properNouns: []
  },
  {
    orderIndex: 41,
    startTime: 868.0,
    endTime: 885.0,
    text: "Nothing! What's a motto with you? Ha-ha-ha!",
    translationVi: "Chẳng có gì! Đầu óc cậu có vấn đề gì thế hả? Ha ha ha!",
    ipaUs: "/ˈnʌθɪŋ! wʌts ə ˈmɑːtoʊ wɪð juː? hɑː-hɑː-hɑː!/",
    keywords: ["what's a motto with you"],
    explanationAi: "Chơi chữ đồng âm trứ danh (homophonic pun): Timon biến 'a motto' thành cách phát âm lóng của 'the matter' ('What's the matter with you?').",
    properNouns: []
  },
  {
    orderIndex: 42,
    startTime: 890.0,
    endTime: 915.0,
    text: "Hakuna Matata! It means no worries for the rest of your days!",
    translationVi: "Hakuna Matata! Nó có nghĩa là không hề vướng bận âu lo cho đến tận cuối đời!",
    ipaUs: "/həˈkuːnə məˈtɑːtə! ɪt miːnz noʊ ˈwɜːriz fɔːr ðə rɛst ʌv jʊər deɪz!/",
    keywords: ["rest of your days", "problem-free"],
    explanationAi: "Giai điệu câu hát bất hủ khắc sâu tư tưởng tự do phóng khoáng không màng ngày mai.",
    properNouns: ["Hakuna Matata"]
  },
  {
    orderIndex: 43,
    startTime: 1025.0,
    endTime: 1045.0,
    text: "I'm starved. I could eat a whole zebra.",
    translationVi: "Tôi đói lả cả người rồi. Giờ tôi có thể xơi tái cả một con ngựa vằn ấy.",
    ipaUs: "/aɪm stɑːrvd. aɪ kʊd iːt ə hoʊl ˈziːbrə./",
    keywords: ["starved", "eat a whole zebra"],
    explanationAi: "Phép ngoa dụ cực độ 'starved' (đói cồn cào) và 'eat a whole zebra' (tương đương thành ngữ 'eat a horse' trong tiếng Anh).",
    properNouns: []
  },
  {
    orderIndex: 44,
    startTime: 1050.0,
    endTime: 1072.0,
    text: "Whoa, kid! No zebras around here! We gotta rustle up some grub.",
    translationVi: "Khoan đã nhóc! Quanh đây chẳng có con ngựa vằn nào đâu! Tụi mình phải đi kiếm chút đồ ăn lót dạ thôi.",
    ipaUs: "/woʊ, kɪd! noʊ ˈziːbrəz əˈraʊnd hɪr! wiː ˈɡɑːtə ˈrʌsəl ʌp sʌm ɡrʌb./",
    keywords: ["rustle up", "grub"],
    explanationAi: "Thành ngữ lóng miền Tây 'rustle up' (nhanh chóng gom góp, tìm kiếm thứ gì đó để ăn) và từ lóng 'grub' vừa mang nghĩa thức ăn, vừa là ấu trùng sâu bọ.",
    properNouns: []
  },
  {
    orderIndex: 45,
    startTime: 1075.0,
    endTime: 1100.0,
    text: "Look at this rotten log. It's an all-you-can-eat bug buffet!",
    translationVi: "Hãy nhìn thân cây gỗ mục nát này xem. Đây là một đại tiệc buffet sâu bọ ăn thả ga không giới hạn đấy!",
    ipaUs: "/lʊk æt ðɪs ˈrɑːtən lɔːɡ. ɪts ən ɔːl-juː-kæn-iːt bʌɡ bəˈfeɪ!/",
    keywords: ["rotten log", "all-you-can-eat", "buffet"],
    explanationAi: "Thuật ngữ ẩm thực hiện đại 'all-you-can-eat buffet' (tiệc tự chọn ăn thỏa thích) áp dụng hài hước vào khúc gỗ mục chứa đầy côn trùng.",
    properNouns: []
  },
  {
    orderIndex: 46,
    startTime: 1105.0,
    endTime: 1125.0,
    text: "Mmm, piquant, with a very pleasant crunch!",
    translationVi: "Chẹp chẹp, vị cay nồng đậm đà, cắn vào giòn rụm sướng cả miệng!",
    ipaUs: "/mmm, ˈpiːkənt, wɪð ə ˈvɛri ˈplɛzənt krʌntʃ!/",
    keywords: ["piquant", "pleasant crunch"],
    explanationAi: "Tính từ ẩm thực sành điệu 'piquant' (mang hương vị cay the quyến rũ) và danh từ cảm giác giác quan 'crunch' (tiếng giòn rụm khi nhai).",
    properNouns: []
  },
  {
    orderIndex: 47,
    startTime: 1130.0,
    endTime: 1148.0,
    text: "Well... slimy, yet satisfying!",
    translationVi: "Chà... trơn nhớt thật đấy, nhưng mà ăn đã miệng phết!",
    ipaUs: "/wɛl... ˈslaɪmi, jɛt ˈsætɪsˌfaɪɪŋ!/",
    keywords: ["slimy", "satisfying"],
    explanationAi: "Câu thoại kinh điển của bộ phim: sự kết hợp đối lập hoàn hảo giữa tính từ nhầy nhụa 'slimy' và trạng thái thỏa mãn vị giác 'satisfying'.",
    properNouns: []
  },
  {
    orderIndex: 48,
    startTime: 1152.0,
    endTime: 1165.0,
    text: "That's it! Tastes like chicken!",
    translationVi: "Chuẩn cơm mẹ nấu rồi! Vị hệt như thịt gà vậy!",
    ipaUs: "/ðæts ɪt! teɪsts laɪk ˈtʃɪkən!/",
    keywords: ["tastes like chicken"],
    explanationAi: "Thành ngữ văn hóa đại chúng phổ biến của người Mỹ 'tastes like chicken' khi miêu tả hương vị của bất kỳ món ăn kỳ lạ nào.",
    properNouns: []
  },

  // Scene 7: Climax Wisdom of Rafiki & Lesson Takeaway (49)
  {
    orderIndex: 49,
    startTime: 1335.0,
    endTime: 1440.0,
    text: "Ah yes, the past can hurt. But the way I see it, you can either run from it, or learn from it!",
    translationVi: "À phải rồi, quá khứ có thể gây tổn thương đau đớn. Nhưng theo cách ta nhìn nhận, con có thể chọn trốn chạy nó, hoặc học hỏi vươn lên từ nó!",
    ipaUs: "/ɑː jɛs, ðə pæst kæn hɜːrt. bʌt ðə weɪ aɪ siː ɪt, juː kæn ˈaɪðər rʌn frʌm ɪt, ɔːr lɜːrn frʌm ɪt!/",
    keywords: ["past can hurt", "run from it", "learn from it"],
    explanationAi: "Triết lý bất hủ sâu sắc nhất của tác phẩm qua lời khuyên của pháp sư Rafiki: cấu trúc lựa chọn 'either... or' thúc giục lòng can đảm đối diện nghịch cảnh quá khứ để trưởng thành.",
    properNouns: []
  }
];

// Token count synchronization with exact JS regex
segments.forEach((s) => {
  s.tokenCount = (s.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
});

console.log(`Generated ${segments.length} pure segments for The Lion King.`);
segments.forEach((s, i) => {
  console.log(`Seg ${i}: tokens=${s.tokenCount}, start=${s.startTime}, end=${s.endTime}, text="${s.text.substring(0, 35)}..."`);
});

fs.writeFileSync('scripts/lionking_pure_segments.json', JSON.stringify(segments, null, 2), 'utf-8');
console.log('Saved scripts/lionking_pure_segments.json successfully!');
