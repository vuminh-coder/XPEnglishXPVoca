import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for BBC Learning English: What Makes Us Laugh? (Is Laughter the Best Medicine?)
 * Category: cat_bbc_6min (BBC 6 Minute English)
 * 8 CEFR-aligned contextual questions covering comedy psychology, social bonding, gelotology, and perseverance
 */
export const QUIZ_BBC_LAUGHTER_MEDICINE: VideoQuizData = {
  lessonId: "vid_bbc_laughter_medicine",
  lessonTitle: "BBC Learning English: What Makes Us Laugh? - 6 Minute English",
  totalQuestions: 8,
  xpReward: 40,
  questions: [
    {
        "id": "q_bbc_laughter_med_1",
        "question": "What punny joke does Neil tell Alice to open the programme?",
        "questionEn": "What punny joke does Neil tell Alice to open the programme?",
        "questionVi": "Neil đã kể câu chuyện đùa chơi chữ nào với Alice để mở đầu chương trình?",
        "options": [
            "What is the Mexican version of One Direction? Juan Direction!",
            "Why did the tomato blush? Because it saw the salad dressing!",
            "What's a rat's favourite game? Hide and squeak!",
            "Why do we never tell secrets on a farm? Because the potatoes have eyes!"
        ],
        "optionsEn": [
            "What is the Mexican version of One Direction? Juan Direction!",
            "Why did the tomato blush? Because it saw the salad dressing!",
            "What's a rat's favourite game? Hide and squeak!",
            "Why do we never tell secrets on a farm? Because the potatoes have eyes!"
        ],
        "optionsVi": [
            "Phiên bản Mexico của ban nhạc One Direction là gì? Juan Direction!",
            "Tại sao quả cà chua lại đỏ mặt? Vì nó thấy nước sốt xà lách!",
            "Trò chơi yêu thích của chuột là gì? Trốn và kêu chít chít!",
            "Tại sao đừng bao giờ nói bí mật ở nông trại? Vì củ khoai tây có mắt!"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 6 and 8, Neil asks: 'What is the Mexican version of One Direction? Juan Direction! Get it?' — playing on the Spanish name 'Juan' sounding like the English word 'One'.",
        "explanationEn": "In Segments 6 and 8, Neil asks: 'What is the Mexican version of One Direction? Juan Direction! Get it?' — playing on the Spanish name 'Juan' sounding like the English word 'One'.",
        "explanationVi": "Trong câu 6 và 8, Neil đố: 'Phiên bản Mexico của ban nhạc One Direction là gì? Juan Direction! Hiểu chưa hả?' — chơi chữ dựa trên tên riêng tiếng Tây Ban Nha 'Juan' phát âm gần giống từ 'One'.",
        "referenceSegmentIndex": 8,
        "targetedConcept": "Chơi chữ mở đầu (Pun: Juan Direction Joke)",
        "targetedConceptEn": "Pun: Juan Direction Joke",
        "targetedConceptVi": "Chơi chữ mở đầu"
    },
    {
        "id": "q_bbc_laughter_med_2",
        "question": "According to Neil, what physical and mental health benefits does laughter provide to our bodies?",
        "questionEn": "According to Neil, what physical and mental health benefits does laughter provide to our bodies?",
        "questionVi": "Theo lời Neil, tiếng cười mang lại những lợi ích thể chất và tinh thần nào cho cơ thể chúng ta?",
        "options": [
            "It is good for health, reduces stress, and releases feel-good hormones in the body",
            "It permanently cures chronic clinical insomnia without any medical therapy",
            "It doubles human lung capacity and triples metabolic speed instantly",
            "It completely replaces the biological necessity for daily physical exercise"
        ],
        "optionsEn": [
            "It is good for health, reduces stress, and releases feel-good hormones in the body",
            "It permanently cures chronic clinical insomnia without any medical therapy",
            "It doubles human lung capacity and triples metabolic speed instantly",
            "It completely replaces the biological necessity for daily physical exercise"
        ],
        "optionsVi": [
            "Nụ cười tốt cho sức khỏe, làm giảm căng thẳng và giải phóng các hormone tạo cảm giác hưng phấn trong cơ thể",
            "Nó chữa khỏi hoàn toàn chứng mất ngủ kinh niên mà không cần bất kỳ liệu pháp y tế nào",
            "Nó làm tăng gấp đôi dung tích phổi và tăng gấp ba tốc độ trao đổi chất ngay lập tức",
            "Nó thay thế hoàn toàn sự cần thiết sinh học của việc tập thể dục hàng ngày"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 18, Neil explains: 'It's good for our health, it reduces stress and releases feel-good hormones in the body.'",
        "explanationEn": "In Segment 18, Neil explains: 'It's good for our health, it reduces stress and releases feel-good hormones in the body.'",
        "explanationVi": "Trong câu 18, Neil giải thích: 'Nụ cười rất tốt cho sức khỏe, nó làm giảm căng thẳng và giải phóng các hormone tạo cảm giác hưng phấn trong cơ thể.'",
        "referenceSegmentIndex": 18,
        "targetedConcept": "Lợi ích sinh lý học của nụ cười (Physiological Benefits of Laughter)",
        "targetedConceptEn": "Physiological Benefits of Laughter",
        "targetedConceptVi": "Lợi ích sinh lý học của nụ cười"
    },
    {
        "id": "q_bbc_laughter_med_3",
        "question": "Which Greek-derived word specifically denotes the scientific study of laughter and its effects on the body?",
        "questionEn": "Which Greek-derived word specifically denotes the scientific study of laughter and its effects on the body?",
        "questionVi": "Từ gốc Hy Lạp nào biểu thị cụ thể ngành nghiên cứu khoa học về tiếng cười và các tác động của nó lên cơ thể?",
        "options": [
            "Gelotology (derived from the Greek word 'gelos' meaning laughter)",
            "Risology (from the Latin root risor)",
            "Comology (derived from the modern theatrical concept of comedy)",
            "Giggleology (informal colloquial slang)"
        ],
        "optionsEn": [
            "Gelotology (derived from the Greek word 'gelos' meaning laughter)",
            "Risology (from the Latin root risor)",
            "Comology (derived from the modern theatrical concept of comedy)",
            "Giggleology (informal colloquial slang)"
        ],
        "optionsVi": [
            "Gelotology (bắt nguồn từ từ tiếng Hy Lạp 'gelos' có nghĩa là tiếng cười)",
            "Risology (từ gốc Latin risor)",
            "Comology (bắt nguồn từ khái niệm sân khấu kịch nghệ hiện đại comedy)",
            "Giggleology (từ lóng thân mật không chính thức)"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 68, Alice reveals: 'It's actually b) gelotology – which comes from the Greek word, gelos, meaning laughter.'",
        "explanationEn": "In Segment 68, Alice reveals: 'It's actually b) gelotology – which comes from the Greek word, gelos, meaning laughter.'",
        "explanationVi": "Trong câu 68, Alice tiết lộ: 'Đáp án đúng thực ra là b) gelotology – bắt nguồn từ từ Hy Lạp gelos, có nghĩa là tiếng cười.'",
        "referenceSegmentIndex": 68,
        "targetedConcept": "Thuật ngữ khoa học Gelotology (Scientific Study of Laughter)",
        "targetedConceptEn": "Scientific Study of Laughter",
        "targetedConceptVi": "Thuật ngữ khoa học Gelotology"
    },
    {
        "id": "q_bbc_laughter_med_4",
        "question": "What have researchers discovered about the social nature and primary evolutionary purpose of laughter?",
        "questionEn": "What have researchers discovered about the social nature and primary evolutionary purpose of laughter?",
        "questionVi": "Các nhà nghiên cứu đã phát hiện ra điều gì về bản chất xã hội và mục đích tiến hóa chính của nụ cười?",
        "options": [
            "We rarely laugh alone because laughter helps humans bond with each other as a cohesive group",
            "Humans laugh primarily to intimidate predators and defend their physical territory",
            "Laughter is entirely an individual autonomic reflex with zero social implications",
            "People laugh more frequently in solitary isolation than in social gatherings"
        ],
        "optionsEn": [
            "We rarely laugh alone because laughter helps humans bond with each other as a cohesive group",
            "Humans laugh primarily to intimidate predators and defend their physical territory",
            "Laughter is entirely an individual autonomic reflex with zero social implications",
            "People laugh more frequently in solitary isolation than in social gatherings"
        ],
        "optionsVi": [
            "Chúng ta rất hiếm khi cười một mình bởi vì tiếng cười giúp con người gắn kết với nhau như một tập thể bền chặt",
            "Con người cười chủ yếu để đe dọa thú săn mồi và bảo vệ lãnh thổ vật lý của họ",
            "Tiếng cười hoàn toàn là một phản xạ tự động của cá nhân mà không mang ý nghĩa xã hội nào",
            "Con người cười thường xuyên hơn khi ở một mình cô độc so với khi tụ họp xã hội"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 28-29, Alice explains: '...the purpose of laughter is related to the way we bond with each other. And the more we laugh, the more we bond as a group.'",
        "explanationEn": "In Segments 28-29, Alice explains: '...the purpose of laughter is related to the way we bond with each other. And the more we laugh, the more we bond as a group.'",
        "explanationVi": "Trong câu 28-29, Alice giải thích: '...mục đích của tiếng cười có liên quan đến cách chúng ta gắn kết với nhau. Và chúng ta càng cười nhiều, chúng ta càng gắn bó khăng khít hơn như một tập thể.'",
        "referenceSegmentIndex": 28,
        "targetedConcept": "Chức năng gắn kết xã hội (Social Bonding Function of Laughter)",
        "targetedConceptEn": "Social Bonding Function of Laughter",
        "targetedConceptVi": "Chức năng gắn kết xã hội"
    },
    {
        "id": "q_bbc_laughter_med_5",
        "question": "According to comedian Steve Byrne, what essential advice should an aspiring comedian follow?",
        "questionEn": "According to comedian Steve Byrne, what essential advice should an aspiring comedian follow?",
        "questionVi": "Theo danh hài Steve Byrne, một diễn viên hài đầy hoài bão cần tuân theo lời khuyên thiết yếu nào?",
        "options": [
            "Write relentlessly and selfishly focus on what makes themselves laugh to find their unique voice",
            "Imitate famous senior comedians word-for-word until gaining audience popularity",
            "Rely exclusively on spontaneous stage improvisation without writing any scripts beforehand",
            "Hire ghostwriters to craft punchlines tailored strictly to commercial market trends"
        ],
        "optionsEn": [
            "Write relentlessly and selfishly focus on what makes themselves laugh to find their unique voice",
            "Imitate famous senior comedians word-for-word until gaining audience popularity",
            "Rely exclusively on spontaneous stage improvisation without writing any scripts beforehand",
            "Hire ghostwriters to craft punchlines tailored strictly to commercial market trends"
        ],
        "optionsVi": [
            "Viết kịch bản miệt mài và vị kỷ tập trung vào những điều khiến chính bản thân bật cười để tìm ra tiếng nói độc bản",
            "Bắt chước từng câu từng chữ các danh hài tiền bối nổi tiếng cho đến khi được khán giả yêu mến",
            "Chỉ dựa hoàn toàn vào sự ngẫu hứng tức thì trên sân khấu mà không cần viết kịch bản trước",
            "Thuê người viết thuê để sáng tác các câu chốt hài hước theo sát xu hướng thương mại"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 34-36, Steve Byrne advises: 'The one single thing an aspiring comedian should do is to write, write, write and talk about the things that make them laugh... Because that will get you closer to finding your voice.'",
        "explanationEn": "In Segments 34-36, Steve Byrne advises: 'The one single thing an aspiring comedian should do is to write, write, write and talk about the things that make them laugh... Because that will get you closer to finding your voice.'",
        "explanationVi": "Trong câu 34-36, Steve Byrne khuyên: 'Điều duy nhất mà một diễn viên hài đầy hoài bão nên làm là viết, viết, viết không ngừng và nói về những điều khiến chính bản thân họ bật cười... Bởi vì điều đó sẽ đưa bạn đến gần hơn với việc tìm ra tiếng nói riêng của mình.'",
        "referenceSegmentIndex": 34,
        "targetedConcept": "Lời khuyên sáng tác của Steve Byrne (Comedic Voice & Writing Practice)",
        "targetedConceptEn": "Comedic Voice & Writing Practice",
        "targetedConceptVi": "Lời khuyên sáng tác của Steve Byrne"
    },
    {
        "id": "q_bbc_laughter_med_6",
        "question": "What observational comedy joke does Steve Byrne tell regarding turning 40 years old?",
        "questionEn": "What observational comedy joke does Steve Byrne tell regarding turning 40 years old?",
        "questionVi": "Steve Byrne đã kể câu chuyện hài quan sát nào liên quan đến cột mốc bước sang tuổi 40?",
        "options": [
            "People start praising you with 'You look good for 40', which you never hear at young ages like 19",
            "Doctors prescribe magical youth potions the moment a person reaches 40 years of age",
            "Stand-up comedians are automatically forced into permanent retirement at age 40",
            "People at 40 universally lose the neurological capacity to experience genuine amusement"
        ],
        "optionsEn": [
            "People start praising you with 'You look good for 40', which you never hear at young ages like 19",
            "Doctors prescribe magical youth potions the moment a person reaches 40 years of age",
            "Stand-up comedians are automatically forced into permanent retirement at age 40",
            "People at 40 universally lose the neurological capacity to experience genuine amusement"
        ],
        "optionsVi": [
            "Mọi người bắt đầu khen 'Trông anh được đấy so với tuổi 40', điều bạn chẳng bao giờ nghe ở tuổi trẻ như 19",
            "Bác sĩ kê đơn thuốc tiên trẻ mãi không già ngay khoảnh khắc một người chạm mốc 40 tuổi",
            "Các nghệ sĩ hài độc thoại tự động bị buộc phải giải nghệ vĩnh viễn ở tuổi 40",
            "Mọi người ở tuổi 40 đều mất đi khả năng thần kinh để cảm nhận sự hài hước chân thực"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 46-47, Steve observes: ''You look good for 40. You look good for 52...' You never hear that when you're young. You never hear: 'You look good for 19.''",
        "explanationEn": "In Segments 46-47, Steve observes: ''You look good for 40. You look good for 52...' You never hear that when you're young. You never hear: 'You look good for 19.''",
        "explanationVi": "Trong câu 46-47, Steve quan sát: ''Trông anh phong độ so với tuổi 40 đấy...'. Bạn không bao giờ nghe thấy điều đó khi còn trẻ. Bạn chẳng bao giờ nghe ai bảo: 'Trông cậu được đấy so với tuổi 19''.",
        "referenceSegmentIndex": 46,
        "targetedConcept": "Quan sát hài hước về tuổi 40 (Turning 40 Observational Comedy)",
        "targetedConceptEn": "Turning 40 Observational Comedy",
        "targetedConceptVi": "Quan sát hài hước về tuổi 40"
    },
    {
        "id": "q_bbc_laughter_med_7",
        "question": "What psychological paradox do Alice and Neil discuss regarding comedians' personalities?",
        "questionEn": "What psychological paradox do Alice and Neil discuss regarding comedians' personalities?",
        "questionVi": "Nghịch lý tâm lý học nào được Alice và Neil thảo luận liên quan đến tính cách của các nghệ sĩ hài?",
        "options": [
            "While expected to be extroverts, many comedians are actually quiet introverts who struggle with depression",
            "All comedians have identical cheerful temperaments on and off stage without exception",
            "Comedians never experience any negative emotions because laughter permanently immunizes them",
            "Introverted people are completely incapable of performing stand-up comedy professionally"
        ],
        "optionsEn": [
            "While expected to be extroverts, many comedians are actually quiet introverts who struggle with depression",
            "All comedians have identical cheerful temperaments on and off stage without exception",
            "Comedians never experience any negative emotions because laughter permanently immunizes them",
            "Introverted people are completely incapable of performing stand-up comedy professionally"
        ],
        "optionsVi": [
            "Dù được kỳ vọng là người hướng ngoại, nhiều nghệ sĩ hài thực ra lại là người hướng nội trầm lặng và phải vật lộn với trầm cảm",
            "Mọi nghệ sĩ hài đều có tính khí vui vẻ giống hệt nhau cả trên sân khấu lẫn ngoài đời mà không có ngoại lệ",
            "Các nghệ sĩ hài không bao giờ trải qua cảm xúc tiêu cực vì tiếng cười mang lại miễn dịch vĩnh viễn cho họ",
            "Những người hướng nội hoàn toàn không có khả năng biểu diễn hài độc thoại chuyên nghiệp"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 60-63, Alice and Neil discuss how some people connect comedy with depression, noting that while people expect comedians to be extroverts, many are introverted.",
        "explanationEn": "In Segments 60-63, Alice and Neil discuss how some people connect comedy with depression, noting that while people expect comedians to be extroverts, many are introverted.",
        "explanationVi": "Trong câu 60-63, Alice và Neil thảo luận về mối liên hệ giữa hài kịch và trầm cảm, chỉ ra rằng dù công chúng nghĩ nghệ sĩ hài hướng ngoại, nhiều người thực chất lại hướng nội và trầm uất.",
        "referenceSegmentIndex": 60,
        "targetedConcept": "Nghịch lý hài kịch và trầm cảm (Comedy and Depression Paradox)",
        "targetedConceptEn": "Comedy and Depression Paradox",
        "targetedConceptVi": "Nghịch lý hài kịch và trầm cảm"
    },
    {
        "id": "q_bbc_laughter_med_8",
        "question": "What does the targeted vocabulary word 'outwork' mean according to Steve Byrne and Neil?",
        "questionEn": "What does the targeted vocabulary word 'outwork' mean according to Steve Byrne and Neil?",
        "questionVi": "Từ vựng trọng tâm 'outwork' có nghĩa là gì theo lời Steve Byrne và Neil?",
        "options": [
            "To work harder and put in more effort than everybody else in a competitive occupation",
            "To delegate all your tedious tasks to other workers in an office environment",
            "To retire early after achieving a single viral comedic success on television",
            "To refuse to collaborate with colleagues on any creative project whatsoever"
        ],
        "optionsEn": [
            "To work harder and put in more effort than everybody else in a competitive occupation",
            "To delegate all your tedious tasks to other workers in an office environment",
            "To retire early after achieving a single viral comedic success on television",
            "To refuse to collaborate with colleagues on any creative project whatsoever"
        ],
        "optionsVi": [
            "Làm việc chăm chỉ, nỗ lực và cống hiến nhiều hơn bất kỳ ai khác trong một nghề nghiệp đầy tính cạnh tranh",
            "Ủy thác toàn bộ công việc tẻ nhạt của bạn cho những nhân viên khác trong văn phòng",
            "Nghỉ hưu sớm sau khi đạt được một thành công hài kịch lan truyền duy nhất trên truyền hình",
            "Từ chối hợp tác với đồng nghiệp trong bất kỳ dự án sáng tạo nào"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 58, Neil defines the phrase: 'He says you have to outwork everybody – which means to work harder than everybody else.'",
        "explanationEn": "In Segment 58, Neil defines the phrase: 'He says you have to outwork everybody – which means to work harder than everybody else.'",
        "explanationVi": "Trong câu 58, Neil định nghĩa cụm từ: 'Ông ấy nói bạn phải outwork everybody – có nghĩa là làm việc nỗ lực và chăm chỉ hơn bất kỳ ai khác.'",
        "referenceSegmentIndex": 58,
        "targetedConcept": "Từ vựng trọng tâm Outwork (Target Vocabulary: Outwork)",
        "targetedConceptEn": "Target Vocabulary: Outwork",
        "targetedConceptVi": "Từ vựng trọng tâm Outwork"
    }
],
  generatedBy: "CONTEXTUAL_FALLBACK",
};

/**
 * Master Video Lesson: BBC Learning English - What Makes Us Laugh?
 * Slug: bbc-learning-english-is-laughter-the-best-medicine
 * YouTube ID: jIt35Ey2GN4
 * Duration: 376s (06:16)
 * Zero Merged Utterances Standard: 84 Pure Master Segments
 * Accent: British English (en-GB)
 */
export const LESSON_BBC_LAUGHTER_MEDICINE: MockVideoLesson = {
  id: "vid_bbc_laughter_medicine",
  slug: "bbc-learning-english-is-laughter-the-best-medicine",
  title: "BBC Learning English: What Makes Us Laugh?",
  description:
    "Chương trình 6 Minute English từ đài BBC với hai người dẫn Alice và Neil cùng diễn viên hài người Mỹ Steve Byrne khám phá khoa học về tiếng cười, hài độc thoại (stand-up comedy), sự bền chí (perseverance), nỗ lực vượt bậc (outwork) và nghịch lý tính cách của người làm hài kịch.",
  sourceType: "YOUTUBE",
  externalId: "jIt35Ey2GN4",
  thumbnailUrl: "https://img.youtube.com/vi/jIt35Ey2GN4/hqdefault.jpg",
  durationSeconds: 376,
  durationFormatted: "06:16",
  cefrLevel: "B1",
  supportedTypes: "BOTH",
  categoryId: "cat_bbc_6min",
  categorySlug: "bbc-6-minute",
  categoryName: "BBC 6 Minute English",
  accent: "en-GB",
  wpmSpeed: 145,
  viewCount: 465000,
  studyCount: 42100,
  quiz: QUIZ_BBC_LAUGHTER_MEDICINE,
  segments: [
    {
        "orderIndex": 1,
        "startTime": 0.16,
        "endTime": 6.71,
        "text": "This is a download from BBC Learning English. To find out more, visit our website.",
        "translationVi": "Đây là bản tải xuống từ BBC Learning English. Để tìm hiểu thêm, hãy truy cập trang web của chúng tôi.",
        "ipaUs": "/ˈðɪs ˈɪz ə ˈdaʊnloʊd ˈfrʌm ˌbiː biː ˈsiː ˈlɜːrnɪŋ ˈɪŋɡlɪʃ ˈtuː ˈfaɪnd ˈaʊt ˈmɔːr ˈvɪzɪt ˈaʊər ˈwebsaɪt/",
        "keywords": [
            "download",
            "learning",
            "visit",
            "website"
        ],
        "explanationAi": "Cụm danh từ 'a download from' chỉ bản tin hoặc tệp ghi âm được tải về từ đài truyền thông. 'To find out more' là mệnh đề chỉ mục đích (để tìm hiểu thêm thông tin).",
        "properNouns": [
            "BBC",
            "Learning English"
        ],
        "tokenCount": 15
    },
    {
        "orderIndex": 2,
        "startTime": 6.72,
        "endTime": 12.07,
        "text": "6 Minute English from bbclearningenglish.com.",
        "translationVi": "Chương trình 6 Minute English từ bbclearningenglish.com.",
        "ipaUs": "/6 ˈmɪnət ˈɪŋɡlɪʃ ˈfrʌm ˌbiː biː ˈsiː ˈlɜːrnɪŋ ˈɪŋɡlɪʃ kɑːm/",
        "keywords": [
            "minute",
            "english"
        ],
        "explanationAi": "Đoạn nhạc hiệu nhận diện chương trình luyện nghe podcast định dạng 6 phút trứ danh của đài BBC London.",
        "properNouns": [
            "6 Minute English",
            "BBC"
        ],
        "tokenCount": 6
    },
    {
        "orderIndex": 3,
        "startTime": 12.08,
        "endTime": 15.52,
        "text": "Hello and welcome to 6 Minute English. I'm Alice...",
        "translationVi": "Xin chào và chào mừng các bạn đến với 6 Minute English. Tôi là Alice...",
        "ipaUs": "/ˈhəloʊ ənd ˈwelkəm ˈtuː 6 ˈmɪnət ˈɪŋɡlɪʃ ˈaɪm ˈæləs/",
        "keywords": [
            "welcome",
            "minute",
            "english"
        ],
        "explanationAi": "Cấu trúc chào mừng người nghe quen thuộc của host: 'welcome to' đi cùng danh từ tên chương trình.",
        "properNouns": [
            "6 Minute English",
            "Alice"
        ],
        "tokenCount": 10
    },
    {
        "orderIndex": 4,
        "startTime": 15.52,
        "endTime": 20.48,
        "text": "...and I'm Neil. OK Alice, I've got something for you here... a question...",
        "translationVi": "...và tôi là Neil. Được rồi Alice, tôi có một điều này dành cho bạn ở đây... một câu hỏi...",
        "ipaUs": "/ənd ˈaɪm ˈniːl ˈoʊkeɪ ˈæləs ˈaɪv ˈɡɑːt ˈsʌmθɪŋ ˈfɔːr ˈjuː ˈhiːr ə ˈkwestʃən/",
        "keywords": [
            "question",
            "something"
        ],
        "explanationAi": "Thành ngữ 'have got something for you' dùng để thu hút sự chú ý trước khi đưa ra câu đố bất ngờ.",
        "properNouns": [
            "Neil",
            "Alice"
        ],
        "tokenCount": 15
    },
    {
        "orderIndex": 5,
        "startTime": 20.48,
        "endTime": 22.15,
        "text": "Yeah?",
        "translationVi": "Vâng, sao thế?",
        "ipaUs": "/ˈjæ/",
        "keywords": [
            "yeah"
        ],
        "explanationAi": "Thán từ xác nhận trong giao tiếp thân mật, thể hiện sự chú ý và sẵn sàng lắng nghe.",
        "properNouns": [],
        "tokenCount": 1
    },
    {
        "orderIndex": 6,
        "startTime": 22.16,
        "endTime": 28.0,
        "text": "Ready? What is the Mexican version of One Direction?",
        "translationVi": "Sẵn sàng chưa? Phiên bản Mexico của ban nhạc One Direction là gì?",
        "ipaUs": "/ˈredi ˈwʌt ˈɪz ðə ˈmeksəkən ˈvɜːrʒən ˈʌv ˈwʌn ˈdərekʃən/",
        "keywords": [
            "ready",
            "mexican",
            "version",
            "direction"
        ],
        "explanationAi": "Câu đố chữ (pun). 'Mexican version' chỉ phiên bản mang phong cách Mexico. 'One Direction' là nhóm nhạc pop nổi tiếng.",
        "properNouns": [
            "Mexican",
            "One Direction"
        ],
        "tokenCount": 9
    },
    {
        "orderIndex": 7,
        "startTime": 28.0,
        "endTime": 30.63,
        "text": "Um... No idea.",
        "translationVi": "Ừm... Tôi chịu, không biết đâu.",
        "ipaUs": "/ˈʌm ˈnoʊ ˈaɪdiːə/",
        "keywords": [
            "idea"
        ],
        "explanationAi": "Cụm 'no idea' là cách diễn đạt ngắn gọn thông dụng của 'I have no idea' (Tôi hoàn toàn không biết).",
        "properNouns": [],
        "tokenCount": 3
    },
    {
        "orderIndex": 8,
        "startTime": 30.64,
        "endTime": 34.79,
        "text": "Juan Direction! Get it?",
        "translationVi": "Juan Direction! Hiểu chưa hả?",
        "ipaUs": "/hwɑːn ˈdərekʃən ˈɡet ˈɪt/",
        "keywords": [
            "direction"
        ],
        "explanationAi": "Lối chơi chữ hài hước dựa trên tên tiếng Tây Ban Nha 'Juan' phát âm gần giống với từ 'One' trong tiếng Anh. 'Get it?' nghĩa là bạn có hiểu ý đùa không.",
        "properNouns": [
            "Juan Direction"
        ],
        "tokenCount": 4
    },
    {
        "orderIndex": 9,
        "startTime": 34.8,
        "endTime": 35.83,
        "text": "Very good...",
        "translationVi": "Rất hay đấy...",
        "ipaUs": "/ˈveri ˈɡʊd/",
        "keywords": [
            "good"
        ],
        "explanationAi": "Câu phản hồi mỉa mai nhẹ nhàng (dry sarcasm) của Alice trước câu chuyện đùa ngô nghê của Neil.",
        "properNouns": [],
        "tokenCount": 2
    },
    {
        "orderIndex": 10,
        "startTime": 35.84,
        "endTime": 38.23,
        "text": "Juan Direction... You know?",
        "translationVi": "Juan Direction ấy... Bạn biết mà đúng không?",
        "ipaUs": "/hwɑːn ˈdərekʃən ˈjuː ˈnoʊ/",
        "keywords": [
            "direction",
            "know"
        ],
        "explanationAi": "Neil nhắc lại tên gọi để đảm bảo Alice không bỏ sót sự tương đồng ngữ âm dí dỏm.",
        "properNouns": [
            "Juan Direction"
        ],
        "tokenCount": 4
    },
    {
        "orderIndex": 11,
        "startTime": 38.24,
        "endTime": 39.99,
        "text": "Yes, yes, I get it.",
        "translationVi": "Vâng, vâng, tôi hiểu rồi mà.",
        "ipaUs": "/ˈjes ˈjes ˈaɪ ˈɡet ˈɪt/",
        "keywords": [
            "get"
        ],
        "explanationAi": "'I get it' đồng nghĩa với 'I understand the joke' (Tôi bắt kịp điểm gây cười rồi).",
        "properNouns": [],
        "tokenCount": 5
    },
    {
        "orderIndex": 12,
        "startTime": 40.0,
        "endTime": 44.71,
        "text": "Never mind. Can you guess what the subject of today's show is instead?",
        "translationVi": "Thôi bỏ qua đi. Thay vào đó, bạn có đoán được chủ đề của buổi phát sóng hôm nay là gì không?",
        "ipaUs": "/ˈnevər ˈmaɪnd ˈkæn ˈjuː ˈɡes ˈwʌt ðə ˈsəbdʒekt ˈʌv ˈtədeɪz ˈʃoʊ ˈɪz ˈɪnsted/",
        "keywords": [
            "mind",
            "guess",
            "subject",
            "show",
            "instead"
        ],
        "explanationAi": "'Never mind' dùng khi muốn chuyển đề tài. Cụm 'subject of today's show' chỉ chủ đề trọng tâm của bài học.",
        "properNouns": [],
        "tokenCount": 14
    },
    {
        "orderIndex": 13,
        "startTime": 44.72,
        "endTime": 46.5,
        "text": "Is it bad jokes?",
        "translationVi": "Có phải là về những trò đùa dở tệ không?",
        "ipaUs": "/ˈɪz ˈɪt ˈbæd ˈdʒoʊks/",
        "keywords": [
            "bad",
            "jokes"
        ],
        "explanationAi": "Alice trêu Neil bằng cách gọi câu đùa của anh là 'bad jokes' (chuyện đùa nhạt nhẽo).",
        "properNouns": [],
        "tokenCount": 4
    },
    {
        "orderIndex": 14,
        "startTime": 46.5,
        "endTime": 48.87,
        "text": "Come on! That was a good little gag!",
        "translationVi": "Thôi nào! Đó là một mẩu chuyện đùa dí dỏm hay đấy chứ!",
        "ipaUs": "/ˈkʌm ˈɑːn ˈðæt ˈwɑːz ə ˈɡʊd ˈlɪtəl ˈɡæɡ/",
        "keywords": [
            "gag",
            "good",
            "little"
        ],
        "explanationAi": "'Gag' là danh từ chỉ mẩu chuyện cười, trò hề ngắn. 'Come on!' thể hiện sự phân trần hóm hỉnh.",
        "properNouns": [],
        "tokenCount": 8
    },
    {
        "orderIndex": 15,
        "startTime": 48.88,
        "endTime": 54.0,
        "text": "Yes. The subject of today's show is... what makes us laugh.",
        "translationVi": "Đúng vậy. Chủ đề của chương trình hôm nay là... điều gì khiến chúng ta cười.",
        "ipaUs": "/ˈjes ðə ˈsəbdʒekt ˈʌv ˈtədeɪz ˈʃoʊ ˈɪz ˈwʌt ˈmeɪks ˈʌs ˈlæf/",
        "keywords": [
            "subject",
            "laugh"
        ],
        "explanationAi": "Mệnh đề danh ngữ 'what makes us laugh' làm bổ ngữ giải thích rõ ràng đề tài nghiên cứu tâm lý nụ cười.",
        "properNouns": [],
        "tokenCount": 12
    },
    {
        "orderIndex": 16,
        "startTime": 54.0,
        "endTime": 59.67,
        "text": "And in this context, to get something, for example a gag – or joke, means to understand it.",
        "translationVi": "Và trong ngữ cảnh này, 'to get something', ví dụ như một mẩu chuyện đùa – hay trò cười, có nghĩa là thấu hiểu nó.",
        "ipaUs": "/ənd ɪn ˈðɪs ˈkɑːntekst ˈtuː ˈɡet ˈsʌmθɪŋ ˈfɔːr ˈɪɡzæmpəl ə ˈɡæɡ ˈɔːr ˈdʒoʊk ˈmiːnz ˈtuː ˈʌndərstænd ˈɪt/",
        "keywords": [
            "context",
            "gag",
            "joke",
            "means",
            "understand"
        ],
        "explanationAi": "Neil định nghĩa từ vựng: cụm 'to get something' đối với chuyện hài có nghĩa là hiểu được ý tứ gây cười.",
        "properNouns": [],
        "tokenCount": 17
    },
    {
        "orderIndex": 17,
        "startTime": 59.68,
        "endTime": 64.0,
        "text": "We all like to laugh – well not you Alice apparently – but most of us do!",
        "translationVi": "Tất cả chúng ta đều thích cười – à trừ bạn ra Alice rõ ràng là thế – nhưng hầu hết chúng ta đều thích!",
        "ipaUs": "/ˈwiː ˈɔːl ˈlaɪk ˈtuː ˈlæf ˈwel ˈnɑːt ˈjuː ˈæləs ˈəperəntli ˈbʌt ˈmoʊst ˈʌv ˈʌs ˈduː/",
        "keywords": [
            "laugh",
            "apparently"
        ],
        "explanationAi": "Trạng từ 'apparently' (rõ ràng là, dường như là) được dùng để đùa vui về tính cách nghiêm túc của Alice.",
        "properNouns": [
            "Alice"
        ],
        "tokenCount": 15
    },
    {
        "orderIndex": 18,
        "startTime": 64.0,
        "endTime": 71.03,
        "text": "It's good for our health, it reduces stress and releases feel-good hormones in the body.",
        "translationVi": "Nụ cười rất tốt cho sức khỏe, nó làm giảm căng thẳng và giải phóng các hormone tạo cảm giác hưng phấn trong cơ thể.",
        "ipaUs": "/ˈɪts ˈɡʊd ˈfɔːr ˈaʊər ˈhelθ ˈɪt ˈrəduːsəz ˈstres ənd ˈrɪliːsɪz ˈfiːl ɡʊd ˈhɔːrmoʊnz ɪn ðə ˈbɑːdi/",
        "keywords": [
            "health",
            "reduces",
            "stress",
            "releases",
            "hormones"
        ],
        "explanationAi": "Tính từ ghép 'feel-good' bổ nghĩa cho 'hormones' (như endorphin) giúp cải thiện tâm trạng và giảm bớt âu lo.",
        "properNouns": [],
        "tokenCount": 17
    },
    {
        "orderIndex": 19,
        "startTime": 71.04,
        "endTime": 76.79,
        "text": "OK, thank you, Neil. But how about answering today's quiz question?",
        "translationVi": "Được rồi, cảm ơn Neil. Nhưng bạn thấy sao về việc trả lời câu hỏi đố hôm nay?",
        "ipaUs": "/ˈoʊkeɪ ˈθæŋk ˈjuː ˈniːl ˈbʌt ˈhaʊ ˈəbaʊt ˈænsərɪŋ ˈtədeɪz ˈkwɪz ˈkwestʃən/",
        "keywords": [
            "answering",
            "quiz",
            "question"
        ],
        "explanationAi": "Cấu trúc 'how about + V-ing' được Alice dùng để mở màn câu hỏi trắc nghiệm của tuần.",
        "properNouns": [
            "Neil"
        ],
        "tokenCount": 12
    },
    {
        "orderIndex": 20,
        "startTime": 76.8,
        "endTime": 82.5,
        "text": "Which Greek word means the study of laughter and its effects on the body?",
        "translationVi": "Từ gốc Hy Lạp nào có nghĩa là ngành nghiên cứu về tiếng cười và những tác động của nó đối với cơ thể?",
        "ipaUs": "/ˈwɪtʃ ˈɡriːk ˈwɜːrd ˈmiːnz ðə ˈstʌdi ˈʌv ˈlæftər ənd ˈɪts ˈɪfekts ˈɑːn ðə ˈbɑːdi/",
        "keywords": [
            "greek",
            "study",
            "laughter",
            "effects",
            "body"
        ],
        "explanationAi": "'The study of laughter' chỉ ngành khoa học nghiên cứu nụ cười. 'Effects on the body' nghĩa là tác động sinh học lên cơ thể.",
        "properNouns": [
            "Greek"
        ],
        "tokenCount": 14
    },
    {
        "orderIndex": 21,
        "startTime": 82.5,
        "endTime": 91.03,
        "text": "Is it a) risology, b) gelotology? or c) comology?",
        "translationVi": "Đó là a) risology, b) gelotology, hay c) comology?",
        "ipaUs": "/ˈɪz ˈɪt ə rɪˈsɑːlədʒi ˈbiː ˌdʒeləˈtɑːlədʒi ˈɔːr ˈsiː kəˈmɑːlədʒi/",
        "keywords": [
            "risology",
            "gelotology",
            "comology"
        ],
        "explanationAi": "Ba thuật ngữ khoa học mang hậu tố '-ology' (ngành học/môn khoa học) xuất phát từ các gốc từ cổ điển.",
        "properNouns": [],
        "tokenCount": 9
    },
    {
        "orderIndex": 22,
        "startTime": 91.04,
        "endTime": 99.83,
        "text": "That's difficult and I'm going to say c) comology because it's got sort of the word 'comedy' in it, you see.",
        "translationVi": "Câu đó khó thật đấy và tôi xin chọn c) comology bởi vì nó có chứa từ 'comedy' (hài kịch) trong đó, bạn thấy đấy.",
        "ipaUs": "/ˈðæts ˈdɪfəkəlt ənd ˈaɪm ˈɡoʊɪŋ ˈtuː ˈseɪ ˈsiː kəˈmɑːlədʒi ˈbɪkɔːz ˈɪts ˈɡɑːt ˈsɔːrt ˈʌv ðə ˈwɜːrd ˈkɑːmədi ɪn ˈɪt ˈjuː ˈsiː/",
        "keywords": [
            "difficult",
            "comology",
            "comedy"
        ],
        "explanationAi": "Neil suy luận theo liên tưởng bề mặt từ 'comedy' (hài kịch) nên chọn comology, đây là phỏng đoán sai lầm.",
        "properNouns": [],
        "tokenCount": 24
    },
    {
        "orderIndex": 23,
        "startTime": 99.84,
        "endTime": 103.59,
        "text": "Oh, very good. OK. Well, we'll find out later if you're right.",
        "translationVi": "Ồ, rất tốt. Được rồi. Chà, lát nữa chúng ta sẽ cùng tìm hiểu xem bạn có đúng hay không nhé.",
        "ipaUs": "/ˈoʊ ˈveri ˈɡʊd ˈoʊkeɪ ˈwel ˈwiːl ˈfaɪnd ˈaʊt ˈleɪtər ˈɪf ˈjʊr ˈraɪt/",
        "keywords": [
            "find",
            "later",
            "right"
        ],
        "explanationAi": "Cụm 'find out' mang nghĩa khám phá ra sự thật hoặc đáp án chuẩn xác ở phần sau của chương trình.",
        "properNouns": [],
        "tokenCount": 14
    },
    {
        "orderIndex": 24,
        "startTime": 103.6,
        "endTime": 107.99,
        "text": "Now, did you know, we rarely laugh when we're on our own?",
        "translationVi": "Nào, bạn có biết rằng, chúng ta rất hiếm khi cười khi chỉ có một mình không?",
        "ipaUs": "/ˈnaʊ ˈdɪd ˈjuː ˈnoʊ ˈwiː ˈrerli ˈlæf ˈwen ˈwiːr ˈɑːn ˈaʊər ˈoʊn/",
        "keywords": [
            "rarely",
            "laugh"
        ],
        "explanationAi": "'On our own' mang nghĩa 'alone' (đơn độc, một mình). Trạng từ tần suất 'rarely' nhấn mạnh tính hiếm thấy.",
        "properNouns": [],
        "tokenCount": 13
    },
    {
        "orderIndex": 25,
        "startTime": 108.0,
        "endTime": 111.83,
        "text": "Laughter is a social thing that we generally like to share with other people.",
        "translationVi": "Tiếng cười là một hiện tượng mang tính xã hội mà chúng ta thường thích sẻ chia cùng người khác.",
        "ipaUs": "/ˈlæftər ˈɪz ə ˈsoʊʃəl ˈθɪŋ ˈðæt ˈwiː ˈdʒenərəli ˈlaɪk ˈtuː ˈʃer ˈwɪð ˈʌðər ˈpiːpəl/",
        "keywords": [
            "laughter",
            "social",
            "generally",
            "share"
        ],
        "explanationAi": "Tính từ 'social' mô tả hành vi mang tính tương tác cộng đồng. 'Share with other people' nghĩa là chia sẻ cùng người khác.",
        "properNouns": [],
        "tokenCount": 14
    },
    {
        "orderIndex": 26,
        "startTime": 111.84,
        "endTime": 116.07,
        "text": "Really? I laugh when I'm watching cartoons on my own – don't you, Alice?",
        "translationVi": "Thật sao? Tôi vẫn cười khi xem phim hoạt hình một mình mà – bạn không thế sao, Alice?",
        "ipaUs": "/ˈrɪli ˈaɪ ˈlæf ˈwen ˈaɪm ˈwɑːtʃɪŋ ˈkɑːrtuːnz ˈɑːn ˈmaɪ ˈoʊn ˈdoʊnt ˈjuː ˈæləs/",
        "keywords": [
            "cartoons",
            "watching"
        ],
        "explanationAi": "Câu hỏi đuôi 'don't you?' dùng để tìm kiếm sự đồng cảm hoặc thăm dò thói quen xem phim hoạt hình (cartoons).",
        "properNouns": [
            "Alice"
        ],
        "tokenCount": 15
    },
    {
        "orderIndex": 27,
        "startTime": 116.08,
        "endTime": 117.75,
        "text": "No, Neil, I don't.",
        "translationVi": "Không, Neil, tôi không làm thế đâu.",
        "ipaUs": "/ˈnoʊ ˈniːl ˈaɪ ˈdoʊnt/",
        "keywords": [],
        "explanationAi": "Câu phủ định dứt khoát của Alice tạo nên nét tương phản tính cách hài hước giữa hai người dẫn.",
        "properNouns": [
            "Neil"
        ],
        "tokenCount": 5
    },
    {
        "orderIndex": 28,
        "startTime": 117.76,
        "endTime": 124.71,
        "text": "Anyway, some researchers believe that the purpose of laughter is related to the way we bond with each other.",
        "translationVi": "Dù sao đi nữa, một số nhà nghiên cứu tin rằng mục đích của tiếng cười có liên quan đến cách chúng ta gắn kết với nhau.",
        "ipaUs": "/ˈeniweɪ ˈsʌm ˈriːsərtʃərz ˈbɪliːv ˈðæt ðə ˈpɜːrpəs ˈʌv ˈlæftər ˈɪz ˈrɪleɪtɪd ˈtuː ðə ˈweɪ ˈwiː ˈbɑːnd ˈwɪð ˈiːtʃ ˈʌðər/",
        "keywords": [
            "researchers",
            "purpose",
            "laughter",
            "related",
            "bond"
        ],
        "explanationAi": "'Be related to' (có liên quan tới). Động từ 'bond with each other' mang nghĩa kết nối và xây dựng tình cảm thân thiết.",
        "properNouns": [],
        "tokenCount": 19
    },
    {
        "orderIndex": 29,
        "startTime": 124.72,
        "endTime": 127.35,
        "text": "And the more we laugh, the more we bond as a group.",
        "translationVi": "Và chúng ta càng cười nhiều, chúng ta càng gắn bó khăng khít hơn như một tập thể.",
        "ipaUs": "/ənd ðə ˈmɔːr ˈwiː ˈlæf ðə ˈmɔːr ˈwiː ˈbɑːnd ˈæz ə ˈɡruːp/",
        "keywords": [
            "laugh",
            "bond",
            "group"
        ],
        "explanationAi": "Cấu trúc so sánh đồng tiến kép 'The more... the more...' nhấn mạnh mối quan hệ tỷ lệ thuận giữa việc cười và sự đoàn kết nhóm.",
        "properNouns": [],
        "tokenCount": 12
    },
    {
        "orderIndex": 30,
        "startTime": 127.36,
        "endTime": 129.91,
        "text": "Interesting idea.",
        "translationVi": "Một ý tưởng thật thú vị.",
        "ipaUs": "/ˈɪntrəstɪŋ ˈaɪdiːə/",
        "keywords": [
            "interesting",
            "idea"
        ],
        "explanationAi": "Lời nhận xét ngắn gọn thể hiện sự đồng tình trước giả thuyết khoa học về sự gắn kết bầy đàn.",
        "properNouns": [],
        "tokenCount": 2
    },
    {
        "orderIndex": 31,
        "startTime": 129.92,
        "endTime": 140.07,
        "text": "It could explain why stand-up comedy – where a comedian performs in front of and talks directly to their audience – is very popular entertainment.",
        "translationVi": "Điều đó có thể giải thích tại sao hài độc thoại – nơi nghệ sĩ hài biểu diễn trước và nói chuyện trực tiếp với khán giả – lại là loại hình giải trí rất được yêu thích.",
        "ipaUs": "/ˈɪt ˈkʊd ˈɪkspleɪn ˈwaɪ ˈstænd ʌp ˈkɑːmədi ˈwer ə ˈkəmiːdiən ˈpərfɔːrmz ɪn ˈfrʌnt ˈʌv ənd ˈtɔːks ˈdərektli ˈtuː ˈðer ˈɑːdiəns ˈɪz ˈveri ˈpɑːpjələr ˈentərteɪnmənt/",
        "keywords": [
            "stand-up comedy",
            "comedian",
            "performs",
            "audience",
            "entertainment"
        ],
        "explanationAi": "Thuật ngữ sân khấu 'stand-up comedy' (hài độc thoại). Mệnh đề quan hệ giải thích 'where a comedian performs in front of and talks directly to their audience'.",
        "properNouns": [],
        "tokenCount": 24
    },
    {
        "orderIndex": 32,
        "startTime": 140.08,
        "endTime": 142.47,
        "text": "But what does it take to keep your audience laughing?",
        "translationVi": "Nhưng cần phải có những yếu tố gì để giữ cho khán giả của bạn không ngừng cười?",
        "ipaUs": "/ˈbʌt ˈwʌt ˈdʌz ˈɪt ˈteɪk ˈtuː ˈkiːp ˈjɔːr ˈɑːdiəns ˈlæfɪŋ/",
        "keywords": [
            "audience",
            "laughing"
        ],
        "explanationAi": "Thành ngữ 'what does it take' đặt ra câu hỏi về năng lực, bí quyết và sự rèn luyện cần thiết để thành công.",
        "properNouns": [],
        "tokenCount": 10
    },
    {
        "orderIndex": 33,
        "startTime": 142.48,
        "endTime": 147.99,
        "text": "Let's listen to Steve Byrne, a successful US comedian talking about this.",
        "translationVi": "Chúng ta hãy cùng lắng nghe Steve Byrne, một nghệ sĩ hài người Mỹ thành danh, chia sẻ về điều này.",
        "ipaUs": "/ˈlets ˈlɪsən ˈtuː ˈstiːv bɜːrn ə ˈsəksesfəl ˈʌs ˈkəmiːdiən ˈtɔːkɪŋ ˈəbaʊt ˈðɪs/",
        "keywords": [
            "successful",
            "comedian",
            "talking"
        ],
        "explanationAi": "Giới thiệu nhân vật khách mời: danh hài Steve Byrne người Mỹ với cụm danh từ 'a successful US comedian'.",
        "properNouns": [
            "Steve Byrne",
            "US"
        ],
        "tokenCount": 13
    },
    {
        "orderIndex": 34,
        "startTime": 148.0,
        "endTime": 157.0,
        "text": "The one single thing an aspiring comedian should do is to write, write, write and talk about the things that make them laugh.",
        "translationVi": "Điều duy nhất mà một diễn viên hài đầy hoài bão nên làm là viết, viết, viết không ngừng và nói về những điều khiến chính bản thân họ bật cười.",
        "ipaUs": "/ðə ˈwʌn ˈsɪŋɡəl ˈθɪŋ ˈæn ˈəspaɪrɪŋ ˈkəmiːdiən ˈʃʊd ˈduː ˈɪz ˈtuː ˈraɪt ˈraɪt ˈraɪt ənd ˈtɔːk ˈəbaʊt ðə ˈθɪŋz ˈðæt ˈmeɪk ˈðem ˈlæf/",
        "keywords": [
            "aspiring",
            "comedian",
            "write",
            "laugh"
        ],
        "explanationAi": "Tính từ 'aspiring' chỉ người đang nỗ lực đạt được hoài bão trong sự nghiệp. Điệp từ 'write, write, write' nhấn mạnh sự rèn luyện miệt mài.",
        "properNouns": [],
        "tokenCount": 23
    },
    {
        "orderIndex": 35,
        "startTime": 157.0,
        "endTime": 160.0,
        "text": "Selfishness – time to be selfish – time to be a little narcissistic.",
        "translationVi": "Sự vị kỷ – đã đến lúc phải biết vị kỷ – đã đến lúc phải tự ái tự tôn một chút.",
        "ipaUs": "/ˈselfɪʃnəs ˈtaɪm ˈtuː ˈbiː ˈselfɪʃ ˈtaɪm ˈtuː ˈbiː ə ˈlɪtəl ˈnɑːrsɪsɪstɪk/",
        "keywords": [
            "selfishness",
            "selfish",
            "narcissistic"
        ],
        "explanationAi": "Steve Byrne nêu ra triết lý sáng tạo: nghệ sĩ phải xuất phát từ sự say mê cá nhân ('selfish', 'narcissistic') để tạo nét độc đáo.",
        "properNouns": [],
        "tokenCount": 11
    },
    {
        "orderIndex": 36,
        "startTime": 160.0,
        "endTime": 164.23,
        "text": "What is it that makes you laugh? Because that will get you closer to finding your voice.",
        "translationVi": "Điều gì là thứ khiến chính bạn bật cười? Bởi vì điều đó sẽ đưa bạn đến gần hơn với việc tìm ra tiếng nói riêng của mình.",
        "ipaUs": "/ˈwʌt ˈɪz ˈɪt ˈðæt ˈmeɪks ˈjuː ˈlæf ˈbɪkɔːz ˈðæt ˈwɪl ˈɡet ˈjuː ˈkloʊsər ˈtuː ˈfaɪndɪŋ ˈjɔːr ˈvɔɪs/",
        "keywords": [
            "closer",
            "finding",
            "voice"
        ],
        "explanationAi": "Thành ngữ nghệ thuật 'find your voice' chỉ việc khám phá và định hình phong cách biểu diễn độc bản của bản thân.",
        "properNouns": [],
        "tokenCount": 17
    },
    {
        "orderIndex": 37,
        "startTime": 164.24,
        "endTime": 167.75,
        "text": "Because ultimately that's why people come see you.",
        "translationVi": "Bởi vì suy cho cùng, đó chính là lý do vì sao mọi người lại đến xem bạn biểu diễn.",
        "ipaUs": "/ˈbɪkɔːz ˈʌltəmətli ˈðæts ˈwaɪ ˈpiːpəl ˈkʌm ˈsiː ˈjuː/",
        "keywords": [
            "ultimately",
            "people"
        ],
        "explanationAi": "Trạng từ 'ultimately' nghĩa là xét đến cùng. Khán giả tìm đến một danh hài là vì tiếng nói và phong cách riêng biệt của họ.",
        "properNouns": [],
        "tokenCount": 9
    },
    {
        "orderIndex": 38,
        "startTime": 167.76,
        "endTime": 175.0,
        "text": "So comedians need to be selfish and narcissistic – that sounds pretty negative!",
        "translationVi": "Vậy là các nghệ sĩ hài cần phải vị kỷ và tự luyến ư – nghe có vẻ khá tiêu cực đấy chứ!",
        "ipaUs": "/ˈsoʊ ˈkəmiːdiənz ˈniːd ˈtuː ˈbiː ˈselfɪʃ ənd ˈnɑːrsɪsɪstɪk ˈðæt ˈsaʊndz ˈprɪti ˈneɡətɪv/",
        "keywords": [
            "comedians",
            "selfish",
            "narcissistic",
            "negative"
        ],
        "explanationAi": "'Sounds pretty negative' thể hiện phản ứng bất ngờ khi thấy danh hài khuyến khích đức tính thường bị coi là xấu trong đạo đức.",
        "properNouns": [],
        "tokenCount": 12
    },
    {
        "orderIndex": 39,
        "startTime": 175.0,
        "endTime": 176.5,
        "text": "Yes, it does.",
        "translationVi": "Đúng vậy, nghe đúng là thế.",
        "ipaUs": "/ˈjes ˈɪt ˈdʌz/",
        "keywords": [],
        "explanationAi": "Câu phụ họa tán đồng của Alice dẫn dắt vào phần giải thích chi tiết ý nghĩa ngữ dụng của từ.",
        "properNouns": [],
        "tokenCount": 3
    },
    {
        "orderIndex": 40,
        "startTime": 176.5,
        "endTime": 182.63,
        "text": "Narcissistic means being too interested in yourself – for example your appearance or other personal qualities.",
        "translationVi": "'Narcissistic' có nghĩa là quá bận tâm đến bản thân – chẳng hạn như ngoại hình hay những phẩm chất cá nhân khác của bạn.",
        "ipaUs": "/ˈnɑːrsɪsɪstɪk ˈmiːnz ˈbiːɪŋ ˈtuː ˈɪntrəstɪd ɪn ˈjərself ˈfɔːr ˈɪɡzæmpəl ˈjɔːr ˈəpɪrəns ˈɔːr ˈʌðər ˈpɜːrsɪnəl ˈkwɑːlətiz/",
        "keywords": [
            "narcissistic",
            "interested",
            "appearance",
            "qualities"
        ],
        "explanationAi": "Định nghĩa từ vựng: 'narcissistic' (bắt nguồn từ thần thoại chàng Narcissus) miêu tả người quá tự mê đắm ngoại hình và tính cách của mình.",
        "properNouns": [],
        "tokenCount": 15
    },
    {
        "orderIndex": 41,
        "startTime": 182.64,
        "endTime": 187.03,
        "text": "And aspiring means wanting to be successful in your chosen career.",
        "translationVi": "Và 'aspiring' có nghĩa là khao khát được thành công trong sự nghiệp mà bạn đã lựa chọn.",
        "ipaUs": "/ənd ˈəspaɪrɪŋ ˈmiːnz ˈwɑːntɪŋ ˈtuː ˈbiː ˈsəksesfəl ɪn ˈjɔːr ˈtʃoʊzən ˈkərɪr/",
        "keywords": [
            "aspiring",
            "successful",
            "career"
        ],
        "explanationAi": "Định nghĩa 'aspiring': ôm ấp ước mơ và nỗ lực đạt được thành tựu lớn trong một ngành nghề (chosen career).",
        "properNouns": [],
        "tokenCount": 11
    },
    {
        "orderIndex": 42,
        "startTime": 187.04,
        "endTime": 191.99,
        "text": "And what does Steve mean when he says comedians need to find their voice?",
        "translationVi": "Thế còn Steve có ý gì khi ông ấy nói rằng các nghệ sĩ hài cần phải tìm ra tiếng nói riêng của họ?",
        "ipaUs": "/ənd ˈwʌt ˈdʌz ˈstiːv ˈmiːn ˈwen ˈhiː ˈsez ˈkəmiːdiənz ˈniːd ˈtuː ˈfaɪnd ˈðer ˈvɔɪs/",
        "keywords": [
            "mean",
            "comedians",
            "voice"
        ],
        "explanationAi": "Neil hỏi về ý nghĩa cụ thể của việc 'tìm thấy tiếng nói' (find their voice) trong giới sân khấu biểu diễn.",
        "properNouns": [
            "Steve"
        ],
        "tokenCount": 14
    },
    {
        "orderIndex": 43,
        "startTime": 192.0,
        "endTime": 199.59,
        "text": "Well, he means they need to talk about what they think in a way that's unique – meaning unusual or special – to them.",
        "translationVi": "À, ông ấy muốn nói rằng họ cần phải giãi bày những suy nghĩ của mình theo cách độc nhất vô nhị – nghĩa là khác thường hay đặc biệt – mang dấu ấn của riêng họ.",
        "ipaUs": "/ˈwel ˈhiː ˈmiːnz ˈðeɪ ˈniːd ˈtuː ˈtɔːk ˈəbaʊt ˈwʌt ˈðeɪ ˈθɪŋk ɪn ə ˈweɪ ˈðæts ˈjuniːk ˈmiːnɪŋ ˈənjuːʒuːəl ˈɔːr ˈspeʃəl ˈtuː ˈðem/",
        "keywords": [
            "unique",
            "unusual",
            "special"
        ],
        "explanationAi": "'Unique' (độc nhất) được làm rõ thông qua hai từ đồng nghĩa 'unusual' (khác lạ) và 'special' (đặc biệt).",
        "properNouns": [],
        "tokenCount": 23
    },
    {
        "orderIndex": 44,
        "startTime": 199.6,
        "endTime": 207.19,
        "text": "OK. Let's listen to Steve again talking about turning 40 and what he finds funny about that.",
        "translationVi": "Được rồi. Hãy cùng nghe Steve chia sẻ tiếp về việc bước sang tuổi 40 và điều ông ấy thấy hài hước về điều đó nhé.",
        "ipaUs": "/ˈoʊkeɪ ˈlets ˈlɪsən ˈtuː ˈstiːv ˈəɡen ˈtɔːkɪŋ ˈəbaʊt ˈtɜːrnɪŋ 40 ənd ˈwʌt ˈhiː ˈfaɪndz ˈfʌni ˈəbaʊt ˈðæt/",
        "keywords": [
            "turning",
            "funny"
        ],
        "explanationAi": "Cụm 'turning 40' diễn tả cột mốc bước sang tuổi tứ tuần. 'What he finds funny' chỉ những góc nhìn trào phúng cá nhân.",
        "properNouns": [
            "Steve"
        ],
        "tokenCount": 18
    },
    {
        "orderIndex": 45,
        "startTime": 207.2,
        "endTime": 212.31,
        "text": "When you turn 40 you will hear this in your life and hopefully you'll hear it the rest of your life.",
        "translationVi": "Khi bạn bước sang tuổi 40, bạn sẽ nghe thấy điều này trong đời và hy vọng rằng bạn sẽ còn được nghe nó trong suốt quãng đời còn lại.",
        "ipaUs": "/ˈwen ˈjuː ˈtɜːrn 40 ˈjuː ˈwɪl ˈhiːr ˈðɪs ɪn ˈjɔːr ˈlaɪf ənd ˈhoʊpfəli ˈjuːl ˈhiːr ˈɪt ðə ˈrest ˈʌv ˈjɔːr ˈlaɪf/",
        "keywords": [
            "turn",
            "hear",
            "hopefully",
            "rest"
        ],
        "explanationAi": "Steve Byrne mở đầu tiết mục hài độc thoại bằng quan sát thực tế về những lời nhận xét tuổi tác.",
        "properNouns": [],
        "tokenCount": 22
    },
    {
        "orderIndex": 46,
        "startTime": 212.32,
        "endTime": 217.91,
        "text": "'You look good for 40. You look good for 52. You look great for 63.'",
        "translationVi": "'Trông anh phong độ so với tuổi 40 đấy. Trông anh tuyệt so với tuổi 52. Trông cụ vẫn tuyệt vời so với tuổi 63.'",
        "ipaUs": "/ˈjuː ˈlʊk ˈɡʊd ˈfɔːr 40 ˈjuː ˈlʊk ˈɡʊd ˈfɔːr 52 ˈjuː ˈlʊk ˈɡreɪt ˈfɔːr 63/",
        "keywords": [
            "look",
            "good",
            "great"
        ],
        "explanationAi": "Lối dùng giới từ 'for' chỉ sự so sánh tương quan: đẹp/trẻ trung so với độ tuổi già đi.",
        "properNouns": [],
        "tokenCount": 15
    },
    {
        "orderIndex": 47,
        "startTime": 217.92,
        "endTime": 222.0,
        "text": "You never hear that when you're young. You never hear: 'You look good for 19.'",
        "translationVi": "Bạn không bao giờ nghe thấy điều đó khi còn trẻ. Bạn chẳng bao giờ nghe ai bảo: 'Trông cậu được đấy so với tuổi 19'.",
        "ipaUs": "/ˈjuː ˈnevər ˈhiːr ˈðæt ˈwen ˈjʊr ˈjʌŋ ˈjuː ˈnevər ˈhiːr ˈjuː ˈlʊk ˈɡʊd ˈfɔːr 19/",
        "keywords": [
            "never",
            "young"
        ],
        "explanationAi": "Nghệ thuật tương phản gây cười: thanh niên tuổi 19 không ai khen là 'nhìn được so với tuổi' vì sự tươi trẻ là tất yếu.",
        "properNouns": [],
        "tokenCount": 16
    },
    {
        "orderIndex": 48,
        "startTime": 222.0,
        "endTime": 227.0,
        "text": "You think there's gonna be some secret potion or some magic shortcut to it all.",
        "translationVi": "Bạn tưởng rằng sẽ có một thứ thuốc tiên bí mật hay con đường tắt diệu kỳ nào đó cho tất cả những điều này.",
        "ipaUs": "/ˈjuː ˈθɪŋk ˈðerz ˈɡənə ˈbiː ˈsʌm ˈsiːkrət ˈpoʊʃən ˈɔːr ˈsʌm ˈmædʒɪk ˈʃɔːrtkʌt ˈtuː ˈɪt ˈɔːl/",
        "keywords": [
            "secret",
            "potion",
            "magic",
            "shortcut"
        ],
        "explanationAi": "Ẩn dụ 'secret potion' (thần dược bí mật) và 'magic shortcut' (đường tắt mầu nhiệm) chỉ ảo tưởng muốn thành công không tốn công sức.",
        "properNouns": [],
        "tokenCount": 16
    },
    {
        "orderIndex": 49,
        "startTime": 227.0,
        "endTime": 229.75,
        "text": "It's writing and getting up on stage.",
        "translationVi": "Tất cả chỉ là viết lách và bước lên sân khấu biểu diễn.",
        "ipaUs": "/ˈɪts ˈraɪtɪŋ ənd ˈɡetɪŋ ˈʌp ˈɑːn ˈsteɪdʒ/",
        "keywords": [
            "writing",
            "stage"
        ],
        "explanationAi": "Bản chất nghề nghiệp hài kịch: lao động viết kịch bản hàng ngày và sự dũng cảm bước lên sân khấu đối diện khán giả.",
        "properNouns": [],
        "tokenCount": 8
    },
    {
        "orderIndex": 50,
        "startTime": 229.76,
        "endTime": 233.83,
        "text": "It takes a lot of perseverance and it's such a competitive occupation.",
        "translationVi": "Nó đòi hỏi rất nhiều sự kiên trì bền bỉ và đó là một nghề nghiệp có tính cạnh tranh khốc liệt như vậy đấy.",
        "ipaUs": "/ˈɪt ˈteɪks ə ˈlɑːt ˈʌv ˈpɜːrsəvɪrəns ənd ˈɪts ˈsʌtʃ ə ˈkəmpetətɪv ˈɑːkjəpeɪʃən/",
        "keywords": [
            "perseverance",
            "competitive",
            "occupation"
        ],
        "explanationAi": "'Perseverance' (tính kiên nhẫn vượt khó) và 'competitive occupation' (nghề nghiệp cạnh tranh gay gắt đào thải cao).",
        "properNouns": [],
        "tokenCount": 13
    },
    {
        "orderIndex": 51,
        "startTime": 233.84,
        "endTime": 237.43,
        "text": "You know, you've just got to outwork everybody.",
        "translationVi": "Bạn biết đấy, bạn buộc phải làm việc chăm chỉ vượt qua tất cả mọi người.",
        "ipaUs": "/ˈjuː ˈnoʊ ˈjuːv ˈdʒʌst ˈɡɑːt ˈtuː ˌaʊtˈwɜːrk ˈevribɑːdi/",
        "keywords": [
            "outwork",
            "everybody"
        ],
        "explanationAi": "Động từ 'outwork' mang nghĩa nỗ lực lao động nhiều hơn, chăm chỉ hơn tất cả những người khác.",
        "properNouns": [],
        "tokenCount": 9
    },
    {
        "orderIndex": 52,
        "startTime": 237.44,
        "endTime": 241.0,
        "text": "Well, we heard Steve making his audience laugh there.",
        "translationVi": "Chà, chúng ta vừa nghe Steve chọc cười khán giả của ông ấy ở đoạn vừa rồi.",
        "ipaUs": "/ˈwel ˈwiː ˈhɜːrd ˈstiːv ˈmeɪkɪŋ ˈhɪz ˈɑːdiəns ˈlæf ˈðer/",
        "keywords": [
            "audience",
            "laugh"
        ],
        "explanationAi": "Cấu trúc 'hear someone doing something' chỉ việc chứng kiến/nghe thấy hành động đang diễn ra.",
        "properNouns": [
            "Steve"
        ],
        "tokenCount": 9
    },
    {
        "orderIndex": 53,
        "startTime": 241.0,
        "endTime": 244.63,
        "text": "And by the way, Alice, you look fantastic for 40.",
        "translationVi": "Và nhân tiện thì, Alice, trông bạn vẫn vô cùng tuyệt vời so với tuổi 40 đấy nhé.",
        "ipaUs": "/ənd ˈbaɪ ðə ˈweɪ ˈæləs ˈjuː ˈlʊk ˈfæntæstɪk ˈfɔːr 40/",
        "keywords": [
            "fantastic"
        ],
        "explanationAi": "Neil áp dụng ngay câu đùa của Steve để trêu chọc tuổi tác của Alice, tạo tình huống hài hước giữa hai người bạn dẫn.",
        "properNouns": [
            "Alice"
        ],
        "tokenCount": 10
    },
    {
        "orderIndex": 54,
        "startTime": 244.64,
        "endTime": 248.23,
        "text": "That's not funny, Neil. I'm only 39 and you know it!",
        "translationVi": "Chẳng buồn cười chút nào đâu, Neil. Tôi mới chỉ 39 tuổi thôi và bạn thừa biết điều đó mà!",
        "ipaUs": "/ˈðæts ˈnɑːt ˈfʌni ˈniːl ˈaɪm ˈoʊnli 39 ənd ˈjuː ˈnoʊ ˈɪt/",
        "keywords": [
            "funny"
        ],
        "explanationAi": "Alice lập tức đính chính tuổi thật của mình chưa tới 40, phản bác trò trêu đùa của Neil.",
        "properNouns": [
            "Neil"
        ],
        "tokenCount": 13
    },
    {
        "orderIndex": 55,
        "startTime": 248.24,
        "endTime": 254.55,
        "text": "Anyway, moving on, Steve says there's no magic potion or shortcut to success.",
        "translationVi": "Dù sao đi nữa, chuyển sang phần tiếp theo, Steve nói rằng không có thần dược hay con đường tắt nào dẫn tới thành công cả.",
        "ipaUs": "/ˈeniweɪ ˈmuːvɪŋ ˈɑːn ˈstiːv ˈsez ˈðerz ˈnoʊ ˈmædʒɪk ˈpoʊʃən ˈɔːr ˈʃɔːrtkʌt ˈtuː ˈsəkses/",
        "keywords": [
            "magic",
            "potion",
            "shortcut",
            "success"
        ],
        "explanationAi": "Alice chuyển chủ đề ('moving on') và tổng kết lại bài học cốt lõi: thành công không có lối đi tắt.",
        "properNouns": [
            "Steve"
        ],
        "tokenCount": 14
    },
    {
        "orderIndex": 56,
        "startTime": 254.56,
        "endTime": 257.83,
        "text": "You have to work hard – it doesn't happen by itself.",
        "translationVi": "Bạn phải làm việc chăm chỉ – thành công không bao giờ tự nhiên ập đến.",
        "ipaUs": "/ˈjuː ˈhæv ˈtuː ˈwɜːrk ˈhɑːrd ˈɪt ˈdʌzənt ˈhæpən ˈbaɪ ˈɪtself/",
        "keywords": [
            "work",
            "hard",
            "happen"
        ],
        "explanationAi": "'Happen by itself' chỉ việc cái gì đó tự nhiên xảy ra mà không cần nỗ lực hay sự tác động.",
        "properNouns": [],
        "tokenCount": 11
    },
    {
        "orderIndex": 57,
        "startTime": 257.84,
        "endTime": 263.0,
        "text": "And perseverance means to keep on trying to achieve something even when it's difficult.",
        "translationVi": "Và 'perseverance' có nghĩa là tiếp tục kiên trì cố gắng đạt được điều gì đó ngay cả khi gặp muôn vàn khó khăn.",
        "ipaUs": "/ənd ˈpɜːrsəvɪrəns ˈmiːnz ˈtuː ˈkiːp ˈɑːn ˈtraɪɪŋ ˈtuː ˈətʃiːv ˈsʌmθɪŋ ˈiːvɪn ˈwen ˈɪts ˈdɪfəkəlt/",
        "keywords": [
            "perseverance",
            "trying",
            "achieve",
            "difficult"
        ],
        "explanationAi": "Định nghĩa từ vựng trọng tâm: 'perseverance' là tính nhẫn nại, kiên trì theo đuổi mục đích tới cùng bất chấp gian nan.",
        "properNouns": [],
        "tokenCount": 15
    },
    {
        "orderIndex": 58,
        "startTime": 263.0,
        "endTime": 269.11,
        "text": "He says you have to outwork everybody – which means to work harder than everybody else.",
        "translationVi": "Ông ấy nói bạn phải 'outwork everybody' – có nghĩa là làm việc nỗ lực và chăm chỉ hơn bất kỳ ai khác.",
        "ipaUs": "/ˈhiː ˈsez ˈjuː ˈhæv ˈtuː ˌaʊtˈwɜːrk ˈevribɑːdi ˈwɪtʃ ˈmiːnz ˈtuː ˈwɜːrk ˈhɑːrdər ˈðæn ˈevribɑːdi ˈels/",
        "keywords": [
            "outwork",
            "harder",
            "everybody"
        ],
        "explanationAi": "Định nghĩa 'outwork everybody': nỗ lực lao động và cống hiến vượt trên toàn bộ các đối thủ cùng lĩnh vực.",
        "properNouns": [],
        "tokenCount": 15
    },
    {
        "orderIndex": 59,
        "startTime": 269.12,
        "endTime": 273.75,
        "text": "Steve certainly doesn't make comedy sound much fun, does he?",
        "translationVi": "Steve quả thực không làm cho nghề hài kịch nghe có vẻ vui vẻ cho lắm, phải không nào?",
        "ipaUs": "/ˈstiːv ˈsɜːrtənli ˈdʌzənt ˈmeɪk ˈkɑːmədi ˈsaʊnd ˈmʌtʃ ˈfʌn ˈdʌz ˈhiː/",
        "keywords": [
            "comedy",
            "fun"
        ],
        "explanationAi": "Câu hỏi đuôi 'does he?' bày tỏ cảm nhận rằng phía sau ánh hào quang sân khấu là sự lao động gian nan, mệt nhọc.",
        "properNouns": [
            "Steve"
        ],
        "tokenCount": 11
    },
    {
        "orderIndex": 60,
        "startTime": 273.76,
        "endTime": 281.59,
        "text": "No. In fact some people say there's a connection between depression and comedy – that comedians can be introverted and depressive.",
        "translationVi": "Đúng thế. Trên thực tế một số người nói rằng có mối liên hệ giữa bệnh trầm cảm và hài kịch – rằng các danh hài có thể rất hướng nội và dễ u uất.",
        "ipaUs": "/ˈnoʊ ɪn ˈfækt ˈsʌm ˈpiːpəl ˈseɪ ˈðerz ə ˈkənekʃən ˈbɪtwiːn ˈdɪpreʃən ənd ˈkɑːmədi ˈðæt ˈkəmiːdiənz ˈkæn ˈbiː ˈɪntroʊvɜːrtɪd ənd ˈdɪpresɪv/",
        "keywords": [
            "connection",
            "depression",
            "comedy",
            "introverted",
            "depressive"
        ],
        "explanationAi": "Mối nghịch lý tâm lý học sâu sắc: nghệ sĩ làm người khác cười thường phải đối mặt với nỗi u sầu, hướng nội và chứng trầm cảm.",
        "properNouns": [],
        "tokenCount": 21
    },
    {
        "orderIndex": 61,
        "startTime": 281.6,
        "endTime": 283.0,
        "text": "Is that right?",
        "translationVi": "Có đúng thế không nhỉ?",
        "ipaUs": "/ˈɪz ˈðæt ˈraɪt/",
        "keywords": [
            "right"
        ],
        "explanationAi": "Câu hỏi bày tỏ sự ngạc nhiên trước nghịch lý về thế giới nội tâm của các danh hài.",
        "properNouns": [],
        "tokenCount": 3
    },
    {
        "orderIndex": 62,
        "startTime": 283.0,
        "endTime": 289.11,
        "text": "Introverts are generally quiet people who are more interested in their own thoughts and feelings than in spending time with other people.",
        "translationVi": "Người hướng nội thường là những người trầm tính, những người quan tâm đến suy nghĩ và cảm xúc nội tâm của chính mình nhiều hơn là giao lưu cùng người khác.",
        "ipaUs": "/introverts ˈɑːr ˈdʒenərəli ˈkwaɪət ˈpiːpəl ˈhuː ˈɑːr ˈmɔːr ˈɪntrəstɪd ɪn ˈðer ˈoʊn ˈθɔːts ənd ˈfiːlɪŋz ˈðæn ɪn ˈspendɪŋ ˈtaɪm ˈwɪð ˈʌðər ˈpiːpəl/",
        "keywords": [
            "introverts",
            "quiet",
            "thoughts",
            "feelings",
            "spending"
        ],
        "explanationAi": "Định nghĩa học thuật về 'introverts' (người hướng nội): những người thích sự yên tĩnh và suy tư nội tâm.",
        "properNouns": [],
        "tokenCount": 22
    },
    {
        "orderIndex": 63,
        "startTime": 289.12,
        "endTime": 294.79,
        "text": "Yes, you'd think that most comedians would be extroverts – people who are lively and enjoy the company of others.",
        "translationVi": "Đúng vậy, bạn hẳn sẽ nghĩ rằng hầu hết nghệ sĩ hài đều là người hướng ngoại – những người hoạt bát và yêu thích sự hiện diện bên cạnh những người khác.",
        "ipaUs": "/ˈjes ˈjuːd ˈθɪŋk ˈðæt ˈmoʊst ˈkəmiːdiənz ˈwʊd ˈbiː extroverts ˈpiːpəl ˈhuː ˈɑːr ˈlaɪvli ənd ˈendʒɔɪ ðə ˈkʌmpəniː ˈʌv ˈʌðərz/",
        "keywords": [
            "extroverts",
            "lively",
            "company"
        ],
        "explanationAi": "Định nghĩa 'extroverts' (người hướng ngoại). 'Enjoy the company of others' nghĩa là thích tụ tập, vui vầy cùng bạn bè.",
        "properNouns": [],
        "tokenCount": 20
    },
    {
        "orderIndex": 64,
        "startTime": 294.8,
        "endTime": 299.35,
        "text": "OK I think it's time for the answer to our quiz question, Neil.",
        "translationVi": "Được rồi, tôi nghĩ đã đến lúc công bố câu trả lời cho câu đố của chúng ta hôm nay, Neil à.",
        "ipaUs": "/ˈoʊkeɪ ˈaɪ ˈθɪŋk ˈɪts ˈtaɪm ˈfɔːr ðə ˈænsər ˈtuː ˈaʊər ˈkwɪz ˈkwestʃən ˈniːl/",
        "keywords": [
            "answer",
            "quiz",
            "question"
        ],
        "explanationAi": "Alice thông báo chuyển sang phần giải đáp câu đố đầu giờ.",
        "properNouns": [
            "Neil"
        ],
        "tokenCount": 14
    },
    {
        "orderIndex": 65,
        "startTime": 299.36,
        "endTime": 313.11,
        "text": "I asked: Which Greek word means the study of laughter and its effects on the body? Is it a) risology, b) gelotology? or c) comology?",
        "translationVi": "Tôi đã hỏi: Từ gốc Hy Lạp nào có nghĩa là ngành nghiên cứu tiếng cười và các tác động của nó lên cơ thể? Đó là a) risology, b) gelotology, hay c) comology?",
        "ipaUs": "/ˈaɪ ˈæskt ˈwɪtʃ ˈɡriːk ˈwɜːrd ˈmiːnz ðə ˈstʌdi ˈʌv ˈlæftər ənd ˈɪts ˈɪfekts ˈɑːn ðə ˈbɑːdi ˈɪz ˈɪt ə rɪˈsɑːlədʒi ˈbiː ˌdʒeləˈtɑːlədʒi ˈɔːr ˈsiː kəˈmɑːlədʒi/",
        "keywords": [
            "greek",
            "laughter",
            "effects",
            "body",
            "risology",
            "gelotology",
            "comology"
        ],
        "explanationAi": "Alice nhắc lại câu hỏi và 3 phương án để người nghe kiểm tra lại trí nhớ và đáp án của mình.",
        "properNouns": [
            "Greek"
        ],
        "tokenCount": 25
    },
    {
        "orderIndex": 66,
        "startTime": 313.12,
        "endTime": 319.67,
        "text": "Yes. I said c) comology, which I think I'm beginning to regret now.",
        "translationVi": "Vâng. Tôi đã chọn c) comology, điều mà bây giờ tôi nghĩ mình đang bắt đầu thấy hối hận rồi đấy.",
        "ipaUs": "/ˈjes ˈaɪ ˈsed ˈsiː kəˈmɑːlədʒi ˈwɪtʃ ˈaɪ ˈθɪŋk ˈaɪm ˈbɪɡɪnɪŋ ˈtuː ˈrəɡret ˈnaʊ/",
        "keywords": [
            "comology",
            "regret"
        ],
        "explanationAi": "Neil thừa nhận sự bất an về phán đoán sai lầm ban đầu của mình với động từ 'regret' (hối tiếc).",
        "properNouns": [],
        "tokenCount": 14
    },
    {
        "orderIndex": 67,
        "startTime": 319.68,
        "endTime": 324.63,
        "text": "Yes, well, indeed. Sorry, I'm afraid that's the wrong answer.",
        "translationVi": "Vâng, quả đúng là như vậy rồi. Rất tiếc, tôi e rằng đó là một câu trả lời sai.",
        "ipaUs": "/ˈjes ˈwel ˈɪndiːd ˈsɑːri ˈaɪm ˈəfreɪd ˈðæts ðə ˈrɔːŋ ˈænsər/",
        "keywords": [
            "indeed",
            "afraid",
            "wrong",
            "answer"
        ],
        "explanationAi": "Alice lịch sự xác nhận Neil đã đoán sai bằng cụm từ 'I'm afraid that's the wrong answer'.",
        "properNouns": [],
        "tokenCount": 12
    },
    {
        "orderIndex": 68,
        "startTime": 324.64,
        "endTime": 331.83,
        "text": "It's actually b) gelotology – which comes from the Greek word, gelos, meaning laughter.",
        "translationVi": "Đáp án đúng thực ra là b) gelotology – bắt nguồn từ từ Hy Lạp 'gelos', có nghĩa là tiếng cười.",
        "ipaUs": "/ˈɪts ˈæktʃuːəli ˈbiː ˌdʒeləˈtɑːlədʒi ˈwɪtʃ ˈkʌmz ˈfrʌm ðə ˈɡriːk ˈwɜːrd ˈɡeɪlɑːs ˈmiːnɪŋ ˈlæftər/",
        "keywords": [
            "gelotology",
            "greek",
            "laughter"
        ],
        "explanationAi": "Nguồn gốc từ vựng học (etymology): Gelotology xuất phát từ tiếng Hy Lạp 'gelos' (tiếng cười), là ngành khoa học nghiên cứu tác động thể chất và tâm lý của nụ cười.",
        "properNouns": [
            "Greek",
            "gelos"
        ],
        "tokenCount": 14
    },
    {
        "orderIndex": 69,
        "startTime": 331.84,
        "endTime": 336.07,
        "text": "OK. You can stop sniggering now, Alice and just tell us today's words once again?",
        "translationVi": "Được rồi. Bạn có thể thôi cười khúc khích được rồi đấy Alice, và nhắc lại các từ vựng của ngày hôm nay một lần nữa đi chứ?",
        "ipaUs": "/ˈoʊkeɪ ˈjuː ˈkæn ˈstɑːp ˈsnɪɡərɪŋ ˈnaʊ ˈæləs ənd ˈdʒʌst ˈtel ˈʌs ˈtədeɪz ˈwɜːrdz ˈwʌns ˈəɡen/",
        "keywords": [
            "sniggering",
            "words"
        ],
        "explanationAi": "Động từ 'sniggering' (cười khúc khích mỉa mai). Neil bảo Alice ngừng trêu chọc và chuyển sang phần ôn tập từ vựng.",
        "properNouns": [
            "Alice"
        ],
        "tokenCount": 16
    },
    {
        "orderIndex": 70,
        "startTime": 336.08,
        "endTime": 337.19,
        "text": "Alright then. Here they are:",
        "translationVi": "Được thôi. Các từ vựng đó đây:",
        "ipaUs": "/ˈɔːlraɪt ˈðen ˈhiːr ˈðeɪ ˈɑːr/",
        "keywords": [],
        "explanationAi": "Lời dẫn tự nhiên bước vào phần tổng kết 10 từ vựng cốt lõi của bài học.",
        "properNouns": [],
        "tokenCount": 5
    },
    {
        "orderIndex": 71,
        "startTime": 337.2,
        "endTime": 341.59,
        "text": "get something, for example a joke",
        "translationVi": "'get something', ví dụ như hiểu được một câu chuyện đùa",
        "ipaUs": "/ˈɡet ˈsʌmθɪŋ ˈfɔːr ˈɪɡzæmpəl ə ˈdʒoʊk/",
        "keywords": [
            "get",
            "example",
            "joke"
        ],
        "explanationAi": "Thành ngữ khẩu ngữ: 'get something' nghĩa là hiểu được ý tứ hoặc câu chuyện đùa của người khác.",
        "properNouns": [],
        "tokenCount": 6
    },
    {
        "orderIndex": 72,
        "startTime": 341.6,
        "endTime": 343.75,
        "text": "gag",
        "translationVi": "'gag' – mẩu chuyện đùa, trò hề",
        "ipaUs": "/ˈɡæɡ/",
        "keywords": [
            "gag"
        ],
        "explanationAi": "Danh từ ngắn gọn chỉ mẩu tiếu lâm, mảng miếng hài kịch ngắn.",
        "properNouns": [],
        "tokenCount": 1
    },
    {
        "orderIndex": 73,
        "startTime": 343.76,
        "endTime": 347.11,
        "text": "stand-up comedy",
        "translationVi": "'stand-up comedy' – hài độc thoại",
        "ipaUs": "/ˈstænd ʌp ˈkɑːmədi/",
        "keywords": [
            "stand-up comedy"
        ],
        "explanationAi": "Thể loại biểu diễn nghệ thuật kịch nói mà một nghệ sĩ đứng độc thoại trực tiếp với khán giả.",
        "properNouns": [],
        "tokenCount": 3
    },
    {
        "orderIndex": 74,
        "startTime": 347.12,
        "endTime": 349.99,
        "text": "narcissistic",
        "translationVi": "'narcissistic' – tự ái tự tôn, say mê bản thân thái quá",
        "ipaUs": "/ˈnɑːrsɪsɪstɪk/",
        "keywords": [
            "narcissistic"
        ],
        "explanationAi": "Tính từ chỉ người luôn quá bận tâm và ngưỡng mộ ngoại hình hoặc phẩm chất của chính mình.",
        "properNouns": [],
        "tokenCount": 1
    },
    {
        "orderIndex": 75,
        "startTime": 350.0,
        "endTime": 352.87,
        "text": "aspiring",
        "translationVi": "'aspiring' – đầy hoài bão, khát khao vươn lên",
        "ipaUs": "/ˈəspaɪrɪŋ/",
        "keywords": [
            "aspiring"
        ],
        "explanationAi": "Tính từ miêu tả người có ước mơ cháy bỏng và đang nỗ lực đạt được thành công trong sự nghiệp.",
        "properNouns": [],
        "tokenCount": 1
    },
    {
        "orderIndex": 76,
        "startTime": 352.88,
        "endTime": 355.59,
        "text": "unique",
        "translationVi": "'unique' – độc nhất vô nhị, khác biệt đặc trưng",
        "ipaUs": "/ˈjuniːk/",
        "keywords": [
            "unique"
        ],
        "explanationAi": "Tính từ chỉ nét độc đáo, duy nhất và khác biệt của một người hay một vật thể.",
        "properNouns": [],
        "tokenCount": 1
    },
    {
        "orderIndex": 77,
        "startTime": 355.6,
        "endTime": 358.63,
        "text": "perseverance",
        "translationVi": "'perseverance' – sự kiên trì, bền bỉ vượt khó",
        "ipaUs": "/ˈpɜːrsəvɪrəns/",
        "keywords": [
            "perseverance"
        ],
        "explanationAi": "Danh từ chỉ phẩm chất nhẫn nại, kiên định tới cùng trước mọi chướng ngại vật.",
        "properNouns": [],
        "tokenCount": 1
    },
    {
        "orderIndex": 78,
        "startTime": 358.64,
        "endTime": 360.71,
        "text": "outwork",
        "translationVi": "'outwork' – làm việc nỗ lực vượt trên người khác",
        "ipaUs": "/ˌaʊtˈwɜːrk/",
        "keywords": [
            "outwork"
        ],
        "explanationAi": "Động từ chỉ hành động cống hiến thời gian và công sức nhiều hơn hẳn bất kỳ đối thủ nào.",
        "properNouns": [],
        "tokenCount": 1
    },
    {
        "orderIndex": 79,
        "startTime": 360.72,
        "endTime": 362.63,
        "text": "introverts",
        "translationVi": "'introverts' – những người hướng nội",
        "ipaUs": "/introverts/",
        "keywords": [
            "introverts"
        ],
        "explanationAi": "Danh từ chỉ nhóm người trầm tĩnh, thích hướng vào thế giới nội tâm cá nhân.",
        "properNouns": [],
        "tokenCount": 1
    },
    {
        "orderIndex": 80,
        "startTime": 362.64,
        "endTime": 364.71,
        "text": "extroverts",
        "translationVi": "'extroverts' – những người hướng ngoại",
        "ipaUs": "/extroverts/",
        "keywords": [
            "extroverts"
        ],
        "explanationAi": "Danh từ chỉ nhóm người sôi nổi, hoạt bát, thích giao du và tương tác xã hội.",
        "properNouns": [],
        "tokenCount": 1
    },
    {
        "orderIndex": 81,
        "startTime": 364.72,
        "endTime": 368.31,
        "text": "Well, that just about brings us to the end of today's 6 Minute English.",
        "translationVi": "Chà, điều đó xem như đã đưa chúng ta đến hồi kết của chương trình 6 Minute English hôm nay rồi.",
        "ipaUs": "/ˈwel ˈðæt ˈdʒʌst ˈəbaʊt ˈbrɪŋz ˈʌs ˈtuː ðə ˈend ˈʌv ˈtədeɪz 6 ˈmɪnət ˈɪŋɡlɪʃ/",
        "keywords": [
            "brings",
            "minute",
            "english"
        ],
        "explanationAi": "Cụm câu kết chương trình: 'brings us to the end of today's programme'.",
        "properNouns": [
            "6 Minute English"
        ],
        "tokenCount": 15
    },
    {
        "orderIndex": 82,
        "startTime": 368.32,
        "endTime": 370.0,
        "text": "See you next time.",
        "translationVi": "Hẹn gặp lại các bạn vào lần tới.",
        "ipaUs": "/ˈsiː ˈjuː ˈnekst ˈtaɪm/",
        "keywords": [
            "see",
            "time"
        ],
        "explanationAi": "Lời chào tạm biệt và hẹn gặp lại thính giả trong các số phát sóng tiếp theo.",
        "properNouns": [],
        "tokenCount": 4
    },
    {
        "orderIndex": 83,
        "startTime": 370.0,
        "endTime": 371.03,
        "text": "Bye.",
        "translationVi": "Tạm biệt.",
        "ipaUs": "/ˈbaɪ/",
        "keywords": [],
        "explanationAi": "Lời chào tạm biệt ngắn gọn kết thúc buổi ghi hình của Alice và Neil.",
        "properNouns": [],
        "tokenCount": 1
    },
    {
        "orderIndex": 84,
        "startTime": 371.04,
        "endTime": 374.0,
        "text": "6 Minute English from the BBC.",
        "translationVi": "Chương trình 6 Minute English từ đài BBC.",
        "ipaUs": "/6 ˈmɪnət ˈɪŋɡlɪʃ ˈfrʌm ðə ˌbiː biː ˈsiː/",
        "keywords": [
            "minute",
            "english",
            "bbc"
        ],
        "explanationAi": "Đoạn nhạc hiệu bản quyền thương hiệu đài phát thanh BBC London.",
        "properNouns": [
            "6 Minute English",
            "BBC"
        ],
        "tokenCount": 6
    }
]
};
