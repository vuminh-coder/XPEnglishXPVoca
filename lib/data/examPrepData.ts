export type SkillType = "LISTENING" | "READING" | "SPEAKING" | "WRITING";

export interface ExamQuestion {
  id: string;
  partNumber: number;
  partTitle: string;
  section: SkillType;
  audioUrl?: string;
  passageText?: string;
  imageUrl?: string;
  questionText: string;
  options: {
    key: "A" | "B" | "C" | "D";
    text: string;
  }[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  // Speaking AI fields
  speakingPrompt?: string;
  preparationTimeSeconds?: number;
  speakingTimeSeconds?: number;
  sampleAudioUrl?: string;
  // Writing AI fields
  writingPrompt?: string;
  minWordCount?: number;
  sampleEssay?: string;
}

export interface ExamPaper {
  id: string;
  title: string;
  type: "TOEIC_FULL" | "TOEIC_MINI" | "TOEIC_SPEAKING_WRITING" | "IELTS_FULL" | "IELTS_LISTENING" | "IELTS_READING" | "IELTS_SPEAKING" | "IELTS_WRITING";
  level: "Beginner" | "Intermediate" | "Advanced";
  timeLimitMinutes: number;
  totalQuestions: number;
  maxScore: number; // 990 for TOEIC, 9.0 for IELTS
  description: string;
  categoryBadge: string;
  tags: string[];
  supportedSkills: SkillType[];
  questions: ExamQuestion[];
}

const buildToeicLR01Questions = (): ExamQuestion[] => {
  const qs: ExamQuestion[] = [];

  // PART 1: PHOTOGRAPHS (Q1 - Q6)
  const part1Photos = [
        {
          id: "tlr1_q1",
          imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          questionText: "Look at the picture marked No. 1 in your test book.",
          options: [
            { key: "A", text: "They are typing on computer keyboards." },
            { key: "B", text: "They are reviewing documents around a conference table." },
            { key: "C", text: "They are adjusting the projector equipment." },
            { key: "D", text: "They are hanging artwork on the office wall." }
          ],
          correctAnswer: "B" as const,
          explanation: "Bức ảnh mô tả các đồng nghiệp đang cùng xem lại tài liệu xung quanh bàn họp (`reviewing documents around a conference table`)."
        },
        {
          id: "tlr1_q2",
          imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          questionText: "Look at the picture marked No. 2 in your test book.",
          options: [
            { key: "A", text: "A worker is operating heavy machinery in a warehouse." },
            { key: "B", text: "Cargo boxes are being loaded onto a delivery truck." },
            { key: "C", text: "Shelves are being assembled in an aisle." },
            { key: "D", text: "Merchandise is being scanned at a cash register." }
          ],
          correctAnswer: "A" as const,
          explanation: "Bức ảnh thể hiện nhân viên kho hàng đang điều khiển máy nâng hàng forklift (`operating heavy machinery in a warehouse`)."
        },
        {
          id: "tlr1_q3",
          imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          questionText: "Look at the picture marked No. 3 in your test book.",
          options: [
            { key: "A", text: "Engineers are inspecting blueprint plans outdoors." },
            { key: "B", text: "Construction workers wearing hard hats are examining a building site." },
            { key: "C", text: "Scaffolding is being dismantled near a bridge." },
            { key: "D", text: "Safety cones are blocking a residential driveway." }
          ],
          correctAnswer: "B" as const,
          explanation: "Bức ảnh cho thấy các công nhân xây dựng đội mũ bảo hộ đang khảo sát công trường (`wearing hard hats examining a building site`)."
        },
        {
          id: "tlr1_q4",
          imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          questionText: "Look at the picture marked No. 4 in your test book.",
          options: [
            { key: "A", text: "A barista is preparing a hot beverage behind a counter." },
            { key: "B", text: "Patrons are standing in line outside a cafe." },
            { key: "C", text: "Tables are being wiped down with clean towels." },
            { key: "D", text: "Coffee beans are being roasted in a large machine." }
          ],
          correctAnswer: "A" as const,
          explanation: "Bức ảnh thể hiện nhân viên pha chế đang làm đồ uống nóng đằng sau quầy phục vụ (`preparing a hot beverage behind a counter`)."
        },
        {
          id: "tlr1_q5",
          imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          questionText: "Look at the picture marked No. 5 in your test book.",
          options: [
            { key: "A", text: "Passengers are stowing luggage in overhead compartments." },
            { key: "B", text: "An airplane is parked on a tarmac near an airport terminal gate." },
            { key: "C", text: "Flight attendants are pushing service carts down the aisle." },
            { key: "D", text: "Travelers are waiting in an airport departure lounge." }
          ],
          correctAnswer: "B" as const,
          explanation: "Bức ảnh cho thấy máy bay đang đỗ tại bãi đỗ gần cổng nhà ga sân bay (`parked on a tarmac near an airport terminal gate`)."
        },
        {
          id: "tlr1_q6",
          imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          questionText: "Look at the picture marked No. 6 in your test book.",
          options: [
            { key: "A", text: "A professional is working on a laptop computer beside a desk lamp." },
            { key: "B", text: "A computer monitor is being unboxed from a cardboard crate." },
            { key: "C", text: "Headphones are hanging from a metal microphone stand." },
            { key: "D", text: "Wires are being connected to an electrical outlet." }
          ],
          correctAnswer: "A" as const,
          explanation: "Bức ảnh thể hiện người dùng làm việc trên máy tính xách tay bên cạnh đèn bàn (`working on a laptop computer beside a desk lamp`)."
        }
      ];

      part1Photos.forEach((p) => {
        qs.push({
          id: p.id,
          partNumber: 1,
          partTitle: "Part 1: Photographs",
          section: "LISTENING",
          imageUrl: p.imageUrl,
          audioUrl: p.audioUrl,
          questionText: p.questionText,
          options: p.options as any,
          correctAnswer: p.correctAnswer,
          explanation: p.explanation
        });
      });

      // PART 2: QUESTION-RESPONSE (Q7 - Q31: 25 FULLY UNIQUE ETS-STANDARD QUESTIONS)
      const part2Questions: { q: string; a: "A" | "B" | "C"; options: { key: string; text: string }[]; exp: string }[] = [
        // Q7 - Wh-question (Where)
        { q: "Where is the new printer paper stored?", a: "A", options: [{ key: "A", text: "In the supply closet on the second floor." }, { key: "B", text: "Yes, I printed twenty copies." }, { key: "C", text: "Tomorrow morning at nine o'clock." }], exp: "Câu hỏi 'Where' → trả lời vị trí: 'In the supply closet on the second floor'." },
        // Q8 - Wh-question (Who)
        { q: "Who will be heading the regional sales team next month?", a: "B", options: [{ key: "A", text: "At the headquarters in Chicago." }, { key: "B", text: "Ms. Jenkins was selected by management." }, { key: "C", text: "Sales grew by fifteen percent." }], exp: "Câu hỏi 'Who' → trả lời danh tính người: 'Ms. Jenkins was selected by management'." },
        // Q9 - Wh-question (When)
        { q: "When is the quarterly budget review meeting scheduled?", a: "C", options: [{ key: "A", text: "In the main conference hall." }, { key: "B", text: "We need more printer toner." }, { key: "C", text: "This Thursday at 2:00 PM." }], exp: "Câu hỏi 'When' → trả lời thời gian cụ thể: 'This Thursday at 2:00 PM'." },
        // Q10 - Wh-question (Why)
        { q: "Why was the morning flight to Atlanta canceled?", a: "A", options: [{ key: "A", text: "Due to severe thunderstorm warnings." }, { key: "B", text: "Gate 14B near the food court." }, { key: "C", text: "I bought a round-trip ticket." }], exp: "Câu hỏi 'Why' → trả lời nguyên nhân: 'Due to severe thunderstorm warnings'." },
        // Q11 - Yes/No question
        { q: "Has the client approved the revised building layout?", a: "B", options: [{ key: "A", text: "Three stories high." }, { key: "B", text: "Yes, they signed the document yesterday." }, { key: "C", text: "Near the train station." }], exp: "Câu hỏi Yes/No → xác nhận bằng 'Yes, they signed the document yesterday'." },
        // Q12 - Offer/Suggestion
        { q: "Would you like me to send you the meeting summary?", a: "A", options: [{ key: "A", text: "That would be very helpful, thank you." }, { key: "B", text: "About forty-five minutes long." }, { key: "C", text: "I met him last week." }], exp: "Lời đề nghị → chấp nhận lịch sự: 'That would be very helpful, thank you'." },
        // Q13 - How long
        { q: "How long does the train journey to downtown take?", a: "C", options: [{ key: "A", text: "Every fifteen minutes." }, { key: "B", text: "Single ticket, please." }, { key: "C", text: "Approximately thirty minutes." }], exp: "Câu hỏi 'How long' → trả lời thời lượng: 'Approximately thirty minutes'. Bẫy: A trả lời tần suất ('every') thay vì thời lượng." },
        // Q14 - Request
        { q: "Could you help me set up the projector for the presentation?", a: "B", options: [{ key: "A", text: "The presentation was informative." }, { key: "B", text: "Sure, let me fetch the HDMI cable." }, { key: "C", text: "At three o'clock in the room." }], exp: "Yêu cầu giúp đỡ → đồng ý hành động: 'Sure, let me fetch the HDMI cable'." },
        // Q15 - Which (specific choice)
        { q: "Which catering company did we hire for the annual banquet?", a: "A", options: [{ key: "A", text: "Gourmet Express Catering." }, { key: "B", text: "Over two hundred guests attended." }, { key: "C", text: "The food was delicious." }], exp: "Câu hỏi 'Which' → trả lời tên cụ thể: 'Gourmet Express Catering'." },
        // Q16 - Negative question (đố mẹo)
        { q: "Haven't you submitted your travel expense report yet?", a: "C", options: [{ key: "A", text: "I flew economy class." }, { key: "B", text: "To the conference in Seattle." }, { key: "C", text: "I submitted it to accounting this morning." }], exp: "Câu hỏi phủ định (Haven't you...) → trả lời xác nhận đã hoàn thành. Bẫy: B trả lời địa điểm không liên quan." },
        // Q17 - Who (indirect)
        { q: "Who is responsible for inspecting the factory equipment?", a: "B", options: [{ key: "A", text: "Every Friday afternoon." }, { key: "B", text: "Mr. Davis, the chief maintenance engineer." }, { key: "C", text: "The factory produces auto parts." }], exp: "Câu hỏi 'Who' → trả lời tên người + chức vụ: 'Mr. Davis, the chief maintenance engineer'." },
        // Q18 - Why (reason)
        { q: "Why did the marketing team postpone the product launch?", a: "A", options: [{ key: "A", text: "To conduct further market testing." }, { key: "B", text: "In the new downtown showroom." }, { key: "C", text: "The product price is fifty dollars." }], exp: "Câu hỏi 'Why' → trả lời mục đích: 'To conduct further market testing'." },
        // Q19 - Indirect response (đố mẹo - trả lời gián tiếp)
        { q: "Do you know if Mr. Harrison is in his office?", a: "C", options: [{ key: "A", text: "Yes, he signed the contract." }, { key: "B", text: "The office is on the fourth floor." }, { key: "C", text: "He just left for a client meeting." }], exp: "Trả lời gián tiếp (đố mẹo): thay vì nói Yes/No, cung cấp thông tin vị trí hiện tại. Bẫy: A dùng 'Yes' nhưng trả lời sai nội dung." },
        // Q20 - Where
        { q: "Where should I park my car during the workshop?", a: "A", options: [{ key: "A", text: "In the visitor lot behind Building B." }, { key: "B", text: "The workshop starts at 9:00 AM." }, { key: "C", text: "Yes, parking is free for attendees." }], exp: "Câu hỏi 'Where' → trả lời vị trí cụ thể: 'In the visitor lot behind Building B'." },
        // Q21 - Should (suggestion)
        { q: "Should we order extra chairs for the seminar?", a: "B", options: [{ key: "A", text: "The seminar topic is leadership." }, { key: "B", text: "Yes, thirty more people registered today." }, { key: "C", text: "They are made of leather." }], exp: "Câu hỏi đề xuất → đồng ý kèm lý do: 'thirty more people registered today'." },
        // Q22 - Tag question (đố mẹo)
        { q: "The shipment arrived on time, didn't it?", a: "C", options: [{ key: "A", text: "About three hundred boxes." }, { key: "B", text: "To the distribution center in Dallas." }, { key: "C", text: "Actually, it was delayed by two hours." }], exp: "Tag question (đố mẹo): câu hỏi đuôi xác nhận → trả lời chỉnh sửa thông tin bằng 'Actually, it was delayed'. Bẫy: A và B trả lời sai trọng tâm." },
        // Q23 - Choice question (đố mẹo - Or)
        { q: "Would you prefer the morning session or the afternoon session for the training?", a: "B", options: [{ key: "A", text: "Yes, I would like to attend the training." }, { key: "B", text: "The afternoon works better for my schedule." }, { key: "C", text: "The training room is on the third floor." }], exp: "Câu hỏi lựa chọn (Or): bẫy kinh điển — A trả lời 'Yes' cho câu hỏi Or (sai). Đáp án đúng chọn 1 trong 2: 'The afternoon works better'." },
        // Q24 - Indirect response (đố mẹo)
        { q: "Where can I find the user manual for the new photocopier?", a: "C", options: [{ key: "A", text: "It can make fifty copies per minute." }, { key: "B", text: "We bought it last Thursday." }, { key: "C", text: "Ms. Chen from IT should have a digital copy." }], exp: "Trả lời gián tiếp (đố mẹo): thay vì chỉ vị trí trực tiếp, gợi ý người liên hệ. Đây là dạng trả lời ETS thường gặp." },
        // Q25 - Embedded question
        { q: "Do you know when the next staff meeting is?", a: "A", options: [{ key: "A", text: "It has been moved to Friday at 10 AM." }, { key: "B", text: "There were about twenty people." }, { key: "C", text: "In the large conference room." }], exp: "Embedded question (Do you know when...): trả lời thời gian cụ thể, không cần nói 'Yes/No' trước." },
        // Q26 - How (manner)
        { q: "How should I submit the reimbursement request?", a: "B", options: [{ key: "A", text: "About three hundred dollars." }, { key: "B", text: "Fill out the online form on the company portal." }, { key: "C", text: "By the end of this month." }], exp: "Câu hỏi 'How' (cách thức) → trả lời phương pháp: 'Fill out the online form'. Bẫy: A trả lời 'How much', C trả lời 'When'." },
        // Q27 - Suggestion with Why don't (đố mẹo)
        { q: "The conference room is already booked for tomorrow. What should we do?", a: "C", options: [{ key: "A", text: "It seats up to fifty people." }, { key: "B", text: "The conference was about renewable energy." }, { key: "C", text: "Why don't we use the executive boardroom on the fifth floor?" }], exp: "Câu hỏi tình huống → gợi ý giải pháp bằng 'Why don't we...'. Dạng trả lời gián tiếp phổ biến trong ETS." },
        // Q28 - Polite request with mind
        { q: "Would you mind reviewing my draft proposal before the deadline?", a: "A", options: [{ key: "A", text: "Not at all. Send it to my inbox and I will take a look." }, { key: "B", text: "The deadline is next Wednesday." }, { key: "C", text: "I submitted my proposal last week." }], exp: "'Would you mind' → đồng ý = 'Not at all' (đố mẹo: nhiều thí sinh nhầm 'Yes' = đồng ý, nhưng 'Yes, I mind' = từ chối)." },
        // Q29 - What + suggestion context
        { q: "What time does the shuttle bus leave for the airport?", a: "B", options: [{ key: "A", text: "Yes, the bus stops right outside." }, { key: "B", text: "There is one departing at 6:15 and another at 7:30." }, { key: "C", text: "The airport is about forty minutes away." }], exp: "Câu hỏi 'What time' → trả lời hai mốc giờ cụ thể. Bẫy: C trả lời khoảng cách thời gian (How long) chứ không phải giờ." },
        // Q30 - Negative question (đố mẹo)
        { q: "Isn't the new branch office opening next Monday?", a: "C", options: [{ key: "A", text: "Yes, near the subway station." }, { key: "B", text: "It has over thirty employees." }, { key: "C", text: "No, the opening has been pushed back to the following week." }], exp: "Câu hỏi phủ định (Isn't...?) → trả lời phủ nhận kèm thông tin mới: 'pushed back to the following week'. Bẫy: A dùng 'Yes' nhưng trả lời vị trí." },
        // Q31 - Indirect + offer (đố mẹo)
        { q: "I cannot seem to get the new accounting software to work properly.", a: "A", options: [{ key: "A", text: "Let me call the IT help desk and schedule a technician for you." }, { key: "B", text: "The software was purchased in January." }, { key: "C", text: "We use it for quarterly financial reports." }], exp: "Câu trần thuật (không phải câu hỏi trực tiếp) → trả lời bằng lời đề nghị giúp đỡ. Dạng đố mẹo ETS hay dùng: statement → offer." }
      ];

      for (let qNum = 7; qNum <= 31; qNum++) {
        const item = part2Questions[qNum - 7];
        qs.push({
          id: `tlr1_q${qNum}`,
          partNumber: 2,
          partTitle: "Part 2: Question-Response",
          section: "LISTENING",
          audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(qNum % 10) + 1}.mp3`,
          questionText: `Question ${qNum}: ${item.q}`,
          options: item.options as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      }

      // PART 3: CONVERSATIONS (Q32 - Q70: 13 SETS × 3 QUESTIONS = 39 UNIQUE ETS QUESTIONS)
      const part3Sets: { transcript: string; questions: { q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        // SET 1 (Q32-34): Warehouse delivery delay
        {
          transcript: "Man: Good morning Sandra, I am following up on the bulk shipment of 15 ergonomic executive chairs we ordered from Star Logistics last Thursday. Did the truck arrive at our main warehouse facility this morning?\nWoman: Hi Thomas. Unfortunately no, the logistics dispatcher called our office at 8:30 AM to report a minor delay caused by emergency road maintenance on Interstate 95. They assured us that the freight truck will arrive at our warehouse by 3:00 PM today.\nMan: Thanks for letting me know right away. Please notify the facilities management team immediately so they can clear out Storage Bay B and ensure our forklift operators are on standby for unloading.",
          questions: [
            { q: "What problem does the woman report?", opts: [{ key: "A", text: "A traffic delay caused by emergency road maintenance on Interstate 95." }, { key: "B", text: "The chairs were shipped to the wrong warehouse address." }, { key: "C", text: "The supplier increased the unit price without prior notice." }, { key: "D", text: "A damaged container was discovered upon arrival." }], a: "A", exp: "Người phụ nữ nói rõ: 'a minor delay caused by emergency road maintenance on Interstate 95'." },
            { q: "What does the man ask the woman to do?", opts: [{ key: "A", text: "Cancel the delivery contract with Star Logistics." }, { key: "B", text: "Contact the truck driver for a direct update." }, { key: "C", text: "Notify the facilities team to prepare Storage Bay B." }, { key: "D", text: "Order additional chairs from an alternative supplier." }], a: "C", exp: "Người đàn ông yêu cầu: 'notify the facilities management team immediately so they can clear out Storage Bay B'." },
            { q: "At what time does the woman say the delivery will arrive?", opts: [{ key: "A", text: "8:30 AM." }, { key: "B", text: "12:00 PM." }, { key: "C", text: "1:00 PM." }, { key: "D", text: "3:00 PM." }], a: "D", exp: "Bẫy: 8:30 AM là giờ gọi báo trì hoãn, không phải giờ giao hàng. Đáp án: 'arrive at our warehouse by 3:00 PM today'." }
          ]
        },
        // SET 2 (Q35-37): Catering inquiry for company gala
        {
          transcript: "Man: Good afternoon, I am calling from Apex Financial Group. I am inquiring about your commercial catering packages for our upcoming annual company gala on November 15th. We are expecting approximately 250 guests.\nWoman: Thank you for considering us! We offer three comprehensive buffet packages: Classic Gourmet at forty-five dollars per person, Mediterranean Deluxe at sixty-five dollars per person, and a Premium Seafood selection at eighty-five dollars per person. All packages include professional service staff, table setup, and cleanup.\nMan: The Mediterranean package sounds ideal for our budget. Could you please send me a detailed price quotation and menu breakdown by email before Friday afternoon so our executive committee can review it during Monday's board meeting?",
          questions: [
            { q: "Why is the man calling?", opts: [{ key: "A", text: "To inquire about catering services for a corporate event." }, { key: "B", text: "To complain about a previous catering experience." }, { key: "C", text: "To cancel a reservation for a company dinner." }, { key: "D", text: "To place an order for office lunch delivery." }], a: "A", exp: "Người đàn ông nói rõ mục đích: 'inquiring about your commercial catering packages for our upcoming annual company gala'." },
            { q: "How much does the Mediterranean Deluxe package cost per person?", opts: [{ key: "A", text: "Forty-five dollars." }, { key: "B", text: "Sixty-five dollars." }, { key: "C", text: "Eighty-five dollars." }, { key: "D", text: "One hundred dollars." }], a: "B", exp: "Bẫy: 3 mức giá dễ nhầm. Classic = $45, Mediterranean = $65, Seafood = $85." },
            { q: "When does the man need the quotation?", opts: [{ key: "A", text: "By Wednesday morning." }, { key: "B", text: "Before Thursday noon." }, { key: "C", text: "Before Friday afternoon." }, { key: "D", text: "By Monday's board meeting." }], a: "C", exp: "Bẫy: Monday là ngày họp hội đồng (mục đích review), nhưng deadline gửi báo giá là 'before Friday afternoon'." }
          ]
        },
        // SET 3 (Q38-40): Marketing brochure error
        {
          transcript: "Woman: Marcus, have you had a chance to review the final draft of our new enterprise software marketing brochure before we send it to the commercial printer? The print run is scheduled for Wednesday morning.\nMan: Yes, I went through the entire forty-two-page layout this morning. Overall the design looks fantastic and the client testimonials section is very compelling. However, I noticed a critical pricing error on page 3 regarding our annual cloud subscription tiers. The Enterprise plan is listed at three hundred dollars, but it should be three hundred and fifty dollars per month.\nWoman: Oh, good catch! That could have been a serious problem with our customers. I will correct the figures in the master document right away and have the updated PDF ready by end of business today.",
          questions: [
            { q: "What is the woman's main concern?", opts: [{ key: "A", text: "The brochure design is not visually appealing." }, { key: "B", text: "The commercial printer has increased its rates." }, { key: "C", text: "The brochure needs to be reviewed before printing." }, { key: "D", text: "The client testimonials section needs rewriting." }], a: "C", exp: "Người phụ nữ hỏi Marcus: 'have you had a chance to review the final draft... before we send it to the commercial printer?'" },
            { q: "What error did the man find?", opts: [{ key: "A", text: "A misspelled company name on the cover page." }, { key: "B", text: "An incorrect price for the Enterprise cloud plan." }, { key: "C", text: "A missing page in the testimonials section." }, { key: "D", text: "An outdated product photo on page 3." }], a: "B", exp: "Marcus phát hiện: 'a critical pricing error on page 3 regarding our annual cloud subscription tiers'." },
            { q: "What will the woman do next?", opts: [{ key: "A", text: "Contact the printer to delay the print run." }, { key: "B", text: "Ask Marcus to rewrite the testimonials." }, { key: "C", text: "Correct the figures and prepare an updated PDF." }, { key: "D", text: "Schedule a meeting with the design team." }], a: "C", exp: "Người phụ nữ nói: 'I will correct the figures in the master document right away and have the updated PDF ready'." }
          ]
        },
        // SET 4 (Q41-43): Car rental upgrade
        {
          transcript: "Man: Hello, I reserved a compact rental sedan under the name David Peterson for three days starting today. My confirmation number is R-47823. I have a meeting in the financial district at 2:00 PM and I need to pick up the vehicle as soon as possible.\nWoman: Let me check our reservation system for you, Mr. Peterson. I see your booking right here. Due to unusually high weekend demand, all our compact sedans have already been rented out this morning. However, we would like to offer you a complimentary upgrade to a premium midsize SUV, the Hyundai Tucson, at absolutely no extra charge.\nMan: Wow, that is wonderful! I really appreciate the upgrade. Where do I pick up the keys, and is the vehicle already in the garage?",
          questions: [
            { q: "What is the man's problem?", opts: [{ key: "A", text: "His reservation was accidentally canceled." }, { key: "B", text: "The rental price is higher than expected." }, { key: "C", text: "The vehicle type he reserved is unavailable." }, { key: "D", text: "He cannot find the rental office location." }], a: "C", exp: "Bẫy: A gần đúng nhưng đặt chỗ vẫn còn — chỉ là loại xe compact không còn. 'all our compact sedans have already been rented out'." },
            { q: "What solution does the woman offer?", opts: [{ key: "A", text: "A full refund of the deposit." }, { key: "B", text: "A free upgrade to a premium midsize SUV." }, { key: "C", text: "A discounted rate for the next rental." }, { key: "D", text: "Delivery of the car to his office." }], a: "B", exp: "Đáp án: 'a complimentary upgrade to a premium midsize SUV... at absolutely no extra charge'." },
            { q: "What does the man want to know?", opts: [{ key: "A", text: "Whether insurance is included in the rental." }, { key: "B", text: "How to extend his rental period." }, { key: "C", text: "Where to pick up the keys and if the car is ready." }, { key: "D", text: "What documents are required for the upgrade." }], a: "C", exp: "Cuối đoạn hội thoại, người đàn ông hỏi: 'Where do I pick up the keys, and is the vehicle already in the garage?'" }
          ]
        },
        // SET 5 (Q44-46): Office renovation schedule
        {
          transcript: "Woman: Good morning, Kevin. I wanted to discuss the timeline for the third-floor office renovation project. The construction crew from Pinnacle Builders is scheduled to begin demolition work next Monday, October 21st.\nMan: That is sooner than I expected. Have we arranged temporary workspaces for the twelve employees who currently sit on the third floor? We cannot have them working in an active construction zone.\nWoman: Absolutely. I have already coordinated with building management to reserve the empty conference rooms on the fifth floor. Each room will be equipped with temporary desks, monitors, and network cables. The entire renovation should be completed within six weeks.\nMan: Perfect planning. Please also send an internal memo to all affected staff by Wednesday, reminding them to pack their personal belongings and label their equipment before the weekend.",
          questions: [
            { q: "What is the main topic of the conversation?", opts: [{ key: "A", text: "Hiring a new construction company for the building." }, { key: "B", text: "The schedule and logistics of an office renovation." }, { key: "C", text: "Purchasing new furniture for the conference rooms." }, { key: "D", text: "Relocating the company to a different building." }], a: "B", exp: "Chủ đề chính: timeline và logistics cho dự án cải tạo văn phòng tầng 3." },
            { q: "Where will the affected employees work temporarily?", opts: [{ key: "A", text: "In a nearby coworking space." }, { key: "B", text: "At their homes via remote work." }, { key: "C", text: "In conference rooms on the fifth floor." }, { key: "D", text: "On the second floor of the same building." }], a: "C", exp: "Người phụ nữ: 'reserve the empty conference rooms on the fifth floor'." },
            { q: "What does the man ask the woman to do by Wednesday?", opts: [{ key: "A", text: "Finalize the contractor's payment terms." }, { key: "B", text: "Order new monitors for the temporary desks." }, { key: "C", text: "Schedule a building safety inspection." }, { key: "D", text: "Send an internal memo to affected staff about packing." }], a: "D", exp: "Người đàn ông yêu cầu: 'send an internal memo to all affected staff by Wednesday, reminding them to pack their personal belongings'." }
          ]
        },
        // SET 6 (Q47-49): Job interview scheduling
        {
          transcript: "Man: Hi Rachel, I need your help scheduling the final round of interviews for the Senior Marketing Analyst position. We have narrowed the candidate pool down to three finalists, and the hiring committee would like to complete all interviews by next Friday.\nWoman: Sure. I will reach out to each candidate today to confirm their availability. Do you want to allocate forty-five minutes per interview, or would you prefer a full hour to include the case study presentation?\nMan: Let us go with the full hour. Each candidate will present their market analysis case study for twenty minutes, followed by a forty-minute panel Q and A session with the committee. Also, please reserve Conference Room A for all three slots and make sure the projector and whiteboard markers are available.",
          questions: [
            { q: "What position are they hiring for?", opts: [{ key: "A", text: "Junior Sales Representative." }, { key: "B", text: "Senior Marketing Analyst." }, { key: "C", text: "Chief Financial Officer." }, { key: "D", text: "Human Resources Manager." }], a: "B", exp: "Đáp án rõ ràng: 'the Senior Marketing Analyst position'." },
            { q: "How long will each interview last?", opts: [{ key: "A", text: "Thirty minutes." }, { key: "B", text: "Forty-five minutes." }, { key: "C", text: "One full hour." }, { key: "D", text: "Ninety minutes." }], a: "C", exp: "Bẫy: 45 phút được đề cập nhưng bị từ chối. Đáp án: 'Let us go with the full hour'." },
            { q: "What will each candidate do during the interview?", opts: [{ key: "A", text: "Take a written examination followed by a group discussion." }, { key: "B", text: "Present a case study for 20 minutes and then answer panel questions for 40 minutes." }, { key: "C", text: "Complete a skills assessment test on the computer." }, { key: "D", text: "Shadow a current employee for the full session." }], a: "B", exp: "Chi tiết: 'present their market analysis case study for twenty minutes, followed by a forty-minute panel Q and A session'." }
          ]
        },
        // SET 7 (Q50-52): Supply chain disruption
        {
          transcript: "Woman: James, I just received an urgent email from our primary supplier in Taiwan. They are reporting a two-week production delay on the microprocessor chips due to an unexpected equipment malfunction at their manufacturing facility.\nMan: That is going to severely impact our Q4 production schedule. We have committed to delivering 10,000 units of the new tablet to our retail partners by December 15th. Have you contacted our backup supplier in South Korea?\nWoman: Yes, I reached out to SemiTech Korea this morning. They confirmed they can supply the same chip specification, but at a twelve percent price premium due to expedited manufacturing. They also need at least a five-business-day lead time before shipping.\nMan: Given the tight deadline, I think we should authorize the premium pricing. Please get a formal purchase order drafted and send it to my desk for approval by end of day.",
          questions: [
            { q: "What is the main problem discussed?", opts: [{ key: "A", text: "A data security breach at the Taiwan facility." }, { key: "B", text: "A production delay on microprocessor chips from Taiwan." }, { key: "C", text: "A shipping container lost during ocean transit." }, { key: "D", text: "A quality defect discovered in finished products." }], a: "B", exp: "Vấn đề chính: 'a two-week production delay on the microprocessor chips due to an unexpected equipment malfunction'." },
            { q: "What is the additional cost from the backup supplier?", opts: [{ key: "A", text: "A five percent surcharge." }, { key: "B", text: "A ten percent premium." }, { key: "C", text: "A twelve percent price premium." }, { key: "D", text: "A fifteen percent markup." }], a: "C", exp: "SemiTech Korea: 'at a twelve percent price premium due to expedited manufacturing'." },
            { q: "What does the man ask the woman to prepare?", opts: [{ key: "A", text: "A revised production timeline for the retail partners." }, { key: "B", text: "An insurance claim for the equipment malfunction." }, { key: "C", text: "A formal purchase order for his approval by end of day." }, { key: "D", text: "A report comparing all available chip suppliers." }], a: "C", exp: "Người đàn ông: 'get a formal purchase order drafted and send it to my desk for approval by end of day'." }
          ]
        },
        // SET 8 (Q53-55): Hotel conference room booking
        {
          transcript: "Man: Hello, I am calling from Meridian Consulting. We would like to book the Grand Ballroom at your hotel for a two-day corporate retreat on January 18th and 19th. We are expecting around 120 attendees.\nWoman: Thank you for your interest, sir. Unfortunately, the Grand Ballroom is already reserved for a wedding reception on January 18th. However, I can offer you the Executive Summit Hall, which accommodates up to 150 guests and includes built-in audiovisual equipment, complimentary Wi-Fi, and a dedicated events coordinator.\nMan: That actually sounds even better for our needs. What is the daily rental rate, and does it include catering services?\nWoman: The Summit Hall is 3,500 dollars per day. Catering is available as an add-on starting at 35 dollars per person for a full lunch buffet. I can send you a complete package proposal by tomorrow if you would like.",
          questions: [
            { q: "Why can the man not book the Grand Ballroom?", opts: [{ key: "A", text: "It is under renovation during that period." }, { key: "B", text: "It is already reserved for a wedding reception." }, { key: "C", text: "It exceeds the group's budget limit." }, { key: "D", text: "It does not have audiovisual equipment." }], a: "B", exp: "Đáp án: 'the Grand Ballroom is already reserved for a wedding reception on January 18th'." },
            { q: "How much does the Executive Summit Hall cost per day?", opts: [{ key: "A", text: "2,500 dollars." }, { key: "B", text: "3,000 dollars." }, { key: "C", text: "3,500 dollars." }, { key: "D", text: "4,000 dollars." }], a: "C", exp: "Giá phòng: 'The Summit Hall is 3,500 dollars per day'." },
            { q: "What does the woman offer to send?", opts: [{ key: "A", text: "A floor plan of the ballroom." }, { key: "B", text: "A complete package proposal by tomorrow." }, { key: "C", text: "A list of nearby hotels with availability." }, { key: "D", text: "A contract for immediate signature." }], a: "B", exp: "Người phụ nữ: 'I can send you a complete package proposal by tomorrow'." }
          ]
        },
        // SET 9 (Q56-58): Product return & refund process
        {
          transcript: "Woman: Good afternoon, I purchased a Vertex Pro wireless headset from your store two weeks ago, and the right earpiece has stopped producing sound. I have the original receipt and the product is still within the 30-day warranty period.\nMan: I am sorry to hear about that, ma'am. We can certainly help you with this. You have two options: we can either provide a direct replacement with a brand new unit from our current stock, or we can process a full refund to your original payment method, which typically takes three to five business days.\nWoman: I would prefer a replacement since I really like the headset overall. Could you also check if there is a newer model available? I would be willing to pay the price difference if there is an upgrade option.\nMan: Absolutely. The Vertex Pro 2 was just released last week at 89 dollars, which is 20 dollars more than what you paid. I can apply your original purchase as credit toward the upgrade.",
          questions: [
            { q: "What is wrong with the woman's headset?", opts: [{ key: "A", text: "The Bluetooth connection keeps dropping." }, { key: "B", text: "The battery no longer holds a charge." }, { key: "C", text: "The right earpiece has stopped producing sound." }, { key: "D", text: "The headband is cracked and uncomfortable." }], a: "C", exp: "Cụ thể: 'the right earpiece has stopped producing sound'." },
            { q: "What does the woman choose to do?", opts: [{ key: "A", text: "Request a full refund to her credit card." }, { key: "B", text: "Get a replacement and ask about an upgrade option." }, { key: "C", text: "File a complaint with the manufacturer." }, { key: "D", text: "Exchange it for a completely different brand." }], a: "B", exp: "Người phụ nữ: 'I would prefer a replacement... Could you also check if there is a newer model available?'" },
            { q: "How much more does the Vertex Pro 2 cost compared to the original?", opts: [{ key: "A", text: "10 dollars more." }, { key: "B", text: "15 dollars more." }, { key: "C", text: "20 dollars more." }, { key: "D", text: "25 dollars more." }], a: "C", exp: "Bẫy: tổng giá $89 được nêu nhưng câu hỏi hỏi chênh lệch. Đáp án: '20 dollars more than what you paid'." }
          ]
        },
        // SET 10 (Q59-61): 3-speaker office relocation discussion
        {
          transcript: "Woman 1: I have just received confirmation from the real estate agent. The lease for our new office space on Park Avenue has been finalized, and we can begin moving in starting February 1st.\nMan: That is excellent news, Lisa. How much larger is the new space compared to our current location?\nWoman 1: It is approximately 40 percent larger, with dedicated areas for the engineering lab, a rooftop terrace for employee breaks, and a client presentation theater on the ground floor.\nWoman 2: I have already contacted three moving companies for quotes. Atlas Movers offered the most competitive price at 8,200 dollars for the full relocation, including IT server migration and furniture assembly at the new site. They estimate the move will take two full days.\nMan: Let us go with Atlas Movers. Sarah, please coordinate the IT department to ensure all servers and network infrastructure are properly backed up before the physical move begins.",
          questions: [
            { q: "What has been finalized?", opts: [{ key: "A", text: "The purchase of a new office building." }, { key: "B", text: "The lease agreement for new office space on Park Avenue." }, { key: "C", text: "The renovation plan for the current office." }, { key: "D", text: "The merger with a competing company." }], a: "B", exp: "Lisa: 'The lease for our new office space on Park Avenue has been finalized'." },
            { q: "How much larger is the new office?", opts: [{ key: "A", text: "20 percent larger." }, { key: "B", text: "30 percent larger." }, { key: "C", text: "40 percent larger." }, { key: "D", text: "50 percent larger." }], a: "C", exp: "Đáp án: 'approximately 40 percent larger'." },
            { q: "What does the man ask Sarah to coordinate?", opts: [{ key: "A", text: "Booking a cleaning crew for the new office." }, { key: "B", text: "Ordering new furniture for the presentation theater." }, { key: "C", text: "Backing up servers and network infrastructure before the move." }, { key: "D", text: "Sending moving announcements to all clients." }], a: "C", exp: "Người đàn ông: 'coordinate the IT department to ensure all servers and network infrastructure are properly backed up'." }
          ]
        },
        // SET 11 (Q62-64): Training workshop feedback
        {
          transcript: "Man: Diana, how did the leadership development workshop go yesterday? I heard we had a record number of participants from across all regional offices.\nWoman: It went exceptionally well. We had 78 attendees, which is double the number from last year's session. The keynote speaker, Dr. Amanda Foster from Stanford Business School, received outstanding evaluations. Ninety-two percent of participants rated her presentation as excellent.\nMan: That is impressive. Were there any issues with the virtual participants joining through the video conferencing platform?\nWoman: Actually, yes. About fifteen remote participants experienced audio buffering during the first twenty minutes. Our IT team resolved the bandwidth issue by switching to a backup server, and the rest of the session ran smoothly. Several attendees have already requested that we schedule a follow-up advanced workshop in March.",
          questions: [
            { q: "How many people attended the workshop?", opts: [{ key: "A", text: "39 attendees." }, { key: "B", text: "56 attendees." }, { key: "C", text: "78 attendees." }, { key: "D", text: "92 attendees." }], a: "C", exp: "Bẫy: 92 là phần trăm đánh giá tốt, không phải số người. Đáp án: 'We had 78 attendees'." },
            { q: "What technical problem occurred?", opts: [{ key: "A", text: "The projector malfunctioned during the keynote." }, { key: "B", text: "Remote participants experienced audio buffering issues." }, { key: "C", text: "The video recording system failed completely." }, { key: "D", text: "The conference room's air conditioning broke down." }], a: "B", exp: "Sự cố: 'about fifteen remote participants experienced audio buffering during the first twenty minutes'." },
            { q: "What have some attendees requested?", opts: [{ key: "A", text: "A certificate of completion for the workshop." }, { key: "B", text: "A recording of Dr. Foster's presentation." }, { key: "C", text: "A follow-up advanced workshop in March." }, { key: "D", text: "A refund due to the technical difficulties." }], a: "C", exp: "Đáp án: 'Several attendees have already requested that we schedule a follow-up advanced workshop in March'." }
          ]
        },
        // SET 12 (Q65-67): Restaurant reservation for client dinner
        {
          transcript: "Woman: Hello, I would like to make a reservation for a private business dinner at your restaurant. We need a table for eight people this Saturday evening around 7:30 PM.\nMan: Thank you for calling La Maison Dorée. Let me check our availability for Saturday. We do have our Bordeaux Private Dining Room available that evening, which seats up to ten guests. It features a dedicated server, a curated five-course wine pairing menu, and floor-to-ceiling windows overlooking the harbor.\nWoman: That sounds perfect for impressing our international clients. What is the price per person for the five-course menu?\nMan: The prix fixe dinner is 185 dollars per person, including wine pairings. We also offer a premium upgrade to include champagne and artisanal desserts for an additional 40 dollars per person. Shall I reserve the room under your company name?",
          questions: [
            { q: "How many guests will attend the dinner?", opts: [{ key: "A", text: "Six guests." }, { key: "B", text: "Eight guests." }, { key: "C", text: "Ten guests." }, { key: "D", text: "Twelve guests." }], a: "B", exp: "Bẫy: 10 là sức chứa tối đa phòng, nhưng đặt cho 'eight people'. Câu đố mẹo kiểm tra đọc kỹ." },
            { q: "What is the base price per person?", opts: [{ key: "A", text: "145 dollars." }, { key: "B", text: "185 dollars." }, { key: "C", text: "225 dollars." }, { key: "D", text: "265 dollars." }], a: "B", exp: "Prix fixe: '185 dollars per person, including wine pairings'. Premium upgrade = +$40 nhưng đó là add-on." },
            { q: "What is the purpose of the dinner?", opts: [{ key: "A", text: "A family birthday celebration." }, { key: "B", text: "A staff farewell party." }, { key: "C", text: "Impressing international clients." }, { key: "D", text: "A wedding anniversary dinner." }], a: "C", exp: "Người phụ nữ: 'That sounds perfect for impressing our international clients'." }
          ]
        },
        // SET 13 (Q68-70): Merger announcement & staff communication
        {
          transcript: "Man: Patricia, I wanted to brief you before tomorrow's all-hands meeting. The board of directors officially approved the merger with Orion Technologies last night. The combined entity will operate under the new name Apex-Orion Global Solutions, effective January 1st.\nWoman: That is significant news. How will this affect our current employees? I have already been receiving concerned emails from several department heads about potential restructuring and layoffs.\nMan: No positions will be eliminated in the first twelve months. The merger is focused on expanding our product portfolio and entering the Asian-Pacific market. However, some roles may be reassigned to the new Singapore regional office that Orion currently operates.\nWoman: That is reassuring. Should I prepare talking points for department managers to share with their teams before the public announcement?\nMan: Yes, please draft a comprehensive FAQ document covering job security, benefits continuity, and the transition timeline. Have it ready for my review by 4 PM today.",
          questions: [
            { q: "What was recently approved?", opts: [{ key: "A", text: "The acquisition of a competitor's patent portfolio." }, { key: "B", text: "A new round of venture capital funding." }, { key: "C", text: "The merger with Orion Technologies." }, { key: "D", text: "The expansion of the Singapore office." }], a: "C", exp: "Đáp án: 'The board of directors officially approved the merger with Orion Technologies last night'." },
            { q: "What does the man say about current employees?", opts: [{ key: "A", text: "All employees will receive a 10 percent salary increase." }, { key: "B", text: "Some departments will be shut down immediately." }, { key: "C", text: "No positions will be eliminated in the first twelve months." }, { key: "D", text: "Everyone must reapply for their current roles." }], a: "C", exp: "Cam kết: 'No positions will be eliminated in the first twelve months'. Tuy nhiên 'some roles may be reassigned' (sắp xếp lại, không phải sa thải)." },
            { q: "What document does the man ask Patricia to prepare?", opts: [{ key: "A", text: "A press release for the media." }, { key: "B", text: "A comprehensive FAQ document for department managers." }, { key: "C", text: "A financial forecast for the merged company." }, { key: "D", text: "A new employee handbook for Orion staff." }], a: "B", exp: "Yêu cầu: 'draft a comprehensive FAQ document covering job security, benefits continuity, and the transition timeline'." }
          ]
        }
      ];

      let part3QNum = 32;
      part3Sets.forEach((set, setIndex) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr1_q${part3QNum}`,
            partNumber: 3,
            partTitle: "Part 3: Conversations",
            section: "LISTENING",
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(setIndex % 5) + 1}.mp3`,
            passageText: `[Audio Transcript - Conversation #${setIndex + 1}]\n${set.transcript}`,
            questionText: `Question ${part3QNum}: ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
          part3QNum++;
        });
      });

      // PART 4: SHORT TALKS (Q71 - Q100: 10 UNIQUE ETS DEEP SHORT TALKS)
      // PART 4: SHORT TALKS (Q71 - Q100: 10 SETS × 3 QUESTIONS = 30 UNIQUE ETS QUESTIONS)
      const part4Sets: { transcript: string; questions: { q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        // TALK 1 (Q71-73): Airport boarding announcement
        {
          transcript: "Attention all passengers traveling on TransGlobal Airways flight TG-320 bound for London Heathrow with non-stop service. Boarding is now commencing at Gate 14 on Departure Level 2. We kindly request that all passengers have your printed boarding pass and a valid passport or government-issued photo identification ready for scanning at the gate. Priority boarding is now available for First Class and Business Class ticket holders. General boarding for Economy Class passengers seated in rows 25 through 40 will begin in approximately ten minutes. Please note that carry-on baggage must fit in the overhead compartment or under the seat in front of you. TransGlobal Airways thanks you for choosing us and wishes you a pleasant flight.",
          questions: [
            { q: "What is the purpose of this announcement?", opts: [{ key: "A", text: "To announce the commencement of flight boarding at Gate 14." }, { key: "B", text: "To inform travelers of an emergency flight cancellation." }, { key: "C", text: "To offer dining discount vouchers for airport restaurants." }, { key: "D", text: "To request passengers to collect baggage at carousel 3." }], a: "A", exp: "Thông báo bắt đầu boarding: 'Boarding is now commencing at Gate 14 on Departure Level 2'." },
            { q: "What should passengers have ready?", opts: [{ key: "A", text: "A vaccination certificate and travel insurance." }, { key: "B", text: "A credit card for in-flight purchases." }, { key: "C", text: "A boarding pass and valid passport or photo ID." }, { key: "D", text: "A luggage claim ticket and customs form." }], a: "C", exp: "Yêu cầu: 'have your printed boarding pass and a valid passport or government-issued photo identification ready'." },
            { q: "When will Economy Class passengers in rows 25-40 begin boarding?", opts: [{ key: "A", text: "Immediately." }, { key: "B", text: "In approximately five minutes." }, { key: "C", text: "In approximately ten minutes." }, { key: "D", text: "After all Business Class passengers have boarded." }], a: "C", exp: "Đáp án: 'General boarding for Economy Class passengers seated in rows 25 through 40 will begin in approximately ten minutes'." }
          ]
        },
        // TALK 2 (Q74-76): Factory tour guide
        {
          transcript: "Welcome to the annual Apex National Manufacturing Facility tour. My name is David Miller, and I will be your guide through our state-of-the-art automated robotic assembly line today. Before we step onto the active production floor, please ensure that your safety goggles and ear protective gear are securely fastened at all times. Photography is strictly prohibited in Sections A through C due to proprietary technology. We will first examine the precision laser welding station at Bay 3, where robotic arms perform over 200 welds per minute. Following that, we will visit the quality control laboratory on the second floor, where every tenth unit undergoes a comprehensive 47-point inspection. The tour will conclude with a short presentation in the visitor center, where refreshments will be served.",
          questions: [
            { q: "Who is David Miller?", opts: [{ key: "A", text: "The factory's chief executive officer." }, { key: "B", text: "The tour guide for the facility visit." }, { key: "C", text: "A safety inspector from the government." }, { key: "D", text: "A robot engineer on the production line." }], a: "B", exp: "Đáp án: 'My name is David Miller, and I will be your guide'." },
            { q: "What is prohibited in Sections A through C?", opts: [{ key: "A", text: "Eating and drinking." }, { key: "B", text: "Using mobile phones for calls." }, { key: "C", text: "Taking photographs." }, { key: "D", text: "Wearing open-toe shoes." }], a: "C", exp: "Quy định: 'Photography is strictly prohibited in Sections A through C due to proprietary technology'." },
            { q: "What happens to every tenth unit produced?", opts: [{ key: "A", text: "It is donated to a charity organization." }, { key: "B", text: "It undergoes a comprehensive 47-point inspection." }, { key: "C", text: "It is shipped directly to overseas distributors." }, { key: "D", text: "It is disassembled for recycling materials." }], a: "B", exp: "Kiểm soát chất lượng: 'every tenth unit undergoes a comprehensive 47-point inspection'." }
          ]
        },
        // TALK 3 (Q77-79): Radio advertisement
        {
          transcript: "Are you looking to upgrade your office space with premium eco-friendly furniture? GreenSpace Designs is celebrating its 10th anniversary by offering an exclusive 30 percent discount on all ergonomic standing desks and adjustable mesh chairs throughout the entire month of October! Our products are crafted from sustainably sourced bamboo and recycled aluminum, and every piece comes with a 5-year manufacturer warranty. Visit our flagship showroom on 245 Oak Street in the downtown business district, or browse our complete catalog online at greenspace dot com. Use promo code GREEN10 at checkout for free nationwide shipping on orders over 500 dollars. Offer ends October 31st, so do not miss out!",
          questions: [
            { q: "What is GreenSpace Designs celebrating?", opts: [{ key: "A", text: "The opening of a second retail location." }, { key: "B", text: "Its 10th anniversary." }, { key: "C", text: "A partnership with a major furniture chain." }, { key: "D", text: "Winning an environmental sustainability award." }], a: "B", exp: "Đáp án: 'GreenSpace Designs is celebrating its 10th anniversary'." },
            { q: "What is the discount percentage being offered?", opts: [{ key: "A", text: "15 percent." }, { key: "B", text: "20 percent." }, { key: "C", text: "25 percent." }, { key: "D", text: "30 percent." }], a: "D", exp: "Ưu đãi: 'an exclusive 30 percent discount on all ergonomic standing desks and adjustable mesh chairs'." },
            { q: "What does promo code GREEN10 provide?", opts: [{ key: "A", text: "An additional 10 percent off the total price." }, { key: "B", text: "A complimentary desk lamp with purchase." }, { key: "C", text: "Free nationwide shipping on orders over 500 dollars." }, { key: "D", text: "A free extended warranty for 10 years." }], a: "C", exp: "Bẫy: mã GREEN10 không cho giảm thêm 10% — mà cho 'free nationwide shipping on orders over 500 dollars'." }
          ]
        },
        // TALK 4 (Q80-82): Museum tour guide
        {
          transcript: "Good afternoon, everyone, and welcome to the National Maritime Museum. I am your guide, Professor Elena Vasquez. Today's tour will focus on our newest permanent exhibition, 'Voyages of Discovery,' which chronicles 500 years of oceanic exploration from the 15th century to the modern era. We will begin in Gallery A on the ground floor, where you can see the original navigation instruments used by Portuguese explorers, including a rare 1492 astrolabe. Please note that the interactive shipbuilding simulator on the third floor will be temporarily closed for maintenance until next Thursday. Gift shop purchases receive a 15 percent discount with your museum admission ticket. The tour will last approximately 90 minutes.",
          questions: [
            { q: "What is the name of the new exhibition?", opts: [{ key: "A", text: "Masters of the Sea." }, { key: "B", text: "Ancient Civilizations." }, { key: "C", text: "Voyages of Discovery." }, { key: "D", text: "The Art of Navigation." }], a: "C", exp: "Triển lãm: 'our newest permanent exhibition, Voyages of Discovery'." },
            { q: "What is temporarily closed?", opts: [{ key: "A", text: "Gallery A on the ground floor." }, { key: "B", text: "The museum gift shop." }, { key: "C", text: "The interactive shipbuilding simulator on the third floor." }, { key: "D", text: "The café and dining area." }], a: "C", exp: "Đóng cửa: 'the interactive shipbuilding simulator on the third floor will be temporarily closed for maintenance until next Thursday'." },
            { q: "How long will the tour last?", opts: [{ key: "A", text: "45 minutes." }, { key: "B", text: "60 minutes." }, { key: "C", text: "90 minutes." }, { key: "D", text: "120 minutes." }], a: "C", exp: "Thời lượng: 'The tour will last approximately 90 minutes'." }
          ]
        },
        // TALK 5 (Q83-85): Weather report
        {
          transcript: "Good morning, this is Jennifer Walsh with your Greater Metro Area weather forecast for Tuesday, November 5th. We are currently seeing clear skies with temperatures around 52 degrees Fahrenheit. However, a cold front moving in from the northwest is expected to bring significant changes by this afternoon. Temperatures will drop to the low 40s, and there is an 80 percent chance of moderate rainfall starting around 3 PM and continuing through the evening commute. Winds will pick up to 25 miles per hour with gusts reaching 35 miles per hour. Drivers are advised to allow extra travel time and use headlights in reduced visibility. Tomorrow's outlook shows the rain clearing by mid-morning with partly cloudy skies returning by the afternoon.",
          questions: [
            { q: "What is the current weather condition?", opts: [{ key: "A", text: "Heavy rainfall with thunderstorms." }, { key: "B", text: "Clear skies with temperatures around 52 degrees." }, { key: "C", text: "Snow flurries with freezing temperatures." }, { key: "D", text: "Overcast with dense fog." }], a: "B", exp: "Hiện tại: 'clear skies with temperatures around 52 degrees Fahrenheit'." },
            { q: "What is expected this afternoon?", opts: [{ key: "A", text: "A heat wave with temperatures above 90 degrees." }, { key: "B", text: "Sunny skies and mild temperatures." }, { key: "C", text: "Temperature drop and moderate rainfall starting around 3 PM." }, { key: "D", text: "Tornado warnings for the metro area." }], a: "C", exp: "Dự báo: 'Temperatures will drop to the low 40s... 80 percent chance of moderate rainfall starting around 3 PM'." },
            { q: "What advice is given to drivers?", opts: [{ key: "A", text: "Avoid all highways until further notice." }, { key: "B", text: "Park vehicles in covered garages." }, { key: "C", text: "Allow extra travel time and use headlights." }, { key: "D", text: "Take public transportation instead of driving." }], a: "C", exp: "Lời khuyên: 'Drivers are advised to allow extra travel time and use headlights in reduced visibility'." }
          ]
        },
        // TALK 6 (Q86-88): Voicemail message
        {
          transcript: "Hello, Ms. Nakamura, this is Robert Chen from Sterling Architecture Associates returning your call about the residential renovation blueprints. I have completed the revised floor plans incorporating all the changes we discussed last Friday, including the expanded kitchen layout, the additional bathroom on the second floor, and the reinforced foundation specifications for the rooftop garden. I would like to schedule a meeting with you and the structural engineer, Mr. Patel, to review the updated drawings before we submit them to the city planning department for permit approval. The permit application deadline is November 30th, so we should meet no later than November 20th. Please call me back at 555-0147 or email me at robert at sterling arch dot com to confirm a convenient date and time.",
          questions: [
            { q: "Who is leaving the voicemail?", opts: [{ key: "A", text: "A city planning department official." }, { key: "B", text: "An architect from Sterling Architecture Associates." }, { key: "C", text: "A real estate agent selling the property." }, { key: "D", text: "A contractor bidding on the renovation project." }], a: "B", exp: "Đáp án: 'this is Robert Chen from Sterling Architecture Associates'." },
            { q: "What changes were made to the blueprints?", opts: [{ key: "A", text: "A swimming pool and outdoor patio were added." }, { key: "B", text: "The garage was converted into a home office." }, { key: "C", text: "An expanded kitchen, additional bathroom, and reinforced rooftop foundation." }, { key: "D", text: "The building was redesigned from two stories to three stories." }], a: "C", exp: "3 thay đổi: 'expanded kitchen layout, additional bathroom on the second floor, reinforced foundation specifications for the rooftop garden'." },
            { q: "By when does Robert suggest they should meet?", opts: [{ key: "A", text: "By October 30th." }, { key: "B", text: "By November 15th." }, { key: "C", text: "By November 20th." }, { key: "D", text: "By November 30th." }], a: "C", exp: "Bẫy: November 30th là deadline nộp permit, nhưng họp phải trước 'no later than November 20th'." }
          ]
        },
        // TALK 7 (Q89-91): News broadcast
        {
          transcript: "In business news today, Zenith Technologies, the Silicon Valley-based software company, announced a landmark acquisition of DataStream Analytics for 2.4 billion dollars. The deal, which is expected to close by the end of the first quarter of next year, will make Zenith the largest provider of cloud-based data analytics solutions in North America. DataStream's 3,500 employees will be integrated into Zenith's existing workforce, and the company has confirmed that no layoffs are planned as part of the transition. Industry analysts predict the combined entity will generate annual revenues exceeding 8 billion dollars. Zenith's stock price rose 7 percent in after-hours trading following the announcement.",
          questions: [
            { q: "How much is the acquisition worth?", opts: [{ key: "A", text: "1.2 billion dollars." }, { key: "B", text: "2.4 billion dollars." }, { key: "C", text: "4.8 billion dollars." }, { key: "D", text: "8 billion dollars." }], a: "B", exp: "Bẫy: $8 billion là doanh thu dự kiến, không phải giá mua. Đáp án: 'acquisition of DataStream Analytics for 2.4 billion dollars'." },
            { q: "What will happen to DataStream's employees?", opts: [{ key: "A", text: "They will receive severance packages." }, { key: "B", text: "They will be offered early retirement." }, { key: "C", text: "They will be integrated with no layoffs planned." }, { key: "D", text: "They will be relocated to a new headquarters." }], a: "C", exp: "Nhân viên: 'will be integrated into Zenith's existing workforce... no layoffs are planned'." },
            { q: "How did Zenith's stock price react?", opts: [{ key: "A", text: "It dropped 3 percent." }, { key: "B", text: "It remained unchanged." }, { key: "C", text: "It rose 7 percent in after-hours trading." }, { key: "D", text: "It was temporarily suspended from trading." }], a: "C", exp: "Cổ phiếu: 'Zenith's stock price rose 7 percent in after-hours trading'." }
          ]
        },
        // TALK 8 (Q92-94): Company meeting introduction
        {
          transcript: "Good morning, everyone. Thank you for joining this quarter's all-hands meeting. Before we get into the financial results, I have some exciting organizational announcements. First, I am pleased to welcome Ms. Karen Sullivan, who will be joining us as our new Vice President of Global Operations starting December 1st. Karen comes to us from Pinnacle Industries, where she led a team of 800 employees across 12 countries. Second, our employee satisfaction survey results are in, and I am thrilled to report that overall satisfaction has increased by 14 percentage points compared to last year, reaching an all-time high of 87 percent. Finally, our annual company retreat has been confirmed for February 8th through 10th at the Lakeview Grand Resort. Registration details will be sent via email by end of this week.",
          questions: [
            { q: "What is Karen Sullivan's new role?", opts: [{ key: "A", text: "Director of Human Resources." }, { key: "B", text: "Vice President of Global Operations." }, { key: "C", text: "Chief Technology Officer." }, { key: "D", text: "Regional Sales Manager." }], a: "B", exp: "Chức vụ: 'Ms. Karen Sullivan... our new Vice President of Global Operations'." },
            { q: "What is the current employee satisfaction score?", opts: [{ key: "A", text: "73 percent." }, { key: "B", text: "78 percent." }, { key: "C", text: "83 percent." }, { key: "D", text: "87 percent." }], a: "D", exp: "Bẫy: 14 phần trăm là mức tăng, không phải tổng. Đáp án: 'reaching an all-time high of 87 percent'." },
            { q: "When is the company retreat?", opts: [{ key: "A", text: "January 15th through 17th." }, { key: "B", text: "February 8th through 10th." }, { key: "C", text: "March 1st through 3rd." }, { key: "D", text: "December 1st through 3rd." }], a: "B", exp: "Bẫy: December 1st là ngày Karen bắt đầu. Retreat: 'February 8th through 10th at the Lakeview Grand Resort'." }
          ]
        },
        // TALK 9 (Q95-97): Company policy update
        {
          transcript: "Attention all employees. This is a reminder from the Human Resources department regarding the updated travel and expense reimbursement policy that takes effect on November 1st. Under the new guidelines, all domestic business trips must be approved by your department head at least five business days before the travel date, up from the previous three-day requirement. International travel now requires additional approval from the VP of Finance. Hotel accommodations are capped at 200 dollars per night for domestic travel and 300 dollars per night for international destinations. All expense reports must be submitted within 10 business days of returning from a trip, accompanied by original receipts or digital scans. Late submissions will not be processed until the following reimbursement cycle. For questions, contact HR at extension 4200.",
          questions: [
            { q: "When does the new policy take effect?", opts: [{ key: "A", text: "October 1st." }, { key: "B", text: "November 1st." }, { key: "C", text: "December 1st." }, { key: "D", text: "January 1st." }], a: "B", exp: "Đáp án: 'the updated travel and expense reimbursement policy that takes effect on November 1st'." },
            { q: "How far in advance must domestic trips be approved?", opts: [{ key: "A", text: "One business day." }, { key: "B", text: "Three business days." }, { key: "C", text: "Five business days." }, { key: "D", text: "Ten business days." }], a: "C", exp: "Bẫy: 3 ngày là quy định CŨ. Đáp án mới: 'at least five business days before the travel date, up from the previous three-day requirement'." },
            { q: "What is the hotel cap for international travel?", opts: [{ key: "A", text: "150 dollars per night." }, { key: "B", text: "200 dollars per night." }, { key: "C", text: "250 dollars per night." }, { key: "D", text: "300 dollars per night." }], a: "D", exp: "Bẫy: $200 là cap cho domestic. International: '300 dollars per night for international destinations'." }
          ]
        },
        // TALK 10 (Q98-100): Real estate listing presentation
        {
          transcript: "Thank you for joining today's virtual open house for 742 Riverside Drive, a stunning four-bedroom colonial-style residence in the highly sought-after Westlake neighborhood. This property was completely renovated in 2025 and features a gourmet kitchen with granite countertops and stainless steel appliances, hardwood floors throughout, a finished basement with a home theater, and a landscaped backyard with an in-ground heated swimming pool. The property sits on a quarter-acre lot and is located just a five-minute walk from Westlake Elementary School and the Metro Green Line station. It is listed at 875,000 dollars, and the sellers are open to reasonable offers. Private viewings can be arranged by contacting our office at 555-0298. Open house visits are available this Saturday and Sunday from 1 to 4 PM.",
          questions: [
            { q: "How many bedrooms does the property have?", opts: [{ key: "A", text: "Two bedrooms." }, { key: "B", text: "Three bedrooms." }, { key: "C", text: "Four bedrooms." }, { key: "D", text: "Five bedrooms." }], a: "C", exp: "Đáp án: 'a stunning four-bedroom colonial-style residence'." },
            { q: "What is the listing price?", opts: [{ key: "A", text: "675,000 dollars." }, { key: "B", text: "775,000 dollars." }, { key: "C", text: "875,000 dollars." }, { key: "D", text: "975,000 dollars." }], a: "C", exp: "Giá niêm yết: 'listed at 875,000 dollars'." },
            { q: "When are open house visits available?", opts: [{ key: "A", text: "Weekdays from 9 AM to 5 PM." }, { key: "B", text: "Saturday and Sunday from 1 to 4 PM." }, { key: "C", text: "By appointment only on Mondays." }, { key: "D", text: "Every evening from 6 to 8 PM." }], a: "B", exp: "Lịch tham quan: 'this Saturday and Sunday from 1 to 4 PM'." }
          ]
        }
      ];

      let part4QNum = 71;
      part4Sets.forEach((set, setIndex) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr1_q${part4QNum}`,
            partNumber: 4,
            partTitle: "Part 4: Short Talks",
            section: "LISTENING",
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(setIndex % 4) + 1}.mp3`,
            passageText: `[Audio Transcript - Short Talk #${setIndex + 1}]\n"${set.transcript}"`,
            questionText: `Question ${part4QNum}: ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
          part4QNum++;
        });
      });

      // PART 5: INCOMPLETE SENTENCES (Q101 - Q130: 30 UNIQUE ETS GRAMMAR & VOCAB QUESTIONS)
      // PART 5: INCOMPLETE SENTENCES (Q101 - Q130: 30 FULLY UNIQUE ETS GRAMMAR & VOCAB QUESTIONS)
      const part5Data: { q: string; a: "A"|"B"|"C"|"D"; opts: { key: string; text: string }[]; exp: string }[] = [
        { q: "Mr. Henderson will review the annual budget proposal _______ submitting it to the board of directors.", a: "A", opts: [{ key: "A", text: "prior to" }, { key: "B", text: "instead" }, { key: "C", text: "ahead" }, { key: "D", text: "because" }], exp: "Cụm 'prior to + V-ing' có nghĩa là 'trước khi'. 'Instead' cần 'of', 'ahead' cần 'of'." },
        { q: "The new marketing strategy was _______ successful in expanding our customer base in South America.", a: "C", opts: [{ key: "A", text: "exceed" }, { key: "B", text: "excessive" }, { key: "C", text: "exceedingly" }, { key: "D", text: "exceeding" }], exp: "Trạng từ 'exceedingly' bổ nghĩa cho tính từ 'successful'. Cần adverb, không phải adjective." },
        { q: "All conference attendees are requested to check in at the reception desk _______ arrival.", a: "B", opts: [{ key: "A", text: "at" }, { key: "B", text: "upon" }, { key: "C", text: "with" }, { key: "D", text: "from" }], exp: "Cụm cố định 'upon arrival' = 'ngay khi đến nơi'. 'At arrival' không tự nhiên trong tiếng Anh." },
        { q: "Ms. Tanaka handled the client contract negotiations with remarkable professionalism and _______.", a: "C", opts: [{ key: "A", text: "efficient" }, { key: "B", text: "efficiently" }, { key: "C", text: "efficiency" }, { key: "D", text: "efficiencies" }], exp: "Danh từ 'efficiency' đứng sau 'and' song song với danh từ 'professionalism'. Quy tắc cấu trúc song song." },
        { q: "The revised employee handbook contains updated guidelines concerning workplace safety _______.", a: "D", opts: [{ key: "A", text: "procedure" }, { key: "B", text: "procedural" }, { key: "C", text: "procedurally" }, { key: "D", text: "procedures" }], exp: "Danh từ số nhiều 'procedures' làm tân ngữ. Chỗ trống cần danh từ số nhiều vì nói đến nhiều quy trình." },
        { q: "Please ensure that all financial reports are checked _______ before submitting them to the auditor.", a: "A", opts: [{ key: "A", text: "thoroughly" }, { key: "B", text: "thorough" }, { key: "C", text: "thoroughness" }, { key: "D", text: "through" }], exp: "Trạng từ 'thoroughly' bổ nghĩa cho động từ bị động 'are checked'. Bẫy: 'through' (giới từ) phát âm gần giống." },
        { q: "The factory's annual production output has increased _______ since the installation of the automated assembly line.", a: "B", opts: [{ key: "A", text: "significance" }, { key: "B", text: "significantly" }, { key: "C", text: "significant" }, { key: "D", text: "signify" }], exp: "Trạng từ 'significantly' bổ nghĩa cho động từ 'has increased'. Vị trí sau động từ cần adverb." },
        { q: "_______ the unfavorable weather conditions, the outdoor charity event proceeded as originally planned.", a: "D", opts: [{ key: "A", text: "Although" }, { key: "B", text: "Because" }, { key: "C", text: "Since" }, { key: "D", text: "Despite" }], exp: "'Despite + noun phrase' thể hiện sự tương phản. 'Although' cần theo sau bởi mệnh đề (S + V), không phải cụm danh từ." },
        { q: "Employees who wish to participate in the wellness program must submit their registration forms _______ October 15.", a: "A", opts: [{ key: "A", text: "no later than" }, { key: "B", text: "as soon" }, { key: "C", text: "up until to" }, { key: "D", text: "no early than" }], exp: "Cụm 'no later than' = 'chậm nhất là'. 'As soon' thiếu 'as'. 'Up until to' sai ngữ pháp." },
        { q: "The seminar on digital marketing strategies was _______ attended by professionals from various industries.", a: "C", opts: [{ key: "A", text: "good" }, { key: "B", text: "best" }, { key: "C", text: "well" }, { key: "D", text: "better" }], exp: "Trạng từ 'well' bổ nghĩa cho quá khứ phân từ 'attended'. Bẫy: 'good' là tính từ, không dùng bổ nghĩa động từ." },
        { q: "The board of directors has decided to _______ the merger negotiations until a more favorable market condition emerges.", a: "B", opts: [{ key: "A", text: "prolong" }, { key: "B", text: "postpone" }, { key: "C", text: "promote" }, { key: "D", text: "proceed" }], exp: "'Postpone' = hoãn lại. 'Prolong' = kéo dài (không phải hoãn). Từ vựng kinh doanh chuyên sâu." },
        { q: "A _______ review of the company's cybersecurity infrastructure will be conducted by an external consulting firm next quarter.", a: "A", opts: [{ key: "A", text: "comprehensive" }, { key: "B", text: "comprehensively" }, { key: "C", text: "comprehend" }, { key: "D", text: "comprehension" }], exp: "Tính từ 'comprehensive' bổ nghĩa cho danh từ 'review'. Vị trí trước danh từ cần adjective." },
        { q: "The regional manager, along with her entire support staff, _______ expected to attend the annual conference in Munich.", a: "D", opts: [{ key: "A", text: "are" }, { key: "B", text: "were" }, { key: "C", text: "have been" }, { key: "D", text: "is" }], exp: "Đố mẹo: 'along with' không thay đổi chủ ngữ. Chủ ngữ chính là 'The regional manager' (số ít) → 'is'. Nhiều thí sinh nhầm chọn 'are'." },
        { q: "All job applicants are required to provide at least two professional _______ with their application materials.", a: "C", opts: [{ key: "A", text: "refer" }, { key: "B", text: "referral" }, { key: "C", text: "references" }, { key: "D", text: "referencing" }], exp: "Danh từ 'references' (người tham chiếu/giới thiệu). 'Referral' là hành vi giới thiệu, không phải người." },
        { q: "The company offers _______ parking for all employees who work at the downtown headquarters.", a: "B", opts: [{ key: "A", text: "compliment" }, { key: "B", text: "complimentary" }, { key: "C", text: "complementary" }, { key: "D", text: "complement" }], exp: "Đố mẹo từ gần nghĩa: 'complimentary' = miễn phí/khen. 'Complementary' = bổ sung. Hai từ phát âm gần giống nhau — bẫy kinh điển TOEIC." },
        { q: "It is _______ that all employees complete the mandatory safety training before accessing the laboratory.", a: "A", opts: [{ key: "A", text: "imperative" }, { key: "B", text: "imperatively" }, { key: "C", text: "imperate" }, { key: "D", text: "imperating" }], exp: "Tính từ 'imperative' đứng sau 'It is' trong cấu trúc 'It is imperative that...' (bắt buộc)." },
        { q: "The keynote speaker's presentation was both informative and _______, receiving a standing ovation from the audience.", a: "D", opts: [{ key: "A", text: "inspire" }, { key: "B", text: "inspiration" }, { key: "C", text: "inspiringly" }, { key: "D", text: "inspiring" }], exp: "Cấu trúc song song: 'both informative AND inspiring' — hai tính từ. 'Inspiringly' là trạng từ, không song song." },
        { q: "_______ having over fifteen years of industry experience, Ms. Rivera was not selected for the executive position.", a: "C", opts: [{ key: "A", text: "Although" }, { key: "B", text: "Because of" }, { key: "C", text: "In spite of" }, { key: "D", text: "Due to" }], exp: "'In spite of + V-ing' = mặc dù. 'Although' cần mệnh đề đầy đủ (S+V). 'Because of' / 'Due to' không thể hiện nghĩa tương phản." },
        { q: "The marketing department needs to finalize the advertising budget _______ the campaign launch date approaches.", a: "B", opts: [{ key: "A", text: "during" }, { key: "B", text: "before" }, { key: "C", text: "while" }, { key: "D", text: "until" }], exp: "'Before' + mệnh đề = trước khi. 'During' + danh từ (không dùng trước mệnh đề)." },
        { q: "The newly appointed director of operations has demonstrated _______ leadership skills during the transition period.", a: "A", opts: [{ key: "A", text: "exceptional" }, { key: "B", text: "exception" }, { key: "C", text: "exceptionally" }, { key: "D", text: "excepting" }], exp: "Tính từ 'exceptional' bổ nghĩa cho danh từ 'leadership skills'. Bẫy: 'exceptionally' là trạng từ." },
        { q: "The shareholders expressed their _______ about the declining quarterly revenues during the annual meeting.", a: "D", opts: [{ key: "A", text: "concern" }, { key: "B", text: "concerned" }, { key: "C", text: "concerning" }, { key: "D", text: "concerns" }], exp: "Danh từ số nhiều 'concerns' (nhiều mối lo ngại) phù hợp với đại từ sở hữu 'their'. 'Concern' số ít cũng đúng ngữ pháp nhưng kém tự nhiên." },
        { q: "The construction of the new corporate headquarters is expected to be completed _______ the end of next fiscal year.", a: "B", opts: [{ key: "A", text: "until" }, { key: "B", text: "by" }, { key: "C", text: "within" }, { key: "D", text: "since" }], exp: "'By + thời điểm' = trước thời điểm đó (deadline). 'Until' = liên tục cho đến. 'Within' + khoảng thời gian." },
        { q: "Candidates who _______ the initial screening will be contacted for a second-round interview within two weeks.", a: "C", opts: [{ key: "A", text: "will pass" }, { key: "B", text: "had passed" }, { key: "C", text: "pass" }, { key: "D", text: "passing" }], exp: "Mệnh đề quan hệ 'who + V hiện tại đơn' cho sự kiện tương lai trong mệnh đề điều kiện/thời gian. 'Will pass' sai vì trong mệnh đề phụ." },
        { q: "The company's new remote work policy allows employees to work from home _______ they maintain their productivity targets.", a: "A", opts: [{ key: "A", text: "provided that" }, { key: "B", text: "in order to" }, { key: "C", text: "so that" }, { key: "D", text: "even though" }], exp: "'Provided that' = với điều kiện là. Liên từ chỉ điều kiện. 'Even though' = mặc dù (nghĩa tương phản, sai ngữ cảnh)." },
        { q: "Customer satisfaction surveys indicate that our delivery service is _______ superior to that of our main competitors.", a: "B", opts: [{ key: "A", text: "consider" }, { key: "B", text: "considerably" }, { key: "C", text: "considerable" }, { key: "D", text: "considerate" }], exp: "Trạng từ 'considerably' bổ nghĩa cho tính từ so sánh 'superior'. Bẫy: 'considerate' = chu đáo (nghĩa hoàn toàn khác)." },
        { q: "Each department is _______ for submitting a detailed quarterly report to the executive committee.", a: "D", opts: [{ key: "A", text: "response" }, { key: "B", text: "respond" }, { key: "C", text: "responsive" }, { key: "D", text: "responsible" }], exp: "'Is responsible for + V-ing' = chịu trách nhiệm. 'Responsive' = nhanh phản hồi (khác nghĩa)." },
        { q: "The warranty on all electronic products purchased from our store is _______ for a period of two years from the date of purchase.", a: "C", opts: [{ key: "A", text: "validate" }, { key: "B", text: "validly" }, { key: "C", text: "valid" }, { key: "D", text: "validation" }], exp: "'Is valid for + period' = có hiệu lực trong. Tính từ 'valid' đứng sau 'is'." },
        { q: "The hotel management has received numerous _______ from guests regarding the quality of the renovated spa facilities.", a: "A", opts: [{ key: "A", text: "compliments" }, { key: "B", text: "compliant" }, { key: "C", text: "complaints" }, { key: "D", text: "compilations" }], exp: "Đố mẹo: ngữ cảnh tích cực ('regarding the quality') → 'compliments' (lời khen). 'Complaints' = khiếu nại (ngược nghĩa). Phải đọc kỹ ngữ cảnh." },
        { q: "The research team's findings were _______ documented in a comprehensive report distributed to all stakeholders.", a: "B", opts: [{ key: "A", text: "meticulous" }, { key: "B", text: "meticulously" }, { key: "C", text: "meticulousness" }, { key: "D", text: "meticulosity" }], exp: "Trạng từ 'meticulously' bổ nghĩa cho quá khứ phân từ 'documented'. 'Meticulous' là tính từ." },
        { q: "Due to _______ demand for the new smartphone model, the company has decided to increase production capacity by 40 percent.", a: "D", opts: [{ key: "A", text: "overwhelm" }, { key: "B", text: "overwhelmed" }, { key: "C", text: "overwhelmingly" }, { key: "D", text: "overwhelming" }], exp: "'Overwhelming demand' = nhu cầu áp đảo. Tính từ V-ing bổ nghĩa cho danh từ 'demand'. 'Overwhelmed' dùng cho người, không phải vật." },
        { q: "The annual charity gala raised _______ three million dollars for children's education programs across the country.", a: "C", opts: [{ key: "A", text: "approximation" }, { key: "B", text: "approximate" }, { key: "C", text: "approximately" }, { key: "D", text: "approximated" }], exp: "Trạng từ 'approximately' bổ nghĩa cho số lượng 'three million dollars'. Đứng trước số liệu." }
      ];

      for (let qNum = 101; qNum <= 130; qNum++) {
        const item = part5Data[qNum - 101];
        qs.push({
          id: `tlr1_q${qNum}`,
          partNumber: 5,
          partTitle: "Part 5: Incomplete Sentences",
          section: "READING",
          questionText: `${qNum}. ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      }

      // PART 6: TEXT COMPLETION (Q131 - Q146: 4 PASSAGES × 4 QUESTIONS = 16 UNIQUE ETS QUESTIONS)
      const part6Sets: { passage: string; questions: { blank: number; q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        // PASSAGE 1: Internal memo about new health insurance
        {
          passage: "MEMORANDUM\nTo: All Full-Time Employees\nFrom: Human Resources Department\nDate: October 14, 2026\nSubject: Updated Health Insurance Benefits Package\n\nWe are pleased to announce that effective January 1, 2027, Apex Global will be transitioning to a new health insurance provider, MedGuard Premium. This change was made after an [131] _______ evaluation of several competing insurance carriers. The new plan offers expanded dental and vision coverage, lower copayment amounts for specialist visits, and access to a broader network of over 5,000 healthcare providers nationwide.\n\n[132] _______, employees will now have the option to enroll dependents under the age of 26 at no additional premium cost. All current employees must complete the online enrollment form by December 15, 2026. [133] _______ to do so by the deadline will result in automatic enrollment in the basic coverage tier.\n\nInformation sessions will be held in Conference Room B on November 3 and November 10 for employees who would like [134] _______ about the available plan options.",
          questions: [
            { blank: 131, q: "Select the most appropriate word for blank [131].", opts: [{ key: "A", text: "extend" }, { key: "B", text: "extensive" }, { key: "C", text: "extensively" }, { key: "D", text: "extension" }], a: "B", exp: "Tính từ 'extensive' bổ nghĩa cho danh từ 'evaluation'. Vị trí sau mạo từ 'an' cần adjective." },
            { blank: 132, q: "Select the most appropriate word for blank [132].", opts: [{ key: "A", text: "Furthermore" }, { key: "B", text: "On the contrary" }, { key: "C", text: "Nevertheless" }, { key: "D", text: "For instance" }], a: "A", exp: "'Furthermore' bổ sung thêm lợi ích mới (dependent coverage). 'On the contrary' dùng khi phản bác." },
            { blank: 133, q: "Select the most appropriate word for blank [133].", opts: [{ key: "A", text: "Neglect" }, { key: "B", text: "Failure" }, { key: "C", text: "Unable" }, { key: "D", text: "Failing" }], a: "B", exp: "Danh từ 'Failure' trong cấu trúc 'Failure to do something' = việc không thực hiện. 'Failing' cũng đúng ngữ pháp nhưng kém phổ biến trong văn bản hành chính." },
            { blank: 134, q: "Select the most appropriate word for blank [134].", opts: [{ key: "A", text: "to learn more" }, { key: "B", text: "learning more" }, { key: "C", text: "learn more" }, { key: "D", text: "have learned more" }], a: "A", exp: "Cấu trúc 'would like + to V' = muốn. 'Would like to learn more' là đúng ngữ pháp." }
          ]
        },
        // PASSAGE 2: Job posting
        {
          passage: "JOB POSTING — REGIONAL SALES MANAGER\nCompany: Apex Global Solutions\nLocation: Singapore Office | Reports to: VP of Sales, Asia-Pacific\n\nApex Global Solutions is seeking an experienced Regional Sales Manager to lead our expanding operations in Southeast Asia. The [135] _______ candidate will have a minimum of 8 years of B2B sales experience in the technology sector, with a proven track record of exceeding annual revenue targets.\n\nKey responsibilities include developing and executing regional sales strategies, managing a team of 15 sales representatives, and [136] _______ strong relationships with enterprise clients across Singapore, Malaysia, and Indonesia.\n\nWe offer a competitive base salary plus performance bonuses, comprehensive relocation [137] _______ for candidates currently based outside Singapore, and generous annual leave allowance.\n\n[138] _______. Interested applicants should submit their résumé and a cover letter to careers@apexglobal.com by November 30, 2026.",
          questions: [
            { blank: 135, q: "Select the most appropriate word for blank [135].", opts: [{ key: "A", text: "ideal" }, { key: "B", text: "ideally" }, { key: "C", text: "idealize" }, { key: "D", text: "idealism" }], a: "A", exp: "Tính từ 'ideal' bổ nghĩa cho danh từ 'candidate'. 'Ideally' là trạng từ — sai vị trí." },
            { blank: 136, q: "Select the most appropriate word for blank [136].", opts: [{ key: "A", text: "build" }, { key: "B", text: "built" }, { key: "C", text: "building" }, { key: "D", text: "to build" }], a: "C", exp: "Cấu trúc song song: 'developing..., managing..., AND building...' — ba V-ing forms nối với nhau." },
            { blank: 137, q: "Select the most appropriate word for blank [137].", opts: [{ key: "A", text: "assistance" }, { key: "B", text: "assistant" }, { key: "C", text: "assist" }, { key: "D", text: "assisted" }], a: "A", exp: "Danh từ 'assistance' (sự hỗ trợ) sau 'relocation'. 'Assistant' = trợ lý (người), sai ngữ cảnh." },
            { blank: 138, q: "Select the best sentence for blank [138].", opts: [{ key: "A", text: "The office will be closed for renovations during December." }, { key: "B", text: "Previous applicants need not reapply for this position." }, { key: "C", text: "The company was founded in 1998 by two Stanford graduates." }, { key: "D", text: "Only shortlisted candidates will be contacted for interviews within two weeks of the application deadline." }], a: "D", exp: "Đoạn văn kết thúc bằng hướng dẫn ứng tuyển → câu D cung cấp thông tin về quy trình sau khi nộp hồ sơ (liên quan nhất)." }
          ]
        },
        // PASSAGE 3: Factory safety update
        {
          passage: "SAFETY BULLETIN — QUARTERLY UPDATE\nIssuance Date: October 1, 2026\nFacility: Apex National Manufacturing Plant — Building C\n\nFollowing the routine safety audit conducted on September 22, several areas for improvement were [139] _______. The fire suppression system in Assembly Hall 4 requires recalibration, and two emergency exit signs on the ground floor need [140] _______.\n\nAll floor supervisors are reminded to conduct weekly equipment inspections [141] _______ the updated Safety Protocol Manual, Version 4.2, which was distributed electronically last Friday. Hardcopy versions are available from the Safety Office upon request.\n\n[142] _______, all employees must complete the annual fire safety refresher course by October 31. Online registration is available through the employee training portal.",
          questions: [
            { blank: 139, q: "Select the most appropriate word for blank [139].", opts: [{ key: "A", text: "identified" }, { key: "B", text: "identify" }, { key: "C", text: "identifying" }, { key: "D", text: "identification" }], a: "A", exp: "Quá khứ phân từ 'identified' trong câu bị động 'were identified'. Chỗ trống cần past participle." },
            { blank: 140, q: "Select the most appropriate word for blank [140].", opts: [{ key: "A", text: "replace" }, { key: "B", text: "replacing" }, { key: "C", text: "replacement" }, { key: "D", text: "replaced" }], a: "C", exp: "Danh từ 'replacement' trong cấu trúc 'need + noun'. Cũng chấp nhận 'need replacing' / 'need to be replaced', nhưng 'replacement' phù hợp nhất trong danh sách." },
            { blank: 141, q: "Select the most appropriate word for blank [141].", opts: [{ key: "A", text: "in accordance with" }, { key: "B", text: "in addition to" }, { key: "C", text: "in contrast to" }, { key: "D", text: "in spite of" }], a: "A", exp: "'In accordance with' = theo đúng/phù hợp với. Kiểm tra theo sổ tay quy trình. Các cụm còn lại không hợp ngữ cảnh." },
            { blank: 142, q: "Select the most appropriate word for blank [142].", opts: [{ key: "A", text: "Consequently" }, { key: "B", text: "In addition" }, { key: "C", text: "However" }, { key: "D", text: "On the other hand" }], a: "B", exp: "'In addition' bổ sung yêu cầu mới (fire safety course). 'However' / 'On the other hand' dùng khi tương phản — sai logic." }
          ]
        },
        // PASSAGE 4: International seminar invitation
        {
          passage: "INVITATION — INTERNATIONAL LEADERSHIP SUMMIT 2027\n\nDear Valued Partner,\n\nWe are delighted to invite you to the 12th Annual International Leadership Summit, taking place from March 15 to 17, 2027, at the Grand Hyatt Convention Center in Tokyo, Japan.\n\nThis year's theme, 'Sustainable Innovation in the Digital Age,' will feature keynote addresses from [143] _______ recognized industry leaders, including Dr. Yuki Tanaka of the Tokyo Institute of Technology and Mr. Ricardo Alvarez, CEO of Alvarez Ventures.\n\nEarly bird registration at a 25% discounted rate is available for [144] _______ received before January 15, 2027. Standard registration [145] _______ $1,200 per attendee and includes all conference materials, lunches, and networking receptions.\n\n[146] _______. We look forward to welcoming you in Tokyo.",
          questions: [
            { blank: 143, q: "Select the most appropriate word for blank [143].", opts: [{ key: "A", text: "internationally" }, { key: "B", text: "international" }, { key: "C", text: "internationalize" }, { key: "D", text: "internationalism" }], a: "A", exp: "Trạng từ 'internationally' bổ nghĩa cho quá khứ phân từ/tính từ 'recognized'. 'Internationally recognized' = được công nhận quốc tế." },
            { blank: 144, q: "Select the most appropriate word for blank [144].", opts: [{ key: "A", text: "register" }, { key: "B", text: "registered" }, { key: "C", text: "registrations" }, { key: "D", text: "registering" }], a: "C", exp: "Danh từ 'registrations' là chủ ngữ của mệnh đề 'received before January 15'. Câu bị lược: 'registrations [that are] received'." },
            { blank: 145, q: "Select the most appropriate word for blank [145].", opts: [{ key: "A", text: "costs" }, { key: "B", text: "is costing" }, { key: "C", text: "costed" }, { key: "D", text: "has cost" }], a: "A", exp: "'Standard registration costs $1,200' — thì hiện tại đơn cho sự thật/quy định. 'Costed' không đúng dạng phổ biến." },
            { blank: 146, q: "Select the best sentence for blank [146].", opts: [{ key: "A", text: "The hotel was built in 1987 and has undergone several expansions." }, { key: "B", text: "To reserve your place, please complete the attached registration form and return it by email to events@leadershipsummit.org." }, { key: "C", text: "The weather in Tokyo during March is typically mild with occasional rain showers." }, { key: "D", text: "Dr. Tanaka's latest research paper was published in the Journal of Sustainable Technologies." }], a: "B", exp: "Đoạn cuối cần hướng dẫn hành động (call to action). Câu B: hướng dẫn đăng ký — phù hợp nhất." }
          ]
        }
      ];

      part6Sets.forEach((set, setIndex) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr1_q${qItem.blank}`,
            partNumber: 6,
            partTitle: "Part 6: Text Completion",
            section: "READING",
            passageText: set.passage,
            questionText: `${qItem.blank}. ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
        });
      });

      // PART 7: READING COMPREHENSION (Q147 - Q200: 54 UNIQUE QUESTIONS)
      // SINGLE PASSAGES (Q147-Q175: 6 passages, ~29 questions)
      // DOUBLE/TRIPLE PASSAGES (Q176-Q200: 5 sets, 25 questions)
      const part7Sets: { passages: string; questions: { qNum: number; q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        // SINGLE 1 (Q147-151): Financial consulting advertisement
        {
          passages: "[ADVERTISEMENT]\n\nPRIME FINANCIAL ADVISORS — Your Trusted Partner Since 2005\n\nAre you planning for retirement, managing a growing investment portfolio, or navigating complex tax regulations? Prime Financial Advisors offers personalized wealth management solutions for individuals and small businesses.\n\nOur Services:\n• Comprehensive retirement planning and 401(k) optimization\n• Tax-efficient investment strategies for portfolios over $100,000\n• Estate planning and trust administration\n• Small business accounting and quarterly tax filing\n\nWhy Choose Us?\n— Over 200 certified financial planners across 15 offices nationwide\n— Named \"Top Regional Advisory Firm\" by Financial Weekly Magazine for three consecutive years (2024-2026)\n— Free 30-minute initial consultation for new clients\n\nSchedule your complimentary consultation today!\nCall: 1-800-555-PRIME | Visit: www.primefinancial.com\nOffice Hours: Monday-Friday 8:00 AM - 6:00 PM | Saturday 9:00 AM - 1:00 PM",
          questions: [
            { qNum: 147, q: "What is the purpose of this advertisement?", opts: [{ key: "A", text: "To recruit certified financial planners." }, { key: "B", text: "To promote financial advisory services." }, { key: "C", text: "To announce a merger between two firms." }, { key: "D", text: "To report quarterly earnings results." }], a: "B", exp: "Quảng cáo giới thiệu dịch vụ tư vấn tài chính cho khách hàng cá nhân và doanh nghiệp nhỏ." },
            { qNum: 148, q: "How long has Prime Financial Advisors been in operation?", opts: [{ key: "A", text: "Since 2000." }, { key: "B", text: "Since 2005." }, { key: "C", text: "Since 2010." }, { key: "D", text: "Since 2015." }], a: "B", exp: "Đáp án: 'Your Trusted Partner Since 2005'." },
            { qNum: 149, q: "What is offered to new clients at no charge?", opts: [{ key: "A", text: "A full portfolio analysis report." }, { key: "B", text: "A 30-minute initial consultation." }, { key: "C", text: "A one-year subscription to Financial Weekly." }, { key: "D", text: "A personalized retirement savings plan." }], a: "B", exp: "Miễn phí: 'Free 30-minute initial consultation for new clients'." },
            { qNum: 150, q: "What minimum portfolio size qualifies for tax-efficient strategies?", opts: [{ key: "A", text: "$50,000." }, { key: "B", text: "$75,000." }, { key: "C", text: "$100,000." }, { key: "D", text: "$200,000." }], a: "C", exp: "Đáp án: 'Tax-efficient investment strategies for portfolios over $100,000'." },
            { qNum: 151, q: "When is the office open on Saturdays?", opts: [{ key: "A", text: "8:00 AM - 6:00 PM." }, { key: "B", text: "9:00 AM - 1:00 PM." }, { key: "C", text: "10:00 AM - 2:00 PM." }, { key: "D", text: "It is closed on Saturdays." }], a: "B", exp: "Bẫy: giờ mở cửa ngày thường khác với thứ Bảy. Saturday: '9:00 AM - 1:00 PM'." }
          ]
        },
        // SINGLE 2 (Q152-155): Hotel booking confirmation email
        {
          passages: "[EMAIL]\nFrom: reservations@grandharborhotel.com\nTo: sarah.mitchell@apexconsulting.com\nDate: October 10, 2026\nSubject: Booking Confirmation — Reservation #GH-88421\n\nDear Ms. Mitchell,\n\nThank you for choosing the Grand Harbor Hotel for your upcoming business trip. Below are the details of your confirmed reservation:\n\n• Guest Name: Sarah Mitchell\n• Check-in: Wednesday, October 23, 2026 (3:00 PM)\n• Check-out: Friday, October 25, 2026 (11:00 AM)\n• Room Type: Executive Suite, 12th Floor, Harbor View\n• Rate: $289 per night (Corporate Rate — Apex Consulting discount applied)\n• Total: $578 (2 nights)\n• Breakfast: Complimentary full buffet breakfast included for all Executive Suite guests\n• Parking: Valet parking available at $25 per day\n\nPlease note that cancellations must be made at least 48 hours before check-in to avoid a one-night charge. If you need to modify your reservation, please call our front desk at (555) 234-8900 or reply to this email.\n\nWe look forward to welcoming you.\n\nBest regards,\nMaria Gonzalez\nReservations Manager",
          questions: [
            { qNum: 152, q: "How many nights will Ms. Mitchell stay?", opts: [{ key: "A", text: "One night." }, { key: "B", text: "Two nights." }, { key: "C", text: "Three nights." }, { key: "D", text: "Four nights." }], a: "B", exp: "Check-in Oct 23, check-out Oct 25 = 2 đêm. Total: '$578 (2 nights)' xác nhận." },
            { qNum: 153, q: "What is included with the Executive Suite?", opts: [{ key: "A", text: "Free airport shuttle service." }, { key: "B", text: "Complimentary full buffet breakfast." }, { key: "C", text: "A spa treatment voucher." }, { key: "D", text: "Free valet parking." }], a: "B", exp: "Bẫy: valet parking tính $25/ngày (không miễn phí). Đáp án: 'Complimentary full buffet breakfast included for all Executive Suite guests'." },
            { qNum: 154, q: "What happens if the reservation is canceled less than 48 hours before check-in?", opts: [{ key: "A", text: "A full refund is issued." }, { key: "B", text: "The reservation is automatically rescheduled." }, { key: "C", text: "A one-night charge will be applied." }, { key: "D", text: "A $50 administrative fee is charged." }], a: "C", exp: "Chính sách: 'cancellations must be made at least 48 hours before check-in to avoid a one-night charge'." },
            { qNum: 155, q: "Who sent the confirmation email?", opts: [{ key: "A", text: "Sarah Mitchell." }, { key: "B", text: "The front desk receptionist." }, { key: "C", text: "Maria Gonzalez, Reservations Manager." }, { key: "D", text: "The hotel general manager." }], a: "C", exp: "Người gửi: 'Maria Gonzalez, Reservations Manager'." }
          ]
        },
        // SINGLE 3 (Q156-159): Technology article
        {
          passages: "[ARTICLE]\n\nThe Rise of AI-Powered Customer Service in Retail Banking\nBy Jonathan Park | Financial Technology Review | October 8, 2026\n\nArtificial intelligence is rapidly transforming the way retail banks interact with their customers. A recent study by the Global Banking Research Institute found that 67 percent of major banks in North America have deployed AI-powered chatbot systems for handling routine customer inquiries such as account balance checks, transaction history, and password resets.\n\nAccording to the study, banks that implemented AI chatbots experienced a 42 percent reduction in average call center wait times and a 28 percent decrease in operational costs related to customer support. However, the study also noted that customer satisfaction scores remained higher for human-assisted interactions, particularly for complex issues like loan applications and fraud investigations.\n\nDr. Lisa Chen, director of the research institute, emphasized that AI should complement rather than replace human agents. \"The most effective model is a hybrid approach where AI handles simple, high-volume requests while human specialists focus on complex, emotionally sensitive matters,\" she explained.\n\nSeveral banks, including Meridian National and Pacific Coast Financial, have already adopted this hybrid model, reporting both cost savings and improved customer satisfaction ratings.",
          questions: [
            { qNum: 156, q: "What percentage of major North American banks use AI chatbots?", opts: [{ key: "A", text: "28 percent." }, { key: "B", text: "42 percent." }, { key: "C", text: "67 percent." }, { key: "D", text: "85 percent." }], a: "C", exp: "Bẫy: 42% là giảm thời gian chờ, 28% là giảm chi phí. Đáp án: '67 percent of major banks have deployed AI-powered chatbot systems'." },
            { qNum: 157, q: "What does Dr. Chen recommend?", opts: [{ key: "A", text: "Replacing all human agents with AI systems." }, { key: "B", text: "A hybrid model combining AI and human agents." }, { key: "C", text: "Discontinuing AI chatbot programs entirely." }, { key: "D", text: "Outsourcing customer service to third-party vendors." }], a: "B", exp: "Dr. Chen: 'The most effective model is a hybrid approach where AI handles simple, high-volume requests while human specialists focus on complex matters'." },
            { qNum: 158, q: "For which types of issues do customers prefer human agents?", opts: [{ key: "A", text: "Account balance checks and password resets." }, { key: "B", text: "Transaction history inquiries." }, { key: "C", text: "Loan applications and fraud investigations." }, { key: "D", text: "Branch location searches." }], a: "C", exp: "Đáp án: 'customer satisfaction scores remained higher for human-assisted interactions, particularly for complex issues like loan applications and fraud investigations'." },
            { qNum: 159, q: "What is the main topic of the article?", opts: [{ key: "A", text: "The decline of traditional banking branches." }, { key: "B", text: "New cybersecurity threats facing financial institutions." }, { key: "C", text: "The impact of AI on retail banking customer service." }, { key: "D", text: "Government regulations on automated trading systems." }], a: "C", exp: "Chủ đề chính: 'The Rise of AI-Powered Customer Service in Retail Banking'." }
          ]
        },
        // SINGLE 4 (Q160-163): Building maintenance notice
        {
          passages: "[NOTICE]\n\nATTENTION ALL TENANTS — PARKVIEW OFFICE TOWER\nBuilding Management Office\nDate: October 15, 2026\n\nRe: Scheduled Elevator Maintenance — November 4-6, 2026\n\nPlease be advised that elevators 1 and 2 (serving floors 1-15) will be out of service for mandatory safety inspection and modernization work from Monday, November 4 through Wednesday, November 6. During this period, elevator 3 (serving floors 1-20) will remain operational for all tenants.\n\nTo minimize inconvenience:\n• Tenants on floors 2-5 are encouraged to use the stairwell during the maintenance period\n• Deliveries exceeding 50 pounds should be scheduled before November 4 or after November 7\n• The freight elevator (accessible from the loading dock) will operate on a limited schedule from 7:00 AM to 12:00 PM daily during the maintenance window\n\nWe apologize for any inconvenience and appreciate your patience. For questions, please contact Building Management at extension 100 or email facilities@parkviewtower.com.\n\nRegards,\nParkview Building Management",
          questions: [
            { qNum: 160, q: "How long will elevators 1 and 2 be out of service?", opts: [{ key: "A", text: "One day." }, { key: "B", text: "Two days." }, { key: "C", text: "Three days." }, { key: "D", text: "One week." }], a: "C", exp: "Đáp án: 'from Monday, November 4 through Wednesday, November 6' = 3 ngày." },
            { qNum: 161, q: "Which elevator will continue to operate?", opts: [{ key: "A", text: "Elevator 1." }, { key: "B", text: "Elevator 2." }, { key: "C", text: "Elevator 3." }, { key: "D", text: "The freight elevator only." }], a: "C", exp: "Đáp án: 'elevator 3 (serving floors 1-20) will remain operational for all tenants'." },
            { qNum: 162, q: "When is the freight elevator available during maintenance?", opts: [{ key: "A", text: "24 hours a day." }, { key: "B", text: "7:00 AM to 12:00 PM." }, { key: "C", text: "8:00 AM to 5:00 PM." }, { key: "D", text: "It is completely shut down." }], a: "B", exp: "Lịch giới hạn: 'freight elevator will operate on a limited schedule from 7:00 AM to 12:00 PM daily'." },
            { qNum: 163, q: "What should tenants do with heavy deliveries?", opts: [{ key: "A", text: "Use elevator 3 exclusively." }, { key: "B", text: "Schedule them before Nov 4 or after Nov 7." }, { key: "C", text: "Carry them up the stairwell." }, { key: "D", text: "Have them held at the front desk." }], a: "B", exp: "Đáp án: 'Deliveries exceeding 50 pounds should be scheduled before November 4 or after November 7'." }
          ]
        },
        // SINGLE 5 (Q164-168): Product review on e-commerce site
        {
          passages: "[ONLINE PRODUCT REVIEW]\n\nProduct: Zenith UltraBook Pro 15 Laptop\nReviewer: TechEnthusiast_2026 | Rating: ★★★★☆ (4 out of 5)\nDate: September 28, 2026 | Verified Purchase\n\nI have been using the Zenith UltraBook Pro 15 for approximately three weeks now for both professional video editing and personal use, and overall I am very impressed with its performance.\n\nPros:\n• The 15.6-inch 4K OLED display is absolutely stunning — colors are vibrant and contrast ratios are excellent for editing high-resolution footage\n• The Intel i9 processor paired with 32GB of RAM handles multiple heavy applications simultaneously without any noticeable lag\n• Battery life consistently reaches 9-10 hours with moderate use, which is exceptional for a high-performance laptop\n• The aluminum unibody chassis feels premium and weighs only 4.2 pounds\n\nCons:\n• The built-in speakers are disappointingly weak for a laptop in this price range ($2,199) — external speakers or headphones are practically necessary\n• The webcam is only 720p, which is outdated for video conferencing in 2026\n• No SD card slot, which is inconvenient for photographers and videographers who frequently transfer files\n\nOverall, if you are a creative professional who needs a powerful, portable workstation with a gorgeous display, the UltraBook Pro 15 is an excellent choice. Just be prepared to invest in external speakers and a USB-C card reader.",
          questions: [
            { qNum: 164, q: "What is the reviewer's overall rating?", opts: [{ key: "A", text: "3 out of 5 stars." }, { key: "B", text: "4 out of 5 stars." }, { key: "C", text: "4.5 out of 5 stars." }, { key: "D", text: "5 out of 5 stars." }], a: "B", exp: "Rating: '★★★★☆ (4 out of 5)'." },
            { qNum: 165, q: "What does the reviewer praise most about the display?", opts: [{ key: "A", text: "Its touchscreen functionality." }, { key: "B", text: "Its vibrant colors and excellent contrast ratios." }, { key: "C", text: "Its anti-glare coating." }, { key: "D", text: "Its large 17-inch size." }], a: "B", exp: "Đáp án: 'colors are vibrant and contrast ratios are excellent for editing high-resolution footage'." },
            { qNum: 166, q: "What is a noted weakness of the laptop?", opts: [{ key: "A", text: "The processor is too slow for video editing." }, { key: "B", text: "The battery lasts less than 5 hours." }, { key: "C", text: "The built-in speakers are weak for the price point." }, { key: "D", text: "The laptop weighs over 7 pounds." }], a: "C", exp: "Nhược điểm: 'The built-in speakers are disappointingly weak for a laptop in this price range ($2,199)'." },
            { qNum: 167, q: "How much does the laptop cost?", opts: [{ key: "A", text: "$1,499." }, { key: "B", text: "$1,899." }, { key: "C", text: "$2,199." }, { key: "D", text: "$2,499." }], a: "C", exp: "Giá: '$2,199'." },
            { qNum: 168, q: "Who would benefit most from this laptop according to the reviewer?", opts: [{ key: "A", text: "Students looking for a budget-friendly option." }, { key: "B", text: "Creative professionals who need a powerful portable workstation." }, { key: "C", text: "Casual users who only browse the web and send emails." }, { key: "D", text: "Gamers who need a dedicated graphics card." }], a: "B", exp: "Đáp án: 'if you are a creative professional who needs a powerful, portable workstation with a gorgeous display'." }
          ]
        },
        // SINGLE 6 (Q169-175): Detailed job posting
        {
          passages: "[JOB POSTING]\n\nSENIOR DATA ENGINEER — Full-Time\nCompany: NovaTech Solutions | Location: Austin, TX (Hybrid — 3 days in-office)\nSalary Range: $135,000 - $165,000 annually + benefits\nPosted: October 1, 2026 | Application Deadline: November 15, 2026\n\nAbout the Role:\nNovaTech Solutions is seeking a Senior Data Engineer to design, build, and maintain our enterprise-scale data pipeline infrastructure. You will work closely with data scientists, product managers, and DevOps engineers to ensure reliable, scalable data delivery across all business units.\n\nRequired Qualifications:\n• Bachelor's degree in Computer Science, Data Engineering, or a related field\n• Minimum 5 years of professional experience with ETL/ELT pipeline development\n• Advanced proficiency in Python, SQL, and Apache Spark\n• Hands-on experience with cloud data platforms (AWS Redshift, Google BigQuery, or Snowflake)\n• Strong understanding of data governance and security best practices\n\nPreferred Qualifications:\n• Master's degree in a related field\n• Experience with real-time streaming technologies (Apache Kafka, Apache Flink)\n• AWS or GCP professional certification\n\nBenefits:\n• Comprehensive health, dental, and vision insurance\n• 401(k) with 6% company match\n• 20 days paid vacation + 10 paid holidays\n• $5,000 annual professional development budget\n• Flexible hybrid work schedule\n\nTo Apply: Submit your résumé and a portfolio of relevant projects to careers@novatech.com.",
          questions: [
            { qNum: 169, q: "What is the work arrangement for this position?", opts: [{ key: "A", text: "Fully remote." }, { key: "B", text: "Fully in-office, five days per week." }, { key: "C", text: "Hybrid — three days in-office." }, { key: "D", text: "Rotating shifts." }], a: "C", exp: "Đáp án: 'Hybrid — 3 days in-office'." },
            { qNum: 170, q: "What is the minimum required experience?", opts: [{ key: "A", text: "2 years." }, { key: "B", text: "3 years." }, { key: "C", text: "5 years." }, { key: "D", text: "8 years." }], a: "C", exp: "Đáp án: 'Minimum 5 years of professional experience with ETL/ELT pipeline development'." },
            { qNum: 171, q: "Which of the following is a PREFERRED rather than required qualification?", opts: [{ key: "A", text: "Bachelor's degree in Computer Science." }, { key: "B", text: "Proficiency in Python and SQL." }, { key: "C", text: "Experience with Apache Kafka." }, { key: "D", text: "Understanding of data governance." }], a: "C", exp: "Đố mẹo: phân biệt 'Required' vs 'Preferred'. Apache Kafka nằm trong mục Preferred Qualifications." },
            { qNum: 172, q: "How much is the company's 401(k) match?", opts: [{ key: "A", text: "3 percent." }, { key: "B", text: "4 percent." }, { key: "C", text: "5 percent." }, { key: "D", text: "6 percent." }], a: "D", exp: "Đáp án: '401(k) with 6% company match'." },
            { qNum: 173, q: "What is the salary range for this position?", opts: [{ key: "A", text: "$100,000 - $130,000." }, { key: "B", text: "$120,000 - $150,000." }, { key: "C", text: "$135,000 - $165,000." }, { key: "D", text: "$150,000 - $180,000." }], a: "C", exp: "Mức lương: '$135,000 - $165,000 annually + benefits'." },
            { qNum: 174, q: "What is the annual professional development budget?", opts: [{ key: "A", text: "$2,000." }, { key: "B", text: "$3,500." }, { key: "C", text: "$5,000." }, { key: "D", text: "$7,500." }], a: "C", exp: "Đáp án: '$5,000 annual professional development budget'." },
            { qNum: 175, q: "What must applicants submit?", opts: [{ key: "A", text: "A résumé and three references." }, { key: "B", text: "A résumé and a portfolio of relevant projects." }, { key: "C", text: "A cover letter and salary expectations." }, { key: "D", text: "A skills assessment test result." }], a: "B", exp: "Đáp án: 'Submit your résumé and a portfolio of relevant projects to careers@novatech.com'." }
          ]
        },
        // DOUBLE 1 (Q176-180): Complaint email + Company response email
        {
          passages: "[EMAIL 1]\nFrom: david.chen@email.com\nTo: support@novaelectronics.com\nDate: October 8, 2026\nSubject: Defective Wireless Headphones — Order #NE-77421\n\nDear Nova Electronics Support Team,\n\nI purchased a pair of Nova SoundMax Pro wireless headphones from your online store on September 25, 2026 (Order #NE-77421). Unfortunately, the noise-cancellation feature stopped working after only 10 days of use. I have already tried resetting the firmware as described in the user manual, but the issue persists.\n\nI would like to request either a replacement unit or a full refund. My original payment was made via credit card ending in 4821.\n\nPlease advise on the next steps, including whether I need to ship the defective unit back at my own expense.\n\nSincerely,\nDavid Chen\n\n---\n\n[EMAIL 2]\nFrom: support@novaelectronics.com\nTo: david.chen@email.com\nDate: October 9, 2026\nSubject: RE: Defective Wireless Headphones — Order #NE-77421\n\nDear Mr. Chen,\n\nThank you for reaching out. We sincerely apologize for the inconvenience. After reviewing your order, we are happy to offer the following options:\n\n1. Replacement: A brand-new Nova SoundMax Pro unit will be shipped to your address within 3-5 business days at no charge. A prepaid return shipping label will be emailed to you for the defective unit.\n\n2. Refund: A full refund of $149.99 will be processed to your credit card ending in 4821 within 7-10 business days.\n\n3. Upgrade: Exchange for the newer Nova SoundMax Elite model (retail price $199.99) with a 50% upgrade discount — you would only pay an additional $25.00.\n\nPlease reply to this email with your preferred option, and we will process it immediately. Again, we apologize for the inconvenience.\n\nBest regards,\nEmily Santos\nCustomer Support Specialist\nNova Electronics",
          questions: [
            { qNum: 176, q: "What is the problem with Mr. Chen's headphones?", opts: [{ key: "A", text: "The Bluetooth connection frequently drops." }, { key: "B", text: "The noise-cancellation feature stopped working." }, { key: "C", text: "The battery does not charge properly." }, { key: "D", text: "One earbud produces no sound." }], a: "B", exp: "Đáp án: 'the noise-cancellation feature stopped working after only 10 days of use'." },
            { qNum: 177, q: "How much did the original headphones cost?", opts: [{ key: "A", text: "$99.99." }, { key: "B", text: "$129.99." }, { key: "C", text: "$149.99." }, { key: "D", text: "$199.99." }], a: "C", exp: "Bẫy: $199.99 là giá Elite model. Giá SoundMax Pro: 'A full refund of $149.99'." },
            { qNum: 178, q: "How much would Mr. Chen pay for the upgrade option?", opts: [{ key: "A", text: "$15.00." }, { key: "B", text: "$25.00." }, { key: "C", text: "$50.00." }, { key: "D", text: "$99.99." }], a: "B", exp: "Đố mẹo tính toán: Elite = $199.99, 50% discount = $100. Trả $149.99 gốc → chênh '$25.00'. Email nói rõ 'you would only pay an additional $25.00'." },
            { qNum: 179, q: "Who responded to Mr. Chen's complaint?", opts: [{ key: "A", text: "The store manager." }, { key: "B", text: "The shipping department." }, { key: "C", text: "Emily Santos, Customer Support Specialist." }, { key: "D", text: "The product development team." }], a: "C", exp: "Ký tên: 'Emily Santos, Customer Support Specialist'." },
            { qNum: 180, q: "What has Mr. Chen already tried to fix the issue?", opts: [{ key: "A", text: "He took the headphones to a repair shop." }, { key: "B", text: "He reset the firmware as described in the manual." }, { key: "C", text: "He replaced the ear cushions." }, { key: "D", text: "He updated the Bluetooth driver on his phone." }], a: "B", exp: "Đáp án: 'I have already tried resetting the firmware as described in the user manual'." }
          ]
        },
        // DOUBLE 2 (Q181-185): Job advertisement + Application email
        {
          passages: "[DOCUMENT 1 — JOB ADVERTISEMENT]\n\nMARKETING COORDINATOR — Apex Hospitality Group\nLocation: Miami, FL | Type: Full-Time\nSalary: $52,000 - $60,000 per year\n\nApex Hospitality Group is seeking a creative Marketing Coordinator to join our brand team. The ideal candidate will have 2+ years of marketing experience in the hospitality or tourism industry, proficiency in Adobe Creative Suite and social media analytics tools, and a bachelor's degree in Marketing or Communications.\n\nKey Responsibilities:\n• Manage social media campaigns across Instagram, Facebook, and LinkedIn\n• Coordinate with external agencies on print and digital advertising\n• Analyze campaign performance metrics and prepare monthly reports\n• Organize promotional events and media partnerships\n\nApply by October 31, 2026 to hr@apexhospitality.com with your résumé, portfolio, and two professional references.\n\n---\n\n[DOCUMENT 2 — APPLICATION EMAIL]\nFrom: jessica.morales@email.com\nTo: hr@apexhospitality.com\nDate: October 18, 2026\nSubject: Application for Marketing Coordinator Position\n\nDear Hiring Manager,\n\nI am writing to express my interest in the Marketing Coordinator position at Apex Hospitality Group. I hold a bachelor's degree in Digital Marketing from the University of Miami and have three years of experience as a Marketing Assistant at Coral Bay Resort, where I managed social media accounts with a combined following of over 85,000 users and increased engagement rates by 34 percent.\n\nI am proficient in Adobe Photoshop, Illustrator, and InDesign, as well as analytics tools including Google Analytics, Hootsuite, and Sprout Social. I have attached my résumé, a digital portfolio showcasing recent campaign work, and contact information for two professional references.\n\nThank you for your consideration. I look forward to discussing how my experience aligns with your team's goals.\n\nBest regards,\nJessica Morales",
          questions: [
            { qNum: 181, q: "What industry experience is preferred for this position?", opts: [{ key: "A", text: "Healthcare or pharmaceutical." }, { key: "B", text: "Hospitality or tourism." }, { key: "C", text: "Financial services." }, { key: "D", text: "Technology or software." }], a: "B", exp: "Đáp án: '2+ years of marketing experience in the hospitality or tourism industry'." },
            { qNum: 182, q: "How many years of experience does Jessica have?", opts: [{ key: "A", text: "One year." }, { key: "B", text: "Two years." }, { key: "C", text: "Three years." }, { key: "D", text: "Five years." }], a: "C", exp: "Đáp án: 'three years of experience as a Marketing Assistant at Coral Bay Resort'." },
            { qNum: 183, q: "By how much did Jessica increase engagement rates?", opts: [{ key: "A", text: "15 percent." }, { key: "B", text: "24 percent." }, { key: "C", text: "34 percent." }, { key: "D", text: "44 percent." }], a: "C", exp: "Đáp án: 'increased engagement rates by 34 percent'." },
            { qNum: 184, q: "What did Jessica attach to her email?", opts: [{ key: "A", text: "A résumé, portfolio, and two references." }, { key: "B", text: "A cover letter and salary expectations." }, { key: "C", text: "Only a résumé." }, { key: "D", text: "A video introduction and college transcript." }], a: "A", exp: "Đáp án: 'I have attached my résumé, a digital portfolio... and contact information for two professional references'." },
            { qNum: 185, q: "Does Jessica meet the minimum experience requirement?", opts: [{ key: "A", text: "No, she has less than the required experience." }, { key: "B", text: "Yes, she exceeds the minimum requirement by one year." }, { key: "C", text: "Yes, she exactly meets the minimum requirement." }, { key: "D", text: "It cannot be determined from the documents." }], a: "B", exp: "Đố mẹo cross-reference: Job requires '2+ years', Jessica has '3 years' → exceeds by 1 year." }
          ]
        },
        // TRIPLE 1 (Q186-190): Conference invitation + Schedule + Registration email
        {
          passages: "[DOCUMENT 1 — CONFERENCE INVITATION]\n\nAPEX GLOBAL TECHNOLOGY SUMMIT 2026\nDates: November 12-14, 2026\nVenue: Moscone Convention Center, San Francisco, CA\n\nJoin 5,000+ technology leaders for three days of keynotes, workshops, and networking. Topics include AI & Machine Learning, Cloud Infrastructure, Cybersecurity, and Sustainable Tech Innovation.\n\nRegistration Rates:\n• Early Bird (before Oct 25): $799\n• Standard (Oct 25 - Nov 5): $999\n• On-Site: $1,199\n• Student/Academic: $399 (valid ID required)\n\nAll registrations include keynote sessions, workshop access, meals, and a conference welcome kit.\n\n---\n\n[DOCUMENT 2 — CONFERENCE SCHEDULE (Day 1)]\n\nNovember 12, 2026 — Day 1 Schedule\n8:00 AM - Registration & Welcome Coffee (Main Lobby)\n9:00 AM - Opening Keynote: \"The Future of AI in Enterprise\" — Dr. Sarah Kim, CTO of Zenith Labs (Grand Ballroom)\n10:30 AM - Break\n11:00 AM - Workshop A: Cloud Migration Strategies (Room 201) | Workshop B: Cybersecurity Threat Detection (Room 305)\n12:30 PM - Networking Lunch (Terrace Restaurant)\n2:00 PM - Panel Discussion: Sustainable Innovation in Tech (Grand Ballroom)\n3:30 PM - Break\n4:00 PM - Workshop C: Building Scalable AI Pipelines (Room 201)\n5:30 PM - Welcome Reception & Cocktail Hour (Rooftop Terrace)\n\n---\n\n[DOCUMENT 3 — REGISTRATION CONFIRMATION EMAIL]\nFrom: events@apextechsummit.com\nTo: michael.ross@novatech.com\nDate: October 20, 2026\nSubject: Registration Confirmed — Apex Global Technology Summit 2026\n\nDear Mr. Ross,\n\nYour registration for the Apex Global Technology Summit 2026 has been confirmed.\n\nRegistration Details:\n• Name: Michael Ross\n• Company: NovaTech Solutions\n• Registration Type: Early Bird\n• Amount Paid: $799\n• Registration ID: AGTS-28491\n\nPlease bring a printed or digital copy of this confirmation to the registration desk on arrival. We look forward to seeing you in San Francisco!\n\nBest,\nApex Events Team",
          questions: [
            { qNum: 186, q: "How much did Michael Ross pay for his registration?", opts: [{ key: "A", text: "$399." }, { key: "B", text: "$799." }, { key: "C", text: "$999." }, { key: "D", text: "$1,199." }], a: "B", exp: "Cross-reference: Michael registered as 'Early Bird' → $799. Confirmed in email: 'Amount Paid: $799'." },
            { qNum: 187, q: "Who is delivering the opening keynote on Day 1?", opts: [{ key: "A", text: "Michael Ross." }, { key: "B", text: "The conference organizer." }, { key: "C", text: "Dr. Sarah Kim, CTO of Zenith Labs." }, { key: "D", text: "A panel of cybersecurity experts." }], a: "C", exp: "Schedule: 'Opening Keynote: The Future of AI in Enterprise — Dr. Sarah Kim, CTO of Zenith Labs'." },
            { qNum: 188, q: "Where is Workshop B held?", opts: [{ key: "A", text: "Room 201." }, { key: "B", text: "Room 305." }, { key: "C", text: "The Grand Ballroom." }, { key: "D", text: "The Rooftop Terrace." }], a: "B", exp: "Bẫy: Room 201 = Workshop A. Workshop B: Cybersecurity Threat Detection in Room 305." },
            { qNum: 189, q: "What time does the Welcome Reception start?", opts: [{ key: "A", text: "4:00 PM." }, { key: "B", text: "5:00 PM." }, { key: "C", text: "5:30 PM." }, { key: "D", text: "6:00 PM." }], a: "C", exp: "Đáp án: '5:30 PM - Welcome Reception & Cocktail Hour (Rooftop Terrace)'." },
            { qNum: 190, q: "What must Michael bring to the registration desk?", opts: [{ key: "A", text: "His company badge and business cards." }, { key: "B", text: "A valid student ID." }, { key: "C", text: "A printed or digital copy of the confirmation." }, { key: "D", text: "Two forms of government-issued identification." }], a: "C", exp: "Đáp án: 'Please bring a printed or digital copy of this confirmation to the registration desk on arrival'." }
          ]
        },
        // TRIPLE 2 (Q191-195): Purchase order + Invoice + Shipping confirmation
        {
          passages: "[DOCUMENT 1 — PURCHASE ORDER]\nPURCHASE ORDER #PO-55210\nFrom: Apex Global Solutions (Purchasing Department)\nTo: Sterling Office Supply Co.\nDate: October 1, 2026\n\nItems Ordered:\n1. Premium Ergonomic Desk Chair (Model EC-500) — Qty: 25 @ $340/unit = $8,500\n2. Adjustable Standing Desk (Model SD-200) — Qty: 10 @ $520/unit = $5,200\n3. LED Desk Lamp (Model DL-100) — Qty: 50 @ $45/unit = $2,250\n\nSubtotal: $15,950\nShipping (Flat Rate): $350\nTotal: $16,300\n\nRequested Delivery Date: October 15, 2026\nShip To: Apex Global Solutions, 1200 Commerce Drive, Suite 400, Dallas, TX 75201\n\n---\n\n[DOCUMENT 2 — INVOICE]\nSTERLING OFFICE SUPPLY CO.\nINVOICE #INV-88340\nDate: October 3, 2026\nBill To: Apex Global Solutions\n\nPO Reference: #PO-55210\n\nItems:\n1. Premium Ergonomic Desk Chair (EC-500) x25 — $8,500.00\n2. Adjustable Standing Desk (SD-200) x10 — $5,200.00\n3. LED Desk Lamp (DL-100) x50 — $2,250.00\n\nSubtotal: $15,950.00\nShipping: $350.00\nSales Tax (8.25%): $1,315.88\nTotal Due: $17,615.88\n\nPayment Terms: Net 30 (Due by November 2, 2026)\n\n---\n\n[DOCUMENT 3 — SHIPPING CONFIRMATION]\nFrom: logistics@sterlingoffice.com\nTo: purchasing@apexglobal.com\nDate: October 12, 2026\nSubject: Shipment Notification — Order #PO-55210\n\nDear Apex Purchasing Team,\n\nYour order #PO-55210 has been shipped via FastTrack Logistics. Please note the following:\n\n• Tracking Number: FT-994821\n• Estimated Delivery: October 14, 2026\n• Shipment Contents: 25 desk chairs, 10 standing desks, 50 desk lamps (all items included)\n• Delivery Instructions: Loading dock access required; driver will call 30 minutes before arrival\n\nPlease ensure someone is available at the loading dock to sign for the delivery.\n\nRegards,\nSterling Logistics Team",
          questions: [
            { qNum: 191, q: "What is the difference between the PO total and the invoice total?", opts: [{ key: "A", text: "The invoice includes sales tax not listed on the PO." }, { key: "B", text: "The invoice has a different shipping rate." }, { key: "C", text: "The invoice shows fewer items than ordered." }, { key: "D", text: "The invoice applies a bulk purchase discount." }], a: "A", exp: "Đố mẹo cross-reference: PO total = $16,300 (no tax). Invoice total = $17,615.88 (includes 8.25% sales tax of $1,315.88). Chênh lệch = sales tax." },
            { qNum: 192, q: "When is payment due?", opts: [{ key: "A", text: "Upon delivery." }, { key: "B", text: "October 15, 2026." }, { key: "C", text: "November 2, 2026." }, { key: "D", text: "December 3, 2026." }], a: "C", exp: "Đáp án: 'Payment Terms: Net 30 (Due by November 2, 2026)'. Invoice date Oct 3 + 30 days = Nov 2." },
            { qNum: 193, q: "Will the order arrive before the requested delivery date?", opts: [{ key: "A", text: "Yes, one day early." }, { key: "B", text: "Yes, three days early." }, { key: "C", text: "No, it will be two days late." }, { key: "D", text: "The delivery date is not mentioned." }], a: "A", exp: "Cross-reference: PO requested Oct 15, shipping confirms estimated Oct 14 → 1 ngày sớm hơn." },
            { qNum: 194, q: "How many total items are being shipped?", opts: [{ key: "A", text: "25 items." }, { key: "B", text: "50 items." }, { key: "C", text: "85 items." }, { key: "D", text: "100 items." }], a: "C", exp: "Tính: 25 chairs + 10 desks + 50 lamps = 85 items total." },
            { qNum: 195, q: "What must be available at the delivery location?", opts: [{ key: "A", text: "A forklift operator." }, { key: "B", text: "Loading dock access and someone to sign." }, { key: "C", text: "A security guard for inspection." }, { key: "D", text: "A company credit card for payment." }], a: "B", exp: "Đáp án: 'Loading dock access required; driver will call 30 minutes before arrival' + 'someone is available to sign for the delivery'." }
          ]
        },
        // TRIPLE 3 (Q196-200): Restaurant review + Coupon + Reservation email
        {
          passages: "[DOCUMENT 1 — ONLINE RESTAURANT REVIEW]\n\nRestaurant: La Terrazza Italian Kitchen\nReviewer: FoodieExplorer | Rating: ★★★★★ (5 out of 5)\nDate: October 5, 2026\n\nAbsolutely phenomenal dining experience! My wife and I visited La Terrazza for our anniversary dinner last Saturday and were blown away. The handmade truffle ravioli ($28) was the best pasta dish I have ever had — rich, perfectly seasoned, and generously portioned. The sommelier recommended an excellent Barolo wine that paired beautifully with our main courses.\n\nThe private dining terrace overlooking the harbor was incredibly romantic. Service was impeccable — our server, Marco, was attentive without being intrusive. The only minor note: reservations are essential, especially on weekends. We booked two weeks in advance and they were nearly full.\n\nHighly recommended for special occasions. Plan to spend around $150-$200 per couple with wine.\n\n---\n\n[DOCUMENT 2 — PROMOTIONAL COUPON]\n\nLA TERRAZZA ITALIAN KITCHEN — EXCLUSIVE OFFER\nPresent this voucher to receive:\n• 20% OFF your total bill (food items only, excludes beverages and wine)\n• Valid Monday through Thursday only\n• Not valid on public holidays or in combination with other promotions\n• Minimum party size: 2 guests\n• Valid: October 1 - December 31, 2026\n• Voucher Code: TERRAZZA20\n\n---\n\n[DOCUMENT 3 — RESERVATION EMAIL]\nFrom: bookings@laterrazza.com\nTo: karen.wu@email.com\nDate: October 15, 2026\nSubject: Reservation Confirmed — November 8, 2026\n\nDear Ms. Wu,\n\nYour reservation at La Terrazza Italian Kitchen has been confirmed:\n\n• Date: Friday, November 8, 2026\n• Time: 7:30 PM\n• Party Size: 4 guests\n• Seating: Indoor main dining room\n• Special Request: One guest requires a gluten-free menu\n\nPlease note that tables are held for a maximum of 15 minutes past the reservation time. For changes or cancellations, please call (555) 789-4500 at least 24 hours in advance.\n\nWe look forward to welcoming you.\n\nWarm regards,\nLa Terrazza Reservations",
          questions: [
            { qNum: 196, q: "How much does the truffle ravioli cost?", opts: [{ key: "A", text: "$18." }, { key: "B", text: "$24." }, { key: "C", text: "$28." }, { key: "D", text: "$35." }], a: "C", exp: "Đáp án: 'The handmade truffle ravioli ($28)'." },
            { qNum: 197, q: "Can Ms. Wu use the promotional coupon for her reservation?", opts: [{ key: "A", text: "Yes, the coupon is valid for her Friday dinner." }, { key: "B", text: "No, the coupon is only valid Monday through Thursday." }, { key: "C", text: "Yes, but only if she orders wine with dinner." }, { key: "D", text: "No, the coupon has already expired." }], a: "B", exp: "Đố mẹo cross-reference: Ms. Wu's reservation = Friday, Nov 8. Coupon valid 'Monday through Thursday only' → KHÔNG áp dụng được." },
            { qNum: 198, q: "What special request was made for Ms. Wu's reservation?", opts: [{ key: "A", text: "A birthday cake for one guest." }, { key: "B", text: "A window seat overlooking the harbor." }, { key: "C", text: "One guest requires a gluten-free menu." }, { key: "D", text: "Live music during dinner." }], a: "C", exp: "Yêu cầu đặc biệt: 'One guest requires a gluten-free menu'." },
            { qNum: 199, q: "According to the review, what should diners do before visiting on weekends?", opts: [{ key: "A", text: "Arrive early to get a walk-in table." }, { key: "B", text: "Book a reservation well in advance." }, { key: "C", text: "Download the restaurant's mobile app." }, { key: "D", text: "Order food for takeout instead." }], a: "B", exp: "Đáp án: 'reservations are essential, especially on weekends. We booked two weeks in advance and they were nearly full'." },
            { qNum: 200, q: "How long will the restaurant hold Ms. Wu's table?", opts: [{ key: "A", text: "5 minutes past the reservation time." }, { key: "B", text: "10 minutes past the reservation time." }, { key: "C", text: "15 minutes past the reservation time." }, { key: "D", text: "30 minutes past the reservation time." }], a: "C", exp: "Chính sách: 'tables are held for a maximum of 15 minutes past the reservation time'." }
          ]
        }
      ];

      part7Sets.forEach((set) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr1_q${qItem.qNum}`,
            partNumber: 7,
            partTitle: "Part 7: Reading Comprehension",
            section: "READING",
            passageText: set.passages,
            questionText: `${qItem.qNum}. ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
        });
      });

  return qs;
};

export const MOCK_EXAM_PAPERS: ExamPaper[] = (() => {
  const papers: ExamPaper[] = [
  // ---------------------------------------------------------------------------
  // 1. TOEIC LISTENING & READING (200 QUESTIONS - ETS 2026 STANDARD)
  // ---------------------------------------------------------------------------
  {
    id: "toeic_lr_2026_01",
    title: "ETS TOEIC 2026 Official Test #01",
    type: "TOEIC_FULL",
    level: "Intermediate",
    timeLimitMinutes: 120,
    totalQuestions: 200,
    maxScore: 990,
    description: "Bộ đề chuẩn ETS 2026 200 câu Nghe & Đọc phân tích đáp án Tiếng Việt chi tiết.",
    categoryBadge: "TOEIC 990",
    tags: ["ETS 2026", "Nghe & Đọc", "Full 200 Câu", "Chính Thức"],
    supportedSkills: ["LISTENING", "READING"],
    questions: buildToeicLR01Questions()
  },

  // ---------------------------------------------------------------------------
  // 1B. ETS TOEIC 2026 OFFICIAL TEST #02 (200 FULL UNIQUE QUESTIONS)
  // ---------------------------------------------------------------------------
  {
    id: "toeic_lr_2026_02",
    title: "ETS TOEIC 2026 Official Test #02",
    type: "TOEIC_FULL",
    level: "Advanced",
    timeLimitMinutes: 120,
    totalQuestions: 200,
    maxScore: 990,
    description: "Bộ đề thi chuẩn ETS 2026 Test #02 gồm 200 câu hỏi Nghe & Đọc có bẫy logic và giải thích chi tiết.",
    categoryBadge: "TOEIC 990",
    tags: ["ETS 2026", "Test 02", "Full 200 Câu", "Chính Thức", "Độ Khó Cao"],
    supportedSkills: ["LISTENING", "READING"],
    questions: (() => {
      const qs: ExamQuestion[] = [];

      // PART 1: PHOTOGRAPHS (Q1 - Q6)
      const part1Photos = [
        {
          id: "tlr2_q1",
          imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          questionText: "Look at the picture marked No. 1 in your test book.",
          options: [
            { key: "A", text: "A woman is presenting financial charts on a whiteboard." },
            { key: "B", text: "A businesswoman is typing an email on a laptop in an office." },
            { key: "C", text: "Documents are being filed in metal filing cabinets." },
            { key: "D", text: "A telephone headset is resting on a desk surface." }
          ],
          correctAnswer: "B" as const,
          explanation: "Bức ảnh thể hiện người phụ nữ công sở đang thao tác máy tính xách tay tại bàn làm việc (`typing an email on a laptop in an office`)."
        },
        {
          id: "tlr2_q2",
          imageUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          questionText: "Look at the picture marked No. 2 in your test book.",
          options: [
            { key: "A", text: "A cashier is scanning groceries at a checkout counter." },
            { key: "B", text: "A customer is paying for items with a credit card at a counter." },
            { key: "C", text: "Shoppers are pushing carts down a supermarket aisle." },
            { key: "D", text: "Store shelves are being stocked with canned goods." }
          ],
          correctAnswer: "B" as const,
          explanation: "Khách hàng đang đưa thẻ tín dụng để thanh toán tại quầy thu ngân (`paying for items with a credit card at a counter`)."
        },
        {
          id: "tlr2_q3",
          imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
          questionText: "Look at the picture marked No. 3 in your test book.",
          options: [
            { key: "A", text: "A technician wearing safety glasses is examining electronic circuit boards." },
            { key: "B", text: "Machinery parts are being loaded into wooden crates." },
            { key: "C", text: "A factory supervisor is conducting an employee safety briefing." },
            { key: "D", text: "Power tools are being hung on a pegboard wall." }
          ],
          correctAnswer: "A" as const,
          explanation: "Kỹ thuật viên đeo kính bảo hộ đang kiểm tra bo mạch điện tử (`examining electronic circuit boards`)."
        },
        {
          id: "tlr2_q4",
          imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
          questionText: "Look at the picture marked No. 4 in your test book.",
          options: [
            { key: "A", text: "An audience is seated in an auditorium listening to a keynote speaker." },
            { key: "B", text: "Brochures are being handed out at an exhibition booth." },
            { key: "C", text: "A stage curtain is being drawn closed." },
            { key: "D", text: "Chairs are being stacked against the back wall." }
          ],
          correctAnswer: "A" as const,
          explanation: "Khán giả đang ngồi trong hội trường lắng nghe diễn giả trình bày (`seated in an auditorium listening to a keynote speaker`)."
        },
        {
          id: "tlr2_q5",
          imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          questionText: "Look at the picture marked No. 5 in your test book.",
          options: [
            { key: "A", text: "Two executives are shaking hands across a glass conference table." },
            { key: "B", text: "A contract is being signed with a fountain pen." },
            { key: "C", text: "Coffee cups are being collected from an office pantry." },
            { key: "D", text: "A whiteboard is being wiped clean." }
          ],
          correctAnswer: "A" as const,
          explanation: "Hai lãnh đạo đang bắt tay qua bàn họp kính sau thỏa thuận (`shaking hands across a glass conference table`)."
        },
        {
          id: "tlr2_q6",
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          questionText: "Look at the picture marked No. 6 in your test book.",
          options: [
            { key: "A", text: "Pedestrians are walking along the plaza outside a modern high-rise building." },
            { key: "B", text: "A fountain is spraying water into a central plaza." },
            { key: "C", text: "Construction scaffolding surrounds an office facade." },
            { key: "D", text: "Vehicles are queued at a toll plaza." }
          ],
          correctAnswer: "A" as const,
          explanation: "Người đi bộ đang di chuyển qua quảng trường phía trước tòa nhà chọc trời kính (`walking along the plaza outside a modern high-rise building`)."
        }
      ];

      part1Photos.forEach((item, idx) => {
        qs.push({
          id: item.id,
          partNumber: 1,
          partTitle: "Part 1: Photographs",
          section: "LISTENING",
          imageUrl: item.imageUrl,
          audioUrl: item.audioUrl,
          passageText: `[Audio Transcript - Photo #${idx + 1}]\nA. ${item.options[0].text}\nB. ${item.options[1].text}\nC. ${item.options[2].text}\nD. ${item.options[3].text}`,
          questionText: `Question ${idx + 1}: ${item.questionText}`,
          options: item.options as any,
          correctAnswer: item.correctAnswer,
          explanation: item.explanation
        });
      });

      // PART 2: QUESTION-RESPONSE (Q7 - Q31: 25 UNIQUE QUESTIONS)
      const part2Questions: { q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"; exp: string }[] = [
        { q: "Where can I find the extra toner cartridges for the copy machine?", opts: [{ key: "A", text: "In the storage closet on the third floor." }, { key: "B", text: "About 500 copies per hour." }, { key: "C", text: "Yes, I replaced the paper tray." }], a: "A", exp: "Câu hỏi 'Where' chỉ nơi chốn: 'In the storage closet on the third floor'." },
        { q: "When is the regional sales report due?", opts: [{ key: "A", text: "Mr. Davis in accounting." }, { key: "B", text: "By five o'clock this afternoon." }, { key: "C", text: "It was a very insightful presentation." }], a: "B", exp: "Câu hỏi 'When' chỉ thời gian: 'By five o'clock this afternoon'." },
        { q: "Who is coordinating the annual charity fundraiser this year?", opts: [{ key: "A", text: "At the convention center ballroom." }, { key: "B", text: "Sarah from Human Resources volunteered." }, { key: "C", text: "We raised over ten thousand dollars." }], a: "B", exp: "Câu hỏi 'Who' chỉ người: 'Sarah from Human Resources volunteered'." },
        { q: "Would you prefer to take the express train or drive to the client site?", opts: [{ key: "A", text: "The train will allow us to avoid rush-hour traffic." }, { key: "B", text: "Yes, I have a valid driver's license." }, { key: "C", text: "The ticket counter is on Level 1." }], a: "A", exp: "Câu hỏi lựa chọn 'prefer... or...': Đưa ra lý do chọn tàu hỏa để tránh tắc đường." },
        { q: "Why did the morning board meeting get rescheduled?", opts: [{ key: "A", text: "In Conference Room C on the second floor." }, { key: "B", text: "The CEO's flight from Chicago was delayed." }, { key: "C", text: "At nine o'clock sharp." }], a: "B", exp: "Câu hỏi 'Why' giải thích nguyên nhân: Chuyến bay của CEO bị trễ." },
        { q: "Haven't you submitted your travel reimbursement form yet?", opts: [{ key: "A", text: "I'm still waiting for two hotel receipts." }, { key: "B", text: "Yes, the flight was very comfortable." }, { key: "C", text: "The conference was held in Denver." }], a: "A", exp: "Câu hỏi phủ định: Giải thích lý do chưa nộp vì đang đợi 2 hóa đơn khách sạn." },
        { q: "How many catering staff will we need for the reception?", opts: [{ key: "A", text: "The event starts at seven o'clock." }, { key: "B", text: "At least eight servers and two bartenders." }, { key: "C", text: "The food was delicious." }], a: "B", exp: "Câu hỏi số lượng 'How many': 'At least eight servers and two bartenders'." },
        { q: "Could you help me set up the audiovisual equipment for the workshop?", opts: [{ key: "A", text: "I have a client meeting in five minutes, but Mark is free." }, { key: "B", text: "The presentation slides are very clear." }, { key: "C", text: "Yes, the microphone was working yesterday." }], a: "A", exp: "Câu trả lời gián tiếp: Bản thân bận nhưng gợi ý người khác hỗ trợ." },
        { q: "Is the new software update compatible with our operating system?", opts: [{ key: "A", text: "Our IT department verified it yesterday." }, { key: "B", text: "The computer monitor is twenty-seven inches." }, { key: "C", text: "Yes, I installed the new desk lamp." }], a: "A", exp: "Xác nhận tính tương thích thông qua bộ phận IT đã kiểm tra." },
        { q: "Which graphic designer did we hire for the website redesign?", opts: [{ key: "A", text: "The layout looks very contemporary." }, { key: "B", text: "We decided on Studio Apex from Seattle." }, { key: "C", text: "The deadline is next Friday." }], a: "B", exp: "Câu hỏi 'Which...': 'We decided on Studio Apex from Seattle'." },
        { q: "You've reviewed the commercial lease agreement, haven't you?", opts: [{ key: "A", text: "Our legal counsel is going over the final clauses now." }, { key: "B", text: "The property is located on Main Street." }, { key: "C", text: "Rent is payable on the first of each month." }], a: "A", exp: "Câu hỏi đuôi: Trả lời gián tiếp rằng luật sư đang kiểm tra điều khoản cuối." },
        { q: "How often does the shuttle bus run between the airport and the hotel?", opts: [{ key: "A", text: "Every twenty minutes around the clock." }, { key: "B", text: "The fare is fifteen dollars one way." }, { key: "C", text: "Terminal 2 at Gate B." }], a: "A", exp: "Câu hỏi tần suất 'How often': 'Every twenty minutes around the clock'." },
        { q: "Let's order lunch from the Thai bistro across the street.", opts: [{ key: "A", text: "They are closed for renovations until Thursday." }, { key: "B", text: "I ordered the spicy noodles yesterday." }, { key: "C", text: "Yes, I took the elevator downstairs." }], a: "A", exp: "Phản hồi lời đề xuất: Báo tin quán đang đóng cửa sửa chữa." },
        { q: "What is the total cost estimate for the warehouse expansion project?", opts: [{ key: "A", text: "Approximately 1.8 million dollars." }, { key: "B", text: "The contractor is based in Dallas." }, { key: "C", text: "Construction begins next March." }], a: "A", exp: "Câu hỏi chi phí 'total cost estimate': 'Approximately 1.8 million dollars'." },
        { q: "Should we send the promotional flyers by mail or distribute them by email?", opts: [{ key: "A", text: "Email will save both printing and postage costs." }, { key: "B", text: "The post office closes at 5:00 PM." }, { key: "C", text: "Yes, the flyer design was approved." }], a: "A", exp: "Câu hỏi lựa chọn: Đưa ra lý do chọn email để tiết kiệm chi phí in ấn và bưu chính." },
        { q: "Why hasn't the air conditioning in the auditorium been repaired yet?", opts: [{ key: "A", text: "The replacement cooling compressor is on backorder." }, { key: "B", text: "It's about seventy-two degrees inside." }, { key: "C", text: "The seminar starts at two o'clock." }], a: "A", exp: "Giải thích nguyên nhân: Bộ phận máy nén thay thế đang chờ hàng về." },
        { q: "Do you know who left this leather briefcase in the conference room?", opts: [{ key: "A", text: "I believe the visiting auditor from Tokyo was sitting there." }, { key: "B", text: "The meeting lasted two hours." }, { key: "C", text: "Yes, the conference room is booked until noon." }], a: "A", exp: "Đáp án gián tiếp: 'I believe the visiting auditor from Tokyo was sitting there'." },
        { q: "When will the keynote speaker arrive at the hotel?", opts: [{ key: "A", text: "Her flight touches down at 4:30 PM." }, { key: "B", text: "She will speak about global trade dynamics." }, { key: "C", text: "In the Grand Ballroom on Floor 3." }], a: "A", exp: "Câu hỏi 'When': 'Her flight touches down at 4:30 PM'." },
        { q: "The quarterly revenue figures exceeded our initial forecasts by ten percent.", opts: [{ key: "A", text: "That's fantastic news for the executive team." }, { key: "B", text: "We forecasted rain for tomorrow." }, { key: "C", text: "About fifty new employees were hired." }], a: "A", exp: "Phản hồi câu trần thuật tích cực: 'That's fantastic news for the executive team'." },
        { q: "How did you manage to resolve the supply chain delay with the manufacturer?", opts: [{ key: "A", text: "We arranged an alternative air-freight carrier." }, { key: "B", text: "The shipment weighed over two tons." }, { key: "C", text: "Yes, the supplier is based in Taiwan." }], a: "A", exp: "Câu hỏi 'How': Nêu phương án chuyển sang vận chuyển hàng không thay thế." },
        { q: "Where should I submit my completed employee satisfaction survey?", opts: [{ key: "A", text: "Drop it in the confidential collection box in the breakroom." }, { key: "B", text: "The questions were very thorough." }, { key: "C", text: "Yes, I filled it out yesterday." }], a: "A", exp: "Câu hỏi 'Where': 'Drop it in the confidential collection box in the breakroom'." },
        { q: "Would you mind reviewing my budget proposal before I send it to the director?", opts: [{ key: "A", text: "Not at all, leave a copy on my desk." }, { key: "B", text: "The budget was approved last month." }, { key: "C", text: "The director's office is at the end of the hall." }], a: "A", exp: "'Would you mind...?' → 'Not at all, leave a copy on my desk' (đồng ý giúp đỡ)." },
        { q: "Has the vendor sent the updated pricing catalog for the upcoming fiscal year?", opts: [{ key: "A", text: "It arrived in my inbox early this morning." }, { key: "B", text: "We ordered thirty new office chairs." }, { key: "C", text: "The fiscal year begins in January." }], a: "A", exp: "Xác nhận nhận được catalog: 'It arrived in my inbox early this morning'." },
        { q: "Why don't we hire an external consulting firm to audit our cybersecurity infrastructure?", opts: [{ key: "A", text: "The Chief Information Officer has already requested proposals." }, { key: "B", text: "Our passwords must be updated every 90 days." }, { key: "C", text: "The computer servers are located in the basement." }], a: "A", exp: "Phản hồi lời gợi ý 'Why don't we...': CIO đã yêu cầu báo giá đề xuất rồi." },
        { q: "Will the annual company picnic be held at Lakeview Park again this summer?", opts: [{ key: "A", text: "No, the committee booked the Pinecrest Botanical Gardens instead." }, { key: "B", text: "Yes, the weather was beautiful last July." }, { key: "C", text: "About one hundred employees attended." }], a: "A", exp: "Thông báo địa điểm mới: 'booked the Pinecrest Botanical Gardens instead'." }
      ];

      part2Questions.forEach((item, idx) => {
        const qNum = idx + 7;
        qs.push({
          id: `tlr2_q${qNum}`,
          partNumber: 2,
          partTitle: "Part 2: Question-Response",
          section: "LISTENING",
          audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(idx % 4) + 1}.mp3`,
          passageText: `[Audio Transcript - Q${qNum}]\nQuestion: "${item.q}"\n(A) ${item.opts[0].text}\n(B) ${item.opts[1].text}\n(C) ${item.opts[2].text}`,
          questionText: `Question ${qNum}: Listen and choose the best response.`,
          options: [
            { key: "A", text: item.opts[0].text },
            { key: "B", text: item.opts[1].text },
            { key: "C", text: item.opts[2].text },
            { key: "D", text: "(Not Applicable in Part 2)" }
          ],
          correctAnswer: item.a,
          explanation: item.exp
        });
      });

      // PART 3: CONVERSATIONS (Q32 - Q70: 13 DIALOGUES × 3 QUESTIONS = 39 QUESTIONS)
      const part3Sets: { dialogue: string; questions: { q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        {
          dialogue: "Man: Hi, Rachel. Have you had a chance to look over the construction bids for our new warehouse in Phoenix?\nWoman: Yes, David. I reviewed all four proposals this morning. Apex Builders has the lowest price estimate at 1.4 million dollars, but their projected completion timeline is sixteen months. On the other hand, BuildCraft is quoting 1.6 million, but they guarantee delivery in ten months.\nMan: Ten months would allow us to be fully operational ahead of the busy fourth-quarter holiday season. That additional revenue would easily offset the two-hundred-thousand-dollar difference.\nWoman: That's a great point. I will schedule a conference call with BuildCraft's project director for tomorrow afternoon to finalize the contract specifications.",
          questions: [
            { q: "What project are the speakers discussing?", opts: [{ key: "A", text: "Renovating a corporate headquarters in Dallas." }, { key: "B", text: "Constructing a new warehouse facility in Phoenix." }, { key: "C", text: "Relocating a manufacturing plant to Denver." }, { key: "D", text: "Purchasing commercial retail real estate." }], a: "B", exp: "Dự án: 'construction bids for our new warehouse in Phoenix'." },
            { q: "Why does the man favor BuildCraft's proposal?", opts: [{ key: "A", text: "It offers the lowest cost bid." }, { key: "B", text: "It includes free architectural design services." }, { key: "C", text: "Its faster completion timeline enables holiday season operations." }, { key: "D", text: "It has a 10-year structural warranty." }], a: "C", exp: "Lý do: 'Ten months would allow us to be fully operational ahead of the busy fourth-quarter holiday season'." },
            { q: "What will the woman do tomorrow afternoon?", opts: [{ key: "A", text: "Visit the construction site in Phoenix." }, { key: "B", text: "Submit a loan application to the bank." }, { key: "C", text: "Speak with BuildCraft's project director via conference call." }, { key: "D", text: "Present the bids to the board of directors." }], a: "C", exp: "Hành động tiếp theo: 'schedule a conference call with BuildCraft's project director for tomorrow afternoon'." }
          ]
        },
        {
          dialogue: "Woman: Good morning, Mr. Kim. I am calling from Grand Horizon Hotel reservations. I noticed that your corporate conference booking for next month lists forty rooms, but only twenty-five attendee names have been submitted to our registry.\nMan: Hello, Ms. Gomez. Yes, our regional marketing team is still finalizing their participant list because of travel visa processing delays in our Singapore office. We expect to have the remaining fifteen names confirmed by Friday.\nWoman: I understand. Please keep in mind that our hotel policy requires all unused reserved rooms to be released thirty days prior to check-in, which is next Monday, October 20th.\nMan: Thank you for the reminder. I will expedite the visa verification process and email the complete rooming list before Monday morning.",
          questions: [
            { q: "Why is the woman calling Mr. Kim?", opts: [{ key: "A", text: "To request an immediate deposit payment." }, { key: "B", text: "To inquire about incomplete attendee names for a room block." }, { key: "C", text: "To inform him of a conference room cancellation." }, { key: "D", text: "To offer upgraded luxury suites at a discount." }], a: "B", exp: "Mục đích gọi: 'only twenty-five attendee names have been submitted to our registry'." },
            { q: "What caused the delay in finalizing the participant list?", opts: [{ key: "A", text: "Budget allocation approval issues." }, { key: "B", text: "Travel visa processing delays in Singapore." }, { key: "C", text: "Flight cancellation disruptions." }, { key: "D", text: "A change in the conference agenda." }], a: "B", exp: "Nguyên nhân: 'travel visa processing delays in our Singapore office'." },
            { q: "What is the deadline for releasing unused rooms?", opts: [{ key: "A", text: "This Friday." }, { key: "B", text: "Next Monday, October 20th." }, { key: "C", text: "End of the current month." }, { key: "D", text: "The day of check-in." }], a: "B", exp: "Thời hạn: 'thirty days prior to check-in, which is next Monday, October 20th'." }
          ]
        },
        {
          dialogue: "Man: Jessica, have you seen the revised graphic design concepts for our summer product packaging?\nWoman: Yes, Brian. I love the minimalist aesthetic and the vibrant eco-friendly green color palette. However, the regulatory compliance team noted that the ingredient font size is slightly too small according to international labeling standards.\nMan: Oh, that's an important catch. We definitely need to avoid any customs clearance delays when exporting to the European market. Let's ask the design agency to enlarge the font by two points.\nWoman: I'll call Elena at DesignCraft right away so they can send us updated proofs before our 3:00 PM packaging review meeting.",
          questions: [
            { q: "What issue did the compliance team identify?", opts: [{ key: "A", text: "The logo color violates copyright rules." }, { key: "B", text: "The ingredient font size does not meet international standards." }, { key: "C", text: "The barcode is improperly positioned." }, { key: "D", text: "The recyclable packaging material is too costly." }], a: "B", exp: "Vấn đề: 'the ingredient font size is slightly too small according to international labeling standards'." },
            { q: "Why is compliance particularly critical for the company?", opts: [{ key: "A", text: "To qualify for a design excellence award." }, { key: "B", text: "To prevent customs clearance delays in European exports." }, { key: "C", text: "To reduce shipping weight fees." }, { key: "D", text: "To meet retail supermarket shelf guidelines." }], a: "B", exp: "Tầm quan trọng: 'avoid any customs clearance delays when exporting to the European market'." },
            { q: "What will Jessica do before 3:00 PM?", opts: [{ key: "A", text: "Contact the design agency to request updated proofs." }, { key: "B", text: "Submit an export license application." }, { key: "C", text: "Inspect the packaging printing presses." }, { key: "D", text: "Present the prototype to the marketing director." }], a: "A", exp: "Hành động: 'call Elena at DesignCraft right away so they can send us updated proofs'." }
          ]
        },
        {
          dialogue: "Woman: Mark, the software development team just completed user acceptance testing for our mobile banking application upgrade. Overall feedback is outstanding, with an 88% satisfaction rate.\nMan: That's wonderful news, Karen! Were there any recurring technical issues reported by beta testers?\nWoman: Only one major complaint: several users mentioned that the biometric fingerprint login occasionally timed out on older smartphone models.\nMan: Let's allocate two senior software engineers to optimize the biometric authentication algorithm this sprint. We want zero login friction before the nationwide public launch on November 15th.",
          questions: [
            { q: "What project did the team complete?", opts: [{ key: "A", text: "A cloud database migration." }, { key: "B", text: "User acceptance testing for a mobile banking app upgrade." }, { key: "C", text: "A cybersecurity audit of corporate servers." }, { key: "D", text: "A website interface overhaul." }], a: "B", exp: "Dự án: 'user acceptance testing for our mobile banking application upgrade'." },
            { q: "What technical problem was reported by beta testers?", opts: [{ key: "A", text: "Frequent battery drain during transactions." }, { key: "B", text: "Biometric fingerprint login timeouts on older smartphones." }, { key: "C", text: "Inaccurate currency conversion rates." }, { key: "D", text: "Failure to send transaction push notifications." }], a: "B", exp: "Lỗi kỹ thuật: 'biometric fingerprint login occasionally timed out on older smartphone models'." },
            { q: "When is the nationwide public launch scheduled?", opts: [{ key: "A", text: "Next week." }, { key: "B", text: "At the end of October." }, { key: "C", text: "On November 15th." }, { key: "D", text: "In the first quarter of next year." }], a: "C", exp: "Ngày ra mắt: 'nationwide public launch on November 15th'." }
          ]
        },
        {
          dialogue: "Man: Hello, Dr. Patel. I am calling from TechCorp Human Resources. We were thoroughly impressed with your keynote presentation on artificial intelligence at the Silicon Valley Summit last month.\nWoman: Thank you, Mr. Reynolds. I enjoyed sharing our research findings on neural network optimization.\nMan: We are hosting our annual Corporate Leadership Retreat at the Lake Tahoe Conference Center from January 22nd to 24th, and we would be honored if you could deliver the opening keynote address on Saturday morning.\nWoman: I would be delighted! January 23rd is currently open in my calendar. Please email me your event agenda and travel coordination details.",
          questions: [
            { q: "Why is Mr. Reynolds contacting Dr. Patel?", opts: [{ key: "A", text: "To invite her to deliver an opening keynote speech at a retreat." }, { key: "B", text: "To interview her for a Chief AI Scientist position." }, { key: "C", text: "To request a copy of her published research paper." }, { key: "D", text: "To sponsor an academic conference at her university." }], a: "A", exp: "Mục đích: 'invite her to deliver the opening keynote address on Saturday morning'." },
            { q: "Where will the event take place?", opts: [{ key: "A", text: "Silicon Valley Convention Center." }, { key: "B", text: "Lake Tahoe Conference Center." }, { key: "C", text: "San Francisco Marriott Hotel." }, { key: "D", text: "Denver Executive Suites." }], a: "B", exp: "Địa điểm: 'Corporate Leadership Retreat at the Lake Tahoe Conference Center'." },
            { q: "What does Dr. Patel request from Mr. Reynolds?", opts: [{ key: "A", text: "A speaking fee advance payment." }, { key: "B", text: "The event agenda and travel coordination details." }, { key: "C", text: "A list of attending executive VIPs." }, { key: "D", text: "Technical specifications for the audiovisual projector." }], a: "B", exp: "Yêu cầu: 'email me your event agenda and travel coordination details'." }
          ]
        },
        {
          dialogue: "Woman: Thomas, our corporate catering order for the foreign delegation luncheon tomorrow has a discrepancy. We requested vegetarian entrees for 12 delegates, but the catering invoice lists only 5.\nMan: Good thing you checked, Amanda! Let me contact Gourmet Express immediately. They usually require twenty-four hours' notice for menu alterations, but since the event is at 1:00 PM tomorrow, we should still be within their modification window.\nWoman: Great. While you're on the phone with them, could you also confirm that the dessert will be 100% nut-free? Ambassador Thorne has a severe peanut allergy.\nMan: Absolutely, I will make that an urgent priority with their executive chef.",
          questions: [
            { q: "What error did Amanda discover on the catering invoice?", opts: [{ key: "A", text: "The total price was calculated incorrectly." }, { key: "B", text: "Only 5 vegetarian entrees were listed instead of 12." }, { key: "C", text: "The delivery address was listed as Building B." }, { key: "D", text: "The beverage package was omitted." }], a: "B", exp: "Sai sót: 'requested vegetarian entrees for 12 delegates, but the invoice lists only 5'." },
            { q: "What special dietary requirement does Ambassador Thorne have?", opts: [{ key: "A", text: "Gluten intolerance." }, { key: "B", text: "Severe peanut allergy." }, { key: "C", text: "Lactose intolerance." }, { key: "D", text: "Low-sodium diet." }], a: "B", exp: "Dị ứng: 'Ambassador Thorne has a severe peanut allergy'." },
            { q: "What will Thomas do next?", opts: [{ key: "A", text: "Cancel the catering reservation entirely." }, { key: "B", text: "Call Gourmet Express to adjust the menu and allergen requirements." }, { key: "C", text: "Pick up the food order directly from the restaurant." }, { key: "D", text: "Speak with Ambassador Thorne about dietary options." }], a: "B", exp: "Hành động tiếp theo: 'contact Gourmet Express immediately' để sửa số lượng và yêu cầu nut-free." }
          ]
        },
        {
          dialogue: "Man: Good afternoon, Ms. Vance. I am calling from Sterling Logistics. Your container shipment of commercial kitchen appliances from Germany has cleared customs inspection at the Port of Houston.\nWoman: That is fantastic news! We have a restaurant opening scheduled for November 10th, so we urgently need those ovens and dishwashers delivered to our downtown Austin location.\nMan: We have scheduled flatbed freight transport for Thursday morning. The truck is expected to arrive at your Austin loading dock between 9:00 AM and 11:00 AM on Friday.\nWoman: Perfect. I will notify our facility manager to ensure the loading bay is completely clear for the delivery crew.",
          questions: [
            { q: "Where was the shipment held for customs clearance?", opts: [{ key: "A", text: "Port of Los Angeles." }, { key: "B", text: "Port of Houston." }, { key: "C", text: "Port of Miami." }, { key: "D", text: "Port of New York." }], a: "B", exp: "Cảng hải quan: 'Port of Houston'." },
            { q: "Why is the shipment delivery urgent?", opts: [{ key: "A", text: "The warehouse storage lease is expiring." }, { key: "B", text: "A restaurant opening is scheduled for November 10th." }, { key: "C", text: "A replacement warranty period is ending." }, { key: "D", text: "An annual government equipment audit is scheduled." }], a: "B", exp: "Lý do khẩn cấp: 'restaurant opening scheduled for November 10th'." },
            { q: "What will the woman tell her facility manager to do?", opts: [{ key: "A", text: "Issue payment upon delivery." }, { key: "B", text: "Clear the loading bay for the Friday morning delivery." }, { key: "C", text: "Inspect the appliance electrical voltages." }, { key: "D", text: "Sign customs import paperwork." }], a: "B", exp: "Hành động: 'ensure the loading bay is completely clear for the delivery crew'." }
          ]
        },
        {
          dialogue: "Woman: Eric, did you review the candidate evaluations from yesterday's second-round interviews for the Senior Financial Analyst role?\nMan: Yes, Laura. Both finalists are remarkably qualified. Elena Ortiz has extensive modeling experience with Fortune 500 corporations, while James Chen has an exceptional track record in financial risk assessment within the renewable energy sector.\nWoman: Since our firm is expanding heavily into clean energy infrastructure investments this quarter, James's domain expertise aligns perfectly with our strategic roadmap.\nMan: I completely agree. Let's draft a formal offer letter for James this afternoon with a competitive base salary and equity compensation.",
          questions: [
            { q: "What job position are the speakers hiring for?", opts: [{ key: "A", text: "Chief Financial Officer." }, { key: "B", text: "Senior Financial Analyst." }, { key: "C", text: "Investment Banking Associate." }, { key: "D", text: "Risk Management Director." }], a: "B", exp: "Vị trí: 'Senior Financial Analyst role'." },
            { q: "Why does the woman prefer James Chen?", opts: [{ key: "A", text: "He has more years of total experience." }, { key: "B", text: "He is willing to accept a lower starting salary." }, { key: "C", text: "His renewable energy expertise matches the firm's expansion strategy." }, { key: "D", text: "He holds an MBA from Harvard Business School." }], a: "C", exp: "Lý do: 'expanding heavily into clean energy infrastructure... James's domain expertise aligns perfectly'." },
            { q: "What will the speakers do this afternoon?", opts: [{ key: "A", text: "Conduct a third round of interviews." }, { key: "B", text: "Draft a formal job offer letter for James Chen." }, { key: "C", text: "Contact Elena Ortiz's professional references." }, { key: "D", text: "Consult with the human resources department head." }], a: "B", exp: "Hành động: 'draft a formal offer letter for James this afternoon'." }
          ]
        },
        {
          dialogue: "Man: Excuse me, Ms. Campbell. The printer on the fourth floor is displaying an error code E-42, and the document feeder seems completely jammed.\nWoman: That's the second time this week! That machine was serviced just last month by OfficeTech Solutions. Let me call their emergency support line to request a field technician.\nMan: In the meantime, I have 50 copies of the board presentation that must be printed before the 11:30 AM executive briefing.\nWoman: You can use the high-capacity laser printer in the marketing department on the second floor. I'll unlock the copy room for you right now.",
          questions: [
            { q: "What problem is the man experiencing?", opts: [{ key: "A", text: "The network router is offline." }, { key: "B", text: "A printer error and paper feeder jam on the fourth floor." }, { key: "C", text: "He ran out of glossy presentation paper." }, { key: "D", text: "His computer crashed during slide formatting." }], a: "B", exp: "Vấn đề: 'printer on the fourth floor is displaying an error code E-42, and the document feeder seems completely jammed'." },
            { q: "What does the man need to print urgently?", opts: [{ key: "A", text: "Employment contracts for new hires." }, { key: "B", text: "50 copies of a board presentation before 11:30 AM." }, { key: "C", text: "Quarterly sales brochures for clients." }, { key: "D", text: "Training manuals for an afternoon workshop." }], a: "B", exp: "Nhu cầu in: '50 copies of the board presentation that must be printed before the 11:30 AM executive briefing'." },
            { q: "How does the woman resolve the man's immediate need?", opts: [{ key: "A", text: "She repairs the paper jam herself." }, { key: "B", text: "She reschedules the board meeting." }, { key: "C", text: "She unlocks the marketing department copy room on the second floor." }, { key: "D", text: "She emails digital PDF copies to the executives." }], a: "C", exp: "Giải pháp: 'unlock the copy room for you right now' trên tầng 2." }
          ]
        },
        {
          dialogue: "Woman: Good morning, David. Did you attend the facilities planning committee meeting regarding our upcoming corporate headquarters relocation to the Uptown Plaza Tower?\nMan: Yes, Karen. Building management confirmed that interior buildout on floors 14 through 16 will conclude by November 15th. Physical moving of IT server racks is scheduled for the weekend of November 21st to minimize business downtime.\nWoman: That gives our staff only about three weeks to pack their departmental files and personal office belongings.\nMan: That's right. Facilities will distribute color-coded moving crates and label sheets to all departments this Thursday.",
          questions: [
            { q: "Where is the company relocating its headquarters?", opts: [{ key: "A", text: "Westlake Commerce Center." }, { key: "B", text: "Uptown Plaza Tower." }, { key: "C", text: "Grand Harbor Financial Park." }, { key: "D", text: "Midtown Executive Complex." }], a: "B", exp: "Địa điểm chuyển đến: 'Uptown Plaza Tower'." },
            { q: "Why will IT server racks be moved over the weekend?", opts: [{ key: "A", text: "To save on overtime labor expenses." }, { key: "B", text: "To minimize business operational downtime." }, { key: "C", text: "Because freight elevators are closed on weekdays." }, { key: "D", text: "To comply with city noise ordinances." }], a: "B", exp: "Lý do chuyển cuối tuần: 'minimize business downtime'." },
            { q: "What will happen this Thursday?", opts: [{ key: "A", text: "The lease agreement will be signed." }, { key: "B", text: "Color-coded moving crates and labels will be distributed." }, { key: "C", text: "The office internet connection will be tested." }, { key: "D", text: "Employees will visit the new building for a tour." }], a: "B", exp: "Sự kiện thứ Năm: 'distribute color-coded moving crates and label sheets to all departments this Thursday'." }
          ]
        },
        {
          dialogue: "Man: Hi, Stephanie. Are you attending the international supply chain conference in Munich next month?\nWoman: I would love to, Alex, but our departmental travel budget for the fiscal quarter has already been ninety percent allocated. Registration and transatlantic airfare would exceed our remaining ceiling.\nMan: You know, the corporate training fund has a separate grant program for employees presenting technical white papers. If you submit your research on automated inventory optimization before October 25th, the fund will cover your full registration and hotel expenses.\nWoman: That is fantastic advice! I will polish my research abstract and submit the grant application to HR this afternoon.",
          questions: [
            { q: "What prevented Stephanie from registering for the conference initially?", opts: [{ key: "A", text: "A scheduling conflict with a product launch." }, { key: "B", text: "Her department's quarterly travel budget was nearly exhausted." }, { key: "C", text: "Her passport was expired." }, { key: "D", text: "She lacked management approval." }], a: "B", exp: "Trở ngại ban đầu: 'departmental travel budget for the fiscal quarter has already been ninety percent allocated'." },
            { q: "How can Stephanie obtain financial support for the trip?", opts: [{ key: "A", text: "By taking a company car." }, { key: "B", text: "By applying for a corporate training grant as a paper presenter." }, { key: "C", text: "By sharing hotel accommodations with a colleague." }, { key: "D", text: "By booking non-refundable economy tickets." }], a: "B", exp: "Cách xin tài trợ: 'corporate training fund has a separate grant program for employees presenting technical white papers'." },
            { q: "What will Stephanie do this afternoon?", opts: [{ key: "A", text: "Book her flight to Munich." }, { key: "B", text: "Submit a grant application and research abstract." }, { key: "C", text: "Meet with her department manager." }, { key: "D", text: "Cancel her conference registration." }], a: "B", exp: "Hành động: 'submit the grant application to HR this afternoon'." }
          ]
        },
        {
          dialogue: "Woman: Mr. Harris, we just received the quarterly energy efficiency audit for our manufacturing plant in Detroit. The report indicates that our electricity consumption dropped by 18 percent following the LED lighting and smart HVAC upgrade.\nMan: That's an extraordinary result, Brenda! Not only does it reduce our carbon footprint, but our monthly utility bills have decreased by nearly twelve thousand dollars.\nWoman: The auditor also recommended installing solar rooftop panels on Warehouse 3, which could generate an additional 25 percent in energy self-sufficiency.\nMan: Let's prepare a cost-benefit analysis and present the solar proposal to the sustainability committee at next month's board meeting.",
          questions: [
            { q: "By how much did electricity consumption decrease at the plant?", opts: [{ key: "A", text: "8 percent." }, { key: "B", text: "12 percent." }, { key: "C", text: "18 percent." }, { key: "D", text: "25 percent." }], a: "C", exp: "Bẫy: 18% giảm điện năng tiêu thụ, $12,000 là tiền tiết kiệm hàng tháng. Đáp án: 18 percent." },
            { q: "What upgrade caused the initial reduction in utility costs?", opts: [{ key: "A", text: "Installing geothermal cooling wells." }, { key: "B", text: "LED lighting and smart HVAC system installation." }, { key: "C", text: "Replacing manufacturing conveyor belts." }, { key: "D", text: "Reducing operational shifts from three to two." }], a: "B", exp: "Nguyên nhân: 'following the LED lighting and smart HVAC upgrade'." },
            { q: "What does the man want to propose to the sustainability committee?", opts: [{ key: "A", text: "Building a wind turbine farm." }, { key: "B", text: "Installing solar rooftop panels on Warehouse 3." }, { key: "C", text: "Purchasing hybrid corporate delivery vehicles." }, { key: "D", text: "Recycling industrial wastewater." }], a: "B", exp: "Đề xuất: 'present the solar proposal to the sustainability committee'." }
          ]
        },
        {
          dialogue: "Man: Good morning, Dr. Jenkins. I'm calling from Summit Medical Supplies regarding your urgent order of 500 surgical glove boxes and 200 protective face shields.\nWoman: Yes, Kevin! We are running critically low on sterilization supplies in our outpatient surgical center. Will the shipment arrive by 2:00 PM today as promised?\nMan: The delivery van is already in transit. However, due to unexpected highway roadwork on Interstate 35, the driver is currently rerouting through downtown. The estimated arrival time is now 2:45 PM.\nWoman: That is still acceptable since our afternoon surgery schedule does not commence until 3:30 PM. Please have the driver deliver the boxes directly to Receiving Dock 4.",
          questions: [
            { q: "Why is Dr. Jenkins in urgent need of the shipment?", opts: [{ key: "A", text: "An annual hospital inspection is underway." }, { key: "B", text: "Her outpatient surgical center is critically low on supplies." }, { key: "C", text: "A donation charity drive ends at 3:00 PM." }, { key: "D", text: "She is testing new supplier quality." }], a: "B", exp: "Lý do khẩn: 'running critically low on sterilization supplies in our outpatient surgical center'." },
            { q: "What caused the delivery delay?", opts: [{ key: "A", text: "Severe thunderstorm weather." }, { key: "B", text: "Highway roadwork on Interstate 35." }, { key: "C", text: "Mechanical breakdown of the delivery van." }, { key: "D", text: "A warehouse sorting error." }], a: "B", exp: "Nguyên nhân trễ: 'unexpected highway roadwork on Interstate 35'." },
            { q: "Where should the driver deliver the supplies?", opts: [{ key: "A", text: "Main Hospital Entrance." }, { key: "B", text: "Receiving Dock 4." }, { key: "C", text: "Floor 2 Pharmacy Storage." }, { key: "D", text: "Doctor Jenkins's private clinic office." }], a: "B", exp: "Địa điểm giao: 'deliver the boxes directly to Receiving Dock 4'." }
          ]
        }
      ];

      let p3QNum = 32;
      part3Sets.forEach((set, sIdx) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr2_q${p3QNum}`,
            partNumber: 3,
            partTitle: "Part 3: Conversations",
            section: "LISTENING",
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(sIdx % 4) + 1}.mp3`,
            passageText: `[Audio Transcript - Conversation #${sIdx + 1}]\n${set.dialogue}`,
            questionText: `Question ${p3QNum}: ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
          p3QNum++;
        });
      });

      // PART 4: SHORT TALKS (Q71 - Q100: 10 TALKS × 3 QUESTIONS = 30 QUESTIONS)
      const part4Sets: { transcript: string; questions: { q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        {
          transcript: "Attention all shoppers in the electronics department of MegaMart. For the next thirty minutes only, we are holding a flash clearance sale on all 4K Ultra HD smart televisions from top brands including Samsung and LG. All 55-inch and 65-inch models are marked down by an extra twenty-five percent off the lowest ticketed price. In addition, all television purchases made during this promotional window include a complimentary two-year extended manufacturer warranty and free home delivery within a twenty-mile radius. Please visit Aisle 12 to speak with our product specialists or collect your discount claim voucher. This special offer ends promptly at 4:00 PM.",
          questions: [
            { q: "What merchandise is discounted during the flash sale?", opts: [{ key: "A", text: "Laptop computers and tablets." }, { key: "B", text: "4K Ultra HD smart televisions." }, { key: "C", text: "Kitchen microwave ovens." }, { key: "D", text: "Digital SLR cameras." }], a: "B", exp: "Sản phẩm giảm giá: 'flash clearance sale on all 4K Ultra HD smart televisions'." },
            { q: "What bonus is included with TV purchases?", opts: [{ key: "A", text: "A free streaming media subscription." }, { key: "B", text: "A 2-year warranty and free local delivery." }, { key: "C", text: "A $50 supermarket gift card." }, { key: "D", text: "A complimentary soundbar speaker." }], a: "B", exp: "Khuyến mãi kèm theo: 'complimentary two-year extended manufacturer warranty and free home delivery'." },
            { q: "When does the flash sale conclude?", opts: [{ key: "A", text: "In fifteen minutes." }, { key: "B", text: "Promptly at 4:00 PM." }, { key: "C", text: "At store closing time." }, { key: "D", text: "At midnight." }], a: "B", exp: "Thời gian kết thúc: 'ends promptly at 4:00 PM'." }
          ]
        },
        {
          transcript: "Good morning, everyone. Welcome to the orientation seminar for our new corporate software platform, CloudPulse ERP. My name is Rebecca Vance, and I am the lead system architect for this rollout. Over the next two weeks, all departments will transition from our legacy accounting and customer relationship management systems to this integrated cloud solution. Today's workshop will focus on basic navigation, daily expense reporting, and client invoice generation. Before we begin hands-on exercises on your training laptops, please ensure you have logged in using the temporary credentials sent to your corporate email yesterday. If you experience password authentication issues, please raise your hand so our IT support team can assist you.",
          questions: [
            { q: "What is the purpose of the orientation seminar?", opts: [{ key: "A", text: "To announce new executive promotions." }, { key: "B", text: "To train employees on the new CloudPulse ERP software." }, { key: "C", text: "To conduct annual employee performance reviews." }, { key: "D", text: "To explain updated health insurance benefits." }], a: "B", exp: "Mục đích: 'orientation seminar for our new corporate software platform, CloudPulse ERP'." },
            { q: "What modules will today's workshop cover?", opts: [{ key: "A", text: "Advanced payroll and tax deductions." }, { key: "B", text: "Navigation, expense reporting, and invoice generation." }, { key: "C", text: "Cybersecurity firewall configuration." }, { key: "D", text: "Server hardware maintenance protocols." }], a: "B", exp: "Nội dung hôm nay: 'basic navigation, daily expense reporting, and client invoice generation'." },
            { q: "What should attendees do if they have password login issues?", opts: [{ key: "A", text: "Restart their laptops." }, { key: "B", text: "Raise their hands for IT support assistance." }, { key: "C", text: "Email the human resources department." }, { key: "D", text: "Borrow a coworker's login credentials." }], a: "B", exp: "Hướng dẫn: 'raise your hand so our IT support team can assist you'." }
          ]
        },
        {
          transcript: "This is a recorded message from Metro Transit Authority for commuters on the Blue Line subway service. Due to emergency track repair work between Central Station and University Plaza, Blue Line trains are operating with severe delays of fifteen to twenty minutes in both directions. In addition, trains will bypass Riverfront Station entirely until 6:00 PM this evening. Free shuttle buses are running continuously along Grand Avenue to transport affected passengers between Central Station and Riverfront Plaza. We recommend passengers traveling to the airport to transfer to the Express Green Line at 14th Street. We apologize for the inconvenience and appreciate your patience as our maintenance crews work to restore normal service.",
          questions: [
            { q: "What is causing the transit delays?", opts: [{ key: "A", text: "Severe winter blizzard conditions." }, { key: "B", text: "Emergency track repair work." }, { key: "C", text: "A power grid blackout." }, { key: "D", text: "A labor strike by transit workers." }], a: "B", exp: "Nguyên nhân trễ: 'emergency track repair work between Central Station and University Plaza'." },
            { q: "Which station is being bypassed by trains until 6:00 PM?", opts: [{ key: "A", text: "Central Station." }, { key: "B", text: "University Plaza." }, { key: "C", text: "Riverfront Station." }, { key: "D", text: "14th Street Station." }], a: "C", exp: "Ga bị bỏ qua: 'trains will bypass Riverfront Station entirely until 6:00 PM'." },
            { q: "What alternative is recommended for airport travelers?", opts: [{ key: "A", text: "Take a taxi directly from Central Station." }, { key: "B", text: "Transfer to the Express Green Line at 14th Street." }, { key: "C", text: "Use the commuter rail service on Platform 4." }, { key: "D", text: "Wait for the express airport shuttle bus." }], a: "B", exp: "Khuyến nghị khách đi sân bay: 'transfer to the Express Green Line at 14th Street'." }
          ]
        },
        {
          transcript: "Good evening, radio listeners. This is Daniel Thorne with WNX Business Hour. In national retail developments today, organic grocery chain FreshHarvest announced plans to open twenty-five new supermarket locations across the Pacific Northwest over the next eighteen months. The ambitious five-hundred-million-dollar expansion is expected to generate more than three thousand full-time retail and logistics jobs in Oregon and Washington. FreshHarvest CEO Sarah Jenkins stated that all new stores will feature rooftop solar arrays, zero-waste packaging stations, and locally sourced agricultural produce. Construction on the first flagship store in downtown Portland will commence on December 1st.",
          questions: [
            { q: "How many new supermarket locations does FreshHarvest plan to open?", opts: [{ key: "A", text: "15 locations." }, { key: "B", text: "20 locations." }, { key: "C", text: "25 locations." }, { key: "D", text: "50 locations." }], a: "C", exp: "Số lượng cửa hàng mới: 'open twenty-five new supermarket locations'." },
            { q: "How many jobs will the expansion create?", opts: [{ key: "A", text: "500 jobs." }, { key: "B", text: "1,500 jobs." }, { key: "C", text: "Over 3,000 full-time jobs." }, { key: "D", text: "5,000 seasonal jobs." }], a: "C", exp: "Số việc làm: 'generate more than three thousand full-time retail and logistics jobs'." },
            { q: "Where will the first flagship store be constructed?", opts: [{ key: "A", text: "Seattle." }, { key: "B", text: "Downtown Portland." }, { key: "C", text: "Spokane." }, { key: "D", text: "Tacoma." }], a: "B", exp: "Địa điểm cửa hàng đầu tiên: 'downtown Portland will commence on December 1st'." }
          ]
        },
        {
          transcript: "Hello, Mr. Alvarez. This is Linda Chang calling from Apex Automotive Service Center regarding your 2024 Honda Accord. Our master mechanic has completed the multi-point inspection. The brake pads and rotors are in excellent condition, but we found a minor fluid leak in the power steering pump. In addition, your engine timing belt is showing signs of significant wear and should be replaced to prevent potential engine failure during highway driving. The total estimate for parts and labor is four hundred and eighty dollars. If you authorize the repair before 1:00 PM, we can have all parts installed and your vehicle ready for pickup by 5:30 PM today. Please call me back at 555-0199 to confirm.",
          questions: [
            { q: "What mechanical issues were identified during the inspection?", opts: [{ key: "A", text: "Worn brake pads and flat tires." }, { key: "B", text: "A power steering fluid leak and worn timing belt." }, { key: "C", text: "A cracked windshield and broken headlight." }, { key: "D", text: "A dead battery and faulty alternator." }], a: "B", exp: "Vấn đề kỹ thuật: 'minor fluid leak in the power steering pump' và 'engine timing belt showing signs of significant wear'." },
            { q: "What is the total estimated repair cost?", opts: [{ key: "A", text: "$280." }, { key: "B", text: "$380." }, { key: "C", text: "$480." }, { key: "D", text: "$580." }], a: "C", exp: "Chi phí ước tính: 'four hundred and eighty dollars'." },
            { q: "By when will the car be ready if authorized before 1:00 PM?", opts: [{ key: "A", text: "3:00 PM today." }, { key: "B", text: "5:30 PM today." }, { key: "C", text: "Tomorrow morning at 9:00 AM." }, { key: "D", text: "Friday afternoon." }], a: "B", exp: "Giờ nhận xe: 'ready for pickup by 5:30 PM today'." }
          ]
        },
        {
          transcript: "Welcome to the City Hall press briefing. I am Mayor Robert Thornton. Today, I am proud to announce the formal launch of our 'Clean Metro 2030' environmental initiative. Starting on January 1st, the municipal transit fleet will begin transitioning entirely to zero-emission electric buses, with the first 50 electric vehicles entering active route service across the downtown core. Furthermore, the city council has approved a fifteen-million-dollar grant program to subsidize residential rooftop solar panel installations and smart energy storage batteries for qualifying homeowners. Detailed application guidelines and eligibility criteria will be posted on the municipal portal at cityofmetro.gov by November 15th.",
          questions: [
            { q: "What is the main topic of the press briefing?", opts: [{ key: "A", text: "A new downtown commercial zoning law." }, { key: "B", text: "The 'Clean Metro 2030' environmental and clean transit initiative." }, { key: "C", text: "Municipal property tax increases." }, { key: "D", text: "A highway expansion construction project." }], a: "B", exp: "Chủ đề: 'launch of our Clean Metro 2030 environmental initiative'." },
            { q: "How many electric buses will enter service initially?", opts: [{ key: "A", text: "25 buses." }, { key: "B", text: "50 buses." }, { key: "C", text: "100 buses." }, { key: "D", text: "200 buses." }], a: "B", exp: "Số xe ban đầu: 'first 50 electric vehicles entering active route service'." },
            { q: "What will be available on cityofmetro.gov by November 15th?", opts: [{ key: "A", text: "Public bus route timetables." }, { key: "B", text: "Solar grant application guidelines and eligibility criteria." }, { key: "C", text: "City council election candidate profiles." }, { key: "D", text: "Mayor Thornton's annual budget report." }], a: "B", exp: "Nội dung đăng tải: 'application guidelines and eligibility criteria for residential solar grants'." }
          ]
        },
        {
          transcript: "Attention all passengers onboard the Pacific Coast Express train service bound for Seattle with stops in Portland and Tacoma. Due to freight train congestion on the main rail corridor ahead, our train will be held on the siding track for approximately twenty-five minutes. During this delay, complimentary bottled water, coffee, and light pastries are available in the Dining Lounge located in Car 4. We kindly remind passengers that smoking and electronic cigarettes are strictly prohibited anywhere on the train, including restrooms and vestibules. We will provide another status announcement as soon as track clearance is confirmed by the central dispatcher.",
          questions: [
            { q: "What is causing the train delay?", opts: [{ key: "A", text: "Severe mechanical engine failure." }, { key: "B", text: "Freight train congestion on the rail corridor ahead." }, { key: "C", text: "Flooding on the coastal tracks." }, { key: "D", text: "An emergency medical passenger situation." }], a: "B", exp: "Nguyên nhân trễ: 'freight train congestion on the main rail corridor ahead'." },
            { q: "Where can passengers obtain complimentary refreshments?", opts: [{ key: "A", text: "At their seats via trolley service." }, { key: "B", text: "In the Dining Lounge in Car 4." }, { key: "C", text: "In the baggage storage car." }, { key: "D", text: "In the conductor's cabin." }], a: "B", exp: "Địa điểm nhận đồ ăn nhẹ: 'Dining Lounge located in Car 4'." },
            { q: "What rule does the speaker emphasize?", opts: [{ key: "A", text: "Laptops must remain closed during delays." }, { key: "B", text: "Smoking and e-cigarettes are strictly prohibited on the train." }, { key: "C", text: "Passengers must remain in their assigned seats." }, { key: "D", text: "Cell phone calls must be kept under two minutes." }], a: "B", exp: "Quy định: 'smoking and electronic cigarettes are strictly prohibited anywhere on the train'." }
          ]
        },
        {
          transcript: "Good morning and thank you for joining this quarterly corporate earnings call for Horizon Semiconductor Solutions. I am Marcus Vance, Chief Financial Officer. For the third quarter of 2026, Horizon reported consolidated revenue of 3.4 billion dollars, representing a fourteen percent year-over-year increase driven primarily by surging enterprise demand for our high-performance AI processing chips and automotive microcontrollers. Our gross profit margin expanded to 58.5 percent, while net operating income reached 920 million dollars. Looking ahead to the fourth quarter, we are raising our full-year revenue guidance to 13.8 billion dollars based on strong commercial backlogs in North America and East Asia. We will now open the line for analyst questions.",
          questions: [
            { q: "Who is the speaker?", opts: [{ key: "A", text: "Chief Executive Officer." }, { key: "B", text: "Marcus Vance, Chief Financial Officer." }, { key: "C", text: "Head of Chip Research and Development." }, { key: "D", text: "Director of Investor Relations." }], a: "B", exp: "Diễn giả: 'Marcus Vance, Chief Financial Officer'." },
            { q: "What drove the company's revenue growth?", opts: [{ key: "A", text: "Consumer smartphone sales discounts." }, { key: "B", text: "Surging demand for AI processing chips and automotive microcontrollers." }, { key: "C", text: "A government tax credit subsidy." }, { key: "D", text: "The acquisition of a competitor's fabrication facility." }], a: "B", exp: "Động lực tăng trưởng: 'surging enterprise demand for our high-performance AI processing chips and automotive microcontrollers'." },
            { q: "What is Horizon's revised full-year revenue guidance?", opts: [{ key: "A", text: "3.4 billion dollars." }, { key: "B", text: "9.2 billion dollars." }, { key: "C", text: "13.8 billion dollars." }, { key: "D", text: "15.0 billion dollars." }], a: "C", exp: "Dự báo doanh thu cả năm mới: 'raising our full-year revenue guidance to 13.8 billion dollars'." }
          ]
        },
        {
          transcript: "Welcome to the Grandview Museum of Fine Arts. Before you begin exploring our featured retrospective exhibition, 'Masters of Modern Impressionism,' please take note of our visitor guidelines. Photography is permitted for personal, non-commercial use in Galleries 1 through 4; however, flash photography, tripods, and selfie sticks are strictly prohibited to protect the delicate canvas pigments. Audio guide headsets are available for rent at the reception desk for five dollars in eight languages. Guided curator tours depart from the central atrium every hour on the half-hour. Finally, please remember that food and beverages are not allowed inside the exhibition halls. We hope you enjoy your visit today.",
          questions: [
            { q: "What equipment is strictly prohibited in the galleries?", opts: [{ key: "A", text: "Smartphones and tablets." }, { key: "B", text: "Flash photography, tripods, and selfie sticks." }, { key: "C", text: "Sketchpads and pencils." }, { key: "D", text: "Audio guide headsets." }], a: "B", exp: "Thiết bị bị cấm: 'flash photography, tripods, and selfie sticks are strictly prohibited'." },
            { q: "How much does it cost to rent an audio guide?", opts: [{ key: "A", text: "It is free with admission." }, { key: "B", text: "Three dollars." }, { key: "C", text: "Five dollars." }, { key: "D", text: "Ten dollars." }], a: "C", exp: "Giá thuê audio guide: 'five dollars in eight languages'." },
            { q: "When do guided curator tours depart?", opts: [{ key: "A", text: "Every hour on the hour." }, { key: "B", text: "Every hour on the half-hour from the central atrium." }, { key: "C", text: "Twice daily at 10 AM and 2 PM." }, { key: "D", text: "By private advance reservation only." }], a: "B", exp: "Lịch tour hướng dẫn: 'depart from the central atrium every hour on the half-hour'." }
          ]
        },
        {
          transcript: "Attention all warehouse associates at the Dallas Distribution Center. This is a mandatory safety announcement from the Operations Safety Committee. Beginning Monday, November 3rd, all personnel entering the active logistics floor must wear high-visibility reflective safety vests and steel-toed boots at all times. In addition, the maximum motorized forklift speed limit in designated pedestrian crossing aisles has been lowered from eight miles per hour to five miles per hour. New digital speed radars and floor signage have been installed throughout Zones A through E. Failure to adhere to these safety regulations will result in formal disciplinary action. Free replacement vests are available at the Safety Office.",
          questions: [
            { q: "What protective gear is mandatory starting November 3rd?", opts: [{ key: "A", text: "Safety goggles and earplugs." }, { key: "B", text: "High-visibility reflective vests and steel-toed boots." }, { key: "C", text: "Full hazmat suits." }, { key: "D", text: "Thermal insulated gloves." }], a: "B", exp: "Trang bị bảo hộ bắt buộc: 'high-visibility reflective safety vests and steel-toed boots'." },
            { q: "What is the new forklift speed limit in pedestrian aisles?", opts: [{ key: "A", text: "3 miles per hour." }, { key: "B", text: "5 miles per hour." }, { key: "C", text: "8 miles per hour." }, { key: "D", text: "10 miles per hour." }], a: "B", exp: "Bẫy: 8 mph là tốc độ CŨ. Tốc độ MỚI: 'lowered from eight miles per hour to five miles per hour'." },
            { q: "Where can associates obtain replacement vests?", opts: [{ key: "A", text: "From the Human Resources reception desk." }, { key: "B", text: "At the warehouse Safety Office." }, { key: "C", text: "In the employee breakroom." }, { key: "D", text: "At the security gate." }], a: "B", exp: "Nơi nhận áo bảo hộ mới: 'available at the Safety Office'." }
          ]
        }
      ];

      let p4QNum = 71;
      part4Sets.forEach((set, sIdx) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr2_q${p4QNum}`,
            partNumber: 4,
            partTitle: "Part 4: Short Talks",
            section: "LISTENING",
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(sIdx % 4) + 1}.mp3`,
            passageText: `[Audio Transcript - Talk #${sIdx + 1}]\n${set.transcript}`,
            questionText: `Question ${p4QNum}: ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
          p4QNum++;
        });
      });

      // PART 5: INCOMPLETE SENTENCES (Q101 - Q130: 30 UNIQUE QUESTIONS)
      const part5Data: { q: string; a: "A"|"B"|"C"|"D"; opts: { key: string; text: string }[]; exp: string }[] = [
        { q: "The executive committee will convene tomorrow morning to _______ the proposed corporate acquisition.", a: "A", opts: [{ key: "A", text: "evaluate" }, { key: "B", text: "evaluation" }, { key: "C", text: "evaluative" }, { key: "D", text: "evaluator" }], exp: "Sau động từ khuyết thiếu 'to' trong cụm chỉ mục đích cần động từ nguyên mẫu 'evaluate'." },
        { q: "Ms. Jenkins was _______ selected as the new regional director of marketing due to her proven track record.", a: "C", opts: [{ key: "A", text: "unanimous" }, { key: "B", text: "unanimity" }, { key: "C", text: "unanimously" }, { key: "D", text: "unanimousness" }], exp: "Trạng từ 'unanimously' bổ nghĩa cho động từ bị động 'was selected'." },
        { q: "All laboratory visitors must wear safety goggles and protective lab coats _______ entering the chemical testing bay.", a: "B", opts: [{ key: "A", text: "during" }, { key: "B", text: "before" }, { key: "C", text: "while" }, { key: "D", text: "since" }], exp: "Giới từ 'before + V-ing' chỉ hành động phải làm trước khi bước vào phòng hóa chất." },
        { q: "The new automated packaging machinery operates much more _______ than the legacy equipment installed in 2018.", a: "D", opts: [{ key: "A", text: "efficiency" }, { key: "B", text: "efficient" }, { key: "C", text: "efficiencies" }, { key: "D", text: "efficiently" }], exp: "Trạng từ 'efficiently' bổ nghĩa cho động từ 'operates' trong cấu trúc so sánh hơn 'more efficiently than'." },
        { q: "The human resources department has introduced a new mentorship initiative to enhance employee _______.", a: "B", opts: [{ key: "A", text: "retain" }, { key: "B", text: "retention" }, { key: "C", text: "retaining" }, { key: "D", text: "retained" }], exp: "Cụm danh từ 'employee retention' (tỷ lệ giữ chân nhân viên). Sau danh từ 'employee' cần noun 'retention'." },
        { q: "_______ severe traffic delays on the interstate highway, the delivery van arrived at the warehouse on schedule.", a: "C", opts: [{ key: "A", text: "Although" }, { key: "B", text: "Because" }, { key: "C", text: "Despite" }, { key: "D", text: "Since" }], exp: "'Despite + noun phrase' thể hiện sự tương phản ('Mặc dù tắc đường nghiêm trọng...'). 'Although' cần đi với mệnh đề." },
        { q: "The keynote speaker's presentation on artificial intelligence was _______ informative and thought-provoking.", a: "A", opts: [{ key: "A", text: "both" }, { key: "B", text: "either" }, { key: "C", text: "neither" }, { key: "D", text: "whether" }], exp: "Cặp liên từ tương quan 'both... and...' (vừa mang tính thông tin vừa kích thích tư duy)." },
        { q: "Please ensure that all quarterly expense vouchers are submitted _______ Friday at 5:00 PM.", a: "B", opts: [{ key: "A", text: "until" }, { key: "B", text: "by" }, { key: "C", text: "within" }, { key: "D", text: "during" }], exp: "'By + thời điểm' biểu thị deadline (trước hoặc đúng lúc 5:00 PM). 'Until' diễn tả hành động kéo dài liên tục." },
        { q: "The hotel offers _______ airport shuttle transportation for guests staying in executive suites.", a: "D", opts: [{ key: "A", text: "compliment" }, { key: "B", text: "complimented" }, { key: "C", text: "complimenting" }, { key: "D", text: "complimentary" }], exp: "Tính từ 'complimentary' có nghĩa là 'miễn phí' bổ nghĩa cho danh từ 'transportation'." },
        { q: "The newly renovated corporate cafeteria will reopen _______ next Monday morning.", a: "A", opts: [{ key: "A", text: "effective" }, { key: "B", text: "effectively" }, { key: "C", text: "effectiveness" }, { key: "D", text: "effect" }], exp: "Cụm 'effective + time' = 'có hiệu lực / bắt đầu từ thời điểm'. Thường dùng trong văn bản hành chính." },
        { q: "Dr. Kim's research on renewable solar cells has gained _______ recognition throughout the scientific community.", a: "C", opts: [{ key: "A", text: "globe" }, { key: "B", text: "globally" }, { key: "C", text: "global" }, { key: "D", text: "globalize" }], exp: "Tính từ 'global' bổ nghĩa cho danh từ 'recognition'." },
        { q: "Employees who work overtime during the holiday season are entitled to receive _______ compensation.", a: "B", opts: [{ key: "A", text: "addition" }, { key: "B", text: "additional" }, { key: "C", text: "additionally" }, { key: "D", text: "add" }], exp: "Tính từ 'additional' bổ nghĩa cho danh từ 'compensation' (thù lao làm thêm giờ bổ sung)." },
        { q: "The CEO, accompanied by members of the board of directors, _______ arriving in Tokyo for the summit.", a: "D", opts: [{ key: "A", text: "are" }, { key: "B", text: "were" }, { key: "C", text: "have been" }, { key: "D", text: "is" }], exp: "Đố mẹo: Cụm 'accompanied by...' không làm thay đổi số của chủ ngữ chính 'The CEO' (số ít) → 'is'." },
        { q: "Customers can track the real-time shipping status of their orders _______ our mobile smartphone app.", a: "A", opts: [{ key: "A", text: "through" }, { key: "B", text: "among" }, { key: "C", text: "between" }, { key: "D", text: "across" }], exp: "Giới từ 'through' mang nghĩa 'thông qua / bằng cách sử dụng ứng dụng'." },
        { q: "The company's annual revenue grew by 14 percent, _______ exceeding initial Wall Street projections.", a: "C", opts: [{ key: "A", text: "substance" }, { key: "B", text: "substantial" }, { key: "C", text: "substantially" }, { key: "D", text: "substantiate" }], exp: "Trạng từ 'substantially' (đáng kể) bổ nghĩa cho phân từ 'exceeding'." },
        { q: "It is essential that all sensitive client financial records be stored in a _______ encrypted database.", a: "B", opts: [{ key: "A", text: "secure" }, { key: "B", text: "securely" }, { key: "C", text: "security" }, { key: "D", text: "securing" }], exp: "Trạng từ 'securely' bổ nghĩa cho tính từ/phân từ 'encrypted'." },
        { q: "Neither the marketing director nor the regional sales representatives _______ in favor of altering the campaign slogan.", a: "A", opts: [{ key: "A", text: "were" }, { key: "B", text: "was" }, { key: "C", text: "is" }, { key: "D", text: "has been" }], exp: "Cấu trúc 'Neither A nor B': Động từ chia theo danh từ gần nhất 'sales representatives' (số nhiều) → 'were'." },
        { q: "The legal department advised the executive committee to proceed _______ with the intellectual property settlement.", a: "D", opts: [{ key: "A", text: "cautious" }, { key: "B", text: "caution" }, { key: "C", text: "cautionary" }, { key: "D", text: "cautiously" }], exp: "Trạng từ 'cautiously' bổ nghĩa cho động từ 'proceed' (tiến hành một cách cẩn trọng)." },
        { q: "The warranty policy covers all manufacturing defects _______ a period of three years from the purchase date.", a: "C", opts: [{ key: "A", text: "since" }, { key: "B", text: "at" }, { key: "C", text: "for" }, { key: "D", text: "with" }], exp: "Giới từ 'for + khoảng thời gian' ('for a period of three years')." },
        { q: "Participants who complete the professional leadership certification will be _______ for promotion to senior management.", a: "A", opts: [{ key: "A", text: "eligible" }, { key: "B", text: "illegible" }, { key: "C", text: "eligibility" }, { key: "D", text: "eligibly" }], exp: "Bẫy từ vựng: 'eligible for' = đủ điều kiện. 'Illegible' = khó đọc/chữ xấu." },
        { q: "The facilities manager requested that all non-essential lighting _______ switched off after 8:00 PM.", a: "C", opts: [{ key: "A", text: "is" }, { key: "B", text: "was" }, { key: "C", text: "be" }, { key: "D", text: "are" }], exp: "Cấu trúc giả định (Subjunctive mood): 'requested that S + (should) + V nguyên thể' → 'be switched off'." },
        { q: "Despite fierce market competition, Apex Global has maintained its _______ as the industry's top cloud provider.", a: "D", opts: [{ key: "A", text: "positioned" }, { key: "B", text: "positional" }, { key: "C", text: "positioning" }, { key: "D", text: "position" }], exp: "Tính từ sở hữu 'its' cần theo sau bởi danh từ 'position' (vị thế dẫn đầu)." },
        { q: "The conference organizers have arranged _______ parking for all registered seminar attendees in Garage B.", a: "A", opts: [{ key: "A", text: "designated" }, { key: "B", text: "designate" }, { key: "C", text: "designation" }, { key: "D", text: "designating" }], exp: "Tính từ/phân từ 'designated parking' (khu vực đỗ xe được chỉ định)." },
        { q: "The quarterly budget was revised _______ to accommodate unexpected raw material cost increases.", a: "B", opts: [{ key: "A", text: "upward" }, { key: "B", text: "upwardly" }, { key: "C", text: "upwardness" }, { key: "D", text: "upwarding" }], exp: "Trạng từ 'upwardly' hoặc 'upward' bổ nghĩa cho 'was revised' (điều chỉnh tăng lên)." },
        { q: "The marketing director is currently evaluating whether to launch the promotional campaign in spring _______ autumn.", a: "C", opts: [{ key: "A", text: "nor" }, { key: "B", text: "and" }, { key: "C", text: "or" }, { key: "D", text: "but" }], exp: "Cặp liên từ 'whether... or...' (liệu ... hay là ...)." },
        { q: "Any employee seeking leave of absence must submit a formal request _______ their immediate supervisor.", a: "D", opts: [{ key: "A", text: "from" }, { key: "B", text: "at" }, { key: "C", text: "with" }, { key: "D", text: "to" }], exp: "Cụm 'submit something to someone' (nộp đơn lên cấp trên trực tiếp)." },
        { q: "The flight attendant provided a detailed _______ of emergency safety procedures before takeoff.", a: "A", opts: [{ key: "A", text: "demonstration" }, { key: "B", text: "demonstrate" }, { key: "C", text: "demonstrative" }, { key: "D", text: "demonstrator" }], exp: "Danh từ 'demonstration' (sự hướng dẫn / minh họa) đứng sau tính từ 'detailed'." },
        { q: "Ms. Thorne demonstrated _______ negotiation skills when closing the multi-million-dollar government contract.", a: "C", opts: [{ key: "A", text: "impress" }, { key: "B", text: "impression" }, { key: "C", text: "impressive" }, { key: "D", text: "impressively" }], exp: "Tính từ 'impressive' bổ nghĩa cho cụm danh từ 'negotiation skills'." },
        { q: "The research laboratory will be closed for modernization work _______ Friday, October 24th.", a: "B", opts: [{ key: "A", text: "as of" }, { key: "B", text: "starting on" }, { key: "C", text: "prior" }, { key: "D", text: "except" }], exp: "Cụm 'starting on + date' = bắt đầu từ ngày..." },
        { q: "The factory exceeded its annual production targets _______ implementing automated robotics on the assembly line.", a: "A", opts: [{ key: "A", text: "after" }, { key: "B", text: "before" }, { key: "C", text: "during" }, { key: "D", text: "until" }], exp: "Liên từ/giới từ 'after + V-ing' thể hiện mốc thời gian hoàn thành mục tiêu sau khi lắp đặt robot." }
      ];

      part5Data.forEach((item, idx) => {
        const qNum = idx + 101;
        qs.push({
          id: `tlr2_q${qNum}`,
          partNumber: 5,
          partTitle: "Part 5: Incomplete Sentences",
          section: "READING",
          questionText: `${qNum}. ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a,
          explanation: item.exp
        });
      });

      // PART 6: TEXT COMPLETION (Q131 - Q146: 4 PASSAGES × 4 QUESTIONS = 16 QUESTIONS)
      const part6Sets: { passage: string; questions: { blank: number; q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        {
          passage: "MEMORANDUM\nTo: All Regional Branch Managers\nFrom: Executive Operations Committee\nDate: October 18, 2026\nSubject: Implementation of Sustainable Packaging Protocols\n\nEffective November 1, 2026, all regional logistics centers must transition to 100% recyclable shipping cartons and biodegradable packaging filler. This corporate policy is part of our ongoing [131] _______ to reduce our environmental carbon footprint by thirty percent over the next three years.\n\nAll existing plastic packaging materials must be utilized [132] _______ October 31. Any remaining non-recyclable inventory should be returned to the central warehouse for certified industrial recycling. [133] _______, warehouse supervisors must ensure that all packing stations are stocked with the new paper-based materials by next Friday.\n\n[134] _______. Thank you for your leadership in making Apex Logistics an environmentally responsible enterprise.",
          questions: [
            { blank: 131, q: "Select the best word for blank [131].", opts: [{ key: "A", text: "commitment" }, { key: "B", text: "committing" }, { key: "C", text: "committed" }, { key: "D", text: "committal" }], a: "A", exp: "Danh từ 'commitment' (sự cam kết) sau tính từ 'ongoing'." },
            { blank: 132, q: "Select the best word for blank [132].", opts: [{ key: "A", text: "prior to" }, { key: "B", text: "since" }, { key: "C", text: "except" }, { key: "D", text: "without" }], a: "A", exp: "Cụm 'prior to + date' = trước ngày 31/10." },
            { blank: 133, q: "Select the best transition word for blank [133].", opts: [{ key: "A", text: "Furthermore" }, { key: "B", text: "However" }, { key: "C", text: "Conversely" }, { key: "D", text: "Nevertheless" }], a: "A", exp: "'Furthermore' bổ sung thêm nhiệm vụ tiếp theo cho các giám sát viên." },
            { blank: 134, q: "Select the most appropriate sentence for blank [134].", opts: [{ key: "A", text: "The cafeteria menu will feature organic vegetarian options." }, { key: "B", text: "Online compliance training modules will be available on the staff intranet starting Monday." }, { key: "C", text: "The executive committee was established in 2004." }, { key: "D", text: "Corporate offices will remain closed during national holidays." }], a: "B", exp: "Câu B cung cấp thông tin đào tạo tuân thủ quy trình mới cho nhân viên — logic và phù hợp nhất." }
          ]
        },
        {
          passage: "PRESS RELEASE — FOR IMMEDIATE RELEASE\nTechCorp Global Announces Breakthrough Quantum Microprocessor\nSAN FRANCISCO, CA — October 22, 2026\n\nTechCorp Global today unveiled its next-generation QuantumCore processor, designed specifically for enterprise artificial intelligence computing. The revolutionary architecture delivers a 400% performance increase while consuming 60% less energy than [135] _______ semiconductor chips.\n\n\"The QuantumCore processor represents a monumental leap forward in green computing infrastructure,\" said Dr. Elena Rostova, Chief Technology Officer. \"It allows data centers to train complex neural networks [136] _______ while dramatically lowering operational electricity expenditures.\"\n\nCommercial shipments to enterprise cloud providers will commence in the second quarter of 2027. Early access evaluation kits are currently being [137] _______ to select strategic partners.\n\n[138] _______. For investor relations inquiries, visit techcorpglobal.com/investors.",
          questions: [
            { blank: 135, q: "Select the best word for blank [135].", opts: [{ key: "A", text: "conventional" }, { key: "B", text: "convention" }, { key: "C", text: "conventionally" }, { key: "D", text: "conventionality" }], a: "A", exp: "Tính từ 'conventional' (truyền thống / thông thường) bổ nghĩa cho cụm danh từ 'semiconductor chips'." },
            { blank: 136, q: "Select the best word for blank [136].", opts: [{ key: "A", text: "efficient" }, { key: "B", text: "efficiency" }, { key: "C", text: "efficiently" }, { key: "D", text: "efficientness" }], a: "C", exp: "Trạng từ 'efficiently' bổ nghĩa cho động từ 'to train'." },
            { blank: 137, q: "Select the best word for blank [137].", opts: [{ key: "A", text: "distributed" }, { key: "B", text: "distribute" }, { key: "C", text: "distribution" }, { key: "D", text: "distributing" }], a: "A", exp: "Dạng bị động 'are currently being distributed' (đang được phân phối)." },
            { blank: 138, q: "Select the most appropriate sentence for blank [138].", opts: [{ key: "A", text: "The company's stock price dropped by three percent last month." }, { key: "B", text: "Complete technical specifications and benchmark reports are available on the company website." }, { key: "C", text: "The annual shareholders meeting took place in London." }, { key: "D", text: "Dr. Rostova joined TechCorp Global as an intern in 2012." }], a: "B", exp: "Câu B cung cấp đường dẫn tài liệu kỹ thuật chi tiết sau buổi ra mắt sản phẩm." }
          ]
        },
        {
          passage: "CUSTOMER NOTICE — HARBOR VIEW APARTMENTS\nBuilding Management Office\nDate: October 25, 2026\n\nDear Residents,\n\nPlease be advised that annual window pressure-washing and exterior facade inspections will take place from Monday, November 10 through Thursday, November 13, weather permitting. Professional contractors from Apex Building Maintenance will be working on suspended platforms outside your windows between 8:30 AM and 5:00 PM daily.\n\nTo ensure your privacy and prevent any potential water intrusion, we [139] _______ ask that you keep all windows fully closed and latched during maintenance hours. [140] _______, please remove all personal items, plants, and decorations from exterior balcony railings.\n\nIf you have pets that may become [141] _______ by workers outside your windows, please keep them in interior rooms during the cleaning schedule.\n\n[142] _______. Thank you for your cooperation.\n\nHarbor View Management",
          questions: [
            { blank: 139, q: "Select the best word for blank [139].", opts: [{ key: "A", text: "kind" }, { key: "B", text: "kindly" }, { key: "C", text: "kindness" }, { key: "D", text: "kindliest" }], a: "B", exp: "Trạng từ lịch sự 'kindly ask that...' (trân trọng đề nghị)." },
            { blank: 140, q: "Select the best transition word for blank [140].", opts: [{ key: "A", text: "In addition" }, { key: "B", text: "On the other hand" }, { key: "C", text: "Consequently" }, { key: "D", text: "In contrast" }], a: "A", exp: "'In addition' bổ sung thêm yêu cầu thứ 2 (dọn đồ ban công)." },
            { blank: 141, q: "Select the best word for blank [141].", opts: [{ key: "A", text: "distress" }, { key: "B", text: "distressed" }, { key: "C", text: "distressingly" }, { key: "D", text: "distressing" }], a: "B", exp: "Tính từ bị động 'distressed' (bị hoảng sợ/lo lắng) dùng cho động vật/người." },
            { blank: 142, q: "Select the most appropriate sentence for blank [142].", opts: [{ key: "A", text: "The apartment complex was built by Johnson Construction in 2019." }, { key: "B", text: "For any urgent inquiries, please contact the front desk at extension 104." }, { key: "C", text: "Parking permits must be renewed before the end of the calendar year." }, { key: "D", text: "The rooftop swimming pool will close for the winter season on November 1st." }], a: "B", exp: "Câu B cung cấp số điện thoại lễ tân hỗ trợ khẩn cấp — phù hợp kết thúc thông báo." }
          ]
        },
        {
          passage: "JOB ANNOUNCEMENT — SENIOR SUPPLY CHAIN ANALYST\nCompany: Global Logistics Network | Location: Chicago, IL (Hybrid)\n\nGlobal Logistics Network is seeking an analytical and detail-oriented Senior Supply Chain Analyst to optimize our North American distribution network. The successful candidate will analyze freight transportation data, identify bottlenecks, and develop cost-saving routing strategies.\n\nCandidates must possess a bachelor's degree in Supply Chain Management or Industrial Engineering, along with a minimum of five years of professional experience in logistics modeling. Advanced [143] _______ in SQL, Python, and Tableau is required. [144] _______, candidates with APICS or CSCP professional certifications will be given priority consideration.\n\nWe offer a competitive compensation package [145] _______ performance bonuses, comprehensive medical coverage, and a generous 401(k) matching program.\n\n[146] _______. Submit your résumé and cover letter to careers@globallogistics.com by November 20, 2026.",
          questions: [
            { blank: 143, q: "Select the best word for blank [143].", opts: [{ key: "A", text: "proficient" }, { key: "B", text: "proficiently" }, { key: "C", text: "proficiency" }, { key: "D", text: "proficiencies" }], a: "C", exp: "Danh từ không đếm được 'proficiency in' (sự thành thạo các phần mềm)." },
            { blank: 144, q: "Select the best transition word for blank [144].", opts: [{ key: "A", text: "Additionally" }, { key: "B", text: "Nevertheless" }, { key: "C", text: "Conversely" }, { key: "D", text: "Otherwise" }], a: "A", exp: "'Additionally' bổ sung thêm ưu tiên về chứng chỉ nghề nghiệp." },
            { blank: 145, q: "Select the best word for blank [145].", opts: [{ key: "A", text: "include" }, { key: "B", text: "including" }, { key: "C", text: "inclusion" }, { key: "D", text: "inclusive" }], a: "B", exp: "Giới từ/phân từ 'including' (bao gồm các chế độ đãi ngộ)." },
            { blank: 146, q: "Select the most appropriate sentence for blank [146].", opts: [{ key: "A", text: "The Chicago office features an on-site fitness center and rooftop terrace." }, { key: "B", text: "Only shortlisted applicants will be contacted for first-round video interviews." }, { key: "C", text: "The company was recognized as an employer of choice in 2023." }, { key: "D", text: "Relocation assistance is not available for this role." }], a: "B", exp: "Câu B thông báo quy trình phỏng vấn sau khi nhận hồ sơ — phù hợp nhất trước email nộp CV." }
          ]
        }
      ];

      part6Sets.forEach((set) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr2_q${qItem.blank}`,
            partNumber: 6,
            partTitle: "Part 6: Text Completion",
            section: "READING",
            passageText: set.passage,
            questionText: `${qItem.blank}. ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
        });
      });

      // PART 7: READING COMPREHENSION (Q147 - Q200: 54 UNIQUE QUESTIONS)
      const part7Sets: { passages: string; questions: { qNum: number; q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        // SINGLE 1 (Q147-151): Coworking space advertisement
        {
          passages: "[ADVERTISEMENT]\n\nVANGUARD COWORKING SPACES — Work Smarter, Together\nLocations in Downtown Seattle, Bellevue, and Redmond\n\nAre you an independent entrepreneur, freelance consultant, or remote corporate team looking for an inspiring, fully equipped workspace? Vanguard Coworking offers flexible membership plans tailored to your professional needs.\n\nMembership Options:\n• Flex Desk ($199/month): Unlimited access to open lounge seating, high-speed fiber Wi-Fi, and artisanal coffee.\n• Dedicated Desk ($349/month): Reserved desk space with ergonomic chair, lockable filing cabinet, and 10 conference room hours per month.\n• Private Executive Office (Starting at $799/month): Fully furnished, soundproof private office for teams of 1 to 10 members.\n\nAll Memberships Include:\n— 24/7 keycard access and biometric security\n— High-speed business printing and document scanning\n— Professional mailing address and package handling\n— Complimentary access to weekly networking mixers and industry workshops\n\nBook a tour today and receive 50% OFF your first month! Visit vanguardworkspace.com or call 1-800-555-VANG.",
          questions: [
            { qNum: 147, q: "What is the primary purpose of the advertisement?", opts: [{ key: "A", text: "To recruit commercial leasing agents." }, { key: "B", text: "To promote flexible coworking memberships and office spaces." }, { key: "C", text: "To advertise an office furniture clearance sale." }, { key: "D", text: "To announce a corporate business merger." }], a: "B", exp: "Mục đích: Quảng cáo gói dịch vụ văn phòng chia sẻ và bàn làm việc linh hoạt." },
            { qNum: 148, q: "How much does the Dedicated Desk membership cost per month?", opts: [{ key: "A", text: "$199." }, { key: "B", text: "$349." }, { key: "C", text: "$599." }, { key: "D", text: "$799." }], a: "B", exp: "Giá: 'Dedicated Desk ($349/month)'." },
            { qNum: 149, q: "How many conference room hours are included with the Dedicated Desk plan?", opts: [{ key: "A", text: "5 hours." }, { key: "B", text: "10 hours." }, { key: "C", text: "15 hours." }, { key: "D", text: "Unlimited hours." }], a: "B", exp: "Số giờ phòng họp: '10 conference room hours per month'." },
            { qNum: 150, q: "Which feature is included with all membership tiers?", opts: [{ key: "A", text: "A private soundproof office." }, { key: "B", text: "24/7 keycard access and high-speed printing." }, { key: "C", text: "Free parking in a heated garage." }, { key: "D", text: "Daily catered hot lunches." }], a: "B", exp: "Tiện ích chung: '24/7 keycard access and biometric security' + 'High-speed business printing'." },
            { qNum: 151, q: "What promotional incentive is offered to new members who book a tour?", opts: [{ key: "A", text: "A free annual subscription to a business journal." }, { key: "B", text: "50% off their first month's membership fee." }, { key: "C", text: "A complimentary ergonomic standing desk." }, { key: "D", text: "Three months of free parking." }], a: "B", exp: "Ưu đãi: 'receive 50% OFF your first month'." }
          ]
        },
        // SINGLE 2 (Q152-155): Corporate memo on cyber security
        {
          passages: "[INTERNAL MEMORANDUM]\nTO: All Personnel — Apex Financial Group\nFROM: David Sterling, Chief Information Security Officer\nDATE: October 20, 2026\nSUBJECT: Mandatory Cybersecurity Protocol Updates\n\nIn light of increasing phishing attacks targeting financial institutions nationwide, IT Security will implement mandatory multi-factor authentication (MFA) across all employee accounts starting November 3, 2026.\n\nAction Required:\n1. Download the 'Apex Authenticator' app on your corporate or personal smartphone from the internal portal by October 30.\n2. Complete the 15-minute cybersecurity refresher training on the learning management system (LMS).\n3. Update your network password to meet our new 14-character complexity standard.\n\nPlease be advised that any user account that has not configured MFA by 5:00 PM on November 2 will be temporarily locked for security verification. For technical setup assistance, IT Helpdesk technicians will be stationed in the main lobby on October 28 and 29.\n\nThank you for your vigilance in protecting our clients' sensitive financial data.",
          questions: [
            { qNum: 152, q: "What is the main purpose of the memorandum?", opts: [{ key: "A", text: "To announce the hiring of a new IT director." }, { key: "B", text: "To mandate multi-factor authentication and security updates." }, { key: "C", text: "To report a successful quarterly financial audit." }, { key: "D", text: "To schedule software programming workshops." }], a: "B", exp: "Mục đích: 'mandatory multi-factor authentication (MFA) across all employee accounts'." },
            { qNum: 153, q: "By when must employees download the authenticator app?", opts: [{ key: "A", text: "October 20." }, { key: "B", text: "October 28." }, { key: "C", text: "October 30." }, { key: "D", text: "November 3." }], a: "C", exp: "Thời hạn tải app: 'from the internal portal by October 30'." },
            { qNum: 154, q: "What will happen to accounts that fail to configure MFA before November 2?", opts: [{ key: "A", text: "They will receive a formal disciplinary warning." }, { key: "B", text: "They will be permanently deleted." }, { key: "C", text: "They will be temporarily locked for security verification." }, { key: "D", text: "Their internet access will be throttled." }], a: "C", exp: "Hậu quả: 'will be temporarily locked for security verification'." },
            { qNum: 155, q: "Where can employees receive in-person technical setup support on Oct 28-29?", opts: [{ key: "A", text: "In the IT basement server room." }, { key: "B", text: "In the main building lobby." }, { key: "C", text: "In Conference Room C." }, { key: "D", text: "At the cafeteria entrance." }], a: "B", exp: "Địa điểm hỗ trợ: 'stationed in the main lobby on October 28 and 29'." }
          ]
        },
        // SINGLE 3 (Q156-159): Technology article on electric aviation
        {
          passages: "[MAGAZINE ARTICLE]\n\nElectric Aviation: Revolutionizing Regional Air Travel\nBy Dr. Marcus Chen | Aerospace Technology Journal | October 14, 2026\n\nThe aviation industry is on the cusp of an unprecedented technological revolution as battery-electric and hybrid-electric aircraft transition from experimental prototypes to certified commercial reality. Earlier this week, AeroVolt Inc. completed the first successful commercial test flight of its 19-passenger electric commuter plane, the E-Skyhawk, flying 240 nautical miles between Seattle and Spokane on a single battery charge.\n\nAccording to industry analysts, electric regional aircraft reduce operating fuel and maintenance costs by up to 65 percent compared to traditional turboprop engines. Furthermore, noise emissions during takeoff and landing are reduced by nearly 80 percent, enabling quieter flight operations at suburban municipal airports.\n\nMajor regional airlines, including Pacific Cascade Express, have already placed firm purchase orders for 60 E-Skyhawk aircraft, with inaugural scheduled passenger routes slated for early 2028. However, industry experts caution that widespread adoption will require substantial airport infrastructure investments, specifically megawatt-class charging grids and standardized battery replacement systems.",
          questions: [
            { qNum: 156, q: "What milestone did AeroVolt Inc. achieve?", opts: [{ key: "A", text: "A non-stop transatlantic electric flight." }, { key: "B", text: "A 240-nautical-mile commercial test flight of a 19-passenger electric plane." }, { key: "C", text: "The opening of an aircraft manufacturing facility in Spokane." }, { key: "D", text: "An initial public offering on the New York Stock Exchange." }], a: "B", exp: "Thành tựu: 'first successful commercial test flight of its 19-passenger electric commuter plane, the E-Skyhawk, flying 240 nautical miles'." },
            { qNum: 157, q: "By how much do electric aircraft reduce operating fuel and maintenance costs?", opts: [{ key: "A", text: "Up to 25 percent." }, { key: "B", text: "Up to 40 percent." }, { key: "C", text: "Up to 65 percent." }, { key: "D", text: "Up to 80 percent." }], a: "C", exp: "Bẫy số liệu: 80% là giảm tiếng ồn, 65% là giảm chi phí nhiên liệu & bảo dưỡng." },
            { qNum: 158, q: "When are inaugural passenger flights scheduled to begin?", opts: [{ key: "A", text: "Later this year." }, { key: "B", text: "In early 2028." }, { key: "C", text: "In 2030." }, { key: "D", text: "In 2035." }], a: "B", exp: "Lịch bay thương mại đầu tiên: 'inaugural scheduled passenger routes slated for early 2028'." },
            { qNum: 159, q: "What infrastructure challenge is cited for widespread adoption?", opts: [{ key: "A", text: "A shortage of commercial pilot licenses." }, { key: "B", text: "The need for megawatt charging grids and standardized battery systems at airports." }, { key: "C", text: "Air traffic control radar limitations." }, { key: "D", text: "High passenger ticket pricing." }], a: "B", exp: "Thách thức: 'substantial airport infrastructure investments, specifically megawatt-class charging grids and standardized battery replacement systems'." }
          ]
        },
        // SINGLE 4 (Q160-163): Restaurant health & safety policy notice
        {
          passages: "[STAFF NOTICE — BISTRO BELLA VITA]\nTo: All Culinary and Front-of-House Personnel\nFrom: Executive Chef Marco Rossi & General Manager Laura Diaz\nDate: October 12, 2026\nSubject: Updated Food Allergen Protocol and Kitchen Sanitation Guidelines\n\nFollowing our annual health department inspection, we are revising our food allergy handling protocols effective immediately. All staff members must review the following mandatory rules:\n\n1. Color-Coded Preparation Stations: Purple cutting boards and utensils must be used exclusively for allergen-free and gluten-free meal preparation to prevent cross-contamination.\n2. Order Flagging: Front-of-house servers must tag all allergy orders with a red digital flag in the POS ordering system and notify the expeditor verbally.\n3. Handwashing Standards: Kitchen staff are required to wash hands with antibacterial soap for at least 20 seconds between handling raw poultry, seafood, and ready-to-eat ingredients.\n\nAll culinary personnel must complete the online ServSafe Allergen Certification by November 15. The restaurant will reimburse the $25 examination fee upon receipt of passing certificate verification.\n\nThank you for upholding our commitment to guest health and culinary excellence.",
          questions: [
            { qNum: 160, q: "What color utensils must be used for allergen-free meal preparation?", opts: [{ key: "A", text: "Red." }, { key: "B", text: "Green." }, { key: "C", text: "Purple." }, { key: "D", text: "Yellow." }], a: "C", exp: "Bẫy: Red là cờ báo trên máy POS. Dụng cụ chuẩn dị ứng: 'Purple cutting boards and utensils'." },
            { qNum: 161, q: "What must front-of-house servers do when taking an allergy order?", opts: [{ key: "A", text: "Ask the guest to sign an allergy liability waiver." }, { key: "B", text: "Tag the order with a red digital flag in POS and notify the expeditor." }, { key: "C", text: "Offer a 10 percent discount on the entrée." }, { key: "D", text: "Escort the guest to speak directly with the chef." }], a: "B", exp: "Yêu cầu cho bồi bàn: 'tag all allergy orders with a red digital flag in the POS ordering system and notify the expeditor verbally'." },
            { qNum: 162, q: "How long must kitchen staff wash their hands between food tasks?", opts: [{ key: "A", text: "At least 10 seconds." }, { key: "B", text: "At least 20 seconds." }, { key: "C", text: "At least 30 seconds." }, { key: "D", text: "At least one minute." }], a: "B", exp: "Thời gian rửa tay: 'at least 20 seconds between handling raw poultry, seafood, and ready-to-eat ingredients'." },
            { qNum: 163, q: "What will the restaurant reimburse for employees who pass the certification?", opts: [{ key: "A", text: "A $25 examination fee." }, { key: "B", text: "A $50 bonus payment." }, { key: "C", text: "One paid day off work." }, { key: "D", text: "A pair of non-slip kitchen shoes." }], a: "A", exp: "Hoàn tiền: 'reimburse the $25 examination fee upon receipt of passing certificate verification'." }
          ]
        },
        // SINGLE 5 (Q164-168): Hotel chain sustainability report
        {
          passages: "[ANNUAL CORPORATE REPORT EXCERPT]\n\nGrand Horizon Hospitality Group — 2025 Sustainability & Social Impact Report\nPublished: October 1, 2026\n\nOver the past twelve months, Grand Horizon Hospitality Group has accelerated our commitment to sustainable tourism across our portfolio of 140 luxury hotels and resorts worldwide.\n\nKey Achievements in 2025:\n• Single-Use Plastic Elimination: Replaced 100% of single-use plastic bathroom amenity bottles with refillable ceramic dispensers, eliminating over 18 million miniature plastic containers annually.\n• Renewable Energy Transition: 62% of total hotel electricity consumption was sourced from on-site solar arrays and certified wind energy contracts, up from 44% in 2024.\n• Food Waste Diversion: Partnered with local agricultural composting networks to divert 840 metric tons of kitchen organic waste from municipal landfills.\n• Water Conservation: Installed aerated showerheads and smart irrigation sensors across all properties, reducing total water consumption by 22 percent per occupied guest room.\n\nFuture Targets for 2028:\n— Achieve 100% carbon-neutral operations across all European and North American properties\n— Source 80% of culinary produce from verified organic farms located within a 100-mile radius\n— Invest $10 million in community hospitality vocational scholarships in emerging markets\n\nFor the full audited 80-page report, visit grandhorizonhotels.com/sustainability.",
          questions: [
            { qNum: 164, q: "How many properties does Grand Horizon Hospitality Group operate?", opts: [{ key: "A", text: "62 properties." }, { key: "B", text: "80 properties." }, { key: "C", text: "140 properties." }, { key: "D", text: "200 properties." }], a: "C", exp: "Số lượng khách sạn: 'portfolio of 140 luxury hotels and resorts worldwide'." },
            { qNum: 165, q: "How did the company eliminate miniature plastic bottles?", opts: [{ key: "A", text: "By offering paper-wrapped bar soap only." }, { key: "B", text: "By installing refillable ceramic dispensers in guest bathrooms." }, { key: "C", text: "By charging guests a plastic recycling fee." }, { key: "D", text: "By replacing liquid shampoo with powder sachets." }], a: "B", exp: "Giải pháp: 'Replaced 100% of single-use plastic bathroom amenity bottles with refillable ceramic dispensers'." },
            { qNum: 166, q: "What percentage of electricity was sourced from renewable energy in 2025?", opts: [{ key: "A", text: "22 percent." }, { key: "B", text: "44 percent." }, { key: "C", text: "62 percent." }, { key: "D", text: "80 percent." }], a: "C", exp: "Bẫy số liệu: 44% là năm 2024. Năm 2025: '62% of total hotel electricity consumption'." },
            { qNum: 167, q: "How much organic kitchen waste was diverted from landfills?", opts: [{ key: "A", text: "140 metric tons." }, { key: "B", text: "440 metric tons." }, { key: "C", text: "840 metric tons." }, { key: "D", text: "1,200 metric tons." }], a: "C", exp: "Lượng rác hữu cơ: 'divert 840 metric tons of kitchen organic waste'." },
            { qNum: 168, q: "What is a key sustainability target for 2028?", opts: [{ key: "A", text: "Eliminate all air conditioning units." }, { key: "B", text: "Achieve carbon-neutral operations in Europe and North America." }, { key: "C", text: "Close all suburban resort properties." }, { key: "D", text: "Transition to 100% automated robotic room service." }], a: "B", exp: "Mục tiêu 2028: 'Achieve 100% carbon-neutral operations across all European and North American properties'." }
          ]
        },
        // SINGLE 6 (Q169-175): Detailed conference agenda and speaker bios
        {
          passages: "[CONFERENCE PROGRAM & SPEAKER BIOS]\n\nPACIFIC ASIA FINTECH SUMMIT 2026\nVenue: Marina Bay Convention Centre, Singapore | Dates: November 18-20, 2026\n\nDay 1 Keynote Speakers:\n\n• 09:00 AM — Dr. Yukihiro Tanaka (Chief AI Scientist, Tokyo FinTech Labs)\nSpeech: 'Generative AI and Automated Fraud Prevention in Cross-Border Payments'\nBio: Dr. Tanaka has authored over 45 academic publications on neural networks and previously served as senior algorithmic consultant to the Bank of Japan. He holds a Ph.D. in Computer Science from Kyoto University.\n\n• 11:00 AM — Ms. Priya Sharma (VP of Regulatory Affairs, Asian Banking Federation)\nSpeech: 'Navigating Open Banking Compliance and Digital Asset Frameworks'\nBio: Ms. Sharma has spent two decades advising financial regulatory bodies across ASEAN nations on digital identity infrastructure and anti-money laundering frameworks.\n\n• 02:00 PM — Mr. Liam O'Connor (Founder & CEO, CloudPay Global)\nSpeech: 'Scaling Real-Time Cross-Border Settlement Infrastructure'\nBio: Liam founded CloudPay Global in 2019, growing it into a fintech unicorn processing over $40 billion annually. He was named 'FinTech Innovator of the Year' by Asian Business Review in 2025.\n\nNetworking & Workshops:\n— 03:30 PM: Interactive Panel: Cybersecurity in Decentralized Finance (Hall B)\n— 05:30 PM: Gala Cocktail Reception & Startup Pitch Awards (Rooftop Atrium)\n\nRegistration Information:\nStandard Pass ($899) includes all sessions, exhibition access, lunches, and networking receptions. Student Pass ($299) requires valid university identification.",
          questions: [
            { qNum: 169, q: "Where is the fintech summit taking place?", opts: [{ key: "A", text: "Tokyo, Japan." }, { key: "B", text: "Marina Bay Convention Centre, Singapore." }, { key: "C", text: "Hong Kong Convention Center." }, { key: "D", text: "Seoul Trade Center." }], a: "B", exp: "Địa điểm: 'Marina Bay Convention Centre, Singapore'." },
            { qNum: 170, q: "What is the topic of Dr. Tanaka's keynote presentation?", opts: [{ key: "A", text: "Open banking compliance frameworks." }, { key: "B", text: "Generative AI and automated fraud prevention in cross-border payments." }, { key: "C", text: "Fintech venture capital fundraising." }, { key: "D", text: "Decentralized finance cybersecurity." }], a: "B", exp: "Chủ đề của Dr. Tanaka: 'Generative AI and Automated Fraud Prevention in Cross-Border Payments'." },
            { qNum: 171, q: "Where did Dr. Tanaka earn his Ph.D.?", opts: [{ key: "A", text: "University of Tokyo." }, { key: "B", text: "Kyoto University." }, { key: "C", text: "National University of Singapore." }, { key: "D", text: "Stanford University." }], a: "B", exp: "Học vị: 'holds a Ph.D. in Computer Science from Kyoto University'." },
            { qNum: 172, q: "Who is delivering the keynote address at 11:00 AM?", opts: [{ key: "A", text: "Dr. Yukihiro Tanaka." }, { key: "B", text: "Ms. Priya Sharma." }, { key: "C", text: "Mr. Liam O'Connor." }, { key: "D", text: "The Governor of the Bank of Japan." }], a: "B", exp: "Diễn giả 11:00 AM: 'Ms. Priya Sharma'." },
            { qNum: 173, q: "What award did Liam O'Connor receive in 2025?", opts: [{ key: "A", text: "Young Entrepreneur of the Year." }, { key: "B", text: "FinTech Innovator of the Year by Asian Business Review." }, { key: "C", text: "Top ASEAN Executive Award." }, { key: "D", text: "Global Technology Pioneer." }], a: "B", exp: "Giải thưởng: 'named FinTech Innovator of the Year by Asian Business Review in 2025'." },
            { qNum: 174, q: "Where will the Gala Cocktail Reception take place at 5:30 PM?", opts: [{ key: "A", text: "Hall B." }, { key: "B", text: "The Grand Ballroom." }, { key: "C", text: "The Rooftop Atrium." }, { key: "D", text: "The Waterfront Terrace." }], a: "C", exp: "Địa điểm tiệc tối: 'Gala Cocktail Reception & Startup Pitch Awards (Rooftop Atrium)'." },
            { qNum: 175, q: "How much does the Standard Pass cost?", opts: [{ key: "A", text: "$299." }, { key: "B", text: "$599." }, { key: "C", text: "$899." }, { key: "D", text: "$1,199." }], a: "C", exp: "Giá vé tiêu chuẩn: 'Standard Pass ($899)'." }
          ]
        },
        // DOUBLE 1 (Q176-180): Purchase inquiry & Sales quote response
        {
          passages: "[EMAIL 1 — PURCHASE INQUIRY]\nFrom: marcus.vance@apexlogistics.com\nTo: sales@novasystems.com\nDate: October 6, 2026\nSubject: Request for Quotation — Enterprise Server Rack Upgrade\n\nDear Nova Systems Sales Team,\n\nApex Logistics is expanding our regional cloud datacenter in Dallas, Texas. We would like to request a formal price quote for the following equipment:\n\n1. NovaRack Ultra 42U Server Cabinets (Model NR-4200) — Quantity: 12 units\n2. Smart PDU Power Distribution Units with remote monitoring (Model PDU-800) — Quantity: 24 units\n3. Cat6A High-Density Patch Panels (Model PP-48) — Quantity: 24 units\n\nPlease include delivery charges to our Dallas facility (Zip: 75201) and confirm your estimated delivery lead time. We would also appreciate information regarding volume discounts for orders exceeding $25,000.\n\nThank you for your prompt assistance.\n\nSincerely,\nMarcus Vance\nDirector of Infrastructure\nApex Logistics\n\n---\n\n[EMAIL 2 — FORMAL SALES QUOTATION]\nFrom: jennifer.stone@novasystems.com\nTo: marcus.vance@apexlogistics.com\nDate: October 7, 2026\nSubject: RE: Quotation #QUO-88421 — Enterprise Server Rack Upgrade\n\nDear Mr. Vance,\n\nThank you for your inquiry. Nova Systems is pleased to submit Quotation #QUO-88421 for your Dallas datacenter project:\n\n• Line 1: NovaRack Ultra 42U Cabinets (NR-4200) x12 @ $1,250/unit = $15,000.00\n• Line 2: Smart PDU Units (PDU-800) x24 @ $380/unit = $9,120.00\n• Line 3: Cat6A Patch Panels (PP-48) x24 @ $140/unit = $3,360.00\n\nSubtotal: $27,480.00\nVolume Discount (8% on orders over $25,000): -$2,198.40\nDiscounted Total: $25,281.60\nFreight Shipping (Dedicated Carrier to Dallas, TX): $650.00\nFinal Invoice Total: $25,931.60\n\nLead Time: In-stock items ship within 3 business days; transit time to Dallas is 2 days.\nQuote Validity: 30 days from issuance.\nPayment Terms: Net 30 upon credit approval.\n\nPlease reply with a signed purchase order to initiate processing.\n\nBest regards,\nJennifer Stone\nSenior Account Executive\nNova Systems",
          questions: [
            { qNum: 176, q: "Where is the datacenter equipment being delivered?", opts: [{ key: "A", text: "Seattle, WA." }, { key: "B", text: "Dallas, TX." }, { key: "C", text: "Chicago, IL." }, { key: "D", text: "Denver, CO." }], a: "B", exp: "Địa điểm giao: 'Dallas facility (Zip: 75201)'." },
            { qNum: 177, q: "How much is the unit price for the NovaRack Ultra 42U cabinets?", opts: [{ key: "A", text: "$380." }, { key: "B", text: "$1,250." }, { key: "C", text: "$1,400." }, { key: "D", text: "$2,198." }], a: "B", exp: "Đơn giá tủ rack: '$1,250/unit'." },
            { qNum: 178, q: "What volume discount percentage was applied to the order?", opts: [{ key: "A", text: "5 percent." }, { key: "B", text: "8 percent." }, { key: "C", text: "10 percent." }, { key: "D", text: "12 percent." }], a: "B", exp: "Mức giảm giá: 'Volume Discount (8% on orders over $25,000)'." },
            { qNum: 179, q: "What is the final invoice total including freight shipping?", opts: [{ key: "A", text: "$25,281.60." }, { key: "B", text: "$25,931.60." }, { key: "C", text: "$27,480.00." }, { key: "D", text: "$28,130.00." }], a: "B", exp: "Tổng hóa đơn cuối cùng: 'Final Invoice Total: $25,931.60'." },
            { qNum: 180, q: "How long is the quotation valid?", opts: [{ key: "A", text: "7 days." }, { key: "B", text: "14 days." }, { key: "C", text: "30 days." }, { key: "D", text: "60 days." }], a: "C", exp: "Hiệu lực báo giá: 'Quote Validity: 30 days from issuance'." }
          ]
        },
        // DOUBLE 2 (Q181-185): Job posting & Candidate cover letter
        {
          passages: "[DOCUMENT 1 — JOB POSTING]\n\nLEAD UX/UI PRODUCT DESIGNER\nCompany: Zenith Interactive Software | Location: Austin, TX | Type: Full-Time\nSalary Range: $125,000 - $145,000 + Stock Options & Health Benefits\n\nAbout the Position:\nZenith Interactive Software is looking for a visionary Lead UX/UI Product Designer to spearhead the design of our next-generation cloud collaboration platform. You will lead a multidisciplinary team of 6 designers and work directly with product management and front-end engineering.\n\nQualifications Required:\n• Minimum 6 years of digital product design experience (B2B SaaS preferred)\n• Expert mastery of Figma, Design Systems, and interactive prototyping\n• Proven track record of conducting user research, usability testing, and persona creation\n• Strong portfolio demonstrating end-to-end design lifecycle for complex web apps\n• Bachelor's degree in Human-Computer Interaction, Graphic Design, or related field\n\nTo apply, submit your résumé, portfolio link, and cover letter to jobs@zenithinteractive.com by October 31, 2026.\n\n---\n\n[DOCUMENT 2 — CANDIDATE COVER LETTER]\nFrom: hannah.kim@email.com\nTo: jobs@zenithinteractive.com\nDate: October 24, 2026\nSubject: Application — Lead UX/UI Product Designer (Hannah Kim)\n\nDear Hiring Team at Zenith Interactive,\n\nI am writing to express my enthusiastic candidacy for the Lead UX/UI Product Designer position. With over seven years of dedicated experience designing enterprise SaaS solutions, I have built and scaled comprehensive design systems that reduced engineering handoff time by 35% and increased user task completion rates by 28% at CloudPulse Technologies.\n\nAt CloudPulse, I mentored a team of five junior and mid-level designers, led bi-weekly user testing cohorts with enterprise clients, and collaborated closely with React front-end developers to ensure pixel-perfect design implementation. I hold a Bachelor of Science in Human-Computer Interaction from the University of Texas at Austin.\n\nMy online portfolio (hannahkimdesign.io) showcases extensive case studies of complex B2B workflow designs and interactive Figma design systems. I would welcome the opportunity to discuss how my design leadership can contribute to Zenith's next-generation platform.\n\nSincerely,\nHannah Kim",
          questions: [
            { qNum: 181, q: "How many years of experience does Hannah Kim have?", opts: [{ key: "A", text: "4 years." }, { key: "B", text: "5 years." }, { key: "C", text: "Over 7 years." }, { key: "D", text: "10 years." }], a: "C", exp: "Kinh nghiệm của Hannah: 'With over seven years of dedicated experience designing enterprise SaaS solutions'." },
            { qNum: 182, q: "Does Hannah Kim meet the minimum experience requirement for the job?", opts: [{ key: "A", text: "No, she has less experience than required." }, { key: "B", text: "Yes, she exceeds the 6-year minimum requirement." }, { key: "C", text: "She exactly meets the 6-year requirement." }, { key: "D", text: "It cannot be determined." }], a: "B", exp: "Đố mẹo đối chiếu: Yêu cầu tối thiểu 6 năm, Hannah có hơn 7 năm → vượt yêu cầu." },
            { qNum: 183, q: "What impact did Hannah's design system have at CloudPulse?", opts: [{ key: "A", text: "It doubled annual subscription revenues." }, { key: "B", text: "It reduced engineering handoff time by 35% and increased task completion by 28%." }, { key: "C", text: "It eliminated the need for user testing." }, { key: "D", text: "It won an international design award." }], a: "B", exp: "Kết quả: 'reduced engineering handoff time by 35% and increased user task completion rates by 28%'." },
            { qNum: 184, q: "Where can the hiring team review Hannah's design case studies?", opts: [{ key: "A", text: "In an attached PDF document." }, { key: "B", text: "On her online portfolio website (hannahkimdesign.io)." }, { key: "C", text: "On her LinkedIn profile." }, { key: "D", text: "In a physical binder by mail." }], a: "B", exp: "Nơi xem portfolio: 'My online portfolio (hannahkimdesign.io) showcases extensive case studies'." },
            { qNum: 185, q: "What degree does Hannah hold?", opts: [{ key: "A", text: "Master of Fine Arts in Digital Media." }, { key: "B", text: "Bachelor of Science in Human-Computer Interaction." }, { key: "C", text: "Bachelor of Arts in Communications." }, { key: "D", text: "Bachelor of Science in Computer Science." }], a: "B", exp: "Bằng cấp: 'Bachelor of Science in Human-Computer Interaction from the University of Texas at Austin'." }
          ]
        },
        // TRIPLE 1 (Q186-190): Equipment rental agreement + Delivery ticket + Customer service email
        {
          passages: "[DOCUMENT 1 — EQUIPMENT RENTAL AGREEMENT]\nMETRO CONSTRUCTION EQUIPMENT RENTALS\nAgreement #REN-99201 | Date: October 5, 2026\nRenter: Horizon Builders Ltd. | Contact: Thomas Wright (Project Manager)\nJob Site: 840 Commerce Boulevard, Phoenix, AZ\n\nEquipment Rented:\n1. 50-Foot Diesel Boom Lift (Model BL-500) — Rate: $450/day x 5 days = $2,250.00\n2. 5-Ton Mini Excavator (Model EX-50) — Rate: $380/day x 5 days = $1,900.00\n\nRental Period: Monday, October 12 (8:00 AM) through Friday, October 16 (5:00 PM)\nDelivery & Pickup Fee (Roundtrip): $300.00\nTotal Rental Amount: $4,450.00\nSecurity Deposit (Refundable upon undamaged return): $1,000.00\n\nTerms: Renter is responsible for refueling diesel tanks prior to return. Unfueled machines will incur a refueling charge of $8.00 per gallon.\n\n---\n\n[DOCUMENT 2 — EQUIPMENT RETURN INSPECTION TICKET]\nDate of Return: Friday, October 16, 2026 (4:30 PM)\nInspector: Carlos Mendez (Metro Yard Supervisor)\nAgreement Reference: #REN-99201\n\nInspection Results:\n• Boom Lift (BL-500): Operating condition perfect. No physical damage. Fuel Tank: 100% FULL.\n• Mini Excavator (EX-50): Operating condition perfect. No physical damage. Fuel Tank: 50% FULL (Requires 15 gallons diesel fuel to fill).\n\nAdditional Charges Incurred:\n— Refueling Fee: 15 gallons @ $8.00/gal = $120.00\n— Net Security Deposit Refund: $1,000.00 - $120.00 = $880.00 refunded to credit card on file.\n\n---\n\n[DOCUMENT 3 — EMAIL CONFIRMATION]\nFrom: billing@metrorentals.com\nTo: thomas.wright@horizonbuilders.com\nDate: October 17, 2026\nSubject: Rental Return Receipt & Deposit Refund — Agreement #REN-99201\n\nDear Mr. Wright,\n\nThank you for choosing Metro Construction Equipment Rentals for your Phoenix commercial project. All rented equipment from Agreement #REN-99201 was collected on October 16th.\n\nAs noted on your return inspection ticket, the Boom Lift was returned fully refueled, while the Mini Excavator required 15 gallons of diesel fuel. In accordance with the rental terms, a refueling deduction of $120.00 was applied against your $1,000.00 security deposit.\n\nA net refund of $880.00 has been processed to your corporate Visa card ending in 7741. Transaction funds typically post within 3 to 5 business days.\n\nWe appreciate your business and look forward to serving Horizon Builders on future projects.\n\nSincerely,\nLaura Perez\nBilling & Customer Accounts Manager",
          questions: [
            { qNum: 186, q: "Where was the rented construction equipment operated?", opts: [{ key: "A", text: "Dallas, TX." }, { key: "B", text: "840 Commerce Boulevard, Phoenix, AZ." }, { key: "C", text: "Denver, CO." }, { key: "D", text: "Las Vegas, NV." }], a: "B", exp: "Địa điểm công trường: '840 Commerce Boulevard, Phoenix, AZ'." },
            { qNum: 187, q: "What was the daily rental rate for the Boom Lift?", opts: [{ key: "A", text: "$300." }, { key: "B", text: "$380." }, { key: "C", text: "$450." }, { key: "D", text: "$500." }], a: "C", exp: "Giá thuê ngày Boom Lift: '$450/day'." },
            { qNum: 188, q: "Why was a $120 deduction taken from the security deposit?", opts: [{ key: "A", text: "The boom lift sustained scratches on the paint." }, { key: "B", text: "The mini excavator was returned with a half-empty fuel tank requiring 15 gallons." }, { key: "C", text: "The equipment was returned two hours late." }, { key: "D", text: "A key replacement fee was assessed." }], a: "B", exp: "Lý do trừ cọc: 'Mini Excavator required 15 gallons of diesel fuel' @ $8/gallon = $120." },
            { qNum: 189, q: "How much net deposit refund was credited back to Horizon Builders?", opts: [{ key: "A", text: "$650.00." }, { key: "B", text: "$880.00." }, { key: "C", text: "$1,000.00." }, { key: "D", text: "$4,450.00." }], a: "B", exp: "Tiền cọc thực hoàn: '$1,000.00 - $120.00 = $880.00'." },
            { qNum: 190, q: "Who inspected the returned machines at the rental yard?", opts: [{ key: "A", text: "Thomas Wright." }, { key: "B", text: "Laura Perez." }, { key: "C", text: "Carlos Mendez, Yard Supervisor." }, { key: "D", text: "The delivery truck driver." }], a: "C", exp: "Người kiểm tra máy: 'Inspector: Carlos Mendez (Metro Yard Supervisor)'." }
          ]
        },
        // TRIPLE 2 (Q191-195): Hotel booking + Conference schedule + Expense report
        {
          passages: "[DOCUMENT 1 — HOTEL RESERVATION CONFIRMATION]\nGRAND PALACE HOTEL & CONVENTION CENTER\n1200 Michigan Avenue, Chicago, IL | Confirmation #GPH-77420\nGuest: Dr. Sarah Jenkins (Apex Biotech Solutions)\n\nReservation Summary:\n• Check-In: Tuesday, November 10, 2026 (3:00 PM)\n• Check-Out: Friday, November 13, 2026 (11:00 AM) — 3 Nights Total\n• Room Category: Deluxe King Suite (Conference Rate: $210/night x 3 nights = $630.00)\n• Hotel Taxes & Tourism Fees (17.4%): $109.62\n• Total Lodging Paid: $739.62\n• Included Amenities: High-speed Wi-Fi, fitness center access, complimentary hot breakfast buffet\n\n---\n\n[DOCUMENT 2 — MIDWEST BIOTECH SUMMIT SCHEDULE]\nNovember 11-12, 2026 | Grand Ballroom, Grand Palace Hotel\n\nWednesday, November 11 (Day 1):\n• 08:30 AM - Registration & Welcome Coffee\n• 09:30 AM - Keynote Address: 'Advances in Targeted Oncology Therapeutics' — Dr. Sarah Jenkins (Grand Ballroom)\n• 12:00 PM - Official Conference Luncheon (Dining Pavilion — included in conference badge)\n• 02:00 PM - Panel Discussion: Clinical Trial Regulatory Pathways\n\nThursday, November 12 (Day 2):\n• 09:00 AM - Morning Workshops: Gene Editing Platforms (Room 204)\n• 01:00 PM - Poster Presentation Session & Exhibition Networking\n• 06:30 PM - Annual Awards Dinner Gala ($85 optional ticket — Grand Ballroom)\n\n---\n\n[DOCUMENT 3 — EXPENSE REIMBURSEMENT CLAIM FORM]\nSubmitted by: Dr. Sarah Jenkins | Department: Research & Clinical Development\nEvent: Midwest Biotech Summit 2026 (Chicago, IL)\n\nItemized Expenses:\n1. Roundtrip Airfare (United Airlines — Dallas to Chicago): $415.00\n2. Hotel Lodging (Grand Palace Hotel — 3 nights): $739.62\n3. Airport Uber Transportation (Dallas & Chicago): $128.50\n4. Conference Awards Gala Ticket (Nov 12): $85.00\n5. Meal Allowance Per Diem (Nov 10-13): $180.00\n\nTotal Reimbursement Claimed: $1,548.12\nSupervisor Approval: Approved by Dr. Robert Henderson (VP of Research) on Nov 16, 2026.",
          questions: [
            { qNum: 191, q: "What role did Dr. Sarah Jenkins have on Day 1 of the summit?", opts: [{ key: "A", text: "Conference registration coordinator." }, { key: "B", text: "Opening keynote speaker on targeted oncology therapeutics." }, { key: "C", text: "Panel moderator on gene editing platforms." }, { key: "D", text: "Awards gala master of ceremonies." }], a: "B", exp: "Vai trò của Dr. Jenkins: 'Keynote Address: Advances in Targeted Oncology Therapeutics — Dr. Sarah Jenkins'." },
            { qNum: 192, q: "How many nights did Dr. Jenkins stay at the Grand Palace Hotel?", opts: [{ key: "A", text: "Two nights." }, { key: "B", text: "Three nights." }, { key: "C", text: "Four nights." }, { key: "D", text: "Five nights." }], a: "B", exp: "Số đêm lưu trú: Check-in Nov 10, Check-out Nov 13 = '3 Nights Total'." },
            { qNum: 193, q: "How much did Dr. Jenkins claim for airport Uber rides?", opts: [{ key: "A", text: "$85.00." }, { key: "B", text: "$128.50." }, { key: "C", text: "$180.00." }, { key: "D", text: "$415.00." }], a: "B", exp: "Chi phí đi lại Uber: '$128.50'." },
            { qNum: 194, q: "What was the total amount claimed on the expense report?", opts: [{ key: "A", text: "$739.62." }, { key: "B", text: "$1,240.00." }, { key: "C", text: "$1,548.12." }, { key: "D", text: "$1,850.00." }], a: "C", exp: "Tổng tiền thanh toán công tác: '$1,548.12'." },
            { qNum: 195, q: "Who approved Dr. Jenkins's expense claim?", opts: [{ key: "A", text: "The hotel billing manager." }, { key: "B", text: "The conference organizer." }, { key: "C", text: "Dr. Robert Henderson, VP of Research." }, { key: "D", text: "The corporate travel coordinator." }], a: "C", exp: "Người duyệt: 'Approved by Dr. Robert Henderson (VP of Research)'." }
          ]
        },
        // TRIPLE 3 (Q196-200): Course syllabus + Student survey + Instructor response
        {
          passages: "[DOCUMENT 1 — COURSE SYLLABUS EXCERPT]\nEXECUTIVE LEADERSHIP & DATA ANALYTICS CERTIFICATE\nMetro Business Institute | Fall Semester 2026\nInstructor: Professor Richard Vance, Ph.D.\n\nCourse Structure:\n• Duration: 8 Weeks (October 5 - November 27, 2026)\n• Meeting Time: Tuesday & Thursday evenings, 6:30 PM - 8:30 PM (Online via Zoom)\n• Core Modules: Business Intelligence Architecture, Predictive Machine Learning, Tableau Dashboards, Executive Data Storytelling\n\nGrading Criteria:\n1. Weekly Case Study Assignments (40%)\n2. Midterm Analytics Project (25%)\n3. Final Capstone Business Proposal (35%)\n\nPrerequisites: Basic familiarity with Excel formulas. Completion of all eight modules with a cumulative score of 80% or higher is required to earn the verified certificate.\n\n---\n\n[DOCUMENT 2 — MID-TERM STUDENT FEEDBACK SURVEY RESULTS]\nCourse: Executive Leadership & Data Analytics (Fall 2026)\nTotal Respondents: 28 Students | Overall Course Satisfaction: 4.8 / 5.0\n\nKey Survey Feedback:\n• 93% praised the practical relevance of real-world corporate case studies.\n• 88% rated Professor Vance's instruction clarity as exceptional.\n• Suggestion for Improvement: 18 students (64%) requested additional live tutorial sessions dedicated specifically to mastering complex Tableau dashboard calculated fields and parameter actions.\n\n---\n\n[DOCUMENT 3 — ANNOUNCEMENT POST FROM PROFESSOR VANCE]\nPosted: November 2, 2026 on Course Portal\nTo: All Students enrolled in Executive Leadership & Data Analytics\nSubject: New Weekend Office Hours & Tableau Workshop\n\nDear Students,\n\nThank you for your valuable feedback on the mid-term course survey. In response to your requests for deeper hands-on practice with Tableau dashboards, I have scheduled two optional supplemental weekend workshops:\n\n1. Saturday, November 7 (10:00 AM - 12:00 PM): Advanced Calculated Fields & LOD Expressions\n2. Saturday, November 14 (10:00 AM - 12:00 PM): Interactive Parameter Actions & Dynamic Dashboards\n\nBoth sessions will be recorded and posted to the portal for students unable to attend live. In addition, I am extending the submission deadline for the Final Capstone Proposal by three days, to Monday, November 30th at 11:59 PM.\n\nKeep up the exceptional analytical work!\n\nBest regards,\nProfessor Richard Vance",
          questions: [
            { qNum: 196, q: "How long is the Executive Leadership & Data Analytics certificate course?", opts: [{ key: "A", text: "4 weeks." }, { key: "B", text: "6 weeks." }, { key: "C", text: "8 weeks." }, { key: "D", text: "12 weeks." }], a: "C", exp: "Thời lượng khóa học: 'Duration: 8 Weeks (October 5 - November 27, 2026)'." },
            { qNum: 197, q: "What percentage of the course grade is allocated to Weekly Case Studies?", opts: [{ key: "A", text: "25%." }, { key: "B", text: "35%." }, { key: "C", text: "40%." }, { key: "D", text: "50%." }], a: "C", exp: "Tỷ trọng điểm bài tập tuần: 'Weekly Case Study Assignments (40%)'." },
            { qNum: 198, q: "What did 64% of surveyed students request in the mid-term feedback?", opts: [{ key: "A", text: "Lower tuition fees." }, { key: "B", text: "More live tutorial sessions dedicated to Tableau dashboards." }, { key: "C", text: "Fewer weekly assignments." }, { key: "D", text: "In-person classroom meetings instead of Zoom." }], a: "B", exp: "Yêu cầu của học viên: 'requested additional live tutorial sessions dedicated specifically to mastering complex Tableau dashboard calculated fields'." },
            { qNum: 199, q: "When is the first supplemental Tableau workshop scheduled?", opts: [{ key: "A", text: "Thursday, November 5." }, { key: "B", text: "Saturday, November 7 (10:00 AM - 12:00 PM)." }, { key: "C", text: "Saturday, November 14." }, { key: "D", text: "Monday, November 30." }], a: "B", exp: "Lịch workshop bổ sung đầu tiên: 'Saturday, November 7 (10:00 AM - 12:00 PM)'." },
            { qNum: 200, q: "What is the new revised deadline for the Final Capstone Proposal?", opts: [{ key: "A", text: "November 20." }, { key: "B", text: "November 27." }, { key: "C", text: "Monday, November 30th at 11:59 PM." }, { key: "D", text: "December 5." }], a: "C", exp: "Hạn nộp bài cuối khóa mới: 'extending the submission deadline for the Final Capstone Proposal by three days, to Monday, November 30th at 11:59 PM'." }
          ]
        }
      ];

      part7Sets.forEach((set) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr2_q${qItem.qNum}`,
            partNumber: 7,
            partTitle: "Part 7: Reading Comprehension",
            section: "READING",
            passageText: set.passages,
            questionText: `${qItem.qNum}. ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
        });
      });

      return qs;
    })()
  },

  // ---------------------------------------------------------------------------
  // 2. TOEIC SPEAKING & WRITING AI (19 AUTHENTIC QUESTIONS - 80 MINS)
  // ---------------------------------------------------------------------------
  {
    id: "toeic_sw_2026_01",
    title: "TOEIC Speaking & Writing AI Studio #01",
    type: "TOEIC_SPEAKING_WRITING",
    level: "Intermediate",
    timeLimitMinutes: 80,
    totalQuestions: 19,
    maxScore: 400,
    description: "Bộ đề thi thực chiến 19 câu Speaking (Q1-11) và Writing (Q1-8) tích hợp AI chấm thời gian thực WebRTC & Gemini.",
    categoryBadge: "Speaking & Writing",
    tags: ["TOEIC", "Nói AI", "Viết AI", "Giao Tiếp Công Sở", "ETS Standard"],
    supportedSkills: ["SPEAKING", "WRITING"],
    questions: [
      // SPEAKING PART 1: READ A TEXT ALOUD (Q1 - Q2)
      {
        id: "tsw_q1",
        partNumber: 1,
        partTitle: "Part 1: Read a Text Aloud",
        section: "SPEAKING",
        speakingPrompt: "Read the announcement aloud into the microphone. You have 45 seconds to prepare and 45 seconds to speak.",
        passageText: "Good morning and welcome to the annual shareholders meeting for Zenith Global Logistics. Before we commence the executive presentation, please ensure that all mobile devices are switched to silent mode. Complimentary copies of our 2025 financial overview and corporate governance report are available at the information desk in the main foyer. Following the keynote address by Chief Executive Officer Marcus Vance, there will be a thirty-minute open question-and-answer session.",
        preparationTimeSeconds: 45,
        speakingTimeSeconds: 45,
        questionText: "Question 1: Read the corporate announcement text aloud with natural rhythm, stress, and clear intonation.",
        options: [
          { key: "A", text: "Ready to record speech" },
          { key: "B", text: "Practice pronunciation mode" },
          { key: "C", text: "Listen to native audio guide" },
          { key: "D", text: "Skip to next question" }
        ],
        correctAnswer: "A",
        explanation: "Tiêu chí chấm AI: Phát âm rõ các âm đuôi (/s/, /z/, /t/), nhấn đúng trọng âm từ ('shareholders', 'governance', 'executive'), ngắt câu theo cụm nghĩa."
      },
      {
        id: "tsw_q2",
        partNumber: 1,
        partTitle: "Part 1: Read a Text Aloud",
        section: "SPEAKING",
        speakingPrompt: "Read the advertisement aloud into the microphone. You have 45 seconds to prepare and 45 seconds to speak.",
        passageText: "Are you planning a home renovation or upgrading your office workspace? Metro Design Studio is excited to announce our semi-annual showroom liquidation sale. From Friday through Sunday, enjoy discounts of up to forty percent on all handcrafted hardwood tables, ergonomic desk chairs, and modern lighting fixtures. Visit our flagship downtown showroom on Elm Street or browse our virtual catalog at metrodesign.com. Delivery is complimentary on all local purchases exceeding five hundred dollars.",
        preparationTimeSeconds: 45,
        speakingTimeSeconds: 45,
        questionText: "Question 2: Read the promotional advertisement aloud maintaining enthusiastic tone and clear listing intonation.",
        options: [
          { key: "A", text: "Ready to record speech" },
          { key: "B", text: "Practice pronunciation mode" },
          { key: "C", text: "Listen to native audio guide" },
          { key: "D", text: "Skip to next question" }
        ],
        correctAnswer: "A",
        explanation: "Tiêu chí chấm AI: Lên giọng ở các danh từ liệt kê ('tables ↗', 'chairs ↗') và hạ giọng ở danh từ cuối ('lighting fixtures ↘')."
      },

      // SPEAKING PART 2: DESCRIBE A PICTURE (Q3 - Q4)
      {
        id: "tsw_q3",
        partNumber: 2,
        partTitle: "Part 2: Describe a Picture",
        section: "SPEAKING",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        speakingPrompt: "Describe the picture in as much detail as possible. You have 45 seconds to prepare and 45 seconds to speak.",
        preparationTimeSeconds: 45,
        speakingTimeSeconds: 45,
        questionText: "Question 3: Describe the modern collaborative office environment shown in the photograph.",
        options: [
          { key: "A", text: "Record image description" },
          { key: "B", text: "View AI vocabulary suggestions" },
          { key: "C", text: "Review sample response transcript" },
          { key: "D", text: "Skip to next question" }
        ],
        correctAnswer: "A",
        explanation: "Cấu trúc trả lời điểm cao: 1. Tổng quan ('This picture shows a group of colleagues collaborating in a brightly lit modern office'). 2. Trọng tâm ('In the center, a woman is gesturing towards a laptop while her team members listen attentively'). 3. Hậu cảnh ('In the background, there are large glass windows and whiteboards with project diagrams'). 4. Cảm nhận ('The atmosphere appears productive and highly collaborative')."
      },
      {
        id: "tsw_q4",
        partNumber: 2,
        partTitle: "Part 2: Describe a Picture",
        section: "SPEAKING",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
        speakingPrompt: "Describe the picture in as much detail as possible. You have 45 seconds to prepare and 45 seconds to speak.",
        preparationTimeSeconds: 45,
        speakingTimeSeconds: 45,
        questionText: "Question 4: Describe the business presentation and audience engagement in the conference hall.",
        options: [
          { key: "A", text: "Record image description" },
          { key: "B", text: "View AI vocabulary suggestions" },
          { key: "C", text: "Review sample response transcript" },
          { key: "D", text: "Skip to next question" }
        ],
        correctAnswer: "A",
        explanation: "Mô tả chi tiết: người thuyết trình đứng cạnh slide máy chiếu, cử chỉ tay tự tin, người tham dự cầm sổ ghi chép, không gian hội thảo chuyên nghiệp."
      },

      // SPEAKING PART 3: RESPOND TO QUESTIONS (Q5 - Q7: Topic: Online Shopping & Delivery)
      {
        id: "tsw_q5",
        partNumber: 3,
        partTitle: "Part 3: Respond to Questions",
        section: "SPEAKING",
        speakingPrompt: "Imagine that an international consumer research firm is interviewing you about your shopping habits. How often do you shop online for groceries or household items, and what website or app do you use most frequently?",
        preparationTimeSeconds: 3,
        speakingTimeSeconds: 15,
        questionText: "Question 5: How often do you shop online for groceries or household items, and which platform do you prefer?",
        options: [
          { key: "A", text: "Record 15-second response" },
          { key: "B", text: "Review grammatical templates" },
          { key: "C", text: "Listen to sample response" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Gợi ý: 'I shop online for groceries about twice a week, and my go-to platform is Shopee/Amazon because of its user-friendly interface and prompt same-day delivery service.'"
      },
      {
        id: "tsw_q6",
        partNumber: 3,
        partTitle: "Part 3: Respond to Questions",
        section: "SPEAKING",
        speakingPrompt: "When buying clothes online, what is the most important factor you consider before placing an order: customer reviews, price discounts, or return policies?",
        preparationTimeSeconds: 3,
        speakingTimeSeconds: 15,
        questionText: "Question 6: What is the most crucial factor when buying apparel online: customer reviews, price, or return policies?",
        options: [
          { key: "A", text: "Record 15-second response" },
          { key: "B", text: "Review grammatical templates" },
          { key: "C", text: "Listen to sample response" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Gợi ý: 'For me, customer reviews with real photos are the most decisive factor because they provide authentic insights into the fabric quality and accurate sizing.'"
      },
      {
        id: "tsw_q7",
        partNumber: 3,
        partTitle: "Part 3: Respond to Questions",
        section: "SPEAKING",
        speakingPrompt: "Do you think physical retail stores will eventually be completely replaced by e-commerce platforms in the next twenty years? Explain your opinion with specific reasons and examples.",
        preparationTimeSeconds: 3,
        speakingTimeSeconds: 30,
        questionText: "Question 7: Will brick-and-mortar retail stores be entirely replaced by e-commerce in the next two decades?",
        options: [
          { key: "A", text: "Record 30-second response" },
          { key: "B", text: "Review grammatical templates" },
          { key: "C", text: "Listen to sample response" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Gợi ý: 'In my opinion, physical stores will not disappear completely. While e-commerce provides unparalleled convenience, brick-and-mortar stores offer experiential shopping where customers can physically touch products, try on clothing, and receive personalized customer service immediately.'"
      },

      // SPEAKING PART 4: RESPOND TO QUESTIONS USING INFORMATION PROVIDED (Q8 - Q10: Tech Conference Agenda)
      {
        id: "tsw_q8",
        partNumber: 4,
        partTitle: "Part 4: Respond Using Information Provided",
        section: "SPEAKING",
        passageText: "AGENDA: PACIFIC TECH INNOVATION FORUM\nDate: Thursday, November 19, 2026\nLocation: Hyatt Regency Grand Ballroom, Seattle\n\n• 08:30 AM - 09:00 AM: Registration & Continental Breakfast (Lobby)\n• 09:00 AM - 10:15 AM: Keynote Speech: 'Next-Gen Artificial Intelligence in Supply Chain' — Dr. Alan Foster, CTO of CloudPulse Inc.\n• 10:30 AM - 12:00 PM: Panel Discussion: Cybersecurity Strategies for Enterprise Cloud\n• 12:00 PM - 01:30 PM: Networking Luncheon & Product Showcase (Dining Terrace)\n• 01:30 PM - 03:00 PM: Workshop A: Migrating Legacy Databases to Serverless Architecture — Lead: Samantha Lee (Room 102)\n• 01:30 PM - 03:00 PM: Workshop B: AI-Driven UI/UX Design Optimization — Lead: Kevin Patel (Room 105)\n• 03:15 PM - 04:30 PM: Closing Remarks & Startup Pitch Competition (Grand Ballroom)",
        speakingPrompt: "Hello, I am registered for the Pacific Tech Innovation Forum on November 19th, but I misplaced my event schedule. Could you please tell me when the forum starts and who is delivering the opening keynote speech?",
        preparationTimeSeconds: 45,
        speakingTimeSeconds: 15,
        questionText: "Question 8: When does the forum commence and who delivers the opening keynote address?",
        options: [
          { key: "A", text: "Record 15-second response" },
          { key: "B", text: "Review agenda details" },
          { key: "C", text: "Listen to native model answer" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Đáp án chuẩn: 'The forum starts with registration at 8:30 AM, and the opening keynote speech will be delivered from 9:00 AM to 10:15 AM by Dr. Alan Foster, Chief Technology Officer of CloudPulse Inc.'"
      },
      {
        id: "tsw_q9",
        partNumber: 4,
        partTitle: "Part 4: Respond Using Information Provided",
        section: "SPEAKING",
        passageText: "AGENDA: PACIFIC TECH INNOVATION FORUM (Same as Q8)",
        speakingPrompt: "I heard that attendees need to leave the venue during lunchtime to find restaurants in the area. Is that correct?",
        preparationTimeSeconds: 3,
        speakingTimeSeconds: 15,
        questionText: "Question 9: Do attendees need to go outside for lunch, or is a meal provided on-site?",
        options: [
          { key: "A", text: "Record 15-second response" },
          { key: "B", text: "Review agenda details" },
          { key: "C", text: "Listen to native model answer" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Đáp án chuẩn: 'No, actually that is not the case. There is a networking luncheon and product showcase provided on-site at the Dining Terrace from 12:00 PM to 1:30 PM.'"
      },
      {
        id: "tsw_q10",
        partNumber: 4,
        partTitle: "Part 4: Respond Using Information Provided",
        section: "SPEAKING",
        passageText: "AGENDA: PACIFIC TECH INNOVATION FORUM (Same as Q8)",
        speakingPrompt: "I am specifically interested in the afternoon workshop sessions. Could you please give me all the details about the workshops scheduled for the afternoon?",
        preparationTimeSeconds: 3,
        speakingTimeSeconds: 30,
        questionText: "Question 10: Provide complete details for all afternoon workshops taking place from 1:30 PM to 3:00 PM.",
        options: [
          { key: "A", text: "Record 30-second response" },
          { key: "B", text: "Review agenda details" },
          { key: "C", text: "Listen to native model answer" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Đáp án chuẩn: 'Certainly, there are two concurrent workshops scheduled from 1:30 PM to 3:00 PM. First, Workshop A on 'Migrating Legacy Databases to Serverless Architecture' led by Samantha Lee in Room 102. Second, Workshop B focusing on 'AI-Driven UI/UX Design Optimization' led by Kevin Patel in Room 105.'"
      },

      // SPEAKING PART 5: EXPRESS AN OPINION (Q11)
      {
        id: "tsw_q11",
        partNumber: 5,
        partTitle: "Part 5: Express an Opinion",
        section: "SPEAKING",
        speakingPrompt: "Do you agree or disagree with the following statement? 'Companies should require all employees to attend mandatory professional development seminars at least once every quarter.' Give reasons and examples to support your stance. You have 45 seconds to prepare and 60 seconds to speak.",
        preparationTimeSeconds: 45,
        speakingTimeSeconds: 60,
        questionText: "Question 11: Should organizations mandate quarterly professional development training for all personnel?",
        options: [
          { key: "A", text: "Record 60-second opinion speech" },
          { key: "B", text: "View essay outline framework" },
          { key: "C", text: "Listen to Band 8 sample speech" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Dàn ý điểm cao: Mở bài (Khẳng định đồng ý). Thân bài 1: Giúp nhân viên cập nhật công nghệ mới, giảm độ trễ kỹ năng. Thân bài 2: Tăng tính gắn kết nội bộ và năng suất. Kết bài: Tóm tắt lợi ích đôi bên cho cả công ty và người lao động."
      },

      // WRITING PART 1: WRITE A SENTENCE BASED ON A PICTURE (Q12 - Q16: Q1 to Q5 of Writing)
      {
        id: "tsw_q12",
        partNumber: 6,
        partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
        section: "WRITING",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        writingPrompt: "Write ONE sentence based on the picture using the TWO words provided: [manager / explain].",
        questionText: "Question 12 (Writing Q1): Write one grammatically accurate sentence using the prompt words: 'manager' and 'explain'.",
        sampleEssay: "The project manager is explaining the quarterly sales performance to her team members using a tablet.",
        options: [
          { key: "A", text: "Submit Sentence for AI Grading" },
          { key: "B", text: "View grammar rules" },
          { key: "C", text: "Check vocabulary collocations" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Câu chuẩn: Sử dụng đúng thì hiện tại tiếp diễn, kết hợp hài hòa cả 2 từ khóa mà không mắc lỗi cấu trúc ngữ pháp."
      },
      {
        id: "tsw_q13",
        partNumber: 6,
        partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
        section: "WRITING",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
        writingPrompt: "Write ONE sentence based on the picture using the TWO words provided: [warehouse / operate].",
        questionText: "Question 13 (Writing Q2): Write one sentence using the prompt words: 'warehouse' and 'operate'.",
        sampleEssay: "A warehouse technician is operating a motorized forklift to transport heavy cargo boxes across the aisle.",
        options: [
          { key: "A", text: "Submit Sentence for AI Grading" },
          { key: "B", text: "View grammar rules" },
          { key: "C", text: "Check vocabulary collocations" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Câu chuẩn: Đảm bảo chủ ngữ số ít đi với động từ số ít 'is operating' và danh từ 'warehouse' bổ nghĩa hợp ngữ cảnh."
      },
      {
        id: "tsw_q14",
        partNumber: 6,
        partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
        section: "WRITING",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80",
        writingPrompt: "Write ONE sentence based on the picture using the TWO words provided: [customer / credit card].",
        questionText: "Question 14 (Writing Q3): Write one sentence using the prompt words: 'customer' and 'credit card'.",
        sampleEssay: "A customer is handing her credit card to the store cashier to pay for her grocery purchase.",
        options: [
          { key: "A", text: "Submit Sentence for AI Grading" },
          { key: "B", text: "View grammar rules" },
          { key: "C", text: "Check vocabulary collocations" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Câu chuẩn: Cụm 'pay for something with a credit card' hoặc 'handing a credit card to someone'."
      },
      {
        id: "tsw_q15",
        partNumber: 6,
        partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
        section: "WRITING",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
        writingPrompt: "Write ONE sentence based on the picture using the TWO words provided: [inspect / blueprint].",
        questionText: "Question 15 (Writing Q4): Write one sentence using the prompt words: 'inspect' and 'blueprint'.",
        sampleEssay: "Two civil engineers wearing protective hard hats are inspecting architectural blueprints at an active construction site.",
        options: [
          { key: "A", text: "Submit Sentence for AI Grading" },
          { key: "B", text: "View grammar rules" },
          { key: "C", text: "Check vocabulary collocations" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Câu chuẩn: Cấu trúc chủ ngữ số nhiều 'Two civil engineers are inspecting architectural blueprints'."
      },
      {
        id: "tsw_q16",
        partNumber: 6,
        partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
        section: "WRITING",
        imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
        writingPrompt: "Write ONE sentence based on the picture using the TWO words provided: [meeting / discuss].",
        questionText: "Question 16 (Writing Q5): Write one sentence using the prompt words: 'meeting' and 'discuss'.",
        sampleEssay: "During the department meeting, team members are actively discussing upcoming marketing initiatives.",
        options: [
          { key: "A", text: "Submit Sentence for AI Grading" },
          { key: "B", text: "View grammar rules" },
          { key: "C", text: "Check vocabulary collocations" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Lưu ý ngữ pháp TOEIC: Động từ 'discuss' là ngoại động từ (transitive verb), không đi kèm giới từ 'about' ('discuss the plan', KHÔNG 'discuss about the plan')."
      },

      // WRITING PART 2: RESPOND TO A WRITTEN REQUEST (Q17 - Q18: Q6 & Q7 of Writing)
      {
        id: "tsw_q17",
        partNumber: 7,
        partTitle: "Writing Part 2: Respond to a Written Request",
        section: "WRITING",
        passageText: "FROM: Helen Keller, Purchasing Supervisor\nTO: Customer Support, Apex Office Supplies\nDATE: October 14, 2026\nSUBJECT: Inquiry regarding Bulk Order #AP-9021\n\nDear Apex Customer Support Team,\n\nI recently submitted order #AP-9021 for 45 ergonomic office chairs and 10 conference tables for our regional branch in Austin. However, I have not yet received a tracking confirmation email or an estimated delivery date. Could you please provide an update on the dispatch status of this shipment? In addition, we would like to know if it is possible to split the delivery into two separate installments.\n\nThank you for your prompt assistance.\n\nSincerely,\nHelen Keller\nHorizon Media Ltd.",
        writingPrompt: "Respond to the email as customer service specialist Alex Morgan. In your response, address TWO things: 1. Provide the shipping status and estimated arrival date. 2. Explain the policy regarding split deliveries.",
        questionText: "Question 17 (Writing Q6): Write a professional business reply email addressing all customer inquiries thoroughly.",
        sampleEssay: "Dear Ms. Keller,\n\nThank you for contacting Apex Office Supplies regarding your order #AP-9021. I am happy to assist you with your delivery inquiry.\n\nFirst, I would like to confirm that your shipment containing 45 ergonomic chairs and 10 conference tables was processed this morning. It has been dispatched via Freight Express under tracking number FX-88392, and the estimated delivery date to your Austin branch is Tuesday, October 20th.\n\nRegarding your request to split the shipment into two installments, our logistics policy allows split deliveries at no extra charge for orders exceeding $5,000. If you wish to proceed with this arrangement, please let us know by 3:00 PM tomorrow so we can instruct the regional distribution center accordingly.\n\nPlease let me know if you need any additional assistance.\n\nWarm regards,\nAlex Morgan\nCustomer Support Specialist\nApex Office Supplies",
        options: [
          { key: "A", text: "Submit Email Reply" },
          { key: "B", text: "Check email formatting checklist" },
          { key: "C", text: "Review tone & politeness score" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Tiêu chí chấm Gemini AI: Chào hỏi trang trọng, giải quyết đủ 2 yêu cầu, câu văn mạch lạc, sử dụng từ vựng kinh doanh chuẩn mực."
      },
      {
        id: "tsw_q18",
        partNumber: 7,
        partTitle: "Writing Part 2: Respond to a Written Request",
        section: "WRITING",
        passageText: "FROM: Daniel Thorne, Event Director\nTO: Catering Department, Grand Palace Hotel\nDATE: October 18, 2026\nSUBJECT: Catering arrangements for Annual Charity Gala\n\nDear Catering Team,\n\nWe are hosting our Annual Charity Gala at the Grand Ballroom on December 5th with approximately 250 attendees. We would like to finalize our dinner menu selections. Could you please provide your vegetarian and gluten-free dietary options? Additionally, could you confirm the deadline for submitting final guest count figures and any deposit payment requirements?\n\nBest regards,\nDaniel Thorne\nChildren's Hope Foundation",
        writingPrompt: "Respond to the email as catering coordinator Sophia Martinez. In your response, provide: 1. Dietary menu choices available. 2. Guest headcount deadline and deposit requirements.",
        questionText: "Question 18 (Writing Q7): Write a formal reply email detailing banquet menu options and booking timelines.",
        sampleEssay: "Dear Mr. Thorne,\n\nThank you for choosing the Grand Palace Hotel for the Annual Charity Gala on December 5th. We are thrilled to host your prestigious event.\n\nTo accommodate your guests with dietary preferences, our executive chef has curated several exquisite options. Our vegetarian selection features Truffle Wild Mushroom Risotto, while our gluten-free guests can enjoy Pan-Seared Atlantic Salmon with roasted seasonal vegetables.\n\nRegarding your logistical questions, final headcount numbers and dietary allocations must be confirmed no later than Friday, November 20th. A 30% deposit of the estimated total invoice is required upon menu confirmation to secure our culinary staff.\n\nShould you wish to schedule a complimentary menu tasting, please feel free to reach out.\n\nSincerely,\nSophia Martinez\nCatering Coordinator\nGrand Palace Hotel",
        options: [
          { key: "A", text: "Submit Email Reply" },
          { key: "B", text: "Check email formatting checklist" },
          { key: "C", text: "Review tone & politeness score" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Tiêu chí chấm: Cung cấp chính xác thông tin thực đơn ăn kiêng và thời hạn đặt cọc, phong thái chuyên nghiệp khách sạn 5 sao."
      },

      // WRITING PART 3: WRITE AN OPINION ESSAY (Q19: Q8 of Writing)
      {
        id: "tsw_q19",
        partNumber: 8,
        partTitle: "Writing Part 3: Write an Opinion Essay",
        section: "WRITING",
        writingPrompt: "Some multinational corporations require their managerial staff to rotate departments every two to three years in order to gain cross-functional experience. Other companies believe that managers should specialize in a single area for long-term career growth. Which approach do you think is more advantageous for both the company and the individual? Support your view with specific reasons and real-world examples. (Write at least 300 words. Suggested time: 30 minutes).",
        minWordCount: 300,
        sampleEssay: "In the contemporary global business landscape, the strategic development of executive leadership has become a cornerstone of organizational competitiveness. While specialized functional expertise undoubtedly fosters deep domain mastery, I firmly believe that periodic managerial rotation across diverse departments offers far superior advantages for both enterprise agility and individual professional growth.\n\nFrom an organizational perspective, cross-functional managerial rotation breaks down departmental silos and stimulates innovation. When managers gain firsthand exposure to marketing, finance, supply chain operations, and human resources, they develop a holistic understanding of how disparate business functions interconnect. For instance, a manager who transitions from customer support to product development can leverage granular consumer feedback to design more intuitive software solutions. Furthermore, cross-trained leaders foster seamless cross-departmental collaboration, minimizing bureaucratic friction and expediting strategic decision-making.\n\nFrom the standpoint of individual career trajectory, job rotation cultivates versatile leadership acumen and resilience. In an era marked by rapid technological disruption and fluctuating market dynamics, single-discipline specialists frequently encounter career plateaus when industry demands shift. In contrast, professionals with multifaceted competencies demonstrate enhanced problem-solving versatility, emotional intelligence, and adaptability. These cross-functional leaders are inherently better equipped to steer multinational enterprises through volatile market conditions, making them prime candidates for executive succession.\n\nCritics often argue that frequent rotation might disrupt departmental continuity or prevent managers from mastering nuanced technical nuances. However, this risk can be mitigated through structured knowledge-transfer protocols and strong middle-tier technical specialists.\n\nIn conclusion, while functional specialization retains value in highly technical subfields, the broad strategic perspective fostered by cross-departmental rotation delivers vastly superior long-term dividends. By cultivating agile, well-rounded leaders, companies ensure sustainable innovation while empowering employees to reach their fullest professional potential.",
        questionText: "Question 19 (Writing Q8): Write an extensive opinion essay (min 300 words) analyzing managerial job rotation versus functional specialization.",
        options: [
          { key: "A", text: "Submit Essay for AI Evaluation" },
          { key: "B", text: "Analyze paragraph cohesion" },
          { key: "C", text: "Check lexical variety and CEFR C1/C2 vocabulary" },
          { key: "D", text: "Skip question" }
        ],
        correctAnswer: "A",
        explanation: "Gemini AI chấm bài luận theo 4 tiêu chí quốc tế ETS: 1. Organization & Development (Cấu trúc 4 đoạn chặt chẽ). 2. Relevance & Coherence (Liên kết logic, luận điểm rõ ràng). 3. Vocabulary Richness (Từ vựng học thuật C1/C2). 4. Grammatical Accuracy (Đa dạng mệnh đề phức, câu đảo ngữ, bị động)."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 3. TOEIC FULL 4-SKILLS MASTER (219 AUTHENTIC QUESTIONS - 200 MINS)
  // ---------------------------------------------------------------------------
  {
    id: "toeic_full_4k_01",
    title: "TOEIC Master 4-Skills Full Simulation #01",
    type: "TOEIC_FULL",
    level: "Advanced",
    timeLimitMinutes: 200,
    totalQuestions: 219,
    maxScore: 1390,
    description: "Bộ đề trọn bộ 4 Kỹ Năng: Nghe (100 câu), Đọc (100 câu), Nói AI (11 câu) & Viết AI (8 câu) toàn diện nhất.",
    categoryBadge: "TOEIC 4-Skills",
    tags: ["Full 4-Skills", "TOEIC", "Master Suite", "ETS 2026", "Chính Thức"],
    supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
    questions: []
  },

  // ---------------------------------------------------------------------------
  // 4. IELTS ACADEMIC FULL 4-SKILLS SUITE (85 AUTHENTIC QUESTIONS - BAND 9.0)
  // ---------------------------------------------------------------------------
  {
    id: "ielts_academic_4k_01",
    title: "IELTS Academic Official Test #01 (4-Skills)",
    type: "IELTS_FULL",
    level: "Advanced",
    timeLimitMinutes: 175,
    totalQuestions: 85,
    maxScore: 9.0,
    description: "Bộ đề IELTS Academic 85 câu chuẩn Cambridge: Listening (40 câu), Reading (40 câu), Speaking AI (3 phần) & Writing AI (2 Task).",
    categoryBadge: "IELTS Academic",
    tags: ["IELTS", "Cambridge", "Academic", "4-Skills", "Band 9.0 Standard"],
    supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
    questions: (() => {
      const qs: ExamQuestion[] = [];

      // IELTS LISTENING (Q1 - Q40: 4 SECTIONS)
      // SECTION 1: University Student Accommodation Registration (Q1 - Q10)
      const sec1Script = "Officer: Good morning, Student Accommodation Services. How can I help you today?\nStudent: Hello, I'm an incoming postgraduate student from Canada starting the Master of Environmental Science in October, and I need to register for university housing.\nOfficer: Welcome! Let me take down your details. What is your full name?\nStudent: It's Marcus Vance.\nOfficer: Marcus Vance. And your student identification number?\nStudent: It is EV-88421.\nOfficer: Great. Which type of accommodation do you prefer: a single studio apartment, shared university flats, or a homestay family?\nStudent: I prefer a single studio apartment with a private kitchenette.\nOfficer: We have vacancies at Greenfield Hall on 84 Main Street. The weekly rent is 195 pounds, including high-speed fiber internet and all utility bills.\nStudent: That sounds ideal. Is there bicycle storage available?\nOfficer: Yes, secure indoor bicycle racks are located in Basement Block B. The deposit is 250 pounds, payable upon lease signing.\nStudent: Perfect. Thank you so much.";

      const sec1Questions = [
        { q: "What is Marcus Vance's degree program?", opts: [{ key: "A", text: "Master of Environmental Science" }, { key: "B", text: "Bachelor of Civil Engineering" }, { key: "C", text: "Doctor of Molecular Biology" }, { key: "D", text: "Diploma in Business Analytics" }], a: "A", exp: "Nghe: 'starting the Master of Environmental Science in October'." },
        { q: "What is Marcus's student ID number?", opts: [{ key: "A", text: "EV-88421" }, { key: "B", text: "EV-77210" }, { key: "C", text: "ES-88412" }, { key: "D", text: "EN-99420" }], a: "A", exp: "ID: 'It is EV-88421'." },
        { q: "What accommodation type did Marcus request?", opts: [{ key: "A", text: "Shared flat with four students" }, { key: "B", text: "Single studio apartment with private kitchenette" }, { key: "C", text: "Homestay with a local family" }, { key: "D", text: "Off-campus private house rental" }], a: "B", exp: "Loại phòng: 'single studio apartment with a private kitchenette'." },
        { q: "What is the address of Greenfield Hall?", opts: [{ key: "A", text: "12 Park Avenue" }, { key: "B", text: "55 King Street" }, { key: "C", text: "84 Main Street" }, { key: "D", text: "99 Broadway" }], a: "C", exp: "Địa chỉ: 'Greenfield Hall on 84 Main Street'." },
        { q: "How much is the weekly rent?", opts: [{ key: "A", text: "150 pounds" }, { key: "B", text: "175 pounds" }, { key: "C", text: "195 pounds" }, { key: "D", text: "220 pounds" }], a: "C", exp: "Tiền thuê: 'weekly rent is 195 pounds'." },
        { q: "What is included in the weekly rent?", opts: [{ key: "A", text: "Three meals daily in the dining hall" }, { key: "B", text: "High-speed internet and all utility bills" }, { key: "C", text: "Weekly laundry cleaning service" }, { key: "D", text: "Free gym personal training" }], a: "B", exp: "Bao gồm: 'including high-speed fiber internet and all utility bills'." },
        { q: "Where is the bicycle storage facility located?", opts: [{ key: "A", text: "Outdoor parking lot" }, { key: "B", text: "Basement Block B" }, { key: "C", text: "Behind the laundry facility" }, { key: "D", text: "Ground Floor Foyer" }], a: "B", exp: "Nơi để xe đạp: 'indoor bicycle racks are located in Basement Block B'." },
        { q: "How much is the refundable security deposit?", opts: [{ key: "A", text: "100 pounds" }, { key: "B", text: "200 pounds" }, { key: "C", text: "250 pounds" }, { key: "D", text: "500 pounds" }], a: "C", exp: "Tiền đặt cọc: 'deposit is 250 pounds'." },
        { q: "When does Marcus's academic term begin?", opts: [{ key: "A", text: "September" }, { key: "B", text: "October" }, { key: "C", text: "November" }, { key: "D", text: "January" }], a: "B", exp: "Thời gian nhập học: 'starting in October'." },
        { q: "Where does Marcus come from?", opts: [{ key: "A", text: "Australia" }, { key: "B", text: "Canada" }, { key: "C", text: "United States" }, { key: "D", text: "New Zealand" }], a: "B", exp: "Quốc tịch: 'incoming postgraduate student from Canada'." }
      ];

      sec1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 1}`,
          partNumber: 1,
          partTitle: "Listening Section 1: Student Accommodation",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
          questionText: `Question ${idx + 1}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 2: National Heritage Park Guided Walk (Q11 - Q20)
      const sec2Script = "Guide: Welcome, visitors, to the Pine Valley National Heritage Sanctuary. My name is Eleanor, and I will be guiding our historical eco-walk today. The sanctuary covers 1,200 hectares of ancient temperate woodland, established in 1892 by conservationist Arthur Pendelton. Before we begin our three-kilometer circuit, let me point out key facilities on your map. To your immediate right is the Visitor Education Center, where interactive touchscreens display our local wildlife catalog. The botanical herb garden is located straight ahead across the timber footbridge. Please note that the Raptor Observation Tower on High Ridge is closed today for routine timber maintenance. Visitors are reminded to stay strictly on marked gravel trails to prevent soil erosion. Binoculars can be rented at the gift shop for 4 pounds. Our walk will conclude at the Riverside Pavilion around 12:30 PM, where tea and scones will be served.";

      const sec2Questions = [
        { q: "When was the sanctuary established?", opts: [{ key: "A", text: "1875" }, { key: "B", text: "1892" }, { key: "C", text: "1905" }, { key: "D", text: "1920" }], a: "B", exp: "Năm thành lập: 'established in 1892'." },
        { q: "How large is the sanctuary?", opts: [{ key: "A", text: "800 hectares" }, { key: "B", text: "1,200 hectares" }, { key: "C", text: "1,500 hectares" }, { key: "D", text: "2,000 hectares" }], a: "B", exp: "Diện tích: 'covers 1,200 hectares'." },
        { q: "What is the length of today's walking route?", opts: [{ key: "A", text: "Two kilometers" }, { key: "B", text: "Three kilometers" }, { key: "C", text: "Five kilometers" }, { key: "D", text: "Eight kilometers" }], a: "B", exp: "Độ dài đường đi: 'three-kilometer circuit'." },
        { q: "Where is the botanical herb garden located?", opts: [{ key: "A", text: "Behind the gift shop" }, { key: "B", text: "Straight ahead across the timber footbridge" }, { key: "C", text: "On top of High Ridge" }, { key: "D", text: "Near the car park" }], a: "B", exp: "Vị trí vườn thảo mộc: 'straight ahead across the timber footbridge'." },
        { q: "Why is the Raptor Observation Tower closed today?", opts: [{ key: "A", text: "Bird nesting season" }, { key: "B", text: "Routine timber maintenance" }, { key: "C", text: "Storm damage repairs" }, { key: "D", text: "Filming of a wildlife documentary" }], a: "B", exp: "Lý do đóng cửa: 'closed today for routine timber maintenance'." },
        { q: "Why must visitors stay on marked gravel paths?", opts: [{ key: "A", text: "To avoid poisonous snakes" }, { key: "B", text: "To prevent soil erosion" }, { key: "C", text: "To avoid private farmland" }, { key: "D", text: "To keep walking groups together" }], a: "B", exp: "Lý do: 'to prevent soil erosion'." },
        { q: "How much does binocular rental cost?", opts: [{ key: "A", text: "2 pounds" }, { key: "B", text: "4 pounds" }, { key: "C", text: "6 pounds" }, { key: "D", text: "Free of charge" }], a: "B", exp: "Giá thuê ống nhòm: 'rented at the gift shop for 4 pounds'." },
        { q: "Where will the walk conclude?", opts: [{ key: "A", text: "At the Visitor Center" }, { key: "B", text: "At the Riverside Pavilion" }, { key: "C", text: "At High Ridge Lookout" }, { key: "D", text: "At the Main Gate" }], a: "B", exp: "Điểm kết thúc: 'conclude at the Riverside Pavilion'." },
        { q: "What refreshments will be provided at the end?", opts: [{ key: "A", text: "Cold sandwiches and juice" }, { key: "B", text: "Tea and scones" }, { key: "C", text: "Barbecue lunch" }, { key: "D", text: "Fresh fruit and coffee" }], a: "B", exp: "Đồ ăn nhẹ: 'tea and scones will be served'." },
        { q: "What time will the guided walk finish?", opts: [{ key: "A", text: "11:30 AM" }, { key: "B", text: "12:00 PM" }, { key: "C", text: "Around 12:30 PM" }, { key: "D", text: "01:15 PM" }], a: "C", exp: "Thời gian kết thúc: 'around 12:30 PM'." }
      ];

      sec2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 11}`,
          partNumber: 2,
          partTitle: "Listening Section 2: Heritage Park Tour",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
          questionText: `Question ${idx + 11}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 3: Academic Research on Marine Bioluminescence (Q21 - Q30)
      const sec3Script = "Professor: Good afternoon, Claire and Liam. Let's review your research proposal on deep-sea marine bioluminescence.\nClaire: Thank you, Professor Evans. We've structured our paper into three main sections: the biochemical mechanisms of luciferin-luciferase reactions, evolutionary adaptations for predator deterrence, and modern medical applications of green fluorescent proteins.\nLiam: We found that over 75 percent of deep-sea organisms between 200 and 1,000 meters depth utilize bioluminescence for camouflage through counter-illumination.\nProfessor: That is an excellent focus. However, I noticed that your literature review relies heavily on studies published before 2018. You should incorporate recent genomic sequencing papers by Dr. Tanaka from the Oceanographic Institute.\nClaire: We will review those papers this week and expand the methodology chapter accordingly.\nProfessor: Make sure you submit your revised draft by Friday, November 14th.";

      const sec3Questions = [
        { q: "What are the three main focus areas of Claire and Liam's proposal?", opts: [{ key: "A", text: "Biochemistry, evolutionary deterrence, and medical applications" }, { key: "B", text: "Ocean currents, water salinity, and coral health" }, { key: "C", text: "Commercial fishing, submersibles, and navigation" }, { key: "D", text: "Tectonic plates, hydrothermal vents, and bacteria" }], a: "A", exp: "3 phần chính: 'biochemical mechanisms, evolutionary adaptations, and modern medical applications'." },
        { q: "What percentage of organisms between 200-1000m use bioluminescence?", opts: [{ key: "A", text: "50 percent" }, { key: "B", text: "60 percent" }, { key: "C", text: "Over 75 percent" }, { key: "D", text: "90 percent" }], a: "C", exp: "Tỷ lệ: 'over 75 percent of deep-sea organisms'." },
        { q: "What is counter-illumination used for?", opts: [{ key: "A", text: "Attracting prey" }, { key: "B", text: "Camouflage against predators" }, { key: "C", text: "Warning shoal members of danger" }, { key: "D", text: "Regulating body temperature" }], a: "B", exp: "Tác dụng: 'camouflage through counter-illumination'." },
        { q: "What weakness did Professor Evans identify in their literature review?", opts: [{ key: "A", text: "Too few statistical charts" }, { key: "B", text: "Heavy reliance on pre-2018 publications" }, { key: "C", text: "Lack of deep-sea photograph citations" }, { key: "D", text: "Inaccurate chemical formulas" }], a: "B", exp: "Hạn chế: 'literature review relies heavily on studies published before 2018'." },
        { q: "Whose recent genomic research should the students incorporate?", opts: [{ key: "A", text: "Dr. Arthur Pendelton" }, { key: "B", text: "Dr. Tanaka from the Oceanographic Institute" }, { key: "C", text: "Dr. Marcus Vance" }, { key: "D", text: "Dr. Eleanor Rossi" }], a: "B", exp: "Tác giả cần bổ sung: 'recent genomic sequencing papers by Dr. Tanaka'." },
        { q: "What chapter will the students expand?", opts: [{ key: "A", text: "The Abstract" }, { key: "B", text: "The Methodology chapter" }, { key: "C", text: "The Conclusion" }, { key: "D", text: "The Bibliography index" }], a: "B", exp: "Mục cần mở rộng: 'expand the methodology chapter accordingly'." },
        { q: "What is the revised draft submission deadline?", opts: [{ key: "A", text: "Monday, November 10th" }, { key: "B", text: "Friday, November 14th" }, { key: "C", text: "Wednesday, November 19th" }, { key: "D", text: "End of the semester" }], a: "B", exp: "Thời hạn nộp bài: 'revised draft by Friday, November 14th'." },
        { q: "What chemical reaction produces biological light?", opts: [{ key: "A", text: "Photosynthesis and chlorophyll" }, { key: "B", text: "Luciferin-luciferase reaction" }, { key: "C", text: "Sodium-potassium cellular pump" }, { key: "D", text: "ATP hydrolysis alone" }], a: "B", exp: "Phản ứng hóa sinh: 'biochemical mechanisms of luciferin-luciferase reactions'." },
        { q: "At what depth range is counter-illumination most prevalent?", opts: [{ key: "A", text: "0 to 100 meters" }, { key: "B", text: "200 to 1,000 meters" }, { key: "C", text: "2,000 to 4,000 meters" }, { key: "D", text: "Below 6,000 meters" }], a: "B", exp: "Độ sâu: 'between 200 and 1,000 meters depth'." },
        { q: "What medical application is mentioned in the research?", opts: [{ key: "A", text: "Antibiotic synthesis" }, { key: "B", text: "Green fluorescent proteins in cellular imaging" }, { key: "C", text: "Cardiovascular stents" }, { key: "D", text: "Radiation therapy shielding" }], a: "B", exp: "Ứng dụng y học: 'medical applications of green fluorescent proteins'." }
      ];

      sec3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 21}`,
          partNumber: 3,
          partTitle: "Listening Section 3: Marine Bioluminescence",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
          questionText: `Question ${idx + 21}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 4: University Lecture on Microfinance in Developing Economies (Q31 - Q40)
      const sec4Script = "Lecturer: Good morning. Today's lecture examines the evolution and socioeconomic impact of microfinance institutions across rural communities in South Asia and Latin America. Pioneer Muhammad Yunus established the Grameen Bank in Bangladesh in 1983, predicated on the revolutionary principle that unbanked individuals, particularly women, could achieve economic self-sufficiency if provided with modest micro-credit collateral-free loans. Empirical data from over forty years reveals that women represent 84 percent of all micro-borrowers globally, and their loan repayment rates consistently exceed 97 percent. Microfinance has stimulated local entrepreneurship in agriculture, textile weaving, and renewable energy adoption. However, modern critics point to challenges, including exorbitant secondary interest rates charged by unregulated commercial lenders and debt cycling among vulnerable households. Sustainable microfinance requires stringent regulatory caps on interest rates and comprehensive financial literacy education.";

      const sec4Questions = [
        { q: "When was Grameen Bank established by Muhammad Yunus?", opts: [{ key: "A", text: "1972" }, { key: "B", text: "1983" }, { key: "C", text: "1991" }, { key: "D", text: "2000" }], a: "B", exp: "Năm thành lập: 'established the Grameen Bank in Bangladesh in 1983'." },
        { q: "What percentage of global micro-borrowers are women?", opts: [{ key: "A", text: "65 percent" }, { key: "B", text: "75 percent" }, { key: "C", text: "84 percent" }, { key: "D", text: "95 percent" }], a: "C", exp: "Tỷ lệ phụ nữ vay: 'women represent 84 percent of all micro-borrowers globally'." },
        { q: "What is the average repayment rate for female microfinance borrowers?", opts: [{ key: "A", text: "85 percent" }, { key: "B", text: "90 percent" }, { key: "C", text: "Over 97 percent" }, { key: "D", text: "100 percent" }], a: "C", exp: "Tỷ lệ hoàn trả: 'repayment rates consistently exceed 97 percent'." },
        { q: "What was the core innovation of early microfinance?", opts: [{ key: "A", text: "High collateral property mortgages" }, { key: "B", text: "Modest, collateral-free credit for unbanked individuals" }, { key: "C", text: "Government-subsidized currency speculation" }, { key: "D", text: "Cryptocurrency digital wallets" }], a: "B", exp: "Đổi mới cốt lõi: 'modest micro-credit collateral-free loans for unbanked individuals'." },
        { q: "Which sectors have benefited most from micro-loans?", opts: [{ key: "A", text: "Heavy industrial mining and automotive assembly" }, { key: "B", text: "Agriculture, textile weaving, and renewable energy" }, { key: "C", text: "Aerospace engineering and luxury real estate" }, { key: "D", text: "Commercial shipping and maritime logistics" }], a: "B", exp: "Các ngành hưởng lợi: 'entrepreneurship in agriculture, textile weaving, and renewable energy'." },
        { q: "What primary criticism do modern analysts highlight?", opts: [{ key: "A", text: "Excessive bureaucratic paperwork" }, { key: "B", text: "Exorbitant secondary interest rates and debt cycling" }, { key: "C", text: "Lack of female participation" }, { key: "D", text: "Over-reliance on commercial banking bailouts" }], a: "B", exp: "Chỉ trích: 'exorbitant secondary interest rates charged by unregulated lenders and debt cycling'." },
        { q: "What dual solutions does the lecturer recommend for sustainability?", opts: [{ key: "A", text: "Government bans on private banks" }, { key: "B", text: "Regulatory interest rate caps and financial literacy training" }, { key: "C", text: "Eliminating all credit loans" }, { key: "D", text: "Transitioning to barter trade" }], a: "B", exp: "Giải pháp bền vững: 'stringent regulatory caps on interest rates and comprehensive financial literacy education'." },
        { q: "In which country was Grameen Bank founded?", opts: [{ key: "A", text: "India" }, { key: "B", text: "Bangladesh" }, { key: "C", text: "Pakistan" }, { key: "D", text: "Sri Lanka" }], a: "B", exp: "Quốc gia khởi xướng: 'Grameen Bank in Bangladesh'." },
        { q: "How many years of empirical data were examined in the lecture?", opts: [{ key: "A", text: "Twenty years" }, { key: "B", text: "Thirty years" }, { key: "C", text: "Over forty years" }, { key: "D", text: "Fifty years" }], a: "C", exp: "Dữ liệu thực nghiệm: 'Empirical data from over forty years'." },
        { q: "What is the main overarching theme of the lecture?", opts: [{ key: "A", text: "The history of central banking" }, { key: "B", text: "Socioeconomic impacts and challenges of microfinance in developing economies" }, { key: "C", text: "Stock exchange volatility in Asia" }, { key: "D", text: "Corporate taxation laws in Latin America" }], a: "B", exp: "Chủ đề bao quát: 'evolution and socioeconomic impact of microfinance institutions across rural communities'." }
      ];

      sec4Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 31}`,
          partNumber: 4,
          partTitle: "Listening Section 4: Microfinance Economics",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
          questionText: `Question ${idx + 31}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // IELTS READING (Q41 - Q80: 3 ACADEMIC PASSAGES, 40 QUESTIONS)
      // PASSAGE 1: The Biology & Conservation of Coral Reef Bleaching (Q41 - Q53: 13 Questions)
      const readPassage1 = `READING PASSAGE 1 — THE BIOLOGY AND CONSERVATION OF CORAL REEF BLEACHING\n\nCoral reefs represent some of the most biodiverse marine ecosystems on Earth, occupying less than 0.1 percent of the ocean floor yet harboring more than 25 percent of all documented marine species. The structural foundation of tropical coral reefs is built upon a delicate symbiotic relationship between scleractinian coral polyps and microscopic endosymbiotic dinoflagellates known as zooxanthellae (Symbiodiniaceae). These photosynthetic microalgae reside within the gastrodermal tissues of the coral host, supplying up to 90 percent of the polyp's metabolic energy requirements through photosynthesis in exchange for essential inorganic nutrients and protective shelter.\n\nWhen sea surface temperatures exceed local seasonal baselines by as little as 1 to 2 degrees Celsius for sustained periods of four weeks or more, the photosynthetic machinery of zooxanthellae becomes impaired. The microalgae begin producing harmful reactive oxygen species (ROS) that damage cellular structures. In response to physiological oxidative stress, the coral host expels the algae, causing the coral colony to lose its characteristic vibrant pigmentation and exposing the stark white calcium carbonate skeleton underneath—a phenomenon termed 'coral bleaching.' While bleached corals are not immediately deceased, they enter a state of severe starvation and heightened vulnerability to opportunistic pathogens.\n\nMarine scientists have observed four global mass bleaching events: in 1998, 2010, 2014–2017, and most recently in 2024–2026. The 2016 event alone devastated over 30 percent of shallow-water corals across Australia's Great Barrier Reef. However, recent scientific breakthroughs in assisted evolution and selective breeding offer promising conservation pathways. Marine biologists at the Australian Institute of Marine Science (AIMS) have successfully cultivated heat-tolerant strains of Symbiodiniaceae capable of withstanding ocean temperatures 2.5 degrees Celsius above historical averages. When inoculated into laboratory-reared coral larvae, these thermally resilient symbionts significantly enhance post-settlement survival rates.\n\nNevertheless, marine ecologists emphasize that biological interventions alone cannot substitute for global climate mitigation. Halting ocean warming through aggressive decarbonization remains the indispensable prerequisite for ensuring that coral reefs survive for future generations.`;

      const p1Questions = [
        { q: "What percentage of the ocean floor do coral reefs occupy?", opts: [{ key: "A", text: "Less than 0.1 percent" }, { key: "B", text: "1.5 percent" }, { key: "C", text: "10 percent" }, { key: "D", text: "25 percent" }], a: "A", exp: "Đoạn 1: 'occupying less than 0.1 percent of the ocean floor'." },
        { q: "What percentage of marine species depend on coral reef ecosystems?", opts: [{ key: "A", text: "Less than 5 percent" }, { key: "B", text: "10 percent" }, { key: "C", text: "More than 25 percent" }, { key: "D", text: "90 percent" }], a: "C", exp: "Đoạn 1: 'harboring more than 25 percent of all documented marine species'." },
        { q: "What are zooxanthellae?", opts: [{ key: "A", text: "Parasitic marine worms" }, { key: "B", text: "Microscopic endosymbiotic photosynthetic microalgae" }, { key: "C", text: "Calcium carbonate mineral deposits" }, { key: "D", text: "Predatory deep-sea jellyfish" }], a: "B", exp: "Đoạn 1: 'microscopic endosymbiotic dinoflagellates known as zooxanthellae'." },
        { q: "How much of the coral polyp's metabolic energy is supplied by zooxanthellae?", opts: [{ key: "A", text: "Up to 25 percent" }, { key: "B", text: "Up to 50 percent" }, { key: "C", text: "Up to 75 percent" }, { key: "D", text: "Up to 90 percent" }], a: "D", exp: "Đoạn 1: 'supplying up to 90 percent of the polyp's metabolic energy requirements'." },
        { q: "What temperature increase triggers cellular damage in zooxanthellae?", opts: [{ key: "A", text: "0.2 degrees Celsius" }, { key: "B", text: "1 to 2 degrees Celsius above seasonal baselines" }, { key: "C", text: "5 degrees Celsius" }, { key: "D", text: "10 degrees Celsius" }], a: "B", exp: "Đoạn 2: 'exceed local seasonal baselines by as little as 1 to 2 degrees Celsius'." },
        { q: "What toxic molecules do damaged microalgae produce during thermal stress?", opts: [{ key: "A", text: "Carbon monoxide" }, { key: "B", text: "Reactive oxygen species (ROS)" }, { key: "C", text: "Sulfur dioxide" }, { key: "D", text: "Heavy metals" }], a: "B", exp: "Đoạn 2: 'producing harmful reactive oxygen species (ROS)'." },
        { q: "Are bleached corals immediately dead?", opts: [{ key: "A", text: "Yes, death is instantaneous upon color loss" }, { key: "B", text: "No, they enter a state of starvation and vulnerability" }, { key: "C", text: "Yes, the calcium skeleton dissolves immediately" }, { key: "D", text: "No, their growth rate accelerates" }], a: "B", exp: "Đoạn 2: 'bleached corals are not immediately deceased, they enter a state of severe starvation'." },
        { q: "How many global mass bleaching events have been documented?", opts: [{ key: "A", text: "Two events" }, { key: "B", text: "Four global mass events" }, { key: "C", text: "Seven events" }, { key: "D", text: "Ten events" }], a: "B", exp: "Đoạn 3: 'observed four global mass bleaching events: in 1998, 2010, 2014–2017, and 2024–2026'." },
        { q: "What proportion of shallow-water corals died on the Great Barrier Reef in 2016?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "Over 30 percent" }, { key: "C", text: "50 percent" }, { key: "D", text: "80 percent" }], a: "B", exp: "Đoạn 3: 'devastated over 30 percent of shallow-water corals'." },
        { q: "What conservation breakthrough was achieved by researchers at AIMS?", opts: [{ key: "A", text: "Inventing synthetic plastic coral skeletons" }, { key: "B", text: "Cultivating heat-tolerant microalgae strains capable of surviving +2.5°C" }, { key: "C", text: "Building underwater refrigeration chillers" }, { key: "D", text: "Shading ocean reefs with reflective plastic sheets" }], a: "B", exp: "Đoạn 3: 'cultivated heat-tolerant strains of Symbiodiniaceae capable of withstanding +2.5 degrees Celsius'." },
        { q: "Do the authors believe biological interventions alone can save coral reefs?", opts: [{ key: "A", text: "Yes, assisted evolution will eliminate all risks" }, { key: "B", text: "No, global climate mitigation and decarbonization are indispensable" }, { key: "C", text: "Yes, corals can adapt to any temperature level" }, { key: "D", text: "No, all coral species will become extinct regardless" }], a: "B", exp: "Đoạn 4: 'biological interventions alone cannot substitute for global climate mitigation'." },
        { q: "What is the primary mineral component of the coral skeleton?", opts: [{ key: "A", text: "Silicon dioxide" }, { key: "B", text: "Calcium carbonate" }, { key: "C", text: "Magnesium sulfate" }, { key: "D", text: "Iron oxide" }], a: "B", exp: "Đoạn 2: 'white calcium carbonate skeleton underneath'." },
        { q: "What is the tone and objective of the reading passage?", opts: [{ key: "A", text: "Humorous and informal" }, { key: "B", text: "Scientific, objective, and urgent" }, { key: "C", text: "Commercial and promotional" }, { key: "D", text: "Philosophical and speculative" }], a: "B", exp: "Văn phong học thuật, khách quan và nhấn mạnh tính cấp bách bảo tồn." }
      ];

      p1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 41}`,
          partNumber: 5,
          partTitle: "Reading Passage 1: Coral Reef Bleaching",
          section: "READING",
          passageText: readPassage1,
          questionText: `Question ${idx + 41}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // PASSAGE 2: Cognitive Psychology & Memory Consolidation in Sleep (Q54 - Q66: 13 Questions)
      const readPassage2 = `READING PASSAGE 2 — COGNITIVE PSYCHOLOGY AND SLEEP MEMORY CONSOLIDATION\n\nFor over a century, neuroscientists and cognitive psychologists have sought to decipher the precise mechanisms through which the human brain transforms ephemeral waking experiences into enduring long-term memories. Contemporary sleep science posits that memory consolidation is not a passive decay-prevention process, but an active, system-level neurobiological reorganization that unfolds predominantly during non-rapid eye movement (NREM) slow-wave sleep and rapid eye movement (REM) stages.\n\nThe leading neurobiological model, known as the 'Two-Stage Memory Architecture,' conceptualizes the hippocampus as a rapid-learning, temporary buffer with high synaptic plasticity, and the neocortex as a slow-learning, vast long-term storage reservoir. During quiet waking and deep NREM slow-wave sleep (characterized by high-amplitude cortical delta oscillations below 4 Hz and thalamocortical sleep spindles between 12 and 15 Hz), the hippocampus engages in spontaneous, high-frequency 'sharp-wave ripples.' These ripples represent compressed neural replay of firing sequences that occurred during prior daytime learning.\n\nThrough synchronized dialogue between hippocampal ripples, thalamic spindles, and neocortical slow oscillations, newly acquired memories are progressively transferred and integrated into distributed neocortical circuits. Experimental studies using optogenetic silencing in rodent models demonstrated that disrupting sharp-wave ripples during post-learning sleep caused catastrophic impairment in spatial navigational recall, confirming the causal role of sleep replay.\n\nFurthermore, REM sleep—characterized by desynchronized EEG waveforms, rapid ocular movements, and muscle atonia—plays a distinct role in emotional memory regulation and associative creative problem-solving. During REM dreaming, low levels of the stress neurotransmitter noradrenaline allow the amygdala and prefrontal cortex to process emotionally charged memories in a neurochemically safe milieu, decoupling the factual memory from its visceral stress response. Consequently, chronic sleep deprivation not only impairs cognitive retention but exacerbates affective mood disorders.`;

      const p2Questions = [
        { q: "What is the primary role of the hippocampus in the Two-Stage Memory Architecture?", opts: [{ key: "A", text: "Long-term permanent storage reservoir" }, { key: "B", text: "Temporary, rapid-learning memory buffer" }, { key: "C", text: "Motor muscle coordination center" }, { key: "D", text: "Sensory visual processing unit" }], a: "B", exp: "Đoạn 2: 'hippocampus as a rapid-learning, temporary buffer'." },
        { q: "Where are permanent long-term memories primarily stored?", opts: [{ key: "A", text: "In the cerebellum" }, { key: "B", text: "In distributed neocortical circuits" }, { key: "C", text: "In the spinal cord" }, { key: "D", text: "In the optic nerve" }], a: "B", exp: "Đoạn 2: 'neocortex as a slow-learning, vast long-term storage reservoir'." },
        { q: "What frequency defines cortical delta oscillations during slow-wave sleep?", opts: [{ key: "A", text: "Below 4 Hz" }, { key: "B", text: "Between 12 and 15 Hz" }, { key: "C", text: "30 to 50 Hz" }, { key: "D", text: "Above 100 Hz" }], a: "A", exp: "Đoạn 2: 'cortical delta oscillations below 4 Hz'." },
        { q: "What frequency range characterizes thalamocortical sleep spindles?", opts: [{ key: "A", text: "1 to 3 Hz" }, { key: "B", text: "Between 12 and 15 Hz" }, { key: "C", text: "20 to 25 Hz" }, { key: "D", text: "80 to 90 Hz" }], a: "B", exp: "Đoạn 2: 'thalamocortical sleep spindles between 12 and 15 Hz'." },
        { q: "What are hippocampal 'sharp-wave ripples'?", opts: [{ key: "A", text: "Electrical artifacts caused by eye movement" }, { key: "B", text: "Compressed neural replays of prior waking learning sequences" }, { key: "C", text: "Signs of brain tissue fatigue" }, { key: "D", text: "Inhibitory signals that suppress all memory" }], a: "B", exp: "Đoạn 2: 'compressed neural replay of firing sequences that occurred during prior daytime learning'." },
        { q: "What happened to rodents when sharp-wave ripples were optogenetically disrupted?", opts: [{ key: "A", text: "Their running speed increased" }, { key: "B", text: "Catastrophic impairment in spatial navigational recall" }, { key: "C", text: "They entered prolonged REM sleep" }, { key: "D", text: "Their vision improved" }], a: "B", exp: "Đoạn 3: 'caused catastrophic impairment in spatial navigational recall'." },
        { q: "Which sleep stage is characterized by rapid eye movement and muscle atonia?", opts: [{ key: "A", text: "NREM Stage 1" }, { key: "B", text: "NREM Stage 3 Slow-Wave Sleep" }, { key: "C", text: "REM Sleep" }, { key: "D", text: "Quiet wakefulness" }], a: "C", exp: "Đoạn 4: 'REM sleep—characterized by desynchronized EEG waveforms, rapid ocular movements, and muscle atonia'." },
        { q: "What is the key emotional benefit of REM sleep?", opts: [{ key: "A", text: "Eliminating all emotional memories completely" }, { key: "B", text: "Decoupling factual memories from their visceral stress response in a low-noradrenaline environment" }, { key: "C", text: "Increasing adrenaline production for daytime alertness" }, { key: "D", text: "Strengthening negative emotional reactions" }], a: "B", exp: "Đoạn 4: 'decoupling the factual memory from its visceral stress response'." },
        { q: "Which neurotransmitter is present at low levels during REM dreaming?", opts: [{ key: "A", text: "Dopamine" }, { key: "B", text: "Noradrenaline" }, { key: "C", text: "Serotonin" }, { key: "D", text: "Acetylcholine" }], a: "B", exp: "Đoạn 4: 'low levels of the stress neurotransmitter noradrenaline'." },
        { q: "What are the dual consequences of chronic sleep deprivation mentioned in the text?", opts: [{ key: "A", text: "Hearing loss and digestive failure" }, { key: "B", text: "Impaired cognitive retention and exacerbated affective mood disorders" }, { key: "C", text: "Loss of bone density and hair thinning" }, { key: "D", text: "Increased appetite for protein only" }], a: "B", exp: "Đoạn 4: 'impairs cognitive retention but exacerbates affective mood disorders'." },
        { q: "The term 'active, system-level neurobiological reorganization' implies that memory consolidation is:", opts: [{ key: "A", text: "A purely mechanical forgetting of old data" }, { key: "B", text: "A complex, constructive process involving multiple brain regions" }, { key: "C", text: "A passive fading of neural connections" }, { key: "D", text: "An instantaneous event occurring in seconds" }], a: "B", exp: "Đoạn 1: Quá trình tái cấu trúc chủ động liên vùng não (hippocampus + neocortex)." },
        { q: "Which technique was used in rodent models to prove the causal role of ripples?", opts: [{ key: "A", text: "Magnetic resonance imaging (MRI)" }, { key: "B", text: "Optogenetic silencing" }, { key: "C", text: "Surgical removal of the whole brain" }, { key: "D", text: "Simple behavioral observation without sensors" }], a: "B", exp: "Đoạn 3: 'Experimental studies using optogenetic silencing in rodent models'." },
        { q: "What is the main finding of the passage regarding sleep and memory?", opts: [{ key: "A", text: "Sleep is merely a period of physical rest without brain activity" }, { key: "B", text: "Specific sleep stages coordinate memory transfer and emotional regulation" }, { key: "C", text: "Dreams are completely random and serve no biological purpose" }, { key: "D", text: "Only daytime studying affects exam performance" }], a: "B", exp: "Chủ đề chính: Các giai đoạn ngủ phối hợp chuyển giao ký ức và điều hòa cảm xúc." }
      ];

      p2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 54}`,
          partNumber: 6,
          partTitle: "Reading Passage 2: Sleep & Memory Consolidation",
          section: "READING",
          passageText: readPassage2,
          questionText: `Question ${idx + 54}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // PASSAGE 3: Industrial Archaeology of Early Textile Mills (Q67 - Q80: 14 Questions)
      const readPassage3 = `READING PASSAGE 3 — THE INDUSTRIAL ARCHAEOLOGY OF EARLY TEXTILE MILLS\n\nThe Industrial Revolution of the late eighteenth and early nineteenth centuries transformed Britain from an agrarian economy into the workshop of the world. Central to this epochal transformation was the mechanization of cotton textile manufacturing, catalyzed by pioneering inventions such as Richard Arkwright's water frame (patented in 1769) and Samuel Crompton's spinning mule (1779). Industrial archaeologists studying the structural remains of early water-powered mills in Derbyshire's Derwent Valley have revealed how architectural design and spatial organization were engineered to maximize kinetic power transmission and enforce labor discipline.\n\nArkwright's Cromford Mill, constructed in 1771, served as the universal archetype for the modern factory system. Prior to Cromford, textile spinning was decentralized, conducted within domestic cottages under the 'putting-out' system. Arkwright concentrated hundreds of mechanized spindles under a single roof, powered by a massive cast-iron breastshot waterwheel driven by Bonsall Brook and the Cromford sough. Archaeological excavations at Cromford have uncovered subterranean water culverts, stone shuttle gates, and gear pits that demonstrate remarkable hydraulic precision in maintaining continuous rotational torque.\n\nThe architectural layout of multi-story mill buildings reflected strict hierarchical surveillance. Long, narrow floorplates with expansive grid windows maximized natural daylight penetration for fine thread handling while providing unobstructed sightlines for factory overseers. The introduction of Boulton & Watt rotative steam engines in the 1790s liberated mills from geographical dependency on fast-flowing river valleys, precipitating the rapid urbanization of Manchester—subsequently dubbed 'Cottonopolis.' However, archaeological evidence from worker housing rows at Belper and Milford demonstrates that early mill owners also constructed paternalistic community infrastructures, including churches, schools, and cooperative bakeries, to attract and retain skilled labor families.\n\nToday, the Derwent Valley Mills World Heritage Site stands as a poignant testament to the technological ingenuity and profound social upheaval of the dawn of the industrial era.`;

      const p3Questions = [
        { q: "What did Richard Arkwright patent in 1769?", opts: [{ key: "A", text: "The steam locomotive" }, { key: "B", text: "The water frame" }, { key: "C", text: "The cotton gin" }, { key: "D", text: "The power loom" }], a: "B", exp: "Đoạn 1: 'Richard Arkwright's water frame (patented in 1769)'." },
        { q: "Who invented the spinning mule in 1779?", opts: [{ key: "A", text: "James Watt" }, { key: "B", text: "Samuel Crompton" }, { key: "C", text: "Arthur Pendelton" }, { key: "D", text: "Matthew Boulton" }], a: "B", exp: "Đoạn 1: 'Samuel Crompton's spinning mule (1779)'." },
        { q: "What was the traditional textile production model before Cromford Mill?", opts: [{ key: "A", text: "The assembly line model" }, { key: "B", text: "The domestic putting-out cottage system" }, { key: "C", text: "State-owned collective workshops" }, { key: "D", text: "Importing all yarn from overseas" }], a: "B", exp: "Đoạn 2: 'decentralized, conducted within domestic cottages under the putting-out system'." },
        { q: "What powered Arkwright's original Cromford Mill in 1771?", opts: [{ key: "A", text: "Coal steam engines" }, { key: "B", text: "A massive cast-iron breastshot waterwheel" }, { key: "C", text: "Windmills" }, { key: "D", text: "Horse-drawn dynamos" }], a: "B", exp: "Đoạn 2: 'powered by a massive cast-iron breastshot waterwheel'." },
        { q: "What archaeological artifacts were excavated at Cromford?", opts: [{ key: "A", text: "Roman pottery and bronze swords" }, { key: "B", text: "Subterranean water culverts, stone shuttle gates, and gear pits" }, { key: "C", text: "Railway steel rails" }, { key: "D", text: "Printing presses" }], a: "B", exp: "Đoạn 2: 'uncovered subterranean water culverts, stone shuttle gates, and gear pits'." },
        { q: "Why did early mills feature long, narrow floors with large windows?", opts: [{ key: "A", text: "To reduce heating fuel costs" }, { key: "B", text: "To maximize natural daylight and provide clear overseer sightlines" }, { key: "C", text: "To allow smoke from coal stoves to escape" }, { key: "D", text: "To comply with fire exit regulations" }], a: "B", exp: "Đoạn 3: 'maximized natural daylight penetration... while providing unobstructed sightlines for factory overseers'." },
        { q: "What major technological shift occurred in the 1790s?", opts: [{ key: "A", text: "Electrification of looms" }, { key: "B", text: "Introduction of Boulton & Watt rotative steam engines" }, { key: "C", text: "Synthetic nylon invention" }, { key: "D", text: "Digital automation" }], a: "B", exp: "Đoạn 3: 'introduction of Boulton & Watt rotative steam engines in the 1790s'." },
        { q: "What nickname was given to Manchester due to its cotton mill concentration?", opts: [{ key: "A", text: "Steel City" }, { key: "B", text: "Cottonopolis" }, { key: "C", text: "The Smoke Capital" }, { key: "D", text: "Textile Haven" }], a: "B", exp: "Đoạn 3: 'Manchester—subsequently dubbed Cottonopolis'." },
        { q: "What community facilities did paternalistic mill owners construct at Belper and Milford?", opts: [{ key: "A", text: "Casinos and racetracks" }, { key: "B", text: "Churches, schools, and cooperative bakeries" }, { key: "C", text: "Military barracks" }, { key: "D", text: "Prisons and workhouses only" }], a: "B", exp: "Đoạn 3: 'churches, schools, and cooperative bakeries, to attract and retain skilled labor families'." },
        { q: "What is the modern conservation designation of the Derwent Valley mills?", opts: [{ key: "A", text: "National Defense Monument" }, { key: "B", text: "UNESCO World Heritage Site" }, { key: "C", text: "Commercial Industrial Free Zone" }, { key: "D", text: "Private Research Laboratory" }], a: "B", exp: "Đoạn 4: 'Derwent Valley Mills World Heritage Site'." },
        { q: "What was the consequence of steam power on mill location?", opts: [{ key: "A", text: "Mills were forced into mountainous areas" }, { key: "B", text: "Mills were liberated from river valleys, enabling urban concentration" }, { key: "C", text: "Mills had to be built near seashores exclusively" }, { key: "D", text: "Textile production declined sharply" }], a: "B", exp: "Đoạn 3: 'liberated mills from geographical dependency on fast-flowing river valleys'." },
        { q: "What is the academic field that examines these physical historic structures?", opts: [{ key: "A", text: "Paleontology" }, { key: "B", text: "Industrial Archaeology" }, { key: "C", text: "Urban Meteorology" }, { key: "D", text: "Theoretical Physics" }], a: "B", exp: "Đoạn 1: 'Industrial archaeologists studying the structural remains'." },
        { q: "In what century did this textile transformation primarily occur?", opts: [{ key: "A", text: "Sixteenth century" }, { key: "B", text: "Late eighteenth and early nineteenth centuries" }, { key: "C", text: "Mid-twentieth century" }, { key: "D", text: "Twenty-first century" }], a: "B", exp: "Đoạn 1: 'Industrial Revolution of the late eighteenth and early nineteenth centuries'." },
        { q: "What was the overarching legacy of the Derwent Valley mills?", opts: [{ key: "A", text: "They were a failed experiment in mechanization" }, { key: "B", text: "They served as the universal archetype for the modern factory system" }, { key: "C", text: "They prevented urbanization in England" }, { key: "D", text: "They were immediately replaced by cottage workshops" }], a: "B", exp: "Đoạn 2: 'served as the universal archetype for the modern factory system'." }
      ];

      p3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 67}`,
          partNumber: 7,
          partTitle: "Reading Passage 3: Industrial Textile Archaeology",
          section: "READING",
          passageText: readPassage3,
          questionText: `Question ${idx + 67}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // IELTS SPEAKING AI (Q81 - Q83: 3 PARTS)
      qs.push({
        id: "ia4k_q81",
        partNumber: 8,
        partTitle: "IELTS Speaking Part 1: Introduction & Interview",
        section: "SPEAKING",
        speakingPrompt: "Let's talk about environmental protection and sustainability. 1. Do you recycle household waste regularly? 2. What environmental changes have you noticed in your hometown over recent years? 3. Do you think individuals can make a meaningful difference in reducing plastic pollution? Answer naturally with extended sentences.",
        preparationTimeSeconds: 15,
        speakingTimeSeconds: 60,
        questionText: "Question 81 (Speaking Part 1): Answer interview questions on environmental habits (4-5 extended sentences).",
        options: [
          { key: "A", text: "Record 60-Second Interview Response" },
          { key: "B", text: "View IELTS Band 9 lexical collocations" },
          { key: "C", text: "Listen to native examiner question" },
          { key: "D", text: "Skip to Cue Card" }
        ],
        correctAnswer: "A",
        explanation: "Tiêu chí chấm Cambridge Band 8.0+: Trả lời trực tiếp, mở rộng lý do ('For instance, my municipality implemented a color-coded sorting system...'), dùng từ vựng theo chủ đề ('biodegradable alternatives', 'carbon footprint')."
      });

      qs.push({
        id: "ia4k_q82",
        partNumber: 9,
        partTitle: "IELTS Speaking Part 2: Cue Card Long Turn",
        section: "SPEAKING",
        speakingPrompt: "Describe an environmental initiative or project you know about that helps improve your community.\nYou should say:\n• What the initiative is and who organized it\n• Where it took place\n• What actions were taken\nAnd explain how you feel about the impact of this project on your community.",
        preparationTimeSeconds: 60,
        speakingTimeSeconds: 120,
        questionText: "Question 82 (Speaking Part 2): Deliver a continuous 2-minute speech on the Cue Card prompt.",
        options: [
          { key: "A", text: "Record 2-Minute Speech" },
          { key: "B", text: "View 1-Minute Note-Taking Strategy" },
          { key: "C", text: "Listen to Band 9.0 Model Speech" },
          { key: "D", text: "Skip to Part 3" }
        ],
        correctAnswer: "A",
        explanation: "Dàn bài mẫu Band 9.0: 1. Giới thiệu ('I would like to talk about the Urban Canopy reforestation drive organized by our municipal youth council in downtown Hanoi...'). 2. Triển khai 4 ý cue card mạch lạc. 3. Kết luận đánh giá tác động lâu dài."
      });

      qs.push({
        id: "ia4k_q83",
        partNumber: 10,
        partTitle: "IELTS Speaking Part 3: Two-Way Discussion",
        section: "SPEAKING",
        speakingPrompt: "Let's discuss environmental policy and global cooperation. 1. Should national governments enact legally binding legislation requiring corporations to achieve net-zero carbon emissions, or should compliance be voluntary? 2. How can international organizations balance economic growth in developing nations with strict environmental conservation targets?",
        preparationTimeSeconds: 20,
        speakingTimeSeconds: 90,
        questionText: "Question 83 (Speaking Part 3): Provide analytical, balanced arguments addressing global environmental policy.",
        options: [
          { key: "A", text: "Record 90-Second Discussion" },
          { key: "B", text: "View argumentative connectors & linking phrases" },
          { key: "C", text: "Review Band 9 abstract vocabulary" },
          { key: "D", text: "Skip to Writing Task 1" }
        ],
        correctAnswer: "A",
        explanation: "Tiêu chí chấm Part 3: Sử dụng cấu trúc câu phức, câu điều kiện loại 2/3, nhượng bộ ('While economic expansion is paramount for poverty alleviation, unchecked industrialization risks irreversible ecological degradation...')."
      });

      // IELTS WRITING AI (Q84 - Q85: TASK 1 & TASK 2)
      qs.push({
        id: "ia4k_q84",
        partNumber: 11,
        partTitle: "IELTS Writing Task 1: Academic Report (Visual Data)",
        section: "WRITING",
        writingPrompt: "The bar chart compares renewable energy generation (in Terawatt-hours, TWh) across four nations—Germany, China, the United States, and Brazil—between 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Suggested time: 20 minutes).",
        minWordCount: 150,
        sampleEssay: "The bar chart illustrates the volume of renewable electricity generated, measured in Terawatt-hours (TWh), across four distinct nations—Germany, China, the United States, and Brazil—over a ten-year timeframe spanning from 2015 to 2025.\n\nOverall, renewable energy output witnessed an upward trajectory in all four surveyed countries throughout the decade. China established an overwhelming dominance by generating the highest volume by a substantial margin, whereas Germany recorded the lowest absolute generation figures despite steady expansion.\n\nIn 2015, China led the group with approximately 500 TWh of renewable electricity, followed by the United States at roughly 350 TWh. Brazil and Germany generated considerably smaller amounts, at 220 TWh and 140 TWh respectively. Over the subsequent decade, China experienced exponential growth, tripling its output to reach a staggering 1,500 TWh by 2025.\n\nThe United States also demonstrated robust growth, nearly doubling its generation to approximately 680 TWh in 2025. In contrast, Brazil's renewable production expanded moderately to 380 TWh, while Germany's output climbed to 290 TWh by the end of the period.",
        questionText: "Question 84 (Writing Task 1): Write an academic report summarizing renewable energy trends (min 150 words).",
        options: [
          { key: "A", text: "Submit Report for AI Band Evaluation" },
          { key: "B", text: "Check Task Achievement & Overview paragraph" },
          { key: "C", text: "Analyze data grouping & comparative structures" },
          { key: "D", text: "Skip to Task 2" }
        ],
        correctAnswer: "A",
        explanation: "Gemini AI chấm điểm 4 tiêu chí Cambridge: Task Achievement (Có đoạn Overview rõ ràng, nhóm số liệu hợp lý), Coherence & Cohesion (Dùng từ nối 'Overall', 'In contrast', 'whereas'), Lexical Resource (Từ vựng học thuật 'upward trajectory', 'exponential growth'), Grammatical Accuracy (Đa dạng cấu trúc phân từ, thì quá khứ hoàn chỉnh)."
      });

      qs.push({
        id: "ia4k_q85",
        partNumber: 12,
        partTitle: "IELTS Writing Task 2: Academic Discursive Essay",
        section: "WRITING",
        writingPrompt: "Some people argue that tertiary education should be fully funded by national governments and made accessible free of charge to all citizens. Others believe that university students should pay tuition fees because higher education primarily benefits the individual rather than society as a whole. Discuss both views and give your own opinion. (Write at least 250 words. Suggested time: 40 minutes).",
        minWordCount: 250,
        sampleEssay: "The question of whether university education should be entirely state-funded or financed through individual tuition fees remains a fiercely contested debate in contemporary socioeconomic policy. While proponents of fee-paying models argue that higher education primarily confers private economic returns upon graduates, I firmly advocate that universal, tuition-free tertiary education constitutes a vital public good that accelerates national prosperity and dismantles generational inequality.\n\nOn the one hand, advocates of tuition-based systems contend that higher education yields substantial private financial dividends. Empirically, university graduates command significantly higher lifetime earnings, lower unemployment rates, and greater career mobility compared to non-graduates. Consequently, critics argue that using general taxpayer revenues—contributed by all citizens, including working-class individuals who may not attend university—to subsidize degree programs represents an inequitable transfer of wealth. Furthermore, charging tuition ensures that academic institutions maintain financial autonomy and can invest in world-class research infrastructure and competitive faculty salaries.\n\nOn the other hand, universal free higher education generates profound societal externalities that far outweigh individual advantages. A highly educated workforce forms the bedrock of modern knowledge economies, driving innovation in medicine, engineering, scientific research, and technological development. When financial barriers to university admission are eradicated, meritocratic social mobility is democratized, enabling talented individuals from socioeconomically disadvantaged backgrounds to realize their potential without the debilitating burden of student loan debt. Countries such as Germany and Norway demonstrate that publicly funded higher education fosters robust technological competitiveness, civic engagement, and social cohesion.\n\nIn conclusion, while individual graduates undeniably reap private career benefits from tertiary degrees, the collective socioeconomic rewards of a universally educated populace are vastly superior. Governments should therefore treat higher education as a foundational public investment, ensuring that access is determined by intellectual aptitude rather than financial privilege.",
        questionText: "Question 85 (Writing Task 2): Write a comprehensive discursive essay (min 250 words) on state-funded versus tuition-based university education.",
        options: [
          { key: "A", text: "Submit Essay for AI Evaluation" },
          { key: "B", text: "Check 4-Paragraph Academic Structure" },
          { key: "C", text: "Review CEFR C2 academic vocabulary" },
          { key: "D", text: "Complete Full IELTS Exam" }
        ],
        correctAnswer: "A",
        explanation: "Bài luận Band 9.0 mẫu chuẩn Cambridge đáp ứng hoàn hảo: Mở bài nêu rõ cả 2 quan điểm + quan điểm cá nhân, 2 đoạn thân bài phân tích sâu sắc các chiều hướng kinh tế - xã hội, kết bài khẳng định giáo dục đại học là 'foundational public investment'."
      });

      return qs;
    })()
  },

  // ---------------------------------------------------------------------------
  // 5. IELTS SPEAKING AI STUDIO (3 FULL INTERACTIVE PARTS)
  // ---------------------------------------------------------------------------
  {
    id: "ielts_speaking_pro_01",
    title: "IELTS Speaking AI Studio #01",
    type: "IELTS_SPEAKING",
    level: "Advanced",
    timeLimitMinutes: 15,
    totalQuestions: 3,
    maxScore: 9.0,
    description: "Phòng thi IELTS Speaking 3 Part thời gian thực với WebRTC 0ms latency, chấm Fluency, Lexical, Grammar & Pronunciation Band 1.0 - 9.0.",
    categoryBadge: "IELTS Speaking",
    tags: ["IELTS", "Speaking AI", "Cue Card", "Band 8.0+", "WebRTC 0ms"],
    supportedSkills: ["SPEAKING"],
    questions: [
      {
        id: "isp1_q1",
        partNumber: 1,
        partTitle: "Part 1: Personal Interview — Technology & Daily Routines",
        section: "SPEAKING",
        speakingPrompt: "1. How much time do you spend using digital screens on a daily basis?\n2. What is your favorite smartphone application and why?\n3. Do you prefer reading physical printed books or digital e-books?\n4. How has technology changed the way people communicate in your country?",
        preparationTimeSeconds: 15,
        speakingTimeSeconds: 60,
        questionText: "Part 1: Answer four interview questions on technology habits naturally and fluently.",
        options: [
          { key: "A", text: "Record Part 1 Responses" },
          { key: "B", text: "Practice pronunciation drills" },
          { key: "C", text: "Review Band 8 lexical phrases" },
          { key: "D", text: "Skip to Cue Card" }
        ],
        correctAnswer: "A",
        explanation: "AI chấm 4 tiêu chí IELTS Speaking: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation."
      },
      {
        id: "isp1_q2",
        partNumber: 2,
        partTitle: "Part 2: Cue Card — A Significant Scientific Breakthrough",
        section: "SPEAKING",
        speakingPrompt: "Describe a scientific or technological breakthrough that has changed modern society.\nYou should say:\n• What the breakthrough is and when it occurred\n• How it functions\n• How it has impacted people's daily lives\nAnd explain whether you think its benefits outweigh its drawbacks.",
        preparationTimeSeconds: 60,
        speakingTimeSeconds: 120,
        questionText: "Part 2: Deliver a 2-minute speech on a transformative scientific discovery.",
        options: [
          { key: "A", text: "Record 2-Minute Speech" },
          { key: "B", text: "View 1-Minute Note-Taking Template" },
          { key: "C", text: "Listen to Band 9.0 Model Sample" },
          { key: "D", text: "Skip to Part 3" }
        ],
        correctAnswer: "A",
        explanation: "Dàn ý mẫu: Đột phá Trí tuệ Nhân tạo tổng quát (Generative AI) hoặc Công nghệ Chỉnh sửa Gen CRISPR-Cas9, phân tích lợi ích y học vs đạo đức sinh học."
      },
      {
        id: "isp1_q3",
        partNumber: 3,
        partTitle: "Part 3: In-Depth Discussion — Artificial Intelligence & Ethics",
        section: "SPEAKING",
        speakingPrompt: "1. To what extent should governments regulate the rapid development of autonomous artificial intelligence systems?\n2. Do you believe artificial intelligence will lead to mass unemployment, or will it create entirely new categories of skilled labor?\n3. How can educators prevent students from becoming overly reliant on automated AI writing tools?",
        preparationTimeSeconds: 20,
        speakingTimeSeconds: 90,
        questionText: "Part 3: Analyze complex societal and ethical dilemmas surrounding autonomous technology.",
        options: [
          { key: "A", text: "Record Part 3 Analytical Speech" },
          { key: "B", text: "Review argumentative transitions" },
          { key: "C", text: "Check Band 9 academic vocabulary" },
          { key: "D", text: "Complete Speaking Test" }
        ],
        correctAnswer: "A",
        explanation: "Phát triển luận điểm đa chiều: Cân bằng giữa quản lý rủi ro công nghệ và khuyến khích đổi mới sáng tạo."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 6. IELTS WRITING AI STUDIO (TASK 1 & TASK 2 COMPREHENSIVE SUITE)
  // ---------------------------------------------------------------------------
  {
    id: "ielts_writing_master_01",
    title: "IELTS Academic Writing Task 1 & Task 2 #01",
    type: "IELTS_WRITING",
    level: "Advanced",
    timeLimitMinutes: 60,
    totalQuestions: 2,
    maxScore: 9.0,
    description: "Bộ thi chuyên sâu IELTS Writing Task 1 (Biểu đồ năng lượng tái tạo) & Task 2 (Bài luận Đại học Miễn phí) với Gemini AI chấm 4 tiêu chí chuẩn Cambridge.",
    categoryBadge: "IELTS Writing",
    tags: ["IELTS", "Writing AI", "Task 1", "Task 2", "Gemini Evaluator"],
    supportedSkills: ["WRITING"],
    questions: [
      {
        id: "iwm1_q1",
        partNumber: 1,
        partTitle: "Task 1: Academic Report — Renewable Energy Generation (2015-2025)",
        section: "WRITING",
        writingPrompt: "The bar chart below compares renewable electricity output (in Terawatt-hours, TWh) across Germany, China, the United States, and Brazil between 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Time suggested: 20 minutes).",
        minWordCount: 150,
        sampleEssay: "The bar chart illustrates the volume of renewable electricity generated, measured in Terawatt-hours (TWh), across four distinct nations—Germany, China, the United States, and Brazil—over a ten-year timeframe spanning from 2015 to 2025.\n\nOverall, renewable energy output witnessed an upward trajectory in all four surveyed countries throughout the decade. China established an overwhelming dominance by generating the highest volume by a substantial margin, whereas Germany recorded the lowest absolute generation figures despite steady expansion.\n\nIn 2015, China led the group with approximately 500 TWh of renewable electricity, followed by the United States at roughly 350 TWh. Brazil and Germany generated considerably smaller amounts, at 220 TWh and 140 TWh respectively. Over the subsequent decade, China experienced exponential growth, tripling its output to reach a staggering 1,500 TWh by 2025.\n\nThe United States also demonstrated robust growth, nearly doubling its generation to approximately 680 TWh in 2025. In contrast, Brazil's renewable production expanded moderately to 380 TWh, while Germany's output climbed to 290 TWh by the end of the period.",
        questionText: "Task 1: Write an academic report summarizing renewable energy generation data (min 150 words).",
        options: [
          { key: "A", text: "Submit Task 1 Report" },
          { key: "B", text: "Check Task 1 Checklist" },
          { key: "C", text: "Review Band 9 Lexical Resource" },
          { key: "D", text: "Skip to Task 2" }
        ],
        correctAnswer: "A",
        explanation: "AI chấm 4 tiêu chí Cambridge: Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range."
      },
      {
        id: "iwm1_q2",
        partNumber: 2,
        partTitle: "Task 2: Academic Essay — Free Higher Education vs Tuition Fees",
        section: "WRITING",
        writingPrompt: "Some people argue that tertiary education should be fully funded by national governments and made accessible free of charge to all citizens. Others believe that university students should pay tuition fees because higher education primarily benefits the individual rather than society as a whole. Discuss both views and give your own opinion. (Write at least 250 words. Time suggested: 40 minutes).",
        minWordCount: 250,
        sampleEssay: "The question of whether university education should be entirely state-funded or financed through individual tuition fees remains a fiercely contested debate in contemporary socioeconomic policy. While proponents of fee-paying models argue that higher education primarily confers private economic returns upon graduates, I firmly advocate that universal, tuition-free tertiary education constitutes a vital public good that accelerates national prosperity and dismantles generational inequality.\n\nOn the one hand, advocates of tuition-based systems contend that higher education yields substantial private financial dividends. Empirically, university graduates command significantly higher lifetime earnings, lower unemployment rates, and greater career mobility compared to non-graduates. Consequently, critics argue that using general taxpayer revenues—contributed by all citizens, including working-class individuals who may not attend university—to subsidize degree programs represents an inequitable transfer of wealth. Furthermore, charging tuition ensures that academic institutions maintain financial autonomy and can invest in world-class research infrastructure and competitive faculty salaries.\n\nOn the other hand, universal free higher education generates profound societal externalities that far outweigh individual advantages. A highly educated workforce forms the bedrock of modern knowledge economies, driving innovation in medicine, engineering, scientific research, and technological development. When financial barriers to university admission are eradicated, meritocratic social mobility is democratized, enabling talented individuals from socioeconomically disadvantaged backgrounds to realize their potential without the debilitating burden of student loan debt. Countries such as Germany and Norway demonstrate that publicly funded higher education fosters robust technological competitiveness, civic engagement, and social cohesion.\n\nIn conclusion, while individual graduates undeniably reap private career benefits from tertiary degrees, the collective socioeconomic rewards of a universally educated populace are vastly superior. Governments should therefore treat higher education as a foundational public investment, ensuring that access is determined by intellectual aptitude rather than financial privilege.",
        questionText: "Task 2: Write a 250+ word discursive essay analyzing state-funded versus tuition-based university education.",
        options: [
          { key: "A", text: "Submit Task 2 Essay for AI Scoring" },
          { key: "B", text: "Review Essay Cohesion & Transitions" },
          { key: "C", text: "Check CEFR C2 Academic Collocations" },
          { key: "D", text: "Complete Writing Test" }
        ],
        correctAnswer: "A",
        explanation: "Bài luận Band 9.0 mẫu chuẩn Cambridge với phân tích đa chiều, từ vựng C2 và lập luận chặt chẽ."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 7. IELTS ACADEMIC OFFICIAL TEST #02 (85 AUTHENTIC QUESTIONS - BAND 9.0)
  // ---------------------------------------------------------------------------
  {
    id: "ielts_academic_4k_02",
    title: "IELTS Academic Official Test #02 (4-Skills)",
    type: "IELTS_FULL",
    level: "Advanced",
    timeLimitMinutes: 175,
    totalQuestions: 85,
    maxScore: 9.0,
    description: "Bộ đề thi IELTS Academic Test #02 chuẩn Cambridge gồm 40 câu Listening, 40 câu Reading, Speaking AI 3 Part và 2 Writing Tasks.",
    categoryBadge: "IELTS Academic",
    tags: ["IELTS", "Cambridge", "Test 02", "Academic", "Band 9.0 Standard"],
    supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
    questions: (() => {
      const qs: ExamQuestion[] = [];

      // SECTION 1: Community Sports Center Membership Registration (Q1 - Q10)
      const sec1Script = "Staff: Good morning, Westside Community Sports Complex. How may I assist you today?\nCustomer: Hello, I recently moved to the district and would like to inquire about enrolling in an annual fitness membership.\nStaff: Welcome! Let me record your registration details. What is your full legal name?\nCustomer: My name is Claire Thornton.\nStaff: Claire Thornton. And your contact telephone number?\nCustomer: It's 07700 900421.\nStaff: Thank you. Which membership tier are you interested in: Gold All-Access, Silver Gym & Pool, or Off-Peak Daytime?\nCustomer: I would like the Gold All-Access tier, which includes the Olympic swimming pool, tennis courts, and fitness classes.\nStaff: Excellent. The monthly fee for Gold All-Access is 65 pounds, with no contract lock-in. We are currently running a promotion where the 30-pound initial induction fee is completely waived if you sign up before Friday.\nCustomer: That's great! Are lockers provided in the changing rooms?\nStaff: Yes, digital keycard lockers are complimentary. Induction tours run daily at 10:00 AM and 4:00 PM.\nCustomer: Wonderful, I will attend the 10:00 AM session tomorrow.";

      const sec1Questions = [
        { q: "What is the customer's full name?", opts: [{ key: "A", text: "Claire Thornton" }, { key: "B", text: "Sarah Mitchell" }, { key: "C", text: "Eleanor Rossi" }, { key: "D", text: "Laura Campbell" }], a: "A", exp: "Họ tên: 'My name is Claire Thornton'." },
        { q: "What is Claire's telephone contact number?", opts: [{ key: "A", text: "07700 900421" }, { key: "B", text: "07700 800312" }, { key: "C", text: "07700 552100" }, { key: "D", text: "07700 123456" }], a: "A", exp: "Số điện thoại: 'It's 07700 900421'." },
        { q: "Which membership tier did Claire select?", opts: [{ key: "A", text: "Bronze Basic" }, { key: "B", text: "Silver Gym & Pool" }, { key: "C", text: "Gold All-Access" }, { key: "D", text: "Off-Peak Daytime" }], a: "C", exp: "Gói tập: 'Gold All-Access tier'." },
        { q: "How much is the monthly fee for the Gold tier?", opts: [{ key: "A", text: "45 pounds" }, { key: "B", text: "55 pounds" }, { key: "C", text: "65 pounds" }, { key: "D", text: "85 pounds" }], a: "C", exp: "Học phí hàng tháng: 'monthly fee for Gold All-Access is 65 pounds'." },
        { q: "What fee is waived if she joins before Friday?", opts: [{ key: "A", text: "Monthly membership fee" }, { key: "B", text: "The 30-pound initial induction fee" }, { key: "C", text: "Locker rental charge" }, { key: "D", text: "Parking pass fee" }], a: "B", exp: "Phí được miễn: '30-pound initial induction fee is completely waived'." },
        { q: "What facilities are included in Gold All-Access?", opts: [{ key: "A", text: "Pool, tennis courts, and fitness classes" }, { key: "B", text: "Sauna and golf course only" }, { key: "C", text: "Gym floor only" }, { key: "D", text: "Personal trainer 5 times a week" }], a: "A", exp: "Tiện ích: 'Olympic swimming pool, tennis courts, and fitness classes'." },
        { q: "How do lockers operate in the changing rooms?", opts: [{ key: "A", text: "Coin padlocks" }, { key: "B", text: "Digital keycard lockers" }, { key: "C", text: "Combination dial locks" }, { key: "D", text: "Manual brass keys" }], a: "B", exp: "Tủ đồ: 'digital keycard lockers are complimentary'." },
        { q: "When do facility induction tours take place daily?", opts: [{ key: "A", text: "8:00 AM and 12:00 PM" }, { key: "B", text: "10:00 AM and 4:00 PM" }, { key: "C", text: "1:00 PM and 6:00 PM" }, { key: "D", text: "Every hour on the hour" }], a: "B", exp: "Giờ tham quan hướng dẫn: 'daily at 10:00 AM and 4:00 PM'." },
        { q: "Which induction tour session will Claire attend?", opts: [{ key: "A", text: "10:00 AM tomorrow" }, { key: "B", text: "4:00 PM tomorrow" }, { key: "C", text: "Friday morning" }, { key: "D", text: "Saturday afternoon" }], a: "A", exp: "Phiên tham dự: 'attend the 10:00 AM session tomorrow'." },
        { q: "Is there a long-term contract requirement?", opts: [{ key: "A", text: "Yes, 12-month minimum" }, { key: "B", text: "Yes, 24-month agreement" }, { key: "C", text: "No contract lock-in" }, { key: "D", text: "Requires a 6-month prepayment" }], a: "C", exp: "Hợp đồng: 'with no contract lock-in'." }
      ];

      sec1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 1}`,
          partNumber: 1,
          partTitle: "Listening Section 1: Sports Center Membership",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
          questionText: `Question ${idx + 1}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 2: Maritime Museum Audio Tour (Q11 - Q20)
      const sec2Script = "Curator: Welcome to the Maritime Heritage Museum of Portsmouth. I am Dr. Julian Thorne, Chief Curator. Today, we are opening our newly restored exhibition wing dedicated to eighteenth-century oceanic navigation. The central artifact in Gallery 1 is the original 1761 marine chronometer crafted by clockmaker John Harrison, which solved the longitude determination problem at sea. In Gallery 2, visitors can explore the reconstructed wooden galley of the HMS Endurance, featuring interactive touch displays showing sailor rations and nautical knots. The children's shipbuilding workshop is located in the South Pavilion. Please note that the open-air lighthouse viewing deck is closed today due to high coastal gale warnings. Audio headsets are available at the entrance in six languages for 3 pounds. The museum cafe on Floor 2 serves seafood lunches from 11:30 AM to 2:30 PM.";

      const sec2Questions = [
        { q: "Who crafted the 1761 marine chronometer displayed in Gallery 1?", opts: [{ key: "A", text: "James Watt" }, { key: "B", text: "John Harrison" }, { key: "C", text: "Arthur Pendelton" }, { key: "D", text: "Samuel Crompton" }], a: "B", exp: "Thợ đồng hồ chế tác: 'crafted by clockmaker John Harrison'." },
        { q: "What historical navigation problem did Harrison's chronometer solve?", opts: [{ key: "A", text: "Determining ship latitude" }, { key: "B", text: "Determining longitude at sea" }, { key: "C", text: "Measuring ocean depth" }, { key: "D", text: "Predicting stormy tides" }], a: "B", exp: "Vấn đề hàng hải: 'solved the longitude determination problem at sea'." },
        { q: "Which vessel's galley is reconstructed in Gallery 2?", opts: [{ key: "A", text: "HMS Victory" }, { key: "B", text: "HMS Endurance" }, { key: "C", text: "HMS Beagle" }, { key: "D", text: "HMS Discovery" }], a: "B", exp: "Tên tàu: 'reconstructed wooden galley of the HMS Endurance'." },
        { q: "Where is the children's shipbuilding workshop located?", opts: [{ key: "A", text: "Main Foyer" }, { key: "B", text: "South Pavilion" }, { key: "C", text: "Gallery 3" }, { key: "D", text: "Basement Lab" }], a: "B", exp: "Vị trí xưởng cho trẻ em: 'located in the South Pavilion'." },
        { q: "Why is the lighthouse viewing deck closed today?", opts: [{ key: "A", text: "Painting renovations" }, { key: "B", text: "High coastal gale warnings" }, { key: "C", text: "Lighting repairs" }, { key: "D", text: "Private VIP reception" }], a: "B", exp: "Lý do đóng cửa đài quan sát hải đăng: 'due to high coastal gale warnings'." },
        { q: "How much does audio guide rental cost?", opts: [{ key: "A", text: "1 pound" }, { key: "B", text: "3 pounds" }, { key: "C", text: "5 pounds" }, { key: "D", text: "Free" }], a: "B", exp: "Phí thuê tai nghe: 'available at the entrance in six languages for 3 pounds'." },
        { q: "Where is the museum cafe situated?", opts: [{ key: "A", text: "Ground Floor Foyer" }, { key: "B", text: "Floor 2" }, { key: "C", text: "Basement Pavilion" }, { key: "D", text: "South Courtyard" }], a: "B", exp: "Vị trí quán cafe: 'museum cafe on Floor 2'." },
        { q: "What are the cafe lunch operating hours?", opts: [{ key: "A", text: "10:00 AM - 1:00 PM" }, { key: "B", text: "11:30 AM - 2:30 PM" }, { key: "C", text: "12:00 PM - 3:00 PM" }, { key: "D", text: "All day until closing" }], a: "B", exp: "Giờ phục vụ ăn trưa: 'from 11:30 AM to 2:30 PM'." },
        { q: "What century does the featured exhibition wing focus on?", opts: [{ key: "A", text: "Sixteenth century" }, { key: "B", text: "Eighteenth century" }, { key: "C", text: "Nineteenth century" }, { key: "D", text: "Twentieth century" }], a: "B", exp: "Thế kỷ trọng tâm: 'eighteenth-century oceanic navigation'." },
        { q: "What is Dr. Julian Thorne's role?", opts: [{ key: "A", text: "Museum Security Chief" }, { key: "B", text: "Chief Curator" }, { key: "C", text: "Tour Bus Coordinator" }, { key: "D", text: "Gift Shop Manager" }], a: "B", exp: "Chức vụ: 'Dr. Julian Thorne, Chief Curator'." }
      ];

      sec2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 11}`,
          partNumber: 2,
          partTitle: "Listening Section 2: Maritime Museum Tour",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
          questionText: `Question ${idx + 11}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 3: Postgraduate Research on Urban Microclimate Heat Islands (Q21 - Q30)
      const sec3Script = "Supervisor: Good afternoon, Hannah and Oliver. Let's discuss your field study methodology for investigating urban heat islands across metropolitan London.\nHannah: Thank you, Dr. Watson. We have deployed thirty digital thermistor sensors across three distinct urban typology zones: high-density commercial skyscrapers in the City of London, mid-density residential brick terrace housing in Islington, and vegetative suburban parkland in Richmond.\nOliver: Our preliminary summer datasets indicate that surface temperatures in commercial high-rise corridors average 6.2 degrees Celsius higher at midnight compared to the baseline parkland in Richmond, primarily due to concrete thermal inertia and waste heat from air conditioning condensers.\nSupervisor: Those are striking figures. However, have you accounted for wind corridor effects along the Thames River?\nHannah: We installed five sonic anemometers along the riverbanks to calibrate our convective cooling models.\nSupervisor: Excellent. Be sure to submit your comparative geospatial regression analysis by December 1st.";

      const sec3Questions = [
        { q: "How many temperature sensors were deployed across London?", opts: [{ key: "A", text: "Ten sensors" }, { key: "B", text: "Twenty sensors" }, { key: "C", text: "Thirty sensors" }, { key: "D", text: "Fifty sensors" }], a: "C", exp: "Số lượng cảm biến: 'deployed thirty digital thermistor sensors'." },
        { q: "What are the three study typology zones?", opts: [{ key: "A", text: "Industrial, farming, and coastal" }, { key: "B", text: "Commercial skyscrapers, residential brick terraces, and suburban parkland" }, { key: "C", text: "Subways, airports, and train stations" }, { key: "D", text: "Shopping malls, parking lots, and schools" }], a: "B", exp: "3 khu vực: 'high-density commercial skyscrapers, residential brick terraces, and vegetative suburban parkland'." },
        { q: "How much hotter were commercial high-rise corridors at midnight compared to Richmond?", opts: [{ key: "A", text: "2.5 degrees Celsius" }, { key: "B", text: "4.0 degrees Celsius" }, { key: "C", text: "6.2 degrees Celsius" }, { key: "D", text: "8.5 degrees Celsius" }], a: "C", exp: "Chênh lệch nhiệt độ đêm: 'average 6.2 degrees Celsius higher at midnight'." },
        { q: "What two main factors caused this elevated heat retention?", opts: [{ key: "A", text: "Car exhaust and street lamps" }, { key: "B", text: "Concrete thermal inertia and AC condenser waste heat" }, { key: "C", text: "High pedestrian density and asphalt painting" }, { key: "D", text: "Underground subway train vibrations" }], a: "B", exp: "Nguyên nhân nhiệt: 'concrete thermal inertia and waste heat from air conditioning condensers'." },
        { q: "What riverfront environmental factor did Dr. Watson question?", opts: [{ key: "A", text: "River water salinity" }, { key: "B", text: "Wind corridor effects along the Thames River" }, { key: "C", text: "Tidal flood surges" }, { key: "D", text: "Boat engine emissions" }], a: "B", exp: "Yếu tố cần hiệu chỉnh: 'accounted for wind corridor effects along the Thames River'." },
        { q: "What instrument did the students install to measure wind vectors?", opts: [{ key: "A", text: "Barometers" }, { key: "B", text: "Sonic anemometers" }, { key: "C", text: "Laser Doppler radars" }, { key: "D", text: "Hydrometers" }], a: "B", exp: "Dụng cụ đo gió: 'installed five sonic anemometers along the riverbanks'." },
        { q: "How many anemometers were placed along the riverbanks?", opts: [{ key: "A", text: "Two" }, { key: "B", text: "Three" }, { key: "C", text: "Five" }, { key: "D", text: "Ten" }], a: "C", exp: "Số lượng máy đo gió: 'five sonic anemometers'." },
        { q: "What analytical method must be included in the final report?", opts: [{ key: "A", text: "Geospatial regression analysis" }, { key: "B", text: "Simple questionnaire survey" }, { key: "C", text: "Laboratory chemical titration" }, { key: "D", text: "DNA sequencing" }], a: "A", exp: "Phương pháp phân tích: 'comparative geospatial regression analysis'." },
        { q: "What is the project submission deadline?", opts: [{ key: "A", text: "November 15th" }, { key: "B", text: "December 1st" }, { key: "C", text: "December 15th" }, { key: "D", text: "January 10th" }], a: "B", exp: "Hạn nộp: 'submit your comparative geospatial regression analysis by December 1st'." },
        { q: "Which suburban area served as the baseline green reference?", opts: [{ key: "A", text: "Islington" }, { key: "B", text: "City of London" }, { key: "C", text: "Richmond parkland" }, { key: "D", text: "Greenwich" }], a: "C", exp: "Khu vực đối chứng xanh: 'baseline parkland in Richmond'." }
      ];

      sec3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 21}`,
          partNumber: 3,
          partTitle: "Listening Section 3: Urban Heat Islands",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
          passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
          questionText: `Question ${idx + 21}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 4: University Lecture on Behavioral Ecology of Cetacean Echolocation (Q31 - Q40)
      const sec4Script = "Lecturer: Good morning, class. Today's lecture explores the neurobiology and evolutionary biomechanics of biosonar and echolocation in odontocetes—the toothed whales, dolphins, and porpoises. Unlike terrestrial mammals that rely predominantly on optical vision, odontocetes inhabit turbid and aphotic marine environments where light attenuates rapidly within the first 200 meters of depth. To navigate and hunt pelagic prey, dolphins generate high-frequency ultrasonic clicks within their phonic lips, located in the nasal passages beneath the blowhole. These acoustic impulses, spanning frequencies between 40 and 150 kilohertz, are focused through the melon—a specialized lipid-rich acoustic lens on the forehead—into a directional acoustic beam. Returning echoes reflecting off prey are received through the fat-filled acoustic channels of the lower jaw and transmitted directly to the auditory bulla and auditory cortex. Anthropogenic ocean noise pollution, including military low-frequency sonar and maritime seismic airguns, disrupts this delicate echolocation system, frequently causing severe acoustic trauma and mass stranding events.";

      const sec4Questions = [
        { q: "What mammalian group possesses biosonar echolocation?", opts: [{ key: "A", text: "Baleen mysticetes" }, { key: "B", text: "Odontocetes (toothed whales, dolphins, porpoises)" }, { key: "C", text: "Marine pinnipeds (seals)" }, { key: "D", text: "Sirenians (manatees)" }], a: "B", exp: "Nhóm thú biển: 'odontocetes—the toothed whales, dolphins, and porpoises'." },
        { q: "Why is optical vision insufficient for deep-sea odontocetes?", opts: [{ key: "A", text: "They lack retinas" }, { key: "B", text: "Light attenuates rapidly in turbid/aphotic waters beyond 200m" }, { key: "C", text: "Their eyes are covered by thick scales" }, { key: "D", text: "They hunt exclusively in daylight surface waters" }], a: "B", exp: "Lý do thị giác bị hạn chế: 'light attenuates rapidly within the first 200 meters of depth'." },
        { q: "Where are ultrasonic clicks produced in dolphins?", opts: [{ key: "A", text: "In the vocal cords inside the throat" }, { key: "B", text: "In the phonic lips beneath the blowhole" }, { key: "C", text: "In the stomach cavity" }, { key: "D", text: "By slapping their tail flukes" }], a: "B", exp: "Nơi phát âm siêu âm: 'within their phonic lips, located in the nasal passages beneath the blowhole'." },
        { q: "What frequency range do dolphin echolocation clicks span?", opts: [{ key: "A", text: "1 to 5 kHz" }, { key: "B", text: "10 to 20 kHz" }, { key: "C", text: "40 to 150 kilohertz" }, { key: "D", text: "500 to 1000 kHz" }], a: "C", exp: "Tần số: 'frequencies between 40 and 150 kilohertz'." },
        { q: "What is the biological function of the 'melon' structure?", opts: [{ key: "A", text: "Digestive organ for fat storage" }, { key: "B", text: "Lipid-rich acoustic lens that focuses sound into a directional beam" }, { key: "C", text: "Buoyancy regulation float" }, { key: "D", text: "Protective helmet against shark bites" }], a: "B", exp: "Chức năng của melon: 'specialized lipid-rich acoustic lens on the forehead—into a directional acoustic beam'." },
        { q: "How are returning acoustic echoes received by the dolphin?", opts: [{ key: "A", text: "Through large external ears" }, { key: "B", text: "Through fat-filled acoustic channels in the lower jaw" }, { key: "C", text: "Through the skin of the pectoral fins" }, { key: "D", text: "Through the blowhole" }], a: "B", exp: "Cơ chế thu âm phản hồi: 'received through the fat-filled acoustic channels of the lower jaw'." },
        { q: "What human activities disrupt cetacean echolocation systems?", opts: [{ key: "A", text: "Plastic recycling and wind energy" }, { key: "B", text: "Military sonar and seismic airgun surveys" }, { key: "C", text: "Snorkeling and scuba diving" }, { key: "D", text: "Sailing regattas" }], a: "B", exp: "Ô nhiễm tiếng ồn nhân tạo: 'military low-frequency sonar and maritime seismic airguns'." },
        { q: "What severe ecological consequence results from sonar disruption?", opts: [{ key: "A", text: "Accelerated reproduction" }, { key: "B", text: "Acoustic trauma and mass stranding events" }, { key: "C", text: "Transition to freshwater lakes" }, { key: "D", text: "Loss of body pigmentation" }], a: "B", exp: "Hậu quả nghiêm trọng: 'acoustic trauma and mass stranding events'." },
        { q: "What part of the brain processes auditory echolocation signals?", opts: [{ key: "A", text: "Optic lobe" }, { key: "B", text: "Auditory cortex" }, { key: "C", text: "Olfactory bulb" }, { key: "D", text: "Spinal cord" }], a: "B", exp: "Vùng não xử lý: 'transmitted directly to the auditory bulla and auditory cortex'." },
        { q: "What is the primary scientific field of this lecture?", opts: [{ key: "A", text: "Industrial manufacturing" }, { key: "B", text: "Neurobiology and evolutionary marine biomechanics" }, { key: "C", text: "Atmospheric meteorology" }, { key: "D", text: "Quantum computing" }], a: "B", exp: "Chuyên ngành khoa học: 'neurobiology and evolutionary biomechanics of biosonar'." }
      ];

      sec4Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 31}`,
          partNumber: 4,
          partTitle: "Listening Section 4: Cetacean Echolocation",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
          passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
          questionText: `Question ${idx + 31}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // READING PASSAGE 1: Quantum Computing in Molecular Drug Discovery (Q41 - Q53: 13 Questions)
      const readP1 = `READING PASSAGE 1 — QUANTUM COMPUTING IN MOLECULAR DRUG DISCOVERY\n\nThe synthesis and clinical validation of novel pharmaceutical compounds has traditionally been one of the most resource-intensive endeavors in modern science, averaging 12 to 15 years and exceeding $2.6 billion per approved drug. A fundamental bottleneck in rational drug design lies in the sheer computational intractability of classical supercomputers when simulating quantum mechanical interactions among complex biomolecules. Because the electron orbitals of a single protein-ligand binding complex scale exponentially with atomic count, classical algorithms must rely on crude classical approximations, frequently failing to predict binding affinities or metabolic toxicity accurately.\n\nQuantum computing harnesses the principles of superposition and quantum entanglement to overcome these limitations. By utilizing quantum bits (qubits) capable of existing in simultaneous states of 0 and 1, quantum algorithms such as the Variational Quantum Eigensolver (VQE) can simulate the electronic wavefunctions of multi-atomic molecules with unprecedented precision. In 2025, researchers at the European Center for Quantum Biology demonstrated that a 128-logical-qubit quantum processor successfully mapped the catalytic active site of human coronavirus proteases in under four hours—a computation estimated to require 800 years on conventional silicon-based supercomputing clusters.\n\nFurthermore, quantum-assisted generative machine learning models are accelerating the de novo generation of synthetic small molecules tailored to fit complex oncological targets. Pharmaceutical giants including Novartis and Roche have established dedicated quantum computing divisions, forecasting a 50 percent compression in preclinical lead optimization timelines by 2030. However, substantial technical hurdles remain, notably quantum decoherence caused by thermal noise and the requirement for fault-tolerant surface code error correction operating near absolute zero (-273.15 degrees Celsius).`;

      const r1Questions = [
        { q: "What is the average development cost for a single approved drug using traditional methods?", opts: [{ key: "A", text: "$500 million" }, { key: "B", text: "$1.2 billion" }, { key: "C", text: "Exceeding $2.6 billion" }, { key: "D", text: "$5.0 billion" }], a: "C", exp: "Đoạn 1: 'exceeding $2.6 billion per approved drug'." },
        { q: "How long does traditional clinical drug development typically take?", opts: [{ key: "A", text: "3 to 5 years" }, { key: "B", text: "6 to 8 years" }, { key: "C", text: "12 to 15 years" }, { key: "D", text: "20 to 25 years" }], a: "C", exp: "Đoạn 1: 'averaging 12 to 15 years'." },
        { q: "Why do classical supercomputers struggle with molecular simulation?", opts: [{ key: "A", text: "Lack of electrical power" }, { key: "B", text: "Electron orbital quantum interactions scale exponentially with atomic count" }, { key: "C", text: "Inability to read digital files" }, { key: "D", text: "Shortage of computer monitors" }], a: "B", exp: "Đoạn 1: 'electron orbitals of a single protein-ligand binding complex scale exponentially with atomic count'." },
        { q: "What two quantum physics principles enable quantum computational advantages?", opts: [{ key: "A", text: "Gravity and magnetic friction" }, { key: "B", text: "Superposition and quantum entanglement" }, { key: "C", text: "Thermodynamic convection and radiation" }, { key: "D", text: "Centrifugal force and inertia" }], a: "B", exp: "Đoạn 2: 'harnesses the principles of superposition and quantum entanglement'." },
        { q: "What algorithm is mentioned for molecular electronic wavefunction simulation?", opts: [{ key: "A", text: "Dijkstra's Shortest Path" }, { key: "B", text: "Variational Quantum Eigensolver (VQE)" }, { key: "C", text: "Binary Search Tree" }, { key: "D", text: "QuickSort Algorithm" }], a: "B", exp: "Đoạn 2: 'Variational Quantum Eigensolver (VQE)'." },
        { q: "How long did the 128-qubit processor take to map the protease active site?", opts: [{ key: "A", text: "Four minutes" }, { key: "B", text: "Under four hours" }, { key: "C", text: "Four days" }, { key: "D", text: "Four weeks" }], a: "B", exp: "Đoạn 2: 'mapped the catalytic active site... in under four hours'." },
        { q: "How long would the same computation take on a classical supercomputer cluster?", opts: [{ key: "A", text: "10 years" }, { key: "B", text: "50 years" }, { key: "C", text: "100 years" }, { key: "D", text: "800 years" }], a: "D", exp: "Đoạn 2: 'estimated to require 800 years on conventional silicon-based supercomputing clusters'." },
        { q: "What reduction in preclinical lead optimization timelines is forecasted by 2030?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "25 percent" }, { key: "C", text: "50 percent compression" }, { key: "D", text: "90 percent" }], a: "C", exp: "Đoạn 3: 'forecasting a 50 percent compression in preclinical lead optimization timelines'." },
        { q: "What physical operating temperature is required for current superconducting quantum chips?", opts: [{ key: "A", text: "Room temperature (25°C)" }, { key: "B", text: "Freezing point (0°C)" }, { key: "C", text: "Near absolute zero (-273.15°C)" }, { key: "D", text: "-50°C" }], a: "C", exp: "Đoạn 3: 'operating near absolute zero (-273.15 degrees Celsius)'." },
        { q: "What primary technical challenge is caused by thermal environmental noise?", opts: [{ key: "A", text: "Battery explosion" }, { key: "B", text: "Quantum decoherence" }, { key: "C", text: "Screen flicker" }, { key: "D", text: "Software virus infection" }], a: "B", exp: "Đoạn 3: 'quantum decoherence caused by thermal noise'." },
        { q: "What is de novo molecular design?", opts: [{ key: "A", text: "Extracting herbal teas from wild plants" }, { key: "B", text: "Designing entirely new synthetic molecules from computational scratch" }, { key: "C", text: "Copying expired generic patents" }, { key: "D", text: "Testing cosmetics on animal skin" }], a: "B", exp: "Đoạn 3: Thiết kế cấu trúc phân tử nhân tạo mới từ đầu để vừa khít thụ thể bệnh." },
        { q: "Which two pharmaceutical corporations are cited as leaders in quantum division setup?", opts: [{ key: "A", text: "Novartis and Roche" }, { key: "B", text: "Pfizer and Moderna" }, { key: "C", text: "AstraZeneca and Bayer" }, { key: "D", text: "Johnson & Johnson and Merck" }], a: "A", exp: "Đoạn 3: 'Pharmaceutical giants including Novartis and Roche'." },
        { q: "What is the overall tone of the article?", opts: [{ key: "A", text: "Skeptical and dismissive" }, { key: "B", text: "Scientific, enthusiastic yet grounded in technical realities" }, { key: "C", text: "Commercially sensational" }, { key: "D", text: "Strictly historical" }], a: "B", exp: "Văn phong học thuật, lạc quan về triển vọng nhưng chỉ rõ rào cản kỹ thuật." }
      ];

      r1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 41}`,
          partNumber: 5,
          partTitle: "Reading Passage 1: Quantum Drug Discovery",
          section: "READING",
          passageText: readP1,
          questionText: `Question ${idx + 41}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // READING PASSAGE 2 & 3 + SPEAKING & WRITING for Test #02
      // PASSAGE 2: Gothic Cathedral Engineering (Q54 - Q66: 13 Questions)
      const readP2 = `READING PASSAGE 2 — THE STRUCTURAL ARCHITECTURE OF GOTHIC CATHEDRALS\n\nThe transition from Romanesque to Gothic architecture in twelfth-century northern France represented one of the most audacious structural engineering achievements in human history. Master builders sought to transcend the massive, fortress-like stone walls and dim interiors of Romanesque basilicas, striving instead for soaring verticality and walls dissolved into expansive, luminous stained-glass clerestories.\n\nThis architectural revolution was made possible by three interdependent structural innovations: the pointed arch, the ribbed vault, and the external flying buttress. The pointed arch distributed compressive gravity loads more vertically than semicircular Roman arches, dramatically reducing outward lateral thrust. The quadripartite and sexpartite ribbed vault acted as a skeletal stone framework that channeled the deadweight of ceiling masonry onto discrete structural piers rather than continuous supporting walls.\n\nHowever, as cathedral vaults reached dizzying heights—such as 37 meters at Chartres and 48 meters at Beauvais—the remaining lateral wind and vault thrusts threatened catastrophic outward wall buckling. The flying buttress resolved this by bridging high-altitude lateral forces outward across open air to massive exterior masonry piers anchored away from the building. Laser scanning of Notre-Dame de Paris has revealed how medieval masons pre-tensioned these buttresses with decorative stone pinnacles, whose vertical weight stabilized the structural vector downward into the foundation.`;

      const r2Questions = [
        { q: "Where did the Gothic architectural transition originate in the 12th century?", opts: [{ key: "A", text: "Northern France" }, { key: "B", text: "Southern Italy" }, { key: "C", text: "Eastern Germany" }, { key: "D", text: "Central Spain" }], a: "A", exp: "Đoạn 1: 'twelfth-century northern France'." },
        { q: "What visual effect did Gothic master builders seek to achieve?", opts: [{ key: "A", text: "Low, dark underground tombs" }, { key: "B", text: "Soaring verticality and luminous stained-glass clerestories" }, { key: "C", text: "Heavy, windowless military fortresses" }, { key: "D", text: "Spherical domed ceilings" }], a: "B", exp: "Đoạn 1: 'striving instead for soaring verticality and walls dissolved into expansive, luminous stained-glass clerestories'." },
        { q: "What are the three core structural innovations of Gothic architecture?", opts: [{ key: "A", text: "Steel beams, concrete slabs, and elevators" }, { key: "B", text: "Pointed arch, ribbed vault, and external flying buttress" }, { key: "C", text: "Doric columns, wooden rafters, and brick domes" }, { key: "D", text: "Suspension cables, arches, and glass pyramids" }], a: "B", exp: "Đoạn 2: 'pointed arch, the ribbed vault, and the external flying buttress'." },
        { q: "Why was the pointed arch superior to the semicircular Roman arch?", opts: [{ key: "A", text: "It used less stone" }, { key: "B", text: "It distributed loads more vertically, reducing lateral outward thrust" }, { key: "C", text: "It was easier to paint with frescoes" }, { key: "D", text: "It prevented rainwater leakage" }], a: "B", exp: "Đoạn 2: 'distributed compressive gravity loads more vertically... reducing outward lateral thrust'." },
        { q: "What was the function of the ribbed vault?", opts: [{ key: "A", text: "Channeled ceiling weight onto discrete piers rather than continuous walls" }, { key: "B", text: "Served as a rainwater drainage channel" }, { key: "C", text: "Stored holy relics" }, { key: "D", text: "Acted as an organ sound chamber" }], a: "A", exp: "Đoạn 2: 'channeled the deadweight of ceiling masonry onto discrete structural piers'." },
        { q: "What vault height was achieved at Beauvais Cathedral?", opts: [{ key: "A", text: "25 meters" }, { key: "B", text: "37 meters" }, { key: "C", text: "48 meters" }, { key: "D", text: "75 meters" }], a: "C", exp: "Đoạn 3: '48 meters at Beauvais'." },
        { q: "How did the flying buttress prevent high walls from buckling?", opts: [{ key: "A", text: "By tying walls with iron chains" }, { key: "B", text: "By bridging lateral forces across open air to external masonry piers" }, { key: "C", text: "By burying the walls underground" }, { key: "D", text: "By using wooden scaffolding permanently" }], a: "B", exp: "Đoạn 3: 'bridging high-altitude lateral forces outward across open air to massive exterior masonry piers'." },
        { q: "What was the structural purpose of decorative stone pinnacles on buttresses?", opts: [{ key: "A", text: "Lightning rod grounding" }, { key: "B", text: "Added vertical deadweight to stabilize force vectors downward" }, { key: "C", text: "Nesting towers for carrier pigeons" }, { key: "D", text: "Clock towers for prayer bells" }], a: "B", exp: "Đoạn 3: 'pre-tensioned these buttresses with decorative stone pinnacles, whose vertical weight stabilized the structural vector downward'." },
        { q: "What modern technology was used to study Notre-Dame's structural engineering?", opts: [{ key: "A", text: "Sonar ultrasound" }, { key: "B", text: "3D Laser scanning" }, { key: "C", text: "Satellite thermal photography" }, { key: "D", text: "Chemical core drilling" }], a: "B", exp: "Đoạn 3: 'Laser scanning of Notre-Dame de Paris has revealed'." },
        { q: "What architectural style preceded Gothic architecture?", opts: [{ key: "A", text: "Baroque" }, { key: "B", text: "Romanesque" }, { key: "C", text: "Neoclassical" }, { key: "D", text: "Modernist" }], a: "B", exp: "Đoạn 1: 'transition from Romanesque to Gothic architecture'." },
        { q: "What is a 'clerestory' in Gothic cathedral architecture?", opts: [{ key: "A", text: "Underground burial crypt" }, { key: "B", text: "High upper wall level containing stained-glass windows" }, { key: "C", text: "Priest's residential quarters" }, { key: "D", text: "Bell tower staircase" }], a: "B", exp: "Đoạn 1: Tầng tường cao trên cùng bố trí các ô cửa sổ kính màu lớn lấy ánh sáng." },
        { q: "What was the structural risk as cathedrals became taller?", opts: [{ key: "A", text: "Foundation liquefaction" }, { key: "B", text: "Outward wall buckling under wind and vault thrusts" }, { key: "C", text: "Roof freezing in winter" }, { key: "D", text: "Timber rot in the basement" }], a: "B", exp: "Đoạn 3: 'wind and vault thrusts threatened catastrophic outward wall buckling'." },
        { q: "What is the primary conclusion regarding medieval master masons?", opts: [{ key: "A", text: "They worked purely by random trial without calculation" }, { key: "B", text: "They possessed sophisticated empirical understanding of static equilibrium and force vectors" }, { key: "C", text: "They strictly followed ancient Greek drawings without change" }, { key: "D", text: "Their buildings all collapsed within a few decades" }], a: "B", exp: "Kết luận: Thợ xây thời Trung cổ có hiểu biết thực nghiệm xuất sắc về cân bằng tĩnh và vector lực." }
      ];

      r2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 54}`,
          partNumber: 6,
          partTitle: "Reading Passage 2: Gothic Cathedral Engineering",
          section: "READING",
          passageText: readP2,
          questionText: `Question ${idx + 54}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // PASSAGE 3: Archaeology of the Silk Road Maritime Spice Trade (Q67 - Q80: 14 Questions)
      const readP3 = `READING PASSAGE 3 — THE MARITIME SILK ROAD AND ANCIENT SPICE COMMERCE\n\nWhile popular historical consciousness frequently associates the ancient Silk Road with overland camel caravans traversing the arid steppes of Central Asia, maritime archaeological excavations over the past three decades have illuminated an equally monumental seafaring trade network. Spanning over 15,000 nautical miles from the bustling ports of Guangzhou and Quanzhou in southern China, through the treacherous Strait of Malacca, across the Indian Ocean to the Persian Gulf and Red Sea, the Maritime Silk Road facilitated the mass transit of bulk ceramics, raw silk, aromatic frankincense, and precious spices between the Han Dynasty (206 BCE – 220 CE) and the late Ming Dynasty (1368–1644 CE).\n\nThe discovery and excavation of the ninth-century Belitung Shipwreck off the coast of Sumatra in 1998 provided indisputable physical evidence of direct, trans-oceanic commercial voyaging between the Tang Dynasty and the Abbasid Caliphate in Baghdad. The vessel—an Arab dhow constructed entirely of stitched teak timbers without a single iron nail—carried an extraordinary cargo of over 60,000 pristine ceramic bowls from the Changsha kilns, exquisite gold wine cups, and blue-and-white porcelain crafted with cobalt imported from Persia.\n\nOceanographic navigational prowess was fundamentally synchronized with the seasonal Indian Ocean monsoon gyres. Between November and March, the northeast monsoon propelled merchant fleets westward from Southeast Asia toward India and the Arabian Peninsula; conversely, the southwest monsoon from May to September carried vessels eastward back to the South China Sea. Maritime entrepôts such as the Sultanate of Malacca and Sriwijaya flourished as cosmopolitan transshipment hubs, enforcing maritime safety, establishing standardized customs tariffs, and fostering cultural syncretism across Buddhist, Hindu, and Islamic maritime communities.`;

      const r3Questions = [
        { q: "How long was the Maritime Silk Road trade network?", opts: [{ key: "A", text: "5,000 nautical miles" }, { key: "B", text: "10,000 nautical miles" }, { key: "C", text: "Over 15,000 nautical miles" }, { key: "D", text: "25,000 nautical miles" }], a: "C", exp: "Đoạn 1: 'Spanning over 15,000 nautical miles'." },
        { q: "Which Chinese ports were major starting points for the maritime spice trade?", opts: [{ key: "A", text: "Beijing and Xi'an" }, { key: "B", text: "Guangzhou and Quanzhou" }, { key: "C", text: "Shanghai and Tianjin" }, { key: "D", text: "Harbin and Dalian" }], a: "B", exp: "Đoạn 1: 'ports of Guangzhou and Quanzhou in southern China'." },
        { q: "What famous ninth-century shipwreck was excavated in 1998 off Sumatra?", opts: [{ key: "A", text: "The Titanic" }, { key: "B", text: "The Belitung Shipwreck" }, { key: "C", text: "The Mary Rose" }, { key: "D", text: "The Vasa" }], a: "B", exp: "Đoạn 2: 'Belitung Shipwreck off the coast of Sumatra in 1998'." },
        { q: "What was remarkable about the construction of the Belitung vessel?", opts: [{ key: "A", text: "It had a steel hull" }, { key: "B", text: "An Arab dhow built of stitched teak without a single iron nail" }, { key: "C", text: "It was powered by steam paddlewheels" }, { key: "D", text: "It was carved from a single hollowed tree trunk" }], a: "B", exp: "Đoạn 2: 'Arab dhow constructed entirely of stitched teak timbers without a single iron nail'." },
        { q: "How many Tang Dynasty ceramic bowls were recovered from the Belitung wreck?", opts: [{ key: "A", text: "6,000 bowls" }, { key: "B", text: "20,000 bowls" }, { key: "C", text: "Over 60,000 pristine ceramic bowls" }, { key: "D", text: "100,000 bowls" }], a: "C", exp: "Đoạn 2: 'cargo of over 60,000 pristine ceramic bowls from the Changsha kilns'." },
        { q: "Where was the cobalt used in Chinese blue-and-white porcelain imported from?", opts: [{ key: "A", text: "Japan" }, { key: "B", text: "Persia" }, { key: "C", text: "Egypt" }, { key: "D", text: "India" }], a: "B", exp: "Đoạn 2: 'cobalt imported from Persia'." },
        { q: "How did ancient mariners time their ocean voyages across the Indian Ocean?", opts: [{ key: "A", text: "Using diesel motors" }, { key: "B", text: "Synchronizing with seasonal monsoon wind gyres" }, { key: "C", text: "Following migratory whales exclusively" }, { key: "D", text: "Waiting for calm windless waters" }], a: "B", exp: "Đoạn 3: 'synchronized with the seasonal Indian Ocean monsoon gyres'." },
        { q: "Which monsoon winds carried merchant ships westward toward Arabia?", opts: [{ key: "A", text: "Northeast monsoon (November - March)" }, { key: "B", text: "Southwest monsoon (May - September)" }, { key: "C", text: "Pacific trade winds" }, { key: "D", text: "Polar easterlies" }], a: "A", exp: "Đoạn 3: 'Between November and March, the northeast monsoon propelled merchant fleets westward'." },
        { q: "Which kingdom served as a major maritime transshipment entrepôt in Southeast Asia?", opts: [{ key: "A", text: "The Roman Empire" }, { key: "B", text: "Sriwijaya and the Sultanate of Malacca" }, { key: "C", text: "The Aztec Empire" }, { key: "D", text: "The Viking Confederation" }], a: "B", exp: "Đoạn 3: 'Sultanate of Malacca and Sriwijaya flourished as cosmopolitan transshipment hubs'." },
        { q: "What cargo items were commonly traded along the route?", opts: [{ key: "A", text: "Ceramics, silk, frankincense, and spices" }, { key: "B", text: "Coal, iron ore, and crude oil" }, { key: "C", text: "Automobiles and electronics" }, { key: "D", text: "Paper currency exclusively" }], a: "A", exp: "Đoạn 1: 'bulk ceramics, raw silk, aromatic frankincense, and precious spices'." },
        { q: "Between which two historical powers did the Belitung trade voyage occur?", opts: [{ key: "A", text: "Roman Empire and Han Dynasty" }, { key: "B", text: "Tang Dynasty in China and Abbasid Caliphate in Baghdad" }, { key: "C", text: "British Empire and Qing Dynasty" }, { key: "D", text: "Mongol Empire and Ottoman Empire" }], a: "B", exp: "Đoạn 2: 'between the Tang Dynasty and the Abbasid Caliphate in Baghdad'." },
        { q: "What strategic strait connects the Indian Ocean with the South China Sea?", opts: [{ key: "A", text: "Strait of Gibraltar" }, { key: "B", text: "Strait of Malacca" }, { key: "C", text: "Bering Strait" }, { key: "D", text: "Bosphorus Strait" }], a: "B", exp: "Đoạn 1: 'through the treacherous Strait of Malacca'." },
        { q: "What was the cultural legacy of these ancient maritime hubs?", opts: [{ key: "A", text: "Total isolation of communities" }, { key: "B", text: "Cosmopolitan cultural syncretism across Buddhist, Hindu, and Islamic communities" }, { key: "C", text: "Universal enforcement of a single language" }, { key: "D", text: "Destruction of all local traditions" }], a: "B", exp: "Đoạn 3: 'fostering cultural syncretism across Buddhist, Hindu, and Islamic maritime communities'." },
        { q: "What is the primary significance of nautical archaeology for Silk Road history?", opts: [{ key: "A", text: "Proves that land routes were entirely fictitious" }, { key: "B", text: "Provides tangible physical evidence of large-scale maritime global commerce" }, { key: "C", text: "Reveals that ancient ships were made of concrete" }, { key: "D", text: "Shows that trade was limited to short coastal fishing trips" }], a: "B", exp: "Ý nghĩa: Cung cấp bằng chứng khảo cổ hiện vật thực tế về quy mô thương mại hàng hải toàn cầu thời cổ - trung đại." }
      ];

      r3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 67}`,
          partNumber: 7,
          partTitle: "Reading Passage 3: Maritime Silk Road",
          section: "READING",
          passageText: readP3,
          questionText: `Question ${idx + 67}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SPEAKING (Q81 - Q83)
      qs.push({
        id: "ia4k2_q81",
        partNumber: 8,
        partTitle: "IELTS Speaking Part 1: Architecture & Urban Living",
        section: "SPEAKING",
        speakingPrompt: "1. What kind of building do you live in? 2. Do you prefer historical traditional architecture or modern minimalist high-rises? 3. How important is natural parkland in urban cities?",
        preparationTimeSeconds: 15,
        speakingTimeSeconds: 60,
        questionText: "Question 81 (Speaking Part 1): Answer interview questions on architecture and urban spaces.",
        options: [{ key: "A", text: "Record 60-Second Speech" }, { key: "B", text: "Practice" }, { key: "C", text: "Model Audio" }, { key: "D", text: "Skip" }],
        correctAnswer: "A",
        explanation: "AI chấm 4 tiêu chí chuẩn IELTS Band 9.0."
      });

      qs.push({
        id: "ia4k2_q82",
        partNumber: 9,
        partTitle: "IELTS Speaking Part 2: Cue Card — An Impressive Historical Monument",
        section: "SPEAKING",
        speakingPrompt: "Describe a historical building or monument you have visited that impressed you.\nYou should say:\n• Where it is located and when you visited it\n• What its architectural features look like\n• Why it was constructed historically\nAnd explain why you found this building so memorable.",
        preparationTimeSeconds: 60,
        speakingTimeSeconds: 120,
        questionText: "Question 82 (Speaking Part 2): Deliver a 2-minute speech describing a historic architectural wonder.",
        options: [{ key: "A", text: "Record 2-Minute Speech" }, { key: "B", text: "Practice" }, { key: "C", text: "Model Audio" }, { key: "D", text: "Skip" }],
        correctAnswer: "A",
        explanation: "Mô tả kiến trúc, lịch sử, kỹ thuật xây dựng và cảm nhận cá nhân mạch lạc trong 2 phút."
      });

      qs.push({
        id: "ia4k2_q83",
        partNumber: 10,
        partTitle: "IELTS Speaking Part 3: Heritage Conservation vs Urban Development",
        section: "SPEAKING",
        speakingPrompt: "1. Should historic buildings be preserved at high public cost, or should they be demolished to make room for modern housing?\n2. How does architectural heritage shape national cultural identity?",
        preparationTimeSeconds: 20,
        speakingTimeSeconds: 90,
        questionText: "Question 83 (Speaking Part 3): Discuss historic preservation versus modern urban expansion.",
        options: [{ key: "A", text: "Record 90-Second Speech" }, { key: "B", text: "Practice" }, { key: "C", text: "Model Audio" }, { key: "D", text: "Skip" }],
        correctAnswer: "A",
        explanation: "Lập luận cân bằng giữa giá trị di sản văn hóa và nhu cầu phát triển kinh tế đô thị."
      });

      // WRITING (Q84 - Q85)
      qs.push({
        id: "ia4k2_q84",
        partNumber: 11,
        partTitle: "IELTS Writing Task 1: Academic Report (Process Diagram)",
        section: "WRITING",
        writingPrompt: "The diagram illustrates the industrial process of desalinating seawater using reverse osmosis technology to produce potable drinking water. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Time suggested: 20 minutes).",
        minWordCount: 150,
        sampleEssay: "The provided flow diagram delineates the sequential industrial stages involved in transforming raw saline seawater into purified potable drinking water through reverse osmosis desalination technology.\n\nOverall, the desalination process encompasses four principal phases: seawater intake and preliminary screening, high-pressure semi-permeable membrane filtration, post-treatment chemical remineralization, and distribution to municipal reservoirs, alongside the discharge of concentrated brine back into the ocean.\n\nIn the initial stage, raw ocean water is drawn through submerged intake pipes equipped with coarse mesh screens to remove large debris and marine organisms. The water then enters a flocculation chamber where chemical coagulants aggregate microscopic suspended solids, followed by sand bed filtration to eliminate particulate impurities.\n\nNext, the clarified saline water is pressurized by high-efficiency pumps to approximately 70 atmospheres before being forced through synthetic polyamide spiral-wound membranes. These membranes allow water molecules to permeate while rejecting 99.4% of dissolved salts. The resulting permeate undergoes pH stabilization and chlorine disinfection before entering city supply networks, while the hypersaline reject stream is safely dispersed through offshore underwater diffusers.",
        questionText: "Question 84 (Writing Task 1): Write an academic report explaining the reverse osmosis desalination process (min 150 words).",
        options: [{ key: "A", text: "Submit Task 1 Report" }, { key: "B", text: "Practice" }, { key: "C", text: "Vocabulary" }, { key: "D", text: "Skip" }],
        correctAnswer: "A",
        explanation: "AI chấm 4 tiêu chí chuẩn Cambridge: Mô tả tuần tự đầy đủ các bước của quy trình kỹ thuật, sử dụng thì hiện tại đơn bị động chính xác ('is drawn', 'is pressurized', 'is dispersed')."
      });

      qs.push({
        id: "ia4k2_q85",
        partNumber: 12,
        partTitle: "IELTS Writing Task 2: Academic Discursive Essay",
        section: "WRITING",
        writingPrompt: "With the rapid advancement of artificial intelligence and automated algorithms, some people believe that human artistic creativity—such as musical composition, painting, and creative writing—will soon become obsolete. To what extent do you agree or disagree with this view? (Write at least 250 words. Time suggested: 40 minutes).",
        minWordCount: 250,
        sampleEssay: "The exponential proliferation of generative artificial intelligence capable of producing symphonic music, photorealistic imagery, and literary prose has ignited profound philosophical anxiety regarding the obsolescence of human creative agency. While algorithmic systems demonstrate astonishing computational mimicry, I wholeheartedly disagree with the assertion that human artistic expression will ever be rendered obsolete, because authentic art is inextricably bound to lived human consciousness, emotional vulnerability, and socio-cultural context.\n\nAdmittedly, modern deep neural networks excel at synthesizing vast corpora of historical artistic data to produce aesthetically pleasing artifacts in seconds. In commercial design, film scoring, and content marketing, AI algorithms have already automated mundane creative tasks with superhuman speed. However, these mathematical models merely execute pattern recognition and probabilistic recombining of existing human works; they possess neither subjective intentionality, genuine emotional experience, nor conscious purpose. A generative algorithm can assemble a melancholic chord progression, but it has never experienced the visceral heartbreak, mortality awareness, or existential triumph that inspired Beethoven's late string quartets.\n\nFurthermore, the fundamental value of artistic engagement resides in the empathetic communion between human creator and human spectator. When audiences view a masterpiece like Van Gogh's 'The Starry Night' or read Tolstoy's 'War and Peace,' they are not merely evaluating visual harmony or linguistic grammar; they are participating in a sacred dialogue with another sentient being's psychological struggle and philosophical perception of reality. Artificial intelligence, devoid of biological embodiment and social identity, cannot replicate this profound existential resonance.\n\nIn conclusion, while artificial intelligence will undoubtedly persist as a powerful assistive instrument in creative workflows, it can never supplant the irreplaceable spark of human consciousness. Art is not merely a consumable product, but the definitive mirror of the human soul.",
        questionText: "Question 85 (Writing Task 2): Write an extensive philosophical opinion essay (min 250 words) on AI versus human artistic creativity.",
        options: [{ key: "A", text: "Submit Task 2 Essay for Band 9.0 Evaluation" }, { key: "B", text: "Review Band 9 Academic Structures" }, { key: "C", text: "Check Lexical Resource" }, { key: "D", text: "Complete Full Test" }],
        correctAnswer: "A",
        explanation: "Bài luận Band 9.0 mẫu chuẩn Cambridge với phân tích triết học sâu sắc, vốn từ vựng C2 phong phú ('computational mimicry', 'inextricably bound', 'subjective intentionality', 'visceral heartbreak')."
      });

      return qs;
    })()
  },

  // ---------------------------------------------------------------------------
  // 8. ETS TOEIC 2026 OFFICIAL TEST #03 (200 FULL UNIQUE QUESTIONS)
  // ---------------------------------------------------------------------------
  {
    id: "toeic_lr_2026_03",
    title: "ETS TOEIC 2026 Official Test #03",
    type: "TOEIC_FULL",
    level: "Advanced",
    timeLimitMinutes: 120,
    totalQuestions: 200,
    maxScore: 990,
    description: "Bộ đề thi chuẩn ETS 2026 Test #03 gồm 200 câu hỏi Nghe & Đọc chuyên sâu phân tích chi tiết.",
    categoryBadge: "TOEIC 990",
    tags: ["ETS 2026", "Test 03", "Full 200 Câu", "Chính Thức", "Độ Khó Cao"],
    supportedSkills: ["LISTENING", "READING"],
    questions: (() => {
      const qs: ExamQuestion[] = [];

      // PART 1: PHOTOGRAPHS (Q1 - Q6)
      const part1Photos = [
        {
          id: "tlr3_q1",
          imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          questionText: "Look at the picture marked No. 1 in your test book.",
          options: [
            { key: "A", text: "Team members are gathering around a laptop on a conference table." },
            { key: "B", text: "A presentation screen is being mounted onto the wall." },
            { key: "C", text: "Office chairs are being folded and stored in a closet." },
            { key: "D", text: "Coffee mugs are being placed on individual desks." }
          ],
          correctAnswer: "A" as const,
          explanation: "Các thành viên trong nhóm đang quây quần thảo luận quanh máy tính xách tay đặt trên bàn họp (`gathering around a laptop on a conference table`)."
        },
        {
          id: "tlr3_q2",
          imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          questionText: "Look at the picture marked No. 2 in your test book.",
          options: [
            { key: "A", text: "Construction workers are walking across a concrete slab." },
            { key: "B", text: "Engineers wearing safety helmets are reviewing architectural drawings." },
            { key: "C", text: "Scaffolding is being dismantled by a crane." },
            { key: "D", text: "Building materials are being loaded onto a cargo barge." }
          ],
          correctAnswer: "B" as const,
          explanation: "Các kỹ sư đội mũ bảo hộ đang cùng xem bản vẽ thiết kế công trình (`reviewing architectural drawings`)."
        },
        {
          id: "tlr3_q3",
          imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          questionText: "Look at the picture marked No. 3 in your test book.",
          options: [
            { key: "A", text: "A worker is stacking cardboard containers on heavy-duty shelving." },
            { key: "B", text: "Forklifts are parked in front of a loading bay door." },
            { key: "C", text: "A logistics specialist is driving a motorized pallet jack down an aisle." },
            { key: "D", text: "Pallets are being wrapped with plastic protective film." }
          ],
          correctAnswer: "C" as const,
          explanation: "Nhân viên kho vận đang điều khiển xe nâng hàng chạy dọc hành lang (`driving a motorized pallet jack down an aisle`)."
        },
        {
          id: "tlr3_q4",
          imageUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          questionText: "Look at the picture marked No. 4 in your test book.",
          options: [
            { key: "A", text: "Groceries are being arranged in refrigerated display cases." },
            { key: "B", text: "A customer is receiving a printed receipt at a service desk." },
            { key: "C", text: "A retail clerk is processing a transaction at a cash register." },
            { key: "D", text: "Shopping bags are being loaded into the trunk of a car." }
          ],
          correctAnswer: "C" as const,
          explanation: "Nhân viên thu ngân đang xử lý giao dịch thanh toán tại quầy (`processing a transaction at a cash register`)."
        },
        {
          id: "tlr3_q5",
          imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          questionText: "Look at the picture marked No. 5 in your test book.",
          options: [
            { key: "A", text: "Sunlight is streaming through panoramic office windows." },
            { key: "B", text: "An executive is adjusting window blinds in a boardroom." },
            { key: "C", text: "Carpets are being vacuumed in an empty hallway." },
            { key: "D", text: "Glass partitions are being installed between workstations." }
          ],
          correctAnswer: "A" as const,
          explanation: "Ánh nắng chiếu qua khung cửa sổ kính văn phòng lớn (`Sunlight is streaming through panoramic office windows`)."
        },
        {
          id: "tlr3_q6",
          imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          questionText: "Look at the picture marked No. 6 in your test book.",
          options: [
            { key: "A", text: "A speaker is addressing attendees from a stage podium." },
            { key: "B", text: "Participants are taking notes while seated in rows." },
            { key: "C", text: "Audience members are standing and applauding." },
            { key: "D", text: "Microphones are being distributed to panel discussion guests." }
          ],
          correctAnswer: "B" as const,
          explanation: "Người tham gia hội thảo đang ngồi ghi chép theo hàng ghế (`taking notes while seated in rows`)."
        }
      ];

      part1Photos.forEach((item, idx) => {
        qs.push({
          id: item.id,
          partNumber: 1,
          partTitle: "Part 1: Photographs",
          section: "LISTENING",
          imageUrl: item.imageUrl,
          audioUrl: item.audioUrl,
          passageText: `[Audio Transcript - Photo #${idx + 1}]\nA. ${item.options[0].text}\nB. ${item.options[1].text}\nC. ${item.options[2].text}\nD. ${item.options[3].text}`,
          questionText: `Question ${idx + 1}: ${item.questionText}`,
          options: item.options as any,
          correctAnswer: item.correctAnswer,
          explanation: item.explanation
        });
      });

      // PART 2: QUESTION-RESPONSE (Q7 - Q31: 25 UNIQUE QUESTIONS)
      const part2Questions: { q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"; exp: string }[] = [
        { q: "Where should I park my car during the customer appreciation luncheon?", opts: [{ key: "A", text: "Complimentary valet parking is available at the front entrance." }, { key: "B", text: "The lunch menu features grilled salmon." }, { key: "C", text: "At twelve-thirty sharp." }], a: "A", exp: "Câu hỏi 'Where' chỉ nơi chốn: 'Complimentary valet parking is available at the front entrance'." },
        { q: "Who is responsible for overseeing the quarterly inventory audit?", opts: [{ key: "A", text: "In the storage warehouse behind Building 4." }, { key: "B", text: "Marcus from operations is heading the audit team." }, { key: "C", text: "We counted over fifteen thousand units." }], a: "B", exp: "Câu hỏi 'Who' chỉ người chịu trách nhiệm: 'Marcus from operations is heading the audit team'." },
        { q: "When will the executive board announce the new regional vice president?", opts: [{ key: "A", text: "Right after their afternoon closed-door session." }, { key: "B", text: "The candidate has twenty years of experience." }, { key: "C", text: "In the fourth-floor boardroom." }], a: "A", exp: "Câu hỏi 'When' chỉ thời gian: 'Right after their afternoon closed-door session'." },
        { q: "Would you like me to proofread your presentation slides before the client demo?", opts: [{ key: "A", text: "That would be wonderful, thank you." }, { key: "B", text: "The projector is connected to HDMI 1." }, { key: "C", text: "The client meeting starts at 3:00 PM." }], a: "A", exp: "Phản hồi lời đề nghị giúp đỡ: 'That would be wonderful, thank you'." },
        { q: "Why hasn't the marketing department launched the social media ad campaign yet?", opts: [{ key: "A", text: "We are still waiting for legal approval on the trademark slogan." }, { key: "B", text: "About fifty thousand user impressions." }, { key: "C", text: "The marketing director graduated from Stanford." }], a: "A", exp: "Giải thích nguyên nhân 'Why': Đang chờ bộ phận pháp chế phê duyệt khẩu hiệu thương hiệu." },
        { q: "How long does it take to process an international wire transfer?", opts: [{ key: "A", text: "Usually between one and three business days." }, { key: "B", text: "The transfer fee is twenty-five dollars." }, { key: "C", text: "Yes, the invoice was paid in full." }], a: "A", exp: "Câu hỏi thời lượng 'How long': 'Usually between one and three business days'." },
        { q: "Should we order extra catering platters or stick with the original headcount?", opts: [{ key: "A", text: "Let's add two more platters just to be safe." }, { key: "B", text: "The catering delivery van is outside." }, { key: "C", text: "Yes, the food was very appetizing." }], a: "A", exp: "Câu hỏi lựa chọn 'order extra... or stick with...': Chọn đặt thêm 2 khay cho an toàn." },
        { q: "Has the technician completed the maintenance inspection on Elevator 3?", opts: [{ key: "A", text: "He just returned the maintenance logbook to the security desk." }, { key: "B", text: "Floors 14 through 20." }, { key: "C", text: "The elevator holds up to twelve passengers." }], a: "A", exp: "Trả lời gián tiếp xác nhận đã xong việc vì thợ đã trả sổ ghi chép bảo trì." },
        { q: "Why don't we schedule the team building retreat for the third weekend of October?", opts: [{ key: "A", text: "Several department leads will be in Tokyo for the summit then." }, { key: "B", text: "The hotel offers complimentary Wi-Fi." }, { key: "C", text: "We went kayaking last autumn." }], a: "A", exp: "Phản hồi lời đề xuất 'Why don't we...': Nêu lý do trùng lịch công tác của các trưởng phòng." },
        { q: "Which courier service offers the most reliable same-day delivery in Manhattan?", opts: [{ key: "A", text: "Apex Express has the fastest track record in the district." }, { key: "B", text: "The package weighs approximately five pounds." }, { key: "C", text: "Delivery costs twelve dollars per parcel." }], a: "A", exp: "Câu hỏi 'Which courier service...': Chọn Apex Express." },
        { q: "You've sent the updated draft contract to our overseas vendor, haven't you?", opts: [{ key: "A", text: "I emailed the encrypted PDF first thing this morning." }, { key: "B", text: "The contract is valid for thirty-six months." }, { key: "C", text: "Yes, the vendor is based in Frankfurt." }], a: "A", exp: "Xác nhận câu hỏi đuôi: 'I emailed the encrypted PDF first thing this morning'." },
        { q: "How often are the security access codes updated on server room doors?", opts: [{ key: "A", text: "Every forty-five days according to IT policy." }, { key: "B", text: "Only authorized engineers may enter." }, { key: "C", text: "The server room is in the basement." }], a: "A", exp: "Câu hỏi tần suất 'How often': 'Every forty-five days according to IT policy'." },
        { q: "Where did Sarah leave the keys to the company shuttle van?", opts: [{ key: "A", text: "On the key hook next to the transport coordinator's desk." }, { key: "B", text: "The shuttle holds fifteen passengers." }, { key: "C", text: "She drove to the airport terminal." }], a: "A", exp: "Câu hỏi 'Where': 'On the key hook next to the transport coordinator's desk'." },
        { q: "What is the projected revenue growth for our cloud software subscription tier?", opts: [{ key: "A", text: "Our analysts project an eighteen percent annual increase." }, { key: "B", text: "The subscription costs forty dollars per user." }, { key: "C", text: "The software update was released yesterday." }], a: "A", exp: "Câu hỏi mức tăng trưởng doanh thu dự phóng: 'project an eighteen percent annual increase'." },
        { q: "Could you please print twenty copies of the financial agenda for the board meeting?", opts: [{ key: "A", text: "I'll take care of that on the third-floor color printer right now." }, { key: "B", text: "The meeting is scheduled in Conference Room A." }, { key: "C", text: "The agenda has seven discussion items." }], a: "A", exp: "Nhận lời giúp đỡ: 'I'll take care of that on the third-floor color printer right now'." },
        { q: "Why was the flight from San Francisco diverted to Oakland Airport?", opts: [{ key: "A", text: "Dense coastal fog reduced runway visibility below safety minimums." }, { key: "B", text: "The flight duration was five hours." }, { key: "C", text: "At Gate 44B in Terminal 2." }], a: "A", exp: "Giải thích nguyên nhân chuyển hướng bay: Sương mù dày đặc làm giảm tầm nhìn đường băng." },
        { q: "Who authorized the emergency equipment expenditure for the manufacturing plant?", opts: [{ key: "A", text: "Plant Director Thornton signed the authorization form." }, { key: "B", text: "The equipment cost fifty-five thousand dollars." }, { key: "C", text: "Delivery is scheduled for next Tuesday." }], a: "A", exp: "Câu hỏi 'Who': 'Plant Director Thornton signed the authorization form'." },
        { q: "Is the new graphic design consultant working remotely or on-site in Austin?", opts: [{ key: "A", text: "She works from her studio in Denver on a hybrid schedule." }, { key: "B", text: "The logo design is very contemporary." }, { key: "C", text: "Her contract begins on Monday." }], a: "A", exp: "Câu hỏi lựa chọn 'remotely or on-site': Giải thích làm việc từ xa từ studio ở Denver." },
        { q: "Let's review the customer feedback ratings from yesterday's product demonstration.", opts: [{ key: "A", text: "I have the analytics dashboard pulled up on my monitor." }, { key: "B", text: "The product retails for ninety-nine dollars." }, { key: "C", text: "Over two hundred people attended the webinar." }], a: "A", exp: "Phản hồi tích cực lời đề nghị: 'I have the analytics dashboard pulled up on my monitor'." },
        { q: "How did you manage to secure such a favorable interest rate on the commercial loan?", opts: [{ key: "A", text: "Our exceptional credit rating gave us strong leverage." }, { key: "B", text: "The loan principal is two million dollars." }, { key: "C", text: "The bank branch is located on Wall Street." }], a: "A", exp: "Câu hỏi 'How': Nêu lý do điểm tín dụng cao giúp tạo lợi thế đàm phán." },
        { q: "Where can visitors obtain guest Wi-Fi credentials in the lobby?", opts: [{ key: "A", text: "The reception desk has QR code cards on the counter." }, { key: "B", text: "The Wi-Fi speed is 500 megabits per second." }, { key: "C", text: "Yes, I logged in with my laptop." }], a: "A", exp: "Câu hỏi 'Where': 'The reception desk has QR code cards on the counter'." },
        { q: "Would you mind double-checking the currency conversion rates in the European sales report?", opts: [{ key: "A", text: "I'll cross-reference them with the European Central Bank data right away." }, { key: "B", text: "The euro gained two percent yesterday." }, { key: "C", text: "The report is thirty pages long." }], a: "A", exp: "Nhận lời kiểm tra: 'cross-reference them with ECB data right away'." },
        { q: "When will the annual fire alarm inspection take place in our office tower?", opts: [{ key: "A", text: "Tomorrow morning between nine and eleven o'clock." }, { key: "B", text: "The fire exit stairs are at both ends of the hall." }, { key: "C", text: "Please do not use the elevators during a drill." }], a: "A", exp: "Câu hỏi 'When': 'Tomorrow morning between nine and eleven o'clock'." },
        { q: "Our corporate sustainability score improved by twelve points this year.", opts: [{ key: "A", text: "That should help us attract socially conscious institutional investors." }, { key: "B", text: "We installed LED lighting in all corridors." }, { key: "C", text: "The scoring rubric was updated in 2024." }], a: "A", exp: "Phản hồi câu trần thuật: 'That should help us attract socially conscious institutional investors'." },
        { q: "Why hasn't the broken air conditioning unit in Meeting Room B been fixed yet?", opts: [{ key: "A", text: "The replacement thermostat sensor is scheduled for delivery tomorrow." }, { key: "B", text: "The room seats up to twenty people." }, { key: "C", text: "It is currently seventy degrees Fahrenheit." }], a: "A", exp: "Giải thích nguyên nhân: Cảm biến điều nhiệt thay thế sẽ được giao vào ngày mai." }
      ];

      part2Questions.forEach((item, idx) => {
        const qNum = idx + 7;
        qs.push({
          id: `tlr3_q${qNum}`,
          partNumber: 2,
          partTitle: "Part 2: Question-Response",
          section: "LISTENING",
          audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(idx % 4) + 1}.mp3`,
          passageText: `[Audio Transcript - Q${qNum}]\nQuestion: "${item.q}"\n(A) ${item.opts[0].text}\n(B) ${item.opts[1].text}\n(C) ${item.opts[2].text}`,
          questionText: `Question ${qNum}: Listen and choose the best response.`,
          options: [
            { key: "A", text: item.opts[0].text },
            { key: "B", text: item.opts[1].text },
            { key: "C", text: item.opts[2].text },
            { key: "D", text: "(Not Applicable in Part 2)" }
          ],
          correctAnswer: item.a,
          explanation: item.exp
        });
      });

      // PART 3: CONVERSATIONS (Q32 - Q70: 13 DIALOGUES × 3 QUESTIONS = 39 QUESTIONS)
      const part3Sets: { dialogue: string; questions: { q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        {
          dialogue: "Man: Good morning, Sophia. Have you completed the vendor evaluation for our new cloud customer relationship management software?\nWoman: Yes, Michael. I compared Salesforce, HubSpot, and ZenithCRM across four key metrics: subscription pricing, mobile offline functionality, third-party API integrations, and data security compliance.\nMan: Which platform emerged as the top contender for our sales teams in North America and Europe?\nWoman: ZenithCRM scored highest overall. Although their upfront licensing fee is 8% higher than HubSpot, their automated multilingual customer lead routing and built-in AI analytics will save our account representatives over fifteen hours per week.\nMan: That productivity gain easily justifies the premium. Let's schedule a formal product demonstration with ZenithCRM's enterprise sales director for this Thursday at 2:00 PM.",
          questions: [
            { q: "What software evaluation did Sophia complete?", opts: [{ key: "A", text: "Enterprise accounting and payroll software" }, { key: "B", text: "Cloud customer relationship management (CRM) software" }, { key: "C", text: "Warehouse inventory management platforms" }, { key: "D", text: "Video conferencing and team collaboration tools" }], a: "B", exp: "Đánh giá phần mềm CRM: 'cloud customer relationship management software'." },
            { q: "Why did Sophia recommend ZenithCRM over competitors?", opts: [{ key: "A", text: "It offered the lowest licensing cost" }, { key: "B", text: "Multilingual lead routing and built-in AI save 15+ hours per week" }, { key: "C", text: "It provides free hardware tablet devices" }, { key: "D", text: "It requires no employee training" }], a: "B", exp: "Lý do chọn: 'automated multilingual customer lead routing and built-in AI analytics will save our account representatives over fifteen hours per week'." },
            { q: "What will the speakers do on Thursday at 2:00 PM?", opts: [{ key: "A", text: "Sign a multi-year software contract" }, { key: "B", text: "Attend a product demonstration with ZenithCRM's sales director" }, { key: "C", text: "Conduct employee training workshops" }, { key: "D", text: "Upgrade computer server hardware" }], a: "B", exp: "Kế hoạch thứ Năm: 'schedule a formal product demonstration with ZenithCRM's enterprise sales director for this Thursday at 2:00 PM'." }
          ]
        },
        {
          dialogue: "Woman: Hello, Mr. Harrison. I am calling from Grand Pacific Air Cargo customer service. Your priority shipment of pharmaceutical temperature-sensitive vaccines from Zurich has landed at Dallas Fort Worth International Airport.\nMan: That is excellent news, Ms. Diaz! The cold chain storage must be maintained between 2 and 8 degrees Celsius at all times. Has customs cleared the manifest?\nWoman: Customs inspection concluded thirty minutes ago, and our ground logistics crew has already transferred the insulated dry-ice containers into our climate-controlled holding facility in Bay 14.\nMan: Perfect. Our specialized refrigerated freight courier, MediTransport Express, is scheduled to pick up the cargo at 4:30 PM today.",
          questions: [
            { q: "What cargo is being transported in the shipment?", opts: [{ key: "A", text: "Electronic microprocessor chips" }, { key: "B", text: "Temperature-sensitive pharmaceutical vaccines from Zurich" }, { key: "C", text: "High-end luxury wristwatches" }, { key: "D", text: "Fresh organic agricultural fruit" }], a: "B", exp: "Hàng hóa: 'pharmaceutical temperature-sensitive vaccines from Zurich'." },
            { q: "What temperature range must be strictly maintained?", opts: [{ key: "A", text: "Sub-zero below -20°C" }, { key: "B", text: "Between 2 and 8 degrees Celsius" }, { key: "C", text: "Room temperature (20-25°C)" }, { key: "D", text: "Below freezing (0°C)" }], a: "B", exp: "Nhiệt độ bảo quản: 'maintained between 2 and 8 degrees Celsius at all times'." },
            { q: "When will the specialized refrigerated courier pick up the cargo?", opts: [{ key: "A", text: "Immediately at noon" }, { key: "B", text: "At 4:30 PM today" }, { key: "C", text: "Tomorrow morning at 8:00 AM" }, { key: "D", text: "Friday afternoon" }], a: "B", exp: "Giờ nhận hàng: 'MediTransport Express, is scheduled to pick up the cargo at 4:30 PM today'." }
          ]
        },
        {
          dialogue: "Man: Rachel, did you notice the discrepancy in our quarterly utility bills for the Austin manufacturing facility?\nWoman: Yes, Brian. Electricity charges increased by 22 percent during the months of July and August compared to the previous quarter.\nMan: That surge was primarily driven by the continuous operation of our secondary cooling chiller units during the record heatwave. However, our rooftop solar expansion was completed two weeks ago.\nWoman: That should significantly mitigate our peak grid power consumption. The facility manager projects that on-site solar generation will cover nearly 40 percent of our daytime manufacturing electricity requirements starting this month.",
          questions: [
            { q: "By how much did electricity charges increase during July and August?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "15 percent" }, { key: "C", text: "22 percent" }, { key: "D", text: "40 percent" }], a: "C", exp: "Tỷ lệ tăng: 'Electricity charges increased by 22 percent'." },
            { q: "What caused the temporary spike in power costs?", opts: [{ key: "A", text: "Installing new robotic assembly arms" }, { key: "B", text: "Continuous operation of secondary cooling chillers during a heatwave" }, { key: "C", text: "Faulty electrical wiring in the warehouse" }, { key: "D", text: "Running three consecutive weekend overtime shifts" }], a: "B", exp: "Nguyên nhân tăng điện năng: 'continuous operation of our secondary cooling chiller units during the record heatwave'." },
            { q: "What proportion of daytime electricity will the new solar array supply?", opts: [{ key: "A", text: "15 percent" }, { key: "B", text: "25 percent" }, { key: "C", text: "Nearly 40 percent" }, { key: "D", text: "100 percent" }], a: "C", exp: "Tỷ trọng điện mặt trời: 'cover nearly 40 percent of our daytime manufacturing electricity requirements'." }
          ]
        },
        {
          dialogue: "Woman: Good morning, Dr. Thorne. I am reviewing the architectural floorplans for our new medical research center in Cambridge.\nMan: Hello, Amanda. I noticed that the biotechnology cleanrooms on Floor 3 are currently situated directly adjacent to the freight elevator shaft. The acoustic vibrations from heavy machinery could interfere with our high-precision electron microscopes.\nWoman: That is an astute observation. We can easily reconfigure the layout by swapping the electron microscopy suite with the bioinformatics data office located in the quieter northwest corner.\nMan: That is a much safer architectural layout. Let's submit these revisions to the lead architectural firm before Friday's planning committee review.",
          questions: [
            { q: "What architectural issue did Dr. Thorne identify on Floor 3?", opts: [{ key: "A", text: "The fire exits are too narrow" }, { key: "B", text: "Elevator vibrations could interfere with precision electron microscopes" }, { key: "C", text: "The ceiling height is insufficient for ductwork" }, { key: "D", text: "The cleanrooms lack natural sunlight" }], a: "B", exp: "Vấn đề kỹ thuật: 'acoustic vibrations from heavy machinery could interfere with our high-precision electron microscopes'." },
            { q: "How does Amanda propose resolving the problem?", opts: [{ key: "A", text: "Installing vibration dampening floor mats only" }, { key: "B", text: "Swapping the microscopy suite with the bioinformatics office in the northwest corner" }, { key: "C", text: "Removing the freight elevator entirely" }, { key: "D", text: "Moving the electron microscopes to the basement car park" }], a: "B", exp: "Giải pháp: 'swapping the electron microscopy suite with the bioinformatics data office located in the quieter northwest corner'." },
            { q: "When will the revised floorplans be submitted?", opts: [{ key: "A", text: "Today before noon" }, { key: "B", text: "Before Friday's planning committee review" }, { key: "C", text: "Next month after construction begins" }, { key: "D", text: "At the end of the fiscal year" }], a: "B", exp: "Thời hạn nộp bản vẽ sửa đổi: 'submit these revisions... before Friday's planning committee review'." }
          ]
        },
        {
          dialogue: "Man: Excuse me, Ms. Campbell. The high-capacity commercial laser printer in the finance department is displaying an error code F-18 and has stopped processing payroll statements.\nWoman: Oh no, that's the second time this week that machine has experienced a fuser assembly overheat. Let me contact OfficeTech Service immediately to dispatch an emergency technician.\nMan: In the meantime, I need to print 80 copies of the executive compensation review before our 11:00 AM meeting with the chief financial officer.\nWoman: You can use the high-speed multifunction printer in the legal department on Floor 5. I will unlock the door for you right now.",
          questions: [
            { q: "What technical malfunction occurred in the finance department?", opts: [{ key: "A", text: "A computer network server outage" }, { key: "B", text: "A commercial laser printer fuser overheat error" }, { key: "C", text: "A paper shredder motor burnout" }, { key: "D", text: "A lost backup hard drive" }], a: "B", exp: "Lỗi thiết bị: 'commercial laser printer in the finance department is displaying an error code F-18' (fuser assembly overheat)." },
            { q: "What document does the man need to print urgently?", opts: [{ key: "A", text: "New employee onboarding handbooks" }, { key: "B", text: "80 copies of the executive compensation review before 11:00 AM" }, { key: "C", text: "Marketing brochures for a trade show" }, { key: "D", text: "Quarterly corporate tax returns" }], a: "B", exp: "Tài liệu cần in khẩn: '80 copies of the executive compensation review before our 11:00 AM meeting'." },
            { q: "Where does the woman direct the man to print his documents?", opts: [{ key: "A", text: "To a commercial print shop across the street" }, { key: "B", text: "To the legal department printer on Floor 5" }, { key: "C", text: "To the human resources copy center on Floor 1" }, { key: "D", text: "To her personal desktop inkjet printer" }], a: "B", exp: "Địa điểm in thay thế: 'multifunction printer in the legal department on Floor 5'." }
          ]
        },
        {
          dialogue: "Woman: David, have you reviewed the applicant resumes for our open Senior Cybersecurity Architect role?\nMan: Yes, Laura. We received over forty applications, but two candidates stand out distinctly: Kevin Patel from CloudShield Security and Elena Rostova from CyberGlobal Dynamics.\nWoman: Both have stellar technical credentials. However, Kevin has five years of specialized experience in deploying zero-trust network architectures for financial banking institutions.\nMan: Since our primary corporate initiative this year is modernizing our payment gateway encryption, Kevin's background aligns perfectly with our roadmap. Let's invite him for an in-person panel interview on Wednesday morning.",
          questions: [
            { q: "What job position are the speakers discussing?", opts: [{ key: "A", text: "Chief Information Officer" }, { key: "B", text: "Senior Cybersecurity Architect" }, { key: "C", text: "Cloud Database Administrator" }, { key: "D", text: "Software Quality Assurance Lead" }], a: "B", exp: "Vị trí tuyển dụng: 'Senior Cybersecurity Architect role'." },
            { q: "Why do the speakers prefer Kevin Patel?", opts: [{ key: "A", text: "He requested a lower starting salary" }, { key: "B", text: "His zero-trust banking security experience matches the firm's payment gateway project" }, { key: "C", text: "He has a doctoral degree in theoretical mathematics" }, { key: "D", text: "He is available to start work immediately" }], a: "B", exp: "Lý do chọn Kevin: 'five years of specialized experience in deploying zero-trust network architectures for financial banking institutions'." },
            { q: "What will the speakers do next?", opts: [{ key: "A", text: "Send a rejection letter to Elena Rostova" }, { key: "B", text: "Invite Kevin Patel for an in-person panel interview on Wednesday" }, { key: "C", text: "Readvertise the position on job boards" }, { key: "D", text: "Check Kevin's college transcripts" }], a: "B", exp: "Hành động tiếp theo: 'invite him for an in-person panel interview on Wednesday morning'." }
          ]
        },
        {
          dialogue: "Man: Good afternoon, Ms. Kim. I am calling from Apex Fleet Management regarding your corporate vehicle lease agreement for fifteen hybrid sedans.\nWoman: Hello, Mr. Martinez. Yes, our regional sales representatives have been very pleased with the fuel efficiency and reliability of those vehicles over the past two years.\nMan: I am calling because your 24-month lease is set to expire on November 30th. If you renew your fleet contract before October 31st, we can upgrade all fifteen vehicles to our 2027 all-electric models at no additional monthly charge.\nWoman: That aligns perfectly with our company's corporate carbon reduction targets! Please send the renewal contract and vehicle specification sheets to my email.",
          questions: [
            { q: "How many vehicles are currently leased under the agreement?", opts: [{ key: "A", text: "Five vehicles" }, { key: "B", text: "Ten vehicles" }, { key: "C", text: "Fifteen vehicles" }, { key: "D", text: "Twenty-five vehicles" }], a: "C", exp: "Số lượng xe: 'corporate vehicle lease agreement for fifteen hybrid sedans'." },
            { q: "What promotional upgrade is offered if renewed before October 31st?", opts: [{ key: "A", text: "Free monthly car washes" }, { key: "B", text: "Upgrade to 2027 all-electric models at no extra monthly cost" }, { key: "C", text: "A 50 percent cash rebate on fuel" }, { key: "D", text: "Complimentary chauffeur services" }], a: "B", exp: "Ưu đãi nâng cấp: 'upgrade all fifteen vehicles to our 2027 all-electric models at no additional monthly charge'." },
            { q: "Why does the woman find the upgrade proposal appealing?", opts: [{ key: "A", text: "It allows employees to drive luxury sports cars" }, { key: "B", text: "It supports the company's corporate carbon reduction targets" }, { key: "C", text: "It reduces insurance premiums by 80 percent" }, { key: "D", text: "It includes free employee parking permits" }], a: "B", exp: "Lý do đồng ý: 'aligns perfectly with our company's corporate carbon reduction targets'." }
          ]
        },
        {
          dialogue: "Woman: Thomas, our corporate catering order for tomorrow's foreign trade delegation luncheon has a discrepancy. We requested dairy-free and vegetarian options for eight diplomats, but the caterer's invoice lists standard meat entrees for everyone.\nMan: Good catch, Amanda! Let me contact Gourmet Bistro Catering immediately. They require twenty-four hours' notice for menu alterations, but since our event is at 1:30 PM tomorrow, we are still within the permissible modification window.\nWoman: Excellent. While you have them on the phone, could you also confirm that the pastry desserts will be completely nut-free? Ambassador Chen has a severe peanut allergy.\nMan: Absolutely. I will ensure their executive chef places an allergy warning flag on our order.",
          questions: [
            { q: "What error was found on the catering invoice?", opts: [{ key: "A", text: "The total price was calculated incorrectly" }, { key: "B", text: "Dairy-free and vegetarian options were omitted for eight diplomats" }, { key: "C", text: "The delivery date was listed as next week" }, { key: "D", text: "Beverages were left off the order" }], a: "B", exp: "Sai sót hóa đơn: 'requested dairy-free and vegetarian options for eight diplomats, but the invoice lists standard meat entrees for everyone'." },
            { q: "Why is the dessert requirement particularly critical?", opts: [{ key: "A", text: "Ambassador Chen has a severe peanut allergy" }, { key: "B", text: "Desserts must be kosher certified" }, { key: "C", text: "The delegation prefers fruit salad exclusively" }, { key: "D", text: "The pastries must be served warm" }], a: "A", exp: "Yêu cầu dị ứng: 'Ambassador Chen has a severe peanut allergy'." },
            { q: "What will Thomas do next?", opts: [{ key: "A", text: "Cancel the catering booking entirely" }, { key: "B", text: "Call Gourmet Bistro Catering to amend dietary preferences and allergy flags" }, { key: "C", text: "Cook vegetarian meals in the office kitchenette" }, { key: "D", text: "Inform Ambassador Chen that food will not be served" }], a: "B", exp: "Hành động: 'contact Gourmet Bistro Catering immediately' để sửa đổi thực đơn và đặt cờ cảnh báo dị ứng." }
          ]
        },
        {
          dialogue: "Man: Hi, Jessica. Have you seen the revised interior blueprints for our corporate headquarters renovation in Seattle?\nWoman: Yes, Mark. I love the open-concept collaborative zones and the acoustic privacy booths. However, the facilities team noted that the electrical outlets in Conference Room 4 are placed too far from the central presentation table.\nMan: That could create tripping hazards with extension cables during board meetings. Let's request the electrical sub-contractor to install recessed pop-up power modules directly inside the table surface.\nWoman: I will email the revised architectural engineering schematics to the project manager this afternoon.",
          questions: [
            { q: "What renovation project are the speakers discussing?", opts: [{ key: "A", text: "A hospital emergency ward in Denver" }, { key: "B", text: "A corporate headquarters renovation in Seattle" }, { key: "C", text: "A shopping mall food court in Miami" }, { key: "D", text: "A university dormitory in Boston" }], a: "B", exp: "Dự án: 'corporate headquarters renovation in Seattle'." },
            { q: "What safety concern did the speakers identify in Conference Room 4?", opts: [{ key: "A", text: "Inadequate emergency fire exits" }, { key: "B", text: "Tripping hazards from extension cords due to distant wall outlets" }, { key: "C", text: "Slippery marble flooring" }, { key: "D", text: "Poor ventilation in windowless rooms" }], a: "B", exp: "Mối lo an toàn: 'tripping hazards with extension cables during board meetings'." },
            { q: "What solution do the speakers agree upon?", opts: [{ key: "A", text: "Using battery-powered laptops exclusively" }, { key: "B", text: "Installing recessed pop-up power modules directly in the table surface" }, { key: "C", text: "Taping extension cords to the carpet floor" }, { key: "D", text: "Removing the conference table entirely" }], a: "B", exp: "Giải pháp: 'install recessed pop-up power modules directly inside the table surface'." }
          ]
        },
        {
          dialogue: "Woman: Good morning, Dr. Evans. I am calling from Summit Medical Instruments. Your order of three automated blood chemistry analyzers has been dispatched from our distribution center in Chicago.\nMan: Excellent, Ms. Vance. Our outpatient diagnostic laboratory has been operating at maximum capacity, so these new analyzers will dramatically reduce patient test turnaround times.\nWoman: The specialized freight carrier, Precision Logistics, is scheduled to deliver and calibrate the machines on Wednesday morning between 8:30 AM and 11:00 AM.\nMan: Great. I will notify our laboratory supervisor, Dr. Harris, so he can ensure our technical staff are available for the on-site calibration and software certification.",
          questions: [
            { q: "What equipment did Dr. Evans purchase?", opts: [{ key: "A", text: "Digital X-ray imaging machines" }, { key: "B", text: "Three automated blood chemistry analyzers" }, { key: "C", text: "Surgical laser scalpels" }, { key: "D", text: "Sterilization autoclaves" }], a: "B", exp: "Thiết bị mua: 'three automated blood chemistry analyzers'." },
            { q: "When will the freight carrier deliver the analyzers?", opts: [{ key: "A", text: "Today at 5:00 PM" }, { key: "B", text: "Wednesday morning between 8:30 AM and 11:00 AM" }, { key: "C", text: "Friday afternoon" }, { key: "D", text: "Next Monday" }], a: "B", exp: "Thời gian giao hàng: 'Wednesday morning between 8:30 AM and 11:00 AM'." },
            { q: "What will Dr. Harris and the technical staff do upon delivery?", opts: [{ key: "A", text: "Process customer payment invoices" }, { key: "B", text: "Participate in on-site machine calibration and software certification" }, { key: "C", text: "Pack older machines for scrap recycling" }, { key: "D", text: "Conduct patient blood tests immediately" }], a: "B", exp: "Nhiệm vụ khi nhận máy: 'available for the on-site calibration and software certification'." }
          ]
        },
        {
          dialogue: "Man: Stephanie, did you attend the corporate sustainability briefing this morning?\nWoman: Yes, Alex. The executive committee announced that our company will invest 4.5 million dollars to transition our regional delivery fleet to zero-emission electric vans over the next eighteen months.\nMan: That will significantly lower our urban carbon footprint. Did they mention where the charging infrastructure will be installed?\nWoman: Yes, our central logistics hub in Dallas will be equipped with twenty-four high-power commercial fast chargers powered by rooftop solar arrays.",
          questions: [
            { q: "How much is the company investing in its electric fleet transition?", opts: [{ key: "A", text: "1.2 million dollars" }, { key: "B", text: "2.5 million dollars" }, { key: "C", text: "4.5 million dollars" }, { key: "D", text: "10 million dollars" }], a: "C", exp: "Vốn đầu tư: 'invest 4.5 million dollars'." },
            { q: "Over what timeframe will the delivery fleet transition to electric vehicles?", opts: [{ key: "A", text: "Six months" }, { key: "B", text: "Twelve months" }, { key: "C", text: "Eighteen months" }, { key: "D", text: "Three years" }], a: "C", exp: "Thời gian thực hiện: 'over the next eighteen months'." },
            { q: "How many fast chargers will be installed at the Dallas logistics hub?", opts: [{ key: "A", text: "Twelve chargers" }, { key: "B", text: "Twenty-four high-power commercial fast chargers" }, { key: "C", text: "Thirty-six chargers" }, { key: "D", text: "Fifty chargers" }], a: "B", exp: "Số trụ sạc nhanh: 'twenty-four high-power commercial fast chargers'." }
          ]
        },
        {
          dialogue: "Woman: Mr. Reynolds, our quarterly customer satisfaction report for the mobile banking app was released this morning. User ratings increased from 4.1 to 4.7 stars following our recent biometric security update.\nMan: That is fantastic news, Karen! Did the analytics identify which new features received the highest praise from users?\nWoman: Yes, users particularly highlighted the instant biometric login and the automated monthly spending categorization tool.\nMan: That confirms our investment in intuitive fintech design was worthwhile. Let's present these findings to the board of directors at Friday's strategic review.",
          questions: [
            { q: "How much did the mobile banking app rating increase?", opts: [{ key: "A", text: "From 3.5 to 4.0 stars" }, { key: "B", text: "From 4.1 to 4.7 stars" }, { key: "C", text: "From 4.5 to 5.0 stars" }, { key: "D", text: "It remained unchanged at 4.2 stars" }], a: "B", exp: "Điểm đánh giá tăng: 'increased from 4.1 to 4.7 stars'." },
            { q: "Which features received the highest praise from app users?", opts: [{ key: "A", text: "Live video chat with branch tellers" }, { key: "B", text: "Instant biometric login and automated spending categorization" }, { key: "C", text: "Cryptocurrency trading tools" }, { key: "D", text: "Custom color themes and ringtones" }], a: "B", exp: "Tính năng được khen ngợi nhất: 'instant biometric login and the automated monthly spending categorization tool'." },
            { q: "What will the speakers do on Friday?", opts: [{ key: "A", text: "Launch a new marketing advertising campaign" }, { key: "B", text: "Present user satisfaction findings to the board of directors" }, { key: "C", text: "Release a new software patch" }, { key: "D", text: "Conduct customer focus groups" }], a: "B", exp: "Kế hoạch thứ Sáu: 'present these findings to the board of directors at Friday's strategic review'." }
          ]
        },
        {
          dialogue: "Man: Good afternoon, Dr. Patel. I am calling from Apex Conference Planning regarding the International Environmental Science Symposium in Singapore next March.\nWoman: Hello, Mr. Thorne. I am excited to deliver our research keynote on urban microclimate mitigation.\nMan: We would like to confirm your audiovisual requirements for the Grand Auditorium. Will you need dual wireless lapel microphones and a high-definition interactive presentation laser pointer?\nWoman: Yes, please. Additionally, I will be streaming live computational fluid dynamic simulation videos from our university cloud server, so a dedicated high-speed wired Ethernet connection on the podium is essential.\nMan: I will make a note of the dedicated Ethernet line with our technical production team immediately.",
          questions: [
            { q: "Where will the Environmental Science Symposium take place?", opts: [{ key: "A", text: "Tokyo, Japan" }, { key: "B", text: "Singapore" }, { key: "C", text: "Sydney, Australia" }, { key: "D", text: "London, UK" }], a: "B", exp: "Địa điểm hội thảo: 'Symposium in Singapore next March'." },
            { q: "What is the topic of Dr. Patel's keynote presentation?", opts: [{ key: "A", text: "Oceanic plastic recycling technologies" }, { key: "B", text: "Urban microclimate mitigation research" }, { key: "C", text: "Solar photovoltaic efficiency" }, { key: "D", text: "Deforestation monitoring in South America" }], a: "B", exp: "Chủ đề bài phát biểu: 'research keynote on urban microclimate mitigation'." },
            { q: "What special technical requirement did Dr. Patel request on the podium?", opts: [{ key: "A", text: "A 3D holographic display projector" }, { key: "B", text: "A dedicated high-speed wired Ethernet line for cloud simulations" }, { key: "C", text: "A teleprompter screen monitor" }, { key: "D", text: "A motorized standing desk" }], a: "B", exp: "Yêu cầu kỹ thuật đặc biệt: 'dedicated high-speed wired Ethernet connection on the podium'." }
          ]
        }
      ];

      let p3QNum = 32;
      part3Sets.forEach((set, sIdx) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr3_q${p3QNum}`,
            partNumber: 3,
            partTitle: "Part 3: Conversations",
            section: "LISTENING",
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(sIdx % 4) + 1}.mp3`,
            passageText: `[Audio Transcript - Conversation #${sIdx + 1}]\n${set.dialogue}`,
            questionText: `Question ${p3QNum}: ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
          p3QNum++;
        });
      });

      // PART 4: SHORT TALKS (Q71 - Q100: 10 TALKS × 3 QUESTIONS = 30 QUESTIONS)
      const part4Sets: { transcript: string; questions: { q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        {
          transcript: "Attention all shoppers in the home improvement section of BuilderPro Superstore. For the next forty-five minutes only, we are holding an exclusive seasonal clearance on all professional-grade cordless power tool kits from DeWalt and Milwaukee. All 20-volt brushless drill and impact driver combo sets are discounted by an additional thirty percent off our already low warehouse prices. Furthermore, every power tool purchase made during this promotional window comes with a complimentary spare lithium-ion battery pack and a heavy-duty canvas carrying case. Please proceed to Aisle 9 to speak with our hardware specialists and claim your discount coupon. This special flash sale ends promptly at 5:00 PM.",
          questions: [
            { q: "What merchandise is discounted during the promotional event?", opts: [{ key: "A", text: "Lawn mowers and garden tools" }, { key: "B", text: "Professional-grade cordless power tool kits" }, { key: "C", text: "Kitchen cabinetry and sinks" }, { key: "D", text: "Exterior house paint and brushes" }], a: "B", exp: "Hàng khuyến mãi: 'clearance on all professional-grade cordless power tool kits'." },
            { q: "What complimentary accessories are included with tool purchases?", opts: [{ key: "A", text: "Safety goggles and work gloves" }, { key: "B", text: "A spare lithium-ion battery pack and canvas carrying case" }, { key: "C", text: "A $25 store gift voucher" }, { key: "D", text: "A lifetime tool sharpening service" }], a: "B", exp: "Quà tặng kèm: 'complimentary spare lithium-ion battery pack and a heavy-duty canvas carrying case'." },
            { q: "When does the flash sale conclude?", opts: [{ key: "A", text: "In fifteen minutes" }, { key: "B", text: "Promptly at 5:00 PM" }, { key: "C", text: "At store closing time" }, { key: "D", text: "At midnight" }], a: "B", exp: "Thời gian kết thúc: 'ends promptly at 5:00 PM'." }
          ]
        },
        {
          transcript: "Good morning, everyone. Welcome to the orientation briefing for our new enterprise resource planning system, NovaERP 2026. My name is Marcus Vance, Director of Systems Engineering. Over the next three weeks, all operational divisions across North America will transition away from our legacy database infrastructure. Today's hands-on seminar will focus on three core workflows: automated vendor purchase order generation, expense approval routing, and digital client invoicing. Before we begin the software simulations on your training workstations, please ensure that you have activated your dual-factor authentication tokens using the verification links sent to your corporate email accounts. If you encounter setup errors, please raise your hand so our IT support team can assist you immediately.",
          questions: [
            { q: "What is the purpose of today's orientation seminar?", opts: [{ key: "A", text: "To announce executive management restructuring" }, { key: "B", text: "To train personnel on the new NovaERP 2026 enterprise system" }, { key: "C", text: "To conduct annual health and safety drills" }, { key: "D", text: "To explain corporate retirement pension benefits" }], a: "B", exp: "Mục đích: 'orientation briefing for our new enterprise resource planning system, NovaERP 2026'." },
            { q: "What modules will today's seminar cover?", opts: [{ key: "A", text: "Purchase order generation, expense routing, and client invoicing" }, { key: "B", text: "Software coding and database programming" }, { key: "C", text: "Employee hiring and severance protocols" }, { key: "D", text: "Warehouse forklift operation safety" }], a: "A", exp: "Nội dung đào tạo: 'vendor purchase order generation, expense approval routing, and digital client invoicing'." },
            { q: "What should attendees do if they experience authentication setup issues?", opts: [{ key: "A", text: "Restart their computer monitors" }, { key: "B", text: "Raise their hands for immediate IT support assistance" }, { key: "C", text: "Email the human resources director" }, { key: "D", text: "Borrow login credentials from a colleague" }], a: "B", exp: "Hướng dẫn xử lý lỗi: 'raise your hand so our IT support team can assist you immediately'." }
          ]
        },
        {
          transcript: "This is an urgent service advisory from Metro Commuter Rail for passengers traveling on the Northeast Express line between Downtown Central Station and Airport Gateway. Due to scheduled electrical overhead wire upgrades and rail signaling trackwork near River Junction, outbound trains are operating with delays of twenty to twenty-five minutes. Additionally, trains will bypass Southfield Commerce Station in both directions until 7:00 PM this evening. Free accessible shuttle buses are departing every ten minutes from the main entrance of Central Station to transport affected passengers directly to Southfield Plaza. Passengers with tight flight connections at the airport are strongly encouraged to transfer to the Express AirLink Coach on Platform 3. We sincerely apologize for this inconvenience.",
          questions: [
            { q: "What is causing the train service delays?", opts: [{ key: "A", text: "Heavy snowfall on coastal mountain passes" }, { key: "B", text: "Overhead wire upgrades and rail signaling trackwork" }, { key: "C", text: "A power grid blackout in downtown" }, { key: "D", text: "A labor strike by railway union staff" }], a: "B", exp: "Nguyên nhân trễ tàu: 'scheduled electrical overhead wire upgrades and rail signaling trackwork'." },
            { q: "Which station is being bypassed by trains until 7:00 PM?", opts: [{ key: "A", text: "Central Station" }, { key: "B", text: "Airport Gateway" }, { key: "C", text: "Southfield Commerce Station" }, { key: "D", text: "River Junction" }], a: "C", exp: "Ga bị bỏ qua: 'bypass Southfield Commerce Station in both directions until 7:00 PM'." },
            { q: "What alternative is recommended for passengers with imminent flights?", opts: [{ key: "A", text: "Hire a private helicopter charter" }, { key: "B", text: "Transfer to the Express AirLink Coach on Platform 3" }, { key: "C", text: "Wait for the late evening train service" }, { key: "D", text: "Walk across the pedestrian footbridge" }], a: "B", exp: "Khuyến nghị khách đi sân bay gấp: 'transfer to the Express AirLink Coach on Platform 3'." }
          ]
        },
        {
          transcript: "Good evening, radio listeners. This is Daniel Thorne with your WNX Daily Financial Digest. In national technology business news today, cloud cybersecurity provider CyberVault International announced plans to establish a 400-million-dollar regional technology center in Austin, Texas. The state-of-the-art research facility is projected to create over two thousand high-paying engineering, threat intelligence, and machine learning jobs over the next two years. CyberVault CEO Sarah Jenkins highlighted Austin's rich pool of university engineering talent and business-friendly tax climate as decisive factors in the site selection. Construction on the 300,000-square-foot campus will commence on January 15th, with initial occupancy planned for late 2027.",
          questions: [
            { q: "How much is CyberVault investing in its new Austin technology center?", opts: [{ key: "A", text: "150 million dollars" }, { key: "B", text: "250 million dollars" }, { key: "C", text: "400 million dollars" }, { key: "D", text: "1 billion dollars" }], a: "C", exp: "Khoản đầu tư: '400-million-dollar regional technology center'." },
            { q: "How many jobs will the new facility generate?", opts: [{ key: "A", text: "500 jobs" }, { key: "B", text: "1,200 jobs" }, { key: "C", text: "Over 2,000 high-paying engineering jobs" }, { key: "D", text: "5,000 seasonal jobs" }], a: "C", exp: "Số việc làm tạo ra: 'create over two thousand high-paying engineering, threat intelligence, and machine learning jobs'." },
            { q: "When will physical construction on the campus commence?", opts: [{ key: "A", text: "Immediately next week" }, { key: "B", text: "On January 15th" }, { key: "C", text: "In mid-2027" }, { key: "D", text: "In 2030" }], a: "B", exp: "Ngày khởi công: 'commence on January 15th'." }
          ]
        },
        {
          transcript: "Hello, Mr. Alvarez. This is Linda Martinez calling from Apex Automotive Master Service Center regarding your 2024 Toyota Highlander SUV. Our lead diagnostic technician has completed the comprehensive 50-point vehicle inspection. The transmission and suspension systems are performing flawlessly, but we discovered a significant hairline fracture in the radiator coolant reservoir, which is causing engine coolant to leak under highway pressure. Additionally, your front brake pads have worn down to two millimeters and require immediate replacement for safety. The total cost estimate for OEM parts, labor, and coolant fluid flush is five hundred and twenty dollars. If you approve the repair before 1:30 PM, we can have your vehicle completely serviced and ready for pickup by 5:45 PM today. Please call me back at 555-0188.",
          questions: [
            { q: "What mechanical defects were discovered during the vehicle inspection?", opts: [{ key: "A", text: "Flat tires and a broken alternator" }, { key: "B", text: "A cracked radiator coolant reservoir and worn front brake pads" }, { key: "C", text: "Dead battery and burnt headlights" }, { key: "D", text: "Shattered windshield and bent axle" }], a: "B", exp: "Lỗi cơ khí: 'hairline fracture in the radiator coolant reservoir' và 'front brake pads have worn down to two millimeters'." },
            { q: "What is the total estimated repair cost?", opts: [{ key: "A", text: "$320" }, { key: "B", text: "$420" }, { key: "C", text: "$520" }, { key: "D", text: "$680" }], a: "C", exp: "Chi phí ước tính: 'five hundred and twenty dollars'." },
            { q: "When will the vehicle be ready if authorized before 1:30 PM?", opts: [{ key: "A", text: "3:00 PM today" }, { key: "B", text: "5:45 PM today" }, { key: "C", text: "Tomorrow at noon" }, { key: "D", text: "Friday afternoon" }], a: "B", exp: "Thời gian nhận xe: 'ready for pickup by 5:45 PM today'." }
          ]
        },
        {
          transcript: "Welcome to the City Hall Press Room. I am Mayor Robert Thornton. Today, I am thrilled to unveil the municipal 'Green Transit 2030' master plan. Beginning on March 1st, our municipal transit department will deploy forty brand-new zero-emission electric buses across the downtown express transit corridors. Furthermore, the City Council has approved a twenty-million-dollar grant program to subsidize residential rooftop solar panel installations, smart electric heat pumps, and home battery storage systems for qualifying low- and middle-income homeowners. Detailed grant application criteria, income eligibility thresholds, and approved contractor lists will be published on the municipal website at cityofmetro.gov by November 20th.",
          questions: [
            { q: "What is the subject of Mayor Thornton's press announcement?", opts: [{ key: "A", text: "A new downtown commercial real estate tax" }, { key: "B", text: "The municipal 'Green Transit 2030' master plan and solar grants" }, { key: "C", text: "Highway expansion construction plans" }, { key: "D", text: "City council election campaign guidelines" }], a: "B", exp: "Chủ đề: 'unveil the municipal Green Transit 2030 master plan'." },
            { q: "How many electric buses will enter service on March 1st?", opts: [{ key: "A", text: "Twenty buses" }, { key: "B", text: "Forty brand-new zero-emission electric buses" }, { key: "C", text: "Sixty buses" }, { key: "D", text: "One hundred buses" }], a: "B", exp: "Số lượng xe buýt điện: 'deploy forty brand-new zero-emission electric buses'." },
            { q: "What will be published on cityofmetro.gov by November 20th?", opts: [{ key: "A", text: "Bus route schedules only" }, { key: "B", text: "Solar grant application criteria, eligibility thresholds, and approved contractor lists" }, { key: "C", text: "Mayoral campaign speeches" }, { key: "D", text: "Annual city budget balance sheets" }], a: "B", exp: "Nội dung đăng tải: 'application criteria, income eligibility thresholds, and approved contractor lists'." }
          ]
        },
        {
          transcript: "Attention all passengers onboard Pacific Coast Express train service #442 bound for Seattle with scheduled intermediate stops in Portland and Tacoma. Due to freight train switching delays on the main rail corridor ahead, our train will be held on the bypass siding for approximately twenty minutes. During this brief delay, complimentary bottled spring water, hot coffee, and assorted tea are available in the Cafe Lounge located in Car 3. We kindly remind all passengers that smoking and electronic cigarettes are strictly prohibited everywhere onboard the train, including restrooms and exterior vestibules. We appreciate your patience and will provide another progress update as soon as track clearance is signaled.",
          questions: [
            { q: "What is causing the train to be held on the siding?", opts: [{ key: "A", text: "Severe mechanical engine failure" }, { key: "B", text: "Freight train switching delays on the main corridor ahead" }, { key: "C", text: "Flooding on coastal tracks" }, { key: "D", text: "A medical emergency onboard" }], a: "B", exp: "Nguyên nhân dừng tàu: 'freight train switching delays on the main rail corridor ahead'." },
            { q: "Where can passengers obtain complimentary beverages?", opts: [{ key: "A", text: "From trolley attendants in their seats" }, { key: "B", text: "In the Cafe Lounge in Car 3" }, { key: "C", text: "In the luggage storage car" }, { key: "D", text: "At the locomotive engine" }], a: "B", exp: "Nơi nhận đồ uống miễn phí: 'Cafe Lounge located in Car 3'." },
            { q: "What safety rule does the conductor emphasize?", opts: [{ key: "A", text: "Laptops must remain stowed in overhead bins" }, { key: "B", text: "Smoking and electronic cigarettes are strictly prohibited everywhere onboard" }, { key: "C", text: "Passengers must remain seated with seatbelts fastened" }, { key: "D", text: "Cell phone calls are prohibited in all cars" }], a: "B", exp: "Quy định cấm: 'smoking and electronic cigarettes are strictly prohibited everywhere onboard the train'." }
          ]
        },
        {
          transcript: "Good morning and thank you for joining this third-quarter corporate earnings conference call for Horizon Semiconductor Solutions. I am Marcus Vance, Chief Financial Officer. For the third quarter of 2026, Horizon achieved record consolidated revenue of 3.8 billion dollars, representing a sixteen percent year-over-year expansion driven by surging global enterprise demand for our next-generation neural processing chips and automotive microcontrollers. Our gross profit margin expanded to 59.2 percent, while net operating income reached 980 million dollars. In light of strong commercial order backlogs across North America and Europe, we are raising our full-year revenue outlook to 14.5 billion dollars. We will now open the teleconference line for analyst questions.",
          questions: [
            { q: "Who is delivering the corporate financial report?", opts: [{ key: "A", text: "The Chief Executive Officer" }, { key: "B", text: "Marcus Vance, Chief Financial Officer" }, { key: "C", text: "The Director of Human Resources" }, { key: "D", text: "An independent external auditor" }], a: "B", exp: "Diễn giả: 'Marcus Vance, Chief Financial Officer'." },
            { q: "What was Horizon's third-quarter consolidated revenue?", opts: [{ key: "A", text: "1.5 billion dollars" }, { key: "B", text: "2.8 billion dollars" }, { key: "C", text: "3.8 billion dollars" }, { key: "D", text: "14.5 billion dollars" }], a: "C", exp: "Doanh thu Q3: 'record consolidated revenue of 3.8 billion dollars'." },
            { q: "What is Horizon's revised full-year revenue guidance?", opts: [{ key: "A", text: "9.8 billion dollars" }, { key: "B", text: "12.0 billion dollars" }, { key: "C", text: "14.5 billion dollars" }, { key: "D", text: "18.0 billion dollars" }], a: "C", exp: "Dự báo doanh thu cả năm điều chỉnh: 'raising our full-year revenue outlook to 14.5 billion dollars'." }
          ]
        },
        {
          transcript: "Welcome to the Grandview Museum of Art and Design. Before you begin exploring our special retrospective exhibition, 'Pioneers of Scandinavian Modernism,' please review our gallery visitor policies. Non-flash photography for personal, non-commercial use is permitted in Galleries A through D; however, flash equipment, tripods, video lighting rigs, and selfie sticks are strictly prohibited to safeguard delicate textile and canvas artifacts. Multilingual audio guide headsets can be rented at the front reception desk for four dollars in eight languages. Guided curator tours depart from the central marble rotunda every hour on the hour. Finally, outside food and beverages are not permitted inside exhibition halls. We wish you an enriching visit today.",
          questions: [
            { q: "What photographic equipment is strictly prohibited in the galleries?", opts: [{ key: "A", text: "Compact digital cameras" }, { key: "B", text: "Flash equipment, tripods, video lighting rigs, and selfie sticks" }, { key: "C", text: "Smartphones and tablets" }, { key: "D", text: "Prescription eyeglasses" }], a: "B", exp: "Thiết bị cấm: 'flash equipment, tripods, video lighting rigs, and selfie sticks are strictly prohibited'." },
            { q: "How much does audio guide headset rental cost?", opts: [{ key: "A", text: "Two dollars" }, { key: "B", text: "Four dollars" }, { key: "C", text: "Six dollars" }, { key: "D", text: "Free of charge" }], a: "B", exp: "Phí thuê audio guide: 'rented at the front reception desk for four dollars in eight languages'." },
            { q: "Where and when do guided curator tours depart?", opts: [{ key: "A", text: "From the gift shop every thirty minutes" }, { key: "B", text: "From the central marble rotunda every hour on the hour" }, { key: "C", text: "From Gallery D twice daily" }, { key: "D", text: "By private advance reservation only" }], a: "B", exp: "Lịch khởi hành tour: 'depart from the central marble rotunda every hour on the hour'." }
          ]
        },
        {
          transcript: "Attention all logistics and warehouse associates at the Dallas Regional Distribution Center. This is a mandatory safety announcement from the Operations Safety Directorate. Starting Monday, November 10th, all personnel entering the active fulfillment and pallet racking zones must wear high-visibility fluorescent yellow safety vests, steel-toed boots, and hard hats at all times. Furthermore, the maximum motorized forklift operating speed in pedestrian crosswalk aisles has been reduced from eight miles per hour to five miles per hour. Laser speed monitoring sensors have been installed at all aisle intersections. Compliance with these protocols is strictly mandatory, and violations will incur formal disciplinary penalties. Replacement safety gear is available at the Safety Office in Room 104.",
          questions: [
            { q: "What protective gear is mandatory starting November 10th?", opts: [{ key: "A", text: "Lab coats and safety goggles" }, { key: "B", text: "Fluorescent yellow vests, steel-toed boots, and hard hats" }, { key: "C", text: "Earplugs and thermal gloves" }, { key: "D", text: "Dust masks and aprons" }], a: "B", exp: "Trang bị bảo hộ bắt buộc: 'fluorescent yellow safety vests, steel-toed boots, and hard hats'." },
            { q: "What is the new forklift speed limit in pedestrian crosswalk aisles?", opts: [{ key: "A", text: "3 miles per hour" }, { key: "B", text: "5 miles per hour" }, { key: "C", text: "8 miles per hour" }, { key: "D", text: "10 miles per hour" }], a: "B", exp: "Tốc độ xe nâng mới: 'reduced from eight miles per hour to five miles per hour'." },
            { q: "Where can associates obtain replacement safety gear?", opts: [{ key: "A", text: "From the HR reception desk" }, { key: "B", text: "At the Safety Office in Room 104" }, { key: "C", text: "In the employee cafeteria" }, { key: "D", text: "At the front security gate" }], a: "B", exp: "Nơi nhận đồ bảo hộ thay thế: 'available at the Safety Office in Room 104'." }
          ]
        }
      ];

      let p4QNum = 71;
      part4Sets.forEach((set, sIdx) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr3_q${p4QNum}`,
            partNumber: 4,
            partTitle: "Part 4: Short Talks",
            section: "LISTENING",
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(sIdx % 4) + 1}.mp3`,
            passageText: `[Audio Transcript - Talk #${sIdx + 1}]\n${set.transcript}`,
            questionText: `Question ${p4QNum}: ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
          p4QNum++;
        });
      });

      // PART 5: INCOMPLETE SENTENCES (Q101 - Q130: 30 UNIQUE QUESTIONS)
      const part5Data: { q: string; a: "A"|"B"|"C"|"D"; opts: { key: string; text: string }[]; exp: string }[] = [
        { q: "The executive steering committee met yesterday to _______ the final budget allocations for next fiscal year.", a: "A", opts: [{ key: "A", text: "finalize" }, { key: "B", text: "final" }, { key: "C", text: "finally" }, { key: "D", text: "finality" }], exp: "Sau 'to' chỉ mục đích cần động từ nguyên thể 'finalize'." },
        { q: "Dr. Arkwright was _______ appointed as the new head of biomedical research due to his groundbreaking publications.", a: "C", opts: [{ key: "A", text: "unanimous" }, { key: "B", text: "unanimity" }, { key: "C", text: "unanimously" }, { key: "D", text: "unanimousness" }], exp: "Trạng từ 'unanimously' bổ nghĩa cho động từ bị động 'was appointed'." },
        { q: "All visitors must register at the reception desk _______ proceeding to the secure testing laboratories on Floor 3.", a: "B", opts: [{ key: "A", text: "during" }, { key: "B", text: "before" }, { key: "C", text: "while" }, { key: "D", text: "since" }], exp: "Giới từ 'before + V-ing' chỉ hành động phải làm trước khi tiến vào phòng thí nghiệm." },
        { q: "The new electric transport fleet operates much more _______ than the diesel delivery vans used previously.", a: "D", opts: [{ key: "A", text: "economy" }, { key: "B", text: "economical" }, { key: "C", text: "economic" }, { key: "D", text: "economically" }], exp: "Trạng từ 'economically' bổ nghĩa cho động từ 'operates' trong cấu trúc so sánh hơn 'more economically than'." },
        { q: "The human resources division introduced flexible work schedules to boost employee _______ and satisfaction.", a: "B", opts: [{ key: "A", text: "product" }, { key: "B", text: "productivity" }, { key: "C", text: "productive" }, { key: "D", text: "productively" }], exp: "Danh từ 'productivity' (năng suất) song hành với 'satisfaction' sau 'employee'." },
        { q: "_______ severe storm warnings across the coastal county, the international trade conference proceeded on schedule.", a: "C", opts: [{ key: "A", text: "Although" }, { key: "B", text: "Because" }, { key: "C", text: "Despite" }, { key: "D", text: "Whereas" }], exp: "'Despite + noun phrase' chỉ sự nhượng bộ ('Mặc dù có cảnh báo bão lớn...')." },
        { q: "The presentation delivered by Ms. Chen was _______ comprehensive and persuasive.", a: "A", opts: [{ key: "A", text: "both" }, { key: "B", text: "either" }, { key: "C", text: "neither" }, { key: "D", text: "whether" }], exp: "Cặp liên từ tương quan 'both... and...' (vừa toàn diện vừa có tính thuyết phục)." },
        { q: "Please ensure that all quarterly sales receipts are submitted to accounting _______ 5:00 PM on Friday.", a: "B", opts: [{ key: "A", text: "until" }, { key: "B", text: "by" }, { key: "C", text: "within" }, { key: "D", text: "during" }], exp: "'By + thời điểm' biểu thị hạn chót nộp tài liệu." },
        { q: "The resort provides _______ high-speed shuttle transportation between the airport and the private villas.", a: "D", opts: [{ key: "A", text: "compliment" }, { key: "B", text: "complimented" }, { key: "C", text: "complimenting" }, { key: "D", text: "complimentary" }], exp: "Tính từ 'complimentary' mang nghĩa 'miễn phí'." },
        { q: "The updated corporate code of conduct will become _______ on November 1st.", a: "A", opts: [{ key: "A", text: "effective" }, { key: "B", text: "effectively" }, { key: "C", text: "effectiveness" }, { key: "D", text: "effect" }], exp: "Cụm 'become effective on + date' = có hiệu lực từ ngày..." },
        { q: "Dr. Thornton's research on clean hydrogen fuel cells has gained _______ recognition worldwide.", a: "C", opts: [{ key: "A", text: "globe" }, { key: "B", text: "globally" }, { key: "C", text: "global" }, { key: "D", text: "globalize" }], exp: "Tính từ 'global' bổ nghĩa cho danh từ 'recognition'." },
        { q: "Employees working weekend overtime shifts are entitled to receive _______ compensatory pay.", a: "B", opts: [{ key: "A", text: "addition" }, { key: "B", text: "additional" }, { key: "C", text: "additionally" }, { key: "D", text: "add" }], exp: "Tính từ 'additional' bổ nghĩa cho cụm 'compensatory pay'." },
        { q: "The Chief Executive Officer, along with several members of the board of directors, _______ attending the summit in Tokyo.", a: "D", opts: [{ key: "A", text: "are" }, { key: "B", text: "were" }, { key: "C", text: "have been" }, { key: "D", text: "is" }], exp: "Đố mẹo: Cụm 'along with...' không làm đổi số của chủ ngữ 'The CEO' (số ít) → 'is'." },
        { q: "Customers can monitor their live shipment delivery status _______ our secure mobile app.", a: "A", opts: [{ key: "A", text: "through" }, { key: "B", text: "among" }, { key: "C", text: "between" }, { key: "D", text: "across" }], exp: "Giới từ 'through' mang nghĩa 'thông qua / nhờ vào'." },
        { q: "The company's quarterly net profit increased by 16 percent, _______ exceeding initial market forecasts.", a: "C", opts: [{ key: "A", text: "substance" }, { key: "B", text: "substantial" }, { key: "C", text: "substantially" }, { key: "D", text: "substantiate" }], exp: "Trạng từ 'substantially' bổ nghĩa cho phân từ 'exceeding'." },
        { q: "Confidential financial databases must be protected with _______ verified encryption protocols.", a: "B", opts: [{ key: "A", text: "secure" }, { key: "B", text: "securely" }, { key: "C", text: "security" }, { key: "D", text: "securing" }], exp: "Trạng từ 'securely' bổ nghĩa cho tính từ/phân từ 'verified'." },
        { q: "Neither the project director nor the lead software engineers _______ willing to compromise on quality benchmarks.", a: "A", opts: [{ key: "A", text: "were" }, { key: "B", text: "was" }, { key: "C", text: "is" }, { key: "D", text: "has been" }], exp: "Cấu trúc 'Neither A nor B': Động từ chia theo danh từ gần nhất 'software engineers' (số nhiều) → 'were'." },
        { q: "The legal department advised management to negotiate _______ with international licensing authorities.", a: "D", opts: [{ key: "A", text: "cautious" }, { key: "B", text: "caution" }, { key: "C", text: "cautionary" }, { key: "D", text: "cautiously" }], exp: "Trạng từ 'cautiously' bổ nghĩa cho động từ 'negotiate'." },
        { q: "The comprehensive warranty agreement covers all factory defects _______ a duration of five years.", a: "C", opts: [{ key: "A", text: "since" }, { key: "B", text: "at" }, { key: "C", text: "for" }, { key: "D", text: "with" }], exp: "Giới từ 'for + khoảng thời gian' ('for a duration of five years')." },
        { q: "Candidates who complete the senior executive leadership certificate are _______ for rapid executive promotion.", a: "A", opts: [{ key: "A", text: "eligible" }, { key: "B", text: "illegible" }, { key: "C", text: "eligibility" }, { key: "D", text: "eligibly" }], exp: "Tính từ 'eligible for' = đủ tiêu chuẩn / đủ điều kiện." },
        { q: "The safety committee insisted that all factory floor machinery _______ inspected on a weekly basis.", a: "C", opts: [{ key: "A", text: "is" }, { key: "B", text: "was" }, { key: "C", text: "be" }, { key: "D", text: "are" }], exp: "Thức giả định (Subjunctive): 'insisted that S + (should) + V nguyên thể' → 'be inspected'." },
        { q: "Despite fierce market rivalry, Apex Software has consolidated its _______ as the industry's premier cloud provider.", a: "D", opts: [{ key: "A", text: "positioned" }, { key: "B", text: "positional" }, { key: "C", text: "positioning" }, { key: "D", text: "position" }], exp: "Tính từ sở hữu 'its' đi cùng danh từ 'position'." },
        { q: "The conference coordinators arranged _______ shuttle buses for international attendees staying in suburban hotels.", a: "A", opts: [{ key: "A", text: "designated" }, { key: "B", text: "designate" }, { key: "C", text: "designation" }, { key: "D", text: "designating" }], exp: "Tính từ 'designated shuttle buses' (xe buýt được chỉ định riêng)." },
        { q: "The annual marketing budget was adjusted _______ to support the nationwide television promotional campaign.", a: "A", opts: [{ key: "A", text: "upward" }, { key: "B", text: "upwardly" }, { key: "C", text: "upwardness" }, { key: "D", text: "upwarding" }], exp: "Trạng từ 'upward' bổ nghĩa cho 'was adjusted' (điều chỉnh tăng lên)." },
        { q: "The board of directors is evaluating whether to establish a regional office in Singapore _______ Hong Kong.", a: "C", opts: [{ key: "A", text: "nor" }, { key: "B", text: "and" }, { key: "C", text: "or" }, { key: "D", text: "but" }], exp: "Cặp liên từ 'whether... or...'." },
        { q: "Employees requesting medical leave must present a signed certificate _______ the occupational health officer.", a: "D", opts: [{ key: "A", text: "from" }, { key: "B", text: "at" }, { key: "C", text: "with" }, { key: "D", text: "to" }], exp: "Cụm 'present something to someone' (xuất trình giấy tờ cho ai)." },
        { q: "The safety officer gave a clear _______ of emergency evacuation routes during the new hire orientation.", a: "A", opts: [{ key: "A", text: "demonstration" }, { key: "B", text: "demonstrate" }, { key: "C", text: "demonstrative" }, { key: "D", text: "demonstrator" }], exp: "Danh từ 'demonstration' (sự hướng dẫn/thuyết minh) đứng sau tính từ 'clear'." },
        { q: "Ms. Reynolds showed _______ analytical competence when evaluating the international acquisition deal.", a: "C", opts: [{ key: "A", text: "impress" }, { key: "B", text: "impression" }, { key: "C", text: "impressive" }, { key: "D", text: "impressively" }], exp: "Tính từ 'impressive' bổ nghĩa cho cụm 'analytical competence'." },
        { q: "The central corporate library will be closed for digital cataloging upgrades _______ Monday, November 3rd.", a: "B", opts: [{ key: "A", text: "as of" }, { key: "B", text: "starting on" }, { key: "C", text: "prior" }, { key: "D", text: "except" }], exp: "Cụm 'starting on + date' = bắt đầu từ ngày..." },
        { q: "The manufacturing plant reached peak operational efficiency _______ installing smart robotic assembly arms.", a: "A", opts: [{ key: "A", text: "after" }, { key: "B", text: "before" }, { key: "C", text: "during" }, { key: "D", text: "until" }], exp: "Giới từ 'after + V-ing' chỉ mốc thời gian hoàn thành mục tiêu sau khi lắp đặt robot." }
      ];

      part5Data.forEach((item, idx) => {
        const qNum = idx + 101;
        qs.push({
          id: `tlr3_q${qNum}`,
          partNumber: 5,
          partTitle: "Part 5: Incomplete Sentences",
          section: "READING",
          questionText: `${qNum}. ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a,
          explanation: item.exp
        });
      });

      // PART 6: TEXT COMPLETION (Q131 - Q146: 4 PASSAGES × 4 QUESTIONS = 16 QUESTIONS)
      const part6Sets: { passage: string; questions: { blank: number; q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        {
          passage: "MEMORANDUM\nTo: All Regional Logistics Personnel\nFrom: Executive Operations Committee\nDate: October 28, 2026\nSubject: Rollout of Smart Fleet Telematics\n\nEffective November 15, 2026, all commercial delivery trucks across our North American logistics network will be equipped with real-time GPS telematics and automated fuel monitoring sensors. This corporate upgrade is part of our strategic [131] _______ to improve driver safety and reduce fleet fuel consumption by twenty-five percent.\n\nAll drivers must complete the online digital vehicle inspection training module [132] _______ November 10. Fleet supervisors will conduct hands-on hardware familiarization sessions at each regional depot next Wednesday. [133] _______, drivers will receive new mobile tablet devices to log digital proof-of-delivery signatures.\n\n[134] _______. Thank you for your commitment to operational excellence.",
          questions: [
            { blank: 131, q: "Select the best word for blank [131].", opts: [{ key: "A", text: "initiative" }, { key: "B", text: "initiating" }, { key: "C", text: "initiated" }, { key: "D", text: "initiator" }], a: "A", exp: "Danh từ 'initiative' (sáng kiến/kế hoạch chiến lược) sau tính từ 'strategic'." },
            { blank: 132, q: "Select the best word for blank [132].", opts: [{ key: "A", text: "prior to" }, { key: "B", text: "since" }, { key: "C", text: "except" }, { key: "D", text: "without" }], a: "A", exp: "Cụm 'prior to + date' = trước ngày 10/11." },
            { blank: 133, q: "Select the best transition word for blank [133].", opts: [{ key: "A", text: "In addition" }, { key: "B", text: "However" }, { key: "C", text: "Conversely" }, { key: "D", text: "Nevertheless" }], a: "A", exp: "'In addition' bổ sung thêm thông tin về việc trang bị máy tính bảng mới." },
            { blank: 134, q: "Select the most appropriate sentence for blank [134].", opts: [{ key: "A", text: "The cafeteria lunch menu has been updated for autumn." }, { key: "B", text: "Technical helpdesk support will be available 24/7 during the entire rollout period." }, { key: "C", text: "The annual company picnic took place in July." }, { key: "D", text: "Warehouse storage leases must be renewed annually." }], a: "B", exp: "Câu B cung cấp thông tin đường dây hỗ trợ kỹ thuật 24/7 trong suốt quá trình triển khai hệ thống mới." }
          ]
        },
        {
          passage: "PRESS RELEASE — FOR IMMEDIATE RELEASE\nZenith Semiconductor Unveils Ultra-Efficient AI Chipset\nAUSTIN, TX — October 30, 2026\n\nZenith Semiconductor today introduced its next-generation NeuralCore 8000 microprocessor, engineered specifically for enterprise deep-learning data centers. The cutting-edge 2-nanometer architecture achieves a 350% performance acceleration while [135] _______ 50% less electrical power than previous generations.\n\n\"The NeuralCore 8000 sets a new benchmark in sustainable computing infrastructure,\" stated Dr. Elena Rostova, Chief Technology Officer. \"It enables cloud service providers to train large generative language models [136] _______ while significantly lowering carbon emissions.\"\n\nVolume commercial shipments to enterprise cloud partners are [137] _______ to begin in March 2027.\n\n[138] _______. For investor relations data, visit zenithsemi.com/investors.",
          questions: [
            { blank: 135, q: "Select the best word for blank [135].", opts: [{ key: "A", text: "consuming" }, { key: "B", text: "consumption" }, { key: "C", text: "consumed" }, { key: "D", text: "consumer" }], a: "A", exp: "Dạng phân từ 'while consuming 50% less electrical power' (trong khi tiêu thụ ít điện hơn 50%)." },
            { blank: 136, q: "Select the best word for blank [136].", opts: [{ key: "A", text: "efficient" }, { key: "B", text: "efficiency" }, { key: "C", text: "efficiently" }, { key: "D", text: "efficientness" }], a: "C", exp: "Trạng từ 'efficiently' bổ nghĩa cho động từ 'to train'." },
            { blank: 137, q: "Select the best word for blank [137].", opts: [{ key: "A", text: "scheduled" }, { key: "B", text: "scheduling" }, { key: "C", text: "schedule" }, { key: "D", text: "schedules" }], a: "A", exp: "Cụm bị động 'are scheduled to begin' (được lên kế hoạch bắt đầu)." },
            { blank: 138, q: "Select the most appropriate sentence for blank [138].", opts: [{ key: "A", text: "The company was founded in a small garage in 1998." }, { key: "B", text: "Comprehensive technical white papers and benchmarking reports are accessible on the company website." }, { key: "C", text: "Employee parking passes will be renewed next month." }, { key: "D", text: "The corporate headquarters will relocate to London." }], a: "B", exp: "Câu B cung cấp thông tin tài liệu kỹ thuật sau sự kiện công bố sản phẩm mới." }
          ]
        },
        {
          passage: "RESIDENTIAL NOTICE — HARBORVIEW RESIDENCES\nProperty Management Directorate\nDate: October 26, 2026\n\nDear Residents,\n\nPlease be advised that annual fire sprinkler safety inspections and water pressure testing will take place from Tuesday, November 11 through Thursday, November 13, between 9:00 AM and 4:30 PM daily. Certified technicians from Metro Fire Safety will access all residential corridors and utility risers.\n\nDuring testing windows, building alarm bells may sound intermittently for [139] _______ intervals. Please do not call emergency services when alarms sound during scheduled testing hours. [140] _______, please ensure that all hallway storage lockers are kept clear of obstructions to facilitate technician access.\n\nWe [141] _______ apologize for any temporary noise disruption during these mandatory safety procedures.\n\n[142] _______. Thank you for your cooperation.\n\nHarborview Management Office",
          questions: [
            { blank: 139, q: "Select the best word for blank [139].", opts: [{ key: "A", text: "brief" }, { key: "B", text: "briefly" }, { key: "C", text: "briefness" }, { key: "D", text: "briefing" }], a: "A", exp: "Tính từ 'brief' (ngắn/nhanh) bổ nghĩa cho danh từ 'intervals'." },
            { blank: 140, q: "Select the best transition word for blank [140].", opts: [{ key: "A", text: "Additionally" }, { key: "B", text: "Conversely" }, { key: "C", text: "Otherwise" }, { key: "D", text: "Nevertheless" }], a: "A", exp: "'Additionally' bổ sung thêm yêu cầu thứ hai cho cư dân (dọn lối đi hành lang)." },
            { blank: 141, q: "Select the best word for blank [141].", opts: [{ key: "A", text: "sincere" }, { key: "B", text: "sincerely" }, { key: "C", text: "sincerity" }, { key: "D", text: "sincerest" }], a: "B", exp: "Trạng từ lịch sự 'sincerely apologize' (chân thành xin lỗi)." },
            { blank: 142, q: "Select the most appropriate sentence for blank [142].", opts: [{ key: "A", text: "The rooftop swimming pool is open from 6:00 AM to 10:00 PM." }, { key: "B", text: "For questions or special assistance, please contact the building superintendent at extension 204." }, { key: "C", text: "Monthly rental payments are due on the first of each month." }, { key: "D", text: "The underground parking garage was repainted last month." }], a: "B", exp: "Câu B cung cấp thông tin liên hệ ban quản lý khi cần hỗ trợ khẩn cấp." }
          ]
        },
        {
          passage: "CAREER OPPORTUNITY — SENIOR DATA SCIENTIST\nCompany: NovaTech Analytics | Location: Chicago, IL (Hybrid)\n\nNovaTech Analytics is seeking an innovative and results-driven Senior Data Scientist to spearhead our predictive consumer behavior modeling team. The successful applicant will design machine learning architectures, optimize recommendation algorithms, and translate complex data patterns into actionable business insights.\n\nCandidates must hold a master's or doctoral degree in Computer Science, Applied Statistics, or a related computational discipline, accompanied by at least four years of professional experience in production machine learning deployment. [143] _______ in Python, PyTorch, and SQL is strictly required. [144] _______, experience with distributed cloud frameworks like AWS SageMaker or Google Vertex AI is highly advantageous.\n\nWe offer an exceptional compensation package [145] _______ equity stock options, comprehensive medical coverage, and a $5,000 annual continuous education stipend.\n\n[146] _______. Submit your resume and GitHub portfolio link to careers@novatechanalytics.com by November 25, 2026.",
          questions: [
            { blank: 143, q: "Select the best word for blank [143].", opts: [{ key: "A", text: "Proficient" }, { key: "B", text: "Proficiency" }, { key: "C", text: "Proficiently" }, { key: "D", text: "Proficiencies" }], a: "B", exp: "Danh từ không đếm được 'Proficiency in Python...' (Sự thành thạo ngôn ngữ Python)." },
            { blank: 144, q: "Select the best transition word for blank [144].", opts: [{ key: "A", text: "Furthermore" }, { key: "B", text: "However" }, { key: "C", text: "In contrast" }, { key: "D", text: "Otherwise" }], a: "A", exp: "'Furthermore' bổ sung thêm điều kiện ưu tiên về nền tảng đám mây." },
            { blank: 145, q: "Select the best word for blank [145].", opts: [{ key: "A", text: "include" }, { key: "B", text: "including" }, { key: "C", text: "inclusion" }, { key: "D", text: "inclusive" }], a: "B", exp: "Giới từ/phân từ 'including' (bao gồm các phúc lợi đãi ngộ)." },
            { blank: 146, q: "Select the most appropriate sentence for blank [146].", opts: [{ key: "A", text: "The Chicago office features an on-site espresso bar and fitness facility." }, { key: "B", text: "Only candidates selected for technical coding interviews will be contacted by our talent acquisition team." }, { key: "C", text: "The company was established in 2015 by two university graduates." }, { key: "D", text: "Relocation assistance is not offered for this opening." }], a: "B", exp: "Câu B thông báo quy trình phỏng vấn chuyên môn sau khi nộp hồ sơ." }
          ]
        }
      ];

      part6Sets.forEach((set) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr3_q${qItem.blank}`,
            partNumber: 6,
            partTitle: "Part 6: Text Completion",
            section: "READING",
            passageText: set.passage,
            questionText: `${qItem.blank}. ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
        });
      });

      // PART 7: READING COMPREHENSION (Q147 - Q200: 54 UNIQUE QUESTIONS)
      const part7Sets: { passages: string; questions: { qNum: number; q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        // SINGLE 1 (Q147-151): Executive conference center advertisement
        {
          passages: "[MAGAZINE ADVERTISEMENT]\n\nPINECREST EXECUTIVE CONFERENCE RETREAT — Where Vision Meets Inspiration\nLocated in the Scenic Cascade Foothills, Just 45 Minutes from Downtown Seattle\n\nAre you planning an executive leadership retreat, corporate strategic planning summit, or annual corporate milestone celebration? Pinecrest Conference Center provides world-class meeting environments nestled amidst 120 acres of pristine evergreen woodland.\n\nOur Comprehensive Conference Facilities Include:\n• 15 Ergonomic Meeting Rooms: Equipped with 4K laser projectors, acoustic isolation walls, and interactive digital whiteboards.\n• Grand Summit Ballroom (Capacity: 350 Guests): Ideal for keynote presentations, award banquets, and hybrid international broadcasts.\n• Farm-to-Table Culinary Dining: Executive Chef Marcus Vance crafts seasonal menus featuring locally sourced Pacific Northwest organic ingredients.\n• On-Site Luxury Lodging: 85 boutique guest suites featuring high-speed fiber internet, private forest-view balconies, and spa-inspired bathrooms.\n\nAll Conference Packages Include:\n— Dedicated on-site audiovisual technician and event concierge\n— Continuous gourmet coffee, herbal teas, and artisanal afternoon pastries\n— Complimentary access to our fitness wellness center, heated indoor pool, and forest walking trails\n\nBook your 2027 corporate retreat before December 15, 2026 and receive a 15% discount on all guest suite accommodations! Visit pinecrestcenter.com or call (555) 890-4400 to speak with our event coordinators.",
          questions: [
            { qNum: 147, q: "What is the primary service advertised by Pinecrest Conference Center?", opts: [{ key: "A", text: "Commercial airline ticketing services" }, { key: "B", text: "Executive corporate retreats and conference event hosting" }, { key: "C", text: "Residential real estate home sales" }, { key: "D", text: "Commercial office furniture leasing" }], a: "B", exp: "Mục đích quảng cáo: Tổ chức hội nghị hội thảo và nghỉ dưỡng chiến lược cho doanh nghiệp." },
            { qNum: 148, q: "How far is the retreat located from downtown Seattle?", opts: [{ key: "A", text: "15 minutes" }, { key: "B", text: "30 minutes" }, { key: "C", text: "45 minutes" }, { key: "D", text: "Two hours" }], a: "C", exp: "Khoảng cách: 'Just 45 Minutes from Downtown Seattle'." },
            { qNum: 149, q: "What is the maximum guest capacity of the Grand Summit Ballroom?", opts: [{ key: "A", text: "85 guests" }, { key: "B", text: "150 guests" }, { key: "C", text: "350 guests" }, { key: "D", text: "500 guests" }], a: "C", exp: "Sức chứa phòng đại tiệc: 'Grand Summit Ballroom (Capacity: 350 Guests)'." },
            { qNum: 150, q: "How many boutique guest suites are available on-site?", opts: [{ key: "A", text: "15 suites" }, { key: "B", text: "50 suites" }, { key: "C", text: "85 boutique guest suites" }, { key: "D", text: "120 suites" }], a: "C", exp: "Số lượng phòng nghỉ: '85 boutique guest suites'." },
            { qNum: 151, q: "What promotional incentive is offered for bookings made before December 15, 2026?", opts: [{ key: "A", text: "Free roundtrip helicopter airport transfers" }, { key: "B", text: "A 15% discount on all guest suite accommodations" }, { key: "C", text: "Complimentary dinner banquets for all guests" }, { key: "D", text: "A free annual corporate golf membership" }], a: "B", exp: "Ưu đãi đặt sớm: 'receive a 15% discount on all guest suite accommodations'." }
          ]
        },
        // SINGLE 2 (Q152-155): Corporate memo on hybrid workplace policy
        {
          passages: "[INTERNAL MEMORANDUM]\nTO: All Personnel — Zenith Financial Solutions\nFROM: David Sterling, Chief Human Resources Officer\nDATE: October 24, 2026\nSUBJECT: Updated Hybrid Workplace Policy and Core Collaboration Days\n\nFollowing extensive employee survey feedback and managerial reviews, executive leadership is pleased to announce our updated Hybrid Workplace Framework, effective January 1, 2027.\n\nKey Policy Guidelines:\n1. Core In-Office Collaboration Days: All corporate personnel are required to work on-site at their regional branch offices on Tuesdays and Thursdays. These core days will be designated for team brainstorming, cross-departmental alignment, and client briefings.\n2. Flexible Remote Days: Employees in eligible roles may choose to work remotely from home on Mondays, Wednesdays, and Fridays, subject to manager approval.\n3. Workspace Hot-Desking Reservation: To accommodate our flexible seating model, employees must reserve desk workstations and meeting rooms via our 'ZenithDesk' mobile portal at least 24 hours in advance.\n\nDepartment managers will host informational town hall sessions next week to address questions regarding equipment stipends for home workstations and team schedule coordination.\n\nThank you for your ongoing dedication to collaborative innovation.",
          questions: [
            { qNum: 152, q: "When does the updated Hybrid Workplace Policy take effect?", opts: [{ key: "A", text: "Immediately" }, { key: "B", text: "On November 1, 2026" }, { key: "C", text: "On January 1, 2027" }, { key: "D", text: "In mid-2027" }], a: "C", exp: "Ngày áp dụng chính sách: 'effective January 1, 2027'." },
            { qNum: 153, q: "Which days are designated as mandatory core in-office collaboration days?", opts: [{ key: "A", text: "Mondays and Wednesdays" }, { key: "B", text: "Tuesdays and Thursdays" }, { key: "C", text: "Fridays only" }, { key: "D", text: "Monday through Friday" }], a: "B", exp: "Ngày làm việc tại văn phòng bắt buộc: 'Tuesdays and Thursdays'." },
            { qNum: 154, q: "How far in advance must employees reserve desk workstations on the mobile portal?", opts: [{ key: "A", text: "12 hours" }, { key: "B", text: "At least 24 hours in advance" }, { key: "C", text: "Three days" }, { key: "D", text: "One week" }], a: "B", exp: "Thời gian đặt bàn trước: 'at least 24 hours in advance'." },
            { qNum: 155, q: "What will department managers do next week?", opts: [{ key: "A", text: "Conduct individual employee salary reviews" }, { key: "B", text: "Host informational town hall sessions to address questions" }, { key: "C", text: "Collect all corporate laptop computers" }, { key: "D", text: "Inspect home office ergonomic setups" }], a: "B", exp: "Kế hoạch tuần tới: 'host informational town hall sessions next week to address questions'." }
          ]
        },
        // SINGLE 3 (Q156-159): Technology article on commercial solid-state batteries
        {
          passages: "[TECHNOLOGY JOURNAL ARTICLE]\n\nSolid-State Batteries: Powering the Future of Electric Mobility\nBy Dr. Marcus Chen | Clean Energy Technology Review | October 20, 2026\n\nThe global automotive industry is on the verge of a historic leap in energy storage as solid-state battery technology transitions from experimental laboratory research to certified commercial mass production. Earlier this month, CleanVolt Energy completed road testing of its proprietary solid-electrolyte battery pack installed in a prototype electric SUV, achieving an unprecedented single-charge driving range of 620 miles under real-world highway conditions.\n\nUnlike conventional lithium-ion batteries that utilize flammable liquid electrolytes, solid-state batteries employ dense ceramic or polymer electrolytes. This architectural breakthrough yields three transformative benefits: energy density is increased by over 70 percent, thermal runaway fire risks are virtually eliminated, and high-speed fast charging from 10% to 80% capacity is reduced to under twelve minutes.\n\nMajor automotive consortia, including Toyota, Ford, and BMW, have committed over $18 billion in joint manufacturing facilities across North America and Europe, targeting widespread consumer vehicle rollouts by 2028. However, industry analysts note that commercial scale-up will require overcoming manufacturing yield bottlenecks and securing reliable supplies of high-purity lithium sulfide precursors.",
          questions: [
            { qNum: 156, q: "What single-charge driving range was achieved during CleanVolt's SUV test?", opts: [{ key: "A", text: "350 miles" }, { key: "B", text: "450 miles" }, { key: "C", text: "620 miles" }, { key: "D", text: "1,000 miles" }], a: "C", exp: "Quãng đường thử nghiệm: 'achieving an unprecedented single-charge driving range of 620 miles'." },
            { qNum: 157, q: "How much does energy density increase compared to traditional lithium-ion batteries?", opts: [{ key: "A", text: "By 25 percent" }, { key: "B", text: "By 40 percent" }, { key: "C", text: "By over 70 percent" }, { key: "D", text: "By 100 percent" }], a: "C", exp: "Tăng mật độ năng lượng: 'energy density is increased by over 70 percent'." },
            { qNum: 158, q: "How fast can solid-state batteries charge from 10% to 80% capacity?", opts: [{ key: "A", text: "Under five minutes" }, { key: "B", text: "Under twelve minutes" }, { key: "C", text: "Thirty minutes" }, { key: "D", text: "One hour" }], a: "B", exp: "Thời gian sạc nhanh: 'fast charging from 10% to 80% capacity is reduced to under twelve minutes'." },
            { qNum: 159, q: "What raw material supply chain challenge is mentioned in the article?", opts: [{ key: "A", text: "A shortage of copper wire" }, { key: "B", text: "Securing reliable supplies of high-purity lithium sulfide precursors" }, { key: "C", text: "Scarcity of synthetic rubber" }, { key: "D", text: "A global shortage of steel casings" }], a: "B", exp: "Thách thức chuỗi cung ứng: 'securing reliable supplies of high-purity lithium sulfide precursors'." }
          ]
        },
        // SINGLE 4 (Q160-163): Corporate equipment warranty and maintenance policy
        {
          passages: "[CUSTOMER SERVICE NOTICE — APEX PRECISION INSTRUMENTS]\nTo: All Certified Equipment Owners and Laboratory Directors\nDate: October 15, 2026\nSubject: Updated Warranty Terms and Preventative Calibration Service\n\nThank you for selecting Apex Precision Instruments for your diagnostic and analytical laboratory operations. To ensure optimal analytical accuracy and extend equipment longevity, we are updating our standard warranty and preventative maintenance protocols effective November 1, 2026.\n\nKey Warranty Provisions:\n1. Three-Year Comprehensive Coverage: All new Apex analytical instruments include full parts and labor warranty coverage for thirty-six months from the installation date against all manufacturing and electronic component defects.\n2. Mandatory Semi-Annual Calibration: To maintain warranty validity, instruments must undergo certified optical and mechanical calibration every six months by an authorized Apex field service engineer.\n3. Emergency On-Site Response: In the event of an unscheduled hardware failure, our technical dispatch team guarantees an on-site technician arrival within 4 business hours for metropolitan laboratories and within 12 business hours for regional facilities.\n\nTo schedule your upcoming semi-annual calibration appointment, please visit apexinstruments.com/service or contact our 24/7 technical hotline at 1-800-555-APEX.",
          questions: [
            { qNum: 160, q: "How long is the standard warranty coverage period?", opts: [{ key: "A", text: "12 months" }, { key: "B", text: "24 months" }, { key: "C", text: "36 months (Three years)" }, { key: "D", text: "Five years" }], a: "C", exp: "Thời hạn bảo hành: 'full parts and labor warranty coverage for thirty-six months'." },
            { qNum: 161, q: "How frequently must instruments undergo certified calibration to maintain warranty validity?", opts: [{ key: "A", text: "Every month" }, { key: "B", text: "Every six months (Semi-annually)" }, { key: "C", text: "Annually" }, { key: "D", text: "Only when an error code appears" }], a: "B", exp: "Tần suất hiệu chuẩn định kỳ: 'undergo certified optical and mechanical calibration every six months'." },
            { qNum: 162, q: "What is the guaranteed technician response time for metropolitan laboratories during an emergency?", opts: [{ key: "A", text: "Within 2 hours" }, { key: "B", text: "Within 4 business hours" }, { key: "C", text: "Within 12 business hours" }, { key: "D", text: "Within 24 business hours" }], a: "B", exp: "Thời gian phản hồi kỹ thuật viên tại đô thị: 'on-site technician arrival within 4 business hours for metropolitan laboratories'." },
            { qNum: 163, q: "Where can customers schedule their calibration appointments?", opts: [{ key: "A", text: "By mailing a paper postcard" }, { key: "B", text: "At apexinstruments.com/service or via the 24/7 hotline" }, { key: "C", text: "At any local hardware retail store" }, { key: "D", text: "By visiting company headquarters in person" }], a: "B", exp: "Cách đặt lịch hiệu chuẩn: 'visit apexinstruments.com/service or contact our 24/7 technical hotline'." }
          ]
        },
        // SINGLE 5 (Q164-168): Hotel sustainability and corporate social impact report
        {
          passages: "[ANNUAL REPORT EXCERPT — HORIZON HOSPITALITY GROUP]\n2025 Corporate Environmental Sustainability & Social Responsibility Summary\nPublished: October 1, 2026\n\nHorizon Hospitality Group operates 160 luxury hotel and resort properties across 28 countries. Over the past fiscal year, our organization accelerated investments in sustainable hospitality, achieving historic milestones in resource conservation and community empowerment.\n\n2025 Key Achievements:\n• 100% Elimination of Single-Use Plastics: Replaced all single-use plastic guest amenity bottles, straws, and laundry wraps across all 160 properties with refillable ceramic containers and biodegradable packaging, eliminating 22 million plastic items annually.\n• Renewable Electricity Transition: Sourced 68 percent of total hotel electrical power from certified solar and wind generation contracts, up from 48 percent in 2024.\n• Water Efficiency Initiatives: Installed aerated smart showerheads and greywater recycling systems, reducing per-occupied-room water consumption by 24 percent.\n• Farm-to-Table Sourcing: 75 percent of all kitchen produce was procured from certified organic farms located within a 75-mile radius of each hotel property.\n\nStrategic Targets for 2028:\n— Attain net-zero operational carbon emissions across all North American and European resorts\n— Fund $12 million in vocational culinary and hospitality scholarships in developing communities\n— Divert 95 percent of all hotel solid waste from municipal landfills through commercial composting\n\nFor the complete audited 95-page ESG report, visit horizonhotels.com/sustainability.",
          questions: [
            { qNum: 164, q: "How many properties does Horizon Hospitality Group operate worldwide?", opts: [{ key: "A", text: "28 properties" }, { key: "B", text: "75 properties" }, { key: "C", text: "160 luxury hotel and resort properties" }, { key: "D", text: "200 properties" }], a: "C", exp: "Số lượng khách sạn: 'operates 160 luxury hotel and resort properties across 28 countries'." },
            { qNum: 165, q: "How many single-use plastic items were eliminated annually?", opts: [{ key: "A", text: "5 million items" }, { key: "B", text: "12 million items" }, { key: "C", text: "22 million plastic items" }, { key: "D", text: "50 million items" }], a: "C", exp: "Số đồ nhựa dùng 1 lần bị loại bỏ: 'eliminating 22 million plastic items annually'." },
            { qNum: 166, q: "What percentage of electricity was sourced from renewables in 2025?", opts: [{ key: "A", text: "24 percent" }, { key: "B", text: "48 percent" }, { key: "C", text: "68 percent" }, { key: "D", text: "95 percent" }], a: "C", exp: "Bẫy số liệu: 48% là năm 2024. Năm 2025: '68 percent of total hotel electrical power'." },
            { qNum: 167, q: "Within what geographic radius is 75% of kitchen produce procured?", opts: [{ key: "A", text: "Within 25 miles" }, { key: "B", text: "Within 50 miles" }, { key: "C", text: "Within a 75-mile radius" }, { key: "D", text: "Within 150 miles" }], a: "C", exp: "Bán kính thu mua nông sản hữu cơ: 'within a 75-mile radius of each hotel property'." },
            { qNum: 168, q: "What scholarship commitment is planned for 2028?", opts: [{ key: "A", text: "$5 million" }, { key: "B", text: "$8 million" }, { key: "C", text: "$12 million in vocational culinary and hospitality scholarships" }, { key: "D", text: "$20 million" }], a: "C", exp: "Quỹ học bổng nghề: 'Fund $12 million in vocational culinary and hospitality scholarships'." }
          ]
        },
        // SINGLE 6 (Q169-175): Detailed conference program and keynote speaker bios
        {
          passages: "[CONFERENCE SCHEDULE & SPEAKER BIOGRAPHIES]\n\nGLOBAL AI & ENTERPRISE COMPUTING SUMMIT 2026\nVenue: Moscone Convention Center, San Francisco, CA | Dates: November 12-14, 2026\n\nDay 1 Featured Keynote Presentations:\n\n• 09:00 AM — Dr. Yukihiro Tanaka (Chief AI Scientist, QuantumCore Labs)\nKeynote Address: 'Scaling Generative Foundation Models with Sub-2nm Supercomputing Architecture'\nBiography: Dr. Tanaka holds a Ph.D. in Computer Engineering from Kyoto University and has published over 50 peer-reviewed papers on neural network acceleration. He previously served as Senior Principal Architect at the Japan Advanced Institute of Science.\n\n• 11:15 AM — Ms. Priya Sharma (VP of Enterprise AI Ethics, Global Tech Governance Council)\nKeynote Address: 'Navigating Algorithmic Fairness, Copyright Compliance, and Regulatory Frameworks'\nBiography: Priya has advised international regulatory bodies across the EU and ASEAN on AI privacy legislation and autonomous compliance standards for over fifteen years.\n\n• 02:00 PM — Mr. Liam O'Connor (Founder & CEO, DataFlow Global)\nKeynote Address: 'Autonomous Data Pipelines: Real-Time Streaming Analytics for Global Fintech'\nBiography: Liam founded DataFlow Global in 2018, expanding it into an enterprise platform processing over 50 billion transactions daily. He was named 'Enterprise Technologist of the Year' by Silicon Valley Review in 2025.\n\nAfternoon Workshops & Social Events:\n— 03:45 PM: Interactive Workshop: Migrating Enterprise Workloads to Serverless Kubernetes (Room 304)\n— 05:30 PM: Welcome Cocktail Reception & Startup Pitch Awards (Rooftop Panorama Terrace)\n\nRegistration Passes: Standard Conference Pass ($799), VIP Executive Pass ($1,199 — includes private speaker lounge access and VIP dinner).",
          questions: [
            { qNum: 169, q: "Where is the Global AI Summit being held?", opts: [{ key: "A", text: "Seattle Convention Center" }, { key: "B", text: "Moscone Convention Center, San Francisco, CA" }, { key: "C", text: "Chicago Expo Center" }, { key: "D", text: "Austin City Hall" }], a: "B", exp: "Địa điểm hội nghị: 'Moscone Convention Center, San Francisco, CA'." },
            { qNum: 170, q: "What is the topic of Dr. Yukihiro Tanaka's keynote presentation?", opts: [{ key: "A", text: "Copyright compliance in media" }, { key: "B", text: "Scaling Generative Foundation Models with Sub-2nm Supercomputing Architecture" }, { key: "C", text: "Serverless Kubernetes migration" }, { key: "D", text: "Fintech payment routing" }], a: "B", exp: "Chủ đề phát biểu của Dr. Tanaka: 'Scaling Generative Foundation Models with Sub-2nm Supercomputing Architecture'." },
            { qNum: 171, q: "Where did Dr. Tanaka earn his doctoral degree?", opts: [{ key: "A", text: "Tokyo University" }, { key: "B", text: "Kyoto University" }, { key: "C", text: "Stanford University" }, { key: "D", text: "MIT" }], a: "B", exp: "Học vị: 'Ph.D. in Computer Engineering from Kyoto University'." },
            { qNum: 172, q: "Who is delivering the keynote address on AI ethics at 11:15 AM?", opts: [{ key: "A", text: "Dr. Yukihiro Tanaka" }, { key: "B", text: "Ms. Priya Sharma" }, { key: "C", text: "Mr. Liam O'Connor" }, { key: "D", text: "David Sterling" }], a: "B", exp: "Diễn giả 11:15 AM: 'Ms. Priya Sharma'." },
            { qNum: 173, q: "How many daily transactions does Liam O'Connor's platform process?", opts: [{ key: "A", text: "500 million" }, { key: "B", text: "10 billion" }, { key: "C", text: "Over 50 billion transactions daily" }, { key: "D", text: "100 billion" }], a: "C", exp: "Số lượng giao dịch hàng ngày: 'processing over 50 billion transactions daily'." },
            { qNum: 174, q: "Where will the Welcome Cocktail Reception take place at 5:30 PM?", opts: [{ key: "A", text: "Room 304" }, { key: "B", text: "The Grand Ballroom" }, { key: "C", text: "The Rooftop Panorama Terrace" }, { key: "D", text: "The Main Lobby" }], a: "C", exp: "Địa điểm tiệc tối: 'Rooftop Panorama Terrace'." },
            { qNum: 175, q: "How much does the VIP Executive Pass cost?", opts: [{ key: "A", text: "$499" }, { key: "B", text: "$799" }, { key: "C", text: "$1,199" }, { key: "D", text: "$1,500" }], a: "C", exp: "Giá vé VIP: 'VIP Executive Pass ($1,199)'." }
          ]
        },
        // DOUBLE 1 (Q176-180): Purchase inquiry & Quotation response
        {
          passages: "[EMAIL 1 — PURCHASE INQUIRY]\nFrom: marcus.vance@apexlogistics.com\nTo: sales@novasystems.com\nDate: October 8, 2026\nSubject: Request for Quotation — Enterprise Data Center Server Cabinets\n\nDear Nova Systems Commercial Sales Team,\n\nApex Logistics is expanding our cloud infrastructure facility in Dallas, Texas. We would like to request an official quotation for the following items:\n\n1. NovaRack 42U Heavy-Duty Server Enclosures (Model NR-4200) — Quantity: 15 units\n2. Smart Monitored Power Distribution Units (Model PDU-800) — Quantity: 30 units\n3. Cat6A 48-Port Shielded Patch Panels (Model PP-48) — Quantity: 30 units\n\nPlease include freight delivery charges to our Dallas facility (Zip: 75201) and confirm your estimated delivery lead times. We also request information regarding bulk purchase volume discounts for orders exceeding $30,000.\n\nThank you for your prompt assistance.\n\nSincerely,\nMarcus Vance\nDirector of IT Infrastructure\nApex Logistics\n\n---\n\n[EMAIL 2 — FORMAL SALES QUOTATION]\nFrom: jennifer.stone@novasystems.com\nTo: marcus.vance@apexlogistics.com\nDate: October 9, 2026\nSubject: RE: Formal Quotation #QUO-99412 — Apex Data Center Project\n\nDear Mr. Vance,\n\nThank you for your inquiry. Nova Systems is pleased to provide formal Quotation #QUO-99412 for your Dallas datacenter expansion:\n\n• Line 1: NovaRack 42U Enclosures (NR-4200) x15 @ $1,200/unit = $18,000.00\n• Line 2: Smart PDU Units (PDU-800) x30 @ $360/unit = $10,800.00\n• Line 3: Cat6A Patch Panels (PP-48) x30 @ $130/unit = $3,900.00\n\nSubtotal: $32,700.00\nBulk Volume Discount (10% on orders exceeding $30,000): -$3,270.00\nDiscounted Equipment Total: $29,430.00\nFreight Shipping (Dedicated Direct Transport to Dallas, TX): $750.00\nFinal Invoice Total: $30,180.00\n\nLead Time: In-stock items ship within 2 business days; transit time to Dallas is 2 days.\nQuote Validity: 30 days from date of issuance.\nPayment Terms: Net 30 upon credit approval.\n\nPlease reply with a signed purchase order to initiate shipment processing.\n\nBest regards,\nJennifer Stone\nSenior Enterprise Account Executive\nNova Systems",
          questions: [
            { qNum: 176, q: "Where will the datacenter equipment be delivered?", opts: [{ key: "A", text: "Seattle, WA" }, { key: "B", text: "Dallas, Texas (Zip: 75201)" }, { key: "C", text: "Chicago, IL" }, { key: "D", text: "Denver, CO" }], a: "B", exp: "Địa điểm giao hàng: 'Dallas facility (Zip: 75201)'." },
            { qNum: 177, q: "What is the unit price for the NovaRack 42U enclosures on the quote?", opts: [{ key: "A", text: "$360" }, { key: "B", text: "$1,200" }, { key: "C", text: "$1,500" }, { key: "D", text: "$3,270" }], a: "B", exp: "Đơn giá tủ rack: '$1,200/unit'." },
            { qNum: 178, q: "What bulk discount percentage was applied to the order?", opts: [{ key: "A", text: "5 percent" }, { key: "B", text: "8 percent" }, { key: "C", text: "10 percent" }, { key: "D", text: "15 percent" }], a: "C", exp: "Mức giảm giá đơn hàng lớn: 'Bulk Volume Discount (10% on orders exceeding $30,000)'." },
            { qNum: 179, q: "What is the final invoice total including freight shipping?", opts: [{ key: "A", text: "$29,430.00" }, { key: "B", text: "$30,180.00" }, { key: "C", text: "$32,700.00" }, { key: "D", text: "$33,450.00" }], a: "B", exp: "Tổng tiền thanh toán cuối cùng: 'Final Invoice Total: $30,180.00'." },
            { qNum: 180, q: "How long is the quotation valid from the date of issuance?", opts: [{ key: "A", text: "7 days" }, { key: "B", text: "14 days" }, { key: "C", text: "30 days" }, { key: "D", text: "60 days" }], a: "C", exp: "Hiệu lực báo giá: 'Quote Validity: 30 days from date of issuance'." }
          ]
        },
        // DOUBLE 2 (Q181-185): Job posting & Candidate cover letter
        {
          passages: "[DOCUMENT 1 — JOB VACANCY ANNOUNCEMENT]\n\nPRINCIPAL CLOUD SOLUTIONS ARCHITECT\nCompany: CloudPulse Technologies | Location: Seattle, WA | Type: Full-Time\nSalary Range: $160,000 - $190,000 + Equity Options & Annual Bonus\n\nAbout the Opportunity:\nCloudPulse Technologies is seeking an experienced Principal Cloud Solutions Architect to lead enterprise migration strategies for Fortune 500 financial clients. You will oversee architectural design, serverless microservices deployment, and multi-region disaster recovery protocols.\n\nRequired Qualifications:\n• Minimum 8 years of professional experience in enterprise cloud architecture\n• Expert mastery of AWS, Google Cloud Platform, Kubernetes, and Terraform\n• Proven track record designing high-availability architectures (99.999% uptime)\n• Bachelor's or Master's degree in Computer Science, Software Engineering, or related discipline\n• AWS Certified Solutions Architect Professional or Google Cloud Fellow certification\n\nTo apply, email your resume and technical portfolio link to careers@cloudpulsetech.com by November 15, 2026.\n\n---\n\n[DOCUMENT 2 — CANDIDATE COVER LETTER]\nFrom: david.chen@email.com\nTo: careers@cloudpulsetech.com\nDate: November 2, 2026\nSubject: Application — Principal Cloud Solutions Architect (David Chen)\n\nDear Hiring Committee at CloudPulse Technologies,\n\nI am writing to express my strong candidacy for the Principal Cloud Solutions Architect position. With over nine years of dedicated experience architecting resilient multi-cloud infrastructures, I have led global cloud modernization initiatives for tier-one financial institutions that reduced infrastructure hosting expenditures by 32% while maintaining flawless 99.999% uptime.\n\nAt Apex Global Banking, I managed a team of twelve cloud engineers, orchestrated the migration of 140 legacy microservices to containerized Kubernetes clusters on AWS, and authored automated Terraform deployment pipelines that compressed deployment cycles from weeks to under forty minutes. I hold a Master of Science in Computer Science from the University of Washington and maintain active certifications as an AWS Certified Solutions Architect Professional and Google Cloud Professional Architect.\n\nMy portfolio (davidchencloud.io) features in-depth case studies on distributed fault-tolerant financial ledger architectures. I look forward to discussing how my technical leadership can accelerate CloudPulse's enterprise client initiatives.\n\nSincerely,\nDavid Chen",
          questions: [
            { qNum: 181, q: "How many years of experience does David Chen have?", opts: [{ key: "A", text: "5 years" }, { key: "B", text: "7 years" }, { key: "C", text: "Over 9 years" }, { key: "D", text: "15 years" }], a: "C", exp: "Kinh nghiệm của David Chen: 'With over nine years of dedicated experience architecting resilient multi-cloud infrastructures'." },
            { qNum: 182, q: "Does David Chen satisfy the minimum experience requirement for the position?", opts: [{ key: "A", text: "No, he has less experience than required" }, { key: "B", text: "Yes, he exceeds the 8-year minimum requirement" }, { key: "C", text: "He exactly meets the 8-year requirement" }, { key: "D", text: "It cannot be determined from the documents" }], a: "B", exp: "Đối chiếu yêu cầu: Công việc yêu cầu tối thiểu 8 năm, David có hơn 9 năm → vượt yêu cầu." },
            { qNum: 183, q: "What cost reduction achievement did David accomplish at Apex Global Banking?", opts: [{ key: "A", text: "Reduced software licensing by 10%" }, { key: "B", text: "Reduced infrastructure hosting expenditures by 32%" }, { key: "C", text: "Doubled company stock value" }, { key: "D", text: "Cut travel expenses by half" }], a: "B", exp: "Thành tựu tiết kiệm: 'reduced infrastructure hosting expenditures by 32%'." },
            { qNum: 184, q: "Where can the hiring committee view David's technical architectural case studies?", opts: [{ key: "A", text: "In an attached printed binder" }, { key: "B", text: "On his online technical portfolio (davidchencloud.io)" }, { key: "C", text: "On his personal YouTube channel" }, { key: "D", text: "In a company press release" }], a: "B", exp: "Nơi xem portfolio: 'portfolio (davidchencloud.io) features in-depth case studies'." },
            { qNum: 185, q: "What university degree does David hold?", opts: [{ key: "A", text: "Bachelor of Arts in Economics" }, { key: "B", text: "Master of Science in Computer Science from the University of Washington" }, { key: "C", text: "Doctor of Philosophy in Physics" }, { key: "D", text: "Master of Business Administration" }], a: "B", exp: "Học vị: 'Master of Science in Computer Science from the University of Washington'." }
          ]
        },
        // TRIPLE 1 (Q186-190): Equipment rental agreement + Return inspection + Deposit refund receipt
        {
          passages: "[DOCUMENT 1 — HEAVY EQUIPMENT RENTAL CONTRACT]\nSUMMIT CONSTRUCTION MACHINERY RENTALS\nAgreement #REN-88410 | Date: October 8, 2026\nRenter: Horizon Builders Inc. | Site Supervisor: Thomas Wright\nProject Job Site: 1400 Industrial Parkway, Phoenix, AZ\n\nRented Machines:\n1. 60-Foot Telescopic Boom Lift (Model BL-600) — Rate: $480/day x 4 days = $1,920.00\n2. 6-Ton Hydraulic Mini-Excavator (Model EX-60) — Rate: $420/day x 4 days = $1,680.00\n\nRental Period: Monday, October 13 (8:00 AM) to Thursday, October 16 (5:00 PM)\nRoundtrip Heavy Transport Delivery & Pickup Fee: $350.00\nTotal Rental Amount: $3,950.00\nRefundable Security Deposit: $1,000.00\n\nTerms: Machines must be returned with 100% full diesel tanks. Unfilled tanks will incur a refueling charge of $8.50 per gallon.\n\n---\n\n[DOCUMENT 2 — EQUIPMENT RETURN INSPECTION REPORT]\nInspection Date: Thursday, October 16, 2026 (4:45 PM)\nInspector: Carlos Mendez, Yard Logistics Supervisor\nAgreement Reference: #REN-88410\n\nInspection Findings:\n• Telescopic Boom Lift (BL-600): Operational condition perfect. Clean condition. Fuel Tank: 100% FULL.\n• Hydraulic Mini-Excavator (EX-60): Operational condition perfect. No physical damage. Fuel Tank: 60% FULL (Requires 12 gallons of diesel to fill).\n\nAssessed Charges:\n— Diesel Refueling Charge: 12 gallons @ $8.50/gallon = $102.00\n— Security Deposit Deductions: $102.00\n— Net Refund Amount: $1,000.00 - $102.00 = $898.00\n\n---\n\n[DOCUMENT 3 — REFUND CONFIRMATION EMAIL]\nFrom: accounts@summitmachinery.com\nTo: thomas.wright@horizonbuilders.com\nDate: October 17, 2026\nSubject: Security Deposit Refund Notification — Agreement #REN-88410\n\nDear Mr. Wright,\n\nThank you for renting with Summit Construction Machinery Rentals for your Phoenix commercial project. All rented machinery was collected on October 16th.\n\nAs recorded on your return inspection report, the Boom Lift was returned fully refueled, while the Mini-Excavator required 12 gallons of diesel fuel. In accordance with rental contract terms, a refueling deduction of $102.00 was applied against your $1,000.00 security deposit.\n\nA net refund of $898.00 was credited to your corporate Visa card ending in 8842 this morning. Transaction funds typically settle within 3 to 5 business days.\n\nWe value your continued partnership and look forward to supporting Horizon Builders on future construction developments.\n\nSincerely,\nLaura Perez\nBilling & Customer Accounts Manager",
          questions: [
            { qNum: 186, q: "Where was the rented construction machinery operated?", opts: [{ key: "A", text: "Denver, CO" }, { key: "B", text: "1400 Industrial Parkway, Phoenix, AZ" }, { key: "C", text: "Dallas, TX" }, { key: "D", text: "Las Vegas, NV" }], a: "B", exp: "Địa điểm công trường: '1400 Industrial Parkway, Phoenix, AZ'." },
            { qNum: 187, q: "What was the daily rental rate for the Telescopic Boom Lift?", opts: [{ key: "A", text: "$350" }, { key: "B", text: "$420" }, { key: "C", text: "$480 per day" }, { key: "D", text: "$600" }], a: "C", exp: "Đơn giá thuê ngày Boom Lift: '$480/day'." },
            { qNum: 188, q: "Why was a $102.00 deduction taken from the security deposit?", opts: [{ key: "A", text: "Late machinery return fee" }, { key: "B", text: "The mini-excavator required 12 gallons of diesel fuel to fill the tank" }, { key: "C", text: "Paint scratch repairs on the boom lift" }, { key: "D", text: "Lost equipment keys" }], a: "B", exp: "Lý do trừ cọc: 'Mini-Excavator required 12 gallons of diesel fuel' @ $8.50/gallon = $102.00." },
            { qNum: 189, q: "How much net security deposit refund was credited to Horizon Builders?", opts: [{ key: "A", text: "$750.00" }, { key: "B", text: "$898.00" }, { key: "C", text: "$1,000.00" }, { key: "D", text: "$3,950.00" }], a: "B", exp: "Tiền cọc thực hoàn: '$1,000.00 - $102.00 = $898.00'." },
            { qNum: 190, q: "Who conducted the machine return inspection at the rental yard?", opts: [{ key: "A", text: "Thomas Wright" }, { key: "B", text: "Laura Perez" }, { key: "C", text: "Carlos Mendez, Yard Logistics Supervisor" }, { key: "D", text: "The truck transport driver" }], a: "C", exp: "Người kiểm tra máy: 'Inspector: Carlos Mendez, Yard Logistics Supervisor'." }
          ]
        },
        // TRIPLE 2 (Q191-195): Hotel reservation + Conference itinerary + Expense voucher
        {
          passages: "[DOCUMENT 1 — HOTEL LODGING CONFIRMATION]\nTHE GRAND HYATT EXECUTIVE HOTEL\n800 Michigan Avenue, Chicago, IL | Confirmation #HY-88421\nGuest: Dr. Sarah Jenkins (Apex Biotech Solutions)\n\nStay Details:\n• Check-In: Wednesday, November 11, 2026 (3:00 PM)\n• Check-Out: Saturday, November 14, 2026 (11:00 AM) — 3 Nights Total\n• Room Type: Executive King Suite (Conference Rate: $220/night x 3 nights = $660.00)\n• Municipal Occupancy Taxes (17.4%): $114.84\n• Total Lodging Charges: $774.84\n• Included Guest Amenities: Fiber Wi-Fi, executive lounge breakfast buffet, fitness center pass\n\n---\n\n[DOCUMENT 2 — MIDWEST BIOTECH ANNUAL SYMPOSIUM ITINERARY]\nNovember 12-13, 2026 | Grand Ballroom, The Grand Hyatt Hotel\n\nThursday, November 12 (Day 1):\n• 08:30 AM — Registration & Continental Breakfast\n• 09:30 AM — Opening Keynote Address: 'Advances in Targeted Monoclonal Antibody Therapeutics' — Dr. Sarah Jenkins (Grand Ballroom)\n• 12:30 PM — Conference Networking Luncheon (Included with badge)\n• 02:30 PM — Panel Session: Regulatory Pathways for Cell & Gene Therapies\n\nFriday, November 13 (Day 2):\n• 09:00 AM — Technical Workshop: High-Throughput Genomic Screening (Room 204)\n• 01:30 PM — Clinical Poster Presentation Exhibition\n• 06:30 PM — Annual Biotech Innovation Gala Dinner ($90 optional ticket — Grand Ballroom)\n\n---\n\n[DOCUMENT 3 — EXPENSE REIMBURSEMENT VOUCHER]\nSubmitted By: Dr. Sarah Jenkins | Department: Clinical Oncology Research\nEvent: Midwest Biotech Annual Symposium 2026 (Chicago, IL)\n\nItemized Expenses Claimed:\n1. Roundtrip Airfare (American Airlines — Dallas to Chicago): $435.00\n2. Hotel Lodging (The Grand Hyatt — 3 nights): $774.84\n3. Airport Taxi & Uber Transportation: $132.50\n4. Innovation Gala Dinner Ticket (Nov 13): $90.00\n5. Daily Meal Per Diem Allowance (Nov 11-14): $180.00\n\nTotal Reimbursement Amount: $1,612.34\nApproval Status: Approved by Dr. Robert Henderson (VP of Research & Development) on Nov 17, 2026.",
          questions: [
            { qNum: 191, q: "What role did Dr. Sarah Jenkins have on Day 1 of the symposium?", opts: [{ key: "A", text: "Conference registration assistant" }, { key: "B", text: "Opening keynote speaker on targeted monoclonal antibody therapeutics" }, { key: "C", text: "Gala dinner master of ceremonies" }, { key: "D", text: "Poster exhibition judge" }], a: "B", exp: "Vai trò của Dr. Jenkins: 'Opening Keynote Address: Advances in Targeted Monoclonal Antibody Therapeutics — Dr. Sarah Jenkins'." },
            { qNum: 192, q: "How many nights did Dr. Jenkins stay at The Grand Hyatt Hotel?", opts: [{ key: "A", text: "Two nights" }, { key: "B", text: "Three nights" }, { key: "C", text: "Four nights" }, { key: "D", text: "Five nights" }], a: "B", exp: "Số đêm lưu trú: Check-in Nov 11, Check-out Nov 14 = '3 Nights Total'." },
            { qNum: 193, q: "How much did Dr. Jenkins claim for airport taxi and Uber transportation?", opts: [{ key: "A", text: "$90.00" }, { key: "B", text: "$132.50" }, { key: "C", text: "$180.00" }, { key: "D", text: "$435.00" }], a: "B", exp: "Chi phí taxi/Uber: '$132.50'." },
            { qNum: 194, q: "What was the total reimbursement amount claimed on the voucher?", opts: [{ key: "A", text: "$774.84" }, { key: "B", text: "$1,250.00" }, { key: "C", text: "$1,612.34" }, { key: "D", text: "$1,850.00" }], a: "C", exp: "Tổng tiền hoàn thanh toán công tác: '$1,612.34'." },
            { qNum: 195, q: "Who authorized Dr. Jenkins's expense reimbursement claim?", opts: [{ key: "A", text: "The hotel billing manager" }, { key: "B", text: "The conference organizer" }, { key: "C", text: "Dr. Robert Henderson, VP of Research & Development" }, { key: "D", text: "The airline ticket agent" }], a: "C", exp: "Người duyệt chi: 'Approved by Dr. Robert Henderson (VP of Research & Development)'." }
          ]
        },
        // TRIPLE 3 (Q196-200): Course syllabus + Midterm survey + Instructor announcement
        {
          passages: "[DOCUMENT 1 — EXECUTIVE SYLLABUS EXCERPT]\nEXECUTIVE MASTERCLASS: APPLIED GENERATIVE AI & BUSINESS INTELLIGENCE\nMetro Institute of Technology | Fall Cohort 2026\nLead Instructor: Professor Richard Vance, Ph.D.\n\nCourse Specifications:\n• Duration: 8 Weeks (October 6 - November 28, 2026)\n• Class Schedule: Tuesday & Thursday evenings, 6:30 PM - 8:30 PM (Live via Zoom)\n• Core Modules: Machine Learning Pipelines, Large Language Model Fine-Tuning, PowerBI Real-Time Dashboards, Executive AI Strategy\n\nEvaluation & Grading Structure:\n1. Weekly Analytical Case Studies (40%)\n2. Midterm Practical AI Pipeline Project (25%)\n3. Final Capstone Business Enterprise Proposal (35%)\n\nGraduation Requirement: A cumulative score of 80% or higher is mandatory to earn the verified MIT Executive Certificate.\n\n---\n\n[DOCUMENT 2 — MIDTERM STUDENT FEEDBACK SURVEY REPORT]\nCourse: Applied Generative AI & Business Intelligence (Fall 2026)\nTotal Enrolled Students: 30 | Overall Instructor Satisfaction: 4.9 / 5.0\n\nKey Survey Findings:\n• 96% of students commended the immediate workplace applicability of corporate case studies.\n• 90% rated Professor Vance's instruction and lab demonstrations as exceptional.\n• Primary Student Recommendation: 20 students (67%) requested additional live tutorial sessions focused specifically on complex PowerBI DAX measure formulas and API data streaming connectors.\n\n---\n\n[DOCUMENT 3 — ANNOUNCEMENT FROM PROFESSOR VANCE]\nPosted: November 3, 2026 on Course Portal\nTo: All Enrolled Students in Applied Generative AI Cohort\nSubject: Supplemental Weekend PowerBI Workshops & Project Deadline Extension\n\nDear Students,\n\nThank you for your fantastic engagement and constructive feedback on our midterm course survey. In direct response to your requests for deeper practical mastery of PowerBI DAX calculations and API connectors, I have organized two optional live weekend masterclass sessions:\n\n1. Saturday, November 8 (10:00 AM - 12:00 PM): Advanced DAX Measures, Time Intelligence & Calculation Groups\n2. Saturday, November 15 (10:00 AM - 12:00 PM): Real-Time REST API Connectors & Dynamic Dashboard Streaming\n\nBoth sessions will be recorded and archived in the course video library. Furthermore, to give everyone ample time to integrate these advanced data modeling techniques, I am extending the submission deadline for the Final Capstone Proposal by four days, to Wednesday, December 2nd at 11:59 PM.\n\nKeep up the extraordinary analytical momentum!\n\nWarm regards,\nProfessor Richard Vance, Ph.D.",
          questions: [
            { qNum: 196, q: "How long is the Applied Generative AI Executive Masterclass?", opts: [{ key: "A", text: "4 weeks" }, { key: "B", text: "6 weeks" }, { key: "C", text: "8 weeks (October 6 - November 28, 2026)" }, { key: "D", text: "12 weeks" }], a: "C", exp: "Thời lượng khóa học: 'Duration: 8 Weeks (October 6 - November 28, 2026)'." },
            { qNum: 197, q: "What percentage of the course grade is allocated to Weekly Case Studies?", opts: [{ key: "A", text: "25%" }, { key: "B", text: "35%" }, { key: "C", text: "40%" }, { key: "D", text: "50%" }], a: "C", exp: "Tỷ trọng điểm bài tập tuần: 'Weekly Analytical Case Studies (40%)'." },
            { qNum: 198, q: "What did 67% of surveyed students request in the midterm survey?", opts: [{ key: "A", text: "Lower tuition fees" }, { key: "B", text: "Additional live tutorial sessions on PowerBI DAX measures and API connectors" }, { key: "C", text: "Fewer weekly assignments" }, { key: "D", text: "In-person classroom meetings" }], a: "B", exp: "Yêu cầu của học viên: 'requested additional live tutorial sessions focused specifically on complex PowerBI DAX measure formulas and API data streaming connectors'." },
            { qNum: 199, q: "When is the first supplemental weekend workshop scheduled?", opts: [{ key: "A", text: "Tuesday, November 4" }, { key: "B", text: "Saturday, November 8 (10:00 AM - 12:00 PM)" }, { key: "C", text: "Saturday, November 15" }, { key: "D", text: "Wednesday, December 2" }], a: "B", exp: "Lịch workshop bổ sung đầu tiên: 'Saturday, November 8 (10:00 AM - 12:00 PM)'." },
            { qNum: 200, q: "What is the new revised submission deadline for the Final Capstone Proposal?", opts: [{ key: "A", text: "November 20" }, { key: "B", text: "November 28" }, { key: "C", text: "Wednesday, December 2nd at 11:59 PM" }, { key: "D", text: "December 15" }], a: "C", exp: "Hạn nộp bài cuối khóa mới: 'extending the submission deadline for the Final Capstone Proposal by four days, to Wednesday, December 2nd at 11:59 PM'." }
          ]
        }
      ];

      part7Sets.forEach((set) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr3_q${qItem.qNum}`,
            partNumber: 7,
            partTitle: "Part 7: Reading Comprehension",
            section: "READING",
            passageText: set.passages,
            questionText: `${qItem.qNum}. ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
        });
      });

      return qs;
    })()
  },

  // ---------------------------------------------------------------------------
  // 9. IELTS ACADEMIC OFFICIAL TEST #03 (85 AUTHENTIC QUESTIONS - CAMBRIDGE STANDARD)
  // ---------------------------------------------------------------------------
  {
    id: "ielts_academic_4k_03",
    title: "IELTS Academic Official Test #03 (4-Skills)",
    type: "IELTS_FULL",
    level: "Advanced",
    timeLimitMinutes: 175,
    totalQuestions: 85,
    maxScore: 9.0,
    description: "Bộ đề thi IELTS Academic Test #03 chuẩn Cambridge gồm 40 câu Listening, 40 câu Reading, Speaking AI 3 Part và 2 Writing Tasks.",
    categoryBadge: "IELTS Academic",
    tags: ["IELTS", "Cambridge", "Test 03", "Academic", "Band 9.0 Standard"],
    supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
    questions: (() => {
      const qs: ExamQuestion[] = [];

      // SECTION 1: International Student Homestay & Course Inquiry (Q1 - Q10)
      const sec1Script = "Officer: Good morning, Melbourne International Student Services. How can I help you?\nStudent: Hello! My name is Kenji Tanaka. I am arriving in Melbourne next month for a postgraduate engineering diploma and would like to register for a university-approved homestay accommodation.\nOfficer: Welcome, Kenji! Let me capture your registration particulars. What is your passport number and primary contact email?\nStudent: My passport number is TK8841290, and my email is k.tanaka@tokyotech.edu.jp.\nStudent: I prefer a homestay located in Zone 1 or Zone 2 with good tram access, private study bedroom, and half-board meals which include breakfast and evening dinner.\nOfficer: We have an excellent family in Carlton, just a fifteen-minute tram ride from the main campus. The weekly accommodation fee is 295 Australian dollars, which includes all utilities, high-speed fiber internet, and laundry facilities.\nStudent: That sounds ideal. Is there an airport pickup service when my flight arrives on February 12th?\nOfficer: Yes, university shuttle airport pickup is complimentary for international students arriving between 8:00 AM and 8:00 PM.";

      const sec1Questions = [
        { q: "What is the student's full name?", opts: [{ key: "A", text: "Kenji Tanaka" }, { key: "B", text: "Hiroshi Sato" }, { key: "C", text: "Daiki Suzuki" }, { key: "D", text: "Ryota Takahashi" }], a: "A", exp: "Họ tên sinh viên: 'My name is Kenji Tanaka'." },
        { q: "What course will Kenji study in Melbourne?", opts: [{ key: "A", text: "Bachelor of Commerce" }, { key: "B", text: "Postgraduate engineering diploma" }, { key: "C", text: "Doctorate in Marine Biology" }, { key: "D", text: "Certificate in Graphic Design" }], a: "B", exp: "Khóa học: 'postgraduate engineering diploma'." },
        { q: "What is Kenji's passport number?", opts: [{ key: "A", text: "TK8841290" }, { key: "B", text: "TK9901234" }, { key: "C", text: "JP5520194" }, { key: "D", text: "TK7740012" }], a: "A", exp: "Số hộ chiếu: 'passport number is TK8841290'." },
        { q: "What meal plan option did Kenji select?", opts: [{ key: "A", text: "Room only (Self-catering)" }, { key: "B", text: "Full board (Three meals daily)" }, { key: "C", text: "Half-board (Breakfast and evening dinner)" }, { key: "D", text: "Weekend lunches only" }], a: "C", exp: "Gói ăn uống: 'half-board meals which include breakfast and evening dinner'." },
        { q: "Where is the recommended homestay located?", opts: [{ key: "A", text: "St Kilda" }, { key: "B", text: "Carlton" }, { key: "C", text: "Docklands" }, { key: "D", text: "South Yarra" }], a: "B", exp: "Địa điểm gia đình bản xứ: 'excellent family in Carlton'." },
        { q: "How long is the tram commute from Carlton to campus?", opts: [{ key: "A", text: "Five minutes" }, { key: "B", text: "Fifteen minutes" }, { key: "C", text: "Thirty minutes" }, { key: "D", text: "Forty-five minutes" }], a: "B", exp: "Thời gian đi xe điện: 'just a fifteen-minute tram ride from the main campus'." },
        { q: "What is the weekly homestay fee in Australian dollars?", opts: [{ key: "A", text: "220 AUD" }, { key: "B", text: "250 AUD" }, { key: "C", text: "295 Australian dollars" }, { key: "D", text: "350 AUD" }], a: "C", exp: "Chi phí thuê tuần: 'weekly accommodation fee is 295 Australian dollars'." },
        { q: "What amenities are included in the weekly fee?", opts: [{ key: "A", text: "Utilities, fiber internet, and laundry facilities" }, { key: "B", text: "Private car rental and parking" }, { key: "C", text: "Gym membership and personal chef" }, { key: "D", text: "Daily dry cleaning and restaurant vouchers" }], a: "A", exp: "Tiện ích bao gồm: 'includes all utilities, high-speed fiber internet, and laundry facilities'." },
        { q: "When will Kenji arrive in Melbourne?", opts: [{ key: "A", text: "January 15th" }, { key: "B", text: "February 12th" }, { key: "C", text: "March 1st" }, { key: "D", text: "April 10th" }], a: "B", exp: "Ngày đến nơi: 'when my flight arrives on February 12th'." },
        { q: "Under what condition is university airport pickup free?", opts: [{ key: "A", text: "If arriving by boat" }, { key: "B", text: "For flights arriving between 8:00 AM and 8:00 PM" }, { key: "C", text: "Only on weekend mornings" }, { key: "D", text: "If paying a 50-dollar surcharge" }], a: "B", exp: "Điều kiện đón miễn phí: 'arriving between 8:00 AM and 8:00 PM'." }
      ];

      sec1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 1}`,
          partNumber: 1,
          partTitle: "Listening Section 1: Homestay Registration",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
          passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
          questionText: `Question ${idx + 1}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 2: Botanical Gardens Guided Tour & Eco-Preserve (Q11 - Q20)
      const sec2Script = "Guide: Welcome to the Royal Botanic Gardens and Wetland Sanctuary. I am Fiona Campbell, Senior Horticultural Educator. Today we celebrate the official opening of our Alpine Flora Conservation Glasshouse. Spanning 1,800 square meters, this microclimate biome replicates the sub-alpine conditions of the Southern Highlands, featuring over 400 species of endangered glacial ferns, mosses, and high-altitude orchids. In Zone 2, our Native Pollinator Meadow highlights the crucial ecological role of native stingless bees and nectar bats. The glasshouse is cooled using geothermal ground-source heat pumps and rain harvesting cisterns that supply 100% of our irrigation water. Guided sensory audio tours are available at the Visitor Pavilion in eight languages. The Botanical Tea Pavilion by the lotus pond serves refreshments from 10:00 AM to 4:30 PM. Please note that stepping off designated boardwalks is strictly prohibited to prevent soil compaction around sensitive root systems.";

      const sec2Questions = [
        { q: "What new facility is being officially opened today?", opts: [{ key: "A", text: "The Tropical Reptile House" }, { key: "B", text: "The Alpine Flora Conservation Glasshouse" }, { key: "C", text: "The Butterfly Aviary" }, { key: "D", text: "The Desert Cactus Pavilion" }], a: "B", exp: "Cơ sở mới: 'Alpine Flora Conservation Glasshouse'." },
        { q: "How large is the new conservation glasshouse?", opts: [{ key: "A", text: "500 square meters" }, { key: "B", text: "1,200 square meters" }, { key: "C", text: "1,800 square meters" }, { key: "D", text: "3,000 square meters" }], a: "C", exp: "Diện tích: 'Spanning 1,800 square meters'." },
        { q: "How many endangered plant species are housed in the glasshouse?", opts: [{ key: "A", text: "150 species" }, { key: "B", text: "Over 400 species" }, { key: "C", text: "800 species" }, { key: "D", text: "1,500 species" }], a: "B", exp: "Số lượng loài: 'over 400 species of endangered glacial ferns, mosses, and high-altitude orchids'." },
        { q: "What organisms are highlighted in the Native Pollinator Meadow?", opts: [{ key: "A", text: "Butterflies and hummingbirds only" }, { key: "B", text: "Native stingless bees and nectar bats" }, { key: "C", text: "Locusts and beetles" }, { key: "D", text: "Ants and earthworms" }], a: "B", exp: "Sinh vật thụ phấn bản địa: 'native stingless bees and nectar bats'." },
        { q: "How is the glasshouse cooled sustainably?", opts: [{ key: "A", text: "Diesel generators" }, { key: "B", text: "Geothermal ground-source heat pumps" }, { key: "C", text: "Open roof louvers only" }, { key: "D", text: "Imported block ice" }], a: "B", exp: "Công nghệ làm mát: 'geothermal ground-source heat pumps'." },
        { q: "Where does 100% of the irrigation water come from?", opts: [{ key: "A", text: "Municipal city tap water" }, { key: "B", text: "Rain harvesting cisterns" }, { key: "C", text: "Desalinated ocean water" }, { key: "D", text: "Bottled mineral water" }], a: "B", exp: "Nguồn nước tưới cây: 'rain harvesting cisterns that supply 100% of our irrigation water'." },
        { q: "Where is the Botanical Tea Pavilion located?", opts: [{ key: "A", text: "In the main car park" }, { key: "B", text: "By the lotus pond" }, { key: "C", text: "Inside the Alpine Glasshouse" }, { key: "D", text: "Next to the entrance gate" }], a: "B", exp: "Vị trí quán trà: 'Botanical Tea Pavilion by the lotus pond'." },
        { q: "What are the tea pavilion's operating hours?", opts: [{ key: "A", text: "8:00 AM - 12:00 PM" }, { key: "B", text: "10:00 AM - 4:30 PM" }, { key: "C", text: "12:00 PM - 6:00 PM" }, { key: "D", text: "All day until sunset" }], a: "B", exp: "Giờ hoạt động: 'from 10:00 AM to 4:30 PM'." },
        { q: "Why is stepping off boardwalks strictly prohibited?", opts: [{ key: "A", text: "Risk of electric shocks" }, { key: "B", text: "To prevent soil compaction around sensitive root systems" }, { key: "C", text: "Deep mud sinkholes" }, { key: "D", text: "Presence of poisonous snakes" }], a: "B", exp: "Lý do cấm rời sàn gỗ: 'prevent soil compaction around sensitive root systems'." },
        { q: "What is Fiona Campbell's job title?", opts: [{ key: "A", text: "Head Security Officer" }, { key: "B", text: "Senior Horticultural Educator" }, { key: "C", text: "Glasshouse Architect" }, { key: "D", text: "Sanctuary Gift Shop Supervisor" }], a: "B", exp: "Chức vụ: 'Fiona Campbell, Senior Horticultural Educator'." }
      ];

      sec2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 11}`,
          partNumber: 2,
          partTitle: "Listening Section 2: Botanical Glasshouse Tour",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
          passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
          questionText: `Question ${idx + 11}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 3: Academic Discussion on Satellite Remote Sensing of Glacial Retreat (Q21 - Q30)
      const sec3Script = "Professor: Good afternoon, Liam and Maya. Let's review your dissertation research proposal on utilizing synthetic aperture radar (SAR) to quantify glacial mass balance in the Patagonian Icefields.\nMaya: Thank you, Professor Davies. We are analyzing interferometric SAR datasets from the European Sentinel-1 constellation and NASA's ICESat-2 laser altimeter spanning the years 2018 through 2025.\nLiam: Our initial surface elevation velocity models demonstrate that the Upsala and Viedma glaciers have undergone rapid terminus retreat, thinning by an average of 4.3 meters annually due to calving acceleration and rising proglacial lake water temperatures.\nProfessor: That is a significant rate of volumetric mass loss. How are you accounting for seasonal firn layer densification and atmospheric phase screen noise?\nMaya: We applied atmospheric correction algorithms using ground-based meteorological stations and calibrated our radar backscatter against airborne LiDAR validation tracks.\nProfessor: Excellent methodology. Ensure you present your elevation difference raster maps at the upcoming Cryosphere Geoscience Conference on December 5th.";

      const sec3Questions = [
        { q: "What geographic region is the focus of the students' glacial research?", opts: [{ key: "A", text: "The Greenland Ice Sheet" }, { key: "B", text: "The Patagonian Icefields" }, { key: "C", text: "The Swiss Alps" }, { key: "D", text: "The Himalayas" }], a: "B", exp: "Khu vực nghiên cứu: 'glacial mass balance in the Patagonian Icefields'." },
        { q: "Which two satellite remote sensing platforms are utilized in the study?", opts: [{ key: "A", text: "Hubble and James Webb" }, { key: "B", text: "Sentinel-1 SAR and NASA's ICESat-2 laser altimeter" }, { key: "C", text: "Landsat-5 and Spot-4" }, { key: "D", text: "GPS navigation satellites only" }], a: "B", exp: "Vệ tinh viễn thám: 'European Sentinel-1 constellation and NASA's ICESat-2 laser altimeter'." },
        { q: "What time period do the analyzed datasets cover?", opts: [{ key: "A", text: "2010 to 2015" }, { key: "B", text: "2018 through 2025" }, { key: "C", text: "2000 to 2010" }, { key: "D", text: "2024 to 2026" }], a: "B", exp: "Thời gian dữ liệu: 'spanning the years 2018 through 2025'." },
        { q: "Which two glaciers were identified as experiencing rapid terminus retreat?", opts: [{ key: "A", text: "Perito Moreno and Grey" }, { key: "B", text: "Upsala and Viedma glaciers" }, { key: "C", text: "Fox and Franz Josef" }, { key: "D", text: "Aletsch and Rhone" }], a: "B", exp: "Tên hai dòng sông băng: 'Upsala and Viedma glaciers'." },
        { q: "What was the average annual glacier thinning rate observed?", opts: [{ key: "A", text: "1.2 meters" }, { key: "B", text: "2.5 meters" }, { key: "C", text: "4.3 meters annually" }, { key: "D", text: "8.0 meters" }], a: "C", exp: "Tốc độ mỏng đi hàng năm: 'thinning by an average of 4.3 meters annually'." },
        { q: "What two primary drivers caused this accelerated retreat?", opts: [{ key: "A", text: "Volcanic ash and tourist hiking" }, { key: "B", text: "Calving acceleration and rising proglacial lake water temperatures" }, { key: "C", text: "Heavy snowfall and wind erosion" }, { key: "D", text: "Underground geothermal magma" }], a: "B", exp: "Nguyên nhân tan băng: 'calving acceleration and rising proglacial lake water temperatures'." },
        { q: "What source of radar measurement error did Professor Davies highlight?", opts: [{ key: "A", text: "Solar flare interference" }, { key: "B", text: "Firn layer densification and atmospheric phase screen noise" }, { key: "C", text: "Satellite battery decay" }, { key: "D", text: "Computer monitor resolution" }], a: "B", exp: "Nhiễu dữ liệu: 'seasonal firn layer densification and atmospheric phase screen noise'." },
        { q: "What data did the students use to calibrate radar backscatter?", opts: [{ key: "A", text: "Handheld smartphone photos" }, { key: "B", text: "Airborne LiDAR validation tracks" }, { key: "C", text: "Historical newspaper clippings" }, { key: "D", text: "Eye-witness accounts" }], a: "B", exp: "Dữ liệu hiệu chuẩn: 'calibrated our radar backscatter against airborne LiDAR validation tracks'." },
        { q: "What must the students present at the upcoming conference?", opts: [{ key: "A", text: "A 3D printed glacier model" }, { key: "B", text: "Elevation difference raster maps" }, { key: "C", text: "A short documentary video" }, { key: "D", text: "A funding grant invoice" }], a: "B", exp: "Sản phẩm báo cáo: 'elevation difference raster maps'." },
        { q: "When will the Cryosphere Geoscience Conference take place?", opts: [{ key: "A", text: "November 15th" }, { key: "B", text: "December 5th" }, { key: "C", text: "January 20th" }, { key: "D", text: "February 12th" }], a: "B", exp: "Ngày diễn ra hội nghị: 'Conference on December 5th'." }
      ];

      sec3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 21}`,
          partNumber: 3,
          partTitle: "Listening Section 3: Glacial Remote Sensing",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
          passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
          questionText: `Question ${idx + 21}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 4: University Lecture on Neuroplasticity & Synaptic Pruning (Q31 - Q40)
      const sec4Script = "Lecturer: Good morning, students of cognitive neuroscience. In today's lecture, we examine the cellular and epigenetic mechanisms of developmental neuroplasticity, with a particular focus on synaptic pruning and critical period plasticity during childhood language acquisition. During early post-natal development, the human cerebral cortex undergoes an explosive burst of synaptogenesis, generating roughly twice as many synaptic connections as are present in adulthood. Between the ages of two and ten, an experience-dependent competitive elimination process known as synaptic pruning occurs. Astrocytes and microglia actively engulf and eliminate non-functional or weakly stimulated dendritic spines, while frequently activated neuronal pathways are reinforced via long-term potentiation and axonal myelin sheath insulation. This synaptic sculpting is tightly regulated by inhibitory gamma-aminobutyric acid (GABAergic) interneuron maturation, which establishes the onset and termination of the 'critical window' for native phoneme acquisition. Understanding these molecular cascades provides vital clinical insights into developmental neurodivergent conditions including autism spectrum disorders and early childhood speech apraxia.";

      const sec4Questions = [
        { q: "What phenomenon occurs during early post-natal brain development?", opts: [{ key: "A", text: "Total loss of brain cells" }, { key: "B", text: "Explosive burst of synaptogenesis (creating 2x adult synaptic density)" }, { key: "C", text: "Hardening of the skull bones only" }, { key: "D", text: "Cessation of all neuronal activity" }], a: "B", exp: "Quá trình hình thành khớp thần kinh bùng nổ: 'generating roughly twice as many synaptic connections as are present in adulthood'." },
        { q: "What is 'synaptic pruning' in developmental neuroscience?", opts: [{ key: "A", text: "Surgical removal of brain tumors" }, { key: "B", text: "Experience-dependent elimination of weak or non-functional synapses" }, { key: "C", text: "The growth of new skull tissue" }, { key: "D", text: "Memory loss in old age" }], a: "B", exp: "Định nghĩa cắt tỉa khớp thần kinh: 'experience-dependent competitive elimination process known as synaptic pruning'." },
        { q: "Between what ages does primary synaptic pruning occur?", opts: [{ key: "A", text: "Birth to 6 months" }, { key: "B", text: "Between the ages of two and ten" }, { key: "C", text: "Ages 20 to 30" }, { key: "D", text: "Ages 50 to 65" }], a: "B", exp: "Độ tuổi diễn ra: 'Between the ages of two and ten'." },
        { q: "Which glial cells actively engulf and eliminate weak dendritic spines?", opts: [{ key: "A", text: "Red blood cells" }, { key: "B", text: "Astrocytes and microglia" }, { key: "C", text: "Platelets" }, { key: "D", text: "Bone osteoclasts" }], a: "B", exp: "Tế bào dọn dẹp synapse yếu: 'Astrocytes and microglia actively engulf and eliminate non-functional or weakly stimulated dendritic spines'." },
        { q: "How are frequently activated neural pathways physically strengthened?", opts: [{ key: "A", text: "By turning into cartilage" }, { key: "B", text: "Via long-term potentiation and axonal myelin sheath insulation" }, { key: "C", text: "By losing electrical conductivity" }, { key: "D", text: "By shrinking in diameter" }], a: "B", exp: "Cơ chế củng cố đường dẫn truyền: 'via long-term potentiation and axonal myelin sheath insulation'." },
        { q: "What neurotransmitter interneuron maturation regulates critical period windows?", opts: [{ key: "A", text: "Dopamine receptors" }, { key: "B", text: "GABAergic (gamma-aminobutyric acid) interneurons" }, { key: "C", text: "Adrenaline glands" }, { key: "D", text: "Insulin transporters" }], a: "B", exp: "Cơ chế điều tiết giai đoạn nhạy cảm: 'regulated by inhibitory gamma-aminobutyric acid (GABAergic) interneuron maturation'." },
        { q: "What cognitive skill depends on the childhood critical period window?", opts: [{ key: "A", text: "Driving a vehicle" }, { key: "B", text: "Native phoneme and speech sound acquisition" }, { key: "C", text: "Arithmetic long division" }, { key: "D", text: "Stock market trading" }], a: "B", exp: "Kỹ năng trong giai đoạn vàng: 'critical window for native phoneme acquisition'." },
        { q: "What clinical conditions are illuminated by synaptic pruning research?", opts: [{ key: "A", text: "Cardiovascular disease and diabetes" }, { key: "B", text: "Autism spectrum disorders and early childhood speech apraxia" }, { key: "C", text: "Asthma and skin allergies" }, { key: "D", text: "Broken bones and arthritis" }], a: "B", exp: "Ý nghĩa y học: 'autism spectrum disorders and early childhood speech apraxia'." },
        { q: "What happens to synapses that are weakly stimulated?", opts: [{ key: "A", text: "They turn into brain tumors" }, { key: "B", text: "They are engulfed and eliminated by glial cells" }, { key: "C", text: "They double in size" }, { key: "D", text: "They become bone tissue" }], a: "B", exp: "Số phận của synapse yếu: Bị đại thực bào thần kinh tiêu hóa và loại bỏ." },
        { q: "What is the primary academic discipline of this lecture?", opts: [{ key: "A", text: "Civil structural engineering" }, { key: "B", text: "Developmental cognitive neuroscience" }, { key: "C", text: "Atmospheric oceanography" }, { key: "D", text: "Ancient Roman history" }], a: "B", exp: "Chuyên ngành bài giảng: 'cognitive neuroscience'." }
      ];

      sec4Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 31}`,
          partNumber: 4,
          partTitle: "Listening Section 4: Neuroplasticity & Pruning",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
          passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
          questionText: `Question ${idx + 31}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // READING PASSAGE 1: The Hydraulic Engineering of Ancient Angkor Wat (Q41 - Q53: 13 Questions)
      const readP1 = `READING PASSAGE 1 — THE HYDRAULIC CIVILIZATION OF ANCIENT ANGKOR\n\nBetween the ninth and fifteenth centuries CE, the Khmer Empire established its capital at Angkor in modern-day northwestern Cambodia, constructing what archaeological historians now recognize as the most expansive low-density urban sprawl of the pre-industrial world. Covering over 1,000 square kilometers, the Angkorian civilization supported a population estimated between 750,000 and one million residents. Central to the empire's extraordinary longevity and agricultural prosperity was a sophisticated, vast hydraulic management network that mastered the extreme fluctuations of the Southeast Asian monsoon climate.\n\nThe hydrological challenges facing Khmer engineers were twofold: during the five-month monsoon season from May to October, torrential rains inundated the landscape, while the subsequent seven-month dry season caused severe drought. To regulate this erratic water cycle, Angkorian hydraulic engineers constructed monumental artificial reservoirs known as 'barays.' The largest of these, the West Baray, excavated in the eleventh century, measures an astonishing 8 kilometers in length and 2.1 kilometers in width, capable of storing over 53 million cubic meters of water. These reservoirs were engineered without concrete, utilizing compacted earth embankments and gravity-fed sluice gates aligned precisely with regional topological gradients.\n\nWater from the barays was channeled through an intricate grid of thousands of kilometers of interconnected canals, dykes, and masonry overflow weirs. This system fulfilled multiple civic functions: it mitigated catastrophic wet-season flooding, provided domestic municipal water supplies, enabled year-round double and triple wet-rice crop cultivation, and served as navigable transportation canals along which massive sandstone blocks were floated from the Kulen quarries to construct the temple complexes of Angkor Wat and the Bayon.\n\nHowever, LiDAR remote sensing and sediment core dendrochronology conducted by the Greater Angkor Project have revealed that this colossal hydraulic system also contained the seeds of the civilization's ultimate decline. In the late fourteenth and early fifteenth centuries, mainland Southeast Asia experienced decades of severe drought interspersed with anomalous, ultra-intense monsoon deluge years associated with severe El Niño oscillations. The extreme flooding overwhelmed Angkor's canal networks, eroding overflow channels into deep ravines and choking reservoirs with massive volumes of silt, rendering the irrigation infrastructure irrecoverable and prompting the gradual relocation of the political capital southward to Phnom Penh.`;

      const r1Questions = [
        { q: "How large was the urban sprawl of ancient Angkor?", opts: [{ key: "A", text: "100 square kilometers" }, { key: "B", text: "500 square kilometers" }, { key: "C", text: "Covering over 1,000 square kilometers" }, { key: "D", text: "5,000 square kilometers" }], a: "C", exp: "Đoạn 1: 'Covering over 1,000 square kilometers'." },
        { q: "What was the estimated population of the Angkorian capital at its peak?", opts: [{ key: "A", text: "50,000 residents" }, { key: "B", text: "200,000 residents" }, { key: "C", text: "Between 750,000 and one million residents" }, { key: "D", text: "Three million residents" }], a: "C", exp: "Đoạn 1: 'population estimated between 750,000 and one million residents'." },
        { q: "What are the monumental artificial reservoirs of Angkor called?", opts: [{ key: "A", text: "Aqueducts" }, { key: "B", text: "Barays" }, { key: "C", text: "Cenotes" }, { key: "D", text: "Qanats" }], a: "B", exp: "Đoạn 2: 'monumental artificial reservoirs known as barays'." },
        { q: "What are the physical dimensions of the West Baray?", opts: [{ key: "A", text: "2 km long by 500m wide" }, { key: "B", text: "8 kilometers in length and 2.1 kilometers in width" }, { key: "C", text: "15 km long by 5 km wide" }, { key: "D", text: "20 km long by 10 km wide" }], a: "B", exp: "Đoạn 2: 'measures an astonishing 8 kilometers in length and 2.1 kilometers in width'." },
        { q: "How much water could the West Baray store?", opts: [{ key: "A", text: "5 million cubic meters" }, { key: "B", text: "20 million cubic meters" }, { key: "C", text: "Over 53 million cubic meters" }, { key: "D", text: "100 million cubic meters" }], a: "C", exp: "Đoạn 2: 'capable of storing over 53 million cubic meters of water'." },
        { q: "What construction materials were used to build the baray embankments?", opts: [{ key: "A", text: "Reinforced steel and concrete" }, { key: "B", text: "Compacted earth embankments and gravity-fed sluice gates" }, { key: "C", text: "Kiln-fired ceramic bricks exclusively" }, { key: "D", text: "Wooden timber palisades" }], a: "B", exp: "Đoạn 2: 'engineered without concrete, utilizing compacted earth embankments and gravity-fed sluice gates'." },
        { q: "How were massive sandstone temple building blocks transported from Mount Kulen?", opts: [{ key: "A", text: "On wheeled iron carts" }, { key: "B", text: "Floated on rafts along navigable canals" }, { key: "C", text: "Carried by human chains" }, { key: "D", text: "Pulled by steam locomotives" }], a: "B", exp: "Đoạn 3: 'served as navigable transportation canals along which massive sandstone blocks were floated'." },
        { q: "How many rice harvests per year did the irrigation network enable?", opts: [{ key: "A", text: "A single annual harvest" }, { key: "B", text: "Double and triple wet-rice crop cultivation" }, { key: "C", text: "One harvest every two years" }, { key: "D", text: "None; they relied entirely on wild foraging" }], a: "B", exp: "Đoạn 3: 'enabled year-round double and triple wet-rice crop cultivation'." },
        { q: "What modern archaeological technology revealed the extent of Angkor's hydraulic system?", opts: [{ key: "A", text: "Deep core dynamite blasting" }, { key: "B", text: "LiDAR airborne remote sensing and tree-ring dendrochronology" }, { key: "C", text: "Metal detector scans only" }, { key: "D", text: "Satellite optical photography only" }], a: "B", exp: "Đoạn 4: 'LiDAR remote sensing and sediment core dendrochronology'." },
        { q: "What climatic anomalies occurred in the 14th and 15th centuries?", opts: [{ key: "A", text: "A continuous ice age with glaciers" }, { key: "B", text: "Severe droughts interspersed with ultra-intense monsoon deluges (El Niño)" }, { key: "C", text: "Permanent dry desert conditions without rain" }, { key: "D", text: "Total cessation of seasonal monsoon cycles" }], a: "B", exp: "Đoạn 4: 'decades of severe drought interspersed with anomalous, ultra-intense monsoon deluge years associated with severe El Niño oscillations'." },
        { q: "How did extreme flooding damage the hydraulic infrastructure?", opts: [{ key: "A", text: "Melted the stone temples" }, { key: "B", text: "Eroded overflow canals into deep ravines and silted up reservoirs" }, { key: "C", text: "Burned the earthen dams" }, { key: "D", text: "Poisoned the groundwater with salt" }], a: "B", exp: "Đoạn 4: 'eroding overflow channels into deep ravines and choking reservoirs with massive volumes of silt'." },
        { q: "Where was the political capital relocated after Angkor's decline?", opts: [{ key: "A", text: "Bangkok" }, { key: "B", text: "Hanoi" }, { key: "C", text: "Southward to Phnom Penh" }, { key: "D", text: "Vientiane" }], a: "C", exp: "Đoạn 4: 'relocation of the political capital southward to Phnom Penh'." },
        { q: "What is the primary conclusion regarding Angkor's engineering legacy?", opts: [{ key: "A", text: "The Khmer possessed no real engineering skills" }, { key: "B", text: "Angkor was a masterclass in landscape-scale water management whose rigidity proved vulnerable to extreme climatic shifts" }, { key: "C", text: "Angkor's water system was purely ornamental with no agricultural value" }, { key: "D", text: "The city was destroyed entirely by volcanic eruptions" }], a: "B", exp: "Kết luận: Hệ thống thủy lực quy mô cảnh quan vĩ đại nhưng tính cứng nhắc khiến nó dễ tổn thương trước biến đổi khí hậu cực đoan." }
      ];

      r1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 41}`,
          partNumber: 5,
          partTitle: "Reading Passage 1: Angkor Hydraulic Civilization",
          section: "READING",
          passageText: readP1,
          questionText: `Question ${idx + 41}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // PASSAGE 2: Microplastic Geochemistry in the Anthropocene (Q54 - Q66: 13 Questions)
      const readP2 = `READING PASSAGE 2 — MICROPLASTIC GEOCHEMISTRY IN THE ANTHROPOCENE EPOCH\n\nSince the commencement of commercial polymer mass manufacturing in the 1950s, human society has produced over 8.3 billion metric tons of synthetic plastics. Due to the exceptional chemical durability conferred by high-molecular-weight carbon-carbon backbone bonds, synthetic polymers do not biologically degrade in ambient environments; rather, they undergo mechanical abrasion, photo-oxidative ultraviolet degradation, and wave shearing into trillions of microscopic synthetic fragments termed microplastics (particles under 5 millimeters in diameter) and nanoplastics (particles smaller than 1 micrometer).\n\nGeologists and environmental geochemists now propose that microplastic particles constitute an indelible stratigraphic marker of the Anthropocene—the proposed geological epoch defined by pervasive human alteration of Earth's sedimentary strata. Sediment core analyses extracted from marine abyssal plains, Arctic sea ice cores, high-altitude alpine snowbanks, and pristine subterranean stalagmites consistently reveal stratified microplastic deposition layers corresponding precisely to post-1960 industrial acceleration.\n\nBeyond their physical ubiquity, microplastics act as potent geochemical vectors in aquatic and terrestrial food webs. Owing to their extremely high surface-area-to-volume ratio and hydrophobic polymeric matrices, microplastic particles rapidly adsorb persistent organic pollutants (POPs)—including polychlorinated biphenyls (PCBs), dichlorodiphenyltrichloroethane (DDT), and polycyclic aromatic hydrocarbons (PAHs)—at concentrations exceeding one million times surrounding ambient water levels. When ingested by marine filter-feeders, zooplankton, and benthic organisms, these toxic contaminants bioaccumulate through trophic levels, inducing cellular cytotoxicity, endocrine hormone disruption, and metabolic reproductive impairments across marine biodiversity.`;

      const r2Questions = [
        { q: "How much plastic has human society manufactured since the 1950s?", opts: [{ key: "A", text: "1.2 billion metric tons" }, { key: "B", text: "4.5 billion metric tons" }, { key: "C", text: "Over 8.3 billion metric tons" }, { key: "D", text: "20 billion metric tons" }], a: "C", exp: "Đoạn 1: 'produced over 8.3 billion metric tons of synthetic plastics'." },
        { q: "What gives synthetic plastics their extreme chemical durability?", opts: [{ key: "A", text: "Natural wooden fibers" }, { key: "B", text: "High-molecular-weight carbon-carbon backbone bonds" }, { key: "C", text: "Water-soluble sugar coatings" }, { key: "D", text: "Magnetic iron particles" }], a: "B", exp: "Đoạn 1: 'high-molecular-weight carbon-carbon backbone bonds'." },
        { q: "What is the size threshold defining 'microplastics'?", opts: [{ key: "A", text: "Particles under 5 millimeters in diameter" }, { key: "B", text: "Particles between 1 and 2 centimeters" }, { key: "C", text: "Particles over 10 centimeters" }, { key: "D", text: "Any visible plastic bag" }], a: "A", exp: "Đoạn 1: 'particles under 5 millimeters in diameter'." },
        { q: "What are plastic particles smaller than 1 micrometer termed?", opts: [{ key: "A", text: "Macroplastics" }, { key: "B", text: "Nanoplastics" }, { key: "C", text: "Mesoplastics" }, { key: "D", text: "Polymer aggregates" }], a: "B", exp: "Đoạn 1: 'nanoplastics (particles smaller than 1 micrometer)'." },
        { q: "Why do geologists consider microplastics a marker for the Anthropocene epoch?", opts: [{ key: "A", text: "They glow under ultraviolet lights" }, { key: "B", text: "They form indelible, stratified sedimentary deposition layers globally since 1960" }, { key: "C", text: "They turn into fossil fuels instantly" }, { key: "D", text: "They replace natural limestone entirely" }], a: "B", exp: "Đoạn 2: 'constitute an indelible stratigraphic marker of the Anthropocene... stratified microplastic deposition layers corresponding precisely to post-1960 industrial acceleration'." },
        { q: "Where have microplastic deposition layers been detected in geological cores?", opts: [{ key: "A", text: "Urban landfills only" }, { key: "B", text: "Marine abyssal plains, Arctic sea ice, alpine snowbanks, and cave stalagmites" }, { key: "C", text: "Inside volcanic magma chambers only" }, { key: "D", text: "On the lunar surface" }], a: "B", exp: "Đoạn 2: 'marine abyssal plains, Arctic sea ice cores, high-altitude alpine snowbanks, and pristine subterranean stalagmites'." },
        { q: "Why do microplastics readily adsorb environmental toxic chemicals?", opts: [{ key: "A", text: "They are magnetic" }, { key: "B", text: "High surface-area-to-volume ratio and hydrophobic polymeric matrices" }, { key: "C", text: "They are heated by geothermal energy" }, { key: "D", text: "They emit electrical currents" }], a: "B", exp: "Đoạn 3: 'high surface-area-to-volume ratio and hydrophobic polymeric matrices'." },
        { q: "At what concentration multiplier can pollutants adsorb onto microplastic surfaces?", opts: [{ key: "A", text: "Ten times" }, { key: "B", text: "One hundred times" }, { key: "C", text: "Exceeding one million times surrounding ambient water levels" }, { key: "D", text: "Equal to ambient levels" }], a: "C", exp: "Đoạn 3: 'concentrations exceeding one million times surrounding ambient water levels'." },
        { q: "Which persistent organic pollutants (POPs) are cited as adsorbing onto plastics?", opts: [{ key: "A", text: "Sodium chloride and potassium" }, { key: "B", text: "PCBs, DDT, and polycyclic aromatic hydrocarbons (PAHs)" }, { key: "C", text: "Glucose and amino acids" }, { key: "D", text: "Carbonated water" }], a: "B", exp: "Đoạn 3: 'polychlorinated biphenyls (PCBs), dichlorodiphenyltrichloroethane (DDT), and polycyclic aromatic hydrocarbons (PAHs)'." },
        { q: "What biological process occurs when organisms ingest contaminated plastic particles?", opts: [{ key: "A", text: "Immediate rapid growth" }, { key: "B", text: "Bioaccumulation across trophic food web levels" }, { key: "C", text: "Conversion of plastic into vitamins" }, { key: "D", text: "Immunity against viral infections" }], a: "B", exp: "Đoạn 3: 'bioaccumulate through trophic levels'." },
        { q: "What toxicological consequences result from plastic ingestion in marine life?", opts: [{ key: "A", text: "Enhanced swimming speed" }, { key: "B", text: "Cellular cytotoxicity, endocrine hormone disruption, and reproductive impairment" }, { key: "C", text: "Thicker protective shell armor" }, { key: "D", text: "Transition to land-dwelling habits" }], a: "B", exp: "Đoạn 3: 'inducing cellular cytotoxicity, endocrine hormone disruption, and metabolic reproductive impairments'." },
        { q: "What environmental forces fragment macroplastics into microscopic particles?", opts: [{ key: "A", text: "Mechanical abrasion, photo-oxidative UV degradation, and wave shearing" }, { key: "B", text: "Deep-sea pressure cooking" }, { key: "C", text: "Earthquake vibrations only" }, { key: "D", text: "Bacterial digestion" }], a: "A", exp: "Đoạn 1: 'mechanical abrasion, photo-oxidative ultraviolet degradation, and wave shearing'." },
        { q: "What is the primary scientific warning articulated by the article?", opts: [{ key: "A", text: "Microplastics are completely inert and harmless" }, { key: "B", text: "Microplastics represent an irreversible planetary geochemical alteration and ecological hazard" }, { key: "C", text: "Plastic production will cease spontaneously tomorrow" }, { key: "D", text: "Microplastics can be completely filtered from all oceans within one year" }], a: "B", exp: "Thông điệp chính: Vi nhựa đại diện cho sự biến đổi địa chất - hóa sinh địa cầu không thể đảo ngược và là mối nguy hại sinh thái to lớn." }
      ];

      r2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 54}`,
          partNumber: 6,
          partTitle: "Reading Passage 2: Microplastic Geochemistry",
          section: "READING",
          passageText: readP2,
          questionText: `Question ${idx + 54}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // PASSAGE 3: Cognitive Evolutionary Anthropology of Symbolic Cave Art (Q67 - Q80: 14 Questions)
      const readP3 = `READING PASSAGE 3 — THE SYMBOLIC REVOLUTION: COGNITIVE EVOLUTION IN UPPER PALEOLITHIC CAVE ART\n\nThe emergence of sophisticated parietal cave art across Franco-Cantabria during the Upper Paleolithic—exemplified by the masterworks of Chauvet (circa 36,000 BP), Lascaux (17,000 BP), and Altamira (15,000 BP)—is widely celebrated as the definitive archaeological benchmark of the 'Human Creative Revolution.' For over a century, classical anthropologists interpreted these vivid polychrome depictions of stampeding bisons, woolly mammoths, and enigmatic hand stencils through the lens of simplistic 'hunting magic' or sympathetic fertility rituals. However, revolutionary interdisciplinary research synthesizing cognitive evolutionary anthropology, acoustic resonance mapping, and non-destructive pigment spectrometry has overturned these antiquated dogmas.\n\nHigh-resolution acoustic archaeology conducted inside the subterranean chambers of Niaux and Chauvet reveals an astonishing mathematical correlation between the spatial clustering of parietal zoomorphic paintings and acoustic resonance focal points. Upper Paleolithic artists consistently placed vivid representations of resonant fauna—such as roaring lions and thundering bison—at precise subterranean nodes where low-frequency sound vibrations echo with harmonic amplifications exceeding 25 decibels. This provides compelling physical evidence that Upper Paleolithic caves functioned not as passive decorative galleries, but as multisensory, immersive ritual performance spaces where acoustic chanting, flickering torchlight, and kinetic visual illusions converged.\n\nFurthermore, micro-spectrometric pigment analyses demonstrate that paleolithic artists utilized sophisticated chemical synthesis: black manganese dioxides and red ferric ochres were ground to microscopic grain sizes (under 5 microns) and blended with specialized organic binders such as bone marrow lipids and plant waxes to enhance longevity and adhesive viscosity. The deliberate combination of non-figurative geometric symbols (dots, grids, penniforms) with figurative animal motifs indicates the emergence of advanced externalized symbolic data storage—the cognitive precursor to formal proto-writing systems.`;

      const r3Questions = [
        { q: "What three famous prehistoric cave sites are cited in the article?", opts: [{ key: "A", text: "Stonehenge, Giza, and Petra" }, { key: "B", text: "Chauvet, Lascaux, and Altamira" }, { key: "C", text: "Pompeii, Carthage, and Troy" }, { key: "D", text: "Angkor, Borobudur, and Bagan" }], a: "B", exp: "Đoạn 1: 'Chauvet (circa 36,000 BP), Lascaux (17,000 BP), and Altamira (15,000 BP)'." },
        { q: "How did 19th-century classical anthropologists historically interpret cave art?", opts: [{ key: "A", text: "As astronomical celestial navigation star charts" }, { key: "B", text: "As simplistic 'hunting magic' or sympathetic fertility rituals" }, { key: "C", text: "As commercial market price lists" }, { key: "D", text: "As children's random doodles" }], a: "B", exp: "Đoạn 1: 'interpreted these vivid polychrome depictions... through the lens of simplistic hunting magic or sympathetic fertility rituals'." },
        { q: "What discovery was made by acoustic archaeology in caves like Chauvet and Niaux?", opts: [{ key: "A", text: "Ancient speakers made of copper" }, { key: "B", text: "A correlation between painting locations and acoustic resonance focal points" }, { key: "C", text: "Total absence of any sound reverberation" }, { key: "D", text: "Musical instruments carved into stone walls" }], a: "B", exp: "Đoạn 2: 'mathematical correlation between the spatial clustering of parietal zoomorphic paintings and acoustic resonance focal points'." },
        { q: "Where were depictions of roaring lions and bison deliberately painted?", opts: [{ key: "A", text: "At cave entrances exposed to bright sunlight" }, { key: "B", text: "At subterranean acoustic nodes where sound reverberation amplifies by >25 dB" }, { key: "C", text: "Only on flat cave floors" }, { key: "D", text: "On exterior cliffs outside caves" }], a: "B", exp: "Đoạn 2: 'at precise subterranean nodes where low-frequency sound vibrations echo with harmonic amplifications exceeding 25 decibels'." },
        { q: "What function did Upper Paleolithic caves serve according to modern anthropology?", opts: [{ key: "A", text: "Temporary food storage pantries" }, { key: "B", text: "Multisensory immersive ritual performance spaces (sound, light, visuals)" }, { key: "C", text: "Military defense bunkers" }, { key: "D", text: "Residential living quarters for entire tribes" }], a: "B", exp: "Đoạn 2: 'multisensory, immersive ritual performance spaces where acoustic chanting, flickering torchlight, and kinetic visual illusions converged'." },
        { q: "What minerals were used to produce black and red pigments?", opts: [{ key: "A", text: "Synthetic acrylic dyes" }, { key: "B", text: "Manganese dioxides (black) and ferric ochres (red)" }, { key: "C", text: "Crushed coal and gold dust" }, { key: "D", text: "Dried berry juices" }], a: "B", exp: "Đoạn 3: 'black manganese dioxides and red ferric ochres'." },
        { q: "To what microscopic particle size were pigment powders ground?", opts: [{ key: "A", text: "Under 5 microns" }, { key: "B", text: "50 microns" }, { key: "C", text: "1 millimeter" }, { key: "D", text: "5 centimeters" }], a: "A", exp: "Đoạn 3: 'ground to microscopic grain sizes (under 5 microns)'." },
        { q: "What organic binders were mixed with pigments to enhance adhesion?", opts: [{ key: "A", text: "Petroleum oil and epoxy glue" }, { key: "B", text: "Bone marrow lipids and plant waxes" }, { key: "C", text: "Egg whites and sea water" }, { key: "D", text: "Honey and milk" }], a: "B", exp: "Đoạn 3: 'blended with specialized organic binders such as bone marrow lipids and plant waxes'." },
        { q: "What non-figurative geometric signs are found alongside animal paintings?", opts: [{ key: "A", text: "Arabic numbers" }, { key: "B", text: "Dots, grids, and penniforms" }, { key: "C", text: "Greek alphabet letters" }, { key: "D", text: "Musical treble clefs" }], a: "B", exp: "Đoạn 3: 'non-figurative geometric symbols (dots, grids, penniforms)'." },
        { q: "What cognitive evolutionary milestone does the combination of geometric symbols represent?", opts: [{ key: "A", text: "Loss of speech abilities" }, { key: "B", text: "Emergence of externalized symbolic information storage (proto-writing)" }, { key: "C", text: "Inability to draw realistic animals" }, { key: "D", text: "Copying alien artifacts" }], a: "B", exp: "Đoạn 3: 'emergence of advanced externalized symbolic data storage—the cognitive precursor to formal proto-writing systems'." },
        { q: "What geographic region contains Franco-Cantabrian cave art?", opts: [{ key: "A", text: "Northern Africa" }, { key: "B", text: "Southern France and Northern Spain" }, { key: "C", text: "Eastern Siberia" }, { key: "D", text: "Central Australia" }], a: "B", exp: "Khu vực Franco-Cantabria nằm ở miền Nam nước Pháp và miền Bắc Tây Ban Nha." },
        { q: "How old are the parietal paintings at Chauvet Cave?", opts: [{ key: "A", text: "2,000 years" }, { key: "B", text: "10,000 years" }, { key: "C", text: "Approximately 36,000 years Before Present (BP)" }, { key: "D", text: "100,000 years" }], a: "C", exp: "Đoạn 1: 'Chauvet (circa 36,000 BP)'." },
        { q: "What visual effect was created by flickering torchlight against undulating cave walls?", opts: [{ key: "A", text: "Total darkness" }, { key: "B", text: "Kinetic visual illusions of animal motion" }, { key: "C", text: "Wall rock melting" }, { key: "D", text: "Smoke poisoning" }], a: "B", exp: "Đoạn 2: Ánh đuốc bập bùng trên bề mặt vách đá mấp mô tạo ảo giác động về sự di chuyển của đàn thú ('kinetic visual illusions')." },
        { q: "What is the primary thesis of the article?", opts: [{ key: "A", text: "Cave art was produced by amateur hunters without cultural purpose" }, { key: "B", text: "Upper Paleolithic cave art represents a complex synthesis of cognitive, acoustic, chemical, and symbolic sophistication" }, { key: "C", text: "All prehistoric paintings are modern forgeries" }, { key: "D", text: "Acoustic resonance in caves was purely accidental" }], a: "B", exp: "Luận điểm trọng tâm: Nghệ thuật hang động thể hiện bước nhảy vọt toàn diện về nhận thức, âm học, hóa học chất kết dính và hệ thống ký hiệu biểu tượng." }
      ];

      r3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 67}`,
          partNumber: 7,
          partTitle: "Reading Passage 3: Upper Paleolithic Symbolic Art",
          section: "READING",
          passageText: readP3,
          questionText: `Question ${idx + 67}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SPEAKING (Q81 - Q83)
      qs.push({
        id: "ia4k3_q81",
        partNumber: 8,
        partTitle: "IELTS Speaking Part 1: Environmental Science & Daily Habits",
        section: "SPEAKING",
        speakingPrompt: "1. How do you reduce your plastic waste in daily life? 2. Have you ever visited a natural conservation park or botanical garden? 3. Do you think schools should teach more environmental science?",
        preparationTimeSeconds: 15,
        speakingTimeSeconds: 60,
        questionText: "Question 81 (Speaking Part 1): Answer interview questions on plastic waste and natural conservation.",
        options: [{ key: "A", text: "Record 60-Second Speech" }, { key: "B", text: "Practice" }, { key: "C", text: "Model Audio" }, { key: "D", text: "Skip" }],
        correctAnswer: "A",
        explanation: "AI chấm 4 tiêu chí chuẩn IELTS Band 9.0 (Fluency, Lexical Resource, Grammatical Range, Pronunciation)."
      });

      qs.push({
        id: "ia4k3_q82",
        partNumber: 9,
        partTitle: "IELTS Speaking Part 2: Cue Card — An Archaeological Discovery",
        section: "SPEAKING",
        speakingPrompt: "Describe an ancient archaeological site or historical discovery that you find fascinating.\nYou should say:\n• Where it is located and how old it is\n• What archaeological artifacts or structures were discovered there\n• How ancient people engineered or built it\nAnd explain why you find this historical discovery so intriguing.",
        preparationTimeSeconds: 60,
        speakingTimeSeconds: 120,
        questionText: "Question 82 (Speaking Part 2): Deliver a 2-minute speech describing a fascinating archaeological discovery.",
        options: [{ key: "A", text: "Record 2-Minute Speech" }, { key: "B", text: "Practice" }, { key: "C", text: "Model Audio" }, { key: "D", text: "Skip" }],
        correctAnswer: "A",
        explanation: "Mô tả khảo cổ, kỹ thuật xây dựng cổ đại và ý nghĩa lịch sử mạch lạc trong 2 phút."
      });

      qs.push({
        id: "ia4k3_q83",
        partNumber: 10,
        partTitle: "IELTS Speaking Part 3: Scientific Research & Global Heritage",
        section: "SPEAKING",
        speakingPrompt: "1. Why is it important for governments to invest public tax revenue into archaeological and historical research?\n2. How can modern technology like satellite remote sensing and artificial intelligence assist in preserving world heritage sites?",
        preparationTimeSeconds: 20,
        speakingTimeSeconds: 90,
        questionText: "Question 83 (Speaking Part 3): Discuss public funding for science and AI in heritage conservation.",
        options: [{ key: "A", text: "Record 90-Second Speech" }, { key: "B", text: "Practice" }, { key: "C", text: "Model Audio" }, { key: "D", text: "Skip" }],
        correctAnswer: "A",
        explanation: "Lập luận chuyên sâu về vai trò của công nghệ viễn thám và AI trong bảo tồn di sản nhân loại."
      });

      // WRITING (Q84 - Q85)
      qs.push({
        id: "ia4k3_q84",
        partNumber: 11,
        partTitle: "IELTS Writing Task 1: Academic Report (Comparative Line Graph)",
        section: "WRITING",
        writingPrompt: "The line graph below shows the volume of global municipal solid plastic waste produced (in millions of metric tons) and the proportions recycled, incinerated for energy, and discarded in landfills between 1990 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Time suggested: 20 minutes).",
        minWordCount: 150,
        sampleEssay: "The provided line graph illustrates the total volume of global municipal solid plastic waste generated annually, measured in millions of metric tons (Mt), alongside the breakdown of three primary waste management pathways—landfilling, thermal incineration, and mechanical recycling—between 1990 and 2025.\n\nOverall, total plastic waste production experienced a dramatic upward surge over the thirty-five-year period. While disposal in municipal landfills remained the predominant method throughout the timeframe, the proportion of waste diverted to recycling facilities and energy-recovery incineration exhibited substantial percentage increases towards the latter half of the period.\n\nIn 1990, global plastic waste output stood at approximately 110 Mt, with an overwhelming 82% (roughly 90 Mt) discarded directly into landfills. Incineration accounted for a modest 14%, while mechanical recycling was virtually negligible at less than 4%. By 2010, total plastic generation had more than doubled to 260 Mt, with landfilling continuing to absorb the majority (62%), even as incineration expanded to 24% and recycling climbed to 14%.\n\nBy 2025, annual plastic waste generation escalated to a staggering 440 Mt. Although landfill volume remained high in absolute terms (210 Mt, or 48%), the combined share of sustainable treatments gained significant ground: mechanical recycling reached 26% (114 Mt) and incineration accounted for 26% (114 Mt), reflecting heightened global environmental regulations and advanced circular recycling technologies.",
        questionText: "Question 84 (Writing Task 1): Write an academic report summarizing global plastic waste trends (min 150 words).",
        options: [{ key: "A", text: "Submit Task 1 Report" }, { key: "B", text: "Practice" }, { key: "C", text: "Vocabulary" }, { key: "D", text: "Skip" }],
        correctAnswer: "A",
        explanation: "AI chấm 4 tiêu chí Cambridge: Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy."
      });

      qs.push({
        id: "ia4k3_q85",
        partNumber: 12,
        partTitle: "IELTS Writing Task 2: Academic Discursive Essay",
        section: "WRITING",
        writingPrompt: "Some environmentalists argue that the only effective solution to the global plastic pollution crisis is an outright international ban on all single-use plastics. Others contend that economic incentives for recycling and biodegradable material research are more pragmatic. Discuss both views and give your own opinion. (Write at least 250 words. Time suggested: 40 minutes).",
        minWordCount: 250,
        sampleEssay: "The escalating accumulation of synthetic polymer debris across terrestrial and marine ecosystems represents one of the most perilous environmental crises of the twenty-first century. While certain conservationists advocate that an immediate, legally binding international prohibition on all single-use plastics is the only viable remedy, others maintain that economic incentives and scientific innovation in biodegradable polymers offer a far more feasible strategy. In this essay, I will examine both perspectives and argue that a comprehensive hybrid policy combining strict bans on non-essential items with aggressive subsidies for bio-based materials provides the optimal solution.\n\nOn the one hand, proponents of outright bans argue that gradualist market approaches have failed to keep pace with exponential polymer manufacturing. Single-use plastic items—such as beverage bottles, polystyrene packaging, and shopping bags—have lifespans measured in minutes yet persist in the environment for centuries, disintegrating into toxic microplastics that contaminate global food chains. Prohibitive legislation creates immediate, decisive reductions in aggregate consumption and compels corporate supply chains to eliminate superfluous packaging. Jurisdictions such as the European Union and Rwanda demonstrate that stringent bans on non-essential single-use polymers achieve immediate reductions in municipal landfill burdens and coastal pollution.\n\nOn the other hand, advocates of pragmatic economic instruments argue that universal bans fail to account for irreplaceable applications in modern medicine, food preservation, and sterile pharmaceutical packaging. Without scalable alternatives, immediate prohibitions risk causing food spoilage, public health compromises, and severe economic disruptions for small businesses in developing economies. Consequently, creating fiscal incentives—such as extended producer responsibility (EPR) taxes on virgin polymers, tax credits for post-consumer recycled content, and capital investment grants for microbial polyhydroxyalkanoates (PHA) bioplastics—catalyzes the development of fully compostable closed-loop circular packaging.\n\nIn conclusion, while market mechanisms alone are insufficient to curb the global plastic deluge, draconian blanket bans without viable substitutes are economically untenable. Governments should enact mandatory bans on non-essential consumer plastics while simultaneously deploying robust economic incentives to accelerate the mass commercialization of biodegradable materials.",
        questionText: "Question 85 (Writing Task 2): Write a 250+ word academic discursive essay analyzing bans vs economic incentives for plastic pollution.",
        options: [{ key: "A", text: "Submit Task 2 Essay for Band 9.0 Evaluation" }, { key: "B", text: "Review Band 9 Transitions" }, { key: "C", text: "Check Lexical Resource" }, { key: "D", text: "Complete Full Test" }],
        correctAnswer: "A",
        explanation: "Bài luận Band 9.0 mẫu chuẩn Cambridge với phân tích lập luận chặt chẽ, cấu trúc câu đa dạng và từ vựng học thuật C2 ('polyhydroxyalkanoates', 'superfluous packaging', 'perilous environmental crises', 'draconian blanket bans')."
      });

      return qs;
    })()
  },

  // ---------------------------------------------------------------------------
  // 10. TOEIC SPEED TEST 2026 #01 (50 QUESTIONS SPEED WORKOUT)
  // ---------------------------------------------------------------------------
  {
    id: "toeic_mini_speed_01",
    title: "TOEIC Speed Sprint Test 2026 #01 (50 Questions)",
    type: "TOEIC_MINI",
    level: "Intermediate",
    timeLimitMinutes: 35,
    totalQuestions: 50,
    maxScore: 495,
    description: "Bài thi tốc độ 50 câu (20 Listening + 30 Reading) kiểm tra phản xạ nhanh từ vựng ngữ pháp TOEIC 2026.",
    categoryBadge: "TOEIC Speed",
    tags: ["TOEIC", "Speed Test", "50 Câu", "Reflex", "ETS 2026"],
    supportedSkills: ["LISTENING", "READING"],
    questions: (() => {
      const qs: ExamQuestion[] = [];

      // PART 1 (Q1-Q4)
      const miniP1 = [
        {
          id: "tms1_q1",
          imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          options: [
            { key: "A", text: "Chairs are arranged around a contemporary boardroom table." },
            { key: "B", text: "A presentation slide is being projected on the ceiling." },
            { key: "C", text: "Windows are being wiped down by cleaners." },
            { key: "D", text: "Office supplies are stacked on the carpet." }
          ],
          correctAnswer: "A" as const,
          explanation: "Ghế họp xếp gọn gàng quanh bàn phòng họp ('arranged around a contemporary boardroom table')."
        },
        {
          id: "tms1_q2",
          imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          options: [
            { key: "A", text: "Colleagues are shaking hands across an office partition." },
            { key: "B", text: "Team members are engaged in a lively group discussion." },
            { key: "C", text: "Documents are being filed into metal filing cabinets." },
            { key: "D", text: "Laptops are being packed into black backpacks." }
          ],
          correctAnswer: "B" as const,
          explanation: "Các thành viên trong nhóm đang trao đổi thảo luận sôi nổi ('engaged in a lively group discussion')."
        },
        {
          id: "tms1_q3",
          imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          options: [
            { key: "A", text: "A laboratory researcher is adjusting a precision microscope." },
            { key: "B", text: "Safety goggles are being stored inside a drawer." },
            { key: "C", text: "Chemical bottles are being washed under a faucet." },
            { key: "D", text: "Test tubes are being thrown into a waste bin." }
          ],
          correctAnswer: "A" as const,
          explanation: "Nghiên cứu viên đang điều chỉnh kính hiển vi trong phòng thí nghiệm ('adjusting a precision microscope')."
        },
        {
          id: "tms1_q4",
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          options: [
            { key: "A", text: "Pedestrians are crossing a street in front of a modern glass skyscraper." },
            { key: "B", text: "A commercial building is undergoing structural demolition." },
            { key: "C", text: "Traffic cones are placed along a closed subway entrance." },
            { key: "D", text: "Scaffolding surrounds the top floors of a tower." }
          ],
          correctAnswer: "A" as const,
          explanation: "Người đi bộ băng qua đường trước tòa nhà chọc trời bằng kính ('crossing a street in front of a modern glass skyscraper')."
        }
      ];

      miniP1.forEach((item, idx) => {
        qs.push({
          id: item.id,
          partNumber: 1,
          partTitle: "Mini Part 1: Photographs",
          section: "LISTENING",
          imageUrl: item.imageUrl,
          audioUrl: item.audioUrl,
          passageText: `[Audio Transcript - Photo #${idx + 1}]\nA. ${item.options[0].text}\nB. ${item.options[1].text}\nC. ${item.options[2].text}\nD. ${item.options[3].text}`,
          questionText: `Question ${idx + 1}: Listen and select the statement that best describes the photo.`,
          options: item.options as any,
          correctAnswer: item.correctAnswer,
          explanation: item.explanation
        });
      });

      // PART 2 (Q5-Q12: 8 Questions)
      const miniP2 = [
        { q: "Where can I pick up the parking pass for the municipal garage?", opts: [{ key: "A", text: "The security desk in the ground-floor lobby has them." }, { key: "B", text: "At twelve-thirty PM." }, { key: "C", text: "Yes, I parked on Level 3." }], a: "A" as const, exp: "Câu hỏi 'Where': 'The security desk in the ground-floor lobby has them'." },
        { q: "Who is coordinating the overseas marketing launch for the new tablet?", opts: [{ key: "A", text: "The tablet has ten hours of battery life." }, { key: "B", text: "Ms. Alvarez from the international team is leading it." }, { key: "C", text: "In thirty-five retail stores." }], a: "B" as const, exp: "Câu hỏi 'Who': 'Ms. Alvarez from the international team is leading it'." },
        { q: "When will the regional branch audit report be ready?", opts: [{ key: "A", text: "Right before the executive committee meeting on Thursday." }, { key: "B", text: "We checked fourteen accounts." }, { key: "C", text: "The audit office is on Floor 2." }], a: "A" as const, exp: "Câu hỏi 'When': 'Right before the executive committee meeting on Thursday'." },
        { q: "Why was the flight from Chicago delayed by two hours?", opts: [{ key: "A", text: "Severe thunderstorm activity over Lake Michigan." }, { key: "B", text: "At Gate C-14." }, { key: "C", text: "The ticket cost three hundred dollars." }], a: "A" as const, exp: "Giải thích nguyên nhân: Do bão sấm sét trên hồ Michigan." },
        { q: "Would you prefer to review the sales figures now or during lunch?", opts: [{ key: "A", text: "Let's look over them now while our schedules are clear." }, { key: "B", text: "The sandwich was delicious." }, { key: "C", text: "Over three hundred units sold." }], a: "A" as const, exp: "Câu hỏi lựa chọn thời điểm." },
        { q: "Has the graphic designer submitted the finalized promotional brochure?", opts: [{ key: "A", text: "She just uploaded the high-resolution PDF to the shared drive." }, { key: "B", text: "The brochure is twelve pages long." }, { key: "C", text: "Printed on matte paper." }], a: "A" as const, exp: "Xác nhận gián tiếp: Vừa tải file PDF lên ổ đĩa chung." },
        { q: "Why don't we test the audiovisual setup in the auditorium before the keynote?", opts: [{ key: "A", text: "The IT technician is finishing the sound check right now." }, { key: "B", text: "Over five hundred attendees." }, { key: "C", text: "The auditorium was renovated last year." }], a: "A" as const, exp: "Phản hồi câu rủ rê: Kỹ thuật viên IT đang hoàn thiện việc thử âm thanh." },
        { q: "How much did the company spend on cloud server hosting last quarter?", opts: [{ key: "A", text: "Approximately forty-five thousand dollars." }, { key: "B", text: "In the Dublin data center." }, { key: "C", text: "Our uptime was 99.9%." }], a: "A" as const, exp: "Câu hỏi chi phí 'How much': 'Approximately forty-five thousand dollars'." }
      ];

      miniP2.forEach((item, idx) => {
        const qNum = idx + 5;
        qs.push({
          id: `tms1_q${qNum}`,
          partNumber: 2,
          partTitle: "Mini Part 2: Question-Response",
          section: "LISTENING",
          audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(idx % 4) + 1}.mp3`,
          passageText: `[Audio Transcript - Q${qNum}]\nQuestion: "${item.q}"\n(A) ${item.opts[0].text}\n(B) ${item.opts[1].text}\n(C) ${item.opts[2].text}`,
          questionText: `Question ${qNum}: Listen and choose the best response.`,
          options: [
            { key: "A", text: item.opts[0].text },
            { key: "B", text: item.opts[1].text },
            { key: "C", text: item.opts[2].text },
            { key: "D", text: "(Not Applicable in Part 2)" }
          ],
          correctAnswer: item.a,
          explanation: item.exp
        });
      });

      // PART 3 (Q13-Q18: 2 Dialogues × 3 Questions = 6 Questions)
      const miniP3 = [
        {
          dialogue: "Man: Good morning, Jennifer. Have you received the updated safety inspection report for Warehouse 4?\nWoman: Yes, Brian. The fire marshal identified two blocked emergency exit aisles in the packaging zone. We need to clear those corridors before Friday's reinspection.\nMan: I will have the warehouse logistics crew relocate the excess pallet stacks to Storage Bay B this afternoon.\nWoman: Great. I will notify the municipal inspector so he can schedule the final walkthrough for 10:00 AM on Friday.",
          questions: [
            { q: "What problem was identified in Warehouse 4?", opts: [{ key: "A", text: "A broken elevator motor" }, { key: "B", text: "Two blocked emergency exit aisles in packaging" }, { key: "C", text: "A water pipe leak" }, { key: "D", text: "Power outage in cold storage" }], a: "B" as const, exp: "Vấn đề: 'two blocked emergency exit aisles in the packaging zone'." },
            { q: "What will the man have the logistics crew do?", opts: [{ key: "A", text: "Install smoke detectors" }, { key: "B", text: "Relocate excess pallet stacks to Storage Bay B" }, { key: "C", text: "Paint the floor yellow" }, { key: "D", text: "Lock the warehouse gates" }], a: "B" as const, exp: "Hành động: 'relocate the excess pallet stacks to Storage Bay B'." },
            { q: "When is the reinspection walkthrough scheduled?", opts: [{ key: "A", text: "Today at 2:00 PM" }, { key: "B", text: "Friday at 10:00 AM" }, { key: "C", text: "Next Monday morning" }, { key: "D", text: "In two weeks" }], a: "B" as const, exp: "Lịch tái kiểm tra: '10:00 AM on Friday'." }
          ]
        },
        {
          dialogue: "Woman: Mr. Davies, our client from Tokyo just confirmed that they want to accelerate the software deployment by two weeks.\nMan: That is ambitious! To meet that timeline, our frontend engineering team will need temporary contractor reinforcements.\nWoman: I will contact TechTalent Recruiters to onboard three specialized React developers by Monday morning.\nMan: Perfect. Please also arrange an all-hands project alignment meeting for 9:30 AM on Monday.",
          questions: [
            { q: "What request did the Tokyo client make?", opts: [{ key: "A", text: "Cancel the software project" }, { key: "B", text: "Accelerate software deployment by two weeks" }, { key: "C", text: "Reduce the contract budget" }, { key: "D", text: "Change the project manager" }], a: "B" as const, exp: "Yêu cầu: 'accelerate the software deployment by two weeks'." },
            { q: "How will the woman resolve the staffing requirement?", opts: [{ key: "A", text: "By hiring three specialized React contractor developers" }, { key: "B", text: "By outsourcing to another country" }, { key: "C", text: "By canceling employee vacations" }, { key: "D", text: "By using automated AI coding bots exclusively" }], a: "A" as const, exp: "Giải pháp nhân sự: 'onboard three specialized React developers by Monday morning'." },
            { q: "What is scheduled for 9:30 AM on Monday?", opts: [{ key: "A", text: "A client contract signing" }, { key: "B", text: "An all-hands project alignment meeting" }, { key: "C", text: "A software launch party" }, { key: "D", text: "A hardware server reboot" }], a: "B" as const, exp: "Sự kiện sáng thứ Hai: 'all-hands project alignment meeting for 9:30 AM'." }
          ]
        }
      ];

      let mP3Q = 13;
      miniP3.forEach((set, sIdx) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tms1_q${mP3Q}`,
            partNumber: 3,
            partTitle: "Mini Part 3: Conversations",
            section: "LISTENING",
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(sIdx % 4) + 1}.mp3`,
            passageText: `[Audio Transcript - Conversation #${sIdx + 1}]\n${set.dialogue}`,
            questionText: `Question ${mP3Q}: ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
          mP3Q++;
        });
      });

      // PART 4 (Q19-Q20: 1 Short Talk × 2 Questions)
      const miniP4 = {
        transcript: "Attention all passengers waiting for flight UA-882 to San Francisco. Boarding will commence in approximately ten minutes through Gate 34B. We will begin boarding with passengers requiring special assistance, followed by Active Military and Premier 1K members. Please have your digital mobile boarding pass and government photo ID ready for gate scanning. Complimentary carry-on bag gate-checking is available for passengers in Groups 4 and 5.",
        questions: [
          { q: "Which flight is preparing for boarding?", opts: [{ key: "A", text: "Flight AA-104 to Chicago" }, { key: "B", text: "Flight UA-882 to San Francisco" }, { key: "C", text: "Flight DL-330 to Atlanta" }, { key: "D", text: "Flight BA-178 to London" }], a: "B" as const, exp: "Chuyến bay: 'flight UA-882 to San Francisco'." },
          { q: "What should passengers have ready for gate scanning?", opts: [{ key: "A", text: "Credit card only" }, { key: "B", text: "Digital mobile boarding pass and government photo ID" }, { key: "C", text: "Vaccine certificate" }, { key: "D", text: "Paper luggage claim tags" }], a: "B" as const, exp: "Giấy tờ cần xuất trình: 'digital mobile boarding pass and government photo ID'." }
        ]
      };

      miniP4.questions.forEach((qItem, idx) => {
        const qNum = idx + 19;
        qs.push({
          id: `tms1_q${qNum}`,
          partNumber: 4,
          partTitle: "Mini Part 4: Short Talks",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          passageText: `[Audio Transcript - Talk]\n${miniP4.transcript}`,
          questionText: `Question ${qNum}: ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a,
          explanation: qItem.exp
        });
      });

      // PART 5 (Q21-Q35: 15 Questions)
      const miniP5 = [
        { q: "Ms. Tanaka _______ presented the third-quarter regional sales analysis to the board.", a: "C" as const, opts: [{ key: "A", text: "success" }, { key: "B", text: "successful" }, { key: "C", text: "successfully" }, { key: "D", text: "succeed" }], exp: "Trạng từ 'successfully' bổ nghĩa cho động từ 'presented'." },
        { q: "All conference attendees must wear their identification badges _______ entering the exhibition hall.", a: "B" as const, opts: [{ key: "A", text: "during" }, { key: "B", text: "when" }, { key: "C", text: "since" }, { key: "D", text: "whereas" }], exp: "Liên từ 'when + V-ing' ('when entering...')." },
        { q: "The hotel offers _______ shuttle bus service to the airport every thirty minutes.", a: "D" as const, opts: [{ key: "A", text: "compliment" }, { key: "B", text: "complimented" }, { key: "C", text: "complimenting" }, { key: "D", text: "complimentary" }], exp: "Tính từ 'complimentary' = miễn phí." },
        { q: "Mr. Henderson has _______ managed the European marketing team for over seven years.", a: "A" as const, opts: [{ key: "A", text: "effectively" }, { key: "B", text: "effective" }, { key: "C", text: "effect" }, { key: "D", text: "effectiveness" }], exp: "Trạng từ 'effectively' bổ nghĩa cho 'has managed'." },
        { q: "_______ heavy traffic on the highway, the delivery truck arrived at the warehouse on time.", a: "C" as const, opts: [{ key: "A", text: "Although" }, { key: "B", text: "Because" }, { key: "C", text: "Despite" }, { key: "D", text: "Even though" }], exp: "'Despite + noun phrase' = Mặc dù giao thông tắc nghẽn." },
        { q: "The executive committee will meet tomorrow to _______ the proposed corporate acquisition.", a: "A" as const, opts: [{ key: "A", text: "discuss" }, { key: "B", text: "discussion" }, { key: "C", text: "discussing" }, { key: "D", text: "discussed" }], exp: "Sau 'to' chỉ mục đích cần động từ nguyên mẫu 'discuss'." },
        { q: "The updated safety guidelines are _______ to all manufacturing employees starting next week.", a: "B" as const, opts: [{ key: "A", text: "apply" }, { key: "B", text: "applicable" }, { key: "C", text: "application" }, { key: "D", text: "applicably" }], exp: "Cấu trúc 'are applicable to' = có thể áp dụng cho." },
        { q: "Please return the signed agreement to human resources _______ 5:00 PM today.", a: "B" as const, opts: [{ key: "A", text: "until" }, { key: "B", text: "by" }, { key: "C", text: "for" }, { key: "D", text: "within" }], exp: "'By + mốc thời gian' biểu thị hạn chót nộp tài liệu." },
        { q: "The new accounting software is both intuitive _______ highly secure.", a: "C" as const, opts: [{ key: "A", text: "or" }, { key: "B", text: "nor" }, { key: "C", text: "and" }, { key: "D", text: "but" }], exp: "Cặp liên từ tương quan 'both... and...'." },
        { q: "Employees who complete the leadership certification are _______ for rapid career promotion.", a: "A" as const, opts: [{ key: "A", text: "eligible" }, { key: "B", text: "illegible" }, { key: "C", text: "eligibility" }, { key: "D", text: "eligibly" }], exp: "'Eligible for' = đủ điều kiện." },
        { q: "The research team worked _______ to meet the tight project deadline.", a: "D" as const, opts: [{ key: "A", text: "tire" }, { key: "B", text: "tired" }, { key: "C", text: "tiring" }, { key: "D", text: "tirelessly" }], exp: "Trạng từ 'tirelessly' (không biết mệt mỏi) bổ nghĩa cho 'worked'." },
        { q: "Neither the marketing lead nor the senior designers _______ satisfied with the initial packaging mockup.", a: "A" as const, opts: [{ key: "A", text: "were" }, { key: "B", text: "was" }, { key: "C", text: "is" }, { key: "D", text: "has been" }], exp: "Cấu trúc 'Neither... nor...': Động từ chia theo danh từ gần nhất 'senior designers' (số nhiều) → 'were'." },
        { q: "The company announced a _______ increase in its research and development budget for 2027.", a: "B" as const, opts: [{ key: "A", text: "substantially" }, { key: "B", text: "substantial" }, { key: "C", text: "substance" }, { key: "D", text: "substantiate" }], exp: "Tính từ 'substantial' bổ nghĩa cho danh từ 'increase'." },
        { q: "All laboratory chemicals must be stored _______ according to occupational safety regulations.", a: "C" as const, opts: [{ key: "A", text: "proper" }, { key: "B", text: "property" }, { key: "C", text: "properly" }, { key: "D", text: "propriety" }], exp: "Trạng từ 'properly' bổ nghĩa cho động từ bị động 'stored'." },
        { q: "The annual report indicates that customer satisfaction has improved _______ over the past year.", a: "A" as const, opts: [{ key: "A", text: "significantly" }, { key: "B", text: "significant" }, { key: "C", text: "significance" }, { key: "D", text: "signify" }], exp: "Trạng từ 'significantly' bổ nghĩa cho 'has improved'." }
      ];

      miniP5.forEach((item, idx) => {
        const qNum = idx + 21;
        qs.push({
          id: `tms1_q${qNum}`,
          partNumber: 5,
          partTitle: "Mini Part 5: Incomplete Sentences",
          section: "READING",
          questionText: `${qNum}. ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a,
          explanation: item.exp
        });
      });

      // PART 6 (Q36-Q40: 1 Passage × 5 Questions)
      const miniP6Passage = "NOTICE TO ALL CORPORATE HEADQUARTERS STAFF\nDate: October 29, 2026\nSubject: Scheduled Network Infrastructure Upgrade\n\nPlease be advised that the central IT Directorate will perform a comprehensive network server upgrade this coming Saturday, November 1st, from 8:00 PM to 4:00 AM Sunday. This essential modernization will [36] _______ our cloud data processing bandwidth and strengthen cybersecurity defenses against ransomware.\n\nDuring the eight-hour maintenance window, all corporate email accounts, VPN access portals, and shared database drives will be temporarily [37] _______. Personnel are strongly advised to save all active work files and log out of their computer terminals [38] _______ 7:30 PM on Saturday.\n\n[39] _______. Normal network operations will resume [40] _______ 5:00 AM on Sunday morning.\n\nIT Support Directorate";

      const miniP6Questions = [
        { blank: 36, q: "Select the best word for blank [36].", opts: [{ key: "A", text: "expand" }, { key: "B", text: "expansion" }, { key: "C", text: "expansive" }, { key: "D", text: "expansively" }], a: "A" as const, exp: "Sau 'will' cần động từ nguyên thể 'expand'." },
        { blank: 37, q: "Select the best word for blank [37].", opts: [{ key: "A", text: "unavailable" }, { key: "B", text: "unavailability" }, { key: "C", text: "unavailably" }, { key: "D", text: "unavail" }], a: "A" as const, exp: "Tính từ 'unavailable' sau 'will be temporarily'." },
        { blank: 38, q: "Select the best word for blank [38].", opts: [{ key: "A", text: "prior to" }, { key: "B", text: "since" }, { key: "C", text: "except" }, { key: "D", text: "during" }], a: "A" as const, exp: "'Prior to + time' = trước 7:30 tối thứ Bảy." },
        { blank: 39, q: "Select the most appropriate sentence for blank [39].", opts: [{ key: "A", text: "The cafeteria lunch menu has been posted on the bulletin board." }, { key: "B", text: "Emergency technical support will remain available via the on-call helpdesk phone." }, { key: "C", text: "The annual holiday party is scheduled for December." }, { key: "D", text: "Parking fees will increase starting next month." }], a: "B" as const, exp: "Câu B cung cấp thông tin đường dây trực kỹ thuật khẩn cấp khi hệ thống bảo trì." },
        { blank: 40, q: "Select the best word for blank [40].", opts: [{ key: "A", text: "promptly at" }, { key: "B", text: "while" }, { key: "C", text: "among" }, { key: "D", text: "between" }], a: "A" as const, exp: "'Promptly at + time' = đúng 5:00 sáng Chủ Nhật." }
      ];

      miniP6Questions.forEach((qItem) => {
        qs.push({
          id: `tms1_q${qItem.blank}`,
          partNumber: 6,
          partTitle: "Mini Part 6: Text Completion",
          section: "READING",
          passageText: miniP6Passage,
          questionText: `${qItem.blank}. ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a,
          explanation: qItem.exp
        });
      });

      // PART 7 (Q41-Q50: 10 Questions = 1 Single + 1 Double Passage)
      // Single (Q41-Q45)
      const miniP7Single = "[PRESS RELEASE]\n\nAPEX CYBERSECURITY ANNOUNCES NEW EUROPEAN HEADQUARTERS IN DUBLIN\nDUBLIN, IRELAND — October 25, 2026\n\nApex Cybersecurity Solutions, an international leader in enterprise cloud data protection, today officially opened its new 85,000-square-foot European Regional Headquarters in Dublin's Silicon Docks technology district. The state-of-the-art facility will serve as the operational hub for Apex's Threat Intelligence and 24/7 Security Operations Center (SOC) servicing over 1,200 enterprise clients across Europe, the Middle East, and Africa (EMEA).\n\nThe new facility represents a €60 million direct foreign investment and will create 450 high-skilled engineering, threat analysis, and customer success positions over the next 24 months. CEO Marcus Thornton commented, 'Dublin offers an exceptional ecosystem of multilingual technical talent and world-class academic research partnerships that will accelerate our next-generation automated threat defense solutions.'";

      const miniP7SingleQuestions = [
        { qNum: 41, q: "Where is Apex Cybersecurity's new European headquarters located?", opts: [{ key: "A", text: "London, UK" }, { key: "B", text: "Silicon Docks, Dublin, Ireland" }, { key: "C", text: "Frankfurt, Germany" }, { key: "D", text: "Amsterdam, Netherlands" }], a: "B" as const, exp: "Địa điểm: 'Silicon Docks technology district in Dublin, Ireland'." },
        { qNum: 42, q: "How large is the new Dublin facility?", opts: [{ key: "A", text: "25,000 sq ft" }, { key: "B", text: "50,000 sq ft" }, { key: "C", text: "85,000 square feet" }, { key: "D", text: "150,000 sq ft" }], a: "C" as const, exp: "Diện tích: '85,000-square-foot European Regional Headquarters'." },
        { qNum: 43, q: "How much did Apex invest in the new facility?", opts: [{ key: "A", text: "€20 million" }, { key: "B", text: "€40 million" }, { key: "C", text: "€60 million direct foreign investment" }, { key: "D", text: "€100 million" }], a: "C" as const, exp: "Vốn đầu tư: '€60 million direct foreign investment'." },
        { qNum: 44, q: "How many jobs will be created over the next 24 months?", opts: [{ key: "A", text: "150 jobs" }, { key: "B", text: "300 jobs" }, { key: "C", text: "450 high-skilled engineering and threat analysis positions" }, { key: "D", text: "1,000 jobs" }], a: "C" as const, exp: "Số lượng việc làm: 'create 450 high-skilled engineering, threat analysis, and customer success positions'." },
        { qNum: 45, q: "How many enterprise clients does the Security Operations Center service?", opts: [{ key: "A", text: "350 clients" }, { key: "B", text: "750 clients" }, { key: "C", text: "Over 1,200 enterprise clients" }, { key: "D", text: "5,000 clients" }], a: "C" as const, exp: "Số lượng khách hàng doanh nghiệp: 'servicing over 1,200 enterprise clients across EMEA'." }
      ];

      miniP7SingleQuestions.forEach((qItem) => {
        qs.push({
          id: `tms1_q${qItem.qNum}`,
          partNumber: 7,
          partTitle: "Mini Part 7: Reading Comprehension",
          section: "READING",
          passageText: miniP7Single,
          questionText: `${qItem.qNum}. ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a,
          explanation: qItem.exp
        });
      });

      // Double (Q46-Q50)
      const miniP7Double = "[EMAIL 1 — CATERING SERVICE INQUIRY]\nFrom: sarah.jenkins@novabiotech.com\nTo: events@gourmetbistro.com\nDate: October 18, 2026\nSubject: Catering Request — Annual Biotech Milestone Gala (Nov 20)\n\nDear Gourmet Bistro Catering Team,\n\nNovaBiotech will host our Annual Milestone Gala on Friday, November 20th at the Grand View Ballroom in Seattle. We anticipate 180 guests and would like to request a formal proposal for a 3-course plated dinner service.\n\nPlease note the following dietary preferences:\n• 25 vegetarian/vegan guests (dairy-free and nut-free)\n• 15 gluten-free meals\n\nPlease confirm your menu options, pricing per guest, and deposit requirements.\n\nSincerely,\nSarah Jenkins, Event Director\n\n---\n\n[EMAIL 2 — FORMAL CATERING PROPOSAL]\nFrom: marcus.vance@gourmetbistro.com\nTo: sarah.jenkins@novabiotech.com\nDate: October 19, 2026\nSubject: RE: Catering Proposal #GB-4491 — NovaBiotech Gala (Nov 20)\n\nDear Ms. Jenkins,\n\nThank you for choosing Gourmet Bistro Catering! We are delighted to submit our proposal for your November 20th event:\n\n• 3-Course Plated Dinner: $65 per guest x 180 guests = $11,700.00\n• Dedicated Server & Chef Service Staff (8 staff x 5 hours): $1,600.00\n• Full Bar Service Package: $20 per guest x 180 guests = $3,600.00\n\nSubtotal: $16,900.00\nService Charge & Municipal Tax (18%): $3,042.00\nTotal Package Amount: $19,942.00\nRequired Deposit (25% due upon contract signing): $4,985.50\n\nWe fully accommodate all 25 vegan/dairy-free and 15 gluten-free meals with our Executive Chef's custom allergen-safe culinary creations at no extra surcharge.\n\nBest regards,\nMarcus Vance, Lead Event Coordinator";

      const miniP7DoubleQuestions = [
        { qNum: 46, q: "What event is Sarah Jenkins planning?", opts: [{ key: "A", text: "A summer corporate picnic" }, { key: "B", text: "The Annual Biotech Milestone Gala in Seattle" }, { key: "C", text: "A small employee retirement lunch" }, { key: "D", text: "A trade expo booth" }], a: "B" as const, exp: "Sự kiện: 'Annual Biotech Milestone Gala on Friday, November 20th at the Grand View Ballroom in Seattle'." },
        { qNum: 47, q: "How many total guests are anticipated at the gala?", opts: [{ key: "A", text: "80 guests" }, { key: "B", text: "120 guests" }, { key: "C", text: "180 guests" }, { key: "D", text: "250 guests" }], a: "C" as const, exp: "Số lượng khách mời: 'anticipate 180 guests'." },
        { qNum: 48, q: "What is the dinner price per guest on the proposal?", opts: [{ key: "A", text: "$45 per guest" }, { key: "B", text: "$65 per guest" }, { key: "C", text: "$85 per guest" }, { key: "D", text: "$100 per guest" }], a: "B" as const, exp: "Đơn giá tiệc/khách: '$65 per guest'." },
        { qNum: 49, q: "Is there an extra surcharge for the special dietary vegan and gluten-free meals?", opts: [{ key: "A", text: "Yes, $10 per meal" }, { key: "B", text: "No, they are provided at no extra surcharge" }, { key: "C", text: "Yes, 18% additional fee" }, { key: "D", text: "Guests must bring their own food" }], a: "B" as const, exp: "Phí phụ thu đồ ăn kiêng: 'at no extra surcharge'." },
        { qNum: 50, q: "How much deposit is required upon signing the catering contract?", opts: [{ key: "A", text: "$1,600.00" }, { key: "B", text: "$3,042.00" }, { key: "C", text: "$4,985.50 (25% deposit)" }, { key: "D", text: "$19,942.00" }], a: "C" as const, exp: "Tiền đặt cọc hợp đồng 25%: '$4,985.50'." }
      ];

      miniP7DoubleQuestions.forEach((qItem) => {
        qs.push({
          id: `tms1_q${qItem.qNum}`,
          partNumber: 7,
          partTitle: "Mini Part 7: Reading Comprehension",
          section: "READING",
          passageText: miniP7Double,
          questionText: `${qItem.qNum}. ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a,
          explanation: qItem.exp
        });
      });

      return qs;
    })()
  }
];

  // Dynamically populate composite 4-Skills Master paper questions
  const p0 = papers.find(p => p.id === "toeic_lr_2026_01");
  const pSW = papers.find(p => p.id === "toeic_sw_2026_01");
  const p4k = papers.find(p => p.id === "toeic_full_4k_01");
  if (p4k && p0 && pSW) {
    p4k.questions = [
      ...p0.questions.map((q, idx) => ({ ...q, id: `t4k_q${idx + 1}` })),
      ...pSW.questions.map((q, idx) => ({ ...q, id: `t4k_q${201 + idx}`, questionText: `Question ${201 + idx} [${q.section}]: ${q.questionText}` }))
    ];
  }

  return papers;
})();
