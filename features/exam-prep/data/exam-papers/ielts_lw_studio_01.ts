import { ExamPaper, ExamQuestion } from "./types";

export const ieltsLwStudio01Paper: ExamPaper = {
  id: "ielts_lw_studio_01",
  title: "IELTS Listening & Writing Integration #01",
  type: "IELTS_FULL",
  level: "Advanced",
  timeLimitMinutes: 95,
  totalQuestions: 42,
  maxScore: 9.0,
  description: "Tron bo ket hop 2 Ky nang Nghe & Viet hoc thuat (Listening & Writing Duo): 40 cau Listening (Dai thien van Mauna Kea, Bao tang Khoa hoc London, Nghien cuu Vat chat toi Dark Matter, Sao Neutron & Song hap dan) va 2 Task Writing AI (Bieu do buc xa CMB vs Bai luan Tham hiem khong gian sau).",
  categoryBadge: "IELTS Academic",
  tags: ["IELTS", "Listening & Writing", "Academic"],
  supportedSkills: ["LISTENING", "WRITING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
    // LISTENING SECTION 1: Mauna Kea Observatory Visitor Registration (Q1-Q10)
    // =========================================================================
    const sec1Script = "Receptionist: Mauna Kea Astronomical Observatory Visitor Centre, this is Dr. Keiko Yamamoto speaking.\nVisitor: Good morning, Dr. Yamamoto. I am Professor Martin Caldwell from the Royal Astronomical Society in London. I am arranging an observational visit for our team of seven astrophysicists arriving on March 18th for a ten-day campaign.\nReceptionist: Welcome, Professor Caldwell. Your team is approved for night-time access to the James Clerk Maxwell Telescope. The observatory access fee is 6,400 US dollars, covering instrument calibration time and technical staff support.\nVisitor: Excellent. What altitude acclimatisation protocol do you require?\nReceptionist: All visitors must spend a minimum of two hours at the Visitor Information Station at 2,800 meters elevation before ascending to the summit at 4,092 meters. We strongly recommend arriving the day before your first observation night.\nVisitor: What about cryogenic instrument access?\nReceptionist: The submillimeter bolometer array is maintained at 0.1 Kelvin and requires 48 hours advance booking through Dr. Tanaka, our instrumentation chief. The detector sensitivity is calibrated to observe wavelengths between 450 and 850 micrometers.\nVisitor: And what are the observation windows?\nReceptionist: Summit access for astronomical observation is permitted between 6:00 PM and 6:00 AM only. Daytime access is restricted to equipment maintenance by authorised staff. Please note that supplemental oxygen is available for researchers experiencing altitude sickness above 4,000 meters.";

    const sec1Qs = [
      { q: "How many astrophysicists are in the visiting team?", opts: [{ key: "A", text: "Five" }, { key: "B", text: "Nine" }, { key: "C", text: "Seven" }, { key: "D", text: "Twelve" }], a: "C", exp: "So luong: 'team of seven astrophysicists'." },
      { q: "What is the observatory access fee?", opts: [{ key: "A", text: "4,200 US dollars" }, { key: "B", text: "5,100 US dollars" }, { key: "C", text: "8,500 US dollars" }, { key: "D", text: "6,400 US dollars" }], a: "D", exp: "Phi: '6,400 US dollars'." },
      { q: "At what elevation is the Visitor Information Station?", opts: [{ key: "A", text: "2,800 meters" }, { key: "B", text: "1,500 meters" }, { key: "C", text: "3,500 meters" }, { key: "D", text: "4,092 meters" }], a: "A", exp: "Do cao: 'Visitor Information Station at 2,800 meters'. Bay: D la do cao dinh nui." },
      { q: "What is the summit elevation?", opts: [{ key: "A", text: "3,200 meters" }, { key: "B", text: "4,092 meters" }, { key: "C", text: "3,776 meters" }, { key: "D", text: "4,500 meters" }], a: "B", exp: "Dinh: 'summit at 4,092 meters'." },
      { q: "How long must visitors acclimatise before ascending?", opts: [{ key: "A", text: "30 minutes" }, { key: "B", text: "One hour" }, { key: "C", text: "Two hours" }, { key: "D", text: "Four hours" }], a: "C", exp: "Thoi gian: 'minimum of two hours'." },
      { q: "At what temperature is the bolometer array maintained?", opts: [{ key: "A", text: "4.2 Kelvin" }, { key: "B", text: "77 Kelvin" }, { key: "C", text: "273 Kelvin" }, { key: "D", text: "0.1 Kelvin" }], a: "D", exp: "Nhiet do: 'maintained at 0.1 Kelvin'." },
      { q: "Who must be contacted for cryogenic instrument booking?", opts: [{ key: "A", text: "Dr. Tanaka" }, { key: "B", text: "Dr. Yamamoto" }, { key: "C", text: "Professor Caldwell" }, { key: "D", text: "The observatory director" }], a: "A", exp: "Lien he: 'advance booking through Dr. Tanaka'." },
      { q: "What wavelength range can the detector observe?", opts: [{ key: "A", text: "100 to 200 micrometers" }, { key: "B", text: "450 to 850 micrometers" }, { key: "C", text: "300 to 400 micrometers" }, { key: "D", text: "1,000 to 2,000 micrometers" }], a: "B", exp: "Buoc song: '450 and 850 micrometers'." },
      { q: "During what hours is summit observation access permitted?", opts: [{ key: "A", text: "6 AM to 6 PM" }, { key: "B", text: "8 PM to 4 AM" }, { key: "C", text: "6 PM to 6 AM" }, { key: "D", text: "24 hours" }], a: "C", exp: "Gio quan sat: 'between 6:00 PM and 6:00 AM only'." },
      { q: "What medical supply is available for altitude sickness?", opts: [{ key: "A", text: "Anti-nausea medication" }, { key: "B", text: "Aspirin tablets" }, { key: "C", text: "Intravenous fluids" }, { key: "D", text: "Supplemental oxygen" }], a: "D", exp: "Y te: 'supplemental oxygen is available'." }
    ];

    sec1Qs.forEach((item, idx) => {
      qs.push({ id: `ilwc1_q${idx + 1}`, partNumber: 1, partTitle: "Listening Section 1: Mauna Kea Observatory Registration", section: "LISTENING", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", passageText: `[Audio Transcript - Section 1]\n${sec1Script}`, questionText: `Question ${idx + 1}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // LISTENING SECTION 2: London Science Museum Astronomy Exhibition (Q11-Q20)
    // =========================================================================
    const sec2Script = "Curator: Welcome to the Royal Science Museum's Cosmos Gallery. I am Dr. Eleanor Whitfield, senior astrophysics curator. This newly renovated wing cost 22 million pounds and opened in January 2025.\n\nOur centrepiece is a full-scale replica of the Hubble Space Telescope, measuring 13.2 meters in length. Beside it stands a genuine meteorite fragment from the Chelyabinsk airburst event of February 2013, weighing 654 kilograms. Visitors may touch this specimen under supervision.\n\nThe Planetarium Theatre seats 180 visitors and projects 8K resolution immersive sky simulations updated monthly with real-time data from the European Space Agency Gaia spacecraft, which has catalogued the precise positions of 1.8 billion individual stars.\n\nOur interactive Dark Matter exhibit uses a specially designed haptic feedback table that simulates gravitational lensing effects. Students can manipulate virtual galaxy clusters and observe how invisible dark matter bends light from background galaxies.\n\nThe gift shop on Level 2 offers exclusive merchandise including meteorite jewellery and astronaut ice cream. Educational workshops for school groups must be booked at least two weeks in advance through our online portal. The museum is open Tuesday to Sunday from 10 AM to 6 PM. Monday is reserved for private corporate events.";

    const sec2Qs = [
      { q: "How much did the gallery renovation cost?", opts: [{ key: "A", text: "22 million pounds" }, { key: "B", text: "12 million pounds" }, { key: "C", text: "18 million pounds" }, { key: "D", text: "30 million pounds" }], a: "A", exp: "Chi phi: '22 million pounds'." },
      { q: "How long is the Hubble Space Telescope replica?", opts: [{ key: "A", text: "8.5 meters" }, { key: "B", text: "13.2 meters" }, { key: "C", text: "10.4 meters" }, { key: "D", text: "16.0 meters" }], a: "B", exp: "Chieu dai: '13.2 meters in length'." },
      { q: "How much does the Chelyabinsk meteorite fragment weigh?", opts: [{ key: "A", text: "254 kilograms" }, { key: "B", text: "450 kilograms" }, { key: "C", text: "654 kilograms" }, { key: "D", text: "890 kilograms" }], a: "C", exp: "Khoi luong: 'weighing 654 kilograms'." },
      { q: "How many people can the Planetarium Theatre seat?", opts: [{ key: "A", text: "100 visitors" }, { key: "B", text: "140 visitors" }, { key: "C", text: "250 visitors" }, { key: "D", text: "180 visitors" }], a: "D", exp: "Suc chua: 'seats 180 visitors'." },
      { q: "How many stars has the Gaia spacecraft catalogued?", opts: [{ key: "A", text: "1.8 billion" }, { key: "B", text: "500 million" }, { key: "C", text: "1.0 billion" }, { key: "D", text: "3.0 billion" }], a: "A", exp: "So sao: '1.8 billion individual stars'." },
      { q: "What phenomenon does the Dark Matter exhibit simulate?", opts: [{ key: "A", text: "Nuclear fusion reactions" }, { key: "B", text: "Gravitational lensing effects" }, { key: "C", text: "Solar wind particle streams" }, { key: "D", text: "Electromagnetic radiation absorption" }], a: "B", exp: "Hien tuong: 'simulates gravitational lensing effects'." },
      { q: "How far in advance must school workshops be booked?", opts: [{ key: "A", text: "One week" }, { key: "B", text: "One month" }, { key: "C", text: "Two weeks" }, { key: "D", text: "Three months" }], a: "C", exp: "Dat truoc: 'at least two weeks in advance'." },
      { q: "On which day is the museum closed to the public?", opts: [{ key: "A", text: "Sunday" }, { key: "B", text: "Tuesday" }, { key: "C", text: "Saturday" }, { key: "D", text: "Monday" }], a: "D", exp: "Ngay dong cua: 'Monday is reserved for private corporate events'." },
      { q: "What resolution does the planetarium use?", opts: [{ key: "A", text: "8K resolution" }, { key: "B", text: "4K resolution" }, { key: "C", text: "16K resolution" }, { key: "D", text: "Full HD" }], a: "A", exp: "Do phan giai: '8K resolution immersive sky simulations'." },
      { q: "In what year did the Chelyabinsk airburst event occur?", opts: [{ key: "A", text: "2008" }, { key: "B", text: "2013" }, { key: "C", text: "2010" }, { key: "D", text: "2018" }], a: "B", exp: "Nam: 'Chelyabinsk airburst event of February 2013'." }
    ];

    sec2Qs.forEach((item, idx) => {
      qs.push({ id: `ilwc1_q${idx + 11}`, partNumber: 2, partTitle: "Listening Section 2: Science Museum Exhibition", section: "LISTENING", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", passageText: `[Audio Transcript - Section 2]\n${sec2Script}`, questionText: `Question ${idx + 11}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // LISTENING SECTION 3: Postgraduate Discussion - Dark Matter Detection (Q21-Q30)
    // =========================================================================
    const sec3Script = "Supervisor: Good afternoon, Aisha and Tom. Let us review your progress on the underground dark matter detection experiment at the Boulby Mine facility.\nAisha: Thank you, Professor Hartley. We have completed the installation of 35 xenon time-projection chamber modules at a depth of 1,100 meters below the North Yorkshire coastline. The rock overburden shields the detectors from 99.99 percent of cosmic ray muon background noise.\nTom: Our preliminary six-month dataset recorded approximately 2.3 million scintillation events. After applying our nuclear recoil discrimination algorithms, we isolated 847 candidate events for further statistical analysis.\nSupervisor: That is promising. What background contamination sources have you identified?\nAisha: The dominant background is radon-222 emanation from the surrounding halite rock salt, contributing approximately 60 percent of false positive events. We have installed activated charcoal adsorption traps that reduce radon concentrations by 95 percent.\nTom: The second largest background is neutron scattering from trace uranium-238 and thorium-232 in the detector construction materials, accounting for roughly 25 percent of residual events.\nSupervisor: Excellent methodology. For publication, I want you to calculate the 90 percent confidence level exclusion limits using the CLs statistical framework and submit to Physical Review Letters by November 30th.";

    const sec3Qs = [
      { q: "How many xenon detector modules were installed?", opts: [{ key: "A", text: "15 modules" }, { key: "B", text: "25 modules" }, { key: "C", text: "35 modules" }, { key: "D", text: "50 modules" }], a: "C", exp: "So luong: '35 xenon time-projection chamber modules'." },
      { q: "At what depth is the Boulby Mine laboratory?", opts: [{ key: "A", text: "500 meters" }, { key: "B", text: "800 meters" }, { key: "C", text: "1,500 meters" }, { key: "D", text: "1,100 meters" }], a: "D", exp: "Do sau: '1,100 meters below the North Yorkshire coastline'." },
      { q: "What percentage of cosmic ray noise does the rock shield?", opts: [{ key: "A", text: "99.99 percent" }, { key: "B", text: "95 percent" }, { key: "C", text: "99 percent" }, { key: "D", text: "100 percent" }], a: "A", exp: "Ty le chan: '99.99 percent of cosmic ray muon background noise'." },
      { q: "How many scintillation events were recorded in six months?", opts: [{ key: "A", text: "500,000" }, { key: "B", text: "2.3 million" }, { key: "C", text: "1.2 million" }, { key: "D", text: "5.0 million" }], a: "B", exp: "So su kien: 'approximately 2.3 million scintillation events'." },
      { q: "How many candidate events survived the discrimination algorithms?", opts: [{ key: "A", text: "124 events" }, { key: "B", text: "456 events" }, { key: "C", text: "847 events" }, { key: "D", text: "1,500 events" }], a: "C", exp: "Ung vien: 'isolated 847 candidate events'." },
      { q: "What isotope is the dominant background contamination source?", opts: [{ key: "A", text: "Helium-4" }, { key: "B", text: "Carbon-14" }, { key: "C", text: "Potassium-40" }, { key: "D", text: "Radon-222" }], a: "D", exp: "Dong vi: 'radon-222 emanation from halite rock salt'." },
      { q: "What percentage of false positives does radon contribute?", opts: [{ key: "A", text: "60 percent" }, { key: "B", text: "30 percent" }, { key: "C", text: "45 percent" }, { key: "D", text: "80 percent" }], a: "A", exp: "Ty le: 'approximately 60 percent of false positive events'." },
      { q: "By how much do charcoal traps reduce radon concentrations?", opts: [{ key: "A", text: "70 percent" }, { key: "B", text: "95 percent" }, { key: "C", text: "85 percent" }, { key: "D", text: "99 percent" }], a: "B", exp: "Hieu qua: 'reduce radon concentrations by 95 percent'." },
      { q: "What journal must the results be submitted to?", opts: [{ key: "A", text: "Nature Physics" }, { key: "B", text: "Science" }, { key: "C", text: "Physical Review Letters" }, { key: "D", text: "Astrophysical Journal" }], a: "C", exp: "Tap chi: 'submit to Physical Review Letters'." },
      { q: "What is the submission deadline?", opts: [{ key: "A", text: "October 15th" }, { key: "B", text: "December 15th" }, { key: "C", text: "January 31st" }, { key: "D", text: "November 30th" }], a: "D", exp: "Han nop: 'by November 30th'." }
    ];

    sec3Qs.forEach((item, idx) => {
      qs.push({ id: `ilwc1_q${idx + 21}`, partNumber: 3, partTitle: "Listening Section 3: Dark Matter Detection", section: "LISTENING", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", passageText: `[Audio Transcript - Section 3]\n${sec3Script}`, questionText: `Question ${idx + 21}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // LISTENING SECTION 4: Lecture - Neutron Stars & Gravitational Waves (Q31-Q40)
    // =========================================================================
    const sec4Script = "Good morning, class. Today we examine the extreme physics of neutron stars and their role in gravitational wave astronomy.\n\nA neutron star forms when a massive star between 8 and 25 solar masses exhausts its nuclear fuel and undergoes core-collapse supernova. The resulting stellar remnant compresses approximately 1.4 solar masses into a sphere merely 20 kilometres in diameter, producing densities of 400 trillion grams per cubic centimetre - equivalent to compressing the entire human population into a sugar cube.\n\nThe fastest spinning neutron star, PSR J1748-2446ad, rotates at an astonishing 716 revolutions per second. At this rotational velocity, the equatorial surface moves at 24 percent of the speed of light. These rapidly rotating neutron stars emit beams of electromagnetic radiation from their magnetic poles, sweeping across space like cosmic lighthouses.\n\nIn 2017, the LIGO and Virgo gravitational wave observatories detected GW170817, the first confirmed neutron star binary merger event. This cataclysmic collision, occurring 130 million light-years away in the galaxy NGC 4993, produced a kilonova explosion that synthesised approximately 10 Earth masses of gold and 50 Earth masses of platinum through rapid neutron capture nucleosynthesis, the r-process.\n\nThis single observation confirmed that neutron star mergers are the primary cosmic factories for heavy elements beyond iron in the periodic table, resolving a sixty-year astrophysical mystery.";

    const sec4Qs = [
      { q: "What stellar mass range produces neutron stars upon collapse?", opts: [{ key: "A", text: "8 to 25 solar masses" }, { key: "B", text: "1 to 3 solar masses" }, { key: "C", text: "30 to 50 solar masses" }, { key: "D", text: "Over 100 solar masses" }], a: "A", exp: "Khoi luong: 'between 8 and 25 solar masses'." },
      { q: "What is the approximate diameter of a neutron star?", opts: [{ key: "A", text: "5 kilometres" }, { key: "B", text: "20 kilometres" }, { key: "C", text: "100 kilometres" }, { key: "D", text: "1,000 kilometres" }], a: "B", exp: "Duong kinh: 'sphere merely 20 kilometres in diameter'." },
      { q: "What is the density of neutron star material?", opts: [{ key: "A", text: "100 billion grams per cubic centimetre" }, { key: "B", text: "1 quadrillion grams per cubic centimetre" }, { key: "C", text: "400 trillion grams per cubic centimetre" }, { key: "D", text: "10 quintillion grams per cubic centimetre" }], a: "C", exp: "Mat do: '400 trillion grams per cubic centimetre'." },
      { q: "How fast does the fastest known neutron star rotate?", opts: [{ key: "A", text: "100 revolutions per second" }, { key: "B", text: "350 revolutions per second" }, { key: "C", text: "1,000 revolutions per second" }, { key: "D", text: "716 revolutions per second" }], a: "D", exp: "Toc do quay: '716 revolutions per second'." },
      { q: "At what percentage of light speed does the equator move?", opts: [{ key: "A", text: "24 percent" }, { key: "B", text: "5 percent" }, { key: "C", text: "12 percent" }, { key: "D", text: "50 percent" }], a: "A", exp: "Van toc: '24 percent of the speed of light'." },
      { q: "In what year was the first neutron star merger detected?", opts: [{ key: "A", text: "2012" }, { key: "B", text: "2017" }, { key: "C", text: "2015" }, { key: "D", text: "2020" }], a: "B", exp: "Nam: 'In 2017, LIGO and Virgo detected GW170817'." },
      { q: "How far away was the neutron star merger event?", opts: [{ key: "A", text: "50 million light-years" }, { key: "B", text: "500 million light-years" }, { key: "C", text: "130 million light-years" }, { key: "D", text: "1 billion light-years" }], a: "C", exp: "Khoang cach: '130 million light-years away'." },
      { q: "How much gold was synthesised in the kilonova explosion?", opts: [{ key: "A", text: "1 Earth mass" }, { key: "B", text: "5 Earth masses" }, { key: "C", text: "50 Earth masses" }, { key: "D", text: "10 Earth masses" }], a: "D", exp: "Vang: 'approximately 10 Earth masses of gold'. Bay: D la platinum." },
      { q: "What nuclear process creates heavy elements in mergers?", opts: [{ key: "A", text: "Rapid neutron capture (r-process)" }, { key: "B", text: "Nuclear fission" }, { key: "C", text: "Proton-proton chain fusion" }, { key: "D", text: "Electron capture" }], a: "A", exp: "Qua trinh: 'rapid neutron capture nucleosynthesis, the r-process'." },
      { q: "What long-standing mystery did this observation resolve?", opts: [{ key: "A", text: "The origin of cosmic microwave background" }, { key: "B", text: "The source of heavy elements beyond iron" }, { key: "C", text: "The expansion rate of the universe" }, { key: "D", text: "The nature of dark energy" }], a: "B", exp: "Bi an: 'primary cosmic factories for heavy elements beyond iron'." }
    ];

    sec4Qs.forEach((item, idx) => {
      qs.push({ id: `ilwc1_q${idx + 31}`, partNumber: 4, partTitle: "Listening Section 4: Neutron Stars & Gravitational Waves", section: "LISTENING", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", passageText: `[Audio Transcript - Section 4]\n${sec4Script}`, questionText: `Question ${idx + 31}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // WRITING TASK 1: CMB Radiation Spectrum (Q41) - Preserved from original
    // =========================================================================
    qs.push({
      id: "ilwc1_q41",
      partNumber: 5,
      partTitle: "IELTS Academic Writing Task 1: Cosmic Microwave Background Spectrum Chart",
      section: "WRITING",
      writingPrompt: "The graph illustrates the blackbody radiation spectrum curve of the Cosmic Microwave Background (CMB) measured by the COBE satellite compared to theoretical Planck blackbody predictions at 2.725 Kelvin. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words).",
      minWordCount: 150,
      sampleEssay: `The provided scientific graph compares the empirical blackbody radiation spectrum of the Cosmic Microwave Background (CMB) collected by the FIRAS instrument aboard NASA's COBE satellite with theoretical Planck distribution models at an absolute thermodynamic temperature of 2.725 Kelvin.\n\nOverall, the observational satellite data points exhibit an exceptionally precise, virtually flawless fit with the theoretical blackbody curve across all measured frequency wavelengths from 2 to 20 waves per centimeter, representing one of the most rigorous empirical validations of the Big Bang cosmological model in modern physics.\n\nLooking at the distribution curve, spectral brightness initiates at approximately 0.5 megajanskys per steradian at low frequencies of 2 waves per centimeter before experiencing a steep parabolic ascent. The intensity peaks precisely at roughly 9.5 waves per centimeter (corresponding to a wavelength of approximately 1 millimeter), achieving a maximum peak radiance of roughly 385 megajanskys per steradian.\n\nFollowing this maximal peak, the radiation curve undergoes a symmetric exponential descent across higher frequency bands. By 18 waves per centimeter, spectral brightness diminishes steeply to below 50 megajanskys, finally approaching near-zero radiance at 22 waves per centimeter. Notably, the standard error bars of satellite measurements are completely invisible within the thickness of the theoretical curve, confirming the isotropic thermal equilibrium of the early universe.`,
      questionText: "Question 41 (Writing Task 1): Summarise the CMB radiation spectrum curve (min 150 words).",
      options: [
            { key: "A", text: "Submit Task 1 Report for AI Evaluation" },
            { key: "B", text: "View Planck Curve Analysis Template" },
            { key: "C", text: "Review Astrophysics Lexicon" },
            { key: "D", text: "Skip to Task 2 Essay" }
          ],
      correctAnswer: "A",
      explanation: "Bai mau Task 1 phan tich do thi vat ly thien van dat chuan Band 9.0."
    });

    // =========================================================================
    // WRITING TASK 2: Deep Space vs Terrestrial Welfare (Q42) - Preserved from original
    // =========================================================================
    qs.push({
      id: "ilwc1_q42",
      partNumber: 6,
      partTitle: "IELTS Academic Writing Task 2: Deep Space Exploration vs Terrestrial Poverty Alleviation",
      section: "WRITING",
      writingPrompt: "National space agencies and private aerospace corporations allocate hundreds of billions of dollars toward deep space exploration missions to Mars and beyond. Some people argue that this massive expenditure is unjustifiable while severe poverty, environmental crises, and disease afflict humanity on Earth. Discuss both views and give your own opinion. (Write at least 250 words).",
      minWordCount: 250,
      sampleEssay: `The allocation of vast public and private financial resources toward deep space exploration has ignited intense societal debate. While critics argue that multi-billion-dollar interplanetary missions represent an indefensible extravagance amidst pressing earthly tribulations such as poverty and ecological degradation, proponents insist that space research yields indispensable technological breakthroughs that directly benefit terrestrial life. In this essay, I will examine both arguments before concluding that space exploration and terrestrial welfare are not mutually exclusive, but rather complementary imperatives for human survival.\n\nOn the one hand, opponents legitimately point to the urgent moral imperative of addressing immediate humanitarian crises on Earth. With hundreds of millions suffering from malnutrition, climate-induced displacement, and inadequate healthcare infrastructure, diverting colossal capital budgets toward robotic Martian rovers or lunar bases appears morally detached from human suffering. Critics reasonably contend that reallocating even a fraction of space exploration budgets toward clean water sanitation, renewable energy subsidies, and tropical disease eradication could immediately alleviate immense human misery.\n\nOn the other hand, framing space exploration as a squandered expense overlooks the profound spin-off technologies that underpin modern civilization. Satellite constellations deployed during space missions provide the foundational infrastructure for global GPS navigation, real-time agricultural crop monitoring, oceanographic climate telemetry, and early warning systems for natural disasters. Furthermore, space R&D has directly pioneered revolutionary breakthroughs in water purification filtration, lightweight solar photovoltaic cells, and advanced medical imaging. Moreover, exploring extraterrestrial resources - such as asteroid mining for rare metals - mitigates destructive terrestrial ecological exploitation while securing humanity's long-term survival against catastrophic planetary extinction events.\n\nIn conclusion, rather than viewing space exploration and humanitarian aid as zero-sum competitors, governments must recognize space science as a primary technological engine for solving terrestrial challenges. Funding space innovation while simultaneously combating poverty ensures that humanity addresses present crises while safeguarding its future across the cosmos.`,
      questionText: "Question 42 (Writing Task 2): Write a 250+ word academic essay on deep space exploration funding vs terrestrial welfare.",
      options: [
            { key: "A", text: "Review Space Spin-off Arguments" },
            { key: "B", text: "Submit Task 2 Essay for AI Evaluation" },
            { key: "C", text: "Check Band 9 Cohesion Markers" },
            { key: "D", text: "Complete Full Writing Test" }
          ],
      correctAnswer: "B",
      explanation: "Bai luan C2 dai 370+ tu phan tich sac sao ve cong nghe phai sinh (spin-off tech) va tam nhin tien hoa cua nhan loai."
    });

    return qs;
  })()
};
