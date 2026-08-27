import { ExamPaper, ExamQuestion } from "./types";

export const toeicSw202603Paper: ExamPaper = {
  id: "toeic_sw_2026_03",
  title: "TOEIC Speaking & Writing AI Studio #03 (19 Questions)",
  type: "TOEIC_SPEAKING_WRITING",
  level: "Advanced",
  timeLimitMinutes: 80,
  totalQuestions: 19,
  maxScore: 400,
  description: "Trọn bộ 19 câu hỏi kết hợp 2 Kỹ năng Nói & Viết AI (Speaking & Writing Duo): 11 câu Speaking AI và 8 câu Writing AI chuẩn ETS TOEIC 2026 về Trung tâm dữ liệu AI, Lễ khánh tiết và Đạo đức Trí tuệ Nhân tạo doanh nghiệp.",
  categoryBadge: "TOEIC Speaking & Writing",
  tags: ["TOEIC", "Speaking & Writing", "AI Studio", "19 Questions", "Dual Skills"],
  supportedSkills: ["SPEAKING", "WRITING"],
  questions: [
    // SPEAKING (Questions 1 - 11)
    {
      id: "tsw3_q1",
      partNumber: 1,
      partTitle: "TOEIC Speaking Part 1: Read a Text Aloud",
      section: "SPEAKING",
      speakingPrompt: "Read the text aloud:\n\n'Welcome to the annual Global Technology Exposition in Frankfurt. Please visit Booth 104 in Hall B to experience live demonstrations of our automated enterprise cloud architecture.'",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 1: Read the exposition announcement aloud.",
      options: [
            { key: "A", text: "Record Speech" },
            { key: "B", text: "Pronunciation Guide" },
            { key: "C", text: "Model Audio" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "A",
      explanation: "Phát âm chuẩn xác và nhấn giọng đúng trọng âm từ khóa hội nghị."
    },
    {
      id: "tsw3_q2",
      partNumber: 1,
      partTitle: "TOEIC Speaking Part 1: Read a Text Aloud",
      section: "SPEAKING",
      speakingPrompt: "Read the text aloud:\n\n'Apex Logistics is committed to delivering sustainable supply chain solutions. Our new electric truck fleet reduces carbon emissions by forty percent across metropolitan delivery corridors.'",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 2: Read the corporate sustainability announcement aloud.",
      options: [
            { key: "A", text: "Intonation Guide" },
            { key: "B", text: "Record Speech" },
            { key: "C", text: "Model Audio" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "B",
      explanation: "Đọc to rõ ràng, ngắt nghỉ đúng dấu câu và phát âm chuẩn các con số."
    },
    {
      id: "tsw3_q3",
      partNumber: 2,
      partTitle: "TOEIC Speaking Part 2: Describe a Picture",
      section: "SPEAKING",
      imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      speakingPrompt: "Describe the picture on your screen in 30 seconds.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 30,
      questionText: "Question 3: Describe the automated robotics cleanroom photograph.",
      options: [
            { key: "A", text: "Lexical Bank" },
            { key: "B", text: "Model Audio" },
            { key: "C", text: "Record Description" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "C",
      explanation: "Mô tả bức tranh cánh tay robot công nghiệp đang lắp ráp vi mạch trong phòng sạch."
    },
    {
      id: "tsw3_q4",
      partNumber: 2,
      partTitle: "TOEIC Speaking Part 2: Describe a Picture",
      section: "SPEAKING",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
      speakingPrompt: "Describe the picture on your screen in 30 seconds.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 30,
      questionText: "Question 4: Describe the corporate presentation meeting photograph.",
      options: [
            { key: "A", text: "Lexical Bank" },
            { key: "B", text: "Model Audio" },
            { key: "C", text: "Next" },
            { key: "D", text: "Record Description" }
          ],
      correctAnswer: "D",
      explanation: "Mô tả buổi họp hội đồng quản trị với chuyên viên thuyết trình dữ liệu tài chính."
    },
    {
      id: "tsw3_q5",
      partNumber: 3,
      partTitle: "TOEIC Speaking Part 3: Respond to Questions",
      section: "SPEAKING",
      speakingPrompt: "How often do you participate in video conference calls for work?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 5: Answer the question regarding video conferencing frequency.",
      options: [
            { key: "A", text: "Record 15s" },
            { key: "B", text: "Template" },
            { key: "C", text: "Model Audio" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "A",
      explanation: "Trả lời trực tiếp: 'I participate in video conferences almost daily to collaborate with remote team members.'"
    },
    {
      id: "tsw3_q6",
      partNumber: 3,
      partTitle: "TOEIC Speaking Part 3: Respond to Questions",
      section: "SPEAKING",
      speakingPrompt: "What equipment is most important for a successful virtual meeting?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 6: Answer the question regarding essential virtual meeting tools.",
      options: [
            { key: "A", text: "Template" },
            { key: "B", text: "Record 15s" },
            { key: "C", text: "Model Audio" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "B",
      explanation: "Trả lời: 'A noise-canceling headset and high-speed fiber internet are the most critical tools.'"
    },
    {
      id: "tsw3_q7",
      partNumber: 3,
      partTitle: "TOEIC Speaking Part 3: Respond to Questions",
      section: "SPEAKING",
      speakingPrompt: "Do you prefer working fully remotely or in a hybrid schedule? Why?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 30,
      questionText: "Question 7: Answer the 30-second comparative question on remote vs hybrid work.",
      options: [
            { key: "A", text: "Template" },
            { key: "B", text: "Model Audio" },
            { key: "C", text: "Record 30s" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "C",
      explanation: "So sánh ưu điểm của mô hình làm việc kết hợp Hybrid kết hợp tập trung tại nhà và gặp gỡ đồng nghiệp trực tiếp."
    },
    {
      id: "tsw3_q8",
      partNumber: 4,
      partTitle: "TOEIC Speaking Part 4: Schedule Query",
      section: "SPEAKING",
      passageText: `AI ENTERPRISE SUMMIT SCHEDULE\n• 9:00 AM: Opening Keynote on Generative AI by Dr. Vance\n• 11:00 AM: Workshop A on Cloud Security (Free)\n• 2:00 PM: Panel Discussion on Ethical AI`,
      speakingPrompt: "Could you tell me what time the opening keynote starts and who is speaking?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 8: Answer the schedule query regarding the opening keynote.",
      options: [
            { key: "A", text: "Schedule Details" },
            { key: "B", text: "Model Audio" },
            { key: "C", text: "Next" },
            { key: "D", text: "Record 15s" }
          ],
      correctAnswer: "D",
      explanation: "Trả lời: 'The opening keynote begins at 9:00 AM and will be delivered by Dr. Vance on Generative AI.'"
    },
    {
      id: "tsw3_q9",
      partNumber: 4,
      partTitle: "TOEIC Speaking Part 4: Schedule Query",
      section: "SPEAKING",
      passageText: `AI ENTERPRISE SUMMIT SCHEDULE\n• 9:00 AM: Opening Keynote on Generative AI by Dr. Vance\n• 11:00 AM: Workshop A on Cloud Security (Free)\n• 2:00 PM: Panel Discussion on Ethical AI`,
      speakingPrompt: "I heard Workshop A on Cloud Security costs 100 dollars. Is that correct?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 9: Correct the fee misconception regarding Workshop A.",
      options: [
            { key: "A", text: "Record 15s" },
            { key: "B", text: "Correction Guide" },
            { key: "C", text: "Model Audio" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "A",
      explanation: "Trả lời: 'Actually, no, Workshop A on Cloud Security at 11:00 AM is completely free for all registered attendees.'"
    },
    {
      id: "tsw3_q10",
      partNumber: 4,
      partTitle: "TOEIC Speaking Part 4: Schedule Query",
      section: "SPEAKING",
      passageText: `AI ENTERPRISE SUMMIT SCHEDULE\n• 9:00 AM: Opening Keynote on Generative AI by Dr. Vance\n• 11:00 AM: Workshop A on Cloud Security (Free)\n• 2:00 PM: Panel Discussion on Ethical AI`,
      speakingPrompt: "Could you give me the complete schedule of all sessions for the summit?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 30,
      questionText: "Question 10: Detail all sessions listed in the summit schedule.",
      options: [
            { key: "A", text: "Full Schedule" },
            { key: "B", text: "Record 30s" },
            { key: "C", text: "Model Audio" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "B",
      explanation: "Liệt kê đầy đủ 3 phiên: Keynote lúc 9:00 AM, Workshop A lúc 11:00 AM và Panel Discussion lúc 2:00 PM."
    },
    {
      id: "tsw3_q11",
      partNumber: 5,
      partTitle: "TOEIC Speaking Part 5: Express an Opinion",
      section: "SPEAKING",
      speakingPrompt: "Do you agree or disagree that companies should establish strict ethical guidelines before deploying AI tools in the workplace? Support your opinion with reasons.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 60,
      questionText: "Question 11: Express your opinion on corporate AI ethical guidelines (60s).",
      options: [
            { key: "A", text: "Framework" },
            { key: "B", text: "Model Audio" },
            { key: "C", text: "Record 60s" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "C",
      explanation: "Khẳng định đồng ý và phân tích lý do bảo vệ quyền riêng tư dữ liệu, ngăn ngừa thiên kiến thuật toán và bảo vệ quyền lợi người lao động."
    },

    // WRITING (Questions 12 - 19)
    {
      id: "tsw3_q12",
      partNumber: 6,
      partTitle: "TOEIC Writing Part 1: Write a Sentence",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      writingPrompt: "Write ONE sentence using 'forklift / load'.",
      minWordCount: 8,
      sampleEssay: "The electric forklift is loading pallets of merchandise into the shipping container.",
      questionText: "Question 12: Write a sentence based on the picture using 'forklift' and 'load'.",
      options: [
            { key: "A", text: "Grammar Check" },
            { key: "B", text: "Collocations" },
            { key: "C", text: "Next" },
            { key: "D", text: "Submit Sentence" }
          ],
      correctAnswer: "D",
      explanation: "Dùng cấu trúc thì hiện tại tiếp diễn: 'The electric forklift is loading...'"
    },
    {
      id: "tsw3_q13",
      partNumber: 6,
      partTitle: "TOEIC Writing Part 1: Write a Sentence",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
      writingPrompt: "Write ONE sentence using 'technician / cleanroom'.",
      minWordCount: 8,
      sampleEssay: "A certified technician in protective gear is inspecting silicon wafers inside the cleanroom.",
      questionText: "Question 13: Write a sentence based on the picture using 'technician' and 'cleanroom'.",
      options: [
            { key: "A", text: "Submit Sentence" },
            { key: "B", text: "Grammar Check" },
            { key: "C", text: "Collocations" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "A",
      explanation: "Dùng đúng 2 từ khóa trong câu hoàn chỉnh."
    },
    {
      id: "tsw3_q14",
      partNumber: 6,
      partTitle: "TOEIC Writing Part 1: Write a Sentence",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      writingPrompt: "Write ONE sentence using 'director / explain'.",
      minWordCount: 8,
      sampleEssay: "The financial director is explaining the quarterly budget forecast to the executive board.",
      questionText: "Question 14: Write a sentence based on the picture using 'director' and 'explain'.",
      options: [
            { key: "A", text: "Grammar Check" },
            { key: "B", text: "Submit Sentence" },
            { key: "C", text: "Collocations" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "B",
      explanation: "Dùng 'explain something to someone' chính xác."
    },
    {
      id: "tsw3_q15",
      partNumber: 6,
      partTitle: "TOEIC Writing Part 1: Write a Sentence",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=80",
      writingPrompt: "Write ONE sentence using 'engineer / survey'.",
      minWordCount: 8,
      sampleEssay: "Civil engineers are surveying the offshore wind turbine platform to assess structural integrity.",
      questionText: "Question 15: Write a sentence based on the picture using 'engineer' and 'survey'.",
      options: [
            { key: "A", text: "Grammar Check" },
            { key: "B", text: "Collocations" },
            { key: "C", text: "Submit Sentence" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "C",
      explanation: "Dùng 'are surveying' kết hợp chỉ mục đích 'to assess'."
    },
    {
      id: "tsw3_q16",
      partNumber: 6,
      partTitle: "TOEIC Writing Part 1: Write a Sentence",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
      writingPrompt: "Write ONE sentence using 'guest / check in'.",
      minWordCount: 8,
      sampleEssay: "The business guest is checking in at the hotel reception desk using a digital reservation code.",
      questionText: "Question 16: Write a sentence based on the picture using 'guest' and 'check in'.",
      options: [
            { key: "A", text: "Grammar Check" },
            { key: "B", text: "Collocations" },
            { key: "C", text: "Next" },
            { key: "D", text: "Submit Sentence" }
          ],
      correctAnswer: "D",
      explanation: "Dùng cụm động từ 'is checking in'."
    },
    {
      id: "tsw3_q17",
      partNumber: 7,
      partTitle: "TOEIC Writing Part 2: Respond to Email",
      section: "WRITING",
      passageText: `FROM: David Chen (CTO, Quantum Cloud)\nTO: Support (Apex Servers)\nSUBJECT: Server Latency Issue\n\nWe noticed high server latency during our morning trading peak. Can you identify the cause and schedule emergency maintenance?`,
      writingPrompt: "Respond to the email apologizing, giving two technical solutions, and asking one question regarding their backup window.",
      minWordCount: 80,
      sampleEssay: `Dear Mr. Chen,\n\nI apologize for the server latency during your trading hours. We have upgraded the network bandwidth and scheduled senior engineers to optimize the database routing tonight at 11:00 PM. Could you please confirm if this maintenance window is acceptable for your operations?\n\nSincerely,\nSupport Team`,
      questionText: "Question 17: Respond to the CTO's server latency email.",
      options: [
            { key: "A", text: "Submit Email" },
            { key: "B", text: "Template" },
            { key: "C", text: "Sample" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "A",
      explanation: "Đáp ứng đầy đủ 3 yêu cầu đề bài."
    },
    {
      id: "tsw3_q18",
      partNumber: 7,
      partTitle: "TOEIC Writing Part 2: Respond to Email",
      section: "WRITING",
      passageText: `FROM: Sarah Miller (Procurement)\nTO: Sales (Apex Cloud)\nSUBJECT: Quote Request\n\nCould you send us a revised price quote for 100 enterprise licenses with volume discount terms?`,
      writingPrompt: "Respond offering a 15% discount, explaining the SLA terms, and proposing a call next Tuesday.",
      minWordCount: 80,
      sampleEssay: `Dear Ms. Miller,\n\nThank you for reaching out. We are pleased to offer a 15% volume discount on 100 enterprise licenses, which includes 24/7 dedicated engineering support. Would you be available for a brief call next Tuesday at 10:00 AM to review the agreement?\n\nBest regards,\nSales Team`,
      questionText: "Question 18: Respond to the license pricing quote email.",
      options: [
            { key: "A", text: "Template" },
            { key: "B", text: "Submit Email" },
            { key: "C", text: "Sample" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "B",
      explanation: "Email thương mại chuyên nghiệp chuẩn ETS."
    },
    {
      id: "tsw3_q19",
      partNumber: 8,
      partTitle: "TOEIC Writing Part 3: Opinion Essay",
      section: "WRITING",
      writingPrompt: "Do you agree or disagree that companies should foster an open corporate culture where failure is treated as a learning opportunity? Support your opinion with reasons and examples. (Write at least 300 words).",
      minWordCount: 300,
      sampleEssay: `In today's dynamic business environment, fostering a corporate culture that embraces psychological safety and treats failure as a valuable learning mechanism is paramount for sustained organizational success. I wholeheartedly agree that progressive companies must cultivate an environment where constructive experimentation is celebrated rather than penalized.\n\nFirst and foremost, treating failure as a learning opportunity accelerates innovation. When employees fear harsh retribution for unsuccessful projects, they invariably default to conservative, risk-averse methodologies. In contrast, industry titans like Google and 3M actively encourage experimental risk-taking, knowing that breakthrough discoveries—such as revolutionary software architectures or post-it notes—frequently emerge from iterative failures. By normalizing post-mortem reviews focused on root-cause analysis rather than finger-pointing, organizations extract indispensable operational insights that fuel future breakthroughs.\n\nSecondly, a culture of psychological safety significantly enhances talent retention and employee engagement. In high-pressure corporate settings, chronic fear of mistakes induces severe burnout and stifles creative autonomy. Conversely, when leadership openly normalizes developmental setbacks, it fosters profound mutual trust and loyalty, empowering cross-functional teams to collaborate with heightened transparency and resilience.\n\nIn conclusion, embracing failure as a stepping stone toward mastery is the cornerstone of corporate adaptability. Companies that champion this philosophy foster agile, highly innovative teams capable of navigating market disruptions and achieving enduring prosperity.`,
      questionText: "Question 19: Write a 300+ word essay on failure as a corporate learning opportunity.",
      options: [
            { key: "A", text: "Structure Guide" },
            { key: "B", text: "Collocations" },
            { key: "C", text: "Submit Essay for AI Evaluation" },
            { key: "D", text: "Finish" }
          ],
      correctAnswer: "C",
      explanation: "Bài luận 300+ từ phân tích sâu sắc về psychological safety và văn hóa đổi mới sáng tạo."
    }
  ]
};
