import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 41: Phụ kiện thời trang (Fashion Accessories)
 * Mã chủ đề: t_basic_fashion_accessories
 * Tổng số từ vựng: 20 từ
 */
export const THEME_PHU_KIEN_THOI_TRANG: BasicTheme = {
  "id": "t_basic_fashion_accessories",
  "name": "Phụ kiện thời trang",
  "nameEn": "Fashion Accessories",
  "icon": "💍",
  "difficulty": 1,
  "color": "#9333ea",
  "description": "Nhẫn, dây chuyền, vòng tay, hoa tai, thắt lưng, khăn choàng, kính râm.",
  "totalVocabs": 20
};

export const VOCABS_PHU_KIEN_THOI_TRANG: BasicVocabularyItem[] = [
  {
    "id": "bv_fashio_01",
    "word": "ring",
    "phonetic": "/rɪŋ/",
    "definition": "A small circular band, typically of precious metal, worn on a finger as an ornament.",
    "definitionVn": "chiếc nhẫn (đeo tay)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "She wears a delicate silver ring on her finger.",
      "The wedding ring symbolizes eternal love."
    ],
    "exampleTranslations": [
      "Cô ấy đeo một chiếc nhẫn bạc thanh nhã trên ngón tay.",
      "Chiếc nhẫn cưới tượng trưng cho tình yêu vĩnh cửu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_02",
    "word": "necklace",
    "phonetic": "/ˈnekləs/",
    "definition": "An ornamental chain or string of beads, jewels, or links worn around the neck.",
    "definitionVn": "dây chuyền, vòng cổ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "She received a graceful pearl necklace on her graduation.",
      "The gold necklace sparkles in the light."
    ],
    "exampleTranslations": [
      "Cô ấy đã nhận được một chuỗi vòng ngọc trai trang nhã nhân ngày tốt nghiệp.",
      "Sợi dây chuyền vàng lấp lánh dưới ánh đèn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_03",
    "word": "bracelet",
    "phonetic": "/ˈbreɪslət/",
    "definition": "An ornamental band, hoop, or chain worn on the wrist or arm.",
    "definitionVn": "vòng tay, lắc tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "She bought a handcrafted jade bracelet in Hoi An.",
      "The silver bracelet matches her watch."
    ],
    "exampleTranslations": [
      "Cô ấy đã mua một chiếc vòng ngọc bích thủ công ở Hội An.",
      "Chiếc lắc tay bạc rất hợp với đồng hồ của cô ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_04",
    "word": "earring",
    "phonetic": "/ˈɪrɪŋ/",
    "definition": "A piece of jewelry worn on the lobe or edge of the ear.",
    "definitionVn": "đôi khuyên tai, bông tai",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "She put on sparkling diamond stud earrings for the gala.",
      "Small gold hoop earrings are timeless."
    ],
    "exampleTranslations": [
      "Cô ấy đeo đôi khuyên tai đính kim cương lấp lánh đến dạ tiệc.",
      "Những đôi bông tai tròn bằng vàng nhỏ nhắn luôn đẹp mãi với thời gian."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_05",
    "word": "belt",
    "phonetic": "/belt/",
    "definition": "A strip of leather or other material worn around the waist to support or hold in clothes.",
    "definitionVn": "thắt lưng, dây nịt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "He fastened a classic black leather belt around his trousers.",
      "Choose a belt that matches the color of your dress shoes."
    ],
    "exampleTranslations": [
      "Anh ấy thắt một chiếc dây nịt da đen cổ điển quanh quần âu.",
      "Hãy chọn một chiếc thắt lưng có màu hợp với giày tây của bạn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_06",
    "word": "scarf",
    "phonetic": "/skɑːrf/",
    "definition": "A length of fabric worn around the neck or head for warmth, sun protection, or decoration.",
    "definitionVn": "khăn quàng cổ, khăn choàng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Wrap a warm wool scarf around your neck in cold weather.",
      "She wore a lightweight silk scarf in spring."
    ],
    "exampleTranslations": [
      "Quàng một chiếc khăn len ấm quanh cổ vào mùa lạnh nhé.",
      "Cô ấy quàng chiếc khăn lụa mỏng nhẹ vào mùa xuân."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_07",
    "word": "glove",
    "phonetic": "/ɡlʌv/",
    "definition": "A covering for the hand made of cloth or leather, with separate parts for each finger.",
    "definitionVn": "đôi găng tay, bao tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Wear leather gloves to keep your hands warm when riding a motorbike in winter.",
      "Put on rubber cleaning gloves before washing dishes."
    ],
    "exampleTranslations": [
      "Đeo găng tay da để giữ ấm đôi bàn tay khi đi xe máy vào mùa đông nhé.",
      "Đeo găng tay cao su trước khi rửa chén nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_08",
    "word": "handbag",
    "phonetic": "/ˈhændbæɡ/",
    "definition": "A small bag used by women to hold money and personal items.",
    "definitionVn": "túi xách tay (nữ)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "She carries her wallet and lipstick inside her stylish handbag.",
      "The brown leather handbag matches her outfit."
    ],
    "exampleTranslations": [
      "Cô ấy để ví tiền và son môi trong chiếc túi xách tay phong cách của mình.",
      "Chiếc túi xách da màu nâu rất hợp với trang phục của cô ấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_09",
    "word": "sunglasses",
    "phonetic": "/ˈsʌnɡlæsɪz/",
    "definition": "Glasses tinted to protect the eyes from sunlight or glare.",
    "definitionVn": "kính râm, kính mát chống nắng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Wear UV-protection sunglasses when going to the sunny beach.",
      "He put on stylish dark sunglasses."
    ],
    "exampleTranslations": [
      "Hãy đeo kính râm chống tia UV khi đi dạo trên bãi biển đầy nắng nhé.",
      "Anh ấy đeo một chiếc kính mát màu tối rất phong cách."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_10",
    "word": "tie",
    "phonetic": "/taɪ/",
    "definition": "A strip of material worn around the neck and tied in a knot at the front, with its ends hanging down.",
    "definitionVn": "cà-vạt, ca vát",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "He wore a navy blue silk tie with his formal suit.",
      "Learn how to tie a neat Windsor knot."
    ],
    "exampleTranslations": [
      "Anh ấy đã đeo một chiếc cà vạt lụa màu xanh navy cùng bộ vest trang trọng.",
      "Hãy học cách thắt nút cà vạt kiểu Windsor gọn gàng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_11",
    "word": "zipper",
    "phonetic": "/ˈzɪpər/",
    "definition": "A fastening device consisting of two parallel tracks of teeth that can be interlocked by a sliding tab.",
    "definitionVn": "khóa kéo, dây kéo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Zip up the jacket zipper to keep out the cold wind.",
      "The backpack has sturdy metal zippers."
    ],
    "exampleTranslations": [
      "Kéo khóa kéo áo khoác lên để cản gió lạnh nhé.",
      "Chiếc ba lô có những chiếc khóa kéo kim loại rất chắc chắn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_12",
    "word": "button",
    "phonetic": "/ˈbʌtn/",
    "definition": "A small disc or knob sewn on to a garment, either to fasten it by being pushed through a buttonhole or for decoration.",
    "definitionVn": "chiếc cúc áo, khuy áo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Fasten all the shirt buttons neatly.",
      "She sewed a loose button back onto her coat."
    ],
    "exampleTranslations": [
      "Cài tất cả các cúc áo sơ mi thật gọn gàng nhé.",
      "Cô ấy đã khâu chiếc khuy bị lỏng lại vào áo khoác."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_13",
    "word": "pocket",
    "phonetic": "/ˈpɑːkɪt/",
    "definition": "A small bag sewn into or on clothing so as to form a pouch for carrying small articles.",
    "definitionVn": "chiếc túi áo, túi quần",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Keep your keys safely inside your zippered pocket.",
      "He put his hands in his coat pockets to stay warm."
    ],
    "exampleTranslations": [
      "Để chùm chìa khóa an toàn trong chiếc túi có khóa kéo nhé.",
      "Anh ấy cho tay vào túi áo khoác để giữ ấm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_14",
    "word": "silk",
    "phonetic": "/sɪlk/",
    "definition": "A fine, strong, soft lustrous fiber produced by silkworms in making cocoons.",
    "definitionVn": "lụa tơ tằm, tơ lụa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Van Phuc Silk Village in Hanoi is famous for high-quality Vietnamese silk.",
      "A natural silk scarf is soft and breathable."
    ],
    "exampleTranslations": [
      "Làng lụa Vạn Phúc ở Hà Nội nổi tiếng với lụa Việt Nam chất lượng cao.",
      "Một chiếc khăn lụa tự nhiên rất mềm mại và thoáng khí."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_15",
    "word": "leather",
    "phonetic": "/ˈleðər/",
    "definition": "A material made from the skin of an animal by tanning or a similar process.",
    "definitionVn": "chất liệu da (da thật)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Genuine leather shoes are durable, comfortable, and elegant.",
      "He bought a handcrafted brown leather wallet."
    ],
    "exampleTranslations": [
      "Giày da thật rất bền, đi êm chân và lịch sự.",
      "Anh ấy đã mua một chiếc ví da màu nâu làm thủ công."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_16",
    "word": "wool",
    "phonetic": "/wʊl/",
    "definition": "The fine soft curly or wavy hair forming the coat of a sheep, goat, or similar animal.",
    "definitionVn": "len, lông cừu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "A thick wool sweater keeps you warm on freezing winter days.",
      "She knit a warm wool beanie hat."
    ],
    "exampleTranslations": [
      "Chiếc áo len dày giữ cho bạn ấm áp trong những ngày đông giá rét.",
      "Cô ấy đã đan một chiếc mũ len ấm áp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_17",
    "word": "umbrella",
    "phonetic": "/ʌmˈbrelə/",
    "definition": "A folding canopy supported by metal ribs on a handle, used for protection from rain or sun.",
    "definitionVn": "chiếc ô, chiếc dù che mưa nắng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Carry a compact folding umbrella in your backpack.",
      "She opened her colorful umbrella during the sudden downpour."
    ],
    "exampleTranslations": [
      "Mang theo một chiếc ô gập nhỏ gọn trong ba lô nhé.",
      "Cô ấy đã mở chiếc ô rực rỡ sắc màu trong cơn mưa rào bất chợt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_18",
    "word": "jewelry",
    "phonetic": "/ˈdʒuːəlri/",
    "definition": "Personal ornaments, such as necklaces, rings, or bracelets, that are typically made from or contain jewels and precious metal.",
    "definitionVn": "trang sức, nữ trang",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Store valuable gold and silver jewelry in a locked velvet box.",
      "She appreciates minimalist and handmade jewelry."
    ],
    "exampleTranslations": [
      "Cất giữ đồ trang sức vàng bạc quý giá trong chiếc hộp nhung có khóa nhé.",
      "Cô ấy yêu thích những món đồ trang sức tối giản và làm thủ công."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_19",
    "word": "watch",
    "phonetic": "/wɑːtʃ/",
    "definition": "A small timepiece worn typically on a strap on one's wrist.",
    "definitionVn": "đồng hồ đeo tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Check the time on your wrist watch before entering the exam room.",
      "A smartwatch tracks your daily footsteps and heart rate."
    ],
    "exampleTranslations": [
      "Kiểm tra giờ trên đồng hồ đeo tay trước khi vào phòng thi nhé.",
      "Đồng hồ thông minh theo dõi số bước chân và nhịp tim hàng ngày của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_fashio_20",
    "word": "wallet",
    "phonetic": "/ˈwɑːlɪt/",
    "definition": "A pocket-sized flat folding case for holding money and plastic cards.",
    "definitionVn": "ví tiền, bóp tiền",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_fashion_accessories",
    "themeNameVn": "Phụ kiện thời trang",
    "themeNameEn": "Fashion Accessories",
    "examples": [
      "Keep your identity card and banknotes securely inside your wallet.",
      "He took out his wallet to pay for the groceries."
    ],
    "exampleTranslations": [
      "Giữ căn cước công dân và tiền giấy an toàn trong ví nhé.",
      "Anh ấy đã lấy ví ra để thanh toán tiền mua hàng."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_PHU_KIEN_THOI_TRANG: VocabularyTopicPackage = {
  theme: THEME_PHU_KIEN_THOI_TRANG,
  vocabs: VOCABS_PHU_KIEN_THOI_TRANG,
};

export default CHUDE_PHU_KIEN_THOI_TRANG;
