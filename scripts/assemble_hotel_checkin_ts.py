import json

with open('scripts/hotel_37_master.json', 'r', encoding='utf-8') as f:
    segments = json.load(f)

quiz_questions = [
    {
        "id": "q_hotel_checkin_1",
        "question": "What is Tom Sanders' primary purpose when arriving at the hotel front desk?",
        "questionEn": "What is Tom Sanders' primary purpose when arriving at the hotel front desk?",
        "questionVi": "Mục đích chính của Tom Sanders khi đến quầy lễ tân khách sạn là gì?",
        "options": [
            "To check in for a three-night single room reservation",
            "To apply for an open front-desk manager position",
            "To complain about an airline flight cancellation",
            "To reserve a large conference banquet hall"
        ],
        "optionsEn": [
            "To check in for a three-night single room reservation",
            "To apply for an open front-desk manager position",
            "To complain about an airline flight cancellation",
            "To reserve a large conference banquet hall"
        ],
        "optionsVi": [
            "Làm thủ tục nhận phòng (check-in) theo đặt trước phòng đơn trong 3 đêm",
            "Ứng tuyển vào vị trí quản lý quầy lễ tân đang tuyển dụng",
            "Khiếu nại về việc một chuyến bay bị hủy đột ngột",
            "Đặt trước một phòng đại tiệc hội nghị lớn"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 1, Tom Sanders introduces himself and states his goal: 'Good morning. My name is Tom Sanders. I have a reservation for a single room for three nights.'",
        "explanationEn": "In Segment 1, Tom Sanders introduces himself and states his goal: 'Good morning. My name is Tom Sanders. I have a reservation for a single room for three nights.'",
        "explanationVi": "Trong câu 1, Tom Sanders tự giới thiệu và nêu rõ mục đích: 'Chào buổi sáng. Tên tôi là Tom Sanders. Tôi có đặt trước một phòng đơn trong ba đêm.'",
        "referenceSegmentIndex": 1,
        "targetedConcept": "Thủ tục nhận phòng tại lễ tân (Front Desk Reservation Check-in)",
        "targetedConceptEn": "Front Desk Reservation Check-in",
        "targetedConceptVi": "Thủ tục nhận phòng tại lễ tân"
    },
    {
        "id": "q_hotel_checkin_2",
        "question": "What unexpected issue arises when the receptionist searches the database for Tom's reservation?",
        "questionEn": "What unexpected issue arises when the receptionist searches the database for Tom's reservation?",
        "questionVi": "Vấn đề bất ngờ nào nảy sinh khi nhân viên lễ tân tìm kiếm thông tin đặt phòng của Tom trong cơ sở dữ liệu?",
        "options": [
            "The system cannot find any record of his booking due to a software glitch",
            "Tom's bank card was declined by international processing networks",
            "His single room was accidentally converted into a staff cafeteria",
            "The hotel had completely closed all guest operations for renovations"
        ],
        "optionsEn": [
            "The system cannot find any record of his booking due to a software glitch",
            "Tom's bank card was declined by international processing networks",
            "His single room was accidentally converted into a staff cafeteria",
            "The hotel had completely closed all guest operations for renovations"
        ],
        "optionsVi": [
            "Hệ thống không tìm thấy bất kỳ dữ liệu đặt phòng nào do lỗi trục trặc phần mềm (glitch)",
            "Thẻ ngân hàng của Tom bị từ chối bởi mạng lưới thanh toán quốc tế",
            "Phòng đơn của anh vô tình bị chuyển đổi thành căng tin cho nhân viên",
            "Khách sạn đã tạm ngừng toàn bộ hoạt động đón khách để sửa chữa"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 3 & 6, the receptionist explains: 'I can\\'t seem to find a record of your booking... Maybe there was a glitch with the booking system.'",
        "explanationEn": "In Segments 3 & 6, the receptionist explains: 'I can\\'t seem to find a record of your booking... Maybe there was a glitch with the booking system.'",
        "explanationVi": "Trong câu 3 & 6, nhân viên lễ tân giải thích: 'Tôi dường như không tìm thấy dữ liệu đặt phòng của ông... Có lẽ đã xảy ra một sự cố kỹ thuật trong hệ thống đặt phòng.'",
        "referenceSegmentIndex": 3,
        "targetedConcept": "Lỗi hệ thống & Dữ liệu đặt phòng thất lạc (System Glitch & Missing Reservation Record)",
        "targetedConceptEn": "System Glitch & Missing Reservation Record",
        "targetedConceptVi": "Lỗi hệ thống & Dữ liệu đặt phòng thất lạc"
    },
    {
        "id": "q_hotel_checkin_3",
        "question": "How does Tom verify that his reservation was indeed confirmed and legitimate?",
        "questionEn": "How does Tom verify that his reservation was indeed confirmed and legitimate?",
        "questionVi": "Tom đã chứng minh như thế nào rằng việc đặt phòng của mình thực sự đã được xác nhận và hợp lệ?",
        "options": [
            "He confirms booking directly, having paid a first-night deposit, and provides a reservation number",
            "He calls his personal attorney to speak with the hotel general manager",
            "He presents a printed airline ticket stub with boarding pass details",
            "He shows a tourist guidebook recommending the Transnational Hotel"
        ],
        "optionsEn": [
            "He confirms booking directly, having paid a first-night deposit, and provides a reservation number",
            "He calls his personal attorney to speak with the hotel general manager",
            "He presents a printed airline ticket stub with boarding pass details",
            "He shows a tourist guidebook recommending the Transnational Hotel"
        ],
        "optionsVi": [
            "Anh xác nhận đã đặt trực tiếp, đã trả cọc đêm đầu tiên và cung cấp mã số đặt phòng",
            "Anh gọi điện cho luật sư riêng để nói chuyện với tổng quản lý khách sạn",
            "Anh xuất trình cuống vé máy bay in sẵn kèm thông tin thẻ lên tàu bay",
            "Anh chỉ vào cuốn sách hướng dẫn du lịch có giới thiệu khách sạn Transnational"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 4, Tom clarifies: 'Well, I booked it directly through you. I\\'ve already also paid a deposit on the first night. I have a reservation number if that helps.'",
        "explanationEn": "In Segment 4, Tom clarifies: 'Well, I booked it directly through you. I\\'ve already also paid a deposit on the first night. I have a reservation number if that helps.'",
        "explanationVi": "Trong câu 4, Tom làm rõ: 'Tôi đã đặt trực tiếp qua khách sạn các bạn. Tôi cũng đã thanh toán tiền đặt cọc cho đêm đầu tiên. Tôi có mã số đặt phòng nếu điều đó giúp được.'",
        "referenceSegmentIndex": 4,
        "targetedConcept": "Xác thực đặt cọc & Mã đặt phòng (Booking Verification & Deposit Reference)",
        "targetedConceptEn": "Booking Verification & Deposit Reference",
        "targetedConceptVi": "Xác thực đặt cọc & Mã đặt phòng"
    },
    {
        "id": "q_hotel_checkin_4",
        "question": "Why does the front desk receptionist decide against giving Tom the only remaining single room?",
        "questionEn": "Why does the front desk receptionist decide against giving Tom the only remaining single room?",
        "questionVi": "Tại sao nhân viên lễ tân lại quyết định không xếp Tom vào căn phòng đơn duy nhất còn lại?",
        "options": [
            "It is an adjoined room right next to a family with children, which might get noisy",
            "The room has no windows and is situated right next to the boiler room",
            "The door lock is completely jammed and the maintenance team is off-duty",
            "The room is strictly reserved for the airline flight crew arriving tomorrow"
        ],
        "optionsEn": [
            "It is an adjoined room right next to a family with children, which might get noisy",
            "The room has no windows and is situated right next to the boiler room",
            "The door lock is completely jammed and the maintenance team is off-duty",
            "The room is strictly reserved for the airline flight crew arriving tomorrow"
        ],
        "optionsVi": [
            "Đó là phòng thông cửa nằm ngay sát cạnh một gia đình có trẻ nhỏ, có thể sẽ rất ồn ào",
            "Căn phòng đó không có cửa sổ và nằm ngay cạnh buồng lò hơi của khách sạn",
            "Ổ khóa cửa bị kẹt hoàn toàn và đội bảo trì đã hết ca trực",
            "Căn phòng được giữ riêng cho phi hành đoàn hàng không đến vào ngày mai"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 7, the receptionist notes: '...with the exception of one adjoined room, but you would then be right next door to a family with children, which might get noisy.'",
        "explanationEn": "In Segment 7, the receptionist notes: '...with the exception of one adjoined room, but you would then be right next door to a family with children, which might get noisy.'",
        "explanationVi": "Trong câu 7, nhân viên lễ tân lưu ý: '...ngoại trừ một phòng thông cửa, nhưng khi đó ông sẽ ở sát cạnh một gia đình có trẻ nhỏ, có thể sẽ khá ồn ào.'",
        "referenceSegmentIndex": 7,
        "targetedConcept": "Cân nhắc tiếng ồn phòng thông nhau (Adjoined Room Noise Consideration)",
        "targetedConceptEn": "Adjoined Room Noise Consideration",
        "targetedConceptVi": "Cân nhắc tiếng ồn phòng thông nhau"
    },
    {
        "id": "q_hotel_checkin_5",
        "question": "What premium upgrade does the receptionist provide to compensate Tom for the booking issue?",
        "questionEn": "What premium upgrade does the receptionist provide to compensate Tom for the booking issue?",
        "questionVi": "Gói nâng hạng cao cấp nào được nhân viên lễ tân cung cấp để bù đắp sự cố cho Tom?",
        "options": [
            "A business suite equipped with a jacuzzi at no extra charge",
            "A standard economy twin room with a complimentary bottle of mineral water",
            "A rooftop tent with complimentary access to the public fire observatory",
            "A 20% discount voucher valid solely for hotel souvenir gift shops"
        ],
        "optionsEn": [
            "A business suite equipped with a jacuzzi at no extra charge",
            "A standard economy twin room with a complimentary bottle of mineral water",
            "A rooftop tent with complimentary access to the public fire observatory",
            "A 20% discount voucher valid solely for hotel souvenir gift shops"
        ],
        "optionsVi": [
            "Một phòng suite thương gia có bồn sục jacuzzi mà không tính thêm bất kỳ phụ phí nào",
            "Một phòng đôi tiêu chuẩn tiết kiệm kèm theo một chai nước khoáng miễn phí",
            "Một căn lều trên sân thượng kèm quyền vào đài quan sát hỏa hoạn công cộng",
            "Phiếu giảm giá 20% chỉ có giá trị tại cửa hàng bán đồ lưu niệm khách sạn"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 8 & 10, the receptionist offers: 'I can upgrade you to one of our business suites. They all come with jacuzzi\\'s... That would of course be at no extra charge to you.'",
        "explanationEn": "In Segments 8 & 10, the receptionist offers: 'I can upgrade you to one of our business suites. They all come with jacuzzi\\'s... That would of course be at no extra charge to you.'",
        "explanationVi": "Trong câu 8 & 10, lễ tân đề xuất: 'Tôi có thể nâng hạng phòng cho ông lên một trong các phòng suite thương gia có bồn tắm sục jacuzzi... Khoản nâng cấp đó đương nhiên hoàn toàn miễn phí cho ông.'",
        "referenceSegmentIndex": 8,
        "targetedConcept": "Nâng hạng phòng suite miễn phí (Complimentary Business Suite Upgrade)",
        "targetedConceptEn": "Complimentary Business Suite Upgrade",
        "targetedConceptVi": "Nâng hạng phòng suite miễn phí"
    },
    {
        "id": "q_hotel_checkin_6",
        "question": "What means of transportation did Tom take to reach the hotel from the airport?",
        "questionEn": "What means of transportation did Tom take to reach the hotel from the airport?",
        "questionVi": "Tom đã sử dụng phương tiện di chuyển nào để đi từ sân bay đến khách sạn?",
        "options": [
            "He took a taxi directly from the airport, so he does not require a parking pass",
            "He drove a rental sports car and requested valet parking service",
            "He rode a crowded public subway train with multiple line transfers",
            "He joined a private commercial tour bus that picked him up at the terminal"
        ],
        "optionsEn": [
            "He took a taxi directly from the airport, so he does not require a parking pass",
            "He drove a rental sports car and requested valet parking service",
            "He rode a crowded public subway train with multiple line transfers",
            "He joined a private commercial tour bus that picked him up at the terminal"
        ],
        "optionsVi": [
            "Anh bắt taxi đi thẳng từ sân bay, do đó anh không cần thẻ gửi xe đỗ xe",
            "Anh lái xe thể thao thuê và yêu cầu dịch vụ nhân viên đỗ xe (valet)",
            "Anh đi tàu điện ngầm công cộng đông đúc với nhiều lần chuyển tuyến",
            "Anh đi xe buýt du lịch tư nhân đón trực tiếp tại nhà ga sân bay"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 18, Tom responds to the valet inquiry: 'Oh, I don\\'t have a car. I took a taxi direct from the airport.'",
        "explanationEn": "In Segment 18, Tom responds to the valet inquiry: 'Oh, I don\\'t have a car. I took a taxi direct from the airport.'",
        "explanationVi": "Trong câu 18, Tom trả lời câu hỏi về dịch vụ gửi xe: 'Ồ, tôi không có xe ô tô. Tôi bắt taxi đi thẳng từ sân bay tới đây.'",
        "referenceSegmentIndex": 18,
        "targetedConcept": "Phương tiện di chuyển mặt đất từ sân bay (Airport Taxi Ground Transportation)",
        "targetedConceptEn": "Airport Taxi Ground Transportation",
        "targetedConceptVi": "Phương tiện di chuyển mặt đất từ sân bay"
    },
    {
        "id": "q_hotel_checkin_7",
        "question": "What is Tom's primary objective during his visit to the 'Big Apple' (New York City)?",
        "questionEn": "What is Tom's primary objective during his visit to the 'Big Apple' (New York City)?",
        "questionVi": "Mục tiêu chính của Tom trong chuyến đi tới 'Big Apple' (thành phố New York) là gì?",
        "options": [
            "Attending a professional business conference while also enjoying some sightseeing",
            "Auditioning for a Broadway musical theater performance in Manhattan",
            "Visiting childhood relatives whom he has not seen for over twenty years",
            "Purchasing industrial machinery equipment for a manufacturing plant"
        ],
        "optionsEn": [
            "Attending a professional business conference while also enjoying some sightseeing",
            "Auditioning for a Broadway musical theater performance in Manhattan",
            "Visiting childhood relatives whom he has not seen for over twenty years",
            "Purchasing industrial machinery equipment for a manufacturing plant"
        ],
        "optionsVi": [
            "Tham dự một hội nghị kinh doanh chuyên nghiệp kết hợp đi tham quan thành phố",
            "Tham gia thử vai cho một buổi biểu diễn nhạc kịch Broadway ở Manhattan",
            "Thăm họ hàng thời thơ ấu mà anh đã không gặp trong hơn hai mươi năm",
            "Mua sắm máy móc thiết bị công nghiệp cho một nhà máy sản xuất"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 26, Tom states: 'I have a business conference to attend, but I\\'m looking forward to getting some sightseeing done as well.'",
        "explanationEn": "In Segment 26, Tom states: 'I have a business conference to attend, but I\\'m looking forward to getting some sightseeing done as well.'",
        "explanationVi": "Trong câu 26, Tom chia sẻ: 'Tôi tới đây tham dự một hội nghị kinh doanh, nhưng tôi cũng rất mong muốn được đi tham quan thành phố nữa.'",
        "referenceSegmentIndex": 26,
        "targetedConcept": "Mục đích chuyến công tác & Tham quan (Business Conference & Sightseeing)",
        "targetedConceptEn": "Business Conference & Sightseeing",
        "targetedConceptVi": "Mục đích chuyến công tác & Tham quan"
    },
    {
        "id": "q_hotel_checkin_8",
        "question": "What exact navigation instructions does the receptionist provide to guide Tom to his room?",
        "questionEn": "What exact navigation instructions does the receptionist provide to guide Tom to his room?",
        "questionVi": "Nhân viên lễ tân đưa ra những chỉ dẫn đường đi chính xác nào để hướng dẫn Tom lên phòng của mình?",
        "options": [
            "Take the elevator on the right to the 6th floor, turn right, and find room 653 at the corridor end on the left",
            "Climb the emergency stairwell to the 2nd floor, turn left, and enter room 201 near the gym",
            "Take the glass express lift to the penthouse floor and walk through the open garden terrace",
            "Walk down to the basement level and ask the housekeeping supervisor for room directions"
        ],
        "optionsEn": [
            "Take the elevator on the right to the 6th floor, turn right, and find room 653 at the corridor end on the left",
            "Climb the emergency stairwell to the 2nd floor, turn left, and enter room 201 near the gym",
            "Take the glass express lift to the penthouse floor and walk through the open garden terrace",
            "Walk down to the basement level and ask the housekeeping supervisor for room directions"
        ],
        "optionsVi": [
            "Đi thang máy bên phải lên tầng 6, rẽ phải, và phòng 653 nằm ở cuối hành lang phía tay trái",
            "Leo cầu thang thoát hiểm lên tầng 2, rẽ trái, và vào phòng 201 nằm cạnh phòng tập gym",
            "Đi thang máy kính tốc hành lên tầng penthouse và đi bộ qua sân thượng ngoài trời",
            "Đi xuống tầng hầm và hỏi giám sát viên buồng phòng để được hướng dẫn đến phòng"
        ],
        "correctAnswer": 0,
        "explanation": "In Segments 29-32, the receptionist instructs: 'You\\'re in room 653. Just take the elevator on the right up to the sixth floor. When you get off the elevator, turn right. Your room is at the end of the corridor on the left hand side. Just leave your suitcase here and the bell boy will bring it up.'",
        "explanationEn": "In Segments 29-32, the receptionist instructs: 'You\\'re in room 653. Just take the elevator on the right up to the sixth floor. When you get off the elevator, turn right. Your room is at the end of the corridor on the left hand side. Just leave your suitcase here and the bell boy will bring it up.'",
        "explanationVi": "Trong câu 29-32, lễ tân hướng dẫn tỉ mỉ: 'Ông ở phòng 653 nhé. Ông chỉ cần đi thang máy phía bên phải lên tầng 6. Khi bước ra khỏi thang máy, ông rẽ phải. Phòng của ông nằm ở cuối hành lang phía bên tay trái. Ông cứ để vali hành lý ở đây, nhân viên phục vụ hành lý sẽ mang lên phòng cho ông ngay.'",
        "referenceSegmentIndex": 29,
        "targetedConcept": "Chỉ dẫn đường lên phòng khách sạn (Room Directions & Bellboy Luggage Delivery)",
        "targetedConceptEn": "Room Directions & Bellboy Luggage Delivery",
        "targetedConceptVi": "Chỉ dẫn đường lên phòng khách sạn"
    }
]

code_lines = [
    'import { MockVideoLesson, VideoQuizData } from "../types";',
    '',
    '/**',
    ' * Bilingual Contextual Reading Comprehension Quiz for English for Travel: Hotel Check-in',
    ' * 8 High-Yield CEFR A2/B1 Questions aligned with authentic LinguaTV hospitality dialogue',
    ' */',
    'export const QUIZ_HOTEL_CHECKIN: VideoQuizData = {',
    '  lessonId: "vid_travel_hotel_checkin",',
    '  lessonTitle: "English for Travel: Hotel Check-in & Guest Services",',
    '  totalQuestions: 8,',
    '  xpReward: 40,',
    '  questions: ' + json.dumps(quiz_questions, ensure_ascii=False, indent=4) + ',',
    '  generatedBy: "CONTEXTUAL_FALLBACK",',
    '};',
    '',
    '/**',
    ' * English for Travel: Hotel Check-in & Guest Services',
    ' * Slug: english-travel-hotel-checkin-guest-services',
    ' * YouTube ID: wyqfYJX23lg (LinguaTV English for Hotel and Tourism)',
    ' * Category: cat_daily_conv (Giao Tiếp Đời Thực)',
    ' * Standard Professional Hospitality English Dialogue (37 Pure Master Segments)',
    ' */',
    'export const LESSON_HOTEL_CHECKIN: MockVideoLesson = {',
    '  id: "vid_travel_hotel_checkin",',
    '  slug: "english-travel-hotel-checkin-guest-services",',
    '  title: "English for Travel: Hotel Check-in & Guest Services",',
    '  description: "Bộ hội thoại tiếng Anh du lịch và khách sạn chuẩn quốc tế tại Transnational Hotel: quy trình nhận phòng (check-in), xử lý sự cố hệ thống tìm phòng, nâng hạng phòng miễn phí lên suite bồn tắm sục jacuzzi, hướng dẫn mật khẩu Wi-Fi, tiện ích hồ bơi/phòng gym, phương tiện di chuyển từ sân bay, trò chuyện xã giao (small talk) về San Francisco & New York (Big Apple), và chỉ dẫn đường lên phòng 653.",',
    '  sourceType: "YOUTUBE",',
    '  externalId: "wyqfYJX23lg",',
    '  thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",',
    '  durationSeconds: 158,',
    '  durationFormatted: "02:38",',
    '  cefrLevel: "A2",',
    '  supportedTypes: "BOTH",',
    '  categoryId: "cat_daily_conv",',
    '  categorySlug: "daily-conversations",',
    '  categoryName: "Giao Tiếp Đời Thực",',
    '  accent: "en-US",',
    '  wpmSpeed: 145,',
    '  viewCount: 215000,',
    '  studyCount: 78200,',
    '  quiz: QUIZ_HOTEL_CHECKIN,',
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

with open('features/listening/data/lessons/lesson_hotel_checkin.ts', 'w', encoding='utf-8') as f:
    f.write(full_ts_code)

print("features/listening/data/lessons/lesson_hotel_checkin.ts written successfully!")
