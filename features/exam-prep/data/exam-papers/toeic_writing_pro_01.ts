import { ExamPaper, ExamQuestion } from "./types";

export const toeicWritingPro01Paper: ExamPaper = {
  id: "toeic_writing_pro_01",
  title: "TOEIC Writing AI Intensive #01",
  type: "TOEIC_SPEAKING_WRITING",
  level: "Advanced",
  timeLimitMinutes: 60,
  totalQuestions: 8,
  maxScore: 200,
  description: "Phòng luyện thi Viết chuyên sâu TOEIC Writing chuẩn ETS (8 câu hỏi): 5 câu viết theo tranh kèm từ khóa bắt buộc, 2 Email phản hồi khiếu nại khách hàng & đàm phán hợp đồng, và 1 Bài luận quan điểm doanh nghiệp 300+ từ về tài trợ học tập trọn đời.",
  categoryBadge: "TOEIC Writing",
  tags: ["TOEIC", "Writing Only", "ETS Standard", "AI Studio"],
  supportedSkills: ["WRITING"],
  questions: [
    // Questions 1-5: Write a Sentence Based on a Picture
    {
      id: "twp1_q1",
      partNumber: 1,
      partTitle: "TOEIC Writing Part 1: Write a Sentence (Cleanroom Wafer Inspection)",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the TWO given keywords: 'technician / examine'.",
      minWordCount: 8,
      sampleEssay: "The laboratory technician is carefully examining a silicon semiconductor wafer under the optical microscope.",
      questionText: "Question 1: Write a sentence based on the picture using 'technician' and 'examine'.",
      options: [
            { key: "A", text: "Submit Sentence for AI Grammar Evaluation" },
            { key: "B", text: "View Sentence Patterns" },
            { key: "C", text: "Check Vocabulary Collocations" },
            { key: "D", text: "Skip to Question 2" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [TIÊU CHÍ CHẤM ETS - PART 1]
- Dùng đúng 2 từ khóa: 'technician' (danh từ) và 'examine' (động từ).
- Đúng ngữ pháp thì hiện tại tiếp diễn: "The laboratory technician is carefully examining..."`
    },
    {
      id: "twp1_q2",
      partNumber: 1,
      partTitle: "TOEIC Writing Part 1: Write a Sentence (Automated Warehouse Aisle)",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the TWO given keywords: 'boxes / stack'.",
      minWordCount: 8,
      sampleEssay: "Cardboard shipping boxes are neatly stacked on wooden pallets along the warehouse storage aisle.",
      questionText: "Question 2: Write a sentence based on the picture using 'boxes' and 'stack'.",
      options: [
            { key: "A", text: "View Passive Voice Sentence Structure" },
            { key: "B", text: "Submit Sentence for AI Grammar Evaluation" },
            { key: "C", text: "Check Prepositions of Place" },
            { key: "D", text: "Skip to Question 3" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [TIÊU CHÍ CHẤM ETS - PART 1]
- Dùng dạng bị động: "Cardboard shipping boxes are neatly stacked on wooden pallets..."`
    },
    {
      id: "twp1_q3",
      partNumber: 1,
      partTitle: "TOEIC Writing Part 1: Write a Sentence (Corporate Boardroom Discussion)",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the TWO given keywords: 'present / while'.",
      minWordCount: 10,
      sampleEssay: "The financial director is presenting quarterly forecast data on the digital screen while attendees take notes.",
      questionText: "Question 3: Write a sentence based on the picture using 'present' and 'while'.",
      options: [
            { key: "A", text: "View Complex Sentence Connectors" },
            { key: "B", text: "Check Subject-Verb Agreement" },
            { key: "C", text: "Submit Sentence for AI Grammar Evaluation" },
            { key: "D", text: "Skip to Question 4" }
          ],
      correctAnswer: "C",
      explanation: `🎯 [TIÊU CHÍ CHẤM ETS - PART 1]
- Sử dụng liên từ 'while' kết nối 2 mệnh đề song hành.`
    },
    {
      id: "twp1_q4",
      partNumber: 1,
      partTitle: "TOEIC Writing Part 1: Write a Sentence (Railway Inspection)",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the TWO given keywords: 'engineer / inspect'.",
      minWordCount: 8,
      sampleEssay: "A maintenance engineer is inspecting the electrical tracks to ensure high-speed train safety.",
      questionText: "Question 4: Write a sentence based on the picture using 'engineer' and 'inspect'.",
      options: [
            { key: "A", text: "View Action Verbs" },
            { key: "B", text: "Check Infinitive of Purpose" },
            { key: "C", text: "Skip to Question 5" },
            { key: "D", text: "Submit Sentence for AI Grammar Evaluation" }
          ],
      correctAnswer: "D",
      explanation: `🎯 [TIÊU CHÍ CHẤM ETS - PART 1]
- Dùng 'to ensure' chỉ mục đích hành động.`
    },
    {
      id: "twp1_q5",
      partNumber: 1,
      partTitle: "TOEIC Writing Part 1: Write a Sentence (Hotel Concierge Desk)",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the TWO given keywords: 'receptionist / provide'.",
      minWordCount: 8,
      sampleEssay: "The hotel receptionist is providing a contactless electronic key card to the arriving guest.",
      questionText: "Question 5: Write a sentence based on the picture using 'receptionist' and 'provide'.",
      options: [
            { key: "A", text: "Submit Sentence for AI Grammar Evaluation" },
            { key: "B", text: "View Customer Service Phrases" },
            { key: "C", text: "Check Direct & Indirect Objects" },
            { key: "D", text: "Skip to Part 2" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [TIÊU CHÍ CHẤM ETS - PART 1]
- Dùng cấu trúc 'provide something to someone'.`
    },

    // Questions 6-7: Respond to a Written Request (Email Responses)
    {
      id: "twp1_q6",
      partNumber: 2,
      partTitle: "TOEIC Writing Part 2: Respond to Email (Client Software Delivery Delay)",
      section: "WRITING",
      passageText: `FROM: Marcus Sterling (VP Operations, Zenith Global Logistics)\nTO: Support Desk (Apex Enterprise Cloud)\nDATE: November 12, 2026\nSUBJECT: Urgent: Unresolved Cloud ERP Integration Delay\n\nDear Apex Support Team,\n\nOur company was scheduled to complete the full cutover to the new Apex ERP cloud platform by November 10th. However, our IT staff are still experiencing database migration synchronization failures during data transfer. This delay is significantly disrupting our warehouse shipping operations.\n\nCould you please clarify:\n1. What is the immediate technical cause of this database synchronization error?\n2. When will certified senior engineers be dispatched to our facility to resolve the issue on-site?\n\nSincerely,\nMarcus Sterling`,
      writingPrompt:
        "Respond to the email from Mr. Sterling as the Lead Technical Account Manager at Apex Enterprise Cloud. In your email, apologize for the inconvenience, provide two specific explanations/solutions for the database issue, and ask one relevant question regarding their server access permissions. (Suggested time: 10 minutes).",
      minWordCount: 100,
      sampleEssay: `Dear Mr. Sterling,

Thank you for contacting Apex Enterprise Cloud. I sincerely apologize for the unexpected delay and the disruption this has caused to your warehouse shipping operations.

Our engineering team has investigated the issue and determined that the synchronization failure was caused by a legacy firewall blocking port 8443 during high-volume data packet transfer. To resolve this immediately, we have patched our cloud connector API and assigned two senior database architects to arrive at your facility tomorrow morning at 8:30 AM to oversee the on-site migration.

Could you please confirm whether our technical team will be granted full administrative access to your local database servers upon their arrival?

Thank you for your patience and understanding.

Best regards,

Elena Rostova
Lead Technical Account Manager
Apex Enterprise Cloud`,
      questionText: "Question 6: Respond to the client's email regarding software integration delay.",
      options: [
            { key: "A", text: "Review Professional Email Structure" },
            { key: "B", text: "Submit Email Response for Gemini AI Evaluation" },
            { key: "C", text: "Check Courtesy & Assurance Expressions" },
            { key: "D", text: "Skip to Question 7" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [TIÊU CHÍ CHẤM ETS - PART 2 EMAIL 1]
- Đáp ứng đủ 3 yêu cầu: (1) Xin lỗi chân thành; (2) Giải thích nguyên nhân kỹ thuật (firewall port) & giải pháp cử 2 kỹ sư sáng mai; (3) Đặt 1 câu hỏi về quyền truy cập admin server.`
    },
    {
      id: "twp1_q7",
      partNumber: 2,
      partTitle: "TOEIC Writing Part 2: Respond to Email (Negotiating Vendor Contract Terms)",
      section: "WRITING",
      passageText: `FROM: Brenda Vance (Director of Procurement, Global BioPharma)\nTO: Corporate Sales Division (Nova Cleanroom Technologies)\nDATE: November 14, 2026\nSUBJECT: RFP: Cleanroom Maintenance Contract Terms\n\nDear Nova Sales Team,\n\nWe have reviewed your proposal for our Basel laboratory cleanroom maintenance. While your technical qualifications are impressive, your annual service fee of €180,000 is slightly above our allocated budget. Furthermore, we require a guaranteed 2-hour emergency technician response time rather than your proposed 4-hour window.\n\nPlease let us know if you can accommodate these requirements and propose a date for a follow-up contract negotiation meeting.\n\nBest regards,\nBrenda Vance`,
      writingPrompt:
        "Respond to the email from Ms. Vance as the Commercial Sales Director at Nova Cleanroom Technologies. In your email, offer a revised pricing package with volume discount terms, address the emergency response time request, and propose two specific meeting times next week. (Suggested time: 10 minutes).",
      minWordCount: 100,
      sampleEssay: `Dear Ms. Vance,

Thank you for reviewing our cleanroom maintenance proposal and sharing your feedback. We are eager to partner with Global BioPharma and are pleased to accommodate your requirements.

We can adjust our annual service fee to €165,000 under a multi-year service agreement, which brings the cost comfortably within your budget. Furthermore, we are happy to upgrade your service tier to guarantee a 2-hour emergency technician response window by stationing a dedicated field engineer near your Basel facility.

I would welcome the opportunity to discuss the final terms with you. Would you be available for a follow-up meeting on either Tuesday, November 18th at 2:00 PM or Wednesday, November 19th at 10:00 AM?

Thank you, and I look forward to your reply.

Sincerely,

Julian Henderson
Commercial Sales Director
Nova Cleanroom Technologies`,
      questionText: "Question 7: Respond to the vendor contract terms negotiation email.",
      options: [
            { key: "A", text: "Review Negotiation Email Templates" },
            { key: "B", text: "Check Professional Tone Sign-offs" },
            { key: "C", text: "Submit Email Response for Gemini AI Evaluation" },
            { key: "D", text: "Skip to Question 8" }
          ],
      correctAnswer: "C",
      explanation: `🎯 [TIÊU CHÍ CHẤM ETS - PART 2 EMAIL 2]
- Đáp ứng đủ 3 yêu cầu: (1) Giảm giá xuống €165,000 cho hợp đồng dài hạn; (2) Cam kết SLA khẩn cấp 2 giờ; (3) Đề xuất 2 khung giờ họp cụ thể (thứ Ba 2:00 PM hoặc thứ Tư 10:00 AM).`
    },

    // Question 8: Write an Opinion Essay
    {
      id: "twp1_q8",
      partNumber: 3,
      partTitle: "TOEIC Writing Part 3: Opinion Essay (Corporate Lifelong Learning Subsidies)",
      section: "WRITING",
      writingPrompt:
        "Many forward-thinking corporations provide substantial annual education subsidies for employees to take professional development courses, university degrees, or technical certification programs outside of work hours. Do you agree or disagree that companies should fund continuous lifelong learning for their employees? Support your opinion with reasons and examples. (Write at least 300 words. Time suggested: 30 minutes).",
      minWordCount: 300,
      sampleEssay: `In today's hyper-competitive and rapidly evolving global marketplace, technological innovation and digital transformation render professional skillsets obsolete at an unprecedented pace. To maintain competitive advantage, an increasing number of vanguard enterprises provide comprehensive tuition reimbursement and educational subsidies for their workforce. I wholeheartedly agree that funding continuous employee lifelong learning is not merely a philanthropic perk, but a strategic corporate investment that drives innovation, enhances talent retention, and yields substantial financial returns.

First and foremost, subsidizing continuous professional education directly elevates an organization's intellectual capital and adaptability. When employees acquire advanced competencies in cutting-edge domains—such as artificial intelligence, cloud architecture, or data analytics—they immediately apply these methodologies to optimize internal workflows, automate routine operations, and pioneer innovative product lines. For instance, multinational technology corporations like Google and Amazon that allocate generous annual learning stipends consistently outperform competitors because their staff possess the technical agility to pivot rapidly in response to emerging market disruptions.

Secondly, corporate education funding serves as one of the most potent mechanisms for employee engagement and talent retention. High-performing professionals universally prioritize career advancement and intellectual growth. When an employer demonstrates tangible commitment to an individual's long-term professional development, it fosters profound organizational loyalty and mutual trust. Conversely, failing to invest in employee upskilling induces intellectual stagnation, prompting top talent to defect to progressive competitors. By subsidizing certifications, companies drastically reduce the exorbitant recruitment and onboarding costs associated with chronic staff turnover.

In conclusion, continuous education subsidies represent a high-yield, win-win proposition for modern enterprises. By empowering employees to master emerging skills, corporations cultivate a resilient, highly motivated workforce capable of steering the company toward sustained long-term prosperity in the digital era.`,
      questionText: "Question 8: Write a 300+ word opinion essay on whether companies should fund employee lifelong learning.",
      options: [
            { key: "A", text: "Review 4-Paragraph Business Essay Structure" },
            { key: "B", text: "Check High-Scoring Corporate Collocations" },
            { key: "C", text: "Complete Full TOEIC Writing Test" },
            { key: "D", text: "Submit Opinion Essay for Gemini AI Evaluation" }
          ],
      correctAnswer: "D",
      explanation: `🎯 [TIÊU CHÍ CHẤM ETS - PART 3 ESSAY (200/200)]
- Bố cục 4 đoạn chuẩn mực:
  - Mở bài: Dẫn dắt xu thế chuyển đổi số và khẳng định hoàn toàn đồng ý (Wholeheartedly agree).
  - Thân bài 1: Nâng cao vốn trí tuệ và năng lực đổi mới sáng tạo (Google, Amazon).
  - Thân bài 2: Giữ chân nhân tài, giảm chi phí tuyển dụng và xây dựng lòng trung thành.
  - Kết luận: Khẳng định lợi ích đôi bên cùng có lợi (win-win proposition).`
    }
  ]
};
