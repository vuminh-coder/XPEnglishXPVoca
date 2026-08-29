import { ExamPaper, ExamQuestion } from "./types";

export const ieltsLsInteractive01Paper: ExamPaper = {
  id: "ielts_ls_interactive_01",
  title: "IELTS Listening & Speaking AI Duo #01",
  type: "IELTS_FULL",
  level: "Advanced",
  timeLimitMinutes: 50,
  totalQuestions: 43,
  maxScore: 9.0,
  description: "Tron bo ket hop 2 Ky nang Nghe & Noi AI (Listening & Speaking Duo): 40 cau Listening (Serengeti Conservation Registration, Eden Project Guided Tour, Postgraduate Coral Reef Genetics, Marine Bioacoustics Lecture) va 3 Phan Speaking AI (Nature Reserves, Ecotourism Cue Card, Wildlife Ethics Discussion).",
  categoryBadge: "IELTS Academic",
  tags: ["IELTS", "Listening & Speaking", "Interactive AI"],
  supportedSkills: ["LISTENING", "SPEAKING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
    // LISTENING SECTION 1: Serengeti Wildlife Conservation Station Registration (Q1-Q10)
    // =========================================================================
    const sec1Script = "Coordinator: Serengeti Field Research Station, this is Dr. Amina Mwanga speaking. How can I help you?\nCaller: Good morning, Dr. Mwanga. I am Professor David Lancaster from the University of Edinburgh. I am calling to register our wildlife ecology team for a six-week field study beginning on July 3rd. We have a total of eight researchers.\nCoordinator: Welcome, Professor Lancaster. Let me check our booking system. We can accommodate your team in the Ngorongoro Research Lodge. The total field station fee is 5,800 US dollars, which covers jeep rental, GPS tracking equipment, and satellite internet access.\nCaller: That sounds reasonable. Will we have access to the veterinary laboratory?\nCoordinator: Yes, the veterinary pathology laboratory in Block D is available from 6 AM to 9 PM daily. However, the molecular genetics sequencing facility requires advance booking through Dr. Okonkwo, our senior geneticist.\nCaller: Understood. We also need to arrange light aircraft transport to the northern Mara River crossing observation point.\nCoordinator: Our Cessna bush flights operate every Monday, Wednesday, and Friday at 5:45 AM. Each flight takes a maximum of five passengers with 90 kilograms of research equipment. The flight duration is approximately 40 minutes.\nCaller: Excellent. Is there an emergency medical facility at the station?\nCoordinator: Yes, we have a fully equipped field hospital with Dr. Fatima Osei, our resident trauma physician, available around the clock. Anti-venom supplies for black mamba and puff adder bites are always stocked.";

    const sec1Qs = [
      { q: "What university does the caller represent?", opts: [{ key: "A", text: "University of Cambridge" }, { key: "B", text: "University of Oxford" }, { key: "C", text: "University of Cape Town" }, { key: "D", text: "University of Edinburgh" }], a: "D", exp: "Truong dai hoc: 'from the University of Edinburgh'." },
      { q: "How many researchers are in the team?", opts: [{ key: "A", text: "Eight researchers" }, { key: "B", text: "Five researchers" }, { key: "C", text: "Six researchers" }, { key: "D", text: "Ten researchers" }], a: "A", exp: "So luong: 'a total of eight researchers'." },
      { q: "How long is the planned field study?", opts: [{ key: "A", text: "Four weeks" }, { key: "B", text: "Six weeks" }, { key: "C", text: "Eight weeks" }, { key: "D", text: "Twelve weeks" }], a: "B", exp: "Thoi gian: 'a six-week field study'." },
      { q: "What is the total field station fee?", opts: [{ key: "A", text: "3,200 US dollars" }, { key: "B", text: "4,500 US dollars" }, { key: "C", text: "5,800 US dollars" }, { key: "D", text: "7,600 US dollars" }], a: "C", exp: "Phi: 'total field station fee is 5,800 US dollars'." },
      { q: "What are the operating hours of the veterinary lab?", opts: [{ key: "A", text: "5 AM to 8 PM" }, { key: "B", text: "7 AM to 10 PM" }, { key: "C", text: "8 AM to 6 PM" }, { key: "D", text: "6 AM to 9 PM" }], a: "D", exp: "Gio hoat dong: 'from 6 AM to 9 PM daily'." },
      { q: "Who must be contacted to book the genetics facility?", opts: [{ key: "A", text: "Dr. Okonkwo" }, { key: "B", text: "Dr. Mwanga" }, { key: "C", text: "Professor Lancaster" }, { key: "D", text: "Dr. Fatima Osei" }], a: "A", exp: "Lien he: 'advance booking through Dr. Okonkwo'." },
      { q: "On which days do Cessna bush flights operate?", opts: [{ key: "A", text: "Tuesday and Thursday" }, { key: "B", text: "Monday, Wednesday, and Friday" }, { key: "C", text: "Every weekday" }, { key: "D", text: "Weekends only" }], a: "B", exp: "Lich bay: 'every Monday, Wednesday, and Friday'." },
      { q: "What is the maximum equipment weight per flight?", opts: [{ key: "A", text: "60 kilograms" }, { key: "B", text: "120 kilograms" }, { key: "C", text: "90 kilograms" }, { key: "D", text: "150 kilograms" }], a: "C", exp: "Trong tai: '90 kilograms of research equipment'." },
      { q: "What is the name of the resident physician?", opts: [{ key: "A", text: "Dr. Amina Mwanga" }, { key: "B", text: "Dr. Okonkwo" }, { key: "C", text: "Dr. Sarah Chen" }, { key: "D", text: "Dr. Fatima Osei" }], a: "D", exp: "Bac si: 'Dr. Fatima Osei, our resident trauma physician'." },
      { q: "What anti-venom supplies are stocked at the hospital?", opts: [{ key: "A", text: "Black mamba and puff adder" }, { key: "B", text: "King cobra and rattlesnake" }, { key: "C", text: "Taipan and brown snake" }, { key: "D", text: "Coral snake and copperhead" }], a: "A", exp: "Huyet thanh: 'for black mamba and puff adder bites'." }
    ];

    sec1Qs.forEach((item, idx) => {
      qs.push({ id: `ilsc1_q${idx + 1}`, partNumber: 1, partTitle: "Listening Section 1: Serengeti Station Registration", section: "LISTENING", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", passageText: `[Audio Transcript - Section 1]\n${sec1Script}`, questionText: `Question ${idx + 1}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // LISTENING SECTION 2: Eden Project Guided Tour (Q11-Q20)
    // =========================================================================
    const sec2Script = "Guide: Good morning, everyone! Welcome to the Eden Project in Cornwall, England. I am Marcus Hartley, your senior botanical guide. Today I will take you through our three biome domes and outdoor gardens.\n\nOur first stop is the Rainforest Biome, the world's largest indoor rainforest, standing 55 meters tall and covering 1.56 hectares. Inside you will find over 1,000 tropical plant species from regions including Amazonia, West Africa, and Southeast Asia. The temperature is maintained at 35 degrees Celsius with 90 percent humidity.\n\nNext, we will visit the Mediterranean Biome, which houses drought-resistant vegetation from South Africa, California, and the Mediterranean Basin. This dome maintains a cooler 25 degrees Celsius with carefully controlled irrigation systems.\n\nOur newest attraction, opened in 2023, is the Core Education Centre, a 650-square-meter interactive learning space designed by architect Jolyon Brewis. It features a 12-meter living green wall and a rooftop solar panel array generating 420 kilowatts of renewable energy.\n\nThe outdoor gardens span over 12 hectares and showcase native Cornish wildflowers, heritage crop varieties, and a sculptural garden created by artist Tim Smit. Please note that the gift shop closes at 5:30 PM and the last shuttle bus to the car park departs at 6:00 PM.";

    const sec2Qs = [
      { q: "How tall is the Rainforest Biome?", opts: [{ key: "A", text: "35 meters" }, { key: "B", text: "55 meters" }, { key: "C", text: "45 meters" }, { key: "D", text: "65 meters" }], a: "B", exp: "Chieu cao: 'standing 55 meters tall'." },
      { q: "How many tropical plant species are in the Rainforest Biome?", opts: [{ key: "A", text: "Over 500" }, { key: "B", text: "Over 2,000" }, { key: "C", text: "Over 1,000" }, { key: "D", text: "Over 5,000" }], a: "C", exp: "So loai: 'over 1,000 tropical plant species'." },
      { q: "What temperature is maintained in the Rainforest Biome?", opts: [{ key: "A", text: "25 degrees Celsius" }, { key: "B", text: "30 degrees Celsius" }, { key: "C", text: "40 degrees Celsius" }, { key: "D", text: "35 degrees Celsius" }], a: "D", exp: "Nhiet do: '35 degrees Celsius with 90 percent humidity'." },
      { q: "What temperature is the Mediterranean Biome maintained at?", opts: [{ key: "A", text: "25 degrees Celsius" }, { key: "B", text: "20 degrees Celsius" }, { key: "C", text: "30 degrees Celsius" }, { key: "D", text: "35 degrees Celsius" }], a: "A", exp: "Nhiet do: 'a cooler 25 degrees Celsius'." },
      { q: "When was the Core Education Centre opened?", opts: [{ key: "A", text: "2019" }, { key: "B", text: "2023" }, { key: "C", text: "2021" }, { key: "D", text: "2025" }], a: "B", exp: "Nam khai truong: 'opened in 2023'." },
      { q: "What is the area of the Core Education Centre?", opts: [{ key: "A", text: "350 square meters" }, { key: "B", text: "500 square meters" }, { key: "C", text: "650 square meters" }, { key: "D", text: "900 square meters" }], a: "C", exp: "Dien tich: '650-square-meter interactive learning space'." },
      { q: "How tall is the living green wall?", opts: [{ key: "A", text: "6 meters" }, { key: "B", text: "8 meters" }, { key: "C", text: "15 meters" }, { key: "D", text: "12 meters" }], a: "D", exp: "Chieu cao tuong xanh: '12-meter living green wall'." },
      { q: "How much renewable energy do the solar panels generate?", opts: [{ key: "A", text: "420 kilowatts" }, { key: "B", text: "200 kilowatts" }, { key: "C", text: "320 kilowatts" }, { key: "D", text: "560 kilowatts" }], a: "A", exp: "Nang luong: 'generating 420 kilowatts'." },
      { q: "How large are the outdoor gardens?", opts: [{ key: "A", text: "5 hectares" }, { key: "B", text: "12 hectares" }, { key: "C", text: "8 hectares" }, { key: "D", text: "20 hectares" }], a: "B", exp: "Dien tich: 'span over 12 hectares'." },
      { q: "What time does the last shuttle bus depart?", opts: [{ key: "A", text: "5:00 PM" }, { key: "B", text: "5:30 PM" }, { key: "C", text: "6:00 PM" }, { key: "D", text: "6:30 PM" }], a: "C", exp: "Bay: A la gift shop (5:30 PM). Shuttle bus la 'departs at 6:00 PM'." }
    ];

    sec2Qs.forEach((item, idx) => {
      qs.push({ id: `ilsc1_q${idx + 11}`, partNumber: 2, partTitle: "Listening Section 2: Eden Project Tour", section: "LISTENING", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", passageText: `[Audio Transcript - Section 2]\n${sec2Script}`, questionText: `Question ${idx + 11}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // LISTENING SECTION 3: Postgraduate Discussion - Coral Reef Genetics (Q21-Q30)
    // =========================================================================
    const sec3Script = "Supervisor: Good afternoon, Priya and Daniel. Let us review your progress on the coral reef thermal resilience genetics project.\nPriya: Thank you, Professor Wallace. We collected tissue samples from 240 individual coral colonies across four species at the Ningaloo Reef in Western Australia.\nDaniel: Our RNA sequencing analysis revealed that Acropora digitifera colonies exposed to sustained temperatures above 30.5 degrees Celsius showed a 340 percent upregulation of heat shock protein HSP70 gene expression compared to control colonies at 27 degrees.\nSupervisor: That is a remarkable differential. Did you identify any epigenetic markers?\nPriya: Yes. We found significant DNA methylation changes at 47 CpG sites in the thermally stressed corals, particularly in genes associated with calcium carbonate skeleton formation and symbiont photosynthesis regulation.\nDaniel: Interestingly, colonies that had previously survived the 2016 mass bleaching event demonstrated 60 percent faster HSP70 activation than naive colonies, suggesting transgenerational epigenetic memory.\nSupervisor: Excellent work. For the final thesis, I need you to run a genome-wide association study using the GATK bioinformatics pipeline and submit your findings to the journal Nature Climate Change. The manuscript deadline is September 15th.";

    const sec3Qs = [
      { q: "How many coral colonies were sampled?", opts: [{ key: "A", text: "120 colonies" }, { key: "B", text: "180 colonies" }, { key: "C", text: "360 colonies" }, { key: "D", text: "240 colonies" }], a: "D", exp: "So luong: '240 individual coral colonies'." },
      { q: "Where were the samples collected?", opts: [{ key: "A", text: "Ningaloo Reef, Western Australia" }, { key: "B", text: "Great Barrier Reef, Queensland" }, { key: "C", text: "Coral Sea, Papua New Guinea" }, { key: "D", text: "Red Sea, Egypt" }], a: "A", exp: "Dia diem: 'Ningaloo Reef in Western Australia'." },
      { q: "What temperature triggers HSP70 upregulation?", opts: [{ key: "A", text: "Above 28.0 degrees" }, { key: "B", text: "Above 30.5 degrees" }, { key: "C", text: "Above 29.5 degrees" }, { key: "D", text: "Above 32.0 degrees" }], a: "B", exp: "Nhiet do: 'sustained temperatures above 30.5 degrees Celsius'." },
      { q: "By how much was HSP70 gene expression upregulated?", opts: [{ key: "A", text: "120 percent" }, { key: "B", text: "220 percent" }, { key: "C", text: "340 percent" }, { key: "D", text: "500 percent" }], a: "C", exp: "Ty le: '340 percent upregulation'." },
      { q: "How many CpG methylation sites showed significant changes?", opts: [{ key: "A", text: "23 sites" }, { key: "B", text: "35 sites" }, { key: "C", text: "62 sites" }, { key: "D", text: "47 sites" }], a: "D", exp: "So luong: '47 CpG sites'." },
      { q: "What year's bleaching event is referenced as a survival benchmark?", opts: [{ key: "A", text: "2016" }, { key: "B", text: "2010" }, { key: "C", text: "2014" }, { key: "D", text: "2020" }], a: "A", exp: "Nam: 'the 2016 mass bleaching event'." },
      { q: "How much faster did previously bleached corals activate HSP70?", opts: [{ key: "A", text: "30 percent faster" }, { key: "B", text: "60 percent faster" }, { key: "C", text: "45 percent faster" }, { key: "D", text: "80 percent faster" }], a: "B", exp: "Toc do: '60 percent faster HSP70 activation'." },
      { q: "What concept does this faster activation suggest?", opts: [{ key: "A", text: "Random genetic mutation" }, { key: "B", text: "Horizontal gene transfer" }, { key: "C", text: "Transgenerational epigenetic memory" }, { key: "D", text: "Viral RNA insertion" }], a: "C", exp: "Khai niem: 'suggesting transgenerational epigenetic memory'." },
      { q: "What bioinformatics pipeline must be used for the thesis?", opts: [{ key: "A", text: "BLAST alignment" }, { key: "B", text: "MEGAHIT assembler" }, { key: "C", text: "Cufflinks tool" }, { key: "D", text: "GATK pipeline" }], a: "D", exp: "Cong cu: 'the GATK bioinformatics pipeline'." },
      { q: "What is the manuscript submission deadline?", opts: [{ key: "A", text: "September 15th" }, { key: "B", text: "August 1st" }, { key: "C", text: "October 30th" }, { key: "D", text: "December 1st" }], a: "A", exp: "Han nop: 'manuscript deadline is September 15th'." }
    ];

    sec3Qs.forEach((item, idx) => {
      qs.push({ id: `ilsc1_q${idx + 21}`, partNumber: 3, partTitle: "Listening Section 3: Coral Reef Genetics", section: "LISTENING", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", passageText: `[Audio Transcript - Section 3]\n${sec3Script}`, questionText: `Question ${idx + 21}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // LISTENING SECTION 4: Lecture - Marine Bioacoustics & Whale Communication (Q31-Q40)
    // =========================================================================
    const sec4Script = "Good morning, everyone. Today's zoology lecture explores the extraordinary world of marine bioacoustics, focusing on how cetaceans use sound for navigation, hunting, and social communication in the deep ocean.\n\nHumpback whales produce some of the most complex vocalisations in the animal kingdom. Males generate structured songs lasting between 10 and 30 minutes, composed of hierarchical units, phrases, and themes. These songs can travel over 3,000 kilometres through deep ocean sound channels known as SOFAR channels, where sound waves become trapped between layers of differing water density and temperature.\n\nBlue whales communicate using ultra-low-frequency infrasonic pulses between 10 and 40 Hertz, below the threshold of human hearing. Recent research by Stanford University has revealed that the average frequency of blue whale calls has decreased by approximately 31 percent over the past five decades, possibly due to population recovery reducing the need for long-distance communication.\n\nSperm whales use a click-based communication system called codas. Each social clan produces a distinct repertoire of patterned click sequences, analogous to regional human dialects. The Caribbean clan, for example, uses a signature five-click pattern called the 1+1+3 coda.\n\nCritically, anthropogenic ocean noise from shipping traffic, seismic airgun surveys, and naval sonar exercises has increased ambient ocean noise levels by 32 decibels since the 1960s. This acoustic pollution forces whales to shift their call frequencies, reduce communication range by up to 90 percent, and can cause permanent hearing damage or fatal decompression sickness from emergency deep dives.";

    const sec4Qs = [
      { q: "How long can humpback whale songs last?", opts: [{ key: "A", text: "3 to 5 minutes" }, { key: "B", text: "10 to 30 minutes" }, { key: "C", text: "1 to 3 hours" }, { key: "D", text: "24 hours continuously" }], a: "B", exp: "Thoi luong: 'lasting between 10 and 30 minutes'." },
      { q: "How far can humpback songs travel through SOFAR channels?", opts: [{ key: "A", text: "500 kilometres" }, { key: "B", text: "1,000 kilometres" }, { key: "C", text: "3,000 kilometres" }, { key: "D", text: "10,000 kilometres" }], a: "C", exp: "Khoang cach: 'travel over 3,000 kilometres'." },
      { q: "What frequency range do blue whales use?", opts: [{ key: "A", text: "100 to 500 Hertz" }, { key: "B", text: "1,000 to 5,000 Hertz" }, { key: "C", text: "40,000 to 150,000 Hertz" }, { key: "D", text: "10 to 40 Hertz" }], a: "D", exp: "Tan so: 'between 10 and 40 Hertz'." },
      { q: "By what percentage have blue whale call frequencies decreased?", opts: [{ key: "A", text: "31 percent" }, { key: "B", text: "12 percent" }, { key: "C", text: "45 percent" }, { key: "D", text: "60 percent" }], a: "A", exp: "Ty le giam: 'decreased by approximately 31 percent'." },
      { q: "What is the click-based communication system of sperm whales called?", opts: [{ key: "A", text: "Echolocation pulses" }, { key: "B", text: "Codas" }, { key: "C", text: "Sonar pings" }, { key: "D", text: "Whistles" }], a: "B", exp: "He thong: 'click-based communication system called codas'." },
      { q: "What pattern does the Caribbean sperm whale clan use?", opts: [{ key: "A", text: "2+2 coda" }, { key: "B", text: "3+1 coda" }, { key: "C", text: "1+1+3 coda" }, { key: "D", text: "4+1 coda" }], a: "C", exp: "Mau click: 'the 1+1+3 coda'." },
      { q: "By how many decibels has ocean noise increased since the 1960s?", opts: [{ key: "A", text: "12 decibels" }, { key: "B", text: "20 decibels" }, { key: "C", text: "50 decibels" }, { key: "D", text: "32 decibels" }], a: "D", exp: "Muc tang: 'increased by 32 decibels since the 1960s'." },
      { q: "By how much can noise reduce whale communication range?", opts: [{ key: "A", text: "Up to 90 percent" }, { key: "B", text: "Up to 50 percent" }, { key: "C", text: "Up to 70 percent" }, { key: "D", text: "Up to 100 percent" }], a: "A", exp: "Giam tam: 'reduce communication range by up to 90 percent'." },
      { q: "Which university conducted the blue whale frequency research?", opts: [{ key: "A", text: "MIT" }, { key: "B", text: "Stanford University" }, { key: "C", text: "Harvard University" }, { key: "D", text: "Oxford University" }], a: "B", exp: "Truong: 'research by Stanford University'." },
      { q: "What life-threatening condition can sonar cause in whales?", opts: [{ key: "A", text: "Skin cancer" }, { key: "B", text: "Heart failure" }, { key: "C", text: "Fatal decompression sickness" }, { key: "D", text: "Bacterial infection" }], a: "C", exp: "Benh: 'fatal decompression sickness from emergency deep dives'." }
    ];

    sec4Qs.forEach((item, idx) => {
      qs.push({ id: `ilsc1_q${idx + 31}`, partNumber: 4, partTitle: "Listening Section 4: Marine Bioacoustics", section: "LISTENING", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", passageText: `[Audio Transcript - Section 4]\n${sec4Script}`, questionText: `Question ${idx + 31}: ${item.q}`, options: item.opts as any, correctAnswer: item.a as any, explanation: item.exp });
    });

    // =========================================================================
    // SPEAKING PART 1: Nature Reserves & Outdoor Recreation (Q41)
    // =========================================================================
    qs.push({
      id: "ilsc1_q41",
      partNumber: 5,
      partTitle: "IELTS Speaking Part 1: Nature Reserves & Outdoor Recreation",
      section: "SPEAKING",
      speakingPrompt: "1. Do you enjoy visiting national parks or wildlife sanctuaries?\n2. What is your favorite wild animal and why?\n3. How often do you spend time in natural outdoor environments?\n4. How can individuals contribute to biodiversity conservation in their daily lives?",
      preparationTimeSeconds: 15,
      speakingTimeSeconds: 60,
      questionText: "Question 41 (Speaking Part 1): Answer interview questions about wildlife and nature reserves naturally with extended responses (60 seconds).",
      options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "View Band 8.5+ Nature Collocations" },
            { key: "C", text: "Listen to Native Examiner Questions" },
            { key: "D", text: "Skip to Part 2 Cue Card" }
          ],
      correctAnswer: "A",
      explanation: `Target Band 8.5+ Response Strategy:
- Formula: Direct answer + Reason/Evidence + Future intention or comparison.
- Use nature vocabulary: 'pristine wilderness', 'habitat fragmentation', 'keystone species', 'ecological corridor'.
- Avoid short Yes/No answers. Extend to 3-4 sentences per question.

Sample: "Absolutely, I am genuinely passionate about visiting national parks. Last summer I explored Cat Tien National Park in southern Vietnam, where I was fortunate enough to observe a rare Siamese crocodile in its natural habitat. The experience reinforced my conviction that protecting these sanctuaries is paramount for preserving biodiversity."`
    });

    // =========================================================================
    // SPEAKING PART 2: Cue Card - An Unforgettable Ecotourism Trip (Q42)
    // =========================================================================
    qs.push({
      id: "ilsc1_q42",
      partNumber: 6,
      partTitle: "IELTS Speaking Part 2: Cue Card - An Unforgettable Ecotourism Trip",
      section: "SPEAKING",
      speakingPrompt: "Describe an unforgettable ecotourism trip or wildlife encounter.\nYou should say:\n- Where you went and when\n- What wildlife or landscapes you observed\n- Who accompanied you\nAnd explain why this experience was meaningful to you.",
      preparationTimeSeconds: 60,
      speakingTimeSeconds: 120,
      questionText: "Question 42 (Speaking Part 2): Deliver a continuous 2-minute speech describing an ecotourism experience.",
      options: [
            { key: "A", text: "View 1-Minute Note-Taking Template" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3 Discussion" }
          ],
      correctAnswer: "B",
      explanation: `4-Box Note-Taking Framework:
- Box 1 (Where/When): Phong Nha-Ke Bang National Park / August 2025 / UNESCO World Heritage.
- Box 2 (Wildlife/Landscape): Son Doong cave system / endemic Langur primates / karst limestone formations.
- Box 3 (Who): University ecology club / 12 members / led by Professor Nguyen.
- Box 4 (Significance): Deepened environmental consciousness / inspired career shift toward conservation biology.

Band 9.0 Model Speech (240+ words):
"I would like to recount a truly transformative ecotourism experience at Phong Nha-Ke Bang National Park in central Vietnam, which I visited in August 2025 with my university ecology club. Our group of twelve students, led by Professor Nguyen, embarked on a five-day expedition through one of the oldest and most spectacular karst limestone formations on Earth. The highlight was undoubtedly our guided trek through the Hang En cave, the third-largest cave passage in the world. Inside, we witnessed an extraordinary subterranean ecosystem complete with its own microclimate, underground rivers teeming with blind cave fish, and colonies of swiftlets nesting on the vaulted ceilings. Beyond the caves, we observed endangered Hatinh Langur primates swinging through the primary tropical forest canopy. This experience was profoundly meaningful because it transformed my abstract textbook knowledge of biodiversity into visceral, firsthand understanding."`
    });

    // =========================================================================
    // SPEAKING PART 3: Ecotourism Ethics & Wildlife Conservation (Q43)
    // =========================================================================
    qs.push({
      id: "ilsc1_q43",
      partNumber: 7,
      partTitle: "IELTS Speaking Part 3: Ecotourism Commercialization & Wildlife Ethics",
      section: "SPEAKING",
      speakingPrompt: "1. Can commercial ecotourism genuinely protect natural habitats without disturbing wildlife?\n2. Should human access to vulnerable wilderness sanctuaries be strictly capped by government legislation?\n3. How can indigenous communities be economically empowered through sustainable eco-tourism rather than exploited?\n4. Some argue that zoos and aquariums are essential for species conservation. To what extent do you agree?\n5. What role should international organizations like UNESCO play in protecting endangered ecosystems from industrial development?",
      preparationTimeSeconds: 20,
      speakingTimeSeconds: 90,
      questionText: "Question 43 (Speaking Part 3): Provide analytical, balanced arguments on ecotourism, wildlife ethics, and conservation policy (90 seconds).",
      options: [
            { key: "A", text: "Review Argumentative Discourse Markers" },
            { key: "B", text: "Check Band 9 Academic Vocabulary" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Complete Speaking Test" }
          ],
      correctAnswer: "C",
      explanation: `PEEL Argumentation Framework for Part 3:
- Point: State macro-level position ("From an ecological governance perspective...")
- Explanation: Analyze causal mechanisms and trade-offs
- Example: Cite real-world case studies (Costa Rica, Galapagos visitor caps)
- Link: Propose balanced solutions or future trends

Band 9.0 Model Response:
"From my perspective, commercial ecotourism represents a double-edged sword. On one hand, revenue generated from responsible wildlife tourism provides essential funding for habitat conservation. Costa Rica, for instance, derives 12 percent of its national GDP from ecotourism, which directly finances reforestation programs protecting over 25 percent of its landmass. On the other hand, unchecked tourist volumes can cause irreversible damage. The Galapagos Islands now enforce strict daily visitor caps of 100,000 annually precisely because unregulated tourism was eroding fragile volcanic soil and disrupting endemic species breeding cycles."

Key Vocabulary:
- Pristine wilderness /prIs'ti:n/ (n): Hoang da nguyen so
- Habitat fragmentation /fraeg.men'teI.Sn/ (n): Pha vo sinh canh
- Carrying capacity /kaer.I.IN k@'paes.@.ti/ (n): Suc tai moi truong
- Anthropogenic disturbance /aen.Tr@.p@'dZen.Ik/ (adj): Gay ra boi con nguoi`
    });

    return qs;
  })()
};
