# -*- coding: utf-8 -*-
"""
Generate complete lesson_pride_and_prejudice.ts with 81 pure turn-by-turn master segments
and 8 bilingual comprehension quiz questions.
"""

import json

with open("scripts/all_pure_pride_segments.json", "r", encoding="utf-8") as f:
    segments = json.load(f)

quiz_data = {
    "lessonId": "mov_rom_05",
    "lessonTitle": "Pride and Prejudice: Mr. Darcy's Unspoken Longing & Devotion",
    "totalQuestions": 8,
    "xpReward": 100,
    "generatedBy": "AI_GEMINI",
    "questions": [
        {
            "id": "mov_rom_05_q1",
            "question": "Why did Elizabeth Bennet arrive at Netherfield with her hem 'six inches deep in mud'?",
            "questionEn": "Why did Elizabeth Bennet arrive at Netherfield with her hem 'six inches deep in mud'?",
            "questionVi": "Vì sao Elizabeth Bennet lại đến Netherfield với gấu váy 'lấm lem bùn đất sâu đến tận sáu phân'?",
            "options": [
                "She lost her carriage on the way to London.",
                "She walked through muddy fields out of deep sisterly devotion to care for sick Jane.",
                "She was chased by Mr. Wickham's regiment.",
                "She was practicing walking according to Darcy's standards."
            ],
            "optionsEn": [
                "She lost her carriage on the way to London.",
                "She walked through muddy fields out of deep sisterly devotion to care for sick Jane.",
                "She was chased by Mr. Wickham's regiment.",
                "She was practicing walking according to Darcy's standards."
            ],
            "optionsVi": [
                "Nàng bị hỏng xe ngựa trên đường đến London.",
                "Nàng đã đi bộ băng qua cánh đồng sình lầy vì tình chị em sâu sắc để chăm sóc Jane bị ốm.",
                "Nàng bị truy đuổi bởi trung đoàn của ngài Wickham.",
                "Nàng đang luyện tập dáng đi theo tiêu chuẩn của Darcy."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 3-7, Elizabeth arrives on foot to care for her sister Jane who is unwell upstairs, defying Regency high-society vanity.",
            "explanationEn": "In Segments 3-7, Elizabeth arrives on foot to care for her sister Jane who is unwell upstairs, defying Regency high-society vanity.",
            "explanationVi": "Trong các Phân đoạn 3-7, Elizabeth giải thích nàng đã đi bộ tới Netherfield vì lo lắng cho người chị gái Jane bị sốt trên lầu, bất chấp lễ nghi hình thức xã giao.",
            "targetedConcept": "Character motivation and sisterly devotion over Regency social conventions",
            "targetedConceptEn": "Character motivation and sisterly devotion over Regency social conventions",
            "targetedConceptVi": "Động cơ nhân vật và tình chị em vượt lên trên các khuôn mẫu xã giao thời Regency",
            "referenceSegmentIndex": 5
        },
        {
            "id": "mov_rom_05_q2",
            "question": "What unexpected criterion does Mr. Darcy add to the definition of 'an accomplished woman'?",
            "questionEn": "What unexpected criterion does Mr. Darcy add to the definition of 'an accomplished woman'?",
            "questionVi": "Ngài Darcy đã bổ sung tiêu chí bất ngờ nào vào định nghĩa về 'một người phụ nữ tài đức vẹn toàn'?",
            "options": [
                "A large dowry of thirty thousand pounds.",
                "Something in her natural air and manner of walking.",
                "Absolute obedience to her husband's family.",
                "The ability to dance every set without fatigue."
            ],
            "optionsEn": [
                "A large dowry of thirty thousand pounds.",
                "Something in her natural air and manner of walking.",
                "Absolute obedience to her husband's family.",
                "The ability to dance every set without fatigue."
            ],
            "optionsVi": [
                "Một khoản của hồi môn kếch xù ba mươi ngàn bảng Anh.",
                "Một nét đặc biệt trong thần thái tự nhiên và dáng điệu bước đi của nàng.",
                "Sự phục tùng tuyệt đối gia đình nhà chồng.",
                "Khả năng khiêu vũ mọi điệu nhảy mà không hề mỏi mệt."
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 14, Mr. Darcy gazes at Elizabeth and remarks: 'And something in her air and manner of walking...', subtly referencing her spirited walk through the mud.",
            "explanationEn": "In Segment 14, Mr. Darcy gazes at Elizabeth and remarks: 'And something in her air and manner of walking...', subtly referencing her spirited walk through the mud.",
            "explanationVi": "Trong Phân đoạn 14, ngài Darcy nhìn chăm chú vào Elizabeth và nhận xét: 'Và còn phải có một nét gì đó trong thần thái cùng dáng điệu bước đi của nàng...', kín đáo nhắc đến bước chân tràn đầy sức sống của cô qua bùn lầy.",
            "targetedConcept": "Subtle romantic admiration and poetic character appreciation",
            "targetedConceptEn": "Subtle romantic admiration and poetic character appreciation",
            "targetedConceptVi": "Sự ngưỡng mộ lãng mạn tinh tế và nhận định thẩm mỹ về nhân vật",
            "referenceSegmentIndex": 14
        },
        {
            "id": "mov_rom_05_q3",
            "question": "What surprising action does Mr. Darcy take during the Netherfield Ball?",
            "questionEn": "What surprising action does Mr. Darcy take during the Netherfield Ball?",
            "questionVi": "Ngài Darcy đã có hành động đầy bất ngờ nào trong đêm dạ vũ Netherfield Ball?",
            "options": [
                "He leaves the ballroom early without saying goodbye.",
                "He approaches Elizabeth and asks for the honour of the next dance.",
                "He criticizes Elizabeth's dancing technique in front of everyone.",
                "He announces his engagement to Lady Catherine's daughter."
            ],
            "optionsEn": [
                "He leaves the ballroom early without saying goodbye.",
                "He approaches Elizabeth and asks for the honour of the next dance.",
                "He criticizes Elizabeth's dancing technique in front of everyone.",
                "He announces his engagement to Lady Catherine's daughter."
            ],
            "optionsVi": [
                "Ngài rời khỏi phòng khiêu vũ sớm mà không chào từ biệt ai.",
                "Ngài chủ động tiến tới gần Elizabeth và mời nàng khiêu vũ điệu tiếp theo.",
                "Ngài phê bình kỹ thuật khiêu vũ của Elizabeth trước mặt mọi người.",
                "Ngài công bố đính hôn với con gái của Lady Catherine."
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 16, Mr. Darcy breaks his usual aristocratic standoffishness to ask: 'May I have the next dance, Miss Elizabeth?'",
            "explanationEn": "In Segment 16, Mr. Darcy breaks his usual aristocratic standoffishness to ask: 'May I have the next dance, Miss Elizabeth?'",
            "explanationVi": "Trong Phân đoạn 16, ngài Darcy phá vỡ khoảng cách quý tộc thường lệ để ngỏ lời: 'Tôi có thể xin vinh hạnh được khiêu vũ điệu tiếp theo cùng tiểu thư Elizabeth không?'",
            "targetedConcept": "Overcoming aristocratic pride through romantic initiative",
            "targetedConceptEn": "Overcoming aristocratic pride through romantic initiative",
            "targetedConceptVi": "Vượt qua định kiến quý tộc bằng chủ động tình cảm",
            "referenceSegmentIndex": 16
        },
        {
            "id": "mov_rom_05_q4",
            "question": "What personal vulnerability does Mr. Darcy confess to Elizabeth beside the pianoforte at Rosings?",
            "questionEn": "What personal vulnerability does Mr. Darcy confess to Elizabeth beside the pianoforte at Rosings?",
            "questionVi": "Ngài Darcy đã thú nhận điểm yếu cá nhân nào với Elizabeth bên phím đàn piano forte tại Rosings?",
            "options": [
                "He suffers from severe stage fright when dancing.",
                "He does not have the talent of conversing easily with strangers.",
                "He cannot read musical notes.",
                "He dislikes the countryside and Hertfordshire society."
            ],
            "optionsEn": [
                "He suffers from severe stage fright when dancing.",
                "He does not have the talent of conversing easily with strangers.",
                "He cannot read musical notes.",
                "He dislikes the countryside and Hertfordshire society."
            ],
            "optionsVi": [
                "Ngài mắc chứng sợ sân khấu nghiêm trọng khi khiêu vũ.",
                "Ngài không có năng khiếu trò chuyện một cách dễ dàng với những người xa lạ.",
                "Ngài không biết đọc các nốt nhạc.",
                "Ngài ghét bỏ miền thôn dã và xã hội Hertfordshire."
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 28, Mr. Darcy candidly admits: 'I do not have the talent of conversing easily with people I have never met before.'",
            "explanationEn": "In Segment 28, Mr. Darcy candidly admits: 'I do not have the talent of conversing easily with people I have never met before.'",
            "explanationVi": "Trong Phân đoạn 28, ngài Darcy chân thành thú nhận: 'Tôi không có khiếu trò chuyện một cách dễ dàng với những người mà tôi chưa từng gặp trước đây.'",
            "targetedConcept": "Psychological depth and social anxiety underlying aloof aristocratic exterior",
            "targetedConceptEn": "Psychological depth and social anxiety underlying aloof aristocratic exterior",
            "targetedConceptVi": "Chiều sâu tâm lý và sự lúng túng xã hội ẩn sau vẻ ngoài quý tộc lạnh lùng",
            "referenceSegmentIndex": 28
        },
        {
            "id": "mov_rom_05_q5",
            "question": "What famous declaration concludes Mr. Darcy's stormy proposal at the Temple of Apollo?",
            "questionEn": "What famous declaration concludes Mr. Darcy's stormy proposal at the Temple of Apollo?",
            "questionVi": "Tuyên ngôn nổi tiếng nào đã kết lại lời cầu hôn giông bão của ngài Darcy tại Đền thần Apollo?",
            "options": [
                "'I offer you my fortune and estate.'",
                "'I love you. Most ardently.'",
                "'You must marry me to secure your family.'",
                "'I forgive your lack of fortune.'"
            ],
            "optionsEn": [
                "'I offer you my fortune and estate.'",
                "'I love you. Most ardently.'",
                "'You must marry me to secure your family.'",
                "'I forgive your lack of fortune.'"
            ],
            "optionsVi": [
                "'Tôi trao cho nàng toàn bộ cơ ngơi và gia sản của tôi.'",
                "'Tôi yêu nàng. Tha thiết và nồng cháy khôn cùng.'",
                "'Nàng phải cưới tôi để bảo đảm tương lai cho gia đình nàng.'",
                "'Tôi tha thứ cho sự thiếu thốn gia sản của nàng.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 41, Mr. Darcy passionately declares: 'I love you. Most ardently.'",
            "explanationEn": "In Segment 41, Mr. Darcy passionately declares: 'I love you. Most ardently.'",
            "explanationVi": "Trong Phân đoạn 41, ngài Darcy bày tỏ sâu sắc: 'Tôi yêu nàng. Tha thiết và nồng cháy khôn cùng.'",
            "targetedConcept": "Iconic romantic quote and dramatic passion in classical cinema",
            "targetedConceptEn": "Iconic romantic quote and dramatic passion in classical cinema",
            "targetedConceptVi": "Trích dẫn lãng mạn kinh điển và đam mê kịch tính trong điện ảnh cổ điển",
            "referenceSegmentIndex": 41
        },
        {
            "id": "mov_rom_05_q6",
            "question": "How does Mr. Darcy demonstrate his transformation when meeting Elizabeth unexpectedly at Pemberley?",
            "questionEn": "How does Mr. Darcy demonstrate his transformation when meeting Elizabeth unexpectedly at Pemberley?",
            "questionVi": "Ngài Darcy thể hiện sự thay đổi ngoạn mục của mình như thế nào khi bất ngờ gặp lại Elizabeth tại Pemberley?",
            "options": [
                "He angrily demands to know why she entered his estate.",
                "He treats her with gentle courtesy, inquires after her journey, remembers her love of walking, and introduces his sister Georgiana.",
                "He immediately proposes to her a second time in front of his servants.",
                "He pretends not to recognize her."
            ],
            "optionsEn": [
                "He angrily demands to know why she entered his estate.",
                "He treats her with gentle courtesy, inquires after her journey, remembers her love of walking, and introduces his sister Georgiana.",
                "He immediately proposes to her a second time in front of his servants.",
                "He pretends not to recognize her."
            ],
            "optionsVi": [
                "Ngài tức giận gặng hỏi vì sao nàng lại dám tự tiện bước vào điền trang của mình.",
                "Ngài đối đãi bằng sự lịch thiệp ân cần, hỏi thăm chuyến đi, ghi nhớ sở thích đi bộ của nàng và giới thiệu em gái Georgiana.",
                "Ngài lập tức cầu hôn nàng lần thứ hai ngay trước mặt những người hầu.",
                "Ngài giả vờ như không hề nhận ra nàng."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 43-52, Darcy exhibits complete humility, polite warmth, attentive memory of her walking habit, and welcomes her into his family circle.",
            "explanationEn": "In Segments 43-52, Darcy exhibits complete humility, polite warmth, attentive memory of her walking habit, and welcomes her into his family circle.",
            "explanationVi": "Trong các Phân đoạn 43-52, Darcy thể hiện sự khiêm nhường tột bậc, ấm áp ân cần, ghi nhớ thói quen đi bộ của cô và đưa cô vào vòng tay gia đình chàng.",
            "targetedConcept": "Character growth from aristocratic pride to genuine humility and devotion",
            "targetedConceptEn": "Character growth from aristocratic pride to genuine humility and devotion",
            "targetedConceptVi": "Sự trưởng thành nhân vật từ kiêu hãnh quý tộc sang lòng khiêm nhường và tận tụy chân thành",
            "referenceSegmentIndex": 52
        },
        {
            "id": "mov_rom_05_q7",
            "question": "What immortal words does Mr. Darcy utter during his sunrise confession to Elizabeth in the misty meadow?",
            "questionEn": "What immortal words does Mr. Darcy utter during his sunrise confession to Elizabeth in the misty meadow?",
            "questionVi": "Ngài Darcy đã thốt lên những lời bất hủ nào trong lời tỏ tình lúc bình minh trên đồng cỏ sương sớm với Elizabeth?",
            "options": [
                "'I have secured my aunt's permission to marry you.'",
                "'You have bewitched me, body and soul, and I love, I love, I love you. I never wish to be parted from you from this day on.'",
                "'My pride has finally been conquered by your family's fortune.'",
                "'Let us return to London together at once.'"
            ],
            "optionsEn": [
                "'I have secured my aunt's permission to marry you.'",
                "'You have bewitched me, body and soul, and I love, I love, I love you. I never wish to be parted from you from this day on.'",
                "'My pride has finally been conquered by your family's fortune.'",
                "'Let us return to London together at once.'"
            ],
            "optionsVi": [
                "'Tôi đã xin được sự ưng thuận của bà dì tôi để kết hôn với nàng.'",
                "'Nàng đã bỏ bùa mê tôi, cả thể xác lẫn tâm hồn, và tôi yêu, tôi yêu, tôi yêu nàng tha thiết. Tôi không bao giờ muốn phải rời xa nàng kể từ ngày hôm nay trở đi nữa.'",
                "'Lòng kiêu hãnh của tôi cuối cùng đã bị chinh phục bởi gia sản của nhà nàng.'",
                "'Chúng ta hãy cùng nhau trở về London ngay lập tức.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 76-77, Mr. Darcy whispers the immortal climax: 'You have bewitched me, body and soul, and I love, I love, I love you. I never wish to be parted from you from this day on.'",
            "explanationEn": "In Segments 76-77, Mr. Darcy whispers the immortal climax: 'You have bewitched me, body and soul, and I love, I love, I love you. I never wish to be parted from you from this day on.'",
            "explanationVi": "Trong các Phân đoạn 76-77, ngài Darcy thốt lên cao trào bất hủ: 'Nàng đã bỏ bùa mê tôi, cả thể xác lẫn tâm hồn, và tôi yêu, tôi yêu, tôi yêu nàng tha thiết. Tôi không bao giờ muốn phải rời xa nàng kể từ ngày hôm nay trở đi nữa.'",
            "targetedConcept": "Immortal romantic climax of English literature and cinema",
            "targetedConceptEn": "Immortal romantic climax of English literature and cinema",
            "targetedConceptVi": "Đỉnh cao lãng mạn bất hủ của nền văn học và điện ảnh Anh quốc",
            "referenceSegmentIndex": 76
        },
        {
            "id": "mov_rom_05_q8",
            "question": "What deeply emotional words of blessing does Mr. Bennet give Elizabeth in his study?",
            "questionEn": "What deeply emotional words of blessing does Mr. Bennet give Elizabeth in his study?",
            "questionVi": "Những lời chúc phúc đầy xúc động nào mà ông Bennet đã trao cho Elizabeth trong thư phòng của mình?",
            "options": [
                "'I always knew you would secure a wealthy husband.'",
                "'I could not have parted with you, my dear Lizzy, to anyone less worthy.'",
                "'Your mother will be exceedingly proud of Pemberley.'",
                "'You must promise never to visit us again.'"
            ],
            "optionsEn": [
                "'I always knew you would secure a wealthy husband.'",
                "'I could not have parted with you, my dear Lizzy, to anyone less worthy.'",
                "'Your mother will be exceedingly proud of Pemberley.'",
                "'You must promise never to visit us again.'"
            ],
            "optionsVi": [
                "'Cha luôn biết rằng con sẽ kiếm được một tấm chồng giàu sang phú quý.'",
                "'Cha không thể nào gả con gái cưng Lizzy của cha cho bất kỳ ai kém xứng đáng hơn ngài ấy.'",
                "'Mẹ con chắc chắn sẽ vô cùng hãnh diện về điền trang Pemberley.'",
                "'Con phải hứa là sẽ không bao giờ về thăm chúng ta nữa đấy nhé.'"
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 80, Mr. Bennet tears up and blesses Elizabeth: 'I could not have parted with you, my dear Lizzy, to anyone less worthy.'",
            "explanationEn": "In Segment 80, Mr. Bennet tears up and blesses Elizabeth: 'I could not have parted with you, my dear Lizzy, to anyone less worthy.'",
            "explanationVi": "Trong Phân đoạn 80, ông Bennet rưng rưng xúc động trao lời chúc phúc: 'Cha không thể nào gả con gái cưng Lizzy của cha cho bất kỳ ai kém xứng đáng hơn ngài ấy.'",
            "targetedConcept": "Paternal emotional blessing and profound validation of equal minds",
            "targetedConceptEn": "Paternal emotional blessing and profound validation of equal minds",
            "targetedConceptVi": "Lời chúc phúc của người cha và sự công nhận tuyệt đối về hai tâm hồn môn đăng hộ đối",
            "referenceSegmentIndex": 80
        }
    ]
}

ts_code = f'''import {{ MockVideoLesson, VideoQuizData }} from "../../../types";

/**
 * ============================================================================
 * LESSON: Pride and Prejudice: Mr. Darcy's Unspoken Longing & Devotion
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR C1 | British (Period RP)
 * YouTube ID: baGBRtR53TA (10:04 - 604s)
 * Views: 3,573,834 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE & VERBATIM LỜI THOẠI TOÀN BỘ VIDEO TỪ 00:00 ĐẾN 10:04
 * 81 Pure Master Segments Chuẩn Mực Từng Lượt Thoại Độc Lập Không Gộp
 * ============================================================================
 */

export const QUIZ_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN: VideoQuizData = {json.dumps(quiz_data, ensure_ascii=False, indent=2)};

export const LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN: MockVideoLesson = {{
  id: "mov_rom_05",
  slug: "pride-and-prejudice-rain-proposal-dawn",
  title: "Pride and Prejudice: Mr. Darcy's Unspoken Longing & Devotion",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "C1",
  durationFormatted: "10:04",
  durationSeconds: 604,
  externalId: "baGBRtR53TA",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/baGBRtR53TA/hqdefault.jpg",
  accent: "British (Period RP)",
  wpmSpeed: 128,
  viewCount: 3573834,
  studyCount: 5400,
  description:
    "Kiệt tác văn học chuyển thể điện ảnh kinh điển: Ánh mắt si tình, sự kìm nén cảm xúc và hành trình vượt qua kiêu hãnh cùng định kiến của ngài Darcy (Matthew Macfadyen) trước Elizabeth Bennet (Keira Knightley).",
  segments: {json.dumps(segments, ensure_ascii=False, indent=4)},
}};
'''

out_path = "features/listening/data/lessons/movies/romance/lesson_pride_and_prejudice.ts"
with open(out_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully generated {out_path} with {len(segments)} pure segments and {len(quiz_data['questions'])} quiz questions.")
