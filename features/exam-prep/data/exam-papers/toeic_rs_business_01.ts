import { ExamPaper, ExamQuestion } from "./types";

export const toeicRsBusiness01Paper: ExamPaper = {
  id: "toeic_rs_business_01",
  title: "TOEIC Reading & Speaking Professional Duo #01",
  type: "TOEIC_LR",
  level: "Advanced",
  timeLimitMinutes: 65,
  totalQuestions: 61,
  maxScore: 695,
  description: "Tron bo ket hop 2 Ky nang Doc & Noi AI (Reading & Speaking Professional Duo): 50 cau Reading Parts 5-7 (Bao cao ESG, Chuoi cung ung xanh, Bao hiem nhan su) va 11 cau Speaking AI chuan ETS TOEIC 2026.",
  categoryBadge: "ETS TOEIC R&S",
  tags: ["TOEIC", "Reading & Speaking", "AI Studio"],
  supportedSkills: ["READING", "SPEAKING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
    // READING PART 5: Incomplete Sentences (Q1-Q15)
    // =========================================================================
    const part5Qs = [
      { q: "The corporate sustainability director presented a comprehensive strategy to _______ greenhouse gas emissions across all supply chain tiers.", opts: [{ key: "A", text: "reduce" }, { key: "B", text: "reduction" }, { key: "C", text: "reductive" }, { key: "D", text: "reduced" }], a: "A", exp: "Sau 'to' chi muc dich can dong tu nguyen mau 'reduce'." },
      { q: "The accounting department must ensure that all financial statements are prepared in _______ with International Financial Reporting Standards.", opts: [{ key: "A", text: "accord" }, { key: "B", text: "accordance" }, { key: "C", text: "according" }, { key: "D", text: "accordingly" }], a: "B", exp: "'In accordance with' la cum gioi tu co dinh." },
      { q: "The newly appointed operations manager has _______ exceeded performance benchmarks since joining the company in January.", opts: [{ key: "A", text: "consistent" }, { key: "B", text: "consistency" }, { key: "C", text: "consistently" }, { key: "D", text: "consist" }], a: "C", exp: "Can trang tu 'consistently' bo nghia cho dong tu 'exceeded'." },
      { q: "Due to _______ demand from enterprise clients, the product launch has been accelerated by two weeks.", opts: [{ key: "A", text: "overwhelm" }, { key: "B", text: "overwhelmed" }, { key: "C", text: "overwhelmingly" }, { key: "D", text: "overwhelming" }], a: "D", exp: "Can tinh tu 'overwhelming' bo nghia cho 'demand'." },
      { q: "The research and development budget for the upcoming fiscal year represents a _______ increase compared to the previous allocation.", opts: [{ key: "A", text: "substantial" }, { key: "B", text: "substance" }, { key: "C", text: "substantially" }, { key: "D", text: "substantiate" }], a: "A", exp: "Can tinh tu 'substantial' bo nghia cho 'increase'." },
      { q: "All branch managers are _______ for ensuring that workplace safety protocols are strictly followed.", opts: [{ key: "A", text: "response" }, { key: "B", text: "responsible" }, { key: "C", text: "responsibly" }, { key: "D", text: "responsibility" }], a: "B", exp: "'Are responsible for' la cau truc chuan." },
      { q: "The engineering team completed the prototype _______ than originally anticipated, allowing extra time for comprehensive testing.", opts: [{ key: "A", text: "soon" }, { key: "B", text: "soonest" }, { key: "C", text: "sooner" }, { key: "D", text: "soonly" }], a: "C", exp: "'Sooner than' - so sanh hon voi 'than'." },
      { q: "_______ the economic uncertainty in European markets, our overseas subsidiaries have maintained stable profit margins.", opts: [{ key: "A", text: "Because of" }, { key: "B", text: "Due to" }, { key: "C", text: "As a result of" }, { key: "D", text: "Despite" }], a: "D", exp: "'Despite' (mac du) + danh tu chi su tuong phan." },
      { q: "Customers who purchase annual subscriptions will receive _______ access to all premium features and priority technical support.", opts: [{ key: "A", text: "unrestricted" }, { key: "B", text: "restrict" }, { key: "C", text: "restriction" }, { key: "D", text: "restrictive" }], a: "A", exp: "'Unrestricted access' - tinh tu bo nghia cho 'access'." },
      { q: "The warehouse logistics team must coordinate _______ with the shipping department to prevent delivery delays.", opts: [{ key: "A", text: "close" }, { key: "B", text: "closely" }, { key: "C", text: "closeness" }, { key: "D", text: "closed" }], a: "B", exp: "Can trang tu 'closely' bo nghia cho dong tu 'coordinate'." },
      { q: "The board of directors has approved the _______ of a new regional distribution centre in Ho Chi Minh City.", opts: [{ key: "A", text: "establish" }, { key: "B", text: "established" }, { key: "C", text: "establishment" }, { key: "D", text: "establishing" }], a: "C", exp: "Can danh tu 'establishment' lam tan ngu cho 'approved the'." },
      { q: "Please be informed that the office renovation project is _______ progressing and will be completed ahead of schedule.", opts: [{ key: "A", text: "steady" }, { key: "B", text: "steadiness" }, { key: "C", text: "steadied" }, { key: "D", text: "steadily" }], a: "D", exp: "Can trang tu 'steadily' bo nghia cho 'progressing'." },
      { q: "The training programme is specifically designed for employees who are _______ promoted to supervisory positions.", opts: [{ key: "A", text: "newly" }, { key: "B", text: "new" }, { key: "C", text: "newer" }, { key: "D", text: "newest" }], a: "A", exp: "Can trang tu 'newly' bo nghia cho 'promoted'." },
      { q: "The client's legal representatives have requested _______ documentation of all project milestone deliverables.", opts: [{ key: "A", text: "thoroughly" }, { key: "B", text: "thorough" }, { key: "C", text: "thoroughness" }, { key: "D", text: "thoroughs" }], a: "B", exp: "Can tinh tu 'thorough' bo nghia cho 'documentation'." },
      { q: "The marketing division has developed an innovative campaign _______ at increasing brand visibility among Generation Z consumers.", opts: [{ key: "A", text: "aim" }, { key: "B", text: "aiming" }, { key: "C", text: "aimed" }, { key: "D", text: "aims" }], a: "C", exp: "'Aimed at' la cau truc chuan (campaign aimed at...)." }
    ];

    part5Qs.forEach((item, idx) => {
      qs.push({ id: `trsc1_q${idx + 1}`, partNumber: 1, partTitle: "Reading Part 5: Incomplete Sentences", section: "READING", questionText: `Question ${idx + 1}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // READING PART 6: Text Completion (Q16-Q23)
    // =========================================================================
    const part6Sets = [
      {
        passage: `CORPORATE ESG REPORT ANNOUNCEMENT\n\nApex Holdings Annual Environmental, Social, and Governance Report 2025\n\nWe are proud to announce that Apex Holdings has _______ (Q16) carbon-neutral certification for all global corporate facilities for the third consecutive year. Our greenhouse gas emissions have been _______ (Q17) by 42 percent since our baseline year of 2018. This achievement reflects our _______ (Q18) commitment to environmental stewardship. We invite all stakeholders to review the complete 180-page report, which is now _______ (Q19) for download on our investor relations portal.`,
        questions: [
          { q: "Q16: Select the best word.", opts: [{ key: "A", text: "achieve" }, { key: "B", text: "achieving" }, { key: "C", text: "achievement" }, { key: "D", text: "achieved" }], a: "D", exp: "'Has achieved' - thi hien tai hoan thanh." },
          { q: "Q17: Select the best word.", opts: [{ key: "A", text: "reduced" }, { key: "B", text: "reduce" }, { key: "C", text: "reducing" }, { key: "D", text: "reduction" }], a: "A", exp: "'Have been reduced' - bi dong hoan thanh." },
          { q: "Q18: Select the best word.", opts: [{ key: "A", text: "waver" }, { key: "B", text: "unwavering" }, { key: "C", text: "wavering" }, { key: "D", text: "waveringly" }], a: "B", exp: "'Unwavering commitment' - cam ket khong lay chuyen." },
          { q: "Q19: Select the best word.", opts: [{ key: "A", text: "avail" }, { key: "B", text: "availability" }, { key: "C", text: "available" }, { key: "D", text: "availing" }], a: "C", exp: "'Is now available for download' - tinh tu bo ngu." }
        ]
      },
      {
        passage: `EMPLOYEE ONBOARDING NOTICE\n\nDear New Team Members,\n\nWelcome to GlobalTech Manufacturing. Your first week will include a _______ (Q20) orientation programme covering company policies, safety protocols, and departmental introductions. All new employees must complete the mandatory cybersecurity awareness training _______ (Q21) their first five business days. Your employee ID badges will be _______ (Q22) at the Security Office on Level 1. Please arrive _______ (Q23) 8:30 AM on your first day for registration.\n\nHuman Resources Department`,
        questions: [
          { q: "Q20: Select the best word.", opts: [{ key: "A", text: "comprehend" }, { key: "B", text: "comprehension" }, { key: "C", text: "comprehensively" }, { key: "D", text: "comprehensive" }], a: "D", exp: "'Comprehensive orientation programme' - tinh tu bo nghia." },
          { q: "Q21: Select the best word.", opts: [{ key: "A", text: "within" }, { key: "B", text: "among" }, { key: "C", text: "between" }, { key: "D", text: "throughout" }], a: "A", exp: "'Within their first five business days' - trong vong." },
          { q: "Q22: Select the best word.", opts: [{ key: "A", text: "issue" }, { key: "B", text: "issued" }, { key: "C", text: "issuing" }, { key: "D", text: "issuance" }], a: "B", exp: "'Will be issued' - bi dong tuong lai." },
          { q: "Q23: Select the best word.", opts: [{ key: "A", text: "at" }, { key: "B", text: "in" }, { key: "C", text: "by" }, { key: "D", text: "on" }], a: "C", exp: "'Arrive by 8:30 AM' - den truoc thoi diem cu the." }
        ]
      }
    ];

    let p6Num = 16;
    part6Sets.forEach(set => {
      set.questions.forEach(item => {
        qs.push({ id: `trsc1_q${p6Num}`, partNumber: 2, partTitle: "Reading Part 6: Text Completion", section: "READING", passageText: set.passage, questionText: `Question ${p6Num}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
        p6Num++;
      });
    });

    // =========================================================================
    // READING PART 7: Reading Comprehension (Q24-Q50)
    // =========================================================================
    const part7Sets = [
      {
        passage: `COMMERCIAL ROOFTOP SOLAR POWER PURCHASE AGREEMENT\n\nProvider: Apex Clean Energy Solutions Pte. Ltd.\nClient: Global Tech Headquarters, Singapore\nAgreement Date: September 1, 2026\n\nSystem Specifications:\n- Installed capacity: 500 kilowatt commercial rooftop photovoltaic system\n- Panel type: Monocrystalline silicon, 22.5% conversion efficiency\n- Estimated annual power output: 750,000 kilowatt-hours\n- Expected system lifespan: 25 years with performance warranty\n\nFinancial Terms:\n- Power purchase rate: SGD 0.12 per kilowatt-hour (fixed for 10 years)\n- Estimated annual savings: SGD 90,000 compared to grid electricity rates\n- Installation cost: Fully funded by Apex (zero upfront capital from client)\n- Revenue sharing: Client receives 100% of excess energy sold back to the grid\n\nMaintenance: Quarterly panel cleaning and annual inverter inspection included at no additional cost.\n\nTermination: 30-day written notice required. Early termination before Year 5 incurs equipment removal fee of SGD 45,000.`,
        questions: [
          { q: "What is the installed capacity of the solar system?", opts: [{ key: "A", text: "250 kilowatts" }, { key: "B", text: "750 kilowatts" }, { key: "C", text: "1,000 kilowatts" }, { key: "D", text: "500 kilowatts" }], a: "D", exp: "Cong suat: '500 kilowatt'." },
          { q: "What is the annual power output estimate?", opts: [{ key: "A", text: "750,000 kWh" }, { key: "B", text: "500,000 kWh" }, { key: "C", text: "1,000,000 kWh" }, { key: "D", text: "1,500,000 kWh" }], a: "A", exp: "San luong: '750,000 kilowatt-hours'." },
          { q: "What is the power purchase rate?", opts: [{ key: "A", text: "SGD 0.08/kWh" }, { key: "B", text: "SGD 0.12/kWh" }, { key: "C", text: "SGD 0.18/kWh" }, { key: "D", text: "SGD 0.25/kWh" }], a: "B", exp: "Gia: 'SGD 0.12 per kilowatt-hour'." },
          { q: "What is the estimated annual savings?", opts: [{ key: "A", text: "SGD 45,000" }, { key: "B", text: "SGD 65,000" }, { key: "C", text: "SGD 90,000" }, { key: "D", text: "SGD 120,000" }], a: "C", exp: "Tiet kiem: 'SGD 90,000'. Bay: A la phi huy bo." },
          { q: "What is the early termination fee before Year 5?", opts: [{ key: "A", text: "SGD 25,000" }, { key: "B", text: "SGD 35,000" }, { key: "C", text: "SGD 60,000" }, { key: "D", text: "SGD 45,000" }], a: "D", exp: "Phi huy: 'SGD 45,000'." }
        ]
      },
      {
        passage: `GREEN SUPPLY CHAIN AUDIT REPORT\n\nClient: Nordic Textiles AB\nAuditor: CleanChain Verification Services\nAudit Period: Q1-Q2 2026\n\nExecutive Summary:\nNordic Textiles' supply chain comprises 47 tier-1 suppliers across 12 countries. Our comprehensive audit assessed environmental compliance, labor standards, and ethical sourcing practices.\n\nKey Findings:\n- 38 of 47 suppliers (81%) met all environmental compliance benchmarks\n- 9 suppliers failed to meet wastewater treatment standards; 4 of these are in Vietnam and 3 in Bangladesh\n- Average carbon footprint per garment unit: 8.2 kg CO2 equivalent (industry average: 10.5 kg)\n- 92% of cotton sourcing is certified organic or Better Cotton Initiative (BCI)\n- Child labor violations: Zero confirmed cases across all tiers\n\nRecommendations:\n1. Provide technical assistance to the 9 non-compliant suppliers within 90 days\n2. Transition remaining 8% of cotton sourcing to certified organic by Q4 2027\n3. Implement blockchain-based traceability for all raw material procurement`,
        questions: [
          { q: "How many tier-1 suppliers does Nordic Textiles have?", opts: [{ key: "A", text: "47 suppliers" }, { key: "B", text: "28 suppliers" }, { key: "C", text: "38 suppliers" }, { key: "D", text: "55 suppliers" }], a: "A", exp: "So nha cung cap: '47 tier-1 suppliers'." },
          { q: "What percentage met environmental benchmarks?", opts: [{ key: "A", text: "72%" }, { key: "B", text: "81%" }, { key: "C", text: "88%" }, { key: "D", text: "92%" }], a: "B", exp: "Ty le: '38 of 47 suppliers (81%)'. Bay: D la ty le bong huu co." },
          { q: "What is the average carbon footprint per garment?", opts: [{ key: "A", text: "5.4 kg CO2" }, { key: "B", text: "10.5 kg CO2" }, { key: "C", text: "8.2 kg CO2" }, { key: "D", text: "12.8 kg CO2" }], a: "C", exp: "Carbon: '8.2 kg CO2 equivalent'. Bay: C la binh quan nganh." },
          { q: "In how many countries does the supply chain operate?", opts: [{ key: "A", text: "8 countries" }, { key: "B", text: "10 countries" }, { key: "C", text: "15 countries" }, { key: "D", text: "12 countries" }], a: "D", exp: "So quoc gia: 'across 12 countries'." },
          { q: "Within how many days must non-compliant suppliers receive assistance?", opts: [{ key: "A", text: "90 days" }, { key: "B", text: "30 days" }, { key: "C", text: "60 days" }, { key: "D", text: "180 days" }], a: "A", exp: "Thoi han: 'within 90 days'." }
        ]
      },
      {
        passage: `EMAIL CHAIN — EMPLOYEE HEALTH INSURANCE ENROLLMENT\n\nFrom: benefits@globaltech.com\nTo: all-employees@globaltech.com\nSubject: Annual Health Insurance Open Enrollment - Action Required\nDate: October 10, 2026\n\nDear Colleagues,\n\nThe annual health insurance open enrollment period runs from October 15 to November 15, 2026. All employees must select or confirm their coverage plan during this window.\n\nAvailable Plans:\n- Basic Plan: Company covers 80% of premium; Employee pays SGD 120/month. Includes outpatient visits (SGD 30 copay), hospitalization (90% coverage), and dental check-ups (2 per year).\n- Premium Plan: Company covers 70% of premium; Employee pays SGD 280/month. Includes all Basic benefits plus specialist referrals (SGD 20 copay), vision care, mental health counselling (12 sessions), and international medical evacuation.\n- Family Extension: Add spouse for SGD 180/month or dependents under 21 for SGD 95/month each.\n\nImportant: Employees who do not make a selection by November 15 will be automatically enrolled in the Basic Plan.\n\nFor questions, contact the Benefits Helpline at ext. 5500 or visit Room 301 during office hours.\n\n---\nReply from: david.chen@globaltech.com\nDate: October 12, 2026\n\nHi Benefits Team,\nI currently have the Basic Plan but would like to upgrade to the Premium Plan and add my spouse. Could you confirm the total monthly cost for this combination?\nThanks, David\n\n---\nReply from: benefits@globaltech.com\nDate: October 12, 2026\n\nHi David,\nThe Premium Plan employee contribution is SGD 280/month. Adding your spouse would be an additional SGD 180/month. Your total monthly contribution would be SGD 460.\nPlease complete the enrollment form by November 15.\nBest regards, Benefits Team`,
        questions: [
          { q: "When does the enrollment period end?", opts: [{ key: "A", text: "October 15" }, { key: "B", text: "November 15" }, { key: "C", text: "October 31" }, { key: "D", text: "December 1" }], a: "B", exp: "Han: 'October 15 to November 15'." },
          { q: "What is the monthly cost of the Basic Plan?", opts: [{ key: "A", text: "SGD 80" }, { key: "B", text: "SGD 180" }, { key: "C", text: "SGD 120" }, { key: "D", text: "SGD 280" }], a: "C", exp: "Phi: 'Employee pays SGD 120/month'. Bay: D la Premium." },
          { q: "How many mental health sessions does the Premium Plan cover?", opts: [{ key: "A", text: "4 sessions" }, { key: "B", text: "8 sessions" }, { key: "C", text: "Unlimited" }, { key: "D", text: "12 sessions" }], a: "D", exp: "Buoi tu van: '12 sessions'." },
          { q: "What happens if employees don't make a selection?", opts: [{ key: "A", text: "They are enrolled in Basic" }, { key: "B", text: "They lose coverage" }, { key: "C", text: "They are enrolled in Premium" }, { key: "D", text: "They must pay full premium" }], a: "A", exp: "Mac dinh: 'automatically enrolled in the Basic Plan'." },
          { q: "What is David's total monthly contribution?", opts: [{ key: "A", text: "SGD 280" }, { key: "B", text: "SGD 460" }, { key: "C", text: "SGD 375" }, { key: "D", text: "SGD 560" }], a: "B", exp: "Tong: 'SGD 280 + SGD 180 = SGD 460'." },
          { q: "How much does it cost to add each dependent under 21?", opts: [{ key: "A", text: "SGD 65/month" }, { key: "B", text: "SGD 120/month" }, { key: "C", text: "SGD 95/month" }, { key: "D", text: "SGD 180/month" }], a: "C", exp: "Phi nguoi phu thuoc: 'SGD 95/month each'. Bay: D la phi vo/chong." },
          { q: "What extension number is the Benefits Helpline?", opts: [{ key: "A", text: "Ext. 4200" }, { key: "B", text: "Ext. 4500" }, { key: "C", text: "Ext. 5200" }, { key: "D", text: "Ext. 5500" }], a: "D", exp: "So may nhanh: 'ext. 5500'." }
        ]
      },
      {
        passage: `PRODUCT RECALL NOTICE\n\nAtlantic Home Appliances Inc.\nNotice Date: September 28, 2026\nProduct: ProChef 3000 Smart Countertop Oven\nModel Numbers Affected: PC3000-A, PC3000-B, PC3000-C\nUnits Affected: Approximately 85,000 units manufactured between January and June 2026\n\nHazard: The internal temperature sensor module may malfunction and fail to regulate heating elements properly, posing a potential fire risk during prolonged use exceeding 2 hours at maximum temperature settings.\n\nIncidents: Atlantic has received 23 consumer reports of overheating, including 4 cases of minor kitchen smoke damage. No injuries have been reported.\n\nConsumer Action Required:\n1. Immediately discontinue use of the affected oven models\n2. Contact our recall hotline at 1-800-555-CHEF (2433) between 8 AM and 8 PM EST\n3. Arrange free in-home inspection and sensor replacement by a certified technician\n4. Alternatively, request a full purchase price refund (proof of purchase required)\n\nEstimated repair timeline: 5-7 business days from initial contact.\n\nWe sincerely apologize for any inconvenience.`,
        questions: [
          { q: "How many units are affected by the recall?", opts: [{ key: "A", text: "85,000" }, { key: "B", text: "23,000" }, { key: "C", text: "45,000" }, { key: "D", text: "120,000" }], a: "A", exp: "So luong: 'Approximately 85,000 units'." },
          { q: "What is the identified hazard?", opts: [{ key: "A", text: "Electrical shock from exposed wiring" }, { key: "B", text: "Temperature sensor malfunction causing fire risk" }, { key: "C", text: "Toxic fume emissions from coating" }, { key: "D", text: "Door latch failure during operation" }], a: "B", exp: "Nguy hiem: 'temperature sensor module may malfunction... fire risk'." },
          { q: "How many overheating incidents have been reported?", opts: [{ key: "A", text: "4 incidents" }, { key: "B", text: "12 incidents" }, { key: "C", text: "23 incidents" }, { key: "D", text: "85 incidents" }], a: "C", exp: "So bao cao: '23 consumer reports of overheating'. Bay: A la so vu hu hong." },
          { q: "What alternatives are offered to consumers?", opts: [{ key: "A", text: "Sensor replacement or store credit" }, { key: "B", text: "Discount on new model only" }, { key: "C", text: "Extended warranty only" }, { key: "D", text: "Free repair or full refund" }], a: "D", exp: "Giai phap: 'free inspection and sensor replacement' hoac 'full purchase price refund'." },
          { q: "What is the estimated repair timeline?", opts: [{ key: "A", text: "5-7 business days" }, { key: "B", text: "1-2 business days" }, { key: "C", text: "3-4 business days" }, { key: "D", text: "10-14 business days" }], a: "A", exp: "Thoi gian: '5-7 business days from initial contact'." }
        ]
      },
      {
        passage: `[DOCUMENT: COMMERCIAL SOLAR LEASE AGREEMENT]\n\nLessor: SunPower Solutions Vietnam Ltd. (District 1, Ho Chi Minh City)\nLessee: Tan Thuan Logistics Hub (District 7, Ho Chi Minh City)\nContract Date: October 15, 2026\n\nAgreement Summary:\nSunPower Solutions agrees to finance, install, and maintain a 2.5-Megawatt rooftop photovoltaic array across Warehouses 4, 5, and 6 at Tan Thuan Logistics Hub.\n\nFinancial & Operating Terms:\n1. Zero Upfront Capital: Lessee incurs zero upfront installation or equipment procurement expense.\n2. Power Purchase Rate: Lessee purchases all generated solar electricity at a fixed discount rate of 18% below the standard EVN commercial grid tariff for a term of 15 years.\n3. System Maintenance: Lessor provides 24/7 remote performance monitoring and biannual panel cleaning at no additional charge.\n4. Guaranteed Uptime: 99.2% annual generation availability factor.\n\nInstallation Timeline: Structural engineering surveys commence November 1, 2026. Panel installation will begin January 5, 2027, with targeted grid synchronization and commercial operation by March 31, 2027.`,
        questions: [
          { q: "What is the total capacity of the planned rooftop solar array?", opts: [{ key: "A", text: "500 Kilowatts" }, { key: "B", text: "2.5-Megawatt rooftop photovoltaic array" }, { key: "C", text: "1.2 Megawatts" }, { key: "D", text: "10 Megawatts" }], a: "B", exp: "Cong suat he thong: '2.5-Megawatt rooftop photovoltaic array'." },
          { q: "What discount rate on electricity does the Lessee receive?", opts: [{ key: "A", text: "5% discount" }, { key: "B", text: "10% discount" }, { key: "C", text: "Fixed discount rate of 18% below EVN tariff" }, { key: "D", text: "50% discount" }], a: "C", exp: "Muc gia uu dai: 'fixed discount rate of 18% below the standard EVN commercial grid tariff'." },
          { q: "How long is the solar lease agreement term?", opts: [{ key: "A", text: "5 years" }, { key: "B", text: "10 years" }, { key: "C", text: "25 years" }, { key: "D", text: "Term of 15 years" }], a: "D", exp: "Thoi han hop dong: 'for a term of 15 years'." },
          { q: "What maintenance services are included at no extra charge?", opts: [{ key: "A", text: "24/7 remote monitoring and biannual panel cleaning" }, { key: "B", text: "Warehouse roof painting" }, { key: "C", text: "Free air conditioning replacement" }, { key: "D", text: "Vehicle fleet refueling" }], a: "A", exp: "Dich vu bao tri bao gom: '24/7 remote performance monitoring and biannual panel cleaning at no additional charge'." },
          { q: "By when is commercial solar operation targeted to begin?", opts: [{ key: "A", text: "November 1, 2026" }, { key: "B", text: "By March 31, 2027" }, { key: "C", text: "January 5, 2027" }, { key: "D", text: "December 2028" }], a: "B", exp: "Thoi diem van hanh thuong mai: 'targeted grid synchronization and commercial operation by March 31, 2027'." }
        ]
      }
    ];

    let p7Num = 24;
    part7Sets.forEach(set => {
      set.questions.forEach(item => {
        qs.push({ id: `trsc1_q${p7Num}`, partNumber: 3, partTitle: "Reading Part 7: Reading Comprehension", section: "READING", passageText: set.passage, questionText: `Question ${p7Num}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
        p7Num++;
      });
    });

    // =========================================================================
    // SPEAKING (11 Questions: Q51-Q61) - Preserved and enriched from original
    // =========================================================================
    const spItems = [
      { id: "trsc1_q51", title: "Read Text Aloud (ESG Press Release)", prompt: "Read the following text aloud clearly and naturally:\n\n'Apex Holdings is proud to release its annual Environmental, Social, and Governance report for the fiscal year 2025. Through aggressive investments in renewable energy infrastructure and carbon offset programmes, our global facilities achieved carbon neutrality eighteen months ahead of our original 2030 target deadline.'", time: 45, prep: 45, exp: "Phat am chinh xac: 'Environmental' /In.vaI.r@n'men.t@l/, 'Governance' /'gVv.@r.n@ns/, 'neutrality' /nju:'traelI.ti/." },
      { id: "trsc1_q52", title: "Read Text Aloud (Green Architecture)", prompt: "Read the following text aloud clearly and naturally:\n\n'The newly constructed Apex Innovation Centre features triple-glazed insulated windows designed to minimize thermal energy loss, an automated rainwater harvesting and filtration system capable of supplying forty percent of the building's water needs, and continuous smart climate control sensors that dynamically adjust heating and cooling based on real-time occupancy data.'", time: 45, prep: 45, exp: "Phat am: 'triple-glazed' /'trI.pl gleIzd/, 'filtration' /fIl'treI.S@n/, 'dynamically' /daI'naemI.kli/." },
      { id: "trsc1_q53", title: "Describe Picture (Green Building)", prompt: "Describe the photograph in detail. You should describe the people, objects, setting, and any activities shown in the image.\n\n[Image: A modern glass-walled office building with a green living wall facade, solar panels on the roof, and employees walking through a landscaped courtyard with native plants.]", time: 30, prep: 45, exp: "Mo ta: chu the (building), chi tiet (living wall, solar panels), hoat dong (employees walking), boi canh (landscaped courtyard)." },
      { id: "trsc1_q54", title: "Describe Picture (Solar Installation)", prompt: "Describe the photograph in detail. You should describe the people, objects, setting, and any activities shown in the image.\n\n[Image: Two technicians wearing safety harnesses and hard hats are installing large photovoltaic solar panels on a factory rooftop, with the city skyline visible in the background.]", time: 30, prep: 45, exp: "Mo ta: nhan vat (technicians, safety gear), hanh dong (installing panels), boi canh (factory rooftop, city skyline)." },
      { id: "trsc1_q55", title: "Respond to Questions (Renewable Energy)", prompt: "Listen to the question and respond:\n\n'Does your home or workplace currently utilize any form of renewable energy, such as solar panels or wind turbines? If not, would you consider installing them in the future?'", time: 15, prep: 3, exp: "Tra loi truc tiep ve trai nghiem ca nhan voi nang luong tai tao." },
      { id: "trsc1_q56", title: "Respond to Questions (Eco Commuting)", prompt: "Listen to the question and respond:\n\n'How do you usually commute to work or school, and what public transit options are available in your area? Do you think your city should invest more in sustainable transportation?'", time: 15, prep: 3, exp: "Tra loi ve phuong tien di chuyen va giao thong cong cong." },
      { id: "trsc1_q57", title: "Respond to Questions (CSR Purchasing)", prompt: "Listen to the question and respond:\n\n'When shopping for products or services, how important is a company's environmental and social responsibility record in influencing your purchasing decisions? Can you give a specific example?'", time: 30, prep: 3, exp: "Tra loi ve anh huong cua CSR den hanh vi mua sam, kem vi du cu the." },
      { id: "trsc1_q58", title: "Schedule Query (Keynote Time)", prompt: "Using the conference schedule below, answer the caller's question.\n\nASEAN ESG SUMMIT - November 18, 2026\n8:30 AM - Registration & Coffee\n9:00 AM - Opening Ceremony\n9:30 AM - Keynote: 'Corporate Sustainability in the AI Era' by Dr. Sarah Lin\n10:30 AM - Coffee Break\n11:00 AM - Panel: Green Supply Chain Innovation\n12:30 PM - Networking Lunch\n2:00 PM - Workshop: Carbon Accounting Fundamentals\n4:00 PM - Closing Remarks\n\nCaller: 'What time does the keynote on corporate sustainability start, and who is the speaker?'", time: 15, prep: 3, exp: "Thong tin: 'The keynote starts at 9:30 AM, presented by Dr. Sarah Lin'." },
      { id: "trsc1_q59", title: "Schedule Query (Workshop Fee)", prompt: "Using the conference schedule and registration information below, answer the caller's question.\n\nAll registered summit delegates receive complimentary access to all keynote sessions, panel discussions, and workshops. Exhibition hall entry is included. Separate registration is required only for the post-summit masterclass on November 19 (additional fee: SGD 250).\n\nCaller: 'Is the green architecture workshop open to all registered summit delegates without extra fees?'", time: 15, prep: 3, exp: "Thong tin: 'Yes, all workshops are included in the summit registration at no extra cost'." },
      { id: "trsc1_q60", title: "Schedule Query (Afternoon Detail)", prompt: "Using the conference schedule, list all sessions scheduled for the afternoon.\n\nASEAN ESG SUMMIT - November 18, 2026\nMorning: Registration, Opening Ceremony, Keynote, Coffee Break, Panel Discussion\nAfternoon:\n2:00 PM - Workshop: Carbon Accounting Fundamentals (Room A)\n2:00 PM - Workshop: ESG Reporting Standards (Room B)\n3:30 PM - Breakout: Renewable Energy Investment Panel (Room A)\n3:30 PM - Breakout: Circular Economy Case Studies (Room B)\n4:30 PM - Closing Remarks & Networking Reception (Main Hall)\n\nCaller: 'Could you list all the panels and breakout sessions scheduled for the afternoon?'", time: 30, prep: 3, exp: "Liet ke 5 su kien buoi chieu theo thu tu thoi gian." },
      { id: "trsc1_q61", title: "Express an Opinion (Solar Panel Mandates)", prompt: "Do you agree or disagree with the following statement?\n\n'Governments should require all newly constructed commercial office buildings to install rooftop solar panels as a mandatory building regulation.'\n\nSupport your opinion with specific reasons and examples. You have 60 seconds to speak.", time: 60, prep: 45, exp: "Framework: Quan diem ro rang + 2 ly do + Vi du cu the + Ket luan.\nMau: 'I strongly agree... First, mandatory solar installation would significantly reduce commercial buildings' reliance on fossil fuel electricity... For example, Singapore's Building and Construction Authority estimates that rooftop solar could meet 25% of commercial energy demand...'" }
    ];

    spItems.forEach((spItem, idx) => {
      qs.push({
        id: spItem.id,
        partNumber: 4,
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
