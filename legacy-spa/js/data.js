// ============================================================
// XP VOCA - Mock Data
// Complete vocabulary learning platform data
// ============================================================

const MOCK_DATA = {
  // ---- THEMES / TOPICS ----
  themes: [
    { id: 't1', name: 'Du lịch & Khám phá', nameEn: 'Travel & Exploration', icon: '✈️', difficulty: 2, totalVocabs: 45, color: '#4ec5f1' },
    { id: 't2', name: 'Công nghệ', nameEn: 'Technology', icon: '💻', difficulty: 3, totalVocabs: 50, color: '#9c27b0' },
    { id: 't3', name: 'Ẩm thực', nameEn: 'Food & Cooking', icon: '🍳', difficulty: 1, totalVocabs: 40, color: '#ff9800' },
    { id: 't4', name: 'Kinh doanh', nameEn: 'Business', icon: '💼', difficulty: 4, totalVocabs: 55, color: '#2196f3' },
    { id: 't5', name: 'Y tế & Sức khỏe', nameEn: 'Health & Medicine', icon: '🏥', difficulty: 3, totalVocabs: 42, color: '#4caf50' },
    { id: 't6', name: 'Giáo dục', nameEn: 'Education', icon: '📚', difficulty: 2, totalVocabs: 38, color: '#e91e63' },
    { id: 't7', name: 'Môi trường', nameEn: 'Environment', icon: '🌍', difficulty: 3, totalVocabs: 35, color: '#009688' },
    { id: 't8', name: 'Thể thao', nameEn: 'Sports & Fitness', icon: '⚽', difficulty: 2, totalVocabs: 36, color: '#ff5722' },
    { id: 't9', name: 'Nghệ thuật', nameEn: 'Arts & Culture', icon: '🎨', difficulty: 3, totalVocabs: 32, color: '#673ab7' },
    { id: 't10', name: 'Cảm xúc', nameEn: 'Emotions & Feelings', icon: '💝', difficulty: 1, totalVocabs: 30, color: '#f44336' },
    { id: 't11', name: 'Giao tiếp hàng ngày', nameEn: 'Daily Conversations', icon: '💬', difficulty: 1, totalVocabs: 48, color: '#00bcd4' },
    { id: 't12', name: 'IELTS / TOEIC', nameEn: 'IELTS / TOEIC Prep', icon: '🎯', difficulty: 5, totalVocabs: 60, color: '#795548' },
  ],

  // ---- VOCABULARIES ----
  vocabularies: [
    // Travel
    { id: 'v1', word: 'Wanderlust', phonetic: '/ˈwɒn.dɚ.lʌst/', definition: 'A strong desire to travel and explore the world', definitionVn: 'Niềm khao khát mãnh liệt được đi du lịch và khám phá thế giới', pos: 'noun', difficulty: 3, frequency: 6, themeId: 't1', examples: ['"She was filled with wanderlust after seeing photos of Paris."', '"His wanderlust took him to over 30 countries."'], synonyms: ['travel bug', 'itchy feet'], antonyms: ['homebody'], audioUrl: null, imageUrl: null },
    { id: 'v2', word: 'Itinerary', phonetic: '/aɪˈtɪn.ə.rer.i/', definition: 'A planned route or journey; a detailed plan for a trip', definitionVn: 'Lịch trình; kế hoạch chi tiết cho một chuyến đi', pos: 'noun', difficulty: 2, frequency: 7, themeId: 't1', examples: ['"We need to finalize our itinerary before booking flights."'], synonyms: ['schedule', 'route plan'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v3', word: 'Excursion', phonetic: '/ɪkˈskɜː.ʒən/', definition: 'A short journey or trip, especially for pleasure', definitionVn: 'Chuyến tham quan ngắn, đặc biệt là cho mục đích giải trí', pos: 'noun', difficulty: 2, frequency: 6, themeId: 't1', examples: ['"The hotel offers excursions to nearby islands."'], synonyms: ['trip', 'outing', 'expedition'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v4', word: 'Souvenir', phonetic: '/ˌsuː.vəˈnɪr/', definition: 'Something bought or kept as a reminder of a place visited', definitionVn: 'Quà lưu niệm; vật mua hoặc giữ làm kỷ niệm', pos: 'noun', difficulty: 1, frequency: 8, themeId: 't1', examples: ['"I bought a small souvenir for my family."'], synonyms: ['memento', 'keepsake'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v5', word: 'Accommodation', phonetic: '/əˌkɒm.əˈdeɪ.ʃən/', definition: 'A place to live, work, or stay in', definitionVn: 'Chỗ ở; nơi lưu trú', pos: 'noun', difficulty: 2, frequency: 8, themeId: 't1', examples: ['"Finding affordable accommodation in the city center is difficult."'], synonyms: ['lodging', 'housing'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v6', word: 'Embark', phonetic: '/ɪmˈbɑːrk/', definition: 'To begin a journey or start something new', definitionVn: 'Bắt đầu một hành trình hoặc khởi đầu điều gì mới', pos: 'verb', difficulty: 3, frequency: 5, themeId: 't1', examples: ['"We embarked on a journey across Southeast Asia."'], synonyms: ['begin', 'commence', 'set out'], antonyms: ['conclude', 'end'], audioUrl: null, imageUrl: null },

    // Technology
    { id: 'v7', word: 'Algorithm', phonetic: '/ˈæl.ɡə.rɪ.ðəm/', definition: 'A set of rules or steps used to solve a problem', definitionVn: 'Thuật toán; tập hợp các quy tắc để giải quyết vấn đề', pos: 'noun', difficulty: 4, frequency: 7, themeId: 't2', examples: ['"Social media algorithms determine what content you see."'], synonyms: ['procedure', 'formula'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v8', word: 'Innovative', phonetic: '/ˈɪn.ə.veɪ.tɪv/', definition: 'Introducing new ideas or methods; creative', definitionVn: 'Đổi mới; sáng tạo; giới thiệu ý tưởng mới', pos: 'adjective', difficulty: 2, frequency: 8, themeId: 't2', examples: ['"Apple is known for its innovative products."'], synonyms: ['creative', 'inventive', 'pioneering'], antonyms: ['conventional', 'traditional'], audioUrl: null, imageUrl: null },
    { id: 'v9', word: 'Cybersecurity', phonetic: '/ˌsaɪ.bɚ.sɪˈkjʊr.ə.t̬i/', definition: 'The practice of protecting systems and networks from digital attacks', definitionVn: 'An ninh mạng; bảo vệ hệ thống khỏi các cuộc tấn công số', pos: 'noun', difficulty: 3, frequency: 7, themeId: 't2', examples: ['"Cybersecurity is one of the fastest-growing industries."'], synonyms: ['information security'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v10', word: 'Artificial Intelligence', phonetic: '/ˌɑːr.t̬ɪ.fɪʃ.əl ɪnˈtel.ɪ.dʒəns/', definition: 'Computer systems able to perform tasks that normally require human intelligence', definitionVn: 'Trí tuệ nhân tạo; hệ thống máy tính có thể thực hiện các tác vụ thông minh', pos: 'noun', difficulty: 3, frequency: 9, themeId: 't2', examples: ['"AI is transforming how we live and work."'], synonyms: ['AI', 'machine intelligence'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v11', word: 'Bandwidth', phonetic: '/ˈbænd.wɪdθ/', definition: 'The amount of data that can be transmitted in a fixed time', definitionVn: 'Băng thông; lượng dữ liệu có thể truyền trong thời gian nhất định', pos: 'noun', difficulty: 3, frequency: 6, themeId: 't2', examples: ['"We need more bandwidth to support video conferencing."'], synonyms: ['capacity', 'throughput'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v12', word: 'Debug', phonetic: '/ˌdiːˈbʌɡ/', definition: 'To identify and remove errors from computer software', definitionVn: 'Gỡ lỗi; xác định và loại bỏ lỗi trong phần mềm', pos: 'verb', difficulty: 2, frequency: 7, themeId: 't2', examples: ['"It took hours to debug the application."'], synonyms: ['troubleshoot', 'fix'], antonyms: [], audioUrl: null, imageUrl: null },

    // Food
    { id: 'v13', word: 'Cuisine', phonetic: '/kwɪˈziːn/', definition: 'A style or method of cooking, especially from a particular region', definitionVn: 'Ẩm thực; phong cách nấu ăn đặc trưng của một vùng', pos: 'noun', difficulty: 2, frequency: 8, themeId: 't3', examples: ['"Vietnamese cuisine is famous for its fresh herbs and flavors."'], synonyms: ['cooking', 'gastronomy'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v14', word: 'Appetizer', phonetic: '/ˈæp.ə.taɪ.zɚ/', definition: 'A small dish served before the main course', definitionVn: 'Món khai vị; món ăn nhỏ phục vụ trước món chính', pos: 'noun', difficulty: 1, frequency: 7, themeId: 't3', examples: ['"We ordered bruschetta as an appetizer."'], synonyms: ['starter', 'hors d\'oeuvre'], antonyms: ['dessert'], audioUrl: null, imageUrl: null },
    { id: 'v15', word: 'Gourmet', phonetic: '/ɡʊrˈmeɪ/', definition: 'A person who enjoys and knows a lot about fine food', definitionVn: 'Người sành ăn; thực phẩm cao cấp', pos: 'noun/adj', difficulty: 3, frequency: 6, themeId: 't3', examples: ['"This gourmet restaurant serves exquisite dishes."'], synonyms: ['epicure', 'foodie'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v16', word: 'Savory', phonetic: '/ˈseɪ.vər.i/', definition: 'Having a pleasant, salty taste rather than sweet', definitionVn: 'Mặn mòi; có vị ngon, không ngọt', pos: 'adjective', difficulty: 2, frequency: 6, themeId: 't3', examples: ['"I prefer savory snacks over sweet ones."'], synonyms: ['tasty', 'flavorful'], antonyms: ['sweet', 'bland'], audioUrl: null, imageUrl: null },

    // Business
    { id: 'v17', word: 'Entrepreneur', phonetic: '/ˌɑːn.trə.prəˈnɜːr/', definition: 'A person who starts and runs their own business', definitionVn: 'Doanh nhân; người khởi nghiệp', pos: 'noun', difficulty: 3, frequency: 8, themeId: 't4', examples: ['"She became a successful entrepreneur at age 25."'], synonyms: ['business owner', 'founder'], antonyms: ['employee'], audioUrl: null, imageUrl: null },
    { id: 'v18', word: 'Revenue', phonetic: '/ˈrev.ən.uː/', definition: 'Income generated from business activities', definitionVn: 'Doanh thu; thu nhập từ hoạt động kinh doanh', pos: 'noun', difficulty: 3, frequency: 9, themeId: 't4', examples: ['"The company reported record revenue this quarter."'], synonyms: ['income', 'earnings', 'proceeds'], antonyms: ['expenditure', 'cost'], audioUrl: null, imageUrl: null },
    { id: 'v19', word: 'Stakeholder', phonetic: '/ˈsteɪk.hoʊl.dɚ/', definition: 'A person or group with an interest in a business', definitionVn: 'Bên liên quan; người có lợi ích trong doanh nghiệp', pos: 'noun', difficulty: 4, frequency: 7, themeId: 't4', examples: ['"We need to consider all stakeholders before making decisions."'], synonyms: ['shareholder', 'investor', 'partner'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v20', word: 'Negotiate', phonetic: '/nɪˈɡoʊ.ʃi.eɪt/', definition: 'To discuss something to reach an agreement', definitionVn: 'Đàm phán; thương lượng để đạt được thỏa thuận', pos: 'verb', difficulty: 3, frequency: 8, themeId: 't4', examples: ['"They negotiated a deal worth millions."'], synonyms: ['bargain', 'discuss', 'mediate'], antonyms: ['dictate'], audioUrl: null, imageUrl: null },

    // Health
    { id: 'v21', word: 'Diagnosis', phonetic: '/ˌdaɪ.əɡˈnoʊ.sɪs/', definition: 'The identification of an illness or problem', definitionVn: 'Chẩn đoán; xác định bệnh', pos: 'noun', difficulty: 3, frequency: 8, themeId: 't5', examples: ['"The doctor confirmed the diagnosis after running tests."'], synonyms: ['assessment', 'evaluation'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v22', word: 'Symptom', phonetic: '/ˈsɪmp.təm/', definition: 'A sign of illness or a physical/mental condition', definitionVn: 'Triệu chứng; dấu hiệu của bệnh', pos: 'noun', difficulty: 2, frequency: 9, themeId: 't5', examples: ['"Common symptoms include fever and headache."'], synonyms: ['sign', 'indicator', 'manifestation'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v23', word: 'Prescription', phonetic: '/prɪˈskrɪp.ʃən/', definition: 'A doctor\'s written instruction for medicine', definitionVn: 'Đơn thuốc; chỉ định của bác sĩ', pos: 'noun', difficulty: 2, frequency: 7, themeId: 't5', examples: ['"You need a prescription to buy this medicine."'], synonyms: ['medication order'], antonyms: [], audioUrl: null, imageUrl: null },

    // Education
    { id: 'v24', word: 'Curriculum', phonetic: '/kəˈrɪk.jʊ.ləm/', definition: 'The subjects comprising a course of study', definitionVn: 'Chương trình giảng dạy; giáo trình', pos: 'noun', difficulty: 3, frequency: 7, themeId: 't6', examples: ['"The school updated its curriculum to include coding."'], synonyms: ['syllabus', 'program'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v25', word: 'Scholarship', phonetic: '/ˈskɒl.ə.ʃɪp/', definition: 'Financial aid given to students based on achievement', definitionVn: 'Học bổng; hỗ trợ tài chính cho sinh viên', pos: 'noun', difficulty: 2, frequency: 8, themeId: 't6', examples: ['"She won a full scholarship to Harvard."'], synonyms: ['grant', 'fellowship', 'bursary'], antonyms: [], audioUrl: null, imageUrl: null },

    // Environment
    { id: 'v26', word: 'Sustainability', phonetic: '/səˌsteɪ.nəˈbɪl.ə.t̬i/', definition: 'Meeting present needs without compromising future generations', definitionVn: 'Sự bền vững; phát triển không ảnh hưởng tương lai', pos: 'noun', difficulty: 4, frequency: 8, themeId: 't7', examples: ['"Sustainability is at the core of our business model."'], synonyms: ['durability', 'viability'], antonyms: ['unsustainability'], audioUrl: null, imageUrl: null },
    { id: 'v27', word: 'Biodiversity', phonetic: '/ˌbaɪ.oʊ.daɪˈvɜː.sə.t̬i/', definition: 'The variety of plant and animal life in a habitat', definitionVn: 'Đa dạng sinh học; sự phong phú về loài', pos: 'noun', difficulty: 4, frequency: 6, themeId: 't7', examples: ['"Protecting biodiversity is crucial for our ecosystem."'], synonyms: ['biological diversity'], antonyms: [], audioUrl: null, imageUrl: null },

    // Emotions
    { id: 'v28', word: 'Euphoria', phonetic: '/juːˈfɔːr.i.ə/', definition: 'A feeling of intense happiness and excitement', definitionVn: 'Hưng phấn tột độ; cảm giác hạnh phúc mãnh liệt', pos: 'noun', difficulty: 3, frequency: 5, themeId: 't10', examples: ['"She felt a sense of euphoria after finishing the marathon."'], synonyms: ['elation', 'bliss', 'ecstasy'], antonyms: ['depression', 'misery'], audioUrl: null, imageUrl: null },
    { id: 'v29', word: 'Melancholy', phonetic: '/ˈmel.ən.kɒl.i/', definition: 'A deep, persistent sadness', definitionVn: 'U sầu; nỗi buồn sâu sắc, kéo dài', pos: 'noun/adj', difficulty: 3, frequency: 5, themeId: 't10', examples: ['"A feeling of melancholy washed over him on rainy days."'], synonyms: ['sadness', 'gloom', 'sorrow'], antonyms: ['happiness', 'joy'], audioUrl: null, imageUrl: null },
    { id: 'v30', word: 'Resilience', phonetic: '/rɪˈzɪl.i.əns/', definition: 'The ability to recover quickly from difficulties', definitionVn: 'Sức bật; khả năng phục hồi nhanh chóng', pos: 'noun', difficulty: 3, frequency: 8, themeId: 't10', examples: ['"Her resilience in the face of adversity was inspiring."'], synonyms: ['toughness', 'strength', 'grit'], antonyms: ['fragility', 'weakness'], audioUrl: null, imageUrl: null },

    // Daily Conversations
    { id: 'v31', word: 'Appreciate', phonetic: '/əˈpriː.ʃi.eɪt/', definition: 'To recognize the value of something; to be grateful', definitionVn: 'Đánh giá cao; trân trọng; biết ơn', pos: 'verb', difficulty: 1, frequency: 9, themeId: 't11', examples: ['"I really appreciate your help."', '"We appreciate you taking the time to meet us."'], synonyms: ['value', 'cherish', 'be grateful for'], antonyms: ['depreciate', 'disregard'], audioUrl: null, imageUrl: null },
    { id: 'v32', word: 'Overwhelmed', phonetic: '/ˌoʊ.vɚˈwelmd/', definition: 'Feeling too much of something; unable to cope', definitionVn: 'Choáng ngợp; quá tải; không thể đối phó', pos: 'adjective', difficulty: 2, frequency: 7, themeId: 't11', examples: ['"She felt overwhelmed by the amount of work."'], synonyms: ['swamped', 'inundated'], antonyms: ['underwhelmed', 'calm'], audioUrl: null, imageUrl: null },

    // IELTS/TOEIC
    { id: 'v33', word: 'Pragmatic', phonetic: '/præɡˈmæt.ɪk/', definition: 'Dealing with things in a practical way', definitionVn: 'Thực dụng; xử lý vấn đề theo cách thực tế', pos: 'adjective', difficulty: 4, frequency: 6, themeId: 't12', examples: ['"We need a pragmatic approach to solve this problem."'], synonyms: ['practical', 'realistic', 'sensible'], antonyms: ['idealistic', 'impractical'], audioUrl: null, imageUrl: null },
    { id: 'v34', word: 'Ubiquitous', phonetic: '/juːˈbɪk.wɪ.təs/', definition: 'Present, appearing, or found everywhere', definitionVn: 'Có mặt khắp nơi; phổ biến', pos: 'adjective', difficulty: 5, frequency: 5, themeId: 't12', examples: ['"Smartphones have become ubiquitous in modern life."'], synonyms: ['omnipresent', 'pervasive', 'universal'], antonyms: ['rare', 'scarce'], audioUrl: null, imageUrl: null },
    { id: 'v35', word: 'Meticulous', phonetic: '/məˈtɪk.jʊ.ləs/', definition: 'Showing great attention to detail; very careful', definitionVn: 'Tỉ mỉ; rất cẩn thận với từng chi tiết', pos: 'adjective', difficulty: 4, frequency: 6, themeId: 't12', examples: ['"She is meticulous in her research methodology."'], synonyms: ['thorough', 'precise', 'painstaking'], antonyms: ['careless', 'sloppy'], audioUrl: null, imageUrl: null },
    { id: 'v36', word: 'Ambiguous', phonetic: '/æmˈbɪɡ.ju.əs/', definition: 'Having more than one possible meaning; unclear', definitionVn: 'Mơ hồ; không rõ ràng; có nhiều nghĩa', pos: 'adjective', difficulty: 4, frequency: 7, themeId: 't12', examples: ['"The contract language was ambiguous and led to disputes."'], synonyms: ['vague', 'unclear', 'equivocal'], antonyms: ['clear', 'unambiguous'], audioUrl: null, imageUrl: null },

    // More Travel
    { id: 'v37', word: 'Passport', phonetic: '/ˈpæs.pɔːrt/', definition: 'An official document for international travel', definitionVn: 'Hộ chiếu; giấy tờ chính thức cho du lịch quốc tế', pos: 'noun', difficulty: 1, frequency: 9, themeId: 't1', examples: ['"Make sure your passport is valid for at least 6 months."'], synonyms: ['travel document'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v38', word: 'Destination', phonetic: '/ˌdes.tɪˈneɪ.ʃən/', definition: 'The place to which someone is going', definitionVn: 'Điểm đến; nơi mà ai đó đang đi tới', pos: 'noun', difficulty: 1, frequency: 9, themeId: 't1', examples: ['"Bali is a popular tourist destination."'], synonyms: ['goal', 'endpoint'], antonyms: ['origin', 'departure'], audioUrl: null, imageUrl: null },

    // More Tech
    { id: 'v39', word: 'Blockchain', phonetic: '/ˈblɒk.tʃeɪn/', definition: 'A decentralized digital ledger technology', definitionVn: 'Chuỗi khối; công nghệ sổ cái kỹ thuật số phi tập trung', pos: 'noun', difficulty: 4, frequency: 6, themeId: 't2', examples: ['"Blockchain technology is revolutionizing finance."'], synonyms: ['distributed ledger'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v40', word: 'Interface', phonetic: '/ˈɪn.tɚ.feɪs/', definition: 'A point where two systems meet and interact', definitionVn: 'Giao diện; điểm giao tiếp giữa hai hệ thống', pos: 'noun', difficulty: 2, frequency: 8, themeId: 't2', examples: ['"The user interface is clean and intuitive."'], synonyms: ['connection', 'junction'], antonyms: [], audioUrl: null, imageUrl: null },

    // More Business
    { id: 'v41', word: 'Collaborate', phonetic: '/kəˈlæb.ə.reɪt/', definition: 'To work together with others on a project', definitionVn: 'Cộng tác; làm việc cùng nhau', pos: 'verb', difficulty: 2, frequency: 8, themeId: 't4', examples: ['"The two companies collaborated on the research project."'], synonyms: ['cooperate', 'partner', 'team up'], antonyms: ['compete'], audioUrl: null, imageUrl: null },
    { id: 'v42', word: 'Deadline', phonetic: '/ˈded.laɪn/', definition: 'The latest time by which something must be completed', definitionVn: 'Hạn chót; thời hạn cuối cùng', pos: 'noun', difficulty: 1, frequency: 9, themeId: 't4', examples: ['"We must meet the deadline for the project submission."'], synonyms: ['due date', 'time limit'], antonyms: [], audioUrl: null, imageUrl: null },

    // Sports
    { id: 'v43', word: 'Stamina', phonetic: '/ˈstæm.ɪ.nə/', definition: 'The ability to sustain prolonged physical or mental effort', definitionVn: 'Sức bền; khả năng duy trì nỗ lực kéo dài', pos: 'noun', difficulty: 2, frequency: 6, themeId: 't8', examples: ['"Marathon runners need incredible stamina."'], synonyms: ['endurance', 'staying power'], antonyms: ['weakness'], audioUrl: null, imageUrl: null },
    { id: 'v44', word: 'Tournament', phonetic: '/ˈtɜːr.nə.mənt/', definition: 'A competition involving many contestants', definitionVn: 'Giải đấu; cuộc thi có nhiều người tham gia', pos: 'noun', difficulty: 2, frequency: 7, themeId: 't8', examples: ['"He won the tennis tournament for the third time."'], synonyms: ['championship', 'competition'], antonyms: [], audioUrl: null, imageUrl: null },

    // More daily
    { id: 'v45', word: 'Procrastinate', phonetic: '/proʊˈkræs.tɪ.neɪt/', definition: 'To delay or postpone action; put off doing something', definitionVn: 'Trì hoãn; chần chừ; hoãn lại việc cần làm', pos: 'verb', difficulty: 3, frequency: 6, themeId: 't11', examples: ['"Stop procrastinating and start studying!"'], synonyms: ['delay', 'postpone', 'stall'], antonyms: ['expedite', 'hasten'], audioUrl: null, imageUrl: null },
    { id: 'v46', word: 'Versatile', phonetic: '/ˈvɜːr.sə.t̬əl/', definition: 'Able to adapt to many different functions or activities', definitionVn: 'Đa năng; linh hoạt; có thể thích ứng nhiều vai trò', pos: 'adjective', difficulty: 3, frequency: 7, themeId: 't12', examples: ['"She is a versatile musician who plays multiple instruments."'], synonyms: ['adaptable', 'flexible', 'all-round'], antonyms: ['limited', 'inflexible'], audioUrl: null, imageUrl: null },
    { id: 'v47', word: 'Phenomenon', phonetic: '/fɪˈnɒm.ɪ.nən/', definition: 'A fact or situation that is observed to exist', definitionVn: 'Hiện tượng; sự kiện hoặc tình huống được quan sát', pos: 'noun', difficulty: 3, frequency: 7, themeId: 't12', examples: ['"Climate change is a global phenomenon."'], synonyms: ['occurrence', 'event', 'happening'], antonyms: [], audioUrl: null, imageUrl: null },
    { id: 'v48', word: 'Compromise', phonetic: '/ˈkɒm.prə.maɪz/', definition: 'An agreement reached by each side making concessions', definitionVn: 'Thỏa hiệp; sự nhượng bộ lẫn nhau', pos: 'noun/verb', difficulty: 2, frequency: 8, themeId: 't11', examples: ['"Both sides reached a compromise after lengthy negotiations."'], synonyms: ['agreement', 'settlement', 'deal'], antonyms: ['disagreement', 'dispute'], audioUrl: null, imageUrl: null },
  ],

  // ---- MOCK USERS ----
  users: [
    { id: 'u1', username: 'Aministrator', fullName: 'Vũ Văn Minh', email: 'vuanhtuanfc@gmail.com', level: 11, totalXp: 2850, currentStreak: 15, longestStreak: 30, avatarEmoji: '🦉', bio: 'Founder & Developer of XP Voca 🚀', title: 'Word Wizard', wordsLearned: 245, wordsToReview: 12, minutesStudied: 1240 },
    { id: 'u2', username: 'TuanDepTrai', fullName: 'Nguyễn Tuấn', email: 'tuan@gmail.com', level: 9, totalXp: 830, currentStreak: 7, longestStreak: 21, avatarEmoji: '🐱', bio: 'English learner | Coffee lover ☕', title: 'Vocabulary Master', wordsLearned: 180, wordsToReview: 8, minutesStudied: 920 },
    { id: 'u3', username: 'HoangAnh', fullName: 'Hoàng Anh', email: 'hoanganh@gmail.com', level: 7, totalXp: 620, currentStreak: 3, longestStreak: 14, avatarEmoji: '🌟', bio: 'IELTS 7.0 target 🎯', title: 'Rising Star', wordsLearned: 142, wordsToReview: 15, minutesStudied: 680 },
    { id: 'u4', username: 'MinhThu', fullName: 'Trần Minh Thư', email: 'minhthu@gmail.com', level: 12, totalXp: 3200, currentStreak: 25, longestStreak: 45, avatarEmoji: '🦋', bio: 'English teacher | Passionate about education', title: 'Language Legend', wordsLearned: 380, wordsToReview: 5, minutesStudied: 2100 },
    { id: 'u5', username: 'DucMinh', fullName: 'Lê Đức Minh', email: 'ducminh@gmail.com', level: 5, totalXp: 380, currentStreak: 1, longestStreak: 10, avatarEmoji: '🚀', bio: 'Software developer learning English', title: 'Word Explorer', wordsLearned: 95, wordsToReview: 20, minutesStudied: 420 },
    { id: 'u6', username: 'ThanhHa', fullName: 'Phạm Thanh Hà', email: 'thanhha@gmail.com', level: 8, totalXp: 710, currentStreak: 12, longestStreak: 28, avatarEmoji: '🌸', bio: 'Travel blogger | Words are my passport', title: 'Streak Champion', wordsLearned: 165, wordsToReview: 7, minutesStudied: 850 },
    { id: 'u7', username: 'User', fullName: 'Người dùng', email: 'user@gmail.com', level: 2, totalXp: 150, currentStreak: 2, longestStreak: 5, avatarEmoji: '😊', bio: 'Just started learning!', title: 'Beginner', wordsLearned: 25, wordsToReview: 10, minutesStudied: 120 },
  ],

  // ---- ACHIEVEMENTS ----
  achievements: [
    { id: 'a1', name: 'Bước đầu', nameEn: 'First Steps', icon: '🎓', description: 'Học 10 từ vựng đầu tiên', category: 'learning', condition: { type: 'words_learned', value: 10 }, xpBonus: 50 },
    { id: 'a2', name: '5 Ngày Liên', nameEn: '5 Day Streak', icon: '🔥', description: 'Duy trì streak 5 ngày', category: 'streak', condition: { type: 'streak', value: 5 }, xpBonus: 100 },
    { id: 'a3', name: 'Tuần Chiến', nameEn: 'Week Warrior', icon: '⚔️', description: 'Học 7 ngày liên tiếp', category: 'streak', condition: { type: 'streak', value: 7 }, xpBonus: 150 },
    { id: 'a4', name: 'Bách Từ', nameEn: 'Century', icon: '💯', description: 'Học được 100 từ vựng', category: 'learning', condition: { type: 'words_learned', value: 100 }, xpBonus: 200 },
    { id: 'a5', name: 'Xã Hội', nameEn: 'Social Butterfly', icon: '🦋', description: 'Kết bạn với 5 người', category: 'social', condition: { type: 'friends', value: 5 }, xpBonus: 75 },
    { id: 'a6', name: 'Quiz Master', nameEn: 'Quiz Master', icon: '🧠', description: 'Hoàn thành 50 bài quiz', category: 'practice', condition: { type: 'quizzes', value: 50 }, xpBonus: 150 },
    { id: 'a7', name: 'Siêu Trí Nhớ', nameEn: 'Super Memory', icon: '🏆', description: 'Đạt proficiency 5/5 cho 20 từ', category: 'mastery', condition: { type: 'mastered', value: 20 }, xpBonus: 300 },
    { id: 'a8', name: 'Đêm Trắng', nameEn: 'Night Owl', icon: '🦉', description: 'Học sau 11 giờ đêm', category: 'special', condition: { type: 'time', value: 23 }, xpBonus: 50 },
    { id: 'a9', name: 'Nhà Văn', nameEn: 'Writer', icon: '✍️', description: 'Viết 10 bài đăng cộng đồng', category: 'social', condition: { type: 'posts', value: 10 }, xpBonus: 100 },
    { id: 'a10', name: 'Tháng Liên', nameEn: '30 Day Streak', icon: '👑', description: 'Streak 30 ngày liên tiếp', category: 'streak', condition: { type: 'streak', value: 30 }, xpBonus: 500 },
    { id: 'a11', name: 'Khám Phá', nameEn: 'Explorer', icon: '🗺️', description: 'Học từ vựng từ 5 chủ đề khác nhau', category: 'learning', condition: { type: 'themes', value: 5 }, xpBonus: 100 },
    { id: 'a12', name: 'AI Friend', nameEn: 'AI Friend', icon: '🤖', description: 'Trò chuyện với AI 10 lần', category: 'special', condition: { type: 'ai_chats', value: 10 }, xpBonus: 75 },
  ],

  // ---- DAILY CHALLENGES ----
  dailyChallenges: [
    { id: 'dc1', type: 'learn', title: 'Học 10 từ mới', description: 'Học ít nhất 10 từ vựng mới hôm nay', requiredCount: 10, xpReward: 50, bonusXp: 20, icon: '📖' },
    { id: 'dc2', type: 'quiz', title: 'Hoàn thành 3 bài quiz', description: 'Làm 3 bài trắc nghiệm từ vựng', requiredCount: 3, xpReward: 40, bonusXp: 15, icon: '📝' },
    { id: 'dc3', type: 'review', title: 'Ôn tập 15 từ', description: 'Ôn lại 15 từ đã học trước đó', requiredCount: 15, xpReward: 30, bonusXp: 10, icon: '🔄' },
    { id: 'dc4', type: 'social', title: 'Đăng 1 bài viết', description: 'Chia sẻ tiến độ hoặc từ vựng yêu thích', requiredCount: 1, xpReward: 20, bonusXp: 10, icon: '💬' },
  ],

  // ---- COMMUNITY POSTS ----
  posts: [
    {
      id: 'p1', userId: 'u4', content: 'Hôm nay mình đã học xong chủ đề Business! 🎉 Từ "Stakeholder" thật sự rất quan trọng trong công việc. Các bạn đã học từ này chưa?',
      vocabIds: ['v19'], postType: 'achievement', likesCount: 24, commentsCount: 8, sharesCount: 3, viewsCount: 156,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      comments: [
        { id: 'c1', userId: 'u2', content: 'Hay quá chị! Mình cũng đang học chủ đề này 💪', likesCount: 3, createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000) },
        { id: 'c2', userId: 'u6', content: 'Stakeholder là từ mình hay gặp trong meetings. Rất hữu ích!', likesCount: 5, createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      ]
    },
    {
      id: 'p2', userId: 'u1', content: '🔥 15 ngày streak rồi! Cảm ơn XP Voca đã giúp mình duy trì thói quen học từ vựng mỗi ngày. Tip của mình: hãy học vào buổi sáng, khi đầu óc còn tỉnh táo nhất!',
      vocabIds: [], postType: 'streak', likesCount: 42, commentsCount: 12, sharesCount: 7, viewsCount: 289,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      comments: [
        { id: 'c3', userId: 'u3', content: 'Mình cũng đang cố gắng duy trì streak! 🔥', likesCount: 2, createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) },
      ]
    },
    {
      id: 'p3', userId: 'u6', content: 'Từ "Wanderlust" - niềm khao khát được đi du lịch. Đây là từ mô tả chính xác cảm xúc của mình lúc này! ✈️🌏\n\nVí dụ: "My wanderlust drives me to explore new countries every year."',
      vocabIds: ['v1'], postType: 'vocab_share', likesCount: 31, commentsCount: 6, sharesCount: 5, viewsCount: 198,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      comments: []
    },
    {
      id: 'p4', userId: 'u2', content: 'Vừa hoàn thành quiz chủ đề Technology với 100% đúng! 🎯 AI và Blockchain là hai từ mình hay nhầm nhất nhưng cuối cùng cũng nhớ được rồi.',
      vocabIds: ['v10', 'v39'], postType: 'quiz_result', likesCount: 18, commentsCount: 4, sharesCount: 2, viewsCount: 120,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      comments: []
    },
    {
      id: 'p5', userId: 'u3', content: 'Mẹo học từ vựng hiệu quả:\n1. 📝 Viết từ ra giấy 3 lần\n2. 🗣️ Đọc to phiên âm\n3. ✍️ Tạo câu ví dụ của riêng bạn\n4. 🔄 Ôn lại sau 1 ngày, 3 ngày, 7 ngày\n\nAi có mẹo hay hơn không chia sẻ cùng mình nhé! 😊',
      vocabIds: [], postType: 'tip', likesCount: 56, commentsCount: 15, sharesCount: 12, viewsCount: 423,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      comments: []
    },
  ],

  // ---- STUDY GROUPS ----
  studyGroups: [
    { id: 'g1', name: 'IELTS Warriors', description: 'Nhóm luyện từ vựng IELTS band 7.0+', avatarEmoji: '🎯', themeId: 't12', memberCount: 28, maxMembers: 50, isPrivate: false, createdBy: 'u4' },
    { id: 'g2', name: 'Tech Vocab Club', description: 'Học từ vựng công nghệ cho developers', avatarEmoji: '💻', themeId: 't2', memberCount: 15, maxMembers: 30, isPrivate: false, createdBy: 'u1' },
    { id: 'g3', name: 'Business English Pro', description: 'Tiếng Anh thương mại cho dân công sở', avatarEmoji: '💼', themeId: 't4', memberCount: 32, maxMembers: 50, isPrivate: false, createdBy: 'u6' },
    { id: 'g4', name: 'Daily English Chat', description: 'Nói tiếng Anh mỗi ngày, không ngại sai!', avatarEmoji: '💬', themeId: 't11', memberCount: 45, maxMembers: 100, isPrivate: false, createdBy: 'u2' },
  ],

  // ---- AI CHAT TOPICS ----
  aiTopics: [
    { id: 'at1', name: 'Gọi đồ ăn', nameEn: 'Ordering Food', icon: '🍕', description: 'Luyện đặt món tại nhà hàng', level: 'Beginner' },
    { id: 'at2', name: 'Phỏng vấn xin việc', nameEn: 'Job Interview', icon: '💼', description: 'Chuẩn bị cho buổi phỏng vấn', level: 'Intermediate' },
    { id: 'at3', name: 'Du lịch', nameEn: 'Traveling', icon: '✈️', description: 'Hỏi đường, đặt khách sạn', level: 'Beginner' },
    { id: 'at4', name: 'Thảo luận công nghệ', nameEn: 'Tech Discussion', icon: '🤖', description: 'Nói về AI, blockchain, apps', level: 'Advanced' },
    { id: 'at5', name: 'Kể về sở thích', nameEn: 'Talking About Hobbies', icon: '🎨', description: 'Chia sẻ sở thích cá nhân', level: 'Beginner' },
    { id: 'at6', name: 'Thuyết trình', nameEn: 'Giving Presentations', icon: '📊', description: 'Luyện thuyết trình bằng tiếng Anh', level: 'Advanced' },
  ],

  // ---- AI SAMPLE CONVERSATIONS ----
  aiResponses: {
    greeting: [
      "Hello! 👋 I'm XP AI, your English practice buddy. What would you like to talk about today?",
      "Hi there! Ready to practice some English? Pick a topic or just start chatting!",
      "Welcome back! 🌟 Your English is getting better every day. Let's keep practicing!",
    ],
    orderingFood: [
      "Welcome to the restaurant! 🍽️ I'll be your waiter today. Would you like to see our menu?",
      "Great choice! Our special today is grilled salmon with roasted vegetables. Would you like to try it?",
      "Excellent! And what would you like to drink? We have freshly squeezed juices and a variety of teas.",
    ],
    jobInterview: [
      "Welcome! Please take a seat. Let's start with a common interview question: Can you tell me about yourself?",
      "That's a great answer! Now, what would you say is your greatest strength?",
      "Interesting! Can you give me an example of a challenging situation you've faced at work?",
    ],
  },

  // ---- LEVEL TITLES ----
  levelTitles: {
    1: 'Newbie',
    2: 'Beginner',
    3: 'Learner',
    4: 'Student',
    5: 'Word Explorer',
    6: 'Vocabulary Builder',
    7: 'Rising Star',
    8: 'Word Crafter',
    9: 'Vocabulary Master',
    10: 'Word Wizard',
    11: 'Word Wizard',
    12: 'Language Legend',
    13: 'Language Legend',
    14: 'Vocabulary Sage',
    15: 'Grandmaster',
  },

  // XP required for each level
  levelXp: [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200, 7600, 9200, 11000],

  // ---- NOTIFICATION SAMPLES ----
  notifications: [
    { id: 'n1', type: 'achievement', title: 'Thành tựu mới!', body: 'Bạn đã đạt được "5 Ngày Liên"! +100 XP', icon: '🏆', isRead: false, createdAt: new Date(Date.now() - 30 * 60 * 1000) },
    { id: 'n2', type: 'friend', title: 'Lời mời kết bạn', body: 'HoangAnh muốn kết bạn với bạn', icon: '👋', isRead: false, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 'n3', type: 'reminder', title: 'Đừng quên ôn tập!', body: 'Bạn có 12 từ cần ôn lại hôm nay', icon: '📚', isRead: true, createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
    { id: 'n4', type: 'social', title: 'MinhThu đã thích bài viết của bạn', body: '"🔥 15 ngày streak rồi!..."', icon: '❤️', isRead: true, createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000) },
    { id: 'n5', type: 'level', title: 'Level Up!', body: 'Chúc mừng bạn đã lên Level 11! 🎉', icon: '⭐', isRead: true, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  ],
};
