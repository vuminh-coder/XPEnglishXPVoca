const fs = require('fs');
const path = require('path');

const segments = JSON.parse(fs.readFileSync(path.join(__dirname, 'walle_pure_segments.json'), 'utf8'));

console.log(`Loaded ${segments.length} segments.`);

const quiz = {
  lessonId: "mov_ani_11",
  lessonTitle: "WALL-E: Hidden Meaning, Captain McCrea & 'I Want to Live'",
  totalQuestions: 8,
  xpReward: 200,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "q_mov_ani_11_1",
      question: "According to Garyx Wormuloid, how does WALL-E satirize mass consumerism?",
      questionEn: "According to Garyx Wormuloid, how does WALL-E satirize mass consumerism?",
      questionVi: "Theo Garyx Wormuloid, bộ phim WALL-E châm biếm chủ nghĩa tiêu dùng đại chúng như thế nào?",
      options: [
        "By depicting an Earth destroyed by the insatiable appetite for newer, flashier products",
        "By celebrating the convenience of disposable single-use utensils",
        "By encouraging viewers to buy more luxury space cruises",
        "By praising large corporations for automating domestic chores"
      ],
      optionsEn: [
        "By depicting an Earth destroyed by the insatiable appetite for newer, flashier products",
        "By celebrating the convenience of disposable single-use utensils",
        "By encouraging viewers to buy more luxury space cruises",
        "By praising large corporations for automating domestic chores"
      ],
      optionsVi: [
        "Bằng cách khắc họa Trái Đất bị hủy hoại bởi lòng tham vô độ đối với những món đồ mới hơn, hào nhoáng hơn",
        "Bằng cách ca ngợi sự tiện lợi của đồ dùng một lần",
        "Bằng cách khuyến khích khán giả mua thêm nhiều chuyến du thuyền vũ trụ xa hoa",
        "Bằng cách tán dương các tập đoàn lớn vì đã tự động hóa việc nhà"
      ],
      correctAnswer: 0,
      explanation: "Garyx points out that the film satirizes consumer culture: 'Wall-E satirizes mass consumerism by depicting a planet destroyed by the insatiable need for newer, flashier stuff.'",
      explanationEn: "Garyx points out that the film satirizes consumer culture: 'Wall-E satirizes mass consumerism by depicting a planet destroyed by the insatiable need for newer, flashier stuff.'",
      explanationVi: "Garyx chỉ ra rằng bộ phim châm biếm văn hóa tiêu dùng: 'Wall-E châm biếm chủ nghĩa tiêu dùng đại chúng bằng cách khắc họa một hành tinh bị tàn phá bởi lòng tham vô độ đối với những món đồ mới hơn, hào nhoáng hơn.'",
      targetedConcept: "Satire of Mass Consumerism",
      targetedConceptEn: "Satire of Mass Consumerism",
      targetedConceptVi: "Châm biếm chủ nghĩa tiêu dùng đại chúng",
      referenceSegmentIndex: 17
    },
    {
      id: "q_mov_ani_11_2",
      question: "Which cinematic tradition does the film draw upon to depict its overconsumed world?",
      questionEn: "Which cinematic tradition does the film draw upon to depict its overconsumed world?",
      questionVi: "Bộ phim đã dựa trên truyền thống điện ảnh nào để khắc họa thế giới tiêu thụ quá mức của mình?",
      options: [
        "The minimalist, dialogue-free visual comedy of the silent film era (Chaplin and Keaton)",
        "The fast-talking screwball comedy format of the 1930s",
        "Hyperactive CGI action blockbusters with non-stop expository monologues",
        "Classical French new-wave documentary realism"
      ],
      optionsEn: [
        "The minimalist, dialogue-free visual comedy of the silent film era (Chaplin and Keaton)",
        "The fast-talking screwball comedy format of the 1930s",
        "Hyperactive CGI action blockbusters with non-stop expository monologues",
        "Classical French new-wave documentary realism"
      ],
      optionsVi: [
        "Phong cách tối giản, không lời thoại của kỷ nguyên phim câm (như Charlie Chaplin và Buster Keaton)",
        "Thể loại hài kịch đối thoại dồn dập của thập niên 1930",
        "Phim bom tấn hành động kỹ xảo với những màn độc thoại giải thích không ngớt",
        "Chủ nghĩa hiện thực phim tài liệu làn sóng mới của Pháp"
      ],
      correctAnswer: 0,
      explanation: "WALL-E uses visual mime and physical antics reminiscent of silent film icons: 'antics are reminiscent of early stars like Buster Keaton, Charlie Chaplin, and woman stomping on grapes.'",
      explanationEn: "WALL-E uses visual mime and physical antics reminiscent of silent film icons: 'antics are reminiscent of early stars like Buster Keaton, Charlie Chaplin, and woman stomping on grapes.'",
      explanationVi: "WALL-E sử dụng cử chỉ kịch câm thị giác và những trò hề hình thể gợi nhớ đến các biểu tượng phim câm: 'những trò hề gợi nhớ đến các ngôi sao thời kỳ đầu như Buster Keaton, Charlie Chaplin...'",
      targetedConcept: "Silent Film Aesthetics",
      targetedConceptEn: "Silent Film Aesthetics",
      targetedConceptVi: "Thẩm mỹ điện ảnh phim câm",
      referenceSegmentIndex: 21
    },
    {
      id: "q_mov_ani_11_3",
      question: "What wordplay does the host use to describe humans surrendering control to machines?",
      questionEn: "What wordplay does the host use to describe humans surrendering control to machines?",
      questionVi: "Người dẫn chương trình đã dùng lối chơi chữ nào để mô tả việc con người trao quyền kiểm soát cho máy móc?",
      options: [
        "They traded their autonomy for automation",
        "They traded their spaceships for motorbikes",
        "They exchanged their thoughts for pixels",
        "They gave up their intelligence for entertainment"
      ],
      optionsEn: [
        "They traded their autonomy for automation",
        "They traded their spaceships for motorbikes",
        "They exchanged their thoughts for pixels",
        "They gave up their intelligence for entertainment"
      ],
      optionsVi: [
        "Họ đã đánh đổi quyền tự chủ (autonomy) để lấy sự tự động hóa (automation)",
        "Họ đổi phi thuyền lấy xe máy",
        "Họ đổi suy nghĩ lấy các điểm ảnh pixel",
        "Họ từ bỏ trí thông minh để lấy sự giải trí"
      ],
      correctAnswer: 0,
      explanation: "Garyx highlights the phrase: 'They have traded their autonomy for automation. A little wordplay for the fans, free of charge.'",
      explanationEn: "Garyx highlights the phrase: 'They have traded their autonomy for automation. A little wordplay for the fans, free of charge.'",
      explanationVi: "Garyx nhấn mạnh câu nói: 'Họ đã đánh đổi quyền tự chủ để lấy sự tự động hóa. Một chút chơi chữ dành cho người hâm mộ, hoàn toàn miễn phí.'",
      targetedConcept: "Autonomy vs Automation Wordplay",
      targetedConceptEn: "Autonomy vs Automation Wordplay",
      targetedConceptVi: "Chơi chữ: Tự chủ đối lập Tự động hóa",
      referenceSegmentIndex: 25
    },
    {
      id: "q_mov_ani_11_4",
      question: "Which iconic classical piece accompanies AUTO's entrance, echoing Stanley Kubrick's 2001: A Space Odyssey?",
      questionEn: "Which iconic classical piece accompanies AUTO's entrance, echoing Stanley Kubrick's 2001: A Space Odyssey?",
      questionVi: "Bản nhạc cổ điển biểu tượng nào xuất hiện cùng màn ra mắt của AUTO, gợi nhớ đến bộ phim 2001: A Space Odyssey của Stanley Kubrick?",
      options: [
        "Johann Strauss's 'The Blue Danube'",
        "Beethoven's 'Ode to Joy'",
        "Mozart's 'Requiem'",
        "Vivaldi's 'The Four Seasons'"
      ],
      optionsEn: [
        "Johann Strauss's 'The Blue Danube'",
        "Beethoven's 'Ode to Joy'",
        "Mozart's 'Requiem'",
        "Vivaldi's 'The Four Seasons'"
      ],
      optionsVi: [
        "Bản giao hưởng 'The Blue Danube' của Johann Strauss",
        "Bản 'Ode to Joy' của Beethoven",
        "Bản 'Requiem' của Mozart",
        "Bản 'Bốn mùa' của Vivaldi"
      ],
      correctAnswer: 0,
      explanation: "The Autopilot's entrance features 'The Blue Danube': 'His entrance is accompanied by Johann Strauss's \"The Blue Danube\", a song associated with 2001: A Space Odyssey.'",
      explanationEn: "The Autopilot's entrance features 'The Blue Danube': 'His entrance is accompanied by Johann Strauss's \"The Blue Danube\", a song associated with 2001: A Space Odyssey.'",
      explanationVi: "Màn xuất hiện của Autopilot vang lên giai điệu 'The Blue Danube': 'Màn xuất hiện của hắn được đệm bằng bản nhạc The Blue Danube của Johann Strauss, gắn liền với bộ phim 2001: A Space Odyssey.'",
      targetedConcept: "Cinematic Allusion & Musical Homage",
      targetedConceptEn: "Cinematic Allusion & Musical Homage",
      targetedConceptVi: "Điển tích điện ảnh & Tri ân âm nhạc",
      referenceSegmentIndex: 29
    },
    {
      id: "q_mov_ani_11_5",
      question: "How are WALL-E and EVE metaphorically linked to biblical origins?",
      questionEn: "How are WALL-E and EVE metaphorically linked to biblical origins?",
      questionVi: "WALL-E và EVE được liên kết mang tính ẩn dụ như thế nào với nguồn gốc Kinh thánh?",
      options: [
        "As the Genesis of humanity's rebirth, echoing Adam and Eve repopulating the Earth",
        "As Noah building an ark to withstand an apocalyptic cosmic flood",
        "As Moses leading robots across the Red Sea of trash",
        "As David defeating Goliath through mathematical precision"
      ],
      optionsEn: [
        "As the Genesis of humanity's rebirth, echoing Adam and Eve repopulating the Earth",
        "As Noah building an ark to withstand an apocalyptic cosmic flood",
        "As Moses leading robots across the Red Sea of trash",
        "As David defeating Goliath through mathematical precision"
      ],
      optionsVi: [
        "Như khởi nguyên Sáng Thế (Genesis) cho sự tái sinh của nhân loại, tương tự Adam và Eva gầy dựng lại sự sống trên Trái Đất",
        "Như Noah đóng chiếc thuyền cứu sinh vượt qua trận đại hồng thủy",
        "Như Moses dẫn dắt các robot vượt qua biển đỏ rác thải",
        "Như David đánh bại người khổng lồ Goliath bằng sự chuẩn xác toán học"
      ],
      correctAnswer: 0,
      explanation: "Garyx explains: 'Just as humanity supposedly consists of a line of children descended from Adam and the other one... Wall-E and Eve are the genesis of man's rebirth.'",
      explanationEn: "Garyx explains: 'Just as humanity supposedly consists of a line of children descended from Adam and the other one... Wall-E and Eve are the genesis of man's rebirth.'",
      explanationVi: "Garyx giải thích: 'Cũng như nhân loại bắt nguồn từ dòng dõi con cháu của Adam... Wall-E và Eve chính là khởi nguyên cho sự tái sinh của con người.'",
      targetedConcept: "Biblical Genesis Metaphor",
      targetedConceptEn: "Biblical Genesis Metaphor",
      targetedConceptVi: "Ẩn dụ Sáng Thế Ký",
      referenceSegmentIndex: 33
    },
    {
      id: "q_mov_ani_11_6",
      question: "What philosophical distinction is made in Captain McCrea's defiant declaration to AUTO?",
      questionEn: "What philosophical distinction is made in Captain McCrea's defiant declaration to AUTO?",
      questionVi: "Sự phân định triết học nào được làm nổi bật trong tuyên ngôn bất khuất của Thuyền trưởng McCrea trước AUTO?",
      options: [
        "Rejecting mere passive biological survival in automated comfort in favor of active, meaningful life with self-determination",
        "Arguing that synthetic food on the Axiom lacks sufficient nutritional value",
        "Proving that human captains possess superior mathematical calculation speed compared to robots",
        "Demanding that space cruises extend their itineraries to distant solar systems"
      ],
      optionsEn: [
        "Rejecting mere passive biological survival in automated comfort in favor of active, meaningful life with self-determination",
        "Arguing that synthetic food on the Axiom lacks sufficient nutritional value",
        "Proving that human captains possess superior mathematical calculation speed compared to robots",
        "Demanding that space cruises extend their itineraries to distant solar systems"
      ],
      optionsVi: [
        "Khước từ sự tồn tại sinh học thụ động thuần túy trong tiện nghi tự động hóa để chọn lấy một cuộc sống chủ động, ý nghĩa với quyền tự quyết",
        "Lập luận rằng thức ăn tổng hợp trên tàu Axiom thiếu giá trị dinh dưỡng",
        "Chứng minh rằng thuyền trưởng loài người có tốc độ tính toán số học nhanh hơn robot",
        "Đòi hỏi các chuyến du thuyền vũ trụ phải mở rộng hành trình sang các hệ sao xa xôi"
      ],
      correctAnswer: 0,
      explanation: "Captain McCrea declares 'I don't want to survive! I want to live!', drawing a sharp philosophical line between mere existence without purpose and active, self-determined living.",
      explanationEn: "Captain McCrea declares 'I don't want to survive! I want to live!', drawing a sharp philosophical line between mere existence without purpose and active, self-determined living.",
      explanationVi: "Thuyền trưởng McCrea tuyên bố 'Tôi không muốn chỉ tồn tại lay lắt! Tôi muốn được sống!', vạch ra lằn ranh triết học sắc nét giữa sự tồn tại vô định và cuộc sống tự chủ, có mục đích.",
      targetedConcept: "Surviving vs Living Philosophical Paradigm",
      targetedConceptEn: "Surviving vs Living Philosophical Paradigm",
      targetedConceptVi: "Hệ hình triết học: Tồn tại lay lắt đối lập Sống đích thực",
      referenceSegmentIndex: 45
    },
    {
      id: "q_mov_ani_11_7",
      question: "What physical and intellectual regression have humans suffered after 700 years aboard the Axiom?",
      questionEn: "What physical and intellectual regression have humans suffered after 700 years aboard the Axiom?",
      questionVi: "Loài người đã phải hứng chịu sự thoái hóa thể chất và trí tuệ nào sau 700 năm sống trên tàu Axiom?",
      options: [
        "Centuries of physical and mental atrophy in microgravity have devolved them into overgrown, helpless infants who surrender critical thinking",
        "They developed superhuman cybernetic telepathy through neural implants",
        "They adapted biologically to endure cosmic radiation and walk effortlessly on water",
        "They lost the ability to digest solid food due to genetic engineering experiments"
      ],
      optionsEn: [
        "Centuries of physical and mental atrophy in microgravity have devolved them into overgrown, helpless infants who surrender critical thinking",
        "They developed superhuman cybernetic telepathy through neural implants",
        "They adapted biologically to endure cosmic radiation and walk effortlessly on water",
        "They lost the ability to digest solid food due to genetic engineering experiments"
      ],
      optionsVi: [
        "Hàng thế kỷ teo cơ và thoái hóa trí tuệ trong môi trường vi trọng lực đã biến họ thành những đứa trẻ quá khổ, bất lực và đánh mất tư duy phản biện",
        "Họ phát triển khả năng thần giao cách cảm siêu việt qua các cấy ghép thần kinh",
        "Họ thích nghi sinh học để chịu đựng bức xạ vũ trụ và đi lại dễ dàng trên mặt nước",
        "Họ mất khả năng tiêu hóa thức ăn cứng do các thí nghiệm biến đổi gen"
      ],
      correctAnswer: 0,
      explanation: "The video highlights: 'After centuries of physical and mental atrophy -- plus all that time they spent in space -- humans have devolved into nothing more than overgrown babies.'",
      explanationEn: "The video highlights: 'After centuries of physical and mental atrophy -- plus all that time they spent in space -- humans have devolved into nothing more than overgrown babies.'",
      explanationVi: "Video nhấn mạnh: 'Sau hàng thế kỷ teo cơ và thoái hóa trí tuệ... con người đã thoái hóa thành không gì khác ngoài những đứa trẻ sơ sinh quá khổ.'",
      targetedConcept: "Evolutionary De-evolution & Technological Atrophy",
      targetedConceptEn: "Evolutionary De-evolution & Technological Atrophy",
      targetedConceptVi: "Thoái hóa tiến hóa và sự teo tóp chức năng do công nghệ",
      referenceSegmentIndex: 27
    },
    {
      id: "q_mov_ani_11_8",
      question: "Which classical composition marks the Captain standing on his own feet to reclaim command, and what does it symbolize?",
      questionEn: "Which classical composition marks the Captain standing on his own feet to reclaim command, and what does it symbolize?",
      questionVi: "Tác phẩm cổ điển nào báo hiệu khoảnh khắc Thuyền trưởng tự đứng lên bằng đôi chân để giành lại quyền chỉ huy, và nó biểu trưng cho điều gì?",
      options: [
        "Richard Strauss's 'Also Sprach Zarathustra', symbolizing a monumental leap of evolutionary significance and human awakening",
        "Vivaldi's 'Spring', symbolizing the pleasant climate of orbital space stations",
        "Chopin's 'Nocturne', symbolizing the peaceful sleep cycle of Axiom passengers",
        "Tchaikovsky's '1812 Overture', celebrating corporate industrial manufacturing"
      ],
      optionsEn: [
        "Richard Strauss's 'Also Sprach Zarathustra', symbolizing a monumental leap of evolutionary significance and human awakening",
        "Vivaldi's 'Spring', symbolizing the pleasant climate of orbital space stations",
        "Chopin's 'Nocturne', symbolizing the peaceful sleep cycle of Axiom passengers",
        "Tchaikovsky's '1812 Overture', celebrating corporate industrial manufacturing"
      ],
      optionsVi: [
        "Bản giao hưởng 'Also Sprach Zarathustra' của Richard Strauss, biểu trưng cho bước nhảy vọt có tầm vóc tiến hóa và sự thức tỉnh của nhân loại",
        "Bản 'Mùa xuân' của Vivaldi, biểu trưng cho khí hậu dễ chịu của trạm vũ trụ quỹ đạo",
        "Bản 'Dạ khúc' của Chopin, biểu trưng cho giấc ngủ thanh bình của hành khách tàu Axiom",
        "Bản khúc dạo đầu '1812' của Tchaikovsky, tôn vinh nền sản xuất công nghiệp tập đoàn"
      ],
      correctAnswer: 0,
      explanation: "Just like in Stanley Kubrick's 2001: A Space Odyssey where apes first wield tools, 'Also Sprach Zarathustra' plays when the Captain stands up on his own two feet: 'Both films use the music to indicate a breakthrough of evolutionary significance.'",
      explanationEn: "Just like in Stanley Kubrick's 2001: A Space Odyssey where apes first wield tools, 'Also Sprach Zarathustra' plays when the Captain stands up on his own two feet: 'Both films use the music to indicate a breakthrough of evolutionary significance.'",
      explanationVi: "Tương tự như trong 2001: A Space Odyssey của Kubrick khi loài vượn người lần đầu cầm công cụ, 'Also Sprach Zarathustra' vang lên khi Thuyền trưởng tự đứng dậy: 'Cả hai bộ phim đều dùng âm nhạc để biểu thị một bước đột phá có tầm vóc tiến hóa quan trọng.'",
      targetedConcept: "Evolutionary Breakthrough & Musical Leitmotif",
      targetedConceptEn: "Evolutionary Breakthrough & Musical Leitmotif",
      targetedConceptVi: "Bước đột phá tiến hóa và chủ đề âm nhạc tư tưởng",
      referenceSegmentIndex: 38
    }
  ]
};

const fileContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: WALL-E: Hidden Meaning, Captain McCrea & 'I Want to Live'
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR B2 | American Accent
 * YouTube ID: _Y6jc1mLT-8 (06:37 - 397s)
 * Views: 848,784 | Earthling Cinema (Wisecrack)
 * 
 * BÁM SÁT 100% TIMELINE TOÀN BỘ VIDEO & PHÂN CẢNH ĐỐI ĐẦU CAO TRÀO CAPTAIN MCCREA VS AUTO
 * TIÊU CHUẨN ZERO MERGED UTTERANCES - 50 PURE MASTER SEGMENTS - 8 QUIZ CEFR B2
 * ============================================================================
 */

export const QUIZ_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE: VideoQuizData = ${JSON.stringify(quiz, null, 2)};

export const LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE: MockVideoLesson = {
  id: "mov_ani_11",
  slug: "walle-i-dont-want-to-survive-i-want-to-live",
  title: "WALL-E: Hidden Meaning, Captain McCrea & 'I Want to Live'",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "B2",
  durationFormatted: "06:37",
  durationSeconds: 397,
  externalId: "_Y6jc1mLT-8",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/_Y6jc1mLT-8/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 140,
  viewCount: 848784,
  studyCount: 5890,
  description:
    "Phân tích chiều sâu triết lý và môi trường của kiệt tác WALL-E: Từ thủ pháp phim câm Charlie Chaplin, châm biếm chủ nghĩa tiêu dùng đại chúng, ẩn dụ Sáng Thế Ký Adam & Eve, đến trận đối đầu giữa Thuyền trưởng McCrea và trí tuệ nhân tạo AUTO với tuyên ngôn sống còn: 'Tôi không muốn chỉ tồn tại lay lắt, tôi muốn được thực sự sống!'",
  segments: ${JSON.stringify(segments, null, 2)},
  quiz: QUIZ_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE
};
`;

const outputPath = path.join(__dirname, '../features/listening/data/lessons/movies/animation/lesson_walle.ts');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Successfully written lesson_walle.ts to ${outputPath}!`);
