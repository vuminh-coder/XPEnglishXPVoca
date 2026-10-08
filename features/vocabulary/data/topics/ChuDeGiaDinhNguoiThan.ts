import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 5: Gia đình & Người thân (Family & Relatives)
 * Mã chủ đề: t_basic_family
 * Tổng số từ vựng: 25 từ
 */
export const THEME_GIA_DINH_NGUOI_THAN: BasicTheme = {
  "id": "t_basic_family",
  "name": "Gia đình & Người thân",
  "nameEn": "Family & Relatives",
  "icon": "👨‍👩‍👧‍👦",
  "difficulty": 1,
  "color": "#3b82f6",
  "description": "Xưng hô và mối quan hệ giữa các thành viên trong gia đình.",
  "totalVocabs": 25
};

export const VOCABS_GIA_DINH_NGUOI_THAN: BasicVocabularyItem[] = [
  {
    "id": "bv_family_01",
    "word": "family",
    "phonetic": "/ˈfæməli/",
    "definition": "A group consisting of parents and children living together.",
    "definitionVn": "gia đình, tổ ấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Family is the most important thing in life.",
      "We spend Sunday dinner with our family."
    ],
    "exampleTranslations": [
      "Gia đình là điều quan trọng nhất trong cuộc sống.",
      "Chúng tôi ăn tối Chủ Nhật cùng gia đình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_02",
    "word": "father",
    "phonetic": "/ˈfɑːðər/",
    "definition": "A male parent of a child.",
    "definitionVn": "bố, cha, ba",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My father works as an engineer.",
      "I love going fishing with my father."
    ],
    "exampleTranslations": [
      "Bố tôi làm kỹ sư.",
      "Tôi thích đi câu cá cùng bố."
    ],
    "synonyms": [
      "dad",
      "papa"
    ],
    "antonyms": []
  },
  {
    "id": "bv_family_03",
    "word": "mother",
    "phonetic": "/ˈmʌðər/",
    "definition": "A female parent of a child.",
    "definitionVn": "mẹ, má",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My mother cooks delicious meals.",
      "She gave her mother flowers."
    ],
    "exampleTranslations": [
      "Mẹ tôi nấu ăn rất ngon.",
      "Cô ấy tặng hoa cho mẹ."
    ],
    "synonyms": [
      "mom",
      "mama"
    ],
    "antonyms": []
  },
  {
    "id": "bv_family_04",
    "word": "parents",
    "phonetic": "/ˈpeərənts/",
    "definition": "A person's father and mother together.",
    "definitionVn": "bố mẹ, cha mẹ, phụ huynh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "I live with my parents in Hanoi.",
      "Parents always love their children."
    ],
    "exampleTranslations": [
      "Tôi sống cùng bố mẹ ở Hà Nội.",
      "Cha mẹ luôn yêu thương con cái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_05",
    "word": "brother",
    "phonetic": "/ˈbrʌðər/",
    "definition": "A boy or man who has the same parents as another.",
    "definitionVn": "anh trai, em trai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My elder brother studies in Japan.",
      "I play football with my brother."
    ],
    "exampleTranslations": [
      "Anh trai tôi học ở Nhật.",
      "Tôi chơi bóng đá với em trai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_06",
    "word": "sister",
    "phonetic": "/ˈsɪstər/",
    "definition": "A girl or woman who has the same parents as another.",
    "definitionVn": "chị gái, em gái",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My younger sister is very cute.",
      "Her sister plays the piano well."
    ],
    "exampleTranslations": [
      "Em gái tôi rất dễ thương.",
      "Chị gái cô ấy chơi piano rất giỏi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_07",
    "word": "son",
    "phonetic": "/sʌn/",
    "definition": "A boy or man in relation to his parents.",
    "definitionVn": "con trai (của bố mẹ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "They are proud of their smart son.",
      "He is the only son in the family."
    ],
    "exampleTranslations": [
      "Họ rất tự hào về cậu con trai thông minh.",
      "Cậu ấy là con trai duy nhất trong nhà."
    ],
    "synonyms": [],
    "antonyms": [
      "daughter"
    ]
  },
  {
    "id": "bv_family_08",
    "word": "daughter",
    "phonetic": "/ˈdɔːtər/",
    "definition": "A girl or woman in relation to her parents.",
    "definitionVn": "con gái (của bố mẹ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Their daughter is learning English.",
      "She is a loving and helpful daughter."
    ],
    "exampleTranslations": [
      "Con gái họ đang học tiếng Anh.",
      "Cô ấy là một người con gái hiếu thảo."
    ],
    "synonyms": [],
    "antonyms": [
      "son"
    ]
  },
  {
    "id": "bv_family_09",
    "word": "baby",
    "phonetic": "/ˈbeɪbi/",
    "definition": "A very young child, especially newly born.",
    "definitionVn": "em bé, trẻ sơ sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "The baby smiled at his mother.",
      "We welcomed a baby girl into our home."
    ],
    "exampleTranslations": [
      "Em bé mỉm cười với mẹ.",
      "Gia đình tôi đón chào một bé gái mới sinh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_10",
    "word": "child",
    "phonetic": "/tʃaɪld/",
    "definition": "A young human being below the age of puberty.",
    "definitionVn": "đứa trẻ, con cái (số ít)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Every child deserves love and education.",
      "She played happily as a child."
    ],
    "exampleTranslations": [
      "Mọi đứa trẻ đều xứng đáng được yêu thương và học hành.",
      "Cô ấy đã chơi đùa vui vẻ thuở ấu thơ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_11",
    "word": "children",
    "phonetic": "/ˈtʃɪldrən/",
    "definition": "Plural form of child; young human beings.",
    "definitionVn": "trẻ em, các con (số nhiều)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "The children are playing in the park.",
      "How many children do they have?"
    ],
    "exampleTranslations": [
      "Những đứa trẻ đang chơi trong công viên.",
      "Họ có bao nhiêu người con?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_12",
    "word": "grandfather",
    "phonetic": "/ˈɡrænfɑːðər/",
    "definition": "The father of one's father or mother.",
    "definitionVn": "ông nội, ông ngoại",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Grandfather tells wonderful stories.",
      "My grandfather enjoys gardening."
    ],
    "exampleTranslations": [
      "Ông hay kể những câu chuyện tuyệt vời.",
      "Ông tôi rất thích làm vườn."
    ],
    "synonyms": [
      "grandpa"
    ],
    "antonyms": []
  },
  {
    "id": "bv_family_13",
    "word": "grandmother",
    "phonetic": "/ˈɡrænmʌðər/",
    "definition": "The mother of one's father or mother.",
    "definitionVn": "bà nội, bà ngoại",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Grandmother knit a sweater for me.",
      "I visit my grandmother on Sundays."
    ],
    "exampleTranslations": [
      "Bà đan áo len cho tôi.",
      "Tôi đến thăm bà vào Chủ Nhật."
    ],
    "synonyms": [
      "grandma"
    ],
    "antonyms": []
  },
  {
    "id": "bv_family_14",
    "word": "grandparents",
    "phonetic": "/ˈɡrænpeərənts/",
    "definition": "The parents of one's father or mother.",
    "definitionVn": "ông bà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "We visit our grandparents during Tet holiday.",
      "Grandparents give endless love."
    ],
    "exampleTranslations": [
      "Chúng tôi về thăm ông bà dịp Tết.",
      "Ông bà luôn dành tình yêu thương vô bờ bến."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_15",
    "word": "uncle",
    "phonetic": "/ˈʌŋkl/",
    "definition": "The brother of one's father or mother.",
    "definitionVn": "chú, bác, cậu, dượng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My uncle took us to the zoo.",
      "Uncle Tom is very funny."
    ],
    "exampleTranslations": [
      "Chú tôi đưa chúng tôi đi vườn thú.",
      "Bác Tom rất hài hước."
    ],
    "synonyms": [],
    "antonyms": [
      "aunt"
    ]
  },
  {
    "id": "bv_family_16",
    "word": "aunt",
    "phonetic": "/ænt/",
    "definition": "The sister of one's father or mother.",
    "definitionVn": "cô, dì, bác gái, mợ, thím",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Aunt Mary baked sweet cookies.",
      "My aunt lives in Da Nang."
    ],
    "exampleTranslations": [
      "Dì Mary nướng bánh quy rất thơm.",
      "Cô tôi sống ở Đà Nẵng."
    ],
    "synonyms": [],
    "antonyms": [
      "uncle"
    ]
  },
  {
    "id": "bv_family_17",
    "word": "cousin",
    "phonetic": "/ˈkʌzn/",
    "definition": "A child of one's uncle or aunt.",
    "definitionVn": "anh chị em họ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "I spent the summer with my cousins.",
      "She and her cousin are the same age."
    ],
    "exampleTranslations": [
      "Tôi trải qua mùa hè cùng các anh em họ.",
      "Cô ấy và người chị họ bằng tuổi nhau."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_18",
    "word": "husband",
    "phonetic": "/ˈhʌzbənd/",
    "definition": "A married man in relation to his spouse.",
    "definitionVn": "chồng, người chồng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "Her husband is a kind and caring man.",
      "They celebrated 10 years of marriage."
    ],
    "exampleTranslations": [
      "Chồng cô ấy là người chu đáo.",
      "Họ kỷ niệm 10 năm ngày cưới."
    ],
    "synonyms": [],
    "antonyms": [
      "wife"
    ]
  },
  {
    "id": "bv_family_19",
    "word": "wife",
    "phonetic": "/waɪf/",
    "definition": "A married woman in relation to her spouse.",
    "definitionVn": "vợ, người vợ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "He bought a gift for his beloved wife.",
      "His wife is an English teacher."
    ],
    "exampleTranslations": [
      "Anh ấy mua quà tặng người vợ yêu dấu.",
      "Vợ anh ấy là giáo viên tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": [
      "husband"
    ]
  },
  {
    "id": "bv_family_20",
    "word": "relative",
    "phonetic": "/ˈrelətɪv/",
    "definition": "A person connected by blood or marriage.",
    "definitionVn": "bà con, người thân họ hàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "All our relatives gathered for the family reunion.",
      "She has relatives living abroad."
    ],
    "exampleTranslations": [
      "Tất cả họ hàng tề tựu trong buổi họp mặt gia đình.",
      "Cô ấy có người thân sống ở nước ngoài."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_family_21",
    "word": "stepmother",
    "phonetic": "/ˈstepˌmʌð.ɚ/",
    "definition": "The woman who is married to one's father but is not one's biological mother.",
    "definitionVn": "mẹ kế, mẹ thứ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "She has a wonderful, supportive relationship with her stepmother.",
      "Her stepmother helped her prepare for the university entrance exams."
    ],
    "exampleTranslations": [
      "Cô ấy có một mối quan hệ tuyệt vời và luôn hỗ trợ với mẹ kế của mình.",
      "Mẹ kế của cô ấy đã giúp cô chuẩn bị cho kỳ thi tuyển sinh đại học."
    ],
    "synonyms": [
      "second mother"
    ],
    "antonyms": [
      "biological mother"
    ]
  },
  {
    "id": "bv_family_22",
    "word": "stepfather",
    "phonetic": "/ˈstepˌfɑː.ðɚ/",
    "definition": "The man who is married to one's mother but is not one's biological father.",
    "definitionVn": "bố dượng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "His stepfather taught him how to play baseball on weekends.",
      "The family gathered to celebrate his stepfather's fiftieth birthday."
    ],
    "exampleTranslations": [
      "Bố dượng đã dạy cậu ấy cách chơi bóng chày vào cuối tuần.",
      "Gia đình đã sum họp để chúc mừng sinh nhật lần thứ năm mươi của bố dượng."
    ],
    "synonyms": [
      "second father"
    ],
    "antonyms": [
      "biological father"
    ]
  },
  {
    "id": "bv_family_23",
    "word": "godparent",
    "phonetic": "/ˈɡɑːdˌper.ənt/",
    "definition": "A person who promises at a baptism or ceremony to take responsibility for a child's religious or moral education.",
    "definitionVn": "cha mẹ đỡ đầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "My godparents always send thoughtful books for my birthday.",
      "She asked her closest childhood friend to be the godparent to her newborn daughter."
    ],
    "exampleTranslations": [
      "Cha mẹ đỡ đầu của tôi luôn gửi những cuốn sách chu đáo vào ngày sinh nhật tôi.",
      "Cô ấy đã nhờ người bạn thân nhất thời thơ ấu làm mẹ đỡ đầu cho con gái mới sinh của mình."
    ],
    "synonyms": [
      "sponsor",
      "guardian"
    ],
    "antonyms": []
  },
  {
    "id": "bv_family_24",
    "word": "in-laws",
    "phonetic": "/ˈɪn.lɑːz/",
    "definition": "Relatives by marriage, especially the parents or family of one's spouse.",
    "definitionVn": "gia đình nhà thông gia, họ hàng bên vợ hoặc bên chồng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "We usually spend Sunday lunch visiting my in-laws in the countryside.",
      "Getting along with one's in-laws fosters harmony across the extended family."
    ],
    "exampleTranslations": [
      "Chúng tôi thường dành bữa trưa Chủ nhật để đến thăm bố mẹ vợ ở vùng nông thôn.",
      "Hòa thuận với gia đình bên vợ hoặc chồng giúp nuôi dưỡng sự hòa hợp trong đại gia đình."
    ],
    "synonyms": [
      "extended family by marriage"
    ],
    "antonyms": []
  },
  {
    "id": "bv_family_25",
    "word": "foster child",
    "phonetic": "/ˈfɑː.stɚ tʃaɪld/",
    "definition": "A child brought up by people who are not their biological or adoptive parents.",
    "definitionVn": "con nuôi, con nhận chăm sóc dưỡng dục",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_family",
    "themeNameVn": "Gia đình & Người thân",
    "themeNameEn": "Family & Relatives",
    "examples": [
      "The warm-hearted couple welcomed two foster children into their spacious home.",
      "Foster children need consistent emotional reassurance and stability."
    ],
    "exampleTranslations": [
      "Cặp vợ chồng nhân hậu đã chào đón hai đứa con nuôi vào ngôi nhà rộng rãi của họ.",
      "Trẻ em nhận nuôi dưỡng cần sự trấn an tinh thần và sự ổn định nhất quán."
    ],
    "synonyms": [
      "ward",
      "adopted charge"
    ],
    "antonyms": []
  }
];

export const CHUDE_GIA_DINH_NGUOI_THAN: VocabularyTopicPackage = {
  theme: THEME_GIA_DINH_NGUOI_THAN,
  vocabs: VOCABS_GIA_DINH_NGUOI_THAN,
};

export default CHUDE_GIA_DINH_NGUOI_THAN;
