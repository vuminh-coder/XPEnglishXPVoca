import { ExamPaper, ExamQuestion } from "./types";

export const ieltsAcademic4k04Paper: ExamPaper = {
  id: "ielts_academic_4k_04",
  title: "IELTS Academic Official Test #04 (4-Skills)",
  type: "IELTS_FULL",
  level: "Advanced",
  timeLimitMinutes: 175,
  totalQuestions: 85,
  maxScore: 9.0,
  description: "Bộ đề thi IELTS Academic Test #04 chuẩn Cambridge gồm 40 câu Listening, 40 câu Reading, Speaking AI 3 Part và 2 Writing Tasks.",
  categoryBadge: "IELTS Academic",
  tags: ["IELTS", "Cambridge", "Test 04", "Academic", "Band 9.0 Standard"],
  supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // SECTION 1: Community Solar Cooperative Enrollment (Q1 - Q10)
    const sec1Script =
      "Advisor: Good morning, Melbourne Clean Energy Cooperative. My name is Rebecca. How can I help you?\n" +
      "Homeowner: Hello! I am calling to inquire about enrolling our household in the community rooftop solar shared grid program.\n" +
      "Advisor: That is wonderful! Let me take down your enrollment details. What is your full name and property address?\n" +
      "Homeowner: My name is Marcus Sterling. The address is 74 Windmill Road, Richmond, Victoria.\n" +
      "Advisor: Thank you, Mr. Sterling. And what is your daytime contact telephone number?\n" +
      "Homeowner: It is 0412 889 304.\n" +
      "Advisor: Great. Based on your roof surface area and sun exposure orientation, our engineers recommend our standard 10-kilowatt monocrystalline solar package, which includes 24 tier-one solar panels and a hybrid inverter.\n" +
      "Homeowner: How much electrical power is that estimated to generate annually?\n" +
      "Advisor: Approximately 14,500 kilowatt-hours per year, which will offset about 85 percent of an average four-bedroom home's electricity demand.\n" +
      "Homeowner: What is the total installation cost after government green energy rebates?\n" +
      "Advisor: The net cost is 5,400 Australian dollars, with a guaranteed payback period of 3.5 years. Surplus electricity exported back to the main grid earns a feed-in tariff of 12 cents per kilowatt-hour.\n" +
      "Homeowner: That sounds fantastic! When can a technical site inspector visit our home?\n" +
      "Advisor: Our certified electrical inspector can conduct the structural roof assessment this Thursday at 2:30 PM.";

    const sec1Questions = [
      { q: "What is the homeowner's full name?", opts: [{ key: "A", text: "Julian Thorne" }, { key: "B", text: "Marcus Sterling" }, { key: "C", text: "Edward Davies" }, { key: "D", text: "Arthur Campbell" }], a: "B", exp: "Họ tên chủ nhà: 'My name is Marcus Sterling'." },
      { q: "What is the property address in Richmond?", opts: [{ key: "A", text: "12 King Street" }, { key: "B", text: "88 Ocean Avenue" }, { key: "C", text: "74 Windmill Road" }, { key: "D", text: "105 High Street" }], a: "C", exp: "Địa chỉ: '74 Windmill Road, Richmond, Victoria'." },
      { q: "What is Marcus's telephone contact number?", opts: [{ key: "A", text: "0412 550 192" }, { key: "B", text: "0412 774 881" }, { key: "C", text: "0412 334 900" }, { key: "D", text: "0412 889 304" }], a: "D", exp: "Số điện thoại: '0412 889 304'." },
      { q: "What solar package capacity is recommended?", opts: [{ key: "A", text: "10-kilowatt monocrystalline package" }, { key: "B", text: "5-kilowatt package" }, { key: "C", text: "15-kilowatt industrial array" }, { key: "D", text: "20-kilowatt commercial system" }], a: "A", exp: "Công suất hệ thống: 'standard 10-kilowatt monocrystalline solar package'." },
      { q: "How many tier-one solar panels are included in the package?", opts: [{ key: "A", text: "12 panels" }, { key: "B", text: "24 tier-one solar panels" }, { key: "C", text: "18 panels" }, { key: "D", text: "36 panels" }], a: "B", exp: "Số lượng tấm pin: '24 tier-one solar panels'." },
      { q: "How much electrical energy will the system generate annually?", opts: [{ key: "A", text: "5,000 kWh" }, { key: "B", text: "10,000 kWh" }, { key: "C", text: "Approximately 14,500 kilowatt-hours" }, { key: "D", text: "25,000 kWh" }], a: "C", exp: "Sản lượng điện hàng năm: 'Approximately 14,500 kilowatt-hours per year'." },
      { q: "What percentage of electricity demand will be offset?", opts: [{ key: "A", text: "50 percent" }, { key: "B", text: "65 percent" }, { key: "C", text: "100 percent" }, { key: "D", text: "About 85 percent" }], a: "D", exp: "Tỷ lệ bù đắp: 'offset about 85 percent of an average four-bedroom home's electricity demand'." },
      { q: "What is the net installation cost after government rebates?", opts: [{ key: "A", text: "5,400 Australian dollars" }, { key: "B", text: "3,200 AUD" }, { key: "C", text: "7,800 AUD" }, { key: "D", text: "10,500 AUD" }], a: "A", exp: "Chi phí lắp đặt ròng: 'net cost is 5,400 Australian dollars'." },
      { q: "What is the feed-in tariff for surplus exported power?", opts: [{ key: "A", text: "5 cents per kWh" }, { key: "B", text: "12 cents per kilowatt-hour" }, { key: "C", text: "8 cents per kWh" }, { key: "D", text: "20 cents per kWh" }], a: "B", exp: "Giá bán điện thừa lên lưới: 'feed-in tariff of 12 cents per kilowatt-hour'." },
      { q: "When is the technical roof assessment scheduled?", opts: [{ key: "A", text: "Tomorrow morning at 9:00 AM" }, { key: "B", text: "Friday afternoon at 4:00 PM" }, { key: "C", text: "This Thursday at 2:30 PM" }, { key: "D", text: "Next Monday at 11:00 AM" }], a: "C", exp: "Lịch khảo sát mái: 'this Thursday at 2:30 PM'." }
    ];

    sec1Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k4_q${idx + 1}`,
        partNumber: 1,
        partTitle: "Listening Section 1: Community Solar Enrollment",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
        questionText: `Question ${idx + 1}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 2: National Aerospace & Planetarium Tour (Q11 - Q20)
    const sec2Script =
      "Director: Welcome to the National Center for Aerospace & Deep-Space Exploration. I am Dr. Aris Thorne, Director of Public Science Engagement. Today marks the unveiling of our new James Webb Space Telescope Interactive Pavilion. In Gallery 1, visitors can examine a full-scale replica of the telescope's 6.5-meter gold-coated beryllium primary mirror, alongside interactive spectral analysis terminals demonstrating how infrared light pierces cosmic dust clouds to image the earliest galaxies formed 13.5 billion years ago. Gallery 2 houses the Mars 2028 Sample Return Rover exhibit, where robotic arms simulate drilling rock cores from the Jezero Crater. Our state-of-the-art 8K digital planetarium dome features hourly immersive screenings exploring exoplanetary atmospheres. Audio headsets with narrated guides are available in nine languages at the welcome foyer for 4 pounds. Please be reminded that flash photography inside the dark star dome is strictly prohibited. The AstroCafe on Level 3 serves lunch and snacks from 11:00 AM to 3:30 PM.";

    const sec2Questions = [
      { q: "What new exhibition pavilion is opening today?", opts: [{ key: "A", text: "Lunar Landing Apollo Wing" }, { key: "B", text: "Commercial Rocket Pavilion" }, { key: "C", text: "Asteroid Mining Lab" }, { key: "D", text: "James Webb Space Telescope Interactive Pavilion" }], a: "D", exp: "Khu triển lãm mới: 'James Webb Space Telescope Interactive Pavilion'." },
      { q: "How wide is the telescope's primary mirror replica in Gallery 1?", opts: [{ key: "A", text: "6.5-meter gold-coated beryllium mirror" }, { key: "B", text: "2.4 meters" }, { key: "C", text: "4.0 meters" }, { key: "D", text: "10.0 meters" }], a: "A", exp: "Kích thước gương chính: '6.5-meter gold-coated beryllium primary mirror'." },
      { q: "What type of light does the James Webb telescope use to pierce cosmic dust?", opts: [{ key: "A", text: "Ultraviolet rays" }, { key: "B", text: "Infrared light" }, { key: "C", text: "X-rays" }, { key: "D", text: "Visible green light" }], a: "B", exp: "Loại ánh sáng quan sát: 'how infrared light pierces cosmic dust clouds'." },
      { q: "How far back in cosmic time can the telescope observe galaxies?", opts: [{ key: "A", text: "1 million years ago" }, { key: "B", text: "500 million years ago" }, { key: "C", text: "13.5 billion years ago" }, { key: "D", text: "50 billion years ago" }], a: "C", exp: "Thời gian vũ trụ: 'earliest galaxies formed 13.5 billion years ago'." },
      { q: "What rover mission is showcased in Gallery 2?", opts: [{ key: "A", text: "Curiosity Rover" }, { key: "B", text: "Voyager 1" }, { key: "C", text: "Cassini-Huygens" }, { key: "D", text: "Mars 2028 Sample Return Rover" }], a: "D", exp: "Tên mô hình robot: 'Mars 2028 Sample Return Rover exhibit'." },
      { q: "Which Martian crater is featured in the rock core simulation?", opts: [{ key: "A", text: "Jezero Crater" }, { key: "B", text: "Gale Crater" }, { key: "C", text: "Valles Marineris" }, { key: "D", text: "Olympus Mons" }], a: "A", exp: "Miệng núi lửa trên sao Hỏa: 'drilling rock cores from the Jezero Crater'." },
      { q: "What resolution does the digital planetarium dome feature?", opts: [{ key: "A", text: "Full HD 1080p" }, { key: "B", text: "8K digital planetarium dome" }, { key: "C", text: "4K resolution" }, { key: "D", text: "16K IMAX" }], a: "B", exp: "Độ phân giải mái vòm: 'state-of-the-art 8K digital planetarium dome'." },
      { q: "How much does audio guide headset rental cost?", opts: [{ key: "A", text: "2 pounds" }, { key: "B", text: "6 pounds" }, { key: "C", text: "4 pounds" }, { key: "D", text: "Free" }], a: "C", exp: "Phí thuê tai nghe hướng dẫn: 'available at the welcome foyer for 4 pounds'." },
      { q: "What activity is strictly prohibited inside the star dome?", opts: [{ key: "A", text: "Wearing glasses" }, { key: "B", text: "Sitting in front rows" }, { key: "C", text: "Drinking bottled water" }, { key: "D", text: "Flash photography" }], a: "D", exp: "Hành vi bị nghiêm cấm: 'flash photography inside the dark star dome is strictly prohibited'." },
      { q: "What are the operating hours of the AstroCafe on Level 3?", opts: [{ key: "A", text: "11:00 AM - 3:30 PM" }, { key: "B", text: "9:00 AM - 1:00 PM" }, { key: "C", text: "12:00 PM - 5:00 PM" }, { key: "D", text: "All day until 8:00 PM" }], a: "A", exp: "Giờ hoạt động quán cafe: 'from 11:00 AM to 3:30 PM'." }
    ];

    sec2Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k4_q${idx + 11}`,
        partNumber: 2,
        partTitle: "Listening Section 2: Aerospace Center & Planetarium",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
        questionText: `Question ${idx + 11}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 3: Academic Seminar on Mobile Microfinance in Developing Economies (Q21 - Q30)
    const sec3Script =
      "Professor: Good afternoon, Zara and Callum. Let's discuss your joint development economics thesis regarding digital mobile money platforms and micro-lending in rural Kenya.\n" +
      "Zara: Thank you, Professor Robinson. We evaluated financial transaction logs across four agricultural counties utilizing the M-Pesa mobile ecosystem between 2021 and 2025.\n" +
      "Callum: Our quantitative econometric regression reveals that mobile microfinance adoption increased median household agricultural reinvestment by 28 percent, primarily by eliminating formal banking transaction costs and enabling micro-insurance against crop drought losses.\n" +
      "Professor: Those are compelling empirical results. However, how did you control for algorithmic credit scoring bias, particularly concerning female agricultural entrepreneurs?\n" +
      "Zara: We implemented a gender-disaggregated credit risk model that demonstrated female smallholders actually possessed a 14 percent lower loan default rate than male borrowers, despite receiving smaller initial micro-credit lines.\n" +
      "Professor: Excellent rigorous data modeling. Make sure to incorporate your policy recommendations on capping predatory fintech interest rates into your final draft by November 20th.";

    const sec3Questions = [
      { q: "What geographic region is the focus of the students' development economics thesis?", opts: [{ key: "A", text: "Rural India" }, { key: "B", text: "Rural Kenya" }, { key: "C", text: "Coastal Brazil" }, { key: "D", text: "Suburban South Africa" }], a: "B", exp: "Khu vực nghiên cứu: 'micro-lending in rural Kenya'." },
      { q: "What mobile money platform was evaluated in the study?", opts: [{ key: "A", text: "PayPal" }, { key: "B", text: "Apple Pay" }, { key: "C", text: "M-Pesa mobile ecosystem" }, { key: "D", text: "Venmo" }], a: "C", exp: "Nền tảng tiền di động: 'utilizing the M-Pesa mobile ecosystem'." },
      { q: "What time frame did the financial transaction logs span?", opts: [{ key: "A", text: "2015 to 2018" }, { key: "B", text: "2018 to 2020" }, { key: "C", text: "2024 to 2026" }, { key: "D", text: "Between 2021 and 2025" }], a: "D", exp: "Khung thời gian: 'between 2021 and 2025'." },
      { q: "By how much did mobile microfinance increase household agricultural reinvestment?", opts: [{ key: "A", text: "28 percent" }, { key: "B", text: "10 percent" }, { key: "C", text: "18 percent" }, { key: "D", text: "45 percent" }], a: "A", exp: "Tỷ lệ tăng tái đầu tư: 'increased median household agricultural reinvestment by 28 percent'." },
      { q: "What two primary mechanisms drove this agricultural growth?", opts: [{ key: "A", text: "Free tractor giveaways and land redistribution" }, { key: "B", text: "Eliminating banking transaction fees and providing drought micro-insurance" }, { key: "C", text: "Lowering fertilizer import taxes" }, { key: "D", text: "Building highway toll bridges" }], a: "B", exp: "Động lực cốt lõi: 'eliminating formal banking transaction costs and enabling micro-insurance against crop drought losses'." },
      { q: "What methodological concern did Professor Robinson raise?", opts: [{ key: "A", text: "Lack of internet connectivity" }, { key: "B", text: "Currency inflation spikes" }, { key: "C", text: "Algorithmic credit scoring bias against female entrepreneurs" }, { key: "D", text: "High mobile phone hardware prices" }], a: "C", exp: "Mối lo phương pháp: 'control for algorithmic credit scoring bias, particularly concerning female agricultural entrepreneurs'." },
      { q: "What was the loan default rate of female smallholders compared to male borrowers?", opts: [{ key: "A", text: "Equal default rates" }, { key: "B", text: "20 percent higher default rate" }, { key: "C", text: "Zero defaults recorded" }, { key: "D", text: "14 percent lower loan default rate" }], a: "D", exp: "Tỷ lệ vỡ nợ của phụ nữ: 'female smallholders actually possessed a 14 percent lower loan default rate'." },
      { q: "What disparity did female borrowers experience despite lower default rates?", opts: [{ key: "A", text: "Receiving smaller initial micro-credit lines" }, { key: "B", text: "Higher interest fees" }, { key: "C", text: "Banned from smartphone ownership" }, { key: "D", text: "Required double cosigners" }], a: "A", exp: "Bất bình đẳng hạn mức: 'despite receiving smaller initial micro-credit lines'." },
      { q: "What policy recommendation must be included in the final thesis?", opts: [{ key: "A", text: "Banning all mobile phones" }, { key: "B", text: "Capping predatory fintech interest rates" }, { key: "C", text: "Eliminating government oversight" }, { key: "D", text: "Privatizing local agricultural banks" }], a: "B", exp: "Đề xuất chính sách: 'capping predatory fintech interest rates'." },
      { q: "What is the final dissertation submission deadline?", opts: [{ key: "A", text: "October 30th" }, { key: "B", text: "December 15th" }, { key: "C", text: "November 20th" }, { key: "D", text: "January 10th" }], a: "C", exp: "Hạn nộp báo cáo: 'final draft by November 20th'." }
    ];

    sec3Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k4_q${idx + 21}`,
        partNumber: 3,
        partTitle: "Listening Section 3: Digital Microfinance & Fintech",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
        questionText: `Question ${idx + 21}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 4: University Lecture on Marine Bioluminescence & Deep-Sea Optobiology (Q31 - Q40)
    const sec4Script =
      "Lecturer: Good morning, marine biology undergraduates. Today's lecture delves into the molecular biochemistry and evolutionary ecology of marine bioluminescence across bathypelagic ecosystems. In the ocean's twilight and midnight aphotic zones—depths spanning between 200 and 4,000 meters—over 76 percent of oceanic taxa possess the biochemical capacity for light emission. The standard catalytic reaction involves the oxidation of a light-emitting substrate pigment called luciferin, catalyzed by the enzyme luciferase in the presence of adenosine triphosphate (ATP) and molecular oxygen. In deep-sea environments, the emitted light spectrum is predominantly concentrated in the blue-green wavelength range between 470 and 490 nanometers, because blue light experiences the lowest attenuation and longest transmission distance through seawater. Marine organisms deploy bioluminescence for three primary evolutionary survival strategies: counter-illumination camouflage to eliminate silhouettes against downwelling sunlight, prey attraction utilizing glowing lures as seen in anglerfish, and anti-predator startle displays such as explosive glowing clouds ejected by deep-sea ostracods. Beyond ecology, biomedical researchers have engineered green fluorescent proteins and marine luciferases into non-invasive molecular imaging probes to track oncological tumor metastasis and cellular gene expression in real time.";

    const sec4Questions = [
      { q: "What percentage of deep-ocean taxa possess bioluminescent capabilities?", opts: [{ key: "A", text: "25 percent" }, { key: "B", text: "50 percent" }, { key: "C", text: "95 percent" }, { key: "D", text: "Over 76 percent of oceanic taxa" }], a: "D", exp: "Tỷ lệ loài phát quang: 'over 76 percent of oceanic taxa possess the biochemical capacity for light emission'." },
      { q: "What depth range defines the ocean's twilight and midnight aphotic zones?", opts: [{ key: "A", text: "Between 200 and 4,000 meters" }, { key: "B", text: "Surface to 50 meters" }, { key: "C", text: "5,000 to 10,000 meters" }, { key: "D", text: "Over 11,000 meters" }], a: "A", exp: "Độ sâu vùng tối đại dương: 'depths spanning between 200 and 4,000 meters'." },
      { q: "What is the light-emitting substrate pigment in bioluminescence?", opts: [{ key: "A", text: "Chlorophyll" }, { key: "B", text: "Luciferin" }, { key: "C", text: "Hemoglobin" }, { key: "D", text: "Melanin" }], a: "B", exp: "Cơ chất phát sáng: 'light-emitting substrate pigment called luciferin'." },
      { q: "What enzyme catalyzes the bioluminescent oxidation reaction?", opts: [{ key: "A", text: "Amylase" }, { key: "B", text: "Polymerase" }, { key: "C", text: "Luciferase" }, { key: "D", text: "Lipase" }], a: "C", exp: "Enzyme xúc tác: 'catalyzed by the enzyme luciferase'." },
      { q: "What wavelength range does deep-sea bioluminescent light predominantly occupy?", opts: [{ key: "A", text: "Red spectrum (650 - 700 nm)" }, { key: "B", text: "Infrared (800 - 900 nm)" }, { key: "C", text: "Ultraviolet (200 - 300 nm)" }, { key: "D", text: "Blue-green wavelength range (470 - 490 nanometers)" }], a: "D", exp: "Dải bước sóng: 'blue-green wavelength range between 470 and 490 nanometers'." },
      { q: "Why is blue-green light optimal in marine environments?", opts: [{ key: "A", text: "It experiences the lowest attenuation and longest transmission distance through water" }, { key: "B", text: "It warms the water" }, { key: "C", text: "It blinds all prey instantly" }, { key: "D", text: "It prevents algae growth" }], a: "A", exp: "Ưu điểm quang học của ánh sáng xanh: 'experiences the lowest attenuation and longest transmission distance through seawater'." },
      { q: "What is 'counter-illumination camouflage'?", opts: [{ key: "A", text: "Emitting bright flashes to blind sharks" }, { key: "B", text: "Emitting ventral light to match downwelling sunlight and eliminate silhouettes" }, { key: "C", text: "Hiding inside deep sand burrows" }, { key: "D", text: "Changing skin color to dark red" }], a: "B", exp: "Cơ chế ngụy trang đối sáng: Phát quang ở mặt bụng để triệt tiêu bóng đen dưới ánh mặt trời chiếu xuống." },
      { q: "How do anglerfish utilize bioluminescence?", opts: [{ key: "A", text: "For heating eggs" }, { key: "B", text: "For jet propulsion" }, { key: "C", text: "Prey attraction utilizing a glowing esca lure" }, { key: "D", text: "For communication across oceans" }], a: "C", exp: "Chiến thuật săn mồi của cá vây chân: 'prey attraction utilizing glowing lures'." },
      { q: "What anti-predator mechanism is deployed by deep-sea ostracods?", opts: [{ key: "A", text: "Electric shocks" }, { key: "B", text: "Hardening shell spikes" }, { key: "C", text: "Sonic shockwaves" }, { key: "D", text: "Explosive glowing chemical clouds" }], a: "D", exp: "Cơ chế phòng vệ: 'anti-predator startle displays such as explosive glowing clouds'." },
      { q: "How is bioluminescent biotechnology applied in modern oncology medicine?", opts: [{ key: "A", text: "As molecular imaging probes to track tumor metastasis and gene expression" }, { key: "B", text: "As surgical bone glue" }, { key: "C", text: "As radiation shield fabric" }, { key: "D", text: "To replace human blood transfusions" }], a: "A", exp: "Ứng dụng y học: 'molecular imaging probes to track oncological tumor metastasis and cellular gene expression in real time'." }
    ];

    sec4Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k4_q${idx + 31}`,
        partNumber: 4,
        partTitle: "Listening Section 4: Deep-Sea Bioluminescence",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
        questionText: `Question ${idx + 31}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // READING PASSAGE 1: The Neurobiology of Deep Attention (Q41 - Q53: 13 Questions)
    const readP1 = `READING PASSAGE 1 — THE ATTENTION ECONOMY: COGNITIVE NEUROBIOLOGY IN THE DIGITAL AGE\n\nIn the contemporary hyper-connected digital landscape, human attention has emerged as the premier commodity traded across global algorithmic marketplaces. Commercial social media ecosystems and notification architectures are deliberately engineered to exploit evolutionary human vulnerabilities, utilizing variable-ratio intermittent reinforcement schedules—the exact psychological mechanism underpinning casino slot machines. Every algorithmic notification, viral video clip, and personalized recommendation triggers a transient dopamine pulse in the mesolimbic reward pathway, conditioning users into chronic attentional fragmentation.\n\nCognitive neuroscientists at Oxford University have mapped the metabolic and functional neurological toll of this perpetual state of continuous partial attention. The prefrontal cortex—the anatomical seat of executive function, impulse inhibition, complex working memory, and sustained abstract problem-solving—operates on finite glucose metabolic reserves. Whenever an individual switches attentional focus between tasks (such as checking smartphone notifications while drafting an academic report), the brain incurs a substantial 'attention residue' penalty. Functional magnetic resonance imaging (fMRI) reveals that restoring full cognitive focus to the primary task requires between 15 and 23 minutes, during which working memory capacity drops by up to 40 percent.\n\nFurthermore, chronic multitasking suppresses the Default Mode Network (DMN)—a distributed neural circuit that activates during quiet introspection, daydreaming, and memory consolidation. Suppressing the DMN impairs creative lateral thinking and the spontaneous synthesis of novel insights. To combat this pervasive cognitive erosion, leading technology research institutions are pioneering 'digital minimalism' paradigms and algorithmic friction protocols designed to restore human cognitive agency and promote sustained deep work.`;

    const r1Questions = [
      { q: "What psychological mechanism is utilized by social media notification systems?", opts: [{ key: "A", text: "Classical Pavlovian fear conditioning" }, { key: "B", text: "Variable-ratio intermittent reinforcement schedules" }, { key: "C", text: "Hypnotic subliminal messaging" }, { key: "D", text: "Auditory sound shockwaves" }], a: "B", exp: "Đoạn 1: 'utilizing variable-ratio intermittent reinforcement schedules—the exact psychological mechanism underpinning casino slot machines'." },
      { q: "What neurotransmitter pathway is stimulated by digital notifications?", opts: [{ key: "A", text: "Serotonin in the gut" }, { key: "B", text: "Melatonin in the pineal gland" }, { key: "C", text: "Dopamine in the mesolimbic reward pathway" }, { key: "D", text: "Adrenaline in the kidneys" }], a: "C", exp: "Đoạn 1: 'triggers a transient dopamine pulse in the mesolimbic reward pathway'." },
      { q: "What brain region serves as the anatomical center of executive function and focus?", opts: [{ key: "A", text: "The cerebellum" }, { key: "B", text: "The occipital lobe" }, { key: "C", text: "The brainstem" }, { key: "D", text: "The prefrontal cortex" }], a: "D", exp: "Đoạn 2: 'The prefrontal cortex—the anatomical seat of executive function, impulse inhibition'." },
      { q: "What finite metabolic resource powers prefrontal cognitive processes?", opts: [{ key: "A", text: "Glucose metabolic reserves" }, { key: "B", text: "Calcium ions" }, { key: "C", text: "Protein fiber strands" }, { key: "D", text: "Sodium chloride" }], a: "A", exp: "Đoạn 2: 'operates on finite glucose metabolic reserves'." },
      { q: "What is 'attention residue' in cognitive neuroscience?", opts: [{ key: "A", text: "Permanent memory loss" }, { key: "B", text: "Cognitive penalty incurred when switching attentional focus between tasks" }, { key: "C", text: "Physical exhaustion of eye muscles" }, { key: "D", text: "An inability to sleep at night" }], a: "B", exp: "Đoạn 2: Tổn thất nhận thức phát sinh khi chuyển đổi sự chú ý liên tục giữa các tác vụ ('attention residue penalty')." },
      { q: "How long does it take for the brain to regain full focus after an interruption?", opts: [{ key: "A", text: "2 to 3 minutes" }, { key: "B", text: "5 to 8 minutes" }, { key: "C", text: "Between 15 and 23 minutes" }, { key: "D", text: "Over two hours" }], a: "C", exp: "Đoạn 2: 'restoring full cognitive focus to the primary task requires between 15 and 23 minutes'." },
      { q: "By how much can working memory capacity drop during task switching?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "25 percent" }, { key: "C", text: "80 percent" }, { key: "D", text: "Up to 40 percent" }], a: "D", exp: "Đoạn 2: 'working memory capacity drops by up to 40 percent'." },
      { q: "What is the primary role of the Default Mode Network (DMN)?", opts: [{ key: "A", text: "Quiet introspection, daydreaming, and creative memory consolidation" }, { key: "B", text: "Controlling voluntary muscle movement" }, { key: "C", text: "Processing optical color vision" }, { key: "D", text: "Regulating heartbeat during sleep" }], a: "A", exp: "Đoạn 3: 'activates during quiet introspection, daydreaming, and memory consolidation'." },
      { q: "What creative cognitive ability is impaired when the DMN is suppressed?", opts: [{ key: "A", text: "Arithmetic addition" }, { key: "B", text: "Lateral thinking and spontaneous synthesis of novel insights" }, { key: "C", text: "Hearing high-pitch sounds" }, { key: "D", text: "Reading printed books" }], a: "B", exp: "Đoạn 3: 'impairs creative lateral thinking and the spontaneous synthesis of novel insights'." },
      { q: "What imaging technology was used to study brain focus recovery?", opts: [{ key: "A", text: "Standard X-ray" }, { key: "B", text: "Ultrasound scanning" }, { key: "C", text: "Functional magnetic resonance imaging (fMRI)" }, { key: "D", text: "Thermal camera" }], a: "C", exp: "Đoạn 2: 'Functional magnetic resonance imaging (fMRI) reveals'." },
      { q: "What term describes the fragmented focus of perpetual multitasking?", opts: [{ key: "A", text: "Total hyper-focus" }, { key: "B", text: "Catatonic trance" }, { key: "C", text: "Selective sensory gating" }, { key: "D", text: "Continuous partial attention" }], a: "D", exp: "Đoạn 2: 'perpetual state of continuous partial attention'." },
      { q: "What philosophy is advocated to counter digital attentional erosion?", opts: [{ key: "A", text: "Digital minimalism paradigms and algorithmic friction protocols" }, { key: "B", text: "Destroying all electronics" }, { key: "C", text: "Working 24 hours without rest" }, { key: "D", text: "Taking sleeping pills" }], a: "A", exp: "Đoạn 3: 'pioneering digital minimalism paradigms and algorithmic friction protocols'." },
      { q: "What is the author's primary message in the text?", opts: [{ key: "A", text: "Smartphones enhance cognitive intelligence without downside" }, { key: "B", text: "Algorithmic digital media fragments attention, depletes metabolic brain reserves, and threatens creative cognition" }, { key: "C", text: "Human brains will evolve to multitask effortlessly within 5 years" }, { key: "D", text: "All digital communications should be banned by law" }], a: "B", exp: "Thông điệp chính: Các thuật toán truyền thông kỹ thuật số gây phân mảnh sự chú ý, làm kiệt quệ năng lượng não bộ và đe dọa tư duy sáng tạo sâu." }
    ];

    r1Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k4_q${idx + 41}`,
        partNumber: 5,
        partTitle: "Reading Passage 1: Attention Economy & Neurobiology",
        section: "READING",
        passageText: readP1,
        questionText: `Question ${idx + 41}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // PASSAGE 2: Megastructure Civil Engineering: Subsea Immersed Tunnels (Q54 - Q66: 13 Questions)
    const readP2 = `READING PASSAGE 2 — SUBSEA MEGASTRUCTURES: THE ENGINEERING OF IMMERSED TUBE TUNNELS\n\nConnecting major landmasses separated by deep marine straits has historically ranked among the most audacious frontiers of civil engineering. While traditional bored tunnels (such as the 50-kilometer Channel Tunnel) are excavated deep within bedrock beneath the seabed using massive tunnel boring machines (TBMs), modern transportation corridors crossing wide, soft-sediment waterways increasingly utilize an innovative alternative: the immersed tube tunnel.\n\nThe engineering methodology of immersed tunnels, exemplified by the 18-kilometer Fehmarnbelt Fixed Link connecting Germany and Denmark and the 6.7-kilometer Hong Kong-Zhuhai-Macau subsea tunnel, is fundamentally prefabrication-driven. Massive hollow reinforced concrete tunnel segments—each weighing up to 73,000 metric tons and measuring over 200 meters in length—are cast in controlled dry docks on land. Once cured and sealed with temporary steel bulkheads, the buoyant concrete monoliths are floated out to sea using specialized catamaran pontoons.\n\nSimultaneously, specialized dredging vessels excavate a laser-guided trench along the seabed, laying a precision-leveled gravel foundation bed. The giant concrete elements are ballast-flooded with water to initiate controlled descent, sinking into the subsea trench with millimeter accuracy. Subsea robotic hydraulic jacks align the adjoining elements, after which rubber Gina gaskets create a watertight seal compressed by hydrostatic ocean pressure. Sand and stone backfill is then deposited over the tunnel roof, creating a protective armor layer resistant to dragging ship anchors, submarine collisions, and seismic ground liquefaction.`;

    const r2Questions = [
      { q: "What is the primary alternative to bored tunnels discussed in the text?", opts: [{ key: "A", text: "Suspension rope bridges" }, { key: "B", text: "Undersea cable cars" }, { key: "C", text: "Immersed tube tunnels" }, { key: "D", text: "Floating glass tubes" }], a: "C", exp: "Đoạn 1: 'utilize an innovative alternative: the immersed tube tunnel'." },
      { q: "What machine is traditionally used to excavate bored tunnels in bedrock?", opts: [{ key: "A", text: "Hydraulic backhoes" }, { key: "B", text: "Dynamite jackhammers" }, { key: "C", text: "Laser beam cutters" }, { key: "D", text: "Tunnel boring machines (TBMs)" }], a: "D", exp: "Đoạn 1: 'using massive tunnel boring machines (TBMs)'." },
      { q: "Which two megaprojects are cited as prominent examples of immersed tube engineering?", opts: [{ key: "A", text: "Fehmarnbelt Fixed Link and Hong Kong-Zhuhai-Macau subsea tunnel" }, { key: "B", text: "Golden Gate Bridge and Brooklyn Bridge" }, { key: "C", text: "Panama Canal and Suez Canal" }, { key: "D", text: "Seikan Tunnel and Chunnel exclusively" }], a: "A", exp: "Đoạn 2: 'Fehmarnbelt Fixed Link connecting Germany and Denmark and the 6.7-kilometer Hong Kong-Zhuhai-Macau subsea tunnel'." },
      { q: "Where are the giant reinforced concrete tunnel segments constructed?", opts: [{ key: "A", text: "Under deep water using divers" }, { key: "B", text: "In controlled dry docks on land" }, { key: "C", text: "On floating aircraft carriers" }, { key: "D", text: "Inside mountain caves" }], a: "B", exp: "Đoạn 2: 'cast in controlled dry docks on land'." },
      { q: "How heavy can a single prefabricated tunnel element be?", opts: [{ key: "A", text: "5,000 metric tons" }, { key: "B", text: "20,000 metric tons" }, { key: "C", text: "Up to 73,000 metric tons" }, { key: "D", text: "200,000 metric tons" }], a: "C", exp: "Đoạn 2: 'each weighing up to 73,000 metric tons'." },
      { q: "How long can individual concrete segments measure?", opts: [{ key: "A", text: "50 meters" }, { key: "B", text: "100 meters" }, { key: "C", text: "500 meters" }, { key: "D", text: "Over 200 meters in length" }], a: "D", exp: "Đoạn 2: 'measuring over 200 meters in length'." },
      { q: "How are the concrete monoliths transported out to sea?", opts: [{ key: "A", text: "Floated out using temporary sealed steel bulkheads and catamaran pontoons" }, { key: "B", text: "Carried by heavy-lift helicopters" }, { key: "C", text: "Dragged along the seabed" }, { key: "D", text: "Pushed by submarine engines" }], a: "A", exp: "Đoạn 2: 'buoyant concrete monoliths are floated out to sea using specialized catamaran pontoons'." },
      { q: "How is a tunnel element lowered into the seabed trench?", opts: [{ key: "A", text: "By releasing parachute anchors" }, { key: "B", text: "By ballast-flooding internal tanks with water" }, { key: "C", text: "By pushing with giant cranes" }, { key: "D", text: "By melting the bottom concrete" }], a: "B", exp: "Đoạn 3: 'ballast-flooded with water to initiate controlled descent'." },
      { q: "What component creates the permanent watertight seal between adjoining elements?", opts: [{ key: "A", text: "Liquid silicone glue" }, { key: "B", text: "Molten lead welding" }, { key: "C", text: "Rubber Gina gaskets compressed by hydrostatic ocean pressure" }, { key: "D", text: "Clay mortar" }], a: "C", exp: "Đoạn 3: 'rubber Gina gaskets create a watertight seal compressed by hydrostatic ocean pressure'." },
      { q: "What foundation bed is prepared in the seabed trench before element placement?", opts: [{ key: "A", text: "Soft mud layer" }, { key: "B", text: "Steel rail tracks" }, { key: "C", text: "Wooden timber beams" }, { key: "D", text: "Precision-leveled gravel foundation bed" }], a: "D", exp: "Đoạn 3: 'laying a precision-leveled gravel foundation bed'." },
      { q: "What is the purpose of the sand and stone backfill deposited over the tunnel roof?", opts: [{ key: "A", text: "To create a protective armor layer against dragging ship anchors and collisions" }, { key: "B", text: "To grow artificial coral reefs" }, { key: "C", text: "To make the water shallower for fishing boats" }, { key: "D", text: "To absorb chemical pollution" }], a: "A", exp: "Đoạn 3: 'protective armor layer resistant to dragging ship anchors, submarine collisions, and seismic ground liquefaction'." },
      { q: "What precision accuracy is achieved during subsea element placement?", opts: [{ key: "A", text: "Within 2 meters" }, { key: "B", text: "Millimeter accuracy" }, { key: "C", text: "Within 50 centimeters" }, { key: "D", text: "Within 10 centimeters" }], a: "B", exp: "Đoạn 3: 'sinking into the subsea trench with millimeter accuracy'." },
      { q: "What is the primary engineering advantage of immersed tunnels over deep bored tunnels?", opts: [{ key: "A", text: "They require no concrete" }, { key: "B", text: "They can be disassembled and moved to another city anytime" }, { key: "C", text: "They avoid deep subterranean tunneling, allow prefabrication under factory quality control, and traverse soft sediments" }, { key: "D", text: "They are completely free of construction costs" }], a: "C", exp: "Ưu điểm cốt lõi: Đúc sẵn trên cạn kiểm soát chất lượng tuyệt đối, tránh đào sâu qua tầng đá nứt vỡ và tối ưu cho địa tầng bùn mềm." }
    ];

    r2Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k4_q${idx + 54}`,
        partNumber: 6,
        partTitle: "Reading Passage 2: Subsea Immersed Tunnels",
        section: "READING",
        passageText: readP2,
        questionText: `Question ${idx + 54}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // PASSAGE 3: Biomimetic Nanomaterials & Evolutionary Bio-Engineering (Q67 - Q80: 14 Questions)
    const readP3 = `READING PASSAGE 3 — NATURE'S BLUEPRINT: THE RISE OF BIOMIMETIC NANOTECHNOLOGY\n\nFor roughly 3.8 billion years, biological evolution has acted as nature's ultimate research and development laboratory, engineering exquisite molecular architectures that solve complex structural, fluidic, and thermal challenges with unmatched thermodynamic efficiency. In recent decades, materials scientists and nanotechnologists have transitioned from merely synthesizing brute-force artificial polymers to systematically reverse-engineering nature's evolutionary blueprints—a revolutionary paradigm termed biomimicry.\n\nA classic breakthrough in dry adhesive engineering draws inspiration from the extraordinary locomotion of geckos. A gecko can effortlessly sprint up vertical polished glass walls and support its entire body weight by a single toe. Scanning electron microscopy has revealed that gecko toe pads are carpeted with hundreds of thousands of microscopic keratinous hairs called setae, each branching into millions of nanoscale spatula tips under 200 nanometers wide. When these spatulae make intimate contact with a substrate, intermolecular van der Waals forces—electrostatic attractions between neighboring electron clouds—generate immense adhesive strength without liquid secretions, detaching cleanly when angled slightly.\n\nIn fluid dynamics and surface chemistry, the micro-topography of the sacred lotus leaf (Nelumbo nucifera) inspired superhydrophobic coatings. The lotus effect relies on a hierarchical surface architecture: microscopic epidermal papillae coated with nanoscale hydrophobic epicuticular wax crystals. Water droplets resting on the leaf form nearly spherical beads with contact angles exceeding 150 degrees, rolling off effortlessly and picking up dirt particles—a self-cleaning mechanism now applied to self-washing solar panels, stain-resistant architectural glass, and drag-reducing ship hulls. Similarly, riblet micro-grooves mimicking shark dermal denticles suppress turbulent vortices in marine transport, reducing aerodynamic drag by up to 10 percent and saving billions in global aviation fuel consumption.`;

    const r3Questions = [
      { q: "How long has biological evolution been developing natural molecular solutions?", opts: [{ key: "A", text: "1 million years" }, { key: "B", text: "100 million years" }, { key: "C", text: "10 billion years" }, { key: "D", text: "Roughly 3.8 billion years" }], a: "D", exp: "Đoạn 1: 'For roughly 3.8 billion years, biological evolution has acted'." },
      { q: "What is the term for reverse-engineering biological designs for technological applications?", opts: [{ key: "A", text: "Biomimicry (Biomimetics)" }, { key: "B", text: "Biodegradation" }, { key: "C", text: "Bio-accumulation" }, { key: "D", text: "Bio-fermentation" }], a: "A", exp: "Đoạn 1: 'reverse-engineering nature's evolutionary blueprints—a revolutionary paradigm termed biomimicry'." },
      { q: "What microstructures on gecko toe pads enable dry adhesion?", opts: [{ key: "A", text: "Microscopic suction cups" }, { key: "B", text: "Keratinous setae branching into nanoscale spatulae" }, { key: "C", text: "Liquid chemical glue glands" }, { key: "D", text: "Magnetic iron hooks" }], a: "B", exp: "Đoạn 2: 'microscopic keratinous hairs called setae, each branching into millions of nanoscale spatula tips'." },
      { q: "What physical force generates the adhesive bond in gecko toes?", opts: [{ key: "A", text: "Gravitational attraction" }, { key: "B", text: "Nuclear strong force" }, { key: "C", text: "Intermolecular van der Waals forces" }, { key: "D", text: "Centrifugal inertia" }], a: "C", exp: "Đoạn 2: 'intermolecular van der Waals forces—electrostatic attractions between neighboring electron clouds'." },
      { q: "What is remarkable about gecko adhesion detachment?", opts: [{ key: "A", text: "It leaves sticky residue behind" }, { key: "B", text: "It requires chemical solvents to release" }, { key: "C", text: "It can never be peeled off" }, { key: "D", text: "It detaches cleanly without leaving residue when angled slightly" }], a: "D", exp: "Đoạn 2: 'generate immense adhesive strength without liquid secretions, detaching cleanly when angled slightly'." },
      { q: "What natural phenomenon is demonstrated by the lotus leaf?", opts: [{ key: "A", text: "Superhydrophobicity (the lotus effect)" }, { key: "B", text: "Electrical conductivity" }, { key: "C", text: "Thermal insulation only" }, { key: "D", text: "Magnetic levitation" }], a: "A", exp: "Đoạn 3: 'inspired superhydrophobic coatings. The lotus effect relies on a hierarchical surface architecture'." },
      { q: "What water droplet contact angle characterizes superhydrophobic lotus leaves?", opts: [{ key: "A", text: "Under 45 degrees" }, { key: "B", text: "Exceeding 150 degrees" }, { key: "C", text: "90 degrees" }, { key: "D", text: "180 degrees flat" }], a: "B", exp: "Đoạn 3: 'contact angles exceeding 150 degrees, rolling off effortlessly'." },
      { q: "What two structural features create the lotus leaf's self-cleaning property?", opts: [{ key: "A", text: "Smooth wax and soap" }, { key: "B", text: "Heated pores and suction holes" }, { key: "C", text: "Microscopic epidermal papillae and nanoscale hydrophobic wax crystals" }, { key: "D", text: "Spongy absorbent cellulose" }], a: "C", exp: "Đoạn 3: 'microscopic epidermal papillae coated with nanoscale hydrophobic epicuticular wax crystals'." },
      { q: "What commercial applications utilize the lotus self-cleaning mechanism?", opts: [{ key: "A", text: "Underground subway tunnels" }, { key: "B", text: "Plastic food wrap" }, { key: "C", text: "Smartphone batteries" }, { key: "D", text: "Self-washing solar panels and stain-resistant architectural glass" }], a: "D", exp: "Đoạn 3: 'applied to self-washing solar panels, stain-resistant architectural glass, and drag-reducing ship hulls'." },
      { q: "What marine animal inspired drag-reducing surface riblets?", opts: [{ key: "A", text: "Shark skin dermal denticles" }, { key: "B", text: "Jellyfish" }, { key: "C", text: "Sea turtles" }, { key: "D", text: "Blue whales" }], a: "A", exp: "Đoạn 3: 'riblet micro-grooves mimicking shark dermal denticles'." },
      { q: "By how much can shark-skin-inspired riblets reduce aerodynamic/hydrodynamic drag?", opts: [{ key: "A", text: "25 percent" }, { key: "B", text: "Up to 10 percent" }, { key: "C", text: "50 percent" }, { key: "D", text: "80 percent" }], a: "B", exp: "Đoạn 3: 'reducing aerodynamic drag by up to 10 percent'." },
      { q: "What scientific instrument was used to examine setae micro-architecture?", opts: [{ key: "A", text: "Handheld magnifying glass" }, { key: "B", text: "Astronomical telescope" }, { key: "C", text: "Scanning electron microscopy (SEM)" }, { key: "D", text: "Geiger counter" }], a: "C", exp: "Đoạn 2: 'Scanning electron microscopy has revealed'." },
      { q: "What makes natural bio-engineering superior to brute-force synthetic manufacturing?", opts: [{ key: "A", text: "It uses expensive synthetic metals" }, { key: "B", text: "It operates exclusively at ultra-high temperatures" }, { key: "C", text: "It generates massive chemical waste" }, { key: "D", text: "It achieves unmatched thermodynamic efficiency and elegant structural micro-architectures" }], a: "D", exp: "Đoạn 1: 'solve complex structural, fluidic, and thermal challenges with unmatched thermodynamic efficiency'." },
      { q: "What is the overarching conclusion of the passage?", opts: [{ key: "A", text: "Biomimetic nanotechnology harnesses millions of years of evolutionary optimization to engineer superior, sustainable materials" }, { key: "B", text: "Nature's designs are too weak for modern industry" }, { key: "C", text: "Synthetic plastics should completely replace all biological materials" }, { key: "D", text: "Geckos and lotus leaves are extinct" }], a: "A", exp: "Kết luận: Công nghệ nano phỏng sinh học kế thừa hàng triệu năm tiến hóa tự nhiên để tạo ra các vật liệu siêu bền vững và tối ưu vượt bậc." }
    ];

    r3Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k4_q${idx + 67}`,
        partNumber: 7,
        partTitle: "Reading Passage 3: Biomimetic Nanotechnology",
        section: "READING",
        passageText: readP3,
        questionText: `Question ${idx + 67}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // IELTS SPEAKING AI (Q81 - Q83: 3 PARTS)
    qs.push({
      id: "ia4k4_q81",
      partNumber: 8,
      partTitle: "IELTS Speaking Part 1: Renewable Energy & Sustainable Living",
      section: "SPEAKING",
      speakingPrompt:
        "1. Is renewable energy, such as solar or wind power, popular in your country?\n2. What energy-saving habits do you practice at home?\n3. Do you prefer using public transit or private vehicles for daily commuting?\n4. What eco-friendly innovation do you hope to see in your city in the future?",
      preparationTimeSeconds: 15,
      speakingTimeSeconds: 60,
      questionText:
        "Question 81 (Speaking Part 1): Answer interview questions on clean energy, household efficiency, and urban transit (60 seconds).",
      options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "View Band 8.5+ Sustainability Vocabulary" },
            { key: "C", text: "Listen to Native Examiner Questions" },
            { key: "D", text: "Skip to Cue Card" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT PART 1 - DIRECT ANSWER + EXTENSION]
- Trả lời trực tiếp và mở rộng 2-3 câu bằng từ vựng chỉ năng lượng tái tạo, tiết kiệm điện năng và giao thông xanh.
- Tránh câu trả lời ngắn; sử dụng liên từ chỉ xu hướng phát triển và hành vi cá nhân.

🔍 [BÀI NÓI MẪU BAND 8.5+]
"Renewable energy has experienced tremendous momentum in my country recently, with substantial state investments in offshore wind farms and widespread residential rooftop solar adoption.

At home, I am quite conscientious about energy conservation. I ensure that inverter air conditioners are set at eco-temperatures and all home electronics are unplugged when idle to eliminate standby phantom power drain.

For daily commuting, I predominantly rely on the municipal electric metro system. Not only is it remarkably punctual and cost-effective, but it also dramatically minimizes my individual carbon footprint.

Looking ahead, I hope to see comprehensive smart-grid infrastructure integrated with ubiquitous electric vehicle charging hubs throughout our metropolitan areas."

💡 [TỪ VỰNG THEN CHỐT]
- Tremendous momentum /trɪˈmen.dəs moʊˈmen.t̬əm/ (n): Đà phát triển vượt bậc
- Phantom power drain /ˈfæn.t̬əm ˈpaʊ.ɚ dreɪn/ (n): Sự tiêu hao điện năng lãng phí khi thiết bị ở chế độ chờ
- Individual carbon footprint /ˌɪn.dəˈvɪdʒ.u.əl ˈkɑːr.bən ˈfʊt.prɪnt/ (n): Lượng phát thải carbon cá nhân
- Ubiquitous /juːˈbɪk.wə.t̬əs/ (adj): Phổ biến khắp nơi, có mặt ở mọi nơi.`
    });

    qs.push({
      id: "ia4k4_q82",
      partNumber: 9,
      partTitle: "IELTS Speaking Part 2: Cue Card — A Revolutionary Scientific Breakthrough",
      section: "SPEAKING",
      speakingPrompt:
        "Describe a major scientific discovery or technological breakthrough that you believe has transformed human society.\nYou should say:\n• What the scientific breakthrough is and when it was developed\n• How it operates or functions scientifically\n• What practical benefits it has brought to humanity\nAnd explain why you consider this breakthrough to be of historic significance.",
      preparationTimeSeconds: 60,
      speakingTimeSeconds: 120,
      questionText:
        "Question 82 (Speaking Part 2): Deliver a continuous 2-minute speech describing a world-changing scientific breakthrough.",
      options: [
            { key: "A", text: "View 1-Minute Note-Taking Template" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [CHIẾN THUẬT 1 PHÚT GHI CHÚ (THE 4-BOX METHOD)]
- Box 1 (Breakthrough/When): Synthetic mRNA vaccine technology / Pioneered by Katalin Karikó & Drew Weissman, deployed globally 2020-2021.
- Box 2 (Mechanism): Delivers synthetic genetic blueprint instructing human ribosomes to synthesize viral spike proteins without live pathogens.
- Box 3 (Benefits): Ultra-rapid vaccine formulation (weeks vs years), transformative potential for cancer immunotherapy and rare genetic disorders.
- Box 4 (Significance): Paradigm shift from traditional chemical pharmacology to programmable biological medicine.

🔍 [BÀI NÓI MẪU BAND 9.0 (240+ TỪ)]
"I would like to speak about what I consider to be one of the most transformative medical milestones in human history: synthetic messenger RNA (mRNA) vaccine and therapeutic technology.

While research originated decades ago through the pioneering perseverance of scientists Katalin Karikó and Drew Weissman, the technology achieved worldwide clinical validation during the global pandemic in late 2020.

Scientifically, mRNA technology represents a radical departure from traditional vaccines that rely on attenuated or inactivated viral pathogens. Instead of introducing a weakened virus, mRNA therapies deliver a synthetic genetic blueprint encapsulated in lipid nanoparticles directly into human host cells. Our cellular ribosomes read these instructions to transiently produce a harmless viral antigen—such as a viral spike protein—thereby training the immune system to generate robust neutralizing antibodies and cytotoxic T-cell memory.

What renders this breakthrough of historic significance is its programmability. Because mRNA sequences can be digitally synthesized and adapted within days of decoding a pathogen's genome, it compresses vaccine development timelines from decades down to mere weeks. Beyond infectious epidemiology, mRNA platforms are currently revolutionizing personalized oncology vaccines tailored to an individual patient's specific tumor neoantigens, inaugurating a new era of precision genetic medicine."

💡 [TỪ VỰNG THEN CHỐT]
- Transformative milestone /trænsˈfɔːr.mə.t̬ɪv ˈmaɪl.stoʊn/ (n): Cột mốc mang tính chuyển biến sâu sắc
- Synthetic genetic blueprint /sɪnˈθet̬.ɪk dʒəˈnet̬.ɪk ˈbluː.prɪnt/ (n): Bản thiết kế di truyền tổng hợp nhân tạo
- Neutralizing antibodies /ˈnuː.trə.laɪz.ɪŋ ˈæn.t̬iˌbɑː.diz/ (n): Kháng thể trung hòa
- Tumor neoantigens /ˈtuː.mɚ ˌniː.oʊˈæn.t̬ə.dʒənz/ (n): Kháng nguyên ung thư mới đặc thù.`
    });

    qs.push({
      id: "ia4k4_q83",
      partNumber: 10,
      partTitle: "IELTS Speaking Part 3: Space Exploration vs Terrestrial Resource Allocation",
      section: "SPEAKING",
      speakingPrompt:
        "1. Should governments invest trillions of dollars into deep-space colonization and lunar bases when urgent terrestrial crises like poverty and climate change remain unresolved?\n2. What long-term technological and scientific spin-offs have resulted from aerospace exploration?\n3. How should private space commercialization be regulated under international space law?",
      preparationTimeSeconds: 20,
      speakingTimeSeconds: 90,
      questionText:
        "Question 83 (Speaking Part 3): Provide nuanced, balanced arguments on space exploration funding versus Earth-bound climate priorities.",
      options: [
            { key: "A", text: "Review Discourse Markers" },
            { key: "B", text: "Check Band 9 Academic Vocabulary" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Complete Speaking Section" }
          ],
      correctAnswer: "C",
      explanation: `🎯 [CHIẾN THUẬT PART 3 - CẤU TRÚC LẬP LUẬN ĐA CHIỀU]
- Nêu rõ tính cấp bách của các cuộc khủng hoảng trên Trái Đất (biến đổi khí hậu, xóa đói giảm nghèo).
- Phản biện sắc bén: Thám hiểm không gian không hề lãng phí mà tạo ra các công nghệ phụ sinh (spin-off technologies) cứu tinh cho Trái Đất (vệ tinh viễn thám khí hậu, pin mặt trời hiệu suất cao, lọc nước).

🔍 [BÀI NÓI MẪU BAND 9.0 (90 GIÂY)]
"The tension between funding space exploration and tackling pressing terrestrial crises is often framed as a zero-sum dilemma, but in reality, they are deeply complementary endeavors. While critics legitimately argue that billions in public capital should be targeted toward immediate socio-economic relief and climate mitigation, space research is itself a foundational driver of terrestrial sustainability.

Crucially, planetary science yields transformative technological spin-offs: earth-observation satellites provide the precise climatological data required to monitor deforestation and ocean warming, while spacecraft engineering spurred advances in ultra-efficient solar photovoltaics and closed-loop water purification systems.

Nevertheless, international regulatory frameworks must evolve rapidly. As private aerospace conglomerates enter low-Earth orbit, we need enforceable multilateral governance to prevent orbital debris accumulation and ensure extraterrestrial resource extraction benefits all humankind rather than private corporate monopolies."

💡 [TỪ VỰNG THEN CHỐT]
- Zero-sum dilemma /ˌzɪr.oʊˈsʌm daɪˈlem.ə/ (n): Tình thế nan giải được - mất triệt tiêu lẫn nhau
- Climatological data /ˌklaɪ.mə.t̬əˈlɑː.dʒɪ.kəl ˈdeɪ.t̬ə/ (n): Dữ liệu khí hậu học
- Multilateral governance /ˌmʌl.tiˈlæt̬.ɚ.əl ˈɡʌv.ɚ.nəns/ (n): Cơ chế quản trị đa phương quốc tế
- Orbital debris accumulation /ˈɔːr.bə.t̬əl dəˈbriː əˌkjuː.mjəˈleɪ.ʃən/ (n): Sự tích tụ rác thải vũ trụ quỹ đạo.`
    });

    // IELTS WRITING AI (Q84 - Q85: TASK 1 & TASK 2)
    qs.push({
      id: "ia4k4_q84",
      partNumber: 11,
      partTitle: "IELTS Writing Task 1: Academic Report (Pie Charts & Bar Chart)",
      section: "WRITING",
      writingPrompt:
        "The charts below show the global energy generation mix (by percentage of total electricity produced) across five energy sources in 2010 and 2025, along with total global electrical output in Terawatt-hours (TWh). Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Time suggested: 20 minutes).",
      minWordCount: 150,
      sampleEssay: `The provided charts illustrate the structural shifts in the global electricity generation portfolio across five distinct energy sources in 2010 and 2025, alongside the expansion in total worldwide electrical output measured in Terawatt-hours (TWh).

Overall, aggregate global electricity production witnessed a substantial increase over the fifteen-year timeframe. Concurrently, the global energy portfolio experienced a profound transition toward decarbonization, characterized by the dramatic expansion of renewable power generation and the corresponding contraction in fossil fuel dominance, particularly coal.

In 2010, total global electricity output stood at 21,500 TWh. Fossil fuels constituted the overwhelming bulk of the energy matrix: coal accounted for 41% of generation, while natural gas provided 22%, and oil contributed 5%. Nuclear energy supplied 13%, whereas renewable energy sources (solar, wind, and hydropower combined) comprised only 19%.

By 2025, total generation escalated by nearly 40% to reach 30,100 TWh. The share of renewable energy surged dramatically to become the leading single power category at 38% (a twofold proportional increase). In stark contrast, coal's contribution plummeted to 27%, and oil diminished to a negligible 2%. Natural gas maintained a stable presence at 21%, while nuclear power contracted slightly to 12%, reflecting sweeping international decarbonization policies and technological cost reductions in renewable infrastructure.`,
      questionText:
        "Question 84 (Writing Task 1): Write an academic report analyzing global electricity mix shifts 2010 vs 2025 (min 150 words).",
      options: [
            { key: "A", text: "Check Cambridge Band 9 Scoring Rubric" },
            { key: "B", text: "Review Energy & Shift Collocations" },
            { key: "C", text: "Skip to Task 2" },
            { key: "D", text: "Submit Task 1 Report for Gemini AI Evaluation" }
          ],
      correctAnswer: "D",
      explanation: `🎯 [CHIẾN THUẬT BÁO CÁO BIỂU ĐỒ TRÒN & CỘT KẾT HỢP - BAND 9.0]
1. Task Achievement:
   - Paraphrase đầy đủ các nguồn năng lượng (than, khí đốt, dầu, hạt nhân, tái tạo) và đơn vị Terawatt-giờ (TWh).
   - Đoạn Overview: Tổng sản lượng điện tăng gần 40% (21.500 ➔ 30.100 TWh); năng lượng tái tạo tăng gấp đôi thị phần lên vị trí số 1 (38%), than đá sụt giảm mạnh.
   - Thân bài chia theo 2 năm (2010 và 2025) với số liệu phần trăm và phân tích đối chiếu rõ ràng.

2. Lexical Resource (Band 9.0):
   - "structural shifts", "aggregate global electricity production", "energy portfolio", "decarbonization", "plummeted to 27%", "twofold proportional increase".`
    });

    qs.push({
      id: "ia4k4_q85",
      partNumber: 12,
      partTitle: "IELTS Writing Task 2: Academic Discursive Essay",
      section: "WRITING",
      writingPrompt:
        "In recent years, astronomical spending on space exploration and deep-space missions has increased significantly. Some people argue that this expenditure is an irresponsible waste of financial resources and that all public funds should instead be directed toward resolving acute environmental and social crises on Earth. To what extent do you agree or disagree with this perspective? (Write at least 250 words. Time suggested: 40 minutes).",
      minWordCount: 250,
      sampleEssay: `The substantial allocation of national wealth toward extraterrestrial exploration—ranging from lunar base development to interplanetary robotic probes—has prompted fierce debate regarding public fiscal priorities. While skeptics contend that investing billions into the cosmos is an indefensible luxury while Earth grapples with escalating climate change and poverty, I strongly disagree with this view, because space science is an indispensable catalyst for terrestrial environmental preservation, technological innovation, and long-term civilizational survival.

To begin with, the premise that space spending subtracts from terrestrial problem-solving fundamentally misconstrues how aerospace research functions. Capital allocated to space programs is not launched into the void; it is invested directly into domestic scientific ecosystems, employing engineers, funding academic laboratories, and generating vital spin-off technologies. Indeed, the very instruments modern climatologists rely upon to measure atmospheric greenhouse gas concentrations, monitor polar glacial thinning, and model extreme weather patterns were developed specifically for satellite earth-observation programs. Without the technological infrastructure pioneered by aerospace agencies, our capacity to diagnose and remediate planetary environmental crises would be critically crippled.

Furthermore, space exploration drives breakthrough advancements in resource efficiency that directly benefit terrestrial sustainability. In the hostile, zero-gravity environment of outer space, survival demands the ultimate mastery of closed-loop circular systems. Technologies engineered for spaceflight—including high-efficiency photovoltaic cells, advanced water-recycling membranes that purify municipal wastewater, and drought-resistant aeroponic agriculture—have been adapted to bolster food and water security in arid developing regions on Earth. Ultimately, space exploration expands the horizon of human ingenuity while equipping humanity with the engineering tools essential for safeguarding our home planet.

In conclusion, far from being an extravagant distraction, investment in space exploration represents a vital, high-yield commitment to our collective future. Governments should continue funding space research while simultaneously applying the resulting scientific breakthroughs to resolve pressing ecological challenges on Earth.`,
      questionText:
        "Question 85 (Writing Task 2): Write a 250+ word academic essay on space exploration funding versus Earth crisis mitigation.",
      options: [
            { key: "A", text: "Submit Task 2 Essay for Gemini AI Evaluation" },
            { key: "B", text: "Review Discursive Essay Paragraphing" },
            { key: "C", text: "Check CEFR C2 Vocabulary List" },
            { key: "D", text: "Complete Full IELTS Test" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT BÀI LUẬN BAND 9.0 DẠNG AGREE / DISAGREE]
1. Task Response:
   - Khẳng định lập trường phản đối mạnh mẽ (Strong Disagreement) ngay mở bài.
   - Thân bài 1: Bác bỏ quan điểm không gian là lãng phí; chỉ ra tiền được rót vào hệ sinh thái khoa học mặt đất và chính vệ tinh không gian là công cụ cứu vớt khí hậu Trái Đất.
   - Thân bài 2: Nêu các công nghệ phụ sinh (spin-off) thúc đẩy kinh tế tuần hoàn (lọc nước tuần hoàn khép kín, pin mặt trời, nông nghiệp khí canh).
   - Kết bài đúc kết súc tích: Nghiên cứu không gian là khoản đầu tư sinh lời cao cho tương lai nhân loại.

2. Lexical Resource (C2 Academic):
   - "indefensible luxury", "indispensable catalyst", "closed-loop circular systems", "aeroponic agriculture", "high-yield commitment", "extraterrestrial exploration".`
    });

    return qs;
  })()
};
