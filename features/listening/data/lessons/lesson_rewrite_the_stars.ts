import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for Rewrite The Stars
 * 8 in-depth analytical questions based 100% on lyrics, rhetoric, character conflict, and social subtext.
 */
export const QUIZ_REWRITE_THE_STARS: VideoQuizData = {
  lessonId: "ff4c64b7-ea82-4963-a4f6-1ff808d929e6",
  lessonTitle: "Anne-Marie & James Arthur: Rewrite The Stars (The Greatest Showman)",
  totalQuestions: 8,
  xpReward: 40,
  questions: [
    {
      id: "q_rewrite_the_stars_1",
      question: "What does the singer imply when challenging the statement 'our hands are tied' in the opening verse?",
      questionEn: "What does the singer imply when challenging the statement 'our hands are tied' in the opening verse?",
      questionVi: "Người hát ngụ ý điều gì khi phản bác lại câu nói 'our hands are tied' (tay chúng ta bị trói buộc) ở đoạn mở đầu?",
      options: [
        "He urges her not to use feeling powerless or external circumstances as an excuse to avoid being together.",
        "He literally complains that their hands are bound with physical ropes during the performance.",
        "He admits that they have signed an unbreakable legal contract with the circus manager.",
        "He suggests that they should give up trying because their families strongly oppose the relationship.",
      ],
      optionsEn: [
        "He urges her not to use feeling powerless or external circumstances as an excuse to avoid being together.",
        "He literally complains that their hands are bound with physical ropes during the performance.",
        "He admits that they have signed an unbreakable legal contract with the circus manager.",
        "He suggests that they should give up trying because their families strongly oppose the relationship.",
      ],
      optionsVi: [
        "Anh thúc giục cô đừng lấy cảm giác bất lực hay hoàn cảnh bên ngoài làm cái cớ để trốn tránh việc đến với nhau.",
        "Anh thực sự phàn nàn rằng tay họ đang bị trói bằng dây thừng thật trong buổi biểu diễn xiếc.",
        "Anh thừa nhận rằng họ đã ký một hợp đồng pháp lý không thể hủy bỏ với người quản lý gánh xiếc.",
        "Anh gợi ý rằng họ nên bỏ cuộc vì gia đình hai bên kịch liệt phản đối mối quan hệ này.",
      ],
      correctAnswer: 0,
      explanation: 'In Segment 2: "You know you want me, so don\'t keep saying our hands are tied." The idiom "hands are tied" means unable to act freely due to rules or constraints. The singer rejects this helplessness.',
      explanationEn: 'In Segment 2: "You know you want me, so don\'t keep saying our hands are tied." The idiom "hands are tied" means unable to act freely due to rules or constraints. The singer rejects this helplessness.',
      explanationVi: 'Trong câu 2: "You know you want me, so don\'t keep saying our hands are tied." Thành ngữ "hands are tied" chỉ sự bất lực không thể hành động do quy tắc hay hoàn cảnh ràng buộc. Người hát từ chối chấp nhận sự bất lực này.',
      referenceSegmentIndex: 1,
      targetedConcept: "Thành ngữ: Hands are tied (Bất lực do hoàn cảnh)",
      targetedConceptEn: "Idiom: Hands are tied",
      targetedConceptVi: "Thành ngữ: Hands are tied (Bất lực do hoàn cảnh)",
    },
    {
      id: "q_rewrite_the_stars_2",
      question: "In the lines 'You claim it's not in the cards, and fate is pulling you miles away', what does the idiom 'not in the cards' mean?",
      questionEn: "In the lines 'You claim it's not in the cards, and fate is pulling you miles away', what does the idiom 'not in the cards' mean?",
      questionVi: "Trong câu hát 'You claim it's not in the cards, and fate is pulling you miles away', thành ngữ 'not in the cards' mang ý nghĩa gì?",
      options: [
        "Playing card games is strictly forbidden in their circus community.",
        "Something is unlikely or never meant to happen according to destiny or fortune.",
        "They lost all their travel cards and tickets to leave the city together.",
        "The predictions in their horoscope were surprisingly accurate.",
      ],
      optionsEn: [
        "Playing card games is strictly forbidden in their circus community.",
        "Something is unlikely or never meant to happen according to destiny or fortune.",
        "They lost all their travel cards and tickets to leave the city together.",
        "The predictions in their horoscope were surprisingly accurate.",
      ],
      optionsVi: [
        "Việc chơi các trò chơi bài bị nghiêm cấm trong cộng đồng gánh xiếc của họ.",
        "Điều gì đó khó có thể xảy ra hoặc không được số phận định đoạt / an bài.",
        "Họ đã làm mất toàn bộ vé xe và thẻ đi lại để cùng nhau rời khỏi thành phố.",
        "Những lời tiên đoán trong lá số tử vi của họ hóa ra lại chuẩn xác đến bất ngờ.",
      ],
      correctAnswer: 1,
      explanation: 'In Segment 3: "You claim it\'s not in the cards." The idiom "in the cards" originates from tarot fortune-telling and means predetermined or possible. Saying "it\'s not in the cards" means it is impossible according to destiny.',
      explanationEn: 'In Segment 3: "You claim it\'s not in the cards." The idiom "in the cards" originates from tarot fortune-telling and means predetermined or possible. Saying "it\'s not in the cards" means it is impossible according to destiny.',
      explanationVi: 'Trong câu 3: "You claim it\'s not in the cards." Thành ngữ "in the cards" bắt nguồn từ bói bài tarot, nghĩa là điều gì đó đã được an bài hoặc có khả năng xảy ra. Phủ định "not in the cards" nghĩa là điều không thể xảy ra theo số phận.',
      referenceSegmentIndex: 2,
      targetedConcept: "Thành ngữ: Not in the cards (Không thể xảy ra / Không được số phận an bài)",
      targetedConceptEn: "Idiom: Not in the cards",
      targetedConceptVi: "Thành ngữ: Not in the cards (Không thể xảy ra / Không được số phận an bài)",
    },
    {
      id: "q_rewrite_the_stars_3",
      question: "What is the central metaphorical meaning of the chorus theme 'rewrite the stars'?",
      questionEn: "What is the central metaphorical meaning of the chorus theme 'rewrite the stars'?",
      questionVi: "Ý nghĩa ẩn dụ cốt lõi của chủ đề điệp khúc 'rewrite the stars' (viết lại những vì sao) là gì?",
      options: [
        "Studying modern astronomy to discover and name newly observed constellations.",
        "Rewriting the script of the circus acrobatics show before the evening premiere.",
        "Actively defying predetermined destiny and societal constraints to choose their own future together.",
        "Painting bright glowing stars onto the ceiling of the theatre to create a romantic atmosphere.",
      ],
      optionsEn: [
        "Studying modern astronomy to discover and name newly observed constellations.",
        "Rewriting the script of the circus acrobatics show before the evening premiere.",
        "Actively defying predetermined destiny and societal constraints to choose their own future together.",
        "Painting bright glowing stars onto the ceiling of the theatre to create a romantic atmosphere.",
      ],
      optionsVi: [
        "Nghiên cứu thiên văn học hiện đại để khám phá và đặt tên cho các chòm sao mới quan sát được.",
        "Viết lại kịch bản cho tiết mục nhào lộn xiếc trước buổi công diễn buổi tối.",
        "Chủ động thách thức số phận an bài và các rào cản định kiến xã hội để tự định đoạt tương lai bên nhau.",
        "Vẽ những ngôi sao phát sáng lên trần nhà hát để tạo bầu không khí lãng mạn.",
      ],
      correctAnswer: 2,
      explanation: 'In Segment 7: "What if we rewrite the stars?" The "stars" metaphor refers to astrological fate written across the cosmos. "Rewriting" them signifies human agency overcoming destiny and societal prejudice.',
      explanationEn: 'In Segment 7: "What if we rewrite the stars?" The "stars" metaphor refers to astrological fate written across the cosmos. "Rewriting" them signifies human agency overcoming destiny and societal prejudice.',
      explanationVi: 'Trong câu 7: "What if we rewrite the stars?" Ẩn dụ "những vì sao" ám chỉ số mệnh chiêm tinh được an bài trên bầu trời vũ trụ. "Viết lại các vì sao" tượng trưng cho quyền tự quyết của con người vượt qua định mệnh và định kiến xã hội.',
      referenceSegmentIndex: 6,
      targetedConcept: "Ẩn dụ nghệ thuật: Rewrite the stars (Tự định đoạt số phận)",
      targetedConceptEn: "Metaphor: Rewrite the stars",
      targetedConceptVi: "Ẩn dụ nghệ thuật: Rewrite the stars (Tự định đoạt số phận)",
    },
    {
      id: "q_rewrite_the_stars_4",
      question: "Why does the singer use hypothetical subjunctive constructions like 'Say you were made to be mine' and 'You'd be the one I was meant to find'?",
      questionEn: "Why does the singer use hypothetical subjunctive constructions like 'Say you were made to be mine' and 'You'd be the one I was meant to find'?",
      questionVi: "Tại sao người hát sử dụng cấu trúc giả định điều kiện như 'Say you were made to be mine' và 'You'd be the one I was meant to find'?",
      options: [
        "To imagine an ideal reality where no social barriers exist and their love is natural and destined.",
        "To express deep regret that they have never actually met each other in person.",
        "To question whether they truly have romantic feelings toward one another.",
        "To declare that their romantic relationship has officially ended forever.",
      ],
      optionsEn: [
        "To imagine an ideal reality where no social barriers exist and their love is natural and destined.",
        "To express deep regret that they have never actually met each other in person.",
        "To question whether they truly have romantic feelings toward one another.",
        "To declare that their romantic relationship has officially ended forever.",
      ],
      optionsVi: [
        "Để tưởng tượng về một thực tại lý tưởng nơi không còn rào cản xã hội và tình yêu của họ là tự nhiên và tiền định.",
        "Để bày tỏ sự hối tiếc sâu sắc vì hai người chưa từng gặp mặt nhau ngoài đời thực.",
        "Để hoài nghi xem liệu hai người có thực sự nảy sinh tình cảm lãng mạn với nhau hay không.",
        "Để tuyên bố rằng mối quan hệ tình cảm của họ đã chính thức kết thúc vĩnh viễn.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 8-10: "Say you were made to be mine? Nothing could keep us apart, you\'d be the one I was meant to find." The speaker uses conditional structures to construct a parallel ideal world free of prejudice.',
      explanationEn: 'In Segments 8-10: "Say you were made to be mine? Nothing could keep us apart, you\'d be the one I was meant to find." The speaker uses conditional structures to construct a parallel ideal world free of prejudice.',
      explanationVi: 'Trong các câu 8-10: "Say you were made to be mine? Nothing could keep us apart, you\'d be the one I was meant to find." Người hát dùng các cấu trúc điều kiện giả định để phác họa một thế giới lý tưởng không còn rào cản định kiến.',
      referenceSegmentIndex: 7,
      targetedConcept: "Ngữ pháp: Cấu trúc giả định điều kiện loại 2 (Hypothetical Conditionals)",
      targetedConceptEn: "Grammar: Hypothetical Conditionals",
      targetedConceptVi: "Ngữ pháp: Cấu trúc giả định điều kiện loại 2",
    },
    {
      id: "q_rewrite_the_stars_5",
      question: "In the line 'It's up to you, and it's up to me, no one can say what we get to be', what message is being conveyed?",
      questionEn: "In the line 'It's up to you, and it's up to me, no one can say what we get to be', what message is being conveyed?",
      questionVi: "Trong câu hát 'It's up to you, and it's up to me, no one can say what we get to be', thông điệp nào đang được truyền tải?",
      options: [
        "They need to ask the city council for official permission to stay together.",
        "Both individuals hold the ultimate power of choice over their lives, rather than society's prejudices.",
        "Neither of them wants to take responsibility for making decisions about their future career.",
        "Other people have complete legal authority to decide who they can marry.",
      ],
      optionsEn: [
        "They need to ask the city council for official permission to stay together.",
        "Both individuals hold the ultimate power of choice over their lives, rather than society's prejudices.",
        "Neither of them wants to take responsibility for making decisions about their future career.",
        "Other people have complete legal authority to decide who they can marry.",
      ],
      optionsVi: [
        "Họ cần phải xin phép chính quyền thành phố để có thể được ở bên nhau.",
        "Cả hai cá nhân đều nắm giữ quyền năng tối thượng tự quyết định đời mình, thay vì để định kiến xã hội phán xét.",
        "Cả hai người đều không muốn chịu trách nhiệm đưa ra quyết định về sự nghiệp tương lai.",
        "Những người khác có toàn quyền pháp lý để quyết định xem họ được phép kết hôn với ai.",
      ],
      correctAnswer: 1,
      explanation: 'In Segments 11 & 12: "It\'s up to you, and it\'s up to me, no one can say what we get to be." The phrase "up to someone" asserts personal autonomy and defiance against third-party judgment.',
      explanationEn: 'In Segments 11 & 12: "It\'s up to you, and it\'s up to me, no one can say what we get to be." The phrase "up to someone" asserts personal autonomy and defiance against third-party judgment.',
      explanationVi: 'Trong câu 11 & 12: "It\'s up to you, and it\'s up to me, no one can say what we get to be." Cụm từ "up to someone" khẳng định quyền tự chủ cá nhân và sự bất tuân trước phán xét của xã hội bên ngoài.',
      referenceSegmentIndex: 10,
      targetedConcept: "Cụm từ: It's up to someone (Quyền tự quyết định)",
      targetedConceptEn: "Phrase: It's up to someone",
      targetedConceptVi: "Cụm từ: It's up to someone (Quyền tự quyết định)",
    },
    {
      id: "q_rewrite_the_stars_6",
      question: "How does the tone and perspective shift when Anne-Marie enters in Segment 15 with 'You think it's easy, you think I don't want to run to you'?",
      questionEn: "How does the tone and perspective shift when Anne-Marie enters in Segment 15 with 'You think it's easy, you think I don't want to run to you'?",
      questionVi: "Tông giọng và góc nhìn thay đổi như thế nào khi Anne-Marie cất giọng ở câu 15 với 'You think it's easy, you think I don't want to run to you'?",
      options: [
        "She brings a grounded, painful reality check, revealing that she desperately wants him but cannot ignore harsh social divides.",
        "She expresses total indifference and says she has fallen in love with someone else outside the circus.",
        "She happily accepts his invitation and promises that they will run away together without hesitation.",
        "She complains about how physically exhausting the circus acrobatics routine has become.",
      ],
      optionsEn: [
        "She brings a grounded, painful reality check, revealing that she desperately wants him but cannot ignore harsh social divides.",
        "She expresses total indifference and says she has fallen in love with someone else outside the circus.",
        "She happily accepts his invitation and promises that they will run away together without hesitation.",
        "She complains about how physically exhausting the circus acrobatics routine has become.",
      ],
      optionsVi: [
        "Cô mang đến góc nhìn hiện thực đau đớn, hé lộ rằng cô rất khao khát đến với anh nhưng không thể phớt lờ rào cản xã hội khắc nghiệt.",
        "Cô tỏ ra hoàn toàn thờ ơ và nói rằng mình đã đem lòng yêu một người khác bên ngoài rạp xiếc.",
        "Cô vui vẻ chấp nhận lời đề nghị và hứa rằng họ sẽ cùng nhau bỏ trốn ngay lập tức mà không do dự.",
        "Cô phàn nàn về việc các bài tập nhào lộn xiếc đã trở nên quá mệt mỏi về thể xác.",
      ],
      correctAnswer: 0,
      explanation: 'In Segment 15: "You think it\'s easy, you think I don\'t want to run to you, yeah." Anne-Marie grounds Phillip\'s idealistic optimism in the harsh emotional reality of systemic social inequality.',
      explanationEn: 'In Segment 15: "You think it\'s easy, you think I don\'t want to run to you, yeah." Anne-Marie grounds Phillip\'s idealistic optimism in the harsh emotional reality of systemic social inequality.',
      explanationVi: 'Trong câu 15: "You think it\'s easy, you think I don\'t want to run to you, yeah." Anne-Marie kéo sự lạc quan lý tưởng của Phillip trở về với thực tại đau đớn của sự bất bình đẳng xã hội.',
      referenceSegmentIndex: 14,
      targetedConcept: "Phân tích diễn biến tâm lý & Đối thoại kịch tính (Dramatic Dialogue & Perspective Shift)",
      targetedConceptEn: "Dramatic Dialogue & Perspective Shift",
      targetedConceptVi: "Phân tích diễn biến tâm lý & Đối thoại kịch tính",
    },
    {
      id: "q_rewrite_the_stars_7",
      question: "What do the 'mountains' and 'doors that we can't walk through' symbolize in Anne-Marie's verse?",
      questionEn: "What do the 'mountains' and 'doors that we can't walk through' symbolize in Anne-Marie's verse?",
      questionVi: "Hình ảnh 'mountains' (những ngọn núi) và 'doors that we can't walk through' (những cánh cửa không thể bước qua) tượng trưng cho điều gì trong lời hát của Anne-Marie?",
      options: [
        "The steep Rocky Mountains that separate their home cities on the map.",
        "The locked stage exits that trapped performers inside during a circus fire.",
        "The formidable barriers of social class hierarchy, systemic racism, and societal segregation of the era.",
        "Physical fitness challenges required to perform high-flying aerial trapeze stunts.",
      ],
      optionsEn: [
        "The steep Rocky Mountains that separate their home cities on the map.",
        "The locked stage exits that trapped performers inside during a circus fire.",
        "The formidable barriers of social class hierarchy, systemic racism, and societal segregation of the era.",
        "Physical fitness challenges required to perform high-flying aerial trapeze stunts.",
      ],
      optionsVi: [
        "Dãy núi Rocky hiểm trở ngăn cách thành phố quê hương của hai người trên bản đồ.",
        "Những lối thoát hiểm bị khóa chặt đã giam các diễn viên bên trong khi rạp xiếc bốc cháy.",
        "Những rào cản ghê gớm về đẳng cấp giai tầng, phân biệt chủng tộc có hệ thống và sự chia rẽ xã hội của thời đại.",
        "Những thử thách về thể lực cần thiết để thực hiện các pha nhào lộn đu dây trên không.",
      ],
      correctAnswer: 2,
      explanation: 'In Segment 16: "But there are mountains, and there are doors that we can\'t walk through." In 19th-century society, class divides and racial segregation were insurmountable barriers for interracial or inter-class couples.',
      explanationEn: 'In Segment 16: "But there are mountains, and there are doors that we can\'t walk through." In 19th-century society, class divides and racial segregation were insurmountable barriers for interracial or inter-class couples.',
      explanationVi: 'Trong câu 16: "But there are mountains, and there are doors that we can\'t walk through." Trong xã hội thế kỷ 19, rào cản giai cấp và nạn phân biệt chủng tộc là những cánh cửa đóng chặt không thể vượt qua đối với các cặp đôi khác tầng lớp hoặc sắc tộc.',
      referenceSegmentIndex: 15,
      targetedConcept: "Ẩn dụ biểu tượng: Mountains & Locked Doors (Rào cản giai cấp & Chủng tộc)",
      targetedConceptEn: "Symbolic Metaphors: Mountains & Locked Doors",
      targetedConceptVi: "Ẩn dụ biểu tượng: Mountains & Locked Doors (Rào cản giai cấp & Chủng tộc)",
    },
    {
      id: "q_rewrite_the_stars_8",
      question: "Why does Anne-Marie conclude that their love is possible only 'within these walls' but 'hopeless after all' when they go outside?",
      questionEn: "Why does Anne-Marie conclude that their love is possible only 'within these walls' but 'hopeless after all' when they go outside?",
      questionVi: "Tại sao Anne-Marie kết luận rằng tình yêu của họ chỉ có thể tồn tại 'trong bốn bức tường này' nhưng lại là 'vô vọng' khi bước ra thế giới bên ngoài?",
      options: [
        "Because the circus acts as a protective bubble, whereas the outside world will judge and tear them apart with prejudice.",
        "Because the weather outside is too cold and rainy to go on a romantic date.",
        "Because they only have legal circus work permits and are forbidden from leaving the tent building.",
        "Because she believes James Arthur is a dishonest person who will abandon her immediately.",
      ],
      optionsEn: [
        "Because the circus acts as a protective bubble, whereas the outside world will judge and tear them apart with prejudice.",
        "Because the weather outside is too cold and rainy to go on a romantic date.",
        "Because they only have legal circus work permits and are forbidden from leaving the tent building.",
        "Because she believes James Arthur is a dishonest person who will abandon her immediately.",
      ],
      optionsVi: [
        "Bởi vì rạp xiếc đóng vai trò như một bong bóng bảo vệ an toàn, trong khi thế giới bên ngoài sẽ phán xét và xé nát họ bằng định kiến.",
        "Bởi vì thời tiết ngoài trời quá lạnh giá và mưa gió để có thể có một buổi hẹn hò lãng mạn.",
        "Bởi vì họ chỉ có giấy phép lao động xiếc và bị cấm không được rời khỏi khuôn viên lều rạp.",
        "Bởi vì cô tin rằng James Arthur là người không thật lòng và sẽ bỏ rơi cô ngay khi bước ra ngoài.",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 17 & 18: "...because we\'re able to be just you and me within these walls. But when we go outside, you\'re gonna wake up and see that it was hopeless after all." The circus tent allows an illusion of equality, but the outside world enforces rigid societal judgment.',
      explanationEn: 'In Segments 17 & 18: "...because we\'re able to be just you and me within these walls. But when we go outside, you\'re gonna wake up and see that it was hopeless after all." The circus tent allows an illusion of equality, but the outside world enforces rigid societal judgment.',
      explanationVi: 'Trong các câu 17 & 18: "...because we\'re able to be just you and me within these walls. But when we go outside, you\'re gonna wake up and see that it was hopeless after all." Lều rạp xiếc tạo ra không gian riêng tư bình đẳng, nhưng bước ra thế giới bên ngoài sẽ đối diện với những phán xét định kiến tàn nhẫn.',
      referenceSegmentIndex: 16,
      targetedConcept: "Phân tích không gian đối lập: Trong bong bóng rạp xiếc vs Thế giới định kiến bên ngoài",
      targetedConceptEn: "Contrasting Spaces: Safe Bubble vs Harsh Reality",
      targetedConceptVi: "Phân tích không gian đối lập: Trong bong bóng rạp xiếc vs Thế giới định kiến bên ngoài",
    },
  ],
  generatedBy: "CONTEXTUAL_FALLBACK",
};

/**
 * Rewrite The Stars
 * Slug: anne-marie-rewrite-the-stars
 */
export const LESSON_REWRITE_THE_STARS: MockVideoLesson = {
  "id": "ff4c64b7-ea82-4963-a4f6-1ff808d929e6",
  "slug": "anne-marie-rewrite-the-stars",
  "title": "Anne-Marie & James Arthur: Rewrite The Stars (The Greatest Showman)",
  "description": "Luyện nghe và chép chính tả qua ca khúc nhạc phim kinh điển \"Rewrite The Stars\" (The Greatest Showman: Reimagined) qua giọng ca đầy nội lực của James Arthur và Anne-Marie. Học cách nối âm tự nhiên, thành ngữ tình yêu và cấu trúc giả định.",
  "sourceType": "YOUTUBE",
  "externalId": "pRfmrE0ToTo",
  "thumbnailUrl": "https://img.youtube.com/vi/pRfmrE0ToTo/hqdefault.jpg",
  "durationSeconds": 105,
  "durationFormatted": "01:45",
  "cefrLevel": "B1",
  "supportedTypes": "BOTH",
  "categoryId": "cat_stories_culture",
  "categorySlug": "stories-culture",
  "categoryName": "Câu Chuyện & Văn Hóa",
  "accent": "en-US",
  "wpmSpeed": 120,
  "viewCount": 3950,
  "studyCount": 1420,
  "quiz": QUIZ_REWRITE_THE_STARS,
  "segments": [
    {
      "orderIndex": 1,
      "startTime": 0.8,
      "endTime": 8.8,
      "text": "You know I want you, it's not a secret I try to hide.",
      "normalizedText": "you know i want you its not a secret i try to hide",
      "ipaUs": "juː noʊ aɪ wɑːnt juː ɪts nɑːt ə ˈsiːkrət aɪ traɪ tuː haɪd",
      "translationVi": "Em biết rằng anh muốn có em, đó không phải là bí mật mà anh cố che giấu.",
      "explanationAi": "Cụm 'it's not a secret' (không phải là bí mật / ai cũng biết) và động từ nguyên mẫu 'try to hide' (cố gắng giấu giếm).",
      "properNouns": [],
      "keywords": [
        "secret",
        "hide",
        "want"
      ],
      "tokenCount": 13
    },
    {
      "orderIndex": 2,
      "startTime": 8.9,
      "endTime": 16.5,
      "text": "You know you want me, so don't keep saying our hands are tied.",
      "normalizedText": "you know you want me so dont keep saying our hands are tied",
      "ipaUs": "juː noʊ juː wɑːnt miː soʊ doʊnt kiːp ˈseɪɪŋ ˈaʊər hændz ɑːr taɪd",
      "translationVi": "Em biết em cũng muốn có anh, vậy nên đừng mãi nói rằng đôi tay chúng ta bị trói buộc.",
      "explanationAi": "Thành ngữ tiếng Anh kinh điển 'hands are tied' (bị trói tay / bất lực không thể làm gì) kết hợp cấu trúc 'keep doing something' (cứ liên tục làm gì).",
      "properNouns": [],
      "keywords": [
        "hands are tied",
        "keep saying"
      ],
      "tokenCount": 13
    },
    {
      "orderIndex": 3,
      "startTime": 16.5,
      "endTime": 19.2,
      "text": "You claim it's not in the cards,",
      "normalizedText": "you claim its not in the cards",
      "ipaUs": "juː kleɪm ɪts nɑːt ɪn ðə kɑːrdz",
      "translationVi": "Em khẳng định điều đó không nằm trong những lá bài số phận,",
      "explanationAi": "Thành ngữ 'not in the cards' (không thể xảy ra / không được số phận sắp đặt, bắt nguồn từ bói bài Tarot).",
      "properNouns": [],
      "keywords": [
        "claim",
        "not in the cards"
      ],
      "tokenCount": 7
    },
    {
      "orderIndex": 4,
      "startTime": 19.2,
      "endTime": 24.8,
      "text": "And fate is pulling you miles away and out of reach from me.",
      "normalizedText": "and fate is pulling you miles away and out of reach from me",
      "ipaUs": "ænd feɪt ɪz ˈpʊlɪŋ juː maɪlz əˈweɪ ænd aʊt ʌv riːtʃ frəm miː",
      "translationVi": "Và số phận đang kéo em xa hàng dặm, vượt khỏi tầm với của anh.",
      "explanationAi": "Danh từ 'fate' (định mệnh/số phận), cụm 'miles away' (xa xôi) và thành ngữ 'out of reach' (ngoài tầm với).",
      "properNouns": [],
      "keywords": [
        "fate",
        "miles away",
        "out of reach"
      ],
      "tokenCount": 13
    },
    {
      "orderIndex": 5,
      "startTime": 24.8,
      "endTime": 26.6,
      "text": "But you're here in my heart,",
      "normalizedText": "but youre here in my heart",
      "ipaUs": "bʌt jʊr hɪr ɪn maɪ hɑːrt",
      "translationVi": "Nhưng em vẫn luôn ở đây, trong trái tim anh,",
      "explanationAi": "Lời bày tỏ tình cảm chân thành 'here in my heart' (luôn ngự trị trong tim).",
      "properNouns": [],
      "keywords": [
        "here",
        "heart"
      ],
      "tokenCount": 6
    },
    {
      "orderIndex": 6,
      "startTime": 26.6,
      "endTime": 33.2,
      "text": "So who can stop me if I decide that you're my destiny?",
      "normalizedText": "so who can stop me if i decide that youre my destiny",
      "ipaUs": "soʊ huː kæn stɑːp miː ɪf aɪ dɪˈsaɪd ðæt jʊr maɪ ˈdɛstəni",
      "translationVi": "Vậy thì ai có thể ngăn cản anh nếu anh quyết định rằng em là định mệnh của cuộc đời mình?",
      "explanationAi": "Danh từ 'destiny' (định mệnh/vận mệnh) và cấu trúc câu hỏi hùng biện 'who can stop me if...?'",
      "properNouns": [],
      "keywords": [
        "stop",
        "decide",
        "destiny"
      ],
      "tokenCount": 12
    },
    {
      "orderIndex": 7,
      "startTime": 33.2,
      "endTime": 38.2,
      "text": "What if we rewrite the stars?",
      "normalizedText": "what if we rewrite the stars",
      "ipaUs": "wʌt ɪf wiː ˌriːˈraɪt ðə stɑːrz",
      "translationVi": "Sẽ ra sao nếu chúng ta viết lại những vì sao định mệnh?",
      "explanationAi": "Cụm chủ đề bài hát 'rewrite the stars' (viết lại số phận định sẵn bởi các vì sao) với cấu trúc giả định 'What if...?'.",
      "properNouns": [],
      "keywords": [
        "rewrite",
        "stars",
        "what if"
      ],
      "tokenCount": 6
    },
    {
      "orderIndex": 8,
      "startTime": 38.2,
      "endTime": 43.3,
      "text": "Say you were made to be mine?",
      "normalizedText": "say you were made to be mine",
      "ipaUs": "seɪ juː wɜːr meɪd tuː biː maɪn",
      "translationVi": "Hãy nói rằng em sinh ra là để dành cho anh?",
      "explanationAi": "Cấu trúc định mệnh 'made to be mine' (sinh ra để thuộc về nhau).",
      "properNouns": [],
      "keywords": [
        "made to be mine"
      ],
      "tokenCount": 7
    },
    {
      "orderIndex": 9,
      "startTime": 43.3,
      "endTime": 48.4,
      "text": "Nothing could keep us apart,",
      "normalizedText": "nothing could keep us apart",
      "ipaUs": "ˈnʌθɪŋ kʊd kiːp ʌs əˈpɑːrt",
      "translationVi": "Sẽ chẳng có điều gì có thể chia lìa chúng ta,",
      "explanationAi": "Cụm động từ 'keep apart' (chia cắt/ngăn cách hai người).",
      "properNouns": [],
      "keywords": [
        "nothing",
        "keep apart"
      ],
      "tokenCount": 5
    },
    {
      "orderIndex": 10,
      "startTime": 48.4,
      "endTime": 53.6,
      "text": "You'd be the one I was meant to find.",
      "normalizedText": "youd be the one i was meant to find",
      "ipaUs": "juːd biː ðə wʌn aɪ wʌz mɛnt tuː faɪnd",
      "translationVi": "Em sẽ là người duy nhất mà anh được sinh ra để tìm kiếm.",
      "explanationAi": "Cấu trúc 'meant to find' (được định mệnh an bài để tìm thấy).",
      "properNouns": [],
      "keywords": [
        "meant to find"
      ],
      "tokenCount": 9
    },
    {
      "orderIndex": 11,
      "startTime": 53.6,
      "endTime": 59,
      "text": "It's up to you, and it's up to me,",
      "normalizedText": "its up to you and its up to me",
      "ipaUs": "ɪts ʌp tuː juː ænd ɪts ʌp tuː miː",
      "translationVi": "Tất cả là do em, và tất cả là do anh quyết định,",
      "explanationAi": "Thành ngữ 'it's up to someone' (tùy thuộc vào ai / do ai quyết định).",
      "properNouns": [],
      "keywords": [
        "up to you",
        "up to me"
      ],
      "tokenCount": 9
    },
    {
      "orderIndex": 12,
      "startTime": 59,
      "endTime": 64.5,
      "text": "No one can say what we get to be.",
      "normalizedText": "no one can say what we get to be",
      "ipaUs": "noʊ wʌn kæn seɪ wʌt wiː ɡɛt tuː biː",
      "translationVi": "Không một ai có quyền phán xét chúng ta sẽ trở thành ai.",
      "explanationAi": "Cụm 'get to be' (có cơ hội/quyền được trở thành).",
      "properNouns": [],
      "keywords": [
        "no one",
        "get to be"
      ],
      "tokenCount": 9
    },
    {
      "orderIndex": 13,
      "startTime": 64.5,
      "endTime": 69.8,
      "text": "So why don't we rewrite the stars?",
      "normalizedText": "so why dont we rewrite the stars",
      "ipaUs": "soʊ waɪ doʊnt wiː ˌriːˈraɪt ðə stɑːrz",
      "translationVi": "Vậy tại sao chúng ta không cùng nhau viết lại những vì sao?",
      "explanationAi": "Câu gợi ý đầy nhiệt huyết 'Why don't we...?' kết hợp 'rewrite the stars'.",
      "properNouns": [],
      "keywords": [
        "why don't we",
        "rewrite the stars"
      ],
      "tokenCount": 7
    },
    {
      "orderIndex": 14,
      "startTime": 69.8,
      "endTime": 74,
      "text": "Maybe the world could be ours tonight.",
      "normalizedText": "maybe the world could be ours tonight",
      "ipaUs": "ˈmeɪbi ðə wɜːrld kʊd biː ˈaʊərz təˈnaɪt",
      "translationVi": "Có lẽ cả thế giới này có thể thuộc về đôi ta đêm nay.",
      "explanationAi": "Đại từ sở hữu 'ours' (thuộc về chúng ta) và trạng từ 'tonight'.",
      "properNouns": [],
      "keywords": [
        "maybe",
        "world",
        "ours",
        "tonight"
      ],
      "tokenCount": 7
    },
    {
      "orderIndex": 15,
      "startTime": 74,
      "endTime": 81.5,
      "text": "You think it's easy, you think I don't want to run to you, yeah.",
      "normalizedText": "you think its easy you think i dont want to run to you yeah",
      "ipaUs": "juː θɪŋk ɪts ˈiːzi juː θɪŋk aɪ doʊnt wɑːnt tuː rʌn tuː juː jɛə",
      "translationVi": "Anh nghĩ điều đó dễ dàng sao, anh nghĩ em không muốn chạy ngay đến bên anh ư, đúng thế.",
      "explanationAi": "Lời hát của Anne-Marie thể hiện sự giằng xé nội tâm: cụm 'run to you' (chạy về phía ai).",
      "properNouns": [],
      "keywords": [
        "easy",
        "run to you"
      ],
      "tokenCount": 14
    },
    {
      "orderIndex": 16,
      "startTime": 81.5,
      "endTime": 88.5,
      "text": "But there are mountains, and there are doors that we can't walk through.",
      "normalizedText": "but there are mountains and there are doors that we cant walk through",
      "ipaUs": "bʌt ðɛr ɑːr ˈmaʊntənz ænd ðɛr ɑːr dɔːrz ðæt wiː kænt wɔːk θruː",
      "translationVi": "Nhưng có những ngọn núi rào cản, và có những cánh cửa mà chúng ta không thể bước qua.",
      "explanationAi": "Ẩn dụ về rào cản xã hội 'mountains' (núi cao thử thách) và 'doors that we can't walk through' (những cánh cửa định kiến cấm đoán).",
      "properNouns": [],
      "keywords": [
        "mountains",
        "doors",
        "walk through"
      ],
      "tokenCount": 13
    },
    {
      "orderIndex": 17,
      "startTime": 88.5,
      "endTime": 96.8,
      "text": "I know you're wondering why, because we're able to be just you and me within these walls.",
      "normalizedText": "i know youre wondering why because were able to be just you and me within these walls",
      "ipaUs": "aɪ noʊ jʊr ˈwʌndərɪŋ waɪ bɪˈkəz wɪr ˈeɪbl tuː biː dʒʌst juː ænd miː wɪˈðɪn ðiːz wɔːlz",
      "translationVi": "Em biết anh đang tự hỏi tại sao, bởi vì chúng ta chỉ có thể là chính mình khi ở trong bốn bức tường này.",
      "explanationAi": "Cụm từ 'within these walls' (ở trong bốn bức tường riêng tư / nơi an toàn kín đáo) đối lập với thế giới bên ngoài.",
      "properNouns": [],
      "keywords": [
        "wondering",
        "within these walls"
      ],
      "tokenCount": 17
    },
    {
      "orderIndex": 18,
      "startTime": 96.8,
      "endTime": 105,
      "text": "But when we go outside, you're gonna wake up and see that it was hopeless after all.",
      "normalizedText": "but when we go outside youre gonna wake up and see that it was hopeless after all",
      "ipaUs": "bʌt wɛn wiː ɡoʊ ˌaʊtˈsaɪd jʊr ˈɡənə weɪk ʌp ænd siː ðæt ɪt wʌz ˈhoʊpləs ˈæftər ɔːl",
      "translationVi": "Nhưng một khi bước ra ngoài, anh sẽ thức tỉnh và nhận ra rằng tất cả đều là vô vọng.",
      "explanationAi": "Cụm 'wake up and see' (thức tỉnh nhận ra sự thật), tính từ 'hopeless' (vô vọng) và thành ngữ 'after all' (rốt cuộc, sau tất cả).",
      "properNouns": [],
      "keywords": [
        "outside",
        "wake up",
        "hopeless",
        "after all"
      ],
      "tokenCount": 17
    }
  ]
};
