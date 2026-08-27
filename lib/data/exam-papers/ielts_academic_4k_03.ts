import { ExamPaper, ExamQuestion } from "./types";

export const ieltsAcademic4k03Paper: ExamPaper = {
    id: "ielts_academic_4k_03",
    title: "IELTS Academic Official Test #03 (4-Skills)",
    type: "IELTS_FULL",
    level: "Advanced",
    timeLimitMinutes: 175,
    totalQuestions: 85,
    maxScore: 9.0,
    description: "Bộ đề thi IELTS Academic Test #03 chuẩn Cambridge gồm 40 câu Listening, 40 câu Reading, Speaking AI 3 Part và 2 Writing Tasks.",
    categoryBadge: "IELTS Academic",
    tags: ["IELTS", "Cambridge", "Test 03", "Academic", "Band 9.0 Standard"],
    supportedSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
    questions: (() => {
      const qs: ExamQuestion[] = [];

      // SECTION 1: International Student Homestay & Course Inquiry (Q1 - Q10)
      const sec1Script = "Officer: Good morning, Melbourne International Student Services. How can I help you?\nStudent: Hello! My name is Kenji Tanaka. I am arriving in Melbourne next month for a postgraduate engineering diploma and would like to register for a university-approved homestay accommodation.\nOfficer: Welcome, Kenji! Let me capture your registration particulars. What is your passport number and primary contact email?\nStudent: My passport number is TK8841290, and my email is k.tanaka@tokyotech.edu.jp.\nStudent: I prefer a homestay located in Zone 1 or Zone 2 with good tram access, private study bedroom, and half-board meals which include breakfast and evening dinner.\nOfficer: We have an excellent family in Carlton, just a fifteen-minute tram ride from the main campus. The weekly accommodation fee is 295 Australian dollars, which includes all utilities, high-speed fiber internet, and laundry facilities.\nStudent: That sounds ideal. Is there an airport pickup service when my flight arrives on February 12th?\nOfficer: Yes, university shuttle airport pickup is complimentary for international students arriving between 8:00 AM and 8:00 PM.";

      const sec1Questions = [
        { q: "What is the student's full name?", opts: [{ key: "A", text: "Hiroshi Sato" }, { key: "B", text: "Kenji Tanaka" }, { key: "C", text: "Daiki Suzuki" }, { key: "D", text: "Ryota Takahashi" }], a: "B", exp: "Họ tên sinh viên: 'My name is Kenji Tanaka'." },
        { q: "What course will Kenji study in Melbourne?", opts: [{ key: "A", text: "Bachelor of Commerce" }, { key: "B", text: "Doctorate in Marine Biology" }, { key: "C", text: "Postgraduate engineering diploma" }, { key: "D", text: "Certificate in Graphic Design" }], a: "C", exp: "Khóa học: 'postgraduate engineering diploma'." },
        { q: "What is Kenji's passport number?", opts: [{ key: "A", text: "TK9901234" }, { key: "B", text: "JP5520194" }, { key: "C", text: "TK7740012" }, { key: "D", text: "TK8841290" }], a: "D", exp: "Số hộ chiếu: 'passport number is TK8841290'." },
        { q: "What meal plan option did Kenji select?", opts: [{ key: "A", text: "Half-board (Breakfast and evening dinner)" }, { key: "B", text: "Room only (Self-catering)" }, { key: "C", text: "Full board (Three meals daily)" }, { key: "D", text: "Weekend lunches only" }], a: "A", exp: "Gói ăn uống: 'half-board meals which include breakfast and evening dinner'." },
        { q: "Where is the recommended homestay located?", opts: [{ key: "A", text: "St Kilda" }, { key: "B", text: "Carlton" }, { key: "C", text: "Docklands" }, { key: "D", text: "South Yarra" }], a: "B", exp: "Địa điểm gia đình bản xứ: 'excellent family in Carlton'." },
        { q: "How long is the tram commute from Carlton to campus?", opts: [{ key: "A", text: "Five minutes" }, { key: "B", text: "Thirty minutes" }, { key: "C", text: "Fifteen minutes" }, { key: "D", text: "Forty-five minutes" }], a: "C", exp: "Thời gian đi xe điện: 'just a fifteen-minute tram ride from the main campus'." },
        { q: "What is the weekly homestay fee in Australian dollars?", opts: [{ key: "A", text: "220 AUD" }, { key: "B", text: "250 AUD" }, { key: "C", text: "350 AUD" }, { key: "D", text: "295 Australian dollars" }], a: "D", exp: "Chi phí thuê tuần: 'weekly accommodation fee is 295 Australian dollars'." },
        { q: "What amenities are included in the weekly fee?", opts: [{ key: "A", text: "Utilities, fiber internet, and laundry facilities" }, { key: "B", text: "Private car rental and parking" }, { key: "C", text: "Gym membership and personal chef" }, { key: "D", text: "Daily dry cleaning and restaurant vouchers" }], a: "A", exp: "Tiện ích bao gồm: 'includes all utilities, high-speed fiber internet, and laundry facilities'." },
        { q: "When will Kenji arrive in Melbourne?", opts: [{ key: "A", text: "January 15th" }, { key: "B", text: "February 12th" }, { key: "C", text: "March 1st" }, { key: "D", text: "April 10th" }], a: "B", exp: "Ngày đến nơi: 'when my flight arrives on February 12th'." },
        { q: "Under what condition is university airport pickup free?", opts: [{ key: "A", text: "If arriving by boat" }, { key: "B", text: "Only on weekend mornings" }, { key: "C", text: "For flights arriving between 8:00 AM and 8:00 PM" }, { key: "D", text: "If paying a 50-dollar surcharge" }], a: "C", exp: "Điều kiện đón miễn phí: 'arriving between 8:00 AM and 8:00 PM'." }
      ];

      sec1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 1}`,
          partNumber: 1,
          partTitle: "Listening Section 1: Homestay Registration",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
          passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
          questionText: `Question ${idx + 1}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 2: Botanical Gardens Guided Tour & Eco-Preserve (Q11 - Q20)
      const sec2Script = "Guide: Welcome to the Royal Botanic Gardens and Wetland Sanctuary. I am Fiona Campbell, Senior Horticultural Educator. Today we celebrate the official opening of our Alpine Flora Conservation Glasshouse. Spanning 1,800 square meters, this microclimate biome replicates the sub-alpine conditions of the Southern Highlands, featuring over 400 species of endangered glacial ferns, mosses, and high-altitude orchids. In Zone 2, our Native Pollinator Meadow highlights the crucial ecological role of native stingless bees and nectar bats. The glasshouse is cooled using geothermal ground-source heat pumps and rain harvesting cisterns that supply 100% of our irrigation water. Guided sensory audio tours are available at the Visitor Pavilion in eight languages. The Botanical Tea Pavilion by the lotus pond serves refreshments from 10:00 AM to 4:30 PM. Please note that stepping off designated boardwalks is strictly prohibited to prevent soil compaction around sensitive root systems.";

      const sec2Questions = [
        { q: "What new facility is being officially opened today?", opts: [{ key: "A", text: "The Tropical Reptile House" }, { key: "B", text: "The Butterfly Aviary" }, { key: "C", text: "The Desert Cactus Pavilion" }, { key: "D", text: "The Alpine Flora Conservation Glasshouse" }], a: "D", exp: "Cơ sở mới: 'Alpine Flora Conservation Glasshouse'." },
        { q: "How large is the new conservation glasshouse?", opts: [{ key: "A", text: "1,800 square meters" }, { key: "B", text: "500 square meters" }, { key: "C", text: "1,200 square meters" }, { key: "D", text: "3,000 square meters" }], a: "A", exp: "Diện tích: 'Spanning 1,800 square meters'." },
        { q: "How many endangered plant species are housed in the glasshouse?", opts: [{ key: "A", text: "150 species" }, { key: "B", text: "Over 400 species" }, { key: "C", text: "800 species" }, { key: "D", text: "1,500 species" }], a: "B", exp: "Số lượng loài: 'over 400 species of endangered glacial ferns, mosses, and high-altitude orchids'." },
        { q: "What organisms are highlighted in the Native Pollinator Meadow?", opts: [{ key: "A", text: "Butterflies and hummingbirds only" }, { key: "B", text: "Locusts and beetles" }, { key: "C", text: "Native stingless bees and nectar bats" }, { key: "D", text: "Ants and earthworms" }], a: "C", exp: "Sinh vật thụ phấn bản địa: 'native stingless bees and nectar bats'." },
        { q: "How is the glasshouse cooled sustainably?", opts: [{ key: "A", text: "Diesel generators" }, { key: "B", text: "Open roof louvers only" }, { key: "C", text: "Imported block ice" }, { key: "D", text: "Geothermal ground-source heat pumps" }], a: "D", exp: "Công nghệ làm mát: 'geothermal ground-source heat pumps'." },
        { q: "Where does 100% of the irrigation water come from?", opts: [{ key: "A", text: "Rain harvesting cisterns" }, { key: "B", text: "Municipal city tap water" }, { key: "C", text: "Desalinated ocean water" }, { key: "D", text: "Bottled mineral water" }], a: "A", exp: "Nguồn nước tưới cây: 'rain harvesting cisterns that supply 100% of our irrigation water'." },
        { q: "Where is the Botanical Tea Pavilion located?", opts: [{ key: "A", text: "In the main car park" }, { key: "B", text: "By the lotus pond" }, { key: "C", text: "Inside the Alpine Glasshouse" }, { key: "D", text: "Next to the entrance gate" }], a: "B", exp: "Vị trí quán trà: 'Botanical Tea Pavilion by the lotus pond'." },
        { q: "What are the tea pavilion's operating hours?", opts: [{ key: "A", text: "8:00 AM - 12:00 PM" }, { key: "B", text: "12:00 PM - 6:00 PM" }, { key: "C", text: "10:00 AM - 4:30 PM" }, { key: "D", text: "All day until sunset" }], a: "C", exp: "Giờ hoạt động: 'from 10:00 AM to 4:30 PM'." },
        { q: "Why is stepping off boardwalks strictly prohibited?", opts: [{ key: "A", text: "Risk of electric shocks" }, { key: "B", text: "Deep mud sinkholes" }, { key: "C", text: "Presence of poisonous snakes" }, { key: "D", text: "To prevent soil compaction around sensitive root systems" }], a: "D", exp: "Lý do cấm rời sàn gỗ: 'prevent soil compaction around sensitive root systems'." },
        { q: "What is Fiona Campbell's job title?", opts: [{ key: "A", text: "Senior Horticultural Educator" }, { key: "B", text: "Head Security Officer" }, { key: "C", text: "Glasshouse Architect" }, { key: "D", text: "Sanctuary Gift Shop Supervisor" }], a: "A", exp: "Chức vụ: 'Fiona Campbell, Senior Horticultural Educator'." }
      ];

      sec2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 11}`,
          partNumber: 2,
          partTitle: "Listening Section 2: Botanical Glasshouse Tour",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
          passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
          questionText: `Question ${idx + 11}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 3: Academic Discussion on Satellite Remote Sensing of Glacial Retreat (Q21 - Q30)
      const sec3Script = "Professor: Good afternoon, Liam and Maya. Let's review your dissertation research proposal on utilizing synthetic aperture radar (SAR) to quantify glacial mass balance in the Patagonian Icefields.\nMaya: Thank you, Professor Davies. We are analyzing interferometric SAR datasets from the European Sentinel-1 constellation and NASA's ICESat-2 laser altimeter spanning the years 2018 through 2025.\nLiam: Our initial surface elevation velocity models demonstrate that the Upsala and Viedma glaciers have undergone rapid terminus retreat, thinning by an average of 4.3 meters annually due to calving acceleration and rising proglacial lake water temperatures.\nProfessor: That is a significant rate of volumetric mass loss. How are you accounting for seasonal firn layer densification and atmospheric phase screen noise?\nMaya: We applied atmospheric correction algorithms using ground-based meteorological stations and calibrated our radar backscatter against airborne LiDAR validation tracks.\nProfessor: Excellent methodology. Ensure you present your elevation difference raster maps at the upcoming Cryosphere Geoscience Conference on December 5th.";

      const sec3Questions = [
        { q: "What geographic region is the focus of the students' glacial research?", opts: [{ key: "A", text: "The Greenland Ice Sheet" }, { key: "B", text: "The Patagonian Icefields" }, { key: "C", text: "The Swiss Alps" }, { key: "D", text: "The Himalayas" }], a: "B", exp: "Khu vực nghiên cứu: 'glacial mass balance in the Patagonian Icefields'." },
        { q: "Which two satellite remote sensing platforms are utilized in the study?", opts: [{ key: "A", text: "Hubble and James Webb" }, { key: "B", text: "Landsat-5 and Spot-4" }, { key: "C", text: "Sentinel-1 SAR and NASA's ICESat-2 laser altimeter" }, { key: "D", text: "GPS navigation satellites only" }], a: "C", exp: "Vệ tinh viễn thám: 'European Sentinel-1 constellation and NASA's ICESat-2 laser altimeter'." },
        { q: "What time period do the analyzed datasets cover?", opts: [{ key: "A", text: "2010 to 2015" }, { key: "B", text: "2000 to 2010" }, { key: "C", text: "2024 to 2026" }, { key: "D", text: "2018 through 2025" }], a: "D", exp: "Thời gian dữ liệu: 'spanning the years 2018 through 2025'." },
        { q: "Which two glaciers were identified as experiencing rapid terminus retreat?", opts: [{ key: "A", text: "Upsala and Viedma glaciers" }, { key: "B", text: "Perito Moreno and Grey" }, { key: "C", text: "Fox and Franz Josef" }, { key: "D", text: "Aletsch and Rhone" }], a: "A", exp: "Tên hai dòng sông băng: 'Upsala and Viedma glaciers'." },
        { q: "What was the average annual glacier thinning rate observed?", opts: [{ key: "A", text: "1.2 meters" }, { key: "B", text: "4.3 meters annually" }, { key: "C", text: "2.5 meters" }, { key: "D", text: "8.0 meters" }], a: "B", exp: "Tốc độ mỏng đi hàng năm: 'thinning by an average of 4.3 meters annually'." },
        { q: "What two primary drivers caused this accelerated retreat?", opts: [{ key: "A", text: "Volcanic ash and tourist hiking" }, { key: "B", text: "Heavy snowfall and wind erosion" }, { key: "C", text: "Calving acceleration and rising proglacial lake water temperatures" }, { key: "D", text: "Underground geothermal magma" }], a: "C", exp: "Nguyên nhân tan băng: 'calving acceleration and rising proglacial lake water temperatures'." },
        { q: "What source of radar measurement error did Professor Davies highlight?", opts: [{ key: "A", text: "Solar flare interference" }, { key: "B", text: "Satellite battery decay" }, { key: "C", text: "Computer monitor resolution" }, { key: "D", text: "Firn layer densification and atmospheric phase screen noise" }], a: "D", exp: "Nhiễu dữ liệu: 'seasonal firn layer densification and atmospheric phase screen noise'." },
        { q: "What data did the students use to calibrate radar backscatter?", opts: [{ key: "A", text: "Airborne LiDAR validation tracks" }, { key: "B", text: "Handheld smartphone photos" }, { key: "C", text: "Historical newspaper clippings" }, { key: "D", text: "Eye-witness accounts" }], a: "A", exp: "Dữ liệu hiệu chuẩn: 'calibrated our radar backscatter against airborne LiDAR validation tracks'." },
        { q: "What must the students present at the upcoming conference?", opts: [{ key: "A", text: "A 3D printed glacier model" }, { key: "B", text: "Elevation difference raster maps" }, { key: "C", text: "A short documentary video" }, { key: "D", text: "A funding grant invoice" }], a: "B", exp: "Sản phẩm báo cáo: 'elevation difference raster maps'." },
        { q: "When will the Cryosphere Geoscience Conference take place?", opts: [{ key: "A", text: "November 15th" }, { key: "B", text: "January 20th" }, { key: "C", text: "December 5th" }, { key: "D", text: "February 12th" }], a: "C", exp: "Ngày diễn ra hội nghị: 'Conference on December 5th'." }
      ];

      sec3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 21}`,
          partNumber: 3,
          partTitle: "Listening Section 3: Glacial Remote Sensing",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
          passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
          questionText: `Question ${idx + 21}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // SECTION 4: University Lecture on Neuroplasticity & Synaptic Pruning (Q31 - Q40)
      const sec4Script = "Lecturer: Good morning, students of cognitive neuroscience. In today's lecture, we examine the cellular and epigenetic mechanisms of developmental neuroplasticity, with a particular focus on synaptic pruning and critical period plasticity during childhood language acquisition. During early post-natal development, the human cerebral cortex undergoes an explosive burst of synaptogenesis, generating roughly twice as many synaptic connections as are present in adulthood. Between the ages of two and ten, an experience-dependent competitive elimination process known as synaptic pruning occurs. Astrocytes and microglia actively engulf and eliminate non-functional or weakly stimulated dendritic spines, while frequently activated neuronal pathways are reinforced via long-term potentiation and axonal myelin sheath insulation. This synaptic sculpting is tightly regulated by inhibitory gamma-aminobutyric acid (GABAergic) interneuron maturation, which establishes the onset and termination of the 'critical window' for native phoneme acquisition. Understanding these molecular cascades provides vital clinical insights into developmental neurodivergent conditions including autism spectrum disorders and early childhood speech apraxia.";

      const sec4Questions = [
        { q: "What phenomenon occurs during early post-natal brain development?", opts: [{ key: "A", text: "Total loss of brain cells" }, { key: "B", text: "Hardening of the skull bones only" }, { key: "C", text: "Cessation of all neuronal activity" }, { key: "D", text: "Explosive burst of synaptogenesis (creating 2x adult synaptic density)" }], a: "D", exp: "Quá trình hình thành khớp thần kinh bùng nổ: 'generating roughly twice as many synaptic connections as are present in adulthood'." },
        { q: "What is 'synaptic pruning' in developmental neuroscience?", opts: [{ key: "A", text: "Experience-dependent elimination of weak or non-functional synapses" }, { key: "B", text: "Surgical removal of brain tumors" }, { key: "C", text: "The growth of new skull tissue" }, { key: "D", text: "Memory loss in old age" }], a: "A", exp: "Định nghĩa cắt tỉa khớp thần kinh: 'experience-dependent competitive elimination process known as synaptic pruning'." },
        { q: "Between what ages does primary synaptic pruning occur?", opts: [{ key: "A", text: "Birth to 6 months" }, { key: "B", text: "Between the ages of two and ten" }, { key: "C", text: "Ages 20 to 30" }, { key: "D", text: "Ages 50 to 65" }], a: "B", exp: "Độ tuổi diễn ra: 'Between the ages of two and ten'." },
        { q: "Which glial cells actively engulf and eliminate weak dendritic spines?", opts: [{ key: "A", text: "Red blood cells" }, { key: "B", text: "Platelets" }, { key: "C", text: "Astrocytes and microglia" }, { key: "D", text: "Bone osteoclasts" }], a: "C", exp: "Tế bào dọn dẹp synapse yếu: 'Astrocytes and microglia actively engulf and eliminate non-functional or weakly stimulated dendritic spines'." },
        { q: "How are frequently activated neural pathways physically strengthened?", opts: [{ key: "A", text: "By turning into cartilage" }, { key: "B", text: "By losing electrical conductivity" }, { key: "C", text: "By shrinking in diameter" }, { key: "D", text: "Via long-term potentiation and axonal myelin sheath insulation" }], a: "D", exp: "Cơ chế củng cố đường dẫn truyền: 'via long-term potentiation and axonal myelin sheath insulation'." },
        { q: "What neurotransmitter interneuron maturation regulates critical period windows?", opts: [{ key: "A", text: "GABAergic (gamma-aminobutyric acid) interneurons" }, { key: "B", text: "Dopamine receptors" }, { key: "C", text: "Adrenaline glands" }, { key: "D", text: "Insulin transporters" }], a: "A", exp: "Cơ chế điều tiết giai đoạn nhạy cảm: 'regulated by inhibitory gamma-aminobutyric acid (GABAergic) interneuron maturation'." },
        { q: "What cognitive skill depends on the childhood critical period window?", opts: [{ key: "A", text: "Driving a vehicle" }, { key: "B", text: "Native phoneme and speech sound acquisition" }, { key: "C", text: "Arithmetic long division" }, { key: "D", text: "Stock market trading" }], a: "B", exp: "Kỹ năng trong giai đoạn vàng: 'critical window for native phoneme acquisition'." },
        { q: "What clinical conditions are illuminated by synaptic pruning research?", opts: [{ key: "A", text: "Cardiovascular disease and diabetes" }, { key: "B", text: "Asthma and skin allergies" }, { key: "C", text: "Autism spectrum disorders and early childhood speech apraxia" }, { key: "D", text: "Broken bones and arthritis" }], a: "C", exp: "Ý nghĩa y học: 'autism spectrum disorders and early childhood speech apraxia'." },
        { q: "What happens to synapses that are weakly stimulated?", opts: [{ key: "A", text: "They turn into brain tumors" }, { key: "B", text: "They double in size" }, { key: "C", text: "They become bone tissue" }, { key: "D", text: "They are engulfed and eliminated by glial cells" }], a: "D", exp: "Số phận của synapse yếu: Bị đại thực bào thần kinh tiêu hóa và loại bỏ." },
        { q: "What is the primary academic discipline of this lecture?", opts: [{ key: "A", text: "Developmental cognitive neuroscience" }, { key: "B", text: "Civil structural engineering" }, { key: "C", text: "Atmospheric oceanography" }, { key: "D", text: "Ancient Roman history" }], a: "A", exp: "Chuyên ngành bài giảng: 'cognitive neuroscience'." }
      ];

      sec4Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 31}`,
          partNumber: 4,
          partTitle: "Listening Section 4: Neuroplasticity & Pruning",
          section: "LISTENING",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
          passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
          questionText: `Question ${idx + 31}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // READING PASSAGE 1: The Hydraulic Engineering of Ancient Angkor Wat (Q41 - Q53: 13 Questions)
      const readP1 = `READING PASSAGE 1 — THE HYDRAULIC CIVILIZATION OF ANCIENT ANGKOR\n\nBetween the ninth and fifteenth centuries CE, the Khmer Empire established its capital at Angkor in modern-day northwestern Cambodia, constructing what archaeological historians now recognize as the most expansive low-density urban sprawl of the pre-industrial world. Covering over 1,000 square kilometers, the Angkorian civilization supported a population estimated between 750,000 and one million residents. Central to the empire's extraordinary longevity and agricultural prosperity was a sophisticated, vast hydraulic management network that mastered the extreme fluctuations of the Southeast Asian monsoon climate.\n\nThe hydrological challenges facing Khmer engineers were twofold: during the five-month monsoon season from May to October, torrential rains inundated the landscape, while the subsequent seven-month dry season caused severe drought. To regulate this erratic water cycle, Angkorian hydraulic engineers constructed monumental artificial reservoirs known as 'barays.' The largest of these, the West Baray, excavated in the eleventh century, measures an astonishing 8 kilometers in length and 2.1 kilometers in width, capable of storing over 53 million cubic meters of water. These reservoirs were engineered without concrete, utilizing compacted earth embankments and gravity-fed sluice gates aligned precisely with regional topological gradients.\n\nWater from the barays was channeled through an intricate grid of thousands of kilometers of interconnected canals, dykes, and masonry overflow weirs. This system fulfilled multiple civic functions: it mitigated catastrophic wet-season flooding, provided domestic municipal water supplies, enabled year-round double and triple wet-rice crop cultivation, and served as navigable transportation canals along which massive sandstone blocks were floated from the Kulen quarries to construct the temple complexes of Angkor Wat and the Bayon.\n\nHowever, LiDAR remote sensing and sediment core dendrochronology conducted by the Greater Angkor Project have revealed that this colossal hydraulic system also contained the seeds of the civilization's ultimate decline. In the late fourteenth and early fifteenth centuries, mainland Southeast Asia experienced decades of severe drought interspersed with anomalous, ultra-intense monsoon deluge years associated with severe El Niño oscillations. The extreme flooding overwhelmed Angkor's canal networks, eroding overflow channels into deep ravines and choking reservoirs with massive volumes of silt, rendering the irrigation infrastructure irrecoverable and prompting the gradual relocation of the political capital southward to Phnom Penh.`;

      const r1Questions = [
        { q: "How large was the urban sprawl of ancient Angkor?", opts: [{ key: "A", text: "100 square kilometers" }, { key: "B", text: "Covering over 1,000 square kilometers" }, { key: "C", text: "500 square kilometers" }, { key: "D", text: "5,000 square kilometers" }], a: "B", exp: "Đoạn 1: 'Covering over 1,000 square kilometers'." },
        { q: "What was the estimated population of the Angkorian capital at its peak?", opts: [{ key: "A", text: "50,000 residents" }, { key: "B", text: "200,000 residents" }, { key: "C", text: "Between 750,000 and one million residents" }, { key: "D", text: "Three million residents" }], a: "C", exp: "Đoạn 1: 'population estimated between 750,000 and one million residents'." },
        { q: "What are the monumental artificial reservoirs of Angkor called?", opts: [{ key: "A", text: "Aqueducts" }, { key: "B", text: "Cenotes" }, { key: "C", text: "Qanats" }, { key: "D", text: "Barays" }], a: "D", exp: "Đoạn 2: 'monumental artificial reservoirs known as barays'." },
        { q: "What are the physical dimensions of the West Baray?", opts: [{ key: "A", text: "8 kilometers in length and 2.1 kilometers in width" }, { key: "B", text: "2 km long by 500m wide" }, { key: "C", text: "15 km long by 5 km wide" }, { key: "D", text: "20 km long by 10 km wide" }], a: "A", exp: "Đoạn 2: 'measures an astonishing 8 kilometers in length and 2.1 kilometers in width'." },
        { q: "How much water could the West Baray store?", opts: [{ key: "A", text: "5 million cubic meters" }, { key: "B", text: "Over 53 million cubic meters" }, { key: "C", text: "20 million cubic meters" }, { key: "D", text: "100 million cubic meters" }], a: "B", exp: "Đoạn 2: 'capable of storing over 53 million cubic meters of water'." },
        { q: "What construction materials were used to build the baray embankments?", opts: [{ key: "A", text: "Reinforced steel and concrete" }, { key: "B", text: "Kiln-fired ceramic bricks exclusively" }, { key: "C", text: "Compacted earth embankments and gravity-fed sluice gates" }, { key: "D", text: "Wooden timber palisades" }], a: "C", exp: "Đoạn 2: 'engineered without concrete, utilizing compacted earth embankments and gravity-fed sluice gates'." },
        { q: "How were massive sandstone temple building blocks transported from Mount Kulen?", opts: [{ key: "A", text: "On wheeled iron carts" }, { key: "B", text: "Carried by human chains" }, { key: "C", text: "Pulled by steam locomotives" }, { key: "D", text: "Floated on rafts along navigable canals" }], a: "D", exp: "Đoạn 3: 'served as navigable transportation canals along which massive sandstone blocks were floated'." },
        { q: "How many rice harvests per year did the irrigation network enable?", opts: [{ key: "A", text: "Double and triple wet-rice crop cultivation" }, { key: "B", text: "A single annual harvest" }, { key: "C", text: "One harvest every two years" }, { key: "D", text: "None; they relied entirely on wild foraging" }], a: "A", exp: "Đoạn 3: 'enabled year-round double and triple wet-rice crop cultivation'." },
        { q: "What modern archaeological technology revealed the extent of Angkor's hydraulic system?", opts: [{ key: "A", text: "Deep core dynamite blasting" }, { key: "B", text: "LiDAR airborne remote sensing and tree-ring dendrochronology" }, { key: "C", text: "Metal detector scans only" }, { key: "D", text: "Satellite optical photography only" }], a: "B", exp: "Đoạn 4: 'LiDAR remote sensing and sediment core dendrochronology'." },
        { q: "What climatic anomalies occurred in the 14th and 15th centuries?", opts: [{ key: "A", text: "A continuous ice age with glaciers" }, { key: "B", text: "Permanent dry desert conditions without rain" }, { key: "C", text: "Severe droughts interspersed with ultra-intense monsoon deluges (El Niño)" }, { key: "D", text: "Total cessation of seasonal monsoon cycles" }], a: "C", exp: "Đoạn 4: 'decades of severe drought interspersed with anomalous, ultra-intense monsoon deluge years associated with severe El Niño oscillations'." },
        { q: "How did extreme flooding damage the hydraulic infrastructure?", opts: [{ key: "A", text: "Melted the stone temples" }, { key: "B", text: "Burned the earthen dams" }, { key: "C", text: "Poisoned the groundwater with salt" }, { key: "D", text: "Eroded overflow canals into deep ravines and silted up reservoirs" }], a: "D", exp: "Đoạn 4: 'eroding overflow channels into deep ravines and choking reservoirs with massive volumes of silt'." },
        { q: "Where was the political capital relocated after Angkor's decline?", opts: [{ key: "A", text: "Southward to Phnom Penh" }, { key: "B", text: "Bangkok" }, { key: "C", text: "Hanoi" }, { key: "D", text: "Vientiane" }], a: "A", exp: "Đoạn 4: 'relocation of the political capital southward to Phnom Penh'." },
        { q: "What is the primary conclusion regarding Angkor's engineering legacy?", opts: [{ key: "A", text: "The Khmer possessed no real engineering skills" }, { key: "B", text: "Angkor was a masterclass in landscape-scale water management whose rigidity proved vulnerable to extreme climatic shifts" }, { key: "C", text: "Angkor's water system was purely ornamental with no agricultural value" }, { key: "D", text: "The city was destroyed entirely by volcanic eruptions" }], a: "B", exp: "Kết luận: Hệ thống thủy lực quy mô cảnh quan vĩ đại nhưng tính cứng nhắc khiến nó dễ tổn thương trước biến đổi khí hậu cực đoan." }
      ];

      r1Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 41}`,
          partNumber: 5,
          partTitle: "Reading Passage 1: Angkor Hydraulic Civilization",
          section: "READING",
          passageText: readP1,
          questionText: `Question ${idx + 41}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // PASSAGE 2: Microplastic Geochemistry in the Anthropocene (Q54 - Q66: 13 Questions)
      const readP2 = `READING PASSAGE 2 — MICROPLASTIC GEOCHEMISTRY IN THE ANTHROPOCENE EPOCH\n\nSince the commencement of commercial polymer mass manufacturing in the 1950s, human society has produced over 8.3 billion metric tons of synthetic plastics. Due to the exceptional chemical durability conferred by high-molecular-weight carbon-carbon backbone bonds, synthetic polymers do not biologically degrade in ambient environments; rather, they undergo mechanical abrasion, photo-oxidative ultraviolet degradation, and wave shearing into trillions of microscopic synthetic fragments termed microplastics (particles under 5 millimeters in diameter) and nanoplastics (particles smaller than 1 micrometer).\n\nGeologists and environmental geochemists now propose that microplastic particles constitute an indelible stratigraphic marker of the Anthropocene—the proposed geological epoch defined by pervasive human alteration of Earth's sedimentary strata. Sediment core analyses extracted from marine abyssal plains, Arctic sea ice cores, high-altitude alpine snowbanks, and pristine subterranean stalagmites consistently reveal stratified microplastic deposition layers corresponding precisely to post-1960 industrial acceleration.\n\nBeyond their physical ubiquity, microplastics act as potent geochemical vectors in aquatic and terrestrial food webs. Owing to their extremely high surface-area-to-volume ratio and hydrophobic polymeric matrices, microplastic particles rapidly adsorb persistent organic pollutants (POPs)—including polychlorinated biphenyls (PCBs), dichlorodiphenyltrichloroethane (DDT), and polycyclic aromatic hydrocarbons (PAHs)—at concentrations exceeding one million times surrounding ambient water levels. When ingested by marine filter-feeders, zooplankton, and benthic organisms, these toxic contaminants bioaccumulate through trophic levels, inducing cellular cytotoxicity, endocrine hormone disruption, and metabolic reproductive impairments across marine biodiversity.`;

      const r2Questions = [
        { q: "How much plastic has human society manufactured since the 1950s?", opts: [{ key: "A", text: "1.2 billion metric tons" }, { key: "B", text: "4.5 billion metric tons" }, { key: "C", text: "Over 8.3 billion metric tons" }, { key: "D", text: "20 billion metric tons" }], a: "C", exp: "Đoạn 1: 'produced over 8.3 billion metric tons of synthetic plastics'." },
        { q: "What gives synthetic plastics their extreme chemical durability?", opts: [{ key: "A", text: "Natural wooden fibers" }, { key: "B", text: "Water-soluble sugar coatings" }, { key: "C", text: "Magnetic iron particles" }, { key: "D", text: "High-molecular-weight carbon-carbon backbone bonds" }], a: "D", exp: "Đoạn 1: 'high-molecular-weight carbon-carbon backbone bonds'." },
        { q: "What is the size threshold defining 'microplastics'?", opts: [{ key: "A", text: "Particles under 5 millimeters in diameter" }, { key: "B", text: "Particles between 1 and 2 centimeters" }, { key: "C", text: "Particles over 10 centimeters" }, { key: "D", text: "Any visible plastic bag" }], a: "A", exp: "Đoạn 1: 'particles under 5 millimeters in diameter'." },
        { q: "What are plastic particles smaller than 1 micrometer termed?", opts: [{ key: "A", text: "Macroplastics" }, { key: "B", text: "Nanoplastics" }, { key: "C", text: "Mesoplastics" }, { key: "D", text: "Polymer aggregates" }], a: "B", exp: "Đoạn 1: 'nanoplastics (particles smaller than 1 micrometer)'." },
        { q: "Why do geologists consider microplastics a marker for the Anthropocene epoch?", opts: [{ key: "A", text: "They glow under ultraviolet lights" }, { key: "B", text: "They turn into fossil fuels instantly" }, { key: "C", text: "They form indelible, stratified sedimentary deposition layers globally since 1960" }, { key: "D", text: "They replace natural limestone entirely" }], a: "C", exp: "Đoạn 2: 'constitute an indelible stratigraphic marker of the Anthropocene... stratified microplastic deposition layers corresponding precisely to post-1960 industrial acceleration'." },
        { q: "Where have microplastic deposition layers been detected in geological cores?", opts: [{ key: "A", text: "Urban landfills only" }, { key: "B", text: "Inside volcanic magma chambers only" }, { key: "C", text: "On the lunar surface" }, { key: "D", text: "Marine abyssal plains, Arctic sea ice, alpine snowbanks, and cave stalagmites" }], a: "D", exp: "Đoạn 2: 'marine abyssal plains, Arctic sea ice cores, high-altitude alpine snowbanks, and pristine subterranean stalagmites'." },
        { q: "Why do microplastics readily adsorb environmental toxic chemicals?", opts: [{ key: "A", text: "High surface-area-to-volume ratio and hydrophobic polymeric matrices" }, { key: "B", text: "They are magnetic" }, { key: "C", text: "They are heated by geothermal energy" }, { key: "D", text: "They emit electrical currents" }], a: "A", exp: "Đoạn 3: 'high surface-area-to-volume ratio and hydrophobic polymeric matrices'." },
        { q: "At what concentration multiplier can pollutants adsorb onto microplastic surfaces?", opts: [{ key: "A", text: "Ten times" }, { key: "B", text: "Exceeding one million times surrounding ambient water levels" }, { key: "C", text: "One hundred times" }, { key: "D", text: "Equal to ambient levels" }], a: "B", exp: "Đoạn 3: 'concentrations exceeding one million times surrounding ambient water levels'." },
        { q: "Which persistent organic pollutants (POPs) are cited as adsorbing onto plastics?", opts: [{ key: "A", text: "Sodium chloride and potassium" }, { key: "B", text: "Glucose and amino acids" }, { key: "C", text: "PCBs, DDT, and polycyclic aromatic hydrocarbons (PAHs)" }, { key: "D", text: "Carbonated water" }], a: "C", exp: "Đoạn 3: 'polychlorinated biphenyls (PCBs), dichlorodiphenyltrichloroethane (DDT), and polycyclic aromatic hydrocarbons (PAHs)'." },
        { q: "What biological process occurs when organisms ingest contaminated plastic particles?", opts: [{ key: "A", text: "Immediate rapid growth" }, { key: "B", text: "Conversion of plastic into vitamins" }, { key: "C", text: "Immunity against viral infections" }, { key: "D", text: "Bioaccumulation across trophic food web levels" }], a: "D", exp: "Đoạn 3: 'bioaccumulate through trophic levels'." },
        { q: "What toxicological consequences result from plastic ingestion in marine life?", opts: [{ key: "A", text: "Cellular cytotoxicity, endocrine hormone disruption, and reproductive impairment" }, { key: "B", text: "Enhanced swimming speed" }, { key: "C", text: "Thicker protective shell armor" }, { key: "D", text: "Transition to land-dwelling habits" }], a: "A", exp: "Đoạn 3: 'inducing cellular cytotoxicity, endocrine hormone disruption, and metabolic reproductive impairments'." },
        { q: "What environmental forces fragment macroplastics into microscopic particles?", opts: [{ key: "A", text: "Deep-sea pressure cooking" }, { key: "B", text: "Mechanical abrasion, photo-oxidative UV degradation, and wave shearing" }, { key: "C", text: "Earthquake vibrations only" }, { key: "D", text: "Bacterial digestion" }], a: "B", exp: "Đoạn 1: 'mechanical abrasion, photo-oxidative ultraviolet degradation, and wave shearing'." },
        { q: "What is the primary scientific warning articulated by the article?", opts: [{ key: "A", text: "Microplastics are completely inert and harmless" }, { key: "B", text: "Plastic production will cease spontaneously tomorrow" }, { key: "C", text: "Microplastics represent an irreversible planetary geochemical alteration and ecological hazard" }, { key: "D", text: "Microplastics can be completely filtered from all oceans within one year" }], a: "C", exp: "Thông điệp chính: Vi nhựa đại diện cho sự biến đổi địa chất - hóa sinh địa cầu không thể đảo ngược và là mối nguy hại sinh thái to lớn." }
      ];

      r2Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 54}`,
          partNumber: 6,
          partTitle: "Reading Passage 2: Microplastic Geochemistry",
          section: "READING",
          passageText: readP2,
          questionText: `Question ${idx + 54}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
      });

      // PASSAGE 3: Cognitive Evolutionary Anthropology of Symbolic Cave Art (Q67 - Q80: 14 Questions)
      const readP3 = `READING PASSAGE 3 — THE SYMBOLIC REVOLUTION: COGNITIVE EVOLUTION IN UPPER PALEOLITHIC CAVE ART\n\nThe emergence of sophisticated parietal cave art across Franco-Cantabria during the Upper Paleolithic—exemplified by the masterworks of Chauvet (circa 36,000 BP), Lascaux (17,000 BP), and Altamira (15,000 BP)—is widely celebrated as the definitive archaeological benchmark of the 'Human Creative Revolution.' For over a century, classical anthropologists interpreted these vivid polychrome depictions of stampeding bisons, woolly mammoths, and enigmatic hand stencils through the lens of simplistic 'hunting magic' or sympathetic fertility rituals. However, revolutionary interdisciplinary research synthesizing cognitive evolutionary anthropology, acoustic resonance mapping, and non-destructive pigment spectrometry has overturned these antiquated dogmas.\n\nHigh-resolution acoustic archaeology conducted inside the subterranean chambers of Niaux and Chauvet reveals an astonishing mathematical correlation between the spatial clustering of parietal zoomorphic paintings and acoustic resonance focal points. Upper Paleolithic artists consistently placed vivid representations of resonant fauna—such as roaring lions and thundering bison—at precise subterranean nodes where low-frequency sound vibrations echo with harmonic amplifications exceeding 25 decibels. This provides compelling physical evidence that Upper Paleolithic caves functioned not as passive decorative galleries, but as multisensory, immersive ritual performance spaces where acoustic chanting, flickering torchlight, and kinetic visual illusions converged.\n\nFurthermore, micro-spectrometric pigment analyses demonstrate that paleolithic artists utilized sophisticated chemical synthesis: black manganese dioxides and red ferric ochres were ground to microscopic grain sizes (under 5 microns) and blended with specialized organic binders such as bone marrow lipids and plant waxes to enhance longevity and adhesive viscosity. The deliberate combination of non-figurative geometric symbols (dots, grids, penniforms) with figurative animal motifs indicates the emergence of advanced externalized symbolic data storage—the cognitive precursor to formal proto-writing systems.`;

      const r3Questions = [
        { q: "What three famous prehistoric cave sites are cited in the article?", opts: [{ key: "A", text: "Stonehenge, Giza, and Petra" }, { key: "B", text: "Pompeii, Carthage, and Troy" }, { key: "C", text: "Angkor, Borobudur, and Bagan" }, { key: "D", text: "Chauvet, Lascaux, and Altamira" }], a: "D", exp: "Đoạn 1: 'Chauvet (circa 36,000 BP), Lascaux (17,000 BP), and Altamira (15,000 BP)'." },
        { q: "How did 19th-century classical anthropologists historically interpret cave art?", opts: [{ key: "A", text: "As simplistic 'hunting magic' or sympathetic fertility rituals" }, { key: "B", text: "As astronomical celestial navigation star charts" }, { key: "C", text: "As commercial market price lists" }, { key: "D", text: "As children's random doodles" }], a: "A", exp: "Đoạn 1: 'interpreted these vivid polychrome depictions... through the lens of simplistic hunting magic or sympathetic fertility rituals'." },
        { q: "What discovery was made by acoustic archaeology in caves like Chauvet and Niaux?", opts: [{ key: "A", text: "Ancient speakers made of copper" }, { key: "B", text: "A correlation between painting locations and acoustic resonance focal points" }, { key: "C", text: "Total absence of any sound reverberation" }, { key: "D", text: "Musical instruments carved into stone walls" }], a: "B", exp: "Đoạn 2: 'mathematical correlation between the spatial clustering of parietal zoomorphic paintings and acoustic resonance focal points'." },
        { q: "Where were depictions of roaring lions and bison deliberately painted?", opts: [{ key: "A", text: "At cave entrances exposed to bright sunlight" }, { key: "B", text: "Only on flat cave floors" }, { key: "C", text: "At subterranean acoustic nodes where sound reverberation amplifies by >25 dB" }, { key: "D", text: "On exterior cliffs outside caves" }], a: "C", exp: "Đoạn 2: 'at precise subterranean nodes where low-frequency sound vibrations echo with harmonic amplifications exceeding 25 decibels'." },
        { q: "What function did Upper Paleolithic caves serve according to modern anthropology?", opts: [{ key: "A", text: "Temporary food storage pantries" }, { key: "B", text: "Military defense bunkers" }, { key: "C", text: "Residential living quarters for entire tribes" }, { key: "D", text: "Multisensory immersive ritual performance spaces (sound, light, visuals)" }], a: "D", exp: "Đoạn 2: 'multisensory, immersive ritual performance spaces where acoustic chanting, flickering torchlight, and kinetic visual illusions converged'." },
        { q: "What minerals were used to produce black and red pigments?", opts: [{ key: "A", text: "Manganese dioxides (black) and ferric ochres (red)" }, { key: "B", text: "Synthetic acrylic dyes" }, { key: "C", text: "Crushed coal and gold dust" }, { key: "D", text: "Dried berry juices" }], a: "A", exp: "Đoạn 3: 'black manganese dioxides and red ferric ochres'." },
        { q: "To what microscopic particle size were pigment powders ground?", opts: [{ key: "A", text: "50 microns" }, { key: "B", text: "Under 5 microns" }, { key: "C", text: "1 millimeter" }, { key: "D", text: "5 centimeters" }], a: "B", exp: "Đoạn 3: 'ground to microscopic grain sizes (under 5 microns)'." },
        { q: "What organic binders were mixed with pigments to enhance adhesion?", opts: [{ key: "A", text: "Petroleum oil and epoxy glue" }, { key: "B", text: "Egg whites and sea water" }, { key: "C", text: "Bone marrow lipids and plant waxes" }, { key: "D", text: "Honey and milk" }], a: "C", exp: "Đoạn 3: 'blended with specialized organic binders such as bone marrow lipids and plant waxes'." },
        { q: "What non-figurative geometric signs are found alongside animal paintings?", opts: [{ key: "A", text: "Arabic numbers" }, { key: "B", text: "Greek alphabet letters" }, { key: "C", text: "Musical treble clefs" }, { key: "D", text: "Dots, grids, and penniforms" }], a: "D", exp: "Đoạn 3: 'non-figurative geometric symbols (dots, grids, penniforms)'." },
        { q: "What cognitive evolutionary milestone does the combination of geometric symbols represent?", opts: [{ key: "A", text: "Emergence of externalized symbolic information storage (proto-writing)" }, { key: "B", text: "Loss of speech abilities" }, { key: "C", text: "Inability to draw realistic animals" }, { key: "D", text: "Copying alien artifacts" }], a: "A", exp: "Đoạn 3: 'emergence of advanced externalized symbolic data storage—the cognitive precursor to formal proto-writing systems'." },
        { q: "What geographic region contains Franco-Cantabrian cave art?", opts: [{ key: "A", text: "Northern Africa" }, { key: "B", text: "Southern France and Northern Spain" }, { key: "C", text: "Eastern Siberia" }, { key: "D", text: "Central Australia" }], a: "B", exp: "Khu vực Franco-Cantabria nằm ở miền Nam nước Pháp và miền Bắc Tây Ban Nha." },
        { q: "How old are the parietal paintings at Chauvet Cave?", opts: [{ key: "A", text: "2,000 years" }, { key: "B", text: "10,000 years" }, { key: "C", text: "Approximately 36,000 years Before Present (BP)" }, { key: "D", text: "100,000 years" }], a: "C", exp: "Đoạn 1: 'Chauvet (circa 36,000 BP)'." },
        { q: "What visual effect was created by flickering torchlight against undulating cave walls?", opts: [{ key: "A", text: "Total darkness" }, { key: "B", text: "Wall rock melting" }, { key: "C", text: "Smoke poisoning" }, { key: "D", text: "Kinetic visual illusions of animal motion" }], a: "D", exp: "Đoạn 2: Ánh đuốc bập bùng trên bề mặt vách đá mấp mô tạo ảo giác động về sự di chuyển của đàn thú ('kinetic visual illusions')." },
        { q: "What is the primary thesis of the article?", opts: [{ key: "A", text: "Upper Paleolithic cave art represents a complex synthesis of cognitive, acoustic, chemical, and symbolic sophistication" }, { key: "B", text: "Cave art was produced by amateur hunters without cultural purpose" }, { key: "C", text: "All prehistoric paintings are modern forgeries" }, { key: "D", text: "Acoustic resonance in caves was purely accidental" }], a: "A", exp: "Luận điểm trọng tâm: Nghệ thuật hang động thể hiện bước nhảy vọt toàn diện về nhận thức, âm học, hóa học chất kết dính và hệ thống ký hiệu biểu tượng." }
      ];

      r3Questions.forEach((item, idx) => {
        qs.push({
          id: `ia4k3_q${idx + 67}`,
          partNumber: 7,
          partTitle: "Reading Passage 3: Upper Paleolithic Symbolic Art",
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
        id: "ia4k3_q81",
        partNumber: 8,
        partTitle: "IELTS Speaking Part 1: Environmental Science & Daily Habits",
        section: "SPEAKING",
        speakingPrompt:
          "1. How do you attempt to minimize single-use plastic waste in your daily routine?\n2. Have you ever visited a botanical garden or nature conservation sanctuary?\n3. Do you believe schools should dedicate more curriculum hours to environmental sciences?\n4. What eco-friendly habit have you adopted recently?",
        preparationTimeSeconds: 15,
        speakingTimeSeconds: 60,
        questionText:
          "Question 81 (Speaking Part 1): Answer interview questions on environmental science, plastic waste, and ecological habits (60 seconds).",
        options: [
            { key: "A", text: "Record 60-Second Interview Response" },
            { key: "B", text: "View Band 8.5+ Environmental Vocabulary" },
            { key: "C", text: "Listen to Native Examiner Prompts" },
            { key: "D", text: "Skip to Cue Card" }
          ],
        correctAnswer: "A",
        explanation: `🎯 [CHIẾN THUẬT PART 1 - DIRECT ANSWER + EXTENSION]
- Trả lời trực tiếp và mở rộng 2-3 câu bằng từ vựng chỉ bảo vệ môi trường, tiêu dùng bền vững và phân loại rác.
- Tránh câu trả lời ngắn; sử dụng liên từ chỉ thói quen sinh hoạt và ý thức sinh thái.

🔍 [BÀI NÓI MẪU BAND 8.5+]
"In my daily routine, I make a conscious effort to eliminate single-use plastics by consistently carrying a reusable stainless steel water flask and canvas grocery tote bags. Whenever possible, I actively patronize zero-waste refill stations for household detergents.

Last spring, I had the privilege of exploring the Royal Botanic Gardens in Melbourne. Walking through their alpine glasshouse and wetland biomes was not only visually breathtaking but deeply educational regarding endangered flora conservation.

I wholeheartedly believe environmental science should be an indispensable cornerstone of primary education. Cultivating ecological literacy at an early age instills a lifelong sense of environmental stewardship and climate responsibility.

Recently, I have adopted home composting for organic kitchen scraps, which has reduced our household landfill waste by nearly half."

💡 [TỪ VỰNG THEN CHỐT]
- Single-use plastics /ˌsɪŋ.ɡəlˈjuːs ˈplæs.tɪks/ (n): Đồ nhựa dùng một lần
- Ecological literacy /ˌiː.kəˈlɑː.dʒɪ.kəl ˈlɪt̬.ɚ.ə.si/ (n): Sự hiểu biết về sinh thái học
- Environmental stewardship /ɪnˌvaɪ.rənˈmen.t̬əl ˈstuː.ɚd.ʃɪp/ (n): Trách nhiệm quản lý, gìn giữ môi trường
- Zero-waste refill stations /ˈzɪr.oʊ weɪst ˌriːˈfɪl ˈsteɪ.ʃənz/ (n): Trạm nạp lại không rác thải.`
      });

      qs.push({
        id: "ia4k3_q82",
        partNumber: 9,
        partTitle: "IELTS Speaking Part 2: Cue Card — An Archaeological Discovery",
        section: "SPEAKING",
        speakingPrompt:
          "Describe an ancient archaeological site or historical discovery that you find fascinating.\nYou should say:\n• Where it is located and how old it is\n• What archaeological artifacts or structures were discovered there\n• How ancient people engineered or built it\nAnd explain why you find this historical discovery so intriguing.",
        preparationTimeSeconds: 60,
        speakingTimeSeconds: 120,
        questionText:
          "Question 82 (Speaking Part 2): Deliver a continuous 2-minute speech describing a fascinating archaeological discovery.",
        options: [
            { key: "A", text: "View 1-Minute Note-Taking Template" },
            { key: "B", text: "Record 2-Minute Speech" },
            { key: "C", text: "Listen to Band 9.0 Model Speech" },
            { key: "D", text: "Skip to Part 3" }
          ],
        correctAnswer: "B",
        explanation: `🎯 [CHIẾN THUẬT 1 PHÚT GHI CHÚ (THE 4-BOX METHOD)]
- Box 1 (Site/Age): Angkor Wat complex, Siem Reap, Cambodia / 12th century (1113-1150 CE) by King Suryavarman II.
- Box 2 (Structures): Massive sandstone bas-reliefs, concentric moats, monumental reservoirs (West Baray).
- Box 3 (Engineering): Landscape-scale hydraulic network, gravity-fed canals, floating stone blocks from Mount Kulen quarries.
- Box 4 (Intrigue): Synthesis of astronomical alignment, hydraulic genius, and sacred religious architecture.

🔍 [BÀI NÓI MẪU BAND 9.0 (240+ TỪ)]
"I would like to describe one of the most awe-inspiring archaeological wonders on our planet: the ancient temple city of Angkor Wat, located in northwestern Cambodia, originally constructed during the early twelfth century under King Suryavarman II.

What elevates Angkor beyond a magnificent religious monument is the breathtaking scale of its underlying civil engineering. The entire complex is surrounded by an enormous, four-kilometer-long moat that not only served symbolic religious purposes representing the cosmic ocean, but crucially maintained the structural equilibrium of the temple's sandstone foundations by stabilizing the subterranean water table.

To construct this colossal masterpiece, Khmer master builders transported millions of dense sandstone blocks from the sacred Kulen mountains over thirty kilometers away, utilizing a sophisticated network of navigable canals. Furthermore, modern airborne LiDAR surveys have revealed that the temple was the crown jewel of an expansive hydraulic civilization—spanning over a thousand square kilometers—powered by monumental reservoirs known as 'barays' that stored tens of millions of cubic meters of monsoon rainwater for year-round agricultural irrigation.

What captivates me most about this archaeological discovery is the seamless harmony between spiritual cosmology and advanced ecological engineering. It stands as an enduring testament to human ingenuity and our ancestors' profound mastery of nature's hydrological cycles."

💡 [TỪ VỰNG THEN CHỐT]
- Awe-inspiring /ˌɔː.ɪnˈspaɪr.ɪŋ/ (adj): Đầy kinh ngạc, đáng ngưỡng mộ
- Subterranean water table /ˌsʌb.təˈreɪ.ni.ən ˈwɑː.t̬ɚ ˈteɪ.bəl/ (n): Mực nước ngầm dưới lòng đất
- Structural equilibrium /ˈstrʌk.tʃɚ.əl ˌiː.kwəˈlɪb.ri.əm/ (n): Trạng thái cân bằng kết cấu
- Spiritual cosmology /ˈspɪr.ə.tʃu.əl kɑːzˈmɑː.lə.dʒi/ (n): Vũ trụ quan tâm linh.`
      });

      qs.push({
        id: "ia4k3_q83",
        partNumber: 10,
        partTitle: "IELTS Speaking Part 3: Scientific Research & Global Heritage",
        section: "SPEAKING",
        speakingPrompt:
          "1. Why is it vital for governments to invest public tax revenue into archaeological and historical research?\n2. How can cutting-edge technologies like satellite remote sensing and artificial intelligence assist in world heritage preservation?\n3. To what extent does climate change threaten ancient cultural landmarks globally?",
        preparationTimeSeconds: 20,
        speakingTimeSeconds: 90,
        questionText:
          "Question 83 (Speaking Part 3): Provide analytical arguments on public funding for archaeology, AI in heritage conservation, and climate threats.",
        options: [
            { key: "A", text: "Review Discourse Markers" },
            { key: "B", text: "Check Band 9 Academic Vocabulary" },
            { key: "C", text: "Record 90-Second Discussion" },
            { key: "D", text: "Complete Speaking Section" }
          ],
        correctAnswer: "C",
        explanation: `🎯 [CHIẾN THUẬT PART 3 - CẤU TRÚC LẬP LUẬN ĐA CHIỀU]
- Nêu rõ giá trị văn hóa và kinh tế của việc đầu tư công cho khảo cổ học (bài học lịch sử, du lịch bền vững).
- Phân tích ứng dụng của công nghệ viễn thám LiDAR và mô hình AI tái dựng 3D trong bảo tồn di sản trước tác động của biến đổi khí hậu.

🔍 [BÀI NÓI MẪU BAND 9.0 (90 GIÂY)]
"Allocating public funding to archaeological exploration is essential because historical inquiry provides irreplaceable diagnostic insights into how ancient civilizations adapted—or failed to adapt—to environmental shifts and resource depletion. Far from being a frivolous academic pursuit, archaeology decodes foundational lessons for contemporary climate resilience and sustainable urban planning.

In terms of technological integration, revolutionary tools like airborne LiDAR and AI image segmentation have transformed heritage conservation. Laser scanning penetrates dense tropical jungle canopies to uncover buried urban grids without disruptive excavation, while machine learning algorithms can monitor structural fatigue and micro-fractures in stone monuments in real time.

This technological vigilance is particularly urgent given that climate change poses an existential peril to ancient landmarks. Rising sea levels, acid rain weathering, and extreme flooding are rapidly degrading centuries-old monuments from Venice to Angkor, making international cooperation and digital preservation an urgent imperative."

💡 [TỪ VỰNG THEN CHỐT]
- Diagnostic insights /ˌdaɪ.əɡˈnɑː.stɪk ˈɪn.saɪts/ (n): Góc nhìn chẩn đoán sâu sắc
- Climate resilience /ˈklaɪ.mət rɪˈzɪl.jəns/ (n): Khả năng phục hồi, chống chịu khí hậu
- Airborne LiDAR scanning /ˈer.bɔːrn ˈlaɪ.dɑːr ˈskæn.ɪŋ/ (n): Quét định vị laser từ trên không
- Existential peril /ˌeɡ.zɪˈsten.ʃəl ˈper.əl/ (n): Hiểm họa đe dọa sự tồn vong.`
      });

      // IELTS WRITING AI (Q84 - Q85: TASK 1 & TASK 2)
      qs.push({
        id: "ia4k3_q84",
        partNumber: 11,
        partTitle: "IELTS Writing Task 1: Academic Report (Comparative Line Graph)",
        section: "WRITING",
        writingPrompt:
          "The line graph below shows the volume of global municipal solid plastic waste produced (in millions of metric tons) and the proportions recycled, incinerated for energy, and discarded in landfills between 1990 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words. Time suggested: 20 minutes).",
        minWordCount: 150,
        sampleEssay: `The provided line graph illustrates the total volume of global municipal solid plastic waste generated annually, measured in millions of metric tons (Mt), alongside the breakdown of three primary waste management pathways—landfilling, thermal incineration, and mechanical recycling—between 1990 and 2025.

Overall, total plastic waste production experienced a dramatic upward surge over the thirty-five-year period. While disposal in municipal landfills remained the predominant method throughout the timeframe, the proportion of waste diverted to recycling facilities and energy-recovery incineration exhibited substantial percentage increases towards the latter half of the period.

In 1990, global plastic waste output stood at approximately 110 Mt, with an overwhelming 82% (roughly 90 Mt) discarded directly into landfills. Incineration accounted for a modest 14%, while mechanical recycling was virtually negligible at less than 4%. By 2010, total plastic generation had more than doubled to 260 Mt, with landfilling continuing to absorb the majority (62%), even as incineration expanded to 24% and recycling climbed to 14%.

By 2025, annual plastic waste generation escalated to a staggering 440 Mt. Although landfill volume remained high in absolute terms (210 Mt, or 48%), the combined share of sustainable treatments gained significant ground: mechanical recycling reached 26% (114 Mt) and incineration accounted for 26% (114 Mt), reflecting heightened global environmental regulations and advanced circular recycling technologies.`,
        questionText:
          "Question 84 (Writing Task 1): Write an academic report summarizing global plastic waste trends (min 150 words).",
        options: [
            { key: "A", text: "Check Cambridge Band 9 Scoring Rubric" },
            { key: "B", text: "Review Trend & Proportion Vocabulary" },
            { key: "C", text: "Skip to Task 2" },
            { key: "D", text: "Submit Task 1 Report for Gemini AI Evaluation" }
          ],
        correctAnswer: "D",
        explanation: `🎯 [CHIẾN THUẬT BÁO CÁO BIỂU ĐỒ ĐƯỜNG SO SÁNH - BAND 9.0]
1. Task Achievement:
   - Paraphrase chính xác trục thời gian (1990 - 2025), đơn vị triệu tấn (Mt) và 3 kênh xử lý (landfill, incineration, recycling).
   - Đoạn Overview rõ ràng: Tổng lượng rác tăng vọt gấp 4 lần; bãi rác luôn chiếm đa số nhưng tỷ lệ tái chế và thiêu hủy tăng mạnh.
   - Thân bài chia theo 2 mốc giai đoạn (1990 - 2010 và 2010 - 2025) với số liệu cụ thể và tỷ lệ phần trăm đối sánh.

2. Lexical Resource & Grammatical Range:
   - Từ vựng xu hướng & phân loại học thuật: "predominant method", "diverted to recycling", "virtually negligible", "staggering 440 Mt", "circular recycling technologies".`
      });

      qs.push({
        id: "ia4k3_q85",
        partNumber: 12,
        partTitle: "IELTS Writing Task 2: Academic Discursive Essay",
        section: "WRITING",
        writingPrompt:
          "Some environmentalists argue that the only effective solution to the global plastic pollution crisis is an outright international ban on all single-use plastics. Others contend that economic incentives for recycling and biodegradable material research are more pragmatic. Discuss both views and give your own opinion. (Write at least 250 words. Time suggested: 40 minutes).",
        minWordCount: 250,
        sampleEssay: `The escalating accumulation of synthetic polymer debris across terrestrial and marine ecosystems represents one of the most perilous environmental crises of the twenty-first century. While certain conservationists advocate that an immediate, legally binding international prohibition on all single-use plastics is the only viable remedy, others maintain that economic incentives and scientific innovation in biodegradable polymers offer a far more feasible strategy. In this essay, I will examine both perspectives and argue that a comprehensive hybrid policy combining strict bans on non-essential items with aggressive subsidies for bio-based materials provides the optimal solution.

On the one hand, proponents of outright bans argue that gradualist market approaches have failed to keep pace with exponential polymer manufacturing. Single-use plastic items—such as beverage bottles, polystyrene packaging, and shopping bags—have lifespans measured in minutes yet persist in the environment for centuries, disintegrating into toxic microplastics that contaminate global food chains. Prohibitive legislation creates immediate, decisive reductions in aggregate consumption and compels corporate supply chains to eliminate superfluous packaging. Jurisdictions such as the European Union and Rwanda demonstrate that stringent bans on non-essential single-use polymers achieve immediate reductions in municipal landfill burdens and coastal pollution.

On the other hand, advocates of pragmatic economic instruments argue that universal bans fail to account for irreplaceable applications in modern medicine, food preservation, and sterile pharmaceutical packaging. Without scalable alternatives, immediate prohibitions risk causing food spoilage, public health compromises, and severe economic disruptions for small businesses in developing economies. Consequently, creating fiscal incentives—such as extended producer responsibility (EPR) taxes on virgin polymers, tax credits for post-consumer recycled content, and capital investment grants for microbial polyhydroxyalkanoates (PHA) bioplastics—catalyzes the development of fully compostable closed-loop circular packaging.

In conclusion, while market mechanisms alone are insufficient to curb the global plastic deluge, draconian blanket bans without viable substitutes are economically untenable. Governments should enact mandatory bans on non-essential consumer plastics while simultaneously deploying robust economic incentives to accelerate the mass commercialization of biodegradable materials.`,
        questionText:
          "Question 85 (Writing Task 2): Write a 250+ word academic discursive essay analyzing bans vs economic incentives for plastic pollution.",
        options: [
            { key: "A", text: "Submit Task 2 Essay for Gemini AI Evaluation" },
            { key: "B", text: "Review 4-Paragraph Essay Architecture" },
            { key: "C", text: "Check Band 9 Academic Collocations" },
            { key: "D", text: "Complete Full IELTS Test" }
          ],
        correctAnswer: "A",
        explanation: `🎯 [CHIẾN THUẬT BÀI LUẬN BAND 9.0 DẠNG DISCUSS BOTH VIEWS & OPINION]
1. Task Response:
   - Đưa ra lập trường dung hòa rõ ràng (Hybrid Policy) ngay tại mở bài.
   - Thân bài 1: Phân tích luận điểm ủng hộ lệnh cấm (tính cấp bách, loại bỏ bao bì thừa thải, giảm ô nhiễm tức thì).
   - Thân bài 2: Phân tích luận điểm ủng hộ công cụ kinh tế & nghiên cứu sinh học (ứng dụng thiết yếu trong y tế, thuế EPR, hạt nhựa sinh học PHA).
   - Kết bài: Khẳng định cấm đồ tiêu dùng không thiết yếu kết hợp trợ cấp đổi mới công nghệ là con đường tối ưu.

2. Lexical Resource (C2 Academic):
   - "perilous environmental crises", "superfluous packaging", "draconian blanket bans", "polyhydroxyalkanoates (PHA)", "extended producer responsibility (EPR)", "closed-loop circular packaging".`
      });

      return qs;
    })()
  };
