import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 1: Chào hỏi & Giao tiếp (Greetings & Polite Words)
 * Mã chủ đề: t_basic_greetings
 * Tổng số từ vựng: 30 từ đơn chuẩn mực (Các mẫu câu giao tiếp ghép từ các từ này nằm tại Chặng 3 - Sentence Builder)
 */
export const THEME_CHAO_HOI_GIAO_TIEP: BasicTheme = {
  "id": "t_basic_greetings",
  "name": "Chào hỏi & Giao tiếp",
  "nameEn": "Greetings & Polite Words",
  "icon": "👋",
  "difficulty": 1,
  "color": "#0059bb",
  "description": "Các từ vựng chào hỏi, tạm biệt và giao tiếp lịch sự thông dụng nhất hàng ngày.",
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
    "synonyms": ["hi", "hey", "greetings"],
    "antonyms": ["goodbye", "bye"]
  },
  {
    "id": "bv_greeti_02",
    "word": "hi",
    "phonetic": "/haɪ/",
    "definition": "An informal greeting used when speaking to friends or family.",
    "definitionVn": "chào (thân mật)",
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
    "synonyms": ["hello", "hey"],
    "antonyms": ["bye"]
  },
  {
    "id": "bv_greeti_03",
    "word": "hey",
    "phonetic": "/heɪ/",
    "definition": "A casual greeting to get someone's attention or say hi.",
    "definitionVn": "này (gọi thân mật)",
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
    "synonyms": ["hi", "hello"],
    "antonyms": []
  },
  {
    "id": "bv_greeti_04",
    "word": "morning",
    "phonetic": "/ˈmɔːrnɪŋ/",
    "definition": "The early part of the day from sunrise until noon.",
    "definitionVn": "buổi sáng (trước 12h trưa)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good morning, class! Please take your seats.",
      "I drink a cup of coffee every morning."
    ],
    "exampleTranslations": [
      "Chào buổi sáng cả lớp! Mời các em ngồi vào chỗ.",
      "Tôi uống một tách cà phê vào mỗi buổi sáng."
    ],
    "synonyms": ["dawn"],
    "antonyms": ["evening", "night"]
  },
  {
    "id": "bv_greeti_05",
    "word": "afternoon",
    "phonetic": "/ˌæftərˈnuːn/",
    "definition": "The time from noon or lunchtime until evening.",
    "definitionVn": "buổi chiều (từ 12h trưa đến 6h tối)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good afternoon, ladies and gentlemen.",
      "We have an English class this afternoon."
    ],
    "exampleTranslations": [
      "Chào buổi chiều quý ông và quý bà.",
      "Chúng tôi có một lớp tiếng Anh vào chiều nay."
    ],
    "synonyms": [],
    "antonyms": ["morning"]
  },
  {
    "id": "bv_greeti_06",
    "word": "evening",
    "phonetic": "/ˈiːvnɪŋ/",
    "definition": "The period of time at the end of the day, usually from about 6 p.m. to bedtime.",
    "definitionVn": "buổi tối (sau 6h chiều)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good evening, welcome to our restaurant.",
      "What are you doing this evening?"
    ],
    "exampleTranslations": [
      "Chào buổi tối, chào mừng quý khách đến nhà hàng.",
      "Tối nay bạn định làm gì?"
    ],
    "synonyms": [],
    "antonyms": ["morning"]
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
    "synonyms": ["bye", "farewell"],
    "antonyms": ["hello"]
  },
  {
    "id": "bv_greeti_08",
    "word": "bye",
    "phonetic": "/baɪ/",
    "definition": "A casual way to say goodbye to friends.",
    "definitionVn": "chào tạm biệt (ngắn gọn thân mật)",
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
    "synonyms": ["goodbye"],
    "antonyms": []
  },
  {
    "id": "bv_greeti_09",
    "word": "night",
    "phonetic": "/naɪt/",
    "definition": "The time of darkness between evening and morning.",
    "definitionVn": "ban đêm (trước khi đi ngủ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Good night, sweet dreams!",
      "The stars are shining brightly tonight."
    ],
    "exampleTranslations": [
      "Chúc ngủ ngon, mơ giấc mơ đẹp nhé!",
      "Những ngôi sao đang tỏa sáng rực rỡ đêm nay."
    ],
    "synonyms": [],
    "antonyms": ["day", "morning"]
  },
  {
    "id": "bv_greeti_10",
    "word": "please",
    "phonetic": "/pliːz/",
    "definition": "A polite word used when making a request or asking for something.",
    "definitionVn": "làm ơn (lịch sự khi yêu cầu)",
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
    "word": "thank",
    "phonetic": "/θæŋk/",
    "definition": "To express gratitude and appreciation to someone.",
    "definitionVn": "cảm ơn (động từ bày tỏ lòng biết ơn)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Thank you very much for your kind help.",
      "I would like to thank my teacher."
    ],
    "exampleTranslations": [
      "Cảm ơn bạn rất nhiều vì sự giúp đỡ tốt bụng.",
      "Tôi muốn cảm ơn giáo viên của mình."
    ],
    "synonyms": ["appreciate"],
    "antonyms": []
  },
  {
    "id": "bv_greeti_12",
    "word": "thanks",
    "phonetic": "/θæŋks/",
    "definition": "A friendly and casual word used to express gratitude.",
    "definitionVn": "lời cảm ơn (thân mật)",
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
    "synonyms": ["gratitude"],
    "antonyms": []
  },
  {
    "id": "bv_greeti_13",
    "word": "grateful",
    "phonetic": "/ˈɡreɪtfl/",
    "definition": "Feeling or showing an appreciation of kindness; thankful.",
    "definitionVn": "biết ơn (trân trọng sự giúp đỡ)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I am very grateful for your support.",
      "She gave him a grateful smile."
    ],
    "exampleTranslations": [
      "Tôi rất biết ơn sự hỗ trợ của bạn.",
      "Cô ấy dành cho anh một nụ cười biết ơn."
    ],
    "synonyms": ["thankful", "appreciative"],
    "antonyms": ["ungrateful"]
  },
  {
    "id": "bv_greeti_14",
    "word": "glad",
    "phonetic": "/ɡlæd/",
    "definition": "Pleased, happy, and willing to help someone.",
    "definitionVn": "vui lòng (hân hạnh, vui vẻ)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I am glad to meet you today.",
      "We are always glad to help our friends."
    ],
    "exampleTranslations": [
      "Hôm nay tôi rất vui được gặp bạn.",
      "Chúng tôi luôn sẵn lòng giúp đỡ bạn bè."
    ],
    "synonyms": ["pleased", "happy"],
    "antonyms": ["sad"]
  },
  {
    "id": "bv_greeti_15",
    "word": "sorry",
    "phonetic": "/ˈsɑːri/",
    "definition": "Used to apologize for a mistake or show sympathy.",
    "definitionVn": "xin lỗi (hối tiếc khi làm phiền)",
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
    "synonyms": ["pardon", "apologetic"],
    "antonyms": []
  },
  {
    "id": "bv_greeti_16",
    "word": "excuse",
    "phonetic": "/ɪkˈskjuːz/",
    "definition": "To forgive someone for a minor fault or politely ask for attention.",
    "definitionVn": "lượng thứ (xin phép lịch sự)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Excuse me, where is the nearest station?",
      "Please excuse my late arrival."
    ],
    "exampleTranslations": [
      "Xin lỗi cho tôi hỏi, ga tàu gần nhất ở đâu vậy?",
      "Xin hãy lượng thứ cho việc tôi đến muộn."
    ],
    "synonyms": ["forgive", "pardon"],
    "antonyms": []
  },
  {
    "id": "bv_greeti_17",
    "word": "pardon",
    "phonetic": "/ˈpɑːrdn/",
    "definition": "Used to ask someone to repeat what they have just said.",
    "definitionVn": "thứ lỗi (khi chưa nghe rõ)",
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
    "synonyms": ["excuse"],
    "antonyms": []
  },
  {
    "id": "bv_greeti_18",
    "word": "welcome",
    "phonetic": "/ˈwelkəm/",
    "definition": "Used to greet someone arriving in a friendly manner.",
    "definitionVn": "chào đón (hoan nghênh khách đến)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Welcome to our home in Hanoi!",
      "You are always welcome here."
    ],
    "exampleTranslations": [
      "Chào mừng các bạn đến ngôi nhà của chúng tôi tại Hà Nội!",
      "Bạn luôn được chào đón ở đây."
    ],
    "synonyms": ["greet"],
    "antonyms": []
  },
  {
    "id": "bv_greeti_19",
    "word": "yes",
    "phonetic": "/jes/",
    "definition": "Used to express agreement, confirmation, or positive answer.",
    "definitionVn": "vâng (đồng ý, xác nhận)",
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
    "synonyms": ["yeah", "sure"],
    "antonyms": ["no"]
  },
  {
    "id": "bv_greeti_20",
    "word": "no",
    "phonetic": "/noʊ/",
    "definition": "Used to express refusal, disagreement, or negative answer.",
    "definitionVn": "không (từ chối hoặc phủ định)",
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
    "synonyms": ["nope"],
    "antonyms": ["yes"]
  },
  {
    "id": "bv_greeti_21",
    "word": "okay",
    "phonetic": "/oʊˈkeɪ/",
    "definition": "Used to express agreement or that everything is fine.",
    "definitionVn": "đồng ý (được rồi, ổn thỏa)",
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
    "synonyms": ["fine"],
    "antonyms": []
  },
  {
    "id": "bv_greeti_22",
    "word": "sure",
    "phonetic": "/ʃʊr/",
    "definition": "Confident; certainly or gladly agreeing.",
    "definitionVn": "chắc chắn (tất nhiên rồi)",
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
    "synonyms": ["certainly"],
    "antonyms": ["unsure"]
  },
  {
    "id": "bv_greeti_23",
    "word": "greet",
    "phonetic": "/ɡriːt/",
    "definition": "To give a polite word or sign of welcome when meeting someone.",
    "definitionVn": "chào hỏi (đón tiếp lịch sự)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "She always greets her neighbors with a warm smile.",
      "He stepped forward to greet the guests."
    ],
    "exampleTranslations": [
      "Cô ấy luôn chào hỏi hàng xóm bằng một nụ cười ấm áp.",
      "Anh ấy bước tới để chào đón các vị khách."
    ],
    "synonyms": ["welcome", "salute"],
    "antonyms": ["ignore"]
  },
  {
    "id": "bv_greeti_24",
    "word": "meet",
    "phonetic": "/miːt/",
    "definition": "To come into the presence or company of someone.",
    "definitionVn": "gặp gỡ (làm quen với ai đó)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Nice to meet you, David!",
      "Let us meet at the coffee shop tomorrow."
    ],
    "exampleTranslations": [
      "Rất vui được gặp bạn, David!",
      "Hãy gặp nhau ở quán cà phê vào ngày mai nhé."
    ],
    "synonyms": ["encounter"],
    "antonyms": ["leave"]
  },
  {
    "id": "bv_greeti_25",
    "word": "farewell",
    "phonetic": "/ˌferˈwel/",
    "definition": "An act of parting or of marking someone's departure.",
    "definitionVn": "lời từ biệt (chào tạm biệt khi đi xa)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "They held a farewell party for their teacher.",
      "He waved a fond farewell to his family."
    ],
    "exampleTranslations": [
      "Họ tổ chức một bữa tiệc chia tay cho giáo viên của mình.",
      "Anh ấy vẫy tay chào từ biệt đầy lưu luyến với gia đình."
    ],
    "synonyms": ["goodbye"],
    "antonyms": ["greeting"]
  },
  {
    "id": "bv_greeti_26",
    "word": "later",
    "phonetic": "/ˈleɪtər/",
    "definition": "At a time in the near future; afterwards.",
    "definitionVn": "sau này (một lát nữa)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "I have a class now, see you later!",
      "I will call you back later this evening."
    ],
    "exampleTranslations": [
      "Tôi có tiết học bây giờ rồi, hẹn gặp lại bạn sau!",
      "Tôi sẽ gọi lại cho bạn muộn hơn vào tối nay."
    ],
    "synonyms": ["afterwards"],
    "antonyms": ["earlier", "now"]
  },
  {
    "id": "bv_greeti_27",
    "word": "polite",
    "phonetic": "/pəˈlaɪt/",
    "definition": "Having or showing behavior that is respectful and considerate of other people.",
    "definitionVn": "lịch sự (lễ phép, nhã nhặn)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "He is always very polite to everyone.",
      "It is polite to say thank you when someone helps you."
    ],
    "exampleTranslations": [
      "Anh ấy luôn rất lịch sự với mọi người.",
      "Nói lời cảm ơn khi ai đó giúp bạn là phép lịch sự."
    ],
    "synonyms": ["courteous", "respectful"],
    "antonyms": ["rude", "impolite"]
  },
  {
    "id": "bv_greeti_28",
    "word": "friendly",
    "phonetic": "/ˈfrendli/",
    "definition": "Kind, pleasant, and behaving like a friend toward others.",
    "definitionVn": "thân thiện (cởi mở, hòa đồng)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "The people in this town are very friendly.",
      "She greeted us with a friendly wave."
    ],
    "exampleTranslations": [
      "Người dân ở thị trấn này rất thân thiện.",
      "Cô ấy chào chúng tôi bằng một cái vẫy tay thân thiện."
    ],
    "synonyms": ["kind", "welcoming"],
    "antonyms": ["unfriendly", "hostile"]
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
    "synonyms": ["congrats"],
    "antonyms": []
  },
  {
    "id": "bv_greeti_30",
    "word": "cheers",
    "phonetic": "/tʃɪrz/",
    "definition": "Used as a toast when drinking or a friendly informal expression.",
    "definitionVn": "cạn ly (chúc mừng trên bàn tiệc)",
    "pos": "interjection",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_greetings",
    "themeNameVn": "Chào hỏi & Giao tiếp",
    "themeNameEn": "Greetings & Polite Words",
    "examples": [
      "Cheers to our friendship and success!",
      "They raised their glasses and said cheers."
    ],
    "exampleTranslations": [
      "Cạn ly chúc mừng tình bạn và thành công của chúng ta!",
      "Họ nâng ly và hô vang cạn ly."
    ],
    "synonyms": ["toast"],
    "antonyms": []
  }
];

export const CHUDE_CHAO_HOI_GIAO_TIEP: VocabularyTopicPackage = {
  theme: THEME_CHAO_HOI_GIAO_TIEP,
  vocabs: VOCABS_CHAO_HOI_GIAO_TIEP,
};

export default CHUDE_CHAO_HOI_GIAO_TIEP;
