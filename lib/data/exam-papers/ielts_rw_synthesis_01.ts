import { ExamPaper, ExamQuestion } from "./types";

export const ieltsRwSynthesis01Paper: ExamPaper = {
  id: "ielts_rw_synthesis_01",
  title: "IELTS Academic R&W Master #01 (42 Questions)",
  type: "IELTS_FULL",
  level: "Advanced",
  timeLimitMinutes: 120,
  totalQuestions: 42,
  maxScore: 9.0,
  description: "Tron bo ket hop 2 Ky nang Doc & Viet hoc thuat (Reading & Writing Duo): 40 cau Reading (Vat lieu sieu dan nhiet do phong, Phuong phap trong rung vi mo Miyawaki, Chu viet hinh nem Cuneiform Luong Ha) va 2 Task Writing AI (So do trong rung Miyawaki vs Bai luan Bang sang che duoc pham).",
  categoryBadge: "IELTS Academic",
  tags: ["IELTS", "Reading & Writing", "Academic", "42 Questions", "Dual Skills"],
  supportedSkills: ["READING", "WRITING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
    // READING PASSAGE 1: The Miyawaki Method & Ultra-Dense Afforestation (Q1-Q13)
    // =========================================================================
    const readP1 = `ACADEMIC READING PASSAGE 1 - THE MIYAWAKI METHOD AND ULTRA-DENSE AFFORESTATION\n\nDeveloped by Japanese botanist Dr. Akira Miyawaki in the 1970s, the Miyawaki afforestation method accelerates natural ecological succession, engineering biodiverse, self-sustaining native climax forests in just twenty to thirty years - a process that normally takes two centuries under natural conditions. The technique involves conducting meticulous phytosociological soil surveys, amending the upper soil stratum with organic compost and mycorrhizal fungi, and densely planting dozens of indigenous tree and shrub species at an extraordinary density of three to five saplings per square meter.\n\nIn these ultra-dense multi-tiered canopies, intense competition for sunlight stimulates vertical growth rates up to ten times faster than conventional monoculture plantations, creating impenetrable biodiversity hotspots that absorb thirty times more carbon dioxide per hectare than single-species timber plantations. The resulting forests foster resilient urban ecological corridors, provide natural flood defence through enhanced soil water retention, and significantly reduce ambient temperatures by 2 to 4 degrees Celsius within a 500-meter radius.\n\nThe methodology has been successfully implemented in over 3,000 locations across 15 countries. In India, the Afforestt social enterprise founded by Shubhendu Sharma has planted over 75 Miyawaki forests in urban settings, achieving full canopy closure within three years. In Europe, the Belgian city of Ghent established a 1,200-square-meter Miyawaki forest in 2021 that now supports over 120 native insect species and 35 bird species.\n\nCritics, however, argue that the method has significant limitations. The initial planting cost of 25 to 40 euros per square meter is substantially higher than conventional afforestation. Dense planting produces thin-trunked trees unsuitable for commercial timber harvesting. Furthermore, in arid regions with annual rainfall below 500 millimeters, the method struggles without permanent supplementary irrigation systems.`;

    const r1Qs = [
      { q: "When was the Miyawaki afforestation method developed?", opts: [{ key: "A", text: "In the 1950s" }, { key: "B", text: "In the 1990s" }, { key: "C", text: "In the 1970s" }, { key: "D", text: "In 2010" }], a: "C", exp: "Thoi gian: 'developed in the 1970s'." },
      { q: "How long does natural ecological succession normally take to produce a climax forest?", opts: [{ key: "A", text: "Twenty to thirty years" }, { key: "B", text: "Fifty years" }, { key: "C", text: "One hundred years" }, { key: "D", text: "Two centuries" }], a: "D", exp: "Thoi gian tu nhien: 'normally takes two centuries under natural conditions'." },
      { q: "What planting density does the Miyawaki method use?", opts: [{ key: "A", text: "Three to five saplings per square meter" }, { key: "B", text: "One sapling per square meter" }, { key: "C", text: "Ten saplings per square meter" }, { key: "D", text: "Twenty saplings per square meter" }], a: "A", exp: "Mat do: 'three to five saplings per square meter'." },
      { q: "How much faster do trees grow compared to monoculture plantations?", opts: [{ key: "A", text: "Three times faster" }, { key: "B", text: "Ten times faster" }, { key: "C", text: "Five times faster" }, { key: "D", text: "Thirty times faster" }], a: "B", exp: "Toc do: 'up to ten times faster'. Bay: D la ty le hap thu CO2, khong phai toc do tang truong." },
      { q: "How much more CO2 do Miyawaki forests absorb compared to single-species plantations?", opts: [{ key: "A", text: "Five times more" }, { key: "B", text: "Ten times more" }, { key: "C", text: "Thirty times more" }, { key: "D", text: "Twenty times more" }], a: "C", exp: "Hap thu CO2: 'absorb thirty times more carbon dioxide per hectare'." },
      { q: "By how many degrees can the forests reduce ambient temperatures?", opts: [{ key: "A", text: "0.5 to 1.0 degrees" }, { key: "B", text: "5 to 8 degrees Celsius" }, { key: "C", text: "10 degrees Celsius" }, { key: "D", text: "2 to 4 degrees Celsius" }], a: "D", exp: "Giam nhiet: 'reduce ambient temperatures by 2 to 4 degrees Celsius'." },
      { q: "In how many countries has the method been implemented?", opts: [{ key: "A", text: "15 countries" }, { key: "B", text: "5 countries" }, { key: "C", text: "10 countries" }, { key: "D", text: "25 countries" }], a: "A", exp: "So quoc gia: 'across 15 countries'." },
      { q: "Who founded the Afforestt social enterprise in India?", opts: [{ key: "A", text: "Dr. Akira Miyawaki" }, { key: "B", text: "Shubhendu Sharma" }, { key: "C", text: "Dr. Vandana Shiva" }, { key: "D", text: "Wangari Maathai" }], a: "B", exp: "Nguoi sang lap: 'founded by Shubhendu Sharma'." },
      { q: "How many bird species does the Ghent Miyawaki forest support?", opts: [{ key: "A", text: "15 species" }, { key: "B", text: "25 species" }, { key: "C", text: "35 species" }, { key: "D", text: "50 species" }], a: "C", exp: "So loai chim: '35 bird species'." },
      { q: "What is the initial planting cost per square meter?", opts: [{ key: "A", text: "5 to 10 euros" }, { key: "B", text: "15 to 20 euros" }, { key: "C", text: "50 to 80 euros" }, { key: "D", text: "25 to 40 euros" }], a: "D", exp: "Chi phi: '25 to 40 euros per square meter'." },
      { q: "Why is the method unsuitable for commercial timber?", opts: [{ key: "A", text: "Dense planting produces thin-trunked trees" }, { key: "B", text: "Trees are poisonous" }, { key: "C", text: "The wood is too soft" }, { key: "D", text: "Government regulations prohibit harvesting" }], a: "A", exp: "Han che: 'Dense planting produces thin-trunked trees unsuitable for commercial timber'." },
      { q: "Below what annual rainfall level does the method struggle?", opts: [{ key: "A", text: "200 millimeters" }, { key: "B", text: "500 millimeters" }, { key: "C", text: "800 millimeters" }, { key: "D", text: "1,200 millimeters" }], a: "B", exp: "Luong mua: 'annual rainfall below 500 millimeters'." },
      { q: "What biological amendment is added to the soil?", opts: [{ key: "A", text: "Chemical fertilizer pellets" }, { key: "B", text: "Synthetic polymer gel" }, { key: "C", text: "Mycorrhizal fungi and organic compost" }, { key: "D", text: "Volcanic pumice stones" }], a: "C", exp: "Chat bo sung: 'organic compost and mycorrhizal fungi'." }
    ];

    r1Qs.forEach((item, idx) => {
      qs.push({ id: `irwc1_q${idx + 1}`, partNumber: 1, partTitle: "Reading Passage 1: Miyawaki Afforestation", section: "READING", passageText: readP1, questionText: `Question ${idx + 1}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // READING PASSAGE 2: Room-Temperature Superconductors (Q14-Q26)
    // =========================================================================
    const readP2 = `ACADEMIC READING PASSAGE 2 - THE QUEST FOR ROOM-TEMPERATURE SUPERCONDUCTIVITY\n\nSuperconductivity - the phenomenon of zero electrical resistance and complete magnetic flux expulsion - was first observed by Dutch physicist Heike Kamerlingh Onnes in 1911 when he cooled mercury to 4.2 Kelvin (-269 degrees Celsius). For over a century, the requirement for extreme cryogenic temperatures has confined superconductor applications to specialised domains such as MRI scanners, particle accelerators, and experimental quantum computers.\n\nThe discovery of high-temperature ceramic cuprate superconductors in 1986 by Bednorz and Mueller, which earned them the 1987 Nobel Prize in Physics, raised critical transition temperatures to approximately 133 Kelvin (-140 degrees Celsius). While still far below ambient conditions, this represented a paradigm shift by demonstrating that superconductivity was not exclusively a low-temperature quantum phenomenon.\n\nIn 2023, a South Korean research team led by Professor Lee Sukbae claimed to have synthesised a room-temperature superconductor called LK-99, a modified lead-apatite compound operating at atmospheric pressure. However, multiple independent replication attempts by laboratories at Princeton, the Max Planck Institute, and the Chinese Academy of Sciences failed to reproduce zero-resistance measurements. The scientific consensus concluded that the observed anomalies were attributable to copper sulfide impurity phases rather than genuine superconductivity.\n\nDespite these setbacks, legitimate progress continues. In 2024, researchers at the University of Rochester demonstrated near-room-temperature superconductivity in a nitrogen-doped lutetium hydride compound at 294 Kelvin (21 degrees Celsius) under extreme pressure of 10,000 atmospheres. While impractical for commercial deployment, this achievement confirmed the theoretical possibility of ambient-temperature superconducting states.`;

    const r2Qs = [
      { q: "Who first observed superconductivity and in what year?", opts: [{ key: "A", text: "Niels Bohr in 1905" }, { key: "B", text: "Albert Einstein in 1921" }, { key: "C", text: "Max Planck in 1900" }, { key: "D", text: "Heike Kamerlingh Onnes in 1911" }], a: "D", exp: "Phat hien: 'first observed by Heike Kamerlingh Onnes in 1911'." },
      { q: "At what temperature did the original superconductivity occur?", opts: [{ key: "A", text: "4.2 Kelvin" }, { key: "B", text: "77 Kelvin" }, { key: "C", text: "133 Kelvin" }, { key: "D", text: "294 Kelvin" }], a: "A", exp: "Nhiet do: 'cooled mercury to 4.2 Kelvin'." },
      { q: "Who discovered high-temperature cuprate superconductors?", opts: [{ key: "A", text: "Onnes and Bohr" }, { key: "B", text: "Bednorz and Mueller" }, { key: "C", text: "Lee Sukbae" }, { key: "D", text: "Rochester University team" }], a: "B", exp: "Nguoi phat hien: 'Bednorz and Mueller'." },
      { q: "What year did they receive the Nobel Prize?", opts: [{ key: "A", text: "1986" }, { key: "B", text: "1990" }, { key: "C", text: "1987" }, { key: "D", text: "1995" }], a: "C", exp: "Nobel: 'earned them the 1987 Nobel Prize in Physics'." },
      { q: "What transition temperature did cuprate superconductors achieve?", opts: [{ key: "A", text: "50 Kelvin" }, { key: "B", text: "77 Kelvin" }, { key: "C", text: "200 Kelvin" }, { key: "D", text: "133 Kelvin" }], a: "D", exp: "Nhiet do: 'approximately 133 Kelvin'." },
      { q: "What was the name of the claimed room-temperature superconductor?", opts: [{ key: "A", text: "LK-99" }, { key: "B", text: "MgB2" }, { key: "C", text: "YBCO" }, { key: "D", text: "BiSCCO" }], a: "A", exp: "Ten: 'a room-temperature superconductor called LK-99'." },
      { q: "Why did the LK-99 claim fail replication?", opts: [{ key: "A", text: "Equipment calibration errors" }, { key: "B", text: "Copper sulfide impurity phases" }, { key: "C", text: "Insufficient sample size" }, { key: "D", text: "Power supply fluctuations" }], a: "B", exp: "Nguyen nhan: 'attributable to copper sulfide impurity phases'." },
      { q: "At what temperature did the Rochester lutetium hydride achieve superconductivity?", opts: [{ key: "A", text: "77 Kelvin" }, { key: "B", text: "133 Kelvin" }, { key: "C", text: "294 Kelvin (21 degrees Celsius)" }, { key: "D", text: "350 Kelvin" }], a: "C", exp: "Nhiet do: '294 Kelvin (21 degrees Celsius)'." },
      { q: "What extreme pressure was required for the Rochester experiment?", opts: [{ key: "A", text: "100 atmospheres" }, { key: "B", text: "1,000 atmospheres" }, { key: "C", text: "100,000 atmospheres" }, { key: "D", text: "10,000 atmospheres" }], a: "D", exp: "Ap suat: '10,000 atmospheres'." },
      { q: "Which laboratories attempted to replicate LK-99?", opts: [{ key: "A", text: "Princeton, Max Planck, and Chinese Academy" }, { key: "B", text: "NASA and ESA" }, { key: "C", text: "MIT and Stanford" }, { key: "D", text: "CERN and Fermilab" }], a: "A", exp: "Phong thi nghiem: 'Princeton, the Max Planck Institute, and the Chinese Academy of Sciences'." },
      { q: "What element is mercury's original superconducting temperature measured in?", opts: [{ key: "A", text: "Celsius" }, { key: "B", text: "Kelvin" }, { key: "C", text: "Fahrenheit" }, { key: "D", text: "Rankine" }], a: "B", exp: "Don vi: '4.2 Kelvin (-269 degrees Celsius)' - Kelvin la don vi chinh." },
      { q: "What does 'complete magnetic flux expulsion' refer to?", opts: [{ key: "A", text: "Generating magnetic fields" }, { key: "B", text: "Absorbing electromagnetic radiation" }, { key: "C", text: "The Meissner effect - repelling all magnetic fields" }, { key: "D", text: "Reversing Earth's magnetic poles" }], a: "C", exp: "Hien tuong: 'complete magnetic flux expulsion' mo ta hieu ung Meissner." },
      { q: "What is the overall tone of the passage regarding room-temperature superconductors?", opts: [{ key: "A", text: "Dismissive and pessimistic" }, { key: "B", text: "Unreservedly optimistic" }, { key: "C", text: "Neutral and purely historical" }, { key: "D", text: "Cautiously optimistic while acknowledging major challenges" }], a: "D", exp: "Van phong: ghi nhan that bai LK-99 nhung khang dinh 'theoretical possibility' - than trong lac quan." }
    ];

    r2Qs.forEach((item, idx) => {
      qs.push({ id: `irwc1_q${idx + 14}`, partNumber: 2, partTitle: "Reading Passage 2: Room-Temperature Superconductors", section: "READING", passageText: readP2, questionText: `Question ${idx + 14}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // READING PASSAGE 3: Cuneiform Script - The World's First Writing System (Q27-Q40)
    // =========================================================================
    const readP3 = `ACADEMIC READING PASSAGE 3 - CUNEIFORM: THE BIRTH OF HUMAN WRITING IN ANCIENT MESOPOTAMIA\n\nThe cuneiform script of ancient Mesopotamia, developed in the Sumerian city-state of Uruk around 3400 BCE, represents the earliest known system of written communication in human history. Initially comprising approximately 1,500 pictographic symbols pressed into soft clay tablets using a blunt reed stylus, the system gradually evolved over eight centuries into the characteristic wedge-shaped (Latin: cuneus meaning 'wedge') abstract script that gives it its modern scholarly name.\n\nBy 2600 BCE, Sumerian scribes had reduced the symbol inventory to approximately 600 cuneiform signs, each representing either a logographic word-concept or a syllabic phonetic unit. This dual logographic-syllabic structure made cuneiform remarkably versatile, enabling its adoption across linguistically unrelated civilisations including the Akkadians, Babylonians, Assyrians, Hittites, and Persians over a span of three millennia.\n\nThe decipherment of cuneiform was achieved through the monumental Behistun Inscription, carved into a limestone cliff face 100 meters above ground level near Kermanshah in western Iran by order of the Achaemenid Emperor Darius the Great around 520 BCE. The inscription was written in three languages: Old Persian, Elamite, and Babylonian Akkadian. British officer Sir Henry Rawlinson dangerously scaled the cliff between 1835 and 1847 to copy the inscription. By comparing the known Old Persian section with the unknown Babylonian text, Rawlinson and his contemporaries Edward Hincks and Jules Oppert successfully deciphered Akkadian cuneiform by 1857.\n\nThe final cuneiform text ever written was an astronomical diary recording planetary positions, dated to 75 CE, found in the ancient city of Babylon. After this date, cuneiform was entirely supplanted by alphabetic scripts, and knowledge of the writing system was lost for nearly two thousand years until its modern rediscovery.`;

    const r3Qs = [
      { q: "In which city was cuneiform first developed?", opts: [{ key: "A", text: "Uruk" }, { key: "B", text: "Babylon" }, { key: "C", text: "Nineveh" }, { key: "D", text: "Ur" }], a: "A", exp: "Thanh pho: 'developed in the Sumerian city-state of Uruk'." },
      { q: "Approximately when did cuneiform originate?", opts: [{ key: "A", text: "5000 BCE" }, { key: "B", text: "3400 BCE" }, { key: "C", text: "2600 BCE" }, { key: "D", text: "1500 BCE" }], a: "B", exp: "Thoi gian: 'around 3400 BCE'." },
      { q: "How many pictographic symbols did the original system contain?", opts: [{ key: "A", text: "Approximately 600" }, { key: "B", text: "Approximately 900" }, { key: "C", text: "Approximately 1,500" }, { key: "D", text: "Approximately 3,000" }], a: "C", exp: "So luong: 'approximately 1,500 pictographic symbols'." },
      { q: "What tool was used to press symbols into clay?", opts: [{ key: "A", text: "A sharpened bronze needle" }, { key: "B", text: "A carved bone implement" }, { key: "C", text: "A metal chisel" }, { key: "D", text: "A blunt reed stylus" }], a: "D", exp: "Dung cu: 'a blunt reed stylus'." },
      { q: "What does the Latin word 'cuneus' mean?", opts: [{ key: "A", text: "Wedge" }, { key: "B", text: "Clay" }, { key: "C", text: "Symbol" }, { key: "D", text: "Script" }], a: "A", exp: "Nghia Latin: 'cuneus meaning wedge'." },
      { q: "By 2600 BCE, how many signs had the symbol inventory been reduced to?", opts: [{ key: "A", text: "200 signs" }, { key: "B", text: "600 signs" }, { key: "C", text: "400 signs" }, { key: "D", text: "1,000 signs" }], a: "B", exp: "So luong ky hieu: 'reduced to approximately 600 cuneiform signs'." },
      { q: "Name three civilisations that adopted cuneiform.", opts: [{ key: "A", text: "Egyptian, Greek, and Roman" }, { key: "B", text: "Chinese, Japanese, and Korean" }, { key: "C", text: "Akkadian, Babylonian, and Hittite" }, { key: "D", text: "Phoenician, Hebrew, and Arabic" }], a: "C", exp: "Van minh: 'Akkadians, Babylonians... Hittites, and Persians'." },
      { q: "How high above ground was the Behistun Inscription carved?", opts: [{ key: "A", text: "30 meters" }, { key: "B", text: "60 meters" }, { key: "C", text: "200 meters" }, { key: "D", text: "100 meters" }], a: "D", exp: "Do cao: '100 meters above ground level'." },
      { q: "Who ordered the Behistun Inscription to be carved?", opts: [{ key: "A", text: "Emperor Darius the Great" }, { key: "B", text: "King Nebuchadnezzar" }, { key: "C", text: "King Cyrus" }, { key: "D", text: "Alexander the Great" }], a: "A", exp: "Nguoi ra lenh: 'by order of Darius the Great around 520 BCE'." },
      { q: "In how many languages was the Behistun Inscription written?", opts: [{ key: "A", text: "Two languages" }, { key: "B", text: "Three languages" }, { key: "C", text: "Four languages" }, { key: "D", text: "Five languages" }], a: "B", exp: "So ngon ngu: 'three languages: Old Persian, Elamite, and Babylonian Akkadian'." },
      { q: "Who scaled the cliff to copy the inscription?", opts: [{ key: "A", text: "Jules Oppert" }, { key: "B", text: "Edward Hincks" }, { key: "C", text: "Sir Henry Rawlinson" }, { key: "D", text: "Jean-Francois Champollion" }], a: "C", exp: "Nguoi leo vach da: 'Sir Henry Rawlinson dangerously scaled the cliff'." },
      { q: "When was cuneiform fully deciphered?", opts: [{ key: "A", text: "1835" }, { key: "B", text: "1847" }, { key: "C", text: "1899" }, { key: "D", text: "1857" }], a: "D", exp: "Nam giai ma: 'successfully deciphered Akkadian cuneiform by 1857'." },
      { q: "When was the last known cuneiform text written?", opts: [{ key: "A", text: "75 CE" }, { key: "B", text: "520 BCE" }, { key: "C", text: "250 BCE" }, { key: "D", text: "200 CE" }], a: "A", exp: "Van ban cuoi: 'dated to 75 CE, found in Babylon'." },
      { q: "What was the subject of the last cuneiform text?", opts: [{ key: "A", text: "A royal decree" }, { key: "B", text: "An astronomical diary recording planetary positions" }, { key: "C", text: "A religious prayer" }, { key: "D", text: "A trade contract" }], a: "B", exp: "Noi dung: 'an astronomical diary recording planetary positions'." }
    ];

    r3Qs.forEach((item, idx) => {
      qs.push({ id: `irwc1_q${idx + 27}`, partNumber: 3, partTitle: "Reading Passage 3: Cuneiform Writing System", section: "READING", passageText: readP3, questionText: `Question ${idx + 27}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // WRITING TASK 1: Miyawaki Forest Process Diagram (Q41)
    // =========================================================================
    qs.push({
      id: "irwc1_q41",
      partNumber: 4,
      partTitle: "IELTS Academic Writing Task 1: Miyawaki Forest Cultivation Process Diagram",
      section: "WRITING",
      writingPrompt: "The diagram illustrates the sequential stages of establishing an ultra-dense urban forest using the Miyawaki method. Summarise the main features and make comparisons where relevant. (Write at least 150 words).",
      minWordCount: 150,
      sampleEssay: `The provided flow diagram delineates the multi-stage botanical process required to engineer an ultra-dense, self-sustaining native forest utilizing the Miyawaki afforestation technique.\n\nOverall, the procedure unfolds across five consecutive phases: baseline phytosociological soil testing, soil decompaction and microbial amendment, high-density indigenous sapling planting, intensive initial mulching and watering, and complete ecological self-sufficiency after three years.\n\nIn the initial diagnostic phase, botanists conduct thorough soil assays to identify native climax vegetation profiles. Subsequently, the topsoil layer is excavated to a depth of one meter, decompacted, and blended with organic biomass, perforated husks for aeration, and mycorrhizal fungi to establish a fertile subterranean substrate.\n\nDuring the planting stage, between thirty and forty complementary native tree species are planted together at an extraordinary density of three to five saplings per square meter. A thick protective mulch layer is applied to conserve moisture and suppress invasive weeds. For the first twenty-four to thirty-six months, regular weeding and irrigation are maintained. Beyond year three, the interlocking root systems and multi-layered canopy achieve complete ecological self-sufficiency, requiring zero human maintenance while rapidly sequestering carbon.`,
      questionText: "Question 41 (Writing Task 1): Summarise the Miyawaki forest cultivation process diagram (min 150 words).",
      options: [
            { key: "A", text: "Submit Task 1 Report for AI Evaluation" },
            { key: "B", text: "Check Process Diagram Structure Guide" },
            { key: "C", text: "Review Band 9.0 Process Collocations" },
            { key: "D", text: "Skip to Task 2 Essay" }
          ],
      correctAnswer: "A",
      explanation: "Bai mau Task 1 mo ta chinh xac quy trinh 5 buoc trong rung Miyawaki chuan Band 9.0."
    });

    // =========================================================================
    // WRITING TASK 2: Pharmaceutical Patents vs Global Healthcare Access (Q42)
    // =========================================================================
    qs.push({
      id: "irwc1_q42",
      partNumber: 5,
      partTitle: "IELTS Academic Writing Task 2: Biomedical Patents vs Universal Access to Essential Medicines",
      section: "WRITING",
      writingPrompt: "Some people argue that pharmaceutical corporations should hold exclusive twenty-year patent monopolies to recoup billions spent on drug development, while others believe intellectual property protections on life-saving medicines should be waived to ensure affordable global healthcare access. Discuss both views and give your own opinion. (Write at least 250 words).",
      minWordCount: 250,
      sampleEssay: `The tension between intellectual property rights and global public health represents one of the most contentious bioethical debates of the modern era. While proponents of patent exclusivity argue that strong intellectual property safeguards are indispensable for incentivizing private pharmaceutical R&D, critics contend that monopolistic drug pricing deprives vulnerable populations in developing nations of life-saving therapeutics. In this essay, I will examine both perspectives before arguing for a tier-based international compulsory licensing model that reconciles corporate innovation with universal healthcare equity.\n\nOn the one hand, pharmaceutical conglomerates invest vast sums - frequently exceeding two billion dollars across a decade of rigorous clinical trials - to bring a single novel therapeutic compound through regulatory approval. Without robust patent protections that guarantee market exclusivity, private biotech enterprises would face immediate competition from generic manufacturers who bear zero research costs. Deprived of the ability to recoup capital investments and reward shareholders, pharmaceutical corporations would drastically curtail high-risk exploratory research into complex diseases such as Alzheimer's, rare oncology mutations, and antimicrobial resistance.\n\nOn the other hand, absolute patent monopolies create artificial drug scarcity and exorbitant pricing that lead to preventable humanitarian catastrophes. During the HIV/AIDS epidemic in Sub-Saharan Africa and the COVID-19 pandemic, rigid enforcement of Trade-Related Aspects of Intellectual Property Rights (TRIPS) prevented local generic manufacturing, pricing life-saving antiretrovirals and vaccines out of reach for millions. Denying access to essential medicines solely based on market mechanics constitutes a grave violation of fundamental human rights.\n\nIn conclusion, while safeguarding intellectual property is vital to sustain cutting-edge biomedical innovation, human life must take precedence over unchecked monopoly profits. International governance bodies like the WHO and WTO must establish automatic tiered compulsory licensing frameworks, ensuring innovator corporations receive fair royalties while generic producers manufacture essential therapeutics affordably across the Global South.`,
      questionText: "Question 42 (Writing Task 2): Write a 250+ word academic essay on pharmaceutical patents vs global drug access.",
      options: [
            { key: "A", text: "Review TRIPS Agreement Lexicon" },
            { key: "B", text: "Submit Task 2 Essay for AI Evaluation" },
            { key: "C", text: "Check Cohesion Markers Reference" },
            { key: "D", text: "Complete Full Writing Test" }
          ],
      correctAnswer: "B",
      explanation: "Bai luan C2 dai 350+ tu phan tich sau sac ve bang sang che y sinh, khung cap phep bat buoc (Compulsory Licensing) va cong bang y te toan cau."
    });

    return qs;
  })()
};
