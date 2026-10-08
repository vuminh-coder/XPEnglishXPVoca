import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 1: Chào hỏi & Giao tiếp (Greetings & Polite Words)
 * Mã chủ đề: t_basic_greetings
 * Tổng số từ vựng: 30 từ
 */
export const THEME_CHAO_HOI_GIAO_TIEP: BasicTheme = {
  "id": "t_basic_greetings",
  "name": "Chào hỏi & Giao tiếp",
  "nameEn": "Greetings & Polite Words",
  "icon": "👋",
  "difficulty": 1,
  "color": "#0059bb",
  "description": "Các câu chào, tạm biệt và lời nói lịch sự thông dụng nhất hàng ngày.",
  "totalVocabs": 30
};

export const VOCABS_CHAO_HOI_GIAO_TIEP: BasicVocabularyItem[] = [
  {
    "id": "bv_greeti_01",
    "word": "hello",
    "phonetic": "/həˈloʊ/",
    "definition": "Used as a greeting when meeting someone or answering the phone.",
    "definitionVn": "xin chào (thông dụng và thân thiện nhất)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Hello, nice to meet you!",
      "She picked up the phone and said, 'Hello?'"
    ],
    "exampleTranslations": [
      "Xin chào, rất vui được gặp bạn!",
      "Cô ấy nhấc máy và nói: 'Xin chào?'"
    ],
    "synonyms": [
      "hi",
      "hey",
      "greetings"
    ],
    "antonyms": [
      "goodbye",
      "bye"
    ]
  },
  {
    "id": "bv_greeti_02",
    "word": "hi",
    "phonetic": "/haɪ/",
    "definition": "An informal greeting used when speaking to friends or family.",
    "definitionVn": "chào, xin chào (thân mật)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Hi! How are you doing today?",
      "Hi everyone, thanks for coming."
    ],
    "exampleTranslations": [
      "Chào bạn! Hôm nay bạn thế nào?",
      "Chào cả nhà, cảm ơn mọi người đã đến."
    ],
    "synonyms": [
      "hello",
      "hey"
    ],
    "antonyms": [
      "bye"
    ]
  },
  {
    "id": "bv_greeti_03",
    "word": "hey",
    "phonetic": "/heɪ/",
    "definition": "A casual greeting to get someone's attention or say hi.",
    "definitionVn": "này, chào nhé (thân mật)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Hey! Look at this picture!",
      "Hey John, how have you been?"
    ],
    "exampleTranslations": [
      "Này! Hãy nhìn bức tranh này đi!",
      "Chào John, dạo này bạn thế nào?"
    ],
    "synonyms": [
      "hi",
      "hello"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_04",
    "word": "good morning",
    "phonetic": "/ɡʊd ˈmɔːrnɪŋ/",
    "definition": "A polite greeting used in the morning before 12:00 PM.",
    "definitionVn": "chào buổi sáng (trước 12h trưa)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good morning, class! Please take your seats.",
      "Good morning! Did you sleep well?"
    ],
    "exampleTranslations": [
      "Chào buổi sáng cả lớp! Mời các em ngồi vào chỗ.",
      "Chào buổi sáng! Bạn ngủ ngon không?"
    ],
    "synonyms": [
      "morning"
    ],
    "antonyms": [
      "good night"
    ]
  },
  {
    "id": "bv_greeti_05",
    "word": "good afternoon",
    "phonetic": "/ɡʊd ˌæftərˈnuːn/",
    "definition": "A polite greeting used from 12:00 PM to 6:00 PM.",
    "definitionVn": "chào buổi chiều (từ 12h trưa đến 6h tối)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good afternoon, ladies and gentlemen.",
      "Good afternoon! How can I help you today?"
    ],
    "exampleTranslations": [
      "Chào buổi chiều quý ông và quý bà.",
      "Chào buổi chiều! Tôi có thể giúp gì cho bạn hôm nay?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_06",
    "word": "good evening",
    "phonetic": "/ɡʊd ˈiːvnɪŋ/",
    "definition": "A polite greeting used after 6:00 PM.",
    "definitionVn": "chào buổi tối (sau 6h tối khi gặp mặt)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good evening, welcome to our restaurant.",
      "Good evening, Mr. Johnson."
    ],
    "exampleTranslations": [
      "Chào buổi tối, chào mừng quý khách đến nhà hàng.",
      "Chào buổi tối, ông Johnson."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_07",
    "word": "goodbye",
    "phonetic": "/ɡʊdˈbaɪ/",
    "definition": "Said when leaving someone or at the end of a conversation.",
    "definitionVn": "tạm biệt (lời chào chia tay)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Goodbye, have a safe trip home!",
      "She waved and said goodbye."
    ],
    "exampleTranslations": [
      "Tạm biệt nhé, chúc bạn về nhà an toàn!",
      "Cô ấy vẫy tay và nói lời tạm biệt."
    ],
    "synonyms": [
      "bye",
      "farewell"
    ],
    "antonyms": [
      "hello"
    ]
  },
  {
    "id": "bv_greeti_08",
    "word": "bye",
    "phonetic": "/baɪ/",
    "definition": "A casual way to say goodbye to friends.",
    "definitionVn": "tạm biệt, chào nhé (ngắn gọn thân mật)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Bye! See you tomorrow at school.",
      "Okay, bye for now!"
    ],
    "exampleTranslations": [
      "Tạm biệt nhé! Hẹn gặp bạn ngày mai ở trường.",
      "Được rồi, tạm biệt bạn lúc này nhé!"
    ],
    "synonyms": [
      "goodbye"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_09",
    "word": "good night",
    "phonetic": "/ɡʊd naɪt/",
    "definition": "Said before going to sleep or leaving someone late at night.",
    "definitionVn": "chúc ngủ ngon (trước khi đi ngủ)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good night, sweet dreams!",
      "Mom kissed me and said, 'Good night.'"
    ],
    "exampleTranslations": [
      "Chúc ngủ ngon, mơ giấc mơ đẹp nhé!",
      "Mẹ hôn tôi và nói: 'Chúc con ngủ ngon.'"
    ],
    "synonyms": [
      "sleep well"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_10",
    "word": "please",
    "phonetic": "/pliːz/",
    "definition": "A polite word used when making a request or asking for something.",
    "definitionVn": "làm ơn, xin vui lòng (lịch sự khi yêu cầu)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Can you give me a glass of water, please?",
      "Please close the door when you leave."
    ],
    "exampleTranslations": [
      "Làm ơn cho tôi một ly nước được không?",
      "Xin vui lòng đóng cửa khi bạn rời đi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_11",
    "word": "thank you",
    "phonetic": "/ˈθæŋk juː/",
    "definition": "Used to express gratitude and appreciation.",
    "definitionVn": "cảm ơn bạn (trang trọng & phổ biến)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thank you very much for your kind help.",
      "Here is your coffee. — Thank you!"
    ],
    "exampleTranslations": [
      "Cảm ơn bạn rất nhiều vì sự giúp đỡ tốt bụng.",
      "Cà phê của bạn đây. — Cảm ơn bạn!"
    ],
    "synonyms": [
      "thanks",
      "many thanks"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_12",
    "word": "thanks",
    "phonetic": "/θæŋks/",
    "definition": "A friendly and casual way to say thank you.",
    "definitionVn": "cảm ơn nhé (thân mật)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thanks for the ride, John!",
      "Thanks a lot for the lovely gift."
    ],
    "exampleTranslations": [
      "Cảm ơn vì đã cho tôi đi nhờ xe nhé John!",
      "Cảm ơn rất nhiều vì món quà đáng yêu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_13",
    "word": "you're welcome",
    "phonetic": "/jɔːr ˈwelkəm/",
    "definition": "A polite reply when someone thanks you.",
    "definitionVn": "không có chi, không dám (đáp lại lời cảm ơn)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thank you for helping me! — You're welcome.",
      "You're welcome anytime, my friend."
    ],
    "exampleTranslations": [
      "Cảm ơn bạn đã giúp tôi! — Không có chi.",
      "Bất cứ lúc nào bạn cần, bạn luôn được hoan nghênh."
    ],
    "synonyms": [
      "no problem",
      "my pleasure"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_14",
    "word": "no problem",
    "phonetic": "/noʊ ˈprɑːbləm/",
    "definition": "Used to say that something is easy or you are happy to help.",
    "definitionVn": "không có vấn đề gì, đừng bận tâm",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thanks for holding the door! — No problem at all.",
      "Can you help me? — Sure, no problem!"
    ],
    "exampleTranslations": [
      "Cảm ơn vì đã giữ cửa! — Không có vấn đề gì cả.",
      "Bạn giúp tôi được không? — Chắc chắn rồi, không sao cả!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_15",
    "word": "sorry",
    "phonetic": "/ˈsɑːri/",
    "definition": "Used to apologize for a mistake or show sympathy.",
    "definitionVn": "xin lỗi, tôi rất tiếc",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I am so sorry for being late today.",
      "Sorry, I did not hear what you said."
    ],
    "exampleTranslations": [
      "Tôi vô cùng xin lỗi vì hôm nay đến muộn.",
      "Xin lỗi, tôi không nghe rõ điều bạn vừa nói."
    ],
    "synonyms": [
      "pardon",
      "apologies"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_16",
    "word": "excuse me",
    "phonetic": "/ɪkˈskjuːz miː/",
    "definition": "Used to get someone's attention politely or apologize when passing.",
    "definitionVn": "xin lỗi cho tôi hỏi / xin nhường đường",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Excuse me, where is the nearest station?",
      "Excuse me, could you please repeat that?"
    ],
    "exampleTranslations": [
      "Xin lỗi cho tôi hỏi, ga tàu gần nhất ở đâu vậy?",
      "Xin lỗi, bạn có thể nhắc lại được không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_17",
    "word": "pardon",
    "phonetic": "/ˈpɑːrdn/",
    "definition": "Used to ask someone to repeat what they have just said.",
    "definitionVn": "xin thứ lỗi, xin nhắc lại (khi chưa nghe rõ)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Pardon? Could you speak a little louder, please?",
      "Pardon me, is this seat taken?"
    ],
    "exampleTranslations": [
      "Xin lỗi, bạn có thể nói to hơn một chút được không?",
      "Xin thứ lỗi, chỗ này đã có ai ngồi chưa ạ?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_18",
    "word": "welcome",
    "phonetic": "/ˈwelkəm/",
    "definition": "Used to greet someone arriving in a friendly manner.",
    "definitionVn": "hoan nghênh, chào đón",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Welcome to our home in Hanoi!",
      "Welcome back, everyone!"
    ],
    "exampleTranslations": [
      "Chào mừng các bạn đến ngôi nhà của chúng tôi tại Hà Nội!",
      "Chào mừng mọi người đã quay trở lại!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_19",
    "word": "yes",
    "phonetic": "/jes/",
    "definition": "Used to express agreement, confirmation, or positive answer.",
    "definitionVn": "vâng, có, đúng, đồng ý",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Are you ready? — Yes, I am ready.",
      "Yes, please! That sounds wonderful."
    ],
    "exampleTranslations": [
      "Bạn sẵn sàng chưa? — Vâng, tôi đã sẵn sàng.",
      "Vâng, làm ơn! Nghe tuyệt vời đấy."
    ],
    "synonyms": [
      "yeah",
      "sure"
    ],
    "antonyms": [
      "no"
    ]
  },
  {
    "id": "bv_greeti_20",
    "word": "no",
    "phonetic": "/noʊ/",
    "definition": "Used to express refusal, disagreement, or negative answer.",
    "definitionVn": "không, không phải (từ chối hoặc phủ định)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Do you want more tea? — No, thank you.",
      "No, this is not my bag."
    ],
    "exampleTranslations": [
      "Bạn có muốn thêm trà không? — Không, cảm ơn bạn.",
      "Không, đây không phải túi của tôi."
    ],
    "synonyms": [
      "nope"
    ],
    "antonyms": [
      "yes"
    ]
  },
  {
    "id": "bv_greeti_21",
    "word": "okay",
    "phonetic": "/oʊˈkeɪ/",
    "definition": "Used to express agreement or that everything is fine.",
    "definitionVn": "đồng ý, được rồi, ổn",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "We will meet at 5 PM, okay? — Okay, see you!",
      "Are you feeling okay now?"
    ],
    "exampleTranslations": [
      "Chúng ta gặp nhau lúc 5h chiều nhé? — Được rồi, hẹn gặp bạn!",
      "Bây giờ bạn thấy ổn chưa?"
    ],
    "synonyms": [
      "all right",
      "fine"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_22",
    "word": "sure",
    "phonetic": "/ʃʊr/",
    "definition": "Confident; certainly or gladly agreeing.",
    "definitionVn": "chắc chắn rồi, tất nhiên",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Can you give me a hand? — Sure, of course!",
      "Are you sure about this answer?"
    ],
    "exampleTranslations": [
      "Bạn giúp tôi một tay được không? — Chắc chắn rồi, tất nhiên!",
      "Bạn có chắc chắn về câu trả lời này không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_23",
    "word": "how are you",
    "phonetic": "/haʊ ɑːr juː/",
    "definition": "A common friendly question to ask about someone's health.",
    "definitionVn": "bạn có khỏe không? dạo này bạn thế nào?",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Hello Sarah, how are you? — I am fine, thanks!",
      "How are you doing these days?"
    ],
    "exampleTranslations": [
      "Chào Sarah, bạn khỏe không? — Tôi khỏe, cảm ơn!",
      "Dạo này bạn thế nào rồi?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_24",
    "word": "nice to meet you",
    "phonetic": "/naɪs tuː miːt juː/",
    "definition": "A polite phrase said when meeting someone for the first time.",
    "definitionVn": "rất vui được gặp bạn (khi gặp gỡ lần đầu)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I am David. — Nice to meet you, David!",
      "It is very nice to meet you in person."
    ],
    "exampleTranslations": [
      "Tôi là David. — Rất vui được gặp bạn, David!",
      "Rất vui được gặp mặt trực tiếp bạn."
    ],
    "synonyms": [
      "pleased to meet you"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_25",
    "word": "see you",
    "phonetic": "/siː juː/",
    "definition": "A friendly way to say goodbye until the next meeting.",
    "definitionVn": "hẹn gặp lại bạn (lời chào hẹn gặp lần sau)",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I have to go now. See you soon!",
      "See you later this evening at the party."
    ],
    "exampleTranslations": [
      "Tôi phải đi bây giờ rồi. Hẹn gặp lại bạn sớm!",
      "Hẹn gặp lại bạn tối nay ở bữa tiệc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_26",
    "word": "see you later",
    "phonetic": "/siː juː ˈleɪtər/",
    "definition": "Said when parting with someone you expect to see again later.",
    "definitionVn": "hẹn gặp lại bạn sau nhé",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I have a class now, see you later!",
      "See you later at the coffee shop."
    ],
    "exampleTranslations": [
      "Tôi có tiết học bây giờ rồi, hẹn gặp lại bạn sau!",
      "Hẹn gặp lại bạn sau ở quán cà phê nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_27",
    "word": "have a nice day",
    "phonetic": "/hæv ə naɪs deɪ/",
    "definition": "A polite parting phrase wishing someone a pleasant day.",
    "definitionVn": "chúc bạn một ngày tốt lành!",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thank you for shopping. Have a nice day!",
      "Goodbye and have a wonderful day ahead!"
    ],
    "exampleTranslations": [
      "Cảm ơn quý khách đã mua sắm. Chúc một ngày tốt lành!",
      "Tạm biệt và chúc bạn một ngày tuyệt vời!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_28",
    "word": "take care",
    "phonetic": "/teɪk ker/",
    "definition": "Used to say goodbye to someone in a caring way.",
    "definitionVn": "bảo trọng nhé, giữ gìn sức khỏe nhé",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Goodbye, Minh! Take care on your way home.",
      "Take care and keep in touch."
    ],
    "exampleTranslations": [
      "Tạm biệt Minh! Đi đường cẩn thận giữ gìn sức khỏe nhé.",
      "Bảo trọng và giữ liên lạc nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_greeti_29",
    "word": "congratulations",
    "phonetic": "/kənˌɡrætʃuˈleɪʃnz/",
    "definition": "Used to praise someone for an achievement or good fortune.",
    "definitionVn": "xin chúc mừng (khi ai đó thành công)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Congratulations on passing your English exam!",
      "Congratulations on your new job!"
    ],
    "exampleTranslations": [
      "Xin chúc mừng bạn đã vượt qua kỳ thi tiếng Anh!",
      "Chúc mừng bạn có công việc mới nhé!"
    ],
    "synonyms": [
      "congrats",
      "well done"
    ],
    "antonyms": []
  },
  {
    "id": "bv_greeti_30",
    "word": "cheers",
    "phonetic": "/tʃɪrz/",
    "definition": "Used as a toast when drinking or a friendly informal goodbye/thanks.",
    "definitionVn": "cạn ly! / cảm ơn nhé / tạm biệt nhé",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Cheers to our friendship and success!",
      "Cheers mate, see you tomorrow."
    ],
    "exampleTranslations": [
      "Cạn ly chúc mừng tình bạn và thành công của chúng ta!",
      "Cảm ơn bạn nhé, hẹn gặp ngày mai."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_CHAO_HOI_GIAO_TIEP: VocabularyTopicPackage = {
  theme: THEME_CHAO_HOI_GIAO_TIEP,
  vocabs: VOCABS_CHAO_HOI_GIAO_TIEP,
};

export default CHUDE_CHAO_HOI_GIAO_TIEP;
