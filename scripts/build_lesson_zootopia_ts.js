const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/zootopia_pure_segments.json', 'utf-8'));

// Double check tokenCount
segments.forEach((s) => {
  s.tokenCount = (s.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
});

const quizData = {
  lessonId: "mov_ani_07",
  lessonTitle: "Zootopia: Judy Hopps & Nick Wilde Carrot Pen Investigation",
  totalQuestions: 8,
  xpReward: 200,
  generatedBy: "AI_GEMINI",
  questions: [
    {
      id: "q_mov_ani_07_1",
      question: "Why does Officer Judy Hopps gently correct Clawhauser when he exclaims that she is 'cuter than I thought you'd be'?",
      questionEn: "Why does Officer Judy Hopps gently correct Clawhauser when he exclaims that she is 'cuter than I thought you'd be'?",
      questionVi: "Tại sao Sĩ quan Judy Hopps nhẹ nhàng nhắc nhở Clawhauser khi anh thốt lên rằng cô 'đáng yêu hơn cả những gì tôi tưởng'?",
      options: [
        "Because among bunnies the term 'cute' is an affectionate in-group label, but from other species it carries condescending stereotyping",
        "Because she prefers being addressed strictly by her formal academic title 'Doctor Hopps'",
        "Because Clawhauser pronounced the word with an unfamiliar regional dialect that confused her",
        "Because she wanted him to offer her a free box of glazed donuts before giving compliments"
      ],
      optionsEn: [
        "Because among bunnies the term 'cute' is an affectionate in-group label, but from other species it carries condescending stereotyping",
        "Because she prefers being addressed strictly by her formal academic title 'Doctor Hopps'",
        "Because Clawhauser pronounced the word with an unfamiliar regional dialect that confused her",
        "Because she wanted him to offer her a free box of glazed donuts before giving compliments"
      ],
      optionsVi: [
        "Bởi vì trong cộng đồng loài thỏ, từ 'cute' là cách gọi thân mật nội bộ, nhưng khi loài khác dùng thì nó mang hàm ý định kiến trịch thượng",
        "Bởi vì cô muốn được gọi trang trọng bằng học vị chính thức 'Tiến sĩ Hopps'",
        "Bởi vì Clawhauser phát âm từ đó bằng một ngữ điệu địa phương lạ lẫm khiến cô bối rối",
        "Bởi vì cô muốn anh mời một hộp bánh rán trước khi nói lời khen ngợi"
      ],
      correctAnswer: 0,
      explanation: "Judy explains the sociolinguistic nuance that 'cute' can be reclaimed within rabbit culture, but when used by other animals it reinforces patronizing stereotypes.",
      explanationEn: "Judy explains the sociolinguistic nuance that 'cute' can be reclaimed within rabbit culture, but when used by other animals it reinforces patronizing stereotypes.",
      explanationVi: "Judy giải thích sắc thái văn hóa xã hội rằng từ 'cute' có thể được sử dụng thân mật nội bộ loài thỏ, nhưng khi các loài khác dùng thì lại củng cố định kiến trịch thượng.",
      targetedConcept: "Sociolinguistic Nuances: In-group Terminology & Stereotyping",
      targetedConceptEn: "Sociolinguistic Nuances: In-group Terminology & Stereotyping",
      targetedConceptVi: "Sắc thái ngôn ngữ xã hội: Thuật ngữ nội bộ & Định kiến",
      referenceSegmentIndex: 3
    },
    {
      id: "q_mov_ani_07_2",
      question: "What rhetorical figure of speech and comedic wordplay does Chief Bogo utilize when mentioning 'the elephant in the room'?",
      questionEn: "What rhetorical figure of speech and comedic wordplay does Chief Bogo utilize when mentioning 'the elephant in the room'?",
      questionVi: "Trưởng đồn Bogo sử dụng biện pháp tu từ và lối chơi chữ hài hước nào khi nhắc đến 'the elephant in the room'?",
      options: [
        "A literal pun on an English idiom, subverting an expression about an ignored problem to wish happy birthday to Officer Francine, an actual elephant",
        "A harsh hyperbole warning his officers about an escaped circus animal rampaging through downtown",
        "A sarcastic metaphor criticizing the police precinct's lack of adequate office space and heavy furniture",
        "An alliteration describing the massive paperwork accumulation on his departmental docket"
      ],
      optionsEn: [
        "A literal pun on an English idiom, subverting an expression about an ignored problem to wish happy birthday to Officer Francine, an actual elephant",
        "A harsh hyperbole warning his officers about an escaped circus animal rampaging through downtown",
        "A sarcastic metaphor criticizing the police precinct's lack of adequate office space and heavy furniture",
        "An alliteration describing the massive paperwork accumulation on his departmental docket"
      ],
      optionsVi: [
        "Lối chơi chữ nghĩa đen trên thành ngữ tiếng Anh, đảo ngược câu nói về vấn đề nhức nhối né tránh để chúc mừng sinh nhật Sĩ quan Francine, một cô voi thực thụ",
        "Phép ngoa dụ gay gắt cảnh báo các sĩ quan về một con thú xiếc xổng chuồng đang náo loạn trung tâm",
        "Ẩn dụ châm biếm chỉ trích đồn cảnh sát thiếu không gian làm việc và nội thất cồng kềnh",
        "Phép điệp âm miêu tả sự tích tụ giấy tờ quá tải trong chương trình nghị sự của sở"
      ],
      correctAnswer: 0,
      explanation: "Chief Bogo uses the idiom 'the elephant in the room' literally to address Officer Francine (an elephant) wishing her a happy birthday, creating clever comedic subversion.",
      explanationEn: "Chief Bogo uses the idiom 'the elephant in the room' literally to address Officer Francine (an elephant) wishing her a happy birthday, creating clever comedic subversion.",
      explanationVi: "Trưởng đồn Bogo dùng thành ngữ 'the elephant in the room' theo nghĩa đen tuyệt đối để hướng tới Sĩ quan Francine (một cô voi) chúc mừng sinh nhật, tạo nên cú đảo nghĩa hài hước.",
      targetedConcept: "Idiom Subversion: Literal Pun on 'Elephant in the Room'",
      targetedConceptEn: "Idiom Subversion: Literal Pun on 'Elephant in the Room'",
      targetedConceptVi: "Nghệ thuật chơi chữ: Nghĩa đen thành ngữ 'Elephant in the Room'",
      referenceSegmentIndex: 14
    },
    {
      id: "q_mov_ani_07_3",
      question: "Why is solving the fourteen missing mammal cases considered 'priority number one' with immense pressure on Chief Bogo?",
      questionEn: "Why is solving the fourteen missing mammal cases considered 'priority number one' with immense pressure on Chief Bogo?",
      questionVi: "Tại sao việc phá mười bốn vụ án động vật có vú mất tích lại được coi là 'ưu tiên số một' với áp lực đè nặng lên Trưởng đồn Bogo?",
      options: [
        "Because all fourteen missing victims are predators, and City Hall is aggressively pressing the ZPD for immediate results",
        "Because the victims took all the financial records and tax returns of Zootopia with them",
        "Because the mayor ordered the entire police force to be replaced if cases weren't solved by noon",
        "Because the missing mammals were all high-ranking precinct chiefs from neighboring foreign cities"
      ],
      optionsEn: [
        "Because all fourteen missing victims are predators, and City Hall is aggressively pressing the ZPD for immediate results",
        "Because the victims took all the financial records and tax returns of Zootopia with them",
        "Because the mayor ordered the entire police force to be replaced if cases weren't solved by noon",
        "Because the missing mammals were all high-ranking precinct chiefs from neighboring foreign cities"
      ],
      optionsVi: [
        "Bởi vì toàn bộ mười bốn nạn nhân mất tích đều là loài săn mồi, và Tòa Thị Chính đang ráo riết gây áp lực buộc sở ZPD phải có kết quả ngay",
        "Bởi vì các nạn nhân đã mang theo toàn bộ hồ sơ tài chính và quyết toán thuế của thành phố Zootopia",
        "Bởi vì thị trưởng ra lệnh sa thải toàn bộ lực lượng cảnh sát nếu không phá án trước buổi trưa",
        "Bởi vì những động vật mất tích đều là các cảnh trưởng cấp cao từ các thành phố láng giềng"
      ],
      correctAnswer: 0,
      explanation: "Bogo emphasizes that City Hall is 'right up my tail' because fourteen predator mammals disappeared across multiple districts, making it an urgent crisis.",
      explanationEn: "Bogo emphasizes that City Hall is 'right up my tail' because fourteen predator mammals disappeared across multiple districts, making it an urgent crisis.",
      explanationVi: "Bogo nhấn mạnh Tòa Thị Chính đang 'bám sát gót đuôi' vì mười bốn động vật săn mồi mất tích bí ẩn tại nhiều phân khu, tạo nên cuộc khủng hoảng an ninh cấp bách.",
      targetedConcept: "Narrative Plot Dynamics: Priority Number One & External Pressure",
      targetedConceptEn: "Narrative Plot Dynamics: Priority Number One & External Pressure",
      targetedConceptVi: "Mạch truyện điện ảnh: Ưu tiên số một & Áp lực từ Tòa Thị Chính",
      referenceSegmentIndex: 19
    },
    {
      id: "q_mov_ani_07_4",
      question: "How does Judy Hopps demonstrate her psychological resilience when Chief Bogo assigns her to parking duty?",
      questionEn: "How does Judy Hopps demonstrate her psychological resilience when Chief Bogo assigns her to parking duty?",
      questionVi: "Judy Hopps thể hiện bản lĩnh kiên định như thế nào khi Trưởng đồn Bogo phân công cô làm nhiệm vụ ghi vé phạt đỗ xe?",
      options: [
        "Instead of succumbing to disappointment, she ambitiously doubles the daily quota to write two hundred tickets before noon",
        "She immediately submits a formal complaint to the mayor requesting Bogo's immediate demotion",
        "She resigns from the police force on the spot and joins Nick Wilde's pawpsicle enterprise",
        "She refuses to take the ticket writer vehicle and decides to patrol the rainforest on foot"
      ],
      optionsEn: [
        "Instead of succumbing to disappointment, she ambitiously doubles the daily quota to write two hundred tickets before noon",
        "She immediately submits a formal complaint to the mayor requesting Bogo's immediate demotion",
        "She resigns from the police force on the spot and joins Nick Wilde's pawpsicle enterprise",
        "She refuses to take the ticket writer vehicle and decides to patrol the rainforest on foot"
      ],
      optionsVi: [
        "Thay vì nản lòng thất vọng, cô đầy tham vọng nhân đôi chỉ tiêu hàng ngày để viết hai trăm vé phạt trước buổi trưa",
        "Cô lập tức gửi đơn khiếu nại lên thị trưởng yêu cầu giáng chức Trưởng đồn Bogo",
        "Cô lập tức nộp đơn từ chức khỏi ngành cảnh sát và gia nhập phi vụ kem pawpsicle của Nick Wilde",
        "Cô từ chối lái xe xé vé phạt và quyết định tự mình đi tuần tra khu rừng mưa nhiệt đới"
      ],
      correctAnswer: 0,
      explanation: "When Bogo dismissively remarks that writing 100 tickets should be a breeze, Judy defiantly vows to write 200 tickets before noon to exceed all expectations.",
      explanationEn: "When Bogo dismissively remarks that writing 100 tickets should be a breeze, Judy defiantly vows to write 200 tickets before noon to exceed all expectations.",
      explanationVi: "Khi Bogo mỉa mai rằng viết 100 vé phạt là chuyện dễ như bỡn, Judy kiên cường thề sẽ ghi hẳn 200 vé trước buổi trưa để vượt xa mọi sự kỳ vọng.",
      targetedConcept: "Character Motivation & Resilience: Doubling the Daily Quota",
      targetedConceptEn: "Character Motivation & Resilience: Doubling the Daily Quota",
      targetedConceptVi: "Ý chí và động lực nhân vật: Nhân đôi chỉ tiêu ghi vé phạt",
      referenceSegmentIndex: 24
    },
    {
      id: "q_mov_ani_07_5",
      question: "What linguistic loophole does Nick Wilde exploit when Judy accuses him of lying about selling 'authentic redwood'?",
      questionEn: "What linguistic loophole does Nick Wilde exploit when Judy accuses him of lying about selling 'authentic redwood'?",
      questionVi: "Nick Wilde khai thác kẽ hở ngôn từ nào khi Judy cáo buộc anh nói dối về việc bán 'gỗ hồng mộc chính hiệu'?",
      options: [
        "He separates the compound noun 'redwood' into two words 'red wood', arguing the sticks are literally pieces of wood painted red",
        "He claims the mice misunderstood his foreign accent because he spoke too quickly",
        "He argues that redwood can legally refer to any birch tree found in the tundra district",
        "He produces a forged certificate of authenticity signed by the Little Rodentia lumber union"
      ],
      optionsEn: [
        "He separates the compound noun 'redwood' into two words 'red wood', arguing the sticks are literally pieces of wood painted red",
        "He claims the mice misunderstood his foreign accent because he spoke too quickly",
        "He argues that redwood can legally refer to any birch tree found in the tundra district",
        "He produces a forged certificate of authenticity signed by the Little Rodentia lumber union"
      ],
      optionsVi: [
        "Anh tách danh từ ghép 'redwood' thành hai từ riêng biệt 'red wood', biện bạch rằng que kem thực sự chỉ là gỗ có màu đỏ",
        "Anh cho rằng những chú chuột đã nghe nhầm chất giọng ngoại quốc của anh vì anh nói quá nhanh",
        "Anh lập luận rằng từ redwood theo luật có thể chỉ bất kỳ cây bạch dương nào ở vùng lãnh nguyên",
        "Anh đưa ra một chứng nhận xuất xứ giả mạo có chữ ký của nghiệp đoàn gỗ Tiểu Gặm Nhấm"
      ],
      correctAnswer: 0,
      explanation: "Nick cynically justifies his scam through semantics: distinguishing 'redwood' (the Sequoia tree timber) from 'red wood' (wood that is red).",
      explanationEn: "Nick cynically justifies his scam through semantics: distinguishing 'redwood' (the Sequoia tree timber) from 'red wood' (wood that is red).",
      explanationVi: "Nick ngụy biện cho trò lừa của mình bằng ngữ nghĩa học: phân biệt danh từ ghép 'redwood' (gỗ tùng đỏ đắt tiền) với cụm 'red wood' (gỗ nhuộm màu đỏ).",
      targetedConcept: "Verbal Ambiguity & Deception: Compound Noun vs. Descriptive Adjective",
      targetedConceptEn: "Verbal Ambiguity & Deception: Compound Noun vs. Descriptive Adjective",
      targetedConceptVi: "Kẽ hở ngôn từ: Danh từ ghép đối lập Cụm tính từ miêu tả",
      referenceSegmentIndex: 31
    },
    {
      id: "q_mov_ani_07_6",
      question: "In street slang and conversational English, what does the expression 'It's called a hustle' mean in Nick Wilde's philosophy?",
      questionEn: "In street slang and conversational English, what does the expression 'It's called a hustle' mean in Nick Wilde's philosophy?",
      questionVi: "Trong tiếng lóng đường phố và hội thoại, thành ngữ 'It's called a hustle' mang ý nghĩa gì theo triết lý của Nick Wilde?",
      options: [
        "It denotes an ingenious, street-smart scheme to exploit loopholes and make money through cunning adaptability",
        "It refers to a rigorous physical exercise routine performed by rookie athletes at sunrise",
        "It signifies an official legal contract sanctioned by municipal authorities for seasonal vendors",
        "It describes an involuntary emergency evacuation procedure during severe weather"
      ],
      optionsEn: [
        "It denotes an ingenious, street-smart scheme to exploit loopholes and make money through cunning adaptability",
        "It refers to a rigorous physical exercise routine performed by rookie athletes at sunrise",
        "It signifies an official legal contract sanctioned by municipal authorities for seasonal vendors",
        "It describes an involuntary emergency evacuation procedure during severe weather"
      ],
      optionsVi: [
        "Nó biểu thị một mưu mẹo tinh ranh nơi đường phố nhằm tận dụng kẽ hở xã hội để kiếm tiền bằng sự thích nghi khôn khéo",
        "Nó chỉ một bài tập rèn luyện thể lực khắc nghiệt của các vận động viên tân binh vào lúc bình minh",
        "Nó đại diện cho một hợp đồng pháp lý chính thức được chính quyền phê duyệt cho người bán hàng rong",
        "Nó miêu tả một quy trình sơ tán khẩn cấp bắt buộc khi thời tiết chuyển biến xấu"
      ],
      correctAnswer: 0,
      explanation: "A 'hustle' in street vernacular is an enterprising con or side scheme where clever individuals exploit situations for profit without directly breaking laws.",
      explanationEn: "A 'hustle' in street vernacular is an enterprising con or side scheme where clever individuals exploit situations for profit without directly breaking laws.",
      explanationVi: "'Hustle' trong tiếng lóng đường phố là chiêu trò mánh lới tinh ranh nơi kẻ lão luyện trục lợi từ kẽ hở mà không vi phạm pháp luật một cách trực diện.",
      targetedConcept: "Colloquial Terminology: The Concept of 'A Hustle'",
      targetedConceptEn: "Colloquial Terminology: The Concept of 'A Hustle'",
      targetedConceptVi: "Thuật ngữ khẩu ngữ: Khái niệm mánh lới kiếm tiền 'A Hustle'",
      referenceSegmentIndex: 33
    },
    {
      id: "q_mov_ani_07_7",
      question: "What mathematical deduction does Judy use to calculate the total undeclared revenue in Nick's tax fraud?",
      questionEn: "What mathematical deduction does Judy use to calculate the total undeclared revenue in Nick's tax fraud?",
      questionVi: "Judy sử dụng phép suy luận toán học nào để tính toán tổng doanh thu không kê khai trong vụ trốn thuế của Nick?",
      options: [
        "Multiplying $200 per day by 365 days across 20 years since age twelve, totaling $1,460,000",
        "Multiplying 200 pawpsicles by $2 apiece over fifty days, totaling $20,000",
        "Adding ten years of compound interest onto an initial unpaid fine of $50,000",
        "Dividing his total lumber profits of $2,000,000 by his business partner Finnick's share"
      ],
      optionsEn: [
        "Multiplying $200 per day by 365 days across 20 years since age twelve, totaling $1,460,000",
        "Multiplying 200 pawpsicles by $2 apiece over fifty days, totaling $20,000",
        "Adding ten years of compound interest onto an initial unpaid fine of $50,000",
        "Dividing his total lumber profits of $2,000,000 by his business partner Finnick's share"
      ],
      optionsVi: [
        "Nhân 200 đô một ngày với 365 ngày qua 20 năm từ lúc mười hai tuổi, tổng cộng là 1.460.000 đô la",
        "Nhân 200 que kem chân với 2 đô mỗi que trong năm mươi ngày, tổng cộng là 20.000 đô la",
        "Cộng thêm mười năm lãi kép vào khoản tiền phạt chưa thanh toán ban đầu là 50.000 đô la",
        "Chia tổng lợi nhuận bán gỗ 2.000.000 đô la cho phần ăn chia của cộng sự Finnick"
      ],
      correctAnswer: 0,
      explanation: "Judy demonstrates mathematical wit: $200/day * 365 days * 20 years = $1,460,000 of undeclared income on federal forms reporting zero.",
      explanationEn: "Judy demonstrates mathematical wit: $200/day * 365 days * 20 years = $1,460,000 of undeclared income on federal forms reporting zero.",
      explanationVi: "Judy thể hiện sự nhạy bén toán học: 200 đô/ngày * 365 ngày * 20 năm = 1.460.000 đô la thu nhập trốn thuế trong khi biểu mẫu khai báo là số không.",
      targetedConcept: "Analytical Deduction & Compounding Math: Multiplying Daily Fraud",
      targetedConceptEn: "Analytical Deduction & Compounding Math: Multiplying Daily Fraud",
      targetedConceptVi: "Tư duy phân tích & Phép toán tích lũy: Nhân tổng doanh thu trốn thuế",
      referenceSegmentIndex: 41
    },
    {
      id: "q_mov_ani_07_8",
      question: "How does Judy Hopps completely reverse the power dynamic and outmaneuver Nick Wilde at the climax of their encounter?",
      questionEn: "How does Judy Hopps completely reverse the power dynamic and outmaneuver Nick Wilde at the climax of their encounter?",
      questionVi: "Judy Hopps đã hoàn toàn đảo ngược tương quan quyền lực và đánh bại Nick Wilde như thế nào ở cao trào cuộc chạm trán?",
      options: [
        "She secretly records his detailed confession of felony tax evasion on her carrot pen, forcing him to be her investigative partner under threat of federal prison",
        "She calls ten squad cars from the ZPD to surround him and confiscate his popsicle van",
        "She bribes his partner Finnick with a crate of Jumbo-pops in exchange for testifying against Nick",
        "She uses physical martial arts techniques learned at the police academy to handcuff him to a lamp post"
      ],
      optionsEn: [
        "She secretly records his detailed confession of felony tax evasion on her carrot pen, forcing him to be her investigative partner under threat of federal prison",
        "She calls ten squad cars from the ZPD to surround him and confiscate his popsicle van",
        "She bribes his partner Finnick with a crate of Jumbo-pops in exchange for testifying against Nick",
        "She uses physical martial arts techniques learned at the police academy to handcuff him to a lamp post"
      ],
      optionsVi: [
        "Cô bí mật ghi âm lời tự thú trọng tội trốn thuế của anh vào cây bút cà rốt, buộc anh phải làm cộng sự điều tra dưới nguy cơ lãnh án tù liên bang",
        "Cô gọi mười xe cảnh sát ZPD đến bao vây và tịch thu chiếc xe bán kem của anh",
        "Cô mua chuộc cộng sự Finnick bằng một thùng kem Jumbo-pop để đổi lấy lời khai chống lại Nick",
        "Cô dùng kỹ thuật võ thuật đã học ở học viện để còng tay anh vào cột đèn đường"
      ],
      correctAnswer: 0,
      explanation: "Judy catches Nick's self-incriminating confession on her carrot recorder pen, wielding five years in federal prison as leverage to recruit him for her investigation.",
      explanationEn: "Judy catches Nick's self-incriminating confession on her carrot recorder pen, wielding five years in federal prison as leverage to recruit him for her investigation.",
      explanationVi: "Judy bắt quả tang lời thú tội của Nick qua cây bút ghi âm cà rốt, dùng bản án 5 năm tù liên bang làm đòn bẩy buộc anh trở thành cộng sự phá án.",
      targetedConcept: "Dramatic Irony & Leverage: The Carrot Pen Confession",
      targetedConceptEn: "Dramatic Irony & Leverage: The Carrot Pen Confession",
      targetedConceptVi: "Thế cờ đảo ngược & Đòn bẩy pháp lý: Lời thú tội trong cây bút cà rốt",
      referenceSegmentIndex: 48
    }
  ]
};

const lessonContent = `import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: Zootopia: Judy Hopps & Nick Wilde Carrot Pen Investigation
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR B1 | American Accent
 * YouTube ID: FikAJxtVgOY (27:56 - 1676s)
 * Views: 5,918,376 | Likes: High Engagement | RealLife English & Disney
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (00:12 - 27:56)
 * TIÊU CHUẨN ZERO MERGED UTTERANCES - 50 MASTER SEGMENTS - 8 QUIZ CEFR B2
 * ============================================================================
 */

export const QUIZ_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION: VideoQuizData = ${JSON.stringify(quizData, null, 2)};

export const LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION: MockVideoLesson = {
  id: "mov_ani_07",
  slug: "zootopia-judy-nick-carrot-pen-confession",
  title: "Zootopia: Judy Hopps & Nick Wilde Carrot Pen Investigation",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "B1",
  durationFormatted: "27:56",
  durationSeconds: 1676,
  externalId: "FikAJxtVgOY",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/FikAJxtVgOY/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 138,
  viewCount: 5918376,
  studyCount: 6840,
  description:
    "Màn đấu trí và hợp tác phá án dí dỏm giữa cô thỏ cảnh sát quả cảm Judy Hopps và chú cáo lém lỉnh Nick Wilde cùng cây bút ghi âm hình củ cà rốt trứ danh tại thành phố Zootopia.",
  segments: ${JSON.stringify(segments, null, 4)},
  quiz: QUIZ_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION,
};

export default LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION;
`;

fs.writeFileSync('features/listening/data/lessons/movies/animation/lesson_zootopia.ts', lessonContent, 'utf-8');
console.log('Successfully wrote features/listening/data/lessons/movies/animation/lesson_zootopia.ts!');
