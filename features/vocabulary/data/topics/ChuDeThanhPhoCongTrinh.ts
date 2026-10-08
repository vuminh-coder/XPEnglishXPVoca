import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 25: Thành phố & Công trình (City & Buildings)
 * Mã chủ đề: t_basic_city_buildings
 * Tổng số từ vựng: 20 từ
 */
export const THEME_THANH_PHO_CONG_TRINH: BasicTheme = {
  "id": "t_basic_city_buildings",
  "name": "Thành phố & Công trình",
  "nameEn": "City & Buildings",
  "icon": "🏙️",
  "difficulty": 1,
  "color": "#7c3aed",
  "description": "Tòa nhà, cầu đường, quảng trường, bảo tàng và các công trình đô thị.",
  "totalVocabs": 20
};

export const VOCABS_THANH_PHO_CONG_TRINH: BasicVocabularyItem[] = [
  {
    "id": "bv_city_b_01",
    "word": "city",
    "phonetic": "/ˈsɪti/",
    "definition": "A large town.",
    "definitionVn": "thành phố, đô thị lớn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Da Nang is a livable and scenic coastal city.",
      "Public transit makes traveling in the city easy."
    ],
    "exampleTranslations": [
      "Đà Nẵng là thành phố biển đáng sống và thơ mộng.",
      "Giao thông công cộng giúp việc đi lại trong thành phố rất dễ dàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_02",
    "word": "town",
    "phonetic": "/taʊn/",
    "definition": "An urban area that has a name, defined boundaries, and local government, and is generally larger than a village.",
    "definitionVn": "thị trấn, thị xã",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Hoi An is an enchanting ancient town with yellow walls.",
      "We walked through the peaceful streets of the small town."
    ],
    "exampleTranslations": [
      "Hội An là một phố cổ quyến rũ với những bức tường vàng.",
      "Chúng tôi đi dạo qua những con phố thanh bình của thị trấn nhỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_03",
    "word": "village",
    "phonetic": "/ˈvɪlɪdʒ/",
    "definition": "A group of houses and associated buildings, situated in a rural area.",
    "definitionVn": "ngôi làng, làng quê",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Life in the peaceful countryside village is calm and fresh.",
      "Bat Trang is a traditional ceramic craft village."
    ],
    "exampleTranslations": [
      "Cuộc sống ở làng quê thanh bình rất êm đềm và trong lành.",
      "Bát Tràng là làng nghề gốm sứ truyền thống."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_04",
    "word": "building",
    "phonetic": "/ˈbɪldɪŋ/",
    "definition": "A structure with a roof and walls, such as a house or factory.",
    "definitionVn": "tòa nhà, công trình xây dựng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Landmark 81 is the tallest building in Vietnam.",
      "The office building has twenty-five floors."
    ],
    "exampleTranslations": [
      "Landmark 81 là tòa nhà cao nhất Việt Nam.",
      "Tòa nhà văn phòng có hai mươi lăm tầng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_05",
    "word": "apartment",
    "phonetic": "/əˈpɑːrtmənt/",
    "definition": "A suite of rooms forming one separate residence, typically in a block.",
    "definitionVn": "căn hộ chung cư",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "They rented a modern two-bedroom apartment with a balcony.",
      "The apartment has a scenic view of the river."
    ],
    "exampleTranslations": [
      "Họ đã thuê một căn hộ hai phòng ngủ hiện đại có ban công.",
      "Căn hộ có tầm nhìn tuyệt đẹp ra bờ sông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_06",
    "word": "skyscraper",
    "phonetic": "/ˈskaɪskreɪpər/",
    "definition": "A very tall building of many stories.",
    "definitionVn": "tòa nhà chọc trời",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Modern skyscrapers illuminate the night skyline of the metropolis.",
      "High-speed elevators take you to the top of the skyscraper."
    ],
    "exampleTranslations": [
      "Những tòa nhà chọc trời hiện đại thắp sáng đường chân trời đêm đô thị.",
      "Thang máy tốc độ cao đưa bạn lên đỉnh tòa nhà chọc trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_07",
    "word": "tower",
    "phonetic": "/ˈtaʊər/",
    "definition": "A tall, narrow building, either freestanding or forming part of a building.",
    "definitionVn": "tòa tháp, ngọn tháp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "The clock tower in the town center rings every hour.",
      "Tourists climbed the observation tower for a panoramic view."
    ],
    "exampleTranslations": [
      "Tháp đồng hồ ở trung tâm thị trấn reo chuông mỗi giờ.",
      "Du khách trèo lên tháp quan sát để ngắm toàn cảnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_08",
    "word": "bridge",
    "phonetic": "/brɪdʒ/",
    "definition": "A structure carrying a road, path, railway, or canal across a river or ravine.",
    "definitionVn": "cây cầu (bắc qua sông)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "The Dragon Bridge in Da Nang breathes fire on weekend nights.",
      "Walk across the pedestrian bridge safely."
    ],
    "exampleTranslations": [
      "Cầu Rồng ở Đà Nẵng phun lửa vào các tối cuối tuần.",
      "Đi bộ qua cầu dành cho người đi bộ an toàn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_09",
    "word": "square",
    "phonetic": "/skwer/",
    "definition": "An open, typically four-sided, area surrounded by buildings in a town.",
    "definitionVn": "quảng trường (trung tâm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Thousands gathered in Ba Dinh Square for the national celebration.",
      "Pigeons flock in the historic town square."
    ],
    "exampleTranslations": [
      "Hàng ngàn người tề tựu tại Quảng trường Ba Đình trong ngày lễ lớn.",
      "Những chú chim bồ câu tụ tập ở quảng trường cổ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_10",
    "word": "museum",
    "phonetic": "/mjuˈziːəm/",
    "definition": "A building in which objects of historical, scientific, artistic, or cultural interest are stored.",
    "definitionVn": "bảo tàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "The National Museum displays ancient bronze drums.",
      "Visiting a museum broadens your cultural knowledge."
    ],
    "exampleTranslations": [
      "Bảo tàng Quốc gia trưng bày những chiếc trống đồng cổ.",
      "Tham quan bảo tàng giúp mở rộng kiến thức văn hóa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_11",
    "word": "theater",
    "phonetic": "/ˈθiːətər/",
    "definition": "A building or outdoor area in which plays and other dramatic performances are given.",
    "definitionVn": "nhà hát, rạp kịch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Hanoi Opera House is a magnificent classical theater.",
      "We watched a Shakespeare play at the theater."
    ],
    "exampleTranslations": [
      "Nhà hát Lớn Hà Nội là một nhà hát cổ điển tráng lệ.",
      "Chúng tôi đã xem một vở kịch của Shakespeare tại nhà hát."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_12",
    "word": "stadium",
    "phonetic": "/ˈsteɪdiəm/",
    "definition": "A sports ground with tiers of seats for spectators.",
    "definitionVn": "sân vận động",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "My Dinh National Stadium was packed with enthusiastic football fans.",
      "The rock concert was held at the stadium."
    ],
    "exampleTranslations": [
      "Sân vận động Quốc gia Mỹ Đình chật kín người hâm mộ bóng đá cuồng nhiệt.",
      "Buổi hòa nhạc rock được tổ chức tại sân vận động."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_13",
    "word": "post office",
    "phonetic": "/ˈpoʊst ɑːfɪs/",
    "definition": "A building where postal business is transacted and where mail is collected and sorted.",
    "definitionVn": "bưu điện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Saigon Central Post Office is a famous French colonial landmark.",
      "I mailed a postcard to my pen pal at the post office."
    ],
    "exampleTranslations": [
      "Bưu điện Trung tâm Sài Gòn là công trình kiến trúc Pháp nổi tiếng.",
      "Tôi đã gửi bưu thiếp cho bạn qua thư tại bưu điện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_14",
    "word": "police station",
    "phonetic": "/pəˈliːs ˈsteɪʃn/",
    "definition": "The office or headquarters of a local police force.",
    "definitionVn": "đồn cảnh sát, trụ sở công an",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Report a lost passport immediately to the nearest police station.",
      "The police station is on the corner of the street."
    ],
    "exampleTranslations": [
      "Hãy báo việc mất hộ chiếu ngay cho đồn cảnh sát gần nhất.",
      "Đồn công an nằm ở ngay góc con đường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_15",
    "word": "fire station",
    "phonetic": "/ˈfaɪər ˈsteɪʃn/",
    "definition": "A building where fire engines are kept and where firefighters stay when on duty.",
    "definitionVn": "trạm cứu hỏa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Fire engines rushed out of the fire station with sirens blazing.",
      "The local fire station is on standby 24/7."
    ],
    "exampleTranslations": [
      "Những chiếc xe cứu hỏa lao ra khỏi trạm cứu hỏa cùng tiếng còi báo động.",
      "Trạm cứu hỏa địa phương túc trực 24/7."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_16",
    "word": "zoo",
    "phonetic": "/zuː/",
    "definition": "An establishment which maintains a collection of wild animals for study or display to the public.",
    "definitionVn": "vườn thú, sở thú",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Children love seeing giraffes and playful monkeys at the zoo.",
      "The zoo protects endangered wildlife species."
    ],
    "exampleTranslations": [
      "Trẻ em rất thích ngắm hươu cao cổ và những chú khỉ tinh nghịch ở sở thú.",
      "Vườn thú bảo tồn các loài động vật hoang dã có nguy cơ tuyệt chủng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_17",
    "word": "road",
    "phonetic": "/roʊd/",
    "definition": "A wide way leading from one place to another, especially one with a specially prepared surface.",
    "definitionVn": "con đường, đường sá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "The coastal road offers stunning ocean views.",
      "Drive carefully on wet and slippery roads."
    ],
    "exampleTranslations": [
      "Con đường ven biển mở ra khung cảnh đại dương tuyệt đẹp.",
      "Hãy lái xe cẩn thận trên những cung đường ướt trơn trượt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_18",
    "word": "crosswalk",
    "phonetic": "/ˈkrɔːswɔːk/",
    "definition": "A marked part of a road where pedestrians have right of way to cross.",
    "definitionVn": "vạch kẻ đường cho người đi bộ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Always cross the busy road at the pedestrian crosswalk.",
      "Vehicles must yield to people on the crosswalk."
    ],
    "exampleTranslations": [
      "Luôn luôn băng qua đường đông đúc tại vạch kẻ dành cho người đi bộ nhé.",
      "Các phương tiện phải nhường đường cho người trên vạch đi bộ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_19",
    "word": "traffic light",
    "phonetic": "/ˈtræfɪk laɪt/",
    "definition": "A set of automatically operated colored lights, typically red, amber, and green, for controlling traffic.",
    "definitionVn": "đèn tín hiệu giao thông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "Stop when the traffic light is red; go when it turns green.",
      "Wait patiently at the traffic light intersection."
    ],
    "exampleTranslations": [
      "Dừng lại khi đèn giao thông màu đỏ; đi khi đèn chuyển xanh.",
      "Hãy kiên nhẫn đợi ở nút giao có đèn giao thông nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_city_b_20",
    "word": "corner",
    "phonetic": "/ˈkɔːrnər/",
    "definition": "A place or angle where two or more sides or edges meet.",
    "definitionVn": "góc phố, góc đường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_city_buildings",
    "themeNameVn": "Thành phố & Công trình",
    "themeNameEn": "City & Buildings",
    "examples": [
      "There is a cozy coffee shop right on the corner.",
      "Turn right at the street corner."
    ],
    "exampleTranslations": [
      "Có một quán cà phê ấm cúng ngay tại góc phố.",
      "Hãy rẽ phải tại góc đường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_THANH_PHO_CONG_TRINH: VocabularyTopicPackage = {
  theme: THEME_THANH_PHO_CONG_TRINH,
  vocabs: VOCABS_THANH_PHO_CONG_TRINH,
};

export default CHUDE_THANH_PHO_CONG_TRINH;
