const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/dory_pure_segments.json', 'utf-8'));

// Double check tokenCount
segments.forEach((s) => {
  s.tokenCount = (s.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
});

const quizData = {
  lessonId: "mov_ani_09",
  lessonTitle: "Finding Dory: Dory & Marlin 'Just Keep Swimming' Best Scenes",
  totalQuestions: 8,
  xpReward: 200,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "q_mov_ani_09_1",
      question: "What psychological mechanism and resilience strategy does Dory's iconic catchphrase 'Just keep swimming' represent?",
      questionEn: "What psychological mechanism and resilience strategy does Dory's iconic catchphrase 'Just keep swimming' represent?",
      questionVi: "Khẩu hiệu biểu tượng 'Just keep swimming' của Dory đại diện cho cơ chế tâm lý và chiến lược vượt khó nào?",
      options: [
        "An unyielding coping philosophy that encourages persistent forward momentum whenever confronted with emotional or physical adversity",
        "A rigorous physical conditioning drill designed for competitive long-distance aquatic athletes",
        "A rigid navigation protocol to avoid dangerous deep-sea thermal vents",
        "A playful denial technique that ignores all environmental warning signs in unfamiliar waters"
      ],
      optionsEn: [
        "An unyielding coping philosophy that encourages persistent forward momentum whenever confronted with emotional or physical adversity",
        "A rigorous physical conditioning drill designed for competitive long-distance aquatic athletes",
        "A rigid navigation protocol to avoid dangerous deep-sea thermal vents",
        "A playful denial technique that ignores all environmental warning signs in unfamiliar waters"
      ],
      optionsVi: [
        "Triết lý ứng phó kiên cường khuyến khích luôn tiến về phía trước mỗi khi đối mặt với nghịch cảnh tinh thần hay thể xác",
        "Bài tập rèn luyện thể lực khắc nghiệt dành cho các vận động viên bơi lội đường dài thi đấu",
        "Quy chuẩn điều hướng nghiêm ngặt nhằm tránh các miệng phun nhiệt nguy hiểm dưới đáy biển sâu",
        "Kỹ thuật chối bỏ vô tư lự phớt lờ mọi dấu hiệu cảnh báo môi trường tại các vùng nước lạ"
      ],
      correctAnswer: 0,
      explanation: "Dory's signature melody 'When life gets you down, you know what you gotta do? Just keep swimming!' teaches enduring perseverance and emotional optimism.",
      explanationEn: "Dory's signature melody 'When life gets you down, you know what you gotta do? Just keep swimming!' teaches enduring perseverance and emotional optimism.",
      explanationVi: "Giai điệu biểu tượng của Dory 'Khi cuộc đời dìm bạn xuống, bạn biết phải làm gì rồi chứ? Cứ việc bơi tiếp đi!' truyền dạy bài học kiên trì bền bỉ và sự lạc quan vượt khó.",
      targetedConcept: "Iconic Catchphrase & Resilience: Just Keep Swimming",
      targetedConceptEn: "Iconic Catchphrase & Resilience: Just Keep Swimming",
      targetedConceptVi: "Khẩu hiệu biểu tượng & Nghị lực kiên cường: Cứ việc bơi tiếp",
      referenceSegmentIndex: 3
    },
    {
      id: "q_mov_ani_09_2",
      question: "How does Dory describe her cognitive disability when introducing herself throughout her life?",
      questionEn: "How does Dory describe her cognitive disability when introducing herself throughout her life?",
      questionVi: "Dory miêu tả khiếm khuyết nhận thức của mình như thế nào khi tự giới thiệu bản thân trong suốt cuộc đời?",
      options: [
        "She candidly explains that she suffers from short-term memory loss, which she humorously suspects runs in her family",
        "She claims to possess photographic total recall except for proper geographical nouns",
        "She tells strangers that her amnesia was induced by an accidental electric stingray shock",
        "She pretends to be completely bilingual in whale speech to disguise her forgetfulness"
      ],
      optionsEn: [
        "She candidly explains that she suffers from short-term memory loss, which she humorously suspects runs in her family",
        "She claims to possess photographic total recall except for proper geographical nouns",
        "She tells strangers that her amnesia was induced by an accidental electric stingray shock",
        "She pretends to be completely bilingual in whale speech to disguise her forgetfulness"
      ],
      optionsVi: [
        "Cô thẳng thắn giải thích rằng mình mắc chứng mất trí nhớ ngắn hạn, và hài hước phỏng đoán bệnh này di truyền trong gia đình",
        "Cô tuyên bố mình có trí nhớ siêu phàm ngoại trừ các danh từ riêng địa lý",
        "Cô nói với người lạ rằng chứng hay quên của mình do bị cá đuối điện giật trúng",
        "Cô giả vờ thông thạo tiếng cá voi để ngụy trang cho tính hay quên của mình"
      ],
      correctAnswer: 0,
      explanation: "Dory repeatedly introduces herself with honesty: 'Hi, I'm Dory. I suffer from short-term memory loss. It runs in my family... At least I think it does.'",
      explanationEn: "Dory repeatedly introduces herself with honesty: 'Hi, I'm Dory. I suffer from short-term memory loss. It runs in my family... At least I think it does.'",
      explanationVi: "Dory luôn chân thành tự giới thiệu: 'Xin chào, tôi là Dory. Tôi mắc chứng mất trí nhớ ngắn hạn. Nó di truyền trong gia đình tôi... Ít nhất là tôi nghĩ thế.'",
      targetedConcept: "Pathological Memory Impairment: Short-Term Memory Loss",
      targetedConceptEn: "Pathological Memory Impairment: Short-Term Memory Loss",
      targetedConceptVi: "Khiếm khuyết nhận thức: Chứng mất trí nhớ ngắn hạn",
      referenceSegmentIndex: 0
    },
    {
      id: "q_mov_ani_09_3",
      question: "Why does Hank the octopus refer to himself specifically as a 'septopus'?",
      questionEn: "Why does Hank the octopus refer to himself specifically as a 'septopus'?",
      questionVi: "Tại sao chú bạch tuộc Hank lại tự gọi mình một cách đặc biệt là 'septopus'?",
      options: [
        "Because he suffered an injury that cost him one tentacle, leaving him with exactly seven functional arms",
        "Because he belongs to an exclusive ancient sub-species native only to Cleveland, Ohio",
        "Because seven of his limbs are camouflaged while the eighth is permanently red",
        "Because he underwent seven separate surgical rehabilitation procedures at the institute"
      ],
      optionsEn: [
        "Because he suffered an injury that cost him one tentacle, leaving him with exactly seven functional arms",
        "Because he belongs to an exclusive ancient sub-species native only to Cleveland, Ohio",
        "Because seven of his limbs are camouflaged while the eighth is permanently red",
        "Because he underwent seven separate surgical rehabilitation procedures at the institute"
      ],
      optionsVi: [
        "Bởi vì anh từng bị tai nạn mất đi một chiếc xúc tu, khiến cơ thể chỉ còn lại đúng bảy xúc tu hoạt động",
        "Bởi vì anh thuộc về một phân loài cổ xưa độc nhất chỉ có ở Cleveland, Ohio",
        "Bởi vì bảy chiếc chi của anh ngụy trang được trong khi chi thứ tám luôn giữ màu đỏ",
        "Bởi vì anh đã trải qua bảy ca phẫu thuật phục hồi chức năng riêng biệt tại viện nghiên cứu"
      ],
      correctAnswer: 0,
      explanation: "Hank explains his moniker through basic wordplay: 'I am a septopus. I lost an arm, so that makes seven' (combining the prefix sept- for seven with octopus).",
      explanationEn: "Hank explains his moniker through basic wordplay: 'I am a septopus. I lost an arm, so that makes seven' (combining the prefix sept- for seven with octopus).",
      explanationVi: "Hank giải thích biệt danh bằng lối chơi chữ đơn giản: 'Tôi là bạch tuộc bảy chi (septopus). Tôi mất một chi, nên chỉ còn lại bảy' (kết hợp tiền tố sept- số 7 với octopus).",
      targetedConcept: "Anatomical & Linguistic Innovation: The Concept of a 'Septopus'",
      targetedConceptEn: "Anatomical & Linguistic Innovation: The Concept of a 'Septopus'",
      targetedConceptVi: "Sáng tạo ngôn từ & Giải phẫu: Khái niệm bạch tuộc bảy chi 'Septopus'",
      referenceSegmentIndex: 14
    },
    {
      id: "q_mov_ani_09_4",
      question: "What motivation drives Hank to agree to help Dory navigate the Marine Life Institute?",
      questionEn: "What motivation drives Hank to agree to help Dory navigate the Marine Life Institute?",
      questionVi: "Động lực nào thôi thúc Hank đồng ý giúp Dory tìm đường trong Viện Sinh vật Biển?",
      options: [
        "He desperately wants her orange quarantine tag so he can be transferred to an isolated aquarium in Cleveland away from human interaction",
        "He feels profound empathy because his own parents were blue tang fish who vanished",
        "He was promised a lifetime supply of gourmet sea clams by the facility's chief biologist",
        "He needs her to translate complex scientific English manuals posted on quarantine tanks"
      ],
      optionsEn: [
        "He desperately wants her orange quarantine tag so he can be transferred to an isolated aquarium in Cleveland away from human interaction",
        "He feels profound empathy because his own parents were blue tang fish who vanished",
        "He was promised a lifetime supply of gourmet sea clams by the facility's chief biologist",
        "He needs her to translate complex scientific English manuals posted on quarantine tanks"
      ],
      optionsVi: [
        "Anh tha thiết muốn có chiếc thẻ cách ly màu cam của Dory để được chuyển đến thủy cung cô lập ở Cleveland tránh xa con người",
        "Anh cảm thấy đồng cảm sâu sắc vì cha mẹ mình cũng là cá đuôi gai xanh bị thất lạc",
        "Anh được hứa hẹn cung cấp sò biển hảo hạng suốt đời bởi nhà sinh vật học trưởng",
        "Anh cần cô dịch các hướng dẫn khoa học tiếng Anh phức tạp dán trên các bể cách ly"
      ],
      correctAnswer: 0,
      explanation: "Hank views Dory's orange tag as his 'ticket out of here': a pass to transfer permanently to a safe, quiet aquarium in Cleveland rather than returning to the ocean.",
      explanationEn: "Hank views Dory's orange tag as his 'ticket out of here': a pass to transfer permanently to a safe, quiet aquarium in Cleveland rather than returning to the ocean.",
      explanationVi: "Hank coi chiếc thẻ cam của Dory là 'tấm vé thoát thân': cơ hội chuyển vĩnh viễn đến thủy cung tĩnh lặng ở Cleveland thay vì bị thả về đại dương.",
      targetedConcept: "Transactional Exchange & Motivation: The Orange Quarantine Tag",
      targetedConceptEn: "Transactional Exchange & Motivation: The Orange Quarantine Tag",
      targetedConceptVi: "Giao dịch và động lực nhân vật: Chiếc thẻ cách ly màu cam",
      referenceSegmentIndex: 17
    },
    {
      id: "q_mov_ani_09_5",
      question: "How does Bailey the beluga whale overcome his psychosomatic insecurity regarding his echolocation abilities?",
      questionEn: "How does Bailey the beluga whale overcome his psychosomatic insecurity regarding his echolocation abilities?",
      questionVi: "Chú cá voi trắng Bailey đã vượt qua sự tự ti tâm lý về khả năng định vị sóng âm của mình như thế nào?",
      options: [
        "Encouraged by Destiny, he focuses his acoustic sonar, discovering he can see through solid walls and guide Dory through the pipes",
        "He receives an experimental surgical implant installed by human marine veterinary doctors",
        "He listens to recorded classical music played through the institute's underwater sound system",
        "He swallows a special fluorescent jellyfish that amplifies his cranial acoustic resonance"
      ],
      optionsEn: [
        "Encouraged by Destiny, he focuses his acoustic sonar, discovering he can see through solid walls and guide Dory through the pipes",
        "He receives an experimental surgical implant installed by human marine veterinary doctors",
        "He listens to recorded classical music played through the institute's underwater sound system",
        "He swallows a special fluorescent jellyfish that amplifies his cranial acoustic resonance"
      ],
      optionsVi: [
        "Được Destiny khích lệ, anh tập trung kích hoạt sóng âm sonar, phát hiện mình có thể nhìn xuyên tường và dẫn đường cho Dory qua hệ thống ống",
        "Anh được cấy ghép thiết bị phẫu thuật thử nghiệm bởi các bác sĩ thú y biển",
        "Anh lắng nghe âm nhạc cổ điển phát qua hệ thống âm thanh dưới nước của viện",
        "Anh nuốt một con sứa phát quang đặc biệt giúp khuếch đại độ cộng hưởng âm thanh hộp sọ"
      ],
      correctAnswer: 0,
      explanation: "Destiny encourages Bailey to believe in his sonar; once he unlocks his echolocation ('The glasses are off!'), he maps out the entire pipeline network effortlessly.",
      explanationEn: "Destiny encourages Bailey to believe in his sonar; once he unlocks his echolocation ('The glasses are off!'), he maps out the entire pipeline network effortlessly.",
      explanationVi: "Destiny động viên Bailey tin vào sóng âm của mình; khi khai mở định vị sóng âm ('Kính đã tháo ra rồi!'), anh dễ dàng vẽ sơ đồ toàn bộ mạng lưới đường ống để cứu Dory.",
      targetedConcept: "Sensory Adaptation: Bailey's Echolocation & 'The World's Most Powerful Glasses'",
      targetedConceptEn: "Sensory Adaptation: Bailey's Echolocation & 'The World's Most Powerful Glasses'",
      targetedConceptVi: "Thích nghi giác quan: Định vị sóng âm của Bailey & Cặp kính quyền năng",
      referenceSegmentIndex: 33
    },
    {
      id: "q_mov_ani_09_6",
      question: "What touching method did Charlie and Jenny invent to guide Dory back home despite her memory loss?",
      questionEn: "What touching method did Charlie and Jenny invent to guide Dory back home despite her memory loss?",
      questionVi: "Phương pháp cảm động nào mà Charlie và Jenny đã dày công tạo ra để dẫn lối cho Dory trở về nhà dù cô bị mất trí nhớ?",
      options: [
        "They spent years persistently laying out radiating paths of purple seashells across the seafloor so she could always trace her way home",
        "They carved elaborate directional arrows into the coral reef using razor clams",
        "They broadcast recorded audio songs across the California coastal acoustic network",
        "They trained schools of bioluminescent squid to illuminate the entrance to their reef cave"
      ],
      optionsEn: [
        "They spent years persistently laying out radiating paths of purple seashells across the seafloor so she could always trace her way home",
        "They carved elaborate directional arrows into the coral reef using razor clams",
        "They broadcast recorded audio songs across the California coastal acoustic network",
        "They trained schools of bioluminescent squid to illuminate the entrance to their reef cave"
      ],
      optionsVi: [
        "Họ kiên trì rải những vệt vỏ sò tím tỏa ra khắp đáy biển suốt nhiều năm để Dory luôn có thể lần theo dấu vết về nhà",
        "Họ khắc những mũi tên chỉ hướng tinh xảo lên rạn san hô bằng vỏ nghêu",
        "Họ phát các bài hát ghi âm qua mạng lưới âm thanh ven biển California",
        "Họ huấn luyện đàn mực phát quang để chiếu sáng lối vào hang san hô của gia đình"
      ],
      correctAnswer: 0,
      explanation: "Dory's parents never lost hope: they laid out trails of shells every single day radiating from their home, providing an indelible physical anchor for their forgetful daughter.",
      explanationEn: "Dory's parents never lost hope: they laid out trails of shells every single day radiating from their home, providing an indelible physical anchor for their forgetful daughter.",
      explanationVi: "Bố mẹ Dory chưa bao giờ từ bỏ hy vọng: họ rải những vệt vỏ sò mỗi ngày tỏa ra từ tổ ấm, tạo thành chiếc neo dẫn đường vật lý cho đứa con gái hay quên.",
      targetedConcept: "Parental Devotion & Spatial Anchors: The Trails of Purple Seashells",
      targetedConceptEn: "Parental Devotion & Spatial Anchors: The Trails of Purple Seashells",
      targetedConceptVi: "Tình phụ tử mẫu tử & Điểm tựa không gian: Những vệt vỏ sò màu tím",
      referenceSegmentIndex: 40
    },
    {
      id: "q_mov_ani_09_7",
      question: "How does Dory persuade Hank to execute the high-stakes highway vehicular heist to save their friends?",
      questionEn: "How does Dory persuade Hank to execute the high-stakes highway vehicular heist to save their friends?",
      questionVi: "Dory thuyết phục Hank thực hiện vụ cướp xe tải mạo hiểm trên đường cao tốc để cứu bạn bè bằng cách nào?",
      options: [
        "She reassures him that lack of feet or a driving license is irrelevant, instructing him to operate the steering wheel and foot pedals using his tentacles",
        "She promises to find him an abandoned submarine in the harbor if he cooperates",
        "She shows him a forged driver's manual that permits marine cephalopods to operate transport vehicles",
        "She threatens to detach his remaining suction cups unless he steps onto the accelerator"
      ],
      optionsEn: [
        "She reassures him that lack of feet or a driving license is irrelevant, instructing him to operate the steering wheel and foot pedals using his tentacles",
        "She promises to find him an abandoned submarine in the harbor if he cooperates",
        "She shows him a forged driver's manual that permits marine cephalopods to operate transport vehicles",
        "She threatens to detach his remaining suction cups unless he steps onto the accelerator"
      ],
      optionsVi: [
        "Cô trấn an anh rằng không có chân hay bằng lái chẳng thành vấn đề, chỉ dẫn anh dùng xúc tu đạp bàn đạp và bẻ lái vô lăng",
        "Cô hứa sẽ tìm cho anh một chiếc tàu ngầm bỏ hoang ở bến cảng nếu anh hợp tác",
        "Cô cho anh xem một cuốn sổ tay lái xe giả cho phép động vật thân mềm điều khiển phương tiện vận tải",
        "Cô đe dọa sẽ giật đứt các giác hút còn lại nếu anh không chịu nhấn ga"
      ],
      correctAnswer: 0,
      explanation: "Dory demonstrates her signature adaptive problem-solving: when Hank protests that he has no license or feet, she insists: 'You don't need feet, Hank! Just use your tentacles on the pedals!'",
      explanationEn: "Dory demonstrates her signature adaptive problem-solving: when Hank protests that he has no license or feet, she insists: 'You don't need feet, Hank! Just use your tentacles on the pedals!'",
      explanationVi: "Dory thể hiện tư duy thích ứng linh hoạt: khi Hank phân trần không có bằng lái hay chân, cô quả quyết: 'Anh đâu cần chân, Hank! Cứ dùng xúc tu đạp bàn đạp!'",
      targetedConcept: "Improvisational Problem-Solving: 'What Would Dory Do?'",
      targetedConceptEn: "Improvisational Problem-Solving: 'What Would Dory Do?'",
      targetedConceptVi: "Tư duy ứng biến linh hoạt: Dory sẽ hành động như thế nào?",
      referenceSegmentIndex: 44
    },
    {
      id: "q_mov_ani_09_8",
      question: "What profound thematic insight about family and emotional memory does Dory deliver at the conclusion of her journey?",
      questionEn: "What profound thematic insight about family and emotional memory does Dory deliver at the conclusion of her journey?",
      questionVi: "Chiêm nghiệm sâu sắc nào về gia đình lựa chọn và ký ức cảm xúc được Dory đúc kết ở phần kết thúc hành trình?",
      options: [
        "That true triumph is never achieved in isolation; her journey succeeded because of the collective love of both biological family and found friends, creating memories that are unforgettable",
        "That ocean life is far too hazardous for vulnerable blue tang fish without constant human aquarium surveillance",
        "That instinctual navigation always supersedes rational communication when crossing oceanic currents",
        "That memory loss is completely reversible once an individual returns to their birthplace"
      ],
      optionsEn: [
        "That true triumph is never achieved in isolation; her journey succeeded because of the collective love of both biological family and found friends, creating memories that are unforgettable",
        "That ocean life is far too hazardous for vulnerable blue tang fish without constant human aquarium surveillance",
        "That instinctual navigation always supersedes rational communication when crossing oceanic currents",
        "That memory loss is completely reversible once an individual returns to their birthplace"
      ],
      optionsVi: [
        "Rằng chiến thắng đích thực không bao giờ đạt được trong đơn độc; hành trình thành công nhờ tình yêu thương của cả gia đình ruột thịt và những người bạn tri kỷ, tạo nên những ký ức không thể nào quên",
        "Rằng cuộc sống đại dương quá nguy hiểm cho loài cá đuôi gai xanh nếu thiếu sự giám sát thường xuyên của thủy cung con người",
        "Rằng điều hướng theo bản năng luôn vượt trội hơn giao tiếp lý tính khi vượt các dòng hải lưu",
        "Rằng chứng mất trí nhớ có thể được đảo ngược hoàn toàn khi một cá thể trở về nơi chôn rau cắt rốn"
      ],
      correctAnswer: 0,
      explanation: "Dory gently refutes Marlin's claim that she did it all on her own: 'No, Marlin, I didn't do it alone. I had you, and Nemo, and Hank, and Destiny, and Bailey. And now, I remember. And it's unforgettable.'",
      explanationEn: "Dory gently refutes Marlin's claim that she did it all on her own: 'No, Marlin, I didn't do it alone. I had you, and Nemo, and Hank, and Destiny, and Bailey. And now, I remember. And it's unforgettable.'",
      explanationVi: "Dory nhẹ nhàng phản bác lời Marlin cho rằng cô tự thân làm nên tất cả: 'Không đâu Marlin, tôi không làm một mình. Tôi có anh, Nemo, Hank, Destiny và Bailey. Và giờ tôi nhớ ra. Và điều đó không bao giờ quên.'",
      targetedConcept: "Theme of Chosen Family & Emotional Memory: 'I Didn't Do It Alone'",
      targetedConceptEn: "Theme of Chosen Family & Emotional Memory: 'I Didn't Do It Alone'",
      targetedConceptVi: "Chủ đề gia đình lựa chọn & Ký ức cảm xúc: Tôi không đơn độc",
      referenceSegmentIndex: 48
    }
  ]
};

const lessonContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: Finding Dory: Dory & Marlin 'Just Keep Swimming' Best Scenes
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR B1 | American Accent
 * YouTube ID: 2Q1gTWxZcj0 (18:38 - 1118s)
 * Views: 567,625 | Likes: High Engagement | Pixar Animation Studios
 * 
 * BÁM SÁT 100% TIMELINE TOÀN BỘ 10 CHAPTERS & BEST SCENES TỪ VIDEO GỐC (00:10 - 18:38)
 * TIÊU CHUẨN ZERO MERGED UTTERANCES - 50 MASTER SEGMENTS - 8 QUIZ CEFR B2
 * ============================================================================
 */

export const QUIZ_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING: VideoQuizData = ${JSON.stringify(quizData, null, 2)};

export const LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING: MockVideoLesson = {
  id: "mov_ani_09",
  slug: "finding-nemo-dory-just-keep-swimming",
  title: "Finding Dory: Dory & Marlin 'Just Keep Swimming' Best Scenes",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "B1",
  durationFormatted: "18:38",
  durationSeconds: 1118,
  externalId: "2Q1gTWxZcj0",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/2Q1gTWxZcj0/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 120,
  viewCount: 567625,
  studyCount: 5420,
  description:
    "Hành trình kỳ diệu của cô cá đãng trí Dory tìm lại gia đình: Từ câu hát bất hủ 'Just keep swimming', cuộc gặp gỡ với bạch tuộc Hank 7 xúc tu, cá nhám voi cận thị Destiny, màn định vị sóng âm của cá voi trắng Bailey, đến vệt vỏ sò tình thân dẫn lối về mái ấm và bài học nhân văn về nghị lực phi thường.",
  segments: ${JSON.stringify(segments, null, 4)},
  quiz: QUIZ_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING,
};

export default LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING;
`;

fs.writeFileSync('features/listening/data/lessons/movies/animation/lesson_finding_dory.ts', lessonContent, 'utf-8');
console.log('Successfully wrote features/listening/data/lessons/movies/animation/lesson_finding_dory.ts!');
