import { ExamPaper, ExamQuestion } from "./types";

export const ieltsSpeakingPro02Paper: ExamPaper = {
  id: "ielts_speaking_pro_02",
  title: "IELTS Speaking AI Studio #02 (3 Parts)",
  type: "IELTS_SPEAKING",
  level: "Advanced",
  timeLimitMinutes: 15,
  totalQuestions: 3,
  maxScore: 9.0,
  description: "Phòng luyện thi Nói chuyên sâu (Speaking AI Studio): Trọn bộ 3 Parts chuẩn Cambridge với chấm điểm AI thời gian thực về Đô thị xanh, Phát minh của Nikola Tesla, Xe tự hành và Trí tuệ Nhân tạo.",
  categoryBadge: "IELTS Speaking",
  tags: ["IELTS", "Speaking Only", "AI Studio", "3 Parts", "Cambridge Standard"],
  supportedSkills: ["SPEAKING"],
  questions: [
    {
      id: "isp2_q1",
      partNumber: 1,
      partTitle: "IELTS Speaking Part 1: Urban Green Spaces, Reading Habits & Digital Work",
      section: "SPEAKING",
      speakingPrompt:
        "1. How often do you visit public parks or green recreational spaces in your city?\n2. Do you prefer reading physical printed books or digital e-books on a tablet?\n3. What skills do you think are most essential for adapting to a digital workplace?\n4. How has modern technology influenced the way people communicate with their families?",
      preparationTimeSeconds: 15,
      speakingTimeSeconds: 60,
      questionText:
        "Question 1 (Speaking Part 1): Answer interview questions on urban green spaces, reading preferences, and digital work (60 seconds).",
      options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "Review Band 8.5+ Everyday Collocations" },
            { key: "C", text: "Listen to Native Examiner Audio" },
            { key: "D", text: "Skip to Cue Card" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT PART 1 - DIRECT ANSWER + ACADEMIC EXPANSION]
- Trả lời trực tiếp và mở rộng bằng từ vựng phong phú về không gian xanh, thói quen kỹ thuật số.

🔍 [BÀI NÓI MẪU BAND 8.5+]
"I make a conscious effort to visit our municipal botanical gardens at least twice a week. Immersing myself in lush greenery provides an indispensable mental reset from screen-induced fatigue.

While e-readers offer unmatched portability for traveling, I still cherish the tactile sensation and cognitive focus of reading physical paperbacks, particularly when studying dense academic literature.

In terms of digital workplace adaptability, I believe data literacy and asynchronous communication skills are paramount, allowing professionals to collaborate seamlessly across distributed global time zones.

Instant messaging and high-definition video calls have virtually eradicated geographical barriers, enabling families separated by continents to maintain spontaneous, intimate daily connections."

💡 [TỪ VỰNG THEN CHỐT]
- Indispensable mental reset /ˌɪn.dɪˈspen.sə.bəl ˈmen.t̬əl ˈriː.set/ (n): Sự tái tạo tinh thần không thể thiếu
- Tactile sensation /ˈtæk.taɪl senˈseɪ.ʃən/ (n): Cảm giác xúc giác chân thực
- Asynchronous communication /eɪˈsɪŋ.krə.nəs kəˌmjuː.nəˈkeɪ.ʃən/ (n): Giao tiếp bất đồng bộ (không cùng thời gian thực)
- Eradicated geographical barriers /ɪˈræd.ə.keɪ.t̬ɪd ˌdʒiː.əˈɡræf.ɪ.kəl ˈber.i.ɚz/ (v/n): Xóa bỏ rào cản địa lý.`
    },
    {
      id: "isp2_q2",
      partNumber: 2,
      partTitle: "IELTS Speaking Part 2: Cue Card — An Influential Scientist or Inventor",
      section: "SPEAKING",
      speakingPrompt:
        "Describe a scientist, inventor, or historical pioneer whose work has had a profound impact on the world.\nYou should say:\n• Who this person was and what they invented or discovered\n• When and how you first learned about their work\n• What challenges or obstacles they overcame\nAnd explain why you admire their contribution to humanity.",
      preparationTimeSeconds: 60,
      speakingTimeSeconds: 120,
      questionText:
        "Question 2 (Speaking Part 2): Deliver a continuous 2-minute speech describing an influential scientist or inventor (e.g., Nikola Tesla).",
      options: [
            { key: "A", text: "View 1-Minute Note-Taking Template" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [CHIẾN THUẬT 1 PHÚT GHI CHÚ (THE 4-BOX METHOD)]
- Box 1 (Who): Nikola Tesla, visionary Serbian-American electrical and mechanical engineer.
- Box 2 (Inventions): Alternating current (AC) electrical grid, induction motor, radio telemetry, hydroelectric generators at Niagara Falls.
- Box 3 (Challenges): Commercial marginalization during the 'War of the Currents' with Thomas Edison, loss of patents, and financial poverty.
- Box 4 (Why admire): Uncompromising altruism; envisioned free wireless global energy transmission to uplift all human civilization.

🔍 [BÀI NÓI MẪU BAND 9.0 (230+ TỪ)]
"I would like to speak about a visionary genius whose revolutionary engineering laid the foundational infrastructure of the modern electrical age: Nikola Tesla.

Tesla was a prolific Serbian-American inventor best known for developing the alternating current (AC) polyphase electrical distribution system, the AC induction motor, and early precursors to wireless telecommunications and neon lighting.

I first encountered his biography during my high school physics studies, and I was immediately captivated by how his conceptual designs at the Niagara Falls hydroelectric project powered the industrial electrification of North America.

What makes Tesla's legacy so deeply compelling is the immense adversity he endured. During the fierce 'War of the Currents' against entrenched commercial interests, he faced relentless public smear campaigns and corporate exploitation, ultimately relinquishing lucrative royalties so his AC grid could become widely accessible to the general public. He died in relative financial poverty, having prioritized scientific discovery over personal enrichment.

I admire him profoundly because he embodied the purest ethos of scientific altruism. Long before the digital revolution, Tesla foresaw a world interconnected by wireless energy and global communication, proving that visionary intellect driven by human compassion can illuminate an entire planet."

💡 [TỪ VỰNG THEN CHỐT]
- Alternating current polyphase system /ˈɑːl.tɚ.neɪ.t̬ɪŋ ˈkɝː.ənt ˈpɑː.liˌfeɪz ˈsɪs.təm/ (n): Hệ thống điện xoay chiều nhiều pha
- Relinquishing lucrative royalties /rɪˈlɪŋ.kwɪ.ʃɪŋ ˈluː.krə.t̬ɪv ˈrɔɪ.əl.tiz/ (v/n): Từ bỏ tiền bản quyền béo bở
- Entrenched commercial interests /ɪnˈtrentʃt kəˈmɝː.ʃəl ˈɪn.trɪsts/ (n): Các nhóm lợi ích thương mại ăn sâu bén rễ
- Scientific altruism /ˌsaɪənˈtɪf.ɪk ˈæl.tru.ɪ.zəm/ (n): Lòng vị tha trong khoa học.`
    },
    {
      id: "isp2_q3",
      partNumber: 3,
      partTitle: "IELTS Speaking Part 3: Autonomous Vehicles, AI Labor & STEAM Education",
      section: "SPEAKING",
      speakingPrompt:
        "1. What ethical dilemmas must programmers address when designing decision-making algorithms for autonomous self-driving cars?\n2. Do you believe artificial intelligence will create more jobs than it displaces across the next two decades?\n3. How should modern school curriculums adapt to emphasize interdisciplinary STEAM education rather than rote memorization?",
      preparationTimeSeconds: 20,
      speakingTimeSeconds: 90,
      questionText:
        "Question 3 (Speaking Part 3): Provide balanced, high-level analytical answers on autonomous tech ethics and STEAM education.",
      options: [
            { key: "A", text: "Review Analytical Discourse Markers" },
            { key: "B", text: "Check Band 9 Vocabulary Vault" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Complete Speaking Studio" }
          ],
      correctAnswer: "C",
      explanation: `🎯 [CHIẾN THUẬT PART 3 - CẤU TRÚC PHÂN TÍCH ĐA CHIỀU]
- Phân tích tình thế đạo đức xe tự hành (Trolley problem trong code AI).
- Đánh giá chuyển dịch cơ cấu việc làm và cải cách giáo dục liên ngành STEAM.

🔍 [BÀI NÓI MẪU BAND 9.0 (90 GIÂY)]
"Autonomous navigation algorithms confront classic ethical paradoxes reminiscent of the philosophical 'Trolley Problem'. In unavoidable collision scenarios, software engineers must program whether a vehicle prioritizes passenger preservation over pedestrian safety, raising profound questions of algorithmic moral accountability that require transparent public legislative consensus.

Regarding technological unemployment, while generative AI will inevitably automate routine cognitive tasks—such as administrative drafting and basic coding—it will simultaneously spawn novel industries centered on prompt architecture, ethical governance, and human-in-the-loop oversight.

Therefore, educational paradigms must urgently pivot away from archaic rote memorization toward interdisciplinary STEAM frameworks, cultivating critical thinking, emotional intelligence, and adaptive problem-solving that remain uniquely resilient against algorithmic automation."

💡 [TỪ VỰNG THEN CHỐT]
- Algorithmic moral accountability /ˌæl.ɡəˈrɪð.mɪk ˈmɔːr.əl əˌkaʊn.t̬əˈbɪl.ə.t̬i/ (n): Trách nhiệm giải trình đạo đức của thuật toán
- Technological unemployment /ˌtek.nəˈlɑː.dʒɪ.kəl ˌʌn.ɪmˈplɔɪ.mənt/ (n): Thất nghiệp do công nghệ
- Archaic rote memorization /ɑːrˈkeɪ.ɪk roʊt ˌmem.ə.raɪˈzeɪ.ʃən/ (n): Phương pháp học vẹt cổ hủ
- Interdisciplinary STEAM frameworks /ˌɪn.t̬ɚˈdɪs.ə.plɪ.ner.i stiːm ˈfreɪm.wɝːks/ (n): Khung giáo dục liên ngành Khoa học - Công nghệ - Kỹ thuật - Nghệ thuật - Toán học.`
    }
  ]
};
