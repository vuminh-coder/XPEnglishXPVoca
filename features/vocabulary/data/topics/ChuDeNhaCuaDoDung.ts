import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 6: Nhà cửa & Đồ dùng (Home & Daily Objects)
 * Mã chủ đề: t_basic_home_objects
 * Tổng số từ vựng: 24 từ
 */
export const THEME_NHA_CUA_DO_DUNG: BasicTheme = {
  "id": "t_basic_home_objects",
  "name": "Nhà cửa & Đồ dùng",
  "nameEn": "Home & Daily Objects",
  "icon": "🏠",
  "difficulty": 1,
  "color": "#10b981",
  "description": "Các phòng trong nhà, đồ nội thất và vật dụng sinh hoạt hàng ngày.",
  "totalVocabs": 24
};

export const VOCABS_NHA_CUA_DO_DUNG: BasicVocabularyItem[] = [
  {
    "id": "bv_home_o_01",
    "word": "house",
    "phonetic": "/haʊs/",
    "definition": "A building for human habitation.",
    "definitionVn": "ngôi nhà (công trình nhà ở)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "They bought a new house with a garden.",
      "Welcome to our house!"
    ],
    "exampleTranslations": [
      "Họ mua nhà mới có vườn.",
      "Chào mừng đến thăm nhà chúng tôi!"
    ],
    "synonyms": [
      "home"
    ],
    "antonyms": []
  },
  {
    "id": "bv_home_o_02",
    "word": "home",
    "phonetic": "/hoʊm/",
    "definition": "The place where one lives permanently, especially as a member of a family.",
    "definitionVn": "mái ấm gia đình, tổ ấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "There is no place like home.",
      "I feel safe and warm at home."
    ],
    "exampleTranslations": [
      "Không nơi đâu bằng mái ấm gia đình.",
      "Tôi thấy an toàn và ấm áp khi ở nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_03",
    "word": "room",
    "phonetic": "/ruːm/",
    "definition": "A division of a building enclosed by walls.",
    "definitionVn": "căn phòng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "My bedroom is bright and clean.",
      "There are four rooms in the flat."
    ],
    "exampleTranslations": [
      "Phòng ngủ của tôi sáng sủa.",
      "Có bốn phòng trong căn hộ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_04",
    "word": "living room",
    "phonetic": "/ˈlɪvɪŋ ruːm/",
    "definition": "A room in a house for general everyday use.",
    "definitionVn": "phòng khách",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "We watch TV in the living room.",
      "The living room has a comfortable sofa."
    ],
    "exampleTranslations": [
      "Chúng tôi xem tivi ở phòng khách.",
      "Phòng khách có bộ ghế sô pha êm ái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_05",
    "word": "bedroom",
    "phonetic": "/ˈbedruːm/",
    "definition": "A room used for sleeping in.",
    "definitionVn": "phòng ngủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "I read books in my quiet bedroom.",
      "She painted her bedroom walls sky blue."
    ],
    "exampleTranslations": [
      "Tôi đọc sách trong phòng ngủ yên tĩnh.",
      "Cô ấy sơn tường phòng ngủ màu xanh da trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_06",
    "word": "kitchen",
    "phonetic": "/ˈkɪtʃɪn/",
    "definition": "A room where food is prepared and cooked.",
    "definitionVn": "nhà bếp, phòng bếp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Mom is cooking dinner in the kitchen.",
      "The kitchen is equipped with modern tools."
    ],
    "exampleTranslations": [
      "Mẹ đang nấu bữa tối trong bếp.",
      "Gian bếp được trang bị tiện nghi hiện đại."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_07",
    "word": "bathroom",
    "phonetic": "/ˈbæθruːm/",
    "definition": "A room containing a bath or shower and usually a washbasin and toilet.",
    "definitionVn": "phòng tắm, nhà vệ sinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Wash your hands in the bathroom.",
      "The bathroom is very clean and dry."
    ],
    "exampleTranslations": [
      "Hãy rửa tay trong phòng tắm nhé.",
      "Phòng tắm rất sạch sẽ và khô ráo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_08",
    "word": "door",
    "phonetic": "/dɔːr/",
    "definition": "A hinged barrier at the entrance to a room or building.",
    "definitionVn": "cửa ra vào, cánh cửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Please knock on the door.",
      "He locked the front door."
    ],
    "exampleTranslations": [
      "Làm ơn gõ cửa trước khi vào.",
      "Anh ấy đã khóa cửa chính."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_09",
    "word": "window",
    "phonetic": "/ˈwɪndoʊ/",
    "definition": "An opening in a wall fitted with glass.",
    "definitionVn": "cửa sổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Open the window for fresh air.",
      "She looked out the window."
    ],
    "exampleTranslations": [
      "Mở cửa sổ cho thoáng khí nhé.",
      "Cô ấy nhìn ra ngoài cửa sổ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_10",
    "word": "table",
    "phonetic": "/ˈteɪbl/",
    "definition": "A piece of furniture with a flat top and legs.",
    "definitionVn": "cái bàn (bàn ăn, bàn làm việc)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Dinner is ready on the table.",
      "Put the books on the study table."
    ],
    "exampleTranslations": [
      "Bữa tối đã sẵn sàng trên bàn.",
      "Hãy để sách lên bàn học nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_11",
    "word": "chair",
    "phonetic": "/tʃer/",
    "definition": "A separate seat for one person with a back.",
    "definitionVn": "cái ghế (ghế tựa)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Pull up a chair and sit down.",
      "This wooden chair is comfortable."
    ],
    "exampleTranslations": [
      "Kéo ghế lại và ngồi xuống đi.",
      "Chiếc ghế gỗ này rất thoải mái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_12",
    "word": "bed",
    "phonetic": "/bed/",
    "definition": "A piece of furniture for sleep or rest.",
    "definitionVn": "chiếc giường ngủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "I go to bed at 10 PM.",
      "Make your bed every morning."
    ],
    "exampleTranslations": [
      "Tôi đi ngủ lúc 10h đêm.",
      "Dọn dẹp giường ngủ mỗi sáng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_13",
    "word": "desk",
    "phonetic": "/desk/",
    "definition": "A table used for reading, writing, or working.",
    "definitionVn": "bàn học, bàn làm việc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "My computer is on my study desk.",
      "Keep your desk tidy and organized."
    ],
    "exampleTranslations": [
      "Máy tính đặt trên bàn học của tôi.",
      "Giữ bàn làm việc ngăn nắp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_14",
    "word": "sofa",
    "phonetic": "/ˈsoʊfə/",
    "definition": "A long comfortable seat with a back and arms.",
    "definitionVn": "ghế sô pha, ghế bành",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "We relaxed on the sofa after work.",
      "The cat loves napping on the sofa."
    ],
    "exampleTranslations": [
      "Chúng tôi thư giãn trên sô pha sau giờ làm.",
      "Chú mèo thích chợp mắt trên ghế sô pha."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_15",
    "word": "lamp",
    "phonetic": "/læmp/",
    "definition": "A device for giving light.",
    "definitionVn": "cây đèn, đèn bàn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Turn on the study lamp to read.",
      "She bought a modern bedside lamp."
    ],
    "exampleTranslations": [
      "Bật đèn học lên để đọc sách nhé.",
      "Cô ấy mua cây đèn ngủ đầu giường hiện đại."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_16",
    "word": "clock",
    "phonetic": "/klɑːk/",
    "definition": "An instrument to measure and indicate time.",
    "definitionVn": "đồng hồ treo tường / để bàn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "The wall clock says exactly 8:00 AM.",
      "My alarm clock rings every morning."
    ],
    "exampleTranslations": [
      "Đồng hồ treo tường chỉ đúng 8h sáng.",
      "Đồng hồ báo thức reng mỗi buổi sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_17",
    "word": "mirror",
    "phonetic": "/ˈmɪrər/",
    "definition": "A reflective surface, now typically of glass.",
    "definitionVn": "chiếc gương soi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "She looked at herself in the mirror.",
      "There is a large mirror in the bathroom."
    ],
    "exampleTranslations": [
      "Cô ấy ngắm mình trong gương.",
      "Có một chiếc gương lớn trong phòng tắm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_18",
    "word": "fridge",
    "phonetic": "/frɪdʒ/",
    "definition": "An appliance to keep food and drinks cold.",
    "definitionVn": "tủ lạnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Put the fresh milk in the fridge.",
      "The fridge is full of vegetables and fruits."
    ],
    "exampleTranslations": [
      "Cất sữa tươi vào tủ lạnh nhé.",
      "Tủ lạnh đầy ắp rau củ và hoa quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_19",
    "word": "fan",
    "phonetic": "/fæn/",
    "definition": "An apparatus with rotating blades that creates a current of air for cooling.",
    "definitionVn": "chiếc quạt máy, quạt điện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Turn on the electric fan to cool down the room.",
      "The ceiling fan spins quietly."
    ],
    "exampleTranslations": [
      "Bật quạt điện lên cho mát phòng nhé.",
      "Chiếc quạt trần quay êm ru."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_20",
    "word": "key",
    "phonetic": "/kiː/",
    "definition": "A small metal instrument used to open or close a lock.",
    "definitionVn": "chìa khóa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Don't forget to take your house keys.",
      "She found the lost car key."
    ],
    "exampleTranslations": [
      "Đừng quên mang chìa khóa nhà nhé.",
      "Cô ấy đã tìm thấy chiếc chìa khóa xe bị mất."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_21",
    "word": "book",
    "phonetic": "/bʊk/",
    "definition": "A written or printed work bound together.",
    "definitionVn": "cuốn sách",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Reading books expands your mind.",
      "I borrowed a book from the library."
    ],
    "exampleTranslations": [
      "Đọc sách mở rộng tri thức.",
      "Tôi mượn một cuốn sách từ thư viện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_22",
    "word": "pen",
    "phonetic": "/pen/",
    "definition": "An instrument for writing with ink.",
    "definitionVn": "cây bút viết, bút mực",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Can I borrow your blue pen?",
      "She signed the paper with a black pen."
    ],
    "exampleTranslations": [
      "Tôi mượn cây bút xanh được không?",
      "Cô ấy ký tên bằng bút mực đen."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_23",
    "word": "pencil",
    "phonetic": "/ˈpensl/",
    "definition": "An instrument for writing or drawing consisting of a thin stick of graphite.",
    "definitionVn": "chiếc bút chì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "Sharpen your pencil before drawing.",
      "I take notes in pencil in my textbook."
    ],
    "exampleTranslations": [
      "Hãy gọt bút chì trước khi vẽ nhé.",
      "Tôi ghi chú bằng bút chì vào sách giáo khoa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_home_o_24",
    "word": "phone",
    "phonetic": "/foʊn/",
    "definition": "A mobile smartphone or telephone device.",
    "definitionVn": "điện thoại (di động)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_home_objects",
    "themeNameVn": "Nhà cửa & Đồ dùng",
    "themeNameEn": "Home & Daily Objects",
    "examples": [
      "My phone is ringing.",
      "I learn English on my phone."
    ],
    "exampleTranslations": [
      "Điện thoại tôi đang reo.",
      "Tôi học tiếng Anh trên điện thoại."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_NHA_CUA_DO_DUNG: VocabularyTopicPackage = {
  theme: THEME_NHA_CUA_DO_DUNG,
  vocabs: VOCABS_NHA_CUA_DO_DUNG,
};

export default CHUDE_NHA_CUA_DO_DUNG;
