import sys, json, re

sys.stdout.reconfigure(encoding='utf-8')

# Load calibrated segments
with open('scripts/ted_bilingual_39_calibrated.json', 'r', encoding='utf-8') as f:
    segments = json.load(f)

quiz_data = {
    "lessonId": "vid_ted_bilingual_brain",
    "lessonTitle": "TED-Ed: The Benefits of a Bilingual Brain",
    "totalQuestions": 8,
    "xpReward": 40,
    "questions": [
        {
            "id": "q_ted_bilingual_1",
            "question": "According to the opening of the video, what demographic reality is highlighted if a viewer understands Spanish, French, or Mandarin and watches the video in English?",
            "questionEn": "According to the opening of the video, what demographic reality is highlighted if a viewer understands Spanish, French, or Mandarin and watches the video in English?",
            "questionVi": "Theo phần mở đầu của video, thực tế nhân khẩu học nào được nhấn mạnh nếu người xem hiểu tiếng Tây Ban Nha, Pháp hoặc Quan Thoại và đang theo dõi video bằng tiếng Anh?",
            "options": [
                "They are exceptionally rare outliers because over 90% of the world's population is strictly monolingual.",
                "They likely belong to the global majority of people who are bilingual or multilingual.",
                "They are classified as professional certified translators by international linguistic organizations.",
                "They have achieved perfect fluency in all six official languages of the United Nations."
            ],
            "optionsEn": [
                "They are exceptionally rare outliers because over 90% of the world's population is strictly monolingual.",
                "They likely belong to the global majority of people who are bilingual or multilingual.",
                "They are classified as professional certified translators by international linguistic organizations.",
                "They have achieved perfect fluency in all six official languages of the United Nations."
            ],
            "optionsVi": [
                "Họ là những trường hợp ngoại lệ hiếm hoi vì hơn 90% dân số thế giới hoàn toàn chỉ nói một thứ tiếng.",
                "Họ rất có khả năng thuộc về bộ phận đa số trên thế giới gồm những người song ngữ hoặc đa ngôn ngữ.",
                "Họ được các tổ chức ngôn ngữ quốc tế xếp loại là những biên dịch viên chuyên nghiệp được chứng nhận.",
                "Họ đã đạt được sự thông thạo hoàn hảo trong cả sáu ngôn ngữ chính thức của Liên Hợp Quốc."
            ],
            "correctAnswer": 1,
            "explanation": "In Segment 2, the narrator notes: 'chances are you belong to the world's bilingual and multilingual majority.'",
            "explanationEn": "In Segment 2, the narrator notes: 'chances are you belong to the world's bilingual and multilingual majority.'",
            "explanationVi": "Trong câu 2, người thuyết minh chỉ ra: 'rất có thể bạn thuộc về bộ phận đa số những người song ngữ và đa ngôn ngữ trên thế giới.'",
            "referenceSegmentIndex": 2,
            "targetedConcept": "Nhân khẩu học đa ngôn ngữ & Đa số toàn cầu (Multilingual Demographics & Global Majority)",
            "targetedConceptEn": "Multilingual Demographics & Global Majority",
            "targetedConceptVi": "Nhân khẩu học đa ngôn ngữ & Đa số toàn cầu"
        },
        {
            "id": "q_ted_bilingual_2",
            "question": "How does the lecture contrast a 'balanced bilingual' with the majority of bilingual people worldwide?",
            "questionEn": "How does the lecture contrast a 'balanced bilingual' with the majority of bilingual people worldwide?",
            "questionVi": "Bài giảng so sánh sự khác biệt giữa một 'người song ngữ cân bằng' với đa số người nói song ngữ trên toàn thế giới như thế nào?",
            "options": [
                "A balanced bilingual possesses near equal abilities across speaking, writing, listening, and reading, whereas most bilinguals know and use their languages in varying proportions.",
                "Balanced bilinguals only communicate through sign language, whereas ordinary bilinguals rely entirely on written literature.",
                "A balanced bilingual completely forgets their native dialect every five years to accommodate new grammatical syntax.",
                "Ordinary bilinguals must pass standardized governmental examinations annually to maintain their legal multilingual status."
            ],
            "optionsEn": [
                "A balanced bilingual possesses near equal abilities across speaking, writing, listening, and reading, whereas most bilinguals know and use their languages in varying proportions.",
                "Balanced bilinguals only communicate through sign language, whereas ordinary bilinguals rely entirely on written literature.",
                "A balanced bilingual completely forgets their native dialect every five years to accommodate new grammatical syntax.",
                "Ordinary bilinguals must pass standardized governmental examinations annually to maintain their legal multilingual status."
            ],
            "optionsVi": [
                "Người song ngữ cân bằng sở hữu năng lực gần như tương đương ở cả 4 kỹ năng (nói, viết, nghe, đọc), trong khi hầu hết người song ngữ sử dụng các ngôn ngữ theo những tỷ lệ khác nhau.",
                "Người song ngữ cân bằng chỉ giao tiếp qua thủ ngữ, trong khi người song ngữ thông thường chỉ dựa vào văn bản viết.",
                "Người song ngữ cân bằng quên hoàn toàn tiếng mẹ đẻ cứ mỗi 5 năm một lần để tiếp thu cú pháp ngữ pháp mới.",
                "Người song ngữ thông thường bắt buộc phải thi đỗ các kỳ thi chính phủ hàng năm để duy trì tình trạng đa ngôn ngữ hợp pháp."
            ],
            "correctAnswer": 0,
            "explanation": "In Segments 7 & 8, the narrator explains that while a balanced bilingual has near equal abilities across the board in two languages, most bilinguals around the world know and use their languages in varying proportions.",
            "explanationEn": "In Segments 7 & 8, the narrator explains that while a balanced bilingual has near equal abilities across the board in two languages, most bilinguals around the world know and use their languages in varying proportions.",
            "explanationVi": "Trong câu 7 & 8, người thuyết minh giải thích rằng trong khi người song ngữ cân bằng có năng lực gần như đồng đều ở cả hai ngôn ngữ, đa số người song ngữ trên thế giới sử dụng các ngôn ngữ theo những tỷ lệ khác nhau.",
            "referenceSegmentIndex": 8,
            "targetedConcept": "Phân loại mức độ năng lực ngôn ngữ & Tỷ lệ sử dụng thực tế (Linguistic Competence Proportions & Real-World Usage)",
            "targetedConceptEn": "Linguistic Competence Proportions & Real-World Usage",
            "targetedConceptVi": "Phân loại mức độ năng lực ngôn ngữ & Tỷ lệ sử dụng thực tế"
        },
        {
            "id": "q_ted_bilingual_3",
            "question": "How are Gabriella, her teenage brother, and her parents categorized based on how they acquired their secondary language?",
            "questionEn": "How are Gabriella, her teenage brother, and her parents categorized based on how they acquired their secondary language?",
            "questionVi": "Gabriella, người anh trai và cha mẹ của cô bé được phân loại như thế nào dựa trên phương thức họ tiếp thu ngôn ngữ thứ hai?",
            "options": [
                "Gabriella is a compound bilingual (single conceptual set), her brother is coordinate (two conceptual sets), and her parents are subordinate (filtering through primary language).",
                "Gabriella is a subordinate bilingual, her brother is monolingual, and her parents are artificial intelligence translators.",
                "All family members are strictly coordinate bilinguals because they emigrated during the exact same calendar year.",
                "Gabriella is an academic linguist, while her parents and brother refuse to utilize verbal communication outside Peru."
            ],
            "optionsEn": [
                "Gabriella is a compound bilingual (single conceptual set), her brother is coordinate (two conceptual sets), and her parents are subordinate (filtering through primary language).",
                "Gabriella is a subordinate bilingual, her brother is monolingual, and her parents are artificial intelligence translators.",
                "All family members are strictly coordinate bilinguals because they emigrated during the exact same calendar year.",
                "Gabriella is an academic linguist, while her parents and brother refuse to utilize verbal communication outside Peru."
            ],
            "optionsVi": [
                "Gabriella là người song ngữ phức hợp (chung 1 hệ khái niệm), anh trai là song ngữ tọa độ (2 hệ khái niệm tách biệt), và cha mẹ là song ngữ phụ thuộc (lọc qua tiếng mẹ đẻ).",
                "Gabriella là người song ngữ phụ thuộc, anh trai là người đơn ngữ, và cha mẹ là các biên dịch viên trí tuệ nhân tạo.",
                "Tất cả các thành viên đều là người song ngữ tọa độ vì họ cùng di cư trong cùng một năm.",
                "Gabriella là nhà ngôn ngữ học hàn lâm, trong khi cha mẹ và anh trai từ chối giao tiếp bằng lời nói bên ngoài Peru."
            ],
            "correctAnswer": 0,
            "explanation": "In Segments 11-15, the narrator delineates compound bilingualism (simultaneous acquisition with a single conceptual set), coordinate bilingualism (separate conceptual sets for school vs. home), and subordinate bilingualism (filtering secondary language through primary language).",
            "explanationEn": "In Segments 11-15, the narrator delineates compound bilingualism (simultaneous acquisition with a single conceptual set), coordinate bilingualism (separate conceptual sets for school vs. home), and subordinate bilingualism (filtering secondary language through primary language).",
            "explanationVi": "Trong các câu 11-15, người thuyết minh phân biệt rõ: song ngữ phức hợp (học đồng thời với một hệ khái niệm duy nhất), song ngữ tọa độ (hai hệ khái niệm riêng biệt cho trường học và gia đình), và song ngữ phụ thuộc (lọc ngôn ngữ thứ hai qua tiếng mẹ đẻ).",
            "referenceSegmentIndex": 15,
            "targetedConcept": "Ba nhóm người song ngữ: Phức hợp, Tọa độ và Phụ thuộc (Three Bilingual Types: Compound, Coordinate, and Subordinate)",
            "targetedConceptEn": "Three Bilingual Types: Compound, Coordinate, and Subordinate",
            "targetedConceptVi": "Ba nhóm người song ngữ: Phức hợp, Tọa độ và Phụ thuộc"
        },
        {
            "id": "q_ted_bilingual_4",
            "question": "According to the critical period hypothesis, why do children learn languages more easily than adults?",
            "questionEn": "According to the critical period hypothesis, why do children learn languages more easily than adults?",
            "questionVi": "Theo giả thuyết về giai đoạn then chốt, tại sao trẻ em lại học ngôn ngữ dễ dàng hơn so với người trưởng thành?",
            "options": [
                "Children spend over eighteen hours every day memorizing bilingual dictionaries under mandatory schooling laws.",
                "The plasticity of developing brains enables children to use both hemispheres in language acquisition, whereas adult language is predominantly lateralized to the left hemisphere.",
                "Children possess higher concentrations of calcium in their eardrums, allowing them to hear phonemes that adults cannot detect.",
                "Adults completely lose their neurological capacity for analytical reasoning upon reaching eighteen years of age."
            ],
            "optionsEn": [
                "Children spend over eighteen hours every day memorizing bilingual dictionaries under mandatory schooling laws.",
                "The plasticity of developing brains enables children to use both hemispheres in language acquisition, whereas adult language is predominantly lateralized to the left hemisphere.",
                "Children possess higher concentrations of calcium in their eardrums, allowing them to hear phonemes that adults cannot detect.",
                "Adults completely lose their neurological capacity for analytical reasoning upon reaching eighteen years of age."
            ],
            "optionsVi": [
                "Trẻ em dành hơn 18 giờ mỗi ngày để học thuộc lòng từ điển song ngữ theo luật phổ cập giáo dục bắt buộc.",
                "Tính mềm dẻo của bộ não đang phát triển cho phép trẻ em sử dụng cả hai bán cầu não để tiếp thu ngôn ngữ, trong khi ở người lớn ngôn ngữ đã bị chuyên biệt hóa chủ yếu về bán cầu trái.",
                "Trẻ em sở hữu nồng độ canxi cao hơn trong màng nhĩ, cho phép chúng nghe được các âm vị mà người lớn không thể phát hiện.",
                "Người lớn mất hoàn toàn khả năng tư duy phân tích thần kinh ngay khi bước sang tuổi 18."
            ],
            "correctAnswer": 1,
            "explanation": "In Segments 21 & 22, the narrator explains that children learn languages more easily because the plasticity of developing brains lets them use both hemispheres in acquisition, while adult language is lateralized usually to the left hemisphere.",
            "explanationEn": "In Segments 21 & 22, the narrator explains that children learn languages more easily because the plasticity of developing brains lets them use both hemispheres in acquisition, while adult language is lateralized usually to the left hemisphere.",
            "explanationVi": "Trong các câu 21 & 22, người thuyết minh giải thích rằng trẻ em học dễ hơn nhờ tính mềm dẻo của não bộ đang phát triển cho phép dùng cả hai bán cầu não, trong khi ở người lớn ngôn ngữ thường bị khu biệt hóa về bán cầu trái.",
            "referenceSegmentIndex": 21,
            "targetedConcept": "Giả thuyết giai đoạn then chốt & Tính mềm dẻo của não bộ (Critical Period Hypothesis & Neural Plasticity)",
            "targetedConceptEn": "Critical Period Hypothesis & Neural Plasticity",
            "targetedConceptVi": "Giả thuyết giai đoạn then chốt & Tính mềm dẻo của não bộ"
        },
        {
            "id": "q_ted_bilingual_5",
            "question": "What surprising psychological advantage do adults who learn a second language later in life exhibit when confronting problems?",
            "questionEn": "What surprising psychological advantage do adults who learn a second language later in life exhibit when confronting problems?",
            "questionVi": "Lợi thế tâm lý bất ngờ nào xuất hiện ở những người học ngôn ngữ thứ hai khi đã trưởng thành khi họ đối mặt với các vấn đề?",
            "options": [
                "They exhibit less emotional bias and apply a more rational approach when solving problems in their second language than in their native tongue.",
                "They experience heightened emotional panic and require hypnotic therapy before making everyday financial decisions.",
                "They make decisions significantly faster by simply flipping a coin and translating the outcome into Latin.",
                "They permanently forget all personal childhood memories whenever they speak their secondary language."
            ],
            "optionsEn": [
                "They exhibit less emotional bias and apply a more rational approach when solving problems in their second language than in their native tongue.",
                "They experience heightened emotional panic and require hypnotic therapy before making everyday financial decisions.",
                "They make decisions significantly faster by simply flipping a coin and translating the outcome into Latin.",
                "They permanently forget all personal childhood memories whenever they speak their secondary language."
            ],
            "optionsVi": [
                "Họ thể hiện ít thiên kiến cảm xúc hơn và áp dụng cách tiếp cận hợp lý, duy lý hơn khi giải quyết vấn đề bằng ngôn ngữ thứ hai so với tiếng mẹ đẻ.",
                "Họ trải qua sự hoảng loạn cảm xúc tột độ và cần trị liệu thôi miên trước khi đưa ra các quyết định tài chính hàng ngày.",
                "Họ đưa ra quyết định nhanh hơn đáng kể bằng cách tung đồng xu và dịch kết quả sang tiếng Latinh.",
                "Họ quên vĩnh viễn mọi ký ức thời thơ ấu mỗi khi nói ngôn ngữ thứ hai của mình."
            ],
            "correctAnswer": 0,
            "explanation": "In Segments 24 & 25, the narrator highlights research showing that people who learned a second language in adulthood exhibit less emotional bias and a more rational approach when confronting problems in the second language.",
            "explanationEn": "In Segments 24 & 25, the narrator highlights research showing that people who learned a second language in adulthood exhibit less emotional bias and a more rational approach when confronting problems in the second language.",
            "explanationVi": "Trong các câu 24 & 25, người thuyết minh dẫn chứng nghiên cứu cho thấy những người học ngoại ngữ khi trưởng thành ít bị chi phối bởi thiên kiến cảm xúc và có cách tiếp cận duy lý hơn khi giải quyết vấn đề bằng ngôn ngữ thứ hai.",
            "referenceSegmentIndex": 24,
            "targetedConcept": "Hiệu ứng ngoại ngữ: Giảm thiên kiến cảm xúc & Tư duy duy lý (The Foreign Language Effect: Rationality & Reduced Emotional Bias)",
            "targetedConceptEn": "The Foreign Language Effect: Rationality & Reduced Emotional Bias",
            "targetedConceptVi": "Hiệu ứng ngoại ngữ: Giảm thiên kiến cảm xúc & Tư duy duy lý"
        },
        {
            "id": "q_ted_bilingual_6",
            "question": "What physiological and neurological health benefits are associated with lifelong bilingual brain activity?",
            "questionEn": "What physiological and neurological health benefits are associated with lifelong bilingual brain activity?",
            "questionVi": "Những lợi ích sức khỏe thể chất và thần kinh nào gắn liền với hoạt động não bộ song ngữ suốt đời?",
            "options": [
                "Higher density of grey matter (neurons and synapses) and delaying the onset of neurodegenerative diseases like Alzheimer's and dementia by up to five years.",
                "Immediate genetic immunity against all bacterial infections and doubling human lifespan to two hundred years.",
                "Complete elimination of normal sleep requirements because the brain regenerates continuously while translating speech.",
                "Permanent expansion of the vocal cords enabling perfect operatic singing in multiple octaves."
            ],
            "optionsEn": [
                "Higher density of grey matter (neurons and synapses) and delaying the onset of neurodegenerative diseases like Alzheimer's and dementia by up to five years.",
                "Immediate genetic immunity against all bacterial infections and doubling human lifespan to two hundred years.",
                "Complete elimination of normal sleep requirements because the brain regenerates continuously while translating speech.",
                "Permanent expansion of the vocal cords enabling perfect operatic singing in multiple octaves."
            ],
            "optionsVi": [
                "Mật độ chất xám (tế bào thần kinh và khớp nối synap) dày đặc hơn và trì hoãn sự khởi phát của các bệnh thoái hóa thần kinh như Alzheimer và sa sút trí tuệ lên tới 5 năm.",
                "Miễn dịch di truyền tức thì chống lại mọi bệnh nhiễm khuẩn và tăng gấp đôi tuổi thọ con người lên 200 tuổi.",
                "Loại bỏ hoàn toàn nhu cầu ngủ thông thường vì não bộ tự tái tạo liên tục trong khi dịch lời nói.",
                "Mở rộng vĩnh viễn dây thanh âm cho phép hát opera hoàn hảo ở nhiều quãng tám."
            ],
            "correctAnswer": 0,
            "explanation": "In Segments 27-29, the narrator reveals visible physical changes like higher density of grey matter containing neurons and synapses, and delaying the onset of diseases like Alzheimer's and dementia by as much as five years.",
            "explanationEn": "In Segments 27-29, the narrator reveals visible physical changes like higher density of grey matter containing neurons and synapses, and delaying the onset of diseases like Alzheimer's and dementia by as much as five years.",
            "explanationVi": "Trong các câu 27-29, người thuyết minh tiết lộ các biến đổi giải phẫu có thể nhìn thấy như mật độ chất xám cao hơn (chứa nơ-ron và xi-náp), cùng khả năng trì hoãn khởi phát bệnh Alzheimer và sa sút trí tuệ lên tới 5 năm.",
            "referenceSegmentIndex": 29,
            "targetedConcept": "Mật độ chất xám & Trì hoãn bệnh Alzheimer và sa sút trí tuệ (Grey Matter Density & Delaying Neurodegenerative Diseases)",
            "targetedConceptEn": "Grey Matter Density & Delaying Neurodegenerative Diseases",
            "targetedConceptVi": "Mật độ chất xám & Trì hoãn bệnh Alzheimer và sa sút trí tuệ"
        },
        {
            "id": "q_ted_bilingual_7",
            "question": "How was bilingualism viewed by experts prior to the 1960s, and why was that perspective debunked?",
            "questionEn": "How was bilingualism viewed by experts prior to the 1960s, and why was that perspective debunked?",
            "questionVi": "Trước thập niên 1960, các chuyên gia từng nhìn nhận hiện tượng song ngữ như thế nào, và tại sao quan điểm đó bị bác bỏ?",
            "options": [
                "It was considered a severe handicap that slowed a child's development by exhausting energy distinguishing between languages, a view based on flawed studies.",
                "It was celebrated as the sole prerequisite for entering presidential politics across Western Europe.",
                "It was deemed an illegal supernatural ability that violated medical licensing regulations.",
                "It was recommended exclusively for naval navigators communicating across oceanic radio frequencies."
            ],
            "optionsEn": [
                "It was considered a severe handicap that slowed a child's development by exhausting energy distinguishing between languages, a view based on flawed studies.",
                "It was celebrated as the sole prerequisite for entering presidential politics across Western Europe.",
                "It was deemed an illegal supernatural ability that violated medical licensing regulations.",
                "It was recommended exclusively for naval navigators communicating across oceanic radio frequencies."
            ],
            "optionsVi": [
                "Nó từng bị coi là một bất lợi nghiêm trọng làm chậm sự phát triển của trẻ do tiêu hao năng lượng để phân biệt ngôn ngữ, một quan điểm dựa trên các nghiên cứu sai lệch.",
                "Nó từng được ca ngợi là điều kiện tiên quyết duy nhất để tham gia chính trường tổng thống ở Tây Âu.",
                "Nó từng bị coi là một năng lực siêu nhiên bất hợp pháp vi phạm các quy định hành nghề y tế.",
                "Nó từng chỉ được khuyến nghị riêng cho các hoa tiêu hàng hải giao tiếp qua tần số vô tuyến đại dương."
            ],
            "correctAnswer": 0,
            "explanation": "In Segments 31 & 32, the narrator notes: 'Before the 1960s, bilingualism was considered a handicap that slowed a child's development by forcing them to spend too much energy distinguishing between languages, a view based largely on flawed studies.'",
            "explanationEn": "In Segments 31 & 32, the narrator notes: 'Before the 1960s, bilingualism was considered a handicap that slowed a child's development by forcing them to spend too much energy distinguishing between languages, a view based largely on flawed studies.'",
            "explanationVi": "Trong các câu 31 & 32, người thuyết minh ghi nhận: 'Trước những năm 1960, song ngữ từng bị coi là một bất lợi làm chậm sự phát triển của trẻ nhỏ do ép buộc tiêu tốn quá nhiều năng lượng để phân biệt các ngôn ngữ, một quan điểm dựa trên các nghiên cứu sai sót.'",
            "referenceSegmentIndex": 31,
            "targetedConcept": "Định kiến lịch sử trước thập niên 1960 & Nghiên cứu sai lệch (Historical Pre-1960s Misconception & Flawed Studies)",
            "targetedConceptEn": "Historical Pre-1960s Misconception & Flawed Studies",
            "targetedConceptVi": "Định kiến lịch sử trước thập niên 1960 & Nghiên cứu sai lệch"
        },
        {
            "id": "q_ted_bilingual_8",
            "question": "Which brain region is strengthened by the mental effort of switching between languages, and what cognitive faculties does it govern?",
            "questionEn": "Which brain region is strengthened by the mental effort of switching between languages, and what cognitive faculties does it govern?",
            "questionVi": "Vùng não nào được củng cố nhờ nỗ lực trí tuệ khi chuyển đổi giữa các ngôn ngữ, và nó chi phối những năng lực nhận thức nào?",
            "options": [
                "The dorsolateral prefrontal cortex, which plays a major role in executive function, problem solving, task switching, and filtering irrelevant distractions.",
                "The occipital lobe, which exclusively manages microscopic nocturnal vision and ultraviolet light absorption.",
                "The cerebellum, which is restricted solely to regulating involuntary respiratory reflexes and core body temperature.",
                "The pituitary gland, which produces growth hormones exclusively during mathematical examinations."
            ],
            "optionsEn": [
                "The dorsolateral prefrontal cortex, which plays a major role in executive function, problem solving, task switching, and filtering irrelevant distractions.",
                "The occipital lobe, which exclusively manages microscopic nocturnal vision and ultraviolet light absorption.",
                "The cerebellum, which is restricted solely to regulating involuntary respiratory reflexes and core body temperature.",
                "The pituitary gland, which produces growth hormones exclusively during mathematical examinations."
            ],
            "optionsVi": [
                "Vỏ não trước trán lưng bên (DLPFC), đóng vai trò quan trọng trong chức năng điều hành, giải quyết vấn đề, chuyển đổi tác vụ và lọc bỏ các xao nhãng gây nhiễu.",
                "Thùy chẩm, vùng chỉ chuyên quản lý thị lực ban đêm hiển vi và hấp thụ tia cực tím.",
                "Tiểu não, vùng chỉ giới hạn trong việc điều hòa phản xạ hô hấp không tự chủ và nhiệt độ cơ thể.",
                "Tuyến yên, nơi sản sinh hormone tăng trưởng chỉ riêng trong các kỳ thi toán học."
            ],
            "correctAnswer": 0,
            "explanation": "In Segments 34 & 35, the narrator explains that switching languages strengthens the dorsolateral prefrontal cortex, which controls executive function, problem solving, task switching, and focusing while filtering irrelevant information.",
            "explanationEn": "In Segments 34 & 35, the narrator explains that switching languages strengthens the dorsolateral prefrontal cortex, which controls executive function, problem solving, task switching, and focusing while filtering irrelevant information.",
            "explanationVi": "Trong các câu 34 & 35, người thuyết minh giải thích rằng việc chuyển đổi ngôn ngữ củng cố vỏ não trước trán lưng bên, phần não chỉ huy chức năng điều hành, giải quyết vấn đề, chuyển đổi tác vụ và tập trung lọc bỏ thông tin gây nhiễu.",
            "referenceSegmentIndex": 35,
            "targetedConcept": "Vỏ não trước trán lưng bên & Chức năng điều hành cấp cao (Dorsolateral Prefrontal Cortex & Executive Function)",
            "targetedConceptEn": "Dorsolateral Prefrontal Cortex & Executive Function",
            "targetedConceptVi": "Vỏ não trước trán lưng bên & Chức năng điều hành cấp cao"
        }
    ],
    "generatedBy": "CONTEXTUAL_FALLBACK"
}

# Generate TypeScript code
ts_code = 'import { MockVideoLesson, VideoQuizData } from "../types";\n\n'
ts_code += '/**\n * Bilingual Contextual Reading Comprehension Quiz for TED-Ed: The Benefits of a Bilingual Brain\n */\n'
ts_code += 'export const QUIZ_TED_BILINGUAL_BRAIN: VideoQuizData = ' + json.dumps(quiz_data, ensure_ascii=False, indent=2) + ';\n\n'

lesson_data = {
    "id": "vid_ted_bilingual_brain",
    "slug": "ted-ed-benefits-of-a-bilingual-brain",
    "title": "TED-Ed: The Benefits of a Bilingual Brain",
    "description": "Khám phá cách não bộ xử lý đa ngôn ngữ giúp cải thiện trí nhớ, tăng khả năng tập trung và làm chậm quá trình lão hóa nhận thức qua bài giảng TED-Ed của Mia Nacamulli.",
    "sourceType": "YOUTUBE",
    "externalId": "MMmOLN5zBLY",
    "thumbnailUrl": "https://img.youtube.com/vi/MMmOLN5zBLY/hqdefault.jpg",
    "durationSeconds": 304,
    "durationFormatted": "05:04",
    "cefrLevel": "B2",
    "supportedTypes": "BOTH",
    "categoryId": "cat_ted_ed",
    "categorySlug": "ted-ed",
    "categoryName": "TED-Ed & Tư Duy Sâu",
    "accent": "en-US",
    "wpmSpeed": 141,
    "viewCount": 18299706,
    "studyCount": 14200,
    "quiz": "PLACEHOLDER_QUIZ",
    "segments": segments
}

lesson_json = json.dumps(lesson_data, ensure_ascii=False, indent=2)
# Replace placeholder quiz
lesson_json = lesson_json.replace('"PLACEHOLDER_QUIZ"', 'QUIZ_TED_BILINGUAL_BRAIN')

ts_code += '/**\n * TED-Ed: The Benefits of a Bilingual Brain\n * Slug: ted-ed-benefits-of-a-bilingual-brain\n * External ID: MMmOLN5zBLY (18.299.706 views | 304s / 05:04)\n * 100% Calibrated Verbatim from YouTube Audio & Official Subtitles (39 Pure Master Segments | 715 Words | 0 Diffs)\n */\n'
ts_code += f'export const LESSON_TED_BILINGUAL_BRAIN: MockVideoLesson = {lesson_json};\n'

with open('features/listening/data/lessons/lesson_ted_bilingual_brain.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("lesson_ted_bilingual_brain.ts successfully generated!")
print(f"Total segments: {len(segments)}")
print("Duration: 304s (05:04)")
print("Quiz: 8 CEFR B2 Questions")
