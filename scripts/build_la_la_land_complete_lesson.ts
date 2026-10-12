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

const rawPath = path.resolve(__dirname, "la_la_land_raw_segments.json");
const rawData: RawSegment[] = JSON.parse(fs.readFileSync(rawPath, "utf-8"));

console.log(`Loaded ${rawData.length} raw zero-merged segments for La La Land.`);

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
  lessonId: "mov_rom_03",
  lessonTitle: "La La Land: Sebastian & Mia's Fierce Surprise Dinner Confrontation (Full Master Cut)",
  totalQuestions: 8,
  xpReward: 100,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "mov_rom_03_q1",
      question: "Why does Mia express intense anxiety about performing her one-woman play?",
      questionEn: "Why does Mia express intense anxiety about performing her one-woman play?",
      questionVi: "Tại sao Mia lại bày tỏ nỗi lo âu tột độ về việc biểu diễn vở kịch độc thoại do chính cô viết?",
      options: [
        "She has not finished memorizing the final act of her script.",
        "She is terrified of getting up on a stage and being judged by an audience.",
        "The venue management cancelled her reserved theater slot.",
        "Her director resigned two weeks before the opening night."
      ],
      optionsEn: [
        "She has not finished memorizing the final act of her script.",
        "She is terrified of getting up on a stage and being judged by an audience.",
        "The venue management cancelled her reserved theater slot.",
        "Her director resigned two weeks before the opening night."
      ],
      optionsVi: [
        "Cô vẫn chưa học thuộc xong màn cuối của kịch bản.",
        "Cô sợ cảm giác phải bước lên sân khấu và bị khán giả phán xét.",
        "Ban quản lý nhà hát đã hủy lịch diễn đã đặt trước của cô.",
        "Đạo diễn của cô đã từ chức hai tuần trước đêm công diễn."
      ],
      correctAnswer: 1,
      explanation: "In Segments 10 and 11, Mia confesses: 'I'm nervous to do it. I'm nervous to get up on a stage and perform for people. I'm terrified.'",
      explanationEn: "In Segments 10 and 11, Mia confesses: 'I'm nervous to do it. I'm nervous to get up on a stage and perform for people. I'm terrified.'",
      explanationVi: "Trong Phân đoạn 10 và 11, Mia bộc bạch: 'Em sợ làm điều đó. Em sợ cảm giác bước lên sân khấu và biểu diễn trước mặt mọi người. Em sợ phát khiếp lên được.'",
      targetedConcept: "Artistic vulnerability and stage fright",
      targetedConceptEn: "Artistic vulnerability and stage fright",
      targetedConceptVi: "Sự mong manh của nghệ sĩ và nỗi sợ sân khấu",
      referenceSegmentIndex: 10
    },
    {
      id: "mov_rom_03_q2",
      question: "Why does Mia decline Sebastian's spontaneous invitation to come to Boise?",
      questionEn: "Why does Mia decline Sebastian's spontaneous invitation to come to Boise?",
      questionVi: "Tại sao Mia lại từ chối lời mời ngẫu hứng của Sebastian cùng đi đến Boise?",
      options: [
        "She hates cold weather and traveling by tour bus.",
        "She must stay in Los Angeles to rehearse because her play opens in two weeks and all her props are there.",
        "She has scheduled multiple commercial auditions during the upcoming weekend.",
        "She does not want to interact with Keith and his production crew."
      ],
      optionsEn: [
        "She hates cold weather and traveling by tour bus.",
        "She must stay in Los Angeles to rehearse because her play opens in two weeks and all her props are there.",
        "She has scheduled multiple commercial auditions during the upcoming weekend.",
        "She does not want to interact with Keith and his production crew."
      ],
      optionsVi: [
        "Cô ghét thời tiết lạnh và việc di chuyển bằng xe bus lưu diễn.",
        "Cô phải ở lại Los Angeles để tập dượt vì vở kịch sẽ công diễn trong hai tuần nữa và toàn bộ đồ đạc đều ở đây.",
        "Cô đã có lịch tham gia nhiều buổi thử vai quảng cáo vào cuối tuần tới.",
        "Cô không muốn tiếp xúc với Keith và ê-kíp sản xuất của anh ấy."
      ],
      correctAnswer: 1,
      explanation: "In Segments 30 and 34, Mia explains: 'Because I have to rehearse!... all my stuff is here and it's in two weeks, so I don't really think that would be practical.'",
      explanationEn: "In Segments 30 and 34, Mia explains: 'Because I have to rehearse!... all my stuff is here and it's in two weeks, so I don't really think that would be practical.'",
      explanationVi: "Trong Phân đoạn 30 và 34, Mia giải thích: 'Vì em phải tập kịch!... toàn bộ đồ đạc của em ở đây và chỉ còn hai tuần nữa, nên em thấy đi như vậy không thực tế chút nào.'",
      targetedConcept: "Conflicting priorities and professional commitments",
      targetedConceptEn: "Conflicting priorities and professional commitments",
      targetedConceptVi: "Xung đột ưu tiên và cam kết sự nghiệp riêng",
      referenceSegmentIndex: 34
    },
    {
      id: "mov_rom_03_q3",
      question: "Why is Mia taken aback when Sebastian reveals his touring timeline with Keith's band?",
      questionEn: "Why is Mia taken aback when Sebastian reveals his touring timeline with Keith's band?",
      questionVi: "Tại sao Mia lại sững sờ khi Sebastian tiết lộ lịch trình lưu diễn dài hạn cùng ban nhạc của Keith?",
      options: [
        "The band is leaving immediately for an unannounced international European tour.",
        "It is a perpetual cycle of touring to record and touring to sell, keeping him on the road for years.",
        "Sebastian is being demoted from lead pianist to backing keyboardist.",
        "The record contract obligates him to move permanently to New York City."
      ],
      optionsEn: [
        "The band is leaving immediately for an unannounced international European tour.",
        "It is a perpetual cycle of touring to record and touring to sell, keeping him on the road for years.",
        "Sebastian is being demoted from lead pianist to backing keyboardist.",
        "The record contract obligates him to move permanently to New York City."
      ],
      optionsVi: [
        "Ban nhạc sẽ lên đường ngay lập tức cho chuyến lưu diễn châu Âu bất ngờ.",
        "Đó là một vòng lặp liên miên: lưu diễn để thu âm rồi lại lưu diễn để bán đĩa, khiến anh phải xa nhà hàng năm trời.",
        "Sebastian bị giáng chức từ nghệ sĩ dương cầm chính xuống chơi phím phụ họa.",
        "Hợp đồng thu âm bắt buộc anh phải chuyển hẳn đến định cư tại thành phố New York."
      ],
      correctAnswer: 1,
      explanation: "In Segments 40 and 49, Sebastian explains the reality of 'the long haul': 'We tour so we can make the records, so we can go back and sell the record... feasibly, I could be on tour with this for a couple of years, at least.'",
      explanationEn: "In Segments 40 and 49, Sebastian explains the reality of 'the long haul': 'We tour so we can make the records, so we can go back and sell the record... feasibly, I could be on tour with this for a couple of years, at least.'",
      explanationVi: "Trong Phân đoạn 40 và 49, Sebastian giải thích về 'chặng đường dài hạn': 'Bọn anh lưu diễn để có tiền làm album, rồi lại đi lưu diễn để bán đĩa... trên thực tế, anh có thể phải đi tour với album này ít nhất vài năm trời.'",
      targetedConcept: "The grueling cycle of commercial touring",
      targetedConceptEn: "The grueling cycle of commercial touring",
      targetedConceptVi: "Vòng luẩn quẩn bào mòn của công nghiệp lưu diễn thương mại",
      referenceSegmentIndex: 40
    },
    {
      id: "mov_rom_03_q4",
      question: "What fundamental objection does Mia raise about Sebastian's musical direction?",
      questionEn: "What fundamental objection does Mia raise about Sebastian's musical direction?",
      questionVi: "Lời chất vấn căn bản nào Mia đưa ra đối với định hướng âm nhạc hiện tại của Sebastian?",
      options: [
        "That his synthesizers and electronic keyboards sound uninspired.",
        "That if he is giving up his lifelong dream, it matters whether he genuinely likes the music he is playing.",
        "That the band does not pay him royalties for his songwriting credits.",
        "That Keith is replacing acoustic instruments with computerized backing tracks."
      ],
      optionsEn: [
        "That his synthesizers and electronic keyboards sound uninspired.",
        "That if he is giving up his lifelong dream, it matters whether he genuinely likes the music he is playing.",
        "That the band does not pay him royalties for his songwriting credits.",
        "That Keith is replacing acoustic instruments with computerized backing tracks."
      ],
      optionsVi: [
        "Rằng âm thanh đàn điện tử và synthesizer của anh nghe thiếu cảm xúc.",
        "Rằng nếu anh từ bỏ giấc mơ cả đời của mình, điều quan trọng là anh có thực sự yêu thích thứ âm nhạc anh đang chơi hay không.",
        "Rằng ban nhạc không trả tiền tác quyền cho những sáng tác của anh.",
        "Rằng Keith đang thay thế toàn bộ nhạc cụ mộc bằng các bản phối vi tính."
      ],
      correctAnswer: 1,
      explanation: "In Segment 52, Mia directly challenges him: 'Well, it matters because if you're gonna give up your dream, I think it matters that you like what you're playing on the road for years.'",
      explanationEn: "In Segment 52, Mia directly challenges him: 'Well, it matters because if you're gonna give up your dream, I think it matters that you like what you're playing on the road for years.'",
      explanationVi: "Trong Phân đoạn 52, Mia thẳng thắn chất vấn: 'Điều đó quan trọng chứ, bởi vì nếu anh từ bỏ ước mơ của mình, em nghĩ điều quan trọng là anh phải yêu thích những gì anh đang chơi trên những chuyến lưu diễn hàng năm trời.'",
      targetedConcept: "Artistic authenticity vs pragmatic compromise",
      targetedConceptEn: "Artistic authenticity vs pragmatic compromise",
      targetedConceptVi: "Tính chân thực trong nghệ thuật đối lập với sự thỏa hiệp thực dụng",
      referenceSegmentIndex: 52
    },
    {
      id: "mov_rom_03_q5",
      question: "How does Sebastian justify staying with the band instead of opening his own club?",
      questionEn: "How does Sebastian justify staying with the band instead of opening his own club?",
      questionVi: "Sebastian tự biện minh như thế nào cho việc tiếp tục ở lại ban nhạc thay vì mở câu lạc bộ riêng?",
      options: [
        "He claims that pure jazz is dead and he prefers stadium rock crowds.",
        "He fears returning to playing 'Jingle Bells' and scraping pennies, arguing it is 'time to grow up' with a steady job.",
        "He wants to become a record executive and quit playing instruments altogether.",
        "His father advised him that opening an independent venue leads to immediate bankruptcy."
      ],
      optionsEn: [
        "He claims that pure jazz is dead and he prefers stadium rock crowds.",
        "He fears returning to playing 'Jingle Bells' and scraping pennies, arguing it is 'time to grow up' with a steady job.",
        "He wants to become a record executive and quit playing instruments altogether.",
        "His father advised him that opening an independent venue leads to immediate bankruptcy."
      ],
      optionsVi: [
        "Anh cho rằng jazz thuần túy đã chết và anh thích đám đông cuồng nhiệt ở sân vận động hơn.",
        "Anh sợ phải quay lại cảnh đánh bài 'Jingle Bells' kiếm từng đồng lẻ, và cho rằng đã 'đến lúc phải trưởng thành' với một công việc ổn định.",
        "Anh muốn trở thành nhà sản xuất âm nhạc và từ bỏ hoàn toàn việc chơi đàn.",
        "Bố của anh khuyên rằng việc mở một địa điểm biểu diễn độc lập sẽ dẫn tới phá sản ngay lập tức."
      ],
      correctAnswer: 1,
      explanation: "In Segments 66 and 69, Sebastian argues: 'What am I supposed to do? Go back to playing 'Jingle Bells' and scraping pennies... it's time to grow up, you know? I have a steady job.'",
      explanationEn: "In Segments 66 and 69, Sebastian argues: 'What am I supposed to do? Go back to playing 'Jingle Bells' and scraping pennies... it's time to grow up, you know? I have a steady job.'",
      explanationVi: "Trong Phân đoạn 66 và 69, Sebastian tranh biện: 'Anh phải làm gì bây giờ? Quay lại chơi bài Jingle Bells và nhặt nhạnh từng đồng xu lẻ ư... đã đến lúc phải trưởng thành rồi, em hiểu không? Anh đang có một công việc ổn định.'",
      targetedConcept: "Fear of poverty and rationale of maturity",
      targetedConceptEn: "Fear of poverty and rationale of maturity",
      targetedConceptVi: "Nỗi sợ nghèo túng và vỏ bọc của sự trưởng thành thực dụng",
      referenceSegmentIndex: 66
    },
    {
      id: "mov_rom_03_q6",
      question: "What inspiring argument does Mia give to convince Sebastian that an authentic jazz club can succeed?",
      questionEn: "What inspiring argument does Mia give to convince Sebastian that an authentic jazz club can succeed?",
      questionVi: "Luận điểm truyền cảm hứng nào Mia đưa ra để thuyết phục Sebastian rằng một câu lạc bộ jazz nguyên bản hoàn toàn có thể thành công?",
      options: [
        "Trendy youth culture always embraces retro vintage aesthetics.",
        "People will come because of his passion, because people love what others are passionate about and he reminds them of what they forgot.",
        "She can secure celebrity sponsorships through her studio connections.",
        "Los Angeles municipal grants will fund traditional jazz preservation."
      ],
      optionsEn: [
        "Trendy youth culture always embraces retro vintage aesthetics.",
        "People will come because of his passion, because people love what others are passionate about and he reminds them of what they forgot.",
        "She can secure celebrity sponsorships through her studio connections.",
        "Los Angeles municipal grants will fund traditional jazz preservation."
      ],
      optionsVi: [
        "Giới trẻ yêu thích xu hướng sẽ luôn chào đón phong cách cổ điển hoài niệm.",
        "Mọi người sẽ đến vì đam mê của anh, bởi người ta yêu thích những gì người khác say mê và anh nhắc họ nhớ lại những điều đẹp đẽ đã lãng quên.",
        "Cô có thể xin được tài trợ từ các ngôi sao nổi tiếng nhờ những mối quan hệ tại phim trường.",
        "Các quỹ trợ cấp của thành phố Los Angeles sẽ tài trợ cho việc bảo tồn nhạc jazz truyền thống."
      ],
      correctAnswer: 1,
      explanation: "In Segment 67, Mia delivers her iconic thesis: 'People will want to go to it because you're passionate about it, and people love what other people are passionate about! You remind people of what they forgot!'",
      explanationEn: "In Segment 67, Mia delivers her iconic thesis: 'People will want to go to it because you're passionate about it, and people love what other people are passionate about! You remind people of what they forgot!'",
      explanationVi: "Trong Phân đoạn 67, Mia đưa ra quan điểm kinh điển: 'Mọi người sẽ muốn đến đó vì anh say mê nó, và người ta luôn yêu thích những gì mà người khác đam mê chân thành! Anh nhắc cho mọi người nhớ lại những điều họ từng quên lãng!'"
      ,
      targetedConcept: "The contagious power of authentic artistic passion",
      targetedConceptEn: "The contagious power of authentic artistic passion",
      targetedConceptVi: "Sức lan tỏa kỳ diệu của niềm đam mê nghệ thuật chân chính",
      referenceSegmentIndex: 67
    },
    {
      id: "mov_rom_03_q7",
      question: "What deeply wounding accusation does Sebastian make that shatters Mia's emotional composure?",
      questionEn: "What deeply wounding accusation does Sebastian make that shatters Mia's emotional composure?",
      questionVi: "Lời quy chụp gây tổn thương sâu sắc nào mà Sebastian buông ra khiến sự kìm nén cảm xúc của Mia hoàn toàn sụp đổ?",
      options: [
        "That she only wrote her play to get revenge on casting agents.",
        "That she only liked him when he was on his ass (unsuccessful and broke) because it made her feel better about herself.",
        "That she was secretly jealous of the band's massive sold-out concerts.",
        "That she is a superficial barista who doesn't understand music theory."
      ],
      optionsEn: [
        "That she only wrote her play to get revenge on casting agents.",
        "That she only liked him when he was on his ass (unsuccessful and broke) because it made her feel better about herself.",
        "That she was secretly jealous of the band's massive sold-out concerts.",
        "That she is a superficial barista who doesn't understand music theory."
      ],
      optionsVi: [
        "Rằng cô viết kịch bản chỉ để trả đũa những giám đốc tuyển vai.",
        "Rằng cô chỉ thích anh khi anh còn là kẻ bết bát thất bại ('on my ass') bởi vì điều đó làm cô cảm thấy bản thân mình tốt đẹp và vượt trội hơn.",
        "Rằng cô đang âm thầm ghen tị với những đêm nhạc cháy vé của ban nhạc.",
        "Rằng cô chỉ là một nhân viên pha cà phê nông cạn không hiểu gì về nhạc lý."
      ],
      correctAnswer: 1,
      explanation: "In Segment 78, Sebastian strikes his most venomous blow: 'Maybe you just liked me when I was on my ass, because it made you feel better about yourself.'",
      explanationEn: "In Segment 78, Sebastian strikes his most venomous blow: 'Maybe you just liked me when I was on my ass, because it made you feel better about yourself.'",
      explanationVi: "Trong Phân đoạn 78, Sebastian buông lời tàn nhẫn nhất: 'Có lẽ em chỉ thích anh khi anh còn là kẻ bết bát thất bại, bởi vì điều đó làm em cảm thấy bản thân mình tốt đẹp và vượt trội hơn.'",
      targetedConcept: "Defensive projection and emotional toxicity",
      targetedConceptEn: "Defensive projection and emotional toxicity",
      targetedConceptVi: "Sự phòng vệ độc hại và công kích hạ thấp nhân phẩm đối phương",
      referenceSegmentIndex: 78
    },
    {
      id: "mov_rom_03_q8",
      question: "What sensory catalyst abruptly terminates the confrontation, leading to Mia walking out into the rain?",
      questionEn: "What sensory catalyst abruptly terminates the confrontation, leading to Mia walking out into the rain?",
      questionVi: "Chất xúc tác giác quan nào đột ngột chấm dứt cuộc cãi vã, dẫn đến việc Mia bước đi trong màn mưa?",
      options: [
        "A shattered glass table causing an emergency medical response.",
        "The smoke alarm blaring deafeningly as the forgotten dinner burns in the oven, creating a suffocating reality check.",
        "A lightning strike knocking out the electrical power and turning off the record player.",
        "A call on the landline announcing Mia's callback for an audition."
      ],
      optionsEn: [
        "A shattered glass table causing an emergency medical response.",
        "The smoke alarm blaring deafeningly as the forgotten dinner burns in the oven, creating a suffocating reality check.",
        "A lightning strike knocking out the electrical power and turning off the record player.",
        "A call on the landline announcing Mia's callback for an audition."
      ],
      optionsVi: [
        "Mặt bàn kính bị vỡ toang đòi hỏi phải cấp cứu y tế.",
        "Chuông báo cháy réo vang chói tai khi bữa tối bị lãng quên cháy khét trong lò, kéo cả hai về thực tại ngột ngạt.",
        "Một tia sét đánh trúng làm mất điện toàn bộ và làm tắt máy hát đĩa than.",
        "Một cuộc gọi vào điện thoại bàn thông báo Mia được gọi thử vai lại."
      ],
      correctAnswer: 1,
      explanation: "In Segments 81, 82, and 85, the smoke alarm blares deafeningly as thick black smoke pours from the oven; Mia gathers her coat and purse in tears and rushes out into the pouring rain as the door slams shut.",
      explanationEn: "In Segments 81, 82, and 85, the smoke alarm blares deafeningly as thick black smoke pours from the oven; Mia gathers her coat and purse in tears and rushes out into the pouring rain as the door slams shut.",
      explanationVi: "Trong các Phân đoạn 81, 82 và 85, còi báo cháy réo vang chói tai khi khói đen ngập lò nướng; Mia ôm áo khoác và túi xách trong nước mắt lao ra màn mưa tầm tã khi cánh cửa đóng sầm lại.",
      targetedConcept: "Dramatic symbolism of destroyed domestic bliss",
      targetedConceptEn: "Dramatic symbolism of destroyed domestic bliss",
      targetedConceptVi: "Biểu tượng kịch tính về sự tan vỡ của hạnh phúc gia đình",
      referenceSegmentIndex: 81
    }
  ]
};

const targetFilePath = path.resolve(
  __dirname,
  "../features/listening/data/lessons/movies/romance/lesson_la_la_land.ts"
);

const tsContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: La La Land: Sebastian & Mia's Fierce Surprise Dinner Confrontation (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B2 | American
 * YouTube ID: gW0xteHHXrY (06:30 - 390s)
 * Views: 839,562 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE, TẤT CẢ 87 PHÂN ĐOẠN NGUYÊN BẢN CỦA TOÀN BỘ VIDEO (KHÔNG BỎ SÓT)
 * ZERO MERGED UTTERANCES - TÁCH ĐỘC LẬP TỪNG LƯỢT THOẠI CỦA MỖI NHÂN VẬT
 * PHỦ KÍN 87 MASTER SEGMENTS TỪ GIÂY 00:00 ĐẾN 06:30 (390 GIÂY)
 * ============================================================================
 */

export const QUIZ_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION: VideoQuizData = ${JSON.stringify(
  quizData,
  null,
  2
)};

export const LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION: MockVideoLesson = {
  id: "mov_rom_03",
  slug: "la-la-land-the-fools-who-dream-audition",
  title: "La La Land: Sebastian & Mia's Fierce Surprise Dinner Confrontation (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "06:30",
  durationSeconds: 390,
  externalId: "gW0xteHHXrY",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/gW0xteHHXrY/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 135,
  viewCount: 839562,
  studyCount: 3120,
  description:
    "Phân cảnh tranh luận kịch tính đoạt giải Oscar trong La La Land: Sebastian bất ngờ trở về nấu bữa tối lãng mạn cho Mia, nhưng cuộc trò chuyện nhanh chóng chuyển thành xung đột dữ dội về việc thỏa hiệp đam mê nghệ thuật thực thụ để đổi lấy danh tiếng thương mại.",
  segments: ${JSON.stringify(calculatedSegments, null, 2)},
  quiz: QUIZ_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION
};

export default LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION;
`;

fs.writeFileSync(targetFilePath, tsContent, "utf-8");
console.log(`Successfully generated ${targetFilePath} with ${calculatedSegments.length} Pure Master Segments!`);
