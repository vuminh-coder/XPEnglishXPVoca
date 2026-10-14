const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/lionking_pure_segments.json', 'utf-8'));

// Double check tokenCount
segments.forEach((s) => {
  s.tokenCount = (s.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
});

const quizData = {
  lessonId: "mov_ani_08",
  lessonTitle: "The Lion King: Rafiki, Timon & Pumbaa 'Hakuna Matata & The Past Can Hurt'",
  totalQuestions: 8,
  xpReward: 200,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "q_mov_ani_08_1",
      question: "What rhetorical contrast and metaphor does Mufasa convey regarding the sovereign life cycle of a monarch?",
      questionEn: "What rhetorical contrast and metaphor does Mufasa convey regarding the sovereign life cycle of a monarch?",
      questionVi: "Mufasa truyền tải sự đối lập tu từ và ẩn dụ nào về chu kỳ trị vì của một bậc quân vương?",
      options: [
        "A monarch's reign rises and sets like the cyclical journey of the sun, making mortality part of a sacred generational continuity",
        "A king's authority is permanent and unchanging, completely immune to natural cosmic cycles",
        "A ruler must abandon the Pride Lands whenever dry seasons approach to seek foreign shelter",
        "A monarch derives power exclusively by expanding territory through continuous predator warfare"
      ],
      optionsEn: [
        "A monarch's reign rises and sets like the cyclical journey of the sun, making mortality part of a sacred generational continuity",
        "A king's authority is permanent and unchanging, completely immune to natural cosmic cycles",
        "A ruler must abandon the Pride Lands whenever dry seasons approach to seek foreign shelter",
        "A monarch derives power exclusively by expanding territory through continuous predator warfare"
      ],
      optionsVi: [
        "Thời gian trị vì của một vị vua mọc lên và lặn xuống như hành trình chu kỳ của mặt trời, xem sự hữu hạn là một phần của sự kế tục thiêng liêng",
        "Quyền uy của một vị vua là vĩnh cửu và bất biến, hoàn toàn miễn nhiễm với mọi quy luật tự nhiên của vũ trụ",
        "Một bậc quân vương phải rời bỏ Vùng Đất Kiêu Hãnh mỗi khi mùa khô tới để tìm nơi trú ẩn ngoại bang",
        "Một vị vua tích lũy quyền lực duy nhất thông qua việc bành trướng lãnh thổ qua các cuộc chiến săn mồi liên miên"
      ],
      correctAnswer: 0,
      explanation: "Mufasa uses the solar metaphor 'the sun will set on my time here, and will rise with you as the new king' to illustrate that kingship is bound to nature's cyclical harmony.",
      explanationEn: "Mufasa uses the solar metaphor 'the sun will set on my time here, and will rise with you as the new king' to illustrate that kingship is bound to nature's cyclical harmony.",
      explanationVi: "Mufasa sử dụng hình ảnh ẩn dụ mặt trời 'mặt trời sẽ lặn xuống khép lại thời gian của cha, và mọc lên cùng con như một tân vương' để minh họa rằng vương quyền gắn liền với sự tiếp nối của quy luật tự nhiên.",
      targetedConcept: "Philosophical Metaphor: The Monarch's Solar Cycle",
      targetedConceptEn: "Philosophical Metaphor: The Monarch's Solar Cycle",
      targetedConceptVi: "Ẩn dụ triết học: Chu kỳ mặt trời của bậc quân vương",
      referenceSegmentIndex: 2
    },
    {
      id: "q_mov_ani_08_2",
      question: "Why does Timon initially panic when Pumbaa suggests adopting the young unconscious lion cub?",
      questionEn: "Why does Timon initially panic when Pumbaa suggests adopting the young unconscious lion cub?",
      questionVi: "Tại sao Timon ban đầu lại hoảng sợ khi Pumbaa đề nghị nhận nuôi chú sư tử con đang bất tỉnh?",
      options: [
        "Because lions are apex predators that naturally prey on small mammals like meerkats and warthogs",
        "Because Timon feared the cub carried a contagious tropical desert illness",
        "Because adopting any carnivore required official written permission from the royal baboon",
        "Because the oasis lacked adequate fresh water to hydrate a growing feline predator"
      ],
      optionsEn: [
        "Because lions are apex predators that naturally prey on small mammals like meerkats and warthogs",
        "Because Timon feared the cub carried a contagious tropical desert illness",
        "Because adopting any carnivore required official written permission from the royal baboon",
        "Because the oasis lacked adequate fresh water to hydrate a growing feline predator"
      ],
      optionsVi: [
        "Bởi vì sư tử là loài thú săn mồi đầu bảng vốn tự nhiên săn bắt những động vật nhỏ bé như chồn đất và lợn rừng",
        "Bởi vì Timon sợ chú sư tử con mang một căn bệnh nhiệt đới lây nhiễm nguy hiểm",
        "Bởi vì việc nhận nuôi bất kỳ loài ăn thịt nào đều cần có giấy phép chính thức từ pháp sư khỉ đầu chó",
        "Bởi vì ốc đảo không có đủ nguồn nước ngọt để cung cấp cho một loài thú ăn thịt họ mèo to lớn"
      ],
      correctAnswer: 0,
      explanation: "Timon is terrified because of basic predator-prey biology: 'He's a lion! Lions eat guys like us!', recognizing that a growing carnivore presents mortal danger.",
      explanationEn: "Timon is terrified because of basic predator-prey biology: 'He's a lion! Lions eat guys like us!', recognizing that a growing carnivore presents mortal danger.",
      explanationVi: "Timon khiếp sợ xuất phát từ quy luật sinh học săn mồi: 'Nó là sư tử! Sư tử xơi tái những kẻ như chúng ta!', nhận thức rằng một con thú ăn thịt lớn lên sẽ là mối hiểm họa chết người.",
      targetedConcept: "Ecological Hierarchy & Character Conflict: Predator vs. Prey Dynamics",
      targetedConceptEn: "Ecological Hierarchy & Character Conflict: Predator vs. Prey Dynamics",
      targetedConceptVi: "Thứ bậc sinh thái: Mối quan hệ giữa loài săn mồi và con mồi",
      referenceSegmentIndex: 7
    },
    {
      id: "q_mov_ani_08_3",
      question: "What opportunistic shift in strategy convinces Timon to keep Simba as an ally?",
      questionEn: "What opportunistic shift in strategy convinces Timon to keep Simba as an ally?",
      questionVi: "Sự thay đổi chiến lược đầy cơ hội nào đã thuyết phục Timon giữ Simba lại làm đồng minh?",
      options: [
        "He realizes that having a loyal apex predator on their side guarantees protection against any dangerous bullies in the jungle",
        "He intends to trade the lion cub to nearby hyenas in exchange for prime fruit harvesting territory",
        "He discovers the cub has magical healing abilities that can prolong a meerkat's lifespan",
        "He wants Simba to carry heavy loads of firewood across the desert gorge"
      ],
      optionsEn: [
        "He realizes that having a loyal apex predator on their side guarantees protection against any dangerous bullies in the jungle",
        "He intends to trade the lion cub to nearby hyenas in exchange for prime fruit harvesting territory",
        "He discovers the cub has magical healing abilities that can prolong a meerkat's lifespan",
        "He wants Simba to carry heavy loads of firewood across the desert gorge"
      ],
      optionsVi: [
        "Anh nhận ra rằng có một loài săn mồi đầu bảng trung thành về phe mình sẽ đảm bảo sự an toàn trước mọi kẻ bắt nạt trong rừng",
        "Anh dự định đổi chú sư tử con cho đàn linh cẩu lân cận để lấy vùng đất thu hoạch trái cây trù phú",
        "Anh phát hiện chú sư tử con có năng lực chữa lành thần kỳ giúp kéo dài tuổi thọ loài chồn",
        "Anh muốn Simba mang vác củi nặng qua hẻm núi sa mạc giúp mình"
      ],
      correctAnswer: 0,
      explanation: "Timon pivots from terror to self-serving pragmatism: 'If he's with us, who's gonna mess with us?', realizing a lion offers unrivaled bodyguard deterrence.",
      explanationEn: "Timon pivots from terror to self-serving pragmatism: 'If he's with us, who's gonna mess with us?', realizing a lion offers unrivaled bodyguard deterrence.",
      explanationVi: "Timon chuyển hướng thực dụng nhanh chóng: 'Nếu nó ở cùng phe với ta, thì ai dám đụng đến chúng ta nữa?', nhận ra rằng có một con sư tử làm vệ sĩ sẽ ngăn chặn mọi kẻ thù.",
      targetedConcept: "Pragmatic Reasoning: Having an Apex Predator on Your Side",
      targetedConceptEn: "Pragmatic Reasoning: Having an Apex Predator on Your Side",
      targetedConceptVi: "Tư duy thực dụng: Lợi thế bảo hộ từ động vật ăn thịt đầu bảng",
      referenceSegmentIndex: 13
    },
    {
      id: "q_mov_ani_08_4",
      question: "What comedic misunderstanding occurs when Pumbaa observes that Simba 'looks blue'?",
      questionEn: "What comedic misunderstanding occurs when Pumbaa observes that Simba 'looks blue'?",
      questionVi: "Hiểu lầm hài hước nào xuất hiện khi Pumbaa quan sát thấy Simba 'looks blue'?",
      options: [
        "Timon interprets 'blue' literally as Simba's physical fur pigmentation ('brownish-gold'), missing the idiomatic meaning of emotional sadness",
        "Pumbaa mistakenly thinks Simba fell into a deep pool of blue mineral paint",
        "Timon assumes Simba is suffocating from lack of oxygen due to desert heat exhaustion",
        "Pumbaa confuses the word 'blue' with royal bloodlines traditionally associated with monarchy"
      ],
      optionsEn: [
        "Timon interprets 'blue' literally as Simba's physical fur pigmentation ('brownish-gold'), missing the idiomatic meaning of emotional sadness",
        "Pumbaa mistakenly thinks Simba fell into a deep pool of blue mineral paint",
        "Timon assumes Simba is suffocating from lack of oxygen due to desert heat exhaustion",
        "Pumbaa confuses the word 'blue' with royal bloodlines traditionally associated with monarchy"
      ],
      optionsVi: [
        "Timon hiểu từ 'blue' theo nghĩa đen màu sắc lông của Simba ('nâu vàng'), bỏ qua ý nghĩa thành ngữ chỉ nỗi buồn rầu",
        "Pumbaa nghĩ nhầm rằng Simba đã ngã vào một hố sơn khoáng sản màu xanh lam",
        "Timon suy đoán Simba đang nghẹt thở vì thiếu oxy do kiệt sức dưới cái nắng sa mạc",
        "Pumbaa nhầm lẫn từ 'blue' với dòng dõi quý tộc hoàng gia thường được ví là 'dòng máu xanh'"
      ],
      correctAnswer: 0,
      explanation: "While Pumbaa observes Simba's depression using the idiom 'looks blue', Timon pedantically corrects him with physical color: 'I'd say brownish-gold.'",
      explanationEn: "While Pumbaa observes Simba's depression using the idiom 'looks blue', Timon pedantically corrects him with physical color: 'I'd say brownish-gold.'",
      explanationVi: "Trong khi Pumbaa chỉ tâm trạng u uất bằng thành ngữ 'looks blue', Timon lại máy móc bắt bẻ màu lông vật lý của Simba: 'Tớ thì thấy nó màu nâu vàng óng cơ.'",
      targetedConcept: "Idiom vs. Literal Color: The Idiom 'Look Blue'",
      targetedConceptEn: "Idiom vs. Literal Color: The Idiom 'Look Blue'",
      targetedConceptVi: "Thành ngữ và nghĩa đen: Thành ngữ tâm trạng 'Look Blue'",
      referenceSegmentIndex: 26
    },
    {
      id: "q_mov_ani_08_5",
      question: "Why does Timon find Pumbaa's question 'What's eating you?' so hilarious in Simba's context?",
      questionEn: "Why does Timon find Pumbaa's question 'What's eating you?' so hilarious in Simba's context?",
      questionVi: "Tại sao Timon lại thấy câu hỏi 'What's eating you?' của Pumbaa buồn cười đến thế trong ngữ cảnh của Simba?",
      options: [
        "Because as a lion, Simba sits at the apex of the food chain, meaning no other animal could literally eat him",
        "Because Simba had just finished eating an enormous desert melon right before collapsing",
        "Because Pumbaa pronounced the idiom with an incorrect Swahili dialect",
        "Because Timon was currently preparing a gourmet beetle salad for lunch"
      ],
      optionsEn: [
        "Because as a lion, Simba sits at the apex of the food chain, meaning no other animal could literally eat him",
        "Because Simba had just finished eating an enormous desert melon right before collapsing",
        "Because Pumbaa pronounced the idiom with an incorrect Swahili dialect",
        "Because Timon was currently preparing a gourmet beetle salad for lunch"
      ],
      optionsVi: [
        "Bởi vì là một con sư tử, Simba đứng trên đỉnh chuỗi thức ăn, nghĩa là không loài động vật nào có thể ăn thịt được cậu ta",
        "Bởi vì Simba vừa chén xong một quả dưa sa mạc khổng lồ trước khi ngất xỉu",
        "Bởi vì Pumbaa đã phát âm thành ngữ đó bằng một phương ngữ tiếng Swahili không chuẩn",
        "Bởi vì Timon lúc đó đang bận chuẩn bị món gỏi bọ cánh cứng hảo hạng cho bữa trưa"
      ],
      correctAnswer: 0,
      explanation: "Timon laughs because 'What's eating you?' (What is bothering you?) creates a double meaning: lions are at the top of the food chain, so nothing literally eats them.",
      explanationEn: "Timon laughs because 'What's eating you?' (What is bothering you?) creates a double meaning: lions are at the top of the food chain, so nothing literally eats them.",
      explanationVi: "Timon cười khoái trá vì 'What's eating you?' (Điều gì làm phiền lòng nhóc?) tạo ra lối chơi chữ hai nghĩa: sư tử đứng đầu chuỗi thức ăn, chẳng loài nào ăn thịt được nó.",
      targetedConcept: "Double Entendre & Wordplay: 'What's Eating You' & Food Chain",
      targetedConceptEn: "Double Entendre & Wordplay: 'What's Eating You' & Food Chain",
      targetedConceptVi: "Nghệ thuật chơi chữ song hành: 'What's Eating You' & Chuỗi thức ăn",
      referenceSegmentIndex: 29
    },
    {
      id: "q_mov_ani_08_6",
      question: "What grammatical and comedic error (malapropism) does Pumbaa commit when quoting Timon's life advice?",
      questionEn: "What grammatical and comedic error (malapropism) does Pumbaa commit when quoting Timon's life advice?",
      questionVi: "Pumbaa phạm lỗi ngữ pháp và ngôn từ hài hước (hiểu sai từ) nào khi trích dẫn lời khuyên cuộc sống của Timon?",
      options: [
        "He confuses the preposition 'behind' with the informal noun 'behind' (buttocks), saying 'put your behind in your past' instead of 'put your past behind you'",
        "He confuses the past tense verb 'went' with the present continuous participle 'going'",
        "He accidentally substitutes the word 'future' for 'destiny' when addressing Simba",
        "He uses double negatives that invert the intended philosophical meaning of Timon's guidance"
      ],
      optionsEn: [
        "He confuses the preposition 'behind' with the informal noun 'behind' (buttocks), saying 'put your behind in your past' instead of 'put your past behind you'",
        "He confuses the past tense verb 'went' with the present continuous participle 'going'",
        "He accidentally substitutes the word 'future' for 'destiny' when addressing Simba",
        "He uses double negatives that invert the intended philosophical meaning of Timon's guidance"
      ],
      optionsVi: [
        "Anh nhầm lẫn giới từ 'behind' với danh từ khẩu ngữ 'behind' (cái mông), nói nhầm thành 'đặt cái mông vào quá khứ' thay vì 'để quá khứ lại phía sau'",
        "Anh nhầm động từ quá khứ 'went' với phân từ tiếp diễn 'going'",
        "Anh vô tình thay thế từ 'future' thành 'destiny' khi trò chuyện cùng Simba",
        "Anh sử dụng cấu trúc phủ định kép làm đảo ngược hoàn toàn ý nghĩa triết lý của Timon"
      ],
      correctAnswer: 0,
      explanation: "Pumbaa butchers the idiom 'put your past behind you' by turning the preposition into the anatomical noun 'behind' (buttocks), provoking Timon's exasperation.",
      explanationEn: "Pumbaa butchers the idiom 'put your past behind you' by turning the preposition into the anatomical noun 'behind' (buttocks), provoking Timon's exasperation.",
      explanationVi: "Pumbaa biến tấu nhầm thành ngữ 'put your past behind you' bằng cách biến giới từ thành danh từ giải phẫu 'behind' (cái mông), khiến Timon phát cáu.",
      targetedConcept: "Linguistic Malapropism: 'Put Your Behind in Your Past'",
      targetedConceptEn: "Linguistic Malapropism: 'Put Your Behind in Your Past'",
      targetedConceptVi: "Lỗi chơi chữ nhầm từ (Malapropism): Đặt bàn tọa vào quá khứ",
      referenceSegmentIndex: 30
    },
    {
      id: "q_mov_ani_08_7",
      question: "What radical existential philosophy does Timon advocate when teaching Simba to cope with adversity?",
      questionEn: "What radical existential philosophy does Timon advocate when teaching Simba to cope with adversity?",
      questionVi: "Timon ủng hộ triết lý nhân sinh cấp tiến nào khi dạy Simba đối phó với nghịch cảnh?",
      options: [
        "When the world turns its back on you, retaliate by turning your back on the world and living completely carefree without guilt",
        "Always seek forgiveness from family elders through solemn ritual meditation",
        "Return immediately to face all accusers in an honorable judicial trial",
        "Accumulate material wealth and fortify physical borders against rivals"
      ],
      optionsEn: [
        "When the world turns its back on you, retaliate by turning your back on the world and living completely carefree without guilt",
        "Always seek forgiveness from family elders through solemn ritual meditation",
        "Return immediately to face all accusers in an honorable judicial trial",
        "Accumulate material wealth and fortify physical borders against rivals"
      ],
      optionsVi: [
        "Khi cả thế giới quay lưng lại với bạn, hãy đáp trả bằng cách quay lưng lại với cả thế giới và sống vô ưu vô lo không gánh nặng tội lỗi",
        "Luôn tìm kiếm sự tha thứ từ các bậc tiền bối trong dòng tộc thông qua nghi thức thiền định trang nghiêm",
        "Lập tức quay trở về đối diện với mọi kẻ cáo buộc trong một phiên tòa xét xử danh dự",
        "Tích lũy của cải vật chất và củng cố ranh giới lãnh thổ kiên cố chống lại các đối thủ"
      ],
      correctAnswer: 0,
      explanation: "Timon preaches active escapism: 'When the world turns its back on you, you turn your back on the world!', introducing Hakuna Matata as emotional defense.",
      explanationEn: "Timon preaches active escapism: 'When the world turns its back on you, you turn your back on the world!', introducing Hakuna Matata as emotional defense.",
      explanationVi: "Timon rao giảng triết lý trốn chạy thực tế: 'Khi cả thế giới quay lưng lại với nhóc, nhóc hãy quay lưng lại với thế giới!', giới thiệu Hakuna Matata như một cơ chế phòng vệ tâm lý.",
      targetedConcept: "Escapist Coping Mechanism: Turning Your Back on the World",
      targetedConceptEn: "Escapist Coping Mechanism: Turning Your Back on the World",
      targetedConceptVi: "Cơ chế phòng vệ trốn chạy: Quay lưng lại với thế giới",
      referenceSegmentIndex: 35
    },
    {
      id: "q_mov_ani_08_8",
      question: "What profound epistemological lesson about trauma and growth does Rafiki's iconic wisdom offer?",
      questionEn: "What profound epistemological lesson about trauma and growth does Rafiki's iconic wisdom offer?",
      questionVi: "Bài học nhận thức sâu sắc nào về tổn thương và sự trưởng thành được đúc kết từ triết lý kinh điển của Rafiki?",
      options: [
        "While the past can be painful, one must choose not to flee from painful memories but to actively learn from them and mature",
        "Past mistakes should be permanently erased and forgotten through complete isolation",
        "Physical retribution against past tormentors is the only valid way to restore emotional equilibrium",
        "Fate is strictly predetermined, making any personal attempt to learn from history irrelevant"
      ],
      optionsEn: [
        "While the past can be painful, one must choose not to flee from painful memories but to actively learn from them and mature",
        "Past mistakes should be permanently erased and forgotten through complete isolation",
        "Physical retribution against past tormentors is the only valid way to restore emotional equilibrium",
        "Fate is strictly predetermined, making any personal attempt to learn from history irrelevant"
      ],
      optionsVi: [
        "Dù quá khứ có đau thương, ta cần chọn không trốn chạy nỗi đau mà phải chủ động học hỏi vươn lên từ nó để trưởng thành",
        "Những sai lầm trong quá khứ cần phải bị xóa bỏ và lãng quên vĩnh viễn thông qua việc cô lập bản thân",
        "Sự trả thù vật lý nhắm vào những kẻ hành hạ trong quá khứ là cách duy nhất để lấy lại sự cân bằng cảm xúc",
        "Số phận là điều được định đoạt từ trước, khiến mọi nỗ lực học hỏi từ lịch sử trở nên vô nghĩa"
      ],
      correctAnswer: 0,
      explanation: "Rafiki teaches that trauma cannot be altered, but one's response defines character: 'The past can hurt. But the way I see it, you can either run from it, or learn from it.'",
      explanationEn: "Rafiki teaches that trauma cannot be altered, but one's response defines character: 'The past can hurt. But the way I see it, you can either run from it, or learn from it.'",
      explanationVi: "Rafiki chỉ ra rằng tổn thương quá khứ không thể thay đổi, nhưng thái độ đón nhận sẽ quyết định nhân cách: 'Quá khứ có thể làm con đau. Nhưng theo cách ta nhìn nhận, con có thể trốn chạy nó, hoặc học hỏi từ nó.'",
      targetedConcept: "Growth Mindset vs. Avoidance: Run from It or Learn from It",
      targetedConceptEn: "Growth Mindset vs. Avoidance: Run from It or Learn from It",
      targetedConceptVi: "Tư duy phát triển đối lập Trốn tránh: Học hỏi từ nỗi đau quá khứ",
      referenceSegmentIndex: 49
    }
  ]
};

const lessonContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: The Lion King: Rafiki, Timon & Pumbaa 'Hakuna Matata & The Past Can Hurt'
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR A2 | African / British / American
 * YouTube ID: HeQTJE99OXo (24:04 - 1444s)
 * Views: 1,453,059 | Likes: High Engagement | RealLife English & Disney
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (00:00 - 24:04)
 * TIÊU CHUẨN ZERO MERGED UTTERANCES - 50 MASTER SEGMENTS - 8 QUIZ CEFR B2
 * ============================================================================
 */

export const QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST: VideoQuizData = ${JSON.stringify(quizData, null, 2)};

export const LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST: MockVideoLesson = {
  id: "mov_ani_08",
  slug: "the-lion-king-rafiki-teaches-simba-the-past",
  title: "The Lion King: Rafiki, Timon & Pumbaa 'Hakuna Matata & The Past Can Hurt'",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "A2",
  durationFormatted: "24:04",
  durationSeconds: 1444,
  externalId: "HeQTJE99OXo",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/HeQTJE99OXo/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 125,
  viewCount: 1453059,
  studyCount: 7120,
  description:
    "Khám phá triết lý sống bất hủ Hakuna Matata cùng bộ đôi Timon & Pumbaa, nghệ thuật chơi chữ dí dỏm, và bài học sâu sắc từ pháp sư Rafiki: 'The past can hurt, but you can either run from it, or learn from it.'",
  segments: ${JSON.stringify(segments, null, 4)},
  quiz: QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST,
};

export default LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST;
`;

fs.writeFileSync('features/listening/data/lessons/movies/animation/lesson_the_lion_king.ts', lessonContent, 'utf-8');
console.log('Successfully wrote features/listening/data/lessons/movies/animation/lesson_the_lion_king.ts!');
