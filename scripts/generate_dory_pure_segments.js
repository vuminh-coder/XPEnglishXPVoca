const fs = require('fs');

const segments = [
  // Chapter 1 & 2: Baby Dory & The Seashell Memory (0 - 5)
  {
    orderIndex: 0,
    startTime: 10.0,
    endTime: 22.0,
    text: "Hi, I'm Dory. I suffer from short-term memory loss.",
    translationVi: "Xin chào, tôi là Dory. Tôi bị mắc chứng mất trí nhớ ngắn hạn.",
    ipaUs: "/haɪ, aɪm ˈdɔːri. aɪ ˈsʌfər frʌm ʃɔːrt-tɜːrm ˈmɛməri lɔːs./",
    keywords: ["suffer from", "short-term memory loss"],
    explanationAi: "Cụm thuật ngữ y khoa thông dụng 'suffer from short-term memory loss' (mắc chứng đãng trí/mất trí nhớ tạm thời ngắn hạn).",
    properNouns: ["Dory"]
  },
  {
    orderIndex: 1,
    startTime: 23.0,
    endTime: 34.0,
    text: "It runs in my family... At least I think it does. Where are they?",
    translationVi: "Căn bệnh này di truyền trong gia đình tôi... Ít nhất là tôi nghĩ thế. Ủa mà bố mẹ tôi đang ở đâu rồi nhỉ?",
    ipaUs: "/ɪt rʌnz ɪn maɪ ˈfæməli... æt liːst aɪ θɪŋk ɪt dʌz. wɛr ɑːr ðeɪ?/",
    keywords: ["runs in my family", "at least"],
    explanationAi: "Thành ngữ sinh học 'runs in the family' (di truyền qua các thế hệ dòng họ) và cụm giảm nhẹ 'at least' (ít nhất là).",
    properNouns: []
  },
  {
    orderIndex: 2,
    startTime: 35.0,
    endTime: 48.0,
    text: "There you go, sweetheart! Just remember: When life gets you down, you know what you gotta do?",
    translationVi: "Giỏi lắm, con yêu của mẹ! Con chỉ cần nhớ điều này: Khi cuộc đời làm con nản lòng chùn bước, con biết mình phải làm gì rồi chứ?",
    ipaUs: "/ðɛr juː ɡoʊ, ˈswiːtˌhɑːrt! dʒʌst rɪˈmɛmbər: wɛn laɪf ɡɛts juː daʊn, juː noʊ wʌt juː ˈɡɑːtə duː?/",
    keywords: ["sweetheart", "gets you down", "gotta do"],
    explanationAi: "Thành ngữ 'get someone down' (khiến ai đó buồn chán, nản lòng) và dạng biến âm 'gotta' (got to) trong lời động viên ân cần của người mẹ.",
    properNouns: []
  },
  {
    orderIndex: 3,
    startTime: 49.0,
    endTime: 62.0,
    text: "Just keep swimming! Just keep swimming, swimming, swimming!",
    translationVi: "Cứ việc bơi tiếp đi! Cứ việc bơi tiếp, bơi tiếp, bơi tiếp thôi!",
    ipaUs: "/dʒʌst kiːp ˈswɪmɪŋ! dʒʌst kiːp ˈswɪmɪŋ, ˈswɪmɪŋ, ˈswɪmɪŋ!/",
    keywords: ["just keep swimming"],
    explanationAi: "Giai điệu biểu tượng bất hủ của Pixar về nghị lực phi thường: cấu trúc 'keep + V-ing' (tiếp tục kiên trì hành động không bỏ cuộc).",
    properNouns: []
  },
  {
    orderIndex: 4,
    startTime: 63.0,
    endTime: 74.0,
    text: "That's our girl! What do we do? We swim, swim, swim!",
    translationVi: "Đúng là cô bé cưng của bố! Chúng ta làm gì nào? Chúng ta bơi, bơi, và bơi!",
    ipaUs: "/ðæts ˈaʊər ɡɜːrl! wʌt duː wiː duː? wiː swɪm, swɪm, swɪm!/",
    keywords: ["that's our girl", "we swim"],
    explanationAi: "Thành ngữ khen ngợi 'That's our girl!' biểu thị niềm tự hào cha mẹ dành cho con gái nhỏ.",
    properNouns: []
  },
  {
    orderIndex: 5,
    startTime: 75.0,
    endTime: 85.0,
    text: "And if you ever get lost, just follow the purple shells all the way home.",
    translationVi: "Và nếu lỡ con có bị lạc đường, chỉ cần lần theo những chiếc vỏ sò màu tím là sẽ về tới nhà.",
    ipaUs: "/ænd ɪf juː ˈɛvər ɡɛt lɔːst, dʒʌst ˈfɑːloʊ ðə ˈpɜːrpəl ʃɛlz ɔːl ðə weɪ hoʊm./",
    keywords: ["get lost", "purple shells", "all the way home"],
    explanationAi: "Cụm thành ngữ không gian 'all the way home' (suốt dọc đường về nhà) và hình ảnh chiếc vỏ sò màu tím - chiếc neo định vị ký ức cốt lõi.",
    properNouns: []
  },

  // Chapter 3: Flashback & Crossing the Ocean (6 - 11)
  {
    orderIndex: 6,
    startTime: 88.0,
    endTime: 104.0,
    text: "I remembered something! The Jewel of Morro Bay, California!",
    translationVi: "Tôi nhớ ra một điều rồi! Viên ngọc của Vịnh Morro, California!",
    ipaUs: "/aɪ rɪˈmɛmbərd ˈsʌmθɪŋ! ðə ˈdʒuːəl ʌv ˈmɔːroʊ beɪ, ˌkæləˈfɔːrnjə!/",
    keywords: ["remembered something", "Jewel of Morro Bay"],
    explanationAi: "Ký ức bất ngờ bùng sáng (sudden epiphanic flashback) mở ra điểm đến định mệnh của toàn bộ hành trình.",
    properNouns: ["Jewel of Morro Bay", "California"]
  },
  {
    orderIndex: 7,
    startTime: 106.0,
    endTime: 120.0,
    text: "They have names! My mom, my dad! Jenny and Charlie!",
    translationVi: "Họ có tên đàng hoàng cơ mà! Mẹ tôi, bố tôi! Jenny và Charlie!",
    ipaUs: "/ðeɪ hæv neɪmz! maɪ mɑːm, maɪ dæd! ˈdʒɛni ænd ˈtʃɑːrli!/",
    keywords: ["they have names", "mom and dad"],
    explanationAi: "Niềm xúc động nghẹn ngào khi tìm lại được danh tính của các đấng sinh thành sau nhiều năm lưu lạc vô định.",
    properNouns: ["Jenny", "Charlie"]
  },
  {
    orderIndex: 8,
    startTime: 122.0,
    endTime: 135.0,
    text: "They're out there somewhere, and they miss me! I gotta find them!",
    translationVi: "Bố mẹ đang ở ngoài kia, và họ nhớ tôi lắm! Tôi nhất định phải tìm thấy họ!",
    ipaUs: "/ðɛr aʊt ðɛr ˈsʌmˌwɛr, ænd ðeɪ mɪs miː! aɪ ˈɡɑːtə faɪnd ðɛm!/",
    keywords: ["out there somewhere", "miss me", "gotta find them"],
    explanationAi: "Động từ khiếm khuyết 'gotta find' nhấn mạnh quyết tâm mãnh liệt vượt lên trên rào cản của trí nhớ suy giảm.",
    properNouns: []
  },
  {
    orderIndex: 9,
    startTime: 136.0,
    endTime: 148.0,
    text: "Dory, California is on the other side of the ocean! You can't just swim across the world on a whim!",
    translationVi: "Dory, California ở tận bờ bên kia của đại dương cơ mà! Cô không thể cứ bơi ngang qua nửa vòng trái đất chỉ vì một ý thích bốc đồng như thế được!",
    ipaUs: "/ˈdɔːri, ˌkæləˈfɔːrnjə ɪz ɑːn ði ˈʌðər saɪd ʌv ði ˈoʊʃən! juː kænt dʒʌst swɪm əˈkrɔːs ðə wɜːrld ɑːn ə wɪm!/",
    keywords: ["other side of the ocean", "on a whim"],
    explanationAi: "Thành ngữ 'on a whim' (bốc đồng, hành động theo cảm hứng ngẫu nhiên không có kế hoạch tính toán trước).",
    properNouns: ["Dory", "California"]
  },
  {
    orderIndex: 10,
    startTime: 149.0,
    endTime: 162.0,
    text: "Dad, she remembered her family. We have to help her.",
    translationVi: "Bố ơi, cô ấy đã nhớ lại gia đình mình rồi. Bố con mình phải giúp cô ấy thôi.",
    ipaUs: "/dæd, ʃiː rɪˈmɛmbərd hɜːr ˈfæməli. wiː hæv tuː hɛlp hɜːr./",
    keywords: ["remembered her family", "have to help"],
    explanationAi: "Lời thuyết phục đầy lòng trắc ẩn của Nemo gợi nhớ lại ơn nghĩa cứu mạng mà Dory đã dành cho hai bố con trong phần một.",
    properNouns: []
  },
  {
    orderIndex: 11,
    startTime: 165.0,
    endTime: 185.0,
    text: "Whoa, dude! You're totally riding the EAC! Keep your flippers inside the current at all times!",
    translationVi: "Oa, người anh em! Bạn đang cưỡi trên Hải lưu Đông Úc chuẩn đét luôn đấy! Luôn giữ vây chèo bên trong luồng nước nhé!",
    ipaUs: "/woʊ, duːd! jʊr ˈtoʊtəli ˈraɪdɪŋ ði iː-eɪ-siː! kiːp jʊər ˈflɪpərz ɪnˈsaɪd ðə ˈkɜːrənt æt ɔːl taɪmz!/",
    keywords: ["riding the EAC", "flippers", "at all times"],
    explanationAi: "Tiếng lóng lướt sóng của rùa biển Crush 'dude' và chữ viết tắt hải văn 'EAC' (East Australian Current).",
    properNouns: ["EAC"]
  },

  // Chapter 4 & 5: Marine Life Institute & Meeting Hank (12 - 20)
  {
    orderIndex: 12,
    startTime: 195.0,
    endTime: 215.0,
    text: "Welcome to the Marine Life Institute, where we believe in Rescue, Rehabilitation, and Release.",
    translationVi: "Chào mừng quý vị đến với Viện Sinh vật Biển, nơi chúng tôi tin tưởng vào sứ mệnh Cứu hộ, Phục hồi và Tái thả tự nhiên.",
    ipaUs: "/ˈwɛlkəm tuː ðə məˈriːn laɪf ˈɪnstəˌtuːt, wɛr wiː bɪˈliːv ɪn ˈrɛskjuː, ˌriːhəˌbɪləˈteɪʃən, ænd rɪˈliːs./",
    keywords: ["Marine Life Institute", "Rescue", "Rehabilitation", "Release"],
    explanationAi: "Khẩu hiệu 3R kinh điển của công tác bảo tồn sinh vật biển: 'Rescue' (Cứu hộ), 'Rehabilitation' (Phục hồi chức năng) và 'Release' (Tái thả về đại dương).",
    properNouns: ["Marine Life Institute"]
  },
  {
    orderIndex: 13,
    startTime: 220.0,
    endTime: 235.0,
    text: "Where am I? What happened? Hello? Can anyone hear me?",
    translationVi: "Tôi đang ở đâu thế này? Chuyện gì đã xảy ra vậy? Có ai ở đó không? Có ai nghe thấy tôi không?",
    ipaUs: "/wɛr æm aɪ? wʌt ˈhæpənd? həˈloʊ? kæn ˈɛniˌwʌn hɪr miː?/",
    keywords: ["where am I", "hear me"],
    explanationAi: "Chuỗi câu hỏi hoảng loạn ngắn bộc lộ cảm giác lạc lõng và mất phương hướng của Dory trong bể cách ly.",
    properNouns: []
  },
  {
    orderIndex: 14,
    startTime: 240.0,
    endTime: 255.0,
    text: "I am a septopus. I lost an arm, so that makes seven.",
    translationVi: "Tôi là một chú bạch tuộc bảy chi. Tôi bị mất một cái xúc tu, nên chỉ còn lại bảy cái thôi.",
    ipaUs: "/aɪ æm ə ˈsɛptəpəs. aɪ lɔːst ən ɑːrm, soʊ ðæt meɪks ˈsɛvən./",
    keywords: ["septopus", "lost an arm"],
    explanationAi: "Thuật ngữ sáng tạo hài hước 'septopus' (ghép tiền tố Hy Lạp sept- chỉ số 7 với đuôi -pus của octopus - bạch tuộc 8 chi).",
    properNouns: []
  },
  {
    orderIndex: 15,
    startTime: 258.0,
    endTime: 270.0,
    text: "And you have an orange tag clipped to your fin.",
    translationVi: "Và cô đang có một chiếc thẻ màu cam được kẹp chặt vào vây kìa.",
    ipaUs: "/ænd juː hæv ən ˈɔːrɪndʒ tæɡ klɪpt tuː jʊər fɪn./",
    keywords: ["orange tag", "clipped to your fin"],
    explanationAi: "Thuật ngữ đánh dấu quản lý động vật 'tag clipped to fin' (kẹp thẻ định danh theo dõi vào vây).",
    properNouns: []
  },
  {
    orderIndex: 16,
    startTime: 275.0,
    endTime: 295.0,
    text: "An orange tag means you are getting transferred to the permanent aquarium in Cleveland.",
    translationVi: "Một chiếc thẻ màu cam đồng nghĩa với việc cô sẽ được chuyển đến thủy cung vĩnh viễn ở Cleveland.",
    ipaUs: "/ən ˈɔːrɪndʒ tæɡ miːnz juː ɑːr ˈɡɛtɪŋ trænsˈfɜːrd tuː ðə ˈpɜːrmənənt əˈkwɛriəm ɪn ˈkliːvlənd./",
    keywords: ["transferred", "permanent aquarium", "Cleveland"],
    explanationAi: "Thuật ngữ điều chuyển cơ sở 'transferred to permanent aquarium' (chuyển tới nơi trưng bày cố định trọn đời).",
    properNouns: ["Cleveland"]
  },
  {
    orderIndex: 17,
    startTime: 300.0,
    endTime: 320.0,
    text: "That tag is my ticket out of here. Give me that tag, and I'll help you find your parents.",
    translationVi: "Chiếc thẻ đó chính là tấm vé thông hành đưa tôi thoát khỏi nơi này. Đưa nó cho tôi, và tôi sẽ giúp cô tìm bố mẹ.",
    ipaUs: "/ðæt tæɡ ɪz maɪ ˈtɪkɪt aʊt ʌv hɪr. ɡɪv miː ðæt tæɡ, ænd aɪl hɛlp juː faɪnd jʊər ˈpɛrənts./",
    keywords: ["ticket out of here", "find your parents"],
    explanationAi: "Thành ngữ ẩn dụ 'ticket out of here' (lối thoát duy nhất, cơ hội giải phóng bản thân đến nơi mong muốn).",
    properNouns: []
  },
  {
    orderIndex: 18,
    startTime: 325.0,
    endTime: 345.0,
    text: "Deal! You help me locate my family in the Open Ocean exhibit, and the tag is all yours.",
    translationVi: "Chốt kèo luôn! Anh giúp tôi xác định vị trí gia đình tôi trong khu trưng bày Đại Dương Mở, và chiếc thẻ sẽ thuộc trọn vẹn về anh.",
    ipaUs: "/diːl! juː hɛlp miː ˈloʊkeɪt maɪ ˈfæməli ɪn ði ˈoʊpən ˈoʊʃən ɪɡˈzɪbɪt, ænd ðə tæɡ ɪz ɔːl jʊərz./",
    keywords: ["deal", "Open Ocean exhibit", "all yours"],
    explanationAi: "Thuật ngữ thương lượng giao dịch 'Deal!' (Thỏa thuận đã xong!) và 'all yours' (hoàn toàn thuộc về bạn).",
    properNouns: ["Open Ocean"]
  },
  {
    orderIndex: 19,
    startTime: 348.0,
    endTime: 360.0,
    text: "Just get in the coffee pot, and don't make a sound.",
    translationVi: "Chỉ cần chui vào ấm pha cà phê này, và tuyệt đối không được phát ra tiếng động nào.",
    ipaUs: "/dʒʌst ɡɛt ɪn ðə ˈkɑːfi pɑːt, ænd doʊnt meɪk ə saʊnd./",
    keywords: ["coffee pot", "make a sound"],
    explanationAi: "Hình ảnh chiếc bình pha cà phê thủy tinh đựng nước - phương tiện vận chuyển ngộ nghĩnh đặc sắc xuyên suốt viện nghiên cứu.",
    properNouns: []
  },
  {
    orderIndex: 20,
    startTime: 365.0,
    endTime: 385.0,
    text: "Ooh, look at you! You can camouflage! You completely blended in with the wall!",
    translationVi: "Ồ, nhìn anh kìa! Anh có thể ngụy trang được! Anh đã hòa lẫn hoàn toàn vào bức tường luôn rồi!",
    ipaUs: "/uː, lʊk æt juː! juː kæn ˈkæməˌflɑːʒ! juː kəmˈpliːtli ˈblɛndɪd ɪn wɪð ðə wɔːl!/",
    keywords: ["camouflage", "blended in"],
    explanationAi: "Động từ sinh học đặc trưng của loài bạch tuộc 'camouflage' (ngụy trang biến đổi sắc tố) và cụm 'blend in with' (hòa nhập tiệp màu với môi trường).",
    properNouns: []
  },

  // Chapter 6: Destiny & Bailey's Sonar (21 - 25)
  {
    orderIndex: 21,
    startTime: 395.0,
    endTime: 415.0,
    text: "Dory! Is that really you? We used to talk through the pipes when we were little!",
    translationVi: "Dory! Có thật là cậu đấy không? Hồi nhỏ tụi mình từng trò chuyện qua những đường ống dẫn nước suốt mà!",
    ipaUs: "/ˈdɔːri! ɪz ðæt ˈriːəli juː? wiː juːst tuː tɔːk θruː ðə paɪps wɛn wiː wɜːr ˈlɪtəl!/",
    keywords: ["talk through the pipes", "when we were little"],
    explanationAi: "Cấu trúc quá khứ thói quen 'used to talk' gợi nhắc tình bạn thời thơ ấu ngọt ngào giữa Dory và cô cá nhám voi Destiny.",
    properNouns: ["Dory"]
  },
  {
    orderIndex: 22,
    startTime: 418.0,
    endTime: 432.0,
    text: "Destiny! My pipe pal! You're a whale shark!",
    translationVi: "Destiny! Cô bạn đường ống của tôi! Cậu là một chú cá nhám voi khổng lồ cơ à!",
    ipaUs: "/ˈdɛstəni! maɪ paɪp pæl! jʊr ə weɪl ʃɑːrk!/",
    keywords: ["pipe pal", "whale shark"],
    explanationAi: "Lối nói biến tấu hóm hỉnh 'pipe pal' (bạn tâm giao qua đường ống, phỏng theo pen pal - bạn qua thư) và danh từ loài 'whale shark'.",
    properNouns: ["Destiny"]
  },
  {
    orderIndex: 23,
    startTime: 435.0,
    endTime: 455.0,
    text: "I know! And I'm really clumsy because I'm completely nearsighted! I keep swimming into walls!",
    translationVi: "Tớ biết chứ! Và tớ hậu đậu khủng khiếp vì tớ bị cận thị nặng! Tớ cứ bơi tông sầm sầm vào các bức tường suốt thôi!",
    ipaUs: "/aɪ noʊ! ænd aɪm ˈriːəli ˈklʌmzi bɪˈkəz aɪm kəmˈpliːtli ˈnɪrˌsaɪtɪd! aɪ kiːp ˈswɪmɪŋ ˈɪntuː wɔːlz!/",
    keywords: ["clumsy", "nearsighted", "swimming into walls"],
    explanationAi: "Tính từ tật khúc xạ thị giác 'nearsighted' (cận thị) và tính cách 'clumsy' (vụng về, hậu đậu) tạo nên nét đáng yêu của Destiny.",
    properNouns: []
  },
  {
    orderIndex: 24,
    startTime: 458.0,
    endTime: 472.0,
    text: "My head hurts! My echolocation is completely broken!",
    translationVi: "Đầu tôi đau buốt cả lên rồi! Khả năng định vị bằng sóng âm của tôi hỏng bét hoàn toàn rồi!",
    ipaUs: "/maɪ hɛd hɜːrts! maɪ ˌɛkoʊloʊˈkeɪʃən ɪz kəmˈpliːtli ˈbroʊkən!/",
    keywords: ["echolocation", "completely broken"],
    explanationAi: "Thuật ngữ sinh học động vật biển 'echolocation' (khả năng định vị thủy âm bằng sóng phản hồi) của cá voi trắng beluga.",
    properNouns: []
  },
  {
    orderIndex: 25,
    startTime: 475.0,
    endTime: 488.0,
    text: "It's not broken, Bailey! You just have to believe in your sonar!",
    translationVi: "Nó không hề bị hỏng đâu, Bailey! Cậu chỉ cần có niềm tin vào hệ thống sóng âm sonar của mình thôi!",
    ipaUs: "/ɪts nɑːt ˈbroʊkən, ˈbeɪli! juː dʒʌst hæv tuː bɪˈliːv ɪn jʊər ˈsoʊnɑːr!/",
    keywords: ["believe in", "sonar"],
    explanationAi: "Từ đồng nghĩa kỹ thuật 'sonar' (thiết bị/khả năng phát và nhận sóng siêu âm định vị dưới nước) và thông điệp vượt qua rào cản tâm lý.",
    properNouns: ["Bailey"]
  },

  // Chapter 7: Sea Lions, Becky & Pipeline Escape (26 - 35)
  {
    orderIndex: 26,
    startTime: 492.0,
    endTime: 508.0,
    text: "Off! Off! Off! Off! Gerald, get off our rock!",
    translationVi: "Cút xéo! Cút ngay! Gerald, biến khỏi tảng đá của bọn ta mau!",
    ipaUs: "/ɔːf! ɔːf! ɔːf! ɔːf! ˈdʒɛrəld, ɡɛt ɔːf ˈaʊər rɑːk!/",
    keywords: ["get off our rock"],
    explanationAi: "Tiếng sủa xua đuổi lãnh thổ mang tính biểu tượng hài hước của hai chú sư tử biển Fluke và Rudder đối với chú hải cẩu ngơ ngác Gerald.",
    properNouns: ["Gerald"]
  },
  {
    orderIndex: 27,
    startTime: 512.0,
    endTime: 530.0,
    text: "You need to get inside the institute? You need Becky! She's a loon!",
    translationVi: "Hai người muốn đột nhập vào bên trong viện ư? Vậy thì cần tới Becky rồi! Cô ấy là một chú chim lặn mỏ đen!",
    ipaUs: "/juː niːd tuː ɡɛt ɪnˈsaɪd ði ˈɪnstəˌtuːt? juː niːd ˈbɛki! ʃiːz ə luːn!/",
    keywords: ["get inside", "a loon"],
    explanationAi: "Chơi chữ hai nghĩa: 'loon' là tên loài chim lặn phương bắc (chim loon), đồng thời trong khẩu ngữ tiếng Anh 'loon' mang nghĩa người lập dị, kỳ quặc.",
    properNouns: ["Becky"]
  },
  {
    orderIndex: 28,
    startTime: 535.0,
    endTime: 550.0,
    text: "Just make eye contact and imprint on her! Don't break the stare!",
    translationVi: "Chỉ cần giao tiếp bằng ánh mắt và tạo dấu ấn ghi nhớ trong tâm trí cô ấy! Tuyệt đối không được rời mắt đi!",
    ipaUs: "/dʒʌst meɪk aɪ ˈkɑːntækt ænd ɪmˈprɪnt ɑːn hɜːr! doʊnt breɪk ðə stɛr!/",
    keywords: ["make eye contact", "imprint on her", "break the stare"],
    explanationAi: "Thuật ngữ tập tính học động vật 'imprint on' (hiện tượng khắc vết/ghi dấu trong não chim non đối với cá thể đầu tiên nhìn thấy).",
    properNouns: []
  },
  {
    orderIndex: 29,
    startTime: 555.0,
    endTime: 568.0,
    text: "Roo-roo! Look at me, Becky, roo-roo!",
    translationVi: "Roo-roo! Nhìn tôi này Becky, roo-roo!",
    ipaUs: "/ruː-ruː! lʊk æt miː, ˈbɛki, ruː-ruː!/",
    keywords: ["look at me"],
    explanationAi: "Âm thanh bắt chước hài hước mà Marlin buộc phải phát ra để thu hút sự chú ý của chú chim lặn Becky.",
    properNouns: ["Becky"]
  },
  {
    orderIndex: 30,
    startTime: 572.0,
    endTime: 585.0,
    text: "It worked, Dad! She's picking up the bucket!",
    translationVi: "Có tác dụng rồi kìa bố! Cô ấy đang cắp chiếc xô nước bay lên rồi!",
    ipaUs: "/ɪt wɜːrkt, dæd! ʃiːz ˈpɪkɪŋ ʌp ðə ˈbʌkɪt!/",
    keywords: ["it worked", "picking up the bucket"],
    explanationAi: "Cụm động từ 'pick up' (nhặt lên, quắp lấy chiếc xô) đưa hai chú cá hề bay qua bầu trời California.",
    properNouns: []
  },
  {
    orderIndex: 31,
    startTime: 590.0,
    endTime: 605.0,
    text: "We're flying through the air! Don't look down, Nemo!",
    translationVi: "Bố con mình đang bay lơ lửng giữa bầu trời này! Đừng nhìn xuống dưới nhé Nemo!",
    ipaUs: "/wɪr ˈflaɪɪŋ θruː ði ɛr! doʊnt lʊk daʊn, ˈniːmoʊ!/",
    keywords: ["flying through the air", "don't look down"],
    explanationAi: "Lời cảnh báo thót tim của Marlin khi chứng kiến viễn cảnh khó tin: sinh vật biển biết bay trên không trung.",
    properNouns: ["Nemo"]
  },
  {
    orderIndex: 32,
    startTime: 648.0,
    endTime: 670.0,
    text: "Don't panic. What would Dory do? If life gets you down, you just keep swimming!",
    translationVi: "Đừng hoảng sợ. Dory sẽ làm gì trong tình huống này nhỉ? Nếu cuộc đời dìm bạn xuống, bạn chỉ việc bơi tiếp thôi!",
    ipaUs: "/doʊnt ˈpænɪk. wʌt wʊd ˈdɔːri duː? ɪf laɪf ɡɛts juː daʊn, juː dʒʌst kiːp ˈswɪmɪŋ!/",
    keywords: ["don't panic", "what would Dory do", "just keep swimming"],
    explanationAi: "Khẩu hiệu tự vấn bản thân 'What would Dory do?' (Dory sẽ làm gì?) trở thành kim chỉ nam tư duy lạc quan vượt qua mê cung tối tăm.",
    properNouns: ["Dory"]
  },
  {
    orderIndex: 33,
    startTime: 692.0,
    endTime: 715.0,
    text: "Oooohhh! The glasses are off! I can see the whole pipeline through the walls!",
    translationVi: "Oooohhh! Kính đã được tháo ra rồi! Tớ có thể nhìn xuyên thấu toàn bộ hệ thống đường ống qua các bức tường!",
    ipaUs: "/uːː! ðə ˈɡlæsɪz ɑːr ɔːf! aɪ kæn siː ðə hoʊl ˈpaɪpˌlaɪn θruː ðə wɔːlz!/",
    keywords: ["glasses are off", "pipeline", "through the walls"],
    explanationAi: "Hình ảnh ẩn dụ 'The glasses are off' (kính đã bỏ ra - ám chỉ tầm nhìn sóng âm siêu phàm được giải phóng tối đa).",
    properNouns: []
  },
  {
    orderIndex: 34,
    startTime: 720.0,
    endTime: 738.0,
    text: "Dory, turn left at the next valve! You're almost in the ocean!",
    translationVi: "Dory, rẽ trái ở van nước tiếp theo! Cậu sắp sửa ra tới biển lớn rồi!",
    ipaUs: "/ˈdɔːri, tɜːrn lɛft æt ðə nɛkst vælv! jʊr ˈɔːlˌmoʊst ɪn ði ˈoʊʃən!/",
    keywords: ["turn left", "next valve", "almost in the ocean"],
    explanationAi: "Từ vựng hệ thống cấp thoát nước 'valve' (van điều tiết dòng chảy) và lời chỉ dẫn cứu nguy kịp thời.",
    properNouns: ["Dory"]
  },
  {
    orderIndex: 35,
    startTime: 745.0,
    endTime: 765.0,
    text: "Where is everybody? Did I lose them again? Please, someone help me...",
    translationVi: "Mọi người đâu hết cả rồi? Mình lại làm lạc mất họ nữa rồi sao? Làm ơn, có ai giúp tôi với...",
    ipaUs: "/wɛr ɪz ˈɛvriˌbɑːdi? dɪd aɪ luːz ðɛm əˈɡɛn? pliːz, ˈsʌmˌwʌn hɛlp miː.../",
    keywords: ["where is everybody", "lose them again"],
    explanationAi: "Nỗi sợ hãi tột cùng của sự chia ly và quên lãng khi trôi dạt ra đại dương mênh mông một mình.",
    properNouns: []
  },

  // Chapter 8: The Seashell Trail & Reunion with Parents (36 - 41)
  {
    orderIndex: 36,
    startTime: 795.0,
    endTime: 815.0,
    text: "Wait... Shells. Beautiful purple shells, neatly laid out in lines spreading out in all directions.",
    translationVi: "Chờ chút đã... Vỏ sò. Những chiếc vỏ sò màu tím tuyệt đẹp, được xếp ngay ngắn thành từng hàng tỏa ra khắp mọi hướng.",
    ipaUs: "/weɪt... ʃɛlz. ˈbjuːtəfəl ˈpɜːrpəl ʃɛlz, ˈniːtli leɪd aʊt ɪn laɪnz ˈsprɛdɪŋ aʊt ɪn ɔːl dəˈrɛkʃənz./",
    keywords: ["purple shells", "laid out in lines", "all directions"],
    explanationAi: "Cụm miêu tả không gian 'neatly laid out' (được sắp xếp ngăn nắp thành hàng lối) đánh thức ký ức thuở ấu thơ.",
    properNouns: []
  },
  {
    orderIndex: 37,
    startTime: 820.0,
    endTime: 835.0,
    text: "They're forming a path... Just like Dad said. Follow the shells all the way home.",
    translationVi: "Chúng đang tạo thành một lối đi... Đúng như lời bố đã dặn. Hãy lần theo những chiếc vỏ sò là sẽ về tới nhà.",
    ipaUs: "/ðɛr ˈfɔːrmɪŋ ə pæθ... dʒʌst laɪk dæd sɛd. ˈfɑːloʊ ðə ʃɛlz ɔːl ðə weɪ hoʊm./",
    keywords: ["forming a path", "just like Dad said", "follow the shells"],
    explanationAi: "Sự liên kết cảm xúc trọn vẹn: lời dạy bảo của người cha năm xưa trở thành ánh sáng dẫn đường đưa Dory trở về cội nguồn.",
    properNouns: []
  },
  {
    orderIndex: 38,
    startTime: 840.0,
    endTime: 852.0,
    text: "Dory? Is it really you, our sweet little kelpcake?",
    translationVi: "Dory? Có phải con thật không, bé bánh tảo bẹ ngọt ngào của bố mẹ?",
    ipaUs: "/ˈdɔːri? ɪz ɪt ˈriːəli juː, ˈaʊər swiːt ˈlɪtəl ˈkɛlpˌkeɪk?/",
    keywords: ["kelpcake", "sweet little"],
    explanationAi: "Biệt danh âu yếm độc đáo 'kelpcake' (ghép giữa kelp - tảo biển và cake - bánh ngọt), cách gọi nựng yêu thương của cha mẹ Dory.",
    properNouns: ["Dory"]
  },
  {
    orderIndex: 39,
    startTime: 855.0,
    endTime: 865.0,
    text: "We knew you'd come home! We never gave up hope!",
    translationVi: "Bố mẹ biết chắc con sẽ tìm được đường về nhà mà! Bố mẹ chưa bao giờ từ bỏ hy vọng!",
    ipaUs: "/wiː nuː juːd kʌm hoʊm! wiː ˈnɛvər ɡeɪv ʌp hoʊp!/",
    keywords: ["come home", "never gave up hope"],
    explanationAi: "Thành ngữ biểu thị lòng kiên định bất diệt 'never gave up hope' (không bao giờ từ bỏ niềm hy vọng).",
    properNouns: []
  },
  {
    orderIndex: 40,
    startTime: 868.0,
    endTime: 888.0,
    text: "We laid out trails of shells every single day, hoping you would follow them back to us.",
    translationVi: "Bố mẹ đã rải những vệt vỏ sò mỗi ngày suốt bao năm qua, hy vọng rằng con sẽ lần theo chúng để trở về bên bố mẹ.",
    ipaUs: "/wiː leɪd aʊt treɪlz ʌv ʃɛlz ˈɛvri ˈsɪŋɡəl deɪ, ˈhoʊpɪŋ juː wʊd ˈfɑːloʊ ðɛm bæk tuː ʌs./",
    keywords: ["trails of shells", "every single day", "follow them back"],
    explanationAi: "Hành động thể hiện tình yêu thương vô bờ bến: kiên trì rải vỏ sò từng ngày không ngừng nghỉ để bù đắp cho chứng đãng trí của con gái.",
    properNouns: []
  },
  {
    orderIndex: 41,
    startTime: 890.0,
    endTime: 905.0,
    text: "Mom! Dad! You remembered me! I found you!",
    translationVi: "Mẹ ơi! Bố ơi! Bố mẹ vẫn nhớ con! Con đã tìm thấy bố mẹ rồi!",
    ipaUs: "/mɑːm! dæd! juː rɪˈmɛmbərd miː! aɪ faʊnd juː!/",
    keywords: ["remembered me", "I found you"],
    explanationAi: "Khoảnh khắc vỡ òa đoàn tụ gia đình sau bao năm tháng lưu lạc cô độc giữa đại dương bao la.",
    properNouns: []
  },

  // Chapter 9 & 10: The Highway Truck Heist & Return to Reef (42 - 49)
  {
    orderIndex: 42,
    startTime: 910.0,
    endTime: 928.0,
    text: "Marlin and Nemo are trapped in that truck heading to Cleveland! We have to save them!",
    translationVi: "Marlin và Nemo đang bị mắc kẹt trong chiếc xe tải hướng về Cleveland kia! Chúng ta phải giải cứu họ thôi!",
    ipaUs: "/ˈmɑːrlɪn ænd ˈniːmoʊ ɑːr træpt ɪn ðæt trʌk ˈhɛdɪŋ tuː ˈkliːvlənd! wiː hæv tuː seɪv ðɛm!/",
    keywords: ["trapped", "heading to Cleveland", "save them"],
    explanationAi: "Tình thế hiểm nghèo: bạn bè bị giam cầm trong xe vận chuyển đường bộ và cuộc chạy đua giải cứu.",
    properNouns: ["Marlin", "Nemo", "Cleveland"]
  },
  {
    orderIndex: 43,
    startTime: 932.0,
    endTime: 950.0,
    text: "Hit the gas, Dory? I don't have a license, and I don't have feet!",
    translationVi: "Nhấn ga ư, Dory? Tôi làm gì có bằng lái xe, và tôi cũng đâu có chân!",
    ipaUs: "/hɪt ðə ɡæs, ˈdɔːri? aɪ doʊnt hæv ə ˈlaɪsəns, ænd aɪ doʊnt hæv fiːt!/",
    keywords: ["hit the gas", "license", "feet"],
    explanationAi: "Thành ngữ lái xe 'hit the gas' (đạp ga tăng tốc) và phản ứng thực tế hài hước của một chú bạch tuộc lái xe tải.",
    properNouns: ["Dory"]
  },
  {
    orderIndex: 44,
    startTime: 955.0,
    endTime: 975.0,
    text: "You don't need feet, Hank! Just use your tentacles on the pedals and steer the wheel!",
    translationVi: "Anh đâu cần chân làm gì, Hank! Cứ dùng các xúc tu của anh nhấn bàn đạp và vần vô lăng là được!",
    ipaUs: "/juː doʊnt niːd fiːt, hæŋk! dʒʌst juːz jʊər ˈtɛntəkəlz ɑːn ðə ˈpɛdəlz ænd stɪr ðə wiːl!/",
    keywords: ["tentacles", "pedals", "steer the wheel"],
    explanationAi: "Từ vựng cơ khí lái xe: 'pedals' (bàn đạp ga/phanh) và 'steer the wheel' (điều khiển vô lăng).",
    properNouns: ["Hank"]
  },
  {
    orderIndex: 45,
    startTime: 980.0,
    endTime: 1002.0,
    text: "Hang on to your suction cups! We're driving this truck into the bay!",
    translationVi: "Bám chặt vào các giác hút đi! Chúng ta chuẩn bị lao thẳng chiếc xe tải này xuống vịnh biển đây!",
    ipaUs: "/hæŋ ɑːn tuː jʊər ˈsʌkʃən kʌps! wɪr ˈdraɪvɪŋ ðɪs trʌk ˈɪntuː ðə beɪ!/",
    keywords: ["hang on", "suction cups", "into the bay"],
    explanationAi: "Cụm thành ngữ khẩu ngữ 'hang on' (bám chắc vào) kết hợp danh từ sinh học 'suction cups' (các giác hút trên xúc tu bạch tuộc).",
    properNouns: []
  },
  {
    orderIndex: 46,
    startTime: 1045.0,
    endTime: 1065.0,
    text: "You did it, Dory. You found your family, all on your own.",
    translationVi: "Cô đã làm được rồi, Dory. Cô đã tự mình tìm lại được gia đình ruột thịt của mình.",
    ipaUs: "/juː dɪd ɪt, ˈdɔːri. juː faʊnd jʊər ˈfæməli, ɔːl ɑːn jʊər oʊn./",
    keywords: ["you did it", "all on your own"],
    explanationAi: "Lời khen ngợi và công nhận chân thành của Marlin: thành ngữ 'all on your own' (hoàn toàn tự thân vận động).",
    properNouns: ["Dory"]
  },
  {
    orderIndex: 47,
    startTime: 1070.0,
    endTime: 1092.0,
    text: "No, Marlin, I didn't do it alone. I had you, and Nemo, and Hank, and Destiny, and Bailey.",
    translationVi: "Không đâu Marlin, tôi không hề làm điều đó một mình. Tôi đã có anh, có Nemo, có Hank, có Destiny và cả Bailey nữa.",
    ipaUs: "/noʊ, ˈmɑːrlɪn, aɪ ˈdɪdənt duː ɪt əˈloʊn. aɪ hæd juː, ænd ˈniːmoʊ, ænd hæŋk, ænd ˈdɛstəni, ænd ˈbeɪli./",
    keywords: ["not alone", "had you"],
    explanationAi: "Triết lý gia đình lựa chọn (Found family): Sức mạnh không đến từ cá nhân đơn độc mà từ tình yêu thương tương trợ của những người bạn tri kỷ.",
    properNouns: ["Marlin", "Nemo", "Hank", "Destiny", "Bailey"]
  },
  {
    orderIndex: 48,
    startTime: 1095.0,
    endTime: 1108.0,
    text: "And now, I remember. And it's unforgettable.",
    translationVi: "Và giờ đây, tôi đã nhớ ra tất cả rồi. Và đó là những điều không bao giờ có thể lãng quên.",
    ipaUs: "/ænd naʊ, aɪ rɪˈmɛmbər. ænd ɪts ˌʌnfərˈɡɛtəbəl./",
    keywords: ["I remember", "unforgettable"],
    explanationAi: "Cú đảo ngược ngôn từ tuyệt diệu: Một kẻ mắc chứng mất trí nhớ kinh niên khẳng định điều thiêng liêng nhất là 'unforgettable' (không bao giờ quên).",
    properNouns: []
  },
  {
    orderIndex: 49,
    startTime: 1110.0,
    endTime: 1117.0,
    text: "Yes, Dory. It's completely unforgettable. Now let's go see the view.",
    translationVi: "Phải rồi, Dory. Điều đó hoàn toàn không thể lãng quên. Giờ thì cùng ra ngắm cảnh biển nào.",
    ipaUs: "/jɛs, ˈdɔːri. ɪts kəmˈpliːtli ˌʌnfərˈɡɛtəbəl. naʊ lɛts ɡoʊ siː ðə vjuː./",
    keywords: ["completely unforgettable", "see the view"],
    explanationAi: "Khép lại bộ phim bằng sự tĩnh lặng, bình yên nơi mép vực thẳm đại dương bên những người thân yêu nhất.",
    properNouns: ["Dory"]
  }
];

// Token count synchronization with exact JS regex
segments.forEach((s) => {
  s.tokenCount = (s.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
});

console.log(`Generated ${segments.length} pure segments for Finding Dory.`);
segments.forEach((s, i) => {
  console.log(`Seg ${i}: tokens=${s.tokenCount}, start=${s.startTime}, end=${s.endTime}, text="${s.text.substring(0, 35)}..."`);
});

fs.writeFileSync('scripts/dory_pure_segments.json', JSON.stringify(segments, null, 2), 'utf-8');
console.log('Saved scripts/dory_pure_segments.json successfully!');
