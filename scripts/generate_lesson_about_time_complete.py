import json
import re

from build_28_segments import segments_data

for seg in segments_data:
    words = re.findall(r"\b[\w'-]+\b", seg["text"])
    seg["tokenCount"] = len(words)

ts_content = '''import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: About Time: Tim Learns the Secret Formula for Happiness (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B2 | British (RP)
 * YouTube ID: iUB-sCiZIUw (05:23 - 323s)
 * Views: 554,186 | Likes: 7,400+
 * 
 * BÁM SÁT 100% TIMELINE, TẤT CẢ 76 CÂU THOẠI NGUYÊN BẢN CỦA TOÀN BỘ VIDEO (KHÔNG BỎ SÓT)
 * ============================================================================
 */

export const QUIZ_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE: VideoQuizData = {
  lessonId: "mov_rom_01",
  lessonTitle: "About Time: Tim Learns the Secret Formula for Happiness (Full Master Cut)",
  totalQuestions: 6,
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "mov_rom_01_q1",
      question: "What is 'Part One' of the father's secret formula for happiness?",
      questionEn: "What is 'Part One' of the father's secret formula for happiness?",
      questionVi: "Bước một trong công thức hạnh phúc bí mật của người cha là gì?",
      options: [
        "To travel back in time every morning to win the lottery.",
        "To just get on with ordinary life, living it day by day like anyone else.",
        "To avoid all difficult cases at the courtroom.",
        "To read all classical literature books in the family library."
      ],
      optionsEn: [
        "To travel back in time every morning to win the lottery.",
        "To just get on with ordinary life, living it day by day like anyone else.",
        "To avoid all difficult cases at the courtroom.",
        "To read all classical literature books in the family library."
      ],
      optionsVi: [
        "Quay ngược thời gian mỗi sáng để trúng xổ số.",
        "Cứ tiếp tục sống một cuộc đời bình thường, sống trọn từng ngày như bao người khác.",
        "Tránh mọi vụ kiện phức tạp tại phòng xử án.",
        "Đọc tất cả sách văn học cổ điển trong thư viện gia đình."
      ],
      correctAnswer: 1,
      explanation: "In Segment 5, Tim states: 'Part one of the two part plan was that I should just get on with ordinary life, living it day by day, like anyone else.'",
      explanationEn: "In Segment 5, Tim states: 'Part one of the two part plan was that I should just get on with ordinary life, living it day by day, like anyone else.'",
      explanationVi: "Trong Phân đoạn 5, Tim kể lại: 'Phần một trong kế hoạch hai bước là tôi cứ tiếp tục sống một cuộc sống bình thường, sống trọn từng ngày như bao người khác.'",
      targetedConcept: "Understanding the first step of happiness formula",
      targetedConceptEn: "Understanding the first step of happiness formula",
      targetedConceptVi: "Hiểu bước đầu tiên của công thức hạnh phúc",
      referenceSegmentIndex: 5,
    },
    {
      id: "mov_rom_01_q2",
      question: "What metaphor did the father use to emphasize the supreme importance of this secret?",
      questionEn: "What metaphor did the father use to emphasize the supreme importance of this secret?",
      questionVi: "Người cha đã dùng hình ảnh ẩn dụ nào để nhấn mạnh tầm quan trọng tối thượng của bí mật này?",
      options: [
        "The golden ticket.",
        "The real mothership.",
        "The fountain of youth.",
        "The holy grail."
      ],
      optionsEn: [
        "The golden ticket.",
        "The real mothership.",
        "The fountain of youth.",
        "The holy grail."
      ],
      optionsVi: [
        "Tấm vé vàng may mắn.",
        "Tàu mẹ đích thực (Bí mật gốc rễ tối thượng).",
        "Suối nguồn tươi trẻ.",
        "Chén thánh quyền năng."
      ],
      correctAnswer: 1,
      explanation: "In Segment 3, the father calls this life wisdom 'The real mothership'—meaning the core, foundational secret that matters far more than just time travel.",
      explanationEn: "In Segment 3, the father calls this life wisdom 'The real mothership'—meaning the core, foundational secret that matters far more than just time travel.",
      explanationVi: "Trong Phân đoạn 3, người cha gọi bí quyết nhân sinh này là 'The real mothership' (con tàu mẹ đích thực) - nghĩa là bí mật nền tảng và cốt lõi nhất.",
      targetedConcept: "Metaphorical language in British cinema dialogue",
      targetedConceptEn: "Metaphorical language in British cinema dialogue",
      targetedConceptVi: "Nắm bắt ngôn ngữ ẩn dụ đặc sắc trong thoại phim Anh",
      referenceSegmentIndex: 3,
    },
    {
      id: "mov_rom_01_q3",
      question: "What does the father advise Tim to do in 'Part Two' of the plan?",
      questionEn: "What does the father advise Tim to do in 'Part Two' of the plan?",
      questionVi: "Người cha khuyên Tim làm gì trong bước hai của kế hoạch?",
      options: [
        "To change every past mistake to make huge profits.",
        "To live every day again almost exactly the same, but this time noticing how sweet the world can be.",
        "To quit his job as a lawyer immediately.",
        "To travel fifty years into the future."
      ],
      optionsEn: [
        "To change every past mistake to make huge profits.",
        "To live every day again almost exactly the same, but this time noticing how sweet the world can be.",
        "To quit his job as a lawyer immediately.",
        "To travel fifty years into the future."
      ],
      optionsVi: [
        "Thay đổi mọi sai lầm quá khứ để kiếm lợi nhuận khổng lồ.",
        "Sống lại mỗi ngày gần như y hệt, nhưng lần này hãy để tâm cảm nhận thế giới ngọt ngào đến nhường nào.",
        "Nghỉ việc luật sư ngay lập tức.",
        "Du hành năm mươi năm tới tương lai."
      ],
      correctAnswer: 1,
      explanation: "In Segments 17 and 18, Tim explains that part two is to live each day again, noticing the sweetness of the world that was missed due to tensions and worries.",
      explanationEn: "In Segments 17 and 18, Tim explains that part two is to live each day again, noticing the sweetness of the world that was missed due to tensions and worries.",
      explanationVi: "Trong Phân đoạn 17 và 18, Tim giải thích phần hai là sống lại từng ngày, để tâm nhận ra vẻ ngọt ngào của thế giới từng bị căng thẳng và lo âu che lấp.",
      targetedConcept: "Core philosophy of the movie",
      targetedConceptEn: "Core philosophy of the movie",
      targetedConceptVi: "Triết lý cốt lõi của tác phẩm",
      referenceSegmentIndex: 18,
    },
    {
      id: "mov_rom_01_q4",
      question: "How did Tim's behavior change during his second run of the day?",
      questionEn: "How did Tim's behavior change during his second run of the day?",
      questionVi: "Hành vi và tâm thế của Tim đã thay đổi thế nào trong lần sống lại thứ hai của ngày hôm đó?",
      options: [
        "He became angry and yelled at his colleagues.",
        "He relaxed, smiled with the cashier, shared warmth with his colleague, and celebrated the trial verdict.",
        "He skipped work completely and stayed in bed.",
        "He bought lots of lottery tickets."
      ],
      optionsEn: [
        "He became angry and yelled at his colleagues.",
        "He relaxed, smiled with the cashier, shared warmth with his colleague, and celebrated the trial verdict.",
        "He skipped work completely and stayed in bed.",
        "He bought lots of lottery tickets."
      ],
      optionsVi: [
        "Anh trở nên tức giận và quát tháo đồng nghiệp.",
        "Anh thư thái, mỉm cười với cô thu ngân, truyền sự ấm áp cho đồng nghiệp và hân hoan đón nhận phán quyết của phiên tòa.",
        "Anh trốn làm hoàn toàn và nằm lì trên giường.",
        "Anh mua rất nhiều vé số."
      ],
      correctAnswer: 1,
      explanation: "In Segments 20, 21, and 22, Tim replaces his previous rushing and tension with mindfulness, gratitude, and warm smiles.",
      explanationEn: "In Segments 20, 21, and 22, Tim replaces his previous rushing and tension with mindfulness, gratitude, and warm smiles.",
      explanationVi: "Trong các Phân đoạn 20, 21 và 22, Tim thay thế sự vội vã căng thẳng bằng chánh niệm, lòng biết ơn và nụ cười ấm áp với mọi người xung quanh.",
      targetedConcept: "Mindfulness and gratitude in daily routine",
      targetedConceptEn: "Mindfulness and gratitude in daily routine",
      targetedConceptVi: "Thực hành chánh niệm và biết ơn trong đời sống thường nhật",
      referenceSegmentIndex: 21,
    },
    {
      id: "mov_rom_01_q5",
      question: "Why did Mary jokingly offer to sleep with Tim, and how did Tim instantly react?",
      questionEn: "Why did Mary jokingly offer to sleep with Tim, and how did Tim instantly react?",
      questionVi: "Tại sao Mary lại bông đùa sẽ ngủ cùng Tim, và Tim đã phản ứng tức thì thế nào?",
      options: [
        "She was celebrating a promotion; Tim ignored her.",
        "She thought she would compensate if he had had a bad day; Tim instantly claimed he got fired and killed a man.",
        "She wanted him to do the dishes; Tim refused.",
        "She noticed he was rich; Tim gave her money."
      ],
      optionsEn: [
        "She was celebrating a promotion; Tim ignored her.",
        "She thought she would compensate if he had had a bad day; Tim instantly claimed he got fired and killed a man.",
        "She wanted him to do the dishes; Tim refused.",
        "She noticed he was rich; Tim gave her money."
      ],
      optionsVi: [
        "Cô muốn ăn mừng thăng chức; Tim phớt lờ cô.",
        "Cô nghĩ sẽ bù đắp nếu anh vừa có ngày tồi tệ; Tim lập tức 'quay xe' bịa rằng anh bị đuổi việc và giết người.",
        "Cô muốn anh rửa bát; Tim từ chối.",
        "Cô thấy anh giàu có; Tim cho cô tiền."
      ],
      correctAnswer: 1,
      explanation: "In Segments 24 and 25, Mary jokingly offers comfort, and Tim humorously exaggerates his day into a catastrophe to receive affection.",
      explanationEn: "In Segments 24 and 25, Mary jokingly offers comfort, and Tim humorously exaggerates his day into a catastrophe to receive affection.",
      explanationVi: "Trong Phân đoạn 24 và 25, Mary nửa đùa nửa thật muốn an ủi nếu Tim có ngày tồi tệ, và Tim lập tức phóng đại ngày của mình thành thảm họa để được người yêu yêu thương.",
      targetedConcept: "Playful romantic banter and humorous reversal",
      targetedConceptEn: "Playful romantic banter and humorous reversal",
      targetedConceptVi: "Nghệ thuật đối đáp dí dỏm và tình cảm trong tình yêu",
      referenceSegmentIndex: 25,
    },
    {
      id: "mov_rom_01_q6",
      question: "What is the ultimate lesson Tim learns about time travel by the conclusion of the film?",
      questionEn: "What is the ultimate lesson Tim learns about time travel by the conclusion of the film?",
      questionVi: "Bài học lớn nhất mà Tim rút ra về du hành thời gian ở phần kết của bộ phim là gì?",
      options: [
        "To constantly revisit the past to avoid any suffering.",
        "To live every single day as if it were the final day of his extraordinary, ordinary life without needing to go back.",
        "To keep time travel a permanent secret from everyone.",
        "To build a machine to take Mary back to her childhood."
      ],
      optionsEn: [
        "To constantly revisit the past to avoid any suffering.",
        "To live every single day as if it were the final day of his extraordinary, ordinary life without needing to go back.",
        "To keep time travel a permanent secret from everyone.",
        "To build a machine to take Mary back to her childhood."
      ],
      optionsVi: [
        "Liên tục quay lại quá khứ để tránh mọi đau khổ.",
        "Sống trọn vẹn từng ngày như thể đó là ngày cuối cùng của cuộc đời bình thường mà phi thường, không cần phải quay lại nữa.",
        "Giữ kín vĩnh viễn bí mật du hành thời gian với mọi người.",
        "Chế tạo cỗ máy đưa Mary về thời thơ ấu."
      ],
      correctAnswer: 1,
      explanation: "Tim ultimately surpasses even his father's advice: he no longer travels back at all, relishing each ordinary moment as extraordinary.",
      explanationEn: "Tim ultimately surpasses even his father's advice: he no longer travels back at all, relishing each ordinary moment as extraordinary.",
      explanationVi: "Tim cuối cùng vượt qua cả lời khuyên của cha: anh không cần quay lại quá khứ nữa, mà tận hưởng trọn vẹn từng khoảnh khắc đời thường như một món quà phi thường.",
      targetedConcept: "Theme synthesis of About Time",
      targetedConceptEn: "Theme synthesis of About Time",
      targetedConceptVi: "Tổng hợp thông điệp nhân sinh cốt lõi của kiệt tác About Time",
      referenceSegmentIndex: 27,
    },
  ],
};

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
  segments: ''' + json.dumps(segments_data, ensure_ascii=False, indent=4) + ''',
  quiz: QUIZ_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE,
};

export default LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE;
'''

with open('features/listening/data/lessons/movies/romance/lesson_about_time.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Successfully written 28 segments full coverage to lesson_about_time.ts!")
