import { ExamPaper, ExamQuestion } from "./types";

export const ieltsAcademic4k01Paper: ExamPaper = {
    id: "ielts_academic_4k_01",
    title: "IELTS Academic Official Test #01 (4-Skills)",
    type: "IELTS_FULL",
    level: "Advanced",
    timeLimitMinutes: 175,
    totalQuestions: 85,
    maxScore: 9.0,
    description: "Bộ đề IELTS Academic 85 câu chuẩn Cambridge: Listening (40 câu), Reading (40 câu), Speaking AI (3 phần) & Writing AI (2 Task).",
    categoryBadge: "IELTS Academic",
    tags: ["IELTS", "Cambridge", "Academic", "4-Skills", "Band 9.0 Standard"],
    supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
    questions: (() => {
      const qs: ExamQuestion[] = [];

      // IELTS LISTENING (Q1 - Q40: 4 SECTIONS)
      // SECTION 1: University Student Accommodation Registration (Q1 - Q10)
      const sec1Script = "Officer: Good morning, Student Accommodation Services. How can I help you today?\nStudent: Hello, I'm an incoming postgraduate student from Canada starting the Master of Environmental Science in October, and I need to register for university housing.\nOfficer: Welcome! Let me take down your details. What is your full name?\nStudent: It's Marcus Vance.\nOfficer: Marcus Vance. And your student identification number?\nStudent: It is EV-88421.\nOfficer: Great. Which type of accommodation do you prefer: a single studio apartment, shared university flats, or a homestay family?\nStudent: I prefer a single studio apartment with a private kitchenette.\nOfficer: We have vacancies at Greenfield Hall on 84 Main Street. The weekly rent is 195 pounds, including high-speed fiber internet and all utility bills.\nStudent: That sounds ideal. Is there bicycle storage available?\nOfficer: Yes, secure indoor bicycle racks are located in Basement Block B. The deposit is 250 pounds, payable upon lease signing.\nStudent: Perfect. Thank you so much.";

      const sec1Questions = [
        { q: "What is Marcus Vance's degree program?", opts: [{ key: "A", text: "Bachelor of Civil Engineering" }, { key: "B", text: "Master of Environmental Science" }, { key: "C", text: "Doctor of Molecular Biology" }, { key: "D", text: "Diploma in Business Analytics" }], a: "B", exp: "Nghe: 'starting the Master of Environmental Science in October'." },
        { q: "What is Marcus's student ID number?", opts: [{ key: "A", text: "EV-77210" }, { key: "B", text: "ES-88412" }, { key: "C", text: "EV-88421" }, { key: "D", text: "EN-99420" }], a: "C", exp: "ID: 'It is EV-88421'." },
        { q: "What accommodation type did Marcus request?", opts: [{ key: "A", text: "Shared flat with four students" }, { key: "B", text: "Homestay with a local family" }, { key: "C", text: "Off-campus private house rental" }, { key: "D", text: "Single studio apartment with private kitchenette" }], a: "D", exp: "Loại phòng: 'single studio apartment with a private kitchenette'." },
        { q: "What is the address of Greenfield Hall?", opts: [{ key: "A", text: "84 Main Street" }, { key: "B", text: "12 Park Avenue" }, { key: "C", text: "55 King Street" }, { key: "D", text: "99 Broadway" }], a: "A", exp: "Địa chỉ: 'Greenfield Hall on 84 Main Street'." },
        { q: "How much is the weekly rent?", opts: [{ key: "A", text: "150 pounds" }, { key: "B", text: "195 pounds" }, { key: "C", text: "175 pounds" }, { key: "D", text: "220 pounds" }], a: "B", exp: "Tiền thuê: 'weekly rent is 195 pounds'." },
        { q: "What is included in the weekly rent?", opts: [{ key: "A", text: "Three meals daily in the dining hall" }, { key: "B", text: "Weekly laundry cleaning service" }, { key: "C", text: "High-speed internet and all utility bills" }, { key: "D", text: "Free gym personal training" }], a: "C", exp: "Bao gồm: 'including high-speed fiber internet and all utility bills'." },
        { q: "Where is the bicycle storage facility located?", opts: [{ key: "A", text: "Outdoor parking lot" }, { key: "B", text: "Behind the laundry facility" }, { key: "C", text: "Ground Floor Foyer" }, { key: "D", text: "Basement Block B" }], a: "D", exp: "Nơi để xe đạp: 'indoor bicycle racks are located in Basement Block B'." },
        { q: "How much is the refundable security deposit?", opts: [{ key: "A", text: "250 pounds" }, { key: "B", text: "100 pounds" }, { key: "C", text: "200 pounds" }, { key: "D", text: "500 pounds" }], a: "A", exp: "Tiền đặt cọc: 'deposit is 250 pounds'." },
        { q: "When does Marcus's academic term begin?", opts: [{ key: "A", text: "September" }, { key: "B", text: "October" }, { key: "C", text: "November" }, { key: "D", text: "January" }], a: "B", exp: "Thời gian nhập học: 'starting in October'." },
        { q: "Where does Marcus come from?", opts: [{ key: "A", text: "Australia" }, { key: "B", text: "United States" }, { key: "C", text: "Canada" }, { key: "D", text: "New Zealand" }], a: "C", exp: "Quốc tịch: 'incoming postgraduate student from Canada'." }
      ];

      sec1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 1}`,
          partNumber: 1,
          partTitle: "Listening Section 1: Student Accommodation",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
          questionText: `Question ${idx + 1}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 2: National Heritage Park Guided Walk (Q11 - Q20)
      const sec2Script = "Guide: Welcome, visitors, to the Pine Valley National Heritage Sanctuary. My name is Eleanor, and I will be guiding our historical eco-walk today. The sanctuary covers 1,200 hectares of ancient temperate woodland, established in 1892 by conservationist Arthur Pendelton. Before we begin our three-kilometer circuit, let me point out key facilities on your map. To your immediate right is the Visitor Education Center, where interactive touchscreens display our local wildlife catalog. The botanical herb garden is located straight ahead across the timber footbridge. Please note that the Raptor Observation Tower on High Ridge is closed today for routine timber maintenance. Visitors are reminded to stay strictly on marked gravel trails to prevent soil erosion. Binoculars can be rented at the gift shop for 4 pounds. Our walk will conclude at the Riverside Pavilion around 12:30 PM, where tea and scones will be served.";

      const sec2Questions = [
        { q: "When was the sanctuary established?", opts: [{ key: "A", text: "1875" }, { key: "B", text: "1905" }, { key: "C", text: "1920" }, { key: "D", text: "1892" }], a: "D", exp: "Năm thành lập: 'established in 1892'." },
        { q: "How large is the sanctuary?", opts: [{ key: "A", text: "1,200 hectares" }, { key: "B", text: "800 hectares" }, { key: "C", text: "1,500 hectares" }, { key: "D", text: "2,000 hectares" }], a: "A", exp: "Diện tích: 'covers 1,200 hectares'." },
        { q: "What is the length of today's walking route?", opts: [{ key: "A", text: "Two kilometers" }, { key: "B", text: "Three kilometers" }, { key: "C", text: "Five kilometers" }, { key: "D", text: "Eight kilometers" }], a: "B", exp: "Độ dài đường đi: 'three-kilometer circuit'." },
        { q: "Where is the botanical herb garden located?", opts: [{ key: "A", text: "Behind the gift shop" }, { key: "B", text: "On top of High Ridge" }, { key: "C", text: "Straight ahead across the timber footbridge" }, { key: "D", text: "Near the car park" }], a: "C", exp: "Vị trí vườn thảo mộc: 'straight ahead across the timber footbridge'." },
        { q: "Why is the Raptor Observation Tower closed today?", opts: [{ key: "A", text: "Bird nesting season" }, { key: "B", text: "Storm damage repairs" }, { key: "C", text: "Filming of a wildlife documentary" }, { key: "D", text: "Routine timber maintenance" }], a: "D", exp: "Lý do đóng cửa: 'closed today for routine timber maintenance'." },
        { q: "Why must visitors stay on marked gravel paths?", opts: [{ key: "A", text: "To prevent soil erosion" }, { key: "B", text: "To avoid poisonous snakes" }, { key: "C", text: "To avoid private farmland" }, { key: "D", text: "To keep walking groups together" }], a: "A", exp: "Lý do: 'to prevent soil erosion'." },
        { q: "How much does binocular rental cost?", opts: [{ key: "A", text: "2 pounds" }, { key: "B", text: "4 pounds" }, { key: "C", text: "6 pounds" }, { key: "D", text: "Free of charge" }], a: "B", exp: "Giá thuê ống nhòm: 'rented at the gift shop for 4 pounds'." },
        { q: "Where will the walk conclude?", opts: [{ key: "A", text: "At the Visitor Center" }, { key: "B", text: "At High Ridge Lookout" }, { key: "C", text: "At the Riverside Pavilion" }, { key: "D", text: "At the Main Gate" }], a: "C", exp: "Điểm kết thúc: 'conclude at the Riverside Pavilion'." },
        { q: "What refreshments will be provided at the end?", opts: [{ key: "A", text: "Cold sandwiches and juice" }, { key: "B", text: "Barbecue lunch" }, { key: "C", text: "Fresh fruit and coffee" }, { key: "D", text: "Tea and scones" }], a: "D", exp: "Đồ ăn nhẹ: 'tea and scones will be served'." },
        { q: "What time will the guided walk finish?", opts: [{ key: "A", text: "Around 12:30 PM" }, { key: "B", text: "11:30 AM" }, { key: "C", text: "12:00 PM" }, { key: "D", text: "01:15 PM" }], a: "A", exp: "Thời gian kết thúc: 'around 12:30 PM'." }
      ];

      sec2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 11}`,
          partNumber: 2,
          partTitle: "Listening Section 2: Heritage Park Tour",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
          questionText: `Question ${idx + 11}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 3: Academic Research on Marine Bioluminescence (Q21 - Q30)
      const sec3Script = "Professor: Good afternoon, Claire and Liam. Let's review your research proposal on deep-sea marine bioluminescence.\nClaire: Thank you, Professor Evans. We've structured our paper into three main sections: the biochemical mechanisms of luciferin-luciferase reactions, evolutionary adaptations for predator deterrence, and modern medical applications of green fluorescent proteins.\nLiam: We found that over 75 percent of deep-sea organisms between 200 and 1,000 meters depth utilize bioluminescence for camouflage through counter-illumination.\nProfessor: That is an excellent focus. However, I noticed that your literature review relies heavily on studies published before 2018. You should incorporate recent genomic sequencing papers by Dr. Tanaka from the Oceanographic Institute.\nClaire: We will review those papers this week and expand the methodology chapter accordingly.\nProfessor: Make sure you submit your revised draft by Friday, November 14th.";

      const sec3Questions = [
        { q: "What are the three main focus areas of Claire and Liam's proposal?", opts: [{ key: "A", text: "Ocean currents, water salinity, and coral health" }, { key: "B", text: "Biochemistry, evolutionary deterrence, and medical applications" }, { key: "C", text: "Commercial fishing, submersibles, and navigation" }, { key: "D", text: "Tectonic plates, hydrothermal vents, and bacteria" }], a: "B", exp: "3 phần chính: 'biochemical mechanisms, evolutionary adaptations, and modern medical applications'." },
        { q: "What percentage of organisms between 200-1000m use bioluminescence?", opts: [{ key: "A", text: "50 percent" }, { key: "B", text: "60 percent" }, { key: "C", text: "Over 75 percent" }, { key: "D", text: "90 percent" }], a: "C", exp: "Tỷ lệ: 'over 75 percent of deep-sea organisms'." },
        { q: "What is counter-illumination used for?", opts: [{ key: "A", text: "Attracting prey" }, { key: "B", text: "Warning shoal members of danger" }, { key: "C", text: "Regulating body temperature" }, { key: "D", text: "Camouflage against predators" }], a: "D", exp: "Tác dụng: 'camouflage through counter-illumination'." },
        { q: "What weakness did Professor Evans identify in their literature review?", opts: [{ key: "A", text: "Heavy reliance on pre-2018 publications" }, { key: "B", text: "Too few statistical charts" }, { key: "C", text: "Lack of deep-sea photograph citations" }, { key: "D", text: "Inaccurate chemical formulas" }], a: "A", exp: "Hạn chế: 'literature review relies heavily on studies published before 2018'." },
        { q: "Whose recent genomic research should the students incorporate?", opts: [{ key: "A", text: "Dr. Arthur Pendelton" }, { key: "B", text: "Dr. Tanaka from the Oceanographic Institute" }, { key: "C", text: "Dr. Marcus Vance" }, { key: "D", text: "Dr. Eleanor Rossi" }], a: "B", exp: "Tác giả cần bổ sung: 'recent genomic sequencing papers by Dr. Tanaka'." },
        { q: "What chapter will the students expand?", opts: [{ key: "A", text: "The Abstract" }, { key: "B", text: "The Conclusion" }, { key: "C", text: "The Methodology chapter" }, { key: "D", text: "The Bibliography index" }], a: "C", exp: "Mục cần mở rộng: 'expand the methodology chapter accordingly'." },
        { q: "What is the revised draft submission deadline?", opts: [{ key: "A", text: "Monday, November 10th" }, { key: "B", text: "Wednesday, November 19th" }, { key: "C", text: "End of the semester" }, { key: "D", text: "Friday, November 14th" }], a: "D", exp: "Thời hạn nộp bài: 'revised draft by Friday, November 14th'." },
        { q: "What chemical reaction produces biological light?", opts: [{ key: "A", text: "Luciferin-luciferase reaction" }, { key: "B", text: "Photosynthesis and chlorophyll" }, { key: "C", text: "Sodium-potassium cellular pump" }, { key: "D", text: "ATP hydrolysis alone" }], a: "A", exp: "Phản ứng hóa sinh: 'biochemical mechanisms of luciferin-luciferase reactions'." },
        { q: "At what depth range is counter-illumination most prevalent?", opts: [{ key: "A", text: "0 to 100 meters" }, { key: "B", text: "200 to 1,000 meters" }, { key: "C", text: "2,000 to 4,000 meters" }, { key: "D", text: "Below 6,000 meters" }], a: "B", exp: "Độ sâu: 'between 200 and 1,000 meters depth'." },
        { q: "What medical application is mentioned in the research?", opts: [{ key: "A", text: "Antibiotic synthesis" }, { key: "B", text: "Cardiovascular stents" }, { key: "C", text: "Green fluorescent proteins in cellular imaging" }, { key: "D", text: "Radiation therapy shielding" }], a: "C", exp: "Ứng dụng y học: 'medical applications of green fluorescent proteins'." }
      ];

      sec3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 21}`,
          partNumber: 3,
          partTitle: "Listening Section 3: Marine Bioluminescence",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
          questionText: `Question ${idx + 21}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 4: University Lecture on Microfinance in Developing Economies (Q31 - Q40)
      const sec4Script = "Lecturer: Good morning. Today's lecture examines the evolution and socioeconomic impact of microfinance institutions across rural communities in South Asia and Latin America. Pioneer Muhammad Yunus established the Grameen Bank in Bangladesh in 1983, predicated on the revolutionary principle that unbanked individuals, particularly women, could achieve economic self-sufficiency if provided with modest micro-credit collateral-free loans. Empirical data from over forty years reveals that women represent 84 percent of all micro-borrowers globally, and their loan repayment rates consistently exceed 97 percent. Microfinance has stimulated local entrepreneurship in agriculture, textile weaving, and renewable energy adoption. However, modern critics point to challenges, including exorbitant secondary interest rates charged by unregulated commercial lenders and debt cycling among vulnerable households. Sustainable microfinance requires stringent regulatory caps on interest rates and comprehensive financial literacy education.";

      const sec4Questions = [
        { q: "When was Grameen Bank established by Muhammad Yunus?", opts: [{ key: "A", text: "1972" }, { key: "B", text: "1991" }, { key: "C", text: "2000" }, { key: "D", text: "1983" }], a: "D", exp: "Năm thành lập: 'established the Grameen Bank in Bangladesh in 1983'." },
        { q: "What percentage of global micro-borrowers are women?", opts: [{ key: "A", text: "84 percent" }, { key: "B", text: "65 percent" }, { key: "C", text: "75 percent" }, { key: "D", text: "95 percent" }], a: "A", exp: "Tỷ lệ phụ nữ vay: 'women represent 84 percent of all micro-borrowers globally'." },
        { q: "What is the average repayment rate for female microfinance borrowers?", opts: [{ key: "A", text: "85 percent" }, { key: "B", text: "Over 97 percent" }, { key: "C", text: "90 percent" }, { key: "D", text: "100 percent" }], a: "B", exp: "Tỷ lệ hoàn trả: 'repayment rates consistently exceed 97 percent'." },
        { q: "What was the core innovation of early microfinance?", opts: [{ key: "A", text: "High collateral property mortgages" }, { key: "B", text: "Government-subsidized currency speculation" }, { key: "C", text: "Modest, collateral-free credit for unbanked individuals" }, { key: "D", text: "Cryptocurrency digital wallets" }], a: "C", exp: "Đổi mới cốt lõi: 'modest micro-credit collateral-free loans for unbanked individuals'." },
        { q: "Which sectors have benefited most from micro-loans?", opts: [{ key: "A", text: "Heavy industrial mining and automotive assembly" }, { key: "B", text: "Aerospace engineering and luxury real estate" }, { key: "C", text: "Commercial shipping and maritime logistics" }, { key: "D", text: "Agriculture, textile weaving, and renewable energy" }], a: "D", exp: "Các ngành hưởng lợi: 'entrepreneurship in agriculture, textile weaving, and renewable energy'." },
        { q: "What primary criticism do modern analysts highlight?", opts: [{ key: "A", text: "Exorbitant secondary interest rates and debt cycling" }, { key: "B", text: "Excessive bureaucratic paperwork" }, { key: "C", text: "Lack of female participation" }, { key: "D", text: "Over-reliance on commercial banking bailouts" }], a: "A", exp: "Chỉ trích: 'exorbitant secondary interest rates charged by unregulated lenders and debt cycling'." },
        { q: "What dual solutions does the lecturer recommend for sustainability?", opts: [{ key: "A", text: "Government bans on private banks" }, { key: "B", text: "Regulatory interest rate caps and financial literacy training" }, { key: "C", text: "Eliminating all credit loans" }, { key: "D", text: "Transitioning to barter trade" }], a: "B", exp: "Giải pháp bền vững: 'stringent regulatory caps on interest rates and comprehensive financial literacy education'." },
        { q: "In which country was Grameen Bank founded?", opts: [{ key: "A", text: "India" }, { key: "B", text: "Pakistan" }, { key: "C", text: "Bangladesh" }, { key: "D", text: "Sri Lanka" }], a: "C", exp: "Quốc gia khởi xướng: 'Grameen Bank in Bangladesh'." },
        { q: "How many years of empirical data were examined in the lecture?", opts: [{ key: "A", text: "Twenty years" }, { key: "B", text: "Thirty years" }, { key: "C", text: "Fifty years" }, { key: "D", text: "Over forty years" }], a: "D", exp: "Dữ liệu thực nghiệm: 'Empirical data from over forty years'." },
        { q: "What is the main overarching theme of the lecture?", opts: [{ key: "A", text: "Socioeconomic impacts and challenges of microfinance in developing economies" }, { key: "B", text: "The history of central banking" }, { key: "C", text: "Stock exchange volatility in Asia" }, { key: "D", text: "Corporate taxation laws in Latin America" }], a: "A", exp: "Chủ đề bao quát: 'evolution and socioeconomic impact of microfinance institutions across rural communities'." }
      ];

      sec4Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 31}`,
          partNumber: 4,
          partTitle: "Listening Section 4: Microfinance Economics",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
          questionText: `Question ${idx + 31}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // IELTS READING (Q41 - Q80: 3 ACADEMIC PASSAGES, 40 QUESTIONS)
      // PASSAGE 1: The Biology & Conservation of Coral Reef Bleaching (Q41 - Q53: 13 Questions)
      const readPassage1 = `READING PASSAGE 1 — THE BIOLOGY AND CONSERVATION OF CORAL REEF BLEACHING\n\nCoral reefs represent some of the most biodiverse marine ecosystems on Earth, occupying less than 0.1 percent of the ocean floor yet harboring more than 25 percent of all documented marine species. The structural foundation of tropical coral reefs is built upon a delicate symbiotic relationship between scleractinian coral polyps and microscopic endosymbiotic dinoflagellates known as zooxanthellae (Symbiodiniaceae). These photosynthetic microalgae reside within the gastrodermal tissues of the coral host, supplying up to 90 percent of the polyp's metabolic energy requirements through photosynthesis in exchange for essential inorganic nutrients and protective shelter.\n\nWhen sea surface temperatures exceed local seasonal baselines by as little as 1 to 2 degrees Celsius for sustained periods of four weeks or more, the photosynthetic machinery of zooxanthellae becomes impaired. The microalgae begin producing harmful reactive oxygen species (ROS) that damage cellular structures. In response to physiological oxidative stress, the coral host expels the algae, causing the coral colony to lose its characteristic vibrant pigmentation and exposing the stark white calcium carbonate skeleton underneath—a phenomenon termed 'coral bleaching.' While bleached corals are not immediately deceased, they enter a state of severe starvation and heightened vulnerability to opportunistic pathogens.\n\nMarine scientists have observed four global mass bleaching events: in 1998, 2010, 2014–2017, and most recently in 2024–2026. The 2016 event alone devastated over 30 percent of shallow-water corals across Australia's Great Barrier Reef. However, recent scientific breakthroughs in assisted evolution and selective breeding offer promising conservation pathways. Marine biologists at the Australian Institute of Marine Science (AIMS) have successfully cultivated heat-tolerant strains of Symbiodiniaceae capable of withstanding ocean temperatures 2.5 degrees Celsius above historical averages. When inoculated into laboratory-reared coral larvae, these thermally resilient symbionts significantly enhance post-settlement survival rates.\n\nNevertheless, marine ecologists emphasize that biological interventions alone cannot substitute for global climate mitigation. Halting ocean warming through aggressive decarbonization remains the indispensable prerequisite for ensuring that coral reefs survive for future generations.`;

      const p1Questions = [
        { q: "What percentage of the ocean floor do coral reefs occupy?", opts: [{ key: "A", text: "1.5 percent" }, { key: "B", text: "Less than 0.1 percent" }, { key: "C", text: "10 percent" }, { key: "D", text: "25 percent" }], a: "B", exp: "Đoạn 1: 'occupying less than 0.1 percent of the ocean floor'." },
        { q: "What percentage of marine species depend on coral reef ecosystems?", opts: [{ key: "A", text: "Less than 5 percent" }, { key: "B", text: "10 percent" }, { key: "C", text: "More than 25 percent" }, { key: "D", text: "90 percent" }], a: "C", exp: "Đoạn 1: 'harboring more than 25 percent of all documented marine species'." },
        { q: "What are zooxanthellae?", opts: [{ key: "A", text: "Parasitic marine worms" }, { key: "B", text: "Calcium carbonate mineral deposits" }, { key: "C", text: "Predatory deep-sea jellyfish" }, { key: "D", text: "Microscopic endosymbiotic photosynthetic microalgae" }], a: "D", exp: "Đoạn 1: 'microscopic endosymbiotic dinoflagellates known as zooxanthellae'." },
        { q: "How much of the coral polyp's metabolic energy is supplied by zooxanthellae?", opts: [{ key: "A", text: "Up to 90 percent" }, { key: "B", text: "Up to 25 percent" }, { key: "C", text: "Up to 50 percent" }, { key: "D", text: "Up to 75 percent" }], a: "A", exp: "Đoạn 1: 'supplying up to 90 percent of the polyp's metabolic energy requirements'." },
        { q: "What temperature increase triggers cellular damage in zooxanthellae?", opts: [{ key: "A", text: "0.2 degrees Celsius" }, { key: "B", text: "1 to 2 degrees Celsius above seasonal baselines" }, { key: "C", text: "5 degrees Celsius" }, { key: "D", text: "10 degrees Celsius" }], a: "B", exp: "Đoạn 2: 'exceed local seasonal baselines by as little as 1 to 2 degrees Celsius'." },
        { q: "What toxic molecules do damaged microalgae produce during thermal stress?", opts: [{ key: "A", text: "Carbon monoxide" }, { key: "B", text: "Sulfur dioxide" }, { key: "C", text: "Reactive oxygen species (ROS)" }, { key: "D", text: "Heavy metals" }], a: "C", exp: "Đoạn 2: 'producing harmful reactive oxygen species (ROS)'." },
        { q: "Are bleached corals immediately dead?", opts: [{ key: "A", text: "Yes, death is instantaneous upon color loss" }, { key: "B", text: "Yes, the calcium skeleton dissolves immediately" }, { key: "C", text: "No, their growth rate accelerates" }, { key: "D", text: "No, they enter a state of starvation and vulnerability" }], a: "D", exp: "Đoạn 2: 'bleached corals are not immediately deceased, they enter a state of severe starvation'." },
        { q: "How many global mass bleaching events have been documented?", opts: [{ key: "A", text: "Four global mass events" }, { key: "B", text: "Two events" }, { key: "C", text: "Seven events" }, { key: "D", text: "Ten events" }], a: "A", exp: "Đoạn 3: 'observed four global mass bleaching events: in 1998, 2010, 2014–2017, and 2024–2026'." },
        { q: "What proportion of shallow-water corals died on the Great Barrier Reef in 2016?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "Over 30 percent" }, { key: "C", text: "50 percent" }, { key: "D", text: "80 percent" }], a: "B", exp: "Đoạn 3: 'devastated over 30 percent of shallow-water corals'." },
        { q: "What conservation breakthrough was achieved by researchers at AIMS?", opts: [{ key: "A", text: "Inventing synthetic plastic coral skeletons" }, { key: "B", text: "Building underwater refrigeration chillers" }, { key: "C", text: "Cultivating heat-tolerant microalgae strains capable of surviving +2.5°C" }, { key: "D", text: "Shading ocean reefs with reflective plastic sheets" }], a: "C", exp: "Đoạn 3: 'cultivated heat-tolerant strains of Symbiodiniaceae capable of withstanding +2.5 degrees Celsius'." },
        { q: "Do the authors believe biological interventions alone can save coral reefs?", opts: [{ key: "A", text: "Yes, assisted evolution will eliminate all risks" }, { key: "B", text: "Yes, corals can adapt to any temperature level" }, { key: "C", text: "No, all coral species will become extinct regardless" }, { key: "D", text: "No, global climate mitigation and decarbonization are indispensable" }], a: "D", exp: "Đoạn 4: 'biological interventions alone cannot substitute for global climate mitigation'." },
        { q: "What is the primary mineral component of the coral skeleton?", opts: [{ key: "A", text: "Calcium carbonate" }, { key: "B", text: "Silicon dioxide" }, { key: "C", text: "Magnesium sulfate" }, { key: "D", text: "Iron oxide" }], a: "A", exp: "Đoạn 2: 'white calcium carbonate skeleton underneath'." },
        { q: "What is the tone and objective of the reading passage?", opts: [{ key: "A", text: "Humorous and informal" }, { key: "B", text: "Scientific, objective, and urgent" }, { key: "C", text: "Commercial and promotional" }, { key: "D", text: "Philosophical and speculative" }], a: "B", exp: "Văn phong học thuật, khách quan và nhấn mạnh tính cấp bách bảo tồn." }
      ];

      p1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 41}`,
          partNumber: 5,
          partTitle: "Reading Passage 1: Coral Reef Bleaching",
          section: "READING",
          passageText: readPassage1,
          questionText: `Question ${idx + 41}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // PASSAGE 2: Cognitive Psychology & Memory Consolidation in Sleep (Q54 - Q66: 13 Questions)
      const readPassage2 = `READING PASSAGE 2 — COGNITIVE PSYCHOLOGY AND SLEEP MEMORY CONSOLIDATION\n\nFor over a century, neuroscientists and cognitive psychologists have sought to decipher the precise mechanisms through which the human brain transforms ephemeral waking experiences into enduring long-term memories. Contemporary sleep science posits that memory consolidation is not a passive decay-prevention process, but an active, system-level neurobiological reorganization that unfolds predominantly during non-rapid eye movement (NREM) slow-wave sleep and rapid eye movement (REM) stages.\n\nThe leading neurobiological model, known as the 'Two-Stage Memory Architecture,' conceptualizes the hippocampus as a rapid-learning, temporary buffer with high synaptic plasticity, and the neocortex as a slow-learning, vast long-term storage reservoir. During quiet waking and deep NREM slow-wave sleep (characterized by high-amplitude cortical delta oscillations below 4 Hz and thalamocortical sleep spindles between 12 and 15 Hz), the hippocampus engages in spontaneous, high-frequency 'sharp-wave ripples.' These ripples represent compressed neural replay of firing sequences that occurred during prior daytime learning.\n\nThrough synchronized dialogue between hippocampal ripples, thalamic spindles, and neocortical slow oscillations, newly acquired memories are progressively transferred and integrated into distributed neocortical circuits. Experimental studies using optogenetic silencing in rodent models demonstrated that disrupting sharp-wave ripples during post-learning sleep caused catastrophic impairment in spatial navigational recall, confirming the causal role of sleep replay.\n\nFurthermore, REM sleep—characterized by desynchronized EEG waveforms, rapid ocular movements, and muscle atonia—plays a distinct role in emotional memory regulation and associative creative problem-solving. During REM dreaming, low levels of the stress neurotransmitter noradrenaline allow the amygdala and prefrontal cortex to process emotionally charged memories in a neurochemically safe milieu, decoupling the factual memory from its visceral stress response. Consequently, chronic sleep deprivation not only impairs cognitive retention but exacerbates affective mood disorders.`;

      const p2Questions = [
        { q: "What is the primary role of the hippocampus in the Two-Stage Memory Architecture?", opts: [{ key: "A", text: "Long-term permanent storage reservoir" }, { key: "B", text: "Motor muscle coordination center" }, { key: "C", text: "Temporary, rapid-learning memory buffer" }, { key: "D", text: "Sensory visual processing unit" }], a: "C", exp: "Đoạn 2: 'hippocampus as a rapid-learning, temporary buffer'." },
        { q: "Where are permanent long-term memories primarily stored?", opts: [{ key: "A", text: "In the cerebellum" }, { key: "B", text: "In the spinal cord" }, { key: "C", text: "In the optic nerve" }, { key: "D", text: "In distributed neocortical circuits" }], a: "D", exp: "Đoạn 2: 'neocortex as a slow-learning, vast long-term storage reservoir'." },
        { q: "What frequency defines cortical delta oscillations during slow-wave sleep?", opts: [{ key: "A", text: "Below 4 Hz" }, { key: "B", text: "Between 12 and 15 Hz" }, { key: "C", text: "30 to 50 Hz" }, { key: "D", text: "Above 100 Hz" }], a: "A", exp: "Đoạn 2: 'cortical delta oscillations below 4 Hz'." },
        { q: "What frequency range characterizes thalamocortical sleep spindles?", opts: [{ key: "A", text: "1 to 3 Hz" }, { key: "B", text: "Between 12 and 15 Hz" }, { key: "C", text: "20 to 25 Hz" }, { key: "D", text: "80 to 90 Hz" }], a: "B", exp: "Đoạn 2: 'thalamocortical sleep spindles between 12 and 15 Hz'." },
        { q: "What are hippocampal 'sharp-wave ripples'?", opts: [{ key: "A", text: "Electrical artifacts caused by eye movement" }, { key: "B", text: "Signs of brain tissue fatigue" }, { key: "C", text: "Compressed neural replays of prior waking learning sequences" }, { key: "D", text: "Inhibitory signals that suppress all memory" }], a: "C", exp: "Đoạn 2: 'compressed neural replay of firing sequences that occurred during prior daytime learning'." },
        { q: "What happened to rodents when sharp-wave ripples were optogenetically disrupted?", opts: [{ key: "A", text: "Their running speed increased" }, { key: "B", text: "They entered prolonged REM sleep" }, { key: "C", text: "Their vision improved" }, { key: "D", text: "Catastrophic impairment in spatial navigational recall" }], a: "D", exp: "Đoạn 3: 'caused catastrophic impairment in spatial navigational recall'." },
        { q: "Which sleep stage is characterized by rapid eye movement and muscle atonia?", opts: [{ key: "A", text: "REM Sleep" }, { key: "B", text: "NREM Stage 1" }, { key: "C", text: "NREM Stage 3 Slow-Wave Sleep" }, { key: "D", text: "Quiet wakefulness" }], a: "A", exp: "Đoạn 4: 'REM sleep—characterized by desynchronized EEG waveforms, rapid ocular movements, and muscle atonia'." },
        { q: "What is the key emotional benefit of REM sleep?", opts: [{ key: "A", text: "Eliminating all emotional memories completely" }, { key: "B", text: "Decoupling factual memories from their visceral stress response in a low-noradrenaline environment" }, { key: "C", text: "Increasing adrenaline production for daytime alertness" }, { key: "D", text: "Strengthening negative emotional reactions" }], a: "B", exp: "Đoạn 4: 'decoupling the factual memory from its visceral stress response'." },
        { q: "Which neurotransmitter is present at low levels during REM dreaming?", opts: [{ key: "A", text: "Dopamine" }, { key: "B", text: "Serotonin" }, { key: "C", text: "Noradrenaline" }, { key: "D", text: "Acetylcholine" }], a: "C", exp: "Đoạn 4: 'low levels of the stress neurotransmitter noradrenaline'." },
        { q: "What are the dual consequences of chronic sleep deprivation mentioned in the text?", opts: [{ key: "A", text: "Hearing loss and digestive failure" }, { key: "B", text: "Loss of bone density and hair thinning" }, { key: "C", text: "Increased appetite for protein only" }, { key: "D", text: "Impaired cognitive retention and exacerbated affective mood disorders" }], a: "D", exp: "Đoạn 4: 'impairs cognitive retention but exacerbates affective mood disorders'." },
        { q: "The term 'active, system-level neurobiological reorganization' implies that memory consolidation is:", opts: [{ key: "A", text: "A complex, constructive process involving multiple brain regions" }, { key: "B", text: "A purely mechanical forgetting of old data" }, { key: "C", text: "A passive fading of neural connections" }, { key: "D", text: "An instantaneous event occurring in seconds" }], a: "A", exp: "Đoạn 1: Quá trình tái cấu trúc chủ động liên vùng não (hippocampus + neocortex)." },
        { q: "Which technique was used in rodent models to prove the causal role of ripples?", opts: [{ key: "A", text: "Magnetic resonance imaging (MRI)" }, { key: "B", text: "Optogenetic silencing" }, { key: "C", text: "Surgical removal of the whole brain" }, { key: "D", text: "Simple behavioral observation without sensors" }], a: "B", exp: "Đoạn 3: 'Experimental studies using optogenetic silencing in rodent models'." },
        { q: "What is the main finding of the passage regarding sleep and memory?", opts: [{ key: "A", text: "Sleep is merely a period of physical rest without brain activity" }, { key: "B", text: "Dreams are completely random and serve no biological purpose" }, { key: "C", text: "Specific sleep stages coordinate memory transfer and emotional regulation" }, { key: "D", text: "Only daytime studying affects exam performance" }], a: "C", exp: "Chủ đề chính: Các giai đoạn ngủ phối hợp chuyển giao ký ức và điều hòa cảm xúc." }
      ];

      p2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 54}`,
          partNumber: 6,
          partTitle: "Reading Passage 2: Sleep & Memory Consolidation",
          section: "READING",
          passageText: readPassage2,
          questionText: `Question ${idx + 54}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // PASSAGE 3: Industrial Archaeology of Early Textile Mills (Q67 - Q80: 14 Questions)
      const readPassage3 = `READING PASSAGE 3 — THE INDUSTRIAL ARCHAEOLOGY OF EARLY TEXTILE MILLS\n\nThe Industrial Revolution of the late eighteenth and early nineteenth centuries transformed Britain from an agrarian economy into the workshop of the world. Central to this epochal transformation was the mechanization of cotton textile manufacturing, catalyzed by pioneering inventions such as Richard Arkwright's water frame (patented in 1769) and Samuel Crompton's spinning mule (1779). Industrial archaeologists studying the structural remains of early water-powered mills in Derbyshire's Derwent Valley have revealed how architectural design and spatial organization were engineered to maximize kinetic power transmission and enforce labor discipline.\n\nArkwright's Cromford Mill, constructed in 1771, served as the universal archetype for the modern factory system. Prior to Cromford, textile spinning was decentralized, conducted within domestic cottages under the 'putting-out' system. Arkwright concentrated hundreds of mechanized spindles under a single roof, powered by a massive cast-iron breastshot waterwheel driven by Bonsall Brook and the Cromford sough. Archaeological excavations at Cromford have uncovered subterranean water culverts, stone shuttle gates, and gear pits that demonstrate remarkable hydraulic precision in maintaining continuous rotational torque.\n\nThe architectural layout of multi-story mill buildings reflected strict hierarchical surveillance. Long, narrow floorplates with expansive grid windows maximized natural daylight penetration for fine thread handling while providing unobstructed sightlines for factory overseers. The introduction of Boulton & Watt rotative steam engines in the 1790s liberated mills from geographical dependency on fast-flowing river valleys, precipitating the rapid urbanization of Manchester—subsequently dubbed 'Cottonopolis.' However, archaeological evidence from worker housing rows at Belper and Milford demonstrates that early mill owners also constructed paternalistic community infrastructures, including churches, schools, and cooperative bakeries, to attract and retain skilled labor families.\n\nToday, the Derwent Valley Mills World Heritage Site stands as a poignant testament to the technological ingenuity and profound social upheaval of the dawn of the industrial era.`;

      const p3Questions = [
        { q: "What did Richard Arkwright patent in 1769?", opts: [{ key: "A", text: "The steam locomotive" }, { key: "B", text: "The cotton gin" }, { key: "C", text: "The power loom" }, { key: "D", text: "The water frame" }], a: "D", exp: "Đoạn 1: 'Richard Arkwright's water frame (patented in 1769)'." },
        { q: "Who invented the spinning mule in 1779?", opts: [{ key: "A", text: "Samuel Crompton" }, { key: "B", text: "James Watt" }, { key: "C", text: "Arthur Pendelton" }, { key: "D", text: "Matthew Boulton" }], a: "A", exp: "Đoạn 1: 'Samuel Crompton's spinning mule (1779)'." },
        { q: "What was the traditional textile production model before Cromford Mill?", opts: [{ key: "A", text: "The assembly line model" }, { key: "B", text: "The domestic putting-out cottage system" }, { key: "C", text: "State-owned collective workshops" }, { key: "D", text: "Importing all yarn from overseas" }], a: "B", exp: "Đoạn 2: 'decentralized, conducted within domestic cottages under the putting-out system'." },
        { q: "What powered Arkwright's original Cromford Mill in 1771?", opts: [{ key: "A", text: "Coal steam engines" }, { key: "B", text: "Windmills" }, { key: "C", text: "A massive cast-iron breastshot waterwheel" }, { key: "D", text: "Horse-drawn dynamos" }], a: "C", exp: "Đoạn 2: 'powered by a massive cast-iron breastshot waterwheel'." },
        { q: "What archaeological artifacts were excavated at Cromford?", opts: [{ key: "A", text: "Roman pottery and bronze swords" }, { key: "B", text: "Railway steel rails" }, { key: "C", text: "Printing presses" }, { key: "D", text: "Subterranean water culverts, stone shuttle gates, and gear pits" }], a: "D", exp: "Đoạn 2: 'uncovered subterranean water culverts, stone shuttle gates, and gear pits'." },
        { q: "Why did early mills feature long, narrow floors with large windows?", opts: [{ key: "A", text: "To maximize natural daylight and provide clear overseer sightlines" }, { key: "B", text: "To reduce heating fuel costs" }, { key: "C", text: "To allow smoke from coal stoves to escape" }, { key: "D", text: "To comply with fire exit regulations" }], a: "A", exp: "Đoạn 3: 'maximized natural daylight penetration... while providing unobstructed sightlines for factory overseers'." },
        { q: "What major technological shift occurred in the 1790s?", opts: [{ key: "A", text: "Electrification of looms" }, { key: "B", text: "Introduction of Boulton & Watt rotative steam engines" }, { key: "C", text: "Synthetic nylon invention" }, { key: "D", text: "Digital automation" }], a: "B", exp: "Đoạn 3: 'introduction of Boulton & Watt rotative steam engines in the 1790s'." },
        { q: "What nickname was given to Manchester due to its cotton mill concentration?", opts: [{ key: "A", text: "Steel City" }, { key: "B", text: "The Smoke Capital" }, { key: "C", text: "Cottonopolis" }, { key: "D", text: "Textile Haven" }], a: "C", exp: "Đoạn 3: 'Manchester—subsequently dubbed Cottonopolis'." },
        { q: "What community facilities did paternalistic mill owners construct at Belper and Milford?", opts: [{ key: "A", text: "Casinos and racetracks" }, { key: "B", text: "Military barracks" }, { key: "C", text: "Prisons and workhouses only" }, { key: "D", text: "Churches, schools, and cooperative bakeries" }], a: "D", exp: "Đoạn 3: 'churches, schools, and cooperative bakeries, to attract and retain skilled labor families'." },
        { q: "What is the modern conservation designation of the Derwent Valley mills?", opts: [{ key: "A", text: "UNESCO World Heritage Site" }, { key: "B", text: "National Defense Monument" }, { key: "C", text: "Commercial Industrial Free Zone" }, { key: "D", text: "Private Research Laboratory" }], a: "A", exp: "Đoạn 4: 'Derwent Valley Mills World Heritage Site'." },
        { q: "What was the consequence of steam power on mill location?", opts: [{ key: "A", text: "Mills were forced into mountainous areas" }, { key: "B", text: "Mills were liberated from river valleys, enabling urban concentration" }, { key: "C", text: "Mills had to be built near seashores exclusively" }, { key: "D", text: "Textile production declined sharply" }], a: "B", exp: "Đoạn 3: 'liberated mills from geographical dependency on fast-flowing river valleys'." },
        { q: "What is the academic field that examines these physical historic structures?", opts: [{ key: "A", text: "Paleontology" }, { key: "B", text: "Urban Meteorology" }, { key: "C", text: "Industrial Archaeology" }, { key: "D", text: "Theoretical Physics" }], a: "C", exp: "Đoạn 1: 'Industrial archaeologists studying the structural remains'." },
        { q: "In what century did this textile transformation primarily occur?", opts: [{ key: "A", text: "Sixteenth century" }, { key: "B", text: "Mid-twentieth century" }, { key: "C", text: "Twenty-first century" }, { key: "D", text: "Late eighteenth and early nineteenth centuries" }], a: "D", exp: "Đoạn 1: 'Industrial Revolution of the late eighteenth and early nineteenth centuries'." },
        { q: "What was the overarching legacy of the Derwent Valley mills?", opts: [{ key: "A", text: "They served as the universal archetype for the modern factory system" }, { key: "B", text: "They were a failed experiment in mechanization" }, { key: "C", text: "They prevented urbanization in England" }, { key: "D", text: "They were immediately replaced by cottage workshops" }], a: "A", exp: "Đoạn 2: 'served as the universal archetype for the modern factory system'." }
      ];

      p3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k_q${idx + 67}`,
          partNumber: 7,
          partTitle: "Reading Passage 3: Industrial Textile Archaeology",
          section: "READING",
          passageText: readPassage3,
          questionText: `Question ${idx + 67}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // IELTS SPEAKING AI (Q81 - Q83: 3 PARTS)
      qs.push({
        id: "ia4k_q81",
        partNumber: 8,
        partTitle: "IELTS Speaking Part 1: Introduction & Interview",
        section: "SPEAKING",
        speakingPrompt: "Let's talk about environmental protection and sustainability. 1. Do you recycle household waste regularly? 2. What environmental changes have you noticed in your hometown over recent years? 3. Do you think individuals can make a meaningful difference in reducing plastic pollution? Answer naturally with extended sentences.",
        preparationTimeSeconds: 15,
        speakingTimeSeconds: 60,
        questionText: "Question 81 (Speaking Part 1): Answer interview questions on environmental habits (4-5 extended sentences).",
        options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "View IELTS Band 9 lexical collocations" },
            { key: "C", text: "Listen to native examiner question" },
            { key: "D", text: "Skip to Cue Card" }
          ],
        correctAnswer: "A",
        explanation: "Tiêu chí chấm Cambridge Band 8.0+: Trả lời trực tiếp, mở rộng lý do ('For instance, my municipality implemented a color-coded sorting system...'), dùng từ vựng theo chủ đề ('biodegradable alternatives', 'carbon footprint')."
      });

      qs.push({
        id: "ia4k_q82",
        partNumber: 9,
        partTitle: "IELTS Speaking Part 2: Cue Card Long Turn",
        section: "SPEAKING",
        speakingPrompt: "Describe an environmental initiative or project you know about that helps improve your community.\nYou should say:\n• What the initiative is and who organized it\n• Where it took place\n• What actions were taken\nAnd explain how you feel about the impact of this project on your community.",
        preparationTimeSeconds: 60,
        speakingTimeSeconds: 120,
        questionText: "Question 82 (Speaking Part 2): Deliver a continuous 2-minute speech on the Cue Card prompt.",
        options: [
            { key: "A", text: "View 1-Minute Note-Taking Strategy" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3" }
          ],
        correctAnswer: "B",
        explanation: "Dàn bài mẫu Band 9.0: 1. Giới thiệu ('I would like to talk about the Urban Canopy reforestation drive organized by our municipal youth council in downtown Hanoi...'). 2. Triển khai 4 ý cue card mạch lạc. 3. Kết luận đánh giá tác động lâu dài."
      });

      qs.push({
        id: "ia4k_q83",
        partNumber: 10,
        partTitle: "IELTS Speaking Part 3: Two-Way Discussion",
        section: "SPEAKING",
        speakingPrompt: "Let's discuss environmental policy and global cooperation. 1. Should national governments enact legally binding legislation requiring corporations to achieve net-zero carbon emissions, or should compliance be voluntary? 2. How can international organizations balance economic growth in developing nations with strict environmental conservation targets?",
        preparationTimeSeconds: 20,
        speakingTimeSeconds: 90,
        questionText: "Question 83 (Speaking Part 3): Provide analytical, balanced arguments addressing global environmental policy.",
        options: [
            { key: "A", text: "View argumentative connectors & linking phrases" },
            { key: "B", text: "Review Band 9 abstract vocabulary" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Skip to Writing Task 1" }
          ],
        correctAnswer: "C",
        explanation: "Tiêu chí chấm Part 3: Sử dụng cấu trúc câu phức, câu điều kiện loại 2/3, nhượng bộ ('While economic expansion is paramount for poverty alleviation, unchecked industrialization risks irreversible ecological degradation...')."
      });

      // IELTS WRITING AI (Q84 - Q85: TASK 1 & TASK 2)
      qs.push({
        id: "ia4k_q84",
        partNumber: 11,
        partTitle: "IELTS Writing Task 1: Academic Report (Visual Data)",
        section: "WRITING",
        writingPrompt: "The bar chart compares renewable energy generation (in Terawatt-hours, TWh) across four nations—Germany, China, the United States, and Brazil—between 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Suggested time: 20 minutes).",
        minWordCount: 150,
        sampleEssay: "The bar chart illustrates the volume of renewable electricity generated, measured in Terawatt-hours (TWh), across four distinct nations—Germany, China, the United States, and Brazil—over a ten-year timeframe spanning from 2015 to 2025.\n\nOverall, renewable energy output witnessed an upward trajectory in all four surveyed countries throughout the decade. China established an overwhelming dominance by generating the highest volume by a substantial margin, whereas Germany recorded the lowest absolute generation figures despite steady expansion.\n\nIn 2015, China led the group with approximately 500 TWh of renewable electricity, followed by the United States at roughly 350 TWh. Brazil and Germany generated considerably smaller amounts, at 220 TWh and 140 TWh respectively. Over the subsequent decade, China experienced exponential growth, tripling its output to reach a staggering 1,500 TWh by 2025.\n\nThe United States also demonstrated robust growth, nearly doubling its generation to approximately 680 TWh in 2025. In contrast, Brazil's renewable production expanded moderately to 380 TWh, while Germany's output climbed to 290 TWh by the end of the period.",
        questionText: "Question 84 (Writing Task 1): Write an academic report summarizing renewable energy trends (min 150 words).",
        options: [
            { key: "A", text: "Check Task Achievement & Overview paragraph" },
            { key: "B", text: "Analyze data grouping & comparative structures" },
            { key: "C", text: "Skip to Task 2" },
            { key: "D", text: "Submit Report for AI Band Evaluation" }
          ],
        correctAnswer: "D",
        explanation: "Gemini AI chấm điểm 4 tiêu chí Cambridge: Task Achievement (Có đoạn Overview rõ ràng, nhóm số liệu hợp lý), Coherence & Cohesion (Dùng từ nối 'Overall', 'In contrast', 'whereas'), Lexical Resource (Từ vựng học thuật 'upward trajectory', 'exponential growth'), Grammatical Accuracy (Đa dạng cấu trúc phân từ, thì quá khứ hoàn chỉnh)."
      });

      qs.push({
        id: "ia4k_q85",
        partNumber: 12,
        partTitle: "IELTS Writing Task 2: Academic Discursive Essay",
        section: "WRITING",
        writingPrompt: "Some people argue that tertiary education should be fully funded by national governments and made accessible free of charge to all citizens. Others believe that university students should pay tuition fees because higher education primarily benefits the individual rather than society as a whole. Discuss both views and give your own opinion. (Write at least 250 words. Suggested time: 40 minutes).",
        minWordCount: 250,
        sampleEssay: "The question of whether university education should be entirely state-funded or financed through individual tuition fees remains a fiercely contested debate in contemporary socioeconomic policy. While proponents of fee-paying models argue that higher education primarily confers private economic returns upon graduates, I firmly advocate that universal, tuition-free tertiary education constitutes a vital public good that accelerates national prosperity and dismantles generational inequality.\n\nOn the one hand, advocates of tuition-based systems contend that higher education yields substantial private financial dividends. Empirically, university graduates command significantly higher lifetime earnings, lower unemployment rates, and greater career mobility compared to non-graduates. Consequently, critics argue that using general taxpayer revenues—contributed by all citizens, including working-class individuals who may not attend university—to subsidize degree programs represents an inequitable transfer of wealth. Furthermore, charging tuition ensures that academic institutions maintain financial autonomy and can invest in world-class research infrastructure and competitive faculty salaries.\n\nOn the other hand, universal free higher education generates profound societal externalities that far outweigh individual advantages. A highly educated workforce forms the bedrock of modern knowledge economies, driving innovation in medicine, engineering, scientific research, and technological development. When financial barriers to university admission are eradicated, meritocratic social mobility is democratized, enabling talented individuals from socioeconomically disadvantaged backgrounds to realize their potential without the debilitating burden of student loan debt. Countries such as Germany and Norway demonstrate that publicly funded higher education fosters robust technological competitiveness, civic engagement, and social cohesion.\n\nIn conclusion, while individual graduates undeniably reap private career benefits from tertiary degrees, the collective socioeconomic rewards of a universally educated populace are vastly superior. Governments should therefore treat higher education as a foundational public investment, ensuring that access is determined by intellectual aptitude rather than financial privilege.",
        questionText: "Question 85 (Writing Task 2): Write a comprehensive discursive essay (min 250 words) on state-funded versus tuition-based university education.",
        options: [
            { key: "A", text: "Submit Essay for AI Evaluation" },
            { key: "B", text: "Check 4-Paragraph Academic Structure" },
            { key: "C", text: "Review CEFR C2 academic vocabulary" },
            { key: "D", text: "Complete Full IELTS Exam" }
          ],
        correctAnswer: "A",
        explanation: "Bài luận Band 9.0 mẫu chuẩn Cambridge đáp ứng hoàn hảo: Mở bài nêu rõ cả 2 quan điểm + quan điểm cá nhân, 2 đoạn thân bài phân tích sâu sắc các chiều hướng kinh tế - xã hội, kết bài khẳng định giáo dục đại học là 'foundational public investment'."
      });

      return qs;
    })()
  };
