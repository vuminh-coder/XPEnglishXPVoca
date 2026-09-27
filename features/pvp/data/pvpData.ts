import { Opponent, DifficultySettings, QuestionPackage, PvPDifficulty } from "../types";

export const MOCK_OPPONENTS: Opponent[] = [
  { name: "Minh Thu", avatarEmoji: "🦊", level: 6, title: "Word Apprentice" },
  { name: "Sarah Connor", avatarEmoji: "🦁", level: 11, title: "Vocabulary Scholar" },
  { name: "Gia Bảo", avatarEmoji: "🦉", level: 8, title: "English Seeker" },
  { name: "Alex Mercer", avatarEmoji: "🐼", level: 12, title: "Language Specialist" },
  { name: "Thu Trang", avatarEmoji: "🦄", level: 9, title: "Pronunciation Master" },
  { name: "David Kim", avatarEmoji: "🐯", level: 14, title: "Grandmaster" },
];

export function getDifficultySettings(diff: PvPDifficulty): DifficultySettings {
  switch (diff) {
    case "easy":
      return {
        totalQuestions: 5,
        timeLimit: 15,
        aiAccuracy: 0.55,
        aiDelay: [4000, 8000],
        vocabFilter: (w) => w.length <= 6,
      };
    case "hard":
      return {
        totalQuestions: 15,
        timeLimit: 7,
        aiAccuracy: 0.92,
        aiDelay: [1000, 2500],
        vocabFilter: (w) => w.length > 9,
      };
    default: // medium
      return {
        totalQuestions: 10,
        timeLimit: 10,
        aiAccuracy: 0.75,
        aiDelay: [2000, 5000],
        vocabFilter: (w) => w.length > 6 && w.length <= 9,
      };
  }
}

export function getAiDelay(diff: PvPDifficulty): number {
  const settings = getDifficultySettings(diff);
  const [min, max] = settings.aiDelay;
  return Math.random() * (max - min) + min;
}

export function getAiIsCorrect(diff: PvPDifficulty): boolean {
  const settings = getDifficultySettings(diff);
  return Math.random() < settings.aiAccuracy;
}

export function scrambleWord(word: string): string[] {
  const letters = word.toLowerCase().replace(/[^a-z0-9]/g, "").split("");
  return [...letters].sort(() => 0.5 - Math.random());
}

export function normalizeWordForCheck(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

export const DEFAULT_FALLBACK_QUESTIONS: QuestionPackage[] = [
  {
    question: {
      id: "w1",
      word: "innovate",
      meaning: "Đổi mới, cách tân",
      ipa: "/ˈɪn.ə.veɪt/",
      pos: "v",
      example: "Companies must innovate to survive.",
    },
    options: [
      { id: "opt1", text: "Đổi mới, cách tân", isCorrect: true },
      { id: "opt2", text: "Bảo tồn, lưu giữ", isCorrect: false },
      { id: "opt3", text: "Phá hủy, dỡ bỏ", isCorrect: false },
      { id: "opt4", text: "Sao chép, nhái lại", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w2",
      word: "resilient",
      meaning: "Kiên cường, bền bỉ, mau phục hồi",
      ipa: "/rɪˈzɪl.jənt/",
      pos: "adj",
      example: "She is very resilient under pressure.",
    },
    options: [
      { id: "opt1", text: "Yếu đuối, dễ gãy", isCorrect: false },
      { id: "opt2", text: "Kiên cường, bền bỉ", isCorrect: true },
      { id: "opt3", text: "Chậm chạp, trì trệ", isCorrect: false },
      { id: "opt4", text: "Nổi tiếng, trứ danh", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w3",
      word: "collaborate",
      meaning: "Hợp tác, cộng tác làm việc",
      ipa: "/kəˈlæb.ə.reɪt/",
      pos: "v",
      example: "Two teams collaborate on the product.",
    },
    options: [
      { id: "opt1", text: "Tranh luận, đối đầu", isCorrect: false },
      { id: "opt2", text: "Chia rẽ, tách nhóm", isCorrect: false },
      { id: "opt3", text: "Hợp tác, cộng tác", isCorrect: true },
      { id: "opt4", text: "Bỏ cuộc, từ bỏ", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w4",
      word: "meticulous",
      meaning: "Tỉ mỉ, cẩn trọng, kỹ lưỡng",
      ipa: "/məˈtɪk.jə.ləs/",
      pos: "adj",
      example: "He is meticulous about his work.",
    },
    options: [
      { id: "opt1", text: "Tỉ mỉ, cẩn trọng", isCorrect: true },
      { id: "opt2", text: "Cẩu thả, sơ sài", isCorrect: false },
      { id: "opt3", text: "Hấp tấp, vội vã", isCorrect: false },
      { id: "opt4", text: "Thô lỗ, bất lịch sự", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w5",
      word: "versatile",
      meaning: "Linh hoạt, đa năng, nhiều công dụng",
      ipa: "/ˈvɝː.sə.t̬əl/",
      pos: "adj",
      example: "A versatile tool for developers.",
    },
    options: [
      { id: "opt1", text: "Cứng nhắc, đơn điệu", isCorrect: false },
      { id: "opt2", text: "Độc quyền, duy nhất", isCorrect: false },
      { id: "opt3", text: "Linh hoạt, đa năng", isCorrect: true },
      { id: "opt4", text: "Nguy hiểm, độc hại", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w6",
      word: "persevere",
      meaning: "Kiên trì, bền chí không nản lòng",
      ipa: "/ˌpɜː.səˈvɪər/",
      pos: "v",
      example: "She persevered despite facing numerous setbacks.",
    },
    options: [
      { id: "opt1", text: "Bỏ cuộc giữa chừng", isCorrect: false },
      { id: "opt2", text: "Kiên trì, bền chí", isCorrect: true },
      { id: "opt3", text: "Do dự, chần chừ", isCorrect: false },
      { id: "opt4", text: "Phàn nàn, kêu ca", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w7",
      word: "pragmatic",
      meaning: "Thực tế, thực dụng, trọng tính hiệu quả",
      ipa: "/præɡˈmæt.ɪk/",
      pos: "adj",
      example: "We need a pragmatic approach to solve this challenge.",
    },
    options: [
      { id: "opt1", text: "Mơ mộng, viển vông", isCorrect: false },
      { id: "opt2", text: "Lý thuyết suông", isCorrect: false },
      { id: "opt3", text: "Thực tế, trọng hiệu quả", isCorrect: true },
      { id: "opt4", text: "Cảm tính, bộc phát", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w8",
      word: "eloquent",
      meaning: "Hùng biện, lưu loát, truyền cảm",
      ipa: "/ˈel.ə.kwənt/",
      pos: "adj",
      example: "The speaker delivered an eloquent speech.",
    },
    options: [
      { id: "opt1", text: "Hùng biện, lưu loát", isCorrect: true },
      { id: "opt2", text: "Ấp úng, ngập ngừng", isCorrect: false },
      { id: "opt3", text: "Im lặng, trầm mặc", isCorrect: false },
      { id: "opt4", text: "Thô lỗ, gay gắt", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w9",
      word: "diligent",
      meaning: "Chăm chỉ, cần cù, siêng năng",
      ipa: "/ˈdɪl.ɪ.dʒənt/",
      pos: "adj",
      example: "He was diligent in completing his daily assignments.",
    },
    options: [
      { id: "opt1", text: "Lười biếng, trốn tránh", isCorrect: false },
      { id: "opt2", text: "Chăm chỉ, siêng năng", isCorrect: true },
      { id: "opt3", text: "Vội vã, hấp tấp", isCorrect: false },
      { id: "opt4", text: "Bất cẩn, lơ là", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w10",
      word: "advocate",
      meaning: "Ủng hộ, tán thành, chủ trương",
      ipa: "/ˈæd.və.keɪt/",
      pos: "v",
      example: "They advocate for equal educational opportunities.",
    },
    options: [
      { id: "opt1", text: "Chống đối, phản kháng", isCorrect: false },
      { id: "opt2", text: "Lờ đi, phớt lờ", isCorrect: false },
      { id: "opt3", text: "Ủng hộ, tán thành", isCorrect: true },
      { id: "opt4", text: "Nghi ngờ, ngờ vực", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w11",
      word: "tenacious",
      meaning: "Bền bỉ, ngoan cường, kiên quyết giữ vững",
      ipa: "/təˈneɪ.ʃəs/",
      pos: "adj",
      example: "Her tenacious effort led the team to triumph.",
    },
    options: [
      { id: "opt1", text: "Bền bỉ, ngoan cường", isCorrect: true },
      { id: "opt2", text: "Dao động, dễ nản", isCorrect: false },
      { id: "opt3", text: "Hời hợt, qua loa", isCorrect: false },
      { id: "opt4", text: "Yếu ớt, nhu nhược", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w12",
      word: "lucid",
      meaning: "Rõ ràng, minh bạch, dễ hiểu",
      ipa: "/ˈluː.sɪd/",
      pos: "adj",
      example: "He gave a lucid explanation of the system architecture.",
    },
    options: [
      { id: "opt1", text: "Mơ hồ, mập mờ", isCorrect: false },
      { id: "opt2", text: "Rắc rối, phức tạp", isCorrect: false },
      { id: "opt3", text: "Rõ ràng, minh bạch", isCorrect: true },
      { id: "opt4", text: "Lúng túng, bối rối", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w13",
      word: "ambiguity",
      meaning: "Sự mơ hồ, nước đôi, không rõ ràng",
      ipa: "/ˌæm.bɪˈɡjuː.ə.ti/",
      pos: "n",
      example: "There is some ambiguity in the legal contract.",
    },
    options: [
      { id: "opt1", text: "Sự minh bạch, dứt khoát", isCorrect: false },
      { id: "opt2", text: "Sự mơ hồ, không rõ ràng", isCorrect: true },
      { id: "opt3", text: "Sự công bằng, chính trực", isCorrect: false },
      { id: "opt4", text: "Sự đồng thuận cao", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w14",
      word: "pinnacle",
      meaning: "Đỉnh cao, đỉnh chóp, thời điểm hoàng kim",
      ipa: "/ˈpɪn.ə.kəl/",
      pos: "n",
      example: "Winning the championship was the pinnacle of his career.",
    },
    options: [
      { id: "opt1", text: "Đáy vực sâu thẳm", isCorrect: false },
      { id: "opt2", text: "Khởi đầu gian nan", isCorrect: false },
      { id: "opt3", text: "Đỉnh cao, tột đỉnh", isCorrect: true },
      { id: "opt4", text: "Sự sụp đổ hoàn toàn", isCorrect: false },
    ],
  },
  {
    question: {
      id: "w15",
      word: "adaptable",
      meaning: "Có khả năng thích nghi cao",
      ipa: "/əˈdæp.tə.bəl/",
      pos: "adj",
      example: "Successful students are adaptable to change.",
    },
    options: [
      { id: "opt1", text: "Cố chấp, bảo thủ", isCorrect: false },
      { id: "opt2", text: "Khả năng thích nghi cao", isCorrect: true },
      { id: "opt3", text: "Lạc hậu, chậm tiến", isCorrect: false },
      { id: "opt4", text: "Bất khả thi, vô vọng", isCorrect: false },
    ],
  },
];
