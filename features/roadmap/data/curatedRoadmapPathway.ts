import { ZiczacPathStep, ZiczacUnitGroup } from "../types";

/**
 * CURATED MASTER ROADMAP PATHWAY (Mô hình Duolingo The Path chuẩn mực)
 * Giáo trình gồm 28 chặng học tập chia làm 5 Unit lớn với số lượng chặng linh hoạt [5, 7, 6, 6, 4].
 * Tích hợp đủ 7 loại nút Duolingo: Core Skill (Star), Listening (Headphones), Story (Book),
 * Speaking (Mic), Personalized Practice (Dumbbell) và Unit Review Checkpoint (Trophy).
 * Mỗi Unit kết thúc bằng 1 Cột Mốc Tổng Hợp (isCheckpoint: true) để mở khóa Unit tiếp theo.
 */
export const CURATED_ROADMAP_STEPS: ZiczacPathStep[] = [
  // ==========================================
  // UNIT 1: NỀN TẢNG CỐT LÕI (5 CHẶNG)
  // ==========================================
  {
    id: "step-1",
    stepNumber: 1,
    unitNumber: 1,
    unitTitle: "Unit 1: Nền Tảng Cốt Lõi",
    title: "Từ Vựng Cốt Lõi 300 Từ Tần Suất Cao",
    description: "Nắm vững 300 từ vựng căn bản xuất hiện nhiều nhất trong bài thi và giao tiếp hằng ngày bằng phương pháp Flashcard Spaced Repetition.",
    skillType: "VOCAB",
    isCheckpoint: false,
    practicePath: "/vocabulary",
    xpReward: 25,
    coinsReward: 10,
    durationMinutes: 15,
    difficulty: "Dễ",
    tips: [
      "Luyện phát âm chuẩn phiên âm IPA của từng từ trước khi ghi nhớ nghĩa.",
      "Đặt ít nhất 1 câu ví dụ thực tế cho mỗi từ vựng mới học.",
    ],
  },
  {
    id: "step-2",
    stepNumber: 2,
    unitNumber: 1,
    unitTitle: "Unit 1: Nền Tảng Cốt Lõi",
    title: "Luyện Nghe Điền Từ Phản Xạ Âm Tiết",
    description: "Rèn luyện đôi tai nhạy bén với phương pháp nghe chép chính tả 3 bước, nhận diện âm đuôi, nối âm và từ khóa quan trọng.",
    skillType: "LISTENING",
    isCheckpoint: false,
    practicePath: "/study/dictation",
    xpReward: 30,
    coinsReward: 15,
    durationMinutes: 20,
    difficulty: "Dễ",
    tips: [
      "Nghe trọn vẹn cả câu trước khi gõ để nắm ngữ cảnh bài nói.",
      "Chú ý các âm đuôi /s/, /ed/, /t/ thường bị nuốt trong tiếng Anh tự nhiên.",
    ],
  },
  {
    id: "step-3",
    stepNumber: 3,
    unitNumber: 1,
    unitTitle: "Unit 1: Nền Tảng Cốt Lõi",
    title: "Ngữ Pháp AI: Cấu Trúc Câu Đơn & Câu Ghép",
    description: "Làm chủ trật tự từ S-V-O, liên từ nối (FANBOYS) và cách tạo câu ghép chuẩn xác cùng trợ lý Gemini AI Tutor.",
    skillType: "GRAMMAR",
    isCheckpoint: false,
    practicePath: "/study/grammar",
    xpReward: 25,
    coinsReward: 10,
    durationMinutes: 15,
    difficulty: "Trung bình",
    tips: [
      "Phân biệt rõ trạng từ liên kết (however, therefore) và liên từ kết hợp (and, but, so).",
      "Sử dụng bài tập tương tác AI để nhận diện lỗi sai tức thì.",
    ],
  },
  {
    id: "step-4",
    stepNumber: 4,
    unitNumber: 1,
    unitTitle: "Unit 1: Nền Tảng Cốt Lõi",
    title: "Luyện Tập Cá Nhân: Khắc Phục Lỗi Âm Tiết Hay Sai",
    description: "Rèn luyện cá nhân hóa (Personalized Practice) dựa trên các từ vựng và câu nghe bạn từng làm sai trong 3 bài trước.",
    skillType: "DUMBBELL",
    isCheckpoint: false,
    practicePath: "/study/practice?mode=weak_words",
    xpReward: 35,
    coinsReward: 15,
    durationMinutes: 15,
    difficulty: "Trung bình",
    tips: [
      "Lắng nghe kỹ đoạn phát âm chậm của hệ thống ở những từ từng gõ sai.",
      "Không sợ mắc lỗi: mỗi lần sửa sai là một lần củng cố vùng nhớ dài hạn.",
    ],
  },
  {
    id: "step-5",
    stepNumber: 5,
    unitNumber: 1,
    unitTitle: "Unit 1: Nền Tảng Cốt Lõi",
    title: "CỘT MỐC TỔNG HỢP 1: Đánh Giá Nền Tảng Toàn Diện",
    description: "Bài thi thử trắc nghiệm tổng hợp Mini-Test kiểm tra toàn diện 4 chặng: Từ vựng cốt lõi, Nghe chính tả, Ngữ pháp câu và Luyện tập sửa lỗi.",
    skillType: "CHECKPOINT",
    isCheckpoint: true,
    checkpointReviewScope: "Kiểm tra toàn diện kiến thức Chặng 1 đến Chặng 4 (Từ vựng cốt lõi, Nghe chính tả, Ngữ pháp câu đơn/ghép, Luyện tập cá nhân hóa).",
    practicePath: "/study/practice?mode=checkpoint&id=1",
    xpReward: 100,
    coinsReward: 50,
    durationMinutes: 25,
    difficulty: "Trung bình",
    tips: [
      "Cột Mốc Tổng Hợp yêu cầu đạt từ 70% trở lên để mở khóa Unit tiếp theo.",
      "Xem lại sổ tay hướng dẫn của Unit 1 trước khi bắt đầu bài kiểm tra.",
    ],
  },

  // ==========================================
  // UNIT 2: ĐÀM THOẠI & PHẢN XẠ ĐA GIỌNG ĐIỆU (7 CHẶNG)
  // ==========================================
  {
    id: "step-6",
    stepNumber: 6,
    unitNumber: 2,
    unitTitle: "Unit 2: Đàm Thoại & Phản Xạ Đa Giọng Điệu",
    title: "150 Cụm Từ Collocations Đời Thường",
    description: "Nắm vững các cụm từ kết hợp tự nhiên (make a decision, catch a cold, take advantage of) giúp câu nói chuẩn xác như người bản xứ.",
    skillType: "VOCAB",
    isCheckpoint: false,
    practicePath: "/vocabulary",
    xpReward: 30,
    coinsReward: 15,
    durationMinutes: 15,
    difficulty: "Trung bình",
    tips: [
      "Học từ theo cụm thay vì học từng từ đơn lẻ.",
      "Áp dụng phương pháp Flashcard lặp lại để ghi nhớ giới từ đi kèm.",
    ],
  },
  {
    id: "step-7",
    stepNumber: 7,
    unitNumber: 2,
    unitTitle: "Unit 2: Đàm Thoại & Phản Xạ Đa Giọng Điệu",
    title: "Luyện Nói Shadowing: Ngữ Điệu & Trọng Âm",
    description: "Thực hành nhại giọng theo người bản xứ với công nghệ AI chấm điểm trường độ, trọng âm câu và ngữ điệu lên xuống.",
    skillType: "SPEAKING",
    isCheckpoint: false,
    practicePath: "/study/shadowing",
    xpReward: 35,
    coinsReward: 20,
    durationMinutes: 15,
    difficulty: "Trung bình",
    tips: [
      "Nói to rõ ràng và khớp nhịp thở theo dải sóng âm thanh mẫu.",
      "Tập trung vào trọng âm câu (nhấn vào danh từ, động từ, tính từ chính).",
    ],
  },
  {
    id: "step-8",
    stepNumber: 8,
    unitNumber: 2,
    unitTitle: "Unit 2: Đàm Thoại & Phản Xạ Đa Giọng Điệu",
    title: "Luyện Nghe Hội Thoại 2 - 3 Người Đa Giọng Điệu",
    description: "Luyện nghe các đoạn đối thoại đa giọng điệu (Anh-Mỹ, Anh-Úc, Anh-Anh) trong các tình huống mua sắm, đặt lịch hẹn và trao đổi hàng ngày.",
    skillType: "LISTENING",
    isCheckpoint: false,
    practicePath: "/study/dictation",
    xpReward: 35,
    coinsReward: 20,
    durationMinutes: 20,
    difficulty: "Trung bình",
    tips: [
      "Tập trung nhận diện người nói và địa điểm diễn ra cuộc trò chuyện.",
      "Chú ý các từ chuyển ý: but, actually, unfortunately để bắt bẫy câu hỏi.",
    ],
  },
  {
    id: "step-9",
    stepNumber: 9,
    unitNumber: 2,
    unitTitle: "Unit 2: Đàm Thoại & Phản Xạ Đa Giọng Điệu",
    title: "Đọc Hiểu Đoạn Văn Đối Thoại & Truyện Thực Tế",
    description: "Trải nghiệm đọc câu chuyện tương tác dạng Duolingo Story, suy luận ngữ cảnh và trả lời các câu hỏi thấu hiểu cảm xúc nhân vật.",
    skillType: "STORY",
    isCheckpoint: false,
    practicePath: "/study/reading",
    xpReward: 40,
    coinsReward: 20,
    durationMinutes: 15,
    difficulty: "Trung bình",
    tips: [
      "Đọc lướt nhanh toàn đoạn đối thoại để nắm dòng chảy câu chuyện.",
      "Chú ý từ vựng miêu tả thái độ (surprised, hesitant, confident).",
    ],
  },
  {
    id: "step-10",
    stepNumber: 10,
    unitNumber: 2,
    unitTitle: "Unit 2: Đàm Thoại & Phản Xạ Đa Giọng Điệu",
    title: "Ngữ Pháp AI: Các Thì Quá Khứ & Hiện Tại Hoàn Thành",
    description: "Phân biệt rạch ròi Quá khứ đơn (Past Simple) và Hiện tại hoàn thành (Present Perfect) qua các tình huống thực tế và bài tập AI tương tác.",
    skillType: "GRAMMAR",
    isCheckpoint: false,
    practicePath: "/study/grammar",
    xpReward: 30,
    coinsReward: 15,
    durationMinutes: 15,
    difficulty: "Trung bình",
    tips: [
      "Dấu hiệu nhận biết: ago, yesterday, in 2020 vs since, for, already, yet.",
      "Hiện tại hoàn thành nhấn mạnh kết quả ảnh hưởng đến hiện tại.",
    ],
  },
  {
    id: "step-11",
    stepNumber: 11,
    unitNumber: 2,
    unitTitle: "Unit 2: Đàm Thoại & Phản Xạ Đa Giọng Điệu",
    title: "Luyện Tập Cá Nhân: Ôn Tập 50 Cụm Collocations Hay Quên",
    description: "Bài luyện tập thích ứng lặp lại các cụm từ và cấu trúc ngữ pháp bạn có tỉ lệ chọn sai cao nhất trong Unit 2.",
    skillType: "DUMBBELL",
    isCheckpoint: false,
    practicePath: "/study/practice?mode=weak_words",
    xpReward: 35,
    coinsReward: 20,
    durationMinutes: 15,
    difficulty: "Trung bình",
    tips: [
      "Tập đặt câu ngắn ngay khi hoàn thành mỗi câu hỏi trắc nghiệm.",
      "Đối chiếu đáp án đúng với phần giải thích chi tiết của trợ lý AI.",
    ],
  },
  {
    id: "step-12",
    stepNumber: 12,
    unitNumber: 2,
    unitTitle: "Unit 2: Đàm Thoại & Phản Xạ Đa Giọng Điệu",
    title: "CỘT MỐC TỔNG HỢP 2: Tổng Khảo Sát Giao Tiếp Phản Xạ",
    description: "Bài kiểm tra tổng hợp 6 chặng của Unit 2: Đánh giá toàn diện kỹ năng nghe đa giọng điệu, phản xạ nói Shadowing, đọc truyện ngữ cảnh và Collocations.",
    skillType: "CHECKPOINT",
    isCheckpoint: true,
    checkpointReviewScope: "Kiểm tra toàn diện kiến thức Chặng 6 đến Chặng 11 (Collocations đời thường, Shadowing ngữ điệu, Nghe đa giọng điệu, Đọc hiểu truyện, Thì quá khứ/hoàn thành).",
    practicePath: "/study/practice?mode=checkpoint&id=2",
    xpReward: 120,
    coinsReward: 60,
    durationMinutes: 30,
    difficulty: "Khó",
    tips: [
      "Cần đạt trên 70% điểm số để mở khóa Unit 3 Tiếng Anh Công Sở.",
      "Tự tin thể hiện khả năng phản xạ nghe và đọc hiểu nhanh dưới áp lực thời gian.",
    ],
  },

  // ==========================================
  // UNIT 3: TIẾNG ANH CÔNG SỞ & THƯ TÍN THƯƠNG MẠI (6 CHẶNG)
  // ==========================================
  {
    id: "step-13",
    stepNumber: 13,
    unitNumber: 3,
    unitTitle: "Unit 3: Tiếng Anh Công Sở & Thư Tín Thương Mại",
    title: "200 Thuật Ngữ Đàm Phán & Hợp Đồng Thương Mại",
    description: "Mở rộng vốn từ vựng chuyên ngành: đàm phán, thanh toán, điều khoản hợp đồng, quản lý chuỗi cung ứng và chăm sóc khách hàng doanh nghiệp.",
    skillType: "VOCAB",
    isCheckpoint: false,
    practicePath: "/vocabulary",
    xpReward: 35,
    coinsReward: 20,
    durationMinutes: 15,
    difficulty: "Trung bình",
    tips: [
      "Ghi nhớ các cụm từ trang trọng: reach an agreement, terminate a contract, terms and conditions.",
      "Gắn liền từ mới với các tình huống giao tiếp văn phòng thực tế.",
    ],
  },
  {
    id: "step-14",
    stepNumber: 14,
    unitNumber: 3,
    unitTitle: "Unit 3: Tiếng Anh Công Sở & Thư Tín Thương Mại",
    title: "Luyện Nghe Cuộc Họp Trực Tuyến & Báo Cáo Dự Án",
    description: "Nghe các đoạn ghi âm cuộc họp Scrum, báo cáo KPI hàng quý và trao đổi chiến lược với đối tác quốc tế qua Zoom/Teams.",
    skillType: "LISTENING",
    isCheckpoint: false,
    practicePath: "/study/dictation",
    xpReward: 40,
    coinsReward: 20,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Bắt các số liệu phần trăm tăng trưởng, doanh thu và mốc thời gian deadline.",
      "Chú ý giọng điệu trang trọng trong môi trường doanh nghiệp đa quốc gia.",
    ],
  },
  {
    id: "step-15",
    stepNumber: 15,
    unitNumber: 3,
    unitTitle: "Unit 3: Tiếng Anh Công Sở & Thư Tín Thương Mại",
    title: "Đọc Hiểu Thư Tín Thương Mại & Email Đề Xuất",
    description: "Luyện đọc hiểu thư chào hàng, đơn khiếu nại, thông báo nội bộ và bản ghi nhớ (Memo) với kỹ thuật Skimming & Scanning chuẩn xác.",
    skillType: "STORY",
    isCheckpoint: false,
    practicePath: "/study/reading",
    xpReward: 40,
    coinsReward: 20,
    durationMinutes: 20,
    difficulty: "Trung bình",
    tips: [
      "Luôn đọc tiêu đề Subject và dòng mở đầu để xác định ngay mục đích email.",
      "Tìm kiếm nhanh các từ khóa chỉ yêu cầu hành động (Action items).",
    ],
  },
  {
    id: "step-16",
    stepNumber: 16,
    unitNumber: 3,
    unitTitle: "Unit 3: Tiếng Anh Công Sở & Thư Tín Thương Mại",
    title: "Ngữ Pháp AI: Thể Bị Động & Mệnh Đề Quan Hệ Rút Gọn",
    description: "Làm chủ cách viết câu bị động khách quan trong báo cáo khoa học/công sở và kỹ thuật rút gọn mệnh đề quan hệ dạng V-ing / V-ed.",
    skillType: "GRAMMAR",
    isCheckpoint: false,
    practicePath: "/study/grammar",
    xpReward: 35,
    coinsReward: 20,
    durationMinutes: 15,
    difficulty: "Khó",
    tips: [
      "Chủ động: The company introduced a new policy -> Bị động: A new policy was introduced.",
      "Rút gọn chủ động dùng V-ing, rút gọn bị động dùng V-ed/P2.",
    ],
  },
  {
    id: "step-17",
    stepNumber: 17,
    unitNumber: 3,
    unitTitle: "Unit 3: Tiếng Anh Công Sở & Thư Tín Thương Mại",
    title: "Luyện Tập Cá Nhân: Thuật Ngữ Viết Báo Cáo Công Sở",
    description: "Củng cố các cấu trúc câu văn phòng, từ vựng hợp đồng và cách trả lời email mà bạn từng gặp bỡ ngỡ.",
    skillType: "DUMBBELL",
    isCheckpoint: false,
    practicePath: "/study/practice?mode=weak_words",
    xpReward: 40,
    coinsReward: 20,
    durationMinutes: 15,
    difficulty: "Trung bình",
    tips: [
      "Ôn tập lại các lỗi sai về giới từ thương mại: apply for, responsible for, in charge of.",
      "Đọc to câu văn hoàn chỉnh sau khi điền đáp án.",
    ],
  },
  {
    id: "step-18",
    stepNumber: 18,
    unitNumber: 3,
    unitTitle: "Unit 3: Tiếng Anh Công Sở & Thư Tín Thương Mại",
    title: "CỘT MỐC TỔNG HỢP 3: Thử Thách Kỹ Năng Tiếng Anh Công Sở",
    description: "Bài đánh giá toàn diện năng lực tiếng Anh thương mại: xử lý tình huống email, nghe hiểu biên bản cuộc họp và cấu trúc ngữ pháp rút gọn.",
    skillType: "CHECKPOINT",
    isCheckpoint: true,
    checkpointReviewScope: "Kiểm tra toàn diện kiến thức Chặng 13 đến Chặng 17 (Thuật ngữ thương mại, Nghe họp dự án, Đọc hiểu thư tín, Thể bị động & Mệnh đề quan hệ rút gọn).",
    practicePath: "/study/practice?mode=checkpoint&id=3",
    xpReward: 150,
    coinsReward: 75,
    durationMinutes: 30,
    difficulty: "Khó",
    tips: [
      "Vận dụng kỹ năng phân tích nhanh ngữ cảnh công việc thực tế.",
      "Đạt chuẩn để mở khóa Unit 4 Học Thuật AWL.",
    ],
  },

  // ==========================================
  // UNIT 4: HỌC THUẬT AWL & TRANH BIỆN AI (6 CHẶNG)
  // ==========================================
  {
    id: "step-19",
    stepNumber: 19,
    unitNumber: 4,
    unitTitle: "Unit 4: Học Thuật AWL & Tranh Biện AI",
    title: "Từ Vựng Học Thuật Academic Word List AWL",
    description: "Chinh phục 150 từ vựng cốt lõi của danh mục Academic Word List (sublist 1 - 4): analyze, demonstrate, fundamental, hypothesis, paradigm.",
    skillType: "VOCAB",
    isCheckpoint: false,
    practicePath: "/vocabulary",
    xpReward: 40,
    coinsReward: 25,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Học cả họ từ (Word Family): analyze -> analysis -> analytical -> analytically.",
      "Ghi nhớ các gốc từ Latin và tiền tố/hậu tố phổ biến.",
    ],
  },
  {
    id: "step-20",
    stepNumber: 20,
    unitNumber: 4,
    unitTitle: "Unit 4: Học Thuật AWL & Tranh Biện AI",
    title: "Nghe Bài Giảng Học Thuật & Ghi Chú Nhanh Note-Taking",
    description: "Luyện nghe bài thuyết trình khoa học, giảng đường đại học và thực hành kỹ năng ghi chú tốc ký theo ý chính (Main Idea & Supporting Points).",
    skillType: "LISTENING",
    isCheckpoint: false,
    practicePath: "/study/dictation",
    xpReward: 45,
    coinsReward: 25,
    durationMinutes: 25,
    difficulty: "Khó",
    tips: [
      "Sử dụng ký hiệu viết tắt (+, -, ->, w/) để bắt kịp tốc độ nói của diễn giả.",
      "Chú ý các từ báo hiệu cấu trúc: First and foremost, On the other hand, In conclusion.",
    ],
  },
  {
    id: "step-21",
    stepNumber: 21,
    unitNumber: 4,
    unitTitle: "Unit 4: Học Thuật AWL & Tranh Biện AI",
    title: "Đọc Hiểu Phân Tích Biểu Đồ & Trích Xuất Dữ Liệu",
    description: "Rèn luyện khả năng đọc hiểu bài báo khoa học, phân tích số liệu biểu đồ cột, đường xu hướng và trích xuất thông tin đối chiếu logic.",
    skillType: "READING",
    isCheckpoint: false,
    practicePath: "/study/reading",
    xpReward: 45,
    coinsReward: 25,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Nắm vững các động từ miêu tả xu hướng: surge, plummet, fluctuate, level off.",
      "Đối chiếu cẩn thận giữa thông tin trong đoạn văn và số liệu ghi chú biểu đồ.",
    ],
  },
  {
    id: "step-22",
    stepNumber: 22,
    unitNumber: 4,
    unitTitle: "Unit 4: Học Thuật AWL & Tranh Biện AI",
    title: "Luyện Nói Tranh Biện Đề Tài Xã Hội Cùng AI Tutor",
    description: "Thực hành trả lời câu hỏi mở về môi trường, công nghệ AI và giáo dục; nhận phản hồi trực tiếp từ Gemini AI về tính mạch lạc và từ vựng.",
    skillType: "SPEAKING",
    isCheckpoint: false,
    practicePath: "/study/shadowing",
    xpReward: 50,
    coinsReward: 30,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Áp dụng cấu trúc PEEL: Point (Quan điểm), Explanation (Giải thích), Example (Ví dụ), Link (Liên kết).",
      "Sử dụng các từ nối lập luận: Furthermore, In contrast, Consequently.",
    ],
  },
  {
    id: "step-23",
    stepNumber: 23,
    unitNumber: 4,
    unitTitle: "Unit 4: Học Thuật AWL & Tranh Biện AI",
    title: "Luyện Tập Cá Nhân: Ngữ Pháp & Từ Đồng Nghĩa Học Thuật",
    description: "Hệ thống tự động gom các lỗi sai về từ đồng nghĩa AWL và cấu trúc đảo ngữ phức tạp để bạn rèn luyện đến khi thành thạo.",
    skillType: "DUMBBELL",
    isCheckpoint: false,
    practicePath: "/study/practice?mode=weak_words",
    xpReward: 45,
    coinsReward: 25,
    durationMinutes: 15,
    difficulty: "Khó",
    tips: [
      "Chú ý sắc thái nghĩa của các từ đồng nghĩa (subtle connotations).",
      "Ôn tập lại các câu trúc đảo ngữ: Not only... but also, Scarcely... when.",
    ],
  },
  {
    id: "step-24",
    stepNumber: 24,
    unitNumber: 4,
    unitTitle: "Unit 4: Học Thuật AWL & Tranh Biện AI",
    title: "CỘT MỐC TỔNG HỢP 4: Đánh Giá Năng Lực Tư Duy Phản Biện",
    description: "Bài kiểm tra tổng hợp cấp cao: Đánh giá tư duy phân tích học thuật, từ vựng AWL, nghe giảng đường và kỹ năng lập luận sắc bén.",
    skillType: "CHECKPOINT",
    isCheckpoint: true,
    checkpointReviewScope: "Kiểm tra toàn diện kiến thức Chặng 19 đến Chặng 23 (Từ vựng AWL, Nghe giảng Note-taking, Đọc phân tích biểu đồ, Tranh biện AI và Luyện tập thích ứng).",
    practicePath: "/study/practice?mode=checkpoint&id=4",
    xpReward: 180,
    coinsReward: 90,
    durationMinutes: 35,
    difficulty: "Khó",
    tips: [
      "Đạt mức xuất sắc ở cột mốc này chứng minh bạn đã sẵn sàng bước vào phòng thi chuẩn hóa.",
      "Tập trung cao độ và quản lý thời gian làm bài hợp lý.",
    ],
  },

  // ==========================================
  // UNIT 5: CHINH PHỤC PHÒNG THI CHUẨN HÓA & VỀ ĐÍCH (4 CHẶNG - THEME: ROSE / RED)
  // ==========================================
  {
    id: "step-25",
    stepNumber: 25,
    unitNumber: 5,
    unitTitle: "Unit 5: Chinh Phục Phòng Thi Chuẩn Hóa",
    title: "Nhận Diện Bẫy Đề Thi Chuẩn Hóa Distractor & Paraphrase",
    description: "Mổ xẻ các bẫy phổ biến trong đề thi chuẩn hóa quốc tế: bẫy từ đồng âm, bẫy lặp từ có trong bài đọc nhưng sai thông tin, và nghệ thuật Paraphrasing.",
    skillType: "GRAMMAR",
    isCheckpoint: false,
    practicePath: "/study/grammar",
    xpReward: 50,
    coinsReward: 30,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Cảnh giác với đáp án chứa từ giống hệt trong bài đọc (thường là bẫy dẫn dụ - distractor).",
      "Đáp án đúng thường diễn đạt lại ý bằng từ đồng nghĩa (paraphrase).",
    ],
  },
  {
    id: "step-26",
    stepNumber: 26,
    unitNumber: 5,
    unitTitle: "Unit 5: Chinh Phục Phòng Thi Chuẩn Hóa",
    title: "Luyện Nghe Tốc Độ Cao Áp Lực Phòng Thi",
    description: "Rèn luyện nghe các đoạn audio với tốc độ 1.1x - 1.2x kèm tiếng ồn phòng thi mô phỏng, tăng cường phản xạ bắt ý chính và chọn đáp án tức thì.",
    skillType: "LISTENING",
    isCheckpoint: false,
    practicePath: "/study/dictation",
    xpReward: 50,
    coinsReward: 30,
    durationMinutes: 25,
    difficulty: "Khó",
    tips: [
      "Đọc trước câu hỏi và các phương án trả lời trong thời gian băng đọc hướng dẫn.",
      "Tuyệt đối không dừng lại quá lâu ở một câu hỏi đã lỡ mất thông tin.",
    ],
  },
  {
    id: "step-27",
    stepNumber: 27,
    unitNumber: 5,
    unitTitle: "Unit 5: Chinh Phục Phòng Thi Chuẩn Hóa",
    title: "Luyện Tập Cá Nhân: Tổng Ôn 200 Điểm Bẫy Thường Gặp",
    description: "Bộ đề luyện tập cá nhân hóa chọn lọc 200 câu hỏi học viên cả hệ thống dễ bị mất điểm nhất, giúp bạn trám trọn vẹn mọi lỗ hổng.",
    skillType: "DUMBBELL",
    isCheckpoint: false,
    practicePath: "/study/practice?mode=weak_words",
    xpReward: 50,
    coinsReward: 35,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Đọc kỹ phần giải thích của từng câu sai để ghi nhớ quy tắc loại trừ.",
      "Ghi chép lại các bẫy ngữ pháp bạn vẫn còn cảm giác mơ hồ.",
    ],
  },
  {
    id: "step-28",
    stepNumber: 28,
    unitNumber: 5,
    unitTitle: "Unit 5: Chinh Phục Phòng Thi Chuẩn Hóa",
    title: "CỘT MỐC HOÀNG GIA: Đại Thi Thử Full Test 120 Phút Toàn Diện",
    description: "Đại thi thử chuẩn hóa toàn diện 28 chặng: Tổng kiểm tra Nghe - Đọc - Ngữ pháp - Từ vựng với áp lực thời gian phòng thi thật tại XP English Exam Center.",
    skillType: "CHECKPOINT",
    isCheckpoint: true,
    checkpointReviewScope: "Đại thi thử toàn diện 28 chặng học tập: Đánh giá trình độ tương đương đề thi chuẩn hóa quốc tế với bảng phân tích điểm mạnh - điểm yếu chi tiết từ AI.",
    practicePath: "/study/exam-prep",
    xpReward: 300,
    coinsReward: 150,
    durationMinutes: 60,
    difficulty: "Khó",
    tips: [
      "Chuẩn bị tai nghe chất lượng tốt và không gian yên tĩnh trước khi bấm bắt đầu.",
      "Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ 28 chặng của lộ trình học tập!",
    ],
  },
];

/**
 * Gom nhóm 28 chặng học tập thành 5 Unit lớn với số lượng chặng linh hoạt [5, 7, 6, 6, 4]
 * và cung cấp đầy đủ dữ liệu Sổ Tay Hướng Dẫn (Guidebook) cho từng Unit.
 */
export const getCuratedUnitGroups = (): ZiczacUnitGroup[] => {
  const unitsMap = new Map<number, ZiczacUnitGroup>();

  CURATED_ROADMAP_STEPS.forEach((step) => {
    if (!unitsMap.has(step.unitNumber)) {
      let unitSubtitle = "";
      let colorTheme: "blue" | "emerald" | "purple" | "amber" | "rose" = "blue";
      let guidebookObjectives: string[] = [];
      let guidebookGrammarTip = "";
      let guidebookKeyPhrases: Array<{ phrase: string; translation: string }> = [];

      switch (step.unitNumber) {
        case 1:
          unitSubtitle = "Xây dựng 300 từ vựng cốt lõi, phản xạ chính tả & cấu trúc câu đơn/ghép";
          colorTheme = "blue";
          guidebookObjectives = [
            "Nắm vững 300 từ vựng tần suất cao nhất theo phương pháp Spaced Repetition.",
            "Rèn luyện kỹ thuật nghe chép chính tả 3 bước nhận diện chuẩn âm tiết và nối âm.",
            "Làm chủ cấu trúc câu đơn S-V-O và cách nối câu ghép chuẩn ngữ pháp.",
            "Đạt trên 70% ở Cột Mốc Tổng Hợp 1 để mở khóa Unit 2.",
          ];
          guidebookGrammarTip =
            "Quy tắc nối câu ghép: Sử dụng liên từ FANBOYS (For, And, Nor, But, Or, Yet, So). Luôn đặt dấu phẩy trước liên từ khi nối hai mệnh đề độc lập: 'I wanted to study, but I was exhausted.'";
          guidebookKeyPhrases = [
            { phrase: "take advantage of", translation: "tận dụng tối đa cơ hội" },
            { phrase: "make progress in", translation: "đạt được tiến bộ trong" },
            { phrase: "pay attention to", translation: "chú ý tập trung vào" },
            { phrase: "in accordance with", translation: "phù hợp, tuân theo quy định" },
          ];
          break;

        case 2:
          unitSubtitle = "Bứt phá đàm thoại đa giọng điệu, phản xạ nói Shadowing & Collocations đời thường";
          colorTheme = "emerald";
          guidebookObjectives = [
            "Làm chủ 150 cụm từ Collocations thông dụng trong giao tiếp hàng ngày.",
            "Rèn luyện nói nhại giọng Shadowing chuẩn trọng âm câu và ngữ điệu tự nhiên.",
            "Làm quen với giọng phát âm Anh-Mỹ, Anh-Úc và Anh-Anh trong hội thoại thực tế.",
            "Đọc hiểu truyện đối thoại và trả lời chính xác câu hỏi suy luận ngữ cảnh.",
          ];
          guidebookGrammarTip =
            "Phân biệt Quá khứ đơn vs Hiện tại hoàn thành: Dùng Past Simple khi có thời gian xác định trong quá khứ (yesterday, in 2022). Dùng Present Perfect khi hành động xảy ra tại thời điểm không xác định hoặc kết quả còn kéo dài đến hiện tại: 'I have lost my key.'";
          guidebookKeyPhrases = [
            { phrase: "catch someone's attention", translation: "thu hút sự chú ý của ai đó" },
            { phrase: "have something in common", translation: "có điểm chung với nhau" },
            { phrase: "out of the blue", translation: "bất ngờ, không báo trước" },
            { phrase: "keep in touch with", translation: "giữ liên lạc thường xuyên với" },
          ];
          break;

        case 3:
          unitSubtitle = "Làm chủ tiếng Anh công sở, đàm phán hợp đồng, họp trực tuyến & thư tín thương mại";
          colorTheme = "purple";
          guidebookObjectives = [
            "Làm chủ 200 thuật ngữ thương mại về đàm phán, thanh toán và ký kết hợp đồng.",
            "Nghe hiểu cuộc họp trực tuyến và báo cáo tiến độ dự án quốc tế.",
            "Đọc hiểu thư tín thương mại, thông báo nội bộ và email đề xuất hợp tác.",
            "Ứng dụng thể bị động khách quan và mệnh đề quan hệ rút gọn vào văn bản báo cáo.",
          ];
          guidebookGrammarTip =
            "Rút gọn mệnh đề quan hệ: Dùng V-ing khi mệnh đề mang nghĩa chủ động ('The person speaking is our CEO'). Dùng V-ed / P2 khi mệnh đề mang nghĩa bị động ('The proposal submitted yesterday was approved').";
          guidebookKeyPhrases = [
            { phrase: "reach a mutual agreement", translation: "đạt được thỏa thuận chung" },
            { phrase: "comply with regulations", translation: "tuân thủ các quy định hiện hành" },
            { phrase: "schedule a meeting", translation: "sắp xếp lịch họp công việc" },
            { phrase: "be subject to approval", translation: "phải chờ được phê duyệt" },
          ];
          break;

        case 4:
          unitSubtitle = "Chinh phục từ vựng học thuật AWL, nghe giảng đường & tranh biện phản biện AI";
          colorTheme = "amber";
          guidebookObjectives = [
            "Nắm vững 150 từ vựng danh mục Academic Word List (AWL) cốt lõi.",
            "Rèn luyện kỹ năng nghe bài giảng khoa học và ghi chú nhanh Note-Taking.",
            "Đọc hiểu phân tích biểu đồ, bảng biểu số liệu và trích xuất dữ liệu logic.",
            "Thực hành tranh biện các đề tài xã hội cùng trợ lý AI theo cấu trúc PEEL.",
          ];
          guidebookGrammarTip =
            "Cấu trúc đảo ngữ nhấn mạnh (Inversion): Khi câu bắt đầu bằng phó từ phủ định hoặc bán phủ định (Not only, Rarely, Scarcely, Never), ta đảo trợ động từ lên trước chủ ngữ: 'Never have I witnessed such a rapid transformation.'";
          guidebookKeyPhrases = [
            { phrase: "demonstrate a clear trend", translation: "chứng minh một xu hướng rõ ràng" },
            { phrase: "in contrast to previous findings", translation: "trái ngược với các phát hiện trước đó" },
            { phrase: "play a pivotal role in", translation: "đóng vai trò then chốt trong" },
            { phrase: "provide empirical evidence", translation: "cung cấp bằng chứng thực nghiệm" },
          ];
          break;

        case 5:
          unitSubtitle = "Nhận diện bẫy đề thi, nghe tốc độ cao & chinh phục Cột Mốc Hoàng Gia";
          colorTheme = "rose";
          guidebookObjectives = [
            "Nhận diện chính xác các bẫy Distractor, bẫy từ đồng âm và kỹ thuật Paraphrase.",
            "Rèn luyện nghe tốc độ cao 1.1x - 1.2x thích ứng với môi trường thi cử thực chiến.",
            "Chiến lược phân bổ thời gian tối ưu cho bài thi 120 phút không bị thiếu giờ.",
            "Hoàn thành Cột Mốc Hoàng Gia: Đạt điểm số cao ở bài thi Full Test toàn diện.",
          ];
          guidebookGrammarTip =
            "Chiến thuật Paraphrasing trong bài thi: Đề thi thật luôn dùng từ đồng nghĩa để diễn đạt lại nội dung nghe hoặc đọc. Ví dụ: 'increase significantly' -> 'substantial growth'; 'mandatory' -> 'compulsory'. Hãy tìm kiếm ý nghĩa tương đương thay vì tìm từ giống hệt.";
          guidebookKeyPhrases = [
            { phrase: "eliminate incorrect options", translation: "loại trừ các phương án sai" },
            { phrase: "identify context clues", translation: "nhận diện manh mối ngữ cảnh" },
            { phrase: "manage test time wisely", translation: "quản lý thời gian thi khôn ngoan" },
            { phrase: "achieve the target score", translation: "đạt được điểm số mục tiêu đề ra" },
          ];
          break;

        default:
          unitSubtitle = "Chặng học tập chuyên sâu";
          colorTheme = "blue";
          guidebookObjectives = ["Hoàn thành các chặng rèn luyện để đạt mục tiêu."];
          guidebookGrammarTip = "Hãy duy trì việc học mỗi ngày.";
          guidebookKeyPhrases = [];
      }

      unitsMap.set(step.unitNumber, {
        unitNumber: step.unitNumber,
        unitTitle: step.unitTitle,
        unitSubtitle,
        colorTheme,
        guidebookObjectives,
        guidebookGrammarTip,
        guidebookKeyPhrases,
        steps: [],
      });
    }

    unitsMap.get(step.unitNumber)!.steps.push(step);
  });

  return Array.from(unitsMap.values());
};
