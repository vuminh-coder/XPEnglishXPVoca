import { ExamPaper, ExamQuestion } from "./types";

export const toeicSw202602Paper: ExamPaper = {
  id: "toeic_sw_2026_02",
  title: "TOEIC Speaking & Writing AI Studio #02",
  type: "TOEIC_SPEAKING_WRITING",
  level: "Advanced",
  timeLimitMinutes: 80,
  totalQuestions: 19,
  maxScore: 400,
  description: "Bộ đề thi TOEIC Speaking (11 câu) & Writing (8 câu) chuyên sâu chủ đề Chuỗi cung ứng Công nghệ cao & Trí tuệ nhân tạo doanh nghiệp tích hợp AI chấm điểm thời gian thực.",
  categoryBadge: "Speaking & Writing",
  tags: ["TOEIC", "Nói AI", "Viết AI", "High-Tech & AI", "Score 400 Target"],
  supportedSkills: ["SPEAKING", "WRITING"],
  questions: [
    // SPEAKING PART 1: READ A TEXT ALOUD (Q1 - Q2)
    {
      id: "tsw2_q1",
      partNumber: 1,
      partTitle: "Speaking Part 1: Read a Text Aloud",
      section: "SPEAKING",
      speakingPrompt: "Read the announcement aloud into the microphone. You have 45 seconds to prepare and 45 seconds to speak.",
      passageText:
        "Welcome to the groundbreaking ceremony for the Apex Semiconductor Advanced Microfabrication Center. This state-of-the-art facility will manufacture next-generation two-nanometer microprocessors, supporting automotive electrification, artificial intelligence data centers, and telecommunications infrastructure across North America. We kindly ask all attendees to put on their protective safety glasses and yellow hard hats before entering the construction zone. Following remarks by Governor Davis and Chief Technology Officer Elena Rostova, guided site tours will depart from the East Pavilion.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 1: Read the ceremony announcement aloud with clear pronunciation, proper word stress, and natural cadence.",
      options: [
            { key: "A", text: "Ready to record speech" },
            { key: "B", text: "Practice pronunciation mode" },
            { key: "C", text: "Listen to native audio guide" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "A",
      explanation: `🎯 **Mục tiêu điểm số:** Phát âm chuẩn xác, ngắt nghỉ theo cụm nghĩa (chunking) và thể hiện ngữ điệu tự nhiên.

🗣️ **Kỹ thuật phát âm & Ngữ điệu then chốt:**
- **Trọng âm từ trọng điểm:** \`microfabrication\` (/ˌmaɪ.kroʊˌfæb.rɪˈkeɪ.ʃən/), \`semiconductor\` (/ˌsem.i.kənˈdʌk.tɚ/), \`electrification\` (/iˌlek.trə.fəˈkeɪ.ʃən/), \`pavilion\` (/pəˈvɪl.jən/).
- **Ngắt cụm hơi (Pausing):** 
  "Welcome / to the groundbreaking ceremony / for the Apex Semiconductor Advanced Microfabrication Center."
  "This state-of-the-art facility / will manufacture next-generation two-nanometer microprocessors..."
- **Quy tắc liệt kê (Listing):** "automotive electrification ↗, artificial intelligence data centers ↗, and telecommunications infrastructure ↘."

🔍 **Dịch nghĩa văn bản:**
Chào mừng quý vị đến với lễ khởi công Trung tâm Chế tạo Vi mạch Tiên tiến Apex Semiconductor. Cơ sở hiện đại này sẽ sản xuất các bộ vi xử lý 2 nanomet thế hệ mới, hỗ trợ quá trình điện hóa ô tô, các trung tâm dữ liệu trí tuệ nhân tạo và cơ sở hạ tầng viễn thông trên khắp Bắc Mỹ. Chúng tôi trân trọng kính mời tất cả đại biểu tham dự đeo kính bảo hộ và mũ bảo hộ màu vàng trước khi tiến vào khu vực thi công. Sau bài phát biểu của Thống đốc Davis và Giám đốc Công nghệ Elena Rostova, các chuyến tham quan công trường có hướng dẫn viên sẽ khởi hành từ Nhà vòm Phía Đông.`
    },
    {
      id: "tsw2_q2",
      partNumber: 1,
      partTitle: "Speaking Part 1: Read a Text Aloud",
      section: "SPEAKING",
      speakingPrompt: "Read the advertisement aloud into the microphone. You have 45 seconds to prepare and 45 seconds to speak.",
      passageText:
        "Are you struggling to safeguard your organization's confidential cloud databases against emerging cyber threats? CyberShield Dynamics offers an all-in-one automated endpoint security platform engineered for enterprise scalability. Our patented zero-trust architecture continuously monitors network traffic, eliminates unauthorized access vectors, and neutralizes ransomware attacks in real time. Schedule a complimentary sixty-minute vulnerability consultation today by visiting cybershield.io or calling our toll-free hotline. Protect your digital assets with industry-leading threat intelligence.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 2: Read the cybersecurity advertisement aloud maintaining persuasive confidence and crisp articulation.",
      options: [
            { key: "A", text: "Practice pronunciation mode" },
            { key: "B", text: "Ready to record speech" },
            { key: "C", text: "Listen to native audio guide" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "B",
      explanation: `🎯 **Mục tiêu điểm số:** Thể hiện tông giọng quảng cáo công nghệ tự tin, thuyết phục, ngắt nhịp chính xác.

🗣️ **Kỹ thuật phát âm & Ngữ điệu then chốt:**
- **Ngữ điệu câu hỏi mở đầu:** Lên giọng ở cuối câu hỏi Yes/No: "cyber threats? ↗"
- **Quy tắc liệt kê 3 hành động:**
  "continuously monitors network traffic ↗, eliminates unauthorized access vectors ↗, and neutralizes ransomware attacks in real time ↘."
- **Trọng âm từ khó:** \`vulnerability\` (/ˌvʌl.nɚ.əˈbɪl.ə.t̬i/), \`confidential\` (/ˌkɑːn.fəˈden.ʃəl/), \`scalability\` (/ˌskeɪ.ləˈbɪl.ə.t̬i/).

🔍 **Dịch nghĩa văn bản:**
Bạn đang gặp khó khăn trong việc bảo vệ các cơ sở dữ liệu đám mây bảo mật của tổ chức mình trước những mối đe dọa an ninh mạng mới xuất hiện? CyberShield Dynamics cung cấp nền tảng bảo mật điểm cuối tự động tất-cả-trong-một được thiết kế tối ưu cho khả năng mở rộng quy mô doanh nghiệp. Kiến trúc zero-trust được cấp bằng sáng chế của chúng tôi liên tục giám sát lưu lượng mạng, loại bỏ các hướng truy cập trái phép và vô hiệu hóa các cuộc tấn công mã độc tống tiền trong thời gian thực. Hãy đặt lịch tư vấn đánh giá lỗ hổng miễn phí 60 phút ngay hôm nay tại cybershield.io hoặc gọi đến đường dây nóng miễn cước của chúng tôi.`
    },

    // SPEAKING PART 2: DESCRIBE A PICTURE (Q3 - Q4)
    {
      id: "tsw2_q3",
      partNumber: 2,
      partTitle: "Speaking Part 2: Describe a Picture",
      section: "SPEAKING",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      speakingPrompt: "Describe the picture in as much detail as possible. You have 45 seconds to prepare and 45 seconds to speak.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 3: Describe the automated logistics fulfillment center shown in the photograph.",
      options: [
            { key: "A", text: "View AI vocabulary suggestions" },
            { key: "B", text: "Review sample response transcript" },
            { key: "C", text: "Record image description" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "C",
      explanation: `🎯 **Chiến lược 3 phần mô tả tranh nhà kho / hậu cần:**
1. **Tổng quan (Overview):** "This picture captures a spacious, state-of-the-art automated logistics distribution center."
2. **Chi tiết trung tâm (Focal Point):** "In the foreground, a warehouse specialist wearing a high-visibility orange safety vest is operating a motorized electronic scanner while inspecting cardboard shipping containers."
3. **Chi tiết hậu cảnh & Không gian (Background & Atmosphere):** "In the background, multi-tiered steel shelving racks stretch high toward the ceiling, neatly loaded with organized pallets. The facility is well-lit and appears highly streamlined, reflecting an efficient supply chain operation."

💡 **Từ vựng ăn điểm cao:**
- \`High-visibility safety vest\` (áo bảo hộ phản quang)
- \`Motorized electronic scanner\` (máy quét mã vạch điện tử)
- \`Multi-tiered industrial shelving\` (kệ thép công nghiệp nhiều tầng)
- \`Streamlined fulfillment workflow\` (quy trình hoàn tất đơn hàng tinh gọn)`
    },
    {
      id: "tsw2_q4",
      partNumber: 2,
      partTitle: "Speaking Part 2: Describe a Picture",
      section: "SPEAKING",
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      speakingPrompt: "Describe the picture in as much detail as possible. You have 45 seconds to prepare and 45 seconds to speak.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 45,
      questionText: "Question 4: Describe the rooftop executive networking reception in the photograph.",
      options: [
            { key: "A", text: "View AI vocabulary suggestions" },
            { key: "B", text: "Review sample response transcript" },
            { key: "C", text: "Skip to next question" },
            { key: "D", text: "Record image description" }
          ],
      correctAnswer: "D",
      explanation: `🎯 **Chiến lược mô tả tranh tiệc giao lưu doanh nghiệp ngoài trời:**
1. **Tổng quan:** "This photograph shows an upscale outdoor executive networking reception taking place on a modern rooftop terrace."
2. **Chi tiết con người:** "In the center, several business professionals dressed in smart formal attire are engaged in lively conversations while holding beverage glasses. They are standing in small clusters and exchanging business cards with warm smiles."
3. **Hậu cảnh & Bầu không khí:** "In the background, a breathtaking urban skyline with glass skyscrapers is visible under a clear dusk sky. The overall ambiance is sophisticated and cordial."

💡 **Từ vựng ăn điểm cao:**
- \`Upscale rooftop terrace\` (sân thượng trên cao sang trọng)
- \`Smart formal business attire\` (trang phục công sở lịch sự)
- \`Engaged in lively networking\` (tham gia trò chuyện kết nối sôi nổi)
- \`Breathtaking urban skyline\` (đường chân trời đô thị tuyệt đẹp)`
    },

    // SPEAKING PART 3: RESPOND TO QUESTIONS (Q5 - Q7)
    {
      id: "tsw2_q5",
      partNumber: 3,
      partTitle: "Speaking Part 3: Respond to Questions",
      section: "SPEAKING",
      speakingPrompt:
        "Imagine that a market research company is interviewing you about your habits regarding online grocery shopping and smart mobile delivery apps.\n\nQuestion 5: How often do you order groceries or meal ingredients through mobile apps, and what do you typically purchase?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 5: Respond to the market research interview question (15 seconds).",
      options: [
            { key: "A", text: "Record 15-second response" },
            { key: "B", text: "View quick answer template" },
            { key: "C", text: "Listen to sample response" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "A",
      explanation: `🎯 **Chiến lược 15 giây:** Trả lời trực tiếp tần suất + nêu rõ 2-3 món hàng tiêu biểu.
🗣️ **Câu trả lời mẫu:**
"I typically order groceries online about twice a week. I mostly purchase fresh organic vegetables, dairy products like milk and Greek yogurt, and pantry staples like pasta and coffee beans because it saves me immense time."`
    },
    {
      id: "tsw2_q6",
      partNumber: 3,
      partTitle: "Speaking Part 3: Respond to Questions",
      section: "SPEAKING",
      speakingPrompt:
        "Question 6: When using an online grocery app, do you prefer ultra-fast one-hour delivery with a small service fee, or standard free next-day delivery? Why?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 6: State your delivery preference and provide a clear rationale (15 seconds).",
      options: [
            { key: "A", text: "View quick answer template" },
            { key: "B", text: "Record 15-second response" },
            { key: "C", text: "Listen to sample response" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "B",
      explanation: `🎯 **Chiến lược 15 giây:** Chọn dứt khoát 1 trong 2 phương án và nêu ngay lý do.
🗣️ **Câu trả lời mẫu:**
"I definitely prefer standard free next-day delivery. Since I usually plan my weekly meals in advance, I would rather avoid unnecessary express delivery surcharges and save money."`
    },
    {
      id: "tsw2_q7",
      partNumber: 3,
      partTitle: "Speaking Part 3: Respond to Questions",
      section: "SPEAKING",
      speakingPrompt:
        "Question 7: What factors are most important to you when deciding which online grocery delivery service to use? Explain why.",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 30,
      questionText: "Question 7: Detail the primary factors influencing your e-commerce platform choice (30 seconds).",
      options: [
            { key: "A", text: "View structured response outline" },
            { key: "B", text: "Listen to sample response" },
            { key: "C", text: "Record 30-second response" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "C",
      explanation: `🎯 **Chiến lược 30 giây (Nêu 2 yếu tố then chốt + ví dụ):**
1. Yếu tố 1: Độ tươi ngon của thực phẩm và kiểm soát nhiệt độ lạnh (Cold-chain freshness).
2. Yếu tố 2: Giao diện ứng dụng mượt mà và chính sách hoàn tiền khi hàng lỗi.

🗣️ **Câu trả lời mẫu:**
"When selecting an online grocery app, two factors are paramount. First, the freshness and quality of produce are critical; I need assurance that items are transported via temperature-controlled cold chains. Second, I look for an intuitive user interface with reliable customer support. If an item arrives damaged or missing, a seamless in-app refund policy gives me complete peace of mind."`
    },

    // SPEAKING PART 4: RESPOND TO QUESTIONS USING INFORMATION PROVIDED (Q8 - Q10)
    {
      id: "tsw2_q8",
      partNumber: 4,
      partTitle: "Speaking Part 4: Questions Using Information",
      section: "SPEAKING",
      passageText:
        "[CONFERENCE PROGRAM — GLOBAL ENTERPRISE AI & FINTECH SUMMIT 2026]\nDate: Thursday, November 19, 2026 | Location: Moscone West, San Francisco, CA\n\nMorning Sessions (Ballroom A):\n• 09:00 AM – 10:15 AM: Keynote Address: 'Autonomous Agentic AI in Global Supply Chains' — Dr. Victor Chen (Chief AI Officer, Horizon Robotics)\n• 10:30 AM – 11:45 AM: Panel Discussion: 'Cross-Border Instant Settlement with Central Bank Digital Currencies (CBDCs)'\n\nLuncheon & Networking:\n• 12:00 PM – 01:30 PM: Executive Networking Luncheon (Included with all delegate passes)\n\nAfternoon Tracks (Meeting Rooms 301-304):\n• 01:45 PM – 03:00 PM: Technical Workshop: 'Deploying Self-Hosted LLMs with Zero-Trust Data Protection' — Room 302 (Led by Sarah Jenkins)\n• 03:15 PM – 04:30 PM: Case Study Presentation: 'AI-Driven Predictive Maintenance in Semiconductor Fabs' — Room 304 (Led by Dr. Marcus Sterling)\n\nNote: Advance online registration is mandatory for all technical workshops due to limited workstation capacity.",
      speakingPrompt:
        "Hello, I am registered for the Global Enterprise AI & Fintech Summit this Thursday. I have misplaced my itinerary and have a few questions.\n\nQuestion 8: Could you please tell me what time the opening keynote address begins and who will be delivering it?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 8: Answer the caller's question regarding the opening keynote (15 seconds).",
      options: [
            { key: "A", text: "View schedule extraction" },
            { key: "B", text: "Listen to sample response" },
            { key: "C", text: "Skip to next question" },
            { key: "D", text: "Record 15-second response" }
          ],
      correctAnswer: "D",
      explanation: `🎯 **Chiến lược 15 giây:** Nêu chính xác giờ bắt đầu, tên bài phát biểu và diễn giả.
🗣️ **Câu trả lời mẫu:**
"The opening keynote address will begin at 9:00 AM in Ballroom A. It is titled 'Autonomous Agentic AI in Global Supply Chains' and will be delivered by Dr. Victor Chen, Chief AI Officer at Horizon Robotics."`
    },
    {
      id: "tsw2_q9",
      partNumber: 4,
      partTitle: "Speaking Part 4: Questions Using Information",
      section: "SPEAKING",
      passageText:
        "[CONFERENCE PROGRAM — GLOBAL ENTERPRISE AI & FINTECH SUMMIT 2026]\n(Refer to the schedule provided above)",
      speakingPrompt:
        "Question 9: I heard that the executive networking luncheon requires purchasing a separate VIP banquet ticket. Is that correct?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 15,
      questionText: "Question 9: Correct the caller's misconception politely (15 seconds).",
      options: [
            { key: "A", text: "Record 15-second response" },
            { key: "B", text: "View schedule extraction" },
            { key: "C", text: "Listen to sample response" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "A",
      explanation: `🎯 **Chiến lược 15 giây:** Đính chính thông tin sai lệch một cách lịch sự + trích dẫn chính sách miễn phí kèm theo vé.
🗣️ **Câu trả lời mẫu:**
"Actually, that is not correct. The executive networking luncheon is scheduled from 12:00 PM to 1:30 PM and is already included with all standard delegate registration passes."`
    },
    {
      id: "tsw2_q10",
      partNumber: 4,
      partTitle: "Speaking Part 4: Questions Using Information",
      section: "SPEAKING",
      passageText:
        "[CONFERENCE PROGRAM — GLOBAL ENTERPRISE AI & FINTECH SUMMIT 2026]\n(Refer to the schedule provided above)",
      speakingPrompt:
        "Question 10: I am particularly interested in applied enterprise AI technologies. Could you provide full details on all sessions focused on artificial intelligence throughout the afternoon?",
      preparationTimeSeconds: 3,
      speakingTimeSeconds: 30,
      questionText: "Question 10: Detail both afternoon AI sessions clearly (30 seconds).",
      options: [
            { key: "A", text: "View schedule extraction" },
            { key: "B", text: "Record 30-second response" },
            { key: "C", text: "Listen to sample response" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "B",
      explanation: `🎯 **Chiến lược 30 giây:** Liệt kê đầy đủ 2 phiên buổi chiều theo cấu trúc song hành (Thời gian - Tên phiên - Phòng - Người trình bày).
🗣️ **Câu trả lời mẫu:**
"Certainly! There are two dedicated afternoon AI sessions.
First, from 1:45 PM to 3:00 PM, there is a Technical Workshop on 'Deploying Self-Hosted LLMs with Zero-Trust Data Protection' led by Sarah Jenkins in Room 302.
Second, from 3:15 PM to 4:30 PM, Dr. Marcus Sterling will present a Case Study on 'AI-Driven Predictive Maintenance in Semiconductor Fabs' in Room 304.
Please remember that advance online registration is mandatory for these workshops due to limited workstation capacity."`
    },

    // SPEAKING PART 5: EXPRESS AN OPINION (Q11)
    {
      id: "tsw2_q11",
      partNumber: 5,
      partTitle: "Speaking Part 5: Express an Opinion",
      section: "SPEAKING",
      speakingPrompt:
        "Do you agree or disagree with the following statement?\n\n'Enterprise companies should allow their knowledge workers to work 100% remotely on a permanent basis, rather than mandating physical in-office attendance.'\n\nGive specific reasons and examples to support your opinion.",
      preparationTimeSeconds: 45,
      speakingTimeSeconds: 60,
      questionText: "Question 11: Deliver a structured 60-second opinion speech with compelling logic and concrete examples.",
      options: [
            { key: "A", text: "View Band 8.5+ response outline" },
            { key: "B", text: "Listen to native audio argument" },
            { key: "C", text: "Record 60-second speech" },
            { key: "D", text: "Proceed to Writing Section" }
          ],
      correctAnswer: "C",
      explanation: `🎯 **Chiến lược 60 giây (Mở - Thân 1 - Thân 2 - Kết):**
- Mở bài: Đồng ý hoặc ủng hộ mô hình linh hoạt 100% remote.
- Luận điểm 1: Tối ưu năng suất cá nhân, giảm stress di chuyển (commuting exhaustion) và tiết kiệm chi phí thuê văn phòng cho doanh nghiệp.
- Luận điểm 2: Mở rộng tiếp cận nhân tài toàn cầu không bị giới hạn địa lý (global talent pool).
- Kết bài: Tóm tắt và khẳng định làm việc từ xa kết hợp công cụ số là tương lai của nền kinh tế tri thức.

🗣️ **Bài nói mẫu điểm tối đa (Score 200/200):**
"I strongly agree that enterprise organizations should grant knowledge workers the freedom to work fully remotely.

First and foremost, remote flexibility dramatically boosts overall productivity while enhancing employee well-being. Eliminating two hours of daily rush-hour commuting spares workers from physical exhaustion, allowing them to channel focused energy into high-value cognitive tasks. Studies consistently show that telecommuting professionals report higher job satisfaction and lower burnout rates.

Secondly, permanent remote policies enable corporations to tap into a borderless global talent pool. Instead of being restricted to hiring candidates residing within commuting distance of major metropolitan hubs, companies can recruit the absolute best software engineers and analysts worldwide, while simultaneously reducing overhead expenses on commercial office leases.

In conclusion, leveraging modern cloud collaboration tools for permanent remote work fosters both operational efficiency and global competitive advantage."`
    },

    // WRITING PART 1: WRITE A SENTENCE BASED ON A PICTURE (Q12 - Q16)
    {
      id: "tsw2_q12",
      partNumber: 6,
      partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the two provided words: assemble / robotic",
      questionText: "Question 12 (Writing Q1): Write a grammatical sentence using the words 'assemble' and 'robotic'.",
      options: [
            { key: "A", text: "Check grammar rules" },
            { key: "B", text: "View sample sentences" },
            { key: "C", text: "Skip to next question" },
            { key: "D", text: "Submit written sentence" }
          ],
      correctAnswer: "D",
      explanation: `🎯 **Yêu cầu:** Dùng đúng 2 từ cho trước trong 1 câu duy nhất, đúng ngữ pháp và sát nội dung ảnh.
✅ **Câu mẫu chuẩn điểm tuyệt đối:**
- "Automated robotic arms assemble precision electronic components on the high-tech factory conveyor belt."
- "The robotic machinery is programmed to assemble complex automotive parts with extreme speed and accuracy."`
    },
    {
      id: "tsw2_q13",
      partNumber: 6,
      partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the two provided words: wear / while",
      questionText: "Question 13 (Writing Q2): Write a grammatical sentence using the words 'wear' and 'while'.",
      options: [
            { key: "A", text: "Submit written sentence" },
            { key: "B", text: "Check grammar rules" },
            { key: "C", text: "View sample sentences" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "A",
      explanation: `🎯 **Yêu cầu:** Kết hợp mệnh đề thời gian với liên từ 'while' và động từ 'wear'.
✅ **Câu mẫu chuẩn điểm tuyệt đối:**
- "The laboratory researchers wear sterile protective suits while conducting cleanroom experiments."
- "Scientists wear protective safety goggles while analyzing chemical solutions under the microscope."`
    },
    {
      id: "tsw2_q14",
      partNumber: 6,
      partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the two provided words: dock / cargo",
      questionText: "Question 14 (Writing Q3): Write a grammatical sentence using the words 'dock' and 'cargo'.",
      options: [
            { key: "A", text: "Check grammar rules" },
            { key: "B", text: "Submit written sentence" },
            { key: "C", text: "View sample sentences" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "B",
      explanation: `🎯 **Yêu cầu:** Dùng từ 'dock' (cập cảng / bến cảng) và 'cargo' (hàng hóa).
✅ **Câu mẫu chuẩn điểm tuyệt đối:**
- "A massive container vessel is docked at the international harbor to unload freight cargo."
- "Giant cranes unload heavy shipping cargo while the freight ship remains docked at the terminal."`
    },
    {
      id: "tsw2_q15",
      partNumber: 6,
      partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the two provided words: brainstorm / because",
      questionText: "Question 15 (Writing Q4): Write a grammatical sentence using the words 'brainstorm' and 'because'.",
      options: [
            { key: "A", text: "Check grammar rules" },
            { key: "B", text: "View sample sentences" },
            { key: "C", text: "Submit written sentence" },
            { key: "D", text: "Skip to next question" }
          ],
      correctAnswer: "C",
      explanation: `🎯 **Yêu cầu:** Kết hợp mệnh đề nguyên nhân 'because' với động từ 'brainstorm'.
✅ **Câu mẫu chuẩn điểm tuyệt đối:**
- "The software development team is brainstorming at the whiteboard because they are designing a new mobile application."
- "Engineers are brainstorming innovative product features because the upcoming client demo requires fresh solutions."`
    },
    {
      id: "tsw2_q16",
      partNumber: 6,
      partTitle: "Writing Part 1: Write a Sentence Based on a Picture",
      section: "WRITING",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
      writingPrompt: "Write ONE sentence based on the picture using the two provided words: plug in / before",
      questionText: "Question 16 (Writing Q5): Write a grammatical sentence using the words 'plug in' and 'before'.",
      options: [
            { key: "A", text: "Check grammar rules" },
            { key: "B", text: "View sample sentences" },
            { key: "C", text: "Proceed to Email Writing" },
            { key: "D", text: "Submit written sentence" }
          ],
      correctAnswer: "D",
      explanation: `🎯 **Yêu cầu:** Sử dụng cụm động từ 'plug in' (cắm sạc) và giới từ/liên từ 'before'.
✅ **Câu mẫu chuẩn điểm tuyệt đối:**
- "The driver plugs in the electric vehicle at the charging station before entering the office building."
- "Please plug in the high-speed charging cable before activating the vehicle's rapid power cycle."`
    },

    // WRITING PART 2: RESPOND TO A WRITTEN REQUEST (Q17 - Q18)
    {
      id: "tsw2_q17",
      partNumber: 7,
      partTitle: "Writing Part 2: Respond to a Written Request",
      section: "WRITING",
      passageText:
        "From: Arthur Pendelton, Director of Clinical Operations, St. Jude Biomedical Research\nTo: Commercial Accounts Directorate, Precision BioTech Solutions\nDate: November 3, 2026\nSubject: Critical Shipment Delay — Order #PB-88419 (Diagnostic Microfluidic Chips)\n\nDear Precision BioTech Team,\n\nI am writing to express our extreme concern regarding Purchase Order #PB-88419 for 500 units of custom diagnostic microfluidic chips, originally guaranteed for delivery on November 2nd. Our clinical oncology trial is scheduled to begin this Friday, and without these specialized chips, patient screening will be severely compromised.\n\nYour online tracking portal indicates that the shipment has been held in customs clearance in Frankfurt with no updated estimated time of arrival.\n\nPlease clarify immediately: (1) what specific regulatory issue caused this customs delay, (2) what expedited measures your logistics team is taking to ensure delivery before Thursday at 5:00 PM, and (3) what commercial compensation or fee adjustment will be provided for this breach of our service level agreement.\n\nI await your urgent response.\n\nSincerely,\nArthur Pendelton\nDirector of Clinical Operations",
      writingPrompt:
        "Respond to the customer's urgent email complaint as the Senior Customer Success Manager at Precision BioTech Solutions.\nIn your email, you must:\n• Acknowledge the delay and offer a sincere professional apology\n• Explain the customs clearance bottleneck and detail the expedited priority air re-routing in progress\n• Provide a concrete delivery confirmation timeline and offer a 15% billing credit on the invoice.",
      questionText: "Question 17 (Writing Q6): Write a professional business email response addressing all 3 customer requirements.",
      options: [
            { key: "A", text: "Submit email response for AI evaluation" },
            { key: "B", text: "Review business email structure" },
            { key: "C", text: "Check customer service collocations" },
            { key: "D", text: "Skip to next email" }
          ],
      correctAnswer: "A",
      explanation: `🎯 **Tiêu chí chấm điểm:** Giải quyết trọn vẹn 3 yêu cầu, văn phong kinh doanh lịch sự, chịu trách nhiệm và đưa ra giải pháp rõ ràng.

✉️ **Bài viết mẫu điểm tuyệt đối (Score 200/200):**
"Dear Mr. Pendelton,

Thank you for contacting Precision BioTech Solutions. I sincerely apologize for the distress and operational uncertainty caused by the delay of Purchase Order #PB-88419. We fully recognize the critical nature of your clinical oncology trials and are treating this matter with the highest priority.

Regarding the customs delay in Frankfurt, German customs authorities conducted an unscheduled randomized documentation audit for specialized medical polymer imports. Our European regulatory compliance team has already submitted the verified export certificates, and the shipment cleared customs at 8:30 AM CET today.

To ensure your team receives the microfluidic chips well in advance of your Friday deadline, we have upgraded your consignment to a dedicated chartered express courier with MediFlight Express. The shipment departed Frankfurt at 11:00 AM and is guaranteed for delivery directly to your Cambridge laboratory tomorrow, Wednesday, November 4th, by 2:00 PM—well before your 5:00 PM Thursday threshold.

Furthermore, in acknowledgment of this inconvenience and in accordance with our Service Level Agreement, we have applied a 15% billing credit ($4,200) to Invoice #INV-88419 and waived all freight shipping charges.

Please do not hesitate to contact me directly at extension 402 if you require real-time transit telemetry updates.

Sincerely,
Elena Rostova
Senior Customer Success Manager
Precision BioTech Solutions"`
    },
    {
      id: "tsw2_q18",
      partNumber: 7,
      partTitle: "Writing Part 2: Respond to a Written Request",
      section: "WRITING",
      passageText:
        "From: Human Resources Directorate, Global Technology Partners\nTo: All Department Team Leads\nDate: November 6, 2026\nSubject: Feedback Request — Draft Corporate Remote Work & Wellness Policy 2027\n\nDear Team Leads,\n\nAs our organization prepares to finalize our comprehensive Global Workplace & Employee Wellness Policy for fiscal year 2027, executive leadership is seeking constructive feedback from all department leads.\n\nWe want to ensure that our revised telecommuting frameworks, mental health support programs, and ergonomic equipment subsidies genuinely empower employee productivity and well-being.\n\nPlease reply to this email with your feedback by November 15th, addressing:\n1. Your recommendations regarding flexible core working hours for cross-timezone teams\n2. Suggested enhancements to our digital mental health and wellness stipends\n3. Practical guidelines for home office ergonomic workstation reimbursements\n\nThank you for your valuable leadership insights.\n\nWarm regards,\nDavid Sterling\nVice President of Global Human Resources",
      writingPrompt:
        "Respond to David Sterling's email as the Lead Engineering Manager.\nIn your email, you must address all three requested areas:\n• Recommend a 4-hour synchronized core working window with flexible peripheral hours\n• Propose a $1,200 annual flexible wellness stipend covering gym, meditation apps, and counseling\n• Suggest an upfront $1,000 ergonomic home office equipment reimbursement process with digital receipt uploads.",
      questionText: "Question 18 (Writing Q7): Write a constructive HR policy feedback email addressing all 3 prompt directives.",
      options: [
            { key: "A", text: "Review policy suggestion templates" },
            { key: "B", text: "Submit email response for AI evaluation" },
            { key: "C", text: "Check HR terminology vocabulary" },
            { key: "D", text: "Proceed to Opinion Essay" }
          ],
      correctAnswer: "B",
      explanation: `🎯 **Tiêu chí chấm điểm:** Giải quyết đủ 3 nội dung đề xuất chính sách, ngôn từ mạch lạc, chuyên nghiệp, mang tính xây dựng cao.

✉️ **Bài viết mẫu điểm tuyệt đối (Score 200/200):**
"Dear Mr. Sterling,

Thank you for the opportunity to contribute feedback on the draft 2027 Corporate Remote Work & Wellness Policy. On behalf of the engineering department, I would like to offer the following constructive recommendations:

1. Flexible Core Working Hours:
To effectively support cross-timezone collaboration between our teams in San Francisco, London, and Tokyo, I propose instituting a standardized 4-hour synchronized core window (from 10:00 AM to 2:00 PM local time). Outside of this mandatory collaboration window, engineers should enjoy full autonomy to organize their remaining working hours, maximizing asynchronous focus and personal flexibility.

2. Comprehensive Wellness Stipend:
I recommend consolidating disparate wellness benefits into a single, flexible $1,200 annual Employee Wellness Stipend. This allowance should empower personnel to invest in their holistic health, encompassing gym memberships, mindfulness meditation subscriptions, and confidential one-on-one mental health counseling sessions.

3. Streamlined Ergonomic Reimbursement:
To prevent musculoskeletal strain among remote staff, we should establish an upfront $1,000 Home Ergonomics Grant for new hires and remote workers. Employees could purchase certified ergonomic chairs, standing desks, and monitor arms through an automated expense portal featuring instant digital receipt uploads and 48-hour direct deposit reimbursement.

I believe integrating these measures will significantly boost workforce retention and talent attraction across our global engineering hubs.

Best regards,
Michael Zhang
Lead Engineering Manager
Global Technology Partners"`
    },

    // WRITING PART 3: WRITE AN OPINION ESSAY (Q19)
    {
      id: "tsw2_q19",
      partNumber: 8,
      partTitle: "Writing Part 3: Write an Opinion Essay",
      section: "WRITING",
      writingPrompt:
        "Some enterprise corporations believe that investing heavily in automated robotic artificial intelligence systems to replace routine operational labor is the most effective way to maximize profit and efficiency. Other companies contend that investing in comprehensive employee upskilling and workforce retention yields superior long-term innovation and customer loyalty.\n\nWhich approach do you consider more advantageous for a company's sustainable success? Support your position with specific reasons and real-world business examples. (Write at least 300 words. Time suggested: 30 minutes).",
      minWordCount: 300,
      sampleEssay: `In today's fast-evolving technological landscape, enterprise organizations face a pivotal strategic choice: whether to aggressively deploy automated artificial intelligence systems to eliminate routine human labor, or to channel capital into comprehensive workforce upskilling and long-term talent retention. While pure technological automation undoubtedly delivers immediate cost reductions, I firmly believe that prioritizing continuous employee upskilling and human capital development yields vastly superior long-term innovation, organizational resilience, and sustainable competitive advantage.

First and foremost, human ingenuity, emotional empathy, and creative problem-solving remain irreplaceable catalysts for groundbreaking innovation. While artificial intelligence and robotic process automation excel at executing repetitive data crunching and standardized assembly workflows, algorithms are inherently backward-looking models trained on historical data. They cannot conceive disruptive business models, navigate complex ethical dilemmas, or intuitively interpret subtle shifts in customer sentiment. Companies like Toyota and Apple have consistently demonstrated that integrating skilled, highly empowered human craftsmen with advanced automation—a philosophy known in manufacturing as 'jidoka'—produces far superior product quality and creative breakthroughs than sterile, fully automated systems.

Secondly, investing in workforce upskilling fosters deep institutional loyalty, agility, and high-trust corporate culture. When an enterprise demonstrates genuine commitment to its employees by financing continuous training in artificial intelligence, cloud analytics, and strategic leadership, workers become agile collaborators rather than fearful adversaries of technological progress. This dramatically reduces costly employee turnover and preserves vital institutional knowledge. Conversely, organizations that treat human workers as disposable commodities inevitably suffer from plunging employee morale, reputational damage, and an inability to deliver authentic, empathetic customer service during unprecedented market crises.

In conclusion, while intelligent automation should serve as a powerful assistive tool to eliminate mundane drudgery, a company's greatest strategic asset is its educated, adaptable human workforce. Enterprise leaders who invest symbiotically in both cutting-edge technology and human talent will inevitably dominate the global marketplace.`,
      questionText: "Question 19 (Writing Q8): Write an extensive 300+ word opinion essay on AI automation versus workforce upskilling.",
      options: [
            { key: "A", text: "Review 4-Paragraph Discursive Architecture" },
            { key: "B", text: "Check High-Scoring Business Collocations" },
            { key: "C", text: "Submit Task 8 Essay for Gemini AI Evaluation" },
            { key: "D", text: "Complete Full Test" }
          ],
      correctAnswer: "C",
      explanation: `🎯 **Cấu trúc bài luận 300+ từ điểm tuyệt đối (Score 200/200):**
1. **Introduction (Đoạn 1):** Dẫn nhập bối cảnh AI vs Lao động ➔ Đưa ra Thesis Statement rõ ràng ủng hộ đầu tư vào con người và đào tạo nâng cao (Upskilling).
2. **Body 1 (Đoạn 2 - Sáng tạo & Thấu cảm):** Thuật toán chỉ dựa vào dữ liệu quá khứ, không có khả năng thấu cảm và đột phá mô hình kinh doanh mới (Dẫn chứng triết lý sản xuất Toyota 'jidoka').
3. **Body 2 (Đoạn 3 - Văn hóa & Giữ chân nhân tài):** Giảm thiểu chi phí luân chuyển lao động (turnover), biến nhân viên thành cộng sự thay vì đối thủ của AI, bảo toàn tri thức doanh nghiệp.
4. **Conclusion (Đoạn 4):** Khẳng định tự động hóa là công cụ hỗ trợ, con người được nâng cao năng lực mới là tài sản chiến lược quyết định thành công bền vững.

💡 **Từ vựng C1/C2 đắt giá:**
- \`catalysts for groundbreaking innovation\` (chất xúc tác cho đột phá sáng tạo)
- \`inherently backward-looking models\` (mô hình vốn dĩ chỉ nhìn lại quá khứ)
- \`agile collaborators\` (cộng sự linh hoạt thích ứng)
- \`preserve institutional knowledge\` (bảo tồn tri thức tổ chức)`
    }
  ]
};
