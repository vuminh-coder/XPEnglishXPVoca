import { MockVideoLesson, VideoQuizData } from "../types";

/**
 * Bilingual Contextual Reading Comprehension Quiz for BBC Learning English: First Treasure Recovered from $20 Billion Sunken Ship
 * 8 in-depth analytical questions covering broadcast journalism, naval history, legal disputes, and headline vocabulary.
 */
export const QUIZ_BBC_SUNKEN_SHIP: VideoQuizData = {
  lessonId: "e4476093-9f0c-4620-a7f3-345d0e6b64db",
  lessonTitle: "BBC Learning English: First Treasure Recovered from $20 Billion Sunken Ship",
  totalQuestions: 8,
  xpReward: 40,
  questions: [
    {
      id: "q_bbc_sunken_ship_1",
      question: "What is the primary objective of the BBC podcast 'Learning English from the News' hosted by Georgie and Phil?",
      questionEn: "What is the primary objective of the BBC podcast 'Learning English from the News' hosted by Georgie and Phil?",
      questionVi: "Mục tiêu chính của podcast BBC 'Learning English from the News' do Georgie và Phil dẫn dắt là gì?",
      options: [
        "To examine a major news story and teach headline vocabulary to help learners understand current affairs.",
        "To report live financial stock market trading figures from the London Stock Exchange.",
        "To interview international celebrities about their personal hobbies and vacation travels.",
        "To teach classical Latin poetry and historical British grammar rules.",
      ],
      optionsEn: [
        "To examine a major news story and teach headline vocabulary to help learners understand current affairs.",
        "To report live financial stock market trading figures from the London Stock Exchange.",
        "To interview international celebrities about their personal hobbies and vacation travels.",
        "To teach classical Latin poetry and historical British grammar rules.",
      ],
      optionsVi: [
        "Tìm hiểu một câu chuyện thời sự lớn và giảng dạy từ vựng trong tiêu đề báo chí để giúp người học hiểu tin tức.",
        "Báo cáo trực tiếp các số liệu giao dịch thị trường chứng khoán từ Sở Giao dịch Chứng khoán London.",
        "Phỏng vấn những người nổi tiếng quốc tế về sở thích cá nhân và các chuyến du lịch nghỉ dưỡng.",
        "Dạy thơ tiếng Latinh cổ điển và các quy tắc ngữ pháp tiếng Anh lịch sử.",
      ],
      correctAnswer: 0,
      explanation: 'In Segment 4, Georgie explains: "In this programme, we look at one big news story and the vocabulary in the headlines that will help you understand it."',
      explanationEn: 'In Segment 4, Georgie explains: "In this programme, we look at one big news story and the vocabulary in the headlines that will help you understand it."',
      explanationVi: 'Trong câu 4, Georgie giải thích: "Trong chương trình này, chúng ta sẽ cùng tìm hiểu một câu chuyện thời sự lớn và những từ vựng trong tiêu đề báo chí giúp bạn hiểu rõ nó."',
      referenceSegmentIndex: 3,
      targetedConcept: "Mục tiêu podcast & Từ vựng báo chí (Podcast Purpose & Headline Vocabulary)",
      targetedConceptEn: "Podcast Purpose & Headline Vocabulary",
      targetedConceptVi: "Mục tiêu podcast & Từ vựng báo chí",
    },
    {
      id: "q_bbc_sunken_ship_2",
      question: "What specific historical artifacts have been initially recovered from the 300-year-old shipwreck?",
      questionEn: "What specific historical artifacts have been initially recovered from the 300-year-old shipwreck?",
      questionVi: "Những hiện vật lịch sử cụ thể nào đã bước đầu được trục vớt từ xác con tàu đắm hơn 300 năm tuổi?",
      options: [
        "A cannon, three coins, and a porcelain cup.",
        "A wooden steering wheel, two anchors, and a navigation compass.",
        "Several gold crowns and royal ceremonial swords.",
        "A steam engine boiler and steel telegraph wires.",
      ],
      optionsEn: [
        "A cannon, three coins, and a porcelain cup.",
        "A wooden steering wheel, two anchors, and a navigation compass.",
        "Several gold crowns and royal ceremonial swords.",
        "A steam engine boiler and steel telegraph wires.",
      ],
      optionsVi: [
        "Một khẩu đại bác, ba đồng tiền xu và một chiếc tách bằng gốm sứ.",
        "Một bánh lái bằng gỗ, hai chiếc mỏ neo và một la bàn hàng hải.",
        "Nhiều vương miện bằng vàng và gươm lễ nghi hoàng gia.",
        "Một nồi hơi động cơ hơi nước và dây điện báo bằng thép.",
      ],
      correctAnswer: 0,
      explanation: 'In Segment 7, the report specifies: "A cannon, three coins and a porcelain cup have been recovered from a ship that sank over 300 years ago."',
      explanationEn: 'In Segment 7, the report specifies: "A cannon, three coins and a porcelain cup have been recovered from a ship that sank over 300 years ago."',
      explanationVi: 'Trong câu 7, bản tin nêu rõ: "Một khẩu đại bác, ba đồng tiền xu và một chiếc tách sứ đã được trục vớt từ một con tàu bị chìm hơn 300 năm trước."',
      referenceSegmentIndex: 6,
      targetedConcept: "Thông tin chi tiết: Hiện vật khảo cổ trục vớt (Detailed Fact: Recovered Artifacts)",
      targetedConceptEn: "Detailed Fact: Recovered Artifacts",
      targetedConceptVi: "Thông tin chi tiết: Hiện vật khảo cổ trục vớt",
    },
    {
      id: "q_bbc_sunken_ship_3",
      question: "What was the name of the sunken ship, when and where was it sunk, and by whom?",
      questionEn: "What was the name of the sunken ship, when and where was it sunk, and by whom?",
      questionVi: "Con tàu bị đắm tên là gì, nó bị đánh chìm khi nào, ở đâu và bởi lực lượng nào?",
      options: [
        "The Santa Maria, sunk by pirate vessels in 1650 near Jamaica.",
        "The San Jose, sunk by British ships in 1708 near Cartagena in Colombia.",
        "The HMS Victory, sunk by Spanish cannons in 1805 off the coast of Gibraltar.",
        "The Flor de la Mar, sunk by sudden typhoon waves in 1511 near Sumatra.",
      ],
      optionsEn: [
        "The Santa Maria, sunk by pirate vessels in 1650 near Jamaica.",
        "The San Jose, sunk by British ships in 1708 near Cartagena in Colombia.",
        "The HMS Victory, sunk by Spanish cannons in 1805 off the coast of Gibraltar.",
        "The Flor de la Mar, sunk by sudden typhoon waves in 1511 near Sumatra.",
      ],
      optionsVi: [
        "Tàu Santa Maria, bị các tàu hải tặc đánh chìm năm 1650 gần Jamaica.",
        "Tàu San Jose, bị các tàu chiến của Anh đánh chìm vào năm 1708 gần Cartagena ở Colombia.",
        "Tàu HMS Victory, bị đại bác Tây Ban Nha bắn chìm năm 1805 ngoài khơi Gibraltar.",
        "Tàu Flor de la Mar, bị sóng bão nhiệt đới đánh chìm năm 1511 gần Sumatra.",
      ],
      correctAnswer: 1,
      explanation: 'In Segment 8, Phil reports: "The ship, called the San Jose, was sunk by British ships in 1708 near Cartagena in Colombia."',
      explanationEn: 'In Segment 8, Phil reports: "The ship, called the San Jose, was sunk by British ships in 1708 near Cartagena in Colombia."',
      explanationVi: 'Trong câu 8, Phil tường thuật: "Con tàu, mang tên San Jose, đã bị các tàu của Anh đánh chìm vào năm 1708 gần bờ biển Cartagena ở Colombia."',
      referenceSegmentIndex: 7,
      targetedConcept: "Bối cảnh lịch sử hàng hải: San Jose 1708 (Historical Context: The San Jose)",
      targetedConceptEn: "Historical Context: The San Jose",
      targetedConceptVi: "Bối cảnh lịch sử hàng hải: San Jose 1708",
    },
    {
      id: "q_bbc_sunken_ship_4",
      question: "What is the estimated value and composition of the treasure thought to be on board the San Jose?",
      questionEn: "What is the estimated value and composition of the treasure thought to be on board the San Jose?",
      questionVi: "Giá trị ước tính và thành phần của kho báu được cho là nằm trên tàu San Jose là gì?",
      options: [
        "Roughly 20 million dollars worth of uncut diamonds and gemstones.",
        "About $20 billion worth of gold and silver coins, according to estimates.",
        "500 million dollars in antique bronze armors and iron ingots.",
        "Incalculable cultural value containing ancient written Mayan scrolls.",
      ],
      optionsEn: [
        "Roughly 20 million dollars worth of uncut diamonds and gemstones.",
        "About $20 billion worth of gold and silver coins, according to estimates.",
        "500 million dollars in antique bronze armors and iron ingots.",
        "Incalculable cultural value containing ancient written Mayan scrolls.",
      ],
      optionsVi: [
        "Khoảng 20 triệu đô la kim cương thô và đá quý chưa qua cắt gọt.",
        "Khoảng 20 tỷ đô la tiền vàng và tiền bạc, theo các ước tính.",
        "500 triệu đô la áo giáp đồng cổ và phôi thỏi sắt.",
        "Giá trị văn hóa vô giá chứa đựng các cuộn giấy viết tay của người Maya cổ đại.",
      ],
      correctAnswer: 1,
      explanation: 'In Segment 9: "The ship is thought to have $20 billion worth of gold and silver coins on board, according to some estimates."',
      explanationEn: 'In Segment 9: "The ship is thought to have $20 billion worth of gold and silver coins on board, according to some estimates."',
      explanationVi: 'Trong câu 9: "Con tàu được cho là đang chở số lượng tiền vàng và bạc trị giá khoảng 20 tỷ đô la, theo một số ước tính."',
      referenceSegmentIndex: 8,
      targetedConcept: "Ước tính giá trị kho báu: $20 Billion Gold & Silver (Treasure Valuation)",
      targetedConceptEn: "Treasure Valuation",
      targetedConceptVi: "Ước tính giá trị kho báu: 20 Tỷ USD Vàng & Bạc",
    },
    {
      id: "q_bbc_sunken_ship_5",
      question: "Which multiple parties have staked legal claims to the ownership of the San Jose treasure?",
      questionEn: "Which multiple parties have staked legal claims to the ownership of the San Jose treasure?",
      questionVi: "Những bên nào đã tuyên bố quyền sở hữu đối với kho báu trên tàu San Jose?",
      options: [
        "Colombia, Spain, an American company, and indigenous groups in Bolivia.",
        "Only the United Nations Maritime Organization and the British Royal Navy.",
        "Exclusively modern commercial deep-sea treasure hunting divers.",
        "The governments of Portugal, Brazil, and international salvage syndicates.",
      ],
      optionsEn: [
        "Colombia, Spain, an American company, and indigenous groups in Bolivia.",
        "Only the United Nations Maritime Organization and the British Royal Navy.",
        "Exclusively modern commercial deep-sea treasure hunting divers.",
        "The governments of Portugal, Brazil, and international salvage syndicates.",
      ],
      optionsVi: [
        "Colombia, Tây Ban Nha, một công ty Mỹ và các nhóm người bản địa ở Bolivia.",
        "Chỉ duy nhất Tổ chức Hàng hải Liên Hợp Quốc và Hải quân Hoàng gia Anh.",
        "Độc quyền các thợ lặn săn kho báu biển sâu thương mại hiện đại.",
        "Chính phủ Bồ Đào Nha, Brazil và các tập đoàn trục vớt quốc tế.",
      ],
      correctAnswer: 0,
      explanation: 'In Segment 10: "Colombia, Spain, an American company and indigenous groups in Bolivia have all claimed that this treasure belongs to them."',
      explanationEn: 'In Segment 10: "Colombia, Spain, an American company and indigenous groups in Bolivia have all claimed that this treasure belongs to them."',
      explanationVi: 'Trong câu 10: "Colombia, Tây Ban Nha, một công ty Mỹ và các nhóm người bản địa ở Bolivia đều tuyên bố rằng kho báu này thuộc về họ."',
      referenceSegmentIndex: 9,
      targetedConcept: "Tranh chấp pháp lý & Quyền sở hữu di sản (Legal Ownership Claims & Cultural Heritage)",
      targetedConceptEn: "Legal Ownership Claims & Cultural Heritage",
      targetedConceptVi: "Tranh chấp pháp lý & Quyền sở hữu di sản",
    },
    {
      id: "q_bbc_sunken_ship_6",
      question: "When did Colombian scientists locate the shipwreck, and what action did they take last year?",
      questionEn: "When did Colombian scientists locate the shipwreck, and what action did they take last year?",
      questionVi: "Các nhà khoa học Colombia đã định vị được xác tàu vào năm nào và họ đã hành động gì vào năm ngoái?",
      options: [
        "They found it in 1982 and sold the GPS coordinates to an international auction house.",
        "They located the ship in 2015 and launched an expedition to explore it last year.",
        "They discovered it in 2020 and constructed an underwater museum over the site.",
        "They located it last year and immediately blew up the surrounding seabed.",
      ],
      optionsEn: [
        "They found it in 1982 and sold the GPS coordinates to an international auction house.",
        "They located the ship in 2015 and launched an expedition to explore it last year.",
        "They discovered it in 2020 and constructed an underwater museum over the site.",
        "They located it last year and immediately blew up the surrounding seabed.",
      ],
      optionsVi: [
        "Họ tìm thấy nó vào năm 1982 và bán tọa độ GPS cho một nhà đấu giá quốc tế.",
        "Họ đã định vị được con tàu vào năm 2015 và phát động một chuyến thám hiểm để khám phá nó vào năm ngoái.",
        "Họ phát hiện ra nó vào năm 2020 và xây dựng một bảo tàng dưới nước ngay trên địa điểm đó.",
        "Họ định vị được nó vào năm ngoái và lập tức cho nổ tung đáy biển xung quanh.",
      ],
      correctAnswer: 1,
      explanation: 'In Segment 11, the report states: "Colombian scientists located the ship in 2015 and launched an expedition to explore it last year."',
      explanationEn: 'In Segment 11, the report states: "Colombian scientists located the ship in 2015 and launched an expedition to explore it last year."',
      explanationVi: 'Trong câu 11, bản tin cho biết: "Các nhà khoa học Colombia đã định vị được con tàu vào năm 2015 và phát động một chuyến thám hiểm để khám phá nó vào năm ngoái."',
      referenceSegmentIndex: 10,
      targetedConcept: "Khám phá khoa học: Định vị & Thám hiểm (Scientific Discovery: Ship Location & Expedition)",
      targetedConceptEn: "Scientific Discovery: Ship Location & Expedition",
      targetedConceptVi: "Khám phá khoa học: Định vị & Thám hiểm",
    },
    {
      id: "q_bbc_sunken_ship_7",
      question: "Which media organization published the headline discussed by Phil and Georgie in Segments 12 & 13?",
      questionEn: "Which media organization published the headline discussed by Phil and Georgie in Segments 12 & 13?",
      questionVi: "Tổ chức truyền thông nào đã xuất bản dòng tít được Phil và Georgie thảo luận ở câu 12 & 13?",
      options: [
        "The New York Times newspaper in the United States.",
        "Reuters global investigative news agency.",
        "Fox Weather, an American broadcaster.",
        "National Geographic scientific magazine.",
      ],
      optionsEn: [
        "The New York Times newspaper in the United States.",
        "Reuters global investigative news agency.",
        "Fox Weather, an American broadcaster.",
        "National Geographic scientific magazine.",
      ],
      optionsVi: [
        "Tờ báo The New York Times tại Hoa Kỳ.",
        "Hãng thông tấn điều tra toàn cầu Reuters.",
        "Fox Weather, một đài truyền hình của Mỹ.",
        "Tạp chí khoa học National Geographic.",
      ],
      correctAnswer: 2,
      explanation: 'In Segment 12, Phil introduces: "Let\'s have our first headline. This one is from Fox Weather, an American broadcaster."',
      explanationEn: 'In Segment 12, Phil introduces: "Let\'s have our first headline. This one is from Fox Weather, an American broadcaster."',
      explanationVi: 'Trong câu 12, Phil giới thiệu: "Hãy cùng đến với dòng tít đầu tiên. Tiêu đề này đến từ Fox Weather, một đài truyền hình của Mỹ."',
      referenceSegmentIndex: 11,
      targetedConcept: "Nguồn truyền thông báo chí: Fox Weather (Media Broadcaster Source)",
      targetedConceptEn: "Media Broadcaster Source",
      targetedConceptVi: "Nguồn truyền thông báo chí: Fox Weather",
    },
    {
      id: "q_bbc_sunken_ship_8",
      question: "In the headline 'San Jose, wrecked in war', what does the past participle 'wrecked' mean?",
      questionEn: "In the headline 'San Jose, wrecked in war', what does the past participle 'wrecked' mean?",
      questionVi: "Trong dòng tít 'San Jose, wrecked in war', quá khứ phân từ 'wrecked' có nghĩa là gì?",
      options: [
        "Safely harbored in a deep naval port during a military conflict.",
        "Severely damaged or destroyed, especially referring to a ship that sank.",
        "Sold at a heavy discount to an enemy trading company.",
        "Upgraded with reinforced steel armor for frontline defense.",
      ],
      optionsEn: [
        "Safely harbored in a deep naval port during a military conflict.",
        "Severely damaged or destroyed, especially referring to a ship that sank.",
        "Sold at a heavy discount to an enemy trading company.",
        "Upgraded with reinforced steel armor for frontline defense.",
      ],
      optionsVi: [
        "Được neo đậu an toàn trong cảng hải quân sâu trong suốt cuộc xung đột quân sự.",
        "Bị hư hỏng nặng nề hoặc bị phá hủy, đặc biệt dùng để chỉ một con tàu bị đắm chìm.",
        "Bị bán hạ giá cho một công ty thương mại đối địch.",
        "Được nâng cấp bằng giáp thép gia cố để phòng thủ tiền tuyến.",
      ],
      correctAnswer: 1,
      explanation: 'In Segment 13, the headline reads: "Archeologists recover treasures from the legendary 1708 San Jose, wrecked in war." "Wrecked" means destroyed or sunk at sea.',
      explanationEn: 'In Segment 13, the headline reads: "Archeologists recover treasures from the legendary 1708 San Jose, wrecked in war." "Wrecked" means destroyed or sunk at sea.',
      explanationVi: 'Trong câu 13, tiêu đề báo chí nêu rõ: "Các nhà khảo cổ học thu hồi những bảo vật từ con tàu huyền thoại San Jose năm 1708, từng bị phá hủy trong chiến tranh." Từ "wrecked" nghĩa là bị phá hủy hoặc bị đánh đắm trên biển.',
      referenceSegmentIndex: 12,
      targetedConcept: "Từ vựng báo chí: Wrecked (Bị phá hủy / Bị đắm tàu)",
      targetedConceptEn: "Headline Vocabulary: Wrecked",
      targetedConceptVi: "Từ vựng báo chí: Wrecked (Bị phá hủy / Bị đắm tàu)",
    },
  ],
  generatedBy: "CONTEXTUAL_FALLBACK",
};

/**
 * BBC Learning English: First Treasure Recovered from $20 Billion Sunken Ship
 * Slug: bbc-6min-brain-boost
 */
export const LESSON_BBC_SUNKEN_SHIP: MockVideoLesson = {
    "id": "e4476093-9f0c-4620-a7f3-345d0e6b64db",
    "slug": "bbc-6min-brain-boost",
    "title": "BBC Learning English: First Treasure Recovered from $20 Billion Sunken Ship",
    "description": "Bản tin thời sự đặc sắc từ BBC Learning English về việc trục vớt kho báu huyền thoại trị giá 20 tỷ USD từ con tàu đắm San Jose năm 1708, học từ vựng tin tức và phát âm Anh-Anh chuẩn.",
    "sourceType": "YOUTUBE",
    "externalId": "doOlP7NLUwc",
    "thumbnailUrl": "https://img.youtube.com/vi/doOlP7NLUwc/hqdefault.jpg",
    "durationSeconds": 90,
    "durationFormatted": "01:30",
    "cefrLevel": "B1",
    "supportedTypes": "BOTH",
    "categoryId": "cat_bbc_6min",
    "categorySlug": "bbc-6-minute",
    "categoryName": "BBC 6 Minute English",
    "accent": "en-GB",
    "wpmSpeed": 135,
    "viewCount": 3820,
    "studyCount": 1420,
    "quiz": QUIZ_BBC_SUNKEN_SHIP,
    "segments": [
      {
        "orderIndex": 1,
        "startTime": 0,
        "endTime": 6.6,
        "text": "From BBC Learning English, This is Learning English from the News, our podcast about the news headlines.",
        "normalizedText": "from bbc learning english this is learning english from the news our podcast about the news headlines",
        "ipaUs": "frəm biː biː siː ˈlɜːrnɪŋ ˈɪŋɡlɪʃ ðɪs ɪz ˈlɜːrnɪŋ ˈɪŋɡlɪʃ frəm ðə nuːz ˈaʊər ˈpɑːdˌkæst əˈbaʊt ðə nuːz ˈhɛdˌlaɪnz",
        "translationVi": "Từ BBC Learning English, đây là chương trình Learning English from the News, podcast của chúng tôi về các dòng tít tin tức.",
        "explanationAi": "Câu mở đầu giới thiệu chương trình podcast tin tức của BBC Learning English. Chú ý cụm 'Learning English from the News' và danh từ 'headlines' (tiêu đề, dòng tít báo chí).",
        "properNouns": [
          "BBC Learning English",
          "Learning English from the News"
        ],
        "keywords": [
          "headlines",
          "podcast",
          "learning",
          "news",
          "english"
        ],
        "tokenCount": 17
      },
      {
        "orderIndex": 2,
        "startTime": 6.6,
        "endTime": 13.12,
        "text": "In this programme, first treasure recovered from $20 billion sunken ship.",
        "normalizedText": "in this programme first treasure recovered from 20 billion sunken ship",
        "ipaUs": "ɪn ðɪs ˈproʊɡræm fɜːrst ˈtrɛʒər rɪˈkʌvərd frəm ˈtwɛnti ˈbɪljən ˈsʌŋkən ʃɪp",
        "translationVi": "Trong chương trình hôm nay, kho báu đầu tiên được trục vớt từ con tàu đắm trị giá 20 tỷ đô la.",
        "explanationAi": "'Recovered' (được thu hồi, trục vớt) và 'sunken ship' (tàu đắm/chìm dưới nước). Cụm '$20 billion' đóng vai trò tính từ bổ nghĩa cho 'sunken ship'.",
        "properNouns": [],
        "keywords": [
          "recovered",
          "treasure",
          "sunken",
          "programme",
          "billion"
        ],
        "tokenCount": 12
      },
      {
        "orderIndex": 3,
        "startTime": 16.16,
        "endTime": 18.48,
        "text": "Hello, I'm Georgie. And I'm Phil.",
        "normalizedText": "hello im georgie and im phil",
        "ipaUs": "həˈloʊ aɪm ˈdʒɔːrdʒi ænd aɪm fɪl",
        "translationVi": "Xin chào, tôi là Georgie. Và tôi là Phil.",
        "explanationAi": "Lời chào mở đầu thân thiện từ hai người dẫn chương trình BBC: Georgie và Phil.",
        "properNouns": [
          "Georgie",
          "Phil"
        ],
        "keywords": [
          "georgie",
          "hello",
          "phil"
        ],
        "tokenCount": 6
      },
      {
        "orderIndex": 4,
        "startTime": 18.48,
        "endTime": 24.96,
        "text": "In this programme, we look at one big news story and the vocabulary in the headlines that will help you understand it.",
        "normalizedText": "in this programme we look at one big news story and the vocabulary in the headlines that will help you understand it",
        "ipaUs": "ɪn ðɪs ˈproʊɡræm wiː lʊk æt wʌn bɪɡ nuːz ˈstɔːri ænd ðə vəʊˈkæbjəˌlɛri ɪn ðə ˈhɛdˌlaɪnz ðæt wɪl hɛlp juː ˌʌndərˈstænd ɪt",
        "translationVi": "Trong chương trình này, chúng ta sẽ cùng tìm hiểu một câu chuyện thời sự lớn và những từ vựng trong tiêu đề báo chí giúp bạn hiểu rõ nó.",
        "explanationAi": "Cụm 'look at' (xem xét, tìm hiểu), 'vocabulary in the headlines' (từ vựng trong tiêu đề tin tức) và mệnh đề quan hệ 'that will help you understand it'.",
        "properNouns": [],
        "keywords": [
          "vocabulary",
          "headlines",
          "understand",
          "programme",
          "story"
        ],
        "tokenCount": 21
      },
      {
        "orderIndex": 5,
        "startTime": 24.96,
        "endTime": 33.4,
        "text": "You can find all the vocabulary and headlines from this episode, as well as a worksheet on our website, bbclearningenglish.com.",
        "normalizedText": "you can find all the vocabulary and headlines from this episode as well as a worksheet on our website bbclearningenglishcom",
        "ipaUs": "juː kæn faɪnd ɔːl ðə vàʊˈkæbjəˌlɛri ænd ˈhɛdˌlaɪnz frəm ðɪs ˈɛpəˌsoʊd æz wɛl æz ə ˈwɜːrkˌʃiːt ɑːn ˈaʊər ˈwɛbˌsaɪt biːbiːsiːˌlɜːrnɪŋˈɪŋɡlɪʃ dɑːt kɑːm",
        "translationVi": "Bạn có thể tìm thấy toàn bộ từ vựng và tiêu đề trong tập này, cũng như bài tập thực hành trên trang web bbclearningenglish.com của chúng tôi.",
        "explanationAi": "'Episode' (tập phát sóng), liên từ 'as well as' (cũng như), và 'worksheet' (phiếu bài tập học tập).",
        "properNouns": [
          "bbclearningenglish.com"
        ],
        "keywords": [
          "vocabulary",
          "headlines",
          "worksheet",
          "episode",
          "website"
        ],
        "tokenCount": 20
      },
      {
        "orderIndex": 6,
        "startTime": 33.4,
        "endTime": 36.56,
        "text": "OK, Phil, let's hear more about this story.",
        "normalizedText": "ok phil lets hear more about this story",
        "ipaUs": "oʊˈkeɪ fɪl lɛts hɪr mɔːr əˈbaʊt ðɪs ˈstɔːri",
        "translationVi": "Được rồi, Phil, hãy cùng lắng nghe chi tiết hơn về câu chuyện này nhé.",
        "explanationAi": "Câu chuyển ý quen thuộc trong podcast radio: 'let's hear more about...' (hãy cùng lắng nghe thêm về...).",
        "properNouns": [
          "Phil"
        ],
        "keywords": [
          "story",
          "phil",
          "hear"
        ],
        "tokenCount": 8
      },
      {
        "orderIndex": 7,
        "startTime": 41.64,
        "endTime": 49.4,
        "text": "A cannon, three coins and a porcelain cup have been recovered from a ship that sank over 300 years ago.",
        "normalizedText": "a cannon three coins and a porcelain cup have been recovered from a ship that sank over 300 years ago",
        "ipaUs": "ə ˈkænən θriː kɔɪnz ænd ə ˈpɔːrsəlɪn kʌp hæv bɪn rɪˈkʌvərd frəm ə ʃɪp ðæt sæŋk ˈoʊvər θriː ˈhʌndrəd jɪrz əˈɡoʊ",
        "translationVi": "Một khẩu đại bác, ba đồng tiền xu và một chiếc tách sứ đã được trục vớt từ một con tàu bị chìm hơn 300 năm trước.",
        "explanationAi": "'Cannon' (khẩu đại bác súng lớn), 'porcelain' (đồ gốm sứ), 'recovered' (trục vớt được) và thì Hiện tại hoàn thành bị động 'have been recovered'.",
        "properNouns": [],
        "keywords": [
          "porcelain",
          "recovered",
          "cannon",
          "coins",
          "sank"
        ],
        "tokenCount": 19
      },
      {
        "orderIndex": 8,
        "startTime": 49.4,
        "endTime": 56.52,
        "text": "The ship, called the San Jose, was sunk by British ships in 1708 near Cartagena in Colombia.",
        "normalizedText": "the ship called the san jose was sunk by british ships in 1708 near cartagena in colombia",
        "ipaUs": "ðə ʃɪp kɔːld ðə sæn hoʊˈzeɪ wʌz sʌŋk baɪ ˈbrɪtɪʃ ʃɪps ɪn ˈsɛvənˈtiːn oʊ eɪt nɪr ˌkɑːrtəˈheɪnə ɪn kəˈlʌmbiə",
        "translationVi": "Con tàu, mang tên San Jose, đã bị các tàu của Anh đánh chìm vào năm 1708 gần bờ biển Cartagena ở Colombia.",
        "explanationAi": "Địa danh lịch sử Cartagena thuộc Colombia. Động từ 'was sunk' (bị đánh chìm - dạng bị động quá khứ của 'sink').",
        "properNouns": [
          "San Jose",
          "British",
          "Cartagena",
          "Colombia"
        ],
        "keywords": [
          "cartagena",
          "colombia",
          "british",
          "sunk",
          "ships"
        ],
        "tokenCount": 17
      },
      {
        "orderIndex": 9,
        "startTime": 56.52,
        "endTime": 64.24,
        "text": "The ship is thought to have $20 billion worth of gold and silver coins on board, according to some estimates.",
        "normalizedText": "the ship is thought to have 20 billion worth of gold and silver coins on board according to some estimates",
        "ipaUs": "ðə ʃɪp ɪz θɔːt tuː hæv ˈtwɛnti ˈbɪljən wɜːrθ ʌv ɡoʊld ænd ˈsɪlvər kɔɪnz ɑːn bɔːrd əˈkɔːrdɪŋ tuː sʌm ˈɛstəməts",
        "translationVi": "Con tàu được cho là đang chở số lượng tiền vàng và bạc trị giá khoảng 20 tỷ đô la, theo một số ước tính.",
        "explanationAi": "Cấu trúc bị động khách quan 'is thought to have' (được cho là có), cụm 'on board' (ở trên tàu), và danh từ 'estimates' (các ước tính).",
        "properNouns": [],
        "keywords": [
          "estimates",
          "billion",
          "silver",
          "coins",
          "board"
        ],
        "tokenCount": 20
      },
      {
        "orderIndex": 10,
        "startTime": 64.24,
        "endTime": 72.04,
        "text": "Colombia, Spain, an American company and indigenous groups in Bolivia have all claimed that this treasure belongs to them.",
        "normalizedText": "colombia spain an american company and indigenous groups in bolivia have all claimed that this treasure belongs to them",
        "ipaUs": "kəˈlʌmbiə speɪn ən əˈmɛrɪkən ˈkʌmpəni ænd ɪnˈdɪdʒənəs ɡruːps ɪn bəˈlɪviə hæv ɔːl kleɪmd ðæt ðɪs ˈtrɛʒər bɪˈlɔːŋz tuː ðɛm",
        "translationVi": "Colombia, Tây Ban Nha, một công ty Mỹ và các nhóm người bản địa ở Bolivia đều tuyên bố rằng kho báu này thuộc về họ.",
        "explanationAi": "'Indigenous groups' (các bộ tộc người bản địa), động từ 'claimed' (tuyên bố quyền sở hữu), và 'belongs to' (thuộc về ai).",
        "properNouns": [
          "Colombia",
          "Spain",
          "American",
          "Bolivia"
        ],
        "keywords": [
          "indigenous",
          "treasure",
          "belongs",
          "claimed",
          "bolivia"
        ],
        "tokenCount": 19
      },
      {
        "orderIndex": 11,
        "startTime": 72.04,
        "endTime": 78.8,
        "text": "Colombian scientists located the ship in 2015 and launched an expedition to explore it last year.",
        "normalizedText": "colombian scientists located the ship in 2015 and launched an expedition to explore it last year",
        "ipaUs": "kəˈlʌmbiən ˈsaɪəntɪsts ˈloʊkeɪtɪd ðə ʃɪp ɪn ˈtwɛnti fɪfˈtiːn ænd lɔːntʃt ən ˌɛkspəˈdɪʃən tuː ɪkˈsplɔːr ɪt læst jɪr",
        "translationVi": "Các nhà khoa học Colombia đã định vị được con tàu vào năm 2015 và phát động một chuyến thám hiểm để khám phá nó vào năm ngoái.",
        "explanationAi": "'Located' (xác định vị trí), 'launched an expedition' (khởi động/triển khai một chuyến thám hiểm thám trắc).",
        "properNouns": [
          "Colombian"
        ],
        "keywords": [
          "expedition",
          "scientists",
          "launched",
          "located",
          "explore"
        ],
        "tokenCount": 15
      },
      {
        "orderIndex": 12,
        "startTime": 78.8,
        "endTime": 83.84,
        "text": "Let's have our first headline. This one is from Fox Weather, an American broadcaster.",
        "normalizedText": "lets have our first headline this one is from fox weather an american broadcaster",
        "ipaUs": "lɛts hæv ˈaʊər fɜːrst ˈhɛdˌlaɪn ðɪs wʌn ɪz frəm fɑːks ˈwɛðər ən əˈmɛrɪkən ˈbrɔːdˌkæstər",
        "translationVi": "Hãy cùng đến với dòng tít đầu tiên. Tiêu đề này đến từ Fox Weather, một đài truyền hình của Mỹ.",
        "explanationAi": "'Broadcaster' (đài truyền hình/phát thanh phát sóng tin tức). Lối dẫn nhập trực diện vào dòng tít báo chí.",
        "properNouns": [
          "Fox Weather",
          "American"
        ],
        "keywords": [
          "broadcaster",
          "headline",
          "weather",
          "american"
        ],
        "tokenCount": 14
      },
      {
        "orderIndex": 13,
        "startTime": 83.84,
        "endTime": 89.72,
        "text": "Archeologists recover treasures from the legendary 1708 San Jose, wrecked in war.",
        "normalizedText": "archeologists recover treasures from the legendary 1708 san jose wrecked in war",
        "ipaUs": "ˌɑːrkiˈɑːlədʒɪsts rɪˈkʌvər ˈtrɛʒərz frəm ðə ˈlɛdʒənˌdɛri ˈsɛvənˈtiːn oʊ eɪt sæn hoʊˈzeɪ rɛkt ɪn wɔːr",
        "translationVi": "Các nhà khảo cổ học thu hồi những bảo vật từ con tàu huyền thoại San Jose năm 1708, từng bị phá hủy trong chiến tranh.",
        "explanationAi": "'Archeologists' (các nhà khảo cổ học), 'legendary' (huyền thoại), và quá khứ phân từ 'wrecked' (bị đắm, bị phá hủy).",
        "properNouns": [
          "San Jose"
        ],
        "keywords": [
          "archeologists",
          "treasures",
          "legendary",
          "wrecked",
          "war"
        ],
        "tokenCount": 13
      }
    ]
  };
