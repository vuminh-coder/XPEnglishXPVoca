import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 37: Gia vị & Hương vị (Spices, Herbs & Flavors)
 * Mã chủ đề: t_basic_spices_herbs
 * Tổng số từ vựng: 20 từ
 */
export const THEME_GIA_VI_HUONG_VI: BasicTheme = {
  "id": "t_basic_spices_herbs",
  "name": "Gia vị & Hương vị",
  "nameEn": "Spices, Herbs & Flavors",
  "icon": "🌶️",
  "difficulty": 1,
  "color": "#b91c1c",
  "description": "Hạt tiêu, ớt, gừng, tỏi, nước mắm, quế, mật ong và các vị cay đắng.",
  "totalVocabs": 20
};

export const VOCABS_GIA_VI_HUONG_VI: BasicVocabularyItem[] = [
  {
    "id": "bv_spices_01",
    "word": "spice",
    "phonetic": "/spaɪs/",
    "definition": "An aromatic or pungent vegetable substance used to flavor food, e.g. cloves, pepper, or cumin.",
    "definitionVn": "gia vị (nấu nướng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Spices enhance the natural aroma and flavor of dishes.",
      "Vietnam is a major exporter of world-class spices."
    ],
    "exampleTranslations": [
      "Gia vị làm tăng hương thơm và vị ngon tự nhiên của món ăn.",
      "Việt Nam là nước xuất khẩu các loại gia vị đẳng cấp hàng đầu thế giới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_02",
    "word": "pepper",
    "phonetic": "/ˈpepər/",
    "definition": "A pungent, hot-tasting powder prepared from dried and ground peppercorns.",
    "definitionVn": "hạt tiêu, tiêu xay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Phu Quoc black pepper has an intense and fragrant aroma.",
      "Sprinkle a pinch of black pepper over the hot soup."
    ],
    "exampleTranslations": [
      "Tiêu đen Phú Quốc có hương thơm nồng nàn và đậm đà.",
      "Rắc một chút tiêu đen lên bát súp nóng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_03",
    "word": "chili",
    "phonetic": "/ˈtʃɪli/",
    "definition": "A small hot-tasting pod of a variety of capsicum, used chopped, dried, or powdered in cooking.",
    "definitionVn": "quả ớt (vị cay nồng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Add sliced red chili to fish sauce for a spicy dip.",
      "Be careful not to touch your eyes after cutting fresh chili."
    ],
    "exampleTranslations": [
      "Thêm ớt đỏ thái lát vào nước mắm để làm nước chấm cay nhé.",
      "Cẩn thận đừng chạm vào mắt sau khi cắt ớt tươi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_04",
    "word": "ginger",
    "phonetic": "/ˈdʒɪndʒər/",
    "definition": "A hot, fragrant spice made from the rhizome of a plant, which may be chopped or powdered for cooking.",
    "definitionVn": "củ gừng (vị cay ấm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Warm ginger tea with honey is soothing for a sore throat.",
      "Slice fresh ginger into strips for steamed fish."
    ],
    "exampleTranslations": [
      "Trà gừng ấm với mật ong rất dịu họng khi bị đau họng.",
      "Thái gừng tươi thành sợi cho món cá hấp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_05",
    "word": "garlic",
    "phonetic": "/ˈɡɑːrlɪk/",
    "definition": "A strong-smelling pungent-tasting bulb, used as a flavoring in cookery.",
    "definitionVn": "củ tỏi (phi thơm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Ly Son purple garlic is prized for its exquisite flavor.",
      "Sauté crushed garlic in hot oil until golden brown."
    ],
    "exampleTranslations": [
      "Tỏi tía Lý Sơn được đánh giá cao nhờ hương vị tuyệt hảo.",
      "Phi tỏi đập dập trong dầu nóng cho đến khi vàng ươm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_06",
    "word": "herb",
    "phonetic": "/ɜːrb/",
    "definition": "Any plant with leaves, seeds, or flowers used for flavoring, food, medicine, or perfume.",
    "definitionVn": "rau thơm, thảo mộc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Fresh Vietnamese herbs elevate noodle dishes to perfection.",
      "Grow herbs like basil and mint on your windowsill."
    ],
    "exampleTranslations": [
      "Các loại rau thơm tươi của Việt Nam nâng tầm các món bún phở đến độ hoàn hảo.",
      "Trồng các loại thảo mộc như húng quế và bạc hà bên bậu cửa sổ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_07",
    "word": "mint",
    "phonetic": "/mɪnt/",
    "definition": "An aromatic plant with peppery leaves, used of culinary and medicinal purposes.",
    "definitionVn": "lá bạc hà, rau thơm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Fresh mint leaves give iced lemonade a cooling kick.",
      "Chew fresh mint for clean and refreshing breath."
    ],
    "exampleTranslations": [
      "Những lá bạc hà tươi mang lại vị the mát cho ly nước chanh đá.",
      "Nhai lá bạc hà tươi để có hơi thở thơm mát nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_08",
    "word": "basil",
    "phonetic": "/ˈbæzl/",
    "definition": "An aromatic annual herb of the mint family, native to tropical Asia.",
    "definitionVn": "rau húng quế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Tear fresh Thai basil leaves into your bowl of hot pho.",
      "Sweet basil pairs wonderfully with ripe red tomatoes."
    ],
    "exampleTranslations": [
      "Ngắt những lá húng quế tươi vào tô phở nóng của bạn nhé.",
      "Húng quế ngọt kết hợp tuyệt vời với cà chua đỏ chín."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_09",
    "word": "cinnamon",
    "phonetic": "/ˈsɪnəmən/",
    "definition": "An aromatic spice made from the peeled, dried, and rolled bark of a Southeast Asian tree.",
    "definitionVn": "vỏ quế, quế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Yen Bai cinnamon is world-famous for its sweet aromatic warmth.",
      "Add a cinnamon stick when simmering traditional pho broth."
    ],
    "exampleTranslations": [
      "Quế Yên Bái nổi tiếng thế giới nhờ hương thơm ấm áp ngọt ngào.",
      "Thêm một thanh quế khi ninh nước dùng phở truyền thống nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_10",
    "word": "soy sauce",
    "phonetic": "/ˈsɔɪ sɔːs/",
    "definition": "A dark, salty sauce made from fermented soybeans.",
    "definitionVn": "nước tương, xì dầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Dip vegetarian spring rolls in light soy sauce with chili.",
      "Soy sauce adds rich umami depth to stir-fried noodles."
    ],
    "exampleTranslations": [
      "Chấm chả giò chay vào nước tương nhạt có ớt nhé.",
      "Nước tương tăng thêm vị ngọt umami đậm đà cho món mì xào."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_11",
    "word": "fish sauce",
    "phonetic": "/fɪʃ sɔːs/",
    "definition": "A liquid condiment made from fish that have been coated in salt and fermented for months.",
    "definitionVn": "nước mắm truyền thống",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Traditional Phu Quoc fish sauce is the soul of Vietnamese cuisine.",
      "Balance fish sauce with lime, sugar, garlic, and chili for dipping sauce."
    ],
    "exampleTranslations": [
      "Nước mắm truyền thống Phú Quốc là linh hồn của ẩm thực Việt Nam.",
      "Pha nước mắm cùng chanh, đường, tỏi và ớt để làm nước chấm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_12",
    "word": "vinegar",
    "phonetic": "/ˈvɪnɪɡər/",
    "definition": "A sour-tasting liquid containing acetic acid, obtained by fermenting dilute alcoholic liquids.",
    "definitionVn": "giấm ăn (vị chua thanh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Garlic vinegar is a classic table condiment at pho restaurants.",
      "Mix olive oil and wine vinegar for a healthy salad dressing."
    ],
    "exampleTranslations": [
      "Giấm tỏi là gia vị để bàn kinh điển tại các quán phở.",
      "Trộn dầu ô liu và giấm rượu để làm sốt salad lành mạnh nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_13",
    "word": "oil",
    "phonetic": "/ɔɪl/",
    "definition": "A viscous liquid derived from petroleum or plants, used as fuel, lubricant, or in cooking.",
    "definitionVn": "dầu ăn, dầu thực vật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Use heart-healthy cooking oil like olive or sunflower oil.",
      "Heat a spoonful of vegetable oil in the skillet."
    ],
    "exampleTranslations": [
      "Sử dụng dầu ăn tốt cho tim mạch như dầu ô liu hoặc dầu hướng dương.",
      "Làm nóng một thìa dầu thực vật trong chảo nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_14",
    "word": "honey",
    "phonetic": "/ˈhʌni/",
    "definition": "A sweet, sticky yellowish-brown fluid made by honeybees from flower nectar.",
    "definitionVn": "mật ong nguyên chất",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Pure forest honey is a healthy natural sweetener.",
      "Drink warm water with honey and lemon every morning."
    ],
    "exampleTranslations": [
      "Mật ong rừng nguyên chất là chất làm ngọt tự nhiên rất tốt cho sức khỏe.",
      "Uống nước ấm pha mật ong và chanh mỗi sáng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_15",
    "word": "mustard",
    "phonetic": "/ˈmʌstərd/",
    "definition": "A pungent paste prepared from the ground seeds of a mustard plant, eaten with meat.",
    "definitionVn": "mù tạt (gia vị cay nồng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Yellow mustard gives hotdogs and sandwiches a tangy kick.",
      "Mix a little spicy mustard with soy sauce for grilled seafood."
    ],
    "exampleTranslations": [
      "Mù tạt vàng mang lại hương vị chua cay cho xúc xích và bánh mì kẹp.",
      "Trộn một chút mù tạt cay với nước tương để chấm hải sản nướng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_16",
    "word": "curry",
    "phonetic": "/ˈkɜːri/",
    "definition": "A dish of meat, vegetables, etc., cooked in an Indian-style sauce of strong spices.",
    "definitionVn": "món cà ri, bột cà ri",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Fragrant chicken curry with coconut milk is delicious with bread.",
      "Curry powder contains turmeric, cumin, and coriander."
    ],
    "exampleTranslations": [
      "Cà ri gà thơm lừng nấu nước cốt dừa ăn kèm bánh mì rất ngon.",
      "Bột cà ri gồm có nghệ, thì là và rau mùi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_17",
    "word": "flavor",
    "phonetic": "/ˈfleɪvər/",
    "definition": "The distinctive taste of a food or drink.",
    "definitionVn": "hương vị, mùi vị",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Fresh herbs give the soup a vibrant and natural flavor.",
      "What is your favorite ice cream flavor? — Vanilla!"
    ],
    "exampleTranslations": [
      "Các loại rau thơm tươi mang lại cho món súp một hương vị thơm ngon tự nhiên.",
      "Hương vị kem yêu thích của bạn là gì? — Vani!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_18",
    "word": "spicy",
    "phonetic": "/ˈspaɪsi/",
    "definition": "Flavored with or fragrant with spice; hot-tasting.",
    "definitionVn": "cay nồng, có vị cay",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Hue beef noodle soup is famously spicy and rich.",
      "Tell the waiter if you cannot eat spicy food."
    ],
    "exampleTranslations": [
      "Bún bò Huế nổi tiếng cay nồng và đậm đà.",
      "Hãy báo với người phục vụ nếu bạn không ăn được cay nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_19",
    "word": "bitter",
    "phonetic": "/ˈbɪtər/",
    "definition": "Having a sharp, pungent taste or smell; not sweet.",
    "definitionVn": "đắng, có vị đắng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Dark chocolate has a rich and slightly bitter taste.",
      "Bitter melon soup with minced pork is nutritious and cooling."
    ],
    "exampleTranslations": [
      "Sô cô la đen có vị đậm đà và hơi đắng nhẹ.",
      "Canh mướp đắng nhồi thịt băm rất bổ dưỡng và thanh nhiệt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_spices_20",
    "word": "sweet",
    "phonetic": "/swiːt/",
    "definition": "Having the pleasant taste characteristic of sugar or honey; not salty or bitter.",
    "definitionVn": "ngọt ngào, có vị ngọt",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_spices_herbs",
    "themeNameVn": "Gia vị & Hương vị",
    "themeNameEn": "Spices, Herbs & Flavors",
    "examples": [
      "Ripe fruits are naturally sweet and refreshing.",
      "Add a little honey if you like it sweeter."
    ],
    "exampleTranslations": [
      "Hoa quả chín có vị ngọt tự nhiên và thanh mát.",
      "Thêm một chút mật ong nếu bạn thích ngọt hơn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_GIA_VI_HUONG_VI: VocabularyTopicPackage = {
  theme: THEME_GIA_VI_HUONG_VI,
  vocabs: VOCABS_GIA_VI_HUONG_VI,
};

export default CHUDE_GIA_VI_HUONG_VI;
