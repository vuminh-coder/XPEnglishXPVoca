import { ExamPaper, ExamQuestion } from "./types";

export const toeicRwBusiness01Paper: ExamPaper = {
  id: "toeic_rw_business_01",
  title: "TOEIC Reading & Writing Business Duo #01 (58 Questions)",
  type: "TOEIC_LR",
  level: "Advanced",
  timeLimitMinutes: 90,
  totalQuestions: 58,
  maxScore: 695,
  description: "Tron bo ket hop 2 Ky nang Doc & Viet AI (Reading & Writing Business Duo): 50 cau Reading Parts 5-7 (Hop dong thuong mai, Dau thau tram bien ap, Chuoi cung ung MEMS) va 8 cau Writing AI chuan ETS TOEIC 2026.",
  categoryBadge: "ETS TOEIC R&W",
  tags: ["TOEIC", "Reading & Writing", "AI Studio", "58 Questions", "Dual Skills"],
  supportedSkills: ["READING", "WRITING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
    // READING PART 5: Incomplete Sentences (Q1-Q15)
    // =========================================================================
    const part5Qs = [
      { q: "The corporate legal counsel carefully reviewed the commercial contract to ensure full _______ with international trade regulations.", opts: [{ key: "A", text: "compliance" }, { key: "B", text: "comply" }, { key: "C", text: "compliant" }, { key: "D", text: "compliantly" }], a: "A", exp: "Can danh tu 'compliance' sau tinh tu 'full' (full compliance with)." },
      { q: "All department supervisors are required to submit their quarterly expense reports _______ by the last business day of each fiscal quarter.", opts: [{ key: "A", text: "prompt" }, { key: "B", text: "promptly" }, { key: "C", text: "promptness" }, { key: "D", text: "prompted" }], a: "B", exp: "Can trang tu 'promptly' bo nghia cho dong tu 'submit'." },
      { q: "The proposed merger between Apex Holdings and Pinnacle Industries will be subject to _______ regulatory approval.", opts: [{ key: "A", text: "stringently" }, { key: "B", text: "stringency" }, { key: "C", text: "stringent" }, { key: "D", text: "strings" }], a: "C", exp: "Can tinh tu 'stringent' bo nghia cho danh tu 'regulatory approval'." },
      { q: "Ms. Rodriguez has been appointed to _______ oversee the integration of our newly acquired subsidiary operations.", opts: [{ key: "A", text: "person" }, { key: "B", text: "personal" }, { key: "C", text: "personality" }, { key: "D", text: "personally" }], a: "D", exp: "Can trang tu 'personally' bo nghia cho dong tu 'oversee'." },
      { q: "The board of directors voted _______ to approve the capital investment plan for the new manufacturing facility.", opts: [{ key: "A", text: "unanimously" }, { key: "B", text: "unanimous" }, { key: "C", text: "unanimity" }, { key: "D", text: "unite" }], a: "A", exp: "Can trang tu 'unanimously' bo nghia cho dong tu 'voted'." },
      { q: "Our logistics division has achieved a remarkable _______ in delivery efficiency over the past three quarters.", opts: [{ key: "A", text: "improve" }, { key: "B", text: "improvement" }, { key: "C", text: "improved" }, { key: "D", text: "improving" }], a: "B", exp: "Can danh tu 'improvement' lam tan ngu cho 'achieved a remarkable'." },
      { q: "The construction project was delayed _______ unexpected foundation complications discovered during the excavation phase.", opts: [{ key: "A", text: "in spite of" }, { key: "B", text: "regardless of" }, { key: "C", text: "due to" }, { key: "D", text: "aside from" }], a: "C", exp: "'Due to' chi nguyen nhan cho su cham tre." },
      { q: "All employees participating in the overseas conference must submit their travel authorization forms _______ departure.", opts: [{ key: "A", text: "subsequent to" }, { key: "B", text: "in addition to" }, { key: "C", text: "with regard to" }, { key: "D", text: "prior to" }], a: "D", exp: "'Prior to' (truoc khi) departure - nop don truoc khi khoi hanh." },
      { q: "The pharmaceutical company's annual revenue exceeded initial _______ by a significant twelve percent margin.", opts: [{ key: "A", text: "projections" }, { key: "B", text: "project" }, { key: "C", text: "projected" }, { key: "D", text: "projecting" }], a: "A", exp: "Can danh tu so nhieu 'projections' (du bao) sau 'initial'." },
      { q: "Although the economic downturn affected multiple sectors, our technology division remained _______ profitable throughout the fiscal year.", opts: [{ key: "A", text: "consist" }, { key: "B", text: "consistently" }, { key: "C", text: "consistent" }, { key: "D", text: "consistency" }], a: "B", exp: "Can trang tu 'consistently' bo nghia cho tinh tu 'profitable'." },
      { q: "The marketing campaign was designed to _______ brand awareness among millennial consumers in Southeast Asian markets.", opts: [{ key: "A", text: "height" }, { key: "B", text: "heightened" }, { key: "C", text: "heighten" }, { key: "D", text: "heights" }], a: "C", exp: "Sau 'to' can dong tu nguyen mau 'heighten'." },
      { q: "Applicants for the senior management position must demonstrate at least ten years of _______ leadership experience.", opts: [{ key: "A", text: "prove" }, { key: "B", text: "proof" }, { key: "C", text: "proving" }, { key: "D", text: "proven" }], a: "D", exp: "Can tinh tu/phan tu 'proven' bo nghia cho 'leadership experience'." },
      { q: "The client specifically requested that the architectural blueprints be revised to _______ the updated seismic safety regulations.", opts: [{ key: "A", text: "reflect" }, { key: "B", text: "reflection" }, { key: "C", text: "reflective" }, { key: "D", text: "reflectively" }], a: "A", exp: "Sau 'to' can dong tu nguyen mau 'reflect'." },
      { q: "Mr. Tanaka's _______ to the negotiation process was instrumental in securing the multi-million-dollar distribution agreement.", opts: [{ key: "A", text: "contribute" }, { key: "B", text: "contribution" }, { key: "C", text: "contributed" }, { key: "D", text: "contributing" }], a: "B", exp: "Can danh tu 'contribution' lam chu ngu (Mr. Tanaka's contribution)." },
      { q: "The software development team worked _______ to resolve the critical security vulnerability before the product launch deadline.", opts: [{ key: "A", text: "tire" }, { key: "B", text: "tiring" }, { key: "C", text: "tirelessly" }, { key: "D", text: "tiredness" }], a: "C", exp: "Can trang tu 'tirelessly' bo nghia cho dong tu 'worked'." }
    ];

    part5Qs.forEach((item, idx) => {
      qs.push({ id: `trwb1_q${idx + 1}`, partNumber: 1, partTitle: "Reading Part 5: Incomplete Sentences", section: "READING", questionText: `Question ${idx + 1}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // READING PART 6: Text Completion (Q16-Q23)
    // =========================================================================
    const part6Sets = [
      {
        passage: `INTERNAL MEMORANDUM — SMART GRID SUBSTATION PROCUREMENT\n\nFrom: Director of Infrastructure, Municipal Utility Authority\nTo: All Qualified Engineering Contractors\nRe: Invitation to Tender — Next-Generation Substation Equipment\n\nThe Municipal Utility Authority has finalized technical specifications for the upcoming substation modernization tender. Prospective bidders must _______ (Q16) proven track records in high-voltage transformer installation. All proposals must include detailed _______ (Q17) estimates covering equipment, labor, and commissioning costs. The submission deadline is November 30th, and late applications will not be _______ (Q18) under any circumstances. Shortlisted contractors will be invited to present their technical proposals at a mandatory pre-qualification meeting _______ (Q19) December 15th.`,
        questions: [
          { q: "Q16: Select the best word for the first blank.", opts: [{ key: "A", text: "demonstration" }, { key: "B", text: "demonstrative" }, { key: "C", text: "demonstrably" }, { key: "D", text: "demonstrate" }], a: "D", exp: "Sau 'must' can dong tu nguyen mau 'demonstrate'." },
          { q: "Q17: Select the best word for the second blank.", opts: [{ key: "A", text: "budgetary" }, { key: "B", text: "budget" }, { key: "C", text: "budgeted" }, { key: "D", text: "budgeting" }], a: "A", exp: "'Budgetary estimates' la cum danh tu chuan trong van ban dau thau." },
          { q: "Q18: Select the best word for the third blank.", opts: [{ key: "A", text: "accept" }, { key: "B", text: "accepted" }, { key: "C", text: "acceptable" }, { key: "D", text: "acceptance" }], a: "B", exp: "Cau bi dong: 'will not be accepted' (se khong duoc chap nhan)." },
          { q: "Q19: Select the best word for the fourth blank.", opts: [{ key: "A", text: "in" }, { key: "B", text: "at" }, { key: "C", text: "on" }, { key: "D", text: "by" }], a: "C", exp: "'On December 15th' - gioi tu 'on' + ngay cu the." }
        ]
      },
      {
        passage: `EMPLOYEE BENEFITS UPDATE — ENHANCED WELLNESS PROGRAMME\n\nDear Staff,\n\nWe are pleased to announce significant _______ (Q20) to our corporate wellness programme, effective January 1st. All full-time employees will now have access to an expanded mental health counselling benefit covering up to 12 sessions _______ (Q21). Additionally, our gym membership subsidy has been increased from 50 to 75 percent of monthly fees. These improvements _______ (Q22) our commitment to supporting employee well-being. Please direct any questions to the Human Resources department _______ (Q23) extension 4200.`,
        questions: [
          { q: "Q20: Select the best word for the first blank.", opts: [{ key: "A", text: "enhance" }, { key: "B", text: "enhanced" }, { key: "C", text: "enhancing" }, { key: "D", text: "enhancements" }], a: "D", exp: "Can danh tu so nhieu 'enhancements' sau 'significant'." },
          { q: "Q21: Select the best word for the second blank.", opts: [{ key: "A", text: "annually" }, { key: "B", text: "annual" }, { key: "C", text: "annualize" }, { key: "D", text: "annualized" }], a: "A", exp: "Can trang tu 'annually' (hang nam) bo nghia cho '12 sessions'." },
          { q: "Q22: Select the best word for the third blank.", opts: [{ key: "A", text: "reflects" }, { key: "B", text: "reflect" }, { key: "C", text: "reflected" }, { key: "D", text: "reflection" }], a: "B", exp: "Chu ngu 'improvements' so nhieu + thi hien tai -> 'reflect'." },
          { q: "Q23: Select the best word for the fourth blank.", opts: [{ key: "A", text: "in" }, { key: "B", text: "on" }, { key: "C", text: "at" }, { key: "D", text: "by" }], a: "C", exp: "'At extension 4200' - gioi tu 'at' + so may nhanh." }
        ]
      }
    ];

    let qNum = 16;
    part6Sets.forEach(set => {
      set.questions.forEach(item => {
        qs.push({ id: `trwb1_q${qNum}`, partNumber: 2, partTitle: "Reading Part 6: Text Completion", section: "READING", passageText: set.passage, questionText: `Question ${qNum}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
        qNum++;
      });
    });

    // =========================================================================
    // READING PART 7: Reading Comprehension (Q24-Q50)
    // =========================================================================
    const part7Sets = [
      {
        passage: `COMMERCIAL CROSS-BORDER E-COMMERCE FULFILMENT AGREEMENT\n\nBetween: Apex Logistics Worldwide (Provider)\nAnd: Nordic Distribution Hub AS (Client)\nDate: March 15, 2026\n\nScope of Services: Turnkey fulfilment including warehousing, pick-and-pack operations, customs clearance automation, and last-mile delivery across Denmark, Sweden, Norway, and Finland.\n\nContract Term: 3 years from the effective date, with mandatory annual performance audits conducted by an independent third-party logistics assessor.\n\nPricing: Tiered volume-based pricing. Orders below 10,000 units monthly: $4.50 per unit. Orders between 10,000 and 50,000 units: $3.75 per unit. Orders exceeding 50,000 units: $2.90 per unit.\n\nService Level Agreement: 99.2% order accuracy rate. Maximum 48-hour dispatch-to-delivery within Scandinavian metropolitan areas. Real-time inventory visibility through API integration.\n\nTermination Clause: Either party may terminate with 90 days written notice. Early termination incurs a penalty of 15% of remaining contract value.`,
        questions: [
          { q: "What is the contract term?", opts: [{ key: "A", text: "1 year renewable" }, { key: "B", text: "2 years" }, { key: "C", text: "5 years" }, { key: "D", text: "3 years with annual audits" }], a: "D", exp: "Thoi han: '3 years... with mandatory annual performance audits'." },
          { q: "What is the per-unit price for orders exceeding 50,000 units?", opts: [{ key: "A", text: "$2.90" }, { key: "B", text: "$3.75" }, { key: "C", text: "$4.50" }, { key: "D", text: "$5.25" }], a: "A", exp: "Gia: 'Orders exceeding 50,000 units: $2.90 per unit'." },
          { q: "What order accuracy rate is guaranteed?", opts: [{ key: "A", text: "95.0%" }, { key: "B", text: "99.2%" }, { key: "C", text: "97.5%" }, { key: "D", text: "100%" }], a: "B", exp: "SLA: '99.2% order accuracy rate'." },
          { q: "What is the maximum delivery time within metropolitan areas?", opts: [{ key: "A", text: "24 hours" }, { key: "B", text: "72 hours" }, { key: "C", text: "48 hours" }, { key: "D", text: "5 business days" }], a: "C", exp: "Thoi gian: 'Maximum 48-hour dispatch-to-delivery'." },
          { q: "What early termination penalty applies?", opts: [{ key: "A", text: "5% of remaining value" }, { key: "B", text: "10% of remaining value" }, { key: "C", text: "25% of remaining value" }, { key: "D", text: "15% of remaining value" }], a: "D", exp: "Phat: '15% of remaining contract value'." }
        ]
      },
      {
        passage: `INTERNAL EMAIL — QUARTERLY SALES PERFORMANCE REVIEW\n\nFrom: Sarah Mitchell, VP of Sales\nTo: Regional Sales Managers\nSubject: Q3 2026 Performance Summary and Q4 Targets\nDate: October 3, 2026\n\nDear Team,\n\nI am pleased to report that our Q3 consolidated revenue reached $47.8 million, representing a 14% year-over-year increase. The APAC region led growth with $18.2 million (up 22%), followed by EMEA at $16.5 million (up 11%), and the Americas at $13.1 million (up 8%).\n\nOur enterprise software segment was the strongest performer, contributing $28.4 million or approximately 59% of total revenue. The professional services division generated $12.7 million, while hardware solutions accounted for the remaining $6.7 million.\n\nFor Q4, I am setting an ambitious consolidated target of $52 million. The APAC team should target $20 million given the strong pipeline of enterprise deals in Japan and Australia. EMEA should aim for $18 million with focus on the UK public sector tender. Americas should target $14 million.\n\nPlease schedule individual pipeline review meetings with me before October 15th.\n\nRegards,\nSarah Mitchell`,
        questions: [
          { q: "What was Q3 consolidated revenue?", opts: [{ key: "A", text: "$47.8 million" }, { key: "B", text: "$38.5 million" }, { key: "C", text: "$42.3 million" }, { key: "D", text: "$52.0 million" }], a: "A", exp: "Doanh thu Q3: '$47.8 million'. Bay: D la muc tieu Q4." },
          { q: "Which region had the highest growth rate?", opts: [{ key: "A", text: "EMEA with 11%" }, { key: "B", text: "APAC with 22%" }, { key: "C", text: "Americas with 8%" }, { key: "D", text: "All regions grew equally" }], a: "B", exp: "Tang truong: 'APAC region led growth... up 22%'." },
          { q: "What percentage of revenue came from enterprise software?", opts: [{ key: "A", text: "42%" }, { key: "B", text: "67%" }, { key: "C", text: "59%" }, { key: "D", text: "73%" }], a: "C", exp: "Ty le: 'approximately 59% of total revenue'." },
          { q: "What is the Q4 consolidated target?", opts: [{ key: "A", text: "$47.8 million" }, { key: "B", text: "$50 million" }, { key: "C", text: "$55 million" }, { key: "D", text: "$52 million" }], a: "D", exp: "Muc tieu: 'ambitious consolidated target of $52 million'." },
          { q: "By when must pipeline reviews be scheduled?", opts: [{ key: "A", text: "October 15th" }, { key: "B", text: "October 3rd" }, { key: "C", text: "October 10th" }, { key: "D", text: "October 31st" }], a: "A", exp: "Han: 'before October 15th'." }
        ]
      },
      {
        passage: `JOB ADVERTISEMENT — SENIOR SUPPLY CHAIN ANALYST\n\nCompany: GlobalTech Manufacturing Inc.\nLocation: Singapore Regional Headquarters\nSalary: SGD 8,500 - 11,000 monthly (commensurate with experience)\nEmployment Type: Permanent, Full-Time\n\nResponsibilities:\n- Analyse and optimize end-to-end supply chain operations across 14 manufacturing facilities in 8 countries\n- Develop predictive demand forecasting models using SAP IBP and Python-based machine learning algorithms\n- Negotiate contracts with tier-1 and tier-2 component suppliers to achieve minimum 8% annual cost reduction\n- Lead cross-functional teams of 12-15 procurement and logistics professionals\n- Present quarterly supply chain performance dashboards to C-suite executives\n\nRequirements:\n- Bachelor's degree in Supply Chain Management, Industrial Engineering, or related field (Master's preferred)\n- Minimum 7 years of progressive experience in manufacturing supply chain operations\n- APICS CSCP or CPIM certification required\n- Advanced proficiency in SAP S/4HANA, Tableau, and SQL\n- Fluency in English; Mandarin proficiency is a strong advantage\n\nBenefits: 22 days annual leave, comprehensive medical insurance, annual performance bonus up to 20% of base salary, professional development budget of SGD 3,000 annually.\n\nApplication Deadline: November 22, 2026`,
        questions: [
          { q: "How many manufacturing facilities does the role oversee?", opts: [{ key: "A", text: "8 facilities" }, { key: "B", text: "14 facilities" }, { key: "C", text: "12 facilities" }, { key: "D", text: "20 facilities" }], a: "B", exp: "So nha may: '14 manufacturing facilities in 8 countries'." },
          { q: "What minimum cost reduction target must be achieved?", opts: [{ key: "A", text: "5% annually" }, { key: "B", text: "12% annually" }, { key: "C", text: "8% annually" }, { key: "D", text: "15% annually" }], a: "C", exp: "Muc tieu: 'minimum 8% annual cost reduction'." },
          { q: "What certification is required?", opts: [{ key: "A", text: "PMP certification" }, { key: "B", text: "Six Sigma Black Belt" }, { key: "C", text: "CFA Level 2" }, { key: "D", text: "APICS CSCP or CPIM" }], a: "D", exp: "Chung chi: 'APICS CSCP or CPIM certification required'." },
          { q: "How many years of experience are required?", opts: [{ key: "A", text: "7 years" }, { key: "B", text: "3 years" }, { key: "C", text: "5 years" }, { key: "D", text: "10 years" }], a: "A", exp: "Kinh nghiem: 'Minimum 7 years'." },
          { q: "What is the maximum performance bonus?", opts: [{ key: "A", text: "10% of base salary" }, { key: "B", text: "20% of base salary" }, { key: "C", text: "15% of base salary" }, { key: "D", text: "25% of base salary" }], a: "B", exp: "Thuong: 'up to 20% of base salary'." }
        ]
      },
      {
        passage: `PRESS RELEASE — SUSTAINABILITY PARTNERSHIP ANNOUNCEMENT\n\nSINGAPORE, October 1, 2026 — Apex Clean Energy Solutions and Pacific Rim Shipping Corporation today announced a landmark 10-year strategic partnership valued at approximately USD 340 million to decarbonize Pacific Rim's entire fleet of 85 container vessels.\n\nUnder the agreement, Apex will design, manufacture, and install hybrid hydrogen-electric propulsion systems across all 85 vessels by 2032. The conversion is expected to reduce fleet carbon emissions by 65%, equivalent to removing 420,000 passenger vehicles from the road annually.\n\n"This partnership represents the largest maritime decarbonization initiative in Southeast Asian history," said CEO David Chen. "Pacific Rim will become the first major Asian shipping line to achieve IMO 2050 emissions targets ahead of schedule."\n\nThe project will create approximately 2,800 new engineering and manufacturing jobs across shipyard facilities in Singapore, Vietnam, and the Philippines. Phase 1, covering 25 vessels, will commence in Q1 2027 with completion targeted for Q4 2028.\n\nFinancing is secured through a consortium of green bonds underwritten by Deutsche Bank and OCBC Bank, with additional support from the Asian Development Bank's Clean Energy Fund.`,
        questions: [
          { q: "What is the total value of the partnership?", opts: [{ key: "A", text: "USD 150 million" }, { key: "B", text: "USD 240 million" }, { key: "C", text: "USD 340 million" }, { key: "D", text: "USD 500 million" }], a: "C", exp: "Gia tri: 'valued at approximately USD 340 million'." },
          { q: "How many container vessels will be converted?", opts: [{ key: "A", text: "25 vessels" }, { key: "B", text: "50 vessels" }, { key: "C", text: "120 vessels" }, { key: "D", text: "85 vessels" }], a: "D", exp: "So tau: 'entire fleet of 85 container vessels'. Bay: A la Phase 1." },
          { q: "By what percentage will carbon emissions be reduced?", opts: [{ key: "A", text: "65%" }, { key: "B", text: "40%" }, { key: "C", text: "50%" }, { key: "D", text: "80%" }], a: "A", exp: "Giam phat thai: 'reduce fleet carbon emissions by 65%'." },
          { q: "How many new jobs will be created?", opts: [{ key: "A", text: "800 jobs" }, { key: "B", text: "2,800 jobs" }, { key: "C", text: "1,500 jobs" }, { key: "D", text: "5,000 jobs" }], a: "B", exp: "Viec lam: 'approximately 2,800 new engineering and manufacturing jobs'." },
          { q: "How many vessels are in Phase 1?", opts: [{ key: "A", text: "15 vessels" }, { key: "B", text: "40 vessels" }, { key: "C", text: "25 vessels" }, { key: "D", text: "85 vessels" }], a: "C", exp: "Phase 1: 'covering 25 vessels'." },
          { q: "When will Phase 1 commence?", opts: [{ key: "A", text: "Q1 2026" }, { key: "B", text: "Q1 2028" }, { key: "C", text: "Q1 2030" }, { key: "D", text: "Q1 2027" }], a: "D", exp: "Bat dau: 'commence in Q1 2027'." },
          { q: "Which banks are underwriting the green bonds?", opts: [{ key: "A", text: "Deutsche Bank and OCBC Bank" }, { key: "B", text: "HSBC and Citibank" }, { key: "C", text: "Goldman Sachs and Morgan Stanley" }, { key: "D", text: "DBS and UOB" }], a: "A", exp: "Ngan hang: 'Deutsche Bank and OCBC Bank'." }
        ]
      },
      {
        passage: `CONFERENCE REGISTRATION FORM — ASEAN DIGITAL TRANSFORMATION SUMMIT 2026\n\nVenue: Marina Bay Sands Convention Centre, Singapore\nDates: November 18-20, 2026\n\nRegistration Tiers:\n- Early Bird (before October 1): SGD 890 per delegate\n- Standard (October 1 - November 1): SGD 1,250 per delegate\n- On-site (November 18-20): SGD 1,600 per delegate\n- Academic/Student: SGD 450 per delegate (valid university ID required)\n\nGroup Discount: Organizations registering 5 or more delegates receive 15% off the applicable tier price.\n\nInclusions: All keynote sessions, 3 breakout workshop tracks, networking lunches, exhibition hall access, and digital conference proceedings.\n\nAccommodation: Preferential rates at Marina Bay Sands Hotel: SGD 380 per night (Superior Room) or SGD 520 per night (Premier Suite). Quote booking code ASEAN-DTS-2026.\n\nCancellation Policy: Full refund if cancelled 30 days before the event. 50% refund for cancellations within 15-29 days. No refunds within 14 days of the event.\n\nContact: events@aseandigitalsummit.sg | +65 6789 0123`,
        questions: [
          { q: "What is the early bird registration fee?", opts: [{ key: "A", text: "SGD 450" }, { key: "B", text: "SGD 890" }, { key: "C", text: "SGD 1,250" }, { key: "D", text: "SGD 1,600" }], a: "B", exp: "Phi: 'Early Bird: SGD 890 per delegate'. Bay: A la gia sinh vien." },
          { q: "What group discount is available?", opts: [{ key: "A", text: "5% off for 3+ delegates" }, { key: "B", text: "10% off for 4+ delegates" }, { key: "C", text: "15% off for 5+ delegates" }, { key: "D", text: "20% off for 10+ delegates" }], a: "C", exp: "Giam gia: '5 or more delegates receive 15% off'." },
          { q: "What is the nightly rate for the Premier Suite?", opts: [{ key: "A", text: "SGD 280" }, { key: "B", text: "SGD 380" }, { key: "C", text: "SGD 680" }, { key: "D", text: "SGD 520" }], a: "D", exp: "Gia phong: 'SGD 520 per night (Premier Suite)'. Bay: B la Superior." },
          { q: "When is the deadline for a full refund?", opts: [{ key: "A", text: "30 days before" }, { key: "B", text: "14 days before" }, { key: "C", text: "20 days before" }, { key: "D", text: "45 days before" }], a: "A", exp: "Hoan tien: 'Full refund if cancelled 30 days before'." },
          { q: "How many breakout workshop tracks are included?", opts: [{ key: "A", text: "1 track" }, { key: "B", text: "3 tracks" }, { key: "C", text: "2 tracks" }, { key: "D", text: "5 tracks" }], a: "B", exp: "Workshop: '3 breakout workshop tracks'." }
        ]
      }
    ];

    let p7Num = 24;
    part7Sets.forEach(set => {
      set.questions.forEach(item => {
        qs.push({ id: `trwb1_q${p7Num}`, partNumber: 3, partTitle: "Reading Part 7: Reading Comprehension", section: "READING", passageText: set.passage, questionText: `Question ${p7Num}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
        p7Num++;
      });
    });

    // =========================================================================
    // WRITING: 8 Questions (Q51-Q58)
    // =========================================================================
    const writeItems = [
      { id: "trwb1_q51", title: "Write a Sentence (Photo Description)", prompt: "Write ONE sentence using the words 'engineer' and 'calibrate'.", sample: "The precision engineer is carefully calibrating the electronic pressure sensors in the sterile cleanroom.", minWords: 8 },
      { id: "trwb1_q52", title: "Write a Sentence (Photo Description)", prompt: "Write ONE sentence using the words 'pallet' and 'warehouse'.", sample: "Heavy wooden pallets loaded with imported automotive components are being systematically arranged inside the automated distribution warehouse.", minWords: 8 },
      { id: "trwb1_q53", title: "Write a Sentence (Photo Description)", prompt: "Write ONE sentence using the words 'director' and 'report'.", sample: "The finance director is reviewing the quarterly consolidated sales report with members of the executive board.", minWords: 8 },
      { id: "trwb1_q54", title: "Write a Sentence (Photo Description)", prompt: "Write ONE sentence using the words 'solar panel' and 'install'.", sample: "Certified technicians are installing high-efficiency monocrystalline solar panels on the sloped industrial rooftop.", minWords: 8 },
      { id: "trwb1_q55", title: "Write a Sentence (Photo Description)", prompt: "Write ONE sentence using the words 'receptionist' and 'greet'.", sample: "The multilingual corporate receptionist warmly greets international delegates arriving for the annual shareholders' meeting in the marble lobby.", minWords: 8 },
      { id: "trwb1_q56", title: "Respond to Email (MEMS Sensor Supply Inquiry)", prompt: "Direction: Read the email from a client inquiring about micro-electromechanical system (MEMS) sensor delivery timelines. In your response, explain TWO key technical specifications of the sensors and ask ONE clarifying question about the required quantity.\n\nOriginal Email:\n'Dear Supplier, We are considering placing a bulk order for your MEMS pressure sensors for integration into our automotive safety systems. Could you provide delivery timeline estimates and key specifications? Best regards, Mr. James Rodriguez, Chief Procurement Officer'", sample: "Dear Mr. Rodriguez,\n\nThank you for your interest in our MEMS pressure sensor product line. Our flagship PS-4200 model features a measurement range of 0 to 1,000 kilopascals with an industry-leading accuracy tolerance of plus or minus 0.25 percent of full scale. The sensors incorporate titanium-nitride corrosion-resistant diaphragms rated for continuous operation at temperatures between negative 40 and positive 150 degrees Celsius.\n\nStandard production lead time is 6 to 8 weeks for orders up to 10,000 units. Could you please confirm whether your anticipated order volume falls within this range, or should we prepare a quotation for higher-volume pricing tiers?\n\nBest regards,\nTechnical Sales Department", minWords: 80 },
      { id: "trwb1_q57", title: "Respond to Email (Contract Price Negotiation)", prompt: "Direction: Read the email from a procurement manager requesting a bulk pricing discount. In your response, offer a specific discount percentage, state the minimum order quantity, and propose a meeting date to finalize terms.\n\nOriginal Email:\n'Dear Sales Team, We have been purchasing your industrial valve components for three years. Given our consistent order history, we would like to discuss volume-based pricing adjustments for our upcoming annual contract renewal. Regards, Ms. Emily Sterling, Procurement Director'", sample: "Dear Ms. Sterling,\n\nThank you for your continued partnership over the past three years. In recognition of your loyalty and consistent order volumes, we are pleased to offer a 10 percent discount on all industrial valve component orders exceeding 5,000 units per quarter.\n\nFor orders exceeding 15,000 units per quarter, we can extend an additional 3 percent discount, bringing the total reduction to 13 percent. Would you be available to meet at our regional office on Thursday, November 14th at 2:00 PM to discuss the specific terms and finalize the annual contract framework?\n\nWe look forward to strengthening our partnership.\n\nBest regards,\nKey Account Management Team", minWords: 80 },
      { id: "trwb1_q58", title: "Opinion Essay (Enterprise Digital Transformation)", prompt: "Do you agree or disagree that companies must continuously invest in digital transformation to remain competitive in the modern global marketplace? Support your opinion with specific reasons and real-world examples. Write at least 300 words.", sample: "In the contemporary global business landscape, relentless technological innovation has transformed digital transformation from an optional competitive advantage into an existential imperative for corporate survival. I strongly agree that companies must continuously invest in digitalization, and I will support this position with three compelling arguments.\n\nFirst and foremost, consumer expectations have fundamentally shifted toward digital-first interactions. Companies that fail to offer seamless e-commerce platforms, mobile applications, and AI-powered customer service risk losing market share to digitally native competitors. Amazon's displacement of traditional brick-and-mortar retailers serves as a stark cautionary tale: between 2015 and 2023, over 12,000 physical retail stores in the United States closed permanently, largely because they failed to adapt to digital commerce.\n\nSecondly, operational efficiency gains from digital transformation directly impact profitability. Cloud computing, robotic process automation, and enterprise resource planning systems enable companies to reduce operational costs by 20 to 30 percent while simultaneously improving accuracy and speed. For example, Toyota's implementation of IoT sensors across its manufacturing lines reduced equipment downtime by 45 percent and saved an estimated 500 million dollars annually.\n\nFinally, data-driven decision-making has become the cornerstone of competitive strategy. Companies leveraging artificial intelligence and big data analytics can identify market trends, predict consumer behavior, and optimize supply chains with unprecedented precision. Netflix's recommendation algorithm, which drives 80 percent of viewer engagement, exemplifies how data intelligence creates insurmountable competitive moats.\n\nIn conclusion, continuous digital investment is no longer discretionary but essential for survival. Companies that embrace technological transformation will thrive, while those that resist will inevitably face obsolescence in an increasingly digitized global economy.", minWords: 300 }
    ];

    writeItems.forEach((wItem, idx) => {
      qs.push({
        id: wItem.id,
        partNumber: 4,
        partTitle: `TOEIC Writing: ${wItem.title}`,
        section: "WRITING",
        writingPrompt: wItem.prompt,
        minWordCount: wItem.minWords,
        sampleEssay: wItem.sample,
        questionText: `Question ${51 + idx}: ${wItem.title}`,
        options: [
            { key: "A", text: "Submit for AI Evaluation" },
            { key: "B", text: "View Writing Template" },
            { key: "C", text: "Check Business Vocabulary" }
          ],
        correctAnswer: "A",
        explanation: "Hoan thanh phan thi Viet AI dat chuan thang diem ETS TOEIC Writing."
      });
    });

    return qs;
  })()
};
