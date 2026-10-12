# -*- coding: utf-8 -*-
"""
Generate Pure Master Segments (Zero Merged Utterances) for 500 Days of Summer (mov_rom_08).
YouTube ID: AS47hWRO0bw (10:24 - 624s)
"""
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

raw_segments = [
    # --- ACT 1: INTRO & ANTI-ROMCOM PREMISE (00:00 - 01:08) ---
    {
        "startTime": 1.0,
        "endTime": 9.0,
        "text": "It's a comedy with romance, but don't call it a romantic comedy.",
        "translationVi": "Đây là một bộ phim hài pha trộn tình cảm, nhưng xin đừng gọi nó là một bộ phim hài lãng mạn thông thường.",
        "ipaUs": "/ɪts ə ˈkɑːmədi wɪð roʊˈmæns, bʌt doʊnt kɔːl ɪt ə roʊˈmæntɪk ˈkɑːmədi./",
        "keywords": ["comedy with romance", "romantic comedy"],
        "explanationAi": "Tuyên ngôn mở đầu nổi tiếng của bộ phim: phá vỡ mọi quy chuẩn và ảo tưởng của thể loại romcom truyền thống.",
        "properNouns": []
    },
    {
        "startTime": 9.0,
        "endTime": 17.0,
        "text": "Welcome to MsMojo, and today we're counting down our picks for the top ten 500 Days of Summer moments.",
        "translationVi": "Chào mừng đến với MsMojo, hôm nay chúng ta sẽ cùng đếm ngược 10 khoảnh khắc kinh điển nhất trong 500 Days of Summer.",
        "ipaUs": "/ˈwɛlkəm tuː mɪzˈmoʊdʒoʊ, ænd təˈdeɪ wɪr ˈkaʊntɪŋ daʊn ˈaʊər pɪks fɔːr ðə tɑːp tɛn faɪv ˈhʌndrəd deɪz əv ˈsʌmər ˈmoʊmənts./",
        "keywords": ["counting down", "moments"],
        "explanationAi": "Lời giới thiệu danh sách những thước phim giàu tính biểu tượng nhất của tác phẩm độc lập đình đám năm 2009.",
        "properNouns": ["MsMojo", "500 Days of Summer"]
    },
    {
        "startTime": 17.0,
        "endTime": 33.0,
        "text": "We're looking at some of the best moments from this genre-bending modern classic.",
        "translationVi": "Chúng ta sẽ cùng chiêm ngưỡng những phân cảnh xuất sắc nhất từ tác phẩm kinh điển hiện đại phá vỡ quy ước này.",
        "ipaUs": "/wɪr ˈlʊkɪŋ æt sʌm əv ðə bɛst ˈmoʊmənts frʌm ðɪs ˈʒɑːnrə ˈbɛndɪŋ ˈmɑːdərn ˈklæsɪk./",
        "keywords": ["genre-bending", "modern classic"],
        "explanationAi": "Thuật ngữ 'genre-bending' (uốn cong/phá vỡ thể loại) miêu tả cách bộ phim đảo lộn các khuôn mẫu tình yêu Hollywood.",
        "properNouns": []
    },

    # --- MOMENT 10: THE INTRODUCTION & 'NOT A LOVE STORY' (01:08 - 01:57) ---
    {
        "startTime": 68.0,
        "endTime": 74.0,
        "text": "Number ten: The Introduction.",
        "translationVi": "Khoảnh khắc số 10: Phần Mở Đầu.",
        "ipaUs": "/ˈnʌmbər tɛn: ðiː ˌɪntrəˈdʌkʃən./",
        "keywords": ["number ten", "introduction"],
        "explanationAi": "Khoảnh khắc mở màn thiết lập cấu trúc phi tuyến tính độc đáo của câu chuyện.",
        "properNouns": []
    },
    {
        "startTime": 74.0,
        "endTime": 79.0,
        "text": "This is a story of boy meets girl.",
        "translationVi": "Đây là câu chuyện về chàng trai gặp gỡ cô gái.",
        "ipaUs": "/ðɪs ɪz ə ˈstɔːri əv bɔɪ miːts ɡɜːrl./",
        "keywords": ["boy meets girl"],
        "explanationAi": "Mô-típ mở đầu kinh điển của điện ảnh: chàng trai bình thường gặp gỡ cô gái của đời mình.",
        "properNouns": []
    },
    {
        "startTime": 79.0,
        "endTime": 87.0,
        "text": "The introduction is narrated by an unseen omniscient narrator who describes the two main characters' backstories.",
        "translationVi": "Mở đầu được dẫn dắt bởi một người kể chuyện toàn tri vô hình, thuật lại bối cảnh xuất thân của hai nhân vật chính.",
        "ipaUs": "/ðiː ˌɪntrəˈdʌkʃən ɪz nəˈreɪtəd baɪ æn ʌnˈsiːn ɑːmˈnɪʃənt nəˈreɪtər huː dɪˈskraɪbz ðə tuː meɪn ˈkærɪktərz bækˈstɔːriz./",
        "keywords": ["omniscient narrator", "backstories"],
        "explanationAi": "Người kể chuyện toàn tri đóng vai trò mổ xẻ tâm lý và những ngộ nhận lãng mạn từ thuở ấu thơ của Tom Hansen.",
        "properNouns": []
    },
    {
        "startTime": 87.0,
        "endTime": 94.0,
        "text": "500 Days of Summer is not in fact a love story.",
        "translationVi": "500 Days of Summer trên thực tế không phải là một câu chuyện tình yêu.",
        "ipaUs": "/faɪv ˈhʌndrəd deɪz əv ˈsʌmər ɪz nɑːt ɪn fækt ə lʌv ˈstɔːri./",
        "keywords": ["not in fact", "love story"],
        "explanationAi": "Lời cảnh báo then chốt: câu chuyện khám phá sự trưởng thành cá nhân sau tan vỡ hơn là một mối tình đơm hoa kết trái.",
        "properNouns": ["500 Days of Summer"]
    },
    {
        "startTime": 94.0,
        "endTime": 101.0,
        "text": "A similar warning is echoed to Tom by Summer herself later in the film.",
        "translationVi": "Một lời cảnh báo tương tự cũng được chính Summer nhắc lại với Tom sau này trong phim.",
        "ipaUs": "/ə ˈsɪmələr ˈwɔːrnɪŋ ɪz ˈɛkoʊd tuː tɑːm baɪ ˈsʌmər hərˈsɛlf ˈleɪtər ɪn ðə fɪlm./",
        "keywords": ["similar warning", "echoed"],
        "explanationAi": "Summer luôn thành thật ngay từ đầu rằng cô không tin vào tình yêu hay sự ràng buộc lâu dài.",
        "properNouns": ["Tom", "Summer"]
    },
    {
        "startTime": 101.0,
        "endTime": 108.0,
        "text": "She's not looking for a relationship, but Tom ignores this warning.",
        "translationVi": "Cô ấy không tìm kiếm một mối quan hệ ràng buộc, nhưng Tom đã phớt lờ lời cảnh báo này.",
        "ipaUs": "/ʃiːz nɑːt ˈlʊkɪŋ fɔːr ə rɪˈleɪʃənˌʃɪp, bʌt tɑːm ɪɡˈnɔːrz ðɪs ˈwɔːrnɪŋ./",
        "keywords": ["not looking for", "ignores this warning"],
        "explanationAi": "Sai lầm chí mạng của Tom: hy vọng sự si tình của mình sẽ làm thay đổi quan điểm sống của đối phương.",
        "properNouns": ["Tom"]
    },
    {
        "startTime": 108.0,
        "endTime": 117.0,
        "text": "You should know upfront, this is not a love story.",
        "translationVi": "Bạn nên biết ngay từ đầu: đây không phải là một câu chuyện tình yêu.",
        "ipaUs": "/juː ʃʊd noʊ ˈʌpˌfrʌnt, ðɪs ɪz nɑːt ə lʌv ˈstɔːri./",
        "keywords": ["know upfront", "not a love story"],
        "explanationAi": "Câu thoại kinh điển của người dẫn chuyện nhấn mạnh chủ đề tự thức tỉnh của tác phẩm.",
        "properNouns": []
    },

    # --- MOMENT 9: THE SUMMER EFFECT (01:57 - 02:46) ---
    {
        "startTime": 117.0,
        "endTime": 124.0,
        "text": "Number nine: The Summer Effect.",
        "translationVi": "Khoảnh khắc số 9: Hiệu Ứng Summer.",
        "ipaUs": "/ˈnʌmbər naɪn: ðə ˈsʌmər ɪˈfɛkt./",
        "keywords": ["number nine", "Summer effect"],
        "explanationAi": "Phân đoạn phong cách phim tài liệu trắng đen miêu tả sức hút kỳ bí của Summer Finn.",
        "properNouns": ["Summer"]
    },
    {
        "startTime": 124.0,
        "endTime": 131.0,
        "text": "Summer, everyone. Everyone, Summer.",
        "translationVi": "Mọi người ơi, đây là Summer. Summer, đây là mọi người.",
        "ipaUs": "/ˈsʌmər, ˈɛvriˌwʌn. ˈɛvriˌwʌn, ˈsʌmər./",
        "keywords": ["everyone", "summer"],
        "explanationAi": "Màn chào hỏi nhân viên mới tại công ty viết thiệp chúc mừng Greeting Cards.",
        "properNouns": ["Summer"]
    },
    {
        "startTime": 131.0,
        "endTime": 140.0,
        "text": "Displayed in black and white, this scene features the narrator explaining Summer herself in a clinical manner.",
        "translationVi": "Được thể hiện bằng hình ảnh đen trắng, cảnh này có giọng người kể chuyện mổ xẻ về Summer theo lối khách quan khoa học.",
        "ipaUs": "/dɪˈspleɪd ɪn blæk ænd waɪt, ðɪs siːn ˈfiːtʃərz ðə nəˈreɪtər ɪkˈspleɪnɪŋ ˈsʌmər hərˈsɛlf ɪn ə ˈklɪnɪkəl ˈmænər./",
        "keywords": ["black and white", "clinical manner"],
        "explanationAi": "Thủ pháp điện ảnh hài hước: thống kê sức hút của một cô gái qua các số liệu xã hội học kỳ quặc.",
        "properNouns": ["Summer"]
    },
    {
        "startTime": 140.0,
        "endTime": 148.0,
        "text": "She's empirically attractive and magnetic, with her appearance causing double takes.",
        "translationVi": "Cô ấy đẹp một cách có thể kiểm chứng được bằng mắt và đầy cuốn hút, khiến ai đi ngang cũng phải ngoái nhìn lại.",
        "ipaUs": "/ʃiːz ɪmˈpɪrɪkli əˈtræktɪv ænd mæɡˈnɛtɪk, wɪð hɜːr əˈpɪrəns ˈkɔːzɪŋ ˈdʌbəl teɪks./",
        "keywords": ["empirically attractive", "double takes"],
        "explanationAi": "Thành ngữ 'double take' (sự ngạc nhiên nhìn lại lần hai khi thấy điều gì quá lôi cuốn).",
        "properNouns": []
    },
    {
        "startTime": 148.0,
        "endTime": 158.0,
        "text": "The audience, like Tom, finds it completely natural to fall for Summer.",
        "translationVi": "Khán giả, cũng giống như Tom, cảm thấy việc phải lòng Summer là điều hoàn toàn tự nhiên.",
        "ipaUs": "/ðiː ˈɔːdiəns, laɪk tɑːm, faɪndz ɪt kəmˈpliːtli ˈnætʃərəl tuː fɔːl fɔːr ˈsʌmər./",
        "keywords": ["completely natural", "fall for"],
        "explanationAi": "Bộ phim khéo léo dẫn dắt cảm xúc người xem đồng cảm trọn vẹn với sự si mê của nhân vật chính.",
        "properNouns": ["Tom", "Summer"]
    },
    {
        "startTime": 158.0,
        "endTime": 166.0,
        "text": "It could only be explained by one thing: fate.",
        "translationVi": "Điều đó chỉ có thể được giải thích bằng một thứ duy nhất: định mệnh.",
        "ipaUs": "/ɪt kʊd ˈoʊnli biː ɪkˈspleɪnd baɪ wʌn θɪŋ: feɪt./",
        "keywords": ["explained by", "fate"],
        "explanationAi": "Niềm tin ngây thơ của Tom vào số phận (fate), biến sự ngẫu nhiên thành ảo tưởng về người bạn đời duy nhất.",
        "properNouns": []
    },

    # --- MOMENT 8: THE GAME IN THE PARK (02:46 - 03:27) ---
    {
        "startTime": 166.0,
        "endTime": 174.0,
        "text": "Number eight: The Game.",
        "translationVi": "Khoảnh khắc số 8: Trò Chơi Trong Công Viên.",
        "ipaUs": "/ˈnʌmbər eɪt: ðə ɡeɪm./",
        "keywords": ["number eight", "the game"],
        "explanationAi": "Phân cảnh nghịch ngợm giải tỏa rào cản tâm lý giữa hai người bạn trẻ.",
        "properNouns": []
    },
    {
        "startTime": 174.0,
        "endTime": 182.0,
        "text": "Tom and Summer are in the park, and Summer challenges Tom to a daring shouting game.",
        "translationVi": "Tom và Summer đang ở trong công viên, và Summer thách thức Tom chơi trò thi hét từ ngữ táo bạo.",
        "ipaUs": "/tɑːm ænd ˈsʌmər ɑːr ɪn ðə pɑːrk, ænd ˈsʌmər ˈtʃælɪndʒɪz tɑːm tuː ə ˈdɛrɪŋ ˈʃaʊtɪŋ ɡeɪm./",
        "keywords": ["in the park", "challenges"],
        "explanationAi": "Sự nổi loạn hồn nhiên của Summer kéo Tom ra khỏi vỏ bọc rụt rè nghiêm túc.",
        "properNouns": ["Tom", "Summer"]
    },
    {
        "startTime": 182.0,
        "endTime": 190.0,
        "text": "They say the word progressively louder until one of them gets too embarrassed to continue.",
        "translationVi": "Họ nói to dần từng chữ cho đến khi một trong hai người cảm thấy quá ngượng ngùng không thể tiếp tục.",
        "ipaUs": "/ðeɪ seɪ ðə wɜːrd prəˈɡrɛsɪvli ˈlaʊdər ʌnˈtɪl wʌn əv ðɛm ɡɛts tuː ɪmˈbærəst tuː kənˈtɪnjuː./",
        "keywords": ["progressively louder", "too embarrassed"],
        "explanationAi": "Trò chơi tâm lý thể hiện sự tự do và không ngại ánh nhìn của đám đông của Summer.",
        "properNouns": []
    },
    {
        "startTime": 190.0,
        "endTime": 198.0,
        "text": "Although Tom backs out, she concludes the scene by shouting at the top of her lungs.",
        "translationVi": "Dù Tom nhụt chí lùi bước, cô nàng vẫn chốt hạ phân cảnh bằng cách hét hết sức bình sinh.",
        "ipaUs": "/ɔːlˈðoʊ tɑːm bæks aʊt, ʃiː kənˈkluːdz ðə siːn baɪ ˈʃaʊtɪŋ æt ðə tɑːp əv hɜːr lʌŋz./",
        "keywords": ["backs out", "top of her lungs"],
        "explanationAi": "Cụm từ 'at the top of one's lungs' (hét to hết cỡ), khắc họa cá tính phóng khoáng không sợ hãi của Summer.",
        "properNouns": ["Tom"]
    },

    # --- MOMENT 7: AUTUMN & THE ARCHITECTURE INTERVIEW (03:27 - 04:19) ---
    {
        "startTime": 207.0,
        "endTime": 213.0,
        "text": "Number seven: Autumn.",
        "translationVi": "Khoảnh khắc số 7: Mùa Thu (Autumn).",
        "ipaUs": "/ˈnʌmbər ˈsɛvən: ˈɔːtəm./",
        "keywords": ["number seven", "Autumn"],
        "explanationAi": "Cú ngoặt biểu tượng ở cuối phim: Summer (Mùa Hạ) qua đi thì Autumn (Mùa Thu) sẽ tới.",
        "properNouns": ["Autumn"]
    },
    {
        "startTime": 213.0,
        "endTime": 221.0,
        "text": "The film's ending sees Tom trying to turn his life around after his breakup with Summer.",
        "translationVi": "Đoạn kết của bộ phim chứng kiến Tom nỗ lực vực dậy cuộc sống sau cú sốc chia tay với Summer.",
        "ipaUs": "/ðə fɪlmz ˈɛndɪŋ siːz tɑːm ˈtraɪɪŋ tuː tɜːrn hɪz laɪf əˈraʊnd ˈæftər hɪz ˈbreɪkˌʌp wɪð ˈsʌmər./",
        "keywords": ["turn his life around", "breakup"],
        "explanationAi": "Tom từ bỏ công việc viết thiệp tẻ nhạt để theo đuổi đam mê kiến trúc mà anh từng từ bỏ.",
        "properNouns": ["Tom", "Summer"]
    },
    {
        "startTime": 221.0,
        "endTime": 229.0,
        "text": "At one architecture interview, he meets a woman who shares his love for a spot in the city.",
        "translationVi": "Tại một buổi phỏng vấn xin việc kiến trúc, anh gặp một cô gái có cùng tình yêu với một góc ngắm cảnh trong thành phố.",
        "ipaUs": "/æt wʌn ˈɑːrkəˌtɛktʃər ˈɪntərˌvjuː, hiː miːts ə ˈwʊmən huː ʃɛərz hɪz lʌv fɔːr ə spɑːt ɪn ðə ˈsɪti./",
        "keywords": ["architecture interview", "shares his love"],
        "explanationAi": "Điểm hẹn chung Angel's Plaza tại Los Angeles: nơi Tom từng vẽ phác thảo ước mơ kiến trúc lên tay Summer.",
        "properNouns": ["Angel's Plaza"]
    },
    {
        "startTime": 229.0,
        "endTime": 235.0,
        "text": "Do you go to Angel's Plaza? — Yes, that's like my favorite spot.",
        "translationVi": "Cô có hay đến quảng trường Angel's Plaza không? — Có chứ, đó là địa điểm yêu thích nhất của tôi.",
        "ipaUs": "/duː juː ɡoʊ tuː ˈeɪndʒəlz ˈplɑːzə? jɛs, ðæts laɪk maɪ ˈfeɪvərɪt spɑːt./",
        "keywords": ["Angel's Plaza", "favorite spot"],
        "explanationAi": "Sự đồng điệu ngẫu nhiên mở ra cơ hội hẹn hò mới cho Tom.",
        "properNouns": ["Angel's Plaza"]
    },
    {
        "startTime": 235.0,
        "endTime": 242.0,
        "text": "My name is Tom. — Nice to meet you, I'm Autumn.",
        "translationVi": "Tôi tên là Tom. — Rất vui được gặp anh, tôi là Autumn.",
        "ipaUs": "/maɪ neɪm ɪz tɑːm. naɪs tuː miːt juː, aɪm ˈɔːtəm./",
        "keywords": ["nice to meet you", "Autumn"],
        "explanationAi": "Cú twist hóm hỉnh đầy thi vị: Tom mỉm cười nhìn thẳng vào ống kính máy quay, ngày thứ 500 khép lại và Ngày thứ 1 bắt đầu.",
        "properNouns": ["Tom", "Autumn"]
    },

    # --- MOMENT 6: LOVE VS HATE (04:19 - 05:22) ---
    {
        "startTime": 259.0,
        "endTime": 266.0,
        "text": "Number six: Love versus Hate.",
        "translationVi": "Khoảnh khắc số 6: Yêu Đối Lập Ghét.",
        "ipaUs": "/ˈnʌmbər sɪks: lʌv ˈvɜːrsəs heɪt./",
        "keywords": ["number six", "love versus hate"],
        "explanationAi": "Phân cảnh gương chiếu tâm lý tương phản đỉnh cao giữa giai đoạn đang say đắm và lúc tan vỡ cay đắng.",
        "properNouns": []
    },
    {
        "startTime": 266.0,
        "endTime": 274.0,
        "text": "I'm in love with Summer. I love her smile, her hair, her knees.",
        "translationVi": "Tôi yêu Summer mất rồi. Tôi yêu nụ cười, mái tóc và cả đầu gối của cô ấy.",
        "ipaUs": "/aɪm ɪn lʌv wɪð ˈsʌmər. aɪ lʌv hɜːr smaɪl, hɜːr hɛər, hɜːr niːz./",
        "keywords": ["in love with", "smile", "hair"],
        "explanationAi": "Giai đoạn trăng mật: trong mắt kẻ si tình, mọi chi tiết vụn vặt nhất của đối phương đều trở nên hoàn hảo.",
        "properNouns": ["Summer"]
    },
    {
        "startTime": 274.0,
        "endTime": 282.0,
        "text": "I love this heart-shaped birthmark she has on her neck.",
        "translationVi": "Tôi yêu vết bớt hình trái tim trên cổ cô ấy.",
        "ipaUs": "/aɪ lʌv ðɪs hɑːrt ʃeɪpt ˈbɜːrθˌmɑːrk ʃiː hæz ɑːn hɜːr nɛk./",
        "keywords": ["heart-shaped birthmark", "neck"],
        "explanationAi": "Chi tiết hình tượng vết bớt hình trái tim tượng trưng cho sự lý tưởng hóa lãng mạn.",
        "properNouns": []
    },
    {
        "startTime": 282.0,
        "endTime": 290.0,
        "text": "Later, after they've broken up, Tom lists the exact same things as the things he now hates.",
        "translationVi": "Sau này, khi cả hai đã chia tay, Tom liệt kê chính xác những nét ấy như những điều anh căm ghét nhất.",
        "ipaUs": "/ˈleɪtər, ˈæftər ðeɪv ˈbroʊkən ʌp, tɑːm lɪsts ðiː ɪɡˈzækt seɪm θɪŋz æz ðə θɪŋz hiː naʊ heɪts./",
        "keywords": ["broken up", "exact same things", "hates"],
        "explanationAi": "Tâm lý con người: lăng kính cảm xúc thay đổi thì cùng một đặc điểm từ đáng yêu sẽ trở thành đáng ghét.",
        "properNouns": ["Tom"]
    },
    {
        "startTime": 290.0,
        "endTime": 298.0,
        "text": "I hate Summer. I hate her crooked teeth, her 1960s haircut, her knobby knees.",
        "translationVi": "Tôi ghét Summer. Tôi ghét hàm răng khấp khểnh, kiểu tóc thập niên 60 và đầu gối củ lạc của cô ta.",
        "ipaUs": "/aɪ heɪt ˈsʌmər. aɪ heɪt hɜːr ˈkrʊkəd tiːθ, hɜːr ˌnaɪnˈtiːn ˈsɪkstiz ˈhɛərˌkʌt, hɜːr ˈnɑːbi niːz./",
        "keywords": ["crooked teeth", "knobby knees"],
        "explanationAi": "Sự giận dữ bộc phát khi cái tôi bị tổn thương sâu sắc.",
        "properNouns": ["Summer"]
    },
    {
        "startTime": 298.0,
        "endTime": 314.0,
        "text": "The fine line between love and hate has rarely been so well illustrated.",
        "translationVi": "Ranh giới mong manh giữa tình yêu và lòng hận thù hiếm khi được khắc họa tài tình đến thế.",
        "ipaUs": "/ðə faɪn laɪn bɪˈtwiːn lʌv ænd heɪt hæz ˈrɛrli bɪn soʊ wɛl ˈɪləˌstreɪtəd./",
        "keywords": ["fine line", "love and hate"],
        "explanationAi": "Thành ngữ 'fine line between love and hate' (ranh giới mong manh giữa yêu và ghét).",
        "properNouns": []
    },

    # --- MOMENT 5: TALKING IN THE ELEVATOR & THE SMITHS (05:22 - 06:09) ---
    {
        "startTime": 322.0,
        "endTime": 328.0,
        "text": "Number five: Talking in the Elevator.",
        "translationVi": "Khoảnh khắc số 5: Trò Chuyện Trong Thang Máy.",
        "ipaUs": "/ˈnʌmbər faɪv: ˈtɔːkɪŋ ɪn ðiː ˈɛləˌveɪtər./",
        "keywords": ["number five", "in the elevator"],
        "explanationAi": "Cột mốc tia sét ái tình đánh trúng Tom: khoảnh khắc Summer chủ động bắt chuyện trong buồng thang máy chật hẹp.",
        "properNouns": []
    },
    {
        "startTime": 328.0,
        "endTime": 334.0,
        "text": "I love The Smiths. — Sorry? — I said, I love The Smiths.",
        "translationVi": "Tôi mê nhóm The Smiths lắm. — Sao cơ? — Tôi bảo là, tôi rất thích nhóm The Smiths.",
        "ipaUs": "/aɪ lʌv ðə smɪθs. ˈsɑːri? aɪ sɛd, aɪ lʌv ðə smɪθs./",
        "keywords": ["The Smiths", "love The Smiths"],
        "explanationAi": "Summer nghe thấy giai điệu bài hát phát ra từ tai nghe headphone của Tom.",
        "properNouns": ["The Smiths"]
    },
    {
        "startTime": 334.0,
        "endTime": 344.0,
        "text": "To die by your side is such a heavenly way to die. I love them.",
        "translationVi": "'Được chết bên cạnh em là một cách chết tuyệt vời tựa thiên đường'. Tôi cực kỳ yêu họ.",
        "ipaUs": "/tuː daɪ baɪ jʊər saɪd ɪz sʌtʃ ə ˈhɛvənli weɪ tuː daɪ. aɪ lʌv ðɛm./",
        "keywords": ["heavenly way to die", "by your side"],
        "explanationAi": "Summer trích dẫn lời bài hát kinh điển 'There Is a Light That Never Goes Out' của nhóm The Smiths.",
        "properNouns": []
    },
    {
        "startTime": 344.0,
        "endTime": 353.0,
        "text": "While riding in an elevator together, Summer comments that she loves the band Tom is listening to.",
        "translationVi": "Khi đi chung thang máy, Summer nhận xét rằng cô rất thích ban nhạc mà Tom đang lắng nghe.",
        "ipaUs": "/waɪl ˈraɪdɪŋ ɪn æn ˈɛləˌveɪtər təˈɡɛðər, ˈsʌmər ˈkɑːmɛnts ðæt ʃiː lʌvz ðə bænd tɑːm ɪz ˈlɪsənɪŋ tuː./",
        "keywords": ["riding in an elevator", "listening to"],
        "explanationAi": "Sự đồng điệu trong âm nhạc indie rock thập niên 80 làm bùng nổ ngọn lửa si mê trong lòng Tom.",
        "properNouns": ["Summer", "Tom"]
    },
    {
        "startTime": 353.0,
        "endTime": 369.0,
        "text": "Something so simple sparks Tom's love, capturing our interest and his stunned reaction: Holy shit.",
        "translationVi": "Một điều giản đơn như thế đã thắp lên tình yêu của Tom, lôi cuốn sự chú ý của chúng ta cùng phản ứng sững sờ của anh: Trời đất ơi.",
        "ipaUs": "/ˈsʌmθɪŋ soʊ ˈsɪmpəl spɑːrks tɑːmz lʌv, ˈkæptʃərɪŋ ˈaʊər ˈɪntrəst ænd hɪz stʌnd riˈækʃən: ˈhoʊli ʃɪt./",
        "keywords": ["sparks love", "holy shit"],
        "explanationAi": "Cảm giác choáng ngợp ngọt ngào khi phát hiện ra 'cô gái trong mơ' có cùng gu âm nhạc với mình.",
        "properNouns": ["Tom"]
    },

    # --- MOMENT 4: IKEA (06:09 - 07:06) ---
    {
        "startTime": 369.0,
        "endTime": 375.0,
        "text": "Number four: IKEA.",
        "translationVi": "Khoảnh khắc số 4: Buổi Hẹn Hò Tại Siêu Thị IKEA.",
        "ipaUs": "/ˈnʌmbər fɔːr: aɪˈkiːə./",
        "keywords": ["number four", "IKEA"],
        "explanationAi": "Một trong những buổi hẹn hò sáng tạo và dễ thương nhất màn ảnh tại chuỗi nội thất Thụy Điển.",
        "properNouns": ["IKEA"]
    },
    {
        "startTime": 375.0,
        "endTime": 384.0,
        "text": "The pair of them play an exaggerated game of pretend, acting as a stereotypical couple.",
        "translationVi": "Cả hai chơi trò đóng giả một cặp vợ chồng kiểu mẫu, biến cửa hàng nội thất thành tổ ấm gia đình của mình.",
        "ipaUs": "/ðə pɛər əv ðɛm pleɪ æn ɪɡˈzædʒəˌreɪtəd ɡeɪm əv prɪˈtɛnd, ˈæktɪŋ æz ə ˌstɛriəˈtɪpɪkəl ˈkʌpəl./",
        "keywords": ["game of pretend", "stereotypical couple"],
        "explanationAi": "Họ thử các phòng khách và phòng ngủ trưng bày, giả vờ nấu nướng và đón khách.",
        "properNouns": []
    },
    {
        "startTime": 384.0,
        "endTime": 394.0,
        "text": "The scene is also important plot-wise, since Summer tells Tom she isn't looking for anything serious.",
        "translationVi": "Cảnh này cũng mang ý nghĩa bước ngoặt cốt truyện, khi Summer nói thẳng với Tom rằng cô không tìm kiếm điều gì nghiêm túc.",
        "ipaUs": "/ðə siːn ɪz ˈɔːlsoʊ ɪmˈpɔːrtənt plɑːt waɪz, sɪns ˈsʌmər tɛlz tɑːm ʃiː ˈɪzənt ˈlʊkɪŋ fɔːr ˈɛniθɪŋ ˈsɪriəs./",
        "keywords": ["plot-wise", "anything serious"],
        "explanationAi": "Sự mâu thuẫn ngầm: Tom chìm đắm trong ảo tưởng gia đình trong khi Summer vạch rõ ranh giới.",
        "properNouns": ["Summer", "Tom"]
    },
    {
        "startTime": 394.0,
        "endTime": 404.0,
        "text": "I just want to tell you, I'm not really looking for anything serious.",
        "translationVi": "Em chỉ muốn nói cho anh biết, em thực sự không tìm kiếm bất cứ điều gì nghiêm túc đâu.",
        "ipaUs": "/aɪ dʒʌst wɑːnt tuː tɛl juː, aɪm nɑːt ˈrɪəli ˈlʊkɪŋ fɔːr ˈɛniθɪŋ ˈsɪriəs./",
        "keywords": ["not looking for", "anything serious"],
        "explanationAi": "Câu thoại trực tiếp của Summer dập tắt hy vọng về một cam kết tương lai.",
        "properNouns": []
    },
    {
        "startTime": 404.0,
        "endTime": 417.0,
        "text": "Although Tom tries to play it off like he doesn't mind, he's much more serious about her than she is.",
        "translationVi": "Dù Tom cố tỏ ra không bận tâm, thực tế anh nghiêm túc với cô nhiều hơn cô dành cho anh gấp bội.",
        "ipaUs": "/ɔːlˈðoʊ tɑːm traɪz tuː pleɪ ɪt ɔːf laɪk hiː ˈdʌzənt maɪnd, hiːz mʌtʃ mɔːr ˈsɪriəs əˈbaʊt hɜːr ðæn ʃiː ɪz./",
        "keywords": ["play it off", "much more serious"],
        "explanationAi": "Cụm 'play it off' (giả vờ bình thản che giấu sự bất an bên trong).",
        "properNouns": ["Tom"]
    },

    # --- MOMENT 3: THE DANCE NUMBER (07:06 - 07:44) ---
    {
        "startTime": 426.0,
        "endTime": 432.0,
        "text": "Number three: The Dance Number.",
        "translationVi": "Khoảnh khắc số 3: Điệu Nhảy Ca Múa Tưng Bừng.",
        "ipaUs": "/ˈnʌmbər θriː: ðə dæns ˈnʌmbər./",
        "keywords": ["number three", "dance number"],
        "explanationAi": "Phân đoạn nhạc kịch rực rỡ nhất phim thể hiện tâm trạng hân hoan tột cùng của Tom.",
        "properNouns": []
    },
    {
        "startTime": 432.0,
        "endTime": 442.0,
        "text": "After spending the night with Summer, Tom walks to work the next day strutting his stuff to a catchy beat.",
        "translationVi": "Sau đêm mặn nồng cùng Summer, Tom đi bộ tới chỗ làm sáng hôm sau với dáng vẻ nghênh ngang đầy phấn khích.",
        "ipaUs": "/ˈæftər ˈspɛndɪŋ ðə naɪt wɪð ˈsʌmər, tɑːm wɔːks tuː wɜːrk ðə nɛkst deɪ ˈstrʌtɪŋ hɪz stʌf tuː ə ˈkætʃi biːt./",
        "keywords": ["strutting his stuff", "catchy beat"],
        "explanationAi": "Thành ngữ 'strut one's stuff' (bước đi kiêu hãnh đầy tự tin với ca khúc 'You Make My Dreams' của Hall & Oates).",
        "properNouns": ["Summer", "Tom"]
    },
    {
        "startTime": 442.0,
        "endTime": 451.0,
        "text": "Strangers shake his hand and join him in elaborate choreographed dances, accompanied by a cartoon bird.",
        "translationVi": "Những người xa lạ bắt tay anh và hòa vào điệu nhảy biên đạo công phu, cùng sự xuất hiện của một chú chim hoạt hình.",
        "ipaUs": "/ˈstreɪndʒərz ʃeɪk hɪz hænd ænd dʒɔɪn hɪm ɪn ɪˈlæbərət ˌkɔːriˈɑːɡrəft ˈdænsɪz, əˈkʌmpənid baɪ ə kɑːrˈtuːn bɜːrd./",
        "keywords": ["choreographed dances", "cartoon bird"],
        "explanationAi": "Hình ảnh chú chim hoạt hình đậu lên tay Tom gợi nhắc đến các nàng công chúa cổ tích Disney.",
        "properNouns": []
    },
    {
        "startTime": 451.0,
        "endTime": 464.0,
        "text": "The scene visualizes the high our feelings can bring, while setting the stage for Tom's delusions to be shattered.",
        "translationVi": "Cảnh quay trực quan hóa cảm giác bay bổng tột cùng, đồng thời báo trước cho sự tan tành của những ảo tưởng sau này.",
        "ipaUs": "/ðə siːn ˈvɪʒuəˌlaɪzɪz ðə haɪ ˈaʊər ˈfiːlɪŋz kæn brɪŋ, waɪl ˈsɛtɪŋ ðə steɪdʒ fɔːr tɑːmz dɪˈluːʒənz tuː biː ˈʃætərd./",
        "keywords": ["delusions", "shattered"],
        "explanationAi": "Càng bay cao bao nhiêu thì khi rơi xuống thực tại sẽ càng đau đớn bấy nhiêu.",
        "properNouns": ["Tom"]
    },

    # --- MOMENT 2: DAY 488 ON THE PARK BENCH (07:44 - 08:29) ---
    {
        "startTime": 464.0,
        "endTime": 470.0,
        "text": "Number two: Day 488.",
        "translationVi": "Khoảnh khắc số 2: Ngày Thứ 488.",
        "ipaUs": "/ˈnʌmbər tuː: deɪ fɔːr ˈhʌndrəd ˈeɪti eɪt./",
        "keywords": ["number two", "day 488"],
        "explanationAi": "Cuộc hội ngộ cuối cùng trên băng ghế đá công viên giữa hai người sau khi Summer đã kết hôn.",
        "properNouns": []
    },
    {
        "startTime": 470.0,
        "endTime": 479.0,
        "text": "Hey, Tom. Following Summer's wedding to another man, the pair reunites at Tom's favorite spot in the city.",
        "translationVi": "Chào Tom. Sau đám cưới của Summer với người đàn ông khác, cặp đôi tái ngộ tại góc ngắm cảnh yêu thích của Tom.",
        "ipaUs": "/heɪ, tɑːm. ˈfɑːloʊɪŋ ˈsʌmərz ˈwɛdɪŋ tuː əˈnʌðər mæn, ðə pɛər ˌriːjuːˈnaɪts æt tɑːmz ˈfeɪvərɪt spɑːt ɪn ðə ˈsɪti./",
        "keywords": ["wedding to another man", "reunites"],
        "explanationAi": "Không khí trầm buồn man mác của sự chia tay trưởng thành.",
        "properNouns": ["Tom", "Summer"]
    },
    {
        "startTime": 479.0,
        "endTime": 488.0,
        "text": "Summer tells Tom that he was right about love and destiny, just not about her being the one for him.",
        "translationVi": "Summer nói với Tom rằng anh đã đúng về tình yêu và định mệnh, chỉ là anh đã sai khi nghĩ cô là người dành cho anh.",
        "ipaUs": "/ˈsʌmər tɛlz tɑːm ðæt hiː wʌz raɪt əˈbaʊt lʌv ænd ˈdɛstəni, dʒʌst nɑːt əˈbaʊt hɜːr ˈbiːɪŋ ðə wʌn fɔːr hɪm./",
        "keywords": ["love and destiny", "the one for him"],
        "explanationAi": "Sự thừa nhận bất ngờ của Summer: người từng không tin tình yêu nay đã kết hôn vì tìm thấy đúng người.",
        "properNouns": ["Summer", "Tom"]
    },
    {
        "startTime": 488.0,
        "endTime": 496.0,
        "text": "I just woke up one day and I knew. — Knew what? — What I was never sure of with you.",
        "translationVi": "Một ngày nọ em thức dậy và em biết chắc. — Biết điều gì cơ? — Điều mà khi ở bên anh em chưa bao giờ dám chắc chắn.",
        "ipaUs": "/aɪ dʒʌst woʊk ʌp wʌn deɪ ænd aɪ njuː. njuː wɑːt? wɑːt aɪ wʌz ˈnɛvər ʃʊr əv wɪð juː./",
        "keywords": ["woke up one day", "never sure of"],
        "explanationAi": "Câu thoại đau xót nhất: tình cảm là điều tự nhiên thức tỉnh bên trong, không thể cưỡng cầu.",
        "properNouns": []
    },
    {
        "startTime": 496.0,
        "endTime": 509.0,
        "text": "The scene acts as a melancholy bit of closure for both of them: Summer, I really do hope that you're happy.",
        "translationVi": "Phân cảnh khép lại nỗi đau buồn bằng lời chúc phúc chân thành: Summer, anh thực sự mong em sẽ hạnh phúc.",
        "ipaUs": "/ðə siːn ækts æz ə ˈmɛlənˌkɑːli bɪt əv ˈkloʊʒər fɔːr boʊθ əv ðɛm: ˈsʌmər, aɪ ˈrɪəli duː hoʊp ðæt jʊər ˈhæpi./",
        "keywords": ["closure", "hope you're happy"],
        "explanationAi": "Tom buông tay chấp nhận thực tại, hoàn tất chặng đường tự chữa lành của bản thân.",
        "properNouns": ["Summer"]
    },

    # --- MOMENT 1: EXPECTATIONS VS REALITY (09:30 - 10:24) ---
    {
        "startTime": 570.0,
        "endTime": 576.0,
        "text": "Number one: Expectations versus Reality.",
        "translationVi": "Khoảnh khắc số 1: Kỳ Vọng Đối Lập Thực Tế.",
        "ipaUs": "/ˈnʌmbər wʌn: ˌɛkspɛkˈteɪʃənz ˈvɜːrsəs riˈæləti./",
        "keywords": ["number one", "expectations versus reality"],
        "explanationAi": "Phân cảnh biểu tượng xuất sắc nhất lịch sử điện ảnh lãng mạn hiện đại.",
        "properNouns": []
    },
    {
        "startTime": 576.0,
        "endTime": 584.0,
        "text": "If there's one scene that epitomizes 500 Days of Summer, it's this one.",
        "translationVi": "Nếu có một cảnh quay tiêu biểu cho toàn bộ 500 Days of Summer, đó chính là cảnh quay này.",
        "ipaUs": "/ɪf ðɛrz wʌn siːn ðæt ɪˈpɪtəˌmaɪzɪz faɪv ˈhʌndrəd deɪz əv ˈsʌmər, ɪts ðɪs wʌn./",
        "keywords": ["epitomizes", "500 Days of Summer"],
        "explanationAi": "Đỉnh cao dàn dựng của đạo diễn Marc Webb phản ánh chính xác bi kịch tâm lý của người trẻ.",
        "properNouns": ["500 Days of Summer"]
    },
    {
        "startTime": 584.0,
        "endTime": 593.0,
        "text": "Tom attends a rooftop party that Summer invited him to, depicted on a brilliant split screen.",
        "translationVi": "Tom đến tham dự bữa tiệc sân thượng mà Summer mời anh, được miêu tả trên màn hình phân đôi tài tình.",
        "ipaUs": "/tɑːm əˈtɛndz ə ˈruːfˌtɑːp ˈpɑːrti ðæt ˈsʌmər ɪnˈvaɪtəd hɪm tuː, dɪˈpɪktəd ɑːn ə ˈbrɪljənt splɪt skriːn./",
        "keywords": ["rooftop party", "split screen"],
        "explanationAi": "Thủ pháp chia đôi khung hình trực quan hóa khoảng cách mênh mông giữa mộng tưởng và hiện thực.",
        "properNouns": ["Tom", "Summer"]
    },
    {
        "startTime": 593.0,
        "endTime": 602.0,
        "text": "In Expectations, Tom grows closer to Summer; in Reality, he spends the party drinking and alone.",
        "translationVi": "Bên Kỳ Vọng, Tom quấn quýt bên Summer; bên Thực Tế, anh uống rượu một mình và hoàn toàn lạc lõng.",
        "ipaUs": "/ɪn ˌɛkspɛkˈteɪʃənz, tɑːm ɡroʊz ˈkloʊsər tuː ˈsʌmər; ɪn riˈæləti, hiː spɛndz ðə ˈpɑːrti ˈdrɪŋkɪŋ ænd əˈloʊn./",
        "keywords": ["expectations", "reality", "drinking and alone"],
        "explanationAi": "Hai dòng thời gian song song diễn ra cùng lúc trên màn ảnh với nhịp điệu tương phản tàn nhẫn.",
        "properNouns": ["Summer"]
    },
    {
        "startTime": 602.0,
        "endTime": 612.0,
        "text": "Everything comes to a crashing halt when he sees Summer's engagement ring.",
        "translationVi": "Mọi hy vọng sụp đổ hoàn toàn khi anh nhìn thấy chiếc nhẫn đính hôn lấp lánh trên ngón tay Summer.",
        "ipaUs": "/ˈɛvriθɪŋ kʌmz tuː ə ˈkræʃɪŋ hɔːlt wɛn hiː siːz ˈsʌmərz ɪnˈɡeɪdʒmənt rɪŋ./",
        "keywords": ["crashing halt", "engagement ring"],
        "explanationAi": "Khung hình Kỳ Vọng mờ dần biến mất, chỉ còn lại hiện thực xám xịt nghiệt ngã.",
        "properNouns": ["Summer"]
    },
    {
        "startTime": 612.0,
        "endTime": 624.0,
        "text": "While we expect a romantic movie ending, real life rarely works out the way we wish it could.",
        "translationVi": "Dẫu chúng ta luôn mong mỏi một cái kết ngọt ngào như phim ảnh, đời thực hiếm khi diễn ra theo cách ta hằng mong ước.",
        "ipaUs": "/waɪl wiː ɪkˈspɛkt ə roʊˈmæntɪk ˈmuːvi ˈɛndɪŋ, ˈriːəl laɪf ˈrɛrli wɜːrks aʊt ðə weɪ wiː wɪʃ ɪt kʊd./",
        "keywords": ["romantic movie ending", "real life"],
        "explanationAi": "Thông điệp đắt giá nhất của 500 Days of Summer khép lại toàn bộ 624 giây trải nghiệm điện ảnh.",
        "properNouns": []
    }
]

# Update orderIndex
for idx, s in enumerate(raw_segments):
    s['orderIndex'] = idx

with open('scripts/summer_master_pure_segments.json', 'w', encoding='utf-8') as f:
    json.dump(raw_segments, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(raw_segments)} pure zero-merged segments for 500 Days of Summer!")
