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

const rawPath = path.resolve(__dirname, "about_time_raw_segments.json");
const rawData: RawSegment[] = JSON.parse(fs.readFileSync(rawPath, "utf-8"));

console.log(`Loaded ${rawData.length} raw segments for About Time.`);

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
  lessonId: "mov_rom_01",
  lessonTitle: "About Time: Tim Learns the Secret Formula for Happiness (Full Master Cut)",
  totalQuestions: 8,
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "mov_rom_01_q1",
      question: "Before revealing his wisdom, what choice does the father offer Tim?",
      questionEn: "Before revealing his wisdom, what choice does the father offer Tim?",
      questionVi: "Trước khi tiết lộ bí mật, người cha đã đưa ra cho Tim sự lựa chọn nào?",
      options: [
        "To inherit the family estate immediately or continue working in London.",
        "Whether he wants to know the big secret right away or find it out for himself like the father did.",
        "To travel back to ancient Rome or medieval England.",
        "To marry Mary immediately or wait until he becomes a senior partner."
      ],
      optionsEn: [
        "To inherit the family estate immediately or continue working in London.",
        "Whether he wants to know the big secret right away or find it out for himself like the father did.",
        "To travel back to ancient Rome or medieval England.",
        "To marry Mary immediately or wait until he becomes a senior partner."
      ],
      optionsVi: [
        "Thừa kế điền trang gia đình ngay lập tức hoặc tiếp tục làm việc ở London.",
        "Liệu anh muốn biết bí mật lớn ngay bây giờ hay muốn tự mình trải nghiệm để tìm ra như người cha ngày trước.",
        "Du hành thời gian về La Mã cổ đại hay nước Anh thời Trung cổ.",
        "Cưới Mary ngay lập tức hay đợi đến khi trở thành luật sư cộng sự cấp cao."
      ],
      correctAnswer: 1,
      explanation: "In Segments 1 and 2, the father asks: 'do you want to know the big secret, or would you rather find it out for yourself like I did?'",
      explanationEn: "In Segments 1 and 2, the father asks: 'do you want to know the big secret, or would you rather find it out for yourself like I did?'",
      explanationVi: "Trong Phân đoạn 1 và 2, người cha hỏi: 'con có muốn biết bí mật lớn này không, hay con muốn tự mình trải nghiệm và nhận ra nó, giống như bố ngày trước?'",
      targetedConcept: "Father's pedagogical approach to life wisdom",
      targetedConceptEn: "Father's pedagogical approach to life wisdom",
      targetedConceptVi: "Phương pháp giáo dục và gợi mở triết lý sống của người cha",
      referenceSegmentIndex: 2,
    },
    {
      id: "mov_rom_01_q2",
      question: "What metaphor does the father use in Segment 6 to emphasize the supreme importance of this formula?",
      questionEn: "What metaphor does the father use in Segment 6 to emphasize the supreme importance of this formula?",
      questionVi: "Người cha đã dùng hình ảnh ẩn dụ nào trong Phân đoạn 6 để nhấn mạnh tầm quan trọng tối thượng của công thức này?",
      options: [
        "The golden ticket.",
        "The real mothership.",
        "The holy grail.",
        "The ultimate fountain of youth."
      ],
      optionsEn: [
        "The golden ticket.",
        "The real mothership.",
        "The holy grail.",
        "The ultimate fountain of youth."
      ],
      optionsVi: [
        "Tấm vé vàng may mắn.",
        "Con tàu mẹ đích thực (Bí mật gốc rễ tối thượng).",
        "Chén thánh quyền năng.",
        "Suối nguồn tươi trẻ tối thượng."
      ],
      correctAnswer: 1,
      explanation: "In Segment 6, the father declares: 'The real mothership.' Meaning this wisdom is the central, foundational anchor of true happiness, surpassing time travel itself.",
      explanationEn: "In Segment 6, the father declares: 'The real mothership.' Meaning this wisdom is the central, foundational anchor of true happiness, surpassing time travel itself.",
      explanationVi: "Trong Phân đoạn 6, người cha tuyên bố: 'The real mothership' (con tàu mẹ đích thực), khẳng định đây là bí quyết nền tảng chi phối toàn bộ hạnh phúc đời người.",
      targetedConcept: "Metaphorical language in British screenwriting",
      targetedConceptEn: "Metaphorical language in British screenwriting",
      targetedConceptVi: "Nắm bắt ngôn ngữ ẩn dụ đặc sắc trong kịch bản điện ảnh Anh",
      referenceSegmentIndex: 6,
    },
    {
      id: "mov_rom_01_q3",
      question: "What is 'Part One' of the father's two-part plan for happiness?",
      questionEn: "What is 'Part One' of the father's two-part plan for happiness?",
      questionVi: "Phần một trong kế hoạch hai bước để đạt được hạnh phúc của người cha là gì?",
      options: [
        "To win high-profile court cases by traveling back to re-examine evidence.",
        "To just get on with ordinary life, living it day by day like anyone else.",
        "To invest heavily in booming stock markets.",
        "To read classical literature for two hours each evening."
      ],
      optionsEn: [
        "To win high-profile court cases by traveling back to re-examine evidence.",
        "To just get on with ordinary life, living it day by day like anyone else.",
        "To invest heavily in booming stock markets.",
        "To read classical literature for two hours each evening."
      ],
      optionsVi: [
        "Thắng các vụ kiện nổi tiếng bằng cách quay lại quá khứ để kiểm tra lại bằng chứng.",
        "Cứ tiếp tục sống một cuộc đời bình thường, sống trọn từng ngày như bao người khác.",
        "Đầu tư mạnh tay vào thị trường chứng khoán đang tăng trưởng.",
        "Đọc văn học cổ điển hai tiếng mỗi tối."
      ],
      correctAnswer: 1,
      explanation: "In Segments 10 to 12, Tim narrates: 'Part one of the two part plan was that I should just get on with ordinary life, living it day by day, like anyone else.'",
      explanationEn: "In Segments 10 to 12, Tim narrates: 'Part one of the two part plan was that I should just get on with ordinary life, living it day by day, like anyone else.'",
      explanationVi: "Trong Phân đoạn 10 đến 12, Tim tự sự: 'Phần một trong kế hoạch hai bước là tôi cứ tiếp tục sống một cuộc đời bình thường, sống trọn từng ngày như bao người khác.'",
      targetedConcept: "Understanding the foundational step of the happiness formula",
      targetedConceptEn: "Understanding the foundational step of the happiness formula",
      targetedConceptVi: "Hiểu bước nền tảng trong công thức hạnh phúc",
      referenceSegmentIndex: 11,
    },
    {
      id: "mov_rom_01_q4",
      question: "How is the office atmosphere during Tim's first run of the day characterized in Segments 13 to 16?",
      questionEn: "How is the office atmosphere during Tim's first run of the day characterized in Segments 13 to 16?",
      questionVi: "Bầu không khí văn phòng trong lần trải nghiệm ngày đầu tiên của Tim diễn ra thế nào từ Phân đoạn 13 đến 16?",
      options: [
        "Cheerful and celebratory with colleagues congratulating each other.",
        "Tense and stressful, with a demanding boss sharply criticizing Rupert's revised draft.",
        "Quiet and empty because everyone was working remotely.",
        "Chaotic due to an unexpected flood in the archive room."
      ],
      optionsEn: [
        "Cheerful and celebratory with colleagues congratulating each other.",
        "Tense and stressful, with a demanding boss sharply criticizing Rupert's revised draft.",
        "Quiet and empty because everyone was working remotely.",
        "Chaotic due to an unexpected flood in the archive room."
      ],
      optionsVi: [
        "Vui vẻ và ăn mừng khi các đồng nghiệp chúc mừng lẫn nhau.",
        "Căng thẳng và áp lực, với người sếp khó tính thẳng thắn phê bình bản thảo sửa đổi của Rupert.",
        "Yên ắng và vắng vẻ vì mọi người đều làm việc từ xa.",
        "Hỗn loạn do một trận ngập bất ngờ trong phòng lưu trữ hồ sơ."
      ],
      correctAnswer: 1,
      explanation: "In Segments 14 and 15, the boss aggressively asks: 'Rupert, is that the best you can do?' showing the stressful tensions of daily professional life.",
      explanationEn: "In Segments 14 and 15, the boss aggressively asks: 'Rupert, is that the best you can do?' showing the stressful tensions of daily professional life.",
      explanationVi: "Trong Phân đoạn 14 và 15, sếp gay gắt hỏi: 'Rupert, đây là bản tốt nhất cậu có thể làm đấy à?', phản ánh áp lực căng thẳng đặc trưng nơi công sở.",
      targetedConcept: "Workplace stress and tension contrast",
      targetedConceptEn: "Workplace stress and tension contrast",
      targetedConceptVi: "Sự tương phản áp lực nơi công sở trong đời sống thường nhật",
      referenceSegmentIndex: 14,
    },
    {
      id: "mov_rom_01_q5",
      question: "What core advice does 'Part Two' of Dad's plan offer in Segments 36 to 40?",
      questionEn: "What core advice does 'Part Two' of Dad's plan offer in Segments 36 to 40?",
      questionVi: "Lời khuyên cốt lõi trong 'Phần hai' kế hoạch của người cha là gì từ Phân đoạn 36 đến 40?",
      options: [
        "To manipulate court witnesses to win every single trial.",
        "To live every day again almost exactly the same, but the second time consciously noticing how sweet the world can be.",
        "To abandon his legal career and travel across Europe.",
        "To tell Mary the truth about his time travel power."
      ],
      optionsEn: [
        "To manipulate court witnesses to win every single trial.",
        "To live every day again almost exactly the same, but the second time consciously noticing how sweet the world can be.",
        "To abandon his legal career and travel across Europe.",
        "To tell Mary the truth about his time travel power."
      ],
      optionsVi: [
        "Thao túng nhân chứng tại tòa để thắng mọi phiên xét xử.",
        "Sống lại mỗi ngày gần như y hệt, nhưng lần thứ hai hãy chủ động để tâm cảm nhận thế giới ngọt ngào biết bao.",
        "Từ bỏ nghề luật sư và đi du lịch vòng quanh châu Âu.",
        "Nói cho Mary biết sự thật về khả năng du hành thời gian của mình."
      ],
      correctAnswer: 1,
      explanation: "In Segments 37 to 40, Tim explains that Dad advised living each day again: first with tensions/worries, 'but the second time noticing.'",
      explanationEn: "In Segments 37 to 40, Tim explains that Dad advised living each day again: first with tensions/worries, 'but the second time noticing.'",
      explanationVi: "Trong Phân đoạn 37 đến 40, Tim giải thích lời khuyên của cha: lần đầu sống cùng căng thẳng âu lo, nhưng 'lần thứ hai hãy để tâm nhận ra từng điều ấy.'",
      targetedConcept: "Mindfulness and conscious presence",
      targetedConceptEn: "Mindfulness and conscious presence",
      targetedConceptVi: "Thực hành chánh niệm và sự hiện diện trọn vẹn trong từng khoảnh khắc",
      referenceSegmentIndex: 37,
    },
    {
      id: "mov_rom_01_q6",
      question: "How does the cashier at the sandwich shop react to Tim's warmth during his second run in Segment 55?",
      questionEn: "How does the cashier at the sandwich shop react to Tim's warmth during his second run in Segment 55?",
      questionVi: "Cô nhân viên thu ngân tại tiệm sandwich đã phản ứng thế nào trước sự ấm áp của Tim trong lần thứ hai tại Phân đoạn 55?",
      options: [
        "She ignores him because there is a long queue.",
        "She warmly smiles and genuinely wishes him: 'And enjoy the rest of your day.'",
        "She gives him a free sandwich as a bonus.",
        "She asks him for legal advice regarding a parking fine."
      ],
      optionsEn: [
        "She ignores him because there is a long queue.",
        "She warmly smiles and genuinely wishes him: 'And enjoy the rest of your day.'",
        "She gives him a free sandwich as a bonus.",
        "She asks him for legal advice regarding a parking fine."
      ],
      optionsVi: [
        "Cô phớt lờ anh vì hàng người phía sau đang chờ rất đông.",
        "Cô mỉm cười ấm áp và chân thành chúc anh: 'Và chúc anh có một ngày thật vui vẻ nhé.'",
        "Cô tặng anh một chiếc bánh sandwich miễn phí làm phần thưởng.",
        "Cô xin anh lời khuyên pháp lý về một phiếu phạt đỗ xe."
      ],
      correctAnswer: 1,
      explanation: "In Segment 55, touched by Tim's genuine eye contact and polite smile, the cashier warmly says: 'And enjoy the rest of your day.'",
      explanationEn: "In Segment 55, touched by Tim's genuine eye contact and polite smile, the cashier warmly says: 'And enjoy the rest of your day.'",
      explanationVi: "Trong Phân đoạn 55, cảm nhận được ánh mắt chân thành và nụ cười của Tim, cô thu ngân đã ấm áp chúc: 'And enjoy the rest of your day.'",
      targetedConcept: "Reciprocal positive emotional resonance in daily interactions",
      targetedConceptEn: "Reciprocal positive emotional resonance in daily interactions",
      targetedConceptVi: "Sự lan tỏa cảm xúc tích cực hai chiều trong tương tác đời thường",
      referenceSegmentIndex: 55,
    },
    {
      id: "mov_rom_01_q7",
      question: "What does Tim remind his colleague in the courtroom to do in Segment 60 during his second run?",
      questionEn: "What does Tim remind his colleague in the courtroom to do in Segment 60 during his second run?",
      questionVi: "Tim đã nhắc nhở người đồng nghiệp trong phòng xử án làm gì trong lần thứ hai tại Phân đoạn 60?",
      options: [
        "To review their closing legal arguments one more time.",
        "To look around and appreciate how beautiful the courtroom is.",
        "To prepare an appeal in case of a guilty verdict.",
        "To double-check the judge's biographical background."
      ],
      optionsEn: [
        "To review their closing legal arguments one more time.",
        "To look around and appreciate how beautiful the courtroom is.",
        "To prepare an appeal in case of a guilty verdict.",
        "To double-check the judge's biographical background."
      ],
      optionsVi: [
        "Xem lại luận điểm tranh tụng kết thúc thêm một lần nữa.",
        "Ngắm nhìn xung quanh và chiêm ngưỡng vẻ đẹp tráng lệ của căn phòng xử án.",
        "Chuẩn bị đơn kháng cáo phòng khi có phán quyết có tội.",
        "Kiểm tra lại tiểu sử lý lịch của thẩm phán."
      ],
      correctAnswer: 1,
      explanation: "In Segment 60, Tim invites his colleague to pause and wonder: 'Isn't this room beautiful?' noticing the architecture previously ignored.",
      explanationEn: "In Segment 60, Tim invites his colleague to pause and wonder: 'Isn't this room beautiful?' noticing the architecture previously ignored.",
      explanationVi: "Trong Phân đoạn 60, Tim rủ đồng nghiệp dừng lại chiêm ngưỡng: 'Căn phòng này chẳng phải đẹp tuyệt trần sao?', nhận ra vẻ đẹp kiến trúc mà trước đó cả hai đã mù quáng bỏ lỡ.",
      targetedConcept: "Aesthetic appreciation amid high-pressure environments",
      targetedConceptEn: "Aesthetic appreciation amid high-pressure environments",
      targetedConceptVi: "Cảm thụ cái đẹp và thẩm mỹ giữa môi trường áp lực cao",
      referenceSegmentIndex: 60,
    },
    {
      id: "mov_rom_01_q8",
      question: "What humorous reason does Tim give for his sudden change of story when Mary jokingly offers affection in Segment 70?",
      questionEn: "What humorous reason does Tim give for his sudden change of story when Mary jokingly offers affection in Segment 70?",
      questionVi: "Tim đã đưa ra lý do hài hước nào để đột ngột 'quay xe' đổi lời kể khi Mary trêu sẽ bù đắp tình cảm ở Phân đoạn 70?",
      options: [
        "He admits he was just playing a game of chess with his father.",
        "Hearing she might offer intimacy to comfort a bad day, he immediately invents getting fired and killing a man to have the 'worst day ever.'",
        "He claims he lost his wallet on the subway.",
        "He confesses he accidentally bought the wrong groceries."
      ],
      optionsEn: [
        "He admits he was just playing a game of chess with his father.",
        "Hearing she might offer intimacy to comfort a bad day, he immediately invents getting fired and killing a man to have the 'worst day ever.'",
        "He claims he lost his wallet on the subway.",
        "He confesses he accidentally bought the wrong groceries."
      ],
      optionsVi: [
        "Anh thừa nhận vừa chơi một ván cờ vua với bố.",
        "Nghe cô nói có thể sẽ ngủ cùng để an ủi nếu có ngày tồi tệ, anh lập tức bịa ra việc bị đuổi việc và giết người để trở thành 'ngày tồi tệ nhất trần đời.'",
        "Anh bảo anh bị mất ví trên tàu điện ngầm.",
        "Anh thú nhận đã vô tình mua nhầm đồ tạp hóa."
      ],
      correctAnswer: 1,
      explanation: "In Segments 70 to 76, Mary jokes about intimacy as comfort, prompting Tim to hilariously exaggerate: 'I got fired from my job. And then I killed a man.'",
      explanationEn: "In Segments 70 to 76, Mary jokes about intimacy as comfort, prompting Tim to hilariously exaggerate: 'I got fired from my job. And then I killed a man.'",
      explanationVi: "Từ Phân đoạn 70 đến 76, khi Mary trêu sẽ bù đắp bằng tình cảm, Tim lập tức phóng đại siêu hài hước: 'Anh vừa bị đuổi việc xong. Và rồi anh còn vừa ngộ sát một người nữa.'",
      targetedConcept: "Playful romantic banter and humorous situational reversal",
      targetedConceptEn: "Playful romantic banter and humorous situational reversal",
      targetedConceptVi: "Nghệ thuật đối thoại dí dỏm và đảo ngược tình huống hài hước trong tình yêu",
      referenceSegmentIndex: 70,
    },
  ],
};

const lessonData: MockVideoLesson = {
  id: "mov_rom_01",
  slug: "about-time-extraordinary-ordinary-life",
  title: "About Time: Tim Learns the Secret Formula for Happiness (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "05:23",
  durationSeconds: 323,
  externalId: "iUB-sCiZIUw",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/iUB-sCiZIUw/hqdefault.jpg",
  accent: "British (RP)",
  wpmSpeed: 130,
  viewCount: 554186,
  studyCount: 2540,
  description:
    "Trích đoạn kinh điển đầy cảm xúc và triết lý sống từ kiệt tác About Time: Tim được người cha (Bill Nighy) truyền lại 'Công thức bí mật hai bước để đạt được hạnh phúc'. Bằng cách sống lại ngày thứ hai trọn vẹn trong chánh niệm, Tim học cách buông bỏ căng thẳng, mỉm cười với mọi người xung quanh và trân trọng từng khoảnh khắc ngọt ngào bên Mary.",
  segments: calculatedSegments,
};

// Generate TypeScript file
const targetFilePath = path.resolve(
  __dirname,
  "../features/listening/data/lessons/movies/romance/lesson_about_time.ts"
);

const tsContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: About Time: Tim Learns the Secret Formula for Happiness (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B2 | British (RP)
 * YouTube ID: iUB-sCiZIUw (05:23 - 323s)
 * Views: 554,186 | Likes: 7,400+
 * 
 * BÁM SÁT 100% TIMELINE, TẤT CẢ 83 CÂU THOẠI NGUYÊN BẢN CỦA TOÀN BỘ VIDEO (KHÔNG BỎ SÓT)
 * ZERO MERGED UTTERANCES - TÁCH ĐỘC LẬP TỪNG LƯỢT THOẠI CỦA MỖI NHÂN VẬT
 * ============================================================================
 */

export const QUIZ_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE: VideoQuizData = ${JSON.stringify(
  quizData,
  null,
  2
)};

export const LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE: MockVideoLesson = {
  id: "mov_rom_01",
  slug: "about-time-extraordinary-ordinary-life",
  title: "About Time: Tim Learns the Secret Formula for Happiness (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "05:23",
  durationSeconds: 323,
  externalId: "iUB-sCiZIUw",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/iUB-sCiZIUw/hqdefault.jpg",
  accent: "British (RP)",
  wpmSpeed: 130,
  viewCount: 554186,
  studyCount: 2540,
  description:
    "Trích đoạn kinh điển đầy cảm xúc và triết lý sống từ kiệt tác About Time: Tim được người cha (Bill Nighy) truyền lại 'Công thức bí mật hai bước để đạt được hạnh phúc'. Bằng cách sống lại ngày thứ hai trọn vẹn trong chánh niệm, Tim học cách buông bỏ căng thẳng, mỉm cười với mọi người xung quanh và trân trọng từng khoảnh khắc ngọt ngào bên Mary.",
  segments: ${JSON.stringify(calculatedSegments, null, 2)}
};
`;

fs.writeFileSync(targetFilePath, tsContent, "utf-8");
console.log(`Successfully generated ${targetFilePath} with ${calculatedSegments.length} Pure Master Segments!`);
