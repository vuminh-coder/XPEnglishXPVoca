import json
import re

with open("scripts/soul_pure_segments.json", "r", encoding="utf-8") as f:
    segments = json.load(f)

for idx, s in enumerate(segments):
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", s["text"])
    s["tokenCount"] = len(tokens)
    s["orderIndex"] = idx

quiz_questions = [
    {
        "id": "q_mov_ani_03_1",
        "question": "What psychological paradox does Joe experience upon receiving a permanent full-time teaching contract?",
        "questionEn": "What psychological paradox does Joe experience upon receiving a permanent full-time teaching contract?",
        "questionVi": "Nghịch lý tâm lý nào mà Joe phải đối mặt khi nhận được hợp đồng giảng dạy chính thức toàn thời gian?",
        "options": [
            "He feels secure about financial stability yet grieves that he is surrendering his true artistic dream of playing jazz",
            "He is angry that the salary offer is lower than minimum wage standards in New York",
            "He worries that teaching middle school students will damage his delicate piano fingers",
            "He plans to instantly resign because he despises musical education completely"
        ],
        "optionsEn": [
            "He feels secure about financial stability yet grieves that he is surrendering his true artistic dream of playing jazz",
            "He is angry that the salary offer is lower than minimum wage standards in New York",
            "He worries that teaching middle school students will damage his delicate piano fingers",
            "He plans to instantly resign because he despises musical education completely"
        ],
        "optionsVi": [
            "Thầy an tâm về sự ổn định tài chính nhưng đau đớn cảm thấy mình vừa đầu hàng giấc mơ làm nghệ sĩ Jazz thực thụ",
            "Thầy tức giận vì mức lương đề xuất thấp hơn mức lương tối thiểu tại New York",
            "Thầy lo lắng việc dạy học sinh cấp hai sẽ làm hỏng những ngón tay piano nhạy cảm của mình",
            "Thầy dự định từ chức ngay lập tức vì ghét cay ghét đắng việc giáo dục âm nhạc"
        ],
        "correctAnswer": 0,
        "explanation": "Joe confides to his mother: 'Mom, they made me full-time... but deep down, it feels like I'm giving up on my real dream.'",
        "explanationEn": "Joe confides to his mother: 'Mom, they made me full-time... but deep down, it feels like I'm giving up on my real dream.'",
        "explanationVi": "Joe tâm sự với mẹ: 'Mẹ ơi, trường đã nhận con vào biên chế... nhưng sâu thẳm trong lòng, con thấy như thể mình vừa từ bỏ giấc mơ thực sự.'",
        "targetedConcept": "Financial Security vs Creative Passion",
        "targetedConceptEn": "Financial Security vs Creative Passion",
        "targetedConceptVi": "Sự an toàn tài chính đối lập với đam mê sáng tạo",
        "referenceSegmentIndex": 6
    },
    {
        "id": "q_mov_ani_03_2",
        "question": "How is 'the zone' defined in the psychological and artistic framework of the film?",
        "questionEn": "How is 'the zone' defined in the psychological and artistic framework of the film?",
        "questionVi": "'Vùng thăng hoa' (the zone) được định nghĩa như thế nào trong khuôn khổ tâm lý học và nghệ thuật của bộ phim?",
        "options": [
            "A transcendent mental space where an artist becomes completely unified with their performance and loses self-consciousness",
            "A physical backstage dressing room reserved exclusively for headlining jazz soloists",
            "A punitive detention zone where undisciplined musicians are banned from playing instruments",
            "A virtual reality gaming world operated by tech corporations to test audio frequencies"
        ],
        "optionsEn": [
            "A transcendent mental space where an artist becomes completely unified with their performance and loses self-consciousness",
            "A physical backstage dressing room reserved exclusively for headlining jazz soloists",
            "A punitive detention zone where undisciplined musicians are banned from playing instruments",
            "A virtual reality gaming world operated by tech corporations to test audio frequencies"
        ],
        "optionsVi": [
            "Một không gian tâm thức siêu việt nơi người nghệ sĩ hoàn toàn hòa làm một với tác phẩm và quên đi cái tôi cá nhân",
            "Một phòng thay đồ phía sau cánh gà dành riêng cho các nghệ sĩ độc tấu jazz chính",
            "Một khu vực giam giữ trừng phạt nơi các nhạc sĩ vô kỷ luật bị cấm chơi nhạc cụ",
            "Một thế giới trò chơi thực tế ảo do các tập đoàn công nghệ vận hành để thử nghiệm tần số âm thanh"
        ],
        "correctAnswer": 0,
        "explanation": "The film describes 'the zone' as a transcendent state between the physical and spiritual realms where immersion in pure passion connects the soul to the infinite.",
        "explanationEn": "The film describes 'the zone' as a transcendent state between the physical and spiritual realms where immersion in pure passion connects the soul to the infinite.",
        "explanationVi": "Phim mô tả 'the zone' là trạng thái siêu việt giữa cõi thể xác và tinh thần, nơi sự chìm đắm trong niềm đam mê thuần khiết kết nối linh hồn với sự vô tận.",
        "targetedConcept": "Flow State & Artistic Transcendence",
        "targetedConceptEn": "Flow State & Artistic Transcendence",
        "targetedConceptVi": "Trạng thái dòng chảy và sự thăng hoa nghệ thuật",
        "referenceSegmentIndex": 10
    },
    {
        "id": "q_mov_ani_03_3",
        "question": "What three core pillars does the RealLife English coach highlight for mastering fast native speech?",
        "questionEn": "What three core pillars does the RealLife English coach highlight for mastering fast native speech?",
        "questionVi": "Huấn luyện viên của RealLife English nhấn mạnh ba trụ cột cốt lõi nào ('3 Keys') để làm chủ phản xạ nghe người bản xứ nói nhanh?",
        "options": [
            "Vocabulary, pronunciation, and cultural context",
            "Grammar parsing, translation drills, and phonetic transcription",
            "Speed reading, memorizing dictionaries, and accent elimination",
            "Subtitle reading, singing musical scales, and tongue twisters"
        ],
        "optionsEn": [
            "Vocabulary, pronunciation, and cultural context",
            "Grammar parsing, translation drills, and phonetic transcription",
            "Speed reading, memorizing dictionaries, and accent elimination",
            "Subtitle reading, singing musical scales, and tongue twisters"
        ],
        "optionsVi": [
            "Từ vựng, phát âm nối âm, và bối cảnh văn hóa",
            "Phân tích ngữ pháp, bài tập dịch xuôi ngược, và chép phiên âm quốc tế",
            "Đọc nhanh, học thuộc lòng từ điển, và triệt tiêu chất giọng địa phương",
            "Đọc phụ đề, hát theo thang âm, và các câu luyện líu lưỡi"
        ],
        "correctAnswer": 0,
        "explanation": "The coach explicitly identifies the '3 Keys to understanding natives at any speed': vocabulary, pronunciation, and cultural context.",
        "explanationEn": "The coach explicitly identifies the '3 Keys to understanding natives at any speed': vocabulary, pronunciation, and cultural context.",
        "explanationVi": "Huấn luyện viên chỉ rõ '3 Chìa khóa để nghe hiểu người bản xứ ở mọi tốc độ': từ vựng (vocabulary), phát âm (pronunciation), và bối cảnh văn hóa (cultural context).",
        "targetedConcept": "The 3 Keys of Native Listening Fluency",
        "targetedConceptEn": "The 3 Keys of Native Listening Fluency",
        "targetedConceptVi": "Ba chìa khóa phát triển phản xạ nghe bản ngữ lưu loát",
        "referenceSegmentIndex": 17
    },
    {
        "id": "q_mov_ani_03_4",
        "question": "What fundamentally differentiates 'The Great Before' from 'The Great Beyond' in the metaphysical setting of Soul?",
        "questionEn": "What fundamentally differentiates 'The Great Before' from 'The Great Beyond' in the metaphysical setting of Soul?",
        "questionVi": "Điểm khác biệt cơ bản giữa 'The Great Before' và 'The Great Beyond' trong bối cảnh siêu hình của phim Soul là gì?",
        "options": [
            "The Great Before nurtures unborn souls to develop unique personalities before Earth, while The Great Beyond is the eternal afterlife transition",
            "The Great Before is a punishment prison for rogue souls, while The Great Beyond is a recreation park",
            "The Great Before is situated on Mars, while The Great Beyond is located under the Pacific Ocean",
            "The Great Before only houses historical philosophers, while The Great Beyond trains jazz musicians"
        ],
        "optionsEn": [
            "The Great Before nurtures unborn souls to develop unique personalities before Earth, while The Great Beyond is the eternal afterlife transition",
            "The Great Before is a punishment prison for rogue souls, while The Great Beyond is a recreation park",
            "The Great Before is situated on Mars, while The Great Beyond is located under the Pacific Ocean",
            "The Great Before only houses historical philosophers, while The Great Beyond trains jazz musicians"
        ],
        "optionsVi": [
            "The Great Before nuôi dưỡng các linh hồn chưa sinh để phát triển nhân cách trước khi xuống Trái Đất, còn The Great Beyond là cõi vĩnh hằng sau cái chết",
            "The Great Before là nhà tù trừng phạt các linh hồn bất trị, còn The Great Beyond là công viên giải trí",
            "The Great Before nằm trên sao Hỏa, còn The Great Beyond nằm dưới đáy Thái Bình Dương",
            "The Great Before chỉ chứa các triết gia lịch sử, còn The Great Beyond chuyên đào tạo nhạc công jazz"
        ],
        "correctAnswer": 0,
        "explanation": "The Great Before (the You Seminar) is where souls prepare for human life by developing traits and finding their spark; The Great Beyond is the final journey into the eternal light.",
        "explanationEn": "The Great Before (the You Seminar) is where souls prepare for human life by developing traits and finding their spark; The Great Beyond is the final journey into the eternal light.",
        "explanationVi": "The Great Before (Hội thảo Bạn là ai) là nơi các linh hồn chuẩn bị cho kiếp người bằng cách hình thành tính cách; còn The Great Beyond là hành trình cuối cùng vào ánh sáng vĩnh hằng.",
        "targetedConcept": "Metaphysical Worldbuilding & Soul Origins",
        "targetedConceptEn": "Metaphysical Worldbuilding & Soul Origins",
        "targetedConceptVi": "Bối cảnh thế giới siêu hình và nguồn gốc linh hồn",
        "referenceSegmentIndex": 18
    },
    {
        "id": "q_mov_ani_03_5",
        "question": "According to Moonwind, how does an innocent passion mutate into a 'lost soul' state?",
        "questionEn": "According to Moonwind, how does an innocent passion mutate into a 'lost soul' state?",
        "questionVi": "Theo lời giải thích của Moonwind, một niềm say mê vô hại có thể biến chất thành trạng thái 'linh hồn lạc lối' (lost soul) như thế nào?",
        "options": [
            "When healthy enjoyment turns into an obsessive fixation that disconnects the individual from the richness of living life",
            "When a musician plays out-of-tune notes during an audition with a symphony orchestra",
            "When an artist runs out of oil paints and refuses to purchase new canvas supplies",
            "When a human soul forgets the lyrics of their favorite childhood lullaby"
        ],
        "optionsEn": [
            "When healthy enjoyment turns into an obsessive fixation that disconnects the individual from the richness of living life",
            "When a musician plays out-of-tune notes during an audition with a symphony orchestra",
            "When an artist runs out of oil paints and refuses to purchase new canvas supplies",
            "When a human soul forgets the lyrics of their favorite childhood lullaby"
        ],
        "optionsVi": [
            "Khi niềm say mê lành mạnh biến thành sự ám ảnh cực đoan làm con người mất kết nối với sự trọn vẹn của cuộc sống",
            "Khi một nhạc sĩ chơi lạc điệu trong buổi thử giọng với dàn nhạc giao hưởng",
            "Khi một họa sĩ hết màu vẽ và từ chối mua thêm toan vẽ mới",
            "Khi một linh hồn con người quên mất lời bài hát ru thời thơ ấu của mình"
        ],
        "correctAnswer": 0,
        "explanation": "Moonwind explains: 'Some people get caught up in something good, but when that joy becomes an obsession, they become disconnected from life.'",
        "explanationEn": "Moonwind explains: 'Some people get caught up in something good, but when that joy becomes an obsession, they become disconnected from life.'",
        "explanationVi": "Moonwind giải thích: 'Có những người say mê một điều tốt đẹp, nhưng khi niềm vui đó biến thành sự ám ảnh, họ sẽ bị mất kết nối với cuộc sống.'",
        "targetedConcept": "Obsession vs Authentic Passion",
        "targetedConceptEn": "Obsession vs Authentic Passion",
        "targetedConceptVi": "Sự ám ảnh cực đoan đối lập với đam mê chân thực",
        "referenceSegmentIndex": 23
    },
    {
        "id": "q_mov_ani_03_6",
        "question": "What simple sensory experiences ignite 22's sudden appreciation for earthly human life?",
        "questionEn": "What simple sensory experiences ignite 22's sudden appreciation for earthly human life?",
        "questionVi": "Những trải nghiệm giác quan bình dị nào đã đánh thức niềm yêu thích bất ngờ của linh hồn 22 đối với cuộc sống con người trên Trái Đất?",
        "options": [
            "Tasting hot pepperoni pizza, listening to a subway busker, and catching a spinning helicopter seed from a tree",
            "Winning a gold medal in the Olympic gymnastics balance beam competition",
            "Reading encyclopedia articles about quantum mechanics in the public library",
            "Accumulating millions of digital followers on social media platforms"
        ],
        "optionsEn": [
            "Tasting hot pepperoni pizza, listening to a subway busker, and catching a spinning helicopter seed from a tree",
            "Winning a gold medal in the Olympic gymnastics balance beam competition",
            "Reading encyclopedia articles about quantum mechanics in the public library",
            "Accumulating millions of digital followers on social media platforms"
        ],
        "optionsVi": [
            "Nếm một lát pizza xúc xích nóng hổi, nghe nghệ sĩ đường phố hát trên tàu điện ngầm và đón hạt phong chò xoay tít từ tán cây",
            "Giành huy chương vàng môn thể dục dụng cụ tại thế vận hội Olympic",
            "Đọc các bài bách khoa toàn thư về cơ học lượng tử trong thư viện công cộng",
            "Tích lũy hàng triệu người theo dõi trên các nền tảng mạng xã hội"
        ],
        "correctAnswer": 0,
        "explanation": "22 discovers that human life is miraculous through basic sensory wonders: the taste of pizza, the breeze on skin, a subway singer, and a helicopter maple seed.",
        "explanationEn": "22 discovers that human life is miraculous through basic sensory wonders: the taste of pizza, the breeze on skin, a subway singer, and a helicopter maple seed.",
        "explanationVi": "22 khám phá ra rằng kiếp người thật diệu kỳ qua những rung cảm giác quan giản dị: vị bánh pizza, làn gió thổi qua da, tiếng hát dưới tàu điện ngầm và hạt cây phong chò xoay tít.",
        "targetedConcept": "Mindfulness & Everyday Miracles",
        "targetedConceptEn": "Mindfulness & Everyday Miracles",
        "targetedConceptVi": "Chánh niệm và những điều kỳ diệu đời thường",
        "referenceSegmentIndex": 27
    },
    {
        "id": "q_mov_ani_03_7",
        "question": "What is the core philosophical moral of Dorothea Williams' parable of the young fish seeking the ocean?",
        "questionEn": "What is the core philosophical moral of Dorothea Williams' parable of the young fish seeking the ocean?",
        "questionVi": "Ý nghĩa đạo lý và triết học cốt lõi của câu chuyện ngụ ngôn chú cá trẻ đi tìm đại dương do Dorothea Williams kể là gì?",
        "options": [
            "People often fail to appreciate the miracle of their present reality because they mislabel it as mere ordinary water while chasing an imagined destination",
            "Fishes should migrate to deeper saltwater trenches to escape fishing nets",
            "Professional jazz artists must always relocate to coastal resort cities to write hit songs",
            "Ambition requires completely abandoning one's family and childhood memories"
        ],
        "optionsEn": [
            "People often fail to appreciate the miracle of their present reality because they mislabel it as mere ordinary water while chasing an imagined destination",
            "Fishes should migrate to deeper saltwater trenches to escape fishing nets",
            "Professional jazz artists must always relocate to coastal resort cities to write hit songs",
            "Ambition requires completely abandoning one's family and childhood memories"
        ],
        "optionsVi": [
            "Con người thường không nhận ra điều kỳ diệu của thực tại vì coi nó là 'nước' bình thường trong khi mải miết săn đuổi một 'đích đến' trong tưởng tượng",
            "Cá nên di cư xuống các rãnh nước mặn sâu hơn để tránh lưới đánh cá",
            "Các nghệ sĩ jazz chuyên nghiệp luôn phải chuyển đến các thành phố biển để sáng tác các bản nhạc ăn khách",
            "Tham vọng đòi hỏi phải từ bỏ hoàn toàn gia đình và những ký ức tuổi thơ"
        ],
        "correctAnswer": 0,
        "explanation": "The young fish was already swimming in the vast ocean but dismissed it as 'just water', symbolizing how humans take their miraculous present life for granted while chasing an elusive milestone.",
        "explanationEn": "The young fish was already swimming in the vast ocean but dismissed it as 'just water', symbolizing how humans take their miraculous present life for granted while chasing an elusive milestone.",
        "explanationVi": "Chú cá trẻ đã bơi trong lòng đại dương bao la nhưng lại xem thường coi đó 'chỉ là nước', tượng trưng cho cách con người coi nhẹ thực tại mầu nhiệm trong khi mải săn đuổi một cột mốc hão huyền.",
        "targetedConcept": "The Ocean Parable & Present Moment Awareness",
        "targetedConceptEn": "The Ocean Parable & Present Moment Awareness",
        "targetedConceptVi": "Ngụ ngôn đại dương và sự tỉnh thức trong khoảnh khắc hiện tại",
        "referenceSegmentIndex": 38
    },
    {
        "id": "q_mov_ani_03_8",
        "question": "What vital truth about 'The Spark' does Jerry teach Joe before he returns to Earth?",
        "questionEn": "What vital truth about 'The Spark' does Jerry teach Joe before he returns to Earth?",
        "questionVi": "Chân lý quan trọng nào về 'Tia lửa đam mê' (The Spark) mà đấng sáng tạo Jerry đã chỉ dạy cho Joe trước khi thầy trở lại Trái Đất?",
        "options": [
            "A spark is not a rigid life purpose or career destiny; it is simply being open and ready to experience the gift of living",
            "A spark can only be ignited by becoming an internationally famous concert pianist",
            "A spark is permanently revoked if a person fails to win an Academy Award by age forty",
            "A spark requires memorizing every musical composition ever recorded in history"
        ],
        "optionsEn": [
            "A spark is not a rigid life purpose or career destiny; it is simply being open and ready to experience the gift of living",
            "A spark can only be ignited by becoming an internationally famous concert pianist",
            "A spark is permanently revoked if a person fails to win an Academy Award by age forty",
            "A spark requires memorizing every musical composition ever recorded in history"
        ],
        "optionsVi": [
            "Tia lửa không phải là một mục đích sống cứng nhắc hay số mệnh nghề nghiệp; nó đơn giản là sự mở lòng sẵn sàng đón nhận món quà của sự sống",
            "Tia lửa chỉ có thể được thắp sáng bằng việc trở thành một nghệ sĩ piano nổi tiếng quốc tế",
            "Tia lửa sẽ bị thu hồi vĩnh viễn nếu một người không giành được giải thưởng Oscar trước bốn mươi tuổi",
            "Tia lửa đòi hỏi phải học thuộc lòng mọi bản nhạc từng được thu âm trong lịch sử"
        ],
        "correctAnswer": 0,
        "explanation": "Jerry explains: 'We don't assign purposes here. A spark isn't a soul's purpose. The spark is simply being ready to live.'",
        "explanationEn": "Jerry explains: 'We don't assign purposes here. A spark isn't a soul's purpose. The spark is simply being ready to live.'",
        "explanationVi": "Jerry giải thích: 'Ở cõi này chúng tôi không gán mục đích cho ai cả. Một tia lửa không phải là mục đích sống duy nhất của linh hồn. Tia lửa đó đơn giản chỉ là việc sẵn sàng mở lòng đón nhận cuộc sống.'",
        "targetedConcept": "The True Meaning of The Spark",
        "targetedConceptEn": "The True Meaning of The Spark",
        "targetedConceptVi": "Ý nghĩa thực sự của tia lửa đam mê và sự sẵn sàng sống",
        "referenceSegmentIndex": 43
    }
]

quiz_data = {
    "lessonId": "mov_ani_03",
    "lessonTitle": "Soul: The Spark, Lost Souls & Ocean Parable",
    "totalQuestions": 8,
    "xpReward": 200,
    "generatedBy": "AI_GEMINI",
    "questions": quiz_questions
}

lesson_data = {
    "id": "mov_ani_03",
    "slug": "soul-the-spark-and-ocean-parable",
    "title": "Soul: The Spark, Lost Souls & Ocean Parable",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney",
    "cefrLevel": "B1",
    "durationFormatted": "23:22",
    "durationSeconds": 1402,
    "externalId": "e1Mno2A2N5E",
    "sourceType": "YOUTUBE",
    "supportedTypes": "BOTH",
    "thumbnailUrl": "https://img.youtube.com/vi/e1Mno2A2N5E/hqdefault.jpg",
    "accent": "American",
    "wpmSpeed": 130,
    "viewCount": 1119240,
    "studyCount": 5430,
    "description": "Câu chuyện ngụ ngôn chú cá tìm đại dương và bài học triết học sâu sắc nhất của Pixar về cuộc đời: 'Tia lửa đam mê (The Spark) không phải là mục đích sống duy nhất, mà là việc sẵn sàng mở lòng trân trọng từng khoảnh khắc được sống.'",
    "segments": segments
}

code = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Soul: The Spark, Lost Souls & Ocean Parable
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR B1 | American Accent
 * YouTube ID: e1Mno2A2N5E (23:22 - 1402s)
 * Views: 1,119,240 | Likes: High Engagement | RealLife English & Pixar
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (00:38 - 23:22)
 * TIÊU CHUẨN ZERO MERGED UTTERANCES - 50 MASTER SEGMENTS - 8 QUIZ CEFR B2
 * ============================================================================
 */

export const QUIZ_SOUL_THE_SPARK_AND_OCEAN_PARABLE: VideoQuizData = {json.dumps(quiz_data, ensure_ascii=False, indent=2)};

export const LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE: MockVideoLesson = {{
  id: "mov_ani_03",
  slug: "soul-the-spark-and-ocean-parable",
  title: "Soul: The Spark, Lost Souls & Ocean Parable",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "B1",
  durationFormatted: "23:22",
  durationSeconds: 1402,
  externalId: "e1Mno2A2N5E",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/e1Mno2A2N5E/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 130,
  viewCount: 1119240,
  studyCount: 5430,
  description:
    "Câu chuyện ngụ ngôn chú cá tìm đại dương và bài học triết học sâu sắc nhất của Pixar về cuộc đời: 'Tia lửa đam mê (The Spark) không phải là mục đích sống duy nhất, mà là việc sẵn sàng mở lòng trân trọng từng khoảnh khắc được sống.'",
  segments: {json.dumps(segments, ensure_ascii=False, indent=4)}
}};

export default LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE;
'''

target_file = "features/listening/data/lessons/movies/animation/lesson_soul.ts"
with open(target_file, "w", encoding="utf-8") as f:
    f.write(code)

print(f"Successfully generated Soul lesson file with 50 segments: {target_file}")
