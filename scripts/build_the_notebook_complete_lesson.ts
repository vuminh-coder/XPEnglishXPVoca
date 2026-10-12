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

const rawPath = path.resolve(__dirname, "the_notebook_pure_segments.json");
const rawData: RawSegment[] = JSON.parse(fs.readFileSync(rawPath, "utf-8"));

console.log(`Loaded ${rawData.length} raw pure zero-merged segments for The Notebook.`);

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
  lessonId: "mov_rom_04",
  lessonTitle: "The Notebook: Noah and Allie's Most Passionate & Iconic Moments (Full Master Cut)",
  totalQuestions: 8,
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "mov_rom_04_q1",
      question: "Why does Noah hang recklessly by one hand from the moving ferris wheel bar?",
      questionEn: "Why does Noah hang recklessly by one hand from the moving ferris wheel bar?",
      questionVi: "Tại sao Noah lại liều lĩnh bám một tay lơ lửng trên thanh xà của đu quay đang chạy?",
      options: [
        "He was attempting to repair the carnival mechanism for the ride operator.",
        "To stubbornly pressure Allie into agreeing to go out on a date with him.",
        "To show off his athletic gymnastics skills to his friend Tommy.",
        "He slipped accidentally after being pushed by another passenger."
      ],
      optionsEn: [
        "He was attempting to repair the carnival mechanism for the ride operator.",
        "To stubbornly pressure Allie into agreeing to go out on a date with him.",
        "To show off his athletic gymnastics skills to his friend Tommy.",
        "He slipped accidentally after being pushed by another passenger."
      ],
      optionsVi: [
        "Anh đang cố gắng sửa động cơ đu quay giúp người vận hành.",
        "Để bướng bỉnh ép Allie phải đồng ý đi hẹn hò với anh.",
        "Để phô diễn kỹ năng thể dục dụng cụ với người bạn Tommy.",
        "Anh vô tình bị trượt chân sau khi bị một hành khách khác xô đẩy."
      ],
      correctAnswer: 1,
      explanation: "In Segment 15, Noah threatens: 'I'm gonna ask you one more time: will you or will you not go out with me?' refusing to climb back up until she says yes.",
      explanationEn: "In Segment 15, Noah threatens: 'I'm gonna ask you one more time: will you or will you not go out with me?' refusing to climb back up until she says yes.",
      explanationVi: "Trong Phân đoạn 15, Noah đe dọa liều lĩnh: 'Anh hỏi em lần cuối: em có chịu đi chơi với anh không?' và kiên quyết không trèo lên cho đến khi cô đồng ý.",
      targetedConcept: "Reckless romantic persistence",
      targetedConceptEn: "Reckless romantic persistence",
      targetedConceptVi: "Sự kiên trì táo bạo và nồng nhiệt trong tình yêu",
      referenceSegmentIndex: 15
    },
    {
      id: "mov_rom_04_q2",
      question: "What sweet concession does Noah make when Allie calls him 'dumb' during their late-night street walk?",
      questionEn: "What sweet concession does Noah make when Allie calls him 'dumb' during their late-night street walk?",
      questionVi: "Noah đã đưa ra lời nhượng bộ ngọt ngào nào khi Allie chê anh là 'ngốc nghếch' trong lúc đi dạo đêm?",
      options: [
        "He becomes offended and threatens to leave her alone in the street.",
        "He readily agrees that he could be dumb for her, as he can be whatever she wants.",
        "He quotes high-brow Southern poetry to prove his scholastic intellect.",
        "He boasts about his superior carpentry skills and salary."
      ],
      optionsEn: [
        "He becomes offended and threatens to leave her alone in the street.",
        "He readily agrees that he could be dumb for her, as he can be whatever she wants.",
        "He quotes high-brow Southern poetry to prove his scholastic intellect.",
        "He boasts about his superior carpentry skills and salary."
      ],
      optionsVi: [
        "Anh tự ái và dọa sẽ bỏ mặc cô một mình trên phố.",
        "Anh sẵn lòng thừa nhận mình có thể ngốc nghếch vì cô, bởi anh có thể làm bất cứ hình mẫu nào cô muốn.",
        "Anh ngâm những vần thơ miền Nam bác học để chứng minh học vấn của mình.",
        "Anh khoe về tay nghề mộc cừ khôi và mức lương thợ mộc của mình."
      ],
      correctAnswer: 1,
      explanation: "In Segments 48 and 50, Noah promises: 'You just tell me what you want, and I'll be that for you... I could be that.'",
      explanationEn: "In Segments 48 and 50, Noah promises: 'You just tell me what you want, and I'll be that for you... I could be that.'",
      explanationVi: "Trong Phân đoạn 48 và 50, Noah hứa: 'Em chỉ cần bảo em muốn gì và anh sẽ trở thành như thế... Anh ngốc nghếch được luôn.'",
      targetedConcept: "Complete devotion and emotional vulnerability",
      targetedConceptEn: "Complete devotion and emotional vulnerability",
      targetedConceptVi: "Sự tận tụy trọn vẹn và sẵn sàng hy sinh cái tôi",
      referenceSegmentIndex: 50
    },
    {
      id: "mov_rom_04_q3",
      question: "Why did Noah dedicate years of grueling labor to restoring the Windsor Plantation house?",
      questionEn: "Why did Noah dedicate years of grueling labor to restoring the Windsor Plantation house?",
      questionVi: "Tại sao Noah lại dành nhiều năm lao động vất vả để phục dựng ngôi nhà trang viên Windsor?",
      options: [
        "To flip the property on the real estate market for a lucrative profit.",
        "Because he made a sacred promise to Allie that he would build her dream home with white walls, blue shutters, and a wraparound porch.",
        "To establish a lumber mill headquarters on behalf of his father.",
        "To impress local society and win a seat in county government."
      ],
      optionsEn: [
        "To flip the property on the real estate market for a lucrative profit.",
        "Because he made a sacred promise to Allie that he would build her dream home with white walls, blue shutters, and a wraparound porch.",
        "To establish a lumber mill headquarters on behalf of his father.",
        "To impress local society and win a seat in county government."
      ],
      optionsVi: [
        "Để đầu cơ bán lại bất động sản kiếm lời lớn.",
        "Vì anh từng thề với Allie sẽ dựng lại ngôi nhà mơ ước của cô với sơn trắng, cửa chớp xanh và hiên nhà bao quanh.",
        "Để thành lập xưởng cưa theo ý nguyện của cha anh.",
        "Để gây ấn tượng với giới thượng lưu và giành một ghế trong hội đồng thị trấn."
      ],
      correctAnswer: 1,
      explanation: "In Segment 60, Noah explains: 'Well, I promised you I would. I painted it white, with blue shutters, and a porch that wraps around the whole house.'",
      explanationEn: "In Segment 60, Noah explains: 'Well, I promised you I would. I painted it white, with blue shutters, and a porch that wraps around the whole house.'",
      explanationVi: "Trong Phân đoạn 60, Noah giải thích: 'Anh đã hứa với em là anh sẽ làm mà. Anh sơn nhà màu trắng, cửa chớp xanh, và một hàng hiên chạy vòng quanh cả ngôi nhà.'",
      targetedConcept: "Sacred architectural promise and enduring commitment",
      targetedConceptEn: "Sacred architectural promise and enduring commitment",
      targetedConceptVi: "Giữ trọn lời thề danh dự và kiến tạo ước mơ tình yêu",
      referenceSegmentIndex: 60
    },
    {
      id: "mov_rom_04_q4",
      question: "What dramatic truth does Noah reveal during their rain-soaked argument by the lake dock?",
      questionEn: "What dramatic truth does Noah reveal during their rain-soaked argument by the lake dock?",
      questionVi: "Sự thật chấn động nào Noah tiết lộ trong cuộc cãi vã dưới mưa tầm tã bên bến nước hồ thiên nga?",
      options: [
        "That he had moved to New York and never looked back.",
        "That he wrote her 365 letters—every single day for a year—which were confiscated by her mother.",
        "That he lost all the letters in a fire during World War II.",
        "That he only remembered her after reading the local newspaper."
      ],
      optionsEn: [
        "That he had moved to New York and never looked back.",
        "That he wrote her 365 letters—every single day for a year—which were confiscated by her mother.",
        "That he lost all the letters in a fire during World War II.",
        "That he only remembered her after reading the local newspaper."
      ],
      optionsVi: [
        "Rằng anh đã chuyển đến New York và không bao giờ nhìn lại.",
        "Rằng anh đã viết cho cô 365 lá thư—đều đặn mỗi ngày suốt một năm—nhưng đều bị mẹ cô giấu kín.",
        "Rằng anh đã làm mất toàn bộ thư từ trong một trận hỏa hoạn thời Thế chiến II.",
        "Rằng anh chỉ nhớ lại cô sau khi đọc tờ báo địa phương."
      ],
      correctAnswer: 1,
      explanation: "In Segment 63, Noah yells passionately through the pouring rain: 'I wrote you 365 letters. I wrote you every day for a year!' erasing years of heartbreak.",
      explanationEn: "In Segment 63, Noah yells passionately through the pouring rain: 'I wrote you 365 letters. I wrote you every day for a year!' erasing years of heartbreak.",
      explanationVi: "Trong Phân đoạn 63, Noah hét lên đầy xúc động dưới màn mưa: 'Anh đã viết cho em 365 lá thư. Anh viết cho em mỗi ngày suốt một năm trời!' xóa tan hiểu lầm chất chứa 7 năm.",
      targetedConcept: "Resolution of seven years of misunderstanding",
      targetedConceptEn: "Resolution of seven years of misunderstanding",
      targetedConceptVi: "Khám phá sự thật giải tỏa 7 năm chia cắt",
      referenceSegmentIndex: 63
    },
    {
      id: "mov_rom_04_q5",
      question: "How does Noah challenge Allie's conflict regarding her fiancé Lon Hammond?",
      questionEn: "How does Noah challenge Allie's conflict regarding her fiancé Lon Hammond?",
      questionVi: "Noah chất vấn Allie như thế nào về sự dùng dằng của cô đối với vị hôn phu Lon Hammond?",
      options: [
        "He accuses her of staying with Lon not out of honor or love, but out of fear and pragmatic financial security.",
        "He claims Lon is an imposter who lied about his lineage.",
        "He says Lon has secretly broken off the engagement already.",
        "He demands that she return Lon's diamond ring immediately by post."
      ],
      optionsEn: [
        "He accuses her of staying with Lon not out of honor or love, but out of fear and pragmatic financial security.",
        "He claims Lon is an imposter who lied about his lineage.",
        "He says Lon has secretly broken off the engagement already.",
        "He demands that she return Lon's diamond ring immediately by post."
      ],
      optionsVi: [
        "Anh quy kết cô chọn ở lại với Lon không phải vì giữ lời hứa hay tình yêu, mà vì sự an toàn tài chính và giàu sang.",
        "Anh khẳng định Lon là kẻ lừa đảo nói dối về gia thế.",
        "Anh bảo Lon đã bí mật hủy bỏ hôn ước từ trước.",
        "Anh yêu cầu cô gửi trả lại chiếc nhẫn kim cương của Lon ngay lập tức qua đường bưu điện."
      ],
      correctAnswer: 0,
      explanation: "In Segments 74 and 76, Noah confronts her: 'This is not about keeping your promise. And it's not about following your heart. It's about security! He's got a lot of money!'",
      explanationEn: "In Segments 74 and 76, Noah confronts her: 'This is not about keeping your promise. And it's not about following your heart. It's about security! He's got a lot of money!'",
      explanationVi: "Trong Phân đoạn 74 và 76, Noah đối đầu cô: 'Chuyện này chẳng liên quan gì đến việc giữ lời hứa. Và cũng không phải là đi theo tiếng gọi con tim. Mà là về sự an toàn! Anh ta có rất nhiều tiền!'",
      targetedConcept: "Pragmatic social security vs authentic passion",
      targetedConceptEn: "Pragmatic social security vs authentic passion",
      targetedConceptVi: "Thỏa hiệp vị thế xã hội đối lập tiếng gọi con tim",
      referenceSegmentIndex: 74
    },
    {
      id: "mov_rom_04_q6",
      question: "What realistic philosophy about love and marriage does Noah express in their heated morning clash?",
      questionEn: "What realistic philosophy about love and marriage does Noah express in their heated morning clash?",
      questionVi: "Triết lý thực tế nào về tình yêu và hôn nhân mà Noah bày tỏ trong cuộc tranh cãi nảy lửa buổi sáng?",
      options: [
        "That true love should be effortlessly serene without any friction.",
        "That their fighting is natural, and lasting love requires hard, conscious daily work because they truly want each other.",
        "That lovers should give up fighting as soon as their opinions diverge.",
        "That romantic passion naturally expires after the first summer."
      ],
      optionsEn: [
        "That true love should be effortlessly serene without any friction.",
        "That their fighting is natural, and lasting love requires hard, conscious daily work because they truly want each other.",
        "That lovers should give up fighting as soon as their opinions diverge.",
        "That romantic passion naturally expires after the first summer."
      ],
      optionsVi: [
        "Rằng tình yêu đích thực phải luôn êm đềm bình lặng mà không hề có bất kỳ xích mích nào.",
        "Rằng việc cãi vã là điều tự nhiên, và tình yêu lâu bền đòi hỏi sự nỗ lực kiên trì mỗi ngày vì họ thực sự muốn ở bên nhau.",
        "Rằng những người yêu nhau nên từ bỏ ngay khi có sự bất đồng quan điểm.",
        "Rằng sự nồng nhiệt lãng mạn đương nhiên sẽ lụi tàn sau mùa hè đầu tiên."
      ],
      correctAnswer: 1,
      explanation: "In Segments 85 and 88, Noah proclaims: 'That's what we do! We fight!... It's not gonna be easy. It's gonna be really hard, and we're gonna have to work at this every day. But I want to do that because I want you!'",
      explanationEn: "In Segments 85 and 88, Noah proclaims: 'That's what we do! We fight!... It's not gonna be easy. It's gonna be really hard, and we're gonna have to work at this every day. But I want to do that because I want you!'",
      explanationVi: "Trong Phân đoạn 85 và 88, Noah tuyên bố: 'Đó là cách chúng ta sống! Chúng ta cãi vã!... Mọi chuyện sẽ không dễ dàng đâu. Sẽ rất gian nan, và chúng ta sẽ phải nỗ lực vì nó mỗi ngày. Nhưng anh muốn làm điều đó vì anh muốn có em!'",
      targetedConcept: "Accepting friction for lasting partnership",
      targetedConceptEn: "Accepting friction for lasting partnership",
      targetedConceptVi: "Chấp nhận xung đột để xây dựng tình yêu đích thực",
      referenceSegmentIndex: 88
    },
    {
      id: "mov_rom_04_q7",
      question: "What piercing demand does Noah shout to force Allie out of people-pleasing indecision?",
      questionEn: "What piercing demand does Noah shout to force Allie out of people-pleasing indecision?",
      questionVi: "Lời gặng hỏi đanh thép nào Noah hét lên để buộc Allie thoát khỏi sự do dự chiều lòng người khác?",
      options: [
        "Where will you work next year?!",
        "What do you want?! Stop thinking about what everyone else wants—what do YOU want?!",
        "How much money do your parents expect from me?!",
        "Will you return to Charleston or remain in Seabrook?!"
      ],
      optionsEn: [
        "Where will you work next year?!",
        "What do you want?! Stop thinking about what everyone else wants—what do YOU want?!",
        "How much money do your parents expect from me?!",
        "Will you return to Charleston or remain in Seabrook?!"
      ],
      optionsVi: [
        "Em sẽ làm việc ở đâu vào năm tới?!",
        "Em muốn cái gì?! Đừng nghĩ về những gì người khác muốn nữa—bản thân EM muốn gì?!",
        "Bố mẹ em mong đợi bao nhiêu tiền từ anh?!",
        "Em sẽ quay về Charleston hay ở lại Seabrook?!"
      ],
      correctAnswer: 1,
      explanation: "In Segments 94 and 95, Noah breaks through her defense: 'Would you stop thinking about what everyone wants?!... What do you want?! What do you want?!'",
      explanationEn: "In Segments 94 and 95, Noah breaks through her defense: 'Would you stop thinking about what everyone wants?!... What do you want?! What do you want?!'",
      explanationVi: "Trong Phân đoạn 94 và 95, Noah thức tỉnh cô: 'Em có thôi nghĩ về những gì mọi người muốn hay không?!... Em muốn cái gì?! Bản thân em muốn gì?!'",
      targetedConcept: "Authentic emotional autonomy",
      targetedConceptEn: "Authentic emotional autonomy",
      targetedConceptVi: "Quyền tự quyết cảm xúc cá nhân",
      referenceSegmentIndex: 95
    },
    {
      id: "mov_rom_04_q8",
      question: "What heartbreaking realization occurs in the nursing home after Allie momentarily recalls their story?",
      questionEn: "What heartbreaking realization occurs in the nursing home after Allie momentarily recalls their story?",
      questionVi: "Bi kịch xé lòng nào diễn ra tại viện dưỡng lão sau khoảnh khắc ngắn ngủi Allie nhớ lại chuyện tình của họ?",
      options: [
        "Allie mistakes Noah for a doctor and signs papers to leave.",
        "Allie's Alzheimer's dementia returns in a panic, causing her to scream in terror and forget Noah once again.",
        "The nursing staff forbids Noah from visiting her room ever again.",
        "Noah realizes the notebook pages were completely ruined by water."
      ],
      optionsEn: [
        "Allie mistakes Noah for a doctor and signs papers to leave.",
        "Allie's Alzheimer's dementia returns in a panic, causing her to scream in terror and forget Noah once again.",
        "The nursing staff forbids Noah from visiting her room ever again.",
        "Noah realizes the notebook pages were completely ruined by water."
      ],
      optionsVi: [
        "Allie nhầm Noah là bác sĩ và ký giấy tờ để rời đi.",
        "Cơn hoảng loạn Alzheimer tái phát dữ dội, khiến cô la hét sợ hãi và một lần nữa quên sạch Noah là ai.",
        "Các y tá cấm Noah không bao giờ được bước chân vào phòng cô nữa.",
        "Noah nhận ra các trang sổ tay đã bị nước mưa làm hỏng hoàn toàn."
      ],
      correctAnswer: 1,
      explanation: "In Segments 101, 102, and 104, right after whispering 'It was us, darling!', Allie panics in terror: 'No! Who are you?! Somebody help me!' as Noah tearfully holds on.",
      explanationEn: "In Segments 101, 102, and 104, right after whispering 'It was us, darling!', Allie panics in terror: 'No! Who are you?! Somebody help me!' as Noah tearfully holds on.",
      explanationVi: "Trong các Phân đoạn 101, 102 và 104, ngay sau khi thì thầm 'Đó chính là chúng ta, anh yêu!', cơn bệnh tái phát khiến Allie hoảng loạn: 'Không! Ông là ai?! Có ai cứu tôi với!' trong khi Noah nuốt nước mắt ở bên cô.",
      targetedConcept: "Transcendent love persevering through Alzheimer's",
      targetedConceptEn: "Transcendent love persevering through Alzheimer's",
      targetedConceptVi: "Tình yêu bất diệt vượt qua bi kịch mất trí nhớ",
      referenceSegmentIndex: 101
    }
  ]
};

const targetFilePath = path.resolve(
  __dirname,
  "../features/listening/data/lessons/movies/romance/lesson_the_notebook.ts"
);

const tsContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: The Notebook: Noah and Allie's Most Passionate & Iconic Moments (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B2 | American (Southern)
 * YouTube ID: Y5hVdlRFAUo (13:24 - 804s)
 * Views: 1,053,010 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE, TẤT CẢ 106 PHÂN ĐOẠN NGUYÊN BẢN CỦA TOÀN BỘ VIDEO (KHÔNG BỎ SÓT)
 * ZERO MERGED UTTERANCES - TÁCH ĐỘC LẬP TỪNG LƯỢT THOẠI CỦA MỖI NHÂN VẬT
 * PHỦ KÍN 106 MASTER SEGMENTS TỪ GIÂY 00:00 ĐẾN 13:24 (804 GIÂY)
 * ============================================================================
 */

export const QUIZ_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION: VideoQuizData = ${JSON.stringify(
  quizData,
  null,
  2
)};

export const LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION: MockVideoLesson = {
  id: "mov_rom_04",
  slug: "the-notebook-it-wasnt-over-confrontation",
  title: "The Notebook: Noah and Allie's Most Passionate & Iconic Moments (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "13:24",
  durationSeconds: 804,
  externalId: "Y5hVdlRFAUo",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/Y5hVdlRFAUo/hqdefault.jpg",
  accent: "American (Southern)",
  wpmSpeed: 132,
  viewCount: 1053010,
  studyCount: 4210,
  description:
    "Tuyển tập trọn vẹn những khoảnh khắc điện ảnh bất hủ nhất giữa Noah Calhoun (Ryan Gosling) và Allie Hamilton (Rachel McAdams) trong The Notebook: từ màn tỏ tình liều mạng trên đu quay hội chợ, cuộc dạo bước ban đêm giữa ngã tư Seabrook, cuộc tái ngộ bên ngôi nhà trang viên Windsor, nụ hôn dưới mưa rào giải tỏa 365 lá thư thất lạc, cuộc cãi vã dữ dội 'What do you want?!', đến lá thư chia tay đầy vị tha và khoảnh khắc ký ức thức tỉnh lay động lòng người.",
  segments: ${JSON.stringify(calculatedSegments, null, 2)},
  quiz: QUIZ_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION
};

export default LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION;
`;

fs.writeFileSync(targetFilePath, tsContent, "utf-8");
console.log(`Successfully generated ${targetFilePath} with ${calculatedSegments.length} Pure Master Segments!`);
