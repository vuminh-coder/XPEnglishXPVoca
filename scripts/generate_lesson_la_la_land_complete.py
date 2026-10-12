# -*- coding: utf-8 -*-
"""
Generate complete lesson_la_la_land.ts with 40 segments and 6 bilingual quiz questions.
"""
import json

with open('scripts/all_40_laland_segments.json', 'r', encoding='utf-8') as f:
    segments_data = json.load(f)

quiz_data = {
  "lessonId": "mov_rom_03",
  "lessonTitle": "La La Land: Sebastian & Mia's Fierce Surprise Dinner Confrontation (Full Master Cut)",
  "totalQuestions": 6,
  "xpReward": 100,
  "generatedBy": "AI_GEMINI",
  "questions": [
    {
      "id": "mov_rom_03_q1",
      "question": "Why does Mia express deep anxiety about her upcoming one-woman show?",
      "questionEn": "Why does Mia express deep anxiety about her upcoming one-woman show?",
      "questionVi": "Tại sao Mia lại bày tỏ nỗi lo sợ sâu sắc về buổi diễn kịch độc thoại sắp tới của mình?",
      "options": [
        "She hasn't memorized the script yet.",
        "She is terrified of getting up on a stage and performing in front of people who might judge her.",
        "The venue cancelled her reservation.",
        "Sebastian refused to help her buy props."
      ],
      "optionsEn": [
        "She hasn't memorized the script yet.",
        "She is terrified of getting up on a stage and performing in front of people who might judge her.",
        "The venue cancelled her reservation.",
        "Sebastian refused to help her buy props."
      ],
      "optionsVi": [
        "Cô vẫn chưa học thuộc kịch bản.",
        "Cô sợ cảm giác phải bước lên sân khấu và biểu diễn trước mặt khán giả đánh giá mình.",
        "Địa điểm tổ chức đã hủy đặt chỗ của cô.",
        "Sebastian từ chối giúp cô mua đạo cụ biểu diễn."
      ],
      "correctAnswer": 1,
      "explanation": "In Segment 3, Mia confesses: 'I'm nervous to get up on a stage and perform for people. I'm terrified.'",
      "explanationEn": "In Segment 3, Mia confesses: 'I'm nervous to get up on a stage and perform for people. I'm terrified.'",
      "explanationVi": "Trong Phân đoạn 3, Mia bộc bạch: 'Em sợ cảm giác bước lên sân khấu và biểu diễn trước mặt mọi người. Em sợ phát khiếp lên được.'",
      "targetedConcept": "Artistic vulnerability and stage fright",
      "targetedConceptEn": "Artistic vulnerability and stage fright",
      "targetedConceptVi": "Sự mong manh của nghệ sĩ và nỗi sợ sân khấu",
      "referenceSegmentIndex": 3
    },
    {
      "id": "mov_rom_03_q2",
      "question": "Why is Mia shocked when Sebastian explains the realities of touring with Keith's band?",
      "questionEn": "Why is Mia shocked when Sebastian explains the realities of touring with Keith's band?",
      "questionVi": "Tại sao Mia lại bàng hoàng khi Sebastian giải thích về thực tế của việc đi lưu diễn cùng ban nhạc của Keith?",
      "options": [
        "Because the pay is much lower than he expected.",
        "Because it is a long-term cycle of touring to record and touring to sell, keeping him on the road for years.",
        "Because Keith asked him to play the trumpet instead of the piano.",
        "Because they are not allowed to play jazz covers."
      ],
      "optionsEn": [
        "Because the pay is much lower than he expected.",
        "Because it is a long-term cycle of touring to record and touring to sell, keeping him on the road for years.",
        "Because Keith asked him to play the trumpet instead of the piano.",
        "Because they are not allowed to play jazz covers."
      ],
      "optionsVi": [
        "Vì mức thù lao thấp hơn nhiều so với kỳ vọng của anh.",
        "Vì đó là vòng lặp dài hạn: đi tour để thu đĩa rồi lại đi tour để bán đĩa, khiến anh phải xa nhà hàng năm trời.",
        "Vì Keith yêu cầu anh chơi kèn trumpet thay vì đàn piano.",
        "Vì ban nhạc không được phép cover các bài nhạc jazz."
      ],
      "correctAnswer": 1,
      "explanation": "In Segments 15 and 16, Sebastian details: 'We tour so we can make the records, so we can go back and sell the record... it's like the long haul.'",
      "explanationEn": "In Segments 15 and 16, Sebastian details: 'We tour so we can make the records, so we can go back and sell the record... it's like the long haul.'",
      "explanationVi": "Trong Phân đoạn 15 và 16, Sebastian giải thích: 'Bọn anh lưu diễn để có tiền làm album, rồi lại đi lưu diễn để quảng bá bán đĩa... đó là một chặng đường dài hạn đằng đẵng.'",
      "targetedConcept": "The endless cycle of commercial touring",
      "targetedConceptEn": "The endless cycle of commercial touring",
      "targetedConceptVi": "Vòng luẩn quẩn của ngành công nghiệp lưu diễn thương mại",
      "referenceSegmentIndex": 15
    },
    {
      "id": "mov_rom_03_q3",
      "question": "What core objection does Mia raise when questioning Sebastian's musical choices?",
      "questionEn": "What core objection does Mia raise when questioning Sebastian's musical choices?",
      "questionVi": "Lời chất vấn cốt lõi nào Mia đưa ra khi nghi ngờ những lựa chọn âm nhạc của Sebastian?",
      "options": [
        "That his piano playing sounds out of tune.",
        "That he doesn't actually like the commercial music he is playing and is abandoning his authentic dream.",
        "That he is touring in cities she dislikes.",
        "That the band members are impolite to her."
      ],
      "optionsEn": [
        "That his piano playing sounds out of tune.",
        "That he doesn't actually like the commercial music he is playing and is abandoning his authentic dream.",
        "That he is touring in cities she dislikes.",
        "That the band members are impolite to her."
      ],
      "optionsVi": [
        "Rằng tiếng đàn piano của anh bị lệch tông.",
        "Rằng anh không thực sự yêu thích thứ âm nhạc thương mại đang chơi và đang từ bỏ giấc mơ nguyên bản của mình.",
        "Rằng anh đang đi lưu diễn ở những thành phố mà cô không thích.",
        "Rằng các thành viên ban nhạc cư xử thô lỗ với cô."
      ],
      "correctAnswer": 1,
      "explanation": "In Segments 20 and 21, Mia challenges him: 'It matters because if you're gonna give up your dream, I think it matters that you like what you're playing.'",
      "explanationEn": "In Segments 20 and 21, Mia challenges him: 'It matters because if you're gonna give up your dream, I think it matters that you like what you're playing.'",
      "explanationVi": "Trong Phân đoạn 20 và 21, Mia thẳng thắn chất vấn: 'Nó quan trọng chứ, bởi vì nếu anh từ bỏ ước mơ của mình, em nghĩ điều quan trọng là anh phải yêu thích những gì anh đang chơi.'",
      "targetedConcept": "Artistic integrity vs commercial compromise",
      "targetedConceptEn": "Artistic integrity vs commercial compromise",
      "targetedConceptVi": "Sự kiên định nghệ thuật đối lập với thỏa hiệp thương mại",
      "referenceSegmentIndex": 21
    },
    {
      "id": "mov_rom_03_q4",
      "question": "What inspiring philosophy about human connection does Mia tell Sebastian to encourage his jazz club?",
      "questionEn": "What inspiring philosophy about human connection does Mia tell Sebastian to encourage his jazz club?",
      "questionVi": "Triết lý truyền cảm hứng nào về sự kết nối con người mà Mia nói với Sebastian để khuyến khích anh mở quán jazz?",
      "options": [
        "People only care about celebrity endorsements and cheap drinks.",
        "People will want to go because you're passionate about it, and people love what other people are passionate about.",
        "Jazz is the most profitable genre in Los Angeles.",
        "Advertising on social media will guarantee packed crowds."
      ],
      "optionsEn": [
        "People only care about celebrity endorsements and cheap drinks.",
        "People will want to go because you're passionate about it, and people love what other people are passionate about.",
        "Jazz is the most profitable genre in Los Angeles.",
        "Advertising on social media will guarantee packed crowds."
      ],
      "optionsVi": [
        "Mọi người chỉ quan tâm đến sự bảo chứng của người nổi tiếng và đồ uống giá rẻ.",
        "Mọi người sẽ muốn đến vì anh đam mê nó, và người ta luôn yêu thích những gì mà người khác đam mê chân thành.",
        "Jazz là thể loại âm nhạc sinh lời cao nhất ở Los Angeles.",
        "Quảng cáo rầm rộ trên mạng xã hội sẽ đảm bảo quán luôn chật kín khách."
      ],
      "correctAnswer": 1,
      "explanation": "In Segment 31, Mia declares: 'People will want to go to it because you're passionate about it, and people love what other people are passionate about! You remind people of what they forgot.'",
      "explanationEn": "In Segment 31, Mia declares: 'People will want to go to it because you're passionate about it, and people love what other people are passionate about! You remind people of what they forgot.'",
      "explanationVi": "Trong Phân đoạn 31, Mia khẳng định câu thoại kinh điển: 'Mọi người sẽ muốn đến đó vì anh đam mê nó, và người ta luôn yêu thích những gì mà người khác đam mê! Anh nhắc cho mọi người nhớ lại những điều đẹp đẽ họ từng lãng quên.'",
      "targetedConcept": "The contagious power of authentic passion",
      "targetedConceptEn": "The contagious power of authentic passion",
      "targetedConceptVi": "Sức lan tỏa kỳ diệu của niềm đam mê chân chính",
      "referenceSegmentIndex": 31
    },
    {
      "id": "mov_rom_03_q5",
      "question": "What hurtful accusation does Sebastian throw at Mia that escalates the argument to a breaking point?",
      "questionEn": "What hurtful accusation does Sebastian throw at Mia that escalates the argument to a breaking point?",
      "questionVi": "Lời quy chụp gây tổn thương nào mà Sebastian buông ra với Mia khiến cuộc cãi vã leo thang đến đỉnh điểm?",
      "options": [
        "That she is a terrible playwright who can't act.",
        "That she only liked him when he was on his ass (struggling and broke) because it made her feel better about herself.",
        "That she was secretly dating another casting director.",
        "That she never appreciated his cooking."
      ],
      "optionsEn": [
        "That she is a terrible playwright who can't act.",
        "That she only liked him when he was on his ass (struggling and broke) because it made her feel better about herself.",
        "That she was secretly dating another casting director.",
        "That she never appreciated his cooking."
      ],
      "optionsVi": [
        "Rằng cô là một nhà viết kịch tệ hại và không biết diễn xuất.",
        "Rằng cô chỉ thích anh khi anh còn là kẻ bết bát thất bại, bởi vì điều đó làm cô cảm thấy bản thân mình tốt đẹp và vượt trội hơn.",
        "Rằng cô đang bí mật hẹn hò với một đạo diễn tuyển vai khác.",
        "Rằng cô chưa bao giờ trân trọng tài nghệ nấu ăn của anh."
      ],
      "correctAnswer": 1,
      "explanation": "In Segment 37, Sebastian bitterly lashes out: 'Maybe you just liked me when I was on my ass, because it made you feel better about yourself.'",
      "explanationEn": "In Segment 37, Sebastian bitterly lashes out: 'Maybe you just liked me when I was on my ass, because it made you feel better about yourself.'",
      "explanationVi": "Trong Phân đoạn 37, Sebastian buông lời tổn thương: 'Có lẽ em chỉ thích anh khi anh còn là kẻ bết bát thất bại, bởi vì điều đó làm em cảm thấy bản thân mình tốt đẹp và vượt trội hơn.'",
      "targetedConcept": "Emotional climax of psychological insecurity",
      "targetedConceptEn": "Emotional climax of psychological insecurity",
      "targetedConceptVi": "Đỉnh điểm bùng nổ của sự tự ái và bất an nội tâm",
      "referenceSegmentIndex": 37
    },
    {
      "id": "mov_rom_03_q6",
      "question": "What sudden event shatters the confrontation and causes Mia to leave the apartment?",
      "questionEn": "What sudden event shatters the confrontation and causes Mia to leave the apartment?",
      "questionVi": "Biến cố bất ngờ nào cắt ngang cuộc đối đầu căng thẳng và khiến Mia bỏ đi khỏi căn hộ?",
      "options": [
        "A sudden power outage that plunges the building into darkness.",
        "The smoke detector blaring as their dinner burns in the oven, symbolizing their ruined romance.",
        "A phone call offering Mia a Hollywood blockbuster role.",
        "Keith knocking loudly on the front door to pick up Sebastian."
      ],
      "optionsEn": [
        "A sudden power outage that plunges the building into darkness.",
        "The smoke detector blaring as their dinner burns in the oven, symbolizing their ruined romance.",
        "A phone call offering Mia a Hollywood blockbuster role.",
        "Keith knocking loudly on the front door to pick up Sebastian."
      ],
      "optionsVi": [
        "Sự cố mất điện đột ngột khiến cả tòa nhà chìm trong bóng tối.",
        "Tiếng chuông báo cháy réo inh ỏi khi bữa tối bị cháy khét trong lò nướng, biểu tượng cho sự rạn nứt của cuộc tình.",
        "Một cuộc điện thoại mời Mia đóng vai chính trong phim bom tấn Hollywood.",
        "Keith gõ cửa ầm ĩ để đón Sebastian đi lưu diễn."
      ],
      "correctAnswer": 1,
      "explanation": "In Segments 38 and 39, the smoke alarm blares deafeningly as thick smoke pours from the oven; Mia gathers her purse in tears and rushes out into the heavy rain as Sebastian whispers 'I'm sorry...'",
      "explanationEn": "In Segments 38 and 39, the smoke alarm blares deafeningly as thick smoke pours from the oven; Mia gathers her purse in tears and rushes out into the heavy rain as Sebastian whispers 'I'm sorry...'",
      "explanationVi": "Trong Phân đoạn 38 và 39, còi báo cháy hú vang khi khói đen cuồn cuộn bốc lên từ lò nướng; Mia ôm túi xách trong nước mắt lao ra màn mưa tầm tã trong khi Sebastian thầm thì 'Anh xin lỗi...'",
      "targetedConcept": "Dramatic symbolism and resolution of the scene",
      "targetedConceptEn": "Dramatic symbolism and resolution of the scene",
      "targetedConceptVi": "Biểu tượng kịch tính và cái kết của phân cảnh chia ly",
      "referenceSegmentIndex": 38
    }
  ]
}

# Generate TypeScript code
ts_content = """import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: La La Land: Sebastian & Mia's Fierce Surprise Dinner Confrontation (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR B2 | American
 * YouTube ID: gW0xteHHXrY (06:30 - 390s)
 * Views: 839,562 | Likes: High Engagement
 * 
 * BÁM SÁT 100% TIMELINE, TẤT CẢ 131 MỐC TRANSCRIPT WHISPER & KỊCH BẢN ĐOẠT GIẢI OSCAR
 * PHỦ KÍN 40 MASTER SEGMENTS TỪ GIÂY 00:00 ĐẾN 06:30 (390 GIÂY)
 * ============================================================================
 */

export const QUIZ_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION: VideoQuizData = """ + json.dumps(quiz_data, ensure_ascii=False, indent=2) + """;

export const LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION: MockVideoLesson = {
  id: "mov_rom_03",
  slug: "la-la-land-the-fools-who-dream-audition",
  title: "La La Land: Sebastian & Mia's Fierce Surprise Dinner Confrontation (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "B2",
  durationFormatted: "06:30",
  durationSeconds: 390,
  externalId: "gW0xteHHXrY",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/gW0xteHHXrY/hqdefault.jpg",
  accent: "American",
  wpmSpeed: 135,
  viewCount: 839562,
  studyCount: 3120,
  description:
    "Phân cảnh tranh luận kịch tính đoạt giải Oscar trong La La Land: Sebastian bất ngờ trở về nấu bữa tối lãng mạn cho Mia, nhưng cuộc trò chuyện nhanh chóng chuyển thành xung đột dữ dội về việc thỏa hiệp đam mê nghệ thuật thực thụ để đổi lấy danh tiếng thương mại.",
  segments: """ + json.dumps(segments_data, ensure_ascii=False, indent=4) + """,
  quiz: QUIZ_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION
};

export default LESSON_LA_LA_LAND_THE_FOOLS_WHO_DREAM_AUDITION;
"""

target_path = "features/listening/data/lessons/movies/romance/lesson_la_la_land.ts"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully generated {target_path} with {len(segments_data)} segments!")
