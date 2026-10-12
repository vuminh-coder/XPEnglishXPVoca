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

    const length = clean.length;
    const isProperNoun = properNounSet.has(clean.toLowerCase());

    tokens.push({
      id: `word-${tokens.length}-${clean}`,
      original: rawWord,
      clean,
      leadingPunc,
      trailingPunc,
      isProperNoun,
    });
  });

  return tokens;
}

const segmentsData = [
  // CHAPTER 1: INTRO (00:45 - 01:55)
  {
    orderIndex: 0,
    startTime: 45.0,
    endTime: 65.0,
    text: "Today, we're learning English with Kung Fu Panda! Aww Yeah! You are going to be learning with your new RealLife English fluency coach, Andrea!",
    translationVi: "Hôm nay, chúng ta cùng học tiếng Anh qua bộ phim Kung Fu Panda! Tuyệt vời! Các bạn sẽ cùng học với huấn luyện viên lưu loát mới của RealLife English, cô Andrea!",
    ipaUs: "/təˈdeɪ, wɪr ˈlɜːrnɪŋ ˈɪŋɡlɪʃ wɪð kʊŋ fuː ˈpændə! ɔː jɛə! juː ɑːr ˈɡoʊɪŋ tuː biː ˈlɜːrnɪŋ wɪð jʊər njuː ˈriːəlˌlaɪf ˈɪŋɡlɪʃ ˈfluːənsi koʊtʃ, ænˈdreɪə!/",
    keywords: ["Kung Fu Panda", "learning English", "fluency coach", "RealLife English"],
    explanationAi: "Lời chào mở đầu bài học từ kênh RealLife English. Khái niệm 'fluency coach' chỉ người hướng dẫn rèn luyện phản xạ nói tiếng Anh lưu loát như người bản xứ.",
    properNouns: ["Kung Fu Panda", "RealLife English", "Andrea"]
  },
  {
    orderIndex: 1,
    startTime: 65.0,
    endTime: 85.0,
    text: "Today we have a really fun intermediate lesson for you with superstar actors such as Angelina Jolie, Dustin Hoffman, Jack Black, Lucy Liu, and Jackie Chan, who all voiced characters in this DreamWorks animation.",
    translationVi: "Hôm nay chúng ta có một bài học trung cấp cực kỳ thú vị cùng dàn diễn viên siêu sao như Angelina Jolie, Dustin Hoffman, Jack Black, Lucy Liu và Thành Long, những người đều lồng tiếng cho các nhân vật trong tác phẩm hoạt hình của DreamWorks này.",
    ipaUs: "/təˈdeɪ wiː hæv ə ˈrɪəli fʌn ˌɪntərˈmiːdiət ˈlɛsən fɔːr juː wɪð ˈsuːpərˌstɑːr ˈæktərz sʌtʃ æz ˌændʒəˈliːnə ʒoʊˈliː, ˈdʌstɪn ˈhɑːfmən, dʒæk blæk, ˈluːsi ˈluː, ænd ˈdʒæki tʃæn, huː ɔːl vɔɪst ˈkærɪktərz ɪn ðɪs ˈdriːmˌwɜːrks ˌænəˈmeɪʃən./",
    keywords: ["intermediate lesson", "superstar actors", "voiced characters", "DreamWorks animation"],
    explanationAi: "Từ vựng điện ảnh: 'voiced characters' (lồng tiếng cho các nhân vật), 'intermediate lesson' (bài học cấp độ trung cấp CEFR B1-B2).",
    properNouns: ["Angelina Jolie", "Dustin Hoffman", "Jack Black", "Lucy Liu", "Jackie Chan", "DreamWorks"]
  },
  {
    orderIndex: 2,
    startTime: 85.0,
    endTime: 105.0,
    text: "Kung Fu Panda is about a lazy panda and an unlikely hero named Po, who must somehow become a kung fu master in order to protect his ancient village from the villainous snow leopard Tai Lung.",
    translationVi: "Kung Fu Panda kể về một chú gấu trúc lười biếng và một người hùng khó ai ngờ tới tên là Po, người bằng cách nào đó phải trở thành một bậc thầy kung fu để bảo vệ ngôi làng cổ kính của mình khỏi báo tuyết phản diện độc ác Tai Lung.",
    ipaUs: "/kʊŋ fuː ˈpændə ɪz əˈbaʊt ə ˈleɪzi ˈpændə ænd ən ʌnˈlaɪkli ˈhɪroʊ neɪmd poʊ, huː mʌst ˈsʌmˌhaʊ bɪˈkʌm ə kʊŋ fuː ˈmæstər ɪn ˈɔːrdər tuː prəˈtɛkt hɪz ˈeɪnʃənt ˈvɪlɪdʒ frəm ðə ˈvɪlənəs snoʊ ˈlɛpərd taɪ lʌŋ./",
    keywords: ["unlikely hero", "kung fu master", "ancient village", "villainous snow leopard"],
    explanationAi: "Cụm danh từ văn học: 'unlikely hero' (người anh hùng bất đắc dĩ / không ai ngờ tới), 'villainous' (độc ác, mang bản chất kẻ phản diện).",
    properNouns: ["Kung Fu Panda", "Po", "Tai Lung"]
  },
  {
    orderIndex: 3,
    startTime: 105.0,
    endTime: 115.0,
    text: "In this lesson, we will help you to learn English without getting lost, without missing the jokes, and without subtitles. So let's jump right into the first scene!",
    translationVi: "Trong bài học này, chúng tôi sẽ giúp bạn học tiếng Anh mà không bị mất phương hướng, không bỏ lỡ những câu chuyện cười và không cần phụ đề. Nào, hãy cùng bước ngay vào phân cảnh đầu tiên nhé!",
    ipaUs: "/ɪn ðɪs ˈlɛsən, wiː wɪl hɛlp juː tuː lɜːrn ˈɪŋɡlɪʃ wɪˈðaʊt ˈɡɛtɪŋ lɔːst, wɪˈðaʊt ˈmɪsɪŋ ðə dʒoʊks, ænd wɪˈðaʊt ˈsʌbˌtaɪtəlz. soʊ lɛts dʒʌmp raɪt ˈɪntuː ðə fɜːrst siːn!/",
    keywords: ["getting lost", "missing the jokes", "without subtitles", "jump right into"],
    explanationAi: "Thành ngữ: 'jump right into' (bắt tay ngay vào việc gì), 'get lost' trong ngữ cảnh nghe hiểu chỉ việc bị ngợp và không theo kịp mạch đối thoại.",
    properNouns: []
  },

  // CHAPTER 2: ACUPUNCTURE SCENE (01:55 - 03:25)
  {
    orderIndex: 4,
    startTime: 115.0,
    endTime: 135.0,
    text: "Aaaoo... whoohoo... EEEee... hee-hee... OW! I thought you said acupuncture would make me feel better!",
    translationVi: "Á á á... úi chà... ối giời ơi... he he... ÔI! Ta cứ tưởng ngươi bảo châm cứu sẽ giúp ta cảm thấy dễ chịu hơn cơ mà!",
    ipaUs: "/ɑː... huː... iː... hiː-hiː... aʊ! aɪ θɔːt juː sɛd ˈækjʊˌpʌŋktʃər wʊd meɪk miː fiːl ˈbɛtər!/",
    keywords: ["acupuncture", "make me feel better", "pain"],
    explanationAi: "Từ vựng y học cổ truyền: 'acupuncture' (thuật châm cứu bằng kim). Po kêu la thảm thiết khi bị bọ ngựa Mantis cắm hàng chục cây kim vào cơ thể.",
    properNouns: []
  },
  {
    orderIndex: 5,
    startTime: 135.0,
    endTime: 155.0,
    text: "Trust me, it will. It's just not easy finding the right nerve points under all this— — Fat? — Fur, I was gonna say fur. — Sure you were.",
    translationVi: "Tin tôi đi, nó sẽ có tác dụng mà. Chỉ là không dễ để tìm đúng các huyệt đạo dưới tất cả lớp... — Lớp mỡ à? — Lớp lông chứ, tôi định nói là lớp lông. — Chắc là định nói thế rồi đấy.",
    ipaUs: "/trʌst miː, ɪt wɪl. ɪts dʒʌst nɑːt ˈiːzi ˈfaɪndɪŋ ðə raɪt nɜːrv pɔɪnts ˈʌndər ɔːl ðɪs— — fæt? — fɜːr, aɪ wʌz ˈɡɑːnə seɪ fɜːr. — ʃʊr juː wɜːr./",
    keywords: ["nerve points", "fat", "fur", "sure you were"],
    explanationAi: "Đối thoại hài hước: 'nerve points' (huyệt thần kinh). Sự ngập ngừng của Mantis và câu đối đáp mỉa mai của Po 'Sure you were' (Tin lời ngươi chết liền).",
    properNouns: []
  },
  {
    orderIndex: 6,
    startTime: 155.0,
    endTime: 175.0,
    text: "Who am I to judge a warrior based on his size? I mean, look at me! — I'm over here. — Ow! — Maybe you should take a look at this again.",
    translationVi: "Tôi là ai mà dám phán xét một chiến binh dựa trên kích thước cơ thể chứ? Ý tôi là, nhìn tôi mà xem! — Tôi ở bên này cơ mà. — Ái! — Có lẽ cậu nên xem lại sơ đồ này lần nữa đi.",
    ipaUs: "/huː æm aɪ tuː dʒʌdʒ ə ˈwɔːriər beɪst ɑːn hɪz saɪz? aɪ miːn, lʊk æt miː! — aɪm ˈoʊvər hɪr. — aʊ! — ˈmeɪbiː juː ʃʊd teɪk ə lʊk æt ðɪs əˈɡɛn./",
    keywords: ["judge a warrior", "based on size", "take a look"],
    explanationAi: "Thành ngữ: 'judge someone based on something' (đánh giá ai đó dựa trên vẻ bề ngoài). Mantis là bậc thầy võ thuật tí hon nhưng đầy tự tin.",
    properNouns: []
  },
  {
    orderIndex: 7,
    startTime: 175.0,
    endTime: 190.0,
    text: "Tigress arrives: And now Shifu has a chance to make things right, to train the true Dragon Warrior. And he's stuck with you... a big, fat panda who treats it like a joke.",
    translationVi: "Hổ Tỉ (Tigress) bước tới: Và giờ đây Sư phụ có cơ hội sửa chữa sai lầm, để huấn luyện Thần Long Đại Hiệp thực thụ. Vậy mà người lại phải gánh lấy ngươi... một con gấu trúc béo ú chỉ biết coi võ học như trò đùa.",
    ipaUs: "/ˈtaɪɡrɪs əˈraɪvz: ænd naʊ ˈʃiːfuː hæz ə tʃæns tuː meɪk θɪŋz raɪt, tuː treɪn ðə truː ˈdræɡən ˈwɔːriər. ænd hiːz stʌk wɪð juː... ə bɪɡ, fæt ˈpændə huː triːts ɪt laɪk ə dʒoʊk./",
    keywords: ["make things right", "Dragon Warrior", "stuck with you", "treats it like a joke"],
    explanationAi: "Thành ngữ: 'stuck with someone' (bị mắc kẹt với ai đó / phải chịu đựng ai), 'treat something like a joke' (coi nhẹ việc hệ trọng như một trò đùa).",
    properNouns: ["Tigress", "Shifu", "Dragon Warrior"]
  },
  {
    orderIndex: 8,
    startTime: 190.0,
    endTime: 205.0,
    text: "Doieeeee... — OH, THAT IS IT! — Wait! My fault! I accidentally tweaked his facial nerve. And may have also stopped his heart.",
    translationVi: "Đu-ôi-ê-ê... — ÔI, THẾ LÀ QUÁ LẮM RỒI ĐẤY! — Khoan đã! Lỗi tại tôi! Tôi lỡ tay châm trúng dây thần kinh mặt của cậu ấy rồi. Và có lẽ cũng vừa làm tim cậu ấy ngừng đập luôn rồi.",
    ipaUs: "/dɔɪiː... — oʊ, ðæt ɪz ɪt! — weɪt! maɪ fɔːlt! aɪ ˌæksəˈdɛntəli twiːkt hɪz ˈfeɪʃəl nɜːrv. ænd meɪ hæv ˈɔːlsoʊ stɑːpt hɪz hɑːrt./",
    keywords: ["accidentally tweaked", "facial nerve", "stopped his heart", "that is it"],
    explanationAi: "Khoảnh khắc hài kịch đỉnh cao: 'tweaked his facial nerve' (châm nhầm dây thần kinh điều khiển cơ mặt), 'stopped his heart' (làm tim ngừng đập). Po liệt mặt khiến Tigress nổi giận.",
    properNouns: []
  },

  // CHAPTER 3: VOCABULARY & PRONUNCIATION (03:25 - 13:00)
  {
    orderIndex: 9,
    startTime: 205.0,
    endTime: 235.0,
    text: "Let's break down this scene: Notice the expression 'make things right', which means to correct a mistake or restore justice, and 'stuck with', which describes being forced to deal with an undesirable situation.",
    translationVi: "Hãy cùng phân tích phân cảnh này: Chú ý cụm từ 'make things right', có nghĩa là sửa chữa một lỗi lầm hoặc lập lại công lý, và 'stuck with', mô tả việc buộc phải đối mặt với một tình huống không mong muốn.",
    ipaUs: "/lɛts breɪk daʊn ðɪs siːn: ˈnoʊtɪs ði ɪkˈsprɛʃən 'meɪk θɪŋz raɪt', wɪtʃ miːnz tuː kəˈrɛkt ə mɪsˈteɪk ɔːr rɪˈstɔːr ˈdʒʌstɪs, ænd 'stʌk wɪð', wɪtʃ dɪˈskraɪbz ˈbiːɪŋ fɔːrst tuː diːl wɪð ən ˌʌndɪˈzaɪərəbəl ˌsɪtʃuˈeɪʃən./",
    keywords: ["break down", "make things right", "restore justice", "stuck with"],
    explanationAi: "Bài giảng ngữ nghĩa của Andrea: Phân tích các phrasal verbs và idioms thường nhật trong giao tiếp tiếng Anh Mỹ thực tế.",
    properNouns: ["Andrea"]
  },
  {
    orderIndex: 10,
    startTime: 235.0,
    endTime: 270.0,
    text: "The word 'tweak' means to pull, twist, or pinch something with a sharp movement, but colloquially it means to make a fine adjustment to a mechanism or system.",
    translationVi: "Từ 'tweak' có nghĩa là kéo, vặn hoặc nhéo nhẹ một vật bằng một chuyển động dứt khoát, nhưng theo nghĩa khẩu ngữ nó có nghĩa là tinh chỉnh một chút cho một cơ chế hoặc hệ thống.",
    ipaUs: "/ðə wɜːrd 'twiːk' miːnz tuː pʊl, twɪst, ɔːr pɪntʃ ˈsʌmθɪŋ wɪð ə ʃɑːrp ˈmuːvmənt, bʌt kəˈloʊkwiəli ɪt miːnz tuː meɪk ə faɪn əˈdʒʌstmənt tuː ə ˈmɛkəˌnɪzəm ɔːr ˈsɪstəm./",
    keywords: ["tweak", "sharp movement", "fine adjustment", "mechanism"],
    explanationAi: "Giải nghĩa từ vựng chuyên sâu: 'tweak' vừa mang nghĩa cử động vật lý (như châm kim vào dây thần kinh), vừa dùng rất phổ biến trong công nghệ (tinh chỉnh tham số).",
    properNouns: []
  },
  {
    orderIndex: 11,
    startTime: 270.0,
    endTime: 300.0,
    text: "Pay attention to connected speech when Mantis says 'I was gonna say': 'going to' reduces to 'gonna', which is standard in informal spoken American English.",
    translationVi: "Hãy chú ý đến hiện tượng nối âm khi Mantis nói 'I was gonna say': 'going to' được giản lược thành 'gonna', đây là chuẩn mực tự nhiên trong tiếng Anh giao tiếp thân mật của người Mỹ.",
    ipaUs: "/peɪ əˈtɛnʃən tuː kəˈnɛktɪd spiːtʃ wɛn ˈmæntɪs sɛz 'aɪ wʌz ˈɡɑːnə seɪ': 'ˈɡoʊɪŋ tuː' rɪˈduːsɪz tuː 'ˈɡɑːnə', wɪtʃ ɪz ˈstændərd ɪn ɪnˈfɔːrməl ˈspoʊkən əˈmɛrɪkən ˈɪŋɡlɪʃ./",
    keywords: ["connected speech", "gonna", "informal spoken English", "reduces"],
    explanationAi: "Quy tắc ngữ âm giao tiếp: Dạng rút gọn (reduction) của 'going to' thành 'gonna' và nhịp điệu tự nhiên của câu nói.",
    properNouns: ["Mantis"]
  },
  {
    orderIndex: 12,
    startTime: 511.0,
    endTime: 545.0,
    text: "Do you want to master native pronunciation, vocabulary, and cultural context? With our Fluent with Friends course, you'll learn the real language that natives use every single day.",
    translationVi: "Bạn có muốn làm chủ khả năng phát âm bản xứ, từ vựng và bối cảnh văn hóa không? Với khóa học Fluent with Friends của chúng tôi, bạn sẽ học được thứ ngôn ngữ chân thực mà người bản xứ sử dụng mỗi ngày.",
    ipaUs: "/duː juː wɑːnt tuː ˈmæstər ˈneɪtɪv prəˌnʌnsiˈeɪʃən, voʊˈkæbjəˌlɛri, ænd ˈkʌltʃərəl ˈkɑːntɛkst? wɪð ˈaʊər ˈfluːənt wɪð frɛndz kɔːrs, juːl lɜːrn ðə rɪəl ˈlæŋɡwɪdʒ ðæt ˈneɪtɪvz juːz ˈɛvri ˈsɪŋɡəl deɪ./",
    keywords: ["native pronunciation", "cultural context", "real language", "Fluent with Friends"],
    explanationAi: "Lời chia sẻ phương pháp học từ giáo viên: Nhấn mạnh tầm quan trọng của ba trụ cột 'Pronunciation', 'Vocabulary' và 'Cultural Context'.",
    properNouns: ["Fluent with Friends"]
  },

  // CHAPTER 4: THE SACRED PEACH TREE SCENE (13:00 - 22:53)
  {
    orderIndex: 13,
    startTime: 780.0,
    endTime: 805.0,
    text: "Now let's examine the deeply philosophical story scene by the Sacred Peach Tree of Heavenly Wisdom, where Po confides in Master Oogway.",
    translationVi: "Bây giờ chúng ta hãy cùng khám phá phân cảnh câu chuyện đậm chất triết học bên Cây Đào Thiêng của Trí Tuệ Thiên Đường, nơi Po dốc bầu tâm sự với Đại sư Oogway.",
    ipaUs: "/naʊ lɛts ɪɡˈzæmɪn ðə ˈdiːpli ˌfɪləˈsɑːfɪkəl ˈstɔːri siːn baɪ ðə ˈseɪkrɪd piːtʃ triː əv ˈhɛvənli ˈwɪzdəm, wɛr poʊ kənˈfaɪdz ɪn ˈmæstər ˈuːɡweɪ./",
    keywords: ["philosophical story", "Sacred Peach Tree", "confides in", "Master Oogway"],
    explanationAi: "Chuyển tiếp phân cảnh: Phân tích bối cảnh biểu tượng của 'Sacred Peach Tree of Heavenly Wisdom' trong thần thoại võ thuật phương Đông.",
    properNouns: ["Sacred Peach Tree of Heavenly Wisdom", "Po", "Master Oogway"]
  },
  {
    orderIndex: 14,
    startTime: 805.0,
    endTime: 830.0,
    text: "Po is stuffing peaches into his mouth: I eat when I'm upset, okay? I probably sucked more than anybody in the history of kung fu, in the history of China, in the history of sucking!",
    translationVi: "Po đang nhét đầy những quả đào vào miệng: Tôi chỉ ăn khi tôi buồn phiền thôi, được chưa? Tôi có lẽ là kẻ dở tệ hại nhất trong lịch sử kung fu, trong lịch sử Trung Hoa, trong toàn bộ lịch sử của sự tệ hại!",
    ipaUs: "/poʊ ɪz ˈstʌfɪŋ ˈpiːtʃɪz ˈɪntuː hɪz maʊθ: aɪ iːt wɛn aɪm ʌpˈsɛt, oʊˈkeɪ? aɪ ˈprɑːbəbli sʌkt mɔːr ðæn ˈɛniˌbɑːdi ɪn ðə ˈhɪstəri əv kʊŋ fuː, ɪn ðə ˈhɪstəri əv ˈtʃaɪnə, ɪn ðə ˈhɪstəri əv ˈsʌkɪŋ!/",
    keywords: ["stuffing peaches", "upset", "history of kung fu", "sucked"],
    explanationAi: "Tiếng lóng khẩu ngữ biểu cảm: 'suck' (thất bại thảm hại, dở tệ). Po trải qua cảm giác tự ti sâu sắc sau khi bị Shifu và nhóm Ngũ Đại Hào Kiệt chê bai.",
    properNouns: ["Po", "China"]
  },
  {
    orderIndex: 15,
    startTime: 830.0,
    endTime: 855.0,
    text: "Master Oogway gently intervenes: There is a saying: Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.",
    translationVi: "Đại sư Oogway nhẹ nhàng can thiệp: Người xưa có câu danh ngôn: Hôm qua đã là lịch sử, ngày mai là điều bí ẩn, nhưng hôm nay là một món quà. Đó là lý do vì sao nó được gọi là Hiện tại (Present).",
    ipaUs: "/ˈmæstər ˈuːɡweɪ ˈdʒɛntli ˌɪntərˈviːnz: ðɛr ɪz ə ˈseɪɪŋ: ˈjɛstərdeɪ ɪz ˈhɪstəri, təˈmɑːroʊ ɪz ə ˈmɪstəri, bʌt təˈdeɪ ɪz ə ɡɪft. ðæt ɪz waɪ ɪt ɪz kɔːld ðə ˈprɛzənt./",
    keywords: ["yesterday is history", "tomorrow is a mystery", "today is a gift", "the present"],
    explanationAi: "Biện pháp chơi chữ triết lý kinh điển: 'present' mang hai nét nghĩa đồng âm: món quà vô giá và thời điểm hiện tại sống trọn vẹn từng khoảnh khắc.",
    properNouns: ["Master Oogway"]
  },
  {
    orderIndex: 16,
    startTime: 855.0,
    endTime: 880.0,
    text: "Shifu arrives in panic: Master, bad news! Tai Lung has broken out of prison! He is on his way to take the Dragon Scroll! Oogway replies: Nothing is impossible.",
    translationVi: "Shifu hoảng hốt chạy tới: Thưa Đại sư, tin dữ! Tai Lung đã vượt ngục! Hắn đang trên đường đến đây để đoạt lấy Cuộn Bí Kíp Rồng! Oogway điềm đạm đáp: Không có điều gì là bất khả thi cả.",
    ipaUs: "/ˈʃiːfuː əˈraɪvz ɪn ˈpænɪk: ˈmæstər, bæd njuːz! taɪ lʌŋ hæz ˈbroʊkən aʊt əv ˈprɪzən! hiː ɪz ɑːn hɪz weɪ tuː teɪk ðə ˈdræɡən skoʊl! ˈuːɡweɪ rɪˈplaɪz: ˈnʌθɪŋ ɪz ɪmˈpɑːsəbəl./",
    keywords: ["broken out of prison", "Dragon Scroll", "nothing is impossible"],
    explanationAi: "Cụm động từ: 'break out of prison' (vượt ngục). Đối lập sắc nét giữa sự hoảng loạn của Shifu và sự tĩnh tại vô vi của Đại sư Oogway.",
    properNouns: ["Shifu", "Tai Lung", "Dragon Scroll", "Oogway"]
  },
  {
    orderIndex: 17,
    startTime: 880.0,
    endTime: 905.0,
    text: "Oogway imparts his core wisdom: My old friend, the panda will never fulfill his destiny, nor you yours, until you let go of the illusion of control.",
    translationVi: "Oogway truyền dạy triết lý cốt lõi của mình: Bạn già của ta ơi, chú gấu trúc sẽ không bao giờ hoàn thành sứ mệnh của nó, và cả con cũng vậy, chừng nào con chưa chịu buông bỏ ảo tưởng về sự kiểm soát.",
    ipaUs: "/ˈuːɡweɪ ɪmˈpɑːrts hɪz kɔːr ˈwɪzdəm: maɪ oʊld frɛnd, ðə ˈpændə wɪl ˈnɛvər fʊlˈfɪl hɪz ˈdɛstɪni, nɔːr juː jɔːrz, ənˈtɪl juː lɛt ɡoʊ əv ðɪ ɪˈluːʒən əv kənˈtroʊl./",
    keywords: ["fulfill destiny", "let go of", "illusion of control", "old friend"],
    explanationAi: "Thuật ngữ triết học tâm linh: 'illusion of control' (ảo tưởng có thể kiểm soát vũ trụ theo ý muốn cá nhân) và 'let go of' (buông xả chấp niệm).",
    properNouns: ["Oogway"]
  },
  {
    orderIndex: 18,
    startTime: 905.0,
    endTime: 930.0,
    text: "Shifu questions: Illusion? — Yes. Look at this tree, Shifu. I cannot make it blossom when it suits me, nor make it bear fruit before its time.",
    translationVi: "Shifu thắc mắc: Ảo tưởng ư? — Đúng vậy. Hãy nhìn cây đào này xem, Shifu. Ta không thể bắt nó nở hoa khi ta muốn, cũng chẳng thể ép nó đơm hoa kết trái trước thời vụ.",
    ipaUs: "/ˈʃiːfuː ˈkwɛstʃənz: ɪˈluːʒən? — jɛs. lʊk æt ðɪs triː, ˈʃiːfuː. aɪ ˈkænɑːt meɪk ɪt ˈblɑːsəm wɛn ɪt suːts miː, nɔːr meɪk ɪt bɛr fruːt bɪˈfɔːr ɪts taɪm./",
    keywords: ["blossom", "suits me", "bear fruit", "before its time"],
    explanationAi: "Thành ngữ biểu tượng: 'bear fruit' (đơm hoa kết trái, mang lại thành quả), 'before its time' (trước thời điểm tự nhiên chín muồi). Oogway dùng tự nhiên để dạy đạo.",
    properNouns: ["Shifu"]
  },
  {
    orderIndex: 19,
    startTime: 930.0,
    endTime: 955.0,
    text: "Shifu kicks the tree, causing peaches to rain down: But there are things we can control! I can control when the fruit will fall! And I can control where to plant the seed! That is no illusion, Master!",
    translationVi: "Shifu đá mạnh vào thân cây, khiến những quả đào rơi như mưa: Nhưng có những thứ chúng ta kiểm soát được chứ! Con có thể kiểm soát thời điểm trái đào rơi xuống! Và con có thể kiểm soát nơi gieo mầm hạt giống! Đó không hề là ảo tưởng, thưa Đại sư!",
    ipaUs: "/ˈʃiːfuː kɪks ðə triː, ˈkɔːzɪŋ ˈpiːtʃɪz tuː reɪn daʊn: bʌt ðɛr ɑːr θɪŋz wiː kæn kənˈtroʊl! aɪ kæn kənˈtroʊl wɛn ðə fruːt wɪl fɔːl! ænd aɪ kæn kənˈtroʊl wɛr tuː plænt ðə siːd! ðæt ɪz noʊ ɪˈluːʒən, ˈmæstər!/",
    keywords: ["rain down", "plant the seed", "things we can control", "no illusion"],
    explanationAi: "Sự cố chấp đầy lý lẽ của Shifu: Cố gắng dùng sức mạnh thể chất và kỷ luật thép để ép buộc thực tại tuân theo kế hoạch của bản thân.",
    properNouns: ["Shifu", "Master"]
  },
  {
    orderIndex: 20,
    startTime: 955.0,
    endTime: 985.0,
    text: "Oogway smiles patiently: Ah, yes. But no matter what you do, that seed will grow to be a peach tree. You may wish for an apple or an orange, but you will get a peach.",
    translationVi: "Oogway kiên nhẫn mỉm cười: À, phải rồi. Nhưng dù con có làm bất cứ điều gì đi nữa, hạt giống đó vẫn sẽ lớn lên thành một cây đào. Con có thể ước nó là một quả táo hay một quả cam, nhưng con sẽ chỉ nhận được một quả đào mà thôi.",
    ipaUs: "/ˈuːɡweɪ smaɪlz ˈpeɪʃəntli: ɑː, jɛs. bʌt noʊ ˈmætər wʌt juː duː, ðæt siːd wɪl ɡroʊ tuː biː ə piːtʃ triː. juː meɪ wɪʃ fɔːr ən ˈæpəl ɔːr ən ˈɔːrɪndʒ, bʌt juː wɪl ɡɛt ə piːtʃ./",
    keywords: ["no matter what you do", "seed will grow", "wish for an apple", "get a peach"],
    explanationAi: "Ẩn dụ giáo dục sâu sắc: Mỗi cá nhân có thiên bẩm riêng biệt. Không thể ép buộc chú gấu trúc vụng về Po phải trở thành hổ hay báo, mà phải phát triển tiềm năng vốn có của cậu.",
    properNouns: ["Oogway"]
  },
  {
    orderIndex: 21,
    startTime: 985.0,
    endTime: 1010.0,
    text: "Shifu cries out in despair: But a peach cannot defeat Tai Lung! — Oogway covers the seed with dirt: Maybe it can. If you are willing to guide it, to nurture it, to believe in it.",
    translationVi: "Shifu tuyệt vọng thốt lên: Nhưng một quả đào làm sao có thể đánh bại Tai Lung được chứ! — Oogway lấy đất phủ lên hạt giống: Có lẽ nó có thể đấy. Nếu con sẵn lòng chỉ dẫn nó, nuôi dưỡng nó, và đặt trọn niềm tin vào nó.",
    ipaUs: "/ˈʃiːfuː kraɪz aʊt ɪn dɪˈspɛr: bʌt ə piːtʃ ˈkænɑːt dɪˈfiːt taɪ lʌŋ! — ˈuːɡweɪ ˈkʌvərz ðə siːd wɪð dɜːrt: ˈmeɪbiː ɪt kæn. ɪf juː ɑːr ˈwɪlɪŋ tuː ɡaɪd ɪt, tuː ˈnɜːrtʃər ɪt, tuː bɪˈliːv ɪn ɪt./",
    keywords: ["defeat Tai Lung", "willing to guide", "nurture", "believe in it"],
    explanationAi: "Cụm ba động từ sư phạm: 'guide' (dẫn dắt), 'nurture' (chăm sóc nuôi dưỡng), 'believe in' (tin tưởng vô điều kiện). Đây là chìa khóa giúp Shifu sau này dạy võ cho Po bằng đồ ăn.",
    properNouns: ["Shifu", "Tai Lung", "Oogway"]
  },
  {
    orderIndex: 22,
    startTime: 1010.0,
    endTime: 1040.0,
    text: "Shifu pleads: But how? How? I need your help, master. — Oogway: No. You just need to believe. Promise me, Shifu. Promise me you will believe. — Shifu: I... I will try.",
    translationVi: "Shifu khẩn cầu: Nhưng bằng cách nào? Bằng cách nào cơ chứ? Con cần sự giúp đỡ của người, thưa Đại sư. — Oogway: Không. Con chỉ cần tin tưởng. Hãy hứa với ta, Shifu. Hãy hứa với ta rằng con sẽ vững tin. — Shifu: Con... con sẽ cố gắng.",
    ipaUs: "/ˈʃiːfuː pliːdz: bʌt haʊ? haʊ? aɪ niːd jʊər hɛlp, ˈmæstər. — ˈuːɡweɪ: noʊ. juː dʒʌst niːd tuː bɪˈliːv. ˈprɑːmɪs miː, ˈʃiːfuː. ˈprɑːmɪs miː juː wɪl bɪˈliːv. — ˈʃiːfuː: aɪ... aɪ wɪl traɪ./",
    keywords: ["need your help", "need to believe", "promise me", "I will try"],
    explanationAi: "Tương tác tâm lý cảm động: Lời trăng trối của Oogway trao gửi toàn bộ niềm tin và sứ mệnh cứu rỗi thung lũng vào tay Shifu.",
    properNouns: ["Shifu", "Oogway"]
  },
  {
    orderIndex: 23,
    startTime: 1040.0,
    endTime: 1070.0,
    text: "Oogway: Good. My time has come. You must continue your journey without me. Blossom petals envelop Oogway as he ascends peacefully into the heavens.",
    translationVi: "Oogway: Tốt lắm. Thời khắc của ta đã đến rồi. Con phải tiếp tục cuộc hành trình này mà không có ta bên cạnh. Những cánh hoa đào bao bọc lấy Oogway khi người nhẹ nhàng thăng thiên về cõi vĩnh hằng.",
    ipaUs: "/ˈuːɡweɪ: ɡʊd. maɪ taɪm hæz kʌm. juː mʌst kənˈtɪnjuː jʊər ˈdʒɜːrni wɪˈðaʊt miː. ˈblɑːsəm ˈpɛtəlz ɪnˈvɛləp ˈuːɡweɪ æz hiː əˈsɛndz ˈpiːsfəli ˈɪntuː ðə ˈhɛvənz./",
    keywords: ["my time has come", "continue your journey", "blossom petals", "ascends peacefully"],
    explanationAi: "Hình tượng điện ảnh bất hủ: Sự viên tịch thanh thản của Đại sư Oogway, biểu tượng của sự buông bỏ hoàn toàn và hòa mình vào đại đạo tự nhiên.",
    properNouns: ["Oogway"]
  },

  // CHAPTER 5: ADVANCED PHILOSOPHY, PRONUNCIATION & REVIEW (22:53 - 27:32)
  {
    orderIndex: 24,
    startTime: 1373.0,
    endTime: 1405.0,
    text: "Let's analyze the phrase 'when it suits me': to suit someone means to be convenient, acceptable, or appropriate for them, such as 'that time suits me well.'",
    translationVi: "Chúng ta hãy cùng phân tích cụm từ 'when it suits me': 'suit someone' có nghĩa là thuận tiện, chấp nhận được hoặc thích hợp với ai đó, chẳng hạn như 'thời gian đó rất phù hợp với tôi.'",
    ipaUs: "/lɛts ˈænəˌlaɪz ðə freɪz 'wɛn ɪt suːts miː': tuː suːt ˈsʌmwʌn miːnz tuː biː kənˈviːniənt, əkˈsɛptəbəl, ɔːr əˈproʊpriət fɔːr ðɛm, sʌtʃ æz 'ðæt taɪm suːts miː wɛl.'/",
    keywords: ["suits me", "convenient", "acceptable", "appropriate"],
    explanationAi: "Phân tích cấu trúc ngữ dụng học: 'suit' như một ngoại động từ chỉ sự tiện lợi và phù hợp với lịch trình hoặc sở thích của một người.",
    properNouns: []
  },
  {
    orderIndex: 25,
    startTime: 1405.0,
    endTime: 1435.0,
    text: "Notice the idiom 'bear fruit': literally trees bear fruit, but metaphorically it means that hard work or a prolonged effort yields positive, successful results.",
    translationVi: "Hãy chú ý đến thành ngữ 'bear fruit': theo nghĩa đen là cây cối đơm hoa kết trái, nhưng theo nghĩa bóng nó biểu thị sự lao động chăm chỉ hoặc nỗ lực bền bỉ cuối cùng cũng mang lại kết quả thành công mỹ mãn.",
    ipaUs: "/ˈnoʊtɪs ði ˈɪdiəm 'bɛr fruːt': ˈlɪtərəli triːz bɛr fruːt, bʌt ˌmɛtəˈfɔːrɪkli ɪt miːnz ðæt hɑːrd wɜːrk ɔːr ə prəˈlɔːŋd ˈɛfərt jiːldz ˈpɑːzətɪv, səkˈsɛsfəl rɪˈzʌlts./",
    keywords: ["bear fruit", "metaphorically", "prolonged effort", "yields results"],
    explanationAi: "Thành ngữ tiếng Anh cao cấp: 'bear fruit' là thành ngữ xuất hiện thường xuyên trong cả văn phong học thuật IELTS lẫn môi trường kinh doanh chuyên nghiệp.",
    properNouns: []
  },
  {
    orderIndex: 26,
    startTime: 1435.0,
    endTime: 1465.0,
    text: "In the line 'let go of the illusion of control', the phrasal verb 'let go of' means to release one's grip, both physically on an object and mentally on worries or obsession.",
    translationVi: "Trong câu 'let go of the illusion of control', cụm động từ 'let go of' có nghĩa là buông tay thả ra, vừa theo nghĩa đen về thể chất buông một đồ vật, vừa theo nghĩa bóng buông bỏ nỗi lo âu hay sự ám ảnh trong tâm trí.",
    ipaUs: "/ɪn ðə laɪn 'lɛt ɡoʊ əv ðɪ ɪˈluːʒən əv kənˈtroʊl', ðə ˈfreɪzəl vɜːrb 'lɛt ɡoʊ əv' miːnz tuː rɪˈliːs wʌnz ɡrɪp, boʊθ ˈfɪzɪkli ɑːn ən ˈɑːbdʒɪkt ænd ˈmɛntəli ɑːn ˈwɜːriz ɔːr əbˈsɛʃən./",
    keywords: ["let go of", "release grip", "illusion of control", "mental obsession"],
    explanationAi: "Cụm động từ tâm lý học sâu sắc: 'let go of' (buông xả, ngừng kiểm soát cưỡng cầu).",
    properNouns: []
  },
  {
    orderIndex: 27,
    startTime: 1465.0,
    endTime: 1500.0,
    text: "Now in the scene review, listen to the actors' natural delivery without subtitles: observe Dustin Hoffman's crisp articulation as Shifu and Randall Duk Kim's serene cadence as Oogway.",
    translationVi: "Bây giờ trong phần xem lại phân cảnh, hãy lắng nghe lối diễn xuất âm thanh tự nhiên của các diễn viên mà không cần phụ đề: quan sát cách nhả chữ sắc sảo của Dustin Hoffman trong vai Shifu và ngữ điệu thanh thản, từ tốn của Randall Duk Kim trong vai Oogway.",
    ipaUs: "/naʊ ɪn ðə siːn rɪˈvjuː, ˈlɪsən tuː ði ˈæktərz ˈnætʃərəl dɪˈlɪvəri wɪˈðaʊt ˈsʌbˌtaɪtəlz: əbˈzɜːrv ˈdʌstɪn ˈhɑːfmənz krɪsp ɑːrˌtɪkjəˈleɪʃən æz ˈʃiːfuː ænd ˈrændəl dʌk kɪmz səˈriːn ˈkeɪdəns æz ˈuːɡweɪ./",
    keywords: ["scene review", "natural delivery", "crisp articulation", "serene cadence"],
    explanationAi: "Nghệ thuật lồng tiếng Hollywood: Sự tương phản âm học giữa nhịp điệu dồn dập (crisp articulation) của Shifu và nhịp điệu tĩnh tại (serene cadence) của Oogway.",
    properNouns: ["Dustin Hoffman", "Shifu", "Randall Duk Kim", "Oogway"]
  },
  {
    orderIndex: 28,
    startTime: 1500.0,
    endTime: 1560.0,
    text: "If you're enjoying this lesson, you'll definitely love our lesson on the classic animation Shrek, where you'll learn both formal and informal vocabulary with Scottish and English accents.",
    translationVi: "Nếu bạn yêu thích bài học này, chắc chắn bạn cũng sẽ say mê bài học của chúng tôi về bộ phim hoạt hình kinh điển Shrek, nơi bạn sẽ được học cả từ vựng trang trọng lẫn thân mật cùng các chất giọng Scotland và Anh.",
    ipaUs: "/ɪf jʊr ɛnˈdʒɔɪɪŋ ðɪs ˈlɛsən, juːl ˈdɛfənətli lʌv ˈaʊər ˈlɛsən ɑːn ðə ˈklæsɪk ˌænəˈmeɪʃən ʃrɛk, wɛr juːl lɜːrn boʊθ ˈfɔːrməl ænd ɪnˈfɔːrməl voʊˈkæbjəˌlɛri wɪð ˈskɑːtɪʃ ænd ˈɪŋɡlɪʃ ˈæksɛnts./",
    keywords: ["classic animation", "Shrek", "Scottish accent", "formal and informal"],
    explanationAi: "Mở rộng liên văn hóa: Khám phá sự đa dạng của các phương ngữ tiếng Anh (accents) qua các tác phẩm hoạt hình của DreamWorks.",
    properNouns: ["Shrek"]
  },
  {
    orderIndex: 29,
    startTime: 1560.0,
    endTime: 1630.0,
    text: "I hope you enjoyed today's lesson! Don't forget to give us a thumbs up down below so that we know you want more content like this. Thanks for joining me today, and keep practicing your English every single day!",
    translationVi: "Tôi hy vọng bạn đã có một khoảng thời gian học tập tuyệt vời hôm nay! Đừng quên bấm nút thích phía dưới để chúng tôi biết bạn muốn có thêm nhiều bài học như thế này nhé. Cảm ơn bạn đã tham gia cùng tôi hôm nay, và hãy tiếp tục luyện tập tiếng Anh mỗi ngày!",
    ipaUs: "/aɪ hoʊp juː ɛnˈdʒɔɪd təˈdeɪz ˈlɛsən! doʊnt fərˈɡɛt tuː ɡɪv ʌs ə θʌmz ʌp daʊn bɪˈloʊ soʊ ðæt wiː noʊ juː wɑːnt mɔːr ˈkɑːntɛnt laɪk ðɪs. θæŋks fɔːr ˈdʒɔɪnɪŋ miː təˈdeɪ, ænd kiːp ˈpræktəsɪŋ jʊər ˈɪŋɡlɪʃ ˈɛvri ˈsɪŋɡəl deɪ!/",
    keywords: ["thumbs up", "joining me", "keep practicing", "every single day"],
    explanationAi: "Lời kết truyền cảm hứng học tập bền bỉ: Thói quen luyện tập hàng ngày ('every single day') là con đường chân thực nhất dẫn đến sự lưu loát ngôn ngữ.",
    properNouns: []
  }
];

// Calculate tokenCount for each segment
segmentsData.forEach((seg) => {
  const tokens = tokenizeSentence(seg.text, seg.properNouns);
  seg.tokenCount = tokens.length;
  console.log(`Segment ${seg.orderIndex}: ${seg.tokenCount} tokens`);
});

const quizData = {
  lessonId: "mov_ani_01",
  lessonTitle: "Kung Fu Panda: Master Oogway Wisdom & The Peach Tree",
  totalQuestions: 6,
  xpReward: 150,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "q_mov_ani_01_1",
      question: "What English wordplay does Master Oogway use to teach the importance of the present moment?",
      questionEn: "What English wordplay does Master Oogway use to teach the importance of the present moment?",
      questionVi: "Đại sư Oogway sử dụng cách chơi chữ tiếng Anh nào để dạy về tầm quan trọng của khoảnh khắc hiện tại?",
      options: [
        "The double meaning of 'present', which means both a gift and the current time",
        "The rhyming sound between 'history' and 'mystery'",
        "The comparison between peach blossoms and martial arts belts",
        "The ancient translation of the word 'Kung Fu'"
      ],
      optionsEn: [
        "The double meaning of 'present', which means both a gift and the current time",
        "The rhyming sound between 'history' and 'mystery'",
        "The comparison between peach blossoms and martial arts belts",
        "The ancient translation of the word 'Kung Fu'"
      ],
      optionsVi: [
        "Nghĩa đôi của từ 'present', vừa có nghĩa là món quà vừa có nghĩa là hiện tại",
        "Vần điệu giữa từ 'history' và 'mystery'",
        "So sánh hoa đào với đai võ thuật",
        "Bản dịch cổ của từ 'Kung Fu'"
      ],
      correctAnswer: 0,
      explanation: "Master Oogway explains: 'Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.'",
      explanationEn: "Master Oogway explains: 'Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.'",
      explanationVi: "Đại sư Oogway giải thích: 'Hôm nay là một món quà (gift). Đó là lý do nó được gọi là present.'",
      targetedConcept: "Wordplay & Philosophical Vocabulary",
      targetedConceptEn: "Wordplay & Philosophical Vocabulary",
      targetedConceptVi: "Chơi chữ và từ vựng triết học",
      referenceSegmentIndex: 15
    },
    {
      id: "q_mov_ani_01_2",
      question: "What comedic mishap occurs during Po's acupuncture session with Mantis?",
      questionEn: "What comedic mishap occurs during Po's acupuncture session with Mantis?",
      questionVi: "Sự cố hài hước nào xảy ra trong buổi châm cứu của Po với Mantis?",
      options: [
        "Mantis accidentally tweaks Po's facial nerve, temporarily paralyzing his face and stopping his heart",
        "Po swallows all the acupuncture needles by mistake",
        "Viper accidentally ties herself into a knot",
        "Tigress breaks the wooden examination table in half"
      ],
      optionsEn: [
        "Mantis accidentally tweaks Po's facial nerve, temporarily paralyzing his face and stopping his heart",
        "Po swallows all the acupuncture needles by mistake",
        "Viper accidentally ties herself into a knot",
        "Tigress breaks the wooden examination table in half"
      ],
      optionsVi: [
        "Mantis vô tình châm trúng dây thần kinh mặt của Po, khiến mặt cậu tạm thời bị liệt và làm tim cậu ngừng đập",
        "Po vô tình nuốt hết kim châm cứu",
        "Viper tự thắt mình thành một nút thắt",
        "Tigress bẻ gãy đôi chiếc bàn khám bằng gỗ"
      ],
      correctAnswer: 0,
      explanation: "Mantis admits: 'My fault! I accidentally tweaked his facial nerve. And may have also stopped his heart.'",
      explanationEn: "Mantis admits: 'My fault! I accidentally tweaked his facial nerve. And may have also stopped his heart.'",
      explanationVi: "Mantis thú nhận: 'Lỗi tại tôi! Tôi lỡ châm nhầm dây thần kinh mặt của cậu ấy. Và có lẽ cũng vừa làm tim cậu ấy ngừng đập.'",
      targetedConcept: "Comedic Medical Terminology",
      targetedConceptEn: "Comedic Medical Terminology",
      targetedConceptVi: "Thuật ngữ y khoa hài hước trong đối thoại",
      referenceSegmentIndex: 8
    },
    {
      id: "q_mov_ani_01_3",
      question: "What does the expression 'let go of the illusion of control' teach Shifu?",
      questionEn: "What does the expression 'let go of the illusion of control' teach Shifu?",
      questionVi: "Cụm từ 'buông bỏ ảo tưởng về sự kiểm soát' (let go of the illusion of control) dạy cho Shifu điều gì?",
      options: [
        "To accept that natural growth and destiny cannot be forcibly engineered by sheer willpower",
        "To abandon martial arts entirely and become an orchard farmer",
        "To stop planting peach seeds on high mountain peaks",
        "To let Tai Lung conquer the Valley of Peace without resistance"
      ],
      optionsEn: [
        "To accept that natural growth and destiny cannot be forcibly engineered by sheer willpower",
        "To abandon martial arts entirely and become an orchard farmer",
        "To stop planting peach seeds on high mountain peaks",
        "To let Tai Lung conquer the Valley of Peace without resistance"
      ],
      optionsVi: [
        "Chấp nhận rằng sự phát triển tự nhiên và số mệnh không thể bị cưỡng ép bằng ý chí chuyên quyền",
        "Từ bỏ hoàn toàn võ thuật để đi làm nông dân trồng đào",
        "Ngừng gieo hạt đào trên các đỉnh núi cao",
        "Để mặc cho Tai Lung xâm chiếm Thung lũng Bình Yên"
      ],
      correctAnswer: 0,
      explanation: "Oogway uses the peach tree to teach that one cannot force things to happen before their natural time.",
      explanationEn: "Oogway uses the peach tree to teach that one cannot force things to happen before their natural time.",
      explanationVi: "Oogway dùng hình ảnh cây đào để dạy rằng con người không thể cưỡng ép vạn vật diễn ra trước thời vụ tự nhiên.",
      targetedConcept: "Philosophical Idiom: Illusion of Control",
      targetedConceptEn: "Philosophical Idiom: Illusion of Control",
      targetedConceptVi: "Thành ngữ triết học: Ảo tưởng kiểm soát",
      referenceSegmentIndex: 17
    },
    {
      id: "q_mov_ani_01_4",
      question: "What metaphor does Oogway use regarding a seed and fruit trees?",
      questionEn: "What metaphor does Oogway use regarding a seed and fruit trees?",
      questionVi: "Oogway sử dụng ẩn dụ nào liên quan đến hạt giống và cây ăn quả?",
      options: [
        "A peach seed will only grow into a peach tree, you cannot wish it to become an orange or an apple",
        "A tree with deep roots can withstand any winter snowstorm",
        "Fruit picked too early will always taste bitter to the palate",
        "Only the strongest seeds survive in the rocky terrain"
      ],
      optionsEn: [
        "A peach seed will only grow into a peach tree, you cannot wish it to become an orange or an apple",
        "A tree with deep roots can withstand any winter snowstorm",
        "Fruit picked too early will always taste bitter to the palate",
        "Only the strongest seeds survive in the rocky terrain"
      ],
      optionsVi: [
        "Hạt đào sẽ chỉ lớn lên thành cây đào, con không thể ước nó biến thành cây cam hay cây táo được",
        "Cây có rễ sâu có thể chịu được mọi bão tuyết mùa đông",
        "Trái cây hái quá sớm sẽ luôn có vị đắng ngắt",
        "Chỉ những hạt giống khỏe nhất mới sống sót trên vách đá"
      ],
      correctAnswer: 0,
      explanation: "Oogway states: 'No matter what you do, that seed will grow to be a peach tree. You may wish for an apple or an orange, but you will get a peach.'",
      explanationEn: "Oogway states: 'No matter what you do, that seed will grow to be a peach tree. You may wish for an apple or an orange, but you will get a peach.'",
      explanationVi: "Oogway khẳng định: 'Dù con làm gì đi nữa, hạt đó vẫn sẽ mọc thành cây đào. Con có ước thành táo hay cam thì con vẫn sẽ nhận được một cây đào.'",
      targetedConcept: "Metaphor of Individual Nature & Pedagogy",
      targetedConceptEn: "Metaphor of Individual Nature & Pedagogy",
      targetedConceptVi: "Ẩn dụ về thiên tính tự nhiên và giáo dục",
      referenceSegmentIndex: 20
    },
    {
      id: "q_mov_ani_01_5",
      question: "What three actions does Oogway advise Shifu to take so that a 'peach' can defeat Tai Lung?",
      questionEn: "What three actions does Oogway advise Shifu to take so that a 'peach' can defeat Tai Lung?",
      questionVi: "Oogway khuyên Shifu nên thực hiện ba hành động nào để một 'quả đào' có thể đánh bại được Tai Lung?",
      options: [
        "To guide it, to nurture it, and to believe in it",
        "To punish it, to starve it, and to isolate it",
        "To challenge it, to compete with it, and to test it",
        "To hide it, to protect it, and to send it away"
      ],
      optionsEn: [
        "To guide it, to nurture it, and to believe in it",
        "To punish it, to starve it, and to isolate it",
        "To challenge it, to compete with it, and to test it",
        "To hide it, to protect it, and to send it away"
      ],
      optionsVi: [
        "Chỉ dẫn nó (guide), nuôi dưỡng nó (nurture), và tin tưởng vào nó (believe in it)",
        "Trừng phạt nó, bỏ đói nó và cô lập nó",
        "Thách thức nó, tranh đấu với nó và kiểm tra nó",
        "Giấu nó đi, bảo vệ nó và gửi nó đi thật xa"
      ],
      correctAnswer: 0,
      explanation: "Oogway tells Shifu: 'Maybe it can. If you are willing to guide it, to nurture it, to believe in it.'",
      explanationEn: "Oogway tells Shifu: 'Maybe it can. If you are willing to guide it, to nurture it, to believe in it.'",
      explanationVi: "Oogway chỉ bảo Shifu: 'Có lẽ nó có thể đấy. Nếu con sẵn lòng chỉ dẫn nó, nuôi dưỡng nó, và tin tưởng vào nó.'",
      targetedConcept: "Three Pedagogical Pillars",
      targetedConceptEn: "Three Pedagogical Pillars",
      targetedConceptVi: "Ba trụ cột sư phạm phát triển tiềm năng",
      referenceSegmentIndex: 21
    },
    {
      id: "q_mov_ani_01_6",
      question: "What does the English idiom 'bear fruit' mean in everyday professional and academic contexts?",
      questionEn: "What does the English idiom 'bear fruit' mean in everyday professional and academic contexts?",
      questionVi: "Thành ngữ tiếng Anh 'bear fruit' có ý nghĩa gì trong ngữ cảnh học thuật và đời sống hàng ngày?",
      options: [
        "Yielding positive, successful results after hard work or persistent efforts",
        "Harvesting ripe fruits from an agricultural field",
        "Cooking sweet desserts using natural ingredients",
        "Traveling across the country to trade agricultural goods"
      ],
      optionsEn: [
        "Yielding positive, successful results after hard work or persistent efforts",
        "Harvesting ripe fruits from an agricultural field",
        "Cooking sweet desserts using natural ingredients",
        "Traveling across the country to trade agricultural goods"
      ],
      optionsVi: [
        "Mang lại những kết quả tích cực, thành công mỹ mãn sau một quá trình nỗ lực chăm chỉ",
        "Thu hoạch trái cây chín từ nông trại",
        "Nấu các món tráng miệng ngọt ngào từ nguyên liệu tự nhiên",
        "Du hành khắp đất nước để buôn bán nông sản"
      ],
      correctAnswer: 0,
      explanation: "In English, 'to bear fruit' metaphorically means that a plan, project, or persistent endeavor achieves productive and worthwhile outcomes.",
      explanationEn: "In English, 'to bear fruit' metaphorically means that a plan, project, or persistent endeavor achieves productive and worthwhile outcomes.",
      explanationVi: "Trong tiếng Anh, 'to bear fruit' mang nghĩa bóng là kế hoạch hoặc nỗ lực kiên trì mang lại thành quả xứng đáng.",
      targetedConcept: "Idiom: Bear fruit",
      targetedConceptEn: "Idiom: Bear fruit",
      targetedConceptVi: "Thành ngữ: Đơm hoa kết trái / đạt kết quả mỹ mãn",
      referenceSegmentIndex: 25
    }
  ]
};

let tsCode = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: Kung Fu Panda: Master Oogway Wisdom & The Peach Tree
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR B1 | American Accent
 * YouTube ID: SAY6Mptrj5s (27:32 - 1652s)
 * Views: 2,453,009 | RealLife English
 * 
 * BÁM SÁT 100% TOÀN BỘ 5 CHAPTERS TỪ VIDEO GỐC (00:45 - 27:10)
 * BAO PHỦ CẢ PHÂN CẢNH CHÂM CỨU HÀI HƯỚC, TRIẾT LÝ CÂY ĐÀO THIÊNG VÀ BÀI GIẢNG NGỮ ÂM
 * ============================================================================
 */

export const QUIZ_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE: VideoQuizData = ${JSON.stringify(quizData, null, 2)};

export const LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE: MockVideoLesson = {
  id: "mov_ani_01",
  slug: "kung-fu-panda-master-oogway-wisdom-peach-tree",
  title: "Kung Fu Panda: Master Oogway Wisdom & The Peach Tree",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "B1",
  durationFormatted: "27:32",
  durationSeconds: 1652,
  externalId: "SAY6Mptrj5s",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/SAY6Mptrj5s/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 125,
  viewCount: 2453009,
  studyCount: 6780,
  description:
    "Học tiếng Anh chuyên sâu cùng Kung Fu Panda: Từ phân cảnh châm cứu cười ra nước mắt của Po và Mantis, đến triết lý phương Đông thâm sâu của Đại sư Oogway bên Cây Đào Thiêng: 'Hôm qua là lịch sử, ngày mai là bí ẩn, hôm nay là món quà (present)', buông bỏ ảo tưởng kiểm soát và nghệ thuật dẫn dắt tiềm năng con người.",
  segments: [\n`;

segmentsData.forEach((seg) => {
  tsCode += `    {\n`;
  tsCode += `      orderIndex: ${seg.orderIndex},\n`;
  tsCode += `      startTime: ${seg.startTime.toFixed(1)},\n`;
  tsCode += `      endTime: ${seg.endTime.toFixed(1)},\n`;
  tsCode += `      text: ${JSON.stringify(seg.text)},\n`;
  tsCode += `      translationVi: ${JSON.stringify(seg.translationVi)},\n`;
  tsCode += `      ipaUs: ${JSON.stringify(seg.ipaUs)},\n`;
  tsCode += `      keywords: ${JSON.stringify(seg.keywords)},\n`;
  tsCode += `      explanationAi: ${JSON.stringify(seg.explanationAi)},\n`;
  tsCode += `      properNouns: ${JSON.stringify(seg.properNouns)},\n`;
  tsCode += `      tokenCount: ${seg.tokenCount},\n`;
  tsCode += `    },\n`;
});

tsCode += `  ],
  quiz: QUIZ_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE,
};

export default LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE;
`;

fs.writeFileSync('features/listening/data/lessons/movies/animation/lesson_kung_fu_panda.ts', tsCode, 'utf-8');
console.log("Successfully generated features/listening/data/lessons/movies/animation/lesson_kung_fu_panda.ts!");
