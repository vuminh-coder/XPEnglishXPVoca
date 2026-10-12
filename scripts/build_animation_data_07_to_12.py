import json
import os
from build_lessons_engine import generate_ts_lesson

target_dir = "features/listening/data/lessons/movies/animation"
os.makedirs(target_dir, exist_ok=True)

# ============================================================================
# 7. mov_ani_07: Zootopia
# ============================================================================
cfg_07 = {
    "id": "mov_ani_07",
    "slug": "zootopia-judy-nick-carrot-pen-confession",
    "var_lesson": "LESSON_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION",
    "var_quiz": "QUIZ_ZOOTOPIA_JUDY_NICK_CARROT_PEN_CONFESSION",
    "file": "lesson_zootopia_judy_nick_carrot_pen_confession.ts",
    "externalId": "FikAJxtVgOY",
    "title": "Zootopia: Judy Hopps & Nick Wilde Carrot Pen Investigation",
    "durationSeconds": 1676,
    "durationFormatted": "27:56",
    "cefrLevel": "B1",
    "accent": "American",
    "wpmSpeed": 138,
    "viewCount": 5918376,
    "studyCount": 6840,
    "description": "Màn đấu trí và hợp tác phá án dí dỏm giữa cô thỏ cảnh sát quả cảm Judy Hopps và chú cáo lém lỉnh Nick Wilde cùng cây bút ghi âm hình củ cà rốt trứ danh tại thành phố Zootopia.",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_07 = [
    {
        "orderIndex": 0,
        "startTime": 40.0,
        "endTime": 54.0,
        "text": "It's called a hustle, sweetheart. And I'm not the liar, he is. I just know how to play the game.",
        "translationVi": "Đó gọi là nghệ thuật mánh lới đấy, cưng à. Và tôi đâu phải kẻ nói dối, hắn mới là kẻ nói dối. Tôi chỉ là người biết cách chơi trò chơi này thôi.",
        "ipaUs": "/ɪts kɔːld ə ˈhʌsəl, ˈswiːtˌhɑːrt. ænd aɪm nɑːt ðə ˈlaɪər, hiː ɪz. aɪ dʒʌst noʊ haʊ tuː pleɪ ðə ɡeɪm./",
        "keywords": ["called a hustle", "play the game", "sweetheart"],
        "explanationAi": "Thuật ngữ lóng đường phố 'hustle' (chiêu trò mánh lới kiếm tiền tinh ranh) và thành ngữ 'play the game' (nắm rõ luật chơi để trục lợi).",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 80.0,
        "endTime": 96.5,
        "text": "Are you recording me? — Yes, actual 100-carat felony tax fraud on my carrot pen. Two hundred dollars a day, 365 days a year, since you were twelve.",
        "translationVi": "Cô đang ghi âm tôi đấy à? — Đúng vậy, tội trốn thuế trọng tội 100 cara ngay trong cây bút cà rốt của tôi. 200 đô một ngày, 365 ngày một năm, kể từ khi anh 12 tuổi.",
        "ipaUs": "/ɑːr juː rɪˈkɔːrdɪŋ miː? — jɛs, ˈæktʃuəl wʌn ˈhʌndrəd ˈkærət ˈfɛləni tæks frɔːd ɑːn maɪ ˈkærət pɛn. tuː ˈhʌndrəd ˈdɑːlərz ə deɪ, θriː ˈhʌndrəd ˈsɪksti faɪv deɪz ə jɪr, sɪns juː wɜːr twɛlv./",
        "keywords": ["recording me", "felony tax fraud", "carrot pen"],
        "explanationAi": "Thuật ngữ pháp lý hình sự 'felony tax fraud' (tội nghiêm trọng trốn thuế). Cú đảo ngược tình thế xuất sắc của Judy.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 150.0,
        "endTime": 168.0,
        "text": "I really am just a dumb bunny. — And you really are a sly fox. — It's called a hustle, sweetheart. Boom.",
        "translationVi": "Tôi thực sự chỉ là một cô thỏ ngốc nghếch. — Và anh thì thực sự là một chú cáo xảo quyệt. — Đó gọi là mánh khóe đấy, cưng à. Bùm!",
        "ipaUs": "/aɪ ˈriːəli æm dʒʌst ə dʌm ˈbʌni. — ænd juː ˈriːəli ɑːr ə slaɪ fɑːks. — ɪts kɔːld ə ˈhʌsəl, ˈswiːtˌhɑːrt. buːm./",
        "keywords": ["dumb bunny", "sly fox", "called a hustle", "boom"],
        "explanationAi": "Thành ngữ hình ảnh 'sly fox' (cáo xảo quyệt). Câu thoại thể hiện sự thấu hiểu và tình bạn gắn kết giữa hai nhân vật.",
        "properNouns": []
    }
]

questions_07 = [
    {
        "id": "q_mov_ani_07_1",
        "question": "How does Judy Hopps manage to gain leverage over Nick Wilde during their initial investigation?",
        "questionVi": "Judy Hopps đã làm thế nào để nắm thóp và buộc Nick Wilde phải hợp tác điều tra?",
        "options": [
            "She secretly recorded his confession of tax evasion using her carrot voice recorder pen",
            "She arrested him on the spot with backup from Chief Bogo",
            "She paid him double his daily popsicle earnings",
            "She threatened to reveal his identity to the polar bears"
        ],
        "optionsVi": [
            "Cô bí mật ghi âm lời thú nhận trốn thuế của anh bằng cây bút ghi âm cà rốt",
            "Cô lập tức bắt giữ anh với sự hỗ trợ của Trưởng đồn Bogo",
            "Cô trả tiền gấp đôi thu nhập bán kem que của anh",
            "Cô đe dọa tiết lộ danh tính của anh cho đàn gấu Bắc cực"
        ],
        "correctAnswer": 0,
        "explanation": "Judy uses her carrot recorder pen to catch Nick confessing to decades of tax evasion, forcing him to be her guide.",
        "explanationVi": "Judy dùng bút ghi âm cà rốt bắt quả tang Nick thú nhận trốn thuế suốt nhiều năm để buộc anh giúp đỡ.",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Plot & Dialogue Detail",
        "targetedConceptVi": "Chi tiết đối thoại và diễn biến"
    }
]

# ============================================================================
# 8. mov_ani_08: The Lion King
# ============================================================================
cfg_08 = {
    "id": "mov_ani_08",
    "slug": "the-lion-king-rafiki-teaches-simba-the-past",
    "var_lesson": "LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST",
    "var_quiz": "QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST",
    "file": "lesson_the_lion_king_rafiki_teaches_simba_the_past.ts",
    "externalId": "HeQTJE99OXo",
    "title": "The Lion King: Rafiki Teaches Simba 'The Past Can Hurt'",
    "durationSeconds": 1444,
    "durationFormatted": "24:04",
    "cefrLevel": "A2",
    "accent": "African / British",
    "wpmSpeed": 115,
    "viewCount": 1453059,
    "studyCount": 6510,
    "description": "Bài học kinh điển của khỉ thông thái Rafiki dành cho Simba dưới tán rừng già: 'Quá khứ có thể làm con tổn thương. Nhưng theo cách ta nhìn nhận, con có thể chọn trốn chạy nó, hoặc học hỏi từ nó.'",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_08 = [
    {
        "orderIndex": 0,
        "startTime": 30.0,
        "endTime": 45.0,
        "text": "Ouch! What was that for? — It doesn't matter. It's in the past! — Yeah, but it still hurts.",
        "translationVi": "Ái! Sao ông lại gõ vào đầu tôi? — Chuyện đó đâu còn quan trọng nữa. Nó đã nằm lại trong quá khứ rồi! — Đúng, nhưng nó vẫn còn đau lắm.",
        "ipaUs": "/aʊtʃ! wʌt wʌz ðæt fɔːr? — ɪt ˈdʌzənt ˈmætər. ɪts ɪn ðə pæst! — jæ, bʌt ɪt stɪl hɜːrts./",
        "keywords": ["what was that for", "in the past", "still hurts"],
        "explanationAi": "Cụm câu hỏi khẩu ngữ trách móc 'What was that for?' (Sao lại làm thế?). Rafiki dùng cú gõ trượng bất ngờ để dạy học trò.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 48.0,
        "endTime": 66.5,
        "text": "Oh yes, the past can hurt. But the way I see it, you can either run from it, or learn from it.",
        "translationVi": "Ồ đúng vậy, quá khứ có thể làm con đau đớn. Nhưng theo cách ta nhìn nhận, con chỉ có hai con đường: hoặc là trốn chạy nó, hoặc là học hỏi từ nó.",
        "ipaUs": "/oʊ jɛs, ðə pæst kæn hɜːrt. bʌt ðə weɪ aɪ siː ɪt, juː kæn ˈaɪðər rʌn frʌm ɪt, ɔːr lɜːrn frʌm ɪt./",
        "keywords": ["the past can hurt", "the way I see it", "run from it", "learn from it"],
        "explanationAi": "Cấu trúc lựa chọn đối xứng 'either... or...' và cách mở đầu nêu quan điểm 'the way I see it' (theo góc nhìn của tôi).",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 70.0,
        "endTime": 88.0,
        "text": "See? What are you going to do? — First, I'm going to take your stick. — No, no, not the stick! — Remember who you are. You are my son, and the one true king.",
        "translationVi": "Thấy chưa? Giờ con định làm gì nào? — Trước tiên, con sẽ tước lấy cây gậy của ông. — Ơ kìa, đừng lấy gậy của ta chứ! — Hãy nhớ con là ai. Con là con trai của ta, và là vị vua đích thực duy nhất.",
        "ipaUs": "/siː? wʌt ɑːr juː ˈɡoʊɪŋ tuː duː? — fɜːrst, aɪm ˈɡoʊɪŋ tuː teɪk jɔːr stɪk. — noʊ, noʊ, nɑːt ðə stɪk! — rɪˈmɛmbər huː juː ɑːr. juː ɑːr maɪ sʌn, ænd ðə wʌn truː kɪŋ./",
        "keywords": ["what are you going to do", "take your stick", "remember who you are", "true king"],
        "explanationAi": "Thông điệp bất hủ của Mufasa vọng lại: 'Remember who you are' (Hãy nhớ lấy cội nguồn và sứ mệnh của mình).",
        "properNouns": []
    }
]

questions_08 = [
    {
        "id": "q_mov_ani_08_1",
        "question": "What two choices regarding the past does Rafiki present to Simba?",
        "questionVi": "Rafiki đưa ra hai lựa chọn nào về quá khứ cho Simba?",
        "options": [
            "You can either run from it, or learn from it",
            "You can either forget it completely, or blame others for it",
            "You can stay in the jungle forever, or seek revenge immediately",
            "You can become a vegetarian, or challenge the hyenas"
        ],
        "optionsVi": [
            "Con hoặc là trốn chạy nó, hoặc là học hỏi từ nó",
            "Con hoặc là quên sạch nó, hoặc là đổ lỗi cho người khác",
            "Con hoặc là ở lại rừng mãi mãi, hoặc là trả thù ngay lập tức",
            "Con hoặc là ăn chay, hoặc là thách đấu đàn linh cẩu"
        ],
        "correctAnswer": 0,
        "explanation": "Rafiki famously tells Simba: 'The past can hurt. But the way I see it, you can either run from it, or learn from it.'",
        "explanationVi": "Rafiki nói: 'Quá khứ có thể gây tổn thương. Nhưng con hoặc là chạy trốn nó, hoặc là học hỏi từ nó.'",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Timeless Wisdom Comprehension",
        "targetedConceptVi": "Thấu hiểu triết lý sống vượt thời gian"
    }
]

# ============================================================================
# 9. mov_ani_09: Finding Dory
# ============================================================================
cfg_09 = {
    "id": "mov_ani_09",
    "slug": "finding-nemo-dory-just-keep-swimming",
    "var_lesson": "LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING",
    "var_quiz": "QUIZ_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING",
    "file": "lesson_finding_nemo_dory_just_keep_swimming.ts",
    "externalId": "2Q1gTWxZcj0",
    "title": "Finding Dory: Dory & Marlin 'Just Keep Swimming' Best Scenes",
    "durationSeconds": 1118,
    "durationFormatted": "18:38",
    "cefrLevel": "A1",
    "accent": "American",
    "wpmSpeed": 112,
    "viewCount": 567625,
    "studyCount": 5420,
    "description": "Câu thần chú lạc quan bất diệt của cô cá đãng trí Dory (Ellen DeGeneres): 'Khi cuộc đời dìm bạn xuống, bạn biết mình phải làm gì không? Cứ việc bơi tiếp, cứ việc bơi tiếp thôi!'",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_09 = [
    {
        "orderIndex": 0,
        "startTime": 25.0,
        "endTime": 39.5,
        "text": "When life gets you down, you know what you gotta do? — I don't wanna know what you gotta do. — Just keep swimming! Just keep swimming, swimming, swimming!",
        "translationVi": "Khi cuộc đời làm bạn chán nản chùn bước, bạn biết mình phải làm gì không? — Tôi chẳng thèm biết phải làm gì đâu. — Cứ việc bơi tiếp đi! Cứ việc bơi tiếp, bơi tiếp, bơi tiếp thôi!",
        "ipaUs": "/wɛn laɪf ɡɛts juː daʊn, juː noʊ wʌt juː ˈɡɑːtə duː? — aɪ doʊnt ˈwɑːnə noʊ wʌt juː ˈɡɑːtə duː. — dʒʌst kiːp ˈswɪmɪŋ! dʒʌst kiːp ˈswɪmɪŋ, ˈswɪmɪŋ, ˈswɪmɪŋ!/",
        "keywords": ["gets you down", "just keep swimming", "gotta do"],
        "explanationAi": "Thành ngữ 'get someone down' (khiến ai đó buồn chán, nản lòng) và giai điệu 'Just keep swimming' khích lệ tinh thần.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 42.0,
        "endTime": 56.0,
        "text": "What do we do? We swim, swim, swim! Ha ha ha! I love to swim! When you want to swim you want to swim!",
        "translationVi": "Chúng ta phải làm gì nào? Chúng ta bơi, bơi, và bơi! Ha ha ha! Tôi yêu bơi lội! Khi bạn muốn bơi thì bạn cứ bơi thôi!",
        "ipaUs": "/wʌt duː wiː duː? wiː swɪm, swɪm, swɪm! hɑː hɑː hɑː! aɪ lʌv tuː swɪm! wɛn juː wɑːnt tuː swɪm juː wɑːnt tuː swɪm!/",
        "keywords": ["we swim", "love to swim", "happy rhythm"],
        "explanationAi": "Từ vựng cơ bản A1-A2 lặp lại vui tươi, tạo phản xạ ngôn ngữ tự nhiên cho người học tiếng Anh.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 95.0,
        "endTime": 110.0,
        "text": "I suffer from short-term memory loss. It runs in my family... At least I think it does. Where are they?",
        "translationVi": "Tôi bị mắc chứng mất trí nhớ ngắn hạn. Căn bệnh này di truyền trong gia đình tôi... Ít nhất là tôi nghĩ thế. Ủa mà họ đang ở đâu rồi nhỉ?",
        "ipaUs": "/aɪ ˈsʌfər frʌm ʃɔːrt tɜːrm ˈmɛməri lɔːs. ɪt rʌnz ɪn maɪ ˈfæməli... æt liːst aɪ θɪŋk ɪt dʌz. wɛr ɑːr ðeɪ?/",
        "keywords": ["short-term memory loss", "runs in my family", "at least"],
        "explanationAi": "Cụm y khoa đàm thoại: 'short-term memory loss' (mất trí nhớ ngắn hạn) và thành ngữ 'runs in the family' (di truyền trong dòng họ).",
        "properNouns": []
    }
]

questions_09 = [
    {
        "id": "q_mov_ani_09_1",
        "question": "What is Dory's famous optimistic motto whenever things become difficult or discouraging?",
        "questionVi": "Khẩu hiệu lạc quan nổi tiếng của Dory khi gặp khó khăn hoặc nản lòng là gì?",
        "options": [
            "Just keep swimming!",
            "Hide inside a dark cave until morning!",
            "Ask the sharks for navigation help!",
            "Turn back to the coral reef immediately!"
        ],
        "optionsVi": [
            "Cứ việc bơi tiếp đi!",
            "Trốn vào hang tối cho đến sáng!",
            "Nhờ cá mập chỉ đường!",
            "Quay trở lại rặng san hô ngay lập tức!"
        ],
        "correctAnswer": 0,
        "explanation": "Dory sings: 'When life gets you down, you know what you gotta do? Just keep swimming!'",
        "explanationVi": "Dory hát: 'Khi đời dìm bạn xuống, bạn biết phải làm gì không? Cứ việc bơi tiếp đi!'",
        "referenceSegmentIndex": 0,
        "targetedConcept": "Catchphrase & Optimism",
        "targetedConceptVi": "Khẩu hiệu và tinh thần lạc quan"
    }
]

# ============================================================================
# 10. mov_ani_10: Tangled
# ============================================================================
cfg_10 = {
    "id": "mov_ani_10",
    "slug": "tangled-lantern-festival-i-see-the-light",
    "var_lesson": "LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT",
    "var_quiz": "QUIZ_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT",
    "file": "lesson_tangled_lantern_festival_i_see_the_light.ts",
    "externalId": "uQ2rJKiiRiU",
    "title": "Tangled: Rapunzel & Flynn Rider Floating Lanterns & I See The Light",
    "durationSeconds": 1215,
    "durationFormatted": "20:15",
    "cefrLevel": "A2",
    "accent": "American",
    "wpmSpeed": 120,
    "viewCount": 3765078,
    "studyCount": 6120,
    "description": "Đêm hội thả đèn lồng lung linh huyền ảo trên mặt hồ vương quốc Corona: Công chúa tóc mây Rapunzel và chàng lãng tử Flynn Rider khám phá tình yêu chân thành và ước mơ đích thực.",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_10 = [
    {
        "orderIndex": 0,
        "startTime": 40.0,
        "endTime": 55.0,
        "text": "I've been looking out of a window for eighteen years, dreaming about what I might feel like when those lights rise in the sky.",
        "translationVi": "Tôi đã ngóng nhìn qua ô cửa sổ suốt mười tám năm qua, mơ mộng về cảm giác của mình khi những ngọn đèn ấy bay vút lên bầu trời.",
        "ipaUs": "/aɪv biːn ˈlʊkɪŋ aʊt əv ə ˈwɪndoʊ fɔːr ˌeɪˈtiːn jɪrz, ˈdriːmɪŋ əˈbaʊt wʌt aɪ maɪt fiːl laɪk wɛn ðoʊz laɪts raɪz ɪn ðə skaɪ./",
        "keywords": ["looking out of a window", "eighteen years", "lights rise in the sky"],
        "explanationAi": "Thì hiện tại hoàn thành tiếp diễn 'I've been looking' nhấn mạnh hành động ngóng đợi dai dẳng suốt 18 năm.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 58.0,
        "endTime": 72.0,
        "text": "What if it's not everything that I dreamed it would be? — It will be. — And what if it is? What do I do then? — Well, that's the good part. You get to go find a new dream.",
        "translationVi": "Nhỡ đâu nó không được lộng lẫy như tất cả những gì tôi hằng mơ ước thì sao? — Nó sẽ tuyệt vời như vậy mà. — Và nhỡ đâu đúng là như thế thật, thì tôi biết làm gì sau đó? — À, đó chính là điều tuyệt nhất: Cô sẽ được đi tìm một ước mơ mới.",
        "ipaUs": "/wʌt ɪf ɪts nɑːt ˈɛvriˌθɪŋ ðæt aɪ driːmd ɪt wʊd biː? — ɪt wɪl biː. — ænd wʌt ɪf ɪt ɪz? wʌt duː aɪ duː ðɛn? — wɛl, ðæts ðə ɡʊd pɑːrt. juː ɡɛt tuː ɡoʊ faɪnd ə njuː driːm./",
        "keywords": ["what if", "dreamed it would be", "find a new dream"],
        "explanationAi": "Cấu trúc lo âu giả định 'What if...' và câu trả lời đầy dịu dàng của Flynn: Ước mơ được tái sinh khi ta hoàn thành ước mơ cũ.",
        "properNouns": []
    },
    {
        "orderIndex": 2,
        "startTime": 120.0,
        "endTime": 138.5,
        "text": "All at once everything looks different, now that I see you. You were my new dream. — And you were mine.",
        "translationVi": "Bỗng nhiên vạn vật đều trở nên khác lạ, giờ đây khi em đã nhìn thấy chàng. Nàng chính là ước mơ mới của đời ta. — Và chàng cũng là ước mơ của em.",
        "ipaUs": "/ɔːl æt wʌns ˈɛvriˌθɪŋ lʊks ˈdɪfərənt, naʊ ðæt aɪ siː juː. juː wɜːr maɪ njuː driːm. — ænd juː wɜːr maɪn./",
        "keywords": ["all at once", "now that", "my new dream"],
        "explanationAi": "Cụm 'all at once' (bỗng chốc/đột nhiên). Lời thoại tỏ tình lãng mạn cao trào của bộ phim.",
        "properNouns": []
    }
]

questions_10 = [
    {
        "id": "q_mov_ani_10_1",
        "question": "What comforting advice does Flynn Rider give Rapunzel when she worries about what comes after fulfilling her dream?",
        "questionVi": "Flynn Rider đã cho Rapunzel lời khuyên an ủi nào khi cô lo lắng không biết sẽ làm gì sau khi đã hoàn thành ước mơ?",
        "options": [
            "That fulfilling a dream is the best part, because then you get to go find a new dream",
            "That dreams always lead to disappointment once realized",
            "That she should immediately return to Mother Gothel's tower",
            "That royal responsibilities will leave no time for dreaming"
        ],
        "optionsVi": [
            "Rằng hoàn thành ước mơ là điều tuyệt nhất, vì khi đó bạn lại được quyền đi tìm một ước mơ mới",
            "Rằng ước mơ luôn mang lại thất vọng khi thành hiện thực",
            "Rằng cô nên quay lại tháp của Mẹ Gothel ngay lập tức",
            "Rằng trách nhiệm hoàng gia sẽ không cho phép mơ mộng nữa"
        ],
        "correctAnswer": 0,
        "explanation": "Flynn reassures her: 'Well, that's the good part. You get to go find a new dream.'",
        "explanationVi": "Flynn trấn an cô: 'Đó chính là điều tuyệt nhất. Cô sẽ được đi tìm một ước mơ mới.'",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Reassurance & Perspective",
        "targetedConceptVi": "Sự trấn an và góc nhìn mới mẻ"
    }
]

# ============================================================================
# 11. mov_ani_11: WALL-E
# ============================================================================
cfg_11 = {
    "id": "mov_ani_11",
    "slug": "walle-i-dont-want-to-survive-i-want-to-live",
    "var_lesson": "LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE",
    "var_quiz": "QUIZ_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE",
    "file": "lesson_walle_i_dont_want_to_survive_i_want_to_live.ts",
    "externalId": "_Y6jc1mLT-8",
    "title": "WALL-E: Hidden Meaning, Captain McCrea & 'I Want to Live'",
    "durationSeconds": 397,
    "durationFormatted": "06:37",
    "cefrLevel": "B2",
    "accent": "American",
    "wpmSpeed": 140,
    "viewCount": 848784,
    "studyCount": 5890,
    "description": "Phân tích chiều sâu triết lý và môi trường của kiệt tác WALL-E: Trận đối đầu giữa Thuyền trưởng McCrea và trí tuệ nhân tạo AUTO với câu tuyên ngôn định mệnh: 'Tôi không muốn chỉ tồn tại lay lắt, tôi muốn được thực sự sống!'",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_11 = [
    {
        "orderIndex": 0,
        "startTime": 40.0,
        "endTime": 58.0,
        "text": "WALL-E is not just a story about two cute robots falling in love; it's a profound critique of consumerism, environmental decay, and human complacency.",
        "translationVi": "WALL-E không đơn thuần là câu chuyện về hai chú robot đáng yêu phải lòng nhau; đó là một sự phê phán sâu sắc về chủ nghĩa tiêu dùng, suy thoái môi trường và thói tự mãn của con người.",
        "ipaUs": "/ˈwɑːli ɪz nɑːt dʒʌst ə ˈstɔːri əˈbaʊt tuː kjuːt ˈroʊˌbɑːts ˈfɔːlɪŋ ɪn lʌv; ɪts ə prəˈfaʊnd krɪˈtiːk əv kənˈsuːmərˌɪzəm, ɪnˌvaɪrənˈmɛntəl dɪˈkeɪ, ænd ˈhjuːmən kəmˈpleɪsənsi./",
        "keywords": ["profound critique", "consumerism", "environmental decay", "complacency"],
        "explanationAi": "Từ vựng phê bình học thuật: 'consumerism' (chủ nghĩa tiêu thụ quá đà), 'complacency' (sự tự mãn buông xuôi).",
        "properNouns": ["WALL-E"]
    },
    {
        "orderIndex": 1,
        "startTime": 95.0,
        "endTime": 112.5,
        "text": "Sir, order A113 has been issued. You cannot return to Earth. — AUTO, out there is our home! Earth! We can't just stay in these hovering chairs forever!",
        "translationVi": "Thưa ngài, mệnh lệnh A113 đã được ban hành. Ngài không thể quay trở lại Trái Đất. — AUTO, ngoài kia chính là nhà của chúng ta! Trái Đất! Chúng ta không thể cứ ngồi lơ lửng trên những chiếc ghế này mãi mãi!",
        "ipaUs": "/sɜːr, ˈɔːrdər eɪ wʌn wʌn θriː hæz biːn ˈɪʃuːd. juː ˈkænɑːt rɪˈtɜːrn tuː ɜːrθ. — ˈɔːtoʊ, aʊt ðɛr ɪz ˈaʊər hoʊm! ɜːrθ! wiː kænt dʒʌst steɪ ɪn ðiːz ˈhʌvərɪŋ tʃɛrz fərˈɛvər!/",
        "keywords": ["order A113", "return to Earth", "hovering chairs"],
        "explanationAi": "Chi tiết điện ảnh biểu tượng 'A113' (mã hiệu truyền thống của Pixar) và sự thức tỉnh của Thuyền trưởng McCrea.",
        "properNouns": ["AUTO", "Earth", "A113"]
    },
    {
        "orderIndex": 2,
        "startTime": 125.0,
        "endTime": 142.0,
        "text": "On the Axiom, you will survive. — I don't want to survive! I want to live!",
        "translationVi": "Trên phi thuyền Axiom, ngài sẽ sống sót an toàn. — Tôi không muốn chỉ tồn tại lay lắt! Tôi muốn được thực sự sống!",
        "ipaUs": "/ɑːn ðɪ ˈæksiəm, juː wɪl sərˈvaɪv. — aɪ doʊnt wɑːnt tuː sərˈvaɪv! aɪ wɑːnt tuː lɪv!/",
        "keywords": ["survive", "don't want to survive", "want to live"],
        "explanationAi": "Sự phân biệt triết học sắc bén giữa 'survive' (chỉ duy trì nhịp tim sinh học) và 'live' (sống có ước mơ, cảm xúc, chạm tay vào đất mẹ).",
        "properNouns": ["Axiom"]
    }
]

questions_11 = [
    {
        "id": "q_mov_ani_11_1",
        "question": "What distinction does Captain McCrea make between 'surviving' and 'living' when confronting AUTO?",
        "questionVi": "Thuyền trưởng McCrea phân biệt ranh giới nào giữa 'tồn tại' và 'sống' khi đối đầu với AUTO?",
        "options": [
            "Surviving is merely physical maintenance on automated chairs, while living requires returning home to rebuild and experience life actively",
            "Living requires consuming higher quality packaged beverages",
            "Surviving means traveling beyond the solar system",
            "Living means obeying artificial intelligence algorithms"
        ],
        "optionsVi": [
            "Tồn tại chỉ là duy trì sinh học trên ghế tự động, còn sống đòi hỏi phải trở về nhà để lao động và trải nghiệm cuộc đời chủ động",
            "Sống đòi hỏi phải uống nước đóng chai hảo hạng hơn",
            "Tồn tại nghĩa là du hành ra ngoài hệ mặt trời",
            "Sống nghĩa là tuân lệnh thuật toán trí tuệ nhân tạo"
        ],
        "correctAnswer": 0,
        "explanation": "McCrea rejects passive luxury on the Axiom, declaring that true human dignity requires planting seeds and living on Earth.",
        "explanationVi": "McCrea từ chối sự tiện nghi thụ động trên tàu Axiom, khẳng định phẩm giá con người đòi hỏi phải gieo hạt và sống trên Trái Đất.",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Philosophical Dialogue Distinction",
        "targetedConceptVi": "Phân định đối thoại triết học"
    }
]

# ============================================================================
# 12. mov_ani_12: Monsters, Inc.
# ============================================================================
cfg_12 = {
    "id": "mov_ani_12",
    "slug": "monsters-inc-goodbye-boo-emotional-cut",
    "var_lesson": "LESSON_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT",
    "var_quiz": "QUIZ_MONSTERS_INC_GOODBYE_BOO_EMOTIONAL_CUT",
    "file": "lesson_monsters_inc_goodbye_boo_emotional_cut.ts",
    "externalId": "_kafLt9bNyU",
    "title": "Monsters, Inc.: Mike & Sulley Funniest Moments & Door Shredder",
    "durationSeconds": 1059,
    "durationFormatted": "17:39",
    "cefrLevel": "A2",
    "accent": "American",
    "wpmSpeed": 132,
    "viewCount": 277436,
    "studyCount": 5620,
    "description": "Những khoảnh khắc hài hước và ấm áp nhất của cặp đôi quái vật Mike Wazowski (Billy Crystal) & Sulley (John Goodman): Khám phá tiếng cười trẻ thơ mang lại nguồn năng lượng mạnh gấp 10 lần tiếng thét sợ hãi.",
    "categoryId": "cat_animation_pixar_disney",
    "categorySlug": "animation-pixar-disney",
    "categoryName": "Hoạt Hình Pixar & Disney"
}

segments_12 = [
    {
        "orderIndex": 0,
        "startTime": 20.0,
        "endTime": 35.5,
        "text": "Put that thing back where it came from, or so help me! — What are you doing? — It's a musical! 'Put that thing back where it came from or so help me!'",
        "translationVi": "Đem cái thứ đó trả về chỗ cũ ngay, không thì đừng trách tôi! — Cậu đang làm cái trò gì thế? — Đây là một vở nhạc kịch mà! 'Đem cái thứ đó trả về chỗ cũ ngay, không thì đừng trách tôi!'",
        "ipaUs": "/pʊt ðæt θɪŋ bæk wɛr ɪt keɪm frʌm, ɔːr soʊ hɛlp miː! — wʌt ɑːr juː ˈduːɪŋ? — ɪts ə ˈmjuːzɪkəl! pʊt ðæt θɪŋ bæk wɛr ɪt keɪm frʌm ɔːr soʊ hɛlp miː!/",
        "keywords": ["put that thing back", "or so help me", "musical"],
        "explanationAi": "Thành ngữ đe dọa hài hước 'so help me' (nếu không thì liệu hồn đấy với tôi). Phân đoạn ứng biến trứ danh của Mike Wazowski.",
        "properNouns": []
    },
    {
        "orderIndex": 1,
        "startTime": 85.0,
        "endTime": 102.0,
        "text": "Think about it, Sulley! Laughter is ten times more powerful than scream! We don't have to scare children anymore. We just have to make them laugh!",
        "translationVi": "Nghĩ kỹ xem, Sulley! Tiếng cười tạo ra năng lượng mạnh gấp mười lần tiếng la hét! Chúng ta đâu cần phải đi hù dọa trẻ con nữa. Chúng ta chỉ cần làm các bé bật cười thôi!",
        "ipaUs": "/θɪŋk əˈbaʊt ɪt, ˈsʌli! ˈlæftər ɪz tɛn taɪmz mɔːr ˈpaʊərfəl ðæn skriːm! wiː doʊnt hæv tuː skɛr ˈtʃɪldrən ˌɛniˈmɔːr. wiː dʒʌst hæv tuː meɪk ðɛm læf!/",
        "keywords": ["laughter is ten times more powerful", "scream", "make them laugh"],
        "explanationAi": "Cấu trúc so sánh bội số 'ten times more powerful than...'. Bước chuyển dịch nhân văn từ nỗi sợ hãi sang niềm vui tiếng cười.",
        "properNouns": ["Sulley"]
    },
    {
        "orderIndex": 2,
        "startTime": 140.0,
        "endTime": 158.0,
        "text": "Boo? — Kitty! — It only took him months, gluing together thousands of tiny wooden splinters. The door was whole again.",
        "translationVi": "Boo đấy ư con? — Chú Mèo! — Mike đã mất nhiều tháng trời, tỉ mỉ dán lại hàng nghìn mảnh dăm gỗ nhỏ xíu. Cánh cửa phòng đã hoàn vẹn trở lại.",
        "ipaUs": "/buː? — ˈkɪti! — ɪt ˈoʊnli tʊk hɪm mʌnθs, ˈɡluːɪŋ təˈɡɛðər ˈθaʊzəndz əv ˈtaɪni ˈwʊdən ˈsplɪntərz. ðə dɔːr wʌz hoʊl əˈɡɛn./",
        "keywords": ["Kitty", "gluing together", "wooden splinters", "door was whole"],
        "explanationAi": "Khoảnh khắc đoàn tụ ấm áp cuối phim: Mike Wazowski đã dày công ghép lại cánh cửa để Sulley có thể gặp lại cô bé Boo.",
        "properNouns": ["Boo", "Kitty"]
    }
]

questions_12 = [
    {
        "id": "q_mov_ani_12_1",
        "question": "What energy breakthrough transforms the entire economy of Monstropolis at the end of the film?",
        "questionVi": "Đột phá năng lượng nào đã làm thay đổi toàn bộ nền kinh tế thành phố Quái vật ở cuối phim?",
        "options": [
            "Children's laughter produces ten times more energy than screams of fear",
            "Solar power panels placed outside the dimensional doors",
            "Electric energy stored from radioactive trash",
            "Magical crystals discovered inside Boo's closet"
        ],
        "optionsVi": [
            "Tiếng cười của trẻ em tạo ra nguồn năng lượng mạnh gấp mười lần tiếng thét sợ hãi",
            "Tấm pin năng lượng mặt trời đặt ngoài cửa không gian",
            "Năng lượng điện tích trữ từ rác phóng xạ",
            "Pha lê ma thuật tìm thấy trong tủ của Boo"
        ],
        "correctAnswer": 0,
        "explanation": "Sulley and Mike discover that making children laugh generates vastly superior energy compared to scaring them.",
        "explanationVi": "Sulley và Mike phát hiện việc làm trẻ em cười tạo ra nguồn năng lượng dồi dào gấp 10 lần so với hù dọa.",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Narrative Resolution & Energy Theme",
        "targetedConceptVi": "Giải quyết xung đột cốt truyện"
    }
]

# Write lessons 07 to 12
all_ani_2 = [
    (cfg_07, segments_07, questions_07),
    (cfg_08, segments_08, questions_08),
    (cfg_09, segments_09, questions_09),
    (cfg_10, segments_10, questions_10),
    (cfg_11, segments_11, questions_11),
    (cfg_12, segments_12, questions_12),
]

for cfg, segs, qs in all_ani_2:
    content = generate_ts_lesson(cfg, segs, qs)
    path = os.path.join(target_dir, cfg["file"])
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {cfg['file']}")
