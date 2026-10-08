import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 59: An toàn & Luật lệ (Safety & Warning Rules)
 * Mã chủ đề: t_basic_safety_warnings_rules
 * Tổng số từ vựng: 20 từ
 */
export const THEME_AN_TOAN_LUAT_LE: BasicTheme = {
  "id": "t_basic_safety_warnings_rules",
  "name": "An toàn & Luật lệ",
  "nameEn": "Safety & Warning Rules",
  "icon": "🛡️",
  "difficulty": 1,
  "color": "#15803d",
  "description": "An toàn, cảnh báo, quy tắc, luật lệ, mũ bảo hiểm, dây an toàn và lối thoát hiểm.",
  "totalVocabs": 20
};

export const VOCABS_AN_TOAN_LUAT_LE: BasicVocabularyItem[] = [
  {
    "id": "bv_safety_01",
    "word": "safe",
    "phonetic": "/seɪf/",
    "definition": "Protected from or not exposed to danger or risk.",
    "definitionVn": "an toàn, không nguy hiểm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Always wear a helmet to stay safe on the road.",
      "The school campus is a safe and supportive learning environment."
    ],
    "exampleTranslations": [
      "Hãy luôn đội mũ bảo hiểm để giữ an toàn trên đường nhé.",
      "Khuôn viên trường học là môi trường học tập an toàn và đầy yêu thương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_02",
    "word": "danger",
    "phonetic": "/ˈdeɪndʒər/",
    "definition": "The possibility of suffering harm or injury.",
    "definitionVn": "mối nguy hiểm, sự hiểm nghèo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Warning signs alert hikers to potential mountain trail danger.",
      "Do not swim in deep rivers alone due to high danger."
    ],
    "exampleTranslations": [
      "Biển báo cảnh báo người đi bộ về mối nguy hiểm tiềm ẩn trên đường mòn vùng núi.",
      "Không bơi ở những con sông sâu một mình vì mối nguy hiểm rất cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_03",
    "word": "warning",
    "phonetic": "/ˈwɔːrnɪŋ/",
    "definition": "A statement or event that warns of something or serves as cautionary advice.",
    "definitionVn": "lời cảnh báo, biển cảnh báo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Heed weather warnings and stay indoors during thunderstorms.",
      "The yellow warning sign indicates a slippery floor."
    ],
    "exampleTranslations": [
      "Hãy chú ý đến các cảnh báo thời tiết và ở trong nhà khi có giông bão nhé.",
      "Biển cảnh báo màu vàng báo hiệu sàn nhà đang trơn trượt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_04",
    "word": "caution",
    "phonetic": "/ˈkɔːʃn/",
    "definition": "Care taken to avoid danger or mistakes.",
    "definitionVn": "sự cẩn trọng, cẩn thận",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Proceed with caution when driving on wet mountain passes.",
      "Exercise caution when crossing busy multi-lane streets."
    ],
    "exampleTranslations": [
      "Hãy di chuyển cẩn trọng khi lái xe trên các con đèo ướt nhé.",
      "Hãy hết sức cẩn thận khi băng qua những con phố nhiều làn xe đông đúc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_05",
    "word": "risk",
    "phonetic": "/rɪsk/",
    "definition": "A situation involving exposure to danger.",
    "definitionVn": "rủi ro, nguy cơ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Regular exercise lowers the risk of cardiovascular disease.",
      "Never take unnecessary risks on the road."
    ],
    "exampleTranslations": [
      "Tập thể dục đều đặn giúp làm giảm nguy cơ mắc bệnh tim mạch.",
      "Không bao giờ mạo hiểm chấp nhận những rủi ro không đáng có trên đường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_06",
    "word": "rule",
    "phonetic": "/ruːl/",
    "definition": "One of a set of explicit or understood regulations or principles governing conduct.",
    "definitionVn": "quy tắc, luật lệ, nội quy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Follow library rules and keep your voice quiet.",
      "Obey all traffic safety rules to protect yourself and others."
    ],
    "exampleTranslations": [
      "Tuân thủ nội quy thư viện và giữ trật tự nhé.",
      "Hãy chấp hành mọi luật an toàn giao thông để bảo vệ bản thân và mọi người."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_07",
    "word": "law",
    "phonetic": "/lɔː/",
    "definition": "The system of rules which a particular country or community recognizes as regulating the actions of its members.",
    "definitionVn": "pháp luật, luật pháp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Everyone must abide by the law equally.",
      "Traffic laws require drivers to stop at red lights."
    ],
    "exampleTranslations": [
      "Mọi người đều phải bình đẳng tuân theo pháp luật.",
      "Luật giao thông yêu cầu người lái xe phải dừng lại khi đèn đỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_08",
    "word": "stop",
    "phonetic": "/stɑːp/",
    "definition": "Come to an end; cease moving.",
    "definitionVn": "dừng lại, dừng hẳn",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Stop your vehicle completely at the red traffic light.",
      "Stop and look both ways before stepping off the curb."
    ],
    "exampleTranslations": [
      "Hãy dừng hẳn phương tiện khi có đèn giao thông màu đỏ nhé.",
      "Dừng lại và quan sát cả hai bên trước khi bước xuống lòng đường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_09",
    "word": "yield",
    "phonetic": "/jiːld/",
    "definition": "Give way to arguments, demands, or traffic.",
    "definitionVn": "nhường đường, nhường quyền ưu tiên",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Drivers must yield the right of way to pedestrians on the crosswalk.",
      "Yield to emergency ambulances with flashing sirens."
    ],
    "exampleTranslations": [
      "Người lái xe phải nhường đường cho người đi bộ trên vạch kẻ đường.",
      "Hãy nhường đường cho xe cấp cứu đang bật còi ưu tiên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_10",
    "word": "crosswalk",
    "phonetic": "/ˈkrɔːswɔːk/",
    "definition": "A marked part of a road where pedestrians have right of way to cross.",
    "definitionVn": "vạch kẻ đường cho người đi bộ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Always cross the busy avenue at the pedestrian crosswalk.",
      "Wait until vehicles stop before stepping onto the crosswalk."
    ],
    "exampleTranslations": [
      "Hãy luôn băng qua đại lộ đông đúc tại vạch kẻ đường cho người đi bộ nhé.",
      "Hãy đợi cho đến khi các xe dừng hẳn trước khi bước lên vạch đi bộ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_11",
    "word": "helmet",
    "phonetic": "/ˈhelmɪt/",
    "definition": "A hard or padded protective hat, worn by motor riders or construction workers.",
    "definitionVn": "mũ bảo hiểm (an toàn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Fasten your certified helmet strap securely before riding a motorbike.",
      "Wearing a helmet reduces head injury risk dramatically."
    ],
    "exampleTranslations": [
      "Cài chặt quai mũ bảo hiểm đạt chuẩn trước khi đi xe máy nhé.",
      "Đội mũ bảo hiểm giúp giảm đáng kể nguy cơ chấn thương vùng đầu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_12",
    "word": "seatbelt",
    "phonetic": "/ˈsiːtbelt/",
    "definition": "A belt securing a person to a seat in a vehicle or aircraft in case of an accident.",
    "definitionVn": "dây an toàn (trên xe, máy bay)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Buckle your seatbelt as soon as you sit in a car.",
      "The law requires all passengers in vehicles to wear seatbelts."
    ],
    "exampleTranslations": [
      "Cài dây an toàn ngay khi bạn ngồi vào ghế ô tô nhé.",
      "Pháp luật quy định tất cả hành khách trên xe đều phải thắt dây an toàn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_13",
    "word": "exit",
    "phonetic": "/ˈeɡzɪt/",
    "definition": "A way out, especially of a public building, room, or passenger vehicle.",
    "definitionVn": "lối thoát hiểm, cửa ra",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Emergency exit signs glow bright green in the dark.",
      "Locate the nearest emergency exit when you enter a building."
    ],
    "exampleTranslations": [
      "Biển báo lối thoát hiểm phát sáng màu xanh lá cây trong bóng tối.",
      "Hãy xác định lối thoát hiểm gần nhất khi bạn bước vào một tòa nhà nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_14",
    "word": "emergency",
    "phonetic": "/iˈmɜːrdʒənsi/",
    "definition": "A serious, unexpected, and often dangerous situation requiring immediate action.",
    "definitionVn": "tình huống khẩn cấp, trường hợp cấp cứu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Dial emergency hotline numbers immediately in crisis situations.",
      "Keep an emergency first-aid kit in your home."
    ],
    "exampleTranslations": [
      "Hãy gọi các số đường dây nóng khẩn cấp ngay lập tức trong các tình huống nguy cấp.",
      "Giữ một bộ dụng cụ sơ cứu khẩn cấp trong nhà của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_15",
    "word": "fire extinguisher",
    "phonetic": "/ˈfaɪər ɪkˈstɪŋɡwɪʃər/",
    "definition": "A portable device that discharges a jet of water, foam, or gas to extinguish a fire.",
    "definitionVn": "bình chữa cháy (cầm tay)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Every floor has a red fire extinguisher mounted on the wall.",
      "Learn how to operate a fire extinguisher using the PASS technique."
    ],
    "exampleTranslations": [
      "Mỗi tầng đều có một bình chữa cháy màu đỏ gắn trên tường.",
      "Hãy học cách sử dụng bình chữa cháy theo đúng kỹ thuật nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_16",
    "word": "first aid",
    "phonetic": "/fɜːrst eɪd/",
    "definition": "Help given to a sick or injured person until full medical treatment is available.",
    "definitionVn": "sơ cứu ban đầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Knowing basic first aid skills can save someone's life in an accident.",
      "Clean the scrape and apply first aid ointment."
    ],
    "exampleTranslations": [
      "Biết những kỹ năng sơ cứu cơ bản có thể cứu mạng một ai đó trong tai nạn.",
      "Rửa sạch vết trầy và bôi thuốc mỡ sơ cứu nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_17",
    "word": "protect",
    "phonetic": "/prəˈtekt/",
    "definition": "Keep safe from harm or injury.",
    "definitionVn": "bảo vệ, che chở",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Wear sunscreen and sunglasses to protect your skin and eyes.",
      "Parents protect their children with loving care."
    ],
    "exampleTranslations": [
      "Thoa kem chống nắng và đeo kính râm để bảo vệ làn da và đôi mắt nhé.",
      "Cha mẹ che chở bảo vệ con cái bằng tình yêu thương ân cần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_18",
    "word": "prevent",
    "phonetic": "/prɪˈvent/",
    "definition": "Keep something from happening or arising.",
    "definitionVn": "ngăn chặn, phòng ngừa",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Proper handwashing helps prevent the spread of infectious illnesses.",
      "Prevention is always better and wiser than cure."
    ],
    "exampleTranslations": [
      "Rửa tay đúng cách giúp phòng ngừa sự lây lan của các bệnh truyền nhiễm.",
      "Phòng ngừa luôn luôn tốt hơn và khôn ngoan hơn chữa trị."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_19",
    "word": "guard",
    "phonetic": "/ɡɑːrd/",
    "definition": "Watch over in order to protect or control.",
    "definitionVn": "người bảo vệ, canh gác",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "The security guard greeted students at the school entrance.",
      "Lighthouses guard ships against dangerous rocky reefs."
    ],
    "exampleTranslations": [
      "Bác bảo vệ chào đón các bạn học sinh tại cổng trường.",
      "Những ngọn hải đăng canh gác bảo vệ tàu bè khỏi các rạn đá ngầm nguy hiểm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_safety_20",
    "word": "security",
    "phonetic": "/sɪˈkjʊrəti/",
    "definition": "The state of being free from danger or threat; safety precautions.",
    "definitionVn": "sự an ninh, an toàn bảo mật",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_safety_warnings_rules",
    "themeNameVn": "An toàn & Luật lệ",
    "themeNameEn": "Safety & Warning Rules",
    "examples": [
      "Strong passwords enhance your digital account security.",
      "Airport security screens all luggage for passenger safety."
    ],
    "exampleTranslations": [
      "Mật khẩu mạnh nâng cao tính an toàn bảo mật cho tài khoản số của bạn.",
      "An ninh sân bay kiểm tra mọi hành lý vì sự an toàn của hành khách."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_AN_TOAN_LUAT_LE: VocabularyTopicPackage = {
  theme: THEME_AN_TOAN_LUAT_LE,
  vocabs: VOCABS_AN_TOAN_LUAT_LE,
};

export default CHUDE_AN_TOAN_LUAT_LE;
