const fs = require('fs');
const path = require('path');

const segments = JSON.parse(fs.readFileSync(path.join(__dirname, 'monsters_inc_pure_segments.json'), 'utf8'));

console.log(`Loaded ${segments.length} segments.`);

const quiz = {
  lessonId: "mov_ani_12",
  lessonTitle: "Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder",
  totalQuestions: 8,
  xpReward: 200,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "q_mov_ani_12_1",
      question: "What does Mike mean when he thanks Sulley for 'hooking me up with those reservations'?",
      questionEn: "What does Mike mean when he thanks Sulley for 'hooking me up with those reservations'?",
      questionVi: "Mike có ý gì khi cảm ơn Sulley vì đã 'hooking me up with those reservations'?",
      options: [
        "Sulley arranged and secured restaurant reservations for Mike as a helpful favor",
        "Sulley cancelled Mike's existing dinner reservations",
        "Sulley charged Mike extra money to buy stolen reservation tickets",
        "Sulley refused to let Mike dine at the monster restaurant"
      ],
      optionsEn: [
        "Sulley arranged and secured restaurant reservations for Mike as a helpful favor",
        "Sulley cancelled Mike's existing dinner reservations",
        "Sulley charged Mike extra money to buy stolen reservation tickets",
        "Sulley refused to let Mike dine at the monster restaurant"
      ],
      optionsVi: [
        "Sulley đã thu xếp và đặt bàn nhà hàng cho Mike như một sự giúp đỡ nhiệt tình",
        "Sulley đã hủy đặt bàn bữa tối hiện có của Mike",
        "Sulley tính thêm tiền của Mike để mua vé đặt bàn chợ đen",
        "Sulley từ chối cho Mike ăn tối tại nhà hàng quái vật"
      ],
      correctAnswer: 0,
      explanation: "To 'hook someone up with something' means to provide or arrange something useful and beneficial for someone as a favor: 'When you hook someone up with something, you provide the person with something useful for free or as a favor.'",
      explanationEn: "To 'hook someone up with something' means to provide or arrange something useful and beneficial for someone as a favor: 'When you hook someone up with something, you provide the person with something useful for free or as a favor.'",
      explanationVi: "'Hook someone up with something' có nghĩa là thu xếp hoặc cung cấp điều gì hữu ích cho ai đó như một sự giúp đỡ thân tình.",
      targetedConcept: "Idiom: Hook someone up with",
      targetedConceptEn: "Idiom: Hook someone up with",
      targetedConceptVi: "Thành ngữ: Giúp đỡ / thu xếp cho ai đó",
      referenceSegmentIndex: 19
    },
    {
      id: "q_mov_ani_12_2",
      question: "When Randall boasts 'I'm in the zone today', what psychological state is he describing?",
      questionEn: "When Randall boasts 'I'm in the zone today', what psychological state is he describing?",
      questionVi: "Khi Randall khoe khoang 'I'm in the zone today', hắn đang mô tả trạng thái tâm lý nào?",
      options: [
        "He is in a state of peak focus and extraordinary performance where everything works effortlessly",
        "He is feeling extremely sleepy and wants to rest in his bedroom",
        "He is lost in a dangerous restricted area of the factory",
        "He is terrified of the little human children"
      ],
      optionsEn: [
        "He is in a state of peak focus and extraordinary performance where everything works effortlessly",
        "He is feeling extremely sleepy and wants to rest in his bedroom",
        "He is lost in a dangerous restricted area of the factory",
        "He is terrified of the little human children"
      ],
      optionsVi: [
        "Hắn đang ở trạng thái tập trung đỉnh cao và phong độ xuất sắc nhất, làm gì cũng trơn tru",
        "Hắn cảm thấy cực kỳ buồn ngủ và muốn nghỉ ngơi trong phòng",
        "Hắn bị lạc trong khu vực cấm nguy hiểm của nhà máy",
        "Hắn đang khiếp sợ những đứa trẻ loài người"
      ],
      correctAnswer: 0,
      explanation: "'In the zone' refers to a flow state of peak performance: 'When you say \"I'm in the zone\", you mean you are at the top of your game, performing at peak capability.'",
      explanationEn: "'In the zone' refers to a flow state of peak performance: 'When you say \"I'm in the zone\", you mean you are at the top of your game, performing at peak capability.'",
      explanationVi: "'In the zone' chỉ điểm rơi phong độ, sự tập trung cao độ và thăng hoa tột bậc trong công việc hoặc thi đấu.",
      targetedConcept: "Idiom: In the zone",
      targetedConceptEn: "Idiom: In the zone",
      targetedConceptVi: "Thành ngữ: Đạt phong độ đỉnh cao",
      referenceSegmentIndex: 23
    },
    {
      id: "q_mov_ani_12_3",
      question: "What does the slang phrase 'Can it!' mean when Sulley shouts it at Mike during the rehearsal?",
      questionEn: "What does the slang phrase 'Can it!' mean when Sulley shouts it at Mike during the rehearsal?",
      questionVi: "Cụm tiếng lóng 'Can it!' có nghĩa là gì khi Sulley quát Mike trong lúc diễn kịch?",
      options: [
        "Stop talking and shut up immediately",
        "Put food into a tin can",
        "Sing louder so everyone can hear",
        "Run away as fast as possible"
      ],
      optionsEn: [
        "Stop talking and shut up immediately",
        "Put food into a tin can",
        "Sing louder so everyone can hear",
        "Run away as fast as possible"
      ],
      optionsVi: [
        "Ngừng nói và câm miệng lại ngay lập tức",
        "Bỏ thức ăn vào hộp thiếc",
        "Hát to hơn để mọi người cùng nghe",
        "Chạy đi thật nhanh"
      ],
      correctAnswer: 0,
      explanation: "'Can it!' is an informal colloquial idiom telling someone to stop talking or shut up: ''Can it' is a slangy, emphatic way to tell someone to shut up or stop talking immediately.'",
      explanationEn: "'Can it!' is an informal colloquial idiom telling someone to stop talking or shut up: ''Can it' is a slangy, emphatic way to tell someone to shut up or stop talking immediately.'",
      explanationVi: "'Can it!' là tiếng lóng đời thường bảo ai đó hãy im lặng hoặc ngậm miệng lại ngay.",
      targetedConcept: "Slang: Can it!",
      targetedConceptEn: "Slang: Can it!",
      targetedConceptVi: "Tiếng lóng: Im miệng lại",
      referenceSegmentIndex: 34
    },
    {
      id: "q_mov_ani_12_4",
      question: "What does Randall imply when he says 'Word on the street is the kid's been traced back to this factory'?",
      questionEn: "What does Randall imply when he says 'Word on the street is the kid's been traced back to this factory'?",
      questionVi: "Randall ngụ ý điều gì khi nói 'Word on the street is the kid's been traced back to this factory'?",
      options: [
        "Rumors and talk circulating among monsters say evidence links the runaway human child to this facility",
        "A formal written letter was mailed to the mayor's office",
        "The child was found playing happily outside on the street",
        "The police have closed the investigation without any leads"
      ],
      optionsEn: [
        "Rumors and talk circulating among monsters say evidence links the runaway human child to this facility",
        "A formal written letter was mailed to the mayor's office",
        "The child was found playing happily outside on the street",
        "The police have closed the investigation without any leads"
      ],
      optionsVi: [
        "Tin đồn lan truyền giữa các quái vật cho thấy manh mối liên kết đứa trẻ xổng ra với nhà máy này",
        "Một bức thư chính thức đã được gửi tới văn phòng thị trưởng",
        "Đứa trẻ được tìm thấy đang chơi vui vẻ ngoài phố",
        "Cảnh sát đã khép lại cuộc điều tra mà không có manh mối nào"
      ],
      correctAnswer: 0,
      explanation: "'Word on the street is...' introduces widely circulating rumors: ''Word on the street is' means hearing circulating rumors from people in your community or neighborhood.'",
      explanationEn: "'Word on the street is...' introduces widely circulating rumors: ''Word on the street is' means hearing circulating rumors from people in your community or neighborhood.'",
      explanationVi: "'Word on the street is...' dùng để bắt đầu chia sẻ một tin đồn hoặc thông tin truyền miệng đang lan truyền rộng rãi.",
      targetedConcept: "Idiom: Word on the street is",
      targetedConceptEn: "Idiom: Word on the street is",
      targetedConceptVi: "Thành ngữ: Tin đồn thiên hạ",
      referenceSegmentIndex: 37
    },
    {
      id: "q_mov_ani_12_5",
      question: "What does the English expression 'Put your money where your mouth is' instruct someone to do?",
      questionEn: "What does the English expression 'Put your money where your mouth is' instruct someone to do?",
      questionVi: "Thành ngữ tiếng Anh 'Put your money where your mouth is' khuyên bảo người ta làm gì?",
      options: [
        "Back up your claims and words with tangible actions rather than empty talk",
        "Physically place currency notes into your mouth",
        "Lend your savings to strangers without any interest",
        "Never speak about your financial wealth in public"
      ],
      optionsEn: [
        "Back up your claims and words with tangible actions rather than empty talk",
        "Physically place currency notes into your mouth",
        "Lend your savings to strangers without any interest",
        "Never speak about your financial wealth in public"
      ],
      optionsVi: [
        "Hãy chứng minh lời nói và cam kết bằng hành động thực tế thay vì chỉ nói suông",
        "Đặt tiền mặt trực tiếp vào miệng",
        "Cho người lạ vay tiền tiết kiệm mà không lấy lãi",
        "Không bao giờ nói về tài sản của mình trước công chúng"
      ],
      correctAnswer: 0,
      explanation: "'Put your money where your mouth is' means to support your statements with real action: 'English also has the famous expression 'put your money where your mouth is', challenging someone to prove claims with deeds.'",
      explanationEn: "'Put your money where your mouth is' means to support your statements with real action: 'English also has the famous expression 'put your money where your mouth is', challenging someone to prove claims with deeds.'",
      explanationVi: "'Put your money where your mouth is' (nói phải đi đôi với làm) yêu cầu dùng hành động cụ thể để chứng minh tuyên bố của mình.",
      targetedConcept: "Proverb: Put your money where your mouth is",
      targetedConceptEn: "Proverb: Put your money where your mouth is",
      targetedConceptVi: "Thành ngữ: Nói đi đôi với làm",
      referenceSegmentIndex: 44
    },
    {
      id: "q_mov_ani_12_6",
      question: "When Mike claims Waxford has 'them shifty eyes', what characteristic is he attributing to him?",
      questionEn: "When Mike claims Waxford has 'them shifty eyes', what characteristic is he attributing to him?",
      questionVi: "Khi Mike nói Waxford có 'them shifty eyes', anh ta đang quy chụp cho Waxford đặc điểm gì?",
      options: [
        "Looking deceitful, untrustworthy, and suspicious",
        "Having sparkling, friendly, and honest eyes",
        "Needing thick reading glasses to see clearly",
        "Being the most popular worker in the entire department"
      ],
      optionsEn: [
        "Looking deceitful, untrustworthy, and suspicious",
        "Having sparkling, friendly, and honest eyes",
        "Needing thick reading glasses to see clearly",
        "Being the most popular worker in the entire department"
      ],
      optionsVi: [
        "Trông gian xảo, dối trá, lươn lẹo và đầy khả nghi",
        "Có đôi mắt long lanh, thân thiện và chân thật",
        "Cần đeo kính râm dày để nhìn rõ",
        "Là công nhân nổi tiếng nhất trong toàn bộ nhà máy"
      ],
      correctAnswer: 0,
      explanation: "'Shifty' characterizes someone who seems dishonest: 'Describing someone as 'shifty' means they appear deceitful, evasive, and untrustworthy, like someone whose eyes dart suspiciously.'",
      explanationEn: "'Shifty' characterizes someone who seems dishonest: 'Describing someone as 'shifty' means they appear deceitful, evasive, and untrustworthy, like someone whose eyes dart suspiciously.'",
      explanationVi: "'Shifty' miêu tả một người gian trá, lấm lét, có ánh mắt láo liên không đáng tin cậy.",
      targetedConcept: "Vocabulary: Shifty eyes",
      targetedConceptEn: "Vocabulary: Shifty eyes",
      targetedConceptVi: "Từ vựng: Ánh mắt gian xảo / khả nghi",
      referenceSegmentIndex: 46
    },
    {
      id: "q_mov_ani_12_7",
      question: "What does Mike mean by the idiom 'she's out of our hair' when trying to dissuade Sulley from protecting Boo?",
      questionEn: "What does Mike mean by the idiom 'she's out of our hair' when trying to dissuade Sulley from protecting Boo?",
      questionVi: "Mike có ý gì khi dùng thành ngữ 'she's out of our hair' lúc cố can ngăn Sulley bảo vệ bé Boo?",
      options: [
        "The child is no longer bothering them or causing any inconvenience, so they should let others handle it",
        "The child has literally shaved off all of their fur in the locker room",
        "They need to wash the child's hair using industrial shampoo",
        "The child has hidden inside Mike's backpack"
      ],
      optionsEn: [
        "The child is no longer bothering them or causing any inconvenience, so they should let others handle it",
        "The child has literally shaved off all of their fur in the locker room",
        "They need to wash the child's hair using industrial shampoo",
        "The child has hidden inside Mike's backpack"
      ],
      optionsVi: [
        "Đứa trẻ không còn quấy rầy hay gây phiền phức cho họ nữa, nên hãy để người khác giải quyết",
        "Đứa trẻ đã cạo sạch lông của họ trong phòng thay đồ theo đúng nghĩa đen",
        "Họ cần gội đầu cho đứa trẻ bằng dầu gội công nghiệp",
        "Đứa trẻ đã trốn vào trong ba lô của Mike"
      ],
      correctAnswer: 0,
      explanation: "'Out of our hair' is an idiom meaning someone is no longer causing trouble or inconvenience: 'The idiom \"she's out of our hair\" means someone is no longer causing you any trouble, disturbance, or inconvenience.'",
      explanationEn: "'Out of our hair' is an idiom meaning someone is no longer causing trouble or inconvenience: 'The idiom \"she's out of our hair\" means someone is no longer causing you any trouble, disturbance, or inconvenience.'",
      explanationVi: "'Out of our hair' là thành ngữ chỉ việc ai đó không còn quấy rầy hay gây phiền toái nữa: 'Thành ngữ \"she's out of our hair\" có nghĩa là ai đó không còn gây rắc rối, quấy rầy hay phiền toái cho bạn nữa.'",
      targetedConcept: "Idiom: Out of someone's hair",
      targetedConceptEn: "Idiom: Out of someone's hair",
      targetedConceptVi: "Thành ngữ: Hết quấy rầy / Không còn gây phiền toái",
      referenceSegmentIndex: 31
    },
    {
      id: "q_mov_ani_12_8",
      question: "What warning does Mike convey with the expression 'Please don't blow this' regarding their scaring record?",
      questionEn: "What warning does Mike convey with the expression 'Please don't blow this' regarding their scaring record?",
      questionVi: "Mike muốn đưa ra lời cảnh báo gì qua cụm từ 'Please don't blow this' liên quan đến kỷ lục hù dọa của họ?",
      options: [
        "Do not ruin or waste this valuable, hard-earned opportunity to break the company record",
        "Do not exhale cold air onto the electronic door shredder",
        "Do not blow up the balloons for Celia's birthday celebration",
        "Do not turn on the factory air conditioning vents"
      ],
      optionsEn: [
        "Do not ruin or waste this valuable, hard-earned opportunity to break the company record",
        "Do not exhale cold air onto the electronic door shredder",
        "Do not blow up the balloons for Celia's birthday celebration",
        "Do not turn on the factory air conditioning vents"
      ],
      optionsVi: [
        "Đừng làm hỏng bét hay bỏ phí cơ hội ngàn vàng vất vả lắm mới có để phá vỡ kỷ lục của công ty",
        "Đừng thổi hơi lạnh vào chiếc máy nghiền cửa điện tử",
        "Đừng thổi bóng bay cho bữa tiệc sinh nhật của Celia",
        "Đừng bật các lỗ thông gió điều hòa của nhà máy"
      ],
      correctAnswer: 0,
      explanation: "'To blow something' means to mess up, fail, or ruin an important opportunity: 'When you \"blow something\", you mess it up or fail to take advantage of a valuable opportunity, as in: \"Man, I blew it!\"'",
      explanationEn: "'To blow something' means to mess up, fail, or ruin an important opportunity: 'When you \"blow something\", you mess it up or fail to take advantage of a valuable opportunity, as in: \"Man, I blew it!\"'",
      explanationVi: "'To blow something' có nghĩa là làm hỏng bét hoặc đánh mất một cơ hội quý báu: 'Khi bạn \"blow something\", bạn làm hỏng bét hoặc để vuột mất một cơ hội quý giá...'",
      targetedConcept: "Idiom: Blow something / Blow it",
      targetedConceptEn: "Idiom: Blow something / Blow it",
      targetedConceptVi: "Thành ngữ: Làm hỏng chuyện / Bỏ lỡ cơ hội",
      referenceSegmentIndex: 29
    }
  ]
};

const fileContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR A2 | American Accent
 * YouTube ID: _kafLt9bNyU (17:39 - 1059s)
 * Views: 277,436 | Learn English with TV Series
 * 
 * BÁM SÁT 100% TIMELINE TOÀN BỘ VIDEO & PHÂN CẢNH VÀ BÀI GIẢNG TỪ ĐẦU ĐẾN CUỐI
 * TIÊU CHUẨN ZERO MERGED UTTERANCES - 50 PURE MASTER SEGMENTS - 8 QUIZ CEFR B2
 * ============================================================================
 */

export const QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT: VideoQuizData = ${JSON.stringify(quiz, null, 2)};

export const LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT: MockVideoLesson = {
  id: "mov_ani_12",
  slug: "monsters-inc-goodbye-boo-emotional-cut",
  title: "Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "A2",
  durationFormatted: "17:39",
  durationSeconds: 1059,
  externalId: "_kafLt9bNyU",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/_kafLt9bNyU/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 132,
  viewCount: 277436,
  studyCount: 5620,
  description:
    "Học tiếng Anh chuyên sâu cùng Monsters, Inc. (2001): Phân tích toàn diện 100% lời thoại kinh điển của Mike Wazowski & Sulley và bài giảng ngôn ngữ học, phủ kín 50 pure master segments từ thành ngữ giao tiếp 'in the zone', 'she's the one', 'hook someone up' đến tiếng lóng 'can it', 'word on the street' và 'shifty eyes'.",
  segments: ${JSON.stringify(segments, null, 2)},
  quiz: QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT
};

export default LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT;
`;

const outputPath = path.join(__dirname, '../features/listening/data/lessons/movies/animation/lesson_monsters_inc.ts');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Successfully written lesson_monsters_inc.ts to ${outputPath}!`);
