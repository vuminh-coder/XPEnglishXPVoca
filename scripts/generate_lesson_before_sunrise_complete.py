# -*- coding: utf-8 -*-
"""
Generate complete lesson_before_sunrise.ts with 48 segments and complete bilingual quiz.
"""
import json

from test_segments_builder import segments_data

quiz_data = {
  "lessonId": "mov_rom_02",
  "lessonTitle": "The Before Trilogy: Jesse & Céline - Love Over Time and Spontaneous Spark (Full Master Cut)",
  "totalQuestions": 6,
  "xpReward": 100,
  "generatedBy": "AI_GEMINI",
  "questions": [
    {
      "id": "mov_rom_02_q1",
      "question": "What 'insane idea' did Jesse propose to Céline on the train to start their journey?",
      "questionEn": "What 'insane idea' did Jesse propose to Céline on the train to start their journey?",
      "questionVi": "Jesse đã đưa ra 'ý tưởng điên rồ' nào với Céline trên chuyến tàu để bắt đầu hành trình của họ?",
      "options": [
        "To steal luggage from the conductor.",
        "To get off the train together in Vienna and explore the town.",
        "To move to Paris and marry him immediately.",
        "To write a novel together during the train ride."
      ],
      "optionsEn": [
        "To steal luggage from the conductor.",
        "To get off the train together in Vienna and explore the town.",
        "To move to Paris and marry him immediately.",
        "To write a novel together during the train ride."
      ],
      "optionsVi": [
        "Lấy trộm hành lý của người soát vé.",
        "Cùng nhau bước xuống tàu tại Vienna và đi khám phá thành phố.",
        "Chuyển đến Paris và kết hôn với anh ngay lập tức.",
        "Cùng viết một cuốn tiểu thuyết trong suốt chuyến tàu."
      ],
      "correctAnswer": 1,
      "explanation": "In Segment 1, Jesse asks Céline: 'This is what we should do: you should get off the train with me here in Vienna, and come check out the town.'",
      "explanationEn": "In Segment 1, Jesse asks Céline: 'This is what we should do: you should get off the train with me here in Vienna, and come check out the town.'",
      "explanationVi": "Trong Phân đoạn 1, Jesse rủ Céline: 'Đây là điều chúng ta nên làm: em hãy xuống tàu cùng anh ngay tại Vienna này, rồi cùng đi khám phá thành phố.'",
      "targetedConcept": "Plot catalyst of Before Sunrise",
      "targetedConceptEn": "Plot catalyst of Before Sunrise",
      "targetedConceptVi": "Bước ngoặt khởi đầu của Before Sunrise",
      "referenceSegmentIndex": 1
    },
    {
      "id": "mov_rom_02_q2",
      "question": "Where does Céline believe God or divine magic truly resides?",
      "questionEn": "Where does Céline believe God or divine magic truly resides?",
      "questionVi": "Céline tin rằng Thượng Đế hay phép màu thực sự ngự trị ở đâu?",
      "options": [
        "Inside classical cathedrals and religious books.",
        "In this little space in between two people attempting to understand each other.",
        "Deep within individual financial wealth and career achievements.",
        "In dreams that happen only while sleeping."
      ],
      "optionsEn": [
        "Inside classical cathedrals and religious books.",
        "In this little space in between two people attempting to understand each other.",
        "Deep within individual financial wealth and career achievements.",
        "In dreams that happen only while sleeping."
      ],
      "optionsVi": [
        "Bên trong những thánh đường cổ kính và kinh sách tôn giáo.",
        "Trong khoảng không gian nhỏ bé ở giữa hai con người khi nỗ lực thấu hiểu nhau.",
        "Sâu thẳm trong sự giàu có tài chính và thành tựu sự nghiệp cá nhân.",
        "Trong những giấc mơ chỉ xuất hiện khi đang say ngủ."
      ],
      "correctAnswer": 1,
      "explanation": "In Segments 2 and 3, Céline expresses: 'I believe if there's any kind of God... it would be just in this little space in between... in the attempt of understanding someone.'",
      "explanationEn": "In Segments 2 and 3, Céline expresses: 'I believe if there's any kind of God... it would be just in this little space in between... in the attempt of understanding someone.'",
      "explanationVi": "Trong Phân đoạn 2 và 3, Céline bộc bạch: 'Em tin rằng nếu có bất kỳ vị Thượng Đế nào tồn tại... Ngài sẽ ngự trị ngay trong khoảng không gian nhỏ bé ở giữa hai chúng ta... trong nỗ lực thấu hiểu một ai đó.'",
      "targetedConcept": "Philosophical concept of spiritual connection",
      "targetedConceptEn": "Philosophical concept of spiritual connection",
      "targetedConceptVi": "Triết lý về sự kết nối tâm hồn",
      "referenceSegmentIndex": 2
    },
    {
      "id": "mov_rom_02_q3",
      "question": "What word did Céline give the Danube river poet for his impromptu poem?",
      "questionEn": "What word did Céline give the Danube river poet for his impromptu poem?",
      "questionVi": "Céline đã đưa từ khóa nào cho người thi sĩ bên bờ sông Danube để làm bài thơ ngẫu hứng?",
      "options": [
        "Sunflower",
        "Milkshake",
        "Moonlight",
        "Vienna"
      ],
      "optionsEn": [
        "Sunflower",
        "Milkshake",
        "Moonlight",
        "Vienna"
      ],
      "optionsVi": [
        "Hoa hướng dương (Sunflower)",
        "Sữa lắc (Milkshake)",
        "Ánh trăng (Moonlight)",
        "Thành Vienna (Vienna)"
      ],
      "correctAnswer": 1,
      "explanation": "In Segment 28, Céline excitedly offers the word 'Milkshake!' for the poet to compose his evocative poem.",
      "explanationEn": "In Segment 28, Céline excitedly offers the word 'Milkshake!' for the poet to compose his evocative poem.",
      "explanationVi": "Trong Phân đoạn 28, Céline đã hào hứng đưa ra từ khóa 'Milkshake!' (Sữa lắc) để nhà thơ sáng tác nên bài thơ tuyệt tác của mình.",
      "targetedConcept": "Key narrative scene detail in Vienna",
      "targetedConceptEn": "Key narrative scene detail in Vienna",
      "targetedConceptVi": "Chi tiết phân cảnh thi ca kinh điển tại Vienna",
      "referenceSegmentIndex": 28
    },
    {
      "id": "mov_rom_02_q4",
      "question": "What iconic lines conclude Jesse and Céline's reunion in Before Sunset?",
      "questionEn": "What iconic lines conclude Jesse and Céline's reunion in Before Sunset?",
      "questionVi": "Cặp câu thoại bất hủ nào khép lại cuộc tái ngộ của Jesse và Céline trong Before Sunset?",
      "options": [
        "'I never want to see you again.'",
        "'Baby, you are gonna miss that plane. — I know.'",
        "'Let's meet back here in six months.'",
        "'Please don't leave Paris.'"
      ],
      "optionsEn": [
        "'I never want to see you again.'",
        "'Baby, you are gonna miss that plane. — I know.'",
        "'Let's meet back here in six months.'",
        "'Please don't leave Paris.'"
      ],
      "optionsVi": [
        "'Em không bao giờ muốn gặp lại anh nữa.'",
        "'Anh yêu, anh sắp trễ chuyến bay rồi đấy. — Anh biết mà.'",
        "'Hãy gặp lại nhau ở đây sau sáu tháng nữa nhé.'",
        "'Làm ơn đừng rời khỏi Paris.'"
      ],
      "correctAnswer": 1,
      "explanation": "In Segment 24, Céline reminds him: 'Baby, you are gonna miss that plane' and Jesse smiles: 'I know.'",
      "explanationEn": "In Segment 24, Céline reminds him: 'Baby, you are gonna miss that plane' and Jesse smiles: 'I know.'",
      "explanationVi": "Trong Phân đoạn 24, Céline nhắc nhở: 'Anh yêu, anh sắp trễ chuyến bay rồi đấy' và Jesse mỉm cười: 'Anh biết mà.'",
      "targetedConcept": "Iconic romantic cinematic conclusion",
      "targetedConceptEn": "Iconic romantic cinematic conclusion",
      "targetedConceptVi": "Nhận biết cái kết điện ảnh lãng mạn kinh điển",
      "referenceSegmentIndex": 24
    },
    {
      "id": "mov_rom_02_q5",
      "question": "What does Céline mean when she says 'a memory's never finished, as long as you're alive'?",
      "questionEn": "What does Céline mean when she says 'a memory's never finished, as long as you're alive'?",
      "questionVi": "Ý nghĩa câu nói của Céline: 'Một ký ức sẽ không bao giờ kết thúc, chừng nào ta còn sống' là gì?",
      "options": [
        "That memories fade away and are permanently erased.",
        "That memories are active and can be reshaped, healed, and rewritten by new present experiences.",
        "That memories cause only suffering and pain.",
        "That people only remember things when they become elderly."
      ],
      "optionsEn": [
        "That memories fade away and are permanently erased.",
        "That memories are active and can be reshaped, healed, and rewritten by new present experiences.",
        "That memories cause only suffering and pain.",
        "That people only remember things when they become elderly."
      ],
      "optionsVi": [
        "Ký ức sẽ phai mờ và biến mất vĩnh viễn.",
        "Ký ức luôn sống động và có thể được tái định hình, chữa lành và viết tiếp bằng những trải nghiệm hiện tại.",
        "Ký ức chỉ mang lại đau khổ và dằn vặt.",
        "Con người chỉ nhớ lại mọi thứ khi về già."
      ],
      "correctAnswer": 1,
      "explanation": "In Segment 24, they discuss how meeting again transforms the sadness of their past missed connection into a new chapter.",
      "explanationEn": "In Segment 24, they discuss how meeting again transforms the sadness of their past missed connection into a new chapter.",
      "explanationVi": "Trong Phân đoạn 24, cả hai chia sẻ rằng cuộc tái ngộ hiện tại đã biến nỗi buồn chia ly trong quá khứ thành một chương ký ức mới tươi đẹp.",
      "targetedConcept": "Deep philosophical perspective on memory and time",
      "targetedConceptEn": "Deep philosophical perspective on memory and time",
      "targetedConceptVi": "Góc nhìn triết học sâu sắc về ký ức và thời gian",
      "referenceSegmentIndex": 24
    },
    {
      "id": "mov_rom_02_q6",
      "question": "What definition of 'true love' does Jesse present during their mature confrontation in Before Midnight?",
      "questionEn": "What definition of 'true love' does Jesse present during their mature confrontation in Before Midnight?",
      "questionVi": "Jesse đưa ra định nghĩa nào về 'tình yêu đích thực' trong cuộc đối thoại chín chắn ở Before Midnight?",
      "options": [
        "An idealized fairy tale without conflict or flaws.",
        "Real life that is not perfect, but it is real, honest, and endured together.",
        "Living in separate cities to avoid daily annoyances.",
        "Endless wealth and romantic vacations."
      ],
      "optionsEn": [
        "An idealized fairy tale without conflict or flaws.",
        "Real life that is not perfect, but it is real, honest, and endured together.",
        "Living in separate cities to avoid daily annoyances.",
        "Endless wealth and romantic vacations."
      ],
      "optionsVi": [
        "Một câu chuyện cổ tích hoàn hảo không có tì vết hay xung đột.",
        "Cuộc đời thực tuy không hoàn hảo, nhưng chân thật, chân thành và cùng nhau vượt qua.",
        "Sống ở hai thành phố khác nhau để tránh va chạm thường ngày.",
        "Sự giàu có vô tận và những kỳ nghỉ lãng mạn bất tận."
      ],
      "correctAnswer": 1,
      "explanation": "In Segment 42, Jesse asserts: 'If you want true love, then this is it. This is real life. It's not perfect, but it's real.'",
      "explanationEn": "In Segment 42, Jesse asserts: 'If you want true love, then this is it. This is real life. It's not perfect, but it's real.'",
      "explanationVi": "Trong Phân đoạn 42, Jesse khẳng định: 'Nếu em muốn tình yêu đích thực, thì nó chính là thế này đây. Đây là cuộc đời thực. Nó không hoàn hảo, nhưng nó có thật.'",
      "targetedConcept": "Core thematic resolution of The Before Trilogy",
      "targetedConceptEn": "Core thematic resolution of The Before Trilogy",
      "targetedConceptVi": "Đỉnh cao triết lý về tình yêu đích thực của bộ ba phim Before",
      "referenceSegmentIndex": 42
    }
  ]
}

lesson_meta = {
  "id": "mov_rom_02",
  "slug": "before-sunrise-vienna-night-walk",
  "title": "The Before Trilogy: Jesse & Céline - Love Over Time and Spontaneous Spark (Full Master Cut)",
  "categoryId": "cat_romance_cinema",
  "categorySlug": "romance-cinema",
  "categoryName": "Phim Lãng Mạn & Cảm Xúc",
  "cefrLevel": "C1",
  "durationFormatted": "13:39",
  "durationSeconds": 819,
  "externalId": "QV1tiEDvkkw",
  "sourceType": "YOUTUBE",
  "supportedTypes": "BOTH",
  "thumbnailUrl": "https://img.youtube.com/vi/QV1tiEDvkkw/hqdefault.jpg",
  "accent": "American & French",
  "wpmSpeed": 140,
  "viewCount": 2560815,
  "studyCount": 3820,
  "description": "Toàn cảnh hành trình lãng mạn kinh điển của Jesse (Ethan Hawke) và Céline (Julie Delpy) qua bộ ba phim Before: từ lời đề nghị táo bạo nhảy khỏi tàu ở Vienna, những cuộc đối thoại triết học sâu sắc về tình yêu, sự kết nối tâm hồn tại Paris, cho đến sự chân thực bền bỉ theo năm tháng trong Before Midnight."
}

# Generate TypeScript code
ts_content = """import { MockVideoLesson, VideoQuizData } from "../../../types";

/**
 * ============================================================================
 * LESSON: The Before Trilogy: Jesse & Céline - Love Over Time and Spontaneous Spark (Full Master Cut)
 * Category: Phim Lãng Mạn & Cảm Xúc (cat_romance_cinema)
 * Level: CEFR C1 | American & French
 * YouTube ID: QV1tiEDvkkw (13:39 - 819s)
 * Views: 2,560,815 | Likes: 48,000+
 * 
 * BÁM SÁT 100% TIMELINE, TẤT CẢ 95 MỐC HỘI THOẠI VÀ LỜI THOẠI NGUYÊN BẢN CỦA TOÀN BỘ VIDEO
 * PHỦ KÍN 48 MASTER SEGMENTS TỪ GIÂY 00:27 ĐẾN 13:39 (819 GIÂY)
 * ============================================================================
 */

export const QUIZ_BEFORE_SUNRISE_VIENNA_NIGHT_WALK: VideoQuizData = """ + json.dumps(quiz_data, ensure_ascii=False, indent=2) + """;

export const LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK: MockVideoLesson = {
  id: "mov_rom_02",
  slug: "before-sunrise-vienna-night-walk",
  title: "The Before Trilogy: Jesse & Céline - Love Over Time and Spontaneous Spark (Full Master Cut)",
  categoryId: "cat_romance_cinema",
  categorySlug: "romance-cinema",
  categoryName: "Phim Lãng Mạn & Cảm Xúc",
  cefrLevel: "C1",
  durationFormatted: "13:39",
  durationSeconds: 819,
  externalId: "QV1tiEDvkkw",
  sourceType: "YOUTUBE",
  supportedTypes: "BOTH",
  thumbnailUrl: "https://img.youtube.com/vi/QV1tiEDvkkw/hqdefault.jpg",
  accent: "American & French",
  wpmSpeed: 140,
  viewCount: 2560815,
  studyCount: 3820,
  description:
    "Toàn cảnh hành trình lãng mạn kinh điển của Jesse (Ethan Hawke) và Céline (Julie Delpy) qua bộ ba phim Before: từ lời đề nghị táo bạo nhảy khỏi tàu ở Vienna, những cuộc đối thoại triết học sâu sắc về tình yêu, sự kết nối tâm hồn tại Paris, cho đến sự chân thực bền bỉ theo năm tháng trong Before Midnight.",
  segments: """ + json.dumps(segments_data, ensure_ascii=False, indent=4) + """
};
"""

target_path = "features/listening/data/lessons/movies/romance/lesson_before_sunrise.ts"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully generated {target_path} with {len(segments_data)} segments!")
