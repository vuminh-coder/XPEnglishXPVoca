import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for Medical English: Doctor Consultation
 * 8 High-Yield CEFR A2/B1 Questions aligned with authentic Sunshine English clinical dialogue
 */
export const QUIZ_MEDICAL_CONSULTATION: VideoQuizData = {
  "lessonId": "vid_medical_consultation",
  "lessonTitle": "Medical English: Doctor Consultation & Pharmacy Prescription",
  "totalQuestions": 8,
  "xpReward": 40,
  "questions": [
    {
      "id": "q_medical_consult_1",
      "question": "What primary reason prompted Kate to visit the medical clinic today?",
      "questionEn": "What primary reason prompted Kate to visit the medical clinic today?",
      "questionVi": "Lý do chính nào khiến Kate đến khám tại phòng khám y tế hôm nay?",
      "options": [
        "She is feeling unwell with a fever and wants to see Dr. David",
        "She needs to renew her driver's license eye examination certificate",
        "She is submitting a job application for a receptionist position",
        "She wants to purchase cosmetic skincare products"
      ],
      "optionsEn": [
        "She is feeling unwell with a fever and wants to see Dr. David",
        "She needs to renew her driver's license eye examination certificate",
        "She is submitting a job application for a receptionist position",
        "She wants to purchase cosmetic skincare products"
      ],
      "optionsVi": [
        "Cô cảm thấy trong người không khỏe vì bị sốt và muốn gặp bác sĩ David",
        "Cô cần gia hạn giấy chứng nhận kiểm tra thị lực bằng lái xe",
        "Cô đang nộp hồ sơ xin việc cho vị trí nhân viên lễ tân phòng khám",
        "Cô muốn mua các sản phẩm chăm sóc da mỹ phẩm"
      ],
      "correctAnswer": 0,
      "explanation": "In Segments 4 & 12, Kate states her goal and symptoms: 'I would like to see Dr. David... I think I have a fever.'",
      "explanationEn": "In Segments 4 & 12, Kate states her goal and symptoms: 'I would like to see Dr. David... I think I have a fever.'",
      "explanationVi": "Trong câu 4 & 12, Kate nêu rõ mục đích và triệu chứng: 'Tôi muốn gặp bác sĩ David... Tôi nghĩ là mình đang bị sốt.'",
      "referenceSegmentIndex": 4,
      "targetedConcept": "Mục đích khám bệnh & Triệu chứng sốt (Clinic Visit Objective & Fever Symptoms)",
      "targetedConceptEn": "Clinic Visit Objective & Fever Symptoms",
      "targetedConceptVi": "Mục đích khám bệnh & Triệu chứng sốt"
    },
    {
      "id": "q_medical_consult_2",
      "question": "Why was Kate unable to see Dr. David immediately upon arriving at the clinic?",
      "questionEn": "Why was Kate unable to see Dr. David immediately upon arriving at the clinic?",
      "questionVi": "Tại sao Kate không thể gặp bác sĩ David ngay khi vừa đến phòng khám?",
      "options": [
        "She did not have a prior appointment and the doctor was busy with another patient",
        "The clinic had closed early due to a power outage",
        "Dr. David was on vacation overseas for two weeks",
        "Her health insurance documentation had expired"
      ],
      "optionsEn": [
        "She did not have a prior appointment and the doctor was busy with another patient",
        "The clinic had closed early due to a power outage",
        "Dr. David was on vacation overseas for two weeks",
        "Her health insurance documentation had expired"
      ],
      "optionsVi": [
        "Cô chưa đặt lịch hẹn trước và bác sĩ đang bận khám cho một bệnh nhân khác",
        "Phòng khám đã đóng cửa sớm do sự cố mất điện",
        "Bác sĩ David đang đi nghỉ phép ở nước ngoài trong hai tuần",
        "Giấy tờ bảo hiểm y tế của cô đã hết hạn sử dụng"
      ],
      "correctAnswer": 0,
      "explanation": "In Segments 5-7, the receptionist explains: 'Do you have an appointment? No, I don\\'t. Dr. David is busy with a patient. If you want to see Dr. David, then you need to make an appointment.'",
      "explanationEn": "In Segments 5-7, the receptionist explains: 'Do you have an appointment? No, I don\\'t. Dr. David is busy with a patient. If you want to see Dr. David, then you need to make an appointment.'",
      "explanationVi": "Trong câu 5-7, tiếp tân giải thích: 'Bạn đã có lịch hẹn trước chưa? - Chưa. - Bác sĩ David đang bận với bệnh nhân. Nếu bạn muốn gặp bác sĩ, bạn cần phải đặt lịch hẹn.'",
      "referenceSegmentIndex": 7,
      "targetedConcept": "Quy trình đặt lịch hẹn khám bệnh (Clinic Appointment Booking Protocol)",
      "targetedConceptEn": "Clinic Appointment Booking Protocol",
      "targetedConceptVi": "Quy trình đặt lịch hẹn khám bệnh"
    },
    {
      "id": "q_medical_consult_3",
      "question": "What personal details does Kate provide, and what queuing item is issued to her?",
      "questionEn": "What personal details does Kate provide, and what queuing item is issued to her?",
      "questionVi": "Kate cung cấp thông tin cá nhân gì và nhận được vật phẩm xếp hàng nào?",
      "options": [
        "She provides her name (Kate) and age (23), receiving token number 23 for the waiting hall",
        "She provides her passport and receives an overnight hospital inpatient wristband",
        "She provides her university student ID and receives a free parking coupon",
        "She provides her credit card and receives an emergency ambulance ticket"
      ],
      "optionsEn": [
        "She provides her name (Kate) and age (23), receiving token number 23 for the waiting hall",
        "She provides her passport and receives an overnight hospital inpatient wristband",
        "She provides her university student ID and receives a free parking coupon",
        "She provides her credit card and receives an emergency ambulance ticket"
      ],
      "optionsVi": [
        "Cô cung cấp họ tên (Kate) và tuổi (23), nhận được số thứ tự 23 để ngồi chờ ở phòng chờ",
        "Cô xuất trình hộ chiếu và nhận vòng đeo tay bệnh nhân nội trú qua đêm",
        "Cô xuất trình thẻ sinh viên đại học và nhận phiếu giảm giá đỗ xe miễn phí",
        "Cô cung cấp thẻ tín dụng và nhận vé xe cứu thương khẩn cấp"
      ],
      "correctAnswer": 0,
      "explanation": "In Segments 10 & 13, Kate confirms: 'My name is Kate, I am 23' and the receptionist responds: 'Here is your token number. Please wait in the waiting hall.' Later she is called as Token number 23.",
      "explanationEn": "In Segments 10 & 13, Kate confirms: 'My name is Kate, I am 23' and the receptionist responds: 'Here is your token number. Please wait in the waiting hall.' Later she is called as Token number 23.",
      "explanationVi": "Trong câu 10 & 13, Kate xác nhận tên Kate 23 tuổi và nhận số thứ tự 23 để ngồi đợi ở sảnh chờ.",
      "referenceSegmentIndex": 13,
      "targetedConcept": "Đăng ký hồ sơ & Số thứ tự chờ khám (Patient Registration & Queue Token)",
      "targetedConceptEn": "Patient Registration & Queue Token",
      "targetedConceptVi": "Đăng ký hồ sơ & Số thứ tự chờ khám"
    },
    {
      "id": "q_medical_consult_4",
      "question": "What clinical diagnosis does Dr. David formulate after physically examining Kate?",
      "questionEn": "What clinical diagnosis does Dr. David formulate after physically examining Kate?",
      "questionVi": "Bác sĩ David đưa ra kết luận lâm sàng nào sau khi thăm khám trực tiếp cho Kate?",
      "options": [
        "She has a mild fever",
        "She has a severe bone fracture in her shoulder",
        "She is suffering from acute bacterial pneumonia",
        "Her body temperature is dangerously below normal hypothermia"
      ],
      "optionsEn": [
        "She has a mild fever",
        "She has a severe bone fracture in her shoulder",
        "She is suffering from acute bacterial pneumonia",
        "Her body temperature is dangerously below normal hypothermia"
      ],
      "optionsVi": [
        "Cô bị sốt nhẹ (mild fever)",
        "Cô bị gãy xương nghiêm trọng ở vùng vai",
        "Cô đang bị viêm phổi do vi khuẩn cấp tính",
        "Thân nhiệt của cô bị hạ thấp nguy hiểm dưới mức bình thường"
      ],
      "correctAnswer": 0,
      "explanation": "In Segment 20, Dr. David examines her and reports: 'Let me examine you. You have a mild fever.'",
      "explanationEn": "In Segment 20, Dr. David examines her and reports: 'Let me examine you. You have a mild fever.'",
      "explanationVi": "Trong câu 20, bác sĩ David khám và thông báo: 'Để tôi khám cho cô nhé. Cô bị sốt nhẹ.'",
      "referenceSegmentIndex": 20,
      "targetedConcept": "Thăm khám lâm sàng: Sốt nhẹ (Clinical Examination: Mild Fever)",
      "targetedConceptEn": "Clinical Examination: Mild Fever",
      "targetedConceptVi": "Thăm khám lâm sàng: Sốt nhẹ"
    },
    {
      "id": "q_medical_consult_5",
      "question": "What is Kate's blood pressure reading when Dr. David checks her arm?",
      "questionEn": "What is Kate's blood pressure reading when Dr. David checks her arm?",
      "questionVi": "Chỉ số huyết áp của Kate là bao nhiêu khi bác sĩ David đo bắp tay cho cô?",
      "options": [
        "Her blood pressure is healthy and normal at 120 over 80",
        "Her blood pressure is dangerously elevated at 180 over 110",
        "Her blood pressure is too low to register on the digital monitor",
        "Her blood pressure fluctuates wildly between 60 and 200"
      ],
      "optionsEn": [
        "Her blood pressure is healthy and normal at 120 over 80",
        "Her blood pressure is dangerously elevated at 180 over 110",
        "Her blood pressure is too low to register on the digital monitor",
        "Her blood pressure fluctuates wildly between 60 and 200"
      ],
      "optionsVi": [
        "Huyết áp của cô hoàn toàn khỏe mạnh và ổn định ở mức 120 trên 80 (120/80)",
        "Huyết áp của cô tăng cao nguy hiểm ở mức 180 trên 110",
        "Huyết áp quá thấp không thể ghi nhận trên máy đo kỹ thuật số",
        "Huyết áp dao động thất thường giữa 60 và 200"
      ],
      "correctAnswer": 0,
      "explanation": "In Segment 23, Dr. David verifies: 'Your blood pressure level is fine: 120 over 80. No need to worry, I am prescribing you some medicines.'",
      "explanationEn": "In Segment 23, Dr. David verifies: 'Your blood pressure level is fine: 120 over 80. No need to worry, I am prescribing you some medicines.'",
      "explanationVi": "Trong câu 23, bác sĩ xác nhận: 'Chỉ số huyết áp của cô hoàn toàn bình thường: 120 trên 80. Không cần lo lắng đâu, tôi sẽ kê cho cô một số loại thuốc.'",
      "referenceSegmentIndex": 23,
      "targetedConcept": "Đo huyết áp & Đọc chỉ số chuẩn 120/80 (Blood Pressure Check & 120 over 80)",
      "targetedConceptEn": "Blood Pressure Check & 120 over 80",
      "targetedConceptVi": "Đo huyết áp & Đọc chỉ số chuẩn 120/80"
    },
    {
      "id": "q_medical_consult_6",
      "question": "What dosage instructions does Dr. David specify for the prescribed medication?",
      "questionEn": "What dosage instructions does Dr. David specify for the prescribed medication?",
      "questionVi": "Bác sĩ David hướng dẫn liều dùng cụ thể nào cho loại thuốc được kê đơn?",
      "options": [
        "Take two tablets thrice a day after having a meal, followed by rest",
        "Take five capsules once a week on an empty stomach before bedtime",
        "Dissolve one tablet in hot milk every hour continuously",
        "Swallow all tablets at once before leaving the medical clinic"
      ],
      "optionsEn": [
        "Take two tablets thrice a day after having a meal, followed by rest",
        "Take five capsules once a week on an empty stomach before bedtime",
        "Dissolve one tablet in hot milk every hour continuously",
        "Swallow all tablets at once before leaving the medical clinic"
      ],
      "optionsVi": [
        "Uống hai viên, mỗi ngày ba lần sau khi ăn no, kèm theo nghỉ ngơi",
        "Uống năm viên một lần mỗi tuần khi bụng đói trước giờ đi ngủ",
        "Hòa tan một viên vào sữa nóng mỗi giờ liên tục",
        "Uống hết tất cả các viên cùng một lúc trước khi rời khỏi phòng khám"
      ],
      "correctAnswer": 0,
      "explanation": "In Segments 24 & 26, Dr. David directs: 'Take two tablets thrice a day... After having meal, you can take your medicine, and have some rest after taking the medicine.'",
      "explanationEn": "In Segments 24 & 26, Dr. David directs: 'Take two tablets thrice a day... After having meal, you can take your medicine, and have some rest after taking the medicine.'",
      "explanationVi": "Trong câu 24 & 26, bác sĩ dặn: 'Hãy uống hai viên, mỗi ngày ba lần... Sau khi ăn xong, cô có thể uống thuốc và nghỉ ngơi một chút.'",
      "referenceSegmentIndex": 24,
      "targetedConcept": "Chỉ dẫn liều lượng & Uống thuốc sau bữa ăn (Medication Dosage & Post-Meal Administration)",
      "targetedConceptEn": "Medication Dosage & Post-Meal Administration",
      "targetedConceptVi": "Chỉ dẫn liều lượng & Uống thuốc sau bữa ăn"
    },
    {
      "id": "q_medical_consult_7",
      "question": "Where does Kate go immediately after receiving her written prescription?",
      "questionEn": "Where does Kate go immediately after receiving her written prescription?",
      "questionVi": "Kate đi đâu ngay sau khi nhận được đơn thuốc bằng văn bản?",
      "options": [
        "To the pharmacy counter to request the medicines according to the prescription",
        "To the cafeteria to have a heavy three-course luncheon",
        "To the airport to board an international flight",
        "To an outdoor fitness center to run on the treadmill"
      ],
      "optionsEn": [
        "To the pharmacy counter to request the medicines according to the prescription",
        "To the cafeteria to have a heavy three-course luncheon",
        "To the airport to board an international flight",
        "To an outdoor fitness center to run on the treadmill"
      ],
      "optionsVi": [
        "Đến quầy nhà thuốc (pharmacy) để yêu cầu lấy thuốc theo đúng đơn thuốc đã kê",
        "Đến căng tin ăn một bữa trưa thịnh soạn ba món",
        "Ra sân bay để lên chuyến bay quốc tế",
        "Đến trung tâm thể dục ngoài trời để chạy bộ trên máy chạy"
      ],
      "correctAnswer": 0,
      "explanation": "In Segment 32, Kate visits the pharmacy and says: 'Give me these medicines according to this prescription.'",
      "explanationEn": "In Segment 32, Kate visits the pharmacy and says: 'Give me these medicines according to this prescription.'",
      "explanationVi": "Trong câu 32, Kate đến quầy dược và yêu cầu: 'Lấy cho tôi những loại thuốc này theo đơn thuốc này với ạ.'",
      "referenceSegmentIndex": 32,
      "targetedConcept": "Lấy thuốc theo đơn tại nhà thuốc (Filling Prescription at Pharmacy)",
      "targetedConceptEn": "Filling Prescription at Pharmacy",
      "targetedConceptVi": "Lấy thuốc theo đơn tại nhà thuốc"
    },
    {
      "id": "q_medical_consult_8",
      "question": "How much does the prescribed medication cost, and how does the pharmacy transaction conclude?",
      "questionEn": "How much does the prescribed medication cost, and how does the pharmacy transaction conclude?",
      "questionVi": "Đơn thuốc được kê có giá bao nhiêu tiền và giao dịch tại quầy dược kết thúc như thế nào?",
      "options": [
        "It costs $8.67, Kate pays the money, and the pharmacist returns her change",
        "It costs $120.50, and the pharmacist declines her debit card",
        "It is completely free under a special promotional festival gift coupon",
        "It costs $500.00 and requires an installment financing agreement"
      ],
      "optionsEn": [
        "It costs $8.67, Kate pays the money, and the pharmacist returns her change",
        "It costs $120.50, and the pharmacist declines her debit card",
        "It is completely free under a special promotional festival gift coupon",
        "It costs $500.00 and requires an installment financing agreement"
      ],
      "optionsVi": [
        "Thuốc có giá 8.67 đô la, Kate thanh toán tiền và dược sĩ trả lại tiền thối",
        "Thuốc có giá 120.50 đô la và dược sĩ từ chối thẻ ghi nợ của cô",
        "Thuốc hoàn toàn miễn phí theo phiếu quà tặng lễ hội đặc biệt",
        "Thuốc có giá 500.00 đô la và yêu cầu ký hợp đồng trả góp"
      ],
      "correctAnswer": 0,
      "explanation": "In Segments 36 & 38, the pharmacist states: 'It costs 8.67.' Kate pays ('Here you go') and the pharmacist replies: 'Here is your change.'",
      "explanationEn": "In Segments 36 & 38, the pharmacist states: 'It costs 8.67.' Kate pays ('Here you go') and the pharmacist replies: 'Here is your change.'",
      "explanationVi": "Trong câu 36 & 38, dược sĩ báo giá 8.67 đô la, Kate trả tiền và dược sĩ thối lại tiền thừa kết thúc giao dịch thuận lợi.",
      "referenceSegmentIndex": 36,
      "targetedConcept": "Thanh toán tiền thuốc & Nhận tiền thối (Pharmacy Payment & Receipt of Change)",
      "targetedConceptEn": "Pharmacy Payment & Receipt of Change",
      "targetedConceptVi": "Thanh toán tiền thuốc & Nhận tiền thối"
    }
  ],
  "generatedBy": "CONTEXTUAL_FALLBACK"
};

/**
 * Medical English: Doctor Consultation & Pharmacy Prescription
 * Slug: medical-english-doctor-consultation-pharmacy-prescription
 * YouTube ID: 44SL8i8h0dg (Sunshine English - At the doctor English conversation)
 * Category: cat_daily_conv (Giao Tiếp Đời Thực)
 * Standard Healthcare & Pharmacy Dialogue (38 Pure Master Segments - 1-Indexed)
 */
export const LESSON_MEDICAL_CONSULTATION: MockVideoLesson = {
  id: "vid_medical_consultation",
  slug: "medical-english-doctor-consultation-pharmacy-prescription",
  title: "Medical English: Doctor Consultation & Pharmacy Prescription",
  description: "Hội thoại tiếng Anh y tế và giao tiếp khám bệnh thực tế tại phòng khám: quy trình đặt lịch hẹn tại quầy tiếp tân, lấy số thứ tự 23, thăm khám trực tiếp cùng Bác sĩ David, kiểm tra sốt nhẹ và đo huyết áp chuẩn 120/80, hướng dẫn liều dùng thuốc 2 viên x 3 lần/ngày sau bữa ăn, và quy trình mua thuốc tại nhà thuốc theo đơn với giá $8.67.",
  sourceType: "YOUTUBE",
  externalId: "44SL8i8h0dg",
  thumbnailUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&auto=format&fit=crop&q=80",
  durationSeconds: 150,
  durationFormatted: "02:30",
  cefrLevel: "A2",
  supportedTypes: "BOTH",
  categoryId: "cat_daily_conv",
  categorySlug: "daily-conversations",
  categoryName: "Giao Tiếp Đời Thực",
  accent: "en-US",
  wpmSpeed: 135,
  viewCount: 215000,
  studyCount: 68900,
  quiz: QUIZ_MEDICAL_CONSULTATION,
  segments: [
    {
        "orderIndex": 1,
        "startTime": 12.0,
        "endTime": 12.8,
        "text": "Hello.",
        "translationVi": "Xin chào.",
        "ipaUs": "/həˈloʊ/",
        "properNouns": [],
        "keywords": [
            "hello"
        ],
        "explanationAi": "Lời chào mở đầu tiêu chuẩn tại quầy tiếp tân phòng khám.",
        "tokenCount": 1
    },
    {
        "orderIndex": 2,
        "startTime": 13.12,
        "endTime": 13.92,
        "text": "Hello.",
        "translationVi": "Chào bạn.",
        "ipaUs": "/həˈloʊ/",
        "properNouns": [],
        "keywords": [
            "hello"
        ],
        "explanationAi": "Lời chào đáp lễ của bệnh nhân khi bước đến quầy lễ tân.",
        "tokenCount": 1
    },
    {
        "orderIndex": 3,
        "startTime": 14.0,
        "endTime": 15.71,
        "text": "What can I do for you today?",
        "translationVi": "Tôi có thể giúp gì cho bạn hôm nay?",
        "ipaUs": "/wʌt kæn aɪ duː fɔːr juː təˈdeɪ/",
        "properNouns": [],
        "keywords": [
            "what can I do",
            "today"
        ],
        "explanationAi": "Mẫu câu thăm hỏi mở đầu lịch sự: 'What can I do for you today?' (Tôi có thể hỗ trợ gì cho bạn hôm nay?).",
        "tokenCount": 7
    },
    {
        "orderIndex": 4,
        "startTime": 15.76,
        "endTime": 17.92,
        "text": "I would like to see Dr. David.",
        "translationVi": "Tôi muốn gặp bác sĩ David.",
        "ipaUs": "/aɪ wʊd laɪk tuː siː ˈdɑːktər ˈdeɪvɪd/",
        "properNouns": [
            "Dr. David"
        ],
        "keywords": [
            "would like to see",
            "doctor"
        ],
        "explanationAi": "Cấu trúc 'I would like to see [Doctor's name]' dùng để đăng ký khám với bác sĩ cụ thể.",
        "tokenCount": 7
    },
    {
        "orderIndex": 5,
        "startTime": 18.08,
        "endTime": 19.44,
        "text": "Do you have an appointment?",
        "translationVi": "Bạn đã có lịch hẹn trước chưa?",
        "ipaUs": "/duː juː hæv æn əˈpɔɪntmənt/",
        "properNouns": [],
        "keywords": [
            "appointment",
            "have an appointment"
        ],
        "explanationAi": "'Appointment' là lịch hẹn trước; câu hỏi tiêu chuẩn tại các cơ sở y tế nước ngoài.",
        "tokenCount": 5
    },
    {
        "orderIndex": 6,
        "startTime": 19.68,
        "endTime": 21.36,
        "text": "No, I don't.",
        "translationVi": "Dạ chưa, tôi chưa có lịch hẹn.",
        "ipaUs": "/noʊ aɪ doʊnt/",
        "properNouns": [],
        "keywords": [
            "no",
            "I don't"
        ],
        "explanationAi": "Câu trả lời ngắn gọn xác nhận chưa đặt hẹn trước (khách vãng lai walk-in).",
        "tokenCount": 4
    },
    {
        "orderIndex": 7,
        "startTime": 21.44,
        "endTime": 26.88,
        "text": "Dr. David is busy with a patient. If you want to see Dr. David, then you need to make an appointment.",
        "translationVi": "Bác sĩ David đang bận với bệnh nhân. Nếu bạn muốn gặp bác sĩ David, bạn cần phải đặt lịch hẹn.",
        "ipaUs": "/ˈdɑːktər ˈdeɪvɪd ɪz ˈbɪzi wɪð ə ˈpeɪʃnt ɪf juː wɑːnt tuː siː ˈdɑːktər ˈdeɪvɪd ðen juː niːd tuː meɪk æn əˈpɔɪntmənt/",
        "properNouns": [
            "Dr. David"
        ],
        "keywords": [
            "busy with a patient",
            "need to make an appointment"
        ],
        "explanationAi": "'Make an appointment' là cụm cố định chỉ hành động đặt lịch hẹn khám bệnh.",
        "tokenCount": 21
    },
    {
        "orderIndex": 8,
        "startTime": 27.44,
        "endTime": 30.32,
        "text": "Okay, I would like to make an appointment.",
        "translationVi": "Được rồi, vậy tôi muốn đặt một lịch hẹn ngay bây giờ.",
        "ipaUs": "/oʊˈkeɪ aɪ wʊd laɪk tuː meɪk æn əˈpɔɪntmənt/",
        "properNouns": [],
        "keywords": [
            "okay",
            "make an appointment"
        ],
        "explanationAi": "Cách đồng ý lịch sự để nhân viên tiến hành thủ tục ghi danh khám bệnh.",
        "tokenCount": 8
    },
    {
        "orderIndex": 9,
        "startTime": 30.96,
        "endTime": 33.44,
        "text": "Can I have your name and age, please?",
        "translationVi": "Cho tôi xin họ tên và tuổi của bạn được không?",
        "ipaUs": "/kæn aɪ hæv jʊər neɪm ænd eɪdʒ pliːz/",
        "properNouns": [],
        "keywords": [
            "name and age",
            "please"
        ],
        "explanationAi": "Bước thu thập thông tin định danh bệnh nhân cơ bản (họ tên và độ tuổi).",
        "tokenCount": 8
    },
    {
        "orderIndex": 10,
        "startTime": 33.6,
        "endTime": 36.64,
        "text": "My name is Kate, I am 23.",
        "translationVi": "Tên tôi là Kate, tôi 23 tuổi.",
        "ipaUs": "/maɪ neɪm ɪz keɪt aɪ æm ˈtwenti θriː/",
        "properNouns": [
            "Kate"
        ],
        "keywords": [
            "name is Kate",
            "23"
        ],
        "explanationAi": "Bệnh nhân cung cấp tên và số tuổi.",
        "tokenCount": 7
    },
    {
        "orderIndex": 11,
        "startTime": 38.4,
        "endTime": 39.84,
        "text": "And what is your diagnosis?",
        "translationVi": "Và bạn đang có triệu chứng hoặc cảm thấy thế nào?",
        "ipaUs": "/ænd wʌt ɪz jʊər ˌdaɪəɡˈnoʊsɪs/",
        "properNouns": [],
        "keywords": [
            "diagnosis",
            "symptoms"
        ],
        "explanationAi": "'Diagnosis' trong ngữ cảnh hội thoại thường nhật tại quầy tiếp tân được dùng mang ý hỏi về vấn đề sức khỏe hoặc triệu chứng bạn tự cảm nhận.",
        "tokenCount": 5
    },
    {
        "orderIndex": 12,
        "startTime": 40.48,
        "endTime": 42.16,
        "text": "I think I have a fever.",
        "translationVi": "Tôi nghĩ là mình đang bị sốt.",
        "ipaUs": "/aɪ θɪŋk aɪ hæv ə ˈfiːvər/",
        "properNouns": [],
        "keywords": [
            "have a fever"
        ],
        "explanationAi": "'Have a fever' là cấu trúc diễn tả triệu chứng sốt (nhiệt độ cơ thể cao hơn bình thường).",
        "tokenCount": 6
    },
    {
        "orderIndex": 13,
        "startTime": 42.4,
        "endTime": 48.8,
        "text": "Here is your token number. Please wait in the waiting hall. I will let you know when your turn comes.",
        "translationVi": "Đây là số thứ tự của bạn. Xin vui lòng chờ ở phòng chờ. Tôi sẽ thông báo cho bạn khi đến lượt nhé.",
        "ipaUs": "/hɪr ɪz jʊər ˈtoʊkən ˈnʌmbər pliːz weɪt ɪn ðə ˈweɪtɪŋ hɔːl aɪ wɪl let juː noʊ wen jʊər tɜːrn kʌmz/",
        "properNouns": [],
        "keywords": [
            "token number",
            "waiting hall",
            "your turn comes"
        ],
        "explanationAi": "'Token number' là số thứ tự bốc thăm/xếp hàng; 'waiting hall' là phòng chờ bệnh nhân.",
        "tokenCount": 20
    },
    {
        "orderIndex": 14,
        "startTime": 48.88,
        "endTime": 51.04,
        "text": "Fine, thank you.",
        "translationVi": "Vâng, cảm ơn bạn.",
        "ipaUs": "/faɪn θæŋk juː/",
        "properNouns": [],
        "keywords": [
            "fine",
            "thank you"
        ],
        "explanationAi": "Lời cảm ơn ngắn gọn khi nhận số thứ tự xếp hàng.",
        "tokenCount": 3
    },
    {
        "orderIndex": 15,
        "startTime": 55.76,
        "endTime": 64.24,
        "text": "Token number 23, Miss Kate, it is your turn. Please go to the doctor's room.",
        "translationVi": "Số thứ tự 23, cô Kate, đã đến lượt cô rồi. Mời cô vào phòng khám của bác sĩ.",
        "ipaUs": "/ˈtoʊkən ˈnʌmbər ˈtwenti θriː mɪs keɪt ɪt ɪz jʊər tɜːrn pliːz ɡoʊ tuː ðə ˈdɑːktərz ruːm/",
        "properNouns": [
            "Miss Kate"
        ],
        "keywords": [
            "token number 23",
            "your turn",
            "doctor's room"
        ],
        "explanationAi": "Loa gọi hoặc tiếp tân thông báo mời bệnh nhân có số thứ tự vào phòng khám bác sĩ.",
        "tokenCount": 16
    },
    {
        "orderIndex": 16,
        "startTime": 68.08,
        "endTime": 69.76,
        "text": "Hello, Miss Kate.",
        "translationVi": "Chào cô Kate.",
        "ipaUs": "/həˈloʊ mɪs keɪt/",
        "properNouns": [
            "Miss Kate"
        ],
        "keywords": [
            "hello",
            "Miss Kate"
        ],
        "explanationAi": "Lời chào thân thiện của bác sĩ khi bệnh nhân bước vào phòng khám.",
        "tokenCount": 3
    },
    {
        "orderIndex": 17,
        "startTime": 69.84,
        "endTime": 71.2,
        "text": "Hello, Doctor.",
        "translationVi": "Chào bác sĩ.",
        "ipaUs": "/həˈloʊ ˈdɑːktər/",
        "properNouns": [],
        "keywords": [
            "hello doctor"
        ],
        "explanationAi": "Lời chào tôn trọng gửi tới bác sĩ điều trị.",
        "tokenCount": 2
    },
    {
        "orderIndex": 18,
        "startTime": 71.44,
        "endTime": 72.72,
        "text": "What is the matter?",
        "translationVi": "Cô đang gặp vấn đề gì về sức khỏe thế?",
        "ipaUs": "/wʌt ɪz ðə ˈmætər/",
        "properNouns": [],
        "keywords": [
            "what is the matter"
        ],
        "explanationAi": "'What is the matter?' là câu hỏi kinh điển của thầy thuốc để tìm hiểu triệu chứng của bệnh nhân.",
        "tokenCount": 4
    },
    {
        "orderIndex": 19,
        "startTime": 72.8,
        "endTime": 76.11,
        "text": "I have a fever, I am not feeling well.",
        "translationVi": "Tôi bị sốt, tôi cảm thấy trong người không được khỏe.",
        "ipaUs": "/aɪ hæv ə ˈfiːvər aɪ æm nɑːt ˈfiːlɪŋ wel/",
        "properNouns": [],
        "keywords": [
            "fever",
            "not feeling well"
        ],
        "explanationAi": "'Not feeling well' là cách diễn đạt phổ biến khi cơ thể mệt mỏi, khó chịu, phát bệnh.",
        "tokenCount": 9
    },
    {
        "orderIndex": 20,
        "startTime": 76.16,
        "endTime": 80.96,
        "text": "Let me examine you. You have a mild fever.",
        "translationVi": "Để tôi khám cho cô nhé. Cô bị sốt nhẹ.",
        "ipaUs": "/let miː ɪɡˈzæmɪn juː juː hæv ə maɪld ˈfiːvər/",
        "properNouns": [],
        "keywords": [
            "examine",
            "mild fever"
        ],
        "explanationAi": "'Examine' là thăm khám lâm sàng; 'mild fever' là sốt nhẹ (dưới 38.5°C).",
        "tokenCount": 9
    },
    {
        "orderIndex": 21,
        "startTime": 81.12,
        "endTime": 85.64,
        "text": "I feel terrible.",
        "translationVi": "Tôi cảm thấy người rất mệt mỏi, khó chịu.",
        "ipaUs": "/aɪ fiːl ˈterəbl/",
        "properNouns": [],
        "keywords": [
            "feel terrible"
        ],
        "explanationAi": "'Feel terrible' diễn tả cảm giác vô cùng mệt mỏi, suy sụp do sốt.",
        "tokenCount": 3
    },
    {
        "orderIndex": 22,
        "startTime": 86.08,
        "endTime": 90.24,
        "text": "Let me check your blood pressure level. Roll up your sleeve.",
        "translationVi": "Để tôi kiểm tra huyết áp cho cô. Cô hãy kéo tay áo lên nhé.",
        "ipaUs": "/let miː tʃek jʊər blʌd ˈpreʃər ˈlevl roʊl ʌp jʊər sliːv/",
        "properNouns": [],
        "keywords": [
            "blood pressure level",
            "roll up your sleeve"
        ],
        "explanationAi": "'Blood pressure' là huyết áp; 'roll up your sleeve' là vén/kéo tay áo lên để đo huyết áp bắp tay.",
        "tokenCount": 11
    },
    {
        "orderIndex": 23,
        "startTime": 92.56,
        "endTime": 101.12,
        "text": "Your blood pressure level is fine: 120 over 80. No need to worry, I am prescribing you some medicines.",
        "translationVi": "Chỉ số huyết áp của cô hoàn toàn bình thường: 120 trên 80. Không cần lo lắng đâu, tôi sẽ kê cho cô một số loại thuốc.",
        "ipaUs": "/jʊər blʌd ˈpreʃər ˈlevl ɪz faɪn wʌn ˈtwenti ˈoʊvər ˈeɪti noʊ niːd tuː ˈwɜːri aɪ æm prɪˈskraɪbɪŋ juː sʌm ˈmedɪsnz/",
        "properNouns": [],
        "keywords": [
            "120 over 80",
            "no need to worry",
            "prescribing medicines"
        ],
        "explanationAi": "Cách đọc huyết áp trong tiếng Anh: '120 over 80' (tâm thu 120, tâm trương 80 mmHg); 'prescribe' là kê đơn thuốc.",
        "tokenCount": 19
    },
    {
        "orderIndex": 24,
        "startTime": 101.68,
        "endTime": 105.87,
        "text": "Here is the prescription. Take two tablets thrice a day.",
        "translationVi": "Đây là đơn thuốc. Hãy uống hai viên, mỗi ngày ba lần.",
        "ipaUs": "/hɪr ɪz ðə prɪˈskrɪpʃn teɪk tuː ˈtæbləts θraɪs ə deɪ/",
        "properNouns": [],
        "keywords": [
            "prescription",
            "two tablets",
            "thrice a day"
        ],
        "explanationAi": "'Prescription' là đơn thuốc; 'tablets' là viên nén; 'thrice a day' là ba lần một ngày (tương đương three times a day).",
        "tokenCount": 10
    },
    {
        "orderIndex": 25,
        "startTime": 105.92,
        "endTime": 107.92,
        "text": "With meal or without meal?",
        "translationVi": "Uống trong bữa ăn hay không cùng bữa ăn ạ?",
        "ipaUs": "/wɪð miːl ɔːr wɪˈðaʊt miːl/",
        "properNouns": [],
        "keywords": [
            "with meal",
            "without meal"
        ],
        "explanationAi": "Câu hỏi quan trọng về thời điểm dùng thuốc: uống kèm bữa ăn (no) hay xa bữa ăn (đói).",
        "tokenCount": 5
    },
    {
        "orderIndex": 26,
        "startTime": 108.0,
        "endTime": 113.92,
        "text": "After having meal, you can take your medicine, and have some rest after taking the medicine.",
        "translationVi": "Sau khi ăn xong, cô có thể uống thuốc, và hãy nghỉ ngơi một chút sau khi uống thuốc nhé.",
        "ipaUs": "/ˈæftər ˈhævɪŋ miːl juː kæn teɪk jʊər ˈmedɪsn ænd hæv sʌm rest ˈæftər ˈteɪkɪŋ ðə ˈmedɪsn/",
        "properNouns": [],
        "keywords": [
            "after having meal",
            "take your medicine",
            "have some rest"
        ],
        "explanationAi": "Chỉ dẫn uống thuốc sau ăn để tránh kích ứng dạ dày và nghỉ ngơi hồi phục thể lực.",
        "tokenCount": 16
    },
    {
        "orderIndex": 27,
        "startTime": 114.32,
        "endTime": 115.36,
        "text": "Thank you.",
        "translationVi": "Cảm ơn bác sĩ.",
        "ipaUs": "/θæŋk juː/",
        "properNouns": [],
        "keywords": [
            "thank you"
        ],
        "explanationAi": "Lời cảm ơn bác sĩ sau buổi khám.",
        "tokenCount": 2
    },
    {
        "orderIndex": 28,
        "startTime": 115.44,
        "endTime": 116.72,
        "text": "Get well soon.",
        "translationVi": "Chúc cô mau chóng bình phục nhé.",
        "ipaUs": "/ɡet wel suːn/",
        "properNouns": [],
        "keywords": [
            "get well soon"
        ],
        "explanationAi": "'Get well soon' là lời chúc sớm hồi phục sức khỏe kinh điển và ấm áp trong giao tiếp y tế.",
        "tokenCount": 3
    },
    {
        "orderIndex": 29,
        "startTime": 122.72,
        "endTime": 123.52,
        "text": "Hello.",
        "translationVi": "Xin chào.",
        "ipaUs": "/həˈloʊ/",
        "properNouns": [],
        "keywords": [
            "hello"
        ],
        "explanationAi": "Lời chào của dược sĩ tại quầy phát thuốc nhà thuốc.",
        "tokenCount": 1
    },
    {
        "orderIndex": 30,
        "startTime": 123.84,
        "endTime": 124.64,
        "text": "Hello.",
        "translationVi": "Chào bạn.",
        "ipaUs": "/həˈloʊ/",
        "properNouns": [],
        "keywords": [
            "hello"
        ],
        "explanationAi": "Lời chào đáp lễ của bệnh nhân khi tới lấy thuốc.",
        "tokenCount": 1
    },
    {
        "orderIndex": 31,
        "startTime": 124.8,
        "endTime": 126.48,
        "text": "What can I do for you?",
        "translationVi": "Tôi có thể hỗ trợ gì cho bạn?",
        "ipaUs": "/wʌt kæn aɪ duː fɔːr juː/",
        "properNouns": [],
        "keywords": [
            "what can I do for you"
        ],
        "explanationAi": "Câu hỏi dịch vụ chăm sóc khách hàng tại nhà thuốc.",
        "tokenCount": 6
    },
    {
        "orderIndex": 32,
        "startTime": 127.04,
        "endTime": 129.84,
        "text": "Give me these medicines according to this prescription.",
        "translationVi": "Lấy cho tôi những loại thuốc này theo đơn thuốc này với ạ.",
        "ipaUs": "/ɡɪv miː ðiːz ˈmedɪsnz əˈkɔːrdɪŋ tuː ðɪs prɪˈskrɪpʃn/",
        "properNouns": [],
        "keywords": [
            "medicines",
            "according to",
            "prescription"
        ],
        "explanationAi": "'According to this prescription' là theo đơn thuốc này (mua thuốc kê đơn).",
        "tokenCount": 8
    },
    {
        "orderIndex": 33,
        "startTime": 130.24,
        "endTime": 133.04,
        "text": "Okay, ma'am, I will be right back.",
        "translationVi": "Vâng thưa cô, tôi sẽ lấy thuốc và quay lại ngay.",
        "ipaUs": "/oʊˈkeɪ mæm aɪ wɪl biː raɪt bæk/",
        "properNouns": [],
        "keywords": [
            "ma'am",
            "right back"
        ],
        "explanationAi": "'I will be right back' nghĩa là tôi sẽ quay lại ngay trong giây lát.",
        "tokenCount": 8
    },
    {
        "orderIndex": 34,
        "startTime": 135.92,
        "endTime": 137.12,
        "text": "Here you go.",
        "translationVi": "Thuốc của cô đây ạ.",
        "ipaUs": "/hɪr juː ɡoʊ/",
        "properNouns": [],
        "keywords": [
            "here you go"
        ],
        "explanationAi": "Thành ngữ trao đồ vật tận tay cho người đối diện: 'Here you go' (Của bạn đây).",
        "tokenCount": 3
    },
    {
        "orderIndex": 35,
        "startTime": 137.44,
        "endTime": 140.4,
        "text": "Thanks. How much is this medicine?",
        "translationVi": "Cảm ơn bạn. Số thuốc này giá bao nhiêu tiền vậy?",
        "ipaUs": "/θæŋks haʊ mʌtʃ ɪz ðɪs ˈmedɪsn/",
        "properNouns": [],
        "keywords": [
            "how much",
            "medicine"
        ],
        "explanationAi": "Câu hỏi giá tiền: 'How much is this medicine?' (Thuốc này bao nhiêu tiền?).",
        "tokenCount": 6
    },
    {
        "orderIndex": 36,
        "startTime": 140.64,
        "endTime": 142.44,
        "text": "It costs 8.67.",
        "translationVi": "Tổng cộng hết 8 đô la 67 cent ạ.",
        "ipaUs": "/ɪt kɔːsts eɪt ˈsɪksti ˈsevən/",
        "properNouns": [],
        "keywords": [
            "costs",
            "8.67"
        ],
        "explanationAi": "Báo giá tiền: '8.67' (eight dollars and sixty-seven cents).",
        "tokenCount": 4
    },
    {
        "orderIndex": 37,
        "startTime": 143.84,
        "endTime": 145.04,
        "text": "Here you go.",
        "translationVi": "Tiền của bạn đây.",
        "ipaUs": "/hɪr juː ɡoʊ/",
        "properNouns": [],
        "keywords": [
            "here you go"
        ],
        "explanationAi": "Người mua đưa tiền thanh toán cho nhân viên bán thuốc.",
        "tokenCount": 3
    },
    {
        "orderIndex": 38,
        "startTime": 146.96,
        "endTime": 148.48,
        "text": "Here is your change.",
        "translationVi": "Đây là tiền thối lại của cô ạ.",
        "ipaUs": "/hɪr ɪz jʊər tʃeɪndʒ/",
        "properNouns": [],
        "keywords": [
            "change",
            "here is your change"
        ],
        "explanationAi": "'Change' là tiền thừa thối lại sau khi thanh toán.",
        "tokenCount": 4
    }
],
};
