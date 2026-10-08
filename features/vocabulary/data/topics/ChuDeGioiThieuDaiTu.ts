import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 2: Giới thiệu & Đại từ (Self-Intro & Pronouns)
 * Mã chủ đề: t_basic_introductions
 * Tổng số từ vựng: 35 từ
 */
export const THEME_GIOI_THIEU_DAI_TU: BasicTheme = {
  "id": "t_basic_introductions",
  "name": "Giới thiệu & Đại từ",
  "nameEn": "Self-Intro & Pronouns",
  "icon": "👤",
  "difficulty": 1,
  "color": "#0284c7",
  "description": "Đại từ nhân xưng, sở hữu và từ vựng giới thiệu bản thân cơ bản.",
  "totalVocabs": 35
};

export const VOCABS_GIOI_THIEU_DAI_TU: BasicVocabularyItem[] = [
  {
    "id": "bv_introd_01",
    "word": "I",
    "phonetic": "/aɪ/",
    "definition": "Used by a speaker to refer to himself or herself.",
    "definitionVn": "tôi, mình, tớ (ngôi thứ nhất số ít)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "I am a student at the university.",
      "I like to read English books every day."
    ],
    "exampleTranslations": [
      "Tôi là sinh viên trường đại học.",
      "Tôi thích đọc sách tiếng Anh mỗi ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_02",
    "word": "you",
    "phonetic": "/juː/",
    "definition": "Used to refer to the person or people being spoken to.",
    "definitionVn": "bạn, các bạn, anh, chị (ngôi thứ hai)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "You are very kind and helpful.",
      "Where are you from?"
    ],
    "exampleTranslations": [
      "Bạn thật tốt bụng và nhiệt tình.",
      "Bạn đến từ đâu vậy?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_03",
    "word": "he",
    "phonetic": "/hiː/",
    "definition": "Used to refer to a male person previously mentioned.",
    "definitionVn": "anh ấy, ông ấy, cậu ấy (ngôi thứ ba số ít nam)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "He is my English teacher.",
      "He lives in New York City."
    ],
    "exampleTranslations": [
      "Thầy ấy là giáo viên tiếng Anh của tôi.",
      "Anh ấy sống ở thành phố New York."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_04",
    "word": "she",
    "phonetic": "/ʃiː/",
    "definition": "Used to refer to a female person previously mentioned.",
    "definitionVn": "cô ấy, bà ấy, chị ấy (ngôi thứ ba số ít nữ)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "She has a warm voice.",
      "She works at a local hospital."
    ],
    "exampleTranslations": [
      "Cô ấy có giọng nói ấm áp.",
      "Cô ấy làm việc tại bệnh viện địa phương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_05",
    "word": "we",
    "phonetic": "/wiː/",
    "definition": "Used to refer to the speaker and one or more other people.",
    "definitionVn": "chúng tôi, chúng ta (ngôi thứ nhất số nhiều)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "We are good friends since childhood.",
      "We love studying English together."
    ],
    "exampleTranslations": [
      "Chúng tôi là bạn tốt từ thuở nhỏ.",
      "Chúng tôi thích cùng nhau học tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_06",
    "word": "they",
    "phonetic": "/ðeɪ/",
    "definition": "Used to refer to two or more people or things.",
    "definitionVn": "họ, chúng nó (ngôi thứ ba số nhiều)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "They are playing soccer in the park.",
      "They are very friendly neighbors."
    ],
    "exampleTranslations": [
      "Họ đang chơi bóng đá trong công viên.",
      "Họ là những người hàng xóm rất thân thiện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_07",
    "word": "it",
    "phonetic": "/ɪt/",
    "definition": "Used to refer to an animal, thing, or situation.",
    "definitionVn": "nó, điều đó (đồ vật, con vật hoặc sự việc)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Look at that cute cat! It is sleeping.",
      "It is raining outside right now."
    ],
    "exampleTranslations": [
      "Hãy nhìn chú mèo dễ thương kia! Nó đang ngủ.",
      "Bên ngoài trời đang mưa vào lúc này."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_08",
    "word": "me",
    "phonetic": "/miː/",
    "definition": "Used by a speaker to refer to himself or herself as an object.",
    "definitionVn": "tôi, mình (tân ngữ)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Can you help me with this exercise?",
      "Give me a call when you arrive."
    ],
    "exampleTranslations": [
      "Bạn có thể giúp tôi bài tập này không?",
      "Hãy gọi cho tôi khi bạn đến nơi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_09",
    "word": "him",
    "phonetic": "/hɪm/",
    "definition": "Used as the object of a verb or preposition to refer to a male.",
    "definitionVn": "anh ấy, cậu ấy (tân ngữ nam)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "I saw him at the library yesterday.",
      "Tell him to come here, please."
    ],
    "exampleTranslations": [
      "Hôm qua tôi thấy anh ấy ở thư viện.",
      "Làm ơn bảo cậu ấy lại đây nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_10",
    "word": "her",
    "phonetic": "/hɜːr/",
    "definition": "Used as the object of a verb or preposition to refer to a female.",
    "definitionVn": "cô ấy, chị ấy (tân ngữ nữ / của cô ấy)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "I gave her a bunch of flowers.",
      "This is her new backpack."
    ],
    "exampleTranslations": [
      "Tôi đã tặng cô ấy một bó hoa.",
      "Đây là chiếc ba lô mới của cô ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_11",
    "word": "us",
    "phonetic": "/ʌs/",
    "definition": "Used by a speaker to refer to himself or herself and one or more other people as the object of a verb.",
    "definitionVn": "chúng tôi, chúng ta (tân ngữ)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Join us for lunch today!",
      "The teacher gave us interesting homework."
    ],
    "exampleTranslations": [
      "Cùng đi ăn trưa với chúng tôi hôm nay nhé!",
      "Thầy giáo đã giao cho chúng tôi bài tập rất thú vị."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_12",
    "word": "them",
    "phonetic": "/ðem/",
    "definition": "Used as the object of a verb or preposition to refer to two or more people or things.",
    "definitionVn": "họ, chúng nó (tân ngữ)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "I invited them to my birthday party.",
      "Look at those flowers; water them daily."
    ],
    "exampleTranslations": [
      "Tôi đã mời họ đến dự tiệc sinh nhật của mình.",
      "Hãy nhìn những bông hoa kia; tưới nước cho chúng hàng ngày nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_13",
    "word": "my",
    "phonetic": "/maɪ/",
    "definition": "Belonging to or associated with the speaker.",
    "definitionVn": "của tôi (tính từ sở hữu)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "This is my favorite English notebook.",
      "My dream is to travel around the world."
    ],
    "exampleTranslations": [
      "Đây là cuốn sổ tay tiếng Anh yêu thích của tôi.",
      "Ước mơ của tôi là được đi du lịch vòng quanh thế giới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_14",
    "word": "your",
    "phonetic": "/jɔːr/",
    "definition": "Belonging to or associated with the person being addressed.",
    "definitionVn": "của bạn, của các bạn",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "What is your favorite hobby?",
      "Is this your new smartphone?"
    ],
    "exampleTranslations": [
      "Sở thích yêu thích của bạn là gì?",
      "Đây có phải điện thoại mới của bạn không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_15",
    "word": "his",
    "phonetic": "/hɪz/",
    "definition": "Belonging to or associated with a male person.",
    "definitionVn": "của anh ấy, của cậu ấy",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "His car is parked outside the gate.",
      "He loves his job as an architect."
    ],
    "exampleTranslations": [
      "Xe của anh ấy đỗ ngoài cổng.",
      "Anh ấy yêu công việc kiến trúc sư của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_16",
    "word": "our",
    "phonetic": "/ˈaʊər/",
    "definition": "Belonging to or associated with the speaker and others.",
    "definitionVn": "của chúng tôi, của chúng ta",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Welcome to our new English club!",
      "Our house has a lovely garden."
    ],
    "exampleTranslations": [
      "Chào mừng đến với câu lạc bộ tiếng Anh của chúng tôi!",
      "Nhà của chúng tôi có khu vườn xinh xắn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_17",
    "word": "their",
    "phonetic": "/ðer/",
    "definition": "Belonging to or associated with the people or things mentioned.",
    "definitionVn": "của họ, của chúng nó",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Their children go to international school.",
      "They love their cozy apartment."
    ],
    "exampleTranslations": [
      "Con cái của họ học trường quốc tế.",
      "Họ rất yêu căn hộ ấm cúng của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_18",
    "word": "this",
    "phonetic": "/ðɪs/",
    "definition": "Used to identify a specific person or thing close at hand.",
    "definitionVn": "cái này, người này, đây (ở gần)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "This is my best friend, David.",
      "This book is very interesting."
    ],
    "exampleTranslations": [
      "Đây là bạn thân nhất của tôi, David.",
      "Cuốn sách này rất thú vị."
    ],
    "synonyms": [],
    "antonyms": [
      "that"
    ]
  },
  {
    "id": "bv_introd_19",
    "word": "that",
    "phonetic": "/ðæt/",
    "definition": "Used to identify a specific person or thing observed by the speaker.",
    "definitionVn": "cái đó, người kia, đó (ở xa)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Who is that girl standing over there?",
      "That is a great idea!"
    ],
    "exampleTranslations": [
      "Cô gái đang đứng đằng kia là ai vậy?",
      "Đó là một ý kiến tuyệt vời!"
    ],
    "synonyms": [],
    "antonyms": [
      "this"
    ]
  },
  {
    "id": "bv_introd_20",
    "word": "who",
    "phonetic": "/huː/",
    "definition": "Used to ask what or which person or people.",
    "definitionVn": "ai, người nào (từ để hỏi)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Who is your English teacher?",
      "Who wants to answer the question?"
    ],
    "exampleTranslations": [
      "Ai là giáo viên tiếng Anh của bạn?",
      "Ai muốn trả lời câu hỏi này nào?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_21",
    "word": "what",
    "phonetic": "/wʌt/",
    "definition": "Asking for information specifying something.",
    "definitionVn": "cái gì, gì (từ để hỏi)",
    "pos": "pronoun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "What is your name?",
      "What are you studying right now?"
    ],
    "exampleTranslations": [
      "Tên bạn là gì?",
      "Bạn đang học gì vào lúc này thế?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_22",
    "word": "where",
    "phonetic": "/wer/",
    "definition": "In or to what place or position.",
    "definitionVn": "ở đâu, nơi nào (từ để hỏi)",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Where do you live in Vietnam?",
      "Where is the library located?"
    ],
    "exampleTranslations": [
      "Bạn sống ở đâu tại Việt Nam?",
      "Thư viện nằm ở vị trí nào vậy?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_23",
    "word": "name",
    "phonetic": "/neɪm/",
    "definition": "A word by which a person, animal, or thing is known.",
    "definitionVn": "tên, họ tên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "What is your name? — My name is Minh.",
      "Please write your full name here."
    ],
    "exampleTranslations": [
      "Tên bạn là gì? — Tên tôi là Minh.",
      "Vui lòng viết đầy đủ họ tên vào đây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_24",
    "word": "age",
    "phonetic": "/eɪdʒ/",
    "definition": "The length of time that a person has lived.",
    "definitionVn": "tuổi, số tuổi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "She learned English at the age of six.",
      "What is your age? — I am twenty."
    ],
    "exampleTranslations": [
      "Cô ấy học tiếng Anh từ năm 6 tuổi.",
      "Bạn bao nhiêu tuổi? — Tôi 20 tuổi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_25",
    "word": "friend",
    "phonetic": "/frend/",
    "definition": "A person whom one knows and has a bond of affection with.",
    "definitionVn": "bạn bè, người bạn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "She is my best friend in class.",
      "I went to the cinema with friends."
    ],
    "exampleTranslations": [
      "Cô ấy là bạn thân nhất của tôi trong lớp.",
      "Tôi đã đi xem phim cùng bạn bè."
    ],
    "synonyms": [
      "pal",
      "buddy"
    ],
    "antonyms": []
  },
  {
    "id": "bv_introd_26",
    "word": "boy",
    "phonetic": "/bɔɪ/",
    "definition": "A male child or young man.",
    "definitionVn": "cậu bé, bé trai, chàng trai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "The little boy is flying a colorful kite.",
      "He is a clever and polite boy."
    ],
    "exampleTranslations": [
      "Cậu bé đang thả con diều nhiều màu sắc.",
      "Cậu ấy là một chàng trai thông minh và lễ phép."
    ],
    "synonyms": [],
    "antonyms": [
      "girl"
    ]
  },
  {
    "id": "bv_introd_27",
    "word": "girl",
    "phonetic": "/ɡɜːrl/",
    "definition": "A female child or young woman.",
    "definitionVn": "cô bé, bé gái, cô gái",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "The girl has long black hair.",
      "She is the smartest girl in our school."
    ],
    "exampleTranslations": [
      "Cô bé có mái tóc đen dài.",
      "Cô ấy là nữ sinh thông minh nhất trường chúng tôi."
    ],
    "synonyms": [],
    "antonyms": [
      "boy"
    ]
  },
  {
    "id": "bv_introd_28",
    "word": "man",
    "phonetic": "/mæn/",
    "definition": "An adult human male.",
    "definitionVn": "người đàn ông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "A kind man helped me carry my heavy suitcase.",
      "He is a wise and experienced man."
    ],
    "exampleTranslations": [
      "Một người đàn ông tốt bụng đã giúp tôi xách chiếc vali nặng.",
      "Ông ấy là người đàn ông thông thái và giàu kinh nghiệm."
    ],
    "synonyms": [],
    "antonyms": [
      "woman"
    ]
  },
  {
    "id": "bv_introd_29",
    "word": "woman",
    "phonetic": "/ˈwʊmən/",
    "definition": "An adult human female.",
    "definitionVn": "người phụ nữ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "She is a strong and independent woman.",
      "The woman smiled warmly at the children."
    ],
    "exampleTranslations": [
      "Cô ấy là một người phụ nữ mạnh mẽ và tự lập.",
      "Người phụ nữ mỉm cười ấm áp với các em nhỏ."
    ],
    "synonyms": [],
    "antonyms": [
      "man"
    ]
  },
  {
    "id": "bv_introd_30",
    "word": "person",
    "phonetic": "/ˈpɜːrsn/",
    "definition": "A human being regarded as an individual.",
    "definitionVn": "người, con người (số ít)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "She is a very friendly and positive person.",
      "Only one person can enter at a time."
    ],
    "exampleTranslations": [
      "Cô ấy là một người rất thân thiện và tích cực.",
      "Mỗi lần chỉ một người được bước vào."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_31",
    "word": "people",
    "phonetic": "/ˈpiːpl/",
    "definition": "Human beings in general or considered collectively.",
    "definitionVn": "mọi người, con người (số nhiều)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Many people enjoy traveling in the summer.",
      "The people here are very welcoming."
    ],
    "exampleTranslations": [
      "Nhiều người thích đi du lịch vào mùa hè.",
      "Người dân ở đây rất hiếu khách."
    ],
    "synonyms": [
      "humans"
    ],
    "antonyms": []
  },
  {
    "id": "bv_introd_32",
    "word": "student",
    "phonetic": "/ˈstjuːdnt/",
    "definition": "A person studying at a school, college, or university.",
    "definitionVn": "học sinh, sinh viên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Every student should practice speaking English.",
      "She is a hard-working student."
    ],
    "exampleTranslations": [
      "Mỗi học sinh nên luyện nói tiếng Anh.",
      "Cô ấy là một học sinh rất chăm chỉ."
    ],
    "synonyms": [
      "learner",
      "pupil"
    ],
    "antonyms": []
  },
  {
    "id": "bv_introd_33",
    "word": "teacher",
    "phonetic": "/ˈtiːtʃər/",
    "definition": "A person who teaches, especially in a school.",
    "definitionVn": "thầy giáo, cô giáo, giáo viên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Our English teacher is very enthusiastic.",
      "Teachers inspire students to succeed."
    ],
    "exampleTranslations": [
      "Giáo viên tiếng Anh của chúng tôi rất nhiệt tình.",
      "Các thầy cô truyền cảm hứng cho học sinh thành công."
    ],
    "synonyms": [
      "instructor"
    ],
    "antonyms": []
  },
  {
    "id": "bv_introd_34",
    "word": "country",
    "phonetic": "/ˈkʌntri/",
    "definition": "A nation with its own government and territory.",
    "definitionVn": "quốc gia, đất nước, quê hương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "Vietnam is a beautiful country with rich culture.",
      "Which country would you like to visit?"
    ],
    "exampleTranslations": [
      "Việt Nam là đất nước tươi đẹp với nền văn hóa phong phú.",
      "Bạn muốn đến thăm quốc gia nào nhất?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_introd_35",
    "word": "job",
    "phonetic": "/dʒɑːb/",
    "definition": "A paid position of regular employment.",
    "definitionVn": "công việc, nghề nghiệp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_introductions",
    "themeNameVn": "Giới thiệu & Đại từ",
    "themeNameEn": "Self-Intro & Pronouns",
    "examples": [
      "What is your dream job? — I want to be a doctor.",
      "She applied for a new job yesterday."
    ],
    "exampleTranslations": [
      "Công việc mơ ước của bạn là gì? — Tôi muốn làm bác sĩ.",
      "Hôm qua cô ấy đã nộp đơn ứng tuyển công việc mới."
    ],
    "synonyms": [
      "career",
      "occupation"
    ],
    "antonyms": []
  }
];

export const CHUDE_GIOI_THIEU_DAI_TU: VocabularyTopicPackage = {
  theme: THEME_GIOI_THIEU_DAI_TU,
  vocabs: VOCABS_GIOI_THIEU_DAI_TU,
};

export default CHUDE_GIOI_THIEU_DAI_TU;
