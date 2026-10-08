import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 38: Bánh ngọt & Tráng miệng (Bakery & Desserts)
 * Mã chủ đề: t_basic_bakery_desserts
 * Tổng số từ vựng: 20 từ
 */
export const THEME_BANH_NGOT_TRANG_MIENG: BasicTheme = {
  "id": "t_basic_bakery_desserts",
  "name": "Bánh ngọt & Tráng miệng",
  "nameEn": "Bakery & Desserts",
  "icon": "🧁",
  "difficulty": 1,
  "color": "#db2777",
  "description": "Bánh kem, bánh quy, sandwich, bánh sừng bò, kem ly và sô-cô-la.",
  "totalVocabs": 20
};

export const VOCABS_BANH_NGOT_TRANG_MIENG: BasicVocabularyItem[] = [
  {
    "id": "bv_bakery_01",
    "word": "cake",
    "phonetic": "/keɪk/",
    "definition": "An item of soft sweet food made from a mixture of flour, shortening, eggs, sugar, and other ingredients, baked and often decorated.",
    "definitionVn": "bánh ngọt, bánh sinh nhật, bánh kem",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "We blew out the candles on the birthday cake.",
      "She baked a delicious chocolate cake from scratch."
    ],
    "exampleTranslations": [
      "Chúng tôi đã cùng nhau thổi nến trên chiếc bánh sinh nhật.",
      "Cô ấy đã tự tay nướng một chiếc bánh sô cô la thơm ngon."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_02",
    "word": "cookie",
    "phonetic": "/ˈkʊki/",
    "definition": "A small sweet, crispy or chewy baked biscuit.",
    "definitionVn": "bánh quy, bánh cookie",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Freshly baked chocolate chip cookies smell wonderful.",
      "Dip the crunchy cookie into a glass of cold milk."
    ],
    "exampleTranslations": [
      "Bánh quy sô cô la chip mới nướng tỏa mùi thơm ngào ngạt.",
      "Chấm chiếc bánh quy giòn vào ly sữa lạnh nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_03",
    "word": "sandwich",
    "phonetic": "/ˈsænwɪtʃ/",
    "definition": "An item of food consisting of two pieces of bread with meat, cheese, or other filling between them.",
    "definitionVn": "bánh mì kẹp, bánh sandwich",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "I packed a ham and cheese sandwich for my school lunch.",
      "A grilled sandwich is quick, easy, and satisfying."
    ],
    "exampleTranslations": [
      "Tôi đã chuẩn bị một chiếc bánh mì kẹp giăm bông phô mai cho bữa trưa ở trường.",
      "Bánh sandwich nướng làm rất nhanh, dễ và no bụng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_04",
    "word": "croissant",
    "phonetic": "/krwɑːˈsɑːŋ/",
    "definition": "A crescent-shaped roll made of sweet flaky yeast dough, associated with France.",
    "definitionVn": "bánh sừng bò, bánh croissant",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "A buttery warm croissant with hot coffee is a classic breakfast.",
      "The pastry chef makes flaky French croissants."
    ],
    "exampleTranslations": [
      "Một chiếc bánh sừng bò ấm béo bơ cùng cà phê nóng là bữa sáng kinh điển.",
      "Đầu bếp làm bánh làm ra những chiếc bánh croissant giòn xốp kiểu Pháp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_05",
    "word": "donut",
    "phonetic": "/ˈdoʊnʌt/",
    "definition": "A small fried cake of sweetened dough, typically in the shape of a ring or ball with filling.",
    "definitionVn": "bánh rán vòng, bánh donut",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Children love colorful glazed donuts with sprinkles.",
      "He enjoyed a strawberry-filled donut with his tea."
    ],
    "exampleTranslations": [
      "Trẻ em rất thích những chiếc bánh donut phủ đường nhiều màu sắc.",
      "Anh ấy thưởng thức chiếc bánh donut nhân dâu tây cùng tách trà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_06",
    "word": "pancake",
    "phonetic": "/ˈpænkeɪk/",
    "definition": "A thin, flat cake of batter, fried on both sides in a pan and typically rolled up or topped with syrup.",
    "definitionVn": "bánh kếp, bánh rán chảo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Stack fluffy pancakes and pour maple syrup on top.",
      "Sunday morning pancakes are a beloved family tradition."
    ],
    "exampleTranslations": [
      "Xếp chồng những chiếc bánh kếp xốp mềm và rưới si-rô phong lên trên.",
      "Bánh pancake sáng Chủ Nhật là truyền thống được cả nhà yêu thích."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_07",
    "word": "waffle",
    "phonetic": "/ˈwɑːfl/",
    "definition": "A small crisp batter cake, baked in a waffle iron and having a distinctive grid pattern.",
    "definitionVn": "bánh quế nướng tổ ong, waffle",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Crisp Belgian waffles topped with fresh berries and whipped cream taste heavenly.",
      "Bake waffles in the electric waffle maker."
    ],
    "exampleTranslations": [
      "Bánh waffle Bỉ giòn rụm phủ quả mọng tươi và kem tươi có vị ngon tuyệt trần.",
      "Nướng bánh waffle trong máy làm bánh tổ ong điện nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_08",
    "word": "pie",
    "phonetic": "/paɪ/",
    "definition": "A baked dish of fruit, meat, or vegetables, typically with a top and base of pastry.",
    "definitionVn": "bánh nướng có nhân, bánh pie",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Warm homemade apple pie with vanilla ice cream is a classic treat.",
      "She baked a savory chicken and mushroom pie."
    ],
    "exampleTranslations": [
      "Bánh pie táo nướng tại nhà ấm áp ăn kèm kem vani là món quà kinh điển.",
      "Cô ấy đã nướng một chiếc bánh pie nhân gà và nấm đậm đà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_09",
    "word": "pastry",
    "phonetic": "/ˈpeɪstri/",
    "definition": "A dough of flour, shortening, and water, used as a base and covering in baked dishes.",
    "definitionVn": "bánh ngọt nướng, bột ngàn lớp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "The French bakery display is filled with delicate pastries.",
      "She mastered the art of making flaky puff pastry."
    ],
    "exampleTranslations": [
      "Tủ trưng bày của tiệm bánh Pháp ngập tràn các loại bánh ngọt tinh tế.",
      "Cô ấy đã thành thạo nghệ thuật làm bột ngàn lớp giòn xốp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_10",
    "word": "ice cream",
    "phonetic": "/ˈaɪs kriːm/",
    "definition": "A soft, sweet frozen food made with milk and cream and typically flavored with vanilla, fruit, or chocolate.",
    "definitionVn": "kem, kem que, kem ly",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Two scoops of chocolate ice cream on a crispy waffle cone, please!",
      "Eating cold ice cream on a hot summer day is pure bliss."
    ],
    "exampleTranslations": [
      "Cho tôi hai viên kem sô cô la trên ốc quế giòn nhé!",
      "Ăn kem mát lạnh vào ngày hè nóng nực đem lại cảm giác sướng rơn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_11",
    "word": "chocolate",
    "phonetic": "/ˈtʃɔːklət/",
    "definition": "A food made from roasted and ground cacao seeds, typically sweetened and eaten as confectionery.",
    "definitionVn": "sô-cô-la",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Dark chocolate with 70% cocoa is rich in antioxidants.",
      "He gifted a heart-shaped box of fine chocolates on Valentine's Day."
    ],
    "exampleTranslations": [
      "Sô-cô-la đen với 70% ca cao rất giàu chất chống oxy hóa.",
      "Anh ấy đã tặng một hộp sô-cô-la hảo hạng hình trái tim vào ngày lễ Tình nhân."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_12",
    "word": "candy",
    "phonetic": "/ˈkændi/",
    "definition": "A sweet food made with sugar or syrup combined with fruit, chocolate, or nuts.",
    "definitionVn": "kẹo ngọt, viên kẹo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Brush your teeth after eating sugary candy.",
      "The candy store has colorful lollipops and gummies."
    ],
    "exampleTranslations": [
      "Hãy đánh răng sau khi ăn kẹo ngọt nhé.",
      "Cửa hàng kẹo có những cây kẹo mút và kẹo dẻo rực rỡ sắc màu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_13",
    "word": "pudding",
    "phonetic": "/ˈpʊdɪŋ/",
    "definition": "A cooked sweet dish consisting of a soft, moist mass of food.",
    "definitionVn": "bánh pút-đinh, món tráng miệng mềm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Creamy mango pudding is a delightful tropical dessert.",
      "Top the caramel pudding with fresh mint."
    ],
    "exampleTranslations": [
      "Bánh pút-đinh xoài béo ngậy là món tráng miệng nhiệt đới tuyệt vời.",
      "Trang trí bánh pút-đinh caramel bằng lá bạc hà tươi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_14",
    "word": "cream",
    "phonetic": "/kriːm/",
    "definition": "The thick white or pale yellow fatty liquid which rises to the top when milk is left to stand.",
    "definitionVn": "kem tươi, váng sữa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Whip the heavy cream until soft peaks form.",
      "Add a spoonful of sweet cream to your strawberries."
    ],
    "exampleTranslations": [
      "Đánh bông kem tươi cho đến khi tạo thành chóp mềm nhé.",
      "Thêm một thìa kem ngọt vào đĩa dâu tây của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_15",
    "word": "butter",
    "phonetic": "/ˈbʌtər/",
    "definition": "A pale yellow edible fatty substance made by churning cream and used as a spread or in cooking.",
    "definitionVn": "bơ (làm từ sữa)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Spread creamy butter on warm toasted bread.",
      "Melt unsalted butter in the saucepan for baking."
    ],
    "exampleTranslations": [
      "Phết bơ béo ngậy lên bánh mì nướng nóng hổi nhé.",
      "Làm tan chảy bơ lạt trong chảo nhỏ để nướng bánh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_16",
    "word": "flour",
    "phonetic": "/ˈflaʊər/",
    "definition": "A powder obtained by grinding grain, typically wheat, and used to make bread, cakes, and pastry.",
    "definitionVn": "bột mì (làm bánh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "Sift the wheat flour to ensure a light and fluffy cake.",
      "We need three cups of all-purpose flour for the dough."
    ],
    "exampleTranslations": [
      "Rây bột mì để đảm bảo bánh nở xốp và nhẹ nhé.",
      "Chúng ta cần ba cốc bột mì đa dụng cho phần bột bánh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_17",
    "word": "delicious",
    "phonetic": "/dɪˈlɪʃəs/",
    "definition": "Highly pleasant to the taste.",
    "definitionVn": "thơm ngon, ngon tuyệt cú mèo",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "This homemade blueberry cheesecake is absolutely delicious!",
      "Thank you for the delicious dinner!"
    ],
    "exampleTranslations": [
      "Chiếc bánh phô mai việt quất tự làm này ngon tuyệt cú mèo!",
      "Cảm ơn vì bữa tối thơm ngon nhé!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_18",
    "word": "bakery",
    "phonetic": "/ˈbeɪkəri/",
    "definition": "A place where bread and cakes are made or sold.",
    "definitionVn": "tiệm bánh mì, tiệm bánh ngọt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "The neighborhood bakery opens early at 6:00 AM with fresh bread.",
      "Follow the sweet scent of baking to the local bakery."
    ],
    "exampleTranslations": [
      "Tiệm bánh gần nhà mở cửa sớm từ 6h sáng với bánh mì mới ra lò.",
      "Đi theo mùi thơm ngọt ngào của mẻ bánh nướng để đến tiệm bánh địa phương nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_19",
    "word": "dessert",
    "phonetic": "/dɪˈzɜːrt/",
    "definition": "The sweet course eaten at the end of a meal.",
    "definitionVn": "món tráng miệng (sau bữa ăn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "What would you like for dessert? — Fruit salad, please!",
      "Save room for dessert!"
    ],
    "exampleTranslations": [
      "Bạn muốn dùng món gì cho tráng miệng? — Cho tôi salad trái cây nhé!",
      "Nhớ để bụng ăn món tráng miệng nhé!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bakery_20",
    "word": "bake",
    "phonetic": "/beɪk/",
    "definition": "Cook food by dry heat without direct exposure to a flame, typically in an oven.",
    "definitionVn": "nướng bánh (bằng lò nướng)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bakery_desserts",
    "themeNameVn": "Bánh ngọt & Tráng miệng",
    "themeNameEn": "Bakery & Desserts",
    "examples": [
      "We love to bake chocolate chip cookies on rainy Sundays.",
      "Bake the cake at 175 degrees for thirty minutes."
    ],
    "exampleTranslations": [
      "Chúng tôi rất thích nướng bánh quy sô cô la chip vào những ngày Chủ Nhật mưa gió.",
      "Nướng bánh ở nhiệt độ 175 độ trong ba mươi phút nhé."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_BANH_NGOT_TRANG_MIENG: VocabularyTopicPackage = {
  theme: THEME_BANH_NGOT_TRANG_MIENG,
  vocabs: VOCABS_BANH_NGOT_TRANG_MIENG,
};

export default CHUDE_BANH_NGOT_TRANG_MIENG;
