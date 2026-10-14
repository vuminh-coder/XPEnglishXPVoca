import json
import re

# Load 22 master segments
with open('scripts/business_phone_call_master_22_segments.json', 'r', encoding='utf-8') as f:
    segments = json.load(f)

quiz = {
  "lessonId": "vid_business_phone_call",
  "lessonTitle": "Business English: Professional Phone Calls & Telephone Etiquette",
  "totalQuestions": 8,
  "xpReward": 40,
  "questions": [
    {
      "id": "q_business_phone_1",
      "question": "How does the receptionist professionally greet the caller and identify the business in Segment 1?",
      "questionEn": "How does the receptionist professionally greet the caller and identify the business in Segment 1?",
      "questionVi": "Nhân viên lễ tân chào người gọi và giới thiệu doanh nghiệp chuyên nghiệp như thế nào trong Phân đoạn 1?",
      "options": [
        "By greeting with 'Good morning', stating the boutique name 'Chic Boutique', and offering assistance with 'How may I help you?'",
        "By demanding caller identity and account login credentials before answering any questions",
        "By asking the caller to immediately hang up and send an automated email instead",
        "By transferring the incoming call directly to voicemail without greeting"
      ],
      "optionsEn": [
        "By greeting with 'Good morning', stating the boutique name 'Chic Boutique', and offering assistance with 'How may I help you?'",
        "By demanding caller identity and account login credentials before answering any questions",
        "By asking the caller to immediately hang up and send an automated email instead",
        "By transferring the incoming call directly to voicemail without greeting"
      ],
      "optionsVi": [
        "Bằng cách chào 'Good morning', nêu tên doanh nghiệp 'Chic Boutique' và nhã nhặn đề nghị hỗ trợ 'How may I help you?'",
        "Bằng cách yêu cầu người gọi cung cấp mã định danh tài khoản trước khi trả lời câu hỏi",
        "Bằng cách yêu cầu người gọi cúp máy ngay và gửi email tự động thay thế",
        "Bằng cách chuyển cuộc gọi thẳng vào hộp thư thoại mà không có lời chào"
      ],
      "correctAnswer": 0,
      "explanation": "In Segment 1, the receptionist demonstrates standard UK commercial telephone protocol: 'Good morning, Chic Boutique, how may I help you?'",
      "explanationEn": "In Segment 1, the receptionist demonstrates standard UK commercial telephone protocol: 'Good morning, Chic Boutique, how may I help you?'",
      "explanationVi": "Trong Phân đoạn 1, nhân viên lễ tân thể hiện đúng nghi thức điện thoại thương mại chuẩn mực: Chào theo thời gian + Tên công ty + Lời đề nghị giúp đỡ.",
      "referenceSegmentIndex": 1,
      "targetedConcept": "Professional Telephone Greeting & Company Identification",
      "targetedConceptEn": "Professional Telephone Greeting & Company Identification",
      "targetedConceptVi": "Lời chào mở đầu chuyên nghiệp & Nhận diện doanh nghiệp"
    },
    {
      "id": "q_business_phone_2",
      "question": "Whom does John Wright politely request to speak with when initiating his business inquiry in Segment 2?",
      "questionEn": "Whom does John Wright politely request to speak with when initiating his business inquiry in Segment 2?",
      "questionVi": "John Wright lịch sự yêu cầu được nói chuyện với ai khi bắt đầu cuộc gọi công việc trong Phân đoạn 2?",
      "options": [
        "Mr Morgan, using the formal request 'I'd like to speak to Mr Morgan please'",
        "The Chief Executive Officer for an unscheduled job interview",
        "The head chef regarding an upcoming catering booking",
        "The technical support engineer for software troubleshooting"
      ],
      "optionsEn": [
        "Mr Morgan, using the formal request 'I'd like to speak to Mr Morgan please'",
        "The Chief Executive Officer for an unscheduled job interview",
        "The head chef regarding an upcoming catering booking",
        "The technical support engineer for software troubleshooting"
      ],
      "optionsVi": [
        "Ông Morgan, thông qua cấu trúc lịch sự 'I'd like to speak to Mr Morgan please'",
        "Tổng giám đốc điều hành để phỏng vấn xin việc đột xuất",
        "Bếp trưởng để đặt tiệc cho sự kiện sắp tới",
        "Kỹ sư hỗ trợ kỹ thuật để sửa lỗi phần mềm"
      ],
      "correctAnswer": 0,
      "explanation": "In Segment 2, John Wright clearly states: \"I'd like to speak to Mr Morgan please.\" This is the most courteous and standard phrasing to request a specific colleague.",
      "explanationEn": "In Segment 2, John Wright clearly states: \"I'd like to speak to Mr Morgan please.\" This is the most courteous and standard phrasing to request a specific colleague.",
      "explanationVi": "Trong Phân đoạn 2, John Wright nói: \"I'd like to speak to Mr Morgan please.\" Đây là mẫu câu chuẩn mực nhất để đề nghị nối máy gặp người phụ trách.",
      "referenceSegmentIndex": 2,
      "targetedConcept": "Call Directing & Requesting the Person in Charge",
      "targetedConceptEn": "Call Directing & Requesting the Person in Charge",
      "targetedConceptVi": "Yêu cầu kết nối với người phụ trách qua điện thoại"
    },
    {
      "id": "q_business_phone_3",
      "question": "Which supplier company does John Wright represent during the telephone conversation in Segment 4?",
      "questionEn": "Which supplier company does John Wright represent during the telephone conversation in Segment 4?",
      "questionVi": "John Wright đại diện cho công ty cung ứng nào trong cuộc đối thoại qua điện thoại ở Phân đoạn 4?",
      "options": [
        "International Fashion Supplies",
        "Apex Global Electronics",
        "Pacific Logistics & Shipping",
        "Metro Retail Department Stores"
      ],
      "optionsEn": [
        "International Fashion Supplies",
        "Apex Global Electronics",
        "Pacific Logistics & Shipping",
        "Metro Retail Department Stores"
      ],
      "optionsVi": [
        "International Fashion Supplies",
        "Apex Global Electronics",
        "Pacific Logistics & Shipping",
        "Metro Retail Department Stores"
      ],
      "correctAnswer": 0,
      "explanation": "In Segment 4, John Wright introduces himself and his employer: \"This is John Wright from International Fashion Supplies.\"",
      "explanationEn": "In Segment 4, John Wright introduces himself and his employer: \"This is John Wright from International Fashion Supplies.\"",
      "explanationVi": "Trong Phân đoạn 4, John Wright tự giới thiệu: \"This is John Wright from International Fashion Supplies.\" (Tôi là John Wright đến từ công ty International Fashion Supplies).",
      "referenceSegmentIndex": 4,
      "targetedConcept": "Professional Identity & Supplier Representation",
      "targetedConceptEn": "Professional Identity & Supplier Representation",
      "targetedConceptVi": "Tự giới thiệu danh tính & Đơn vị cung ứng đối tác"
    },
    {
      "id": "q_business_phone_4",
      "question": "Why does John Wright spell out his surname letter by letter in Segment 7?",
      "questionEn": "Why does John Wright spell out his surname letter by letter in Segment 7?",
      "questionVi": "Tại sao John Wright phải đánh vần từng chữ cái họ của mình trong Phân đoạn 7?",
      "options": [
        "Because the receptionist didn't catch his name and 'Wright' has silent letters and common homophones (Right/Write)",
        "Because company policy forbids pronouncing full names without spelling",
        "Because he forgot how to pronounce his family name in English",
        "Because he was required to test the telephone microphone volume"
      ],
      "optionsEn": [
        "Because the receptionist didn't catch his name and 'Wright' has silent letters and common homophones (Right/Write)",
        "Because company policy forbids pronouncing full names without spelling",
        "Because he forgot how to pronounce his family name in English",
        "Because he was required to test the telephone microphone volume"
      ],
      "optionsVi": [
        "Vì lễ tân chưa nghe rõ tên và họ 'Wright' có chữ cái câm cùng các từ đồng âm phổ biến (Right/Write)",
        "Vì quy định công ty cấm phát âm cả họ mà không đánh vần",
        "Vì ông ấy quên cách phát âm họ của mình bằng tiếng Anh",
        "Vì ông ấy cần kiểm tra âm lượng micro của điện thoại"
      ],
      "correctAnswer": 0,
      "explanation": "In Segments 5-7, after the receptionist says \"Sorry, I didn't catch your name\", John clarifies: \"John Wright. That's W-R-I-G-H-T.\"",
      "explanationEn": "In Segments 5-7, after the receptionist says \"Sorry, I didn't catch your name\", John clarifies: \"John Wright. That's W-R-I-G-H-T.\"",
      "explanationVi": "Trong Phân đoạn 5-7, sau khi lễ tân nói \"Sorry, I didn't catch your name\", John nhắc lại và đánh vần: \"That's W-R-I-G-H-T\" để tránh nhầm lẫn với các từ đồng âm như 'Right' hay 'Write'.",
      "referenceSegmentIndex": 7,
      "targetedConcept": "Clarification & Spelling Corporate Names",
      "targetedConceptEn": "Clarification & Spelling Corporate Names",
      "targetedConceptVi": "Kỹ năng làm rõ thông tin & Đánh vần tên riêng đối tác"
    },
    {
      "id": "q_business_phone_5",
      "question": "What does the British English idiom 'the line's engaged' mean in Segment 9?",
      "questionEn": "What does the British English idiom 'the line's engaged' mean in Segment 9?",
      "questionVi": "Thành ngữ tiếng Anh-Anh 'the line's engaged' trong Phân đoạn 9 có nghĩa là gì?",
      "options": [
        "The extension line is currently busy because Mr Morgan is speaking on another call",
        "The telephone company disconnected the service due to unpaid bills",
        "Mr Morgan has officially announced his wedding engagement",
        "The telephone equipment is completely broken and being repaired"
      ],
      "optionsEn": [
        "The extension line is currently busy because Mr Morgan is speaking on another call",
        "The telephone company disconnected the service due to unpaid bills",
        "Mr Morgan has officially announced his wedding engagement",
        "The telephone equipment is completely broken and being repaired"
      ],
      "optionsVi": [
        "Đường dây máy nhánh hiện đang bận do ông Morgan đang bận nghe một cuộc gọi khác",
        "Công ty viễn thông đã ngắt dịch vụ do chưa thanh toán hóa đơn",
        "Ông Morgan vừa chính thức tuyên bố đính hôn",
        "Thiết bị điện thoại đã bị hỏng hoàn toàn và đang chờ bảo dưỡng"
      ],
      "correctAnswer": 0,
      "explanation": "In British business terminology, 'the line is engaged' means the telephone line is busy. The receptionist follows up with: 'would you like to hold?'",
      "explanationEn": "In British business terminology, 'the line is engaged' means the telephone line is busy. The receptionist follows up with: 'would you like to hold?'",
      "explanationVi": "Trong tiếng Anh-Anh thương mại, 'engaged line' nghĩa là đường dây đang bận. Lễ tân giải thích và hỏi: \"I'm afraid the line's engaged, would you like to hold?\" (Tôi e rằng máy đang bận, ông có muốn giữ máy chờ không ạ?).",
      "referenceSegmentIndex": 9,
      "targetedConcept": "British Telephony Idioms ('Line Engaged' vs. 'Busy')",
      "targetedConceptEn": "British Telephony Idioms ('Line Engaged' vs. 'Busy')",
      "targetedConceptVi": "Thành ngữ điện thoại Anh-Anh ('Line Engaged' - Máy bận)"
    },
    {
      "id": "q_business_phone_6",
      "question": "What critical supply chain information does John Wright convey in his message in Segments 12-13?",
      "questionEn": "What critical supply chain information does John Wright convey in his message in Segments 12-13?",
      "questionVi": "John Wright truyền đạt thông tin chuỗi cung ứng quan trọng nào trong lời nhắn ở Phân đoạn 12-13?",
      "options": [
        "Their latest shipment has been delayed, but the 300 ordered dresses should arrive next Friday",
        "The order of 300 dresses has been completely canceled due to factory bankruptcy",
        "The price of the dresses will triple starting from next Monday",
        "The shipment has already arrived at the store warehouse three days early"
      ],
      "optionsEn": [
        "Their latest shipment has been delayed, but the 300 ordered dresses should arrive next Friday",
        "The order of 300 dresses has been completely canceled due to factory bankruptcy",
        "The price of the dresses will triple starting from next Monday",
        "The shipment has already arrived at the store warehouse three days early"
      ],
      "optionsVi": [
        "Chuyến hàng mới nhất bị hoãn, nhưng 300 chiếc váy đã đặt dự kiến sẽ đến vào thứ Sáu tuần tới",
        "Đơn hàng 300 chiếc váy đã bị hủy hoàn toàn do nhà máy phá sản",
        "Giá của các mẫu váy sẽ tăng gấp ba lần kể từ thứ Hai tuần tới",
        "Chuyến hàng đã đến kho của cửa hàng sớm hơn ba ngày"
      ],
      "correctAnswer": 0,
      "explanation": "In Segments 12-13, John leaves the message: 'our latest shipment has been delayed and that the 300 dresses he ordered should arrive next Friday.'",
      "explanationEn": "In Segments 12-13, John leaves the message: 'our latest shipment has been delayed and that the 300 dresses he ordered should arrive next Friday.'",
      "explanationVi": "Trong Phân đoạn 12-13, John để lại lời nhắn rõ ràng: chuyến hàng mới nhất bị hoãn và 300 chiếc váy ông Morgan đặt sẽ đến vào thứ Sáu tuần sau.",
      "referenceSegmentIndex": 13,
      "targetedConcept": "Order Status & Shipment Delay Communication",
      "targetedConceptEn": "Order Status & Shipment Delay Communication",
      "targetedConceptVi": "Thông báo trạng thái đơn hàng & Hoãn chuyến giao hàng"
    },
    {
      "id": "q_business_phone_7",
      "question": "In British telephone conventions, how does John Wright read out the consecutive double digits in '99' in Segment 17?",
      "questionEn": "In British telephone conventions, how does John Wright read out the consecutive double digits in '99' in Segment 17?",
      "questionVi": "Theo quy ước đọc số điện thoại kiểu Anh, John Wright phát âm cặp số lặp '99' như thế nào trong Phân đoạn 17?",
      "options": [
        "As 'double nine' (zero one six three two nine six zero double nine four)",
        "As 'ninety-nine hundred' following financial accounting format",
        "As 'two nines' following postal code indexing rules",
        "As 'pair of nines' following radio military alphabet"
      ],
      "optionsEn": [
        "As 'double nine' (zero one six three two nine six zero double nine four)",
        "As 'ninety-nine hundred' following financial accounting format",
        "As 'two nines' following postal code indexing rules",
        "As 'pair of nines' following radio military alphabet"
      ],
      "optionsVi": [
        "Phát âm là 'double nine' (zero one six three two nine six zero double nine four)",
        "Phát âm là 'ninety-nine hundred' theo định dạng kế toán tài chính",
        "Phát âm là 'two nines' theo quy tắc chỉ mục mã bưu chính",
        "Phát âm là 'pair of nines' theo bảng chữ cái vô tuyến quân sự"
      ],
      "correctAnswer": 0,
      "explanation": "In Segment 17, John Wright reads his telephone number: 'zero one six three two nine six zero double nine four.' British speakers conventionally say 'double [number]' for repeated digits.",
      "explanationEn": "In Segment 17, John Wright reads his telephone number: 'zero one six three two nine six zero double nine four.' British speakers conventionally say 'double [number]' for repeated digits.",
      "explanationVi": "Trong Phân đoạn 17, John đọc: '...zero double nine four'. Người Anh có thói quen phát âm 'double + số' khi có hai chữ số giống nhau đứng kề nhau.",
      "referenceSegmentIndex": 17,
      "targetedConcept": "British Telephone Number Conventions ('Double Digits')",
      "targetedConceptEn": "British Telephone Number Conventions ('Double Digits')",
      "targetedConceptVi": "Quy ước đọc số điện thoại Anh quốc ('Double Digits')"
    },
    {
      "id": "q_business_phone_8",
      "question": "What is the primary commercial purpose of the receptionist reciting the telephone number in Segment 18?",
      "questionEn": "What is the primary commercial purpose of the receptionist reciting the telephone number in Segment 18?",
      "questionVi": "Mục đích thương mại chính của việc nhân viên lễ tân đọc nhắc lại số điện thoại trong Phân đoạn 18 là gì?",
      "options": [
        "To perform read-back verification ensuring complete accuracy before logging the callback memo",
        "To test if the caller is listening attentively before disconnecting the call",
        "Because UK telecommunications law requires repeating every digit twice",
        "To memorize the caller's contact for personal non-business purposes"
      ],
      "optionsEn": [
        "To perform read-back verification ensuring complete accuracy before logging the callback memo",
        "To test if the caller is listening attentively before disconnecting the call",
        "Because UK telecommunications law requires repeating every digit twice",
        "To memorize the caller's contact for personal non-business purposes"
      ],
      "optionsVi": [
        "Để thực hiện quy trình đọc lại xác minh (read-back verification) đảm bảo tính chính xác tuyệt đối trước khi ghi sổ memo",
        "Để kiểm tra xem người gọi có đang chú ý lắng nghe trước khi cúp máy hay không",
        "Vì luật viễn thông Anh quốc yêu cầu phải lặp lại từng con số hai lần",
        "Để ghi nhớ số liên lạc của người gọi cho mục đích cá nhân ngoài công việc"
      ],
      "correctAnswer": 0,
      "explanation": "In Segment 18, the receptionist recites: 'That's oh one six three two nine six oh double nine four', which John confirms with 'Yes, that's right.' This ensures error-free message logging.",
      "explanationEn": "In Segment 18, the receptionist recites: 'That's oh one six three two nine six oh double nine four', which John confirms with 'Yes, that's right.' This ensures error-free message logging.",
      "explanationVi": "Trong Phân đoạn 18, lễ tân đọc lại: 'That's oh one six three two nine six oh double nine four', và John xác nhận 'Yes, that's right.' Đây là kỹ thuật đọc lại đối chiếu (read-back verification) cốt lõi trong dịch vụ khách hàng chuyên nghiệp.",
      "referenceSegmentIndex": 18,
      "targetedConcept": "Read-back Verification Protocol & Message Accuracy",
      "targetedConceptEn": "Read-back Verification Protocol & Message Accuracy",
      "targetedConceptVi": "Quy trình đối chiếu đọc lại (Read-back) & Độ chính xác thông tin"
    }
  ],
  "generatedBy": "CONTEXTUAL_FALLBACK"
}

lesson = {
  "id": "vid_business_phone_call",
  "slug": "business-english-professional-phone-calls-etiquette",
  "title": "Business English: Professional Phone Calls & Telephone Etiquette",
  "description": "Hội thoại tiếng Anh thương mại và kỹ năng trực điện thoại chuyên nghiệp tại công ty thời trang Chic Boutique: quy trình chào đón đối tác, kết nối máy nhánh cho John Wright (International Fashion Supplies) gặp Mr Morgan, xử lý khi đường dây bận (line engaged), ghi nhận lời nhắn hoãn chuyến hàng 300 chiếc váy, đối chiếu số điện thoại và nghi thức chào kết thúc chuẩn mực.",
  "sourceType": "YOUTUBE",
  "externalId": "Tw2r9DkL5co",
  "thumbnailUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
  "durationSeconds": 79,
  "durationFormatted": "01:19",
  "cefrLevel": "B1",
  "supportedTypes": "BOTH",
  "categoryId": "cat_toeic_listen",
  "categorySlug": "toeic-listening",
  "categoryName": "TOEIC Luyện Nghe Công Sở",
  "accent": "en-GB",
  "wpmSpeed": 142,
  "viewCount": 245000,
  "studyCount": 71200,
  "quiz": quiz,
  "segments": segments
}

file_content = f'''import {{ MockVideoLesson, VideoQuizData }} from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for Business English: Professional Phone Calls
 * 8 in-depth analytical questions covering UK business telephony, caller verification, spelling, and message logging.
 */
export const QUIZ_BUSINESS_PHONE_CALL: VideoQuizData = {json.dumps(quiz, ensure_ascii=False, indent=2)};

/**
 * Business English: Professional Phone Calls & Telephone Etiquette (Chic Boutique)
 * Master Edition - 22 Pure Segments (Zero Merged Utterances)
 * ExternalId: Tw2r9DkL5co (Animated English)
 * Duration: 79s (01:19)
 * Category: cat_toeic_listen (TOEIC Luyện Nghe Công Sở)
 */
export const LESSON_BUSINESS_PHONE_CALL: MockVideoLesson = {json.dumps(lesson, ensure_ascii=False, indent=2)};
'''

target_path = 'features/listening/data/lessons/lesson_business_phone_call.ts'
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(file_content)

print(f"Successfully generated {target_path} with 22 pure master segments and 8 bilingual quiz questions!")
