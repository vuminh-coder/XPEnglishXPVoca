import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 36: Côn trùng & Sâu bọ (Insects & Small Bugs)
 * Mã chủ đề: t_basic_insects_bugs
 * Tổng số từ vựng: 20 từ
 */
export const THEME_CON_TRUNG_SAU_BO: BasicTheme = {
  "id": "t_basic_insects_bugs",
  "name": "Côn trùng & Sâu bọ",
  "nameEn": "Insects & Small Bugs",
  "icon": "🐝",
  "difficulty": 1,
  "color": "#ca8a04",
  "description": "Ong mật, kiến, muỗi, chuồn chuồn, bọ cánh cứng, bướm và bọ rùa.",
  "totalVocabs": 20
};

export const VOCABS_CON_TRUNG_SAU_BO: BasicVocabularyItem[] = [
  {
    "id": "bv_insect_01",
    "word": "insect",
    "phonetic": "/ˈɪnsekt/",
    "definition": "A small arthropod animal that has six legs and generally one or two pairs of wings.",
    "definitionVn": "côn trùng, sâu bọ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Insects are the most diverse group of animals on Earth.",
      "Many flowering plants depend on insects for pollination."
    ],
    "exampleTranslations": [
      "Côn trùng là nhóm động vật đa dạng nhất trên Trái Đất.",
      "Nhiều loài thực vật có hoa dựa vào côn trùng để thụ phấn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_02",
    "word": "bee",
    "phonetic": "/biː/",
    "definition": "A winged, flower-visiting insect that produces honey and beeswax.",
    "definitionVn": "con ong (làm mật)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Busy honeybees collect sweet nectar from colorful flowers.",
      "Bees produce pure organic honey."
    ],
    "exampleTranslations": [
      "Những chú ong chăm chỉ lấy mật ngọt từ những bông hoa rực rỡ.",
      "Ong tạo ra mật ong hữu cơ nguyên chất."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_03",
    "word": "ant",
    "phonetic": "/ænt/",
    "definition": "A small insect, typically with a sting and living in a complex social colony with one or more breeding queens.",
    "definitionVn": "con kiến (chăm chỉ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Hardworking ants can carry objects many times their own weight.",
      "A line of tiny ants marched across the garden wall."
    ],
    "exampleTranslations": [
      "Những chú kiến chăm chỉ có thể vác vật nặng gấp nhiều lần trọng lượng cơ thể.",
      "Một đàn kiến nhỏ hành quân qua bức tường vườn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_04",
    "word": "mosquito",
    "phonetic": "/məˈskiːtoʊ/",
    "definition": "A slender long-legged fly with aquatic larvae, the bite of which can transmit malaria or dengue.",
    "definitionVn": "con muỗi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Use a mosquito net when sleeping to prevent mosquito bites.",
      "Apply insect repellent to keep mosquitoes away."
    ],
    "exampleTranslations": [
      "Hãy mắc màn khi đi ngủ để tránh bị muỗi đốt nhé.",
      "Thoa kem chống muỗi để xua đuổi muỗi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_05",
    "word": "fly",
    "phonetic": "/flaɪ/",
    "definition": "A two-winged insect of the order Diptera, especially a housefly.",
    "definitionVn": "con ruồi (nhà)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Cover food with a mesh cover to keep flies away.",
      "A fly buzzed around the bright window pane."
    ],
    "exampleTranslations": [
      "Đậy thức ăn bằng lồng bàn lưới để ngăn ruồi nhé.",
      "Một con ruồi bay vo ve quanh ô cửa sổ sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_06",
    "word": "dragonfly",
    "phonetic": "/ˈdræɡənflaɪ/",
    "definition": "A fast-flying long-bodied insect with two pairs of large, transparent wings.",
    "definitionVn": "con chuồn chuồn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Bright red dragonflies hovered gracefully above the pond.",
      "Dragonflies catch and eat mosquitoes in flight."
    ],
    "exampleTranslations": [
      "Những chú chuồn chuồn đỏ tươi bay lượn nhẹ nhàng trên mặt ao.",
      "Chuồn chuồn bắt và ăn muỗi ngay khi đang bay."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_07",
    "word": "spider",
    "phonetic": "/ˈspaɪdər/",
    "definition": "An eight-legged predatory arachnid with an unsegmented body.",
    "definitionVn": "con nhện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "The spider spun an intricate circular web in the corner.",
      "Most garden spiders are harmless and eat pests."
    ],
    "exampleTranslations": [
      "Chú nhện đã dệt một mạng lưới tròn phức tạp ở góc tường.",
      "Hầu hết các loài nhện vườn đều vô hại và giúp bắt sâu bọ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_08",
    "word": "beetle",
    "phonetic": "/ˈbiːtl/",
    "definition": "An insect of an order distinguished by forewings modified as hard wing cases (elytra).",
    "definitionVn": "bọ cánh cứng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "The rhinoceros beetle has an impressive horn.",
      "We observed shiny green beetles on the tree bark."
    ],
    "exampleTranslations": [
      "Bọ cánh cứng tê giác có chiếc sừng rất ấn tượng.",
      "Chúng tôi quan sát thấy những chú bọ cánh cứng xanh bóng trên vỏ cây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_09",
    "word": "caterpillar",
    "phonetic": "/ˈkætərpɪlər/",
    "definition": "The larva of a butterfly or moth, typically having a segmented worm-like body.",
    "definitionVn": "con sâu bướm, ấu trùng bướm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "A green caterpillar munched peacefully on a cabbage leaf.",
      "The caterpillar spins a cocoon and transforms into a butterfly."
    ],
    "exampleTranslations": [
      "Chú sâu bướm xanh gặm nhấm ngon lành chiếc lá bắp cải.",
      "Sâu bướm dệt kén và biến hình thành chú bướm xinh đẹp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_10",
    "word": "grasshopper",
    "phonetic": "/ˈɡræshɑːpər/",
    "definition": "A plant-eating insect with long hind legs which are used for jumping and for producing a chirping sound.",
    "definitionVn": "con cào cào, châu chấu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "A green grasshopper jumped high among the grass blades.",
      "Grasshoppers are active in open fields on warm summer days."
    ],
    "exampleTranslations": [
      "Chú cào cào xanh bật nhảy cao giữa các ngọn cỏ.",
      "Châu chấu hoạt động nhiều trên cánh đồng vào những ngày hè ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_11",
    "word": "cricket",
    "phonetic": "/ˈkrɪkɪt/",
    "definition": "An insect related to grasshoppers, jumping with strong hind legs and chirping loudly at night.",
    "definitionVn": "con dế mèn, chú dế",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Crickets chirp melodiously outside in the summer evening.",
      "The classic tale of Men the Cricket is beloved by Vietnamese children."
    ],
    "exampleTranslations": [
      "Những chú dế mèn gáy rả rích bên ngoài trong buổi tối mùa hè.",
      "Tác phẩm kinh điển Dế Mèn Phiêu Lưu Ký được thiếu nhi Việt Nam yêu thích."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_12",
    "word": "ladybug",
    "phonetic": "/ˈleɪdibʌɡ/",
    "definition": "A small circular beetle that is typically red or yellow with black spots.",
    "definitionVn": "con bọ rùa (chấm tròn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "A tiny red ladybug with black dots landed on the flower petal.",
      "Ladybugs are beneficial garden friends that eat aphids."
    ],
    "exampleTranslations": [
      "Một chú bọ rùa đỏ nhỏ có chấm đen đậu trên cánh hoa.",
      "Bọ rùa là người bạn có ích trong vườn giúp bắt rệp cây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_13",
    "word": "worm",
    "phonetic": "/wɜːrm/",
    "definition": "Any of a number of creeping or burrowing invertebrate animals with long, slender soft bodies.",
    "definitionVn": "con giun đất, con sâu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Earthworms aerate and enrich the garden soil naturally.",
      "Robins look for juicy earthworms after the rain."
    ],
    "exampleTranslations": [
      "Giun đất làm tơi xốp và làm giàu đất vườn một cách tự nhiên.",
      "Chim cổ đỏ tìm kiếm những con giun béo sau cơn mưa."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_14",
    "word": "wasp",
    "phonetic": "/wɑːsp/",
    "definition": "A social or solitary winged insect related to bees and ants, with a narrow waist and a sting.",
    "definitionVn": "ong bắp cày, ong vò vẽ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Stay calm and move away slowly if a wasp flies near.",
      "Wasps build intricate paper-like nests under eaves."
    ],
    "exampleTranslations": [
      "Hãy giữ bình tĩnh và di chuyển chậm ra xa nếu có ong bắp cày bay lại gần.",
      "Ong vò vẽ xây những tổ như giấy rất tinh vi dưới mái hiên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_15",
    "word": "moth",
    "phonetic": "/mɔːθ/",
    "definition": "A chiefly nocturnal insect related to butterflies, typically having a stout body and dull plumage.",
    "definitionVn": "con bướm đêm, ngài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Nocturnal moths are attracted to bright lights at night.",
      "The silkworm moth produces natural silk threads."
    ],
    "exampleTranslations": [
      "Những chú bướm đêm bị thu hút bởi ánh đèn sáng vào ban đêm.",
      "Ngài tằm tạo ra những sợi tơ tằm tự nhiên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_16",
    "word": "snail",
    "phonetic": "/sneɪl/",
    "definition": "A mollusc with a single spiral shell into which the whole body can be withdrawn.",
    "definitionVn": "con ốc sên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "The slow snail crept across the damp garden path.",
      "The snail retreated into its protective shell."
    ],
    "exampleTranslations": [
      "Chú ốc sên chậm chạp bò qua lối đi ẩm ướt trong vườn.",
      "Ốc sên thụt vào trong chiếc vỏ bảo vệ của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_17",
    "word": "sting",
    "phonetic": "/stɪŋ/",
    "definition": "Wound or pierce with a stinger, as a bee or wasp does.",
    "definitionVn": "đốt, chích (ong, côn trùng có nọc)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "A bee may sting if it feels threatened.",
      "Apply ice to soothe a painful insect sting."
    ],
    "exampleTranslations": [
      "Ong có thể đốt nếu cảm thấy bị đe dọa.",
      "Chườm đá lạnh để làm dịu vết côn trùng đốt bị đau nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_18",
    "word": "bite",
    "phonetic": "/baɪt/",
    "definition": "Use teeth or jaws to cut or puncture.",
    "definitionVn": "cắn, đốt (muỗi, kiến)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Mosquitoes bite to feed on blood.",
      "Don't scratch an itchy bug bite."
    ],
    "exampleTranslations": [
      "Muỗi đốt để hút máu.",
      "Đừng gãi vết côn trùng cắn bị ngứa nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_19",
    "word": "crawl",
    "phonetic": "/krɔːl/",
    "definition": "Move forward on the hands and knees or by dragging the body close to the ground.",
    "definitionVn": "bò, trườn (sâu bọ, em bé)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Tiny ants crawl across the kitchen counter in search of crumbs.",
      "A caterpillar crawls slowly along the stem."
    ],
    "exampleTranslations": [
      "Những chú kiến nhỏ bò qua kệ bếp để tìm vụn bánh.",
      "Một chú sâu bướm bò từ từ dọc theo cành cây."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_insect_20",
    "word": "wing",
    "phonetic": "/wɪŋ/",
    "definition": "Any of a number of specialized paired appendages by which an insect, bird, or bat is able to fly.",
    "definitionVn": "đôi cánh, cánh (côn trùng, chim)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_insects_bugs",
    "themeNameVn": "Côn trùng & Sâu bọ",
    "themeNameEn": "Insects & Small Bugs",
    "examples": [
      "Butterflies have vibrant colorful patterns on their wings.",
      "Dragonfly wings beat with high precision."
    ],
    "exampleTranslations": [
      "Bướm có những hoa văn rực rỡ sắc màu trên đôi cánh.",
      "Đôi cánh của chuồn chuồn đập với độ chính xác cao."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_CON_TRUNG_SAU_BO: VocabularyTopicPackage = {
  theme: THEME_CON_TRUNG_SAU_BO,
  vocabs: VOCABS_CON_TRUNG_SAU_BO,
};

export default CHUDE_CON_TRUNG_SAU_BO;
