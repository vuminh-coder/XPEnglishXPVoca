import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 42: Phòng ngủ & Giấc ngủ (Bedroom & Sleep)
 * Mã chủ đề: t_basic_bedroom_sleep
 * Tổng số từ vựng: 20 từ
 */
export const THEME_PHONG_NGU_GIAC_NGU: BasicTheme = {
  "id": "t_basic_bedroom_sleep",
  "name": "Phòng ngủ & Giấc ngủ",
  "nameEn": "Bedroom & Sleep",
  "icon": "🛏️",
  "difficulty": 1,
  "color": "#6366f1",
  "description": "Giường ngủ, nệm, gối, chăn ấm, tủ quần áo, đồng hồ báo thức và ngủ ngon.",
  "totalVocabs": 20
};

export const VOCABS_PHONG_NGU_GIAC_NGU: BasicVocabularyItem[] = [
  {
    "id": "bv_bedroo_01",
    "word": "bed",
    "phonetic": "/bed/",
    "definition": "A piece of furniture for sleep or rest, typically a framework with a mattress and coverings.",
    "definitionVn": "chiếc giường ngủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Make your bed neatly every morning when you wake up.",
      "A comfortable bed promotes deep, restful sleep."
    ],
    "exampleTranslations": [
      "Hãy gấp chăn dọn giường gọn gàng mỗi sáng khi thức dậy nhé.",
      "Một chiếc giường thoải mái thúc đẩy giấc ngủ sâu và ngon giấc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_02",
    "word": "mattress",
    "phonetic": "/ˈmætrəs/",
    "definition": "A fabric case filled with deformable or resilient material, used for sleeping on.",
    "definitionVn": "chiếc đệm, nệm ngủ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "A medium-firm latex mattress supports your back properly.",
      "We bought a new memory-foam mattress for the guest room."
    ],
    "exampleTranslations": [
      "Một chiếc nệm cao su có độ cứng vừa phải nâng đỡ cột sống lưng rất tốt.",
      "Chúng tôi đã mua một chiếc đệm mút mới cho phòng ngủ cho khách."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_03",
    "word": "pillow",
    "phonetic": "/ˈpɪloʊ/",
    "definition": "A rectangular cloth bag stuffed with feathers, foam, or other soft materials, used to support the head when lying or sleeping.",
    "definitionVn": "chiếc gối (kê đầu)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Rest your head on a soft, supportive pillow.",
      "She fluffed the feather pillows before going to bed."
    ],
    "exampleTranslations": [
      "Tựa đầu lên một chiếc gối mềm mại và nâng đỡ êm ái nhé.",
      "Cô ấy vỗ bồng những chiếc gối lông vũ trước khi đi ngủ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_04",
    "word": "blanket",
    "phonetic": "/ˈblæŋkɪt/",
    "definition": "A large piece of woolen or other material used as a warm covering on a bed.",
    "definitionVn": "chiếc chăn ấm, mền đắp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Pull up the warm fleece blanket on chilly winter nights.",
      "Fold the blanket neatly at the foot of the bed."
    ],
    "exampleTranslations": [
      "Kéo chiếc chăn nỉ ấm lên đắp trong những đêm đông se lạnh nhé.",
      "Gấp chiếc chăn gọn gàng ở cuối chân giường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_05",
    "word": "sheet",
    "phonetic": "/ʃiːt/",
    "definition": "A large rectangular piece of cotton or other fabric, used on a bed to lay on or under.",
    "definitionVn": "ga trải giường, drap giường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Change the bed sheets once a week for fresh hygiene.",
      "Crisp clean cotton sheets feel cool against the skin."
    ],
    "exampleTranslations": [
      "Thay ga trải giường mỗi tuần một lần để đảm bảo vệ sinh nhé.",
      "Những tấm ga trải giường bằng cotton sạch sẽ mang lại cảm giác mát mịn trên da."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_06",
    "word": "quilt",
    "phonetic": "/kwɪlt/",
    "definition": "A warm bed covering made of padding enclosed between layers of fabric and kept in place by lines of stitching.",
    "definitionVn": "chăn bông chần, chăn ấm dày",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "A thick down quilt keeps you cozy even in sub-zero weather.",
      "Grandmother stitched a colorful patchwork quilt."
    ],
    "exampleTranslations": [
      "Một chiếc chăn bông lông vũ dày giữ cho bạn ấm cúng ngay cả trong thời tiết dưới 0 độ.",
      "Bà đã chần một chiếc chăn bông ghép vải nhiều màu sắc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_07",
    "word": "cushion",
    "phonetic": "/ˈkʊʃn/",
    "definition": "A soft bag of cloth stuffed with a mass of soft material, used as a comfortable support for sitting or leaning on.",
    "definitionVn": "gối tựa lưng, đệm ngồi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Place colorful decorative cushions on the bedroom armchair.",
      "Rest your back against a soft cushion while reading."
    ],
    "exampleTranslations": [
      "Đặt những chiếc gối tựa trang trí nhiều màu sắc lên ghế bành phòng ngủ nhé.",
      "Tựa lưng vào chiếc gối mềm khi đọc sách nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_08",
    "word": "wardrobe",
    "phonetic": "/ˈwɔːrdroʊb/",
    "definition": "A large, tall cabinet in which clothes may be hung or stored.",
    "definitionVn": "tủ quần áo (đứng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Hang your ironed shirts neatly inside the wooden wardrobe.",
      "Organize your winter coats inside the spacious wardrobe."
    ],
    "exampleTranslations": [
      "Treo những chiếc áo sơ mi đã ủi phẳng ngăn nắp trong tủ quần áo gỗ nhé.",
      "Sắp xếp áo khoác mùa đông gọn gàng trong chiếc tủ quần áo rộng rãi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_09",
    "word": "closet",
    "phonetic": "/ˈklɑːzɪt/",
    "definition": "A small room or cupboard in which items are stored, especially clothes.",
    "definitionVn": "tủ âm tường, phòng để quần áo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "The master bedroom features a walk-in clothes closet.",
      "Store seasonal shoes in the bottom of the closet."
    ],
    "exampleTranslations": [
      "Phòng ngủ chính có một phòng để quần áo âm tường rộng rãi.",
      "Cất giày dép theo mùa ở dưới đáy tủ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_10",
    "word": "drawer",
    "phonetic": "/drɔːr/",
    "definition": "A box-like storage compartment without a lid, made to slide horizontally in and out of a piece of furniture.",
    "definitionVn": "ngăn kéo (tủ, bàn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Keep clean socks and underwear in the top dresser drawer.",
      "Slide the wooden drawer closed quietly."
    ],
    "exampleTranslations": [
      "Cất tất sạch và đồ lót trong ngăn kéo trên cùng của tủ nhé.",
      "Trượt nhẹ đóng ngăn kéo gỗ lại thật êm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_11",
    "word": "curtain",
    "phonetic": "/ˈkɜːrtn/",
    "definition": "A piece of material suspended at the top to form a screen, typically movable across a window.",
    "definitionVn": "rèm cửa sổ, màn che",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Draw the blackout curtains to block morning light for sleeping.",
      "She opened the window curtains to let in fresh sunlight."
    ],
    "exampleTranslations": [
      "Kéo rèm cản sáng để che ánh nắng sớm cho giấc ngủ nhé.",
      "Cô ấy mở rèm cửa sổ để đón ánh nắng sớm trong lành."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_12",
    "word": "alarm clock",
    "phonetic": "/əˈlɑːrm klɑːk/",
    "definition": "A clock that can be set to sound an alarm at a desired time.",
    "definitionVn": "đồng hồ báo thức",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Set your alarm clock for 6:30 AM so you are not late for class.",
      "The alarm clock rang cheerfully on the bedside table."
    ],
    "exampleTranslations": [
      "Đặt đồng hồ báo thức lúc 6h30 sáng để không bị muộn học nhé.",
      "Chiếc đồng hồ báo thức reo vang vui vẻ trên bàn đầu giường."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_13",
    "word": "nightstand",
    "phonetic": "/ˈnaɪtstænd/",
    "definition": "A small, low bedside table, typically having drawers.",
    "definitionVn": "bàn đầu giường, tab đầu giường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Keep a lamp, your book, and a glass of water on your nightstand.",
      "Charge your smartphone on the bedside nightstand."
    ],
    "exampleTranslations": [
      "Đặt đèn ngủ, cuốn sách và một ly nước trên bàn đầu giường nhé.",
      "Sạc điện thoại trên chiếc tab đầu giường nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_14",
    "word": "sleep",
    "phonetic": "/sliːp/",
    "definition": "A natural periodic state of rest for mind and body.",
    "definitionVn": "ngủ, giấc ngủ",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Aim to sleep for eight hours of quality rest every night.",
      "Turn off digital screens thirty minutes before going to sleep."
    ],
    "exampleTranslations": [
      "Hãy hướng tới việc ngủ đủ 8 tiếng nghỉ ngơi chất lượng mỗi đêm nhé.",
      "Tắt các màn hình điện tử 30 phút trước khi đi ngủ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_15",
    "word": "dream",
    "phonetic": "/driːm/",
    "definition": "A series of thoughts, images, and sensations occurring in a person's mind during sleep.",
    "definitionVn": "giấc mơ, giấc chiêm bao",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "I had a pleasant and colorful dream about traveling last night.",
      "Follow your dreams with determination."
    ],
    "exampleTranslations": [
      "Đêm qua tôi đã có một giấc mơ đẹp và ngập tràn màu sắc về việc đi du lịch.",
      "Hãy theo đuổi những ước mơ của bạn với lòng quyết tâm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_16",
    "word": "yawn",
    "phonetic": "/jɔːn/",
    "definition": "Involuntarily open one's mouth wide and inhale deeply due to tiredness or boredom.",
    "definitionVn": "ngáp (khi buồn ngủ)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "Cover your mouth with your hand when you yawn politely.",
      "The sleepy child gave a big yawn and rubbed her eyes."
    ],
    "exampleTranslations": [
      "Hãy lấy tay che miệng khi ngáp để lịch sự nhé.",
      "Đứa trẻ buồn ngủ ngáp một cái thật to và dụi mắt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_17",
    "word": "nap",
    "phonetic": "/næp/",
    "definition": "A short sleep, especially during the day.",
    "definitionVn": "giấc ngủ trưa, chợp mắt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "A short 20-minute power nap in the afternoon boosts energy and focus.",
      "The cat took a cozy nap in the sunlit patch."
    ],
    "exampleTranslations": [
      "Một giấc chợp mắt ngắn 20 phút vào buổi trưa giúp tăng cường năng lượng và sự tập trung.",
      "Chú mèo ngủ một giấc ngon lành dưới vạt nắng ấm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_18",
    "word": "wake up",
    "phonetic": "/weɪk ʌp/",
    "definition": "Emerge or cause to emerge from sleep; stop sleeping.",
    "definitionVn": "thức giấc, tỉnh dậy",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "I wake up refreshed and energized every morning at 6:00 AM.",
      "Wake up, breakfast is ready on the table!"
    ],
    "exampleTranslations": [
      "Tôi thức giấc sảng khoái và tràn đầy năng lượng mỗi sáng lúc 6h.",
      "Dậy đi nào, bữa sáng đã sẵn sàng trên bàn rồi!"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_19",
    "word": "snore",
    "phonetic": "/snɔːr/",
    "definition": "Breathe with a snorting or grunting sound while asleep.",
    "definitionVn": "ngáy (khi ngủ say)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "He slept so soundly that he started to snore gently.",
      "Sleeping on your side can reduce snoring."
    ],
    "exampleTranslations": [
      "Anh ấy ngủ say đến mức bắt đầu ngáy nhè nhẹ.",
      "Nằm nghiêng có thể giúp giảm tiếng ngáy khi ngủ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_bedroo_20",
    "word": "cozy",
    "phonetic": "/ˈkoʊzi/",
    "definition": "Giving a feeling of comfort, warmth, and relaxation.",
    "definitionVn": "ấm cúng, êm ái dễ chịu",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_bedroom_sleep",
    "themeNameVn": "Phòng ngủ & Giấc ngủ",
    "themeNameEn": "Bedroom & Sleep",
    "examples": [
      "My bedroom is small, quiet, and very cozy.",
      "Curling up with a good book under a blanket is so cozy."
    ],
    "exampleTranslations": [
      "Phòng ngủ của tôi nhỏ nhắn, yên tĩnh và vô cùng ấm cúng.",
      "Cuộn mình đọc một cuốn sách hay dưới chăn ấm thật êm ái dễ chịu."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_PHONG_NGU_GIAC_NGU: VocabularyTopicPackage = {
  theme: THEME_PHONG_NGU_GIAC_NGU,
  vocabs: VOCABS_PHONG_NGU_GIAC_NGU,
};

export default CHUDE_PHONG_NGU_GIAC_NGU;
