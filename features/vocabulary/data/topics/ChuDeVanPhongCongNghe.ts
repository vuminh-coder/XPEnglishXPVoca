import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 24: Văn phòng & Công nghệ (Office & Basic Tech)
 * Mã chủ đề: t_basic_office_tech
 * Tổng số từ vựng: 20 từ
 */
export const THEME_VAN_PHONG_CONG_NGHE: BasicTheme = {
  "id": "t_basic_office_tech",
  "name": "Văn phòng & Công nghệ",
  "nameEn": "Office & Basic Tech",
  "icon": "💻",
  "difficulty": 1,
  "color": "#0891b2",
  "description": "Máy tính, bàn phím, chuột, màn hình, email, wifi và mật khẩu.",
  "totalVocabs": 20
};

export const VOCABS_VAN_PHONG_CONG_NGHE: BasicVocabularyItem[] = [
  {
    "id": "bv_office_01",
    "word": "office",
    "phonetic": "/ˈɔːfɪs/",
    "definition": "A room, set of rooms, or building used as a place for commercial, professional, or bureaucratic work.",
    "definitionVn": "văn phòng làm việc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Our modern office is located in the central business district.",
      "She arrives at the office at 8:30 AM."
    ],
    "exampleTranslations": [
      "Văn phòng hiện đại của chúng tôi nằm ở trung tâm kinh doanh.",
      "Cô ấy đến văn phòng lúc 8h30 sáng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_02",
    "word": "computer",
    "phonetic": "/kəmˈpjuːtər/",
    "definition": "An electronic device for storing and processing data.",
    "definitionVn": "máy vi tính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Computers have transformed how we work and learn.",
      "Shut down your computer before leaving the office."
    ],
    "exampleTranslations": [
      "Máy vi tính đã biến đổi cách chúng ta làm việc và học tập.",
      "Tắt máy tính trước khi rời văn phòng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_03",
    "word": "laptop",
    "phonetic": "/ˈlæptɑːp/",
    "definition": "A computer that is portable and suitable for use while traveling.",
    "definitionVn": "máy tính xách tay, laptop",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "I carry my lightweight laptop in my backpack.",
      "She opened her laptop to write an English essay."
    ],
    "exampleTranslations": [
      "Tôi mang theo chiếc laptop siêu nhẹ trong ba lô.",
      "Cô ấy mở laptop ra để viết bài luận tiếng Anh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_04",
    "word": "screen",
    "phonetic": "/skriːn/",
    "definition": "A flat panel or area on an electronic device on which images and data are displayed.",
    "definitionVn": "màn hình hiển thị",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Adjust the screen brightness to protect your eyes.",
      "The high-resolution screen displays crisp text."
    ],
    "exampleTranslations": [
      "Điều chỉnh độ sáng màn hình để bảo vệ mắt nhé.",
      "Màn hình độ phân giải cao hiển thị chữ rất sắc nét."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_05",
    "word": "keyboard",
    "phonetic": "/ˈkiːbɔːrd/",
    "definition": "A panel of keys that operate a computer or typewriter.",
    "definitionVn": "bàn phím máy tính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Learn touch typing to type faster on your keyboard.",
      "She typed her English homework smoothly on the keyboard."
    ],
    "exampleTranslations": [
      "Học gõ 10 ngón để gõ nhanh hơn trên bàn phím nhé.",
      "Cô ấy gõ bài tập tiếng Anh thoăn thoắt trên bàn phím."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_06",
    "word": "mouse",
    "phonetic": "/maʊs/",
    "definition": "A small handheld device that is dragged across a flat surface to move the cursor on a computer screen.",
    "definitionVn": "con chuột máy tính",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Click the left mouse button to open the application.",
      "A wireless ergonomic mouse is comfortable to use."
    ],
    "exampleTranslations": [
      "Nhấp chuột trái để mở ứng dụng nhé.",
      "Con chuột công thái học không dây dùng rất thoải mái."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_07",
    "word": "printer",
    "phonetic": "/ˈprɪntər/",
    "definition": "A machine for printing text or pictures onto paper, especially one linked to a computer.",
    "definitionVn": "máy in (tài liệu)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Print two copies of the contract on the color printer.",
      "The office printer ran out of white paper."
    ],
    "exampleTranslations": [
      "In hai bản hợp đồng trên máy in màu nhé.",
      "Máy in văn phòng vừa hết giấy trắng rồi."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_08",
    "word": "paper",
    "phonetic": "/ˈpeɪpər/",
    "definition": "Material manufactured in thin sheets from the pulp of wood, used for writing or printing.",
    "definitionVn": "tờ giấy, giấy in",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Load a ream of A4 paper into the printer tray.",
      "Write down your ideas on a clean sheet of paper."
    ],
    "exampleTranslations": [
      "Nạp một ram giấy A4 vào khay máy in nhé.",
      "Hãy ghi lại những ý tưởng của bạn lên một tờ giấy trắng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_09",
    "word": "file",
    "phonetic": "/faɪl/",
    "definition": "A folder or collection of information stored on a computer under a single name.",
    "definitionVn": "tệp tin, hồ sơ dữ liệu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Save your file regularly so you don't lose progress.",
      "Attach the PDF file to your email message."
    ],
    "exampleTranslations": [
      "Hãy lưu tệp tin thường xuyên để không bị mất dữ liệu nhé.",
      "Đính kèm tệp PDF vào thư email của bạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_10",
    "word": "email",
    "phonetic": "/ˈiːmeɪl/",
    "definition": "Messages distributed by electronic means from one computer user to one or more recipients.",
    "definitionVn": "thư điện tử, email",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Send me an email with the project details.",
      "Check your email inbox every morning."
    ],
    "exampleTranslations": [
      "Gửi email cho tôi kèm thông tin chi tiết dự án nhé.",
      "Kiểm tra hộp thư email mỗi sáng nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_11",
    "word": "internet",
    "phonetic": "/ˈɪntərnet/",
    "definition": "A global computer network providing a variety of information and communication facilities.",
    "definitionVn": "mạng in-tơ-nét, mạng toàn cầu",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "The internet allows us to learn English from anywhere.",
      "We search for information on the internet every day."
    ],
    "exampleTranslations": [
      "Mạng internet cho phép chúng ta học tiếng Anh từ bất cứ đâu.",
      "Chúng ta tìm kiếm thông tin trên internet mỗi ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_12",
    "word": "website",
    "phonetic": "/ˈwebsaɪt/",
    "definition": "A set of related web pages located under a single domain name.",
    "definitionVn": "trang web, trang thông tin điện tử",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Bookmark this English learning website on your browser.",
      "Our company website has an intuitive design."
    ],
    "exampleTranslations": [
      "Đánh dấu trang web học tiếng Anh này trên trình duyệt nhé.",
      "Trang web của công ty chúng tôi có thiết kế rất trực quan."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_13",
    "word": "password",
    "phonetic": "/ˈpæswɜːrd/",
    "definition": "A secret word or phrase that must be used to gain admission to a system.",
    "definitionVn": "mật khẩu, mã bảo vệ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Create a strong password with letters, numbers, and symbols.",
      "Never share your private password with anyone."
    ],
    "exampleTranslations": [
      "Tạo một mật khẩu mạnh kết hợp chữ cái, số và ký tự đặc biệt nhé.",
      "Không bao giờ chia sẻ mật khẩu riêng tư của bạn cho bất kỳ ai."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_14",
    "word": "wifi",
    "phonetic": "/ˈwaɪ faɪ/",
    "definition": "A facility allowing computers, smartphones, or other devices to connect to the internet wirelessly.",
    "definitionVn": "mạng không dây, sóng Wi-Fi",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "What is the Wi-Fi password for this coffee shop?",
      "Connect to the free high-speed Wi-Fi network."
    ],
    "exampleTranslations": [
      "Mật khẩu Wi-Fi của quán cà phê này là gì vậy?",
      "Kết nối với mạng Wi-Fi tốc độ cao miễn phí nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_15",
    "word": "message",
    "phonetic": "/ˈmesɪdʒ/",
    "definition": "A verbal, written, or recorded communication sent to or left for a recipient.",
    "definitionVn": "tin nhắn, thông điệp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "I received a friendly text message from my teacher.",
      "Send a message when you arrive safely."
    ],
    "exampleTranslations": [
      "Tôi đã nhận được một tin nhắn thân thiện từ giáo viên.",
      "Gửi tin nhắn khi bạn đã đến nơi an toàn nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_16",
    "word": "call",
    "phonetic": "/kɔːl/",
    "definition": "An act of telephoning someone.",
    "definitionVn": "cuộc gọi (điện thoại)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "I missed a phone call from my manager.",
      "Give me a video call this evening."
    ],
    "exampleTranslations": [
      "Tôi đã lỡ một cuộc gọi từ người quản lý.",
      "Gọi video cho tôi tối nay nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_17",
    "word": "meeting",
    "phonetic": "/ˈmiːtɪŋ/",
    "definition": "An assembly of people for a particular purpose, especially formal discussion.",
    "definitionVn": "cuộc họp, buổi họp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "We have an online team meeting at 9:00 AM.",
      "The meeting ended with productive results."
    ],
    "exampleTranslations": [
      "Chúng tôi có cuộc họp nhóm trực tuyến lúc 9h sáng.",
      "Cuộc họp đã kết thúc với những kết quả rất hiệu quả."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_18",
    "word": "project",
    "phonetic": "/ˈprɑːdʒekt/",
    "definition": "An enterprise that is carefully planned to achieve a particular aim.",
    "definitionVn": "dự án, đề án",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Our team is working on an innovative AI project.",
      "She submitted her final English project on time."
    ],
    "exampleTranslations": [
      "Nhóm chúng tôi đang thực hiện một dự án AI đổi mới sáng tạo.",
      "Cô ấy đã nộp dự án tiếng Anh cuối khóa đúng hạn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_19",
    "word": "colleague",
    "phonetic": "/ˈkɑːliːɡ/",
    "definition": "A person with whom one works in a profession or business.",
    "definitionVn": "đồng nghiệp (cùng cơ quan)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "My colleagues are supportive and friendly.",
      "Collaborate closely with your teammates and colleagues."
    ],
    "exampleTranslations": [
      "Các đồng nghiệp của tôi rất nhiệt tình giúp đỡ và thân thiện.",
      "Hợp tác chặt chẽ với các bạn trong nhóm và đồng nghiệp nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_office_20",
    "word": "desk",
    "phonetic": "/desk/",
    "definition": "A piece of furniture with a flat surface for working at in an office.",
    "definitionVn": "bàn làm việc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_office_tech",
    "themeNameVn": "Văn phòng & Công nghệ",
    "themeNameEn": "Office & Basic Tech",
    "examples": [
      "Keep your office desk clean, organized, and clutter-free.",
      "She decorated her desk with a small green succulent."
    ],
    "exampleTranslations": [
      "Giữ bàn làm việc văn phòng luôn sạch sẽ, ngăn nắp và gọn gàng nhé.",
      "Cô ấy trang trí bàn làm việc bằng một cây sen đá nhỏ."
    ],
    "synonyms": [],
    "antonyms": []
  }
];

export const CHUDE_VAN_PHONG_CONG_NGHE: VocabularyTopicPackage = {
  theme: THEME_VAN_PHONG_CONG_NGHE,
  vocabs: VOCABS_VAN_PHONG_CONG_NGHE,
};

export default CHUDE_VAN_PHONG_CONG_NGHE;
