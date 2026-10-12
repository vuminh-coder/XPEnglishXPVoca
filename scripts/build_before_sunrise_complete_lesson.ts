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
  properNouns: string[];
}

const rawPath = path.resolve(__dirname, "before_sunrise_raw_segments.json");
const rawData: RawSegment[] = JSON.parse(fs.readFileSync(rawPath, "utf-8"));

console.log(`Loaded ${rawData.length} raw zero-merged segments for Before Sunrise.`);

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
  lessonId: "mov_rom_02",
  lessonTitle: "The Before Trilogy: Jesse & Céline - Love Over Time and Spontaneous Spark (Full Master Cut)",
  totalQuestions: 8,
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "mov_rom_02_q1",
      question: "What 'insane idea' did Jesse propose to Céline on the train to start their journey?",
      questionEn: "What 'insane idea' did Jesse propose to Céline on the train to start their journey?",
      questionVi: "Jesse đã đưa ra 'ý tưởng điên rồ' nào với Céline trên chuyến tàu để bắt đầu hành trình của họ?",
      options: [
        "To steal luggage from the conductor and jump off the moving train.",
        "To get off the train together in Vienna and explore the town without any rigid plan.",
        "To move to Paris immediately and buy a flat near Notre-Dame.",
        "To write a novel together during the rest of the train journey."
      ],
      optionsEn: [
        "To steal luggage from the conductor and jump off the moving train.",
        "To get off the train together in Vienna and explore the town without any rigid plan.",
        "To move to Paris immediately and buy a flat near Notre-Dame.",
        "To write a novel together during the rest of the train journey."
      ],
      optionsVi: [
        "Lấy trộm hành lý của người soát vé rồi nhảy khỏi tàu đang chạy.",
        "Cùng nhau bước xuống tàu tại Vienna và đi khám phá thành phố mà không cần kế hoạch gò bó.",
        "Chuyển đến Paris ngay lập tức và mua một căn hộ gần nhà thờ Đức Bà.",
        "Cùng viết một cuốn tiểu thuyết trong suốt phần còn lại của chuyến tàu."
      ],
      correctAnswer: 1,
      explanation: "In Segment 3, Jesse asks Céline: 'This is what we should do: you should get off the train with me here in Vienna, and come check out the town.'",
      explanationEn: "In Segment 3, Jesse asks Céline: 'This is what we should do: you should get off the train with me here in Vienna, and come check out the town.'",
      explanationVi: "Trong Phân đoạn 3, Jesse rủ Céline: 'Đây là điều chúng ta nên làm: em hãy xuống tàu cùng anh ngay tại Vienna này, rồi cùng đi khám phá thành phố.'",
      targetedConcept: "Plot catalyst of Before Sunrise",
      targetedConceptEn: "Plot catalyst of Before Sunrise",
      targetedConceptVi: "Bước ngoặt khởi đầu của Before Sunrise",
      referenceSegmentIndex: 3,
    },
    {
      id: "mov_rom_02_q2",
      question: "Where does Céline believe God or divine magic truly resides in human life?",
      questionEn: "Where does Céline believe God or divine magic truly resides in human life?",
      questionVi: "Céline tin rằng Thượng Đế hay phép màu thực sự ngự trị ở đâu trong đời sống con người?",
      options: [
        "Inside traditional cathedrals, holy shrines, and ancient religious scriptures.",
        "In the tiny space in between two people during their sincere attempt to understand and share with each other.",
        "Exclusively within individual financial independence and intellectual superiority.",
        "In dreams and fantasies that can never touch tangible reality."
      ],
      optionsEn: [
        "Inside traditional cathedrals, holy shrines, and ancient religious scriptures.",
        "In the tiny space in between two people during their sincere attempt to understand and share with each other.",
        "Exclusively within individual financial independence and intellectual superiority.",
        "In dreams and fantasies that can never touch tangible reality."
      ],
      optionsVi: [
        "Bên trong những thánh đường cổ kính, đền đài tôn nghiêm và kinh sách tôn giáo.",
        "Trong khoảng không gian nhỏ bé ở giữa hai con người khi họ chân thành nỗ lực thấu hiểu và chia sẻ cùng nhau.",
        "Độc quyền bên trong sự độc lập tài chính và vượt trội về trí tuệ cá nhân.",
        "Trong những giấc mơ và ảo tưởng không bao giờ chạm đến hiện thực hữu hình."
      ],
      correctAnswer: 1,
      explanation: "In Segments 7 and 8, Céline expresses: 'it wouldn't be in any of us... but just in this little space in between... in the attempt of understanding someone.'",
      explanationEn: "In Segments 7 and 8, Céline expresses: 'it wouldn't be in any of us... but just in this little space in between... in the attempt of understanding someone.'",
      explanationVi: "Trong Phân đoạn 7 và 8, Céline bộc bạch: 'Ngài sẽ không nằm trong bất kỳ ai trong chúng ta... mà ngự trị ngay trong khoảng không gian nhỏ bé ở giữa hai chúng ta... trong nỗ lực thấu hiểu một ai đó.'",
      targetedConcept: "Philosophical concept of spiritual connection",
      targetedConceptEn: "Philosophical concept of spiritual connection",
      targetedConceptVi: "Triết lý về sự kết nối tâm linh và đồng cảm giữa con người",
      referenceSegmentIndex: 7,
    },
    {
      id: "mov_rom_02_q3",
      question: "How does director Richard Linklater counter the traditional Hollywood rule 'Show, don't tell'?",
      questionEn: "How does director Richard Linklater counter the traditional Hollywood rule 'Show, don't tell'?",
      questionVi: "Đạo diễn Richard Linklater đã phản biện lại quy tắc điện ảnh Hollywood truyền thống 'Show, don't tell' như thế nào?",
      options: [
        "By replacing all dialogue with computer-generated visual action sequences.",
        "By arguing that authentic human conversation is deeply evocative, capturing both the essence of the characters and the subject they describe.",
        "By relying strictly on voiceover narration recorded in a sound booth.",
        "By removing all character interactions to focus solely on urban architectural landscapes."
      ],
      optionsEn: [
        "By replacing all dialogue with computer-generated visual action sequences.",
        "By arguing that authentic human conversation is deeply evocative, capturing both the essence of the characters and the subject they describe.",
        "By relying strictly on voiceover narration recorded in a sound booth.",
        "By removing all character interactions to focus solely on urban architectural landscapes."
      ],
      optionsVi: [
        "Bằng cách thay thế toàn bộ lời thoại bằng các cảnh hành động kỹ xảo vi tính.",
        "Bằng cách khẳng định rằng đối thoại chân thực giữa con người giàu sức gợi vô cùng, nắm bắt được cả bản chất nhân vật lẫn nội dung họ miêu tả.",
        "Bằng cách dựa hoàn toàn vào lời tường thuật lồng tiếng trong phòng thu âm.",
        "Bằng cách loại bỏ mọi tương tác nhân vật để chỉ tập trung vào cảnh quan kiến trúc đô thị."
      ],
      correctAnswer: 1,
      explanation: "In Segment 51, Linklater explains: 'I always thought people talking was so evocative... not only do you get the essence of them, but also of what they're talking about.'",
      explanationEn: "In Segment 51, Linklater explains: 'I always thought people talking was so evocative... not only do you get the essence of them, but also of what they're talking about.'",
      explanationVi: "Trong Phân đoạn 51, Linklater giải thích: 'Tôi luôn nghĩ những cuộc trò chuyện của con người giàu sức gợi vô cùng... bạn nắm bắt được cả bản chất của nhân vật lẫn điều họ đang chia sẻ.'",
      targetedConcept: "Auteur cinematic philosophy of dialogue",
      targetedConceptEn: "Auteur cinematic philosophy of dialogue",
      targetedConceptVi: "Triết lý điện ảnh tác giả về sức mạnh gợi mở của đối thoại",
      referenceSegmentIndex: 51,
    },
    {
      id: "mov_rom_02_q4",
      question: "What intimate gesture does Jesse make when Céline says she feels like she would 'dissolve into molecules' if touched?",
      questionEn: "What intimate gesture does Jesse make when Céline says she feels like she would 'dissolve into molecules' if touched?",
      questionVi: "Jesse đã làm cử chỉ thân mật nào khi Céline bảo cô cảm thấy như mình sẽ 'tan biến thành các phân tử' nếu được chạm vào?",
      options: [
        "He laughs out loud and rolls down the car window.",
        "He gently reaches out to touch her to see if she stays whole or dissolves, offering silent comfort.",
        "He hands her an umbrella because it starts raining in Paris.",
        "He stops the car and demands that they take the metro instead."
      ],
      optionsEn: [
        "He laughs out loud and rolls down the car window.",
        "He gently reaches out to touch her to see if she stays whole or dissolves, offering silent comfort.",
        "He hands her an umbrella because it starts raining in Paris.",
        "He stops the car and demands that they take the metro instead."
      ],
      optionsVi: [
        "Anh cười lớn và quay cửa kính xe ô tô xuống.",
        "Anh khẽ vươn tay chạm nhẹ vào cô để xem cô còn nguyên vẹn hay tan biến, mang lại sự vỗ về dịu dàng trong im lặng.",
        "Anh đưa cho cô một chiếc ô vì trời bắt đầu đổ mưa ở Paris.",
        "Anh dừng xe lại và yêu cầu cả hai đi tàu điện ngầm thay thế."
      ],
      correctAnswer: 1,
      explanation: "In Segment 53, Céline confides her fragility, and Jesse gently touches her to see if she dissolves, bringing her back to feeling safe.",
      explanationEn: "In Segment 53, Céline confides her fragility, and Jesse gently touches her to see if she dissolves, bringing her back to feeling safe.",
      explanationVi: "Trong Phân đoạn 53, Céline bộc bạch sự yếu mềm của mình, và Jesse khẽ chạm vào cô để xem cô còn nguyên vẹn hay tan biến, đem lại sự bình yên dịu dàng.",
      targetedConcept: "Emotional tenderness and non-verbal vulnerability",
      targetedConceptEn: "Emotional tenderness and non-verbal vulnerability",
      targetedConceptVi: "Sự dịu dàng thấu cảm và cử chỉ phi ngôn ngữ chữa lành tổn thương",
      referenceSegmentIndex: 53,
    },
    {
      id: "mov_rom_02_q5",
      question: "What unexpected word did Céline give the Danube river poet for his impromptu verse?",
      questionEn: "What unexpected word did Céline give the Danube river poet for his impromptu verse?",
      questionVi: "Céline đã đưa từ khóa bất ngờ nào cho người thi sĩ bên bờ sông Danube để làm bài thơ ngẫu hứng?",
      options: [
        "Moonlight (Ánh trăng)",
        "Milkshake (Ly sữa lắc)",
        "Cathedral (Thánh đường)",
        "Sunflower (Hoa hướng dương)"
      ],
      optionsEn: [
        "Moonlight (Ánh trăng)",
        "Milkshake (Ly sữa lắc)",
        "Cathedral (Thánh đường)",
        "Sunflower (Hoa hướng dương)"
      ],
      optionsVi: [
        "Ánh trăng (Moonlight)",
        "Ly sữa lắc (Milkshake)",
        "Thánh đường (Cathedral)",
        "Hoa hướng dương (Sunflower)"
      ],
      correctAnswer: 1,
      explanation: "In Segment 78, Céline enthusiastically offers the word 'Milkshake!', which the river poet beautifully weaves into his verse.",
      explanationEn: "In Segment 78, Céline enthusiastically offers the word 'Milkshake!', which the river poet beautifully weaves into his verse.",
      explanationVi: "Trong Phân đoạn 78, Céline đã hào hứng chọn từ 'Milkshake!' (ly sữa lắc), và người thi sĩ đã khéo léo dệt từ đó vào thi phẩm trữ tình của mình.",
      targetedConcept: "Impromptu street poetry and artistic wordplay",
      targetedConceptEn: "Impromptu street poetry and artistic wordplay",
      targetedConceptVi: "Nghệ thuật thơ đường phố ngẫu hứng và lối chơi chữ thi ca",
      referenceSegmentIndex: 78,
    },
    {
      id: "mov_rom_02_q6",
      question: "What core metaphor does the Danube river poem use to describe human connection amid fate?",
      questionEn: "What core metaphor does the Danube river poem use to describe human connection amid fate?",
      questionVi: "Bài thơ bên bờ sông Danube đã dùng hình ảnh ẩn dụ cốt lõi nào để miêu tả sự gắn kết giữa con người trước số phận?",
      options: [
        "Stars locked in permanent frozen orbits across the galaxy.",
        "Branches in the river caught in the current, carrying each other downstream.",
        "Stones sinking silently to the ocean bottom without ripples.",
        "Birds competing fiercely for territory during stormy winter months."
      ],
      optionsEn: [
        "Stars locked in permanent frozen orbits across the galaxy.",
        "Branches in the river caught in the current, carrying each other downstream.",
        "Stones sinking silently to the ocean bottom without ripples.",
        "Birds competing fiercely for territory during stormy winter months."
      ],
      optionsVi: [
        "Những vì sao bị khóa chặt trong quỹ đạo đóng băng vĩnh cửu giữa ngân hà.",
        "Những nhành cây trên dòng sông cuốn theo dòng nước xiết, nương tựa nâng đỡ nhau trôi xuôi về hạ lưu.",
        "Những viên đá chìm lặng lẽ xuống đáy đại dương mà không tạo nên gợn sóng.",
        "Những cánh chim tranh giành lãnh thổ khốc liệt trong những tháng mùa đông bão tuyết."
      ],
      correctAnswer: 1,
      explanation: "In Segment 119, the poem declares: 'Lodged in life like branches in the river flowing downstream caught in the current. I'll carry you, you'll carry me, that's how it could be.'",
      explanationEn: "In Segment 119, the poem declares: 'Lodged in life like branches in the river flowing downstream caught in the current. I'll carry you, you'll carry me, that's how it could be.'",
      explanationVi: "Trong Phân đoạn 119, bài thơ cất lên: 'Nương mình vào cuộc đời tựa những nhành cây trôi trên dòng sông xuôi về hạ lưu cuốn theo dòng nước siết. Tôi sẽ nâng đỡ em, và em sẽ nâng đỡ tôi, đó là cách cuộc đời diễn ra.'",
      targetedConcept: "Poetic symbolism of destiny and mutual support",
      targetedConceptEn: "Poetic symbolism of destiny and mutual support",
      targetedConceptVi: "Biểu tượng thi ca về định mệnh và sự nương tựa nâng đỡ lẫn nhau",
      referenceSegmentIndex: 119,
    },
    {
      id: "mov_rom_02_q7",
      question: "What roleplay scenario does Jesse invent in Before Midnight to reconcile with Céline?",
      questionEn: "What roleplay scenario does Jesse invent in Before Midnight to reconcile with Céline?",
      questionVi: "Jesse đã sáng tạo ra kịch bản nhập vai nào trong Before Midnight để làm hòa với Céline?",
      options: [
        "He pretends to be a French detective investigating a missing passport.",
        "He claims he just traveled back from the future with a letter sent by her 82-year-old self.",
        "He pretends to be a Greek waiter offering free dessert.",
        "He acts as a fortune teller predicting their lottery numbers."
      ],
      optionsEn: [
        "He pretends to be a French detective investigating a missing passport.",
        "He claims he just traveled back from the future with a letter sent by her 82-year-old self.",
        "He pretends to be a Greek waiter offering free dessert.",
        "He acts as a fortune teller predicting their lottery numbers."
      ],
      optionsVi: [
        "Anh giả làm một thanh tra người Pháp điều tra một cuốn hộ chiếu bị thất lạc.",
        "Anh bịa ra việc mình vừa du hành thời gian từ tương lai trở về với một lá thư do chính phiên bản tuổi 82 của cô gửi gắm.",
        "Anh đóng giả làm người bồi bàn Hy Lạp tặng món tráng miệng miễn phí.",
        "Anh hành động như một thầy bói dự đoán những con số trúng xổ số của họ."
      ],
      correctAnswer: 1,
      explanation: "In Segment 100, Jesse approaches her table: 'I just traveled back from the future. I was just with your 82-year-old self who gave me a letter to read to you.'",
      explanationEn: "In Segment 100, Jesse approaches her table: 'I just traveled back from the future. I was just with your 82-year-old self who gave me a letter to read to you.'",
      explanationVi: "Trong Phân đoạn 100, Jesse bước đến bàn của cô: 'Anh vừa du hành ngược thời gian từ tương lai trở về đấy. Anh vừa gặp phiên bản tuổi 82 của em, và bà ấy đã gửi cho anh một lá thư để đọc cho em nghe.'",
      targetedConcept: "Playful reconciliation and narrative reframing in long-term marriage",
      targetedConceptEn: "Playful reconciliation and narrative reframing in long-term marriage",
      targetedConceptVi: "Nghệ thuật làm hòa hóm hỉnh và tái định hình câu chuyện trong hôn nhân lâu năm",
      referenceSegmentIndex: 100,
    },
    {
      id: "mov_rom_02_q8",
      question: "What is Jesse's ultimate definition of true love at the emotional climax of Before Midnight?",
      questionEn: "What is Jesse's ultimate definition of true love at the emotional climax of Before Midnight?",
      questionVi: "Định nghĩa tối hậu của Jesse về tình yêu đích thực ở đỉnh điểm cảm xúc của Before Midnight là gì?",
      options: [
        "A flawless romantic fairy tale where neither partner ever makes mistakes or argues.",
        "True love is real life: it is not perfect, but it is real, and denying it is sheer blindness.",
        "True love only exists during the first 24 hours of spontaneous encounters in youth.",
        "True love requires sacrificing one's personal identity entirely to satisfy the other."
      ],
      optionsEn: [
        "A flawless romantic fairy tale where neither partner ever makes mistakes or argues.",
        "True love is real life: it is not perfect, but it is real, and denying it is sheer blindness.",
        "True love only exists during the first 24 hours of spontaneous encounters in youth.",
        "True love requires sacrificing one's personal identity entirely to satisfy the other."
      ],
      optionsVi: [
        "Một câu chuyện cổ tích lãng mạn không tì vết nơi không ai mắc sai lầm hay tranh cãi.",
        "Tình yêu đích thực chính là cuộc đời thực: nó không hoàn hảo nhưng nó có thật, và chối bỏ nó chính là sự mù quáng.",
        "Tình yêu đích thực chỉ tồn tại trong 24 giờ đầu tiên của cuộc gặp gỡ ngẫu hứng thời son trẻ.",
        "Tình yêu đích thực đòi hỏi phải hy sinh hoàn toàn bản sắc cá nhân để làm hài lòng đối phương."
      ],
      correctAnswer: 1,
      explanation: "In Segment 109, Jesse firmly declares: 'If you want true love, then this is it. This is real life. It's not perfect, but it's real! And if you can't see it, then you're blind.'",
      explanationEn: "In Segment 109, Jesse firmly declares: 'If you want true love, then this is it. This is real life. It's not perfect, but it's real! And if you can't see it, then you're blind.'",
      explanationVi: "Trong Phân đoạn 109, Jesse dứt khoát tuyên bố: 'Nếu em thực sự muốn tình yêu đích thực, thì nó chính là thế này đây. Đây chính là cuộc đời thực. Nó không hoàn hảo, nhưng nó có thật! Và nếu em không thể nhìn ra điều đó, thì em mù quáng thật rồi.'",
      targetedConcept: "Mature realism versus fairy-tale romantic idealism",
      targetedConceptEn: "Mature realism versus fairy-tale romantic idealism",
      targetedConceptVi: "Chủ nghĩa hiện thực trưởng thành đối lập với ảo tưởng lãng mạn cổ tích",
      referenceSegmentIndex: 109,
    },
  ],
};

const lessonData: MockVideoLesson = {
  id: "mov_rom_02",
  slug: "the-before-trilogy-jesse-celine-love-over-time",
  title: "The Before Trilogy: Jesse & Céline - Love Over Time, Vienna Train & Paris Sunset (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "C1",
  durationFormatted: "13:39",
  durationSeconds: 819,
  externalId: "QV1tiEDvkkw",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/QV1tiEDvkkw/hqdefault.jpg",
  accent: "American & French",
  wpmSpeed: 145,
  viewCount: 2560815,
  studyCount: 6840,
  description:
    "Trích đoạn đại cảnh kết nối trọn vẹn bộ ba kiệt tác Before Trilogy (Before Sunrise, Before Sunset, Before Midnight) của đạo diễn Richard Linklater cùng Ethan Hawke (Jesse) và Julie Delpy (Céline). Khám phá triết lý tình yêu sâu sắc qua thời gian, nghệ thuật đối thoại đỉnh cao, bài thơ tình bên bờ sông Danube và cái kết chân thực về hôn nhân.",
  segments: calculatedSegments,
};

const targetFilePath = path.resolve(
  __dirname,
  "../features/listening/data/lessons/movies/romance/lesson_before_sunrise.ts"
);

const tsContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: The Before Trilogy: Jesse & Céline - Love Over Time and Spontaneous Spark (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR C1 | American & French
 * YouTube ID: QV1tiEDvkkw (13:39 - 819s)
 * Views: 2,560,815 | Likes: 48,000+
 * 
 * BÁM SÁT 100% TIMELINE, TẤT CẢ 127 PHÂN ĐOẠN NGUYÊN BẢN CỦA TOÀN BỘ VIDEO (KHÔNG BỎ SÓT)
 * ZERO MERGED UTTERANCES - TÁCH ĐỘC LẬP TỪNG LƯỢT THOẠI CỦA MỖI NHÂN VẬT
 * ============================================================================
 */

export const QUIZ_BEFORE_SUNRISE_VIENNA_NIGHT_WALK: VideoQuizData = ${JSON.stringify(
  quizData,
  null,
  2
)};

export const LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK: MockVideoLesson = {
  id: "mov_rom_02",
  slug: "the-before-trilogy-jesse-celine-love-over-time",
  title: "The Before Trilogy: Jesse & Céline - Love Over Time, Vienna Train & Paris Sunset (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "C1",
  durationFormatted: "13:39",
  durationSeconds: 819,
  externalId: "QV1tiEDvkkw",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/QV1tiEDvkkw/hqdefault.jpg",
  accent: "American & French",
  wpmSpeed: 145,
  viewCount: 2560815,
  studyCount: 6840,
  description:
    "Trích đoạn đại cảnh kết nối trọn vẹn bộ ba kiệt tác Before Trilogy (Before Sunrise, Before Sunset, Before Midnight) của đạo diễn Richard Linklater cùng Ethan Hawke (Jesse) và Julie Delpy (Céline). Khám phá triết lý tình yêu sâu sắc qua thời gian, nghệ thuật đối thoại đỉnh cao, bài thơ tình bên bờ sông Danube và cái kết chân thực về hôn nhân.",
  segments: ${JSON.stringify(calculatedSegments, null, 2)}
};
`;

fs.writeFileSync(targetFilePath, tsContent, "utf-8");
console.log(`Successfully generated ${targetFilePath} with ${calculatedSegments.length} Pure Master Segments!`);
