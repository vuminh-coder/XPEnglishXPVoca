import fs from "fs";
import path from "path";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";
import { MockVideoLesson, VideoQuizData } from "../features/listening/data/types";

interface RawSegment {
  orderIndex: number;
  startTime: number;
  endTime: number;
  text: string;
  translationVi: string;
  ipaUs: string;
  keywords: string[];
  explanationAi: string;
  properNouns: string[];
}

const rawPath = path.resolve(__dirname, "one_day_raw_segments.json");
const rawData: RawSegment[] = JSON.parse(fs.readFileSync(rawPath, "utf-8"));

console.log(`Loaded ${rawData.length} raw segments for One Day.`);

const calculatedSegments = rawData.map((seg, idx) => {
  const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
  return {
    orderIndex: idx,
    startTime: seg.startTime,
    endTime: seg.endTime,
    text: seg.text,
    translationVi: seg.translationVi,
    ipaUs: seg.ipaUs,
    keywords: seg.keywords,
    explanationAi: seg.explanationAi,
    properNouns: seg.properNouns,
    tokenCount: tokens.length,
  };
});

const quizData: VideoQuizData = {
  lessonId: "mov_rom_07",
  lessonTitle: "One Day: Emma & Dexter's Enduring Romance Across Decades",
  totalQuestions: 8,
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "mov_rom_07_q1",
      question: "Why does Emma self-deprecatingly compare her sunscreen to 'masonry paint' with 'Factor 30' on the beach in France?",
      questionEn: "Why does Emma self-deprecatingly compare her sunscreen to 'masonry paint' with 'Factor 30' on the beach in France?",
      questionVi: "Tại sao Emma lại tự giễu lớp kem chống nắng của mình như 'sơn trát tường' với 'chỉ số 30' trên bãi biển ở Pháp?",
      options: [
        "She forgot her cosmetic bag and had to buy industrial wall paint from a French hardware store.",
        "She has very fair, pale British skin that burns easily in intense sunlight, requiring thick protection.",
        "Dexter accidentally spilled house paint on her back while renovating their flat.",
        "She wants to disguise her identity from tourists nearby."
      ],
      optionsEn: [
        "She forgot her cosmetic bag and had to buy industrial wall paint from a French hardware store.",
        "She has very fair, pale British skin that burns easily in intense sunlight, requiring thick protection.",
        "Dexter accidentally spilled house paint on her back while renovating their flat.",
        "She wants to disguise her identity from tourists nearby."
      ],
      optionsVi: [
        "Cô quên mang túi mỹ phẩm và phải mua sơn tường công nghiệp từ tiệm kim khí Pháp.",
        "Cô sở hữu làn da trắng tái dễ bị cháy nắng dưới ánh mặt trời gay gắt, đòi hỏi lớp bảo vệ dày cộp.",
        "Dexter vô tình làm đổ sơn nhà lên lưng cô khi đang sửa sang căn hộ.",
        "Cô muốn ngụy trang danh tính khỏi những du khách xung quanh."
      ],
      correctAnswer: 1,
      explanation: "In Segment 7, Emma jokes: 'No, the masonry paint. Factor 30, I burn,' referring to her pale British skin needing heavy sunblock.",
      explanationEn: "In Segment 7, Emma jokes: 'No, the masonry paint. Factor 30, I burn,' referring to her pale British skin needing heavy sunblock.",
      explanationVi: "Trong Phân đoạn 7, Emma nói đùa: 'Không, đấy là sơn trát tường đấy. Chỉ số 30, em dễ bị cháy nắng lắm', tự giễu làn da trắng xanh nhạy cảm của mình.",
      targetedConcept: "Self-deprecating British humor and sun protection idioms",
      targetedConceptEn: "Self-deprecating British humor and sun protection idioms",
      targetedConceptVi: "Tính hài hước tự trào của người Anh và thành ngữ về chống nắng",
      referenceSegmentIndex: 7,
    },
    {
      id: "mov_rom_07_q2",
      question: "What deeper philosophical meaning does Emma attribute to her yin-yang tattoo in Segment 12?",
      questionEn: "What deeper philosophical meaning does Emma attribute to her yin-yang tattoo in Segment 12?",
      questionVi: "Emma đã gán ý nghĩa triết lý sâu sắc nào cho hình xăm âm dương của mình trong Phân đoạn 12?",
      options: [
        "It symbolizes directions on British road traffic signs.",
        "It represents a perfect union of opposites, subtly reflecting her and Dexter's contrasting personalities.",
        "It serves as a reminder to always wear socks during winter.",
        "It marks the date of her university graduation in Edinburgh."
      ],
      optionsEn: [
        "It symbolizes directions on British road traffic signs.",
        "It represents a perfect union of opposites, subtly reflecting her and Dexter's contrasting personalities.",
        "It serves as a reminder to always wear socks during winter.",
        "It marks the date of her university graduation in Edinburgh."
      ],
      optionsVi: [
        "Nó tượng trưng cho các biển chỉ dẫn trên đường giao thông ở Anh.",
        "Nó đại diện cho sự kết hợp hoàn hảo giữa hai mặt đối lập, ngầm phản chiếu tính cách trái ngược của cô và Dexter.",
        "Nó đóng vai trò như lời nhắc nhở luôn phải đi tất vào mùa đông.",
        "Nó đánh dấu ngày lễ tốt nghiệp đại học của cô tại Edinburgh."
      ],
      correctAnswer: 1,
      explanation: "In Segment 12, Emma explains: 'Yeah, well, it means a perfect union of opposites,' foreshadowing the complementary dynamic between her grounded intellect and Dexter's carefree spirit.",
      explanationEn: "In Segment 12, Emma explains: 'Yeah, well, it means a perfect union of opposites,' foreshadowing the complementary dynamic between her grounded intellect and Dexter's carefree spirit.",
      explanationVi: "Trong Phân đoạn 12, Emma giải thích: 'Vâng, nhưng nó có nghĩa là sự kết hợp hoàn hảo giữa hai mặt đối lập đấy', ngụ ý về sự bổ trợ giữa tính cách nghiêm túc của cô và tâm hồn tự do của Dexter.",
      targetedConcept: "Symbolic motifs and the complementary nature of opposites in love",
      targetedConceptEn: "Symbolic motifs and the complementary nature of opposites in love",
      targetedConceptVi: "Mô-típ biểu tượng và bản chất bù trừ của các mặt đối lập trong tình yêu",
      referenceSegmentIndex: 12,
    },
    {
      id: "mov_rom_07_q3",
      question: "Which three specific betrayal actions does Emma strictly forbid Dexter from committing during their encounter in Paris?",
      questionEn: "Which three specific betrayal actions does Emma strictly forbid Dexter from committing during their encounter in Paris?",
      questionVi: "Ba hành vi bội bạc cụ thể nào mà Emma nghiêm cấm Dexter không được phạm phải trong cuộc hội ngộ tại Paris?",
      options: [
        "Borrowing money, losing her luggage, and refusing to learn French.",
        "Leading her on, letting her down, or going behind her back.",
        "Moving to London, forgetting her birthday, and canceling dinner reservations.",
        "Calling her parents, reading her diary, and smoking cigarettes."
      ],
      optionsEn: [
        "Borrowing money, losing her luggage, and refusing to learn French.",
        "Leading her on, letting her down, or going behind her back.",
        "Moving to London, forgetting her birthday, and canceling dinner reservations.",
        "Calling her parents, reading her diary, and smoking cigarettes."
      ],
      optionsVi: [
        "Vay tiền, làm mất hành lý, và từ chối học tiếng Pháp.",
        "Gieo hy vọng hão (lead on), làm cô thất vọng (let down), hoặc lén lút sau lưng cô (go behind back).",
        "Chuyển tới London, quên sinh nhật cô, và hủy đặt bàn ăn tối.",
        "Gọi điện cho bố mẹ cô, đọc trộm nhật ký, và hút thuốc lá."
      ],
      correctAnswer: 1,
      explanation: "In Segment 21, Emma warns: 'I swear, if you lead me on, or let me down, or go behind my back, I will murder you.'",
      explanationEn: "In Segment 21, Emma warns: 'I swear, if you lead me on, or let me down, or go behind my back, I will murder you.'",
      explanationVi: "Trong Phân đoạn 21, Emma cảnh báo quyết liệt: 'Em thề, nếu anh gieo hy vọng rồi làm em thất vọng, hoặc đâm sau lưng em, em sẽ giết anh đấy.'",
      targetedConcept: "Emotional boundaries and phrasal verbs of interpersonal betrayal",
      targetedConceptEn: "Emotional boundaries and phrasal verbs of interpersonal betrayal",
      targetedConceptVi: "Ranh giới cảm xúc và cụm động từ chỉ sự phản bội trong tình cảm",
      referenceSegmentIndex: 21,
    },
    {
      id: "mov_rom_07_q4",
      question: "How does Emma playfully yet profoundly confess her deepest desire for domestic commitment to Dexter in Segment 30?",
      questionEn: "How does Emma playfully yet profoundly confess her deepest desire for domestic commitment to Dexter in Segment 30?",
      questionVi: "Emma đã thổ lộ ước muốn gắn bó gia đình thiêng liêng nhất với Dexter một cách dí dỏm mà sâu sắc như thế nào trong Phân đoạn 30?",
      options: [
        "She asks him to finance a publishing house for her poetry collection.",
        "She states that she wants a child with the man she loves, and if he won't do it, then she wants one with Dexter.",
        "She demands that he resign from his television presenting career immediately.",
        "She proposes buying a holiday cottage in the Scottish Highlands."
      ],
      optionsEn: [
        "She asks him to finance a publishing house for her poetry collection.",
        "She states that she wants a child with the man she loves, and if he won't do it, then she wants one with Dexter.",
        "She demands that he resign from his television presenting career immediately.",
        "She proposes buying a holiday cottage in the Scottish Highlands."
      ],
      optionsVi: [
        "Cô yêu cầu anh tài trợ vốn thành lập nhà xuất bản cho tập thơ của cô.",
        "Cô nói cô muốn có con với người đàn ông cô yêu, và nếu người đó không chịu, thì cô muốn có con với Dexter.",
        "Cô yêu cầu anh phải từ bỏ ngay sự nghiệp dẫn chương trình truyền hình.",
        "Cô đề xuất mua một căn nhà nghỉ dưỡng tại vùng cao nguyên Scotland."
      ],
      correctAnswer: 1,
      explanation: "In Segments 29-30, Emma expresses: 'I want a child with the man I love. And if he won't do it, then I want one with you,' acknowledging Dexter as the true love of her life.",
      explanationEn: "In Segments 29-30, Emma expresses: 'I want a child with the man I love. And if he won't do it, then I want one with you,' acknowledging Dexter as the true love of her life.",
      explanationVi: "Trong Phân đoạn 29-30, Emma chia sẻ: 'Em muốn có con với người đàn ông em yêu. Và nếu anh ấy không chịu, thì em muốn có con với anh', khẳng định Dexter chính là người đàn ông duy nhất trong tim cô.",
      targetedConcept: "Vulnerable emotional disclosures and long-term romantic commitment",
      targetedConceptEn: "Vulnerable emotional disclosures and long-term romantic commitment",
      targetedConceptVi: "Sự thổ lộ cảm xúc chân thành và cam kết gắn bó lâu dài trong tình yêu",
      referenceSegmentIndex: 30,
    },
    {
      id: "mov_rom_07_q5",
      question: "On the morning of July 15, 1988, what excuses does Dexter initially offer before changing his mind and inviting Emma for a walk?",
      questionEn: "On the morning of July 15, 1988, what excuses does Dexter initially offer before changing his mind and inviting Emma for a walk?",
      questionVi: "Vào buổi sáng ngày 15/7/1988, Dexter ban đầu viện lý do gì trước khi đổi ý và mời Emma cùng đi dạo?",
      options: [
        "He claims he has a job interview at the BBC London headquarters.",
        "He says the day is 'a bit tricky' because of his visiting parents and tasks to complete before heading back.",
        "He pretends he has to catch an early morning train to Paris.",
        "He complains about severe food poisoning from graduation champagne."
      ],
      optionsEn: [
        "He claims he has a job interview at the BBC London headquarters.",
        "He says the day is 'a bit tricky' because of his visiting parents and tasks to complete before heading back.",
        "He pretends he has to catch an early morning train to Paris.",
        "He complains about severe food poisoning from graduation champagne."
      ],
      optionsVi: [
        "Anh bảo rằng mình có buổi phỏng vấn xin việc tại trụ sở BBC London.",
        "Anh nói hôm nay 'hơi kẹt' vì bố mẹ sắp lên thăm và còn bao nhiêu việc phải làm trước khi quay về.",
        "Anh giả vờ rằng mình phải bắt chuyến tàu sáng sớm sang Paris.",
        "Anh than phiền bị ngộ độc rượu sâm-panh sau tiệc tốt nghiệp."
      ],
      correctAnswer: 1,
      explanation: "In Segments 38-42, Dexter hesitates with excuses about his parents arriving, but stops before leaving and invites Emma: 'So if you wanted to, we could go for a walk or something.'",
      explanationEn: "In Segments 38-42, Dexter hesitates with excuses about his parents arriving, but stops before leaving and invites Emma: 'So if you wanted to, we could go for a walk or something.'",
      explanationVi: "Trong Phân đoạn 38-42, Dexter ngập ngừng tìm cớ bố mẹ lên thăm, nhưng trước khi bước ra cửa anh đã đổi ý: 'Nên nếu cô muốn, chúng ta có thể đi dạo một vòng hay gì đó.'",
      targetedConcept: "Polite hesitation turning into spontaneous attraction",
      targetedConceptEn: "Polite hesitation turning into spontaneous attraction",
      targetedConceptVi: "Sự ngập ngừng thoái thác chuyển hóa thành sức hút tự nhiên ngẫu hứng",
      referenceSegmentIndex: 42,
    },
    {
      id: "mov_rom_07_q6",
      question: "What humorous dialogue exchange occurs as Emma and Dexter hike up Arthur's Seat in Edinburgh?",
      questionEn: "What humorous dialogue exchange occurs as Emma and Dexter hike up Arthur's Seat in Edinburgh?",
      questionVi: "Cuộc đối đáp hài hước nào diễn ra khi Emma và Dexter cùng leo lên đồi Arthur's Seat ở Edinburgh?",
      options: [
        "Emma complains about her umbrella, and Dexter compares Edinburgh's weather to tropical rain.",
        "Emma complains she cannot go mountain climbing in brogues, and Dexter retorts that it's not K2 but just a big hill a child could do.",
        "Emma loses her graduation cap, and Dexter offers his trench coat as a substitute.",
        "Emma complains about altitude sickness, and Dexter offers her a canteen of water."
      ],
      optionsEn: [
        "Emma complains about her umbrella, and Dexter compares Edinburgh's weather to tropical rain.",
        "Emma complains she cannot go mountain climbing in brogues, and Dexter retorts that it's not K2 but just a big hill a child could do.",
        "Emma loses her graduation cap, and Dexter offers his trench coat as a substitute.",
        "Emma complains about altitude sickness, and Dexter offers her a canteen of water."
      ],
      optionsVi: [
        "Emma phàn nàn về chiếc ô của mình, và Dexter so sánh thời tiết Edinburgh với mưa nhiệt đới.",
        "Emma than phiền không thể leo núi bằng giày da brogues, và Dexter đáp lại rằng đây đâu phải đỉnh K2 mà chỉ là ngọn đồi con nít cũng leo được.",
        "Emma làm mất mũ tốt nghiệp, và Dexter đưa áo măng-tô của mình cho cô đội.",
        "Emma than say độ cao, và Dexter đưa bi-đông nước cho cô uống."
      ],
      correctAnswer: 1,
      explanation: "In Segments 45-46, Emma protests: 'It's these shoes! I can't go mountain climbing in brogues!' to which Dexter replies: 'It's not K2, it's just a big hill, all right? A child could do it.'",
      explanationEn: "In Segments 45-46, Emma protests: 'It's these shoes! I can't go mountain climbing in brogues!' to which Dexter replies: 'It's not K2, it's just a big hill, all right? A child could do it.'",
      explanationVi: "Trong Phân đoạn 45-46, Emma càu nhàu về đôi giày brogues không hợp leo núi, và Dexter trêu chọc đây chẳng phải ngọn K2 hiểm trở.",
      targetedConcept: "British comedic banter and footwear hyperbole",
      targetedConceptEn: "British comedic banter and footwear hyperbole",
      targetedConceptVi: "Lối đối đáp hài hước của Anh và phóng đại hình tượng trang phục",
      referenceSegmentIndex: 46,
    },
    {
      id: "mov_rom_07_q7",
      question: "What core thematic motto of the novel and film 'One Day' does Emma declare on Arthur's Seat in Segment 50?",
      questionEn: "What core thematic motto of the novel and film 'One Day' does Emma declare on Arthur's Seat in Segment 50?",
      questionVi: "Châm ngôn cốt lõi xuyên suốt tiểu thuyết và bộ phim 'One Day' mà Emma tuyên bố trên đồi Arthur's Seat trong Phân đoạn 50 là gì?",
      options: [
        "'Never leave for tomorrow what you can achieve today.'",
        "'Whatever happens tomorrow, we had today.'",
        "'Love means never having to say you are sorry.'",
        "'Distance makes the heart grow fonder across the years.'"
      ],
      optionsEn: [
        "'Never leave for tomorrow what you can achieve today.'",
        "'Whatever happens tomorrow, we had today.'",
        "'Love means never having to say you are sorry.'",
        "'Distance makes the heart grow fonder across the years.'"
      ],
      optionsVi: [
        "'Đừng bao giờ để đến ngày mai những gì bạn có thể hoàn thành hôm nay.'",
        "'Dù ngày mai có ra sao đi nữa, chúng ta đã có trọn vẹn ngày hôm nay.'",
        "'Yêu là không bao giờ phải nói lời xin lỗi.'",
        "'Khoảng cách thời gian chỉ làm cho tình yêu thêm sâu đậm.'"
      ],
      correctAnswer: 1,
      explanation: "In Segment 50, Emma delivers the immortal thematic thesis of the story: 'Whatever happens tomorrow, we had today,' establishing their lifetime bond regardless of what fate brings.",
      explanationEn: "In Segment 50, Emma delivers the immortal thematic thesis of the story: 'Whatever happens tomorrow, we had today,' establishing their lifetime bond regardless of what fate brings.",
      explanationVi: "Trong Phân đoạn 50, Emma thốt lên câu nói bất hủ định hình toàn bộ tác phẩm: 'Dù ngày mai có ra sao đi nữa, chúng ta đã có trọn vẹn ngày hôm nay', thiết lập sợi dây gắn kết vĩnh cửu giữa hai người.",
      targetedConcept: "The overarching existential and romantic philosophy of One Day",
      targetedConceptEn: "The overarching existential and romantic philosophy of One Day",
      targetedConceptVi: "Triết lý nhân sinh và tình yêu bao trùm của tác phẩm One Day",
      referenceSegmentIndex: 50,
    },
    {
      id: "mov_rom_07_q8",
      question: "What unforgettable promise does Dexter deliver after sprinting down the cobbled Edinburgh street to get Emma's phone number?",
      questionEn: "What unforgettable promise does Dexter deliver after sprinting down the cobbled Edinburgh street to get Emma's phone number?",
      questionVi: "Lời hẹn ước khó phai nào mà Dexter đã khẳng định sau khi chạy hộc tốc đuổi theo Emma trên con dốc lát đá Edinburgh để xin số điện thoại?",
      options: [
        "He promises to send her five postcards from his travels in India every week.",
        "He affirms with absolute certainty: 'But we will see each other again.'",
        "He promises to propose marriage to her exactly ten years from that day.",
        "He vows to buy her parents a new fax machine for their home."
      ],
      optionsEn: [
        "He promises to send her five postcards from his travels in India every week.",
        "He affirms with absolute certainty: 'But we will see each other again.'",
        "He promises to propose marriage to her exactly ten years from that day.",
        "He vows to buy her parents a new fax machine for their home."
      ],
      optionsVi: [
        "Anh hứa sẽ gửi cho cô năm tấm bưu thiếp mỗi tuần từ chuyến đi Ấn Độ.",
        "Anh khẳng định chắc nịch với tất cả sự chân thành: 'Nhưng chắc chắn chúng ta sẽ gặp lại nhau mà.'",
        "Anh hứa sẽ cầu hôn cô chính xác mười năm sau ngày hôm đó.",
        "Anh thề sẽ mua tặng bố mẹ cô một chiếc máy fax mới tinh cho gia đình."
      ],
      correctAnswer: 1,
      explanation: "In Segment 81, as Emma says goodbye, Dexter reassures her with heartfelt conviction: 'I know. But we will see each other again,' sealing their destiny.",
      explanationEn: "In Segment 81, as Emma says goodbye, Dexter reassures her with heartfelt conviction: 'I know. But we will see each other again,' sealing their destiny.",
      explanationVi: "Trong Phân đoạn 81, khi Emma chuẩn bị bước đi, Dexter trấn an cô bằng niềm tin mãnh liệt từ đáy lòng: 'Anh biết. Nhưng chắc chắn chúng ta sẽ gặp lại nhau mà', gắn kết số phận của họ suốt 20 năm.",
      targetedConcept: "Faith in romantic destiny and the enduring promise of reunion",
      targetedConceptEn: "Faith in romantic destiny and the enduring promise of reunion",
      targetedConceptVi: "Niềm tin vào định mệnh tình yêu và lời hứa hẹn gặp lại bất diệt",
      referenceSegmentIndex: 81,
    },
  ],
};

const fullLesson: MockVideoLesson = {
  id: "mov_rom_07",
  slug: "one-day-emma-dexter-love-story",
  title: "One Day: Emma & Dexter's Enduring Romance Across Decades",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "10:04",
  durationSeconds: 604,
  externalId: "ESI7jRy2yAk",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/ESI7jRy2yAk/hqdefault.jpg",
  accent: "British (RP / Northern)",
  wpmSpeed: 136,
  viewCount: 2306260,
  studyCount: 3450,
  description:
    "Bản tình ca bất hủ chuyển thể từ tiểu thuyết One Day của David Nicholls: Emma Morley và Dexter Mayhew qua từng mốc ngày 15 tháng 7, những lời hẹn ước dang dở và tình yêu khắc cốt ghi tâm kéo dài suốt hai thập kỷ.",
  segments: calculatedSegments,
  quiz: quizData,
};

const fileContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: One Day: Emma & Dexter's Enduring Romance Across Decades
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B2 | British (RP / Northern)
 * YouTube ID: ESI7jRy2yAk (10:04 - 604s)
 * Views: 2,306,260 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (85 PURE MASTER SEGMENTS)
 * ZERO MERGED UTTERANCES - ĐẦY ĐỦ 7 PHÂN CẢNH TỪ 00:00 ĐẾN 10:04
 * ============================================================================
 */

export const QUIZ_ONE_DAY_EMMA_DEXTER_LOVE_STORY: VideoQuizData = ${JSON.stringify(
  quizData,
  null,
  2
)};

export const LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY: MockVideoLesson = {
  id: "mov_rom_07",
  slug: "one-day-emma-dexter-love-story",
  title: "One Day: Emma & Dexter's Enduring Romance Across Decades",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "10:04",
  durationSeconds: 604,
  externalId: "ESI7jRy2yAk",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/ESI7jRy2yAk/hqdefault.jpg",
  accent: "British (RP / Northern)",
  wpmSpeed: 136,
  viewCount: 2306260,
  studyCount: 3450,
  description:
    "Bản tình ca bất hủ chuyển thể từ tiểu thuyết One Day của David Nicholls: Emma Morley và Dexter Mayhew qua từng mốc ngày 15 tháng 7, những lời hẹn ước dang dở và tình yêu khắc cốt ghi tâm kéo dài suốt hai thập kỷ.",
  segments: ${JSON.stringify(calculatedSegments, null, 2)},
  quiz: QUIZ_ONE_DAY_EMMA_DEXTER_LOVE_STORY,
};

export default LESSON_ONE_DAY_EMMA_DEXTER_LOVE_STORY;
`;

const outputPath = path.resolve(
  __dirname,
  "../features/listening/data/lessons/movies/romance/lesson_one_day.ts"
);
fs.writeFileSync(outputPath, fileContent, "utf-8");
console.log(`Successfully written 85 master segments to ${outputPath}!`);
