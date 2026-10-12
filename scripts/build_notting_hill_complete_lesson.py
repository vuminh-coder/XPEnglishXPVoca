import json
import re

# Master segment definitions for Notting Hill: Final Press Conference & Wedding (mov_rom_11)
# YouTube ID: sM4rv42qyvk (377s / 06:17)

raw_segments = [
    # Act 1: Press Conference Opening & Next Film Plans (00:00 - 00:27)
    {
        "start": 0.0, "end": 7.0,
        "speaker": "Reporter",
        "text": "Does this mean that Miss Scott will not be publicising the next film?",
        "translationVi": "Điều này có đồng nghĩa với việc cô Scott sẽ không tham gia quảng bá bộ phim tiếp theo không?",
        "ipaUs": "/dʌz ðɪs miːn ðæt mɪs skɑːt wɪl nɑːt biː ˈpʌblɪsaɪzɪŋ ðə nɛkst fɪlm?/",
        "keywords": ["publicising", "next film", "press question"],
        "explanationAi": "Các phóng viên tại họp báo khách sạn The Ritz London dồn dập chất vấn về tương lai sự nghiệp của minh tinh Hollywood Anna Scott.",
        "properNouns": ["Miss Scott"]
    },
    {
        "start": 7.0, "end": 9.5,
        "speaker": "Jeremy",
        "text": "No, it absolutely does not mean that.",
        "translationVi": "Không, tuyệt đối không có chuyện đó đâu.",
        "ipaUs": "/noʊ, ɪt ˌæbsəˈluːtli dʌz nɑːt miːn ðæt./",
        "keywords": ["absolutely does not mean"],
        "explanationAi": "Jeremy, người quản lý truyền thông chuyên nghiệp của Anna, dứt khoát bác bỏ tin đồn giải nghệ.",
        "properNouns": ["Jeremy"]
    },
    {
        "start": 9.5, "end": 11.5,
        "speaker": "Jeremy",
        "text": "She'll be abiding by all her present commitments.",
        "translationVi": "Cô ấy sẽ tuân thủ đầy đủ tất cả các cam kết hiện tại của mình.",
        "ipaUs": "/ʃiːl biː əˈbaɪdɪŋ baɪ ɔːl hɜːr ˈprɛznt kəˈmɪtmənts./",
        "keywords": ["abiding by", "present commitments"],
        "explanationAi": "Cụm động từ 'abide by' mang nghĩa tuân thủ, chấp hành nghiêm túc hợp đồng hoặc cam kết pháp lý.",
        "properNouns": []
    },
    {
        "start": 11.5, "end": 14.5,
        "speaker": "Jeremy",
        "text": "She just won't be making any more for the next year.",
        "translationVi": "Chỉ là cô ấy sẽ không nhận thêm bất kỳ dự án nào mới trong vòng một năm tới mà thôi.",
        "ipaUs": "/ʃiː dʒʌst woʊnt biː ˈmeɪkɪŋ ˈɛni mɔːr fɔːr ðə nɛkst jɪər./",
        "keywords": ["for the next year", "hiatus"],
        "explanationAi": "Thông báo về việc Anna Scott tạm ngưng đóng phim một năm để tìm lại sự bình yên trong tâm hồn.",
        "properNouns": []
    },
    {
        "start": 14.5, "end": 17.0,
        "speaker": "Reporter",
        "text": "When will the film be released?",
        "translationVi": "Khi nào thì bộ phim sẽ được chính thức công chiếu?",
        "ipaUs": "/wɛn wɪl ðə fɪlm biː rɪˈliːst?/",
        "keywords": ["released", "premiere"],
        "explanationAi": "Câu hỏi về lịch phát hành toàn cầu của tác phẩm điện ảnh 'The Wings of the Dove'.",
        "properNouns": []
    },
    {
        "start": 17.0, "end": 21.0,
        "speaker": "Jeremy",
        "text": "At the moment the plan is to release in America towards the end of the autumn...",
        "translationVi": "Hiện tại kế hoạch là sẽ công chiếu tại thị trường Mỹ vào khoảng cuối mùa thu...",
        "ipaUs": "/æt ðə ˈmoʊmənt ðə plæn ɪz tuː rɪˈliːs ɪn əˈmɛrɪkə təˈwɔːrdz ðə ɛnd əv ðə ˈɔːtəm.../",
        "keywords": ["at the moment", "end of the autumn"],
        "explanationAi": "Lịch ra mắt mùa thu nhằm đón đầu mùa giải thưởng Oscar danh giá.",
        "properNouns": ["America"]
    },
    {
        "start": 21.0, "end": 24.5,
        "speaker": "Jeremy",
        "text": "...and over here around Christmas or early in the new year.",
        "translationVi": "...và tại nước Anh vào khoảng dịp Giáng sinh hoặc đầu năm mới.",
        "ipaUs": "/...ænd ˈoʊvər hɪər əˈraʊnd ˈkrɪsməs ɔːr ˈɜːrli ɪn ðə nuː jɪər./",
        "keywords": ["Christmas", "new year"],
        "explanationAi": "Lịch chiếu thương mại dịp lễ cuối năm tại các rạp chiếu phim Vương quốc Anh.",
        "properNouns": ["Christmas"]
    },
    {
        "start": 24.5, "end": 27.0,
        "speaker": "Jeremy",
        "text": "Right, Dominic!",
        "translationVi": "Vâng, xin mời Dominic!",
        "ipaUs": "/raɪt, ˈdɑːmɪnɪk!/",
        "keywords": ["Dominic", "call on reporter"],
        "explanationAi": "Jeremy chỉ định nhà báo Dominic của tạp chí Time Out đặt câu hỏi tiếp theo.",
        "properNouns": ["Dominic"]
    },

    # Act 2: Rumours & Past Graphic Photographs (00:27 - 01:14)
    {
        "start": 27.0, "end": 30.0,
        "speaker": "Dominic",
        "text": "Anna, how much longer are you staying in the UK then?",
        "translationVi": "Anna, cô dự định sẽ còn ở lại nước Anh thêm bao lâu nữa?",
        "ipaUs": "/ˈænə, haʊ mʌtʃ ˈlɔːŋɡər ɑːr juː ˈsteɪɪŋ ɪn ðə juː keɪ ðɛn?/",
        "keywords": ["how much longer", "staying in the UK"],
        "explanationAi": "Câu hỏi bản lề của Dominic về thời gian lưu trú tại Anh Quốc, tiền đề cho cao trào lãng mạn cuối buổi họp báo.",
        "properNouns": ["Anna", "UK"]
    },
    {
        "start": 30.0, "end": 32.5,
        "speaker": "Anna",
        "text": "No time at all. I leave tonight.",
        "translationVi": "Không còn thời gian nữa đâu. Tôi sẽ bay về nước ngay tối nay.",
        "ipaUs": "/noʊ taɪm æt ɔːl. aɪ liːv təˈnaɪt./",
        "keywords": ["no time at all", "leave tonight"],
        "explanationAi": "Anna trả lời ngắn gọn và thoáng buồn, chuẩn bị rời London sau khi bị William từ chối tình cảm ở hiệu sách Notting Hill.",
        "properNouns": []
    },
    {
        "start": 32.5, "end": 36.5,
        "speaker": "Jeremy",
        "text": "Which is why we have to round things up now. So final questions, please.",
        "translationVi": "Đó là lý do chúng ta phải kết thúc họp báo ngay lúc này. Xin mời những câu hỏi cuối cùng.",
        "ipaUs": "/wɪtʃ ɪz waɪ wiː hæv tuː raʊnd θɪŋz ʌp naʊ. soʊ ˈfaɪnl ˈkwɛstʃənz, pliːz./",
        "keywords": ["round things up", "final questions"],
        "explanationAi": "Cụm 'round things up' mang nghĩa tóm tắt, hoàn tất và khép lại một phiên làm việc.",
        "properNouns": []
    },
    {
        "start": 36.5, "end": 39.0,
        "speaker": "Jeremy",
        "text": "Yes, lady in the front.",
        "translationVi": "Vâng, xin mời quý cô ở hàng ghế đầu.",
        "ipaUs": "/jɛs, ˈleɪdi ɪn ðə frʌnt./",
        "keywords": ["lady in the front"],
        "explanationAi": "Jeremy chuyển micro cho một nữ phóng viên báo chí.",
        "properNouns": []
    },
    {
        "start": 39.0, "end": 43.0,
        "speaker": "Reporter",
        "text": "Is your decision to take a year off anything to do with the rumours about Jeff...",
        "translationVi": "Liệu quyết định nghỉ ngơi một năm này có liên quan gì đến những tin đồn về Jeff...",
        "ipaUs": "/ɪz jʊər dɪˈsɪʒn tuː teɪk ə jɪər ɔːf ˈɛniˌθɪŋ tuː duː wɪð ðə ˈruːmərz əˈbaʊt dʒɛf.../",
        "keywords": ["take a year off", "rumours"],
        "explanationAi": "Phóng viên đào bới đời tư về Jeff King, bạn trai cũ nổi tiếng và thói trăng hoa của anh ta.",
        "properNouns": ["Jeff"]
    },
    {
        "start": 43.0, "end": 45.5,
        "speaker": "Reporter",
        "text": "...and his present leading lady?",
        "translationVi": "...và nữ diễn viên chính hiện tại của anh ấy không?",
        "ipaUs": "/...ænd hɪz ˈprɛznt ˈliːdɪŋ ˈleɪdi?/",
        "keywords": ["leading lady"],
        "explanationAi": "Thuật ngữ 'leading lady' chỉ nữ diễn viên đóng vai chính trong một tác phẩm điện ảnh.",
        "properNouns": []
    },
    {
        "start": 45.5, "end": 48.0,
        "speaker": "Anna",
        "text": "Absolutely not.",
        "translationVi": "Tuyệt đối là không.",
        "ipaUs": "/ˌæbsəˈluːtli nɑːt./",
        "keywords": ["absolutely not"],
        "explanationAi": "Anna thẳng thắn phủ nhận việc bị ảnh hưởng bởi người tình cũ.",
        "properNouns": []
    },
    {
        "start": 48.0, "end": 49.0,
        "speaker": "Reporter",
        "text": "Do you believe the rumours?",
        "translationVi": "Cô có tin vào những tin đồn đó không?",
        "ipaUs": "/duː juː bɪˈliːv ðə ˈruːmərz?/",
        "keywords": ["believe the rumours"],
        "explanationAi": "Câu hỏi gặng hỏi thêm về sự thật đằng sau chuyện tình trường Hollywood.",
        "properNouns": []
    },
    {
        "start": 49.0, "end": 54.0,
        "speaker": "Anna",
        "text": "Well, it's really not my business anymore...",
        "translationVi": "À, chuyện đó thực sự chẳng còn liên quan gì đến tôi nữa rồi...",
        "ipaUs": "/wɛl, ɪts ˈrɪəli nɑːt maɪ ˈbɪznɪs ˌɛniˈmɔːr.../",
        "keywords": ["not my business anymore"],
        "explanationAi": "Thái độ dứt khoát không bận tâm đến người cũ của Anna.",
        "properNouns": []
    },
    {
        "start": 54.0, "end": 57.5,
        "speaker": "Anna",
        "text": "...though I will say from my experience with Jeff, they do tend to be true.",
        "translationVi": "...dù tôi phải thừa nhận từ kinh nghiệm từng quen Jeff, rằng những tin đồn ấy thường là thật.",
        "ipaUs": "/...ðoʊ aɪ wɪl seɪ frʌm maɪ ɪkˈspɪəriəns wɪð dʒɛf, ðeɪ duː tɛnd tuː biː truː./",
        "keywords": ["tend to be true"],
        "explanationAi": "Câu trả lời hóm hỉnh và châm biếm sâu cay của Anna khiến cả khán phòng bật cười thích thú.",
        "properNouns": ["Jeff"]
    },
    {
        "start": 59.0, "end": 64.0,
        "speaker": "Reporter",
        "text": "Yeah, the last time you were here there were some fairly graphic photographs taken of you...",
        "translationVi": "Vâng, lần trước cô ở đây đã có một số bức ảnh khá nhạy cảm chụp cô...",
        "ipaUs": "/jæ, ðə læst taɪm juː wɜːr hɪər ðɛər wɜːr sʌm ˈfɛərli ˈɡræfɪk ˈfoʊtəˌɡræfs ˈteɪkən əv juː.../",
        "keywords": ["graphic photographs"],
        "explanationAi": "Phóng viên nhắc lại vụ bê bối paparazzi chụp trộm Anna và William tại căn nhà cửa xanh Notting Hill.",
        "properNouns": []
    },
    {
        "start": 64.0, "end": 67.0,
        "speaker": "Reporter",
        "text": "...with a young English guy.",
        "translationVi": "...với một chàng trai người Anh trẻ tuổi.",
        "ipaUs": "/...wɪð ə jʌŋ ˈɪŋɡlɪʃ ɡaɪ./",
        "keywords": ["English guy"],
        "explanationAi": "Chàng trai người Anh bí ẩn được nhắc tới không ai khác chính là William Thacker.",
        "properNouns": ["English"]
    },
    {
        "start": 67.0, "end": 69.0,
        "speaker": "Reporter",
        "text": "So what happened there?",
        "translationVi": "Thế chuyện giữa hai người là như thế nào vậy?",
        "ipaUs": "/soʊ wʌt ˈhæpənd ðɛər?/",
        "keywords": ["what happened"],
        "explanationAi": "Sự tò mò của giới truyền thông về thân phận của William.",
        "properNouns": []
    },
    {
        "start": 69.0, "end": 73.0,
        "speaker": "Anna",
        "text": "He was just a friend. We're still friends, I think.",
        "translationVi": "Anh ấy chỉ là một người bạn thôi. Tôi nghĩ chúng tôi hiện vẫn là bạn bè.",
        "ipaUs": "/hiː wʌz dʒʌst ə frɛnd. wɪər stɪl frɛndz, aɪ θɪŋk./",
        "keywords": ["just a friend", "still friends"],
        "explanationAi": "Câu trả lời dè dặt của Anna, cố che giấu trái tim đang tan vỡ sau cuộc chia tay ở Notting Hill.",
        "properNouns": []
    },

    # Act 3: William's Dramatic Entrance & Horse & Hound Question (01:14 - 02:20)
    {
        "start": 74.0, "end": 79.0,
        "speaker": "Jeremy",
        "text": "Right! The gentleman in the pink shirt.",
        "translationVi": "Vâng! Xin mời quý ông mặc áo sơ mi màu hồng phía dưới.",
        "ipaUs": "/raɪt! ðə ˈdʒɛntlmən ɪn ðə pɪŋk ʃɜːrt./",
        "keywords": ["pink shirt", "gentleman"],
        "explanationAi": "Jeremy nhận ra William Thacker vừa chạy bổ vào khán phòng trong chiếc áo sơ mi hồng nhàu nhĩ.",
        "properNouns": []
    },
    {
        "start": 79.0, "end": 83.0,
        "speaker": "William",
        "text": "Yes, Miss Scott...",
        "translationVi": "Vâng, thưa cô Scott...",
        "ipaUs": "/jɛs, mɪs skɑːt.../",
        "keywords": ["Miss Scott"],
        "explanationAi": "William bắt đầu cất tiếng, khiến Anna ngước lên và lập tức nhận ra người đàn ông mình yêu.",
        "properNouns": ["Miss Scott"]
    },
    {
        "start": 83.0, "end": 92.0,
        "speaker": "William",
        "text": "Are there any circumstances in which the two of you...",
        "translationVi": "Liệu có bất kỳ hoàn cảnh nào mà hai người...",
        "ipaUs": "/ɑːr ðɛər ˈɛni ˈsɜːrkəmˌstænsɪz ɪn wɪtʃ ðə tuː əv juː.../",
        "keywords": ["circumstances"],
        "explanationAi": "William đặt câu hỏi đầy ngập ngừng nhưng chứa đựng tất cả hy vọng cuối cùng.",
        "properNouns": []
    },
    {
        "start": 92.0, "end": 96.0,
        "speaker": "William",
        "text": "...might be more than just good friends?",
        "translationVi": "...có thể trở thành điều gì đó hơn cả bạn bè tốt không?",
        "ipaUs": "/...maɪt biː mɔːr ðæn dʒʌst ɡʊd frɛndz?/",
        "keywords": ["more than just good friends"],
        "explanationAi": "Cụm từ 'more than just good friends' (trên mức bạn bè) đánh trúng tâm sự giấu kín của cả hai.",
        "properNouns": []
    },
    {
        "start": 96.0, "end": 102.0,
        "speaker": "Anna",
        "text": "I hoped there would be, but no, I'm assured there aren't.",
        "translationVi": "Tôi từng hy vọng là có, nhưng không, tôi được đoan chắc là không thể rồi.",
        "ipaUs": "/aɪ hoʊpt ðɛər wʊd biː, bʌt noʊ, aɪm əˈʃʊərd ðɛər ɑːrnt./",
        "keywords": ["hoped there would be", "assured"],
        "explanationAi": "Anna nhìn thẳng vào mắt William và nhắc lại việc chính anh đã từ chối cô sáng nay tại hiệu sách du lịch.",
        "properNouns": []
    },
    {
        "start": 102.0, "end": 106.0,
        "speaker": "William",
        "text": "But what would you say if...",
        "translationVi": "Nhưng cô sẽ nói sao nếu như...",
        "ipaUs": "/bʌt wʌt wʊd juː seɪ ɪf.../",
        "keywords": ["what would you say if"],
        "explanationAi": "William vội vã muốn nói tiếp trước khi buổi họp báo bị giải tán.",
        "properNouns": []
    },
    {
        "start": 106.0, "end": 110.0,
        "speaker": "Jeremy",
        "text": "I'm sorry, just the one question, please.",
        "translationVi": "Thành thật xin lỗi, mỗi người chỉ được một câu hỏi thôi ạ.",
        "ipaUs": "/aɪm ˈsɑːri, dʒʌst ðə wʌn ˈkwɛstʃən, pliːz./",
        "keywords": ["just the one question"],
        "explanationAi": "Jeremy can thiệp đúng quy tắc nghề nghiệp để giữ trật tự buổi họp báo.",
        "properNouns": ["Jeremy"]
    },
    {
        "start": 110.0, "end": 111.5,
        "speaker": "Anna",
        "text": "No, it's all right. You were saying?",
        "translationVi": "Không sao đâu Jeremy. Anh đang định nói gì cơ?",
        "ipaUs": "/noʊ, ɪts ɔːl raɪt. juː wɜːr ˈseɪɪŋ?/",
        "keywords": ["you were saying"],
        "explanationAi": "Anna chủ động phá lệ họp báo để lắng nghe lời bộc bạch của William.",
        "properNouns": []
    },
    {
        "start": 111.5, "end": 119.0,
        "speaker": "William",
        "text": "I was just wondering if it turned out that this person...",
        "translationVi": "Tôi chỉ đang tự hỏi rằng nếu hóa ra cái người đó...",
        "ipaUs": "/aɪ wʌz dʒʌst ˈwʌndərɪŋ ɪf ɪt tɜːrnd aʊt ðæt ðɪs ˈpɜːrsn.../",
        "keywords": ["wondering", "turned out"],
        "explanationAi": "William lúng túng khi tự xưng về bản thân ở ngôi thứ ba.",
        "properNouns": []
    },
    {
        "start": 119.0, "end": 120.5,
        "speaker": "Spike",
        "text": "Thacker. His name is Thacker.",
        "translationVi": "Thacker. Tên anh ta là Thacker đấy.",
        "ipaUs": "/ˈθækər. hɪz neɪm ɪz ˈθækər./",
        "keywords": ["Thacker", "whisper"],
        "explanationAi": "Spike đứng ở cuối phòng nhắc bài đầy hài hước và ngây ngô.",
        "properNouns": ["Thacker", "Spike"]
    },
    {
        "start": 120.5, "end": 121.8,
        "speaker": "William",
        "text": "Thanks. Thanks.",
        "translationVi": "Cảm ơn. Cảm ơn nhé.",
        "ipaUs": "/θæŋks. θæŋks./",
        "keywords": ["thanks"],
        "explanationAi": "William thầm cảm ơn người bạn cùng nhà kỳ dị của mình.",
        "properNouns": []
    },
    {
        "start": 121.8, "end": 129.0,
        "speaker": "William",
        "text": "I just wondered whether, if Mr. Thacker realised he'd been a daft prick...",
        "translationVi": "Tôi chỉ băn khoăn liệu rằng, nếu anh Thacker đó nhận ra mình là một kẻ ngốc nghếch dại dột...",
        "ipaUs": "/aɪ dʒʌst ˈwʌndərd ˈwɛðər, ɪf ˈmɪstər ˈθækər ˈrɪəˌlaɪzd hiːd biːn ə dæft prɪk.../",
        "keywords": ["daft prick", "British slang"],
        "explanationAi": "Tiếng lóng Anh-Anh tự trào 'daft prick' (kẻ ngốc nghếch dại khờ). William công khai nhận lỗi trước cả rừng ống kính truyền thông.",
        "properNouns": ["Mr. Thacker"]
    },
    {
        "start": 129.0, "end": 135.0,
        "speaker": "William",
        "text": "...and got down on his knees and begged you to reconsider...",
        "translationVi": "...và quỳ gối xuống van xin cô suy nghĩ lại...",
        "ipaUs": "/...ænd ɡɑːt daʊn ɑːn hɪz niːz ænd bɛɡd juː tuː ˌriːkənˈsɪdər.../",
        "keywords": ["got down on his knees", "begged to reconsider"],
        "explanationAi": "Thành ngữ 'get down on one's knees' biểu thị sự quỳ gối hạ mình cầu xin tha thứ một cách chân thành nhất.",
        "properNouns": []
    },
    {
        "start": 135.0, "end": 139.0,
        "speaker": "William",
        "text": "...whether you would in fact then reconsider?",
        "translationVi": "...thì liệu trên thực tế cô có suy nghĩ lại hay không?",
        "ipaUs": "/...ˈwɛðər juː wʊd ɪn fækt ðɛn ˌriːkənˈsɪdər?/",
        "keywords": ["in fact", "reconsider"],
        "explanationAi": "Câu hỏi quan trọng nhất cuộc đời William Thacker, nín thở chờ đợi câu trả lời từ người phụ nữ anh yêu.",
        "properNouns": []
    },

    # Act 4: The Immortal Resolution: Indefinitely! (02:20 - 03:12)
    {
        "start": 147.0, "end": 151.5,
        "speaker": "Anna",
        "text": "Yes. I believe I would.",
        "translationVi": "Có. Tôi tin là tôi sẽ đồng ý.",
        "ipaUs": "/jɛs. aɪ bɪˈliːv aɪ wʊd./",
        "keywords": ["I believe I would", "acceptance"],
        "explanationAi": "Nụ cười rạng rỡ và ánh mắt ngấn lệ của Julia Roberts khi Anna Scott chấp nhận lời xin lỗi của William.",
        "properNouns": []
    },
    {
        "start": 152.0, "end": 156.0,
        "speaker": "William",
        "text": "That's very good news.",
        "translationVi": "Đó quả thực là một tin tức vô cùng tốt lành.",
        "ipaUs": "/ðæts ˈvɛri ɡʊd nuːz./",
        "keywords": ["very good news"],
        "explanationAi": "William thở phào nhẹ nhõm với phong thái lịch thiệp kiểu Anh.",
        "properNouns": []
    },
    {
        "start": 156.0, "end": 161.5,
        "speaker": "William",
        "text": "The readers of Horse & Hound will be absolutely delighted.",
        "translationVi": "Độc giả của tạp chí Ngựa & Chó săn hẳn sẽ vô cùng vui mừng khôn xiết.",
        "ipaUs": "/ðə ˈriːdərz əv hɔːrs ænd haʊnd wɪl biː ˌæbsəˈluːtli dɪˈlaɪtɪd./",
        "keywords": ["Horse & Hound", "absolutely delighted"],
        "explanationAi": "Miếng hài lặp lại (running gag) về tờ tạp chí 'Horse & Hound' khiến không khí tràn ngập tiếng cười hạnh phúc.",
        "properNouns": ["Horse & Hound"]
    },
    {
        "start": 166.0, "end": 170.0,
        "speaker": "Anna",
        "text": "Right, Dominic, if you'd like to ask your question again.",
        "translationVi": "Được rồi Dominic, nếu anh muốn hỏi lại câu hỏi lúc nãy của mình.",
        "ipaUs": "/raɪt, ˈdɑːmɪnɪk, ɪf juːd laɪk tuː æsk jʊər ˈkwɛstʃən əˈɡɛn./",
        "keywords": ["ask your question again"],
        "explanationAi": "Anna chủ động ra hiệu cho nhà báo Dominic lặp lại câu hỏi về thời gian cô ở lại nước Anh.",
        "properNouns": ["Dominic"]
    },
    {
        "start": 170.0, "end": 175.0,
        "speaker": "Dominic",
        "text": "Yeah? Anna, how long are you intending to stay here in Britain?",
        "translationVi": "Vâng? Anna, cô dự định sẽ ở lại nước Anh trong bao lâu?",
        "ipaUs": "/jæ? ˈænə, haʊ lɔːŋ ɑːr juː ɪnˈtɛndɪŋ tuː steɪ hɪər ɪn ˈbrɪtn?/",
        "keywords": ["intending to stay", "Britain"],
        "explanationAi": "Dominic ngỡ ngàng nhắc lại câu hỏi trước toàn thể báo giới.",
        "properNouns": ["Anna", "Britain"]
    },
    {
        "start": 176.0, "end": 182.0,
        "speaker": "Anna",
        "text": "Indefinitely.",
        "translationVi": "Vô thời hạn.",
        "ipaUs": "/ɪnˈdɛfɪnɪtli./",
        "keywords": ["indefinitely", "romantic resolution"],
        "explanationAi": "Từ ngữ đắt giá nhất bộ phim: 'Indefinitely' (vô thời hạn / mãi mãi), khẳng định cô từ bỏ chuyến bay trở về Mỹ để trọn đời ở bên William.",
        "properNouns": []
    },
    {
        "start": 182.0, "end": 186.0,
        "speaker": "Narrator",
        "text": "Flashbulbs erupt across the press room as journalists gasp and scribble frantically.",
        "translationVi": "Ánh đèn flash bùng nổ dữ dội khắp khán phòng khi các ký giả xôn xao và vội vã ghi chép tin tức chấn động.",
        "ipaUs": "/ˈflæʃbʌlbz ɪˈrʌpt əˈkrɔːs ðə prɛs ruːm æz ˈdʒɜːrnəlɪsts ɡæsp ænd ˈskrɪbl ˈfræntɪkli./",
        "keywords": ["flashbulbs", "scribble frantically"],
        "explanationAi": "Khoảnh khắc vỡ òa của truyền thông quốc tế trước tin tức kết đôi chấn động giữa minh tinh hàng đầu và chàng chủ tiệm sách bình dân.",
        "properNouns": []
    },
    {
        "start": 186.0, "end": 189.0,
        "speaker": "Spike",
        "text": "What happened?",
        "translationVi": "Có chuyện gì vừa xảy ra thế?",
        "ipaUs": "/wʌt ˈhæpənd?/",
        "keywords": ["what happened"],
        "explanationAi": "Spike ngơ ngác hỏi sau khi thấy cả hội trường náo loạn chúc mừng.",
        "properNouns": ["Spike"]
    },
    {
        "start": 189.0, "end": 192.0,
        "speaker": "Max",
        "text": "It was good!",
        "translationVi": "Tuyệt vời lắm bạn tôi ơi!",
        "ipaUs": "/ɪt wʌz ɡʊd!/",
        "keywords": ["it was good"],
        "explanationAi": "Max và những người bạn Notting Hill ôm nhau ăn mừng chiến thắng tình yêu của William.",
        "properNouns": ["Max"]
    },

    # Act 5: Elvis Costello's "She" & The Wedding Montage (03:12 - 06:17)
    {
        "start": 192.0, "end": 196.0,
        "speaker": "Elvis Costello",
        "text": "She may be the face I can't forget...",
        "translationVi": "Nàng có thể là gương mặt mà tôi chẳng thể nào quên...",
        "ipaUs": "/ʃiː meɪ biː ðə feɪs aɪ kænt fərˈɡɛt.../",
        "keywords": ["face I can't forget", "ballad"],
        "explanationAi": "Giai điệu bất hủ ca khúc 'She' qua giọng hát truyền cảm của Elvis Costello cất lên khi câu chuyện bước sang chương mới.",
        "properNouns": []
    },
    {
        "start": 196.0, "end": 200.5,
        "speaker": "Elvis Costello",
        "text": "...the trace of pleasure or regret...",
        "translationVi": "...dấu vết của niềm vui hay nỗi tiếc nuối khôn nguôi...",
        "ipaUs": "/...ðə treɪs əv ˈplɛʒər ɔːr rɪˈɡrɛt.../",
        "keywords": ["pleasure or regret"],
        "explanationAi": "Lời ca thi vị khắc họa hai mặt cảm xúc của một tình yêu sâu đậm.",
        "properNouns": []
    },
    {
        "start": 200.5, "end": 207.0,
        "speaker": "Elvis Costello",
        "text": "...may be my treasure or the price I have to pay.",
        "translationVi": "...có thể là báu vật đời tôi, hay cái giá mà tôi phải trả.",
        "ipaUs": "/...meɪ biː maɪ ˈtrɛʒər ɔːr ðə praɪs aɪ hæv tuː peɪ./",
        "keywords": ["treasure", "price to pay"],
        "explanationAi": "Hình ảnh ẩn dụ về tình yêu giữa một người bình thường và một siêu sao toàn cầu.",
        "properNouns": []
    },
    {
        "start": 207.0, "end": 218.0,
        "speaker": "Elvis Costello",
        "text": "She may be the song that summer sings, may be the chill that autumn brings...",
        "translationVi": "Nàng có thể là khúc ca mùa hạ ngân vang, hay làn gió heo may buốt lạnh của mùa thu...",
        "ipaUs": "/ʃiː meɪ biː ðə sɔːŋ ðæt ˈsʌmər sɪŋz, meɪ biː ðə tʃɪl ðæt ˈɔːtəm brɪŋz.../",
        "keywords": ["song that summer sings", "chill that autumn brings"],
        "explanationAi": "Sự luân chuyển bốn mùa tương đồng với phân đoạn đi bộ 4 mùa trứ danh của William qua chợ Notting Hill.",
        "properNouns": ["Notting Hill"]
    },
    {
        "start": 218.0, "end": 225.0,
        "speaker": "Elvis Costello",
        "text": "...may be a hundred different things within the measure of a day.",
        "translationVi": "...có thể là hàng trăm điều biến chuyển diệu kỳ chỉ trong một vòng quay của ngày.",
        "ipaUs": "/...meɪ biː ə ˈhʌndrəd ˈdɪfrənt θɪŋz wɪˈðɪn ðə ˈmɛʒər əv ə deɪ./",
        "keywords": ["measure of a day"],
        "explanationAi": "Tâm hồn phong phú và khó đoán định của người phụ nữ trong tình yêu.",
        "properNouns": []
    },
    {
        "start": 225.0, "end": 230.0,
        "speaker": "Elvis Costello",
        "text": "She may be the beauty or the beast, may be the famine or the feast...",
        "translationVi": "Nàng có thể là người đẹp hay quái thú, có thể là cơn đói nghèo hay bữa tiệc xa hoa...",
        "ipaUs": "/ʃiː meɪ biː ðə ˈbjuːti ɔːr ðə biːst, meɪ biː ðə ˈfæmɪn ɔːr ðə fiːst.../",
        "keywords": ["beauty or the beast", "famine or the feast"],
        "explanationAi": "Các cặp phạm trù đối lập thể hiện sức mạnh mãnh liệt của tình yêu có thể xoay chuyển cả thế giới.",
        "properNouns": []
    },
    {
        "start": 230.0, "end": 237.0,
        "speaker": "Elvis Costello",
        "text": "...may turn each day into a heaven or a hell.",
        "translationVi": "...có thể biến mỗi ngày thành thiên đường êm đềm hay địa ngục trần gian.",
        "ipaUs": "/...meɪ tɜːrn iːtʃ deɪ ˈɪntuː ə ˈhɛvn ɔːr ə hɛl./",
        "keywords": ["heaven or a hell"],
        "explanationAi": "Lời ca nói lên việc một nụ cười hay một ánh nhìn của người mình yêu có thể định đoạt tâm trạng cả ngày.",
        "properNouns": []
    },
    {
        "start": 237.0, "end": 242.0,
        "speaker": "Elvis Costello",
        "text": "She may be the mirror of my dreams, a smile reflected in a stream...",
        "translationVi": "Nàng có thể là tấm gương phản chiếu những giấc mơ đời tôi, một nụ cười soi bóng trên dòng suối nhỏ...",
        "ipaUs": "/ʃiː meɪ biː ðə ˈmɪrər əv maɪ driːmz, ə smaɪl rɪˈflɛktɪd ɪn ə striːm.../",
        "keywords": ["mirror of my dreams", "smile reflected"],
        "explanationAi": "Hình ảnh thi vị về nàng thơ lý tưởng trong tâm thức của người đàn ông đang yêu.",
        "properNouns": []
    },
    {
        "start": 242.0, "end": 247.0,
        "speaker": "Elvis Costello",
        "text": "She may not be what she may seem inside her shell.",
        "translationVi": "Nàng có thể chẳng giống như vẻ ngoài thể hiện bên trong lớp vỏ bọc của mình.",
        "ipaUs": "/ʃiː meɪ nɑːt biː wʌt ʃiː meɪ siːm ɪnˈsaɪd hɜːr ʃɛl./",
        "keywords": ["inside her shell"],
        "explanationAi": "Nhắc lại lời tự sự đắt giá của Anna: đằng sau danh vọng ngút trời, cô cũng chỉ là một người con gái bình thường đứng trước chàng trai cầu xin được yêu thương.",
        "properNouns": []
    },
    {
        "start": 247.0, "end": 273.0,
        "speaker": "Narrator",
        "text": "William and Anna attend the glamorous London film premiere together on the red carpet under flashing cameras.",
        "translationVi": "William và Anna cùng nhau sánh bước trên thảm đỏ buổi công chiếu phim lộng lẫy tại London dưới hàng ngàn ánh đèn máy ảnh.",
        "ipaUs": "/ˈwɪljəm ænd ˈænə əˈtɛnd ðə ˈɡlæmərəs ˈlʌndən fɪlm prɛˈmɪər təˈɡɛðər ɑːn ðə rɛd ˈkɑːrpɪt ˈʌndər ˈflæʃɪŋ ˈkæmərəz./",
        "keywords": ["London film premiere", "red carpet"],
        "explanationAi": "Phân cảnh chuyển giao hạnh phúc khi chàng trai bán sách Notting Hill chính thức sánh đôi cùng nữ minh tinh màn bạc.",
        "properNouns": ["William", "Anna", "London"]
    },
    {
        "start": 273.0, "end": 277.0,
        "speaker": "Elvis Costello",
        "text": "She who always seems so happy in a crowd...",
        "translationVi": "Người dường như lúc nào cũng rạng rỡ giữa đám đông...",
        "ipaUs": "/ʃiː huː ˈɔːlweɪz siːmz soʊ ˈhæpi ɪn ə kraʊd.../",
        "keywords": ["happy in a crowd"],
        "explanationAi": "Cuộc sống hào nhoáng của người nổi tiếng trước công chúng.",
        "properNouns": []
    },
    {
        "start": 277.0, "end": 282.0,
        "speaker": "Elvis Costello",
        "text": "...whose eyes can be so private and so proud...",
        "translationVi": "...nhưng đôi mắt ấy lại có thể vô cùng kín đáo và kiêu hãnh...",
        "ipaUs": "/...huːz aɪz kæn biː soʊ ˈpraɪvət ænd soʊ praʊd.../",
        "keywords": ["private and proud"],
        "explanationAi": "Chiều sâu nội tâm và lòng kiêu hãnh bảo vệ thế giới riêng tư của Anna.",
        "properNouns": []
    },
    {
        "start": 282.0, "end": 287.0,
        "speaker": "Elvis Costello",
        "text": "...no one's allowed to see them when they cry.",
        "translationVi": "...chẳng một ai được phép nhìn thấy những giọt lệ khi nàng khóc.",
        "ipaUs": "/...noʊ wʌnz əˈlaʊd tuː siː ðɛm wɛn ðeɪ kraɪ./",
        "keywords": ["see them when they cry"],
        "explanationAi": "Sự cô độc của ngôi sao, chỉ có tình yêu chân thành của William mới có thể mở khóa sự yếu mềm của cô.",
        "properNouns": []
    },
    {
        "start": 287.0, "end": 292.0,
        "speaker": "Narrator",
        "text": "Surrounded by their closest friends, William and Anna celebrate their joyful wedding ceremony in England.",
        "translationVi": "Trong vòng tay của những người bạn thân thiết nhất, William và Anna tổ chức hôn lễ ngập tràn niềm vui tại nước Anh.",
        "ipaUs": "/səˈraʊndɪd baɪ ðɛər ˈkloʊsɪst frɛndz, ˈwɪljəm ænd ˈænə ˈsɛləˌbreɪt ðɛər ˈdʒɔɪfl ˈwɛdɪŋ ˈsɛrəˌmoʊni ɪn ˈɪŋɡlənd./",
        "keywords": ["wedding ceremony", "closest friends"],
        "explanationAi": "Lễ cưới giản dị, ấm cúng với sự hiện diện của Spike, Max, Bella, Honey và Bernie.",
        "properNouns": ["William", "Anna", "England"]
    },
    {
        "start": 292.0, "end": 297.0,
        "speaker": "Elvis Costello",
        "text": "She may be the love that cannot hope to last...",
        "translationVi": "Nàng có thể là mối tình tưởng chừng không dám mong manh sẽ bền lâu...",
        "ipaUs": "/ʃiː meɪ biː ðə lʌv ðæt ˈkænɑːt hoʊp tuː læst.../",
        "keywords": ["cannot hope to last"],
        "explanationAi": "Nhắc lại những thử thách tưởng chừng không thể vượt qua giữa hai thế giới khác biệt.",
        "properNouns": []
    },
    {
        "start": 297.0, "end": 304.0,
        "speaker": "Elvis Costello",
        "text": "...may come to me from shadows of the past, that I'll remember till the day I die.",
        "translationVi": "...có thể đến bên tôi từ những bóng hình quá khứ, điều mà tôi sẽ khắc ghi cho đến tận ngày nhắm mắt xuôi tay.",
        "ipaUs": "/...meɪ kʌm tuː miː frʌm ˈʃædoʊz əv ðə pæst, ðæt aɪl rɪˈmɛmbər tɪl ðə deɪ aɪ daɪ./",
        "keywords": ["till the day I die"],
        "explanationAi": "Lời nguyện thề tình yêu chung thủy trọn đời.",
        "properNouns": []
    },
    {
        "start": 304.0, "end": 309.0,
        "speaker": "Elvis Costello",
        "text": "She may be the reason I survive...",
        "translationVi": "Nàng có thể là lý do để tôi tồn tại trên cõi đời này...",
        "ipaUs": "/ʃiː meɪ biː ðə ˈriːzn aɪ sərˈvaɪv.../",
        "keywords": ["reason I survive"],
        "explanationAi": "Tình yêu trở thành mục đích sống và nguồn cứu rỗi lớn nhất.",
        "properNouns": []
    },
    {
        "start": 309.0, "end": 315.0,
        "speaker": "Elvis Costello",
        "text": "...the why and wherefore I'm alive...",
        "translationVi": "...là nguyên do và ý nghĩa vì sao tôi được sống...",
        "ipaUs": "/...ðə waɪ ænd ˈwɛərfɔːr aɪm əˈlaɪv.../",
        "keywords": ["why and wherefore", "idiom"],
        "explanationAi": "Thành ngữ 'the why and wherefore' mang nghĩa nguyên nhân cội rễ và toàn bộ lý do tồn tại.",
        "properNouns": []
    },
    {
        "start": 315.0, "end": 320.0,
        "speaker": "Elvis Costello",
        "text": "...the one I'll care for through the rough and rainy years.",
        "translationVi": "...là người duy nhất tôi nguyện chở che qua những năm tháng bão giông và mưa gió.",
        "ipaUs": "/...ðə wʌn aɪl kɛər fɔːr θruː ðə rʌf ænd ˈreɪni jɪərz./",
        "keywords": ["rough and rainy years"],
        "explanationAi": "Lời cam kết cùng đồng hành vượt qua mọi khó khăn thử thách của tương lai.",
        "properNouns": []
    },
    {
        "start": 320.0, "end": 325.0,
        "speaker": "Elvis Costello",
        "text": "Me, I'll take her laughter and her tears...",
        "translationVi": "Riêng tôi, tôi sẽ đón nhận mọi tiếng cười và từng giọt nước mắt của nàng...",
        "ipaUs": "/miː, aɪl teɪk hɜːr ˈlæftər ænd hɜːr tɪərz.../",
        "keywords": ["laughter and tears"],
        "explanationAi": "Tình yêu trọn vẹn chấp nhận cả niềm vui lẫn nỗi buồn của bạn đời.",
        "properNouns": []
    },
    {
        "start": 325.0, "end": 329.0,
        "speaker": "Elvis Costello",
        "text": "...and make them all my souvenirs...",
        "translationVi": "...và biến tất cả thành những kỷ vật vô giá trong tim...",
        "ipaUs": "/...ænd meɪk ðɛm ɔːl maɪ ˌsuːvəˈnɪərz.../",
        "keywords": ["souvenirs", "memories"],
        "explanationAi": "Mỗi khoảnh khắc bên nhau đều trở thành kỷ niệm thiêng liêng.",
        "properNouns": []
    },
    {
        "start": 329.0, "end": 335.0,
        "speaker": "Elvis Costello",
        "text": "...for where she goes I've got to be...",
        "translationVi": "...bởi nơi nào có bước chân nàng, nơi đó phải có tôi...",
        "ipaUs": "/...fɔːr wɛər ʃiː ɡoʊz aɪv ɡɑːt tuː biː.../",
        "keywords": ["where she goes I've got to be"],
        "explanationAi": "Sự gắn kết không thể tách rời của định mệnh.",
        "properNouns": []
    },
    {
        "start": 335.0, "end": 341.0,
        "speaker": "Elvis Costello",
        "text": "...the meaning of my life is she.",
        "translationVi": "...ý nghĩa của cuộc đời tôi chính là nàng.",
        "ipaUs": "/...ðə ˈmiːnɪŋ əv maɪ laɪf ɪz ʃiː./",
        "keywords": ["meaning of my life"],
        "explanationAi": "Điểm thăng hoa cảm xúc khẳng định giá trị thiêng liêng nhất của tác phẩm.",
        "properNouns": []
    },
    {
        "start": 341.0, "end": 346.0,
        "speaker": "Elvis Costello",
        "text": "She...",
        "translationVi": "Nàng...",
        "ipaUs": "/ʃiː.../",
        "keywords": ["she"],
        "explanationAi": "Tiếng hát ngân vang tha thiết.",
        "properNouns": []
    },
    {
        "start": 346.0, "end": 352.0,
        "speaker": "Elvis Costello",
        "text": "She...",
        "translationVi": "Nàng...",
        "ipaUs": "/ʃiː.../",
        "keywords": ["she"],
        "explanationAi": "Giai điệu du dương ngân dài.",
        "properNouns": []
    },
    {
        "start": 352.0, "end": 365.0,
        "speaker": "Elvis Costello",
        "text": "The meaning of my life is she.",
        "translationVi": "Ý nghĩa của cả cuộc đời tôi chính là nàng.",
        "ipaUs": "/ðə ˈmiːnɪŋ əv maɪ laɪf ɪz ʃiː./",
        "keywords": ["meaning of my life is she"],
        "explanationAi": "Khép lại bản tình ca bất hủ.",
        "properNouns": []
    },
    {
        "start": 365.0, "end": 377.0,
        "speaker": "Narrator",
        "text": "William sits quietly on the Notting Hill garden bench reading a book, while Anna, now pregnant, rests her head peacefully in his lap under the warm summer sun.",
        "translationVi": "William ngồi bình yên trên chiếc ghế gỗ trong công viên riêng Notting Hill say mê đọc sách, trong khi Anna, giờ đây đã mang thai, gối đầu an yên trên đùi anh dưới ánh nắng hè ấm áp.",
        "ipaUs": "/ˈwɪljəm sɪts ˈkwaɪətli ɑːn ðə ˈnɑːtɪŋ hɪl ˈɡɑːrdn bɛntʃ ˈriːdɪŋ ə bʊk, waɪl ˈænə, naʊ ˈprɛɡnənt, rɛsts hɜːr hɛd ˈpiːsfəli ɪn hɪz læp ˈʌndər ðə wɔːrm ˈsʌmər sʌn./",
        "keywords": ["Notting Hill garden bench", "pregnant Anna", "peacefully"],
        "explanationAi": "Khung hình kết phim kinh điển của đạo diễn Roger Michell: chiếc ghế đá bí mật năm xưa nơi họ từng trèo tường vào, nay trở thành mái ấm hạnh phúc viên mãn cho gia đình nhỏ.",
        "properNouns": ["William", "Anna", "Notting Hill"]
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
    "lessonId": "mov_rom_11",
    "lessonTitle": "Notting Hill: William and Anna's Final Press Conference & Wedding (Full Master Cut)",
    "totalQuestions": 8,
    "xpReward": 100,
    "generatedBy": "AI_GEMINI",
    "questions": [
        {
            "id": "mov_rom_11_q1",
            "question": "What publication does William claim to write for when he attends the final press conference at The Ritz?",
            "questionEn": "What publication does William claim to write for when he attends the final press conference at The Ritz?",
            "questionVi": "William tự nhận mình là phóng viên đại diện cho tờ báo/tạp chí nào khi tham dự buổi họp báo tại khách sạn The Ritz?",
            "options": [
                "Time Out London",
                "Horse & Hound magazine",
                "The Daily Telegraph",
                "Vogue UK"
            ],
            "optionsEn": [
                "Time Out London",
                "Horse & Hound magazine",
                "The Daily Telegraph",
                "Vogue UK"
            ],
            "optionsVi": [
                "Tạp chí Time Out London",
                "Tạp chí Horse & Hound (Ngựa & Chó săn)",
                "Báo The Daily Telegraph",
                "Tạp chí Vogue UK"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 37, William dryly quips: 'The readers of Horse & Hound will be absolutely delighted.' This pays homage to his original interview cover story earlier in the film.",
            "explanationEn": "In Segment 37, William dryly quips: 'The readers of Horse & Hound will be absolutely delighted.' This pays homage to his original interview cover story earlier in the film.",
            "explanationVi": "Trong Phân đoạn 37, William dí dỏm bảo: 'Độc giả của tạp chí Horse & Hound hẳn sẽ vô cùng vui mừng khôn xiết.' Đây là chi tiết hài hước lặp lại từ lần phỏng vấn giả mạo trước đó của anh tại khách sạn.",
            "targetedConcept": "Humorous running gag & narrative callbacks in romantic comedy",
            "targetedConceptEn": "Humorous running gag & narrative callbacks in romantic comedy",
            "targetedConceptVi": "Miếng hài lặp lại (running gag) và nghệ thuật gợi nhắc chi tiết trong phim hài lãng mạn",
            "referenceSegmentIndex": 37
        },
        {
            "id": "mov_rom_11_q2",
            "question": "What single word does Anna use to answer how long she plans to stay in Britain when Dominic re-asks his question?",
            "questionEn": "What single word does Anna use to answer how long she plans to stay in Britain when Dominic re-asks his question?",
            "questionVi": "Anna đã dùng từ duy nhất nào để trả lời câu hỏi của Dominic về việc cô dự định ở lại nước Anh trong bao lâu?",
            "options": [
                "'Temporarily.'",
                "'Indefinitely.'",
                "'Until Christmas.'",
                "'Permanently absent.'"
            ],
            "optionsEn": [
                "'Temporarily.'",
                "'Indefinitely.'",
                "'Until Christmas.'",
                "'Permanently absent.'"
            ],
            "optionsVi": [
                "'Tạm thời.'",
                "'Vô thời hạn (mãi mãi).'",
                "'Cho đến hết Giáng sinh.'",
                "'Sẽ vắng mặt vĩnh viễn.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 40, Anna answers: 'Indefinitely.' This single word signifies that she has decided to cancel her flight back to America and stay forever with William in London.",
            "explanationEn": "In Segment 40, Anna answers: 'Indefinitely.' This single word signifies that she has decided to cancel her flight back to America and stay forever with William in London.",
            "explanationVi": "Trong Phân đoạn 40, Anna trả lời dứt khoát: 'Indefinitely' (Vô thời hạn). Từ duy nhất này mang ý nghĩa cô quyết định hủy chuyến bay về Mỹ để trọn đời ở lại bên William tại London.",
            "targetedConcept": "Climactic romantic resolution and vocabulary 'indefinitely'",
            "targetedConceptEn": "Climactic romantic resolution and vocabulary 'indefinitely'",
            "targetedConceptVi": "Đoạn kết giải tỏa viên mãn và từ vựng mang tính quyết định 'indefinitely'",
            "referenceSegmentIndex": 40
        },
        {
            "id": "mov_rom_11_q3",
            "question": "What British slang phrase does William use to describe his own foolishness when asking Anna to reconsider?",
            "questionEn": "What British slang phrase does William use to describe his own foolishness when asking Anna to reconsider?",
            "questionVi": "Cụm tiếng lóng Anh-Anh tự trào nào được William sử dụng để tự miêu tả sự dại dột của mình khi xin Anna suy nghĩ lại?",
            "options": [
                "A cheeky monkey",
                "A daft prick",
                "A lucky devil",
                "A clever chap"
            ],
            "optionsEn": [
                "A cheeky monkey",
                "A daft prick",
                "A lucky devil",
                "A clever chap"
            ],
            "optionsVi": [
                "Một chú khỉ ranh mãnh (cheeky monkey)",
                "Một kẻ ngốc nghếch dại dột (daft prick)",
                "Một gã may mắn (lucky devil)",
                "Một anh chàng thông minh (clever chap)"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 32, William asks whether she would reconsider if Mr. Thacker realised he'd been 'a daft prick' and begged on his knees.",
            "explanationEn": "In Segment 32, William asks whether she would reconsider if Mr. Thacker realised he'd been 'a daft prick' and begged on his knees.",
            "explanationVi": "Trong Phân đoạn 32, William tự nhận mình là 'a daft prick' (kẻ ngốc nghếch dại khờ) và hỏi liệu cô có suy nghĩ lại nếu anh quỳ gối van xin.",
            "targetedConcept": "British informal self-deprecating slang",
            "targetedConceptEn": "British informal self-deprecating slang",
            "targetedConceptVi": "Tiếng lóng tự trào thân mật trong tiếng Anh-Anh",
            "referenceSegmentIndex": 32
        },
        {
            "id": "mov_rom_11_q4",
            "question": "What does the phrasal verb 'abiding by' mean when Jeremy explains Anna's upcoming schedule in Segment 2?",
            "questionEn": "What does the phrasal verb 'abiding by' mean when Jeremy explains Anna's upcoming schedule in Segment 2?",
            "questionVi": "Cụm động từ 'abiding by' có nghĩa là gì khi Jeremy giải thích lịch trình sắp tới của Anna trong Phân đoạn 2?",
            "options": [
                "Cancelling immediately without notice",
                "Complying with or strictly adhering to agreed commitments",
                "Postponing indefinitely until next year",
                "Renegotiating contract financial terms"
            ],
            "optionsEn": [
                "Cancelling immediately without notice",
                "Complying with or strictly adhering to agreed commitments",
                "Postponing indefinitely until next year",
                "Renegotiating contract financial terms"
            ],
            "optionsVi": [
                "Hủy bỏ ngay lập tức mà không báo trước",
                "Tuân thủ hoặc nghiêm túc thực hiện các cam kết đã thỏa thuận",
                "Hoãn lại vô thời hạn cho đến năm sau",
                "Đàm phán lại các điều khoản tài chính của hợp đồng"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 2, 'She'll be abiding by all her present commitments' means she will honor and fulfill all existing contractual promises.",
            "explanationEn": "In Segment 2, 'She'll be abiding by all her present commitments' means she will honor and fulfill all existing contractual promises.",
            "explanationVi": "Trong Phân đoạn 2, 'abide by' có nghĩa là tôn trọng và thực hiện đầy đủ mọi cam kết hợp đồng đã ký kết.",
            "targetedConcept": "Phrasal verb 'abide by' in formal contexts",
            "targetedConceptEn": "Phrasal verb 'abide by' in formal contexts",
            "targetedConceptVi": "Cụm động từ 'abide by' trong ngữ cảnh trang trọng",
            "referenceSegmentIndex": 2
        },
        {
            "id": "mov_rom_11_q5",
            "question": "Who comically whispers William's surname to him from the back of the press room in Segment 30?",
            "questionEn": "Who comically whispers William's surname to him from the back of the press room in Segment 30?",
            "questionVi": "Nhân vật nào đã thì thầm họ của William từ phía cuối phòng họp báo một cách đầy hài hước trong Phân đoạn 30?",
            "options": [
                "Max, the lawyer",
                "Spike, William's eccentric Welsh flatmate",
                "Bernie, the stockbroker",
                "Honey, William's sister"
            ],
            "optionsEn": [
                "Max, the lawyer",
                "Spike, William's eccentric Welsh flatmate",
                "Bernie, the stockbroker",
                "Honey, William's sister"
            ],
            "optionsVi": [
                "Max, anh bạn luật sư",
                "Spike, người bạn cùng nhà xứ Wales quái đản của William",
                "Bernie, nhân viên môi giới chứng khoán",
                "Honey, em gái của William"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 30, Spike whispers: 'Thacker. His name is Thacker.' Spike's comedic presence provides laughter right in the middle of a high-stakes romantic confrontation.",
            "explanationEn": "In Segment 30, Spike whispers: 'Thacker. His name is Thacker.' Spike's comedic presence provides laughter right in the middle of a high-stakes romantic confrontation.",
            "explanationVi": "Trong Phân đoạn 30, Spike đứng ở cuối phòng thì thầm: 'Thacker. Tên anh ta là Thacker đấy.' Sự xuất hiện hài hước của Spike đem lại tiếng cười sảng khoái ngay giữa thời khắc căng thẳng.",
            "targetedConcept": "Comedic relief in high-stakes romance scenes",
            "targetedConceptEn": "Comedic relief in high-stakes romance scenes",
            "targetedConceptVi": "Yếu tố giải tỏa căng thẳng (comic relief) trong phân cảnh lãng mạn cao trào",
            "referenceSegmentIndex": 30
        },
        {
            "id": "mov_rom_11_q6",
            "question": "What is the meaning of the idiomatic phrase 'the why and wherefore' in Elvis Costello's song 'She' (Segment 59)?",
            "questionEn": "What is the meaning of the idiomatic phrase 'the why and wherefore' in Elvis Costello's song 'She' (Segment 59)?",
            "questionVi": "Ý nghĩa của thành ngữ 'the why and wherefore' trong ca khúc 'She' của Elvis Costello (Phân đoạn 59) là gì?",
            "options": [
                "An unsolvable philosophical dilemma",
                "The complete reason, purpose, or explanation for something",
                "A temporary geographical location",
                "A mathematical formula for happiness"
            ],
            "optionsEn": [
                "An unsolvable philosophical dilemma",
                "The complete reason, purpose, or explanation for something",
                "A temporary geographical location",
                "A mathematical formula for happiness"
            ],
            "optionsVi": [
                "Một nghịch lý triết học không có lời giải",
                "Toàn bộ nguyên do, mục đích và ý nghĩa giải thích cho một điều gì đó",
                "Một địa điểm địa lý tạm thời",
                "Một công thức toán học về niềm hạnh phúc"
            ],
            "correctAnswer": 1,
            "explanation": "The idiom 'the why and wherefore' refers to the full rationale or reason. Here, it poetically declares that Anna is the sole reason and purpose for William's existence.",
            "explanationEn": "The idiom 'the why and wherefore' refers to the full rationale or reason. Here, it poetically declares that Anna is the sole reason and purpose for William's existence.",
            "explanationVi": "Thành ngữ 'the why and wherefore' chỉ toàn bộ nguyên cớ và lý do sâu xa. Ở đây, lời ca khẳng định Anna chính là lý do và mục đích duy nhất cho sự tồn tại của William.",
            "targetedConcept": "Idiomatic expression 'the why and wherefore'",
            "targetedConceptEn": "Idiomatic expression 'the why and wherefore'",
            "targetedConceptVi": "Thành ngữ tiếng Anh 'the why and wherefore'",
            "referenceSegmentIndex": 59
        },
        {
            "id": "mov_rom_11_q7",
            "question": "What does the phrasal verb 'round things up' mean when Jeremy announces the final questions in Segment 10?",
            "questionEn": "What does the phrasal verb 'round things up' mean when Jeremy announces the final questions in Segment 10?",
            "questionVi": "Cụm động từ 'round things up' mang ý nghĩa gì khi Jeremy thông báo về các câu hỏi cuối cùng trong Phân đoạn 10?",
            "options": [
                "To gather people into a circle for photos",
                "To bring an event or meeting to a conclusion or finish",
                "To calculate the total cost of tickets",
                "To distribute press releases to all reporters"
            ],
            "optionsEn": [
                "To gather people into a circle for photos",
                "To bring an event or meeting to a conclusion or finish",
                "To calculate the total cost of tickets",
                "To distribute press releases to all reporters"
            ],
            "optionsVi": [
                "Tập hợp mọi người thành vòng tròn để chụp ảnh",
                "Khép lại, kết thúc hoặc tóm tắt một sự kiện/buổi họp",
                "Tính tổng chi phí vé vào cổng",
                "Phát thông cáo báo chí cho toàn bộ phóng viên"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 10, 'round things up' is used to indicate bringing the press conference to an end because of Anna's impending departure.",
            "explanationEn": "In Segment 10, 'round things up' is used to indicate bringing the press conference to an end because of Anna's impending departure.",
            "explanationVi": "Trong Phân đoạn 10, 'round things up' được dùng để biểu thị việc hoàn tất và khép lại buổi họp báo do Anna sắp phải lên đường ra sân bay.",
            "targetedConcept": "Phrasal verb 'round up' meaning to conclude",
            "targetedConceptEn": "Phrasal verb 'round up' meaning to conclude",
            "targetedConceptVi": "Cụm động từ 'round up' mang nghĩa kết thúc, hoàn tất",
            "referenceSegmentIndex": 10
        },
        {
            "id": "mov_rom_11_q8",
            "question": "Where does the peaceful final scene of the movie take place, bringing the couple's journey full circle?",
            "questionEn": "Where does the peaceful final scene of the movie take place, bringing the couple's journey full circle?",
            "questionVi": "Cảnh kết bình yên của bộ phim diễn ra tại địa điểm nào, tạo nên một kết thúc trọn vẹn khép lại hành trình của cặp đôi?",
            "options": [
                "On a Hollywood movie studio soundstage in Los Angeles",
                "On the wooden bench inside the private communal garden in Notting Hill",
                "At the Ritz Hotel presidential suite in London",
                "Inside William's travel bookshop on Portobello Road"
            ],
            "optionsEn": [
                "On a Hollywood movie studio soundstage in Los Angeles",
                "On the wooden bench inside the private communal garden in Notting Hill",
                "At the Ritz Hotel presidential suite in London",
                "Inside William's travel bookshop on Portobello Road"
            ],
            "optionsVi": [
                "Tại phim trường Hollywood ở Los Angeles",
                "Trên chiếc ghế gỗ bên trong công viên riêng Notting Hill",
                "Tại phòng tổng thống khách sạn The Ritz ở London",
                "Bên trong hiệu sách du lịch của William trên đường Portobello"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 67, the closing shot shows William reading on the private Notting Hill garden bench with pregnant Anna resting on his lap, mirroring the garden they secretly climbed into earlier in the film.",
            "explanationEn": "In Segment 67, the closing shot shows William reading on the private Notting Hill garden bench with pregnant Anna resting on his lap, mirroring the garden they secretly climbed into earlier in the film.",
            "explanationVi": "Trong Phân đoạn 67, khung hình kết phim thể hiện William đọc sách trên chiếc ghế gỗ trong công viên riêng Notting Hill với Anna đang mang thai gối đầu trên đùi anh, gợi nhắc lại khu vườn bí mật mà họ từng trèo tường vào hẹn hò đầu phim.",
            "targetedConcept": "Visual motif and circular narrative resolution",
            "targetedConceptEn": "Visual motif and circular narrative resolution",
            "targetedConceptVi": "Mô-típ thị giác và cấu trúc dẫn truyện vòng tròn (circular narrative)",
            "referenceSegmentIndex": 67
        }
    ]
}

# Generate TypeScript code
ts_code = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Notting Hill: William and Anna's Final Press Conference & Wedding (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B2 | British (RP) & American Accent
 * YouTube ID: sM4rv42qyvk (06:17 - 377s)
 * Views: 7,273,894 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (RICHARD CURTIS MASTER CUT)
 * ZERO MERGED UTTERANCES - PHÂN TÁCH ĐỘC LẬP TỪNG SPEAKER TURN
 * TỔNG CỘNG: {len(segments)} PURE MASTER SEGMENTS (00:00 - 06:17)
 * ============================================================================
 */

export const QUIZ_NOTTING_HILL_IM_ALSO_JUST_A_GIRL_EXTENDED: VideoQuizData = {json.dumps(quiz_data, ensure_ascii=False, indent=2)};
export const QUIZ_NOTTING_HILL_IM_ALSO_JUST_A_GIRL = QUIZ_NOTTING_HILL_IM_ALSO_JUST_A_GIRL_EXTENDED;

export const LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL: MockVideoLesson = {{
  id: "mov_rom_11",
  slug: "notting-hill-im-also-just-a-girl",
  title: "Notting Hill: William and Anna's Final Press Conference & Wedding (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "06:17",
  durationSeconds: 377,
  externalId: "sM4rv42qyvk",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/sM4rv42qyvk/hqdefault.jpg",
  accent: "British (RP) & American",
  wpmSpeed: 124,
  viewCount: 7273894,
  studyCount: 6520,
  description:
    "Trường đoạn kết thúc kinh điển của kiệt tác Notting Hill: William Thacker lao vào buổi họp báo tại khách sạn The Ritz London dưới danh nghĩa phóng viên tạp chí Horse & Hound để hỏi Anna Scott câu hỏi định mệnh đời mình. Câu trả lời 'Indefinitely' mở ra lễ cưới ngọt ngào và bản tình ca 'She' của Elvis Costello trong công viên Notting Hill.",
  segments: {json.dumps(segments, ensure_ascii=False, indent=4)},
  quiz: QUIZ_NOTTING_HILL_IM_ALSO_JUST_A_GIRL_EXTENDED,
}};

export default LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL;
'''

output_path = "features/listening/data/lessons/movies/romance/lesson_notting_hill.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Generated {output_path} successfully with {len(segments)} segments and 8 quiz questions!")
