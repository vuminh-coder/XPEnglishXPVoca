import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 3: Số đếm & Thứ tự (Numbers & Counting)
 * Mã chủ đề: t_basic_numbers
 * Tổng số từ vựng: 25 từ
 */
export const THEME_SO_DEM_THU_TU: BasicTheme = {
  "id": "t_basic_numbers",
  "name": "Số đếm & Thứ tự",
  "nameEn": "Numbers & Counting",
  "icon": "🔢",
  "difficulty": 1,
  "color": "#f59e0b",
  "description": "Số đếm từ 0 đến 1000, số thứ tự và cách đếm số lượng.",
  "totalVocabs": 25
};

export const VOCABS_SO_DEM_THU_TU: BasicVocabularyItem[] = [
  {
    "id": "bv_number_01",
    "word": "zero",
    "phonetic": "/ˈzɪroʊ/",
    "definition": "The numerical value 0; no quantity.",
    "definitionVn": "số không (0)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "The temperature dropped to zero degrees.",
      "My phone number ends with zero."
    ],
    "exampleTranslations": [
      "Nhiệt độ đã giảm xuống không độ.",
      "Số điện thoại của tôi kết thúc bằng số 0."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_02",
    "word": "one",
    "phonetic": "/wʌn/",
    "definition": "The number 1; single unit.",
    "definitionVn": "số một (1)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "I have one brother and two sisters.",
      "Just one moment, please!"
    ],
    "exampleTranslations": [
      "Tôi có một anh trai và hai chị gái.",
      "Làm ơn đợi một lát thôi ạ!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_03",
    "word": "two",
    "phonetic": "/tuː/",
    "definition": "The number 2; a pair.",
    "definitionVn": "số hai (2)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "Can I have two cups of coffee, please?",
      "There are two dogs in the garden."
    ],
    "exampleTranslations": [
      "Cho tôi hai tách cà phê được không?",
      "Có hai chú chó trong khu vườn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_04",
    "word": "three",
    "phonetic": "/θriː/",
    "definition": "The number 3.",
    "definitionVn": "số ba (3)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "She has three cats at home.",
      "The meeting starts in three minutes."
    ],
    "exampleTranslations": [
      "Cô ấy nuôi ba chú mèo ở nhà.",
      "Cuộc họp bắt đầu trong ba phút nữa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_05",
    "word": "four",
    "phonetic": "/fɔːr/",
    "definition": "The number 4.",
    "definitionVn": "số bốn (4)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "A table usually has four legs.",
      "There are four seasons in a year."
    ],
    "exampleTranslations": [
      "Một chiếc bàn thường có bốn chân.",
      "Có bốn mùa trong một năm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_06",
    "word": "five",
    "phonetic": "/faɪv/",
    "definition": "The number 5.",
    "definitionVn": "số năm (5)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "High five! You did a great job.",
      "We take a five-minute break."
    ],
    "exampleTranslations": [
      "Đập tay nào! Bạn đã làm rất tốt.",
      "Chúng tôi nghỉ giải lao năm phút."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_07",
    "word": "six",
    "phonetic": "/sɪks/",
    "definition": "The number 6.",
    "definitionVn": "số sáu (6)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "I wake up at six o'clock every morning.",
      "There are six apples in the basket."
    ],
    "exampleTranslations": [
      "Tôi thức dậy lúc 6 giờ mỗi sáng.",
      "Có sáu quả táo trong chiếc giỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_08",
    "word": "seven",
    "phonetic": "/ˈsevn/",
    "definition": "The number 7.",
    "definitionVn": "số bảy (7)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "There are seven days in a week.",
      "The rainbow has seven colors."
    ],
    "exampleTranslations": [
      "Có bảy ngày trong một tuần lễ.",
      "Cầu vồng có bảy sắc màu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_09",
    "word": "eight",
    "phonetic": "/eɪt/",
    "definition": "The number 8.",
    "definitionVn": "số tám (8)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "An octopus has eight arms.",
      "We sleep for eight hours a night."
    ],
    "exampleTranslations": [
      "Con bạch tuộc có tám chiếc xúc tu.",
      "Chúng ta ngủ tám tiếng mỗi đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_10",
    "word": "nine",
    "phonetic": "/naɪn/",
    "definition": "The number 9.",
    "definitionVn": "số chín (9)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "Nine is my lucky number.",
      "The shop opens at nine in the morning."
    ],
    "exampleTranslations": [
      "Số chín là số may mắn của tôi.",
      "Cửa hàng mở cửa lúc 9 giờ sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_11",
    "word": "ten",
    "phonetic": "/ten/",
    "definition": "The number 10.",
    "definitionVn": "số mười (10)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "We have ten fingers on our hands.",
      "Count from one to ten, please."
    ],
    "exampleTranslations": [
      "Chúng ta có mười ngón tay.",
      "Làm ơn đếm từ một đến mười nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_12",
    "word": "eleven",
    "phonetic": "/ɪˈlevn/",
    "definition": "The number 11 (10 + 1).",
    "definitionVn": "số mười một (11)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "There are eleven players in a football team.",
      "The clock struck eleven."
    ],
    "exampleTranslations": [
      "Có mười một cầu thủ trong một đội bóng đá.",
      "Đồng hồ đã điểm mười một giờ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_13",
    "word": "twelve",
    "phonetic": "/twelv/",
    "definition": "The number 12; a dozen.",
    "definitionVn": "số mười hai (12), một tá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "There are twelve months in a year.",
      "She bought a dozen eggs (twelve eggs)."
    ],
    "exampleTranslations": [
      "Có mười hai tháng trong một năm.",
      "Cô ấy mua một tá trứng (12 quả)."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_14",
    "word": "thirteen",
    "phonetic": "/ˌθɜːrˈtiːn/",
    "definition": "The number 13 (10 + 3).",
    "definitionVn": "số mười ba (13)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "A teenager is thirteen or older.",
      "Friday the thirteenth is famous in lore."
    ],
    "exampleTranslations": [
      "Thiếu niên là người từ mười ba tuổi trở lên.",
      "Thứ Sáu ngày mười ba nổi tiếng trong văn hóa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_15",
    "word": "fifteen",
    "phonetic": "/ˌfɪfˈtiːn/",
    "definition": "The number 15 (10 + 5).",
    "definitionVn": "số mười lăm (15)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "A quarter of an hour is fifteen minutes.",
      "She is fifteen years old."
    ],
    "exampleTranslations": [
      "Một phần tư giờ là mười lăm phút.",
      "Cô ấy mười lăm tuổi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_16",
    "word": "twenty",
    "phonetic": "/ˈtwenti/",
    "definition": "The number 20 (2 x 10).",
    "definitionVn": "số hai mươi (20)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "She celebrated her twentieth birthday.",
      "There are twenty students in the class."
    ],
    "exampleTranslations": [
      "Cô ấy tổ chức sinh nhật lần thứ hai mươi.",
      "Có hai mươi học sinh trong lớp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_17",
    "word": "thirty",
    "phonetic": "/ˈθɜːrti/",
    "definition": "The number 30 (3 x 10).",
    "definitionVn": "số ba mươi (30)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "There are thirty days in April.",
      "He has been teaching for thirty years."
    ],
    "exampleTranslations": [
      "Có ba mươi ngày trong tháng Tư.",
      "Thầy đã giảng dạy được ba mươi năm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_18",
    "word": "fifty",
    "phonetic": "/ˈfɪfti/",
    "definition": "The number 50.",
    "definitionVn": "số năm mươi (50)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "He drove fifty kilometers to see us.",
      "This shirt costs fifty dollars."
    ],
    "exampleTranslations": [
      "Anh ấy lái xe năm mươi cây số đến thăm chúng tôi.",
      "Chiếc áo này có giá năm mươi đô la."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_19",
    "word": "hundred",
    "phonetic": "/ˈhʌndrəd/",
    "definition": "The number 100.",
    "definitionVn": "một trăm (100)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "This book has two hundred pages.",
      "I scored one hundred percent."
    ],
    "exampleTranslations": [
      "Cuốn sách này có hai trăm trang.",
      "Tôi đạt điểm tối đa một trăm phần trăm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_20",
    "word": "thousand",
    "phonetic": "/ˈθaʊznd/",
    "definition": "The number 1,000.",
    "definitionVn": "một nghìn, một ngàn (1.000)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "Over one thousand people joined.",
      "It costs one thousand dollars."
    ],
    "exampleTranslations": [
      "Hơn một nghìn người đã tham gia.",
      "Nó có giá một nghìn đô la."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_21",
    "word": "first",
    "phonetic": "/fɜːrst/",
    "definition": "Coming before all others in time or order (1st).",
    "definitionVn": "thứ nhất, đầu tiên (số thứ tự)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "Today is my first day at school.",
      "He won first place in the contest."
    ],
    "exampleTranslations": [
      "Hôm nay là ngày đầu tiên tôi đi học.",
      "Cậu ấy giành giải nhất trong cuộc thi."
    ],
    "synonyms": [],
    "antonyms": [
      "last"
    ]
  },
  {
    "id": "bv_number_22",
    "word": "second",
    "phonetic": "/ˈsekənd/",
    "definition": "Number two in sequence (2nd); a unit of time.",
    "definitionVn": "thứ hai (thứ tự), giây (thời gian)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "She lives on the second floor.",
      "Wait just a second, please."
    ],
    "exampleTranslations": [
      "Cô ấy sống ở tầng hai.",
      "Làm ơn đợi một giây thôi ạ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_23",
    "word": "third",
    "phonetic": "/θɜːrd/",
    "definition": "Number three in sequence (3rd); 1/3 part.",
    "definitionVn": "thứ ba (thứ tự), một phần ba",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "This is my third time visiting Da Nang.",
      "One third of students speak English."
    ],
    "exampleTranslations": [
      "Đây là lần thứ ba tôi đến Đà Nẵng.",
      "Một phần ba học sinh nói tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_number_24",
    "word": "last",
    "phonetic": "/læst/",
    "definition": "Coming after all others in time or order.",
    "definitionVn": "cuối cùng, sau chót",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "This is the last bus of the evening.",
      "Who was the last person to leave?"
    ],
    "exampleTranslations": [
      "Đây là chuyến xe buýt cuối cùng trong tối.",
      "Ai là người cuối cùng rời đi?"
    ],
    "synonyms": [],
    "antonyms": [
      "first"
    ]
  },
  {
    "id": "bv_number_25",
    "word": "many",
    "phonetic": "/ˈmeni/",
    "definition": "A large number of countable things or people.",
    "definitionVn": "nhiều (dùng cho danh từ đếm được)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_numbers",
    "themeNameVn": "Số đếm & Thứ tự",
    "themeNameEn": "Numbers & Counting",
    "examples": [
      "There are many flowers in the park.",
      "How many books do you read a year?"
    ],
    "exampleTranslations": [
      "Có rất nhiều bông hoa trong công viên.",
      "Bạn đọc bao nhiêu cuốn sách mỗi năm?"
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_SO_DEM_THU_TU: VocabularyTopicPackage = {
  theme: THEME_SO_DEM_THU_TU,
  vocabs: VOCABS_SO_DEM_THU_TU,
};

export default CHUDE_SO_DEM_THU_TU;
