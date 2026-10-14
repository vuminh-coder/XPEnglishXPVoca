import json

with open('scripts/doctor_consult_38_master.json', 'r', encoding='utf-8') as f:
    segments = json.load(f)

quiz_questions = [
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
        "explanation": "In Segments 3 & 11, Kate states her goal and symptoms: 'I would like to see Dr. David... I think I have a fever.'",
        "explanationEn": "In Segments 3 & 11, Kate states her goal and symptoms: 'I would like to see Dr. David... I think I have a fever.'",
        "explanationVi": "Trong câu 3 & 11, Kate nêu rõ mục đích và triệu chứng: 'Tôi muốn gặp bác sĩ David... Tôi nghĩ là mình đang bị sốt.'",
        "referenceSegmentIndex": 3,
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
        "explanation": "In Segments 4-6, the receptionist explains: 'Do you have an appointment? No, I don\\'t. Dr. David is busy with a patient. If you want to see Dr. David, then you need to make an appointment.'",
        "explanationEn": "In Segments 4-6, the receptionist explains: 'Do you have an appointment? No, I don\\'t. Dr. David is busy with a patient. If you want to see Dr. David, then you need to make an appointment.'",
        "explanationVi": "Trong câu 4-6, tiếp tân giải thích: 'Bạn đã có lịch hẹn trước chưa? - Chưa. - Bác sĩ David đang bận với bệnh nhân. Nếu bạn muốn gặp bác sĩ, bạn cần phải đặt lịch hẹn.'",
        "referenceSegmentIndex": 6,
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
        "explanation": "In Segments 9 & 12, Kate confirms: 'My name is Kate, I am 23' and the receptionist responds: 'Here is your token number. Please wait in the waiting hall.' Later she is called as Token number 23.",
        "explanationEn": "In Segments 9 & 12, Kate confirms: 'My name is Kate, I am 23' and the receptionist responds: 'Here is your token number. Please wait in the waiting hall.' Later she is called as Token number 23.",
        "explanationVi": "Trong câu 9 & 12, Kate xác nhận tên Kate 23 tuổi và nhận số thứ tự 23 để ngồi đợi ở sảnh chờ.",
        "referenceSegmentIndex": 12,
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
        "explanation": "In Segment 19, Dr. David examines her and reports: 'Let me examine you. You have a mild fever.'",
        "explanationEn": "In Segment 19, Dr. David examines her and reports: 'Let me examine you. You have a mild fever.'",
        "explanationVi": "Trong câu 19, bác sĩ David khám và thông báo: 'Để tôi khám cho cô nhé. Cô bị sốt nhẹ.'",
        "referenceSegmentIndex": 19,
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
        "explanation": "In Segment 22, Dr. David verifies: 'Your blood pressure level is fine: 120 over 80. No need to worry...'",
        "explanationEn": "In Segment 22, Dr. David verifies: 'Your blood pressure level is fine: 120 over 80. No need to worry...'",
        "explanationVi": "Trong câu 22, bác sĩ xác nhận: 'Chỉ số huyết áp của cô hoàn toàn bình thường: 120 trên 80. Không cần lo lắng đâu...'",
        "referenceSegmentIndex": 22,
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
        "explanation": "In Segments 23 & 25, Dr. David directs: 'Take two tablets thrice a day... After having meal, you can take your medicine, and have some rest after taking the medicine.'",
        "explanationEn": "In Segments 23 & 25, Dr. David directs: 'Take two tablets thrice a day... After having meal, you can take your medicine, and have some rest after taking the medicine.'",
        "explanationVi": "Trong câu 23 & 25, bác sĩ dặn: 'Hãy uống hai viên, mỗi ngày ba lần... Sau khi ăn xong, cô có thể uống thuốc và nghỉ ngơi một chút.'",
        "referenceSegmentIndex": 23,
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
        "explanation": "In Segment 31, Kate visits the pharmacy and says: 'Give me these medicines according to this prescription.'",
        "explanationEn": "In Segment 31, Kate visits the pharmacy and says: 'Give me these medicines according to this prescription.'",
        "explanationVi": "Trong câu 31, Kate đến quầy dược và yêu cầu: 'Lấy cho tôi những loại thuốc này theo đơn thuốc này với ạ.'",
        "referenceSegmentIndex": 31,
        "targetedConcept": "Lấy thuốc theo đơn tại nhà thuốc (Filling Prescription at Pharmacy)",
        "targetedConceptEn": "Filling Prescription at Pharmacy",
        "targetedConceptVi": "Lấy thuốc theo đơn tại nhà thuốc"
    },
    {
        "id": "q_medical_consult_8",
        "question": "How much does the prescribed medication cost, and how does the pharmacy transaction conclude?",
        "questionEn": "How much does the prescribed medication cost, and how does the pharmacy transaction conclude?",
        "questionVi": "Thuốc theo đơn có giá bao nhiêu tiền và giao dịch tại nhà thuốc kết thúc như thế nào?",
        "options": [
            "It costs $8.67, Kate pays the amount, and the pharmacist hands her the change",
            "It costs $120.50, and the pharmacist declines her debit card",
            "It is completely free under a special promotional festival gift coupon",
            "It costs $500.00 and requires an installment financing agreement"
        ],
        "optionsEn": [
            "It costs $8.67, Kate pays the amount, and the pharmacist hands her the change",
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
        "explanation": "In Segments 35 & 37, the pharmacist states: 'It costs 8.67.' Kate pays ('Here you go') and the pharmacist replies: 'Here is your change.'",
        "explanationEn": "In Segments 35 & 37, the pharmacist states: 'It costs 8.67.' Kate pays ('Here you go') and the pharmacist replies: 'Here is your change.'",
        "explanationVi": "Trong câu 35 & 37, dược sĩ báo giá 8.67 đô la, Kate trả tiền và dược sĩ thối lại tiền thừa kết thúc giao dịch thuận lợi.",
        "referenceSegmentIndex": 35,
        "targetedConcept": "Thanh toán tiền thuốc & Nhận tiền thối (Pharmacy Payment & Receipt of Change)",
        "targetedConceptEn": "Pharmacy Payment & Receipt of Change",
        "targetedConceptVi": "Thanh toán tiền thuốc & Nhận tiền thối"
    }
]

code_lines = [
    'import { MockVideoLesson, VideoQuizData } from "../types";',
    '',
    '/**',
    ' * Bilingual Contextual Reading Comprehension Quiz for Medical English: Doctor Consultation',
    ' * 8 High-Yield CEFR A2/B1 Questions aligned with authentic Sunshine English clinical dialogue',
    ' */',
    'export const QUIZ_MEDICAL_CONSULTATION: VideoQuizData = {',
    '  lessonId: "vid_medical_consultation",',
    '  lessonTitle: "Medical English: Doctor Consultation & Pharmacy Prescription",',
    '  totalQuestions: 8,',
    '  xpReward: 40,',
    '  questions: ' + json.dumps(quiz_questions, ensure_ascii=False, indent=4) + ',',
    '  generatedBy: "CONTEXTUAL_FALLBACK",',
    '};',
    '',
    '/**',
    ' * Medical English: Doctor Consultation & Pharmacy Prescription',
    ' * Slug: medical-english-doctor-consultation-pharmacy-prescription',
    ' * YouTube ID: 44SL8i8h0dg (Sunshine English - At the doctor English conversation)',
    ' * Category: cat_daily_conv (Giao Tiếp Đời Thực)',
    ' * Standard Healthcare & Pharmacy Dialogue (38 Pure Master Segments)',
    ' */',
    'export const LESSON_MEDICAL_CONSULTATION: MockVideoLesson = {',
    '  id: "vid_medical_consultation",',
    '  slug: "medical-english-doctor-consultation-pharmacy-prescription",',
    '  title: "Medical English: Doctor Consultation & Pharmacy Prescription",',
    '  description: "Hội thoại tiếng Anh y tế và giao tiếp khám bệnh thực tế tại phòng khám: quy trình đặt lịch hẹn tại quầy tiếp tân, lấy số thứ tự 23, thăm khám trực tiếp cùng Bác sĩ David, kiểm tra sốt nhẹ và đo huyết áp chuẩn 120/80, hướng dẫn liều dùng thuốc 2 viên x 3 lần/ngày sau bữa ăn, và quy trình mua thuốc tại nhà thuốc theo đơn với giá $8.67.",',
    '  sourceType: "YOUTUBE",',
    '  externalId: "44SL8i8h0dg",',
    '  thumbnailUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&auto=format&fit=crop&q=80",',
    '  durationSeconds: 150,',
    '  durationFormatted: "02:30",',
    '  cefrLevel: "A2",',
    '  supportedTypes: "BOTH",',
    '  categoryId: "cat_daily_conv",',
    '  categorySlug: "daily-conversations",',
    '  categoryName: "Giao Tiếp Đời Thực",',
    '  accent: "en-US",',
    '  wpmSpeed: 135,',
    '  viewCount: 215000,',
    '  studyCount: 68900,',
    '  quiz: QUIZ_MEDICAL_CONSULTATION,',
    '  segments: ['
]

for s in segments:
    code_lines.append('    {')
    code_lines.append(f'      orderIndex: {s["orderIndex"]},')
    code_lines.append(f'      startTime: {s["startTime"]},')
    code_lines.append(f'      endTime: {s["endTime"]},')
    code_lines.append(f'      text: {json.dumps(s["text"], ensure_ascii=False)},')
    code_lines.append(f'      translationVi: {json.dumps(s["translationVi"], ensure_ascii=False)},')
    code_lines.append(f'      ipaUs: {json.dumps(s["ipaUs"], ensure_ascii=False)},')
    code_lines.append(f'      properNouns: {json.dumps(s["properNouns"], ensure_ascii=False)},')
    code_lines.append(f'      keywords: {json.dumps(s["keywords"], ensure_ascii=False)},')
    code_lines.append(f'      explanationAi: {json.dumps(s["explanationAi"], ensure_ascii=False)},')
    code_lines.append(f'      tokenCount: {s["tokenCount"]},')
    code_lines.append('    },')

code_lines.append('  ],')
code_lines.append('};')
code_lines.append('')

full_ts_code = '\n'.join(code_lines)

with open('features/listening/data/lessons/lesson_medical_consultation.ts', 'w', encoding='utf-8') as f:
    f.write(full_ts_code)

print("features/listening/data/lessons/lesson_medical_consultation.ts written successfully!")
