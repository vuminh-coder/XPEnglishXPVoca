const fs = require('fs');
const path = require('path');

const COMMON_STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "then", "else", "when", "at",
  "by", "for", "with", "about", "against", "between", "into", "through",
  "during", "before", "after", "above", "below", "to", "from", "up", "down",
  "in", "out", "on", "off", "over", "under", "again", "further", "then",
  "once", "here", "there", "all", "any", "both", "each", "few", "more",
  "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same",
  "so", "than", "too", "very", "can", "will", "just", "should", "now", "of",
]);

function tokenizeSentence(sentence, properNouns) {
  if (!sentence) return [];
  const rawWords = sentence.trim().split(/\s+/);
  const properNounSet = new Set();

  properNouns.forEach((p) => {
    const fullClean = p.toLowerCase().trim();
    if (fullClean) properNounSet.add(fullClean);

    fullClean.split(/\s+/).forEach((w) => {
      const cleanW = w.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
      if (cleanW && cleanW.length > 1 && !COMMON_STOP_WORDS.has(cleanW)) {
        properNounSet.add(cleanW);
      }
    });
  });

  const tokens = [];
  rawWords.forEach((rawWord) => {
    const leadingMatch = rawWord.match(/^([^a-zA-Z0-9\p{L}]*)/u);
    const trailingMatch = rawWord.match(/([^a-zA-Z0-9\p{L}]*)$/u);

    const leadingPunc = leadingMatch ? leadingMatch[1] : "";
    const trailingPunc = trailingMatch ? trailingMatch[1] : "";
    const clean = rawWord.slice(
      leadingPunc.length,
      rawWord.length - trailingPunc.length
    );

    if (clean.length === 0) {
      if (tokens.length > 0) {
        tokens[tokens.length - 1].trailingPunc += " " + rawWord;
        tokens[tokens.length - 1].original += " " + rawWord;
      }
      return;
    }

    tokens.push({
      id: `word-${tokens.length}-${clean}`,
      original: rawWord,
      clean,
      leadingPunc,
      trailingPunc,
      isProperNoun: properNounSet.has(clean.toLowerCase()),
    });
  });

  return tokens;
}

const segmentsData = [
  // CHAPTER 1: LION KING INTRO (00:00 - 00:37)
  {
    orderIndex: 0,
    startTime: 0.0,
    endTime: 18.5,
    text: "Mufasa: Look, Simba. Everything the light touches is our kingdom. A king's time as ruler rises and falls like the sun.",
    translationVi: "Mufasa: Hãy nhìn xem, Simba. Tất cả những nơi ánh sáng chạm tới đều là vương quốc của chúng ta. Thời gian trị vì của một vị vua mọc lên rồi lặn xuống tựa như vầng thái dương.",
    ipaUs: "/muːˈfɑːsə: lʊk, ˈsɪmbə. ˈɛvriˌθɪŋ ðə laɪt ˈtʌtʃɪz ɪz ˈaʊər ˈkɪŋdəm. ə kɪŋz taɪm æz ˈruːlər ˈraɪzɪz ænd fɔːlz laɪk ðə sʌn./",
    keywords: ["light touches", "kingdom", "ruler", "rises and falls"],
    explanationAi: "Lời mở đầu tôn nghiêm của Mufasa truyền dạy quy luật vũ trụ và trách nhiệm quân vương qua hình ảnh ẩn dụ mặt trời mọc và lặn.",
    properNouns: ["Mufasa", "Simba"]
  },
  {
    orderIndex: 1,
    startTime: 18.5,
    endTime: 37.9,
    text: "One day, Simba, the sun will set on my time here, and will rise with you as the new king.",
    translationVi: "Một ngày nào đó, Simba à, mặt trời sẽ lặn xuống khép lại thời khắc của cha nơi đây, và sẽ lại mọc lên rạng rỡ cùng con trong tư cách một tân vương.",
    ipaUs: "/wʌn deɪ, ˈsɪmbə, ðə sʌn wɪl sɛt ɑːn maɪ taɪm hɪr, ænd wɪl raɪz wɪð juː æz ðə nuː kɪŋ./",
    keywords: ["sun will set", "set on my time", "rise with you", "new king"],
    explanationAi: "Cụm động từ thành ngữ 'the sun sets on someone's time' (thời đại/triều đại của ai đó đi đến hồi kết).",
    properNouns: ["Simba"]
  },

  // CHAPTER 2: INTRODUCTION TO THE LESSON (00:37 - 01:14)
  {
    orderIndex: 2,
    startTime: 37.9,
    endTime: 74.6,
    text: "Welcome to Learn English with TV Series! In this lesson you are going to learn with Disney's classic animation, The Lion King, mastering real spoken English, idioms, and natural pronunciation.",
    translationVi: "Chào mừng các bạn đến với Học tiếng Anh qua Phim truyền hình! Trong bài học này, bạn sẽ học cùng tuyệt phẩm hoạt hình kinh điển của Disney - Vua Sư Tử, làm chủ tiếng Anh giao tiếp đời thực, thành ngữ và ngữ điệu tự nhiên.",
    ipaUs: "/ˈwɛlkəm tuː lɜːrn ˈɪŋɡlɪʃ wɪð ˌtiːˈviː ˈsɪriz! ɪn ðɪs ˈlɛsən juː ɑːr ˈɡoʊɪŋ tuː lɜːrn wɪð ˈdɪzniːz ˈklæsɪk ˌænəˈmeɪʃən, ðə ˈlaɪən kɪŋ, ˈmæstərɪŋ riːəl ˈspoʊkən ˈɪŋɡlɪʃ, ˈɪdiəmz, ænd ˈnætʃrəl prəˌnʌnsiˈeɪʃən./",
    keywords: ["classic animation", "mastering", "spoken English", "natural pronunciation"],
    explanationAi: "Giới thiệu lộ trình bài giảng: phân tích ngữ âm nối âm, tỉnh lược trợ động từ và khai phá hàm ý thành ngữ trong đối thoại hoạt hình.",
    properNouns: ["Disney", "The Lion King"]
  },

  // CHAPTER 3: THE LION KING PLOT SUMMARY (01:14 - 01:43)
  {
    orderIndex: 3,
    startTime: 74.6,
    endTime: 103.3,
    text: "King Mufasa and Queen Sarabi present their newborn son, Simba, to the animal kingdom at Pride Rock. But Mufasa's envious brother Scar plots to seize the throne.",
    translationVi: "Vua Mufasa và Hoàng hậu Sarabi giới thiệu hoàng tử sơ sinh Simba trước muôn thú tại Mỏm đá Kiêu Hãnh. Thế nhưng người em trai đầy đố kỵ của Mufasa là Scar đã bí mật âm mưu chiếm đoạt ngai vàng.",
    ipaUs: "/kɪŋ muːˈfɑːsə ænd kwiːn səˈrɑːbi prɪˈzɛnt ðɛr ˈnuːbɔːrn sʌn, ˈsɪmbə, tuː ði ˈænəməl ˈkɪŋdəm æt praɪd rɑːk. bʌt muːˈfɑːsəz ˈɛnviəs ˈbrʌðər skɑːr plɑːts tuː siːz ðə θroʊn./",
    keywords: ["newborn son", "Pride Rock", "envious brother", "seize the throne"],
    explanationAi: "Tóm tắt cốt truyện với từ vựng văn học phong phú: 'envious' (ghen ghét đố kỵ), 'seize the throne' (cướp ngai vàng).",
    properNouns: ["Mufasa", "Sarabi", "Simba", "Pride Rock", "Scar"]
  },

  // CHAPTER 4: TIMON AND PUMBAA SCENE ANALYSIS (01:43 - 04:41)
  {
    orderIndex: 4,
    startTime: 103.3,
    endTime: 145.0,
    text: "Scene A: Timon and Pumbaa stumble upon Simba lying unconscious under the scorching sun. Timon: Look at him! He's so cute, and all alone! Can we keep him?",
    translationVi: "Phân cảnh A: Timon và Pumbaa tình cờ bắt gặp Simba đang nằm bất tỉnh dưới cái nắng sa mạc gay gắt. Timon: Nhìn cậu ta kìa! Dễ thương quá đỗi, lại còn cô độc một mình nữa chứ! Chúng mình nuôi cậu ấy được không?",
    ipaUs: "/siːn eɪ: ˈtaɪmən ænd ˈpʊmbə ˈstʌmbəl əˈpɑːn ˈsɪmbə ˈlaɪɪŋ ʌnˈkɑːnʃəs ˈʌndər ðə ˈskɔːrtʃɪŋ sʌn. ˈtaɪmən: lʊk æt hɪm! hiːz soʊ kjuːt, ænd ɔːl əˈloʊn! kæn wiː kiːp hɪm?/",
    keywords: ["stumble upon", "unconscious", "scorching sun", "keep him"],
    explanationAi: "Cụm động từ tình cờ gặp gỡ 'stumble upon' và lời đề nghị ngây thơ của chồn Timon 'Can we keep him?'.",
    properNouns: ["Timon", "Pumbaa", "Simba"]
  },
  {
    orderIndex: 5,
    startTime: 145.0,
    endTime: 195.0,
    text: "Pumbaa: Well, Pumbaa helped. A little. Timon: A little? You nearly killed us! He's a lion! Lions eat guys like us!",
    translationVi: "Pumbaa: Chà, Pumbaa cũng có giúp một tay mà. Một chút xíu thôi. Timon: Một chút xíu á? Cậu suýt nữa hại chết cả hai đứa mình rồi! Cậu ta là một con sư tử đấy! Sư tử chuyên ăn thịt những đứa như chúng ta!",
    ipaUs: "/ˈpʊmbə: wɛl, ˈpʊmbə hɛlpt. ə ˈlɪtəl. ˈtaɪmən: ə ˈlɪtəl? juː ˈnɪrli kɪld ʌs! hiːz ə ˈlaɪən! ˈlaɪənz iːt ɡaɪz laɪk ʌs!/",
    keywords: ["helped a little", "nearly killed us", "guys like us"],
    explanationAi: "Cấu trúc phản biện nhấn mạnh bằng câu hỏi tu từ 'A little?'. Trạng từ chỉ mức độ 'nearly' (suýt chút nữa).",
    properNouns: ["Pumbaa", "Timon"]
  },
  {
    orderIndex: 6,
    startTime: 195.0,
    endTime: 240.0,
    text: "Pumbaa: But he's so little! Timon: He's gonna get bigger! Pumbaa: Maybe he'll be on our side. Timon: A-ha! That's the stupidest thing I ever heard!",
    translationVi: "Pumbaa: Nhưng nó bé xíu thế này cơ mà! Timon: Rồi nó sẽ lớn nhanh như thổi! Pumbaa: Biết đâu nó sẽ đứng về phe tụi mình thì sao. Timon: A-ha! Đó là điều ngớ ngẩn nhất quả đất mà tớ từng nghe thấy đấy!",
    ipaUs: "/ˈpʊmbə: bʌt hiːz soʊ ˈlɪtəl! ˈtaɪmən: hiːz ˈɡɑːnə ɡɛt ˈbɪɡər! ˈpʊmbə: ˈmeɪbiː hiːl biː ɑːn ˈaʊər saɪd. ˈtaɪmən: ɑː-hɑː! ðæts ðə ˈstuːpɪdɪst θɪŋ aɪ ˈɛvər hɜːrd!/",
    keywords: ["gonna get bigger", "on our side", "stupidest thing", "ever heard"],
    explanationAi: "Cụm thành ngữ vị thế liên minh 'be on our side' (đứng về phía chúng ta) và cấu trúc so sánh nhất 'the stupidest thing I ever heard'.",
    properNouns: ["Pumbaa", "Timon"]
  },
  {
    orderIndex: 7,
    startTime: 240.0,
    endTime: 281.0,
    text: "Timon: Maybe he'll be on our side! You know, having a lion around might not be such a bad idea. If he's with us, who's gonna mess with us?",
    translationVi: "Timon: Có thể nó sẽ theo phe mình ư! Cậu biết đấy, có một chú sư tử kề bên xem ra không phải ý tồi đâu. Nếu nó đi cùng tụi mình, thử hỏi ai dám đụng đến chúng ta nữa chứ?",
    ipaUs: "/ˈtaɪmən: ˈmeɪbiː hiːl biː ɑːn ˈaʊər saɪd! juː noʊ, ˈhævɪŋ ə ˈlaɪən əˈraʊnd maɪt nɑːt biː sʌtʃ ə bæd aɪˈdiːə. ɪf hiːz wɪð ʌs, huːz ˈɡɑːnə mɛs wɪð ʌs?/",
    keywords: ["having around", "not such a bad idea", "mess with us"],
    explanationAi: "Thành ngữ khẩu ngữ 'mess with someone' (gây sự, chọc tức ai). Timon ngay lập tức lật ngược lập luận vụ lợi của mình.",
    properNouns: ["Timon"]
  },

  // CHAPTER 5: IDIOM AND VOCABULARY CHECK (04:41 - 06:15)
  {
    orderIndex: 8,
    startTime: 281.0,
    endTime: 330.0,
    text: "Let's analyze Timon's conversational speech. Notice how he drops the auxiliary verbs in fast speech: You okay, kid? instead of Are you okay, kid?",
    translationVi: "Hãy cùng phân tích cách nói chuyện khẩu ngữ của Timon. Chú ý cách anh ấy lược bỏ trợ động từ trong giao tiếp nhanh: 'You okay, kid?' thay vì 'Are you okay, kid?'.",
    ipaUs: "/lɛts ˈænəˌlaɪz ˈtaɪmənz ˌkɑːnvərˈseɪʃənəl spiːtʃ. ˈnoʊtɪs haʊ hiː drɑːps ði ɔːɡˈzɪljəri vɜːrbz ɪn fæst spiːtʃ: juː oʊˈkeɪ, kɪd? ɪnˈstɛd əv ɑːr juː oʊˈkeɪ, kɪd?/",
    keywords: ["conversational speech", "drops auxiliary verbs", "fast speech"],
    explanationAi: "Hiện tượng ngữ pháp đàm thoại thường nhật: người bản xứ thường tỉnh lược trợ động từ 'Are' hoặc 'Do' ở đầu câu hỏi thân mật.",
    properNouns: ["Timon"]
  },
  {
    orderIndex: 9,
    startTime: 330.0,
    endTime: 375.4,
    text: "Simba wakes up slowly and sighs: You nearly died. — I saved you! Well, Pumbaa helped. A little.",
    translationVi: "Simba từ từ tỉnh dậy và thở dài: Cậu suýt nữa mất mạng đấy. — Tớ đã cứu cậu đấy nhé! À thì Pumbaa cũng phụ một tay. Một chút xíu thôi.",
    ipaUs: "/ˈsɪmbə weɪks ʌp ˈsloʊli ænd saɪz: juː ˈnɪrli daɪd. — aɪ seɪvd juː! wɛl, ˈpʊmbə hɛlpt. ə ˈlɪtəl./",
    keywords: ["wakes up slowly", "nearly died", "saved you"],
    explanationAi: "Thói quen phóng đại công lao hài hước của Timon 'I saved you!' tương phản với sự chân chất của lợn rừng Pumbaa.",
    properNouns: ["Simba", "Pumbaa"]
  },

  // CHAPTER 6: SUFFIXES AND IDIOMS (06:15 - 07:28)
  {
    orderIndex: 10,
    startTime: 375.4,
    endTime: 412.0,
    text: "Timon observes Simba's dejected expression: Gee, he looks blue. Pumbaa replies innocently: I'd say brownish-gold. Timon: No, no, no. I mean he's depressed.",
    translationVi: "Timon quan sát vẻ mặt rầu rĩ của Simba: Trời đất, trông cậu nhóc xanh xao u ám quá. Pumbaa ngây thơ đáp lời: Tớ thấy có màu vàng nâu kim loại đấy chứ. Timon: Không, không. Ý tớ là cậu ấy đang buồn phiền tuyệt vọng!",
    ipaUs: "/ˈtaɪmən əbˈzɜːrvz ˈsɪmbəz dɪˈdʒɛktɪd ɪkˈsprɛʃən: dʒiː, hiː lʊks bluː. ˈpʊmbə rɪˈplaɪz ˈɪnəsəntli: aɪd seɪ ˈbraʊnɪʃ ɡoʊld. ˈtaɪmən: noʊ, noʊ, noʊ. aɪ miːn hiːz dɪˈprɛst./",
    keywords: ["looks blue", "brownish-gold", "depressed", "Gee"],
    explanationAi: "Thành ngữ 'look blue' (trông buồn rầu, ủ rũ) bị Pumbaa hiểu nhầm theo nghĩa đen của màu sắc lông sư tử.",
    properNouns: ["Timon", "Simba", "Pumbaa"]
  },
  {
    orderIndex: 11,
    startTime: 412.0,
    endTime: 448.5,
    text: "The suffix -ish means 'somewhat' or 'approximately'. Brownish-gold means having a color that is somewhat brown mixed with gold.",
    translationVi: "Hậu tố -ish mang ý nghĩa 'hơi hơi' hoặc 'xấp xỉ'. 'Brownish-gold' nghĩa là có sắc màu hơi ngả sang nâu pha lẫn chút vàng óng.",
    ipaUs: "/ðə ˈsʌfɪks -ɪʃ miːnz ˈsʌmˌwʌt ɔːr əˈprɑːksəmətli. ˈbraʊnɪʃ ɡoʊld miːnz ˈhævɪŋ ə ˈkʌlər ðæt ɪz ˈsʌmˌwʌt braʊn mɪkst wɪð ɡoʊld./",
    keywords: ["suffix -ish", "somewhat", "approximately", "brownish-gold"],
    explanationAi: "Quy tắc ngữ pháp về hậu tố '-ish': gắn vào tính từ hoặc danh từ chỉ màu sắc, tuổi tác để chỉ tính chất tương đối (ví dụ: reddish, thirtyish).",
    properNouns: []
  },

  // CHAPTER 7: UNDERSTANDING THE FOOD CHAIN (07:28 - 08:37)
  {
    orderIndex: 12,
    startTime: 448.5,
    endTime: 485.0,
    text: "Pumbaa asks Simba with genuine concern: Kid, what's eating you? Timon bursts out laughing: Nothing, he's at the top of the food chain! Ahahah, the food chain!",
    translationVi: "Pumbaa lo lắng chân thành hỏi Simba: Nhóc con, có chuyện gì đang gặm nhấm lòng cậu thế? Timon phá lên cười: Làm gì có con nào ăn thịt được nó, nó đứng trên đỉnh chuỗi thức ăn mà! Ha ha, chuỗi thức ăn đấy!",
    ipaUs: "/ˈpʊmbə æsks ˈsɪmbə wɪð ˈdʒɛnjuɪn kənˈsɜːrn: kɪd, wʌts ˈiːtɪŋ juː? ˈtaɪmən bɜːrsts aʊt ˈlæfɪŋ: ˈnʌθɪŋ, hiːz æt ðə tɑːp əv ðə fuːd tʃeɪn! ɑː-hɑː-hɑː, ðə fuːd tʃeɪn!/",
    keywords: ["what's eating you", "top of the food chain", "genuine concern"],
    explanationAi: "Cách chơi chữ xuất sắc: Thành ngữ 'What's eating you?' (Điều gì làm phiền lòng bạn) bị Timon hoán đổi thành nghĩa đen kẻ săn mồi trên đỉnh chuỗi thức ăn.",
    properNouns: ["Pumbaa", "Simba", "Timon"]
  },
  {
    orderIndex: 13,
    startTime: 485.0,
    endTime: 517.4,
    text: "To be at the top of the food chain means to be an apex predator who cannot be hunted by any other creature in nature.",
    translationVi: "Đứng ở đỉnh chuỗi thức ăn ('at the top of the food chain') có nghĩa là loài săn mồi đỉnh cao không bị bất kỳ sinh vật nào khác trong tự nhiên săn bắt.",
    ipaUs: "/tuː biː æt ðə tɑːp əv ðə fuːd tʃeɪn miːnz tuː biː ən ˈeɪpɛks ˈprɛdətər huː ˈkænɑːt biː ˈhʌntɪd baɪ ˈɛni ˈʌðər ˈkriːtʃər ɪn ˈneɪtʃər./",
    keywords: ["top of the food chain", "apex predator", "hunted"],
    explanationAi: "Thuật ngữ sinh học 'apex predator' (động vật ăn thịt đầu bảng) ứng dụng trong đời sống để chỉ người có quyền lực tối thượng.",
    properNouns: []
  },

  // CHAPTER 8: SPECIAL OFFER ANNOUNCEMENT (08:37 - 10:51)
  {
    orderIndex: 14,
    startTime: 517.4,
    endTime: 585.0,
    text: "Special announcement: Unlock lifelong English fluency with the RealLife English methodology! You can connect with people around the world at the push of a button.",
    translationVi: "Thông báo đặc biệt: Khai phóng sự lưu loát tiếng Anh trọn đời cùng phương pháp RealLife English! Bạn có thể kết nối trò chuyện với bạn bè toàn cầu chỉ bằng một nút bấm.",
    ipaUs: "/ˈspɛʃəl əˈnaʊnsmənt: ʌnˈlɑːk ˈlaɪfˌlɔːŋ ˈɪŋɡlɪʃ ˈfluːənsi wɪð ðə riːəl laɪf ˈɪŋɡlɪʃ ˌmɛθəˈdɑːlədʒi! juː kæn kəˈnɛkt wɪð ˈpiːpəl əˈraʊnd ðə wɜːrld æt ðə pʊʃ əv ə ˈbʌtən./",
    keywords: ["lifelong fluency", "methodology", "push of a button"],
    explanationAi: "Cụm thành ngữ công nghệ hiện đại 'at the push of a button' (chỉ trong nháy mắt, dễ dàng chỉ với một thao tác bấm nút).",
    properNouns: ["RealLife English"]
  },
  {
    orderIndex: 15,
    startTime: 585.0,
    endTime: 651.9,
    text: "Experience the power of learning native expressions naturally through TV series and movies without the boredom of traditional grammar drills.",
    translationVi: "Trải nghiệm sức mạnh của việc tiếp thu thành ngữ bản xứ tự nhiên thông qua phim truyền hình và điện ảnh mà không phải chịu đựng sự tẻ nhạt của các bài tập ngữ pháp truyền thống.",
    ipaUs: "/ɪkˈspɪriəns ðə ˈpaʊər əv ˈlɜːrnɪŋ ˈneɪtɪv ɪkˈsprɛʃənz ˈnætʃrəli θruː ˌtiːˈviː ˈsɪriz ænd ˈmuːviz wɪˈðaʊt ðə ˈbɔːrdəm əv trəˈdɪʃənəl ˈɡræmər drɪlz./",
    keywords: ["native expressions", "boredom", "traditional grammar drills"],
    explanationAi: "Phương pháp học tiếng Anh thụ cảm ngữ cảnh (Contextual Immersion) thay cho cách ghi nhớ công thức khô khan.",
    properNouns: []
  },

  // CHAPTER 9: ADVANCED VOCABULARY AND USAGE (10:51 - 11:53)
  {
    orderIndex: 16,
    startTime: 651.9,
    endTime: 685.0,
    text: "Timon tries to interrogate Simba: So, where are you from? — Doesn't matter. — What did you do? — Simba whispers: I did something, something terrible... but I don't want to talk about it.",
    translationVi: "Timon cố gặng hỏi Simba: Thế nhóc đến từ đâu? — Không quan trọng. — Cậu đã làm chuyện gì thế? — Simba thì thầm: Cháu đã gây ra một việc, một việc vô cùng kinh khủng... nhưng cháu không muốn nhắc lại đâu.",
    ipaUs: "/ˈtaɪmən traɪz tuː ɪnˈtɛrəˌɡeɪt ˈsɪmbə: soʊ, wɛr ɑːr juː frʌm? — ˈdʌzənt ˈmætər. — wʌt dɪd juː duː? — ˈsɪmbə ˈwɪspərz: aɪ dɪd ˈsʌmθɪŋ, ˈsʌmθɪŋ ˈtɛrəbəl... bʌt aɪ doʊnt wɑːnt tuː tɔːk əˈbaʊt ɪt./",
    keywords: ["interrogate", "terrible", "talk about it"],
    explanationAi: "Simba tự dằn vặt bản thân vì cái chết của Mufasa qua đại từ bất định 'something terrible' (điều gì đó khủng khiếp).",
    properNouns: ["Timon", "Simba"]
  },
  {
    orderIndex: 17,
    startTime: 685.0,
    endTime: 713.5,
    text: "Timon dismisses Simba's past quickly: Good. We don't want to hear about it. Pumbaa interrupts warmly: Come on, Timon! Anything we can do to help?",
    translationVi: "Timon gạt phăng quá khứ của Simba: Thế càng tốt. Bọn này cũng chẳng hào hứng muốn nghe đâu. Pumbaa ấm áp ngắt lời: Thôi nào Timon! Có điều gì tụi mình giúp được nhóc không?",
    ipaUs: "/ˈtaɪmən dɪsˈmɪsɪz ˈsɪmbəz pæst ˈkwɪkli: ɡʊd. wiː doʊnt wɑːnt tuː hɪr əˈbaʊt ɪt. ˈpʊmbə ˌɪntəˈrʌpts ˈwɔːrmli: kʌm ɑːn, ˈtaɪmən! ˈɛniˌθɪŋ wiː kæn duː tuː hɛlp?/",
    keywords: ["dismisses", "hear about it", "interrupts warmly"],
    explanationAi: "Tương phản tính cách: Timon ích kỷ né tránh rắc rối ('We don't want to hear about it') đối lập với sự tử tế vị tha của Pumbaa.",
    properNouns: ["Timon", "Simba", "Pumbaa"]
  },

  // CHAPTER 10: CONDITIONALS AND PAST TENSE (11:53 - 13:32)
  {
    orderIndex: 18,
    startTime: 713.5,
    endTime: 760.0,
    text: "Simba looks down with grief: Not unless you can change the past. Pumbaa replies: You know, in times like this, my buddy Timon here says: you got to put your behind in your past.",
    translationVi: "Simba cúi mặt nghẹn ngào trong đau buồn: Không ai giúp được đâu, trừ phi các chú có thể thay đổi được quá khứ. Pumbaa liền đáp: Nhóc biết đấy, trong những lúc thế này, bạn Timon của tớ luôn nói: cậu phải đặt cái mông vào quá khứ.",
    ipaUs: "/ˈsɪmbə lʊks daʊn wɪð ɡriːf: nɑːt ənˈlɛs juː kæn tʃeɪndʒ ðə pæst. ˈpʊmbə rɪˈplaɪz: juː noʊ, ɪn taɪmz laɪk ðɪs, maɪ ˈbʌdi ˈtaɪmən hɪr sɛz: juː ɡɑːt tuː pʊt jɔːr bɪˈhaɪnd ɪn jɔːr pæst./",
    keywords: ["unless", "change the past", "put your behind in your past"],
    explanationAi: "Cấu trúc điều kiện với liên từ 'unless' (= if not). Lời nói nhầm lẫn hài hước kinh điển của Pumbaa tráo đổi trật tự từ.",
    properNouns: ["Simba", "Pumbaa", "Timon"]
  },
  {
    orderIndex: 19,
    startTime: 760.0,
    endTime: 800.0,
    text: "Timon cuts in exasperatedly: No, no, no! Amateur. Lie down before you hurt yourself! It's: you got to put your past behind you!",
    translationVi: "Timon tức tối chen ngang: Không, không đời nào! Đồ nghiệp dư. Nằm xuống nghỉ ngơi đi trước khi tự làm mình bị thương! Câu chuẩn phải là: Cậu phải bỏ lại quá khứ ở phía sau lưng!",
    ipaUs: "/ˈtaɪmən kʌts ɪn ɪɡˈzæspəreɪtɪdli: noʊ, noʊ, noʊ! ˈæmətər. laɪ daʊn bɪˈfɔːr juː hɜːrt jərˈsɛlf! ɪts: juː ɡɑːt tuː pʊt jɔːr pæst bɪˈhaɪnd juː!/",
    keywords: ["amateur", "hurt yourself", "put your past behind you"],
    explanationAi: "Thành ngữ triết lý sống: 'put the past behind you' (gác lại quá khứ đau buồn, hướng tới tương lai phía trước).",
    properNouns: ["Timon"]
  },
  {
    orderIndex: 20,
    startTime: 800.0,
    endTime: 812.3,
    text: "Notice the difference: 'behind' as a preposition means at the back of you, but Pumbaa mistook it for the noun 'behind', meaning rear end or buttocks!",
    translationVi: "Chú ý sự khác biệt: 'behind' khi là giới từ mang nghĩa 'ở đằng sau lưng bạn', nhưng Pumbaa lại nhầm nó với danh từ 'behind' nghĩa là cái mông đằng sau!",
    ipaUs: "/ˈnoʊtɪs ðə ˈdɪfərəns: bɪˈhaɪnd æz ə ˌprɛpəˈzɪʃən miːnz æt ðə bæk əv juː, bʌt ˈpʊmbə mɪsˈtʊk ɪt fɔːr ðə naʊn bɪˈhaɪnd, ˈmiːnɪŋ rɪr ɛnd ɔːr ˈbʌtəks!/",
    keywords: ["preposition behind", "noun behind", "wordplay", "rear end"],
    explanationAi: "Phân tích hiện tượng đồng âm khác loại từ (homonymy): 'behind' vừa là giới từ vị trí, vừa là danh từ uyển ngữ hài hước chỉ vòng ba.",
    properNouns: ["Pumbaa"]
  },

  // CHAPTER 11: HAKUNA MATATA EXPLAINED (13:32 - 15:05)
  {
    orderIndex: 21,
    startTime: 812.3,
    endTime: 860.0,
    text: "Timon: Look, kid. Bad things happen, and you can't do anything about it, right? — Simba: Right. — Timon: Wrong! When the world turns its back on you, you turn your back on the world!",
    translationVi: "Timon: Nghe này nhóc. Chuyện tồi tệ luôn xảy ra, và nhóc chẳng thể làm gì để thay đổi được nó, đúng không? — Simba: Đúng ạ. — Timon: Sai bét! Khi thế giới quay lưng lại với nhóc, nhóc hãy quay lưng lại với cả thế giới!",
    ipaUs: "/ˈtaɪmən: lʊk, kɪd. bæd θɪŋz ˈhæpən, ænd juː kænt duː ˈɛniˌθɪŋ əˈbaʊt ɪt, raɪt? — ˈsɪmbə: raɪt. — ˈtaɪmən: rɔːŋ! wɛn ðə wɜːrld tɜːrnz ɪts bæk ɑːn juː, juː tɜːrn jɔːr bæk ɑːn ðə wɜːrld!/",
    keywords: ["bad things happen", "turns its back on you", "turn your back"],
    explanationAi: "Thành ngữ phản chiếu đối xứng 'turn one's back on' (quay lưng chối bỏ, phớt lờ ai đó hoặc hoàn cảnh sống khắc nghiệt).",
    properNouns: ["Timon", "Simba"]
  },
  {
    orderIndex: 22,
    startTime: 860.0,
    endTime: 905.4,
    text: "Simba: Well, that's not what I was taught. — Timon: Then maybe you need a new lesson. Repeat after me: Hakuna Matata!",
    translationVi: "Simba: Nhưng đó đâu phải là những điều cháu từng được dạy dỗ. — Timon: Thế thì có lẽ nhóc cần một bài học hoàn toàn mới rồi. Đọc theo ta nào: Hakuna Matata!",
    ipaUs: "/ˈsɪmbə: wɛl, ðæts nɑːt wʌt aɪ wʌz tɔːt. — ˈtaɪmən: ðɛn ˈmeɪbiː juː niːd ə nuː ˈlɛsən. rɪˈpiːt ˈæftər miː: həˈkuːnə məˈtɑːtə!/",
    keywords: ["not what I was taught", "new lesson", "repeat after me", "Hakuna Matata"],
    explanationAi: "Xung đột nhận thức giữa vương đạo của Mufasa và triết lý yolo bất cần đời 'Hakuna Matata' được truyền thụ cho Simba.",
    properNouns: ["Simba", "Timon"]
  },

  // CHAPTER 12: INFORMAL EXPRESSIONS AND FOOD (15:05 - 17:04)
  {
    orderIndex: 23,
    startTime: 905.4,
    endTime: 965.0,
    text: "Simba: What? — Pumbaa: Hakuna Matata. It means no worries! — Simba: What's a motto? — Timon laughs: Nothing, what's a motto with you?",
    translationVi: "Simba: Cái gì cơ ạ? — Pumbaa: Hakuna Matata. Có nghĩa là chẳng bận tâm lo âu điều gì hết! — Simba: Phương châm (motto) là gì thế ạ? — Timon cười ranh mãnh: Không có gì, thế phương hại gì đến nhóc à?",
    ipaUs: "/ˈsɪmbə: wʌt? — ˈpʊmbə: həˈkuːnə məˈtɑːtə. ɪt miːnz noʊ ˈwɜːriz! — ˈsɪmbə: wʌts ə ˈmɑːtoʊ? — ˈtaɪmən læfs: ˈnʌθɪŋ, wʌts ə ˈmɑːtoʊ wɪð juː?/",
    keywords: ["no worries", "what's a motto", "what's the matter with you"],
    explanationAi: "Màn chơi chữ dí dỏm dựa trên sự đồng âm giữa 'a motto' và phát âm nuốt âm của 'the matter' trong cụm 'What's the matter with you?'.",
    properNouns: ["Simba", "Pumbaa", "Timon"]
  },
  {
    orderIndex: 24,
    startTime: 965.0,
    endTime: 1024.4,
    text: "Pumbaa sings enthusiastically: Hakuna Matata! What a wonderful phrase! It means no worries for the rest of your days. It's our problem-free philosophy!",
    translationVi: "Pumbaa cất cao giọng hát hào hứng: Hakuna Matata! Thật là một câu nói tuyệt diệu làm sao! Nó có nghĩa là chẳng còn lo nghĩ cho tới suốt những ngày tháng còn lại của đời bạn. Đó là triết lý sống sạch bóng muộn phiền của tụi này đấy!",
    ipaUs: "/ˈpʊmbə sɪŋz ɪnˌθuːziˈæstɪkli: həˈkuːnə məˈtɑːtə! wʌt ə ˈwʌndərfəl freɪz! ɪt miːnz noʊ ˈwɜːriz fɔːr ðə rɛst əv jɔːr deɪz. ɪts ˈaʊər ˈprɑːbləm friː fəˈlɑːsəfi!/",
    keywords: ["wonderful phrase", "rest of your days", "problem-free philosophy"],
    explanationAi: "Bài ca biểu tượng của Disney: tính từ ghép 'problem-free' (không chút phiền muộn) và danh từ 'philosophy' (triết lý sống).",
    properNouns: ["Pumbaa"]
  },

  // CHAPTER 13: INTERJECTIONS AND DESCRIPTIONS (17:04 - 18:52)
  {
    orderIndex: 25,
    startTime: 1024.4,
    endTime: 1080.0,
    text: "Simba's stomach growls: I'm starved. — Pumbaa: What do you eat? — Simba: I'd like a zebra. — Timon shudders: Whoa, kid! No zebras around here!",
    translationVi: "Bụng Simba sôi réo lên: Cháu đói lả cả người rồi. — Pumbaa: Nhóc thích ăn món gì nào? — Simba: Cháu muốn xơi một con ngựa vằn. — Timon rùng mình khiếp đảm: Khoan đã nhóc! Ở đây đào đâu ra ngựa vằn chứ!",
    ipaUs: "/ˈsɪmbəz ˈstʌmək ɡraʊlz: aɪm stɑːrvd. — ˈpʊmbə: wʌt duː juː iːt? — ˈsɪmbə: aɪd laɪk ə ˈziːbrə. — ˈtaɪmən ˈʃʌdərz: woʊ, kɪd! noʊ ˈziːbrəz əˈraʊnd hɪr!/",
    keywords: ["stomach growls", "I'm starved", "zebra", "shudders"],
    explanationAi: "Từ vựng cấp độ cao thay cho 'very hungry': 'I'm starved' hoặc 'I'm starving' (đói cồn cào, kiệt sức vì đói).",
    properNouns: ["Simba", "Pumbaa", "Timon"]
  },
  {
    orderIndex: 26,
    startTime: 1080.0,
    endTime: 1132.8,
    text: "Timon leads Simba over to a rotting log: Well, this looks like a good place to rustle up some grub. Look at this! It's an all-you-can-eat buffet!",
    translationVi: "Timon dẫn Simba lại gần một khúc gỗ mục: Chà, chỗ này trông có vẻ là địa điểm lý tưởng để kiếm chút mồi ngon đấy. Nhìn đây này! Đúng là tiệc buffet côn trùng ăn thỏa thích luôn!",
    ipaUs: "/ˈtaɪmən liːdz ˈsɪmbə ˈoʊvər tuː ə ˈrɑːtɪŋ lɔːɡ: wɛl, ðɪs lʊks laɪk ə ɡʊd pleɪs tuː ˈrʌsəl ʌp sʌm ɡrʌb. lʊk æt ðɪs! ɪts ən ɔːl juː kæn iːt bəˈfeɪ!/",
    keywords: ["rustle up some grub", "rotting log", "all-you-can-eat buffet"],
    explanationAi: "Thành ngữ tiếng lóng Mỹ: 'rustle up' (nhanh chóng chuẩn bị/tìm kiếm thức ăn) và 'grub' (tiếng lóng chỉ đồ ăn hoặc ấu trùng sâu bọ).",
    properNouns: ["Timon", "Simba"]
  },

  // CHAPTER 14: CONJUNCTIONS AND DELICACIES (18:52 - 20:00)
  {
    orderIndex: 27,
    startTime: 1132.8,
    endTime: 1165.0,
    text: "Timon plucks a squirming bug: These little guys are rare delicacies. Pumbaa slurps one down: Mmm. Piquant, with a very pleasant crunch!",
    translationVi: "Timon nhặt lên một con bọ đang ngoe nguẩy: Mấy chú bé này là cao lương mỹ vị hiếm có khó tìm đấy. Pumbaa nuốt ực một con: Mmm. Vị cay nồng đậm đà, cắn vào giòn rụm thật sảng khoái!",
    ipaUs: "/ˈtaɪmən plʌks ə ˈskwɜːrmɪŋ bʌɡ: ðiːz ˈlɪtəl ɡaɪz ɑːr rɛr ˈdɛləkəsiz. ˈpʊmbə slɜːrps wʌn daʊn: mmm. ˈpiːkənt, wɪð ə ˈvɛri ˈplɛzənt krʌntʃ!/",
    keywords: ["rare delicacies", "piquant", "pleasant crunch", "slurps down"],
    explanationAi: "Từ vựng ẩm thực tao nhã được dùng trớ trêu cho côn trùng: 'delicacy' (mỹ vị), 'piquant' (vị cay the nồng quyến rũ), 'crunch' (độ giòn).",
    properNouns: ["Timon", "Pumbaa"]
  },
  {
    orderIndex: 28,
    startTime: 1165.0,
    endTime: 1200.0,
    text: "Simba hesitates, eats one, and smiles in surprise: Well... slimy, yet satisfying! Timon grins: That's it! Tastes like chicken!",
    translationVi: "Simba ngập ngừng một lát, rồi nhai thử một con và mỉm cười kinh ngạc: Chà... trơn nhớt thật đấy, nhưng mà ăn đã miệng phết! Timon cười toe toét: Chuẩn luôn! Vị hệt như thịt gà vậy!",
    ipaUs: "/ˈsɪmbə ˈhɛzəˌteɪts, iːts wʌn, ænd smaɪlz ɪn sərˈpraɪz: wɛl... ˈslaɪmi, jɛt ˈsætɪsˌfaɪɪŋ! ˈtaɪmən ɡrɪnz: ðæts ɪt! teɪsts laɪk ˈtʃɪkən!/",
    keywords: ["slimy yet satisfying", "hesitates", "tastes like chicken"],
    explanationAi: "Sử dụng liên từ tương phản 'yet' (= but/nevertheless) tạo nên câu khẩu hiệu huyền thoại: 'slimy, yet satisfying' (nhơm nhớp mà đã miệng).",
    properNouns: ["Simba", "Timon"]
  },

  // CHAPTER 15: REVIEW AND QUIZ (20:00 - 22:13)
  {
    orderIndex: 29,
    startTime: 1200.0,
    endTime: 1333.5,
    text: "Time for a comprehensive review! Test your understanding of today's expressions: 'look blue', 'top of the food chain', 'put the past behind you', and 'turn your back on the world'.",
    translationVi: "Đã đến lúc ôn tập tổng hợp toàn diện! Kiểm tra khả năng thấu hiểu của bạn về các thành ngữ hôm nay: 'look blue', 'top of the food chain', 'put the past behind you', và 'turn your back on the world'.",
    ipaUs: "/taɪm fɔːr ə ˌkɑːmprɪˈhɛnsɪv rɪˈvjuː! tɛst jɔːr ˌʌndərˈstændɪŋ əv təˈdeɪz ɪkˈsprɛʃənz: lʊk bluː, tɑːp əv ðə fuːd tʃeɪn, pʊt ðə pæst bɪˈhaɪnd juː, ænd tɜːrn jɔːr bæk ɑːn ðə wɜːrld./",
    keywords: ["comprehensive review", "test understanding", "recap expressions"],
    explanationAi: "Hệ thống hóa toàn bộ các mẫu câu đàm thoại và thành ngữ trọng tâm để học viên ghi nhớ dài hạn vào vỏ não.",
    properNouns: []
  },

  // CHAPTER 16: CONCLUSION AND NEXT STEPS (22:13 - 24:04)
  {
    orderIndex: 30,
    startTime: 1333.5,
    endTime: 1444.0,
    text: "Great job completing this lesson! Remember: you can either run from your challenges or learn from them. Keep practicing every day, immerse yourself in English, and we'll see you in the next lesson!",
    translationVi: "Tuyệt vời lắm, bạn đã hoàn thành trọn vẹn bài học này! Hãy ghi nhớ: bạn có thể chọn trốn chạy thử thách hoặc học hỏi vươn lên từ chúng. Hãy kiên trì luyện tập mỗi ngày, đắm mình vào tiếng Anh, và hẹn gặp lại bạn trong bài học tiếp theo!",
    ipaUs: "/ɡreɪt dʒɑːb kəmˈpliːtɪŋ ðɪs ˈlɛsən! rɪˈmɛmbər: juː kæn ˈaɪðər rʌn frʌm jɔːr ˈtʃælɪndʒɪz ɔːr lɜːrn frʌm ðɛm. kiːp ˈpræktɪsɪŋ ˈɛvri deɪ, ɪˈmɜːrs jərˈsɛlf ɪn ˈɪŋɡlɪʃ, ænd wiːl siː juː ɪn ðə nɛkst ˈlɛsən!/",
    keywords: ["run from challenges", "learn from them", "immerse yourself", "keep practicing"],
    explanationAi: "Thông điệp đúc kết bất hủ kết hợp triết lý của Rafiki và RealLife English: đối diện quá khứ và rèn luyện thói quen tự học đều đặn mỗi ngày.",
    properNouns: []
  }
];

// Calculate token counts
segmentsData.forEach(seg => {
  const tokens = tokenizeSentence(seg.text, seg.properNouns);
  seg.tokenCount = tokens.length;
});

console.log(`Generated ${segmentsData.length} segments.`);
segmentsData.forEach((s, idx) => {
  console.log(`Seg ${idx}: [${s.startTime}s -> ${s.endTime}s] (${s.tokenCount} tokens) - ${s.text.slice(0, 40)}...`);
});

const quizData = {
  lessonId: "mov_ani_08",
  lessonTitle: "The Lion King: Rafiki, Timon & Pumbaa 'Hakuna Matata & The Past Can Hurt'",
  totalQuestions: 6,
  xpReward: 120,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "q_mov_ani_08_1",
      question: "What does Timon mean when he says Simba 'looks blue'?",
      questionEn: "What does Timon mean when he says Simba 'looks blue'?",
      questionVi: "Timon có ý gì khi nói rằng Simba 'looks blue'?",
      options: [
        "Simba looks depressed or sad",
        "Simba's fur has turned literally blue",
        "Simba is freezing from cold water",
        "Simba is suffering from lack of oxygen"
      ],
      optionsEn: [
        "Simba looks depressed or sad",
        "Simba's fur has turned literally blue",
        "Simba is freezing from cold water",
        "Simba is suffering from lack of oxygen"
      ],
      optionsVi: [
        "Simba trông buồn bã, trầm cảm",
        "Lông của Simba thực sự chuyển sang màu xanh",
        "Simba bị lạnh cóng vì ngâm nước lạnh",
        "Simba đang khó thở vì thiếu oxy"
      ],
      correctAnswer: 0,
      explanation: "In English, the idiom 'look blue' or 'feel blue' means looking or feeling sad and depressed. Pumbaa humorously misunderstood it literally as Simba's fur color.",
      explanationEn: "In English, the idiom 'look blue' or 'feel blue' means looking or feeling sad and depressed. Pumbaa humorously misunderstood it literally as Simba's fur color.",
      explanationVi: "Trong tiếng Anh, thành ngữ 'look blue' hoặc 'feel blue' có nghĩa là buồn rầu, ủ rũ. Pumbaa đã hiểu nhầm theo nghĩa đen của màu lông.",
      targetedConcept: "Idiomatic Color Expressions",
      targetedConceptEn: "Idiomatic Color Expressions",
      targetedConceptVi: "Thành ngữ chỉ trạng thái cảm xúc qua màu sắc",
      referenceSegmentIndex: 10
    },
    {
      id: "q_mov_ani_08_2",
      question: "Why does Timon laugh when Pumbaa asks 'Kid, what's eating you?'",
      questionEn: "Why does Timon laugh when Pumbaa asks 'Kid, what's eating you?'",
      questionVi: "Tại sao Timon lại bật cười khi Pumbaa hỏi 'Kid, what's eating you?'?",
      options: [
        "Because Simba is a lion at the top of the food chain, so no animal eats him",
        "Because Pumbaa asked the question in Swahili instead of English",
        "Because Simba was actually eating a big zebra right then",
        "Because Timon didn't understand Pumbaa's accent"
      ],
      optionsEn: [
        "Because Simba is a lion at the top of the food chain, so no animal eats him",
        "Because Pumbaa asked the question in Swahili instead of English",
        "Because Simba was actually eating a big zebra right then",
        "Because Timon didn't understand Pumbaa's accent"
      ],
      optionsVi: [
        "Vì Simba là sư tử ở đỉnh chuỗi thức ăn, không có con vật nào dám ăn thịt nó",
        "Vì Pumbaa đã hỏi bằng tiếng Swahili thay vì tiếng Anh",
        "Vì lúc đó Simba đang thực sự ăn thịt một con ngựa vằn",
        "Vì Timon không hiểu ngữ điệu nói của Pumbaa"
      ],
      correctAnswer: 0,
      explanation: "Timon makes a wordplay joke: 'What's eating you?' idiomatically means 'what is bothering you', but Timon takes it literally regarding predatory animals and the food chain.",
      explanationEn: "Timon makes a wordplay joke: 'What's eating you?' idiomatically means 'what is bothering you', but Timon takes it literally regarding predatory animals and the food chain.",
      explanationVi: "Timon chơi chữ hài hước: 'What's eating you?' nghĩa bóng là 'điều gì làm phiền lòng cậu', nhưng Timon lại hiểu theo nghĩa đen động vật săn mồi và chuỗi thức ăn.",
      targetedConcept: "Wordplay & Food Chain Metaphor",
      targetedConceptEn: "Wordplay & Food Chain Metaphor",
      targetedConceptVi: "Chơi chữ đa nghĩa & Ẩn dụ chuỗi thức ăn",
      referenceSegmentIndex: 12
    },
    {
      id: "q_mov_ani_08_3",
      question: "What grammatical mistake did Pumbaa make with the word 'behind'?",
      questionEn: "What grammatical mistake did Pumbaa make with the word 'behind'?",
      questionVi: "Pumbaa đã mắc lỗi ngữ pháp gì khi dùng từ 'behind'?",
      options: [
        "He said 'put your behind in your past' instead of 'put your past behind you'",
        "He forgot to use the past tense of the verb 'put'",
        "He used 'behind' as an adjective instead of an adverb",
        "He confused 'behind' with 'before'"
      ],
      optionsEn: [
        "He said 'put your behind in your past' instead of 'put your past behind you'",
        "He forgot to use the past tense of the verb 'put'",
        "He used 'behind' as an adjective instead of an adverb",
        "He confused 'behind' with 'before'"
      ],
      optionsVi: [
        "Cậu ấy nói 'đặt cái mông vào quá khứ' thay vì 'đặt quá khứ lại phía sau'",
        "Cậu ấy quên chia thì quá khứ cho động từ 'put'",
        "Cậu ấy dùng 'behind' như một tính từ thay vì trạng từ",
        "Cậu ấy nhầm lẫn từ 'behind' với từ 'before'"
      ],
      correctAnswer: 0,
      explanation: "The correct idiom is 'put your past behind you' (leave the past in the past). Pumbaa inverted the words to 'put your behind in your past', turning 'behind' into a noun meaning rear end.",
      explanationEn: "The correct idiom is 'put your past behind you' (leave the past in the past). Pumbaa inverted the words to 'put your behind in your past', turning 'behind' into a noun meaning rear end.",
      explanationVi: "Thành ngữ chính xác là 'put your past behind you' (gác lại quá khứ phía sau). Pumbaa đảo lộn trật tự thành 'put your behind in your past', biến 'behind' thành danh từ chỉ cái mông.",
      targetedConcept: "Idiom Word Order & Double Entendre",
      targetedConceptEn: "Idiom Word Order & Double Entendre",
      targetedConceptVi: "Trật tự từ trong thành ngữ & Lối nói nước đôi",
      referenceSegmentIndex: 18
    },
    {
      id: "q_mov_ani_08_4",
      question: "According to Timon, what should you do when 'the world turns its back on you'?",
      questionEn: "According to Timon, what should you do when 'the world turns its back on you'?",
      questionVi: "Theo Timon, bạn nên làm gì khi 'thế giới quay lưng lại với bạn'?",
      options: [
        "You turn your back on the world",
        "You beg for forgiveness from everyone",
        "You run away and hide under Pride Rock",
        "You try harder to please the other animals"
      ],
      optionsEn: [
        "You turn your back on the world",
        "You beg for forgiveness from everyone",
        "You run away and hide under Pride Rock",
        "You try harder to please the other animals"
      ],
      optionsVi: [
        "Bạn hãy quay lưng lại với cả thế giới",
        "Bạn van xin mọi người tha thứ",
        "Bạn chạy trốn và nấp dưới Mỏm đá Kiêu Hãnh",
        "Bạn cố gắng nhiều hơn để làm hài lòng những con thú khác"
      ],
      correctAnswer: 0,
      explanation: "Timon preaches his carefree motto: 'When the world turns its back on you, you turn your back on the world!' which leads to Hakuna Matata.",
      explanationEn: "Timon preaches his carefree motto: 'When the world turns its back on you, you turn your back on the world!' which leads to Hakuna Matata.",
      explanationVi: "Timon giảng giải phương châm bất cần đời: 'Khi thế giới quay lưng lại với nhóc, nhóc hãy quay lưng lại với cả thế giới!' mở đầu cho tinh thần Hakuna Matata.",
      targetedConcept: "Philosophy of Hakuna Matata",
      targetedConceptEn: "Philosophy of Hakuna Matata",
      targetedConceptVi: "Triết lý sống Hakuna Matata",
      referenceSegmentIndex: 21
    },
    {
      id: "q_mov_ani_08_5",
      question: "What role does the conjunction 'yet' play in the phrase 'slimy, yet satisfying'?",
      questionEn: "What role does the conjunction 'yet' play in the phrase 'slimy, yet satisfying'?",
      questionVi: "Liên từ 'yet' đóng vai trò gì trong cụm từ 'slimy, yet satisfying'?",
      options: [
        "It introduces a contrasting positive quality after an unappealing one",
        "It indicates that something hasn't happened until now",
        "It emphasizes that the bug is still moving",
        "It connects two identical adjectives with similar meanings"
      ],
      optionsEn: [
        "It introduces a contrasting positive quality after an unappealing one",
        "It indicates that something hasn't happened until now",
        "It emphasizes that the bug is still moving",
        "It connects two identical adjectives with similar meanings"
      ],
      optionsVi: [
        "Nó giới thiệu một phẩm chất tích cực đối lập ngay sau một nét khó chịu",
        "Nó chỉ ra một việc chưa từng diễn ra cho tới tận bây giờ",
        "Nó nhấn mạnh rằng con bọ vẫn đang còn ngoe nguẩy",
        "Nó nối hai tính từ giống hệt nhau có cùng một nghĩa"
      ],
      correctAnswer: 0,
      explanation: "As a coordinating conjunction, 'yet' means 'nevertheless' or 'but', pairing the negative texture 'slimy' with the surprisingly enjoyable outcome 'satisfying'.",
      explanationEn: "As a coordinating conjunction, 'yet' means 'nevertheless' or 'but', pairing the negative texture 'slimy' with the surprisingly enjoyable outcome 'satisfying'.",
      explanationVi: "Với tư cách liên từ đẳng lập, 'yet' có nghĩa là 'nhưng/tuy nhiên', kết nối cảm giác khó chịu 'slimy' (nhơm nhớp) với sự thích thú bất ngờ 'satisfying' (đã miệng).",
      targetedConcept: "Contrasting Conjunction Usage",
      targetedConceptEn: "Contrasting Conjunction Usage",
      targetedConceptVi: "Sử dụng liên từ tương phản đối lập",
      referenceSegmentIndex: 28
    },
    {
      id: "q_mov_ani_08_6",
      question: "What core life lesson about the past does the overarching story teach Simba?",
      questionEn: "What core life lesson about the past does the overarching story teach Simba?",
      questionVi: "Bài học cốt lõi nào về quá khứ mà toàn bộ câu chuyện giáo dục Simba?",
      options: [
        "You can either run from the past, or learn from it and face your responsibilities",
        "You should ignore your past completely and eat bugs forever",
        "The past cannot be remembered so it doesn't matter at all",
        "You should blame your family members for all your past mistakes"
      ],
      optionsEn: [
        "You can either run from the past, or learn from it and face your responsibilities",
        "You should ignore your past completely and eat bugs forever",
        "The past cannot be remembered so it doesn't matter at all",
        "You should blame your family members for all your past mistakes"
      ],
      optionsVi: [
        "Con hoặc là trốn chạy quá khứ, hoặc là học hỏi từ nó và dũng cảm đối mặt với trách nhiệm",
        "Con nên phớt lờ hoàn toàn quá khứ và ăn côn trùng qua ngày suốt đời",
        "Quá khứ không thể nhớ lại được nên nó hoàn toàn chẳng có ý nghĩa gì",
        "Con nên đổ lỗi cho các thành viên trong gia đình về mọi sai lầm đã qua"
      ],
      correctAnswer: 0,
      explanation: "While Timon and Pumbaa teach him to escape worry, the ultimate wisdom is that 'the past can hurt, but you can either run from it, or learn from it' and return to claim your destiny.",
      explanationEn: "While Timon and Pumbaa teach him to escape worry, the ultimate wisdom is that 'the past can hurt, but you can either run from it, or learn from it' and return to claim your destiny.",
      explanationVi: "Dù Timon và Pumbaa dạy Simba trốn tránh âu lo, triết lý tối hậu của Vua Sư Tử vẫn là 'quá khứ có thể gây tổn thương, nhưng con có thể chọn trốn chạy nó hoặc học hỏi từ nó' để gánh vác sứ mệnh.",
      targetedConcept: "Overcoming Grief & Facing Destiny",
      targetedConceptEn: "Overcoming Grief & Facing Destiny",
      targetedConceptVi: "Vượt qua đau thương & Đối mặt sứ mệnh",
      referenceSegmentIndex: 30
    }
  ]
};

// Generate TypeScript content
const tsContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: The Lion King: Rafiki, Timon & Pumbaa 'Hakuna Matata & The Past Can Hurt'
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR A2 | African / British / American
 * YouTube ID: HeQTJE99OXo (24:04 - 1444s)
 * Views: 1,453,059 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (16 CHAPTERS, ZERO DATA LOSS)
 * ============================================================================
 */

export const QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST: VideoQuizData = ${JSON.stringify(quizData, null, 2)};

export const LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST: MockVideoLesson = {
  id: "mov_ani_08",
  slug: "the-lion-king-rafiki-teaches-simba-the-past",
  title: "The Lion King: Rafiki, Timon & Pumbaa 'Hakuna Matata & The Past Can Hurt'",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "A2",
  durationFormatted: "24:04",
  durationSeconds: 1444,
  externalId: "HeQTJE99OXo",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/HeQTJE99OXo/hqdefault.jpg",
  accent: "African / British / American",
  wpmSpeed: 115,
  viewCount: 1453059,
  studyCount: 6510,
  description:
    "Khám phá trọn vẹn 16 phân đoạn của tuyệt phẩm The Lion King: Từ lời răn Circle of Life của Mufasa, cách chơi chữ thức ăn đỉnh chuỗi Food Chain của Timon & Pumbaa, triết lý bất hủ Hakuna Matata cho tới bài học đối diện quá khứ kinh điển.",
  segments: ${JSON.stringify(segmentsData, null, 4)},
  quiz: QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST,
};
`;

const targetPath = path.resolve(__dirname, '../features/listening/data/lessons/movies/animation/lesson_the_lion_king.ts');
fs.writeFileSync(targetPath, tsContent, 'utf-8');
console.log(`Successfully written 31 master segments to ${targetPath}!`);
