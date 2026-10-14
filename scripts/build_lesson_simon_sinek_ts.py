import json
import re

with open('scripts/simon_sinek_master_segments.json', 'r', encoding='utf-8') as f:
    segs = json.load(f)

print(f"Loaded {len(segs)} segments.")

# Verify tokenCount and IPA format
for s in segs:
    text = s['text']
    tokens = re.findall(r'\b[A-Za-z0-9_]+\b', text)
    assert s['tokenCount'] == len(tokens), f"Token mismatch in seg {s['orderIndex']}: recorded {s['tokenCount']} vs {len(tokens)}"
    ipa = s['ipaUs']
    assert ipa.startswith('/') and ipa.endswith('/'), f"Bad IPA format in seg {s['orderIndex']}: {ipa}"
    # Clean IPA punctuation
    cleaned_ipa = '/' + re.sub(r'[,.;:!?]', '', ipa[1:-1]).strip() + '/'
    cleaned_ipa = '/' + ' '.join(cleaned_ipa[1:-1].split()) + '/'
    s['ipaUs'] = cleaned_ipa

quiz_ts = '''import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for Simon Sinek's Golden Circle
 */
export const QUIZ_SIMON_SINEK: VideoQuizData = {
  lessonId: "vid_simon_sinek_golden_circle",
  lessonTitle: "Simon Sinek: How Great Leaders Inspire Action (The Golden Circle)",
  totalQuestions: 8,
  xpReward: 40,
  questions: [
    {
      id: "q_simon_sinek_1",
      question: "How does Simon Sinek frame the opening inquiry of his presentation?",
      questionEn: "How does Simon Sinek frame the opening inquiry of his presentation?",
      questionVi: "Simon Sinek đặt ra câu hỏi gợi mở đầu bài thuyết trình của mình như thế nào?",
      options: [
        "How do you explain when others are able to achieve things that seem to defy all assumptions?",
        "How can corporations cut manufacturing costs by outsourcing abroad?",
        "Why do ancient mathematical formulas remain unproven in modern biology?",
        "How should international trade organizations regulate consumer electronics?",
      ],
      optionsEn: [
        "How do you explain when others are able to achieve things that seem to defy all assumptions?",
        "How can corporations cut manufacturing costs by outsourcing abroad?",
        "Why do ancient mathematical formulas remain unproven in modern biology?",
        "How should international trade organizations regulate consumer electronics?",
      ],
      optionsVi: [
        "Làm sao bạn giải thích được khi những người khác có thể đạt được những điều dường như đi ngược lại mọi giả định thông thường?",
        "Làm cách nào các tập đoàn có thể cắt giảm chi phí sản xuất bằng cách thuê ngoài?",
        "Tại sao các công thức toán học cổ đại vẫn chưa được chứng minh trong sinh học hiện đại?",
        "Các tổ chức thương mại quốc tế nên điều tiết đồ điện tử tiêu dùng như thế nào?",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 1 & 2, Sinek poses the foundational questions: "How do you explain when things don\\'t go as we assume? Or better, how do you explain when others are able to achieve things that seem to defy all of the assumptions?"',
      explanationEn: 'In Segments 1 & 2, Sinek poses the foundational questions: "How do you explain when things don\\'t go as we assume? Or better, how do you explain when others are able to achieve things that seem to defy all of the assumptions?"',
      explanationVi: 'Trong câu 1 & 2, Sinek đặt ra câu hỏi nền tảng: "Làm thế nào bạn giải thích được khi mọi việc không diễn ra như chúng ta vẫn nghĩ? Hay đúng hơn, làm sao bạn giải thích được khi những người khác có thể đạt được những điều dường như đi ngược lại mọi quy luật thông thường?"',
      referenceSegmentIndex: 2,
      targetedConcept: "Câu hỏi gợi mở & Bất chấp mọi giả định (Defying Assumptions Inquiry)",
      targetedConceptEn: "Defying Assumptions Inquiry",
      targetedConceptVi: "Câu hỏi gợi mở & Bất chấp mọi giả định",
    },
    {
      id: "q_simon_sinek_2",
      question: "Why does Simon Sinek use Apple as a paradox in his opening argument?",
      questionEn: "Why does Simon Sinek use Apple as a paradox in his opening argument?",
      questionVi: "Tại sao Simon Sinek lại đưa trường hợp của Apple ra như một nghịch lý trong luận điểm mở đầu của mình?",
      options: [
        "Despite being just a computer company with the same access to talent, agencies, and consultants, Apple is consistently far more innovative",
        "Apple manufactures the cheapest desktop computers on the global market",
        "Apple completely refuses to do any commercial marketing or advertising",
        "Apple holds an absolute government monopoly over computer operating systems",
      ],
      optionsEn: [
        "Despite being just a computer company with the same access to talent, agencies, and consultants, Apple is consistently far more innovative",
        "Apple manufactures the cheapest desktop computers on the global market",
        "Apple completely refuses to do any commercial marketing or advertising",
        "Apple holds an absolute government monopoly over computer operating systems",
      ],
      optionsVi: [
        "Dù chỉ là một công ty máy tính có cùng khả năng tiếp cận nhân tài, đại lý và chuyên gia tư vấn, Apple vẫn liên tục đổi mới vượt trội hơn hẳn",
        "Apple sản xuất những chiếc máy tính để bàn rẻ nhất trên thị trường toàn cầu",
        "Apple hoàn toàn từ chối thực hiện bất kỳ hoạt động tiếp thị hay quảng cáo thương mại nào",
        "Apple nắm độc quyền tuyệt đối từ chính phủ về hệ điều hành máy tính",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 5 to 8, Sinek highlights: "And yet, they\\'re just a computer company... They have the same access to the same talent, the same agencies, the same consultants, the same media. Then why is it that they seem to have something different?"',
      explanationEn: 'In Segments 5 to 8, Sinek highlights: "And yet, they\\'re just a computer company... They have the same access to the same talent, the same agencies, the same consultants, the same media. Then why is it that they seem to have something different?"',
      explanationVi: 'Trong các câu 5 đến 8, Sinek nhấn mạnh: "Thế nhưng, họ cũng chỉ là một công ty máy tính... Họ có cùng khả năng tiếp cận nhân tài, các đại lý, chuyên gia tư vấn và các kênh truyền thông như nhau. Vậy tại sao họ dường như lại sở hữu một điều gì đó khác biệt?"',
      referenceSegmentIndex: 7,
      targetedConcept: "Nghịch lý đổi mới sáng tạo của Apple (The Apple Innovation Paradox)",
      targetedConceptEn: "The Apple Innovation Paradox",
      targetedConceptVi: "Nghịch lý đổi mới sáng tạo của Apple",
    },
    {
      id: "q_simon_sinek_3",
      question: "What makes Martin Luther King Jr.'s leadership of the Civil Rights Movement such a compelling question for Sinek?",
      questionEn: "What makes Martin Luther King Jr.'s leadership of the Civil Rights Movement such a compelling question for Sinek?",
      questionVi: "Điều gì khiến vai trò lãnh đạo của Martin Luther King Jr. trong Phong trào Dân quyền trở thành một câu hỏi đầy trăn trở đối với Sinek?",
      options: [
        "He wasn't the only man who suffered in pre-civil rights America, nor the only great orator, yet he was the one who rallied the movement",
        "He was the wealthiest politician in the United States Congress at that time",
        "He invented audio broadcasting loudspeakers to amplify his voice across cities",
        "He possessed a formal military rank that commanded national troops",
      ],
      optionsEn: [
        "He wasn't the only man who suffered in pre-civil rights America, nor the only great orator, yet he was the one who rallied the movement",
        "He was the wealthiest politician in the United States Congress at that time",
        "He invented audio broadcasting loudspeakers to amplify his voice across cities",
        "He possessed a formal military rank that commanded national troops",
      ],
      optionsVi: [
        "Ông không phải người duy nhất chịu áp bức ở nước Mỹ thời tiền dân quyền, cũng không phải nhà hùng biện xuất sắc duy nhất, nhưng lại là người dẫn dắt phong trào",
        "Ông là chính trị gia giàu có nhất trong Quốc hội Hoa Kỳ vào thời điểm đó",
        "Ông đã phát minh ra loa phóng thanh truyền thông để khuếch đại giọng nói khắp các thành phố",
        "Ông sở hữu quân hàm chính quy chỉ huy các lực lượng vũ trang quốc gia",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 9, 10 & 11, Sinek asks: "Why is it that Martin Luther King led the Civil Rights Movement? He wasn\\'t the only man who suffered in pre-civil rights America, and he certainly wasn\\'t the only great orator of the day. Why him?"',
      explanationEn: 'In Segments 9, 10 & 11, Sinek asks: "Why is it that Martin Luther King led the Civil Rights Movement? He wasn\\'t the only man who suffered in pre-civil rights America, and he certainly wasn\\'t the only great orator of the day. Why him?"',
      explanationVi: 'Trong các câu 9, 10 & 11, Sinek đặt vấn đề: "Tại sao Martin Luther King lại là người dẫn dắt Phong trào Dân quyền? Ông không phải người duy nhất chịu áp bức ở nước Mỹ thời kỳ tiền dân quyền, và ông cũng chắc chắn không phải nhà hùng biện xuất sắc duy nhất thời bấy giờ. Tại sao lại là ông ấy?"',
      referenceSegmentIndex: 10,
      targetedConcept: "Sức mạnh dẫn dắt của Martin Luther King Jr. (Leadership of Martin Luther King Jr.)",
      targetedConceptEn: "Leadership of Martin Luther King Jr.",
      targetedConceptVi: "Sức mạnh dẫn dắt của Martin Luther King Jr.",
    },
    {
      id: "q_simon_sinek_4",
      question: "Why is the success of the Wright brothers in achieving powered human flight so remarkable compared to their competitors?",
      questionEn: "Why is the success of the Wright brothers in achieving powered human flight so remarkable compared to their competitors?",
      questionVi: "Tại sao thành công của anh em nhà Wright trong việc thực hiện chuyến bay có người lái lại đáng kinh ngạc so với các đối thủ của họ?",
      options: [
        "Other competing teams were better qualified and better funded, yet the Wright brothers beat them to it",
        "The Wright brothers purchased pre-assembled aircraft engines from European inventors",
        "They received massive financial grants from the United States military department",
        "All other competing aviation engineers had decided to retire permanently",
      ],
      optionsEn: [
        "Other competing teams were better qualified and better funded, yet the Wright brothers beat them to it",
        "The Wright brothers purchased pre-assembled aircraft engines from European inventors",
        "They received massive financial grants from the United States military department",
        "All other competing aviation engineers had decided to retire permanently",
      ],
      optionsVi: [
        "Các đội ngũ đối thủ khác có chuyên môn cao hơn và được cấp vốn dồi dào hơn, vậy mà anh em nhà Wright đã vượt mặt họ",
        "Anh em nhà Wright đã mua các động cơ máy bay lắp ráp sẵn từ các nhà phát minh châu Âu",
        "Họ nhận được các khoản tài trợ tài chính khổng lồ từ bộ quân sự Hoa Kỳ",
        "Tất cả các kỹ sư hàng không cạnh tranh khác đều đã quyết định nghỉ hưu vĩnh viễn",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 12, 13 & 14, Sinek notes: "The Wright brothers were able to figure out controlled, powered man flight when there were certainly other teams who were better qualified, better funded... and the Wright brothers beat them to it."',
      explanationEn: 'In Segments 12, 13 & 14, Sinek notes: "The Wright brothers were able to figure out controlled, powered man flight when there were certainly other teams who were better qualified, better funded... and the Wright brothers beat them to it."',
      explanationVi: 'Trong các câu 12, 13 & 14, Sinek ghi nhận: "Anh em nhà Wright lại có thể tìm ra chuyến bay có người lái, có động cơ và được kiểm soát, trong khi chắc chắn có những đội ngũ khác có chuyên môn cao hơn, được cấp vốn dồi dào hơn... vậy mà họ không làm được, và anh em nhà Wright đã vượt mặt họ."',
      referenceSegmentIndex: 13,
      targetedConcept: "Anh em nhà Wright và cuộc đua hàng không (The Wright Brothers Flight Breakthrough)",
      targetedConceptEn: "The Wright Brothers Flight Breakthrough",
      targetedConceptVi: "Anh em nhà Wright và cuộc đua hàng không",
    },
    {
      id: "q_simon_sinek_5",
      question: "How did Simon Sinek's discovery three and a half years earlier impact his worldview and behavior?",
      questionEn: "How did Simon Sinek's discovery three and a half years earlier impact his worldview and behavior?",
      questionVi: "Phát hiện cách đó ba năm rưỡi của Simon Sinek đã tác động như thế nào đến thế giới quan và hành vi của ông?",
      options: [
        "It profoundly changed his view on how the world worked and the way he operated within it",
        "It convinced him to quit public speaking and pursue aeronautical engineering full-time",
        "It proved that financial capital is the sole determinant of business innovation",
        "It showed that public marketing campaigns always guarantee commercial success",
      ],
      optionsEn: [
        "It profoundly changed his view on how the world worked and the way he operated within it",
        "It convinced him to quit public speaking and pursue aeronautical engineering full-time",
        "It proved that financial capital is the sole determinant of business innovation",
        "It showed that public marketing campaigns always guarantee commercial success",
      ],
      optionsVi: [
        "Nó đã thay đổi sâu sắc cách nhìn nhận của ông về cách thế giới vận hành và cách ông hoạt động trong cuộc sống",
        "Nó thuyết phục ông từ bỏ việc diễn thuyết để chuyển sang theo đuổi kỹ thuật hàng không",
        "Nó chứng minh rằng nguồn vốn tài chính là yếu tố duy nhất quyết định sự đổi mới kinh doanh",
        "Nó cho thấy rằng các chiến dịch tiếp thị đại chúng luôn đảm bảo thành công thương mại",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 16, 17 & 18, Sinek reveals: "About three and a half years ago, I made a discovery. And this discovery profoundly changed my view on how I thought the world worked, and it even profoundly changed the way in which I operate in it."',
      explanationEn: 'In Segments 16, 17 & 18, Sinek reveals: "About three and a half years ago, I made a discovery. And this discovery profoundly changed my view on how I thought the world worked, and it even profoundly changed the way in which I operate in it."',
      explanationVi: 'Trong các câu 16, 17 & 18, Sinek chia sẻ: "Khoảng ba năm rưỡi trước, tôi đã có một phát hiện. Và phát hiện này đã thay đổi sâu sắc cách nhìn nhận của tôi về cách thế giới vận hành, và nó thậm chí còn thay đổi sâu sắc cách tôi hành động trong cuộc sống."',
      referenceSegmentIndex: 17,
      targetedConcept: "Bước ngoặt nhận thức sâu sắc của tác giả (Profound Shift in Worldview)",
      targetedConceptEn: "Profound Shift in Worldview",
      targetedConceptVi: "Bước ngoặt nhận thức sâu sắc của tác giả",
    },
    {
      id: "q_simon_sinek_6",
      question: "What surprising pattern did Simon Sinek identify among all great inspiring leaders and organizations?",
      questionEn: "What surprising pattern did Simon Sinek identify among all great inspiring leaders and organizations?",
      questionVi: "Quy luật đáng ngạc nhiên nào được Simon Sinek nhận diện ở tất cả các nhà lãnh đạo và tổ chức truyền cảm hứng vĩ đại?",
      options: [
        "Whether Apple, Martin Luther King, or the Wright brothers, they all think, act, and communicate the exact same way",
        "They all possess significantly larger corporate budgets than their nearest rivals",
        "They avoid taking any strategic risks until consumer consensus is fully documented",
        "They hire the same advertising consultancy firm headquartered in London",
      ],
      optionsEn: [
        "Whether Apple, Martin Luther King, or the Wright brothers, they all think, act, and communicate the exact same way",
        "They all possess significantly larger corporate budgets than their nearest rivals",
        "They avoid taking any strategic risks until consumer consensus is fully documented",
        "They hire the same advertising consultancy firm headquartered in London",
      ],
      optionsVi: [
        "Dù là Apple, Martin Luther King hay anh em nhà Wright, họ đều suy nghĩ, hành động và truyền đạt theo cùng một cách chính xác",
        "Họ đều sở hữu ngân sách doanh nghiệp lớn hơn đáng kể so với các đối thủ gần nhất",
        "Họ tránh mọi rủi ro chiến lược cho đến khi sự đồng thuận của người tiêu dùng được ghi nhận đầy đủ",
        "Họ thuê cùng một công ty tư vấn quảng cáo có trụ sở tại Luân Đôn",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 19 & 20, Sinek summarizes: "As it turns out, all the great inspiring leaders and organizations in the world, whether it\\'s Apple or Martin Luther King or the Wright brothers, they all think, act and communicate the exact same way."',
      explanationEn: 'In Segments 19 & 20, Sinek summarizes: "As it turns out, all the great inspiring leaders and organizations in the world, whether it\\'s Apple or Martin Luther King or the Wright brothers, they all think, act and communicate the exact same way."',
      explanationVi: 'Trong các câu 19 & 20, Sinek tóm lược: "Hóa ra, tất cả những nhà lãnh đạo và tổ chức truyền cảm hứng vĩ đại trên thế giới, dù là Apple, Martin Luther King hay anh em nhà Wright, họ đều suy nghĩ, hành động và truyền đạt thông điệp theo cùng một phương thức chính xác."',
      referenceSegmentIndex: 20,
      targetedConcept: "Quy luật đồng nhất của các nhà lãnh đạo vĩ đại (The Universal Inspiring Pattern)",
      targetedConceptEn: "The Universal Inspiring Pattern",
      targetedConceptVi: "Quy luật đồng nhất của các nhà lãnh đạo vĩ đại",
    },
    {
      id: "q_simon_sinek_7",
      question: "How does the communication pattern of inspiring leaders compare to that of everyone else, and what is Simon Sinek's core takeaway?",
      questionEn: "How does the communication pattern of inspiring leaders compare to that of everyone else, and what is Simon Sinek's core takeaway?",
      questionVi: "Phương thức truyền đạt thông điệp của các nhà lãnh đạo truyền cảm hứng so với phần còn lại của thế giới như thế nào?",
      options: [
        "It is the complete opposite to everyone else: people don't buy what you do, they buy why you do it",
        "It is virtually identical to mainstream corporate sales scripts and TV commercials",
        "It relies strictly on aggressive price discounting and promotional vouchers",
        "It follows the exact marketing manuals printed in business textbooks",
      ],
      optionsEn: [
        "It is the complete opposite to everyone else: people don't buy what you do, they buy why you do it",
        "It is virtually identical to mainstream corporate sales scripts and TV commercials",
        "It relies strictly on aggressive price discounting and promotional vouchers",
        "It follows the exact marketing manuals printed in business textbooks",
      ],
      optionsVi: [
        "Nó hoàn toàn trái ngược với phần còn lại của thế giới: người ta không mua những gì bạn làm, họ mua lý do tại sao bạn làm điều đó",
        "Nó hầu như giống hệt các kịch bản bán hàng doanh nghiệp chính thống và quảng cáo truyền hình",
        "Nó hoàn toàn dựa vào việc giảm giá mạnh tay và phiếu ưu đãi khuyến mãi",
        "Nó tuân thủ chính xác các cẩm nang tiếp thị được in trong sách giáo khoa kinh doanh",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 21 & 56, Sinek emphasizes: "And it\\'s the complete opposite to everyone else... What it proves to us is that people don\\'t buy what you do; people buy why you do it."',
      explanationEn: 'In Segments 21 & 56, Sinek emphasizes: "And it\\'s the complete opposite to everyone else... What it proves to us is that people don\\'t buy what you do; people buy why you do it."',
      explanationVi: 'Trong câu 21 & 56, Sinek nhấn mạnh: "Và cách làm đó hoàn toàn trái ngược với phần còn lại của thế giới... Điều này chứng minh cho chúng ta thấy: Mọi người không mua những gì bạn làm; người ta mua lý do tại sao bạn làm điều đó."',
      referenceSegmentIndex: 21,
      targetedConcept: "Sự đối lập hoàn toàn với số đông & Triết lý cốt lõi (Complete Opposite to Everyone Else)",
      targetedConceptEn: "Complete Opposite to Everyone Else",
      targetedConceptVi: "Sự đối lập hoàn toàn với số đông & Triết lý cốt lõi",
    },
    {
      id: "q_simon_sinek_8",
      question: "What does Simon Sinek call the simple theoretical framework he codified to explain how leaders inspire action?",
      questionEn: "What does Simon Sinek call the simple theoretical framework he codified to explain how leaders inspire action?",
      questionVi: "Simon Sinek gọi khung lý thuyết đơn giản mà ông đã hệ thống hóa để giải thích cách các nhà lãnh đạo truyền cảm hứng là gì?",
      options: [
        "The Golden Circle (Why - How - What)",
        "The Hierarchy of Human Needs",
        "The Blue Ocean Strategy Framework",
        "The Corporate Innovation Matrix",
      ],
      optionsEn: [
        "The Golden Circle (Why - How - What)",
        "The Hierarchy of Human Needs",
        "The Blue Ocean Strategy Framework",
        "The Corporate Innovation Matrix",
      ],
      optionsVi: [
        "Vòng Tròn Vàng - The Golden Circle (Tại sao - Thế nào - Cái gì)",
        "Tháp nhu cầu của con người (The Hierarchy of Human Needs)",
        "Khung chiến lược Đại dương xanh (The Blue Ocean Strategy Framework)",
        "Ma trận Đổi mới Doanh nghiệp (The Corporate Innovation Matrix)",
      ],
      correctAnswer: 0,
      explanation: 'In Segments 22, 23 & 24, Sinek concludes: "All I did was codify it, and it\\'s probably the world\\'s simplest idea. I call it the golden circle. Why? How? What?"',
      explanationEn: 'In Segments 22, 23 & 24, Sinek concludes: "All I did was codify it, and it\\'s probably the world\\'s simplest idea. I call it the golden circle. Why? How? What?"',
      explanationVi: 'Trong các câu 22, 23 & 24, Sinek kết luận: "Tất cả những gì tôi làm là hệ thống hóa nó lại, và đây có lẽ là ý tưởng giản đơn nhất thế giới. Tôi gọi nó là Vòng Tròn Vàng (The Golden Circle). Tại sao? Thế nào? Cái gì?"',
      referenceSegmentIndex: 23,
      targetedConcept: "Mô hình Vòng Tròn Vàng (The Golden Circle Framework)",
      targetedConceptEn: "The Golden Circle Framework",
      targetedConceptVi: "Mô hình Vòng Tròn Vàng",
    },
  ],
  generatedBy: "CONTEXTUAL_FALLBACK",
};
'''

lesson_header = '''/**
 * Simon Sinek: How Great Leaders Inspire Action (The Golden Circle)
 * Slug: simon-sinek-how-great-leaders-inspire-action
 * YouTube ID: qp0HIF3SfI4
 * Category: cat_ielts_listen (IELTS Nghe & Thuyết Trình)
 * 100% Calibrated Verbatim from Official TED English & Vietnamese Subtitles
 */
export const LESSON_SIMON_SINEK: MockVideoLesson = {
  id: "vid_simon_sinek_golden_circle",
  slug: "simon-sinek-how-great-leaders-inspire-action",
  title: "Simon Sinek: How Great Leaders Inspire Action (The Golden Circle)",
  description: "Diễn thuyết gia Simon Sinek chia sẻ quy luật 'Vòng Tròn Vàng' (Start With Why) giải mã tại sao Apple, Martin Luther King và anh em nhà Wright có thể truyền cảm hứng và thay đổi thế giới trong bài nói chuyện TED kinh điển đạt hơn 60 triệu lượt xem.",
  sourceType: "YOUTUBE",
  externalId: "qp0HIF3SfI4",
  thumbnailUrl: "https://img.youtube.com/vi/qp0HIF3SfI4/hqdefault.jpg",
  durationSeconds: 350,
  durationFormatted: "05:50",
  cefrLevel: "B2",
  supportedTypes: "BOTH",
  categoryId: "cat_ielts_listen",
  categorySlug: "ielts-listening",
  categoryName: "IELTS Nghe & Thuyết Trình",
  accent: "en-US",
  wpmSpeed: 160,
  viewCount: 62450,
  studyCount: 18920,
  quiz: QUIZ_SIMON_SINEK,
  segments: [
'''

lines = [quiz_ts, lesson_header]

for s in segs:
    seg_entry = f"""    {{
      orderIndex: {s['orderIndex']},
      startTime: {s['startTime']},
      endTime: {s['endTime']},
      text: {json.dumps(s['text'], ensure_ascii=False)},
      translationVi: {json.dumps(s['translationVi'], ensure_ascii=False)},
      ipaUs: {json.dumps(s['ipaUs'], ensure_ascii=False)},
      properNouns: {json.dumps(s['properNouns'], ensure_ascii=False)},
      keywords: {json.dumps(s['keywords'], ensure_ascii=False)},
      explanationAi: {json.dumps(s['explanationAi'], ensure_ascii=False)},
      tokenCount: {s['tokenCount']},
    }},
"""
    lines.append(seg_entry)

lines.append("  ],\n};\n")

content = "".join(lines)

with open('features/listening/data/lessons/lesson_simon_sinek.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully written features/listening/data/lessons/lesson_simon_sinek.ts with {len(segs)} segments!")
