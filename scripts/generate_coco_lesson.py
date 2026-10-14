import json
import os

with open('scripts/coco_pure_segments.json', 'r', encoding='utf-8') as f:
    segments = json.load(f)

quiz_data = {
  "lessonId": "mov_ani_05",
  "lessonTitle": "Coco: Miguel & Héctor 'Remember Me' with Mama Coco",
  "totalQuestions": 8,
  "xpReward": 200,
  "generatedBy": "AI_GEMINI",
  "questions": [
    {
      "id": "q_mov_ani_05_1",
      "question": "What does the idiom 'count your blessings' mean in Miguel's family narration?",
      "questionEn": "What does the idiom 'count your blessings' mean in Miguel's family narration?",
      "questionVi": "Thành ngữ 'count your blessings' có ý nghĩa gì trong lời kể về gia đình của Miguel?",
      "options": [
        "Expressing conscious gratitude for the positive aspects, fortune, and loved ones in one's life rather than dwelling on hardships",
        "Literally counting the total number of gold coins and pesos earned from selling traditional handmade leather boots",
        "Reciting formal religious rosary prayers precisely one hundred times every evening before sunset",
        "Listing the names of all living family members on a genealogical parchment map to avoid inheritance disputes"
      ],
      "optionsEn": [
        "Expressing conscious gratitude for the positive aspects, fortune, and loved ones in one's life rather than dwelling on hardships",
        "Literally counting the total number of gold coins and pesos earned from selling traditional handmade leather boots",
        "Reciting formal religious rosary prayers precisely one hundred times every evening before sunset",
        "Listing the names of all living family members on a genealogical parchment map to avoid inheritance disputes"
      ],
      "optionsVi": [
        "Thể hiện lòng biết ơn sâu sắc đối với những điều may mắn, tốt lành và người thân trong cuộc đời thay vì chìm trong phiền muộn",
        "Đếm chính xác số lượng tiền vàng và đồng peso kiếm được từ việc bán những đôi bốt da thủ công truyền thống",
        "Đọc kinh Mân Côi chính xác một trăm lần vào mỗi buổi chiều tối trước khi mặt trời lặn",
        "Liệt kê tên của mọi thành viên còn sống trên một tấm phả hệ bằng giấy da để tránh tranh chấp quyền thừa kế"
      ],
      "correctAnswer": 0,
      "explanation": "To 'count your blessings' means to consciously reflect on and be grateful for the good things you have, especially during difficult circumstances.",
      "explanationEn": "To 'count your blessings' means to consciously reflect on and be grateful for the good things you have, especially during difficult circumstances.",
      "explanationVi": "'Count your blessings' có nghĩa là hãy luôn ý thức trân trọng và biết ơn những điều tốt đẹp mình đang có, đặc biệt là trong nghịch cảnh.",
      "targetedConcept": "Idiomatic Expression: Count One's Blessings",
      "targetedConceptEn": "Idiomatic Expression: Count One's Blessings",
      "targetedConceptVi": "Thành ngữ: Biết ơn những phúc lành cuộc sống",
      "referenceSegmentIndex": 18
    },
    {
      "id": "q_mov_ani_05_2",
      "question": "How does the idiomatic phrasal verb 'roll up one's sleeves' characterize Mamá Imelda's reaction to abandonment?",
      "questionEn": "How does the idiomatic phrasal verb 'roll up one's sleeves' characterize Mamá Imelda's reaction to abandonment?",
      "questionVi": "Cụm động từ thành ngữ 'roll up one's sleeves' đặc trưng cho phản ứng của Mamá Imelda trước việc bị bỏ rơi như thế nào?",
      "options": [
        "It demonstrates her determined, practical resolve to take immediate action and work tirelessly to build a livelihood",
        "It signifies her fashion preference for wearing modern short-sleeved dresses instead of traditional Mexican blouses",
        "It indicates her physical preparation to confront and physically fight rival cobblers in the central plaza market",
        "It represents her intention to learn medical nursing and care for wounded soldiers during wartime"
      ],
      "optionsEn": [
        "It demonstrates her determined, practical resolve to take immediate action and work tirelessly to build a livelihood",
        "It signifies her fashion preference for wearing modern short-sleeved dresses instead of traditional Mexican blouses",
        "It indicates her physical preparation to confront and physically fight rival cobblers in the central plaza market",
        "It represents her intention to learn medical nursing and care for wounded soldiers during wartime"
      ],
      "optionsVi": [
        "Nó thể hiện quyết tâm thực tế và kiên cường của bà khi lập tức hành động và lao động miệt mài để tạo dựng kế sinh nhai",
        "Nó thể hiện sở thích thời trang của bà là mặc váy ngắn tay hiện đại thay vì áo cánh truyền thống của phụ nữ Mexico",
        "Nó biểu thị sự chuẩn bị thể lực để đối đầu và ẩu đả với những thợ đóng giày đối thủ ở khu chợ quảng trường trung tâm",
        "Nó đại diện cho ý định học nghề y tá điều dưỡng để chăm sóc thương binh trong thời kỳ chiến tranh"
      ],
      "correctAnswer": 0,
      "explanation": "'Roll up one's sleeves' is an idiom meaning to prepare for hard, practical physical or mental work without complaining.",
      "explanationEn": "'Roll up one's sleeves' is an idiom meaning to prepare for hard, practical physical or mental work without complaining.",
      "explanationVi": "'Roll up one's sleeves' là thành ngữ nghĩa là sẵn sàng xắn tay áo bắt đầu làm việc cực nhọc, thiết thực mà không ca thán.",
      "targetedConcept": "Idiomatic Phrasal Verb: Roll Up One's Sleeves",
      "targetedConceptEn": "Idiomatic Phrasal Verb: Roll Up One's Sleeves",
      "targetedConceptVi": "Cụm thành ngữ: Xắn tay áo lao vào hành động",
      "referenceSegmentIndex": 19
    },
    {
      "id": "q_mov_ani_05_3",
      "question": "In the narration 'her grandkids got roped in', what does the phrasal verb 'get roped in' signify?",
      "questionEn": "In the narration 'her grandkids got roped in', what does the phrasal verb 'get roped in' signify?",
      "questionVi": "Trong câu kể 'her grandkids got roped in', cụm động từ 'get roped in' mang hàm ý gì?",
      "options": [
        "Being persuaded, enlisted, or gradually drawn into participating in a family commitment or task",
        "Being physically tied up with hemp ropes as a severe disciplinary punishment for playing forbidden music",
        "Being forced to compete in professional lasso rodeo tournaments at annual municipal county fairs",
        "Being officially hired under a formal signed employment contract with guaranteed retirement benefits"
      ],
      "optionsEn": [
        "Being persuaded, enlisted, or gradually drawn into participating in a family commitment or task",
        "Being physically tied up with hemp ropes as a severe disciplinary punishment for playing forbidden music",
        "Being forced to compete in professional lasso rodeo tournaments at annual municipal county fairs",
        "Being officially hired under a formal signed employment contract with guaranteed retirement benefits"
      ],
      "optionsVi": [
        "Bị thuyết phục, chiêu mộ hoặc dần dần bị cuốn vào việc tham gia vào trách nhiệm hay công việc kinh doanh của gia đình",
        "Bị trói chặt bằng dây thừng gai như một hình phạt kỷ luật nghiêm khắc vì lén lút chơi thứ âm nhạc bị cấm",
        "Bị ép buộc phải tham gia thi đấu các giải biểu diễn quăng dây thòng lọng tại các hội chợ thường niên của địa phương",
        "Được tuyển dụng chính thức theo một hợp đồng lao động có ký kết với đầy đủ phúc lợi bảo hiểm hưu trí"
      ],
      "correctAnswer": 0,
      "explanation": "'Get roped in' means to be persuaded or pressured into participating in something, often without prior intention.",
      "explanationEn": "'Get roped in' means to be persuaded or pressured into participating in something, often without prior intention.",
      "explanationVi": "'Get roped in' có nghĩa là bị lôi kéo, thuyết phục hoặc bị cuốn vào một nhiệm vụ mà ban đầu không chủ đích tham gia.",
      "targetedConcept": "Phrasal Verb: Get Roped In",
      "targetedConceptEn": "Phrasal Verb: Get Roped In",
      "targetedConceptVi": "Cụm động từ: Bị cuốn vào / bị lôi kéo tham gia",
      "referenceSegmentIndex": 20
    },
    {
      "id": "q_mov_ani_05_4",
      "question": "What is the primary cultural and spiritual purpose of an 'ofrenda' and 'cempasúchil' petals in Día de los Muertos?",
      "questionEn": "What is the primary cultural and spiritual purpose of an 'ofrenda' and 'cempasúchil' petals in Día de los Muertos?",
      "questionVi": "Mục đích văn hóa và tâm linh cốt lõi của 'ofrenda' và cánh hoa 'cempasúchil' trong lễ hội Día de los Muertos là gì?",
      "options": [
        "To honor deceased ancestors with photos and offerings while creating a fragrant glowing path to guide their souls home",
        "To drive away evil nocturnal demons and prevent ghosts from lingering in residential neighborhoods",
        "To display expensive luxury porcelain dishes and demonstrate wealth to visiting municipal authorities",
        "To preserve fresh agricultural harvest produce during the dry winter season using flower petals"
      ],
      "optionsEn": [
        "To honor deceased ancestors with photos and offerings while creating a fragrant glowing path to guide their souls home",
        "To drive away evil nocturnal demons and prevent ghosts from lingering in residential neighborhoods",
        "To display expensive luxury porcelain dishes and demonstrate wealth to visiting municipal authorities",
        "To preserve fresh agricultural harvest produce during the dry winter season using flower petals"
      ],
      "optionsVi": [
        "Tôn vinh tổ tiên đã khuất bằng ảnh thờ và lễ vật, đồng thời tạo ra con đường rực rỡ ngát hương dẫn lối linh hồn về thăm nhà",
        "Xua đuổi những linh hồn quỷ dữ bóng đêm và ngăn không cho ma quỷ lảng vảng quanh khu dân cư",
        "Trưng bày những bộ đĩa sứ đắt tiền để phô trương sự giàu có thịnh vượng trước các quan chức địa phương ghé thăm",
        "Bảo quản nông sản tươi thu hoạch qua mùa đông khô cằn bằng các cánh hoa thảo mộc"
      ],
      "correctAnswer": 0,
      "explanation": "An ofrenda honors ancestors with memories and provisions, while marigold petals (cempasúchil) emit fragrance and color to guide departed spirits.",
      "explanationEn": "An ofrenda honors ancestors with memories and provisions, while marigold petals (cempasúchil) emit fragrance and color to guide departed spirits.",
      "explanationVi": "Bàn thờ ofrenda tôn vinh tổ tiên bằng ký ức và đồ cúng, trong khi hoa cúc vạn thọ (cempasúchil) tỏa hương và sắc màu rực rỡ dẫn đường cho linh hồn.",
      "targetedConcept": "Mexican Cultural Lore: Ofrenda & Cempasúchil Marigolds",
      "targetedConceptEn": "Mexican Cultural Lore: Ofrenda & Cempasúchil Marigolds",
      "targetedConceptVi": "Văn hóa Mexico: Bàn thờ Ofrenda và Hoa cúc vạn thọ dẫn lối",
      "referenceSegmentIndex": 22
    },
    {
      "id": "q_mov_ani_05_5",
      "question": "What phonological connected speech rule explains why native speakers pronounce 'rolled up her' as /roʊld ʌp ər/?",
      "questionEn": "What phonological connected speech rule explains why native speakers pronounce 'rolled up her' as /roʊld ʌp ər/?",
      "questionVi": "Quy tắc ngữ âm nối âm nào giải thích lý do người bản xứ phát âm cụm 'rolled up her' liền mạch thành /roʊld ʌp ər/?",
      "options": [
        "The initial unstressed aspirate /h/ sound is elided (dropped), linking the preceding consonant directly to the vowel",
        "The word 'her' undergoes complete nasal assimilation and turns into a guttural French nasal vowel",
        "The vowel in 'rolled' is shortened into a short schwa diphthong while geminating the following plosive /p/",
        "Native speakers replace the liquid consonant /l/ with a velar glide producing a distinct Scottish trill"
      ],
      "optionsEn": [
        "The initial unstressed aspirate /h/ sound is elided (dropped), linking the preceding consonant directly to the vowel",
        "The word 'her' undergoes complete nasal assimilation and turns into a guttural French nasal vowel",
        "The vowel in 'rolled' is shortened into a short schwa diphthong while geminating the following plosive /p/",
        "Native speakers replace the liquid consonant /l/ with a velar glide producing a distinct Scottish trill"
      ],
      "optionsVi": [
        "Âm xát /h/ không nhấn ban đầu bị lược bỏ hoàn toàn, nối trực tiếp phụ âm trước đó /p/ vào nguyên âm /ər/",
        "Từ 'her' trải qua quá trình đồng hóa mũi hoàn toàn và biến thành một nguyên âm mũi chuẩn xác kiểu Pháp",
        "Nguyên âm trong 'rolled' bị rút ngắn thành âm đôi schwa đồng thời nhân đôi phụ âm tắc nổ /p/",
        "Người bản xứ thay thế phụ âm lỏng /l/ bằng một âm lướt ngạc mềm tạo thành âm rung đặc trưng của tiếng Scotland"
      ],
      "correctAnswer": 0,
      "explanation": "In fast spoken English, unstressed pronouns like 'her', 'his', 'him' routinely drop their initial /h/, allowing smooth consonant-to-vowel liaison.",
      "explanationEn": "In fast spoken English, unstressed pronouns like 'her', 'his', 'him' routinely drop their initial /h/, allowing smooth consonant-to-vowel liaison.",
      "explanationVi": "Trong tiếng Anh giao tiếp nhanh, các đại từ không nhấn như 'her', 'his', 'him' thường xuyên bị rụng âm /h/ đầu, giúp nối mượt mà phụ âm vào nguyên âm kế tiếp.",
      "targetedConcept": "Connected Speech: Unstressed /h/ Elision & Consonant-Vowel Linking",
      "targetedConceptEn": "Connected Speech: Unstressed /h/ Elision & Consonant-Vowel Linking",
      "targetedConceptVi": "Nối âm tự nhiên: Hiện tượng rụng âm /h/ và nối phụ âm - nguyên âm",
      "referenceSegmentIndex": 24
    },
    {
      "id": "q_mov_ani_05_6",
      "question": "In the narrative lore of Coco's Land of the Dead, what specifically triggers 'The Final Death'?",
      "questionEn": "In the narrative lore of Coco's Land of the Dead, what specifically triggers 'The Final Death'?",
      "questionVi": "Trong thế giới Xứ sở Người chết của Coco, điều gì cụ thể dẫn đến 'Cái Chết Cuối Cùng'?",
      "options": [
        "When the very last person who remembers the deceased in the living world either forgets them or passes away",
        "When a skeleton fails to cross the marigold petal bridge before the annual stroke of midnight",
        "When an alebrije spirit guardian accidentally incinerates a photo using mythical mystical dragon breath",
        "When an ungrateful musician breaks an antique acoustic guitar inside the crypt of a national hero"
      ],
      "optionsEn": [
        "When the very last person who remembers the deceased in the living world either forgets them or passes away",
        "When a skeleton fails to cross the marigold petal bridge before the annual stroke of midnight",
        "When an alebrije spirit guardian accidentally incinerates a photo using mythical mystical dragon breath",
        "When an ungrateful musician breaks an antique acoustic guitar inside the crypt of a national hero"
      ],
      "optionsVi": [
        "Khi người cuối cùng còn lưu giữ ký ức về người đã khuất ở trần gian quên lãng họ hoặc qua đời",
        "Khi một bộ xương không kịp bước qua cây cầu hoa cúc vạn thọ trước hồi chuông nửa đêm hằng năm",
        "Khi một linh thú dẫn đường alebrije vô tình thiêu rụi một bức ảnh thờ bằng hơi thở rồng thần thoại",
        "Khi một nhạc sĩ vô ơn đập vỡ cây đàn guitar cổ điển bên trong lăng mộ của vị anh hùng dân tộc"
      ],
      "correctAnswer": 0,
      "explanation": "'The Final Death' occurs when no one alive holds memories of the deceased person, dissolving their skeleton into golden dust.",
      "explanationEn": "'The Final Death' occurs when no one alive holds memories of the deceased person, dissolving their skeleton into golden dust.",
      "explanationVi": "'Cái Chết Cuối Cùng' xảy ra khi không còn bất kỳ người sống nào còn nhớ về người đã khuất, khiến linh hồn họ tan biến thành cát bụi vàng.",
      "targetedConcept": "Narrative Lore & Theme: The Final Death (La Muerte Final)",
      "targetedConceptEn": "Narrative Lore & Theme: The Final Death (La Muerte Final)",
      "targetedConceptVi": "Cốt truyện & Triết lý: Cái Chết Cuối Cùng (Sự lãng quên vĩnh viễn)",
      "referenceSegmentIndex": 32
    },
    {
      "id": "q_mov_ani_05_7",
      "question": "What grammatical distinction exists between 'even if' and 'even though' as exemplified in the song 'Remember Me'?",
      "questionEn": "What grammatical distinction exists between 'even if' and 'even though' as exemplified in the song 'Remember Me'?",
      "questionVi": "Điểm khác biệt ngữ pháp nào tồn tại giữa 'even if' và 'even though' như được thể hiện trong ca khúc 'Remember Me'?",
      "options": [
        "Even if introduces a hypothetical or conditional circumstance, whereas even though introduces a real, factual truth",
        "Even if can only be used with past perfect subjunctive verbs, while even though is restricted to imperative clauses",
        "Even if implies total grammatical certainty, whereas even though denotes an improbable fantasy speculation",
        "Even if is exclusively used in formal British legal contracts, whereas even though is informal slang"
      ],
      "optionsEn": [
        "Even if introduces a hypothetical or conditional circumstance, whereas even though introduces a real, factual truth",
        "Even if can only be used with past perfect subjunctive verbs, while even though is restricted to imperative clauses",
        "Even if implies total grammatical certainty, whereas even though denotes an improbable fantasy speculation",
        "Even if is exclusively used in formal British legal contracts, whereas even though is informal slang"
      ],
      "optionsVi": [
        "Even if mở đầu một tình huống giả định hoặc có điều kiện, trong khi even though mở đầu một sự thật hiển nhiên có thực",
        "Even if chỉ có thể dùng với thì quá khứ hoàn thành giả định, trong khi even though bị giới hạn trong câu mệnh lệnh",
        "Even if ám chỉ sự chắc chắn tuyệt đối, trong khi even though thể hiện một suy đoán viển vông phi thực tế",
        "Even if chỉ được dùng độc quyền trong hợp đồng pháp lý của Anh, trong khi even though là tiếng lóng suồng sã"
      ],
      "correctAnswer": 0,
      "explanation": "'Even if' expresses hypothetical conditions ('even if I am far away... I still hold you'), whereas 'even though' acknowledges an existing, real fact.",
      "explanationEn": "'Even if' expresses hypothetical conditions ('even if I am far away... I still hold you'), whereas 'even though' acknowledges an existing, real fact.",
      "explanationVi": "'Even if' diễn tả điều kiện giả định ('cho dù cha ở phương xa... cha vẫn ôm con trong tim'), trong khi 'even though' thừa nhận một sự thật có thực đã xảy ra.",
      "targetedConcept": "Grammar Contrast: Hypothetical 'Even If' vs Factual 'Even Though'",
      "targetedConceptEn": "Grammar Contrast: Hypothetical 'Even If' vs Factual 'Even Though'",
      "targetedConceptVi": "Ngữ pháp so sánh: Giả định 'Even if' và Thực tế 'Even though'",
      "referenceSegmentIndex": 39
    },
    {
      "id": "q_mov_ani_05_8",
      "question": "How does Miguel's acoustic rendition of 'Remember Me' resolve the film's climax with Mamá Coco?",
      "questionEn": "How does Miguel's acoustic rendition of 'Remember Me' resolve the film's climax with Mamá Coco?",
      "questionVi": "Màn biểu diễn mộc mạc ca khúc 'Remember Me' của Miguel đã giải quyết cao trào của bộ phim với cụ Mamá Coco như thế nào?",
      "options": [
        "It unlocks deep-seated childhood sensory memories, reviving Coco's recollection of Héctor and proving his paternal devotion",
        "It hypnotizes the entire family into forgiving Ernesto de la Cruz and funding a nationwide musical tour",
        "It grants Miguel supernatural telekinetic powers allowing him to speak directly with ancient spirits",
        "It instantly heals Coco's physical aging and restores her youthful physical energy back to age twenty"
      ],
      "optionsEn": [
        "It unlocks deep-seated childhood sensory memories, reviving Coco's recollection of Héctor and proving his paternal devotion",
        "It hypnotizes the entire family into forgiving Ernesto de la Cruz and funding a nationwide musical tour",
        "It grants Miguel supernatural telekinetic powers allowing him to speak directly with ancient spirits",
        "It instantly heals Coco's physical aging and restores her youthful physical energy back to age twenty"
      ],
      "optionsVi": [
        "Nó khơi dậy những ký ức tuổi thơ sâu kín, đánh thức sự hồi tưởng của Coco về Héctor và chứng minh tình yêu phụ tử thiêng liêng",
        "Nó thôi miên toàn bộ gia đình tha thứ cho Ernesto de la Cruz và tài trợ cho một chuyến lưu diễn âm nhạc toàn quốc",
        "Nó ban cho Miguel siêu năng lực điều khiển đồ vật từ xa cho phép cậu trò chuyện trực tiếp với các linh hồn cổ xưa",
        "Nó lập tức chữa lành sự lão hóa thể chất của cụ Coco và phục hồi năng lượng tuổi đôi mươi của cụ"
      ],
      "correctAnswer": 0,
      "explanation": "The personal lullaby sung by Miguel awakens Mamá Coco's dementia-clouded memory, allowing her to remember her father Héctor and save him from oblivion.",
      "explanationEn": "The personal lullaby sung by Miguel awakens Mamá Coco's dementia-clouded memory, allowing her to remember her father Héctor and save him from oblivion.",
      "explanationVi": "Khúc hát ru riêng tư được Miguel cất lên đã đánh thức ký ức bị sương mù tuổi già che lấp của cụ Mamá Coco, giúp cụ nhớ lại cha mình là Héctor và cứu ông khỏi sự lãng quên.",
      "targetedConcept": "Climax Resolution & Emotional Music Therapy (Awakening Memory)",
      "targetedConceptEn": "Climax Resolution & Emotional Music Therapy (Awakening Memory)",
      "targetedConceptVi": "Giải quyết cao trào & Sức mạnh trị liệu ký ức của âm nhạc",
      "referenceSegmentIndex": 46
    }
  ]
}

target_file = 'features/listening/data/lessons/movies/animation/lesson_coco.ts'

ts_code = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Coco: Miguel & Héctor 'Remember Me' with Mama Coco
 * Category: Hoạt Hình Pixar & Disney (cat_animation_pixar_disney)
 * Level: CEFR B1 | American Accent
 * YouTube ID: EQ9RFbIHrFw (16:18 - 978s)
 * Views: 835,393 | Likes: High Engagement | RealLife English & Pixar
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI VIDEO GỐC (00:10 - 16:18)
 * TIÊU CHUẨN ZERO MERGED UTTERANCES - 50 MASTER SEGMENTS - 8 QUIZ CEFR B2
 * ============================================================================
 */

export const QUIZ_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED: VideoQuizData = {json.dumps(quiz_data, indent=2, ensure_ascii=False)};

export const LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED: MockVideoLesson = {{
  id: "mov_ani_05",
  slug: "coco-remember-me-with-mama-coco-extended",
  title: "Coco: Miguel & Héctor 'Remember Me' with Mama Coco",
  categoryId: "cat_animation_pixar_disney",
  categorySlug: "animation-pixar-disney",
  categoryName: "Hoạt Hình Pixar & Disney",
  cefrLevel: "B1",
  durationFormatted: "16:18",
  durationSeconds: 978,
  externalId: "EQ9RFbIHrFw",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/EQ9RFbIHrFw/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 125,
  viewCount: 835393,
  studyCount: 6120,
  description:
    "Phân đoạn xúc động lấy đi nước mắt của hàng triệu khán giả: Cậu bé Miguel đàn hát khúc ca 'Remember Me' cho cụ cố Mamá Coco để đánh thức ký ức yêu thương về người cha Héctor, vượt qua nỗi sợ 'Cái Chết Cuối Cùng' (The Final Death) trong truyền thuyết Día de los Muertos.",
  segments: {json.dumps(segments, indent=4, ensure_ascii=False)}
}};

export default LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED;
'''

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(ts_code)

print(f"Successfully generated Coco lesson file with {len(segments)} segments: {target_file}")
