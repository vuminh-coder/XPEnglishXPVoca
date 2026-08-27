import { ExamPaper, ExamQuestion } from "./types";

export const ieltsAcademic4k02Paper: ExamPaper = {
    id: "ielts_academic_4k_02",
    title: "IELTS Academic Official Test #02 (4-Skills)",
    type: "IELTS_FULL",
    level: "Advanced",
    timeLimitMinutes: 175,
    totalQuestions: 85,
    maxScore: 9.0,
    description: "Bộ đề thi IELTS Academic Test #02 chuẩn Cambridge gồm 40 câu Listening, 40 câu Reading, Speaking AI 3 Part và 2 Writing Tasks.",
    categoryBadge: "IELTS Academic",
    tags: ["IELTS", "Cambridge", "Test 02", "Academic", "Band 9.0 Standard"],
    supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
    questions: (() => {
      const qs: ExamQuestion[] = [];

      // SECTION 1: Community Sports Center Membership Registration (Q1 - Q10)
      const sec1Script = "Staff: Good morning, Westside Community Sports Complex. How may I assist you today?\nCustomer: Hello, I recently moved to the district and would like to inquire about enrolling in an annual fitness membership.\nStaff: Welcome! Let me record your registration details. What is your full legal name?\nCustomer: My name is Claire Thornton.\nStaff: Claire Thornton. And your contact telephone number?\nCustomer: It's 07700 900421.\nStaff: Thank you. Which membership tier are you interested in: Gold All-Access, Silver Gym & Pool, or Off-Peak Daytime?\nCustomer: I would like the Gold All-Access tier, which includes the Olympic swimming pool, tennis courts, and fitness classes.\nStaff: Excellent. The monthly fee for Gold All-Access is 65 pounds, with no contract lock-in. We are currently running a promotion where the 30-pound initial induction fee is completely waived if you sign up before Friday.\nCustomer: That's great! Are lockers provided in the changing rooms?\nStaff: Yes, digital keycard lockers are complimentary. Induction tours run daily at 10:00 AM and 4:00 PM.\nCustomer: Wonderful, I will attend the 10:00 AM session tomorrow.";

      const sec1Questions = [
        { q: "What is the customer's full name?", opts: [{ key: "A", text: "Sarah Mitchell" }, { key: "B", text: "Claire Thornton" }, { key: "C", text: "Eleanor Rossi" }, { key: "D", text: "Laura Campbell" }], a: "B", exp: "Họ tên: 'My name is Claire Thornton'." },
        { q: "What is Claire's telephone contact number?", opts: [{ key: "A", text: "07700 800312" }, { key: "B", text: "07700 552100" }, { key: "C", text: "07700 900421" }, { key: "D", text: "07700 123456" }], a: "C", exp: "Số điện thoại: 'It's 07700 900421'." },
        { q: "Which membership tier did Claire select?", opts: [{ key: "A", text: "Bronze Basic" }, { key: "B", text: "Silver Gym & Pool" }, { key: "C", text: "Off-Peak Daytime" }, { key: "D", text: "Gold All-Access" }], a: "D", exp: "Gói tập: 'Gold All-Access tier'." },
        { q: "How much is the monthly fee for the Gold tier?", opts: [{ key: "A", text: "65 pounds" }, { key: "B", text: "45 pounds" }, { key: "C", text: "55 pounds" }, { key: "D", text: "85 pounds" }], a: "A", exp: "Học phí hàng tháng: 'monthly fee for Gold All-Access is 65 pounds'." },
        { q: "What fee is waived if she joins before Friday?", opts: [{ key: "A", text: "Monthly membership fee" }, { key: "B", text: "The 30-pound initial induction fee" }, { key: "C", text: "Locker rental charge" }, { key: "D", text: "Parking pass fee" }], a: "B", exp: "Phí được miễn: '30-pound initial induction fee is completely waived'." },
        { q: "What facilities are included in Gold All-Access?", opts: [{ key: "A", text: "Sauna and golf course only" }, { key: "B", text: "Gym floor only" }, { key: "C", text: "Pool, tennis courts, and fitness classes" }, { key: "D", text: "Personal trainer 5 times a week" }], a: "C", exp: "Tiện ích: 'Olympic swimming pool, tennis courts, and fitness classes'." },
        { q: "How do lockers operate in the changing rooms?", opts: [{ key: "A", text: "Coin padlocks" }, { key: "B", text: "Combination dial locks" }, { key: "C", text: "Manual brass keys" }, { key: "D", text: "Digital keycard lockers" }], a: "D", exp: "Tủ đồ: 'digital keycard lockers are complimentary'." },
        { q: "When do facility induction tours take place daily?", opts: [{ key: "A", text: "10:00 AM and 4:00 PM" }, { key: "B", text: "8:00 AM and 12:00 PM" }, { key: "C", text: "1:00 PM and 6:00 PM" }, { key: "D", text: "Every hour on the hour" }], a: "A", exp: "Giờ tham quan hướng dẫn: 'daily at 10:00 AM and 4:00 PM'." },
        { q: "Which induction tour session will Claire attend?", opts: [{ key: "A", text: "4:00 PM tomorrow" }, { key: "B", text: "10:00 AM tomorrow" }, { key: "C", text: "Friday morning" }, { key: "D", text: "Saturday afternoon" }], a: "B", exp: "Phiên tham dự: 'attend the 10:00 AM session tomorrow'." },
        { q: "Is there a long-term contract requirement?", opts: [{ key: "A", text: "Yes, 12-month minimum" }, { key: "B", text: "Yes, 24-month agreement" }, { key: "C", text: "No contract lock-in" }, { key: "D", text: "Requires a 6-month prepayment" }], a: "C", exp: "Hợp đồng: 'with no contract lock-in'." }
      ];

      sec1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 1}`,
          partNumber: 1,
          partTitle: "Listening Section 1: Sports Center Membership",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
          questionText: `Question ${idx + 1}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 2: Maritime Museum Audio Tour (Q11 - Q20)
      const sec2Script = "Curator: Welcome to the Maritime Heritage Museum of Portsmouth. I am Dr. Julian Thorne, Chief Curator. Today, we are opening our newly restored exhibition wing dedicated to eighteenth-century oceanic navigation. The central artifact in Gallery 1 is the original 1761 marine chronometer crafted by clockmaker John Harrison, which solved the longitude determination problem at sea. In Gallery 2, visitors can explore the reconstructed wooden galley of the HMS Endurance, featuring interactive touch displays showing sailor rations and nautical knots. The children's shipbuilding workshop is located in the South Pavilion. Please note that the open-air lighthouse viewing deck is closed today due to high coastal gale warnings. Audio headsets are available at the entrance in six languages for 3 pounds. The museum cafe on Floor 2 serves seafood lunches from 11:30 AM to 2:30 PM.";

      const sec2Questions = [
        { q: "Who crafted the 1761 marine chronometer displayed in Gallery 1?", opts: [{ key: "A", text: "James Watt" }, { key: "B", text: "Arthur Pendelton" }, { key: "C", text: "Samuel Crompton" }, { key: "D", text: "John Harrison" }], a: "D", exp: "Thợ đồng hồ chế tác: 'crafted by clockmaker John Harrison'." },
        { q: "What historical navigation problem did Harrison's chronometer solve?", opts: [{ key: "A", text: "Determining longitude at sea" }, { key: "B", text: "Determining ship latitude" }, { key: "C", text: "Measuring ocean depth" }, { key: "D", text: "Predicting stormy tides" }], a: "A", exp: "Vấn đề hàng hải: 'solved the longitude determination problem at sea'." },
        { q: "Which vessel's galley is reconstructed in Gallery 2?", opts: [{ key: "A", text: "HMS Victory" }, { key: "B", text: "HMS Endurance" }, { key: "C", text: "HMS Beagle" }, { key: "D", text: "HMS Discovery" }], a: "B", exp: "Tên tàu: 'reconstructed wooden galley of the HMS Endurance'." },
        { q: "Where is the children's shipbuilding workshop located?", opts: [{ key: "A", text: "Main Foyer" }, { key: "B", text: "Gallery 3" }, { key: "C", text: "South Pavilion" }, { key: "D", text: "Basement Lab" }], a: "C", exp: "Vị trí xưởng cho trẻ em: 'located in the South Pavilion'." },
        { q: "Why is the lighthouse viewing deck closed today?", opts: [{ key: "A", text: "Painting renovations" }, { key: "B", text: "Lighting repairs" }, { key: "C", text: "Private VIP reception" }, { key: "D", text: "High coastal gale warnings" }], a: "D", exp: "Lý do đóng cửa đài quan sát hải đăng: 'due to high coastal gale warnings'." },
        { q: "How much does audio guide rental cost?", opts: [{ key: "A", text: "3 pounds" }, { key: "B", text: "1 pound" }, { key: "C", text: "5 pounds" }, { key: "D", text: "Free" }], a: "A", exp: "Phí thuê tai nghe: 'available at the entrance in six languages for 3 pounds'." },
        { q: "Where is the museum cafe situated?", opts: [{ key: "A", text: "Ground Floor Foyer" }, { key: "B", text: "Floor 2" }, { key: "C", text: "Basement Pavilion" }, { key: "D", text: "South Courtyard" }], a: "B", exp: "Vị trí quán cafe: 'museum cafe on Floor 2'." },
        { q: "What are the cafe lunch operating hours?", opts: [{ key: "A", text: "10:00 AM - 1:00 PM" }, { key: "B", text: "12:00 PM - 3:00 PM" }, { key: "C", text: "11:30 AM - 2:30 PM" }, { key: "D", text: "All day until closing" }], a: "C", exp: "Giờ phục vụ ăn trưa: 'from 11:30 AM to 2:30 PM'." },
        { q: "What century does the featured exhibition wing focus on?", opts: [{ key: "A", text: "Sixteenth century" }, { key: "B", text: "Nineteenth century" }, { key: "C", text: "Twentieth century" }, { key: "D", text: "Eighteenth century" }], a: "D", exp: "Thế kỷ trọng tâm: 'eighteenth-century oceanic navigation'." },
        { q: "What is Dr. Julian Thorne's role?", opts: [{ key: "A", text: "Chief Curator" }, { key: "B", text: "Museum Security Chief" }, { key: "C", text: "Tour Bus Coordinator" }, { key: "D", text: "Gift Shop Manager" }], a: "A", exp: "Chức vụ: 'Dr. Julian Thorne, Chief Curator'." }
      ];

      sec2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 11}`,
          partNumber: 2,
          partTitle: "Listening Section 2: Maritime Museum Tour",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
          questionText: `Question ${idx + 11}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 3: Postgraduate Research on Urban Microclimate Heat Islands (Q21 - Q30)
      const sec3Script = "Supervisor: Good afternoon, Hannah and Oliver. Let's discuss your field study methodology for investigating urban heat islands across metropolitan London.\nHannah: Thank you, Dr. Watson. We have deployed thirty digital thermistor sensors across three distinct urban typology zones: high-density commercial skyscrapers in the City of London, mid-density residential brick terrace housing in Islington, and vegetative suburban parkland in Richmond.\nOliver: Our preliminary summer datasets indicate that surface temperatures in commercial high-rise corridors average 6.2 degrees Celsius higher at midnight compared to the baseline parkland in Richmond, primarily due to concrete thermal inertia and waste heat from air conditioning condensers.\nSupervisor: Those are striking figures. However, have you accounted for wind corridor effects along the Thames River?\nHannah: We installed five sonic anemometers along the riverbanks to calibrate our convective cooling models.\nSupervisor: Excellent. Be sure to submit your comparative geospatial regression analysis by December 1st.";

      const sec3Questions = [
        { q: "How many temperature sensors were deployed across London?", opts: [{ key: "A", text: "Ten sensors" }, { key: "B", text: "Thirty sensors" }, { key: "C", text: "Twenty sensors" }, { key: "D", text: "Fifty sensors" }], a: "B", exp: "Số lượng cảm biến: 'deployed thirty digital thermistor sensors'." },
        { q: "What are the three study typology zones?", opts: [{ key: "A", text: "Industrial, farming, and coastal" }, { key: "B", text: "Subways, airports, and train stations" }, { key: "C", text: "Commercial skyscrapers, residential brick terraces, and suburban parkland" }, { key: "D", text: "Shopping malls, parking lots, and schools" }], a: "C", exp: "3 khu vực: 'high-density commercial skyscrapers, residential brick terraces, and vegetative suburban parkland'." },
        { q: "How much hotter were commercial high-rise corridors at midnight compared to Richmond?", opts: [{ key: "A", text: "2.5 degrees Celsius" }, { key: "B", text: "4.0 degrees Celsius" }, { key: "C", text: "8.5 degrees Celsius" }, { key: "D", text: "6.2 degrees Celsius" }], a: "D", exp: "Chênh lệch nhiệt độ đêm: 'average 6.2 degrees Celsius higher at midnight'." },
        { q: "What two main factors caused this elevated heat retention?", opts: [{ key: "A", text: "Concrete thermal inertia and AC condenser waste heat" }, { key: "B", text: "Car exhaust and street lamps" }, { key: "C", text: "High pedestrian density and asphalt painting" }, { key: "D", text: "Underground subway train vibrations" }], a: "A", exp: "Nguyên nhân nhiệt: 'concrete thermal inertia and waste heat from air conditioning condensers'." },
        { q: "What riverfront environmental factor did Dr. Watson question?", opts: [{ key: "A", text: "River water salinity" }, { key: "B", text: "Wind corridor effects along the Thames River" }, { key: "C", text: "Tidal flood surges" }, { key: "D", text: "Boat engine emissions" }], a: "B", exp: "Yếu tố cần hiệu chỉnh: 'accounted for wind corridor effects along the Thames River'." },
        { q: "What instrument did the students install to measure wind vectors?", opts: [{ key: "A", text: "Barometers" }, { key: "B", text: "Laser Doppler radars" }, { key: "C", text: "Sonic anemometers" }, { key: "D", text: "Hydrometers" }], a: "C", exp: "Dụng cụ đo gió: 'installed five sonic anemometers along the riverbanks'." },
        { q: "How many anemometers were placed along the riverbanks?", opts: [{ key: "A", text: "Two" }, { key: "B", text: "Three" }, { key: "C", text: "Ten" }, { key: "D", text: "Five" }], a: "D", exp: "Số lượng máy đo gió: 'five sonic anemometers'." },
        { q: "What analytical method must be included in the final report?", opts: [{ key: "A", text: "Geospatial regression analysis" }, { key: "B", text: "Simple questionnaire survey" }, { key: "C", text: "Laboratory chemical titration" }, { key: "D", text: "DNA sequencing" }], a: "A", exp: "Phương pháp phân tích: 'comparative geospatial regression analysis'." },
        { q: "What is the project submission deadline?", opts: [{ key: "A", text: "November 15th" }, { key: "B", text: "December 1st" }, { key: "C", text: "December 15th" }, { key: "D", text: "January 10th" }], a: "B", exp: "Hạn nộp: 'submit your comparative geospatial regression analysis by December 1st'." },
        { q: "Which suburban area served as the baseline green reference?", opts: [{ key: "A", text: "Islington" }, { key: "B", text: "City of London" }, { key: "C", text: "Richmond parkland" }, { key: "D", text: "Greenwich" }], a: "C", exp: "Khu vực đối chứng xanh: 'baseline parkland in Richmond'." }
      ];

      sec3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 21}`,
          partNumber: 3,
          partTitle: "Listening Section 3: Urban Heat Islands",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
          passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
          questionText: `Question ${idx + 21}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 4: University Lecture on Behavioral Ecology of Cetacean Echolocation (Q31 - Q40)
      const sec4Script = "Lecturer: Good morning, class. Today's lecture explores the neurobiology and evolutionary biomechanics of biosonar and echolocation in odontocetes—the toothed whales, dolphins, and porpoises. Unlike terrestrial mammals that rely predominantly on optical vision, odontocetes inhabit turbid and aphotic marine environments where light attenuates rapidly within the first 200 meters of depth. To navigate and hunt pelagic prey, dolphins generate high-frequency ultrasonic clicks within their phonic lips, located in the nasal passages beneath the blowhole. These acoustic impulses, spanning frequencies between 40 and 150 kilohertz, are focused through the melon—a specialized lipid-rich acoustic lens on the forehead—into a directional acoustic beam. Returning echoes reflecting off prey are received through the fat-filled acoustic channels of the lower jaw and transmitted directly to the auditory bulla and auditory cortex. Anthropogenic ocean noise pollution, including military low-frequency sonar and maritime seismic airguns, disrupts this delicate echolocation system, frequently causing severe acoustic trauma and mass stranding events.";

      const sec4Questions = [
        { q: "What mammalian group possesses biosonar echolocation?", opts: [{ key: "A", text: "Baleen mysticetes" }, { key: "B", text: "Marine pinnipeds (seals)" }, { key: "C", text: "Sirenians (manatees)" }, { key: "D", text: "Odontocetes (toothed whales, dolphins, porpoises)" }], a: "D", exp: "Nhóm thú biển: 'odontocetes—the toothed whales, dolphins, and porpoises'." },
        { q: "Why is optical vision insufficient for deep-sea odontocetes?", opts: [{ key: "A", text: "Light attenuates rapidly in turbid/aphotic waters beyond 200m" }, { key: "B", text: "They lack retinas" }, { key: "C", text: "Their eyes are covered by thick scales" }, { key: "D", text: "They hunt exclusively in daylight surface waters" }], a: "A", exp: "Lý do thị giác bị hạn chế: 'light attenuates rapidly within the first 200 meters of depth'." },
        { q: "Where are ultrasonic clicks produced in dolphins?", opts: [{ key: "A", text: "In the vocal cords inside the throat" }, { key: "B", text: "In the phonic lips beneath the blowhole" }, { key: "C", text: "In the stomach cavity" }, { key: "D", text: "By slapping their tail flukes" }], a: "B", exp: "Nơi phát âm siêu âm: 'within their phonic lips, located in the nasal passages beneath the blowhole'." },
        { q: "What frequency range do dolphin echolocation clicks span?", opts: [{ key: "A", text: "1 to 5 kHz" }, { key: "B", text: "10 to 20 kHz" }, { key: "C", text: "40 to 150 kilohertz" }, { key: "D", text: "500 to 1000 kHz" }], a: "C", exp: "Tần số: 'frequencies between 40 and 150 kilohertz'." },
        { q: "What is the biological function of the 'melon' structure?", opts: [{ key: "A", text: "Digestive organ for fat storage" }, { key: "B", text: "Buoyancy regulation float" }, { key: "C", text: "Protective helmet against shark bites" }, { key: "D", text: "Lipid-rich acoustic lens that focuses sound into a directional beam" }], a: "D", exp: "Chức năng của melon: 'specialized lipid-rich acoustic lens on the forehead—into a directional acoustic beam'." },
        { q: "How are returning acoustic echoes received by the dolphin?", opts: [{ key: "A", text: "Through fat-filled acoustic channels in the lower jaw" }, { key: "B", text: "Through large external ears" }, { key: "C", text: "Through the skin of the pectoral fins" }, { key: "D", text: "Through the blowhole" }], a: "A", exp: "Cơ chế thu âm phản hồi: 'received through the fat-filled acoustic channels of the lower jaw'." },
        { q: "What human activities disrupt cetacean echolocation systems?", opts: [{ key: "A", text: "Plastic recycling and wind energy" }, { key: "B", text: "Military sonar and seismic airgun surveys" }, { key: "C", text: "Snorkeling and scuba diving" }, { key: "D", text: "Sailing regattas" }], a: "B", exp: "Ô nhiễm tiếng ồn nhân tạo: 'military low-frequency sonar and maritime seismic airguns'." },
        { q: "What severe ecological consequence results from sonar disruption?", opts: [{ key: "A", text: "Accelerated reproduction" }, { key: "B", text: "Transition to freshwater lakes" }, { key: "C", text: "Acoustic trauma and mass stranding events" }, { key: "D", text: "Loss of body pigmentation" }], a: "C", exp: "Hậu quả nghiêm trọng: 'acoustic trauma and mass stranding events'." },
        { q: "What part of the brain processes auditory echolocation signals?", opts: [{ key: "A", text: "Optic lobe" }, { key: "B", text: "Olfactory bulb" }, { key: "C", text: "Spinal cord" }, { key: "D", text: "Auditory cortex" }], a: "D", exp: "Vùng não xử lý: 'transmitted directly to the auditory bulla and auditory cortex'." },
        { q: "What is the primary scientific field of this lecture?", opts: [{ key: "A", text: "Neurobiology and evolutionary marine biomechanics" }, { key: "B", text: "Industrial manufacturing" }, { key: "C", text: "Atmospheric meteorology" }, { key: "D", text: "Quantum computing" }], a: "A", exp: "Chuyên ngành khoa học: 'neurobiology and evolutionary biomechanics of biosonar'." }
      ];

      sec4Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 31}`,
          partNumber: 4,
          partTitle: "Listening Section 4: Cetacean Echolocation",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
          passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
          questionText: `Question ${idx + 31}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // READING PASSAGE 1: Quantum Computing in Molecular Drug Discovery (Q41 - Q53: 13 Questions)
      const readP1 = `READING PASSAGE 1 — QUANTUM COMPUTING IN MOLECULAR DRUG DISCOVERY\n\nThe synthesis and clinical validation of novel pharmaceutical compounds has traditionally been one of the most resource-intensive endeavors in modern science, averaging 12 to 15 years and exceeding $2.6 billion per approved drug. A fundamental bottleneck in rational drug design lies in the sheer computational intractability of classical supercomputers when simulating quantum mechanical interactions among complex biomolecules. Because the electron orbitals of a single protein-ligand binding complex scale exponentially with atomic count, classical algorithms must rely on crude classical approximations, frequently failing to predict binding affinities or metabolic toxicity accurately.\n\nQuantum computing harnesses the principles of superposition and quantum entanglement to overcome these limitations. By utilizing quantum bits (qubits) capable of existing in simultaneous states of 0 and 1, quantum algorithms such as the Variational Quantum Eigensolver (VQE) can simulate the electronic wavefunctions of multi-atomic molecules with unprecedented precision. In 2025, researchers at the European Center for Quantum Biology demonstrated that a 128-logical-qubit quantum processor successfully mapped the catalytic active site of human coronavirus proteases in under four hours—a computation estimated to require 800 years on conventional silicon-based supercomputing clusters.\n\nFurthermore, quantum-assisted generative machine learning models are accelerating the de novo generation of synthetic small molecules tailored to fit complex oncological targets. Pharmaceutical giants including Novartis and Roche have established dedicated quantum computing divisions, forecasting a 50 percent compression in preclinical lead optimization timelines by 2030. However, substantial technical hurdles remain, notably quantum decoherence caused by thermal noise and the requirement for fault-tolerant surface code error correction operating near absolute zero (-273.15 degrees Celsius).`;

      const r1Questions = [
        { q: "What is the average development cost for a single approved drug using traditional methods?", opts: [{ key: "A", text: "$500 million" }, { key: "B", text: "Exceeding $2.6 billion" }, { key: "C", text: "$1.2 billion" }, { key: "D", text: "$5.0 billion" }], a: "B", exp: "Đoạn 1: 'exceeding $2.6 billion per approved drug'." },
        { q: "How long does traditional clinical drug development typically take?", opts: [{ key: "A", text: "3 to 5 years" }, { key: "B", text: "6 to 8 years" }, { key: "C", text: "12 to 15 years" }, { key: "D", text: "20 to 25 years" }], a: "C", exp: "Đoạn 1: 'averaging 12 to 15 years'." },
        { q: "Why do classical supercomputers struggle with molecular simulation?", opts: [{ key: "A", text: "Lack of electrical power" }, { key: "B", text: "Inability to read digital files" }, { key: "C", text: "Shortage of computer monitors" }, { key: "D", text: "Electron orbital quantum interactions scale exponentially with atomic count" }], a: "D", exp: "Đoạn 1: 'electron orbitals of a single protein-ligand binding complex scale exponentially with atomic count'." },
        { q: "What two quantum physics principles enable quantum computational advantages?", opts: [{ key: "A", text: "Superposition and quantum entanglement" }, { key: "B", text: "Gravity and magnetic friction" }, { key: "C", text: "Thermodynamic convection and radiation" }, { key: "D", text: "Centrifugal force and inertia" }], a: "A", exp: "Đoạn 2: 'harnesses the principles of superposition and quantum entanglement'." },
        { q: "What algorithm is mentioned for molecular electronic wavefunction simulation?", opts: [{ key: "A", text: "Dijkstra's Shortest Path" }, { key: "B", text: "Variational Quantum Eigensolver (VQE)" }, { key: "C", text: "Binary Search Tree" }, { key: "D", text: "QuickSort Algorithm" }], a: "B", exp: "Đoạn 2: 'Variational Quantum Eigensolver (VQE)'." },
        { q: "How long did the 128-qubit processor take to map the protease active site?", opts: [{ key: "A", text: "Four minutes" }, { key: "B", text: "Four days" }, { key: "C", text: "Under four hours" }, { key: "D", text: "Four weeks" }], a: "C", exp: "Đoạn 2: 'mapped the catalytic active site... in under four hours'." },
        { q: "How long would the same computation take on a classical supercomputer cluster?", opts: [{ key: "A", text: "10 years" }, { key: "B", text: "50 years" }, { key: "C", text: "100 years" }, { key: "D", text: "800 years" }], a: "D", exp: "Đoạn 2: 'estimated to require 800 years on conventional silicon-based supercomputing clusters'." },
        { q: "What reduction in preclinical lead optimization timelines is forecasted by 2030?", opts: [{ key: "A", text: "50 percent compression" }, { key: "B", text: "10 percent" }, { key: "C", text: "25 percent" }, { key: "D", text: "90 percent" }], a: "A", exp: "Đoạn 3: 'forecasting a 50 percent compression in preclinical lead optimization timelines'." },
        { q: "What physical operating temperature is required for current superconducting quantum chips?", opts: [{ key: "A", text: "Room temperature (25°C)" }, { key: "B", text: "Near absolute zero (-273.15°C)" }, { key: "C", text: "Freezing point (0°C)" }, { key: "D", text: "-50°C" }], a: "B", exp: "Đoạn 3: 'operating near absolute zero (-273.15 degrees Celsius)'." },
        { q: "What primary technical challenge is caused by thermal environmental noise?", opts: [{ key: "A", text: "Battery explosion" }, { key: "B", text: "Screen flicker" }, { key: "C", text: "Quantum decoherence" }, { key: "D", text: "Software virus infection" }], a: "C", exp: "Đoạn 3: 'quantum decoherence caused by thermal noise'." },
        { q: "What is de novo molecular design?", opts: [{ key: "A", text: "Extracting herbal teas from wild plants" }, { key: "B", text: "Copying expired generic patents" }, { key: "C", text: "Testing cosmetics on animal skin" }, { key: "D", text: "Designing entirely new synthetic molecules from computational scratch" }], a: "D", exp: "Đoạn 3: Thiết kế cấu trúc phân tử nhân tạo mới từ đầu để vừa khít thụ thể bệnh." },
        { q: "Which two pharmaceutical corporations are cited as leaders in quantum division setup?", opts: [{ key: "A", text: "Novartis and Roche" }, { key: "B", text: "Pfizer and Moderna" }, { key: "C", text: "AstraZeneca and Bayer" }, { key: "D", text: "Johnson & Johnson and Merck" }], a: "A", exp: "Đoạn 3: 'Pharmaceutical giants including Novartis and Roche'." },
        { q: "What is the overall tone of the article?", opts: [{ key: "A", text: "Skeptical and dismissive" }, { key: "B", text: "Scientific, enthusiastic yet grounded in technical realities" }, { key: "C", text: "Commercially sensational" }, { key: "D", text: "Strictly historical" }], a: "B", exp: "Văn phong học thuật, lạc quan về triển vọng nhưng chỉ rõ rào cản kỹ thuật." }
      ];

      r1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 41}`,
          partNumber: 5,
          partTitle: "Reading Passage 1: Quantum Drug Discovery",
          section: "READING",
          passageText: readP1,
          questionText: `Question ${idx + 41}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // READING PASSAGE 2 & 3 + SPEAKING & WRITING for Test #02
      // PASSAGE 2: Gothic Cathedral Engineering (Q54 - Q66: 13 Questions)
      const readP2 = `READING PASSAGE 2 — THE STRUCTURAL ARCHITECTURE OF GOTHIC CATHEDRALS\n\nThe transition from Romanesque to Gothic architecture in twelfth-century northern France represented one of the most audacious structural engineering achievements in human history. Master builders sought to transcend the massive, fortress-like stone walls and dim interiors of Romanesque basilicas, striving instead for soaring verticality and walls dissolved into expansive, luminous stained-glass clerestories.\n\nThis architectural revolution was made possible by three interdependent structural innovations: the pointed arch, the ribbed vault, and the external flying buttress. The pointed arch distributed compressive gravity loads more vertically than semicircular Roman arches, dramatically reducing outward lateral thrust. The quadripartite and sexpartite ribbed vault acted as a skeletal stone framework that channeled the deadweight of ceiling masonry onto discrete structural piers rather than continuous supporting walls.\n\nHowever, as cathedral vaults reached dizzying heights—such as 37 meters at Chartres and 48 meters at Beauvais—the remaining lateral wind and vault thrusts threatened catastrophic outward wall buckling. The flying buttress resolved this by bridging high-altitude lateral forces outward across open air to massive exterior masonry piers anchored away from the building. Laser scanning of Notre-Dame de Paris has revealed how medieval masons pre-tensioned these buttresses with decorative stone pinnacles, whose vertical weight stabilized the structural vector downward into the foundation.`;

      const r2Questions = [
        { q: "Where did the Gothic architectural transition originate in the 12th century?", opts: [{ key: "A", text: "Southern Italy" }, { key: "B", text: "Eastern Germany" }, { key: "C", text: "Northern France" }, { key: "D", text: "Central Spain" }], a: "C", exp: "Đoạn 1: 'twelfth-century northern France'." },
        { q: "What visual effect did Gothic master builders seek to achieve?", opts: [{ key: "A", text: "Low, dark underground tombs" }, { key: "B", text: "Heavy, windowless military fortresses" }, { key: "C", text: "Spherical domed ceilings" }, { key: "D", text: "Soaring verticality and luminous stained-glass clerestories" }], a: "D", exp: "Đoạn 1: 'striving instead for soaring verticality and walls dissolved into expansive, luminous stained-glass clerestories'." },
        { q: "What are the three core structural innovations of Gothic architecture?", opts: [{ key: "A", text: "Pointed arch, ribbed vault, and external flying buttress" }, { key: "B", text: "Steel beams, concrete slabs, and elevators" }, { key: "C", text: "Doric columns, wooden rafters, and brick domes" }, { key: "D", text: "Suspension cables, arches, and glass pyramids" }], a: "A", exp: "Đoạn 2: 'pointed arch, the ribbed vault, and the external flying buttress'." },
        { q: "Why was the pointed arch superior to the semicircular Roman arch?", opts: [{ key: "A", text: "It used less stone" }, { key: "B", text: "It distributed loads more vertically, reducing lateral outward thrust" }, { key: "C", text: "It was easier to paint with frescoes" }, { key: "D", text: "It prevented rainwater leakage" }], a: "B", exp: "Đoạn 2: 'distributed compressive gravity loads more vertically... reducing outward lateral thrust'." },
        { q: "What was the function of the ribbed vault?", opts: [{ key: "A", text: "Served as a rainwater drainage channel" }, { key: "B", text: "Stored holy relics" }, { key: "C", text: "Channeled ceiling weight onto discrete piers rather than continuous walls" }, { key: "D", text: "Acted as an organ sound chamber" }], a: "C", exp: "Đoạn 2: 'channeled the deadweight of ceiling masonry onto discrete structural piers'." },
        { q: "What vault height was achieved at Beauvais Cathedral?", opts: [{ key: "A", text: "25 meters" }, { key: "B", text: "37 meters" }, { key: "C", text: "75 meters" }, { key: "D", text: "48 meters" }], a: "D", exp: "Đoạn 3: '48 meters at Beauvais'." },
        { q: "How did the flying buttress prevent high walls from buckling?", opts: [{ key: "A", text: "By bridging lateral forces across open air to external masonry piers" }, { key: "B", text: "By tying walls with iron chains" }, { key: "C", text: "By burying the walls underground" }, { key: "D", text: "By using wooden scaffolding permanently" }], a: "A", exp: "Đoạn 3: 'bridging high-altitude lateral forces outward across open air to massive exterior masonry piers'." },
        { q: "What was the structural purpose of decorative stone pinnacles on buttresses?", opts: [{ key: "A", text: "Lightning rod grounding" }, { key: "B", text: "Added vertical deadweight to stabilize force vectors downward" }, { key: "C", text: "Nesting towers for carrier pigeons" }, { key: "D", text: "Clock towers for prayer bells" }], a: "B", exp: "Đoạn 3: 'pre-tensioned these buttresses with decorative stone pinnacles, whose vertical weight stabilized the structural vector downward'." },
        { q: "What modern technology was used to study Notre-Dame's structural engineering?", opts: [{ key: "A", text: "Sonar ultrasound" }, { key: "B", text: "Satellite thermal photography" }, { key: "C", text: "3D Laser scanning" }, { key: "D", text: "Chemical core drilling" }], a: "C", exp: "Đoạn 3: 'Laser scanning of Notre-Dame de Paris has revealed'." },
        { q: "What architectural style preceded Gothic architecture?", opts: [{ key: "A", text: "Baroque" }, { key: "B", text: "Neoclassical" }, { key: "C", text: "Modernist" }, { key: "D", text: "Romanesque" }], a: "D", exp: "Đoạn 1: 'transition from Romanesque to Gothic architecture'." },
        { q: "What is a 'clerestory' in Gothic cathedral architecture?", opts: [{ key: "A", text: "High upper wall level containing stained-glass windows" }, { key: "B", text: "Underground burial crypt" }, { key: "C", text: "Priest's residential quarters" }, { key: "D", text: "Bell tower staircase" }], a: "A", exp: "Đoạn 1: Tầng tường cao trên cùng bố trí các ô cửa sổ kính màu lớn lấy ánh sáng." },
        { q: "What was the structural risk as cathedrals became taller?", opts: [{ key: "A", text: "Foundation liquefaction" }, { key: "B", text: "Outward wall buckling under wind and vault thrusts" }, { key: "C", text: "Roof freezing in winter" }, { key: "D", text: "Timber rot in the basement" }], a: "B", exp: "Đoạn 3: 'wind and vault thrusts threatened catastrophic outward wall buckling'." },
        { q: "What is the primary conclusion regarding medieval master masons?", opts: [{ key: "A", text: "They worked purely by random trial without calculation" }, { key: "B", text: "They strictly followed ancient Greek drawings without change" }, { key: "C", text: "They possessed sophisticated empirical understanding of static equilibrium and force vectors" }, { key: "D", text: "Their buildings all collapsed within a few decades" }], a: "C", exp: "Kết luận: Thợ xây thời Trung cổ có hiểu biết thực nghiệm xuất sắc về cân bằng tĩnh và vector lực." }
      ];

      r2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 54}`,
          partNumber: 6,
          partTitle: "Reading Passage 2: Gothic Cathedral Engineering",
          section: "READING",
          passageText: readP2,
          questionText: `Question ${idx + 54}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // PASSAGE 3: Archaeology of the Silk Road Maritime Spice Trade (Q67 - Q80: 14 Questions)
      const readP3 = `READING PASSAGE 3 — THE MARITIME SILK ROAD AND ANCIENT SPICE COMMERCE\n\nWhile popular historical consciousness frequently associates the ancient Silk Road with overland camel caravans traversing the arid steppes of Central Asia, maritime archaeological excavations over the past three decades have illuminated an equally monumental seafaring trade network. Spanning over 15,000 nautical miles from the bustling ports of Guangzhou and Quanzhou in southern China, through the treacherous Strait of Malacca, across the Indian Ocean to the Persian Gulf and Red Sea, the Maritime Silk Road facilitated the mass transit of bulk ceramics, raw silk, aromatic frankincense, and precious spices between the Han Dynasty (206 BCE – 220 CE) and the late Ming Dynasty (1368–1644 CE).\n\nThe discovery and excavation of the ninth-century Belitung Shipwreck off the coast of Sumatra in 1998 provided indisputable physical evidence of direct, trans-oceanic commercial voyaging between the Tang Dynasty and the Abbasid Caliphate in Baghdad. The vessel—an Arab dhow constructed entirely of stitched teak timbers without a single iron nail—carried an extraordinary cargo of over 60,000 pristine ceramic bowls from the Changsha kilns, exquisite gold wine cups, and blue-and-white porcelain crafted with cobalt imported from Persia.\n\nOceanographic navigational prowess was fundamentally synchronized with the seasonal Indian Ocean monsoon gyres. Between November and March, the northeast monsoon propelled merchant fleets westward from Southeast Asia toward India and the Arabian Peninsula; conversely, the southwest monsoon from May to September carried vessels eastward back to the South China Sea. Maritime entrepôts such as the Sultanate of Malacca and Sriwijaya flourished as cosmopolitan transshipment hubs, enforcing maritime safety, establishing standardized customs tariffs, and fostering cultural syncretism across Buddhist, Hindu, and Islamic maritime communities.`;

      const r3Questions = [
        { q: "How long was the Maritime Silk Road trade network?", opts: [{ key: "A", text: "5,000 nautical miles" }, { key: "B", text: "10,000 nautical miles" }, { key: "C", text: "25,000 nautical miles" }, { key: "D", text: "Over 15,000 nautical miles" }], a: "D", exp: "Đoạn 1: 'Spanning over 15,000 nautical miles'." },
        { q: "Which Chinese ports were major starting points for the maritime spice trade?", opts: [{ key: "A", text: "Guangzhou and Quanzhou" }, { key: "B", text: "Beijing and Xi'an" }, { key: "C", text: "Shanghai and Tianjin" }, { key: "D", text: "Harbin and Dalian" }], a: "A", exp: "Đoạn 1: 'ports of Guangzhou and Quanzhou in southern China'." },
        { q: "What famous ninth-century shipwreck was excavated in 1998 off Sumatra?", opts: [{ key: "A", text: "The Titanic" }, { key: "B", text: "The Belitung Shipwreck" }, { key: "C", text: "The Mary Rose" }, { key: "D", text: "The Vasa" }], a: "B", exp: "Đoạn 2: 'Belitung Shipwreck off the coast of Sumatra in 1998'." },
        { q: "What was remarkable about the construction of the Belitung vessel?", opts: [{ key: "A", text: "It had a steel hull" }, { key: "B", text: "It was powered by steam paddlewheels" }, { key: "C", text: "An Arab dhow built of stitched teak without a single iron nail" }, { key: "D", text: "It was carved from a single hollowed tree trunk" }], a: "C", exp: "Đoạn 2: 'Arab dhow constructed entirely of stitched teak timbers without a single iron nail'." },
        { q: "How many Tang Dynasty ceramic bowls were recovered from the Belitung wreck?", opts: [{ key: "A", text: "6,000 bowls" }, { key: "B", text: "20,000 bowls" }, { key: "C", text: "100,000 bowls" }, { key: "D", text: "Over 60,000 pristine ceramic bowls" }], a: "D", exp: "Đoạn 2: 'cargo of over 60,000 pristine ceramic bowls from the Changsha kilns'." },
        { q: "Where was the cobalt used in Chinese blue-and-white porcelain imported from?", opts: [{ key: "A", text: "Persia" }, { key: "B", text: "Japan" }, { key: "C", text: "Egypt" }, { key: "D", text: "India" }], a: "A", exp: "Đoạn 2: 'cobalt imported from Persia'." },
        { q: "How did ancient mariners time their ocean voyages across the Indian Ocean?", opts: [{ key: "A", text: "Using diesel motors" }, { key: "B", text: "Synchronizing with seasonal monsoon wind gyres" }, { key: "C", text: "Following migratory whales exclusively" }, { key: "D", text: "Waiting for calm windless waters" }], a: "B", exp: "Đoạn 3: 'synchronized with the seasonal Indian Ocean monsoon gyres'." },
        { q: "Which monsoon winds carried merchant ships westward toward Arabia?", opts: [{ key: "A", text: "Southwest monsoon (May - September)" }, { key: "B", text: "Pacific trade winds" }, { key: "C", text: "Northeast monsoon (November - March)" }, { key: "D", text: "Polar easterlies" }], a: "C", exp: "Đoạn 3: 'Between November and March, the northeast monsoon propelled merchant fleets westward'." },
        { q: "Which kingdom served as a major maritime transshipment entrepôt in Southeast Asia?", opts: [{ key: "A", text: "The Roman Empire" }, { key: "B", text: "The Aztec Empire" }, { key: "C", text: "The Viking Confederation" }, { key: "D", text: "Sriwijaya and the Sultanate of Malacca" }], a: "D", exp: "Đoạn 3: 'Sultanate of Malacca and Sriwijaya flourished as cosmopolitan transshipment hubs'." },
        { q: "What cargo items were commonly traded along the route?", opts: [{ key: "A", text: "Ceramics, silk, frankincense, and spices" }, { key: "B", text: "Coal, iron ore, and crude oil" }, { key: "C", text: "Automobiles and electronics" }, { key: "D", text: "Paper currency exclusively" }], a: "A", exp: "Đoạn 1: 'bulk ceramics, raw silk, aromatic frankincense, and precious spices'." },
        { q: "Between which two historical powers did the Belitung trade voyage occur?", opts: [{ key: "A", text: "Roman Empire and Han Dynasty" }, { key: "B", text: "Tang Dynasty in China and Abbasid Caliphate in Baghdad" }, { key: "C", text: "British Empire and Qing Dynasty" }, { key: "D", text: "Mongol Empire and Ottoman Empire" }], a: "B", exp: "Đoạn 2: 'between the Tang Dynasty and the Abbasid Caliphate in Baghdad'." },
        { q: "What strategic strait connects the Indian Ocean with the South China Sea?", opts: [{ key: "A", text: "Strait of Gibraltar" }, { key: "B", text: "Bering Strait" }, { key: "C", text: "Strait of Malacca" }, { key: "D", text: "Bosphorus Strait" }], a: "C", exp: "Đoạn 1: 'through the treacherous Strait of Malacca'." },
        { q: "What was the cultural legacy of these ancient maritime hubs?", opts: [{ key: "A", text: "Total isolation of communities" }, { key: "B", text: "Universal enforcement of a single language" }, { key: "C", text: "Destruction of all local traditions" }, { key: "D", text: "Cosmopolitan cultural syncretism across Buddhist, Hindu, and Islamic communities" }], a: "D", exp: "Đoạn 3: 'fostering cultural syncretism across Buddhist, Hindu, and Islamic maritime communities'." },
        { q: "What is the primary significance of nautical archaeology for Silk Road history?", opts: [{ key: "A", text: "Provides tangible physical evidence of large-scale maritime global commerce" }, { key: "B", text: "Proves that land routes were entirely fictitious" }, { key: "C", text: "Reveals that ancient ships were made of concrete" }, { key: "D", text: "Shows that trade was limited to short coastal fishing trips" }], a: "A", exp: "Ý nghĩa: Cung cấp bằng chứng khảo cổ hiện vật thực tế về quy mô thương mại hàng hải toàn cầu thời cổ - trung đại." }
      ];

      r3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k2_q${idx + 67}`,
          partNumber: 7,
          partTitle: "Reading Passage 3: Maritime Silk Road",
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
        id: "ia4k2_q81",
        partNumber: 8,
        partTitle: "IELTS Speaking Part 1: Architecture & Urban Living",
        section: "SPEAKING",
        speakingPrompt:
          "1. What kind of building do you live in?\n2. Do you prefer historical traditional architecture or modern minimalist high-rises?\n3. How important are natural urban green spaces in your city?\n4. If you could redesign one building in your hometown, which would it be and why?",
        preparationTimeSeconds: 15,
        speakingTimeSeconds: 60,
        questionText:
          "Question 81 (Speaking Part 1): Answer four interview questions on architecture and urban living naturally (60 seconds).",
        options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "View Band 8.5+ Architectural Vocabulary" },
            { key: "C", text: "Listen to Native Examiner Questions" },
            { key: "D", text: "Skip to Cue Card" }
          ],
        correctAnswer: "A",
        explanation: `🎯 [CHIẾN THUẬT PART 1 - DIRECT ANSWER + EXTENSION]
- Trả lời trực tiếp và mở rộng 2-3 câu bằng từ vựng chỉ không gian sống và thẩm mỹ kiến trúc.
- Tránh câu trả lời ngắn; sử dụng liên từ chỉ cảm xúc và thói quen sinh hoạt.

🔍 [BÀI NÓI MẪU BAND 8.5+]
"Currently, I reside in a contemporary mid-rise apartment complex situated in a vibrant residential district. What I appreciate most is the abundant natural light afforded by floor-to-ceiling windows and the integrated communal amenities.

Between classical architecture and modern design, I am decidedly captivated by historical structures. There is an irreplaceable aesthetic grandeur in ornate stonework and timber craftsmanship that modern concrete and glass high-rises simply cannot emulate.

Regarding urban green spaces, I consider them to be an absolute necessity rather than a luxury. Urban parks serve as vital ecological lungs that mitigate heat island effects while offering sanctuary from metropolitan sensory overload.

If granted the opportunity to renovate a landmark, I would revitalize the dilapidated colonial-era railway warehouse downtown into a dynamic community arts center, preserving its heritage brick facade while modernizing interior spaces."

💡 [TỪ VỰNG THEN CHỐT]
- Aesthetic grandeur /esˈθet̬.ɪk ˈɡræn.dʒɚ/ (n): Sự tráng lệ về mặt thẩm mỹ
- Mitigate heat island effects /ˈmɪt̬.ə.ɡeɪt hiːt ˈaɪ.lənd/ (v phr): Giảm thiểu hiệu ứng đảo nhiệt đô thị
- Sensory overload /ˈsen.sər.i ˈoʊ.vɚ.loʊd/ (n): Sự quá tải giác quan đô thị
- Dilapidated /dɪˈlæp.ə.deɪ.t̬ɪd/ (adj): Xuống cấp, cũ kỹ.`
      });

      qs.push({
        id: "ia4k2_q82",
        partNumber: 9,
        partTitle: "IELTS Speaking Part 2: Cue Card — An Impressive Historical Monument",
        section: "SPEAKING",
        speakingPrompt:
          "Describe a historical building or monument you have visited that made a strong impression on you.\nYou should say:\n• Where it is located and when you visited it\n• What its architectural features look like\n• Why it was constructed historically\nAnd explain why you found this building so memorable.",
        preparationTimeSeconds: 60,
        speakingTimeSeconds: 120,
        questionText:
          "Question 82 (Speaking Part 2): Deliver a continuous 2-minute speech describing a historic architectural wonder.",
        options: [
            { key: "A", text: "View 1-Minute Note-Taking Template" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3" }
          ],
        correctAnswer: "B",
        explanation: `🎯 [CHIẾN THUẬT 1 PHÚT GHI CHÚ (THE 4-BOX METHOD)]
- Box 1 (Where/When): Temple of Literature, Hanoi / Visited last autumn during graduation season.
- Box 2 (Architecture): Traditional timber columns, curved red terracotta eaves, stone turtle stelae inscribed with scholar names.
- Box 3 (History/Purpose): Constructed 1070 under Emperor Ly Thanh Tong as imperial university dedicated to Confucius and Confucian scholars.
- Box 4 (Impression): Serene oasis amid bustling capital, profound celebration of national academic perseverance.

🔍 [BÀI NÓI MẪU BAND 9.0 (230+ TỪ)]
"I would like to speak about one of the most venerable architectural treasures in Vietnam: The Temple of Literature, situated in the heart of Hanoi, which I had the pleasure of visiting during late autumn last year.

Originally founded in 1070 during the reign of Emperor Ly Thanh Tong, the complex served as the nation's premier imperial academy, dedicated to the veneration of Confucius and the cultivation of scholar-officials for the royal court.

Architecturally, the sanctuary is a masterpiece of traditional Vietnamese timber design, organized into five sequential courtyards that create an aura of profound tranquility. What struck me most powerfully was the Well of Heavenly Clarity and the rows of stone turtle stelae, upon which the names of royal doctoral laureates are meticulously engraved. The contrast between weathered moss-covered masonry, dark polished ironwood pillars, and sweeping terracotta rooflines evokes an overwhelming sense of timelessness.

What rendered this visit unforgettable was the palpable reverence for scholarship that permeates the atmosphere. Walking along ancient paved pathways shielded by ancient banyan trees, I felt a deep emotional connection to centuries of intellectual perseverance that laid the foundation for our modern nation."

💡 [TỪ VỰNG THEN CHỐT]
- Venerable /ˈven.ɚ.ə.bəl/ (adj): Cổ kính, đáng tôn kính
- Stone turtle stelae /stoʊn ˈtɝː.t̬əl ˈstiː.laɪ/ (n): Bia tiến sĩ cưỡi rùa đá
- Palpable reverence /ˈpæl.pə.bəl ˈrev.ɚ.əns/ (n): Sự tôn kính cảm nhận rõ rệt
- Intellectual perseverance /ˌɪn.təlˈek.tʃu.əl ˌpɝː.səˈvɪr.əns/ (n): Sự kiên trì bền bỉ trên con đường học vấn.`
      });

      qs.push({
        id: "ia4k2_q83",
        partNumber: 10,
        partTitle: "IELTS Speaking Part 3: Heritage Conservation vs Urban Development",
        section: "SPEAKING",
        speakingPrompt:
          "1. Should historical buildings be preserved at high public financial expense, or should they be demolished to make room for affordable modern housing?\n2. How does architectural heritage contribute to a country's cultural identity?\n3. What role can modern sustainable technology play in preserving historical monuments?",
        preparationTimeSeconds: 20,
        speakingTimeSeconds: 90,
        questionText:
          "Question 83 (Speaking Part 3): Provide analytical, balanced arguments on heritage preservation versus modern urban expansion.",
        options: [
            { key: "A", text: "Review Argumentative Connectors" },
            { key: "B", text: "Check Band 9 Academic Vocabulary" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Complete Speaking Section" }
          ],
        correctAnswer: "C",
        explanation: `🎯 [CHIẾN THUẬT PART 3 - CẤU TRÚC LẬP LUẬN ĐA CHIỀU]
- Nêu rõ xung đột giữa bảo tồn di sản văn hóa và nhu cầu nhà ở xã hội cấp thiết.
- Đề xuất giải pháp dung hòa: Tái thiết thích ứng (Adaptive reuse) và quy hoạch vùng đệm.

🔍 [BÀI NÓI MẪU BAND 9.0 (90 GIÂY)]
"The tension between historical preservation and metropolitan development represents a classic dilemma for urban planners. In my view, architectural heritage should not be sacrificed indiscriminately for commercial high-rises, because historic monuments constitute physical anchors of collective memory and cultural sovereignty. A city devoid of its historic fabric risks descending into sterile architectural homogeneity.

However, governments must avoid dogmatic stagnation. Rather than choosing between absolute preservation or wholesale demolition, the most pragmatic solution lies in 'adaptive reuse'—retrofitting historic facades with modern, energy-efficient interior infrastructures. This enables communities to honor cultural heritage while satisfying urgent contemporary demands for residential and commercial space."

💡 [TỪ VỰNG THEN CHỐT]
- Cultural sovereignty /ˈkʌl.tʃɚ.əl ˈsɑːv.rən.t̬i/ (n): Bản sắc/chủ quyền văn hóa
- Sterile homogeneity /ˈster.əl ˌhoʊ.moʊ.dʒəˈneɪ.ə.t̬i/ (n): Sự đồng nhất vô hồn, đơn điệu
- Adaptive reuse /əˈdæp.tɪv ˌriːˈjuːs/ (n): Tái thiết thích ứng công trình lịch sử
- Retrofitting /ˈret.roʊ.fɪt.ɪŋ/ (n): Cải tạo lắp đặt thêm công nghệ hiện đại.`
      });

      // IELTS WRITING AI (Q84 - Q85: TASK 1 & TASK 2)
      qs.push({
        id: "ia4k2_q84",
        partNumber: 11,
        partTitle: "IELTS Writing Task 1: Academic Report (Process Diagram)",
        section: "WRITING",
        writingPrompt:
          "The diagram illustrates the industrial process of desalinating seawater using reverse osmosis technology to produce potable drinking water. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Time suggested: 20 minutes).",
        minWordCount: 150,
        sampleEssay: `The provided flow diagram delineates the sequential industrial stages involved in transforming raw saline seawater into purified potable drinking water through reverse osmosis desalination technology.

Overall, the desalination process encompasses four principal phases: seawater intake and preliminary screening, high-pressure semi-permeable membrane filtration, post-treatment chemical remineralization, and distribution to municipal reservoirs, alongside the discharge of concentrated brine back into the ocean.

In the initial stage, raw ocean water is drawn through submerged intake pipes equipped with coarse mesh screens to remove large debris and marine organisms. The water then enters a flocculation chamber where chemical coagulants aggregate microscopic suspended solids, followed by sand bed filtration to eliminate particulate impurities.

Next, the clarified saline water is pressurized by high-efficiency pumps to approximately 70 atmospheres before being forced through synthetic polyamide spiral-wound membranes. These membranes allow water molecules to permeate while rejecting 99.4% of dissolved salts. The resulting permeate undergoes pH stabilization and chlorine disinfection before entering city supply networks, while the hypersaline reject stream is safely dispersed through offshore underwater diffusers.`,
        questionText:
          "Question 84 (Writing Task 1): Write an academic report explaining the reverse osmosis desalination process (min 150 words).",
        options: [
            { key: "A", text: "Check Passive Voice Grammar Checklist" },
            { key: "B", text: "Review Technical Process Connectors" },
            { key: "C", text: "Skip to Task 2" },
            { key: "D", text: "Submit Task 1 Report for Gemini AI Evaluation" }
          ],
        correctAnswer: "D",
        explanation: `🎯 [CHIẾN THUẬT VIẾT BÀI DẠNG PROCESS DIAGRAM - BAND 9.0]
1. Task Achievement:
   - Giới thiệu quy trình biến đổi nước biển mặn thành nước sinh hoạt tinh khiết.
   - Đoạn Overview bắt buộc: Tóm tắt 4 giai đoạn chính (lấy nước, lọc sơ cấp, thẩm thấu ngược màng bán thấm, khử trùng & xả thải).
   - Thân bài mô tả chi tiết từng mắt xích công nghệ, số liệu áp suất (70 atm) và hiệu suất tách muối (99.4%).

2. Grammatical Range & Accuracy (GRA):
   - Sử dụng thành thạo thể Bị động Hiện tại đơn (Present Simple Passive): "is drawn", "is pressurized", "is forced", "is safely dispersed".

3. Lexical Resource (LR):
   - Thuật ngữ hóa - kỹ thuật chuẩn xác: "saline seawater", "potable drinking water", "flocculation chamber", "semi-permeable membrane", "permeate", "hypersaline reject stream".`
      });

      qs.push({
        id: "ia4k2_q85",
        partNumber: 12,
        partTitle: "IELTS Writing Task 2: Academic Discursive Essay",
        section: "WRITING",
        writingPrompt:
          "With the rapid advancement of artificial intelligence and automated algorithms, some people believe that human artistic creativity—such as musical composition, painting, and creative writing—will soon become obsolete. To what extent do you agree or disagree with this view? (Write at least 250 words. Time suggested: 40 minutes).",
        minWordCount: 250,
        sampleEssay: `The exponential proliferation of generative artificial intelligence capable of producing symphonic music, photorealistic imagery, and literary prose has ignited profound philosophical anxiety regarding the obsolescence of human creative agency. While algorithmic systems demonstrate astonishing computational mimicry, I wholeheartedly disagree with the assertion that human artistic expression will ever be rendered obsolete, because authentic art is inextricably bound to lived human consciousness, emotional vulnerability, and socio-cultural context.

Admittedly, modern deep neural networks excel at synthesizing vast corpora of historical artistic data to produce aesthetically pleasing artifacts in seconds. In commercial design, film scoring, and content marketing, AI algorithms have already automated mundane creative tasks with superhuman speed. However, these mathematical models merely execute pattern recognition and probabilistic recombining of existing human works; they possess neither subjective intentionality, genuine emotional experience, nor conscious purpose. A generative algorithm can assemble a melancholic chord progression, but it has never experienced the visceral heartbreak, mortality awareness, or existential triumph that inspired Beethoven's late string quartets.

Furthermore, the fundamental value of artistic engagement resides in the empathetic communion between human creator and human spectator. When audiences view a masterpiece like Van Gogh's 'The Starry Night' or read Tolstoy's 'War and Peace,' they are not merely evaluating visual harmony or linguistic grammar; they are participating in a sacred dialogue with another sentient being's psychological struggle and philosophical perception of reality. Artificial intelligence, devoid of biological embodiment and social identity, cannot replicate this profound existential resonance.

In conclusion, while artificial intelligence will undoubtedly persist as a powerful assistive instrument in creative workflows, it can never supplant the irreplaceable spark of human consciousness. Art is not merely a consumable product, but the definitive mirror of the human soul.`,
        questionText:
          "Question 85 (Writing Task 2): Write an extensive philosophical essay (min 250 words) on AI versus human artistic creativity.",
        options: [
            { key: "A", text: "Submit Task 2 Essay for Gemini AI Evaluation" },
            { key: "B", text: "Review Philosophical Discourse Architecture" },
            { key: "C", text: "Check CEFR C2 Academic Vocabulary" },
            { key: "D", text: "Complete Full IELTS Test" }
          ],
        correctAnswer: "A",
        explanation: `🎯 [CHIẾN THUẬT BÀI LUẬN BAND 9.0 CHỦ ĐỀ TRIẾT HỌC & CÔNG NGHỆ]
1. Task Response:
   - Khẳng định quan điểm rõ ràng ngay mở bài: Hoàn toàn không đồng ý (Strong Disagreement) với nhận định nghệ thuật con người sẽ bị lỗi thời.
   - Thân bài 1 (Thừa nhận & Phản biện): Công nhận AI giỏi bắt chước tính toán (computational mimicry) nhưng thiếu ý thức chủ quan (subjective intentionality) và trải nghiệm cảm xúc.
   - Thân bài 2 (Lập luận trọng tâm): Giá trị cốt lõi của nghệ thuật nằm ở sự giao cảm thấu cảm (empathetic communion) giữa tác giả và người thưởng thức.
   - Kết bài đúc kết súc tích: Nghệ thuật là tấm gương phản chiếu tâm hồn con người.

2. Lexical Resource (C2 Academic):
   - "computational mimicry", "subjective intentionality", "visceral heartbreak", "empathetic communion", "sentient being", "existential resonance", "definitive mirror of the human soul".`
      });

      return qs;
    })()
  };
