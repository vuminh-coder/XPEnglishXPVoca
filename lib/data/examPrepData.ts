export interface ExamQuestion {
  id: string;
  partNumber: number; // Part 1 to 7 for TOEIC, Part 1 to 4 for IELTS
  partTitle: string;
  section: "LISTENING" | "READING";
  audioUrl?: string;
  passageText?: string;
  imageUrl?: string;
  questionText: string;
  options: {
    key: "A" | "B" | "C" | "D";
    text: string;
  }[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string; // Bilingual explanation
}

export interface ExamPaper {
  id: string;
  title: string;
  type: "TOEIC_FULL" | "TOEIC_MINI" | "IELTS_LISTENING" | "IELTS_READING";
  level: "Beginner" | "Intermediate" | "Advanced";
  timeLimitMinutes: number;
  totalQuestions: number;
  maxScore: number; // 990 for TOEIC, 9.0 for IELTS
  description: string;
  categoryBadge: string;
  tags: string[];
  questions: ExamQuestion[];
}

export const MOCK_EXAM_PAPERS: ExamPaper[] = [
  // 1. TOEIC FULL MOCK TEST 1 (200 Questions / 120 mins / 990 Max Score)
  {
    id: "toeic_full_001",
    title: "ETS TOEIC 2026 Full Simulation Test #1",
    type: "TOEIC_FULL",
    level: "Intermediate",
    timeLimitMinutes: 120,
    totalQuestions: 200,
    maxScore: 990,
    description: "Đề thi thử TOEIC chuẩn 200 câu (100 câu Luyện nghe Part 1-4 + 100 câu Đọc hiểu Part 5-7). Áp lực thời gian thực 120 phút.",
    categoryBadge: "TOEIC 990",
    tags: ["TOEIC", "Full Test", "ETS 2026", "Listening", "Reading"],
    questions: Array.from({ length: 200 }).map((_, idx) => {
      const qNum = idx + 1;
      let partNumber = 1;
      let partTitle = "Part 1: Photographs";
      let section: "LISTENING" | "READING" = "LISTENING";

      if (qNum <= 6) {
        partNumber = 1;
        partTitle = "Part 1: Photographs";
      } else if (qNum <= 31) {
        partNumber = 2;
        partTitle = "Part 2: Question-Response";
      } else if (qNum <= 70) {
        partNumber = 3;
        partTitle = "Part 3: Conversations";
      } else if (qNum <= 100) {
        partNumber = 4;
        partTitle = "Part 4: Short Talks";
      } else if (qNum <= 130) {
        partNumber = 5;
        partTitle = "Part 5: Incomplete Sentences";
        section = "READING";
      } else if (qNum <= 146) {
        partNumber = 6;
        partTitle = "Part 6: Text Completion";
        section = "READING";
      } else {
        partNumber = 7;
        partTitle = "Part 7: Reading Comprehension";
        section = "READING";
      }

      // Sample representative questions
      if (qNum === 1) {
        return {
          id: "t1_q1",
          partNumber: 1,
          partTitle: "Part 1: Photographs",
          section: "LISTENING",
          imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          questionText: "Look at the picture marked No. 1 in your test book.",
          options: [
            { key: "A", text: "They are typing on computer keyboards." },
            { key: "B", text: "They are reviewing documents around a conference table." },
            { key: "C", text: "They are adjusting the projector equipment." },
            { key: "D", text: "They are hanging artwork on the office wall." }
          ],
          correctAnswer: "B",
          explanation: "Đáp án B chính xác vì bức ảnh mô tả nhóm đồng nghiệp đang cùng rà soát tài liệu trên bàn họp office (`reviewing documents around a conference table`)."
        };
      }

      if (qNum === 101) {
        return {
          id: "t1_q101",
          partNumber: 5,
          partTitle: "Part 5: Incomplete Sentences",
          section: "READING",
          questionText: "Mr. Henderson will review the annual budget proposal _______ submitting it to the board of directors.",
          options: [
            { key: "A", text: "prior to" },
            { key: "B", text: "instead" },
            { key: "C", text: "ahead" },
            { key: "D", text: "because" }
          ],
          correctAnswer: "A",
          explanation: "Cụm giới từ 'prior to' + V-ing/N mang nghĩa 'trước khi' (`prior to submitting...`). Các phương án khác sai ngữ pháp: 'instead' phải đi với 'of', 'ahead' đi với 'of'."
        };
      }

      if (qNum === 147) {
        return {
          id: "t1_q147",
          partNumber: 7,
          partTitle: "Part 7: Reading Comprehension",
          section: "READING",
          passageText: "MEMORANDUM\nTo: All Department Heads\nFrom: Executive Logistics Office\nDate: August 14, 2026\nSubject: Third Floor Office Renovation & Relocation\n\nPlease be advised that major structural renovation work will commence on the third floor next Monday. All affected staff members must pack their personal belongings by Friday at 5:00 PM. Temporary workstations have been prepared on Floor 2.",
          questionText: "What is the main purpose of the memorandum?",
          options: [
            { key: "A", text: "To announce a corporate merger" },
            { key: "B", text: "To notify staff of upcoming office renovation and relocation" },
            { key: "C", text: "To request budget approval for new IT hardware" },
            { key: "D", text: "To schedule a quarterly staff appraisal meeting" }
          ],
          correctAnswer: "B",
          explanation: "Đoạn ghi nhớ ghi rõ: 'Subject: Third Floor Office Renovation & Relocation', thông báo cho toàn thể trưởng bộ phận về đợt tu sửa và di dời văn phòng sắp tới."
        };
      }

      // Default question generator for 200 questions
      const keys: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
      const correctKey = keys[(qNum + 1) % 4];

      return {
        id: `t1_q${qNum}`,
        partNumber,
        partTitle,
        section,
        questionText: `Question ${qNum}: Select the most appropriate response for ${partTitle.toLowerCase()}.`,
        options: [
          { key: "A", text: `Option A for Question ${qNum}: Standard corporate procedure.` },
          { key: "B", text: `Option B for Question ${qNum}: Immediate dispatch schedule.` },
          { key: "C", text: `Option C for Question ${qNum}: Certified compliance audit.` },
          { key: "D", text: `Option D for Question ${qNum}: Revised itinerary confirmation.` }
        ],
        correctAnswer: correctKey,
        explanation: `Đáp án ${correctKey} chính xác theo ngữ cảnh của câu ${qNum} thuộc ${partTitle}.`
      };
    })
  },

  // 2. TOEIC MINI PRACTICE TEST (50 Questions / 30 mins / 990 Max Score)
  {
    id: "toeic_mini_001",
    title: "TOEIC Speed Sprint Mini Test (50 Questions)",
    type: "TOEIC_MINI",
    level: "Intermediate",
    timeLimitMinutes: 30,
    totalQuestions: 50,
    maxScore: 990,
    description: "Đề thi thử rút gọn 50 câu (25 câu Nghe + 25 câu Đọc) thiết kế tăng tốc phản xạ trong 30 phút.",
    categoryBadge: "Speed Test",
    tags: ["TOEIC", "Mini Test", "30 Mins", "Fast Sprint"],
    questions: Array.from({ length: 50 }).map((_, idx) => {
      const qNum = idx + 1;
      const partNumber = qNum <= 25 ? (qNum <= 5 ? 1 : qNum <= 15 ? 2 : 3) : (qNum <= 38 ? 5 : 7);
      const partTitle = qNum <= 25 ? `Part ${partNumber}: Listening` : `Part ${partNumber}: Reading`;
      const section: "LISTENING" | "READING" = qNum <= 25 ? "LISTENING" : "READING";
      const keys: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
      const correctKey = keys[qNum % 4];

      return {
        id: `tmini_q${qNum}`,
        partNumber,
        partTitle,
        section,
        questionText: `Mini Test Question ${qNum}: Identify the correct structure for ${partTitle}.`,
        options: [
          { key: "A", text: `Option A: Confirm flight reservation.` },
          { key: "B", text: `Option B: Submit annual financial audit.` },
          { key: "C", text: `Option C: Schedule client negotiation.` },
          { key: "D", text: `Option D: Verify hotel check-in status.` }
        ],
        correctAnswer: correctKey,
        explanation: `Đáp án ${correctKey} chính xác cho câu ${qNum} trong Mini Test 50 câu.`
      };
    })
  },

  // 3. IELTS ACADEMIC READING TEST (40 Questions / 60 mins / 9.0 Band)
  {
    id: "ielts_reading_001",
    title: "IELTS Academic Reading Practice Test #1",
    type: "IELTS_READING",
    level: "Advanced",
    timeLimitMinutes: 60,
    totalQuestions: 40,
    maxScore: 9.0,
    description: "Đề thi thử IELTS Academic Reading 40 câu chọn lọc gồm 3 bài đọc dài (Passage 1-3: Khoa học, Xã hội, Công nghệ AI).",
    categoryBadge: "IELTS 9.0",
    tags: ["IELTS", "Reading", "Academic", "Band 7.5+"],
    questions: Array.from({ length: 40 }).map((_, idx) => {
      const qNum = idx + 1;
      const passageNum = qNum <= 13 ? 1 : qNum <= 27 ? 2 : 3;
      const keys: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
      const correctKey = keys[(qNum * 3) % 4];

      return {
        id: `ielts_r_q${qNum}`,
        partNumber: passageNum,
        partTitle: `Reading Passage ${passageNum}`,
        section: "READING",
        passageText: passageNum === 1
          ? "Passage 1: The Evolution of Renewable Energy Systems\nOver the past two decades, renewable energy technologies have experienced exponential growth, transitioning from niche innovations to fundamental components of global power grids..."
          : "Passage 2: Artificial Intelligence in Modern Healthcare\nRecent breakthroughs in deep learning algorithms have revolutionized medical diagnostics, enabling computer vision systems to detect anomalies in radiological scans with unprecedented accuracy...",
        questionText: `Question ${qNum}: According to Passage ${passageNum}, which statement accurately reflects the author's argument?`,
        options: [
          { key: "A", text: "Renewable infrastructure requires substantial initial capital investment." },
          { key: "B", text: "Deep learning models operate with complete autonomy in emergency wards." },
          { key: "C", text: "Diagnostic accuracy improves exponentially with larger training datasets." },
          { key: "D", text: "Global energy grids have fully phased out conventional fossil fuels." }
        ],
        correctAnswer: correctKey,
        explanation: `Đáp án ${correctKey} được xác nhận trong Passage ${passageNum} dựa trên thông tin bài đọc.`
      };
    })
  },

  // 4. IELTS ACADEMIC LISTENING TEST (40 Questions / 40 mins / 9.0 Band)
  {
    id: "ielts_listening_001",
    title: "IELTS Academic Listening Practice Test #1",
    type: "IELTS_LISTENING",
    level: "Advanced",
    timeLimitMinutes: 40,
    totalQuestions: 40,
    maxScore: 9.0,
    description: "Đề thi thử IELTS Listening 40 câu với 4 Section (Section 1: Giao tiếp hàng ngày, Section 2: Hướng dẫn du lịch, Section 3: Thảo luận nhóm đại học, Section 4: Bài giảng học thuật).",
    categoryBadge: "IELTS 9.0",
    tags: ["IELTS", "Listening", "Academic", "Band 8.0"],
    questions: Array.from({ length: 40 }).map((_, idx) => {
      const qNum = idx + 1;
      const sectionNum = qNum <= 10 ? 1 : qNum <= 20 ? 2 : qNum <= 30 ? 3 : 4;
      const keys: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
      const correctKey = keys[(qNum + 2) % 4];

      return {
        id: `ielts_l_q${qNum}`,
        partNumber: sectionNum,
        partTitle: `Section ${sectionNum}`,
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        questionText: `Listening Question ${qNum}: Listen to the audio recording for Section ${sectionNum} and choose the correct answer.`,
        options: [
          { key: "A", text: "The university library opens at 8:00 AM on weekdays." },
          { key: "B", text: "Students must register their research project by Friday." },
          { key: "C", text: "Lab equipment must be cleaned immediately after experiments." },
          { key: "D", text: "Fieldwork data should be submitted to the department head." }
        ],
        correctAnswer: correctKey,
        explanation: `Đáp án ${correctKey} được khẳng định bởi diễn giả trong băng ghi âm Section ${sectionNum}.`
      };
    })
  }
];
