import { ExamPaper, ExamQuestion } from "./types";

export const ieltsListeningSprint01Paper: ExamPaper = {
  id: "ielts_listening_sprint_01",
  title: "IELTS Listening Sprint Intensive #01",
  type: "IELTS_FULL",
  level: "Advanced",
  timeLimitMinutes: 35,
  totalQuestions: 40,
  maxScore: 9.0,
  description: "Bộ đề luyện tốc độ chuyên sâu Kỹ năng Nghe (Listening Intensive): 40 câu hỏi Sections 1-4 chuẩn Cambridge bao quát Đặt chỗ cắm trại Banff, Bảo tàng Smithsonian, Rừng tảo bẹ Queensland và Ruộng bậc thang Inca Andes.",
  categoryBadge: "IELTS Listening",
  tags: ["IELTS", "Listening Only", "Sprint Test", "Cambridge", "Sections 1-4"],
  supportedSkills: ["LISTENING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // SECTION 1: Banff National Park Wilderness Camping Booking (Q1 - Q10)
    const sec1Script =
      "Ranger: Good morning, Parks Canada Banff Wilderness Reservation Desk. My name is Connor.\n" +
      "Camper: Hello! I would like to book a backcountry wilderness campsite for a group of four hikers along the Lake Minnewanka trail.\n" +
      "Ranger: Wonderful! May I have your full legal name for the backcountry wilderness permit?\n" +
      "Camper: Yes, my name is Hannah Montgomery.\n" +
      "Ranger: Thank you, Ms. Montgomery. And your primary contact telephone number?\n" +
      "Camper: It is +1 403 555 7183.\n" +
      "Ranger: Perfect. Which dates are you planning your expedition for?\n" +
      "Camper: We are arriving on Thursday, July 16th and departing on Sunday, July 19th for three nights.\n" +
      "Ranger: Excellent. Site LM8 at Aylmer Pass is available. It features bear-proof food storage lockers and a designated grey-water filtration sink. The backcountry permit fee is 12.75 CAD per person per night, plus a mandatory 11.50 CAD reservation processing fee.\n" +
      "Camper: What is the total cost for our party of four?\n" +
      "Ranger: That comes to 164.50 Canadian dollars in total.\n" +
      "Camper: Are campfires permitted at Aylmer Pass?\n" +
      "Ranger: No, open campfires are strictly prohibited due to wildfire hazard regulations; hikers must use portable pressurized gas backpacking stoves.\n" +
      "Camper: Where do we collect our physical wilderness permits and bear spray canisters?\n" +
      "Ranger: You must check in at the Banff Visitor Centre on Banff Avenue before 4:00 PM on your arrival date.";

    const sec1Questions = [
      { q: "What is the primary camper's full legal name?", opts: [{ key: "A", text: "Hannah Montgomery" }, { key: "B", text: "Helen Miller" }, { key: "C", text: "Hazel Moore" }, { key: "D", text: "Holly Morris" }], a: "A", exp: "Họ tên người đăng ký: 'My name is Hannah Montgomery'." },
      { q: "What is Hannah's contact telephone number?", opts: [{ key: "A", text: "+1 403 555 2299" }, { key: "B", text: "+1 403 555 7183" }, { key: "C", text: "+1 403 555 8810" }, { key: "D", text: "+1 403 555 4433" }], a: "B", exp: "Số điện thoại: '+1 403 555 7183'." },
      { q: "Along which trail is the wilderness campsite located?", opts: [{ key: "A", text: "Lake Louise" }, { key: "B", text: "Moraine Lake" }, { key: "C", text: "Lake Minnewanka trail" }, { key: "D", text: "Jasper Ridge" }], a: "C", exp: "Tuyến đường đi bộ: 'along the Lake Minnewanka trail'." },
      { q: "How many hikers are in the expedition party?", opts: [{ key: "A", text: "2 hikers" }, { key: "B", text: "6 hikers" }, { key: "C", text: "10 hikers" }, { key: "D", text: "Group of four hikers" }], a: "D", exp: "Số lượng người: 'for a group of four hikers'." },
      { q: "On which date does the camping trip commence?", opts: [{ key: "A", text: "Thursday, July 16th" }, { key: "B", text: "June 1st" }, { key: "C", text: "August 10th" }, { key: "D", text: "September 5th" }], a: "A", exp: "Ngày đến: 'arriving on Thursday, July 16th'." },
      { q: "What campsite code is assigned to the group?", opts: [{ key: "A", text: "Site A1" }, { key: "B", text: "Site LM8 at Aylmer Pass" }, { key: "C", text: "Site Z9" }, { key: "D", text: "Site C4" }], a: "B", exp: "Mã vị trí cắm trại: 'Site LM8 at Aylmer Pass'." },
      { q: "What is the total fee for the four hikers for three nights?", opts: [{ key: "A", text: "$50 CAD" }, { key: "B", text: "$300 CAD" }, { key: "C", text: "164.50 Canadian dollars in total" }, { key: "D", text: "$500 CAD" }], a: "C", exp: "Tổng chi phí: '164.50 Canadian dollars in total'." },
      { q: "Are open wood campfires permitted at the site?", opts: [{ key: "A", text: "Yes, anywhere" }, { key: "B", text: "Only on weekends" }, { key: "C", text: "Yes, after midnight" }, { key: "D", text: "No, open campfires are strictly prohibited; portable gas stoves only" }], a: "D", exp: "Quy định đốt lửa: 'open campfires are strictly prohibited... must use portable pressurized gas backpacking stoves'." },
      { q: "Where must the hikers check in to collect physical permits?", opts: [{ key: "A", text: "Banff Visitor Centre on Banff Avenue" }, { key: "B", text: "At Calgary airport" }, { key: "C", text: "At the campsite directly" }, { key: "D", text: "At a local gas station" }], a: "A", exp: "Địa điểm nhận giấy phép: 'Banff Visitor Centre on Banff Avenue'." },
      { q: "By what time must the group check in on their arrival date?", opts: [{ key: "A", text: "10:00 AM" }, { key: "B", text: "Before 4:00 PM on your arrival date" }, { key: "C", text: "Midnight" }, { key: "D", text: "8:00 PM" }], a: "B", exp: "Giờ chót nhận giấy phép: 'before 4:00 PM on your arrival date'." }
    ];

    sec1Questions.forEach((item, idx) => {
      qs.push({
        id: `ils1_q${idx + 1}`,
        partNumber: 1,
        partTitle: "Listening Section 1: Banff Wilderness Camping Registration",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        passageText: `[Audio Transcript - Section 1]\n${sec1Script}`,
        questionText: `Question ${idx + 1}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 2: Smithsonian National Air and Space Museum Guided Tour (Q11 - Q20)
    const sec2Script =
      "Docent: Welcome to the Smithsonian National Air and Space Museum on the National Mall in Washington, D.C. I am Dr. Rebecca Thorne. Our newly renovated east wing spans three thematic galleries. Gallery 1 features 'Early Flight', showcasing the original 1903 Wright Flyer and Charles Lindbergh's Spirit of St. Louis. Gallery 2 houses our 'Space Race & Lunar Exploration' pavilion, displaying the Apollo 11 command module Columbia, authentic spacesuits worn on the lunar surface by Neil Armstrong, and a touchable piece of lunar basalt rock collected in 1972. Gallery 3 is dedicated to 'Planetary Horizons', featuring full-scale models of the Mars Curiosity rover and the James Webb Space Telescope. Daily planetarium sky shows run every forty-five minutes in the Lockheed Martin IMAX Dome, with tickets priced at 9 dollars for adults and 6 dollars for students. For visitor comfort, flash photography and selfie sticks are strictly prohibited in all spacecraft galleries. Lockers in the south atrium operate with contactless digital tokens.";

    const sec2Questions = [
      { q: "What famous historic aircraft are featured in Gallery 1?", opts: [{ key: "A", text: "Modern fighter jets only" }, { key: "B", text: "Helicopters only" }, { key: "C", text: "The 1903 Wright Flyer and the Spirit of St. Louis" }, { key: "D", text: "Hot air balloons" }], a: "C", exp: "Hiện vật Gallery 1: 'the original 1903 Wright Flyer and Charles Lindbergh's Spirit of St. Louis'." },
      { q: "Which Apollo spacecraft is on display in Gallery 2?", opts: [{ key: "A", text: "Apollo 1" }, { key: "B", text: "Apollo 13" }, { key: "C", text: "Apollo 8" }, { key: "D", text: "The Apollo 11 command module Columbia" }], a: "D", exp: "Tàu vũ trụ trưng bày: 'Apollo 11 command module Columbia'." },
      { q: "What unique tactile artifact can visitors touch in Gallery 2?", opts: [{ key: "A", text: "A touchable piece of lunar basalt rock collected in 1972" }, { key: "B", text: "A piece of the Sun" }, { key: "C", text: "A comet tail" }, { key: "D", text: "Mars sand" }], a: "A", exp: "Hiện vật được chạm tay: 'touchable piece of lunar basalt rock collected in 1972'." },
      { q: "Which modern space observatory model is featured in Gallery 3?", opts: [{ key: "A", text: "Galileo telescope" }, { key: "B", text: "The James Webb Space Telescope" }, { key: "C", text: "Newtonian mirror" }, { key: "D", text: "Hubble only" }], a: "B", exp: "Mô hình kính viễn vọng: 'the James Webb Space Telescope'." },
      { q: "How frequently do planetarium sky shows operate in the IMAX Dome?", opts: [{ key: "A", text: "Once a day" }, { key: "B", text: "Every 2 hours" }, { key: "C", text: "Every forty-five minutes" }, { key: "D", text: "On weekends only" }], a: "C", exp: "Tần suất chiếu phim: 'run every forty-five minutes in the Lockheed Martin IMAX Dome'." },
      { q: "What is the student ticket price for planetarium shows?", opts: [{ key: "A", text: "Free" }, { key: "B", text: "9 dollars" }, { key: "C", text: "15 dollars" }, { key: "D", text: "6 dollars for students" }], a: "D", exp: "Giá vé học sinh/sinh viên: '6 dollars for students'." },
      { q: "What items are strictly prohibited inside the spacecraft galleries?", opts: [{ key: "A", text: "Flash photography and selfie sticks" }, { key: "B", text: "Eyeglasses" }, { key: "C", text: "Shoes" }, { key: "D", text: "Wristwatches" }], a: "A", exp: "Vật dụng cấm: 'flash photography and selfie sticks are strictly prohibited'." },
      { q: "Where are the visitor storage lockers located?", opts: [{ key: "A", text: "In the parking lot" }, { key: "B", text: "In the south atrium" }, { key: "C", text: "On the roof" }, { key: "D", text: "Outside the main gate" }], a: "B", exp: "Vị trí tủ gửi đồ: 'Lockers in the south atrium'." },
      { q: "What spacesuit is displayed in the Space Race gallery?", opts: [{ key: "A", text: "Soviet suit only" }, { key: "B", text: "Deep sea diving suit" }, { key: "C", text: "Spacesuit worn on the lunar surface by Neil Armstrong" }, { key: "D", text: "Firefighter suit" }], a: "C", exp: "Bộ đồ du hành vũ trụ: 'authentic spacesuits worn on the lunar surface by Neil Armstrong'." },
      { q: "Which Mars rover model is showcased in Gallery 3?", opts: [{ key: "A", text: "Sojourner" }, { key: "B", text: "Spirit" }, { key: "C", text: "Opportunity" }, { key: "D", text: "Mars Curiosity rover" }], a: "D", exp: "Mô hình xe tự hành sao Hỏa: 'models of the Mars Curiosity rover'." }
    ];

    sec2Questions.forEach((item, idx) => {
      qs.push({
        id: `ils1_q${idx + 11}`,
        partNumber: 2,
        partTitle: "Listening Section 2: Smithsonian Air and Space Museum",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        passageText: `[Audio Transcript - Section 2]\n${sec2Script}`,
        questionText: `Question ${idx + 11}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 3: Marine Biology Project on Giant Kelp Forests & Ocean Warming (Q21 - Q30)
    const sec3Script =
      "Supervisor: Good afternoon, Lucas and Maya. Let's review your marine conservation field study on giant kelp forests (Macrocystis pyrifera) along the Tasmanian coast.\n" +
      "Lucas: Thank you, Dr. Crawford. Over the past four decades, ocean warming driven by the strengthening East Australian Current has raised water temperatures by 2.3 degrees Celsius, leading to a catastrophic ninety-five percent collapse of native giant kelp beds.\n" +
      "Maya: Furthermore, the proliferation of the invasive long-spined sea urchin (Centrostephanus rodgersii) has created extensive 'urchin barrens', overgrazing the remaining kelp holdfasts.\n" +
      "Supervisor: A dire ecological trophic cascade. What restoration interventions did your research team test in Mercury Passage?\n" +
      "Lucas: We tested two biological interventions: reintroducing native predatory eastern rock lobsters (Jasus edwardsii) to cull the urchin population, and outplanting selective thermally resilient 'super-kelp' strains cultivated in our university hatchery.\n" +
      "Maya: The combined intervention resulted in a sixty-two percent recovery of kelp canopy density over a twelve-month monitoring window.\n" +
      "Supervisor: Excellent data. Please finalize your statistical ANOVA charts and submit your thesis paper by Friday, May 22nd.";

    const sec3Questions = [
      { q: "What marine species is the primary focus of the students' conservation study?", opts: [{ key: "A", text: "Giant kelp forests (Macrocystis pyrifera)" }, { key: "B", text: "Jellyfish" }, { key: "C", text: "Great white sharks" }, { key: "D", text: "Blue whales" }], a: "A", exp: "Đối tượng nghiên cứu: 'giant kelp forests (Macrocystis pyrifera)'." },
      { q: "By how much have ocean temperatures risen along the Tasmanian coast?", opts: [{ key: "A", text: "0.5°C" }, { key: "B", text: "Raised water temperatures by 2.3 degrees Celsius" }, { key: "C", text: "10°C" }, { key: "D", text: "No change" }], a: "B", exp: "Nhiệt độ đại dương tăng: 'raised water temperatures by 2.3 degrees Celsius'." },
      { q: "What percentage of native giant kelp beds has collapsed?", opts: [{ key: "A", text: "20 percent" }, { key: "B", text: "50 percent" }, { key: "C", text: "Catastrophic ninety-five percent collapse" }, { key: "D", text: "Zero percent" }], a: "C", exp: "Tỷ lệ suy giảm rừng tảo bẹ: 'catastrophic ninety-five percent collapse of native giant kelp beds'." },
      { q: "What invasive species is responsible for creating 'urchin barrens'?", opts: [{ key: "A", text: "Lionfish" }, { key: "B", text: "Crown-of-thorns starfish" }, { key: "C", text: "Green crab" }, { key: "D", text: "Long-spined sea urchin (Centrostephanus rodgersii)" }], a: "D", exp: "Sinh vật ngoại lai xâm hại: 'invasive long-spined sea urchin (Centrostephanus rodgersii)'." },
      { q: "Where was the restoration intervention field trial conducted?", opts: [{ key: "A", text: "Mercury Passage" }, { key: "B", text: "Sydney Harbor" }, { key: "C", text: "Great Barrier Reef" }, { key: "D", text: "Melbourne Bay" }], a: "A", exp: "Địa điểm thử nghiệm: 'in Mercury Passage'." },
      { q: "What predator was reintroduced to control the sea urchin population?", opts: [{ key: "A", text: "Dolphins" }, { key: "B", text: "Predatory eastern rock lobsters (Jasus edwardsii)" }, { key: "C", text: "Pelicans" }, { key: "D", text: "Seals" }], a: "B", exp: "Loài thiên địch thả bù: 'reintroducing native predatory eastern rock lobsters (Jasus edwardsii)'." },
      { q: "What innovative kelp strain was outplanted during the trial?", opts: [{ key: "A", text: "Artificial plastic kelp" }, { key: "B", text: "Frozen kelp" }, { key: "C", text: "Selective thermally resilient 'super-kelp' strains" }, { key: "D", text: "Dried kelp" }], a: "C", exp: "Chủng tảo bẹ lai tạo: 'selective thermally resilient super-kelp strains'." },
      { q: "What percentage recovery of kelp canopy density was observed over 12 months?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "100 percent" }, { key: "C", text: "Zero percent" }, { key: "D", text: "Sixty-two percent recovery of kelp canopy density" }], a: "D", exp: "Mức độ hồi phục: 'sixty-two percent recovery of kelp canopy density over a twelve-month monitoring window'." },
      { q: "What statistical analysis method must students include in their report?", opts: [{ key: "A", text: "Statistical ANOVA charts" }, { key: "B", text: "Guesswork" }, { key: "C", text: "Coin flip" }, { key: "D", text: "Hand drawing" }], a: "A", exp: "Phương pháp thống kê: 'finalize your statistical ANOVA charts'." },
      { q: "When is the research thesis paper due for submission?", opts: [{ key: "A", text: "April 1st" }, { key: "B", text: "Friday, May 22nd" }, { key: "C", text: "September 30th" }, { key: "D", text: "December 15th" }], a: "B", exp: "Hạn chót nộp bài: 'by Friday, May 22nd'." }
    ];

    sec3Questions.forEach((item, idx) => {
      qs.push({
        id: `ils1_q${idx + 21}`,
        partNumber: 3,
        partTitle: "Listening Section 3: Marine Biology Giant Kelp Restoration",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        passageText: `[Audio Transcript - Section 3]\n${sec3Script}`,
        questionText: `Question ${idx + 21}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // SECTION 4: Anthropological Lecture on Inca Terraced Agriculture & Hydraulic Engineering (Q31 - Q40)
    const sec4Script =
      "Lecturer: Good morning, anthropology and pre-Columbian civil engineering scholars. Today we analyze the agricultural infrastructure of the Inca Empire (Tawantinsuyu), which flourished across the rugged Andean cordillera between 1438 and 1532 CE. To support an estimated population of twelve million citizens across mountainous elevations exceeding 3,500 meters, Inca engineers transformed precipitous mountain slopes into colossal stepped agricultural terraces known as 'andenes'. Each andén was engineered with multi-layered subterranean strata: coarse granite boulders at the base for drainage, gravel and sand in the middle layer, and rich topsoil transported from river valleys at the surface. During the day, the massive stone retaining walls absorbed solar radiation, radiating heat back into the soil at night to protect delicate crops from sub-zero mountain frosts. Furthermore, at the concentric circular amphitheater terraces of Moray, engineers created micro-climates where temperatures between top and bottom terraces varied by up to 15 degrees Celsius, serving as an advanced botanical breeding laboratory for acclimating wild potato, quinoa, and maize varieties across different Andean ecozones.";

    const sec4Questions = [
      { q: "What was the official Quechua name of the Inca Empire?", opts: [{ key: "A", text: "Aztec" }, { key: "B", text: "Maya" }, { key: "C", text: "Tawantinsuyu" }, { key: "D", text: "Olmec" }], a: "C", exp: "Tên đế chế Inca: 'Inca Empire (Tawantinsuyu)'." },
      { q: "What was the estimated population supported by the Inca Empire?", opts: [{ key: "A", text: "500,000" }, { key: "B", text: "50 million" }, { key: "C", text: "100,000" }, { key: "D", text: "Twelve million citizens" }], a: "D", exp: "Quy mô dân số: 'support an estimated population of twelve million citizens'." },
      { q: "What is the traditional Quechua term for Inca agricultural terraces?", opts: [{ key: "A", text: "Andenes" }, { key: "B", text: "Chinampas" }, { key: "C", text: "Pueblos" }, { key: "D", text: "Haciendas" }], a: "A", exp: "Tên ruộng bậc thang: 'stepped agricultural terraces known as andenes'." },
      { q: "What material constituted the deepest subterranean foundation layer of an andén?", opts: [{ key: "A", text: "Clay mud" }, { key: "B", text: "Coarse granite boulders for drainage" }, { key: "C", text: "Wood logs" }, { key: "D", text: "Straw" }], a: "B", exp: "Lớp móng dưới cùng: 'coarse granite boulders at the base for drainage'." },
      { q: "How did stone retaining walls protect crops from freezing night frosts?", opts: [{ key: "A", text: "By burning coal" }, { key: "B", text: "Covered plants with blankets" }, { key: "C", text: "Absorbed daytime solar radiation and radiated heat back into the soil at night" }, { key: "D", text: "Sprayed hot water" }], a: "C", exp: "Cơ chế chống sương giá: 'absorbed solar radiation, radiating heat back into the soil at night'." },
      { q: "What unique architectural shape characterizes the agricultural site of Moray?", opts: [{ key: "A", text: "Square pyramid" }, { key: "B", text: "Straight trench" }, { key: "C", text: "Underground tunnel" }, { key: "D", text: "Concentric circular amphitheater terraces" }], a: "D", exp: "Hình dạng khu di tích Moray: 'concentric circular amphitheater terraces of Moray'." },
      { q: "By how much did temperatures vary between top and bottom terraces at Moray?", opts: [{ key: "A", text: "By up to 15 degrees Celsius" }, { key: "B", text: "1 degree Celsius" }, { key: "C", text: "50 degrees Celsius" }, { key: "D", text: "No temperature difference" }], a: "A", exp: "Chênh lệch vi khí hậu: 'temperatures between top and bottom terraces varied by up to 15 degrees Celsius'." },
      { q: "What agricultural purpose did the micro-climatic terraces at Moray serve?", opts: [{ key: "A", text: "Storage for weapons" }, { key: "B", text: "An advanced botanical breeding laboratory for acclimating crops" }, { key: "C", text: "Sports stadium only" }, { key: "D", text: "Burial ground" }], a: "B", exp: "Công năng khảo nghiệm giống cây trồng: 'serving as an advanced botanical breeding laboratory for acclimating wild potato, quinoa, and maize'." },
      { q: "Which staple Andean crops were selectively acclimated at Moray?", opts: [{ key: "A", text: "Wheat and rice only" }, { key: "B", text: "Bananas and pineapples" }, { key: "C", text: "Wild potato, quinoa, and maize varieties" }, { key: "D", text: "Apples and grapes" }], a: "C", exp: "Cây trồng bản địa: 'potato, quinoa, and maize varieties across different Andean ecozones'." },
      { q: "At what extreme elevations were Inca agricultural terraces constructed?", opts: [{ key: "A", text: "Sea level" }, { key: "B", text: "500 meters" }, { key: "C", text: "Underground valleys" }, { key: "D", text: "Mountainous elevations exceeding 3,500 meters" }], a: "D", exp: "Độ cao địa hình: 'across mountainous elevations exceeding 3,500 meters'." }
    ];

    sec4Questions.forEach((item, idx) => {
      qs.push({
        id: `ils1_q${idx + 31}`,
        partNumber: 4,
        partTitle: "Listening Section 4: Inca Terraces & Hydraulic Engineering",
        section: "LISTENING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        passageText: `[Audio Transcript - Section 4]\n${sec4Script}`,
        questionText: `Question ${idx + 31}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    return qs;
  })()
};
