import { ExamPaper, ExamQuestion } from "./types";

export const ieltsWritingMaster02Paper: ExamPaper = {
  id: "ielts_writing_master_02",
  title: "IELTS Academic Writing Master #02 (2 Tasks)",
  type: "IELTS_WRITING",
  level: "Advanced",
  timeLimitMinutes: 60,
  totalQuestions: 2,
  maxScore: 9.0,
  description: "Phòng luyện thi Viết học thuật chuyên sâu (Writing AI Studio): Trọn bộ 2 Tasks chuẩn Cambridge với chấm điểm AI theo 4 tiêu chí IELTS về Biểu đồ kết hợp (Mixed Charts) và Bài luận rác thải điện tử toàn cầu (Global E-waste).",
  categoryBadge: "IELTS Writing",
  tags: ["IELTS", "Writing Only", "AI Studio", "2 Tasks", "Cambridge Standard"],
  supportedSkills: ["WRITING"],
  questions: [
    {
      id: "iwm2_q1",
      partNumber: 1,
      partTitle: "IELTS Academic Writing Task 1: Mixed Charts (Global Greenhouse Emissions & Renewable Share)",
      section: "WRITING",
      writingPrompt:
        "The line graph below shows global greenhouse gas emissions (in gigatonnes of CO2 equivalent) from 2000 to 2025 with projections to 2030, while the bar chart illustrates the share of renewable electricity generation across four regions in 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Time suggested: 20 minutes).",
      minWordCount: 150,
      sampleEssay: `The provided line graph illustrates global greenhouse gas emissions measured in gigatonnes of CO2 equivalent between 2000 and 2025, alongside projected trends to 2030, while the accompanying bar chart compares the percentage share of renewable electricity generation across Europe, North America, Asia-Pacific, and Latin America in 2010 and 2025.

Overall, global greenhouse gas emissions exhibited a continuous upward trajectory over the thirty-year timeline, although the rate of growth is projected to decelerate slightly by 2030. Concurrently, all four examined regions recorded notable expansions in their renewable electricity shares, with Europe and Latin America maintaining the most substantial proportions throughout the period.

Looking first at global emissions, the figure stood at approximately 35 gigatonnes in 2000 before escalating steadily to reach roughly 52 gigatonnes in 2025. Projections indicate a modest plateauing effect, with emissions expected to culminate at approximately 55 gigatonnes by 2030.

Turning to regional renewable electricity generation, Europe witnessed the most dramatic growth, nearly doubling its share from 22 percent in 2010 to 44 percent in 2025. Latin America also displayed robust performance, expanding from 30 percent to 48 percent to remain the leading renewable generator. Meanwhile, North America experienced moderate gains, climbing from 12 percent to 28 percent, while Asia-Pacific recorded a threefold increase, rising steeply from 8 percent in 2010 to 26 percent in 2025.`,
      questionText:
        "Question 1 (Writing Task 1): Summarise the mixed charts on global emissions and renewable generation (min 150 words).",
      options: [
            { key: "A", text: "Submit Task 1 Mixed Chart Report for Gemini AI Evaluation" },
            { key: "B", text: "Review 4-Paragraph Academic Report Structure" },
            { key: "C", text: "Check Comparative Vocabulary Vault" },
            { key: "D", text: "Skip to Task 2" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT TASK 1 MIXED CHARTS - BAND 9.0]
1. Overview (Bắt buộc):
   - Nêu xu hướng chung của cả 2 biểu đồ: Khí thải toàn cầu tăng liên tục nhưng chậm lại vào 2030; tỷ trọng điện tái tạo tăng trên cả 4 khu vực (dẫn đầu là Châu Âu và Mỹ Latinh).

2. Bố cục 4 đoạn:
   - Đoạn 1: Mở bài paraphrase lại đề bài.
   - Đoạn 2: Overview 2 câu tổng quan.
   - Đoạn 3: Phân tích chi tiết Line graph (35 ➔ 52 ➔ 55 gigatonnes).
   - Đoạn 4: Phân tích chi tiết Bar chart (Châu Âu 22% ➔ 44%, Mỹ Latinh 30% ➔ 48%, Châu Á TBD 8% ➔ 26%).`
    },
    {
      id: "iwm2_q2",
      partNumber: 2,
      partTitle: "IELTS Academic Writing Task 2: Global E-waste & Corporate Producer Responsibility",
      section: "WRITING",
      writingPrompt:
        "With the rapid obsolescence of consumer technology, electronic waste (e-waste) has become the fastest-growing solid waste stream on Earth. Some people argue that multinational technology manufacturers should be legally mandated to fund and manage the entire recycling life-cycle of their products. Others contend that individual consumers and local municipalities should bear primary responsibility for waste disposal. Discuss both views and give your own opinion. (Write at least 250 words. Time suggested: 40 minutes).",
      minWordCount: 250,
      sampleEssay: `In an era defined by hyper-accelerated digital consumerism and planned product obsolescence, electronic waste (e-waste) has burgeoned into one of the most hazardous environmental crises facing modern civilization. While some commentators argue that end-users and local municipal councils should bear the primary burden of discarded electronics management, others insist that multinational hardware manufacturers must be held legally accountable across the full life-cycle of their products. In this essay, I will examine both perspectives before arguing that imposing strict Extended Producer Responsibility (EPR) on electronics corporations represents the only viable, ecologically sustainable solution.

On the one hand, proponents of municipal and consumer responsibility argue that local authorities already possess the ground-level logistical frameworks necessary for waste sorting and sanitation. Under this framework, educating individual consumers to participate in municipal drop-off centers and imposing landfill disposal taxes fosters civic environmental accountability. However, relying solely on municipal taxpayers to handle e-waste is fundamentally flawed. Local governments often lack the specialized chemical refineries required to safely extract rare earth elements and neutralize toxic heavy metals—such as lead, cadmium, and mercury—resulting in hazardous informal recycling that pollutes developing nations.

On the other hand, placing mandatory legal responsibility on manufacturers addresses the root architecture of the problem. When tech conglomerates are legally mandated to finance buy-back schemes and closed-loop recycling infrastructure, it fundamentally alters their engineering incentives. Rather than designing glued, non-repairable devices with planned obsolescence, corporations are financially incentivized to adopt 'Design for Disassembly' principles—manufacturing modular smartphones and laptops that can be easily dismantled, repaired, and upgraded using recycled components. Furthermore, multinational tech giants generate trillions in profit from hardware sales and possess the immense capital reserves required to establish state-of-the-art robotic smelting facilities.

In conclusion, while civic awareness and municipal collection remain helpful complementary elements, placing the primary legal and financial obligation on tech manufacturers is essential. Enforcing Extended Producer Responsibility worldwide will compel the electronics industry to transition from a destructive linear 'extract-produce-dispose' model to a circular, regenerative technological economy.`,
      questionText:
        "Question 2 (Writing Task 2): Write a 250+ word academic essay on corporate producer responsibility vs municipal e-waste recycling.",
      options: [
            { key: "A", text: "Review Extended Producer Responsibility Arguments" },
            { key: "B", text: "Submit Task 2 Essay for Gemini AI Evaluation" },
            { key: "C", text: "Check Band 9 Academic Cohesion Markers" },
            { key: "D", text: "Complete Writing Studio" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [CHIẾN THUẬT BÀI LUẬN DẠNG DISCUSS BOTH VIEWS - BAND 9.0]
1. Task Response:
   - Thân bài 1: Phân tích góc nhìn trách nhiệm của người tiêu dùng và chính quyền địa phương (thu gom tại chỗ nhưng thiếu công nghệ tinh chế kim loại nặng độc hại).
   - Thân bài 2: Phân tích sâu sắc trách nhiệm của nhà sản xuất (Extended Producer Responsibility - EPR thúc đẩy 'Design for Disassembly', tái chế khép kín).
   - Quan điểm cá nhân: Ủng hộ tuyệt đối EPR để chuyển từ kinh tế tuyến tính sang kinh tế tuần hoàn.

2. Lexical Resource (C2 Academic):
   - "hyper-accelerated digital consumerism", "planned product obsolescence", "Extended Producer Responsibility (EPR)", "Design for Disassembly", "closed-loop recycling infrastructure", "circular regenerative economy".`
    }
  ]
};
