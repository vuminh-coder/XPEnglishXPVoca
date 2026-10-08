import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 58: Lễ hội & Phong tục (Holidays & Customs)
 * Mã chủ đề: t_basic_holidays_customs
 * Tổng số từ vựng: 20 từ
 */
export const THEME_LE_HOI_PHONG_TUC: BasicTheme = {
  "id": "t_basic_holidays_customs",
  "name": "Lễ hội & Phong tục",
  "nameEn": "Holidays & Customs",
  "icon": "🎆",
  "difficulty": 1,
  "color": "#dc2626",
  "description": "Tết cổ truyền, Năm Mới, Giáng Sinh, đám cưới, quà tặng, pháo hoa và truyền thống.",
  "totalVocabs": 20
};

export const VOCABS_LE_HOI_PHONG_TUC: BasicVocabularyItem[] = [
  {
    "id": "bv_holida_01",
    "word": "holiday",
    "phonetic": "/ˈhɑːlədeɪ/",
    "definition": "An extended period of leisure and recreation, especially one spent away from home; a public celebration.",
    "definitionVn": "ngày lễ, kỳ nghỉ lễ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Tet is the most cherished traditional holiday in Vietnam.",
      "What are your family's travel plans for the upcoming holiday?"
    ],
    "exampleTranslations": [
      "Tết là ngày nghỉ lễ truyền thống được trân quý nhất tại Việt Nam.",
      "Kế hoạch du lịch của gia đình bạn trong kỳ nghỉ lễ sắp tới là gì?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_02",
    "word": "festival",
    "phonetic": "/ˈfestɪvl/",
    "definition": "A day or period of celebration, typically a religious commemoration or cultural gathering.",
    "definitionVn": "lễ hội truyền thống, ngày hội",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "The Mid-Autumn Festival features colorful star lanterns, lion dances, and mooncakes.",
      "Thousands join the cultural boat racing festival."
    ],
    "exampleTranslations": [
      "Lễ hội Trung Thu có rước đèn ông sao rực rỡ, múa lân và bánh trung thu.",
      "Hàng ngàn người tham gia ngày hội đua thuyền truyền thống."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_03",
    "word": "celebration",
    "phonetic": "/ˌselɪˈbreɪʃn/",
    "definition": "The action of celebrating an important day or event.",
    "definitionVn": "sự ăn mừng, lễ kỷ niệm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Join the nationwide celebration of Independence Day on September 2nd.",
      "Family reunions are the heart of the festive celebration."
    ],
    "exampleTranslations": [
      "Tham gia lễ kỷ niệm Quốc khánh trên toàn quốc vào ngày 2 tháng 9 nhé.",
      "Những buổi sum họp gia đình là trái tim của ngày lễ ăn mừng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_04",
    "word": "Tet",
    "phonetic": "/tet/",
    "definition": "The Vietnamese Lunar New Year, the most important cultural celebration in Vietnam.",
    "definitionVn": "Tết Nguyên Đán (cổ truyền)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "During Tet, families gather to make square sticky rice cakes (Banh Chung).",
      "Wishing everyone peace, prosperity, and happiness for Tet!"
    ],
    "exampleTranslations": [
      "Trong dịp Tết, cả nhà quây quần gói bánh chưng vuông vức.",
      "Kính chúc mọi nhà bình an, thịnh vượng và hạnh phúc trong dịp Tết!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_05",
    "word": "New Year",
    "phonetic": "/nuː jɪr/",
    "definition": "The start of a new calendar year, celebrated at midnight on December 31st or Lunar New Year.",
    "definitionVn": "Năm Mới, thời khắc chuyển giao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Count down together to welcome the promising New Year!",
      "Happy New Year to you and your loved ones!"
    ],
    "exampleTranslations": [
      "Cùng nhau đếm ngược chào đón một Năm Mới đầy hứa hẹn nào!",
      "Chúc mừng Năm Mới đến bạn và những người thân yêu!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_06",
    "word": "Christmas",
    "phonetic": "/ˈkrɪsməs/",
    "definition": "The annual Christian festival celebrating Christ's birth, held on December 25th in the Western Church.",
    "definitionVn": "Lễ Giáng Sinh, Noel",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Decorate the green Christmas tree with shiny ornaments and sparkling lights.",
      "Merry Christmas and happy holidays to all!"
    ],
    "exampleTranslations": [
      "Trang trí cây thông Giáng Sinh xanh bằng những quả cầu lấp lánh và ánh đèn rực rỡ nhé.",
      "Chúc mọi người một mùa Giáng Sinh an lành và kỳ nghỉ vui vẻ!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_07",
    "word": "wedding",
    "phonetic": "/ˈwedɪŋ/",
    "definition": "A marriage ceremony, especially considered as including the associated celebrations.",
    "definitionVn": "lễ cưới, đám cưới",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "The bride and groom smiled radiantly on their wedding day.",
      "We attended our close friend's wedding celebration."
    ],
    "exampleTranslations": [
      "Cô dâu và chú rể mỉm cười rạng rỡ trong ngày cưới của họ.",
      "Chúng tôi đã tham dự lễ cưới của người bạn thân."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_08",
    "word": "anniversary",
    "phonetic": "/ˌænɪˈvɜːrsəri/",
    "definition": "The date on which an event took place in a previous year.",
    "definitionVn": "ngày kỷ niệm, lễ kỷ niệm năm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "They celebrated their twenty-fifth wedding anniversary with family.",
      "The school celebrated the 50th anniversary of its founding."
    ],
    "exampleTranslations": [
      "Họ đã kỷ niệm 25 năm ngày cưới cùng gia đình.",
      "Trường học đã tổ chức lễ kỷ niệm 50 năm ngày thành lập."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_09",
    "word": "party",
    "phonetic": "/ˈpɑːrti/",
    "definition": "A social gathering of invited guests, typically involving eating, drinking, and entertainment.",
    "definitionVn": "bữa tiệc, buổi liên hoan",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "We hosted a fun surprise farewell party for our classmate.",
      "Dance and enjoy delicious food at the year-end party."
    ],
    "exampleTranslations": [
      "Chúng tôi đã tổ chức một bữa tiệc chia tay bất ngờ vui nhộn cho người bạn cùng lớp.",
      "Khiêu vũ và thưởng thức đồ ăn ngon tại tiệc tất niên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_10",
    "word": "gift",
    "phonetic": "/ɡɪft/",
    "definition": "A thing given willingly to someone without payment; a present.",
    "definitionVn": "món quà, quà tặng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "She wrapped the thoughtful birthday gift with a red ribbon.",
      "A meaningful book is the greatest gift of knowledge."
    ],
    "exampleTranslations": [
      "Cô ấy đã gói món quà sinh nhật chu đáo bằng một chiếc nơ đỏ.",
      "Một cuốn sách ý nghĩa là món quà tri thức tuyệt vời nhất."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_11",
    "word": "present",
    "phonetic": "/ˈpreznt/",
    "definition": "A thing given to someone as a gift.",
    "definitionVn": "món quà biếu, phần quà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Children unwrapped their colorful presents with excitement on Christmas morning.",
      "He gave his mother a lovely present on Women's Day."
    ],
    "exampleTranslations": [
      "Trẻ em háo hức mở những hộp quà nhiều màu sắc vào sáng Giáng Sinh.",
      "Anh ấy đã tặng mẹ một món quà đáng yêu nhân ngày Phụ nữ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_12",
    "word": "fireworks",
    "phonetic": "/ˈfaɪərwɜːrks/",
    "definition": "A device containing gunpowder and other combustible chemicals which causes spectacular explosions when ignited.",
    "definitionVn": "pháo hoa (đêm giao thừa/lễ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Spectacular fireworks illuminated the night sky over Hoan Kiem Lake.",
      "Crowds cheered as the midnight fireworks began."
    ],
    "exampleTranslations": [
      "Màn pháo hoa rực rỡ đã thắp sáng bầu trời đêm trên Hồ Hoàn Kiếm.",
      "Đám đông hò reo khi những chùm pháo hoa lúc nửa đêm bắt đầu bung tỏa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_13",
    "word": "lantern",
    "phonetic": "/ˈlæntərn/",
    "definition": "A lamp with a transparent case protecting the flame or electric bulb, typically with a handle.",
    "definitionVn": "đèn lồng, đèn Trung Thu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Hoi An Ancient Town glows magically with thousands of silk lanterns at night.",
      "Children parade star-shaped lanterns during Mid-Autumn."
    ],
    "exampleTranslations": [
      "Phố Cổ Hội An tỏa sáng kỳ ảo với hàng ngàn chiếc đèn lồng lụa về đêm.",
      "Trẻ em rước đèn ông sao trong đêm Trung Thu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_14",
    "word": "parade",
    "phonetic": "/pəˈreɪd/",
    "definition": "A public procession, especially one celebrating a special day or event.",
    "definitionVn": "cuộc diễu hành, lễ diễu hành",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Thousands marched in the grand National Day parade in Ba Dinh Square.",
      "Marching bands played upbeat music during the festival parade."
    ],
    "exampleTranslations": [
      "Hàng ngàn người đã diễu hành trong lễ diễu binh Quốc khánh trọng thể tại Quảng trường Ba Đình.",
      "Các ban nhạc diễu hành chơi nhạc vui tươi trong lễ hội."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_15",
    "word": "costume",
    "phonetic": "/ˈkɑːstuːm/",
    "definition": "A set of clothes in a style typical of a particular country or historical period.",
    "definitionVn": "trang phục truyền thống, trang phục hóa trang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Ethnic groups wear magnificent hand-embroidered traditional costumes.",
      "Children dressed up in superhero costumes for the school play."
    ],
    "exampleTranslations": [
      "Các dân tộc diện những bộ trang phục truyền thống thêu tay tuyệt mỹ.",
      "Trẻ em hóa trang thành các siêu anh hùng cho vở kịch của trường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_16",
    "word": "tradition",
    "phonetic": "/trəˈdɪʃn/",
    "definition": "The transmission of customs or beliefs from generation to generation.",
    "definitionVn": "truyền thống, nét văn hóa lâu đời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Vietnamese tradition values filial piety, hospitality, and hard work.",
      "Passing down cultural traditions keeps heritage alive."
    ],
    "exampleTranslations": [
      "Truyền thống của người Việt luôn đề cao chữ hiếu, lòng hiếu khách và sự chăm chỉ.",
      "Việc truyền dạy các truyền thống văn hóa giữ cho di sản sống mãi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_17",
    "word": "custom",
    "phonetic": "/ˈkʌstəm/",
    "definition": "A traditional and widely accepted way of behaving or doing something that is specific to a particular society.",
    "definitionVn": "phong tục, tập quán",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Giving lucky money in red envelopes is a beloved Lunar New Year custom.",
      "Learn local customs when traveling abroad."
    ],
    "exampleTranslations": [
      "Mừng tuổi bằng bao lì xì đỏ là phong tục được yêu thích trong dịp Tết Nguyên Đán.",
      "Hãy tìm hiểu các phong tục địa phương khi đi du lịch nước ngoài nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_18",
    "word": "wish",
    "phonetic": "/wɪʃ/",
    "definition": "Feel or express a strong desire or hope for someone's well-being or success.",
    "definitionVn": "lời chúc, ước nguyện",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "We wish you good health, prosperity, and joy for the new year.",
      "Make a wish before blowing out your birthday candles."
    ],
    "exampleTranslations": [
      "Chúng tôi kính chúc bạn dồi dào sức khỏe, an khang và niềm vui trong năm mới.",
      "Hãy ước một điều ước trước khi thổi nến sinh nhật nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_19",
    "word": "congratulate",
    "phonetic": "/kənˈɡrætʃuleɪt/",
    "definition": "Praise someone and say that one is pleased about a job, achievement, or special event.",
    "definitionVn": "chúc mừng, tán dương",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "Friends gathered to congratulate him on passing his IELTS exam with a high score.",
      "Congratulate the newlyweds on their marriage."
    ],
    "exampleTranslations": [
      "Bạn bè đã tụ họp để chúc mừng anh ấy đạt điểm cao trong kỳ thi IELTS.",
      "Chúc mừng đôi tân lang tân nương nhân ngày cưới nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_holida_20",
    "word": "feast",
    "phonetic": "/fiːst/",
    "definition": "A large meal, typically one in celebration of something.",
    "definitionVn": "bữa tiệc thịnh soạn, mâm cỗ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_holidays_customs",
    "themeNameVn": "Lễ hội & Phong tục",
    "themeNameEn": "Holidays & Customs",
    "examples": [
      "The family enjoyed a lavish traditional feast on New Year's Eve.",
      "A festive feast brings relatives together around the table."
    ],
    "exampleTranslations": [
      "Cả gia đình cùng thưởng thức một mâm cỗ truyền thống thịnh soạn trong đêm Giao thừa.",
      "Một bữa tiệc lễ hội gắn kết họ hàng quây quần bên bàn ăn."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_LE_HOI_PHONG_TUC: VocabularyTopicPackage = {
  theme: THEME_LE_HOI_PHONG_TUC,
  vocabs: VOCABS_LE_HOI_PHONG_TUC,
};

export default CHUDE_LE_HOI_PHONG_TUC;
