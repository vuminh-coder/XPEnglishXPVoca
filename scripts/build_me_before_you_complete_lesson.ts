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

const rawPath = path.resolve(__dirname, "me_before_you_raw_segments.json");
const rawData: RawSegment[] = JSON.parse(fs.readFileSync(rawPath, "utf-8"));

console.log(`Loaded ${rawData.length} raw segments.`);

const calculatedSegments = rawData.map((seg, idx) => {
  const tokens = tokenizeSentence(seg.text, seg.properNouns);
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
  lessonId: "mov_rom_06",
  lessonTitle: "Me Before You: Lou and Will's Heartfelt Journey & Emotional Bonds",
  totalQuestions: 8,
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "mov_rom_06_q1",
      question: "How does Patrick attempt to motivate Louisa after she loses her job at the tea shop?",
      questionEn: "How does Patrick attempt to motivate Louisa after she loses her job at the tea shop?",
      questionVi: "Patrick đã cố gắng động viên Louisa như thế nào sau khi cô mất việc tại quán trà?",
      options: [
        "He suggests taking a one-year gap year across South America.",
        "He compares her situation to entrepreneurs fighting their way back from rock bottom.",
        "He encourages her to stay home and focus entirely on marathon training.",
        "He urges her to open an online bakery immediately."
      ],
      optionsEn: [
        "He suggests taking a one-year gap year across South America.",
        "He compares her situation to entrepreneurs fighting their way back from rock bottom.",
        "He encourages her to stay home and focus entirely on marathon training.",
        "He urges her to open an online bakery immediately."
      ],
      optionsVi: [
        "Anh khuyên cô nên nghỉ một năm xả hơi du lịch khắp Nam Mỹ.",
        "Anh so sánh tình cảnh của cô với những doanh nhân tự lực chiến đấu vươn lên từ đáy vực sâu.",
        "Anh khuyến khích cô chỉ nên ở nhà và tập trung toàn thời gian luyện tập chạy marathon.",
        "Anh thúc ép cô mở ngay một tiệm bánh ngọt trực tuyến."
      ],
      correctAnswer: 1,
      explanation: "In Segment 3, Patrick says: 'You can't just mope around. All the best entrepreneurs, they fight their way back from rock bottom. Look at me!'",
      explanationEn: "In Segment 3, Patrick says: 'You can't just mope around. All the best entrepreneurs, they fight their way back from rock bottom. Look at me!'",
      explanationVi: "Trong Phân đoạn 3, Patrick khuyên: 'Em không thể cứ ủ rũ mãi thế được. Mọi doanh nhân cừ khôi nhất đều tự lực vươn lên từ đáy vực sâu đấy thôi. Nhìn anh mà xem!'",
      targetedConcept: "Character contrast and pragmatic motivation vs realistic struggle",
      targetedConceptEn: "Character contrast and pragmatic motivation vs realistic struggle",
      targetedConceptVi: "Sự đối lập tính cách và động lực thực tế so với khó khăn đời thực",
      referenceSegmentIndex: 3,
    },
    {
      id: "mov_rom_06_q2",
      question: "On what contractual ground does Louisa assert her right to remain employed when Will threatens to dismiss her?",
      questionEn: "On what contractual ground does Louisa assert her right to remain employed when Will threatens to dismiss her?",
      questionVi: "Dựa vào cơ sở hợp đồng nào mà Louisa khẳng định quyền ở lại làm việc khi Will đe dọa đuổi cô đi?",
      options: [
        "She signed an unbreakable long-term government healthcare contract.",
        "She is employed directly by his mother Camilla, not by Will himself.",
        "She owns shared equity in the Traynor castle estate.",
        "She is a close relative of his attending physician Nathan."
      ],
      optionsEn: [
        "She signed an unbreakable long-term government healthcare contract.",
        "She is employed directly by his mother Camilla, not by Will himself.",
        "She owns shared equity in the Traynor castle estate.",
        "She is a close relative of his attending physician Nathan."
      ],
      optionsVi: [
        "Cô đã ký một hợp đồng y tế dài hạn không thể hủy ngang của chính phủ.",
        "Cô được thuê trực tiếp bởi mẹ anh là bà Camilla, chứ không phải bởi chính Will.",
        "Cô sở hữu cổ phần chung trong dinh thự lâu đài nhà Traynor.",
        "Cô là họ hàng thân thiết của điều dưỡng Nathan chăm sóc anh."
      ],
      correctAnswer: 1,
      explanation: "In Segment 18, Louisa stands her ground: 'I'm not employed by you, I'm employed by your mother. So unless she says she doesn't want me here anymore, I'm staying.'",
      explanationEn: "In Segment 18, Louisa stands her ground: 'I'm not employed by you, I'm employed by your mother. So unless she says she doesn't want me here anymore, I'm staying.'",
      explanationVi: "Trong Phân đoạn 18, Louisa khẳng định: 'Tôi không làm thuê cho anh, tôi làm thuê cho mẹ anh. Cho nên trừ khi bà ấy bảo không cần tôi ở đây nữa, tôi vẫn sẽ ở lại.'",
      targetedConcept: "Independence and resilience against emotional hostility",
      targetedConceptEn: "Independence and resilience against emotional hostility",
      targetedConceptVi: "Sự độc lập và kiên cường trước thái độ thù địch phòng thủ",
      referenceSegmentIndex: 18,
    },
    {
      id: "mov_rom_06_q3",
      question: "How does Will humorously satirize the lack of ambition and dullness in their small English town?",
      questionEn: "How does Will humorously satirize the lack of ambition and dullness in their small English town?",
      questionVi: "Will đã châm biếm một cách hài hước sự thiếu vắng hoài bão và tẻ nhạt của thị trấn miền quê như thế nào?",
      options: [
        "By stating that the local cinema only screens black-and-white silent movies.",
        "By claiming locals consider excitement to be a new 'please be quiet' sign in the library.",
        "By pointing out that the tea shop serves only stale buttered buns.",
        "By complaining that the castle gates close at sunset every evening."
      ],
      optionsEn: [
        "By stating that the local cinema only screens black-and-white silent movies.",
        "By claiming locals consider excitement to be a new 'please be quiet' sign in the library.",
        "By pointing out that the tea shop serves only stale buttered buns.",
        "By complaining that the castle gates close at sunset every evening."
      ],
      optionsVi: [
        "Bằng cách bảo rằng rạp chiếu phim địa phương chỉ chiếu phim câm đen trắng.",
        "Bằng cách nhận xét rằng người dân ở đây coi sự phấn khích là tấm biển 'xin giữ im lặng' mới trong thư viện.",
        "Bằng cách chỉ ra rằng quán trà chỉ phục vụ bánh nướng bơ cũ.",
        "Bằng cách phàn nàn rằng cổng lâu đài đóng vào lúc hoàng hôn mỗi chiều."
      ],
      correctAnswer: 1,
      explanation: "In Segment 30, Will quips: 'People here think excitement is a new \"please be quiet\" sign going up in the library.'",
      explanationEn: "In Segment 30, Will quips: 'People here think excitement is a new \"please be quiet\" sign going up in the library.'",
      explanationVi: "Trong Phân đoạn 30, Will châm biếm: 'Mọi người ở đây cứ ngỡ sự phấn khích tột cùng là việc thư viện dựng thêm một tấm biển mới ghi \"xin hãy giữ im lặng\".'",
      targetedConcept: "British irony and social satire of provincial stagnation",
      targetedConceptEn: "British irony and social satire of provincial stagnation",
      targetedConceptVi: "Sự châm biếm thâm thúy đậm chất Anh về cuộc sống buồn tẻ nơi tỉnh lẻ",
      referenceSegmentIndex: 30,
    },
    {
      id: "mov_rom_06_q4",
      question: "What timeless life philosophy does Will impart to Louisa regarding her horizons and duty to herself?",
      questionEn: "What timeless life philosophy does Will impart to Louisa regarding her horizons and duty to herself?",
      questionVi: "Triết lý sống bất hủ nào mà Will đã truyền dạy cho Louisa về tầm nhìn và bổn phận với chính bản thân cô?",
      options: [
        "Family obligations should always take precedence over personal dreams.",
        "You only get one life, and it's actually your duty to live it as fully as possible.",
        "Financial security is the sole measure of happiness in modern society.",
        "Comfort and familiarity are preferable to uncertain adventure abroad."
      ],
      optionsEn: [
        "Family obligations should always take precedence over personal dreams.",
        "You only get one life, and it's actually your duty to live it as fully as possible.",
        "Financial security is the sole measure of happiness in modern society.",
        "Comfort and familiarity are preferable to uncertain adventure abroad."
      ],
      optionsVi: [
        "Bổn phận gia đình luôn luôn phải được ưu tiên hàng đầu trước ước mơ cá nhân.",
        "Cô chỉ có một cuộc đời để sống, và bổn phận của cô là phải sống nó một cách trọn vẹn nhất có thể.",
        "Sự an toàn tài chính là thước đo duy nhất của hạnh phúc trong xã hội hiện đại.",
        "Sự thoải mái và quen thuộc luôn tốt hơn những chuyến phiêu lưu bất định ở xứ người."
      ],
      correctAnswer: 1,
      explanation: "In Segment 43, Will delivers the film's core moral: 'You only get one life. It's actually your duty to live it as fully as possible.'",
      explanationEn: "In Segment 43, Will delivers the film's core moral: 'You only get one life. It's actually your duty to live it as fully as possible.'",
      explanationVi: "Trong Phân đoạn 43, Will nhắn nhủ thông điệp cốt lõi: 'Cô chỉ có một cuộc đời để sống thôi. Bổn phận của cô là phải sống nó một cách trọn vẹn nhất có thể.'",
      targetedConcept: "Existential empowerment and philosophical thematic core",
      targetedConceptEn: "Existential empowerment and philosophical thematic core",
      targetedConceptVi: "Triết lý trao quyền sống trọn vẹn và thông điệp nhân văn cốt lõi",
      referenceSegmentIndex: 43,
    },
    {
      id: "mov_rom_06_q5",
      question: "What specific childhood garment does Louisa describe as her all-time favorite outfit?",
      questionEn: "What specific childhood garment does Louisa describe as her all-time favorite outfit?",
      questionVi: "Món trang phục thời thơ ấu đặc biệt nào được Louisa miêu tả là bộ đồ cô yêu thích nhất từ trước đến nay?",
      options: [
        "A velvet Victorian gown worn during school plays.",
        "Glittery wellies paired with bumblebee tights featuring big horizontal stripes.",
        "A bright yellow rain jacket with polka dot scarves.",
        "Handmade leprechaun shoes knitted by her grandmother."
      ],
      optionsEn: [
        "A velvet Victorian gown worn during school plays.",
        "Glittery wellies paired with bumblebee tights featuring big horizontal stripes.",
        "A bright yellow rain jacket with polka dot scarves.",
        "Handmade leprechaun shoes knitted by her grandmother."
      ],
      optionsVi: [
        "Chiếc váy nhung thời Victoria mặc trong các vở kịch của trường.",
        "Đôi ủng đi mưa lấp lánh kết hợp với chiếc quần tất sọc ong vò vẽ với các đường sọc ngang bản to.",
        "Chiếc áo mưa vàng tươi phối cùng khăn quàng chấm bi.",
        "Đôi giày yêu tinh tự làm được đan bởi bà ngoại cô."
      ],
      correctAnswer: 1,
      explanation: "In Segments 49 and 51, Louisa explains: 'My favorite outfit was the glittery boots and my bumblebee tights... Black and yellow stripes. Big horizontal stripes.'",
      explanationEn: "In Segments 49 and 51, Louisa explains: 'My favorite outfit was the glittery boots and my bumblebee tights... Black and yellow stripes. Big horizontal stripes.'",
      explanationVi: "Trong Phân đoạn 49 và 51, Louisa chia sẻ: 'Bộ đồ yêu thích nhất của em là đôi bốt lấp lánh ấy cùng chiếc quần tất sọc ong vò vẽ... Sọc vàng đen. Những đường sọc ngang bản to ấy.'",
      targetedConcept: "Iconic narrative motif of authentic joy and innocence",
      targetedConceptEn: "Iconic narrative motif of authentic joy and innocence",
      targetedConceptVi: "Biểu tượng hình tượng quần tất ong vò vẽ đại diện cho niềm vui thuần khiết",
      referenceSegmentIndex: 49,
    },
    {
      id: "mov_rom_06_q6",
      question: "Why does Will refuse Louisa's spontaneous idea of taking the Eurostar to Paris?",
      questionEn: "Why does Will refuse Louisa's spontaneous idea of taking the Eurostar to Paris?",
      questionVi: "Tại sao Will từ chối ý định bột phát của Louisa về việc đi tàu Eurostar sang Paris?",
      options: [
        "He has an expired British passport and cannot travel abroad.",
        "He wants to preserve his pristine memories of Paris as his former capable self rather than endure logistical indignities in a wheelchair.",
        "He dislikes French cuisine and classical music.",
        "He was advised by Dr. Nathan that international flights are prohibited."
      ],
      optionsEn: [
        "He has an expired British passport and cannot travel abroad.",
        "He wants to preserve his pristine memories of Paris as his former capable self rather than endure logistical indignities in a wheelchair.",
        "He dislikes French cuisine and classical music.",
        "He was advised by Dr. Nathan that international flights are prohibited."
      ],
      optionsVi: [
        "Hộ chiếu Anh của anh đã hết hạn và không thể xuất cảnh ra nước ngoài.",
        "Anh muốn lưu giữ nguyên vẹn ký ức tươi đẹp về Paris với tư cách con người khỏe mạnh ngày xưa thay vì phải chịu đựng nỗi khổ sở và thiếu phẩm giá trên chiếc xe lăn.",
        "Anh không thích ẩm thực Pháp và âm nhạc cổ điển.",
        "Bác sĩ Nathan đã cảnh báo nghiêm ngặt về việc cấm các chuyến bay quốc tế."
      ],
      correctAnswer: 1,
      explanation: "In Segments 65 and 68, Will explains he wants to remember Paris 'as me, the old me' and not have those memories 'erased by the struggle to fit behind the table' and wheelchair issues.",
      explanationEn: "In Segments 65 and 68, Will explains he wants to remember Paris 'as me, the old me' and not have those memories 'erased by the struggle to fit behind the table' and wheelchair issues.",
      explanationVi: "Trong Phân đoạn 65 và 68, Will giải thích anh muốn đến Paris với tư cách 'con người cũ của tôi ngày trước', không muốn ký ức bị xóa nhòa bởi những bất tiện tủi hổ của chiếc xe lăn.",
      targetedConcept: "Personal dignity, bodily autonomy, and psychological coping with disability",
      targetedConceptEn: "Personal dignity, bodily autonomy, and psychological coping with disability",
      targetedConceptVi: "Phẩm giá cá nhân, sự tự chủ thể xác và tâm lý đối diện với thương tật",
      referenceSegmentIndex: 65,
    },
    {
      id: "mov_rom_06_q7",
      question: "What deeply touching confession does Will whisper to Louisa while spinning across the dance floor at Alicia's wedding?",
      questionEn: "What deeply touching confession does Will whisper to Louisa while spinning across the dance floor at Alicia's wedding?",
      questionVi: "Lời thổ lộ sâu sắc và xúc động nào mà Will đã thì thầm với Louisa khi cả hai cùng xoay tròn trên sàn khiêu vũ tại đám cưới của Alicia?",
      options: [
        "He promises to buy her a luxury apartment in central London.",
        "She is pretty much the only thing that makes him want to get up in the morning.",
        "He decided to invest all his hedge fund wealth in Patrick's gym company.",
        "He wishes they had never attended the wedding reception."
      ],
      optionsEn: [
        "He promises to buy her a luxury apartment in central London.",
        "She is pretty much the only thing that makes him want to get up in the morning.",
        "He decided to invest all his hedge fund wealth in Patrick's gym company.",
        "He wishes they had never attended the wedding reception."
      ],
      optionsVi: [
        "Anh hứa sẽ mua cho cô một căn hộ sang trọng tại trung tâm London.",
        "Cô gần như là điều duy nhất khiến anh muốn thức dậy vào mỗi buổi sáng.",
        "Anh quyết định đầu tư toàn bộ tài sản quỹ phòng hộ của mình vào công ty thể hình của Patrick.",
        "Anh ước rằng hai người đã không bao giờ tham dự buổi tiệc cưới này."
      ],
      correctAnswer: 1,
      explanation: "In Segment 107, Will reveals his profound emotional dependence and devotion: 'You know, Clark... you are pretty much the only thing that makes me want to get up in the morning.'",
      explanationEn: "In Segment 107, Will reveals his profound emotional dependence and devotion: 'You know, Clark... you are pretty much the only thing that makes me want to get up in the morning.'",
      explanationVi: "Trong Phân đoạn 107, Will thổ lộ tình cảm chân thành: 'Em biết không, Clark... em gần như là điều duy nhất khiến anh muốn thức dậy vào mỗi buổi sáng.'",
      targetedConcept: "Emotional climax on the dance floor and transformative romantic devotion",
      targetedConceptEn: "Emotional climax on the dance floor and transformative romantic devotion",
      targetedConceptVi: "Đỉnh cao cảm xúc trên sàn khiêu vũ và sự tận tụy biến chuyển tâm hồn của tình yêu",
      referenceSegmentIndex: 107,
    },
    {
      id: "mov_rom_06_q8",
      question: "Why does Will ask to linger in the car outside the castle for 'just a few minutes more' after the concert?",
      questionEn: "Why does Will ask to linger in the car outside the castle for 'just a few minutes more' after the concert?",
      questionVi: "Tại sao Will lại xin được nán lại trong xe trước lâu đài thêm 'chỉ vài phút nữa thôi' sau đêm hòa nhạc?",
      options: [
        "He is waiting for the driveway lights to be turned on by the staff.",
        "He wants to prolong the blissful illusion of being simply a man who has been to a concert with a girl in a red dress.",
        "His wheelchair battery requires another twenty minutes of rapid charging in the vehicle.",
        "He intends to avoid encountering his mother inside the castle hallway."
      ],
      optionsEn: [
        "He is waiting for the driveway lights to be turned on by the staff.",
        "He wants to prolong the blissful illusion of being simply a man who has been to a concert with a girl in a red dress.",
        "His wheelchair battery requires another twenty minutes of rapid charging in the vehicle.",
        "He intends to avoid encountering his mother inside the castle hallway."
      ],
      optionsVi: [
        "Anh đang chờ người làm bật đèn chiếu sáng ở lối vào lâu đài.",
        "Anh muốn kéo dài thêm khoảnh khắc hạnh phúc diệu kỳ được là một người đàn ông bình thường vừa đi xem hòa nhạc về cùng cô gái mặc chiếc váy đỏ.",
        "Ắc quy xe lăn của anh cần thêm hai mươi phút sạc nhanh trong xe hơi.",
        "Anh muốn tránh chạm mặt mẹ mình ở hành lang lâu đài."
      ],
      correctAnswer: 1,
      explanation: "In Segment 124, Will reveals his deepest romantic longing: 'I just want to be a man who's been to a concert with a girl in a red dress. Just a few minutes more.'",
      explanationEn: "In Segment 124, Will reveals his deepest romantic longing: 'I just want to be a man who's been to a concert with a girl in a red dress. Just a few minutes more.'",
      explanationVi: "Trong Phân đoạn 124, Will thổ lộ: 'Tôi chỉ muốn được làm một người đàn ông vừa đi xem hòa nhạc về cùng một cô gái mặc chiếc váy đỏ. Chỉ vài phút nữa thôi.'",
      targetedConcept: "Climactic romantic poignancy and emotional transformation through love",
      targetedConceptEn: "Climactic romantic poignancy and emotional transformation through love",
      targetedConceptVi: "Đỉnh cao cảm xúc lãng mạn và sự biến chuyển tâm hồn kỳ diệu qua tình yêu",
      referenceSegmentIndex: 124,
    },
  ],
};

const lessonData: MockVideoLesson = {
  id: "mov_rom_06",
  slug: "me-before-you-the-final-letter-in-paris",
  title: "Me Before You: Lou and Will's Heartfelt Journey & Emotional Bonds",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "09:01",
  durationSeconds: 541,
  externalId: "sLHx2vVa1HA",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/sLHx2vVa1HA/hqdefault.jpg",
  accent: "British",
  wpmSpeed: 132,
  viewCount: 2412034,
  studyCount: 3950,
  description:
    "Hành trình tình yêu đầy xúc cảm giữa Louisa Clark hồn nhiên và Will Traynor kiêu hãnh: những màn đối đáp dí dỏm, bài học sống trọn vẹn, chiếc quần tất ong vò vẽ, điệu khiêu vũ xe lăn đám cưới huyền thoại, và giây phút lắng đọng bên cô gái mặc váy đỏ sau đêm hòa nhạc Mozart.",
  segments: calculatedSegments,
  quiz: quizData,
};

const targetPath = path.resolve(
  __dirname,
  "../features/listening/data/lessons/movies/romance/lesson_me_before_you.ts"
);

const fileContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: Me Before You: Lou and Will's Heartfelt Journey & Emotional Bonds
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B2 | British
 * YouTube ID: sLHx2vVa1HA (09:01 - 541s)
 * Views: 2,412,034 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI TOÀN BỘ VIDEO TỪ 00:00 ĐẾN 09:01 (541s)
 * 128 Pure Master Segments Chuẩn Mực Từng Lượt Thoại Độc Lập Không Gộp Thoại
 * ============================================================================
 */

export const QUIZ_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS: VideoQuizData = ${JSON.stringify(
  quizData,
  null,
  2
)};

export const LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS: MockVideoLesson = {
  id: "mov_rom_06",
  slug: "me-before-you-the-final-letter-in-paris",
  title: "Me Before You: Lou and Will's Heartfelt Journey & Emotional Bonds",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "09:01",
  durationSeconds: 541,
  externalId: "sLHx2vVa1HA",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/sLHx2vVa1HA/hqdefault.jpg",
  accent: "British",
  wpmSpeed: 132,
  viewCount: 2412034,
  studyCount: 3950,
  description:
    "Hành trình tình yêu đầy xúc cảm giữa Louisa Clark hồn nhiên và Will Traynor kiêu hãnh: những màn đối đáp dí dỏm, bài học sống trọn vẹn, chiếc quần tất ong vò vẽ, điệu khiêu vũ xe lăn đám cưới huyền thoại, và giây phút lắng đọng bên cô gái mặc váy đỏ sau đêm hòa nhạc Mozart.",
  segments: ${JSON.stringify(calculatedSegments, null, 2)},
  quiz: QUIZ_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS,
};

export default LESSON_ME_BEFORE_YOU_THE_FINAL_LETTER_IN_PARIS;
`;

fs.writeFileSync(targetPath, fileContent, "utf-8");
console.log(`Successfully generated lesson file at: ${targetPath}`);
console.log(`Total master segments: ${calculatedSegments.length}`);
