import { ExamPaper, ExamQuestion } from "./types";

export const toeicSpeakingPro01Paper: ExamPaper = {
  id: "toeic_speaking_pro_01",
  title: "TOEIC Speaking AI Intensive #01",
  type: "TOEIC_SPEAKING_WRITING",
  level: "Advanced",
  timeLimitMinutes: 20,
  totalQuestions: 11,
  maxScore: 200,
  description: "Phòng luyện thi Nói chuyên sâu TOEIC Speaking chuẩn ETS (11 câu hỏi): Đọc to đoạn văn phát âm chuẩn, miêu tả tranh kho vận & phòng thí nghiệm, trả lời tình huống kinh doanh, lịch trình hội thảo Silicon Valley và bài nói quan điểm 60s về tuần làm việc 4 ngày.",
  categoryBadge: "TOEIC Speaking",
  tags: ["TOEIC", "Speaking Only", "ETS Standard", "AI Studio"],
  supportedSkills: ["SPEAKING"],
  questions: [
    // Questions 1-2: Read a Text Aloud
    {
      id: "tsp1_q1",
      partNumber: 1,
      partTitle: "TOEIC Speaking Part 1: Read a Text Aloud (Airport Gate Announcement)",
      section: "SPEAKING",
      speakingPrompt:
        "Read the text aloud as naturally and clearly as possible:\n\n'Attention all passengers on Global Pacific Flight 814 with non-stop service to Singapore. Boarding is now commencing at Gate 42 for first-class and business-class travelers. Please have your physical boarding passes and government-issued passports ready for optical scanning at the biometric gate. Passengers traveling with small children or requiring special physical assistance may also proceed down the jet bridge at this time.'",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 1: Read the airport boarding gate announcement aloud (45 seconds preparation, 45 seconds recording).",
      options: [
            { key: "A", text: "Record Speech Response" },
            { key: "B", text: "Check Pronunciation Guide" },
            { key: "C", text: "Listen to Native Audio" },
            { key: "D", text: "Skip to Question 2" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [TIÊU CHÍ CHẤM ETS - PRONUNCIATION & INTONATION]
- Phát âm chuẩn các phụ âm cuối: "passengers", "passes", "passports", "scanning".
- Lên giọng nhẹ ở các danh từ liệt kê: "first-class ↗", "business-class ↗" và hạ giọng ở cuối câu ↘.`
    },
    {
      id: "tsp1_q2",
      partNumber: 1,
      partTitle: "TOEIC Speaking Part 1: Read a Text Aloud (Commercial Radio Broadcast)",
      section: "SPEAKING",
      speakingPrompt:
        "Read the text aloud as naturally and clearly as possible:\n\n'Are you looking to enhance your company's digital marketing reach without exceeding your quarterly advertising budget? Apex Media Solutions offers customized search engine optimization, automated email campaigns, and comprehensive social media analytics tailored specifically for growing enterprises. Call our dedicated client support team today at 1-800-555-APEX to schedule your complimentary strategy consultation.'",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 2: Read the commercial media advertisement aloud (45s prep, 45s recording).",
      options: [
            { key: "A", text: "Check Intonation Rising/Falling Rules" },
            { key: "B", text: "Record Speech Response" },
            { key: "C", text: "Listen to Native Model Speech" },
            { key: "D", text: "Skip to Part 2" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [TIÊU CHÍ CHẤM ETS - RHYTHM & STRESS]
- Nhấn mạnh các từ khóa chức năng: "enhance", "digital marketing", "customized", "complimentary strategy consultation".`
    },

    // Questions 3-4: Describe a Picture
    {
      id: "tsp1_q3",
      partNumber: 2,
      partTitle: "TOEIC Speaking Part 2: Describe a Picture (Automated Logistics Warehouse)",
      section: "SPEAKING",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      speakingPrompt: "Describe the picture on your screen with as much detail as possible in 30 seconds.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 30,
      questionText: "Question 3: Describe the automated logistics distribution center photograph (45s prep, 30s speaking).",
      options: [
            { key: "A", text: "View 3-Step Spatial Structure" },
            { key: "B", text: "Listen to Model Answer" },
            { key: "C", text: "Record Picture Description" },
            { key: "D", text: "Skip to Question 4" }
          ],
      correctAnswer: "C",
      explanation: `🎯 [CHIẾN THUẬT MÔ TẢ TRANH 30S]
- Bắt đầu tổng quan (Main focus): "This photo was taken inside a modern high-ceiling logistics distribution warehouse."
- Chi tiết trung tâm & hậu cảnh: "In the foreground, several automated guided forklifts and pallets loaded with cardboard shipping boxes are neatly aligned along the aisle. In the background, tall metallic storage racks stretch toward the roof under bright industrial lighting."
- Cảm nhận: "The entire facility looks highly organized, efficient, and technologically advanced."`
    },
    {
      id: "tsp1_q4",
      partNumber: 2,
      partTitle: "TOEIC Speaking Part 2: Describe a Picture (Executive Boardroom Presentation)",
      section: "SPEAKING",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
      speakingPrompt: "Describe the picture on your screen with as much detail as possible in 30 seconds.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 30,
      questionText: "Question 4: Describe the executive boardroom meeting photograph (45s prep, 30s speaking).",
      options: [
            { key: "A", text: "View Professional Lexical Bank" },
            { key: "B", text: "Listen to Model Answer" },
            { key: "C", text: "Skip to Part 3" },
            { key: "D", text: "Record Picture Description" }
          ],
      correctAnswer: "D",
      explanation: `🎯 [CHIẾN THUẬT MÔ TẢ TRANH 30S]
- Tổng quan: "This picture captures a corporate boardroom during a strategic financial presentation."
- Chi tiết: "On the right, a female executive standing next to a large digital screen is pointing to colorful quarterly performance charts. Seated around the polished wooden conference table, several professional colleagues in business attire are attentively listening and taking notes on their laptops."
- Không khí: "The atmosphere appears productive, collaborative, and focused."`
    },

    // Questions 5-7: Respond to Questions (Business Travel & Hotel Booking)
    {
      id: "tsp1_q5",
      partNumber: 3,
      partTitle: "TOEIC Speaking Part 3: Respond to Questions (Business Hotel Amenities)",
      section: "SPEAKING",
      speakingPrompt: "How frequently do you travel for business, and how do you usually book your hotel accommodations?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 5: Answer the interview question on business travel frequency (3s prep, 15s speaking).",
      options: [
            { key: "A", text: "Record 15-Second Answer" },
            { key: "B", text: "View Direct Response Template" },
            { key: "C", text: "Listen to Model Answer" },
            { key: "D", text: "Skip to Question 6" }
          ],
      correctAnswer: "A",
      explanation: `🔍 [BÀI MẪU 15S]
"I travel for business approximately once every two months, and I typically reserve my hotels through our corporate travel portal to take advantage of negotiated corporate rates."`
    },
    {
      id: "tsp1_q6",
      partNumber: 3,
      partTitle: "TOEIC Speaking Part 3: Respond to Questions (Important Room Amenities)",
      section: "SPEAKING",
      speakingPrompt: "What is the most important amenity you look for when selecting a hotel for a business trip?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 6: Answer the interview question on key hotel amenities (3s prep, 15s speaking).",
      options: [
            { key: "A", text: "View Key Vocabulary" },
            { key: "B", text: "Record 15-Second Answer" },
            { key: "C", text: "Listen to Model Answer" },
            { key: "D", text: "Skip to Question 7" }
          ],
      correctAnswer: "B",
      explanation: `🔍 [BÀI MẪU 15S]
"The most critical amenity for me is high-speed fiber-optic Wi-Fi and an ergonomic workstation in the room, so I can conduct video conferences smoothly without technical lag."`
    },
    {
      id: "tsp1_q7",
      partNumber: 3,
      partTitle: "TOEIC Speaking Part 3: Respond to Questions (Downtown vs Airport Hotel)",
      section: "SPEAKING",
      speakingPrompt: "Do you prefer staying at a hotel located downtown near city attractions or directly adjacent to the airport? Why?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 30,
      questionText: "Question 7: Answer the 30-second comparative hotel choice question (3s prep, 30s speaking).",
      options: [
            { key: "A", text: "View Argument Template" },
            { key: "B", text: "Listen to Model Answer" },
            { key: "C", text: "Record 30-Second Answer" },
            { key: "D", text: "Skip to Part 4" }
          ],
      correctAnswer: "C",
      explanation: `🔍 [BÀI MẪU 30S]
"I definitely prefer staying at a downtown hotel during business trips. While airport hotels offer convenience for early morning flights, downtown accommodations place me within walking distance of client offices, diverse dining venues, and local public transit. This allows me to combine productive meetings with exploring the city's cultural scene in the evening."`
    },

    // Questions 8-10: Respond to Questions using Information Provided
    {
      id: "tsp1_q8",
      partNumber: 4,
      partTitle: "TOEIC Speaking Part 4: Schedule Query (Keynote Opening Time)",
      section: "SPEAKING",
      passageText: `SILICON VALLEY AI LEADERSHIP SUMMIT — SCHEDULE\nDate: Thursday, November 19, 2026\nLocation: Santa Clara Convention Center, Hall A\n\n• 8:30 AM – 9:00 AM: Registration & Networking Breakfast\n• 9:00 AM – 10:15 AM: Keynote: 'The Future of Autonomous Enterprise AI' by Dr. Eric Vance (OpenCloud AI)\n• 10:30 AM – 12:00 PM: Workshop A: 'Cloud Data Center Security' (Room 201) — Fee: Free for All Attendees\n• 12:00 PM – 1:30 PM: Catered Executive Luncheon (Ballroom B)\n• 1:30 PM – 3:00 PM: Workshop B: 'Generative AI for Finance' (Room 204) — Led by Sarah Jenkins (CFO, FinTech Global)\n• 3:15 PM – 4:30 PM: Panel Discussion: 'Ethics and Regulatory Governance in AI'`,
      speakingPrompt: "Hello, I am attending the Silicon Valley AI Leadership Summit on Thursday. Could you tell me what time the opening keynote begins and who the speaker is?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 8: Answer the schedule inquiry regarding the keynote session (3s prep, 15s speaking).",
      options: [
            { key: "A", text: "View Schedule Information" },
            { key: "B", text: "Listen to Model Answer" },
            { key: "C", text: "Skip to Question 9" },
            { key: "D", text: "Record 15-Second Answer" }
          ],
      correctAnswer: "D",
      explanation: `🔍 [BÀI MẪU 15S]
"Certainly! The opening keynote presentation begins at 9:00 AM and will be delivered by Dr. Eric Vance from OpenCloud AI on 'The Future of Autonomous Enterprise AI'."`
    },
    {
      id: "tsp1_q9",
      partNumber: 4,
      partTitle: "TOEIC Speaking Part 4: Schedule Query (Workshop A Registration Fee)",
      section: "SPEAKING",
      speakingPrompt: "I heard that Workshop A on Cloud Data Center Security requires an additional 50-dollar registration fee. Is that correct?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 9: Correct the misconception regarding Workshop A fees (3s prep, 15s speaking).",
      options: [
            { key: "A", text: "Record 15-Second Answer" },
            { key: "B", text: "View Schedule Correction" },
            { key: "C", text: "Listen to Model Answer" },
            { key: "D", text: "Skip to Question 10" }
          ],
      correctAnswer: "A",
      explanation: `🔍 [BÀI MẪU 15S]
"Actually, no, that information is incorrect. Workshop A on Cloud Data Center Security from 10:30 AM to 12:00 PM is completely free of charge for all registered summit attendees."`
    },
    {
      id: "tsp1_q10",
      partNumber: 4,
      partTitle: "TOEIC Speaking Part 4: Schedule Query (Afternoon Sessions Detail)",
      section: "SPEAKING",
      speakingPrompt: "Could you give me the complete details of all sessions scheduled for the afternoon after the catered luncheon?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 30,
      questionText: "Question 10: Detail all afternoon sessions from the schedule (3s prep, 30s speaking).",
      options: [
            { key: "A", text: "View Full Afternoon Schedule" },
            { key: "B", text: "Record 30-Second Answer" },
            { key: "C", text: "Listen to Model Answer" },
            { key: "D", text: "Skip to Question 11" }
          ],
      correctAnswer: "B",
      explanation: `🔍 [BÀI MẪU 30S]
"Certainly! There are two sessions scheduled for the afternoon. First, from 1:30 PM to 3:00 PM, Workshop B on 'Generative AI for Finance' will be held in Room 204, led by Sarah Jenkins, CFO at FinTech Global. Following that, from 3:15 PM to 4:30 PM, there will be a panel discussion on 'Ethics and Regulatory Governance in AI' to conclude the summit."`
    },

    // Question 11: Express an Opinion (4-Day Workweek Policy)
    {
      id: "tsp1_q11",
      partNumber: 5,
      partTitle: "TOEIC Speaking Part 5: Express an Opinion (4-Day Workweek Policy)",
      section: "SPEAKING",
      speakingPrompt:
        "Many companies around the world are currently piloting a 4-day workweek (32 hours with equal pay). Do you think adopting a 4-day workweek is beneficial for overall employee productivity and company success? Give specific reasons and examples to support your opinion.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 60,
      questionText: "Question 11: Express your opinion on the 4-day workweek policy (45s preparation, 60s speaking).",
      options: [
            { key: "A", text: "Review 3-Part Opinion Framework" },
            { key: "B", text: "Listen to Band 200/200 Model Speech" },
            { key: "C", text: "Record 60-Second Opinion Speech" },
            { key: "D", text: "Complete TOEIC Speaking Test" }
          ],
      correctAnswer: "C",
      explanation: `🎯 [CHIẾN THUẬT PART 5 EXPRESS AN OPINION (60S)]
- Mở bài: Khẳng định quan điểm rõ ràng ("I strongly believe that adopting a 4-day workweek is immensely beneficial for both employee well-being and long-term organizational success").
- Luận điểm 1: Tăng cường tập trung và cắt giảm các cuộc họp vô bổ ("Eliminates unproductive meeting bloat, encouraging staff to operate with heightened focus").
- Luận điểm 2: Giảm tỷ lệ kiệt sức (burnout) và tăng tỷ lệ giữ chân nhân tài ("An extra rest day allows employees to recharge fully, drastically cutting absenteeism and turnover").
- Kết bài: Khẳng định ("Therefore, this model creates a powerful win-win outcome for modern businesses").

🔍 [BÀI NÓI MẪU 200/200 ETS]
"I strongly believe that adopting a four-day workweek is exceptionally beneficial for both employee productivity and overall company success.

First and foremost, condensing the workweek into thirty-two focused hours eliminates unnecessary administrative bloat and unproductive meetings. When employees know their time is compressed, they prioritize essential deliverables and utilize automation tools far more effectively. For example, recent corporate trials in the UK demonstrated a thirty-five percent increase in business revenue alongside shorter working hours.

Secondly, an additional rest day significantly mitigates employee burnout and mental fatigue. Staff return to the workplace on Monday fully rejuvenated, which dramatically reduces absenteeism, healthcare costs, and costly employee turnover.

In conclusion, modern productivity should be measured by tangible results rather than hours spent sitting at a desk. Implementing a four-day workweek creates a happier, more motivated workforce that drives sustainable business growth."`
    }
  ]
};
