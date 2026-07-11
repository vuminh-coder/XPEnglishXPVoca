// ============================================================
// Grammar Lesson Content Data
// Comprehensive content for all 60 grammar topics
// Structure: Theory → Examples → Common Mistakes → Memory Tips
// ============================================================

export interface GrammarExample {
  en: string;
  vi: string;
  highlight: string;
}

export interface GrammarMistake {
  wrong: string;
  correct: string;
  explanation: string;
}

export interface GrammarUsage {
  context: string;   // e.g. "IELTS Writing Task 1"
  example: string;
  note?: string;
}

export interface GrammarLesson {
  topicId: string;
  title: string;
  titleEn: string;
  formulas: string[];
  usages: GrammarUsage[];
  examples: GrammarExample[];
  commonMistakes: GrammarMistake[];
  memoryTip: string;
  signalWords: string[];
  extraRules?: string[];
}

// ============================================================
// BASIC LEVEL — 20 Topics
// ============================================================

const BASIC_LESSONS: GrammarLesson[] = [
  // ── 1. Present Simple ──
  {
    topicId: "present_simple",
    title: "Thì Hiện tại đơn",
    titleEn: "Present Simple",
    formulas: [
      "(+) S + V(s/es) + O",
      "(-) S + do/does + not + V",
      "(?) Do/Does + S + V?",
    ],
    usages: [
      { context: "IELTS Writing Task 1", example: "The graph shows that sales increase steadily each year." },
      { context: "IELTS Speaking", example: "I usually wake up at 6 AM and go to the gym." },
      { context: "TOEIC Part 5", example: "The company provides training for all new employees." },
    ],
    examples: [
      { en: "Water boils at 100°C.", vi: "Nước sôi ở 100°C.", highlight: "boils" },
      { en: "She works in a hospital.", vi: "Cô ấy làm việc ở bệnh viện.", highlight: "works" },
      { en: "The train leaves at 8 AM tomorrow.", vi: "Chuyến tàu rời lúc 8 giờ sáng mai.", highlight: "leaves" },
      { en: "I will call you when I arrive.", vi: "Tôi sẽ gọi bạn khi tôi đến.", highlight: "arrive" },
    ],
    commonMistakes: [
      { wrong: "She work in a hospital.", correct: "She works in a hospital.", explanation: "Chủ ngữ ngôi 3 số ít (He/She/It) phải thêm -s/es vào động từ." },
      { wrong: "She doesn't works here.", correct: "She doesn't work here.", explanation: "Sau doesn't, động từ phải ở dạng nguyên mẫu (không thêm -s)." },
      { wrong: "I am knowing the answer.", correct: "I know the answer.", explanation: "Know là động từ trạng thái (stative verb), không dùng thì tiếp diễn." },
      { wrong: "She usually is late.", correct: "She is usually late.", explanation: "Trạng từ tần suất đứng SAU động từ to be, TRƯỚC động từ thường." },
    ],
    memoryTip: "HeSheIt → thêm S cho FIT! Dùng cho: THÓI QUEN – SỰ THẬT – LỊCH TRÌNH.",
    signalWords: ["every day", "always", "usually", "often", "sometimes", "rarely", "never", "on Mondays", "twice a week"],
    extraRules: [
      "Thêm -es khi động từ tận cùng -ch, -sh, -s, -x, -o: watch→watches, go→goes",
      "y → ies khi trước y là phụ âm: study→studies, cry→cries",
      "have → has (bất quy tắc)",
      "Động từ trạng thái KHÔNG dùng tiếp diễn: like, love, know, believe, have, own, see, hear",
    ],
  },

  // ── 2. Present Continuous ──
  {
    topicId: "present_continuous",
    title: "Thì Hiện tại tiếp diễn",
    titleEn: "Present Continuous",
    formulas: [
      "(+) S + am/is/are + V-ing",
      "(-) S + am/is/are + not + V-ing",
      "(?) Am/Is/Are + S + V-ing?",
    ],
    usages: [
      { context: "IELTS Speaking Part 2", example: "In this picture, the children are playing in the park." },
      { context: "TOEIC Part 6", example: "The marketing team is developing a new campaign this month." },
    ],
    examples: [
      { en: "I am studying for my IELTS exam right now.", vi: "Tôi đang ôn thi IELTS ngay bây giờ.", highlight: "am studying" },
      { en: "The world is changing rapidly.", vi: "Thế giới đang thay đổi nhanh chóng.", highlight: "is changing" },
      { en: "She is meeting her boss at 3 PM.", vi: "Cô ấy sẽ gặp sếp lúc 3 giờ chiều.", highlight: "is meeting" },
    ],
    commonMistakes: [
      { wrong: "I am knowing the answer.", correct: "I know the answer.", explanation: "Know là động từ trạng thái, không dùng tiếp diễn." },
      { wrong: "She is work now.", correct: "She is working now.", explanation: "Thiếu đuôi -ing. Cấu trúc: am/is/are + V-ing." },
      { wrong: "I am study English.", correct: "I am studying English.", explanation: "Phải thêm -ing vào sau động từ." },
    ],
    memoryTip: "Đang diễn ra NGAY BÂY GIỜ hoặc kế hoạch SẮP TỚI = am/is/are + V-ing.",
    signalWords: ["now", "at the moment", "currently", "today", "this week", "right now", "Look!", "Listen!"],
    extraRules: [
      "Động từ trạng thái (stative verbs) KHÔNG dùng tiếp diễn: know, like, love, hate, want, need, believe, understand, own, belong",
      "Dùng cho kế hoạch tương lai gần đã sắp xếp: I'm flying to Paris tomorrow.",
    ],
  },

  // ── 3. Past Simple ──
  {
    topicId: "past_simple",
    title: "Thì Quá khứ đơn",
    titleEn: "Past Simple",
    formulas: [
      "(+) S + V-ed / V2 + O",
      "(-) S + did not + V(nguyên mẫu)",
      "(?) Did + S + V(nguyên mẫu)?",
    ],
    usages: [
      { context: "IELTS Writing Task 1", example: "In 2010, the population reached 5 million." },
      { context: "IELTS Speaking Part 1", example: "I visited my grandmother last summer." },
      { context: "TOEIC Part 6", example: "The company launched a new product last quarter." },
    ],
    examples: [
      { en: "She bought a new car yesterday.", vi: "Cô ấy mua xe mới hôm qua.", highlight: "bought" },
      { en: "They lived in Paris for 5 years.", vi: "Họ đã sống ở Paris 5 năm.", highlight: "lived" },
      { en: "I didn't see him at the party.", vi: "Tôi không thấy anh ấy ở bữa tiệc.", highlight: "didn't see" },
    ],
    commonMistakes: [
      { wrong: "I have seen that movie yesterday.", correct: "I saw that movie yesterday.", explanation: "Có từ 'yesterday' → dùng quá khứ đơn, không dùng hiện tại hoàn thành." },
      { wrong: "She didn't went home.", correct: "She didn't go home.", explanation: "Sau didn't, động từ phải ở dạng nguyên mẫu." },
      { wrong: "Did she went to school?", correct: "Did she go to school?", explanation: "Sau Did, động từ phải ở dạng nguyên mẫu." },
    ],
    memoryTip: "Đã xảy ra, ĐÃ KẾT THÚC trong quá khứ → V-ed hoặc V2 (bất quy tắc).",
    signalWords: ["yesterday", "last week/month/year", "in 2010", "ago", "the other day", "when I was young"],
  },

  // ── 4. Past Continuous ──
  {
    topicId: "past_continuous",
    title: "Thì Quá khứ tiếp diễn",
    titleEn: "Past Continuous",
    formulas: [
      "(+) S + was/were + V-ing",
      "(-) S + was/were + not + V-ing",
      "(?) Was/Were + S + V-ing?",
    ],
    usages: [
      { context: "IELTS Speaking Part 2", example: "I was watching TV when the phone rang." },
      { context: "IELTS Writing Task 2", example: "While people were commuting to work, the accident happened." },
    ],
    examples: [
      { en: "She was cooking dinner when I arrived.", vi: "Cô ấy đang nấu ăn khi tôi đến.", highlight: "was cooking" },
      { en: "They were playing football at 3 PM yesterday.", vi: "Họ đang chơi bóng đá lúc 3 giờ chiều hôm qua.", highlight: "were playing" },
      { en: "While I was reading, she was sleeping.", vi: "Trong khi tôi đang đọc, cô ấy đang ngủ.", highlight: "was reading" },
    ],
    commonMistakes: [
      { wrong: "I was cook dinner.", correct: "I was cooking dinner.", explanation: "Thiếu đuôi -ing. Cấu trúc: was/were + V-ing." },
      { wrong: "She were studying.", correct: "She was studying.", explanation: "She → dùng was, không dùng were." },
    ],
    memoryTip: "While + QKTD, QKĐ — hoặc — QKĐ + when + QKTD. Hành động đang diễn ra thì bị XEN VÀO.",
    signalWords: ["while", "when", "at that time", "at 3 PM yesterday", "all day yesterday"],
  },

  // ── 5. Future Simple ──
  {
    topicId: "future_simple",
    title: "Thì Tương lai đơn",
    titleEn: "Future Simple",
    formulas: [
      "(+) S + will + V(nguyên mẫu)",
      "(-) S + will not (won't) + V",
      "(?) Will + S + V?",
    ],
    usages: [
      { context: "IELTS Speaking Part 3", example: "I think technology will continue to advance." },
      { context: "TOEIC Part 5", example: "The manager will hold a meeting tomorrow." },
    ],
    examples: [
      { en: "I'll call you back.", vi: "Tôi sẽ gọi lại cho bạn.", highlight: "will call" },
      { en: "It will rain tomorrow.", vi: "Ngày mai trời sẽ mưa.", highlight: "will rain" },
      { en: "I won't tell anyone your secret.", vi: "Tôi sẽ không nói cho ai bí mật của bạn.", highlight: "won't tell" },
    ],
    commonMistakes: [
      { wrong: "I will to go.", correct: "I will go.", explanation: "Sau will KHÔNG dùng 'to'. Will + V nguyên mẫu." },
      { wrong: "I will go to the store tomorrow.", correct: "I'm going to go to the store tomorrow.", explanation: "Kế hoạch đã định sẵn → dùng be going to, không dùng will." },
    ],
    memoryTip: "Will = 3 cách dùng: Quyết định NGAY LÚC NÓI + Dự đoán KHÔNG CĂN CỨ + Lời HỨA/đề nghị.",
    signalWords: ["I think", "I believe", "probably", "perhaps", "tomorrow", "next week", "in the future"],
  },

  // ── 6. Be Going To ──
  {
    topicId: "future_near",
    title: "Thì Tương lai gần",
    titleEn: "Be Going To",
    formulas: [
      "(+) S + am/is/are + going to + V",
      "(-) S + am/is/are + not + going to + V",
      "(?) Am/Is/Are + S + going to + V?",
    ],
    usages: [
      { context: "IELTS Speaking Part 1", example: "I am going to apply for a scholarship next year." },
      { context: "IELTS Writing Task 2", example: "The government is going to invest more in education." },
    ],
    examples: [
      { en: "She is going to study abroad next year.", vi: "Cô ấy sẽ đi du học năm tới.", highlight: "is going to study" },
      { en: "Look at those clouds! It's going to rain.", vi: "Nhìn mây kìa! Trời sắp mưa.", highlight: "is going to rain" },
    ],
    commonMistakes: [
      { wrong: "I'm going to help you.", correct: "I'll help you.", explanation: "Đề nghị giúp ngay lúc nói → dùng will, không dùng be going to." },
      { wrong: "She going to travel.", correct: "She is going to travel.", explanation: "Thiếu động từ to be (am/is/are)." },
    ],
    memoryTip: "Be going to = Kế hoạch ĐÃ ĐỊNH SẴN + Dự đoán CÓ CĂN CỨ (nhìn thấy dấu hiệu).",
    signalWords: ["tomorrow", "next week", "next year", "Look!", "plan to", "intend to"],
  },

  // ── 7. Singular & Plural Nouns ──
  {
    topicId: "singular_plural_nouns",
    title: "Danh từ số ít & số nhiều",
    titleEn: "Singular & Plural Nouns",
    formulas: [
      "Thêm -s: cat → cats, book → books",
      "Thêm -es: bus → buses, box → boxes",
      "y → ies: baby → babies, city → cities",
      "Bất quy tắc: child → children, man → men, woman → women",
    ],
    usages: [
      { context: "IELTS Writing Task 1", example: "The number of students increased significantly." },
      { context: "TOEIC Part 5", example: "Several countries participated in the conference." },
    ],
    examples: [
      { en: "Two children are playing in the park.", vi: "Hai đứa trẻ đang chơi trong công viên.", highlight: "children" },
      { en: "Many women work in this company.", vi: "Nhiều phụ nữ làm việc ở công ty này.", highlight: "women" },
    ],
    commonMistakes: [
      { wrong: "The informations are useful.", correct: "The information is useful.", explanation: "Information là danh từ không đếm được, không thêm -s." },
      { wrong: "Two childs are playing.", correct: "Two children are playing.", explanation: "Child → children (bất quy tắc), không phải childs." },
      { wrong: "Many peoples came.", correct: "Many people came.", explanation: "People đã là số nhiều, không thêm -s." },
    ],
    memoryTip: "Học danh từ bất quy tắc theo NHÓM: man/men, woman/women, child/children, tooth/teeth, foot/feet.",
    signalWords: ["many", "several", "a number of", "two/three/four..."],
  },

  // ── 8. Countable & Uncountable Nouns ──
  {
    topicId: "nouns_countability",
    title: "Danh từ đếm được & không đếm được",
    titleEn: "Countable & Uncountable Nouns",
    formulas: [
      "Đếm được: a/an + N, Ns, many, few, a few",
      "Không đếm được: some/any + N, much, little, a little",
      "Cả hai: a lot of, plenty of, some, any",
    ],
    usages: [
      { context: "IELTS Writing", example: "The research provides valuable information." },
      { context: "TOEIC Part 5", example: "We need some furniture for the office." },
    ],
    examples: [
      { en: "Can I have some water?", vi: "Cho tôi xin chút nước được không?", highlight: "some water" },
      { en: "I need an apple.", vi: "Tôi cần một quả táo.", highlight: "an apple" },
      { en: "She gave me a piece of advice.", vi: "Cô ấy cho tôi một lời khuyên.", highlight: "a piece of advice" },
    ],
    commonMistakes: [
      { wrong: "I need an advice.", correct: "I need some advice.", explanation: "Advice không đếm được → dùng some, không dùng a/an." },
      { wrong: "I have much books.", correct: "I have many books.", explanation: "Books đếm được → dùng many, không dùng much." },
      { wrong: "She has many money.", correct: "She has much money.", explanation: "Money không đếm được → dùng much." },
    ],
    memoryTip: "Không đếm được = CHẤT LỎNG (water, milk) + VẬT LIỆU (wood, gold) + Ý TƯỞNG (advice, information, news).",
    signalWords: ["a/an", "some", "any", "much", "many", "a few", "a little", "a piece of", "a glass of"],
  },

  // ── 9. Subject & Object Pronouns ──
  {
    topicId: "subject_object_pronouns",
    title: "Đại từ chủ ngữ & tân ngữ",
    titleEn: "Subject & Object Pronouns",
    formulas: [
      "Chủ ngữ: I, you, he, she, it, we, they",
      "Tân ngữ: me, you, him, her, it, us, them",
      "Công thức: Subject + Verb + Object",
    ],
    usages: [
      { context: "IELTS Writing", example: "John is a teacher. He teaches math." },
      { context: "TOEIC Part 6", example: "The manager asked us to attend the meeting." },
    ],
    examples: [
      { en: "She gave me the book.", vi: "Cô ấy đưa cho tôi cuốn sách.", highlight: "me" },
      { en: "They invited us to dinner.", vi: "Họ mời chúng tôi đi ăn tối.", highlight: "us" },
      { en: "I saw him at the station.", vi: "Tôi nhìn thấy anh ấy ở ga tàu.", highlight: "him" },
    ],
    commonMistakes: [
      { wrong: "Me went to the store.", correct: "I went to the store.", explanation: "Chủ ngữ phải dùng 'I', không dùng 'me'." },
      { wrong: "Her is very kind.", correct: "She is very kind.", explanation: "Chủ ngữ dùng 'she', 'her' chỉ dùng làm tân ngữ." },
      { wrong: "Him and I went.", correct: "He and I went.", explanation: "Khi làm chủ ngữ, dùng đại từ chủ ngữ: He and I." },
    ],
    memoryTip: "Chủ ngữ = TRƯỚC động từ (I love), Tân ngữ = SAU động từ (love me). I→me, he→him, she→her, we→us, they→them.",
    signalWords: [],
  },

  // ── 10. Reflexive & Demonstrative Pronouns ──
  {
    topicId: "reflexive_demonstrative",
    title: "Đại từ phản thân & chỉ định",
    titleEn: "Reflexive & Demonstrative Pronouns",
    formulas: [
      "Phản thân: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves",
      "Chỉ định gần: this (số ít), these (số nhiều)",
      "Chỉ định xa: that (số ít), those (số nhiều)",
    ],
    usages: [
      { context: "IELTS Speaking", example: "I taught myself English by watching movies." },
      { context: "IELTS Writing Task 2", example: "These are the main reasons for this issue." },
    ],
    examples: [
      { en: "She hurt herself.", vi: "Cô ấy tự làm mình bị thương.", highlight: "herself" },
      { en: "This is my book. Those are yours.", vi: "Đây là sách tôi. Kia là của bạn.", highlight: "Those" },
      { en: "I did it myself.", vi: "Tôi tự mình làm điều đó.", highlight: "myself" },
    ],
    commonMistakes: [
      { wrong: "He cut him.", correct: "He cut himself.", explanation: "Hành động quay lại chính chủ ngữ → dùng đại từ phản thân." },
      { wrong: "I enjoy me.", correct: "I enjoy myself.", explanation: "Cùng chủ ngữ → dùng phản thân: myself." },
    ],
    memoryTip: "Phản thân = hành động QUAY LẠI chủ ngữ. This/These = GẦN, That/Those = XA.",
    signalWords: ["by myself", "on my own", "this/that/these/those"],
  },

  // ── 11. Possessive Adjectives & Pronouns ──
  {
    topicId: "possessive_adj_pronouns",
    title: "Tính từ & Đại từ sở hữu",
    titleEn: "Possessive Adjectives & Pronouns",
    formulas: [
      "Tính từ sở hữu + Danh từ: my book, your car, his phone",
      "Đại từ sở hữu (KHÔNG + Danh từ): mine, yours, his, hers, ours, theirs",
      "my→mine, your→yours, his→his, her→hers, our→ours, their→theirs",
    ],
    usages: [
      { context: "IELTS Writing", example: "This is my opinion. That is yours." },
      { context: "TOEIC Part 5", example: "Each employee should bring their own laptop." },
    ],
    examples: [
      { en: "This is my car.", vi: "Đây là xe của tôi.", highlight: "my" },
      { en: "This car is mine.", vi: "Chiếc xe này là của tôi.", highlight: "mine" },
      { en: "Her house is bigger than ours.", vi: "Nhà cô ấy lớn hơn nhà chúng tôi.", highlight: "ours" },
    ],
    commonMistakes: [
      { wrong: "This is mine car.", correct: "This is my car.", explanation: "Đại từ sở hữu (mine) KHÔNG đi kèm danh từ. Dùng tính từ sở hữu (my) + danh từ." },
      { wrong: "The book is her.", correct: "The book is hers.", explanation: "Đại từ sở hữu của she là 'hers', không phải 'her'." },
    ],
    memoryTip: "Tính từ sở hữu + N (my book). Đại từ sở hữu thay thế cả cụm (mine = my book).",
    signalWords: [],
  },

  // ── 12. Possessive Case ('s) ──
  {
    topicId: "possessive_case",
    title: "Danh từ sở hữu cách ('s)",
    titleEn: "Possessive Case",
    formulas: [
      "Số ít: John's book, the teacher's desk",
      "Số nhiều kết thúc -s: students' books, teachers' room",
      "Số nhiều không kết thúc -s: children's toys, women's rights",
    ],
    usages: [
      { context: "IELTS Writing", example: "The government's decision was controversial." },
      { context: "TOEIC Part 5", example: "The company's revenue increased by 20%." },
    ],
    examples: [
      { en: "My mother's car is new.", vi: "Xe của mẹ tôi mới.", highlight: "mother's" },
      { en: "The students' results were excellent.", vi: "Kết quả của các sinh viên rất xuất sắc.", highlight: "students'" },
      { en: "The children's playground is big.", vi: "Sân chơi của bọn trẻ rất lớn.", highlight: "children's" },
    ],
    commonMistakes: [
      { wrong: "The car of my mother is new.", correct: "My mother's car is new.", explanation: "Dùng sở hữu cách ('s) cho người → ngắn gọn và tự nhiên hơn." },
      { wrong: "The students's books.", correct: "The students' books.", explanation: "Danh từ số nhiều kết thúc -s chỉ thêm dấu nháy (')." },
    ],
    memoryTip: "Người → dùng 's (John's). Vật → dùng of (the door of the car). Số nhiều -s → chỉ thêm '.",
    signalWords: [],
  },

  // ── 13. Basic Determiners: Some, Any, No ──
  {
    topicId: "determiners_basic",
    title: "Từ hạn định: Some, Any, No",
    titleEn: "Basic Determiners",
    formulas: [
      "Some: Câu khẳng định + đề nghị/mời",
      "Any: Câu phủ định + câu hỏi",
      "No: Phủ định mạnh = not any (No + Danh từ)",
    ],
    usages: [
      { context: "IELTS Speaking", example: "Do you have any questions about the topic?" },
      { context: "TOEIC Part 5", example: "There are no seats available for the event." },
    ],
    examples: [
      { en: "I have some money.", vi: "Tôi có một ít tiền.", highlight: "some" },
      { en: "Do you have any money?", vi: "Bạn có tiền không?", highlight: "any" },
      { en: "I have no money.", vi: "Tôi không có đồng nào.", highlight: "no" },
      { en: "Would you like some coffee?", vi: "Bạn có muốn uống cà phê không?", highlight: "some" },
    ],
    commonMistakes: [
      { wrong: "I don't have no money.", correct: "I don't have any money. / I have no money.", explanation: "Double negative (phủ định kép) là SAI trong tiếng Anh chuẩn." },
      { wrong: "Do you have some questions?", correct: "Do you have any questions?", explanation: "Câu hỏi thông thường dùng any. Chỉ dùng some khi mời/đề nghị." },
    ],
    memoryTip: "Some = CÓ (khẳng định, mời), Any = KHÔNG/HỎI (phủ định, câu hỏi), No = KHÔNG GÌ CẢ.",
    signalWords: ["some", "any", "no", "someone", "anyone", "something", "anything", "nothing"],
  },

  // ── 14. Basic Quantifiers ──
  {
    topicId: "quantifiers_basic",
    title: "Lượng từ: Much, Many, Few, Little",
    titleEn: "Basic Quantifiers",
    formulas: [
      "Much + không đếm được: much water, much time",
      "Many + đếm được số nhiều: many books, many people",
      "A lot of / Lots of + cả hai (câu khẳng định)",
      "Few / A few + đếm được: few friends (ít-tiêu cực), a few friends (một vài-tích cực)",
      "Little / A little + không đếm được: little money (ít-tiêu cực), a little money (một chút-tích cực)",
    ],
    usages: [
      { context: "IELTS Writing Task 1", example: "Many students prefer online learning." },
      { context: "IELTS Writing Task 2", example: "Little attention was given to this issue." },
    ],
    examples: [
      { en: "How much water do you need?", vi: "Bạn cần bao nhiêu nước?", highlight: "much" },
      { en: "How many people came?", vi: "Có bao nhiêu người đến?", highlight: "many" },
      { en: "I have few friends.", vi: "Tôi có ít bạn (tiêu cực).", highlight: "few" },
      { en: "I have a few friends.", vi: "Tôi có một vài người bạn (tích cực).", highlight: "a few" },
    ],
    commonMistakes: [
      { wrong: "I have much books.", correct: "I have many books.", explanation: "Books đếm được → dùng many, không dùng much." },
      { wrong: "There are much people.", correct: "There are many people.", explanation: "People đếm được → dùng many." },
    ],
    memoryTip: "Much = Không đếm được, Many = Đếm được. Few/Little = ÍT (buồn), A few/A little = MỘT VÀI (vui).",
    signalWords: ["how much", "how many", "too much", "too many", "so much", "so many"],
  },

  // ── 15. Basic Articles ──
  {
    topicId: "basic_articles",
    title: "Mạo từ xác định & Không xác định",
    titleEn: "Basic Articles (A, An, The)",
    formulas: [
      "A + phụ âm: a book, a university (âm /juː/)",
      "An + nguyên âm: an apple, an hour (âm câm h)",
      "The: Đã biết, duy nhất, xác định",
      "Không mạo từ: Danh từ chung, không xác định số nhiều/không đếm được",
    ],
    usages: [
      { context: "IELTS Writing", example: "The government should invest in education." },
      { context: "TOEIC Part 5", example: "We need to hire a new manager for the project." },
    ],
    examples: [
      { en: "I saw a cat. The cat was black.", vi: "Tôi nhìn thấy một con mèo. Con mèo đó màu đen.", highlight: "a cat / The cat" },
      { en: "She is an engineer.", vi: "Cô ấy là kỹ sư.", highlight: "an" },
      { en: "The sun rises in the east.", vi: "Mặt trời mọc ở phía đông.", highlight: "The" },
    ],
    commonMistakes: [
      { wrong: "I saw cat.", correct: "I saw a cat.", explanation: "Danh từ đếm được số ít phải có mạo từ." },
      { wrong: "She is a honest person.", correct: "She is an honest person.", explanation: "Honest bắt đầu bằng âm nguyên âm (/ˈɒn.ɪst/) → dùng an." },
      { wrong: "The life is beautiful.", correct: "Life is beautiful.", explanation: "Nói chung về cuộc sống → không dùng the." },
    ],
    memoryTip: "A/An = lần ĐẦU nhắc đến. The = đã biết/DUY NHẤT. Không mạo từ = nói CHUNG.",
    signalWords: ["a", "an", "the"],
  },

  // ── 16. Adjectives & Adverbs of Manner ──
  {
    topicId: "basic_adj_adv",
    title: "Tính từ & Trạng từ chỉ thể cách",
    titleEn: "Adjectives & Adverbs of Manner",
    formulas: [
      "Tính từ: Bổ nghĩa cho danh từ (a beautiful house) hoặc sau linking verb (She is beautiful)",
      "Trạng từ: Bổ nghĩa cho động từ (drive carefully), tính từ (very good), trạng từ khác (quite slowly)",
      "Cách tạo: Adj + -ly → Adv: careful→carefully, quick→quickly",
      "Bất quy tắc: good→well, fast→fast, hard→hard, late→late",
    ],
    usages: [
      { context: "IELTS Speaking", example: "She speaks fluently in English." },
      { context: "TOEIC Part 5", example: "The team worked efficiently to meet the deadline." },
    ],
    examples: [
      { en: "He is a careful driver.", vi: "Anh ấy là tài xế cẩn thận.", highlight: "careful" },
      { en: "He drives carefully.", vi: "Anh ấy lái xe cẩn thận.", highlight: "carefully" },
      { en: "The food tastes delicious.", vi: "Thức ăn có vị ngon.", highlight: "delicious" },
    ],
    commonMistakes: [
      { wrong: "He drives careful.", correct: "He drives carefully.", explanation: "Bổ nghĩa cho động từ (drives) phải dùng trạng từ (carefully)." },
      { wrong: "She speaks English good.", correct: "She speaks English well.", explanation: "Good là tính từ, well là trạng từ bổ nghĩa cho động từ speak." },
      { wrong: "He runs fastly.", correct: "He runs fast.", explanation: "Fast vừa là tính từ vừa là trạng từ, không thêm -ly." },
    ],
    memoryTip: "Tính từ → cho DANH TỪ (beautiful girl). Trạng từ → cho ĐỘNG TỪ (run quickly). Thêm -ly = trạng từ.",
    signalWords: [],
  },

  // ── 17. Basic Comparatives ──
  {
    topicId: "comparatives_basic",
    title: "So sánh bằng & So sánh hơn",
    titleEn: "Basic Comparatives",
    formulas: [
      "So sánh bằng: S + be + as + adj + as + O",
      "So sánh hơn (ngắn): S + be + adj-er + than + O",
      "So sánh hơn (dài): S + be + more + adj + than + O",
      "Bất quy tắc: good→better, bad→worse, far→farther/further",
    ],
    usages: [
      { context: "IELTS Writing Task 1", example: "The price of oil is higher than last year." },
      { context: "TOEIC Part 5", example: "This product is more effective than the previous one." },
    ],
    examples: [
      { en: "She is as tall as her brother.", vi: "Cô ấy cao bằng anh trai.", highlight: "as tall as" },
      { en: "This book is more interesting than that one.", vi: "Cuốn sách này thú vị hơn cuốn kia.", highlight: "more interesting than" },
      { en: "His English is better than mine.", vi: "Tiếng Anh của anh ấy tốt hơn tôi.", highlight: "better than" },
    ],
    commonMistakes: [
      { wrong: "She is more taller than him.", correct: "She is taller than him.", explanation: "Không dùng double comparative (more + -er)." },
      { wrong: "This is gooder than that.", correct: "This is better than that.", explanation: "Good → better (bất quy tắc), không thêm -er." },
    ],
    memoryTip: "Ngắn (1 âm tiết) → thêm -er. Dài (2+ âm tiết) → more. KHÔNG kết hợp cả hai!",
    signalWords: ["than", "as...as", "not as...as", "compared to"],
  },

  // ── 18. Superlatives ──
  {
    topicId: "superlatives_basic",
    title: "Cấu trúc So sánh nhất",
    titleEn: "Superlatives",
    formulas: [
      "Ngắn: S + be + the + adj-est + (in/of)",
      "Dài: S + be + the most + adj + (in/of)",
      "Bất quy tắc: good→best, bad→worst, far→farthest/furthest",
    ],
    usages: [
      { context: "IELTS Writing Task 1", example: "Tokyo is the most populous city in the world." },
      { context: "IELTS Speaking", example: "This is the best meal I've ever had." },
    ],
    examples: [
      { en: "She is the smartest student in class.", vi: "Cô ấy là học sinh thông minh nhất lớp.", highlight: "the smartest" },
      { en: "This is the most beautiful place I've visited.", vi: "Đây là nơi đẹp nhất tôi từng ghé thăm.", highlight: "the most beautiful" },
    ],
    commonMistakes: [
      { wrong: "She is the most smartest.", correct: "She is the smartest.", explanation: "Không dùng double superlative (most + -est)." },
      { wrong: "He is tallest in class.", correct: "He is the tallest in class.", explanation: "Luôn phải có 'the' trước so sánh nhất." },
    ],
    memoryTip: "Luôn có THE + Ngắn: -est (tallest) / Dài: most (most beautiful). KHÔNG kết hợp cả hai!",
    signalWords: ["the", "in the world", "of all", "ever", "in class", "among"],
  },

  // ── 19. Prepositions of Time ──
  {
    topicId: "time_prepositions",
    title: "Giới từ chỉ Thời gian",
    titleEn: "Prepositions of Time",
    formulas: [
      "AT: giờ cụ thể (at 5 PM), dịp lễ (at Christmas), tại thời điểm (at night)",
      "ON: ngày (on Monday), ngày tháng (on July 5th), dịp (on my birthday)",
      "IN: tháng (in July), năm (in 2020), mùa (in summer), buổi (in the morning)",
      "FOR: khoảng thời gian (for 5 years, for 2 hours)",
      "SINCE: mốc thời gian (since 2010, since Monday)",
    ],
    usages: [
      { context: "IELTS Writing", example: "The meeting is at 3 PM on Friday in May." },
      { context: "TOEIC Part 5", example: "The contract has been active since January." },
    ],
    examples: [
      { en: "I wake up at 7 AM.", vi: "Tôi thức dậy lúc 7 giờ sáng.", highlight: "at" },
      { en: "We met on Sunday.", vi: "Chúng tôi gặp nhau vào Chủ nhật.", highlight: "on" },
      { en: "She lived here for 10 years.", vi: "Cô ấy sống ở đây 10 năm.", highlight: "for" },
      { en: "I've worked here since 2020.", vi: "Tôi làm ở đây từ năm 2020.", highlight: "since" },
    ],
    commonMistakes: [
      { wrong: "I wake up in 7 AM.", correct: "I wake up at 7 AM.", explanation: "Giờ cụ thể dùng AT, không dùng IN." },
      { wrong: "I was born in Monday.", correct: "I was born on Monday.", explanation: "Ngày trong tuần dùng ON, không dùng IN." },
      { wrong: "I have studied for 2010.", correct: "I have studied since 2010.", explanation: "Mốc thời gian dùng SINCE, khoảng thời gian dùng FOR." },
    ],
    memoryTip: "AT = điểm nhỏ (giờ). ON = điểm vừa (ngày). IN = điểm lớn (tháng/năm/mùa). FOR = bao lâu. SINCE = từ khi nào.",
    signalWords: ["at", "on", "in", "for", "since", "during", "by", "until"],
  },

  // ── 20. Prepositions of Place & Direction ──
  {
    topicId: "place_prepositions",
    title: "Giới từ chỉ Nơi chốn & Hướng",
    titleEn: "Prepositions of Place & Direction",
    formulas: [
      "AT: điểm cụ thể (at the station, at home, at the door)",
      "IN: bên trong (in the room), thành phố/quốc gia (in Hanoi, in Vietnam)",
      "ON: trên bề mặt (on the table), đường phố (on Main Street)",
      "TO: hướng đến (go to school, travel to Japan)",
      "INTO/OUT OF: vào trong/ra khỏi (walk into the room, get out of the car)",
    ],
    usages: [
      { context: "IELTS Speaking", example: "The museum is on Oxford Street, near the station." },
      { context: "TOEIC Part 5", example: "Please put the files on my desk." },
    ],
    examples: [
      { en: "She is at the bus stop.", vi: "Cô ấy ở trạm xe buýt.", highlight: "at" },
      { en: "We live in New York.", vi: "Chúng tôi sống ở New York.", highlight: "in" },
      { en: "The book is on the table.", vi: "Cuốn sách ở trên bàn.", highlight: "on" },
      { en: "He went to the market.", vi: "Anh ấy đi chợ.", highlight: "to" },
    ],
    commonMistakes: [
      { wrong: "She is in the bus stop.", correct: "She is at the bus stop.", explanation: "Điểm/trạm dừng dùng AT, không dùng IN." },
      { wrong: "I go to home.", correct: "I go home.", explanation: "Home không cần giới từ 'to'. Đã ngầm hiểu hướng." },
      { wrong: "He arrived to the airport.", correct: "He arrived at the airport.", explanation: "Arrive + at (điểm nhỏ) hoặc arrive + in (thành phố/quốc gia)." },
    ],
    memoryTip: "AT = ĐIỂM cụ thể. IN = BÊN TRONG không gian. ON = TRÊN BỀ MẶT. TO = HƯỚNG ĐẾN.",
    signalWords: ["at", "in", "on", "to", "into", "out of", "near", "between", "under", "above"],
  },
];

// ============================================================
// INTERMEDIATE LEVEL — 20 Topics
// ============================================================

const INTERMEDIATE_LESSONS: GrammarLesson[] = [
  // ── 21. Present Perfect ──
  {
    topicId: "perfect_present",
    title: "Thì Hiện tại hoàn thành",
    titleEn: "Present Perfect",
    formulas: [
      "(+) S + have/has + V3/V-ed",
      "(-) S + have/has + not + V3/V-ed",
      "(?) Have/Has + S + V3/V-ed?",
    ],
    usages: [
      { context: "IELTS Speaking Part 1", example: "I have visited Japan twice." },
      { context: "IELTS Writing Task 2", example: "Technology has changed dramatically over the past decade." },
      { context: "TOEIC Part 5", example: "The company has already launched three new products." },
    ],
    examples: [
      { en: "I have already finished my homework.", vi: "Tôi đã hoàn thành bài tập rồi.", highlight: "have finished" },
      { en: "Have you ever been to London?", vi: "Bạn đã từng đến London chưa?", highlight: "Have you ever been" },
      { en: "She has lived here since 2015.", vi: "Cô ấy sống ở đây từ 2015.", highlight: "has lived" },
    ],
    commonMistakes: [
      { wrong: "I have visited Japan yesterday.", correct: "I visited Japan yesterday.", explanation: "Có thời gian xác định (yesterday) → dùng quá khứ đơn, không dùng hiện tại hoàn thành." },
      { wrong: "She have finished.", correct: "She has finished.", explanation: "She (ngôi 3 số ít) → dùng has, không dùng have." },
    ],
    memoryTip: "3 cách dùng: KINH NGHIỆM (ever/never) + VỪA MỚI (just/already/yet) + KÉO DÀI đến hiện tại (since/for).",
    signalWords: ["just", "already", "yet", "ever", "never", "since", "for", "recently", "so far", "up to now"],
  },

  // ── 22. Present Perfect Continuous ──
  {
    topicId: "perfect_present_cont",
    title: "Thì Hiện tại hoàn thành tiếp diễn",
    titleEn: "Present Perfect Continuous",
    formulas: [
      "(+) S + have/has + been + V-ing",
      "(-) S + have/has + not + been + V-ing",
      "(?) Have/Has + S + been + V-ing?",
    ],
    usages: [
      { context: "IELTS Speaking", example: "I have been studying English for 5 years." },
      { context: "IELTS Writing", example: "The population has been increasing rapidly over the last decade." },
    ],
    examples: [
      { en: "She has been working here for 10 years.", vi: "Cô ấy đã làm ở đây 10 năm rồi.", highlight: "has been working" },
      { en: "I have been waiting for 2 hours!", vi: "Tôi đã đợi 2 tiếng rồi!", highlight: "have been waiting" },
    ],
    commonMistakes: [
      { wrong: "I have been knowing her for years.", correct: "I have known her for years.", explanation: "Know là động từ trạng thái → không dùng thì tiếp diễn." },
      { wrong: "She has been work here.", correct: "She has been working here.", explanation: "Thiếu -ing. Cấu trúc: have/has + been + V-ing." },
    ],
    memoryTip: "Nhấn mạnh TÍNH LIÊN TỤC kéo dài từ quá khứ đến hiện tại. Thường đi với for/since.",
    signalWords: ["for", "since", "all day", "all week", "lately", "recently", "how long"],
  },

  // ── 23. Past Perfect ──
  {
    topicId: "perfect_past",
    title: "Thì Quá khứ hoàn thành",
    titleEn: "Past Perfect",
    formulas: [
      "(+) S + had + V3/V-ed",
      "(-) S + had not + V3/V-ed",
      "(?) Had + S + V3/V-ed?",
    ],
    usages: [
      { context: "IELTS Speaking Part 2", example: "By the time I arrived, they had already left." },
      { context: "IELTS Writing Task 2", example: "After the government had implemented the policy, the economy improved." },
    ],
    examples: [
      { en: "She had finished her homework before she went out.", vi: "Cô ấy đã hoàn thành bài tập trước khi đi ra ngoài.", highlight: "had finished" },
      { en: "I had never seen such a beautiful view.", vi: "Tôi chưa bao giờ thấy cảnh đẹp như vậy.", highlight: "had never seen" },
    ],
    commonMistakes: [
      { wrong: "After I ate, I had gone home.", correct: "After I had eaten, I went home.", explanation: "Hành động xảy ra TRƯỚC dùng Past Perfect, hành động SAU dùng Past Simple." },
    ],
    memoryTip: "Hành động TRƯỚC QUÁ KHỨ = had + V3. After/Before/By the time + Past Perfect.",
    signalWords: ["after", "before", "by the time", "already", "just", "never", "until"],
  },

  // ── 24. Past Perfect Continuous ──
  {
    topicId: "perfect_past_cont",
    title: "Thì Quá khứ hoàn thành tiếp diễn",
    titleEn: "Past Perfect Continuous",
    formulas: [
      "(+) S + had + been + V-ing",
      "(-) S + had not + been + V-ing",
      "(?) Had + S + been + V-ing?",
    ],
    usages: [
      { context: "IELTS Speaking", example: "I had been waiting for an hour when the bus finally came." },
    ],
    examples: [
      { en: "She had been studying for 3 hours before she took a break.", vi: "Cô ấy đã học 3 tiếng trước khi nghỉ.", highlight: "had been studying" },
      { en: "They had been working together for years before they got married.", vi: "Họ đã làm việc cùng nhau nhiều năm trước khi kết hôn.", highlight: "had been working" },
    ],
    commonMistakes: [
      { wrong: "She had been study for hours.", correct: "She had been studying for hours.", explanation: "Thiếu -ing. Cấu trúc: had + been + V-ing." },
    ],
    memoryTip: "Nhấn mạnh TÍNH LIÊN TỤC của hành động KÉO DÀI cho đến một mốc quá khứ khác.",
    signalWords: ["for", "since", "before", "by the time", "all day", "how long"],
  },

  // ── 25. Future Perfect ──
  {
    topicId: "perfect_future",
    title: "Thì Tương lai hoàn thành",
    titleEn: "Future Perfect",
    formulas: [
      "(+) S + will + have + V3/V-ed",
      "(-) S + will not + have + V3/V-ed",
      "(?) Will + S + have + V3/V-ed?",
    ],
    usages: [
      { context: "IELTS Speaking Part 3", example: "By 2030, scientists will have found a cure for many diseases." },
      { context: "IELTS Writing Task 2", example: "By next year, the government will have completed the project." },
    ],
    examples: [
      { en: "I will have finished my report by Friday.", vi: "Tôi sẽ hoàn thành báo cáo trước thứ Sáu.", highlight: "will have finished" },
      { en: "They will have moved to a new house by then.", vi: "Họ sẽ đã chuyển nhà trước lúc đó.", highlight: "will have moved" },
    ],
    commonMistakes: [
      { wrong: "I will have finish my report.", correct: "I will have finished my report.", explanation: "Sau will have phải là V3/V-ed, không dùng nguyên mẫu." },
    ],
    memoryTip: "Hành động sẽ HOÀN TẤT trước một mốc tương lai = will + have + V3. Dấu hiệu: by (time).",
    signalWords: ["by the time", "by then", "by Friday", "by 2030", "before"],
  },

  // ── 26. Future Perfect Continuous ──
  {
    topicId: "perfect_future_cont",
    title: "Thì Tương lai hoàn thành tiếp diễn",
    titleEn: "Future Perfect Continuous",
    formulas: [
      "(+) S + will + have + been + V-ing",
      "(-) S + will not + have + been + V-ing",
      "(?) Will + S + have + been + V-ing?",
    ],
    usages: [
      { context: "IELTS Writing Task 1", example: "By next month, I will have been working here for 5 years." },
    ],
    examples: [
      { en: "At 8 PM tomorrow, I will be watching a movie.", vi: "Lúc 8 giờ tối mai, tôi sẽ đang xem phim.", highlight: "will be watching" },
      { en: "By next month, I will have been working here for 5 years.", vi: "Đến tháng sau, tôi sẽ đã làm ở đây 5 năm rồi.", highlight: "will have been working" },
    ],
    commonMistakes: [
      { wrong: "I will have been work here.", correct: "I will have been working here.", explanation: "Thiếu -ing. Cấu trúc: will + have + been + V-ing." },
    ],
    memoryTip: "Nhấn mạnh tính LIÊN TỤC kéo dài đến một MỐC TƯƠNG LAI. Dấu hiệu: by + thời gian + for + khoảng thời gian.",
    signalWords: ["by next month", "by then", "for 5 years", "by the time"],
  },

  // ── 27. Passive Voice Basic Tenses ──
  {
    topicId: "passive_basic",
    title: "Câu bị động các thì cơ bản",
    titleEn: "Passive Voice in Basic Tenses",
    formulas: [
      "Cấu trúc chung: S + be + V3/V-ed (+ by O)",
      "Hiện tại: is/am/are + V3 → English is spoken worldwide.",
      "Quá khứ: was/were + V3 → This house was built in 2000.",
      "Tương lai: will be + V3 → The bridge will be opened next week.",
      "Hiện tại hoàn thành: has/have been + V3 → The report has been submitted.",
    ],
    usages: [
      { context: "IELTS Writing Task 1", example: "The coffee is grown in Brazil." },
      { context: "IELTS Writing Task 2", example: "It is believed that climate change is a serious issue." },
    ],
    examples: [
      { en: "This house was built in 2000.", vi: "Ngôi nhà này được xây năm 2000.", highlight: "was built" },
      { en: "English is spoken worldwide.", vi: "Tiếng Anh được nói trên toàn thế giới.", highlight: "is spoken" },
      { en: "The report has been submitted.", vi: "Báo cáo đã được nộp.", highlight: "has been submitted" },
    ],
    commonMistakes: [
      { wrong: "This house was build in 2000.", correct: "This house was built in 2000.", explanation: "Phải dùng V3 (past participle): build → built." },
      { wrong: "English is spoke worldwide.", correct: "English is spoken worldwide.", explanation: "Speak → spoken (V3 bất quy tắc)." },
    ],
    memoryTip: "Chủ động → Bị động: Tân ngữ lên làm chủ ngữ + be + V3. Chú ý chia 'be' đúng thì!",
    signalWords: ["by", "is/are/was/were + V3", "has/have been + V3"],
  },

  // ── 28. Passive with Modals & Continuous ──
  {
    topicId: "passive_modals_cont",
    title: "Câu bị động khuyết thiếu & tiếp diễn",
    titleEn: "Passive with Modals & Continuous",
    formulas: [
      "Với modal: S + modal + be + V3 → The letter must be sent.",
      "Tiếp diễn hiện tại: S + is/are + being + V3 → The house is being painted.",
      "Tiếp diễn quá khứ: S + was/were + being + V3 → The car was being repaired.",
    ],
    usages: [
      { context: "TOEIC Part 5", example: "The project must be completed by Friday." },
      { context: "IELTS Writing", example: "New regulations are being implemented across the country." },
    ],
    examples: [
      { en: "The project must be completed by Friday.", vi: "Dự án phải được hoàn thành trước thứ Sáu.", highlight: "must be completed" },
      { en: "The room is being cleaned right now.", vi: "Phòng đang được dọn ngay bây giờ.", highlight: "is being cleaned" },
      { en: "The new bridge will be opened next week.", vi: "Cây cầu mới sẽ được khánh thành tuần tới.", highlight: "will be opened" },
    ],
    commonMistakes: [
      { wrong: "The letter must be send.", correct: "The letter must be sent.", explanation: "Sau be phải là V3: send → sent." },
      { wrong: "The room is cleaning.", correct: "The room is being cleaned.", explanation: "Bị động tiếp diễn: is + being + V3." },
    ],
    memoryTip: "Modal + be + V3. Tiếp diễn bị động: is/are/was/were + BEING + V3.",
    signalWords: ["must be", "should be", "can be", "will be", "is being", "was being"],
  },

  // ── 29. Conditionals Type 0 & 1 ──
  {
    topicId: "conditionals_0_1",
    title: "Câu điều kiện Loại 0 & Loại 1",
    titleEn: "Conditionals Type 0 & 1",
    formulas: [
      "Loại 0: If + Hiện tại đơn, Hiện tại đơn → Sự thật/Chân lý",
      "Loại 1: If + Hiện tại đơn, S + will + V → Có thể xảy ra ở tương lai",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "If the government invests in education, the economy will improve." },
      { context: "TOEIC Part 5", example: "If you submit the form late, you will be charged a penalty." },
    ],
    examples: [
      { en: "If you heat water, it boils.", vi: "Nếu bạn đun nước, nó sôi.", highlight: "heat / boils" },
      { en: "If you study hard, you will pass the exam.", vi: "Nếu bạn học chăm, bạn sẽ đỗ.", highlight: "study / will pass" },
    ],
    commonMistakes: [
      { wrong: "If you will study, you will pass.", correct: "If you study, you will pass.", explanation: "Mệnh đề If KHÔNG dùng will. Dùng hiện tại đơn." },
      { wrong: "If it will rain, I stay home.", correct: "If it rains, I will stay home.", explanation: "Mệnh đề If dùng hiện tại đơn, mệnh đề chính dùng will." },
    ],
    memoryTip: "Loại 0 = chân lý (nước sôi). Loại 1 = thực tế có thể xảy ra. KHÔNG BAO GIỜ dùng will trong mệnh đề If!",
    signalWords: ["if", "when", "unless", "provided that", "as long as"],
  },

  // ── 30. Conditionals Type 2 ──
  {
    topicId: "conditionals_2",
    title: "Câu điều kiện Loại 2",
    titleEn: "Conditionals Type 2",
    formulas: [
      "If + S + V2/Ved (Quá khứ đơn), S + would/could/might + V",
      "Đặc biệt: Dùng 'were' cho TẤT CẢ các ngôi (If I were, If she were...)",
    ],
    usages: [
      { context: "IELTS Speaking", example: "If I were you, I would apply for that job." },
      { context: "IELTS Writing Task 2", example: "If everyone recycled, we would significantly reduce waste." },
    ],
    examples: [
      { en: "If I had a car, I would drive to work.", vi: "Nếu tôi có xe, tôi sẽ lái đi làm.", highlight: "had / would drive" },
      { en: "If I were you, I would accept the offer.", vi: "Nếu tôi là bạn, tôi sẽ nhận lời đề nghị.", highlight: "were / would accept" },
    ],
    commonMistakes: [
      { wrong: "If I was you, I would go.", correct: "If I were you, I would go.", explanation: "Câu điều kiện loại 2 dùng 'were' cho tất cả các ngôi, kể cả I/he/she." },
      { wrong: "If I have money, I would buy it.", correct: "If I had money, I would buy it.", explanation: "Loại 2 giả định trái thực tế hiện tại → mệnh đề If dùng quá khứ đơn." },
    ],
    memoryTip: "Loại 2 = ƯỚC MƠ VIỂN VÔNG → dùng quá khứ giả! If I were a bird... Luôn dùng WERE!",
    signalWords: ["if I were you", "I wish", "imagine", "suppose", "what if"],
  },

  // ── 31. Defining Relative Clauses ──
  {
    topicId: "relative_defining",
    title: "Mệnh đề quan hệ xác định",
    titleEn: "Defining Relative Clauses",
    formulas: [
      "Who: cho người (chủ ngữ/tân ngữ)",
      "Which: cho vật (chủ ngữ/tân ngữ)",
      "That: thay cho who/which (cả người và vật)",
      "Whose: sở hữu (của ai)",
      "Whom: cho người (tân ngữ, trang trọng)",
    ],
    usages: [
      { context: "IELTS Writing", example: "The man who lives next door is a doctor." },
      { context: "TOEIC Part 5", example: "The report that was submitted yesterday contains errors." },
    ],
    examples: [
      { en: "The girl who is wearing a red dress is my sister.", vi: "Cô gái mặc váy đỏ là chị tôi.", highlight: "who" },
      { en: "The book that you recommended is great.", vi: "Cuốn sách mà bạn giới thiệu rất hay.", highlight: "that" },
      { en: "The man whose car was stolen called the police.", vi: "Người đàn ông bị mất xe đã gọi cảnh sát.", highlight: "whose" },
    ],
    commonMistakes: [
      { wrong: "The girl, who is wearing a red dress, is my sister.", correct: "The girl who is wearing a red dress is my sister.", explanation: "Mệnh đề xác định KHÔNG dùng dấu phẩy (thông tin bắt buộc)." },
    ],
    memoryTip: "KHÔNG có dấu phẩy = xác định (bắt buộc). Có thể dùng THAT thay who/which. Có thể BỎ đại từ khi làm tân ngữ.",
    signalWords: ["who", "which", "that", "whose", "whom", "where", "when"],
  },

  // ── 32. Non-defining Relative Clauses ──
  {
    topicId: "relative_non_defining",
    title: "Mệnh đề quan hệ không xác định",
    titleEn: "Non-defining Relative Clauses",
    formulas: [
      ", who ..., → cho người",
      ", which ..., → cho vật hoặc cả mệnh đề trước",
      ", whose ..., → sở hữu",
      "KHÔNG dùng 'that'",
      "KHÔNG thể bỏ đại từ quan hệ",
    ],
    usages: [
      { context: "IELTS Writing", example: "My mother, who lives in Hanoi, is a teacher." },
      { context: "IELTS Writing Task 2", example: "Global warming, which is a major concern, affects all countries." },
    ],
    examples: [
      { en: "My brother, who lives in London, is coming home.", vi: "Anh trai tôi, sống ở London, sắp về nhà.", highlight: "who" },
      { en: "The film, which we watched last night, was excellent.", vi: "Bộ phim, mà chúng tôi xem tối qua, rất tuyệt.", highlight: "which" },
    ],
    commonMistakes: [
      { wrong: "My brother, that lives in London...", correct: "My brother, who lives in London...", explanation: "Mệnh đề không xác định KHÔNG dùng 'that'." },
      { wrong: "My brother, lives in London, is coming.", correct: "My brother, who lives in London, is coming.", explanation: "Không thể bỏ đại từ quan hệ trong mệnh đề không xác định." },
    ],
    memoryTip: "CÓ dấu phẩy = không xác định (thông tin phụ). KHÔNG dùng THAT. KHÔNG bỏ đại từ quan hệ.",
    signalWords: [", who", ", which", ", whose", ", whom", ", where"],
  },

  // ── 33. Gerunds as Subjects & Objects ──
  {
    topicId: "gerunds_usage",
    title: "Danh động từ làm Chủ & Tân ngữ",
    titleEn: "Gerunds as Subjects & Objects",
    formulas: [
      "Làm chủ ngữ: V-ing + V(số ít) → Swimming is good exercise.",
      "Làm tân ngữ sau động từ: enjoy/love/hate/avoid/suggest + V-ing",
      "Sau giới từ: interested in + V-ing, good at + V-ing",
    ],
    usages: [
      { context: "IELTS Writing", example: "Learning a new language requires dedication and practice." },
      { context: "TOEIC Part 5", example: "Many people avoid using plastic bags nowadays." },
    ],
    examples: [
      { en: "Reading is my favorite hobby.", vi: "Đọc sách là sở thích yêu thích của tôi.", highlight: "Reading" },
      { en: "She loves listening to music.", vi: "Cô ấy thích nghe nhạc.", highlight: "listening" },
      { en: "I'm interested in learning Japanese.", vi: "Tôi quan tâm đến việc học tiếng Nhật.", highlight: "learning" },
    ],
    commonMistakes: [
      { wrong: "I enjoy to read books.", correct: "I enjoy reading books.", explanation: "Enjoy + V-ing, không dùng to V." },
      { wrong: "She is good at to cook.", correct: "She is good at cooking.", explanation: "Sau giới từ (at) luôn dùng V-ing." },
    ],
    memoryTip: "Sau giới từ (in, at, of, about) LUÔN dùng V-ing. Enjoy/avoid/suggest/mind + V-ing.",
    signalWords: ["enjoy", "avoid", "suggest", "mind", "finish", "keep", "practice", "consider"],
  },

  // ── 34. Infinitives with/without To ──
  {
    topicId: "infinitives_usage",
    title: "Động từ nguyên mẫu có 'to' & không 'to'",
    titleEn: "Infinitives with/without To",
    formulas: [
      "Có 'to': want/need/decide/plan/hope/agree + to V",
      "Không 'to': can/should/must/will/may + V (bare infinitive)",
      "Cả hai: start/begin/like/love/hate/prefer + to V / V-ing",
    ],
    usages: [
      { context: "TOEIC Part 5", example: "The manager decided to postpone the meeting." },
      { context: "IELTS Writing", example: "The government needs to invest more in infrastructure." },
    ],
    examples: [
      { en: "I want to learn English.", vi: "Tôi muốn học tiếng Anh.", highlight: "to learn" },
      { en: "She can speak French.", vi: "Cô ấy có thể nói tiếng Pháp.", highlight: "speak" },
      { en: "I like to swim. / I like swimming.", vi: "Tôi thích bơi.", highlight: "to swim / swimming" },
    ],
    commonMistakes: [
      { wrong: "I want learn English.", correct: "I want to learn English.", explanation: "Want + to V, thiếu 'to'." },
      { wrong: "She can to speak French.", correct: "She can speak French.", explanation: "Sau modal verb KHÔNG dùng 'to'." },
    ],
    memoryTip: "Modal verbs (can/must/should/will) + V bare. Want/need/decide/hope/plan + to V.",
    signalWords: ["want to", "need to", "decide to", "agree to", "plan to", "hope to", "can", "must", "should"],
  },

  // ── 35. Modals of Obligation & Advice ──
  {
    topicId: "modal_obligation",
    title: "Động từ khuyết thiếu bắt buộc & khuyên bảo",
    titleEn: "Modals of Obligation & Advice",
    formulas: [
      "Must: Bắt buộc (từ người nói) → You must wear a helmet.",
      "Have to: Bắt buộc (từ bên ngoài) → I have to work on Saturday.",
      "Should / Ought to: Khuyên bảo → You should see a doctor.",
      "Had better: Khuyên mạnh → You had better leave now.",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "The government should invest more in education." },
      { context: "TOEIC Part 5", example: "All employees must submit their reports before Friday." },
    ],
    examples: [
      { en: "You must wear a helmet when riding a motorbike.", vi: "Bạn phải đội mũ bảo hiểm khi đi xe máy.", highlight: "must" },
      { en: "You should see a doctor.", vi: "Bạn nên đi khám bác sĩ.", highlight: "should" },
      { en: "You had better leave now.", vi: "Bạn nên đi ngay đi.", highlight: "had better" },
    ],
    commonMistakes: [
      { wrong: "You must to go.", correct: "You must go.", explanation: "Sau must KHÔNG dùng 'to'. Must + V nguyên mẫu." },
      { wrong: "She should to study.", correct: "She should study.", explanation: "Sau should KHÔNG dùng 'to'." },
    ],
    memoryTip: "Must = tôi BẮT. Have to = luật/quy tắc BẮT. Should = khuyên NHẸ. Had better = khuyên MẠNH (có hậu quả).",
    signalWords: ["must", "have to", "should", "ought to", "had better", "need to"],
  },

  // ── 36. Modals of Permission & Ability ──
  {
    topicId: "modal_ability",
    title: "Động từ khuyết thiếu xin phép & khả năng",
    titleEn: "Modals of Permission & Ability",
    formulas: [
      "Can: Khả năng hiện tại / Xin phép (thân mật)",
      "Could: Khả năng quá khứ / Xin phép (lịch sự hơn)",
      "May: Khả năng xảy ra / Xin phép (trang trọng)",
      "Might: Khả năng xảy ra (ít chắc chắn hơn may)",
    ],
    usages: [
      { context: "IELTS Speaking", example: "Could I borrow your pen?" },
      { context: "TOEIC Part 5", example: "The shipment may arrive later than expected." },
    ],
    examples: [
      { en: "Can you help me?", vi: "Bạn có thể giúp tôi không?", highlight: "Can" },
      { en: "Could I borrow your pen?", vi: "Tôi có thể mượn bút bạn không?", highlight: "Could" },
      { en: "It may rain tomorrow.", vi: "Ngày mai có thể mưa.", highlight: "may" },
      { en: "It might rain tomorrow.", vi: "Ngày mai có lẽ mưa.", highlight: "might" },
    ],
    commonMistakes: [
      { wrong: "Can I to go?", correct: "Can I go?", explanation: "Sau modal verb KHÔNG dùng 'to'." },
    ],
    memoryTip: "Can = có thể (thân mật). Could = có thể (lịch sự). May = có lẽ (trang trọng). Might = có lẽ (ít chắc).",
    signalWords: ["can", "could", "may", "might", "be able to"],
  },

  // ── 37. Coordinating & Correlative Conjunctions ──
  {
    topicId: "conjunctions_coordinating",
    title: "Liên từ kết hợp & Liên từ tương hợp",
    titleEn: "Coordinating & Correlative Conjunctions",
    formulas: [
      "FANBOYS: For, And, Nor, But, Or, Yet, So",
      "Both ... and: cả ... và",
      "Either ... or: hoặc ... hoặc",
      "Neither ... nor: không ... cũng không",
      "Not only ... but also: không chỉ ... mà còn",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "Not only does exercise improve health, but it also boosts mood." },
      { context: "TOEIC Part 5", example: "Both the manager and the assistant were present at the meeting." },
    ],
    examples: [
      { en: "He is smart, but he is lazy.", vi: "Anh ấy thông minh nhưng lười.", highlight: "but" },
      { en: "Both John and Mary are coming.", vi: "Cả John và Mary đều đến.", highlight: "Both ... and" },
      { en: "Neither the teacher nor the students were present.", vi: "Cả giáo viên lẫn học sinh đều không có mặt.", highlight: "Neither ... nor" },
    ],
    commonMistakes: [
      { wrong: "Both John and Mary is coming.", correct: "Both John and Mary are coming.", explanation: "Both ... and → chủ ngữ số nhiều → dùng 'are'." },
      { wrong: "Neither he or she was here.", correct: "Neither he nor she was here.", explanation: "Neither đi với NOR, không đi với or." },
    ],
    memoryTip: "FANBOYS = 7 liên từ kết hợp. Both...and = số nhiều. Neither...nor = chia theo chủ ngữ gần nhất.",
    signalWords: ["and", "but", "or", "nor", "so", "yet", "for", "both", "either", "neither", "not only"],
  },

  // ── 38. Adverbial Clauses of Cause & Effect ──
  {
    topicId: "conjunctions_cause_effect",
    title: "Mệnh đề trạng ngữ chỉ Lý do & Kết quả",
    titleEn: "Adverbial Clauses of Cause & Effect",
    formulas: [
      "Lý do (mệnh đề): because / since / as + S + V",
      "Lý do (cụm danh từ): because of / due to + N / V-ing",
      "Kết quả: so / therefore / consequently / as a result + S + V",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "Because of climate change, many species are endangered." },
      { context: "TOEIC Part 5", example: "Due to the heavy rain, the flight was delayed." },
    ],
    examples: [
      { en: "Because it rained, we stayed home.", vi: "Vì trời mưa, chúng tôi ở nhà.", highlight: "Because" },
      { en: "Since she was tired, she went to bed early.", vi: "Vì cô ấy mệt, cô ấy đi ngủ sớm.", highlight: "Since" },
      { en: "He studied hard, so he passed the exam.", vi: "Anh ấy học chăm, vì vậy anh ấy đỗ.", highlight: "so" },
    ],
    commonMistakes: [
      { wrong: "Because of it rained, we stayed home.", correct: "Because it rained, we stayed home.", explanation: "Because of + Danh từ/V-ing (because of the rain). Because + Mệnh đề (because it rained)." },
      { wrong: "Because the rain, we stayed.", correct: "Because of the rain, we stayed.", explanation: "Because + mệnh đề. Because of + danh từ." },
    ],
    memoryTip: "Because + MĐ (S+V). Because of + N. So/Therefore = KẾT QUẢ đặt ở mệnh đề sau.",
    signalWords: ["because", "since", "as", "because of", "due to", "owing to", "so", "therefore", "consequently", "as a result"],
  },

  // ── 39. Reported Speech: Statements ──
  {
    topicId: "reported_statements",
    title: "Câu gián tiếp tường thuật câu kể",
    titleEn: "Reported Speech: Statements",
    formulas: [
      "Lùi thì: Hiện tại đơn → Quá khứ đơn",
      "Hiện tại tiếp diễn → Quá khứ tiếp diễn",
      "Quá khứ đơn → Quá khứ hoàn thành",
      "Hiện tại hoàn thành → Quá khứ hoàn thành",
      "will → would, can → could, may → might",
      "Đổi đại từ: I → he/she, you → I/they, my → his/her",
    ],
    usages: [
      { context: "TOEIC Part 7", example: "The CEO said that profits had increased by 15%." },
      { context: "IELTS Speaking", example: "My teacher told me that I needed to practice more." },
    ],
    examples: [
      { en: "\"I am tired.\" → She said she was tired.", vi: "\"Tôi mệt.\" → Cô ấy nói cô ấy mệt.", highlight: "was" },
      { en: "\"I will go.\" → He said he would go.", vi: "\"Tôi sẽ đi.\" → Anh ấy nói anh ấy sẽ đi.", highlight: "would" },
    ],
    commonMistakes: [
      { wrong: "She said she is tired.", correct: "She said she was tired.", explanation: "Khi động từ tường thuật ở quá khứ (said), phải lùi thì: is → was." },
      { wrong: "He said that I will go.", correct: "He said that he would go.", explanation: "Phải đổi đại từ (I→he) và lùi thì (will→would)." },
    ],
    memoryTip: "LÙI THÌ: am/is → was, are → were, have → had, will → would, can → could. ĐỔI ĐẠI TỪ theo ngữ cảnh.",
    signalWords: ["said", "told", "reported", "mentioned", "explained", "claimed"],
  },

  // ── 40. Reported Speech: Questions & Commands ──
  {
    topicId: "reported_questions",
    title: "Câu gián tiếp tường thuật câu hỏi",
    titleEn: "Reported Speech: Questions & Commands",
    formulas: [
      "Câu hỏi Yes/No: asked if/whether + S + V (không đảo ngữ)",
      "Câu hỏi Wh-: asked + Wh-word + S + V (không đảo ngữ)",
      "Mệnh lệnh: told/asked + O + (not) + to V",
    ],
    usages: [
      { context: "TOEIC Part 7", example: "The interviewer asked whether I had any experience." },
      { context: "IELTS Speaking", example: "The teacher asked me what my goals were." },
    ],
    examples: [
      { en: "\"Are you OK?\" → She asked if I was OK.", vi: "\"Bạn ổn không?\" → Cô ấy hỏi tôi có ổn không.", highlight: "asked if" },
      { en: "\"What is your name?\" → He asked what my name was.", vi: "\"Tên bạn là gì?\" → Anh ấy hỏi tên tôi là gì.", highlight: "asked what" },
      { en: "\"Open the door.\" → She told me to open the door.", vi: "\"Mở cửa ra.\" → Cô ấy bảo tôi mở cửa.", highlight: "told me to" },
    ],
    commonMistakes: [
      { wrong: "She asked if was I OK.", correct: "She asked if I was OK.", explanation: "Câu gián tiếp KHÔNG đảo ngữ. Dùng trật tự S + V." },
      { wrong: "He asked what is my name.", correct: "He asked what my name was.", explanation: "Phải lùi thì (is → was) và KHÔNG đảo ngữ." },
    ],
    memoryTip: "Câu hỏi gián tiếp: KHÔNG ĐẢO NGỮ + LÙI THÌ. Yes/No → if/whether. Mệnh lệnh: told + O + to V.",
    signalWords: ["asked", "wondered", "wanted to know", "told", "ordered", "requested"],
  },
];

// ============================================================
// ADVANCED LEVEL — 20 Topics
// ============================================================

const ADVANCED_LESSONS: GrammarLesson[] = [
  // ── 41. Noun Clauses as Subjects & Objects ──
  {
    topicId: "noun_clauses_basic",
    title: "Mệnh đề danh từ làm Chủ & Tân ngữ",
    titleEn: "Noun Clauses as Subjects & Objects",
    formulas: [
      "Chủ ngữ: What/That + S + V + is/was... → What she said is true.",
      "Tân ngữ: S + V + that + S + V → I believe that he is honest.",
      "Whatever/Whoever/However + S + V → Whatever you decide is fine.",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "What many people fail to understand is that education is the key to success." },
      { context: "TOEIC Part 6", example: "The report shows that profits have increased significantly." },
    ],
    examples: [
      { en: "Whatever you decide is fine with me.", vi: "Bất cứ điều gì bạn quyết định đều ổn với tôi.", highlight: "Whatever you decide" },
      { en: "He said that he would come.", vi: "Anh ấy nói rằng anh ấy sẽ đến.", highlight: "that he would come" },
      { en: "I know what you mean.", vi: "Tôi biết ý bạn.", highlight: "what you mean" },
    ],
    commonMistakes: [
      { wrong: "What she said are true.", correct: "What she said is true.", explanation: "Mệnh đề danh từ làm chủ ngữ → động từ số ít (is)." },
    ],
    memoryTip: "Mệnh đề danh từ = 1 cụm S+V đóng vai trò DANH TỪ trong câu (chủ ngữ hoặc tân ngữ).",
    signalWords: ["what", "that", "whatever", "whoever", "how", "whether", "if"],
  },

  // ── 42. Noun Clauses as Complements ──
  {
    topicId: "noun_clauses_advanced",
    title: "Mệnh đề danh từ làm bổ ngữ & đồng vị",
    titleEn: "Noun Clauses as Complements",
    formulas: [
      "Bổ ngữ: S + be + that-clause → The problem is that we have no money.",
      "Đồng vị: N + that-clause → The fact that she passed surprised everyone.",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "The fact that pollution is increasing cannot be ignored." },
    ],
    examples: [
      { en: "The problem is that we have no money.", vi: "Vấn đề là chúng tôi không có tiền.", highlight: "that we have no money" },
      { en: "The news that she won shocked us.", vi: "Tin cô ấy thắng làm chúng tôi sốc.", highlight: "that she won" },
      { en: "My opinion is that we should wait.", vi: "Ý kiến tôi là chúng ta nên đợi.", highlight: "that we should wait" },
    ],
    commonMistakes: [
      { wrong: "The fact is we have no money.", correct: "The fact is that we have no money.", explanation: "Nên giữ 'that' trong văn viết trang trọng để câu rõ ràng hơn." },
    ],
    memoryTip: "Bổ ngữ = giải thích chủ ngữ (S + be + that...). Đồng vị = bổ sung cho danh từ trước (The fact that...).",
    signalWords: ["the fact that", "the idea that", "the belief that", "the reason is that"],
  },

  // ── 43. Conditionals Type 3 ──
  {
    topicId: "conditionals_3",
    title: "Câu điều kiện Loại 3",
    titleEn: "Conditionals Type 3",
    formulas: [
      "If + S + had + V3, S + would/could/might + have + V3",
      "Giả định trái ngược với quá khứ (điều đã xảy ra rồi)",
    ],
    usages: [
      { context: "IELTS Writing", example: "If the government had acted sooner, the crisis could have been avoided." },
      { context: "IELTS Speaking", example: "If I had studied harder, I would have passed the exam." },
    ],
    examples: [
      { en: "If I had studied harder, I would have passed the exam.", vi: "Nếu tôi đã học chăm hơn, tôi đã đỗ.", highlight: "had studied / would have passed" },
      { en: "If we had left earlier, we wouldn't have missed the train.", vi: "Nếu chúng tôi đi sớm hơn, chúng tôi đã không lỡ tàu.", highlight: "had left / wouldn't have missed" },
    ],
    commonMistakes: [
      { wrong: "If I studied harder, I would have passed.", correct: "If I had studied harder, I would have passed.", explanation: "Loại 3 giả định trái quá khứ → mệnh đề If dùng had + V3." },
      { wrong: "If I had studied, I would passed.", correct: "If I had studied, I would have passed.", explanation: "Mệnh đề chính: would + HAVE + V3, không thiếu have." },
    ],
    memoryTip: "Loại 3 = HỐI TIẾC quá khứ. If + had V3, would have V3. Điều đã xảy ra → giả định ngược lại!",
    signalWords: ["if only", "I wish", "had + V3", "would have"],
  },

  // ── 44. Mixed Conditionals ──
  {
    topicId: "conditionals_mixed",
    title: "Câu điều kiện Hỗn hợp (Mixed)",
    titleEn: "Mixed Conditionals",
    formulas: [
      "QK → HT: If + had V3, S + would + V → If I had studied harder, I would be a doctor now.",
      "HT → QK: If + V2/Ved, S + would have + V3 → If I weren't afraid, I would have tried skydiving.",
    ],
    usages: [
      { context: "IELTS Writing", example: "If the government had invested in education earlier, the workforce would be more skilled today." },
    ],
    examples: [
      { en: "If she had taken the job, she would be rich now.", vi: "Nếu cô ấy đã nhận việc, bây giờ cô ấy giàu rồi.", highlight: "had taken / would be" },
      { en: "If he were more careful, he wouldn't have made that mistake.", vi: "Nếu anh ấy cẩn thận hơn, anh ấy đã không mắc lỗi đó.", highlight: "were / wouldn't have made" },
    ],
    commonMistakes: [
      { wrong: "If she took the job, she would be rich now.", correct: "If she had taken the job, she would be rich now.", explanation: "Giả định quá khứ → dùng had + V3, không dùng V2." },
    ],
    memoryTip: "Mixed = KẾT HỢP 2 thời gian khác nhau. QK→HT: had V3 + would V. HT→QK: V2 + would have V3.",
    signalWords: ["now", "today", "at that time", "back then"],
  },

  // ── 45. Inversion in Conditionals ──
  {
    topicId: "conditional_inversion",
    title: "Đảo ngữ trong câu điều kiện",
    titleEn: "Inversion in Conditionals",
    formulas: [
      "Loại 1: Should + S + V, S + will + V → Should you need help, call me.",
      "Loại 2: Were + S + (to) + V, S + would + V → Were I you, I would accept.",
      "Loại 3: Had + S + V3, S + would have + V3 → Had I known, I would have come.",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "Were the government to increase funding, education standards would improve." },
      { context: "TOEIC Part 5", example: "Should you have any questions, please contact us." },
    ],
    examples: [
      { en: "Should you need help, call me.", vi: "Nếu bạn cần giúp, hãy gọi tôi.", highlight: "Should you need" },
      { en: "Were I you, I would accept.", vi: "Nếu tôi là bạn, tôi sẽ nhận.", highlight: "Were I" },
      { en: "Had I known, I would have come.", vi: "Nếu tôi biết, tôi đã đến.", highlight: "Had I known" },
    ],
    commonMistakes: [
      { wrong: "Should you would need help...", correct: "Should you need help...", explanation: "Đảo ngữ: Should + S + V (nguyên mẫu), không dùng would trong mệnh đề If." },
    ],
    memoryTip: "Bỏ IF → đảo: Should/Were/Had lên đầu câu. Dùng trong văn viết TRANG TRỌNG.",
    signalWords: ["should", "were", "had"],
  },

  // ── 46. Inversion with Negative Adverbs ──
  {
    topicId: "inversion",
    title: "Đảo ngữ với Trạng từ phủ định",
    titleEn: "Inversion with Negative Adverbs",
    formulas: [
      "Trạng từ phủ định + Trợ động từ + S + V",
      "Never have I + V3",
      "Not only + aux + S + V, but (also) S + V",
      "Hardly/Scarcely + had + S + V3 + when/before + S + V2",
      "No sooner + had + S + V3 + than + S + V2",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "Not only does this policy reduce costs, but it also improves efficiency." },
      { context: "TOEIC Part 5", example: "Seldom has the company experienced such rapid growth." },
    ],
    examples: [
      { en: "Never have I seen such a beautiful view.", vi: "Chưa bao giờ tôi thấy cảnh đẹp như vậy.", highlight: "Never have I" },
      { en: "Not only does she sing, but she also dances.", vi: "Cô ấy không chỉ hát mà còn nhảy.", highlight: "Not only does she" },
      { en: "Hardly had I arrived when it started raining.", vi: "Tôi vừa đến thì trời bắt đầu mưa.", highlight: "Hardly had I" },
    ],
    commonMistakes: [
      { wrong: "Never I have seen such beauty.", correct: "Never have I seen such beauty.", explanation: "Phải đảo trợ động từ (have) lên TRƯỚC chủ ngữ (I)." },
      { wrong: "Not only she sings but also dances.", correct: "Not only does she sing, but she also dances.", explanation: "Not only + đảo ngữ (does she sing)." },
    ],
    memoryTip: "Phủ định ĐẦU CÂU → đảo AUX lên trước S! Never/Seldom/Hardly/Not only/Under no circumstances.",
    signalWords: ["never", "seldom", "rarely", "hardly", "scarcely", "barely", "not only", "no sooner", "under no circumstances", "at no time"],
  },

  // ── 47. Advanced Subjunctive Mood ──
  {
    topicId: "subjunctive_mood",
    title: "Thể giả định nâng cao",
    titleEn: "Advanced Subjunctive Mood",
    formulas: [
      "It is + adj (crucial/essential/important) + that + S + (should) + V nguyên mẫu",
      "S + suggest/recommend/insist/demand + that + S + (should) + V nguyên mẫu",
      "I wish + S + V2/were (hiện tại) / had V3 (quá khứ) / would V (tương lai)",
    ],
    usages: [
      { context: "IELTS Writing", example: "It is essential that the government invest in renewable energy." },
      { context: "TOEIC Part 5", example: "The board recommended that the CEO resign." },
    ],
    examples: [
      { en: "It is essential that she attend the meeting.", vi: "Điều cần thiết là cô ấy tham dự cuộc họp.", highlight: "attend" },
      { en: "I wish I had studied more.", vi: "Ước gì tôi đã học nhiều hơn.", highlight: "had studied" },
      { en: "They suggested that we leave early.", vi: "Họ đề nghị chúng tôi đi sớm.", highlight: "leave" },
    ],
    commonMistakes: [
      { wrong: "It is crucial that he attends.", correct: "It is crucial that he attend.", explanation: "Thể giả định: động từ ở dạng NGUYÊN MẪU (attend), không thêm -s." },
      { wrong: "I wish I am rich.", correct: "I wish I were rich.", explanation: "Wish + V2/were cho giả định trái hiện tại." },
    ],
    memoryTip: "Suggest/Recommend/Insist + that + S + V(nguyên mẫu). Wish + were/V2 (HT) / had V3 (QK).",
    signalWords: ["suggest", "recommend", "insist", "demand", "propose", "essential", "crucial", "important", "wish", "if only"],
  },

  // ── 48. Reduced Relative Clauses ──
  {
    topicId: "reduced_relative",
    title: "Rút gọn mệnh đề quan hệ",
    titleEn: "Reduced Relative Clauses",
    formulas: [
      "Chủ động: who/which + V → V-ing → The man living there (= who lives there)",
      "Bị động: who/which + be + V3 → V3 → The car damaged (= which was damaged)",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "Students living in rural areas have less access to technology." },
      { context: "TOEIC Part 5", example: "The documents attached to this email require your signature." },
    ],
    examples: [
      { en: "The woman sitting next to me is a doctor.", vi: "Người phụ nữ ngồi cạnh tôi là bác sĩ.", highlight: "sitting" },
      { en: "The book written by Hemingway is famous.", vi: "Cuốn sách được viết bởi Hemingway rất nổi tiếng.", highlight: "written" },
    ],
    commonMistakes: [
      { wrong: "The man is sitting next to me is a doctor.", correct: "The man sitting next to me is a doctor.", explanation: "Rút gọn: bỏ who is, giữ lại V-ing. KHÔNG có 2 động từ chính." },
    ],
    memoryTip: "Chủ động → V-ing. Bị động → V3/ed. Bỏ đại từ quan hệ + be!",
    signalWords: ["V-ing", "V3/ed", "past participle"],
  },

  // ── 49. Participle Clauses ──
  {
    topicId: "participle_clauses",
    title: "Mệnh đề phân từ đồng chủ ngữ",
    titleEn: "Participle Clauses",
    formulas: [
      "V-ing: Chủ động, cùng xảy ra → Walking home, I saw an accident.",
      "V3/ed: Bị động → Frustrated, she left the room.",
      "Having V3: Hoàn thành trước → Having finished, he left.",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "Having considered all the evidence, we can conclude that..." },
    ],
    examples: [
      { en: "Opening the door, she entered the room.", vi: "Mở cửa, cô ấy bước vào phòng.", highlight: "Opening" },
      { en: "Exhausted after the long journey, he went to bed.", vi: "Kiệt sức sau chuyến đi dài, anh ấy đi ngủ.", highlight: "Exhausted" },
    ],
    commonMistakes: [
      { wrong: "Opening the door, the door was opened.", correct: "Opening the door, she entered the room.", explanation: "Chủ ngữ của mệnh đề phân từ phải KHỚP với chủ ngữ mệnh đề chính." },
    ],
    memoryTip: "Cùng CHỦ NGỮ! V-ing = chủ động. V3 = bị động. Having V3 = hoàn thành trước.",
    signalWords: ["V-ing", "V3/ed", "Having V3", "Being V3"],
  },

  // ── 50. Reduced Adverbial Clauses ──
  {
    topicId: "reduced_adverbial",
    title: "Rút gọn mệnh đề trạng ngữ",
    titleEn: "Reduced Adverbial Clauses",
    formulas: [
      "Thời gian: When/While + V-ing → While waiting, I read a book.",
      "Lý do: Because/Since → Being + adj / V-ing → Being tired, I went to bed.",
      "Nhượng bộ: Although + V-ing → Although feeling tired, she continued.",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "While acknowledging the benefits, we must consider the drawbacks." },
      { context: "TOEIC Part 6", example: "When completed, the report should be submitted to the director." },
    ],
    examples: [
      { en: "While waiting for the bus, I read a book.", vi: "Trong khi đợi xe buýt, tôi đọc sách.", highlight: "While waiting" },
      { en: "Being tired, I went to bed early.", vi: "Vì mệt, tôi đi ngủ sớm.", highlight: "Being tired" },
      { en: "Although feeling unwell, she continued working.", vi: "Dù cảm thấy không khỏe, cô ấy vẫn tiếp tục làm việc.", highlight: "Although feeling" },
    ],
    commonMistakes: [
      { wrong: "Being late, the bus had left.", correct: "Being late, I missed the bus.", explanation: "Chủ ngữ phải KHỚP: 'Being late' mô tả 'I', không phải 'the bus'." },
    ],
    memoryTip: "Rút gọn khi CÙNG CHỦ NGỮ: bỏ chủ ngữ phụ + đổi V sang V-ing. Giữ liên từ (While/Although).",
    signalWords: ["when", "while", "although", "before", "after", "since"],
  },

  // ── 51. Double & Impersonal Passive ──
  {
    topicId: "double_passive",
    title: "Bị động kép & Bị động phi cá nhân",
    titleEn: "Double & Impersonal Passive",
    formulas: [
      "Cấu trúc 1: It is + said/reported/believed + that + S + V",
      "Cấu trúc 2: S + is + said/reported + to V (hiện tại) / to have V3 (quá khứ)",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "It is widely believed that education plays a crucial role in development." },
      { context: "TOEIC Part 5", example: "The company is reported to have made record profits." },
    ],
    examples: [
      { en: "It is believed that he is a genius.", vi: "Người ta tin rằng anh ấy là thiên tài.", highlight: "It is believed" },
      { en: "She is said to speak 5 languages.", vi: "Cô ấy được cho là nói 5 thứ tiếng.", highlight: "is said to speak" },
      { en: "The company is reported to have made a profit.", vi: "Công ty được cho là đã có lãi.", highlight: "is reported to have made" },
    ],
    commonMistakes: [
      { wrong: "He is said is rich.", correct: "He is said to be rich.", explanation: "Cấu trúc: S + is said + to V, không dùng is + is." },
    ],
    memoryTip: "2 cách viết: It is said that he is... = He is said to be... Dùng 'to have V3' cho hành động quá khứ.",
    signalWords: ["it is said", "it is believed", "it is reported", "it is thought", "is said to", "is believed to"],
  },

  // ── 52. Cleft Sentences ──
  {
    topicId: "cleft_sentences",
    title: "Câu chẻ nhấn mạnh",
    titleEn: "Cleft Sentences",
    formulas: [
      "Nhấn mạnh chủ ngữ: It is/was + S + who/that + V",
      "Nhấn mạnh tân ngữ: It is/was + O + that + S + V",
      "Nhấn mạnh trạng ngữ: It is/was + Adv + that + S + V",
      "What-cleft: What + S + V + is/was + phần nhấn mạnh",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "It is education that plays the most important role in development." },
      { context: "IELTS Speaking", example: "What I really enjoy is traveling to new places." },
    ],
    examples: [
      { en: "It is you who are responsible.", vi: "Chính bạn là người chịu trách nhiệm.", highlight: "It is you who" },
      { en: "It was yesterday that we met.", vi: "Chính hôm qua chúng tôi gặp nhau.", highlight: "It was yesterday that" },
      { en: "What I need is a good night's sleep.", vi: "Điều tôi cần là một giấc ngủ ngon.", highlight: "What I need" },
    ],
    commonMistakes: [
      { wrong: "It is you who is responsible.", correct: "It is you who are responsible.", explanation: "Động từ chia theo chủ ngữ thực (you → are)." },
    ],
    memoryTip: "It is/was + PHẦN NHẤN MẠNH + that/who + phần còn lại. What + S + V + is + nhấn mạnh.",
    signalWords: ["it is", "it was", "what", "the thing that", "the reason why"],
  },

  // ── 53. Double Comparatives ──
  {
    topicId: "double_comparatives",
    title: "So sánh kép (The more... the more...)",
    titleEn: "Double Comparatives",
    formulas: [
      "The + comparative + S + V, the + comparative + S + V",
      "The more + N + S + V, the more + N + S + V",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "The more people exercise, the healthier they become." },
    ],
    examples: [
      { en: "The more you study, the smarter you become.", vi: "Bạn càng học nhiều, bạn càng thông minh.", highlight: "The more ... the smarter" },
      { en: "The faster you drive, the more dangerous it is.", vi: "Bạn lái càng nhanh, càng nguy hiểm.", highlight: "The faster ... the more dangerous" },
      { en: "The sooner we start, the earlier we'll finish.", vi: "Chúng ta bắt đầu càng sớm, kết thúc càng sớm.", highlight: "The sooner ... the earlier" },
    ],
    commonMistakes: [
      { wrong: "More you study, smarter you become.", correct: "The more you study, the smarter you become.", explanation: "Phải có 'THE' trước mỗi vế so sánh." },
    ],
    memoryTip: "Càng...càng... = THE + comparative, THE + comparative. Luôn có 2 THE!",
    signalWords: ["the more", "the less", "the better", "the harder"],
  },

  // ── 54. Advanced Comparatives ──
  {
    topicId: "advanced_comparatives",
    title: "So sánh bội số & So sánh ẩn",
    titleEn: "Advanced Comparatives",
    formulas: [
      "Bội số: twice/three times + as + adj + as → This is twice as expensive as that.",
      "So sánh ẩn: Tính từ so sánh trong ngữ cảnh → The older generation...",
    ],
    usages: [
      { context: "IELTS Writing Task 1", example: "The number of graduates was three times as high as that of dropouts." },
      { context: "TOEIC Part 5", example: "This machine is twice as efficient as the old model." },
    ],
    examples: [
      { en: "She earns three times as much as I do.", vi: "Cô ấy kiếm gấp 3 lần tôi.", highlight: "three times as much as" },
      { en: "This room is twice as big as the other one.", vi: "Phòng này lớn gấp đôi phòng kia.", highlight: "twice as big as" },
    ],
    commonMistakes: [
      { wrong: "She earns three times more than as I do.", correct: "She earns three times as much as I do.", explanation: "Dùng 'times as...as' hoặc 'times more than', không kết hợp cả hai." },
    ],
    memoryTip: "X times as adj as = gấp X lần. Twice = gấp đôi. Three times = gấp ba.",
    signalWords: ["twice", "three times", "half", "as...as"],
  },

  // ── 55. Advanced Past Modals ──
  {
    topicId: "advanced_modals",
    title: "Động từ khuyết thiếu quá khứ",
    titleEn: "Advanced Past Modals",
    formulas: [
      "Must have V3: Chắc chắn đã (suy luận) → He must have missed the bus.",
      "May/Might have V3: Có lẽ đã → She might have forgotten.",
      "Should have V3: Đáng lẽ nên (nhưng không) → You should have told me.",
      "Could have V3: Có thể đã (nhưng không) → I could have helped.",
      "Needn't have V3: Không cần thiết đã làm → You needn't have waited.",
    ],
    usages: [
      { context: "IELTS Speaking", example: "The traffic was terrible. There must have been an accident." },
      { context: "TOEIC Part 5", example: "The package should have arrived by now." },
    ],
    examples: [
      { en: "He must have arrived by now.", vi: "Chắc anh ấy đã đến rồi.", highlight: "must have arrived" },
      { en: "She should have studied harder.", vi: "Đáng lẽ cô ấy nên học chăm hơn.", highlight: "should have studied" },
      { en: "They could have won the game.", vi: "Họ có thể đã thắng trận đấu.", highlight: "could have won" },
    ],
    commonMistakes: [
      { wrong: "He must arrived.", correct: "He must have arrived.", explanation: "Modal + have + V3, không thiếu 'have'." },
      { wrong: "She should has studied.", correct: "She should have studied.", explanation: "Sau modal luôn dùng 'have', không dùng 'has'." },
    ],
    memoryTip: "Must have = CHẮC ĐÃ. Should have = LẼ RA NÊN. Could have = CÓ THỂ ĐÃ. Tất cả + have V3!",
    signalWords: ["must have", "may have", "might have", "should have", "could have", "needn't have"],
  },

  // ── 56. Parallel Structure ──
  {
    topicId: "parallel_structure",
    title: "Cấu trúc song hành nâng cao",
    titleEn: "Parallel Structure",
    formulas: [
      "Đồng bộ trong liệt kê: A, B, and C (cùng từ loại)",
      "Sau liên từ tương hợp: both A and B, not only A but also B (A và B cùng loại)",
      "Trong so sánh: S + V + as adj as + S + V (cùng cấu trúc)",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "The government should focus on improving healthcare, investing in education, and reducing unemployment." },
    ],
    examples: [
      { en: "I like reading, writing, and swimming.", vi: "Tôi thích đọc, viết và bơi.", highlight: "reading, writing, and swimming" },
      { en: "She is not only smart but also kind.", vi: "Cô ấy không chỉ thông minh mà còn tốt bụng.", highlight: "smart ... kind" },
    ],
    commonMistakes: [
      { wrong: "I like reading, to write, and swim.", correct: "I like reading, writing, and swimming.", explanation: "Không đồng bộ từ loại. Tất cả phải cùng V-ing." },
      { wrong: "She is not only smart but also has kindness.", correct: "She is not only smart but also kind.", explanation: "Not only + adj, but also + adj (cùng loại)." },
    ],
    memoryTip: "Liệt kê = CÙNG TỪ LOẠI! V-ing, V-ing, V-ing hoặc N, N, N. Không trộn lẫn!",
    signalWords: ["and", "or", "but", "not only...but also", "both...and", "either...or", "neither...nor"],
  },

  // ── 57. Subject-Verb Agreement Exceptions ──
  {
    topicId: "subject_verb_exceptions",
    title: "Hòa hợp Chủ - Vị ngoại lệ",
    titleEn: "Subject-Verb Agreement Exceptions",
    formulas: [
      "Danh từ tập hợp (team, family): Số ít (cả nhóm) hoặc số nhiều (từng thành viên)",
      "Phân số/Phần trăm: V chia theo danh từ sau of",
      "Khoảng cách/Tiền/Thời gian: Số ít → $100 is enough.",
      "Either/Neither of: V số ít → Neither of them knows.",
      "Danh từ -s nhưng số ít: news, mathematics, economics, physics",
    ],
    usages: [
      { context: "TOEIC Part 5", example: "Neither of the candidates was qualified for the position." },
      { context: "IELTS Writing", example: "The number of applicants has increased significantly." },
    ],
    examples: [
      { en: "The team is playing well.", vi: "Đội đang chơi tốt (cả đội).", highlight: "is" },
      { en: "Fifty dollars is too much.", vi: "50 đô là quá nhiều.", highlight: "is" },
      { en: "The news is good.", vi: "Tin tức tốt.", highlight: "is" },
      { en: "Neither of them knows the truth.", vi: "Không ai trong số họ biết sự thật.", highlight: "knows" },
    ],
    commonMistakes: [
      { wrong: "The news are good.", correct: "The news is good.", explanation: "News luôn là số ÍT dù có -s." },
      { wrong: "Each of the students have a book.", correct: "Each of the students has a book.", explanation: "Each of → động từ số ít (has)." },
      { wrong: "Mathematics are my favorite subject.", correct: "Mathematics is my favorite subject.", explanation: "Tên môn học -ics → số ít." },
    ],
    memoryTip: "News/Mathematics/Economics = số ÍT. Each/Every/Either/Neither = số ÍT. Tiền/khoảng cách = số ÍT.",
    signalWords: ["each", "every", "either", "neither", "the number of", "a number of"],
  },

  // ── 58. Advanced Determiners ──
  {
    topicId: "advanced_determiners",
    title: "Từ hạn định & Lượng từ nâng cao",
    titleEn: "Advanced Determiners",
    formulas: [
      "Either of + Ns + V số ít → Either of the answers is correct.",
      "Neither of + Ns + V số ít → Neither of them is here.",
      "Both of + Ns + V số nhiều → Both of the students are present.",
      "Each of + Ns + V số ít → Each of the students has a book.",
      "None of + Ns + V số ít/nhiều → None of them knows/know.",
    ],
    usages: [
      { context: "TOEIC Part 5", example: "Neither of the proposals was accepted by the committee." },
    ],
    examples: [
      { en: "Either option is acceptable.", vi: "Lựa chọn nào cũng chấp nhận được.", highlight: "is" },
      { en: "Neither of them knows the truth.", vi: "Không ai trong số họ biết sự thật.", highlight: "knows" },
      { en: "Every student has to attend.", vi: "Mọi học sinh phải tham dự.", highlight: "has" },
    ],
    commonMistakes: [
      { wrong: "Each of the students have a book.", correct: "Each of the students has a book.", explanation: "Each of → động từ số ít." },
      { wrong: "Both student are here.", correct: "Both students are here.", explanation: "Both + danh từ số nhiều." },
    ],
    memoryTip: "Each/Every/Either/Neither = SỐ ÍT. Both = SỐ NHIỀU. None = cả hai đều được.",
    signalWords: ["either", "neither", "both", "each", "every", "none", "all"],
  },

  // ── 59. Prepositional Phrases ──
  {
    topicId: "prepositional_phrases",
    title: "Cụm giới từ đi kèm Danh từ, Tính từ, Động từ",
    titleEn: "Prepositional Phrases with N/Adj/V",
    formulas: [
      "Danh từ + giới từ: reason for, advantage of, key to, solution to",
      "Tính từ + giới từ: interested in, good at, afraid of, responsible for",
      "Động từ + giới từ: depend on, succeed in, believe in, apologize for",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "The key to solving this problem is investing in education." },
      { context: "TOEIC Part 5", example: "The company is responsible for training new employees." },
    ],
    examples: [
      { en: "I'm interested in learning English.", vi: "Tôi quan tâm đến việc học tiếng Anh.", highlight: "interested in" },
      { en: "She is good at math.", vi: "Cô ấy giỏi toán.", highlight: "good at" },
      { en: "The key to success is hard work.", vi: "Chìa khóa thành công là sự chăm chỉ.", highlight: "key to" },
      { en: "He apologized for being late.", vi: "Anh ấy xin lỗi vì đến muộn.", highlight: "apologized for" },
    ],
    commonMistakes: [
      { wrong: "I'm interested on English.", correct: "I'm interested in English.", explanation: "Interested luôn đi với IN, không dùng on." },
      { wrong: "She is good in math.", correct: "She is good at math.", explanation: "Good đi với AT, không dùng in." },
      { wrong: "The key of success.", correct: "The key to success.", explanation: "Key đi với TO, không dùng of." },
    ],
    memoryTip: "Học giới từ theo CỤM CỐ ĐỊNH: interested IN, good AT, depend ON, afraid OF, key TO.",
    signalWords: ["in", "at", "on", "of", "for", "to", "with", "about"],
  },

  // ── 60. Emphatic Structures & Fronting ──
  {
    topicId: "emphatic_fronting",
    title: "Cấu trúc Nhấn mạnh Bổ trợ & Fronting",
    titleEn: "Emphatic Structures & Fronting",
    formulas: [
      "Fronting (đưa tân ngữ/trạng ngữ lên đầu): This book I have read.",
      "So/Such inversion: So beautiful was she that everyone stared.",
      "Not until: Not until I saw it did I believe it.",
      "Only after/when: Only after he left did I realize my mistake.",
    ],
    usages: [
      { context: "IELTS Writing Task 2", example: "Only by working together can we solve these global issues." },
    ],
    examples: [
      { en: "So beautiful was she that everyone stared.", vi: "Cô ấy đẹp đến nỗi ai cũng nhìn.", highlight: "So beautiful was she" },
      { en: "Such was his anger that he couldn't speak.", vi: "Cơn giận của anh ấy lớn đến nỗi anh ấy không nói được.", highlight: "Such was his anger" },
      { en: "Not until I saw it did I believe it.", vi: "Mãi đến khi tôi thấy, tôi mới tin.", highlight: "Not until" },
      { en: "Only by studying hard can you succeed.", vi: "Chỉ bằng cách học chăm bạn mới thành công.", highlight: "Only by" },
    ],
    commonMistakes: [
      { wrong: "Not until I saw it I believed it.", correct: "Not until I saw it did I believe it.", explanation: "Not until + mệnh đề → đảo ngữ ở mệnh đề chính (did I believe)." },
    ],
    memoryTip: "Fronting = đưa thông tin QUAN TRỌNG lên đầu để NHẤN MẠNH. So/Such/Not until/Only → đảo ngữ mệnh đề chính!",
    signalWords: ["so", "such", "not until", "only after", "only when", "only by"],
  },
];

// ============================================================
// COMBINED EXPORT
// ============================================================

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  ...BASIC_LESSONS,
  ...INTERMEDIATE_LESSONS,
  ...ADVANCED_LESSONS,
];

/**
 * Look up a grammar lesson by topic ID.
 */
export function getGrammarLesson(topicId: string): GrammarLesson | undefined {
  return GRAMMAR_LESSONS.find((lesson) => lesson.topicId === topicId);
}

/**
 * Get all grammar lessons for a specific level.
 */
export function getGrammarLessonsByLevel(
  level: "basic" | "intermediate" | "advanced"
): GrammarLesson[] {
  const levelMap: Record<string, GrammarLesson[]> = {
    basic: BASIC_LESSONS,
    intermediate: INTERMEDIATE_LESSONS,
    advanced: ADVANCED_LESSONS,
  };
  return levelMap[level] || [];
}
