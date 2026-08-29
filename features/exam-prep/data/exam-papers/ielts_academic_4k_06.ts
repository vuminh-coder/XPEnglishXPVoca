import { ExamPaper, ExamQuestion } from "./types";

export const ieltsAcademic4k06Paper: ExamPaper = {
  id: "ielts_academic_4k_06",
  title: "IELTS Academic Official Test #06",
  type: "IELTS_FULL",
  level: "Advanced",
  timeLimitMinutes: 175,
  totalQuestions: 85,
  maxScore: 9.0,
  description: "Trọn bộ 85 câu hỏi Cambridge chuẩn Band 9.0: 40 câu Listening (San hô Cairns, Lò nhiệt hạch Tokamak Culham, Tế bào CAR-T King's College, Khảo cổ Stonehenge), 40 câu Reading (Pin muối nóng chảy CSP, Siêu trí nhớ HSAM, Sụp đổ văn minh Indus), Speaking AI 3 Part và Writing AI (Sơ đồ nhiệt hạch Tokamak & Luận AGI Safety).",
  categoryBadge: "IELTS Academic",
  tags: ["IELTS", "Academic", "Cambridge Standard", "Band 9.0", "Full Test"],
  supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
    // SECTION 1: Great Barrier Reef Coral Propagation & Research Volunteering (Q1 - Q10)
    // =========================================================================
    const sec1Script =
      "Coordinator: Good morning, Cairns Marine Conservation Station. My name is Liam Gallagher.\n" +
      "Applicant: Hello! I am calling to register for the scientific volunteer coral propagation expedition at Green Island Reef.\n" +
      "Coordinator: Fantastic! Let me take down your volunteer details. Could you state your full name?\n" +
      "Applicant: Yes, my name is Elena Rostova.\n" +
      "Coordinator: Thank you, Elena. And what is your current international contact telephone number?\n" +
      "Applicant: It is +61 7 555 4918.\n" +
      "Coordinator: Excellent. To participate in deep-water coral nursery fragment micro-grafting, do you hold a PADI Advanced Open Water certification?\n" +
      "Applicant: Yes, I completed my rescue diver and Nitrox certification in Sydney last year with over 75 logged ocean dives.\n" +
      "Coordinator: Outstanding. The volunteer placement runs for a duration of three weeks, commencing on Monday, February 9th.\n" +
      "Applicant: What is the subsidized volunteer program fee and what does it include?\n" +
      "Coordinator: The total fee is 1,850 Australian dollars. This covers shared dormitory accommodation on Green Island, all daily meals, boat transfers, and full scuba equipment rental including dive computers and tanks.\n" +
      "Applicant: What specific scientific tasks will we be performing on the reef?\n" +
      "Coordinator: Volunteers will outplant heat-resilient staghorn Acropora coral micro-fragments onto ceramic spider web frames and record benthic line-intercept transect surveys using underwater digital cameras.\n" +
      "Applicant: When is the mandatory orientation and equipment fitting session?\n" +
      "Coordinator: The pre-expedition briefing is scheduled for Sunday, February 8th at 2:00 PM at our Cairns Marina headquarters.";

    const sec1Questions = [
      { q: "What is the volunteer applicant's full name?", opts: [{ key: "A", text: "Emma Watson" }, { key: "B", text: "Elena Rostova" }, { key: "C", text: "Sophia Miller" }, { key: "D", text: "Olivia Taylor" }], a: "B", exp: "Họ tên tình nguyện viên: 'My name is Elena Rostova'." },
      { q: "What is Elena's contact telephone number?", opts: [{ key: "A", text: "+61 7 555 2200" }, { key: "B", text: "+61 7 555 8899" }, { key: "C", text: "+61 7 555 4918" }, { key: "D", text: "+61 7 555 1122" }], a: "C", exp: "Số điện thoại: '+61 7 555 4918'." },
      { q: "What scuba diving credential does Elena possess?", opts: [{ key: "A", text: "Snorkeling certificate only" }, { key: "B", text: "Swimming pool license" }, { key: "C", text: "No diving certification" }, { key: "D", text: "PADI Advanced Open Water, Rescue diver, and Nitrox with 75 logged dives" }], a: "D", exp: "Bằng lặn biển: 'rescue diver and Nitrox certification... over 75 logged ocean dives'." },
      { q: "How long is the coral conservation volunteer placement?", opts: [{ key: "A", text: "Duration of three weeks" }, { key: "B", text: "1 week" }, { key: "C", text: "6 months" }, { key: "D", text: "1 year" }], a: "A", exp: "Thời gian tham gia: 'duration of three weeks'." },
      { q: "When does the expedition officially commence?", opts: [{ key: "A", text: "January 1st" }, { key: "B", text: "Monday, February 9th" }, { key: "C", text: "March 15th" }, { key: "D", text: "April 20th" }], a: "B", exp: "Ngày bắt đầu: 'commencing on Monday, February 9th'." },
      { q: "What is the subsidized volunteer program fee?", opts: [{ key: "A", text: "500 AUD" }, { key: "B", text: "3,000 AUD" }, { key: "C", text: "1,850 Australian dollars" }, { key: "D", text: "5,000 AUD" }], a: "C", exp: "Chi phí tham gia: 'total fee is 1,850 Australian dollars'." },
      { q: "Where will volunteers be accommodated during the expedition?", opts: [{ key: "A", text: "In tents on the mainland" }, { key: "B", text: "On a luxury cruise ship" }, { key: "C", text: "In private beach villas" }, { key: "D", text: "Shared dormitory accommodation on Green Island" }], a: "D", exp: "Nơi ở: 'shared dormitory accommodation on Green Island'." },
      { q: "Which heat-resilient coral genus will volunteers outplant?", opts: [{ key: "A", text: "Heat-resilient staghorn Acropora coral micro-fragments" }, { key: "B", text: "Soft leather coral" }, { key: "C", text: "Mushroom coral" }, { key: "D", text: "Black deep-sea coral" }], a: "A", exp: "Chi san hô ghép nhánh: 'heat-resilient staghorn Acropora coral micro-fragments'." },
      { q: "What structures will the coral fragments be attached to?", opts: [{ key: "A", text: "Plastic bottles" }, { key: "B", text: "Ceramic spider web frames" }, { key: "C", text: "Wooden stakes" }, { key: "D", text: "Concrete blocks" }], a: "B", exp: "Giá thể cấy san hô: 'onto ceramic spider web frames'." },
      { q: "When is the mandatory orientation briefing scheduled?", opts: [{ key: "A", text: "Friday night" }, { key: "B", text: "Monday morning at 6:00 AM" }, { key: "C", text: "Sunday, February 8th at 2:00 PM at Cairns Marina headquarters" }, { key: "D", text: "After the expedition ends" }], a: "C", exp: "Thời gian họp phổ biến: 'Sunday, February 8th at 2:00 PM at our Cairns Marina headquarters'." }
    ];

    sec1Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k6_q${idx + 1}`,
        partNumber: 1,
        partTitle: "Listening Section 1: Cairns Coral Reef Expedition",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
        questionText: `Question ${idx + 1}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // SECTION 2: Guided Tour of the Culham Centre for Fusion Energy (Q11 - Q20)
    // =========================================================================
    const sec2Script =
      "Guide: Welcome to the Culham Centre for Fusion Energy in Oxfordshire. I am Dr. Marcus Vance, senior plasma physicist. Behind the three-meter-thick borated concrete biological radiation shield lies JET—the Joint European Torus. Inside this toroidal magnetic vacuum vessel, we inject gaseous isotopes of hydrogen—deuterium extracted from seawater and tritium bred from lithium. Using fifty megawatts of neutral beam injection and radio-frequency resonance heating, we superheat the gas to 150 million degrees Celsius—ten times hotter than the core of our Sun. At these extreme kinetic energies, electrostatic Coulomb repulsion is overcome, forcing atomic nuclei to fuse into helium, releasing high-energy 14.1 MeV neutrons. These neutrons penetrate the magnetic confinement cage and slam into the beryllium first-wall blanket, transferring their kinetic energy as thermal heat to drive high-pressure supercritical steam turbines. Our next-generation prototype, the Spherical Tokamak for Energy Production (STEP), is currently under development to deliver net electricity directly to the UK National Grid by 2040.";

    const sec2Questions = [
      { q: "What facility is hosting the educational tour?", opts: [{ key: "A", text: "A coal-fired power station" }, { key: "B", text: "A wind turbine blade workshop" }, { key: "C", text: "A solar panel factory" }, { key: "D", text: "Culham Centre for Fusion Energy in Oxfordshire" }], a: "D", exp: "Địa điểm: 'Culham Centre for Fusion Energy in Oxfordshire'." },
      { q: "What hydrogen isotopes are injected into the Tokamak vacuum chamber?", opts: [{ key: "A", text: "Deuterium from seawater and tritium bred from lithium" }, { key: "B", text: "Protium and carbon" }, { key: "C", text: "Helium and nitrogen" }, { key: "D", text: "Uranium and plutonium" }], a: "A", exp: "Đồng đẳng hydro: 'deuterium extracted from seawater and tritium bred from lithium'." },
      { q: "What temperature does the plasma reach inside the JET reactor?", opts: [{ key: "A", text: "1,000 degrees Celsius" }, { key: "B", text: "150 million degrees Celsius (ten times hotter than the Sun's core)" }, { key: "C", text: "50,000 degrees Celsius" }, { key: "D", text: "Room temperature" }], a: "B", exp: "Nhiệt độ plasma: 'superheat the gas to 150 million degrees Celsius'." },
      { q: "What physical barrier protects the exterior from radiation during fusion pulses?", opts: [{ key: "A", text: "A wooden partition" }, { key: "B", text: "Glass window" }, { key: "C", text: "A three-meter-thick borated concrete biological shield" }, { key: "D", text: "Plastic curtain" }], a: "C", exp: "Lá chắn sinh học: 'three-meter-thick borated concrete biological radiation shield'." },
      { q: "What particles carry the 14.1 MeV kinetic energy released during D-T fusion?", opts: [{ key: "A", text: "Electrons only" }, { key: "B", text: "Visible green photons" }, { key: "C", text: "Positrons" }, { key: "D", text: "High-energy 14.1 MeV neutrons" }], a: "D", exp: "Hạt mang năng lượng nhiệt hạch: 'releasing high-energy 14.1 MeV neutrons'." },
      { q: "What material lines the first-wall blanket inside the reactor chamber?", opts: [{ key: "A", text: "Beryllium first-wall blanket" }, { key: "B", text: "Lead bricks" }, { key: "C", text: "Aluminum foil" }, { key: "D", text: "Copper mesh" }], a: "A", exp: "Vật liệu ốp vách đầu tiên: 'beryllium first-wall blanket'." },
      { q: "What heating mechanisms are used to achieve extreme plasma temperatures?", opts: [{ key: "A", text: "Open wood fire" }, { key: "B", text: "Neutral beam injection and radio-frequency resonance heating" }, { key: "C", text: "Electric hair dryers" }, { key: "D", text: "Chemical gunpowder" }], a: "B", exp: "Cơ chế gia nhiệt plasma: 'neutral beam injection and radio-frequency resonance heating'." },
      { q: "What is the name of the UK's next-generation commercial fusion power prototype?", opts: [{ key: "A", text: "Apollo 11" }, { key: "B", text: "Hydra 2" }, { key: "C", text: "Spherical Tokamak for Energy Production (STEP)" }, { key: "D", text: "Titan One" }], a: "C", exp: "Lò phản ứng nhiệt hạch thế hệ mới: 'Spherical Tokamak for Energy Production (STEP)'." },
      { q: "By what target year is the STEP reactor designed to supply electricity to the National Grid?", opts: [{ key: "A", text: "2025" }, { key: "B", text: "2080" }, { key: "C", text: "3000" }, { key: "D", text: "By 2040" }], a: "D", exp: "Năm mục tiêu hòa lưới điện: 'deliver net electricity directly to the UK National Grid by 2040'." },
      { q: "How does the fusion reaction transfer heat to drive turbines?", opts: [{ key: "A", text: "Neutrons heat the blanket to drive supercritical steam turbines" }, { key: "B", text: "Via cold air blowing" }, { key: "C", text: "Through solar mirrors" }, { key: "D", text: "By burning coal" }], a: "A", exp: "Chuyển giao nhiệt năng: 'transferring their kinetic energy as thermal heat to drive high-pressure supercritical steam turbines'." }
    ];

    sec2Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k6_q${idx + 11}`,
        partNumber: 2,
        partTitle: "Listening Section 2: Culham Fusion Energy Center",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
        questionText: `Question ${idx + 11}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // SECTION 3: Biomedical Master's Seminar on CAR-T Cell Immunotherapy (Q21 - Q30)
    // =========================================================================
    const sec3Script =
      "Professor: Welcome Chloe and Julian. Let's evaluate your research thesis on chimeric antigen receptor T-cell (CAR-T) immunotherapy at King's College London.\n" +
      "Chloe: Thank you, Professor Davies. Our experimental protocol focuses on autologous T-lymphocytes harvested from relapsed acute lymphoblastic leukemia (ALL) patients via leukapheresis.\n" +
      "Julian: We utilized a replication-incompetent lentiviral vector to transduce a synthetic gene encoding a single-chain variable fragment (scFv) targeted specifically against the CD19 B-cell surface glycoprotein.\n" +
      "Professor: Remarkable molecular engineering. What were your in-vitro cytotoxicity assays demonstrating regarding tumor cell lysis?\n" +
      "Chloe: The engineered CAR-T cells achieved ninety-four percent target cytolysis within forty-eight hours of co-culture. However, we observed excessive secretion of interleukin-6 and interferon-gamma, mimicking clinical cytokine release syndrome (CRS).\n" +
      "Julian: To mitigate systemic inflammation, we engineered a secondary inducible safety kill-switch triggered by the small-molecule dimerizer rimiducid, which reduced off-target toxicity by eighty-five percent.\n" +
      "Professor: Outstanding translational innovation. Please submit your final thesis draft and statistical cytometry figures by Wednesday, March 18th.";

    const sec3Questions = [
      { q: "What therapeutic field is the students' master's thesis investigating?", opts: [{ key: "A", text: "Dental teeth whitening" }, { key: "B", text: "Chimeric antigen receptor T-cell (CAR-T) immunotherapy" }, { key: "C", text: "Herbal foot massage" }, { key: "D", text: "Orthopedic bone casting" }], a: "B", exp: "Lĩnh vực nghiên cứu: 'chimeric antigen receptor T-cell (CAR-T) immunotherapy'." },
      { q: "How were patient T-lymphocytes harvested in the clinical protocol?", opts: [{ key: "A", text: "Skin biopsy only" }, { key: "B", text: "Saliva swab" }, { key: "C", text: "Via leukapheresis" }, { key: "D", text: "Hair follicle extraction" }], a: "C", exp: "Phương pháp thu hoạch tế bào T: 'harvested... via leukapheresis'." },
      { q: "What viral delivery vector was utilized to transduce the synthetic CAR gene?", opts: [{ key: "A", text: "Active rabies virus" }, { key: "B", text: "Influenza aerosol" }, { key: "C", text: "Plant mosaic virus" }, { key: "D", text: "A replication-incompetent lentiviral vector" }], a: "D", exp: "Vector chuyển gen: 'utilized a replication-incompetent lentiviral vector'." },
      { q: "Which surface glycoprotein antigen do the engineered CAR-T cells target?", opts: [{ key: "A", text: "CD19 B-cell surface glycoprotein" }, { key: "B", text: "Hemoglobin" }, { key: "C", text: "Insulin receptor" }, { key: "D", text: "Collagen type 2" }], a: "A", exp: "Kháng nguyên bề mặt đích: 'targeted specifically against the CD19 B-cell surface glycoprotein'." },
      { q: "What percentage of target tumor cell cytolysis was achieved in 48 hours?", opts: [{ key: "A", text: "20 percent" }, { key: "B", text: "Ninety-four percent target cytolysis" }, { key: "C", text: "50 percent" }, { key: "D", text: "Zero percent" }], a: "B", exp: "Tỷ lệ tiêu diệt tế bào ung thư: 'achieved ninety-four percent target cytolysis within forty-eight hours'." },
      { q: "Which inflammatory cytokines were secreted during in-vitro co-culture?", opts: [{ key: "A", text: "Vitamin C and D" }, { key: "B", text: "Calcium ions" }, { key: "C", text: "Interleukin-6 and interferon-gamma" }, { key: "D", text: "Glucose" }], a: "C", exp: "Hóa chất trung gian gây viêm: 'excessive secretion of interleukin-6 and interferon-gamma'." },
      { q: "What adverse clinical side effect was simulated by excessive cytokine release?", opts: [{ key: "A", text: "Broken bones" }, { key: "B", text: "Tooth decay" }, { key: "C", text: "Hair loss" }, { key: "D", text: "Cytokine release syndrome (CRS)" }], a: "D", exp: "Tác dụng phụ: 'mimicking clinical cytokine release syndrome (CRS)'." },
      { q: "What mechanism did Julian engineer to control off-target toxicity?", opts: [{ key: "A", text: "An inducible safety kill-switch triggered by rimiducid" }, { key: "B", text: "Cold water bath" }, { key: "C", text: "High voltage shock" }, { key: "D", text: "Vitamin injection" }], a: "A", exp: "Công tắc an toàn: 'inducible safety kill-switch triggered by the small-molecule dimerizer rimiducid'." },
      { q: "By how much did the inducible kill-switch reduce off-target toxicity?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "By eighty-five percent" }, { key: "C", text: "No reduction" }, { key: "D", text: "100 percent elimination of all cells" }], a: "B", exp: "Hiệu quả giảm độc tính: 'reduced off-target toxicity by eighty-five percent'." },
      { q: "When is the final thesis draft due for submission?", opts: [{ key: "A", text: "January 1st" }, { key: "B", text: "June 30th" }, { key: "C", text: "Wednesday, March 18th" }, { key: "D", text: "December 25th" }], a: "C", exp: "Hạn chót nộp đồ án: 'by Wednesday, March 18th'." }
    ];

    sec3Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k6_q${idx + 21}`,
        partNumber: 3,
        partTitle: "Listening Section 3: CAR-T Cell Immunotherapy Seminar",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
        questionText: `Question ${idx + 21}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // SECTION 4: Archaeoastronomy & Megalithic Engineering of Stonehenge (Q31 - Q40)
    // =========================================================================
    const sec4Script =
      "Lecturer: Good morning, archaeology and archaeoastronomy scholars. Today we examine the monumental prehistoric complex of Stonehenge situated on Salisbury Plain in Wiltshire. Radiocarbon dating of red deer antler picks recovered from ditch strata establishes the initial henge earthwork construction around 3000 BCE, followed by successive megalithic phases culminating in the sarsen stone circle around 2500 BCE. The monument exhibits two primary geological petrologies: massive silcrete sarsen megaliths weighing up to thirty tons sourced from West Woods, twenty-five kilometers north; and volcanic spotted dolerite bluestones weighing two to four tons transported from the Preseli Hills in Pembrokeshire, Wales—an extraordinary overland and maritime transit distance exceeding two hundred and forty kilometers. Archaeologically, Stonehenge functioned as a sophisticated solar-lunar calendar. The central axis is aligned precisely to the midsummer sunrise over the Heel Stone and the midwinter sunset directly through the Great Trilithon. Furthermore, the fifty-six chalk Aubrey Holes surrounding the perimeter permitted Neolithic astronomers to track eclipse nodal cycles and predict lunar eclipses across the 18.6-year lunar precession period.";

    const sec4Questions = [
      { q: "Where is the prehistoric Stonehenge monument situated?", opts: [{ key: "A", text: "In the Scottish Highlands" }, { key: "B", text: "On the coast of Cornwall" }, { key: "C", text: "In central London" }, { key: "D", text: "On Salisbury Plain in Wiltshire" }], a: "D", exp: "Vị trí địa lý: 'on Salisbury Plain in Wiltshire'." },
      { q: "What organic tools were radiocarbon-dated to determine the henge's age?", opts: [{ key: "A", text: "Red deer antler picks recovered from ditch strata" }, { key: "B", text: "Wooden spears" }, { key: "C", text: "Leather sandals" }, { key: "D", text: "Fish bones" }], a: "A", exp: "Vật phẩm định tuổi carbon: 'Radiocarbon dating of red deer antler picks recovered from ditch strata'." },
      { q: "Around what approximate date was the main sarsen stone circle constructed?", opts: [{ key: "A", text: "10,000 BCE" }, { key: "B", text: "Around 2500 BCE" }, { key: "C", text: "500 CE" }, { key: "D", text: "1500 CE" }], a: "B", exp: "Niên đại dựng đá sarsen: 'culminating in the sarsen stone circle around 2500 BCE'." },
      { q: "Where were the massive 30-ton sarsen megaliths sourced from?", opts: [{ key: "A", text: "Preseli Hills Wales" }, { key: "B", text: "Egypt" }, { key: "C", text: "West Woods, twenty-five kilometers north" }, { key: "D", text: "France" }], a: "C", exp: "Nguồn gốc đá Sarsen: 'sourced from West Woods, twenty-five kilometers north'." },
      { q: "From where were the volcanic spotted dolerite bluestones transported?", opts: [{ key: "A", text: "Local riverbeds" }, { key: "B", text: "Ireland" }, { key: "C", text: "Norway" }, { key: "D", text: "Preseli Hills in Pembrokeshire, Wales" }], a: "D", exp: "Nguồn gốc đá xanh Bluestone: 'from the Preseli Hills in Pembrokeshire, Wales'." },
      { q: "What distance did the transport of the Welsh bluestones exceed?", opts: [{ key: "A", text: "Over two hundred and forty kilometers" }, { key: "B", text: "10 kilometers" }, { key: "C", text: "1,000 kilometers" }, { key: "D", text: "50 meters" }], a: "A", exp: "Khoảng cách vận chuyển: 'transit distance exceeding two hundred and forty kilometers'." },
      { q: "What solar event aligns with the Heel Stone along the central axis?", opts: [{ key: "A", text: "Autumn midnight" }, { key: "B", text: "Midsummer sunrise" }, { key: "C", text: "Spring equinox noon" }, { key: "D", text: "Polar night" }], a: "B", exp: "Sự kiện thiên văn: 'aligned precisely to the midsummer sunrise over the Heel Stone'." },
      { q: "What astronomical sunset aligns with the Great Trilithon?", opts: [{ key: "A", text: "Midsummer noon" }, { key: "B", text: "Spring sunrise" }, { key: "C", text: "Midwinter sunset directly through the Great Trilithon" }, { key: "D", text: "Autumn dawn" }], a: "C", exp: "Căn chỉnh hoàng hôn đông chí: 'midwinter sunset directly through the Great Trilithon'." },
      { q: "How many chalk Aubrey Holes surround the perimeter of Stonehenge?", opts: [{ key: "A", text: "12 holes" }, { key: "B", text: "100 holes" }, { key: "C", text: "365 holes" }, { key: "D", text: "Fifty-six chalk Aubrey Holes" }], a: "D", exp: "Số lượng hố Aubrey: 'fifty-six chalk Aubrey Holes surrounding the perimeter'." },
      { q: "What celestial phenomenon could Neolithic astronomers track using the Aubrey Holes?", opts: [{ key: "A", text: "Eclipse nodal cycles across the 18.6-year lunar precession period" }, { key: "B", text: "Halley's comet only" }, { key: "C", text: "Mars volcanic eruptions" }, { key: "D", text: "Jupiter rings" }], a: "A", exp: "Hiện tượng thiên văn dự báo: 'track eclipse nodal cycles and predict lunar eclipses across the 18.6-year lunar precession period'." }
    ];

    sec4Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k6_q${idx + 31}`,
        partNumber: 4,
        partTitle: "Listening Section 4: Archaeoastronomy of Stonehenge",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
        questionText: `Question ${idx + 31}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // READING PASSAGE 1: Concentrated Solar Power & Molten-Salt Storage (Q41 - Q53)
    // =========================================================================
    const readP1 = `ACADEMIC READING PASSAGE 1 — CONCENTRATED SOLAR POWER AND THERMAL MOLTEN-SALT ENERGY STORAGE\n\nAs global power grids accelerate decarbonization to mitigate anthropogenic climate disruption, the inherent intermittency of traditional photovoltaic (PV) solar and wind generation poses formidable grid stabilization challenges. Photovoltaic cells generate electricity only during sunlit daylight hours and experience severe output fluctuations during cloud cover, necessitating costly chemical lithium-ion battery banks or fossil gas peaker plants to balance peak evening demand. To overcome these limitations, Concentrated Solar Power (CSP) tower architecture coupled with liquid nitrate molten-salt thermal energy storage has emerged as a revolutionary utility-scale baseload renewable technology.\n\nA central-receiver CSP installation comprises a field of thousands of dual-axis computer-controlled mirrors, termed heliostats, arranged in concentric azimuthal arcs across several square kilometers of desert terrain. Each heliostat continuously tracks the sun's trajectory, reflecting and concentrating incident solar irradiance by a factor exceeding 1,000 onto a central receiver mounted atop a towering concrete pylon up to 250 meters in height. Within this central receiver, an eutectic mixture of molten salt—typically composed of 60 percent sodium nitrate (NaNO3) and 40 percent potassium nitrate (KNO3)—is pumped through specialized high-temperature nickel-alloy tubing. The concentrated solar flux heats the molten salt from 290°C to an extraordinary 565°C.\n\nThe superheated molten salt flows downward via insulated vertical downcomers into an enormous insulated hot storage tank. Because molten nitrate salts possess exceptional volumetric heat capacity and remain liquid across a wide operational temperature range without boiling or pressurizing, the thermal energy can be stored for up to 15 hours with less than 1 percent thermal degradation per day. When electricity is dispatched to the grid during nocturnal peak demand, the 565°C molten salt is routed through a steam generator to boil water into high-pressure supercritical steam, which spins a conventional steam turbine generator to produce synchronous AC electricity. After transferring its heat, the cooled salt (at 290°C) returns to the cold storage tank, ready to be pumped back to the central receiver tower the following morning in an infinitely closed thermodynamic loop. Facilities like the Noor Energy 1 complex in Dubai and the Cerro Dominador plant in Chile's Atacama Desert prove that molten-salt CSP can deliver 24/7 continuous dispatchable clean power, matching the reliability of coal or nuclear power without carbon emissions.`;

    const r1Questions = [
      { q: "What is the primary operational limitation of conventional photovoltaic (PV) solar energy?", opts: [{ key: "A", text: "It generates too much power at night" }, { key: "B", text: "Inherent intermittency and inability to generate power after sunset without storage" }, { key: "C", text: "It produces radioactive waste" }, { key: "D", text: "It requires coal to operate" }], a: "B", exp: "Đoạn 1: 'inherent intermittency of traditional photovoltaic (PV) solar... generate electricity only during sunlit daylight hours'." },
      { q: "What are the dual-axis tracking mirrors in a CSP plant called?", opts: [{ key: "A", text: "Periscopes" }, { key: "B", text: "Prisms" }, { key: "C", text: "Heliostats" }, { key: "D", text: "Magnifying glasses" }], a: "C", exp: "Đoạn 2: 'thousands of dual-axis computer-controlled mirrors, termed heliostats'." },
      { q: "By what factor do heliostats concentrate incident solar irradiance onto the receiver?", opts: [{ key: "A", text: "By a factor of 10" }, { key: "B", text: "By 2 times" }, { key: "C", text: "No concentration" }, { key: "D", text: "By a factor exceeding 1,000" }], a: "D", exp: "Đoạn 2: 'concentrating incident solar irradiance by a factor exceeding 1,000'." },
      { q: "What is the chemical composition of the eutectic molten salt mixture?", opts: [{ key: "A", text: "60 percent sodium nitrate and 40 percent potassium nitrate" }, { key: "B", text: "Pure table salt and water" }, { key: "C", text: "Liquid lead and mercury" }, { key: "D", text: "Sulfuric acid and copper" }], a: "A", exp: "Đoạn 2: 'typically composed of 60 percent sodium nitrate (NaNO3) and 40 percent potassium nitrate (KNO3)'." },
      { q: "To what temperature is the molten salt heated in the central tower receiver?", opts: [{ key: "A", text: "100°C" }, { key: "B", text: "From 290°C to an extraordinary 565°C" }, { key: "C", text: "1,500°C" }, { key: "D", text: "0°C" }], a: "B", exp: "Đoạn 2: 'heats the molten salt from 290°C to an extraordinary 565°C'." },
      { q: "For how many hours can thermal energy be stored in the insulated hot tank?", opts: [{ key: "A", text: "1 hour" }, { key: "B", text: "10 minutes" }, { key: "C", text: "Up to 15 hours with less than 1 percent thermal degradation per day" }, { key: "D", text: "50 hours" }], a: "C", exp: "Đoạn 3: 'thermal energy can be stored for up to 15 hours with less than 1 percent thermal degradation per day'." },
      { q: "How is electricity generated when discharging stored thermal energy from the molten salt?", opts: [{ key: "A", text: "Salt is burned directly" }, { key: "B", text: "Through chemical batteries" }, { key: "C", text: "By shining lasers at solar panels" }, { key: "D", text: "Salt boils water into supercritical steam to spin a turbine generator" }], a: "D", exp: "Đoạn 3: 'routed through a steam generator to boil water into high-pressure supercritical steam, which spins a conventional steam turbine generator'." },
      { q: "What is the temperature of the 'cold' returned molten salt?", opts: [{ key: "A", text: "290°C" }, { key: "B", text: "Below freezing" }, { key: "C", text: "Room temperature (25°C)" }, { key: "D", text: "565°C" }], a: "A", exp: "Đoạn 3: 'the cooled salt (at 290°C) returns to the cold storage tank'." },
      { q: "Where is the Cerro Dominador CSP molten-salt facility located?", opts: [{ key: "A", text: "In the Arctic" }, { key: "B", text: "In Chile's Atacama Desert" }, { key: "C", text: "In London" }, { key: "D", text: "In Sydney" }], a: "B", exp: "Đoạn 3: 'Cerro Dominador plant in Chile's Atacama Desert'." },
      { q: "What is the height of central receiver concrete towers in modern CSP plants?", opts: [{ key: "A", text: "10 meters" }, { key: "B", text: "500 meters" }, { key: "C", text: "Up to 250 meters in height" }, { key: "D", text: "2 meters" }], a: "C", exp: "Đoạn 2: 'central receiver mounted atop a towering concrete pylon up to 250 meters in height'." },
      { q: "Does the molten nitrate salt boil or build high pressure during 565°C storage?", opts: [{ key: "A", text: "Yes, it boils explosively" }, { key: "B", text: "It turns into solid ice" }, { key: "C", text: "It evaporates into gas" }, { key: "D", text: "No, it remains liquid without boiling or pressurizing" }], a: "D", exp: "Đoạn 3: 'remain liquid across a wide operational temperature range without boiling or pressurizing'." },
      { q: "What alloy is used for the receiver tubing to withstand high temperatures?", opts: [{ key: "A", text: "Specialized high-temperature nickel-alloy tubing" }, { key: "B", text: "Soft plastic" }, { key: "C", text: "Pure gold" }, { key: "D", text: "Wood" }], a: "A", exp: "Đoạn 2: 'pumped through specialized high-temperature nickel-alloy tubing'." },
      { q: "What major clean energy advantage does molten-salt CSP offer compared to PV?", opts: [{ key: "A", text: "It is free to build" }, { key: "B", text: "Delivers 24/7 continuous dispatchable baseload clean power matching coal or nuclear" }, { key: "C", text: "It works without sunlight" }, { key: "D", text: "It fits on house roofs" }], a: "B", exp: "Đoạn 3: 'deliver 24/7 continuous dispatchable clean power, matching the reliability of coal or nuclear power without carbon emissions'." }
    ];

    r1Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k6_q${idx + 41}`,
        partNumber: 5,
        partTitle: "Reading Passage 1: Concentrated Solar Power & Molten Salt",
        section: "READING",
        passageText: readP1,
        questionText: `Question ${idx + 41}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // READING PASSAGE 2: Neuroscience of Highly Superior Autobiographical Memory (Q54 - Q66)
    // =========================================================================
    const readP2 = `ACADEMIC READING PASSAGE 2 — NEUROBIOLOGICAL MECHANISMS OF HIGHLY SUPERIOR AUTOBIOGRAPHICAL MEMORY (HSAM)\n\nFor over a century, cognitive neuroscience conceptualized human episodic memory as an inherently constructive, malleable, and error-prone faculty. Normal individuals rapidly succumb to Ebbinghaus forgetting curves, transposing narrative details and losing vivid recollection of mundane daily experiences within days. In 2006, however, neurobiologist Dr. James McGaugh at the University of California, Irvine, documented an unprecedented cognitive phenomenon in a subject known as 'AJ' (Jill Price), coining the diagnosis Highly Superior Autobiographical Memory (HSAM), clinically classified as hyperthymesia.\n\nIndividuals diagnosed with HSAM possess the extraordinary ability to recall with photographic precision the exact events, weather conditions, emotions, conversations, and public news occurrences of virtually every calendar day of their lives from late childhood onwards. If given a random date—such as October 19, 1993—an HSAM individual can almost instantaneously state the day of the week, describe what they ate for breakfast, recount what clothing they wore, and cross-reference major geopolitical events broadcast on television that evening. Crucially, standardized cognitive testing revealed that HSAM subjects do not possess superior general intelligence, photographic memory for abstract symbols, or exceptional mnemonic recall for random digit strings; their hyper-mnemonic capacity is strictly restricted to personal autobiographical episodic timelines.\n\nStructural magnetic resonance imaging (sMRI) and diffusion tensor neuroimaging (DTI) have uncovered distinct structural neuroanatomical divergences in the brains of HSAM cohorts compared to age-matched neurotypical controls. Researchers identified significant bilateral volumetric enlargement and heightened white-matter fractional anisotropy within the hippocampus, the parahippocampal gyrus, and the uncinate fasciculus—a critical tract connecting the anterior temporal lobe with the orbitofrontal cortex. Furthermore, the caudate nucleus and putamen—subcortical basalganglia structures implicated in procedural habit formation and obsessive-compulsive disorder (OCD)—demonstrated pronounced structural hypertrophy. Psychometric evaluations revealed that HSAM individuals exhibit high obsessive-compulsive personality inventory scores, constantly engaging in involuntary, automatic memory consolidation, indexing past days in mental catalog files much like an archivist organizing library manuscripts. Studying the molecular genetics and synaptic plasticity of HSAM brains offers profound therapeutic promise for developing neuroprotective pharmacological interventions against Alzheimer's disease and neurodegenerative dementia.`;

    const r2Questions = [
      { q: "Who coined the term Highly Superior Autobiographical Memory (HSAM) in 2006?", opts: [{ key: "A", text: "Sigmund Freud" }, { key: "B", text: "Charles Darwin" }, { key: "C", text: "Dr. James McGaugh at the University of California, Irvine" }, { key: "D", text: "Ivan Pavlov" }], a: "C", exp: "Đoạn 1: 'neurobiologist Dr. James McGaugh at the University of California, Irvine... coining the diagnosis Highly Superior Autobiographical Memory (HSAM)'." },
      { q: "What alternate clinical term is used for HSAM in medical literature?", opts: [{ key: "A", text: "Amnesia" }, { key: "B", text: "Dyslexia" }, { key: "C", text: "Insomnia" }, { key: "D", text: "Hyperthymesia" }], a: "D", exp: "Đoạn 1: 'clinically classified as hyperthymesia'." },
      { q: "What specific capability characterizes individuals with HSAM?", opts: [{ key: "A", text: "Recalling with photographic precision the exact events, weather, and feelings of every calendar day" }, { key: "B", text: "Ability to predict future stock prices" }, { key: "C", text: "Speaking 20 languages fluently without studying" }, { key: "D", text: "Remembering random numbers better than supercomputers" }], a: "A", exp: "Đoạn 2: 'recall with photographic precision the exact events, weather conditions, emotions, conversations... of virtually every calendar day'." },
      { q: "Do HSAM individuals demonstrate superior general intelligence or photographic memory for random digits?", opts: [{ key: "A", text: "Yes, they excel in all cognitive tests" }, { key: "B", text: "No, their hyper-mnemonic capacity is strictly restricted to personal autobiographical timelines" }, { key: "C", text: "They have below-average IQ" }, { key: "D", text: "They cannot do basic math" }], a: "B", exp: "Đoạn 2: 'HSAM subjects do not possess superior general intelligence... their hyper-mnemonic capacity is strictly restricted to personal autobiographical episodic timelines'." },
      { q: "Which brain structures showed volumetric enlargement in neuroimaging scans of HSAM subjects?", opts: [{ key: "A", text: "Only the earlobes" }, { key: "B", text: "Only the visual retina" }, { key: "C", text: "Hippocampus, parahippocampal gyrus, uncinate fasciculus, caudate nucleus, and putamen" }, { key: "D", text: "No brain differences were detected" }], a: "C", exp: "Đoạn 3: 'volumetric enlargement... within the hippocampus, the parahippocampal gyrus, and the uncinate fasciculus... caudate nucleus and putamen'." },
      { q: "What neural tract connects the anterior temporal lobe with the orbitofrontal cortex?", opts: [{ key: "A", text: "Spinal cord" }, { key: "B", text: "Optic nerve" }, { key: "C", text: "Sciatic nerve" }, { key: "D", text: "The uncinate fasciculus" }], a: "D", exp: "Đoạn 3: 'the uncinate fasciculus—a critical tract connecting the anterior temporal lobe with the orbitofrontal cortex'." },
      { q: "Which psychological condition shares neurological basal ganglia hypertrophy with HSAM?", opts: [{ key: "A", text: "Obsessive-compulsive disorder (OCD)" }, { key: "B", text: "Common cold" }, { key: "C", text: "Sleep apnea" }, { key: "D", text: "Asthma" }], a: "A", exp: "Đoạn 3: 'subcortical basalganglia structures implicated in procedural habit formation and obsessive-compulsive disorder (OCD)'." },
      { q: "How do HSAM individuals naturally organize their daily memories in their minds?", opts: [{ key: "A", text: "They write them in paper diaries daily" }, { key: "B", text: "Involuntary, automatic memory consolidation indexing past days like an archivist" }, { key: "C", text: "They record voice memos" }, { key: "D", text: "They forget them within a week" }], a: "B", exp: "Đoạn 3: 'constantly engaging in involuntary, automatic memory consolidation, indexing past days in mental catalog files much like an archivist'." },
      { q: "What medical application could benefit from studying the synaptic plasticity of HSAM brains?", opts: [{ key: "A", text: "Curing broken legs" }, { key: "B", text: "Improving eyesight" }, { key: "C", text: "Developing neuroprotective pharmacological interventions against Alzheimer's and dementia" }, { key: "D", text: "Preventing hair loss" }], a: "C", exp: "Đoạn 3: 'therapeutic promise for developing neuroprotective pharmacological interventions against Alzheimer's disease and neurodegenerative dementia'." },
      { q: "How did cognitive neuroscience historically view human episodic memory for mundane daily events?", opts: [{ key: "A", text: "As 100% permanent and flawless" }, { key: "B", text: "As a video tape recorder" }, { key: "C", text: "As non-existent" }, { key: "D", text: "As an inherently constructive, malleable, and error-prone faculty subject to forgetting curves" }], a: "D", exp: "Đoạn 1: 'conceptualized human episodic memory as an inherently constructive, malleable, and error-prone faculty'." },
      { q: "Who was the first documented HSAM subject identified in McGaugh's 2006 study?", opts: [{ key: "A", text: "Subject 'AJ' (Jill Price)" }, { key: "B", text: "Albert Einstein" }, { key: "C", text: "Stephen Hawking" }, { key: "D", text: "Isaac Newton" }], a: "A", exp: "Đoạn 1: 'in a subject known as 'AJ' (Jill Price)'." },
      { q: "What neuroimaging techniques were used to study HSAM brain connectivity?", opts: [{ key: "A", text: "Blood pressure cuff" }, { key: "B", text: "Structural MRI (sMRI) and diffusion tensor neuroimaging (DTI)" }, { key: "C", text: "X-ray only" }, { key: "D", text: "Thermal camera" }], a: "B", exp: "Đoạn 3: 'Structural magnetic resonance imaging (sMRI) and diffusion tensor neuroimaging (DTI)'." },
      { q: "What is the primary conclusion of the passage regarding HSAM?", opts: [{ key: "A", text: "HSAM is a dangerous disease that should be erased" }, { key: "B", text: "Anyone can learn HSAM in 5 minutes" }, { key: "C", text: "HSAM represents a unique neurobiological adaptation bridging autobiographical recall, structural brain hypertrophy, and memory consolidation" }, { key: "D", text: "HSAM does not exist" }], a: "C", exp: "Kết luận: HSAM là hiện tượng thần kinh độc đáo kết hợp giữa hồi tưởng tự thuật, phì đại cấu trúc não và quá trình củng cố trí nhớ tự động." }
    ];

    r2Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k6_q${idx + 54}`,
        partNumber: 6,
        partTitle: "Reading Passage 2: Neuroscience of HSAM Super-Memory",
        section: "READING",
        passageText: readP2,
        questionText: `Question ${idx + 54}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // READING PASSAGE 3: The Enigma of the Indus Valley Civilization Collapse (Q67 - Q80)
    // =========================================================================
    const readP3 = `ACADEMIC READING PASSAGE 3 — CLIMATIC ARIDIFICATION AND THE ENIGMA OF THE INDUS VALLEY COLLAPSE\n\nFlourishing between 2600 BCE and 1900 BCE across an expanse exceeding one million square kilometers encompassing modern Pakistan and northwest India, the Mature Harappan Civilization of the Indus Valley represented one of the foremost urbanized societies of antiquity. Unlike their contemporary counterparts in dynastic Egypt and imperial Mesopotamia, the major metropolises of Mohenjo-daro, Harappa, Dholavira, and Rakhigarhi exhibited an extraordinary absence of monumental royal palaces, grandiose monarchical mausoleums, or centralizing religious theocracies. Instead, Harappan cities were defined by sophisticated civic egalitarianism, characterized by rectilinear grid-iron street layouts, standardized baked-brick architecture adhering to strict dimensional ratios (1:2:4), multi-story residential housing, covered municipal wastewater drainage systems, and massive civic sanitation works such as the Great Bath of Mohenjo-daro.\n\nBy 1800 BCE, however, this vast commercial and urban network underwent profound de-urbanization. Megacities were abandoned, standardized bronze weights and undeciphered Indus script seals vanished from the archaeological record, craft specialization collapsed, and populations dispersed eastward toward rural agricultural settlements in the Ganges basin. For decades, early twentieth-century colonial antiquarians championed the 'Aryan Invasion Theory,' hypothesizing that violent conquest by pastoralist Indo-European nomads annihilated Harappan civilization. However, systematic forensic osteological analysis of human skeletal remains across Mohenjo-daro has thoroughly debunked this catastrophe narrative, revealing zero skeletal trauma consistent with mass warfare or military assault.\n\nIn recent years, high-resolution paleoclimatological investigations have unraveled the true ecological catalyst behind the Harappan demise. By analyzing oxygen isotope ratios (δ18O) preserved in deep-sea sediment cores retrieved from the Arabian Sea and stalagmites in Himalayan karst caves, paleoclimatologists demonstrated that a profound south-eastward displacement of the Intertropical Convergence Zone (ITCZ) triggered a multi-century weakening of the Indian Summer Monsoon around 2100 BCE. The resultant prolonged aridification starved the glacial Indus river tributaries, inducing catastrophic shifts in seasonal river braiding and catastrophic multi-decade droughts. Unable to maintain the agricultural surplus necessary to support dense urban populations, Harappan society did not experience a sudden violent extinction, but rather an orderly, resilient rural dispersal—adapting to climatic stress by decentralized rain-fed subsistence farming across the fertile foothills of the Himalayas.`;

    const r3Questions = [
      { q: "During what chronological era did the Mature Harappan Civilization flourish?", opts: [{ key: "A", text: "10,000 BCE to 8,000 BCE" }, { key: "B", text: "500 CE to 1500 CE" }, { key: "C", text: "In the 20th century" }, { key: "D", text: "Between 2600 BCE and 1900 BCE" }], a: "D", exp: "Đoạn 1: 'Flourishing between 2600 BCE and 1900 BCE across an expanse exceeding one million square kilometers'." },
      { q: "What urban feature distinguished Indus cities from Egypt and Mesopotamia?", opts: [{ key: "A", text: "Absence of royal palaces or grandiose monarchical mausoleums; presence of grid streets and sanitation" }, { key: "B", text: "Huge gold pyramids" }, { key: "C", text: "Lack of clean water" }, { key: "D", text: "Underground caves only" }], a: "A", exp: "Đoạn 1: 'absence of monumental royal palaces, grandiose monarchical mausoleums... defined by sophisticated civic egalitarianism, grid-iron street layouts'." },
      { q: "What standardized dimensional ratio was used for Harappan baked bricks?", opts: [{ key: "A", text: "1:1:1" }, { key: "B", text: "Strict dimensional ratios (1:2:4)" }, { key: "C", text: "10:20:30" }, { key: "D", text: "5:5:10" }], a: "B", exp: "Đoạn 1: 'standardized baked-brick architecture adhering to strict dimensional ratios (1:2:4)'." },
      { q: "What happened to Harappan megacities around 1800 BCE?", opts: [{ key: "A", text: "They turned into giant glass domes" }, { key: "B", text: "They were flooded under 100 meters of water" }, { key: "C", text: "Abandoned through de-urbanization; populations dispersed eastward to rural settlements" }, { key: "D", text: "They expanded into space" }], a: "C", exp: "Đoạn 2: 'Megacities were abandoned... populations dispersed eastward toward rural agricultural settlements in the Ganges basin'." },
      { q: "How did forensic osteological analysis debunk the 'Aryan Invasion Theory'?", opts: [{ key: "A", text: "Proved soldiers used laser weapons" }, { key: "B", text: "Found iron tanks" }, { key: "C", text: "Showed people lived forever" }, { key: "D", text: "Revealed zero skeletal trauma consistent with mass warfare or military assault" }], a: "D", exp: "Đoạn 2: 'systematic forensic osteological analysis... revealing zero skeletal trauma consistent with mass warfare or military assault'." },
      { q: "What paleoclimatological evidence revealed the true cause of the Harappan collapse?", opts: [{ key: "A", text: "Oxygen isotope ratios (δ18O) in Arabian Sea sediment cores and Himalayan stalagmites" }, { key: "B", text: "Tree bark drawings" }, { key: "C", text: "Volcanic lava records in Hawaii" }, { key: "D", text: "Antarctic ice core photos only" }], a: "A", exp: "Đoạn 3: 'analyzing oxygen isotope ratios (δ18O) preserved in deep-sea sediment cores retrieved from the Arabian Sea and stalagmites in Himalayan karst caves'." },
      { q: "What climate shift occurred around 2100 BCE?", opts: [{ key: "A", text: "Massive snowfall" }, { key: "B", text: "South-eastward displacement of the ITCZ causing multi-century weakening of the Summer Monsoon" }, { key: "C", text: "Global sea level dropped 500 meters" }, { key: "D", text: "Sun stopped shining" }], a: "B", exp: "Đoạn 3: 'displacement of the Intertropical Convergence Zone (ITCZ) triggered a multi-century weakening of the Indian Summer Monsoon'." },
      { q: "What impact did prolonged aridification have on the Indus river system?", opts: [{ key: "A", text: "Created boiling rivers" }, { key: "B", text: "Turned water into oil" }, { key: "C", text: "Starved river tributaries and caused catastrophic multi-decade droughts" }, { key: "D", text: "No effect on agriculture" }], a: "C", exp: "Đoạn 3: 'starved the glacial Indus river tributaries, inducing catastrophic shifts in seasonal river braiding and catastrophic multi-decade droughts'." },
      { q: "How did Harappan populations adapt to the changing climate?", opts: [{ key: "A", text: "Built nuclear shelters" }, { key: "B", text: "Completely died out with zero survivors" }, { key: "C", text: "Moved to Australia" }, { key: "D", text: "Orderly rural dispersal into decentralized rain-fed subsistence farming near the Himalayas" }], a: "D", exp: "Đoạn 3: 'orderly, resilient rural dispersal—adapting to climatic stress by decentralized rain-fed subsistence farming across the fertile foothills of the Himalayas'." },
      { q: "What famous civic sanitation structure was discovered at Mohenjo-daro?", opts: [{ key: "A", text: "The Great Bath" }, { key: "B", text: "The Great Pyramid" }, { key: "C", text: "The Colosseum" }, { key: "D", text: "The Parthenon" }], a: "A", exp: "Đoạn 1: 'massive civic sanitation works such as the Great Bath of Mohenjo-daro'." },
      { q: "What artifacts vanished from the archaeological record during de-urbanization?", opts: [{ key: "A", text: "Stone rocks" }, { key: "B", text: "Standardized bronze weights and undeciphered Indus script seals" }, { key: "C", text: "Clay dirt" }, { key: "D", text: "Water wells" }], a: "B", exp: "Đoạn 2: 'standardized bronze weights and undeciphered Indus script seals vanished from the archaeological record'." },
      { q: "Which geographic area encompassed the Mature Harappan Civilization?", opts: [{ key: "A", text: "Central Europe" }, { key: "B", text: "South America" }, { key: "C", text: "Modern Pakistan and northwest India exceeding 1 million sq km" }, { key: "D", text: "North America" }], a: "C", exp: "Đoạn 1: 'expanse exceeding one million square kilometers encompassing modern Pakistan and northwest India'." },
      { q: "Did the Harappan civilization experience a sudden violent extinction or gradual adaptation?", opts: [{ key: "A", text: "Sudden alien abduction" }, { key: "B", text: "Total mass warfare slaughter" }, { key: "C", text: "Meteor impact" }, { key: "D", text: "Orderly, resilient rural dispersal and adaptation to agricultural climate shifts" }], a: "D", exp: "Đoạn 3: 'society did not experience a sudden violent extinction, but rather an orderly, resilient rural dispersal'." },
      { q: "What is the primary conclusion regarding the Harappan civilization?", opts: [{ key: "A", text: "The Indus civilization's transformation illustrates how climatic aridification drives urban decentralization and societal adaptation" }, { key: "B", text: "Cities fell due to poor brick quality" }, { key: "C", text: "Ancient people could not farm" }, { key: "D", text: "Monsoons never change" }], a: "A", exp: "Kết luận: Sự chuyển đổi của nền văn minh Indus minh chứng cho cách thức biến đổi khí hậu và đại hạn hán thúc đẩy quá trình phi tập trung hóa đô thị và thích ứng xã hội." }
    ];

    r3Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k6_q${idx + 67}`,
        partNumber: 7,
        partTitle: "Reading Passage 3: Enigma of the Indus Valley Collapse",
        section: "READING",
        passageText: readP3,
        questionText: `Question ${idx + 67}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // SPEAKING AI STUDIO (Q81 - Q83: 3 PARTS)
    // =========================================================================
    qs.push({
      id: "ia4k6_q81",
      partNumber: 8,
      partTitle: "IELTS Speaking Part 1: Clean Energy, Memory Habits & Ancient Monuments",
      section: "SPEAKING",
      speakingPrompt:
        "1. What types of renewable clean energy are most common in your country?\n2. Do you rely more on your natural memory or digital calendar smartphone apps to remember daily appointments?\n3. Have you ever visited an ancient historical monument or archaeological ruin? What was it like?\n4. Do you think school history curriculums should focus more on ancient civilizations or modern history?",
      preparationTimeSeconds: 15,
      speakingTimeSeconds: 60,
      questionText:
        "Question 81 (Speaking Part 1): Answer 4 academic interview questions on renewable energy, memory habits, and history (60 seconds).",
      options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "View Band 8.5+ Lexical Resources" },
            { key: "C", text: "Listen to Native Examiner Audio" },
            { key: "D", text: "Skip to Cue Card" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT PART 1 - DIRECT ANSWER + ACADEMIC EXPANSION]
- Trả lời trực tiếp và mở rộng bằng từ vựng học thuật về năng lượng, nhận thức và di sản lịch sử.

🔍 [BÀI NÓI MẪU BAND 8.5+]
"In my country, hydroelectricity and rooftop solar photovoltaics constitute the predominant share of renewable power generation, though offshore wind farms are expanding rapidly along the coastline.

To organize my daily commitments, I rely predominantly on cloud-synchronized calendar applications, as they provide automated alerts and prevent cognitive cognitive overload.

I had the privilege of exploring the ancient Cham temple sanctuaries in My Son. Standing before millennia-old fired-brick monuments evoked a profound reverence for ancient engineering ingenuity.

I believe educational curriculums should strike an equitable balance: studying ancient civilizations illuminates the foundational roots of human culture, while modern history equips students to navigate contemporary geopolitical dynamics."

💡 [TỪ VỰNG THEN CHỐT]
- Predominant share /prɪˈdɑː.mə.nənt ʃer/ (n): Tỷ trọng chủ đạo
- Cognitive overload /ˈkɑːɡ.nə.tɪv ˈoʊ.vɚ.loʊd/ (n): Sự quá tải nhận thức
- Engineering ingenuity /ˌen.dʒɪˈnɪr.ɪŋ ˌɪn.dʒəˈnuː.ə.t̬i/ (n): Sự tài tình trong kỹ thuật công trình.`
    });

    qs.push({
      id: "ia4k6_q82",
      partNumber: 9,
      partTitle: "IELTS Speaking Part 2: Cue Card — Impressive Scientific or Ancient Structure",
      section: "SPEAKING",
      speakingPrompt:
        "Describe an impressive scientific facility or ancient historical structure that you find fascinating.\nYou should say:\n• Where this structure is located\n• What it looks like and what its purpose is\n• How you learned about this structure\nAnd explain why you find this structure so impressive.",
      preparationTimeSeconds: 60,
      speakingTimeSeconds: 120,
      questionText:
        "Question 82 (Speaking Part 2): Deliver a continuous 2-minute speech describing an impressive scientific or ancient structure.",
      options: [
            { key: "A", text: "View 1-Minute Note-Taking Template" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [CHIẾN THUẬT 1 PHÚT GHI CHÚ (THE 4-BOX METHOD)]
- Box 1 (Where): The ITER Tokamak Fusion Reactor facility in Cadarache, Southern France.
- Box 2 (Appearance/Purpose): Toroidal 30-meter steel cryostat vessel confining 150-million-degree plasma to produce clean, limitless fusion power.
- Box 3 (How learned): Scientific documentaries and academic physics journals.
- Box 4 (Why impressive): Represents the pinnacle of global international scientific collaboration (35 nations) replicating the power of stars on Earth.

🔍 [BÀI NÓI MẪU BAND 9.0 (240+ TỪ)]
"I would like to speak about an awe-inspiring scientific mega-engineering facility that has completely captured my imagination: the ITER Tokamak fusion reactor currently under construction in Cadarache, southern France.

Visually, the facility is dominated by an immense thirty-meter-tall cylindrical stainless steel cryostat, housing an intricate toroidal vacuum vessel encircled by the most powerful superconducting magnetic coil systems ever fabricated. Its core objective is to harness controlled nuclear fusion—the very thermodynamic process that fuels our Sun—by superheating deuterium and tritium isotopes into a 150-million-degree plasma cage to generate limitless, carbon-free baseload energy without long-lived radioactive waste.

I first became fascinated by ITER after reading a comprehensive analysis in a scientific journal, which detailed how thirty-five sovereign nations have pooled their intellectual and industrial resources to manufacture ultra-precise components across four continents.

What makes this installation so profoundly impressive to me is twofold. First, from an engineering standpoint, confining a miniature star ten times hotter than the core of the Sun inside a magnetic bottle represents the absolute frontier of human physics. Second, on a philosophical level, ITER stands as an inspiring monument to global multilateral cooperation, proving that humanity can transcend geopolitical friction to pioneer a clean, sustainable energy future for generations to come."

💡 [TỪ VỰNG THEN CHỐT]
- Toroidal vacuum vessel /tɔːˈrɔɪ.dəl ˈvæk.juːm ˈves.əl/ (n): Buồng chân không hình xuyến
- Superconducting magnetic coils /ˌsuː.pɚ.kənˈdʌk.tɪŋ mæɡˈnet̬.ɪk kɔɪlz/ (n): Cuộn dây từ trường siêu dẫn
- Limitless baseload energy /ˈlɪm.ɪt.ləs ˈbeɪs.loʊd ˈen.ɚ.dʒi/ (n): Nguồn năng lượng phụ tải nền vô tận
- Multilateral cooperation /ˌmʌl.tiˈlæt̬.ɚ.əl koʊˌɑː.pəˈreɪ.ʃən/ (n): Hợp tác đa phương toàn cầu.`
    });

    qs.push({
      id: "ia4k6_q83",
      partNumber: 10,
      partTitle: "IELTS Speaking Part 3: Biotechnology Ethics, Longevity & Scientific Progress",
      section: "SPEAKING",
      speakingPrompt:
        "1. Should governments place strict legal restrictions on human genome editing technologies such as CRISPR?\n2. What ethical and socioeconomic implications might arise if medical science extends human lifespans to over 120 years?\n3. Do you believe international scientific mega-projects should receive more public funding than national defense budgets?",
      preparationTimeSeconds: 20,
      speakingTimeSeconds: 90,
      questionText:
        "Question 83 (Speaking Part 3): Provide balanced, high-level analytical answers on biotechnology ethics and scientific funding.",
      options: [
            { key: "A", text: "Review Discourse Markers" },
            { key: "B", text: "Check Band 9 Academic Vocabulary" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Complete Full Speaking Section" }
          ],
      correctAnswer: "C",
      explanation: `🎯 [CHIẾN THUẬT PART 3 - CẤU TRÚC PHÂN TÍCH ĐA CHIỀU]
- Đánh giá sự cân bằng giữa tiềm năng y khoa đột phá (chữa bệnh di truyền) và rủi ro đạo đức (chọn lọc phôi, bất bình đẳng sinh học).
- Phân tích thách thức dân số già và chuyển dịch ngân sách quốc tế.

🔍 [BÀI NÓI MẪU BAND 9.0 (90 GIÂY)]
"Gene editing platforms like CRISPR present a delicate ethical paradox. While they offer unprecedented promise in eradicating devastating monogenic disorders like sickle cell anemia, unregulated germline modification risks opening a dystopian gateway toward eugenics and biological class stratification. Therefore, rigorous international bioethics oversight is absolutely imperative.

Regarding radical human longevity, extending lifespans beyond a century would necessitate a complete restructuring of global socioeconomic paradigms. Without corresponding increases in healthy 'healthspans', healthcare infrastructures and pension solvency could face catastrophic collapse, alongside severe intergenerational wealth stagnation.

Finally, reallocating national defense expenditures toward collaborative scientific mega-projects—such as climate mitigation, clean fusion, and pandemic prevention—would yield exponentially higher dividends for long-term civilizational resilience."

💡 [TỪ VỰNG THEN CHỐT]
- Monogenic disorders /ˌmɑː.noʊˈdʒen.ɪk dɪsˈɔːr.dɚz/ (n): Các rối loạn bệnh lý đơn gen
- Germline modification /ˈdʒɝːm.laɪn ˌmɑː.də.fəˈkeɪ.ʃən/ (n): Chỉnh sửa gen dòng tế bào mầm di truyền
- Biological class stratification /ˌbaɪ.əˈlɑː.dʒɪ.kəl klæs ˌstræt̬.ə.fəˈkeɪ.ʃən/ (n): Sự phân tầng giai cấp sinh học
- Intergenerational wealth stagnation /ˌɪn.t̬ɚˌdʒen.əˈreɪ.ʃən.əl welθ stæɡˈneɪ.ʃən/ (n): Sự đình trệ dịch chuyển tài sản giữa các thế hệ.`
    });

    // =========================================================================
    // WRITING AI STUDIO (Q84 - Q85: TASK 1 PROCESS DIAGRAM & TASK 2 ESSAY)
    // =========================================================================
    qs.push({
      id: "ia4k6_q84",
      partNumber: 11,
      partTitle: "IELTS Academic Writing Task 1: Tokamak Nuclear Fusion Cycle Process Diagram",
      section: "WRITING",
      writingPrompt:
        "The diagram illustrates the sequential operational cycle of a magnetic confinement Tokamak nuclear fusion power generation system. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Time suggested: 20 minutes).",
      minWordCount: 150,
      sampleEssay: `The provided process diagram illustrates the linear and cyclical stages involved in generating electrical power through magnetic confinement nuclear fusion within a Tokamak reactor facility.

Overall, the process comprises five principal stages: fuel extraction and injection, magnetic plasma confinement and heating, thermonuclear fusion reaction, heat exchange via high-pressure steam generation, and electricity production paired with closed-loop coolant recycling.

Initially, two isotopes of hydrogen—deuterium extracted from seawater and tritium bred from lithium blankets—are injected as gaseous fuel into the central toroidal vacuum vessel. Surrounding superconducting magnetic coils generate intense poloidal and toroidal magnetic fields to suspend and confine the ionized gas away from the reactor walls. Concurrently, neutral beam injectors and radio-frequency heating systems superheat the fuel to 150 million degrees Celsius, converting it into high-energy plasma.

Under these extreme conditions, deuterium and tritium nuclei fuse, producing helium nuclei and high-energy 14.1 MeV neutrons. These kinetic neutrons penetrate the magnetic field and strike the surrounding beryllium blanket, transferring thermal energy to a liquid coolant loop. This heat is conveyed to a secondary heat exchanger where water is boiled into high-pressure supercritical steam, driving a conventional turbine generator to produce electricity for the power grid. Finally, condensed steam is recycled back into the heat exchanger in an unbroken thermodynamic cycle.`,
      questionText:
        "Question 84 (Writing Task 1): Summarise the Tokamak nuclear fusion energy generation process diagram (min 150 words).",
      options: [
            { key: "A", text: "Review Technical Process Flow Structure" },
            { key: "B", text: "Check Passive Voice Cohesion Markers" },
            { key: "C", text: "Skip to Task 2" },
            { key: "D", text: "Submit Task 1 Process Report for Gemini AI Evaluation" }
          ],
      correctAnswer: "D",
      explanation: `🎯 [CHIẾN THUẬT VIẾT TASK 1 PROCESS DIAGRAM - BAND 9.0]
1. Overview (Bắt buộc):
   - Nêu rõ 5 giai đoạn chính: Nạp nhiên liệu ➔ Từ trường giam giữ & gia nhiệt plasma ➔ Phản ứng nhiệt hạch ➔ Trao đổi nhiệt ➔ Phát điện tuabin hơi và tuần hoàn làm mát.

2. Cấu trúc câu & Ngữ pháp:
   - Sử dụng thể bị động (Passive voice) kết hợp liên từ chỉ thứ tự: "Initially", "Concurrently", "Under these extreme conditions", "Finally".
   - Từ vựng kỹ thuật chuẩn xác: "toroidal vacuum vessel", "superconducting magnetic coils", "kinetic neutrons", "supercritical steam".`
    });

    qs.push({
      id: "ia4k6_q85",
      partNumber: 12,
      partTitle: "IELTS Academic Writing Task 2: Artificial General Intelligence (AGI) Safety Essay",
      section: "WRITING",
      writingPrompt:
        "The rapid development of Artificial General Intelligence (AGI)—systems capable of matching or surpassing human cognitive abilities across all domains—presents unprecedented opportunities for solving scientific and societal challenges, but also existential risks if not properly aligned with human safety. Some experts argue that governments should enforce a global moratorium on advanced AGI development until binding international safety treaties are established. To what extent do you agree or disagree? (Write at least 250 words. Time suggested: 40 minutes).",
      minWordCount: 250,
      sampleEssay: `The relentless acceleration of frontier artificial intelligence toward Artificial General Intelligence (AGI) marks a profound technological inflection point in human civilization. While AGI holds transformative potential to eradicate intractable diseases, optimize global energy distribution, and accelerate scientific discovery, the prospect of autonomous cognitive systems operating beyond human oversight presents existential safety perils. I fully agree that sovereign governments must implement a coordinated international moratorium on training frontier frontier models until binding safety verification protocols and global governance treaties are firmly established.

The primary imperative for a temporary regulatory pause lies in the unresolved nature of the 'AI Alignment Problem.' Current state-of-the-art machine learning architectures, particularly deep neural networks, function largely as black-box systems whose emergent reasoning behaviors, deceptive capabilities, and instrumental sub-goals cannot be deterministically verified or bounded. If an autonomous system possessing superintelligent cognitive dexterity is deployed without rigorous mathematical guarantees of value alignment, the consequences—ranging from automated geopolitical cyber-warfare to irreversible biosecurity proliferation—could prove catastrophic for human survival. A moratorium provides the indispensable temporal window for researchers to pioneer robust mechanistic interpretability and failsafe containment architectures before runaway capabilities are unleashed.

Furthermore, historical precedent demonstrates that existential risks arising from dual-use exponential technologies can only be successfully managed through centralized multilateral consensus. Just as the global community successfully negotiated the Nuclear Non-Proliferation Treaty and strict bans on human reproductive cloning, AGI development demands a synchronized international framework. A unilateral pause by a single nation would merely induce competitive market displacement; therefore, establish an international oversight body modeled on the International Atomic Energy Agency (IAEA)—equipped with hardware-level compute monitoring and mandatory safety audits—is necessary to prevent a reckless commercial arms race.

In conclusion, while the potential dividends of artificial general intelligence are monumental, advancing capability research in the absence of verified safety architectures constitutes an unacceptable existential gamble. Establishing a temporary global moratorium to institute binding international governance treaties is not an impediment to progress, but rather the only rational safeguard to ensure that humanity's most powerful creation remains eternally subservient to human welfare.`,
      questionText:
        "Question 85 (Writing Task 2): Write a 250+ word essay on whether governments should enforce a global moratorium on advanced AGI development.",
      options: [
            { key: "A", text: "Submit Task 2 Essay for Gemini AI Evaluation" },
            { key: "B", text: "Review AGI Alignment Argument Structure" },
            { key: "C", text: "Check Band 9 Academic Collocations" },
            { key: "D", text: "Complete Full IELTS Academic Test" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT BÀI LUẬN OPINION / AGREE OR DISAGREE - BAND 9.0]
1. Task Response:
   - Khẳng định quan điểm hoàn toàn đồng ý (Fully agree).
   - Thân bài 1: Vấn đề cốt lõi AI Alignment Problem (tính toán hộp đen 'black-box', khả năng đánh lừa, rủi ro an ninh sinh học & không gian mạng).
   - Thân bài 2: Bài học lịch sử từ Hiệp ước cấm phổ biến vũ khí hạt nhân (NPT) và cơ chế giám sát compute phần cứng kiểu IAEA.
   - Kết luận: Khẳng định tạm dừng để xây dựng an toàn là lá chắn duy nhất bảo vệ nhân loại.

2. Lexical Resource (C2 Academic):
   - "technological inflection point", "AI Alignment Problem", "emergent reasoning behaviors", "mechanistic interpretability", "multilateral consensus", "existential gamble", "eternally subservient to human welfare".`
    });

    return qs;
  })()
};
