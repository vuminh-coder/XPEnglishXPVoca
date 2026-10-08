import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 23: Dụng cụ nhà bếp (Kitchen Utensils)
 * Mã chủ đề: t_basic_kitchen_utensils
 * Tổng số từ vựng: 25 từ
 */
export const THEME_DUNG_CU_NHA_BEP: BasicTheme = {
  "id": "t_basic_kitchen_utensils",
  "name": "Dụng cụ nhà bếp",
  "nameEn": "Kitchen Utensils",
  "icon": "🍳",
  "difficulty": 1,
  "color": "#b45309",
  "description": "Nồi, chảo, bát đĩa, đũa thìa, dao kéo và lò nướng.",
  "totalVocabs": 25
};

export const VOCABS_DUNG_CU_NHA_BEP: BasicVocabularyItem[] = [
  {
    "id": "bv_kitche_01",
    "word": "pot",
    "phonetic": "/pɑːt/",
    "definition": "A container, typically rounded or cylindrical and of ceramic or metal, used for cooking.",
    "definitionVn": "nồi nấu (nồi canh, nồi luộc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "A large pot of soup is simmering on the stove.",
      "Cover the cooking pot with a lid."
    ],
    "exampleTranslations": [
      "Một nồi súp lớn đang sôi lăn tăn trên bếp.",
      "Đậy nắp nồi nấu lại nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_02",
    "word": "pan",
    "phonetic": "/pæn/",
    "definition": "A metal container used for cooking food, typically with a flat base and long handle.",
    "definitionVn": "chảo rán, chảo chiên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Heat a little oil in the non-stick frying pan.",
      "She flipped the fried egg neatly in the pan."
    ],
    "exampleTranslations": [
      "Làm nóng một ít dầu trong chảo chống dính nhé.",
      "Cô ấy lật quả trứng ốp la thật khéo trong chảo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_03",
    "word": "bowl",
    "phonetic": "/boʊl/",
    "definition": "A round, deep dish used for food or liquid.",
    "definitionVn": "bát, tô (đựng cơm, súp)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Serve hot noodles in a large ceramic bowl.",
      "He ate a bowl of steamed rice with chopsticks."
    ],
    "exampleTranslations": [
      "Múc mì nóng vào một chiếc tô sứ lớn nhé.",
      "Anh ấy ăn một bát cơm trắng bằng đũa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_04",
    "word": "plate",
    "phonetic": "/pleɪt/",
    "definition": "A flat dish, typically circular and made of china, from which food is eaten or served.",
    "definitionVn": "chiếc đĩa (đựng thức ăn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Place the grilled fish carefully on the white plate.",
      "Clear the dining plates after eating."
    ],
    "exampleTranslations": [
      "Đặt món cá nướng cẩn thận lên chiếc đĩa trắng nhé.",
      "Dọn dẹp đĩa ăn sau bữa ăn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_05",
    "word": "dish",
    "phonetic": "/dɪʃ/",
    "definition": "A shallow flat-bottomed container for cooking or serving food; a particular prepared food.",
    "definitionVn": "món ăn, đĩa thức ăn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Spring rolls are a famous traditional Vietnamese dish.",
      "Wash the dishes with warm water and soap."
    ],
    "exampleTranslations": [
      "Nem rán là món ăn truyền thống nổi tiếng của Việt Nam.",
      "Rửa chén đĩa bằng nước ấm và nước rửa chén nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_06",
    "word": "spoon",
    "phonetic": "/spuːn/",
    "definition": "An implement consisting of a small, shallow oval or round bowl on a long handle, used for eating or stirring.",
    "definitionVn": "chiếc thìa, muỗng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Stir the hot soup with a wooden spoon.",
      "Eat soup with a ceramic soup spoon."
    ],
    "exampleTranslations": [
      "Khuấy súp nóng bằng một chiếc thìa gỗ nhé.",
      "Ăn súp bằng một chiếc thìa sứ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_07",
    "word": "fork",
    "phonetic": "/fɔːrk/",
    "definition": "An implement with two or more prongs used for lifting food to the mouth or holding it when cutting.",
    "definitionVn": "chiếc nĩa, dĩa ăn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Use a fork and knife to cut the steak neatly.",
      "She ate her fruit salad with a small fork."
    ],
    "exampleTranslations": [
      "Dùng dao và nĩa để cắt miếng bít tết gọn gàng nhé.",
      "Cô ấy ăn món salad trái cây bằng một chiếc nĩa nhỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_08",
    "word": "knife",
    "phonetic": "/naɪf/",
    "definition": "An instrument composed of a blade fixed into a handle, used for cutting.",
    "definitionVn": "con dao (cắt, thái)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Always be careful when using a sharp kitchen knife.",
      "Cut the ripe apple with a fruit knife."
    ],
    "exampleTranslations": [
      "Luôn luôn cẩn thận khi sử dụng dao làm bếp sắc bén nhé.",
      "Cắt quả táo chín bằng dao gọt hoa quả nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_09",
    "word": "chopsticks",
    "phonetic": "/ˈtʃɑːpstɪks/",
    "definition": "A pair of thin, tapered sticks of wood, bamboo, or plastic, held in one hand and used for eating in Asian cuisine.",
    "definitionVn": "đôi đũa (ăn cơm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Learning to use chopsticks is an enjoyable skill.",
      "We eat pho and rice with bamboo chopsticks."
    ],
    "exampleTranslations": [
      "Học dùng đũa là một kỹ năng rất thú vị.",
      "Chúng tôi ăn phở và cơm bằng đũa tre."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_10",
    "word": "cup",
    "phonetic": "/kʌp/",
    "definition": "A small, bowl-shaped container for drinking from, typically having a handle.",
    "definitionVn": "tách, cốc có quai (uống trà, cà phê)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Would you like a cup of hot green tea?",
      "She drank a warm cup of milk before bed."
    ],
    "exampleTranslations": [
      "Bạn có muốn dùng một tách trà xanh nóng không?",
      "Cô ấy đã uống một cốc sữa ấm trước khi đi ngủ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_11",
    "word": "glass",
    "phonetic": "/ɡlæs/",
    "definition": "A drinking container made of glass.",
    "definitionVn": "ly thủy tinh, cốc thủy tinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Drink a tall glass of fresh orange juice.",
      "She filled the glass with cold water."
    ],
    "exampleTranslations": [
      "Hãy uống một ly nước cam tươi lớn nhé.",
      "Cô ấy rót đầy nước lạnh vào chiếc ly thủy tinh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_12",
    "word": "bottle",
    "phonetic": "/ˈbɑːtl/",
    "definition": "A container with a narrow neck, used for storing drinks or other liquids.",
    "definitionVn": "chai, bình đựng nước",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Carry a reusable water bottle when traveling.",
      "A glass bottle of milk was delivered to the doorstep."
    ],
    "exampleTranslations": [
      "Mang theo bình nước dùng nhiều lần khi đi du lịch nhé.",
      "Một chai sữa thủy tinh đã được giao đến trước hiên nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_13",
    "word": "kettle",
    "phonetic": "/ˈketl/",
    "definition": "A container or device in which water is boiled, having a lid, spout, and handle.",
    "definitionVn": "ấm đun nước",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Boil fresh water in the electric kettle for tea.",
      "The stainless steel kettle whistled on the stove."
    ],
    "exampleTranslations": [
      "Đun nước sôi trong ấm điện để pha trà nhé.",
      "Chiếc ấm inox reo lên trên bếp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_14",
    "word": "stove",
    "phonetic": "/stoʊv/",
    "definition": "An apparatus for cooking or heating that operates by burning fuel or using electricity.",
    "definitionVn": "bếp nấu (bếp gas, bếp từ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Turn off the gas stove after you finish cooking.",
      "Induction stoves are safe, fast, and easy to wipe clean."
    ],
    "exampleTranslations": [
      "Tắt bếp gas sau khi bạn nấu ăn xong nhé.",
      "Bếp từ rất an toàn, nấu nhanh và dễ lau chùi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_15",
    "word": "oven",
    "phonetic": "/ˈʌvn/",
    "definition": "An enclosed compartment for cooking and heating food.",
    "definitionVn": "lò nướng (bánh, thịt)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Preheat the oven to 180 degrees before baking cookies.",
      "The roast chicken smells delicious in the oven."
    ],
    "exampleTranslations": [
      "Làm nóng lò nướng đến 180 độ trước khi nướng bánh quy nhé.",
      "Món gà quay thơm phức trong lò nướng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_16",
    "word": "microwave",
    "phonetic": "/ˈmaɪkrəweɪv/",
    "definition": "An oven that uses microwaves to cook or heat food quickly.",
    "definitionVn": "lò vi sóng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Warm up your soup in the microwave for two minutes.",
      "Use microwave-safe bowls when reheating food."
    ],
    "exampleTranslations": [
      "Làm nóng súp trong lò vi sóng trong hai phút nhé.",
      "Sử dụng bát an toàn cho lò vi sóng khi hâm nóng thức ăn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_17",
    "word": "cutting board",
    "phonetic": "/ˈkʌtɪŋ bɔːrd/",
    "definition": "A durable board on which to place material for cutting.",
    "definitionVn": "thớt (thái thịt, rau)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Use separate cutting boards for raw meat and vegetables.",
      "Wash the wooden cutting board thoroughly."
    ],
    "exampleTranslations": [
      "Dùng thớt riêng cho thịt sống và rau củ nhé.",
      "Rửa sạch thớt gỗ thật kỹ lưỡng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_18",
    "word": "sink",
    "phonetic": "/sɪŋk/",
    "definition": "A fixed basin with a water supply and a drain.",
    "definitionVn": "bồn rửa bát, bồn rửa tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Wash the greasy plates in the kitchen sink.",
      "Keep the kitchen sink clean and unclogged."
    ],
    "exampleTranslations": [
      "Rửa những chiếc đĩa dính dầu mỡ trong bồn rửa bát nhé.",
      "Giữ bồn rửa chén luôn sạch sẽ và thông thoáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_19",
    "word": "cook",
    "phonetic": "/kʊk/",
    "definition": "Prepare food, a dish, or a meal by combining and heating the ingredients in various ways.",
    "definitionVn": "nấu ăn, nấu nướng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "I love to cook healthy home meals for my family.",
      "Mom is cooking traditional beef pho in the kitchen."
    ],
    "exampleTranslations": [
      "Tôi rất thích tự nấu những bữa cơm gia đình bổ dưỡng cho người thân.",
      "Mẹ đang nấu phở bò truyền thống trong bếp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_20",
    "word": "bake",
    "phonetic": "/beɪk/",
    "definition": "Cook food by dry heat without direct exposure to a flame, typically in an oven.",
    "definitionVn": "nướng bánh (bằng lò)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp",
    "themeNameEn": "Kitchen Utensils",
    "examples": [
      "Let's bake fresh chocolate chip cookies this Sunday.",
      "She baked a fluffy birthday cake for her brother."
    ],
    "exampleTranslations": [
      "Cùng nướng bánh quy sô cô la thơm lừng vào Chủ Nhật này nhé.",
      "Cô ấy đã nướng một chiếc bánh sinh nhật mềm xốp cho anh trai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_kitche_21",
    "word": "frying pan",
    "phonetic": "/ˈfraɪ.ɪŋ pæn/",
    "definition": "A shallow pan with a long handle, used for cooking food in hot oil or fat.",
    "definitionVn": "chảo rán, chảo chiên chống dính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp & Nấu nướng",
    "themeNameEn": "Kitchen Utensils & Cooking",
    "examples": [
      "He heated a dollop of butter in the non-stick frying pan before pouring the omelet batter.",
      "A seasoned cast-iron frying pan retains heat exceptionally well for searing thick steaks."
    ],
    "exampleTranslations": [
      "Anh ấy đun nóng một miếng bơ trong chảo rán chống dính trước khi đổ bột trứng tráng vào.",
      "Một chiếc chảo rán bằng gang đã tôi dầu giữ nhiệt đặc biệt tốt để áp chảo những miếng bít tết dày."
    ],
    "synonyms": [
      "skillet",
      "saute pan"
    ],
    "antonyms": []
  },
  {
    "id": "bv_kitche_22",
    "word": "blender",
    "phonetic": "/ˈblen.dɚ/",
    "definition": "An electric machine in which soft food or liquids are chopped, pureed, or mixed into a smooth paste.",
    "definitionVn": "máy xay sinh tố, máy xay nhuyễn thực phẩm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp & Nấu nướng",
    "themeNameEn": "Kitchen Utensils & Cooking",
    "examples": [
      "Toss frozen berries, bananas, and almond milk into the high-speed blender for breakfast.",
      "The chef pureed roasted butternut squash in the blender until the soup achieved a velvety consistency."
    ],
    "exampleTranslations": [
      "Cho quả mọng đông lạnh, chuối và sữa hạnh nhân vào máy xay sinh tố tốc độ cao cho bữa sáng.",
      "Đầu bếp xay nhuyễn bí đỏ nướng trong máy xay sinh tố cho đến khi món súp đạt được độ mịn màng như nhung."
    ],
    "synonyms": [
      "food liquidizer",
      "smoothie maker"
    ],
    "antonyms": []
  },
  {
    "id": "bv_kitche_23",
    "word": "microwave",
    "phonetic": "/ˈmaɪ.kroʊ.weɪv/",
    "definition": "An electric oven that heats and cooks food rapidly by exposing it to electromagnetic radiation.",
    "definitionVn": "lò vi sóng hâm nóng thức ăn tiện lợi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp & Nấu nướng",
    "themeNameEn": "Kitchen Utensils & Cooking",
    "examples": [
      "It takes just two minutes to reheat yesterday's pasta in the compact countertop microwave.",
      "Avoid placing metal utensils or aluminum foil inside an operating microwave oven."
    ],
    "exampleTranslations": [
      "Chỉ mất hai phút để hâm nóng món mì ống hôm qua trong lò vi sóng nhỏ gọn để bàn.",
      "Tránh đặt dụng cụ kim loại hoặc giấy bạc vào bên trong lò vi sóng đang hoạt động."
    ],
    "synonyms": [
      "microwave oven",
      "reheating appliance"
    ],
    "antonyms": []
  },
  {
    "id": "bv_kitche_24",
    "word": "kettle",
    "phonetic": "/ˈket̬.əl/",
    "definition": "A metal or plastic container with a handle and spout, used for boiling water.",
    "definitionVn": "ấm đun nước siêu tốc hoặc ấm đun trên bếp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp & Nấu nướng",
    "themeNameEn": "Kitchen Utensils & Cooking",
    "examples": [
      "The electric stainless steel kettle boils a liter of water for morning tea in sixty seconds.",
      "The whistling tea kettle announced that the boiling water was ready for French press coffee."
    ],
    "exampleTranslations": [
      "Ấm đun nước bằng thép không gỉ chạy điện đun sôi một lít nước để pha trà sáng trong sáu mươi giây.",
      "Tiếng còi ấm đun nước reo lên báo hiệu nước sôi đã sẵn sàng cho cà phê pha kiểu Pháp."
    ],
    "synonyms": [
      "tea kettle",
      "water boiler"
    ],
    "antonyms": []
  },
  {
    "id": "bv_kitche_25",
    "word": "chopping board",
    "phonetic": "/ˈtʃɑː.pɪŋ bɔːrd/",
    "definition": "A wooden or plastic board on which foods, such as meats and vegetables, are chopped.",
    "definitionVn": "cái thớt thái thực phẩm bằng gỗ hoặc nhựa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_kitchen_utensils",
    "themeNameVn": "Dụng cụ nhà bếp & Nấu nướng",
    "themeNameEn": "Kitchen Utensils & Cooking",
    "examples": [
      "Always wash the wooden chopping board thoroughly with hot soapy water after slicing raw poultry.",
      "Color-coded plastic chopping boards prevent cross-contamination between raw meats and fresh salad vegetables."
    ],
    "exampleTranslations": [
      "Luôn rửa thớt gỗ thật kỹ bằng nước xà phòng nóng sau khi thái thịt gia cầm sống.",
      "Thớt nhựa có mã màu giúp ngăn ngừa lây nhiễm chéo giữa thịt sống và rau củ làm salad tươi."
    ],
    "synonyms": [
      "cutting board",
      "butcher block"
    ],
    "antonyms": []
  }
];

export const CHUDE_DUNG_CU_NHA_BEP: VocabularyTopicPackage = {
  theme: THEME_DUNG_CU_NHA_BEP,
  vocabs: VOCABS_DUNG_CU_NHA_BEP,
};

export default CHUDE_DUNG_CU_NHA_BEP;
