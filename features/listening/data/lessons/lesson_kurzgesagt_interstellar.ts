import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for Kurzgesagt: How to Win an Interstellar War
 * 8 in-depth analytical questions covering astrophysics, Fermi paradox themes, relativistic physics, and vocabulary.
 */
export const QUIZ_KURZGESAGT_INTERSTELLAR: VideoQuizData = {
  lessonId: "88c4fc17-4445-46f4-82d4-c51fbb56e859",
  lessonTitle: "Kurzgesagt: How to Win an Interstellar War",
  totalQuestions: 8,
  xpReward: 40,
  questions: [
    {
      id: "q_kurzgesagt_1",
      question: "How does the narrator introduce humanity in terms of biological classification and technological status?",
      questionEn: "How does the narrator introduce humanity in terms of biological classification and technological status?",
      questionVi: "Người dẫn chuyện giới thiệu nhân loại như thế nào về mặt phân loại sinh học và trình độ công nghệ?",
      options: [
        "A species of primates around a yellow dwarf star who recently became a technological civilization with rockets and memes.",
        "An ancient interstellar empire possessing warp-drive starships and planet-destroying superlasers.",
        "A peaceful aquatic civilization living beneath Europa's frozen ocean with zero carbon emissions.",
        "A cybernetic hive mind inhabiting multiple dwarf planets in the Kuiper belt.",
      ],
      optionsEn: [
        "A species of primates around a yellow dwarf star who recently became a technological civilization with rockets and memes.",
        "An ancient interstellar empire possessing warp-drive starships and planet-destroying superlasers.",
        "A peaceful aquatic civilization living beneath Europa's frozen ocean with zero carbon emissions.",
        "A cybernetic hive mind inhabiting multiple dwarf planets in the Kuiper belt.",
      ],
      optionsVi: [
        "Một loài linh trưởng sống quanh một ngôi sao lùn vàng, vừa mới trở thành nền văn minh công nghệ với tên lửa và meme.",
        "Một đế chế liên sao cổ đại sở hữu tàu vũ trụ động cơ bước nhảy không gian và siêu laser hủy diệt hành tinh.",
        "Một nền văn minh thủy sinh hòa bình sống dưới đại dương băng giá của Europa với mức phát thải ròng bằng không.",
        "Một mạng lưới ý thức máy móc sống trên nhiều hành tinh lùn ở vành đai Kuiper.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 6-8: "A yellow dwarf star system home to a species of primates. \'Humans,\' as they call themselves, recently became a technological civilization. They have rockets, nuclear reactors and memes."',
      explanationEn: 'In Segments 6-8: "A yellow dwarf star system home to a species of primates. \'Humans,\' as they call themselves, recently became a technological civilization. They have rockets, nuclear reactors and memes."',
      explanationVi: 'Trong các câu 6-8: "Một hệ sao lùn vàng, quê hương của một loài linh trưởng. \'Con người\', như cách họ tự gọi mình, gần đây đã trở thành nền văn minh công nghệ. Họ có tên lửa, lò phản ứng hạt nhân và meme."',
      referenceSegmentIndex: 6,
      targetedConcept: "Phân loại sinh học & Trình độ văn minh (Biological Classification & Tech Status)",
      targetedConceptEn: "Biological Classification & Tech Status",
      targetedConceptVi: "Phân loại sinh học & Trình độ văn minh",
    },
    {
      id: "q_kurzgesagt_2",
      question: "Where do the Smorpians reside, and how does their civilization compare to humanity?",
      questionEn: "Where do the Smorpians reside, and how does their civilization compare to humanity?",
      questionVi: "Người Smorpian cư ngụ ở đâu, và nền văn minh của họ so với loài người như thế nào?",
      options: [
        "Inside our Moon's subterranean caves, hiding secretly from modern satellite telescopes.",
        "On a planet orbiting the orange dwarf star HD 40307, 42 light years away, having developed earlier with far superior technology.",
        "Around the red supergiant Betelgeuse, struggling with imminent supernova radiation.",
        "In the Andromeda galaxy, communicating via instantaneous quantum wormhole relays.",
      ],
      optionsEn: [
        "Inside our Moon's subterranean caves, hiding secretly from modern satellite telescopes.",
        "On a planet orbiting the orange dwarf star HD 40307, 42 light years away, having developed earlier with far superior technology.",
        "Around the red supergiant Betelgeuse, struggling with imminent supernova radiation.",
        "In the Andromeda galaxy, communicating via instantaneous quantum wormhole relays.",
      ],
      optionsVi: [
        "Bên trong các hang động ngầm dưới Mặt Trăng, ẩn mình bí mật khỏi các kính thiên văn vệ tinh hiện đại.",
        "Trên một hành tinh quay quanh sao lùn cam HD 40307 cách xa 42 năm ánh sáng, phát triển sớm hơn với công nghệ vượt trội hơn nhiều.",
        "Quanh siêu sao đỏ Betelgeuse, đang vật lộn với bức xạ từ vụ nổ siêu tân tinh sắp xảy ra.",
        "Tại thiên hà Tiên Nữ Andromeda, liên lạc qua các trạm tiếp sóng lỗ sâu lượng tử tức thời.",
      ],
      correctAnswer: 1,
      explanation: 'In Segments 11 & 12: "They reside on a planet around the orange dwarf star HD 40307, 42 light years away. Smorpian civilization developed earlier than humans and they have much better technology."',
      explanationEn: 'In Segments 11 & 12: "They reside on a planet around the orange dwarf star HD 40307, 42 light years away. Smorpian civilization developed earlier than humans and they have much better technology."',
      explanationVi: 'Trong các câu 11 & 12: "Họ cư trú trên một hành tinh quay quanh ngôi sao lùn cam HD 40307, cách xa 42 năm ánh sáng. Nền văn minh Smorpian phát triển sớm hơn loài người và họ sở hữu công nghệ vượt trội hơn nhiều."',
      referenceSegmentIndex: 10,
      targetedConcept: "Khái niệm thiên văn học: Sao lùn cam & Khoảng cách năm ánh sáng (Astronomical Distance & Star Types)",
      targetedConceptEn: "Astronomical Distance & Star Types",
      targetedConceptVi: "Khái niệm thiên văn học: Sao lùn cam & Khoảng cách năm ánh sáng",
    },
    {
      id: "q_kurzgesagt_3",
      question: "What is a 'Dyson swarm', and what capability does it grant the Smorpians?",
      questionEn: "What is a 'Dyson swarm', and what capability does it grant the Smorpians?",
      questionVi: "'Bầy vệ tinh Dyson' (Dyson swarm) là gì, và nó đem lại khả năng gì cho người Smorpian?",
      options: [
        "A biological virus designed to genetically alter alien ecosystems across multiple moons.",
        "A planetary ring of defensive kinetic shields protecting their home atmosphere from asteroids.",
        "A massive megastructure constellation surrounding their host star that harnesses near-limitless energy.",
        "A swarm of tiny subatomic nano-drones used exclusively for terraforming barren exoplanets.",
      ],
      optionsEn: [
        "A biological virus designed to genetically alter alien ecosystems across multiple moons.",
        "A planetary ring of defensive kinetic shields protecting their home atmosphere from asteroids.",
        "A massive megastructure constellation surrounding their host star that harnesses near-limitless energy.",
        "A swarm of tiny subatomic nano-drones used exclusively for terraforming barren exoplanets.",
      ],
      optionsVi: [
        "Một loại virus sinh học được thiết kế để biến đổi gen hệ sinh thái của các mặt trăng ngoài hành tinh.",
        "Một vành đai khiên động năng phòng thủ bao quanh hành tinh để bảo vệ bầu khí quyển khỏi tiểu hành tinh.",
        "Một siêu công trình vệ tinh khổng lồ bao quanh ngôi sao chủ để thu hoạch nguồn năng lượng gần như vô hạn.",
        "Một bầy drone nano hạ nguyên tử siêu nhỏ chỉ dùng để địa khai hóa các ngoại hành tinh cằn cỗi.",
      ],
      correctAnswer: 2,
      explanation: 'In Segment 13: "They\'ve recently built a Dyson swarm around their star which gives them near limitless energy." A Dyson swarm is a theoretical megastructure capturing the total energy output of a star.',
      explanationEn: 'In Segment 13: "They\'ve recently built a Dyson swarm around their star which gives them near limitless energy." A Dyson swarm is a theoretical megastructure capturing the total energy output of a star.',
      explanationVi: 'Trong câu 13: "Gần đây họ đã chế tạo một bầy vệ tinh Dyson bao quanh ngôi sao của mình, đem lại nguồn năng lượng gần như vô hạn." Bầy Dyson là siêu công trình lý thuyết thu gom toàn bộ quang năng của một ngôi sao.',
      referenceSegmentIndex: 12,
      targetedConcept: "Siêu công trình vũ trụ: Dyson Swarm & Thang Kardashev (Astrophysical Megastructure & Kardashev Scale)",
      targetedConceptEn: "Astrophysical Megastructure & Kardashev Scale",
      targetedConceptVi: "Siêu công trình vũ trụ: Dyson Swarm & Thang Kardashev",
    },
    {
      id: "q_kurzgesagt_4",
      question: "Why did the Smorpians decide that 'humanity has to go'?",
      questionEn: "Why did the Smorpians decide that 'humanity has to go'?",
      questionVi: "Tại sao người Smorpian lại quyết định rằng 'nhân loại cần phải bị xóa sổ'?",
      options: [
        "Because humans accidentally intercepted and leaked their top-secret interstellar broadcasts.",
        "Because they are planning a hyperspace bypass directly through our solar system, making Earth an inconvenient obstacle.",
        "Because human greenhouse gas emissions have destabilized the cosmic background radiation.",
        "Because they require Earth's liquid water reserves to cool down their overheating star.",
      ],
      optionsEn: [
        "Because humans accidentally intercepted and leaked their top-secret interstellar broadcasts.",
        "Because they are planning a hyperspace bypass directly through our solar system, making Earth an inconvenient obstacle.",
        "Because human greenhouse gas emissions have destabilized the cosmic background radiation.",
        "Because they require Earth's liquid water reserves to cool down their overheating star.",
      ],
      optionsVi: [
        "Bởi vì con người vô tình chặn bắt và làm rò rỉ các tín hiệu phát thanh liên sao tuyệt mật của họ.",
        "Bởi vì họ đang lên kế hoạch làm đường vòng siêu không gian xuyên qua hệ mặt trời, biến Trái Đất thành chướng ngại vật cản đường.",
        "Bởi vì lượng khí thải nhà kính của con người đã làm mất ổn định bức xạ phông vi sóng vũ trụ.",
        "Bởi vì họ cần trữ lượng nước lỏng của Trái Đất để làm nguội ngôi sao đang quá nhiệt của mình.",
      ],
      correctAnswer: 1,
      explanation: 'In Segments 14 & 15: "...the Smorpians are planning a hyperspace bypass through our solar system, so they decided that humanity has to go." This is an homage to Douglas Adams\'s "The Hitchhiker\'s Guide to the Galaxy".',
      explanationEn: 'In Segments 14 & 15: "...the Smorpians are planning a hyperspace bypass through our solar system, so they decided that humanity has to go." This is an homage to Douglas Adams\'s "The Hitchhiker\'s Guide to the Galaxy".',
      explanationVi: 'Trong các câu 14 & 15: "...người Smorpian đang lên kế hoạch làm một đường vòng siêu không gian xuyên qua hệ mặt trời của chúng ta, vì vậy họ quyết định rằng nhân loại cần phải bị xóa sổ." Đây là chi tiết tri ân tác phẩm kinh điển "The Hitchhiker\'s Guide to the Galaxy".',
      referenceSegmentIndex: 13,
      targetedConcept: "Động cơ xung đột & Yếu tố Sci-Fi cổ điển: Hyperspace Bypass (Conflict Motivation & Sci-Fi Homage)",
      targetedConceptEn: "Conflict Motivation & Sci-Fi Homage",
      targetedConceptVi: "Động cơ xung đột & Yếu tố Sci-Fi cổ điển: Hyperspace Bypass",
    },
    {
      id: "q_kurzgesagt_5",
      question: "According to the video, why do traditional military concepts like 'front lines, tactics, and logistics' become meaningless in interstellar war?",
      questionEn: "According to the video, why do traditional military concepts like 'front lines, tactics, and logistics' become meaningless in interstellar war?",
      questionVi: "Theo video, tại sao các khái niệm quân sự truyền thống như 'tiền tuyến, chiến thuật và hậu cần' lại trở nên vô nghĩa trong chiến tranh liên sao?",
      options: [
        "Because the vast astronomical distances render localized battle lines and real-time maneuvers completely irrelevant.",
        "Because both civilizations have signed a galactic disarmament treaty banning foot soldiers.",
        "Because quantum computing allows both sides to instantly predict every tactical move beforehand.",
        "Because all weapons are automatically operated by rogue pacifist artificial intelligence.",
      ],
      optionsEn: [
        "Because the vast astronomical distances render localized battle lines and real-time maneuvers completely irrelevant.",
        "Because both civilizations have signed a galactic disarmament treaty banning foot soldiers.",
        "Because quantum computing allows both sides to instantly predict every tactical move beforehand.",
        "Because all weapons are automatically operated by rogue pacifist artificial intelligence.",
      ],
      optionsVi: [
        "Bởi vì khoảng cách thiên văn bao la khiến các chiến tuyến cục bộ và việc điều động chiến thuật thời gian thực trở nên hoàn toàn vô nghĩa.",
        "Bởi vì cả hai nền văn minh đã ký một hiệp ước giải trừ quân bị ngân hà cấm triển khai bộ binh.",
        "Bởi vì điện toán lượng tử cho phép hai bên lập tức tiên đoán trước mọi nước đi chiến thuật.",
        "Bởi vì toàn bộ vũ khí đều được vận hành tự động bởi trí tuệ nhân tạo phản chiến.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 16 & 17: "Interstellar war is hard though. Front lines, tactics, and logistics are meaningless at these scales." Extreme astronomical distances dissolve traditional territorial boundaries.',
      explanationEn: 'In Segments 16 & 17: "Interstellar war is hard though. Front lines, tactics, and logistics are meaningless at these scales." Extreme astronomical distances dissolve traditional territorial boundaries.',
      explanationVi: 'Trong các câu 16 & 17: "Tuy nhiên, chiến tranh liên sao lại vô cùng nan giải. Tiền tuyến, chiến thuật và hậu cần đều trở nên vô nghĩa ở những quy mô vũ trụ này." Khoảng cách giữa các ngôi sao xóa bỏ hoàn toàn ranh giới chiến tuyến địa lý thông thường.',
      referenceSegmentIndex: 16,
      targetedConcept: "Học thuyết quân sự vũ trụ: Quy mô thiên văn vs Chiến thuật truyền thống (Interstellar Military Scales)",
      targetedConceptEn: "Interstellar Military Scales",
      targetedConceptVi: "Học thuyết quân sự vũ trụ: Quy mô thiên văn vs Chiến thuật truyền thống",
    },
    {
      id: "q_kurzgesagt_6",
      question: "What does the narrator mean when stating that interstellar war is 'fought across time'?",
      questionEn: "What does the narrator mean when stating that interstellar war is 'fought across time'?",
      questionVi: "Người dẫn chuyện muốn truyền tải điều gì khi tuyên bố rằng chiến tranh liên sao 'diễn ra xuyên suốt thời gian'?",
      options: [
        "Soldiers will use time machines to travel back to prehistoric Earth to stop humanity from evolving.",
        "The combatants experience temporal anomalies caused by black hole gravitational singularities.",
        "Because light speed is finite, decades or centuries pass between launching an attack and observing the outcome.",
        "The war will strictly follow an ancient galactic timetable agreed upon thousands of years ago.",
      ],
      optionsEn: [
        "Soldiers will use time machines to travel back to prehistoric Earth to stop humanity from evolving.",
        "The combatants experience temporal anomalies caused by black hole gravitational singularities.",
        "Because light speed is finite, decades or centuries pass between launching an attack and observing the outcome.",
        "The war will strictly follow an ancient galactic timetable agreed upon thousands of years ago.",
      ],
      optionsVi: [
        "Binh lính sẽ dùng cỗ máy thời gian quay về Trái Đất thời tiền sử để ngăn chặn loài người tiến hóa.",
        "Các bên tham chiến trải qua những dị thường thời gian do điểm kỳ dị hấp dẫn của hố đen gây ra.",
        "Do tốc độ ánh sáng là hữu hạn, nhiều thập kỷ hoặc thế kỷ sẽ trôi qua giữa lúc phóng đòn tấn công và khi quan sát được kết quả.",
        "Cuộc chiến sẽ tuân thủ nghiêm ngặt theo một thời gian biểu ngân hà cổ xưa được thống nhất từ hàng ngàn năm trước.",
      ],
      correctAnswer: 2,
      explanation: 'In Segments 18 & 19: "It\'s also fought across time. Decades will pass between firing a weapon and learning whether it hit or not." Due to the finite speed of light, causality and feedback loops span generations.',
      explanationEn: 'In Segments 18 & 19: "It\'s also fought across time. Decades will pass between firing a weapon and learning whether it hit or not." Due to the finite speed of light, causality and feedback loops span generations.',
      explanationVi: 'Trong các câu 18 & 19: "Nó còn là cuộc chiến bị chi phối bởi dòng thời gian. Nhiều thập kỷ sẽ trôi qua giữa thời điểm khai hỏa vũ khí và lúc biết được nó có bắn trúng đích hay không." Do vận tốc ánh sáng hữu hạn, phản hồi chiến trường phải mất nhiều thế hệ.',
      referenceSegmentIndex: 17,
      targetedConcept: "Vật lý thiên văn: Giới hạn vận tốc ánh sáng & Độ trễ thời gian (Relativistic Time Lag & Speed of Light)",
      targetedConceptEn: "Relativistic Time Lag & Speed of Light",
      targetedConceptVi: "Vật lý thiên văn: Giới hạn vận tốc ánh sáng & Độ trễ thời gian",
    },
    {
      id: "q_kurzgesagt_7",
      question: "In Segment 20, what does the adjective 'futile' mean in 'Sending an invasion fleet is futile'?",
      questionEn: "In Segment 20, what does the adjective 'futile' mean in 'Sending an invasion fleet is futile'?",
      questionVi: "Trong câu 20, tính từ 'futile' trong cụm 'Sending an invasion fleet is futile' có nghĩa là gì?",
      options: [
        "Completely pointless and ineffective because it cannot succeed under physical realities.",
        "Extremely secretive and undetected by planetary radar systems.",
        "Financially profitable and beneficial for the invading star system's economy.",
        "Highly aggressive and guaranteed to bring quick total victory.",
      ],
      optionsEn: [
        "Completely pointless and ineffective because it cannot succeed under physical realities.",
        "Extremely secretive and undetected by planetary radar systems.",
        "Financially profitable and beneficial for the invading star system's economy.",
        "Highly aggressive and guaranteed to bring quick total victory.",
      ],
      optionsVi: [
        "Hoàn toàn vô ích, vô vọng và không mang lại kết quả vì không thể thành công theo quy luật vật lý.",
        "Cực kỳ bí mật và không thể bị phát hiện bởi các hệ thống radar hành tinh.",
        "Rất có lãi về mặt tài chính và mang lại lợi ích kinh tế cho hệ sao đi xâm lược.",
        "Mang tính xâm lược cao độ và đảm bảo mang lại chiến thắng tuyệt đối nhanh chóng.",
      ],
      correctAnswer: 0,
      explanation: 'In Segment 20: "Sending an invasion fleet is futile." The word "futile" means completely incapable of producing any useful result; pointless or in vain.',
      explanationEn: 'In Segment 20: "Sending an invasion fleet is futile." The word "futile" means completely incapable of producing any useful result; pointless or in vain.',
      explanationVi: 'Trong câu 20: "Sending an invasion fleet is futile." Tính từ "futile" chỉ điều gì đó hoàn toàn vô ích, không có khả năng mang lại kết quả mong muốn trước những thực tại bất khả kháng.',
      referenceSegmentIndex: 19,
      targetedConcept: "Từ vựng học thuật B2: Futile (Vô ích / Không có kết quả)",
      targetedConceptEn: "Academic Vocabulary: Futile",
      targetedConceptVi: "Từ vựng học thuật B2: Futile (Vô ích / Không có kết quả)",
    },
    {
      id: "q_kurzgesagt_8",
      question: "Why would humanity have 'plenty of time to prepare' even if the Smorpian fleet travels at a large fraction of the speed of light?",
      questionEn: "Why would humanity have 'plenty of time to prepare' even if the Smorpian fleet travels at a large fraction of the speed of light?",
      questionVi: "Tại sao loài người vẫn có 'dư dả thời gian để chuẩn bị' ngay cả khi hạm đội Smorpian di chuyển với một phần lớn vận tốc ánh sáng?",
      options: [
        "Because the 42 light-year gulf ensures the physical crossing still takes decades or centuries, giving Earth generations to detect and react.",
        "Because the Smorpians promised to send a warning postcard 50 years prior to launch.",
        "Because humans can simply deflect the alien ships using terrestrial weather-control machines.",
        "Because spaceships traveling near light speed run out of fuel within a few minutes of takeoff.",
      ],
      optionsEn: [
        "Because the 42 light-year gulf ensures the physical crossing still takes decades or centuries, giving Earth generations to detect and react.",
        "Because the Smorpians promised to send a warning postcard 50 years prior to launch.",
        "Because humans can simply deflect the alien ships using terrestrial weather-control machines.",
        "Because spaceships traveling near light speed run out of fuel within a few minutes of takeoff.",
      ],
      optionsVi: [
        "Bởi vì khoảng cách 42 năm ánh sáng khiến hành trình vật lý vẫn kéo dài hàng thập kỷ hay thế kỷ, cho Trái Đất nhiều thế hệ để phát hiện và chuẩn bị.",
        "Bởi vì người Smorpian đã hứa sẽ gửi một tấm bưu thiếp cảnh báo 50 năm trước khi xuất phát.",
        "Bởi vì con người có thể làm chệch hướng các tàu ngoài hành tinh bằng máy điều khiển thời tiết trên mặt đất.",
        "Bởi vì các tàu vũ trụ di chuyển gần tốc độ ánh sáng sẽ cạn kiệt nhiên liệu chỉ sau vài phút khởi hành.",
      ],
      correctAnswer: 0,
      explanation: 'In Segment 21: "Even if the Smorpians travel in a large fraction of the speed of light, the journey to Earth would take decades or even centuries, and humans would have plenty of time to prepare."',
      explanationEn: 'In Segment 21: "Even if the Smorpians travel in a large fraction of the speed of light, the journey to Earth would take decades or even centuries, and humans would have plenty of time to prepare."',
      explanationVi: 'Trong câu 21: "Ngay cả khi người Smorpian di chuyển với một phần đáng kể của tốc độ ánh sáng, hành trình đến Trái Đất cũng sẽ mất hàng thập kỷ hoặc thậm chí hàng thế kỷ, và con người sẽ có dư dả thời gian để chuẩn bị."',
      referenceSegmentIndex: 20,
      targetedConcept: "Động lực học tương đối tính: Khoảng cách liên sao & Thời gian hành trình (Relativistic Travel & Distance)",
      targetedConceptEn: "Relativistic Travel & Distance",
      targetedConceptVi: "Động lực học tương đối tính: Khoảng cách liên sao & Thời gian hành trình",
    },
  ],
  generatedBy: "CONTEXTUAL_FALLBACK",
};

/**
 * Kurzgesagt: How to Win an Interstellar War
 * Slug: kurzgesagt-interstellar-war
 */
export const LESSON_KURZGESAGT_INTERSTELLAR: MockVideoLesson = {
  "id": "88c4fc17-4445-46f4-82d4-c51fbb56e859",
  "slug": "kurzgesagt-interstellar-war",
  "title": "Kurzgesagt: How to Win an Interstellar War",
  "description": "Khám phá cuộc chiến vũ trụ đầy kịch tính cùng Kurzgesagt – In a Nutshell: Liệu người ngoài hành tinh có thể hủy diệt Trái Đất từ khoảng cách hàng năm ánh sáng? Học từ vựng khoa học viễn tưởng, vật lý thiên văn và tư duy logic.",
  "sourceType": "YOUTUBE",
  "externalId": "tybKnGZRwcU",
  "thumbnailUrl": "https://img.youtube.com/vi/tybKnGZRwcU/hqdefault.jpg",
  "durationSeconds": 93,
  "durationFormatted": "01:33",
  "cefrLevel": "B2",
  "supportedTypes": "BOTH",
  "categoryId": "cat_science_tech",
  "categorySlug": "science-tech",
  "categoryName": "Khoa Học & Công Nghệ",
  "accent": "en-US",
  "wpmSpeed": 140,
  "viewCount": 4210,
  "studyCount": 1560,
  "quiz": QUIZ_KURZGESAGT_INTERSTELLAR,
  "segments": [
    {
      "orderIndex": 1,
      "startTime": 0,
      "endTime": 3.83,
      "text": "Could aliens destroy us from light years away?",
      "normalizedText": "could aliens destroy us from light years away",
      "ipaUs": "kʊd ˈeɪliənz dɪˈstrɔɪ ʌs frəm laɪt jɪrz əˈweɪ",
      "translationVi": "Liệu người ngoài hành tinh có thể tiêu diệt chúng ta từ cách xa hàng năm ánh sáng?",
      "explanationAi": "Cụm 'light years away' (cách xa hàng năm ánh sáng - khoảng cách trong vũ trụ học). Trợ động từ phỏng đoán 'could'.",
      "properNouns": [],
      "keywords": [
        "aliens",
        "destroy",
        "light years",
        "away"
      ],
      "tokenCount": 8
    },
    {
      "orderIndex": 2,
      "startTime": 4.38,
      "endTime": 10.77,
      "text": "Mh, another day at the Kurzgesagt Labs, where we answer the most important questions with science.",
      "normalizedText": "mh another day at the kurzgesagt labs where we answer the most important questions with science",
      "ipaUs": "əm əˈnʌðər deɪ æt ðə kʊərtsɡəˈzɑːkt læbz wɛr wi ˈænsər ðə moʊst ɪmˈpɔːrtnt ˈkwɛstʃənz wɪð ˈsaɪəns",
      "translationVi": "Lại một ngày nữa tại Phòng thí nghiệm Kurzgesagt, nơi chúng tôi giải đáp những câu hỏi quan trọng nhất bằng khoa học.",
      "explanationAi": "Tên thương hiệu 'Kurzgesagt Labs'. Mệnh đề quan hệ 'where we answer...' chỉ nơi chốn.",
      "properNouns": [
        "Kurzgesagt Labs"
      ],
      "keywords": [
        "Kurzgesagt",
        "Labs",
        "answer",
        "important",
        "science"
      ],
      "tokenCount": 16
    },
    {
      "orderIndex": 3,
      "startTime": 10.78,
      "endTime": 15.34,
      "text": "Today: how might civilizations wage war across light years?",
      "normalizedText": "today how might civilizations wage war across light years",
      "ipaUs": "təˈdeɪ haʊ maɪt ˌsɪvələˈzeɪʃənz weɪdʒ wɔːr əˈkrɔːs laɪt jɪrz",
      "translationVi": "Hôm nay: các nền văn minh có thể tiến hành chiến tranh xuyên qua các năm ánh sáng như thế nào?",
      "explanationAi": "Thành ngữ 'wage war' (phát động/tiến hành chiến tranh), danh từ 'civilizations' (các nền văn minh).",
      "properNouns": [],
      "keywords": [
        "civilizations",
        "wage war",
        "across",
        "light years"
      ],
      "tokenCount": 9
    },
    {
      "orderIndex": 4,
      "startTime": 15.35,
      "endTime": 19.99,
      "text": "What kind of devastating weapons could they use, and what would they look like?",
      "normalizedText": "what kind of devastating weapons could they use and what would they look like",
      "ipaUs": "wʌt kaɪnd ʌv ˈdɛvəˌsteɪtɪŋ ˈwɛpənz kʊd ðeɪ juːz ænd wʌt wʊd ðeɪ lʊk laɪk",
      "translationVi": "Họ có thể sử dụng loại vũ khí hủy diệt nào, và chúng sẽ trông như thế nào?",
      "explanationAi": "Tính từ 'devastating' (mang tính tàn phá khốc liệt) và cụm hỏi diện mạo 'look like'.",
      "properNouns": [],
      "keywords": [
        "devastating",
        "weapons",
        "use",
        "look like"
      ],
      "tokenCount": 14
    },
    {
      "orderIndex": 5,
      "startTime": 20.08,
      "endTime": 21.64,
      "text": "Meet our two players.",
      "normalizedText": "meet our two players",
      "ipaUs": "miːt ˈaʊər tuː ˈpleɪərz",
      "translationVi": "Hãy cùng gặp gỡ hai đấu thủ của chúng ta.",
      "explanationAi": "Ẩn dụ hài hước 'players' (hai bên tham chiến trong vũ trụ).",
      "properNouns": [],
      "keywords": [
        "meet",
        "players"
      ],
      "tokenCount": 4
    },
    {
      "orderIndex": 6,
      "startTime": 21.65,
      "endTime": 25.47,
      "text": "A yellow dwarf star system home to a species of primates.",
      "normalizedText": "a yellow dwarf star system home to a species of primates",
      "ipaUs": "ə ˈjɛloʊ dwɔːrf stɑːr ˈsɪstəm hoʊm tuː ə ˈspiːʃiːz ʌv ˈpraɪmeɪts",
      "translationVi": "Một hệ sao lùn vàng, quê hương của một loài linh trưởng.",
      "explanationAi": "Khái niệm thiên văn 'yellow dwarf star' (sao lùn vàng) và sinh học 'primates' (bộ linh trưởng).",
      "properNouns": [],
      "keywords": [
        "yellow dwarf",
        "star system",
        "species",
        "primates"
      ],
      "tokenCount": 11
    },
    {
      "orderIndex": 7,
      "startTime": 25.48,
      "endTime": 30.14,
      "text": "\"Humans,\" as they call themselves, recently became a technological civilization.",
      "normalizedText": "humans as they call themselves recently became a technological civilization",
      "ipaUs": "ˈhjuːmənz æz ðeɪ kɔːl ðəmˈsɛlvz ˈriːsntli bɪˈkeɪm ə ˌtɛknəˈlɑːdʒɪkl ˌsɪvələˈzeɪʃən",
      "translationVi": "\"Con người,\" như cách họ tự gọi mình, gần đây đã trở thành một nền văn minh công nghệ.",
      "explanationAi": "Cụm 'technological civilization' (nền văn minh kỹ thuật công nghệ) và đại từ phản thân 'themselves'.",
      "properNouns": [
        "Humans"
      ],
      "keywords": [
        "humans",
        "themselves",
        "technological",
        "civilization"
      ],
      "tokenCount": 10
    },
    {
      "orderIndex": 8,
      "startTime": 30.15,
      "endTime": 33.7,
      "text": "They have rockets, nuclear reactors and memes.",
      "normalizedText": "they have rockets nuclear reactors and memes",
      "ipaUs": "ðeɪ hæv ˈrɑːkɪts ˈnuːkliər riˈæktərz ænd miːmz",
      "translationVi": "Họ có tên lửa, lò phản ứng hạt nhân và cả ảnh chế (meme).",
      "explanationAi": "Thuật ngữ 'nuclear reactors' (lò phản ứng hạt nhân) và từ vựng internet 'memes'.",
      "properNouns": [],
      "keywords": [
        "rockets",
        "nuclear reactors",
        "memes"
      ],
      "tokenCount": 7
    },
    {
      "orderIndex": 9,
      "startTime": 33.71,
      "endTime": 35.09,
      "text": "How cute!",
      "normalizedText": "how cute",
      "ipaUs": "haʊ kjuːt",
      "translationVi": "Thật là dễ thương làm sao!",
      "explanationAi": "Câu cảm thán ngắn 'How cute!' mang sắc thái hài hước châm biếm đặc trưng.",
      "properNouns": [],
      "keywords": [
        "cute"
      ],
      "tokenCount": 2
    },
    {
      "orderIndex": 10,
      "startTime": 35.61,
      "endTime": 37.93,
      "text": "The Smorpians disagree.",
      "normalizedText": "the smorpians disagree",
      "ipaUs": "ðə ˈsmɔːrpiənz ˌdɪsəˈɡriː",
      "translationVi": "Nhưng người Smorpian thì không nghĩ vậy.",
      "explanationAi": "Tên chủng tộc giả tưởng 'Smorpians' và động từ 'disagree' (bất đồng ý kiến).",
      "properNouns": [
        "Smorpians"
      ],
      "keywords": [
        "Smorpians",
        "disagree"
      ],
      "tokenCount": 3
    },
    {
      "orderIndex": 11,
      "startTime": 38.18,
      "endTime": 44.86,
      "text": "They reside on a planet around the orange dwarf star HD 40307, 42 light years away.",
      "normalizedText": "they reside on a planet around the orange dwarf star hd 40307 42 light years away",
      "ipaUs": "ðeɪ rɪˈzaɪd ɑːn ə ˈplænɪt əˈraʊnd ðɪ ˈɔːrɪndʒ dwɔːrf stɑːr eɪtʃ diː fɔːr ˈzɪroʊ θriː ˈzɪroʊ ˈsɛvn ˈfɔːrti tuː laɪt jɪrz əˈweɪ",
      "translationVi": "Họ cư trú trên một hành tinh quay quanh ngôi sao lùn cam HD 40307, cách xa 42 năm ánh sáng.",
      "explanationAi": "Tên thiên văn có thật 'HD 40307' và động từ trang trọng 'reside' (cư ngụ, trú ngụ).",
      "properNouns": [
        "HD 40307"
      ],
      "keywords": [
        "reside",
        "planet",
        "orange dwarf",
        "HD 40307",
        "light years"
      ],
      "tokenCount": 16
    },
    {
      "orderIndex": 12,
      "startTime": 45.01,
      "endTime": 50.46,
      "text": "Smorpian civilization developed earlier than humans and they have much better technology.",
      "normalizedText": "smorpian civilization developed earlier than humans and they have much better technology",
      "ipaUs": "ˈsmɔːrpiən ˌsɪvələˈzeɪʃən dɪˈvɛləpt ˈɜːrliər ðæn ˈhjuːmənz ænd ðeɪ hæv mʌtʃ ˈbɛtər tɛkˈnɑːlədʒi",
      "translationVi": "Nền văn minh Smorpian phát triển sớm hơn loài người và họ sở hữu công nghệ vượt trội hơn nhiều.",
      "explanationAi": "So sánh hơn 'developed earlier than' và cụm từ 'much better technology'.",
      "properNouns": [
        "Smorpian"
      ],
      "keywords": [
        "Smorpian",
        "civilization",
        "earlier",
        "technology"
      ],
      "tokenCount": 12
    },
    {
      "orderIndex": 13,
      "startTime": 50.55,
      "endTime": 55.24,
      "text": "They've recently built a Dyson swarm around their star which gives them near limitless energy.",
      "normalizedText": "theyve recently built a dyson swarm around their star which gives them near limitless energy",
      "ipaUs": "ðeɪv ˈriːsntli bɪlt ə ˈdaɪsn swɔːrm əˈraʊnd ðɛr stɑːr wɪtʃ ɡɪvz ðɛm nɪr ˈlɪmɪtlɪs ˈɛnərdʒi",
      "translationVi": "Gần đây họ đã chế tạo một bầy vệ tinh Dyson bao quanh ngôi sao của mình, đem lại nguồn năng lượng gần như vô hạn.",
      "explanationAi": "Thuật ngữ siêu công trình vũ trụ 'Dyson swarm' và cụm tính từ 'near limitless energy'.",
      "properNouns": [
        "Dyson"
      ],
      "keywords": [
        "Dyson swarm",
        "star",
        "limitless energy"
      ],
      "tokenCount": 15
    },
    {
      "orderIndex": 14,
      "startTime": 55.25,
      "endTime": 62.47,
      "text": "And they noticed humanity, which is unfortunate as the Smorpians are planning a hyperspace bypass through our solar system,",
      "normalizedText": "and they noticed humanity which is unfortunate as the smorpians are planning a hyperspace bypass through our solar system",
      "ipaUs": "ænd ðeɪ ˈnoʊtɪst hjuːˈmænəti wɪtʃ ɪz ʌnˈfɔːrtʃənət æz ðə ˈsmɔːrpiənz ɑːr ˈplænɪŋ ə ˈhaɪpərˌspeɪs ˈbaɪˌpæs θruː ˈaʊər ˈsoʊlər ˈsɪstəm",
      "translationVi": "Và họ đã để mắt tới nhân loại, điều này thật không may vì người Smorpian đang lên kế hoạch làm một đường vòng siêu không gian xuyên qua hệ mặt trời của chúng ta,",
      "explanationAi": "Khái niệm 'hyperspace bypass' (tuyến đường siêu không gian) và mệnh đề phụ 'which is unfortunate'.",
      "properNouns": [
        "Smorpians"
      ],
      "keywords": [
        "humanity",
        "unfortunate",
        "Smorpians",
        "hyperspace bypass",
        "solar system"
      ],
      "tokenCount": 19
    },
    {
      "orderIndex": 15,
      "startTime": 62.48,
      "endTime": 65.46,
      "text": "So they decided that humanity has to go.",
      "normalizedText": "so they decided that humanity has to go",
      "ipaUs": "soʊ ðeɪ dɪˈsaɪdɪd ðæt hjuːˈmænəti hæz tuː ɡoʊ",
      "translationVi": "Vì vậy họ quyết định rằng nhân loại cần phải bị xóa sổ.",
      "explanationAi": "Thành ngữ 'has to go' (phải biến mất / bị loại bỏ khỏi vũ trụ).",
      "properNouns": [],
      "keywords": [
        "decided",
        "humanity",
        "go"
      ],
      "tokenCount": 8
    },
    {
      "orderIndex": 16,
      "startTime": 65.51,
      "endTime": 68.09,
      "text": "Interstellar war is hard though.",
      "normalizedText": "interstellar war is hard though",
      "ipaUs": "ˌɪntərˈstɛlər wɔːr ɪz hɑːrd ðoʊ",
      "translationVi": "Tuy nhiên, chiến tranh liên sao lại vô cùng nan giải.",
      "explanationAi": "Thuật ngữ 'Interstellar war' (chiến tranh giữa các vì sao) và từ đệm 'though'.",
      "properNouns": [],
      "keywords": [
        "interstellar war",
        "hard"
      ],
      "tokenCount": 5
    },
    {
      "orderIndex": 17,
      "startTime": 68.21,
      "endTime": 72.39,
      "text": "Front lines, tactics, and logistics are meaningless at these scales.",
      "normalizedText": "front lines tactics and logistics are meaningless at these scales",
      "ipaUs": "frʌnt laɪnz ˈtæktɪks ænd ləˈdʒɪstɪks ɑːr ˈmiːnɪŋlɪs æt ðiːz skeɪlz",
      "translationVi": "Tiền tuyến, chiến thuật và hậu cần đều trở nên vô nghĩa ở những quy mô vũ trụ này.",
      "explanationAi": "Ba khái niệm quân sự 'front lines', 'tactics', 'logistics' và tính từ 'meaningless'.",
      "properNouns": [],
      "keywords": [
        "front lines",
        "tactics",
        "logistics",
        "meaningless",
        "scales"
      ],
      "tokenCount": 10
    },
    {
      "orderIndex": 18,
      "startTime": 72.72,
      "endTime": 74.74,
      "text": "It's also fought across time.",
      "normalizedText": "its also fought across time",
      "ipaUs": "ɪts ˈɔːlsoʊ fɔːt əˈkrɔːs taɪm",
      "translationVi": "Nó còn là cuộc chiến bị chi phối bởi dòng thời gian.",
      "explanationAi": "Dạng bị động quá khứ phân từ 'fought' của động từ 'fight'.",
      "properNouns": [],
      "keywords": [
        "fought",
        "across time"
      ],
      "tokenCount": 5
    },
    {
      "orderIndex": 19,
      "startTime": 74.95,
      "endTime": 79.29,
      "text": "Decades will pass between firing a weapon and learning whether it hit or not.",
      "normalizedText": "decades will pass between firing a weapon and learning whether it hit or not",
      "ipaUs": "ˈdɛkeɪdz wɪl pæs bɪˈtwiːn ˈfaɪərɪŋ ə ˈwɛpən ænd ˈlɜːrnɪŋ ˈwɛðər ɪt hɪt ɔːr nɑːt",
      "translationVi": "Nhiều thập kỷ sẽ trôi qua giữa thời điểm khai hỏa vũ khí và lúc biết được nó có bắn trúng đích hay không.",
      "explanationAi": "Cấu trúc 'between doing X and doing Y' và danh từ số nhiều 'decades' (hàng thập kỷ).",
      "properNouns": [],
      "keywords": [
        "decades",
        "pass",
        "firing",
        "weapon",
        "learning",
        "hit"
      ],
      "tokenCount": 14
    },
    {
      "orderIndex": 20,
      "startTime": 79.65,
      "endTime": 82.39,
      "text": "Sending an invasion fleet is futile.",
      "normalizedText": "sending an invasion fleet is futile",
      "ipaUs": "ˈsɛndɪŋ ən ɪnˈveɪʒn fliːt ɪz ˈfjuːtl",
      "translationVi": "Việc phái một hạm đội xâm lược là hoàn toàn vô ích.",
      "explanationAi": "Danh động từ 'Sending', danh từ 'invasion fleet' (hạm đội xâm lăng) và tính từ 'futile' (vô vọng).",
      "properNouns": [],
      "keywords": [
        "sending",
        "invasion fleet",
        "futile"
      ],
      "tokenCount": 6
    },
    {
      "orderIndex": 21,
      "startTime": 82.61,
      "endTime": 92.66,
      "text": "Even if the Smorpians travel in a large fraction of the speed of light, the journey to Earth would take decades or even centuries, and humans would have plenty of time to prepare.",
      "normalizedText": "even if the smorpians travel in a large fraction of the speed of light the journey to earth would take decades or even centuries and humans would have plenty of time to prepare",
      "ipaUs": "ˈiːvn ɪf ðə ˈsmɔːrpiənz ˈtrævl ɪn ə lɑːrdʒ ˈfrækʃn ʌv ðə spiːd ʌv laɪt ðə ˈdʒɜːrni tuː ɜːrθ wʊd teɪk ˈdɛkeɪdz ɔːr ˈiːvn ˈsɛntʃəriz ænd ˈhjuːmənz wʊd hæv ˈplɛnti ʌv taɪm tuː prɪˈpɛr",
      "translationVi": "Ngay cả khi người Smorpian di chuyển với một phần đáng kể của tốc độ ánh sáng, hành trình đến Trái Đất cũng sẽ mất hàng thập kỷ hoặc thậm chí hàng thế kỷ, và con người sẽ có dư dả thời gian để chuẩn bị.",
      "explanationAi": "Cụm 'fraction of the speed of light' (tỷ lệ của vận tốc ánh sáng), 'plenty of time' (dư dả thời gian).",
      "properNouns": [
        "Smorpians",
        "Earth"
      ],
      "keywords": [
        "speed of light",
        "journey",
        "Earth",
        "centuries",
        "prepare"
      ],
      "tokenCount": 33
    }
  ]
};
