import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 13: Trang phục cơ bản (Clothing & Outfits)
 * Mã chủ đề: t_basic_clothes
 * Tổng số từ vựng: 25 từ
 */
export const THEME_TRANG_PHUC_CO_BAN: BasicTheme = {
  "id": "t_basic_clothes",
  "name": "Trang phục cơ bản",
  "nameEn": "Clothing & Outfits",
  "icon": "👕",
  "difficulty": 1,
  "color": "#a855f7",
  "description": "Quần áo, giày dép, nón mũ và phụ kiện mặc thường ngày.",
  "totalVocabs": 25
};

export const VOCABS_TRANG_PHUC_CO_BAN: BasicVocabularyItem[] = [
  {
    "id": "bv_clothe_01",
    "word": "clothes",
    "phonetic": "/kloʊðz/",
    "definition": "Items worn to cover the body.",
    "definitionVn": "quần áo, y phục",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Wear warm clothes in the cold winter.",
      "She folded her clean clothes neatly."
    ],
    "exampleTranslations": [
      "Hãy mặc quần áo ấm vào mùa đông lạnh nhé.",
      "Cô ấy gấp quần áo sạch thật gọn gàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_02",
    "word": "shirt",
    "phonetic": "/ʃɜːrt/",
    "definition": "A garment for the upper body with a collar and sleeves.",
    "definitionVn": "áo sơ mi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "He wore a crisp white shirt for the interview.",
      "Iron your shirt before school."
    ],
    "exampleTranslations": [
      "Anh ấy mặc áo sơ mi trắng tinh cho buổi phỏng vấn.",
      "Hãy ủi áo sơ mi trước khi đi học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_03",
    "word": "t-shirt",
    "phonetic": "/ˈtiː ʃɜːrt/",
    "definition": "A casual short-sleeved cotton shirt.",
    "definitionVn": "áo thun, áo phông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "I like wearing a comfortable cotton T-shirt.",
      "He bought a cool graphic T-shirt."
    ],
    "exampleTranslations": [
      "Tôi thích mặc áo thun cotton thoải mái.",
      "Anh ấy mua một chiếc áo phông in hình rất ngầu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_04",
    "word": "pants",
    "phonetic": "/pænts/",
    "definition": "A piece of clothing covering the body from the waist to the ankles.",
    "definitionVn": "quần dài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "He bought a pair of black dress pants.",
      "These pants fit me perfectly."
    ],
    "exampleTranslations": [
      "Anh ấy đã mua một chiếc quần tây đen.",
      "Chiếc quần này vừa vặn với tôi hoàn hảo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_05",
    "word": "jeans",
    "phonetic": "/dʒiːnz/",
    "definition": "Trousers made of denim or other sturdy cotton fabric.",
    "definitionVn": "quần bò, quần jeans",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Blue jeans are popular all over the world.",
      "I wear jeans and sneakers on weekends."
    ],
    "exampleTranslations": [
      "Quần jeans xanh được ưa chuộng khắp thế giới.",
      "Tôi mặc quần jeans và đi giày thể thao vào cuối tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_06",
    "word": "dress",
    "phonetic": "/dres/",
    "definition": "A one-piece garment for a woman or girl.",
    "definitionVn": "chiếc váy liền, đầm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "She wore a stunning red dress to the party.",
      "The summer floral dress looks lovely on her."
    ],
    "exampleTranslations": [
      "Cô ấy mặc chiếc đầm đỏ lộng lẫy đến bữa tiệc.",
      "Chiếc váy hoa mùa hè trông rất xinh xắn trên người cô ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_07",
    "word": "skirt",
    "phonetic": "/skɜːrt/",
    "definition": "A garment fastened around the waist and hanging down around the legs.",
    "definitionVn": "chân váy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Schoolgirls often wear pleated navy skirts.",
      "She paired her white blouse with a black skirt."
    ],
    "exampleTranslations": [
      "Các nữ sinh thường mặc chân váy xếp ly màu xanh đen.",
      "Cô ấy kết hợp áo sơ mi trắng với chân váy đen."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_08",
    "word": "jacket",
    "phonetic": "/ˈdʒækɪt/",
    "definition": "An outer garment extending either to the waist or the hips.",
    "definitionVn": "áo khoác nhẹ, áo jacket",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Zip up your jacket; it is chilly outside.",
      "He bought a stylish leather jacket."
    ],
    "exampleTranslations": [
      "Kéo khóa áo khoác lên nhé; bên ngoài trời lạnh đấy.",
      "Anh ấy đã mua một chiếc áo khoác da rất phong cách."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_09",
    "word": "coat",
    "phonetic": "/koʊt/",
    "definition": "An outer garment worn outdoors, having sleeves and typically extending below the hips.",
    "definitionVn": "áo khoác dáng dài, áo choàng ấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Put on your heavy winter coat before going out.",
      "She hung her warm coat on the rack."
    ],
    "exampleTranslations": [
      "Mặc áo khoác mùa đông dày vào trước khi ra ngoài nhé.",
      "Cô ấy treo chiếc áo khoác ấm lên móc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_10",
    "word": "sweater",
    "phonetic": "/ˈswetər/",
    "definition": "A knitted garment worn on the upper body.",
    "definitionVn": "áo len, áo ấm dệt kim",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Grandmother knit a soft wool sweater for me.",
      "This sweater keeps me warm and cozy."
    ],
    "exampleTranslations": [
      "Bà đã đan cho tôi một chiếc áo len mềm mại.",
      "Chiếc áo len này giữ cho tôi luôn ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_11",
    "word": "shoes",
    "phonetic": "/ʃuːz/",
    "definition": "A pair of footwear with a sturdy sole.",
    "definitionVn": "đôi giày, giày dép",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Please take off your shoes before entering.",
      "I bought a pair of running shoes."
    ],
    "exampleTranslations": [
      "Làm ơn cởi giày ra trước khi vào nhà.",
      "Tôi đã mua một đôi giày chạy bộ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_12",
    "word": "socks",
    "phonetic": "/sɑːks/",
    "definition": "A garment for the foot and lower part of the leg.",
    "definitionVn": "đôi tất, đôi vớ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Wear warm socks on cold winter nights.",
      "Put on clean white socks with your sneakers."
    ],
    "exampleTranslations": [
      "Đi tất ấm vào những đêm đông lạnh nhé.",
      "Hãy đi đôi tất trắng sạch với giày thể thao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_13",
    "word": "hat",
    "phonetic": "/hæt/",
    "definition": "A shaped covering for the head worn for warmth or sun protection.",
    "definitionVn": "chiếc mũ, chiếc nón",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Wear a wide-brim hat to protect your face from the sun.",
      "He took off his hat politely."
    ],
    "exampleTranslations": [
      "Hãy đội mũ rộng vành để che nắng cho khuôn mặt nhé.",
      "Anh ấy ngả mũ chào một cách lịch sự."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_14",
    "word": "cap",
    "phonetic": "/kæp/",
    "definition": "A small, soft, flat hat with a visor.",
    "definitionVn": "mũ lưỡi trai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "He wore a baseball cap backward.",
      "The red sports cap matches his outfit."
    ],
    "exampleTranslations": [
      "Cậu ấy đội chiếc mũ lưỡi trai ngược ra sau.",
      "Chiếc mũ thể thao đỏ rất hợp với trang phục của anh ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_15",
    "word": "glasses",
    "phonetic": "/ˈɡlæsɪz/",
    "definition": "A pair of lenses set in a frame worn on the face to aid sight.",
    "definitionVn": "chiếc kính mắt, mắt kính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "I need to wear my glasses to read small text.",
      "She put on her sunglasses on the beach."
    ],
    "exampleTranslations": [
      "Tôi cần đeo kính để đọc chữ nhỏ.",
      "Cô ấy đeo kính râm khi đi dạo trên bãi biển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_16",
    "word": "watch",
    "phonetic": "/wɑːtʃ/",
    "definition": "A small timepiece worn typically on a strap on one's wrist.",
    "definitionVn": "đồng hồ đeo tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "My father gave me a classic wristwatch on graduation.",
      "Check your watch; it is already noon."
    ],
    "exampleTranslations": [
      "Bố tặng tôi chiếc đồng hồ đeo tay cổ điển nhân dịp tốt nghiệp.",
      "Hãy xem đồng hồ đi; đã trưa rồi đấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_17",
    "word": "bag",
    "phonetic": "/bæɡ/",
    "definition": "A container made of flexible material with an opening at the top.",
    "definitionVn": "túi xách, chiếc túi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "She carries her laptop in a leather bag.",
      "Don't forget your shopping bag."
    ],
    "exampleTranslations": [
      "Cô ấy mang máy tính trong một chiếc túi da.",
      "Đừng quên mang túi mua sắm của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_18",
    "word": "backpack",
    "phonetic": "/ˈbækpæk/",
    "definition": "A bag with shoulder straps that allow it to be carried on one's back.",
    "definitionVn": "chiếc ba lô",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Students carry their books and lunch in backpacks.",
      "He packed his travel backpack for the weekend trip."
    ],
    "exampleTranslations": [
      "Học sinh mang sách và đồ ăn trưa trong ba lô.",
      "Anh ấy xếp đồ vào chiếc ba lô du lịch cho chuyến đi cuối tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_19",
    "word": "umbrella",
    "phonetic": "/ʌmˈbrelə/",
    "definition": "A device consisting of a circular canopy of cloth on a folding metal frame to protect against rain.",
    "definitionVn": "chiếc ô, chiếc dù che mưa nắng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Take an umbrella; the weather forecast predicts heavy rain.",
      "She opened her yellow umbrella."
    ],
    "exampleTranslations": [
      "Hãy mang theo ô nhé; dự báo thời tiết báo trời sẽ mưa to.",
      "Cô ấy mở chiếc ô màu vàng ra."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_20",
    "word": "wear",
    "phonetic": "/wer/",
    "definition": "Have on one's body as a garment or decoration.",
    "definitionVn": "mặc, đeo, đội, mang (quần áo, phụ kiện)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "You should wear a warm jacket today.",
      "She loves wearing bright and cheerful colors."
    ],
    "exampleTranslations": [
      "Hôm nay bạn nên mặc một chiếc áo khoác ấm nhé.",
      "Cô ấy thích mặc những gam màu tươi sáng và vui tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_clothe_21",
    "word": "cardigan",
    "phonetic": "/ˈkɑːrdɪɡən/",
    "definition": "A knitted woolen sweater with buttons down the front.",
    "definitionVn": "áo khoác len, áo cardigan cài cúc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "She wore a cozy knitted cardigan over her shirt.",
      "This soft cardigan pairs nicely with a skirt."
    ],
    "exampleTranslations": [
      "Cô ấy mặc một chiếc áo khoác len ấm áp bên ngoài áo sơ mi.",
      "Chiếc áo khoác len mềm mại này kết hợp rất đẹp với chân váy."
    ],
    "synonyms": [
      "button-up sweater",
      "knitwear"
    ],
    "antonyms": []
  },
  {
    "id": "bv_clothe_22",
    "word": "raincoat",
    "phonetic": "/ˈreɪnkoʊt/",
    "definition": "A waterproof or water-resistant coat worn to protect the body from rain.",
    "definitionVn": "áo mưa, áo khoác đi mưa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Remember to pack your yellow raincoat for the trip.",
      "A good raincoat keeps you dry in heavy rain."
    ],
    "exampleTranslations": [
      "Hãy nhớ mang theo chiếc áo mưa màu vàng cho chuyến đi nhé.",
      "Một chiếc áo mưa tốt giúp bạn luôn khô ráo dưới trời mưa to."
    ],
    "synonyms": [
      "waterproof jacket",
      "mackintosh",
      "trench coat"
    ],
    "antonyms": []
  },
  {
    "id": "bv_clothe_23",
    "word": "sneakers",
    "phonetic": "/ˈsniːkərz/",
    "definition": "Soft sports shoes with flexible rubber soles suitable for casual athletic wear.",
    "definitionVn": "giày thể thao, giày chạy bộ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "I wore comfortable white sneakers for our city walk.",
      "Clean running sneakers are great for morning exercise."
    ],
    "exampleTranslations": [
      "Tôi đã đi đôi giày thể thao màu trắng êm ái cho buổi đi dạo.",
      "Giày thể thao chạy bộ sạch sẽ rất tuyệt cho việc tập thể dục buổi sáng."
    ],
    "synonyms": [
      "trainers",
      "tennis shoes",
      "athletic shoes"
    ],
    "antonyms": [
      "high heels",
      "dress shoes"
    ]
  },
  {
    "id": "bv_clothe_24",
    "word": "sandals",
    "phonetic": "/ˈsændəlz/",
    "definition": "Light open shoes with straps attaching the sole to the foot, worn in warm weather.",
    "definitionVn": "dép quai hậu, dép xăng-đan",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Leather sandals are great for walking on the beach.",
      "She wore comfortable sandals on a warm summer day."
    ],
    "exampleTranslations": [
      "Dép quai hậu bằng da rất tuyệt để đi dạo trên bãi biển.",
      "Cô ấy đi đôi dép xăng-đan thoải mái vào ngày hè ấm áp."
    ],
    "synonyms": [
      "open-toe footwear",
      "flip-flops"
    ],
    "antonyms": [
      "winter boots"
    ]
  },
  {
    "id": "bv_clothe_25",
    "word": "scarf",
    "phonetic": "/skɑːrf/",
    "definition": "A length of fabric worn around the neck or head for warmth, sun protection, or fashion.",
    "definitionVn": "khăn quàng cổ, khăn choàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_clothes",
    "themeNameVn": "Trang phục cơ bản",
    "themeNameEn": "Clothing & Outfits",
    "examples": [
      "Wrap a warm woolen scarf around your neck today.",
      "She bought a red silk scarf for her mother."
    ],
    "exampleTranslations": [
      "Hãy quàng một chiếc khăn len ấm quanh cổ của bạn hôm nay nhé.",
      "Cô ấy đã mua một chiếc khăn quàng lụa màu đỏ tặng mẹ."
    ],
    "synonyms": [
      "muffler",
      "neck wrap",
      "shawl"
    ],
    "antonyms": []
  }
];

export const CHUDE_TRANG_PHUC_CO_BAN: VocabularyTopicPackage = {
  theme: THEME_TRANG_PHUC_CO_BAN,
  vocabs: VOCABS_TRANG_PHUC_CO_BAN,
};

export default CHUDE_TRANG_PHUC_CO_BAN;
