import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 35: Sinh vật biển & Đại dương (Marine Life & Ocean)
 * Mã chủ đề: t_basic_marine_life
 * Tổng số từ vựng: 20 từ
 */
export const THEME_SINH_VAT_BIEN_DAI_DUONG: BasicTheme = {
  "id": "t_basic_marine_life",
  "name": "Sinh vật biển & Đại dương",
  "nameEn": "Marine Life & Ocean",
  "icon": "🐋",
  "difficulty": 1,
  "color": "#0ea5e9",
  "description": "Cá voi, cá heo, cá mập, bạch tuộc, tôm cua, rạn san hô và đại dương.",
  "totalVocabs": 20
};

export const VOCABS_SINH_VAT_BIEN_DAI_DUONG: BasicVocabularyItem[] = [
  {
    "id": "bv_marine_01",
    "word": "whale",
    "phonetic": "/weɪl/",
    "definition": "A very large marine mammal with a streamlined body, breathing through a blowhole on the head.",
    "definitionVn": "cá voi (động vật biển khổng lồ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "The blue whale is the largest animal ever known to have lived on Earth.",
      "We saw a majestic whale breach above the ocean waves."
    ],
    "exampleTranslations": [
      "Cá voi xanh là loài động vật lớn nhất từng được biết đến trên Trái Đất.",
      "Chúng tôi đã thấy một chú cá voi uy nghi nhô mình lên khỏi sóng đại dương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_02",
    "word": "dolphin",
    "phonetic": "/ˈdɑːlfɪn/",
    "definition": "A small gregarious toothed whale that typically has a beaklike snout and curved dorsal fin.",
    "definitionVn": "cá heo (thông minh, thân thiện)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Dolphins are intelligent and playful marine mammals.",
      "A pod of dolphins swam alongside our tour boat."
    ],
    "exampleTranslations": [
      "Cá heo là loài động vật có vú dưới biển rất thông minh và tinh nghịch.",
      "Một đàn cá heo đã bơi song song cùng thuyền du lịch của chúng tôi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_03",
    "word": "shark",
    "phonetic": "/ʃɑːrk/",
    "definition": "A long-bodied chiefly marine fish, the majority being predatory.",
    "definitionVn": "cá mập",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Sharks play a vital ecological role as apex predators of the ocean.",
      "Whale sharks are gentle filter feeders."
    ],
    "exampleTranslations": [
      "Cá mập đóng vai trò sinh thái tối quan trọng với tư cách loài săn mồi đỉnh cao của đại dương.",
      "Cá mập voi là loài ăn lọc rất hiền lành."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_04",
    "word": "octopus",
    "phonetic": "/ˈɑːktəpəs/",
    "definition": "An eight-armed mollusc with a soft body, typically living on the seabed.",
    "definitionVn": "con bạch tuộc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "An octopus has eight flexible arms and three hearts.",
      "Octopuses can change color to camouflage instantly."
    ],
    "exampleTranslations": [
      "Bạch tuộc có tám xúc tu linh hoạt và ba trái tim.",
      "Bạch tuộc có thể đổi màu để ngụy trang ngay lập tức."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_05",
    "word": "squid",
    "phonetic": "/skwɪd/",
    "definition": "An elongated, fast-swimming cephalopod mollusc with ten arms.",
    "definitionVn": "con mực, mực ống",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Grilled squid with chili sauce is a popular coastal snack.",
      "Squids can release dark ink to escape predators."
    ],
    "exampleTranslations": [
      "Mực nướng sa tế là món ăn vặt miền biển được ưa chuộng.",
      "Loài mực có thể phun mực đen để trốn thoát kẻ săn mồi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_06",
    "word": "crab",
    "phonetic": "/kræb/",
    "definition": "A crustacean with a broad carapace, stalked eyes, and five pairs of legs, the first pair modified as pincers.",
    "definitionVn": "con cua, con ghẹ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Ca Mau is famous for its delicious fresh mud crabs.",
      "The little crab scuttled sideways across the wet sand."
    ],
    "exampleTranslations": [
      "Cà Mau nổi tiếng với những con cua biển tươi ngon.",
      "Chú cua nhỏ bò ngang thoăn thoắt trên bãi cát ướt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_07",
    "word": "shrimp",
    "phonetic": "/ʃrɪmp/",
    "definition": "A small free-swimming crustacean with an elongated body, typically marine and frequently harvested for food.",
    "definitionVn": "con tôm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Steamed shrimp dipped in lime pepper salt is delectable.",
      "Freshwater shrimp thrive in the rivers."
    ],
    "exampleTranslations": [
      "Tôm hấp chấm muối tiêu chanh ngon tuyệt cú mèo.",
      "Tôm nước ngọt sinh trưởng tốt ở các dòng sông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_08",
    "word": "lobster",
    "phonetic": "/ˈlɑːbstər/",
    "definition": "A large marine crustacean with a cylindrical body, stalked eyes, and strong claws.",
    "definitionVn": "tôm hùm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Binh Ba Island is nicknamed the Island of Lobsters in Vietnam.",
      "Grilled lobster with garlic butter is a luxurious feast."
    ],
    "exampleTranslations": [
      "Đảo Bình Ba được mệnh danh là Đảo Tôm Hùm của Việt Nam.",
      "Tôm hùm nướng bơ tỏi là một bữa tiệc sang trọng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_09",
    "word": "jellyfish",
    "phonetic": "/ˈdʒelifɪʃ/",
    "definition": "A free-swimming marine coelenterate with a gelatinous bell- or saucer-shaped body that is typically transparent.",
    "definitionVn": "con sứa (biển)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Translucent jellyfish drift gracefully with ocean currents.",
      "Be cautious of stinging jellyfish when swimming at sea."
    ],
    "exampleTranslations": [
      "Những chú sứa trong suốt trôi dạt uyển chuyển theo dòng hải lưu.",
      "Hãy cẩn thận với sứa lửa khi bơi ở biển nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_10",
    "word": "starfish",
    "phonetic": "/ˈstɑːrfɪʃ/",
    "definition": "A marine echinoderm with five or more radiating arms.",
    "definitionVn": "sao biển, con sao biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Rach Vem Beach in Phu Quoc is famous for red starfish.",
      "Starfish can regenerate lost arms."
    ],
    "exampleTranslations": [
      "Bãi Rạch Vẹm ở Phú Quốc nổi tiếng với những chú sao biển đỏ.",
      "Sao biển có thể tái sinh những chiếc cánh bị đứt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_11",
    "word": "seal",
    "phonetic": "/siːl/",
    "definition": "A fish-eating aquatic mammal with a streamlined body and feet developed as flippers.",
    "definitionVn": "con hải cẩu, chó biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Playful seals bask under the sunshine on coastal rocks.",
      "Seals glide swiftly through freezing waters."
    ],
    "exampleTranslations": [
      "Những chú hải cẩu tinh nghịch sưởi nắng trên các tảng đá ven biển.",
      "Hải cẩu lướt đi thoăn thoắt trong làn nước băng giá."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_12",
    "word": "penguin",
    "phonetic": "/ˈpeŋɡwɪn/",
    "definition": "A flightless seabird of southern hemisphere oceans, having webbed feet and wings evolved into flippers.",
    "definitionVn": "chim cánh cụt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Penguins waddle cutely on icy shores in Antarctica.",
      "Penguins are exceptional underwater swimmers."
    ],
    "exampleTranslations": [
      "Chim cánh cụt lạch bạch bước đi đáng yêu trên bờ băng Nam Cực.",
      "Chim cánh cụt là những vận động viên bơi lội cừ khôi dưới nước."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_13",
    "word": "coral",
    "phonetic": "/ˈkɔːrəl/",
    "definition": "A hard stony substance secreted by certain marine coelenterates as an external skeleton.",
    "definitionVn": "san hô (rạn san hô)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Snorkeling above colorful coral reefs is an unforgettable experience.",
      "Coral reefs protect coastlines and support marine biodiversity."
    ],
    "exampleTranslations": [
      "Lặn ngắm những rạn san hô sặc sỡ là một trải nghiệm khó quên.",
      "Rạn san hô bảo vệ bờ biển và nuôi dưỡng đa dạng sinh học biển."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_14",
    "word": "seaweed",
    "phonetic": "/ˈsiːwiːd/",
    "definition": "Large algae growing in the sea or on rocks below the high-water mark.",
    "definitionVn": "rong biển, tảo biển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Seaweed soup is nutritious, rich in iodine, and delicious.",
      "Dried seaweed sheets are used to wrap sushi and kimbap."
    ],
    "exampleTranslations": [
      "Canh rong biển rất bổ dưỡng, giàu i-ốt và ngon miệng.",
      "Lá rong biển khô được dùng để cuộn sushi và kimbap."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_15",
    "word": "shell",
    "phonetic": "/ʃel/",
    "definition": "The hard protective outer case of a mollusc or crustacean.",
    "definitionVn": "vỏ ốc, vỏ sò",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Children collect colorful seashells along the sandy shore.",
      "Listen closely to the seashell to hear the sound of the ocean."
    ],
    "exampleTranslations": [
      "Lũ trẻ nhặt những chiếc vỏ sò nhiều màu sắc dọc bờ cát.",
      "Áp tai vào vỏ ốc để lắng nghe tiếng rì rào của đại dương nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_16",
    "word": "clam",
    "phonetic": "/klæm/",
    "definition": "A marine bivalve mollusc with shells of equal size.",
    "definitionVn": "con ngao, con nghêu, sò",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Steamed clams with fragrant lemongrass and chili are tasty.",
      "Clams burrow into the wet sand at low tide."
    ],
    "exampleTranslations": [
      "Nghêu hấp sả ớt thơm lừng ăn rất ngon miệng.",
      "Ngao đào sâu vào cát ướt khi thủy triều rút."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_17",
    "word": "seahorse",
    "phonetic": "/ˈsiːhɔːrs/",
    "definition": "A small marine fish with an upright posture and an equine head.",
    "definitionVn": "cá ngựa (hải mã)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "A seahorse anchors itself to seagrass with its prehensile tail.",
      "Male seahorses carry and care for the eggs until hatching."
    ],
    "exampleTranslations": [
      "Cá ngựa tự neo mình vào cỏ biển bằng chiếc đuôi quấn.",
      "Cá ngựa đực mang và chăm sóc trứng cho đến khi nở."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_18",
    "word": "ocean",
    "phonetic": "/ˈoʊʃn/",
    "definition": "A very large expanse of sea, in particular each of the main areas into which the sea is divided.",
    "definitionVn": "đại dương bao la",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "The vast blue ocean covers more than 70 percent of Earth's surface.",
      "Conserve the ocean by reducing plastic waste."
    ],
    "exampleTranslations": [
      "Đại dương xanh bao la bao phủ hơn 70 phần trăm bề mặt Trái Đất.",
      "Bảo tồn đại dương bằng cách giảm thiểu rác thải nhựa nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_19",
    "word": "swim",
    "phonetic": "/swɪm/",
    "definition": "Propel the body through water by using the limbs, or (in the case of a fish) fins and tail.",
    "definitionVn": "bơi lội",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Colorful reef fish swim in schools around the corals.",
      "I love to swim in the cool ocean water during summer."
    ],
    "exampleTranslations": [
      "Những chú cá rạn sặc sỡ bơi theo đàn quanh rạn san hô.",
      "Tôi rất thích bơi trong làn nước đại dương mát lành vào mùa hè."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_marine_20",
    "word": "dive",
    "phonetic": "/daɪv/",
    "definition": "Plunge head first into water, or submerge under water using scuba gear.",
    "definitionVn": "lặn (ngắm san hô, lặn bình khí)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_marine_life",
    "themeNameVn": "Sinh vật biển & Đại dương",
    "themeNameEn": "Marine Life & Ocean",
    "examples": [
      "Scuba divers dive deep to explore underwater shipwrecks.",
      "We went skin diving in Nha Trang's clear marine reserve."
    ],
    "exampleTranslations": [
      "Các thợ lặn lặn sâu để khám phá xác tàu đắm dưới đáy biển.",
      "Chúng tôi đã đi lặn tự do ở khu bảo tồn biển nước trong vắt ở Nha Trang."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_SINH_VAT_BIEN_DAI_DUONG: VocabularyTopicPackage = {
  theme: THEME_SINH_VAT_BIEN_DAI_DUONG,
  vocabs: VOCABS_SINH_VAT_BIEN_DAI_DUONG,
};

export default CHUDE_SINH_VAT_BIEN_DAI_DUONG;
