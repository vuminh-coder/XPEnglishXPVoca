import json
import re

# Master segment definitions for Flipped: Bryce and Juli's Sycamore Tree & Growing Hearts (mov_rom_12)
# YouTube ID: KTUvOpY89RE (335s / 05:35)

raw_segments = [
    # Act 1: Grade Two Moving Day & Hand Holding (00:00 - 00:52)
    {
        "start": 0.0, "end": 4.3,
        "speaker": "Bryce",
        "text": "All I ever wanted was for Juli Baker to leave me alone.",
        "translationVi": "Tất cả những gì tôi từng ao ước chỉ là Juli Baker hãy để tôi được yên.",
        "ipaUs": "/ɔːl aɪ ˈɛvər ˈwɑːntɪd wʌz fɔːr ˈdʒuːli ˈbeɪkər tuː liːv miː əˈloʊn./",
        "keywords": ["leave me alone", "childhood perspective"],
        "explanationAi": "Mở đầu phim bằng lời tự sự hóm hỉnh của Bryce Loski hồi lớp hai khi gia đình vừa chuyển tới khu phố mới.",
        "properNouns": ["Juli Baker"]
    },
    {
        "start": 4.3, "end": 7.3,
        "speaker": "Juli",
        "text": "Hi, I'm Juli Baker.",
        "translationVi": "Chào cậu, tớ là Juli Baker.",
        "ipaUs": "/haɪ, aɪm ˈdʒuːli ˈbeɪkər./",
        "keywords": ["introduction"],
        "explanationAi": "Juli nhiệt tình và bạo dạn chạy sang chào đón cậu bạn hàng xóm mới chuyển đến.",
        "properNouns": ["Juli Baker"]
    },
    {
        "start": 7.3, "end": 8.8,
        "speaker": "Bryce's Dad",
        "text": "Hey, what are you doing?",
        "translationVi": "Này cháu, cháu đang làm gì đấy?",
        "ipaUs": "/heɪ, wʌt ɑːr juː ˈduːɪŋ?/",
        "keywords": ["what are you doing"],
        "explanationAi": "Bố của Bryce tỏ vẻ khó chịu khi cô bé hàng xóm tự nhiên trèo lên xe tải chở đồ của gia đình.",
        "properNouns": []
    },
    {
        "start": 8.8, "end": 10.3,
        "speaker": "Juli",
        "text": "You want some help?",
        "translationVi": "Mọi người có cần cháu giúp một tay không ạ?",
        "ipaUs": "/juː wɑːnt sʌm hɛlp?/",
        "keywords": ["want some help"],
        "explanationAi": "Sự sốt sắng, hồn nhiên và lòng tốt không hề e ngại của cô bé Juli.",
        "properNouns": []
    },
    {
        "start": 10.3, "end": 11.5,
        "speaker": "Bryce",
        "text": "No.",
        "translationVi": "Không.",
        "ipaUs": "/noʊ./",
        "keywords": ["no"],
        "explanationAi": "Câu trả lời cộc lốc của Bryce trước sự tiếp cận quá dồn dập.",
        "properNouns": []
    },
    {
        "start": 11.5, "end": 14.5,
        "speaker": "Bryce",
        "text": "This girl could not take a hint.",
        "translationVi": "Cô nàng này chẳng hề biết ý tứ một chút nào cả.",
        "ipaUs": "/ðɪs ɡɜːrl kʊd nɑːt teɪk ə hɪnt./",
        "keywords": ["take a hint", "idiom"],
        "explanationAi": "Thành ngữ 'take a hint' nghĩa là hiểu được ý tứ hoặc gợi ý ngầm của người khác.",
        "properNouns": []
    },
    {
        "start": 14.5, "end": 18.0,
        "speaker": "Bryce's Dad",
        "text": "It's awfully crowded in here with three people.",
        "translationVi": "Trong thùng xe này có ba người thì chật chội khủng khiếp đấy cháu.",
        "ipaUs": "/ɪts ˈɔːfli ˈkraʊdɪd ɪn hɪər wɪð θriː ˈpiːpl./",
        "keywords": ["awfully crowded"],
        "explanationAi": "Người bố khéo léo đuổi khéo Juli ra khỏi thùng xe tải dọn nhà.",
        "properNouns": []
    },
    {
        "start": 18.0, "end": 19.5,
        "speaker": "Juli",
        "text": "I don't mind.",
        "translationVi": "Cháu chẳng thấy phiền đâu ạ.",
        "ipaUs": "/aɪ doʊnt maɪnd./",
        "keywords": ["don't mind"],
        "explanationAi": "Juli vô tư đáp lại khiến hai bố con Bryce bối rối.",
        "properNouns": []
    },
    {
        "start": 19.5, "end": 21.0,
        "speaker": "Bryce",
        "text": "Of any kind.",
        "translationVi": "Cô ta chẳng hề để tâm đến bất kỳ gợi ý nào.",
        "ipaUs": "/əv ˈɛni kaɪnd./",
        "keywords": ["of any kind"],
        "explanationAi": "Bryce nhấn mạnh sự 'miễn nhiễm' của Juli trước mọi nỗ lực xua đuổi.",
        "properNouns": []
    },
    {
        "start": 21.0, "end": 24.0,
        "speaker": "Juli",
        "text": "You want to push this one together?",
        "translationVi": "Cậu có muốn hai đứa mình cùng nhau đẩy cái hộp này không?",
        "ipaUs": "/juː wɑːnt tuː pʊʃ ðɪs wʌn təˈɡɛðər?/",
        "keywords": ["push together"],
        "explanationAi": "Juli chủ động tìm mọi cơ hội để được gần gũi và tiếp xúc với Bryce.",
        "properNouns": []
    },
    {
        "start": 24.0, "end": 27.0,
        "speaker": "Bryce's Dad",
        "text": "Bryce, isn't it time for you to go help your mother?",
        "translationVi": "Bryce, không phải đã đến lúc con vào nhà giúp mẹ con rồi sao?",
        "ipaUs": "/braɪs, ˈɪznt ɪt taɪm fɔːr juː tuː ɡoʊ hɛlp jʊər ˈmʌðər?/",
        "keywords": ["isn't it time"],
        "explanationAi": "Người bố tạo cớ để giải cứu con trai khỏi cô bé phiền toái.",
        "properNouns": ["Bryce"]
    },
    {
        "start": 27.0, "end": 30.5,
        "speaker": "Bryce",
        "text": "Huh? Oh, yeah! I mean, nothing would stop her.",
        "translationVi": "Hả? Dạ vâng! Ý tôi là, chẳng có điều gì ngăn nổi cô ấy cả.",
        "ipaUs": "/hʌ? oʊ, jæ! aɪ miːn, ˈnʌθɪŋ wʊd stɑːp hɜːr./",
        "keywords": ["nothing would stop her"],
        "explanationAi": "Bryce mừng như bắt được vàng khi có lý do tẩu thoát.",
        "properNouns": []
    },
    {
        "start": 30.5, "end": 33.1,
        "speaker": "Bryce",
        "text": "I was about to tell her to get lost when the weirdest thing happened.",
        "translationVi": "Tôi đang định bảo cô ấy biến đi cho khuất mắt thì điều kỳ lạ nhất đời đã xảy ra.",
        "ipaUs": "/aɪ wʌz əˈbaʊt tuː tɛl hɜːr tuː ɡɛt lɔːst wɛn ðə ˈwɪərdɪst θɪŋ ˈhæpənd./",
        "keywords": ["get lost", "weirdest thing"],
        "explanationAi": "Cụm 'get lost' mang nghĩa bảo ai đó cút đi, tránh xa ra.",
        "properNouns": []
    },
    {
        "start": 33.1, "end": 40.8,
        "speaker": "Bryce",
        "text": "I couldn't believe it. There I was holding hands with this strange girl.",
        "translationVi": "Tôi không thể tin nổi. Tôi đang đứng đó và nắm tay cô gái xa lạ này.",
        "ipaUs": "/aɪ ˈkʊdnt bɪˈliːv ɪt. ðɛər aɪ wʌz ˈhoʊldɪŋ hændz wɪð ðɪs streɪndʒ ɡɜːrl./",
        "keywords": ["holding hands", "strange girl"],
        "explanationAi": "Khoảnh khắc trớ trêu định mệnh: cái nắm tay đầu tiên giữa Bryce và Juli thời thơ ấu.",
        "properNouns": []
    },
    {
        "start": 40.8, "end": 45.9,
        "speaker": "Bryce",
        "text": "How did I get into this mess?",
        "translationVi": "Làm sao mà tôi lại vướng vào cái rắc rối kinh khủng này cơ chứ?",
        "ipaUs": "/haʊ dɪd aɪ ɡɛt ˈɪntuː ðɪs mɛs?/",
        "keywords": ["get into this mess"],
        "explanationAi": "Cụm 'get into a mess' diễn tả việc rơi vào tình huống hỗn loạn ngoài tầm kiểm soát.",
        "properNouns": []
    },
    {
        "start": 45.9, "end": 49.6,
        "speaker": "Teacher",
        "text": "Well, hello! You're in here!",
        "translationVi": "A, chào em! Em học ở lớp này này!",
        "ipaUs": "/wɛl, hɛˈloʊ! jʊər ɪn hɪər!/",
        "keywords": ["classroom", "first day"],
        "explanationAi": "Cô giáo đón Bryce vào lớp học ngày đầu tiên ở trường mới.",
        "properNouns": []
    },
    {
        "start": 49.6, "end": 55.1,
        "speaker": "Bryce",
        "text": "It was clear. School would not be a sanctuary.",
        "translationVi": "Mọi chuyện đã quá rõ ràng. Trường học sẽ chẳng thể nào là nơi trú ẩn an toàn của tôi.",
        "ipaUs": "/ɪt wʌz klɪər. skuːl wʊd nɑːt biː ə ˈsæŋktʃuˌɛri./",
        "keywords": ["sanctuary", "metaphor"],
        "explanationAi": "Từ 'sanctuary' mang nghĩa nơi chốn tôn nghiêm, chốn nương náu an toàn.",
        "properNouns": []
    },

    # Act 2: Shelly Stalls Fake-Dating Ruse & Watermelon Scent (00:55 - 01:42)
    {
        "start": 55.1, "end": 58.3,
        "speaker": "Bryce",
        "text": "I asked out Shelly Stalls. I was wondering if you wanted to go see a movie.",
        "translationVi": "Tôi rủ Shelly Stalls đi chơi. Tôi hỏi liệu cậu có muốn cùng đi xem phim không.",
        "ipaUs": "/aɪ æskt aʊt ˈʃɛli stɔːlz. aɪ wʌz ˈwʌndərɪŋ ɪf juː ˈwɑːntɪd tuː ɡoʊ siː ə ˈmuːvi./",
        "keywords": ["asked out", "Shelly Stalls"],
        "explanationAi": "Bryce dựng lên kế hoạch hẹn hò giả với cô nữ sinh kiêu kỳ Shelly Stalls để khiến Juli nản lòng bỏ cuộc.",
        "properNouns": ["Shelly Stalls"]
    },
    {
        "start": 58.3, "end": 64.2,
        "speaker": "Bryce",
        "text": "To fully appreciate the brilliance of this plan, you have to understand that Juli had always hated Shelly Stalls.",
        "translationVi": "Để thấu hiểu hết sự thiên tài của kế hoạch này, bạn phải hiểu rằng Juli xưa nay luôn ghét cay ghét đắng Shelly Stalls.",
        "ipaUs": "/tuː ˈfʊli əˈpriːʃiˌeɪt ðə ˈbrɪljəns əv ðɪs plæn, juː hæv tuː ˌʌndərˈstænd ðæt ˈdʒuːli hæd ˈɔːlweɪz ˈheɪtɪd ˈʃɛli stɔːlz./",
        "keywords": ["brilliance of this plan", "hated"],
        "explanationAi": "Kế hoạch lợi dụng đối thủ không đội trời chung để đẩy lùi sự chú ý của Juli.",
        "properNouns": ["Juli", "Shelly Stalls"]
    },
    {
        "start": 64.2, "end": 68.2,
        "speaker": "Shelly",
        "text": "Elbow? Yeah. And she got grounded.",
        "translationVi": "Cùi chỏ á? Ừ. Và cô ta bị cấm túc rồi.",
        "ipaUs": "/ˈɛlboʊ? jæ. ænd ʃiː ɡɑːt ˈɡraʊndɪd./",
        "keywords": ["grounded", "punishment"],
        "explanationAi": "'Get grounded' mang nghĩa bị bố mẹ phạt cấm ra khỏi nhà.",
        "properNouns": []
    },
    {
        "start": 68.2, "end": 72.8,
        "speaker": "Shelly",
        "text": "Now she can't come to my pajamas sleepover party. Things were unfolding quite nicely.",
        "translationVi": "Giờ thì cô ta khỏi tới tiệc ngủ đồ ngủ của tớ nhé. Mọi chuyện diễn ra thật êm đẹp.",
        "ipaUs": "/naʊ ʃiː kænt kʌm tuː maɪ pəˈdʒɑːməz ˈsliːpˌoʊvər ˈpɑːrti. θɪŋz wɜːr ʌnˈfoʊldɪŋ kwaɪt ˈnaɪsli./",
        "keywords": ["sleepover party", "unfolding nicely"],
        "explanationAi": "Shelly đắc thắng khoe khoang về sự vắng mặt của Juli tại bữa tiệc ngủ.",
        "properNouns": []
    },
    {
        "start": 72.8, "end": 77.0,
        "speaker": "Bryce",
        "text": "It took all of a week. They broke up at recess.",
        "translationVi": "Mối tình kéo dài vỏn vẹn một tuần. Họ chia tay nhau ngay trong giờ ra chơi.",
        "ipaUs": "/ɪt tʊk ɔːl əv ə wiːk. ðeɪ broʊk ʌp æt ˈriːsɛs./",
        "keywords": ["broke up at recess"],
        "explanationAi": "Hậu quả gậy ông đập lưng ông: mối tình giả vờ nhanh chóng tan vỡ tan tành.",
        "properNouns": []
    },
    {
        "start": 77.0, "end": 81.6,
        "speaker": "Bryce",
        "text": "She didn't take it well.",
        "translationVi": "Cô ta không chịu chấp nhận chuyện chia tay một cách êm thấm đâu.",
        "ipaUs": "/ʃiː ˈdɪdnt teɪk ɪt wɛl./",
        "keywords": ["didn't take it well"],
        "explanationAi": "Shelly nổi giận lôi đình và tấn công Bryce vì tội dám đá cô ta.",
        "properNouns": []
    },
    {
        "start": 81.6, "end": 85.6,
        "speaker": "Juli",
        "text": "Now that Bryce was out of Shelly's evil clutches, he started being nicer to me.",
        "translationVi": "Giờ đây khi Bryce đã thoát khỏi nanh vuốt hiểm ác của Shelly, cậu ấy bắt đầu đối xử tốt hơn với tôi.",
        "ipaUs": "/naʊ ðæt braɪs wʌz aʊt əv ˈʃɛliz ˈiːvl ˈklʌtʃɪz, hiː ˈstɑːrtɪd ˈbiːɪŋ ˈnaɪsər tuː miː./",
        "keywords": ["evil clutches", "nicer to me"],
        "explanationAi": "Góc nhìn ngây thơ đầy tính lãng mạn của Juli khi tưởng rằng Bryce chia tay Shelly vì có tình cảm với cô.",
        "properNouns": ["Bryce", "Shelly"]
    },
    {
        "start": 85.6, "end": 87.6,
        "speaker": "Bryce",
        "text": "Hi, Juli.",
        "translationVi": "Chào Juli.",
        "ipaUs": "/haɪ, ˈdʒuːli./",
        "keywords": ["greeting"],
        "explanationAi": "Bryce ngượng ngùng chào hỏi để tránh bị làm phiền.",
        "properNouns": ["Juli"]
    },
    {
        "start": 87.6, "end": 91.0,
        "speaker": "Juli",
        "text": "Hi, Bryce. He was so shy and so cute.",
        "translationVi": "Chào Bryce. Cậu ấy trông mới bẽn lẽn và đáng yêu làm sao.",
        "ipaUs": "/haɪ, braɪs. hiː wʌz soʊ ʃaɪ ænd soʊ kjuːt./",
        "keywords": ["shy and cute"],
        "explanationAi": "Trái tim Juli rung động trước vẻ đẹp trai và đôi mắt sáng của cậu bé.",
        "properNouns": ["Bryce"]
    },
    {
        "start": 91.0, "end": 95.7,
        "speaker": "Juli",
        "text": "And his hair, it smelled like watermelon. I couldn't get enough of it.",
        "translationVi": "Và mái tóc của cậu ấy, nó thơm ngát mùi dưa hấu. Tôi chẳng thể nào dứt ra được.",
        "ipaUs": "/ænd hɪz hɛər, ɪt smɛld laɪk ˈwɔːtərˌmɛlən. aɪ ˈkʊdnt ɡɛt ɪˈnʌf əv ɪt./",
        "keywords": ["watermelon", "couldn't get enough"],
        "explanationAi": "Chi tiết mùi tóc dưa hấu trứ danh thể hiện tình cảm trong sáng hồn nhiên của tuổi học trò.",
        "properNouns": []
    },
    {
        "start": 95.7, "end": 102.1,
        "speaker": "Juli",
        "text": "I spent the whole year secretly sniffing watermelon, wondering if I was ever going to get my kiss.",
        "translationVi": "Tôi đã dành cả năm trời lén hít hà hương dưa hấu ấy, tự hỏi liệu mình có bao giờ nhận được một nụ hôn từ cậu ấy không.",
        "ipaUs": "/aɪ spɛnt ðə hoʊl jɪər ˈsiːkrɪtli ˈsnɪfɪŋ ˈwɔːtərˌmɛlən, ˈwʌndərɪŋ ɪf aɪ wʌz ˈɛvər ˈɡoʊɪŋ tuː ɡɛt maɪ kɪs./",
        "keywords": ["secretly sniffing", "get my kiss"],
        "explanationAi": "Ước mơ đầu đời ngây thơ của cô bé Juli về nụ hôn đầu với chàng trai mình thầm thương.",
        "properNouns": []
    },

    # Act 3: The Ancient Sycamore Tree & Visually Challenged (01:42 - 02:40)
    {
        "start": 102.1, "end": 106.1,
        "speaker": "Juli",
        "text": "I think the tree looks particularly beautiful today, don't you?",
        "translationVi": "Tớ thấy hôm nay cái cây này trông đặc biệt đẹp đẽ, cậu có thấy thế không?",
        "ipaUs": "/aɪ θɪŋk ðə triː lʊks pɑːrˈtɪkjələrli ˈbjuːtɪfl təˈdeɪ, doʊnt juː?/",
        "keywords": ["particularly beautiful", "sycamore tree"],
        "explanationAi": "Juli đứng trên cành cao của cây ngô đồng cổ thụ nhìn ngắm bình minh và gọi với xuống cho Bryce.",
        "properNouns": []
    },
    {
        "start": 106.1, "end": 109.1,
        "speaker": "Bryce",
        "text": "Well, if by beautiful you mean unbelievably ugly, then yes, I would agree.",
        "translationVi": "Chà, nếu ý cậu 'đẹp' nghĩa là xấu xí không tưởng thì được rồi, tớ xin đồng ý.",
        "ipaUs": "/wɛl, ɪf baɪ ˈbjuːtɪfl juː miːn ˌʌnbɪˈliːvəbli ˈʌɡli, ðɛn jɛs, aɪ wʊd əˈɡriː./",
        "keywords": ["unbelievably ugly", "sarcasm"],
        "explanationAi": "Câu châm chọc mỉa mai của Bryce, cậu chưa thể cảm nhận được vẻ đẹp của thiên nhiên như Juli.",
        "properNouns": []
    },
    {
        "start": 109.1, "end": 117.5,
        "speaker": "Juli",
        "text": "You're just visually challenged. I feel sorry for you.",
        "translationVi": "Cậu đúng là bị khiếm khuyết về mặt thị giác rồi. Tớ thấy tội nghiệp cho cậu ghê.",
        "ipaUs": "/jʊər dʒʌst ˈvɪʒuəli ˈtʃælɪndʒd. aɪ fiːl ˈsɑːri fɔːr juː./",
        "keywords": ["visually challenged", "wit"],
        "explanationAi": "Cụm 'visually challenged' được Juli dùng một cách hóm hỉnh để chê trách sự mù quáng trước cái đẹp của Bryce.",
        "properNouns": []
    },
    {
        "start": 117.5, "end": 125.4,
        "speaker": "Bryce",
        "text": "Visually challenged? Visually challenged? This from the girl who lived in a house that was the joke of the neighborhood!",
        "translationVi": "Khiếm khuyết thị giác á? Khiếm khuyết thị giác sao? Câu đó lại phát ra từ một đứa con gái sống trong ngôi nhà là trò cười của cả khu phố này ư!",
        "ipaUs": "/ˈvɪʒuəli ˈtʃælɪndʒd? ˈvɪʒuəli ˈtʃælɪndʒd? ðɪs frʌm ðə ɡɜːrl huː lɪvd ɪn ə haʊs ðæt wʌz ðə dʒoʊk əv ðə ˈneɪbərˌhʊd!/",
        "keywords": ["joke of the neighborhood", "defensive"],
        "explanationAi": "Bryce phản ứng tự ái và công kích sân vườn bề bộn của gia đình Baker.",
        "properNouns": []
    },
    {
        "start": 125.4, "end": 128.4,
        "speaker": "Juli",
        "text": "Hey, guys! Right on schedule!",
        "translationVi": "Này các cậu! Đúng giờ lắm nhé!",
        "ipaUs": "/heɪ, ɡaɪz! raɪt ɑːn ˈskɛdʒuːl!/",
        "keywords": ["right on schedule"],
        "explanationAi": "Juli đứng trên cành ngô đồng quan sát và báo hiệu xe buýt trường học đang tới gần.",
        "properNouns": []
    },
    {
        "start": 128.4, "end": 135.6,
        "speaker": "Juli",
        "text": "Yeah, neither rain nor sleet... You know, the mailman thing?",
        "translationVi": "Dù mưa dầm hay tuyết rơi... Các cậu biết khẩu hiệu của người đưa thư đấy chứ?",
        "ipaUs": "/jæ, ˈnaɪðər reɪn nɔːr sliːt... juː noʊ, ðə ˈmeɪlmæn θɪŋ?/",
        "keywords": ["neither rain nor sleet"],
        "explanationAi": "Câu châm ngôn truyền thống của ngành bưu chính Hoa Kỳ về sự tận tụy bất chấp thời tiết khắc nghiệt.",
        "properNouns": []
    },
    {
        "start": 140.1, "end": 145.6,
        "speaker": "Juli",
        "text": "Maybe Bryce was right. Maybe it was time I started riding the bus again.",
        "translationVi": "Có lẽ Bryce đã đúng. Có lẽ đã đến lúc tôi nên bắt đầu đi xe buýt trở lại.",
        "ipaUs": "/ˈmeɪbiː braɪs wʌz raɪt. ˈmeɪbiː ɪt wʌz taɪm aɪ ˈstɑːrtɪd ˈraɪdɪŋ ðə bʌs əˈɡɛn./",
        "keywords": ["riding the bus again"],
        "explanationAi": "Juli suy ngẫm sau khi cây ngô đồng bị chặt hạ, cô cảm thấy trống vắng và suy nghĩ về lời Bryce.",
        "properNouns": ["Bryce"]
    },
    {
        "start": 145.6, "end": 153.5,
        "speaker": "Juli",
        "text": "After all, didn't he just tell me he wanted me to? Could it be that Bryce Loski actually misses me?",
        "translationVi": "Dù sao thì, chẳng phải cậu ấy vừa bảo muốn tôi đi cùng sao? Liệu có khi nào Bryce Loski thực sự đang nhớ tôi không nhỉ?",
        "ipaUs": "/ˈæftər ɔːl, ˈdɪdnt hiː dʒʌst tɛl miː hiː ˈwɑːntɪd miː tuː? kʊd ɪt biː ðæt braɪs ˈlɑːski ˈæktʃuəli ˈmɪsɪz miː?/",
        "keywords": ["actually misses me"],
        "explanationAi": "Tia hy vọng nhỏ nhoi len lỏi trong trái tim Juli.",
        "properNouns": ["Bryce Loski"]
    },

    # Act 4: Bryce Falls for Juli & The Library Confrontation (02:40 - 03:54)
    {
        "start": 161.7, "end": 169.5,
        "speaker": "Bryce",
        "text": "Staring at her in class. The way her hair fell back over her shoulders... she looked just like the picture in the newspaper.",
        "translationVi": "Tôi cứ ngắm nhìn cô ấy trong lớp học. Cái cách mái tóc cô ấy buông lơi qua bờ vai... cô ấy trông y hệt như bức hình chụp trên mặt báo.",
        "ipaUs": "/ˈstɛərɪŋ æt hɜːr ɪn klæs. ðə weɪ hɜːr hɛər fɛl bæk ˈoʊvər hɜːr ˈʃoʊldərz... ʃiː lʊkt dʒʌst laɪk ðə ˈpɪktʃər ɪn ðə ˈnuːzˌpeɪpər./",
        "keywords": ["staring at her", "picture in the newspaper"],
        "explanationAi": "Khoảnh khắc Bryce bị 'đảo chiều' cảm xúc (Flipped): bắt đầu nhận ra vẻ đẹp rạng rỡ của người con gái mình từng xa lánh.",
        "properNouns": []
    },
    {
        "start": 169.5, "end": 172.5,
        "speaker": "Garrett",
        "text": "Are you freaking mental? Juli Baker? You hate her!",
        "translationVi": "Cậu bị điên nặng rồi hả? Juli Baker á? Cậu ghét cay ghét đắng nó cơ mà!",
        "ipaUs": "/ɑːr juː ˈfriːkɪŋ ˈmɛntl? ˈdʒuːli ˈbeɪkər? juː heɪt hɜːr!/",
        "keywords": ["freaking mental", "hate her"],
        "explanationAi": "Garrett, cậu bạn thân thực dụng của Bryce, bàng hoàng khi thấy bạn mình si mê Juli.",
        "properNouns": ["Garrett", "Juli Baker"]
    },
    {
        "start": 172.5, "end": 175.3,
        "speaker": "Bryce",
        "text": "Well, that's what's so weird, I don't think I do. I can't stop thinking about her.",
        "translationVi": "Thế mới là điều kỳ lạ chứ, tớ nghĩ tớ không ghét cô ấy nữa rồi. Tớ không thể ngừng nghĩ về cô ấy được.",
        "ipaUs": "/wɛl, ðæts wʌts soʊ wɪərd, aɪ doʊnt θɪŋk aɪ duː. aɪ kænt stɑːp ˈθɪŋkɪŋ əˈbaʊt hɜːr./",
        "keywords": ["can't stop thinking about her"],
        "explanationAi": "Lời thú nhận đầu tiên của Bryce về tình cảm chân thật đang lớn dần trong lòng.",
        "properNouns": []
    },
    {
        "start": 175.3, "end": 180.0,
        "speaker": "Garrett",
        "text": "You got it bad, man. What do I do? Well, you got to nip this in the bud. Think about it. These aren't real emotions.",
        "translationVi": "Cậu dính chưởng nặng rồi bạn ơi. Tớ phải làm sao đây? Cậu phải dập tắt nó ngay từ trong trứng nước đi. Nghĩ kỹ xem, đây chẳng phải cảm xúc thật đâu.",
        "ipaUs": "/juː ɡɑːt ɪt bæd, mæn. wʌt duː aɪ duː? wɛl, juː ɡɑːt tuː nɪp ðɪs ɪn ðə bʌd. θɪŋk əˈbaʊt ɪt. ðiːz ɑːrnt ˈrɪəl ɪˈmoʊʃənz./",
        "keywords": ["nip in the bud", "idiom"],
        "explanationAi": "Thành ngữ 'nip something in the bud' mang nghĩa ngăn chặn, dập tắt một vấn đề ngay từ khi mới bắt đầu nhen nhóm.",
        "properNouns": []
    },
    {
        "start": 180.0, "end": 184.0,
        "speaker": "Garrett",
        "text": "No, you just feel guilty because of the whole egg thing.",
        "translationVi": "Không, cậu chỉ đang cảm thấy tội lỗi vì cái vụ vứt trứng gà dạo trước thôi.",
        "ipaUs": "/noʊ, juː dʒʌst fiːl ˈɡɪlti bɪˈkəz əv ðə hoʊl ɛɡ θɪŋ./",
        "keywords": ["feel guilty", "egg incident"],
        "explanationAi": "Nhắc lại vụ Bryce lén vứt trứng gà sạch mà Juli tặng vì sợ bẩn, làm tổn thương lòng tự trọng của cô bé.",
        "properNouns": []
    },
    {
        "start": 184.0, "end": 187.7,
        "speaker": "Bryce",
        "text": "Yeah, and I insulted her yard. Exactly. Of course, the place is a dump anyways.",
        "translationVi": "Ừ, và tớ còn xúc phạm sân vườn nhà cô ấy nữa. Chuẩn rồi. Dĩ nhiên là cái chỗ đó trông như bãi rác thật.",
        "ipaUs": "/jæ, ænd aɪ ɪnˈsʌltɪd hɜːr jɑːrd. ɪɡˈzæktli. əv kɔːrs, ðə pleɪs ɪz ə dʌmp ˈɛniˌweɪz./",
        "keywords": ["insulted her yard", "dump"],
        "explanationAi": "Từ lóng 'a dump' chỉ một nơi nhếch nhác, tồi tàn.",
        "properNouns": []
    },
    {
        "start": 187.7, "end": 192.5,
        "speaker": "Bryce",
        "text": "Yeah, but it's not her fault. Her dad's got a retarded brother and all their money goes to helping him.",
        "translationVi": "Ừ, nhưng đó đâu phải lỗi của cô ấy. Bố cô ấy có một người em trai bị thiểu năng và toàn bộ tiền bạc đều dành để chăm sóc chú ấy.",
        "ipaUs": "/jæ, bʌt ɪts nɑːt hɜːr fɔːlt. hɜːr dædz ɡɑːt ə rɪˈtɑːrdɪd ˈbrʌðər ænd ɔːl ðɛər ˈmʌni ɡoʊz tuː ˈhɛlpɪŋ hɪm./",
        "keywords": ["not her fault", "helping him"],
        "explanationAi": "Bryce bắt đầu thấu hiểu hoàn cảnh khó khăn và sự hy sinh cao cả của gia đình Juli.",
        "properNouns": []
    },
    {
        "start": 192.5, "end": 201.7,
        "speaker": "Garrett",
        "text": "A retard? Well, shoot, that ought to tell you something. The apple doesn't fall far from the tree, my friend.",
        "translationVi": "Thiểu năng á? Chà, thế thì đủ để cậu hiểu rồi đấy. Rau nào sâu nấy, quả táo rụng chẳng bao giờ xa gốc cây đâu bạn tôi ơi.",
        "ipaUs": "/ə rɪˈtɑːrd? wɛl, ʃuːt, ðæt ɔːt tuː tɛl juː ˈsʌmθɪŋ. ðə ˈæpl ˈdʌznt fɔːl fɑːr frʌm ðə triː, maɪ frɛnd./",
        "keywords": ["apple doesn't fall far from tree", "proverb"],
        "explanationAi": "Câu tục ngữ 'the apple doesn't fall far from the tree' bị Garrett dùng một cách miệt thị và cay độc để xúc phạm phẩm giá gia đình Juli.",
        "properNouns": []
    },
    {
        "start": 201.7, "end": 210.9,
        "speaker": "Bryce",
        "text": "I couldn't believe it. I wanted to yell at him, tell him that he didn't know Juli like I did.",
        "translationVi": "Tôi không thể tin nổi vào tai mình. Tôi muốn hét vào mặt cậu ta, bảo cậu ta rằng cậu ta chẳng hiểu gì về Juli như tôi hiểu cả.",
        "ipaUs": "/aɪ ˈkʊdnt bɪˈliːv ɪt. aɪ ˈwɑːntɪd tuː jɛl æt hɪm, tɛl hɪm ðæt hiː ˈdɪdnt noʊ ˈdʒuːli laɪk aɪ dɪd./",
        "keywords": ["wanted to yell", "didn't know Juli"],
        "explanationAi": "Sự giằng xé nội tâm mãnh liệt của Bryce: muốn bảo vệ người mình yêu nhưng lại sợ hãi áp lực dư luận bạn bè.",
        "properNouns": ["Juli"]
    },
    {
        "start": 210.9, "end": 223.3,
        "speaker": "Bryce",
        "text": "All that came out was... 'Yeah, right. Um, I'll talk to you later.' I didn't care what they thought. I liked Juli Baker.",
        "translationVi": "Tất cả những gì thốt ra chỉ là... 'Ừ, phải rồi. Tớ sẽ nói chuyện với cậu sau nhé.' Tôi chẳng thèm quan tâm họ nghĩ gì nữa. Tôi đã thích Juli Baker mất rồi.",
        "ipaUs": "/ɔːl ðæt keɪm aʊt wʌz... jæ, raɪt. ʌm, aɪl tɔːk tuː juː ˈleɪtər. aɪ ˈdɪdnt kɛər wʌt ðeɪ θɔːt. aɪ laɪkt ˈdʒuːli ˈbeɪkər./",
        "keywords": ["I liked Juli Baker", "realization"],
        "explanationAi": "Cột mốc trưởng thành vượt bậc: Bryce gạt bỏ định kiến để thừa nhận tình yêu thuần khiết dành cho Juli.",
        "properNouns": ["Juli Baker"]
    },

    # Act 5: The Basket Boys Auction & Cafeteria Climax (03:54 - 05:05)
    {
        "start": 234.3, "end": 243.7,
        "speaker": "Auctioneer",
        "text": "A dollar. Anybody? Anybody at all? No bidders?",
        "translationVi": "Một đô-la. Có ai không ạ? Có ai muốn trả giá không? Không có ai đặt giá sao?",
        "ipaUs": "/ə ˈdɑːlər. ˈɛniˌbɑːdi? ˈɛniˌbɑːdi æt ɔːl? noʊ ˈbɪdərz?/",
        "keywords": ["auction", "bidders"],
        "explanationAi": "Hội chợ từ thiện thường niên 'Basket Boys' nơi các nam sinh đứng lên sân khấu mang theo giỏ đồ ăn trưa để các nữ sinh đấu giá quyên góp.",
        "properNouns": []
    },
    {
        "start": 243.7, "end": 246.7,
        "speaker": "Bryce",
        "text": "All I could think of was Juli. What if she didn't bid on me? I was contemplating the horrors of this scenario when...",
        "translationVi": "Tất cả những gì tôi có thể nghĩ lúc đó chỉ là Juli. Sẽ ra sao nếu cô ấy không thèm trả giá cho tôi? Tôi đang mường tượng ra viễn cảnh kinh hoàng ấy thì...",
        "ipaUs": "/ɔːl aɪ kʊd θɪŋk əv wʌz ˈdʒuːli. wʌt ɪf ʃiː ˈdɪdnt bɪd ɑːn miː? aɪ wʌz kənˈtɛmpleɪtɪŋ ðə ˈhɔːrərz əv ðɪs sɪˈnɛriˌoʊ wɛn.../",
        "keywords": ["bid on me", "horrors of this scenario"],
        "explanationAi": "Nỗi lo âu tột cùng của Bryce khi đứng trên bục đấu giá, khao khát được Juli mua giỏ thức ăn của mình.",
        "properNouns": ["Juli"]
    },
    {
        "start": 246.7, "end": 251.7,
        "speaker": "Juli",
        "text": "Eight dollars!",
        "translationVi": "Tám đô-la!",
        "ipaUs": "/eɪt ˈdɑːlərz!/",
        "keywords": ["eight dollars", "bid"],
        "explanationAi": "Tiếng giơ tay trả giá dõng dạc của Juli trong sự ngỡ ngàng của cả trường.",
        "properNouns": []
    },
    {
        "start": 251.7, "end": 254.9,
        "speaker": "Bryce",
        "text": "Juli Baker was bidding on Eddie Trulock!",
        "translationVi": "Juli Baker đang đấu giá mua giỏ đồ ăn của Eddie Trulock!",
        "ipaUs": "/ˈdʒuːli ˈbeɪkər wʌz ˈbɪdɪŋ ɑːn ˈɛdi ˈtruːlɑːk!/",
        "keywords": ["Eddie Trulock", "shock"],
        "explanationAi": "Cú sốc choáng váng của Bryce: Juli không thèm đấu giá anh mà lại chi số tiền dành dụm cho cậu bạn Eddie Trulock.",
        "properNouns": ["Juli Baker", "Eddie Trulock"]
    },
    {
        "start": 254.9, "end": 259.9,
        "speaker": "Bryce",
        "text": "How could she bid on Eddie Trulock? How could she bid on anyone? That was miserable.",
        "translationVi": "Làm sao cô ấy có thể đấu giá Eddie Trulock cơ chứ? Làm sao cô ấy có thể đấu giá bất kỳ ai khác ngoài tôi? Thật là đau khổ khốn cùng.",
        "ipaUs": "/haʊ kʊd ʃiː bɪd ɑːn ˈɛdi ˈtruːlɑːk? haʊ kʊd ʃiː bɪd ɑːn ˈɛniˌwʌn? ðæt wʌz ˈmɪzrəbl./",
        "keywords": ["how could she", "miserable", "jealousy"],
        "explanationAi": "Cơn ghen tuông dữ dội lần đầu bùng cháy trong tim Bryce.",
        "properNouns": ["Eddie Trulock"]
    },
    {
        "start": 259.9, "end": 267.3,
        "speaker": "Shelly",
        "text": "We're going up to the lake. My dad has a cabin there and you get the most outrageous tan, and I mean...",
        "translationVi": "Chúng mình sẽ lên hồ chơi nhé. Bố tớ có một căn nhà gỗ ở đó và cậu sẽ có được làn da rám nắng đỉnh nhất luôn, ý tớ là...",
        "ipaUs": "/wɪər ˈɡoʊɪŋ ʌp tuː ðə leɪk. maɪ dæd hæz ə ˈkæbɪn ðɛər ænd juː ɡɛt ðə moʊst aʊtˈreɪdʒəs tæn, ænd aɪ miːn.../",
        "keywords": ["cabin", "outrageous tan"],
        "explanationAi": "Shelly lải nhải huyên thuyên về chuyện đi nghỉ mát nhưng Bryce chẳng hề để lọt một từ vào tai.",
        "properNouns": []
    },
    {
        "start": 267.3, "end": 272.5,
        "speaker": "Bryce",
        "text": "Because less than twenty feet away from me was Juli. My Juli, with Eddie Trulock.",
        "translationVi": "Bởi vì cách tôi chưa đầy hai mươi bước chân chính là Juli. Juli của tôi, đang ngồi bên cạnh Eddie Trulock.",
        "ipaUs": "/bɪˈkəz lɛs ðæn ˈtwɛnti fiːt əˈweɪ frʌm miː wʌz ˈdʒuːli. maɪ ˈdʒuːli, wɪð ˈɛdi ˈtruːlɑːk./",
        "keywords": ["my Juli", "possessive pronoun"],
        "explanationAi": "Lần đầu tiên Bryce dùng đại từ sở hữu 'My Juli' (Juli của tôi), khẳng định vị trí độc tôn của cô trong trái tim anh.",
        "properNouns": ["Juli", "Eddie Trulock"]
    },
    {
        "start": 272.5, "end": 280.5,
        "speaker": "Bryce",
        "text": "She was laughing. What was she laughing about? How could she sit there and laugh and look so beautiful?",
        "translationVi": "Cô ấy đang cười. Cô ấy đang cười vì cái gì thế? Sao cô ấy có thể ngồi đó, cười đùa vui vẻ và trông xinh đẹp lộng lẫy đến nhường ấy?",
        "ipaUs": "/ʃiː wʌz ˈlæfɪŋ. wʌt wʌz ʃiː ˈlæfɪŋ əˈbaʊt? haʊ kʊd ʃiː sɪt ðɛər ænd læf ænd lʊk soʊ ˈbjuːtɪfl?/",
        "keywords": ["laughing", "look so beautiful"],
        "explanationAi": "Nỗi day dứt đau đớn khi thấy nụ cười mà mình từng xem thường nay lại dành cho một người con trai khác.",
        "properNouns": []
    },
    {
        "start": 280.5, "end": 289.9,
        "speaker": "Juli",
        "text": "I could say I didn't care all I wanted. But seeing Bryce walk out on that stage in his jacket and tie holding that picnic basket set my head spinning again.",
        "translationVi": "Tôi có thể tự nhủ rằng mình chẳng còn bận tâm bao nhiêu tùy thích. Nhưng khi nhìn thấy Bryce bước ra sân khấu trong bộ vest chỉnh tề cầm giỏ thức ăn ấy, đầu óc tôi lại quay cuồng lần nữa.",
        "ipaUs": "/aɪ kʊd seɪ aɪ ˈdɪdnt kɛər ɔːl aɪ ˈwɑːntɪd. bʌt ˈsiːɪŋ braɪs wɔːk aʊt ɑːn ðæt steɪdʒ ɪn hɪz ˈdʒækɪt ænd taɪ ˈhoʊldɪŋ ðæt ˈpɪknɪk ˈbæskɪt sɛt maɪ hɛd ˈspɪnɪŋ əˈɡɛn./",
        "keywords": ["set my head spinning", "jacket and tie"],
        "explanationAi": "Thành ngữ 'set one's head spinning' chỉ trạng thái bối rối, choáng váng vì cảm xúc quá mãnh liệt.",
        "properNouns": ["Bryce"]
    },
    {
        "start": 289.9, "end": 303.9,
        "speaker": "Juli",
        "text": "I tried to give Eddie my full attention, but it was difficult because Bryce was right behind him. Bryce stood up and marched straight towards me.",
        "translationVi": "Tôi đã cố dành trọn sự chú ý cho Eddie, nhưng thật khó khăn vì Bryce đang ngồi ngay sau lưng cậu ấy. Bất chợt Bryce đứng phắt dậy và sải bước tiến thẳng về phía tôi.",
        "ipaUs": "/aɪ traɪd tuː ɡɪv ˈɛdi maɪ fʊl əˈtɛnʃn, bʌt ɪt wʌz ˈdɪfɪkəlt bɪˈkəz braɪs wʌz raɪt bɪˈhaɪnd hɪm. braɪs stʊd ʌp ænd mɑːrtʃt streɪt təˈwɔːrdz miː./",
        "keywords": ["marched straight towards me", "full attention"],
        "explanationAi": "Hành động liều lĩnh trước toàn thể trường học: Bryce bỏ bàn ăn của mình, tiến tới nắm lấy tay Juli để trao nụ hôn nhưng cô bé hoảng hốt giật tay chạy trốn.",
        "properNouns": ["Eddie", "Bryce"]
    },

    # Act 6: Planting the Young Sycamore Tree & Eternal Healing (05:05 - 05:35)
    {
        "start": 303.9, "end": 310.9,
        "speaker": "Juli",
        "text": "A tree? He's planting a tree?",
        "translationVi": "Một cái cây ư? Cậu ấy đang trồng một cái cây sao?",
        "ipaUs": "/ə triː? hiːz ˈplæntɪŋ ə triː?/",
        "keywords": ["planting a tree", "surprise"],
        "explanationAi": "Juli đứng bên cửa sổ phòng ngủ nhìn xuống sân trước và kinh ngạc thấy Bryce đang cặm cụi đào đất.",
        "properNouns": []
    },
    {
        "start": 310.9, "end": 317.9,
        "speaker": "Juli",
        "text": "Is it a...",
        "translationVi": "Liệu có phải là một cây...",
        "ipaUs": "/ɪz ɪt ə.../",
        "keywords": ["hesitation"],
        "explanationAi": "Trái tim Juli đập thình thịch khi linh cảm điều kỳ diệu đang diễn ra.",
        "properNouns": []
    },
    {
        "start": 317.9, "end": 322.9,
        "speaker": "Juli",
        "text": "I didn't really need to ask. I could tell from the shape of the leaves...",
        "translationVi": "Tôi thực ra chẳng cần phải hỏi. Tôi có thể nhận ra ngay từ hình dáng của những chiếc lá...",
        "ipaUs": "/aɪ ˈdɪdnt ˈrɪəli niːd tuː æsk. aɪ kʊd tɛl frʌm ðə ʃeɪp əv ðə liːvz.../",
        "keywords": ["shape of the leaves"],
        "explanationAi": "Juli đã quá quen thuộc với từng đường nét của loài cây ngô đồng mà cô hằng yêu quý.",
        "properNouns": []
    },
    {
        "start": 322.9, "end": 326.9,
        "speaker": "Juli",
        "text": "...and the texture of the trunk. It was a sycamore tree.",
        "translationVi": "...và từ lớp vân sần sùi của thân cây. Đó chính là một cây ngô đồng non.",
        "ipaUs": "/...ænd ðə ˈtɛkstʃər əv ðə trʌŋk. ɪt wʌz ə ˈsɪkəmɔːr triː./",
        "keywords": ["texture of the trunk", "sycamore tree"],
        "explanationAi": "Món quà chuộc lỗi ý nghĩa và chân thành nhất cuộc đời: Bryce mang tới một cây ngô đồng non để trồng lại mảnh ký ức thiêng liêng cho Juli.",
        "properNouns": []
    },
    {
        "start": 326.9, "end": 335.0,
        "speaker": "Narrator",
        "text": "Juli steps into the front yard and places her hands alongside Bryce's on the young sapling, smiling gently as their hearts finally connect.",
        "translationVi": "Juli bước ra sân trước và nhẹ nhàng đặt đôi bàn tay mình bên cạnh bàn tay Bryce lên thân cây non, mỉm cười dịu dàng khi hai trái tim cuối cùng đã tìm thấy nhau.",
        "ipaUs": "/ˈdʒuːli stɛps ˈɪntuː ðə frʌnt jɑːrd ænd ˈpleɪsɪz hɜːr hændz əˈlɔːŋˌsaɪd braɪsɪz ɑːn ðə jʌŋ ˈsæplɪŋ, ˈsmaɪlɪŋ ˈdʒɛntli æz ðɛər hɑːrts ˈfaɪnəli kəˈnɛkt./",
        "keywords": ["young sapling", "hearts connect", "reconciliation"],
        "explanationAi": "Cảnh kết xúc động kinh điển của kiệt tác Flipped: tình yêu đích thực là khi hai con người thấu hiểu trọn vẹn vẻ đẹp tâm hồn của nhau (more than the sum of its parts) và cùng nhau vun đắp tương lai.",
        "properNouns": ["Juli", "Bryce"]
    }
]

print(f"Total pure segments: {len(raw_segments)}")

# Process segments
segments = []
for idx, r in enumerate(raw_segments):
    text = r["text"]
    clean_words = re.findall(r"[A-Za-z0-9']+", text)
    token_count = len(clean_words)
    
    seg = {
        "orderIndex": idx,
        "startTime": r["start"],
        "endTime": r["end"],
        "text": text,
        "translationVi": r["translationVi"],
        "ipaUs": r["ipaUs"],
        "keywords": r["keywords"],
        "explanationAi": r["explanationAi"],
        "properNouns": r["properNouns"],
        "tokenCount": token_count
    }
    segments.append(seg)

quiz_data = {
    "lessonId": "mov_rom_12",
    "lessonTitle": "Flipped: Bryce and Juli's Sycamore Tree & Growing Hearts (Full Master Cut)",
    "totalQuestions": 8,
    "xpReward": 100,
    "generatedBy": "AI_GEMINI",
    "questions": [
        {
            "id": "mov_rom_12_q1",
            "question": "What meaningful gesture does Bryce make in the climax of the film to apologize and heal Juli's broken heart?",
            "questionEn": "What meaningful gesture does Bryce make in the climax of the film to apologize and heal Juli's broken heart?",
            "questionVi": "Hành động ý nghĩa nào được Bryce thực hiện ở đoạn cao trào kết phim để xin lỗi và hàn gắn trái tim tổn thương của Juli?",
            "options": [
                "He buys her a dozen store-bought chickens.",
                "He plants a young sycamore sapling tree in her front yard.",
                "He paints a portrait of her school bus.",
                "He invites her to an expensive French dinner."
            ],
            "optionsEn": [
                "He buys her a dozen store-bought chickens.",
                "He plants a young sycamore sapling tree in her front yard.",
                "He paints a portrait of her school bus.",
                "He invites her to an expensive French dinner."
            ],
            "optionsVi": [
                "Cậu mua tặng cô cả đàn gà công nghiệp.",
                "Cậu đào đất và trồng một cây ngô đồng non trong sân trước nhà cô.",
                "Cậu vẽ một bức tranh xe buýt trường học tặng cô.",
                "Cậu mời cô đến một bữa tối Pháp đắt đỏ."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 48-52, Bryce digs the ground in Juli's front yard and plants a young sycamore sapling, replacing the beloved tree that was cut down and demonstrating that he finally sees and values what truly matters to her.",
            "explanationEn": "In Segments 48-52, Bryce digs the ground in Juli's front yard and plants a young sycamore sapling, replacing the beloved tree that was cut down and demonstrating that he finally sees and values what truly matters to her.",
            "explanationVi": "Trong các Phân đoạn 48-52, Bryce đào đất trong sân trước nhà Juli và trồng một cây ngô đồng non, thay thế cho cây cổ thụ thân thương từng bị đốn hạ và chứng minh rằng cậu đã thực sự thấu hiểu điều quý giá nhất trong tâm hồn cô.",
            "targetedConcept": "Symbolic gesture of growth, healing, and romantic redemption",
            "targetedConceptEn": "Symbolic gesture of growth, healing, and romantic redemption",
            "targetedConceptVi": "Hành động biểu tượng của sự chuộc lỗi, hàn gắn và cùng nhau trưởng thành",
            "referenceSegmentIndex": 51
        },
        {
            "id": "mov_rom_12_q2",
            "question": "What does the English idiom 'take a hint' mean when Bryce complains about young Juli in Segment 5?",
            "questionEn": "What does the English idiom 'take a hint' mean when Bryce complains about young Juli in Segment 5?",
            "questionVi": "Thành ngữ tiếng Anh 'take a hint' có nghĩa là gì khi Bryce phàn nàn về cô bé Juli trong Phân đoạn 5?",
            "options": [
                "To ask someone for help carrying luggage",
                "To understand what someone wants or means without them stating it directly",
                "To memorize answers before a school exam",
                "To write a secret message on a tree"
            ],
            "optionsEn": [
                "To ask someone for help carrying luggage",
                "To understand what someone wants or means without them stating it directly",
                "To memorize answers before a school exam",
                "To write a secret message on a tree"
            ],
            "optionsVi": [
                "Nhờ ai đó giúp mang vác hành lý",
                "Hiểu được ý tứ ngầm hoặc mong muốn của ai đó mà không cần họ phải nói thẳng ra",
                "Học vẹt đáp án trước kỳ thi",
                "Viết thư bí mật giấu trên ngọn cây"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 5, 'This girl could not take a hint' means Juli was oblivious to the subtle social cues and hints that Bryce wanted to be left alone.",
            "explanationEn": "In Segment 5, 'This girl could not take a hint' means Juli was oblivious to the subtle social cues and hints that Bryce wanted to be left alone.",
            "explanationVi": "Trong Phân đoạn 5, câu 'This girl could not take a hint' mang ý nghĩa Juli hoàn toàn không nhận ra các tín hiệu và ý tứ gián tiếp mà Bryce đưa ra khi muốn được yên tĩnh.",
            "targetedConcept": "Idiomatic expression 'take a hint'",
            "targetedConceptEn": "Idiomatic expression 'take a hint'",
            "targetedConceptVi": "Thành ngữ tiếng Anh 'take a hint' (hiểu ý tứ)",
            "referenceSegmentIndex": 5
        },
        {
            "id": "mov_rom_12_q3",
            "question": "What unique sensory detail does Juli obsess over when describing her early childhood crush on Bryce?",
            "questionEn": "What unique sensory detail does Juli obsess over when describing her early childhood crush on Bryce?",
            "questionVi": "Chi tiết khứu giác độc đáo nào khiến cô bé Juli mê mẩn khi miêu tả về tình cảm đầu đời dành cho Bryce?",
            "options": [
                "His jacket smelled like lavender.",
                "His hair smelled like sweet watermelon.",
                "His sneakers smelled of fresh grass.",
                "His hands smelled like paint and turpentine."
            ],
            "optionsEn": [
                "His jacket smelled like lavender.",
                "His hair smelled like sweet watermelon.",
                "His sneakers smelled of fresh grass.",
                "His hands smelled like paint and turpentine."
            ],
            "optionsVi": [
                "Chiếc áo khoác của cậu thơm mùi hoa oải hương.",
                "Mái tóc của cậu thơm ngát mùi dưa hấu ngọt ngào.",
                "Đôi giày thể thao của cậu thơm mùi cỏ tươi.",
                "Đôi bàn tay của cậu thơm mùi sơn dầu và dầu thông."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 23-24, Juli lovingly reflects: 'And his hair, it smelled like watermelon... I spent the whole year secretly sniffing watermelon.'",
            "explanationEn": "In Segments 23-24, Juli lovingly reflects: 'And his hair, it smelled like watermelon... I spent the whole year secretly sniffing watermelon.'",
            "explanationVi": "Trong các Phân đoạn 23-24, Juli bồi hồi nhớ lại: 'Và mái tóc của cậu ấy, nó thơm ngát mùi dưa hấu... Tôi đã dành cả năm trời lén hít hà hương dưa hấu ấy.'",
            "targetedConcept": "Sensory imagery in childhood romance narratives",
            "targetedConceptEn": "Sensory imagery in childhood romance narratives",
            "targetedConceptVi": "Hình tượng cảm giác (sensory imagery) trong câu chuyện tình cảm tuổi học trò",
            "referenceSegmentIndex": 23
        },
        {
            "id": "mov_rom_12_q4",
            "question": "What witty phrase does Juli use when Bryce says the view from the sycamore tree is 'unbelievably ugly'?",
            "questionEn": "What witty phrase does Juli use when Bryce says the view from the sycamore tree is 'unbelievably ugly'?",
            "questionVi": "Cụm từ dí dỏm nào được Juli thốt lên khi Bryce chê bai khung cảnh nhìn từ cây ngô đồng là 'xấu xí không tưởng'?",
            "options": [
                "'You're just spiritually broke.'",
                "'You're just visually challenged.'",
                "'You're completely colorblind.'",
                "'You're suffering from vertigo.'"
            ],
            "optionsEn": [
                "'You're just spiritually broke.'",
                "'You're just visually challenged.'",
                "'You're completely colorblind.'",
                "'You're suffering from vertigo.'"
            ],
            "optionsVi": [
                "'Cậu chỉ là kẻ kiệt quệ về tâm hồn thôi.'",
                "'Cậu chỉ là người bị khiếm khuyết về thị giác thôi (không biết thưởng thức cái đẹp).'",
                "'Cậu hoàn toàn bị mù màu rồi.'",
                "'Cậu đang bị chóng mặt độ cao đấy.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 27, Juli playfully chides him: 'You're just visually challenged. I feel sorry for you.' She uses the phrase to criticize his inability to perceive the natural wonder of the world.",
            "explanationEn": "In Segment 27, Juli playfully chides him: 'You're just visually challenged. I feel sorry for you.' She uses the phrase to criticize his inability to perceive the natural wonder of the world.",
            "explanationVi": "Trong Phân đoạn 27, Juli hóm hỉnh trêu: 'Cậu chỉ là người bị khiếm khuyết về mặt thị giác thôi. Tớ thấy tội nghiệp cho cậu ghê.' Cô dùng cụm này để chê sự thiếu nhạy cảm trước vẻ đẹp thiên nhiên của Bryce.",
            "targetedConcept": "Playful euphemistic idiom 'visually challenged'",
            "targetedConceptEn": "Playful euphemistic idiom 'visually challenged'",
            "targetedConceptVi": "Cách nói giảm nói tránh dí dỏm 'visually challenged'",
            "referenceSegmentIndex": 27
        },
        {
            "id": "mov_rom_12_q5",
            "question": "What advice does Garrett give Bryce when Bryce confesses in the library that he cannot stop thinking about Juli?",
            "questionEn": "What advice does Garrett give Bryce when Bryce confesses in the library that he cannot stop thinking about Juli?",
            "questionVi": "Garrett đã đưa ra lời khuyên nào cho Bryce khi Bryce thú nhận trong thư viện rằng cậu không thể ngừng nghĩ về Juli?",
            "options": [
                "To buy her a brand new bicycle",
                "To 'nip this in the bud' because these aren't real emotions",
                "To ask her to the school dance immediately",
                "To write an anonymous love letter"
            ],
            "optionsEn": [
                "To buy her a brand new bicycle",
                "To 'nip this in the bud' because these aren't real emotions",
                "To ask her to the school dance immediately",
                "To write an anonymous love letter"
            ],
            "optionsVi": [
                "Mua cho cô một chiếc xe đạp mới toanh",
                "Hãy 'dập tắt nó ngay từ trong trứng nước' (nip this in the bud) vì đây không phải cảm xúc thật",
                "Mời cô đi dự buổi dạ vũ trường học ngay lập tức",
                "Viết cho cô một bức thư tình giấu tên"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 34, Garrett tells him: 'You got to nip this in the bud... these aren't real emotions. You just feel guilty because of the whole egg thing.'",
            "explanationEn": "In Segment 34, Garrett tells him: 'You got to nip this in the bud... these aren't real emotions. You just feel guilty because of the whole egg thing.'",
            "explanationVi": "Trong Phân đoạn 34, Garrett khuyên: 'Cậu phải dập tắt nó ngay từ trong trứng nước đi... đây chẳng phải cảm xúc thật đâu. Cậu chỉ đang áy náy vì vụ vứt trứng thôi.'",
            "targetedConcept": "Idiom 'nip in the bud' & peer pressure",
            "targetedConceptEn": "Idiom 'nip in the bud' & peer pressure",
            "targetedConceptVi": "Thành ngữ 'nip in the bud' (ngăn chặn từ trong trứng nước) và áp lực bạn bè",
            "referenceSegmentIndex": 34
        },
        {
            "id": "mov_rom_12_q6",
            "question": "How does Bryce react in his inner monologue when Garrett makes a cruel derogatory remark about Juli's uncle?",
            "questionEn": "How does Bryce react in his inner monologue when Garrett makes a cruel derogatory remark about Juli's uncle?",
            "questionVi": "Bryce đã phản ứng thế nào trong độc thoại nội tâm khi Garrett buông lời xúc phạm cay độc về người chú thiểu năng của Juli?",
            "options": [
                "He completely agrees with Garrett and laughs out loud.",
                "He wants to yell at Garrett and tell him he doesn't know Juli, but cowers in shame with 'Yeah, right.'",
                "He immediately punches Garrett in the face.",
                "He reports Garrett to the school principal."
            ],
            "optionsEn": [
                "He completely agrees with Garrett and laughs out loud.",
                "He wants to yell at Garrett and tell him he doesn't know Juli, but cowers in shame with 'Yeah, right.'",
                "He immediately punches Garrett in the face.",
                "He reports Garrett to the school principal."
            ],
            "optionsVi": [
                "Cậu hoàn toàn đồng tình với Garrett và cười lớn.",
                "Cậu muốn hét vào mặt Garrett và bảo cậu ta chẳng hiểu gì về Juli, nhưng lại hèn nhát thốt ra 'Ừ, phải rồi.' trong sự hổ thẹn.",
                "Cậu lập tức đấm thẳng vào mặt Garrett.",
                "Cậu báo cáo Garrett với thầy hiệu trưởng."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 38-39, Bryce feels intense self-loathing: 'I wanted to yell at him, tell him that he didn't know Juli like I did. All that came out was... Yeah, right.' This moment propels Bryce's emotional transformation.",
            "explanationEn": "In Segments 38-39, Bryce feels intense self-loathing: 'I wanted to yell at him, tell him that he didn't know Juli like I did. All that came out was... Yeah, right.' This moment propels Bryce's emotional transformation.",
            "explanationVi": "Trong các Phân đoạn 38-39, Bryce cảm thấy cắn rứt lương tâm tột cùng: 'Tôi muốn hét vào mặt cậu ta, bảo cậu ta rằng cậu ta chẳng hiểu gì về Juli như tôi hiểu. Nhưng tất cả những gì thốt ra chỉ là... Ừ, phải rồi.' Khoảnh khắc này thúc đẩy sự thức tỉnh lương tri của Bryce.",
            "targetedConcept": "Internal conflict and moral awakening",
            "targetedConceptEn": "Internal conflict and moral awakening",
            "targetedConceptVi": "Xung đột nội tâm và sự thức tỉnh lương tri",
            "referenceSegmentIndex": 38
        },
        {
            "id": "mov_rom_12_q7",
            "question": "What unexpected turn of events causes Bryce intense jealousy at the Basket Boys charity auction?",
            "questionEn": "What unexpected turn of events causes Bryce intense jealousy at the Basket Boys charity auction?",
            "questionVi": "Biến cố bất ngờ nào đã khiến Bryce nổi cơn ghen tuông dữ dội tại buổi đấu giá từ thiện Basket Boys?",
            "options": [
                "Juli leaves the auditorium without bidding.",
                "Juli unexpectedly places an eight-dollar bid on Eddie Trulock instead of him.",
                "Shelly Stalls refuses to bid on Bryce.",
                "Garrett bids on Juli's handmade basket."
            ],
            "optionsEn": [
                "Juli leaves the auditorium without bidding.",
                "Juli unexpectedly places an eight-dollar bid on Eddie Trulock instead of him.",
                "Shelly Stalls refuses to bid on Bryce.",
                "Garrett bids on Juli's handmade basket."
            ],
            "optionsVi": [
                "Juli bỏ ra khỏi hội trường mà không thèm đấu giá.",
                "Juli bất ngờ giơ tay trả tám đô-la để mua giỏ đồ ăn của Eddie Trulock thay vì đấu giá Bryce.",
                "Shelly Stalls từ chối đấu giá Bryce.",
                "Garrett đấu giá giỏ thức ăn do Juli làm."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 42-44, Juli outbids others for Eddie Trulock with eight dollars. Bryce is crushed: 'How could she bid on Eddie Trulock? How could she bid on anyone? That was miserable.'",
            "explanationEn": "In Segments 42-44, Juli outbids others for Eddie Trulock with eight dollars. Bryce is crushed: 'How could she bid on Eddie Trulock? How could she bid on anyone? That was miserable.'",
            "explanationVi": "Trong các Phân đoạn 42-44, Juli trả giá tám đô-la để mua Eddie Trulock. Bryce sụp đổ trong ghen tuông: 'Sao cô ấy có thể đấu giá Eddie Trulock cơ chứ? Sao cô ấy có thể đấu giá bất kỳ ai khác ngoài tôi? Thật là đau khổ khốn cùng.'",
            "targetedConcept": "Dramatic role-reversal (the 'Flipped' paradigm)",
            "targetedConceptEn": "Dramatic role-reversal (the 'Flipped' paradigm)",
            "targetedConceptVi": "Nghệ thuật đảo ngược tình huống kịch tính (cốt lõi ý niệm 'Flipped')",
            "referenceSegmentIndex": 43
        },
        {
            "id": "mov_rom_12_q8",
            "question": "What profound philosophical theme does the sycamore tree embody throughout Flipped?",
            "questionEn": "What profound philosophical theme does the sycamore tree embody throughout Flipped?",
            "questionVi": "Cây ngô đồng hiện thân cho chủ đề triết lý sâu sắc nào xuyên suốt bộ phim Flipped?",
            "options": [
                "That nature is dangerous and trees should be cut down for construction.",
                "That seeing the whole picture reveals that people and art are 'more than the sum of their parts.'",
                "That childhood friendships never survive into middle school.",
                "That wealth and clean yards determine true personal character."
            ],
            "optionsEn": [
                "That nature is dangerous and trees should be cut down for construction.",
                "That seeing the whole picture reveals that people and art are 'more than the sum of their parts.'",
                "That childhood friendships never survive into middle school.",
                "That wealth and clean yards determine true personal character."
            ],
            "optionsVi": [
                "Rằng thiên nhiên nguy hiểm và cây cối nên bị đốn hạ để xây dựng công trình.",
                "Rằng khi nhìn nhận bức tranh tổng thể, con người và nghệ thuật có giá trị 'lớn hơn tổng thể các bộ phận đơn lẻ cộng lại' (more than the sum of its parts).",
                "Rằng tình bạn thời thơ ấu không bao giờ tồn tại được lên cấp hai.",
                "Rằng sự giàu sang và sân vườn sạch sẽ quyết định phẩm giá con người."
            ],
            "correctAnswer": 1,
            "explanation": "The sycamore tree symbolizes elevated vision and holistic understanding. It echoes the core moral taught by Juli's father: discovering whether someone's true self is 'more than the sum of its parts' or 'less than the sum of its parts.'",
            "explanationEn": "The sycamore tree symbolizes elevated vision and holistic understanding. It echoes the core moral taught by Juli's father: discovering whether someone's true self is 'more than the sum of its parts' or 'less than the sum of its parts.'",
            "explanationVi": "Cây ngô đồng là biểu tượng của tầm nhìn bao quát và sự thấu cảm toàn diện. Nó phản ánh bài học cốt lõi của người cha: nhận ra một con người có giá trị 'lớn hơn tổng thể các phần cộng lại' (như Juli) hay 'nhỏ hơn các phần bề ngoài cộng lại' (như những người chỉ có vẻ ngoài đẹp mã).",
            "targetedConcept": "Overarching thematic metaphor: 'More than the sum of its parts'",
            "targetedConceptEn": "Overarching thematic metaphor: 'More than the sum of its parts'",
            "targetedConceptVi": "Ẩn dụ chủ đề xuyên suốt: 'Lớn hơn tổng thể các bộ phận cộng lại'",
            "referenceSegmentIndex": 52
        }
    ]
}

# Generate TypeScript code
ts_code = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Flipped: Bryce and Juli's Sycamore Tree & Growing Hearts (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B1 | American Accent
 * YouTube ID: KTUvOpY89RE (05:35 - 335s)
 * Views: 204,950 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (ROB REINER MASTER CUT)
 * ZERO MERGED UTTERANCES - PHÂN TÁCH ĐỘC LẬP TỪNG SPEAKER TURN
 * TỔNG CỘNG: {len(segments)} PURE MASTER SEGMENTS (00:00 - 05:35)
 * ============================================================================
 */

export const QUIZ_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS_EXTENDED: VideoQuizData = {json.dumps(quiz_data, ensure_ascii=False, indent=2)};
export const QUIZ_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS = QUIZ_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS_EXTENDED;

export const LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS: MockVideoLesson = {{
  id: "mov_rom_12",
  slug: "flipped-the-sycamore-tree-and-basket-boys",
  title: "Flipped: Bryce and Juli's Sycamore Tree & Growing Hearts (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B1",
  durationFormatted: "05:35",
  durationSeconds: 335,
  externalId: "KTUvOpY89RE",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/KTUvOpY89RE/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 128,
  viewCount: 204950,
  studyCount: 4320,
  description:
    "Trường đoạn tổng hòa giàu cảm xúc nhất của kiệt tác học trò Flipped: Từ ngày đầu dọn nhà nắm tay lúng túng, kế hoạch hẹn hò giả với Shelly Stalls, mùi tóc dưa hấu, góc nhìn từ ngọn cây ngô đồng cổ thụ, cuộc đấu giá Basket Boys nghẹt thở, cho đến khoảnh khắc Bryce tự tay vun trồng cây ngô đồng non trong sân nhà Juli để hai trái tim cùng hòa chung một nhịp đập.",
  segments: {json.dumps(segments, ensure_ascii=False, indent=4)},
  quiz: QUIZ_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS_EXTENDED,
}};

export default LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS;
'''

output_path = "features/listening/data/lessons/movies/romance/lesson_flipped.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Generated {output_path} successfully with {len(segments)} segments and 8 quiz questions!")
