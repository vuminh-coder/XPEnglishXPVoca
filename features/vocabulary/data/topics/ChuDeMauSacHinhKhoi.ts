import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 4: Màu sắc & Hình khối (Colors & Shapes)
 * Mã chủ đề: t_basic_colors_shapes
 * Tổng số từ vựng: 21 từ
 */
export const THEME_MAU_SAC_HINH_KHOI: BasicTheme = {
  "id": "t_basic_colors_shapes",
  "name": "Màu sắc & Hình khối",
  "nameEn": "Colors & Shapes",
  "icon": "🎨",
  "difficulty": 1,
  "color": "#ec4899",
  "description": "Các màu sắc cơ bản và hình dạng quen thuộc trong đời sống.",
  "totalVocabs": 21
};

export const VOCABS_MAU_SAC_HINH_KHOI: BasicVocabularyItem[] = [
  {
    "id": "bv_colors_01",
    "word": "red",
    "phonetic": "/red/",
    "definition": "Of a color like blood or a ripe apple.",
    "definitionVn": "màu đỏ",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "She wore a beautiful red dress.",
      "Red is the color of passion."
    ],
    "exampleTranslations": [
      "Cô ấy mặc chiếc váy đỏ tuyệt đẹp.",
      "Màu đỏ là màu của đam mê."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_02",
    "word": "blue",
    "phonetic": "/bluː/",
    "definition": "Of a color like that of the clear sky or ocean.",
    "definitionVn": "màu xanh da trời, xanh lam",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The sky is bright blue today.",
      "He loves wearing his blue jacket."
    ],
    "exampleTranslations": [
      "Bầu trời hôm nay xanh ngắt.",
      "Anh ấy thích mặc áo khoác màu xanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_03",
    "word": "green",
    "phonetic": "/ɡriːn/",
    "definition": "Of the color of fresh grass or leaves.",
    "definitionVn": "màu xanh lá cây",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The grass in the garden is green.",
      "Green tea is good for your health."
    ],
    "exampleTranslations": [
      "Cỏ trong vườn xanh mướt.",
      "Trà xanh rất tốt cho sức khỏe."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_04",
    "word": "yellow",
    "phonetic": "/ˈjeloʊ/",
    "definition": "Of a color like ripe lemons or sunshine.",
    "definitionVn": "màu vàng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "Bananas turn yellow when ripe.",
      "Sunflowers have bright yellow petals."
    ],
    "exampleTranslations": [
      "Chuối chuyển sang màu vàng khi chín.",
      "Hoa hướng dương có cánh hoa vàng tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_05",
    "word": "white",
    "phonetic": "/waɪt/",
    "definition": "Of the color of milk or fresh snow.",
    "definitionVn": "màu trắng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "He wore a clean white shirt.",
      "The peaks are covered with white snow."
    ],
    "exampleTranslations": [
      "Anh ấy mặc áo sơ mi trắng sạch sẽ.",
      "Các đỉnh núi phủ đầy tuyết trắng."
    ],
    "synonyms": [],
    "antonyms": [
      "black"
    ]
  },
  {
    "id": "bv_colors_06",
    "word": "black",
    "phonetic": "/blæk/",
    "definition": "Of the darkest color without light.",
    "definitionVn": "màu đen",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "She has shiny black hair.",
      "I drink black coffee without sugar."
    ],
    "exampleTranslations": [
      "Cô ấy có mái tóc đen nhánh.",
      "Tôi uống cà phê đen không đường."
    ],
    "synonyms": [],
    "antonyms": [
      "white"
    ]
  },
  {
    "id": "bv_colors_07",
    "word": "orange",
    "phonetic": "/ˈɔːrɪndʒ/",
    "definition": "Of a color between red and yellow.",
    "definitionVn": "màu cam, quả cam",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The sunset sky turned brilliant orange.",
      "She peeled a sweet orange."
    ],
    "exampleTranslations": [
      "Bầu trời hoàng hôn chuyển màu cam rực rỡ.",
      "Cô ấy bóc một quả cam ngọt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_08",
    "word": "pink",
    "phonetic": "/pɪŋk/",
    "definition": "Of a color between red and white.",
    "definitionVn": "màu hồng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "Cherry blossoms have delicate pink petals.",
      "Her daughter loves wearing pink."
    ],
    "exampleTranslations": [
      "Hoa anh đào có cánh màu hồng e ấp.",
      "Con gái cô ấy thích mặc đồ màu hồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_09",
    "word": "purple",
    "phonetic": "/ˈpɜːrpl/",
    "definition": "Of a color between red and blue.",
    "definitionVn": "màu tím",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "Grapes turn deep purple when ripe.",
      "She painted her bedroom wall purple."
    ],
    "exampleTranslations": [
      "Những quả nho chuyển sang màu tím đậm khi chín.",
      "Cô ấy sơn tường phòng ngủ màu tím."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_10",
    "word": "brown",
    "phonetic": "/braʊn/",
    "definition": "Of a color like that of wood or chocolate.",
    "definitionVn": "màu nâu",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "He wore classic brown leather shoes.",
      "Chocolate has a rich brown color."
    ],
    "exampleTranslations": [
      "Anh ấy đi đôi giày da màu nâu cổ điển.",
      "Sô cô la có màu nâu đậm đà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_11",
    "word": "gray",
    "phonetic": "/ɡreɪ/",
    "definition": "Of a color between black and white.",
    "definitionVn": "màu xám, màu ghi",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "Dark gray clouds brought heavy rain.",
      "He has stylish gray hair."
    ],
    "exampleTranslations": [
      "Mây xám xịt mang đến cơn mưa rào.",
      "Ông ấy có mái tóc màu xám rất phong độ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_12",
    "word": "gold",
    "phonetic": "/ɡoʊld/",
    "definition": "A deep yellow color or precious yellow metal.",
    "definitionVn": "màu vàng kim, vàng bạc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "She wore an elegant gold necklace.",
      "The morning sun was shining like gold."
    ],
    "exampleTranslations": [
      "Cô ấy đeo chiếc vòng cổ vàng quý phái.",
      "Ánh nắng ban mai tỏa sáng như vàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_13",
    "word": "silver",
    "phonetic": "/ˈsɪlvər/",
    "definition": "A precious shiny grayish-white metallic color.",
    "definitionVn": "màu bạc, ánh bạc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "She wore a shiny silver ring.",
      "The airplane has a sleek silver body."
    ],
    "exampleTranslations": [
      "Cô ấy đeo một chiếc nhẫn bạc sáng lấp lánh.",
      "Chiếc máy bay có thân màu bạc bóng bẩy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_14",
    "word": "circle",
    "phonetic": "/ˈsɜːrkl/",
    "definition": "A perfectly round flat geometric shape.",
    "definitionVn": "hình tròn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The students sat in a big circle.",
      "Draw a circle on the paper."
    ],
    "exampleTranslations": [
      "Học sinh ngồi thành vòng tròn lớn.",
      "Hãy vẽ một hình tròn trên giấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_15",
    "word": "square",
    "phonetic": "/skwer/",
    "definition": "A plane shape with 4 equal straight sides.",
    "definitionVn": "hình vuông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "A chessboard has 64 squares.",
      "Cut the paper into small squares."
    ],
    "exampleTranslations": [
      "Bàn cờ vua có 64 ô vuông.",
      "Hãy cắt giấy thành các ô vuông nhỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_16",
    "word": "triangle",
    "phonetic": "/ˈtraɪæŋɡl/",
    "definition": "A plane figure with three straight sides and three angles.",
    "definitionVn": "hình tam giác",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "A road yield sign is shaped like a triangle.",
      "Pyramids have triangular sides."
    ],
    "exampleTranslations": [
      "Biển báo giao thông hình tam giác.",
      "Kim tự tháp có các mặt hình tam giác."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_17",
    "word": "rectangle",
    "phonetic": "/ˈrektæŋɡl/",
    "definition": "A plane figure with four straight sides and four right angles.",
    "definitionVn": "hình chữ nhật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "A door is shaped like a tall rectangle.",
      "The smartphone has a rectangular screen."
    ],
    "exampleTranslations": [
      "Cánh cửa có hình chữ nhật đứng.",
      "Điện thoại có màn hình hình chữ nhật."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_18",
    "word": "star",
    "phonetic": "/stɑːr/",
    "definition": "A shape with five or more points; heavenly body.",
    "definitionVn": "hình ngôi sao, vì sao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The Vietnamese flag has a yellow star.",
      "Stars shine brightly in the night sky."
    ],
    "exampleTranslations": [
      "Quốc kỳ Việt Nam có ngôi sao vàng.",
      "Các vì sao tỏa sáng rực rỡ ban đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_19",
    "word": "heart",
    "phonetic": "/hɑːrt/",
    "definition": "A symmetrical shape representing love; bodily organ.",
    "definitionVn": "hình trái tim, quả tim",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "She drew a red heart on the birthday card.",
      "Love comes straight from the heart."
    ],
    "exampleTranslations": [
      "Cô ấy vẽ hình trái tim đỏ trên thiệp.",
      "Tình yêu bắt nguồn từ trái tim."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_20",
    "word": "round",
    "phonetic": "/raʊnd/",
    "definition": "Shaped like a circle or cylinder.",
    "definitionVn": "tròn, có dạng hình tròn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "The full moon is perfectly round.",
      "We gathered around the round dining table."
    ],
    "exampleTranslations": [
      "Mặt trăng tròn vành vạnh.",
      "Chúng tôi quây quần bên bàn ăn tròn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_colors_21",
    "word": "color",
    "phonetic": "/ˈkʌlər/",
    "definition": "The property possessed by an object of producing different sensations on the eye.",
    "definitionVn": "màu sắc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_colors_shapes",
    "themeNameVn": "Màu sắc & Hình khối",
    "themeNameEn": "Colors & Shapes",
    "examples": [
      "What is your favorite color?",
      "Flowers bring vibrant colors to life."
    ],
    "exampleTranslations": [
      "Màu sắc yêu thích của bạn là gì?",
      "Những bông hoa mang màu sắc rực rỡ đến cuộc sống."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_MAU_SAC_HINH_KHOI: VocabularyTopicPackage = {
  theme: THEME_MAU_SAC_HINH_KHOI,
  vocabs: VOCABS_MAU_SAC_HINH_KHOI,
};

export default CHUDE_MAU_SAC_HINH_KHOI;
