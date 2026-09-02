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
];
