import { ExamPaper, ExamQuestion } from "./types";

export const toeicLsInteractive01Paper: ExamPaper = {
  id: "toeic_ls_interactive_01",
  title: "TOEIC Listening & Speaking AI Duo #01 (61 Questions)",
  type: "TOEIC_LR",
  level: "Advanced",
  timeLimitMinutes: 50,
  totalQuestions: 61,
  maxScore: 695,
  description: "Tron bo ket hop 2 Ky nang Nghe & Noi AI (Listening & Speaking Duo): 50 cau Listening Parts 1-4 (Cang Busan, Hau can bien, Tu dong hoa kho bai) va 11 cau Speaking AI chuan ETS TOEIC 2026 (Doc to chi dan hai quan, Mieu ta anh kho cang, Lich trinh hoi nghi chuoi cung ung, Bai noi quan diem tu dong hoa cang bien).",
  categoryBadge: "ETS TOEIC L&S",
  tags: ["TOEIC", "Listening & Speaking", "AI Studio", "61 Questions", "Dual Skills"],
  supportedSkills: ["LISTENING", "SPEAKING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
    // LISTENING PART 1: Photographs (Q1-Q3)
    // =========================================================================
    qs.push({
      id: "tlsc1_q1", partNumber: 1, partTitle: "Listening Part 1: Photographs", section: "LISTENING",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      questionText: "Question 1: Look at the photograph marked No. 1.",
      options: [
            { key: "A", text: "Automated gantry cranes are loading freight containers onto a cargo ship." },
            { key: "B", text: "Passengers are purchasing tickets at a railway station counter." },
            { key: "C", text: "Construction workers are pouring concrete for a building foundation." },
            { key: "D", text: "Students are studying in a university library reading room." }
          ],
      correctAnswer: "A",
      explanation: "Phuong an A mo ta dung can cau tu dong boc do container tai cang. B, C, D mo ta canh khong lien quan."
    });
    qs.push({
      id: "tlsc1_q2", partNumber: 1, partTitle: "Listening Part 1: Photographs", section: "LISTENING",
      imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      questionText: "Question 2: Look at the photograph marked No. 2.",
      options: [
            { key: "A", text: "Customers are browsing merchandise in a department store." },
            { key: "B", text: "Robotic arms are assembling electronic components on a conveyor line." },
            { key: "C", text: "Farmers are harvesting wheat in an agricultural field." },
            { key: "D", text: "Nurses are administering vaccinations at a medical clinic." }
          ],
      correctAnswer: "B",
      explanation: "Phuong an B mo ta chinh xac canh tay robot lap rap linh kien dien tu tren day chuyen."
    });
    qs.push({
      id: "tlsc1_q3", partNumber: 1, partTitle: "Listening Part 1: Photographs", section: "LISTENING",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
      questionText: "Question 3: Look at the photograph marked No. 3.",
      options: [
            { key: "A", text: "Firefighters are training with emergency rescue equipment in a courtyard." },
            { key: "B", text: "Chefs are preparing a banquet in a hotel kitchen." },
            { key: "C", text: "A project manager is presenting shipping route analytics on a digital display." },
            { key: "D", text: "Athletes are stretching before a competitive marathon race." }
          ],
      correctAnswer: "C",
      explanation: "Phuong an C mo ta dung nguoi thuyet trinh bieu do tuyen van tai bien tren man hinh ky thuat so."
    });

    // =========================================================================
    // LISTENING PART 2: Question-Response (Q4-Q18) — 15 unique questions
    // =========================================================================
    const part2Qs = [
      { q: "When will the customs clearance certificate for the Busan container shipment be issued?", opts: [{ key: "A", text: "Approximately fifty containers." }, { key: "B", text: "The maritime port authority will approve it by 4:00 PM today." }, { key: "C", text: "Yes, it weighs about 20 tonnes." }], a: "B", exp: "Cau hoi 'When' -> A chi thoi gian '4:00 PM today'." },
      { q: "Who is responsible for inspecting the refrigerated cargo containers before departure?", opts: [{ key: "A", text: "The temperature monitoring system has been upgraded." }, { key: "B", text: "No, the shipment hasn't arrived yet." }, { key: "C", text: "The certified port health inspector conducts all pre-departure checks." }], a: "C", exp: "Cau hoi 'Who' -> B chi nguoi 'certified port health inspector'." },
      { q: "Haven't the updated port security protocols been distributed to all terminal operators yet?", opts: [{ key: "A", text: "Yes, they were emailed to all operators yesterday afternoon." }, { key: "B", text: "The terminal handles approximately 3,000 containers daily." }, { key: "C", text: "It's located near the main harbour entrance." }], a: "A", exp: "Cau hoi phu dinh -> A xac nhan 'emailed yesterday afternoon'." },
      { q: "Where should we submit the revised bill of lading for the Singapore-bound cargo?", opts: [{ key: "A", text: "The cargo weighs approximately fifteen tonnes." }, { key: "B", text: "Submit it to the documentation office on the second floor of Terminal B." }, { key: "C", text: "It should arrive by next Wednesday." }], a: "B", exp: "Cau hoi 'Where' -> A chi dia diem 'documentation office, Terminal B'." },
      { q: "Why was the container vessel's departure delayed by three hours?", opts: [{ key: "A", text: "The vessel carries approximately 8,000 twenty-foot equivalent units." }, { key: "B", text: "The captain has been with the company for twelve years." }, { key: "C", text: "Because of an unexpected mechanical failure in the main engine." }], a: "C", exp: "Cau hoi 'Why' -> B chi ly do 'mechanical failure in main engine'." },
      { q: "How many metric tonnes of bulk grain were loaded onto the cargo vessel this morning?", opts: [{ key: "A", text: "The loading crew reported approximately 4,500 metric tonnes." }, { key: "B", text: "Because the weather conditions were favourable." }, { key: "C", text: "Yes, it departed on schedule at 8 AM." }], a: "A", exp: "Cau hoi 'How many' -> A chi so luong '4,500 metric tonnes'." },
      { q: "Could you confirm whether the hazardous materials declaration has been filed electronically?", opts: [{ key: "A", text: "The cargo includes industrial-grade chemical solvents." }, { key: "B", text: "Yes, it was uploaded to the port single-window system at 10 AM." }, { key: "C", text: "No, I prefer to work the morning shift." }], a: "B", exp: "Cau hoi Yes/No -> B xac nhan 'uploaded at 10 AM'." },
      { q: "Shouldn't the warehouse inventory count be completed before the quarterly audit begins?", opts: [{ key: "A", text: "The warehouse stores approximately 12,000 pallets." }, { key: "B", text: "Yes, the building was renovated last year." }, { key: "C", text: "Actually, the audit team agreed to postpone it until next Monday." }], a: "C", exp: "Cau hoi goi y -> A dua giai phap 'postpone until next Monday'." },
      { q: "What type of vessel is scheduled to dock at Berth 7 this evening?", opts: [{ key: "A", text: "A fully loaded Panamax-class bulk carrier from Rotterdam." }, { key: "B", text: "The docking fee is approximately $15,000." }, { key: "C", text: "No, it hasn't been confirmed yet." }], a: "A", exp: "Cau hoi 'What type' -> A chi loai tau 'Panamax-class bulk carrier'." },
      { q: "I'm not sure whether the crane operators have received their updated safety certifications.", opts: [{ key: "A", text: "The cranes can lift up to 65 metric tonnes." }, { key: "B", text: "You should check with the HR department — they processed the renewals last week." }, { key: "C", text: "Yes, the port is open 24 hours a day." }], a: "B", exp: "Phat bieu khong chac chan -> A goi y 'check with HR department'." },
      { q: "Which freight forwarding company is handling the transshipment to Jakarta?", opts: [{ key: "A", text: "The shipment includes 200 units of industrial machinery." }, { key: "B", text: "It should take approximately five business days." }, { key: "C", text: "Apex Global Freight was awarded the contract last quarter." }], a: "C", exp: "Cau hoi 'Which company' -> B chi ten cong ty 'Apex Global Freight'." },
      { q: "Do you know if the port authority has approved the new automated stacking crane installation?", opts: [{ key: "A", text: "Yes, the approval was granted during last Tuesday's board meeting." }, { key: "B", text: "The installation will cost approximately $2.3 million." }, { key: "C", text: "The crane operator starts work at 6 AM." }], a: "A", exp: "Cau hoi Yes/No -> B xac nhan 'approval granted last Tuesday'." },
      { q: "How long does it typically take to unload a fully loaded container ship at this terminal?", opts: [{ key: "A", text: "The terminal employs approximately 850 workers." }, { key: "B", text: "Between 18 and 24 hours, depending on vessel size and cargo type." }, { key: "C", text: "No, the crane isn't operational today." }], a: "B", exp: "Cau hoi 'How long' -> A chi thoi gian '18 to 24 hours'." },
      { q: "The quality control report for the pharmaceutical shipment is due tomorrow, isn't it?", opts: [{ key: "A", text: "The shipment contains 50,000 vaccine doses." }, { key: "B", text: "Yes, the temperature was maintained at minus 20 degrees." }, { key: "C", text: "Actually, the deadline was extended to Friday after the client's request." }], a: "C", exp: "Tag question -> B dieu chinh 'deadline extended to Friday'." },
      { q: "Would you prefer to schedule the port safety drill in the morning or afternoon shift?", opts: [{ key: "A", text: "The morning shift would be better since fewer vessels are docked then." }, { key: "B", text: "The drill involves approximately 200 personnel." }, { key: "C", text: "Yes, safety is very important at the port." }], a: "A", exp: "Cau hoi lua chon -> A chon 'morning shift' voi ly do." }
    ];

    part2Qs.forEach((item, idx) => {
      qs.push({ id: `tlsc1_q${idx + 4}`, partNumber: 2, partTitle: "Listening Part 2: Question-Response", section: "LISTENING", questionText: `Question ${idx + 4}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // LISTENING PART 3: Short Conversations (Q19-Q36) — 6 conversations x 3 questions
    // =========================================================================
    const part3Convos = [
      {
        passage: `[Audio Transcript - Container Terminal Operations]\nAgent: Has the refrigerated container vessel from Busan docked at Terminal 3 yet?\nDirector: Yes, the automated berthing system completed docking thirty minutes ahead of schedule. We should begin unloading by 2 PM.\nAgent: Excellent. I'll notify the cold chain inspection team immediately.`,
        questions: [
          { q: "What operation was completed ahead of schedule?", opts: [{ key: "A", text: "The crew's medical examination" }, { key: "B", text: "The monthly financial audit" }, { key: "C", text: "The office renovation project" }, { key: "D", text: "The automated vessel berthing and docking procedure" }], a: "D", exp: "'Automated berthing system completed docking thirty minutes ahead of schedule'." },
          { q: "When will unloading begin?", opts: [{ key: "A", text: "By 2 PM" }, { key: "B", text: "Immediately" }, { key: "C", text: "Tomorrow morning" }, { key: "D", text: "After the weekend" }], a: "A", exp: "'We should begin unloading by 2 PM'." },
          { q: "Who will the agent notify?", opts: [{ key: "A", text: "The marketing department" }, { key: "B", text: "The cold chain inspection team" }, { key: "C", text: "The ship's captain" }, { key: "D", text: "The customs broker" }], a: "B", exp: "'I'll notify the cold chain inspection team immediately'." }
        ]
      },
      {
        passage: `[Audio Transcript - Warehouse Management]\nSupervisor: We need to clear Section D of the warehouse before the pharmaceutical shipment arrives on Thursday.\nWorker: How many pallets need to be relocated?\nSupervisor: Approximately 340 pallets. I've already arranged for two additional forklift operators from the night shift.\nWorker: Should I coordinate with the quality assurance team for the temperature validation checks?`,
        questions: [
          { q: "When is the pharmaceutical shipment arriving?", opts: [{ key: "A", text: "Monday" }, { key: "B", text: "Wednesday" }, { key: "C", text: "Thursday" }, { key: "D", text: "Friday" }], a: "C", exp: "'Before the pharmaceutical shipment arrives on Thursday'." },
          { q: "How many pallets need to be relocated?", opts: [{ key: "A", text: "140 pallets" }, { key: "B", text: "240 pallets" }, { key: "C", text: "440 pallets" }, { key: "D", text: "340 pallets" }], a: "D", exp: "'Approximately 340 pallets'." },
          { q: "What additional staff has been arranged?", opts: [{ key: "A", text: "Two forklift operators from the night shift" }, { key: "B", text: "Two security guards" }, { key: "C", text: "Three warehouse managers" }, { key: "D", text: "Four quality inspectors" }], a: "A", exp: "'Two additional forklift operators from the night shift'." }
        ]
      },
      {
        passage: `[Audio Transcript - Freight Forwarding Office]\nClerk: Mr. Yamamoto, the bill of lading for the Jakarta shipment has a discrepancy. The declared weight is 12 tonnes, but the actual weigh-bridge reading shows 14.3 tonnes.\nManager: That's a significant difference. We'll need to issue a corrected document before the vessel departs at 6 PM.\nClerk: I've already contacted the shipper. They're sending revised documentation within the hour.`,
        questions: [
          { q: "What is the problem with the bill of lading?", opts: [{ key: "A", text: "The destination port is incorrect" }, { key: "B", text: "The declared weight doesn't match the actual weight" }, { key: "C", text: "The shipper's name is misspelled" }, { key: "D", text: "The insurance coverage is insufficient" }], a: "B", exp: "Chenh lech trong luong: declared 12 tonnes vs actual 14.3 tonnes." },
          { q: "When does the vessel depart?", opts: [{ key: "A", text: "At 4 PM" }, { key: "B", text: "At 5 PM" }, { key: "C", text: "At 6 PM" }, { key: "D", text: "At 8 PM" }], a: "C", exp: "'Before the vessel departs at 6 PM'." },
          { q: "What action has the clerk already taken?", opts: [{ key: "A", text: "Filed a formal complaint with port authorities" }, { key: "B", text: "Cancelled the entire shipment" }, { key: "C", text: "Requested a new vessel assignment" }, { key: "D", text: "Contacted the shipper for revised documentation" }], a: "D", exp: "'I've already contacted the shipper. They're sending revised documentation'." }
        ]
      },
      {
        passage: `[Audio Transcript - Supply Chain Meeting]\nDirector: Our Q3 on-time delivery rate dropped to 87%, which is below our 95% target. What's causing the delays?\nAnalyst: The primary bottleneck is the customs clearance process at the Singapore hub. Average processing time increased from 4 hours to 11 hours due to the new electronic documentation requirements.\nDirector: Can we assign a dedicated customs liaison officer to expedite the process?`,
        questions: [
          { q: "What is the current on-time delivery rate?", opts: [{ key: "A", text: "87%" }, { key: "B", text: "78%" }, { key: "C", text: "92%" }, { key: "D", text: "95%" }], a: "A", exp: "'On-time delivery rate dropped to 87%'. Bay: D la muc tieu (target)." },
          { q: "What is the primary cause of delays?", opts: [{ key: "A", text: "Equipment malfunction at the loading dock" }, { key: "B", text: "Customs clearance processing delays at Singapore hub" }, { key: "C", text: "Driver shortage across the delivery fleet" }, { key: "D", text: "Inclement weather conditions" }], a: "B", exp: "'Primary bottleneck is the customs clearance process at the Singapore hub'." },
          { q: "What solution does the director propose?", opts: [{ key: "A", text: "Hiring more truck drivers" }, { key: "B", text: "Changing the shipping route" }, { key: "C", text: "Assigning a dedicated customs liaison officer" }, { key: "D", text: "Reducing the delivery target to 85%" }], a: "C", exp: "'Assign a dedicated customs liaison officer to expedite the process'." }
        ]
      },
      {
        passage: `[Audio Transcript - Port Technology Upgrade]\nEngineer: The new automated stacking crane system for Yard C is ready for commissioning. We completed the final calibration tests this morning.\nPort Manager: What about the integration with the existing terminal operating system?\nEngineer: Full integration is expected by next Wednesday. The software team needs four more days to complete the API connectivity testing.\nPort Manager: Make sure the safety certification is obtained before we go live.`,
        questions: [
          { q: "What was completed this morning?", opts: [{ key: "A", text: "The construction of a new warehouse" }, { key: "B", text: "The hiring of new operators" }, { key: "C", text: "The demolition of old equipment" }, { key: "D", text: "The final calibration tests for the stacking crane" }], a: "D", exp: "'Completed the final calibration tests this morning'." },
          { q: "When will full system integration be ready?", opts: [{ key: "A", text: "Next Wednesday" }, { key: "B", text: "This Friday" }, { key: "C", text: "Next Monday" }, { key: "D", text: "In two weeks" }], a: "A", exp: "'Full integration is expected by next Wednesday'." },
          { q: "What must be obtained before going live?", opts: [{ key: "A", text: "Additional funding approval" }, { key: "B", text: "Safety certification" }, { key: "C", text: "Government environmental clearance" }, { key: "D", text: "Insurance coverage renewal" }], a: "B", exp: "'Make sure the safety certification is obtained before we go live'." }
        ]
      },
      {
        passage: `[Audio Transcript - International Shipping Inquiry]\nClient: I'd like to ship 200 units of industrial equipment from Busan to Hamburg. What transit options are available?\nAgent: We offer two routes. The direct service takes 28 days and costs $3,200 per container. The transshipment route via Singapore takes 35 days but costs only $2,400 per container.\nClient: I need the equipment delivered within 30 days, so I'll take the direct route.\nAgent: I'll prepare the booking confirmation and send it to you by end of business today.`,
        questions: [
          { q: "How long does the direct shipping route take?", opts: [{ key: "A", text: "21 days" }, { key: "B", text: "35 days" }, { key: "C", text: "28 days" }, { key: "D", text: "42 days" }], a: "C", exp: "'Direct service takes 28 days'. Bay: C la tuyen trung chuyen." },
          { q: "Why does the client choose the direct route?", opts: [{ key: "A", text: "It is cheaper" }, { key: "B", text: "It passes through more ports" }, { key: "C", text: "The agent recommended it" }, { key: "D", text: "The equipment must arrive within 30 days" }], a: "D", exp: "'I need the equipment delivered within 30 days'." },
          { q: "What will the agent do next?", opts: [{ key: "A", text: "Prepare and send the booking confirmation" }, { key: "B", text: "Contact the shipping line for a discount" }, { key: "C", text: "Schedule a warehouse inspection" }, { key: "D", text: "Arrange insurance coverage" }], a: "A", exp: "'I'll prepare the booking confirmation and send it by end of business today'." }
        ]
      }
    ];

    let p3Num = 19;
    part3Convos.forEach(convo => {
      convo.questions.forEach(item => {
        qs.push({ id: `tlsc1_q${p3Num}`, partNumber: 3, partTitle: "Listening Part 3: Short Conversations", section: "LISTENING", passageText: convo.passage, questionText: `Question ${p3Num}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
        p3Num++;
      });
    });

    // =========================================================================
    // LISTENING PART 4: Short Talks (Q37-Q50) — 4-5 talks x 3 questions + extras
    // =========================================================================
    const part4Talks = [
      {
        passage: `[Audio Transcript - Port Safety Announcement]\nAttention all terminal personnel. This is a mandatory safety reminder from the Port Operations Centre. Effective immediately, all personnel entering Container Yard Sections A through D must wear high-visibility reflective vests, steel-capped safety boots, and hard hats at all times. Additionally, all dangerous goods declarations must be submitted electronically via the port single-window portal before container discharge operations commence. Violations will result in an immediate 48-hour access suspension. Report any safety concerns to the duty supervisor on Channel 7.`,
        questions: [
          { q: "Where must dangerous goods declarations be submitted?", opts: [{ key: "A", text: "At the main reception desk" }, { key: "B", text: "Via the port single-window electronic portal" }, { key: "C", text: "By registered mail" }, { key: "D", text: "Through the shipping agent only" }], a: "B", exp: "'Submitted electronically via the port single-window portal'." },
          { q: "What is the penalty for safety violations?", opts: [{ key: "A", text: "A written warning" }, { key: "B", text: "A monetary fine of $500" }, { key: "C", text: "An immediate 48-hour access suspension" }, { key: "D", text: "Mandatory retraining course" }], a: "C", exp: "'Immediate 48-hour access suspension'." },
          { q: "How should safety concerns be reported?", opts: [{ key: "A", text: "By email to management" }, { key: "B", text: "Through the company website" }, { key: "C", text: "At the weekly safety meeting" }, { key: "D", text: "To the duty supervisor on Channel 7" }], a: "D", exp: "'Report safety concerns to the duty supervisor on Channel 7'." }
        ]
      },
      {
        passage: `[Audio Transcript - Logistics Conference Keynote]\nGood morning, delegates. Welcome to the 12th Annual Asia-Pacific Maritime Logistics Conference. I'm Dr. Katherine Wong, Director of the Centre for Smart Port Innovation at the National University of Singapore. Today, I'll be presenting our research findings on AI-driven predictive maintenance systems for container terminal equipment. Our three-year study across 14 major ports demonstrated that AI-based predictive analytics reduced unplanned equipment downtime by 62 percent and cut maintenance costs by approximately $4.8 million annually per terminal. The key technology driver is real-time sensor telemetry combined with machine learning algorithms that predict component failures 72 hours before they occur.`,
        questions: [
          { q: "Who is the keynote speaker?", opts: [{ key: "A", text: "Dr. Katherine Wong from NUS" }, { key: "B", text: "The port operations manager" }, { key: "C", text: "The conference event coordinator" }, { key: "D", text: "The shipping line CEO" }], a: "A", exp: "'Dr. Katherine Wong, Director of the Centre for Smart Port Innovation at NUS'." },
          { q: "By how much did AI reduce unplanned downtime?", opts: [{ key: "A", text: "35 percent" }, { key: "B", text: "62 percent" }, { key: "C", text: "48 percent" }, { key: "D", text: "78 percent" }], a: "B", exp: "'Reduced unplanned equipment downtime by 62 percent'." },
          { q: "How far in advance can AI predict component failures?", opts: [{ key: "A", text: "12 hours" }, { key: "B", text: "24 hours" }, { key: "C", text: "72 hours" }, { key: "D", text: "48 hours" }], a: "C", exp: "'Predict component failures 72 hours before they occur'." }
        ]
      },
      {
        passage: `[Audio Transcript - Shipping Company Quarterly Results]\nGood afternoon, shareholders and analysts. I'm pleased to report that Pacific Maritime Group achieved record revenues of $2.1 billion in Q3 2026, representing a 19% year-over-year increase. Our fleet utilisation rate reached 94%, the highest in our company's history. The transpacific route contributed 58% of total revenue, while the Asia-Europe corridor accounted for 28%. We have ordered 8 new liquefied natural gas-powered container vessels, with delivery scheduled between 2027 and 2029, as part of our commitment to achieving carbon neutrality by 2040.`,
        questions: [
          { q: "What was Pacific Maritime Group's Q3 revenue?", opts: [{ key: "A", text: "$1.5 billion" }, { key: "B", text: "$1.8 billion" }, { key: "C", text: "$2.8 billion" }, { key: "D", text: "$2.1 billion" }], a: "D", exp: "'Record revenues of $2.1 billion in Q3 2026'." },
          { q: "What percentage of revenue came from the transpacific route?", opts: [{ key: "A", text: "58%" }, { key: "B", text: "28%" }, { key: "C", text: "42%" }, { key: "D", text: "72%" }], a: "A", exp: "'Transpacific route contributed 58% of total revenue'. Bay: A la Asia-Europe." },
          { q: "How many new LNG-powered vessels were ordered?", opts: [{ key: "A", text: "4 vessels" }, { key: "B", text: "8 vessels" }, { key: "C", text: "6 vessels" }, { key: "D", text: "12 vessels" }], a: "B", exp: "'Ordered 8 new liquefied natural gas-powered container vessels'." }
        ]
      },
      {
        passage: `[Audio Transcript - Automated Warehouse Tour Guide]\nWelcome to the Apex Logistics Smart Distribution Centre. This 85,000-square-meter facility processes approximately 45,000 orders daily. The warehouse operates with a fleet of 120 autonomous mobile robots that navigate using LiDAR sensors and can transport loads of up to 500 kilograms each. Human workers focus exclusively on quality control inspections and exception handling. The facility achieved a 99.7% order accuracy rate last quarter, with an average order-to-dispatch time of just 23 minutes. We currently employ 180 full-time staff, compared to the 650 workers a traditional warehouse of this size would require.`,
        questions: [
          { q: "How many orders does the facility process daily?", opts: [{ key: "A", text: "15,000 orders" }, { key: "B", text: "25,000 orders" }, { key: "C", text: "45,000 orders" }, { key: "D", text: "35,000 orders" }], a: "C", exp: "'Approximately 45,000 orders daily'." },
          { q: "What is the order accuracy rate?", opts: [{ key: "A", text: "97.2%" }, { key: "B", text: "98.5%" }, { key: "C", text: "99.3%" }, { key: "D", text: "99.7%" }], a: "D", exp: "'99.7% order accuracy rate last quarter'." },
          { q: "How many full-time staff does the automated facility employ?", opts: [{ key: "A", text: "180 staff" }, { key: "B", text: "120 staff" }, { key: "C", text: "350 staff" }, { key: "D", text: "650 staff" }], a: "A", exp: "'180 full-time staff'. Bay: A la so robot, D la so nhan vien kho truyen thong." }
        ]
      },
      {
        passage: `[Audio Transcript - Port Weather Advisory]\nThis is an urgent weather advisory from the Busan Port Meteorological Service. Typhoon Mawar is currently located 450 kilometres southeast of Jeju Island, moving northwest at 25 kilometres per hour. Wind speeds are expected to reach 130 kilometres per hour by tomorrow morning. All vessel movements in and out of Busan New Port will be suspended from midnight tonight until further notice. Terminal operators should secure all loose container stacking equipment and ensure all gantry cranes are lowered to storm-safe position. Essential personnel only should remain on site during the typhoon warning period.`,
        questions: [
          { q: "How fast is Typhoon Mawar moving?", opts: [{ key: "A", text: "15 km/h" }, { key: "B", text: "25 km/h" }, { key: "C", text: "35 km/h" }, { key: "D", text: "45 km/h" }], a: "B", exp: "'Moving northwest at 25 kilometres per hour'." },
          { q: "When will vessel movements be suspended?", opts: [{ key: "A", text: "From 6 PM tonight" }, { key: "B", text: "From 6 AM tomorrow" }, { key: "C", text: "From midnight tonight" }, { key: "D", text: "From noon tomorrow" }], a: "C", exp: "'Suspended from midnight tonight until further notice'." }
        ]
      }
    ];

    let p4Num = 37;
    part4Talks.forEach(talk => {
      talk.questions.forEach(item => {
        qs.push({ id: `tlsc1_q${p4Num}`, partNumber: 4, partTitle: "Listening Part 4: Short Talks", section: "LISTENING", passageText: talk.passage, questionText: `Question ${p4Num}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
        p4Num++;
      });
    });

    // =========================================================================
    // SPEAKING (11 Questions: Q51-Q61)
    // =========================================================================
    const speakingItems = [
      { id: "tlsc1_q51", title: "Read Text Aloud (Port Customs Guidance)", prompt: "Read the following text aloud clearly and naturally:\n\n'All incoming commercial freight vessels must submit electronic cargo manifests seventy-two hours prior to entering the maritime exclusion zone. Unmanifested hazardous chemicals and radioactive materials are strictly prohibited from discharge at any terminal berth.'", time: 45, prep: 45, exp: "Phat am: 'manifests' /'maenI.fests/, 'hazardous' /'haez.@r.d@s/, 'radioactive' /reI.di.@U'aek.tIv/." },
      { id: "tlsc1_q52", title: "Read Text Aloud (Logistics Expansion)", prompt: "Read the following text aloud clearly and naturally:\n\n'Apex Global Freight is expanding its temperature-controlled cold chain network across twelve major Asian transshipment hubs, guaranteeing continuous end-to-end temperature telemetry and compliance with pharmaceutical Good Distribution Practice standards.'", time: 45, prep: 45, exp: "Phat am: 'transshipment' /traens'SIp.m@nt/, 'telemetry' /t@'lem.@.tri/, 'pharmaceutical' /fa:r.m@'su:.tI.k@l/." },
      { id: "tlsc1_q53", title: "Describe Picture (Container Terminal)", prompt: "Describe the photograph in detail. You should describe the people, objects, setting, and any activities shown.\n\n[Image: A busy container terminal at sunset with multiple gantry cranes loading containers onto a large cargo vessel. Several trucks are lined up waiting to transport containers, and a control tower is visible in the background.]", time: 30, prep: 45, exp: "Mo ta: Chu the (gantry cranes, cargo vessel), Hanh dong (loading containers), Boi canh (terminal at sunset), Chi tiet (trucks lined up, control tower)." },
      { id: "tlsc1_q54", title: "Describe Picture (Operations Control Room)", prompt: "Describe the photograph in detail. You should describe the people, objects, setting, and any activities shown.\n\n[Image: Inside a modern port operations control room. Three operators wearing headsets are seated at workstations with multiple monitors displaying real-time vessel tracking maps, container yard layouts, and weather radar systems.]", time: 30, prep: 45, exp: "Mo ta: Nhan vat (3 operators, headsets), Thiet bi (monitors, tracking maps), Hoat dong (monitoring operations), Boi canh (modern control room)." },
      { id: "tlsc1_q55", title: "Respond to Questions (Freight Tracking)", prompt: "Listen to the question and respond:\n\n'How do you usually track your online shipments, and how often do you check the tracking status?'", time: 15, prep: 3, exp: "Tra loi ca nhan ve cach theo doi hang online (app, email notifications, frequency)." },
      { id: "tlsc1_q56", title: "Respond to Questions (Packaging Materials)", prompt: "Listen to the question and respond:\n\n'What packaging material do you think is most reliable for shipping fragile items internationally, and why?'", time: 15, prep: 3, exp: "Goi y: bubble wrap, foam inserts, double-walled corrugated boxes, custom moulded inserts." },
      { id: "tlsc1_q57", title: "Respond to Questions (Express vs Standard)", prompt: "Listen to the question and respond:\n\n'Do you prefer paying extra for same-day or next-day express delivery, or waiting for standard free shipping? Please explain your preference.'", time: 30, prep: 3, exp: "Tra loi ro quan diem + ly do cu the (urgency, cost, reliability)." },
      { id: "tlsc1_q58", title: "Schedule Query (Keynote Time)", prompt: "Using the conference schedule below, answer the caller's question.\n\nASIA-PACIFIC SUPPLY CHAIN CONFERENCE — November 20, 2026\n8:00 AM — Registration & Networking Breakfast\n9:00 AM — Opening Ceremony\n9:30 AM — Keynote: 'AI-Driven Smart Port Revolution' by Dr. Katherine Wong\n10:45 AM — Coffee Break\n11:15 AM — Panel: Autonomous Vessel Navigation\n12:30 PM — Networking Lunch\n2:00 PM — Workshop: Cold Chain Logistics Technology\n3:30 PM — Workshop: Customs Digitalisation & Single Window Systems\n5:00 PM — Closing Remarks\n\nCaller: 'What time does the keynote presentation begin, and who is the speaker?'", time: 15, prep: 3, exp: "'The keynote begins at 9:30 AM. The speaker is Dr. Katherine Wong, presenting on AI-Driven Smart Port Revolution'." },
      { id: "tlsc1_q59", title: "Schedule Query (Workshop Fee)", prompt: "Using the registration information below, answer the caller's question.\n\nAll registered conference delegates receive complimentary access to all keynote sessions, panel discussions, and workshops. The only sessions requiring additional registration are the post-conference masterclass on November 21 (additional SGD 350) and the private port facility tour (additional SGD 120).\n\nCaller: 'Is the warehouse automation workshop free for general attendees?'", time: 15, prep: 3, exp: "'Yes, all workshops are included in the standard conference registration at no additional cost. Only the post-conference masterclass and port tour require separate fees'." },
      { id: "tlsc1_q60", title: "Schedule Query (Afternoon Sessions)", prompt: "Using the conference schedule, list all sessions scheduled for the afternoon.\n\nAfternoon Schedule:\n2:00 PM — Workshop: Cold Chain Logistics Technology (Room A)\n2:00 PM — Workshop: Maritime Cybersecurity (Room B)\n3:30 PM — Workshop: Customs Digitalisation & Single Window Systems (Room A)\n3:30 PM — Breakout: Green Shipping Corridor Initiatives (Room B)\n5:00 PM — Closing Remarks & Networking Reception (Grand Ballroom)\n\nCaller: 'Could you list all the sessions scheduled for the afternoon?'", time: 30, prep: 3, exp: "Liet ke 5 su kien buoi chieu theo thu tu thoi gian va phong." },
      { id: "tlsc1_q61", title: "Express an Opinion (Full Port Automation)", prompt: "Do you agree or disagree with the following statement?\n\n'Fully autonomous robotic container ports, with minimal human workers, are essential for the future of global maritime trade.'\n\nSupport your opinion with specific reasons and examples. You have 60 seconds to speak.", time: 60, prep: 45, exp: "Framework: Quan diem -> 2 ly do (efficiency gains, safety improvements) -> Vi du (Rotterdam's Maasvlakte 2, Shanghai Yangshan Phase 4) -> Phan bac va ket luan.\n\nMau: 'I strongly agree that autonomous ports are essential. First, automation dramatically increases throughput — Shanghai's fully automated Yangshan Phase 4 terminal handles 6.3 million TEUs annually with 70% fewer workers. Second, robotic operations eliminate workplace injuries from crane operations and heavy machinery...'" }
    ];

    speakingItems.forEach((spItem, idx) => {
      qs.push({
        id: spItem.id,
        partNumber: 5,
        partTitle: `TOEIC Speaking: ${spItem.title}`,
        section: "SPEAKING",
        speakingPrompt: spItem.prompt,
        preparationTimeSeconds: spItem.prep,
        speakingTimeSeconds: spItem.time,
        questionText: `Question ${51 + idx}: ${spItem.title}`,
        options: [
            { key: "A", text: "Record Speech Response" },
            { key: "B", text: "Check Pronunciation Guide" },
            { key: "C", text: "Listen to Model Audio" }
          ],
        correctAnswer: "A",
        explanation: spItem.exp
      });
    });

    return qs;
  })()
};
