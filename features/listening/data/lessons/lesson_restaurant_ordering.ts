import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for English for Dining: Ordering Food at a Restaurant
 */
export const QUIZ_RESTAURANT_ORDERING: VideoQuizData = {
  lessonId: "vid_travel_restaurant_ordering",
  lessonTitle: "English for Dining: Ordering Food at a Restaurant",
  totalQuestions: 8,
  xpReward: 40,
  questions: [
    {
        "id": "q_restaurant_ordering_1",
        "question": "How many people does the father request a dining table for when entering the restaurant?",
        "questionEn": "How many people does the father request a dining table for when entering the restaurant?",
        "questionVi": "Người cha yêu cầu một bàn ăn cho bao nhiêu người khi bước vào nhà hàng?",
        "options": [
            "A table for four guests",
            "A table for only one person",
            "A private VIP banquet room for twenty people",
            "A high table for two at the outdoor bar"
        ],
        "optionsEn": [
            "A table for four guests",
            "A table for only one person",
            "A private VIP banquet room for twenty people",
            "A high table for two at the outdoor bar"
        ],
        "optionsVi": [
            "Một bàn dành cho bốn khách",
            "Một bàn chỉ dành cho một người",
            "Một phòng tiệc VIP riêng cho hai mươi người",
            "Một bàn cao cho hai người tại quầy bar ngoài trời"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 2, the father requests: \"Hello! I would like a table for four, please.\"",
        "explanationEn": "In Segment 2, the father requests: \"Hello! I would like a table for four, please.\"",
        "explanationVi": "Trong câu 2, người cha yêu cầu: \"Hello! I would like a table for four, please.\" (Xin chào! Cho chúng tôi một bàn bốn người nhé).",
        "referenceSegmentIndex": 2,
        "targetedConcept": "Yêu cầu xếp bàn ăn (Table Seating Request)",
        "targetedConceptEn": "Table Seating Request",
        "targetedConceptVi": "Yêu cầu xếp bàn ăn"
    },
    {
        "id": "q_restaurant_ordering_2",
        "question": "What does the father politely request right after the family is shown to their table?",
        "questionEn": "What does the father politely request right after the family is shown to their table?",
        "questionVi": "Người cha lịch sự yêu cầu điều gì ngay sau khi gia đình được dẫn tới bàn?",
        "options": [
            "He asks the server to bring them the menu",
            "He demands an immediate refund before eating",
            "He asks for blankets and extra pillows",
            "He orders the waiter to turn off all the lights"
        ],
        "optionsEn": [
            "He asks the server to bring them the menu",
            "He demands an immediate refund before eating",
            "He asks for blankets and extra pillows",
            "He orders the waiter to turn off all the lights"
        ],
        "optionsVi": [
            "Ông đề nghị người phục vụ đưa thực đơn cho gia đình",
            "Ông yêu cầu hoàn tiền ngay trước khi ăn",
            "Ông xin chăn và thêm gối ngủ",
            "Ông yêu cầu người phục vụ tắt toàn bộ đèn điện"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 6, the father asks: \"Could you give us the menu, please?\"",
        "explanationEn": "In Segment 6, the father asks: \"Could you give us the menu, please?\"",
        "explanationVi": "Trong câu 6, người cha hỏi: \"Could you give us the menu, please?\" (Bạn có thể đưa cho chúng tôi thực đơn được không?).",
        "referenceSegmentIndex": 6,
        "targetedConcept": "Yêu cầu thực đơn nhà hàng (Requesting the Dining Menu)",
        "targetedConceptEn": "Requesting the Dining Menu",
        "targetedConceptVi": "Yêu cầu thực đơn nhà hàng"
    },
    {
        "id": "q_restaurant_ordering_3",
        "question": "What drink does Paul choose when the waiter asks for their beverage orders?",
        "questionEn": "What drink does Paul choose when the waiter asks for their beverage orders?",
        "questionVi": "Paul chọn loại đồ uống nào khi người phục vụ hỏi về nhu cầu đồ uống?",
        "options": [
            "A sweet and creamy milkshake",
            "A cup of boiling black tea",
            "A bottle of sparkling champagne",
            "A glass of plain warm tap water"
        ],
        "optionsEn": [
            "A sweet and creamy milkshake",
            "A cup of boiling black tea",
            "A bottle of sparkling champagne",
            "A glass of plain warm tap water"
        ],
        "optionsVi": [
            "Một ly sữa lắc ngọt ngào và béo ngậy",
            "Một tách trà đen nóng sôi",
            "Một chai sâm panh có ga",
            "Một ly nước máy ấm thông thường"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 13, Paul orders: \"I'll have a milkshake.\"",
        "explanationEn": "In Segment 13, Paul orders: \"I'll have a milkshake.\"",
        "explanationVi": "Trong câu 13, Paul gọi: \"I'll have a milkshake.\" (Con sẽ uống một ly sữa lắc).",
        "referenceSegmentIndex": 13,
        "targetedConcept": "Gọi đồ uống nhà hàng (Ordering Beverages & Drinks)",
        "targetedConceptEn": "Ordering Beverages & Drinks",
        "targetedConceptVi": "Gọi đồ uống nhà hàng"
    },
    {
        "id": "q_restaurant_ordering_4",
        "question": "What two courses does the mother order for her dinner meal?",
        "questionEn": "What two courses does the mother order for her dinner meal?",
        "questionVi": "Người mẹ gọi hai món ăn nào cho bữa tối của mình?",
        "options": [
            "Vegetable soup for starter and grilled fish for the main course",
            "Fried onion rings for starter and spicy chicken wings for main",
            "Vanilla ice cream for starter and beef steak for main",
            "Mushroom pizza for starter and boiled eggs for main"
        ],
        "optionsEn": [
            "Vegetable soup for starter and grilled fish for the main course",
            "Fried onion rings for starter and spicy chicken wings for main",
            "Vanilla ice cream for starter and beef steak for main",
            "Mushroom pizza for starter and boiled eggs for main"
        ],
        "optionsVi": [
            "Súp rau củ làm món khai vị và cá nướng làm món chính",
            "Hành tây chiên giòn khai vị và cánh gà cay làm món chính",
            "Kem vani làm món khai vị và bít tết bò làm món chính",
            "Pizza nấm làm món khai vị và trứng luộc làm món chính"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 20, the mother specifies: \"For starter, I'd like the vegetable soup. For the main course, I'd like the grilled fish.\"",
        "explanationEn": "In Segment 20, the mother specifies: \"For starter, I'd like the vegetable soup. For the main course, I'd like the grilled fish.\"",
        "explanationVi": "Trong câu 20, người mẹ gọi: \"For starter, I'd like the vegetable soup. For the main course, I'd like the grilled fish.\" (Về món khai vị, tôi muốn súp rau củ. Còn món chính, cho tôi món cá nướng).",
        "referenceSegmentIndex": 20,
        "targetedConcept": "Chọn món khai vị & món chính (Selecting Starters & Main Courses)",
        "targetedConceptEn": "Selecting Starters & Main Courses",
        "targetedConceptVi": "Chọn món khai vị & món chính"
    },
    {
        "id": "q_restaurant_ordering_5",
        "question": "Why can't Paul eat his soup immediately when the food is served?",
        "questionEn": "Why can't Paul eat his soup immediately when the food is served?",
        "questionVi": "Tại sao Paul không thể ăn món súp ngay khi thức ăn vừa được dọn lên?",
        "options": [
            "The soup is extremely hot so he can barely touch it",
            "The soup is completely frozen with ice cubes",
            "The waiter forgot to bring spoons to the table",
            "He does not like vegetables in the soup"
        ],
        "optionsEn": [
            "The soup is extremely hot so he can barely touch it",
            "The soup is completely frozen with ice cubes",
            "The waiter forgot to bring spoons to the table",
            "He does not like vegetables in the soup"
        ],
        "optionsVi": [
            "Món súp quá nóng khiến cậu bé gần như không thể chạm vào",
            "Món súp bị đông đá hoàn toàn với những viên đá lạnh",
            "Người phục vụ quên không mang thìa ra bàn",
            "Cậu bé không thích ăn rau củ trong món súp"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 25, Paul explains: \"I am so hungry and I want to eat, but the soup is so hot, I can barely touch it.\"",
        "explanationEn": "In Segment 25, Paul explains: \"I am so hungry and I want to eat, but the soup is so hot, I can barely touch it.\"",
        "explanationVi": "Trong câu 25, Paul giải thích: \"I am so hungry and I want to eat, but the soup is so hot, I can barely touch it.\" (Con đói bụng lắm và muốn ăn ngay, nhưng món súp nóng quá, con gần như không chạm vào nổi).",
        "referenceSegmentIndex": 25,
        "targetedConcept": "Nhận xét nhiệt độ món ăn (Commenting on Food Temperature)",
        "targetedConceptEn": "Commenting on Food Temperature",
        "targetedConceptVi": "Nhận xét nhiệt độ món ăn"
    },
    {
        "id": "q_restaurant_ordering_6",
        "question": "What condiment does the mother ask Paul to pass to her at the dining table?",
        "questionEn": "What condiment does the mother ask Paul to pass to her at the dining table?",
        "questionVi": "Người mẹ nhờ Paul chuyền giúp gia vị gì trên bàn ăn?",
        "options": [
            "The salt shaker",
            "The hot chili sauce",
            "The black pepper grinder",
            "The soy sauce bottle"
        ],
        "optionsEn": [
            "The salt shaker",
            "The hot chili sauce",
            "The black pepper grinder",
            "The soy sauce bottle"
        ],
        "optionsVi": [
            "Lọ muối",
            "Chai tương ớt cay",
            "Cối xay tiêu đen",
            "Chai nước tương xì dầu"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 34, the mother requests: \"Could you please pass me the salt, Paul?\"",
        "explanationEn": "In Segment 34, the mother requests: \"Could you please pass me the salt, Paul?\"",
        "explanationVi": "Trong câu 34, người mẹ nhờ: \"Could you please pass me the salt, Paul?\" (Paul ơi, con có thể làm ơn chuyền cho mẹ lọ muối được không?).",
        "referenceSegmentIndex": 34,
        "targetedConcept": "Phép lịch sự chuyền gia vị trên bàn ăn (Table Manners & Passing Condiments)",
        "targetedConceptEn": "Table Manners & Passing Condiments",
        "targetedConceptVi": "Phép lịch sự chuyền gia vị trên bàn ăn"
    },
    {
        "id": "q_restaurant_ordering_7",
        "question": "Which dessert does Amy choose when the waiter asks about desserts?",
        "questionEn": "Which dessert does Amy choose when the waiter asks about desserts?",
        "questionVi": "Amy chọn món tráng miệng nào khi người phục vụ hỏi về món tráng miệng?",
        "options": [
            "The cheesecake",
            "A chocolate fudge brownie",
            "An apple cinnamon pie",
            "A bowl of fresh strawberries"
        ],
        "optionsEn": [
            "The cheesecake",
            "A chocolate fudge brownie",
            "An apple cinnamon pie",
            "A bowl of fresh strawberries"
        ],
        "optionsVi": [
            "Bánh phô mai (cheesecake)",
            "Bánh hạnh nhân sô-cô-la fudge",
            "Bánh nướng táo hương quế",
            "Một bát dâu tây tươi"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 43, Amy says: \"I'll have the cheese cake please.\"",
        "explanationEn": "In Segment 43, Amy says: \"I'll have the cheese cake please.\"",
        "explanationVi": "Trong câu 43, Amy gọi: \"I'll have the cheese cake please.\" (Cho con bánh phô mai nhé).",
        "referenceSegmentIndex": 43,
        "targetedConcept": "Gọi món tráng miệng (Ordering Desserts)",
        "targetedConceptEn": "Ordering Desserts",
        "targetedConceptVi": "Gọi món tráng miệng"
    },
    {
        "id": "q_restaurant_ordering_8",
        "question": "What final request does the father make after the waiter asks if they need anything else?",
        "questionEn": "What final request does the father make after the waiter asks if they need anything else?",
        "questionVi": "Người cha đưa ra yêu cầu cuối cùng nào sau khi người phục vụ hỏi họ có cần thêm gì nữa không?",
        "options": [
            "He politely asks for just the bill to pay for the meal",
            "He orders four more large pepperoni pizzas to take home",
            "He asks to speak with the head chef in the kitchen",
            "He requests a reservation for tomorrow morning"
        ],
        "optionsEn": [
            "He politely asks for just the bill to pay for the meal",
            "He orders four more large pepperoni pizzas to take home",
            "He asks to speak with the head chef in the kitchen",
            "He requests a reservation for tomorrow morning"
        ],
        "optionsVi": [
            "Ông lịch sự xin hóa đơn tính tiền cho bữa ăn",
            "Ông gọi thêm bốn chiếc pizza xúc xích lớn mang về nhà",
            "Ông yêu cầu được nói chuyện với bếp trưởng trong gian bếp",
            "Ông yêu cầu đặt bàn trước cho sáng ngày mai"
        ],
        "correctAnswer": 0,
        "explanation": "In Segment 52, the father responds: \"No, thank you, just the bill.\"",
        "explanationEn": "In Segment 52, the father responds: \"No, thank you, just the bill.\"",
        "explanationVi": "Trong câu 52, người cha đáp: \"No, thank you, just the bill.\" (Không, cảm ơn bạn, chỉ cần hóa đơn tính tiền thôi).",
        "referenceSegmentIndex": 52,
        "targetedConcept": "Yêu cầu hóa đơn thanh toán (Requesting the Dining Bill)",
        "targetedConceptEn": "Requesting the Dining Bill",
        "targetedConceptVi": "Yêu cầu hóa đơn thanh toán"
    }
],
  generatedBy: "CONTEXTUAL_FALLBACK",
};

/**
 * English for Dining: Ordering Food at a Restaurant
 * Slug: english-dining-ordering-food-restaurant
 * YouTube ID: bgfdqVmVjfk
 * Category: cat_daily_conv (Giao Tiếp Đời Thực)
 * 100% Verbatim Authentic Dialogue (Scene 1: Easy English Family Dining Master Track)
 */
export const LESSON_RESTAURANT_ORDERING: MockVideoLesson = {
  id: "vid_travel_restaurant_ordering",
  slug: "english-dining-ordering-food-restaurant",
  title: "English for Dining: Ordering Food at a Restaurant",
  description: "Trọn vẹn hội thoại thực tế khi dùng bữa tại nhà hàng cùng gia đình: đặt bàn 4 người, nhận thực đơn, gọi đồ uống (nước lọc, nước chanh, sữa lắc milkshake, nước cam), gọi món khai vị và món chính (súp rau củ, gà nướng, cá nướng, lasagna), trò chuyện và chuyền gia vị trên bàn ăn, gọi món tráng miệng (kem, bánh sô-cô-la, bánh phô mai cheesecake), xin thêm ly nước và thanh toán hóa đơn.",
  sourceType: "YOUTUBE",
  externalId: "bgfdqVmVjfk",
  thumbnailUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
  durationSeconds: 175,
  durationFormatted: "02:55",
  cefrLevel: "A2",
  supportedTypes: "BOTH",
  categoryId: "cat_daily_conv",
  categorySlug: "daily-conversations",
  categoryName: "Giao Tiếp Đời Thực",
  accent: "en-US",
  wpmSpeed: 120,
  viewCount: 224000,
  studyCount: 71200,
  quiz: QUIZ_RESTAURANT_ORDERING,
  segments: [
    {
        "orderIndex": 1,
        "startTime": 7.92,
        "endTime": 9.8,
        "text": "Hello! How can I help you?",
        "translationVi": "Xin chào! Tôi có thể giúp gì cho quý khách?",
        "ipaUs": "/həˈloʊ haʊ kæn aɪ help juː/",
        "properNouns": [],
        "keywords": [
            "hello",
            "how can I help you"
        ],
        "explanationAi": "Lời chào hỏi và mở lời đón khách tiêu chuẩn và lịch sự của nhân viên nhà hàng.",
        "tokenCount": 6
    },
    {
        "orderIndex": 2,
        "startTime": 10.28,
        "endTime": 13.5,
        "text": "Hello! I would like a table for four, please.",
        "translationVi": "Xin chào! Cho chúng tôi một bàn bốn người nhé.",
        "ipaUs": "/həˈloʊ aɪ wʊd laɪk ə ˈteɪbl fɔːr fɔːr pliːz/",
        "properNouns": [],
        "keywords": [
            "would like",
            "table for four",
            "please"
        ],
        "explanationAi": "'A table for four' là mẫu câu thông dụng nhất để yêu cầu bàn ăn cho 4 người trong nhà hàng.",
        "tokenCount": 9
    },
    {
        "orderIndex": 3,
        "startTime": 14,
        "endTime": 17.5,
        "text": "Of course. Please follow me!",
        "translationVi": "Tất nhiên rồi ạ. Xin mời đi theo tôi!",
        "ipaUs": "/əv kɔːrs pliːz ˈfɑːloʊ miː/",
        "properNouns": [],
        "keywords": [
            "of course",
            "please follow me"
        ],
        "explanationAi": "'Please follow me' là câu dẫn đường lịch thiệp khi nhân viên đưa khách đến vị trí bàn ăn.",
        "tokenCount": 5
    },
    {
        "orderIndex": 4,
        "startTime": 18.64,
        "endTime": 20.3,
        "text": "Here is a table for four.",
        "translationVi": "Đây là bàn bốn người của quý khách ạ.",
        "ipaUs": "/hɪr ɪz ə ˈteɪbl fɔːr fɔːr/",
        "properNouns": [],
        "keywords": [
            "here is",
            "table for four"
        ],
        "explanationAi": "Cụm 'Here is...' dùng để giới thiệu vị trí bàn ăn đã được chuẩn bị sẵn sàng.",
        "tokenCount": 6
    },
    {
        "orderIndex": 5,
        "startTime": 20.72,
        "endTime": 23,
        "text": "Thank you!",
        "translationVi": "Cảm ơn bạn!",
        "ipaUs": "/θæŋk juː/",
        "properNouns": [],
        "keywords": [
            "thank you"
        ],
        "explanationAi": "Lời cảm ơn tự nhiên sau khi được nhân viên dẫn tới bàn ăn.",
        "tokenCount": 2
    },
    {
        "orderIndex": 6,
        "startTime": 23.68,
        "endTime": 25.8,
        "text": "Could you give us the menu, please?",
        "translationVi": "Bạn có thể đưa cho chúng tôi thực đơn được không?",
        "ipaUs": "/kʊd juː ɡɪv ʌs ðə ˈmenjuː pliːz/",
        "properNouns": [],
        "keywords": [
            "could you",
            "give us",
            "menu"
        ],
        "explanationAi": "Cấu trúc đề nghị lịch sự 'Could you... please?' khi yêu cầu nhận thực đơn xem món.",
        "tokenCount": 7
    },
    {
        "orderIndex": 7,
        "startTime": 26.08,
        "endTime": 28,
        "text": "Yes, of course.",
        "translationVi": "Vâng, tất nhiên rồi ạ.",
        "ipaUs": "/jes əv kɔːrs/",
        "properNouns": [],
        "keywords": [
            "yes",
            "of course"
        ],
        "explanationAi": "Câu đáp lại vui vẻ và sẵn sàng phục vụ của nhân viên bồi bàn.",
        "tokenCount": 3
    },
    {
        "orderIndex": 8,
        "startTime": 28.72,
        "endTime": 29.5,
        "text": "Here you are!",
        "translationVi": "Thực đơn của quý khách đây ạ!",
        "ipaUs": "/hɪr juː ɑːr/",
        "properNouns": [],
        "keywords": [
            "here you are"
        ],
        "explanationAi": "'Here you are' là cách nói chuẩn mực khi trao vật gì đó (ở đây là thực đơn) tận tay người khác.",
        "tokenCount": 3
    },
    {
        "orderIndex": 9,
        "startTime": 29.84,
        "endTime": 30.5,
        "text": "Thank you.",
        "translationVi": "Cảm ơn bạn.",
        "ipaUs": "/θæŋk juː/",
        "properNouns": [],
        "keywords": [
            "thank you"
        ],
        "explanationAi": "Lời cảm ơn ngắn gọn khi nhận thực đơn.",
        "tokenCount": 2
    },
    {
        "orderIndex": 10,
        "startTime": 30.72,
        "endTime": 32.5,
        "text": "Can I get you anything to drink?",
        "translationVi": "Tôi có thể lấy đồ uống gì cho quý khách trước không ạ?",
        "ipaUs": "/kæn aɪ ɡet juː ˈeniθɪŋ tuː drɪŋk/",
        "properNouns": [],
        "keywords": [
            "can I get you",
            "anything to drink"
        ],
        "explanationAi": "'Can I get you anything to drink?' là câu hỏi thông lệ để phục vụ nước uống trước khi khách chọn đồ ăn.",
        "tokenCount": 7
    },
    {
        "orderIndex": 11,
        "startTime": 32.88,
        "endTime": 34.2,
        "text": "Just water for me.",
        "translationVi": "Cho tôi nước lọc thôi.",
        "ipaUs": "/dʒʌst ˈwɔːtər fɔːr miː/",
        "properNouns": [],
        "keywords": [
            "just water",
            "for me"
        ],
        "explanationAi": "'Just water for me' là cách gọi nước lọc đơn giản, nhanh chóng.",
        "tokenCount": 4
    },
    {
        "orderIndex": 12,
        "startTime": 34.48,
        "endTime": 35.8,
        "text": "I'll have a lemonade.",
        "translationVi": "Tôi sẽ dùng một ly nước chanh.",
        "ipaUs": "/aɪl hæv ə ˌleməˈneɪd/",
        "properNouns": [],
        "keywords": [
            "I'll have",
            "lemonade"
        ],
        "explanationAi": "'I'll have...' là mẫu câu phổ biến nhất để gọi món ăn hoặc đồ uống tại nhà hàng.",
        "tokenCount": 5
    },
    {
        "orderIndex": 13,
        "startTime": 36.32,
        "endTime": 37.8,
        "text": "I'll have a milkshake.",
        "translationVi": "Con sẽ uống một ly sữa lắc.",
        "ipaUs": "/aɪl hæv ə ˈmɪlkʃeɪk/",
        "properNouns": [],
        "keywords": [
            "I'll have",
            "milkshake"
        ],
        "explanationAi": "'Milkshake' là sữa lắc vị ngọt béo rất được trẻ em yêu thích tại các quán ăn.",
        "tokenCount": 5
    },
    {
        "orderIndex": 14,
        "startTime": 38.08,
        "endTime": 39.5,
        "text": "I'll have an orange juice.",
        "translationVi": "Con sẽ uống một ly nước cam.",
        "ipaUs": "/aɪl hæv ən ˈɔːrɪndʒ dʒuːs/",
        "properNouns": [],
        "keywords": [
            "I'll have",
            "orange juice"
        ],
        "explanationAi": "'Orange juice' là nước cam ép; chú ý dùng mạo từ 'an' trước nguyên âm 'orange'.",
        "tokenCount": 6
    },
    {
        "orderIndex": 15,
        "startTime": 40,
        "endTime": 42,
        "text": "Great! I'll be right back.",
        "translationVi": "Tuyệt vời! Tôi sẽ quay lại ngay.",
        "ipaUs": "/ɡreɪt aɪl biː raɪt bæk/",
        "properNouns": [],
        "keywords": [
            "great",
            "I'll be right back"
        ],
        "explanationAi": "'I'll be right back' thông báo cho khách biết người phục vụ đi lấy đồ uống và sẽ quay lại bàn sớm.",
        "tokenCount": 6
    },
    {
        "orderIndex": 16,
        "startTime": 51.92,
        "endTime": 53.2,
        "text": "Are you ready to order?",
        "translationVi": "Quý khách đã sẵn sàng gọi món chưa ạ?",
        "ipaUs": "/ɑːr juː ˈredi tuː ˈɔːrdər/",
        "properNouns": [],
        "keywords": [
            "ready to order"
        ],
        "explanationAi": "Câu hỏi tiêu chuẩn của nhân viên phục vụ khi quay lại bàn để ghi nhận món chính.",
        "tokenCount": 5
    },
    {
        "orderIndex": 17,
        "startTime": 53.44,
        "endTime": 57,
        "text": "Yes, we are. I'll have the grilled chicken and a salad.",
        "translationVi": "Vâng, chúng tôi sẵn sàng rồi. Cho tôi món gà nướng và một phần salad.",
        "ipaUs": "/jes wiː ɑːr aɪl hæv ðə ɡrɪld ˈtʃɪkɪn ænd ə ˈsæləd/",
        "properNouns": [],
        "keywords": [
            "yes we are",
            "grilled chicken",
            "salad"
        ],
        "explanationAi": "'Grilled chicken' là món gà nướng trên vỉ than hoặc lò nướng kèm món rau trộn salad.",
        "tokenCount": 12
    },
    {
        "orderIndex": 18,
        "startTime": 57.28,
        "endTime": 59,
        "text": "Would you like a starter, sir?",
        "translationVi": "Thưa ông, ông có muốn dùng món khai vị không ạ?",
        "ipaUs": "/wʊd juː laɪk ə ˈstɑːrtər sɜːr/",
        "properNouns": [],
        "keywords": [
            "would you like",
            "starter",
            "sir"
        ],
        "explanationAi": "'Starter' (hay appetizer) là món khai vị nhẹ dùng trước món chính.",
        "tokenCount": 6
    },
    {
        "orderIndex": 19,
        "startTime": 59.52,
        "endTime": 61.5,
        "text": "Yes, I'd like the vegetable soup.",
        "translationVi": "Vâng, tôi muốn dùng món súp rau củ.",
        "ipaUs": "/jes aɪd laɪk ðə ˈvedʒtəbl suːp/",
        "properNouns": [],
        "keywords": [
            "I'd like",
            "vegetable soup"
        ],
        "explanationAi": "'Vegetable soup' là món súp nấu từ rau củ thanh đạm thích hợp làm món khai vị.",
        "tokenCount": 7
    },
    {
        "orderIndex": 20,
        "startTime": 61.76,
        "endTime": 67.2,
        "text": "For starter, I'd like the vegetable soup. For the main course, I'd like the grilled fish.",
        "translationVi": "Về món khai vị, tôi muốn súp rau củ. Còn món chính, cho tôi món cá nướng.",
        "ipaUs": "/fɔːr ˈstɑːrtər aɪd laɪk ðə ˈvedʒtəbl suːp fɔːr ðə meɪn kɔːrs aɪd laɪk ðə ɡrɪld fɪʃ/",
        "properNouns": [],
        "keywords": [
            "for starter",
            "vegetable soup",
            "main course",
            "grilled fish"
        ],
        "explanationAi": "Cặp cấu trúc 'For starter,... For the main course,...' giúp phân chia rõ ràng các đợt món khi gọi đồ ăn.",
        "tokenCount": 18
    },
    {
        "orderIndex": 21,
        "startTime": 67.84,
        "endTime": 70.8,
        "text": "I'll have the chicken soup and a lasagna.",
        "translationVi": "Con sẽ ăn món súp gà và món lasagna.",
        "ipaUs": "/aɪl hæv ðə ˈtʃɪkɪn suːp ænd ə ləˈzɑːnjə/",
        "properNouns": [],
        "keywords": [
            "chicken soup",
            "lasagna"
        ],
        "explanationAi": "'Lasagna' là món mì Ý dạng lớp xếp tầng xen kẽ phô mai, sốt thịt bolognese và gia vị nướng lò.",
        "tokenCount": 9
    },
    {
        "orderIndex": 22,
        "startTime": 71.28,
        "endTime": 74.8,
        "text": "I'll have the chicken soup, the grilled chicken and some salad.",
        "translationVi": "Con sẽ ăn súp gà, gà nướng và một ít salad.",
        "ipaUs": "/aɪl hæv ðə ˈtʃɪkɪn suːp ðə ɡrɪld ˈtʃɪkɪn ænd sʌm ˈsæləd/",
        "properNouns": [],
        "keywords": [
            "chicken soup",
            "grilled chicken",
            "some salad"
        ],
        "explanationAi": "Cách liệt kê chuỗi món ăn yêu thích bằng liên từ 'and'.",
        "tokenCount": 12
    },
    {
        "orderIndex": 23,
        "startTime": 75.04,
        "endTime": 77,
        "text": "Excellent, I'll be right back.",
        "translationVi": "Tuyệt hảo, tôi sẽ quay lại ngay.",
        "ipaUs": "/ˈeksələnt aɪl biː raɪt bæk/",
        "properNouns": [],
        "keywords": [
            "excellent",
            "I'll be right back"
        ],
        "explanationAi": "Lời xác nhận hào hứng của bồi bàn trước khi chuyển đơn đặt món vào gian bếp.",
        "tokenCount": 6
    },
    {
        "orderIndex": 24,
        "startTime": 80.08,
        "endTime": 82,
        "text": "It smells so great!",
        "translationVi": "Mùi thơm phức tuyệt quá!",
        "ipaUs": "/ɪt smelz soʊ ɡreɪt/",
        "properNouns": [],
        "keywords": [
            "smells so great"
        ],
        "explanationAi": "'Smell great' là câu khen ngợi cảm quan khứu giác khi món ăn vừa được dọn lên bàn nóng hổi.",
        "tokenCount": 4
    },
    {
        "orderIndex": 25,
        "startTime": 82.4,
        "endTime": 87.2,
        "text": "I am so hungry and I want to eat, but the soup is so hot, I can barely touch it.",
        "translationVi": "Con đói bụng lắm và muốn ăn ngay, nhưng món súp nóng quá, con gần như không chạm vào nổi.",
        "ipaUs": "/aɪ æm soʊ ˈhʌŋɡri ænd aɪ wɑːnt tuː iːt bʌt ðə suːp ɪz soʊ hɑːt aɪ kæn ˈberli tʌtʃ ɪt/",
        "properNouns": [],
        "keywords": [
            "hungry",
            "want to eat",
            "so hot",
            "barely touch"
        ],
        "explanationAi": "'Barely touch' diễn tả việc khó lòng đụng đũa/chạm vào vì thức ăn còn quá nóng vừa mới nấu xong.",
        "tokenCount": 20
    },
    {
        "orderIndex": 26,
        "startTime": 87.44,
        "endTime": 90,
        "text": "Wait for it to cool down before you eat it.",
        "translationVi": "Hãy đợi cho nó nguội bớt trước khi con ăn nhé.",
        "ipaUs": "/weɪt fɔːr ɪt tuː kuːl daʊn bɪˈfɔːr juː iːt ɪt/",
        "properNouns": [],
        "keywords": [
            "wait for it",
            "cool down",
            "before you eat"
        ],
        "explanationAi": "'Cool down' là cụm động từ chỉ sự nguội dần, hạ nhiệt độ của thức ăn.",
        "tokenCount": 10
    },
    {
        "orderIndex": 27,
        "startTime": 94.96,
        "endTime": 98.2,
        "text": "The grilled chicken tastes delicious, doesn't it, Paul?",
        "translationVi": "Món gà nướng này ăn ngon tuyệt con nhỉ, Paul?",
        "ipaUs": "/ðə ɡrɪld ˈtʃɪkɪn teɪsts dɪˈlɪʃəs ˈdʌznt ɪt pɔːl/",
        "properNouns": [
            "Paul"
        ],
        "keywords": [
            "grilled chicken",
            "tastes delicious",
            "doesn't it"
        ],
        "explanationAi": "Câu hỏi đuôi 'doesn't it?' dùng để tìm kiếm sự đồng tình về hương vị món ăn.",
        "tokenCount": 9
    },
    {
        "orderIndex": 28,
        "startTime": 98.56,
        "endTime": 100.8,
        "text": "Yes dad, it does, indeed.",
        "translationVi": "Vâng thưa bố, đúng là ngon thật đấy ạ.",
        "ipaUs": "/jes dæd ɪt dʌz ɪnˈdiːd/",
        "properNouns": [],
        "keywords": [
            "yes dad",
            "does indeed"
        ],
        "explanationAi": "'It does, indeed' là lời khẳng định mạnh mẽ và lịch sự về một nhận định đúng đắn.",
        "tokenCount": 5
    },
    {
        "orderIndex": 29,
        "startTime": 101.36,
        "endTime": 103.5,
        "text": "What about your lasagna, Amy?",
        "translationVi": "Còn món lasagna của con thì sao hả Amy?",
        "ipaUs": "/wʌt əˈbaʊt jʊər ləˈzɑːnjə ˈeɪmi/",
        "properNouns": [
            "Amy"
        ],
        "keywords": [
            "what about",
            "lasagna"
        ],
        "explanationAi": "'What about...?' là cách tự nhiên để hỏi han cảm nhận của người khác về món họ đang thưởng thức.",
        "tokenCount": 5
    },
    {
        "orderIndex": 30,
        "startTime": 103.84,
        "endTime": 106.5,
        "text": "I love it, it's my favourite dish.",
        "translationVi": "Con mê tít luôn, đây là món khoái khẩu của con mà.",
        "ipaUs": "/aɪ lʌv ɪt ɪts maɪ ˈfeɪvərɪt dɪʃ/",
        "properNouns": [],
        "keywords": [
            "love it",
            "favourite dish"
        ],
        "explanationAi": "'Favourite dish' chỉ món ăn yêu thích nhất của một người.",
        "tokenCount": 8
    },
    {
        "orderIndex": 31,
        "startTime": 106.96,
        "endTime": 108,
        "text": "Great!",
        "translationVi": "Tuyệt quá!",
        "ipaUs": "/ɡreɪt/",
        "properNouns": [],
        "keywords": [
            "great"
        ],
        "explanationAi": "Thán từ bày tỏ sự hài lòng và vui vẻ của người cha khi các con ăn ngon miệng.",
        "tokenCount": 1
    },
    {
        "orderIndex": 32,
        "startTime": 108.08,
        "endTime": 109.8,
        "text": "How's your fish, mom?",
        "translationVi": "Món cá của em thế nào hả mẹ nó?",
        "ipaUs": "/haʊz jʊər fɪʃ mɑːm/",
        "properNouns": [],
        "keywords": [
            "how's your fish",
            "mom"
        ],
        "explanationAi": "'How is...?' dùng để hỏi chất lượng hoặc cảm nhận về một món ăn cụ thể.",
        "tokenCount": 5
    },
    {
        "orderIndex": 33,
        "startTime": 110.24,
        "endTime": 114,
        "text": "It's excellent. I'm so glad we came to this restaurant.",
        "translationVi": "Ngon tuyệt hảo. Em rất mừng vì gia đình mình đã đến nhà hàng này.",
        "ipaUs": "/ɪts ˈeksələnt aɪm soʊ ɡlæd wiː keɪm tuː ðɪs ˈrestərɑːnt/",
        "properNouns": [],
        "keywords": [
            "excellent",
            "so glad",
            "came to this restaurant"
        ],
        "explanationAi": "'So glad' thể hiện sự vui mừng, thỏa mãn với quyết định lựa chọn địa điểm dùng bữa.",
        "tokenCount": 12
    },
    {
        "orderIndex": 34,
        "startTime": 114.4,
        "endTime": 117.5,
        "text": "Could you please pass me the salt, Paul?",
        "translationVi": "Paul ơi, con có thể làm ơn chuyền cho mẹ lọ muối được không?",
        "ipaUs": "/kʊd juː pliːz pæs miː ðə sɔːlt pɔːl/",
        "properNouns": [
            "Paul"
        ],
        "keywords": [
            "could you please",
            "pass me the salt"
        ],
        "explanationAi": "'Pass me the salt' là phép lịch sự trên bàn ăn phương Tây khi nhờ người khác đưa giúp gia vị.",
        "tokenCount": 8
    },
    {
        "orderIndex": 35,
        "startTime": 117.92,
        "endTime": 119,
        "text": "Here you are, mom.",
        "translationVi": "Của mẹ đây ạ.",
        "ipaUs": "/hɪr juː ɑːr mɑːm/",
        "properNouns": [],
        "keywords": [
            "here you are",
            "mom"
        ],
        "explanationAi": "Câu nói nhã nhặn khi chuyền đồ cho người lớn tuổi trong gia đình.",
        "tokenCount": 4
    },
    {
        "orderIndex": 36,
        "startTime": 119.28,
        "endTime": 120.5,
        "text": "Thank you.",
        "translationVi": "Cảm ơn con.",
        "ipaUs": "/θæŋk juː/",
        "properNouns": [],
        "keywords": [
            "thank you"
        ],
        "explanationAi": "Lời cảm ơn của mẹ khi nhận lọ muối.",
        "tokenCount": 2
    },
    {
        "orderIndex": 37,
        "startTime": 130.16,
        "endTime": 131.8,
        "text": "Did you enjoy your meal?",
        "translationVi": "Quý khách có dùng bữa ngon miệng không ạ?",
        "ipaUs": "/dɪd juː ɪnˈdʒɔɪ jʊər miːl/",
        "properNouns": [],
        "keywords": [
            "enjoy your meal"
        ],
        "explanationAi": "Câu hỏi quan tâm chu đáo của nhân viên nhà hàng sau khi khách ăn xong món chính.",
        "tokenCount": 5
    },
    {
        "orderIndex": 38,
        "startTime": 132.08,
        "endTime": 134.5,
        "text": "Yes, it was wonderful, thank you.",
        "translationVi": "Vâng, bữa ăn rất tuyệt vời, cảm ơn bạn.",
        "ipaUs": "/jes ɪt wʌz ˈwʌndərfʊl θæŋk juː/",
        "properNouns": [],
        "keywords": [
            "was wonderful",
            "thank you"
        ],
        "explanationAi": "Lời khen ngợi hài lòng từ phía khách hàng dành cho chất lượng món ăn và dịch vụ.",
        "tokenCount": 6
    },
    {
        "orderIndex": 39,
        "startTime": 134.8,
        "endTime": 136.5,
        "text": "Would you like something for dessert?",
        "translationVi": "Quý khách có muốn dùng món gì để tráng miệng không ạ?",
        "ipaUs": "/wʊd juː laɪk ˈsʌmθɪŋ fɔːr dɪˈzɜːrt/",
        "properNouns": [],
        "keywords": [
            "would you like",
            "for dessert"
        ],
        "explanationAi": "'Dessert' là món tráng miệng ngọt (bánh, kem, trái cây) sau bữa ăn chính.",
        "tokenCount": 6
    },
    {
        "orderIndex": 40,
        "startTime": 136.88,
        "endTime": 140,
        "text": "Yes, for dessert, I'll have ice cream please.",
        "translationVi": "Vâng, về tráng miệng thì cho tôi kem nhé.",
        "ipaUs": "/jes fɔːr dɪˈzɜːrt aɪl hæv aɪs kriːm pliːz/",
        "properNouns": [],
        "keywords": [
            "for dessert",
            "ice cream"
        ],
        "explanationAi": "'Ice cream' là món kem lạnh tráng miệng thơm mát phổ biến.",
        "tokenCount": 9
    },
    {
        "orderIndex": 41,
        "startTime": 140.56,
        "endTime": 142.2,
        "text": "I'll have the chocolate cake.",
        "translationVi": "Tôi sẽ chọn bánh sô-cô-la.",
        "ipaUs": "/aɪl hæv ðə ˈtʃɔːklət keɪk/",
        "properNouns": [],
        "keywords": [
            "I'll have",
            "chocolate cake"
        ],
        "explanationAi": "'Chocolate cake' là bánh ngọt sô-cô-la đậm đà hấp dẫn.",
        "tokenCount": 6
    },
    {
        "orderIndex": 42,
        "startTime": 142.64,
        "endTime": 143.8,
        "text": "I'll have ice cream.",
        "translationVi": "Con sẽ ăn kem.",
        "ipaUs": "/aɪl hæv aɪs kriːm/",
        "properNouns": [],
        "keywords": [
            "I'll have",
            "ice cream"
        ],
        "explanationAi": "Lựa chọn món kem mát lạnh của cậu bé Paul.",
        "tokenCount": 5
    },
    {
        "orderIndex": 43,
        "startTime": 144.24,
        "endTime": 146.5,
        "text": "I'll have the cheese cake please.",
        "translationVi": "Cho con bánh phô mai nhé.",
        "ipaUs": "/aɪl hæv ðə ˈtʃiːzkeɪk pliːz/",
        "properNouns": [],
        "keywords": [
            "I'll have",
            "cheese cake",
            "please"
        ],
        "explanationAi": "'Cheesecake' (bánh phô mai) là loại bánh ngọt mềm ngậy đặc trưng của văn hóa ẩm thực phương Tây.",
        "tokenCount": 7
    },
    {
        "orderIndex": 44,
        "startTime": 148.08,
        "endTime": 151.8,
        "text": "Everything looks great! Let's eat the desserts!",
        "translationVi": "Mọi thứ trông ngon mắt quá! Chúng ta cùng thưởng thức các món tráng miệng nào!",
        "ipaUs": "/ˈevriθɪŋ lʊks ɡreɪt lets iːt ðə dɪˈzɜːrts/",
        "properNouns": [],
        "keywords": [
            "everything looks great",
            "let's eat",
            "desserts"
        ],
        "explanationAi": "'Looks great' khen vẻ bề ngoài hấp dẫn; 'Let's eat' là lời rủ cùng bắt đầu thưởng thức.",
        "tokenCount": 8
    },
    {
        "orderIndex": 45,
        "startTime": 152.96,
        "endTime": 156.4,
        "text": "Dad, I'm thirsty. I would like to drink some water.",
        "translationVi": "Bố ơi, con khát quá. Con muốn uống một chút nước lọc.",
        "ipaUs": "/dæd aɪm ˈθɜːrsti aɪ wʊd laɪk tuː drɪŋk sʌm ˈwɔːtər/",
        "properNouns": [],
        "keywords": [
            "thirsty",
            "would like to drink",
            "some water"
        ],
        "explanationAi": "'Thirsty' là tính từ chỉ cảm giác khát nước; 'drink some water' là uống nước lọc.",
        "tokenCount": 11
    },
    {
        "orderIndex": 46,
        "startTime": 156.72,
        "endTime": 157.8,
        "text": "Excuse me!",
        "translationVi": "Xin lỗi làm phiền bạn một chút!",
        "ipaUs": "/ɪkˈskjuːs miː/",
        "properNouns": [],
        "keywords": [
            "excuse me"
        ],
        "explanationAi": "'Excuse me!' là câu nói chuẩn để gọi nhân viên bồi bàn khi đang ngồi tại bàn ăn.",
        "tokenCount": 2
    },
    {
        "orderIndex": 47,
        "startTime": 158.16,
        "endTime": 160,
        "text": "Yes, sir, how can I help you?",
        "translationVi": "Vâng thưa ông, tôi có thể giúp gì cho ông ạ?",
        "ipaUs": "/jes sɜːr haʊ kæn aɪ help juː/",
        "properNouns": [],
        "keywords": [
            "yes sir",
            "how can I help you"
        ],
        "explanationAi": "Lời hồi đáp nhanh chóng và kính cẩn của nhân viên phục vụ.",
        "tokenCount": 7
    },
    {
        "orderIndex": 48,
        "startTime": 160.4,
        "endTime": 163.2,
        "text": "Could you bring my son a glass of water, please?",
        "translationVi": "Bạn có thể mang cho con trai tôi một ly nước lọc được không?",
        "ipaUs": "/kʊd juː brɪŋ maɪ sʌn ə ɡlæs əv ˈwɔːtər pliːz/",
        "properNouns": [],
        "keywords": [
            "could you bring",
            "glass of water",
            "please"
        ],
        "explanationAi": "'A glass of water' là một cốc/ly nước lọc; cấu trúc yêu cầu lịch sự với 'Could you bring...'.",
        "tokenCount": 10
    },
    {
        "orderIndex": 49,
        "startTime": 163.52,
        "endTime": 164.8,
        "text": "Yes, of course!",
        "translationVi": "Vâng, tất nhiên rồi ạ!",
        "ipaUs": "/jes əv kɔːrs/",
        "properNouns": [],
        "keywords": [
            "yes",
            "of course"
        ],
        "explanationAi": "Sự sẵn lòng phục vụ ngay lập tức của nhân viên.",
        "tokenCount": 3
    },
    {
        "orderIndex": 50,
        "startTime": 165.04,
        "endTime": 166.5,
        "text": "Thank you.",
        "translationVi": "Cảm ơn bạn.",
        "ipaUs": "/θæŋk juː/",
        "properNouns": [],
        "keywords": [
            "thank you"
        ],
        "explanationAi": "Lời cảm ơn của người cha khi nhân viên nhận lời lấy nước.",
        "tokenCount": 2
    },
    {
        "orderIndex": 51,
        "startTime": 167.2,
        "endTime": 168.8,
        "text": "Can I bring you anything else?",
        "translationVi": "Tôi có thể mang thêm gì khác cho quý khách không ạ?",
        "ipaUs": "/kæn aɪ brɪŋ juː ˈeniθɪŋ els/",
        "properNouns": [],
        "keywords": [
            "bring you",
            "anything else"
        ],
        "explanationAi": "'Anything else?' là câu hỏi quen thuộc để kiểm tra xem khách còn cần hỗ trợ gì nữa không.",
        "tokenCount": 6
    },
    {
        "orderIndex": 52,
        "startTime": 169.2,
        "endTime": 171.2,
        "text": "No, thank you, just the bill.",
        "translationVi": "Không, cảm ơn bạn, chỉ cần hóa đơn tính tiền thôi.",
        "ipaUs": "/noʊ θæŋk juː dʒʌst ðə bɪl/",
        "properNouns": [],
        "keywords": [
            "no thank you",
            "just the bill"
        ],
        "explanationAi": "'Just the bill' là cách nói thông dụng để xin hóa đơn thanh toán khi đã dùng xong bữa.",
        "tokenCount": 6
    },
    {
        "orderIndex": 53,
        "startTime": 171.6,
        "endTime": 174.5,
        "text": "Ok sir. I'll be right back with the bill.",
        "translationVi": "Vâng thưa ông. Tôi sẽ quay lại ngay với hóa đơn ạ.",
        "ipaUs": "/oʊˈkeɪ sɜːr aɪl biː raɪt bæk wɪð ðə bɪl/",
        "properNouns": [],
        "keywords": [
            "ok sir",
            "right back with the bill"
        ],
        "explanationAi": "Lời chào kết chu đáo khi nhân viên đi in hóa đơn thanh toán mang ra bàn cho khách.",
        "tokenCount": 10
    }
],
};
