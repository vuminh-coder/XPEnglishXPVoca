import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 7: Động từ hàng ngày (Daily Common Verbs)
 * Mã chủ đề: t_basic_daily_verbs
 * Tổng số từ vựng: 20 từ
 */
export const THEME_DONG_TU_HANG_NGAY: BasicTheme = {
  "id": "t_basic_daily_verbs",
  "name": "Động từ hàng ngày",
  "nameEn": "Daily Common Verbs",
  "icon": "⚡",
  "difficulty": 1,
  "color": "#8b5cf6",
  "description": "Các hành động cơ bản nhất: ăn, uống, đi, ngủ, nói, đọc, viết, học...",
  "totalVocabs": 20
};

export const VOCABS_DONG_TU_HANG_NGAY: BasicVocabularyItem[] = [
  {
    "id": "bv_daily__01",
    "word": "be",
    "phonetic": "/biː/",
    "definition": "Exist; have a specified state or identity (am/is/are).",
    "definitionVn": "thì, là, ở (động từ to be)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I am happy to be here.",
      "They are very friendly."
    ],
    "exampleTranslations": [
      "Tôi rất vui khi được ở đây.",
      "Họ rất thân thiện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__02",
    "word": "have",
    "phonetic": "/hæv/",
    "definition": "Possess, own, or hold.",
    "definitionVn": "có, sở hữu",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I have a question for the teacher.",
      "She has two brothers."
    ],
    "exampleTranslations": [
      "Tôi có một câu hỏi cho thầy giáo.",
      "Cô ấy có hai người anh trai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__03",
    "word": "do",
    "phonetic": "/duː/",
    "definition": "Perform an action, task, or activity.",
    "definitionVn": "làm, thực hiện",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Do your homework carefully.",
      "What do you do in your free time?"
    ],
    "exampleTranslations": [
      "Hãy làm bài tập về nhà cẩn thận.",
      "Bạn thường làm gì vào thời gian rảnh?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__04",
    "word": "go",
    "phonetic": "/ɡoʊ/",
    "definition": "Move from one place to another.",
    "definitionVn": "đi, di chuyển đến nơi khác",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Let's go to school together.",
      "She goes to the gym on Mondays."
    ],
    "exampleTranslations": [
      "Cùng đi học nào.",
      "Cô ấy đi tập gym vào thứ Hai."
    ],
    "synonyms": [],
    "antonyms": [
      "come",
      "stay"
    ]
  },
  {
    "id": "bv_daily__05",
    "word": "come",
    "phonetic": "/kʌm/",
    "definition": "Move toward or arrive at a place.",
    "definitionVn": "đến, tới đây",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Come here and look at this!",
      "They came to visit us."
    ],
    "exampleTranslations": [
      "Lại đây xem cái này đi!",
      "Họ đã đến thăm chúng tôi."
    ],
    "synonyms": [],
    "antonyms": [
      "go"
    ]
  },
  {
    "id": "bv_daily__06",
    "word": "eat",
    "phonetic": "/iːt/",
    "definition": "Put food into mouth, chew and swallow.",
    "definitionVn": "ăn (thức ăn)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "We eat breakfast at 7 AM.",
      "Do you want to eat out tonight?"
    ],
    "exampleTranslations": [
      "Chúng tôi ăn sáng lúc 7h.",
      "Tối nay bạn muốn đi ăn ngoài không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__07",
    "word": "drink",
    "phonetic": "/drɪŋk/",
    "definition": "Take liquid into mouth and swallow.",
    "definitionVn": "uống (nước, đồ uống)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Drink plenty of water every day.",
      "I like to drink hot tea."
    ],
    "exampleTranslations": [
      "Uống nhiều nước mỗi ngày nhé.",
      "Tôi thích uống trà nóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__08",
    "word": "sleep",
    "phonetic": "/sliːp/",
    "definition": "Rest with eyes closed and mind inactive.",
    "definitionVn": "ngủ, đi ngủ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I sleep eight hours every night.",
      "The baby is sleeping soundly."
    ],
    "exampleTranslations": [
      "Tôi ngủ 8 tiếng mỗi đêm.",
      "Em bé đang ngủ say sưa."
    ],
    "synonyms": [],
    "antonyms": [
      "wake up"
    ]
  },
  {
    "id": "bv_daily__09",
    "word": "wake up",
    "phonetic": "/weɪk ʌp/",
    "definition": "Stop sleeping and open one's eyes.",
    "definitionVn": "thức giấc, tỉnh dậy",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I wake up early at 6:00 AM.",
      "Wake up, breakfast is ready!"
    ],
    "exampleTranslations": [
      "Tôi thức dậy sớm lúc 6h sáng.",
      "Dậy đi, bữa sáng đã sẵn sàng!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__10",
    "word": "speak",
    "phonetic": "/spiːk/",
    "definition": "Say words in order to communicate.",
    "definitionVn": "nói, phát biểu (ngôn ngữ)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Do you speak English? — Yes, a little.",
      "She speaks clearly and confidently."
    ],
    "exampleTranslations": [
      "Bạn có nói tiếng Anh không? — Có, một chút.",
      "Cô ấy nói năng rõ ràng và tự tin."
    ],
    "synonyms": [
      "talk"
    ],
    "antonyms": []
  },
  {
    "id": "bv_daily__11",
    "word": "read",
    "phonetic": "/riːd/",
    "definition": "Look at and comprehend written text.",
    "definitionVn": "đọc (sách, báo, tin nhắn)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I love reading books in the evening.",
      "Can you read this sentence aloud?"
    ],
    "exampleTranslations": [
      "Tôi thích đọc sách vào buổi tối.",
      "Bạn đọc to câu này lên được không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__12",
    "word": "write",
    "phonetic": "/raɪt/",
    "definition": "Mark letters or words on a surface.",
    "definitionVn": "viết (chữ, bài, thư)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Write down new words in your notebook.",
      "She writes emails to her friend."
    ],
    "exampleTranslations": [
      "Hãy ghi từ mới vào sổ tay.",
      "Cô ấy viết email cho bạn mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__13",
    "word": "listen",
    "phonetic": "/ˈlɪsn/",
    "definition": "Give attention to sound or speech.",
    "definitionVn": "nghe, lắng nghe",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Listen carefully to the recording.",
      "I listen to English podcasts."
    ],
    "exampleTranslations": [
      "Hãy lắng nghe kỹ đoạn ghi âm nhé.",
      "Tôi nghe các podcast tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__14",
    "word": "learn",
    "phonetic": "/lɜːrn/",
    "definition": "Gain knowledge or skill by study.",
    "definitionVn": "học tập, tiếp thu kiến thức",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Learning English opens many doors.",
      "She learned how to swim quickly."
    ],
    "exampleTranslations": [
      "Học tiếng Anh mở ra nhiều cơ hội.",
      "Cô ấy học bơi rất nhanh."
    ],
    "synonyms": [
      "study"
    ],
    "antonyms": []
  },
  {
    "id": "bv_daily__15",
    "word": "walk",
    "phonetic": "/wɔːk/",
    "definition": "Move on foot at a regular pace.",
    "definitionVn": "đi bộ, dạo bước",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I walk to the park every morning.",
      "Walking is great for your heart."
    ],
    "exampleTranslations": [
      "Tôi đi bộ ra công viên mỗi sáng.",
      "Đi bộ rất tốt cho tim mạch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__16",
    "word": "run",
    "phonetic": "/rʌn/",
    "definition": "Move fast on foot.",
    "definitionVn": "chạy, chạy bộ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "He runs five kilometers every day.",
      "Run fast, or we will miss the bus!"
    ],
    "exampleTranslations": [
      "Anh ấy chạy 5km mỗi ngày.",
      "Chạy nhanh lên kẻo lỡ xe buýt!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_daily__17",
    "word": "open",
    "phonetic": "/ˈoʊpən/",
    "definition": "Move so as to allow access; not closed.",
    "definitionVn": "mở (cửa, sách, mắt)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Open your English book to page 10.",
      "Please open the window."
    ],
    "exampleTranslations": [
      "Mở sách tiếng Anh trang 10 nhé.",
      "Làm ơn mở cửa sổ ra nhé."
    ],
    "synonyms": [],
    "antonyms": [
      "close"
    ]
  },
  {
    "id": "bv_daily__18",
    "word": "close",
    "phonetic": "/kloʊz/",
    "definition": "Move so as to block an opening.",
    "definitionVn": "đóng lại, khép lại",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Close your eyes and make a wish.",
      "Please close the door behind you."
    ],
    "exampleTranslations": [
      "Nhắm mắt lại và ước một điều ước đi.",
      "Làm ơn đóng cửa lại khi vào nhé."
    ],
    "synonyms": [],
    "antonyms": [
      "open"
    ]
  },
  {
    "id": "bv_daily__19",
    "word": "buy",
    "phonetic": "/baɪ/",
    "definition": "Obtain in exchange for payment.",
    "definitionVn": "mua (hàng hóa, đồ đạc)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "I want to buy fresh fruits at the market.",
      "She bought a new dictionary."
    ],
    "exampleTranslations": [
      "Tôi muốn mua hoa quả tươi ở chợ.",
      "Cô ấy đã mua cuốn từ điển mới."
    ],
    "synonyms": [],
    "antonyms": [
      "sell"
    ]
  },
  {
    "id": "bv_daily__20",
    "word": "help",
    "phonetic": "/help/",
    "definition": "Make it easier for someone to do something.",
    "definitionVn": "giúp đỡ, hỗ trợ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_daily_verbs",
    "themeNameVn": "Động từ hàng ngày",
    "themeNameEn": "Daily Common Verbs",
    "examples": [
      "Can you help me with this problem?",
      "She always helps her classmates."
    ],
    "exampleTranslations": [
      "Bạn có thể giúp tôi bài này không?",
      "Cô ấy luôn giúp đỡ các bạn cùng lớp."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_DONG_TU_HANG_NGAY: VocabularyTopicPackage = {
  theme: THEME_DONG_TU_HANG_NGAY,
  vocabs: VOCABS_DONG_TU_HANG_NGAY,
};

export default CHUDE_DONG_TU_HANG_NGAY;
