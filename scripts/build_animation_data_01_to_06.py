import json
import os
from build_lessons_engine import generate_ts_lesson

target_dir = "features/listening/data/lessons/movies/animation"
os.makedirs(target_dir, exist_ok=True)

# ============================================================================
# 1. mov_ani_01: Kung Fu Panda
# ============================================================================
cfg_01 = {
    "id": "mov_ani_01",
    "slug": "kung-fu-panda-master-oogway-wisdom-peach-tree",
    "var_lesson": "LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE",
    "var_quiz": "QUIZ_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE",
    "file": "lesson_kung_fu_panda_master_oogway_wisdom_peach_tree.ts",
    "externalId": "SAY6Mptrj5s",
    "title": "Kung Fu Panda: Master Oogway Wisdom & The Peach Tree",
    "durationSeconds": 1652,
    "durationFormatted": "27:32",
    "cefrLevel": "A2",
    "accent": "American",
    "wpmSpeed": 115,
    "viewCount": 2453009,
    "studyCount": 6780,
    "description": "Đại sư Oogway truyền dạy triết lý phương Đông sâu sắc cho sư phụ Shifu bên gốc cây đào thiêng: 'Hôm qua là quá khứ, ngày mai là bí ẩn, nhưng hôm nay là một món quà. Đó là lý do nó được gọi là Hiện tại (Present).'",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_01 = [
    {
        "orderIndex": 0,
        "startTime": 45.0,
        "endTime": 58.5,
        "text": "My friend, the panda will never fulfill his destiny, nor you yours, until you let go of the illusion of control.",
        "translationVi": "Bạn của ta, chú gấu trúc sẽ không bao giờ hoàn thành sứ mệnh của mình, và cả con cũng vậy, chừng nào con chưa buông bỏ ảo tưởng về sự kiểm soát.",
        "ipaUs": "/maɪ frɛnd, ðə ˈpændə wɪl ˈnɛvər fʊlˈfɪl hɪz ˈdɛstɪni, nɔːr juː jɔːrz, ənˈtɪl juː lɛt ɡoʊ əv ðɪ ɪˈluːʒən əv kənˈtroʊl./",
        "keywords": ["fulfill destiny", "let go of", "illusion of control"],
        "explanationAi": "Cụm danh từ triết học 'illusion of control' (ảo tưởng có thể kiểm soát mọi sự việc) và thành ngữ 'let go of' (buông bỏ).",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 62.0,
        "endTime": 76.5,
        "text": "Illusion? — Yes. Look at this tree, Shifu. I cannot make it blossom when it suits me, nor make it bear fruit before its time.",
        "translationVi": "Ảo tưởng ư? — Đúng vậy. Hãy nhìn cây đào này xem, Shifu. Ta không thể bắt nó nở hoa khi ta thích, cũng chẳng thể ép nó kết trái trước thời vụ.",
        "ipaUs": "/ɪˈluːʒən? — jɛs. lʊk æt ðɪs triː, ˈʃiːfuː. aɪ ˈkænɑːt meɪk ɪt ˈblɑːsəm wɛn ɪt suːts miː, nɔːr meɪk ɪt bɛr fruːt bɪˈfɔːr ɪts taɪm./",
        "keywords": ["blossom", "suits me", "bear fruit", "before its time"],
        "explanationAi": "Thành ngữ tự nhiên 'bear fruit' (đơm hoa kết trái/đạt kết quả mỹ mãn). Oogway dùng quy luật tự nhiên để dạy về sự kiên nhẫn.",
        "properNouns": ["Shifu"]
    },
    {
        "orderIndex": 2,
        "startTime": 120.0,
        "endTime": 138.5,
        "text": "Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.",
        "translationVi": "Hôm qua đã là lịch sử, ngày mai là điều bí ẩn, nhưng ngày hôm nay là một món quà. Đó là lý do vì sao nó được gọi là Hiện tại.",
        "ipaUs": "/ˈjɛstərdeɪ ɪz ˈhɪstəri, təˈmɑːroʊ ɪz ə ˈmɪstəri, bʌt təˈdeɪ ɪz ə ɡɪft. ðæt ɪz waɪ ɪt ɪz kɔːld ðə ˈprɛzənt./",
        "keywords": ["yesterday is history", "tomorrow is a mystery", "gift", "the present"],
        "explanationAi": "Biện pháp chơi chữ (pun) kinh điển bằng tiếng Anh: 'present' vừa có nghĩa là 'món quà', vừa có nghĩa là 'thời điểm hiện tại'.",
        "properNouns": []
    },
    {
        "orderIndex": 3,
        "startTime": 180.0,
        "endTime": 194.0,
        "text": "You just need to believe. Promise me, Shifu. Promise me you will believe.",
        "translationVi": "Con chỉ cần có niềm tin. Hãy hứa với ta, Shifu. Hãy hứa với ta rằng con sẽ vững tin.",
        "ipaUs": "/juː dʒʌst niːd tuː bɪˈliːv. ˈprɑːmɪs miː, ˈʃiːfuː. ˈprɑːmɪs miː juː wɪl bɪˈliːv./",
        "keywords": ["need to believe", "promise me"],
        "explanationAi": "Động từ 'believe' biểu đạt sự tin tưởng nội tâm không điều kiện, mở khóa tiềm năng phi thường của Po.",
        "properNouns": ["Shifu"]
    }
]

questions_01 = [
    {
        "id": "q_mov_ani_01_1",
        "question": "What English wordplay does Master Oogway use to teach the importance of the present moment?",
        "questionVi": "Đại sư Oogway sử dụng cách chơi chữ tiếng Anh nào để dạy về tầm quan trọng của khoảnh khắc hiện tại?",
        "options": [
            "The double meaning of 'present', which means both a gift and the current time",
            "The rhyming sound between 'history' and 'mystery'",
            "The comparison between peach blossoms and martial arts belts",
            "The ancient translation of the word 'Kung Fu'"
        ],
        "optionsVi": [
            "Nghĩa đôi của từ 'present', vừa có nghĩa là món quà vừa có nghĩa là hiện tại",
            "Vần điệu giữa từ 'history' và 'mystery'",
            "So sánh hoa đào với đai võ thuật",
            "Bản dịch cổ của từ 'Kung Fu'"
        ],
        "correctAnswer": 0,
        "explanation": "Master Oogway explains: 'Today is a gift. That is why it is called the present.'",
        "explanationVi": "Đại sư Oogway giải thích: 'Hôm nay là một món quà (gift). Đó là lý do nó được gọi là present.'",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Wordplay & Vocabulary Insight",
        "targetedConceptVi": "Chơi chữ và thấu hiểu từ vựng"
    }
]

# ============================================================================
# 2. mov_ani_02: Inside Out
# ============================================================================
cfg_02 = {
    "id": "mov_ani_02",
    "slug": "inside-out-joy-sadness-anxiety-breakthrough",
    "var_lesson": "LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH",
    "var_quiz": "QUIZ_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH",
    "file": "lesson_inside_out_joy_sadness_anxiety_breakthrough.ts",
    "externalId": "Uky-jgd3M3E",
    "title": "Inside Out: Joy, Sadness & Headquarters Emotional Journey",
    "durationSeconds": 793,
    "durationFormatted": "13:13",
    "cefrLevel": "A2",
    "accent": "American",
    "wpmSpeed": 128,
    "viewCount": 5862110,
    "studyCount": 7120,
    "description": "Hành trình thấu hiểu cảm xúc bên trong tâm trí cô bé Riley: Vui Vẻ (Joy) nhận ra Buồn Bã (Sadness) không phải là gánh nặng vô ích, mà là tiếng gọi thấu cảm kết nối tình yêu thương gia đình.",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_02 = [
    {
        "orderIndex": 0,
        "startTime": 2.7,
        "endTime": 9.4,
        "text": "And that was just the beginning. Headquarters only got more crowded from there.",
        "translationVi": "Và đó mới chỉ là sự khởi đầu. Bộ Chỉ Huy cảm xúc từ đó ngày càng trở nên đông đúc hơn.",
        "ipaUs": "/ænd ðæt wʌz dʒʌst ðə bɪˈɡɪnɪŋ. ˈhɛdˌkwɔːrtərz ˈoʊnli ɡɑːt mɔːr ˈkraʊdɪd frʌm ðɛr./",
        "keywords": ["the beginning", "Headquarters", "crowded"],
        "explanationAi": "Danh từ số nhiều 'Headquarters' (Bộ chỉ huy não bộ). Cách bắt đầu lời kể chuyện lôi cuốn của Joy.",
        "properNouns": ["Headquarters"]
    },
    {
        "orderIndex": 1,
        "startTime": 25.0,
        "endTime": 38.0,
        "text": "Meet Sadness. She... well, she's Sadness. I'm not actually sure what she does, and I've checked, there's no place for her to go.",
        "translationVi": "Gặp Buồn Bã nhé. Cô ấy... à thì, cô ấy là Buồn Bã. Tôi thực sự không rõ cô ấy làm được trò trống gì, và tôi đã kiểm tra rồi, chẳng có chỗ nào cho cô ấy đi cả.",
        "ipaUs": "/miːt ˈsædnəs. ʃiː... wɛl, ʃiːz ˈsædnəs. aɪm nɑːt ˈæktʃuəli ʃʊr wʌt ʃiː dʌz, ænd aɪv tʃɛkt, ðɛrz noʊ pleɪs fɔːr hɜːr tuː ɡoʊ./",
        "keywords": ["meet Sadness", "not actually sure", "no place for her"],
        "explanationAi": "Cách giới thiệu nhân cách hóa cảm xúc đặc sắc của Pixar: Sadness ban đầu bị Joy xem nhẹ.",
        "properNouns": ["Sadness"]
    },
    {
        "orderIndex": 2,
        "startTime": 70.0,
        "endTime": 85.0,
        "text": "These are core memories. Each one came from a super important time in Riley's life. And they power the islands of personality.",
        "translationVi": "Đây là những ký ức cốt lõi. Mỗi ký ức đều đến từ một thời khắc vô cùng quan trọng trong đời Riley. Và chúng tiếp năng lượng cho các hòn đảo tính cách.",
        "ipaUs": "/ðiːz ɑːr kɔːr ˈmɛməriz. iːtʃ wʌn keɪm frʌm ə ˈsuːpər ɪmˈpɔːrtənt taɪm ɪn ˈraɪliz laɪf. ænd ðeɪ ˈpaʊər ðɪ ˈaɪləndz əv ˌpɜːrsəˈnæləti./",
        "keywords": ["core memories", "power the islands", "islands of personality"],
        "explanationAi": "Thuật ngữ tâm lý độc quyền trong phim: 'core memories' (ký ức định hình bản sắc), 'power' được dùng như ngoại động từ.",
        "properNouns": ["Riley"]
    },
    {
        "orderIndex": 3,
        "startTime": 240.0,
        "endTime": 256.0,
        "text": "Joy realized it wasn't about keeping Riley happy all the time. Sadness was the reason Riley got help when she needed it most.",
        "translationVi": "Vui Vẻ nhận ra vấn đề không phải là giữ cho Riley luôn luôn vui vẻ. Buồn Bã chính là lý do giúp Riley nhận được sự giúp đỡ khi em cần nhất.",
        "ipaUs": "/dʒɔɪ ˈriːəˌlaɪzd ɪt ˈwɑːzənt əˈbaʊt ˈkiːpɪŋ ˈraɪli ˈhæpi ɔːl ðə taɪm. ˈsædnəs wʌz ðə ˈriːzən ˈraɪli ɡɑːt hɛlp wɛn ʃiː ˈniːdɪd ɪt moʊst./",
        "keywords": ["keeping happy all the time", "got help", "needed it most"],
        "explanationAi": "Cú hích tâm lý học nhân văn: Con người cần được buồn để giải tỏa và đón nhận sự thấu cảm từ người thân.",
        "properNouns": ["Joy", "Sadness", "Riley"]
    }
]

questions_02 = [
    {
        "id": "q_mov_ani_02_1",
        "question": "What crucial realization does Joy have about the role of Sadness in Riley's life?",
        "questionVi": "Joy có nhận thức mang tính bước ngoặt nào về vai trò của Sadness trong đời Riley?",
        "options": [
            "Sadness signals when Riley needs emotional comfort and support from people who love her",
            "Sadness should be permanently locked away inside the subconscious mind",
            "Sadness only functions during cold winter seasons",
            "Sadness makes Riley perform better in competitive sports"
        ],
        "optionsVi": [
            "Nỗi buồn phát tín hiệu khi Riley cần sự an ủi và hỗ trợ cảm xúc từ những người yêu thương em",
            "Nỗi buồn cần bị nhốt vĩnh viễn trong tiềm thức",
            "Nỗi buồn chỉ hoạt động vào mùa đông",
            "Nỗi buồn giúp Riley chơi thể thao giỏi hơn"
        ],
        "correctAnswer": 0,
        "explanation": "Joy discovers that Sadness allowed Riley's family and friends to recognize her vulnerability and offer comfort.",
        "explanationVi": "Joy nhận ra nỗi buồn giúp gia đình và bạn bè nhận biết tổn thương của Riley để đến bên chở che.",
        "referenceSegmentIndex": 3,
        "targetedConcept": "Emotional Intelligence",
        "targetedConceptVi": "Trí tuệ cảm xúc"
    }
]

# ============================================================================
# 3. mov_ani_03: Soul
# ============================================================================
cfg_03 = {
    "id": "mov_ani_03",
    "slug": "soul-the-spark-and-ocean-parable",
    "var_lesson": "LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE",
    "var_quiz": "QUIZ_SOUL_THE_SPARK_AND_OCEAN_PARABLE",
    "file": "lesson_soul_the_spark_and_ocean_parable.ts",
    "externalId": "e1Mno2A2N5E",
    "title": "Soul: The Spark, Lost Souls & Ocean Parable",
    "durationSeconds": 1402,
    "durationFormatted": "23:22",
    "cefrLevel": "B1",
    "accent": "American",
    "wpmSpeed": 130,
    "viewCount": 1119240,
    "studyCount": 5430,
    "description": "Câu chuyện ngụ ngôn về chú cá tìm đại dương và bài học sâu sắc từ bộ phim đoạt giải Oscar của Pixar: 'Tia lửa đam mê (Spark) không phải là mục đích sống duy nhất, mà là việc sẵn sàng trân trọng từng khoảnh khắc được sống.'",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_03 = [
    {
        "orderIndex": 0,
        "startTime": 40.0,
        "endTime": 55.5,
        "text": "I heard this story about a fish. He swims up to this older fish and says: 'I’m trying to find this thing they call the ocean.'",
        "translationVi": "Tôi nghe một câu chuyện về một chú cá. Chú bơi lại gần một bác cá lớn tuổi hơn và hỏi: 'Cháu đang cố tìm kiếm thứ mà người ta gọi là đại dương.'",
        "ipaUs": "/aɪ hɜːrd ðɪs ˈstɔːri əˈbaʊt ə fɪʃ. hiː swɪmz ʌp tuː ðɪs ˈoʊldər fɪʃ ænd sɛz: aɪm ˈtraɪɪŋ tuː faɪnd ðɪs θɪŋ ðeɪ kɔːl ðɪ ˈoʊʃən./",
        "keywords": ["story about a fish", "swims up to", "the ocean"],
        "explanationAi": "Cụm 'swims up to' (bơi lại gần). Bắt đầu câu chuyện ngụ ngôn giàu tính triết lý của nghệ sĩ saxophone Dorothea Williams.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 56.0,
        "endTime": 66.5,
        "text": "'The ocean?' the older fish says, 'that’s what you’re in right now.' — 'This?' says the young fish, 'This is water. What I want is the ocean.'",
        "translationVi": "'Đại dương ư?' bác cá già đáp, 'chính là nơi cháu đang ở ngay lúc này đây.' — 'Đây á?' chú cá trẻ nói, 'Đây là nước mà. Thứ cháu muốn là đại dương cơ!'",
        "ipaUs": "/ði ˈoʊʃən? ði ˈoʊldər fɪʃ sɛz, ðæts wʌt jʊr ɪn raɪt naʊ. — ðɪs? sɛz ðə jʌŋ fɪʃ, ðɪs ɪz ˈwɔːtər. wʌt aɪ wɑːnt ɪz ðɪ ˈoʊʃən./",
        "keywords": ["what you're in", "this is water", "what I want"],
        "explanationAi": "Nghịch lý nhận thức: Con người thường mải mê theo đuổi những danh vọng xa xôi mà không nhận ra mình đang tắm mình trong chính điều kỳ diệu đó.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 110.0,
        "endTime": 128.5,
        "text": "We don't assign purposes here. A spark isn't a soul's purpose. The spark is simply being ready to live.",
        "translationVi": "Ở cõi này chúng tôi không gán mục đích cho ai cả. Một tia lửa không phải là mục đích sống duy nhất của linh hồn. Tia lửa đó đơn giản chỉ là việc sẵn sàng mở lòng đón nhận cuộc sống.",
        "ipaUs": "/wiː doʊnt əˈsaɪn ˈpɜːrpəsɪz hɪr. ə spɑːrk ˈɪzənt ə soʊlz ˈpɜːrpəs. ðə spɑːrk ɪz ˈsɪmpli ˈbiːɪŋ ˈrɛdi tuː lɪv./",
        "keywords": ["assign purposes", "a spark", "soul's purpose", "ready to live"],
        "explanationAi": "Khái niệm 'The spark': không nhất thiết phải là tài năng phi thường (như chơi piano hay vẽ tranh), mà là cảm nhận mùi hương, ánh nắng, một mẩu bánh pizza.",
        "properNouns": []
    }
]

questions_03 = [
    {
        "id": "q_mov_ani_03_1",
        "question": "What is the core philosophical moral of the fish and ocean parable?",
        "questionVi": "Ý nghĩa ngụ ngôn triết lý cốt lõi của câu chuyện chú cá và đại dương là gì?",
        "options": [
            "People often fail to appreciate the beauty of their present life because they mistake it for something ordinary",
            "Fishes should migrate to salt water to survive better",
            "Musicians should leave the city to find true inspiration",
            "Ambition requires leaving one's family behind"
        ],
        "optionsVi": [
            "Con người thường không trân trọng vẻ đẹp của hiện tại vì lầm tưởng nó là điều bình thường dung dị",
            "Cá nên di cư sang vùng nước mặn để sống tốt hơn",
            "Nghệ sĩ nên rời thành phố để tìm cảm hứng",
            "Tham vọng đòi hỏi phải từ bỏ gia đình"
        ],
        "correctAnswer": 0,
        "explanation": "The young fish was already in the ocean but called it just 'water', reflecting how humans overlook the miracle of living right now.",
        "explanationVi": "Chú cá trẻ đã ở trong đại dương nhưng chỉ coi đó là 'nước', phản ánh con người thường bỏ qua điều kỳ diệu của thực tại.",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Parable Interpretation",
        "targetedConceptVi": "Giải mã ý nghĩa ngụ ngôn"
    }
]

# ============================================================================
# 4. mov_ani_04: Ratatouille
# ============================================================================
cfg_04 = {
    "id": "mov_ani_04",
    "slug": "ratatouille-anton-ego-food-review-monologue",
    "var_lesson": "LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE",
    "var_quiz": "QUIZ_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE",
    "file": "lesson_ratatouille_anton_ego_food_review_monologue.ts",
    "externalId": "8WRjQAKUlio",
    "title": "Ratatouille: Remy, Linguini & Anton Ego's Food Philosophy",
    "durationSeconds": 1421,
    "durationFormatted": "23:41",
    "cefrLevel": "B2",
    "accent": "British",
    "wpmSpeed": 135,
    "viewCount": 3090371,
    "studyCount": 7320,
    "description": "Lời bình luận ẩm thực kinh điển của nhà phê bình Anton Ego (lồng tiếng bởi Peter O'Toole): 'Không phải ai cũng có thể trở thành một nghệ sĩ vĩ đại, nhưng một nghệ sĩ vĩ đại có thể xuất thân từ bất kỳ đâu.'",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_04 = [
    {
        "orderIndex": 0,
        "startTime": 30.0,
        "endTime": 45.0,
        "text": "In many ways, the work of a critic is easy. We risk very little, yet enjoy a position over those who offer up their work and their selves to our judgment.",
        "translationVi": "Xét trên nhiều phương diện, công việc của một nhà phê bình thật dễ dàng. Chúng tôi đối mặt rất ít rủi ro, nhưng lại được hưởng vị thế đứng trên những người cống hiến tác phẩm và cả tâm can của họ cho sự phán xét của chúng tôi.",
        "ipaUs": "/ɪn ˈmɛni weɪz, ðə wɜːrk əv ə ˈkrɪtɪk ɪz ˈiːzi. wiː rɪsk ˈvɛri ˈlɪtl̩, jɛt ɛnˈdʒɔɪ ə pəˈzɪʃən ˈoʊvər ðoʊz huː ˈɔːfər ʌp ðɛr wɜːrk ænd ðɛr sɛlvz tuː ˈaʊər ˈdʒʌdʒmənt./",
        "keywords": ["work of a critic", "risk very little", "offer up", "judgment"],
        "explanationAi": "Cụm từ văn phong học thuật cao cấp: 'offer up' (dâng hiến/giao phó), 'risk very little' (gần như chẳng mạo hiểm điều gì).",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 48.0,
        "endTime": 63.5,
        "text": "We thrive on negative criticism, which is fun to write and to read. But the bitter truth we critics must face is that the average piece of junk is probably more meaningful than our criticism designating it so.",
        "translationVi": "Chúng tôi sống bám vào những lời phê bình cay nghiệt, thứ rất sướng khi viết và hấp dẫn khi đọc. Nhưng sự thật cay đắng mà chúng tôi phải đối diện là: ngay cả một món đồ vứt đi tầm thường có lẽ vẫn có ý nghĩa hơn lời bình phẩm của chúng tôi khi gán cho nó cái mác đó.",
        "ipaUs": "/wiː θraɪv ɑːn ˈnɛɡətɪv ˈkrɪtɪˌsɪzəm, wɪtʃ ɪz fʌn tuː raɪt ænd tuː riːd. bʌt ðə ˈbɪtər truːθ wiː ˈkrɪtɪks mʌst feɪs ɪz ðæt ðɪ ˈævərɪdʒ piːs əv dʒʌŋk ɪz ˈprɑːbəbli mɔːr ˈmiːnɪŋfəl ðæn ˈaʊər ˈkrɪtɪˌsɪzəm ˈdɛzɪɡˌneɪtɪŋ ɪt soʊ./",
        "keywords": ["thrive on", "negative criticism", "bitter truth", "designating"],
        "explanationAi": "Cụm động từ 'thrive on' (phát triển mạnh/sống bám vào nhờ vào điều gì đó). Tự vấn lương tâm nghề nghiệp sắc sảo của Ego.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 90.0,
        "endTime": 108.5,
        "text": "Not everyone can become a great artist, but a great artist can come from anywhere.",
        "translationVi": "Không phải bất kỳ ai cũng có thể trở thành một nghệ sĩ vĩ đại, nhưng một nghệ sĩ vĩ đại có thể xuất thân từ bất kỳ nơi đâu.",
        "ipaUs": "/nɑːt ˈɛvriˌwʌn kæn bɪˈkʌm ə ɡreɪt ˈɑːrtɪst, bʌt ə ɡreɪt ˈɑːrtɪst kæn kʌm frʌm ˈɛniˌwɛr./",
        "keywords": ["not everyone", "great artist", "come from anywhere"],
        "explanationAi": "Lời khẳng định bất hủ đảo ngược cấu trúc triết lý Gusteau: Xóa bỏ rào cản xuất thân, tôn vinh tài năng đích thực.",
        "properNouns": []
    }
]

questions_04 = [
    {
        "id": "q_mov_ani_04_1",
        "question": "What profound realization about art does food critic Anton Ego express at the climax of his review?",
        "questionVi": "Nhà phê bình Anton Ego bày tỏ nhận thức sâu sắc nào về nghệ thuật ở đỉnh điểm bài đánh giá của mình?",
        "options": [
            "Not everyone can become a great artist, but a great artist can come from anywhere",
            "French cuisine is objectively superior to any other global tradition",
            "Rats should never be allowed in fine-dining restaurants",
            "Critics should never praise modern chefs"
        ],
        "optionsVi": [
            "Không phải ai cũng có thể trở thành nghệ sĩ vĩ đại, nhưng một nghệ sĩ vĩ đại có thể xuất thân từ bất cứ đâu",
            "Ẩm thực Pháp vượt trội hơn mọi nền ẩm thực khác",
            "Chuột không bao giờ được phép vào nhà hàng sang trọng",
            "Nhà phê bình không nên khen ngợi đầu bếp hiện đại"
        ],
        "correctAnswer": 0,
        "explanation": "Anton Ego humbly concludes: 'Not everyone can become a great artist, but a great artist can come from anywhere.'",
        "explanationVi": "Anton Ego khiêm nhường kết luận: 'Không phải ai cũng có thể thành nghệ sĩ vĩ đại, nhưng một nghệ sĩ vĩ đại có thể đến từ bất kỳ đâu.'",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Artistic Philosophy Insight",
        "targetedConceptVi": "Thấu hiểu triết lý nghệ thuật"
    }
]

# ============================================================================
# 5. mov_ani_05: Coco
# ============================================================================
cfg_05 = {
    "id": "mov_ani_05",
    "slug": "coco-remember-me-with-mama-coco-extended",
    "var_lesson": "LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED",
    "var_quiz": "QUIZ_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED",
    "file": "lesson_coco_remember_me_with_mama_coco_extended.ts",
    "externalId": "EQ9RFbIHrFw",
    "title": "Coco: Miguel & Héctor 'Remember Me' with Mama Coco",
    "durationSeconds": 978,
    "durationFormatted": "16:18",
    "cefrLevel": "A2",
    "accent": "American",
    "wpmSpeed": 118,
    "viewCount": 835393,
    "studyCount": 6120,
    "description": "Phân đoạn xúc động lấy đi nước mắt của hàng triệu khán giả: Cậu bé Miguel đàn hát khúc ca 'Remember Me' cho cụ cố Mamá Coco để đánh thức ký ức yêu thương về người cha Héctor.",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_05 = [
    {
        "orderIndex": 0,
        "startTime": 35.0,
        "endTime": 52.0,
        "text": "Remember me, though I have to say goodbye. Remember me, don't let it make you cry.",
        "translationVi": "Hãy nhớ về cha, dẫu cho cha phải nói lời tạm biệt. Hãy nhớ về cha, đừng để điều đó làm con rơi lệ.",
        "ipaUs": "/rɪˈmɛmbər miː, ðoʊ aɪ hæv tuː seɪ ɡʊdˈbaɪ. rɪˈmɛmbər miː, doʊnt lɛt ɪt meɪk juː kraɪ./",
        "keywords": ["remember me", "say goodbye", "make you cry"],
        "explanationAi": "Lời bài hát tha thiết với liên từ tương phản 'though' và cấu trúc 'make somebody + V(bare)'.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 55.0,
        "endTime": 74.0,
        "text": "For even if I'm far away, I hold you in my heart. I sing a secret song to you each night we are apart.",
        "translationVi": "Bởi dẫu cho cha có ở phương trời xa xôi, cha vẫn luôn ôm ấp hình bóng con trong tim. Cha hát một khúc ca thầm kín gửi con mỗi đêm ta xa cách.",
        "ipaUs": "/fɔːr ˈiːvən ɪf aɪm fɑːr əˈweɪ, aɪ hoʊld juː ɪn maɪ hɑːrt. aɪ sɪŋ ə ˈsiːkrɪt sɔːŋ tuː juː iːtʃ naɪt wiː ɑːr əˈpɑːrt./",
        "keywords": ["far away", "hold you in my heart", "apart"],
        "explanationAi": "Thành ngữ tình cảm 'hold someone in one's heart' (luôn khắc ghi ai trong tim). 'Apart' (chia cách).",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 120.0,
        "endTime": 138.0,
        "text": "When there's no one left in the living world who remembers you, you disappear from this world. We call it the Final Death.",
        "translationVi": "Khi không còn bất kỳ ai trong thế giới người sống nhớ về bạn nữa, bạn sẽ biến mất hoàn toàn khỏi cõi này. Chúng tôi gọi đó là Cái Chết Cuối Cùng.",
        "ipaUs": "/wɛn ðɛrz noʊ wʌn lɛft ɪn ðə ˈlɪvɪŋ wɜːrld huː rɪˈmɛmbərz juː, juː ˌdɪsəˈpɪr frʌm ðɪs wɜːrld. wiː kɔːl ɪt ðə ˈfaɪnəl dɛθ./",
        "keywords": ["no one left", "living world", "Final Death"],
        "explanationAi": "Triết lý văn hóa ngày lễ Día de los Muertos của Mexico: Người đã khuất chỉ thực sự ra đi khi ký ức về họ phai tàn trong lòng người còn sống.",
        "properNouns": ["Final Death"]
    }
]

questions_05 = [
    {
        "id": "q_mov_ani_05_1",
        "question": "According to the lore of the Land of the Dead in Coco, what causes 'The Final Death'?",
        "questionVi": "Theo truyền thuyết Xứ sở Người chết trong Coco, điều gì gây ra 'Cái chết cuối cùng'?",
        "options": [
            "When no one remaining in the living world remembers the person anymore",
            "When the marigold petal bridge closes at sunrise",
            "When a person's photo is stolen by a musical rival",
            "When someone forgets how to play a traditional song"
        ],
        "optionsVi": [
            "Khi không còn ai trong thế giới người sống nhớ về người đó nữa",
            "Khi cây cầu hoa cúc vạn thọ đóng lại lúc mặt trời mọc",
            "Khi ảnh thờ bị kẻ thù âm nhạc đánh cắp",
            "Khi một người quên cách chơi bài hát truyền thống"
        ],
        "correctAnswer": 0,
        "explanation": "The Final Death occurs when the last person who holds memories of the deceased passes away or forgets them.",
        "explanationVi": "Cái chết cuối cùng xảy ra khi người cuối cùng nhớ về người đã khuất qua đời hoặc quên lãng họ.",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Cultural & Narrative Theme",
        "targetedConceptVi": "Chủ đề văn hóa và cốt truyện"
    }
]

# ============================================================================
# 6. mov_ani_06: Up
# ============================================================================
cfg_06 = {
    "id": "mov_ani_06",
    "slug": "up-carl-and-ellie-thanks-for-adventure",
    "var_lesson": "LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE",
    "var_quiz": "QUIZ_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE",
    "file": "lesson_up_carl_and_ellie_thanks_for_adventure.ts",
    "externalId": "0zbPeoZzcPg",
    "title": "Up: Carl & Ellie's Adventure Book & Russell Wilderness Explorer",
    "durationSeconds": 1446,
    "durationFormatted": "24:06",
    "cefrLevel": "A2",
    "accent": "American",
    "wpmSpeed": 124,
    "viewCount": 1608833,
    "studyCount": 5910,
    "description": "Câu chuyện tình yêu và lòng quả cảm vượt thời gian của ông lão Carl Fredricksen: Khám phá bức thông điệp cuối cùng trong cuốn Sách Phiêu Lưu của Ellie: 'Cảm ơn anh vì chuyến phiêu lưu — giờ hãy đi tìm một chuyến phiêu lưu mới nhé!'",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_06 = [
    {
        "orderIndex": 0,
        "startTime": 20.0,
        "endTime": 35.5,
        "text": "Good afternoon! My name is Russell, and I am a Wilderness Explorer in Tribe 54, Sweatlodge 12. Are you in need of any assistance today, sir?",
        "translationVi": "Chào buổi chiều cụ! Cháu tên là Russell, và cháu là Nhà thám hiểm Hoang dã thuộc Bộ tộc 54, Phân đội 12. Hôm nay cụ có cần sự trợ giúp nào không thưa cụ?",
        "ipaUs": "/ɡʊd ˌæftərˈnuːn! maɪ neɪm ɪz ˈrʌsəl, ænd aɪ æm ə ˈwɪldərnəs ɪkˈsplɔːrər ɪn traɪb ˈfɪfti fɔːr, ˈswɛtˌlɑːdʒ twɛlv. ɑːr juː ɪn niːd əv ˈɛni əˈsɪstəns təˈdeɪ, sɜːr?/",
        "keywords": ["Wilderness Explorer", "in need of assistance", "sir"],
        "explanationAi": "Cụm thành ngữ trang trọng 'in need of assistance' = 'need help'. Lời chào đồng phục đáng yêu của Russell.",
        "properNouns": ["Russell", "Wilderness Explorer"]
    },
    {
        "orderIndex": 1,
        "startTime": 90.0,
        "endTime": 105.0,
        "text": "Adventure is out there! We have to cross over the ravine and tie the house to the top of Paradise Falls.",
        "translationVi": "Chuyến phiêu lưu đang ở ngoài kia! Chúng ta phải băng qua khe núi và buộc ngôi nhà lên đỉnh Thác Thiên Đường.",
        "ipaUs": "/ədˈvɛntʃər ɪz aʊt ðɛr! wiː hæv tuː krɔːs ˈoʊvər ðə rəˈviːn ænd taɪ ðə haʊs tuː ðə tɑːp əv ˈpærədaɪs fɔːlz./",
        "keywords": ["adventure is out there", "cross over", "Paradise Falls"],
        "explanationAi": "Khẩu hiệu xuyên suốt bộ phim 'Adventure is out there' (Phiêu lưu ở ngay ngoài kia).",
        "properNouns": ["Paradise Falls"]
    },
    {
        "orderIndex": 2,
        "startTime": 160.0,
        "endTime": 178.0,
        "text": "Thanks for the adventure — now go have a new one! Love, Ellie.",
        "translationVi": "Cảm ơn anh vì chuyến phiêu lưu cuộc đời — giờ hãy đi tìm một chuyến phiêu lưu mới nhé anh! Yêu anh, Ellie.",
        "ipaUs": "/θæŋks fɔːr ðɪ ədˈvɛntʃər — naʊ ɡoʊ hæv ə njuː wʌn! lʌv, ˈɛli./",
        "keywords": ["thanks for the adventure", "have a new one", "love"],
        "explanationAi": "Lời nhắn cuối cùng của Ellie làm Carl nhận ra: Cuộc sống hôn nhân giản dị suốt mấy chục năm qua của họ chính là chuyến phiêu lưu vĩ đại nhất.",
        "properNouns": ["Ellie"]
    }
]

questions_06 = [
    {
        "id": "q_mov_ani_06_1",
        "question": "What did Ellie write on the final page of 'My Adventure Book' for Carl?",
        "questionVi": "Ellie đã viết điều gì ở trang cuối cuốn 'Sách Phiêu Lưu Của Tôi' gửi cho Carl?",
        "options": [
            "Thanks for the adventure — now go have a new one! Love, Ellie.",
            "Never leave our childhood house behind.",
            "Make sure to capture the legendary giant bird.",
            "Retire quietly and avoid traveling to South America."
        ],
        "optionsVi": [
            "Cảm ơn anh vì chuyến phiêu lưu — giờ hãy đi tìm một chuyến phiêu lưu mới nhé! Yêu anh, Ellie.",
            "Đừng bao giờ bỏ lại ngôi nhà thời thơ ấu của chúng ta.",
            "Hãy nhớ bắt được chú chim khổng lồ huyền thoại.",
            "Hãy an dưỡng tuổi già và đừng đi Nam Mỹ."
        ],
        "correctAnswer": 0,
        "explanation": "Ellie's note released Carl from guilt and grief, encouraging him to embrace life and help young Russell.",
        "explanationVi": "Lời nhắn của Ellie giải thoát Carl khỏi nỗi đau quá khứ, khuyến khích ông mở lòng giúp đỡ chú bé Russell.",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Emotional Climax Comprehension",
        "targetedConceptVi": "Đọc hiểu cao trào cảm xúc"
    }
]

# Write lessons 01 to 06
all_ani_1 = [
    (cfg_01, segments_01, questions_01),
    (cfg_02, segments_02, questions_02),
    (cfg_03, segments_03, questions_03),
    (cfg_04, segments_04, questions_04),
    (cfg_05, segments_05, questions_05),
    (cfg_06, segments_06, questions_06),
]

for cfg, segs, qs in all_ani_1:
    content = generate_ts_lesson(cfg, segs, qs)
    path = os.path.join(target_dir, cfg["file"])
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {cfg['file']}")
