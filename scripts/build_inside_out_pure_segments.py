import json
import re

# Biên soạn 50 Pure Master Segments chuẩn xác cho Inside Out (Uky-jgd3M3E)
# Thời lượng video: 13:13 (793 giây)
# Bao phủ toàn bộ 7 phân cảnh chính từ đầu đến cuối video

raw_segments = [
    # --- CHAPTER 1: HEADQUARTERS & PERSONALITY ISLANDS (00:02 - 01:05) ---
    {
        "orderIndex": 0,
        "startTime": 2.5,
        "endTime": 7.0,
        "text": "And that was just the beginning. Headquarters only got more crowded from there.",
        "translationVi": "Và đó mới chỉ là sự khởi đầu. Bộ Chỉ Huy cảm xúc từ đó ngày càng trở nên đông đúc hơn.",
        "ipaUs": "/ænd ðæt wʌz dʒʌst ðə bɪˈɡɪnɪŋ. ˈhɛdˌkwɔːrtərz ˈoʊnli ɡɑːt mɔːr ˈkraʊdɪd frʌm ðɛr./",
        "keywords": ["the beginning", "Headquarters", "more crowded"],
        "explanationAi": "Lời dẫn chuyện mở đầu đặc trưng của Joy. 'Headquarters' là danh từ chỉ trung tâm chỉ huy điều phối các cảm xúc của Riley.",
        "properNouns": ["Headquarters"]
    },
    {
        "orderIndex": 1,
        "startTime": 7.0,
        "endTime": 15.0,
        "text": "Meet Sadness. I'm not actually sure what she does, and I've checked, there's no place for her to go.",
        "translationVi": "Hãy làm quen với Buồn Bã. Tôi thực sự chẳng rõ cô ấy có tác dụng gì, và tôi đã kiểm tra rồi, chẳng có chỗ nào cho cô ấy đi cả.",
        "ipaUs": "/miːt ˈsædnəs. aɪm nɑːt ˈæktʃuəli ʃʊr wʌt ʃiː dʌz, ænd aɪv tʃɛkt, ðɛrz noʊ pleɪs fɔːr hɜːr tuː ɡoʊ./",
        "keywords": ["meet Sadness", "not actually sure", "no place for her"],
        "explanationAi": "Lối nhìn nhận ban đầu ngây thơ của Joy về Sadness: coi nỗi buồn là điều dư thừa không rõ công năng.",
        "properNouns": ["Sadness"]
    },
    {
        "orderIndex": 2,
        "startTime": 15.0,
        "endTime": 22.0,
        "text": "Here comes an airplane! Open wide!",
        "translationVi": "Máy bay đang hạ cánh đây! Mở miệng to ra nào!",
        "ipaUs": "/hɪr kʌmz ən ˈɛrˌpleɪn! ˈoʊpən waɪd!/",
        "keywords": ["here comes an airplane", "open wide"],
        "explanationAi": "Câu dỗ ăn kinh điển của các bậc cha mẹ phương Tây khi cho trẻ nhỏ ăn dặm ('airplane' thìa thức ăn).",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 22.0,
        "endTime": 28.0,
        "text": "Hey, would you look at that? Very nice!",
        "translationVi": "Này, nhìn xem kìa! Tuyệt vời chưa!",
        "ipaUs": "/heɪ, wʊd juː lʊk æt ðæt? ˈvɛri naɪs!/",
        "keywords": ["look at that", "very nice"],
        "explanationAi": "Khẩu ngữ tán thưởng khích lệ: 'would you look at that' thể hiện sự hào hứng ngạc nhiên.",
        "properNouns": []
    },
    {
        "orderIndex": 4,
        "startTime": 28.0,
        "endTime": 36.0,
        "text": "And each core memory powers a different aspect of Riley's personality.",
        "translationVi": "Và mỗi ký ức cốt lõi tiếp năng lượng cho một khía cạnh tính cách khác nhau của Riley.",
        "ipaUs": "/ænd iːtʃ kɔːr ˈmɛməri ˈpaʊərz ə ˈdɪfərənt ˈæspɛkt əv ˈraɪliz ˌpɜːrsəˈnæləti./",
        "keywords": ["core memory", "powers a different aspect", "personality"],
        "explanationAi": "Khái niệm tâm lý học độc quyền của phim: 'core memory' (ký ức định hình bản ngã), động từ 'power' (cung cấp năng lượng vận hành).",
        "properNouns": ["Riley"]
    },
    {
        "orderIndex": 5,
        "startTime": 36.0,
        "endTime": 44.0,
        "text": "Yep, Goofball Island is the best!",
        "translationVi": "Chuẩn luôn, Đảo Ngớ Ngẩn là tuyệt nhất trên đời!",
        "ipaUs": "/jɛp, ˈɡuːfˌbɔːl ˈaɪlənd ɪz ðə bɛst!/",
        "keywords": ["Goofball Island", "is the best"],
        "explanationAi": "'Goofball Island' (Đảo Ngớ Ngẩn / Trẻ Con) đại diện cho nét tính cách hài hước, vui đùa vô tư của Riley cùng cha mẹ.",
        "properNouns": ["Goofball Island"]
    },
    {
        "orderIndex": 6,
        "startTime": 44.0,
        "endTime": 54.0,
        "text": "We love our girl. She's got great friends and a great house.",
        "translationVi": "Chúng tôi yêu cô bé của mình. Con bé có những người bạn tuyệt vời và một ngôi nhà ấm êm.",
        "ipaUs": "/wiː lʌv ˈaʊər ɡɜːrl. ʃiːz ɡɑːt ɡreɪt frɛndz ænd ə ɡreɪt haʊs./",
        "keywords": ["love our girl", "great friends", "great house"],
        "explanationAi": "Joy tự hào về tuổi thơ hoàn hảo đầy ắp tiếng cười của Riley tại Minnesota trước khi chuyển nhà.",
        "properNouns": []
    },

    # --- CHAPTER 2: ARRIVAL IN SAN FRANCISCO & MOVING VAN CRISIS (01:05 - 03:55) ---
    {
        "orderIndex": 7,
        "startTime": 64.0,
        "endTime": 71.0,
        "text": "Okay... not what I had in mind.",
        "translationVi": "Được rồi... không hẳn giống những gì tôi từng mường tượng.",
        "ipaUs": "/oʊˈkeɪ... nɑːt wʌt aɪ hæd ɪn maɪnd./",
        "keywords": ["not what I had in mind"],
        "explanationAi": "Thành ngữ biểu cảm phổ biến: 'not what someone had in mind' (khác xa với kỳ vọng ban đầu).",
        "properNouns": []
    },
    {
        "orderIndex": 8,
        "startTime": 71.0,
        "endTime": 80.0,
        "text": "I sure am glad you told me earthquakes are a myth, Joy. Otherwise, I'd be terrified right now.",
        "translationVi": "Tôi thực sự thấy mừng vì cô đã bảo động đất chỉ là chuyện hoang đường đấy Joy. Nếu không thì giờ tôi đã khiếp vía rồi.",
        "ipaUs": "/aɪ ʃʊr æm ɡlæd juː toʊld miː ˈɜːrθˌkweɪks ɑːr ə mɪθ, dʒɔɪ. ˈʌðərˌwaɪz, aɪd biː ˈtɛrəˌfaɪd raɪt naʊ./",
        "keywords": ["earthquakes are a myth", "otherwise", "terrified"],
        "explanationAi": "Fear (Sợ Hãi) thể hiện tính cách lo lắng thái quá đặc trưng trước những ngôi nhà cổ dốc đứng ở San Francisco.",
        "properNouns": ["Joy"]
    },
    {
        "orderIndex": 9,
        "startTime": 80.0,
        "endTime": 88.0,
        "text": "And we're supposed to live here?",
        "translationVi": "Và chúng ta phải sống ở chỗ này thật sao?",
        "ipaUs": "/ænd wɪr səˈpoʊzd tuː lɪv hɪr?/",
        "keywords": ["supposed to live here"],
        "explanationAi": "Cấu trúc 'be supposed to do something' thể hiện sự hoài nghi trước hoàn cảnh bất đắc dĩ.",
        "properNouns": []
    },
    {
        "orderIndex": 10,
        "startTime": 88.0,
        "endTime": 96.0,
        "text": "I'm telling you, it smells like something died in here.",
        "translationVi": "Tôi nói cho mà biết, ở đây bốc mùi như có con gì vừa chết ấy.",
        "ipaUs": "/aɪm ˈtɛlɪŋ juː, ɪt smɛlz laɪk ˈsʌmθɪŋ daɪd ɪn hɪr./",
        "keywords": ["telling you", "smells like something died"],
        "explanationAi": "Disgust (Chảnh Chọe / Ghê Tởm) phản ứng với căn nhà ẩm mốc. Thành ngữ cường điệu 'smells like something died'.",
        "properNouns": []
    },
    {
        "orderIndex": 11,
        "startTime": 96.0,
        "endTime": 102.0,
        "text": "Well, guess what? The moving van won't be here until Thursday.",
        "translationVi": "À mà đoán xem này? Xe tải chuyển đồ sẽ không tới đây trước thứ Năm đâu.",
        "ipaUs": "/wɛl, ɡɛs wʌt? ðə ˈmuːvɪŋ væn woʊnt biː hɪr ənˈtɪl ˈθɜːrzdeɪ./",
        "keywords": ["guess what", "moving van", "won't be here until"],
        "explanationAi": "Cú sốc đầu tiên của gia đình tại thành phố mới: xe chở toàn bộ giường đệm và đồ dùng bị giao trễ.",
        "properNouns": ["Thursday"]
    },
    {
        "orderIndex": 12,
        "startTime": 102.0,
        "endTime": 108.0,
        "text": "You're kidding! You're telling me we have to sleep on the floor?",
        "translationVi": "Bố đùa đấy à! Ý bố là chúng ta phải nằm ngủ dưới sàn nhà sao?",
        "ipaUs": "/jʊr ˈkɪdɪŋ! jʊr ˈtɛlɪŋ miː wiː hæv tuː sliːp ɑːn ðə flɔːr?/",
        "keywords": ["you're kidding", "sleep on the floor"],
        "explanationAi": "Khẩu ngữ ngạc nhiên bất bình: 'You're kidding!' (Đùa nhau à!).",
        "properNouns": []
    },
    {
        "orderIndex": 13,
        "startTime": 186.0,
        "endTime": 194.0,
        "text": "Oh, I'm so jumpy. My nerves are shot.",
        "translationVi": "Ôi, tôi cứ giật bắn cả mình. Các dây thần kinh của tôi căng như dây đàn rồi.",
        "ipaUs": "/oʊ, aɪm soʊ ˈdʒʌmpi. maɪ nɜːrvz ɑːr ʃɑːt./",
        "keywords": ["jumpy", "nerves are shot"],
        "explanationAi": "Thành ngữ giao tiếp tự nhiên: 'nerves are shot' (kiệt sức, căng thẳng đến mức bồn chồn lo âu).",
        "properNouns": []
    },
    {
        "orderIndex": 14,
        "startTime": 194.0,
        "endTime": 204.0,
        "text": "Tell you what, let's make a list of all the things Riley should be happy about.",
        "translationVi": "Bảo này, chúng ta hãy cùng lập một danh sách tất cả những điều Riley nên cảm thấy vui vẻ đi.",
        "ipaUs": "/tɛl juː wʌt, lɛts meɪk ə lɪst əv ɔːl ðə θɪŋz ˈraɪli ʃʊd biː ˈhæpi əˈbaʊt./",
        "keywords": ["tell you what", "make a list", "happy about"],
        "explanationAi": "Joy luôn cố gắng duy trì tinh thần lạc quan bằng mọi giá nhằm lấn át mọi cảm xúc tiêu cực.",
        "properNouns": ["Riley"]
    },
    {
        "orderIndex": 15,
        "startTime": 204.0,
        "endTime": 218.0,
        "text": "I guess all I really want to say is thank you. If you and I can keep smiling, it would be a big help to your dad.",
        "translationVi": "Mẹ nghĩ điều mẹ thực sự muốn nói là cảm ơn con. Nếu mẹ con mình có thể tiếp tục mỉm cười, đó sẽ là nguồn động viên to lớn cho bố con đấy.",
        "ipaUs": "/aɪ ɡɛs ɔːl aɪ ˈrɪəli wɑːnt tuː seɪ ɪz θæŋk juː. ɪf juː ænd aɪ kæn kiːp ˈsmaɪlɪŋ, ɪt wʊd biː ə bɪɡ hɛlp tuː jʊər dæd./",
        "keywords": ["all I really want to say", "keep smiling", "a big help"],
        "explanationAi": "Lời tâm sự của người mẹ: vô tình đặt lên vai Riley gánh nặng phải luôn tỏ ra vui vẻ hạnh phúc để làm vui lòng bố mẹ.",
        "properNouns": []
    },

    # --- CHAPTER 3: FIRST DAY OF SCHOOL & SADNESS BREAKDOWN (03:55 - 05:25) ---
    {
        "orderIndex": 16,
        "startTime": 239.0,
        "endTime": 248.0,
        "text": "First day of school! Very, very exciting! I was up late last night figuring out a new plan.",
        "translationVi": "Ngày đầu tiên tới trường! Cực kỳ, cực kỳ hào hứng luôn! Đêm qua tôi đã thức muộn để vạch ra một kế hoạch mới toanh.",
        "ipaUs": "/fɜːrst deɪ əv skuːl! ˈvɛri, ˈvɛri ɪkˈsaɪtɪŋ! aɪ wʌz ʌp leɪt læst naɪt ˈfɪɡjərɪŋ aʊt ə njuː plæn./",
        "keywords": ["first day of school", "up late", "figuring out a new plan"],
        "explanationAi": "Cụm động từ 'figure out' (tìm ra, lên kế hoạch thấu đáo). Joy tràn đầy năng lượng tích cực.",
        "properNouns": []
    },
    {
        "orderIndex": 17,
        "startTime": 248.0,
        "endTime": 255.0,
        "text": "Here it is. Train of Thought, right on schedule!",
        "translationVi": "Nó đây rồi. Chuyến Tàu Ý Nghĩ, đến đúng boong lịch trình luôn!",
        "ipaUs": "/hɪr ɪt ɪz. treɪn əv θɔːt, raɪt ɑːn ˈskɛdʒuːl!/",
        "keywords": ["Train of Thought", "right on schedule"],
        "explanationAi": "Phép ẩn dụ điện ảnh kinh điển: 'Train of Thought' (đoàn tàu ý nghĩ) chạy vòng quanh não bộ kết nối các vùng ký ức.",
        "properNouns": ["Train of Thought"]
    },
    {
        "orderIndex": 18,
        "startTime": 255.0,
        "endTime": 262.0,
        "text": "And there! Perfect! Make sure that all the sadness stays inside the circle.",
        "translationVi": "Xong rồi đó! Hoàn hảo! Hãy đảm bảo rằng mọi nỗi buồn chỉ được ở yên bên trong vòng tròn này nhé.",
        "ipaUs": "/ænd ðɛr! ˈpɜːrfɪkt! meɪk ʃʊr ðæt ɔːl ðə ˈsædnəs steɪz ɪnˈsaɪd ðə ˈsɜːrkəl./",
        "keywords": ["stays inside the circle", "make sure"],
        "explanationAi": "Joy vẽ một vòng phấn trên sàn và cô lập Sadness: ẩn dụ về việc con người thường cố tình giam cầm, chối bỏ nỗi buồn của chính mình.",
        "properNouns": []
    },
    {
        "orderIndex": 19,
        "startTime": 262.0,
        "endTime": 272.0,
        "text": "Have a good day at school, monkey! Are you sure we want to do this?",
        "translationVi": "Chúc khỉ con đi học ngày đầu thật vui vẻ nhé! Bố mẹ có chắc là chúng ta muốn làm việc này không?",
        "ipaUs": "/hæv ə ɡʊd deɪ æt skuːl, ˈmʌŋki! ɑːr juː ʃʊr wiː wɑːnt tuː duː ðɪs?/",
        "keywords": ["good day at school", "monkey", "are you sure"],
        "explanationAi": "'Monkey' là tên thân mật bố gọi Riley. Sự bất an dâng tràn trước ngưỡng cửa lớp học mới.",
        "properNouns": []
    },
    {
        "orderIndex": 20,
        "startTime": 272.0,
        "endTime": 280.0,
        "text": "Are you kidding? We're not talking to them. We want them to like us!",
        "translationVi": "Đùa à? Chúng ta không chủ động nói chuyện với họ đâu. Chúng ta muốn họ phải thích mình cơ!",
        "ipaUs": "/ɑːr juː ˈkɪdɪŋ? wɪr nɑːt ˈtɔːkɪŋ tuː ðɛm. wiː wɑːnt ðɛm tuː laɪk ʌs!/",
        "keywords": ["not talking to them", "want them to like us"],
        "explanationAi": "Disgust phân tích tâm lý đồng trang lứa của thiếu niên: nỗi sợ bị bạn bè đánh giá là kẻ lập dị.",
        "properNouns": []
    },
    {
        "orderIndex": 21,
        "startTime": 280.0,
        "endTime": 290.0,
        "text": "Riley, would you like to tell us something about yourself? How about Minnesota?",
        "translationVi": "Riley, em có muốn kể cho cả lớp nghe chút gì về bản thân không? Ví dụ như về quê nhà Minnesota chẳng hạn?",
        "ipaUs": "/ˈraɪli, wʊd juː laɪk tuː tɛl ʌs ˈsʌmθɪŋ əˈbaʊt jʊərˈsɛlf? haʊ əˈbaʊt ˌmɪnəˈsoʊtə?/",
        "keywords": ["tell us about yourself", "how about Minnesota"],
        "explanationAi": "Cô giáo mời Riley phát biểu mở màn trước lớp, mở ra cao trào xung đột cảm xúc.",
        "properNouns": ["Riley", "Minnesota"]
    },
    {
        "orderIndex": 22,
        "startTime": 290.0,
        "endTime": 298.0,
        "text": "Pretty much everyone in my family skates. We used to play on the frozen pond all winter long.",
        "translationVi": "Hầu như tất cả mọi người trong gia đình em đều biết trượt băng. Chúng em từng chơi đùa trên hồ nước đóng băng suốt cả mùa đông.",
        "ipaUs": "/ˈprɪti mʌtʃ ˈɛvriˌwʌn ɪn maɪ ˈfæməli skeɪts. wiː juːst tuː pleɪ ɑːn ðə ˈfroʊzən pɑːnd ɔːl ˈwɪntər lɔːŋ./",
        "keywords": ["pretty much everyone", "frozen pond", "all winter long"],
        "explanationAi": "Thành ngữ 'pretty much' (gần như là). Ký ức tuổi thơ tươi đẹp ấm áp nơi quê nhà.",
        "properNouns": []
    },
    {
        "orderIndex": 23,
        "startTime": 298.0,
        "endTime": 306.0,
        "text": "Hey, Sadness! You touched a memory! We talked about this!",
        "translationVi": "Này Buồn Bã! Cô vừa chạm vào ký ức rồi đấy! Chúng ta đã quán triệt việc này rồi cơ mà!",
        "ipaUs": "/heɪ, ˈsædnəs! juː tʌtʃt ə ˈmɛməri! wiː tɔːkt əˈbaʊt ðɪs!/",
        "keywords": ["touched a memory", "talked about this"],
        "explanationAi": "Khi Sadness chạm vào, quả cầu ký ức vui vẻ lập tức chuyển sang sắc xanh biếc của nỗi buồn và sự hoài niệm đau xót.",
        "properNouns": ["Sadness"]
    },
    {
        "orderIndex": 24,
        "startTime": 306.0,
        "endTime": 315.0,
        "text": "No, that's a core memory! No, no, no, don't touch it!",
        "translationVi": "Không, đó là ký ức cốt lõi! Đừng, đừng chạm vào nó!",
        "ipaUs": "/noʊ, ðæts ə kɔːr ˈmɛməri! noʊ, noʊ, noʊ, doʊnt tʌtʃ ɪt!/",
        "keywords": ["core memory", "don't touch it"],
        "explanationAi": "Joy hốt hoảng ngăn cản Sadness tạo ra ký ức cốt lõi buồn bã đầu tiên trong đời Riley.",
        "properNouns": []
    },

    # --- CHAPTER 4: FAMILY DINNER & SASS COLLAPSE (05:25 - 06:45) ---
    {
        "orderIndex": 25,
        "startTime": 333.0,
        "endTime": 341.0,
        "text": "I found a junior hockey league right here in San Francisco. And get this: tryouts are tomorrow!",
        "translationVi": "Bố vừa tìm được một giải khúc côn cầu thiếu niên ngay tại San Francisco này đấy. Và nghe này: buổi thi tuyển là ngày mai luôn!",
        "ipaUs": "/aɪ faʊnd ə ˈdʒuːnjər ˈhɑːki liːɡ raɪt hɪr ɪn sæn frænˈsɪskoʊ. ænd ɡɛt ðɪs: ˈtraɪˌaʊts ɑːr təˈmɔːroʊ!/",
        "keywords": ["junior hockey league", "get this", "tryouts"],
        "explanationAi": "Khẩu ngữ 'get this' (nghe kỹ điều tuyệt vời này nhé), 'tryouts' (buổi thi tuyển đội thể thao).",
        "properNouns": ["San Francisco"]
    },
    {
        "orderIndex": 26,
        "startTime": 341.0,
        "endTime": 349.0,
        "text": "How was the first day of school? She's probing us! Quick, pretend to be Joy!",
        "translationVi": "Ngày đầu tiên đi học thế nào con? Mẹ đang thăm dò chúng ta kìa! Mau, giả vờ làm Vui Vẻ đi!",
        "ipaUs": "/haʊ wʌz ðə fɜːrst deɪ əv skuːl? ʃiːz ˈproʊbɪŋ ʌs! kwɪk, prɪˈtɛnd tuː biː dʒɔɪ!/",
        "keywords": ["first day of school", "probing us", "pretend to be Joy"],
        "explanationAi": "Động từ 'probe' (thăm dò, gặng hỏi). Các cảm xúc còn lại trong Bộ chỉ huy lúng túng khi Joy vắng mặt.",
        "properNouns": ["Joy"]
    },
    {
        "orderIndex": 27,
        "startTime": 349.0,
        "endTime": 358.0,
        "text": "Riley, is everything okay? Sir, she just rolled her eyes at us!",
        "translationVi": "Riley, mọi chuyện vẫn ổn chứ con? Báo cáo sếp, con bé vừa đảo mắt khinh khỉnh với chúng ta kìa!",
        "ipaUs": "/ˈraɪli, ɪz ˈɛvriˌθɪŋ oʊˈkeɪ? sɜːr, ʃiː dʒʌst roʊld hər aɪz æt ʌs!/",
        "keywords": ["rolled her eyes", "everything okay"],
        "explanationAi": "Hành vi giao tiếp phi ngôn ngữ: 'roll one's eyes' (đảo mắt biểu thị thái độ bực bội, xấc xược).",
        "properNouns": ["Riley"]
    },
    {
        "orderIndex": 28,
        "startTime": 358.0,
        "endTime": 365.0,
        "text": "What is your problem? Just leave me alone! Sir, reporting high levels of sass!",
        "translationVi": "Vấn đề của bố mẹ là gì vậy? Hãy để con yên đi! Báo cáo sếp, chỉ số xấc xược đang ở mức báo động đỏ!",
        "ipaUs": "/wʌt ɪz jʊər ˈprɑːbləm? dʒʌst liːv miː əˈloʊn! sɜːr, rɪˈpɔːrtɪŋ haɪ ˈlɛvəlz əv sæs!/",
        "keywords": ["leave me alone", "reporting high levels of sass"],
        "explanationAi": "Từ vựng tiếng lóng: 'sass' (thái độ cãi lại, xấc xược). Anger (Giận Dữ) trong đầu bố kích hoạt kỷ luật thép.",
        "properNouns": []
    },
    {
        "orderIndex": 29,
        "startTime": 395.0,
        "endTime": 405.0,
        "text": "I get it. You need some alone time. Oh no... we lost Goofball Island!",
        "translationVi": "Bố hiểu rồi. Con cần một chút thời gian ở một mình. Ôi không... chúng ta vừa đánh mất Đảo Ngớ Ngẩn rồi!",
        "ipaUs": "/aɪ ɡɛt ɪt. juː niːd sʌm əˈloʊn taɪm. oʊ noʊ... wiː lɔːst ˈɡuːfˌbɔːl ˈaɪlənd!/",
        "keywords": ["alone time", "lost Goofball Island"],
        "explanationAi": "Cột mốc đau lòng: Hòn đảo tính cách hồn nhiên đầu tiên bị sụp đổ đổ sụp xuống Vực Thẳm Lãng Quên.",
        "properNouns": ["Goofball Island"]
    },

    # --- CHAPTER 5: LONG TERM MEMORY & BING BONG (06:45 - 08:35) ---
    {
        "orderIndex": 30,
        "startTime": 405.0,
        "endTime": 415.0,
        "text": "Which way? Left or right? This is not working. Are we even getting close?",
        "translationVi": "Đường nào đây? Rẽ trái hay rẽ phải? Cách này chẳng hiệu quả gì cả. Liệu chúng ta có đang tới gần không đấy?",
        "ipaUs": "/wɪtʃ weɪ? lɛft ɔːr raɪt? ðɪs ɪz nɑːt ˈwɜːrkɪŋ. ɑːr wiː ˈiːvən ˈɡɛtɪŋ kloʊs?/",
        "keywords": ["which way", "not working", "getting close"],
        "explanationAi": "Joy và Sadness bị lạc trong mê cung khổng lồ Ký ức Dài hạn (Long Term Memory).",
        "properNouns": []
    },
    {
        "orderIndex": 31,
        "startTime": 415.0,
        "endTime": 423.0,
        "text": "Yeah, just keep Washington, Lincoln, and the names of the first three presidents. Forget the rest!",
        "translationVi": "Ừ, cứ giữ lại Washington, Lincoln và tên của ba tổng thống đầu tiên thôi. Quên sạch phần còn lại đi!",
        "ipaUs": "/jɛə, dʒʌst kiːp ˈwɑːʃɪŋtən, ˈlɪŋkən, ænd ðə neɪmz əv ðə fɜːrst θriː ˈprɛzədənts. fərˈɡɛt ðə rɛst!/",
        "keywords": ["keep Washington Lincoln", "forget the rest"],
        "explanationAi": "Các công nhân dọn dẹp ký ức (Forgetters) hút bỏ những kiến thức vụn vặt Riley không còn dùng đến.",
        "properNouns": ["Washington", "Lincoln"]
    },
    {
        "orderIndex": 32,
        "startTime": 423.0,
        "endTime": 432.0,
        "text": "Stay happy! We do not want to lose any more islands around here!",
        "translationVi": "Phải luôn vui vẻ! Chúng ta không được phép để mất thêm bất kỳ hòn đảo nào quanh đây nữa!",
        "ipaUs": "/steɪ ˈhæpi! wiː duː nɑːt wɑːnt tuː luːz ˈɛni mɔːr ˈaɪləndz əˈraʊnd hɪr!/",
        "keywords": ["stay happy", "lose any more islands"],
        "explanationAi": "Joy tuyệt vọng bám víu vào khẩu hiệu 'stay happy' trước sự sụp đổ liên tiếp của các hòn đảo tính cách.",
        "properNouns": []
    },
    {
        "orderIndex": 33,
        "startTime": 458.0,
        "endTime": 467.0,
        "text": "I cried candy! Try the caramel, it's delicious! Here, take some!",
        "translationVi": "Tôi khóc ra kẹo đấy! Thử kẹo caramel xem, ngon tuyệt cú mèo luôn! Này, cầm lấy một ít đi!",
        "ipaUs": "/aɪ kraɪd ˈkændi! traɪ ðə ˈkærəmɛl, ɪts dɪˈlɪʃəs! hɪr, teɪk sʌm!/",
        "keywords": ["cried candy", "caramel", "delicious"],
        "explanationAi": "Nhân vật Bing Bong - người bạn tưởng tượng thời thơ ấu (nửa voi, nửa mèo, nửa cá heo) khóc ra những viên kẹo ngọt.",
        "properNouns": ["Bing Bong"]
    },
    {
        "orderIndex": 34,
        "startTime": 467.0,
        "endTime": 476.0,
        "text": "What abstract concept are we trying to comprehend today? Um... loneliness?",
        "translationVi": "Hôm nay chúng ta đang cố gắng thấu hiểu khái niệm trừu tượng nào đây? Ừm... sự cô đơn chăng?",
        "ipaUs": "/wʌt ˈæbˌstrækt ˈkɑːnsɛpt ɑːr wiː ˈtraɪɪŋ tuː ˌkɑːmprɪˈhɛnd təˈdeɪ? ʌm... ˈloʊnlinəs?/",
        "keywords": ["abstract concept", "comprehend", "loneliness"],
        "explanationAi": "Căn phòng Tư duy Trừu tượng (Abstract Thought) nơi biến đổi hình khối từ 3D thành 2D và những đường nét cơ bản.",
        "properNouns": ["Abstract Thought"]
    },
    {
        "orderIndex": 35,
        "startTime": 476.0,
        "endTime": 485.0,
        "text": "We're in the second stage! We're deconstructing! Run!",
        "translationVi": "Chúng ta đang ở giai đoạn thứ hai rồi! Cơ thể chúng ta đang bị giải cấu trúc! Chạy mau!",
        "ipaUs": "/wɪr ɪn ðə ˈsɛkənd steɪdʒ! wɪr ˌdiːkənˈstrʌktɪŋ! rʌn!/",
        "keywords": ["second stage", "deconstructing", "run"],
        "explanationAi": "Thuật ngữ nghệ thuật và triết học: 'deconstruct' (giải cấu trúc, chia tách thành các khối hình học phẳng).",
        "properNouns": []
    },
    {
        "orderIndex": 36,
        "startTime": 500.0,
        "endTime": 510.0,
        "text": "Imagination Land is the best! And now I'm all set to take Riley to the moon!",
        "translationVi": "Xứ sở Tưởng tượng là đỉnh nhất! Và giờ tôi đã sẵn sàng đưa Riley bay lên mặt trăng rồi!",
        "ipaUs": "/ɪˌmædʒəˈneɪʃən lænd ɪz ðə bɛst! ænd naʊ aɪm ɔːl sɛt tuː teɪk ˈraɪli tuː ðə muːn!/",
        "keywords": ["Imagination Land", "all set", "take to the moon"],
        "explanationAi": "Thành ngữ 'all set' (sẵn sàng mọi thứ). Chiếc xe tên lửa đồ chơi chạy bằng bài hát hát rong của Bing Bong.",
        "properNouns": ["Imagination Land", "Riley"]
    },

    # --- CHAPTER 6: DREAM PRODUCTIONS & HOCKEY CRISIS (08:35 - 10:45) ---
    {
        "orderIndex": 37,
        "startTime": 540.0,
        "endTime": 548.0,
        "text": "Oh no, she loves hockey! She can't give up on hockey!",
        "translationVi": "Ôi không, con bé yêu khúc côn cầu cơ mà! Con bé không thể từ bỏ khúc côn cầu được!",
        "ipaUs": "/oʊ noʊ, ʃiː lʌvz ˈhɑːki! ʃiː kænt ɡɪv ʌp ɑːn ˈhɑːki!/",
        "keywords": ["loves hockey", "give up on hockey"],
        "explanationAi": "Cụm động từ 'give up on' (từ bỏ hy vọng, buông xuôi niềm đam mê). Đảo Khúc Côn Cầu bắt đầu lung lay.",
        "properNouns": []
    },
    {
        "orderIndex": 38,
        "startTime": 588.0,
        "endTime": 598.0,
        "text": "Just because Joy and Sadness are gone, I have to do stupid dream duty!",
        "translationVi": "Chỉ vì Vui Vẻ và Buồn Bã đi vắng mà tôi phải làm cái nhiệm vụ trực giấc mơ ngớ ngẩn này đây!",
        "ipaUs": "/dʒʌst bɪˈkəz dʒɔɪ ænd ˈsædnəs ɑːr ɡɔːn, aɪ hæv tuː duː ˈstuːpɪd driːm ˈduːti!/",
        "keywords": ["dream duty", "gone"],
        "explanationAi": "Disgust cằn nhằn khi phải theo dõi trường quay Giấc mơ (Dream Productions) vào ban đêm.",
        "properNouns": ["Joy", "Sadness"]
    },
    {
        "orderIndex": 39,
        "startTime": 598.0,
        "endTime": 608.0,
        "text": "Hello, class! Gross! My teeth are falling out! This isn't working!",
        "translationVi": "Xin chào cả lớp! Ghê quá! Răng của tôi đang rụng hết cả ra này! Kịch bản này không hiệu quả rồi!",
        "ipaUs": "/hɛˈloʊ, klæs! ɡroʊs! maɪ tiːθ ɑːr ˈfɔːlɪŋ aʊt! ðɪs ˈɪzənt ˈwɜːrkɪŋ!/",
        "keywords": ["teeth are falling out", "not working"],
        "explanationAi": "Ác mộng phổ biến trong tâm lý học: giấc mơ rụng răng phản ánh sự mất kiểm soát và cảm giác bất an cùng cực.",
        "properNouns": []
    },
    {
        "orderIndex": 40,
        "startTime": 615.0,
        "endTime": 625.0,
        "text": "They're trying to wake her up! Call security! Pan away, pan away!",
        "translationVi": "Họ đang cố đánh thức con bé dậy kìa! Gọi bảo vệ ngay! Chuyển góc máy đi, lia máy quay đi!",
        "ipaUs": "/ðeɪr ˈtraɪɪŋ tuː weɪk hɜːr ʌp! kɔːl sɪˈkjʊrəti! pæn əˈweɪ, pæn əˈweɪ!/",
        "keywords": ["wake her up", "call security", "pan away"],
        "explanationAi": "Thuật ngữ đạo diễn truyền hình: 'pan away' (lia máy quay sang hướng khác để giấu sự cố trên sóng).",
        "properNouns": []
    },

    # --- CHAPTER 7: MEMORY DUMP & EMOTIONAL REVELATION (10:45 - 13:13) ---
    {
        "orderIndex": 41,
        "startTime": 655.0,
        "endTime": 665.0,
        "text": "I just don't understand. Why does Riley keep feeling so sad?",
        "translationVi": "Tôi thực sự không hiểu nổi. Tại sao Riley lại cứ cảm thấy buồn bã đến thế chứ?",
        "ipaUs": "/aɪ dʒʌst doʊnt ˌʌndərˈstænd. waɪ dʌz ˈraɪli kiːp ˈfiːlɪŋ soʊ sæd?/",
        "keywords": ["don't understand", "feeling so sad"],
        "explanationAi": "Khoảnh khắc tuyệt vọng của Joy dưới đáy Vực Thẳm Lãng Quên (Memory Dump) khi nhìn các ký ức vàng phai màu.",
        "properNouns": ["Riley"]
    },
    {
        "orderIndex": 42,
        "startTime": 680.0,
        "endTime": 688.0,
        "text": "But that's our only way back! Riley needs to be happy!",
        "translationVi": "Nhưng đó là con đường duy nhất để chúng ta quay lại! Riley cần phải được hạnh phúc!",
        "ipaUs": "/bʌt ðæts ˈaʊər ˈoʊnli weɪ bæk! ˈraɪli niːdz tuː biː ˈhæpi!/",
        "keywords": ["only way back", "needs to be happy"],
        "explanationAi": "Định kiến bấy lâu của Joy dần sụp đổ trước thực tế cảm xúc phức tạp của con người.",
        "properNouns": ["Riley"]
    },
    {
        "orderIndex": 43,
        "startTime": 700.0,
        "endTime": 710.0,
        "text": "Hop in! Come on, Joy, sing the song louder! We're going to make it!",
        "translationVi": "Nhảy lên nào! Mau lên Joy, hát vang bài hát to hơn nữa đi! Chúng ta nhất định sẽ làm được!",
        "ipaUs": "/hɑːp ɪn! kʌm ɑːn, dʒɔɪ, sɪŋ ðə sɔːŋ ˈlaʊdər! wɪr ˈɡoʊɪŋ tuː meɪk ɪt!/",
        "keywords": ["hop in", "sing louder", "going to make it"],
        "explanationAi": "Bing Bong và Joy cùng hát vang bài ca tuổi thơ để kích hoạt tên lửa xe đẩy vượt khỏi vực thẳm.",
        "properNouns": ["Joy"]
    },
    {
        "orderIndex": 44,
        "startTime": 715.0,
        "endTime": 725.0,
        "text": "Take her to the moon for me, okay?",
        "translationVi": "Hãy thay tôi đưa con bé bay lên mặt trăng nhé, được không?",
        "ipaUs": "/teɪk hɜːr tuː ðə muːn fɔːr miː, oʊˈkeɪ?/",
        "keywords": ["take her to the moon"],
        "explanationAi": "Lời trăng trối đầy xúc động của Bing Bong khi quyết định hy sinh nhảy khỏi tên lửa để Joy có thể thoát lên cứu Riley.",
        "properNouns": []
    },
    {
        "orderIndex": 45,
        "startTime": 725.0,
        "endTime": 735.0,
        "text": "Joy realized it wasn't about keeping Riley happy all the time. Sadness was the reason Riley got help when she needed it most.",
        "translationVi": "Vui Vẻ nhận ra vấn đề không phải là giữ cho Riley luôn luôn vui vẻ. Buồn Bã chính là lý do giúp Riley nhận được sự giúp đỡ khi em cần nhất.",
        "ipaUs": "/dʒɔɪ ˈriːəˌlaɪzd ɪt ˈwɑːzənt əˈbaʊt ˈkiːpɪŋ ˈraɪli ˈhæpi ɔːl ðə taɪm. ˈsædnəs wʌz ðə ˈriːzən ˈraɪli ɡɑːt hɛlp wɛn ʃiː ˈniːdɪd ɪt moʊst./",
        "keywords": ["happy all the time", "got help", "needed it most"],
        "explanationAi": "Nhận thức triết học đỉnh cao của Inside Out: Nỗi buồn không phải là đối thủ của niềm vui, mà là tín hiệu kêu gọi sự đồng cảm và chở che từ cộng đồng.",
        "properNouns": ["Joy", "Sadness", "Riley"]
    },
    {
        "orderIndex": 46,
        "startTime": 735.0,
        "endTime": 745.0,
        "text": "Everything is awful, and my legs don't work. What have we done?",
        "translationVi": "Mọi thứ thật tồi tệ, và hai chân tôi chẳng buồn nhúc nhích nữa. Chúng ta đã làm cái quái gì thế này?",
        "ipaUs": "/ˈɛvriˌθɪŋ ɪz ˈɔːfəl, ænd maɪ lɛɡz doʊnt wɜːrk. wʌt hæv wiː dʌn?/",
        "keywords": ["everything is awful", "legs don't work", "what have we done"],
        "explanationAi": "Bảng điều khiển cảm xúc của Riley bị đóng băng đen kịt khi Anger, Disgust và Fear khiến em trốn nhà lên xe buýt.",
        "properNouns": []
    },
    {
        "orderIndex": 47,
        "startTime": 745.0,
        "endTime": 755.0,
        "text": "Sadness, it's up to you. Riley needs you right now.",
        "translationVi": "Buồn Bã ơi, tất cả trông cậy vào cô đấy. Lúc này Riley đang cần cô hơn bao giờ hết.",
        "ipaUs": "/ˈsædnəs, ɪts ʌp tuː juː. ˈraɪli niːdz juː raɪt naʊ./",
        "keywords": ["up to you", "needs you right now"],
        "explanationAi": "Joy chính thức trao lại bàn điều khiển cho Sadness: bước chuyển hóa tâm lý vĩ đại nhất của bộ phim.",
        "properNouns": ["Sadness", "Riley"]
    },
    {
        "orderIndex": 48,
        "startTime": 755.0,
        "endTime": 765.0,
        "text": "I know you don't want me to, but I miss Minnesota. I miss the woods and the pond.",
        "translationVi": "Con biết bố mẹ không muốn con như vậy, nhưng con nhớ Minnesota lắm. Con nhớ những cánh rừng và hồ nước đóng băng quê mình.",
        "ipaUs": "/aɪ noʊ juː doʊnt wɑːnt miː tuː, bʌt aɪ mɪs ˌmɪnəˈsoʊtə. aɪ mɪs ðə wʊdz ænd ðə pɑːnd./",
        "keywords": ["miss Minnesota", "miss the woods and the pond"],
        "explanationAi": "Riley òa khóc trải lòng chân thật với bố mẹ, tháo gỡ hoàn toàn lớp mặt nạ gượng cười kìm nén bấy lâu.",
        "properNouns": ["Minnesota"]
    },
    {
        "orderIndex": 49,
        "startTime": 765.0,
        "endTime": 793.0,
        "text": "They embraced her warmly, and for the first time, a beautiful new core memory was born: blended with both gold joy and blue sadness.",
        "translationVi": "Họ ôm chầm lấy em trong hơi ấm gia đình, và lần đầu tiên, một ký ức cốt lõi mới tuyệt đẹp được sinh ra: hòa quyện giữa sắc vàng hân hoan và sắc xanh lắng đọng của nỗi buồn.",
        "ipaUs": "/ðeɪ ɛmˈbreɪst hɜːr ˈwɔːrmli, ænd fɔːr ðə fɜːrst taɪm, ə ˈbjuːtəfəl njuː kɔːr ˈmɛməri wʌz bɔːrn: ˈblɛndɪd wɪð boʊθ ɡoʊld dʒɔɪ ænd bluː ˈsædnəs./",
        "keywords": ["embraced warmly", "new core memory", "blended", "gold joy and blue sadness"],
        "explanationAi": "Đoạn kết thăng hoa của trí tuệ cảm xúc: Ký ức của người trưởng thành không còn đơn sắc mà là sự hòa trộn hài hòa giữa vui và buồn, mở ra giai đoạn trưởng thành mới cho Riley.",
        "properNouns": []
    }
]

for s in raw_segments:
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", s["text"])
    s["tokenCount"] = len(tokens)

print(f"Total compiled Pure Master Segments for Inside Out: {len(raw_segments)}")
with open("scripts/inside_out_pure_segments.json", "w", encoding="utf-8") as f:
    json.dump(raw_segments, f, ensure_ascii=False, indent=2)
print("Saved to scripts/inside_out_pure_segments.json")
