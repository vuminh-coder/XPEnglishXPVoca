import { ExamPaper, ExamQuestion } from "./types";

export const ieltsRsStudio01Paper: ExamPaper = {
  id: "ielts_rs_studio_01",
  title: "IELTS Reading & Speaking Academic Duo #01",
  type: "IELTS_FULL",
  level: "Advanced",
  timeLimitMinutes: 75,
  totalQuestions: 43,
  maxScore: 9.0,
  description: "Tron bo ket hop 2 Ky nang Doc & Noi AI hoc thuat (Reading & Speaking Duo): 40 cau Reading (Hai luu Atlantic AMOC, Ngon ngu Neanderthal, Sieu do thi noi Oceanix) va 3 Phan Speaking AI (Do thi noi, Bien doi khi hau dai duong, Tai dinh cu dan cu ven bien).",
  categoryBadge: "IELTS Academic",
  tags: ["IELTS", "Reading & Speaking", "Academic"],
  supportedSkills: ["READING", "SPEAKING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
    // READING PASSAGE 1: AMOC & Climate Tipping Points (Q1-Q13)
    // =========================================================================
    const readP1 = `ACADEMIC READING PASSAGE 1 - THE ATLANTIC MERIDIONAL OVERTURNING CIRCULATION (AMOC) AND CLIMATE TIPPING POINTS\n\nThe Atlantic Meridional Overturning Circulation (AMOC) functions as the planetary conveyor belt of thermal energy, transporting vast quantities of warm, saline equatorial surface waters northward into the subpolar North Atlantic. As these waters reach the Arctic fringe, atmospheric cooling increases their density, causing them to sink into the abyss - a process known as deep-water formation - and travel southward along the ocean floor at depths exceeding 3,000 meters.\n\nPaleoclimatological ice core proxies indicate that during the Quaternary period, abrupt disruptions to the AMOC triggered rapid hemispheric cooling events known as Dansgaard-Oeschger events within mere decades. The Younger Dryas cold period, approximately 12,800 years ago, saw temperatures plummet by 7 degrees Celsius in Greenland within a single century, likely caused by catastrophic freshwater discharge from glacial Lake Agassiz into the North Atlantic.\n\nToday, accelerated meltwater discharge from the Greenland ice sheet introduces massive volumes of buoyant freshwater into the subpolar gyre, reducing surface salinity by 0.02 practical salinity units per decade and progressively inhibiting convective sinking. Since 2004, the RAPID monitoring array deployed at 26.5 degrees North latitude has measured a 15 percent weakening of the AMOC overturning strength.\n\nClimate models project that a persistent weakening or collapse of the AMOC would destabilize the West African monsoon affecting 400 million people, accelerate sea-level rise along North American coastlines by an additional 50 centimeters, shift the Intertropical Convergence Zone southward disrupting Amazon rainfall, and profoundly disrupt global agricultural stability. The IPCC Sixth Assessment Report classifies AMOC collapse as a low-likelihood but high-impact tipping point, with a potential trigger threshold at 1.5 to 2.0 degrees of global warming.`;

    const r1Qs = [
      { q: "What does the AMOC transport northward?", opts: [{ key: "A", text: "Cold polar ice meltwater" }, { key: "B", text: "Deep-sea sediment deposits" }, { key: "C", text: "Volcanic mineral nutrients" }, { key: "D", text: "Warm, saline equatorial surface waters" }], a: "D", exp: "AMOC van chuyen: 'warm, saline equatorial surface waters northward'." },
      { q: "At what depth do sinking waters travel along the ocean floor?", opts: [{ key: "A", text: "Over 3,000 meters" }, { key: "B", text: "500 meters" }, { key: "C", text: "1,500 meters" }, { key: "D", text: "10,000 meters" }], a: "A", exp: "Do sau: 'depths exceeding 3,000 meters'." },
      { q: "What are the rapid cooling events triggered by AMOC disruptions called?", opts: [{ key: "A", text: "El Nino oscillations" }, { key: "B", text: "Dansgaard-Oeschger events" }, { key: "C", text: "Milankovitch cycles" }, { key: "D", text: "Heinrich events" }], a: "B", exp: "Ten su kien: 'Dansgaard-Oeschger events'." },
      { q: "How many degrees did temperatures drop in Greenland during the Younger Dryas?", opts: [{ key: "A", text: "3 degrees Celsius" }, { key: "B", text: "5 degrees Celsius" }, { key: "C", text: "7 degrees Celsius" }, { key: "D", text: "12 degrees Celsius" }], a: "C", exp: "Muc giam: 'temperatures plummet by 7 degrees Celsius'." },
      { q: "What glacial lake likely caused the Younger Dryas cooling?", opts: [{ key: "A", text: "Lake Baikal" }, { key: "B", text: "Lake Superior" }, { key: "C", text: "Lake Vostok" }, { key: "D", text: "Lake Agassiz" }], a: "D", exp: "Ho: 'freshwater discharge from glacial Lake Agassiz'." },
      { q: "By how much is surface salinity declining per decade?", opts: [{ key: "A", text: "0.02 units" }, { key: "B", text: "0.005 units" }, { key: "C", text: "0.1 units" }, { key: "D", text: "0.5 units" }], a: "A", exp: "Do muoi: 'reducing surface salinity by 0.02 practical salinity units per decade'." },
      { q: "What percentage weakening has RAPID measured since 2004?", opts: [{ key: "A", text: "5 percent" }, { key: "B", text: "15 percent" }, { key: "C", text: "10 percent" }, { key: "D", text: "25 percent" }], a: "B", exp: "Muc suy yeu: '15 percent weakening'." },
      { q: "At what latitude is the RAPID monitoring array deployed?", opts: [{ key: "A", text: "10 degrees North" }, { key: "B", text: "45 degrees North" }, { key: "C", text: "26.5 degrees North" }, { key: "D", text: "60 degrees North" }], a: "C", exp: "Vi do: '26.5 degrees North latitude'." },
      { q: "How much additional sea-level rise could AMOC collapse cause on North American coasts?", opts: [{ key: "A", text: "10 centimeters" }, { key: "B", text: "25 centimeters" }, { key: "C", text: "100 centimeters" }, { key: "D", text: "50 centimeters" }], a: "D", exp: "Muc tang: 'an additional 50 centimeters'." },
      { q: "How many people would be affected by West African monsoon destabilization?", opts: [{ key: "A", text: "400 million" }, { key: "B", text: "50 million" }, { key: "C", text: "200 million" }, { key: "D", text: "1 billion" }], a: "A", exp: "So nguoi: 'affecting 400 million people'." },
      { q: "How does the IPCC classify AMOC collapse risk?", opts: [{ key: "A", text: "High-likelihood, low-impact" }, { key: "B", text: "Low-likelihood, high-impact" }, { key: "C", text: "Medium-likelihood, medium-impact" }, { key: "D", text: "Certain to occur by 2050" }], a: "B", exp: "Phan loai: 'low-likelihood but high-impact tipping point'." },
      { q: "What is the warming threshold for AMOC collapse?", opts: [{ key: "A", text: "0.5 to 1.0 degrees" }, { key: "B", text: "3.0 to 4.0 degrees" }, { key: "C", text: "1.5 to 2.0 degrees" }, { key: "D", text: "5.0 degrees" }], a: "C", exp: "Nguong: '1.5 to 2.0 degrees of global warming'." },
      { q: "What process causes Atlantic waters to sink at the Arctic fringe?", opts: [{ key: "A", text: "Tidal forces" }, { key: "B", text: "Volcanic heating" }, { key: "C", text: "Wind-driven upwelling" }, { key: "D", text: "Deep-water formation driven by density increase" }], a: "D", exp: "Qua trinh: 'atmospheric cooling increases their density, causing them to sink - deep-water formation'." }
    ];

    r1Qs.forEach((item, idx) => {
      qs.push({ id: `irsc1_q${idx + 1}`, partNumber: 1, partTitle: "Reading Passage 1: AMOC & Climate Tipping Points", section: "READING", passageText: readP1, questionText: `Question ${idx + 1}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // READING PASSAGE 2: Neanderthal Language Evolution (Q14-Q26)
    // =========================================================================
    const readP2 = `ACADEMIC READING PASSAGE 2 - THE LINGUISTIC CAPACITY OF NEANDERTHALS: EVIDENCE AND CONTROVERSY\n\nFor decades, the dominant scientific narrative portrayed Neanderthals (Homo neanderthalensis) as cognitively inferior hominins incapable of symbolic thought or articulate speech. However, a convergence of archaeological, genetic, and anatomical discoveries over the past two decades has fundamentally challenged this characterization.\n\nThe discovery in 2007 of the FOXP2 gene variant in Neanderthal DNA extracted from the El Sidron cave in northern Spain was pivotal. FOXP2 is the only gene currently identified as directly associated with human speech production and syntactic language processing. The Neanderthal variant was found to be identical to the modern human version at the two critical amino acid positions (T303N and N325S), strongly suggesting that Neanderthals possessed the fundamental genetic infrastructure for speech articulation.\n\nAnatomical evidence further supports this hypothesis. A remarkably preserved hyoid bone - the delicate horseshoe-shaped bone that anchors the tongue and laryngeal muscles essential for vocalization - was recovered from the Kebara Cave burial site in Israel, dating to approximately 60,000 years ago. Micro-CT scanning revealed that the Kebara hyoid is virtually indistinguishable in morphology, internal microarchitecture, and biomechanical properties from modern human hyoid bones.\n\nPerhaps the most compelling indirect evidence comes from Neanderthal symbolic behaviour. The elaborate cave paintings discovered at three Spanish sites - La Pasiega, Maltravieso, and Ardales - have been dated using uranium-thorium methods to at least 65,000 years ago, predating the arrival of Homo sapiens in Europe by approximately 20,000 years. Such symbolic artistic expression implies sophisticated cognitive planning and potentially narrative communication.\n\nSkeptics counter that anatomical capability does not prove linguistic complexity. Professor Philip Lieberman of Brown University has argued through computational vocal tract modelling that the Neanderthal larynx position would have restricted vowel production to a limited set of approximately three vowel sounds, severely constraining phonetic diversity compared to modern human language.`;

    const r2Qs = [
      { q: "What gene is directly associated with human speech production?", opts: [{ key: "A", text: "FOXP2" }, { key: "B", text: "BRCA1" }, { key: "C", text: "TP53" }, { key: "D", text: "APOE" }], a: "A", exp: "Gen: 'FOXP2 gene variant... directly associated with human speech production'." },
      { q: "Where was the Neanderthal FOXP2 gene discovered?", opts: [{ key: "A", text: "Kebara Cave, Israel" }, { key: "B", text: "El Sidron Cave, Spain" }, { key: "C", text: "Lascaux Cave, France" }, { key: "D", text: "Denisova Cave, Russia" }], a: "B", exp: "Dia diem: 'El Sidron cave in northern Spain'." },
      { q: "What bone was found at Kebara Cave that supports the speech hypothesis?", opts: [{ key: "A", text: "Femur bone" }, { key: "B", text: "Cranial fragment" }, { key: "C", text: "Hyoid bone" }, { key: "D", text: "Mandible" }], a: "C", exp: "Xuong: 'A remarkably preserved hyoid bone'." },
      { q: "How old is the Kebara Cave hyoid bone?", opts: [{ key: "A", text: "20,000 years" }, { key: "B", text: "40,000 years" }, { key: "C", text: "100,000 years" }, { key: "D", text: "60,000 years" }], a: "D", exp: "Tuoi: 'approximately 60,000 years ago'." },
      { q: "What scanning technique was used on the hyoid bone?", opts: [{ key: "A", text: "Micro-CT scanning" }, { key: "B", text: "MRI scanning" }, { key: "C", text: "Ultrasound imaging" }, { key: "D", text: "X-ray diffraction" }], a: "A", exp: "Ky thuat: 'Micro-CT scanning'." },
      { q: "How old are the Spanish cave paintings?", opts: [{ key: "A", text: "20,000 years" }, { key: "B", text: "65,000 years" }, { key: "C", text: "40,000 years" }, { key: "D", text: "100,000 years" }], a: "B", exp: "Tuoi: 'at least 65,000 years ago'." },
      { q: "By how many years did the paintings predate Homo sapiens in Europe?", opts: [{ key: "A", text: "5,000 years" }, { key: "B", text: "10,000 years" }, { key: "C", text: "20,000 years" }, { key: "D", text: "50,000 years" }], a: "C", exp: "Khoang cach: 'predating... by approximately 20,000 years'." },
      { q: "What dating method was used for the cave paintings?", opts: [{ key: "A", text: "Carbon-14 dating" }, { key: "B", text: "Potassium-argon dating" }, { key: "C", text: "Thermoluminescence" }, { key: "D", text: "Uranium-thorium dating" }], a: "D", exp: "Phuong phap: 'uranium-thorium methods'." },
      { q: "Name one of the three Spanish cave painting sites.", opts: [{ key: "A", text: "La Pasiega" }, { key: "B", text: "Altamira" }, { key: "C", text: "Chauvet" }, { key: "D", text: "Cosquer" }], a: "A", exp: "Dia diem: 'La Pasiega, Maltravieso, and Ardales'." },
      { q: "Who argued against Neanderthal linguistic complexity?", opts: [{ key: "A", text: "Professor Steven Pinker" }, { key: "B", text: "Professor Philip Lieberman" }, { key: "C", text: "Professor Noam Chomsky" }, { key: "D", text: "Dr. Svante Paabo" }], a: "B", exp: "Nguoi phan bac: 'Professor Philip Lieberman of Brown University'." },
      { q: "How many vowel sounds could Neanderthals produce according to skeptics?", opts: [{ key: "A", text: "Approximately seven" }, { key: "B", text: "Approximately twelve" }, { key: "C", text: "Approximately three" }, { key: "D", text: "The full modern range" }], a: "C", exp: "So nguyen am: 'limited set of approximately three vowel sounds'." },
      { q: "What does symbolic cave art imply about Neanderthal cognition?", opts: [{ key: "A", text: "They copied Homo sapiens artwork" }, { key: "B", text: "Random accidental marks" }, { key: "C", text: "Religious worship practices only" }, { key: "D", text: "Sophisticated cognitive planning and narrative communication" }], a: "D", exp: "Ham y: 'implies sophisticated cognitive planning and potentially narrative communication'." },
      { q: "At which amino acid positions is the FOXP2 gene identical between Neanderthals and modern humans?", opts: [{ key: "A", text: "T303N and N325S" }, { key: "B", text: "T100N and N200S" }, { key: "C", text: "A404G and C505T" }, { key: "D", text: "G600A and T700C" }], a: "A", exp: "Vi tri: 'T303N and N325S'." }
    ];

    r2Qs.forEach((item, idx) => {
      qs.push({ id: `irsc1_q${idx + 14}`, partNumber: 2, partTitle: "Reading Passage 2: Neanderthal Language", section: "READING", passageText: readP2, questionText: `Question ${idx + 14}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // READING PASSAGE 3: Floating Cities - Oceanix & Climate Adaptation (Q27-Q40)
    // =========================================================================
    const readP3 = `ACADEMIC READING PASSAGE 3 - FLOATING METROPOLISES: OCEANIX AND THE ARCHITECTURE OF CLIMATE ADAPTATION\n\nWith an estimated 800 million people worldwide living in coastal zones vulnerable to sea-level rise exceeding one meter by 2100, the concept of self-sustaining floating cities has evolved from science fiction into a legitimate field of urban engineering research. The most advanced proposal, Oceanix City, was formally endorsed by the United Nations Human Settlements Programme (UN-Habitat) in 2019.\n\nDesigned by Danish architect Bjarke Ingels of BIG (Bjarke Ingels Group) in collaboration with MIT's Center for Ocean Engineering, Oceanix City envisions modular hexagonal floating platforms, each accommodating 300 residents across 2 hectares of living space. Six platforms interlock to form a village of 1,800 residents, and six villages compose a complete floating city of 10,800 inhabitants.\n\nThe structural foundation utilizes Biorock technology - an electrodeposition process that accumulates calcium carbonate mineral accretions on submerged steel frames, growing limestone structures three times stronger than conventional reinforced concrete while self-repairing cracks through continuous mineral deposition. The platforms achieve zero-waste certification through closed-loop pneumatic waste collection, atmospheric water generators producing 2,000 litres of freshwater daily per platform, and vertical hydroponic urban farms yielding 10 times more food per square meter than conventional soil agriculture.\n\nEnergy independence is achieved through 5,000 square meters of photovoltaic solar canopies per platform generating 1.4 megawatts, supplemented by tidal turbines and ocean thermal energy conversion (OTEC) systems exploiting the 20-degree temperature differential between surface and deep ocean water.\n\nCritics identify several engineering challenges. Professor Tetsuya Ishida of Tokyo University has calculated that Category 5 hurricane-force waves exceeding 15 meters could exceed the structural moorings' tensile capacity. The estimated construction cost of 175 million USD per platform renders the technology inaccessible for developing nations most vulnerable to sea-level displacement. Furthermore, the ecological impact of large-scale floating structures on benthic marine ecosystems remains largely unstudied.`;

    const r3Qs = [
      { q: "How many people worldwide live in vulnerable coastal zones?", opts: [{ key: "A", text: "200 million" }, { key: "B", text: "800 million" }, { key: "C", text: "500 million" }, { key: "D", text: "2 billion" }], a: "B", exp: "So nguoi: 'an estimated 800 million people'." },
      { q: "What UN body endorsed Oceanix City in 2019?", opts: [{ key: "A", text: "UNESCO" }, { key: "B", text: "UNHCR" }, { key: "C", text: "UN-Habitat" }, { key: "D", text: "UNEP" }], a: "C", exp: "To chuc: 'UN Human Settlements Programme (UN-Habitat) in 2019'." },
      { q: "Who is the architect of Oceanix City?", opts: [{ key: "A", text: "Norman Foster" }, { key: "B", text: "Zaha Hadid" }, { key: "C", text: "Renzo Piano" }, { key: "D", text: "Bjarke Ingels" }], a: "D", exp: "Kien truc su: 'Bjarke Ingels of BIG'." },
      { q: "How many residents does each hexagonal platform accommodate?", opts: [{ key: "A", text: "300 residents" }, { key: "B", text: "100 residents" }, { key: "C", text: "600 residents" }, { key: "D", text: "1,000 residents" }], a: "A", exp: "So cu dan: 'each accommodating 300 residents'." },
      { q: "What is the total population of a complete floating city?", opts: [{ key: "A", text: "1,800 inhabitants" }, { key: "B", text: "10,800 inhabitants" }, { key: "C", text: "5,400 inhabitants" }, { key: "D", text: "50,000 inhabitants" }], a: "B", exp: "Tong dan so: '10,800 inhabitants'." },
      { q: "How much stronger is Biorock compared to reinforced concrete?", opts: [{ key: "A", text: "Twice as strong" }, { key: "B", text: "Five times stronger" }, { key: "C", text: "Three times stronger" }, { key: "D", text: "Ten times stronger" }], a: "C", exp: "Do ben: 'three times stronger than conventional reinforced concrete'." },
      { q: "How much freshwater can atmospheric generators produce daily per platform?", opts: [{ key: "A", text: "500 litres" }, { key: "B", text: "1,000 litres" }, { key: "C", text: "5,000 litres" }, { key: "D", text: "2,000 litres" }], a: "D", exp: "Nuoc ngot: '2,000 litres of freshwater daily per platform'." },
      { q: "How much more food do vertical farms yield compared to soil agriculture?", opts: [{ key: "A", text: "10 times more" }, { key: "B", text: "3 times more" }, { key: "C", text: "5 times more" }, { key: "D", text: "20 times more" }], a: "A", exp: "Nang suat: '10 times more food per square meter'." },
      { q: "How much energy do the solar canopies generate per platform?", opts: [{ key: "A", text: "0.5 megawatts" }, { key: "B", text: "1.4 megawatts" }, { key: "C", text: "3.0 megawatts" }, { key: "D", text: "5.0 megawatts" }], a: "B", exp: "Nang luong: 'generating 1.4 megawatts'." },
      { q: "What temperature differential does OTEC exploit?", opts: [{ key: "A", text: "5-degree difference" }, { key: "B", text: "10-degree difference" }, { key: "C", text: "20-degree difference" }, { key: "D", text: "40-degree difference" }], a: "C", exp: "Chenh lech: '20-degree temperature differential'." },
      { q: "What wave height could exceed mooring capacity?", opts: [{ key: "A", text: "5 meters" }, { key: "B", text: "10 meters" }, { key: "C", text: "25 meters" }, { key: "D", text: "15 meters" }], a: "D", exp: "Do cao song: 'waves exceeding 15 meters'." },
      { q: "What is the estimated construction cost per platform?", opts: [{ key: "A", text: "175 million USD" }, { key: "B", text: "50 million USD" }, { key: "C", text: "100 million USD" }, { key: "D", text: "500 million USD" }], a: "A", exp: "Chi phi: '175 million USD per platform'." },
      { q: "Which university researcher calculated hurricane vulnerability?", opts: [{ key: "A", text: "MIT" }, { key: "B", text: "Tokyo University" }, { key: "C", text: "Stanford University" }, { key: "D", text: "Cambridge University" }], a: "B", exp: "Truong: 'Professor Tetsuya Ishida of Tokyo University'." },
      { q: "What ecological concern remains unstudied?", opts: [{ key: "A", text: "Impact on bird migration" }, { key: "B", text: "Effect on atmospheric ozone" }, { key: "C", text: "Impact on benthic marine ecosystems" }, { key: "D", text: "Noise pollution for whales" }], a: "C", exp: "Lo ngai: 'impact on benthic marine ecosystems remains largely unstudied'." }
    ];

    r3Qs.forEach((item, idx) => {
      qs.push({ id: `irsc1_q${idx + 27}`, partNumber: 3, partTitle: "Reading Passage 3: Floating Metropolises", section: "READING", passageText: readP3, questionText: `Question ${idx + 27}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // SPEAKING PART 1: Coastal Cities & Climate (Q41)
    // =========================================================================
    qs.push({
      id: "irsc1_q41",
      partNumber: 4,
      partTitle: "IELTS Speaking Part 1: Coastal Cities, Sea Levels & Extreme Weather",
      section: "SPEAKING",
      speakingPrompt: "1. Do you live near the ocean or have you ever lived in a coastal city?\n2. How do local residents in your country prepare for seasonal typhoons or storms?\n3. What do you think is the biggest environmental threat facing world oceans today?\n4. Would you consider living on a floating city in the future? Why or why not?",
      preparationTimeSeconds: 15,
      speakingTimeSeconds: 60,
      questionText: "Question 41 (Speaking Part 1): Answer interview questions on oceans and coastal climates naturally with extended responses (60 seconds).",
      options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "View Marine Environment Collocations" },
            { key: "C", text: "Listen to Native Examiner Questions" },
            { key: "D", text: "Skip to Part 2 Cue Card" }
          ],
      correctAnswer: "A",
      explanation: `Band 8.5+ Response Strategy:
- Use coastal/marine vocabulary: 'storm surge', 'tidal inundation', 'coastal erosion', 'marine sanctuary'.
- Extended answer formula: Answer + Reason + Personal experience + Future outlook.

Sample: "I grew up in Da Nang, a coastal city in central Vietnam that experiences devastating typhoons annually between September and November. My family always reinforces our windows with plywood shutters and stockpiles emergency supplies. Personally, I believe ocean acidification and rising sea temperatures pose the most existential threat, as they destroy coral reef ecosystems that sustain millions of coastal livelihoods."`
    });

    // =========================================================================
    // SPEAKING PART 2: Cue Card - A Floating City Concept (Q42)
    // =========================================================================
    qs.push({
      id: "irsc1_q42",
      partNumber: 5,
      partTitle: "IELTS Speaking Part 2: Cue Card - A Visionary Future Floating Metropolis",
      section: "SPEAKING",
      speakingPrompt: "Describe an innovative floating city concept or climate-adapted urban community that you find fascinating.\nYou should say:\n- What this city concept is called and where it might be built\n- What advanced technologies and sustainable systems it incorporates\n- How people would live, work, and travel in this community\nAnd explain why you think floating cities might become necessary for humanity.",
      preparationTimeSeconds: 60,
      speakingTimeSeconds: 120,
      questionText: "Question 42 (Speaking Part 2): Deliver a continuous 2-minute speech describing a floating city concept.",
      options: [
            { key: "A", text: "View 1-Minute Note-Taking Template" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3 Discussion" }
          ],
      correctAnswer: "B",
      explanation: `4-Box Note-Taking Framework:
- Box 1 (What/Where): Oceanix City / UN-backed / Busan, South Korea pilot.
- Box 2 (Technology): Biorock self-healing platforms / solar canopies / OTEC energy / hydroponic farms.
- Box 3 (Life/Work): Modular hexagonal pods / water taxis / zero-waste circular economy.
- Box 4 (Why necessary): 800M coastal residents threatened / climate migration / sea-level rise 1m+ by 2100.

Band 9.0 Model Speech (240+ words):
"I would like to describe the Oceanix City concept, which I find genuinely revolutionary. Designed by Danish architect Bjarke Ingels and formally endorsed by the United Nations in 2019, Oceanix envisions modular hexagonal floating platforms that interlock to form self-sustaining marine communities of approximately 10,000 residents. What makes this concept technologically remarkable is its Biorock structural foundation, which uses electrodeposition to grow limestone structures that are actually three times stronger than reinforced concrete and can self-repair underwater cracks. Each platform incorporates 5,000 square meters of photovoltaic solar canopies, vertical hydroponic farms producing ten times more food per square meter than conventional agriculture, and atmospheric water generators that extract 2,000 litres of freshwater from humidity daily. I believe floating cities may become an absolute necessity because approximately 800 million people currently live in coastal zones vulnerable to catastrophic sea-level rise."`
    });

    // =========================================================================
    // SPEAKING PART 3: Managed Retreat & Climate Geopolitics (Q43)
    // =========================================================================
    qs.push({
      id: "irsc1_q43",
      partNumber: 6,
      partTitle: "IELTS Speaking Part 3: Managed Retreat & Climate Migrant Geopolitics",
      section: "SPEAKING",
      speakingPrompt: "1. Should national governments mandate 'managed retreat' from low-lying coastlines before catastrophic flooding occurs?\n2. What international legal protections should be established for cross-border climate refugees displaced by sea-level rise?\n3. How can coastal megacities finance multi-billion-dollar sea wall storm barriers without burdening future generations?\n4. Is it ethical for wealthy nations to build floating cities while developing island nations sink beneath the waves?\n5. What lessons can modern urban planners learn from ancient civilisations that successfully adapted to rising seas?",
      preparationTimeSeconds: 20,
      speakingTimeSeconds: 90,
      questionText: "Question 43 (Speaking Part 3): Provide analytical discussion on managed coastal retreat, climate refugees, and infrastructure financing (90 seconds).",
      options: [
            { key: "A", text: "Review Geopolitical Discourse Markers" },
            { key: "B", text: "Check Band 9 Policy Vocabulary" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Complete Speaking Test" }
          ],
      correctAnswer: "C",
      explanation: `PEEL Framework for Band 9.0:
- Point: "Managed retreat is arguably the most pragmatic long-term strategy..."
- Explanation: Proactive relocation prevents catastrophic human costs
- Example: Jakarta's capital relocation to Nusantara; Netherlands' Room for the River programme
- Link: International climate finance mechanisms (Green Climate Fund)

Key Vocabulary:
- Managed retreat /rI'tri:t/ (n): Di doi co ke hoach
- Climate refugee /refju'dZi:/ (n): Nguoi ti nan khi hau
- Storm surge barrier /'baeri.@r/ (n): De chan song bao
- Coastal resilience /rI'zIli.@ns/ (n): Kha nang phuc hoi ven bien`
    });

    return qs;
  })()
};
