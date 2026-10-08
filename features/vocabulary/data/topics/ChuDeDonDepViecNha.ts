import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 40: Dọn dẹp & Việc nhà (Cleaning & House Chores)
 * Mã chủ đề: t_basic_cleaning_chores
 * Tổng số từ vựng: 20 từ
 */
export const THEME_DON_DEP_VIEC_NHA: BasicTheme = {
  "id": "t_basic_cleaning_chores",
  "name": "Dọn dẹp & Việc nhà",
  "nameEn": "Cleaning & House Chores",
  "icon": "🧹",
  "difficulty": 1,
  "color": "#059669",
  "description": "Quét nhà, lau sàn, giặt giũ, hút bụi, đổ rác, ủi đồ và gấp quần áo.",
  "totalVocabs": 20
};

export const VOCABS_DON_DEP_VIEC_NHA: BasicVocabularyItem[] = [
  {
    "id": "bv_cleani_01",
    "word": "clean",
    "phonetic": "/kliːn/",
    "definition": "Free from dirt, marks, or unwanted matter.",
    "definitionVn": "sạch sẽ, lau dọn sạch",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Clean your study desk every evening before sleeping.",
      "The living room is sparkling clean."
    ],
    "exampleTranslations": [
      "Hãy dọn dẹp bàn học sạch sẽ mỗi tối trước khi đi ngủ nhé.",
      "Phòng khách sạch bóng như mới."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_02",
    "word": "sweep",
    "phonetic": "/swiːp/",
    "definition": "Clean an area by brushing away dirt or litter with a broom.",
    "definitionVn": "quét (nhà, sân)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Sweep the floor with a soft broom every morning.",
      "She swept the dry autumn leaves off the porch."
    ],
    "exampleTranslations": [
      "Hãy quét nhà bằng một chiếc chổi mềm mỗi sáng nhé.",
      "Cô ấy đã quét sạch những chiếc lá thu khô khỏi hiên nhà."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_03",
    "word": "mop",
    "phonetic": "/mɑːp/",
    "definition": "Clean or soak up liquid from a floor with a mop.",
    "definitionVn": "lau sàn, cây lau nhà",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Mop the tiled floor with warm soapy water.",
      "Wring out the wet mop before wiping."
    ],
    "exampleTranslations": [
      "Lau sàn gạch bằng nước xà phòng ấm nhé.",
      "Vắt ráo cây lau nhà ướt trước khi lau nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_04",
    "word": "wash",
    "phonetic": "/wɑːʃ/",
    "definition": "Clean with water and, typically, soap or detergent.",
    "definitionVn": "giặt giũ, rửa sạch",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Wash your hands thoroughly for twenty seconds.",
      "We wash our clothes in the washing machine on weekends."
    ],
    "exampleTranslations": [
      "Rửa tay thật kỹ trong hai mươi giây nhé.",
      "Chúng tôi giặt quần áo bằng máy giặt vào cuối tuần."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_05",
    "word": "vacuum",
    "phonetic": "/ˈvækjuːm/",
    "definition": "Clean with a vacuum cleaner.",
    "definitionVn": "hút bụi (bằng máy hút bụi)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Vacuum the living room carpet twice a week to remove dust.",
      "The cordless vacuum is lightweight and efficient."
    ],
    "exampleTranslations": [
      "Hút bụi thảm phòng khách hai lần một tuần để loại bỏ bụi bẩn.",
      "Máy hút bụi không dây rất nhẹ và hiệu quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_06",
    "word": "dust",
    "phonetic": "/dʌst/",
    "definition": "Wipe the dust from furniture or surfaces.",
    "definitionVn": "quét bụi, laui bụi",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Dust the wooden bookshelf with a microfiber cloth.",
      "Wipe the window sills to keep them dust-free."
    ],
    "exampleTranslations": [
      "Lau bụi kệ sách gỗ bằng khăn sợi nhỏ nhé.",
      "Lau bậu cửa sổ để giữ chúng không bị bám bụi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_07",
    "word": "tidy",
    "phonetic": "/ˈtaɪdi/",
    "definition": "Bring order to a place by arranging things neatly.",
    "definitionVn": "ngăn nắp, dọn dẹp gọn gàng",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Tidy up your bedroom before going out to play.",
      "Keep your stationery tidy inside your drawer."
    ],
    "exampleTranslations": [
      "Dọn dẹp phòng ngủ ngăn nắp trước khi ra ngoài chơi nhé.",
      "Giữ văn phòng phẩm gọn gàng trong ngăn kéo của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_08",
    "word": "trash",
    "phonetic": "/træʃ/",
    "definition": "Discarded matter; refuse; garbage.",
    "definitionVn": "rác thải, đồ bỏ đi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Throw used packaging into the designated trash bin.",
      "Never litter trash in public parks."
    ],
    "exampleTranslations": [
      "Vứt bao bì đã qua sử dụng vào đúng thùng rác quy định nhé.",
      "Không bao giờ xả rác bừa bãi ở công viên công cộng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_09",
    "word": "garbage",
    "phonetic": "/ˈɡɑːrbɪdʒ/",
    "definition": "Wasted or spoiled food and other household refuse.",
    "definitionVn": "rác sinh hoạt, rác thải gia đình",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Take out the household garbage every evening.",
      "Separate plastic recyclable items from organic garbage."
    ],
    "exampleTranslations": [
      "Hãy mang rác sinh hoạt ra ngoài đổ mỗi tối nhé.",
      "Phân loại đồ nhựa có thể tái chế khỏi rác hữu cơ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_10",
    "word": "bin",
    "phonetic": "/bɪn/",
    "definition": "A receptacle in which to deposit rubbish.",
    "definitionVn": "thùng rác (có nắp đậy)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Step on the pedal to open the kitchen trash bin.",
      "Put recyclable paper into the blue recycling bin."
    ],
    "exampleTranslations": [
      "Đạp chân vào bàn đạp để mở nắp thùng rác nhà bếp nhé.",
      "Để giấy tái chế vào thùng rác tái chế màu xanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_11",
    "word": "broom",
    "phonetic": "/bruːm/",
    "definition": "A cleaning implement for sweeping, made of bundle of straw or twigs attached to a handle.",
    "definitionVn": "cây chổi (quét nhà)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "A traditional soft grass broom sweeps fine dust effortlessly.",
      "Hang the broom behind the kitchen door."
    ],
    "exampleTranslations": [
      "Cây chổi đót truyền thống quét sạch bụi mịn một cách dễ dàng.",
      "Treo cây chổi ở phía sau cánh cửa bếp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_12",
    "word": "sponge",
    "phonetic": "/spʌndʒ/",
    "definition": "A piece of a soft, light, porous substance used for washing, cleaning, or padding.",
    "definitionVn": "miếng bọt biển (rửa bát, lau chùi)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Use a soft dishwashing sponge with soap to clean plates.",
      "Rinse and squeeze the sponge dry after use."
    ],
    "exampleTranslations": [
      "Dùng miếng bọt biển rửa chén mềm cùng xà phòng để rửa sạch đĩa.",
      "Rửa sạch và vắt khô miếng bọt biển sau khi sử dụng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_13",
    "word": "soap",
    "phonetic": "/soʊp/",
    "definition": "A substance used with water for washing and cleaning, made of natural oils or fats.",
    "definitionVn": "xà phòng, xà bông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Lather your hands with antibacterial soap under running water.",
      "Natural lavender soap has a calming fragrance."
    ],
    "exampleTranslations": [
      "Xoa xà phòng kháng khuẩn tạo bọt dưới vòi nước chảy nhé.",
      "Xà phòng hoa oải hương tự nhiên có mùi thơm thư giãn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_14",
    "word": "detergent",
    "phonetic": "/dɪˈtɜːrdʒənt/",
    "definition": "A water-soluble cleansing substance that combines with impurities and dirt to make them more soluble.",
    "definitionVn": "nước giặt, bột giặt, chất tẩy rửa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Pour liquid laundry detergent into the washing machine dispenser.",
      "Eco-friendly detergents protect sensitive skin."
    ],
    "exampleTranslations": [
      "Rót nước giặt vào khay chứa của máy giặt nhé.",
      "Nước giặt thân thiện với môi trường bảo vệ làn da nhạy cảm."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_15",
    "word": "towel",
    "phonetic": "/ˈtaʊəl/",
    "definition": "A piece of thick absorbent cloth or paper used for drying oneself or wiping things.",
    "definitionVn": "chiếc khăn tắm, khăn lau",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Dry your hands with a clean cotton towel.",
      "Hang the damp bath towel on the rack to dry."
    ],
    "exampleTranslations": [
      "Lau khô tay bằng một chiếc khăn cotton sạch nhé.",
      "Treo chiếc khăn tắm ẩm lên giá để khô nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_16",
    "word": "laundry",
    "phonetic": "/ˈlɔːndri/",
    "definition": "Clothes and linen that need to be washed or that have been newly washed.",
    "definitionVn": "quần áo cần giặt, việc giặt giũ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Put dirty clothes in the laundry basket.",
      "We do our family laundry on Saturday mornings."
    ],
    "exampleTranslations": [
      "Để quần áo bẩn vào trong giỏ giặt nhé.",
      "Chúng tôi giặt quần áo cho cả nhà vào sáng thứ Bảy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_17",
    "word": "iron",
    "phonetic": "/ˈaɪərn/",
    "definition": "Smooth clothes with a heated flat-bottomed iron.",
    "definitionVn": "ủi đồ, là quần áo",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Iron your white shirt before going to school or work.",
      "Be careful with the hot steam iron."
    ],
    "exampleTranslations": [
      "Ủi phẳng chiếc áo sơ mi trắng trước khi đi học hoặc đi làm nhé.",
      "Hãy cẩn thận với chiếc bàn là hơi nước nóng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_18",
    "word": "fold",
    "phonetic": "/foʊld/",
    "definition": "Bend something over on itself so that one part of it covers another.",
    "definitionVn": "gấp, xếp (quần áo, chăn màn)",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Fold the clean clothes neatly and put them in the wardrobe.",
      "Fold your blanket every morning after waking up."
    ],
    "exampleTranslations": [
      "Gấp quần áo sạch thật gọn gàng và cất vào tủ nhé.",
      "Gấp chăn mỗi sáng sau khi thức dậy nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_19",
    "word": "wipe",
    "phonetic": "/waɪp/",
    "definition": "Clean or dry something by rubbing its surface with a cloth, paper, or one's hand.",
    "definitionVn": "lau chùi, chùi sạch",
    "pos": "verb",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Wipe the dining table clean after every meal.",
      "Wipe away the spilled water immediately."
    ],
    "exampleTranslations": [
      "Lau sạch bàn ăn sau mỗi bữa ăn nhé.",
      "Hãy lau sạch chỗ nước bị đổ ra ngay lập tức nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_cleani_20",
    "word": "chore",
    "phonetic": "/tʃɔːr/",
    "definition": "A routine task, especially a household one.",
    "definitionVn": "việc nhà, công việc vặt hàng ngày",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_cleaning_chores",
    "themeNameVn": "Dọn dẹp & Việc nhà",
    "themeNameEn": "Cleaning & House Chores",
    "examples": [
      "Sharing household chores makes family life harmonious.",
      "Washing dishes and taking out the trash are daily chores."
    ],
    "exampleTranslations": [
      "Chia sẻ công việc nhà giúp cuộc sống gia đình thêm hòa thuận.",
      "Rửa bát và đổ rác là những việc nhà hàng ngày."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_DON_DEP_VIEC_NHA: VocabularyTopicPackage = {
  theme: THEME_DON_DEP_VIEC_NHA,
  vocabs: VOCABS_DON_DEP_VIEC_NHA,
};

export default CHUDE_DON_DEP_VIEC_NHA;
