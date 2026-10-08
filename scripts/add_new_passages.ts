import fs from "fs";
import path from "path";
import { ReadingPassage } from "../features/reading/data/passages/types";

const passagesDir = path.resolve(__dirname, "../features/reading/data/passages");

const newPassages: ReadingPassage[] = [
  {
    id: "r33",
    title: "James Webb Telescope Unveils Early Cosmic Structures",
    category: "Science",
    level: "B1",
    icon: "🔭",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    duration: "4 min",
    wordCount: 165,
    passage: `The James Webb Space Telescope (JWST) has transformed our understanding of the early universe. Stationed roughly 1.5 million kilometers from Earth at Lagrange Point 2, its massive gold-coated beryllium mirror captures faint infrared light emitted more than 13 billion years ago.\n\nAstronomers recently analyzed images of a distant galaxy cluster whose gravity acts as a natural magnifying lens. This phenomenon, known as gravitational lensing, revealed several infant galaxies formed merely 350 million years after the Big Bang. Contrary to prior expectations, these ancient systems exhibited surprisingly mature star clusters and higher metallicity than theoretical models predicted.\n\nResearchers emphasize that infrared spectroscopy enables scientists to peer through dense cosmic dust clouds. Over the coming years, JWST will continue investigating exoplanetary atmospheres, searching for chemical signatures of water vapor, methane, and carbon dioxide.`,
    translation: `Kính viễn vọng Không gian James Webb (JWST) đã làm thay đổi sâu sắc hiểu biết của chúng ta về vũ trụ sơ khai. Nằm cách Trái Đất khoảng 1,5 triệu km tại Điểm Lagrange 2, tấm gương mạ vàng bằng beryli khổng lồ của nó thu thập ánh sáng hồng ngoại yếu ớt được phát ra từ hơn 13 tỷ năm trước.\n\nCác nhà thiên văn học gần đây đã phân tích hình ảnh của một cụm thiên hà xa xôi có lực hấp dẫn hoạt động như một thấu kính phóng đại tự nhiên. Hiện tượng này, được gọi là thấu kính hấp dẫn, đã hé lộ nhiều thiên hà sơ khai hình thành chỉ 350 triệu năm sau Vụ nổ lớn (Big Bang). Trái với những dự đoán trước đây, các hệ thống cổ đại này sở hữu các cụm sao trưởng thành đến bất ngờ và độ kim loại cao hơn nhiều so với dự đoán của các mô hình lý thuyết.\n\nCác nhà nghiên cứu nhấn mạnh rằng quang phổ hồng ngoại cho phép các nhà khoa học nhìn xuyên qua các đám mây bụi vũ trụ dày đặc. Trong những năm tới, JWST sẽ tiếp tục khảo sát bầu khí quyển của các ngoại hành tinh, tìm kiếm các dấu hiệu hóa học của hơi nước, metan và carbon dioxide.`,
    vocabularies: [
      { word: "faint", ipa: "/feɪnt/", pos: "adj", meaning: "mờ nhạt, yếu ớt" },
      { word: "magnifying", ipa: "/ˈmæɡnɪfaɪɪŋ/", pos: "adj", meaning: "phóng đại, làm to lên" },
      { word: "mature", ipa: "/məˈtʃʊər/", pos: "adj", meaning: "trưởng thành, hoàn thiện" },
      { word: "spectroscopy", ipa: "/spekˈtrɒskəpi/", pos: "n", meaning: "quang phổ học" },
    ],
    questions: [
      {
        id: "q33_1",
        text: "Where is the James Webb Space Telescope stationed?",
        options: ["In low Earth orbit", "At Lagrange Point 2", "In Lunar orbit", "Inside the asteroid belt"],
        correct: 1,
        explanation: "Bài đọc nêu rõ: 'Stationed roughly 1.5 million kilometers from Earth at Lagrange Point 2'.",
      },
      {
        id: "q33_2",
        text: "What natural phenomenon magnified the distant infant galaxies?",
        options: ["Solar flare reflection", "Gravitational lensing", "Quantum entanglement", "Cosmic microwave decay"],
        correct: 1,
        explanation: "Đoạn 2 nêu rõ: 'whose gravity acts as a natural magnifying lens. This phenomenon, known as gravitational lensing'.",
      },
      {
        id: "q33_3",
        text: "What surprised astronomers about the ancient infant galaxies?",
        options: [
          "They exhibited mature star clusters earlier than theoretical models predicted",
          "They lacked any stars or light",
          "They rotated in opposite directions",
          "They were smaller than a single asteroid",
        ],
        correct: 0,
        explanation: "Bài nêu rõ: 'Contrary to prior expectations, these ancient systems exhibited surprisingly mature star clusters'.",
      },
    ],
  },
  {
    id: "r34",
    title: "The Gut-Brain Axis and Mood Regulation",
    category: "Health",
    level: "B2",
    icon: "🧠",
    coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80",
    duration: "4 min",
    wordCount: 178,
    passage: `Emerging biomedical research underscores the profound communication network connecting the central nervous system with the gastrointestinal tract, widely termed the gut-brain axis. Rather than functioning solely as a digestive organ, the human gut harbors trillions of microorganisms that directly synthesize neurotransmitters, including gamma-aminobutyric acid (GABA) and roughly 90 percent of the body's serotonin.\n\nThe bidirectional signaling between the brain and gut primarily travels through the vagus nerve. Recent clinical trials demonstrate that imbalances in intestinal microbiota, known as dysbiosis, correlate with heightened systemic inflammation and elevated cortisol secretions. When gut permeability increases, inflammatory cytokines enter the bloodstream and cross the blood-brain barrier, triggering behavioral alterations such as acute fatigue and anxiety.\n\nDietary interventions centered on prebiotic fibers and fermented foods promote diverse microbial strains. Nutritional psychiatrists increasingly utilize targeted probiotic supplementation alongside standard therapies to alleviate moderate depressive disorders.`,
    translation: `Nghiên cứu y sinh học hiện đại nhấn mạnh mạng lưới liên lạc sâu sắc kết nối hệ thần kinh trung ương với đường tiêu hóa, thường được gọi là trục ruột-não. Thay vì chỉ đóng vai trò như một cơ quan tiêu hóa đơn thuần, đường ruột con người chứa hàng nghìn tỷ vi sinh vật trực tiếp tổng hợp các chất dẫn truyền thần kinh, bao gồm axit gamma-aminobutyric (GABA) và khoảng 90% lượng serotonin của toàn cơ thể.\n\nTín hiệu hai chiều giữa não và ruột chủ yếu di chuyển qua dây thần kinh phế vị. Các thử nghiệm lâm sàng gần đây chứng minh rằng sự mất cân bằng hệ vi sinh vật đường ruột, được gọi là loạn khuẩn, có mối tương quan chặt chẽ với tình trạng viêm toàn thân gia tăng và sự tiết cortisol tăng cao. Khi tính thấm của ruột tăng lên, các cytokine gây viêm sẽ đi vào máu và vượt qua hàng rào máu-não, kích hoạt những thay đổi về hành vi như mệt mỏi cấp tính và lo âu.\n\nCác can thiệp chế độ ăn uống tập trung vào chất xơ prebiotic và thực phẩm lên men giúp thúc đẩy các chủng vi sinh vật đa dạng. Các bác sĩ tâm thần học dinh dưỡng ngày càng ứng dụng việc bổ sung men vi sinh có mục tiêu cùng với các liệu pháp tiêu chuẩn để giảm thiểu các rối loạn trầm cảm mức độ trung bình.`,
    vocabularies: [
      { word: "bidirectional", ipa: "/ˌbaɪdaɪˈrekʃənl/", pos: "adj", meaning: "hai chiều" },
      { word: "permeability", ipa: "/ˌpɜːmiəˈbɪləti/", pos: "n", meaning: "tính thấm, độ thẩm thấu" },
      { word: "inflammation", ipa: "/ˌɪnfləˈmeɪʃn/", pos: "n", meaning: "tình trạng viêm nhiễm" },
      { word: "alleviate", ipa: "/əˈliːvieɪt/", pos: "v", meaning: "làm dịu bớt, giảm nhẹ" },
    ],
    questions: [
      {
        id: "q34_1",
        text: "What major neurotransmitter is predominantly produced in the gut?",
        options: ["Adrenaline", "Serotonin", "Melatonin", "Insulin"],
        correct: 1,
        explanation: "Bài đọc nêu rõ: 'directly synthesize neurotransmitters, including... roughly 90 percent of the body's serotonin'.",
      },
      {
        id: "q34_2",
        text: "Which nerve primarily conducts bidirectional signaling between the brain and the gut?",
        options: ["Sciatic nerve", "Optic nerve", "Vagus nerve", "Radial nerve"],
        correct: 2,
        explanation: "Bài nêu rõ: 'The bidirectional signaling between the brain and gut primarily travels through the vagus nerve'.",
      },
      {
        id: "q34_3",
        text: "What dietary strategy is recommended to enhance microbial diversity?",
        options: [
          "Prebiotic fibers and fermented foods",
          "Excessive refined sugars",
          "Elimination of all carbohydrates",
          "Solely artificial sweeteners",
        ],
        correct: 0,
        explanation: "Đoạn cuối nhấn mạnh: 'Dietary interventions centered on prebiotic fibers and fermented foods promote diverse microbial strains'.",
      },
    ],
  },
  {
    id: "r35",
    title: "Precision Drones in Sustainable Farming",
    category: "Technology",
    level: "A2",
    icon: "🚁",
    coverImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80",
    duration: "3 min",
    wordCount: 135,
    passage: `Modern agriculture is rapidly adopting smart technologies to protect the environment and increase crop yields. Unmanned aerial vehicles, commonly known as drones, have become essential tools for farmers worldwide.\n\nEquipped with multispectral cameras, agricultural drones fly over expansive fields to identify plant diseases before visible symptoms appear. They measure moisture levels in the soil and detect pest infestations with high precision. By analyzing this real-time data, automated sprayers apply water and organic fertilizers only where necessary.\n\nThis targeted approach reduces chemical runoff into nearby rivers by nearly 40 percent. Furthermore, farmers save fuel and labor costs by monitoring hundreds of acres in just a few hours. Agricultural experts predict that drone technology will play a crucial role in feeding global populations sustainably.`,
    translation: `Nông nghiệp hiện đại đang nhanh chóng áp dụng các công nghệ thông minh để bảo vệ môi trường và gia tăng sản lượng cây trồng. Máy bay không người lái, thường được gọi là drone, đã trở thành công cụ thiết yếu cho người nông dân trên toàn thế giới.\n\nĐược trang bị máy ảnh đa phổ, các drone nông nghiệp bay qua những cánh đồng rộng lớn để nhận diện sâu bệnh ở thực vật trước khi các triệu chứng rõ rệt xuất hiện. Chúng đo lường độ ẩm trong đất và phát hiện các ổ sâu hại với độ chính xác cao. Bằng cách phân tích dữ liệu thời gian thực này, các máy phun tự động chỉ cung cấp nước và phân bón hữu cơ tại những nơi thực sự cần thiết.\n\nPhương pháp tiếp cận có mục tiêu này giúp giảm lượng hóa chất chảy tràn vào các con sông lân cận tới gần 40%. Hơn nữa, nông dân tiết kiệm chi phí nhiên liệu và nhân công nhờ theo dõi hàng trăm mẫu đất chỉ trong vài giờ. Các chuyên gia nông nghiệp dự đoán rằng công nghệ drone sẽ đóng vai trò then chốt trong việc nuôi sống dân số toàn cầu một cách bền vững.`,
    vocabularies: [
      { word: "unmanned", ipa: "/ʌnˈmænd/", pos: "adj", meaning: "không người lái" },
      { word: "infestation", ipa: "/ˌɪnfeˈsteɪʃn/", pos: "n", meaning: "sự phá hoại của sâu bọ" },
      { word: "precision", ipa: "/prɪˈsɪʒn/", pos: "n", meaning: "độ chính xác" },
      { word: "runoff", ipa: "/ˈrʌnɒf/", pos: "n", meaning: "dòng chảy tràn bề mặt" },
    ],
    questions: [
      {
        id: "q35_1",
        text: "What camera technology do agricultural drones use to detect early plant diseases?",
        options: ["Infrared microscopes", "Multispectral cameras", "Thermal sonar", "Standard black-and-white lenses"],
        correct: 1,
        explanation: "Bài đọc nêu: 'Equipped with multispectral cameras, agricultural drones fly over expansive fields'.",
      },
      {
        id: "q35_2",
        text: "By how much does the targeted drone spraying reduce chemical runoff into rivers?",
        options: ["Nearly 10 percent", "Nearly 40 percent", "Over 90 percent", "Exactly 5 percent"],
        correct: 1,
        explanation: "Bài nêu rõ: 'This targeted approach reduces chemical runoff into nearby rivers by nearly 40 percent'.",
      },
      {
        id: "q35_3",
        text: "How do drones assist farmers with cost reduction?",
        options: [
          "By eliminating all need for seeds",
          "By saving fuel and labor costs through rapid acreage monitoring",
          "By replacing all tractors with airplanes",
          "By producing organic fertilizer automatically",
        ],
        correct: 1,
        explanation: "Đoạn 3 giải thích: 'farmers save fuel and labor costs by monitoring hundreds of acres in just a few hours'.",
      },
    ],
  },
  {
    id: "r36",
    title: "Asynchronous Communication in Remote Teams",
    category: "Workplace",
    level: "B1",
    icon: "💻",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    duration: "3 min",
    wordCount: 152,
    passage: `As distributed workforces become the norm, international companies are shifting away from constant real-time meetings toward asynchronous communication. In an asynchronous model, team members collaborate without expecting an immediate reply, allowing individuals to process information thoughtfully and respond when convenient.\n\nThis working style relies on comprehensive written documentation, organized project management boards, and recorded video walkthroughs. Instead of scheduling urgent conference calls across conflicting time zones, managers publish clear project briefs with explicit deadlines. Consequently, employees experience fewer interruptions throughout their workday and preserve uninterrupted blocks of time for deep focus.\n\nHowever, thriving in an asynchronous culture requires deliberate discipline. Team members must write with extreme clarity, provide sufficient context in every update, and maintain proactive accountability to prevent project bottlenecks.`,
    translation: `Khi lực lượng lao động phân tán trở thành tiêu chuẩn phổ biến, các công ty quốc tế đang chuyển dần từ các cuộc họp trực tuyến liên tục sang giao tiếp bất đồng bộ. Trong mô hình bất đồng bộ, các thành viên trong nhóm cộng tác với nhau mà không đòi hỏi phản hồi ngay lập tức, cho phép mỗi cá nhân suy ngẫm kỹ lưỡng về thông tin và trả lời khi thuận tiện.\n\nPhong cách làm việc này dựa vào tài liệu văn bản toàn diện, các bảng quản lý dự án ngăn nắp và video hướng dẫn được ghi hình sẵn. Thay vì lên lịch các cuộc gọi hội nghị khẩn cấp qua các múi giờ xung đột nhau, các nhà quản lý công bố bản tóm tắt dự án rõ ràng kèm theo hạn chót cụ thể. Do đó, nhân viên ít bị gián đoạn hơn trong suốt ngày làm việc và duy trì được những khoảng thời gian tập trung sâu liên tục.\n\nTuy nhiên, để phát triển tốt trong văn hóa bất đồng bộ đòi hỏi tính kỷ luật tự giác cao độ. Các thành viên phải viết văn bản với sự mạch lạc tuyệt đối, cung cấp đầy đủ ngữ cảnh trong từng cập nhật và duy trì tính chủ động chịu trách nhiệm để tránh làm tắc nghẽn tiến độ dự án.`,
    vocabularies: [
      { word: "asynchronous", ipa: "/eɪˈsɪŋkrənəs/", pos: "adj", meaning: "bất đồng bộ, không cùng lúc" },
      { word: "interruption", ipa: "/ˌɪntəˈrʌpʃn/", pos: "n", meaning: "sự gián đoạn, ngắt quãng" },
      { word: "explicit", ipa: "/ɪkˈsplɪsɪt/", pos: "adj", meaning: "rõ ràng, dứt khoát" },
      { word: "bottleneck", ipa: "/ˈbɒtlnek/", pos: "n", meaning: "điểm nghẽn, sự trì trệ" },
    ],
    questions: [
      {
        id: "q36_1",
        text: "What defines an asynchronous collaboration model?",
        options: [
          "Mandatory daily video calls",
          "Working together without requiring immediate real-time replies",
          "Only communicating via handwritten letters",
          "Working at the exact same physical desk",
        ],
        correct: 1,
        explanation: "Bài nêu: 'In an asynchronous model, team members collaborate without expecting an immediate reply'.",
      },
      {
        id: "q36_2",
        text: "What is a major benefit for employees working asynchronously?",
        options: [
          "Fewer interruptions and uninterrupted blocks of time for deep focus",
          "Working 24 hours continuously without sleep",
          "Never writing project briefs",
          "Eliminating all project deadlines",
        ],
        correct: 0,
        explanation: "Đoạn 2 nêu rõ: 'employees experience fewer interruptions throughout their workday and preserve uninterrupted blocks of time for deep focus'.",
      },
      {
        id: "q36_3",
        text: "What quality is necessary to avoid project bottlenecks in asynchronous teams?",
        options: [
          "Relying solely on phone calls",
          "Writing with extreme clarity and providing sufficient context",
          "Ignoring all project management boards",
          "Working only on weekends",
        ],
        correct: 1,
        explanation: "Đoạn 3 nhấn mạnh: 'Team members must write with extreme clarity, provide sufficient context in every update'.",
      },
    ],
  },
  {
    id: "r37",
    title: "River Interceptors Combating Ocean Plastic",
    category: "Environment",
    level: "A2",
    icon: "🌊",
    coverImage: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=600&auto=format&fit=crop&q=80",
    duration: "3 min",
    wordCount: 140,
    passage: `Millions of tons of synthetic plastic enter the oceans every year, threatening marine wildlife and coastal communities. Environmental researchers discovered that the majority of this waste originates from approximately one thousand heavily polluted rivers worldwide.\n\nTo address this crisis before trash reaches the open sea, engineers designed autonomous solar-powered vessels known as river interceptors. Anchored strategically in river currents, these floating machines use long barriers to guide plastic debris onto a conveyor belt. The collected waste is then deposited into automated dumpsters inside the vessel.\n\nPowered entirely by renewable solar energy, each interceptor can extract up to fifty thousand kilograms of plastic waste daily. Environmental organizations are currently deploying these vessels across Southeast Asia, Latin America, and Africa to restore river ecosystems and prevent marine pollution at its source.`,
    translation: `Hàng triệu tấn nhựa tổng hợp trôi vào các đại dương mỗi năm, đe dọa sinh vật biển và các cộng đồng dân cư ven biển. Các nhà nghiên cứu môi trường phát hiện ra rằng phần lớn lượng rác thải này bắt nguồn từ khoảng một nghìn con sông bị ô nhiễm nặng nề trên khắp thế giới.\n\nĐể giải quyết cuộc khủng hoảng này trước khi rác trôi ra biển khơi, các kỹ sư đã chế tạo các tàu tự hành chạy bằng năng lượng mặt trời được gọi là tàu đánh chặn sông ngòi (river interceptors). Được neo đậu có chiến lược tại các dòng chảy của sông, những cỗ máy nổi này sử dụng các rào chắn dài để dẫn rác thải nhựa lên băng chuyền. Lượng rác thu gom sau đó được đưa vào các thùng chứa tự động bên trong thân tàu.\n\nHoạt động hoàn toàn bằng năng lượng mặt trời tái tạo, mỗi tàu đánh chặn có thể vớt tới năm mươi nghìn kilôgam rác thải nhựa mỗi ngày. Các tổ chức môi trường hiện đang triển khai các con tàu này trên khắp Đông Nam Á, Châu Mỹ Latinh và Châu Phi để phục hồi các hệ sinh thái sông ngòi và ngăn ngừa ô nhiễm đại dương ngay từ nguồn gốc.`,
    vocabularies: [
      { word: "synthetic", ipa: "/sɪnˈθetɪk/", pos: "adj", meaning: "tổng hợp, nhân tạo" },
      { word: "debris", ipa: "/ˈdebriː/", pos: "n", meaning: "mảnh vụn, đống rác thải" },
      { word: "conveyor", ipa: "/kənˈveɪə/", pos: "n", meaning: "băng chuyền, băng tải" },
      { word: "deploy", ipa: "/dɪˈplɔɪ/", pos: "v", meaning: "triển khai, bố trí" },
    ],
    questions: [
      {
        id: "q37_1",
        text: "Where does the majority of ocean plastic waste originate from?",
        options: ["Desert winds", "Approximately 1,000 heavily polluted rivers", "Commercial cruise ships exclusively", "Deep-sea volcanism"],
        correct: 1,
        explanation: "Bài đọc nêu rõ: 'the majority of this waste originates from approximately one thousand heavily polluted rivers worldwide'.",
      },
      {
        id: "q37_2",
        text: "How do river interceptors operate without polluting emissions?",
        options: ["By burning collected plastic", "They are powered entirely by renewable solar energy", "They use nuclear mini-reactors", "They are pulled by draft horses"],
        correct: 1,
        explanation: "Bài nêu rõ: 'Powered entirely by renewable solar energy, each interceptor can extract up to fifty thousand kilograms'.",
      },
      {
        id: "q37_3",
        text: "How much plastic waste can a single interceptor extract per day?",
        options: ["Up to 500 kilograms", "Up to 50,000 kilograms", "Exactly 1,000 kilograms", "Over 1,000,000 kilograms"],
        correct: 1,
        explanation: "Bài nêu: 'each interceptor can extract up to fifty thousand kilograms of plastic waste daily'.",
      },
    ],
  },
  {
    id: "r38",
    title: "The Rise of Embedded Finance and Neobanks",
    category: "Business",
    level: "B2",
    icon: "💳",
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80",
    duration: "4 min",
    wordCount: 168,
    passage: `The financial technology sector is experiencing a monumental transformation driven by embedded finance and digital-native neobanks. Traditional brick-and-mortar retail banks once held an undisputed monopoly over consumer deposit accounts and lending services. Today, open application programming interfaces (APIs) allow non-financial platforms, from ride-sharing applications to e-commerce marketplaces, to integrate seamless payment gateways and debit accounts directly into their user interfaces.\n\nNeobanks appeal strongly to younger generations by offering zero transaction fees, real-time expenditure analytics, and automated micro-saving tools. By operating without costly physical branch networks, digital challenger banks significantly lower overhead expenditures and pass these cost efficiencies to consumers in the form of elevated deposit yields.\n\nNevertheless, this rapid disintermediation presents regulatory headaches. Compliance authorities increasingly scrutinize capital adequacy ratios, anti-money laundering (AML) safeguards, and cybersecurity vulnerability management across decentralized financial service providers.`,
    translation: `Ngành công nghệ tài chính đang trải qua một bước chuyển mình mang tính lịch sử được thúc đẩy bởi tài chính nhúng và các ngân hàng số thế hệ mới (neobanks). Các ngân hàng bán lẻ truyền thống với chi nhánh vật lý trước đây từng nắm giữ thế độc quyền không thể bàn cãi đối với tài khoản tiền gửi tiêu dùng và dịch vụ cho vay. Ngày nay, các giao diện lập trình ứng dụng mở (API) cho phép các nền tảng phi tài chính, từ ứng dụng gọi xe đến các sàn thương mại điện tử, tích hợp cổng thanh toán liền mạch và tài khoản thẻ ghi nợ trực tiếp vào giao diện người dùng của họ.\n\nCác ngân hàng số thu hút mạnh mẽ thế hệ trẻ nhờ việc không thu phí giao dịch, cung cấp phân tích chi tiêu theo thời gian thực và các công cụ tích lũy tự động quy mô nhỏ. Nhờ vận hành mà không cần hệ thống chi nhánh vật lý tốn kém, các ngân hàng số thách thức giảm đáng kể chi phí vận hành chung và chuyển các khoản tiết kiệm chi phí này cho người tiêu dùng dưới hình thức lãi suất tiền gửi cao hơn.\n\nTuy nhiên, sự phi trung gian hóa nhanh chóng này cũng tạo ra nhiều thách thức cho các cơ quan quản lý. Các cơ quan giám sát tuân thủ ngày càng kiểm tra gắt gao tỷ lệ an toàn vốn, các biện pháp phòng chống rửa tiền (AML) và quy trình quản trị lỗ hổng an ninh mạng trên các nhà cung cấp dịch vụ tài chính phân tán.`,
    vocabularies: [
      { word: "monopoly", ipa: "/məˈnɒpəli/", pos: "n", meaning: "thế độc quyền" },
      { word: "overhead", ipa: "/ˈəʊvəhed/", pos: "n", meaning: "chi phí vận hành chung" },
      { word: "disintermediation", ipa: "/ˌdɪsɪntəˌmiːdiˈeɪʃn/", pos: "n", meaning: "phi trung gian hóa" },
      { word: "scrutinize", ipa: "/ˈskruːtənaɪz/", pos: "v", meaning: "kiểm tra soi xét kỹ lưỡng" },
    ],
    questions: [
      {
        id: "q38_1",
        text: "What technology allows non-financial apps to integrate payment gateways?",
        options: ["Open application programming interfaces (APIs)", "Satellite radio signals", "Magnetic paper checks", "Manual fax machines"],
        correct: 0,
        explanation: "Bài nêu rõ: 'open application programming interfaces (APIs) allow non-financial platforms... to integrate seamless payment gateways'.",
      },
      {
        id: "q38_2",
        text: "How do neobanks achieve lower overhead costs compared to traditional banks?",
        options: [
          "By operating without costly physical branch networks",
          "By refusing to hire software engineers",
          "By lending solely in cash currencies",
          "By charging triple transaction fees",
        ],
        correct: 0,
        explanation: "Bài nêu rõ: 'By operating without costly physical branch networks, digital challenger banks significantly lower overhead expenditures'.",
      },
      {
        id: "q38_3",
        text: "What regulatory issue is increasingly scrutinized in decentralized financial providers?",
        options: [
          "Office interior design choices",
          "Anti-money laundering (AML) safeguards and capital adequacy",
          "Color schemes of debit cards",
          "Customer dress codes",
        ],
        correct: 1,
        explanation: "Đoạn cuối nêu rõ: 'Compliance authorities increasingly scrutinize capital adequacy ratios, anti-money laundering (AML) safeguards'.",
      },
    ],
  },
  {
    id: "r39",
    title: "Hyperspectral Imaging in Art Restoration",
    category: "Technology",
    level: "B2",
    icon: "🎨",
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    duration: "4 min",
    wordCount: 160,
    passage: `Preserving fragile masterpieces from the Renaissance and Baroque eras requires a delicate balance between historical reverence and cutting-edge technology. For centuries, art conservators relied on invasive chemical swabs and naked-eye inspection to uncover hidden sketches beneath ancient oil paint layers. Today, non-destructive optical spectroscopy has revolutionized heritage preservation.\n\nHyperspectral imaging systems illuminate canvases across hundreds of narrow electromagnetic bands, ranging from ultraviolet to short-wave infrared frequencies. Because distinct historical pigments absorb and reflect light uniquely, computer vision algorithms can differentiate original brushstrokes from centuries of cumulative restoration attempts. In several recent investigations, conservators discovered altered signatures and concealed draft drawings beneath famous portraits.\n\nBy creating comprehensive chemical maps without physically scraping canvas surfaces, museum conservators can formulate targeted cleaning solvents. This precision prevents pigment degradation and ensures that priceless cultural artifacts endure for future generations.`,
    translation: `Việc bảo tồn các kiệt tác nghệ thuật mong manh từ thời kỳ Phục hưng và Baroque đòi hỏi sự cân bằng tinh tế giữa lòng tôn kính lịch sử và công nghệ tiên tiến hàng đầu. Trong nhiều thế kỷ, các chuyên gia bảo tồn mỹ thuật phải dựa vào tăm bông hóa chất xâm lấn và việc quan sát bằng mắt thường để phát hiện các bản phác thảo ẩn giấu bên dưới các lớp sơn dầu cổ đại. Ngày nay, quang phổ quang học không phá hủy đã tạo nên cuộc cách mạng trong lĩnh vực bảo tồn di sản.\n\nCác hệ thống chụp ảnh siêu phổ chiếu sáng các bức tranh trên hàng trăm dải sóng điện từ hẹp, trải dài từ tần số tia cực tím đến tia hồng ngoại sóng ngắn. Vì các chất màu lịch sử khác nhau hấp thụ và phản xạ ánh sáng theo cách độc nhất, các thuật toán thị giác máy tính có thể phân biệt nét vẽ ban đầu của danh họa với hàng thế kỷ các nỗ lực phục hồi tích lũy sau này. Trong nhiều cuộc điều tra gần đây, các nhà bảo tồn đã phát hiện ra các chữ ký bị sửa đổi và các bản vẽ phác thảo bị che giấu bên dưới các bức chân dung nổi tiếng.\n\nBằng cách tạo ra các bản đồ hóa học toàn diện mà không cần cạo xước bề mặt tranh sơn dầu, các chuyên gia bảo tồn bảo tàng có thể điều chế các dung môi làm sạch có mục tiêu chính xác. Sự chuẩn xác này ngăn ngừa sự thoái hóa chất màu và đảm bảo rằng các hiện vật văn hóa vô giá có thể trường tồn cho các thế hệ tương lai.`,
    vocabularies: [
      { word: "reverence", ipa: "/ˈrevərəns/", pos: "n", meaning: "sự tôn kính, trân trọng" },
      { word: "invasive", ipa: "/ɪnˈveɪsɪv/", pos: "adj", meaning: "có tính xâm lấn, can thiệp sâu" },
      { word: "pigment", ipa: "/ˈpɪɡmənt/", pos: "n", meaning: "chất màu, sắc tố" },
      { word: "degradation", ipa: "/ˌdeɡrəˈdeɪʃn/", pos: "n", meaning: "sự thoái hóa, suy thoái" },
    ],
    questions: [
      {
        id: "q39_1",
        text: "What historical method did art conservators traditionally rely on before modern spectroscopy?",
        options: ["Microwave oven heating", "Invasive chemical swabs and naked-eye inspection", "Digital 3D holograms", "Submerging paintings in saltwater"],
        correct: 1,
        explanation: "Bài nêu rõ: 'For centuries, art conservators relied on invasive chemical swabs and naked-eye inspection'.",
      },
      {
        id: "q39_2",
        text: "How does hyperspectral imaging distinguish original brushstrokes from later restoration attempts?",
        options: [
          "By burning the canvas edge",
          "Distinct historical pigments absorb and reflect light uniquely across electromagnetic bands",
          "By dissolving all paint layers completely",
          "By measuring the physical weight of the wooden frame",
        ],
        correct: 1,
        explanation: "Bài nêu: 'Because distinct historical pigments absorb and reflect light uniquely, computer vision algorithms can differentiate original brushstrokes'.",
      },
      {
        id: "q39_3",
        text: "What is a major advantage of non-destructive chemical mapping for museums?",
        options: [
          "It allows targeted cleaning without physically scraping the canvas surface",
          "It makes paintings completely waterproof",
          "It converts oil paintings into digital NFTs automatically",
          "It repels all museum visitors",
        ],
        correct: 0,
        explanation: "Đoạn cuối nhấn mạnh: 'By creating comprehensive chemical maps without physically scraping canvas surfaces, museum conservators can formulate targeted cleaning solvents'.",
      },
    ],
  },
  {
    id: "r40",
    title: "Magnetic Confinement Fusion and the Quest for Net Energy",
    category: "Science",
    level: "C1",
    icon: "⚡",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    duration: "4 min",
    wordCount: 175,
    passage: `Nuclear fusion, the physical process that powers stellar cores, represents the pinnacle of clean energy aspirations. Unlike commercial fission reactors that split heavy uranium nuclei and generate long-lived radioactive waste, fusion forces hydrogen isotopes—deuterium and tritium—to fuse under extreme temperature and pressure, yielding harmless helium and energetic neutrons.\n\nThe foremost engineering obstacle involves confining plasma heated beyond one hundred million degrees Celsius. Tokamak reactors deploy superconducting magnetic coils to twist ionized plasma into a toroidal shape, preventing contact with reactor walls. Recently, experimental facilities achieved critical operational milestones by sustaining high-confinement mode (H-mode) plasmas for several consecutive minutes.\n\nTo attain commercial viability, fusion installations must achieve a high energy gain factor, commonly designated as Q. An energy ratio exceeding unity signifies that output thermal power surpasses the external input required to sustain plasma stability. As high-temperature superconducting (HTS) tape technology matures, compact magnetic fusion systems are emerging as formidable competitors in global decarbonization roadmaps.`,
    translation: `Nhiệt hạch hạt nhân, quá trình vật lý cung cấp năng lượng cho tâm các ngôi sao, đại diện cho đỉnh cao khát vọng về năng lượng sạch của nhân loại. Không giống như các lò phản ứng phân hạch thương mại phân tách các hạt nhân urani nặng và tạo ra chất thải phóng xạ tồn tại lâu dài, phản ứng nhiệt hạch ép các đồng vị hydro—deuteri và triti—hợp nhất dưới nhiệt độ và áp suất cực hạn, tạo ra heli vô hại và các neutron giàu năng lượng.\n\nTrở ngại kỹ thuật hàng đầu liên quan đến việc giam giữ plasma được nung nóng vượt quá một trăm triệu độ C. Các lò phản ứng Tokamak triển khai các cuộn dây từ tính siêu dẫn để xoắn plasma bị ion hóa thành hình xuyến, ngăn không cho plasma tiếp xúc với các thành lò phản ứng. Gần đây, các cơ sở thử nghiệm đã đạt được các cột mốc vận hành mang tính bước ngoặt bằng cách duy trì trạng thái plasma chế độ giam giữ cao (H-mode) trong nhiều phút liên tiếp.\n\nĐể đạt được tính khả thi thương mại, các tổ hợp nhiệt hạch phải đạt được hệ số khuếch đại năng lượng cao, thường được ký hiệu là Q. Tỷ số năng lượng vượt quá một biểu thị rằng công suất nhiệt đầu ra vượt trội so với năng lượng đầu vào bên ngoài cần thiết để duy trì sự ổn định của plasma. Khi công nghệ băng siêu dẫn nhiệt độ cao (HTS) dần hoàn thiện, các hệ thống nhiệt hạch từ tính nhỏ gọn đang nổi lên như những đối thủ đáng gờm trong lộ trình phi carbon hóa toàn cầu.`,
    vocabularies: [
      { word: "isotope", ipa: "/ˈaɪsətəʊp/", pos: "n", meaning: "đồng vị" },
      { word: "confinement", ipa: "/kənˈfaɪnmənt/", pos: "n", meaning: "sự giam giữ, sự hạn chế" },
      { word: "toroidal", ipa: "/təˈrɔɪdəl/", pos: "adj", meaning: "hình xuyến" },
      { word: "surpass", ipa: "/səˈpɑːs/", pos: "v", meaning: "vượt trội, vượt qua" },
    ],
    questions: [
      {
        id: "q40_1",
        text: "What harmless byproduct is generated when hydrogen isotopes fuse?",
        options: ["Uranium slag", "Helium", "Lead dust", "Chlorine gas"],
        correct: 1,
        explanation: "Bài nêu rõ: 'yielding harmless helium and energetic neutrons'.",
      },
      {
        id: "q40_2",
        text: "What device configuration is used in Tokamaks to prevent plasma from contacting reactor walls?",
        options: [
          "Superconducting magnetic coils twisting plasma into a toroidal shape",
          "Glass containment bottles",
          "Solid ice blankets",
          "Laser cooling fans",
        ],
        correct: 0,
        explanation: "Bài nêu: 'Tokamak reactors deploy superconducting magnetic coils to twist ionized plasma into a toroidal shape, preventing contact with reactor walls'.",
      },
      {
        id: "q40_3",
        text: "What does an energy gain factor (Q) exceeding unity signify?",
        options: [
          "The reactor has shut down permanently",
          "Output thermal power surpasses the external input required to sustain plasma",
          "Zero electricity is produced",
          "The plasma temperature has dropped to zero",
        ],
        correct: 1,
        explanation: "Đoạn cuối giải thích: 'An energy ratio exceeding unity signifies that output thermal power surpasses the external input required to sustain plasma stability'.",
      },
    ],
  },
];

// Write r33 to r40 files
newPassages.forEach((passage) => {
  const fileContent = `import { ReadingPassage } from "./types";

export const passage_${passage.id}: ReadingPassage = ${JSON.stringify(passage, null, 2)};
`;

  const filePath = path.join(passagesDir, `passage_${passage.id}.ts`);
  fs.writeFileSync(filePath, fileContent, "utf8");
  console.log(`Generated new passage_${passage.id}.ts`);
});

// Generate index.ts
let indexContent = `export * from "./types";\n\n`;

for (let i = 1; i <= 40; i++) {
  indexContent += `import { passage_r${i} } from "./passage_r${i}";\n`;
}

indexContent += `\nexport {\n`;
for (let i = 1; i <= 40; i++) {
  indexContent += `  passage_r${i},\n`;
}
indexContent += `};\n\n`;

indexContent += `export const READING_PASSAGES_DATA = [\n`;
for (let i = 1; i <= 40; i++) {
  indexContent += `  passage_r${i},\n`;
}
indexContent += `];\n`;

fs.writeFileSync(path.join(passagesDir, "index.ts"), indexContent, "utf8");
console.log("Generated features/reading/data/passages/index.ts with all 40 passages!");
