import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 56: Ẩm thực đường phố (Street Food & Snacks)
 * Mã chủ đề: t_basic_street_food_snacks
 * Tổng số từ vựng: 20 từ
 */
export const THEME_AM_THUC_DUONG_PHO: BasicTheme = {
  "id": "t_basic_street_food_snacks",
  "name": "Ẩm thực đường phố",
  "nameEn": "Street Food & Snacks",
  "icon": "🍢",
  "difficulty": 1,
  "color": "#ea580c",
  "description": "Món ăn vặt vỉa hè, nem rán, phở, bánh mì, bánh xèo, bắp rang, xiên nướng.",
  "totalVocabs": 20
};

export const VOCABS_AM_THUC_DUONG_PHO: BasicVocabularyItem[] = [
  {
    "id": "bv_street_01",
    "word": "street food",
    "phonetic": "/striːt fuːd/",
    "definition": "Ready-to-eat food or drink sold by a hawker or vendor in a street or other public place.",
    "definitionVn": "ẩm thực đường phố, món ăn vỉa hè",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Vietnamese street food is celebrated worldwide for fresh herbs and rich flavors.",
      "Explore the night street food market in Hanoi Old Quarter."
    ],
    "exampleTranslations": [
      "Ẩm thực đường phố Việt Nam được ca ngợi khắp thế giới nhờ rau thơm tươi và hương vị đậm đà.",
      "Khám phá khu chợ đêm ẩm thực đường phố ở Phố Cổ Hà Nội nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_02",
    "word": "snack",
    "phonetic": "/snæk/",
    "definition": "A small amount of food eaten between meals.",
    "definitionVn": "món ăn nhẹ, đồ ăn vặt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Fresh fruit slices are healthy afternoon snacks.",
      "Grab a light snack before starting your evening study session."
    ],
    "exampleTranslations": [
      "Những lát trái cây tươi là món ăn vặt buổi chiều lành mạnh.",
      "Kiếm một món ăn nhẹ trước khi bắt đầu buổi học tối nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_03",
    "word": "spring roll",
    "phonetic": "/sprɪŋ roʊl/",
    "definition": "An Asian snack consisting of pastry filled with minced vegetables and meat, rolled and fried or served fresh.",
    "definitionVn": "nem rán, chả giò, gỏi cuốn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Crispy fried spring rolls dipped in sweet-and-sour fish sauce are irresistible.",
      "Fresh summer spring rolls are light and healthy."
    ],
    "exampleTranslations": [
      "Nem rán giòn rụm chấm nước mắm chua ngọt ngon không cưỡng lại được.",
      "Gỏi cuốn tôm thịt thanh mát và tốt cho sức khỏe."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_04",
    "word": "pho",
    "phonetic": "/fɜːr/",
    "definition": "A Vietnamese soup consisting of broth, rice noodles, herbs, and meat (usually beef or chicken).",
    "definitionVn": "món phở truyền thống",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "A steaming hot bowl of beef pho is the quintessential Vietnamese breakfast.",
      "Squeeze fresh lime and add herbs to your pho."
    ],
    "exampleTranslations": [
      "Tô phở bò nóng hổi bốc khói là bữa ăn sáng tinh túy của người Việt.",
      "Vắt chanh tươi và thêm rau thơm vào bát phở nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_05",
    "word": "banh mi",
    "phonetic": "/ˈbɑːn miː/",
    "definition": "A Vietnamese baguette sandwich filled with pork, pâté, pickled vegetables, cilantro, and chili.",
    "definitionVn": "bánh mì kẹp Việt Nam",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Crisp Vietnamese banh mi is world-famous as the ultimate sandwich.",
      "Buy a hot banh mi with egg and pate from the street cart."
    ],
    "exampleTranslations": [
      "Bánh mì Việt Nam giòn rụm nổi tiếng khắp thế giới như món bánh kẹp đỉnh cao.",
      "Mua một chiếc bánh mì trứng pa-tê nóng giòn từ xe đẩy vỉa hè nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_06",
    "word": "pancake",
    "phonetic": "/ˈpænkeɪk/",
    "definition": "A thin crispy savory crepe such as Vietnamese Banh Xeo.",
    "definitionVn": "bánh xèo giòn rụm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Crispy Vietnamese sizzling pancakes (Banh Xeo) are stuffed with shrimp, pork, and bean sprouts.",
      "Wrap banh xeo in mustard leaves and dip in sauce."
    ],
    "exampleTranslations": [
      "Bánh xèo giòn rụm của Việt Nam được nhân đầy tôm, thịt và giá đỗ.",
      "Cuốn bánh xèo trong lá cải cay và chấm nước mắm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_07",
    "word": "popcorn",
    "phonetic": "/ˈpɑːpkɔːrn/",
    "definition": "Corn kernels that pop open and puff up when heated, eaten as a snack with butter or caramel.",
    "definitionVn": "bắp rang bơ, bỏng ngô",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "A large bucket of sweet butter popcorn is a must-have at the cinema.",
      "Freshly popped popcorn smells buttery and delicious."
    ],
    "exampleTranslations": [
      "Một hộp bắp rang bơ ngọt lớn là món không thể thiếu ở rạp chiếu phim.",
      "Bắp rang bơ mới nổ có mùi thơm bơ béo ngậy rất ngon."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_08",
    "word": "chips",
    "phonetic": "/tʃɪps/",
    "definition": "Crispy slices of potato that have been deep-fried or baked until crunchy.",
    "definitionVn": "khoai tây chiên giòn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Crispy potato chips seasoned with sea salt are crunchy snacks.",
      "Enjoy chips and guacamole with friends."
    ],
    "exampleTranslations": [
      "Khoai tây chiên giòn rụm rắc muối biển là món ăn nhẹ giòn tan.",
      "Thưởng thức khoai tây chiên và sốt quả bơ cùng bạn bè nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_09",
    "word": "nuts",
    "phonetic": "/nʌts/",
    "definition": "Hard-shelled seeds of certain plants, typically edible and rich in healthy fats and proteins.",
    "definitionVn": "các loại hạt (hạnh nhân, óc chó, điều)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Roasted cashew nuts from Binh Phuoc are crunchy and buttery.",
      "Eating a handful of mixed nuts daily is heart-healthy."
    ],
    "exampleTranslations": [
      "Hạt điều rang Bình Phước rất giòn và béo bùi.",
      "Ăn một nắm các loại hạt hỗn hợp mỗi ngày rất tốt cho tim mạch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_10",
    "word": "peanut",
    "phonetic": "/ˈpiːnʌt/",
    "definition": "The edible seed of a South American plant, which ripens underground in a pod.",
    "definitionVn": "hạt đậu phộng, hạt lạc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Boiled peanuts and roasted salted peanuts are classic roadside snacks.",
      "Sprinkle crushed roasted peanuts over sweet desserts."
    ],
    "exampleTranslations": [
      "Đậu phộng luộc và lạc rang muối là những món ăn vặt vỉa hè kinh điển.",
      "Rắc đậu phộng rang giã nhỏ lên các món chè ngọt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_11",
    "word": "corn",
    "phonetic": "/kɔːrn/",
    "definition": "A North American cereal plant that yields large grains, or kernels, set in rows on a cob.",
    "definitionVn": "bắp ngô, ngô nướng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Sweet grilled corn brushed with scallion oil is an addictive street snack.",
      "Steamed sweet corn is fragrant and nutritious."
    ],
    "exampleTranslations": [
      "Bắp ngô nướng quết mỡ hành là món ăn vặt đường phố gây nghiện.",
      "Bắp ngô ngọt hấp thơm lừng và bổ dưỡng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_12",
    "word": "sausage",
    "phonetic": "/ˈsɔːsɪdʒ/",
    "definition": "An item of food in the form of a cylindrical length of minced meat encased in a skin.",
    "definitionVn": "xúc xích, lạp xưởng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Grilled skewers of sausages smell mouthwatering at the night market.",
      "Kids enjoy fried sausages with ketchup."
    ],
    "exampleTranslations": [
      "Những xiên xúc xích nướng thơm nức mũi tại khu chợ đêm.",
      "Trẻ con rất thích xúc xích chiên chấm sốt cà chua."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_13",
    "word": "skewers",
    "phonetic": "/ˈskjuːərz/",
    "definition": "A long piece of wood or metal used for holding pieces of food together during grilling.",
    "definitionVn": "xiên que nướng, thịt xiên nướng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Charcoal-grilled pork skewers seasoned with lemongrass are incredibly savory.",
      "Street vendors grill chicken skewers over hot coals."
    ],
    "exampleTranslations": [
      "Thịt lợn xiên que nướng than hoa tẩm ướp sả thơm ngon đậm đà.",
      "Những người bán hàng rong nướng xiên gà trên than hồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_14",
    "word": "dumpling",
    "phonetic": "/ˈdʌmplɪŋ/",
    "definition": "A small savory ball of dough, typically steamed or fried with meat filling.",
    "definitionVn": "há cảo, sủi cảo, bánh bao nhỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Steamed shrimp dumplings in bamboo baskets are delicate and juicy.",
      "Dip fried pork dumplings in chili soy sauce."
    ],
    "exampleTranslations": [
      "Há cảo tôm hấp trong xửng tre vừa mềm vừa mọng nước.",
      "Chấm sủi cảo thịt heo chiên vào nước tương ớt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_15",
    "word": "sauce",
    "phonetic": "/sɔːs/",
    "definition": "A liquid or semi-liquid substance served with food to add moistness and flavor.",
    "definitionVn": "nước sốt, nước chấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Sweet chili sauce and garlic mayonnaise are delicious dipping sauces.",
      "Pour savory gravy sauce over the grilled meat."
    ],
    "exampleTranslations": [
      "Nước sốt ớt ngọt và xốt mayonnaise tỏi là những loại nước chấm rất ngon.",
      "Rưới nước sốt đậm đà lên món thịt nướng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_16",
    "word": "chili",
    "phonetic": "/ˈtʃɪli/",
    "definition": "A small hot-tasting pod used to add heat to food.",
    "definitionVn": "ớt cay, sa tế ớt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Add a spoonful of roasted chili oil to your spicy soup.",
      "Fresh red chili peppers give a fiery punch to dishes."
    ],
    "exampleTranslations": [
      "Thêm một thìa ớt sa tế vào tô súp cay của bạn nhé.",
      "Những quả ớt đỏ tươi mang lại vị cay nồng bùng nổ cho món ăn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_17",
    "word": "tasty",
    "phonetic": "/ˈteɪsti/",
    "definition": "Having a pleasant, distinct flavor; delicious.",
    "definitionVn": "ngon miệng, đậm đà",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "This roadside noodle soup is exceptionally tasty and cheap.",
      "Try these tasty handmade rice crackers."
    ],
    "exampleTranslations": [
      "Bát bún vỉa hè này đặc biệt thơm ngon và giá lại rất rẻ.",
      "Hãy nếm thử những chiếc bánh gạo thủ công thơm ngon này nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_18",
    "word": "crispy",
    "phonetic": "/ˈkrɪspi/",
    "definition": "Pleasantly thin, dry, and easily broken; crunchy.",
    "definitionVn": "giòn tan, giòn rụm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "The golden banh mi crust is delightfully crispy on the outside.",
      "Enjoy crispy fried chicken fresh out of the fryer."
    ],
    "exampleTranslations": [
      "Vỏ bánh mì vàng ươm giòn rụm thích thú ở bên ngoài.",
      "Thưởng thức gà rán giòn tan vừa mới vớt ra khỏi chảo nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_19",
    "word": "vendor",
    "phonetic": "/ˈvendər/",
    "definition": "A person or company offering something for sale, especially a trader in the street.",
    "definitionVn": "người bán hàng rong, tiểu thương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "Street food vendors wake up early to prepare fresh ingredients.",
      "The friendly fruit vendor offered a sweet sample."
    ],
    "exampleTranslations": [
      "Những người bán hàng ăn đường phố dậy từ sớm để chuẩn bị nguyên liệu tươi ngon.",
      "Người bán hoa quả thân thiện đã mời ăn thử một miếng ngọt lịm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_street_20",
    "word": "stall",
    "phonetic": "/stɔːl/",
    "definition": "A stand, booth, or compartment for the sale of goods in a market.",
    "definitionVn": "quầy hàng, sạp hàng ăn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_street_food_snacks",
    "themeNameVn": "Ẩm thực đường phố",
    "themeNameEn": "Street Food & Snacks",
    "examples": [
      "We sat on little plastic stools around the busy street food stall.",
      "The noodle stall has served customers for over thirty years."
    ],
    "exampleTranslations": [
      "Chúng tôi ngồi trên những chiếc ghế nhựa nhỏ quanh quầy ăn vỉa hè đông đúc.",
      "Sạp bún phở đã phục vụ thực khách hơn ba mươi năm qua."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_AM_THUC_DUONG_PHO: VocabularyTopicPackage = {
  theme: THEME_AM_THUC_DUONG_PHO,
  vocabs: VOCABS_AM_THUC_DUONG_PHO,
};

export default CHUDE_AM_THUC_DUONG_PHO;
