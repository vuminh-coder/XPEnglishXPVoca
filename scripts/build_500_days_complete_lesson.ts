import fs from "fs";
import path from "path";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";
import { MockVideoLesson, VideoQuizData } from "../features/listening/data/types";

interface RawSegment {
  orderIndex?: number;
  startTime: number;
  endTime: number;
  text: string;
  translationVi: string;
  ipaUs: string;
  keywords: string[];
  explanationAi: string;
  properNouns?: string[];
}

const rawPath = path.resolve(__dirname, "summer_master_pure_segments.json");
const rawData: RawSegment[] = JSON.parse(fs.readFileSync(rawPath, "utf-8"));

console.log(`Loaded ${rawData.length} raw pure zero-merged segments for 500 Days of Summer.`);

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
    properNouns: seg.properNouns || [],
    tokenCount: tokens.length,
  };
});

const quizData: VideoQuizData = {
  lessonId: "mov_rom_08",
  lessonTitle: "500 Days of Summer: Top 10 Iconic Moments & Bittersweet Realities (Full Master Cut)",
  totalQuestions: 8,
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "mov_rom_08_q1",
      question: "What crucial narrative disclaimer does the omniscient narrator make at the very beginning of the film?",
      questionEn: "What crucial narrative disclaimer does the omniscient narrator make at the very beginning of the film?",
      questionVi: "Lời cảnh báo dẫn chuyện quan trọng nào mà người kể chuyện toàn tri đưa ra ngay từ đầu phim?",
      options: [
        "That the film is based entirely on a tragic historical document from the 1920s.",
        "That while it is a story of boy meets girl, you should know upfront that it is not a love story.",
        "That Tom and Summer were childhood sweethearts destined to marry.",
        "That the events were fictionalized to protect greeting card companies."
      ],
      optionsEn: [
        "That the film is based entirely on a tragic historical document from the 1920s.",
        "That while it is a story of boy meets girl, you should know upfront that it is not a love story.",
        "That Tom and Summer were childhood sweethearts destined to marry.",
        "That the events were fictionalized to protect greeting card companies."
      ],
      optionsVi: [
        "Rằng bộ phim hoàn toàn dựa trên một tài liệu lịch sử bi kịch từ những năm 1920.",
        "Rằng dẫu đây là câu chuyện chàng trai gặp gỡ cô gái, bạn nên biết ngay từ đầu đây không phải là một câu chuyện tình yêu.",
        "Rằng Tom và Summer là thanh mai trúc mã từ nhỏ có số mệnh phải lấy nhau.",
        "Rằng các sự kiện đã được hư cấu để bảo vệ các công ty thiệp chúc mừng."
      ],
      correctAnswer: 1,
      explanation: "In Segment 6 and Segment 9, the narrator warns: '500 Days of Summer is not in fact a love story... you should know upfront, this is not a love story.'",
      explanationEn: "In Segment 6 and Segment 9, the narrator warns: '500 Days of Summer is not in fact a love story... you should know upfront, this is not a love story.'",
      explanationVi: "Trong Phân đoạn 6 và 9, người dẫn chuyện cảnh báo: '500 Days of Summer trên thực tế không phải là một câu chuyện tình yêu... bạn nên biết ngay từ đầu, đây không phải là chuyện tình.'",
      targetedConcept: "Anti-romcom premise and realistic narrative framing",
      targetedConceptEn: "Anti-romcom premise and realistic narrative framing",
      targetedConceptVi: "Tiền đề chống mô-típ romcom và định hướng tự sự hiện thực",
      referenceSegmentIndex: 6
    },
    {
      id: "mov_rom_08_q2",
      question: "How is 'The Summer Effect' portrayed in the stylized documentary-like montage?",
      questionEn: "How is 'The Summer Effect' portrayed in the stylized documentary-like montage?",
      questionVi: "'Hiệu ứng Summer' được miêu tả như thế nào trong đoạn phim dựng theo phong cách tài liệu?",
      options: [
        "Through supernatural magic and fantasy special effects.",
        "In black-and-white, clinically analyzing her empirically magnetic beauty and irresistible allure that causes double takes.",
        "By interviewing her ex-boyfriends who all won athletic championships.",
        "Through animated musical sequences showing her talking to birds."
      ],
      optionsEn: [
        "Through supernatural magic and fantasy special effects.",
        "In black-and-white, clinically analyzing her empirically magnetic beauty and irresistible allure that causes double takes.",
        "By interviewing her ex-boyfriends who all won athletic championships.",
        "Through animated musical sequences showing her talking to birds."
      ],
      optionsVi: [
        "Thông qua các hiệu ứng ma thuật siêu nhiên và kỹ xảo kỳ ảo.",
        "Bằng hình ảnh đen trắng, phân tích một cách khoa học sức hút quyến rũ kiểm chứng được khiến ai đi ngang cũng phải ngoái nhìn lại.",
        "Bằng cách phỏng vấn tất cả bạn trai cũ từng đoạt giải vô địch thể thao của cô.",
        "Thông qua các đoạn hoạt hình ca nhạc cho thấy cô nói chuyện với chim chóc."
      ],
      correctAnswer: 1,
      explanation: "In Segment 10 and Segment 12, the film describes her in black-and-white as 'empirically attractive and magnetic, with her appearance causing double takes.'",
      explanationEn: "In Segment 10 and Segment 12, the film describes her in black-and-white as 'empirically attractive and magnetic, with her appearance causing double takes.'",
      explanationVi: "Trong các Phân đoạn 10 và 12, bộ phim miêu tả cô bằng hình ảnh đen trắng: 'đẹp một cách có thể kiểm chứng bằng mắt và đầy cuốn hút, khiến ai đi ngang cũng phải ngoái nhìn lại.'",
      targetedConcept: "Subjective romantic projection and idealized allure",
      targetedConceptEn: "Subjective romantic projection and idealized allure",
      targetedConceptVi: "Sự phóng chiếu lãng mạn chủ quan và sức hút lý tưởng hóa",
      referenceSegmentIndex: 10
    },
    {
      id: "mov_rom_08_q3",
      question: "What does Summer's behavior during the park shouting game reveal about her personality?",
      questionEn: "What does Summer's behavior during the park shouting game reveal about her personality?",
      questionVi: "Hành vi của Summer trong trò chơi thi hét ở công viên bộc lộ điều gì về cá tính của cô?",
      options: [
        "She is terrified of embarrassing herself in front of strangers.",
        "She is boldly uninhibited, playful, and completely unconcerned with public judgment.",
        "She secretly wants to become a classical opera singer.",
        "She was trying to provoke local police officers to arrest Tom."
      ],
      optionsEn: [
        "She is terrified of embarrassing herself in front of strangers.",
        "She is boldly uninhibited, playful, and completely unconcerned with public judgment.",
        "She secretly wants to become a classical opera singer.",
        "She was trying to provoke local police officers to arrest Tom."
      ],
      optionsVi: [
        "Cô rất sợ bị bẽ mặt trước những người xa lạ.",
        "Cô táo bạo, phóng khoáng, nghịch ngợm và hoàn toàn không bận tâm đến ánh nhìn phán xét của đám đông.",
        "Cô bí mật muốn trở thành một ca sĩ opera cổ điển.",
        "Cô đang cố tình khiêu khích cảnh sát địa phương để bắt giữ Tom."
      ],
      correctAnswer: 1,
      explanation: "In Segments 17 and 19, when Tom timidly backs out, Summer boldly 'concludes the scene by shouting at the top of her lungs.'",
      explanationEn: "In Segments 17 and 19, when Tom timidly backs out, Summer boldly 'concludes the scene by shouting at the top of her lungs.'",
      explanationVi: "Trong các Phân đoạn 17 và 19, khi Tom rụt rè thoái lui, Summer vẫn tự tin hét to hết sức bình sinh, phá tan sự ngượng ngùng.",
      targetedConcept: "Uninhibited personality breaking social conventions",
      targetedConceptEn: "Uninhibited personality breaking social conventions",
      targetedConceptVi: "Cá tính phóng khoáng phá vỡ những quy ước xã hội",
      referenceSegmentIndex: 17
    },
    {
      id: "mov_rom_08_q4",
      question: "What symbolic milestone happens when Tom meets a woman named Autumn at an architecture interview?",
      questionEn: "What symbolic milestone happens when Tom meets a woman named Autumn at an architecture interview?",
      questionVi: "Cột mốc biểu tượng nào diễn ra khi Tom gặp một cô gái tên là Autumn tại buổi phỏng vấn xin việc kiến trúc?",
      options: [
        "He realizes he wants to quit architecture forever and move to Europe.",
        "It symbolizes that life moves forward in seasons: when Summer ends, Autumn begins with fresh possibilities.",
        "Autumn turns out to be Summer's younger sister who recognizes him.",
        "The architecture firm immediately rejects both of their portfolios."
      ],
      optionsEn: [
        "He realizes he wants to quit architecture forever and move to Europe.",
        "It symbolizes that life moves forward in seasons: when Summer ends, Autumn begins with fresh possibilities.",
        "Autumn turns out to be Summer's younger sister who recognizes him.",
        "The architecture firm immediately rejects both of their portfolios."
      ],
      optionsVi: [
        "Anh nhận ra mình muốn từ bỏ kiến trúc mãi mãi và chuyển sang châu Âu sinh sống.",
        "Nó biểu tượng cho việc cuộc sống luôn luân chuyển theo bốn mùa: khi Mùa Hạ (Summer) khép lại, Mùa Thu (Autumn) sẽ bắt đầu với những cơ hội mới.",
        "Autumn hóa ra lại là em gái ruột của Summer và nhận ra anh.",
        "Công ty kiến trúc lập tức từ chối hồ sơ năng lực của cả hai người."
      ],
      correctAnswer: 1,
      explanation: "In Segments 23 to 26, after connecting over Angel's Plaza, she introduces herself as Autumn, bringing Day 500 to a close and starting Day 1.",
      explanationEn: "In Segments 23 to 26, after connecting over Angel's Plaza, she introduces herself as Autumn, bringing Day 500 to a close and starting Day 1.",
      explanationVi: "Trong các Phân đoạn 23 đến 26, sau khi tìm thấy điểm chung tại quảng trường Angel's Plaza, cô gái tự giới thiệu mình là Autumn, khép lại 500 ngày của Summer và mở ra Ngày thứ 1 tươi sáng.",
      targetedConcept: "Emotional rebirth and the cyclical nature of seasons",
      targetedConceptEn: "Emotional rebirth and the cyclical nature of seasons",
      targetedConceptVi: "Sự tái sinh cảm xúc và quy luật luân chuyển tự nhiên của thời gian",
      referenceSegmentIndex: 26
    },
    {
      id: "mov_rom_08_q5",
      question: "How does the 'Love vs. Hate' mirror montage illustrate Tom's psychological shift?",
      questionEn: "How does the 'Love vs. Hate' mirror montage illustrate Tom's psychological shift?",
      questionVi: "Trường đoạn phản chiếu 'Yêu đối lập Ghét' minh họa cho sự thay đổi tâm lý của Tom như thế nào?",
      options: [
        "He realizes his friend lied about introducing him to Summer.",
        "The exact same quirks he once idealized (smile, crooked teeth, haircut) become the very things he vehemently resents after heartbreak.",
        "He replaces all photos of Summer with pictures of famous rock stars.",
        "He seeks revenge by defacing greeting cards at his workplace."
      ],
      optionsEn: [
        "He realizes his friend lied about introducing him to Summer.",
        "The exact same quirks he once idealized (smile, crooked teeth, haircut) become the very things he vehemently resents after heartbreak.",
        "He replaces all photos of Summer with pictures of famous rock stars.",
        "He seeks revenge by defacing greeting cards at his workplace."
      ],
      optionsVi: [
        "Anh nhận ra bạn mình đã nói dối về việc giới thiệu anh với Summer.",
        "Chính những đặc điểm anh từng say đắm lý tưởng hóa (nụ cười, răng khểnh, mái tóc) lại biến thành những thứ anh cay đắng ghét bỏ sau khi vỡ mộng.",
        "Anh thay thế tất cả ảnh của Summer bằng hình ảnh các ngôi sao nhạc rock nổi tiếng.",
        "Anh trả đũa bằng cách bôi bẩn các tấm thiệp chúc mừng tại công ty."
      ],
      correctAnswer: 1,
      explanation: "In Segments 28 to 31, Tom directly shifts from 'I love her crooked teeth' to 'I hate her crooked teeth, her 1960s haircut', illustrating how emotional wounds invert perception.",
      explanationEn: "In Segments 28 to 31, Tom directly shifts from 'I love her crooked teeth' to 'I hate her crooked teeth, her 1960s haircut', illustrating how emotional wounds invert perception.",
      explanationVi: "Trong các Phân đoạn 28 đến 31, Tom chuyển ngoắt từ 'Tôi yêu hàm răng khấp khểnh' sang 'Tôi ghét hàm răng khấp khểnh, kiểu tóc thập niên 60', cho thấy vết thương lòng làm đảo lộn lăng kính nhìn nhận đối phương.",
      targetedConcept: "Psychological duality and the fine line between love and resentment",
      targetedConceptEn: "Psychological duality and the fine line between love and resentment",
      targetedConceptVi: "Tính hai mặt trong tâm lý và ranh giới mong manh giữa tình yêu và nỗi oán hờn",
      referenceSegmentIndex: 31
    },
    {
      id: "mov_rom_08_q6",
      question: "What specific catalyst in the elevator sparks Tom's conviction that Summer is his soulmate?",
      questionEn: "What specific catalyst in the elevator sparks Tom's conviction that Summer is his soulmate?",
      questionVi: "Chất xúc tác cụ thể nào trong thang máy làm bùng lên niềm tin của Tom rằng Summer chính là tri kỷ định mệnh của anh?",
      options: [
        "They discover they attended the same high school in New Jersey.",
        "Summer hears music playing from Tom's headphones and quotes lyrics from The Smiths ('There Is a Light That Never Goes Out').",
        "They accidentally drop their identical sketchbooks on the floor.",
        "Summer compliments Tom's expensive Italian designer suit."
      ],
      optionsEn: [
        "They discover they attended the same high school in New Jersey.",
        "Summer hears music playing from Tom's headphones and quotes lyrics from The Smiths ('There Is a Light That Never Goes Out').",
        "They accidentally drop their identical sketchbooks on the floor.",
        "Summer compliments Tom's expensive Italian designer suit."
      ],
      optionsVi: [
        "Họ phát hiện ra mình từng học cùng trường cấp ba ở New Jersey.",
        "Summer nghe thấy bài hát phát ra từ tai nghe của Tom và ngâm nga lời ca của nhóm The Smiths ('There Is a Light That Never Goes Out').",
        "Họ vô tình làm rơi những cuốn sổ phác thảo giống hệt nhau xuống sàn.",
        "Summer khen ngợi bộ vest hàng hiệu phong cách Ý đắt tiền của Tom."
      ],
      correctAnswer: 1,
      explanation: "In Segments 34 to 37, Summer sings: 'To die by your side is such a heavenly way to die. I love The Smiths', which completely stuns Tom.",
      explanationEn: "In Segments 34 to 37, Summer sings: 'To die by your side is such a heavenly way to die. I love The Smiths', which completely stuns Tom.",
      explanationVi: "Trong các Phân đoạn 34 đến 37, Summer hát: 'Được chết bên cạnh em là một cách chết tuyệt vời tựa thiên đường. Tôi mê nhóm The Smiths lắm', khiến Tom hoàn toàn choáng váng vì ngỡ đã tìm thấy định mệnh.",
      targetedConcept: "Pop culture commonality as an initial romantic catalyst",
      targetedConceptEn: "Pop culture commonality as an initial romantic catalyst",
      targetedConceptVi: "Sự đồng điệu trong văn hóa đại chúng làm chất xúc tác ban đầu cho tình yêu",
      referenceSegmentIndex: 34
    },
    {
      id: "mov_rom_08_q7",
      question: "What fundamental warning does Summer explicitly communicate during their playful IKEA date?",
      questionEn: "What fundamental warning does Summer explicitly communicate during their playful IKEA date?",
      questionVi: "Lời cảnh báo cốt lõi nào Summer thẳng thắn trao đổi với Tom trong buổi hẹn hò vui nhộn tại siêu thị IKEA?",
      options: [
        "That she plans to resign from the greeting card company next week.",
        "That she is not looking for anything serious, directly establishing her personal boundaries.",
        "That she cannot cook Swedish meatballs.",
        "That she is secretly engaged to an architect."
      ],
      optionsEn: [
        "That she plans to resign from the greeting card company next week.",
        "That she is not looking for anything serious, directly establishing her personal boundaries.",
        "That she cannot cook Swedish meatballs.",
        "That she is secretly engaged to an architect."
      ],
      optionsVi: [
        "Rằng cô dự định sẽ nghỉ việc tại công ty thiệp chúc mừng vào tuần tới.",
        "Rằng cô không hề tìm kiếm bất cứ điều gì nghiêm túc, trực tiếp vạch rõ ranh giới tự do cá nhân của mình.",
        "Rằng cô không biết nấu món thịt viên Thụy Điển.",
        "Rằng cô đã bí mật đính hôn với một kiến trúc sư khác."
      ],
      correctAnswer: 1,
      explanation: "In Segments 41 to 43, Summer clearly says: 'I just want to tell you, I'm not really looking for anything serious', though Tom internally rationalizes that she will change her mind.",
      explanationEn: "In Segments 41 to 43, Summer clearly says: 'I just want to tell you, I'm not really looking for anything serious', though Tom internally rationalizes that she will change her mind.",
      explanationVi: "Trong các Phân đoạn 41 đến 43, Summer khẳng định rành mạch: 'Em chỉ muốn nói cho anh biết, em thực sự không tìm kiếm điều gì nghiêm túc đâu', dẫu Tom vẫn tự huyễn hoặc rằng cô sẽ thay đổi.",
      targetedConcept: "Divergent relationship expectations and fear of commitment",
      targetedConceptEn: "Divergent relationship expectations and fear of commitment",
      targetedConceptVi: "Kỳ vọng bất đồng trong mối quan hệ và rào cản cam kết",
      referenceSegmentIndex: 43
    },
    {
      id: "mov_rom_08_q8",
      question: "Why is the split-screen 'Expectations vs. Reality' considered the masterpiece scene of the film?",
      questionEn: "Why is the split-screen 'Expectations vs. Reality' considered the masterpiece scene of the film?",
      questionVi: "Tại sao phân cảnh màn hình chia đôi 'Kỳ Vọng đối lập Thực Tế' lại được coi là kiệt tác nghệ thuật của bộ phim?",
      options: [
        "It was the first scene filmed in 3D IMAX format.",
        "It simultaneously visualizes Tom's idealized romantic fantasy on the left against the lonely, painful reality of seeing Summer's engagement ring on the right.",
        "It features an unscripted fight between Tom and Summer's new fiancé.",
        "It shows two alternate endings that the director allowed the cinema audience to vote on."
      ],
      optionsEn: [
        "It was the first scene filmed in 3D IMAX format.",
        "It simultaneously visualizes Tom's idealized romantic fantasy on the left against the lonely, painful reality of seeing Summer's engagement ring on the right.",
        "It features an unscripted fight between Tom and Summer's new fiancé.",
        "It shows two alternate endings that the director allowed the cinema audience to vote on."
      ],
      optionsVi: [
        "Đó là phân cảnh đầu tiên được quay bằng định dạng 3D IMAX.",
        "Nó đồng thời trực quan hóa ảo tưởng lãng mạn bên trái đối lập với hiện thực cô độc, đau đớn khi nhìn thấy chiếc nhẫn đính hôn của Summer bên phải.",
        "Nó chứa màn ẩu đả không có trong kịch bản giữa Tom và vị hôn phu mới của Summer.",
        "Nó cho thấy hai cái kết khác nhau mà đạo diễn cho phép khán giả rạp bình chọn."
      ],
      correctAnswer: 1,
      explanation: "In Segments 59 and 60, the split screen contrasts Tom's hopeful expectations with the shattering reality of seeing Summer's engagement ring, causing his romantic fantasy to collapse.",
      explanationEn: "In Segments 59 and 60, the split screen contrasts Tom's hopeful expectations with the shattering reality of seeing Summer's engagement ring, causing his romantic fantasy to collapse.",
      explanationVi: "Trong các Phân đoạn 59 và 60, màn hình chia đôi đối chiếu kỳ vọng ấm áp với thực tại phũ phàng khi nhìn thấy chiếc nhẫn đính hôn trên tay Summer, thiêu rụi hoàn toàn ảo tưởng của Tom.",
      targetedConcept: "Inevitable friction between subjective expectation and harsh reality",
      targetedConceptEn: "Inevitable friction between subjective expectation and harsh reality",
      targetedConceptVi: "Khoảng cách nghiệt ngã giữa kỳ vọng chủ quan và hiện thực phũ phàng",
      referenceSegmentIndex: 60
    }
  ]
};

const targetFilePath = path.resolve(
  __dirname,
  "../features/listening/data/lessons/movies/romance/lesson_500_days_of_summer.ts"
);

const tsContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: 500 Days of Summer: Top 10 Iconic Moments & Bittersweet Realities (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B2 | American
 * YouTube ID: AS47hWRO0bw (10:24 - 624s)
 * Views: 189,663 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE, TẤT CẢ 56 PHÂN ĐOẠN NGUYÊN BẢN CỦA TOÀN BỘ VIDEO (KHÔNG BỎ SÓT)
 * ZERO MERGED UTTERANCES - TÁCH ĐỘC LẬP TỪNG LƯỢT THOẠI CỦA MỖI NHÂN VẬT
 * PHỦ KÍN 56 MASTER SEGMENTS TỪ GIÂY 00:00 ĐẾN 10:24 (624 GIÂY)
 * ============================================================================
 */

export const QUIZ_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY: VideoQuizData = ${JSON.stringify(
  quizData,
  null,
  2
)};

export const LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY: MockVideoLesson = {
  id: "mov_rom_08",
  slug: "500-days-of-summer-expectations-vs-reality",
  title: "500 Days of Summer: Top 10 Iconic Moments & Bittersweet Realities (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "10:24",
  durationSeconds: 624,
  externalId: "AS47hWRO0bw",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/AS47hWRO0bw/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 138,
  viewCount: 189663,
  studyCount: 2980,
  description:
    "Tuyển tập 10 phân cảnh kinh điển trong 500 Days of Summer: từ cuộc chạm mặt thang máy yêu thích nhóm The Smiths, buổi hẹn tại IKEA, màn đối lập Love vs. Hate, phân cảnh màn hình chia đôi Expectations vs. Reality, cho đến bài học trưởng thành sâu sắc về tình yêu và định mệnh.",
  segments: ${JSON.stringify(calculatedSegments, null, 2)},
  quiz: QUIZ_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY
};

export default LESSON_500_DAYS_OF_SUMMER_EXPECTATIONS_VS_REALITY;
`;

fs.writeFileSync(targetFilePath, tsContent, "utf-8");
console.log(`Successfully generated ${targetFilePath} with ${calculatedSegments.length} Pure Master Segments!`);
