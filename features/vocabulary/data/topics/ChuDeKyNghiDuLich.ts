import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 29: Kỳ nghỉ & Du lịch (Vacation & Tourism)
 * Mã chủ đề: t_basic_vacation_tourism
 * Tổng số từ vựng: 20 từ
 */
export const THEME_KY_NGHI_DU_LICH: BasicTheme = {
  "id": "t_basic_vacation_tourism",
  "name": "Kỳ nghỉ & Du lịch",
  "nameEn": "Vacation & Tourism",
  "icon": "🏖️",
  "difficulty": 1,
  "color": "#0d9488",
  "description": "Hành lý, hộ chiếu, bãi biển, khu nghỉ dưỡng và cảnh đẹp du lịch.",
  "totalVocabs": 20
};

export const VOCABS_KY_NGHI_DU_LICH: BasicVocabularyItem[] = [
  {
    "id": "bv_vacati_01",
    "word": "vacation",
    "phonetic": "/veɪˈkeɪʃn/",
    "definition": "An extended period of recreation, especially one spent away from home or in travelling.",
    "definitionVn": "kỳ nghỉ, đợt nghỉ phép",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We are going to Nha Trang for our summer vacation.",
      "Have a relaxing and joyful vacation!"
    ],
    "exampleTranslations": [
      "Chúng tôi sẽ đi Nha Trang cho kỳ nghỉ hè.",
      "Chúc bạn có một kỳ nghỉ thư thái và tràn ngập niềm vui!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_02",
    "word": "holiday",
    "phonetic": "/ˈhɑːlədeɪ/",
    "definition": "An extended period of leisure and recreation; public holiday.",
    "definitionVn": "ngày lễ, kỳ nghỉ lễ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Tet is the most important traditional holiday in Vietnam.",
      "What are your plans for the national holiday?"
    ],
    "exampleTranslations": [
      "Tết là ngày lễ truyền thống quan trọng nhất ở Việt Nam.",
      "Kế hoạch cho ngày nghỉ lễ quốc gia của bạn là gì?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_03",
    "word": "trip",
    "phonetic": "/trɪp/",
    "definition": "A journey or excursion, especially for pleasure.",
    "definitionVn": "chuyến đi, chuyến du ngoạn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We had an unforgettable school trip to the mountain.",
      "Have a safe and pleasant trip!"
    ],
    "exampleTranslations": [
      "Chúng tôi đã có một chuyến đi dã ngoại khó quên lên vùng núi.",
      "Chúc bạn có một chuyến đi an toàn và vui vẻ!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_04",
    "word": "tour",
    "phonetic": "/tʊr/",
    "definition": "A journey for pleasure in which several different places are visited.",
    "definitionVn": "chuyến tham quan, tour du lịch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We booked a guided city tour of historic Hanoi.",
      "The boat tour through Ha Long Bay was magical."
    ],
    "exampleTranslations": [
      "Chúng tôi đã đặt một tour tham quan có hướng dẫn quanh Hà Nội cổ kính.",
      "Chuyến du thuyền qua Vịnh Hạ Long thật kỳ diệu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_05",
    "word": "tourist",
    "phonetic": "/ˈtʊrɪst/",
    "definition": "A person who is traveling or visiting a place for pleasure.",
    "definitionVn": "khách du lịch, du khách",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Thousands of international tourists visit Hoi An every month.",
      "The friendly locals welcomed tourists warmly."
    ],
    "exampleTranslations": [
      "Hàng ngàn du khách quốc tế đến thăm Hội An mỗi tháng.",
      "Người dân địa phương thân thiện chào đón du khách rất nồng hậu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_06",
    "word": "guide",
    "phonetic": "/ɡaɪd/",
    "definition": "A person who shows the way to others, especially one employed to show tourists around.",
    "definitionVn": "hướng dẫn viên du lịch",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Our tour guide shared fascinating historical stories.",
      "Follow the tour guide closely during the museum walk."
    ],
    "exampleTranslations": [
      "Hướng dẫn viên du lịch của chúng tôi đã chia sẻ những câu chuyện lịch sử hấp dẫn.",
      "Hãy đi theo sát hướng dẫn viên trong chuyến tham quan bảo tàng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_07",
    "word": "resort",
    "phonetic": "/rɪˈzɔːrt/",
    "definition": "A place that is a popular destination for vacations or recreation.",
    "definitionVn": "khu nghỉ dưỡng cao cấp, resort",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We stayed at a luxury beachfront resort with a swimming pool.",
      "Phu Quoc Island has world-class eco resorts."
    ],
    "exampleTranslations": [
      "Chúng tôi đã nghỉ tại một khu nghỉ dưỡng cao cấp ven biển có hồ bơi.",
      "Đảo Phú Quốc có những resort sinh thái đẳng cấp thế giới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_08",
    "word": "beach",
    "phonetic": "/biːtʃ/",
    "definition": "A pebbly or sandy shore, especially by the ocean between high- and low-water marks.",
    "definitionVn": "bãi biển, bờ biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "My Khe Beach in Da Nang has golden sand and clear water.",
      "We built sandcastles on the sunny beach."
    ],
    "exampleTranslations": [
      "Bãi biển Mỹ Khê ở Đà Nẵng có bãi cát vàng và làn nước trong vắt.",
      "Chúng tôi đã xây lâu đài cát trên bãi biển đầy nắng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_09",
    "word": "island",
    "phonetic": "/ˈaɪlənd/",
    "definition": "A piece of land surrounded by water.",
    "definitionVn": "hòn đảo, đảo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Phu Quoc is the largest and most famous island in Vietnam.",
      "We took a ferry to the tropical island."
    ],
    "exampleTranslations": [
      "Phú Quốc là hòn đảo lớn nhất và nổi tiếng nhất ở Việt Nam.",
      "Chúng tôi đã đi phà sang hòn đảo nhiệt đới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_10",
    "word": "mountain",
    "phonetic": "/ˈmaʊntn/",
    "definition": "A large natural elevation of the earth's surface rising abruptly from the surrounding level.",
    "definitionVn": "ngọn núi, vùng núi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Fansipan is the highest mountain peak in Indochina.",
      "Hiking in the green mountains is invigorating."
    ],
    "exampleTranslations": [
      "Fansipan là đỉnh núi cao nhất Đông Dương.",
      "Đi bộ leo núi trên những ngọn núi xanh đem lại cảm giác khoan khoái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_11",
    "word": "waterfall",
    "phonetic": "/ˈwɔːtərfɔːl/",
    "definition": "A cascade of water falling from a height, formed when a river or stream flows over a precipice.",
    "definitionVn": "thác nước (hùng vĩ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Ban Gioc Waterfall on the northern border is magnificent.",
      "The roaring sound of the waterfall is awe-inspiring."
    ],
    "exampleTranslations": [
      "Thác Bản Giốc ở biên giới phía Bắc thật hùng vĩ.",
      "Âm thanh ầm vang của thác nước khiến người ta kinh ngạc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_12",
    "word": "lake",
    "phonetic": "/leɪk/",
    "definition": "A large body of water surrounded by land.",
    "definitionVn": "hồ nước, mặt hồ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Hoan Kiem Lake is the peaceful cultural heart of Hanoi.",
      "People take strolls around the scenic lake."
    ],
    "exampleTranslations": [
      "Hồ Hoàn Kiếm là trái tim văn hóa thanh bình của Hà Nội.",
      "Mọi người đi dạo quanh hồ nước thơ mộng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_13",
    "word": "passport",
    "phonetic": "/ˈpæspɔːrt/",
    "definition": "An official document issued by a government, certifying the holder's identity and citizenship for international travel.",
    "definitionVn": "hộ chiếu (xuất nhập cảnh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Always keep your passport secure in your travel pouch.",
      "Make sure your passport is valid for at least six months."
    ],
    "exampleTranslations": [
      "Luôn giữ hộ chiếu an toàn trong túi du lịch của bạn nhé.",
      "Hãy đảm bảo hộ chiếu của bạn còn hạn ít nhất sáu tháng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_14",
    "word": "luggage",
    "phonetic": "/ˈlʌɡɪdʒ/",
    "definition": "Suitcases or other bags in which to pack personal belongings for traveling.",
    "definitionVn": "hành lý (vali, túi xách du lịch)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Check your luggage at the airline counter before boarding.",
      "Pack only essential items to keep your luggage light."
    ],
    "exampleTranslations": [
      "Ký gửi hành lý tại quầy hãng hàng không trước khi lên máy bay nhé.",
      "Chỉ gói những đồ thiết yếu để hành lý của bạn thật nhẹ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_15",
    "word": "souvenir",
    "phonetic": "/ˌsuːvəˈnɪr/",
    "definition": "A thing that is kept as a reminder of a person, place, or event.",
    "definitionVn": "quà lưu niệm, đồ lưu niệm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "I bought a silk scarf as a souvenir from Hoi An.",
      "Souvenirs help us cherish memories of our travels."
    ],
    "exampleTranslations": [
      "Tôi đã mua một chiếc khăn lụa làm quà lưu niệm từ Hội An.",
      "Những món quà lưu niệm giúp chúng ta lưu giữ kỷ niệm về những chuyến đi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_16",
    "word": "camera",
    "phonetic": "/ˈkæmrə/",
    "definition": "A device for recording visual images in the form of photographs, film, or video signals.",
    "definitionVn": "máy ảnh, máy quay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Capture beautiful vacation moments with your camera.",
      "He carried a digital camera around his neck."
    ],
    "exampleTranslations": [
      "Hãy ghi lại những khoảnh khắc kỳ nghỉ tuyệt đẹp bằng máy ảnh nhé.",
      "Anh ấy đeo một chiếc máy ảnh kỹ thuật số quanh cổ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_17",
    "word": "map",
    "phonetic": "/mæp/",
    "definition": "A diagrammatic representation of an area of land or sea showing physical features.",
    "definitionVn": "bản đồ (chỉ đường)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "Check the city map to find the nearest metro station.",
      "Digital maps on smartphones make navigation simple."
    ],
    "exampleTranslations": [
      "Xem bản đồ thành phố để tìm ga tàu điện ngầm gần nhất nhé.",
      "Bản đồ số trên điện thoại thông minh giúp việc chỉ đường thật đơn giản."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_18",
    "word": "ocean",
    "phonetic": "/ˈoʊʃn/",
    "definition": "A very large expanse of sea, in particular each of the main areas into which the sea is divided geographically.",
    "definitionVn": "đại dương bao la",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "The Pacific Ocean is the largest and deepest ocean on Earth.",
      "Waves crash peacefully along the ocean shore."
    ],
    "exampleTranslations": [
      "Thái Bình Dương là đại dương lớn nhất và sâu nhất trên Trái Đất.",
      "Những con sóng vỗ êm đềm dọc bờ đại dương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_19",
    "word": "hotel",
    "phonetic": "/hoʊˈtel/",
    "definition": "An establishment providing accommodation, meals, and other services for travelers and tourists.",
    "definitionVn": "khách sạn lưu trú",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We checked into a cozy hotel near the beach.",
      "The hotel offers complimentary breakfast and Wi-Fi."
    ],
    "exampleTranslations": [
      "Chúng tôi đã nhận phòng tại một khách sạn ấm cúng gần bãi biển.",
      "Khách sạn cung cấp bữa sáng và Wi-Fi miễn phí."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_vacati_20",
    "word": "sightseeing",
    "phonetic": "/ˈsaɪtsiːɪŋ/",
    "definition": "The activity of visiting places of interest in a particular location.",
    "definitionVn": "ngắm cảnh, tham quan thắng cảnh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_vacation_tourism",
    "themeNameVn": "Kỳ nghỉ & Du lịch",
    "themeNameEn": "Vacation & Tourism",
    "examples": [
      "We spent the whole sunny afternoon sightseeing around town.",
      "Sightseeing buses have open-top double-decker seats."
    ],
    "exampleTranslations": [
      "Chúng tôi đã dành trọn buổi chiều nắng đẹp để đi ngắm cảnh quanh thị trấn.",
      "Xe buýt ngắm cảnh có hai tầng mui trần thoáng mát."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_KY_NGHI_DU_LICH: VocabularyTopicPackage = {
  theme: THEME_KY_NGHI_DU_LICH,
  vocabs: VOCABS_KY_NGHI_DU_LICH,
};

export default CHUDE_KY_NGHI_DU_LICH;
