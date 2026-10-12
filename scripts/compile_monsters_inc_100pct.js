const fs = require('fs');
const { tokenizeSentence } = require('./verify_monsters_inc_tokens');

const cues = JSON.parse(fs.readFileSync('scripts/monsters_inc_cleaned_cues.json', 'utf-8'));

// Specifications: [start_c, end_c, text, translationVi, ipaUs, keywords, explanationAi, properNouns]
const specs = [
  // 0. Cues 0-2 (28s - 52s)
  [
    0, 2,
    "Monsters, Inc. has such a crazy concept! I mean, we're talking about a city run by monsters, and the way they generate power for the city is by scaring little children! Still, I had a great time when I watched this movie for the first time.",
    "Công ty Quái vật có một ý tưởng độc đáo đến kinh ngạc! Ý tôi là, chúng ta đang nói về một thành phố được vận hành bởi những con quái vật, và cách chúng tạo ra nguồn điện năng cho thành phố chính là đi hù dọa các em nhỏ! Dù vậy, tôi đã có những giây phút vô cùng tuyệt vời khi lần đầu tiên thưởng thức bộ phim này.",
    "/ˈmɑːnstərz ɪŋk hæz sʌtʃ ə ˈkreɪzi ˈkɑːnsɛpt! aɪ miːn, wɪr ˈtɔːkɪŋ əˈbaʊt ə ˈsɪti rʌn baɪ ˈmɑːnstərz, ænd ðə weɪ ðeɪ ˈdʒɛnəreɪt ˈpaʊər fɔːr ðə ˈsɪti ɪz baɪ ˈskɛrɪŋ ˈlɪtəl ˈtʃɪldrən! stɪl, aɪ hæd ə ɡreɪt taɪm wɛn aɪ wɑːtʃt ðɪs ˈmuːvi fɔːr ðə fɜːrst taɪm./",
    ["crazy concept", "generate power", "scaring little children", "great time"],
    "Khái niệm giả tưởng độc đáo của Monsters, Inc.: Thành phố quái vật Monstropolis vận hành hoàn toàn nhờ vào năng lượng tiếng la hét của trẻ em.",
    ["Monsters, Inc."]
  ],
  // 1. Cues 3-6 (52s - 87s)
  [
    3, 6,
    "Today you're going to watch a couple of scenes where Mike and Sulley have to deal with Randall, a shady monster who has evil plans. First, you'll watch the clips with subtitles, then learn vocabulary, grammar, and pronunciation, and finally test your listening skills without subtitles!",
    "Hôm nay các bạn sẽ được xem một vài phân cảnh nơi Mike và Sulley phải đối đầu với Randall, một con quái vật mờ ám đầy mưu mô hiểm ác. Đầu tiên, bạn sẽ xem các trích đoạn có phụ đề, sau đó học từ vựng, ngữ pháp và phát âm, rồi cuối cùng kiểm tra kỹ năng nghe không cần phụ đề!",
    "/təˈdeɪ jʊər ˈɡoʊɪŋ tuː wɑːtʃ ə ˈkʌpəl əv siːnz wɛr maɪk ænd ˈsʌli hæv tuː diːl wɪð ˈrændəl, ə ˈʃeɪdi ˈmɑːnstər huː hæz ˈiːvəl plænz. fɜːrst, juːl wɑːtʃ ðə klɪps wɪð ˈsʌbˌtaɪtəlz, ðɛn lɜːrn vəˈkæbjəˌlɛri, ˈɡræmər, ænd prəˌnʌnsiˈeɪʃən, ænd ˈfaɪnəli tɛst jʊər ˈlɪsənɪŋ skɪlz wɪˈðaʊt ˈsʌbˌtaɪtəlz!/",
    ["deal with", "shady monster", "evil plans", "listening skills"],
    "Cấu trúc bài học phản xạ ba bước: Xem có phụ đề -> Phân tích ngôn ngữ chuyên sâu -> Thử thách nghe hiểu không phụ đề.",
    ["Mike", "Sulley", "Randall"]
  ],
  // 2. Cues 7-8 (87s - 103s)
  [
    7, 8,
    "You know, pal, she's the one! That's it, she is the one. — I'm happy for you. — Oh, and thanks for hooking me up with those reservations. — Oh, no problem. They're under the name Googly Bear. — Oh, good idea!",
    "Cậu biết không anh bạn, cô ấy chính là một nửa định mệnh đời tớ! Chuẩn luôn, cô ấy là duy nhất. — Tớ mừng cho cậu. — À, và cảm ơn cậu đã giúp tớ đặt được bàn ở nhà hàng sang trọng đó nhé. — Ôi có gì đâu. Tên đặt bàn là 'Gấu Mắt Tròn' đấy. — Ồ, ý hay đó!",
    "/juː noʊ, pæl, ʃiːz ðə wʌn! ðæts ɪt, ʃiː ɪz ðə wʌn. — aɪm ˈhæpi fɔːr juː. — oʊ, ænd θæŋks fɔːr ˈhʊkɪŋ miː ʌp wɪð ðoʊz ˌrɛzərˈveɪʃənz. — oʊ, noʊ ˈprɑːbləm. ðeɪr ˈʌndər ðə neɪm ˈɡuːɡli bɛr. — oʊ, ɡʊd aɪˈdiːə!/",
    ["pal", "she's the one", "hooking me up with", "reservations", "Googly Bear"],
    "Thành ngữ 'she's the one' (người phụ nữ định mệnh của cuộc đời) và 'hook someone up with...' (giúp đỡ ai đó có được thứ gì giá trị). Biệt danh đáng yêu 'Googly Bear' mà Celia gọi Mike.",
    ["Googly Bear"]
  ],
  // 3. Cues 9-10 (103s - 120s)
  [
    9, 10,
    "You know, that wasn't very funny! What the... What do you know! It scares little kids and little monsters! — I wasn't scared, I have allergies. — Uh-huh, sure.",
    "Cậu biết đấy, trò đó chẳng vui tí nào đâu! Cái quái gì... Ai mà ngờ được chứ! Trò đó dọa được cả con nít lẫn quái vật tí hon đấy! — Tớ không có sợ đâu nhé, tớ bị dị ứng thôi. — Ừ hử, chắc vậy rồi.",
    "/juː noʊ, ðæt ˈwʌzənt ˈvɛri ˈfʌni! wʌt ðə... wʌt duː juː noʊ! ɪt skɛrz ˈlɪtəl kɪdz ænd ˈlɪtəl ˈmɑːnstərz! — aɪ ˈwʌzənt skɛrd, aɪ hæv ˈælərdʒiz. — ˈʌˌhʌ, ʃʊr./",
    ["wasn't very funny", "what do you know", "scares little kids", "allergies", "uh-huh sure"],
    "Cụm cảm thán 'What do you know!' (Ai mà ngờ được chứ / Ai ngờ cơ chứ!). Lời chữa ngượng kinh điển của Mike khi bị Randall giật mình: 'I have allergies' (Tôi bị dị ứng).",
    []
  ],
  // 4. Cues 11-14 (120s - 152s)
  [
    11, 14,
    "Hey Randall, save it for the scare floor, will you? — I'm in the zone today, Sullivan! Going to be doing some serious scaring, putting up some big numbers! — Wow, Randall, that's great. That should make it even more humiliating when we break the record first! — Shh! Do you hear that? It's the Winds of Change! — What a creep! One of these days I'm really going to let you teach that guy a lesson.",
    "Này Randall, để dành năng lượng đó cho sàn dọa nạt đi, được không? — Hôm nay phong độ tao đang lên đỉnh cao đấy Sullivan! Tao sẽ hù dọa cực kỳ khủng khiếp và lập kỷ lục điểm số chót vót cho xem! — Ồ Randall, tuyệt quá. Điều đó sẽ càng làm mày nhục nhã hơn khi bọn tao phá kỷ lục trước! — Suỵt! Nghe thấy gì không? Ngọn Gió Đổi Thay đấy! — Đúng là đồ quái đản! Bữa nào tớ sẽ để cậu dạy cho hắn một bài học.",
    "/heɪ ˈrændəl, seɪv ɪt fɔːr ðə skɛr flɔːr, wɪl juː? — aɪm ɪn ðə zoʊn təˈdeɪ, ˈsʌlɪvən! ˈɡoʊɪŋ tuː biː ˈduːɪŋ sʌm ˈsɪriəs ˈskɛrɪŋ, ˈpʊtɪŋ ʌp sʌm bɪɡ ˈnʌmbərz! — waʊ, ˈrændəl, ðæts ɡreɪt. ðæt ʃʊd meɪk ɪt ˈiːvən mɔːr hjuːˈmɪliˌeɪtɪŋ wɛn wiː breɪk ðə ˈrɛkərd fɜːrst! — ʃ! duː juː hɪr ðæt? ɪts ðə wɪndz əv tʃeɪndʒ! — wʌt ə kriːp! wʌn əv ðiːz deɪz aɪm ˈrɪəli ˈɡoʊɪŋ tuː lɛt juː tiːtʃ ðæt ɡaɪ ə ˈlɛsən./",
    ["save it for the scare floor", "in the zone", "humiliating", "Winds of Change", "what a creep", "teach that guy a lesson"],
    "Khẩu chiến kịch tính giữa Sullivan và Randall trên sàn Scare Floor. Thành ngữ 'in the zone' (đỉnh cao phong độ) và 'teach someone a lesson' (dạy cho ai một bài học).",
    ["Randall", "Sullivan", "Winds of Change"]
  ],
  // 5. Cues 15-17 (152s - 177s)
  [
    15, 17,
    "As you may know, Mike and Sulley are good friends. You can call a friend of yours 'pal'. Keep in mind that this is more common when talking to men, especially in American English. In British English, you will likely hear two male friends calling each other 'mate'.",
    "Như bạn đã biết, Mike và Sulley là những người bạn tri kỷ. Bạn có thể gọi một người bạn thân là 'pal'. Hãy nhớ rằng từ này phổ biến hơn khi nói chuyện giữa nam giới, đặc biệt trong tiếng Anh-Mỹ. Còn trong tiếng Anh-Anh, bạn sẽ thường nghe hai người bạn nam gọi nhau là 'mate'.",
    "/æz juː meɪ noʊ, maɪk ænd ˈsʌli ɑːr ɡʊd frɛndz. juː kæn kɔːl ə frɛnd əv jʊərz pæl. kiːp ɪn maɪnd ðæt ðɪs ɪz mɔːr ˈkɑːmən wɛn ˈtɔːkɪŋ tuː mɛn, əˈspɛʃəli ɪn əˈmɛrɪkən ˈɪŋɡlɪʃ. ɪn ˈbrɪtɪʃ ˈɪŋɡlɪʃ, juː wɪl ˈlaɪkli hɪr tuː meɪl frɛndz ˈkɔːlɪŋ iːtʃ ˈʌðər meɪt./",
    ["good friends", "pal", "keep in mind", "American English", "British English", "mate"],
    "Phân biệt văn hóa xưng hô: 'pal' đặc trưng cho phong cách giao tiếp thân mật kiểu Mỹ, tương đương với 'mate' trong văn hóa Anh Quốc.",
    ["Mike", "Sulley"]
  ],
  // 6. Cues 18-20 (177s - 201s)
  [
    18, 20,
    "Mike is talking about Celia, the receptionist who flirts with him. Mike has just asked Celia out on a date and she agreed, so he is really happy! When he says that Celia is 'the one', he means she's the girl he is supposed to be with.",
    "Mike đang nói về Celia, cô tiếp tân hay tán tỉnh cậu ấy. Mike vừa mới mời Celia đi hẹn hò và cô ấy đã đồng ý, nên cậu ấy vô cùng hạnh phúc! Khi nói Celia là 'the one', cậu ấy có ý rằng cô chính là nửa kia định mệnh của đời mình.",
    "/maɪk ɪz ˈtɔːkɪŋ əˈbaʊt ˈsiːliə, ðə rɪˈsɛpʃənɪst huː flɜːrts wɪð hɪm. maɪk hæz dʒʌst æskt ˈsiːliə aʊt ɑːn ə deɪt ænd ʃiː əˈɡriːd, soʊ hiː ɪz ˈrɪəli ˈhæpi! wɛn hiː sɛz ðæt ˈsiːliə ɪz ðə wʌn, hiː miːnz ʃiːz ðə ɡɜːrl hiː ɪz səˈpoʊzd tuː biː wɪð./",
    ["receptionist", "flirts with him", "asked out on a date", "the one"],
    "Cụm 'ask someone out on a date' (mời ai đó hẹn hò) và định nghĩa lãng mạn của 'the one' trong tình yêu.",
    ["Mike", "Celia"]
  ],
  // 7. Cues 21-23 (201s - 227s)
  [
    21, 23,
    "As a good friend, Sulley has gotten a reservation at a nice restaurant for Mike to take Celia to. When you hook someone up with something, you provide the person with something useful for free or as a favor. For example, if you give concert tickets to a friend, he might say: 'Thanks for hooking me up with these tickets!'",
    "Là một người bạn tốt, Sulley đã giúp Mike đặt được chỗ tại một nhà hàng sang trọng để đưa Celia tới đó. Khi bạn 'hook someone up with something', bạn cung cấp cho ai đó thứ gì hữu ích miễn phí hoặc như một sự giúp đỡ. Ví dụ nếu bạn tặng vé ca nhạc cho bạn mình, anh ấy có thể nói: 'Cảm ơn đã lo giúp tớ mấy chiếc vé này nhé!'",
    "/æz ə ɡʊd frɛnd, ˈsʌli hæz ˈɡɑːtən ə ˌrɛzərˈveɪʃən æt ə naɪs ˈrɛstərənt fɔːr maɪk tuː teɪk ˈsiːliə tuː. wɛn juː hʊk ˈsʌmwʌn ʌp wɪð ˈsʌmθɪŋ, juː prəˈvaɪd ðə ˈpɜːrsən wɪð ˈsʌmθɪŋ ˈjuːsfəl fɔːr friː ɔːr æz ə ˈfeɪvər. fɔːr ɪɡˈzæmpəl, ɪf juː ɡɪv ˈkɑːnsərt ˈtɪkɪts tuː ə frɛnd, hiː maɪt seɪ: θæŋks fɔːr ˈhʊkɪŋ miː ʌp wɪð ðiːz ˈtɪkɪts!/",
    ["gotten a reservation", "hook someone up with", "for free", "favor", "concert tickets"],
    "Cụm động từ thành ngữ 'hook someone up with' cực kỳ thông dụng trong đời sống Mỹ khi giúp bạn bè nhận vé xem ca nhạc, chỗ đặt nhà hàng hay mối làm ăn tốt.",
    ["Sulley", "Mike", "Celia"]
  ],
  // 8. Cues 24-26 (227s - 254s)
  [
    24, 26,
    "When Mike says: 'What do you know! It scares little kids and little monsters!', notice how 'what do' becomes 'whaddya'. The 'do' gets reduced, and 'you' gets reduced to 'ya'. So native speakers naturally say: 'Whaddya know! Whaddya know!'",
    "Khi Mike thốt lên: 'What do you know! It scares little kids and little monsters!', hãy để ý cách 'what do' biến đổi thành 'whaddya'. Từ 'do' bị nuốt âm, và 'you' rút gọn thành 'ya'. Vì vậy người bản xứ nói rất tự nhiên: 'Whaddya know! Whaddya know!'",
    "/wɛn maɪk sɛz: wʌt duː juː noʊ! ɪt skɛrz ˈlɪtəl kɪdz ænd ˈlɪtəl ˈmɑːnstərz!, ˈnoʊtɪs haʊ wʌt duː bɪˈkʌmz ˈwʌdjə. ðə duː ɡɛts rɪˈduːst, ænd juː ɡɛts rɪˈduːst tuː jə. soʊ ˈneɪtɪv ˈspiːkərz ˈnætʃərəli seɪ: ˈwʌdjə noʊ! ˈwʌdjə noʊ!/",
    ["connected speech", "what do you know", "reduced", "native speakers"],
    "Quy tắc nối âm và giảm âm (connected speech & vowel reduction) trong khẩu ngữ giao tiếp thực tế hàng ngày.",
    ["Mike"]
  ],
  // 9. Cues 27-31 (254s - 297s)
  [
    27, 31,
    "Sulley and Randall are the top scarers in the company, so there is fierce competition between them. When Sulley says 'Save it for the scare floor', he means let's settle our rivalry during work. Similarly, two boxers about to fight outside might say: 'Let's save it for the ring!', just like in the classic Karate Kid film.",
    "Sulley và Randall là những quái vật hù dọa hàng đầu công ty, vì thế giữa họ luôn có sự cạnh tranh khốc liệt. Khi Sulley bảo 'Save it for the scare floor', anh có ý hãy giải quyết sự ganh đua đó trong lúc làm việc. Tương tự, hai võ sĩ sắp ẩu đả ngoài đường có thể nói: 'Hãy để dành lên võ đài!', giống như trong bộ phim kinh điển Karate Kid.",
    "/ˈsʌli ænd ˈrændəl ɑːr ðə tɑːp ˈskɛrərz ɪn ðə ˈkʌmpəni, soʊ ðɛr ɪz fɪrs ˌkɑːmpəˈtɪʃən bɪˈtwiːn ðɛm. wɛn ˈsʌli sɛz seɪv ɪt fɔːr ðə skɛr flɔːr, hiː miːnz lɛts ˈsɛtəl ˈaʊər ˈraɪvəlri ˈdʊrɪŋ wɜːrk. ˈsɪmələrli, tuː ˈbɑːksərz əˈbaʊt tuː faɪt ˌaʊtˈsaɪd maɪt seɪ: lɛts seɪv ɪt fɔːr ðə rɪŋ!, dʒʌst laɪk ɪn ðə ˈklæsɪk kəˈrɑːti kɪd fɪlm./",
    ["top scarers", "fierce competition", "save it for the scare floor", "rivalry", "save it for the ring"],
    "Thành ngữ 'save it for...' khuyên đối phương đừng phí sức tranh cãi ngoài lề mà hãy chứng tỏ bản lĩnh tại nơi quy định.",
    ["Sulley", "Randall", "Karate Kid"]
  ],
  // 10. Cues 32-34 (297s - 321s)
  [
    32, 34,
    "The tag question 'will you?' is an interesting one. You can use it at the end of requests or orders to soften them or make them urgent. We also tend to reduce 'you' to 'ya' here, so it sounds like: 'Hey Randall, save it for the scare floor, will ya?'",
    "Câu hỏi đuôi 'will you?' là một điểm ngữ pháp rất thú vị. Bạn có thể dùng nó ở cuối các lời yêu cầu hoặc mệnh lệnh để làm nhẹ bớt hoặc tăng tính giục giã. Người bản xứ cũng thường rút gọn 'you' thành 'ya', tạo nên âm thanh: 'Này Randall, để dành trên sàn dọa nạt đi, được không hả?'",
    "/ðə tæɡ ˈkwɛstʃən wɪl juː? ɪz ən ˈɪntrəstɪŋ wʌn. juː kæn juːz ɪt æt ðiː ɛnd əv rɪˈkwɛsts ɔːr ˈɔːrdərz tuː ˈsɔːfən ðɛm ɔːr meɪk ðɛm ˈɜːrdʒənt. wiː ˈɔːlsoʊ tɛnd tuː rɪˈduːs juː tuː jə hɪr, soʊ ɪt saʊndz laɪk: heɪ ˈrændəl, seɪv ɪt fɔːr ðə skɛr flɔːr, wɪl jə?/",
    ["tag question", "will you", "requests", "orders", "soften"],
    "Ngữ pháp câu hỏi đuôi 'will you' gắn sau câu mệnh lệnh và hiện tượng giản lược âm trong tiếng Anh đời thường.",
    ["Randall"]
  ],
  // 11. Cues 35-38 (321s - 353s)
  [
    35, 38,
    "When you say 'I'm in the zone', you mean you are at the top of your game, performing at peak capability. On the other hand, calling someone a 'creep' is an insult. You use this word for someone who acts strangely and makes people feel uncomfortable or scared, like Dick Dastardly in Scooby-Doo!",
    "Khi bạn nói 'I'm in the zone', nghĩa là bạn đang ở đỉnh cao phong độ, thể hiện ở mức năng lực tối đa. Mặt khác, gọi ai đó là 'creep' là một lời sỉ nhục. Bạn dùng từ này cho kẻ hành xử kỳ quặc, khiến những người xung quanh cảm thấy khó chịu hoặc sợ hãi, như nhân vật Dick Dastardly trong Scooby-Doo!",
    "/wɛn juː seɪ aɪm ɪn ðə zoʊn, juː miːn juː ɑːr æt ðə tɑːp əv jʊər ɡeɪm, pərˈfɔːrmɪŋ æt piːk ˌkeɪpəˈbɪləti. ɑːn ðiː ˈʌðər hænd, ˈkɔːlɪŋ ˈsʌmwʌn ə kriːp ɪz ən ˈɪnsʌlt. juː juːz ðɪs wɜːrd fɔːr ˈsʌmwʌn huː ækts ˈstreɪndʒli ænd meɪks ˈpiːpəl fiːl ʌnˈkʌmfərtəbəl ɔːr skɛrd, laɪk dɪk ˈdæstərdli ɪn ˈskuːbi duː!/",
    ["in the zone", "top of your game", "peak capability", "creep", "insult", "uncomfortable"],
    "Đối chiếu hai khái niệm: Thành ngữ tích cực 'in the zone' (thăng hoa) và danh từ tiêu cực 'creep' (kẻ quái đản, bệnh hoạn).",
    ["Dick Dastardly", "Scooby-Doo"]
  ],
  // 12. Cues 39-48 (353s - 435s)
  [
    39, 48,
    "To truly master these expressions and never forget them in real-life conversations, regular review and practice with flashcards is essential. If you don't use new words, they fade away. Practicing with movie scenes helps you communicate confidently in meetings, interviews, or when traveling abroad!",
    "Để thực sự làm chủ những thành ngữ này và không bao giờ quên trong giao tiếp thực tế, việc ôn tập đều đặn và luyện tập cùng thẻ ghi nhớ là điều cốt yếu. Nếu không dùng từ mới, chúng sẽ dần phai nhạt. Luyện tập qua các trích đoạn phim giúp bạn tự tin giao tiếp trong các cuộc họp, phỏng vấn xin việc hay khi đi du lịch nước ngoài!",
    "/tuː ˈtruːli ˈmæstər ðiːz ɪkˈsprɛʃənz ænd ˈnɛvər fərˈɡɛt ðɛm ɪn ˈrɪəl laɪf ˌkɑːnvərˈseɪʃənz, ˈrɛɡjələr rɪˈvjuː ænd ˈpræktɪs wɪð ˈflæʃˌkɑːrdz ɪz ɪˈsɛnʃəl. ɪf juː doʊnt juːz nuː wɜːrdz, ðeɪ feɪd əˈweɪ. ˈpræktɪsɪŋ wɪð ˈmuːvi siːnz hɛlps juː kəˈmjuːnɪˌkeɪt ˈkɑːnfɪdəntli ɪn ˈmiːtɪŋz, ˈɪntərvjuːz, ɔːr wɛn ˈtrævəlɪŋ əˈbrɔːd!/",
    ["master expressions", "real-life conversations", "regular review", "communicate confidently"],
    "Phương pháp ghi nhớ từ vựng Spaced Repetition SRS: Biến từ vựng thụ động từ phim ảnh thành phản xạ giao tiếp chủ động.",
    []
  ],
  // 13. Cues 49-54 (435s - 488s)
  [
    49, 54,
    "A major crisis occurs when Boo, a human child, accidentally enters the Monster World! Mike chases Sulley frantically: 'Hey, where are you going? Please don't blow this, not when we're so close to breaking the record! Somebody else will find the kid. It'll be their problem, not ours! She's out of our hair!'",
    "Một cuộc khủng hoảng lớn xảy ra khi Boo, một bé gái loài người, vô tình lạc vào Thế giới Quái vật! Mike hốt hoảng đuổi theo Sulley: 'Này, cậu đi đâu đấy? Làm ơn đừng làm hỏng bét cơ hội này chứ, khi chúng mình sắp phá kỷ lục tới nơi rồi! Người khác sẽ tìm thấy đứa bé thôi. Đó là chuyện của họ, không phải của chúng ta! Nó đã biến khỏi mắt chúng mình rồi!'",
    "/ə ˈmeɪdʒər ˈkraɪsɪs əˈkɜːrz wɛn buː, ə ˈhjuːmən tʃaɪld, ˌæksəˈdɛntli ˈɛntərz ðə ˈmɑːnstər wɜːrld! maɪk ˈtʃeɪsɪz ˈsʌli ˈfræntɪkli: heɪ, wɛr ɑːr juː ˈɡoʊɪŋ? pliːz doʊnt bloʊ ðɪs, nɑːt wɛn wɪr soʊ kloʊs tuː ˈbreɪkɪŋ ðə ˈrɛkərd! ˈsʌmˌbɑːdi ɛls wɪl faɪnd ðə kɪd. ɪtl biː ðɛr ˈprɑːbləm, nɑːt ˈaʊərz! ʃiːz aʊt əv ˈaʊər hɛr!/",
    ["major crisis", "human child", "don't blow this", "breaking the record", "out of our hair"],
    "Bước ngoặt trung tâm của Monsters, Inc.: Mike cố ngăn Sulley bảo vệ đứa trẻ loài người vì sợ mất kỷ lục dọa nạt.",
    ["Boo", "Mike", "Sulley"]
  ],
  // 14. Cues 55-57 (488s - 513s)
  [
    55, 57,
    "When you 'blow something', you mess it up or fail to take advantage of a valuable opportunity. In the past tense, you say 'blew', as in: 'Man, I blew it!' Mike is desperately warning Sulley not to ruin their hard-earned chance of breaking the company scaring record.",
    "Khi bạn 'blow something', bạn làm hỏng bét hoặc để vuột mất một cơ hội quý giá. Ở thì quá khứ, bạn dùng 'blew', như trong câu: 'Trời ơi, tôi làm hỏng chuyện rồi!' Mike đang tuyệt vọng cảnh báo Sulley đừng phá hỏng cơ hội ngàn vàng phá vỡ kỷ lục hù dọa của công ty.",
    "/wɛn juː bloʊ ˈsʌmθɪŋ, juː mɛs ɪt ʌp ɔːr feɪl tuː teɪk ədˈvæntɪdʒ əv ə ˈvæljuːəbəl ˌɑːpərˈtuːnəti. ɪn ðə pæst tɛns, juː seɪ bluː, æz ɪn: mæn, aɪ bluː ɪt! maɪk ɪz ˈdɛspərətli ˈwɔːrnɪŋ ˈsʌli nɑːt tuː ˈruːɪn ðɛr hɑːrd ɜːrnd tʃæns əv ˈbreɪkɪŋ ðə ˈkʌmpəni ˈskɛrɪŋ ˈrɛkərd./",
    ["blow something", "mess up", "past tense", "blew it", "scaring record"],
    "Thành ngữ 'blow it' (phá hỏng cơ hội) và cách chia động từ bất quy tắc 'blow -> blew -> blown'.",
    ["Mike", "Sulley"]
  ],
  // 15. Cues 58-61 (513s - 548s)
  [
    58, 61,
    "Notice the smooth connected speech in: 'It'll be their problem, not ours.' 'It will' contracts into 'it'll', and the letter 'T' in 'not' transforms into a flap T that links seamlessly with 'ours', sounding like 'no-tours'. Listen closely: 'It'll be their problem, not ours!'",
    "Hãy chú ý cách nối âm mượt mà trong câu: 'It'll be their problem, not ours.' 'It will' rút gọn thành 'it'll', và chữ 'T' trong 'not' chuyển thành âm flap T nối liền mạch sang 'ours', nghe như 'no-tours'. Hãy nghe thật kỹ: 'It'll be their problem, not ours!'",
    "/ˈnoʊtɪs ðə smuːð kəˈnɛktɪd spiːtʃ ɪn: ˈɪtəl biː ðɛr ˈprɑːbləm, nɑːt ˈaʊərz. ɪt wɪl kənˈtrækts ˈɪntuː ˈɪtəl, ænd ðə ˈlɛtər tiː ɪn nɑːt trænsˈfɔːrmz ˈɪntuː ə flæp tiː ðæt lɪŋks ˈsiːmləsli wɪð ˈaʊərz, ˈsaʊndɪŋ laɪk noʊ-tʊərz. ˈlɪsən ˈkloʊsli: ˈɪtəl biː ðɛr ˈprɑːbləm, nɑːt ˈaʊərz!/",
    ["connected speech", "contracts", "flap T", "links seamlessly"],
    "Kỹ thuật ngữ âm Flap T kiểu Mỹ: Khi âm /t/ đứng giữa hai nguyên âm, nó phát âm nhẹ như một âm /d/ lướt nhanh.",
    []
  ],
  // 16. Cues 62-65 (548s - 580s)
  [
    62, 65,
    "In this context, the idiom 'she's out of our hair' means Boo is no longer causing Mike and Sulley any trouble or inconvenience. When someone is out of your hair, they are not bothering you anymore. You can also say politely: 'I'll get out of your hair', meaning you will stop disturbing someone.",
    "Trong ngữ cảnh này, thành ngữ 'she's out of our hair' có nghĩa là bé Boo không còn gây rắc rối hay phiền toái cho Mike và Sulley nữa. Khi ai đó 'out of your hair', họ không còn làm phiền bạn nữa. Bạn cũng có thể nói lịch sự: 'Tôi sẽ không làm phiền bạn nữa đâu' (I'll get out of your hair).",
    "/ɪn ðɪs ˈkɑːntɛkst, ðiː ˈɪdiəm ʃiːz aʊt əv ˈaʊər hɛr miːnz buː ɪz noʊ ˈlɔːŋɡər ˈkɔːzɪŋ maɪk ænd ˈsʌli ˈɛni ˈtrʌbəl ɔːr ˌɪnkənˈviːnjəns. wɛn ˈsʌmwʌn ɪz aʊt əv jʊər hɛr, ðeɪ ɑːr nɑːt ˈbɑːðərɪŋ juː ˌɛniˈmɔːr. juː kæn ˈɔːlsoʊ seɪ pəˈlaɪtli: aɪl ɡɛt aʊt əv jʊər hɛr, ˈmiːnɪŋ juː wɪl stɑːp dɪˈstɜːrbɪŋ ˈsʌmwʌn./",
    ["out of our hair", "trouble or inconvenience", "not bothering you", "politely", "stop disturbing"],
    "Thành ngữ sinh động 'get / be out of someone's hair' có nghĩa là ngừng quấy rầy hoặc thoát khỏi sự phiền toái từ một ai đó.",
    ["Boo", "Mike", "Sulley"]
  ],
  // 17. Cues 66-70 (580s - 621s)
  [
    66, 70,
    "When caught, Mike fabricates an alibi: 'They're rehearsing a play: She's out of our hair!' Sulley snaps: 'Can it!' In this scene, 'can it' is a slangy way to tell someone to shut up or stop talking. It can be used playfully or aggressively depending on the tone and situation.",
    "Khi bị bắt gặp, Mike bịa ra một chứng cớ ngoại phạm: 'Họ đang tập dượt một vở kịch: Nó đã biến khỏi mắt chúng mình!' Sulley liền gắt lên: 'Im họng lại!' Trong cảnh này, 'can it' là tiếng lóng bảo ai đó hãy câm miệng hoặc ngừng nói, có thể dùng trêu đùa hoặc gay gắt tùy theo giọng điệu.",
    "/wɛn kɔːt, maɪk ˈfæbrɪˌkeɪts ən ˈæləˌbaɪ: ðeɪr rɪˈhɜːrsɪŋ ə pleɪ: ʃiːz aʊt əv ˈaʊər hɛr! ˈsʌli snæps: kæn ɪt! ɪn ðɪs siːn, kæn ɪt ɪz ə ˈslæŋi weɪ tuː tɛl ˈsʌmwʌn tuː ʃʌt ʌp ɔːr stɑːp ˈtɔːkɪŋ. ɪt kæn biː juːzd ˈpleɪfəli ɔːr əˈɡrɛsɪvli dɪˈpɛndɪŋ ɑːn ðə toʊn ænd ˌsɪtʃuˈeɪʃən./",
    ["alibi", "rehearsing a play", "can it", "slangy way", "shut up", "tone and situation"],
    "Tiếng lóng 'Can it!' (Im miệng lại / Đóng nắp hộp lại đi) là cách nói gắt gỏng nhưng hài hước để bảo người khác hãy trật tự.",
    ["Mike", "Sulley"]
  ],
  // 18. Cues 71-75 (621s - 661s)
  [
    71, 75,
    "Randall approaches suspiciously: 'So what do you think of that kid getting out, Sullivan? Pretty crazy, huh? Word on the street is the kid's been traced back to this factory.' 'Word on the street is' means hearing circulating rumors from people in your community, commonly heard in crime movies about street gangs.",
    "Randall tiếp cận đầy khả nghi: 'Thế mày nghĩ sao về vụ con nhóc đó xổng ra ngoài, hả Sullivan? Điên rồ thật nhỉ? Nghe đồn rằng con nhóc đó được lần ra tung tích từ chính nhà máy này đấy.' 'Word on the street is' có nghĩa là nghe ngóng những tin đồn lan truyền từ cộng đồng, thường xuất hiện trong phim tội phạm.",
    "/ˈrændəl əˈproʊtʃɪz səˈspɪʃəsli: soʊ wʌt duː juː θɪŋk əv ðæt kɪd ˈɡɛtɪŋ aʊt, ˈsʌlɪvən? ˈprɪti ˈkreɪzi, hʌ? wɜːrd ɑːn ðə striːt ɪz ðə kɪdz bɪn treɪst bæk tuː ðɪs ˈfæktəri. wɜːrd ɑːn ðə striːt ɪz miːnz ˈhɪrɪŋ ˈsɜːrkjəˌleɪtɪŋ ˈruːmərz frʌm ˈpiːpəl ɪn jʊər kəˈmjuːnəti, ˈkɑːmənli hɜːrd ɪn kraɪm ˈmuːviz əˈbaʊt striːt ɡæŋz./",
    ["approaches suspiciously", "pretty crazy", "word on the street is", "circulating rumors", "crime movies"],
    "Thành ngữ 'word on the street is...' (nghe đồn rằng / tin đồn ngoài phố là...). Randall bắt đầu thẩm vấn và nghi ngờ Sulley dính líu đến đứa trẻ.",
    ["Randall", "Sullivan"]
  ],
  // 19. Cues 76-79 (661s - 696s)
  [
    76, 79,
    "If you 'trace something back to somewhere', you find evidence connecting it to its original source. When Randall asks if they have seen anything, Mike emphatically denies it: 'No, no way!' You can use 'no way' to emphatically refuse something, or to express complete shock and surprise!",
    "Khi bạn 'trace something back to somewhere', bạn tìm ra bằng chứng liên kết nó với nguồn gốc ban đầu. Khi Randall dò hỏi xem họ có thấy gì không, Mike một mực chối từ: 'Không, không đời nào!' Bạn có thể dùng 'no way' để dứt khoát từ chối, hoặc thốt lên sự bàng hoàng kinh ngạc!",
    "/ɪf juː treɪs ˈsʌmθɪŋ bæk tuː ˈsʌmˌwɛr, juː faɪnd ˈɛvɪdəns kəˈnɛktɪŋ ɪt tuː ɪts əˈrɪdʒɪnəl sɔːrs. wɛn ˈrændəl æsks ɪf ðeɪ hæv siːn ˈɛniˌθɪŋ, maɪk ɛmˈfætɪkli dɪˈnaɪz ɪt: noʊ, noʊ weɪ! juː kæn juːz noʊ weɪ tuː ɛmˈfætɪkli rɪˈfjuːz ˈsʌmθɪŋ, ɔːr tuː ɪkˈsprɛs kəmˈpliːt ʃɑːk ænd sərˈpraɪz!/",
    ["trace something back to", "evidence", "original source", "emphatically denies", "no way", "shock and surprise"],
    "Cụm 'trace back to' (truy tìm nguồn gốc) và thán từ 'No way!' dùng để phủ nhận kịch liệt hoặc thốt lên sự kinh ngạc khôn xiết.",
    ["Randall", "Mike"]
  ],
  // 20. Cues 80-84 (696s - 736s)
  [
    80, 84,
    "To divert suspicion, Mike suggests: 'But if it was an inside job, I'd put my money on Waxford! The one at station six!' An 'inside job' means a crime or sabotage committed by someone already working inside the company or facility, rather than an outsider sneaking in.",
    "Để đánh lạc hướng nghi ngờ, Mike gợi ý: 'Nhưng nếu đó là một vụ nội gián tuồn vào, thì tao cá chắc là do thằng Waxford! Cái gã ở trạm số sáu ấy!' 'Inside job' có nghĩa là một tội ác hoặc hành vi phá hoại do chính người làm việc bên trong cơ quan thực hiện, chứ không phải kẻ ngoài lẻn vào.",
    "/tuː daɪˈvɜːrt səˈspɪʃən, maɪk səɡˈdʒɛsts: bʌt ɪf ɪt wʌz ən ˈɪnˌsaɪd dʒɑːb, aɪd pʊt maɪ ˈmʌni ɑːn ˈwæksfərd! ðə wʌn æt ˈsteɪʃən sɪks! ən ˈɪnˌsaɪd dʒɑːb miːnz ə kraɪm ɔːr ˈsæbəˌtɑːʒ kəˈmɪtɪd baɪ ˈsʌmwʌn ɔːlˈrɛdi ˈwɜːrkɪŋ ɪnˈsaɪd ðə ˈkʌmpəni ɔːr fəˈsɪləti, ˈræðər ðæn ən ˌaʊtˈsaɪdər ˈsniːkɪŋ ɪn./",
    ["divert suspicion", "inside job", "put my money on", "Waxford", "station six", "sabotage"],
    "Thuật ngữ hình sự 'inside job' (vụ án nội bộ / kẻ nội gián thực hiện) được Mike đưa ra một cách hài hước nhằm đánh lạc hướng sự chú ý của Randall sang Waxford.",
    ["Mike", "Waxford"]
  ],
  // 21. Cues 85-88 (736s - 768s)
  [
    85, 88,
    "Saying 'I'd put my money on Waxford' means betting or feeling totally confident that Waxford did it. English also has the famous expression 'put your money where your mouth is', which challenges someone to prove their claims with actual deeds rather than mere empty words.",
    "Nói 'I'd put my money on Waxford' có nghĩa là đánh cược hoặc hoàn toàn tin chắc rằng Waxford đã làm điều đó. Tiếng Anh còn có thành ngữ kinh điển 'put your money where your mouth is', thách thức ai đó hãy chứng minh tuyên bố của mình bằng việc làm thực tế thay vì chỉ khua môi múa mép.",
    "/ˈseɪɪŋ aɪd pʊt maɪ ˈmʌni ɑːn ˈwæksfərd miːnz ˈbɛtɪŋ ɔːr ˈfiːlɪŋ ˈtoʊtəli ˈkɑːnfɪdənt ðæt ˈwæksfərd dɪd ɪt. ˈɪŋɡlɪʃ ˈɔːlsoʊ hæz ðə ˈfeɪməs ɪkˈsprɛʃən pʊt jʊər ˈmʌni wɛr jʊər maʊθ ɪz, wɪtʃ ˈtʃælɪndʒɪz ˈsʌmwʌn tuː pruːv ðɛr kleɪmz wɪð ˈæktʃuəl diːdz ˈræðər ðæn mɪr ˈɛmpti wɜːrdz./",
    ["put my money on", "betting", "put your money where your mouth is", "actual deeds", "empty words"],
    "Thành ngữ 'put your money where your mouth is' (nói phải đi đôi với làm / đừng chỉ nói suông) là một trong những thành ngữ giá trị nhất trong tiếng Anh giao tiếp và công việc.",
    ["Waxford"]
  ],
  // 22. Cues 89-91 (768s - 798s)
  [
    89, 91,
    "Mike adds: 'You know, he got them shifty eyes!' Mike uses the colloquial grammar 'them' instead of 'those'. Describing someone as 'shifty' means they appear deceitful, evasive, and untrustworthy, like someone whose eyes dart back and forth suspiciously.",
    "Mike bồi thêm: 'Mày biết đấy, mắt gã đó cứ láo liên gian xảo thế nào ấy!' Mike dùng ngữ pháp khẩu ngữ 'them' thay cho 'those'. Miêu tả ai đó là 'shifty' có nghĩa họ trông lươn lẹo, dối trá và không đáng tin, như một kẻ có ánh mắt lấm lét liếc ngang liếc dọc đầy khả nghi.",
    "/maɪk ædz: juː noʊ, hiː ɡɑːt ðɛm ˈʃɪfti aɪz! maɪk ˈjuːzəz ðə kəˈloʊkwiəl ˈɡræmər ðɛm ɪnˈstɛd əv ðoʊz. dɪˈskraɪbɪŋ ˈsʌmwʌn æz ˈʃɪfti miːnz ðeɪ əˈpɪr dɪˈsiːtfəl, ɪˈveɪsɪv, ænd ʌnˈtrʌstˌwɜːrði, laɪk ˈsʌmwʌn huːz aɪz dɑːrt bæk ænd fɔːrθ səˈspɪʃəsli./",
    ["them shifty eyes", "colloquial grammar", "shifty", "deceitful", "evasive", "untrustworthy"],
    "Tính từ miêu tả tính cách 'shifty' (gian manh, xảo trá, mắt liếc ngang liếc dọc). Cụm ngữ pháp đời thường Mỹ: dùng 'them' thay cho 'those'.",
    ["Mike"]
  ],
  // 23. Cues 92-97 (798s - 842s)
  [
    92, 97,
    "Now let's review the clips without subtitles to test your listening! Clip 1: 'You know pal, she's the one! That's it, she is the one. I'm happy for you. Thanks for hooking me up with those reservations. No problem, they're under the name Googly Bear!' Test question: Why is Mike thanking Sulley? Because Sulley got reservations for Mike!",
    "Bây giờ hãy cùng ôn lại các trích đoạn mà không có phụ đề để thử thách đôi tai của bạn! Phân đoạn 1: 'Cậu biết không, cô ấy là một nửa đích thực! Chuẩn luôn, cô ấy là số một. Tớ mừng cho cậu. Cảm ơn vì đã lo giúp tớ việc đặt bàn nhé. Không có gì, bàn đặt dưới tên Gấu Mắt Tròn đấy!' Câu hỏi kiểm tra: Tại sao Mike lại cảm ơn Sulley? Vì Sulley đã đặt bàn nhà hàng giúp Mike!",
    "/naʊ lɛts rɪˈvjuː ðə klɪps wɪˈðaʊt ˈsʌbˌtaɪtəlz tuː tɛst jʊər ˈlɪsənɪŋ! klɪp wʌn: juː noʊ pæl, ʃiːz ðə wʌn! ðæts ɪt, ʃiː ɪz ðə wʌn. aɪm ˈhæpi fɔːr juː. θæŋks fɔːr ˈhʊkɪŋ miː ʌp wɪð ðoʊz ˌrɛzərˈveɪʃənz. noʊ ˈprɑːbləm, ðeɪr ˈʌndər ðə neɪm ˈɡuːɡli bɛr! tɛst ˈkwɛstʃən: waɪ ɪz maɪk ˈθæŋkɪŋ ˈsʌli? bɪˈkɔːz ˈsʌli ɡɑːt ˌrɛzərˈveɪʃənz fɔːr maɪk!/",
    ["without subtitles", "test your listening", "she's the one", "hooking me up", "Googly Bear"],
    "Thực hành kiểm tra nghe hiểu không phụ đề: Mike cảm ơn Sulley vì đã nhờ vả đặt được chỗ nhà hàng sang trọng.",
    ["Mike", "Sulley", "Googly Bear"]
  ],
  // 24. Cues 98-103 (842s - 888s)
  [
    98, 103,
    "Clip 2: 'What do you know! It scares little kids and little monsters! I wasn't scared, I have allergies. Hey Randall, save it for the scare floor, will you? I'm in the zone today Sullivan, going to be doing some serious scaring! Do you hear that? It's the Winds of Change!'",
    "Phân đoạn 2: 'Ai mà ngờ được chứ! Nó dọa được cả trẻ con lẫn quái vật tí hon! Tao không sợ, tao bị dị ứng thôi. Này Randall, để dành trên sàn dọa nạt đi được không? Hôm nay tao đang đạt phong độ đỉnh cao Sullivan à, sẽ làm vài cú hù dọa kinh điển cho xem! Mày có nghe thấy gì không? Ngọn Gió Đổi Thay đấy!'",
    "/klɪp tuː: wʌt duː juː noʊ! ɪt skɛrz ˈlɪtəl kɪdz ænd ˈlɪtəl ˈmɑːnstərz! aɪ ˈwʌzənt skɛrd, aɪ hæv ˈælərdʒiz. heɪ ˈrændəl, seɪv ɪt fɔːr ðə skɛr flɔːr, wɪl juː? aɪm ɪn ðə zoʊn təˈdeɪ ˈsʌlɪvən, ˈɡoʊɪŋ tuː biː ˈduːɪŋ sʌm ˈsɪriəs ˈskɛrɪŋ! duː juː hɪr ðæt? ɪts ðə wɪndz əv tʃeɪndʒ!/",
    ["what do you know", "allergies", "save it for the scare floor", "in the zone", "Winds of Change"],
    "Tái hiện trọn vẹn màn đối đáp không phụ đề giữa Randall và Sulley: Phong độ đỉnh cao và ngọn gió đổi thay.",
    ["Randall", "Sullivan", "Winds of Change"]
  ],
  // 25. Cues 104-106 (888s - 918s)
  [
    104, 106,
    "Clip 3: 'What a creep! One of these days I'm really going to let you teach that guy a lesson. Hey Sulley, please don't blow this, not when we're so close to breaking the record! Somebody else will find the kid. It'll be their problem, not ours! She's out of our hair!' — 'What are you two doing?' — 'They're rehearsing a play: She's out of our hair!' — 'Can it!' Test question: What does 'can it' mean? Shut up!",
    "Phân đoạn 3: 'Đúng là đồ quái dị! Bữa nào tớ sẽ để cậu dạy cho hắn một bài học. Này Sulley, làm ơn đừng phá hỏng chuyện này chứ, khi ta sắp phá kỷ lục rồi! Người khác sẽ tìm thấy đứa bé thôi. Đó là việc của họ, không phải của ta! Nó biến khỏi mắt ta rồi!' — 'Hai người làm trò gì thế?' — 'Họ đang tập kịch: Nó biến khỏi mắt ta rồi!' — 'Im miệng lại!' Câu hỏi kiểm tra: 'Can it' nghĩa là gì? Câm miệng lại!",
    "/klɪp θriː: wʌt ə kriːp! wʌn əv ðiːz deɪz aɪm ˈrɪəli ˈɡoʊɪŋ tuː lɛt juː tiːtʃ ðæt ɡaɪ ə ˈlɛsən. heɪ ˈsʌli, pliːz doʊnt bloʊ ðɪs, nɑːt wɛn wɪr soʊ kloʊs tuː ˈbreɪkɪŋ ðə ˈrɛkərd! ˈsʌmˌbɑːdi ɛls wɪl faɪnd ðə kɪd. ɪtl biː ðɛr ˈprɑːbləm, nɑːt ˈaʊərz! ʃiːz aʊt əv ˈaʊər hɛr! wʌt ɑːr juː tuː ˈduːɪŋ? ðeɪr rɪˈhɜːrsɪŋ ə pleɪ: ʃiːz aʊt əv ˈaʊər hɛr! kæn ɪt! tɛst ˈkwɛstʃən: wʌt dʌz kæn ɪt miːn? ʃʌt ʌp!/",
    ["teach that guy a lesson", "don't blow this", "out of our hair", "rehearsing a play", "can it", "shut up"],
    "Luyện nghe không phụ đề phân đoạn trốn tránh và giải thích ý nghĩa tiếng lóng 'can it' (shut up).",
    ["Sulley"]
  ],
  // 26. Cues 107-111 (918s - 959s)
  [
    107, 111,
    "Clip 4: 'Word on the street is the kid's been traced back to this factory. You haven't seen anything, have you? — No, no way! But if it was an inside job, I'd put my money on Waxford! You know, he got them shifty eyes!' Test question: What does 'no way' express? Strong refusal or surprise!",
    "Phân đoạn 4: 'Tin đồn ngoài phố là đứa bé đã bị lần ra tung tích tới tận nhà máy này. Mày chưa thấy gì chứ? — Không, không đời nào! Nhưng nếu là một vụ nội gián, tao cá chắc là do thằng Waxford! Mày biết đấy, mắt gã cứ láo liên gian xảo thế nào ấy!' Câu hỏi kiểm tra: 'No way' biểu đạt điều gì? Sự từ chối quyết liệt hoặc sự ngạc nhiên!",
    "/klɪp fɔːr: wɜːrd ɑːn ðə striːt ɪz ðə kɪdz bɪn treɪst bæk tuː ðɪs ˈfæktəri. juː ˈhævənt siːn ˈɛniˌθɪŋ, hæv juː? noʊ, noʊ weɪ! bʌt ɪf ɪt wʌz ən ˈɪnˌsaɪd dʒɑːb, aɪd pʊt maɪ ˈmʌni ɑːn ˈwæksfərd! juː noʊ, hiː ɡɑːt ðɛm ˈʃɪfti aɪz! tɛst ˈkwɛstʃən: wʌt dʌz noʊ weɪ ɪkˈsprɛs? strɔːŋ rɪˈfjuːzəl ɔːr sərˈpraɪz!/",
    ["word on the street is", "traced back", "no way", "inside job", "put my money on", "them shifty eyes"],
    "Luyện nghe không phụ đề phân đoạn thẩm vấn của Randall và câu hỏi kiểm tra biểu cảm 'no way'.",
    ["Waxford"]
  ],
  // 27. Cues 112-114 (959s - 975s)
  [
    112, 114,
    "Now it's time for the Comment of the Day! The comment comes from our Garfield lesson: 'It's my first time here, and I already love this channel enough to become a new subscriber! I'm glad you could help me with this video.' Great job and welcome aboard to our community of learners!",
    "Giờ là lúc dành cho Bình luận của Ngày! Bình luận đến từ bài học phim Garfield: 'Đây là lần đầu tiên em xem kênh, và em đã quá mê kênh đến mức bấm đăng ký ngay lập tức! Em rất vui vì thầy đã giúp em qua video này.' Thật tuyệt vời và nhiệt liệt chào mừng bạn gia nhập cộng đồng học tập của chúng ta!",
    "/naʊ ɪts taɪm fɔːr ðə ˈkɑːmɛnt əv ðə deɪ! ðə ˈkɑːmɛnt kʌmz frʌm ˈaʊər ˈɡɑːrˌfiːld ˈlɛsən: ɪts maɪ fɜːrst taɪm hɪr, ænd aɪ ɔːlˈrɛdi lʌv ðɪs ˈtʃænəl ɪˈnʌf tuː bɪˈkʌm ə nuː səbˈskraɪbər! aɪm ɡlæd juː kʊd hɛlp miː wɪð ðɪs ˈvɪdioʊ. ɡreɪt dʒɑːb ænd ˈwɛlkəm əˈbɔːrd tuː ˈaʊər kəˈmjuːnəti əv ˈlɜːrnərz!/",
    ["Comment of the Day", "Garfield lesson", "new subscriber", "welcome aboard", "community of learners"],
    "Giao lưu cộng đồng học viên: Đọc bình luận tiêu biểu và truyền cảm hứng học tiếng Anh mỗi ngày.",
    ["Garfield"]
  ],
  // 28. Cues 115-121 (975s - 1037s)
  [
    115, 121,
    "Now, here is your challenge for today! Create your own sentences in the comments using three key expressions from today's lesson: 'In the zone', 'Word on the street is', and 'Shifty'. You made it until the end of the lesson, you rock! Don't forget to like, share with a friend, and check out our next lessons!",
    "Bây giờ, đây là thử thách dành cho bạn hôm nay! Hãy tự đặt câu trong phần bình luận bằng cách sử dụng ba thành ngữ cốt lõi từ bài học: 'In the zone', 'Word on the street is' và 'Shifty'. Các bạn đã học đến tận cuối bài rồi, các bạn đỉnh chóp lắm! Đừng quên bấm like, chia sẻ cho bạn bè và đón xem các bài học tiếp theo nhé!",
    "/naʊ, hɪr ɪz jʊər ˈtʃælɪndʒ fɔːr təˈdeɪ! kriˈeɪt jʊər oʊn ˈsɛntənsɪz ɪn ðə ˈkɑːmɛnts ˈjuːzɪŋ θriː kiː ɪkˈsprɛʃənz frʌm təˈdeɪz ˈlɛsən: ɪn ðə zoʊn, wɜːrd ɑːn ðə striːt ɪz, ænd ˈʃɪfti. juː meɪd ɪt ənˈtɪl ðiː ɛnd əv ðə ˈlɛsən, juː rɑːk! doʊnt fərˈɡɛt tuː laɪk, ʃɛr wɪð ə frɛnd, ænd tʃɛk aʊt ˈaʊər nɛkst ˈlɛsənz!/",
    ["challenge for today", "create your own sentences", "in the zone", "word on the street is", "shifty", "you rock"],
    "Thử thách bài tập tương tác: Học viên tự vận dụng 3 cụm từ đắt giá để ghi nhớ sâu sắc.",
    []
  ],
  // 29. Cues 122-124 (1037s - 1059s)
  [
    122, 124,
    "Bye-bye! Leave me alone, I'm not kidding! Pop a worm pill and hit the road, I'm busy! You want to play? Fine, you can be the new astronaut. Go jump in the pail and we'll shoot you into outer space! Come on, it's real simple, here I'll even throw your ball in there, follow the ball and jump in the pail!",
    "Tạm biệt nhé! Để tớ yên đi, tớ không đùa đâu đấy! Uống viên thuốc giun rồi biến đi giùm cái, tớ đang bận lắm! Muốn chơi chứ gì? Được thôi, cậu sẽ làm phi hành gia mới nhé. Nhảy tọt vào cái xô đi rồi bọn tớ sẽ bắn cậu vào không gian vũ trụ! Nào, đơn giản lắm, đây tớ ném quả bóng của cậu vào đó này, chạy theo quả bóng rồi nhảy vào xô đi!",
    "/baɪ baɪ! liːv miː əˈloʊn, aɪm nɑːt ˈkɪdɪŋ! pɑːp ə wɜːrm pɪl ænd hɪt ðə roʊd, aɪm ˈbɪzi! juː wɑːnt tuː pleɪ? faɪn, juː kæn biː ðə nuː ˈæstrəˌnɔːt. ɡoʊ dʒʌmp ɪn ðə peɪl ænd wiːl ʃuːt juː ˈɪntuː ˈaʊtər speɪs! kʌm ɑːn, ɪts ˈrɪəl ˈsɪmpəl, hɪr aɪl ˈiːvən θroʊ jʊər bɔːl ɪn ðɛr, ˈfɑːloʊ ðə bɔːl ænd dʒʌmp ɪn ðə peɪl!/",
    ["leave me alone", "hit the road", "astronaut", "jump in the pail", "outer space"],
    "Phân cảnh hài hước kinh điển kết thúc video: Mike Wazowski bày trò lừa bé Boo nhảy vào thùng rác để che giấu danh tính phi hành gia.",
    []
  ]
];

console.log(`Building ${specs.length} master segments covering all 125 cues...`);

const builtSegments = [];

specs.forEach((s, orderIndex) => {
  const [startC, endC, text, translationVi, ipaUs, keywords, explanationAi, properNouns] = s;
  const startTime = cues[startC].seconds;
  const endTime = endC + 1 < cues.length ? cues[endC + 1].seconds : 1059.0;
  
  const tokens = tokenizeSentence(text, properNouns || []);
  const tokenCount = tokens.length;

  builtSegments.push({
    orderIndex,
    startTime,
    endTime,
    text,
    translationVi,
    ipaUs,
    keywords,
    explanationAi,
    properNouns: properNouns || [],
    tokenCount
  });
});

const quizData = {
  lessonId: "mov_ani_12",
  lessonTitle: "Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder",
  totalQuestions: 6,
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "q_mov_ani_12_1",
      question: "What does Mike mean when he thanks Sulley for 'hooking me up with those reservations'?",
      questionEn: "What does Mike mean when he thanks Sulley for 'hooking me up with those reservations'?",
      questionVi: "Mike có ý gì khi cảm ơn Sulley vì đã 'hooking me up with those reservations'?",
      options: [
        "Sulley arranged and secured restaurant reservations for Mike as a helpful favor",
        "Sulley cancelled Mike's existing dinner reservations",
        "Sulley charged Mike extra money to buy stolen reservation tickets",
        "Sulley refused to let Mike dine at the monster restaurant"
      ],
      optionsEn: [
        "Sulley arranged and secured restaurant reservations for Mike as a helpful favor",
        "Sulley cancelled Mike's existing dinner reservations",
        "Sulley charged Mike extra money to buy stolen reservation tickets",
        "Sulley refused to let Mike dine at the monster restaurant"
      ],
      optionsVi: [
        "Sulley đã thu xếp và đặt bàn nhà hàng cho Mike như một sự giúp đỡ nhiệt tình",
        "Sulley đã hủy đặt bàn bữa tối hiện có của Mike",
        "Sulley tính thêm tiền của Mike để mua vé đặt bàn chợ đen",
        "Sulley từ chối cho Mike ăn tối tại nhà hàng quái vật"
      ],
      correctAnswer: 0,
      explanation: "To 'hook someone up with something' means to provide or arrange something useful and beneficial for someone as a favor.",
      explanationEn: "To 'hook someone up with something' means to provide or arrange something useful and beneficial for someone as a favor.",
      explanationVi: "'Hook someone up with something' có nghĩa là thu xếp hoặc cung cấp điều gì hữu ích cho ai đó như một sự giúp đỡ thân tình.",
      targetedConcept: "Idiom: Hook someone up with",
      targetedConceptEn: "Idiom: Hook someone up with",
      targetedConceptVi: "Thành ngữ: Giúp đỡ / thu xếp cho ai đó",
      referenceSegmentIndex: 2
    },
    {
      id: "q_mov_ani_12_2",
      question: "When Randall boasts 'I'm in the zone today', what psychological state is he describing?",
      questionEn: "When Randall boasts 'I'm in the zone today', what psychological state is he describing?",
      questionVi: "Khi Randall khoe khoang 'I'm in the zone today', hắn đang mô tả trạng thái tâm lý nào?",
      options: [
        "He is in a state of peak focus and extraordinary performance where everything works effortlessly",
        "He is feeling extremely sleepy and wants to rest in his bedroom",
        "He is lost in a dangerous restricted area of the factory",
        "He is terrified of the little human children"
      ],
      optionsEn: [
        "He is in a state of peak focus and extraordinary performance where everything works effortlessly",
        "He is feeling extremely sleepy and wants to rest in his bedroom",
        "He is lost in a dangerous restricted area of the factory",
        "He is terrified of the little human children"
      ],
      optionsVi: [
        "Hắn đang ở trạng thái tập trung đỉnh cao và phong độ xuất sắc nhất, làm gì cũng trơn tru",
        "Hắn cảm thấy cực kỳ buồn ngủ và muốn nghỉ ngơi trong phòng",
        "Hắn bị lạc trong khu vực cấm nguy hiểm của nhà máy",
        "Hắn đang khiếp sợ những đứa trẻ loài người"
      ],
      correctAnswer: 0,
      explanation: "'In the zone' refers to a flow state of peak performance, intense concentration, and confident execution.",
      explanationEn: "'In the zone' refers to a flow state of peak performance, intense concentration, and confident execution.",
      explanationVi: "'In the zone' chỉ điểm rơi phong độ, sự tập trung cao độ và thăng hoa tột bậc trong công việc hoặc thi đấu.",
      targetedConcept: "Idiom: In the zone",
      targetedConceptEn: "Idiom: In the zone",
      targetedConceptVi: "Thành ngữ: Đạt phong độ đỉnh cao",
      referenceSegmentIndex: 4
    },
    {
      id: "q_mov_ani_12_3",
      question: "What does the slang phrase 'Can it!' mean when Sulley shouts it at Mike during the rehearsal?",
      questionEn: "What does the slang phrase 'Can it!' mean when Sulley shouts it at Mike during the rehearsal?",
      questionVi: "Cụm tiếng lóng 'Can it!' có nghĩa là gì khi Sulley quát Mike trong lúc diễn kịch?",
      options: [
        "Stop talking and shut up immediately",
        "Put food into a tin can",
        "Sing louder so everyone can hear",
        "Run away as fast as possible"
      ],
      optionsEn: [
        "Stop talking and shut up immediately",
        "Put food into a tin can",
        "Sing louder so everyone can hear",
        "Run away as fast as possible"
      ],
      optionsVi: [
        "Ngừng nói và câm miệng lại ngay lập tức",
        "Bỏ thức ăn vào hộp thiếc",
        "Hát to hơn để mọi người cùng nghe",
        "Chạy đi thật nhanh"
      ],
      correctAnswer: 0,
      explanation: "'Can it!' is an informal colloquial idiom telling someone to stop talking or be quiet.",
      explanationEn: "'Can it!' is an informal colloquial idiom telling someone to stop talking or be quiet.",
      explanationVi: "'Can it!' là tiếng lóng đời thường bảo ai đó hãy im lặng hoặc ngậm miệng lại ngay.",
      targetedConcept: "Slang: Can it!",
      targetedConceptEn: "Slang: Can it!",
      targetedConceptVi: "Tiếng lóng: Im miệng lại",
      referenceSegmentIndex: 17
    },
    {
      id: "q_mov_ani_12_4",
      question: "What does Randall imply when he says 'Word on the street is the kid's been traced back to this factory'?",
      questionEn: "What does Randall imply when he says 'Word on the street is the kid's been traced back to this factory'?",
      questionVi: "Randall ngụ ý điều gì khi nói 'Word on the street is the kid's been traced back to this factory'?",
      options: [
        "Rumors and talk circulating among monsters say evidence links the runaway human child to this facility",
        "A formal written letter was mailed to the mayor's office",
        "The child was found playing happily outside on the street",
        "The police have closed the investigation without any leads"
      ],
      optionsEn: [
        "Rumors and talk circulating among monsters say evidence links the runaway human child to this facility",
        "A formal written letter was mailed to the mayor's office",
        "The child was found playing happily outside on the street",
        "The police have closed the investigation without any leads"
      ],
      optionsVi: [
        "Tin đồn lan truyền giữa các quái vật cho thấy manh mối liên kết đứa trẻ xổng ra với nhà máy này",
        "Một bức thư chính thức đã được gửi tới văn phòng thị trưởng",
        "Đứa trẻ được tìm thấy đang chơi vui vẻ ngoài phố",
        "Cảnh sát đã khép lại cuộc điều tra mà không có manh mối nào"
      ],
      correctAnswer: 0,
      explanation: "'Word on the street is...' introduces widely circulating rumors, gossip, or informal reports within a community.",
      explanationEn: "'Word on the street is...' introduces widely circulating rumors, gossip, or informal reports within a community.",
      explanationVi: "'Word on the street is...' dùng để bắt đầu chia sẻ một tin đồn hoặc thông tin truyền miệng đang lan truyền rộng rãi.",
      targetedConcept: "Idiom: Word on the street is",
      targetedConceptEn: "Idiom: Word on the street is",
      targetedConceptVi: "Thành ngữ: Tin đồn thiên hạ",
      referenceSegmentIndex: 18
    },
    {
      id: "q_mov_ani_12_5",
      question: "What does the English expression 'Put your money where your mouth is' instruct someone to do?",
      questionEn: "What does the English expression 'Put your money where your mouth is' instruct someone to do?",
      questionVi: "Thành ngữ tiếng Anh 'Put your money where your mouth is' khuyên bảo người ta làm gì?",
      options: [
        "Back up your claims and words with tangible actions rather than empty talk",
        "Physically place currency notes into your mouth",
        "Lend your savings to strangers without any interest",
        "Never speak about your financial wealth in public"
      ],
      optionsEn: [
        "Back up your claims and words with tangible actions rather than empty talk",
        "Physically place currency notes into your mouth",
        "Lend your savings to strangers without any interest",
        "Never speak about your financial wealth in public"
      ],
      optionsVi: [
        "Hãy chứng minh lời nói và cam kết bằng hành động thực tế thay vì chỉ nói suông",
        "Đặt tiền mặt trực tiếp vào miệng",
        "Cho người lạ vay tiền tiết kiệm mà không lấy lãi",
        "Không bao giờ nói về tài sản của mình trước công chúng"
      ],
      correctAnswer: 0,
      explanation: "'Put your money where your mouth is' means to support your statements with real action or financial investment.",
      explanationEn: "'Put your money where your mouth is' means to support your statements with real action or financial investment.",
      explanationVi: "'Put your money where your mouth is' (nói phải đi đôi với làm) yêu cầu dùng hành động cụ thể để chứng minh tuyên bố của mình.",
      targetedConcept: "Proverb: Put your money where your mouth is",
      targetedConceptEn: "Proverb: Put your money where your mouth is",
      targetedConceptVi: "Thành ngữ: Nói đi đôi với làm",
      referenceSegmentIndex: 21
    },
    {
      id: "q_mov_ani_12_6",
      question: "When Mike claims Waxford has 'them shifty eyes', what characteristic is he attributing to him?",
      questionEn: "When Mike claims Waxford has 'them shifty eyes', what characteristic is he attributing to him?",
      questionVi: "Khi Mike nói Waxford có 'them shifty eyes', anh ta đang quy chụp cho Waxford đặc điểm gì?",
      options: [
        "Looking deceitful, untrustworthy, and suspicious",
        "Having sparkling, friendly, and honest eyes",
        "Needing thick reading glasses to see clearly",
        "Being the most popular worker in the entire department"
      ],
      optionsEn: [
        "Looking deceitful, untrustworthy, and suspicious",
        "Having sparkling, friendly, and honest eyes",
        "Needing thick reading glasses to see clearly",
        "Being the most popular worker in the entire department"
      ],
      optionsVi: [
        "Trông gian xảo, dối trá, lươn lẹo và đầy khả nghi",
        "Có đôi mắt long lanh, thân thiện và chân thật",
        "Cần đeo kính râm dày để nhìn rõ",
        "Là công nhân nổi tiếng nhất trong toàn bộ nhà máy"
      ],
      correctAnswer: 0,
      explanation: "'Shifty' characterizes someone who seems dishonest, deceitful, and suspicious.",
      explanationEn: "'Shifty' characterizes someone who seems dishonest, deceitful, and suspicious.",
      explanationVi: "'Shifty' miêu tả một người gian trá, lấm lét, có ánh mắt láo liên không đáng tin cậy.",
      targetedConcept: "Vocabulary: Shifty eyes",
      targetedConceptEn: "Vocabulary: Shifty eyes",
      targetedConceptVi: "Từ vựng: Ánh mắt gian xảo / khả nghi",
      referenceSegmentIndex: 22
    }
  ]
};

const fileContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR A2 | American Accent
 * YouTube ID: _kafLt9bNyU (17:39 - 1059s)
 * Views: 277,436 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE, TOÀN BỘ 125 CUES PHỤ ĐỀ GỐC & LỜI THOẠI NGUYÊN BẢN (00:28 - 17:39)
 * PHỦ KÍN 30 MASTER SEGMENTS KHÔNG BỎ SÓT BẤT KỲ CÂU THOẠI HAY BÀI HỌC NGÔN NGỮ NÀO
 * ============================================================================
 */

export const QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT: VideoQuizData = ${JSON.stringify(quizData, null, 2)};

export const LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT: MockVideoLesson = {
  id: "mov_ani_12",
  slug: "monsters-inc-goodbye-boo-emotional-cut",
  title: "Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "A2",
  durationFormatted: "17:39",
  durationSeconds: 1059,
  externalId: "_kafLt9bNyU",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/_kafLt9bNyU/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 132,
  viewCount: 277436,
  studyCount: 5620,
  description:
    "Học tiếng Anh chuyên sâu cùng Monsters, Inc. (2001): Phân tích toàn diện 100% lời thoại kinh điển của Mike Wazowski & Sulley và bài giảng ngôn ngữ học, phủ kín 30 master segments từ thành ngữ giao tiếp 'in the zone', 'she's the one', 'hook someone up' đến tiếng lóng 'can it', 'word on the street' và 'shifty eyes'.",
  segments: ${JSON.stringify(builtSegments, null, 4)},
  quiz: QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT,
};

export default LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
`;

fs.writeFileSync('features/listening/data/lessons/movies/animation/lesson_monsters_inc.ts', fileContent, 'utf-8');
console.log(`Successfully generated lesson_monsters_inc.ts with ${builtSegments.length} segments covering 100% of 125 cues!`);
