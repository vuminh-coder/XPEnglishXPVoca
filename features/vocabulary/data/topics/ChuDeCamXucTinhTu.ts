import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 9: Cảm xúc & Tính từ (Emotions & Adjectives)
 * Mã chủ đề: t_basic_emotions_adjectives
 * Tổng số từ vựng: 22 từ
 */
export const THEME_CAM_XUC_TINH_TU: BasicTheme = {
  "id": "t_basic_emotions_adjectives",
  "name": "Cảm xúc & Tính từ",
  "nameEn": "Emotions & Adjectives",
  "icon": "😊",
  "difficulty": 1,
  "color": "#f43f5e",
  "description": "Tính từ miêu tả cảm xúc, trạng thái và đặc điểm đồ vật thông dụng.",
  "totalVocabs": 22
};

export const VOCABS_CAM_XUC_TINH_TU: BasicVocabularyItem[] = [
  {
    "id": "bv_emotio_01",
    "word": "happy",
    "phonetic": "/ˈhæpi/",
    "definition": "Feeling or showing pleasure or contentment.",
    "definitionVn": "vui vẻ, hạnh phúc",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "I am so happy to see you again!",
      "The kids looked happy playing."
    ],
    "exampleTranslations": [
      "Tôi rất vui được gặp lại bạn!",
      "Lũ trẻ trông thật vui vẻ khi chơi đùa."
    ],
    "synonyms": [
      "joyful",
      "glad"
    ],
    "antonyms": [
      "sad"
    ]
  },
  {
    "id": "bv_emotio_02",
    "word": "sad",
    "phonetic": "/sæd/",
    "definition": "Feeling sorrow or unhappiness.",
    "definitionVn": "buồn bã, buồn rầu",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Why do you look so sad today?",
      "It was a sad and moving movie."
    ],
    "exampleTranslations": [
      "Sao hôm nay trông bạn buồn thế?",
      "Đó là một bộ phim buồn và xúc động."
    ],
    "synonyms": [
      "unhappy"
    ],
    "antonyms": [
      "happy"
    ]
  },
  {
    "id": "bv_emotio_03",
    "word": "angry",
    "phonetic": "/ˈæŋɡri/",
    "definition": "Feeling or showing strong annoyance or displeasure.",
    "definitionVn": "tức giận, giận dữ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Take a deep breath when you feel angry.",
      "He was angry about the broken promise."
    ],
    "exampleTranslations": [
      "Hãy hít thở sâu khi bạn thấy tức giận.",
      "Anh ấy giận vì lời hứa bị phá vỡ."
    ],
    "synonyms": [
      "mad"
    ],
    "antonyms": []
  },
  {
    "id": "bv_emotio_04",
    "word": "tired",
    "phonetic": "/ˈtaɪərd/",
    "definition": "In need of sleep or rest; exhausted.",
    "definitionVn": "mệt mỏi, buồn ngủ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "I am very tired after a long day.",
      "If you feel tired, take a rest."
    ],
    "exampleTranslations": [
      "Tôi rất mệt sau một ngày dài.",
      "Nếu thấy mệt, hãy nghỉ ngơi nhé."
    ],
    "synonyms": [
      "exhausted"
    ],
    "antonyms": []
  },
  {
    "id": "bv_emotio_05",
    "word": "hungry",
    "phonetic": "/ˈhʌŋɡri/",
    "definition": "Feeling or displaying the need for food.",
    "definitionVn": "đói bụng, thèm ăn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "I am hungry; let's get some lunch!",
      "Are you hungry yet?"
    ],
    "exampleTranslations": [
      "Tôi đói bụng rồi; đi ăn trưa thôi!",
      "Bạn đã thấy đói bụng chưa?"
    ],
    "synonyms": [],
    "antonyms": [
      "full"
    ]
  },
  {
    "id": "bv_emotio_06",
    "word": "thirsty",
    "phonetic": "/ˈθɜːrsti/",
    "definition": "Feeling a need to drink liquid.",
    "definitionVn": "khát nước",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "I am thirsty after running; give me water.",
      "Drink water whenever you feel thirsty."
    ],
    "exampleTranslations": [
      "Tôi khát nước sau khi chạy; cho tôi xin nước.",
      "Hãy uống nước bất cứ khi nào thấy khát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_07",
    "word": "scared",
    "phonetic": "/skerd/",
    "definition": "Fearful; frightened.",
    "definitionVn": "sợ hãi, hoảng sợ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Don't be scared; everything will be fine.",
      "She was scared of the dark."
    ],
    "exampleTranslations": [
      "Đừng sợ nhé; mọi chuyện sẽ ổn cả thôi.",
      "Cô ấy từng sợ bóng tối."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_08",
    "word": "excited",
    "phonetic": "/ɪkˈsaɪtɪd/",
    "definition": "Very enthusiastic and eager.",
    "definitionVn": "hào hứng, phấn khởi",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "The students are excited about the summer trip.",
      "I am so excited to learn English."
    ],
    "exampleTranslations": [
      "Các học sinh rất hào hứng về chuyến đi mùa hè.",
      "Tôi rất phấn khởi khi được học tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_09",
    "word": "good",
    "phonetic": "/ɡʊd/",
    "definition": "Of high quality or standard; favorable.",
    "definitionVn": "tốt, giỏi, hay, ngon",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "You did a very good job!",
      "This soup tastes really good."
    ],
    "exampleTranslations": [
      "Bạn đã làm rất tốt!",
      "Món súp này có vị rất ngon."
    ],
    "synonyms": [
      "great",
      "fine"
    ],
    "antonyms": [
      "bad"
    ]
  },
  {
    "id": "bv_emotio_10",
    "word": "bad",
    "phonetic": "/bæd/",
    "definition": "Of poor quality; unpleasant or harmful.",
    "definitionVn": "xấu, tồi tệ, có hại",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Smoking is bad for your health.",
      "I had a bad dream last night."
    ],
    "exampleTranslations": [
      "Hút thuốc có hại cho sức khỏe.",
      "Đêm qua tôi gặp ác mộng tồi tệ."
    ],
    "synonyms": [],
    "antonyms": [
      "good"
    ]
  },
  {
    "id": "bv_emotio_11",
    "word": "big",
    "phonetic": "/bɪɡ/",
    "definition": "Of considerable size or extent.",
    "definitionVn": "to lớn, bự",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "They live in a big house.",
      "Elephants are big animals."
    ],
    "exampleTranslations": [
      "Họ sống trong ngôi nhà to lớn.",
      "Voi là loài động vật to lớn."
    ],
    "synonyms": [
      "large"
    ],
    "antonyms": [
      "small"
    ]
  },
  {
    "id": "bv_emotio_12",
    "word": "small",
    "phonetic": "/smɔːl/",
    "definition": "Of a size less than normal.",
    "definitionVn": "nhỏ bé, bé nhỏ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "The kitten has small paws.",
      "Even small progress matters."
    ],
    "exampleTranslations": [
      "Mèo con có bàn chân nhỏ.",
      "Dù là tiến bộ nhỏ cũng rất đáng quý."
    ],
    "synonyms": [
      "little",
      "tiny"
    ],
    "antonyms": [
      "big"
    ]
  },
  {
    "id": "bv_emotio_13",
    "word": "hot",
    "phonetic": "/hɑːt/",
    "definition": "Having a high temperature.",
    "definitionVn": "nóng, cay nóng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "It is very hot outside today.",
      "The soup is hot, be careful!"
    ],
    "exampleTranslations": [
      "Hôm nay trời ngoài kia rất nóng.",
      "Bát súp đang nóng đấy, cẩn thận!"
    ],
    "synonyms": [],
    "antonyms": [
      "cold"
    ]
  },
  {
    "id": "bv_emotio_14",
    "word": "cold",
    "phonetic": "/koʊld/",
    "definition": "Of a low temperature.",
    "definitionVn": "lạnh, giá lạnh",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "It gets cold in winter.",
      "I would love a cold drink."
    ],
    "exampleTranslations": [
      "Trời trở lạnh vào mùa đông.",
      "Tôi rất muốn một ly nước lạnh."
    ],
    "synonyms": [],
    "antonyms": [
      "hot"
    ]
  },
  {
    "id": "bv_emotio_15",
    "word": "warm",
    "phonetic": "/wɔːrm/",
    "definition": "Of a comfortable degree of heat.",
    "definitionVn": "ấm áp, nồng ấm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Spring weather is pleasantly warm.",
      "She gave me a warm hug."
    ],
    "exampleTranslations": [
      "Thời tiết mùa xuân ấm áp dễ chịu.",
      "Cô ấy ôm tôi một cái thật ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_16",
    "word": "cool",
    "phonetic": "/kuːl/",
    "definition": "Fairly cold in an agreeable way.",
    "definitionVn": "mát mẻ, ngầu",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Autumn breeze is fresh and cool.",
      "That new jacket looks really cool!"
    ],
    "exampleTranslations": [
      "Làn gió thu trong lành và mát mẻ.",
      "Chiếc áo khoác mới trông rất ngầu!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_17",
    "word": "new",
    "phonetic": "/nuː/",
    "definition": "Produced, introduced, or discovered recently.",
    "definitionVn": "mới, mới mẻ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "I bought a new English dictionary.",
      "Welcome to our new school year!"
    ],
    "exampleTranslations": [
      "Tôi mua cuốn từ điển tiếng Anh mới.",
      "Chào mừng năm học mới của chúng ta!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_emotio_18",
    "word": "old",
    "phonetic": "/oʊld/",
    "definition": "Having lived or existed for a long time.",
    "definitionVn": "cũ, già, lâu đời",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Hanoi has an ancient and historic Old Quarter.",
      "Respect and care for old people."
    ],
    "exampleTranslations": [
      "Hà Nội có Phố Cổ cổ kính và lâu đời.",
      "Hãy kính trọng và chăm sóc người già."
    ],
    "synonyms": [],
    "antonyms": [
      "new",
      "young"
    ]
  },
  {
    "id": "bv_emotio_19",
    "word": "fast",
    "phonetic": "/fæst/",
    "definition": "Moving or capable of moving at high speed.",
    "definitionVn": "nhanh, mau lẹ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "He is a very fast runner.",
      "Time flies fast when you are having fun."
    ],
    "exampleTranslations": [
      "Cậu ấy là một vận động viên chạy rất nhanh.",
      "Thời gian trôi thật nhanh khi vui vẻ."
    ],
    "synonyms": [
      "quick"
    ],
    "antonyms": [
      "slow"
    ]
  },
  {
    "id": "bv_emotio_20",
    "word": "slow",
    "phonetic": "/sloʊ/",
    "definition": "Moving or operating, or progressing at low speed.",
    "definitionVn": "chậm chạp, từ tốn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "Turtles are slow creatures.",
      "Speak a bit slower, please."
    ],
    "exampleTranslations": [
      "Rùa là loài sinh vật chậm chạp.",
      "Làm ơn nói chậm lại một chút nhé."
    ],
    "synonyms": [],
    "antonyms": [
      "fast"
    ]
  },
  {
    "id": "bv_emotio_21",
    "word": "easy",
    "phonetic": "/ˈiːzi/",
    "definition": "Achieved without great effort; presenting few difficulties.",
    "definitionVn": "dễ dàng, đơn giản",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "This English quiz is very easy.",
      "Take it easy and don't worry."
    ],
    "exampleTranslations": [
      "Bài kiểm tra tiếng Anh này rất dễ.",
      "Cứ từ từ thư giãn, đừng lo lắng nhé."
    ],
    "synonyms": [],
    "antonyms": [
      "hard",
      "difficult"
    ]
  },
  {
    "id": "bv_emotio_22",
    "word": "beautiful",
    "phonetic": "/ˈbjuːtɪfl/",
    "definition": "Pleasing the senses or mind aesthetically.",
    "definitionVn": "xinh đẹp, tuyệt đẹp",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_emotions_adjectives",
    "themeNameVn": "Cảm xúc & Tính từ",
    "themeNameEn": "Emotions & Adjectives",
    "examples": [
      "The sunrise over the sea is beautiful.",
      "She has a beautiful smile."
    ],
    "exampleTranslations": [
      "Bình minh trên biển thật tuyệt đẹp.",
      "Cô ấy có nụ cười rất xinh xắn."
    ],
    "synonyms": [
      "pretty",
      "lovely"
    ],
    "antonyms": [
      "ugly"
    ]
  }
];

export const CHUDE_CAM_XUC_TINH_TU: VocabularyTopicPackage = {
  theme: THEME_CAM_XUC_TINH_TU,
  vocabs: VOCABS_CAM_XUC_TINH_TU,
};

export default CHUDE_CAM_XUC_TINH_TU;
