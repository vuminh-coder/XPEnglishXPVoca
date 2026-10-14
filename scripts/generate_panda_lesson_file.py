import json
import re
import sys

sys.path.append('scripts')
from prepare_panda_pure_segments import raw_segments

for idx, s in enumerate(raw_segments):
    tokens = re.findall(r'\b[A-Za-z0-9_]+\b', s['text'])
    s['tokenCount'] = len(tokens)
    s['orderIndex'] = idx

quiz_questions = [
    {
        'id': 'q_mov_ani_01_1',
        'question': 'What English wordplay does Master Oogway use to teach the importance of the present moment?',
        'questionEn': 'What English wordplay does Master Oogway use to teach the importance of the present moment?',
        'questionVi': 'Đại sư Oogway sử dụng cách chơi chữ tiếng Anh nào để dạy về tầm quan trọng của khoảnh khắc hiện tại?',
        'options': [
            "The double meaning of 'present', which means both a gift and the current time",
            "The rhyming sound between 'history' and 'mystery'",
            "The comparison between peach blossoms and martial arts belts",
            "The ancient translation of the word 'Kung Fu'"
        ],
        'optionsEn': [
            "The double meaning of 'present', which means both a gift and the current time",
            "The rhyming sound between 'history' and 'mystery'",
            "The comparison between peach blossoms and martial arts belts",
            "The ancient translation of the word 'Kung Fu'"
        ],
        'optionsVi': [
            "Nghĩa đôi của từ 'present', vừa có nghĩa là món quà vừa có nghĩa là hiện tại",
            "Vần điệu giữa từ 'history' và 'mystery'",
            "So sánh hoa đào với đai võ thuật",
            "Bản dịch cổ của từ 'Kung Fu'"
        ],
        'correctAnswer': 0,
        'explanation': "Master Oogway explains: 'Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.'",
        'explanationEn': "Master Oogway explains: 'Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.'",
        'explanationVi': "Đại sư Oogway giải thích: 'Hôm nay là một món quà (gift). Đó là lý do nó được gọi là present (hiện tại/món quà).'",
        'targetedConcept': 'Wordplay & Philosophical Vocabulary',
        'targetedConceptEn': 'Wordplay & Philosophical Vocabulary',
        'targetedConceptVi': 'Chơi chữ và từ vựng triết học',
        'referenceSegmentIndex': 19
    },
    {
        'id': 'q_mov_ani_01_2',
        'question': "What comedic mishap occurs during Po's acupuncture session with Mantis?",
        'questionEn': "What comedic mishap occurs during Po's acupuncture session with Mantis?",
        'questionVi': 'Sự cố hài hước nào xảy ra trong buổi châm cứu của Po với Mantis?',
        'options': [
            "Mantis accidentally tweaks Po's facial nerve, temporarily paralyzing his face and stopping his heart",
            "Po swallows all the acupuncture needles by mistake",
            "Viper accidentally ties herself into a knot",
            "Tigress breaks the wooden examination table in half"
        ],
        'optionsEn': [
            "Mantis accidentally tweaks Po's facial nerve, temporarily paralyzing his face and stopping his heart",
            "Po swallows all the acupuncture needles by mistake",
            "Viper accidentally ties herself into a knot",
            "Tigress breaks the wooden examination table in half"
        ],
        'optionsVi': [
            "Mantis vô tình châm trúng dây thần kinh mặt của Po, khiến mặt cậu tạm thời bị liệt và làm tim cậu ngừng đập",
            "Po vô tình nuốt hết kim châm cứu",
            "Viper tự thắt mình thành một nút thắt",
            "Tigress bẻ gãy đôi chiếc bàn khám bằng gỗ"
        ],
        'correctAnswer': 0,
        'explanation': "Mantis admits: 'Wait! My fault! I accidentally tweaked his facial nerve. And may have also stopped his heart.'",
        'explanationEn': "Mantis admits: 'Wait! My fault! I accidentally tweaked his facial nerve. And may have also stopped his heart.'",
        'explanationVi': "Mantis thú nhận: 'Đợi đã! Lỗi tại tôi! Tôi lỡ châm nhầm dây thần kinh mặt của cậu ấy. Và có lẽ cũng vừa làm tim cậu ấy ngừng đập.'",
        'targetedConcept': 'Comedic Medical Terminology',
        'targetedConceptEn': 'Comedic Medical Terminology',
        'targetedConceptVi': 'Thuật ngữ y khoa hài hước trong đối thoại',
        'referenceSegmentIndex': 13
    },
    {
        'id': 'q_mov_ani_01_3',
        'question': "What does the expression 'let go of the illusion of control' teach Shifu?",
        'questionEn': "What does the expression 'let go of the illusion of control' teach Shifu?",
        'questionVi': "Cụm từ 'buông bỏ ảo tưởng về sự kiểm soát' (let go of the illusion of control) dạy cho Shifu điều gì?",
        'options': [
            "To accept that natural growth and destiny cannot be forcibly engineered by sheer willpower",
            "To abandon martial arts entirely and become an orchard farmer",
            "To stop planting peach seeds on high mountain peaks",
            "To let Tai Lung conquer the Valley of Peace without resistance"
        ],
        'optionsEn': [
            "To accept that natural growth and destiny cannot be forcibly engineered by sheer willpower",
            "To abandon martial arts entirely and become an orchard farmer",
            "To stop planting peach seeds on high mountain peaks",
            "To let Tai Lung conquer the Valley of Peace without resistance"
        ],
        'optionsVi': [
            "Chấp nhận rằng sự phát triển tự nhiên và số mệnh không thể bị cưỡng ép bằng ý chí chuyên quyền",
            "Từ bỏ hoàn toàn võ thuật để đi làm nông dân trồng đào",
            "Ngừng gieo hạt đào trên các đỉnh núi cao",
            "Để mặc cho Tai Lung xâm chiếm Thung lũng Bình Yên"
        ],
        'correctAnswer': 0,
        'explanation': "Oogway uses the peach tree to teach that one cannot force things to happen before their natural time.",
        'explanationEn': "Oogway uses the peach tree to teach that one cannot force things to happen before their natural time.",
        'explanationVi': "Oogway dùng hình ảnh cây đào để dạy rằng con người không thể cưỡng ép vạn vật diễn ra trước thời vụ tự nhiên.",
        'targetedConcept': 'Philosophical Idiom: Illusion of Control',
        'targetedConceptEn': 'Philosophical Idiom: Illusion of Control',
        'targetedConceptVi': 'Thành ngữ triết học: Ảo tưởng kiểm soát',
        'referenceSegmentIndex': 22
    },
    {
        'id': 'q_mov_ani_01_4',
        'question': 'What metaphor does Oogway use regarding a seed and fruit trees?',
        'questionEn': 'What metaphor does Oogway use regarding a seed and fruit trees?',
        'questionVi': 'Oogway sử dụng ẩn dụ nào liên quan đến hạt giống và cây ăn quả?',
        'options': [
            "A peach seed will only grow into a peach tree, you cannot wish it to become an orange or an apple",
            "A tree with deep roots can withstand any winter snowstorm",
            "Fruit picked too early will always taste bitter to the palate",
            "Only the strongest seeds survive in the rocky terrain"
        ],
        'optionsEn': [
            "A peach seed will only grow into a peach tree, you cannot wish it to become an orange or an apple",
            "A tree with deep roots can withstand any winter snowstorm",
            "Fruit picked too early will always taste bitter to the palate",
            "Only the strongest seeds survive in the rocky terrain"
        ],
        'optionsVi': [
            "Hạt đào sẽ chỉ lớn lên thành cây đào, con không thể ước nó biến thành cây cam hay cây táo được",
            "Cây có rễ sâu có thể chịu được mọi bão tuyết mùa đông",
            "Trái cây hái quá sớm sẽ luôn có vị đắng ngắt",
            "Chỉ những hạt giống khỏe nhất mới sống sót trên vách đá"
        ],
        'correctAnswer': 0,
        'explanation': "Oogway states: 'No matter what you do, that seed will grow to be a peach tree. You may wish for an apple or an orange, but you will get a peach.'",
        'explanationEn': "Oogway states: 'No matter what you do, that seed will grow to be a peach tree. You may wish for an apple or an orange, but you will get a peach.'",
        'explanationVi': "Oogway khẳng định: 'Dù con làm gì đi nữa, hạt đó vẫn sẽ mọc thành cây đào. Con có ước thành táo hay cam thì con vẫn sẽ nhận được một cây đào.'",
        'targetedConcept': 'Metaphor of Individual Nature & Pedagogy',
        'targetedConceptEn': 'Metaphor of Individual Nature & Pedagogy',
        'targetedConceptVi': 'Ẩn dụ về thiên tính tự nhiên và giáo dục',
        'referenceSegmentIndex': 26
    },
    {
        'id': 'q_mov_ani_01_5',
        'question': "What three actions does Oogway advise Shifu to take so that a 'peach' can defeat Tai Lung?",
        'questionEn': "What three actions does Oogway advise Shifu to take so that a 'peach' can defeat Tai Lung?",
        'questionVi': "Oogway khuyên Shifu nên thực hiện ba hành động nào để một 'quả đào' có thể đánh bại được Tai Lung?",
        'options': [
            "To guide it, to nurture it, and to believe in it",
            "To punish it, to starve it, and to isolate it",
            "To challenge it, to compete with it, and to test it",
            "To hide it, to protect it, and to send it away"
        ],
        'optionsEn': [
            "To guide it, to nurture it, and to believe in it",
            "To punish it, to starve it, and to isolate it",
            "To challenge it, to compete with it, and to test it",
            "To hide it, to protect it, and to send it away"
        ],
        'optionsVi': [
            "Chỉ dẫn nó (guide), nuôi dưỡng nó (nurture), và tin tưởng vào nó (believe in it)",
            "Trừng phạt nó, bỏ đói nó và cô lập nó",
            "Thách thức nó, tranh đấu với nó và kiểm tra nó",
            "Giấu nó đi, bảo vệ nó và gửi nó đi thật xa"
        ],
        'correctAnswer': 0,
        'explanation': "Oogway tells Shifu: 'Maybe it can. If you are willing to guide it, to nurture it, to believe in it.'",
        'explanationEn': "Oogway tells Shifu: 'Maybe it can. If you are willing to guide it, to nurture it, to believe in it.'",
        'explanationVi': "Oogway chỉ bảo Shifu: 'Có lẽ nó có thể đấy. Nếu con sẵn lòng chỉ dẫn nó, nuôi dưỡng nó, và tin tưởng vào nó.'",
        'targetedConcept': 'Three Pedagogical Pillars',
        'targetedConceptEn': 'Three Pedagogical Pillars',
        'targetedConceptVi': 'Ba trụ cột sư phạm phát triển tiềm năng',
        'referenceSegmentIndex': 28
    },
    {
        'id': 'q_mov_ani_01_6',
        'question': "What does the English idiom 'bear fruit' mean in everyday professional and academic contexts?",
        'questionEn': "What does the English idiom 'bear fruit' mean in everyday professional and academic contexts?",
        'questionVi': "Thành ngữ tiếng Anh 'bear fruit' có ý nghĩa gì trong ngữ cảnh học thuật và đời sống hàng ngày?",
        'options': [
            "Yielding positive, successful results after hard work or persistent efforts",
            "Harvesting ripe fruits from an agricultural field",
            "Cooking sweet desserts using natural ingredients",
            "Traveling across the country to trade agricultural goods"
        ],
        'optionsEn': [
            "Yielding positive, successful results after hard work or persistent efforts",
            "Harvesting ripe fruits from an agricultural field",
            "Cooking sweet desserts using natural ingredients",
            "Traveling across the country to trade agricultural goods"
        ],
        'optionsVi': [
            "Mang lại những kết quả tích cực, thành công mỹ mãn sau một quá trình nỗ lực chăm chỉ",
            "Thu hoạch trái cây chín từ nông trại",
            "Nấu các món tráng miệng ngọt ngào từ nguyên liệu tự nhiên",
            "Du hành khắp đất nước để buôn bán nông sản"
        ],
        'correctAnswer': 0,
        'explanation': "In English, 'to bear fruit' metaphorically means that a plan, project, or persistent endeavor achieves productive and worthwhile outcomes.",
        'explanationEn': "In English, 'to bear fruit' metaphorically means that a plan, project, or persistent endeavor achieves productive and worthwhile outcomes.",
        'explanationVi': "Trong tiếng Anh, 'to bear fruit' mang nghĩa bóng là kế hoạch hoặc nỗ lực kiên trì mang lại thành quả xứng đáng.",
        'targetedConcept': 'Idiom: Bear fruit',
        'targetedConceptEn': 'Idiom: Bear fruit',
        'targetedConceptVi': 'Thành ngữ: Đơm hoa kết trái / đạt kết quả mỹ mãn',
        'referenceSegmentIndex': 34
    },
    {
        'id': 'q_mov_ani_01_7',
        'question': 'What crucial solemn promise does Master Oogway extract from Shifu before ascending into petals?',
        'questionEn': 'What crucial solemn promise does Master Oogway extract from Shifu before ascending into petals?',
        'questionVi': 'Đại sư Oogway yêu cầu Shifu phải hứa điều cốt tử gì trước khi người thăng thiên thành những cánh hoa đào?',
        'options': [
            "To promise that he will believe in Po and in his own ability to mentor him",
            "To promise that he will seal Tai Lung permanently in the Chorh-Gom Prison",
            "To promise that Tigress will be appointed as the new Grand Master",
            "To promise that the Dragon Scroll will remain locked in the ceiling rafters"
        ],
        'optionsEn': [
            "To promise that he will believe in Po and in his own ability to mentor him",
            "To promise that he will seal Tai Lung permanently in the Chorh-Gom Prison",
            "To promise that Tigress will be appointed as the new Grand Master",
            "To promise that the Dragon Scroll will remain locked in the ceiling rafters"
        ],
        'optionsVi': [
            "Hứa rằng thầy sẽ tin tưởng vào Po và tin vào khả năng dẫn dắt của chính mình",
            "Hứa rằng thầy sẽ giam giữ Tai Lung vĩnh viễn trong ngục Chorh-Gom",
            "Hứa rằng Tigress sẽ được bổ nhiệm làm Đại sư tiếp theo",
            "Hứa rằng Cuộn bí kíp Rồng sẽ luôn được niêm phong trên xà nhà"
        ],
        'correctAnswer': 0,
        'explanation': "Oogway insists: 'No. You just need to believe. Promise me, Shifu. Promise me you will believe.'",
        'explanationEn': "Oogway insists: 'No. You just need to believe. Promise me, Shifu. Promise me you will believe.'",
        'explanationVi': "Oogway nhấn mạnh: 'Không. Con chỉ cần tin thôi. Hãy hứa với ta, Shifu. Hãy hứa với ta là con sẽ tin.'",
        'targetedConcept': 'Philosophical Faith & Mentorship Core',
        'targetedConceptEn': 'Philosophical Faith & Mentorship Core',
        'targetedConceptVi': 'Đức tin triết học và cốt lõi của người làm thầy',
        'referenceSegmentIndex': 30
    },
    {
        'id': 'q_mov_ani_01_8',
        'question': 'In the pronunciation and performance analysis, what vocal contrast is emphasized between Dustin Hoffman and Randall Duk Kim?',
        'questionEn': 'In the pronunciation and performance analysis, what vocal contrast is emphasized between Dustin Hoffman and Randall Duk Kim?',
        'questionVi': 'Trong phần phân tích ngữ âm và lối diễn xuất, sự tương phản âm thanh nào được nhấn mạnh giữa Dustin Hoffman và Randall Duk Kim?',
        'options': [
            "Hoffman's crisp, urgent articulation versus Kim's serene, calm cadence",
            "Hoffman's British received pronunciation versus Kim's Australian slang",
            "Hoffman speaking in whispers versus Kim shouting loudly across the courtyard",
            "Hoffman singing melodic rhymes versus Kim reciting ancient limericks"
        ],
        'optionsEn': [
            "Hoffman's crisp, urgent articulation versus Kim's serene, calm cadence",
            "Hoffman's British received pronunciation versus Kim's Australian slang",
            "Hoffman speaking in whispers versus Kim shouting loudly across the courtyard",
            "Hoffman singing melodic rhymes versus Kim reciting ancient limericks"
        ],
        'optionsVi': [
            "Lối nhả chữ sắc sảo, dồn dập của Hoffman đối lập với ngữ điệu thanh thản, an nhiên của Kim",
            "Phát âm chuẩn Anh của Hoffman đối lập với tiếng lóng Úc của Kim",
            "Hoffman nói thì thầm đối lập với Kim hét lớn ngang sân võ",
            "Hoffman hát theo giai điệu vần điệu đối lập với Kim đọc thơ cổ"
        ],
        'correctAnswer': 0,
        'explanation': "The fluency coach highlights the contrasting acoustic styles: Dustin Hoffman's crisp articulation as Shifu and Randall Duk Kim's serene cadence as Oogway.",
        'explanationEn': "The fluency coach highlights the contrasting acoustic styles: Dustin Hoffman's crisp articulation as Shifu and Randall Duk Kim's serene cadence as Oogway.",
        'explanationVi': "Huấn luyện viên ngôn ngữ chỉ ra phong cách âm học đối lập: Lối nhả chữ sắc sảo (crisp articulation) của Hoffman trong vai Shifu và ngữ điệu thanh thản (serene cadence) của Kim trong vai Oogway.",
        'targetedConcept': 'Acoustic Articulation & Character Cadence',
        'targetedConceptEn': 'Acoustic Articulation & Character Cadence',
        'targetedConceptVi': 'Nghệ thuật nhả chữ âm học và ngữ điệu nhân vật',
        'referenceSegmentIndex': 36
    }
]

quiz_data = {
    'lessonId': 'mov_ani_01',
    'lessonTitle': 'Kung Fu Panda: Master Oogway Wisdom & The Peach Tree',
    'totalQuestions': 8,
    'xpReward': 200,
    'generatedBy': 'AI_GEMINI',
    'questions': quiz_questions
}

lesson_data = {
    'id': 'mov_ani_01',
    'slug': 'kung-fu-panda-master-oogway-wisdom-peach-tree',
    'title': 'Kung Fu Panda: Master Oogway Wisdom & The Peach Tree',
    'categoryId': 'cat_animation_pixar_disney',
    'categorySlug': 'animation-pixar-disney',
    'categoryName': 'Hoạt Hình Pixar & Disney',
    'cefrLevel': 'B1',
    'accent': 'American',
    'durationFormatted': '27:32',
    'durationSeconds': 1652,
    'externalId': 'SAY6Mptrj5s',
    'sourceType': 'YOUTUBE',
    'supportedTypes': 'BOTH',
    'viewCount': 2453009,
    'studyCount': 8420,
    'wpmSpeed': 135,
    'thumbnailUrl': 'https://img.youtube.com/vi/SAY6Mptrj5s/maxresdefault.jpg',
    'description': 'Một trong những trích đoạn kinh điển và giàu tính giáo dục nhất của điện ảnh hoạt hình thế giới giữa Po, Sư phụ Shifu và Đại sư Oogway dưới cội hoa đào thiêng. Bài học bám sát 100% video phân tích từ RealLife English với 5 chapters toàn diện: châm cứu hài hước, phân tích từ vựng thành ngữ, triết lý buông bỏ ảo tưởng kiểm soát và nghệ thuật ngữ âm bản xứ.',
    'segments': raw_segments
}

code = """import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: Kung Fu Panda: Master Oogway Wisdom & The Peach Tree
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR B1 | American Accent
 * YouTube ID: SAY6Mptrj5s (27:32 - 1652s)
 * Views: 2,453,009 | RealLife English
 * 
 * BÁM SÁT 100% TOÀN BỘ 5 CHAPTERS TỪ VIDEO GỐC (00:45 - 27:32)
 * TIÊU CHUẨN ZERO MERGED UTTERANCES - 39 MASTER SEGMENTS - 8 QUIZ CEFR B2
 * ============================================================================
 */

export const QUIZ_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE: VideoQuizData = """ + json.dumps(quiz_data, ensure_ascii=False, indent=2) + """;

export const LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE: MockVideoLesson = """ + json.dumps(lesson_data, ensure_ascii=False, indent=2) + """;
"""

target_file = 'features/listening/data/lessons/movies/animation/lesson_kung_fu_panda.ts'
with open(target_file, 'w', encoding='utf-8') as f:
    f.write(code)

print(f'Successfully written lesson file: {target_file}')
