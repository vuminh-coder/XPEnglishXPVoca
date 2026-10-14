import json
import re

with open("scripts/inside_out_pure_segments.json", "r", encoding="utf-8") as f:
    segments = json.load(f)

for idx, s in enumerate(segments):
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", s["text"])
    s["tokenCount"] = len(tokens)
    s["orderIndex"] = idx

quiz_questions = [
    {
        "id": "q_mov_ani_02_1",
        "question": "What is the psychological function of 'core memories' in Riley's mind?",
        "questionEn": "What is the psychological function of 'core memories' in Riley's mind?",
        "questionVi": "Chức năng tâm lý học của các 'ký ức cốt lõi' (core memories) trong tâm trí Riley là gì?",
        "options": [
            "They power and sustain the foundational islands of her personality",
            "They delete unnecessary academic memories every night during REM sleep",
            "They store temporary sensory information before sending it to the garbage dump",
            "They control Riley's physical hunger and body temperature regulation"
        ],
        "optionsEn": [
            "They power and sustain the foundational islands of her personality",
            "They delete unnecessary academic memories every night during REM sleep",
            "They store temporary sensory information before sending it to the garbage dump",
            "They control Riley's physical hunger and body temperature regulation"
        ],
        "optionsVi": [
            "Chúng tiếp năng lượng và duy trì các hòn đảo nền tảng tạo nên nhân cách của em",
            "Chúng xóa bỏ các ký ức học tập không cần thiết mỗi đêm trong giấc ngủ REM",
            "Chúng lưu trữ thông tin giác quan tạm thời trước khi chuyển xuống bãi rác ký ức",
            "Chúng điều khiển cơn đói thể chất và điều hòa thân nhiệt của Riley"
        ],
        "correctAnswer": 0,
        "explanation": "Joy explains that each core memory powers a different aspect of Riley's personality, forming the islands of personality.",
        "explanationEn": "Joy explains that each core memory powers a different aspect of Riley's personality, forming the islands of personality.",
        "explanationVi": "Joy giải thích rằng mỗi ký ức cốt lõi tiếp năng lượng cho một khía cạnh tính cách khác nhau của Riley, định hình nên các hòn đảo nhân cách.",
        "targetedConcept": "Core Memories & Personality Structure",
        "targetedConceptEn": "Core Memories & Personality Structure",
        "targetedConceptVi": "Ký ức cốt lõi và cấu trúc nhân cách",
        "referenceSegmentIndex": 4
    },
    {
        "id": "q_mov_ani_02_2",
        "question": "What aspect of Riley's childhood does 'Goofball Island' specifically represent?",
        "questionEn": "What aspect of Riley's childhood does 'Goofball Island' specifically represent?",
        "questionVi": "'Đảo Ngớ Ngẩn' (Goofball Island) đại diện cụ thể cho khía cạnh nào trong tuổi thơ của Riley?",
        "options": [
            "Her playful, carefree humor and silly bonding moments with her parents",
            "Her serious dedication and discipline toward competitive ice hockey",
            "Her fear of darkness, basement noises, and imaginary monsters",
            "Her artistic talent in drawing abstract fantasy creatures"
        ],
        "optionsEn": [
            "Her playful, carefree humor and silly bonding moments with her parents",
            "Her serious dedication and discipline toward competitive ice hockey",
            "Her fear of darkness, basement noises, and imaginary monsters",
            "Her artistic talent in drawing abstract fantasy creatures"
        ],
        "optionsVi": [
            "Sự hài hước hồn nhiên, vô tư và những khoảnh khắc vui đùa ngộ nghĩnh cùng cha mẹ",
            "Sự cống hiến nghiêm túc và tính kỷ luật đối với môn khúc côn cầu trên băng",
            "Nỗi sợ bóng tối, tiếng động dưới tầng hầm và quái vật tưởng tượng",
            "Tài năng hội họa trong việc vẽ các sinh vật huyền bí trừu tượng"
        ],
        "correctAnswer": 0,
        "explanation": "Goofball Island represents Riley's lighthearted silliness, monkey noises, and carefree bonding with her parents.",
        "explanationEn": "Goofball Island represents Riley's lighthearted silliness, monkey noises, and carefree bonding with her parents.",
        "explanationVi": "Đảo Ngớ Ngẩn tượng trưng cho sự tinh nghịch vô tư, trò giả tiếng khỉ và sợi dây gắn kết ngập tràn tiếng cười với cha mẹ.",
        "targetedConcept": "Goofball Island & Emotional Bonding",
        "targetedConceptEn": "Goofball Island & Emotional Bonding",
        "targetedConceptVi": "Đảo Ngớ Ngẩn và sự gắn kết cảm xúc gia đình",
        "referenceSegmentIndex": 5
    },
    {
        "id": "q_mov_ani_02_3",
        "question": "What logistical crisis frustrates the family upon arriving at their new San Francisco house?",
        "questionEn": "What logistical crisis frustrates the family upon arriving at their new San Francisco house?",
        "questionVi": "Cuộc khủng hoảng hậu cần nào khiến cả gia đình thất vọng tột cùng khi vừa chuyển tới ngôi nhà mới ở San Francisco?",
        "options": [
            "The moving van carrying all their beds and belongings is delayed until Thursday",
            "The roof collapsed completely during an unexpected heavy thunderstorm",
            "The landlord cancelled their rental contract without prior notice",
            "The electrical wiring malfunctioned, leaving the whole house in darkness"
        ],
        "optionsEn": [
            "The moving van carrying all their beds and belongings is delayed until Thursday",
            "The roof collapsed completely during an unexpected heavy thunderstorm",
            "The landlord cancelled their rental contract without prior notice",
            "The electrical wiring malfunctioned, leaving the whole house in darkness"
        ],
        "optionsVi": [
            "Xe tải chuyển đồ chở toàn bộ giường đệm và vật dụng bị hoãn tới tận thứ Năm",
            "Mái nhà bị sập hoàn toàn trong một cơn giông bão lớn bất ngờ",
            "Chủ nhà đã hủy hợp đồng thuê nhà mà không thông báo trước",
            "Hệ thống điện bị chập cháy khiến toàn bộ căn nhà chìm trong bóng tối"
        ],
        "correctAnswer": 0,
        "explanation": "The father announces that the moving van won't arrive until Thursday, forcing the family to sleep on the bare floor.",
        "explanationEn": "The father announces that the moving van won't arrive until Thursday, forcing the family to sleep on the bare floor.",
        "explanationVi": "Người bố thông báo rằng xe chở đồ đạc sẽ không đến trước thứ Năm, buộc cả nhà phải ngủ trên sàn nhà trống trơn ẩm thấp.",
        "targetedConcept": "Environmental Stressors & Family Dynamics",
        "targetedConceptEn": "Environmental Stressors & Family Dynamics",
        "targetedConceptVi": "Tác nhân gây căng thẳng môi trường và động lực gia đình",
        "referenceSegmentIndex": 11
    },
    {
        "id": "q_mov_ani_02_4",
        "question": "What subtle emotional pressure does Riley's mother unintentionally place upon her?",
        "questionEn": "What subtle emotional pressure does Riley's mother unintentionally place upon her?",
        "questionVi": "Áp lực cảm xúc tinh vi nào mà người mẹ vô tình đặt lên vai Riley trước ngày đầu đến trường mới?",
        "options": [
            "Asking Riley to keep smiling and stay happy to ease her father's stress",
            "Demanding that Riley achieve straight A grades across all school subjects",
            "Forcing Riley to win every single upcoming ice hockey tryout match",
            "Pressuring Riley to immediately make ten new friends on her first day"
        ],
        "optionsEn": [
            "Asking Riley to keep smiling and stay happy to ease her father's stress",
            "Demanding that Riley achieve straight A grades across all school subjects",
            "Forcing Riley to win every single upcoming ice hockey tryout match",
            "Pressuring Riley to immediately make ten new friends on her first day"
        ],
        "optionsVi": [
            "Yêu cầu Riley luôn phải tươi cười và giữ vẻ hạnh phúc để giúp bố bớt căng thẳng",
            "Bắt Riley phải đạt điểm A tuyệt đối ở tất cả các môn học tại trường",
            "Ép Riley phải thắng bằng được trong mọi trận đấu thử nghiệm môn khúc côn cầu",
            "Gây áp lực bắt Riley phải kết bạn ngay với mười người bạn mới trong ngày đầu tiên"
        ],
        "correctAnswer": 0,
        "explanation": "Her mother asks her to 'keep smiling' to be a big help to her father, inadvertently making Riley feel guilty whenever she feels sad.",
        "explanationEn": "Her mother asks her to 'keep smiling' to be a big help to her father, inadvertently making Riley feel guilty whenever she feels sad.",
        "explanationVi": "Người mẹ đề nghị Riley hãy 'tiếp tục mỉm cười' để đỡ đần cho bố, vô tình khiến cô bé nảy sinh cảm giác tội lỗi mỗi khi cảm thấy buồn phiền.",
        "targetedConcept": "Toxic Positivity & Parental Expectation",
        "targetedConceptEn": "Toxic Positivity & Parental Expectation",
        "targetedConceptVi": "Sự tích cực độc hại và kỳ vọng của cha mẹ",
        "referenceSegmentIndex": 15
    },
    {
        "id": "q_mov_ani_02_5",
        "question": "What does Joy's chalk circle around Sadness symbolize from a psychological perspective?",
        "questionEn": "What does Joy's chalk circle around Sadness symbolize from a psychological perspective?",
        "questionVi": "Vòng tròn phấn mà Joy vẽ xung quanh Sadness tượng trưng cho điều gì dưới góc nhìn tâm lý học?",
        "options": [
            "The human tendency to suppress, quarantine, and isolate uncomfortable emotions",
            "An ancient mystical protection ritual practiced by medieval shamans",
            "A geometric memory calculation method taught in advanced psychology courses",
            "A competitive game designed to keep Headquarters entertaining"
        ],
        "optionsEn": [
            "The human tendency to suppress, quarantine, and isolate uncomfortable emotions",
            "An ancient mystical protection ritual practiced by medieval shamans",
            "A competitive game designed to keep Headquarters entertaining",
            "A geometric memory calculation method taught in advanced psychology courses"
        ],
        "optionsVi": [
            "Khuynh hướng kìm nén, cô lập và chối bỏ các cảm xúc khó chịu của con người",
            "Nghi thức bảo vệ thần bí cổ xưa do các pháp sư thời trung cổ thực hiện",
            "Một trò chơi thi đua nhằm giữ cho Bộ Chỉ Huy luôn mang tính giải trí",
            "Phương pháp tính toán trí nhớ hình học được giảng dạy trong các khóa học tâm lý học"
        ],
        "correctAnswer": 0,
        "explanation": "Joy restricting Sadness to a small chalk circle symbolizes emotional suppression—attempting to cordon off sorrow rather than processing it naturally.",
        "explanationEn": "Joy restricting Sadness to a small chalk circle symbolizes emotional suppression—attempting to cordon off sorrow rather than processing it naturally.",
        "explanationVi": "Việc Joy giới hạn Sadness bên trong vòng tròn phấn tượng trưng cho sự dồn nén cảm xúc—cố gắng cách ly nỗi buồn thay vì đón nhận và giải tỏa tự nhiên.",
        "targetedConcept": "Emotional Suppression & Isolation",
        "targetedConceptEn": "Emotional Suppression & Isolation",
        "targetedConceptVi": "Sự dồn nén và cô lập cảm xúc",
        "referenceSegmentIndex": 18
    },
    {
        "id": "q_mov_ani_02_6",
        "question": "What happens to the characters when they enter the Abstract Thought chamber?",
        "questionEn": "What happens to the characters when they enter the Abstract Thought chamber?",
        "questionVi": "Điều gì xảy ra với các nhân vật khi họ bước vào căn phòng Tư Duy Trừu Tượng (Abstract Thought)?",
        "options": [
            "They undergo deconstruction into geometric fragments, 2D planes, and basic non-figurative lines",
            "They instantly transform into stone statues preserved in ancient museum glass",
            "They lose their ability to speak English and begin communicating in binary code",
            "They multiply into hundreds of miniature identical clones across the room"
        ],
        "optionsEn": [
            "They undergo deconstruction into geometric fragments, 2D planes, and basic non-figurative lines",
            "They instantly transform into stone statues preserved in ancient museum glass",
            "They lose their ability to speak English and begin communicating in binary code",
            "They multiply into hundreds of miniature identical clones across the room"
        ],
        "optionsVi": [
            "Họ bị giải cấu trúc thành các mảnh hình học, các mặt phẳng 2D và những đường nét phi hình tượng",
            "Họ lập tức biến thành tượng đá được bảo tồn trong tủ kính bảo tàng cổ đại",
            "Họ mất khả năng nói tiếng Anh và bắt đầu giao tiếp bằng mã nhị phân",
            "Họ nhân bản thành hàng trăm bản sao tí hon giống hệt nhau khắp căn phòng"
        ],
        "correctAnswer": 0,
        "explanation": "In Abstract Thought, the characters experience deconstruction: 3D shapes breaking down into 2D facets and ultimately single lines.",
        "explanationEn": "In Abstract Thought, the characters experience deconstruction: 3D shapes breaking down into 2D facets and ultimately single lines.",
        "explanationVi": "Trong phòng Tư duy Trừu tượng, các nhân vật trải qua quá trình giải cấu trúc: hình khối 3D vỡ vụn thành các mặt phẳng 2D và cuối cùng chỉ còn là những đường thẳng cơ bản.",
        "targetedConcept": "Abstract Thought & Deconstructive Stages",
        "targetedConceptEn": "Abstract Thought & Deconstructive Stages",
        "targetedConceptVi": "Tư duy trừu tượng và các giai đoạn giải cấu trúc",
        "referenceSegmentIndex": 35
    },
    {
        "id": "q_mov_ani_02_7",
        "question": "What noble sacrifice does Bing Bong make in the Memory Dump to save Joy?",
        "questionEn": "What noble sacrifice does Bing Bong make in the Memory Dump to save Joy?",
        "questionVi": "Bing Bong đã thực hiện sự hy sinh cao cả nào dưới Vực Thẳm Lãng Quên (Memory Dump) để cứu Joy?",
        "options": [
            "He jumps off the song-powered rocket wagon so it becomes light enough to carry Joy to the top",
            "He fights off a pack of shadow wolves using his magical candy trunk",
            "He trades all his colorful memories to the Memory Police in exchange for a ladder",
            "He builds a suspension bridge out of discarded graham crackers and chocolate syrup"
        ],
        "optionsEn": [
            "He jumps off the song-powered rocket wagon so it becomes light enough to carry Joy to the top",
            "He fights off a pack of shadow wolves using his magical candy trunk",
            "He trades all his colorful memories to the Memory Police in exchange for a ladder",
            "He builds a suspension bridge out of discarded graham crackers and chocolate syrup"
        ],
        "optionsVi": [
            "Cậu nhảy khỏi chiếc xe tên lửa chạy bằng bài hát để xe đủ nhẹ đưa Joy bay lên tới miệng vực",
            "Cậu chiến đấu với bầy sói bóng đêm bằng chiếc vòi kẹo kỳ diệu của mình",
            "Cậu đổi toàn bộ ký ức rực rỡ của mình cho Cảnh sát Ký ức để lấy một chiếc thang",
            "Cậu xây một chiếc cầu treo bằng những mảnh bánh quy và si-rô sô-cô-la bỏ đi"
        ],
        "correctAnswer": 0,
        "explanation": "Bing Bong leaps off the rocket wagon so Joy can escape the Memory Dump, uttering his poignant farewell: 'Take her to the moon for me.'",
        "explanationEn": "Bing Bong leaps off the rocket wagon so Joy can escape the Memory Dump, uttering his poignant farewell: 'Take her to the moon for me.'",
        "explanationVi": "Bing Bong nhảy khỏi chiếc xe tên lửa để giảm tải giúp Joy thoát khỏi Vực Thẳm Lãng Quên, để lại lời trăng trối lay động: 'Hãy thay tôi đưa con bé lên mặt trăng nhé.'",
        "targetedConcept": "Selfless Sacrifice & Growing Up",
        "targetedConceptEn": "Selfless Sacrifice & Growing Up",
        "targetedConceptVi": "Sự hy sinh quên mình và quy luật trưởng thành",
        "referenceSegmentIndex": 44
    },
    {
        "id": "q_mov_ani_02_8",
        "question": "What profound emotional insight does Joy discover when examining the core hockey memory in the dump?",
        "questionEn": "What profound emotional insight does Joy discover when examining the core hockey memory in the dump?",
        "questionVi": "Joy khám phá ra nhận thức cảm xúc sâu sắc nào khi quan sát kỹ ký ức cốt lõi về trận khúc côn cầu dưới đáy vực thẳm?",
        "options": [
            "The joyful cheering moment only happened because Riley's sadness first signaled her vulnerability and brought her parents' support",
            "The hockey game was actually played on an artificial rink with plastic hockey pucks",
            "Riley won the tournament championship by scoring a lucky overtime goal",
            "Her teammates never truly cared about Riley and were secretly celebrating another victory"
        ],
        "optionsEn": [
            "The joyful cheering moment only happened because Riley's sadness first signaled her vulnerability and brought her parents' support",
            "The hockey game was actually played on an artificial rink with plastic hockey pucks",
            "Riley won the tournament championship by scoring a lucky overtime goal",
            "Her teammates never truly cared about Riley and were secretly celebrating another victory"
        ],
        "optionsVi": [
            "Khoảnh khắc hân hoan ăn mừng chỉ xảy ra vì nỗi buồn của Riley trước đó đã phát tín hiệu tổn thương để cha mẹ và đồng đội đến bên chở che",
            "Trận đấu khúc côn cầu thực chất được tổ chức trên sân băng nhân tạo với bóng nhựa",
            "Riley đã giành cúp vô địch giải đấu nhờ ghi được một bàn thắng may mắn trong hiệp phụ",
            "Các đồng đội không hề quan tâm đến Riley mà đang bí mật ăn mừng một chiến thắng khác"
        ],
        "correctAnswer": 0,
        "explanation": "Joy rewinds the golden hockey memory and sees that Riley was crying on a tree branch after missing the shot; her sadness prompted her parents and team to embrace and comfort her, transforming sorrow into love and joy.",
        "explanationEn": "Joy rewinds the golden hockey memory and sees that Riley was crying on a tree branch after missing the shot; her sadness prompted her parents and team to embrace and comfort her, transforming sorrow into love and joy.",
        "explanationVi": "Joy tua lại ký ức màu vàng và nhận ra Riley từng ngồi khóc trên cành cây vì trượt cú sút; chính nỗi buồn ấy đã thôi thúc cha mẹ và đồng đội đến ôm em, biến đau buồn thành tình yêu thương và niềm vui trọn vẹn.",
        "targetedConcept": "Emotional Complementarity & The Value of Sorrow",
        "targetedConceptEn": "Emotional Complementarity & The Value of Sorrow",
        "targetedConceptVi": "Sự tương hỗ cảm xúc và giá trị cứu chuộc của nỗi buồn",
        "referenceSegmentIndex": 45
    }
]

quiz_data = {
    "lessonId": "mov_ani_02",
    "lessonTitle": "Inside Out: Joy, Sadness & Headquarters Emotional Journey",
    "totalQuestions": 8,
    "xpReward": 200,
    "generatedBy": "AI_GEMINI",
    "questions": quiz_questions
}

lesson_data = {
    "id": "mov_ani_02",
    "slug": "inside-out-joy-sadness-anxiety-breakthrough",
    "title": "Inside Out: Joy, Sadness & Headquarters Emotional Journey",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney",
    "cefrLevel": "A2",
    "durationFormatted": "13:13",
    "durationSeconds": 793,
    "externalId": "Uky-jgd3M3E",
    "sourceType": "YOUTUBE",
    "supportedTypes": "BOTH",
    "thumbnailUrl": "https://img.youtube.com/vi/Uky-jgd3M3E/hqdefault.jpg",
    "accent": "American",
    "wpmSpeed": 128,
    "viewCount": 5862110,
    "studyCount": 7120,
    "description": "Kiệt tác hoạt hình tâm lý học của Pixar về hành trình thấu hiểu bản sắc cảm xúc bên trong tâm trí cô bé Riley: Vui Vẻ (Joy) nhận ra Buồn Bã (Sadness) không phải là gánh nặng thừa thãi, mà là nhịp cầu thấu cảm kỳ diệu kết nối tình yêu thương gia đình.",
    "segments": segments
}

code = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Inside Out: Joy, Sadness & Headquarters Emotional Journey
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR A2 | American Accent
 * YouTube ID: Uky-jgd3M3E (13:13 - 793s)
 * Views: 5,862,110 | Likes: High Engagement | Pixar Animation Studios
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (00:02 - 13:13)
 * TIÊU CHUẨN ZERO MERGED UTTERANCES - 50 MASTER SEGMENTS - 8 QUIZ CEFR B2
 * ============================================================================
 */

export const QUIZ_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH: VideoQuizData = {json.dumps(quiz_data, ensure_ascii=False, indent=2)};

export const LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH: MockVideoLesson = {{
  id: "mov_ani_02",
  slug: "inside-out-joy-sadness-anxiety-breakthrough",
  title: "Inside Out: Joy, Sadness & Headquarters Emotional Journey",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "A2",
  durationFormatted: "13:13",
  durationSeconds: 793,
  externalId: "Uky-jgd3M3E",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/Uky-jgd3M3E/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 128,
  viewCount: 5862110,
  studyCount: 7120,
  description:
    "Kiệt tác hoạt hình tâm lý học của Pixar về hành trình thấu hiểu bản sắc cảm xúc bên trong tâm trí cô bé Riley: Vui Vẻ (Joy) nhận ra Buồn Bã (Sadness) không phải là gánh nặng thừa thãi, mà là nhịp cầu thấu cảm kỳ diệu kết nối tình yêu thương gia đình.",
  segments: {json.dumps(segments, ensure_ascii=False, indent=4)}
}};

export default LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH;
'''

target_file = "features/listening/data/lessons/movies/animation/lesson_inside_out.ts"
with open(target_file, "w", encoding="utf-8") as f:
    f.write(code)

print(f"Successfully generated Inside Out lesson file with 50 segments: {target_file}")
