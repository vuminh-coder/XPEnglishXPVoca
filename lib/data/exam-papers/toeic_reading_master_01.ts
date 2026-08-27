import { ExamPaper, ExamQuestion } from "./types";

export const toeicReadingMaster01Paper: ExamPaper = {
  id: "toeic_reading_master_01",
  title: "TOEIC Reading Master 100 #01 (100 Questions)",
  type: "TOEIC_LR",
  level: "Advanced",
  timeLimitMinutes: 75,
  totalQuestions: 100,
  maxScore: 495,
  description: "Trọn bộ 100 câu hỏi luyện tốc độ chuyên sâu Kỹ năng Đọc (Reading Master): Parts 5-7 chuẩn ETS TOEIC 2026 bao quát ngữ pháp mệnh đề quan hệ rút gọn, nâng cấp hạ tầng đám mây, hợp đồng vi mạch bán dẫn và đấu thầu quang điện mặt trời Nevada 52,5 triệu USD.",
  categoryBadge: "TOEIC Reading",
  tags: ["TOEIC", "Reading Only", "100 Questions", "ETS 2026", "Master Series"],
  supportedSkills: ["READING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
    // PART 5: INCOMPLETE SENTENCES (Q101 - Q130: 30 Questions)
    // =========================================================================
    const part5Items = [
      {
        q: "The senior vice president praised the procurement division for _______ negotiating favorable pricing on enterprise software licenses.",
        opts: [{ key: "A", text: "skillfully" }, { key: "B", text: "skillful" }, { key: "C", text: "skill" }, { key: "D", text: "skills" }], a: "A",
        exp: "Cần trạng từ `skillfully` để bổ nghĩa cho động từ phân từ `negotiating`."
      },
      {
        q: "All overseas travel expense reimbursement requests must be submitted _______ fifteen business days of trip completion.",
        opts: [{ key: "A", text: "between" }, { key: "B", text: "within" }, { key: "C", text: "among" }, { key: "D", text: "along" }], a: "B",
        exp: "Dùng giới từ `within` chỉ khoảng thời gian cho phép ('trong vòng 15 ngày làm việc')."
      },
      {
        q: "The new automated warehouse robotics system has demonstrated _______ improvements in fulfillment processing speed.",
        opts: [{ key: "A", text: "substance" }, { key: "B", text: "substantially" }, { key: "C", text: "substantial" }, { key: "D", text: "substantiate" }], a: "C",
        exp: "Cần tính từ `substantial` (đáng kể) để bổ nghĩa cho danh từ `improvements`."
      },
      {
        q: "Neither the regional logistics coordinator _______ the warehouse operations manager anticipated the seasonal inventory surge.",
        opts: [{ key: "A", text: "or" }, { key: "B", text: "and" }, { key: "C", text: "but" }, { key: "D", text: "nor" }], a: "D",
        exp: "Cặp liên từ tương hỗ cố định: `Neither... nor...`."
      },
      {
        q: "The board of directors voted unanimously to approve the proposed corporate _______ with Apex Biotech.",
        opts: [{ key: "A", text: "merger" }, { key: "B", text: "merge" }, { key: "C", text: "merged" }, { key: "D", text: "merging" }], a: "A",
        exp: "Cần danh từ `merger` (sự sáp nhập doanh nghiệp) sau tính từ `corporate`."
      },
      {
        q: "_______ the global supply chain disruptions, our manufacturing facility maintained continuous operations without downtime.",
        opts: [{ key: "A", text: "Although" }, { key: "B", text: "Despite" }, { key: "C", text: "Whereas" }, { key: "D", text: "Since" }], a: "B",
        exp: "Dùng `Despite` đứng trước cụm danh từ (`the global supply chain disruptions`)."
      },
      {
        q: "The revised employee code of conduct emphasizes strict compliance _______ international environmental regulations.",
        opts: [{ key: "A", text: "to" }, { key: "B", text: "for" }, { key: "C", text: "with" }, { key: "D", text: "at" }], a: "C",
        exp: "Cụm danh từ cố định: `compliance with` (sự tuân thủ theo quy định)."
      },
      {
        q: "The marketing department's newly designed promotional campaign was _______ successful in expanding brand awareness among Gen-Z consumers.",
        opts: [{ key: "A", text: "exception" }, { key: "B", text: "exceptional" }, { key: "C", text: "except" }, { key: "D", text: "exceptionally" }], a: "D",
        exp: "Cần trạng từ `exceptionally` để bổ nghĩa cho tính từ `successful`."
      },
      {
        q: "Prospective candidates for the senior software architect position must possess at least seven years of _______ industry experience.",
        opts: [{ key: "A", text: "relevant" }, { key: "B", text: "relevance" }, { key: "C", text: "relevantly" }, { key: "D", text: "relate" }], a: "A",
        exp: "Cần tính từ `relevant` (liên quan, thích hợp) để bổ nghĩa cho `industry experience`."
      },
      {
        q: "The finance director requested that all department supervisors review _______ annual operational expenditure estimates before Friday.",
        opts: [{ key: "A", text: "they" }, { key: "B", text: "their" }, { key: "C", text: "them" }, { key: "D", text: "themselves" }], a: "B",
        exp: "Cần tính từ sở hữu `their` đứng trước cụm danh từ `annual operational expenditure estimates`."
      },
      {
        q: "Due to unforeseen foundation challenges, construction of the semiconductor fabrication plant will be delayed _______ two weeks.",
        opts: [{ key: "A", text: "on" }, { key: "B", text: "at" }, { key: "C", text: "by" }, { key: "D", text: "in" }], a: "C",
        exp: "Giới từ chỉ mức độ chênh lệch/thời gian chậm trễ: `delayed by two weeks` (chậm 2 tuần)."
      },
      {
        q: "The chief information security officer insisted on _______ two-factor biometric authentication across all corporate workstations.",
        opts: [{ key: "A", text: "implement" }, { key: "B", text: "implemented" }, { key: "C", text: "implementation" }, { key: "D", text: "implementing" }], a: "D",
        exp: "Sau giới từ `on` cần danh động từ `implementing`."
      },
      {
        q: "The technical documentation provided by the equipment manufacturer was remarkably clear and _______ organized.",
        opts: [{ key: "A", text: "logically" }, { key: "B", text: "logic" }, { key: "C", text: "logical" }, { key: "D", text: "logician" }], a: "A",
        exp: "Cần trạng từ `logically` để bổ nghĩa cho tính từ/phân từ `organized`."
      },
      {
        q: "Employees who demonstrate outstanding innovation in sustainable design will be _______ with annual corporate excellence awards.",
        opts: [{ key: "A", text: "honor" }, { key: "B", text: "honored" }, { key: "C", text: "honoring" }, { key: "D", text: "honorable" }], a: "B",
        exp: "Cấu trúc bị động tương lai: `will be honored with` (sẽ được vinh danh bằng)."
      },
      {
        q: "The client requested several critical modifications to the contract before _______ agreeing to sign the five-year service agreement.",
        opts: [{ key: "A", text: "final" }, { key: "B", text: "finalize" }, { key: "C", text: "finally" }, { key: "D", text: "finality" }], a: "C",
        exp: "Cần trạng từ `finally` để bổ nghĩa cho danh động từ `agreeing`."
      },
      {
        q: "Our international sales revenue expanded _______ during the third quarter, surpassing executive market projections.",
        opts: [{ key: "A", text: "significance" }, { key: "B", text: "significant" }, { key: "C", text: "signify" }, { key: "D", text: "significantly" }], a: "D",
        exp: "Cần trạng từ `significantly` để bổ nghĩa cho động từ `expanded`."
      },
      {
        q: "The newly hired biomedical engineer is responsible for _______ calibration routines on all mass spectrometers in Lab 3.",
        opts: [{ key: "A", text: "overseeing" }, { key: "B", text: "oversee" }, { key: "C", text: "overseen" }, { key: "D", text: "oversight" }], a: "A",
        exp: "Cấu trúc `responsible for + V_ing` -> cần danh động từ `overseeing`."
      },
      {
        q: "_______ the CEO completed her keynote address, she invited questions from institutional investors and financial journalists.",
        opts: [{ key: "A", text: "During" }, { key: "B", text: "Once" }, { key: "C", text: "Between" }, { key: "D", text: "Despite" }], a: "B",
        exp: "Liên từ thời gian `Once + clause` (Một khi / Ngay sau khi CEO hoàn tất bài phát biểu)."
      },
      {
        q: "The architectural engineering team submitted three alternative floor plans for the executive committee's _______ .",
        opts: [{ key: "A", text: "consider" }, { key: "B", text: "considered" }, { key: "C", text: "consideration" }, { key: "D", text: "considerable" }], a: "C",
        exp: "Sau sở hữu cách (`committee's`) cần danh từ `consideration` (sự xem xét, cân nhắc)."
      },
      {
        q: "The automated optical inspection cameras can detect microscopic surface defects _______ than conventional manual human inspection.",
        opts: [{ key: "A", text: "more reliable" }, { key: "B", text: "most reliably" }, { key: "C", text: "reliability" }, { key: "D", text: "more reliably" }], a: "D",
        exp: "So sánh hơn của trạng từ bổ nghĩa cho `detect`: `more reliably than` (một cách đáng tin cậy hơn)."
      },
      {
        q: "All hazardous materials stored inside the chemical warehouse must be _______ labeled in accordance with OSHA safety protocols.",
        opts: [{ key: "A", text: "properly" }, { key: "B", text: "proper" }, { key: "C", text: "propriety" }, { key: "D", text: "properness" }], a: "A",
        exp: "Cần trạng từ `properly` để bổ nghĩa cho phân từ `labeled`."
      },
      {
        q: "The executive steering committee has proposed a _______ restructuring of the European distribution supply chain.",
        opts: [{ key: "A", text: "majority" }, { key: "B", text: "major" }, { key: "C", text: "majorly" }, { key: "D", text: "majoring" }], a: "B",
        exp: "Cần tính từ `major` (lớn, trọng đại) bổ nghĩa cho danh từ `restructuring`."
      },
      {
        q: "To maintain ISO 9001 certification, our quality assurance protocols are audited _______ by an accredited independent agency.",
        opts: [{ key: "A", text: "annual" }, { key: "B", text: "annualize" }, { key: "C", text: "annually" }, { key: "D", text: "annuity" }], a: "C",
        exp: "Cần trạng từ `annually` (hàng năm) để bổ nghĩa cho động từ bị động `are audited`."
      },
      {
        q: "The airline announced that passengers traveling with electronic boarding passes may proceed _______ to the security checkpoint.",
        opts: [{ key: "A", text: "direct" }, { key: "B", text: "direction" }, { key: "C", text: "director" }, { key: "D", text: "directly" }], a: "D",
        exp: "Cần trạng từ `directly` (trực tiếp) bổ nghĩa cho động từ `proceed`."
      },
      {
        q: "The newly developed AI diagnostic software demonstrated an accuracy rate _______ superior to existing commercial tools.",
        opts: [{ key: "A", text: "far" }, { key: "B", text: "very" }, { key: "C", text: "more" }, { key: "D", text: "too" }], a: "A",
        exp: "`Far superior to` (vượt trội hơn rất nhiều so với) - `far` dùng để nhấn mạnh tính từ so sánh hơn/tính từ tuyệt đối như `superior`."
      },
      {
        q: "Neither the design blueprints _______ the structural calculations revealed any seismic vulnerabilities in the proposed tower.",
        opts: [{ key: "A", text: "or" }, { key: "B", text: "nor" }, { key: "C", text: "and" }, { key: "D", text: "also" }], a: "B",
        exp: "Cặp liên từ `Neither... nor...`."
      },
      {
        q: "The human resources manager conducted exit interviews to understand the reasons _______ recent employee turnover in engineering.",
        opts: [{ key: "A", text: "among" }, { key: "B", text: "between" }, { key: "C", text: "behind" }, { key: "D", text: "across" }], a: "C",
        exp: "Cụm danh từ: `reasons behind` (những lý do đằng sau việc nghỉ việc gần đây)."
      },
      {
        q: "The corporate legal department advised against _______ into any binding agreements prior to independent patent validation.",
        opts: [{ key: "A", text: "enter" }, { key: "B", text: "entered" }, { key: "C", text: "entry" }, { key: "D", text: "entering" }], a: "D",
        exp: "Cấu trúc `advise against + V_ing` -> cần danh động từ `entering` (`entering into agreements`)."
      },
      {
        q: "The maintenance crew worked _______ through the night to restore electrical power to the automated cleanroom lines.",
        opts: [{ key: "A", text: "tirelessly" }, { key: "B", text: "tireless" }, { key: "C", text: "tiredness" }, { key: "D", text: "tire" }], a: "A",
        exp: "Cần trạng từ `tirelessly` (không biết mệt mỏi) để bổ nghĩa cho động từ `worked`."
      },
      {
        q: "The municipal utility authority offered tax credits to commercial enterprises that _______ their carbon emissions by twenty percent.",
        opts: [{ key: "A", text: "reducing" }, { key: "B", text: "reduced" }, { key: "C", text: "reduction" }, { key: "D", text: "reductive" }], a: "B",
        exp: "Trong mệnh đề quan hệ `that`, cần động từ ở thì quá khứ đơn `reduced` hòa hợp thì với mệnh đề chính `offered`."
      }
    ];

    part5Items.forEach((item, idx) => {
      qs.push({
        id: `trm1_q${idx + 101}`,
        partNumber: 5,
        partTitle: "Reading Part 5: Incomplete Sentences",
        section: "READING",
        questionText: `Question ${idx + 101}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // PART 6: TEXT COMPLETION (Q131 - Q146: 16 Questions, 4 Passages)
    // =========================================================================
    const part6Sets = [
      {
        title: "Passage 1: Notice of Cloud Infrastructure Upgrade",
        passage: `INTERNAL MEMORANDUM\nTO: All Regional Offices\nFROM: Network Engineering Team\nDATE: November 4, 2026\n\nPlease be advised that our primary cloud server infrastructure will undergo scheduled maintenance this Sunday. This upgrade will _______ (Q131) network bandwidth and reduce latency during peak database query cycles. _______ (Q132). Employees are urged to save all active work on the central cloud repository before 10:00 PM on Saturday. If you experience any persistent connection difficulties after 6:00 AM on Monday, please notify the IT support desk _______ (Q133). We appreciate your patience as we enhance our technological _______ (Q134).`,
        questions: [
          {
            q: "Select the best word for blank (Q131).",
            opts: [{ key: "A", text: "expanded" }, { key: "B", text: "expanding" }, { key: "C", text: "expand" }, { key: "D", text: "expansion" }], a: "C",
            exp: "Sau trợ động từ `will` cần động từ nguyên mẫu `expand` (mở rộng băng thông)."
          },
          {
            q: "Select the sentence that best fits blank (Q132).",
            opts: [{ key: "A", text: "Complimentary lunch will be served in the cafeteria on Friday." }, { key: "B", text: "The visitor parking lot will be repaved next spring." }, { key: "C", text: "Please turn off your personal desk lamps when departing." }, { key: "D", text: "Network services will be temporarily suspended for four hours during the migration." }], a: "D",
            exp: "Câu nối logic thông báo gián đoạn dịch vụ mạng 4 giờ trong quá trình bảo trì."
          },
          {
            q: "Select the best word for blank (Q133).",
            opts: [{ key: "A", text: "immediately" }, { key: "B", text: "immediate" }, { key: "C", text: "immediacy" }, { key: "D", text: "immediateness" }], a: "A",
            exp: "Cần trạng từ `immediately` (ngay lập tức) bổ nghĩa cho động từ `notify`."
          },
          {
            q: "Select the best word for blank (Q134).",
            opts: [{ key: "A", text: "furnishing" }, { key: "B", text: "infrastructure" }, { key: "C", text: "landscaping" }, { key: "D", text: "culinary" }], a: "B",
            exp: "`Technological infrastructure` (cơ sở hạ tầng công nghệ) là thuật ngữ chuẩn."
          }
        ]
      },
      {
        title: "Passage 2: Corporate Travel & Expense Reminder",
        passage: `FINANCE DEPARTMENT ADVISORY\nTO: Regional Sales Directors\nFROM: Corporate Accounts Payable\nDATE: November 8, 2026\n\nThis is a formal reminder regarding fourth-quarter expense reconciliation procedures. All corporate travel expense claims incurred during October must be _______ (Q135) through the Concur digital portal no later than November 20. Expense reports submitted without itemized digital receipts will be _______ (Q136) back to the employee for correction. _______ (Q137). Timely submission allows our accounting division to close annual ledgers _______ (Q138) and ensure prompt reimbursement direct deposits.`,
        questions: [
          {
            q: "Select the best word for blank (Q135).",
            opts: [{ key: "A", text: "submitting" }, { key: "B", text: "submission" }, { key: "C", text: "submitted" }, { key: "D", text: "submit" }], a: "C",
            exp: "Cấu trúc bị động `must be submitted` (phải được nộp)."
          },
          {
            q: "Select the best word for blank (Q136).",
            opts: [{ key: "A", text: "routing" }, { key: "B", text: "route" }, { key: "C", text: "routes" }, { key: "D", text: "routed" }], a: "D",
            exp: "Cấu trúc bị động `will be routed back` (sẽ được chuyển trả lại)."
          },
          {
            q: "Select the sentence that best fits blank (Q137).",
            opts: [{ key: "A", text: "Managerial pre-approval is strictly required for any expenditures exceeding $500." }, { key: "B", text: "Office supplies can be ordered from the central stationery closet." }, { key: "C", text: "The annual holiday party will take place at the Grand Ballroom." }, { key: "D", text: "All conference rooms must be reserved two weeks in advance." }], a: "A",
            exp: "Câu bổ trợ quy chế tài chính: yêu cầu phê duyệt trước của cấp quản lý cho chi phí trên $500."
          },
          {
            q: "Select the best word for blank (Q138).",
            opts: [{ key: "A", text: "accurate" }, { key: "B", text: "accurately" }, { key: "C", text: "accuracy" }, { key: "D", text: "accurateness" }], a: "B",
            exp: "Cần trạng từ `accurately` (một cách chính xác) bổ nghĩa cho động từ `close`."
          }
        ]
      },
      {
        title: "Passage 3: Automated Robotics Assembly Announcement",
        passage: `PLANT OPERATIONS UPDATE\nAUSTIN, TX — Factory Line 4 Modernization\n\nApex Advanced Robotics has completed the deployment of fifteen automated collaborative robotic arms on Chassis Assembly Line 4. These high-precision units _______ (Q139) equipped with optical laser alignment sensors capable of sub-millimeter positioning accuracy. The installation is expected to _______ (Q140) manufacturing cycle times by twenty-eight percent. _______ (Q141). Shift technicians have undergone comprehensive safety training and will begin supervising live production runs _______ (Q142) starting Monday morning.`,
        questions: [
          {
            q: "Select the best word for blank (Q139).",
            opts: [{ key: "A", text: "is" }, { key: "B", text: "was" }, { key: "C", text: "are" }, { key: "D", text: "been" }], a: "C",
            exp: "Chủ ngữ số nhiều `These high-precision units` -> dùng động từ to be `are`."
          },
          {
            q: "Select the best word for blank (Q140).",
            opts: [{ key: "A", text: "reduction" }, { key: "B", text: "reductive" }, { key: "C", text: "reduced" }, { key: "D", text: "reduce" }], a: "D",
            exp: "Sau `expected to` cần động từ nguyên mẫu `reduce` (giảm thời gian chu kỳ)."
          },
          {
            q: "Select the sentence that best fits blank (Q141).",
            opts: [{ key: "A", text: "This technology eliminates repetitive strain injuries among manual assembly workers." }, { key: "B", text: "The cafeteria menu will feature vegetarian options this week." }, { key: "C", text: "Parking permits must be renewed with human resources." }, { key: "D", text: "Rain coats are required during outdoor equipment delivery." }], a: "A",
            exp: "Câu bổ nghĩa cho lợi ích robot: loại bỏ chấn thương lặp lại ở công nhân thủ công."
          },
          {
            q: "Select the best word for blank (Q142).",
            opts: [{ key: "A", text: "prompt" }, { key: "B", text: "promptly" }, { key: "C", text: "promptness" }, { key: "D", text: "prompting" }], a: "B",
            exp: "Trạng từ `promptly` (đúng giờ, kịp thời) bổ nghĩa cho hành động bắt đầu."
          }
        ]
      },
      {
        title: "Passage 4: Corporate Employee Wellness Program Notice",
        passage: `HUMAN RESOURCES BULLETIN\nTO: All Full-Time Personnel\nFROM: Director of Employee Well-being\nDATE: November 12, 2026\n\nWe are delighted to announce our enhanced Corporate Wellness and Health Promotion Initiative, which takes effect on January 1. Under the new benefit framework, employees can access subsidized gym memberships and participate in weekly _______ (Q143) mindfulness workshops. In addition, our health plan will cover full annual preventive wellness screenings _______ (Q144) zero deductible. _______ (Q145). Please visit the wellness portal on the company intranet to complete your confidential health assessment and claim your initial wellness _______ (Q146).`,
        questions: [
          {
            q: "Select the best word for blank (Q143).",
            opts: [{ key: "A", text: "guide" }, { key: "B", text: "guidance" }, { key: "C", text: "guided" }, { key: "D", text: "guidingly" }], a: "C",
            exp: "`Guided mindfulness workshops` (các hội thảo chánh niệm có người hướng dẫn) - tính từ phân từ `guided`."
          },
          {
            q: "Select the best preposition for blank (Q144).",
            opts: [{ key: "A", text: "with" }, { key: "B", text: "for" }, { key: "C", text: "in" }, { key: "D", text: "at" }], a: "D",
            exp: "Cụm từ chỉ chi phí: `at zero deductible` (với mức khấu trừ bằng không)."
          },
          {
            q: "Select the sentence that best fits blank (Q145).",
            opts: [{ key: "A", text: "Healthy lifestyle incentive vouchers will be awarded upon completion of annual screenings." }, { key: "B", text: "Office printers must be turned off at the end of each workday." }, { key: "C", text: "The executive boardroom will be painted light blue." }, { key: "D", text: "Overtime hours must be approved by the department head." }], a: "A",
            exp: "Câu bổ trợ về phúc lợi sức khỏe: phiếu quà tặng khích lệ lối sống lành mạnh."
          },
          {
            q: "Select the best word for blank (Q146).",
            opts: [{ key: "A", text: "stipulate" }, { key: "B", text: "stipend" }, { key: "C", text: "stipulation" }, { key: "D", text: "stipulative" }], a: "B",
            exp: "`Wellness stipend` (khoản trợ cấp chăm sóc sức khỏe) là danh từ chính xác."
          }
        ]
      }
    ];

    let p6Num = 131;
    part6Sets.forEach((set) => {
      set.questions.forEach((item) => {
        qs.push({
          id: `trm1_q${p6Num}`,
          partNumber: 6,
          partTitle: "Reading Part 6: Text Completion",
          section: "READING",
          passageText: set.passage,
          questionText: item.q,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
        p6Num++;
      });
    });

    // =========================================================================
    // PART 7: READING COMPREHENSION (Q147 - Q200: 54 Questions)
    // =========================================================================
    const part7Passages = [
      {
        type: "Single Passage (Freight Invoice)",
        passage: `HAMBURG MARITIME FREIGHT INVOICE\n\nInvoice Number: HMF-2026-9901\nCarrier: Elbe Container Express Lines\nPort of Origin: Port of Hamburg, Germany\nPort of Destination: Port of Singapore\nDeparture Date: October 28, 2026 | Estimated Arrival: November 18, 2026\n\nConsignee: Singapore Advanced Robotics Pte Ltd., Jurong Industrial Park\nShipper: Precision Industrial Hydraulics GmbH, Stuttgart, Germany\n\nCargo Summary:\n• 4x 40ft High-Cube Shipping Containers\n• Contents: High-Pressure Servo-Hydraulic Actuators & Robotic Power Units\n• Total Gross Weight: 48,600 kg\n• Insured Transit Value: €2,400,000\n• Customs Status: Pre-cleared under EU-Singapore Free Trade Agreement (EUSFTA).\n\nPayment Terms: Net 30 days via SWIFT wire transfer to Deutsche Bank Frankfurt.`,
        questions: [
          {
            q: "What is the port of destination for the cargo shipment?",
            opts: [{ key: "A", text: "Port of Hamburg" }, { key: "B", text: "Port of Tokyo" }, { key: "C", text: "Port of Singapore" }, { key: "D", text: "Port of Sydney" }], a: "C",
            exp: "Cảng đích: 'Port of Destination: Port of Singapore'."
          },
          {
            q: "What is the insured transit value of the shipment?",
            opts: [{ key: "A", text: "€500,000" }, { key: "B", text: "€10,000,000" }, { key: "C", text: "€100,000" }, { key: "D", text: "€2,400,000" }], a: "D",
            exp: "Giá trị bảo hiểm: 'Insured Transit Value: €2,400,000'."
          },
          {
            q: "Under which trade agreement was the cargo pre-cleared for customs?",
            opts: [{ key: "A", text: "EU-Singapore Free Trade Agreement (EUSFTA)" }, { key: "B", text: "NAFTA" }, { key: "C", text: "ASEAN only" }, { key: "D", text: "WTO generic" }], a: "A",
            exp: "Hiệp định hải quan: 'Pre-cleared under EU-Singapore Free Trade Agreement (EUSFTA)'."
          }
        ]
      },
      {
        type: "Single Passage (Executive Memorandum on Cybersecurity)",
        passage: `INTERNAL SECURITY MEMORANDUM\nTO: All Global Tech Personnel\nFROM: Chief Information Security Officer (CISO)\nDATE: November 5, 2026\nSUBJECT: Mandatory Password Policy Update & Multi-Factor Authentication\n\nIn response to escalating global ransomware threats against high-technology enterprises, GlobalTech is enforcing an updated corporate authentication standard across all regional campuses, effective December 1, 2026.\n\nMandatory Actions:\n1. Password Complexity: All network account passwords must be at least 16 characters in length and contain a combination of uppercase letters, lowercase letters, numbers, and non-alphanumeric special symbols.\n2. Hardware Security Keys: Employees must utilize their company-issued FIDO2 cryptographic hardware security keys for all VPN and cloud repository logins.\n3. Mobile Passcodes: SMS text message verification codes will no longer be supported after November 30 due to SIM-swapping vulnerabilities.\n\nFailure to register your hardware key before the December 1 deadline will result in automated account suspension. For technical enrollment assistance, contact the Security Operations Center at extension 4400.`,
        questions: [
          {
            q: "What is the primary purpose of the memorandum?",
            opts: [{ key: "A", text: "To announce new workplace furniture" }, { key: "B", text: "To enforce updated password complexity and hardware key authentication policies" }, { key: "C", text: "To schedule the annual holiday banquet" }, { key: "D", text: "To recruit software developers" }], a: "B",
            exp: "Mục đích chính: thực thi chính sách mật khẩu phức tạp và khóa xác thực phần cứng FIDO2."
          },
          {
            q: "What is the minimum required character length for network passwords?",
            opts: [{ key: "A", text: "8 characters" }, { key: "B", text: "12 characters" }, { key: "C", text: "16 characters" }, { key: "D", text: "20 characters" }], a: "C",
            exp: "Độ dài mật khẩu tối thiểu: 'at least 16 characters in length'."
          },
          {
            q: "Why is SMS text message verification being discontinued?",
            opts: [{ key: "A", text: "It is too expensive" }, { key: "B", text: "Cell phone towers are shutting down" }, { key: "C", text: "Employees refused to use mobile phones" }, { key: "D", text: "Due to SIM-swapping security vulnerabilities" }], a: "D",
            exp: "Lý do ngừng SMS: 'due to SIM-swapping vulnerabilities'."
          },
          {
            q: "What will happen if an employee does not register their hardware key by December 1?",
            opts: [{ key: "A", text: "Their network account will be automatically suspended" }, { key: "B", text: "They will receive a cash bonus" }, { key: "C", text: "They must work from home indefinitely" }, { key: "D", text: "They will be assigned a new desk" }], a: "A",
            exp: "Hậu quả không đăng ký: 'will result in automated account suspension'."
          }
        ]
      },
      {
        type: "Double Passage (Job Advert & Applicant Email)",
        passage: `[DOCUMENT 1: JOB ADVERTISEMENT]\nPosition: Senior Bioprocess Engineer\nCompany: BioThera Pharma Solutions (Zurich, Switzerland)\nDepartment: Sterile Biomanufacturing & Fermentation\n\nKey Responsibilities:\n- Lead scale-up optimization for monoclonal antibody cell culture bioreactors (up to 5,000L capacity)\n- Implement statistical process control (SPC) and real-time Raman spectroscopy telemetry\n- Author regulatory validation documentation for EMA and FDA filing dossiers\n- Minimum requirements: Master's or Ph.D. in Biochemical Engineering and 6+ years of GMP biomanufacturing experience\n- Contact: hr-recruiting@biothera.ch | Application Deadline: November 25, 2026\n\n[DOCUMENT 2: APPLICANT COVER EMAIL]\nTo: hr-recruiting@biothera.ch\nFrom: elena.rossi@bioengineering.it\nDate: November 15, 2026\nSubject: Application for Senior Bioprocess Engineer Position — Dr. Elena Rossi\n\nDear Hiring Committee,\n\nI am writing to express my enthusiastic interest in the Senior Bioprocess Engineer position at BioThera Pharma Solutions. I hold a Ph.D. in Biochemical Engineering from ETH Zurich and possess eight years of industrial experience leading cell culture process development at a major Italian biopharmaceutical facility.\n\nIn my current role, I successfully scaled our lead oncology therapeutic from 200L pilot scale to 4,000L commercial production while integrating in-line Raman spectroscopy analytics to maintain optimal glucose feeding profiles. Furthermore, I have authored three FDA regulatory dossiers that secured approval without inspection citations.\n\nI look forward to discussing how my bioprocessing background aligns with BioThera's clinical expansion.\n\nSincerely,\nDr. Elena Rossi`,
        questions: [
          {
            q: "What capacity bioreactors will the Senior Bioprocess Engineer manage at BioThera?",
            opts: [{ key: "A", text: "Up to 500 liters" }, { key: "B", text: "Up to 5,000 liters" }, { key: "C", text: "10,000 liters" }, { key: "D", text: "50,000 liters" }], a: "B",
            exp: "Dung tích bể sinh học: 'bioreactors (up to 5,000L capacity)'."
          },
          {
            q: "Where did Dr. Elena Rossi obtain her doctoral degree?",
            opts: [{ key: "A", text: "University of Milan" }, { key: "B", text: "Oxford University" }, { key: "C", text: "ETH Zurich" }, { key: "D", text: "Harvard Medical School" }], a: "C",
            exp: "Trường đại học của Dr. Rossi: 'Ph.D. in Biochemical Engineering from ETH Zurich'."
          },
          {
            q: "What analytical technology did Dr. Rossi integrate in her previous role?",
            opts: [{ key: "A", text: "Paper chromatography strips" }, { key: "B", text: "Handheld thermometer readings" }, { key: "C", text: "Visual color comparison charts" }, { key: "D", text: "In-line Raman spectroscopy analytics" }], a: "D",
            exp: "Công nghệ phân tích tích hợp: 'integrating in-line Raman spectroscopy analytics'."
          },
          {
            q: "How many years of industrial experience does Dr. Rossi possess?",
            opts: [{ key: "A", text: "8 years" }, { key: "B", text: "2 years" }, { key: "C", text: "4 years" }, { key: "D", text: "15 years" }], a: "A",
            exp: "Số năm kinh nghiệm: 'eight years of industrial experience leading cell culture process development'."
          },
          {
            q: "When did Dr. Rossi submit her application cover email?",
            opts: [{ key: "A", text: "November 4, 2026" }, { key: "B", text: "November 15, 2026" }, { key: "C", text: "November 25, 2026" }, { key: "D", text: "December 1, 2026" }], a: "B",
            exp: "Ngày gửi email: 'Date: November 15, 2026'."
          }
        ]
      },
      {
        type: "Double Passage (Clean Energy Contract & Commissioning Schedule)",
        passage: `[DOCUMENT 1: POWER PURCHASE AGREEMENT HIGHLIGHTS]\nBuyer: Austin Municipal Utility District (AMUD)\nSeller: Apex Solaria Clean Energy LLC\nProject: Travis County Photovoltaic Microgrid & Storage Park\n\nCommercial Terms:\n- Installed Generation Capacity: 150 Megawatts solar PV + 50 Megawatts / 200 Megawatt-hours battery storage\n- Contract Term: 20 Years from Commercial Operation Date (COD)\n- Fixed Power Purchase Tariff: $0.0385 per kilowatt-hour (kWh)\n- Guaranteed Performance Ratio: 86.0% during the initial 5-year operating period\n- Annual Output Degradation Cap: Maximum 0.45% per year\n\n[DOCUMENT 2: PROJECT COMMISSIONING MEMO]\nTo: Austin City Council Energy Committee\nFrom: Chief Electrical Engineer, AMUD\nDate: November 18, 2026\nSubject: Commissioning Milestones for Travis County Solar Park\n\nWe are pleased to report that civil racking installation for the 150MW solar array is 100% complete. The battery energy storage system (BESS), consisting of 40 liquid-cooled Lithium Iron Phosphate containerized enclosures, arrived on site last week.\n\nGrid synchronization testing with the ERCOT transmission interconnection substation will commence on January 10, 2027. We project full commercial operation acceptance on March 15, 2027, forty-five days ahead of the statutory contractual deadline. The fixed tariff of $0.0385/kWh is projected to save municipal taxpayers approximately 8.5 million dollars annually compared to peak natural gas generation.`,
        questions: [
          {
            q: "What is the fixed power purchase tariff per kilowatt-hour?",
            opts: [{ key: "A", text: "$0.0150" }, { key: "B", text: "$0.0850" }, { key: "C", text: "$0.0385 per kWh" }, { key: "D", text: "$0.1200" }], a: "C",
            exp: "Giá mua điện cố định: '$0.0385 per kilowatt-hour (kWh)'."
          },
          {
            q: "What is the total battery energy storage capacity of the facility?",
            opts: [{ key: "A", text: "10MW / 20 Megawatt-hours" }, { key: "B", text: "150 Megawatt-hours" }, { key: "C", text: "500 Megawatt-hours" }, { key: "D", text: "50MW / 200 Megawatt-hours" }], a: "D",
            exp: "Dung lượng pin lưu trữ: '50 Megawatts / 200 Megawatt-hours battery storage'."
          },
          {
            q: "When is grid synchronization testing scheduled to begin?",
            opts: [{ key: "A", text: "January 10, 2027" }, { key: "B", text: "November 18, 2026" }, { key: "C", text: "March 15, 2027" }, { key: "D", text: "June 1, 2027" }], a: "A",
            exp: "Thời gian kiểm thử hòa lưới: 'Grid synchronization testing... will commence on January 10, 2027'."
          },
          {
            q: "By how many days is commercial operation projected to beat the contractual deadline?",
            opts: [{ key: "A", text: "10 days" }, { key: "B", text: "45 days ahead of deadline" }, { key: "C", text: "30 days" }, { key: "D", text: "90 days" }], a: "B",
            exp: "Tiến độ sớm hơn kế hoạch: 'forty-five days ahead of the statutory contractual deadline'."
          },
          {
            q: "How much annual cost savings will the project deliver for municipal taxpayers?",
            opts: [{ key: "A", text: "1.2 million dollars" }, { key: "B", text: "4.5 million dollars" }, { key: "C", text: "Approximately 8.5 million dollars annually" }, { key: "D", text: "25 million dollars" }], a: "C",
            exp: "Mức tiết kiệm hàng năm: 'save municipal taxpayers approximately 8.5 million dollars annually'."
          }
        ]
      },
      {
        type: "Triple Passage: Nevada Solar Array Procurement (Q186 - Q190)",
        passage: `[DOCUMENT 1: INVITATION TO TENDER]\nNevada Clean Power Authority invites competitive bids for the turnkey engineering, procurement, and construction (EPC) of a 250-Megawatt utility-scale photovoltaic solar park in Clark County, Nevada. Proposals must include bifacial solar modules and a 10-year comprehensive maintenance contract with a guaranteed 99.5% plant availability factor. Submission deadline: October 15, 2026.\n\n[DOCUMENT 2: TECHNICAL BID EVALUATION]\nApex Renewable Energy Solutions Inc. (Scottsdale, Arizona)\nProposal Reference: APEX-NV-2026-99\nBid Amount: $52,500,000 USD\nEquipment: Tier-1 650W TOPCon Bifacial Solar Panels with automated horizontal single-axis solar trackers.\nCommissioning Timeline: Construction begins February 1, 2027, with commercial operation date (COD) by November 30, 2027.\n\n[DOCUMENT 3: FORMAL AWARD ANNOUNCEMENT]\nNovember 2, 2026\nThe Nevada Clean Power Authority is pleased to announce that Apex Renewable Energy Solutions Inc. has been awarded the EPC contract for the Clark County Solar Project ($52.5M). The selection committee highlighted Apex's superior tracker wind-stow automated safety telemetry as a decisive factor.`,
        questions: [
          {
            q: "Where is the utility-scale solar park project located?",
            opts: [{ key: "A", text: "In Scottsdale, Arizona" }, { key: "B", text: "In California" }, { key: "C", text: "In Texas" }, { key: "D", text: "In Clark County, Nevada" }], a: "D",
            exp: "Địa điểm dự án: 'in Clark County, Nevada'."
          },
          {
            q: "What is the total electrical capacity of the planned solar park?",
            opts: [{ key: "A", text: "250-Megawatt utility-scale solar park" }, { key: "B", text: "50 Megawatts" }, { key: "C", text: "1,000 Megawatts" }, { key: "D", text: "10 Megawatts" }], a: "A",
            exp: "Công suất thiết kế: '250-Megawatt utility-scale photovoltaic solar park'."
          },
          {
            q: "What is the winning contract bid amount submitted by Apex?",
            opts: [{ key: "A", text: "$20,000,000" }, { key: "B", text: "$52,500,000 USD" }, { key: "C", text: "$100,000,000" }, { key: "D", text: "$5,000,000" }], a: "B",
            exp: "Giá trị trúng thầu: 'Bid Amount: $52,500,000 USD'."
          },
          {
            q: "When is the commercial operation date (COD) scheduled for the solar park?",
            opts: [{ key: "A", text: "February 1, 2027" }, { key: "B", text: "October 15, 2026" }, { key: "C", text: "By November 30, 2027" }, { key: "D", text: "December 2030" }], a: "C",
            exp: "Thời điểm vận hành thương mại: 'commercial operation date (COD) by November 30, 2027'."
          },
          {
            q: "What feature in Apex's proposal was highlighted as a decisive factor?",
            opts: [{ key: "A", text: "Free solar panels" }, { key: "B", text: "Shortest corporate name" }, { key: "C", text: "Office proximity to the governor's mansion" }, { key: "D", text: "Superior tracker wind-stow automated safety telemetry" }], a: "D",
            exp: "Điểm quyết định trúng thầu: 'superior tracker wind-stow automated safety telemetry as a decisive factor'."
          }
        ]
      },
      {
        type: "Triple Passage: FinTech Cross-Border Payment Infrastructure",
        passage: `[DOCUMENT 1: PRESS RELEASE]\nSINGAPORE — November 10, 2026 — Nexus Settlement Networks today announced the successful pilot launch of its Multi-Currency Liquidity Corridor connecting financial institutions across Singapore, Tokyo, and Sydney. The platform utilizes distributed cryptographic validation to settle cross-border interbank transfers with sub-second finality.\n\n[DOCUMENT 2: PARTICIPATING BANK AUDIT REPORT]\nInstitution: Pacific Horizon Bank (Sydney Branch)\nAudit Period: Q3 2026 (July 1 - September 30)\nKey Metrics:\n• Total Transacted Volume: $4.8 Billion AUD across 280,000 transactions\n• Average Settlement Duration: 0.85 seconds (compared to 48 hours via legacy correspondent banking)\n• Cost Reduction: 62% decrease in foreign exchange clearing fees\n• System Availability: 99.998% uptime with zero fraudulent transaction exploits.\n\n[DOCUMENT 3: EXECUTIVE MEMO]\nFrom: Marcus Sterling, Head of Global Treasury Operations, Pacific Horizon Bank\nTo: Board of Directors\nDate: November 14, 2026\nSubject: Commercial Migration to Nexus Settlement Network\n\nBased on our stellar Q3 audit results, Treasury Operations formally recommends transitioning 100% of our wholesale corporate FX remittances to the Nexus Network by February 1, 2027. We project annual fee savings of 14.2 million AUD.`,
        questions: [
          {
            q: "What financial cities are connected by the Nexus Multi-Currency Liquidity Corridor?",
            opts: [{ key: "A", text: "Singapore, Tokyo, and Sydney" }, { key: "B", text: "London, Paris, and Frankfurt" }, { key: "C", text: "New York, Toronto, and Chicago" }, { key: "D", text: "Dubai, Mumbai, and Riyadh" }], a: "A",
            exp: "Các thành phố kết nối: 'connecting financial institutions across Singapore, Tokyo, and Sydney'."
          },
          {
            q: "What was the average settlement duration recorded in Pacific Horizon Bank's audit?",
            opts: [{ key: "A", text: "5 minutes" }, { key: "B", text: "0.85 seconds" }, { key: "C", text: "24 hours" }, { key: "D", text: "48 hours" }], a: "B",
            exp: "Thời gian xử lý giao dịch bình quân: 'Average Settlement Duration: 0.85 seconds'."
          },
          {
            q: "By what percentage did the platform reduce foreign exchange clearing fees?",
            opts: [{ key: "A", text: "25 percent" }, { key: "B", text: "40 percent" }, { key: "C", text: "62 percent decrease" }, { key: "D", text: "90 percent" }], a: "C",
            exp: "Tỷ lệ giảm phí thanh toán: '62% decrease in foreign exchange clearing fees'."
          },
          {
            q: "By what date does Marcus Sterling recommend completing the 100% migration?",
            opts: [{ key: "A", text: "November 10, 2026" }, { key: "B", text: "November 14, 2026" }, { key: "C", text: "December 31, 2028" }, { key: "D", text: "February 1, 2027" }], a: "D",
            exp: "Thời điểm hoàn tất chuyển đổi toàn diện: 'transitioning 100% of our wholesale corporate FX remittances... by February 1, 2027'."
          },
          {
            q: "What is the projected annual cost savings for Pacific Horizon Bank?",
            opts: [{ key: "A", text: "14.2 million AUD" }, { key: "B", text: "1.5 million AUD" }, { key: "C", text: "4.8 million AUD" }, { key: "D", text: "50 million AUD" }], a: "A",
            exp: "Mức tiết kiệm chi phí hàng năm: 'project annual fee savings of 14.2 million AUD'."
          }
        ]
      },
      {
        type: "Single Passage (Automated Warehouse Operations Manual Excerpt)",
        passage: `STANDARD OPERATING PROCEDURE: AUTONOMOUS MOBILE ROBOT (AMR) SAFETY PROTOCOLS\nDocument Ref: SOP-LOG-2026-44\nFacility: GlobalTech Automated Fulfillment Center #3 (Dallas, TX)\n\n1. Obstacle Detection & Emergency E-Stops:\nAll AMR-500 pallet lifters are equipped with front and rear safety LiDAR scanners providing a 360-degree detection zone up to 4 meters. If an obstruction enters the primary safety zone (within 1.2 meters), the vehicle automatically initiates dynamic regenerative braking to achieve a complete halt in under 0.6 seconds.\n\n2. Battery Charging & Thermal Telemetry:\nAMRs perform opportunity charging at automated docking stations located at the ends of Aisles 4, 8, and 12. Battery core temperatures are transmitted continuously via industrial Wi-Fi. If any cell exceeds 42°C during high-rate fast charging, the charging current is automatically throttled by 50%.\n\n3. Maintenance Isolation:\nTechnicians performing routine mechanical servicing must engage the physical red lock-out tag-out (LOTO) switch on the chassis prior to entering the automated racking zone.`,
        questions: [
          {
            q: "What is the emergency braking stopping time of the AMR-500 pallet lifter?",
            opts: [{ key: "A", text: "2.5 seconds" }, { key: "B", text: "Under 0.6 seconds" }, { key: "C", text: "5 seconds" }, { key: "D", text: "10 seconds" }], a: "B",
            exp: "Thời gian dừng phanh khẩn cấp: 'complete halt in under 0.6 seconds'."
          },
          {
            q: "Where are the automated battery charging docking stations located?",
            opts: [{ key: "A", text: "In the employee cafeteria" }, { key: "B", text: "Outside in the truck loading yard" }, { key: "C", text: "At the ends of Aisles 4, 8, and 12" }, { key: "D", text: "On the second-floor mezzanine office" }], a: "C",
            exp: "Vị trí trạm sạc: 'located at the ends of Aisles 4, 8, and 12'."
          },
          {
            q: "What temperature threshold triggers automatic charging current throttling?",
            opts: [{ key: "A", text: "25°C" }, { key: "B", text: "35°C" }, { key: "C", text: "60°C" }, { key: "D", text: "42°C" }], a: "D",
            exp: "Ngưỡng nhiệt độ an toàn: 'If any cell exceeds 42°C during high-rate fast charging'."
          },
          {
            q: "What safety switch must technicians engage before entering the racking zone?",
            opts: [{ key: "A", text: "The physical red lock-out tag-out (LOTO) switch" }, { key: "B", text: "The overhead light switch" }, { key: "C", text: "The fire alarm pull lever" }, { key: "D", text: "The ventilation fan speed dial" }], a: "A",
            exp: "Khóa an toàn bắt buộc: 'engage the physical red lock-out tag-out (LOTO) switch on the chassis'."
          }
        ]
      },
      {
        type: "Single Passage (Pharmaceutical Quality Assurance Notice)",
        passage: `PHARMACEUTICAL REGULATORY AUDIT NOTICE\nFacility: Basel Biologics Manufacturing Campus\nInspecting Agency: Swissmedic & European Medicines Agency (EMA)\nAudit Dates: November 16–18, 2026\n\nScope of Inspection:\nThis routine biannual inspection will evaluate our sterile fill-finish operations for monoclonal antibody Line 2, focusing on environmental microbiological monitoring, cleanroom HEPA filter integrity certificates, and automated electronic batch record (eBR) audit trails.\n\nAll department managers must ensure that Standard Operating Procedure binders and technician training logs for the past twenty-four months are reconciled and accessible in the Quality Document Room (Building A, Room 104). The lead regulatory inspector, Dr. Sophie Meier, will conduct the opening briefing at 8:30 AM on Monday in the Main Conference Auditorium.`,
        questions: [
          {
            q: "Which regulatory agencies are conducting the inspection in Basel?",
            opts: [{ key: "A", text: "Federal Aviation Administration" }, { key: "B", text: "Swissmedic & European Medicines Agency (EMA)" }, { key: "C", text: "Environmental Protection Agency only" }, { key: "D", text: "International Maritime Organization" }], a: "B",
            exp: "Cơ quan thanh tra: 'Inspecting Agency: Swissmedic & European Medicines Agency (EMA)'."
          },
          {
            q: "Where must 24-month training logs and SOP binders be placed?",
            opts: [{ key: "A", text: "In the cafeteria lounge" }, { key: "B", text: "In the basement warehouse" }, { key: "C", text: "In the Quality Document Room (Building A, Room 104)" }, { key: "D", text: "On the factory loading dock" }], a: "C",
            exp: "Nơi lưu trữ tài liệu thanh tra: 'Quality Document Room (Building A, Room 104)'."
          },
          {
            q: "Who is the lead regulatory inspector conducting the opening briefing?",
            opts: [{ key: "A", text: "Dr. Marcus Vance" }, { key: "B", text: "Mr. David Chen" }, { key: "C", text: "Ms. Elena Rossi" }, { key: "D", text: "Dr. Sophie Meier" }], a: "D",
            exp: "Trưởng đoàn thanh tra: 'lead regulatory inspector, Dr. Sophie Meier'."
          },
          {
            q: "What time will the opening briefing take place on Monday?",
            opts: [{ key: "A", text: "8:30 AM" }, { key: "B", text: "7:00 AM" }, { key: "C", text: "10:00 AM" }, { key: "D", text: "1:00 PM" }], a: "A",
            exp: "Thời gian họp mở đầu: 'opening briefing at 8:30 AM on Monday in the Main Conference Auditorium'."
          }
        ]
      },
      {
        type: "Single Passage (Executive Leadership Conference Itinerary)",
        passage: `GENEVA EXECUTIVE LEADERSHIP SUMMIT — OFFICIAL SCHEDULE\nVenue: Lake Geneva Convention Palace, Geneva, Switzerland\nDate: Thursday, December 3, 2026\n\nMorning Sessions (Grand Ballroom):\n08:30 — 09:00: Registration, Badge Pick-up, and Networking Espresso Reception\n09:00 — 09:15: Welcome Address by Swiss Federal Council Economic Advisor\n09:15 — 10:30: Keynote: 'Geopolitical Supply Chain Realignment & AI Governance' by Prof. Hans Weber (IMD)\n10:30 — 11:00: Morning Networking Break & Tech Exhibition Showcase\n11:00 — 12:30: Executive Panel: Decarbonization Investment in European Heavy Industry\n\nAfternoon Workshops (Breakout Rooms):\n12:30 — 14:00: Official Delegate Luncheon (Salon des Roses)\n14:00 — 15:30: Track A: ESG Regulatory Compliance & CSRD Directives (Room 201)\n14:00 — 15:30: Track B: Cyber Resilience & Quantum Cryptography for Boards (Room 205)\n15:30 — 16:00: Afternoon Tea & Bilateral Meeting Slots\n16:00 — 17:30: Closing Plenary: The 2030 Global Economic Outlook (Grand Ballroom)\n17:30 — 19:00: Evening Cocktail Reception & Innovation Awards Ceremony (Lakeview Terrace)`,
        questions: [
          {
            q: "What topic is explored in the 09:15 keynote presentation?",
            opts: [{ key: "A", text: "Hotel room renovation budgeting" }, { key: "B", text: "Geopolitical Supply Chain Realignment & AI Governance" }, { key: "C", text: "Office desktop computer repair" }, { key: "D", text: "Commercial television advertising" }], a: "B",
            exp: "Chủ đề bài diễn văn: 'Geopolitical Supply Chain Realignment & AI Governance'."
          },
          {
            q: "Where will the official delegate luncheon take place at 12:30?",
            opts: [{ key: "A", text: "In the Grand Ballroom" }, { key: "B", text: "In Breakout Room 201" }, { key: "C", text: "At Salon des Roses" }, { key: "D", text: "On the Lakeview Terrace" }], a: "C",
            exp: "Địa điểm ăn trưa: 'Official Delegate Luncheon (Salon des Roses)'."
          },
          {
            q: "Which afternoon workshop track addresses Cyber Resilience & Quantum Cryptography?",
            opts: [{ key: "A", text: "Track A in Room 201" }, { key: "B", text: "The morning keynote in Grand Ballroom" }, { key: "C", text: "The evening awards banquet" }, { key: "D", text: "Track B in Room 205" }], a: "D",
            exp: "Chương trình chuyên đề an ninh lượng tử: 'Track B: Cyber Resilience & Quantum Cryptography for Boards (Room 205)'."
          },
          {
            q: "What concluding event is scheduled for 17:30 on the Lakeview Terrace?",
            opts: [{ key: "A", text: "Evening Cocktail Reception & Innovation Awards Ceremony" }, { key: "B", text: "A bicycle race" }, { key: "C", text: "A job recruitment fair" }, { key: "D", text: "An emergency fire drill" }], a: "A",
            exp: "Sự kiện kết thúc lúc 17:30: 'Evening Cocktail Reception & Innovation Awards Ceremony (Lakeview Terrace)'."
          }
        ]
      },
      {
        type: "Single Passage (Automated Port Terminal Key Performance Indicators)",
        passage: `BUSAN NEW PORT AUTOMATION TERMINAL — Q3 OPERATIONAL REPORT\nOperator: Busan Smart Gateway Terminal (BSGT)\nOperating Period: July 1 – September 30, 2026\n\nExecutive Performance Summary:\n1. Vessel Berthing & Turnaround:\nDuring Q3, BSGT berthed 248 ultra-large container vessels (ULCVs, capacity exceeding 18,000 TEU). Average vessel turnaround time at berth decreased from 28.4 hours to 22.1 hours, representing a 22.2% efficiency improvement compared to Q3 2025.\n\n2. Crane Productivity:\nOur fleet of 32 automated double-trolley ship-to-shore (STS) gantry cranes recorded an average gross productivity rate of 35.8 container moves per hour per crane. Total terminal throughput reached 1,840,000 TEU.\n\n3. Decarbonization & Emissions:\nBy converting 100% of yard tractors to battery-electric automated guided vehicles (AGVs), the terminal eliminated 14,200 metric tonnes of direct diesel emissions during the quarter.`,
        questions: [
          {
            q: "How many ultra-large container vessels berthed at BSGT during Q3?",
            opts: [{ key: "A", text: "50 vessels" }, { key: "B", text: "248 vessels" }, { key: "C", text: "120 vessels" }, { key: "D", text: "500 vessels" }], a: "B",
            exp: "Số lượng tàu cập cảng: 'berthed 248 ultra-large container vessels'."
          },
          {
            q: "What was the average crane productivity rate achieved during the quarter?",
            opts: [{ key: "A", text: "15 moves per hour" }, { key: "B", text: "22.1 moves per hour" }, { key: "C", text: "35.8 container moves per hour per crane" }, { key: "D", text: "50 moves per hour" }], a: "C",
            exp: "Năng suất cẩu: '35.8 container moves per hour per crane'."
          },
          {
            q: "What was the total terminal throughput in Q3?",
            opts: [{ key: "A", text: "500,000 TEU" }, { key: "B", text: "1,200,000 TEU" }, { key: "C", text: "3,000,000 TEU" }, { key: "D", text: "1,840,000 TEU" }], a: "D",
            exp: "Sản lượng thông qua: 'Total terminal throughput reached 1,840,000 TEU'."
          },
          {
            q: "How many tonnes of direct diesel emissions were eliminated by electric AGVs?",
            opts: [{ key: "A", text: "14,200 metric tonnes" }, { key: "B", text: "2,000 metric tonnes" }, { key: "C", text: "8,500 metric tonnes" }, { key: "D", text: "50,000 metric tonnes" }], a: "A",
            exp: "Mức giảm phát thải diesel: 'eliminated 14,200 metric tonnes of direct diesel emissions'."
          }
        ]
      },
      {
        type: "Double Passage (Wind Turbine Maintenance & Warranty Settlement)",
        passage: `[DOCUMENT 1: WARRANTY SERVICE CLAIM]\nTo: Nordex Wind Power Systems Technical Services (Hamburg)\nFrom: Wind Farm Asset Operations, Baltic Coast Clean Energy\nDate: November 12, 2026\nSubject: Warranty Claim for Pitch Control Actuator Failures on Turbines W-14 & W-18\n\nDear Technical Support Team,\n\nDuring our scheduled 6-month diagnostic inspection at the Pomeranian Bay Offshore Wind Farm, our technicians identified hydraulic seal leaks in the blade pitch control actuators on Turbines W-14 and W-18. Both turbines have been locked in feathering safety mode, resulting in approximately 140 megawatt-hours of lost generation daily.\n\nAs these units are within the 5-year comprehensive manufacturer warranty period, we request immediate dispatch of certified offshore maintenance technicians along with two replacement hydraulic actuator assemblies (Part #PA-8840).\n\n[DOCUMENT 2: MANUFACTURER SERVICE AUTHORIZATION]\nTo: Baltic Coast Clean Energy\nFrom: Lead Offshore Service Coordinator, Nordex Wind Power Systems\nDate: November 14, 2026\n\nWe have reviewed your warranty service claim (Ref #CLM-2026-904). Nordex has authorized the full warranty replacement of both pitch control actuators at zero cost to your organization.\n\nOur specialized offshore service vessel, the MV Baltic Engineer, has been dispatched from Rostock with replacement parts and a certified four-person technician crew. Repair operations will commence on November 17, with both turbines expected to resume full commercial generation by November 19 at 5:00 PM. In addition, Nordex will credit €38,500 toward your annual service account to compensate for downtime generation losses.`,
        questions: [
          {
            q: "What technical problem was reported on Turbines W-14 and W-18?",
            opts: [{ key: "A", text: "Broken foundation concrete" }, { key: "B", text: "Hydraulic seal leaks in blade pitch control actuators" }, { key: "C", text: "Electrical cable theft" }, { key: "D", text: "Damaged paint on the exterior tower" }], a: "B",
            exp: "Vấn đề kỹ thuật: 'hydraulic seal leaks in the blade pitch control actuators on Turbines W-14 and W-18'."
          },
          {
            q: "How much daily power generation was lost while the turbines were locked?",
            opts: [{ key: "A", text: "10 megawatt-hours" }, { key: "B", text: "50 megawatt-hours" }, { key: "C", text: "Approximately 140 megawatt-hours daily" }, { key: "D", text: "500 megawatt-hours" }], a: "C",
            exp: "Sản lượng điện bị tổn thất hàng ngày: 'approximately 140 megawatt-hours of lost generation daily'."
          },
          {
            q: "From which port was the service vessel MV Baltic Engineer dispatched?",
            opts: [{ key: "A", text: "From Hamburg" }, { key: "B", text: "From Stockholm" }, { key: "C", text: "From Copenhagen" }, { key: "D", text: "From Rostock" }], a: "D",
            exp: "Cảng xuất phát của tàu sửa chữa: 'dispatched from Rostock with replacement parts'."
          },
          {
            q: "When are both turbines expected to resume commercial power generation?",
            opts: [{ key: "A", text: "By November 19 at 5:00 PM" }, { key: "B", text: "On November 12" }, { key: "C", text: "In late December" }, { key: "D", text: "Next spring" }], a: "A",
            exp: "Thời điểm phát điện trở lại: 'expected to resume full commercial generation by November 19 at 5:00 PM'."
          },
          {
            q: "What compensation credit did Nordex provide to Baltic Coast Clean Energy?",
            opts: [{ key: "A", text: "€10,000" }, { key: "B", text: "€38,500 credited toward annual service account" }, { key: "C", text: "A free new wind turbine" }, { key: "D", text: "Two years of free insurance" }], a: "B",
            exp: "Khoản tín dụng bồi thường: 'credit €38,500 toward your annual service account'."
          }
        ]
      },
      {
        type: "Triple Passage (Cloud Security Audit & SLA Negotiation)",
        passage: `[DOCUMENT 1: THIRD-PARTY CYBERSECURITY AUDIT EXECUTIVE SUMMARY]\nAuditor: CyberTrust International (Frankfurt)\nClient: Apex Cloud Enterprise (Paris Data Center Hub)\nAudit Scope: ISO/IEC 27001 & SOC 2 Type II Annual Security Re-evaluation\n\nAudit Findings:\n• Physical & Biometric Access: Zero non-conformities across 12 colocation server vaults.\n• Network Intrusion Defense: Next-generation AI firewalls blocked 100% of 14,000 simulated penetration attacks.\n• Redundant Power & Cooling: N+2 diesel generator and direct liquid cooling telemetry demonstrated 99.999% uptime availability during the 12-month evaluation window.\n\nRecommendation: Grant unconditional renewal of SOC 2 Type II certification.\n\n[DOCUMENT 2: CLIENT SLA PERFORMANCE INQUIRY]\nTo: Enterprise Accounts, Apex Cloud Enterprise\nFrom: Chief Information Officer, Global FinTech Solutions (Geneva)\nDate: November 18, 2026\nSubject: Request for SLA Tier Upgrade Based on SOC 2 Recertification\n\nDear Apex Team,\n\nCongratulations on your successful CyberTrust SOC 2 Type II recertification. Given our expanding real-time algorithmic trading transaction volumes in Europe, Global FinTech Solutions wishes to upgrade our current Enterprise Cloud SLA to the Mission-Critical Platinum tier.\n\nPlease provide quotation details for a dedicated 100 Gbps dark fiber cross-connect and a guaranteed 15-minute emergency response SLA.\n\n[DOCUMENT 3: MASTER SERVICE AGREEMENT AMENDMENT]\nEffective Date: December 1, 2026\nBetween: Apex Cloud Enterprise & Global FinTech Solutions\n\nAmended Terms:\n1. SLA Tier: Upgraded to Mission-Critical Platinum\n2. Service Availability Guarantee: 99.999% monthly uptime, backed by a 50% service fee rebate for any unscheduled downtime exceeding 5 minutes.\n3. Dedicated Connection: 100 Gbps low-latency redundant dark fiber between Paris DC-1 and Geneva Exchange.\n4. Additional Monthly Fee: €24,500.`,
        questions: [
          {
            q: "What uptime availability was verified during CyberTrust's annual evaluation?",
            opts: [{ key: "A", text: "95.0%" }, { key: "B", text: "98.5%" }, { key: "C", text: "99.999% uptime availability" }, { key: "D", text: "100% without maintenance" }], a: "C",
            exp: "Độ sẵn sàng hệ thống: 'demonstrated 99.999% uptime availability'."
          },
          {
            q: "Where is the Apex Cloud Data Center evaluated in Document 1 located?",
            opts: [{ key: "A", text: "In Geneva" }, { key: "B", text: "In Frankfurt" }, { key: "C", text: "In London" }, { key: "D", text: "In Paris" }], a: "D",
            exp: "Vị trí trung tâm dữ liệu: 'Apex Cloud Enterprise (Paris Data Center Hub)'."
          },
          {
            q: "What SLA tier upgrade did Global FinTech Solutions request?",
            opts: [{ key: "A", text: "Mission-Critical Platinum tier" }, { key: "B", text: "Standard Bronze tier" }, { key: "C", text: "Free Community tier" }, { key: "D", text: "Silver tier" }], a: "A",
            exp: "Cấp độ SLA đề xuất nâng cấp: 'upgrade our current Enterprise Cloud SLA to the Mission-Critical Platinum tier'."
          },
          {
            q: "What dedicated network connection is established under the amended agreement?",
            opts: [{ key: "A", text: "Standard telephone modem dial-up" }, { key: "B", text: "100 Gbps low-latency redundant dark fiber" }, { key: "C", text: "Public satellite link" }, { key: "D", text: "Wireless 4G mobile hotspot" }], a: "B",
            exp: "Đường truyền chuyên dụng: '100 Gbps low-latency redundant dark fiber between Paris DC-1 and Geneva Exchange'."
          },
          {
            q: "What financial penalty applies if unscheduled downtime exceeds 5 minutes?",
            opts: [{ key: "A", text: "5% discount" }, { key: "B", text: "Immediate contract cancellation without notice" }, { key: "C", text: "A 50% service fee rebate" }, { key: "D", text: "€100 fine" }], a: "C",
            exp: "Chế tài bồi thường downtime: 'backed by a 50% service fee rebate for any unscheduled downtime exceeding 5 minutes'."
          },
          {
            q: "What is the additional monthly fee for the Platinum SLA upgrade?",
            opts: [{ key: "A", text: "€5,000" }, { key: "B", text: "€12,000" }, { key: "C", text: "€50,000" }, { key: "D", text: "€24,500" }], a: "D",
            exp: "Phí dịch vụ hàng tháng bổ sung: 'Additional Monthly Fee: €24,500'."
          }
        ]
      }
    ];

    let p7Num = 147;
    part7Passages.forEach((passageSet) => {
      passageSet.questions.forEach((item) => {
        qs.push({
          id: `trm1_q${p7Num}`,
          partNumber: 7,
          partTitle: `Reading Part 7: ${passageSet.type}`,
          section: "READING",
          passageText: passageSet.passage,
          questionText: `Question ${p7Num}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
        p7Num++;
      });
    });

    return qs;
  })()
};
