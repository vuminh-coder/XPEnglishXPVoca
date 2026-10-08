import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 18: Trường học & Dụng cụ (School & Stationery)
 * Mã chủ đề: t_basic_school_stationery
 * Tổng số từ vựng: 25 từ
 */
export const THEME_TRUONG_HOC_DUNG_CU: BasicTheme = {
  "id": "t_basic_school_stationery",
  "name": "Trường học & Dụng cụ",
  "nameEn": "School & Stationery",
  "icon": "📚",
  "difficulty": 1,
  "color": "#4f46e5",
  "description": "Lớp học, bảng đen, thước kẻ, kéo, tập vở và kiểm tra.",
  "totalVocabs": 25
};

export const VOCABS_TRUONG_HOC_DUNG_CU: BasicVocabularyItem[] = [
  {
    "id": "bv_school_01",
    "word": "classroom",
    "phonetic": "/ˈklæsruːm/",
    "definition": "A room in a school where a class of students is taught.",
    "definitionVn": "phòng học, lớp học",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "The classroom is bright and equipped with a smart board.",
      "Keep your classroom clean and tidy."
    ],
    "exampleTranslations": [
      "Phòng học sáng sủa và được trang bị bảng thông minh.",
      "Hãy giữ gìn lớp học sạch đẹp và ngăn nắp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_02",
    "word": "blackboard",
    "phonetic": "/ˈblækbɔːrd/",
    "definition": "A large board with a smooth dark surface attached to a wall for writing on with chalk.",
    "definitionVn": "bảng đen (viết phấn)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "The teacher wrote the new grammar rule on the blackboard.",
      "Erase the blackboard at the end of class."
    ],
    "exampleTranslations": [
      "Thầy giáo đã viết quy tắc ngữ pháp mới lên bảng đen.",
      "Hãy lau bảng đen khi kết thúc tiết học nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_03",
    "word": "chalk",
    "phonetic": "/tʃɔːk/",
    "definition": "A soft white limestone formed from the skeletal remains of marine organisms, used for writing.",
    "definitionVn": "viên phấn (viết bảng)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "The teacher picked up a piece of white chalk.",
      "Coloured chalk is fun for drawing diagrams."
    ],
    "exampleTranslations": [
      "Thầy giáo nhặt một viên phấn trắng lên.",
      "Phấn màu rất thú vị để vẽ sơ đồ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_04",
    "word": "eraser",
    "phonetic": "/ɪˈreɪsər/",
    "definition": "A piece of soft rubber or plastic used to rub out something written.",
    "definitionVn": "cục tẩy, cục gôm, đồ lau bảng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Can I borrow your eraser to fix a mistake?",
      "Use an eraser to wipe the pencil marks."
    ],
    "exampleTranslations": [
      "Tôi có thể mượn cục tẩy của bạn để sửa lỗi không?",
      "Dùng cục gôm để xóa các vết bút chì nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_05",
    "word": "ruler",
    "phonetic": "/ˈruːlər/",
    "definition": "A straight strip of plastic, wood, or metal marked in centimeters or inches, used for drawing straight lines.",
    "definitionVn": "cây thước kẻ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Use a 30-centimeter ruler to draw straight lines.",
      "Measure the length with your ruler."
    ],
    "exampleTranslations": [
      "Dùng thước kẻ 30cm để vẽ các đường thẳng nhé.",
      "Đo chiều dài bằng thước kẻ của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_06",
    "word": "scissors",
    "phonetic": "/ˈsɪzərz/",
    "definition": "An instrument used for cutting cloth, paper, and other thin material.",
    "definitionVn": "cây kéo (cắt giấy, thủ công)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Be careful when handling sharp craft scissors.",
      "Cut the colored paper with scissors."
    ],
    "exampleTranslations": [
      "Hãy cẩn thận khi cầm kéo thủ công sắc bén nhé.",
      "Cắt giấy màu bằng kéo đi nào."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_07",
    "word": "glue",
    "phonetic": "/ɡluː/",
    "definition": "An adhesive substance used for sticking objects together.",
    "definitionVn": "keo dán, hồ dán",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Use a glue stick to paste the picture in your notebook.",
      "Let the paper glue dry completely."
    ],
    "exampleTranslations": [
      "Dùng hồ dán thỏi để dán bức tranh vào vở nhé.",
      "Để keo dán giấy khô hoàn toàn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_08",
    "word": "notebook",
    "phonetic": "/ˈnoʊtbʊk/",
    "definition": "A book with blank or ruled pages for writing notes on.",
    "definitionVn": "cuốn sổ tay, vở ghi bài",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Write every new vocabulary word in your English notebook.",
      "She bought a colorful notebook for school."
    ],
    "exampleTranslations": [
      "Ghi chép mọi từ vựng mới vào cuốn vở tiếng Anh nhé.",
      "Cô ấy đã mua một cuốn sổ tay rực rỡ để đi học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_09",
    "word": "textbook",
    "phonetic": "/ˈtekstbʊk/",
    "definition": "A book used as a standard work for the study of a particular subject.",
    "definitionVn": "sách giáo khoa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Open your English textbook to unit 3, please.",
      "The textbook contains clear diagrams and explanations."
    ],
    "exampleTranslations": [
      "Mời các em mở sách giáo khoa tiếng Anh bài 3.",
      "Sách giáo khoa có sơ đồ và giải thích rất rõ ràng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_10",
    "word": "dictionary",
    "phonetic": "/ˈdɪkʃəneri/",
    "definition": "A book or electronic resource that lists words and gives their meaning.",
    "definitionVn": "cuốn từ điển",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Look up unknown words in an English-Vietnamese dictionary.",
      "An Oxford dictionary is a trusted study tool."
    ],
    "exampleTranslations": [
      "Tra cứu các từ chưa biết trong từ điển Anh - Việt nhé.",
      "Từ điển Oxford là công cụ học tập đáng tin cậy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_11",
    "word": "pencil case",
    "phonetic": "/ˈpensl keɪs/",
    "definition": "A small container for pens, pencils, and other stationery items.",
    "definitionVn": "hộp bút, bóp viết",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Keep your pens and rulers neatly inside your pencil case.",
      "She has a cute zippered pencil case."
    ],
    "exampleTranslations": [
      "Giữ bút và thước kẻ ngăn nắp trong hộp bút nhé.",
      "Cô ấy có một chiếc bóp viết kéo khóa rất dễ thương."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_12",
    "word": "calculator",
    "phonetic": "/ˈkælkjuleɪtər/",
    "definition": "Something used for making mathematical calculations.",
    "definitionVn": "máy tính bỏ túi, máy tính cầm tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Scientific calculators are allowed in mathematics exams.",
      "Use the calculator to verify the sum."
    ],
    "exampleTranslations": [
      "Máy tính khoa học được phép mang vào phòng thi toán.",
      "Dùng máy tính để kiểm tra lại phép cộng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_13",
    "word": "homework",
    "phonetic": "/ˈhoʊmwɜːrk/",
    "definition": "Schoolwork that a student is required to do at home.",
    "definitionVn": "bài tập về nhà",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Finish your English homework before dinner.",
      "Doing homework helps reinforce what you learned."
    ],
    "exampleTranslations": [
      "Hãy hoàn thành bài tập về nhà tiếng Anh trước bữa tối nhé.",
      "Làm bài tập giúp củng cố những gì bạn đã học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_14",
    "word": "exam",
    "phonetic": "/ɪɡˈzæm/",
    "definition": "A formal test of a person's knowledge or proficiency in a subject.",
    "definitionVn": "kỳ thi, bài thi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "She studied diligently and passed the English exam with flying colors.",
      "The midterm exam is next Tuesday."
    ],
    "exampleTranslations": [
      "Cô ấy đã học tập chăm chỉ và vượt qua kỳ thi tiếng Anh với điểm số xuất sắc.",
      "Kỳ thi giữa kỳ vào thứ Ba tuần sau."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_15",
    "word": "lesson",
    "phonetic": "/ˈlesn/",
    "definition": "A period of learning or teaching.",
    "definitionVn": "bài học, tiết học",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Today's English lesson is about daily routines.",
      "Listen attentively throughout the 45-minute lesson."
    ],
    "exampleTranslations": [
      "Bài học tiếng Anh hôm nay nói về thói quen hàng ngày.",
      "Hãy chăm chú lắng nghe trong suốt tiết học 45 phút."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_16",
    "word": "grade",
    "phonetic": "/ɡreɪd/",
    "definition": "A mark indicating the quality of a student's work; a year of school.",
    "definitionVn": "điểm số, khối lớp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "He received an 'A' grade on his English presentation.",
      "My younger sister is in grade 5."
    ],
    "exampleTranslations": [
      "Cậu ấy đạt điểm A trong bài thuyết trình tiếng Anh.",
      "Em gái tôi đang học lớp 5."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_17",
    "word": "recess",
    "phonetic": "/ˈriːses/",
    "definition": "A break between school classes.",
    "definitionVn": "giờ ra chơi, giờ giải lao ở trường",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Students play games and eat snacks during recess.",
      "The bell rang signaling recess time."
    ],
    "exampleTranslations": [
      "Học sinh chơi trò chơi và ăn nhẹ trong giờ ra chơi.",
      "Chuông reo báo hiệu giờ giải lao."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_18",
    "word": "subject",
    "phonetic": "/ˈsʌbdʒɪkt/",
    "definition": "A branch of knowledge studied or taught in a system, such as school.",
    "definitionVn": "môn học (ở trường)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "English and Science are my favorite school subjects.",
      "How many subjects are you studying this semester?"
    ],
    "exampleTranslations": [
      "Tiếng Anh và Khoa học là những môn học yêu thích nhất của tôi.",
      "Học kỳ này bạn đang học bao nhiêu môn?"
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_19",
    "word": "sharpener",
    "phonetic": "/ˈʃɑːrpnər/",
    "definition": "A device for sharpening pencils.",
    "definitionVn": "cái gọt bút chì, chuốt bút chì",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Sharpen your blunt pencil with a pencil sharpener.",
      "I keep a small sharpener in my pencil case."
    ],
    "exampleTranslations": [
      "Gọt chiếc bút chì cùn bằng cái gọt bút chì nhé.",
      "Tôi để một cái chuốt bút chì nhỏ trong hộp bút."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_20",
    "word": "marker",
    "phonetic": "/ˈmɑːrkər/",
    "definition": "A felt-tipped pen with a broad tip.",
    "definitionVn": "bút dạ quang, bút lông viết bảng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Highlight key vocabulary terms with a yellow marker.",
      "The teacher wrote with a blue whiteboard marker."
    ],
    "exampleTranslations": [
      "Tô sáng các thuật ngữ từ vựng quan trọng bằng bút dạ quang vàng.",
      "Thầy giáo đã viết bằng bút lông bảng màu xanh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_school_21",
    "word": "highlighter",
    "phonetic": "/ˈhaɪˌlaɪ.t̬ɚ/",
    "definition": "A brightly colored fluorescent felt-tip pen used to emphasize text.",
    "definitionVn": "bút dạ quang đánh dấu dòng văn bản",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ học tập",
    "themeNameEn": "School & Stationery",
    "examples": [
      "She marked key historical dates with a fluorescent yellow highlighter.",
      "Always keep a highlighter and sticky notes handy while reading academic textbooks."
    ],
    "exampleTranslations": [
      "Cô ấy đã đánh dấu các mốc lịch sử quan trọng bằng bút dạ quang màu vàng huỳnh quang.",
      "Luôn giữ bút dạ quang và giấy ghi chú bên mình khi đọc sách giáo khoa học thuật."
    ],
    "synonyms": [
      "fluorescent marker",
      "text marker"
    ],
    "antonyms": []
  },
  {
    "id": "bv_school_22",
    "word": "stapler",
    "phonetic": "/ˈsteɪ.plɚ/",
    "definition": "A small device that binds sheets of paper together with thin wire staples.",
    "definitionVn": "cái dập ghim giấy cầm tay",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ học tập",
    "themeNameEn": "School & Stationery",
    "examples": [
      "The teacher asked students to use a metal stapler to fasten their essay pages.",
      "He reloaded the desktop stapler with a fresh strip of heavy-duty staples."
    ],
    "exampleTranslations": [
      "Giáo viên yêu cầu học sinh sử dụng dập ghim kim loại để bấm các trang bài luận lại.",
      "Anh ấy đã nạp lại dập ghim để bàn bằng một thanh ghim chịu lực mới."
    ],
    "synonyms": [
      "paper fastener",
      "stapling machine"
    ],
    "antonyms": []
  },
  {
    "id": "bv_school_23",
    "word": "calculator",
    "phonetic": "/ˈkæl.kjə.leɪ.t̬ɚ/",
    "definition": "An electronic device used for performing mathematical calculations.",
    "definitionVn": "máy tính cầm tay bỏ túi làm toán",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ học tập",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Students may bring a scientific calculator into the calculus exam hall.",
      "The solar-powered pocket calculator never runs out of battery during classes."
    ],
    "exampleTranslations": [
      "Học sinh có thể mang máy tính khoa học vào phòng thi giải tích.",
      "Máy tính bỏ túi chạy bằng năng lượng mặt trời không bao giờ hết pin trong giờ học."
    ],
    "synonyms": [
      "adding machine",
      "arithmetic device"
    ],
    "antonyms": []
  },
  {
    "id": "bv_school_24",
    "word": "compass",
    "phonetic": "/ˈkʌm.pəs/",
    "definition": "An instrument with two movable arms used for drawing circles and measuring distances.",
    "definitionVn": "compa vẽ đường tròn trong môn hình học",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ học tập",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Insert the pencil tip securely into the compass arm before drafting the circle.",
      "Geometry students use a steel compass and straightedge ruler to bisect angles."
    ],
    "exampleTranslations": [
      "Cắm đầu bút chì chắc chắn vào nhánh compa trước khi vẽ đường tròn.",
      "Học sinh hình học sử dụng compa thép và thước kẻ thẳng để chia đôi các góc."
    ],
    "synonyms": [
      "pair of compasses",
      "drawing divider"
    ],
    "antonyms": []
  },
  {
    "id": "bv_school_25",
    "word": "protractor",
    "phonetic": "/proʊˈtræk.tɚ/",
    "definition": "A semicircular plastic instrument graduated in degrees for measuring and drawing angles.",
    "definitionVn": "thước đo độ góc hình bán nguyệt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_school_stationery",
    "themeNameVn": "Trường học & Dụng cụ học tập",
    "themeNameEn": "School & Stationery",
    "examples": [
      "Line up the baseline of your clear protractor with the vertex to measure the obtuse angle.",
      "Every student geometry set includes a 180-degree transparent protractor."
    ],
    "exampleTranslations": [
      "Căn chỉnh đường cơ sở của thước đo độ trong suốt với đỉnh góc để đo góc tù.",
      "Mỗi bộ dụng cụ hình học của học sinh đều bao gồm một thước đo độ trong suốt 180 độ."
    ],
    "synonyms": [
      "angle meter",
      "semicircular scale"
    ],
    "antonyms": []
  }
];

export const CHUDE_TRUONG_HOC_DUNG_CU: VocabularyTopicPackage = {
  theme: THEME_TRUONG_HOC_DUNG_CU,
  vocabs: VOCABS_TRUONG_HOC_DUNG_CU,
};

export default CHUDE_TRUONG_HOC_DUNG_CU;
