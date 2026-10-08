import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 31: Đo lường & Kích cỡ (Measurements & Sizes)
 * Mã chủ đề: t_basic_measurements_sizes
 * Tổng số từ vựng: 20 từ
 */
export const THEME_DO_LUONG_KICH_CO: BasicTheme = {
  "id": "t_basic_measurements_sizes",
  "name": "Đo lường & Kích cỡ",
  "nameEn": "Measurements & Sizes",
  "icon": "📏",
  "difficulty": 1,
  "color": "#0284c7",
  "description": "Mét, ki-lô-gam, lít, chiều cao, cân nặng, độ dài, độ dày mỏng.",
  "totalVocabs": 20
};

export const VOCABS_DO_LUONG_KICH_CO: BasicVocabularyItem[] = [
  {
    "id": "bv_measur_01",
    "word": "meter",
    "phonetic": "/ˈmiːtər/",
    "definition": "The fundamental unit of length in the metric system (100 cm).",
    "definitionVn": "mét (đơn vị đo độ dài)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "The swimming pool is fifty meters long.",
      "He is one meter and seventy-five centimeters tall."
    ],
    "exampleTranslations": [
      "Hồ bơi dài năm mươi mét.",
      "Anh ấy cao một mét bảy mươi lăm phân."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_02",
    "word": "kilometer",
    "phonetic": "/kɪˈlɑːmɪtər/",
    "definition": "A metric unit of measurement equal to 1,000 meters.",
    "definitionVn": "ki-lô-mét, cây số (1.000m)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "She runs five kilometers around the lake every morning.",
      "The distance between the two cities is 100 kilometers."
    ],
    "exampleTranslations": [
      "Cô ấy chạy bộ 5 cây số quanh hồ mỗi sáng.",
      "Khoảng cách giữa hai thành phố là 100 ki-lô-mét."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_03",
    "word": "centimeter",
    "phonetic": "/ˈsentɪmiːtər/",
    "definition": "A metric unit of length, equal to one hundredth of a meter.",
    "definitionVn": "xăng-ti-mét, phân (cm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Use a 30-centimeter ruler to draw straight lines.",
      "The baby grew three centimeters this month."
    ],
    "exampleTranslations": [
      "Dùng thước kẻ 30 xăng-ti-mét để vẽ các đường thẳng.",
      "Em bé đã cao thêm ba phân trong tháng này."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_04",
    "word": "inch",
    "phonetic": "/ɪntʃ/",
    "definition": "A unit of linear measure equal to 2.54 centimeters.",
    "definitionVn": "inch (đơn vị đo, ~2.54 cm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "My new laptop has a 14-inch display screen.",
      "The smartphone screen is 6.5 inches wide."
    ],
    "exampleTranslations": [
      "Chiếc máy tính xách tay mới của tôi có màn hình hiển thị 14 inch.",
      "Màn hình điện thoại thông minh rộng 6.5 inch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_05",
    "word": "gram",
    "phonetic": "/ɡræm/",
    "definition": "A metric unit of mass equal to one thousandth of a kilogram.",
    "definitionVn": "gam (đơn vị đo khối lượng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Add 200 grams of white sugar to the cake mixture.",
      "A single paperclip weighs about one gram."
    ],
    "exampleTranslations": [
      "Thêm 200 gam đường trắng vào hỗn hợp bánh.",
      "Một chiếc kẹp giấy nặng khoảng một gam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_06",
    "word": "kilogram",
    "phonetic": "/ˈkɪləɡræm/",
    "definition": "The SI unit of mass equivalent to 1,000 grams.",
    "definitionVn": "ki-lô-gam, ký (kg)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "I bought two kilograms of sweet fresh oranges.",
      "He lost three kilograms by exercising daily."
    ],
    "exampleTranslations": [
      "Tôi đã mua hai ki-lô-gam cam tươi ngọt.",
      "Anh ấy đã giảm ba ký nhờ tập thể dục hàng ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_07",
    "word": "liter",
    "phonetic": "/ˈliːtər/",
    "definition": "A metric unit of capacity, formerly defined as the volume of 1 kilogram of water.",
    "definitionVn": "lít (đơn vị đo thể tích chất lỏng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Drink at least two liters of fresh water every day.",
      "We bought a one-liter bottle of milk."
    ],
    "exampleTranslations": [
      "Hãy uống ít nhất hai lít nước lọc mỗi ngày nhé.",
      "Chúng tôi đã mua một chai sữa một lít."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_08",
    "word": "size",
    "phonetic": "/saɪz/",
    "definition": "The relative extent of something; a dimensions or magnitude.",
    "definitionVn": "kích cỡ, kích thước, cỡ áo/giày",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "What shoe size do you wear? — I wear size 40.",
      "This shirt comes in small, medium, and large sizes."
    ],
    "exampleTranslations": [
      "Bạn đi giày cỡ bao nhiêu? — Tôi đi cỡ 40.",
      "Chiếc áo này có các cỡ nhỏ, vừa và lớn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_09",
    "word": "height",
    "phonetic": "/haɪt/",
    "definition": "The measurement from base to top or of a person standing.",
    "definitionVn": "chiều cao, độ cao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "What is your height? — I am 1.70 meters.",
      "The mountain peak reaches a height of over 3,000 meters."
    ],
    "exampleTranslations": [
      "Chiều cao của bạn là bao nhiêu? — Tôi cao 1m70.",
      "Đỉnh núi đạt độ cao hơn 3.000 mét."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_10",
    "word": "weight",
    "phonetic": "/weɪt/",
    "definition": "A body's relative mass or the quantity of matter contained by it.",
    "definitionVn": "cân nặng, trọng lượng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Check your body weight on the bathroom scale.",
      "The maximum luggage weight for the flight is 20 kg."
    ],
    "exampleTranslations": [
      "Kiểm tra cân nặng cơ thể trên cân phòng tắm nhé.",
      "Trọng lượng hành lý tối đa cho chuyến bay là 20 kg."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_11",
    "word": "length",
    "phonetic": "/leŋkθ/",
    "definition": "The measurement or extent of something from end to end.",
    "definitionVn": "chiều dài, độ dài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Measure the length of the wooden table with a tape.",
      "The total length of the river is 500 kilometers."
    ],
    "exampleTranslations": [
      "Đo chiều dài chiếc bàn gỗ bằng thước dây nhé.",
      "Tổng chiều dài của con sông là 500 cây số."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_12",
    "word": "width",
    "phonetic": "/wɪdθ/",
    "definition": "The measurement or extent of something from side to side.",
    "definitionVn": "chiều rộng, bề ngang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "The width of the room allows for a king-size bed.",
      "Measure the length and width before buying carpet."
    ],
    "exampleTranslations": [
      "Chiều rộng của căn phòng cho phép đặt một chiếc giường lớn.",
      "Hãy đo chiều dài và chiều rộng trước khi mua thảm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_13",
    "word": "depth",
    "phonetic": "/depθ/",
    "definition": "The distance from the top or surface to the bottom of something.",
    "definitionVn": "độ sâu, chiều sâu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "The maximum depth of the swimming pool is two meters.",
      "Divers explored the ocean depths."
    ],
    "exampleTranslations": [
      "Độ sâu tối đa của hồ bơi là hai mét.",
      "Các thợ lặn đã khám phá những vùng sâu của đại dương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_14",
    "word": "heavy",
    "phonetic": "/ˈhevi/",
    "definition": "Of great weight; difficult to lift or move.",
    "definitionVn": "nặng, nặng nề",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "This suitcase is too heavy for me to carry alone.",
      "Elephants are heavy land mammals."
    ],
    "exampleTranslations": [
      "Chiếc vali này quá nặng để tôi có thể tự xách một mình.",
      "Voi là loài động vật có vú trên cạn nặng ký."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_15",
    "word": "light",
    "phonetic": "/laɪt/",
    "definition": "Of little weight; not heavy.",
    "definitionVn": "nhẹ, nhẹ nhàng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "The feather is extremely light.",
      "This new laptop is super light and portable."
    ],
    "exampleTranslations": [
      "Chiếc lông vũ cực kỳ nhẹ.",
      "Chiếc máy tính xách tay mới này siêu nhẹ và tiện mang theo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_16",
    "word": "deep",
    "phonetic": "/diːp/",
    "definition": "Extending far down from the top or surface.",
    "definitionVn": "sâu, sâu thẳm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Do not swim in deep water without a life jacket.",
      "The well is very deep and provides cool water."
    ],
    "exampleTranslations": [
      "Đừng bơi ở vùng nước sâu mà không có áo phao nhé.",
      "Chiếc giếng rất sâu và cho nguồn nước mát lạnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_17",
    "word": "shallow",
    "phonetic": "/ˈʃæloʊ/",
    "definition": "Of little depth; not deep.",
    "definitionVn": "nông, cạn (vùng nước)",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Children can play safely in the shallow pool.",
      "The river is shallow enough to wade across."
    ],
    "exampleTranslations": [
      "Trẻ em có thể chơi an toàn ở khu hồ bơi nông.",
      "Con sông đủ nông để có thể lội qua."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_18",
    "word": "thick",
    "phonetic": "/θɪk/",
    "definition": "With opposite sides relatively far apart; not thin.",
    "definitionVn": "dày, đậm đặc",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Wear a thick wool jacket in winter.",
      "This English dictionary is very thick."
    ],
    "exampleTranslations": [
      "Hãy mặc một chiếc áo khoác len dày vào mùa đông nhé.",
      "Cuốn từ điển tiếng Anh này rất dày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_19",
    "word": "thin",
    "phonetic": "/θɪn/",
    "definition": "Having opposite surfaces or sides that are close together; of little thickness.",
    "definitionVn": "mỏng, mảnh mai",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Cut the cheese into thin slices.",
      "She wore a thin cotton shirt on the hot day."
    ],
    "exampleTranslations": [
      "Cắt phô mai thành những lát mỏng nhé.",
      "Cô ấy mặc chiếc áo cotton mỏng vào ngày nắng nóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_measur_20",
    "word": "measure",
    "phonetic": "/ˈmeʒər/",
    "definition": "Ascertain the size, amount, or degree of something by using an instrument or device.",
    "definitionVn": "đo đạc, cân đo",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_measurements_sizes",
    "themeNameVn": "Đo lường & Kích cỡ",
    "themeNameEn": "Measurements & Sizes",
    "examples": [
      "Measure your ingredients accurately before baking.",
      "The doctor measured the patient's temperature."
    ],
    "exampleTranslations": [
      "Hãy đo lường các nguyên liệu chính xác trước khi nướng bánh nhé.",
      "Bác sĩ đã đo nhiệt độ cho bệnh nhân."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_DO_LUONG_KICH_CO: VocabularyTopicPackage = {
  theme: THEME_DO_LUONG_KICH_CO,
  vocabs: VOCABS_DO_LUONG_KICH_CO,
};

export default CHUDE_DO_LUONG_KICH_CO;
