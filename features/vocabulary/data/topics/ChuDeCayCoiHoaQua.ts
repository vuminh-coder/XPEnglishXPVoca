import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 21: Cây cối & Hoa quả (Plants & Fruits)
 * Mã chủ đề: t_basic_plants_fruits
 * Tổng số từ vựng: 25 từ
 */
export const THEME_CAY_COI_HOA_QUA: BasicTheme = {
  "id": "t_basic_plants_fruits",
  "name": "Cây cối & Hoa quả",
  "nameEn": "Plants & Fruits",
  "icon": "🌿",
  "difficulty": 1,
  "color": "#65a30d",
  "description": "Các loại cây, lá, rễ, hoa quả nhiệt đới và nông sản quen thuộc.",
  "totalVocabs": 25
};

export const VOCABS_CAY_COI_HOA_QUA: BasicVocabularyItem[] = [
  {
    "id": "bv_plants_01",
    "word": "plant",
    "phonetic": "/plænt/",
    "definition": "A living organism of the kind exemplified by trees, shrubs, herbs, grasses, and ferns.",
    "definitionVn": "cây cối, thực vật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Water indoor plants once a week.",
      "Plants absorb carbon dioxide and release oxygen."
    ],
    "exampleTranslations": [
      "Tưới cây trong nhà mỗi tuần một lần nhé.",
      "Thực vật hấp thụ khí cacbonic và thải ra khí oxy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_02",
    "word": "leaf",
    "phonetic": "/liːf/",
    "definition": "A flattened structure of a higher plant, typically green and blade-like (plural: leaves).",
    "definitionVn": "chiếc lá, lá cây (số nhiều: leaves)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Golden leaves fall from trees in autumn.",
      "Tea is made from dried green leaves."
    ],
    "exampleTranslations": [
      "Những chiếc lá vàng rơi rụng khỏi cành cây vào mùa thu.",
      "Trà được làm từ những chiếc lá xanh phơi khô."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_03",
    "word": "root",
    "phonetic": "/ruːt/",
    "definition": "The part of a plant which attaches it to the ground, conveying water and nourishment.",
    "definitionVn": "rễ cây, cội rễ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Deep roots help large trees stand strong in storms.",
      "Carrots are nutritious edible roots."
    ],
    "exampleTranslations": [
      "Rễ sâu giúp cây to đứng vững vàng trong bão gió.",
      "Cà rốt là loại rễ củ ăn được rất bổ dưỡng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_04",
    "word": "seed",
    "phonetic": "/siːd/",
    "definition": "The unit of reproduction of a flowering plant, capable of developing into another plant.",
    "definitionVn": "hạt giống, hạt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Plant the sunflower seed in fertile soil.",
      "Chia seeds and sunflower seeds are healthy snacks."
    ],
    "exampleTranslations": [
      "Hãy gieo hạt hoa hướng dương vào đất màu mỡ nhé.",
      "Hạt chia và hạt hướng dương là những món ăn nhẹ lành mạnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_05",
    "word": "mango",
    "phonetic": "/ˈmæŋɡoʊ/",
    "definition": "A fleshy oval yellowish-red tropical fruit that is eaten ripe or used green in pickles.",
    "definitionVn": "quả xoài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Sweet ripe mango is delicious in summer desserts.",
      "Green mango with chili salt is a favorite snack in Vietnam."
    ],
    "exampleTranslations": [
      "Xoài chín ngọt rất thơm ngon trong các món tráng miệng mùa hè.",
      "Xoài xanh chấm muối ớt là món ăn vặt được yêu thích ở Việt Nam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_06",
    "word": "lemon",
    "phonetic": "/ˈlemən/",
    "definition": "A yellow oval citrus fruit with thick skin and fragrant, sour juice.",
    "definitionVn": "quả chanh vàng (vị chua)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Add a slice of fresh lemon to your warm honey tea.",
      "Lemon juice contains high levels of Vitamin C."
    ],
    "exampleTranslations": [
      "Thêm một lát chanh tươi vào tách trà mật ong ấm nhé.",
      "Nước cốt chanh chứa hàm lượng Vitamin C cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_07",
    "word": "lime",
    "phonetic": "/laɪm/",
    "definition": "A rounded citrus fruit similar to a lemon but smaller, greener, and more acid.",
    "definitionVn": "quả chanh xanh (chanh ta)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Squeeze fresh lime over your bowl of hot pho.",
      "Lime juice gives a refreshing tangy kick."
    ],
    "exampleTranslations": [
      "Vắt chanh xanh tươi vào tô phở nóng hổi nhé.",
      "Nước chanh xanh mang lại vị chua thanh sảng khoái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_08",
    "word": "grape",
    "phonetic": "/ɡreɪp/",
    "definition": "A berry growing in clusters on a grapevine, eaten raw or used for making wine.",
    "definitionVn": "quả nho, chùm nho",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Sweet seedless green grapes are crisp and delicious.",
      "Ninh Thuan is famous for its lush grape vineyards."
    ],
    "exampleTranslations": [
      "Những quả nho xanh ngọt không hạt rất giòn và ngon.",
      "Ninh Thuận nổi tiếng với những vườn nho trĩu quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_09",
    "word": "strawberry",
    "phonetic": "/ˈstrɔːberi/",
    "definition": "A sweet soft red fruit with a seed-studded surface.",
    "definitionVn": "quả dâu tây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Da Lat is famous for fresh and fragrant red strawberries.",
      "She topped her yogurt with sliced strawberries."
    ],
    "exampleTranslations": [
      "Đà Lạt nổi tiếng với những quả dâu tây đỏ tươi thơm lừng.",
      "Cô ấy rắc dâu tây cắt lát lên sữa chua."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_10",
    "word": "watermelon",
    "phonetic": "/ˈwɔːtərmelən/",
    "definition": "The large fruit of a plant of the gourd family, with smooth green skin and juicy red pulp.",
    "definitionVn": "quả dưa hấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Chilled watermelon is the perfect treat on hot summer days.",
      "Watermelon is over 90 percent water."
    ],
    "exampleTranslations": [
      "Dưa hấu ướp lạnh là món quà hoàn hảo vào những ngày hè nóng nực.",
      "Dưa hấu chứa hơn 90 phần trăm là nước."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_11",
    "word": "pineapple",
    "phonetic": "/ˈpaɪnæpl/",
    "definition": "A large juicy tropical fruit consisting of aromatic edible yellow flesh surrounded by a tough segmented skin.",
    "definitionVn": "quả dứa, quả thơm, quả khóm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Fresh pineapple juice is sweet and tangy.",
      "Pineapple is rich in bromelain and aids digestion."
    ],
    "exampleTranslations": [
      "Nước ép dứa tươi có vị chua ngọt thanh mát.",
      "Quả dứa rất giàu bromelain và hỗ trợ tiêu hóa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_12",
    "word": "coconut",
    "phonetic": "/ˈkoʊkənʌt/",
    "definition": "The large, oval, brown seed of a tropical palm, containing edible white meat and clear liquid.",
    "definitionVn": "quả dừa, trái dừa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Fresh coconut water is natural, refreshing, and full of electrolytes.",
      "Ben Tre is the land of coconuts in Vietnam."
    ],
    "exampleTranslations": [
      "Nước dừa tươi rất tự nhiên, giải khát và đầy khoáng chất.",
      "Bến Tre là xứ sở dừa của Việt Nam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_13",
    "word": "papaya",
    "phonetic": "/pəˈpaɪə/",
    "definition": "A tropical fruit shaped like an elongated melon, with edible orange flesh and small black seeds.",
    "definitionVn": "quả đu đủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Sweet ripe papaya is gentle on the stomach.",
      "Green papaya salad with dried beef is a street classic."
    ],
    "exampleTranslations": [
      "Đu đủ chín ngọt rất lành bụng và dễ tiêu.",
      "Nộm đu đủ xanh bò khô là món ăn đường phố kinh điển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_14",
    "word": "potato",
    "phonetic": "/pəˈteɪtoʊ/",
    "definition": "A starchy plant tuber that is one of the most important food crops.",
    "definitionVn": "củ khoai tây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Mashed potatoes with butter taste creamy and delicious.",
      "Bake the potatoes in the oven until golden."
    ],
    "exampleTranslations": [
      "Khoai tây nghiền với bơ có vị béo ngậy và thơm ngon.",
      "Nướng khoai tây trong lò cho đến khi vàng ươm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_15",
    "word": "tomato",
    "phonetic": "/təˈmeɪtoʊ/",
    "definition": "A glossy red or yellowish pulpy edible fruit that is typically eaten as a vegetable in salads.",
    "definitionVn": "quả cà chua",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Fresh red tomatoes are rich in lycopene and antioxidants.",
      "Slice the tomatoes for the garden salad."
    ],
    "exampleTranslations": [
      "Cà chua đỏ tươi rất giàu lycopene và chất chống oxy hóa.",
      "Thái lát cà chua cho món salad vườn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_16",
    "word": "carrot",
    "phonetic": "/ˈkærət/",
    "definition": "A tapering orange-colored root eaten as a vegetable.",
    "definitionVn": "củ cà rốt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Eating crunchy carrots is great for your eyesight.",
      "Add diced carrots to the chicken soup."
    ],
    "exampleTranslations": [
      "Ăn cà rốt giòn rất tốt cho thị lực của bạn.",
      "Thêm cà rốt thái hạt lựu vào súp gà nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_17",
    "word": "onion",
    "phonetic": "/ˈʌnjən/",
    "definition": "A swollen edible bulb with a pungent taste and smell, composed of several concentric layers.",
    "definitionVn": "củ hành tây",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Sauté chopped onions in olive oil until fragrant.",
      "Cutting raw onions may make your eyes water."
    ],
    "exampleTranslations": [
      "Xào hành tây băm với dầu ô liu cho đến khi dậy mùi thơm.",
      "Cắt hành tây sống có thể làm bạn cay mắt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_18",
    "word": "garlic",
    "phonetic": "/ˈɡɑːrlɪk/",
    "definition": "A strong-smelling pungent-tasting bulb, used as a flavoring in cookery and in herbal medicine.",
    "definitionVn": "củ tỏi (gia vị)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Garlic boosts your immune system and adds rich flavor to food.",
      "Crush two cloves of fresh garlic."
    ],
    "exampleTranslations": [
      "Tỏi giúp tăng cường hệ miễn dịch và tăng hương vị đậm đà cho món ăn.",
      "Đập dập hai tép tỏi tươi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_19",
    "word": "cucumber",
    "phonetic": "/ˈkjuːkʌmbər/",
    "definition": "A long, green-skinned fruit with watery flesh, usually eaten raw in salads or pickled.",
    "definitionVn": "quả dưa chuột, dưa leo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Cool sliced cucumbers are crunchy and hydrating.",
      "Place cucumber slices on your eyes to relax."
    ],
    "exampleTranslations": [
      "Dưa chuột thái lát mát lạnh rất giòn và cấp nước tốt.",
      "Đắp những lát dưa chuột lên mắt để thư giãn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_20",
    "word": "vegetable",
    "phonetic": "/ˈvedʒtəbl/",
    "definition": "A plant or part of a plant used as food.",
    "definitionVn": "rau củ, rau xanh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Eating plenty of green vegetables keeps your body healthy.",
      "Buy fresh organic vegetables at the market."
    ],
    "exampleTranslations": [
      "Ăn nhiều rau xanh giúp cơ thể luôn khỏe mạnh.",
      "Mua rau củ hữu cơ tươi ở chợ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_plants_21",
    "word": "watermelon",
    "phonetic": "/ˈwɑː.t̬ɚˌmel.ən/",
    "definition": "A large, round or oblong green melon with sweet, watery red pulp and black seeds.",
    "definitionVn": "quả dưa hấu thanh mát, nhiều nước",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Chilled slices of juicy watermelon are the ultimate refreshing treat on scorching summer afternoons.",
      "Seedless watermelons are especially popular for making fresh fruit salads and juices."
    ],
    "exampleTranslations": [
      "Những lát dưa hấu ướp lạnh mọng nước là món ăn giải khát tuyệt đỉnh vào những buổi chiều hè oi bức.",
      "Dưa hấu không hạt đặc biệt phổ biến để làm món salad trái cây tươi và nước ép."
    ],
    "synonyms": [
      "citrullus fruit"
    ],
    "antonyms": []
  },
  {
    "id": "bv_plants_22",
    "word": "pineapple",
    "phonetic": "/ˈpaɪnˌæp.əl/",
    "definition": "A large juicy tropical fruit consisting of edible aromatic yellow flesh surrounded by a tough prickly skin.",
    "definitionVn": "quả dứa, quả thơm có gai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Freshly sliced golden pineapple brings a tangy sweetness to tropical smoothies and grilled skewers.",
      "Pineapples thrive in warm tropical climates with well-drained volcanic soils."
    ],
    "exampleTranslations": [
      "Dứa vàng mới cắt lát mang lại vị ngọt thơm cho sinh tố nhiệt đới và các xiên nướng.",
      "Cây dứa phát triển mạnh ở vùng khí hậu nhiệt đới ấm áp với đất núi lửa thoát nước tốt."
    ],
    "synonyms": [
      "ananas"
    ],
    "antonyms": []
  },
  {
    "id": "bv_plants_23",
    "word": "papaya",
    "phonetic": "/pəˈpaɪ.ə/",
    "definition": "A tropical fruit shaped like an elongated melon, with edible orange flesh and small black seeds.",
    "definitionVn": "quả đu đủ chín giàu vitamin",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Squeezing fresh lime juice over ripe papaya enhances its natural tropical flavor.",
      "Papayas contain digestive enzymes that aid in gastric comfort and protein breakdown."
    ],
    "exampleTranslations": [
      "Vắt nước chanh tươi lên quả đu đủ chín sẽ làm tăng hương vị nhiệt đới tự nhiên của nó.",
      "Đu đủ chứa các enzym tiêu hóa hỗ trợ dạ dày dễ chịu và phân giải protein."
    ],
    "synonyms": [
      "pawpaw"
    ],
    "antonyms": []
  },
  {
    "id": "bv_plants_24",
    "word": "sunflower",
    "phonetic": "/ˈsʌnˌflaʊ.ɚ/",
    "definition": "A tall North American plant of the daisy family, with very large golden-yellow rayed flower heads.",
    "definitionVn": "hoa hướng dương vàng rực rỡ hướng về mặt trời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "Vast fields of blooming yellow sunflowers turn their heavy heads toward the morning sun.",
      "Roasted sunflower seeds make a nutritious, crunchy snack packed with healthy fats."
    ],
    "exampleTranslations": [
      "Những cánh đồng hoa hướng dương vàng nở rộ bạt ngàn hướng những bông hoa nặng trĩu về phía mặt trời buổi sớm.",
      "Hạt hướng dương rang làm món ăn nhẹ giòn tan bổ dưỡng chứa nhiều chất béo lành mạnh."
    ],
    "synonyms": [
      "helianthus"
    ],
    "antonyms": []
  },
  {
    "id": "bv_plants_25",
    "word": "cactus",
    "phonetic": "/ˈkæk.təs/",
    "definition": "A succulent plant with a thick fleshy stem bearing spines, typically lacking leaves, native to arid regions.",
    "definitionVn": "cây xương rồng sa mạc chịu hạn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_plants_fruits",
    "themeNameVn": "Cây cối & Hoa quả",
    "themeNameEn": "Plants & Fruits",
    "examples": [
      "The giant saguaro cactus can store hundreds of gallons of water during desert flash rains.",
      "Potted miniature cacti are popular low-maintenance houseplants that require minimal watering."
    ],
    "exampleTranslations": [
      "Cây xương rồng saguaro khổng lồ có thể tích trữ hàng trăm gallon nước trong các trận mưa rào bất chợt ở sa mạc.",
      "Xương rồng mini trồng trong chậu là loại cây cảnh trong nhà ít tốn công chăm sóc và cần tưới nước tối thiểu."
    ],
    "synonyms": [
      "desert succulent"
    ],
    "antonyms": []
  }
];

export const CHUDE_CAY_COI_HOA_QUA: VocabularyTopicPackage = {
  theme: THEME_CAY_COI_HOA_QUA,
  vocabs: VOCABS_CAY_COI_HOA_QUA,
};

export default CHUDE_CAY_COI_HOA_QUA;
