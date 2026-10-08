import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 34: Địa hình & Cảnh quan (Landforms & Landscapes)
 * Mã chủ đề: t_basic_landforms_landscapes
 * Tổng số từ vựng: 20 từ
 */
export const THEME_DIA_HINH_CANH_QUAN: BasicTheme = {
  "id": "t_basic_landforms_landscapes",
  "name": "Địa hình & Cảnh quan",
  "nameEn": "Landforms & Landscapes",
  "icon": "🏞️",
  "difficulty": 1,
  "color": "#15803d",
  "description": "Đồi núi, thung lũng, rừng rậm, sa mạc, hang động, vách đá, bờ biển.",
  "totalVocabs": 20
};

export const VOCABS_DIA_HINH_CANH_QUAN: BasicVocabularyItem[] = [
  {
    "id": "bv_landfo_01",
    "word": "hill",
    "phonetic": "/hɪl/",
    "definition": "A naturally raised area of land, not as high as a mountain.",
    "definitionVn": "ngọn đồi, quả đồi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Green tea hills in Moc Chau are peaceful and picturesque.",
      "We walked up the grassy hill to watch the sunset."
    ],
    "exampleTranslations": [
      "Những đồi chè xanh mướt ở Mộc Châu thật thanh bình và thơ mộng.",
      "Chúng tôi đã đi bộ lên ngọn đồi cỏ để ngắm hoàng hôn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_02",
    "word": "valley",
    "phonetic": "/ˈvæli/",
    "definition": "A low area of land between hills or mountains, typically with a river or stream flowing through it.",
    "definitionVn": "thung lũng (giữa các dãy núi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Muong Hoa Valley in Sapa is famous for golden terraced rice fields.",
      "A clear stream flows through the lush valley."
    ],
    "exampleTranslations": [
      "Thung lũng Mường Hoa ở Sa Pa nổi tiếng với những thửa ruộng bậc thang vàng óng.",
      "Một con suối trong vắt chảy qua thung lũng xanh tươi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_03",
    "word": "forest",
    "phonetic": "/ˈfɔːrɪst/",
    "definition": "A large area covered chiefly with trees and undergrowth.",
    "definitionVn": "khu rừng, rừng rậm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Cuc Phuong National Park preserves an ancient tropical rainforest.",
      "Birds sing melodiously in the green forest."
    ],
    "exampleTranslations": [
      "Vườn Quốc gia Cúc Phương bảo tồn một khu rừng mưa nhiệt đới cổ sinh.",
      "Những chú chim hót líu lo trong khu rừng xanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_04",
    "word": "jungle",
    "phonetic": "/ˈdʒʌŋɡl/",
    "definition": "An area of land overgrown with dense forest and tangled vegetation, typically in the tropics.",
    "definitionVn": "rừng nhiệt đới rậm rạp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "The jungle of Phong Nha hides mysterious caves and underground rivers.",
      "Many exotic wild animals live in the dense jungle."
    ],
    "exampleTranslations": [
      "Rừng rậm Phong Nha ẩn chứa những hang động kỳ bí và dòng sông ngầm.",
      "Nhiều loài động vật hoang dã kỳ lạ sinh sống trong rừng rậm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_05",
    "word": "desert",
    "phonetic": "/ˈdezərt/",
    "definition": "A dry, barren area of land, especially one covered with sand, that is characteristically desolate and waterless.",
    "definitionVn": "sa mạc (cát khô cằn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "The White Sand Dunes in Mui Ne resemble a mini desert.",
      "Camels can travel long distances in the hot desert."
    ],
    "exampleTranslations": [
      "Đồi Cát Trắng ở Mũi Né trông tựa như một sa mạc thu nhỏ.",
      "Lạc đà có thể di chuyển những quãng đường dài trên sa mạc nóng bỏng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_06",
    "word": "cave",
    "phonetic": "/keɪv/",
    "definition": "A natural underground hollow space large enough for a human to enter.",
    "definitionVn": "hang động",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Son Doong is the largest natural cave in the world.",
      "Stalactites hang beautifully from the ceiling of the cave."
    ],
    "exampleTranslations": [
      "Sơn Đoòng là hang động tự nhiên lớn nhất thế giới.",
      "Những khối thạch nhũ rủ xuống tuyệt đẹp từ trần hang động."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_07",
    "word": "cliff",
    "phonetic": "/klɪf/",
    "definition": "A steep, and usually high, rock face, especially at the edge of the sea.",
    "definitionVn": "vách đá dốc đứng (ven biển/núi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Seabirds nest safely on the high rocky ocean cliff.",
      "Stand back from the edge of the steep cliff."
    ],
    "exampleTranslations": [
      "Chim biển làm tổ an toàn trên vách đá cao ven đại dương.",
      "Hãy đứng lùi lại phía sau mép vách đá dựng đứng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_08",
    "word": "volcano",
    "phonetic": "/vɑːlˈkeɪnoʊ/",
    "definition": "A mountain or hill having a crater or vent through which lava and rock fragments have erupted.",
    "definitionVn": "ngọn núi lửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Volcanic soil is extremely fertile for growing crops.",
      "Mount Fuji is a famous dormant volcano in Japan."
    ],
    "exampleTranslations": [
      "Đất núi lửa cực kỳ màu mỡ để trồng trọt mùa màng.",
      "Núi Phú Sĩ là ngọn núi lửa ngủ say nổi tiếng ở Nhật Bản."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_09",
    "word": "field",
    "phonetic": "/fiːld/",
    "definition": "An area of open land, especially one planted with crops or pasture.",
    "definitionVn": "cánh đồng (lúa, hoa, cỏ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Golden rice fields stretch endlessly to the horizon.",
      "Farmers work together in the vast open fields."
    ],
    "exampleTranslations": [
      "Những cánh đồng lúa chín vàng trải dài tít tắp đến tận chân trời.",
      "Những người nông dân cùng nhau làm việc trên cánh đồng bao la."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_10",
    "word": "coast",
    "phonetic": "/koʊst/",
    "definition": "The part of the land adjoining or near the sea.",
    "definitionVn": "bờ biển, dải duyên hải",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Vietnam has a long, scenic coastline of over 3,260 kilometers.",
      "Lighthouses guide ships safely along the rocky coast."
    ],
    "exampleTranslations": [
      "Việt Nam có đường bờ biển dài và thơ mộng hơn 3.260 cây số.",
      "Hải đăng dẫn đường an toàn cho tàu bè dọc bờ biển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_11",
    "word": "bay",
    "phonetic": "/beɪ/",
    "definition": "A broad inlet of the sea where the land curves inward.",
    "definitionVn": "vịnh biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Ha Long Bay is a renowned UNESCO World Natural Heritage site.",
      "Emerald waters and limestone islands characterize the bay."
    ],
    "exampleTranslations": [
      "Vịnh Hạ Long là di sản thiên nhiên thế giới nổi tiếng của UNESCO.",
      "Làn nước xanh ngọc bích và các hòn đảo đá vôi tạo nên nét đặc trưng của vịnh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_12",
    "word": "canyon",
    "phonetic": "/ˈkænjən/",
    "definition": "A deep gorge, typically one with a river flowing through it.",
    "definitionVn": "hẻm núi sâu, hẻm vực",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Tu San Canyon in Ha Giang is the deepest canyon in Southeast Asia.",
      "Emerald Nho Que River winds through the rocky canyon."
    ],
    "exampleTranslations": [
      "Hẻm vực Tu Sản ở Hà Giang là hẻm núi sâu nhất Đông Nam Á.",
      "Dòng sông Nho Quế xanh ngắt uốn lượn qua hẻm núi đá."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_13",
    "word": "plain",
    "phonetic": "/pleɪn/",
    "definition": "A large area of flat land with few trees.",
    "definitionVn": "đồng bằng, bình nguyên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "The Mekong Delta plain is the rice bowl of Vietnam.",
      "Vast plains provide fertile soil for agriculture."
    ],
    "exampleTranslations": [
      "Đồng bằng sông Cửu Long là vựa lúa của Việt Nam.",
      "Những vùng đồng bằng rộng lớn cung cấp đất đai màu mỡ cho nông nghiệp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_14",
    "word": "sand",
    "phonetic": "/sænd/",
    "definition": "A loose granular substance resulting from the erosion of siliceous and other rocks.",
    "definitionVn": "bãi cát, hạt cát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Soft golden sand feels wonderful between your toes.",
      "Children built a sandcastle on the beach."
    ],
    "exampleTranslations": [
      "Cát vàng mềm mịn đem lại cảm giác tuyệt vời giữa các ngón chân.",
      "Lũ trẻ đã xây một lâu đài cát trên bãi biển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_15",
    "word": "rock",
    "phonetic": "/rɑːk/",
    "definition": "The solid mineral material forming part of the surface of the earth.",
    "definitionVn": "hòn đá, tảng đá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Waves crash against the weathered coastal rocks.",
      "He climbed the steep rock with safety ropes."
    ],
    "exampleTranslations": [
      "Những con sóng vỗ mạnh vào các tảng đá ven biển bị phong hóa.",
      "Anh ấy đã leo lên tảng đá dốc với dây thừng bảo hộ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_16",
    "word": "stone",
    "phonetic": "/stoʊn/",
    "definition": "Hard solid non-metallic mineral matter of which rock is made, used for building.",
    "definitionVn": "viên đá, đá lát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Ancient temples were built with sturdy carved stones.",
      "Skip smooth stones across the calm lake surface."
    ],
    "exampleTranslations": [
      "Những ngôi đền cổ xưa được xây dựng bằng những phiến đá chạm khắc kiên cố.",
      "Ném lướt những viên đá nhẵn qua mặt hồ êm đềm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_17",
    "word": "soil",
    "phonetic": "/sɔɪl/",
    "definition": "The upper layer of earth in which plants grow, a black or dark brown material.",
    "definitionVn": "đất trồng, thổ nhưỡng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Rich fertile soil is essential for healthy plant growth.",
      "Add compost to enrich garden soil naturally."
    ],
    "exampleTranslations": [
      "Đất trồng màu mỡ rất cần thiết cho sự phát triển khỏe mạnh của cây cối.",
      "Thêm phân hữu cơ để làm giàu đất vườn một cách tự nhiên nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_18",
    "word": "stream",
    "phonetic": "/striːm/",
    "definition": "A small, narrow river of water.",
    "definitionVn": "con suối, dòng suối",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "A clear mountain stream flows gently through the woods.",
      "We drank cool refreshing water from the clean stream."
    ],
    "exampleTranslations": [
      "Một con suối vùng núi trong vắt chảy êm ả qua cánh rừng.",
      "Chúng tôi đã uống nước mát lành từ dòng suối sạch."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_19",
    "word": "pond",
    "phonetic": "/pɑːnd/",
    "definition": "A small body of still water formed naturally or by hollowing or embanking.",
    "definitionVn": "cái ao, hồ nước nhỏ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Pink lotus flowers blossom gracefully in the village pond.",
      "Colorful koi fish swim peacefully in the garden pond."
    ],
    "exampleTranslations": [
      "Những bông hoa sen hồng đua nhau khoe sắc trong ao làng.",
      "Những chú cá koi nhiều màu bơi lội thanh bình trong ao vườn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_landfo_20",
    "word": "landscape",
    "phonetic": "/ˈlændskeɪp/",
    "definition": "All the visible features of an area of countryside or land, often considered in terms of their aesthetic appeal.",
    "definitionVn": "phong cảnh, cảnh quan thiên nhiên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_landforms_landscapes",
    "themeNameVn": "Địa hình & Cảnh quan",
    "themeNameEn": "Landforms & Landscapes",
    "examples": [
      "Vietnam boasts breathtaking natural landscapes from north to south.",
      "The artist captured the serene rural landscape on canvas."
    ],
    "exampleTranslations": [
      "Việt Nam sở hữu những phong cảnh thiên nhiên đẹp nghẹt thở từ Bắc chí Nam.",
      "Người họa sĩ đã khắc họa cảnh quan thôn quê thanh bình lên khung vẽ."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_DIA_HINH_CANH_QUAN: VocabularyTopicPackage = {
  theme: THEME_DIA_HINH_CANH_QUAN,
  vocabs: VOCABS_DIA_HINH_CANH_QUAN,
};

export default CHUDE_DIA_HINH_CANH_QUAN;
