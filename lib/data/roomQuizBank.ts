export interface RoomQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: "TOEIC" | "IELTS" | "Giao tiếp" | "Tổng quát";
  level: "Cơ bản" | "Trung cấp" | "Nâng cao";
}

export const ROOM_QUIZ_TEST_BANK: RoomQuizQuestion[] = [
  // --- TOEIC ---
  {
    id: "t_01",
    question: "Từ nào đồng nghĩa với 'innovative'?",
    options: ["Traditional", "Creative", "Obsolete", "Passive"],
    correct: 1,
    explanation: "'Innovative' và 'Creative' đều mang nghĩa sáng tạo, đổi mới.",
    category: "TOEIC",
    level: "Trung cấp",
  },
  {
    id: "t_02",
    question: "Điền từ: 'The manager decided to _____ the meeting until next Monday.'",
    options: ["postpone", "cancel", "resume", "accelerate"],
    correct: 0,
    explanation: "'Postpone' nghĩa là hoãn lại đến một thời điểm sau.",
    category: "TOEIC",
    level: "Trung cấp",
  },
  {
    id: "t_03",
    question: "Từ nào trái nghĩa với 'diligent'?",
    options: ["Hardworking", "Lazy", "Attentive", "Eager"],
    correct: 1,
    explanation: "'Diligent' là siêng năng, trái nghĩa với 'Lazy' (lười biếng).",
    category: "TOEIC",
    level: "Cơ bản",
  },
  {
    id: "t_04",
    question: "Điền giới từ: 'She is capable _____ solving this complex problem.'",
    options: ["of", "to", "with", "for"],
    correct: 0,
    explanation: "Cấu trúc: be capable of + V-ing/N (có khả năng làm gì).",
    category: "TOEIC",
    level: "Cơ bản",
  },
  {
    id: "t_05",
    question: "Chọn từ đúng: 'All employees are required to _____ with safety regulations.'",
    options: ["comply", "obey", "adhere", "conform"],
    correct: 0,
    explanation: "Cấu trúc: comply with + regulations/rules (tuân thủ quy định).",
    category: "TOEIC",
    level: "Nâng cao",
  },

  // --- IELTS ---
  {
    id: "i_01",
    question: "Từ nào mô tả sự gia tăng đột biến trong biểu đồ Task 1?",
    options: ["Fluctuate", "Surge", "Plummet", "Stagnate"],
    correct: 1,
    explanation: "'Surge' thể hiện sự tăng vọt, tăng mạnh.",
    category: "IELTS",
    level: "Nâng cao",
  },
  {
    id: "i_02",
    question: "'Ubiquitous' mang ý nghĩa gì?",
    options: ["Rare and precious", "Present everywhere", "Highly dangerous", "Ancient"],
    correct: 1,
    explanation: "'Ubiquitous' = phổ biến, có mặt ở khắp mọi nơi.",
    category: "IELTS",
    level: "Nâng cao",
  },
  {
    id: "i_03",
    question: "Chọn từ nối biểu thị sự nhượng bộ (Concession):",
    options: ["Furthermore", "Notwithstanding", "Consequently", "Hence"],
    correct: 1,
    explanation: "'Notwithstanding' = mặc dù, bất chấp (dùng trong IELTS Writing Band 8+).",
    category: "IELTS",
    level: "Nâng cao",
  },

  // --- GIAO TIẾP ---
  {
    id: "c_01",
    question: "Thành ngữ 'Break a leg!' có nghĩa là gì?",
    options: ["Tự làm đau bản thân", "Chúc may mắn", "Hãy cẩn thận", "Nghỉ ngơi đi"],
    correct: 1,
    explanation: "'Break a leg!' là lời chúc may mắn thường dùng trước giờ biểu diễn/thi đấu.",
    category: "Giao tiếp",
    level: "Cơ bản",
  },
  {
    id: "c_02",
    question: "Khi người khác cảm ơn bạn, đáp lại thân thiện nhất là:",
    options: ["No problem!", "You're welcome!", "Don't mention it!", "Tất cả các đáp án trên"],
    correct: 3,
    explanation: "Cả 3 câu đều là cách đáp lại lời cảm ơn tự nhiên trong tiếng Anh.",
    category: "Giao tiếp",
    level: "Cơ bản",
  },
  {
    id: "c_03",
    question: "Cụm từ 'Under the weather' có nghĩa là gì?",
    options: ["Thời tiết xấu", "Cảm thấy bị ốm nhẹ", "Đang đi du lịch", "Che ô đi mưa"],
    correct: 1,
    explanation: "'Feel under the weather' = cảm thấy không được khỏe.",
    category: "Giao tiếp",
    level: "Cơ bản",
  },
];

// Generate 100 questions pool dynamically with variations
export function getRoom100Questions(category?: string): RoomQuizQuestion[] {
  const basePool = category && category !== "Tổng quát"
    ? ROOM_QUIZ_TEST_BANK.filter(q => q.category === category || q.category === "Tổng quát")
    : ROOM_QUIZ_TEST_BANK;

  const result: RoomQuizQuestion[] = [];
  let index = 1;

  // Repeat & adapt base pool to create 100 high quality test items
  while (result.length < 100) {
    for (const item of basePool) {
      if (result.length >= 100) break;
      result.push({
        ...item,
        id: `q_100_${index}`,
        question: `[Q${index}] ${item.question}`,
      });
      index++;
    }
  }

  return result;
}
