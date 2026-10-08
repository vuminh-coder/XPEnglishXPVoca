import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 48: Hình học & Họa tiết (Geometry & Patterns)
 * Mã chủ đề: t_basic_geometry_patterns
 * Tổng số từ vựng: 20 từ
 */
export const THEME_HINH_HOC_HOA_TIET: BasicTheme = {
  "id": "t_basic_geometry_patterns",
  "name": "Hình học & Họa tiết",
  "nameEn": "Geometry & Patterns",
  "icon": "🔷",
  "difficulty": 1,
  "color": "#7c3aed",
  "description": "Hình bầu dục, hình thoi, khối cầu, khối trụ, đường thẳng, sọc kẻ và hoa văn.",
  "totalVocabs": 20
};

export const VOCABS_HINH_HOC_HOA_TIET: BasicVocabularyItem[] = [
  {
    "id": "bv_geomet_01",
    "word": "oval",
    "phonetic": "/ˈoʊvl/",
    "definition": "Having a rounded and slightly elongated outline or shape, like that of an egg.",
    "definitionVn": "hình bầu dục, hình ô-van",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A chicken egg has a smooth oval shape.",
      "The dining mirror is enclosed in an elegant oval wooden frame."
    ],
    "exampleTranslations": [
      "Quả trứng gà có hình bầu dục nhẵn nhụi.",
      "Chiếc gương phòng ăn được đóng trong một khung gỗ hình bầu dục trang nhã."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_02",
    "word": "diamond",
    "phonetic": "/ˈdaɪəmənd/",
    "definition": "A figure with four equal sides forming two opposite acute angles and two obtuse angles; rhombus.",
    "definitionVn": "hình thoi, viên kim cương",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A traditional paper kite is shaped like a bright diamond.",
      "The playing cards have red diamond suits."
    ],
    "exampleTranslations": [
      "Chiếc diều giấy truyền thống có hình thoi rực rỡ.",
      "Những lá bài tây có chất hình quả trám đỏ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_03",
    "word": "cube",
    "phonetic": "/kjuːb/",
    "definition": "A symmetrical three-dimensional shape, either solid or hollow, contained by six equal squares.",
    "definitionVn": "hình lập phương, khối vuông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A Rubik's puzzle is a famous multicolored cube.",
      "Drop an ice cube into your glass of fresh juice."
    ],
    "exampleTranslations": [
      "Khối rubik là một khối lập phương nhiều màu nổi tiếng.",
      "Thả một viên đá hình lập phương vào ly nước ép tươi nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_04",
    "word": "sphere",
    "phonetic": "/sfɪr/",
    "definition": "A round solid figure in which every point on the surface is equidistant from the center.",
    "definitionVn": "hình cầu, khối cầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "The Earth is an oblate sphere orbiting the sun.",
      "A basketball is a hollow rubber sphere."
    ],
    "exampleTranslations": [
      "Trái Đất là một khối cầu dẹt quay quanh mặt trời.",
      "Quả bóng rổ là một khối cầu cao su rỗng ruột."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_05",
    "word": "cylinder",
    "phonetic": "/ˈsɪlɪndər/",
    "definition": "A solid geometrical figure with straight parallel sides and a circular or oval cross section.",
    "definitionVn": "hình trụ, khối trụ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A soda can and a water bottle have cylindrical shapes.",
      "The ancient temple was supported by tall stone cylinders."
    ],
    "exampleTranslations": [
      "Lon nước ngọt và chai nước có hình dạng khối trụ.",
      "Ngôi đền cổ được nâng đỡ bởi những cột trụ đá cao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_06",
    "word": "line",
    "phonetic": "/laɪn/",
    "definition": "A long, narrow mark or band on a surface.",
    "definitionVn": "đường thẳng, nét kẻ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Draw a straight line across the page with your ruler.",
      "Stand in an orderly line to board the bus."
    ],
    "exampleTranslations": [
      "Vẽ một đường thẳng qua trang giấy bằng thước kẻ nhé.",
      "Hãy xếp thành một hàng ngay ngắn để lên xe buýt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_07",
    "word": "point",
    "phonetic": "/pɔɪnt/",
    "definition": "A small, round mark on a surface; a dot.",
    "definitionVn": "điểm, dấu chấm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Every sentence begins with a capital letter and ends with a point.",
      "Mark the location with a red point on the map."
    ],
    "exampleTranslations": [
      "Mỗi câu bắt đầu bằng một chữ cái viết hoa và kết thúc bằng một dấu chấm.",
      "Đánh dấu vị trí bằng một chấm đỏ trên bản đồ nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_08",
    "word": "curve",
    "phonetic": "/kɜːrv/",
    "definition": "A line or outline which gradually deviates from being straight for some or all of its length.",
    "definitionVn": "đường cong, khúc cua",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Drive slowly when navigating the sharp mountain road curve.",
      "A rainbow forms a magnificent multicolored curve in the sky."
    ],
    "exampleTranslations": [
      "Hãy lái xe chậm khi đi qua khúc cua đường đèo dốc nhé.",
      "Cầu vồng tạo thành một đường cong nhiều màu sắc tuyệt đẹp trên bầu trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_09",
    "word": "straight",
    "phonetic": "/streɪt/",
    "definition": "Extending or moving continuously in one direction only; without a curve or bend.",
    "definitionVn": "thẳng tắp, ngay thẳng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Sit with a straight back to protect your spinal posture.",
      "Walk straight ahead for two blocks to reach the park."
    ],
    "exampleTranslations": [
      "Hãy ngồi thẳng lưng để bảo vệ tư thế cột sống nhé.",
      "Hãy đi thẳng về phía trước hai dãy nhà là đến công viên."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_10",
    "word": "stripe",
    "phonetic": "/straɪp/",
    "definition": "A long narrow band or strip, typically of the same width throughout its length.",
    "definitionVn": "sọc kẻ, đường kẻ sọc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Zebras have distinctive black and white stripes.",
      "He wore a fashionable navy shirt with white vertical stripes."
    ],
    "exampleTranslations": [
      "Ngựa vằn có những đường kẻ sọc đen trắng rất đặc trưng.",
      "Anh ấy mặc một chiếc áo sơ mi màu xanh navy kẻ sọc trắng rất thời trang."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_11",
    "word": "dot",
    "phonetic": "/dɑːt/",
    "definition": "A small round mark or spot.",
    "definitionVn": "chấm tròn, đốm",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A ladybug has charming black dots on its bright red wings.",
      "Connect the numbered dots to reveal the hidden picture."
    ],
    "exampleTranslations": [
      "Chú bọ rùa có những đốm đen duyên dáng trên đôi cánh đỏ rực.",
      "Nối các chấm có đánh số để mở ra bức tranh ẩn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_12",
    "word": "pattern",
    "phonetic": "/ˈpætərn/",
    "definition": "A repeated decorative design on fabric, paper, or other materials.",
    "definitionVn": "hoa văn, họa tiết lặp lại",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "The traditional brocade fabric has intricate geometric patterns.",
      "Look for patterns in English grammar rules to learn faster."
    ],
    "exampleTranslations": [
      "Vải thổ cẩm truyền thống có những hoa văn hình học tinh xảo.",
      "Hãy tìm những quy luật lặp lại trong ngữ pháp tiếng Anh để học nhanh hơn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_13",
    "word": "flat",
    "phonetic": "/flæt/",
    "definition": "Having a level surface; without raised areas or indentations.",
    "definitionVn": "phẳng, bằng phẳng",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Place the computer monitor on a stable flat desk.",
      "The plains of the delta are flat and fertile."
    ],
    "exampleTranslations": [
      "Đặt màn hình máy tính lên chiếc bàn phẳng chắc chắn nhé.",
      "Đồng bằng châu thổ rất bằng phẳng và màu mỡ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_14",
    "word": "narrow",
    "phonetic": "/ˈnæroʊ/",
    "definition": "Of small width in relation to length; not wide.",
    "definitionVn": "chật hẹp, nhỏ hẹp",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Hanoi Old Quarter is famous for its charming narrow alleys.",
      "The footpath across the stream is narrow but safe."
    ],
    "exampleTranslations": [
      "Phố Cổ Hà Nội nổi tiếng với những con ngõ nhỏ hẹp duyên dáng.",
      "Lối mòn đi bộ qua suối nhỏ hẹp nhưng an toàn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_15",
    "word": "wide",
    "phonetic": "/waɪd/",
    "definition": "Of great or more than average width; broad.",
    "definitionVn": "rộng lớn, thênh thang",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "The city avenue is wide with three lanes of traffic.",
      "Open your mouth wide for the dentist to examine."
    ],
    "exampleTranslations": [
      "Đại lộ thành phố rộng lớn với ba làn xe chạy.",
      "Hãy mở rộng miệng để nha sĩ kiểm tra nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_16",
    "word": "thick",
    "phonetic": "/θɪk/",
    "definition": "With opposite sides relatively far apart; having significant depth.",
    "definitionVn": "dày cộm, đậm",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A thick winter coat shields against cold winds.",
      "Spread a thick layer of peanut butter on bread."
    ],
    "exampleTranslations": [
      "Chiếc áo khoác mùa đông dày cộm chắn gió lạnh.",
      "Phết một lớp bơ đậu phộng dày lên bánh mì nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_17",
    "word": "thin",
    "phonetic": "/θɪn/",
    "definition": "Having opposite surfaces close together; slender.",
    "definitionVn": "mỏng mảnh, thon gọn",
    "pos": "adj",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "The modern smartphone is ultra-thin and lightweight.",
      "Slice the cucumber into thin crunchy rounds."
    ],
    "exampleTranslations": [
      "Chiếc điện thoại thông minh hiện đại siêu mỏng và nhẹ.",
      "Thái dưa chuột thành những lát tròn mỏng giòn rụm nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_18",
    "word": "shape",
    "phonetic": "/ʃeɪp/",
    "definition": "The external form, contours, or outline of someone or something.",
    "definitionVn": "hình dạng, dáng dấp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "Children learn different geometric shapes in math class.",
      "Clouds take on imaginative shapes in the sky."
    ],
    "exampleTranslations": [
      "Trẻ em học các hình dạng hình học khác nhau trong giờ toán.",
      "Những đám mây tạo thành những hình thù giàu trí tưởng tượng trên bầu trời."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_19",
    "word": "circle",
    "phonetic": "/ˈsɜːrkl/",
    "definition": "A round plane figure whose boundary consists of points equidistant from a fixed center.",
    "definitionVn": "hình tròn (hoàn hảo)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "The students sat in a friendly circle to play word games.",
      "The full moon is a glowing golden circle."
    ],
    "exampleTranslations": [
      "Các bạn học sinh ngồi thành một vòng tròn thân thiện để chơi trò đố chữ.",
      "Mặt trăng tròn vành vạnh là một khối tròn vàng rực rỡ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_geomet_20",
    "word": "square",
    "phonetic": "/skwer/",
    "definition": "A plane figure with four equal straight sides and four right angles.",
    "definitionVn": "hình vuông (bốn cạnh đều)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_geometry_patterns",
    "themeNameVn": "Hình học & Họa tiết",
    "themeNameEn": "Geometry & Patterns",
    "examples": [
      "A standard chessboard has sixty-four black and white squares.",
      "Cut the paper into neat little squares for flashcards."
    ],
    "exampleTranslations": [
      "Bàn cờ vua tiêu chuẩn có sáu mươi tư ô vuông đen trắng.",
      "Cắt giấy thành những ô vuông nhỏ ngay ngắn để làm flashcard nhé."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_HINH_HOC_HOA_TIET: VocabularyTopicPackage = {
  theme: THEME_HINH_HOC_HOA_TIET,
  vocabs: VOCABS_HINH_HOC_HOA_TIET,
};

export default CHUDE_HINH_HOC_HOA_TIET;
