import json

def generate_ts():
    with open('scripts/kurzgesagt_master_58_segments.json', 'r', encoding='utf-8') as f:
        segments = json.load(f)

    # 8 Quiz questions
    quiz_data = {
      "lessonId": "88c4fc17-4445-46f4-82d4-c51fbb56e859",
      "lessonTitle": "Kurzgesagt: How to Win an Interstellar War",
      "totalQuestions": 8,
      "xpReward": 40,
      "questions": [
        {
          "id": "q_kurzgesagt_1",
          "question": "How does the narrator introduce humanity in terms of biological classification and technological status?",
          "questionEn": "How does the narrator introduce humanity in terms of biological classification and technological status?",
          "questionVi": "Người dẫn chuyện giới thiệu nhân loại như thế nào về mặt phân loại sinh học và trình độ công nghệ?",
          "options": [
            "A species of primates around a yellow dwarf star who recently became a technological civilization with rockets and memes.",
            "An ancient interstellar empire possessing warp-drive starships and planet-destroying superlasers.",
            "A peaceful aquatic civilization living beneath Europa's frozen ocean with zero carbon emissions.",
            "A cybernetic hive mind inhabiting multiple dwarf planets in the Kuiper belt."
          ],
          "optionsEn": [
            "A species of primates around a yellow dwarf star who recently became a technological civilization with rockets and memes.",
            "An ancient interstellar empire possessing warp-drive starships and planet-destroying superlasers.",
            "A peaceful aquatic civilization living beneath Europa's frozen ocean with zero carbon emissions.",
            "A cybernetic hive mind inhabiting multiple dwarf planets in the Kuiper belt."
          ],
          "optionsVi": [
            "Một loài linh trưởng sống quanh một ngôi sao lùn vàng, vừa mới trở thành nền văn minh công nghệ với tên lửa và meme.",
            "Một đế chế liên sao cổ đại sở hữu tàu vũ trụ động cơ bước nhảy không gian và siêu laser hủy diệt hành tinh.",
            "Một nền văn minh thủy sinh hòa bình sống dưới đại dương băng giá của Europa với mức phát thải ròng bằng không.",
            "Một mạng lưới ý thức máy móc sống trên nhiều hành tinh lùn ở vành đai Kuiper."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 6-8: \"A yellow dwarf star system home to a species of primates. 'Humans,' as they call themselves, recently became a technological civilization. They have rockets, nuclear reactors and memes.\"",
          "explanationEn": "In Segments 6-8: \"A yellow dwarf star system home to a species of primates. 'Humans,' as they call themselves, recently became a technological civilization. They have rockets, nuclear reactors and memes.\"",
          "explanationVi": "Trong các câu 6-8: \"Một hệ sao lùn vàng, quê hương của một loài linh trưởng. 'Con người', như cách họ tự gọi mình, gần đây đã trở thành nền văn minh công nghệ. Họ có tên lửa, lò phản ứng hạt nhân và meme.\"",
          "referenceSegmentIndex": 6,
          "targetedConcept": "Phân loại sinh học & Trình độ văn minh (Biological Classification & Tech Status)",
          "targetedConceptEn": "Biological Classification & Tech Status",
          "targetedConceptVi": "Phân loại sinh học & Trình độ văn minh"
        },
        {
          "id": "q_kurzgesagt_2",
          "question": "Where do the Smorpians reside, and how does their civilization compare to humanity?",
          "questionEn": "Where do the Smorpians reside, and how does their civilization compare to humanity?",
          "questionVi": "Người Smorpian cư ngụ ở đâu, và nền văn minh của họ so với loài người như thế nào?",
          "options": [
            "Inside our Moon's subterranean caves, hiding secretly from modern satellite telescopes.",
            "On a planet orbiting the orange dwarf star HD 40307, 42 light years away, having developed earlier with far superior technology.",
            "Around the red supergiant Betelgeuse, struggling with imminent supernova radiation.",
            "In the Andromeda galaxy, communicating via instantaneous quantum wormhole relays."
          ],
          "optionsEn": [
            "Inside our Moon's subterranean caves, hiding secretly from modern satellite telescopes.",
            "On a planet orbiting the orange dwarf star HD 40307, 42 light years away, having developed earlier with far superior technology.",
            "Around the red supergiant Betelgeuse, struggling with imminent supernova radiation.",
            "In the Andromeda galaxy, communicating via instantaneous quantum wormhole relays."
          ],
          "optionsVi": [
            "Bên trong các hang động ngầm dưới Mặt Trăng, ẩn mình bí mật khỏi các kính thiên văn vệ tinh hiện đại.",
            "Trên một hành tinh quay quanh sao lùn cam HD 40307 cách xa 42 năm ánh sáng, phát triển sớm hơn với công nghệ vượt trội hơn nhiều.",
            "Quanh siêu sao đỏ Betelgeuse, đang vật lộn với bức xạ từ vụ nổ siêu tân tinh sắp xảy ra.",
            "Tại thiên hà Tiên Nữ Andromeda, liên lạc qua các trạm tiếp sóng lỗ sâu lượng tử tức thời."
          ],
          "correctAnswer": 1,
          "explanation": "In Segments 11 & 12: \"They reside on a planet around the orange dwarf star HD 40307, 42 light years away. Smorpian civilization developed earlier than humans and they have much better technology.\"",
          "explanationEn": "In Segments 11 & 12: \"They reside on a planet around the orange dwarf star HD 40307, 42 light years away. Smorpian civilization developed earlier than humans and they have much better technology.\"",
          "explanationVi": "Trong các câu 11 & 12: \"Họ cư trú trên một hành tinh quay quanh ngôi sao lùn cam HD 40307, cách xa 42 năm ánh sáng. Nền văn minh Smorpian phát triển sớm hơn loài người và họ sở hữu công nghệ vượt trội hơn nhiều.\"",
          "referenceSegmentIndex": 11,
          "targetedConcept": "Khái niệm thiên văn học: Sao lùn cam & Khoảng cách năm ánh sáng (Astronomical Distance & Star Types)",
          "targetedConceptEn": "Astronomical Distance & Star Types",
          "targetedConceptVi": "Khái niệm thiên văn học: Sao lùn cam & Khoảng cách năm ánh sáng"
        },
        {
          "id": "q_kurzgesagt_3",
          "question": "What is a 'Dyson swarm', and what capability does it grant the Smorpians?",
          "questionEn": "What is a 'Dyson swarm', and what capability does it grant the Smorpians?",
          "questionVi": "'Bầy vệ tinh Dyson' (Dyson swarm) là gì, và nó đem lại khả năng gì cho người Smorpian?",
          "options": [
            "A biological virus designed to genetically alter alien ecosystems across multiple moons.",
            "A planetary ring of defensive kinetic shields protecting their home atmosphere from asteroids.",
            "A massive megastructure constellation surrounding their host star that harnesses near-limitless energy.",
            "A swarm of tiny subatomic nano-drones used exclusively for terraforming barren exoplanets."
          ],
          "optionsEn": [
            "A biological virus designed to genetically alter alien ecosystems across multiple moons.",
            "A planetary ring of defensive kinetic shields protecting their home atmosphere from asteroids.",
            "A massive megastructure constellation surrounding their host star that harnesses near-limitless energy.",
            "A swarm of tiny subatomic nano-drones used exclusively for terraforming barren exoplanets."
          ],
          "optionsVi": [
            "Một loại virus sinh học được thiết kế để biến đổi gen hệ sinh thái của các mặt trăng ngoài hành tinh.",
            "Một vành đai khiên động năng phòng thủ bao quanh hành tinh để bảo vệ bầu khí quyển khỏi tiểu hành tinh.",
            "Một siêu công trình vệ tinh khổng lồ bao quanh ngôi sao chủ để thu hoạch nguồn năng lượng gần như vô hạn.",
            "Một bầy drone nano hạ nguyên tử siêu nhỏ chỉ dùng để địa khai hóa các ngoại hành tinh cằn cỗi."
          ],
          "correctAnswer": 2,
          "explanation": "In Segment 13: \"They've recently built a Dyson swarm around their star which gives them near limitless energy.\" A Dyson swarm is a theoretical megastructure capturing the total energy output of a star.",
          "explanationEn": "In Segment 13: \"They've recently built a Dyson swarm around their star which gives them near limitless energy.\" A Dyson swarm is a theoretical megastructure capturing the total energy output of a star.",
          "explanationVi": "Trong câu 13: \"Gần đây họ đã chế tạo một bầy vệ tinh Dyson bao quanh ngôi sao của mình, đem lại nguồn năng lượng gần như vô hạn.\" Bầy Dyson là siêu công trình lý thuyết thu gom toàn bộ quang năng của một ngôi sao.",
          "referenceSegmentIndex": 13,
          "targetedConcept": "Siêu công trình vũ trụ: Dyson Swarm & Thang Kardashev (Astrophysical Megastructure & Kardashev Scale)",
          "targetedConceptEn": "Astrophysical Megastructure & Kardashev Scale",
          "targetedConceptVi": "Siêu công trình vũ trụ: Dyson Swarm & Thang Kardashev"
        },
        {
          "id": "q_kurzgesagt_4",
          "question": "Why did the Smorpians decide that 'humanity has to go'?",
          "questionEn": "Why did the Smorpians decide that 'humanity has to go'?",
          "questionVi": "Tại sao người Smorpian lại quyết định rằng 'nhân loại cần phải bị xóa sổ'?",
          "options": [
            "Because humans accidentally intercepted and leaked their top-secret interstellar broadcasts.",
            "Because they are planning a hyperspace bypass directly through our solar system, making Earth an inconvenient obstacle.",
            "Because human greenhouse gas emissions have destabilized the cosmic background radiation.",
            "Because they require Earth's liquid water reserves to cool down their overheating star."
          ],
          "optionsEn": [
            "Because humans accidentally intercepted and leaked their top-secret interstellar broadcasts.",
            "Because they are planning a hyperspace bypass directly through our solar system, making Earth an inconvenient obstacle.",
            "Because human greenhouse gas emissions have destabilized the cosmic background radiation.",
            "Because they require Earth's liquid water reserves to cool down their overheating star."
          ],
          "optionsVi": [
            "Bởi vì con người vô tình chặn bắt và làm rò rỉ các tín hiệu phát thanh liên sao tuyệt mật của họ.",
            "Bởi vì họ đang lên kế hoạch làm đường vòng siêu không gian xuyên qua hệ mặt trời, biến Trái Đất thành chướng ngại vật cản đường.",
            "Bởi vì lượng khí thải nhà kính của con người đã làm mất ổn định bức xạ phông vi sóng vũ trụ.",
            "Bởi vì họ cần trữ lượng nước lỏng của Trái Đất để làm nguội ngôi sao đang quá nhiệt của mình."
          ],
          "correctAnswer": 1,
          "explanation": "In Segments 14 & 15: \"...the Smorpians are planning a hyperspace bypass through our solar system, so they decided that humanity has to go.\" This is an homage to Douglas Adams's 'The Hitchhiker's Guide to the Galaxy'.",
          "explanationEn": "In Segments 14 & 15: \"...the Smorpians are planning a hyperspace bypass through our solar system, so they decided that humanity has to go.\" This is an homage to Douglas Adams's 'The Hitchhiker's Guide to the Galaxy'.",
          "explanationVi": "Trong các câu 14 & 15: \"...người Smorpian đang lên kế hoạch làm một đường vòng siêu không gian xuyên qua hệ mặt trời của chúng ta, vì vậy họ quyết định rằng nhân loại cần phải bị xóa sổ.\" Đây là chi tiết tri ân tác phẩm kinh điển 'The Hitchhiker's Guide to the Galaxy'.",
          "referenceSegmentIndex": 14,
          "targetedConcept": "Động cơ xung đột & Yếu tố Sci-Fi cổ điển: Hyperspace Bypass (Conflict Motivation & Sci-Fi Homage)",
          "targetedConceptEn": "Conflict Motivation & Sci-Fi Homage",
          "targetedConceptVi": "Động cơ xung đột & Yếu tố Sci-Fi cổ điển: Hyperspace Bypass"
        },
        {
          "id": "q_kurzgesagt_5",
          "question": "According to the video, why do traditional military concepts like 'front lines, tactics, and logistics' become meaningless in interstellar war?",
          "questionEn": "According to the video, why do traditional military concepts like 'front lines, tactics, and logistics' become meaningless in interstellar war?",
          "questionVi": "Theo video, tại sao các khái niệm quân sự truyền thống như 'tiền tuyến, chiến thuật và hậu cần' lại trở nên vô nghĩa trong chiến tranh liên sao?",
          "options": [
            "Because the vast astronomical distances render localized battle lines and real-time maneuvers completely irrelevant.",
            "Because both civilizations have signed a galactic disarmament treaty banning foot soldiers.",
            "Because quantum computing allows both sides to instantly predict every tactical move beforehand.",
            "Because all weapons are automatically operated by rogue pacifist artificial intelligence."
          ],
          "optionsEn": [
            "Because the vast astronomical distances render localized battle lines and real-time maneuvers completely irrelevant.",
            "Because both civilizations have signed a galactic disarmament treaty banning foot soldiers.",
            "Because quantum computing allows both sides to instantly predict every tactical move beforehand.",
            "Because all weapons are automatically operated by rogue pacifist artificial intelligence."
          ],
          "optionsVi": [
            "Bởi vì khoảng cách thiên văn bao la khiến các chiến tuyến cục bộ và việc điều động chiến thuật thời gian thực trở nên hoàn toàn vô nghĩa.",
            "Bởi vì cả hai nền văn minh đã ký một hiệp ước giải trừ quân bị ngân hà cấm triển khai bộ binh.",
            "Bởi vì điện toán lượng tử cho phép hai bên lập tức tiên đoán trước mọi nước đi chiến thuật.",
            "Bởi vì toàn bộ vũ khí đều được vận hành tự động bởi trí tuệ nhân tạo phản chiến."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 16 & 17: \"Interstellar war is hard though. Front lines, tactics, and logistics are meaningless at these scales.\" Extreme astronomical distances dissolve traditional territorial boundaries.",
          "explanationEn": "In Segments 16 & 17: \"Interstellar war is hard though. Front lines, tactics, and logistics are meaningless at these scales.\" Extreme astronomical distances dissolve traditional territorial boundaries.",
          "explanationVi": "Trong các câu 16 & 17: \"Tuy nhiên, chiến tranh liên sao lại vô cùng nan giải. Tiền tuyến, chiến thuật và hậu cần đều trở nên vô nghĩa ở những quy mô vũ trụ này.\" Khoảng cách giữa các ngôi sao xóa bỏ hoàn toàn ranh giới chiến tuyến địa lý thông thường.",
          "referenceSegmentIndex": 17,
          "targetedConcept": "Học thuyết quân sự vũ trụ: Quy mô thiên văn vs Chiến thuật truyền thống (Interstellar Military Scales)",
          "targetedConceptEn": "Interstellar Military Scales",
          "targetedConceptVi": "Học thuyết quân sự vũ trụ: Quy mô thiên văn vs Chiến thuật truyền thống"
        },
        {
          "id": "q_kurzgesagt_6",
          "question": "What enables the Smorpians to focus their Star Laser from over 2 million light years away?",
          "questionEn": "What enables the Smorpians to focus their Star Laser from over 2 million light years away?",
          "questionVi": "Điều gì cho phép người Smorpian có thể hội tụ Siêu Laser Ngôi Sao từ khoảng cách hơn 2 triệu năm ánh sáng?",
          "options": [
            "They turn their entire Dyson swarm into a collective focusing element a million kilometers wide.",
            "They use an artificial black hole as a gravitational lensing telescope.",
            "They construct a giant convex glass lens orbiting Mars.",
            "They utilize quantum entanglement mirrors embedded in terrestrial satellites."
          ],
          "optionsEn": [
            "They turn their entire Dyson swarm into a collective focusing element a million kilometers wide.",
            "They use an artificial black hole as a gravitational lensing telescope.",
            "They construct a giant convex glass lens orbiting Mars.",
            "They utilize quantum entanglement mirrors embedded in terrestrial satellites."
          ],
          "optionsVi": [
            "Họ biến toàn bộ bầy Dyson của mình thành một thấu kính hội tụ tập thể rộng tới một triệu kilomet.",
            "Họ dùng một lỗ đen nhân tạo làm kính viễn vọng thấu kính hấp dẫn.",
            "Họ chế tạo một thấu kính thủy tinh lồi khổng lồ quay quanh sao Hỏa.",
            "Họ tận dụng các tấm gương vướng víu lượng tử gắn trên vệ tinh Trái Đất."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 37 & 38: \"The Smorpians could turn their entire Dyson swarm into a collective focusing element a million kilometers wide. The star laser has an insane range as a result, enough to focus on target Earth from a distance of over 2 million light years.\"",
          "explanationEn": "In Segments 37 & 38: \"The Smorpians could turn their entire Dyson swarm into a collective focusing element a million kilometers wide. The star laser has an insane range as a result, enough to focus on target Earth from a distance of over 2 million light years.\"",
          "explanationVi": "Trong các câu 37 & 38: \"Người Smorpian có thể biến toàn bộ bầy Dyson của họ thành một thấu kính hội tụ tập thể rộng tới một triệu kilomet. Kết quả là siêu laser ngôi sao có một tầm bắn điên rồ, đủ sức nhắm trúng mục tiêu Trái Đất từ khoảng cách hơn 2 triệu năm ánh sáng.\"",
          "referenceSegmentIndex": 37,
          "targetedConcept": "Quang học thiên văn: Thấu kính hội tụ diện rộng 1 triệu km (Astronomical Optics & Collective Focusing)",
          "targetedConceptEn": "Astronomical Optics & Collective Focusing",
          "targetedConceptVi": "Quang học thiên văn: Thấu kính hội tụ diện rộng 1 triệu km"
        },
        {
          "id": "q_kurzgesagt_7",
          "question": "Why does the Star Laser become clearly visible as a gigantic column of green light in space?",
          "questionEn": "Why does the Star Laser become clearly visible as a gigantic column of green light in space?",
          "questionVi": "Tại sao Siêu Laser Ngôi Sao lại có thể nhìn thấy rõ ràng như một cột ánh sáng xanh lục khổng lồ trong không gian?",
          "options": [
            "Because it is so immensely powerful that light scatters off bits of dust and gas in its travel path.",
            "Because space is filled with glowing bioluminescent alien plankton.",
            "Because the Smorpians purposely added green food dye to their photon emitters.",
            "Because Earth's ozone layer projects a hologram onto incoming beams."
          ],
          "optionsEn": [
            "Because it is so immensely powerful that light scatters off bits of dust and gas in its travel path.",
            "Because space is filled with glowing bioluminescent alien plankton.",
            "Because the Smorpians purposely added green food dye to their photon emitters.",
            "Because Earth's ozone layer projects a hologram onto incoming beams."
          ],
          "optionsVi": [
            "Bởi vì nó có sức mạnh kinh hồn đến mức ánh sáng bị tán xạ bởi các hạt bụi và khí trên đường đi của nó.",
            "Bởi vì không gian chứa đầy các sinh vật phù du phát quang sinh học ngoài hành tinh.",
            "Bởi vì người Smorpian cố ý thêm thuốc nhuộm thực phẩm màu xanh vào bộ phát photon của họ.",
            "Bởi vì tầng ozone của Trái Đất chiếu một hình ảnh ba chiều ba chiều lên các chùm tia tới."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 41 & 42: \"Laser beams are normally invisible in space, but the star laser is so powerful that light scattering off bits of dust and gas in its path makes it clearly visible in the sky. A gigantic column of green light.\"",
          "explanationEn": "In Segments 41 & 42: \"Laser beams are normally invisible in space, but the star laser is so powerful that light scattering off bits of dust and gas in its path makes it clearly visible in the sky. A gigantic column of green light.\"",
          "explanationVi": "Trong các câu 41 & 42: \"Các chùm tia laser thường vô hình trong không gian vũ trụ, nhưng siêu laser ngôi sao mạnh đến mức sự tán xạ ánh sáng khỏi các hạt bụi và khí trên đường đi khiến nó hiện rõ mồn một trên bầu trời. Một cột ánh sáng xanh lục khổng lồ.\"",
          "referenceSegmentIndex": 42,
          "targetedConcept": "Quang học tán xạ: Hiện tượng tán xạ ánh sáng trong môi trường liên sao (Light Scattering in Interstellar Space)",
          "targetedConceptEn": "Light Scattering in Interstellar Space",
          "targetedConceptVi": "Quang học tán xạ: Hiện tượng tán xạ ánh sáng trong môi trường liên sao"
        },
        {
          "id": "q_kurzgesagt_8",
          "question": "What profound paradox about interstellar warfare is highlighted regarding attack time and feedback?",
          "questionEn": "What profound paradox about interstellar warfare is highlighted regarding attack time and feedback?",
          "questionVi": "Nghịch lý sâu sắc nào về chiến tranh liên sao được nhấn mạnh liên quan đến thời gian tấn công và nhận kết quả phản hồi?",
          "options": [
            "When an attack is launched across light years, your grandchildren will be the ones to find out if you won.",
            "Laser weapons run backward in time and destroy the attacker before reaching the target.",
            "Civilizations always forget why they started the war after exactly one decade.",
            "The attacking empire immediately dissolves into civil war before firing a single shot."
          ],
          "optionsEn": [
            "When an attack is launched across light years, your grandchildren will be the ones to find out if you won.",
            "Laser weapons run backward in time and destroy the attacker before reaching the target.",
            "Civilizations always forget why they started the war after exactly one decade.",
            "The attacking empire immediately dissolves into civil war before firing a single shot."
          ],
          "optionsVi": [
            "Khi bạn phát động tấn công xuyên qua các năm ánh sáng, con cháu thế hệ sau của bạn mới là những người biết được bạn có thắng hay không.",
            "Vũ khí laser di chuyển ngược thời gian và tiêu diệt chính kẻ tấn công trước khi đến đích.",
            "Các nền văn minh luôn quên mất lý do vì sao họ bắt đầu chiến tranh sau đúng một thập kỷ.",
            "Đế chế tấn công ngay lập tức tan rã trong nội chiến trước khi bắn một phát súng duy nhất."
          ],
          "correctAnswer": 0,
          "explanation": "In Segments 54 & 55: \"In another 42 years, the Smorpians will know if they've been successful. That's another thing about interstellar war. When you attack, your grandchildren will be the ones to find out if you won.\"",
          "explanationEn": "In Segments 54 & 55: \"In another 42 years, the Smorpians will know if they've been successful. That's another thing about interstellar war. When you attack, your grandchildren will be the ones to find out if you won.\"",
          "explanationVi": "Trong các câu 54 & 55: \"Phải mất thêm 42 năm nữa, người Smorpian mới biết được liệu cuộc tấn công của họ có thành công hay không. Đó là một đặc tính khác của chiến tranh liên sao. Khi bạn phát động tấn công, con cháu của bạn mới là những người biết được bạn có thắng hay không.\"",
          "referenceSegmentIndex": 55,
          "targetedConcept": "Nghịch lý thời gian liên sao & Sự đứt gãy thế hệ (Interstellar Generational Time Lag Paradox)",
          "targetedConceptEn": "Interstellar Generational Time Lag Paradox",
          "targetedConceptVi": "Nghịch lý thời gian liên sao & Sự đứt gãy thế hệ"
        }
      ],
      "generatedBy": "CONTEXTUAL_FALLBACK"
    }

    quiz_json = json.dumps(quiz_data, ensure_ascii=False, indent=2)

    lines = []
    lines.append('import { MockVideoLesson, VideoQuizData } from "../types";\n')
    lines.append('/**\n * Bilingual Contextual Reading Comprehension Quiz for Kurzgesagt: How to Win an Interstellar War\n * 8 in-depth analytical questions covering astrophysics, Fermi paradox themes, relativistic physics, and vocabulary.\n */')
    lines.append(f'export const QUIZ_KURZGESAGT_INTERSTELLAR: VideoQuizData = {quiz_json};\n')
    
    lines.append('/**\n * Kurzgesagt: How to Win an Interstellar War\n * Slug: kurzgesagt-interstellar-war\n * YouTube ID: tybKnGZRwcU\n * Category: cat_science_tech (Khoa Học & Công Nghệ)\n * 100% Calibrated Verbatim Master Edition (58 Segments / 04:46)\n */')
    lines.append('export const LESSON_KURZGESAGT_INTERSTELLAR: MockVideoLesson = {')
    lines.append('  id: "88c4fc17-4445-46f4-82d4-c51fbb56e859",')
    lines.append('  slug: "kurzgesagt-interstellar-war",')
    lines.append('  title: "Kurzgesagt: How to Win an Interstellar War",')
    lines.append('  description: "Khám phá cuộc chiến vũ trụ đầy kịch tính cùng Kurzgesagt – In a Nutshell: Liệu người ngoài hành tinh có thể hủy diệt Trái Đất từ khoảng cách hàng năm ánh sáng? Học từ vựng khoa học viễn tưởng, vật lý thiên văn và tư duy logic.",')
    lines.append('  sourceType: "YOUTUBE",')
    lines.append('  externalId: "tybKnGZRwcU",')
    lines.append('  thumbnailUrl: "https://img.youtube.com/vi/tybKnGZRwcU/hqdefault.jpg",')
    lines.append('  durationSeconds: 286,')
    lines.append('  durationFormatted: "04:46",')
    lines.append('  cefrLevel: "B2",')
    lines.append('  supportedTypes: "BOTH",')
    lines.append('  categoryId: "cat_science_tech",')
    lines.append('  categorySlug: "science-tech",')
    lines.append('  categoryName: "Khoa Học & Công Nghệ",')
    lines.append('  accent: "en-US",')
    lines.append('  wpmSpeed: 145,')
    lines.append('  viewCount: 14500000,')
    lines.append('  studyCount: 38200,')
    lines.append('  quiz: QUIZ_KURZGESAGT_INTERSTELLAR,')
    lines.append('  segments: [')

    for s in segments:
        seg_json = json.dumps(s, ensure_ascii=False, indent=4)
        # Indent each line by 4 spaces
        indented = '\n'.join('    ' + l for l in seg_json.split('\n'))
        lines.append(indented + ',')

    lines.append('  ],')
    lines.append('};\n')

    with open('features/listening/data/lessons/lesson_kurzgesagt_interstellar.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print("Generated features/listening/data/lessons/lesson_kurzgesagt_interstellar.ts safely with json.dumps!")

if __name__ == '__main__':
    generate_ts()
