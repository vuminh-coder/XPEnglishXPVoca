import { ExamPaper, ExamQuestion } from "./types";

export const ieltsSpeakingPro01Paper: ExamPaper = {
  id: "ielts_speaking_pro_01",
  title: "IELTS Speaking AI Studio #01",
  type: "IELTS_SPEAKING",
  level: "Advanced",
  timeLimitMinutes: 15,
  totalQuestions: 3,
  maxScore: 9.0,
  description:
    "Phòng thi IELTS Speaking 3 Part chuyên sâu chuẩn Cambridge với AI nhận diện giọng nói, bài nói mẫu Band 9.0, hướng dẫn ghi chú 1 phút và chấm điểm 4 tiêu chí quốc tế.",
  categoryBadge: "IELTS Speaking",
  tags: ["IELTS", "Speaking AI", "Cue Card", "Band 9.0 Standard", "Technology & AI"],
  supportedSkills: ["SPEAKING"],
  questions: [
    {
      id: "isp1_q1",
      partNumber: 1,
      partTitle: "Part 1: Personal Interview — Technology & Daily Routines",
      section: "SPEAKING",
      speakingPrompt:
        "1. How much time do you spend using digital screens on a daily basis?\n2. What is your favorite smartphone application and why?\n3. Do you prefer reading physical printed books or digital e-books?\n4. How has technology changed the way people communicate in your country?",
      preparationTimeSeconds: 15,
      speakingTimeSeconds: 60,
      questionText:
        "Part 1 (Personal Interview): Answer 4 interview questions on digital technology habits naturally with extended responses (60 seconds).",
      options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "View Band 8.5+ Topic Collocations" },
            { key: "C", text: "Listen to Native Examiner Questions" },
            { key: "D", text: "Skip to Part 2 Cue Card" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT PART 1 - DIRECT ANSWER + EXTENSION]
- Không trả lời cụt lủn (Yes/No). Áp dụng công thức 3 bước: 1. Trả lời trực diện ➔ 2. Giải thích lý do hoặc dẫn chứng ➔ 3. Mở rộng cảm xúc/thói quen tương lai.
- Duy trì nhịp điệu nói tự nhiên (Fluency), tránh ngập ngừng quá 3 giây.

🔍 [BÀI NÓI MẪU BAND 8.5+]
"To be completely honest, digital screens are virtually omnipresent in my daily life. On average, I log approximately six to seven hours each day, predominantly split between academic research on my laptop and essential messaging on my phone. 

Among all the apps installed on my device, Notion is undoubtedly my favorite because it serves as an indispensable productivity workspace where I can organize my weekly schedule, take structured lecture notes, and track personal habits seamlessly.

When it comes to reading, although e-books offer undeniable portability and space-saving convenience, I still possess a strong affinity for physical paperbacks. The tactile sensation of turning pages and the absence of eye fatigue make traditional reading a far more immersive experience for me.

Finally, technology has fundamentally revolutionized communication in Vietnam. Traditional face-to-face interactions and landline calls have been largely supplanted by instant messaging platforms like Zalo and Telegram, allowing people to stay connected asynchronously regardless of geographic boundaries."

⚠️ [BẪY PHÁT ÂM & LỖI THƯỜNG GẶP]
- Lỗi lặp từ: Tránh dùng liên tục "I use", "very good", "I like". Thay bằng: "I utilize", "indispensable", "have a strong affinity for".
- Ngắt cụm hơi (Chunking): Ngắt sau các trạng từ nối ("To be completely honest, / digital screens are virtually omnipresent...").

💡 [TỪ VỰNG & PHÁT ÂM THEN CHỐT]
- Omnipresent /ˌɒm.nɪˈprez.ənt/ (adj): Có mặt ở khắp mọi nơi
- Indispensable /ˌɪn.dɪˈspen.sə.bəl/ (adj): Không thể thiếu được
- Affinity /əˈfɪn.ə.ti/ (n): Sự yêu thích, gắn bó
- Supplant /səˈplɑːnt/ (v): Thay thế, chiếm chỗ
- Asynchronously /eɪˈsɪŋ.krə.nəs.li/ (adv): Không đồng thời, linh hoạt thời gian
- Portability /ˌpɔː.təˈbɪl.ə.ti/ (n): Tính di động, dễ mang theo
- Immersive /ɪˈmɜː.sɪv/ (adj): Mang tính chìm đắm, cuốn hút hoàn toàn
- Revolutionize /ˌrev.əˈluː.ʃən.aɪz/ (v): Cách mạng hóa, thay đổi căn bản.`
    },
    {
      id: "isp1_q2",
      partNumber: 2,
      partTitle: "Part 2: Cue Card — A Significant Scientific Breakthrough",
      section: "SPEAKING",
      speakingPrompt:
        "Describe a scientific or technological breakthrough that has changed modern society.\nYou should say:\n• What the breakthrough is and when it occurred\n• How it functions\n• How it has impacted people's daily lives\nAnd explain whether you think its benefits outweigh its potential drawbacks.",
      preparationTimeSeconds: 60,
      speakingTimeSeconds: 120,
      questionText:
        "Part 2 (Cue Card Long Turn): Deliver a continuous 2-minute speech describing a transformative scientific discovery.",
      options: [
            { key: "A", text: "View 1-Minute Note-Taking Template" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3 Discussion" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [CHIẾN THUẬT 1 PHÚT GHI CHÚ - THE 4-BOX FRAMEWORK]
- Box 1 (What/When): CRISPR-Cas9 gene editing / Discovered 2012 / Charpentier & Doudna.
- Box 2 (How): Molecular scissors / Target faulty DNA / Cut & repair genetic sequences.
- Box 3 (Impact): Cure hereditary diseases (sickle cell) / Climate-resilient crops.
- Box 4 (Pros vs Cons): Unprecedented medical efficacy vs Bioethical dilemmas ("designer babies").

🔍 [BÀI NÓI MẪU BAND 9.0 CHUẨN 2 PHÚT (240+ TỪ)]
"I would like to delve into one of the most momentous milestones in contemporary science: the advent of CRISPR-Cas9 gene editing technology, which was pioneered in 2012 by Nobel laureates Emmanuelle Charpentier and Jennifer Doudna.

Fundamentally, CRISPR acts as a set of programmable molecular scissors. It utilizes a guide RNA molecule to locate a specific mutated DNA sequence within a living cell and employs the Cas9 enzyme to make a precise cut. This enables geneticists to either disable faulty genes or seamlessly insert corrected sequences with unprecedented accuracy and cost-efficiency.

The ramifications of this breakthrough on modern society are truly profound. In clinical medicine, CRISPR has transformed experimental therapy into tangible cures for previously incurable hereditary disorders, such as sickle cell anemia and congenital blindness. Furthermore, in agriculture, researchers are engineering drought-resistant and nutrient-fortified crops, which will be vital for global food security amid accelerating climate change.

Regarding whether the merits outweigh the drawbacks, I firmly believe the therapeutic benefits are overwhelmingly positive. While critics legitimately raise bioethical concerns regarding the unregulated creation of 'designer babies' and permanent germline modifications, robust international regulatory frameworks can effectively mitigate these hazards. Ultimately, CRISPR represents a beacon of hope for eradicating human suffering, making it one of humanity's finest scientific triumphs."

⚠️ [TIÊU CHÍ ĐIỂM BAND 9.0]
- Fluency (Độ trôi chảy): Nói liên tục 120s, dùng từ nối tự nhiên ("Fundamentally", "The ramifications of...", "Regarding whether...").
- Lexical Resource: Sử dụng thuật ngữ khoa học chính xác ("molecular scissors", "hereditary disorders", "germline modifications").
- Grammar: Đa dạng mệnh đề quan hệ, phân từ, cấu trúc câu phức.

💡 [TỪ VỰNG & PHÁT ÂM THEN CHỐT]
- Momentous /məˈmen.təs/ (adj): Mang tính trọng đại, lịch sử
- Ramifications /ˌræm.ɪ.fɪˈkeɪ.ʃənz/ (n): Hệ quả sâu rộng
- Hereditary disorder /hɪˈred.ɪ.tər.i dɪsˈɔː.dər/ (n): Bệnh di truyền
- Mitigate /ˈmɪt.ɪ.ɡeɪt/ (v): Giảm thiểu tác hại
- Beacon of hope /ˈbiː.kən əv həʊp/ (idiom): Ngọn hải đăng hy vọng
- Germline modification /ˈdʒɜːm.laɪn ˌmɒd.ɪ.fɪˈkeɪ.ʃən/ (n): Biến đổi dòng mầm (di truyền sang thế hệ sau)
- Cost-efficiency /kɒst ɪˈfɪʃ.ən.si/ (n): Hiệu quả chi phí
- Congenital blindness /kənˈdʒen.ɪ.təl ˈblaɪnd.nəs/ (n): Mù bẩm sinh
- Regulatory framework /ˈreɡ.jə.lə.tər.i ˈfreɪm.wɜːk/ (n): Khung pháp lý quản lý.`
    },
    {
      id: "isp1_q3",
      partNumber: 3,
      partTitle: "Part 3: In-Depth Discussion — Artificial Intelligence & Ethics",
      section: "SPEAKING",
      speakingPrompt:
        "1. To what extent should national governments regulate the rapid development of autonomous artificial intelligence systems?\n2. Do you believe artificial intelligence will lead to mass structural unemployment, or will it create entirely new categories of skilled labor?\n3. How can educational institutions reform curricula to ensure students develop critical thinking rather than becoming overly reliant on automated AI tools?\n4. Who should be held legally accountable when an autonomous AI system causes physical or financial harm — the developer, the deploying company, or the end user?\n5. Some nations are proposing 'digital sovereignty' laws requiring AI data to be stored domestically. Do you think this will protect citizens or fragment global innovation?",
      preparationTimeSeconds: 20,
      speakingTimeSeconds: 90,
      questionText:
        "Part 3 (In-Depth Discussion): Provide analytical, balanced arguments on AI governance, labor markets, and education.",
      options: [
            { key: "A", text: "Review Argumentative Transitions" },
            { key: "B", text: "Check Band 9 Academic Vocabulary" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Complete Speaking Test" }
          ],
      correctAnswer: "C",
      explanation: `🎯 [CHIẾN THUẬT PART 3 - CẤU TRÚC LẬP LUẬN HỌC THUẬT PEEL]
- Point (Nêu luận điểm): Bắt đầu bằng góc nhìn vĩ mô ("From a macroeconomic perspective...").
- Explanation (Phân tích cơ chế): Phân tích nguyên nhân và hệ quả logic.
- Example (Minh chứng): Dẫn chứng từ thị trường lao động hoặc mô hình quản lý thực tế.
- Link (Tổng kết / Đánh giá đa chiều): Nêu biện pháp dung hòa hoặc xu hướng tương lai.

🔍 [BÀI NÓI MẪU BAND 9.0 (90 GIÂY)]
"From my perspective, government regulation of autonomous artificial intelligence is not merely advisable, but an absolute imperative. Without stringent oversight, algorithmic bias, deepfake proliferation, and autonomous weapon systems could pose existential risks to civil liberties and national security. However, regulators must strike a delicate balance: policies should establish ethical guardrails without stifling technological innovation.

Turning to the labor market, history demonstrates that technological revolutions—from the steam engine to the internet—inevitably cause transitional friction rather than permanent mass unemployment. While routine cognitive and manual jobs will undoubtedly be automated, AI will simultaneously catalyze unprecedented demand for prompt engineers, AI ethics auditors, and cybersecurity specialists. The crux of the issue lies in whether workforce retraining programs can keep pace with this displacement.

Finally, academic institutions must fundamentally overhaul traditional pedagogical paradigms. Rather than banning generative AI tools, educators should integrate them into coursework while shifting assessment criteria away from rote memorization toward critical debate, collaborative problem-solving, and philosophical inquiry. This ensures graduates cultivate uniquely human competencies that cannot be replicated by algorithms."

⚠️ [LỖI TRÁNH TRONG PART 3]
- Tránh trả lời cảm tính cá nhân: Không dùng "In my family..." hay "My friend said...". Part 3 yêu cầu bàn luận vấn đề ở tầm vĩ mô xã hội.
- Cấu trúc câu điều kiện & đảo ngữ: Sử dụng đảo ngữ ("Without stringent oversight...", "Rather than banning...") để đạt Band 8.5+ Grammatical Range.

💡 [TỪ VỰNG & PHÁT ÂM THEN CHỐT]
- Absolute imperative /ˌæb.sə.ˈluːt ɪmˈper.ə.tɪv/ (n): Nhiệm vụ cấp bách tuyệt đối
- Algorithmic bias /ˌæl.ɡəˈrɪð.mɪk ˈbaɪ.əs/ (n): Định kiến thuật toán
- Transitional friction /trænˈzɪʃ.ən.əl ˈfrɪk.ʃən/ (n): Sự gián đoạn/ma sát trong giai đoạn chuyển đổi
- Pedagogical paradigm /ˌped.əˈɡɒdʒ.ɪ.kəl ˈpær.ə.daɪm/ (n): Mô hình/phương pháp sư phạm
- Rote memorization /rəʊt ˌmem.ər.aɪˈzeɪ.ʃən/ (n): Học vẹt, ghi nhớ máy móc
- Existential risk /ˌeɡ.zɪˈsten.ʃəl rɪsk/ (n): Rủi ro hiện sinh (đe dọa sự tồn vong)
- Deepfake proliferation /ˈdiːp.feɪk prəˌlɪf.əˈreɪ.ʃən/ (n): Sự lan tràn video giả mạo AI
- Overhaul /ˌəʊ.vəˈhɔːl/ (v): Cải tổ toàn diện, đại tu.`
    }
  ]
};

