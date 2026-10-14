import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for BBC Learning English: Food and Mood
 * Category: cat_bbc_6min (BBC 6 Minute English)
 * 8 CEFR-aligned contextual questions covering nutritional psychiatry, comfort food, and idiomatic expressions
 */
export const QUIZ_BBC_FOOD_MOOD: VideoQuizData = {
  lessonId: "vid_bbc_food_and_mood",
  lessonTitle: "BBC Learning English: Food and Mood - 6 Minute English",
  totalQuestions: 8,
  xpReward: 40,
  questions: [
    {
        "id": "q_bbc_food_mood_1",
        "question": "What is the central topic of discussion between presenters Sam and Rob in this episode of 6 Minute English?",
        "questionEn": "What is the central topic of discussion between presenters Sam and Rob in this episode of 6 Minute English?",
        "questionVi": "Chủ đề thảo luận trung tâm giữa hai người dẫn chương trình Sam và Rob trong tập 6 Minute English này là gì?",
        "options": [
            "The scientific connection between what we eat and how we feel (food and mood)",
            "The historical evolution of fine dining restaurants in seventeenth-century France",
            "Techniques for preserving fresh agricultural produce during overseas shipping",
            "How industrial refrigeration revolutionized domestic household kitchen appliances"
        ],
        "optionsEn": [
            "The scientific connection between what we eat and how we feel (food and mood)",
            "The historical evolution of fine dining restaurants in seventeenth-century France",
            "Techniques for preserving fresh agricultural produce during overseas shipping",
            "How industrial refrigeration revolutionized domestic household kitchen appliances"
        ],
        "optionsVi": [
            "Mối liên hệ khoa học giữa những gì chúng ta ăn và cảm xúc của chúng ta (thực phẩm và tâm trạng)",
            "Sự phát triển lịch sử của các nhà hàng ẩm thực cao cấp tại Pháp vào thế kỷ XVII",
            "Các kỹ thuật bảo quản nông sản tươi sống trong quá trình vận tải đường biển quốc tế",
            "Công nghệ làm lạnh công nghiệp đã cách mạng hóa thiết bị nhà bếp gia đình như thế nào"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 10 & 11, Sam explains: 'In this programme we’ll be investigating the connection between our food and our mood. We’ll hear how healthy eating makes us feel better...'",
        "explanationEn": "In Segments 10 & 11, Sam explains: 'In this programme we’ll be investigating the connection between our food and our mood. We’ll hear how healthy eating makes us feel better...'",
        "explanationVi": "Trong câu 10 & 11, Sam giải thích: 'Trong chương trình hôm nay chúng ta sẽ tìm hiểu mối liên kết giữa thực phẩm và tâm trạng. Chúng ta sẽ lắng nghe cách ăn uống lành mạnh giúp ta cảm thấy tốt hơn...'",
        "referenceSegmentIndex": 10,
        "targetedConcept": "Mối liên kết thực phẩm và tâm trạng (Food and Mood Connection)",
        "targetedConceptEn": "Food and Mood Connection",
        "targetedConceptVi": "Mối liên kết thực phẩm và tâm trạng"
    },
    {
        "id": "q_bbc_food_mood_2",
        "question": "What favourite comfort food does Rob mention when Sam asks him about his preferences?",
        "questionEn": "What favourite comfort food does Rob mention when Sam asks him about his preferences?",
        "questionVi": "Món ăn xoa dịu tâm trạng ưa thích nào được Rob nhắc đến khi Sam hỏi về sở thích của anh ấy?",
        "options": [
            "A cream chocolate éclair",
            "A peanut butter and strawberry jelly sandwich",
            "A hot bowl of spicy traditional chicken soup",
            "A slice of freshly baked Margherita cheese pizza"
        ],
        "optionsEn": [
            "A cream chocolate éclair",
            "A peanut butter and strawberry jelly sandwich",
            "A hot bowl of spicy traditional chicken soup",
            "A slice of freshly baked Margherita cheese pizza"
        ],
        "optionsVi": [
            "Bánh su kem phủ sô-cô-la (a cream chocolate éclair)",
            "Bánh mì kẹp bơ đậu phộng và mứt dâu tây",
            "Một tô súp gà cay truyền thống nóng hổi",
            "Một lát bánh pizza phô mai Margherita vừa nướng"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 6, Rob answers Sam: 'Hmm, maybe a cream chocolate éclair…'",
        "explanationEn": "In Segment 6, Rob answers Sam: 'Hmm, maybe a cream chocolate éclair…'",
        "explanationVi": "Trong câu 6, Rob trả lời Sam: 'Ừm, có lẽ là một chiếc bánh su kem phủ sô-cô-la...'",
        "referenceSegmentIndex": 6,
        "targetedConcept": "Món ăn xoa dịu tâm trạng của Rob (Rob's Favourite Comfort Food)",
        "targetedConceptEn": "Rob's Favourite Comfort Food",
        "targetedConceptVi": "Món ăn xoa dịu tâm trạng của Rob"
    },
    {
        "id": "q_bbc_food_mood_3",
        "question": "According to Rob, what is the negative downside of eating comfort food high in carbohydrates and sugar?",
        "questionEn": "According to Rob, what is the negative downside of eating comfort food high in carbohydrates and sugar?",
        "questionVi": "Theo Rob, mặt trái tiêu cực của việc ăn các món xoa dịu tâm trạng nhiều tinh bột và đường là gì?",
        "options": [
            "After a few minutes, it leaves us feeling even worse than before",
            "It permanently eliminates the human body's ability to digest vegetable fiber",
            "It instantly causes deep sleep and auditory hallucinations within seconds",
            "It makes people completely forget their native foreign language vocabulary"
        ],
        "optionsEn": [
            "After a few minutes, it leaves us feeling even worse than before",
            "It permanently eliminates the human body's ability to digest vegetable fiber",
            "It instantly causes deep sleep and auditory hallucinations within seconds",
            "It makes people completely forget their native foreign language vocabulary"
        ],
        "optionsVi": [
            "Sau vài phút, nó khiến chúng ta cảm thấy tồi tệ hơn cả lúc trước",
            "Nó triệt tiêu vĩnh viễn khả năng tiêu hóa chất xơ thực vật của cơ thể",
            "Nó lập tức gây ra giấc ngủ sâu và ảo giác thính giác chỉ trong vài giây",
            "Nó khiến con người hoàn toàn quên mất vốn từ vựng tiếng mẹ đẻ của mình"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 8, Rob points out: 'But unfortunately, most comfort food is high in carbohydrates and sugar and, after a few minutes, it leaves us feeling even worse than before.'",
        "explanationEn": "In Segment 8, Rob points out: 'But unfortunately, most comfort food is high in carbohydrates and sugar and, after a few minutes, it leaves us feeling even worse than before.'",
        "explanationVi": "Trong câu 8, Rob chỉ ra: 'Nhưng không may thay, hầu hết các món ăn xoa dịu tâm trạng lại chứa rất nhiều tinh bột và đường, và sau vài phút, nó khiến chúng ta cảm thấy tồi tệ hơn cả lúc trước.'",
        "referenceSegmentIndex": 8,
        "targetedConcept": "Tác dụng ngược của đồ ăn nhiều đường (Downside of High-Sugar Comfort Food)",
        "targetedConceptEn": "Downside of High-Sugar Comfort Food",
        "targetedConceptVi": "Tác dụng ngược của đồ ăn nhiều đường"
    },
    {
        "id": "q_bbc_food_mood_4",
        "question": "How much of the human body's total energy is used up by the brain, as revealed by Rob at the end of the programme?",
        "questionEn": "How much of the human body's total energy is used up by the brain, as revealed by Rob at the end of the programme?",
        "questionVi": "Bao nhiêu phần trăm tổng năng lượng của cơ thể người được não bộ tiêu thụ, theo đáp án Rob công bố ở cuối chương trình?",
        "options": [
            "Around 20 percent (even though the brain is only 2 percent of total body weight)",
            "Exactly 10 percent of total caloric expenditure",
            "Around 30 percent during sleep and 50 percent when walking",
            "Less than 1 percent because internal organs require the vast majority"
        ],
        "optionsEn": [
            "Around 20 percent (even though the brain is only 2 percent of total body weight)",
            "Exactly 10 percent of total caloric expenditure",
            "Around 30 percent during sleep and 50 percent when walking",
            "Less than 1 percent because internal organs require the vast majority"
        ],
        "optionsVi": [
            "Khoảng 20 phần trăm (mặc dù não bộ chỉ chiếm 2 phần trăm trọng lượng cơ thể)",
            "Chính xác 10 phần trăm tổng mức tiêu hao calo",
            "Khoảng 30 phần trăm khi ngủ và 50 phần trăm khi đi bộ",
            "Dưới 1 phần trăm vì các cơ quan nội tạng cần phần lớn năng lượng"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 48, Rob reveals: 'In fact, around 20 percent of the body’s energy goes to feeding the brain, even though it only makes up two percent of our total body weight.'",
        "explanationEn": "In Segment 48, Rob reveals: 'In fact, around 20 percent of the body’s energy goes to feeding the brain, even though it only makes up two percent of our total body weight.'",
        "explanationVi": "Trong câu 48, Rob tiết lộ: 'Trên thực tế, khoảng 20 phần trăm năng lượng cơ thể được dùng để nuôi não bộ, mặc dù nó chỉ chiếm hai phần trăm tổng trọng lượng cơ thể chúng ta.'",
        "referenceSegmentIndex": 48,
        "targetedConcept": "Mức tiêu thụ năng lượng của não bộ (Brain Energy Consumption)",
        "targetedConceptEn": "Brain Energy Consumption",
        "targetedConceptVi": "Mức tiêu thụ năng lượng của não bộ"
    },
    {
        "id": "q_bbc_food_mood_5",
        "question": "What paradoxical eating problem did chef Danny Edwards experience while working in a busy restaurant kitchen?",
        "questionEn": "What paradoxical eating problem did chef Danny Edwards experience while working in a busy restaurant kitchen?",
        "questionVi": "Vấn đề ăn uống nghịch lý nào mà đầu bếp Danny Edwards đã trải qua khi làm việc trong một gian bếp nhà hàng bận rộn?",
        "options": [
            "Working under prolonged stress suppressed his appetite, forcing him to grab food on the go",
            "Being surrounded by chefs compelled him to eat six full sit-down meals every shift",
            "He developed an allergy to kitchen spices and could only drink boiled vegetable broth",
            "His appetite increased tenfold, causing him to constantly sample every gourmet dessert"
        ],
        "optionsEn": [
            "Working under prolonged stress suppressed his appetite, forcing him to grab food on the go",
            "Being surrounded by chefs compelled him to eat six full sit-down meals every shift",
            "He developed an allergy to kitchen spices and could only drink boiled vegetable broth",
            "His appetite increased tenfold, causing him to constantly sample every gourmet dessert"
        ],
        "optionsVi": [
            "Làm việc dưới căng thẳng kéo dài khiến anh chán ăn, buộc phải ăn vội vàng trên đường đi",
            "Ở cạnh các đầu bếp buộc anh phải ăn sáu bữa ngồi đàng hoàng trong mỗi ca làm việc",
            "Anh bị dị ứng với các loại gia vị trong bếp và chỉ có thể uống nước luộc rau củ",
            "Sự thèm ăn của anh tăng gấp mười lần, khiến anh liên tục nếm thử mọi món tráng miệng"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 22 & 25, Danny explains that working under stress caused his appetite to become suppressed, leading him to grab and go instead of eating healthy sit-down meals.",
        "explanationEn": "In Segments 22 & 25, Danny explains that working under stress caused his appetite to become suppressed, leading him to grab and go instead of eating healthy sit-down meals.",
        "explanationVi": "Trong câu 22 & 25, Danny giải thích rằng làm việc dưới căng thẳng khiến cảm giác thèm ăn của anh bị ức chế, dẫn đến việc anh phải ăn vội mang đi thay vì ăn các bữa ăn ngồi lành mạnh.",
        "referenceSegmentIndex": 22,
        "targetedConcept": "Nghịch lý chán ăn của đầu bếp khi căng thẳng (Chef Stress and Suppressed Appetite)",
        "targetedConceptEn": "Chef Stress and Suppressed Appetite",
        "targetedConceptVi": "Nghịch lý chán ăn của đầu bếp khi căng thẳng"
    },
    {
        "id": "q_bbc_food_mood_6",
        "question": "What field of medical research does Professor Felice Jacka specialize in, and what did her study discover?",
        "questionEn": "What field of medical research does Professor Felice Jacka specialize in, and what did her study discover?",
        "questionVi": "Giáo sư Felice Jacka chuyên về lĩnh vực nghiên cứu y khoa nào, và nghiên cứu của bà đã phát hiện ra điều gì?",
        "options": [
            "Nutritional psychiatry: patients whose mental health improved had also improved their diet",
            "Pediatric surgery: sugar intake directly dictates the bone density of teenagers",
            "Dental hygiene: eating whole cereals prevents enamel erosion in senior citizens",
            "Veterinary pharmacology: organic pet diets increase the lifespan of domestic dogs"
        ],
        "optionsEn": [
            "Nutritional psychiatry: patients whose mental health improved had also improved their diet",
            "Pediatric surgery: sugar intake directly dictates the bone density of teenagers",
            "Dental hygiene: eating whole cereals prevents enamel erosion in senior citizens",
            "Veterinary pharmacology: organic pet diets increase the lifespan of domestic dogs"
        ],
        "optionsVi": [
            "Tâm thần học dinh dưỡng: bệnh nhân có sức khỏe tinh thần cải thiện cũng là những người cải thiện chế độ ăn",
            "Phẫu thuật nhi khoa: lượng đường nạp vào quy định trực tiếp mật độ xương của thanh thiếu niên",
            "Vệ sinh nha khoa: ăn ngũ cốc nguyên hạt ngăn ngừa mòn men răng ở người cao tuổi",
            "Dược học thú y: chế độ ăn hữu cơ cho thú cưng giúp tăng tuổi thọ của loài chó nhà"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 28 & 30, Rob states: 'Professor Felice Jacka, is an expert in nutritional psychiatry... Professor Jacka found that the patients whose mental health improved were the same patients who had also improved their diet.'",
        "explanationEn": "In Segments 28 & 30, Rob states: 'Professor Felice Jacka, is an expert in nutritional psychiatry... Professor Jacka found that the patients whose mental health improved were the same patients who had also improved their diet.'",
        "explanationVi": "Trong câu 28 & 30, Rob nêu: 'Giáo sư Felice Jacka là chuyên gia về tâm thần học dinh dưỡng... Giáo sư Jacka phát hiện ra rằng những bệnh nhân có sức khỏe tinh thần cải thiện cũng chính là những người đã cải thiện chế độ ăn.'",
        "referenceSegmentIndex": 28,
        "targetedConcept": "Tâm thần học dinh dưỡng của GS Felice Jacka (Nutritional Psychiatry Findings)",
        "targetedConceptEn": "Nutritional Psychiatry Findings",
        "targetedConceptVi": "Tâm thần học dinh dưỡng của GS Felice Jacka"
    },
    {
        "id": "q_bbc_food_mood_7",
        "question": "What is the name of Professor Felice Jacka's ground-breaking clinical research study mentioned in the programme?",
        "questionEn": "What is the name of Professor Felice Jacka's ground-breaking clinical research study mentioned in the programme?",
        "questionVi": "Tên của nghiên cứu thử nghiệm lâm sàng mang tính đột phá của Giáo sư Felice Jacka được nhắc đến trong chương trình là gì?",
        "options": [
            "'The Smile Trial'",
            "'The Mediterranean Feast Project'",
            "'The Brain Fuel Initiative'",
            "'The Happy Gut Experiment'"
        ],
        "optionsEn": [
            "'The Smile Trial'",
            "'The Mediterranean Feast Project'",
            "'The Brain Fuel Initiative'",
            "'The Happy Gut Experiment'"
        ],
        "optionsVi": [
            "‘The Smile Trial’ (Thử nghiệm Nụ Cười)",
            "‘The Mediterranean Feast Project’ (Dự án Bữa tiệc Địa Trung Hải)",
            "‘The Brain Fuel Initiative’ (Sáng kiến Nhiên liệu Não bộ)",
            "‘The Happy Gut Experiment’ (Thí nghiệm Đường ruột Hạnh phúc)"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 42, Sam notes: 'But her ground-breaking research, named ‘The Smile Trial’, has been successfully repeated elsewhere, clearly showing the link between eating well and feeling good.'",
        "explanationEn": "In Segment 42, Sam notes: 'But her ground-breaking research, named ‘The Smile Trial’, has been successfully repeated elsewhere, clearly showing the link between eating well and feeling good.'",
        "explanationVi": "Trong câu 42, Sam ghi nhận: 'Nhưng nghiên cứu mang tính đột phá của bà, mang tên ‘The Smile Trial’, đã được lặp lại thành công ở nhiều nơi khác, chứng minh rõ ràng mối liên kết giữa việc ăn ngon và cảm thấy vui vẻ.'",
        "referenceSegmentIndex": 42,
        "targetedConcept": "Thử nghiệm lâm sàng The Smile Trial (The Smile Trial Clinical Study)",
        "targetedConceptEn": "The Smile Trial Clinical Study",
        "targetedConceptVi": "Thử nghiệm lâm sàng The Smile Trial"
    },
    {
        "id": "q_bbc_food_mood_8",
        "question": "What slang word and bodily gesture did Professor Jacka's medical colleagues use when they initially doubted her PhD research topic?",
        "questionEn": "What slang word and bodily gesture did Professor Jacka's medical colleagues use when they initially doubted her PhD research topic?",
        "questionVi": "Từ lóng và cử chỉ cơ thể nào mà các đồng nghiệp y khoa của Giáo sư Jacka đã sử dụng khi họ ban đầu nghi ngờ đề tài nghiên cứu tiến sĩ của bà?",
        "options": [
            "They thought she was 'bananas' (silly or crazy) and they 'rolled their eyes' in disbelief",
            "They called her a 'couch potato' and gave her an energetic standing ovation",
            "They labeled her a 'bookworm' and pointed their index fingers towards the floor",
            "They accused her of being 'cold turkey' and aggressively shook their clenched fists"
        ],
        "optionsEn": [
            "They thought she was 'bananas' (silly or crazy) and they 'rolled their eyes' in disbelief",
            "They called her a 'couch potato' and gave her an energetic standing ovation",
            "They labeled her a 'bookworm' and pointed their index fingers towards the floor",
            "They accused her of being 'cold turkey' and aggressively shook their clenched fists"
        ],
        "optionsVi": [
            "Họ nghĩ bà bị 'bananas' (ngớ ngẩn hoặc điên rồ) và họ đã 'đảo mắt' (rolled their eyes) hoài nghi",
            "Họ gọi bà là kẻ lười biếng 'couch potato' và đứng dậy vỗ tay nhiệt liệt khen ngợi",
            "Họ gắn mác bà là 'mọt sách' và chỉ ngón tay trỏ xuống sàn nhà",
            "Họ cáo buộc bà là kẻ cai nghiện đột ngột 'cold turkey' và siết chặt nắm đấm"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 38 & 39, Rob explains: '...her colleagues thought she was bananas – a slang word meaning silly or crazy. They rolled their eyes – a phrase which describes the gesture of turning your eyes upwards to express annoyance, boredom or disbelief.'",
        "explanationEn": "In Segments 38 & 39, Rob explains: '...her colleagues thought she was bananas – a slang word meaning silly or crazy. They rolled their eyes – a phrase which describes the gesture of turning your eyes upwards to express annoyance, boredom or disbelief.'",
        "explanationVi": "Trong câu 38 & 39, Rob giải thích: '...các đồng nghiệp nghĩ bà bị bananas – một từ lóng có nghĩa là ngớ ngẩn hoặc điên rồ. Họ đã đảo mắt (rolled their eyes) – một cụm từ miêu tả hành động hướng mắt lên trên để biểu thị sự bực bội, buồn chán hoặc hoài nghi.'",
        "referenceSegmentIndex": 38,
        "targetedConcept": "Từ vựng 'bananas' và cử chỉ 'roll your eyes' (Idiomatic Expressions: Bananas & Eye Rolling)",
        "targetedConceptEn": "Idiomatic Expressions: Bananas & Eye Rolling",
        "targetedConceptVi": "Từ vựng 'bananas' và cử chỉ 'roll your eyes'"
    }
],
  generatedBy: "CONTEXTUAL_FALLBACK",
};

/**
 * BBC Learning English: Food and Mood - 6 Minute English
 * Slug: bbc-learning-english-food-and-mood
 * YouTube ID: fG7dJ6A3l7w
 * Category: cat_bbc_6min (BBC 6 Minute English)
 * 100% Calibrated Pure Master Segments (Zero Merged Utterances Standard)
 * Full Timeline Coverage: 00:09.24 - 06:08.60 (381s / 06:21 Official YouTube Video - 1,022,000+ views)
 * 968 Verbatim Words (Zero Diffs 100% with BBC Official Subtitles)
 */
export const LESSON_BBC_FOOD_MOOD: MockVideoLesson = {
  id: "vid_bbc_food_and_mood",
  slug: "bbc-learning-english-food-and-mood",
  title: "BBC Learning English: Food and Mood - 6 Minute English",
  description: "Chương trình 6 Minute English từ đài BBC với hai người dẫn Sam và Rob khám phá mối liên hệ mật thiết giữa thực phẩm và tâm trạng: hiện tượng ăn uống theo cảm xúc (emotional eating), tâm thần học dinh dưỡng (nutritional psychiatry), nghiên cứu đột phá The Smile Trial của GS. Felice Jacka và mức tiêu thụ năng lượng của não bộ.",
  sourceType: "YOUTUBE",
  externalId: "fG7dJ6A3l7w",
  thumbnailUrl: "https://img.youtube.com/vi/fG7dJ6A3l7w/hqdefault.jpg",
  durationSeconds: 381,
  durationFormatted: "06:21",
  cefrLevel: "B1",
  supportedTypes: "BOTH",
  categoryId: "cat_bbc_6min",
  categorySlug: "bbc-6-minute",
  categoryName: "BBC 6 Minute English",
  accent: "en-GB",
  wpmSpeed: 152,
  viewCount: 1022400,
  studyCount: 88500,
  quiz: QUIZ_BBC_FOOD_MOOD,
  segments: [
    {
        "orderIndex": 1,
        "startTime": 9.24,
        "endTime": 13.12,
        "text": "Hello. This is 6 Minute English from BBC Learning English. I’m Sam.",
        "translationVi": "Xin chào. Đây là 6 Minute English từ BBC Learning English. Tôi là Sam.",
        "ipaUs": "/həlˈoʊ ðˈɪs ˈɪz sɪks mˈɪnət ˈɪŋɡlɪʃ frˈʌm bˌiːbisˈiː lˈɜːrnɪŋ ˈɪŋɡlɪʃ ˈaɪ ˈem sæm/",
        "properNouns": [
            "Sam",
            "BBC Learning English"
        ],
        "keywords": [
            "welcome",
            "learning english",
            "sam"
        ],
        "explanationAi": "Lời chào mở đầu chuẩn mực của Sam giới thiệu chương trình 6 Minute English từ BBC Learning English.",
        "tokenCount": 13
    },
    {
        "orderIndex": 2,
        "startTime": 13.12,
        "endTime": 13.92,
        "text": "And I’m Rob.",
        "translationVi": "Và tôi là Rob.",
        "ipaUs": "/ənd ˈaɪ ˈem rɑːb/",
        "properNouns": [
            "Rob"
        ],
        "keywords": [
            "rob"
        ],
        "explanationAi": "Rob chào nối tiếp, hoàn thiện cặp đôi dẫn chuyện quen thuộc của đài BBC.",
        "tokenCount": 4
    },
    {
        "orderIndex": 3,
        "startTime": 13.92,
        "endTime": 20.32,
        "text": "When someone feels sad or in a bad mood, they often try to feel better by eating their favourite food…",
        "translationVi": "Khi ai đó cảm thấy buồn bã hoặc tâm trạng tồi tệ, họ thường cố gắng cảm thấy dễ chịu hơn bằng cách ăn món ăn yêu thích của mình...",
        "ipaUs": "/wˈen sˈʌmwˌʌn fˈiːlz sˈæd ˈɔːr ɪn ə bˈæd mˈuːd ðˈeɪ ˈɔːfən trˈaɪ tˈuː fˈiːl bˈetər bˈaɪ ˈiːtɪŋ ðˈer fˈeɪvərɪt fˈuːd/",
        "properNouns": [],
        "keywords": [
            "bad mood",
            "favourite food"
        ],
        "explanationAi": "Mệnh đề 'When someone feels...' nêu ngữ cảnh tâm trạng tiêu cực dẫn đến hành vi tìm kiếm đồ ăn xoa dịu.",
        "tokenCount": 20
    },
    {
        "orderIndex": 4,
        "startTime": 20.32,
        "endTime": 23.4,
        "text": "I usually go for a peanut butter sandwich myself.",
        "translationVi": "Bản thân tôi thì thường chọn một chiếc bánh mì kẹp bơ đậu phộng.",
        "ipaUs": "/ˈaɪ jˈuːʒəwəli ɡˈoʊ fˈɔːr ə pˈiːnət bˈʌtər sˈændwɪtʃ mˌaɪsˈelf/",
        "properNouns": [],
        "keywords": [
            "peanut butter",
            "sandwich"
        ],
        "explanationAi": "Cụm 'go for' mang nghĩa lựa chọn hoặc ưu tiên một món ăn; 'peanut butter sandwich' là bánh mì bơ đậu phộng.",
        "tokenCount": 9
    },
    {
        "orderIndex": 5,
        "startTime": 23.4,
        "endTime": 25.48,
        "text": "Do you have a favourite comfort food, Rob?",
        "translationVi": "Anh có món ăn xoa dịu tâm trạng yêu thích nào không, Rob?",
        "ipaUs": "/dˈuː jˈuː hˈæv ə fˈeɪvərɪt kˈʌmfərt fˈuːd rɑːb/",
        "properNouns": [
            "Rob"
        ],
        "keywords": [
            "comfort food"
        ],
        "explanationAi": "Thuật ngữ 'comfort food' chỉ các món ăn quen thuộc mang lại sự an ủi cảm xúc khi buồn chán.",
        "tokenCount": 8
    },
    {
        "orderIndex": 6,
        "startTime": 25.48,
        "endTime": 28.72,
        "text": "Hmm, maybe a cream chocolate éclair…",
        "translationVi": "Ừm, có lẽ là một chiếc bánh su kem sô-cô-la...",
        "ipaUs": "/hm mˈeɪbi ə krˈiːm tʃˈɔːklət eɪˈkler/",
        "properNouns": [],
        "keywords": [
            "cream chocolate",
            "eclair"
        ],
        "explanationAi": "'cream chocolate éclair' là loại bánh su kem phủ sô-cô-la dài xuất xứ từ Pháp, đồ ngọt ưa thích của Rob.",
        "tokenCount": 6
    },
    {
        "orderIndex": 7,
        "startTime": 28.72,
        "endTime": 37.6,
        "text": "Comfort food is a type of emotional eating – eating lots of food because we feel sad, not because we’re hungry.",
        "translationVi": "Món ăn xoa dịu tâm trạng là một dạng ăn uống theo cảm xúc – ăn thật nhiều thức ăn vì chúng ta cảm thấy buồn, chứ không phải vì đang đói.",
        "ipaUs": "/kˈʌmfərt fˈuːd ˈɪz ə tˈaɪp ˈʌv ɪmˈoʊʃənəl ˈiːtɪŋ ˈiːtɪŋ lˈɑːts ˈʌv fˈuːd bɪkˈɔːz wˈiː fˈiːl sˈæd nˈɑːt bɪkˈɔːz wˈiː rˈeɪ hˈʌŋɡri/",
        "properNouns": [],
        "keywords": [
            "emotional eating",
            "hungry",
            "sad"
        ],
        "explanationAi": "Khái niệm 'emotional eating' (ăn uống cảm xúc) được định nghĩa: ăn vì buồn chứ không phải vì nhu cầu sinh học đói bụng.",
        "tokenCount": 21
    },
    {
        "orderIndex": 8,
        "startTime": 37.6,
        "endTime": 44.88,
        "text": "But unfortunately, most comfort food is high in carbohydrates and sugar and, after a few minutes, it leaves us feeling even worse than before.",
        "translationVi": "Nhưng không may thay, hầu hết các món ăn xoa dịu tâm trạng lại chứa rất nhiều tinh bột và đường, và sau vài phút, nó khiến chúng ta cảm thấy tồi tệ hơn cả lúc trước.",
        "ipaUs": "/bˈʌt ənfˈɔːrtʃənətli mˈoʊst kˈʌmfərt fˈuːd ˈɪz hˈaɪ ɪn kˌɑːrboʊhˈaɪdreɪts ənd ʃˈʊɡər ənd ˈæftər ə fjˈuː mˈɪnəts ˈɪt lˈiːvz ˈʌs fˈiːlɪŋ ˈiːvɪn wˈɜːrs ðˈæn bɪfˈɔːr/",
        "properNouns": [],
        "keywords": [
            "carbohydrates",
            "sugar",
            "worse"
        ],
        "explanationAi": "Cấu trúc 'high in carbohydrates and sugar' chỉ thực phẩm giàu tinh bột và đường, gây tụt năng lượng sau đó.",
        "tokenCount": 24
    },
    {
        "orderIndex": 9,
        "startTime": 44.88,
        "endTime": 51.12,
        "text": "Today, scientific research into the relationship between what we eat and how we feel is growing.",
        "translationVi": "Ngày nay, các nghiên cứu khoa học về mối liên hệ giữa những gì chúng ta ăn và cảm xúc của chúng ta đang ngày càng phát triển.",
        "ipaUs": "/tədˈeɪ sˌaɪəntˈɪfɪk risˈɜːrtʃ ˈɪntu ðə rilˈeɪʃənʃˌɪp bɪtwˈiːn wˈʌt wˈiː ˈiːt ənd hˈaʊ wˈiː fˈiːl ˈɪz ɡrˈoʊɪŋ/",
        "properNouns": [],
        "keywords": [
            "scientific research",
            "relationship"
        ],
        "explanationAi": "Cụm 'scientific research into' diễn tả các nghiên cứu khoa học chuyên sâu về mối liên kết giữa dinh dưỡng và cảm xúc.",
        "tokenCount": 16
    },
    {
        "orderIndex": 10,
        "startTime": 51.12,
        "endTime": 56.56,
        "text": "In this programme we’ll be investigating the connection between our food and our mood.",
        "translationVi": "Trong chương trình hôm nay, chúng ta sẽ tìm hiểu mối liên kết giữa thực phẩm và tâm trạng của chúng ta.",
        "ipaUs": "/ɪn ðˈɪs prˈoʊɡrˌæm wˈiː ll bˈiː ˌɪnvˈestəɡˌeɪtɪŋ ðə kənˈekʃən bɪtwˈiːn ˈaʊər fˈuːd ənd ˈaʊər mˈuːd/",
        "properNouns": [],
        "keywords": [
            "investigating",
            "connection",
            "food and mood"
        ],
        "explanationAi": "'investigating the connection' nhấn mạnh mục tiêu nghiên cứu và giải thích khoa học của tập phát sóng.",
        "tokenCount": 15
    },
    {
        "orderIndex": 11,
        "startTime": 56.56,
        "endTime": 62.92,
        "text": "We’ll hear how healthy eating makes us feel better, and of course, we’ll be learning some new vocabulary as well.",
        "translationVi": "Chúng ta sẽ lắng nghe cách ăn uống lành mạnh giúp ta cảm thấy tốt hơn, và dĩ nhiên, chúng ta cũng sẽ học thêm một số từ vựng mới nữa.",
        "ipaUs": "/wˈiː ll hˈiːr hˈaʊ hˈelθi ˈiːtɪŋ mˈeɪks ˈʌs fˈiːl bˈetər ənd ˈʌv kˈɔːrs wˈiː ll bˈiː lˈɜːrnɪŋ sˈʌm nˈuː voʊkˈæbjəlˌeri ˈæz wˈel/",
        "properNouns": [],
        "keywords": [
            "healthy eating",
            "vocabulary"
        ],
        "explanationAi": "Thì tương lai tiếp diễn 'we'll be learning' diễn tả lộ trình học từ vựng tự nhiên xuyên suốt chương trình.",
        "tokenCount": 22
    },
    {
        "orderIndex": 12,
        "startTime": 62.92,
        "endTime": 68.6,
        "text": "Great! But first I have a question for you, Sam.",
        "translationVi": "Tuyệt vời! Nhưng trước tiên tôi có một câu hỏi dành cho bạn đây, Sam.",
        "ipaUs": "/ɡrˈeɪt bˈʌt fˈɜːrst ˈaɪ hˈæv ə kwˈestʃən fˈɔːr jˈuː sæm/",
        "properNouns": [
            "Sam"
        ],
        "keywords": [
            "question"
        ],
        "explanationAi": "Câu chuyển ý kinh điển của Rob để dẫn vào câu hỏi đố tương tác mở màn mỗi tập 6 Minute English.",
        "tokenCount": 10
    },
    {
        "orderIndex": 13,
        "startTime": 68.6,
        "endTime": 77.88,
        "text": "People who link what we eat with how we feel make a simple argument: the food you eat supplies nutrients and energy to the brain, and the brain controls our emotions.",
        "translationVi": "Những người liên kết những gì chúng ta ăn với cảm xúc đưa ra một lập luận đơn giản: thức ăn bạn nạp vào cung cấp dinh dưỡng và năng lượng cho não bộ, và não bộ thì điều khiển cảm xúc của chúng ta.",
        "ipaUs": "/pˈiːpəl hˈuː lˈɪŋk wˈʌt wˈiː ˈiːt wˈɪð hˈaʊ wˈiː fˈiːl mˈeɪk ə sˈɪmpəl ˈɑːrɡjəmənt ðə fˈuːd jˈuː ˈiːt səplˈaɪz nˈuːtriənts ənd ˈenərdʒi tˈuː ðə brˈeɪn ənd ðə brˈeɪn kəntrˈoʊlz ˈaʊər ɪmˈoʊʃənz/",
        "properNouns": [],
        "keywords": [
            "supplies nutrients",
            "energy",
            "brain",
            "emotions"
        ],
        "explanationAi": "Lập luận nhân quả: 'supplies nutrients and energy' (cung cấp dưỡng chất và năng lượng) điều khiển cảm xúc.",
        "tokenCount": 31
    },
    {
        "orderIndex": 14,
        "startTime": 77.88,
        "endTime": 87.12,
        "text": "Now, that might sound simplistic, but the brain is a vital link in the connection between food and our mood.",
        "translationVi": "Giờ thì điều đó nghe có vẻ đơn giản hóa, nhưng não bộ thực sự là một mắt xích thiết yếu trong mối liên hệ giữa thực phẩm và tâm trạng.",
        "ipaUs": "/nˈaʊ ðˈæt mˈaɪt sˈaʊnd sɪmplˈɪstɪk bˈʌt ðə brˈeɪn ˈɪz ə vˈaɪtəl lˈɪŋk ɪn ðə kənˈekʃən bɪtwˈiːn fˈuːd ənd ˈaʊər mˈuːd/",
        "properNouns": [],
        "keywords": [
            "simplistic",
            "vital link"
        ],
        "explanationAi": "Tính từ 'simplistic' (quá đơn giản hóa) đối lập với 'vital link' (mắt xích sống còn, thiết yếu).",
        "tokenCount": 20
    },
    {
        "orderIndex": 15,
        "startTime": 87.12,
        "endTime": 91.36,
        "text": "So, Sam, my question is: how much of the body’s total energy is used up by the brain? Is it:",
        "translationVi": "Vậy nên, Sam này, câu hỏi của tôi là: bao nhiêu phần trăm tổng năng lượng cơ thể được não bộ tiêu thụ? Liệu đó là:",
        "ipaUs": "/sˈoʊ sæm mˈaɪ kwˈestʃən ˈɪz hˈaʊ mˈʌtʃ ˈʌv ðə bˈɑːdi ˈes tˈoʊtəl ˈenərdʒi ˈɪz jˈuːzd ˈʌp bˈaɪ ðə brˈeɪn ˈɪz ˈɪt/",
        "properNouns": [
            "Sam"
        ],
        "keywords": [
            "total energy",
            "used up",
            "brain"
        ],
        "explanationAi": "Cụm 'used up by' mang nghĩa bị tiêu hao hoặc tiêu thụ hết bởi cơ quan nào trong cơ thể.",
        "tokenCount": 21
    },
    {
        "orderIndex": 16,
        "startTime": 91.36,
        "endTime": 95.64,
        "text": "a) 10 percent, b) 20 percent, or c) 30 percent?",
        "translationVi": "a) 10 phần trăm, b) 20 phần trăm, hay c) 30 phần trăm?",
        "ipaUs": "/ə tɛn pərsˈent bˈiː ˈtwɛnti pərsˈent ˈɔːr sˈiː ˈθɜːrti pərsˈent/",
        "properNouns": [],
        "keywords": [
            "percent"
        ],
        "explanationAi": "Ba phương án trắc nghiệm quen thuộc của chương trình để người nghe cùng suy đoán.",
        "tokenCount": 10
    },
    {
        "orderIndex": 17,
        "startTime": 95.64,
        "endTime": 100.56,
        "text": "Hmmm, that's a good question. I’ll say it’s a) 10 percent.",
        "translationVi": "Hừm, đó là một câu hỏi hay đấy. Tôi sẽ đoán là a) 10 phần trăm.",
        "ipaUs": "/hm ðæts ə ɡˈʊd kwˈestʃən ˈaɪ ll sˈeɪ ˈɪt ˈes ə tɛn pərsˈent/",
        "properNouns": [],
        "keywords": [
            "good question",
            "ten percent"
        ],
        "explanationAi": "Sam chọn phỏng đoán phương án a) 10% theo trực giác ban đầu.",
        "tokenCount": 14
    },
    {
        "orderIndex": 18,
        "startTime": 100.56,
        "endTime": 104.5,
        "text": "Right. Well, I’ll reveal the answer later in the programme.",
        "translationVi": "Được rồi. Chà, tôi sẽ tiết lộ câu trả lời ở phần sau của chương trình.",
        "ipaUs": "/rˈaɪt wˈel ˈaɪ ll rɪvˈiːl ðə ˈænsər lˈeɪtər ɪn ðə prˈoʊɡrˌæm/",
        "properNouns": [],
        "keywords": [
            "reveal the answer",
            "later"
        ],
        "explanationAi": "Cụm 'reveal the answer' (tiết lộ đáp án) tạo sự tò mò và giữ chân thính giả đến cuối chương trình.",
        "tokenCount": 11
    },
    {
        "orderIndex": 19,
        "startTime": 104.5,
        "endTime": 111.24,
        "text": "Emotional eating is often caused by feelings of depression, anxiety or stress.",
        "translationVi": "Ăn uống theo cảm xúc thường xuất phát từ những cảm giác trầm cảm, lo âu hoặc căng thẳng.",
        "ipaUs": "/ɪmˈoʊʃənəl ˈiːtɪŋ ˈɪz ˈɔːfən kˈɑːzd bˈaɪ fˈiːlɪŋz ˈʌv dɪprˈeʃən æŋzˈaɪəti ˈɔːr strˈes/",
        "properNouns": [],
        "keywords": [
            "depression",
            "anxiety",
            "stress"
        ],
        "explanationAi": "Cấu trúc bị động 'is often caused by' chỉ ra nguyên nhân gốc rễ: trầm cảm (depression), lo âu (anxiety) hay stress.",
        "tokenCount": 12
    },
    {
        "orderIndex": 20,
        "startTime": 111.24,
        "endTime": 119.32,
        "text": "Chef Danny Edwards, who has suffered with depression, works in one of the most stressful places imaginable - a busy restaurant kitchen.",
        "translationVi": "Đầu bếp Danny Edwards, người từng trải qua chứng trầm cảm, làm việc ở một trong những nơi căng thẳng nhất có thể tưởng tượng được - gian bếp bận rộn của một nhà hàng.",
        "ipaUs": "/ʃˈef ˈdæni ˈedwərdz hˈuː hˈæz sˈʌfərd wˈɪð dɪprˈeʃən wˈɜːrks ɪn wˈʌn ˈʌv ðə mˈoʊst strˈesfəl plˈeɪsəz ˌɪmˈædʒənəbəl ə bˈɪzi rˈestərˌɑːnt kˈɪtʃən/",
        "properNouns": [
            "Danny Edwards"
        ],
        "keywords": [
            "chef",
            "stressful places",
            "busy kitchen"
        ],
        "explanationAi": "Mệnh đề quan hệ 'who has suffered with depression' bổ nghĩa cho đầu bếp Danny Edwards và môi trường bếp áp lực.",
        "tokenCount": 21
    },
    {
        "orderIndex": 21,
        "startTime": 119.32,
        "endTime": 123.48,
        "text": "BBC World Service programme, The Food Chain, asked Danny about his eating habits at work:",
        "translationVi": "Chương trình The Food Chain của đài BBC World Service đã hỏi Danny về thói quen ăn uống của anh tại nơi làm việc:",
        "ipaUs": "/bˌiːbisˈiː wˈɜːrld sˈɜːrvəs prˈoʊɡrˌæm ðə fˈuːd tʃˈeɪn ˈæskt ˈdæni əbˈaʊt hˈɪz ˈiːtɪŋ hˈæbəts ˈæt wˈɜːrk/",
        "properNouns": [
            "BBC World Service",
            "The Food Chain",
            "Danny"
        ],
        "keywords": [
            "eating habits",
            "work"
        ],
        "explanationAi": "Giới thiệu nguồn trích dẫn uy tín: chương trình The Food Chain trên sóng BBC World Service.",
        "tokenCount": 15
    },
    {
        "orderIndex": 22,
        "startTime": 123.48,
        "endTime": 136.84,
        "text": "Actually, when you’re working in a kitchen environment for long periods, your appetite can become suppressed because you sometimes don't want to eat, or you don't feel like you can stop and eat, and all of that.",
        "translationVi": "Thực ra, khi bạn làm việc trong môi trường nhà bếp suốt thời gian dài, cảm giác thèm ăn của bạn có thể bị kìm nén bởi vì đôi khi bạn chẳng muốn ăn, hoặc bạn cảm thấy mình không thể dừng tay lại để ăn, và tất cả những điều tương tự.",
        "ipaUs": "/ˈæktʃˌuːəli wˈen jˈuː rˈeɪ wˈɜːrkɪŋ ɪn ə kˈɪtʃən ɪnvˈaɪrənmənt fˈɔːr lˈɔːŋ pˈɪriədz jˈɔːr ˈæpətˌaɪt kˈæn bɪkˈʌm səprˈest bɪkˈɔːz jˈuː səmtˈaɪmz doʊnt wˈɑːnt tˈuː ˈiːt ˈɔːr jˈuː doʊnt fˈiːl lˈaɪk jˈuː kˈæn stˈɑːp ənd ˈiːt ənd ˈɔːl ˈʌv ðˈæt/",
        "properNouns": [],
        "keywords": [
            "appetite",
            "suppressed",
            "kitchen environment"
        ],
        "explanationAi": "Thuật ngữ y sinh 'appetite can become suppressed' nghĩa là cảm giác thèm ăn bị ức chế, triệt tiêu do căng thẳng kéo dài.",
        "tokenCount": 40
    },
    {
        "orderIndex": 23,
        "startTime": 136.84,
        "endTime": 142.84,
        "text": "So, it very often is grabbing something on the go which obviously, as we know, is not great for us…",
        "translationVi": "Vì thế, việc này rất thường là chụp vội thứ gì đó mang đi ăn, điều mà hiển nhiên như chúng ta đều biết, chẳng tốt chút nào cho cơ thể...",
        "ipaUs": "/sˈoʊ ˈɪt vˈeri ˈɔːfən ˈɪz ɡrˈæbɪŋ sˈʌmθɪŋ ˈɑːn ðə ɡˈoʊ wˈɪtʃ ˈɑːbviəsli ˈæz wˈiː nˈoʊ ˈɪz nˈɑːt ɡrˈeɪt fˈɔːr ˈʌs/",
        "properNouns": [],
        "keywords": [
            "grabbing something",
            "on the go"
        ],
        "explanationAi": "Cụm từ 'grabbing something on the go' chỉ hành động vồ lấy món ăn nhanh để ăn vội vã khi đang di chuyển.",
        "tokenCount": 20
    },
    {
        "orderIndex": 24,
        "startTime": 142.84,
        "endTime": 146.68,
        "text": "So you go for something that’s quick, so hence why a lot of chefs have quite a bad diet.",
        "translationVi": "Do đó bạn chọn thứ gì đó nhanh gọn, và đó là lý do vì sao rất nhiều đầu bếp lại có chế độ ăn uống khá tệ hại.",
        "ipaUs": "/sˈoʊ jˈuː ɡˈoʊ fˈɔːr sˈʌmθɪŋ ðˈæt ˈes kwˈɪk sˈoʊ hˈens wˈaɪ ə lˈɑːt ˈʌv ʃˈefs hˈæv kwˈaɪt ə bˈæd dˈaɪət/",
        "properNouns": [],
        "keywords": [
            "quick",
            "bad diet",
            "chefs"
        ],
        "explanationAi": "Liên từ kết quả 'hence why' (chính vì thế mà) giải thích lý do nhiều đầu bếp chuyên nghiệp có chế độ ăn không tốt.",
        "tokenCount": 20
    },
    {
        "orderIndex": 25,
        "startTime": 146.68,
        "endTime": 156.16,
        "text": "Even though he’s surrounded by food, Danny says that working under stress actually decreases his appetite – the feeling that you want to eat food.",
        "translationVi": "Mặc dù xung quanh ngập tràn đồ ăn, Danny cho biết làm việc dưới áp lực căng thẳng thực chất lại làm suy giảm sự thèm ăn của anh – cảm giác muốn ăn thức ăn.",
        "ipaUs": "/ˈiːvɪn ðˈoʊ hˈiː ˈes sərˈaʊndɪd bˈaɪ fˈuːd ˈdæni sˈez ðˈæt wˈɜːrkɪŋ ˈʌndər strˈes ˈæktʃˌuːəli dɪkrˈiːsəz hˈɪz ˈæpətˌaɪt ðə fˈiːlɪŋ ðˈæt jˈuː wˈɑːnt tˈuː ˈiːt fˈuːd/",
        "properNouns": [
            "Danny"
        ],
        "keywords": [
            "surrounded by food",
            "decreases appetite"
        ],
        "explanationAi": "Mệnh đề nhượng bộ 'Even though he’s surrounded by food' làm nổi bật nghịch lý: ở giữa đồ ăn mà vẫn chán ăn do stress.",
        "tokenCount": 25
    },
    {
        "orderIndex": 26,
        "startTime": 156.16,
        "endTime": 168.52,
        "text": "In a busy kitchen there’s no time for a sit-down meal, so Danny has to grab and go – take something quickly because he doesn’t have much time, although he knows this isn’t very healthy.",
        "translationVi": "Trong một gian bếp bận rộn không hề có thời gian cho một bữa ăn ngồi đàng hoàng, nên Danny phải ăn vội mang đi – lấy nhanh thứ gì đó vì anh không có nhiều thời gian, dẫu anh biết điều này không hề lành mạnh.",
        "ipaUs": "/ɪn ə bˈɪzi kˈɪtʃən ðˈer ˈes nˈoʊ tˈaɪm fˈɔːr ə sˈɪt dˈaʊn mˈiːl sˈoʊ ˈdæni hˈæz tˈuː ɡrˈæb ənd ɡˈoʊ tˈeɪk sˈʌmθɪŋ kwˈɪkli bɪkˈɔːz hˈiː doesn tˈiː hˈæv mˈʌtʃ tˈaɪm ˌɔːlðˈoʊ hˈiː nˈoʊz ðˈɪs isn tˈiː vˈeri hˈelθi/",
        "properNouns": [
            "Danny"
        ],
        "keywords": [
            "sit-down meal",
            "grab and go",
            "healthy"
        ],
        "explanationAi": "Định nghĩa thành ngữ 'grab and go': mua hoặc lấy thức ăn nhanh chóng khi không có thời gian ngồi ăn tử tế ('sit-down meal').",
        "tokenCount": 38
    },
    {
        "orderIndex": 27,
        "startTime": 168.52,
        "endTime": 173.5,
        "text": "So when even chefs have a difficult relationship with food, what about the rest of us?",
        "translationVi": "Vậy khi ngay cả những đầu bếp cũng gặp khó khăn trong mối quan hệ với thực phẩm, thì những người còn lại như chúng ta thì sao?",
        "ipaUs": "/sˈoʊ wˈen ˈiːvɪn ʃˈefs hˈæv ə dˈɪfəkəlt rilˈeɪʃənʃˌɪp wˈɪð fˈuːd wˈʌt əbˈaʊt ðə rˈest ˈʌv ˈʌs/",
        "properNouns": [],
        "keywords": [
            "difficult relationship",
            "rest of us"
        ],
        "explanationAi": "Câu hỏi tu từ 'what about the rest of us?' mở rộng vấn đề từ đầu bếp sang thói quen ăn uống của đại chúng.",
        "tokenCount": 16
    },
    {
        "orderIndex": 28,
        "startTime": 173.5,
        "endTime": 179.76,
        "text": "Professor Felice Jacka, is an expert in nutritional psychiatry.",
        "translationVi": "Giáo sư Felice Jacka là một chuyên gia về tâm thần học dinh dưỡng.",
        "ipaUs": "/prəfˈesər fəˈliːs ˈdʒækə ˈɪz ˈæn ˈekspərt ɪn nutrˈɪʃənəl saɪkˈaɪətri/",
        "properNouns": [
            "Felice Jacka"
        ],
        "keywords": [
            "expert",
            "nutritional psychiatry"
        ],
        "explanationAi": "Giới thiệu Giáo sư Felice Jacka và chuyên ngành 'nutritional psychiatry' (tâm thần học dinh dưỡng).",
        "tokenCount": 9
    },
    {
        "orderIndex": 29,
        "startTime": 179.76,
        "endTime": 190.56,
        "text": "She studied the effect of eating a healthy diet – food such as fresh fruit and vegetables, wholegrain cereals, and olive oil – on people suffering depression.",
        "translationVi": "Bà đã nghiên cứu tác động của việc áp dụng chế độ ăn lành mạnh – thực phẩm như hoa quả và rau tươi, ngũ cốc nguyên hạt và dầu ô liu – đối với những người đang mắc chứng trầm cảm.",
        "ipaUs": "/ʃˈiː stˈʌdid ðə ɪfˈekt ˈʌv ˈiːtɪŋ ə hˈelθi dˈaɪət fˈuːd sˈʌtʃ ˈæz frˈeʃ frˈuːt ənd vˈedʒtəbəlz ˈhoʊlɡreɪn sˈɪriəlz ənd ˈɑːləv ˈɔɪl ˈɑːn pˈiːpəl sˈʌfərɪŋ dɪprˈeʃən/",
        "properNouns": [],
        "keywords": [
            "healthy diet",
            "fresh fruit",
            "vegetables",
            "olive oil"
        ],
        "explanationAi": "Chế độ ăn Địa Trung Hải lành mạnh gồm rau quả tươi, ngũ cốc nguyên hạt (wholegrain cereals) và dầu ô liu.",
        "tokenCount": 25
    },
    {
        "orderIndex": 30,
        "startTime": 190.56,
        "endTime": 195.48,
        "text": "Professor Jacka found that the patients whose mental health improved were the same patients who had also improved their diet.",
        "translationVi": "Giáo sư Jacka phát hiện ra rằng những bệnh nhân có sức khỏe tinh thần được cải thiện cũng chính là những bệnh nhân đã nâng cao chất lượng chế độ ăn của mình.",
        "ipaUs": "/prəfˈesər ˈdʒækə fˈaʊnd ðˈæt ðə pˈeɪʃənts hˈuːz mˈentəl hˈelθ ˌɪmprˈuːvd wˈɜːr ðə sˈeɪm pˈeɪʃənts hˈuː hˈæd ˈɔːlsoʊ ˌɪmprˈuːvd ðˈer dˈaɪət/",
        "properNouns": [
            "Jacka"
        ],
        "keywords": [
            "mental health",
            "improved diet"
        ],
        "explanationAi": "Phát hiện cốt lõi: sức khỏe tinh thần cải thiện đồng hành mật thiết với việc nâng cấp chất lượng dinh dưỡng bữa ăn.",
        "tokenCount": 20
    },
    {
        "orderIndex": 31,
        "startTime": 195.48,
        "endTime": 200.0,
        "text": "But Professor Jacka’s ideas were not accepted by everyone.",
        "translationVi": "Nhưng những ý tưởng của Giáo sư Jacka không phải ai cũng chấp nhận.",
        "ipaUs": "/bˈʌt prəfˈesər ˈdʒækə ˈes aɪdˈiːəz wˈɜːr nˈɑːt æksˈeptɪd bˈaɪ ˈevriwˌʌn/",
        "properNouns": [
            "Jacka"
        ],
        "keywords": [
            "ideas",
            "not accepted"
        ],
        "explanationAi": "Mệnh đề 'were not accepted by everyone' phản ánh định kiến ban đầu của giới y khoa truyền thống.",
        "tokenCount": 10
    },
    {
        "orderIndex": 32,
        "startTime": 200.0,
        "endTime": 208.8,
        "text": "Here, she explains to Jordan Dunbar, presenter of BBC World Service’s, The Food Chain, about the opposition her study faced from other doctors:",
        "translationVi": "Tại đây, bà giải thích với Jordan Dunbar, người dẫn chương trình The Food Chain của đài BBC World Service, về sự phản đối mà nghiên cứu của bà phải đối mặt từ các bác sĩ khác:",
        "ipaUs": "/hˈiːr ʃˈiː ɪksplˈeɪnz tˈuː ˈdʒɔːrdən ˈdʌnbɑːr prˈezəntər ˈʌv bˌiːbisˈiː wˈɜːrld sˈɜːrvəs ˈes ðə fˈuːd tʃˈeɪn əbˈaʊt ðə ˌɑːpəzˈɪʃən hˈɜːr stˈʌdi fˈeɪst frˈʌm ˈʌðər dˈɑːktərz/",
        "properNouns": [
            "Jordan Dunbar",
            "BBC World Service",
            "The Food Chain"
        ],
        "keywords": [
            "presenter",
            "opposition",
            "doctors"
        ],
        "explanationAi": "Dẫn dắt vào cuộc phỏng vấn trực tiếp giữa GS Jacka và nhà báo Jordan Dunbar đài BBC.",
        "tokenCount": 24
    },
    {
        "orderIndex": 33,
        "startTime": 208.8,
        "endTime": 220.6,
        "text": "So I proposed to do this for my PhD study, and everyone thought I was a bit bananas, you know, and there was quite a bit of, I guess, eye rolling maybe.",
        "translationVi": "Nên tôi đã đề xuất thực hiện đề tài này cho nghiên cứu tiến sĩ của mình, và mọi người đều nghĩ tôi hơi bị điên rồ, bạn biết đấy, và có lẽ đã có khá nhiều cái đảo mắt ngán ngẩm.",
        "ipaUs": "/sˈoʊ ˈaɪ prəpˈoʊzd tˈuː dˈuː ðˈɪs fˈɔːr mˈaɪ pˈiːˌeɪtʃdˈiː stˈʌdi ənd ˈevriwˌʌn θˈɔːt ˈaɪ wˈɑːz ə bˈɪt bəˈnænəz jˈuː nˈoʊ ənd ðˈer wˈɑːz kwˈaɪt ə bˈɪt ˈʌv ˈaɪ ɡˈes ˈaɪ rˈoʊlɪŋ mˈeɪbi/",
        "properNouns": [],
        "keywords": [
            "phd study",
            "bananas",
            "eye rolling"
        ],
        "explanationAi": "Tiếng lóng 'a bit bananas' (hơi khùng/điên rồ) và cử chỉ 'eye rolling' (đảo mắt chán chường) của giới học thuật.",
        "tokenCount": 32
    },
    {
        "orderIndex": 34,
        "startTime": 220.6,
        "endTime": 225.5,
        "text": "I'm not surprised by that because the discipline of psychiatry was very medication and brain focused.",
        "translationVi": "Tôi không ngạc nhiên trước điều đó vì chuyên ngành tâm thần học khi ấy tập trung rất nặng vào thuốc men và não bộ.",
        "ipaUs": "/aɪm nˈɑːt sərprˈaɪzd bˈaɪ ðˈæt bɪkˈɔːz ðə dˈɪsəplən ˈʌv saɪkˈaɪətri wˈɑːz vˈeri mˌedəkˈeɪʃən ənd brˈeɪn fˈoʊkəst/",
        "properNouns": [],
        "keywords": [
            "psychiatry",
            "medication",
            "brain focused"
        ],
        "explanationAi": "Lý do: chuyên ngành tâm thần học trước đây chỉ thuần túy tập trung vào thuốc biệt dược ('medication') và não bộ.",
        "tokenCount": 17
    },
    {
        "orderIndex": 35,
        "startTime": 225.5,
        "endTime": 229.2,
        "text": "What did people say in the field? Were they sceptical?",
        "translationVi": "Những người trong ngành đã nói gì? Họ có hoài nghi không?",
        "ipaUs": "/wˈʌt dˈɪd pˈiːpəl sˈeɪ ɪn ðə fˈiːld wˈɜːr ðˈeɪ ˈskeptɪkəl/",
        "properNouns": [],
        "keywords": [
            "sceptical"
        ],
        "explanationAi": "Jordan Dunbar đặt câu hỏi chất vấn về phản ứng hoài nghi ('sceptical') của các đồng nghiệp trong ngành.",
        "tokenCount": 10
    },
    {
        "orderIndex": 36,
        "startTime": 229.2,
        "endTime": 233.5,
        "text": "Oh, hugely sceptical and sometimes very patronising.",
        "translationVi": "Ồ, cực kỳ hoài nghi và đôi khi rất trịch thượng kẻ cả.",
        "ipaUs": "/ˈoʊ hjˈuːdʒli ˈskeptɪkəl ənd səmtˈaɪmz vˈeri ˈpeɪtrənaɪzɪŋ/",
        "properNouns": [],
        "keywords": [
            "hugely sceptical",
            "patronising"
        ],
        "explanationAi": "Tính từ mạnh 'hugely sceptical' (vô cùng hoài nghi) và 'patronising' (thái độ kẻ cả, trịch thượng coi thường).",
        "tokenCount": 7
    },
    {
        "orderIndex": 37,
        "startTime": 233.5,
        "endTime": 244.52,
        "text": "But this again comes from the fact that general practitioners, psychiatrists, medical specialists get almost no nutrition training through all those years of study.",
        "translationVi": "Nhưng điều này một lần nữa bắt nguồn từ thực tế là các bác sĩ đa khoa, bác sĩ tâm thần, các chuyên gia y tế hầu như không được đào tạo về dinh dưỡng trong suốt ngần ấy năm học tập.",
        "ipaUs": "/bˈʌt ðˈɪs əɡˈen kˈʌmz frˈʌm ðə fˈækt ðˈæt dʒˈenərəl præktˈɪʃənərz səkˈaɪətrəsts mˈedəkəl spˈeʃələsts ɡˈet ˈɔːlmˌoʊst nˈoʊ nutrˈɪʃən trˈeɪnɪŋ θrˈuː ˈɔːl ðˈoʊz jˈɪrz ˈʌv stˈʌdi/",
        "properNouns": [],
        "keywords": [
            "general practitioners",
            "psychiatrists",
            "nutrition training"
        ],
        "explanationAi": "Chỉ ra lỗ hổng giáo dục y khoa: bác sĩ và chuyên gia tâm thần hầu như không được đào tạo về dinh dưỡng trong trường y.",
        "tokenCount": 24
    },
    {
        "orderIndex": 38,
        "startTime": 244.52,
        "endTime": 253.5,
        "text": "When Professor Jacka investigated the link between food and mood, her colleagues thought she was bananas – a slang word meaning silly or crazy.",
        "translationVi": "Khi Giáo sư Jacka điều tra mối liên hệ giữa thức ăn và tâm trạng, các đồng nghiệp nghĩ bà bị 'bananas' – một từ lóng có nghĩa là ngớ ngẩn hoặc điên rồ.",
        "ipaUs": "/wˈen prəfˈesər ˈdʒækə ˌɪnvˈestəɡˌeɪtəd ðə lˈɪŋk bɪtwˈiːn fˈuːd ənd mˈuːd hˈɜːr kˈɑːliɡz θˈɔːt ʃˈiː wˈɑːz bəˈnænəz ə slˈæŋ wˈɜːrd mˈiːnɪŋ sˈɪli ˈɔːr krˈeɪzi/",
        "properNouns": [
            "Jacka"
        ],
        "keywords": [
            "bananas",
            "slang",
            "silly",
            "crazy"
        ],
        "explanationAi": "Rob giải nghĩa từ lóng 'bananas' là cách nói bình dân chỉ sự ngớ ngẩn (silly) hoặc điên rồ (crazy).",
        "tokenCount": 23
    },
    {
        "orderIndex": 39,
        "startTime": 253.5,
        "endTime": 262.92,
        "text": "They rolled their eyes – a phrase which describes the gesture of turning your eyes upwards to express annoyance, boredom or disbelief.",
        "translationVi": "Họ đã đảo mắt – một cụm từ miêu tả hành động hướng mắt lên trên để thể hiện sự bực bội, buồn chán hoặc không tin tưởng.",
        "ipaUs": "/ðˈeɪ rˈoʊld ðˈer ˈaɪz ə frˈeɪz wˈɪtʃ dɪskrˈaɪbz ðə dʒˈestʃər ˈʌv tˈɜːrnɪŋ jˈɔːr ˈaɪz ˈʌpwərdz tˈuː ɪksprˈes ənˈɔɪəns bˈɔːrdəm ˈɔːr dˌɪsbɪlˈiːf/",
        "properNouns": [],
        "keywords": [
            "rolled their eyes",
            "annoyance",
            "disbelief"
        ],
        "explanationAi": "Giải thích hành động 'roll their eyes': đảo mắt lên trên biểu lộ sự bực mình, ngán ngẩm hoặc không tin tưởng.",
        "tokenCount": 21
    },
    {
        "orderIndex": 40,
        "startTime": 262.92,
        "endTime": 271.2,
        "text": "Other colleagues were patronising – they behaved towards her as if she were stupid or unimportant.",
        "translationVi": "Các đồng nghiệp khác thì trịch thượng – họ cư xử với bà như thể bà ngốc nghếch hoặc chẳng quan trọng gì.",
        "ipaUs": "/ˈʌðər kˈɑːliɡz wˈɜːr ˈpeɪtrənaɪzɪŋ ðˈeɪ bɪhˈeɪvd təwˈɔːrdz hˈɜːr ˈæz ˈɪf ʃˈiː wˈɜːr stˈuːpəd ˈɔːr ənɪmpˈɔːrtənt/",
        "properNouns": [],
        "keywords": [
            "patronising",
            "stupid",
            "unimportant"
        ],
        "explanationAi": "Định nghĩa từ vựng 'patronising': cư xử với người khác với vẻ bề trên trịch thượng như thể họ ngu ngốc.",
        "tokenCount": 15
    },
    {
        "orderIndex": 41,
        "startTime": 271.2,
        "endTime": 278.96,
        "text": "Professor Jacka thinks this is because most doctors have little or no training about nutrition and the effect of food on mental health.",
        "translationVi": "Giáo sư Jacka cho rằng điều này là do hầu hết các bác sĩ được đào tạo rất ít hoặc không hề được đào tạo về dinh dưỡng và tác động của thực phẩm đối với sức khỏe tinh thần.",
        "ipaUs": "/prəfˈesər ˈdʒækə θˈɪŋks ðˈɪs ˈɪz bɪkˈɔːz mˈoʊst dˈɑːktərz hˈæv lˈɪtəl ˈɔːr nˈoʊ trˈeɪnɪŋ əbˈaʊt nutrˈɪʃən ənd ðə ɪfˈekt ˈʌv fˈuːd ˈɑːn mˈentəl hˈelθ/",
        "properNouns": [
            "Jacka"
        ],
        "keywords": [
            "doctors",
            "training",
            "nutrition"
        ],
        "explanationAi": "Nhắc lại nguyên nhân cốt lõi khiến các bác sĩ thiếu am hiểu về tác động của thức ăn lên sức khỏe tâm thần.",
        "tokenCount": 23
    },
    {
        "orderIndex": 42,
        "startTime": 278.96,
        "endTime": 289.56,
        "text": "But her ground-breaking research, named ‘The Smile Trial’, has been successfully repeated elsewhere, clearly showing the link between eating well and feeling good.",
        "translationVi": "Nhưng nghiên cứu mang tính đột phá của bà, mang tên 'The Smile Trial', đã được lặp lại thành công ở nhiều nơi khác, chứng minh rõ ràng mối liên kết giữa việc ăn uống tốt và cảm thấy vui khỏe.",
        "ipaUs": "/bˈʌt hˈɜːr ɡrˈaʊnd brˈeɪkɪŋ risˈɜːrtʃ nˈeɪmd ðə smˈaɪl trˈaɪəl hˈæz bˈɪn səksˈesfəli rɪpˈiːtɪd ˈelswˌer klˈɪrli ʃˈoʊɪŋ ðə lˈɪŋk bɪtwˈiːn ˈiːtɪŋ wˈel ənd fˈiːlɪŋ ɡˈʊd/",
        "properNouns": [
            "The Smile Trial"
        ],
        "keywords": [
            "ground-breaking",
            "The Smile Trial",
            "eating well"
        ],
        "explanationAi": "Thử nghiệm lâm sàng bước ngoặt mang tên 'The Smile Trial' đã chứng minh thuyết phục: ăn ngon giúp tâm trạng sảng khoái.",
        "tokenCount": 24
    },
    {
        "orderIndex": 43,
        "startTime": 289.56,
        "endTime": 297.52,
        "text": "So, the next time you’re feeling down and your brain is calling out for a donut, you might be better eating an apple instead!",
        "translationVi": "Vì thế, lần tới khi bạn cảm thấy chán nản và bộ não réo gọi một chiếc bánh donut, bạn có lẽ nên ăn một quả táo thay thế thì tốt hơn!",
        "ipaUs": "/sˈoʊ ðə nˈekst tˈaɪm jˈuː rˈeɪ fˈiːlɪŋ dˈaʊn ənd jˈɔːr brˈeɪn ˈɪz kˈɔːlɪŋ ˈaʊt fˈɔːr ə dˈoʊnˌʌt jˈuː mˈaɪt bˈiː bˈetər ˈiːtɪŋ ˈæn ˈæpəl ˌɪnstˈed/",
        "properNouns": [],
        "keywords": [
            "feeling down",
            "donut",
            "apple"
        ],
        "explanationAi": "Lời khuyên dí dỏm: khi buồn chán não thèm donut nhiều đường, hãy thay thế bằng một quả táo tươi mát bổ dưỡng.",
        "tokenCount": 25
    },
    {
        "orderIndex": 44,
        "startTime": 297.52,
        "endTime": 301.96,
        "text": "And speaking of brains, Sam, it’s time to reveal the answer to my question.",
        "translationVi": "Và nhắc đến não bộ, Sam này, đã đến lúc tiết lộ câu trả lời cho câu hỏi của tôi rồi.",
        "ipaUs": "/ənd spˈiːkɪŋ ˈʌv brˈeɪnz sæm ˈɪt ˈes tˈaɪm tˈuː rɪvˈiːl ðə ˈænsər tˈuː mˈaɪ kwˈestʃən/",
        "properNouns": [
            "Sam"
        ],
        "keywords": [
            "brains",
            "reveal the answer"
        ],
        "explanationAi": "Rob khéo léo kết nối từ ẩn dụ bộ não để quay lại công bố đáp án cho câu hỏi đố đầu chương trình.",
        "tokenCount": 15
    },
    {
        "orderIndex": 45,
        "startTime": 302.72,
        "endTime": 307.0,
        "text": "Yes, you asked me how much of the body’s energy is used up by the brain.",
        "translationVi": "Vâng, anh đã hỏi tôi bao nhiêu phần trăm năng lượng cơ thể được não bộ tiêu thụ.",
        "ipaUs": "/jˈes jˈuː ˈæskt mˈiː hˈaʊ mˈʌtʃ ˈʌv ðə bˈɑːdi ˈes ˈenərdʒi ˈɪz jˈuːzd ˈʌp bˈaɪ ðə brˈeɪn/",
        "properNouns": [],
        "keywords": [
            "energy",
            "used up"
        ],
        "explanationAi": "Sam nhắc lại câu hỏi về lượng năng lượng cơ thể mà não bộ tiêu thụ.",
        "tokenCount": 17
    },
    {
        "orderIndex": 46,
        "startTime": 307.0,
        "endTime": 310.24,
        "text": "And I guessed it was ten percent…",
        "translationVi": "Và tôi đã đoán là mười phần trăm...",
        "ipaUs": "/ənd ˈaɪ ɡˈest ˈɪt wˈɑːz tˈen pərsˈent/",
        "properNouns": [],
        "keywords": [
            "guessed",
            "ten percent"
        ],
        "explanationAi": "Sam nhắc lại phỏng đoán 10% của mình ở đầu giờ.",
        "tokenCount": 7
    },
    {
        "orderIndex": 47,
        "startTime": 310.24,
        "endTime": 313.56,
        "text": "Well, I’m afraid you are wrong.",
        "translationVi": "Chà, tôi e là bạn đoán sai rồi.",
        "ipaUs": "/wˈel ˈaɪ ˈem əfrˈeɪd jˈuː ˈɑːr rˈɔːŋ/",
        "properNouns": [],
        "keywords": [
            "afraid",
            "wrong"
        ],
        "explanationAi": "Cách nói lịch sự của Rob khi thông báo đối phương đoán sai: 'Well, I'm afraid you are wrong'.",
        "tokenCount": 7
    },
    {
        "orderIndex": 48,
        "startTime": 313.56,
        "endTime": 321.0,
        "text": "In fact, around 20 percent of the body’s energy goes to feeding the brain, even though it only makes up two percent of our total body weight.",
        "translationVi": "Trên thực tế, khoảng 20 phần trăm năng lượng cơ thể được dùng để nuôi não bộ, mặc dù nó chỉ chiếm hai phần trăm tổng trọng lượng cơ thể chúng ta.",
        "ipaUs": "/ɪn fˈækt ərˈaʊnd ˈtwɛnti pərsˈent ˈʌv ðə bˈɑːdi ˈes ˈenərdʒi ɡˈoʊz tˈuː fˈiːdɪŋ ðə brˈeɪn ˈiːvɪn ðˈoʊ ˈɪt ˈoʊnli mˈeɪks ˈʌp tˈuː pərsˈent ˈʌv ˈaʊər tˈoʊtəl bˈɑːdi wˈeɪt/",
        "properNouns": [],
        "keywords": [
            "twenty percent",
            "feeding the brain",
            "body weight"
        ],
        "explanationAi": "Số liệu khoa học ấn tượng: não chỉ nặng 2% khối lượng nhưng tiêu tốn tới 20% tổng năng lượng toàn cơ thể.",
        "tokenCount": 28
    },
    {
        "orderIndex": 49,
        "startTime": 321.0,
        "endTime": 330.72,
        "text": "OK, let’s recap the vocabulary we’ve learned from our discussion about emotional eating - that's eating too much food because of how you feel, not because you’re hungry.",
        "translationVi": "Được rồi, hãy cùng điểm lại các từ vựng chúng ta đã học từ cuộc thảo luận về 'emotional eating' - đó là việc ăn quá nhiều thức ăn vì cảm xúc của bạn, chứ không phải vì bạn đang đói.",
        "ipaUs": "/ˈoʊkˈeɪ lˈet ˈes rˈiːkˌæp ðə voʊkˈæbjəlˌeri wˈiː vˈiː lˈɜːrnd frˈʌm ˈaʊər dɪskˈʌʃən əbˈaʊt ɪmˈoʊʃənəl ˈiːtɪŋ ðæts ˈiːtɪŋ tˈuː mˈʌtʃ fˈuːd bɪkˈɔːz ˈʌv hˈaʊ jˈuː fˈiːl nˈɑːt bɪkˈɔːz jˈuː rˈeɪ hˈʌŋɡri/",
        "properNouns": [],
        "keywords": [
            "recap",
            "vocabulary",
            "emotional eating"
        ],
        "explanationAi": "Bắt đầu phần tổng kết từ vựng (recap vocabulary), củng cố lại khái niệm 'emotional eating'.",
        "tokenCount": 31
    },
    {
        "orderIndex": 50,
        "startTime": 330.72,
        "endTime": 333.76,
        "text": "Appetite is the desire to eat food.",
        "translationVi": "'Appetite' là sự thèm ăn, cảm giác ham muốn ăn thức ăn.",
        "ipaUs": "/ˈæpətˌaɪt ˈɪz ðə dɪzˈaɪər tˈuː ˈiːt fˈuːd/",
        "properNouns": [],
        "keywords": [
            "appetite",
            "desire to eat"
        ],
        "explanationAi": "Định nghĩa chuẩn xác từ vựng 'appetite': lòng ham muốn hoặc cảm giác thèm ăn thức ăn.",
        "tokenCount": 7
    },
    {
        "orderIndex": 51,
        "startTime": 333.76,
        "endTime": 340.88,
        "text": "If you grab and go, you take something quickly because you don’t have much time.",
        "translationVi": "Nếu bạn 'grab and go', bạn lấy thứ gì đó thật nhanh vì bạn không có nhiều thời gian.",
        "ipaUs": "/ˈɪf jˈuː ɡrˈæb ənd ɡˈoʊ jˈuː tˈeɪk sˈʌmθɪŋ kwˈɪkli bɪkˈɔːz jˈuː dˈɑːn tˈiː hˈæv mˈʌtʃ tˈaɪm/",
        "properNouns": [],
        "keywords": [
            "grab and go",
            "quickly"
        ],
        "explanationAi": "Tổng kết thành ngữ 'grab and go': lấy đồ ăn nhanh mang đi vì quỹ thời gian eo hẹp.",
        "tokenCount": 16
    },
    {
        "orderIndex": 52,
        "startTime": 340.88,
        "endTime": 345.04,
        "text": "Calling someone bananas is slang for silly or crazy.",
        "translationVi": "Gọi ai đó là 'bananas' là tiếng lóng chỉ sự ngớ ngẩn hoặc điên rồ.",
        "ipaUs": "/kˈɔːlɪŋ sˈʌmwˌʌn bəˈnænəz ˈɪz slˈæŋ fˈɔːr sˈɪli ˈɔːr krˈeɪzi/",
        "properNouns": [],
        "keywords": [
            "bananas",
            "silly",
            "crazy"
        ],
        "explanationAi": "Tổng kết từ lóng 'bananas': ngớ ngẩn hoặc điên rồ.",
        "tokenCount": 9
    },
    {
        "orderIndex": 53,
        "startTime": 345.04,
        "endTime": 352.28,
        "text": "If you roll your eyes, you move your eyes upwards to show you feel annoyed, bored or don’t believe what someone is telling you.",
        "translationVi": "Nếu bạn 'roll your eyes', bạn đảo mắt lên trên để biểu thị rằng bạn cảm thấy khó chịu, buồn tẻ hoặc không tin điều ai đó đang nói với bạn.",
        "ipaUs": "/ˈɪf jˈuː rˈoʊl jˈɔːr ˈaɪz jˈuː mˈuːv jˈɔːr ˈaɪz ˈʌpwərdz tˈuː ʃˈoʊ jˈuː fˈiːl ənˈɔɪd bˈɔːrd ˈɔːr dˈɑːn tˈiː bɪlˈiːv wˈʌt sˈʌmwˌʌn ˈɪz tˈelɪŋ jˈuː/",
        "properNouns": [],
        "keywords": [
            "roll your eyes",
            "annoyed",
            "bored"
        ],
        "explanationAi": "Tổng kết cụm hành vi 'roll your eyes': đảo mắt lên biểu lộ sự bực dọc, hoài nghi.",
        "tokenCount": 25
    },
    {
        "orderIndex": 54,
        "startTime": 352.28,
        "endTime": 359.04,
        "text": "And finally, if someone is patronising you, they speak or behave towards you as if you were stupid or unimportant.",
        "translationVi": "Và cuối cùng, nếu ai đó đang 'patronising' bạn, họ nói chuyện hoặc cư xử với bạn như thể bạn ngu ngốc hoặc chẳng quan trọng gì.",
        "ipaUs": "/ənd fˈaɪnəli ˈɪf sˈʌmwˌʌn ˈɪz ˈpeɪtrənaɪzɪŋ jˈuː ðˈeɪ spˈiːk ˈɔːr bɪhˈeɪv təwˈɔːrdz jˈuː ˈæz ˈɪf jˈuː wˈɜːr stˈuːpəd ˈɔːr ənɪmpˈɔːrtənt/",
        "properNouns": [],
        "keywords": [
            "patronising",
            "behave",
            "unimportant"
        ],
        "explanationAi": "Tổng kết tính từ 'patronising': nói chuyện hoặc hành xử kẻ cả xem thường người khác.",
        "tokenCount": 20
    },
    {
        "orderIndex": 55,
        "startTime": 360.24,
        "endTime": 362.16,
        "text": "That's the end of our programme.",
        "translationVi": "Đó là phần kết thúc của chương trình chúng ta hôm nay.",
        "ipaUs": "/ðæts ðə ˈend ˈʌv ˈaʊər prˈoʊɡrˌæm/",
        "properNouns": [],
        "keywords": [
            "end of our programme"
        ],
        "explanationAi": "Lời báo hiệu kết thúc chương trình 6 Minute English thường lệ.",
        "tokenCount": 7
    },
    {
        "orderIndex": 56,
        "startTime": 362.16,
        "endTime": 368.08,
        "text": "Don’t forget to join us again soon for more topical discussion and useful vocabulary here at 6 Minute English. Bye, everyone!",
        "translationVi": "Đừng quên sớm tham gia lại cùng chúng tôi để đón nhận thêm nhiều cuộc thảo luận thời sự và từ vựng hữu ích tại 6 Minute English nhé. Tạm biệt mọi người!",
        "ipaUs": "/dˈɑːn tˈiː fərɡˈet tˈuː dʒˈɔɪn ˈʌs əɡˈen sˈuːn fˈɔːr mˈɔːr tˈɑːpəkəl dɪskˈʌʃən ənd jˈuːsfəl voʊkˈæbjəlˌeri hˈiːr ˈæt sɪks mˈɪnət ˈɪŋɡlɪʃ bˈaɪ ˈevriwˌʌn/",
        "properNouns": [
            "BBC Learning English"
        ],
        "keywords": [
            "join us",
            "topical discussion",
            "useful vocabulary"
        ],
        "explanationAi": "Lời chào tạm biệt và hẹn gặp lại thính giả trong các chủ đề thời sự tiếp theo của Sam.",
        "tokenCount": 22
    },
    {
        "orderIndex": 57,
        "startTime": 368.08,
        "endTime": 368.6,
        "text": "Bye!",
        "translationVi": "Tạm biệt!",
        "ipaUs": "/bˈaɪ/",
        "properNouns": [],
        "keywords": [
            "bye"
        ],
        "explanationAi": "Lời chào tạm biệt dứt khoát kết thúc chương trình của Rob.",
        "tokenCount": 1
    }
]
};
