import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề 16: Nghề nghiệp & Việc làm (Jobs & Occupations)
 * Mã chủ đề: t_basic_jobs_occupations
 * Tổng số từ vựng: 25 từ
 */
export const THEME_NGHE_NGHIEP_VIEC_LAM: BasicTheme = {
  "id": "t_basic_jobs_occupations",
  "name": "Nghề nghiệp & Việc làm",
  "nameEn": "Jobs & Occupations",
  "icon": "💼",
  "difficulty": 1,
  "color": "#d97706",
  "description": "Bác sĩ, giáo viên, cảnh sát, đầu bếp và các ngành nghề phổ biến.",
  "totalVocabs": 25
};

export const VOCABS_NGHE_NGHIEP_VIEC_LAM: BasicVocabularyItem[] = [
  {
    "id": "bv_jobs_o_01",
    "word": "doctor",
    "phonetic": "/ˈdɑːktər/",
    "definition": "A qualified practitioner of medicine; a physician.",
    "definitionVn": "bác sĩ (chữa bệnh)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The doctor examined the sick child gently.",
      "I want to become a doctor to help people."
    ],
    "exampleTranslations": [
      "Bác sĩ khám cho em bé ốm rất nhẹ nhàng.",
      "Tôi muốn trở thành bác sĩ để cứu giúp mọi người."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_02",
    "word": "nurse",
    "phonetic": "/nɜːrs/",
    "definition": "A person trained to care for the sick or infirm, especially in a hospital.",
    "definitionVn": "y tá, điều dưỡng",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The nurse took my temperature and blood pressure.",
      "Nurses are very caring and hardworking."
    ],
    "exampleTranslations": [
      "Y tá đã đo nhiệt độ và huyết áp cho tôi.",
      "Các y tá rất chu đáo và chăm chỉ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_03",
    "word": "police",
    "phonetic": "/pəˈliːs/",
    "definition": "The civil force of a state responsible for prevention and detection of crime.",
    "definitionVn": "cảnh sát, công an",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The police officer directed traffic at the busy junction.",
      "Call the police in case of emergency."
    ],
    "exampleTranslations": [
      "Viên cảnh sát điều tiết giao thông tại ngã tư đông đúc.",
      "Hãy gọi cảnh sát trong trường hợp khẩn cấp."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_04",
    "word": "firefighter",
    "phonetic": "/ˈfaɪərfaɪtər/",
    "definition": "A person whose job is to extinguish fires.",
    "definitionVn": "lính cứu hỏa",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "Brave firefighters put out the blaze quickly.",
      "Firefighters save lives every day."
    ],
    "exampleTranslations": [
      "Những người lính cứu hỏa dũng cảm đã dập tắt đám cháy nhanh chóng.",
      "Lính cứu hỏa cứu sinh mạng con người mỗi ngày."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_05",
    "word": "engineer",
    "phonetic": "/ˌendʒɪˈnɪr/",
    "definition": "A person who designs, builds, or maintains engines, machines, or public works.",
    "definitionVn": "kỹ sư (xây dựng, phần mềm, cơ khí)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "He works as a software engineer in Da Nang.",
      "Engineers build bridges and smart technology."
    ],
    "exampleTranslations": [
      "Anh ấy làm kỹ sư phần mềm tại Đà Nẵng.",
      "Các kỹ sư xây dựng cầu đường và công nghệ thông minh."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_06",
    "word": "architect",
    "phonetic": "/ˈɑːrkɪtekt/",
    "definition": "A person who designs buildings and in many cases also supervises their construction.",
    "definitionVn": "kiến trúc sư",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The architect designed an eco-friendly modern house.",
      "She is a creative and talented architect."
    ],
    "exampleTranslations": [
      "Kiến trúc sư đã thiết kế một ngôi nhà hiện đại thân thiện với môi trường.",
      "Cô ấy là một kiến trúc sư tài năng và sáng tạo."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_07",
    "word": "chef",
    "phonetic": "/ʃef/",
    "definition": "A professional cook, typically the chief cook in a restaurant or hotel.",
    "definitionVn": "bếp trưởng, đầu bếp chuyên nghiệp",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The chef prepared an exquisite five-course dinner.",
      "He trained in France to become a master chef."
    ],
    "exampleTranslations": [
      "Bếp trưởng đã chuẩn bị một bữa tối năm món tinh tế.",
      "Anh ấy đã tu nghiệp tại Pháp để trở thành đầu bếp bậc thầy."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_08",
    "word": "driver",
    "phonetic": "/ˈdraɪvər/",
    "definition": "A person who drives a vehicle.",
    "definitionVn": "tài xế, người lái xe",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The taxi driver knew all the shortcuts in the city.",
      "Always thank your bus driver."
    ],
    "exampleTranslations": [
      "Người tài xế taxi biết mọi con đường tắt trong thành phố.",
      "Hãy luôn nói lời cảm ơn bác tài xế xe buýt nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_09",
    "word": "pilot",
    "phonetic": "/ˈpaɪlət/",
    "definition": "A person who operates the flying controls of an aircraft.",
    "definitionVn": "phi công (lái máy bay)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The airline pilot safely landed the airplane during the storm.",
      "His childhood dream was to be a pilot."
    ],
    "exampleTranslations": [
      "Phi công đã hạ cánh máy bay an toàn trong cơn giông bão.",
      "Ước mơ thời thơ ấu của anh ấy là làm phi công."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_10",
    "word": "singer",
    "phonetic": "/ˈsɪŋər/",
    "definition": "A person who sings, especially professionally.",
    "definitionVn": "ca sĩ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The famous singer performed in front of thousands of fans.",
      "She has the sweet voice of a singer."
    ],
    "exampleTranslations": [
      "Người ca sĩ nổi tiếng biểu diễn trước hàng ngàn người hâm mộ.",
      "Cô ấy có giọng hát ngọt ngào của một ca sĩ."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_11",
    "word": "dancer",
    "phonetic": "/ˈdænsər/",
    "definition": "A person who dances or whose profession is dancing.",
    "definitionVn": "vũ công, người khiêu vũ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "Ballet dancers practice with great discipline.",
      "The dancers moved gracefully to the music."
    ],
    "exampleTranslations": [
      "Các vũ công múa ba lê luyện tập với tính kỷ luật cao.",
      "Những vũ công uyển chuyển chuyển động theo điệu nhạc."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_12",
    "word": "artist",
    "phonetic": "/ˈɑːrtɪst/",
    "definition": "A person who produces paintings or drawings as a profession or hobby.",
    "definitionVn": "họa sĩ, nghệ sĩ",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The artist painted a breathtaking landscape of Ha Long Bay.",
      "Artists express emotions through their work."
    ],
    "exampleTranslations": [
      "Người họa sĩ đã vẽ phong cảnh Vịnh Hạ Long đẹp nghẹt thở.",
      "Các nghệ sĩ thể hiện cảm xúc qua tác phẩm của mình."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_13",
    "word": "farmer",
    "phonetic": "/ˈfɑːrmər/",
    "definition": "A person who owns or manages a farm.",
    "definitionVn": "nông dân, người làm nông",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "Hardworking farmers grow rice and vegetables for the country.",
      "The farmer starts working at dawn."
    ],
    "exampleTranslations": [
      "Những người nông dân chăm chỉ trồng lúa và rau củ cho cả nước.",
      "Người nông dân bắt đầu làm việc từ lúc rạng đông."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_14",
    "word": "worker",
    "phonetic": "/ˈwɜːrkər/",
    "definition": "A person who does a specified type of work or who works for wages.",
    "definitionVn": "công nhân, người lao động",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "Factory workers produce high-quality garments.",
      "Every worker deserves fair pay and safe conditions."
    ],
    "exampleTranslations": [
      "Các công nhân nhà máy sản xuất ra những bộ trang phục chất lượng cao.",
      "Mọi người lao động đều xứng đáng nhận lương công bằng và điều kiện an toàn."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_15",
    "word": "lawyer",
    "phonetic": "/ˈlɔːjər/",
    "definition": "A person who practices or studies law.",
    "definitionVn": "luật sư",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The defense lawyer presented strong evidence in court.",
      "Consult a lawyer before signing the contract."
    ],
    "exampleTranslations": [
      "Luật sư bào chữa đã đưa ra bằng chứng thuyết phục trước tòa.",
      "Hãy tham khảo ý kiến luật sư trước khi ký hợp đồng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_16",
    "word": "accountant",
    "phonetic": "/əˈkaʊntənt/",
    "definition": "A person whose job is to keep or inspect financial accounts.",
    "definitionVn": "kế toán viên",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The accountant calculated the company's annual budget.",
      "She is a detail-oriented certified accountant."
    ],
    "exampleTranslations": [
      "Kế toán viên đã tính toán ngân sách hàng năm của công ty.",
      "Cô ấy là một kế toán viên có chứng chỉ và rất cẩn thận."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_17",
    "word": "cashier",
    "phonetic": "/kæˈʃɪr/",
    "definition": "A person handling payments and receipts in a store, bank, or other business.",
    "definitionVn": "thu ngân (người tính tiền)",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The cashier scanned the groceries and gave me the receipt.",
      "Pay the cashier at counter number 3."
    ],
    "exampleTranslations": [
      "Người thu ngân quét mã hàng hóa và đưa biên lai cho tôi.",
      "Vui lòng thanh toán cho thu ngân ở quầy số 3."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_18",
    "word": "waiter",
    "phonetic": "/ˈweɪtər/",
    "definition": "A man whose job is to serve customers at their tables in a restaurant.",
    "definitionVn": "nam phục vụ bàn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The polite waiter brought our menu and water.",
      "We gave the friendly waiter a generous tip."
    ],
    "exampleTranslations": [
      "Người phục vụ lịch sự mang thực đơn và nước đến cho chúng tôi.",
      "Chúng tôi đã gửi tiền tip cho người phục vụ thân thiện."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_19",
    "word": "waitress",
    "phonetic": "/ˈweɪtrəs/",
    "definition": "A woman whose job is to serve customers at their tables in a restaurant.",
    "definitionVn": "nữ phục vụ bàn",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The waitress recommended the chef's special dish.",
      "She works as a waitress while studying at university."
    ],
    "exampleTranslations": [
      "Cô phục vụ bàn gợi ý món ăn đặc biệt của đầu bếp.",
      "Cô ấy làm phục vụ bàn trong lúc học đại học."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_o_20",
    "word": "mechanic",
    "phonetic": "/məˈkænɪk/",
    "definition": "A person who repairs and maintains machinery and vehicle engines.",
    "definitionVn": "thợ sửa máy, thợ sửa xe",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The mechanic fixed the motorbike engine in twenty minutes.",
      "Take your car to a certified mechanic."
    ],
    "exampleTranslations": [
      "Người thợ sửa xe đã sửa xong động cơ xe máy trong 20 phút.",
      "Hãy mang xe của bạn đến cho thợ máy có tay nghề nhé."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_21",
    "word": "dentist",
    "phonetic": "/ˈdentɪst/",
    "definition": "A person qualified to treat the diseases and conditions that affect the teeth and gums.",
    "definitionVn": "nha sĩ, bác sĩ răng hàm mặt",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "Visit your dentist twice a year for a checkup.",
      "The kind dentist checked the child's teeth gently."
    ],
    "exampleTranslations": [
      "Hãy đến gặp nha sĩ hai lần mỗi năm để kiểm tra răng miệng.",
      "Vị nha sĩ tốt bụng đã khám răng cho em bé rất nhẹ nhàng."
    ],
    "synonyms": [],
    "antonyms": []
  },
  {
    "id": "bv_jobs_22",
    "word": "pharmacist",
    "phonetic": "/ˈfɑːrməsɪst/",
    "definition": "A person professionally qualified to prepare and dispense medicinal drugs.",
    "definitionVn": "dược sĩ, người bán thuốc",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The pharmacist explained how to take the medicine.",
      "Ask the pharmacist if you have any questions."
    ],
    "exampleTranslations": [
      "Dược sĩ đã giải thích cách uống thuốc rất rõ ràng.",
      "Hãy hỏi dược sĩ nếu bạn có bất kỳ thắc mắc nào nhé."
    ],
    "synonyms": [
      "chemist",
      "druggist",
      "apothecary"
    ],
    "antonyms": []
  },
  {
    "id": "bv_jobs_23",
    "word": "electrician",
    "phonetic": "/ɪˌlekˈtrɪʃən/",
    "definition": "A tradesperson specializing in electrical wiring of buildings and transmission lines.",
    "definitionVn": "thợ điện, kỹ thuật viên điện",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The skilled electrician fixed the broken ceiling light.",
      "We called an electrician to check the kitchen wires."
    ],
    "exampleTranslations": [
      "Người thợ điện lành nghề đã sửa xong chiếc đèn trần bị hỏng.",
      "Chúng tôi đã gọi thợ điện đến kiểm tra đường dây trong bếp."
    ],
    "synonyms": [
      "electrical technician",
      "wireman"
    ],
    "antonyms": []
  },
  {
    "id": "bv_jobs_24",
    "word": "plumber",
    "phonetic": "/ˈplʌmər/",
    "definition": "A person who installs and repairs pipes and fittings of water supply and sanitation.",
    "definitionVn": "thợ sửa ống nước",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The plumber repaired the leaking water pipe quickly.",
      "Call a plumber if the bathroom sink is blocked."
    ],
    "exampleTranslations": [
      "Thợ sửa ống nước đã sửa đường ống bị rò rỉ rất nhanh.",
      "Hãy gọi thợ sửa ống nước nếu bồn rửa phòng tắm bị tắc."
    ],
    "synonyms": [
      "pipefitter",
      "sanitation technician"
    ],
    "antonyms": []
  },
  {
    "id": "bv_jobs_25",
    "word": "journalist",
    "phonetic": "/ˈdʒɜːrnəlɪst/",
    "definition": "A person who writes for newspapers, magazines, or news websites or prepares news to be broadcast.",
    "definitionVn": "nhà báo, phóng viên tin tức",
    "pos": "noun",
    "difficulty": 1,
    "frequency": 5,
    "themeId": "t_basic_jobs_occupations",
    "themeNameVn": "Nghề nghiệp & Việc làm",
    "themeNameEn": "Jobs & Occupations",
    "examples": [
      "The young journalist wrote an interesting news article.",
      "She works as a television journalist in Hanoi."
    ],
    "exampleTranslations": [
      "Nhà báo trẻ đã viết một bài báo tin tức rất thú vị.",
      "Cô ấy làm phóng viên truyền hình tại Hà Nội."
    ],
    "synonyms": [
      "reporter",
      "correspondent",
      "press member"
    ],
    "antonyms": []
  }
];

export const CHUDE_NGHE_NGHIEP_VIEC_LAM: VocabularyTopicPackage = {
  theme: THEME_NGHE_NGHIEP_VIEC_LAM,
  vocabs: VOCABS_NGHE_NGHIEP_VIEC_LAM,
};

export default CHUDE_NGHE_NGHIEP_VIEC_LAM;
