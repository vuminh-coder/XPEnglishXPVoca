import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 49: Chất liệu & Vật liệu (Materials & Substances)
 * Mã chủ đề: t_basic_materials_substances
 * Tổng số từ vựng: 20 từ
 */
export const THEME_CHAT_LIEU_VAT_LIEU: BasicTheme = {
  "id": "t_basic_materials_substances",
  "name": "Chất liệu & Vật liệu",
  "nameEn": "Materials & Substances",
  "icon": "🪵",
  "difficulty": 1,
  "color": "#854d0e",
  "description": "Gỗ, kim loại, nhựa, thủy tinh, giấy, bông vải, cao su, đất sét, vàng bạc.",
  "totalVocabs": 20
};

export const VOCABS_CHAT_LIEU_VAT_LIEU: BasicVocabularyItem[] = [
  {
    "id": "bv_materi_01",
    "word": "wood",
    "phonetic": "/wʊd/",
    "definition": "The hard fibrous material that forms the main substance of the trunk or branches of a tree.",
    "definitionVn": "gỗ, chất liệu gỗ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Solid oak wood is used to build durable furniture.",
      "A fire of dry wood kept the cabin warm all night."
    ],
    "exampleTranslations": [
      "Gỗ sồi nguyên khối được dùng để đóng đồ nội thất bền đẹp.",
      "Ngọn lửa từ củi gỗ khô giữ cho căn nhà gỗ ấm cúng suốt đêm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_02",
    "word": "metal",
    "phonetic": "/ˈmetl/",
    "definition": "A solid material that is typically hard, shiny, malleable, and conducts electricity and heat.",
    "definitionVn": "kim loại (sắt, thép, nhôm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "The bridge structure is reinforced with strong metal beams.",
      "Gold and silver are precious metals used for jewelry."
    ],
    "exampleTranslations": [
      "Cấu trúc cây cầu được gia cố bằng những thanh kim loại chắc chắn.",
      "Vàng và bạc là những kim loại quý được dùng làm trang sức."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_03",
    "word": "plastic",
    "phonetic": "/ˈplæstɪk/",
    "definition": "A synthetic material made from a wide range of organic polymers that can be molded into shape.",
    "definitionVn": "nhựa, chất dẻo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Reduce single-use plastic bottles to protect the environment.",
      "Recycle plastic containers properly."
    ],
    "exampleTranslations": [
      "Giảm thiểu chai nhựa dùng một lần để bảo vệ môi trường nhé.",
      "Tái chế các hộp nhựa đúng quy định nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_04",
    "word": "glass",
    "phonetic": "/ɡlæs/",
    "definition": "A hard, brittle, typically transparent substance made by fusing sand with soda and lime.",
    "definitionVn": "thủy tinh, kính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Windows are made of clear, insulated glass.",
      "Handle delicate glass cups with care."
    ],
    "exampleTranslations": [
      "Cửa sổ được làm bằng kính cách nhiệt trong suốt.",
      "Cầm những chiếc ly thủy tinh mỏng manh thật cẩn thận nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_05",
    "word": "paper",
    "phonetic": "/ˈpeɪpər/",
    "definition": "Material manufactured in thin sheets from the pulp of wood or other fibrous substances.",
    "definitionVn": "giấy, chất liệu giấy",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Books and notebooks are made of recyclable white paper.",
      "Save paper by using digital documents when possible."
    ],
    "exampleTranslations": [
      "Sách và vở ghi chép được làm từ giấy trắng có thể tái chế.",
      "Tiết kiệm giấy bằng cách dùng tài liệu số khi có thể nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_06",
    "word": "cotton",
    "phonetic": "/ˈkɑːtn/",
    "definition": "A soft white fibrous substance that surrounds the seeds of a tropical and subtropical plant.",
    "definitionVn": "vải sợi bông, cotton",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Breathable cotton T-shirts are comfortable in hot summer weather.",
      "Organic cotton is gentle on sensitive skin."
    ],
    "exampleTranslations": [
      "Áo thun cotton thoáng khí rất thoải mái trong thời tiết hè nóng nực.",
      "Bông hữu cơ rất dịu nhẹ với làn da nhạy cảm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_07",
    "word": "rubber",
    "phonetic": "/ˈrʌbər/",
    "definition": "A tough elastic polymeric substance made from the latex of a tropical plant or synthetically.",
    "definitionVn": "cao su (dẻo, đàn hồi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Tires and shoe soles are made of durable natural rubber.",
      "Natural latex rubber pillows support the neck well."
    ],
    "exampleTranslations": [
      "Lốp xe và đế giày được làm từ cao su tự nhiên bền chắc.",
      "Gối cao su thiên nhiên nâng đỡ cổ rất tốt."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_08",
    "word": "clay",
    "phonetic": "/kleɪ/",
    "definition": "A stiff, sticky fine-grained earth, typically yellow, red, or bluish-gray in color and often used for pottery.",
    "definitionVn": "đất sét (làm gốm)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Bat Trang artisans craft exquisite teapots from fine clay.",
      "Children molded animals out of colorful modeling clay."
    ],
    "exampleTranslations": [
      "Các nghệ nhân Bát Tràng chế tác những ấm trà tuyệt xảo từ đất sét mịn.",
      "Trẻ em nặn các con thú từ đất sét nặn nhiều màu sắc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_09",
    "word": "stone",
    "phonetic": "/stoʊn/",
    "definition": "Hard solid non-metallic mineral matter of which rock is made.",
    "definitionVn": "đá tự nhiên, phiến đá",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "The ancient temple was carved from solid mountain stone.",
      "Decorative marble stone adds elegance to floors."
    ],
    "exampleTranslations": [
      "Ngôi đền cổ được tạc từ đá núi nguyên khối.",
      "Đá cẩm thạch trang trí mang lại nét trang nhã cho sàn nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_10",
    "word": "iron",
    "phonetic": "/ˈaɪərn/",
    "definition": "A strong, hard magnetic silvery-gray metal.",
    "definitionVn": "sắt, kim loại sắt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Wrought iron gates in the park have intricate floral designs.",
      "Iron is an essential mineral for red blood cells."
    ],
    "exampleTranslations": [
      "Những cánh cổng sắt uốn trong công viên có hoa văn hoa lá tinh xảo.",
      "Sắt là khoáng chất thiết yếu cho các tế bào hồng cầu."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_11",
    "word": "steel",
    "phonetic": "/stiːl/",
    "definition": "A hard, strong, gray or bluish-gray alloy of iron with carbon and usually other elements.",
    "definitionVn": "thép, inox không gỉ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Stainless steel kitchen cutlery does not rust.",
      "Modern skyscrapers have sturdy steel skeletons."
    ],
    "exampleTranslations": [
      "Dao kéo nhà bếp bằng thép không gỉ không bị hoen gỉ.",
      "Những tòa nhà chọc trời hiện đại có khung thép kiên cố."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_12",
    "word": "gold",
    "phonetic": "/ɡoʊld/",
    "definition": "A yellow precious metal, the chemical element of atomic number 79.",
    "definitionVn": "vàng (kim loại quý)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Gold wedding rings remain shiny forever without tarnishing.",
      "Olympic champions proudly wear gold medals."
    ],
    "exampleTranslations": [
      "Nhẫn cưới bằng vàng luôn sáng bóng mãi mà không bị xỉn màu.",
      "Các nhà vô địch Olympic tự hào đeo huy chương vàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_13",
    "word": "silver",
    "phonetic": "/ˈsɪlvər/",
    "definition": "A precious shiny grayish-white metallic chemical element.",
    "definitionVn": "bạc (kim loại quý)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Silver earrings complement almost any outfit elegantly.",
      "Traditional artisans in Hue craft delicate silver filigree."
    ],
    "exampleTranslations": [
      "Khuyên tai bạc tôn lên hầu như mọi bộ trang phục một cách trang nhã.",
      "Nghệ nhân truyền thống ở Huế chế tác đồ bạc chạm trổ tinh tế."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_14",
    "word": "ceramic",
    "phonetic": "/səˈræmɪk/",
    "definition": "Made of clay and permanently hardened by heat.",
    "definitionVn": "gốm sứ (đồ gốm nung)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Drink hot tea from a handmade ceramic mug.",
      "Ceramic tiles keep floors cool in tropical climates."
    ],
    "exampleTranslations": [
      "Uống trà nóng từ một chiếc cốc gốm thủ công nhé.",
      "Gạch men gốm sứ giữ cho sàn nhà mát mẻ trong khí hậu nhiệt đới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_15",
    "word": "leather",
    "phonetic": "/ˈleðər/",
    "definition": "Material made from the skin of an animal by tanning.",
    "definitionVn": "chất liệu da",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "A genuine leather jacket softens and looks better with age.",
      "He polished his black leather shoes until they shone."
    ],
    "exampleTranslations": [
      "Một chiếc áo khoác da thật sẽ mềm mại và đẹp hơn theo năm tháng.",
      "Anh ấy đánh bóng đôi giày da đen cho đến khi sáng bóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_16",
    "word": "silk",
    "phonetic": "/sɪlk/",
    "definition": "A fine, strong, soft lustrous fiber produced by silkworms.",
    "definitionVn": "lụa tơ tằm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Traditional Vietnamese Ao Dai made of silk is elegant and graceful.",
      "Silk pillowcases are gentle on skin and hair."
    ],
    "exampleTranslations": [
      "Áo dài truyền thống Việt Nam may bằng lụa tơ tằm thật thướt tha và trang nhã.",
      "Vỏ gối lụa rất dịu nhẹ cho làn da và mái tóc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_17",
    "word": "wool",
    "phonetic": "/wʊl/",
    "definition": "The fine soft curly hair forming the coat of a sheep, used for textile.",
    "definitionVn": "sợi len, lông cừu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "A thick wool scarf keeps you warm against winter chills.",
      "Merino wool is super soft and breathable."
    ],
    "exampleTranslations": [
      "Chiếc khăn len dày giữ ấm cho bạn trước những đợt gió lạnh mùa đông.",
      "Len cừu Merino siêu mềm mại và thoáng khí."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_18",
    "word": "fabric",
    "phonetic": "/ˈfæbrɪk/",
    "definition": "Cloth or other material produced by weaving or knitting fibers.",
    "definitionVn": "vải vóc, chất liệu vải",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Choose breathable natural fabric for summer clothing.",
      "The sofa is upholstered in durable linen fabric."
    ],
    "exampleTranslations": [
      "Hãy chọn chất liệu vải tự nhiên thoáng khí cho quần áo mùa hè nhé.",
      "Chiếc ghế sô pha được bọc bằng chất liệu vải lanh bền chắc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_19",
    "word": "material",
    "phonetic": "/məˈtɪriəl/",
    "definition": "The matter from which a thing is or can be made.",
    "definitionVn": "vật liệu, chất liệu chế tạo",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Eco-friendly building materials help reduce carbon footprint.",
      "Recycle plastic materials to protect oceans."
    ],
    "exampleTranslations": [
      "Các vật liệu xây dựng thân thiện với môi trường giúp giảm lượng khí thải carbon.",
      "Tái chế các vật liệu nhựa để bảo vệ đại dương nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_materi_20",
    "word": "hard",
    "phonetic": "/hɑːrd/",
    "definition": "Solid, firm, and rigid; not easily broken, bent, or pierced.",
    "definitionVn": "cứng rắn, bền chắc",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_materials_substances",
    "themeNameVn": "Chất liệu & Vật liệu",
    "themeNameEn": "Materials & Substances",
    "examples": [
      "Diamonds are the hardest natural substance known.",
      "Granite is a hard and durable stone for kitchen counters."
    ],
    "exampleTranslations": [
      "Kim cương là chất liệu tự nhiên cứng nhất từng được biết đến.",
      "Đá hoa cương là loại đá cứng và bền cho mặt bếp."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_CHAT_LIEU_VAT_LIEU: VocabularyTopicPackage = {
  theme: THEME_CHAT_LIEU_VAT_LIEU,
  vocabs: VOCABS_CHAT_LIEU_VAT_LIEU,
};

export default CHUDE_CHAT_LIEU_VAT_LIEU;
