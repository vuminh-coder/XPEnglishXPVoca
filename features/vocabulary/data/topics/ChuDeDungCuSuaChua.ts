import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 32: Dụng cụ & Sửa chữa (Tools & Home Repair)
 * Mã chủ đề: t_basic_tools_repair
 * Tổng số từ vựng: 20 từ
 */
export const THEME_DUNG_CU_SUA_CHUA: BasicTheme = {
  "id": "t_basic_tools_repair",
  "name": "Dụng cụ & Sửa chữa",
  "nameEn": "Tools & Home Repair",
  "icon": "🔨",
  "difficulty": 1,
  "color": "#ea580c",
  "description": "Búa, đinh, ốc vít, tua-vít, kìm, cưa, máy khoan và sửa đồ gia đình.",
  "totalVocabs": 20
};

export const VOCABS_DUNG_CU_SUA_CHUA: BasicVocabularyItem[] = [
  {
    "id": "bv_tools__01",
    "word": "tool",
    "phonetic": "/tuːl/",
    "definition": "A device or implement, especially one held in the hand, used to carry out a particular function.",
    "definitionVn": "dụng cụ, công cụ cầm tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "A toolbox contains all the essential hand tools.",
      "Language is a powerful tool for communication."
    ],
    "exampleTranslations": [
      "Một hộp đồ nghề chứa tất cả các dụng cụ cầm tay thiết yếu.",
      "Ngôn ngữ là công cụ mạnh mẽ để giao tiếp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__02",
    "word": "hammer",
    "phonetic": "/ˈhæmər/",
    "definition": "A tool with a heavy metal head mounted at right angles at the end of a handle, used for hitting nails.",
    "definitionVn": "cây búa, búa đóng đinh",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Use a hammer to drive the steel nail into the wooden wall.",
      "Be careful not to hit your thumb with the hammer."
    ],
    "exampleTranslations": [
      "Dùng búa để đóng chiếc đinh thép vào tường gỗ nhé.",
      "Hãy cẩn thận kẻo đập búa vào ngón tay cái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__03",
    "word": "nail",
    "phonetic": "/neɪl/",
    "definition": "A small metal spike with a broadened flat head, driven into wood to join things.",
    "definitionVn": "chiếc đinh (đóng gỗ, tường)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Hang the framed picture on a sturdy wall nail.",
      "Hammer the nail straight into the board."
    ],
    "exampleTranslations": [
      "Treo bức tranh có khung lên một chiếc đinh tường chắc chắn nhé.",
      "Hãy đóng chiếc đinh thẳng đứng vào tấm ván."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__04",
    "word": "screw",
    "phonetic": "/skruː/",
    "definition": "A short, slender, sharp-pointed metal pin with a raised helical thread running around it.",
    "definitionVn": "con ốc vít, đinh ốc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Tighten the loose screw on the chair leg.",
      "Use screws to assemble the wooden bookshelf."
    ],
    "exampleTranslations": [
      "Hãy vặn chặt con ốc vít bị lỏng ở chân ghế lại.",
      "Dùng ốc vít để lắp ráp kệ sách gỗ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__05",
    "word": "screwdriver",
    "phonetic": "/ˈskruːdraɪvər/",
    "definition": "A tool with a flattened or cross-shaped tip that fits into the head of a screw to turn it.",
    "definitionVn": "tua-vít, cây vặn vít",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Use a flathead screwdriver to open the battery compartment.",
      "Every home should have a set of screwdrivers."
    ],
    "exampleTranslations": [
      "Dùng tua-vít đầu dẹp để mở ngăn chứa pin nhé.",
      "Mỗi gia đình nên có một bộ tua-vít."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__06",
    "word": "wrench",
    "phonetic": "/rentʃ/",
    "definition": "A tool used for gripping and turning nuts or bolts.",
    "definitionVn": "mỏ lết, cờ-lê",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "The plumber used an adjustable wrench to tighten the leaking pipe.",
      "Loosen the wheel bolts with a tire wrench."
    ],
    "exampleTranslations": [
      "Thợ sửa ống nước đã dùng mỏ lết điều chỉnh để siết chặt đường ống bị rò rỉ.",
      "Nới lỏng bu lông bánh xe bằng cờ-lê nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__07",
    "word": "pliers",
    "phonetic": "/ˈplaɪərz/",
    "definition": "Pincers with parallel, flat, and typically serrated surfaces, used for gripping small objects or bending wire.",
    "definitionVn": "cái kìm, kềm bấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Hold the thin copper wire securely with pliers.",
      "Cut the wire with the sharp edge of the pliers."
    ],
    "exampleTranslations": [
      "Giữ chặt sợi dây đồng mảnh bằng kìm nhé.",
      "Cắt dây điện bằng lưỡi sắc của kìm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__08",
    "word": "saw",
    "phonetic": "/sɔː/",
    "definition": "A hand tool for cutting wood or other hard materials, typically with a toothed blade.",
    "definitionVn": "cái cưa (cưa gỗ, kim loại)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "The carpenter cut the wooden plank with a hand saw.",
      "Keep your hands clear of the sharp saw blade."
    ],
    "exampleTranslations": [
      "Người thợ mộc đã cắt tấm ván gỗ bằng chiếc cưa tay.",
      "Giữ tay tránh xa lưỡi cưa sắc bén nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__09",
    "word": "drill",
    "phonetic": "/drɪl/",
    "definition": "A tool or machine with a rotating cutting tip or reciprocating hammer, used for making holes.",
    "definitionVn": "máy khoan, mũi khoan",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Drill a small hole in the wall to hang the shelf.",
      "An electric cordless drill is very convenient."
    ],
    "exampleTranslations": [
      "Khoan một lỗ nhỏ trên tường để treo kệ nhé.",
      "Một chiếc máy khoan điện không dây rất tiện lợi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__10",
    "word": "tape",
    "phonetic": "/teɪp/",
    "definition": "A narrow strip of material with an adhesive surface, used for sticking things together.",
    "definitionVn": "băng dính, băng keo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Seal the cardboard box with strong packaging tape.",
      "Use electrical tape to insulate the exposed wire."
    ],
    "exampleTranslations": [
      "Dán kín chiếc hộp các-tông bằng băng keo đóng gói chắc chắn.",
      "Dùng băng keo điện để bọc cách điện dây hở nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__11",
    "word": "ladder",
    "phonetic": "/ˈlædər/",
    "definition": "A structure consisting of a series of bars or steps between two upright lengths of wood or metal.",
    "definitionVn": "chiếc thang, thang nhôm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Climb the step ladder carefully to change the light bulb.",
      "Make sure the ladder is stable on the floor."
    ],
    "exampleTranslations": [
      "Leo lên chiếc thang từng bước cẩn thận để thay bóng đèn nhé.",
      "Hãy đảm bảo chiếc thang đứng vững vàng trên sàn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__12",
    "word": "paint",
    "phonetic": "/peɪnt/",
    "definition": "A colored substance which is spread over a surface and dries to leave a thin decorative or protective coating.",
    "definitionVn": "sơn, nước sơn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "We bought two cans of sky-blue paint for the bedroom.",
      "The fresh paint on the door is still wet."
    ],
    "exampleTranslations": [
      "Chúng tôi đã mua hai thùng sơn màu xanh da trời cho phòng ngủ.",
      "Lớp sơn mới trên cánh cửa vẫn còn ướt đấy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__13",
    "word": "brush",
    "phonetic": "/brʌʃ/",
    "definition": "An implement with a handle, consisting of bristles used for painting or cleaning.",
    "definitionVn": "cọ quét sơn, chổi cọ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Apply the wall paint smoothly with a wide paint brush.",
      "Clean the paint brush thoroughly with water after use."
    ],
    "exampleTranslations": [
      "Quét sơn tường thật mịn bằng một cây cọ quét sơn bản rộng nhé.",
      "Rửa sạch cọ sơn bằng nước thật kỹ sau khi dùng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__14",
    "word": "rope",
    "phonetic": "/roʊp/",
    "definition": "A length of strong cord made by twisting together strands of natural fibers or wire.",
    "definitionVn": "sợi dây thừng, dây chão",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Tie the luggage securely to the roof rack with strong rope.",
      "The boat was tied to the dock with a thick rope."
    ],
    "exampleTranslations": [
      "Buộc hành lý chắc chắn vào giá nóc xe bằng sợi dây thừng bền nhé.",
      "Con thuyền được buộc vào cầu cảng bằng dây chão dày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__15",
    "word": "wire",
    "phonetic": "/ˈwaɪər/",
    "definition": "Metal drawn out into the form of a thin flexible thread or rod.",
    "definitionVn": "dây kim loại, dây điện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Copper wire conducts electricity very efficiently.",
      "Tie the garden fence with flexible steel wire."
    ],
    "exampleTranslations": [
      "Dây đồng dẫn điện rất hiệu quả.",
      "Buộc hàng rào vườn bằng dây thép dẻo nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__16",
    "word": "fix",
    "phonetic": "/fɪks/",
    "definition": "Mend or repair something broken or malfunctioning.",
    "definitionVn": "sửa chữa, khắc phục",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "My father knows how to fix broken bicycles.",
      "Can you fix the leaky water tap?"
    ],
    "exampleTranslations": [
      "Bố tôi biết cách sửa xe đạp bị hỏng.",
      "Bạn có thể sửa chiếc vòi nước bị rò rỉ không?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__17",
    "word": "repair",
    "phonetic": "/rɪˈper/",
    "definition": "Restore something damaged, faulty, or worn to a good condition.",
    "definitionVn": "tu sửa, phục hồi",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "The technician came to repair the air conditioner.",
      "It costs less to repair than to buy new."
    ],
    "exampleTranslations": [
      "Kỹ thuật viên đã đến để sửa chữa máy điều hòa.",
      "Chi phí sửa chữa rẻ hơn so với việc mua mới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__18",
    "word": "build",
    "phonetic": "/bɪld/",
    "definition": "Construct something by putting parts or material together.",
    "definitionVn": "xây dựng, lắp ráp",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Workers are building a new modern bridge over the river.",
      "They built a treehouse in the backyard."
    ],
    "exampleTranslations": [
      "Các công nhân đang xây dựng một cây cầu hiện đại bắc qua sông.",
      "Họ đã dựng một ngôi nhà trên cây ở sân sau."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__19",
    "word": "break",
    "phonetic": "/breɪk/",
    "definition": "Separate into pieces as a result of a blow, shock, or strain.",
    "definitionVn": "làm vỡ, gãy, hỏng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Handle glass cups carefully so they don't break.",
      "He accidentally broke his sunglasses."
    ],
    "exampleTranslations": [
      "Cầm những chiếc cốc thủy tinh cẩn thận kẻo vỡ nhé.",
      "Anh ấy vô tình làm gãy chiếc kính râm của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_tools__20",
    "word": "lock",
    "phonetic": "/lɑːk/",
    "definition": "A mechanism for keeping a door, lid, etc., fastened, typically operated by a key or combination.",
    "definitionVn": "ổ khóa, khóa cửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_tools_repair",
    "themeNameVn": "Dụng cụ & Sửa chữa",
    "themeNameEn": "Tools & Home Repair",
    "examples": [
      "Always lock the front door when you leave the house.",
      "The bicycle has a sturdy combination lock."
    ],
    "exampleTranslations": [
      "Hãy luôn khóa cửa trước khi bạn rời khỏi nhà nhé.",
      "Chiếc xe đạp có một ổ khóa số rất chắc chắn."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_DUNG_CU_SUA_CHUA: VocabularyTopicPackage = {
  theme: THEME_DUNG_CU_SUA_CHUA,
  vocabs: VOCABS_DUNG_CU_SUA_CHUA,
};

export default CHUDE_DUNG_CU_SUA_CHUA;
