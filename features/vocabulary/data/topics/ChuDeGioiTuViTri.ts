import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 27: Giới từ & Vị trí (Prepositions & Space)
 * Mã chủ đề: t_basic_prepositions_positions
 * Tổng số từ vựng: 20 từ
 */
export const THEME_GIOI_TU_VI_TRI: BasicTheme = {
  "id": "t_basic_prepositions_positions",
  "name": "Giới từ & Vị trí",
  "nameEn": "Prepositions & Space",
  "icon": "📍",
  "difficulty": 1,
  "color": "#475569",
  "description": "Trong, trên, dưới, trước, sau, bên cạnh, ở giữa và xung quanh.",
  "totalVocabs": 20
};

export const VOCABS_GIOI_TU_VI_TRI: BasicVocabularyItem[] = [
  {
    "id": "bv_prepos_01",
    "word": "in",
    "phonetic": "/ɪn/",
    "definition": "Expressing the situation of something that is or appears to be enclosed or surrounded by something else.",
    "definitionVn": "ở trong, bên trong",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The keys are in the backpack.",
      "I live in Vietnam."
    ],
    "exampleTranslations": [
      "Chùm chìa khóa ở trong ba lô.",
      "Tôi sống ở Việt Nam."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_02",
    "word": "on",
    "phonetic": "/ɑːn/",
    "definition": "Physically in contact with and supported by a surface.",
    "definitionVn": "ở trên, phía trên bề mặt",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The English book is on the study desk.",
      "A picture hangs on the wall."
    ],
    "exampleTranslations": [
      "Cuốn sách tiếng Anh ở trên bàn học.",
      "Một bức tranh treo trên tường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_03",
    "word": "at",
    "phonetic": "/æt/",
    "definition": "Expressing location or arrival in a particular place or position.",
    "definitionVn": "ở tại (địa điểm, thời điểm cụ thể)",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Let's meet at the school gate at 8:00 AM.",
      "She is at work right now."
    ],
    "exampleTranslations": [
      "Cùng gặp nhau ở cổng trường lúc 8h sáng nhé.",
      "Cô ấy đang ở chỗ làm việc vào lúc này."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_04",
    "word": "under",
    "phonetic": "/ˈʌndər/",
    "definition": "Extending or directly below something.",
    "definitionVn": "ở dưới, phía dưới",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The cat is sleeping under the wooden chair.",
      "Keep your shoes under the rack."
    ],
    "exampleTranslations": [
      "Chú mèo đang ngủ dưới chiếc ghế gỗ.",
      "Để giày dép ở phía dưới kệ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_05",
    "word": "above",
    "phonetic": "/əˈbʌv/",
    "definition": "At a higher level or layer than.",
    "definitionVn": "ở phía trên (không tiếp xúc bề mặt)",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "A ceiling fan spins above our heads.",
      "The clock is above the whiteboard."
    ],
    "exampleTranslations": [
      "Một chiếc quạt trần quay phía trên đầu chúng tôi.",
      "Chiếc đồng hồ ở phía trên bảng trắng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_06",
    "word": "behind",
    "phonetic": "/bɪˈhaɪnd/",
    "definition": "At the back of; on the farther side of.",
    "definitionVn": "ở đằng sau, phía sau",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The garden is located behind our house.",
      "Who is standing behind the door?"
    ],
    "exampleTranslations": [
      "Khu vườn nằm ở phía sau nhà chúng tôi.",
      "Ai đang đứng phía sau cánh cửa thế?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_07",
    "word": "in front of",
    "phonetic": "/ɪn frʌnt əv/",
    "definition": "Close to the front part of something.",
    "definitionVn": "ở phía trước, đằng trước",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "There is a big mango tree in front of our gate.",
      "Stand in front of the camera and smile."
    ],
    "exampleTranslations": [
      "Có một cây xoài lớn ở phía trước cổng nhà chúng tôi.",
      "Hãy đứng trước máy ảnh và mỉm cười nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_08",
    "word": "next to",
    "phonetic": "/nekst tuː/",
    "definition": "In or into a position immediately adjacent to.",
    "definitionVn": "ở bên cạnh, kế bên",
    "pos": "phrase",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Sit next to me on the sofa.",
      "The pharmacy is right next to the clinic."
    ],
    "exampleTranslations": [
      "Hãy ngồi bên cạnh tôi trên ghế sô pha nhé.",
      "Hiệu thuốc ở ngay bên cạnh phòng khám."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_09",
    "word": "beside",
    "phonetic": "/bɪˈsaɪd/",
    "definition": "At the side of; next to.",
    "definitionVn": "bên cạnh, sát cạnh",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "She placed a glass of water beside her bed.",
      "Walk beside me in the park."
    ],
    "exampleTranslations": [
      "Cô ấy đặt một ly nước bên cạnh giường ngủ.",
      "Hãy đi bên cạnh tôi trong công viên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_10",
    "word": "between",
    "phonetic": "/bɪˈtwiːn/",
    "definition": "In the space separating two points, objects, or people.",
    "definitionVn": "ở giữa (hai đối tượng)",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The coffee shop is between the bookstore and the bakery.",
      "Choose between tea and coffee."
    ],
    "exampleTranslations": [
      "Quán cà phê nằm ở giữa hiệu sách và tiệm bánh mì.",
      "Hãy chọn giữa trà và cà phê nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_11",
    "word": "among",
    "phonetic": "/əˈmʌŋ/",
    "definition": "Situated more or less centrally in relation to several other things; in the middle of.",
    "definitionVn": "ở giữa, trong số (nhiều đối tượng)",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "A red rose blossomed among green shrubs.",
      "He is popular among his classmates."
    ],
    "exampleTranslations": [
      "Một bông hoa hồng đỏ nở rộ giữa những bụi cây xanh.",
      "Cậu ấy rất được yêu quý trong số các bạn cùng lớp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_12",
    "word": "inside",
    "phonetic": "/ˌɪnˈsaɪd/",
    "definition": "The inner part, interior, or within.",
    "definitionVn": "bên trong, ở trong",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Please come inside; it is raining heavily.",
      "Keep the passport safe inside your bag."
    ],
    "exampleTranslations": [
      "Xin mời vào bên trong; trời đang mưa to đấy.",
      "Giữ hộ chiếu an toàn ở bên trong túi của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_13",
    "word": "outside",
    "phonetic": "/ˌaʊtˈsaɪd/",
    "definition": "The external side or surface of something.",
    "definitionVn": "bên ngoài, ở ngoài",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Children are playing joyfully outside in the yard.",
      "Wait outside for five minutes, please."
    ],
    "exampleTranslations": [
      "Lũ trẻ đang chơi đùa vui vẻ bên ngoài sân.",
      "Làm ơn hãy đợi ở bên ngoài năm phút nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_14",
    "word": "near",
    "phonetic": "/nɪr/",
    "definition": "At or to a short distance away; close to.",
    "definitionVn": "ở gần, gần sát",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Our house is near the central bus station.",
      "Is there a supermarket near here?"
    ],
    "exampleTranslations": [
      "Nhà của chúng tôi ở gần bến xe buýt trung tâm.",
      "Có siêu thị nào ở gần đây không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_15",
    "word": "far",
    "phonetic": "/fɑːr/",
    "definition": "At, to, or by a great distance.",
    "definitionVn": "ở xa, xa xôi",
    "pos": "adverb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The airport is not far from the city center.",
      "How far is it from Hanoi to Da Nang?"
    ],
    "exampleTranslations": [
      "Sân bay không quá xa trung tâm thành phố.",
      "Từ Hà Nội đến Đà Nẵng bao xa vậy?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_16",
    "word": "opposite",
    "phonetic": "/ˈɑːpəzɪt/",
    "definition": "Having a position on the other or further side of something.",
    "definitionVn": "đối diện, phía đối diện",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The bank is opposite the central post office.",
      "They sat opposite each other at the dining table."
    ],
    "exampleTranslations": [
      "Ngân hàng nằm đối diện với bưu điện trung tâm.",
      "Họ ngồi đối diện nhau tại bàn ăn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_17",
    "word": "across",
    "phonetic": "/əˈkrɔːs/",
    "definition": "From one side to the other of something with clear limits.",
    "definitionVn": "băng qua, ở phía bên kia",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Walk across the street carefully.",
      "The bookstore is across the road."
    ],
    "exampleTranslations": [
      "Hãy băng qua đường cẩn thận nhé.",
      "Hiệu sách nằm ở phía bên kia con đường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_18",
    "word": "around",
    "phonetic": "/əˈraʊnd/",
    "definition": "Located or moving on every side; about.",
    "definitionVn": "xung quanh, vòng quanh",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "We jogged around the calm lake.",
      "There are green trees all around the campus."
    ],
    "exampleTranslations": [
      "Chúng tôi đã chạy bộ xung quanh bờ hồ êm đềm.",
      "Có cây xanh ở khắp xung quanh khuôn viên trường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_19",
    "word": "through",
    "phonetic": "/θruː/",
    "definition": "Moving in one side and out of the other side of an opening or location.",
    "definitionVn": "xuyên qua, đi qua",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "The sunlight shone through the clean window.",
      "The train went through a long tunnel."
    ],
    "exampleTranslations": [
      "Ánh nắng mặt trời chiếu xuyên qua ô cửa sổ sạch sẽ.",
      "Đoàn tàu hỏa đi xuyên qua một đường hầm dài."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_prepos_20",
    "word": "into",
    "phonetic": "/ˈɪntuː/",
    "definition": "Expressing movement or action with the result that someone or something becomes enclosed or surrounded.",
    "definitionVn": "vào trong, đi vào",
    "pos": "preposition",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_prepositions_positions",
    "themeNameVn": "Giới từ & Vị trí",
    "themeNameEn": "Prepositions & Space",
    "examples": [
      "Step into the classroom quietly.",
      "Pour fresh milk into the cup."
    ],
    "exampleTranslations": [
      "Bước vào trong lớp học thật nhẹ nhàng nhé.",
      "Rót sữa tươi vào trong tách nhé."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_GIOI_TU_VI_TRI: VocabularyTopicPackage = {
  theme: THEME_GIOI_TU_VI_TRI,
  vocabs: VOCABS_GIOI_TU_VI_TRI,
};

export default CHUDE_GIOI_TU_VI_TRI;
