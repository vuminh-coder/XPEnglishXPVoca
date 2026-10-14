import json
import re

raw_segments = [
    {
        "orderIndex": 0,
        "startTime": 45.0,
        "endTime": 65.0,
        "text": "Today, we're learning English with Kung Fu Panda! Aww Yeah! You are going to be learning with your new RealLife English fluency coach, Andrea!",
        "translationVi": "Hôm nay, chúng ta cùng học tiếng Anh qua bộ phim Kung Fu Panda! Tuyệt vời! Các bạn sẽ cùng học với huấn luyện viên lưu loát mới của RealLife English, cô Andrea!",
        "ipaUs": "/təˈdeɪ, wɪr ˈlɜːrnɪŋ ˈɪŋɡlɪʃ wɪð kʊŋ fuː ˈpændə! ɔː jɛə! juː ɑːr ˈɡoʊɪŋ tuː biː ˈlɜːrnɪŋ wɪð jʊər njuː ˈriːəlˌlaɪf ˈɪŋɡlɪʃ ˈfluːənsi koʊtʃ, ænˈdreɪə!/",
        "keywords": ["Kung Fu Panda", "learning English", "fluency coach", "RealLife English"],
        "explanationAi": "Lời chào mở đầu bài học từ kênh RealLife English. Khái niệm 'fluency coach' chỉ người hướng dẫn rèn luyện phản xạ nói tiếng Anh lưu loát như người bản xứ.",
        "properNouns": ["Kung Fu Panda", "RealLife English", "Andrea"]
    },
    {
        "orderIndex": 1,
        "startTime": 65.0,
        "endTime": 85.0,
        "text": "Today we have a really fun intermediate lesson for you with superstar actors such as Angelina Jolie, Dustin Hoffman, Jack Black, Lucy Liu, and Jackie Chan, who all voiced characters in this DreamWorks animation.",
        "translationVi": "Hôm nay chúng ta có một bài học trung cấp cực kỳ thú vị cùng dàn diễn viên siêu sao như Angelina Jolie, Dustin Hoffman, Jack Black, Lucy Liu và Thành Long, những người đều lồng tiếng cho các nhân vật trong tác phẩm hoạt hình của DreamWorks này.",
        "ipaUs": "/təˈdeɪ wiː hæv ə ˈrɪəli fʌn ˌɪntərˈmiːdiət ˈlɛsən fɔːr juː wɪð ˈsuːpərˌstɑːr ˈæktərz sʌtʃ æz ˌændʒəˈliːnə ʒoʊˈliː, ˈdʌstɪn ˈhɑːfmən, dʒæk blæk, ˈluːsi ˈluː, ænd ˈdʒæki tʃæn, huː ɔːl vɔɪst ˈkærɪktərz ɪn ðɪs ˈdriːmˌwɜːrks ˌænəˈmeɪʃən./",
        "keywords": ["intermediate lesson", "superstar actors", "voiced characters", "DreamWorks animation"],
        "explanationAi": "Từ vựng điện ảnh: 'voiced characters' (lồng tiếng cho các nhân vật), 'intermediate lesson' (bài học cấp độ trung cấp CEFR B1-B2).",
        "properNouns": ["Angelina Jolie", "Dustin Hoffman", "Jack Black", "Lucy Liu", "Jackie Chan", "DreamWorks"]
    },
    {
        "orderIndex": 2,
        "startTime": 85.0,
        "endTime": 115.0,
        "text": "Kung Fu Panda is about a lazy panda and an unlikely hero named Po, who must somehow become a kung fu master in order to protect his ancient village from the villainous snow leopard Tai Lung.",
        "translationVi": "Kung Fu Panda kể về một chú gấu trúc lười biếng và một người hùng bất đắc dĩ tên là Po, người bằng cách nào đó phải trở thành một bậc thầy kung fu để bảo vệ ngôi làng cổ kính của mình khỏi báo tuyết hung ác Tai Lung.",
        "ipaUs": "/kʊŋ fuː ˈpændə ɪz əˈbaʊt ə ˈleɪzi ˈpændə ænd ən ʌnˈlaɪkli ˈhɪroʊ neɪmd poʊ, huː mʌst ˈsʌmˌhaʊ bɪˈkʌm ə kʊŋ fuː ˈmæstər ɪn ˈɔːrdər tuː prəˈtɛkt hɪz ˈeɪnʃənt ˈvɪlɪdʒ frʌm ðə ˈvɪlənəs snoʊ ˈlɛpərd taɪ lʌŋ./",
        "keywords": ["unlikely hero", "kung fu master", "protect ancient village", "villainous"],
        "explanationAi": "Khái niệm kịch bản điện ảnh kinh điển: 'unlikely hero' (người hùng bất đắc dĩ, nhân vật bình thường bước vào sứ mệnh phi thường).",
        "properNouns": ["Kung Fu Panda", "Po", "Tai Lung"]
    },
    {
        "orderIndex": 3,
        "startTime": 115.0,
        "endTime": 140.0,
        "text": "In this lesson, we will help you to learn English without getting lost, without missing the jokes, and without subtitles. So let's jump right into the first scene!",
        "translationVi": "Trong bài học này, chúng tôi sẽ giúp bạn học tiếng Anh mà không bị mất phương hướng, không bỏ lỡ các mẩu chuyện cười, và không cần nhìn phụ đề. Nào, hãy cùng bước ngay vào phân cảnh đầu tiên!",
        "ipaUs": "/ɪn ðɪs ˈlɛsən, wiː wɪl hɛlp juː tuː lɜːrn ˈɪŋɡlɪʃ wɪðˈaʊt ˈɡɛtɪŋ lɔːst, wɪðˈaʊt ˈmɪsɪŋ ðə dʒoʊks, ænd wɪðˈaʊt ˈsʌbˌtaɪtəlz. soʊ lɛts dʒʌmp raɪt ˈɪntuː ðə fɜːrst siːn!/",
        "keywords": ["getting lost", "missing jokes", "without subtitles", "jump right into"],
        "explanationAi": "Thành ngữ sư phạm: 'jump right into' (bắt đầu ngay lập tức mà không chần chừ), 'get lost' (bị lạc lõng, mất phương hướng khi nghe nói tiếng Anh).",
        "properNouns": []
    },
    {
        "orderIndex": 4,
        "startTime": 140.0,
        "endTime": 158.0,
        "text": "OW! I thought you said acupuncture would make me feel better!",
        "translationVi": "Ối đau quá! Tôi tưởng bạn bảo châm cứu sẽ làm tôi cảm thấy dễ chịu hơn cơ mà!",
        "ipaUs": "/aʊ! aɪ θɔːt juː sɛd ˈækjəˌpʌŋktʃər wʊd meɪk miː fiːl ˈbɛtər!/",
        "keywords": ["acupuncture", "make me feel better"],
        "explanationAi": "Danh từ y học phương Đông: 'acupuncture' (thuật châm cứu bằng kim). Po kêu thét khi Mantis châm kim vào huyệt đạo.",
        "properNouns": []
    },
    {
        "orderIndex": 5,
        "startTime": 158.0,
        "endTime": 164.0,
        "text": "Trust me, it will. It's just not easy finding the right nerve points under all this...",
        "translationVi": "Tin tôi đi, sẽ đỡ mà. Chỉ là chẳng dễ dàng gì để tìm đúng các huyệt đạo dưới đống...",
        "ipaUs": "/trʌst miː, ɪt wɪl. ɪts dʒʌst nɑːt ˈiːzi ˈfaɪndɪŋ ðə raɪt nɜːrv pɔɪnts ˈʌndər ɔːl ðɪs.../",
        "keywords": ["nerve points", "trust me"],
        "explanationAi": "'Nerve points' (các điểm huyệt đạo dây thần kinh). Mantis ngập ngừng trước lớp mỡ dày của Po.",
        "properNouns": []
    },
    {
        "orderIndex": 6,
        "startTime": 164.0,
        "endTime": 166.0,
        "text": "Fat?",
        "translationVi": "Mỡ chứ gì?",
        "ipaUs": "/fæt?/",
        "keywords": ["fat"],
        "explanationAi": "Po tự ái ngắt lời khi Mantis định chê thân hình quá khổ của mình.",
        "properNouns": []
    },
    {
        "orderIndex": 7,
        "startTime": 166.0,
        "endTime": 169.0,
        "text": "Fur, I was gonna say fur.",
        "translationVi": "Lông, tôi định nói là dưới đống lông dày của cậu đấy chứ.",
        "ipaUs": "/fɜːr, aɪ wʌz ˈɡɑːnə seɪ fɜːr./",
        "keywords": ["fur", "was gonna say"],
        "explanationAi": "Lối chữa ngượng hài hước của Mantis: thay từ 'fat' (mỡ) bằng 'fur' (lông thú).",
        "properNouns": []
    },
    {
        "orderIndex": 8,
        "startTime": 169.0,
        "endTime": 172.0,
        "text": "Sure you were.",
        "translationVi": "Chắc thế rồi, tin bạn ghê cơ.",
        "ipaUs": "/ʃʊr juː wɜːr./",
        "keywords": ["sure you were"],
        "explanationAi": "Ngữ điệu mỉa mai trào phúng 'Sure you were' (Tôi lạ gì bụng dạ bạn nữa).",
        "properNouns": []
    },
    {
        "orderIndex": 9,
        "startTime": 172.0,
        "endTime": 178.0,
        "text": "Who am I to judge a warrior based on his size? I mean, look at me!",
        "translationVi": "Tôi là ai mà dám phán xét một chiến binh dựa vào kích thước cơ thể chứ? Ý tôi là, nhìn tôi mà xem!",
        "ipaUs": "/huː æm aɪ tuː dʒʌdʒ ə ˈwɔːriər beɪst ɑːn hɪz saɪz? aɪ miːn, lʊk æt miː!/",
        "keywords": ["judge a warrior", "based on his size"],
        "explanationAi": "Thành ngữ 'judge someone based on something' (phán xét ai dựa trên vẻ bề ngoài). Mantis là bọ ngựa tí hon nhưng là cao thủ võ lâm.",
        "properNouns": []
    },
    {
        "orderIndex": 10,
        "startTime": 178.0,
        "endTime": 182.0,
        "text": "I'm over here. Ow! Maybe you should take a look at this again.",
        "translationVi": "Tôi ở đằng này cơ. Ôi đau! Có lẽ bạn nên nhìn lại sơ đồ huyệt này lần nữa đi.",
        "ipaUs": "/aɪm ˈoʊvər hɪr. aʊ! ˈmeɪbi juː ʃʊd teɪk ə lʊk æt ðɪs əˈɡɛn./",
        "keywords": ["take a look at this"],
        "explanationAi": "Tình huống thị giác hài hước: Mantis châm nhầm chỗ vì cơ thể Po quá đồ sộ.",
        "properNouns": []
    },
    {
        "orderIndex": 11,
        "startTime": 182.0,
        "endTime": 195.0,
        "text": "And now Shifu has a chance to make things right, to train the true Dragon Warrior. And he's stuck with you... a big, fat panda who treats it like a joke.",
        "translationVi": "Và giờ đây Shifu có cơ hội để sửa chữa sai lầm, để huấn luyện Thần Long Đại Hiệp thực thụ. Nhưng thầy lại phải chịu đựng cậu... một con gấu trúc béo ục ịch coi võ thuật như trò đùa.",
        "ipaUs": "/ænd naʊ ˈʃiːfuː hæz ə tʃæns tuː meɪk θɪŋz raɪt, tuː treɪn ðə truː ˈdræɡən ˈwɔːriər. ænd hiːz stʌk wɪð juː... ə bɪɡ, fæt ˈpændə huː triːts ɪt laɪk ə dʒoʊk./",
        "keywords": ["make things right", "true Dragon Warrior", "stuck with you", "treats it like a joke"],
        "explanationAi": "Thành ngữ 'make things right' (sửa chữa sai lầm, chuộc lỗi) và 'be stuck with someone' (mắc kẹt, buộc phải chịu đựng ai đó).",
        "properNouns": ["Shifu", "Dragon Warrior"]
    },
    {
        "orderIndex": 12,
        "startTime": 195.0,
        "endTime": 200.0,
        "text": "OH, THAT IS IT!",
        "translationVi": "ÔI, THÔI XONG RỒI!",
        "ipaUs": "/oʊ, ðæt ɪz ɪt!/",
        "keywords": ["that is it"],
        "explanationAi": "Tiếng la hoảng hốt của Po khi bị liệt cơ mặt sau cú châm kim của Mantis.",
        "properNouns": []
    },
    {
        "orderIndex": 13,
        "startTime": 200.0,
        "endTime": 210.0,
        "text": "Wait! My fault! I accidentally tweaked his facial nerve. And may have also stopped his heart.",
        "translationVi": "Khoan đã! Lỗi tại tôi! Tôi vô tình châm trúng dây thần kinh mặt của cậu ấy rồi. Và có lẽ cũng vừa làm tim cậu ấy ngừng đập luôn.",
        "ipaUs": "/weɪt! maɪ fɔːlt! aɪ ˌæksəˈdɛntəli twiːkt hɪz ˈfeɪʃəl nɜːrv. ænd meɪ hæv ˈɔːlsoʊ stɑːpt hɪz hɑːrt./",
        "keywords": ["my fault", "accidentally tweaked", "facial nerve", "stopped his heart"],
        "explanationAi": "Động từ 'tweak' (nhéo, giật, châm sai lệch). Tình huống hài hước kinh điển trong buổi châm cứu.",
        "properNouns": []
    },
    {
        "orderIndex": 14,
        "startTime": 210.0,
        "endTime": 240.0,
        "text": "Notice the expression 'make things right', which means to correct a mistake or restore justice, and 'stuck with', which describes being forced to deal with an undesirable situation.",
        "translationVi": "Hãy chú ý đến thành ngữ 'make things right', có nghĩa là sửa chữa lỗi lầm hoặc lập lại công lý, và 'stuck with', miêu tả việc bị buộc phải chịu đựng một tình thế không mong muốn.",
        "ipaUs": "/ˈnoʊtɪs ði ɪkˈsprɛʃən meɪk θɪŋz raɪt, wɪtʃ miːnz tuː kəˈrɛkt ə mɪsˈteɪk ɔːr rɪˈstɔːr ˈdʒʌstɪs, ænd stʌk wɪð, wɪtʃ dɪˈskraɪbz ˈbiːɪŋ fɔːrst tuː diːl wɪð ən ˌʌndɪˈzaɪrəbəl ˌsɪtʃuˈeɪʃən./",
        "keywords": ["make things right", "correct a mistake", "stuck with", "undesirable situation"],
        "explanationAi": "Giải thích ngữ nghĩa học ứng dụng: phân tích hai cụm từ vựng quan trọng trong đối thoại giao tiếp bản xứ.",
        "properNouns": []
    },
    {
        "orderIndex": 15,
        "startTime": 240.0,
        "endTime": 270.0,
        "text": "The word 'tweak' means to pull, twist, or pinch something with a sharp movement, but colloquially it means to make a fine adjustment to a mechanism or system.",
        "translationVi": "Từ 'tweak' có nghĩa là kéo, xoắn hoặc véo cái gì đó bằng động tác sắc gọn, nhưng trong khẩu ngữ nó còn mang nghĩa là tinh chỉnh một cỗ máy hay hệ thống.",
        "ipaUs": "/ðə wɜːrd twiːk miːnz tuː pʊl, twɪst, ɔːr pɪntʃ ˈsʌmθɪŋ wɪð ə ʃɑːrp ˈmuːvmənt, bʌt kəˈloʊkwiəli ɪt miːnz tuː meɪk ə faɪn əˈdʒʌstmənt tuː ə ˈmɛkəˌnɪzəm ɔːr ˈsɪstəm./",
        "keywords": ["tweak", "fine adjustment", "mechanism"],
        "explanationAi": "Mở rộng từ vựng công nghệ và đời sống: từ 'tweak' rất phổ biến trong lập trình và tối ưu hóa hệ thống.",
        "properNouns": []
    },
    {
        "orderIndex": 16,
        "startTime": 270.0,
        "endTime": 310.0,
        "text": "Pay attention to connected speech when Mantis says 'I was gonna say': 'going to' reduces to 'gonna', which is standard in informal spoken American English.",
        "translationVi": "Hãy chú ý đến hiện tượng nối âm nuốt từ khi Mantis nói 'I was gonna say': 'going to' được giản lược thành 'gonna', vốn là chuẩn mực trong tiếng Anh giao tiếp thân mật của người Mỹ.",
        "ipaUs": "/peɪ əˈtɛnʃən tuː kəˈnɛktɪd spiːtʃ wɛn ˈmæntɪs sɛz aɪ wʌz ˈɡɑːnə seɪ: ˈɡoʊɪŋ tuː rɪˈduːsɪz tuː ˈɡɑːnə, wɪtʃ ɪz ˈstændərd ɪn ɪnˈfɔːrməl ˈspoʊkən əˈmɛrɪkən ˈɪŋɡlɪʃ./",
        "keywords": ["connected speech", "reduces to gonna", "informal spoken English"],
        "explanationAi": "Quy tắc ngữ âm học: sự giản lược nguyên âm và đồng hóa âm thanh trong phát âm bản ngữ tự nhiên.",
        "properNouns": ["Mantis"]
    },
    {
        "orderIndex": 17,
        "startTime": 310.0,
        "endTime": 360.0,
        "text": "Now let's examine the deeply philosophical story scene by the Sacred Peach Tree of Heavenly Wisdom, where Po confides in Master Oogway.",
        "translationVi": "Bây giờ chúng ta hãy cùng phân tích phân cảnh triết học thâm sâu bên Cây Đào Thiêng của Trí Tuệ Thiên Đường, nơi Po dốc bầu tâm sự với Đại sư Oogway.",
        "ipaUs": "/naʊ lɛts ɪɡˈzæmɪn ðə ˈdiːpli ˌfɪləˈsɑːfɪkəl ˈstɔːri siːn baɪ ðə ˈseɪkrɪd piːtʃ triː əv ˈhɛvənli ˈwɪzdəm, wɛr poʊ kənˈfaɪdz ɪn ˈmæstər ˈuːɡweɪ./",
        "keywords": ["philosophical scene", "Sacred Peach Tree", "Heavenly Wisdom", "confides in"],
        "explanationAi": "Bước chuyển cảnh sang trọng tâm triết học phương Đông của tác phẩm hoạt hình.",
        "properNouns": ["Sacred Peach Tree", "Heavenly Wisdom", "Po", "Master Oogway"]
    },
    {
        "orderIndex": 18,
        "startTime": 360.0,
        "endTime": 380.0,
        "text": "I eat when I'm upset, okay? I probably sucked more than anybody in the history of kung fu, in the history of China, in the history of sucking!",
        "translationVi": "Tôi ăn mỗi khi tôi buồn bực, được chưa? Tôi có lẽ là kẻ tệ hại hơn bất kỳ ai trong lịch sử kung fu, trong lịch sử Trung Hoa, trong lịch sử của sự tệ hại!",
        "ipaUs": "/aɪ iːt wɛn aɪm ʌpˈsɛt, ˌoʊˈkeɪ? aɪ ˈprɑːbəbli sʌkt mɔːr ðæn ˈɛniˌbɑːdi ɪn ðə ˈhɪstəri əv kʊŋ fuː, ɪn ðə ˈhɪstəri əv ˈtʃaɪnə, ɪn ðə ˈhɪstəri əv ˈsʌkɪŋ!/",
        "keywords": ["eat when I'm upset", "history of kung fu", "history of sucking"],
        "explanationAi": "Khẩu ngữ biểu cảm cường điệu của Jack Black: 'suck' (kém cỏi, tệ hại). Nỗi tự ti sâu sắc của Po khi bị coi thường.",
        "properNouns": ["China"]
    },
    {
        "orderIndex": 19,
        "startTime": 380.0,
        "endTime": 405.0,
        "text": "There is a saying: Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.",
        "translationVi": "Có một câu ngạn ngữ cổ xưa thế này: Hôm qua là lịch sử, ngày mai là bí ẩn, nhưng hôm nay là một món quà. Đó chính là lý do vì sao nó được gọi là hiện tại (present).",
        "ipaUs": "/ðɛr ɪz ə ˈseɪɪŋ: ˈjɛstərˌdeɪ ɪz ˈhɪstəri, təˈmɑːroʊ ɪz ə ˈmɪstəri, bʌt təˈdeɪ ɪz ə ɡɪft. ðæt ɪz waɪ ɪt ɪz kɔːld ðə ˈprɛzənt./",
        "keywords": ["yesterday is history", "tomorrow is a mystery", "today is a gift", "called the present"],
        "explanationAi": "Câu thoại kinh điển nhất của Kung Fu Panda: Lối chơi chữ vi diệu từ 'present' vừa có nghĩa là 'món quà', vừa có nghĩa là 'khoảnh khắc hiện tại'.",
        "properNouns": []
    },
    {
        "orderIndex": 20,
        "startTime": 405.0,
        "endTime": 420.0,
        "text": "Master, bad news! Tai Lung has broken out of prison! He is on his way to take the Dragon Scroll!",
        "translationVi": "Sư phụ, có hung tin! Tai Lung đã vượt ngục thoát ra ngoài rồi! Hắn đang trên đường đến đây để cướp Cuộn Bí Kíp Rồng!",
        "ipaUs": "/ˈmæstər, bæd nuːz! taɪ lʌŋ hæz ˈbroʊkən aʊt əv ˈprɪzən! hiː ɪz ɑːn hɪz weɪ tuː teɪk ðə ˈdræɡən skroʊl!/",
        "keywords": ["bad news", "broken out of prison", "Dragon Scroll"],
        "explanationAi": "Cụm động từ 'break out of prison' (vượt ngục tẩu thoát). Shifu hoảng loạn báo tin dữ cho Oogway.",
        "properNouns": ["Tai Lung", "Dragon Scroll"]
    },
    {
        "orderIndex": 21,
        "startTime": 420.0,
        "endTime": 425.0,
        "text": "Nothing is impossible.",
        "translationVi": "Chẳng có điều gì là bất khả thi cả.",
        "ipaUs": "/ˈnʌθɪŋ ɪz ɪmˈpɑːsəbəl./",
        "keywords": ["nothing is impossible"],
        "explanationAi": "Sự điềm tĩnh vô hạn của bậc đại sư đắc đạo trước nghịch cảnh.",
        "properNouns": []
    },
    {
        "orderIndex": 22,
        "startTime": 425.0,
        "endTime": 445.0,
        "text": "My old friend, the panda will never fulfill his destiny, nor you yours, until you let go of the illusion of control.",
        "translationVi": "Người bạn cũ của ta ơi, chú gấu trúc sẽ không bao giờ hoàn thành được sứ mệnh của mình, và con cũng vậy, chừng nào con chưa buông bỏ được ảo tưởng về sự kiểm soát.",
        "ipaUs": "/maɪ oʊld frɛnd, ðə ˈpændə wɪl ˈnɛvər fʊlˈfɪl hɪz ˈdɛstəni, nɔːr juː jʊərz, ənˈtɪl juː lɛt ɡoʊ əv ðɪ ɪˈluːʒən əv kənˈtroʊl./",
        "keywords": ["fulfill destiny", "let go of", "illusion of control"],
        "explanationAi": "Cốt lõi triết học Đạo giáo: 'illusion of control' (ảo tưởng có thể kiểm soát và cưỡng cầu quy luật vận hành của vũ trụ).",
        "properNouns": []
    },
    {
        "orderIndex": 23,
        "startTime": 445.0,
        "endTime": 450.0,
        "text": "Illusion?",
        "translationVi": "Ảo tưởng sao ạ?",
        "ipaUs": "/ɪˈluːʒən?/",
        "keywords": ["illusion"],
        "explanationAi": "Sự bàng hoàng và chưa thấu triệt của Shifu.",
        "properNouns": []
    },
    {
        "orderIndex": 24,
        "startTime": 450.0,
        "endTime": 465.0,
        "text": "Yes. Look at this tree, Shifu. I cannot make it blossom when it suits me, nor make it bear fruit before its time.",
        "translationVi": "Đúng vậy. Hãy nhìn cái cây này xem, Shifu. Ta không thể bắt nó đơm hoa vào lúc ta thấy thuận tiện, cũng chẳng thể ép nó kết trái trước thời vụ của nó.",
        "ipaUs": "/jɛs. lʊk æt ðɪs triː, ˈʃiːfuː. aɪ ˈkænɑːt meɪk ɪt ˈblɑːsəm wɛn ɪt suːts miː, nɔːr meɪk ɪt bɛr fruːt bɪˈfɔːr ɪts taɪm./",
        "keywords": ["make it blossom", "when it suits me", "bear fruit before its time"],
        "explanationAi": "Ẩn dụ tự nhiên: Quy luật sinh trưởng đòi hỏi sự kiên nhẫn thuận theo tự nhiên ('bear fruit before its time').",
        "properNouns": ["Shifu"]
    },
    {
        "orderIndex": 25,
        "startTime": 465.0,
        "endTime": 485.0,
        "text": "But there are things we can control! I can control when the fruit will fall! And I can control where to plant the seed! That is no illusion, Master!",
        "translationVi": "Nhưng có những thứ chúng ta có thể kiểm soát được! Con có thể kiểm soát thời điểm quả rơi xuống! Và con có thể kiểm soát nơi gieo hạt giống! Điều đó không hề là ảo tưởng, thưa Sư phụ!",
        "ipaUs": "/bʌt ðɛr ɑːr θɪŋz wiː kæn kənˈtroʊl! aɪ kæn kənˈtroʊl wɛn ðə fruːt wɪl fɔːl! ænd aɪ kæn kənˈtroʊl wɛr tuː plænt ðə siːd! ðæt ɪz noʊ ɪˈluːʒən, ˈmæstər!/",
        "keywords": ["things we can control", "plant the seed", "no illusion"],
        "explanationAi": "Phản ứng của Shifu: Cố bấu víu vào các hành vi can thiệp vật lý tức thời để chứng minh quyền kiểm soát.",
        "properNouns": ["Master"]
    },
    {
        "orderIndex": 26,
        "startTime": 485.0,
        "endTime": 510.0,
        "text": "Ah, yes. But no matter what you do, that seed will grow to be a peach tree. You may wish for an apple or an orange, but you will get a peach.",
        "translationVi": "À, đúng vậy. Nhưng dẫu con có làm bất cứ điều gì đi nữa, cái hạt đó vẫn sẽ lớn lên thành một cây đào. Con có thể ước nó thành cây táo hay cây cam, nhưng con sẽ chỉ nhận được một cây đào mà thôi.",
        "ipaUs": "/ɑː, jɛs. bʌt noʊ ˈmætər wʌt juː duː, ðæt siːd wɪl ɡroʊ tuː biː ə piːtʃ triː. juː meɪ wɪʃ fɔːr ən ˈæpəl ɔːr ən ˈɔːrəndʒ, bʌt juː wɪl ɡɛt ə piːtʃ./",
        "keywords": ["no matter what you do", "grow to be a peach tree", "wish for an apple"],
        "explanationAi": "Bài học sư phạm bất hủ: Tôn trọng thiên tính tự nhiên của mỗi học trò, không thể ép một 'quả đào' trở thành 'quả táo'.",
        "properNouns": []
    },
    {
        "orderIndex": 27,
        "startTime": 510.0,
        "endTime": 516.0,
        "text": "But a peach cannot defeat Tai Lung!",
        "translationVi": "Nhưng một quả đào làm sao có thể đánh bại được Tai Lung chứ!",
        "ipaUs": "/bʌt ə piːtʃ ˈkænɑːt dɪˈfiːt taɪ lʌŋ!/",
        "keywords": ["peach cannot defeat"],
        "explanationAi": "Tiếng kêu tuyệt vọng của Shifu khi nhìn vào vẻ vụng về mập mạp của Po.",
        "properNouns": ["Tai Lung"]
    },
    {
        "orderIndex": 28,
        "startTime": 516.0,
        "endTime": 530.0,
        "text": "Maybe it can. If you are willing to guide it, to nurture it, to believe in it.",
        "translationVi": "Có lẽ nó có thể đấy. Nếu con sẵn lòng chỉ dẫn nó, nuôi dưỡng nó, và đặt trọn niềm tin vào nó.",
        "ipaUs": "/ˈmeɪbi ɪt kæn. ɪf juː ɑːr ˈwɪlɪŋ tuː ɡaɪd ɪt, tuː ˈnɜːrtʃər ɪt, tuː bɪˈliːv ɪn ɪt./",
        "keywords": ["willing to guide", "nurture it", "believe in it"],
        "explanationAi": "Ba trụ cột giáo dục vĩ đại của Oogway: 'Guide' (chỉ lối), 'Nurture' (nuôi dưỡng tiềm năng), 'Believe' (niềm tin vô điều kiện).",
        "properNouns": []
    },
    {
        "orderIndex": 29,
        "startTime": 530.0,
        "endTime": 540.0,
        "text": "But how? How? I need your help, Master.",
        "translationVi": "Nhưng bằng cách nào? Bằng cách nào cơ chứ? Con cần sự giúp đỡ của Sư phụ.",
        "ipaUs": "/bʌt haʊ? haʊ? aɪ niːd jɔːr hɛlp, ˈmæstər./",
        "keywords": ["need your help"],
        "explanationAi": "Sự hoang mang của người thầy khi mất đi điểm tựa che chở.",
        "properNouns": ["Master"]
    },
    {
        "orderIndex": 30,
        "startTime": 540.0,
        "endTime": 555.0,
        "text": "No. You just need to believe. Promise me, Shifu. Promise me you will believe.",
        "translationVi": "Không. Con chỉ cần tin tưởng. Hãy hứa với ta, Shifu. Hãy hứa với ta rằng con sẽ đặt niềm tin.",
        "ipaUs": "/noʊ. juː dʒʌst niːd tuː bɪˈliːv. ˈprɑːmɪs miː, ˈʃiːfuː. ˈprɑːmɪs miː juː wɪl bɪˈliːv./",
        "keywords": ["just need to believe", "promise me"],
        "explanationAi": "Thông điệp thiêng liêng trao truyền: Sức mạnh chuyển hóa lớn nhất trong cuộc đời chính là 'Belief' (Niềm tin).",
        "properNouns": ["Shifu"]
    },
    {
        "orderIndex": 31,
        "startTime": 555.0,
        "endTime": 560.0,
        "text": "I... I will try.",
        "translationVi": "Con... con sẽ cố gắng.",
        "ipaUs": "/aɪ... aɪ wɪl traɪ./",
        "keywords": ["I will try"],
        "explanationAi": "Lời hứa chân thành của Shifu trước giờ phút chia ly.",
        "properNouns": []
    },
    {
        "orderIndex": 32,
        "startTime": 560.0,
        "endTime": 585.0,
        "text": "Good. My time has come. You must continue your journey without me.",
        "translationVi": "Tốt lắm. Thời khắc của ta đã đến rồi. Con phải tiếp tục hành trình của mình mà không còn ta bên cạnh.",
        "ipaUs": "/ɡʊd. maɪ taɪm hæz kʌm. juː mʌst kənˈtɪnjuː jɔːr ˈdʒɜːrni wɪðˈaʊt miː./",
        "keywords": ["my time has come", "continue your journey"],
        "explanationAi": "Khoảnh khắc thăng thiên thanh thản của Oogway giữa cơn mưa cánh hoa đào.",
        "properNouns": []
    },
    {
        "orderIndex": 33,
        "startTime": 585.0,
        "endTime": 640.0,
        "text": "Let's analyze the phrase 'when it suits me': to suit someone means to be convenient, acceptable, or appropriate for them, such as 'that time suits me well.'",
        "translationVi": "Chúng ta hãy cùng phân tích cụm từ 'when it suits me': 'suit someone' có nghĩa là thuận tiện, vừa ý hoặc thích hợp với ai đó, ví dụ 'thời gian đó rất tiện cho tôi'.",
        "ipaUs": "/lɛts ˈænəˌlaɪz ðə freɪz wɛn ɪt suːts miː: tuː suːt ˈsʌmˌwʌn miːnz tuː biː kənˈviːnjənt, əkˈsɛptəbəl, ɔːr əˈproʊpriət fɔːr ðɛm, sʌtʃ æz ðæt taɪm suːts miː wɛl./",
        "keywords": ["when it suits me", "convenient", "appropriate"],
        "explanationAi": "Bài học từ vựng thực dụng: 'suit someone' dùng thường xuyên trong giao tiếp hàng ngày khi sắp xếp lịch hẹn.",
        "properNouns": []
    },
    {
        "orderIndex": 34,
        "startTime": 640.0,
        "endTime": 700.0,
        "text": "Notice the idiom 'bear fruit': literally trees bear fruit, but metaphorically it means that hard work or a prolonged effort yields positive, successful results.",
        "translationVi": "Hãy chú ý đến thành ngữ 'bear fruit': theo nghĩa đen là cây cối ra hoa kết trái, nhưng theo nghĩa bóng nó chỉ việc sự chăm chỉ hay nỗ lực bền bỉ mang lại kết quả tích cực, mỹ mãn.",
        "ipaUs": "/ˈnoʊtɪs ði ˈɪdiəm bɛr fruːt: ˈlɪtərəli triːz bɛr fruːt, bʌt ˌmɛtəˈfɔːrɪkli ɪt miːnz ðæt hɑːrd wɜːrk ɔːr ə prəˈlɔːŋd ˈɛfərt jiːldz ˈpɑːzətɪv, səkˈsɛsfəl rɪˈzʌlts./",
        "keywords": ["bear fruit", "metaphorically", "yields positive results"],
        "explanationAi": "Thành ngữ học thuật nâng cao: 'bear fruit' (đơm hoa kết trái, gặt hái thành quả tốt đẹp).",
        "properNouns": []
    },
    {
        "orderIndex": 35,
        "startTime": 700.0,
        "endTime": 760.0,
        "text": "In the line 'let go of the illusion of control', the phrasal verb 'let go of' means to release one's grip, both physically on an object and mentally on worries or obsession.",
        "translationVi": "Trong câu 'let go of the illusion of control', cụm động từ 'let go of' có nghĩa là buông tay thả ra, vừa theo nghĩa đen về thể chất buông một đồ vật, vừa theo nghĩa bóng buông bỏ nỗi lo âu hay sự ám ảnh trong tâm trí.",
        "ipaUs": "/ɪn ðə laɪn lɛt ɡoʊ əv ðɪ ɪˈluːʒən əv kənˈtroʊl, ðə ˈfreɪzəl vɜːrb lɛt ɡoʊ əv miːnz tuː rɪˈliːs wʌnz ɡrɪp, boʊθ ˈfɪzɪkli ɑːn ən ˈɑːbdʒɪkt ænd ˈmɛntəli ɑːn ˈwɜːriz ɔːr əbˈsɛʃən./",
        "keywords": ["let go of", "release grip", "illusion of control", "mental worries"],
        "explanationAi": "Cụm động từ tâm lý học sâu sắc: 'let go of' (buông xả, ngừng kiểm soát cưỡng cầu).",
        "properNouns": []
    },
    {
        "orderIndex": 36,
        "startTime": 760.0,
        "endTime": 820.0,
        "text": "Now in the scene review, listen to the actors' natural delivery without subtitles: observe Dustin Hoffman's crisp articulation as Shifu and Randall Duk Kim's serene cadence as Oogway.",
        "translationVi": "Bây giờ trong phần xem lại phân cảnh, hãy lắng nghe lối diễn xuất âm thanh tự nhiên của các diễn viên mà không cần phụ đề: quan sát cách nhả chữ sắc sảo của Dustin Hoffman trong vai Shifu và ngữ điệu thanh thản, từ tốn của Randall Duk Kim trong vai Oogway.",
        "ipaUs": "/naʊ ɪn ðə siːn rɪˈvjuː, ˈlɪsən tuː ði ˈæktərz ˈnætʃərəl dɪˈlɪvəri wɪˈðaʊt ˈsʌbˌtaɪtəlz: əbˈzɜːrv ˈdʌstɪn ˈhɑːfmənz krɪsp ɑːrˌtɪkjəˈleɪʃən æz ˈʃiːfuː ænd ˈrændəl dʌk kɪmz səˈriːn ˈkeɪdəns æz ˈuːɡweɪ./",
        "keywords": ["scene review", "natural delivery", "crisp articulation", "serene cadence"],
        "explanationAi": "Nghệ thuật lồng tiếng Hollywood: Sự tương phản âm học giữa nhịp điệu dồn dập (crisp articulation) của Shifu và nhịp điệu tĩnh tại (serene cadence) của Oogway.",
        "properNouns": ["Dustin Hoffman", "Shifu", "Randall Duk Kim", "Oogway"]
    },
    {
        "orderIndex": 37,
        "startTime": 820.0,
        "endTime": 1200.0,
        "text": "If you're enjoying this lesson, you'll definitely love our lesson on the classic animation Shrek, where you'll learn both formal and informal vocabulary with Scottish and English accents.",
        "translationVi": "Nếu bạn yêu thích bài học này, chắc chắn bạn cũng sẽ say mê bài học của chúng tôi về bộ phim hoạt hình kinh điển Shrek, nơi bạn sẽ được học cả từ vựng trang trọng lẫn thân mật cùng các chất giọng Scotland và Anh.",
        "ipaUs": "/ɪf jʊr ɛnˈdʒɔɪɪŋ ðɪs ˈlɛsən, juːl ˈdɛfənətli lʌv ˈaʊər ˈlɛsən ɑːn ðə ˈklæsɪk ˌænəˈmeɪʃən ʃrɛk, wɛr juːl lɜːrn boʊθ ˈfɔːrməl ænd ɪnˈfɔːrməl voʊˈkæbjəˌlɛri wɪð ˈskɑːtɪʃ ænd ˈɪŋɡlɪʃ ˈæksɛnts./",
        "keywords": ["classic animation", "Shrek", "Scottish accent", "formal and informal"],
        "explanationAi": "Mở rộng liên văn hóa: Khám phá sự đa dạng của các phương ngữ tiếng Anh (accents) qua các tác phẩm hoạt hình của DreamWorks.",
        "properNouns": ["Shrek"]
    },
    {
        "orderIndex": 38,
        "startTime": 1200.0,
        "endTime": 1652.0,
        "text": "I hope you enjoyed today's lesson! Don't forget to give us a thumbs up down below so that we know you want more content like this. Thanks for joining me today, and keep practicing your English every single day!",
        "translationVi": "Tôi hy vọng bạn đã có một khoảng thời gian học tập tuyệt vời hôm nay! Đừng quên bấm nút thích phía dưới để chúng tôi biết bạn muốn có thêm nhiều bài học như thế này nhé. Cảm ơn bạn đã tham gia cùng tôi hôm nay, và hãy tiếp tục luyện tập tiếng Anh mỗi ngày!",
        "ipaUs": "/aɪ hoʊp juː ɛnˈdʒɔɪd təˈdeɪz ˈlɛsən! doʊnt fərˈɡɛt tuː ɡɪv ʌs ə θʌmz ʌp daʊn bɪˈloʊ soʊ ðæt wiː noʊ juː wɑːnt mɔːr ˈkɑːntɛnt laɪk ðɪs. θæŋks fɔːr ˈdʒɔɪnɪŋ miː təˈdeɪ, ænd kiːp ˈpræktəsɪŋ jʊər ˈɪŋɡlɪʃ ˈɛvri ˈsɪŋɡəl deɪ!/",
        "keywords": ["thumbs up", "joining me", "keep practicing", "every single day"],
        "explanationAi": "Lời kết truyền cảm hứng học tập bền bỉ: Thói quen luyện tập hàng ngày ('every single day') là con đường chân thực nhất dẫn đến sự lưu loát ngôn ngữ.",
        "properNouns": []
    }
]

# Tính tokenCount chuẩn xác qua regex \b[A-Za-z0-9_]+\b
for s in raw_segments:
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", s["text"])
    s["tokenCount"] = len(tokens)

print(f"Total Master Segments: {len(raw_segments)}")
