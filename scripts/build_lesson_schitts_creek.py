# -*- coding: utf-8 -*-
"""
Builder script for Schitt's Creek (mov_sit_12)
Standardized Pure Master Segments & 8 CEFR B2 Quiz Questions
"""
import json
import re

# We define the comprehensive segments array with 100% data coverage
segments_data = [
    # Act 1: Who Gets Murdered First? (0.0s - 21.6s)
    {
        "startTime": 0.0,
        "endTime": 3.0,
        "text": "You know what, David? You get murdered first!",
        "translationVi": "Anh biết gì không hả David? Anh sẽ là người bị sát hại đầu tiên đấy!",
        "ipaUs": "/juː noʊ wʌt, ˈdeɪvɪd? juː ɡɛt ˈmɜːrdərd fɜːrst!/",
        "keywords": ["you know what", "murdered first"],
        "explanationAi": "Alexis mở đầu cuộc khẩu chiến kinh điển bằng câu dọa dẫm hài hước đặc trưng khi hai chị em tranh cãi về sự an toàn trong thị trấn nhỏ.",
        "properNouns": ["David"]
    },
    {
        "startTime": 3.1,
        "endTime": 6.2,
        "text": "For what? No, you get murdered, David! You get murdered first!",
        "translationVi": "Vì cái cớ gì chứ? Không, anh mới là người bị sát hại ấy David! Anh bị giết trước!",
        "ipaUs": "/fɔːr wʌt? noʊ, juː ɡɛt ˈmɜːrdərd, ˈdeɪvɪd! juː ɡɛt ˈmɜːrdərd fɜːrst!/",
        "keywords": ["for what", "get murdered"],
        "explanationAi": "David phản pháo ngay lập tức bằng việc nhại lại điệu bộ của Alexis với ngữ điệu hoảng loạn đặc trưng.",
        "properNouns": ["David"]
    },
    {
        "startTime": 6.3,
        "endTime": 15.3,
        "text": "No, you! It's to cure my hiccups, David! I have the hiccups, okay?",
        "translationVi": "Không, là anh đấy! Trò đó là để chữa cơn nấc cụt của tôi thôi David! Tôi đang bị nấc cụt, được chưa hả?",
        "ipaUs": "/noʊ, juː! ɪts tuː kjʊr maɪ ˈhɪkʌps, ˈdeɪvɪd! aɪ hæv ðə ˈhɪkʌps, ˌoʊˈkeɪ?/",
        "keywords": ["cure my hiccups", "have the hiccups"],
        "explanationAi": "Danh từ số nhiều 'hiccups' (chứng nấc cụt) và mẹo dân gian làm người khác giật mình sợ hãi để hết nấc.",
        "properNouns": ["David"]
    },
    {
        "startTime": 15.4,
        "endTime": 21.6,
        "text": "Did I dump you for a party?",
        "translationVi": "Tôi đã từng đá anh để đi quẩy tiệc tùng bao giờ chưa hả?",
        "ipaUs": "/dɪd aɪ dʌmp juː fɔːr ə ˈpɑːrti?/",
        "keywords": ["dump you", "for a party"],
        "explanationAi": "Động từ tiếng lóng 'dump' (bỏ rơi, đá ai đó trong một mối quan hệ hoặc sự kiện).",
        "properNouns": []
    },

    # Act 2: David's Heart Attack Panic & Prison Contacts (21.6s - 46.9s)
    {
        "startTime": 21.6,
        "endTime": 30.1,
        "text": "How many people do you know that are currently in the prison system talking about you?",
        "translationVi": "Có bao nhiêu người hiện đang ngồi tù mà vẫn nhắc đến tên của cô hả?",
        "ipaUs": "/haʊ ˈmɛni ˈpiːpəl duː juː noʊ ðæt ɑːr ˈkɜːrəntli ɪn ðə ˈprɪzən ˈsɪstəm ˈtɔːkɪŋ əˈbaʊt juː?/",
        "keywords": ["currently in prison", "prison system"],
        "explanationAi": "David châm chọc quá khứ giao du với các trùm tội phạm và tỷ phú ngầm quốc tế khét tiếng của Alexis.",
        "properNouns": []
    },
    {
        "startTime": 30.1,
        "endTime": 32.4,
        "text": "I think I'm having a heart attack, that's what's happening!",
        "translationVi": "Tôi nghĩ là tôi sắp lên cơn đau tim đến nơi rồi, chính xác là như thế đấy!",
        "ipaUs": "/aɪ θɪŋk aɪm ˈhævɪŋ ə hɑːrt əˈtæk, ðæts wʌts ˈhæpənɪŋ!/",
        "keywords": ["heart attack", "what's happening"],
        "explanationAi": "Chứng lo âu bệnh tật kinh niên của David: cụm 'having a heart attack' (lên cơn đau tim).",
        "properNouns": []
    },
    {
        "startTime": 32.4,
        "endTime": 37.6,
        "text": "You are like thirty-four!",
        "translationVi": "Anh mới có khoảng ba mươi tư tuổi thôi đấy!",
        "ipaUs": "/juː ɑːr laɪk ˈθɜːrti-fɔːr!/",
        "keywords": ["thirty-four"],
        "explanationAi": "Alexis gạt phăng sự lo lắng thái quá của anh trai bằng việc nhắc lại tuổi đời còn quá trẻ.",
        "properNouns": []
    },
    {
        "startTime": 37.6,
        "endTime": 46.9,
        "text": "Why is it dark like a witch's house in here?",
        "translationVi": "Tại sao trong này lại tối om như túp lều của mụ phù thủy thế này?",
        "ipaUs": "/waɪ ɪz ɪt dɑːrk laɪk ə ˈwɪtʃɪz haʊs ɪn hɪr?/",
        "keywords": ["dark like a witch's house"],
        "explanationAi": "Phép so sánh hình tượng khôi hài của David: 'dark like a witch's house' (tối tăm u ám như nhà phù thủy).",
        "properNouns": []
    },

    # Act 3: Stolen Yogurt & Facial Mask (46.9s - 89.6s)
    {
        "startTime": 46.9,
        "endTime": 52.4,
        "text": "Shush! I texted Alexis. I'm sorry for not responding to like one text, David!",
        "translationVi": "Suỵt! Tôi đã nhắn tin cho Alexis rồi. Tôi xin lỗi vì lỡ không trả lời đúng một tin nhắn của anh nhé David!",
        "ipaUs": "/ʃʊʃ! aɪ ˈtɛkstɪd əˈlɛksɪs. aɪm ˈsɑːri fɔːr nɑːt rɪˈspɑːndɪŋ tuː laɪk wʌn tɛkst, ˈdeɪvɪd!/",
        "keywords": ["shush", "responding to one text"],
        "explanationAi": "Thán từ 'shush' (im lặng đi) và lời bao biện của Alexis về việc phớt lờ tin nhắn.",
        "properNouns": ["Alexis", "David"]
    },
    {
        "startTime": 52.4,
        "endTime": 55.6,
        "text": "So what? She was eating my yogurt!",
        "translationVi": "Thế thì đã sao nào? Cô ta vừa ăn vụng sữa chua của tôi!",
        "ipaUs": "/soʊ wʌt? ʃiː wʌz ˈiːtɪŋ maɪ ˈjoʊɡərt!/",
        "keywords": ["so what", "eating my yogurt"],
        "explanationAi": "David phẫn nộ vì món ăn yêu thích trong tủ lạnh của mình bị ăn mất.",
        "properNouns": []
    },
    {
        "startTime": 55.6,
        "endTime": 59.8,
        "text": "Huh? What kind of yogurt?",
        "translationVi": "Hả? Loại sữa chua gì cơ chứ?",
        "ipaUs": "/hʌ? wʌt kaɪnd əv ˈjoʊɡərt?/",
        "keywords": ["what kind of yogurt"],
        "explanationAi": "Câu hỏi tò mò về nhãn hiệu sữa chua bị ăn vụng.",
        "properNouns": []
    },
    {
        "startTime": 59.8,
        "endTime": 64.4,
        "text": "I was saving that for after my run, David!",
        "translationVi": "Tôi đã để dành hộp đó cho sau buổi chạy bộ cơ mà David!",
        "ipaUs": "/aɪ wʌz ˈseɪvɪŋ ðæt fɔːr ˈæftər maɪ rʌn, ˈdeɪvɪd!/",
        "keywords": ["saving that", "after my run"],
        "explanationAi": "Cụm 'save something for' (để dành thứ gì cho một dịp sau đó).",
        "properNouns": ["David"]
    },
    {
        "startTime": 64.4,
        "endTime": 70.9,
        "text": "Oh my god, I guess I was saving it for during your run then, see ya!",
        "translationVi": "Ôi trời đất ơi, thế thì chắc là tôi để dành ăn nó trong lúc anh đang chạy bộ rồi, chào nhé!",
        "ipaUs": "/oʊ maɪ ɡɑːd, aɪ ɡɛs aɪ wʌz ˈseɪvɪŋ ɪt fɔːr ˈdʊrɪŋ jʊr rʌn ðɛn, siː jə!/",
        "keywords": ["during your run", "see ya"],
        "explanationAi": "Câu trả lời trêu ngươi cộp mác Alexis Rose: nhại lại chữ 'saving' để chọc tức anh trai.",
        "properNouns": []
    },
    {
        "startTime": 70.9,
        "endTime": 77.7,
        "text": "It's gonna be so fun! Don't touch me tonight!",
        "translationVi": "Chuyện này sẽ vui lắm đây! Tối nay cấm có được chạm vào người tôi đấy nhé!",
        "ipaUs": "/ɪts ˈɡɑːnə biː soʊ fʌn! doʊnt tʌtʃ miː təˈnaɪt!/",
        "keywords": ["so fun", "don't touch me"],
        "explanationAi": "David đưa ra lời cảnh cáo đanh đá khi bị xâm phạm không gian cá nhân.",
        "properNouns": []
    },
    {
        "startTime": 77.7,
        "endTime": 80.7,
        "text": "I'm the one who should be at a sketchy bar meeting randoms!",
        "translationVi": "Tôi mới là người đáng ra phải đang ngồi ở một quán bar mờ ám giao lưu với mấy kẻ lạ mặt!",
        "ipaUs": "/aɪm ðə wʌn huː ʃʊd biː æt ə ˈskɛtʃi bɑːr ˈmiːtɪŋ ˈrændəmz!/",
        "keywords": ["sketchy bar", "meeting randoms"],
        "explanationAi": "Cặp từ lóng sành điệu: 'sketchy bar' (quán bar đáng ngờ, mờ ám) và danh từ số nhiều 'randoms' (những kẻ lạ mặt ngẫu nhiên).",
        "properNouns": []
    },
    {
        "startTime": 80.7,
        "endTime": 85.0,
        "text": "I'm the one who should go missing!",
        "translationVi": "Tôi mới là người nên bị mất tích này!",
        "ipaUs": "/aɪm ðə wʌn huː ʃʊd ɡoʊ ˈmɪsɪŋ!/",
        "keywords": ["go missing"],
        "explanationAi": "Cụm 'go missing' (mất tích) gợi nhớ những lần Alexis từng bị lạc trên du thuyền hay bắt cóc ở nước ngoài.",
        "properNouns": []
    },
    {
        "startTime": 85.0,
        "endTime": 86.5,
        "text": "Well then come!",
        "translationVi": "Thế thì đi cùng đi chứ!",
        "ipaUs": "/wɛl ðɛn kʌm!/",
        "keywords": ["then come"],
        "explanationAi": "David thách thức Alexis tham gia cùng mình.",
        "properNouns": []
    },
    {
        "startTime": 86.5,
        "endTime": 87.6,
        "text": "I can't!",
        "translationVi": "Tôi không đi được!",
        "ipaUs": "/aɪ kænt!/",
        "keywords": ["I can't"],
        "explanationAi": "Alexis từ chối thẳng thừng.",
        "properNouns": []
    },
    {
        "startTime": 87.6,
        "endTime": 89.6,
        "text": "Why? Well, for one thing, this mask doesn't come off for another twenty minutes.",
        "translationVi": "Tại sao? Chà, trước hết là chiếc mặt nạ dưỡng da này phải tận hai mươi phút nữa mới được tháo ra đấy.",
        "ipaUs": "/waɪ? wɛl, fɔːr wʌn θɪŋ, ðɪs mæsk ˈdʌzənt kʌm ɔːf fɔːr əˈnʌðər ˈtwɛnti ˈmɪnɪts./",
        "keywords": ["for one thing", "mask doesn't come off", "twenty minutes"],
        "explanationAi": "Lý do ưu tiên tối thượng của một tiểu thư: việc dưỡng da bằng mặt nạ quan trọng hơn bất kỳ cuộc giải cứu nào.",
        "properNouns": []
    },

    # Act 4: Apartment Hunting & Edible Nail Polish Scandal (89.6s - 123.4s)
    {
        "startTime": 89.6,
        "endTime": 93.3,
        "text": "Bring it in, big guy.",
        "translationVi": "Lại đây ôm cái nào, anh bạn to xác.",
        "ipaUs": "/brɪŋ ɪt ɪn, bɪɡ ɡaɪ./",
        "keywords": ["bring it in", "big guy"],
        "explanationAi": "Cụm thành ngữ thân mật 'bring it in' (lại đây ôm một cái nào).",
        "properNouns": []
    },
    {
        "startTime": 93.3,
        "endTime": 96.4,
        "text": "Yeah, I don't know if that's something I want to do right now, David.",
        "translationVi": "Ừm, tôi không chắc là tôi muốn làm chuyện đó ngay lúc này đâu David à.",
        "ipaUs": "/jɛə, aɪ doʊnt noʊ ɪf ðæts ˈsʌmθɪŋ aɪ wɑːnt tuː duː raɪt naʊ, ˈdeɪvɪd./",
        "keywords": ["want to do right now"],
        "explanationAi": "David khước từ cái ôm gượng gạo.",
        "properNouns": ["David"]
    },
    {
        "startTime": 96.5,
        "endTime": 103.6,
        "text": "Speaking of which, David, I'm gonna need you to come and look at the apartment with me, okay?",
        "translationVi": "Nhân tiện nhắc đến chuyện đó, David, tôi sẽ cần anh đi cùng để xem căn hộ mới với tôi đấy, được không?",
        "ipaUs": "/ˈspiːkɪŋ əv wɪtʃ, ˈdeɪvɪd, aɪm ˈɡɑːnə niːd juː tuː kʌm ænd lʊk æt ði əˈpɑːrtmənt wɪð miː, ˌoʊˈkeɪ?/",
        "keywords": ["speaking of which", "look at the apartment"],
        "explanationAi": "Cụm liên kết hội thoại 'speaking of which' (nhân tiện nhắc đến điều đó).",
        "properNouns": ["David"]
    },
    {
        "startTime": 103.6,
        "endTime": 105.9,
        "text": "Why would I do that?",
        "translationVi": "Tại sao tôi lại phải làm việc đó cơ chứ?",
        "ipaUs": "/waɪ wʊd aɪ duː ðæt?/",
        "keywords": ["why would I do that"],
        "explanationAi": "David nghi ngờ mục đích của cô em gái.",
        "properNouns": []
    },
    {
        "startTime": 105.9,
        "endTime": 107.4,
        "text": "This is cute, right? Super cute! Wait, is it cute?",
        "translationVi": "Cái này dễ thương đúng không? Siêu cấp dễ thương luôn! Khoan đã, nó có thực sự dễ thương không nhỉ?",
        "ipaUs": "/ðɪs ɪz kjuːt, raɪt? ˈsuːpər kjuːt! weɪt, ɪz ɪt kjuːt?/",
        "keywords": ["super cute", "is it cute"],
        "explanationAi": "Alexis chuyển từ tự tin tuyệt đối sang hoài nghi gu thẩm mỹ thời trang của chính mình chỉ trong một giây.",
        "properNouns": []
    },
    {
        "startTime": 107.4,
        "endTime": 111.8,
        "text": "Putting your name on a line of edible nail polish isn't what I would call having a job!",
        "translationVi": "Đặt tên cô lên một dòng sơn móng tay ăn được không phải là cái thứ mà tôi gọi là đi làm có công việc đàng hoàng đâu!",
        "ipaUs": "/ˈpʊtɪŋ jʊr neɪm ɑːn ə laɪn əv ˈɛdəbəl neɪl ˈpɑːlɪʃ ˈɪzənt wʌt aɪ wʊd kɔːl ˈhævɪŋ ə dʒɑːb!/",
        "keywords": ["line of edible nail polish", "having a job"],
        "explanationAi": "Cụm danh từ 'edible nail polish' (sơn móng tay ăn được) - một trong những dự án khởi nghiệp kỳ cục thời thượng của Alexis.",
        "properNouns": []
    },
    {
        "startTime": 111.8,
        "endTime": 116.5,
        "text": "I was very hands-on, David! I came up with all of the flavors by myself!",
        "translationVi": "Tôi đã đích thân bắt tay vào làm việc rất sâu sát đấy David! Tôi tự mình sáng tạo ra tất cả các hương vị đó!",
        "ipaUs": "/aɪ wʌz ˈvɛri hændz-ɑːn, ˈdeɪvɪd! aɪ keɪm ʌp wɪð ɔːl əv ðə ˈfleɪvərz baɪ maɪˈsɛlf!/",
        "keywords": ["hands-on", "came up with", "flavors by myself"],
        "explanationAi": "Tính từ ghép 'hands-on' (trực tiếp tham gia, sâu sát thực tế) và cụm động từ 'come up with' (nghĩ ra, nảy ra ý tưởng).",
        "properNouns": ["David"]
    },
    {
        "startTime": 116.5,
        "endTime": 121.6,
        "text": "Even the one that poisoned all those people, David?",
        "translationVi": "Kể cả cái hương vị đã làm ngộ độc cả đống người đó hả David?",
        "ipaUs": "/ˈiːvən ðə wʌn ðæt ˈpɔɪzənd ɔːl ðoʊz ˈpiːpəl, ˈdeɪvɪd?/",
        "keywords": ["poisoned all those people"],
        "explanationAi": "Động từ 'poison' (đầu độc, làm ngộ độc) vạch trần thảm họa sản phẩm kém an toàn trong quá khứ.",
        "properNouns": ["David"]
    },
    {
        "startTime": 121.6,
        "endTime": 123.4,
        "text": "The factory in Guangzhou assured us that it was lead-free!",
        "translationVi": "Nhà máy ở Quảng Châu đã cam đoan với chúng tôi là nó hoàn toàn không chứa chì rồi mà!",
        "ipaUs": "/ðə ˈfæktəri ɪn ˈɡwɑːŋˈdʒoʊ əˈʃʊrd ʌs ðæt ɪt wʌz lɛd-friː!/",
        "keywords": ["factory in Guangzhou", "assured us", "lead-free"],
        "explanationAi": "Tính từ 'lead-free' (không chứa chì độc hại) và sự bào chữa ngây thơ khi đặt hàng gia công giá rẻ.",
        "properNouns": ["Guangzhou"]
    },

    # Act 5: The Cake Icing & Shared Boyfriend (123.5s - 137.9s)
    {
        "startTime": 123.5,
        "endTime": 126.5,
        "text": "Who picked through my cake and only left the icing?",
        "translationVi": "Kẻ nào đã khoét sạch phần bánh kem của tôi mà chỉ chừa lại đúng lớp kem phủ bề mặt thế này?",
        "ipaUs": "/huː pɪkt θruː maɪ keɪk ænd ˈoʊnli lɛft ði ˈaɪsɪŋ?/",
        "keywords": ["picked through", "only left the icing"],
        "explanationAi": "Cụm động từ 'pick through' (bới, khoét chọn phần ngon) và danh từ làm bánh 'icing' (lớp kem phủ đường bên ngoài bánh ngọt).",
        "properNouns": []
    },
    {
        "startTime": 126.5,
        "endTime": 128.1,
        "text": "Oh, it's the icing!",
        "translationVi": "Ôi dào, chỉ là lớp kem thôi mà!",
        "ipaUs": "/oʊ, ɪts ði ˈaɪsɪŋ!/",
        "keywords": ["it's the icing"],
        "explanationAi": "Alexis xem việc ăn bớt bánh là chuyện hết sức bình thường.",
        "properNouns": []
    },
    {
        "startTime": 128.1,
        "endTime": 131.6,
        "text": "What kind of barnyard were you raised in where you just eat someone else's food?",
        "translationVi": "Cô được nuôi lớn ở cái chuồng gia súc nào mà lại điềm nhiên ăn đồ ăn của người khác như thế hả?",
        "ipaUs": "/wʌt kaɪnd əv ˈbɑːrnˌjɑːrd wɜːr juː reɪzd ɪn wɛr juː dʒʌst iːt ˈsʌmˌwʌnz ɛlsɪz fuːd?/",
        "keywords": ["barnyard", "raised in", "eat someone else's food"],
        "explanationAi": "Từ miệt thị hài hước 'barnyard' (chuồng gia súc chăn thả) mà David dùng để chỉ thói quen ăn uống vô phép tắc của em gái.",
        "properNouns": []
    },
    {
        "startTime": 131.6,
        "endTime": 137.9,
        "text": "So you can share a boyfriend, but you can't share a piece of cake?!",
        "translationVi": "Thế ra anh có thể chia sẻ chung một anh bạn trai, nhưng lại chẳng thể chia sẻ nổi một miếng bánh kem cơ à?!",
        "ipaUs": "/soʊ juː kæn ʃɛr ə ˈbɔɪˌfrɛnd, bʌt juː kænt ʃɛr ə piːs əv keɪk?!/",
        "keywords": ["share a boyfriend", "share a piece of cake"],
        "explanationAi": "Đòn phản công sắc sảo của Alexis nhắc lại mối quan hệ tay ba phức tạp trong quá khứ của David.",
        "properNouns": []
    },

    # Act 6: Driving Lessons & Parallel Parking in a Burka (137.9s - 151.2s)
    {
        "startTime": 137.9,
        "endTime": 141.6,
        "text": "Not all of us can flirt our way into getting driving lessons, okay?",
        "translationVi": "Không phải ai trong chúng ta cũng có thể tán tỉnh ve vãn để được dạy lái xe miễn phí đâu nhé, được chưa?",
        "ipaUs": "/nɑːt ɔːl əv ʌs kæn flɜːrt ˈaʊər weɪ ˈɪntuː ˈɡɛtɪŋ ˈdraɪvɪŋ ˈlɛsənz, ˌoʊˈkeɪ?/",
        "keywords": ["flirt our way into", "driving lessons"],
        "explanationAi": "Cấu trúc thành ngữ 'flirt one's way into' (dùng nhan sắc tán tỉnh để đạt được mục đích).",
        "properNouns": []
    },
    {
        "startTime": 141.6,
        "endTime": 144.0,
        "text": "You try parallel parking in a burka, David!",
        "translationVi": "Thế anh thử ghép xe đỗ song song trong một bộ áo choàng burka xem nào David!",
        "ipaUs": "/juː traɪ ˈpærəˌlɛl ˈpɑːrkɪŋ ɪn ə ˈbɜːrkə, ˈdeɪvɪd!/",
        "keywords": ["parallel parking", "in a burka"],
        "explanationAi": "Thuật ngữ lái xe 'parallel parking' (đỗ xe ghép song song) kết hợp bộ trang phục trùm kín 'burka' tạo nên câu thoại nổi tiếng nhất của Alexis.",
        "properNouns": ["David"]
    },
    {
        "startTime": 144.0,
        "endTime": 148.0,
        "text": "What are you doing? Reorganizing my knits.",
        "translationVi": "Anh đang làm cái gì đấy? Sắp xếp lại đống đồ len dệt kim của tôi.",
        "ipaUs": "/wʌt ɑːr juː ˈduːɪŋ? ˌriːˈɔːrɡəˌnaɪzɪŋ maɪ nɪts./",
        "keywords": ["reorganizing", "my knits"],
        "explanationAi": "Danh từ số nhiều 'knits' (đồ len đan, áo dệt kim) - niềm đam mê thời trang bất tận của David.",
        "properNouns": []
    },
    {
        "startTime": 148.1,
        "endTime": 151.2,
        "text": "I think you're brave. Well, that's very nice of you to say, David... He's being sarcastic! What? What?!",
        "translationVi": "Tôi thấy anh thật dũng cảm đấy. Chà, anh khen thế thật tử tế quá David... Anh ta đang mỉa mai đấy! Cái gì cơ? Cái gì?!",
        "ipaUs": "/aɪ θɪŋk jʊr breɪv. wɛl, ðæts ˈvɛri naɪs əv juː tuː seɪ, ˈdeɪvɪd... hiːz ˈbiːɪŋ sɑːrˈkæstɪk! wʌt? wʌt?!/",
        "keywords": ["you're brave", "being sarcastic"],
        "explanationAi": "Tính từ 'sarcastic' (mỉa mai, châm biếm) khi người thứ ba chỉ ra sự giả trân trong lời khen.",
        "properNouns": ["David"]
    },

    # Act 7: Hand Cream & The Twin Nightmare (151.2s - 179.9s)
    {
        "startTime": 151.2,
        "endTime": 155.4,
        "text": "Ugh, David! I asked you to get the box of hand cream, not sample the hand cream!",
        "translationVi": "Eo ôi David! Tôi nhờ anh lấy cả hộp kem dưỡng da tay, chứ không phải đi dùng thử mẫu kem đâu nhé!",
        "ipaUs": "/ʌɡ, ˈdeɪvɪd! aɪ æskt juː tuː ɡɛt ðə bɑːks əv hænd kriːm, nɑːt ˈsæmpəl ðə hænd kriːm!/",
        "keywords": ["box of hand cream", "sample the hand cream"],
        "explanationAi": "Động từ 'sample' (dùng thử sản phẩm mẫu dùng thử miễn phí).",
        "properNouns": ["David"]
    },
    {
        "startTime": 155.4,
        "endTime": 158.9,
        "text": "That's like fifty-three pounds! Why are you here?",
        "translationVi": "Cái hũ đó đáng giá tận năm mươi ba bảng Anh đấy! Tại sao anh lại ở đây?",
        "ipaUs": "/ðæts laɪk ˈfɪfti-θriː paʊndz! waɪ ɑːr juː hɪr?/",
        "keywords": ["fifty-three pounds", "why are you here"],
        "explanationAi": "Đơn vị tiền tệ bảng Anh 'pounds' cho thấy thói quen dùng hàng xa xỉ nhập khẩu.",
        "properNouns": []
    },
    {
        "startTime": 158.9,
        "endTime": 162.5,
        "text": "When the twins arrive, I'm gonna really need your help.",
        "translationVi": "Khi cặp sinh đôi chào đời, tôi sẽ thực sự rất cần sự giúp đỡ của cô đấy.",
        "ipaUs": "/wɛn ðə twɪnz əˈraɪv, aɪm ˈɡɑːnə ˈrɪəli niːd jʊr hɛlp./",
        "keywords": ["twins arrive", "need your help"],
        "explanationAi": "David lo sợ trước viễn cảnh nuôi dạy trẻ con sinh đôi.",
        "properNouns": []
    },
    {
        "startTime": 162.5,
        "endTime": 165.2,
        "text": "Um, that's a hard pass! He's so involved in their lives.",
        "translationVi": "Ừm, tôi xin kiên quyết từ chối nhé! Anh ta cứ thích can thiệp sâu vào đời người khác thế cơ chứ.",
        "ipaUs": "/ʌm, ðæts ə hɑːrd pæs! hiːz soʊ ɪnˈvɑːlvd ɪn ðɛr laɪvz./",
        "keywords": ["hard pass", "involved in their lives"],
        "explanationAi": "Thành ngữ từ chối dứt khoát 'a hard pass' (tuyệt đối không, kiên quyết bỏ qua).",
        "properNouns": []
    },
    {
        "startTime": 165.2,
        "endTime": 167.8,
        "text": "Your body, your problem, David. Alexis isn't pregnant!",
        "translationVi": "Thân thể của anh, rắc rối của anh nhé David. Alexis không hề có bầu!",
        "ipaUs": "/jʊr ˈbɑːdi, jʊr ˈprɑːbləm, ˈdeɪvɪd. əˈlɛksɪs ˈɪzənt ˈprɛɡnənt!/",
        "keywords": ["your body, your problem", "isn't pregnant"],
        "explanationAi": "Alexis phủ nhận tin đồn mang thai và đùn đẩy trách nhiệm.",
        "properNouns": ["David", "Alexis"]
    },
    {
        "startTime": 167.8,
        "endTime": 171.5,
        "text": "Okay, but just picture them! It's like tiny little roommates!",
        "translationVi": "Được rồi, nhưng cô cứ thử hình dung chúng xem! Trông giống như những người bạn cùng phòng tí hon vậy!",
        "ipaUs": "/ˌoʊˈkeɪ, bʌt dʒʌst ˈpɪktʃər ðɛm! ɪts laɪk ˈtaɪni ˈlɪtəl ˈruːmˌmeɪts!/",
        "keywords": ["picture them", "tiny roommates"],
        "explanationAi": "Động từ 'picture' (mường tượng, hình dung trong đầu) và cách gọi trẻ em là 'roommates'.",
        "properNouns": []
    },
    {
        "startTime": 171.5,
        "endTime": 179.9,
        "text": "There's tiny little poops you get to clean up!",
        "translationVi": "Sẽ có những bãi phân tí hon mà cô phải dọn dẹp mỗi ngày đấy!",
        "ipaUs": "/ðɛrz ˈtaɪni ˈlɪtəl puːps juː ɡɛt tuː kliːn ʌp!/",
        "keywords": ["tiny poops", "clean up"],
        "explanationAi": "Chi tiết tả thực hài hước về việc chăm sóc em bé sơ sinh.",
        "properNouns": []
    },

    # Act 8: Kicked Out of the Car & Walk Home (179.9s - 195.6s)
    {
        "startTime": 179.9,
        "endTime": 183.9,
        "text": "You know what? I can't have your personal drama storming over my business dealings right now.",
        "translationVi": "Anh biết gì không? Tôi không thể để mấy cái rắc rối cá nhân vớ vẩn của anh tràn vào phá hỏng chuyện làm ăn kinh doanh của tôi lúc này đâu.",
        "ipaUs": "/juː noʊ wʌt? aɪ kænt hæv jʊr ˈpɜːrsənəl ˈdrɑːmə ˈstɔːrmɪŋ ˈoʊvər maɪ ˈbɪznəs ˈdiːlɪŋz raɪt naʊ./",
        "keywords": ["personal drama", "business dealings"],
        "explanationAi": "Cụm danh từ 'personal drama' (drama đời tư) và 'business dealings' (giao dịch, đàm phán kinh doanh).",
        "properNouns": []
    },
    {
        "startTime": 183.9,
        "endTime": 187.5,
        "text": "So I think it's best if you got out of the car and walked home.",
        "translationVi": "Nên tôi nghĩ tốt nhất là anh hãy bước xuống khỏi xe và đi bộ về nhà đi.",
        "ipaUs": "/soʊ aɪ θɪŋk ɪts bɛst ɪf juː ɡɑːt aʊt əv ðə kɑːr ænd wɔːkt hoʊm./",
        "keywords": ["best if you got out", "walked home"],
        "explanationAi": "Cấu trúc giả định lịch sự 'It's best if you did something' dùng để đuổi anh trai xuống xe.",
        "properNouns": []
    },
    {
        "startTime": 187.5,
        "endTime": 192.1,
        "text": "Walked home?! That would take like fifteen minutes, David! That's absolutely not happening!",
        "translationVi": "Đi bộ về nhà á?! Đi như thế mất tận mười lăm phút đấy David à! Chuyện đó tuyệt đối không thể nào xảy ra đâu!",
        "ipaUs": "/wɔːkt hoʊm?! ðæt wʊd teɪk laɪk ˈfɪfˌtiːn ˈmɪnɪts, ˈdeɪvɪd! ðæts ˌæbsəˈluːtli nɑːt ˈhæpənɪŋ!/",
        "keywords": ["fifteen minutes", "absolutely not happening"],
        "explanationAi": "Mức độ lười biếng quý tộc hài hước của David: quãng đường 15 phút đi bộ bị coi là hành trình tra tấn bất khả thi.",
        "properNouns": ["David"]
    },
    {
        "startTime": 192.1,
        "endTime": 195.6,
        "text": "He's the only attractive person on here, David. What did you want me to do?",
        "translationVi": "Anh ta là người quyến rũ duy nhất trên ứng dụng này đấy David. Anh còn muốn tôi phải làm sao nữa đây?",
        "ipaUs": "/hiːz ði ˈoʊnli əˈtræktɪv ˈpɜːrsən ɑːn hɪr, ˈdeɪvɪd. wʌt dɪd juː wɑːnt miː tuː duː?/",
        "keywords": ["only attractive person", "what did you want me to do"],
        "explanationAi": "Alexis bào chữa cho việc quẹt phải một đối tượng trên ứng dụng hẹn hò.",
        "properNouns": ["David"]
    },

    # Act 9: Electrical Storm & "Eat Glass, Ken!" (195.6s - 230.9s)
    {
        "startTime": 195.6,
        "endTime": 199.1,
        "text": "Well then go on a date with him! He can't! Fine, then don't keep it! I want to, David!",
        "translationVi": "Thế thì hẹn hò với anh ta đi! — Anh ta không rảnh! — Được rồi, thế thì đừng dây dưa nữa! — Nhưng tôi muốn mà David!",
        "ipaUs": "/wɛl ðɛn ɡoʊ ɑːn ə deɪt wɪð hɪm! hiː kænt! faɪn, ðɛn doʊnt kiːp ɪt! aɪ wɑːnt tuː, ˈdeɪvɪd!/",
        "keywords": ["go on a date", "don't keep it"],
        "explanationAi": "Màn đối đáp chớp nhoáng thể hiện mâu thuẫn nội tâm của Alexis về chuyện tình cảm.",
        "properNouns": ["David"]
    },
    {
        "startTime": 199.1,
        "endTime": 204.7,
        "text": "Oh my god, Alexis, I am suffering! Ted and I got electrical storm...",
        "translationVi": "Ôi lạy Chúa tôi, Alexis ơi, tôi đang phải chịu khổ sở đây này! Ted và tôi vừa gặp một cơn bão điện...",
        "ipaUs": "/oʊ maɪ ɡɑːd, əˈlɛksɪs, aɪ æm ˈsʌfərɪŋ! tɛd ænd aɪ ɡɑːt ɪˈlɛktrɪkəl stɔːrm.../",
        "keywords": ["I am suffering", "electrical storm"],
        "explanationAi": "Động từ 'suffer' (chịu đau đớn, khổ sở) và sự cố chập điện do cắm đồ bừa bãi.",
        "properNouns": ["Alexis", "Ted"]
    },
    {
        "startTime": 204.7,
        "endTime": 206.8,
        "text": "So that's impossible. What did you do to get that?",
        "translationVi": "Điều đó là hoàn toàn bất khả thi. Cô đã làm cái trò gì mà để bị như thế hả?",
        "ipaUs": "/soʊ ðæts ɪmˈpɑːsəbəl. wʌt dɪd juː duː tuː ɡɛt ðæt?/",
        "keywords": ["that's impossible", "what did you do"],
        "explanationAi": "David tra hỏi nguyên nhân vụ chập điện trong phòng.",
        "properNouns": []
    },
    {
        "startTime": 206.8,
        "endTime": 211.3,
        "text": "Did you plug your hair dryer in with wet hands again?",
        "translationVi": "Cô lại cắm phích máy sấy tóc bằng bàn tay ướt sũng nước nữa đúng không?",
        "ipaUs": "/dɪd juː plʌɡ jʊr hɛr ˈdraɪər ɪn wɪð wɛt hændz əˈɡɛn?/",
        "keywords": ["plug hair dryer in", "wet hands"],
        "explanationAi": "Cụm động từ 'plug in' (cắm phích điện) và thói quen nguy hiểm chết người nhưng được kể lại bằng giọng điệu hài hước.",
        "properNouns": []
    },
    {
        "startTime": 211.3,
        "endTime": 215.4,
        "text": "That happened twice, David, let it go! Stop!",
        "translationVi": "Chuyện đó mới chỉ xảy ra có đúng hai lần thôi David, hãy bỏ qua đi! Dừng lại ngay!",
        "ipaUs": "/ðæt ˈhæpənd twaɪs, ˈdeɪvɪd, lɛt ɪt ɡoʊ! stɑːp!/",
        "keywords": ["happened twice", "let it go"],
        "explanationAi": "Thành ngữ 'let it go' (bỏ qua đi, đừng nhắc lại nữa) khi Alexis thừa nhận mình đã làm chập điện hai lần.",
        "properNouns": ["David"]
    },
    {
        "startTime": 215.4,
        "endTime": 217.9,
        "text": "Could be worse, you guys. Could be a total power failure.",
        "translationVi": "Tình hình vẫn có thể tồi tệ hơn đấy hai bạn ơi. Lỡ đâu mất điện toàn bộ thị trấn thì sao.",
        "ipaUs": "/kʊd biː wɜːrs, juː ɡaɪz. kʊd biː ə ˈtoʊtəl ˈpaʊər ˈfeɪljər./",
        "keywords": ["could be worse", "total power failure"],
        "explanationAi": "Người hàng xóm Ken xen vào bình luận về nguy cơ mất điện toàn phần ('power failure').",
        "properNouns": []
    },
    {
        "startTime": 217.9,
        "endTime": 223.3,
        "text": "Mmm, eat glass, Ken!",
        "translationVi": "Hừm, đi mà nhai mảnh thủy tinh đi, Ken!",
        "ipaUs": "/m̩, iːt ɡlæs, kɛn!/",
        "keywords": ["eat glass"],
        "explanationAi": "Câu mắng chửi mang tính thương hiệu của David Rose: 'Eat glass!' (Đi mà ăn mảnh chai thủy tinh đi!).",
        "properNouns": ["Ken"]
    },
    {
        "startTime": 223.3,
        "endTime": 228.8,
        "text": "Just when I thought it was impossible to find a thirty-something named Ken!",
        "translationVi": "Đúng lúc tôi cứ ngỡ là chẳng thể nào tìm nổi một người tầm ba mươi mấy tuổi mà lại tên là Ken!",
        "ipaUs": "/dʒʌst wɛn aɪ θɔːt ɪt wʌz ɪmˈpɑːsəbəl tuː faɪnd ə ˈθɜːrti-ˈsʌmθɪŋ neɪmd kɛn!/",
        "keywords": ["thirty-something named Ken"],
        "explanationAi": "Danh từ ghép 'thirty-something' (người ở độ tuổi 30–39) và sự mỉa mai tên gọi Ken cổ hủ.",
        "properNouns": ["Ken"]
    },
    {
        "startTime": 228.8,
        "endTime": 230.9,
        "text": "I think he looked younger than thirty.",
        "translationVi": "Tôi thấy anh ta trông trẻ hơn tuổi ba mươi đấy chứ.",
        "ipaUs": "/aɪ θɪŋk hiː lʊkt ˈjʌŋɡər ðæn ˈθɜːrti./",
        "keywords": ["younger than thirty"],
        "explanationAi": "Alexis cố tình phản bác quan điểm của anh trai.",
        "properNouns": []
    },

    # Act 10: The Infamous Six Tamagotchis (240.5s - 263.4s)
    {
        "startTime": 240.5,
        "endTime": 244.6,
        "text": "Okay, can I trust you? Because the last time I left you in charge of something...",
        "translationVi": "Được rồi, liệu tôi có thể tin tưởng cô được không đây? Bởi vì lần trước khi tôi giao cho cô phụ trách một việc...",
        "ipaUs": "/ˌoʊˈkeɪ, kæn aɪ trʌst juː? bɪˈkɔːz ðə læst taɪm aɪ lɛft juː ɪn tʃɑːrdʒ əv ˈsʌmθɪŋ.../",
        "keywords": ["can I trust you", "in charge of something"],
        "explanationAi": "Cụm thành ngữ 'in charge of' (chịu trách nhiệm, quản lý điều gì).",
        "properNouns": []
    },
    {
        "startTime": 244.6,
        "endTime": 249.3,
        "text": "Oh, this is about those stupid Tamagotchis!",
        "translationVi": "Ôi trời, chuyện này lại là về mấy con thú ảo Tamagotchi ngớ ngẩn đó chứ gì!",
        "ipaUs": "/oʊ, ðɪs ɪz əˈbaʊt ðoʊz ˈstuːpɪd ˌtæməˈɡɑːtʃiz!/",
        "keywords": ["stupid Tamagotchis"],
        "explanationAi": "Thiết bị trò chơi nuôi thú cưng ảo cầm tay đình đám của Nhật Bản thập niên 1990: 'Tamagotchi'.",
        "properNouns": ["Tamagotchis"]
    },
    {
        "startTime": 249.3,
        "endTime": 251.3,
        "text": "Actually, it is!",
        "translationVi": "Thực ra thì đúng là về chuyện đó đấy!",
        "ipaUs": "/ˈæktʃuəli, ɪt ɪz!/",
        "keywords": ["actually it is"],
        "explanationAi": "David xác nhận món nợ ân oán tuổi thơ chưa bao giờ nguôi ngoai.",
        "properNouns": []
    },
    {
        "startTime": 251.3,
        "endTime": 256.0,
        "text": "Okay, you left me with six of them, David! Taking care of that many is like a full-time job!",
        "translationVi": "Này nhé, anh đã giao phó cho tôi tận sáu con thú ảo David à! Chăm sóc ngần ấy con chẳng khác nào một công việc toàn thời gian đâu!",
        "ipaUs": "/ˌoʊˈkeɪ, juː lɛft miː wɪð sɪks əv ðɛm, ˈdeɪvɪd! ˈteɪkɪŋ kɛr əv ðæt ˈmɛni ɪz laɪk ə fʊl-taɪm dʒɑːb!/",
        "keywords": ["left me with six", "like a full-time job"],
        "explanationAi": "Thành ngữ 'a full-time job' (công việc toàn thời gian mệt mỏi) dùng để mô tả gánh nặng trông nom thú ảo.",
        "properNouns": ["David"]
    },
    {
        "startTime": 256.0,
        "endTime": 263.4,
        "text": "I left you with six adult Tamagotchis in perfect health!",
        "translationVi": "Tôi đã giao cho cô sáu con thú ảo trưởng thành với sức khỏe hoàn hảo cơ mà!",
        "ipaUs": "/aɪ lɛft juː wɪð sɪks əˈdʌlt ˌtæməˈɡɑːtʃiz ɪn ˈpɜːrfɪkt hɛlθ!/",
        "keywords": ["adult Tamagotchis", "in perfect health"],
        "explanationAi": "Cụm từ trang trọng quá mức 'in perfect health' (trong tình trạng sức khỏe hoàn hảo) tạo hiệu ứng hài hước đỉnh cao.",
        "properNouns": ["Tamagotchis"]
    },

    # Act 11: Kate Winslet's Wedding & Billy Zane (277.1s - 286.1s)
    {
        "startTime": 277.1,
        "endTime": 281.1,
        "text": "You mixed up the day and the month on your ticket again, didn't you?",
        "translationVi": "Cô lại nhìn nhầm ngày với tháng trên vé máy bay nữa rồi, có phải thế không?",
        "ipaUs": "/juː mɪkst ʌp ðə deɪ ænd ðə mʌnθ ɑːn jʊr ˈtɪkɪt əˈɡɛn, ˈdɪdənt juː?/",
        "keywords": ["mixed up", "day and the month", "tag question"],
        "explanationAi": "Cụm động từ 'mix up' (nhầm lẫn giữa hai thứ) do sự khác biệt giữa định dạng ngày tháng kiểu Mỹ (MM/DD) và quốc tế (DD/MM).",
        "properNouns": []
    },
    {
        "startTime": 281.1,
        "endTime": 284.3,
        "text": "No! Like that time you showed up to Kate Winslet's wedding?",
        "translationVi": "Không hề! Giống như cái lần cô mò đến đám cưới của Kate Winslet ấy hả?",
        "ipaUs": "/noʊ! laɪk ðæt taɪm juː ʃoʊd ʌp tuː keɪt ˈwɪnzləts ˈwɛdɪŋ?/",
        "keywords": ["showed up", "Kate Winslet's wedding"],
        "explanationAi": "Nữ diễn viên minh tinh điện ảnh đoạt giải Oscar Kate Winslet.",
        "properNouns": ["Kate Winslet"]
    },
    {
        "startTime": 284.3,
        "endTime": 288.3,
        "text": "The calligraphy was hard to read, and Billy Zane also did the same thing!",
        "translationVi": "Chữ thư pháp trên thiệp mời khó đọc chết đi được, và Billy Zane cũng nhầm y hệt như thế cơ mà!",
        "ipaUs": "/ðə kəˈlɪɡrəfi wʌz hɑːrd tuː riːd, ænd ˈbɪli zeɪn ˈɔːlsoʊ dɪd ðə seɪm θɪŋ!/",
        "keywords": ["calligraphy hard to read", "did the same thing"],
        "explanationAi": "Danh từ 'calligraphy' (nghệ thuật viết chữ thư pháp uốn lượn) và nam tài tử Billy Zane (đóng vai Cal Hockley phản diện trong Titanic).",
        "properNouns": ["Billy Zane"]
    },

    # Act 12: Wedding Dress to David's Wedding & Aisle Walk (288.3s - 315.2s)
    {
        "startTime": 288.3,
        "endTime": 292.1,
        "text": "Alexis, you're wearing a wedding dress to my wedding!",
        "translationVi": "Alexis, cô đang mặc nguyên một chiếc váy cưới đi dự đám cưới của tôi đấy!",
        "ipaUs": "/əˈlɛksɪs, jʊr ˈwɛrɪŋ ə ˈwɛdɪŋ drɛs tuː maɪ ˈwɛdɪŋ!/",
        "keywords": ["wearing a wedding dress", "my wedding"],
        "explanationAi": "Điều cấm kỵ tối thượng trong văn hóa cưới hỏi phương Tây: khách mời nữ tuyệt đối không được mặc váy cưới màu trắng lấn át cô dâu chú rể.",
        "properNouns": ["Alexis"]
    },
    {
        "startTime": 292.1,
        "endTime": 296.8,
        "text": "This is not a wedding dress! It's a white floor-length gown. It's very different.",
        "translationVi": "Đây không phải là váy cưới! Nó là một chiếc đầm dạ hội màu trắng chấm gót. Hai thứ này hoàn toàn khác nhau nhé.",
        "ipaUs": "/ðɪs ɪz nɑːt ə ˈwɛdɪŋ drɛs! ɪts ə waɪt flɔːr-lɛŋkθ ɡaʊn. ɪts ˈvɛri ˈdɪfərənt./",
        "keywords": ["floor-length gown", "very different"],
        "explanationAi": "Cụm danh từ thời trang 'floor-length gown' (váy đầm dạ hội dài quét sàn) mà Alexis dùng để ngụy biện.",
        "properNouns": []
    },
    {
        "startTime": 296.8,
        "endTime": 299.3,
        "text": "Did it come with a veil? No, it came with a headdress!",
        "translationVi": "Thế nó có đi kèm một tấm khăn voan trùm đầu không? — Không, nó đi kèm một vương miện cài tóc!",
        "ipaUs": "/dɪd ɪt kʌm wɪð ə veɪl? noʊ, ɪt keɪm wɪð ə ˈhɛdˌdrɛs!/",
        "keywords": ["veil", "headdress"],
        "explanationAi": "Cặp phụ kiện cô dâu: 'veil' (khăn voan che mặt) và 'headdress' (mũ cài đầu trang sức cô dâu).",
        "properNouns": []
    },
    {
        "startTime": 299.3,
        "endTime": 303.7,
        "text": "What? I've been thinking a lot about it, and I think you're right.",
        "translationVi": "Sao thế? Tôi đã suy nghĩ rất nhiều về chuyện này, và tôi nghĩ là anh nói đúng đấy.",
        "ipaUs": "/wʌt? aɪv biːn ˈθɪŋkɪŋ ə lɑːt əˈbaʊt ɪt, ænd aɪ θɪŋk jʊr raɪt./",
        "keywords": ["thinking a lot", "you're right"],
        "explanationAi": "Alexis bất ngờ chùng xuống và thừa nhận sự thật.",
        "properNouns": []
    },
    {
        "startTime": 303.7,
        "endTime": 305.3,
        "text": "About what? Like, I think I'm wearing a wedding dress.",
        "translationVi": "Đúng về chuyện gì cơ? Kiểu như là, tôi nghĩ là tôi đang mặc một chiếc váy cưới thật.",
        "ipaUs": "/əˈbaʊt wʌt? laɪk, aɪ θɪŋk aɪm ˈwɛrɪŋ ə ˈwɛdɪŋ drɛs./",
        "keywords": ["about what", "wearing a wedding dress"],
        "explanationAi": "Khoảnh khắc giác ngộ muộn màng nhưng siêu đáng yêu của Alexis ngay trước giờ làm lễ.",
        "properNouns": []
    },
    {
        "startTime": 305.3,
        "endTime": 310.4,
        "text": "Oh, I know that! Now can you please walk me down the aisle before people lose interest?",
        "translationVi": "Ồ, tôi biết tỏng rồi! Giờ thì cô có thể làm ơn dắt tay tôi bước vào lễ đường trước khi mọi người mất hết cả hứng thú không hả?",
        "ipaUs": "/oʊ, aɪ noʊ ðæt! naʊ kæn juː pliːz wɔːk miː daʊn ði aɪl bɪˈfɔːr ˈpiːpəl luːz ˈɪntrəst?/",
        "keywords": ["walk down the aisle", "lose interest"],
        "explanationAi": "Nghi thức cưới 'walk down the aisle' (dắt tay bước vào lối đi giữa lễ đường) - nơi người thân trao gửi chú rể/cô dâu.",
        "properNouns": []
    },
    {
        "startTime": 310.4,
        "endTime": 315.2,
        "text": "David, it would be my honor.",
        "translationVi": "David này, đó sẽ là niềm vinh dự lớn lao nhất của em.",
        "ipaUs": "/ˈdeɪvɪd, ɪt wʊd biː maɪ ˈɑːnər./",
        "keywords": ["it would be my honor"],
        "explanationAi": "Lời đồng ý xúc động và chân thành khép lại toàn bộ loạt phim: tình cảm gia đình ruột thịt thiêng liêng đằng sau mọi màn cãi vã đời thường.",
        "properNouns": ["David"]
    }
]

# 8 Deep Comprehensive CEFR B2 Quiz Questions
quiz_questions = [
    {
        "id": "mov_sit_12_q1",
        "question": "What is the comedic trigger that starts Alexis and David's argument at the very beginning of the video?",
        "questionEn": "What is the comedic trigger that starts Alexis and David's argument at the very beginning of the video?",
        "questionVi": "Nguyên nhân hài hước nào châm ngòi cho cuộc tranh cãi giữa Alexis và David ngay đầu video?",
        "options": [
            "David was trying to scare Alexis to cure his hiccups, sparking an argument over who gets murdered first.",
            "Alexis intentionally ruined David's cashmere sweater during their move to Schitt's Creek.",
            "David refused to drive Alexis to a job interview at the local vet clinic.",
            "Alexis forgot to lock the motel door, allowing a stray dog into their room."
        ],
        "optionsEn": [
            "David was trying to scare Alexis to cure his hiccups, sparking an argument over who gets murdered first.",
            "Alexis intentionally ruined David's cashmere sweater during their move to Schitt's Creek.",
            "David refused to drive Alexis to a job interview at the local vet clinic.",
            "Alexis forgot to lock the motel door, allowing a stray dog into their room."
        ],
        "optionsVi": [
            "David cố làm Alexis sợ hãi để chữa cơn nấc cụt của mình, dẫn tới cuộc cãi vã xem ai sẽ bị sát hại trước.",
            "Alexis cố tình làm hỏng chiếc áo len cashmere của David trong khi chuyển về Schitt's Creek.",
            "David từ chối chở Alexis đến buổi phỏng vấn xin việc tại phòng khám thú y địa phương.",
            "Alexis quên khóa cửa phòng trọ khiến một chú chó hoang chạy vào phòng."
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 0-2, Alexis yells: 'You get murdered first!' and David explains: 'It's to cure my hiccups, David! I have the hiccups, okay?'",
        "explanationEn": "In Segments 0-2, Alexis yells: 'You get murdered first!' and David explains: 'It's to cure my hiccups, David! I have the hiccups, okay?'",
        "explanationVi": "Trong các Phân đoạn 0-2, Alexis la lên 'Anh bị giết trước!' và David giải thích trò dọa ma đó là để chữa cơn nấc cụt của mình.",
        "targetedConcept": "Situational irony and sibling rivalry comedic dynamics",
        "targetedConceptEn": "Situational irony and sibling rivalry comedic dynamics",
        "targetedConceptVi": "Nghịch lý tình huống và mâu thuẫn hài hước giữa anh chị em",
        "referenceSegmentIndex": 2
    },
    {
        "id": "mov_sit_12_q2",
        "question": "Why does Alexis refuse to accompany David to a local bar when he complains about being stressed?",
        "questionEn": "Why does Alexis refuse to accompany David to a local bar when he complains about being stressed?",
        "questionVi": "Tại sao Alexis từ chối đi cùng David tới quán bar địa phương khi anh than phiền về sự căng thẳng?",
        "options": [
            "She has to study for her high school equivalency exam.",
            "Her facial skincare mask cannot be taken off for another twenty minutes.",
            "She promised Ted Mullens she would never visit sketchy dive bars.",
            "She does not have any clean shoes to wear in the motel."
        ],
        "optionsEn": [
            "She has to study for her high school equivalency exam.",
            "Her facial skincare mask cannot be taken off for another twenty minutes.",
            "She promised Ted Mullens she would never visit sketchy dive bars.",
            "She does not have any clean shoes to wear in the motel."
        ],
        "optionsVi": [
            "Cô phải ôn thi để lấy bằng tốt nghiệp cấp ba bổ túc.",
            "Chiếc mặt nạ dưỡng da mặt của cô phải tận hai mươi phút nữa mới được tháo ra.",
            "Cô đã hứa với Ted Mullens rằng sẽ không bao giờ bén mảng tới các quán bar tồi tàn.",
            "Cô không còn đôi giày sạch nào để đi ra ngoài phòng trọ."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 18, Alexis admits: 'Well, for one thing, this mask doesn't come off for another twenty minutes', prioritizing her skincare routine.",
        "explanationEn": "In Segment 18, Alexis admits: 'Well, for one thing, this mask doesn't come off for another twenty minutes', prioritizing her skincare routine.",
        "explanationVi": "Trong Phân đoạn 18, Alexis thừa nhận: 'Trước hết là cái mặt nạ này tận 20 phút nữa mới tháo ra được', đặt quy trình làm đẹp lên hàng đầu.",
        "targetedConcept": "Character superficiality and comedic priorities",
        "targetedConceptEn": "Character superficiality and comedic priorities",
        "targetedConceptVi": "Sự phù phiếm hài hước và thứ tự ưu tiên của nhân vật",
        "referenceSegmentIndex": 18
    },
    {
        "id": "mov_sit_12_q3",
        "question": "What past commercial venture of Alexis does David mockingly bring up during their conversation?",
        "questionEn": "What past commercial venture of Alexis does David mockingly bring up during their conversation?",
        "questionVi": "Dự án kinh doanh trong quá khứ nào của Alexis bị David lôi ra chế giễu một cách cay đắng?",
        "options": [
            "Her luxury pop-up boutique in the Hamptons.",
            "Her line of edible nail polish that allegedly poisoned customers.",
            "Her personal fitness clothing brand promoted in Ibiza.",
            "Her celebrity fragrance line produced in South America."
        ],
        "optionsEn": [
            "Her luxury pop-up boutique in the Hamptons.",
            "Her line of edible nail polish that allegedly poisoned customers.",
            "Her personal fitness clothing brand promoted in Ibiza.",
            "Her celebrity fragrance line produced in South America."
        ],
        "optionsVi": [
            "Cửa hàng thời trang cao cấp chớp nhoáng của cô ở vùng Hamptons.",
            "Dòng sản phẩm sơn móng tay ăn được từng bị cáo buộc làm ngộ độc khách hàng.",
            "Thương hiệu quần áo tập thể dục cá nhân do cô quảng bá ở đảo Ibiza.",
            "Dòng nước hoa người nổi tiếng do cô sản xuất ở Nam Mỹ."
        ],
        "correctAnswer": 1,
        "explanation": "In Segments 23-26, David remarks: 'Putting your name on a line of edible nail polish isn't what I would call having a job!' and mentions that it poisoned people.",
        "explanationEn": "In Segments 23-26, David remarks: 'Putting your name on a line of edible nail polish isn't what I would call having a job!' and mentions that it poisoned people.",
        "explanationVi": "Trong các Phân đoạn 23-26, David mỉa mai: 'In tên lên dòng sơn móng tay ăn được không phải là có việc làm!' và nhắc lại vụ ngộ độc khách hàng.",
        "targetedConcept": "Celebrity vanity business ventures and satirical dialogue",
        "targetedConceptEn": "Celebrity vanity business ventures and satirical dialogue",
        "targetedConceptVi": "Dự án kinh doanh phù phiếm của giới nhà giàu và nghệ thuật châm biếm",
        "referenceSegmentIndex": 23
    },
    {
        "id": "mov_sit_12_q4",
        "question": "What retort does Alexis deliver when David criticizes her for picking through his cake and only eating the icing?",
        "questionEn": "What retort does Alexis deliver when David criticizes her for picking through his cake and only eating the icing?",
        "questionVi": "Alexis đã đáp trả đanh thép như thế nào khi David mắng cô vì tội bới bánh kem và chỉ ăn lớp kem phủ?",
        "options": [
            "'So you can share a boyfriend, but you can't share a piece of cake?!'",
            "'Sugar is the only thing keeping my metabolism functional in this town!'",
            "'You stole my yogurt this morning, so we are completely even!'",
            "'The bakery in Elmdale made it specifically for my dietary regimen!'"
        ],
        "optionsEn": [
            "'So you can share a boyfriend, but you can't share a piece of cake?!'",
            "'Sugar is the only thing keeping my metabolism functional in this town!'",
            "'You stole my yogurt this morning, so we are completely even!'",
            "'The bakery in Elmdale made it specifically for my dietary regimen!'"
        ],
        "optionsVi": [
            "'Thế ra anh có thể chia sẻ chung một bạn trai, nhưng lại chẳng thể chia sẻ nổi một miếng bánh kem cơ à?!'",
            "'Đường là thứ duy nhất giúp quá trình trao đổi chất của tôi hoạt động ở thị trấn này đấy!'",
            "'Sáng nay anh vừa ăn trộm sữa chua của tôi, nên chúng ta hoàn toàn huề nhau!'",
            "'Tiệm bánh ở Elmdale làm chiếc bánh đó riêng cho chế độ ăn kiêng của tôi mà!'"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 30, Alexis hilariously turns the tables on David by pointing out: 'So you can share a boyfriend, but you can't share a piece of cake?!'",
        "explanationEn": "In Segment 30, Alexis hilariously turns the tables on David by pointing out: 'So you can share a boyfriend, but you can't share a piece of cake?!'",
        "explanationVi": "Trong Phân đoạn 30, Alexis lật ngược thế cờ khi châm chọc chuyện tình cảm của David: 'Thế ra anh có thể chia sẻ bạn trai nhưng không thể chia sẻ miếng bánh kem?!'",
        "targetedConcept": "Witty comeback and personal vulnerability exposure",
        "targetedConceptEn": "Witty comeback and personal vulnerability exposure",
        "targetedConceptVi": "Nghệ thuật đối đáp sắc sảo và đòn bẩy tâm lý",
        "referenceSegmentIndex": 30
    },
    {
        "id": "mov_sit_12_q5",
        "question": "Which bizarre driving circumstance does Alexis boast about when arguing over driving skills?",
        "questionEn": "Which bizarre driving circumstance does Alexis boast about when arguing over driving skills?",
        "questionVi": "Hoàn cảnh lái xe kỳ quặc nào được Alexis khoe khoang khi tranh cãi về kỹ năng lái xe hơi?",
        "options": [
            "Navigating a sports car through an avalanche in Gstaad.",
            "Parallel parking while wearing a traditional burka.",
            "Outrunning paparazzi on a scooter in Portofino.",
            "Driving a stick-shift convertible across the Australian outback."
        ],
        "optionsEn": [
            "Navigating a sports car through an avalanche in Gstaad.",
            "Parallel parking while wearing a traditional burka.",
            "Outrunning paparazzi on a scooter in Portofino.",
            "Driving a stick-shift convertible across the Australian outback."
        ],
        "optionsVi": [
            "Lái siêu xe thể thao vượt qua trận tuyết lở ở khu nghỉ dưỡng Gstaad.",
            "Ghép xe đỗ song song trong khi đang mặc một bộ trang phục burka truyền thống.",
            "Cắt đuôi cánh săn ảnh bằng xe tay ga tại thành phố Portofino.",
            "Lái chiếc xe mui trần số sàn băng qua vùng hoang mạc nước Úc."
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 32, Alexis delivers her classic punchline: 'You try parallel parking in a burka, David!'",
        "explanationEn": "In Segment 32, Alexis delivers her classic punchline: 'You try parallel parking in a burka, David!'",
        "explanationVi": "Trong Phân đoạn 32, Alexis tung ra câu thoại để đời: 'Thế anh thử đỗ xe song song trong bộ áo burka xem nào David!'",
        "targetedConcept": "Exotic globe-trotting anecdotes as comedic exaggeration",
        "targetedConceptEn": "Exotic globe-trotting anecdotes as comedic exaggeration",
        "targetedConceptVi": "Giai thoại chu du thế giới kỳ quặc dùng làm yếu tố phóng đại hài hước",
        "referenceSegmentIndex": 32
    },
    {
        "id": "mov_sit_12_q6",
        "question": "What caustic insult does David shout when an intrusive neighbor named Ken comments on their electrical issues?",
        "questionEn": "What caustic insult does David shout when an intrusive neighbor named Ken comments on their electrical issues?",
        "questionVi": "Câu xúc phạm đanh đá nào được David thốt lên khi người hàng xóm tên Ken xen vào bàn luận sự cố điện của họ?",
        "options": [
            "'Mind your own business, Ken!'",
            "'Mmm, eat glass, Ken!'",
            "'Go away forever, Ken!'",
            "'Get a real hobby, Ken!'"
        ],
        "optionsEn": [
            "'Mind your own business, Ken!'",
            "'Mmm, eat glass, Ken!'",
            "'Go away forever, Ken!'",
            "'Get a real hobby, Ken!'"
        ],
        "optionsVi": [
            "'Lo việc của anh đi, Ken!'",
            "'Hừm, đi mà nhai thủy tinh đi, Ken!'",
            "'Biến đi mãi mãi đi, Ken!'",
            "'Đi tìm sở thích đàng hoàng mà làm đi, Ken!'"
        ],
        "correctAnswer": 1,
        "explanation": "In Segment 47, David shuts down Ken with his signature venomous catchphrase: 'Mmm, eat glass, Ken!'",
        "explanationEn": "In Segment 47, David shuts down Ken with his signature venomous catchphrase: 'Mmm, eat glass, Ken!'",
        "explanationVi": "Trong Phân đoạn 47, David chặn họng Ken bằng câu cửa miệng cay độc đặc trưng: 'Mmm, eat glass, Ken!'",
        "targetedConcept": "Signature character insults and deadpan hostility",
        "targetedConceptEn": "Signature character insults and deadpan hostility",
        "targetedConceptVi": "Câu chửi thương hiệu của nhân vật và thái độ thù địch thản nhiên",
        "referenceSegmentIndex": 47
    },
    {
        "id": "mov_sit_12_q7",
        "question": "What childhood grudge does David still hold against Alexis regarding their electronic pets?",
        "questionEn": "What childhood grudge does David still hold against Alexis regarding their electronic pets?",
        "questionVi": "Mối hận tuổi thơ nào mà David vẫn găm trong lòng đối với Alexis liên quan đến những con thú cưng điện tử?",
        "options": [
            "She sold all of his Pokemon cards to buy lip gloss.",
            "He entrusted her with six adult Tamagotchis in perfect health and she let them all perish.",
            "She reset his Game Boy save file right before the final boss battle.",
            "She traded his rare virtual pet for a fake diamond necklace in Monaco."
        ],
        "optionsEn": [
            "She sold all of his Pokemon cards to buy lip gloss.",
            "He entrusted her with six adult Tamagotchis in perfect health and she let them all perish.",
            "She reset his Game Boy save file right before the final boss battle.",
            "She traded his rare virtual pet for a fake diamond necklace in Monaco."
        ],
        "optionsVi": [
            "Cô đã bán sạch bộ sưu tập thẻ bài Pokemon của anh để mua son bóng.",
            "Anh giao cho cô chăm sóc sáu con thú ảo Tamagotchi trưởng thành khỏe mạnh và cô đã để chúng chết hết.",
            "Cô đã xóa file lưu game Game Boy của anh ngay trước trận đấu trùm cuối.",
            "Cô đã đổi thú ảo hiếm của anh lấy chiếc vòng cổ kim cương giả ở Monaco."
        ],
        "correctAnswer": 1,
        "explanation": "In Segments 51-54, David fiercely complains: 'I left you with six adult Tamagotchis in perfect health!' while Alexis protests that managing six was a full-time job.",
        "explanationEn": "In Segments 51-54, David fiercely complains: 'I left you with six adult Tamagotchis in perfect health!' while Alexis protests that managing six was a full-time job.",
        "explanationVi": "Trong các Phân đoạn 51-54, David phàn nàn gay gắt: 'Tôi giao cho cô sáu con Tamagotchi trưởng thành khỏe mạnh!' còn Alexis kêu ca chăm 6 con như làm việc toàn thời gian.",
        "targetedConcept": "Long-standing sibling resentments over trivial childhood items",
        "targetedConceptEn": "Long-standing sibling resentments over trivial childhood items",
        "targetedConceptVi": "Mối thù dai dẳng giữa anh em về những món đồ chơi vặt vãnh thời thơ ấu",
        "referenceSegmentIndex": 54
    },
    {
        "id": "mov_sit_12_q8",
        "question": "How does the final conversation conclude as David and Alexis prepare for David's wedding ceremony?",
        "questionEn": "How does the final conversation conclude as David and Alexis prepare for David's wedding ceremony?",
        "questionVi": "Cuộc trò chuyện cuối cùng khép lại như thế nào khi David và Alexis chuẩn bị cho hôn lễ của David?",
        "options": [
            "Alexis refuses to attend until David apologizes for calling her dress inappropriate.",
            "Alexis realizes she is indeed wearing a wedding dress, but David warmly asks her to walk him down the aisle, which she calls 'my honor.'",
            "Moira forces Alexis to change into a choir robe before entering the town hall.",
            "Patrick calls off the wedding due to Alexis's fashion interference."
        ],
        "optionsEn": [
            "Alexis refuses to attend until David apologizes for calling her dress inappropriate.",
            "Alexis realizes she is indeed wearing a wedding dress, but David warmly asks her to walk him down the aisle, which she calls 'my honor.'",
            "Moira forces Alexis to change into a choir robe before entering the town hall.",
            "Patrick calls off the wedding due to Alexis's fashion interference."
        ],
        "optionsVi": [
            "Alexis từ chối tham dự cho đến khi David xin lỗi vì đã chê chiếc váy của cô là không phù hợp.",
            "Alexis nhận ra đúng là mình đang mặc một chiếc váy cưới, nhưng David dịu dàng đề nghị cô dắt tay anh vào lễ đường, và cô xúc động đáp 'đó là niềm vinh dự của em.'",
            "Moira ép Alexis phải thay sang bộ áo choàng ca đoàn trước khi bước vào tòa thị chính.",
            "Patrick hủy đám cưới vì sự xen ngang thời trang của Alexis."
        ],
        "correctAnswer": 1,
        "explanation": "In Segments 59-62, Alexis realizes she wore a bridal gown, and David asks her to walk him down the aisle, to which Alexis heartfeltly replies: 'David, it would be my honor.'",
        "explanationEn": "In Segments 59-62, Alexis realizes she wore a bridal gown, and David asks her to walk him down the aisle, to which Alexis heartfeltly replies: 'David, it would be my honor.'",
        "explanationVi": "Trong các Phân đoạn 59-62, Alexis thừa nhận mình mặc váy cưới, và David đề nghị em gái dắt tay mình vào lễ đường, Alexis nghẹn ngào đáp: 'David, đó là niềm vinh dự của em.'",
        "targetedConcept": "Emotional resolution, character growth, and familial devotion",
        "targetedConceptEn": "Emotional resolution, character growth, and familial devotion",
        "targetedConceptVi": "Sự hóa giải cảm xúc, sự trưởng thành của nhân vật và tình thân gia đình",
        "referenceSegmentIndex": 62
    }
]

# Write out the complete lesson file
output_path = r"e:\XP English  XP Voca\features\listening\data\lessons\movies\sitcoms\lesson_schitts_creek.ts"

with open(output_path, "w", encoding="utf-8") as f:
    f.write('import { MockVideoLesson, VideoQuizData } from "../../../types";\n\n')
    f.write('/**\n')
    f.write(' * ============================================================================\n')
    f.write(' * LESSON: Schitt’s Creek: Alexis Rose & David\'s Most Iconic Sibling Bickering Moments\n')
    f.write(' * Category: Sitcom Kinh Điển & Hài Kịch (cat_classic_sitcoms)\n')
    f.write(' * Level: CEFR B2 | Canadian / Transatlantic\n')
    f.write(' * YouTube ID: S_acAHyAKuI (05:15 - 315s)\n')
    f.write(' * Views: 2,905,806 | Likes: High Engagement\n')
    f.write(' * \n')
    f.write(' * CHUẨN HÓA TOÀN DIỆN 100% PURE MASTER SEGMENTS (ZERO MERGED UTTERANCES)\n')
    f.write(' * ============================================================================\n')
    f.write(' */\n\n')
    
    # Quiz Data
    f.write('export const QUIZ_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS: VideoQuizData = {\n')
    f.write('  lessonId: "mov_sit_12",\n')
    f.write('  lessonTitle: "Schitt’s Creek: Alexis Rose & David\'s Most Iconic Sibling Bickering Moments",\n')
    f.write(f'  totalQuestions: {len(quiz_questions)},\n')
    f.write('  xpReward: 100,\n')
    f.write('  generatedBy: "AI_GEMINI",\n')
    f.write('  questions: [\n')
    
    for q in quiz_questions:
        f.write('    {\n')
        f.write(f'      id: "{q["id"]}",\n')
        f.write(f'      question: {json.dumps(q["question"], ensure_ascii=False)},\n')
        f.write(f'      questionEn: {json.dumps(q["questionEn"], ensure_ascii=False)},\n')
        f.write(f'      questionVi: {json.dumps(q["questionVi"], ensure_ascii=False)},\n')
        f.write(f'      options: {json.dumps(q["options"], ensure_ascii=False)},\n')
        f.write(f'      optionsEn: {json.dumps(q["optionsEn"], ensure_ascii=False)},\n')
        f.write(f'      optionsVi: {json.dumps(q["optionsVi"], ensure_ascii=False)},\n')
        f.write(f'      correctAnswer: {q["correctAnswer"]},\n')
        f.write(f'      explanation: {json.dumps(q["explanation"], ensure_ascii=False)},\n')
        f.write(f'      explanationEn: {json.dumps(q["explanationEn"], ensure_ascii=False)},\n')
        f.write(f'      explanationVi: {json.dumps(q["explanationVi"], ensure_ascii=False)},\n')
        f.write(f'      targetedConcept: {json.dumps(q["targetedConcept"], ensure_ascii=False)},\n')
        f.write(f'      targetedConceptEn: {json.dumps(q["targetedConceptEn"], ensure_ascii=False)},\n')
        f.write(f'      targetedConceptVi: {json.dumps(q["targetedConceptVi"], ensure_ascii=False)},\n')
        f.write(f'      referenceSegmentIndex: {q["referenceSegmentIndex"]},\n')
        f.write('    },\n')
    f.write('  ],\n')
    f.write('};\n\n')
    
    # Lesson Data
    f.write('export const LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS: MockVideoLesson = {\n')
    f.write('  id: "mov_sit_12",\n')
    f.write('  slug: "schitts-creek-alexis-david-vocabulary-dinners",\n')
    f.write('  title: "Schitt’s Creek: Alexis Rose & David\'s Most Iconic Sibling Bickering Moments",\n')
    f.write('  categoryId: "cat_classic_sitcoms",\n')
    f.write('  categorySlug: "classic-sitcoms",\n')
    f.write('  categoryName: "Sitcom Kinh Điển & Hài Kịch",\n')
    f.write('  cefrLevel: "B2",\n')
    f.write('  durationFormatted: "05:15",\n')
    f.write('  durationSeconds: 315,\n')
    f.write('  externalId: "S_acAHyAKuI",\n')
    f.write('  sourceType: "YOUTUBE",\n')
    f.write('  supportedTypes: "BOTH",\n')
    f.write('  thumbnailUrl: "https://img.youtube.com/vi/S_acAHyAKuI/hqdefault.jpg",\n')
    f.write('  accent: "Canadian / Transatlantic",\n')
    f.write('  wpmSpeed: 142,\n')
    f.write('  viewCount: 2905806,\n')
    f.write('  studyCount: 5890,\n')
    f.write('  description:\n')
    f.write('    "Tuyển tập những màn đấu khẩu hài hước bất hủ đoạt giải Emmy giữa hai chị em Alexis Rose & David Rose trong Schitt’s Creek: từ tranh cãi ai bị sát hại trước, vụ bê bối sơn móng tay ở Quảng Châu, sáu con thú ảo Tamagotchi, đến khoảnh khắc mặc váy cưới trắng dắt tay vào lễ đường.",\n')
    f.write('  segments: [\n')
    
    for idx, s in enumerate(segments_data):
        token_count = len(re.findall(r"\b[A-Za-z0-9_]+\b", s["text"]))
        f.write('    {\n')
        f.write(f'      orderIndex: {idx},\n')
        f.write(f'      startTime: {s["startTime"]},\n')
        f.write(f'      endTime: {s["endTime"]},\n')
        f.write(f'      text: {json.dumps(s["text"], ensure_ascii=False)},\n')
        f.write(f'      translationVi: {json.dumps(s["translationVi"], ensure_ascii=False)},\n')
        f.write(f'      ipaUs: {json.dumps(s["ipaUs"], ensure_ascii=False)},\n')
        f.write(f'      keywords: {json.dumps(s["keywords"], ensure_ascii=False)},\n')
        f.write(f'      explanationAi: {json.dumps(s["explanationAi"], ensure_ascii=False)},\n')
        f.write(f'      properNouns: {json.dumps(s["properNouns"], ensure_ascii=False)},\n')
        f.write(f'      tokenCount: {token_count},\n')
        f.write('    },\n')
        
    f.write('  ],\n')
    f.write('  quiz: QUIZ_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS,\n')
    f.write('};\n\n')
    f.write('export default LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS;\n')

print(f"Successfully generated Schitt's Creek lesson with {len(segments_data)} segments and {len(quiz_questions)} quiz questions!")
