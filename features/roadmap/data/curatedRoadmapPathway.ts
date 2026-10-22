import { ZiczacPathStep, ZiczacUnitGroup } from "../types";

/**
 * CURATED MASTER ROADMAP PATHWAY
 * Giáo trình lộ trình học chuẩn mực gồm 20 chặng chia làm 4 Unit lớn.
 * Cứ mỗi 5 chặng có 1 Cột Mốc Tổng Hợp (isCheckpoint: true) để ôn tập và test lại toàn bộ 4 chặng trước.
 * Tất cả các chặng đều liên kết trực tiếp tới các tính năng có thật trên website XP English.
 */
export const CURATED_ROADMAP_STEPS: ZiczacPathStep[] = [
  // ==========================================
  // UNIT 1: NỀN TẢNG CỐT LÕI (BÀI 1 - 5)
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
    title: "Luyện Nói Shadowing: Nhại Giọng Chuẩn Ngữ Điệu",
    description: "Thực hành nhại giọng theo người bản xứ với công nghệ AI chấm điểm trường độ, trọng âm câu và ngữ điệu lên xuống.",
    skillType: "SPEAKING",
    isCheckpoint: false,
    practicePath: "/study/shadowing",
    xpReward: 35,
    coinsReward: 20,
    durationMinutes: 15,
    difficulty: "Dễ",
    tips: [
      "Nói to rõ ràng và khớp nhịp thở theo dải sóng âm thanh mẫu.",
      "Tập trung vào trọng âm câu (nhấn vào danh từ, động từ, tính từ chính).",
    ],
  },
  {
    id: "step-5",
    stepNumber: 5,
    unitNumber: 1,
    unitTitle: "Unit 1: Nền Tảng Cốt Lõi",
    title: "CỘT MỐC TỔNG HỢP 1: Ôn Tập & Đánh Giá Chặng 1 - 4",
    description: "Bài thi thử trắc nghiệm tổng hợp Mini-Test kiểm tra toàn diện 4 kỹ năng: Từ vựng tần suất cao, Nghe chép chính tả, Ngữ pháp câu và Luyện nói Shadowing.",
    skillType: "CHECKPOINT",
    isCheckpoint: true,
    checkpointReviewScope: "Kiểm tra toàn diện kiến thức Chặng 1 đến Chặng 4 (Từ vựng cốt lõi, Nghe chính tả, Ngữ pháp câu đơn/ghép, Phát âm Shadowing).",
    practicePath: "/study/practice?mode=checkpoint&id=1",
    xpReward: 100,
    coinsReward: 50,
    durationMinutes: 25,
    difficulty: "Trung bình",
    tips: [
      "Cột Mốc Tổng Hợp yêu cầu đạt từ 70% trở lên để mở khóa rương phần thưởng đặc biệt.",
      "Xem lại ghi chú và flashcard của các bài 1 đến 4 trước khi bắt đầu làm bài test.",
    ],
  },

  // ==========================================
  // UNIT 2: TĂNG TỐC KỸ NĂNG & MỞ RỘNG (BÀI 6 - 10)
  // ==========================================
  {
    id: "step-6",
    stepNumber: 6,
    unitNumber: 2,
    unitTitle: "Unit 2: Tăng Tốc Kỹ Năng",
    title: "Từ Vựng Chuyên Sâu Công Sở & Thương Mại",
    description: "Mở rộng 150 thuật ngữ chuyên ngành về họp hành, hợp đồng, đàm phán dự án và trao đổi qua Email chuyên nghiệp.",
    skillType: "VOCAB",
    isCheckpoint: false,
    practicePath: "/vocabulary",
    xpReward: 30,
    coinsReward: 15,
    durationMinutes: 15,
    difficulty: "Trung bình",
    tips: [
      "Ghi nhớ từ đi kèm với giới từ thông dụng: comply with, adhere to, collaborate on.",
      "Áp dụng ngay các cụm từ này vào ngữ cảnh viết thư tín thương mại.",
    ],
  },
  {
    id: "step-7",
    stepNumber: 7,
    unitNumber: 2,
    unitTitle: "Unit 2: Tăng Tốc Kỹ Năng",
    title: "Luyện Nghe Hội Thoại 2 - 3 Người & Nối Âm",
    description: "Luyện nghe các đoạn đối thoại đa giọng điệu (Anh-Mỹ, Anh-Úc, Anh-Anh) trong các tình huống mua sắm, đặt lịch hẹn và trao đổi văn phòng.",
    skillType: "LISTENING",
    isCheckpoint: false,
    practicePath: "/study/dictation",
    xpReward: 35,
    coinsReward: 20,
    durationMinutes: 20,
    difficulty: "Trung bình",
    tips: [
      "Tập trung nhận diện người nói (Who is talking) và địa điểm diễn ra cuộc trò chuyện.",
      "Chú ý các từ chuyển ý: but, actually, unfortunately để bắt bẫy câu hỏi.",
    ],
  },
  {
    id: "step-8",
    stepNumber: 8,
    unitNumber: 2,
    unitTitle: "Unit 2: Tăng Tốc Kỹ Năng",
    title: "Ngữ Pháp AI: Mệnh Đề Quan Hệ & Câu Bị Động",
    description: "Thành thạo mệnh đề quan hệ rút gọn (V-ing / V-ed) và các cấu trúc câu bị động đặc biệt hay gặp trong bài thi chuẩn hóa.",
    skillType: "GRAMMAR",
    isCheckpoint: false,
    practicePath: "/study/grammar",
    xpReward: 30,
    coinsReward: 15,
    durationMinutes: 20,
    difficulty: "Trung bình",
    tips: [
      "Chủ động rút gọn mệnh đề khi hai mệnh đề có cùng chủ ngữ.",
      "Nhận diện câu bị động bằng dấu hiệu By + Tân ngữ hoặc động từ To Be + Past Participle.",
    ],
  },
  {
    id: "step-9",
    stepNumber: 9,
    unitNumber: 2,
    unitTitle: "Unit 2: Tăng Tốc Kỹ Năng",
    title: "Đọc Hiểu Skimming & Scanning Đoạn Văn Dài",
    description: "Phương pháp đọc lướt nắm ý chính trong 30 giây và đọc quét từ khóa định vị câu trả lời nhanh chóng cho bài đọc hiểu.",
    skillType: "READING",
    isCheckpoint: false,
    practicePath: "/study/reading",
    xpReward: 35,
    coinsReward: 20,
    durationMinutes: 20,
    difficulty: "Trung bình",
    tips: [
      "Đọc câu đầu và câu cuối của mỗi đoạn văn để nắm mạch ý chính.",
      "Gạch chân các mốc thời gian, tên riêng và số liệu khi đọc đề bài.",
    ],
  },
  {
    id: "step-10",
    stepNumber: 10,
    unitNumber: 2,
    unitTitle: "Unit 2: Tăng Tốc Kỹ Năng",
    title: "CỘT MỐC TỔNG HỢP 2: Ôn Tập & Đánh Giá Chặng 6 - 9",
    description: "Bài thi đánh giá bứt phá kiểm tra toàn diện kỹ năng Chặng 6 đến 9: Từ vựng thương mại, Nghe đàm thoại nhanh, Ngữ pháp mệnh đề và Kỹ năng đọc hiểu Skimming/Scanning.",
    skillType: "CHECKPOINT",
    isCheckpoint: true,
    checkpointReviewScope: "Kiểm tra toàn diện kiến thức Chặng 6 đến Chặng 9 (Từ vựng công sở, Nghe hội thoại đa giọng điệu, Bị động & Mệnh đề quan hệ, Đọc hiểu bài luận).",
    practicePath: "/study/practice?mode=checkpoint&id=2",
    xpReward: 150,
    coinsReward: 75,
    durationMinutes: 30,
    difficulty: "Khó",
    tips: [
      "Bài test này có tính giờ nghiêm ngặt, rèn luyện áp lực phòng thi thật.",
      "Phân bổ thời gian: 15 phút cho phần Nghe, 15 phút cho phần Đọc và Ngữ pháp.",
    ],
  },

  // ==========================================
  // UNIT 3: NÂNG CAO PHẢN XẠ & BỨT PHÁ (BÀI 11 - 15)
  // ==========================================
  {
    id: "step-11",
    stepNumber: 11,
    unitNumber: 3,
    unitTitle: "Unit 3: Bứt Phá Điểm Số",
    title: "Từ Vựng Học Thuật Academic Word List (AWL)",
    description: "Làm chủ 200 từ vựng học thuật cấp độ C1 phục vụ viết luận học thuật, đọc báo cáo nghiên cứu và bứt phá điểm số cao.",
    skillType: "VOCAB",
    isCheckpoint: false,
    practicePath: "/vocabulary",
    xpReward: 35,
    coinsReward: 20,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Học các tiền tố (prefix) và hậu tố (suffix) để đoán nhanh nghĩa của từ mới.",
      "Phân biệt sắc thái biểu cảm của các từ đồng nghĩa (synonyms).",
    ],
  },
  {
    id: "step-12",
    stepNumber: 12,
    unitNumber: 3,
    unitTitle: "Unit 3: Bứt Phá Điểm Số",
    title: "Nghe Hiểu Độc Thoại Tin Tức & Thuyết Trình",
    description: "Luyện nghe bài nói diễn thuyết chuyên đề, thông báo sân bay, tin tức thời sự BBC với tốc độ nói tự nhiên của người bản xứ.",
    skillType: "LISTENING",
    isCheckpoint: false,
    practicePath: "/study/dictation",
    xpReward: 40,
    coinsReward: 25,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Tập trung vào các liên từ chỉ sự tương phản: however, on the contrary, despite.",
      "Không dừng lại khi gặp một từ không nghe kịp, hãy duy trì dòng chảy nghe cả câu.",
    ],
  },
  {
    id: "step-13",
    stepNumber: 13,
    unitNumber: 3,
    unitTitle: "Unit 3: Bứt Phá Điểm Số",
    title: "Ngữ Pháp AI: Đảo Ngữ & Câu Điều Kiện Hỗn Hợp",
    description: "Chinh phục các cấu trúc câu nâng cao: Đảo ngữ với Not only, Hardly, Never và câu điều kiện loại hỗn hợp Mixed Conditionals.",
    skillType: "GRAMMAR",
    isCheckpoint: false,
    practicePath: "/study/grammar",
    xpReward: 35,
    coinsReward: 20,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Ghi nhớ cấu trúc đảo trợ động từ lên trước chủ ngữ khi từ phủ định đứng đầu câu.",
      "Hỏi AI Tutor ngay nếu chưa hiểu rõ điều kiện quá khứ dẫn đến kết quả hiện tại.",
    ],
  },
  {
    id: "step-14",
    stepNumber: 14,
    unitNumber: 3,
    unitTitle: "Unit 3: Bứt Phá Điểm Số",
    title: "Luyện Nói Tranh Biện & Phản Xạ 1-on-1 AI",
    description: "Mô phỏng phỏng vấn xin việc và thảo luận quan điểm cùng AI Tutor, rèn luyện tư duy phản biện và khả năng diễn đạt lưu loát.",
    skillType: "SPEAKING",
    isCheckpoint: false,
    practicePath: "/study/shadowing",
    xpReward: 45,
    coinsReward: 30,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Sử dụng công thức P.E.E.L (Point - Explanation - Example - Link) để trả lời trọn vẹn.",
      "Tránh câu trả lời quá ngắn, hãy mở rộng bằng nguyên nhân và ví dụ thực tế.",
    ],
  },
  {
    id: "step-15",
    stepNumber: 15,
    unitNumber: 3,
    unitTitle: "Unit 3: Bứt Phá Điểm Số",
    title: "CỘT MỐC TỔNG HỢP 3: Ôn Tập & Đánh Giá Chặng 11 - 14",
    description: "Bài thi đánh giá chuyên sâu kiến thức Chặng 11 đến 14: Từ vựng học thuật AWL, Nghe hiểu thuyết trình nâng cao, Ngữ pháp đảo ngữ và Luyện nói phản xạ tranh biện.",
    skillType: "CHECKPOINT",
    isCheckpoint: true,
    checkpointReviewScope: "Kiểm tra toàn diện kiến thức Chặng 11 đến Chặng 14 (Từ vựng AWL, Nghe độc thoại chuyên sâu, Đảo ngữ & Câu điều kiện hỗn hợp, Tranh biện phản xạ).",
    practicePath: "/study/practice?mode=checkpoint&id=3",
    xpReward: 200,
    coinsReward: 100,
    durationMinutes: 35,
    difficulty: "Khó",
    tips: [
      "Đây là Cột Mốc bản lề quyết định band điểm cao và bứt phá giới hạn cá nhân.",
      "Rà soát lại danh sách từ vựng AWL và các cấu trúc đảo ngữ trước khi làm bài.",
    ],
  },

  // ==========================================
  // UNIT 4: LÀM CHỦ ĐỀ THI & VỀ ĐÍCH (BÀI 16 - 20)
  // ==========================================
  {
    id: "step-16",
    stepNumber: 16,
    unitNumber: 4,
    unitTitle: "Unit 4: Về Đích Mục Tiêu",
    title: "Từ Vựng Bẫy & Cụm Collocations Tinh Tuyển",
    description: "Nhận diện 100 cặp từ dễ gây nhầm lẫn (confusing words) và các cụm từ kết hợp tự nhiên giúp ăn điểm tuyệt đối trong bài thi.",
    skillType: "VOCAB",
    isCheckpoint: false,
    practicePath: "/vocabulary",
    xpReward: 40,
    coinsReward: 25,
    durationMinutes: 15,
    difficulty: "Khó",
    tips: [
      "Phân biệt chính xác giữa affect/effect, complement/compliment, economic/economical.",
      "Học từ theo cụm thay vì học từng từ đơn lẻ.",
    ],
  },
  {
    id: "step-17",
    stepNumber: 17,
    unitNumber: 4,
    unitTitle: "Unit 4: Về Đích Mục Tiêu",
    title: "Chiến Thuật Đọc Hiểu Đa Đoạn Văn Đơn / Kép",
    description: "Phương pháp liên kết thông tin chéo giữa bài đọc email, hóa đơn thanh toán và thông báo tuyển dụng để trả lời các câu hỏi suy luận (Inference).",
    skillType: "READING",
    isCheckpoint: false,
    practicePath: "/study/reading",
    xpReward: 45,
    coinsReward: 30,
    durationMinutes: 25,
    difficulty: "Khó",
    tips: [
      "Làm các câu hỏi tìm chi tiết trước, để dành câu hỏi suy luận và ý chính làm sau.",
      "Không tự suy đoán ngoài đời thực, mọi bằng chứng phải bắt nguồn từ văn bản.",
    ],
  },
  {
    id: "step-18",
    stepNumber: 18,
    unitNumber: 4,
    unitTitle: "Unit 4: Về Đích Mục Tiêu",
    title: "Luyện Nghe Tốc Độ Cao 1.25x & Bắt Ý Chính",
    description: "Tập luyện đôi tai phản xạ với tốc độ nói nhanh 1.25x để khi vào phòng thi thật nghe tốc độ chuẩn 1.0x sẽ cảm thấy vô cùng thư thái.",
    skillType: "LISTENING",
    isCheckpoint: false,
    practicePath: "/study/dictation",
    xpReward: 45,
    coinsReward: 30,
    durationMinutes: 20,
    difficulty: "Khó",
    tips: [
      "Bật tốc độ 1.25x trong trình phát và chú ý bắt trọng âm câu.",
      "Tập nhẩm lại trong đầu (Echoing) ngay sau khi giọng nói vừa dứt.",
    ],
  },
  {
    id: "step-19",
    stepNumber: 19,
    unitNumber: 4,
    unitTitle: "Unit 4: Về Đích Mục Tiêu",
    title: "Luyện Viết & Diễn Đạt Tự Nhiên Với AI Tutor",
    description: "Luyện viết đoạn văn và bài luận ngắn, trợ lý AI sửa lỗi diễn đạt gượng gạo, đề xuất từ vựng nâng cao và chấm điểm ngữ pháp tức thì.",
    skillType: "WRITING",
    isCheckpoint: false,
    practicePath: "/study/practice?subMode=writing",
    xpReward: 50,
    coinsReward: 35,
    durationMinutes: 25,
    difficulty: "Khó",
    tips: [
      "Tránh lặp từ bằng cách dùng đại từ thay thế hoặc từ đồng nghĩa.",
      "Đọc lại toàn bài ít nhất một lần để kiểm tra lỗi chia thì và mạo từ a/an/the.",
    ],
  },
  {
    id: "step-20",
    stepNumber: 20,
    unitNumber: 4,
    unitTitle: "Unit 4: Về Đích Mục Tiêu",
    title: "CỘT MỐC TỔNG HỢP HOÀNG GIA: Đại Thi Thử Full Test Toàn Diện",
    description: "Đại thi thử chuẩn hóa toàn diện 20 chặng: Tổng kiểm tra Nghe - Đọc - Ngữ pháp - Từ vựng với áp lực thời gian phòng thi thật tại XP English Exam Center.",
    skillType: "CHECKPOINT",
    isCheckpoint: true,
    checkpointReviewScope: "Đại thi thử toàn diện 20 chặng học tập: Đánh giá trình độ tương đương đề thi chuẩn hóa quốc tế với bảng phân tích điểm mạnh - điểm yếu chi tiết từ AI.",
    practicePath: "/study/exam-prep",
    xpReward: 300,
    coinsReward: 150,
    durationMinutes: 60,
    difficulty: "Khó",
    tips: [
      "Chuẩn bị tai nghe chất lượng tốt và không gian yên tĩnh trước khi bấm bắt đầu.",
      "Chúc mừng bạn đã hoàn thành chặng đường 20 bài học xuất sắc!",
    ],
  },
];

/**
 * Gom nhóm 20 chặng học tập thành các Unit để vẽ tiêu đề và dải phân cách lộ trình
 */
export const getCuratedUnitGroups = (): ZiczacUnitGroup[] => {
  const unitsMap = new Map<number, ZiczacUnitGroup>();

  CURATED_ROADMAP_STEPS.forEach((step) => {
    if (!unitsMap.has(step.unitNumber)) {
      let unitSubtitle = "";
      switch (step.unitNumber) {
        case 1:
          unitSubtitle = "Xây dựng 300 từ vựng cốt lõi, phản xạ chính tả & cấu trúc câu đơn/ghép";
          break;
        case 2:
          unitSubtitle = "Bứt phá tiếng Anh công sở, đàm thoại đa giọng điệu & kỹ năng Skimming";
          break;
        case 3:
          unitSubtitle = "Làm chủ từ vựng học thuật AWL, đảo ngữ câu & phản xạ tranh biện";
          break;
        case 4:
          unitSubtitle = "Nhận diện bẫy thi cử, luyện nghe tốc độ cao & chinh phục đề thi chuẩn";
          break;
        default:
          unitSubtitle = "Chặng học tập chuyên sâu";
      }

      unitsMap.set(step.unitNumber, {
        unitNumber: step.unitNumber,
        unitTitle: step.unitTitle,
        unitSubtitle,
        steps: [],
      });
    }

    unitsMap.get(step.unitNumber)!.steps.push(step);
  });

  return Array.from(unitsMap.values());
};
