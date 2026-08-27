import { ExamPaper, ExamQuestion } from "./types";

export const toeicSw202601Paper: ExamPaper = {
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
      partTitle: "Speaking Part 1: Read a Text Aloud",
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
      explanation: `🎯 **Mục tiêu điểm số:** Phát âm chuẩn xác, ngắt nghỉ theo cụm nghĩa (chunking) và thể hiện ngữ điệu tự nhiên.

🗣️ **Kỹ thuật phát âm & Ngữ điệu then chốt:**
- **Trọng âm từ trọng điểm:** \`shareholders\` (/ˈʃeəˌhəʊldəz/), \`commence\` (/kəˈmens/), \`governance\` (/ˈɡʌvənəns/), \`foyer\` (/ˈfɔɪeɪ/).
- **Ngắt cụm hơi (Pausing):** 
  "Good morning / and welcome to the annual shareholders meeting / for Zenith Global Logistics."
  "Before we commence the executive presentation, / please ensure that all mobile devices / are switched to silent mode."
- **Âm đuôi (Final Sounds):** Bật rõ các âm /s/, /z/, /t/, /d/ trong \`shareholders\`, \`devices\`, \`switched\` (/swɪtʃt/), \`desk\` (/desk/).

🔍 **Dịch nghĩa văn bản:**
Xin chào buổi sáng và chào mừng quý vị đến với đại hội cổ đông thường niên của Zenith Global Logistics. Trước khi chúng ta bắt đầu bài thuyết trình của ban điều hành, vui lòng đảm bảo rằng tất cả các thiết bị di động đã được chuyển sang chế độ im lặng. Bản in miễn phí của báo cáo tổng quan tài chính năm 2025 và báo cáo quản trị doanh nghiệp có sẵn tại bàn thông tin ở tiền sảnh chính. Sau bài phát biểu chính của Tổng Giám đốc Marcus Vance, sẽ có phiên hỏi đáp mở kéo dài 30 phút.

💡 **Từ vựng đắt giá:**
- \`annual shareholders meeting\` (đại hội cổ đông thường niên)
- \`commence\` (bắt đầu, khởi sự)
- \`corporate governance report\` (báo cáo quản trị doanh nghiệp)`
    },
    {
      id: "tsw_q2",
      partNumber: 1,
      partTitle: "Speaking Part 1: Read a Text Aloud",
      section: "SPEAKING",
      speakingPrompt: "Read the advertisement aloud into the microphone. You have 45 seconds to prepare and 45 seconds to speak.",
      passageText: "Are you planning a home renovation or upgrading your office workspace? Metro Design Studio is excited to announce our semi-annual showroom liquidation sale. From Friday through Sunday, enjoy discounts of up to forty percent on all handcrafted hardwood tables, ergonomic desk chairs, and modern lighting fixtures. Visit our flagship downtown showroom on Elm Street or browse our virtual catalog at metrodesign.com. Delivery is complimentary on all local purchases exceeding five hundred dollars.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 2: Read the promotional advertisement aloud maintaining enthusiastic tone and clear listing intonation.",
      options: [
            { key: "A", text: "Practice pronunciation mode" },
            { key: "B", text: "Ready to record speech" },
            { key: "C", text: "Listen to native audio guide" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "B",
      explanation: `🎯 **Mục tiêu điểm số:** Thể hiện tông giọng quảng cáo hào hứng, lên giọng ở câu hỏi Yes/No và quy tắc liệt kê (Listing Intonation).

🗣️ **Kỹ thuật phát âm & Ngữ điệu then chốt:**
- **Ngữ điệu câu hỏi Yes/No:** Lên giọng ở cuối câu: "workspace? ↗"
- **Quy tắc liệt kê (A ↗, B ↗, and C ↘):**
  "handcrafted hardwood tables ↗, ergonomic desk chairs ↗, and modern lighting fixtures ↘."
- **Trọng âm từ khó:** \`liquidation\` (/ˌlɪkwɪˈdeɪʃn/), \`ergonomic\` (/ˌɜːɡəˈnɒmɪk/), \`complimentary\` (/ˌkɒmplɪˈmentri/).

🔍 **Dịch nghĩa văn bản:**
Bạn đang lên kế hoạch cải tạo nhà cửa hoặc nâng cấp không gian làm việc văn phòng? Metro Design Studio vui mừng thông báo đợt xả hàng trưng bày định kỳ nửa năm một lần của chúng tôi. Từ thứ Sáu đến Chủ nhật, hãy tận hưởng mức giảm giá lên tới 40% cho tất cả các mẫu bàn gỗ cứng thủ công, ghế văn phòng công thái học và thiết bị chiếu sáng hiện đại. Hãy ghé thăm phòng trưng bày hàng đầu của chúng tôi tại trung tâm thành phố trên đường Elm hoặc duyệt qua danh mục trực tuyến tại metrodesign.com. Miễn phí giao hàng cho tất cả các đơn mua nội địa vượt quá 500 đô la.

💡 **Từ vựng đắt giá:**
- \`semi-annual showroom liquidation sale\` (đợt xả kho phòng trưng bày nửa năm một lần)
- \`ergonomic desk chair\` (ghế làm việc công thái học)
- \`complimentary delivery\` (giao hàng miễn phí)`
    },

    // SPEAKING PART 2: DESCRIBE A PICTURE (Q3 - Q4)
    {
      id: "tsw_q3",
      partNumber: 2,
      partTitle: "Speaking Part 2: Describe a Picture",
      section: "SPEAKING",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      speakingPrompt: "Describe the picture in as much detail as possible. You have 45 seconds to prepare and 45 seconds to speak.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 3: Describe the modern collaborative office environment shown in the photograph.",
      options: [
            { key: "A", text: "View AI vocabulary suggestions" },
            { key: "B", text: "Review sample response transcript" },
            { key: "C", text: "Record image description" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "C",
      explanation: `🎯 **Cấu trúc bài nói 4 bước đạt điểm tối đa (Band 8):**

🗣️ **Bài nói mẫu (Sample Response):**
"This photograph captures a vibrant brainstorming session inside a contemporary open-plan office. In the center of the frame, four young professionals are gathered around a wooden table. A woman wearing a casual denim shirt is leaning forward and gesturing towards a laptop screen, seemingly explaining a digital project proposal. Beside her, three colleagues are listening with keen interest and taking notes. On the table, I can see several laptops, coffee mugs, and printed documents. In the background, there are floor-to-ceiling glass windows allowing ample natural light to fill the room. Overall, the atmosphere appears highly dynamic, productive, and focused on creative collaboration."

🔍 **Phân tích từng phần:**
1. **Tổng quan (Overview):** Khung cảnh buổi thảo luận tại văn phòng hiện đại (vibrant brainstorming session in an open-plan office).
2. **Trọng tâm (Central Action):** Người phụ nữ chỉ tay vào laptop giải thích đề án, đồng nghiệp lắng nghe chăm chú (gesturing towards a laptop screen, listening with keen interest).
3. **Chi tiết & Hậu cảnh (Details & Background):** Cốc cà phê, tài liệu trên bàn; cửa kính đón ánh sáng tự nhiên (floor-to-ceiling glass windows).
4. **Cảm nhận chung (Inference/Mood):** Không khí làm việc năng động, hiệu quả (dynamic, productive, collaborative).

💡 **Từ vựng đắt giá:**
- \`open-plan office\` (văn phòng không gian mở)
- \`brainstorming session\` (buổi họp lên ý tưởng)
- \`floor-to-ceiling windows\` (cửa sổ kính từ sàn đến trần)`
    },
    {
      id: "tsw_q4",
      partNumber: 2,
      partTitle: "Speaking Part 2: Describe a Picture",
      section: "SPEAKING",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      speakingPrompt: "Describe the picture in as much detail as possible. You have 45 seconds to prepare and 45 seconds to speak.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 4: Describe the business presentation and audience engagement in the conference hall.",
      options: [
            { key: "A", text: "View AI vocabulary suggestions" },
            { key: "B", text: "Review sample response transcript" },
            { key: "C", text: "Skip to next question" },
            { key: "D", text: "Record image description" }
          ],
      correctAnswer: "D",
      explanation: `🎯 **Cấu trúc bài nói 4 bước đạt điểm tối đa (Band 8):**

🗣️ **Bài nói mẫu (Sample Response):**
"This picture depicts an engaging business workshop taking place in an executive conference room. On the left side, a male presenter dressed in a professional blazer is standing beside a large display monitor, delivering an insightful presentation. In the foreground, several attendees are seated along a polished meeting table. They are attentively focusing on the slides while holding notebooks and pens to record key takeaways. The room is equipped with state-of-the-art audiovisual technology and modern lighting. Judging from their attentive postures, the session seems to be an informative and high-level training seminar."

🔍 **Phân tích từng phần:**
1. **Tổng quan:** Buổi hội thảo kinh doanh trong phòng họp cấp cao (engaging business workshop in an executive conference room).
2. **Hành động chính:** Diễn giả đứng thuyết trình bên màn hình chiếu lớn (delivering an insightful presentation).
3. **Người tham dự:** Khán giả ngồi tập trung theo dõi và ghi chép (attentively focusing on slides, recording key takeaways).
4. **Đánh giá tổng thể:** Buổi đào tạo chuyên nghiệp và giàu thông tin (informative high-level seminar).

💡 **Từ vựng đắt giá:**
- \`executive conference room\` (phòng hội nghị cao cấp)
- \`state-of-the-art audiovisual equipment\` (thiết bị nghe nhìn tối tân)
- \`record key takeaways\` (ghi chép lại các điểm cốt lõi)`
    },

    // SPEAKING PART 3: RESPOND TO QUESTIONS (Q5 - Q7: Topic: Online Shopping & Delivery)
    {
      id: "tsw_q5",
      partNumber: 3,
      partTitle: "Speaking Part 3: Respond to Questions",
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
      explanation: `🎯 **Mục tiêu 15 giây:** Trả lời trực diện cả 2 ý trong câu hỏi (tần suất + nền tảng yêu thích) kèm 1 lý do bổ trợ.

🗣️ **Bài nói mẫu (Sample Response):**
"I shop online for groceries about twice a week, and my go-to mobile app is Amazon Fresh because it offers a user-friendly interface and highly reliable same-day delivery."

🔍 **Cấu trúc trả lời:**
- Tần suất: "about twice a week"
- Nền tảng: "my go-to mobile app is [App Name]"
- Lý do ngắn: "because of its user-friendly interface and same-day delivery"

💡 **Từ vựng đắt giá:**
- \`go-to app\` (ứng dụng quen thuộc / ưu tiên hàng đầu)
- \`same-day delivery\` (dịch vụ giao hàng trong ngày)`
    },
    {
      id: "tsw_q6",
      partNumber: 3,
      partTitle: "Speaking Part 3: Respond to Questions",
      section: "SPEAKING",
      speakingPrompt: "When buying clothes online, what is the most important factor you consider before placing an order: customer reviews, price discounts, or return policies?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 6: What is the most crucial factor when buying apparel online: customer reviews, price, or return policies?",
      options: [
            { key: "A", text: "Review grammatical templates" },
            { key: "B", text: "Record 15-second response" },
            { key: "C", text: "Listen to sample response" },
            { key: "D", text: "Skip question" }
          ],
      correctAnswer: "B",
      explanation: `🎯 **Mục tiêu 15 giây:** Lựa chọn 1 trong 3 yếu tố và đưa ra lời giải thích thuyết phục trong thời gian ngắn.

🗣️ **Bài nói mẫu (Sample Response):**
"For me, customer reviews with real user photos are the most decisive factor, as they provide authentic feedback about the actual fabric texture and accurate sizing before I purchase."

🔍 **Cấu trúc trả lời:**
- Đưa ra quan điểm: "For me, [Factor] is the most decisive factor..."
- Giải thích: "as it provides authentic feedback about fabric texture and sizing"

💡 **Từ vựng đắt giá:**
- \`decisive factor\` (yếu tố mang tính quyết định)
- \`authentic feedback\` (phản hồi thực tế, đáng tin cậy)
- \`accurate sizing\` (kích cỡ chuẩn xác)`
    },
    {
      id: "tsw_q7",
      partNumber: 3,
      partTitle: "Speaking Part 3: Respond to Questions",
      section: "SPEAKING",
      speakingPrompt: "Do you think physical retail stores will eventually be completely replaced by e-commerce platforms in the next twenty years? Explain your opinion with specific reasons and examples.",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 30,
      questionText: "Question 7: Will brick-and-mortar retail stores be entirely replaced by e-commerce in the next two decades?",
      options: [
            { key: "A", text: "Review grammatical templates" },
            { key: "B", text: "Listen to sample response" },
            { key: "C", text: "Record 30-second response" },
            { key: "D", text: "Skip question" }
          ],
      correctAnswer: "C",
      explanation: `🎯 **Mục tiêu 30 giây:** Trình bày luận điểm mạch lạc (Khẳng định quan điểm -> Luận cứ 1 -> Luận cứ 2 -> Kết luận).

🗣️ **Bài nói mẫu (Sample Response):**
"I firmly believe that physical stores will not be completely replaced. Although online shopping offers incredible convenience, brick-and-mortar stores provide sensory shopping experiences where customers can physically touch fabrics, test electronic gadgets, and receive instant customer service. Moreover, shopping malls have evolved into social entertainment hubs for dining and leisure. Therefore, both shopping channels will continue to coexist harmoniously."

🔍 **Phân tích kết cấu:**
- **Mở ý:** "I firmly believe physical stores will not be completely replaced."
- **Lý do 1 (Trải nghiệm thực tế):** "sensory shopping experience, physically touch fabrics, test gadgets"
- **Lý do 2 (Giá trị xã hội):** "social entertainment hubs for dining and leisure"
- **Kết luận:** "both channels will continue to coexist harmoniously"

💡 **Từ vựng đắt giá:**
- \`brick-and-mortar stores\` (cửa hàng vật lý truyền thống)
- \`sensory shopping experience\` (trải nghiệm mua sắm đa giác quan)
- \`coexist harmoniously\` (cùng tồn tại song song hài hòa)`
    },

    // SPEAKING PART 4: RESPOND USING INFORMATION PROVIDED (Q8 - Q10: Tech Conference Agenda)
    {
      id: "tsw_q8",
      partNumber: 4,
      partTitle: "Speaking Part 4: Respond Using Information Provided",
      section: "SPEAKING",
      passageText: "AGENDA: PACIFIC TECH INNOVATION FORUM\nDate: Thursday, November 19, 2026\nLocation: Hyatt Regency Grand Ballroom, Seattle\n\n• 08:30 AM - 09:00 AM: Registration & Continental Breakfast (Lobby)\n• 09:00 AM - 10:15 AM: Keynote Speech: 'Next-Gen Artificial Intelligence in Supply Chain' — Dr. Alan Foster, CTO of CloudPulse Inc.\n• 10:30 AM - 12:00 PM: Panel Discussion: Cybersecurity Strategies for Enterprise Cloud\n• 12:00 PM - 01:30 PM: Networking Luncheon & Product Showcase (Dining Terrace)\n• 01:30 PM - 03:00 PM: Workshop A: Migrating Legacy Databases to Serverless Architecture — Lead: Samantha Lee (Room 102)\n• 01:30 PM - 03:00 PM: Workshop B: AI-Driven UI/UX Design Optimization — Lead: Kevin Patel (Room 105)\n• 03:15 PM - 04:30 PM: Closing Remarks & Startup Pitch Competition (Grand Ballroom)",
      speakingPrompt: "Hello, I am registered for the Pacific Tech Innovation Forum on November 19th, but I misplaced my event schedule. Could you please tell me when the forum starts and who is delivering the opening keynote speech?",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 15,
      questionText: "Question 8: When does the forum commence and who delivers the opening keynote address?",
      options: [
            { key: "A", text: "Review agenda details" },
            { key: "B", text: "Listen to native model answer" },
            { key: "C", text: "Skip question" },
            { key: "D", text: "Record 15-second response" }
          ],
      correctAnswer: "D",
      explanation: `🎯 **Mục tiêu 15 giây:** Trích xuất chính xác thời gian bắt đầu và tên diễn giả chính từ bảng lịch trình.

🗣️ **Bài nói mẫu (Sample Response):**
"According to the schedule, registration begins at 8:30 AM, and the opening keynote speech will be delivered from 9:00 AM to 10:15 AM by Dr. Alan Foster, Chief Technology Officer of CloudPulse Inc."

💡 **Từ vựng đắt giá:**
- \`According to the schedule\` (Theo như lịch trình)
- \`deliver the keynote speech\` (trình bày bài phát biểu khai mạc)`
    },
    {
      id: "tsw_q9",
      partNumber: 4,
      partTitle: "Speaking Part 4: Respond Using Information Provided",
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
      explanation: `🎯 **Mục tiêu 15 giây:** Đính chính thông tin hiểu lầm (Correction) một cách lịch sự dựa trên lịch ăn trưa on-site.

🗣️ **Bài nói mẫu (Sample Response):**
"No, actually that is not correct. There is a complimentary networking luncheon and product showcase provided right at the Dining Terrace from 12:00 PM to 1:30 PM."

💡 **Từ vựng đắt giá:**
- \`No, actually that is not correct\` (Dạ không, thực ra thông tin đó chưa chính xác)
- \`networking luncheon\` (tiệc trưa giao lưu kết nối)`
    },
    {
      id: "tsw_q10",
      partNumber: 4,
      partTitle: "Speaking Part 4: Respond Using Information Provided",
      section: "SPEAKING",
      passageText: "AGENDA: PACIFIC TECH INNOVATION FORUM (Same as Q8)",
      speakingPrompt: "I am specifically interested in the afternoon workshop sessions. Could you please give me all the details about the workshops scheduled for the afternoon?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 30,
      questionText: "Question 10: Provide complete details for all afternoon workshops taking place from 1:30 PM to 3:00 PM.",
      options: [
            { key: "A", text: "Review agenda details" },
            { key: "B", text: "Record 30-second response" },
            { key: "C", text: "Listen to native model answer" },
            { key: "D", text: "Skip question" }
          ],
      correctAnswer: "B",
      explanation: `🎯 **Mục tiêu 30 giây:** Liệt kê đầy đủ 2 workshop song song (Tên workshop, người hướng dẫn, số phòng).

🗣️ **Bài nói mẫu (Sample Response):**
"Certainly! There are two concurrent workshops scheduled from 1:30 PM to 3:00 PM. First, Workshop A covers 'Migrating Legacy Databases to Serverless Architecture', led by Samantha Lee in Room 102. Second, Workshop B focuses on 'AI-Driven UI/UX Design Optimization', conducted by Kevin Patel in Room 105."

💡 **Từ vựng đắt giá:**
- \`concurrent workshops\` (các buổi hội thảo diễn ra song song)
- \`conducted by / led by\` (được chủ trì bởi...)`
    },

    // SPEAKING PART 5: EXPRESS AN OPINION (Q11)
    {
      id: "tsw_q11",
      partNumber: 5,
      partTitle: "Speaking Part 5: Express an Opinion",
      section: "SPEAKING",
      speakingPrompt: "Do you agree or disagree with the following statement? 'Companies should require all employees to attend mandatory professional development seminars at least once every quarter.' Give reasons and examples to support your stance. You have 45 seconds to prepare and 60 seconds to speak.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 60,
      questionText: "Question 11: Should organizations mandate quarterly professional development training for all personnel?",
      options: [
            { key: "A", text: "View essay outline framework" },
            { key: "B", text: "Listen to Band 8 sample speech" },
            { key: "C", text: "Record 60-second opinion speech" },
            { key: "D", text: "Skip question" }
          ],
      correctAnswer: "C",
      explanation: `🎯 **Cấu trúc bài nói 60s Band 8 (Intro -> Point 1 -> Point 2 -> Conclusion):**

🗣️ **Bài nói mẫu (Sample Response):**
"I strongly agree that companies should require quarterly professional development seminars for all staff members. 

First and foremost, in today's fast-paced corporate environment, industry knowledge and technological tools evolve rapidly. Regular training allows employees to upskill, master cutting-edge software like AI analytics, and maintain strong competitive productivity. 

Secondly, structured quarterly seminars serve as excellent team-building platforms. Employees from different departments can exchange insights, solve cross-functional challenges, and build stronger internal synergy. 

For example, at my previous technology firm, quarterly design workshops noticeably reduced project delivery delays by thirty percent. 

In conclusion, investing in mandatory quarterly development seminars brings tremendous long-term value to both employee career growth and corporate success."

🔍 **Phân tích cấu trúc:**
- **Mở bài (10s):** Khẳng định tán thành (I strongly agree that...).
- **Luận điểm 1 (20s):** Cập nhật kỹ năng số và công nghệ (upskill, master AI tools, competitive productivity).
- **Luận điểm 2 (15s):** Gắn kết liên phòng ban (team-building, cross-functional synergy).
- **Ví dụ thực tế (10s):** Công ty cũ giảm 30% thời gian trễ hạn dự án (reduced delivery delays by 30%).
- **Kết luận (5s):** Khẳng định lợi ích đôi bên (tremendous long-term value).

💡 **Từ vựng đắt giá:**
- \`fast-paced corporate environment\` (môi trường doanh nghiệp nhịp độ nhanh)
- \`cross-functional synergy\` (sự cộng hưởng liên phòng ban)
- \`upskill and reskill\` (nâng cao và bồi dưỡng kỹ năng mới)`
    },

    // WRITING PART 1: WRITE A SENTENCE BASED ON A PICTURE (Q12 - Q16: Q1 to Q5 of Writing)
    {
      id: "tsw_q12",
      partNumber: 6,
      partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the TWO words provided: [manager / explain].",
      questionText: "Question 12 (Writing Q1): Write one grammatically accurate sentence using the prompt words: 'manager' and 'explain'.",
      sampleEssay: "The project manager is explaining the quarterly financial report to her colleagues using a laptop.",
      options: [
            { key: "A", text: "View grammar rules" },
            { key: "B", text: "Check vocabulary collocations" },
            { key: "C", text: "Skip question" },
            { key: "D", text: "Submit Sentence for AI Grading" }
          ],
      correctAnswer: "D",
      explanation: `🎯 **Tiêu chí chấm điểm ETS Writing Part 1:**
1. **Đầy đủ 2 từ khóa:** Bắt buộc có cả \`manager\` và \`explain\`.
2. **Đúng ngữ pháp 100%:** Chia đúng thì hiện tại tiếp diễn (Present Continuous) hoặc hiện tại đơn, hòa hợp chủ ngữ - vị ngữ.
3. **Mô tả sát hình ảnh:** Phù hợp với bối cảnh người phụ nữ đang thao tác máy tính và giải thích.

✍️ **Các câu mẫu đạt điểm tuyệt đối (Score 3/3):**
- "The project manager is explaining the quarterly financial report to her colleagues using a laptop."
- "A manager is explaining the new corporate guidelines while working on her computer."

⚠️ **Lưu ý lỗi thường gặp:**
- Sai: "The manager is explain..." (Thiếu đuôi -ing).
- Sai: "The manager explains about the report" (Động từ 'explain' đi trực tiếp với tân ngữ: \`explain something to someone\`, KHÔNG dùng 'explain about').`
    },
    {
      id: "tsw_q13",
      partNumber: 6,
      partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the TWO words provided: [warehouse / operate].",
      questionText: "Question 13 (Writing Q2): Write one sentence using the prompt words: 'warehouse' and 'operate'.",
      sampleEssay: "A certified technician is operating a forklift to move heavy cargo pallets inside the logistics warehouse.",
      options: [
            { key: "A", text: "Submit Sentence for AI Grading" },
            { key: "B", text: "View grammar rules" },
            { key: "C", text: "Check vocabulary collocations" },
            { key: "D", text: "Skip question" }
          ],
      correctAnswer: "A",
      explanation: `🎯 **Tiêu chí chấm điểm ETS Writing Part 1:**
1. **Đầy đủ 2 từ khóa:** \`warehouse\` và \`operate\`.
2. **Đúng ngữ pháp:** \`is operating\` (chủ ngữ số ít đi với động từ số ít) + giới từ nơi chốn \`in / inside the warehouse\`.

✍️ **Các câu mẫu đạt điểm tuyệt đối (Score 3/3):**
- "A certified technician is operating a forklift to move heavy cargo pallets inside the logistics warehouse."
- "Workers are operating industrial machinery to stack cardboard boxes in the warehouse."

💡 **Từ vựng hay:**
- \`operate a forklift\` (vận hành xe nâng hàng)
- \`cargo pallets\` (các kiện hàng pallet)`
    },
    {
      id: "tsw_q14",
      partNumber: 6,
      partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the TWO words provided: [customer / credit card].",
      questionText: "Question 14 (Writing Q3): Write one sentence using the prompt words: 'customer' and 'credit card'.",
      sampleEssay: "A customer is paying for her retail purchase by inserting a credit card into the payment terminal.",
      options: [
            { key: "A", text: "View grammar rules" },
            { key: "B", text: "Submit Sentence for AI Grading" },
            { key: "C", text: "Check vocabulary collocations" },
            { key: "D", text: "Skip question" }
          ],
      correctAnswer: "B",
      explanation: `🎯 **Tiêu chí chấm điểm ETS Writing Part 1:**
1. **Đầy đủ 2 từ khóa:** \`customer\` và \`credit card\`.
2. **Cụm giới từ chuẩn:** \`with a credit card\`, \`by credit card\`, hoặc \`inserting a credit card into the terminal\`.

✍️ **Các câu mẫu đạt điểm tuyệt đối (Score 3/3):**
- "A customer is paying for her retail purchase by inserting a credit card into the payment terminal."
- "The customer is handing her credit card to the store cashier at the checkout counter."

💡 **Từ vựng hay:**
- \`payment terminal / POS machine\` (máy quét thanh toán thẻ)
- \`checkout counter\` (quầy thanh toán)`
    },
    {
      id: "tsw_q15",
      partNumber: 6,
      partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the TWO words provided: [inspect / blueprint].",
      questionText: "Question 15 (Writing Q4): Write one sentence using the prompt words: 'inspect' and 'blueprint'.",
      sampleEssay: "Two civil engineers wearing protective hard hats are inspecting architectural blueprints at the construction site.",
      options: [
            { key: "A", text: "View grammar rules" },
            { key: "B", text: "Check vocabulary collocations" },
            { key: "C", text: "Submit Sentence for AI Grading" },
            { key: "D", text: "Skip question" }
          ],
      correctAnswer: "C",
      explanation: `🎯 **Tiêu chí chấm điểm ETS Writing Part 1:**
1. **Đầy đủ 2 từ khóa:** \`inspect\` và \`blueprint\`.
2. **Hòa hợp chủ vị:** Chủ ngữ số nhiều (Two civil engineers / The workers) đi với trợ động từ số nhiều (are inspecting).

✍️ **Các câu mẫu đạt điểm tuyệt đối (Score 3/3):**
- "Two civil engineers wearing protective hard hats are inspecting architectural blueprints at the construction site."
- "The site supervisors are carefully inspecting the construction blueprint outdoors."

💡 **Từ vựng hay:**
- \`protective hard hats\` (mũ cứng bảo hộ công trường)
- \`architectural blueprints\` (bản vẽ thiết kế kiến trúc)`
    },
    {
      id: "tsw_q16",
      partNumber: 6,
      partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the TWO words provided: [meeting / discuss].",
      questionText: "Question 16 (Writing Q5): Write one sentence using the prompt words: 'meeting' and 'discuss'.",
      sampleEssay: "During the weekly department meeting, colleagues are actively discussing strategic business targets.",
      options: [
            { key: "A", text: "View grammar rules" },
            { key: "B", text: "Check vocabulary collocations" },
            { key: "C", text: "Skip question" },
            { key: "D", text: "Submit Sentence for AI Grading" }
          ],
      correctAnswer: "D",
      explanation: `🎯 **Tiêu chí chấm điểm ETS Writing Part 1:**
1. **Đầy đủ 2 từ khóa:** \`meeting\` và \`discuss\`.
2. **Cấu trúc động từ đặc biệt:** \`discuss\` là ngoại động từ (transitive verb), đi kèm trực tiếp với tân ngữ: \`discuss the project\` (KHÔNG dùng 'discuss about').

✍️ **Các câu mẫu đạt điểm tuyệt đối (Score 3/3):**
- "During the weekly department meeting, colleagues are actively discussing strategic business targets."
- "Team members gathered in the meeting room are discussing upcoming project deadlines."

⚠️ **Bẫy thi ngữ pháp:** Dùng 'discuss about' là lỗi trừ điểm phổ biến nhất trong bài thi TOEIC Writing!`
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
      sampleEssay: `Dear Ms. Keller,

Thank you for contacting Apex Office Supplies regarding your bulk purchase order #AP-9021. I am very glad to assist you with your delivery status.

First, I am pleased to confirm that your shipment containing 45 ergonomic chairs and 10 conference tables was processed and dispatched this morning via Freight Express under tracking number FX-88392. According to our logistics schedule, the estimated arrival date at your Austin branch is Tuesday, October 20th.

Second, regarding your inquiry about splitting the shipment, our company policy happily accommodates split deliveries at no additional cost for commercial orders exceeding $5,000. If you wish to split this consignment into two installments, please notify us before 3:00 PM tomorrow so that our warehouse dispatcher can adjust the shipping routes accordingly.

Please let me know if you have any further questions.

Sincerely,
Alex Morgan
Customer Service Specialist
Apex Office Supplies`,
      options: [
            { key: "A", text: "Submit Email Reply" },
            { key: "B", text: "Check email formatting checklist" },
            { key: "C", text: "Review tone & politeness score" },
            { key: "D", text: "Skip question" }
          ],
      correctAnswer: "A",
      explanation: `🎯 **Tiêu chuẩn chấm điểm ETS Writing Part 2 (Email Reply Score 4/4):**
1. **Lời chào & Lời kết chuẩn mực:** \`Dear Ms. Keller,\` và \`Sincerely, Alex Morgan\`.
2. **Giải quyết triệt để 2 yêu cầu của đề bài:**
   - **Ý 1:** Cung cấp tình trạng gửi hàng và ngày giao dự kiến (dispatched this morning via Freight Express FX-88392, arrival on Oct 20th).
   - **Ý 2:** Nêu rõ chính sách tách lô hàng (split deliveries accommodated at no extra cost for orders > $5,000).
3. **Văn phong chuyên nghiệp & Lịch sự:** Dùng các cụm kết nối trang trọng (I am pleased to confirm, regarding your inquiry, please let me know if...).

💡 **Từ vựng kinh doanh mẫu mực:**
- \`commercial order\` (đơn hàng thương mại)
- \`warehouse dispatcher\` (điều phối viên kho hàng)
- \`accommodate split deliveries\` (hỗ trợ chia đợt giao hàng)`
    },
    {
      id: "tsw_q18",
      partNumber: 7,
      partTitle: "Writing Part 2: Respond to a Written Request",
      section: "WRITING",
      passageText: "FROM: Daniel Thorne, Event Director\nTO: Catering Department, Grand Palace Hotel\nDATE: October 18, 2026\nSUBJECT: Catering arrangements for Annual Charity Gala\n\nDear Catering Team,\n\nWe are hosting our Annual Charity Gala at the Grand Ballroom on December 5th with approximately 250 attendees. We would like to finalize our dinner menu selections. Could you please provide your vegetarian and gluten-free dietary options? Additionally, could you confirm the deadline for submitting final guest count figures and any deposit payment requirements?\n\nBest regards,\nDaniel Thorne\nChildren's Hope Foundation",
      writingPrompt: "Respond to the email as catering coordinator Sophia Martinez. In your response, provide: 1. Dietary menu choices available. 2. Guest headcount deadline and deposit requirements.",
      questionText: "Question 18 (Writing Q7): Write a formal reply email detailing banquet menu options and booking timelines.",
      sampleEssay: `Dear Mr. Thorne,

Thank you for choosing the Grand Palace Hotel for the Annual Charity Gala on December 5th. We are honored to partner with the Children's Hope Foundation for this meaningful evening.

To satisfy your guests' dietary preferences, our executive culinary team has designed specialized menu selections. For vegetarian diners, we offer Truffle Wild Mushroom Risotto accompanied by roasted baby asparagus. For gluten-free guests, we feature Pan-Seared Atlantic Salmon served with herb-infused quinoa and steamed seasonal vegetables.

Regarding your planning timeline, the final confirmed guest headcount must be submitted no later than Friday, November 20th. Furthermore, a 30% advance deposit based on the preliminary estimate is required by November 10th to secure staff allocation and banquet hall arrangements.

Should you wish to arrange a complimentary menu tasting, please do not hesitate to contact me.

Warm regards,
Sophia Martinez
Banquet & Catering Coordinator
Grand Palace Hotel`,
      options: [
            { key: "A", text: "Check email formatting checklist" },
            { key: "B", text: "Submit Email Reply" },
            { key: "C", text: "Review tone & politeness score" },
            { key: "D", text: "Skip question" }
          ],
      correctAnswer: "B",
      explanation: `🎯 **Tiêu chuẩn chấm điểm ETS Writing Part 2 (Score 4/4):**
1. **Đầy đủ 2 nhiệm vụ cốt lõi:**
   - **Nhiệm vụ 1:** Nêu chi tiết 2 món ăn kiêng (Truffle Wild Mushroom Risotto cho khách ăn chay và Pan-Seared Atlantic Salmon cho khách ăn gluten-free).
   - **Nhiệm vụ 2:** Nêu rõ hạn chót chốt số lượng khách (Nov 20th) và mức đặt cọc (30% deposit by Nov 10th).
2. **Văn phong ngành nhà hàng - khách sạn cao cấp (Hospitality Tone):** Sang trọng, nồng hậu và chu đáo.

💡 **Từ vựng khách sạn 5 sao:**
- \`executive culinary team\` (đội ngũ đầu bếp điều hành)
- \`advance deposit\` (khoản tiền đặt cọc trước)
- \`complimentary menu tasting\` (buổi nếm thử thực đơn miễn phí)`
    },

    // WRITING PART 3: WRITE AN OPINION ESSAY (Q19: Q8 of Writing)
    {
      id: "tsw_q19",
      partNumber: 8,
      partTitle: "Writing Part 3: Write an Opinion Essay",
      section: "WRITING",
      writingPrompt: "Some multinational corporations require their managerial staff to rotate departments every two to three years in order to gain cross-functional experience. Other companies believe that managers should specialize in a single area for long-term career growth. Which approach do you think is more advantageous for both the company and the individual? Support your view with specific reasons and real-world examples. (Write at least 300 words. Suggested time: 30 minutes).",
      minWordCount: 300,
      sampleEssay: `In the contemporary global business landscape, the strategic development of executive leadership has become a cornerstone of organizational competitiveness. While specialized functional expertise undoubtedly fosters deep domain mastery, I firmly believe that periodic managerial rotation across diverse departments offers far superior advantages for both enterprise agility and individual professional growth.

From an organizational perspective, cross-functional managerial rotation breaks down departmental silos and stimulates innovation. When managers gain firsthand exposure to marketing, finance, supply chain operations, and human resources, they develop a holistic understanding of how disparate business functions interconnect. For instance, a manager who transitions from customer support to product development can leverage granular consumer feedback to design more intuitive software solutions. Furthermore, cross-trained leaders foster seamless cross-departmental collaboration, minimizing bureaucratic friction and expediting strategic decision-making.

From the standpoint of individual career trajectory, job rotation cultivates versatile leadership acumen and resilience. In an era marked by rapid technological disruption and fluctuating market dynamics, single-discipline specialists frequently encounter career plateaus when industry demands shift. In contrast, professionals with multifaceted competencies demonstrate enhanced problem-solving versatility, emotional intelligence, and adaptability. These cross-functional leaders are inherently better equipped to steer multinational enterprises through volatile market conditions, making them prime candidates for executive succession.

Critics often argue that frequent rotation might disrupt departmental continuity or prevent managers from mastering nuanced technical complexities. However, this potential downside can be effectively mitigated through structured knowledge-transfer protocols and by maintaining a strong core of dedicated technical specialists.

In conclusion, while functional specialization retains merit in highly technical subfields, the broad strategic perspective fostered by cross-departmental rotation delivers vastly superior long-term dividends. By cultivating agile, well-rounded leaders, modern enterprises ensure sustainable innovation while empowering executives to achieve their fullest leadership potential.`,
      questionText: "Question 19 (Writing Q8): Write an extensive opinion essay (min 300 words) analyzing managerial job rotation versus functional specialization.",
      options: [
            { key: "A", text: "Analyze paragraph cohesion" },
            { key: "B", text: "Check lexical variety and CEFR C1/C2 vocabulary" },
            { key: "C", text: "Submit Essay for AI Evaluation" },
            { key: "D", text: "Skip question" }
          ],
      correctAnswer: "C",
      explanation: `🎯 **Tiêu chuẩn chấm điểm bài luận ETS Writing Part 3 (Score 5/5 - Band C1/C2):**

📊 **Phân tích cấu trúc bài luận 5 đoạn chuẩn quốc tế:**
1. **Introduction (Mở bài):** Dẫn dắt vấn đề (Background statement) + Nêu rõ lập trường chọn 'Job rotation' (Thesis statement).
2. **Body 1 (Lợi ích cho tổ chức):** Xóa bỏ rào cản phòng ban (break down departmental silos), kích thích đổi mới sáng tạo, thúc đẩy hợp tác liên phòng ban.
3. **Body 2 (Lợi ích cho cá nhân):** Rèn luyện tư duy lãnh đạo đa năng (versatile leadership acumen), tăng khả năng thích ứng (adaptability), mở rộng cơ hội thăng tiến lên ban điều hành (executive succession).
4. **Counter-argument & Rebuttal (Phản biện):** Thừa nhận lo ngại về gián đoạn chuyên môn nhưng đưa ra giải pháp quy trình chuyển giao kiến thức (structured knowledge-transfer protocols).
5. **Conclusion (Kết bài):** Khẳng định lại giá trị bền vững dài hạn (superior long-term dividends) của nhà lãnh đạo toàn diện.

💡 **Từ vựng học thuật C1/C2 đắt giá:**
- \`cornerstone of organizational competitiveness\` (nền tảng của năng lực cạnh tranh)
- \`break down departmental silos\` (xóa bỏ rào cản cô lập giữa các phòng ban)
- \`holistic understanding\` (sự hiểu biết mang tính tổng thể, toàn diện)
- \`multifaceted competencies\` (năng lực đa diện, đa kỹ năng)
- \`executive succession\` (kế thừa vị trí lãnh đạo cấp cao)`
    }
  ]
};
