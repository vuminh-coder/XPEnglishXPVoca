const fs = require('fs');
const path = require('path');

const segments = JSON.parse(fs.readFileSync(path.join(__dirname, 'tangled_pure_segments.json'), 'utf8'));

console.log(`Loaded ${segments.length} segments.`);

const quiz = {
  lessonId: "mov_ani_10",
  lessonTitle: "Tangled: Rapunzel & Flynn Rider Floating Lanterns & I See The Light",
  totalQuestions: 8,
  xpReward: 200,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "q_mov_ani_10_1",
      question: "What does Rapunzel declare to Flynn when he wakes up tied to the chair?",
      questionEn: "What does Rapunzel declare to Flynn when he wakes up tied to the chair?",
      questionVi: "Rapunzel đã tuyên bố điều gì với Flynn khi anh tỉnh dậy và nhận ra mình bị trói vào ghế?",
      options: [
        "Struggling is pointless, and she is not afraid of him",
        "She wants to cut his hair immediately",
        "She expects him to repair the broken tower window",
        "She demands to join his band of thieves"
      ],
      optionsEn: [
        "Struggling is pointless, and she is not afraid of him",
        "She wants to cut his hair immediately",
        "She expects him to repair the broken tower window",
        "She demands to join his band of thieves"
      ],
      optionsVi: [
        "Giãy giụa là vô ích, và cô không hề sợ hãi anh",
        "Cô muốn cắt tóc của anh ngay lập tức",
        "Cô yêu cầu anh sửa lại cửa sổ tháp bị hỏng",
        "Cô đòi gia nhập băng trộm của anh"
      ],
      correctAnswer: 0,
      explanation: "Rapunzel warns Flynn: 'Struggling is pointless... I know why you're here, and I'm not afraid of you.'",
      explanationEn: "Rapunzel warns Flynn: 'Struggling is pointless... I know why you're here, and I'm not afraid of you.'",
      explanationVi: "Rapunzel cảnh báo Flynn: 'Giãy giụa là vô ích... Ta biết tại sao ngươi ở đây và ta không hề sợ ngươi.'",
      targetedConcept: "Pointless Vocabulary in Confrontation",
      targetedConceptEn: "Pointless Vocabulary in Confrontation",
      targetedConceptVi: "Từ vựng 'pointless' trong ngữ cảnh đối đầu",
      referenceSegmentIndex: 2
    },
    {
      id: "q_mov_ani_10_2",
      question: "What item belonging to Flynn has Rapunzel hidden away in the tower?",
      questionEn: "What item belonging to Flynn has Rapunzel hidden away in the tower?",
      questionVi: "Món đồ nào thuộc về Flynn đã bị Rapunzel giấu kỹ trong ngọn tháp?",
      options: [
        "His leather satchel containing the stolen royal crown",
        "His magical wooden bow and arrows",
        "His secret royal identification parchment",
        "His map of the enchanted enchanted kingdom"
      ],
      optionsEn: [
        "His leather satchel containing the stolen royal crown",
        "His magical wooden bow and arrows",
        "His secret royal identification parchment",
        "His map of the enchanted enchanted kingdom"
      ],
      optionsVi: [
        "Chiếc túi da đeo chéo (satchel) chứa vương miện hoàng gia bị đánh cắp",
        "Cung tên ma thuật bằng gỗ của anh",
        "Giấy chứng minh nhân thân hoàng tộc bí mật của anh",
        "Bản đồ vương quốc ma thuật"
      ],
      correctAnswer: 0,
      explanation: "Flynn panics asking 'Where is my satchel?', which Rapunzel previously hid in a cooking pot and then under the stairs.",
      explanationEn: "Flynn panics asking 'Where is my satchel?', which Rapunzel previously hid in a cooking pot and then under the stairs.",
      explanationVi: "Flynn hoảng hốt hỏi 'Chiếc túi satchel của tôi đâu rồi?', thứ mà Rapunzel ban đầu giấu trong chiếc nồi nấu ăn.",
      targetedConcept: "Satchel Definition & Context",
      targetedConceptEn: "Satchel Definition & Context",
      targetedConceptVi: "Định nghĩa và ngữ cảnh từ 'satchel'",
      referenceSegmentIndex: 14
    },
    {
      id: "q_mov_ani_10_3",
      question: "What clarification does Flynn make regarding Rapunzel's magical hair?",
      questionEn: "What clarification does Flynn make regarding Rapunzel's magical hair?",
      questionVi: "Flynn đã làm rõ điều gì về việc anh đối với mái tóc ma thuật của Rapunzel?",
      options: [
        "The only thing he wants to do with her hair is to get out of it literally",
        "He wants to sell it to merchants across the sea",
        "He plans to braid it into climbing ropes",
        "He wants to dye it dark brown"
      ],
      optionsEn: [
        "The only thing he wants to do with her hair is to get out of it literally",
        "He wants to sell it to merchants across the sea",
        "He plans to braid it into climbing ropes",
        "He wants to dye it dark brown"
      ],
      optionsVi: [
        "Điều duy nhất anh muốn làm với mái tóc của cô là thoát ra khỏi nó theo đúng nghĩa đen",
        "Anh muốn bán nó cho các thương lái viễn dương",
        "Anh định tết nó thành dây thừng leo núi",
        "Anh muốn nhuộm nó thành màu nâu sẫm"
      ],
      correctAnswer: 0,
      explanation: "Flynn protests: 'The only thing I want to do with your hair is to get out of it! Literally! Why on earth would I want your hair?'",
      explanationEn: "Flynn protests: 'The only thing I want to do with your hair is to get out of it! Literally! Why on earth would I want your hair?'",
      explanationVi: "Flynn phản bác: 'Điều duy nhất tôi muốn làm với mái tóc của cô là thoát ra khỏi nó! Theo đúng nghĩa đen luôn đấy! Tại sao trên đời tôi lại muốn tóc cô cơ chứ?'",
      targetedConcept: "Literally Usage & Exaggeration",
      targetedConceptEn: "Literally Usage & Exaggeration",
      targetedConceptVi: "Cách dùng từ 'literally' và sắc thái nhấn mạnh",
      referenceSegmentIndex: 20
    },
    {
      id: "q_mov_ani_10_4",
      question: "What terms are agreed upon in Rapunzel's proposed deal?",
      questionEn: "What terms are agreed upon in Rapunzel's proposed deal?",
      questionVi: "Những điều khoản nào được thỏa thuận trong giao kèo mà Rapunzel đưa ra?",
      options: [
        "Flynn must act as her guide to see the lanterns and return her safely, in exchange for his satchel",
        "Flynn must teach her how to swordfight in the forest",
        "Flynn must stay trapped in the tower forever",
        "Flynn must capture Pascal the chameleon"
      ],
      optionsEn: [
        "Flynn must act as her guide to see the lanterns and return her safely, in exchange for his satchel",
        "Flynn must teach her how to swordfight in the forest",
        "Flynn must stay trapped in the tower forever",
        "Flynn must capture Pascal the chameleon"
      ],
      optionsVi: [
        "Flynn phải dẫn đường đưa cô đi xem đèn lồng và hộ tống cô trở về an toàn để đổi lại chiếc túi satchel",
        "Flynn phải dạy cô đấu kiếm trong rừng",
        "Flynn phải ở lại trong tháp mãi mãi",
        "Flynn phải bắt chú tắc kè Pascal"
      ],
      correctAnswer: 0,
      explanation: "Rapunzel establishes: 'You will act as my guide, take me to these lanterns, and return me home safely. Then, and only then, will I return your satchel.'",
      explanationEn: "Rapunzel establishes: 'You will act as my guide, take me to these lanterns, and return me home safely. Then, and only then, will I return your satchel.'",
      explanationVi: "Rapunzel ra điều kiện: 'Ngươi sẽ làm người dẫn đường, đưa ta đi ngắm đèn lồng và đưa ta về an toàn. Khi đó ta mới trả túi cho ngươi.'",
      targetedConcept: "Conditional Bargaining Structures",
      targetedConceptEn: "Conditional Bargaining Structures",
      targetedConceptVi: "Cấu trúc điều kiện và thương lượng",
      referenceSegmentIndex: 32
    },
    {
      id: "q_mov_ani_10_5",
      question: "What expression does Flynn use when attempting to charm Rapunzel into releasing him?",
      questionEn: "What expression does Flynn use when attempting to charm Rapunzel into releasing him?",
      questionVi: "Flynn đã dùng chiêu thức biểu cảm nào khi cố gắng quyến rũ Rapunzel để cô cởi trói cho anh?",
      options: [
        "'The smolder' — a practiced seductive facial look",
        "'The thunder' — an intimidating deep voice",
        "'The whisper' — reciting courtly poetry",
        "'The dazzle' — flashing a gold coin"
      ],
      optionsEn: [
        "'The smolder' — a practiced seductive facial look",
        "'The thunder' — an intimidating deep voice",
        "'The whisper' — reciting courtly poetry",
        "'The dazzle' — flashing a gold coin"
      ],
      optionsVi: [
        "'The smolder' — ánh nhìn nhướn mày quyến rũ thiêu đốt con tim đã qua luyện tập",
        "'The thunder' — giọng nói trầm đe dọa",
        "'The whisper' — ngâm thơ cung đình",
        "'The dazzle' — khoe đồng tiền vàng lấp lánh"
      ],
      correctAnswer: 0,
      explanation: "Flynn announces: 'All right, listen. I didn't want to have to do this, but you leave me no choice. Here comes the smolder.'",
      explanationEn: "Flynn announces: 'All right, listen. I didn't want to have to do this, but you leave me no choice. Here comes the smolder.'",
      explanationVi: "Flynn thốt lên: 'Được rồi, nghe này. Tôi không muốn phải làm thế này đâu, nhưng cô ép tôi đấy nhé. Xuất chiêu the smolder đây!'",
      targetedConcept: "Cultural Idiom & Character Quirk",
      targetedConceptEn: "Cultural Idiom & Character Quirk",
      targetedConceptVi: "Thành ngữ văn hóa và nét tính cách nhân vật",
      referenceSegmentIndex: 42
    },
    {
      id: "q_mov_ani_10_6",
      question: "What linguistic phenomenon is highlighted when Flynn says 'How you doing?'",
      questionEn: "What linguistic phenomenon is highlighted when Flynn says 'How you doing?'",
      questionVi: "Hiện tượng ngôn ngữ nào được làm nổi bật khi Flynn nói câu 'How you doing?'?",
      options: [
        "Elision (dropping the auxiliary verb 'are' in casual speech)",
        "Hyperbole (excessive deliberate exaggeration)",
        "Onomatopoeia (imitating animal sounds)",
        "Passive voice transformation"
      ],
      optionsEn: [
        "Elision (dropping the auxiliary verb 'are' in casual speech)",
        "Hyperbole (excessive deliberate exaggeration)",
        "Onomatopoeia (imitating animal sounds)",
        "Passive voice transformation"
      ],
      optionsVi: [
        "Lược âm Elision (lược bỏ trợ động từ 'are' trong giao tiếp khẩu ngữ tự nhiên)",
        "Nói quá (cường điệu hóa có chủ ý)",
        "Từ tượng thanh (mô phỏng âm thanh tự nhiên)",
        "Chuyển đổi câu bị động"
      ],
      correctAnswer: 0,
      explanation: "The lesson highlights elision in connected speech: 'Americans frequently use informal greetings like \"How you doing?\" where the auxiliary \"are\" is completely omitted.'",
      explanationEn: "The lesson highlights elision in connected speech: 'Americans frequently use informal greetings like \"How you doing?\" where the auxiliary \"are\" is completely omitted.'",
      explanationVi: "Bài học phân tích hiện tượng lược âm (elision) trong tiếng Anh Mỹ khi trợ động từ 'are' được giản lược hoàn toàn trong các câu chào hỏi giao tiếp.",
      targetedConcept: "Connected Speech & Elision",
      targetedConceptEn: "Connected Speech & Elision",
      targetedConceptVi: "Nối âm và hiện tượng lược âm trong giao tiếp",
      referenceSegmentIndex: 46
    },
    {
      id: "q_mov_ani_10_7",
      question: "How does Rapunzel prove her negotiation leverage and moral integrity to Flynn?",
      questionEn: "How does Rapunzel prove her negotiation leverage and moral integrity to Flynn?",
      questionVi: "Rapunzel chứng minh lợi thế đàm phán và phẩm chất danh dự của mình trước Flynn như thế nào?",
      options: [
        "She emphasizes that without her help he will never find the satchel, yet guarantees with an unbreakable promise to return it once the deal is honored",
        "She threatens to alert the royal castle guards surrounding the secluded forest",
        "She offers him a large chest filled with royal gold coins upfront",
        "She casts an ancient mystical spell on the tower entrance"
      ],
      optionsEn: [
        "She emphasizes that without her help he will never find the satchel, yet guarantees with an unbreakable promise to return it once the deal is honored",
        "She threatens to alert the royal castle guards surrounding the secluded forest",
        "She offers him a large chest filled with royal gold coins upfront",
        "She casts an ancient mystical spell on the tower entrance"
      ],
      optionsVi: [
        "Cô nhấn mạnh rằng nếu không có cô thì anh sẽ không bao giờ tìm thấy túi, đồng thời cam kết một lời hứa sắt đá không bao giờ phá vỡ một khi giao kèo hoàn tất",
        "Cô đe dọa sẽ gọi lính gác hoàng gia đang bao vây khu rừng hẻo lánh",
        "Cô tặng trước cho anh một rương đầy tiền vàng hoàng gia",
        "Cô niệm một câu thần chú cổ xưa phong ấn lối vào tòa tháp"
      ],
      correctAnswer: 0,
      explanation: "Rapunzel asserts her leverage by stating Flynn will never find the satchel alone, and seals her commitment with an unbreakable promise: 'And when I promise something, I never, ever break that promise. Ever.'",
      explanationEn: "Rapunzel asserts her leverage by stating Flynn will never find the satchel alone, and seals her commitment with an unbreakable promise: 'And when I promise something, I never, ever break that promise. Ever.'",
      explanationVi: "Rapunzel khẳng định thế mạnh đàm phán khi nêu rõ Flynn sẽ không thể tự tìm ra túi, và củng cố niềm tin bằng lời hứa bất diệt: 'Và khi ta đã hứa điều gì, ta không bao giờ nuốt lời. Không bao giờ.'",
      targetedConcept: "Negotiation Leverage & Integrity Declarations",
      targetedConceptEn: "Negotiation Leverage & Integrity Declarations",
      targetedConceptVi: "Lợi thế đàm phán và tuyên ngôn danh dự trong thương thuyết",
      referenceSegmentIndex: 41
    },
    {
      id: "q_mov_ani_10_8",
      question: "In the climactic song segment 'I See the Light', what emotional and symbolic transformation is expressed through the metaphor of the fog lifting?",
      questionEn: "In the climactic song segment 'I See the Light', what emotional and symbolic transformation is expressed through the metaphor of the fog lifting?",
      questionVi: "Trong phân đoạn bài hát cao trào 'I See the Light', sự chuyển hóa cảm xúc và biểu tượng nào được thể hiện qua phép ẩn dụ sương mù tan biến ('fog has lifted')?",
      options: [
        "A profound sense of clarity and awakening, realizing one's true desires and authentic connection after years of isolation",
        "Physical relief that the boat has navigated out of a literal morning sea mist",
        "Fear of returning to the dark tower now that the lantern festival has ended",
        "Disappointment that dreams in reality differ from expectation"
      ],
      optionsEn: [
        "A profound sense of clarity and awakening, realizing one's true desires and authentic connection after years of isolation",
        "Physical relief that the boat has navigated out of a literal morning sea mist",
        "Fear of returning to the dark tower now that the lantern festival has ended",
        "Disappointment that dreams in reality differ from expectation"
      ],
      optionsVi: [
        "Cảm giác thấu suốt và bừng tỉnh sâu sắc, nhận ra ước nguyện chân thật và sự gắn kết tâm hồn sau nhiều năm cô độc",
        "Sự nhẹ nhõm về mặt thể chất khi con thuyền thoát khỏi màn sương sớm ngoài biển",
        "Nỗi sợ hãi khi phải trở về tòa tháp tăm tối khi lễ hội đèn lồng đã kết thúc",
        "Sự thất vọng khi hiện thực không giống như kỳ vọng ban đầu"
      ],
      correctAnswer: 0,
      explanation: "The lyric 'it's like the fog has lifted' metaphorically captures the revelation of truth, purpose, and emotional freedom that Rapunzel and Flynn experience as their dreams align under the floating lanterns.",
      explanationEn: "The lyric 'it's like the fog has lifted' metaphorically captures the revelation of truth, purpose, and emotional freedom that Rapunzel and Flynn experience as their dreams align under the floating lanterns.",
      explanationVi: "Ca từ 'it's like the fog has lifted' (như thể màn sương đã tan biến) là phép ẩn dụ thể hiện sự khai sáng chân lý, mục đích sống và tự do cảm xúc mà Rapunzel và Flynn cảm nhận được dưới bầu trời đèn lồng lung linh.",
      targetedConcept: "Poetic Metaphor & Character Awakening in Lyrics",
      targetedConceptEn: "Poetic Metaphor & Character Awakening in Lyrics",
      targetedConceptVi: "Phép ẩn dụ thi ca và sự thức tỉnh tâm lý nhân vật qua ca từ",
      referenceSegmentIndex: 49
    }
  ]
};

const fileContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: Tangled: Rapunzel & Flynn Rider Floating Lanterns & I See The Light
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR B1 | American Accent
 * YouTube ID: uQ2rJKiiRiU (20:15 - 1215s)
 * Views: 3,765,078 | Learn English with TV Series
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI PHÂN CẢNH VÀ BÀI GIẢNG VIDEO GỐC
 * PHÂN TÍCH CHUYÊN SÂU TỪ VỰNG, NGỮ ÂM ELISION VÀ TRẮC NGHIỆM SONG NGỮ
 * ============================================================================
 */

export const QUIZ_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT: VideoQuizData = ${JSON.stringify(quiz, null, 2)};

export const LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT: MockVideoLesson = {
  id: "mov_ani_10",
  slug: "tangled-lantern-festival-i-see-the-light",
  title: "Tangled: Rapunzel & Flynn Rider Floating Lanterns & I See The Light",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "B1",
  durationFormatted: "20:15",
  durationSeconds: 1215,
  externalId: "uQ2rJKiiRiU",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/uQ2rJKiiRiU/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 125,
  viewCount: 3765078,
  studyCount: 8920,
  description:
    "Cùng công chúa tóc mây Rapunzel và chàng trộm láu lỉnh Flynn Rider trong Tangled giải mã phân cảnh đối đầu thẩm vấn kinh điển với chiếc chảo rán, kỹ thuật nuốt âm Elision 'How you doing?', biến âm Flapped T và ca khúc bất hủ đoạt đề cử Oscar 'I See The Light'.",
  segments: ${JSON.stringify(segments, null, 2)},
  quiz: QUIZ_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT
};
`;

const outputPath = path.join(__dirname, '../features/listening/data/lessons/movies/animation/lesson_tangled.ts');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Successfully written lesson_tangled.ts to ${outputPath}!`);
