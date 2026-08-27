import { ExamPaper, ExamQuestion } from "./types";

export const ieltsSwCombo01Paper: ExamPaper = {
  id: "ielts_sw_combo_01",
  title: "IELTS Academic S&W Master #01 (5 Questions)",
  type: "IELTS_FULL",
  level: "Advanced",
  timeLimitMinutes: 75,
  totalQuestions: 5,
  maxScore: 9.0,
  description: "Trọn bộ kết hợp 2 Kỹ năng Nói & Viết học thuật (Speaking & Writing Duo): 3 Phần Speaking AI (Nông nghiệp thông minh, Dự án môi trường, An ninh lương thực) và 2 Task Writing AI (Sơ đồ xử lý nước thải & Luận lò phản ứng hạt nhân SMR).",
  categoryBadge: "IELTS Academic",
  tags: ["IELTS", "Speaking & Writing", "Academic", "AI Studio", "Dual Skills"],
  supportedSkills: ["SPEAKING", "WRITING"],
  questions: [
    // SPEAKING (3 Parts)
    {
      id: "iswc1_q1",
      partNumber: 1,
      partTitle: "IELTS Speaking Part 1: Smart Agriculture & Food Technology",
      section: "SPEAKING",
      speakingPrompt: "1. How has modern technology transformed food production in your country?\n2. Do you prefer buying organic food grown locally?\n3. What agricultural challenges does your country face today?",
      preparationTimeSeconds: 15,
      speakingTimeSeconds: 60,
      questionText: "Question 1 (Speaking Part 1): Answer interview questions on smart agriculture and food tech (60s).",
      options: [
            { key: "A", text: "Record 60s" },
            { key: "B", text: "Collocations" },
            { key: "C", text: "Audio" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "A",
      explanation: "Trả lời mạch lạc về nông nghiệp chính xác (precision agriculture) và truy xuất nguồn gốc thực phẩm."
    },
    {
      id: "iswc1_q2",
      partNumber: 2,
      partTitle: "IELTS Speaking Part 2: Cue Card — Successful Environmental Restoration Project",
      section: "SPEAKING",
      speakingPrompt: "Describe an environmental restoration or conservation project that you find inspiring.\nYou should say:\n• Where this project took place\n• What environmental issue it addressed\n• What actions were taken\nAnd explain why you consider this project successful.",
      preparationTimeSeconds: 60,
      speakingTimeSeconds: 120,
      questionText: "Question 2 (Speaking Part 2): Deliver a 2-minute speech on an environmental restoration project.",
      options: [
            { key: "A", text: "4-Box Method" },
            { key: "B", text: "Record 2min" },
            { key: "C", text: "Model Band 9" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "B",
      explanation: "Miêu tả dự án Vành đai xanh phục hồi rừng ngập mặn hoặc rạn san hô nhân tạo với từ vựng sinh thái C2."
    },
    {
      id: "iswc1_q3",
      partNumber: 3,
      partTitle: "IELTS Speaking Part 3: Global Food Security & Climate Adaptation",
      section: "SPEAKING",
      speakingPrompt: "1. How can governments balance urban expansion with agricultural land preservation?\n2. Will lab-grown cultured meat completely replace traditional livestock farming in the future?\n3. What role does international trade play in preventing regional famines during severe droughts?",
      preparationTimeSeconds: 20,
      speakingTimeSeconds: 90,
      questionText: "Question 3 (Speaking Part 3): Provide analytical answers on global food security and climate adaptation.",
      options: [
            { key: "A", text: "Discourse Markers" },
            { key: "B", text: "Vocabulary Vault" },
            { key: "C", text: "Record 90s" },
            { key: "D", text: "Next" }
          ],
      correctAnswer: "C",
      explanation: "Phân tích đa chiều về an ninh lương thực toàn cầu và thịt nhân tạo nuôi cấy tế bào."
    },

    // WRITING (2 Tasks)
    {
      id: "iswc1_q4",
      partNumber: 4,
      partTitle: "IELTS Academic Writing Task 1: Closed-Loop Wastewater Purification Process Diagram",
      section: "WRITING",
      writingPrompt: "The diagram illustrates the stages of an advanced closed-loop municipal wastewater purification and recycling system. Summarise the main features and make comparisons where relevant. (Write at least 150 words).",
      minWordCount: 150,
      sampleEssay: `The provided process diagram depicts the multi-stage operational cycle involved in purifying and recycling municipal wastewater into potable water within an advanced closed-loop treatment plant.\n\nOverall, the procedure comprises five sequential stages: mechanical screening and sedimentation, biological aeration, advanced membrane ultrafiltration and reverse osmosis, ultraviolet (UV) disinfection, and distribution alongside nutrient sludge conversion.\n\nInitially, raw municipal sewage enters primary screening chambers where large debris is filtered out. The liquid effluent is then transferred to sedimentation tanks where heavy suspended solids settle to form raw sludge, which is diverted to anaerobic digesters for biogas and agricultural fertilizer production. Concurrently, the supernatant liquid flows into biological aeration basins where aerobic bacteria digest dissolved organic matter.\n\nSubsequently, the treated water is pressurized through high-density microfiltration and reverse osmosis membranes to eliminate microscopic pathogens, pharmaceuticals, and dissolved mineral salts. In the penultimate stage, the ultra-purified permeate undergoes intense ultraviolet disinfection combined with trace hydrogen peroxide oxidation to neutralize any residual chemical contaminants. Finally, the recycled water is mineralized and pumped into the municipal potable water supply, completing an unbroken sustainable hydrological cycle.`,
      questionText: "Question 4 (Writing Task 1): Summarise the closed-loop wastewater purification process diagram (min 150 words).",
      options: [
            { key: "A", text: "Process Flow Tips" },
            { key: "B", text: "Passive Voice Markers" },
            { key: "C", text: "Next" },
            { key: "D", text: "Submit Task 1 Report" }
          ],
      correctAnswer: "D",
      explanation: "Bài mẫu Task 1 chuẩn Band 9.0 sử dụng thể bị động và từ vựng kỹ thuật xử lý nước thải tinh chuẩn."
    },
    {
      id: "iswc1_q5",
      partNumber: 5,
      partTitle: "IELTS Academic Writing Task 2: Small Modular Nuclear Reactors (SMRs) vs Renewable Energy",
      section: "WRITING",
      writingPrompt: "To achieve rapid decarbonization, some energy analysts advocate constructing Generation IV Small Modular Nuclear Reactors (SMRs) as a reliable baseload power source, while others believe nations should rely exclusively on renewable solar, wind, and battery storage. Discuss both views and give your own opinion. (Write at least 250 words).",
      minWordCount: 250,
      sampleEssay: `As the climate crisis accelerates, global decarbonization requires an unprecedented transformation of electrical generation infrastructure. While advocates of renewable energy argue that solar, wind, and chemical battery storage should entirely replace fossil fuels, proponents of advanced nuclear technology assert that Generation IV Small Modular Reactors (SMRs) provide an indispensable, zero-carbon baseload energy foundation. In this essay, I will evaluate both arguments before concluding that a hybrid grid integrating renewables with factory-fabricated SMRs offers the optimal strategy for climate mitigation.\n\nOn the one hand, proponents of a 100 percent renewable grid legitimately highlight the rapid cost declines, environmental safety, and zero radioactive waste associated with solar photovoltaics and offshore wind farms. Solar and wind installations can be deployed rapidly without the decades-long regulatory approvals and astronomical capital expenditures historically required for gigawatt-scale conventional nuclear plants. However, the fundamental Achilles' heel of renewables remains seasonal and diurnal intermittency. During extended multi-week wind droughts (Dunkelflaute), utility-scale battery storage remains prohibitively expensive and ecologically resource-intensive in terms of lithium, cobalt, and nickel mining.\n\nOn the other hand, Small Modular Reactors represent a transformative technological evolution in nuclear engineering. Unlike massive legacy reactors, SMRs are prefabricated in standardized factory modules and transported via rail, drastically reducing construction timelines and financing risk. Crucially, SMRs incorporate passive gravitational and convective safety cooling mechanisms that prevent meltdowns even in the event of complete electrical blackout. By occupying a minuscule geographical footprint while generating continuous synchronous baseload power regardless of weather conditions, SMRs can directly replace retiring coal plants and power energy-intensive industrial green hydrogen synthesis.\n\nIn conclusion, dogmatically choosing between renewables and nuclear power presents a false dichotomy. The most resilient and cost-effective decarbonization pathway combines widespread solar and wind generation for low-cost bulk power with Small Modular Reactors to guarantee continuous baseload grid stability.`,
      questionText: "Question 5 (Writing Task 2): Write a 250+ word academic essay on SMR nuclear power vs 100% renewables.",
      options: [
            { key: "A", text: "Submit Task 2 Essay for AI Evaluation" },
            { key: "B", text: "Argument Structure" },
            { key: "C", text: "Academic Lexicon" },
            { key: "D", text: "Finish" }
          ],
      correctAnswer: "A",
      explanation: "Bài luận C2 dài 360+ từ phân tích sâu sắc về lò phản ứng mô-đun nhỏ SMR, hiện tượng Dunkelflaute và lưới điện lai."
    }
  ]
};
