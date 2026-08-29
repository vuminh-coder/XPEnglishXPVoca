import { ExamPaper, ExamQuestion } from "./types";

export const ieltsAcademic4k05Paper: ExamPaper = {
  id: "ielts_academic_4k_05",
  title: "IELTS Academic Official Test #05",
  type: "IELTS_FULL",
  level: "Advanced",
  timeLimitMinutes: 175,
  totalQuestions: 85,
  maxScore: 9.0,
  description: "Bộ đề thi IELTS Academic Test #05 chuẩn Cambridge gồm 40 câu Listening, 40 câu Reading, Speaking AI 3 Part và 2 Writing Tasks.",
  categoryBadge: "IELTS Academic",
  tags: ["IELTS", "Cambridge", "Test 05", "Academic", "Band 9.0 Standard"],
  supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // SECTION 1: Marine Wildlife Conservation Volunteer Program (Q1 - Q10)
    const sec1Script =
      "Coordinator: Good morning, Kaikoura Marine Conservation Sanctuary. My name is Liam. How can I assist you?\n" +
      "Volunteer: Hello! I am calling to register for the upcoming Southern Ocean Whale & Dolphin Research Volunteer program.\n" +
      "Coordinator: Excellent! Let me record your registration details. What is your full legal name and current residential country?\n" +
      "Volunteer: My name is Megan Foster, and I am currently residing in Edinburgh, Scotland.\n" +
      "Coordinator: Wonderful, Ms. Foster. And what is your primary mobile contact number?\n" +
      "Volunteer: It is +44 7911 448 209.\n" +
      "Coordinator: Perfect. For the three-week fieldwork placement starting on October 12th, our volunteers stay at our coastal eco-lodge located at 45 Ocean Terrace, Kaikoura Peninsula.\n" +
      "Volunteer: What duties are involved in the daily field schedule?\n" +
      "Coordinator: Morning sessions involve boat-based acoustic hydrophone recording of sperm whale echolocation clicks, while afternoon shifts focus on digital photographic dorsal fin identification of dusky dolphins.\n" +
      "Volunteer: Are meals and research equipment provided in the program fee?\n" +
      "Coordinator: Yes, all organic meals, wet suits, waterproof binoculars, and GPS marine trackers are fully provided. The all-inclusive volunteer fee is 1,850 New Zealand dollars, with a 200-dollar deposit required upon confirmation.\n" +
      "Volunteer: That is very reasonable. When is the mandatory safety orientation meeting?\n" +
      "Coordinator: The introductory orientation briefing will take place on Sunday, October 11th at 4:00 PM in the Marine Education Pavilion.";

    const sec1Questions = [
      { q: "What is the volunteer applicant's full name?", opts: [{ key: "A", text: "Sarah Jenkins" }, { key: "B", text: "Megan Foster" }, { key: "C", text: "Elena Rostova" }, { key: "D", text: "Fiona Davies" }], a: "B", exp: "Họ tên tình nguyện viên: 'My name is Megan Foster'." },
      { q: "Where does Megan currently reside?", opts: [{ key: "A", text: "Dublin, Ireland" }, { key: "B", text: "Melbourne, Australia" }, { key: "C", text: "Edinburgh, Scotland" }, { key: "D", text: "Vancouver, Canada" }], a: "C", exp: "Nơi cư trú: 'currently residing in Edinburgh, Scotland'." },
      { q: "What is Megan's mobile contact number?", opts: [{ key: "A", text: "+44 7911 330 188" }, { key: "B", text: "+44 7911 552 904" }, { key: "C", text: "+44 7911 667 312" }, { key: "D", text: "+44 7911 448 209" }], a: "D", exp: "Số điện thoại di động: '+44 7911 448 209'." },
      { q: "What is the physical address of the coastal eco-lodge?", opts: [{ key: "A", text: "45 Ocean Terrace, Kaikoura Peninsula" }, { key: "B", text: "12 Marina Drive" }, { key: "C", text: "88 Harbour View" }, { key: "D", text: "105 Cliff Road" }], a: "A", exp: "Địa chỉ nhà lưu trú: '45 Ocean Terrace, Kaikoura Peninsula'." },
      { q: "When does the three-week fieldwork placement begin?", opts: [{ key: "A", text: "October 1st" }, { key: "B", text: "October 12th" }, { key: "C", text: "November 5th" }, { key: "D", text: "December 1st" }], a: "B", exp: "Ngày bắt đầu đợt tình nguyện: 'placement starting on October 12th'." },
      { q: "What scientific task is conducted during morning boat sessions?", opts: [{ key: "A", text: "Tagging sea turtles" }, { key: "B", text: "Measuring water salinity" }, { key: "C", text: "Acoustic hydrophone recording of sperm whale echolocation clicks" }, { key: "D", text: "Feeding wild seals" }], a: "C", exp: "Nhiệm vụ buổi sáng: 'boat-based acoustic hydrophone recording of sperm whale echolocation clicks'." },
      { q: "What activity is performed during afternoon research shifts?", opts: [{ key: "A", text: "Cleaning boat engines" }, { key: "B", text: "Scuba diving for coral samples" }, { key: "C", text: "Collecting beach litter" }, { key: "D", text: "Digital photographic dorsal fin identification of dusky dolphins" }], a: "D", exp: "Nhiệm vụ buổi chiều: 'digital photographic dorsal fin identification of dusky dolphins'." },
      { q: "What is the total all-inclusive volunteer fee?", opts: [{ key: "A", text: "1,850 New Zealand dollars" }, { key: "B", text: "950 NZD" }, { key: "C", text: "2,500 NZD" }, { key: "D", text: "3,200 NZD" }], a: "A", exp: "Tổng chi phí trọn gói: 'all-inclusive volunteer fee is 1,850 New Zealand dollars'." },
      { q: "How much deposit is required upon registration confirmation?", opts: [{ key: "A", text: "50 dollars" }, { key: "B", text: "200 dollars" }, { key: "C", text: "100 dollars" }, { key: "D", text: "500 dollars" }], a: "B", exp: "Tiền đặt cọc: '200-dollar deposit required upon confirmation'." },
      { q: "When is the mandatory safety orientation meeting scheduled?", opts: [{ key: "A", text: "Saturday morning at 9:00 AM" }, { key: "B", text: "Monday at 8:30 AM" }, { key: "C", text: "Sunday, October 11th at 4:00 PM" }, { key: "D", text: "Tuesday at 2:00 PM" }], a: "C", exp: "Thời gian họp phổ biến an toàn: 'Sunday, October 11th at 4:00 PM'." }
    ];

    sec1Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k5_q${idx + 1}`,
        partNumber: 1,
        partTitle: "Listening Section 1: Marine Sanctuary Volunteer Registration",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
        questionText: `Question ${idx + 1}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 2: Quantum Computing Center Orientation Tour (Q11 - Q20)
    const sec2Script =
      "Guide: Welcome to the Cavendish Quantum Innovation Center. I am Dr. Aris Thorne. Today you will tour our superconducting quantum processor cleanrooms. In Hallway A, visitors can view our dilution refrigerator cryostats, affectionately called 'golden chandeliers'. These multi-stage helium-3 dilution systems cool our 128-qubit transmon processors down to 15 millikelvin—colder than deep interstellar space—to prevent thermal decoherence. In Laboratory B, engineers test microwave pulse generators operating at 5 gigahertz that execute quantum logic gates with 99.8 percent gate fidelity. Visitors must put on sterile anti-static shoe covers and white cleanroom coats before crossing the blue airlock threshold. Mobile phones must remain powered off due to radio-frequency interference with sensitive Josephson junctions. Our interactive quantum physics simulator terminals in the lobby are free to use, and our Science Bookstore offers introductory textbooks at a 20 percent student discount.";

    const sec2Questions = [
      { q: "What facility is being toured in this orientation?", opts: [{ key: "A", text: "Solar Panel Factory" }, { key: "B", text: "Rocket Launch Facility" }, { key: "C", text: "Particle Collider" }, { key: "D", text: "Cavendish Quantum Innovation Center" }], a: "D", exp: "Địa điểm tham quan: 'Cavendish Quantum Innovation Center'." },
      { q: "What nickname is given to the dilution refrigerator cryostats in Hallway A?", opts: [{ key: "A", text: "Golden chandeliers" }, { key: "B", text: "Silver towers" }, { key: "C", text: "Frost domes" }, { key: "D", text: "Copper pyramids" }], a: "A", exp: "Biệt danh tủ làm lạnh: 'affectionately called golden chandeliers'." },
      { q: "What temperature do the multi-stage helium dilution systems achieve?", opts: [{ key: "A", text: "0 degrees Celsius" }, { key: "B", text: "15 millikelvin (colder than deep interstellar space)" }, { key: "C", text: "Minus 50 Celsius" }, { key: "D", text: "1 Kelvin" }], a: "B", exp: "Nhiệt độ siêu hàn: 'cool our 128-qubit transmon processors down to 15 millikelvin'." },
      { q: "Why is extreme cryogenic cooling required for quantum processors?", opts: [{ key: "A", text: "To save electricity" }, { key: "B", text: "To make the chips glow" }, { key: "C", text: "To prevent thermal decoherence of qubits" }, { key: "D", text: "To prevent rust" }], a: "C", exp: "Mục đích làm lạnh siêu sâu: 'to prevent thermal decoherence'." },
      { q: "How many qubits does the processor showcased in Hallway A contain?", opts: [{ key: "A", text: "16 qubits" }, { key: "B", text: "64 qubits" }, { key: "C", text: "1,000 qubits" }, { key: "D", text: "128-qubit transmon processor" }], a: "D", exp: "Số lượng qubit: 'our 128-qubit transmon processors'." },
      { q: "What frequency do the microwave pulse generators in Laboratory B operate at?", opts: [{ key: "A", text: "5 gigahertz" }, { key: "B", text: "100 megahertz" }, { key: "C", text: "1 gigahertz" }, { key: "D", text: "50 gigahertz" }], a: "A", exp: "Tần số xung vi sóng: 'microwave pulse generators operating at 5 gigahertz'." },
      { q: "What quantum logic gate fidelity rate is achieved by the system?", opts: [{ key: "A", text: "85.0 percent" }, { key: "B", text: "99.8 percent gate fidelity" }, { key: "C", text: "92.5 percent" }, { key: "D", text: "100.0 percent" }], a: "B", exp: "Độ chính xác cổng logic lượng tử: 'execute quantum logic gates with 99.8 percent gate fidelity'." },
      { q: "What protective gear must visitors wear before crossing the blue airlock?", opts: [{ key: "A", text: "Heavy leather gloves" }, { key: "B", text: "Welding masks" }, { key: "C", text: "Sterile anti-static shoe covers and white cleanroom coats" }, { key: "D", text: "Rubber boots" }], a: "C", exp: "Trang phục bảo hộ bắt buộc: 'sterile anti-static shoe covers and white cleanroom coats'." },
      { q: "Why must mobile phones remain powered off inside the facility?", opts: [{ key: "A", text: "To maintain quiet" }, { key: "B", text: "To prevent photography" }, { key: "C", text: "To conserve battery power" }, { key: "D", text: "To prevent radio-frequency interference with sensitive Josephson junctions" }], a: "D", exp: "Nguyên nhân tắt điện thoại: 'prevent radio-frequency interference with sensitive Josephson junctions'." },
      { q: "What discount is offered on textbooks at the Science Bookstore?", opts: [{ key: "A", text: "20 percent student discount" }, { key: "B", text: "10 percent" }, { key: "C", text: "35 percent" }, { key: "D", text: "50 percent" }], a: "A", exp: "Mức giảm giá sách: '20 percent student discount'." }
    ];

    sec2Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k5_q${idx + 11}`,
        partNumber: 2,
        partTitle: "Listening Section 2: Quantum Computing Innovation Center",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
        questionText: `Question ${idx + 11}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 3: Postgraduate Seminar on Vertical Agritech & Aeroponics (Q21 - Q30)
    const sec3Script =
      "Professor: Welcome, Chloe and Daniel. Let's examine your experimental data regarding automated closed-loop aeroponic farming for leafy greens.\n" +
      "Chloe: Thank you, Professor Vance. In our twelve-week vertical farm trials, aeroponic misting arrays delivered atomized nutrient droplets directly to suspended root systems every four minutes.\n" +
      "Daniel: Comparing our yield metrics against traditional soil cultivation, the aeroponic system reduced water consumption by 95 percent and fertilizer runoff by 88 percent, while accelerating crop growth cycles from 45 days down to 26 days.\n" +
      "Professor: Remarkable efficiency gains. How did you optimize the spectral LED lighting recipe?\n" +
      "Chloe: We modulated a 4:1 ratio of red (660 nm) to blue (450 nm) wavelengths, which stimulated peak chlorophyll-A absorption and boosted antioxidant anthocyanin synthesis by 32 percent.\n" +
      "Daniel: For our commercial scalability model, we calculated that high initial capital expenditures for robotic harvesting arms break even within 4.2 years under current urban retail wholesale prices.\n" +
      "Professor: Outstanding data analysis. Please submit your final agricultural engineering dissertation draft by Friday, November 28th.";

    const sec3Questions = [
      { q: "What agricultural methodology was tested in the 12-week trial?", opts: [{ key: "A", text: "Flood irrigation" }, { key: "B", text: "Automated closed-loop aeroponic misting arrays" }, { key: "C", text: "Open-field organic tilling" }, { key: "D", text: "Chemical greenhouse fumigation" }], a: "B", exp: "Phương pháp thử nghiệm: 'automated closed-loop aeroponic farming'." },
      { q: "How frequently were nutrient droplets misted onto the suspended roots?", opts: [{ key: "A", text: "Every 30 seconds" }, { key: "B", text: "Once every hour" }, { key: "C", text: "Every four minutes" }, { key: "D", text: "Twice a day" }], a: "C", exp: "Tần suất phun sương dưỡng chất: 'atomized nutrient droplets directly to suspended root systems every four minutes'." },
      { q: "By how much did the aeroponic system reduce water consumption compared to soil farming?", opts: [{ key: "A", text: "50 percent" }, { key: "B", text: "75 percent" }, { key: "C", text: "99 percent" }, { key: "D", text: "95 percent" }], a: "D", exp: "Mức tiết kiệm nước: 'reduced water consumption by 95 percent'." },
      { q: "By how much was fertilizer runoff reduced?", opts: [{ key: "A", text: "88 percent" }, { key: "B", text: "40 percent" }, { key: "C", text: "65 percent" }, { key: "D", text: "100 percent" }], a: "A", exp: "Mức giảm rửa trôi phân bón: 'fertilizer runoff by 88 percent'." },
      { q: "How much did crop growth cycles accelerate in the vertical system?", opts: [{ key: "A", text: "From 60 days down to 50 days" }, { key: "B", text: "From 45 days down to 26 days" }, { key: "C", text: "From 30 days to 28 days" }, { key: "D", text: "No change in growth speed" }], a: "B", exp: "Rút ngắn chu kỳ sinh trưởng: 'accelerating crop growth cycles from 45 days down to 26 days'." },
      { q: "What LED wavelength ratio was modulated to optimize photosynthesis?", opts: [{ key: "A", text: "1:1 green to yellow" }, { key: "B", text: "10:1 ultraviolet to white" }, { key: "C", text: "4:1 ratio of red (660 nm) to blue (450 nm)" }, { key: "D", text: "Pure infrared" }], a: "C", exp: "Tỷ lệ quang phổ LED: '4:1 ratio of red (660 nm) to blue (450 nm) wavelengths'." },
      { q: "By how much was antioxidant anthocyanin synthesis boosted under the LED recipe?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "18 percent" }, { key: "C", text: "50 percent" }, { key: "D", text: "32 percent" }], a: "D", exp: "Tăng hàm lượng chất chống oxy hóa: 'boosted antioxidant anthocyanin synthesis by 32 percent'." },
      { q: "What is the calculated payback break-even period for robotic harvesting arms?", opts: [{ key: "A", text: "4.2 years" }, { key: "B", text: "1.5 years" }, { key: "C", text: "2.8 years" }, { key: "D", text: "10.0 years" }], a: "A", exp: "Thời gian hoàn vốn cánh tay robot: 'break even within 4.2 years'." },
      { q: "What crop category was cultivated in the experimental trial?", opts: [{ key: "A", text: "Wheat and barley" }, { key: "B", text: "Leafy greens" }, { key: "C", text: "Potatoes" }, { key: "D", text: "Fruit orchards" }], a: "B", exp: "Loại cây trồng: 'aeroponic farming for leafy greens'." },
      { q: "When is the final dissertation draft due for submission?", opts: [{ key: "A", text: "November 10th" }, { key: "B", text: "December 15th" }, { key: "C", text: "Friday, November 28th" }, { key: "D", text: "January 5th" }], a: "C", exp: "Hạn nộp luận văn: 'final agricultural engineering dissertation draft by Friday, November 28th'." }
    ];

    sec3Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k5_q${idx + 21}`,
        partNumber: 3,
        partTitle: "Listening Section 3: Vertical Agritech & Aeroponics",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
        questionText: `Question ${idx + 21}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 4: University Lecture on Deep-Ocean Hydrothermal Vents (Q31 - Q40)
    const sec4Script =
      "Lecturer: Good morning, marine geosciences postgraduates. Today's lecture examines the geobiology and extreme ecology of deep-sea hydrothermal vent systems along mid-ocean ridge tectonic spreading centers. Discovered in 1977 along the Galapagos Rift at depths exceeding 2,500 meters, black smoker chimneys eject superheated mineral-rich fluids at temperatures reaching 400 degrees Celsius without boiling, maintained liquid by intense hydrostatic pressure exceeding 250 atmospheres. In complete absence of solar phototrophic energy, these benthic ecosystems are entirely fueled by chemolithoautotrophic Archaea and bacteria. These extremophile microbes oxidize toxic hydrogen sulfide, methane, and dissolved iron to synthesize organic carbon molecules. Giant hydrothermal tubeworms—Riftia pachyptila—which lack a digestive mouth and gut, survive through a symbiotic relationship with millions of sulfur-oxidizing bacteria housed inside a specialized internal vascular organ called the trophosome. Beyond marine ecology, astrobiologists study these subterranean geochemical reactors as premier terrestrial analogues for prebiotic chemical evolution and potential extraterrestrial life within the sub-ice oceans of Jupiter's moon Europa and Saturn's moon Enceladus.";

    const sec4Questions = [
      { q: "When and where were deep-sea hydrothermal vents first discovered?", opts: [{ key: "A", text: "1950 in the Arctic" }, { key: "B", text: "1995 off the coast of Japan" }, { key: "C", text: "2010 in the Mariana Trench" }, { key: "D", text: "1977 along the Galapagos Rift at depths exceeding 2,500 meters" }], a: "D", exp: "Thời gian và địa điểm phát hiện: 'Discovered in 1977 along the Galapagos Rift at depths exceeding 2,500 meters'." },
      { q: "What temperature can superheated hydrothermal vent fluid reach?", opts: [{ key: "A", text: "Reaching 400 degrees Celsius" }, { key: "B", text: "100 degrees Celsius" }, { key: "C", text: "250 degrees Celsius" }, { key: "D", text: "1,000 degrees Celsius" }], a: "A", exp: "Nhiệt độ dòng khoáng chất: 'superheated mineral-rich fluids at temperatures reaching 400 degrees Celsius'." },
      { q: "Why does 400°C vent water remain liquid rather than boiling into steam?", opts: [{ key: "A", text: "High salt content only" }, { key: "B", text: "Maintained liquid by intense hydrostatic pressure exceeding 250 atmospheres" }, { key: "C", text: "Constant mixing with ice" }, { key: "D", text: "Special magnetic fields" }], a: "B", exp: "Nguyên nhân nước không sôi: 'maintained liquid by intense hydrostatic pressure exceeding 250 atmospheres'." },
      { q: "What process fuels hydrothermal ecosystems in the absence of sunlight?", opts: [{ key: "A", text: "Photosynthesis" }, { key: "B", text: "Nuclear fission" }, { key: "C", text: "Chemolithoautotrophy (Chemosynthesis)" }, { key: "D", text: "Thermal convection only" }], a: "C", exp: "Cơ chế tạo năng lượng không cần ánh sáng: 'entirely fueled by chemolithoautotrophic Archaea and bacteria'." },
      { q: "What primary inorganic chemical compound is oxidized by extremophile microbes?", opts: [{ key: "A", text: "Carbon dioxide gas" }, { key: "B", text: "Pure oxygen" }, { key: "C", text: "Calcium carbonate" }, { key: "D", text: "Toxic hydrogen sulfide (H2S), methane, and dissolved iron" }], a: "D", exp: "Hợp chất vô cơ được oxy hóa: 'oxidize toxic hydrogen sulfide, methane, and dissolved iron'." },
      { q: "What anatomical organs are absent in giant tubeworms (Riftia pachyptila)?", opts: [{ key: "A", text: "Digestive mouth, gut, and digestive tract" }, { key: "B", text: "Heart and red blood" }, { key: "C", text: "Nerve cells" }, { key: "D", text: "Muscles" }], a: "A", exp: "Cơ quan giải phẫu bị tiêu biến ở giun ống khổng lồ: 'lack a digestive mouth and gut'." },
      { q: "What specialized internal organ houses symbiotic sulfur-oxidizing bacteria in tubeworms?", opts: [{ key: "A", text: "Stomach pouch" }, { key: "B", text: "The trophosome" }, { key: "C", text: "Gill filaments" }, { key: "D", text: "Liver lobe" }], a: "B", exp: "Cơ quan chứa vi khuẩn cộng sinh: 'specialized internal vascular organ called the trophosome'." },
      { q: "What geological feature do hydrothermal vent fields line?", opts: [{ key: "A", text: "Desert sand dunes" }, { key: "B", text: "River deltas" }, { key: "C", text: "Mid-ocean ridge tectonic spreading centers" }, { key: "D", text: "Continental mountain peaks" }], a: "C", exp: "Vị trí địa chất: 'along mid-ocean ridge tectonic spreading centers'." },
      { q: "Which two celestial moons are cited as potential extraterrestrial habitats for vent life?", opts: [{ key: "A", text: "Earth's Moon and Phobos" }, { key: "B", text: "Mars and Venus" }, { key: "C", text: "Titan and Pluto exclusively" }, { key: "D", text: "Jupiter's Europa and Saturn's Enceladus" }], a: "D", exp: "Thiên thể ngoài Trái Đất có đại dương băng: 'sub-ice oceans of Jupiter's moon Europa and Saturn's moon Enceladus'." },
      { q: "How do astrobiologists utilize hydrothermal vent systems in research?", opts: [{ key: "A", text: "As terrestrial analogues for prebiotic chemical evolution and origin of life" }, { key: "B", text: "As underwater mining factories" }, { key: "C", text: "To cool space rockets" }, { key: "D", text: "To breed commercial fish" }], a: "A", exp: "Ứng dụng sinh học vũ trụ: 'premier terrestrial analogues for prebiotic chemical evolution and potential extraterrestrial life'." }
    ];

    sec4Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k5_q${idx + 31}`,
        partNumber: 4,
        partTitle: "Listening Section 4: Hydrothermal Vents & Chemosynthesis",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
        questionText: `Question ${idx + 31}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // READING PASSAGE 1: Mass Timber Megastructures & Cross-Laminated Timber (Q41 - Q53: 13 Questions)
    const readP1 = `READING PASSAGE 1 — ARCHITECTURAL RENAISSANCE: THE RISE OF MASS TIMBER AND CROSS-LAMINATED TIMBER (CLT)\n\nFor over a century, the global skylines of modern metropolises have been defined almost exclusively by steel and reinforced concrete. However, the international construction sector contributes roughly 39 percent of global energy-related carbon dioxide emissions, with cement manufacturing alone accounting for approximately 8 percent of worldwide greenhouse gas output. In response to this profound ecological crisis, vanguard structural engineers and architects are driving a revolutionary paradigm shift: the mass timber movement, spearheaded by an advanced engineered material known as Cross-Laminated Timber (CLT).\n\nEngineered in Austria and Germany during the 1990s, CLT is manufactured by stacking kiln-dried lumber boards in alternating perpendicular layers (at 90-degree angles), bonded under hydraulic pressure with non-toxic polyurethane adhesives. This orthogonal grain orientation bestows CLT panels with structural rigidity, dimensional stability, and high strength-to-weight ratios rivaling structural steel, while weighing nearly 75 percent less than traditional concrete. Massive prefabricated timber slabs, columns, and beams can be precision-milled offsite using computer numerical control (CNC) robotics, enabling rapid modular assembly that slashes on-site construction timelines by up to 30 percent and minimizes neighborhood acoustic disturbance.\n\nSkeptics historically questioned timber's vulnerability to fire and seismic hazards. Paradoxically, extensive fire testing has demonstrated that thick mass timber elements exhibit predictable, superior fire resistance. When exposed to extreme temperatures, the exterior surface chars at a predictable rate of roughly 0.65 millimeters per minute, forming an insulating carbonized charcoal barrier that shields the inner structural core from heat penetration and prevents sudden structural collapse—unlike steel beams that rapidly buckle and lose structural integrity above 500 degrees Celsius. Furthermore, because sustainably harvested timber sequesters atmospheric carbon captured during tree photosynthesis (approximately one metric ton of CO2 stored per cubic meter of wood), mass timber high-rises—such as the 86-meter Ascent Tower in Milwaukee and the 85-meter Mjøstårnet in Norway—transform skyscrapers into massive carbon sinks.`;

    const r1Questions = [
      { q: "What percentage of global energy-related CO2 emissions does the construction sector generate?", opts: [{ key: "A", text: "15 percent" }, { key: "B", text: "Roughly 39 percent" }, { key: "C", text: "55 percent" }, { key: "D", text: "80 percent" }], a: "B", exp: "Đoạn 1: 'the international construction sector contributes roughly 39 percent of global energy-related carbon dioxide emissions'." },
      { q: "What percentage of global greenhouse gas output is generated by cement manufacturing alone?", opts: [{ key: "A", text: "2 percent" }, { key: "B", text: "20 percent" }, { key: "C", text: "Approximately 8 percent" }, { key: "D", text: "35 percent" }], a: "C", exp: "Đoạn 1: 'with cement manufacturing alone accounting for approximately 8 percent'." },
      { q: "Where and when was Cross-Laminated Timber (CLT) initially engineered?", opts: [{ key: "A", text: "United States in the 1970s" }, { key: "B", text: "Japan in the 2010s" }, { key: "C", text: "Norway in the 1950s" }, { key: "D", text: "Austria and Germany during the 1990s" }], a: "D", exp: "Đoạn 2: 'Engineered in Austria and Germany during the 1990s'." },
      { q: "How are lumber boards arranged when manufacturing CLT panels?", opts: [{ key: "A", text: "Stacked in alternating perpendicular layers at 90-degree angles" }, { key: "B", text: "Crushed into sawdust glue" }, { key: "C", text: "Woven like fabric" }, { key: "D", text: "Bound with metal wire cables" }], a: "A", exp: "Đoạn 2: 'stacking kiln-dried lumber boards in alternating perpendicular layers (at 90-degree angles)'." },
      { q: "How does the weight of CLT compare to reinforced concrete?", opts: [{ key: "A", text: "It is twice as heavy" }, { key: "B", text: "It weighs nearly 75 percent less than traditional concrete" }, { key: "C", text: "They have identical weight" }, { key: "D", text: "CLT is 10 percent heavier" }], a: "B", exp: "Đoạn 2: 'while weighing nearly 75 percent less than traditional concrete'." },
      { q: "What technology is utilized to precision-mill prefabricated timber elements offsite?", opts: [{ key: "A", text: "Handheld chain saws" }, { key: "B", text: "Chemical acid baths" }, { key: "C", text: "Computer numerical control (CNC) robotics" }, { key: "D", text: "Steam bending presses" }], a: "C", exp: "Đoạn 2: 'precision-milled offsite using computer numerical control (CNC) robotics'." },
      { q: "By how much can prefabricated mass timber modular assembly reduce construction timelines?", opts: [{ key: "A", text: "Up to 10 percent" }, { key: "B", text: "Over 75 percent" }, { key: "C", text: "No change in timeline" }, { key: "D", text: "Up to 30 percent" }], a: "D", exp: "Đoạn 2: 'slashes on-site construction timelines by up to 30 percent'." },
      { q: "What physical mechanism provides mass timber with high fire resistance?", opts: [{ key: "A", text: "An exterior carbonized charcoal char layer that insulates the structural core" }, { key: "B", text: "Sprinkling chemical powders continuously" }, { key: "C", text: "Freezing the wood with liquid nitrogen" }, { key: "D", text: "Soaking the timber in salt water" }], a: "A", exp: "Đoạn 3: 'forming an insulating carbonized charcoal barrier that shields the inner structural core from heat penetration'." },
      { q: "At what predictable rate does thick mass timber char under fire exposure?", opts: [{ key: "A", text: "0.10 mm per minute" }, { key: "B", text: "Roughly 0.65 millimeters per minute" }, { key: "C", text: "5.0 mm per minute" }, { key: "D", text: "15 mm per minute" }], a: "B", exp: "Đoạn 3: 'the exterior surface chars at a predictable rate of roughly 0.65 millimeters per minute'." },
      { q: "Why is structural steel vulnerable during intense building fires?", opts: [{ key: "A", text: "It evaporates into gas" }, { key: "B", text: "It catches fire easily" }, { key: "C", text: "It rapidly buckles and loses structural load capacity above 500 degrees Celsius" }, { key: "D", text: "It freezes and shatters" }], a: "C", exp: "Đoạn 3: 'unlike steel beams that rapidly buckle and lose structural integrity above 500 degrees Celsius'." },
      { q: "How much carbon dioxide is sequestered in one cubic meter of sustainably harvested wood?", opts: [{ key: "A", text: "100 kilograms" }, { key: "B", text: "5 metric tons" }, { key: "C", text: "Zero carbon" }, { key: "D", text: "Approximately one metric ton of CO2" }], a: "D", exp: "Đoạn 3: 'approximately one metric ton of CO2 stored per cubic meter of wood'." },
      { q: "Which mass timber skyscrapers are highlighted as prominent architectural milestones?", opts: [{ key: "A", text: "Ascent Tower in Milwaukee and Mjøstårnet in Norway" }, { key: "B", text: "Empire State Building and Burj Khalifa" }, { key: "C", text: "Taipei 101 and Petronas Towers" }, { key: "D", text: "Shard in London and Eiffel Tower" }], a: "A", exp: "Đoạn 3: 'the 86-meter Ascent Tower in Milwaukee and the 85-meter Mjøstårnet in Norway'." },
      { q: "What is the primary conclusion of the text regarding mass timber architecture?", opts: [{ key: "A", text: "Wooden buildings will be banned worldwide within a decade" }, { key: "B", text: "Mass timber combines structural rigidity, fire resilience, rapid prefabricated assembly, and massive carbon sequestration to decarbonize global urbanization" }, { key: "C", text: "Steel and concrete are the only materials suitable for multistory construction" }, { key: "D", text: "Deforestation is the primary goal of mass timber" }], a: "B", exp: "Kết luận: Gỗ khối lớn kết hợp độ chịu lực cao, chống cháy tốt, đúc sẵn lắp ráp nhanh và lưu trữ carbon khổng lồ giúp giảm phát thải cho ngành xây dựng toàn cầu." }
    ];

    r1Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k5_q${idx + 41}`,
        partNumber: 5,
        partTitle: "Reading Passage 1: Mass Timber & Cross-Laminated Architecture",
        section: "READING",
        passageText: readP1,
        questionText: `Question ${idx + 41}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // READING PASSAGE 2: The Microbiome-Gut-Brain Axis (Q54 - Q66: 13 Questions)
    const readP2 = `READING PASSAGE 2 — THE INNER ECOSYSTEM: NEUROBIOLOGY OF THE GUT-BRAIN MICROBIOME AXIS\n\nFor centuries, classical neurobiology viewed the human brain as an isolated, sovereign command center governing bodily physiology via top-down electrical and neurochemical signaling. In the past two decades, however, high-throughput metagenomic sequencing has dismantled this reductionist dogma, revealing that our cognitive faculties, emotional resilience, and neuro-immune homeostasis are profoundly modulated by trillions of symbiotic microorganisms inhabiting the gastrointestinal tract—a bidirectional communication superhighway termed the Gut-Brain Microbiome Axis.\n\nThe human intestinal lumen houses over 100 trillion microbial cells, encompassing thousands of bacterial phylotypes that collectively possess 150 times more non-redundant genes than the human genome. This dense microbiome operates as a sophisticated neuro-endocrine bioreactor. Notably, over 90 percent of the body's total serotonin (a vital neurotransmitter regulating mood, circadian sleep cycles, and gut motility) and roughly 50 percent of dopamine are synthesized within the gut, heavily influenced by bacterial metabolic activity.\n\nCommunication between the intestinal microbiota and the central nervous system occurs through three primary conduits. The first is the vagus nerve—the longest cranial nerve in the body—which directly transmits bacterial sensory signals from the enteric nervous system to the brainstem. The second conduit involves microbial metabolic fermentation products, particularly Short-Chain Fatty Acids (SCFAs) such as acetate, propionate, and butyrate. SCFAs cross the blood-brain barrier to modulate microglia immune activation, stimulate neurotrophic factors (such as BDNF), and reinforce blood-brain barrier integrity. The third pathway operates via the immune-endocrine system, wherein microbial dysbiosis triggers systemic low-grade inflammation, elevating circulating pro-inflammatory cytokines that can precipitate major depressive disorders and neurodegenerative pathologies. Consequently, therapeutic interventions utilizing targeted 'psychobiotics'—specific probiotic strains designed to alleviate neurological dysfunction—represent a transformative frontier in clinical psychiatry.`;

    const r2Questions = [
      { q: "What paradigm shift occurred regarding the human brain in recent decades?", opts: [{ key: "A", text: "The brain operates completely without blood" }, { key: "B", text: "The human brain has stopped evolving" }, { key: "C", text: "Cognitive and emotional functions are bidirectional modulated by the gut microbiome axis" }, { key: "D", text: "Microbes cannot survive inside the human body" }], a: "C", exp: "Đoạn 1: 'our cognitive faculties, emotional resilience... are profoundly modulated by trillions of symbiotic microorganisms inhabiting the gastrointestinal tract'." },
      { q: "How many microbial cells inhabit the human gastrointestinal tract?", opts: [{ key: "A", text: "1 million" }, { key: "B", text: "100 million" }, { key: "C", text: "500 billion" }, { key: "D", text: "Over 100 trillion microbial cells" }], a: "D", exp: "Đoạn 2: 'The human intestinal lumen houses over 100 trillion microbial cells'." },
      { q: "How does the microbial gene count compare to the human genome?", opts: [{ key: "A", text: "Microbes possess 150 times more non-redundant genes than the human genome" }, { key: "B", text: "Microbes have fewer genes" }, { key: "C", text: "They share identical genes" }, { key: "D", text: "Microbes have only 5 genes" }], a: "A", exp: "Đoạn 2: 'possess 150 times more non-redundant genes than the human genome'." },
      { q: "What percentage of the body's total serotonin is synthesized in the gut?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "Over 90 percent" }, { key: "C", text: "50 percent" }, { key: "D", text: "100 percent in the brain only" }], a: "B", exp: "Đoạn 2: 'over 90 percent of the body's total serotonin'." },
      { q: "Approximately how much of the body's dopamine is produced in the gut?", opts: [{ key: "A", text: "5 percent" }, { key: "B", text: "85 percent" }, { key: "C", text: "Roughly 50 percent" }, { key: "D", text: "Zero" }], a: "C", exp: "Đoạn 2: 'roughly 50 percent of dopamine are synthesized within the gut'." },
      { q: "What is the longest cranial nerve connecting the enteric nervous system to the brainstem?", opts: [{ key: "A", text: "Optic nerve" }, { key: "B", text: "Sciatic nerve" }, { key: "C", text: "Auditory nerve" }, { key: "D", text: "The vagus nerve" }], a: "D", exp: "Đoạn 3: 'The first is the vagus nerve—the longest cranial nerve in the body'." },
      { q: "What are the three primary Short-Chain Fatty Acids (SCFAs) produced by gut fermentation?", opts: [{ key: "A", text: "Acetate, propionate, and butyrate" }, { key: "B", text: "Hydrochloric acid, sulfuric acid, and nitric acid" }, { key: "C", text: "Glucose, fructose, and sucrose" }, { key: "D", text: "Ethanol, methanol, and butanol" }], a: "A", exp: "Đoạn 3: 'particularly Short-Chain Fatty Acids (SCFAs) such as acetate, propionate, and butyrate'." },
      { q: "What neurotrophic factor is stimulated by Short-Chain Fatty Acids in the brain?", opts: [{ key: "A", text: "Insulin" }, { key: "B", text: "Brain-Derived Neurotrophic Factor (BDNF)" }, { key: "C", text: "Adrenaline" }, { key: "D", text: "Cortisol" }], a: "B", exp: "Đoạn 3: 'stimulate neurotrophic factors (such as BDNF)'." },
      { q: "What barrier's integrity is reinforced by microbial SCFAs?", opts: [{ key: "A", text: "Skin epidermis" }, { key: "B", text: "Retinal cornea" }, { key: "C", text: "The blood-brain barrier" }, { key: "D", text: "Stomach lining only" }], a: "C", exp: "Đoạn 3: 'reinforce blood-brain barrier integrity'." },
      { q: "What pathological consequence can arise from gut microbial dysbiosis?", opts: [{ key: "A", text: "Immediate hair loss" }, { key: "B", text: "Teeth decay only" }, { key: "C", text: "Sudden blindness" }, { key: "D", text: "Systemic low-grade inflammation elevating cytokines linked to depression and neurodegeneration" }], a: "D", exp: "Đoạn 3: 'microbial dysbiosis triggers systemic low-grade inflammation, elevating circulating pro-inflammatory cytokines'." },
      { q: "What term describes therapeutic probiotic strains engineered to treat mental health disorders?", opts: [{ key: "A", text: "Psychobiotics" }, { key: "B", text: "Antibiotics" }, { key: "C", text: "Chemotherapeutics" }, { key: "D", text: "Antihistamines" }], a: "A", exp: "Đoạn 3: 'targeted psychobiotics—specific probiotic strains designed to alleviate neurological dysfunction'." },
      { q: "What genomic technology enabled researchers to uncover the microbial ecosystem?", opts: [{ key: "A", text: "Handheld microscope" }, { key: "B", text: "High-throughput metagenomic sequencing" }, { key: "C", text: "Standard blood test" }, { key: "D", text: "Brain X-ray" }], a: "B", exp: "Đoạn 1: 'high-throughput metagenomic sequencing has dismantled this reductionist dogma'." },
      { q: "What is the primary message conveyed by the author?", opts: [{ key: "A", text: "The gut is merely a mechanical digestion organ" }, { key: "B", text: "All gut bacteria are harmful pathogens that must be eradicated" }, { key: "C", text: "The gut microbiome is a critical neurochemical command center that shapes brain health, emotional stability, and immune defense via bidirectional pathways" }, { key: "D", text: "Mental illnesses have no biological basis" }], a: "C", exp: "Thông điệp chính: Hệ vi sinh vật đường ruột là trung tâm điều hòa thần kinh thiết yếu, tác động hai chiều đến sức khỏe não bộ, cảm xúc và miễn dịch." }
    ];

    r2Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k5_q${idx + 54}`,
        partNumber: 6,
        partTitle: "Reading Passage 2: The Microbiome-Gut-Brain Axis",
        section: "READING",
        passageText: readP2,
        questionText: `Question ${idx + 54}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // READING PASSAGE 3: Solar Geoengineering & Stratospheric Aerosol Injection (Q67 - Q80: 14 Questions)
    const readP3 = `READING PASSAGE 3 — COOLING THE PLANET: THE SCIENCE AND ETHICS OF SOLAR GEOENGINEERING\n\nAs global greenhouse gas concentrations continue their upward trajectory, international climate scientists face an alarming reality: conventional mitigation (emission reductions) and carbon dioxide removal (CDR) may unfold too slowly to avert catastrophic tipping points, such as the collapse of West Antarctic ice sheets or the irreversible dieback of the Amazon rainforest. In response, an audacious and fiercely contested technological intervention has moved from theoretical science fiction into serious academic debate: Solar Radiation Management (SRM), most notably Stratospheric Aerosol Injection (SAI).\n\nThe conceptual foundation of SAI is drawn directly from natural volcanic analogues. When Mount Pinatubo erupted in the Philippines in June 1991, it injected approximately 17 million metric tons of sulfur dioxide (SO2) into the stratosphere. Over the following months, the gas reacted with atmospheric moisture to form reflective sulfate aerosol veils, increasing planetary albedo (reflectivity) by roughly 1 percent and causing global mean surface temperatures to drop by 0.5 degrees Celsius for over eighteen months without reducing industrial economic activity.\n\nTechnologically, replicating this cooling effect would require deploying a specialized fleet of high-altitude aircraft operating in the lower stratosphere at altitudes between 18 and 25 kilometers. These aircraft would disperse micro-droplets of sulfur dioxide, calcite (calcium carbonate), or engineered alumina nanoparticles. Modern climate models run on supercomputers indicate that injecting roughly 2 million tons of aerosol precursors annually could offset half of the warming caused by doubled atmospheric CO2 at an estimated direct cost of roughly 2 to 5 billion dollars per year—a fraction of the economic damages inflicted by unchecked climate disruption.\n\nHowever, solar geoengineering introduces profound planetary risks and ethical hazards. SAI only masks surface temperatures; it does nothing to halt ocean acidification caused by dissolved carbonic acid. Furthermore, altering stratospheric chemistry could delay the recovery of the polar ozone layer and disrupt regional monsoon precipitation patterns across South Asia and Sub-Saharan Africa, jeopardizing agricultural food security for billions. Perhaps most dangerously, SAI introduces the threat of 'termination shock': if a geoengineering deployment were abruptly halted due to war or technical failure, the accumulated greenhouse gases would trigger explosive, catastrophic warming at a rate ten times faster than natural climate change. Consequently, establishing an enforceable multilateral governance treaty before any field trials occur is considered a planetary imperative.`;

    const r3Questions = [
      { q: "What climate intervention is examined as an alternative to slow emission reductions?", opts: [{ key: "A", text: "Building giant sea walls" }, { key: "B", text: "Banning all fossil fuels overnight" }, { key: "C", text: "Moving humans underground" }, { key: "D", text: "Solar Radiation Management (SRM) via Stratospheric Aerosol Injection (SAI)" }], a: "D", exp: "Đoạn 1: 'Solar Radiation Management (SRM), most notably Stratospheric Aerosol Injection (SAI)'." },
      { q: "What natural event served as the scientific proof-of-concept for solar geoengineering?", opts: [{ key: "A", text: "The 1991 eruption of Mount Pinatubo in the Philippines" }, { key: "B", text: "The 2004 Indian Ocean tsunami" }, { key: "C", text: "The 1908 Tunguska meteor impact" }, { key: "D", text: "The 1980 Mount St. Helens eruption" }], a: "A", exp: "Đoạn 2: 'When Mount Pinatubo erupted in the Philippines in June 1991'." },
      { q: "How much sulfur dioxide did Mount Pinatubo inject into the stratosphere?", opts: [{ key: "A", text: "1 million tons" }, { key: "B", text: "Approximately 17 million metric tons of SO2" }, { key: "C", text: "50 million tons" }, { key: "D", text: "100 million tons" }], a: "B", exp: "Đoạn 2: 'injected approximately 17 million metric tons of sulfur dioxide (SO2)'." },
      { q: "By how much did Mount Pinatubo's aerosols lower global surface temperatures?", opts: [{ key: "A", text: "0.1 degrees Celsius" }, { key: "B", text: "2.0 degrees Celsius" }, { key: "C", text: "Global mean surface temperatures dropped by 0.5 degrees Celsius" }, { key: "D", text: "5.0 degrees Celsius" }], a: "C", exp: "Đoạn 2: 'causing global mean surface temperatures to drop by 0.5 degrees Celsius for over eighteen months'." },
      { q: "At what stratospheric altitudes would specialized aircraft operate for SAI?", opts: [{ key: "A", text: "1 to 5 kilometers" }, { key: "B", text: "10 to 12 kilometers" }, { key: "C", text: "Over 100 kilometers" }, { key: "D", text: "Between 18 and 25 kilometers" }], a: "D", exp: "Đoạn 3: 'operating in the lower stratosphere at altitudes between 18 and 25 kilometers'." },
      { q: "What materials besides sulfur dioxide are proposed as reflective aerosol precursors?", opts: [{ key: "A", text: "Calcite (calcium carbonate) or engineered alumina nanoparticles" }, { key: "B", text: "Plastic beads" }, { key: "C", text: "Sand and dirt" }, { key: "D", text: "Liquid chlorine" }], a: "A", exp: "Đoạn 3: 'disperse micro-droplets of sulfur dioxide, calcite (calcium carbonate), or engineered alumina nanoparticles'." },
      { q: "What is the estimated direct annual deployment cost for solar geoengineering?", opts: [{ key: "A", text: "100 million dollars" }, { key: "B", text: "Roughly 2 to 5 billion dollars per year" }, { key: "C", text: "1 trillion dollars" }, { key: "D", text: "50 trillion dollars" }], a: "B", exp: "Đoạn 3: 'at an estimated direct cost of roughly 2 to 5 billion dollars per year'." },
      { q: "What critical environmental crisis is NOT resolved by solar geoengineering?", opts: [{ key: "A", text: "Surface air warming" }, { key: "B", text: "Urban heat island effect" }, { key: "C", text: "Ocean acidification caused by dissolved carbonic acid" }, { key: "D", text: "Glacier melting" }], a: "C", exp: "Đoạn 4: 'SAI only masks surface temperatures; it does nothing to halt ocean acidification'." },
      { q: "What atmospheric layer could experience delayed recovery from sulfur injections?", opts: [{ key: "A", text: "Troposphere" }, { key: "B", text: "Ionosphere" }, { key: "C", text: "Exosphere" }, { key: "D", text: "The polar ozone layer" }], a: "D", exp: "Đoạn 4: 'could delay the recovery of the polar ozone layer'." },
      { q: "What regional weather systems might be disrupted by stratospheric aerosols?", opts: [{ key: "A", text: "Monsoon precipitation patterns across South Asia and Sub-Saharan Africa" }, { key: "B", text: "Tornadoes in North America only" }, { key: "C", text: "Winter blizzards in Siberia" }, { key: "D", text: "Hurricanes in the Atlantic" }], a: "A", exp: "Đoạn 4: 'disrupt regional monsoon precipitation patterns across South Asia and Sub-Saharan Africa'." },
      { q: "What catastrophic risk is known as 'termination shock'?", opts: [{ key: "A", text: "An earthquake triggered by aircraft" }, { key: "B", text: "Explosive, rapid warming occurring at 10x natural speed if SAI is abruptly halted" }, { key: "C", text: "Sudden loss of satellite communications" }, { key: "D", text: "Total darkness for 10 years" }], a: "B", exp: "Đoạn 4: 'accumulated greenhouse gases would trigger explosive, catastrophic warming at a rate ten times faster than natural climate change'." },
      { q: "What term describes the earth's solar reflectivity?", opts: [{ key: "A", text: "Permafrost" }, { key: "B", text: "Greenhouse effect" }, { key: "C", text: "Planetary albedo" }, { key: "D", text: "Thermal inertia" }], a: "C", exp: "Đoạn 2: 'increasing planetary albedo (reflectivity) by roughly 1 percent'." },
      { q: "What international prerequisite is deemed imperative before any deployment?", opts: [{ key: "A", text: "Private corporate ownership" }, { key: "B", text: "Military defense contracts" }, { key: "C", text: "Elimination of all aircraft regulations" }, { key: "D", text: "An enforceable multilateral governance treaty" }], a: "D", exp: "Đoạn 4: 'establishing an enforceable multilateral governance treaty before any field trials occur is considered a planetary imperative'." },
      { q: "What is the overall tone of the author regarding solar geoengineering?", opts: [{ key: "A", text: "Analytical and cautionary: acknowledging potential emergency cooling benefits while warning of severe ecological, meteorological, and geopolitical risks" }, { key: "B", text: "Uncritically enthusiastic without caveats" }, { key: "C", text: "Completely dismissive and conspiracy-driven" }, { key: "D", text: "Indifferent" }], a: "A", exp: "Thái độ tác giả: Phân tích thận trọng, thừa nhận tiềm năng hạ nhiệt khẩn cấp nhưng cảnh báo sâu sắc về rủi ro sinh thái, gió mùa và địa chính trị." }
    ];

    r3Questions.forEach((item, idx) => {
      qs.push({
        id: `ia4k5_q${idx + 67}`,
        partNumber: 7,
        partTitle: "Reading Passage 3: Solar Radiation Geoengineering",
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
      id: "ia4k5_q81",
      partNumber: 8,
      partTitle: "IELTS Speaking Part 1: Smart Urban Architecture & Sustainable Cities",
      section: "SPEAKING",
      speakingPrompt:
        "1. What types of buildings do you find most architecturally appealing in your city?\n2. Do you prefer living in modern high-rise apartments or traditional standalone houses?\n3. How can cities incorporate more green spaces and energy-efficient building materials?\n4. Do you think historical heritage buildings should be preserved at all costs?",
      preparationTimeSeconds: 15,
      speakingTimeSeconds: 60,
      questionText:
        "Question 81 (Speaking Part 1): Answer interview questions on architecture, urban design, and heritage preservation (60 seconds).",
      options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "View Band 8.5+ Architecture Vocabulary" },
            { key: "C", text: "Listen to Native Examiner Questions" },
            { key: "D", text: "Skip to Cue Card" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT PART 1 - DIRECT ANSWER + EXTENSION]
- Trả lời trực tiếp và mở rộng 2-3 câu bằng từ vựng chỉ kiến trúc bền vững, quy hoạch đô thị và bảo tồn di sản.
- Sử dụng các liên từ chỉ sự tương phản và phát triển ý.

🔍 [BÀI NÓI MẪU BAND 8.5+]
"I am particularly drawn to biophilic contemporary architecture—buildings that seamlessly integrate living green facades, natural timber accents, and abundant daylighting.

Personally, I prefer living in high-rise eco-apartments. Beyond offering panoramic urban vistas, modern complexes often feature integrated rooftop solar panels and centralized rainwater harvesting systems that significantly lower ecological footprints.

To foster sustainability, municipal governments should mandate mass-timber construction and passive solar heating in commercial building codes while expanding rooftop community gardens.

Regarding historic landmarks, I firmly believe they should be meticulously preserved. Heritage structures embody cultural identity and architectural craftsmanship that cannot be replicated by modern glass monoliths."

💡 [TỪ VỰNG THEN CHỐT]
- Biophilic architecture /ˌbaɪ.oʊˈfɪl.ɪk ˈɑːr.kə.tek.tʃɚ/ (n): Kiến trúc ưa sinh học, hòa nhập thiên nhiên
- Living green facades /ˈlɪv.ɪŋ ɡriːn fəˈsɑːdz/ (n): Mặt tiền phủ cây xanh
- Passive solar heating /ˈpæs.ɪv ˈsoʊ.lɚ ˈhiː.t̬ɪŋ/ (n): Hệ thống sưởi nhiệt mặt trời thụ động
- Cultural identity /ˈkʌl.tʃɚ.əl aɪˈden.t̬ə.t̬i/ (n): Bản sắc văn hóa.`
    });

    qs.push({
      id: "ia4k5_q82",
      partNumber: 9,
      partTitle: "IELTS Speaking Part 2: Cue Card — An Iconic Architectural Wonder",
      section: "SPEAKING",
      speakingPrompt:
        "Describe a famous building or architectural structure that you admire.\nYou should say:\n• Where this building or structure is located\n• What it looks like and what materials were used in its construction\n• What purpose or function it serves\nAnd explain why you admire this particular architectural masterpiece.",
      preparationTimeSeconds: 60,
      speakingTimeSeconds: 120,
      questionText:
        "Question 82 (Speaking Part 2): Deliver a continuous 2-minute speech describing an iconic architectural structure.",
      options: [
            { key: "A", text: "View 1-Minute Note-Taking Template" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3" }
          ],
      correctAnswer: "B",
      explanation: `🎯 [CHIẾN THUẬT 1 PHÚT GHI CHÚ (THE 4-BOX METHOD)]
- Box 1 (Structure/Location): The Millau Viaduct (Viaduc de Millau) / Tarn Valley in Southern France, designed by Michel Virlogeux & Lord Norman Foster.
- Box 2 (Appearance/Materials): Cable-stayed bridge spanning 2.46 km, tallest pylon 343 meters (taller than Eiffel Tower), sleek white steel masts and aerodynamic concrete piers.
- Box 3 (Function): Carries the A75 autoroute from Paris to Barcelona, alleviating summer traffic congestion.
- Box 4 (Admiration): Flawless fusion of structural civil engineering and aesthetic elegance; appears to float above the morning cloud inversion.

🔍 [BÀI NÓI MẪU BAND 9.0 (240+ TỪ)]
"I would like to speak about an awe-inspiring civil engineering marvel: the Millau Viaduct, located across the gorge of the Tarn River in southern France.

Designed through a collaborative partnership between French structural engineer Michel Virlogeux and renowned British architect Lord Norman Foster, this cable-stayed bridge was inaugurated in 2004.

Visually, the structure is breathtakingly elegant. It spans nearly two and a half kilometers across the deep valley, supported by seven slender concrete piers that soar above the landscape. Its tallest mast reaches a staggering 343 meters, making it slightly taller than the Eiffel Tower. What renders it architecturally remarkable is its aerodynamic steel deck, engineered with an inverted airfoil cross-section to withstand gale-force winds while presenting an astonishingly delicate, cloud-piercing silhouette.

The bridge serves a critical logistical function, linking the A75 motorway between Paris and Barcelona to eliminate notorious summer holiday traffic bottlenecks in the valley below.

What I admire most about the Millau Viaduct is its harmonious synthesis of brute structural prowess and poetic minimalism. When morning fog settles into the Tarn gorge, the viaduct appears to hover weightlessly above a sea of white clouds, demonstrating how human infrastructure can elevate rather than despoil natural topography."

💡 [TỪ VỰNG THEN CHỐT]
- Cable-stayed bridge /ˈkeɪ.bəl steɪd brɪdʒ/ (n): Cầu dây văng
- Aerodynamic steel deck /ˌer.oʊ.daɪˈnæm.ɪk stiːl dek/ (n): Mặt cầu thép khí động học
- Cloud-piercing silhouette /klaʊd ˈpɪr.sɪŋ ˌsɪl.uˈet/ (n): Hình bóng xé toang mây trời
- Harmonious synthesis /hɑːrˈmoʊ.ni.əs ˈsɪn.θə.sɪs/ (n): Sự tổng hòa ăn khớp tuyệt đối.`
    });

    qs.push({
      id: "ia4k5_q83",
      partNumber: 10,
      partTitle: "IELTS Speaking Part 3: Climate Geoengineering & Planetary Stewardship",
      section: "SPEAKING",
      speakingPrompt:
        "1. Should humanity risk deploying planetary solar geoengineering to cool the planet if climate tipping points are breached?\n2. What are the potential ethical and geopolitical conflicts associated with one country unilaterally altering the global climate?\n3. How can the international community enforce binding environmental treaties on sovereign nations?",
      preparationTimeSeconds: 20,
      speakingTimeSeconds: 90,
      questionText:
        "Question 83 (Speaking Part 3): Provide balanced, high-level academic arguments on geoengineering risks and international governance.",
      options: [
            { key: "A", text: "Review Discourse Markers" },
            { key: "B", text: "Check Band 9 Academic Vocabulary" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Complete Speaking Section" }
          ],
      correctAnswer: "C",
      explanation: `🎯 [CHIẾN THUẬT PART 3 - CẤU TRÚC PHÂN TÍCH ĐA CHIỀU]
- Nêu rõ lập trường: Coi địa kỹ thuật mặt trời là biện pháp khẩn cấp cuối cùng (last-resort emergency measure), không thể thay thế việc cắt giảm khí thải.
- Phân tích rủi ro đạo đức (moral hazard) và nguy cơ xung đột địa chính trị đơn phương (unilateral geoengineering).
- Đề xuất giải pháp quản trị đa phương của Liên Hợp Quốc.

🔍 [BÀI NÓI MẪU BAND 9.0 (90 GIÂY)]
"The debate surrounding solar radiation management encapsulates one of the most perilous ethical dilemmas of our era. While solar geoengineering could theoretically offer rapid thermal relief to prevent irreversible glacial collapse, it treats only the symptomatic fever rather than the underlying disease of atmospheric carbon saturation.

The primary hazard is geopolitical: if a single technologically advanced superpower unilaterally injects aerosols into the stratosphere, it could unpredictably disrupt monsoon rainfall in neighboring agricultural regions, potentially triggering cross-border resource conflicts.

Furthermore, relying on geoengineering creates a dangerous moral hazard, disincentivizing fossil fuel decarbonization under the false illusion of a quick technological fix.

Therefore, the global community must establish a robust multilateral governance framework under the United Nations to impose strict moratoriums on unilateral field deployment until comprehensive consensus and fail-safe oversight are guaranteed."

💡 [TỪ VỰNG THEN CHỐT]
- Perilous ethical dilemma /ˈper.əl.əs ˈeθ.ɪ.kəl daɪˈlem.ə/ (n): Tình thế tiến thoái lưỡng nan về đạo đức
- Symptomatic fever /ˌsɪmp.təˈmæt̬.ɪk ˈfiː.vɚ/ (n): Cơn sốt triệu chứng bề ngoài
- Moral hazard /ˈmɔːr.əl ˈhæz.ɚd/ (n): Rủi ro đạo đức (chủ quan ỷ lại)
- Strict moratorium /strɪkt ˌmɔːr.əˈtɔːr.i.əm/ (n): Lệnh đình chỉ / tạm hoãn nghiêm ngặt.`
    });

    // IELTS WRITING AI (Q84 - Q85: TASK 1 & TASK 2)
    qs.push({
      id: "ia4k5_q84",
      partNumber: 11,
      partTitle: "IELTS Writing Task 1: Academic Report (Process Flow Diagram & Life-Cycle Carbon Balance)",
      section: "WRITING",
      writingPrompt:
        "The diagram below illustrates the industrial manufacturing process of Cross-Laminated Timber (CLT) and its lifecycle carbon footprint compared to traditional concrete production. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Time suggested: 20 minutes).",
      minWordCount: 150,
      sampleEssay: `The provided flow diagram delineates the multi-stage industrial manufacturing process of Cross-Laminated Timber (CLT) from sustainably harvested forestry to prefabricated building components, while contrasting its lifecycle carbon sequestration against traditional concrete production.

Overall, the CLT production sequence is an automated, low-waste linear manufacturing process comprising harvesting, timber conditioning, orthogonal layering, and robotic milling. Crucially, while conventional concrete manufacturing generates massive net carbon emissions, the mass timber lifecycle functions as a carbon-negative sink, sequestering atmospheric CO2 throughout the lifespan of the building.

The process commences with the harvesting of certified sustainable softwood timber (such as spruce or pine). The raw logs are debarked, sawn into uniform dimensional planks, and transferred to computerized kilns for moisture drying to achieve a standardized moisture content of 12%. Following drying, visual and ultrasonic stress grading eliminates defective wood.

In the assembly phase, the conditioned lumber boards are coated with non-toxic polyurethane adhesives and arranged in alternating perpendicular layers (at 90-degree angles). The composite stack is subsequently subjected to high-tonnage hydraulic or vacuum pressing to form monolithic solid panels. Finally, multi-axis CNC robotic cutters precision-mill window apertures, doorways, and joint connections with millimeter tolerance. From a lifecycle perspective, each cubic meter of CLT sequesters approximately 1,000 kg of atmospheric CO2, in stark contrast to concrete, which releases nearly 400 kg of net CO2 per cubic meter during cement calcination.`,
      questionText:
        "Question 84 (Writing Task 1): Write an academic report analyzing the industrial CLT manufacturing process and carbon balance (min 150 words).",
      options: [
            { key: "A", text: "Check Cambridge Band 9 Scoring Rubric" },
            { key: "B", text: "Review Industrial Process Connectors" },
            { key: "C", text: "Skip to Task 2" },
            { key: "D", text: "Submit Task 1 Report for Gemini AI Evaluation" }
          ],
      correctAnswer: "D",
      explanation: `🎯 [CHIẾN THUẬT BÁO CÁO QUY TRÌNH KỸ THUẬT - BAND 9.0]
1. Task Achievement:
   - Miêu tả tuần tự các giai đoạn: Khai thác gỗ thông bền vững ➔ Sấy lò 12% độ ẩm ➔ Phân loại siêu âm ➔ Bôi keo & Xếp lớp vuông góc 90 độ ➔ Ép thủy lực ➔ Cắt CNC robot.
   - So sánh vòng đời carbon: Gỗ CLT lưu trữ 1.000 kg CO2/m³ (carbon-negative) đối nghịch hoàn toàn với bê tông phát thải 400 kg CO2/m³.

2. Lexical Resource (Band 9.0):
   - "delineates the multi-stage industrial manufacturing process", "orthogonal layering", "carbon-negative sink", "cement calcination", "precision-mill window apertures".`
    });

    qs.push({
      id: "ia4k5_q85",
      partNumber: 12,
      partTitle: "IELTS Writing Task 2: Academic Discursive Essay",
      section: "WRITING",
      writingPrompt:
        "Some climate scientists advocate deploying planetary solar radiation geoengineering technologies (such as injecting reflective aerosols into the stratosphere) as an emergency measure to cool the Earth. Others argue that geoengineering is fraught with unpredictable ecological dangers and that all resources must focus solely on rapid decarbonization and fossil fuel phase-out. Discuss both views and give your own opinion. (Write at least 250 words. Time suggested: 40 minutes).",
      minWordCount: 250,
      sampleEssay: `As atmospheric greenhouse gas concentrations escalate toward perilous ecological tipping points, the debate over whether humanity should deploy solar radiation geoengineering has ignited fierce controversy across scientific and policy circles. While proponents champion stratospheric aerosol injection as an essential emergency brake against catastrophic global warming, opponents caution that altering atmospheric chemistry entails unpredictable planetary hazards. In this essay, I will examine both perspectives before arguing that while emissions abatement must remain humanity's primary objective, strictly regulated geoengineering research represents a prudent defensive contingency.

On the one hand, advocates of solar geoengineering emphasize the catastrophic urgency of impending climate thresholds. The irreversible collapse of polar ice sheets and the thawing of Siberian permafrost could release gigatons of trapped methane, triggering runaway warming beyond human control. In such an extreme scenario, stratospheric aerosol injection—mimicking the natural global cooling observed after the 1991 Mount Pinatubo eruption—offers the only known mechanism capable of reducing global mean temperatures within months rather than decades. Furthermore, computer modeling indicates that the direct financial cost of deploying aerosol-dispersing aircraft is remarkably modest compared to the trillions of dollars in economic devastation wrought by unchecked hurricanes, droughts, and sea-level rise.

On the other hand, critics legitimately argue that solar geoengineering introduces profound ecological and geopolitical vulnerabilities. Stratospheric aerosols merely mask surface temperatures; they do nothing to address ocean acidification, which threatens the foundational food webs of marine ecosystems. Crucially, modifying atmospheric albedo could disrupt delicate regional monsoon precipitation patterns in South Asia and Africa, potentially triggering widespread agricultural collapse. Moreover, geoengineering creates a dangerous moral hazard, providing multinational fossil fuel corporations with an excuse to delay decarbonization. The menace of 'termination shock'—wherein an abrupt cessation of aerosol deployment would cause temperatures to spike catastrophically—further highlights the existential risks involved.

In conclusion, while solar radiation management poses genuine ecological perils and must never serve as a substitute for decarbonization, dismissing it entirely is equally reckless in the face of potential climate catastrophe. The international community should establish a transparent multilateral governance treaty to conduct controlled scientific research, maintaining solar geoengineering exclusively as a regulated, last-resort emergency shield while accelerating the global transition to renewable energy.`,
      questionText:
        "Question 85 (Writing Task 2): Write a 250+ word academic essay on solar geoengineering vs rapid decarbonization mandates.",
      options: [
            { key: "A", text: "Submit Task 2 Essay for Gemini AI Evaluation" },
            { key: "B", text: "Review Discuss Both Views Paragraphing" },
            { key: "C", text: "Check CEFR C2 Vocabulary List" },
            { key: "D", text: "Complete Full IELTS Test" }
          ],
      correctAnswer: "A",
      explanation: `🎯 [CHIẾN THUẬT BÀI LUẬN BAND 9.0 DẠNG DISCUSS BOTH VIEWS]
1. Task Response:
   - Thân bài 1: Phân tích lập luận ủng hộ địa kỹ thuật mặt trời (hạ nhiệt khẩn cấp trong vài tháng, cứu các điểm bùng phát băng tan permafrost, chi phí tài chính thấp).
   - Thân bài 2: Phân tích lập luận phản đối (không giải quyết axit hóa đại dương, rối loạn gió mùa, rủi ro sốc chấm dứt termination shock và nguy cơ ỷ lại moral hazard).
   - Quan điểm cá nhân: Cắt giảm khí thải là ưu tiên số 1, nhưng duy trì nghiên cứu có kiểm soát quốc tế như một lá chắn khẩn cấp cuối cùng.

2. Lexical Resource (C2 Academic):
   - "perilous ecological tipping points", "stratospheric aerosol injection", "runaway warming", "termination shock", "existential risks", "multilateral governance treaty".`
    });

    return qs;
  })()
};
