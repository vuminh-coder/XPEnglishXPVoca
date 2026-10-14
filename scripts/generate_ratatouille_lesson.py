import json
import re

with open("scripts/ratatouille_pure_segments.json", "r", encoding="utf-8") as f:
    segments = json.load(f)

for idx, s in enumerate(segments):
    tokens = re.findall(r"\b[A-Za-z0-9_]+\b", s["text"])
    s["tokenCount"] = len(tokens)
    s["orderIndex"] = idx

quiz_questions = [
    {
        "id": "q_mov_ani_04_1",
        "question": "What does the English idiom 'have/get the gall' mean when Chef Skinner confronts Linguini?",
        "questionEn": "What does the English idiom 'have/get the gall' mean when Chef Skinner confronts Linguini?",
        "questionVi": "Thành ngữ tiếng Anh 'have/get the gall' có ý nghĩa gì khi Bếp trưởng Skinner đối chất với Linguini?",
        "options": [
            "Having the brazen audacity, insolence, or nerve to do something disrespectful",
            "Having a severe biological illness affecting the digestive liver and gallbladder",
            "Possessing certified culinary qualifications from an elite Parisian gastronomy academy",
            "Lacking the physical stamina required to carry heavy iron pots in a commercial kitchen"
        ],
        "optionsEn": [
            "Having the brazen audacity, insolence, or nerve to do something disrespectful",
            "Having a severe biological illness affecting the digestive liver and gallbladder",
            "Possessing certified culinary qualifications from an elite Parisian gastronomy academy",
            "Lacking the physical stamina required to carry heavy iron pots in a commercial kitchen"
        ],
        "optionsVi": [
            "Có sự trơ trẽn, to gan lớn mật hoặc liều lĩnh dám làm điều gì đó xấc xược, thất thố",
            "Mắc phải một căn bệnh sinh học nghiêm trọng ảnh hưởng đến gan và túi mật",
            "Sở hữu chứng chỉ nấu ăn được công nhận từ học viện ẩm thực danh giá tại Paris",
            "Thiếu sức bền thể chất cần thiết để bưng bê những chiếc nồi gang nặng trong bếp"
        ],
        "correctAnswer": 0,
        "explanation": "To 'have the gall' means to exhibit shocking boldness, impudence, or insolent audacity to do something unacceptable.",
        "explanationEn": "To 'have the gall' means to exhibit shocking boldness, impudence, or insolent audacity to do something unacceptable.",
        "explanationVi": "'Have the gall' có nghĩa là thể hiện sự trơ tráo, to gan hoặc liều lĩnh dám làm một điều không thể chấp nhận được.",
        "targetedConcept": "Idiomatic Expression: Have/Get the Gall",
        "targetedConceptEn": "Idiomatic Expression: Have/Get the Gall",
        "targetedConceptVi": "Thành ngữ: Có gan cùng mình / trơ tráo liều lĩnh",
        "referenceSegmentIndex": 7
    },
    {
        "id": "q_mov_ani_04_2",
        "question": "How is Chef Skinner's threat of being 'drawn and quartered' rhetorically analyzed in the lesson?",
        "questionEn": "How is Chef Skinner's threat of being 'drawn and quartered' rhetorically analyzed in the lesson?",
        "questionVi": "Lời đe dọa 'tứ mã phanh thây' (drawn and quartered) của Bếp trưởng Skinner được phân tích tu từ như thế nào trong bài học?",
        "options": [
            "As an extreme hyperbolic figure of speech referencing medieval capital punishments to exaggerate anger",
            "As a literal modern legal statute enforced by contemporary French labor courts",
            "As a classic butchery technique used to divide poultry carcasses into four portions",
            "As a traditional painting exercise required of young art apprentices in the Louvre"
        ],
        "optionsEn": [
            "As an extreme hyperbolic figure of speech referencing medieval capital punishments to exaggerate anger",
            "As a literal modern legal statute enforced by contemporary French labor courts",
            "As a classic butchery technique used to divide poultry carcasses into four portions",
            "As a traditional painting exercise required of young art apprentices in the Louvre"
        ],
        "optionsVi": [
            "Như một biện pháp tu từ thậm xưng cường điệu viện dẫn hình phạt thời trung cổ để thổi phồng cơn thịnh nộ",
            "Như một điều luật lao động hiện đại được các tòa án Pháp áp dụng nghiêm ngặt",
            "Như một kỹ thuật chặt thịt gia cầm truyền thống thành bốn phần bằng nhau",
            "Như một bài tập hội họa truyền thống bắt buộc đối với các học viên tại bảo tàng Louvre"
        ],
        "correctAnswer": 0,
        "explanation": "The lesson explains that Skinner uses 'drawn and quartered' hyperbolically—an exaggerated threat derived from medieval execution methods.",
        "explanationEn": "The lesson explains that Skinner uses 'drawn and quartered' hyperbolically—an exaggerated threat derived from medieval execution methods.",
        "explanationVi": "Bài học giải thích Skinner dùng cụm 'drawn and quartered' theo lối thậm xưng (hyperbolically)—một lời đe dọa phóng đại bắt nguồn từ án phạt thời trung cổ.",
        "targetedConcept": "Hyperbolic Figurative Language",
        "targetedConceptEn": "Hyperbolic Figurative Language",
        "targetedConceptVi": "Ngôn ngữ tu từ thậm xưng cường điệu",
        "referenceSegmentIndex": 13
    },
    {
        "id": "q_mov_ani_04_3",
        "question": "What is the grammatical rule governing the correlative conjunction pair 'either... or' versus 'neither... nor'?",
        "questionEn": "What is the grammatical rule governing the correlative conjunction pair 'either... or' versus 'neither... nor'?",
        "questionVi": "Quy tắc ngữ pháp nào chi phối cặp liên từ tương quan 'either... or' so với 'neither... nor'?",
        "options": [
            "'Either... or' presents an affirmative choice between two alternatives, while 'neither... nor' negates both alternatives simultaneously",
            "'Either... or' can only connect past tense verbs, whereas 'neither... nor' only joins future tense auxiliary clauses",
            "'Either... or' is exclusive to British English, while 'neither... nor' is restricted exclusively to American dialects",
            "'Either... or' always requires a plural subjunctive verb regardless of subject number"
        ],
        "optionsEn": [
            "'Either... or' presents an affirmative choice between two alternatives, while 'neither... nor' negates both alternatives simultaneously",
            "'Either... or' can only connect past tense verbs, whereas 'neither... nor' only joins future tense auxiliary clauses",
            "'Either... or' is exclusive to British English, while 'neither... nor' is restricted exclusively to American dialects",
            "'Either... or' always requires a plural subjunctive verb regardless of subject number"
        ],
        "optionsVi": [
            "'Either... or' đưa ra sự lựa chọn khẳng định giữa hai phương án, trong khi 'neither... nor' phủ định đồng thời cả hai phương án",
            "'Either... or' chỉ có thể nối các động từ quá khứ, còn 'neither... nor' chỉ nối các mệnh đề tương lai",
            "'Either... or' là từ độc quyền của tiếng Anh-Anh, còn 'neither... nor' chỉ dùng trong tiếng Anh-Mỹ",
            "'Either... or' luôn đòi hỏi động từ số nhiều bất kể chủ ngữ là số ít hay số nhiều"
        ],
        "correctAnswer": 0,
        "explanation": "The fluency coach explains that 'either... or' offers options between two alternatives, whereas 'neither... nor' negates both choices.",
        "explanationEn": "The fluency coach explains that 'either... or' offers options between two alternatives, whereas 'neither... nor' negates both choices.",
        "explanationVi": "Huấn luyện viên giải thích 'either... or' đưa ra các tùy chọn giữa hai khả năng, còn 'neither... nor' phủ định cả hai lựa chọn đó.",
        "targetedConcept": "Correlative Conjunctions: Either/Or vs Neither/Nor",
        "targetedConceptEn": "Correlative Conjunctions: Either/Or vs Neither/Nor",
        "targetedConceptVi": "Liên từ tương quan: Either/Or và Neither/Nor",
        "referenceSegmentIndex": 16
    },
    {
        "id": "q_mov_ani_04_4",
        "question": "What phonological connected speech phenomenon occurs when a /t/ sound precedes a /j/ sound as in 'but you'?",
        "questionEn": "What phonological connected speech phenomenon occurs when a /t/ sound precedes a /j/ sound as in 'but you'?",
        "questionVi": "Hiện tượng biến âm nối âm nào xảy ra khi âm /t/ đứng trước âm /j/ như trong cụm 'but you'?",
        "options": [
            "Palatalization assimilation, where the sounds merge into an affricate /tʃ/ sound sounding like 'but-chu'",
            "Vowel lengthening, where the vowel 'u' is stretched into a long diphthong",
            "Glottal stopping, where the /t/ sound is entirely omitted without any sound substitution",
            "Nasalization, where air is forced through the nasal cavity producing an /n/ sound"
        ],
        "optionsEn": [
            "Palatalization assimilation, where the sounds merge into an affricate /tʃ/ sound sounding like 'but-chu'",
            "Vowel lengthening, where the vowel 'u' is stretched into a long diphthong",
            "Glottal stopping, where the /t/ sound is entirely omitted without any sound substitution",
            "Nasalization, where air is forced through the nasal cavity producing an /n/ sound"
        ],
        "optionsVi": [
            "Hiện tượng đồng hóa ngạc hóa, nơi hai âm hòa vào nhau tạo thành âm tắc xát /tʃ/ phát âm như 'but-chu'",
            "Kéo dài nguyên âm, nơi nguyên âm 'u' được kéo thành nguyên âm đôi dài",
            "Hiện tượng tắc thanh môn, nơi âm /t/ bị triệt tiêu hoàn toàn mà không có âm thay thế",
            "Mũi hóa âm học, nơi luồng hơi đi qua khoang mũi tạo thành âm /n/"
        ],
        "correctAnswer": 0,
        "explanation": "When an ending /t/ meets a starting /j/, native speakers naturally assimilate the cluster into a /tʃ/ sound: 'but you' becomes /bʌtʃuː/.",
        "explanationEn": "When an ending /t/ meets a starting /j/, native speakers naturally assimilate the cluster into a /tʃ/ sound: 'but you' becomes /bʌtʃuː/.",
        "explanationVi": "Khi âm cuối /t/ gặp âm đầu /j/, người bản xứ đồng hóa cụm âm thành âm /tʃ/: 'but you' được phát âm liền thành /bʌtʃuː/.",
        "targetedConcept": "Connected Speech: Palatal Assimilation (/t/ + /j/ -> /tʃ/)",
        "targetedConceptEn": "Connected Speech: Palatal Assimilation (/t/ + /j/ -> /tʃ/)",
        "targetedConceptVi": "Nối âm tự nhiên: Đồng hóa ngạc âm (/t/ + /j/ -> /tʃ/)",
        "referenceSegmentIndex": 18
    },
    {
        "id": "q_mov_ani_04_5",
        "question": "What discovery allows Remy to steer Linguini's culinary movements without being seen?",
        "questionEn": "What discovery allows Remy to steer Linguini's culinary movements without being seen?",
        "questionVi": "Phát hiện nào cho phép Remy điều khiển các thao tác nấu nướng của Linguini mà không bị lộ diện?",
        "options": [
            "Tugging specific locks of Linguini's hair triggers involuntary neuromuscular reflexes like a marionette",
            "Whispering complex French recipes through an ultrasonic radio transmitter hidden in Linguini's ear",
            "Transmitting hypnotic telepathic brainwaves while sitting on Linguini's right shoulder",
            "Writing step-by-step instructions with chalk on the kitchen floor under the table"
        ],
        "optionsEn": [
            "Tugging specific locks of Linguini's hair triggers involuntary neuromuscular reflexes like a marionette",
            "Whispering complex French recipes through an ultrasonic radio transmitter hidden in Linguini's ear",
            "Transmitting hypnotic telepathic brainwaves while sitting on Linguini's right shoulder",
            "Writing step-by-step instructions with chalk on the kitchen floor under the table"
        ],
        "optionsVi": [
            "Việc giật các lọn tóc cụ thể của Linguini kích hoạt phản xạ cơ thần kinh vô thức giống như một con rối",
            "Thì thầm các công thức nấu ăn tiếng Pháp qua máy phát sóng siêu âm giấu trong tai Linguini",
            "Truyền sóng não thôi miên thần giao cách cảm khi ngồi trên vai phải của Linguini",
            "Viết các chỉ dẫn từng bước bằng phấn xuống sàn bếp phía dưới gầm bàn"
        ],
        "correctAnswer": 0,
        "explanation": "Remy discovers that pulling different tufts of Linguini's hair causes involuntary muscle contractions, turning Linguini into a culinary puppet.",
        "explanationEn": "Remy discovers that pulling different tufts of Linguini's hair causes involuntary muscle contractions, turning Linguini into a culinary puppet.",
        "explanationVi": "Remy phát hiện ra rằng việc giật các lọn tóc khác nhau của Linguini kích hoạt các phản xạ co cơ vô thức, biến Linguini thành con rối nấu bếp.",
        "targetedConcept": "Involuntary Neuromuscular Marionette Mechanism",
        "targetedConceptEn": "Involuntary Neuromuscular Marionette Mechanism",
        "targetedConceptVi": "Cơ chế phản xạ co cơ vô thức kiểu múa rối",
        "referenceSegmentIndex": 27
    },
    {
        "id": "q_mov_ani_04_6",
        "question": "What fundamental kitchen discipline does Colette emphasize to prevent culinary chaos?",
        "questionEn": "What fundamental kitchen discipline does Colette emphasize to prevent culinary chaos?",
        "questionVi": "Kỷ luật làm bếp nền tảng nào mà Colette nhấn mạnh để ngăn chặn sự hỗn loạn trong gian bếp nhà hàng?",
        "options": [
            "Keeping your cooking station clean and clearing the cutting board immediately after every preparation task",
            "Shouting loudly at all kitchen porters to assert dominance and establish workplace authority",
            "Using only imported butter from Normandy and discarding olive oil completely",
            "Sharpening every knife at exactly six o'clock every morning before the doors unlock"
        ],
        "optionsEn": [
            "Keeping your cooking station clean and clearing the cutting board immediately after every preparation task",
            "Shouting loudly at all kitchen porters to assert dominance and establish workplace authority",
            "Using only imported butter from Normandy and discarding olive oil completely",
            "Sharpening every knife at exactly six o'clock every morning before the doors unlock"
        ],
        "optionsVi": [
            "Luôn giữ khu vực nấu nướng sạch sẽ và dọn thớt ngay lập tức sau mỗi công đoạn sơ chế",
            "Hét lớn vào mặt tất cả nhân viên phụ bếp để khẳng định quyền lực và thiết lập trật tự",
            "Chỉ sử dụng bơ nhập khẩu từ Normandy và loại bỏ hoàn toàn dầu ô liu",
            "Mài sắc mọi con dao vào đúng sáu giờ sáng mỗi ngày trước khi mở cửa nhà hàng"
        ],
        "correctAnswer": 0,
        "explanation": "Colette instructs: 'Keep your station clean! If you clear your cutting board after every prep, the mess will never conquer you!'",
        "explanationEn": "Colette instructs: 'Keep your station clean! If you clear your cutting board after every prep, the mess will never conquer you!'",
        "explanationVi": "Colette chỉ bảo: 'Luôn giữ cho khu vực của cậu sạch sẽ! Nếu dọn sạch thớt sau mỗi công đoạn sơ chế, sự bừa bộn sẽ không bao giờ đánh bại được cậu!'",
        "targetedConcept": "Professional Kitchen Mise en Place & Station Discipline",
        "targetedConceptEn": "Professional Kitchen Mise en Place & Station Discipline",
        "targetedConceptVi": "Kỷ luật sắp đặt và vệ sinh khu vực bếp chuyên nghiệp",
        "referenceSegmentIndex": 33
    },
    {
        "id": "q_mov_ani_04_7",
        "question": "What Proustian sensory memory disarms food critic Anton Ego upon tasting Remy's ratatouille?",
        "questionEn": "What Proustian sensory memory disarms food critic Anton Ego upon tasting Remy's ratatouille?",
        "questionVi": "Ký ức giác quan hoài niệm (Proustian memory) nào đã giải giáp sự cay nghiệt của Anton Ego khi nếm thử món ratatouille của Remy?",
        "options": [
            "He recalls scraping his knee as a weeping boy and being comforted by his mother with a warm bowl of ratatouille",
            "He remembers attending his first formal banquet at the Palace of Versailles with his grandfather",
            "He recalls winning first prize in an international culinary writing contest in Rome",
            "He remembers eating roasted chestnuts near the Eiffel Tower during a winter snowfall"
        ],
        "optionsEn": [
            "He recalls scraping his knee as a weeping boy and being comforted by his mother with a warm bowl of ratatouille",
            "He remembers attending his first formal banquet at the Palace of Versailles with his grandfather",
            "He recalls winning first prize in an international culinary writing contest in Rome",
            "He remembers eating roasted chestnuts near the Eiffel Tower during a winter snowfall"
        ],
        "optionsVi": [
            "Ông nhớ lại ngày mình bị ngã trầy đầu gối khóc nức nở và được mẹ vỗ về bằng một bát ratatouille thơm nóng",
            "Ông nhớ lại lần đầu tiên tham dự yến tiệc hoàng gia tại cung điện Versailles cùng ông nội",
            "Ông nhớ lại chiến thắng giải nhất trong cuộc thi viết ẩm thực quốc tế tại Rome",
            "Ông nhớ lại kỷ niệm ăn hạt dẻ nướng gần tháp Eiffel trong một ngày tuyết rơi mùa đông"
        ],
        "correctAnswer": 0,
        "explanation": "The taste instantly transports Ego to his rural childhood kitchen, where his mother comforted his scraped knee with warm, freshly cooked ratatouille.",
        "explanationEn": "The taste instantly transports Ego to his rural childhood kitchen, where his mother comforted his scraped knee with warm, freshly cooked ratatouille.",
        "explanationVi": "Hương vị mộc mạc lập tức đưa Ego ngược thời gian về gian bếp tuổi thơ nông thôn, nơi người mẹ đã ân cần vỗ về vết trầy đầu gối của ông bằng một bát ratatouille thơm nóng.",
        "targetedConcept": "Proustian Sensory Memory & Emotional Gastronomy",
        "targetedConceptEn": "Proustian Sensory Memory & Emotional Gastronomy",
        "targetedConceptVi": "Ký ức giác quan hoài niệm và giá trị cảm xúc ẩm thực",
        "referenceSegmentIndex": 38
    },
    {
        "id": "q_mov_ani_04_8",
        "question": "How does Anton Ego famously re-interpret Chef Gusteau's motto 'Anyone can cook' in his final review?",
        "questionEn": "How does Anton Ego famously re-interpret Chef Gusteau's motto 'Anyone can cook' in his final review?",
        "questionVi": "Anton Ego đã tái diễn giải phương châm 'Ai cũng có thể nấu ăn' của Bếp trưởng Gusteau như thế nào trong bài phê bình kết thúc phim?",
        "options": [
            "Not everyone can become a great artist, but a great artist can come from anywhere",
            "Anyone with sufficient financial capital can purchase a Michelin three-star establishment",
            "Cooking is an automated biological task that machines will soon perform without human intervention",
            "Critics possess higher intellectual authority than any practicing chef in France"
        ],
        "optionsEn": [
            "Not everyone can become a great artist, but a great artist can come from anywhere",
            "Anyone with sufficient financial capital can purchase a Michelin three-star establishment",
            "Cooking is an automated biological task that machines will soon perform without human intervention",
            "Critics possess higher intellectual authority than any practicing chef in France"
        ],
        "optionsVi": [
            "Không phải ai cũng có thể trở thành một nghệ sĩ vĩ đại, nhưng một nghệ sĩ vĩ đại có thể xuất thân từ bất kỳ đâu",
            "Bất kỳ ai có đủ vốn tài chính đều có thể mua được một nhà hàng ba sao Michelin",
            "Nấu nướng là công việc sinh học tự động mà máy móc sẽ sớm thay thế con người thực hiện",
            "Các nhà phê bình có thẩm quyền trí tuệ cao hơn bất kỳ đầu bếp thực hành nào tại Pháp"
        ],
        "correctAnswer": 0,
        "explanation": "Anton Ego humbly concludes: 'Not everyone can become a great artist, but a great artist can come from anywhere.'",
        "explanationEn": "Anton Ego humbly concludes: 'Not everyone can become a great artist, but a great artist can come from anywhere.'",
        "explanationVi": "Anton Ego khiêm nhường kết luận: 'Không phải ai cũng có thể trở thành một nghệ sĩ vĩ đại, nhưng một nghệ sĩ vĩ đại có thể xuất thân từ bất kỳ nơi đâu.'",
        "targetedConcept": "Ego's Epiphany: Egalitarian Meritocracy in Art",
        "targetedConceptEn": "Ego's Epiphany: Egalitarian Meritocracy in Art",
        "targetedConceptVi": "Sự thức tỉnh của Ego: Bình đẳng và thực tài trong nghệ thuật",
        "referenceSegmentIndex": 46
    }
]

quiz_data = {
    "lessonId": "mov_ani_04",
    "lessonTitle": "Ratatouille: Remy, Linguini & Anton Ego's Food Philosophy",
    "totalQuestions": 8,
    "xpReward": 200,
    "generatedBy": "AI_GEMINI",
    "questions": quiz_questions
}

lesson_data = {
    "id": "mov_ani_04",
    "slug": "ratatouille-anton-ego-food-review-monologue",
    "title": "Ratatouille: Remy, Linguini & Anton Ego's Food Philosophy",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney",
    "cefrLevel": "B2",
    "durationFormatted": "23:41",
    "durationSeconds": 1421,
    "externalId": "8WRjQAKUlio",
    "sourceType": "YOUTUBE",
    "supportedTypes": "BOTH",
    "thumbnailUrl": "https://img.youtube.com/vi/8WRjQAKUlio/hqdefault.jpg",
    "accent": "British",
    "wpmSpeed": 135,
    "viewCount": 3090371,
    "studyCount": 7320,
    "description": "Lời bình luận ẩm thực kinh điển của nhà phê bình Anton Ego (lồng tiếng bởi Peter O'Toole) và bài học ngôn ngữ đắt giá từ kiệt tác Ratatouille của Pixar: 'Không phải ai cũng có thể trở thành một nghệ sĩ vĩ đại, nhưng một nghệ sĩ vĩ đại có thể xuất thân từ bất kỳ đâu.'",
    "segments": segments
}

code = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Ratatouille: Remy, Linguini & Anton Ego's Food Philosophy
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR B2 | British Accent
 * YouTube ID: 8WRjQAKUlio (23:41 - 1421s)
 * Views: 3,090,371 | Likes: High Engagement | RealLife English & Pixar
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (00:12 - 23:41)
 * TIÊU CHUẨN ZERO MERGED UTTERANCES - 50 MASTER SEGMENTS - 8 QUIZ CEFR B2
 * ============================================================================
 */

export const QUIZ_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE: VideoQuizData = {json.dumps(quiz_data, ensure_ascii=False, indent=2)};

export const LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE: MockVideoLesson = {{
  id: "mov_ani_04",
  slug: "ratatouille-anton-ego-food-review-monologue",
  title: "Ratatouille: Remy, Linguini & Anton Ego's Food Philosophy",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "B2",
  durationFormatted: "23:41",
  durationSeconds: 1421,
  externalId: "8WRjQAKUlio",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/8WRjQAKUlio/hqdefault.jpg",
  accent: "British",
  wpmSpeed: 135,
  viewCount: 3090371,
  studyCount: 7320,
  description:
    "Lời bình luận ẩm thực kinh điển của nhà phê bình Anton Ego (lồng tiếng bởi Peter O'Toole) và bài học ngôn ngữ đắt giá từ kiệt tác Ratatouille của Pixar: 'Không phải ai cũng có thể trở thành một nghệ sĩ vĩ đại, nhưng một nghệ sĩ vĩ đại có thể xuất thân từ bất kỳ đâu.'",
  segments: {json.dumps(segments, ensure_ascii=False, indent=4)}
}};

export default LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE;
'''

target_file = "features/listening/data/lessons/movies/animation/lesson_ratatouille.ts"
with open(target_file, "w", encoding="utf-8") as f:
    f.write(code)

print(f"Successfully generated Ratatouille lesson file with 50 segments: {target_file}")
