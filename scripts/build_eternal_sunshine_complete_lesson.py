import json
import re

# Master segment definitions for Eternal Sunshine: Meet Me in Montauk (mov_rom_10)
# YouTube ID: 9lo1ncSInLI (316s / 05:16)

raw_segments = [
    # Act 1: The Beach Memory Glitch & Echo Loop 1 (00:00 - 00:15)
    {
        "start": 0.0, "end": 2.0,
        "speaker": "Clementine",
        "text": "You married?",
        "translationVi": "Anh đã có gia đình chưa?",
        "ipaUs": "/juː ˈmærid?/",
        "keywords": ["married", "relationship status"],
        "explanationAi": "Clementine mở đầu cuộc trò chuyện đêm muộn trên bãi biển bằng câu hỏi trực diện, phá vỡ mọi khoảng cách xã giao thông thường.",
        "properNouns": []
    },
    {
        "start": 2.0, "end": 4.0,
        "speaker": "Joel",
        "text": "No.",
        "translationVi": "Chưa.",
        "ipaUs": "/noʊ./",
        "keywords": ["no", "single"],
        "explanationAi": "Câu trả lời ngắn gọn, rụt rè đặc trưng của Joel trước sự táo bạo và chủ động của Clementine.",
        "properNouns": []
    },
    {
        "start": 4.0, "end": 6.0,
        "speaker": "Clementine",
        "text": "Let's move into this neighborhood.",
        "translationVi": "Chúng mình dọn về khu này ở đi.",
        "ipaUs": "/lɛts muːv ˈɪntuː ðɪs ˈneɪbərˌhʊd./",
        "keywords": ["move into", "neighborhood"],
        "explanationAi": "Ý tưởng ngẫu hứng, đầy tính nổi loạn của Clementine khi rủ một người đàn ông vừa mới gặp dọn về sống chung.",
        "properNouns": []
    },
    {
        "start": 6.0, "end": 9.0,
        "speaker": "Joel",
        "text": "I used to live with someone though.",
        "translationVi": "Nhưng mà trước đây tôi từng sống chung với một người rồi.",
        "ipaUs": "/aɪ juːzd tuː lɪv wɪð ˈsʌmˌwʌn ðoʊ./",
        "keywords": ["used to live", "past habit"],
        "explanationAi": "Cấu trúc 'used to + V' diễn tả trạng thái trong quá khứ không còn tiếp diễn ở hiện tại, nhắc về người yêu cũ Naomi của Joel.",
        "properNouns": []
    },
    {
        "start": 9.0, "end": 11.0,
        "speaker": "Clementine",
        "text": "Male or female?",
        "translationVi": "Đàn ông hay phụ nữ thế?",
        "ipaUs": "/meɪl ɔːr ˈfiːmeɪl?/",
        "keywords": ["male or female", "gender"],
        "explanationAi": "Clementine thẳng thắn dò hỏi thiên hướng tình dục của Joel một cách hóm hỉnh và không hề ngần ngại.",
        "properNouns": []
    },
    {
        "start": 11.0, "end": 12.0,
        "speaker": "Joel",
        "text": "What?",
        "translationVi": "Cái gì cơ?",
        "ipaUs": "/wʌt?/",
        "keywords": ["what", "surprise"],
        "explanationAi": "Sự ngỡ ngàng tột độ của Joel trước tính cách bộc trực và kỳ lạ của Clementine.",
        "properNouns": []
    },
    {
        "start": 12.0, "end": 13.0,
        "speaker": "Joel",
        "text": "Female.",
        "translationVi": "Phụ nữ.",
        "ipaUs": "/ˈfiːmeɪl./",
        "keywords": ["female"],
        "explanationAi": "Joel xác nhận lại giới tính của bạn gái cũ sau giây phút bối rối.",
        "properNouns": []
    },
    {
        "start": 13.0, "end": 15.0,
        "speaker": "Clementine",
        "text": "Female.",
        "translationVi": "Phụ nữ à.",
        "ipaUs": "/ˈfiːmeɪl./",
        "keywords": ["female", "confirmation"],
        "explanationAi": "Clementine gật đầu lặp lại thông tin như một sự hài lòng ngầm.",
        "properNouns": []
    },

    # Act 2: Memory Glitch & Echo Loop 2 (00:16 - 00:30)
    {
        "start": 16.0, "end": 17.0,
        "speaker": "Clementine",
        "text": "You married?",
        "translationVi": "Anh đã có gia đình chưa?",
        "ipaUs": "/juː ˈmærid?/",
        "keywords": ["memory glitch", "echo"],
        "explanationAi": "Đoạn thoại lặp lại do cỗ máy xóa ký ức của công ty Lacuna đang tua ngược và phá hủy băng ghi dữ liệu thần kinh của Joel.",
        "properNouns": []
    },
    {
        "start": 17.0, "end": 18.0,
        "speaker": "Joel",
        "text": "No.",
        "translationVi": "Chưa.",
        "ipaUs": "/noʊ./",
        "keywords": ["echo"],
        "explanationAi": "Tiếng vọng ký ức bị tua lặp lần thứ hai trong tiềm thức đang phân rã của Joel.",
        "properNouns": []
    },
    {
        "start": 18.0, "end": 21.0,
        "speaker": "Clementine",
        "text": "Let's move into this neighborhood.",
        "translationVi": "Chúng mình dọn về khu này ở đi.",
        "ipaUs": "/lɛts muːv ˈɪntuː ðɪs ˈneɪbərˌhʊd./",
        "keywords": ["move into", "loop"],
        "explanationAi": "Hiện tượng vòng lặp thời gian (temporal loop) trong ký ức điện ảnh của Charlie Kaufman.",
        "properNouns": []
    },
    {
        "start": 21.0, "end": 24.0,
        "speaker": "Joel",
        "text": "I used to live with someone though.",
        "translationVi": "Nhưng mà trước đây tôi từng sống chung với một người rồi.",
        "ipaUs": "/aɪ juːzd tuː lɪv wɪð ˈsʌmˌwʌn ðoʊ./",
        "keywords": ["used to live"],
        "explanationAi": "Ký ức vang lên lần nữa trước khi mạch điện não bộ bị tẩy xóa.",
        "properNouns": []
    },
    {
        "start": 24.0, "end": 25.0,
        "speaker": "Clementine",
        "text": "Male or female?",
        "translationVi": "Đàn ông hay phụ nữ thế?",
        "ipaUs": "/meɪl ɔːr ˈfiːmeɪl?/",
        "keywords": ["gender check"],
        "explanationAi": "Câu hỏi vang lên lần hai trong hồi ức chập chờn.",
        "properNouns": []
    },
    {
        "start": 25.0, "end": 27.0,
        "speaker": "Joel",
        "text": "What?",
        "translationVi": "Cái gì cơ?",
        "ipaUs": "/wʌt?/",
        "keywords": ["what"],
        "explanationAi": "Phản xạ giật mình của Joel trong ký ức.",
        "properNouns": []
    },
    {
        "start": 27.0, "end": 28.0,
        "speaker": "Joel",
        "text": "Female.",
        "translationVi": "Phụ nữ.",
        "ipaUs": "/ˈfiːmeɪl./",
        "keywords": ["female"],
        "explanationAi": "Joel nhắc lại câu trả lời trong tiếng sóng biển.",
        "properNouns": []
    },
    {
        "start": 28.0, "end": 30.0,
        "speaker": "Clementine",
        "text": "Female.",
        "translationVi": "Phụ nữ à.",
        "ipaUs": "/ˈfiːmeɪl./",
        "keywords": ["female"],
        "explanationAi": "Clementine khép lại đoạn lặp và bắt đầu tiến về phía ngôi biệt thự bên bờ biển.",
        "properNouns": []
    },

    # Act 3: The Beach House Break-In (00:30 - 01:17)
    {
        "start": 30.0, "end": 35.0,
        "speaker": "Clementine",
        "text": "At least I'm not barking up the wrong tree.",
        "translationVi": "Ít nhất thì tôi cũng không tán tỉnh nhầm người.",
        "ipaUs": "/æt liːst aɪm nɑːt ˈbɑːrkɪŋ ʌp ðə rɔːŋ triː./",
        "keywords": ["barking up the wrong tree", "idiom"],
        "explanationAi": "Thành ngữ 'barking up the wrong tree' nghĩa là đi nhầm hướng hoặc theo đuổi nhầm đối tượng.",
        "properNouns": []
    },
    {
        "start": 37.0, "end": 39.0,
        "speaker": "Joel",
        "text": "You know these people?",
        "translationVi": "Cô quen biết những người chủ này à?",
        "ipaUs": "/juː noʊ ðiːz ˈpiːpl?/",
        "keywords": ["know these people"],
        "explanationAi": "Joel ngạc nhiên và lo lắng khi thấy Clementine tự nhiên bước lên bậc thềm ngôi nhà đóng kín cửa.",
        "properNouns": []
    },
    {
        "start": 39.0, "end": 41.0,
        "speaker": "Clementine",
        "text": "No, of course not. It's breaking and entering!",
        "translationVi": "Không, dĩ nhiên là không rồi. Chúng mình đang đột nhập gia cư bất hợp pháp đấy!",
        "ipaUs": "/noʊ, əv kɔːrs nɑːt. ɪts ˈbreɪkɪŋ ænd ˈɛntərɪŋ!/",
        "keywords": ["breaking and entering", "crime"],
        "explanationAi": "Thuật ngữ pháp lý 'breaking and entering' (tội đột nhập trái phép vào nhà người khác) được Clementine nói với vẻ vô cùng hào hứng.",
        "properNouns": []
    },
    {
        "start": 41.0, "end": 43.0,
        "speaker": "Clementine",
        "text": "Come on.",
        "translationVi": "Nhanh lên nào.",
        "ipaUs": "/kʌm ɑːn./",
        "keywords": ["come on", "urge"],
        "explanationAi": "Clementine hối thúc Joel cùng cạy chốt cửa sổ để trèo vào trong.",
        "properNouns": []
    },
    {
        "start": 44.0, "end": 46.0,
        "speaker": "Joel",
        "text": "They might have a dog.",
        "translationVi": "Họ có thể có nuôi chó dữ đấy.",
        "ipaUs": "/ðeɪ maɪt hæv ə dɔːɡ./",
        "keywords": ["might have", "possibility"],
        "explanationAi": "Joel viện cớ để ngăn cản hành động liều lĩnh, thể hiện tính cách thận trọng của anh.",
        "properNouns": []
    },
    {
        "start": 46.0, "end": 48.0,
        "speaker": "Clementine",
        "text": "There's no dog.",
        "translationVi": "Chẳng có con chó nào đâu.",
        "ipaUs": "/ðɛərz noʊ dɔːɡ./",
        "keywords": ["no dog"],
        "explanationAi": "Clementine gạt phăng nỗi sợ hãi của Joel mà không cần suy nghĩ.",
        "properNouns": []
    },
    {
        "start": 48.0, "end": 51.0,
        "speaker": "Joel",
        "text": "What are you doing? It's freezing out here. I'm leaving.",
        "translationVi": "Cô đang làm cái gì thế? Ngoài này trời lạnh cóng. Tôi đi về đây.",
        "ipaUs": "/wʌt ɑːr juː ˈduːɪŋ? ɪts ˈfriːzɪŋ aʊt hɪər. aɪm ˈliːvɪŋ./",
        "keywords": ["freezing out", "leaving"],
        "explanationAi": "Joel đứng co ro trong cái rét buốt của bãi biển mùa đông và dọa bỏ về.",
        "properNouns": []
    },
    {
        "start": 55.0, "end": 57.0,
        "speaker": "Clementine",
        "text": "What?",
        "translationVi": "Cái gì cơ?",
        "ipaUs": "/wʌt?/",
        "keywords": ["what"],
        "explanationAi": "Clementine từ trong nhà ngó đầu ra qua cửa sổ.",
        "properNouns": []
    },
    {
        "start": 57.0, "end": 60.0,
        "speaker": "Clementine",
        "text": "I'm inside. There you go.",
        "translationVi": "Tôi vào được bên trong rồi này. Thấy chưa!",
        "ipaUs": "/aɪm ɪnˈsaɪd. ðɛər juː ɡoʊ./",
        "keywords": ["inside", "there you go"],
        "explanationAi": "'There you go' dùng để ăn mừng khi hoàn thành một hành động khó khăn một cách đắc thắng.",
        "properNouns": []
    },
    {
        "start": 67.0, "end": 69.0,
        "speaker": "Clementine",
        "text": "Come on in. The water's fine.",
        "translationVi": "Vào đây đi nào. Ở đây ấm áp dễ chịu lắm.",
        "ipaUs": "/kʌm ɑːn ɪn. ðə ˈwɔːtərz faɪn./",
        "keywords": ["the water's fine", "idiom"],
        "explanationAi": "Thành ngữ 'the water's fine' vốn dùng khi bơi lội, mang nghĩa bóng là mời gọi ai đó tham gia vì mọi thứ rất an toàn và thoải mái.",
        "properNouns": []
    },
    {
        "start": 71.0, "end": 74.0,
        "speaker": "Clementine",
        "text": "Nobody comes here in the winter, believe me.",
        "translationVi": "Chẳng có ai đến đây vào mùa đông đâu, tin tôi đi mà.",
        "ipaUs": "/ˈnoʊˌbɑːdi kʌmz hɪər ɪn ðə ˈwɪntər, bɪˈliːv miː./",
        "keywords": ["in the winter", "believe me"],
        "explanationAi": "Clementine trấn an Joel rằng các căn nhà nghỉ mát ven biển Montauk đều bị bỏ trống suốt mùa đông.",
        "properNouns": []
    },
    {
        "start": 78.0, "end": 83.0,
        "speaker": "Clementine",
        "text": "So, what's your girlfriend's name?",
        "translationVi": "Thế bạn gái của anh tên là gì?",
        "ipaUs": "/soʊ, wʌts jʊər ˈɡɜːrlˌfrɛndz neɪm?/",
        "keywords": ["girlfriend's name"],
        "explanationAi": "Clementine quay lại chủ đề mối quan hệ của Joel khi cả hai đã vào phòng khách.",
        "properNouns": []
    },
    {
        "start": 83.0, "end": 86.0,
        "speaker": "Joel",
        "text": "Naomi, but we're not really...",
        "translationVi": "Naomi, nhưng chúng tôi không hẳn là...",
        "ipaUs": "/neɪˈoʊmi, bʌt wɪər nɑːt ˈrɪəli.../",
        "keywords": ["not really"],
        "explanationAi": "Joel ngập ngừng khi nhắc đến Naomi, ngầm ám chỉ mối quan hệ của họ đã đi đến hồi kết bế tắc.",
        "properNouns": ["Naomi"]
    },
    {
        "start": 86.0, "end": 88.0,
        "speaker": "Joel",
        "text": "We're... whatever.",
        "translationVi": "Chúng tôi... sao cũng được.",
        "ipaUs": "/wɪər... ˌwʌtˈɛvər./",
        "keywords": ["whatever", "indifference"],
        "explanationAi": "Từ 'whatever' bộc lộ sự mệt mỏi và không muốn đào sâu thêm về chuyện cũ.",
        "properNouns": []
    },
    {
        "start": 88.0, "end": 91.0,
        "speaker": "Clementine",
        "text": "So this is great. Now I can look for, um...",
        "translationVi": "Tuyệt quá rồi. Giờ tôi có thể đi tìm...",
        "ipaUs": "/soʊ ðɪs ɪz ɡreɪt. naʊ aɪ kæn lʊk fɔːr, ʌm.../",
        "keywords": ["look for"],
        "explanationAi": "Clementine lập tức chuyển hướng để bắt đầu lục lọi khám phá căn nhà.",
        "properNouns": []
    },
    {
        "start": 91.0, "end": 95.0,
        "speaker": "Clementine",
        "text": "...candles, matches, and the liquor cabinet.",
        "translationVi": "...nến, bao diêm và tủ rượu.",
        "ipaUs": "/...ˈkændəlz, ˈmætʃɪz, ænd ðə ˈlɪkər ˈkæbɪnɪt./",
        "keywords": ["candles", "matches", "liquor cabinet"],
        "explanationAi": "Bộ ba vật dụng kinh điển cho một đêm tiệc lãng mạn bí mật trong căn nhà xa lạ.",
        "properNouns": []
    },
    {
        "start": 95.0, "end": 97.0,
        "speaker": "Joel",
        "text": "Oh, God.",
        "translationVi": "Trời đất ơi.",
        "ipaUs": "/oʊ, ɡɑːd./",
        "keywords": ["oh God", "exclamation"],
        "explanationAi": "Tiếng thở dài bất lực nhưng cũng dần bị cuốn hút của Joel.",
        "properNouns": []
    },

    # Act 4: David & Ruth Laskin Roleplay (01:42 - 02:34)
    {
        "start": 102.0, "end": 104.0,
        "speaker": "Joel",
        "text": "I think we should go.",
        "translationVi": "Tôi nghĩ chúng mình nên rời khỏi đây thôi.",
        "ipaUs": "/aɪ θɪŋk wiː ʃʊd ɡoʊ./",
        "keywords": ["should go", "recommendation"],
        "explanationAi": "Lương tâm và nỗi bất an của Joel một lần nữa lên tiếng.",
        "properNouns": []
    },
    {
        "start": 104.0, "end": 106.0,
        "speaker": "Joel",
        "text": "There's no phone line.",
        "translationVi": "Ở đây không có đường dây điện thoại đâu.",
        "ipaUs": "/ðɛərz noʊ foʊn laɪn./",
        "keywords": ["no phone line"],
        "explanationAi": "Joel kiểm tra thấy điện thoại bàn bị cắt đường truyền khi mùa đông đến.",
        "properNouns": []
    },
    {
        "start": 106.0, "end": 107.0,
        "speaker": "Clementine",
        "text": "What?",
        "translationVi": "Sao cơ?",
        "ipaUs": "/wʌt?/",
        "keywords": ["what"],
        "explanationAi": "Clementine không bận tâm đến việc bị cô lập với thế giới bên ngoài.",
        "properNouns": []
    },
    {
        "start": 107.0, "end": 108.0,
        "speaker": "Joel",
        "text": "I think we should go.",
        "translationVi": "Tôi nghĩ chúng mình nên đi thôi.",
        "ipaUs": "/aɪ θɪŋk wiː ʃʊd ɡoʊ./",
        "keywords": ["should go"],
        "explanationAi": "Joel lặp lại lời cảnh báo trước tính bướng bỉnh của Clementine.",
        "properNouns": []
    },
    {
        "start": 108.0, "end": 109.0,
        "speaker": "Clementine",
        "text": "Why? It's our house.",
        "translationVi": "Tại sao chứ? Đây là nhà của chúng mình mà.",
        "ipaUs": "/waɪ? ɪts ˈaʊər haʊs./",
        "keywords": ["our house", "make-believe"],
        "explanationAi": "Clementine bắt đầu trò chơi đóng kịch tưởng tượng (make-believe game).",
        "properNouns": []
    },
    {
        "start": 111.0, "end": 112.0,
        "speaker": "Clementine",
        "text": "Just for tonight.",
        "translationVi": "Chỉ duy nhất đêm nay thôi.",
        "ipaUs": "/dʒʌst fɔːr təˈnaɪt./",
        "keywords": ["just for tonight"],
        "explanationAi": "Lời đề nghị ngọt ngào biến một đêm phạm pháp thành cuộc phiêu lưu tình ái.",
        "properNouns": []
    },
    {
        "start": 112.0, "end": 116.0,
        "speaker": "Clementine",
        "text": "We are David and Ruth Laskin.",
        "translationVi": "Chúng mình là vợ chồng David và Ruth Laskin.",
        "ipaUs": "/wiː ɑːr ˈdeɪvɪd ænd ruːθ ˈlæskɪn./",
        "keywords": ["David and Ruth Laskin"],
        "explanationAi": "Clementine đọc tên chủ nhà từ những lá thư để đặt tên cho hai nhân vật đóng giả.",
        "properNouns": ["David", "Ruth", "Ruth Laskin"]
    },
    {
        "start": 116.0, "end": 118.0,
        "speaker": "Clementine",
        "text": "Which one do you want to be?",
        "translationVi": "Anh muốn làm người nào?",
        "ipaUs": "/wɪtʃ wʌn duː juː wɑːnt tuː biː?/",
        "keywords": ["which one", "choice"],
        "explanationAi": "Câu hỏi trêu chọc đầy ngộ nghĩnh của Clementine.",
        "properNouns": []
    },
    {
        "start": 118.0, "end": 123.0,
        "speaker": "Joel",
        "text": "I'd prefer it if you were Ruth, but I'm flexible.",
        "translationVi": "Tôi sẽ thích hơn nếu cô đóng vai Ruth, nhưng tôi cũng linh hoạt lắm.",
        "ipaUs": "/aɪd prɪˈfɜːr ɪt ɪf juː wɜːr ruːθ, bʌt aɪm ˈflɛksəbl./",
        "keywords": ["prefer", "flexible"],
        "explanationAi": "Joel đối đáp bằng khiếu hài hước kín đáo, ngầm chấp nhận tham gia trò chơi của Clementine.",
        "properNouns": ["Ruth"]
    },
    {
        "start": 123.0, "end": 125.0,
        "speaker": "Joel",
        "text": "What are you doing?",
        "translationVi": "Cô đang làm cái gì đấy?",
        "ipaUs": "/wʌt ɑːr juː ˈduːɪŋ?/",
        "keywords": ["what are you doing"],
        "explanationAi": "Joel thấy Clementine bắt đầu bật đèn và khui chai rượu vang trên bàn.",
        "properNouns": []
    },
    {
        "start": 127.0, "end": 130.0,
        "speaker": "Joel",
        "text": "Oh, boy.",
        "translationVi": "Trời ạ.",
        "ipaUs": "/oʊ, bɔɪ./",
        "keywords": ["oh boy"],
        "explanationAi": "Thán từ cảm thán 'oh, boy' thể hiện sự chào thua trước tính khí bốc đồng của đối phương.",
        "properNouns": []
    },
    {
        "start": 130.0, "end": 132.0,
        "speaker": "Clementine",
        "text": "So, are you okay with wine?",
        "translationVi": "Thế anh uống được rượu vang chứ?",
        "ipaUs": "/soʊ, ɑːr juː oʊˈkeɪ wɪð waɪn?/",
        "keywords": ["okay with wine"],
        "explanationAi": "Clementine cầm chai rượu vang tìm được dưới quầy bếp.",
        "properNouns": []
    },
    {
        "start": 132.0, "end": 133.0,
        "speaker": "Joel",
        "text": "I don't know.",
        "translationVi": "Tôi cũng không biết nữa.",
        "ipaUs": "/aɪ doʊnt noʊ./",
        "keywords": ["I don't know"],
        "explanationAi": "Joel tiếp tục rơi vào trạng thái thụ động và bối rối.",
        "properNouns": []
    },
    {
        "start": 133.0, "end": 135.0,
        "speaker": "Clementine",
        "text": "Well, you choose the wine.",
        "translationVi": "Thế thì anh chọn rượu đi nhé.",
        "ipaUs": "/wɛl, juː tʃuːz ðə waɪn./",
        "keywords": ["choose the wine"],
        "explanationAi": "Clementine giao quyền chọn rượu cho Joel.",
        "properNouns": []
    },
    {
        "start": 135.0, "end": 137.0,
        "speaker": "Clementine",
        "text": "I'm gonna go find a bedroom.",
        "translationVi": "Tôi sẽ đi tìm phòng ngủ đây.",
        "ipaUs": "/aɪm ˈɡənə ɡoʊ faɪnd ə ˈbɛdruːm./",
        "keywords": ["find a bedroom"],
        "explanationAi": "Câu nói táo bạo đẩy sự thân mật giữa hai người lên đỉnh điểm.",
        "properNouns": []
    },
    {
        "start": 137.0, "end": 140.0,
        "speaker": "Joel",
        "text": "You're... Ruth.",
        "translationVi": "Cô đúng là... Ruth.",
        "ipaUs": "/jʊər... ruːθ./",
        "keywords": ["Ruth", "wordplay"],
        "explanationAi": "Joel gọi tên nhân vật đóng vai để bắt đầu câu chơi chữ dí dỏm.",
        "properNouns": ["Ruth"]
    },
    {
        "start": 142.0, "end": 144.0,
        "speaker": "Clementine",
        "text": "I'm ruthless at the moment.",
        "translationVi": "Lúc này tôi đang vô cùng tàn nhẫn và liều lĩnh đấy.",
        "ipaUs": "/aɪm ˈruːθlɪs æt ðə ˈmoʊmənt./",
        "keywords": ["ruthless", "pun"],
        "explanationAi": "Pha chơi chữ đỉnh cao của biên kịch Charlie Kaufman: 'Ruth-less' (thiếu Ruth / nhẫn tâm, liều lĩnh).",
        "properNouns": []
    },
    {
        "start": 144.0, "end": 146.0,
        "speaker": "Joel",
        "text": "I really should go.",
        "translationVi": "Tôi thực sự phải đi thôi.",
        "ipaUs": "/aɪ ˈrɪəli ʃʊd ɡoʊ./",
        "keywords": ["really should go"],
        "explanationAi": "Nỗi sợ hãi và tính e dè trỗi dậy khiến Joel muốn rút lui trong thời điểm then chốt.",
        "properNouns": []
    },
    {
        "start": 148.0, "end": 151.0,
        "speaker": "Joel",
        "text": "I'm gonna catch my train.",
        "translationVi": "Tôi phải đi bắt chuyến tàu của mình đây.",
        "ipaUs": "/aɪm ˈɡənə kætʃ maɪ treɪn./",
        "keywords": ["catch my train"],
        "explanationAi": "Joel tìm lý do bắt chuyến tàu sớm từ Montauk về lại New York.",
        "properNouns": ["Montauk"]
    },
    {
        "start": 151.0, "end": 154.0,
        "speaker": "Clementine",
        "text": "So go.",
        "translationVi": "Vậy thì anh đi đi.",
        "ipaUs": "/soʊ ɡoʊ./",
        "keywords": ["so go", "dismissal"],
        "explanationAi": "Lời xua tay dứt khoát của Clementine, câu nói đã trở thành vết thương và sự hối hận dai dẳng nhất trong ký ức của Joel.",
        "properNouns": []
    },

    # Act 5: The Regret & Confession in Crumbling Memory (02:34 - 03:40)
    {
        "start": 154.0, "end": 156.0,
        "speaker": "Joel",
        "text": "I did.",
        "translationVi": "Và anh đã bỏ đi thật.",
        "ipaUs": "/aɪ dɪd./",
        "keywords": ["I did", "regret"],
        "explanationAi": "Joel hiện tại trong tâm trí đang đứng chứng kiến chính bản thân quá khứ của mình bước ra khỏi cửa.",
        "properNouns": []
    },
    {
        "start": 157.0, "end": 159.0,
        "speaker": "Joel",
        "text": "I thought maybe you were a nut.",
        "translationVi": "Anh cứ nghĩ có lẽ em là một cô nàng dở hơi.",
        "ipaUs": "/aɪ θɔːt ˈmeɪbiː juː wɜːr ə nʌt./",
        "keywords": ["a nut", "slang"],
        "explanationAi": "Tiếng lóng 'a nut' nghĩa là một kẻ lập dị, điên rồ hoặc quái gở.",
        "properNouns": []
    },
    {
        "start": 159.0, "end": 162.0,
        "speaker": "Joel",
        "text": "But you were exciting.",
        "translationVi": "Nhưng em lại vô cùng thú vị và lôi cuốn.",
        "ipaUs": "/bʌt juː wɜːr ɪkˈsaɪtɪŋ./",
        "keywords": ["exciting"],
        "explanationAi": "Joel thổ lộ cảm xúc chân thật nhất mà anh từng giấu kín trong lòng.",
        "properNouns": []
    },
    {
        "start": 163.0, "end": 165.0,
        "speaker": "Joel",
        "text": "I wish I had stayed.",
        "translationVi": "Anh ước gì lúc đó anh đã ở lại.",
        "ipaUs": "/aɪ wɪʃ aɪ hæd steɪd./",
        "keywords": ["wish I had stayed", "past regret"],
        "explanationAi": "Cấu trúc 'wish + past perfect' biểu đạt nỗi niềm ân hận tột cùng về một quyết định sai lầm trong quá khứ.",
        "properNouns": []
    },
    {
        "start": 165.0, "end": 167.0,
        "speaker": "Clementine",
        "text": "I wish I had stayed too.",
        "translationVi": "Em cũng ước gì anh đã ở lại.",
        "ipaUs": "/aɪ wɪʃ aɪ hæd steɪd tuː./",
        "keywords": ["wish I had stayed too"],
        "explanationAi": "Ảo ảnh Clementine trong tiềm thức thấu hiểu và đáp lại nỗi lòng của Joel.",
        "properNouns": []
    },
    {
        "start": 167.0, "end": 168.0,
        "speaker": "Joel",
        "text": "Now I wish I had stayed.",
        "translationVi": "Giờ đây anh mới ước gì mình đã ở lại.",
        "ipaUs": "/naʊ aɪ wɪʃ aɪ hæd steɪd./",
        "keywords": ["now I wish"],
        "explanationAi": "Sự thức tỉnh muộn màng khi ký ức đang dần biến mất mãi mãi.",
        "properNouns": []
    },
    {
        "start": 168.0, "end": 171.0,
        "speaker": "Joel",
        "text": "I wish I had done a lot of things.",
        "translationVi": "Anh ước gì mình đã làm nhiều điều khác đi.",
        "ipaUs": "/aɪ wɪʃ aɪ hæd dʌn ə lɑːt əv θɪŋz./",
        "keywords": ["done a lot of things"],
        "explanationAi": "Nỗi day dứt về tất cả những lần im lặng, nhút nhát và những lời nói tổn thương trong suốt mối tình của họ.",
        "properNouns": []
    },
    {
        "start": 171.0, "end": 174.0,
        "speaker": "Joel",
        "text": "I wish I had...",
        "translationVi": "Anh ước gì mình đã...",
        "ipaUs": "/aɪ wɪʃ aɪ hæd.../",
        "keywords": ["wish I had"],
        "explanationAi": "Tiếng nghẹn ngào ngắt quãng khi những mảnh ghép ký ức bắt đầu rơi rụng.",
        "properNouns": []
    },
    {
        "start": 177.0, "end": 180.0,
        "speaker": "Joel",
        "text": "I wish I had stayed. I do.",
        "translationVi": "Anh ước gì anh đã ở lại. Thật lòng đấy.",
        "ipaUs": "/aɪ wɪʃ aɪ hæd steɪd. aɪ duː./",
        "keywords": ["I do", "emphasis"],
        "explanationAi": "'I do' được dùng làm trợ động từ nhấn mạnh sự chân thành tuyệt đối của Joel.",
        "properNouns": []
    },
    {
        "start": 181.0, "end": 183.0,
        "speaker": "Clementine",
        "text": "Well, I came back downstairs and you were gone.",
        "translationVi": "Thế mà lúc em từ trên lầu đi xuống thì anh đã biến mất rồi.",
        "ipaUs": "/wɛl, aɪ keɪm bæk ˌdaʊnˈstɛərz ænd juː wɜːr ɡɔːn./",
        "keywords": ["downstairs", "you were gone"],
        "explanationAi": "Clementine kể lại cảm giác hụt hẫng khi bước xuống nhà với ly rượu nhưng căn phòng đã trống không.",
        "properNouns": []
    },
    {
        "start": 183.0, "end": 185.0,
        "speaker": "Joel",
        "text": "I walked out. I walked out the door.",
        "translationVi": "Anh đã bước ra ngoài. Anh đã bước qua cánh cửa ấy.",
        "ipaUs": "/aɪ wɔːkt aʊt. aɪ wɔːkt aʊt ðə dɔːr./",
        "keywords": ["walked out the door"],
        "explanationAi": "Hành động bỏ trốn thực tại lặp lại trong tâm trí Joel như một sự tự trách cứ.",
        "properNouns": []
    },
    {
        "start": 185.0, "end": 186.0,
        "speaker": "Clementine",
        "text": "Why?",
        "translationVi": "Tại sao chứ?",
        "ipaUs": "/waɪ?/",
        "keywords": ["why"],
        "explanationAi": "Câu hỏi nhức nhối tìm kiếm nguyên nhân.",
        "properNouns": []
    },
    {
        "start": 186.0, "end": 188.0,
        "speaker": "Joel",
        "text": "I don't know. I felt like a scared little kid.",
        "translationVi": "Anh chẳng biết nữa. Lúc đó anh cảm thấy mình như một đứa trẻ nhút nhát sợ sệt.",
        "ipaUs": "/aɪ doʊnt noʊ. aɪ fɛlt laɪk ə skɛərd ˈlɪtl kɪd./",
        "keywords": ["scared little kid", "vulnerability"],
        "explanationAi": "Joel bộc lộ sự yếu đuối và tự ti sâu kín bên trong tâm hồn người đàn ông trưởng thành.",
        "properNouns": []
    },
    {
        "start": 188.0, "end": 192.0,
        "speaker": "Joel",
        "text": "It was over my head. I don't know.",
        "translationVi": "Mọi chuyện lúc đó vượt quá tầm kiểm soát của anh. Anh không biết nữa.",
        "ipaUs": "/ɪt wʌz ˈoʊvər maɪ hɛd. aɪ doʊnt noʊ./",
        "keywords": ["over my head", "idiom"],
        "explanationAi": "Thành ngữ 'over one's head' nghĩa là điều gì đó quá phức tạp hoặc vượt quá khả năng xử lý của bản thân.",
        "properNouns": []
    },
    {
        "start": 192.0, "end": 193.0,
        "speaker": "Clementine",
        "text": "You were scared?",
        "translationVi": "Anh sợ hãi sao?",
        "ipaUs": "/juː wɜːr skɛərd?/",
        "keywords": ["scared"],
        "explanationAi": "Clementine nhìn Joel với ánh mắt dịu dàng đầy bất ngờ.",
        "properNouns": []
    },
    {
        "start": 193.0, "end": 194.0,
        "speaker": "Joel",
        "text": "Yeah.",
        "translationVi": "Ừ.",
        "ipaUs": "/jæ./",
        "keywords": ["yeah"],
        "explanationAi": "Lời thừa nhận ngắn gọn nhưng chứa đựng sự chân thành tuyệt đối.",
        "properNouns": []
    },
    {
        "start": 196.0, "end": 199.0,
        "speaker": "Joel",
        "text": "I thought you knew that about me.",
        "translationVi": "Anh cứ ngỡ em đã thấu hiểu điều đó ở anh chứ.",
        "ipaUs": "/aɪ θɔːt juː njuː ðæt əˈbaʊt miː./",
        "keywords": ["knew that about me"],
        "explanationAi": "Joel tin rằng Clementine là người duy nhất trên đời có thể thấu cảm trọn vẹn con người anh.",
        "properNouns": []
    },
    {
        "start": 199.0, "end": 204.0,
        "speaker": "Joel",
        "text": "I ran back to the bonfire trying to outrun my humiliation, I think.",
        "translationVi": "Anh đã chạy vội về phía đống lửa trại bên bờ biển để cố trốn chạy khỏi nỗi bẽ bàng của mình, anh nghĩ vậy.",
        "ipaUs": "/aɪ ræn bæk tuː ðə ˈbɑːnˌfaɪər ˈtraɪɪŋ tuː aʊtˈrʌn maɪ hjuːˌmɪliˈeɪʃən, aɪ θɪŋk./",
        "keywords": ["bonfire", "outrun my humiliation"],
        "explanationAi": "Hình ảnh đống lửa trại trên bãi biển Montauk đêm định mệnh và cảm xúc xấu hổ vì sợ bị từ chối.",
        "properNouns": ["Montauk"]
    },
    {
        "start": 204.0, "end": 206.0,
        "speaker": "Clementine",
        "text": "Was it something I said?",
        "translationVi": "Có phải do điều gì em đã nói không?",
        "ipaUs": "/wʌz ɪt ˈsʌmθɪŋ aɪ sɛd?/",
        "keywords": ["something I said"],
        "explanationAi": "Clementine tự hỏi liệu lời nói vô tâm nào của cô đã làm tổn thương anh.",
        "properNouns": []
    },
    {
        "start": 206.0, "end": 209.0,
        "speaker": "Joel",
        "text": "Yeah.",
        "translationVi": "Phải.",
        "ipaUs": "/jæ./",
        "keywords": ["yeah"],
        "explanationAi": "Joel khẽ gật đầu thừa nhận, sự trầm ngâm bộc lộ nỗi day dứt không thể xóa nhòa trong tim anh.",
        "properNouns": []
    },
    {
        "start": 209.0, "end": 213.0,
        "speaker": "Joel",
        "text": "You said 'So go.'",
        "translationVi": "Em đã bảo 'Vậy thì anh đi đi.'",
        "ipaUs": "/juː sɛd soʊ ɡoʊ./",
        "keywords": ["so go"],
        "explanationAi": "Câu nói buông xuôi đầy hờ hững đã đẩy anh rời xa cô trong đêm hôm ấy.",
        "properNouns": []
    },
    {
        "start": 213.0, "end": 215.0,
        "speaker": "Clementine",
        "text": "I was going to say 'stay with me.'",
        "translationVi": "Lúc đó em đã định nói rằng 'hãy ở lại bên em đi.'",
        "ipaUs": "/aɪ wʌz ˈɡoʊɪŋ tuː seɪ steɪ wɪð miː./",
        "keywords": ["stay with me", "unspoken truth"],
        "explanationAi": "Sự thật bi kịch và xót xa nhất: cả hai đều khao khát ở bên nhau nhưng cái tôi và sự tự ti đã ngăn họ thốt nên lời.",
        "properNouns": []
    },
    {
        "start": 215.0, "end": 217.0,
        "speaker": "Joel",
        "text": "Oh, sorry.",
        "translationVi": "Ôi, anh xin lỗi.",
        "ipaUs": "/oʊ, ˈsɑːri./",
        "keywords": ["sorry"],
        "explanationAi": "Lời xin lỗi chân thành trong nỗi nghẹn ngào khôn tả.",
        "properNouns": []
    },
    {
        "start": 217.0, "end": 220.0,
        "speaker": "Clementine",
        "text": "Okay.",
        "translationVi": "Không sao đâu.",
        "ipaUs": "/oʊˈkeɪ./",
        "keywords": ["okay"],
        "explanationAi": "Clementine tha thứ cho sự vụng về của cả hai trong quá khứ.",
        "properNouns": []
    },

    # Act 6: Meet Me in Montauk - The Final Farewell (03:40 - 04:20)
    {
        "start": 220.0, "end": 223.0,
        "speaker": "Clementine",
        "text": "Joel?",
        "translationVi": "Joel à?",
        "ipaUs": "/dʒoʊl?/",
        "keywords": ["Joel", "direct address"],
        "explanationAi": "Clementine khẽ gọi tên Joel khi căn nhà bắt đầu rung chuyển và sụp đổ từng mảng.",
        "properNouns": ["Joel"]
    },
    {
        "start": 223.0, "end": 227.0,
        "speaker": "Clementine",
        "text": "What if you stayed this time?",
        "translationVi": "Giá như lần này anh ở lại thì sao nhỉ?",
        "ipaUs": "/wʌt ɪf juː steɪd ðɪs taɪm?/",
        "keywords": ["what if", "stayed this time"],
        "explanationAi": "Mệnh đề giả định 'What if + past simple' biểu đạt ước vọng sửa chữa quá khứ trong thế giới tâm tưởng.",
        "properNouns": []
    },
    {
        "start": 230.0, "end": 233.0,
        "speaker": "Joel",
        "text": "I walked out the door.",
        "translationVi": "Nhưng anh đã bước qua cánh cửa ấy rồi.",
        "ipaUs": "/aɪ wɔːkt aʊt ðə dɔːr./",
        "keywords": ["walked out"],
        "explanationAi": "Quy luật bất biến của ký ức: Joel không thể thay đổi những gì đã thực sự xảy ra.",
        "properNouns": []
    },
    {
        "start": 233.0, "end": 235.0,
        "speaker": "Joel",
        "text": "There's no memory left.",
        "translationVi": "Ký ức chẳng còn lại gì nữa rồi.",
        "ipaUs": "/ðɛərz noʊ ˈmɛməri lɛft./",
        "keywords": ["no memory left"],
        "explanationAi": "Những bức tường xung quanh bắt đầu vỡ vụn rơi xuống bãi cát đen; căn nhà đang bị xóa bỏ hoàn toàn.",
        "properNouns": []
    },
    {
        "start": 235.0, "end": 238.0,
        "speaker": "Clementine",
        "text": "Come back and make up a goodbye at least.",
        "translationVi": "Ít nhất hãy quay lại đây và cùng nói một lời tạm biệt tử tế đi anh.",
        "ipaUs": "/kʌm bæk ænd meɪk ʌp ə ɡʊdˈbaɪ æt liːst./",
        "keywords": ["make up a goodbye", "closure"],
        "explanationAi": "Cụm 'make up a goodbye' mang nghĩa tạo nên một lời chào tạm biệt tử tế và trọn vẹn để khép lại quá khứ.",
        "properNouns": []
    },
    {
        "start": 238.0, "end": 241.0,
        "speaker": "Clementine",
        "text": "Let's pretend we had one.",
        "translationVi": "Hãy giả vờ như chúng mình đã từng có một lời chia tay thật đẹp.",
        "ipaUs": "/lɛts prɪˈtɛnd wiː hæd wʌn./",
        "keywords": ["pretend", "closure"],
        "explanationAi": "Đỉnh cao chất thơ của bộ phim: dùng trí tưởng tượng để chữa lành vết thương trước khi vĩnh viễn lãng quên nhau.",
        "properNouns": []
    },
    {
        "start": 251.0, "end": 253.0,
        "speaker": "Clementine",
        "text": "Bye, Joel.",
        "translationVi": "Tạm biệt anh nhé, Joel.",
        "ipaUs": "/baɪ, dʒoʊl./",
        "keywords": ["bye Joel"],
        "explanationAi": "Lời chào tạm biệt dịu dàng đầy nước mắt của Clementine.",
        "properNouns": ["Joel"]
    },
    {
        "start": 253.0, "end": 256.0,
        "speaker": "Joel",
        "text": "I love you.",
        "translationVi": "Anh yêu em.",
        "ipaUs": "/aɪ lʌv juː./",
        "keywords": ["I love you"],
        "explanationAi": "Lời bộc bạch chân thành và trọn vẹn nhất của Joel gửi tới người con gái anh yêu trước khi ký ức tan biến.",
        "properNouns": []
    },
    {
        "start": 256.0, "end": 260.0,
        "speaker": "Clementine",
        "text": "Meet me in Montauk.",
        "translationVi": "Hãy gặp em ở Montauk nhé.",
        "ipaUs": "/miːt miː ɪn ˈmɑːntɔːk./",
        "keywords": ["Meet me in Montauk", "climax"],
        "explanationAi": "Câu thì thầm bất hủ trở thành mã khóa tiềm thức ăn sâu vào vô thức của Joel, khiến anh tự động đón chuyến tàu đến Montauk vào ngày lễ Tình nhân.",
        "properNouns": ["Montauk"]
    },

    # Act 7: The Crumbling Void & Waves (04:20 - 04:34)
    {
        "start": 260.0, "end": 274.0,
        "speaker": "Narrator",
        "text": "The wooden frame of the beach house collapses into the freezing ocean waves as the memory dissolves.",
        "translationVi": "Khung gỗ của ngôi nhà bên bờ biển sụp đổ tan tành xuống những con sóng biển buốt giá khi ký ức hoàn toàn tan biến.",
        "ipaUs": "/ðə ˈwʊdn freɪm əv ðə biːtʃ haʊs kəˈlæpsɪz ˈɪntuː ðə ˈfriːzɪŋ ˈoʊʃən weɪvz æz ðə ˈmɛməri dɪˈzɑːlvz./",
        "keywords": ["collapses", "freezing ocean", "dissolves"],
        "explanationAi": "Khoảnh khắc kỳ vĩ mang đậm phong cách thị giác thực nghiệm của đạo diễn Michel Gondry khi ký ức biến thành hư vô.",
        "properNouns": []
    },

    # Act 8: Outside in Joel's Apartment - Stan, Mary & Patrick (04:34 - 05:14)
    {
        "start": 274.0, "end": 278.0,
        "speaker": "Stan",
        "text": "You're stoned and you're trying to get the pot down. Pop brings it back up.",
        "translationVi": "Em đang phê thuốc và cố làm dịu cảm giác ấy xuống. Nước ngọt có ga sẽ kéo nó bùng lên lại đấy.",
        "ipaUs": "/jʊər stoʊnd ænd jʊər ˈtraɪɪŋ tuː ɡɛt ðə pɑːt daʊn. pɑːp brɪŋz ɪt bæk ʌp./",
        "keywords": ["stoned", "pot", "pop brings it back up"],
        "explanationAi": "Cảnh phim bất ngờ chuyển từ không gian siêu thực trong tiềm thức của Joel sang hiện thực trần trụi nơi hai kỹ thuật viên Lacuna đang tán gẫu.",
        "properNouns": ["Stan"]
    },
    {
        "start": 278.0, "end": 283.0,
        "speaker": "Stan",
        "text": "That's why it's so important for me to be drinking that while I smoke.",
        "translationVi": "Đó là lý do vì sao anh bắt buộc phải uống nước ngọt này trong lúc anh hút thuốc.",
        "ipaUs": "/ðæts waɪ ɪts soʊ ɪmˈpɔːrtnt fɔːr miː tuː biː ˈdrɪŋkɪŋ ðæt waɪl aɪ smoʊk./",
        "keywords": ["so important", "drinking while I smoke"],
        "explanationAi": "Stan (Mark Ruffalo thủ vai) thao thao bất tuyệt giải thích thói quen kỳ quặc của mình cho cô bạn gái Mary.",
        "properNouns": []
    },
    {
        "start": 283.0, "end": 285.0,
        "speaker": "Mary",
        "text": "It does?",
        "translationVi": "Thật thế sao anh?",
        "ipaUs": "/ɪt dʌz?/",
        "keywords": ["it does"],
        "explanationAi": "Mary (Kirsten Dunst thủ vai) nghi ngờ lý thuyết của Stan.",
        "properNouns": ["Mary"]
    },
    {
        "start": 285.0, "end": 287.0,
        "speaker": "Stan",
        "text": "That's a medical fact and stuff.",
        "translationVi": "Đó là một sự thật y khoa và này nọ đấy.",
        "ipaUs": "/ðæts ə ˈmɛdɪkl fækt ænd stʌf./",
        "keywords": ["medical fact and stuff"],
        "explanationAi": "Stan bịa ra lý do y học bằng giọng điệu ngô nghê và hài hước.",
        "properNouns": []
    },
    {
        "start": 287.0, "end": 289.0,
        "speaker": "Stan",
        "text": "That's proven scientific work.",
        "translationVi": "Đó là công trình khoa học đã được kiểm chứng đàng hoàng rồi.",
        "ipaUs": "/ðæts ˈpruːvn ˌsaɪənˈtɪfɪk wɜːrk./",
        "keywords": ["proven scientific work"],
        "explanationAi": "Cụm từ 'proven scientific work' tạo nên nét tương phản trớ trêu với thái độ làm việc cẩu thả của Stan khi vận hành cỗ máy xóa não.",
        "properNouns": []
    },
    {
        "start": 289.0, "end": 291.0,
        "speaker": "Mary",
        "text": "Honey, just watching a movie. I can't hear you.",
        "translationVi": "Anh yêu à, em đang xem phim mà. Em chẳng nghe thấy anh nói gì đâu.",
        "ipaUs": "/ˈhʌni, dʒʌst ˈwɑːtʃɪŋ ə ˈmuːvi. aɪ kænt hɪər juː./",
        "keywords": ["watching a movie", "can't hear you"],
        "explanationAi": "Mary dán mắt vào màn hình tivi và ngó lơ Stan.",
        "properNouns": []
    },
    {
        "start": 291.0, "end": 295.0,
        "speaker": "Stan",
        "text": "I thought you were talking to me.",
        "translationVi": "Anh cứ tưởng em đang nói chuyện với anh chứ.",
        "ipaUs": "/aɪ θɔːt juː wɜːr ˈtɔːkɪŋ tuː miː./",
        "keywords": ["talking to me"],
        "explanationAi": "Sự ngây ngô và lơ đễnh của Stan sau một hồi độc thoại.",
        "properNouns": []
    },
    {
        "start": 295.0, "end": 297.0,
        "speaker": "Mary",
        "text": "Is she pretty?",
        "translationVi": "Cô gái ấy có xinh xắn không anh?",
        "ipaUs": "/ɪz ʃiː ˈprɪti?/",
        "keywords": ["is she pretty"],
        "explanationAi": "Mary tò mò hỏi về Clementine khi nhìn thấy hồ sơ xóa ký ức của Joel trên bàn làm việc.",
        "properNouns": []
    },
    {
        "start": 297.0, "end": 299.0,
        "speaker": "Stan",
        "text": "She was nice.",
        "translationVi": "Cô ấy cũng dễ thương.",
        "ipaUs": "/ʃiː wʌz naɪs./",
        "keywords": ["she was nice"],
        "explanationAi": "Stan nhận xét thờ ơ bằng thì quá khứ 'was' vì với anh, cô gái trong hồ sơ đã trở thành quá khứ bị tẩy xóa.",
        "properNouns": []
    },
    {
        "start": 299.0, "end": 301.0,
        "speaker": "Patrick",
        "text": "Yeah, man.",
        "translationVi": "Chuẩn đấy anh bạn.",
        "ipaUs": "/jæ, mæn./",
        "keywords": ["yeah man"],
        "explanationAi": "Patrick (Elijah Wood thủ vai), kẻ đã lợi dụng ký ức của Joel để tán tỉnh Clementine, lên tiếng đồng tình.",
        "properNouns": ["Patrick"]
    },
    {
        "start": 301.0, "end": 304.0,
        "speaker": "Stan",
        "text": "She was just a girl.",
        "translationVi": "Cô ấy cũng chỉ là một cô gái bình thường thôi mà.",
        "ipaUs": "/ʃiː wʌz dʒʌst ə ɡɜːrl./",
        "keywords": ["just a girl"],
        "explanationAi": "Câu nhận xét dửng dưng đối lập hoàn toàn với nỗi đau đớn xé lòng và tình yêu vĩ đại mà Joel vừa trải qua trong tâm trí.",
        "properNouns": []
    },
    {
        "start": 312.0, "end": 315.0,
        "speaker": "Mary",
        "text": "Okay.",
        "translationVi": "Được rồi.",
        "ipaUs": "/oʊˈkeɪ./",
        "keywords": ["okay"],
        "explanationAi": "Tiếng thở dài khép lại trường đoạn kiệt tác của điện ảnh thế giới khi cỗ máy tính phát ra tiếng bíp hoàn tất quá trình xóa não.",
        "properNouns": []
    }
]

print(f"Total pure segments: {len(raw_segments)}")

# Build segments with token count and clean structure
segments = []
for idx, r in enumerate(raw_segments):
    text = r["text"]
    # calculate token count: split by whitespace & hyphens, remove punctuation
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
    "lessonId": "mov_rom_10",
    "lessonTitle": "Eternal Sunshine: Meet Me in Montauk - Joel and Clementine's Fading Memory (Full Master Cut)",
    "totalQuestions": 8,
    "xpReward": 100,
    "generatedBy": "AI_GEMINI",
    "questions": [
        {
            "id": "mov_rom_10_q1",
            "question": "What is the secret whisper Clementine tells Joel right before the beach house completely dissolves into the ocean?",
            "questionEn": "What is the secret whisper Clementine tells Joel right before the beach house completely dissolves into the ocean?",
            "questionVi": "Lời thì thầm bí mật mà Clementine nói với Joel ngay trước khi ngôi nhà ven biển sụp đổ hoàn toàn xuống đại dương là gì?",
            "options": [
                "'Forget about our past.'",
                "'Meet me in Montauk.'",
                "'Don't pick up the phone.'",
                "'Remember my hair color.'"
            ],
            "optionsEn": [
                "'Forget about our past.'",
                "'Meet me in Montauk.'",
                "'Don't pick up the phone.'",
                "'Remember my hair color.'"
            ],
            "optionsVi": [
                "'Hãy quên hết quá khứ của chúng ta đi.'",
                "'Hãy gặp em ở Montauk nhé.'",
                "'Đừng nghe điện thoại nhé.'",
                "'Hãy nhớ màu tóc của em nhé.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 71, Clementine whispers the immortal line: 'Meet me in Montauk.' This key phrase stays buried in Joel's subconscious, subconsciously driving him to skip work and take the early Valentine's Day train to Montauk.",
            "explanationEn": "In Segment 71, Clementine whispers the immortal line: 'Meet me in Montauk.' This key phrase stays buried in Joel's subconscious, subconsciously driving him to skip work and take the early Valentine's Day train to Montauk.",
            "explanationVi": "Trong Phân đoạn 71, Clementine thì thầm câu thoại kinh điển: 'Hãy gặp em ở Montauk nhé.' Chi tiết này trở thành mã khóa tiềm thức thôi thúc Joel bỏ làm để bắt chuyến tàu sớm tới bãi biển Montauk vào ngày lễ Tình nhân.",
            "targetedConcept": "Pivotal narrative hook & subconscious anchoring",
            "targetedConceptEn": "Pivotal narrative hook & subconscious anchoring",
            "targetedConceptVi": "Chi tiết mấu chốt dẫn dắt cốt truyện & neo giữ tiềm thức",
            "referenceSegmentIndex": 71
        },
        {
            "id": "mov_rom_10_q2",
            "question": "What grammatical structure does Joel repeat multiple times to express deep, painful regret regarding his past decision to walk away?",
            "questionEn": "What grammatical structure does Joel repeat multiple times to express deep, painful regret regarding his past decision to walk away?",
            "questionVi": "Cấu trúc ngữ pháp nào được Joel lặp lại nhiều lần để bày tỏ sự hối hận sâu sắc và đau đớn về quyết định bỏ đi trong quá khứ?",
            "options": [
                "If only + Present Simple ('If only I stay')",
                "I wish + had + Past Participle ('I wish I had stayed')",
                "Used to + V-ing ('Used to staying')",
                "Should + Base Form ('Should stay')"
            ],
            "optionsEn": [
                "If only + Present Simple ('If only I stay')",
                "I wish + had + Past Participle ('I wish I had stayed')",
                "Used to + V-ing ('Used to staying')",
                "Should + Base Form ('Should stay')"
            ],
            "optionsVi": [
                "If only + Hiện tại đơn ('If only I stay')",
                "I wish + had + V3/ed ('I wish I had stayed')",
                "Used to + V-ing ('Used to staying')",
                "Should + V nguyên mẫu ('Should stay')"
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 45-50, Joel repeatedly laments: 'I wish I had stayed... Now I wish I had stayed. I wish I had done a lot of things.' In English, 'wish + past perfect' is the standard grammatical structure for unfulfilled past desires and remorse.",
            "explanationEn": "In Segments 45-50, Joel repeatedly laments: 'I wish I had stayed... Now I wish I had stayed. I wish I had done a lot of things.' In English, 'wish + past perfect' is the standard grammatical structure for unfulfilled past desires and remorse.",
            "explanationVi": "Trong các Phân đoạn 45-50, Joel liên tục thốt lên: 'I wish I had stayed... Now I wish I had stayed. I wish I had done a lot of things.' Trong ngữ pháp tiếng Anh, 'wish + quá khứ hoàn thành' là cấu trúc chuẩn mực để diễn đạt nỗi hối tiếc về một việc đã không làm trong quá khứ.",
            "targetedConcept": "Grammar of past regrets using wish + past perfect",
            "targetedConceptEn": "Grammar of past regrets using wish + past perfect",
            "targetedConceptVi": "Ngữ pháp diễn đạt sự tiếc nuối quá khứ với mệnh đề wish + past perfect",
            "referenceSegmentIndex": 45
        },
        {
            "id": "mov_rom_10_q3",
            "question": "When Clementine says 'At least I'm not barking up the wrong tree', what does this English idiom mean in the context of the conversation?",
            "questionEn": "When Clementine says 'At least I'm not barking up the wrong tree', what does this English idiom mean in the context of the conversation?",
            "questionVi": "Khi Clementine nói 'At least I'm not barking up the wrong tree', thành ngữ tiếng Anh này mang ý nghĩa gì trong ngữ cảnh cuộc trò chuyện?",
            "options": [
                "She is happy that there are no guard dogs around the beach house.",
                "She is glad that her romantic advances are directed at an available man.",
                "She realizes she has mistaken Joel for another resident.",
                "She warns Joel not to make loud noises outside in the cold."
            ],
            "optionsEn": [
                "She is happy that there are no guard dogs around the beach house.",
                "She is glad that her romantic advances are directed at an available man.",
                "She realizes she has mistaken Joel for another resident.",
                "She warns Joel not to make loud noises outside in the cold."
            ],
            "optionsVi": [
                "Cô ấy vui vì không có con chó bảo vệ nào quanh căn biệt thự.",
                "Cô ấy hài lòng vì sự chủ động tán tỉnh của mình hướng tới một người đàn ông độc thân.",
                "Cô ấy nhận ra mình đã nhận nhầm Joel với một cư dân khác.",
                "Cô ấy cảnh báo Joel không được gây ồn ào ngoài trời lạnh."
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 16, after confirming that Joel is not married and previously lived with a female, Clementine uses 'barking up the wrong tree' (pursuing a mistaken line of thought) to playfully celebrate that she is pursuing someone who is romantically available.",
            "explanationEn": "In Segment 16, after confirming that Joel is not married and previously lived with a female, Clementine uses 'barking up the wrong tree' (pursuing a mistaken line of thought) to playfully celebrate that she is pursuing someone who is romantically available.",
            "explanationVi": "Trong Phân đoạn 16, sau khi xác nhận Joel chưa kết hôn và từng sống chung với phụ nữ, Clementine dùng thành ngữ 'barking up the wrong tree' (nhầm đối tượng / nhầm hướng) để hóm hỉnh ăn mừng rằng mình không tán tỉnh nhầm người.",
            "targetedConcept": "Idiomatic expression 'barking up the wrong tree'",
            "targetedConceptEn": "Idiomatic expression 'barking up the wrong tree'",
            "targetedConceptVi": "Thành ngữ tiếng Anh 'barking up the wrong tree'",
            "referenceSegmentIndex": 16
        },
        {
            "id": "mov_rom_10_q4",
            "question": "What witty pun does Charlie Kaufman craft when Joel calls Clementine 'Ruth' during their roleplay?",
            "questionEn": "What witty pun does Charlie Kaufman craft when Joel calls Clementine 'Ruth' during their roleplay?",
            "questionVi": "Lối chơi chữ hóm hỉnh nào được biên kịch Charlie Kaufman sáng tạo khi Joel gọi Clementine là 'Ruth' trong trò chơi đóng vai?",
            "options": [
                "She claims she is 'truthful' rather than deceitful.",
                "She responds with 'I'm ruthless at the moment', punning on the homeowner's name.",
                "She says she prefers to be called David instead.",
                "She jokes that Ruth was an ancient queen of England."
            ],
            "optionsEn": [
                "She claims she is 'truthful' rather than deceitful.",
                "She responds with 'I'm ruthless at the moment', punning on the homeowner's name.",
                "She says she prefers to be called David instead.",
                "She jokes that Ruth was an ancient queen of England."
            ],
            "optionsVi": [
                "Cô ấy khẳng định mình 'chân thật' (truthful) chứ không lừa dối.",
                "Cô ấy đáp lại 'I'm ruthless at the moment', chơi chữ giữa tên Ruth và tính từ 'tàn nhẫn / liều lĩnh'.",
                "Cô ấy bảo rằng mình thích được gọi là David hơn.",
                "Cô ấy đùa rằng Ruth là một nữ hoàng cổ xưa của nước Anh."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 38-39, when Joel calls her 'Ruth' (the female name on the mail), Clementine cleverly puns: 'I'm ruthless at the moment', playfully exploiting the homophonic connection between the proper name Ruth and the adjective ruthless (merciless/reckless).",
            "explanationEn": "In Segments 38-39, when Joel calls her 'Ruth' (the female name on the mail), Clementine cleverly puns: 'I'm ruthless at the moment', playfully exploiting the homophonic connection between the proper name Ruth and the adjective ruthless (merciless/reckless).",
            "explanationVi": "Trong Phân đoạn 38-39, khi Joel gọi cô là 'Ruth' (tên chủ nhà), Clementine chơi chữ cực kỳ sắc sảo: 'I'm ruthless at the moment', tận dụng sự đồng âm giữa tên riêng Ruth và tính từ ruthless (tàn nhẫn, không khoan nhượng, liều lĩnh).",
            "targetedConcept": "Linguistic wordplay and puns in screenwriting",
            "targetedConceptEn": "Linguistic wordplay and puns in screenwriting",
            "targetedConceptVi": "Nghệ thuật chơi chữ và sáng tạo ngôn ngữ trong kịch bản phim",
            "referenceSegmentIndex": 39
        },
        {
            "id": "mov_rom_10_q5",
            "question": "Why does the dialogue between Joel and Clementine repeat in Segments 8-15 (00:16 - 00:30)?",
            "questionEn": "Why does the dialogue between Joel and Clementine repeat in Segments 8-15 (00:16 - 00:30)?",
            "questionVi": "Vì sao đoạn đối thoại giữa Joel và Clementine lại bị lặp lại từng chữ trong các Phân đoạn 8-15 (00:16 - 00:30)?",
            "options": [
                "Because Joel has a severe hearing impairment.",
                "Because Lacuna Inc.'s memory erasure device is rewinding and glitching Joel's brain tape.",
                "Because Clementine suffers from short-term memory amnesia.",
                "Because they are auditioning for a local beach theater play."
            ],
            "optionsEn": [
                "Because Joel has a severe hearing impairment.",
                "Because Lacuna Inc.'s memory erasure device is rewinding and glitching Joel's brain tape.",
                "Because Clementine suffers from short-term memory amnesia.",
                "Because they are auditioning for a local beach theater play."
            ],
            "optionsVi": [
                "Vì Joel bị khiếm thính nghiêm trọng.",
                "Vì cỗ máy tẩy xóa ký ức của công ty Lacuna đang tua ngược và làm giật lag băng dữ liệu não bộ của Joel.",
                "Vì Clementine mắc hội chứng mất trí nhớ ngắn hạn.",
                "Vì họ đang tập dượt cho một vở kịch sân khấu bãi biển."
            ],
            "correctAnswer": 1,
            "explanation": "The dialogue repetition represents a technological glitch within Joel's subconscious mind caused by Lacuna Inc.'s machine systematically destroying his memory traces in reverse chronological order.",
            "explanationEn": "The dialogue repetition represents a technological glitch within Joel's subconscious mind caused by Lacuna Inc.'s machine systematically destroying his memory traces in reverse chronological order.",
            "explanationVi": "Sự lặp lại của đoạn thoại phản ánh lỗi kỹ thuật trong tiềm thức của Joel khi cỗ máy xóa ký ức của công ty Lacuna đang đảo ngược và tiêu hủy các dấu vết thần kinh theo trình tự thời gian ngược.",
            "targetedConcept": "Surreal narrative structure & visual memory glitches",
            "targetedConceptEn": "Surreal narrative structure & visual memory glitches",
            "targetedConceptVi": "Cấu trúc dẫn truyện siêu thực & hiện tượng lỗi ký ức thị giác",
            "referenceSegmentIndex": 8
        },
        {
            "id": "mov_rom_10_q6",
            "question": "What heartbreaking truth is revealed when Joel tells Clementine that she caused him to leave by saying 'So go'?",
            "questionEn": "What heartbreaking truth is revealed when Joel tells Clementine that she caused him to leave by saying 'So go'?",
            "questionVi": "Sự thật xót xa nào được hé lộ khi Joel bảo Clementine rằng chính câu nói 'Vậy thì anh đi đi' của cô đã khiến anh bỏ đi?",
            "options": [
                "Clementine actually wanted him to leave immediately.",
                "Clementine confesses she was actually going to say 'stay with me.'",
                "Clementine had already called the police on him.",
                "Clementine wanted him to go buy more wine."
            ],
            "optionsEn": [
                "Clementine actually wanted him to leave immediately.",
                "Clementine confesses she was actually going to say 'stay with me.'",
                "Clementine had already called the police on him.",
                "Clementine wanted him to go buy more wine."
            ],
            "optionsVi": [
                "Clementine thực sự muốn anh rời đi ngay lập tức.",
                "Clementine thú nhận rằng lúc đó cô đã định nói 'hãy ở lại bên em đi.'",
                "Clementine đã gọi báo cảnh sát bắt anh từ trước đó.",
                "Clementine muốn anh đi mua thêm rượu vang."
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 60, Clementine confesses: 'I was going to say stay with me.' Both lovers desperately wanted to be together, but emotional defensiveness and fear of vulnerability led to an avoidable separation.",
            "explanationEn": "In Segment 60, Clementine confesses: 'I was going to say stay with me.' Both lovers desperately wanted to be together, but emotional defensiveness and fear of vulnerability led to an avoidable separation.",
            "explanationVi": "Trong Phân đoạn 60, Clementine thú nhận: 'I was going to say stay with me' (Lúc đó em đã định bảo hãy ở lại bên em). Cả hai đều khao khát được ở bên nhau nhưng sự phòng thủ cảm xúc và nỗi sợ bị tổn thương đã dẫn đến một cuộc chia ly đáng tiếc.",
            "targetedConcept": "Emotional vulnerability vs defensiveness in relationships",
            "targetedConceptEn": "Emotional vulnerability vs defensiveness in relationships",
            "targetedConceptVi": "Sự mở lòng dễ bị tổn thương đối lập với cơ chế phòng thủ tâm lý trong tình yêu",
            "referenceSegmentIndex": 60
        },
        {
            "id": "mov_rom_10_q7",
            "question": "What does Clementine suggest to Joel in Segment 68 when he says 'There's no memory left'?",
            "questionEn": "What does Clementine suggest to Joel in Segment 68 when he says 'There's no memory left'?",
            "questionVi": "Clementine gợi ý điều gì với Joel trong Phân đoạn 68 khi anh thốt lên 'Ký ức chẳng còn lại gì nữa rồi'?",
            "options": [
                "'Run as fast as you can to the beach.'",
                "'Come back and make up a goodbye at least. Let's pretend we had one.'",
                "'Call Dr. Mierzwiak to stop the procedure.'",
                "'Hide under the floorboards.'"
            ],
            "optionsEn": [
                "'Run as fast as you can to the beach.'",
                "'Come back and make up a goodbye at least. Let's pretend we had one.'",
                "'Call Dr. Mierzwiak to stop the procedure.'",
                "'Hide under the floorboards.'"
            ],
            "optionsVi": [
                "'Hãy chạy nhanh nhất có thể ra ngoài bãi biển.'",
                "'Ít nhất hãy quay lại đây và cùng nói một lời tạm biệt tử tế. Hãy giả vờ như chúng mình đã từng có một lời chia tay.'",
                "'Hãy gọi điện cho Bác sĩ Mierzwiak để dừng quy trình lại.'",
                "'Hãy trốn xuống dưới sàn nhà đi anh.'"
            ],
            "optionsVi": [
                "'Hãy chạy nhanh nhất có thể ra ngoài bãi biển.'",
                "'Ít nhất hãy quay lại đây và cùng nói một lời tạm biệt tử tế. Hãy giả vờ như chúng mình đã từng có một lời chia tay.'",
                "'Hãy gọi điện cho Bác sĩ Mierzwiak để dừng quy trình lại.'",
                "'Hãy trốn xuống dưới sàn nhà đi anh.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 67-68, Clementine says: 'Come back and make up a goodbye at least. Let's pretend we had one.' She invites Joel to create emotional closure in imagination before their real-world memory completely vanishes.",
            "explanationEn": "In Segments 67-68, Clementine says: 'Come back and make up a goodbye at least. Let's pretend we had one.' She invites Joel to create emotional closure in imagination before their real-world memory completely vanishes.",
            "explanationVi": "Trong các Phân đoạn 67-68, Clementine khuyên: 'Ít nhất hãy quay lại đây và cùng nói một lời tạm biệt tử tế. Hãy giả vờ như chúng mình đã từng có một lời chia tay.' Cô rủ Joel cùng tạo nên một kết thúc trọn vẹn trong tâm tưởng trước khi ký ức bị xóa bỏ vĩnh viễn.",
            "targetedConcept": "Psychological closure and symbolic farewell",
            "targetedConceptEn": "Psychological closure and symbolic farewell",
            "targetedConceptVi": "Sự khép lại tâm lý (closure) và nghi thức tiễn biệt mang tính biểu tượng",
            "referenceSegmentIndex": 67
        },
        {
            "id": "mov_rom_10_q8",
            "question": "How does Stan casually describe Clementine to Mary in the closing scene (Segment 78), creating a stark emotional contrast with Joel's profound tragedy?",
            "questionEn": "How does Stan casually describe Clementine to Mary in the closing scene (Segment 78), creating a stark emotional contrast with Joel's profound tragedy?",
            "questionVi": "Stan nhận xét một cách dửng dưng thế nào về Clementine với Mary trong cảnh kết (Phân đoạn 78), tạo nên sự tương phản nghiệt ngã với bi kịch sâu sắc của Joel?",
            "options": [
                "'She was the love of his entire life.'",
                "'She was just a girl.'",
                "'She was an undercover government agent.'",
                "'She was an artist from Manhattan.'"
            ],
            "optionsEn": [
                "'She was the love of his entire life.'",
                "'She was just a girl.'",
                "'She was an undercover government agent.'",
                "'She was an artist from Manhattan.'"
            ],
            "optionsVi": [
                "'Cô ấy là tình yêu lớn nhất của cả cuộc đời anh ta.'",
                "'Cô ấy cũng chỉ là một cô gái bình thường thôi mà.'",
                "'Cô ấy là một đặc vụ chính phủ ngầm.'",
                "'Cô ấy là một nghệ sĩ đến từ Manhattan.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 78, Stan shrugs off Joel's monumental heartbreak with: 'She was just a girl.' This callous, mundane remark powerfully highlights how a stranger's life-defining romance is treated as mere routine paperwork by the technicians.",
            "explanationEn": "In Segment 78, Stan shrugs off Joel's monumental heartbreak with: 'She was just a girl.' This callous, mundane remark powerfully highlights how a stranger's life-defining romance is treated as mere routine paperwork by the technicians.",
            "explanationVi": "Trong Phân đoạn 78, Stan nhún vai nhận xét thờ ơ: 'She was just a girl' (Cô ấy cũng chỉ là một cô gái bình thường thôi mà). Câu nói tầm thường này làm nổi bật sự mỉa mai cay đắng khi mối tình định mệnh của một con người chỉ là một mớ hồ sơ giấy tờ thường nhật đối với những kẻ làm dịch vụ xóa não.",
            "targetedConcept": "Dramatic irony and thematic contrast between sublime love and mundane reality",
            "targetedConceptEn": "Dramatic irony and thematic contrast between sublime love and mundane reality",
            "targetedConceptVi": "Nghệ thuật tương phản kịch tính giữa tình yêu vĩ đại và thực tại tầm thường",
            "referenceSegmentIndex": 78
        }
    ]
}

# Generate TypeScript code
ts_code = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Eternal Sunshine: Meet Me in Montauk - Joel and Clementine's Fading Memory (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B2 | American Accent
 * YouTube ID: 9lo1ncSInLI (05:16 - 316s)
 * Views: 141,034 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (CHARLIE KAUFMAN MASTER CUT)
 * ZERO MERGED UTTERANCES - PHÂN TÁCH ĐỘC LẬP TỪNG SPEAKER TURN
 * TỔNG CỘNG: {len(segments)} PURE MASTER SEGMENTS (00:00 - 05:15)
 * ============================================================================
 */

export const QUIZ_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK_EXTENDED: VideoQuizData = {json.dumps(quiz_data, ensure_ascii=False, indent=2)};
export const QUIZ_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK = QUIZ_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK_EXTENDED;

export const LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK: MockVideoLesson = {{
  id: "mov_rom_10",
  slug: "eternal-sunshine-meet-me-in-montauk",
  title: "Eternal Sunshine: Meet Me in Montauk - Joel and Clementine's Fading Memory (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "05:16",
  durationSeconds: 316,
  externalId: "9lo1ncSInLI",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/9lo1ncSInLI/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 128,
  viewCount: 141034,
  studyCount: 3820,
  description:
    "Trường đoạn cao trào kinh điển của kiệt tác điện ảnh Eternal Sunshine of the Spotless Mind: Joel và Clementine trú ẩn trong ngôi biệt thự ven biển Montauk đang sụp đổ trong tâm trí khi cỗ máy Lacuna tẩy xóa ký ức, nơi lời thì thầm định mệnh 'Meet me in Montauk' trở thành hạt giống đưa họ tìm lại nhau.",
  segments: {json.dumps(segments, ensure_ascii=False, indent=4)},
  quiz: QUIZ_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK_EXTENDED,
}};

export default LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK;
'''

output_path = "features/listening/data/lessons/movies/romance/lesson_eternal_sunshine.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Generated {output_path} successfully with {len(segments)} segments and 8 quiz questions!")
