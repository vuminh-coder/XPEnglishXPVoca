import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 8: Ăn uống & Thực phẩm (Food & Beverages)
 * Mã chủ đề: t_basic_food_drinks
 * Tổng số từ vựng: 23 từ
 */
export const THEME_AN_UONG_THUC_PHAM: BasicTheme = {
  "id": "t_basic_food_drinks",
  "name": "Ăn uống & Thực phẩm",
  "nameEn": "Food & Beverages",
  "icon": "🍎",
  "difficulty": 1,
  "color": "#ef4444",
  "description": "Thức ăn, đồ uống, trái cây và các bữa ăn quen thuộc.",
  "totalVocabs": 23
};

export const VOCABS_AN_UONG_THUC_PHAM: BasicVocabularyItem[] = [
  {
    "id": "bv_food_d_01",
    "word": "food",
    "phonetic": "/fuːd/",
    "definition": "Any nutritious substance that people eat or drink.",
    "definitionVn": "thức ăn, thực phẩm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Vietnamese food is delicious and healthy.",
      "We shared fresh food with neighbors."
    ],
    "exampleTranslations": [
      "Món ăn Việt Nam rất ngon và bổ dưỡng.",
      "Chúng tôi chia sẻ thức ăn tươi với hàng xóm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_02",
    "word": "drink",
    "phonetic": "/drɪŋk/",
    "definition": "A liquid that can be swallowed as a refreshment.",
    "definitionVn": "đồ uống, thức uống",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Would you like a cold drink?",
      "Water is the healthiest drink."
    ],
    "exampleTranslations": [
      "Bạn có muốn dùng đồ uống lạnh không?",
      "Nước lọc là thức uống lành mạnh nhất."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_03",
    "word": "water",
    "phonetic": "/ˈwɔːtər/",
    "definition": "Clear liquid essential for plant and animal life.",
    "definitionVn": "nước (nước uống)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Drink enough water every day.",
      "A glass of water, please!"
    ],
    "exampleTranslations": [
      "Uống đủ nước mỗi ngày nhé.",
      "Làm ơn cho tôi một ly nước!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_04",
    "word": "rice",
    "phonetic": "/raɪs/",
    "definition": "Grains eaten cooked as a staple food.",
    "definitionVn": "cơm, gạo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Rice is the staple food in Vietnam.",
      "We had steamed rice with fish."
    ],
    "exampleTranslations": [
      "Cơm là lương thực chính ở Việt Nam.",
      "Chúng tôi ăn cơm trắng với cá."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_05",
    "word": "bread",
    "phonetic": "/bred/",
    "definition": "Food made of flour, water, and yeast baked.",
    "definitionVn": "bánh mì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "I had toasted bread with butter for breakfast.",
      "Fresh bread smells great."
    ],
    "exampleTranslations": [
      "Tôi ăn bánh mì nướng bơ cho bữa sáng.",
      "Bánh mì mới nướng thơm lừng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_06",
    "word": "noodle",
    "phonetic": "/ˈnuːdl/",
    "definition": "A strip, ring, or tube of pasta or egg dough.",
    "definitionVn": "mì, bún, phở",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Pho is the most famous Vietnamese noodle soup.",
      "I love spicy beef noodles."
    ],
    "exampleTranslations": [
      "Phở là món súp mì nổi tiếng nhất của Việt Nam.",
      "Tôi thích món bún bò cay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_07",
    "word": "meat",
    "phonetic": "/miːt/",
    "definition": "The flesh of an animal as food.",
    "definitionVn": "thịt (nói chung)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "He grilled some meat for dinner.",
      "Fresh meat is available at the market."
    ],
    "exampleTranslations": [
      "Anh ấy nướng thịt cho bữa tối.",
      "Thịt tươi có sẵn ở chợ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_08",
    "word": "beef",
    "phonetic": "/biːf/",
    "definition": "The culinary name for meat from cattle.",
    "definitionVn": "thịt bò",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "We ordered beef noodle soup for breakfast.",
      "Grilled beef with lemongrass is delicious."
    ],
    "exampleTranslations": [
      "Chúng tôi gọi phở bò cho bữa sáng.",
      "Bò nướng sả rất ngon miệng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_09",
    "word": "pork",
    "phonetic": "/pɔːrk/",
    "definition": "The culinary name for the meat of a domestic pig.",
    "definitionVn": "thịt lợn, thịt heo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Caramelized pork is a classic Vietnamese dish.",
      "She bought fresh pork at the butchery."
    ],
    "exampleTranslations": [
      "Thịt kho tàu là món ăn kinh điển của Việt Nam.",
      "Cô ấy mua thịt heo tươi ở quầy thịt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_10",
    "word": "chicken",
    "phonetic": "/ˈtʃɪkɪn/",
    "definition": "Domestic fowl or its meat used as food.",
    "definitionVn": "con gà, thịt gà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "We had roasted chicken and salad.",
      "Fried chicken is popular with kids."
    ],
    "exampleTranslations": [
      "Chúng tôi ăn gà quay và rau trộn.",
      "Gà rán rất được trẻ em yêu thích."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_11",
    "word": "fish",
    "phonetic": "/fɪʃ/",
    "definition": "Aquatic animal eaten as seafood.",
    "definitionVn": "con cá, món cá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Eating fish is good for your brain.",
      "Steamed fish with ginger is tasty."
    ],
    "exampleTranslations": [
      "Ăn cá rất tốt cho trí não.",
      "Cá hấp gừng rất thơm ngon."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_12",
    "word": "egg",
    "phonetic": "/eɡ/",
    "definition": "An oval body produced by birds, eaten as food.",
    "definitionVn": "quả trứng (gà, vịt)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "I like fried eggs for breakfast.",
      "We need two eggs for this recipe."
    ],
    "exampleTranslations": [
      "Tôi thích trứng ốp la cho bữa sáng.",
      "Chúng ta cần hai quả trứng cho công thức này."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_13",
    "word": "milk",
    "phonetic": "/mɪlk/",
    "definition": "White liquid produced by mammals.",
    "definitionVn": "sữa tươi, sữa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Drink a glass of milk every morning.",
      "Do you want milk in your coffee?"
    ],
    "exampleTranslations": [
      "Uống một ly sữa mỗi sáng nhé.",
      "Bạn có muốn thêm sữa vào cà phê không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_14",
    "word": "tea",
    "phonetic": "/tiː/",
    "definition": "A hot drink made by infusing dried crushed leaves.",
    "definitionVn": "trà, chè",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "A cup of green tea calms your mind.",
      "Would you like some iced tea?"
    ],
    "exampleTranslations": [
      "Một tách trà xanh giúp tâm trí thư thái.",
      "Bạn có muốn dùng chút trà đá không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_15",
    "word": "coffee",
    "phonetic": "/ˈkɔːfi/",
    "definition": "A hot or cold drink made from roasted coffee beans.",
    "definitionVn": "cà phê",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Vietnamese iced coffee is world famous.",
      "Let's grab a cup of coffee!"
    ],
    "exampleTranslations": [
      "Cà phê sữa đá Việt Nam nổi tiếng khắp nơi.",
      "Cùng đi uống cà phê nhé!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_16",
    "word": "sugar",
    "phonetic": "/ˈʃʊɡər/",
    "definition": "A sweet crystalline substance obtained from sugar cane.",
    "definitionVn": "đường ăn, đường ngọt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Do you take sugar in your tea?",
      "Limit sugar to protect your teeth."
    ],
    "exampleTranslations": [
      "Bạn có thêm đường vào trà không?",
      "Hạn chế ăn đường để bảo vệ răng miệng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_17",
    "word": "salt",
    "phonetic": "/sɔːlt/",
    "definition": "A white crystalline substance that gives seawater its characteristic taste.",
    "definitionVn": "muối ăn, gia vị mặn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Add a pinch of salt to the soup.",
      "Pass the salt shaker, please."
    ],
    "exampleTranslations": [
      "Thêm một chút muối vào canh nhé.",
      "Làm ơn chuyền lọ muối giúp tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_18",
    "word": "apple",
    "phonetic": "/ˈæpl/",
    "definition": "Round fruit with red or green skin and crisp flesh.",
    "definitionVn": "quả táo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "An apple a day keeps the doctor away.",
      "She ate a crunchy red apple."
    ],
    "exampleTranslations": [
      "Mỗi ngày một quả táo giúp bạn luôn khỏe mạnh.",
      "Cô ấy ăn một quả táo đỏ giòn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_19",
    "word": "banana",
    "phonetic": "/bəˈnænə/",
    "definition": "A long curved fruit which grows in clusters.",
    "definitionVn": "quả chuối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Bananas are rich in potassium and energy.",
      "He eats a ripe banana after his workout."
    ],
    "exampleTranslations": [
      "Chuối rất giàu kali và năng lượng.",
      "Anh ấy ăn một quả chuối chín sau khi tập luyện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_20",
    "word": "orange",
    "phonetic": "/ˈɔːrɪndʒ/",
    "definition": "A round juicy citrus fruit with a tough bright reddish-yellow rind.",
    "definitionVn": "quả cam",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Fresh orange juice is rich in Vitamin C.",
      "She squeezed two oranges for breakfast."
    ],
    "exampleTranslations": [
      "Nước cam tươi rất giàu Vitamin C.",
      "Cô ấy vắt hai quả cam cho bữa sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_21",
    "word": "breakfast",
    "phonetic": "/ˈbrekfəst/",
    "definition": "The first meal of the day, usually eaten in the morning.",
    "definitionVn": "bữa ăn sáng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Never skip breakfast before going to school.",
      "What did you eat for breakfast today?"
    ],
    "exampleTranslations": [
      "Đừng bao giờ bỏ bữa sáng trước khi đến trường.",
      "Hôm nay bạn đã ăn gì cho bữa sáng?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_22",
    "word": "lunch",
    "phonetic": "/lʌntʃ/",
    "definition": "A meal eaten in the middle of the day.",
    "definitionVn": "bữa ăn trưa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Let's have lunch together at the cafeteria.",
      "I brought a lunchbox from home."
    ],
    "exampleTranslations": [
      "Cùng nhau ăn trưa tại căng tin nhé.",
      "Tôi đã mang theo hộp cơm trưa từ nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_food_d_23",
    "word": "dinner",
    "phonetic": "/ˈdɪnər/",
    "definition": "The main meal of the day, taken either around midday or in the evening.",
    "definitionVn": "bữa ăn tối, cơm tối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_food_drinks",
    "themeNameVn": "Ăn uống & Thực phẩm",
    "themeNameEn": "Food & Beverages",
    "examples": [
      "Our family gathers for dinner at 7:00 PM.",
      "What is cooking for dinner tonight?"
    ],
    "exampleTranslations": [
      "Gia đình chúng tôi quây quần ăn tối lúc 7h.",
      "Tối nay có món gì ngon cho bữa tối thế?"
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_AN_UONG_THUC_PHAM: VocabularyTopicPackage = {
  theme: THEME_AN_UONG_THUC_PHAM,
  vocabs: VOCABS_AN_UONG_THUC_PHAM,
};

export default CHUDE_AN_UONG_THUC_PHAM;
