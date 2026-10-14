import json

def generate_ts():
    with open('scripts/jensen_huang_master_31_segments.json', 'r', encoding='utf-8') as f:
        segments = json.load(f)

    quiz_data = {
      "lessonId": "1481dc60-fe8a-4fa9-830b-9a227ede9b6e",
      "lessonTitle": "Jensen Huang: How Elon Musk Built the World's Fastest Supercomputer in 19 Days",
      "totalQuestions": 8,
      "xpReward": 40,
      "questions": [
        {
          "id": "q_jensen_huang_1",
          "question": "According to Jensen Huang in Segments 1-3, which multifaceted engineering achievement is described as 'like superhuman'?",
          "questionEn": "According to Jensen Huang in Segments 1-3, which multifaceted engineering achievement is described as 'like superhuman'?",
          "questionVi": "Theo Jensen Huang trong các câu 1-3, thành tựu kỹ thuật đa diện nào được miêu tả là 'thực sự phi thường như siêu nhân' (like superhuman)?",
          "options": [
            "Going from concept to building a massive factory, liquid-cooled, energized, and permitted in an ultra-short timeframe.",
            "Designing an entirely new silicon architecture from scratch in one afternoon without prototypes.",
            "Negotiating trade agreements between fifty different national governments simultaneously.",
            "Replacing all human software programmers with autonomous self-assembling robot compilers."
          ],
          "optionsEn": [
            "Going from concept to building a massive factory, liquid-cooled, energized, and permitted in an ultra-short timeframe.",
            "Designing an entirely new silicon architecture from scratch in one afternoon without prototypes.",
            "Negotiating trade agreements between fifty different national governments simultaneously.",
            "Replacing all human software programmers with autonomous self-assembling robot compilers."
          ],
          "optionsVi": [
            "Đi từ ý tưởng đến việc xây dựng một nhà máy khổng lồ, làm mát bằng chất lỏng, cấp điện và cấp phép trong thời gian cực ngắn.",
            "Tự thiết kế một kiến trúc vi mạch bán dẫn hoàn toàn mới từ đầu chỉ trong một buổi chiều không cần bản mẫu.",
            "Đàm phán các thỏa thuận thương mại giữa năm mươi chính phủ quốc gia khác nhau cùng một lúc.",
            "Thay thế toàn bộ lập trình viên phần mềm bằng các trình biên dịch robot tự lắp ráp tự động."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 1-3, Jensen Huang marvels: \"From the moment of concept to building a massive factory, liquid-cooled, energized, permitted in the short time that was done, that is like superhuman, right?\"",
          "explanationEn": "In Segments 1-3, Jensen Huang marvels: \"From the moment of concept to building a massive factory, liquid-cooled, energized, permitted in the short time that was done, that is like superhuman, right?\"",
          "explanationVi": "Trong các câu 1-3, Jensen Huang thán phục: \"Từ lúc lên ý tưởng đến khi xây dựng một nhà máy khổng lồ, làm mát bằng chất lỏng, cấp điện và cấp phép trong khoảng thời gian ngắn ngủi như vậy, điều đó thực sự phi thường, đúng không?\"",
          "referenceSegmentIndex": 1,
          "targetedConcept": "Quy trình thiết lập trung tâm dữ liệu làm mát bằng chất lỏng (Liquid-Cooled AI Factory Setup & Energization)",
          "targetedConceptEn": "Liquid-Cooled AI Factory Setup & Energization",
          "targetedConceptVi": "Quy trình thiết lập trung tâm dữ liệu làm mát bằng chất lỏng"
        },
        {
          "id": "q_jensen_huang_2",
          "question": "In Segment 5, what does Jensen Huang mean when describing Elon Musk as 'singular' in engineering and marshaling resources?",
          "questionEn": "In Segment 5, what does Jensen Huang mean when describing Elon Musk as 'singular' in engineering and marshaling resources?",
          "questionVi": "Trong câu 5, Jensen Huang có hàm ý gì khi miêu tả Elon Musk là 'singular' (độc nhất vô nhị) trong kỹ thuật và điều phối nguồn lực?",
          "options": [
            "Elon possesses an unparalleled, exceptionally rare capability in understanding engineering, large systems, and mobilizing immense resources.",
            "Elon always performs engineering calculations alone in complete isolation without talking to his staff.",
            "Elon restricts his technical focus to a solitary computer chip at any given time.",
            "Elon rejects all corporate collaboration to work exclusively on theoretical mathematics."
          ],
          "optionsEn": [
            "Elon possesses an unparalleled, exceptionally rare capability in understanding engineering, large systems, and mobilizing immense resources.",
            "Elon always performs engineering calculations alone in complete isolation without talking to his staff.",
            "Elon restricts his technical focus to a solitary computer chip at any given time.",
            "Elon rejects all corporate collaboration to work exclusively on theoretical mathematics."
          ],
          "optionsVi": [
            "Elon sở hữu năng lực vô song, hiếm có đặc biệt trong việc thấu hiểu kỹ thuật, các hệ thống quy mô lớn và huy động nguồn lực khổng lồ.",
            "Elon luôn thực hiện các phép tính kỹ thuật một mình trong sự cô lập hoàn toàn mà không nói chuyện với nhân viên.",
            "Elon giới hạn sự tập trung kỹ thuật của mình vào một con chip máy tính đơn lẻ tại bất kỳ thời điểm nào.",
            "Elon từ chối mọi sự hợp tác doanh nghiệp để làm việc độc quyền về toán học lý thuyết."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 4-6, Jensen Huang remarks: \"there's only one person in the world who could do that... Elon is singular in this understanding of engineering, and construction, and large systems, and marshaling resources\". In this context, \"singular\" denotes exceptional uniqueness and being without equal.",
          "explanationEn": "In Segments 4-6, Jensen Huang remarks: \"there's only one person in the world who could do that... Elon is singular in this understanding of engineering, and construction, and large systems, and marshaling resources\". In this context, \"singular\" denotes exceptional uniqueness and being without equal.",
          "explanationVi": "Trong các câu 4-6, Jensen Huang nhận định: \"chỉ có một người duy nhất trên thế giới có thể làm được điều đó... Elon thực sự độc nhất vô nhị trong hiểu biết về kỹ thuật, xây dựng, các hệ thống quy mô lớn và huy động nguồn lực\". Trong ngữ cảnh này, \"singular\" biểu thị sự độc nhất phi thường và không ai sánh kịp.",
          "referenceSegmentIndex": 5,
          "targetedConcept": "Từ vựng ngữ cảnh cao cấp: 'Singular' & Điều phối nguồn lực (Contextual Vocabulary: Singular & Resource Marshaling)",
          "targetedConceptEn": "Contextual Vocabulary: Singular & Resource Marshaling",
          "targetedConceptVi": "Từ vựng ngữ cảnh cao cấp: 'Singular' & Điều phối nguồn lực"
        },
        {
          "id": "q_jensen_huang_3",
          "question": "Which specialized teams collaborated seamlessly from the very start between NVIDIA and xAI according to Segments 10 & 11?",
          "questionEn": "Which specialized teams collaborated seamlessly from the very start between NVIDIA and xAI according to Segments 10 & 11?",
          "questionVi": "Những đội ngũ chuyên môn nào đã phối hợp nhịp nhàng ngay từ đầu giữa NVIDIA và xAI theo câu 10 & 11?",
          "options": [
            "The engineering team, networking team, infrastructure computing team, and software team.",
            "The corporate finance committee and the human resources hiring department only.",
            "External marketing agencies and consumer advertising consultants.",
            "International shipping customs inspectors and local legal councils exclusively."
          ],
          "optionsEn": [
            "The engineering team, networking team, infrastructure computing team, and software team.",
            "The corporate finance committee and the human resources hiring department only.",
            "External marketing agencies and consumer advertising consultants.",
            "International shipping customs inspectors and local legal councils exclusively."
          ],
          "optionsVi": [
            "Đội ngũ kỹ sư, đội ngũ mạng kết nối, đội ngũ hạ tầng điện toán và đội ngũ phần mềm.",
            "Chỉ riêng ủy ban tài chính doanh nghiệp và phòng tuyển dụng nhân sự.",
            "Các công ty tiếp thị bên ngoài và các nhà tư vấn quảng cáo tiêu dùng.",
            "Độc quyền các thanh tra hải quan vận chuyển quốc tế và hội đồng pháp lý địa phương."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 10 & 11, Huang details the multi-disciplinary collaboration: \"the planning with our engineering team, our networking team, our infrastructure computing team, the software team, all of the preparation in advance.\"",
          "explanationEn": "In Segments 10 & 11, Huang details the multi-disciplinary collaboration: \"the planning with our engineering team, our networking team, our infrastructure computing team, the software team, all of the preparation in advance.\"",
          "explanationVi": "Trong các câu 10 & 11, Huang nêu chi tiết sự hợp tác đa ngành: \"khâu lên kế hoạch cùng đội ngũ kỹ sư, đội ngũ mạng, đội ngũ hạ tầng điện toán, đội ngũ phần mềm, tất cả đều được chuẩn bị từ trước.\"",
          "referenceSegmentIndex": 10,
          "targetedConcept": "Hợp tác kỹ thuật liên ngành (Cross-Functional Engineering Collaboration)",
          "targetedConceptEn": "Cross-Functional Engineering Collaboration",
          "targetedConceptVi": "Hợp tác kỹ thuật liên ngành"
        },
        {
          "id": "q_jensen_huang_4",
          "question": "What ultimate operational milestone was achieved in 19 days with all the delivered equipment and infrastructure in Segment 15?",
          "questionEn": "What ultimate operational milestone was achieved in 19 days with all the delivered equipment and infrastructure in Segment 15?",
          "questionVi": "Cột mốc vận hành tối hậu nào đã đạt được sau 19 ngày với toàn bộ thiết bị và hạ tầng được chuyển đến trong câu 15?",
          "options": [
            "Bringing all the technology and equipment together ready to train AI models in 19 days.",
            "Unpacking and filing paper warranty certificates for each individual GPU component.",
            "Photographing the empty factory floor for architectural design magazines.",
            "Selling the server racks to secondary cloud hosting resellers at auction."
          ],
          "optionsEn": [
            "Bringing all the technology and equipment together ready to train AI models in 19 days.",
            "Unpacking and filing paper warranty certificates for each individual GPU component.",
            "Photographing the empty factory floor for architectural design magazines.",
            "Selling the server racks to secondary cloud hosting resellers at auction."
          ],
          "optionsVi": [
            "Tập hợp toàn bộ công nghệ và thiết bị sẵn sàng để bắt đầu huấn luyện các mô hình AI trong 19 ngày.",
            "Mở hộp và lưu trữ hồ sơ giấy bảo hành cho từng linh kiện GPU riêng lẻ.",
            "Chụp ảnh sàn nhà máy trống cho các tạp chí thiết kế kiến trúc.",
            "Bán đấu giá các giá đỡ máy chủ cho các đơn vị bán lại dịch vụ lưu trữ đám mây thứ cấp."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 13-15, Jensen Huang highlights: \"Then all of the infrastructure, all of the logistics, and the amount of technology and equipment that came in on that day to train in 19 days.\"",
          "explanationEn": "In Segments 13-15, Jensen Huang highlights: \"Then all of the infrastructure, all of the logistics, and the amount of technology and equipment that came in on that day to train in 19 days.\"",
          "explanationVi": "Trong các câu 13-15, Jensen Huang nhấn mạnh: \"Rồi toàn bộ cơ sở hạ tầng, toàn bộ hậu cần, cùng khối lượng công nghệ và thiết bị khổng lồ đổ về vào ngày hôm đó để bắt đầu vận hành huấn luyện trong 19 ngày.\"",
          "referenceSegmentIndex": 15,
          "targetedConcept": "Cột mốc sẵn sàng huấn luyện mô hình AI (AI Model Training Readiness)",
          "targetedConceptEn": "AI Model Training Readiness",
          "targetedConceptVi": "Cột mốc sẵn sàng huấn luyện mô hình AI"
        },
        {
          "id": "q_jensen_huang_5",
          "question": "What physical challenges does Jensen Huang encompass with the metaphor 'mountain of technology' in Segments 21-23?",
          "questionEn": "What physical challenges does Jensen Huang encompass with the metaphor 'mountain of technology' in Segments 21-23?",
          "questionVi": "Những thách thức vật lý nào được Jensen Huang bao hàm trong hình ảnh ẩn dụ 'khối công nghệ đồ sộ' (mountain of technology) ở câu 21-23?",
          "options": [
            "All of the complex wiring, high-speed networking, system integration, and software orchestration.",
            "The physical weight of heavy concrete roof beams resting on the data center.",
            "Piles of discarded cardboard boxes and wooden pallets waiting for disposal.",
            "Mountains of discarded copper scraps from old decommissioned telephone lines."
          ],
          "optionsEn": [
            "All of the complex wiring, high-speed networking, system integration, and software orchestration.",
            "The physical weight of heavy concrete roof beams resting on the data center.",
            "Piles of discarded cardboard boxes and wooden pallets waiting for disposal.",
            "Mountains of discarded copper scraps from old decommissioned telephone lines."
          ],
          "optionsVi": [
            "Toàn bộ hệ thống đấu nối dây dẫn phức tạp, mạng kết nối tốc độ cao, tích hợp hệ thống và đồng bộ phần mềm.",
            "Trọng lượng vật lý của các dầm bê tông cốt thép nặng đè lên trung tâm dữ liệu.",
            "Những đống hộp các tông phế thải và pallet gỗ chờ xử lý rác.",
            "Những núi phế liệu đồng bị vứt bỏ từ các đường dây điện thoại cũ ngừng hoạt động."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 21-23, Huang emphasizes: \"And the mountain of technology... all of the wiring and the networking, just getting this mountain of technology integrated, and all the software. Incredible, right?\"",
          "explanationEn": "In Segments 21-23, Huang emphasizes: \"And the mountain of technology... all of the wiring and the networking, just getting this mountain of technology integrated, and all the software. Incredible, right?\"",
          "explanationVi": "Trong các câu 21-23, Huang nhấn mạnh: \"toàn bộ hệ thống dây nối và mạng kết nối, chỉ việc tích hợp khối công nghệ khổng lồ này và tất cả phần mềm. Thật phi thường, đúng không?\"",
          "referenceSegmentIndex": 21,
          "targetedConcept": "Thách thức tích hợp vật lý & Hệ thống dây dẫn/mạng (Physical Integration, Wiring & Networking)",
          "targetedConceptEn": "Physical Integration, Wiring & Networking",
          "targetedConceptVi": "Thách thức tích hợp vật lý & Hệ thống dây dẫn/mạng"
        },
        {
          "id": "q_jensen_huang_6",
          "question": "What specific GPU scale makes xAI's Colossus cluster the fastest supercomputer on the planet according to Segment 28?",
          "questionEn": "What specific GPU scale makes xAI's Colossus cluster the fastest supercomputer on the planet according to Segment 28?",
          "questionVi": "Quy mô GPU cụ thể nào khiến cụm Colossus của xAI trở thành siêu máy tính nhanh nhất hành tinh theo câu 28?",
          "options": [
            "100,000 GPUs operating together as a unified single cluster.",
            "10,000 graphics cards dispersed across fifty separate regional server rooms.",
            "500,000 low-power mobile smartphone processors connected via Wi-Fi.",
            "1,000 prototype gaming laptops stacked vertically on metal shelves."
          ],
          "optionsEn": [
            "100,000 GPUs operating together as a unified single cluster.",
            "10,000 graphics cards dispersed across fifty separate regional server rooms.",
            "500,000 low-power mobile smartphone processors connected via Wi-Fi.",
            "1,000 prototype gaming laptops stacked vertically on metal shelves."
          ],
          "optionsVi": [
            "100.000 GPU vận hành đồng nhất cùng nhau dưới dạng một cụm duy nhất.",
            "10.000 card đồ họa phân tán trên năm mươi phòng máy chủ khu vực riêng biệt.",
            "500.000 vi xử lý điện thoại di động công suất thấp kết nối qua mạng Wi-Fi.",
            "1.000 máy tính xách tay chơi game mẫu xếp chồng lên nhau theo chiều dọc trên các giá kim loại."
          ],
          "correctAnswer": 0,
          "explanation": "In Segment 28, Huang states: \"100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster.\"",
          "explanationEn": "In Segment 28, Huang states: \"100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster.\"",
          "explanationVi": "Trong câu 28, Huang khẳng định: \"100.000 GPU, đó chắc chắn là siêu máy tính nhanh nhất hành tinh dưới dạng một cụm duy nhất.\"",
          "referenceSegmentIndex": 28,
          "targetedConcept": "Quy mô phần cứng & Cụm siêu máy tính nhanh nhất hành tinh (100,000 GPUs & Fastest Supercomputer Cluster)",
          "targetedConceptEn": "100,000 GPUs & Fastest Supercomputer Cluster",
          "targetedConceptVi": "Quy mô phần cứng & Cụm siêu máy tính nhanh nhất hành tinh"
        },
        {
          "id": "q_jensen_huang_7",
          "question": "How does the 19-day timeframe contrast with the conventional industry standard for building a supercomputer?",
          "questionEn": "How does the 19-day timeframe contrast with the conventional industry standard for building a supercomputer?",
          "questionVi": "Khoảng thời gian 19 ngày tương phản như thế nào so với tiêu chuẩn ngành thông thường để xây dựng một siêu máy tính?",
          "options": [
            "A standard supercomputer normally takes three years to plan, plus another full year to get the delivered equipment working (4 years total).",
            "Normal supercomputers take approximately three weeks to plan and five months to test.",
            "Standard industry facilities require exactly nineteen months rather than nineteen days.",
            "Modern supercomputers are typically installed automatically within a weekend by artificial intelligence."
          ],
          "optionsEn": [
            "A standard supercomputer normally takes three years to plan, plus another full year to get the delivered equipment working (4 years total).",
            "Normal supercomputers take approximately three weeks to plan and five months to test.",
            "Standard industry facilities require exactly nineteen months rather than nineteen days.",
            "Modern supercomputers are typically installed automatically within a weekend by artificial intelligence."
          ],
          "optionsVi": [
            "Một siêu máy tính tiêu chuẩn thông thường mất tới ba năm để lên kế hoạch, cộng thêm một năm nữa để đưa thiết bị vào vận hành (tổng cộng 4 năm).",
            "Các siêu máy tính thông thường mất khoảng ba tuần để lập kế hoạch và năm tháng để chạy thử.",
            "Các cơ sở tiêu chuẩn trong ngành đòi hỏi chính xác mười chín tháng thay vì mười chín ngày.",
            "Các siêu máy tính hiện đại thường được trí tuệ nhân tạo tự động lắp đặt chỉ trong một kỳ nghỉ cuối tuần."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 29-31, Jensen Huang highlights the massive contrast: \"A supercomputer that you would build would take normally three years to plan, right? And then they deliver the equipment and it takes one year to get it all working. Yes, we're talking about 19 days.\"",
          "explanationEn": "In Segments 29-31, Jensen Huang highlights the massive contrast: \"A supercomputer that you would build would take normally three years to plan, right? And then they deliver the equipment and it takes one year to get it all working. Yes, we're talking about 19 days.\"",
          "explanationVi": "Trong các câu 29-31, Jensen Huang nêu bật sự tương phản khổng lồ: \"Một siêu máy tính thông thường bạn xây dựng phải mất ba năm để lên kế hoạch, đúng không? Rồi họ bàn giao thiết bị và mất thêm một năm nữa để đưa tất cả vào hoạt động. Ở đây chúng ta đang nói về 19 ngày.\"",
          "referenceSegmentIndex": 29,
          "targetedConcept": "Đối lập quy chuẩn ngành công nghệ vs Tốc độ đột phá (Industry Benchmark vs Speed Disruption)",
          "targetedConceptEn": "Industry Benchmark vs Speed Disruption",
          "targetedConceptVi": "Đối lập quy chuẩn ngành công nghệ vs Tốc độ đột phá"
        },
        {
          "id": "q_jensen_huang_8",
          "question": "When Jensen Huang suggests audiences 'take a step back' in Segment 18, what profound insight is he conveying?",
          "questionEn": "When Jensen Huang suggests audiences 'take a step back' in Segment 18, what profound insight is he conveying?",
          "questionVi": "Khi Jensen Huang khuyên khán giả nên 'lùi lại một bước để nhìn nhận' (take a step back) trong câu 18, ông muốn truyền tải góc nhìn sâu sắc nào?",
          "options": [
            "He wants listeners to realize that 19 days is merely a couple of weeks, making the monumental feat even more mind-boggling.",
            "He is suggesting that viewers walk backwards physically to gain an optical illusion of the building.",
            "He is advising engineers to delay future projects by several months to reduce workplace stress.",
            "He is stating that supercomputing progress has stagnated over the past two weeks."
          ],
          "optionsEn": [
            "He wants listeners to realize that 19 days is merely a couple of weeks, making the monumental feat even more mind-boggling.",
            "He is suggesting that viewers walk backwards physically to gain an optical illusion of the building.",
            "He is advising engineers to delay future projects by several months to reduce workplace stress.",
            "He is stating that supercomputing progress has stagnated over the past two weeks."
          ],
          "optionsVi": [
            "Ông muốn người nghe nhận thức rõ rằng 19 ngày chỉ là vài tuần ngắn ngủi, khiến kỳ tích đồ sộ này càng trở nên khó tin đến kinh ngạc.",
            "Ông gợi ý người xem nên bước lùi lại về mặt thể chất để có ảo ảnh quang học về tòa nhà.",
            "Ông khuyên các kỹ sư nên trì hoãn các dự án tương lai vài tháng để giảm bớt căng thẳng nơi làm việc.",
            "Ông tuyên bố rằng tiến bộ điện toán siêu cấp đã bị đình trệ trong hai tuần qua."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 18-20, Huang encourages stepping back to appreciate the briefness: \"But it's also kind of nice to just take a step back, you know how many days 19 days is? It's just a couple of weeks.\"",
          "explanationEn": "In Segments 18-20, Huang encourages stepping back to appreciate the briefness: \"But it's also kind of nice to just take a step back, you know how many days 19 days is? It's just a couple of weeks.\"",
          "explanationVi": "Trong các câu 18-20, Huang khuyến khích lùi lại quan sát để thấu hiểu sự ngắn ngủi: \"Nhưng cũng nên nhìn lại một chút, bạn có biết 19 ngày là bao nhiêu không? Chỉ là vài tuần ngắn ngủi.\"",
          "referenceSegmentIndex": 18,
          "targetedConcept": "Góc nhìn toàn cảnh & Nghệ thuật diễn thuyết (Perspective Taking & Rhetorical Framing)",
          "targetedConceptEn": "Perspective Taking & Rhetorical Framing",
          "targetedConceptVi": "Góc nhìn toàn cảnh & Nghệ thuật diễn thuyết"
        }
      ],
      "generatedBy": "CONTEXTUAL_FALLBACK"
    }

    quiz_json = json.dumps(quiz_data, ensure_ascii=False, indent=2)

    lines = []
    lines.append('import { MockVideoLesson, VideoQuizData } from "../types";\n')
    lines.append('/**\n * Bilingual Contextual Reading Comprehension Quiz for Jensen Huang: Elon Musk & xAI Supercomputer\n * 8 in-depth analytical questions covering AI data center architecture, GPU clustering, and advanced vocabulary.\n */')
    lines.append(f'export const QUIZ_JENSEN_HUANG: VideoQuizData = {quiz_json};\n')
    
    lines.append('/**\n * Jensen Huang: How Elon Musk Built the World\'s Fastest Supercomputer in 19 Days\n * Slug: jensen-huang-elon-musk-supercomputer\n * External ID: lpLFjQ-bRv8\n * Category: cat_science_tech (Khoa Học & Công Nghệ)\n * 100% Calibrated Verbatim Master Edition (31 Segments / 01:49)\n */')
    lines.append('export const LESSON_JENSEN_HUANG: MockVideoLesson = {')
    lines.append('  id: "1481dc60-fe8a-4fa9-830b-9a227ede9b6e",')
    lines.append('  slug: "jensen-huang-elon-musk-supercomputer",')
    lines.append('  title: "Jensen Huang: How Elon Musk Built the World\'s Fastest Supercomputer in 19 Days",')
    lines.append('  description: "NVIDIA CEO Jensen Huang phân tích kỳ tích kỹ thuật phi thường khi Elon Musk và đội ngũ xAI thiết lập cụm siêu máy tính 100.000 GPU trong thời gian kỷ lục 19 ngày.",')
    lines.append('  sourceType: "YOUTUBE",')
    lines.append('  externalId: "lpLFjQ-bRv8",')
    lines.append('  thumbnailUrl: "https://img.youtube.com/vi/lpLFjQ-bRv8/hqdefault.jpg",')
    lines.append('  durationSeconds: 109,')
    lines.append('  durationFormatted: "01:49",')
    lines.append('  cefrLevel: "B2",')
    lines.append('  supportedTypes: "BOTH",')
    lines.append('  categoryId: "cat_science_tech",')
    lines.append('  categorySlug: "science-tech",')
    lines.append('  categoryName: "Khoa Học & Công Nghệ",')
    lines.append('  accent: "en-US",')
    lines.append('  wpmSpeed: 155,')
    lines.append('  viewCount: 64200,')
    lines.append('  studyCount: 23100,')
    lines.append('  quiz: QUIZ_JENSEN_HUANG,')
    lines.append('  segments: [')

    for s in segments:
        seg_json = json.dumps(s, ensure_ascii=False, indent=4)
        indented = '\n'.join('    ' + l for l in seg_json.split('\n'))
        lines.append(indented + ',')

    lines.append('  ],')
    lines.append('};\n')

    with open('features/listening/data/lessons/lesson_jensen_huang.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print("Generated features/listening/data/lessons/lesson_jensen_huang.ts safely with json.dumps!")

if __name__ == '__main__':
    generate_ts()
