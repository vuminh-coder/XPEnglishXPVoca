import { ReadingPassage } from "./readingMockData";

export const ADVANCED_READING_PASSAGES: ReadingPassage[] = [
  // ==================== B2 - C2 ACADEMIC & ADVANCED BUSINESS (16 PASSAGES: r17 - r32) ====================
  {
    id: "r17",
    title: "The Neuroscience of Sleep Architecture & Memory Consolidation",
    category: "Science",
    level: "C1",
    icon: "🧠",
    coverImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80",
    duration: "6 min",
    wordCount: 245,
    passage: `Sleep is not merely a biological state of passive quiescence; rather, it constitutes an intensely active neurological process imperative for synaptic homeostasis and cognitive stabilization.\n\nContemporary polysomnography delineates sleep into two primary alternating phases: Non-Rapid Eye Movement (NREM) and Rapid Eye Movement (REM) sleep. During slow-wave NREM stages—characterized by high-amplitude electroencephalographic delta oscillations—the hippocampus acts as a temporary buffer, systematically replaying daytime neuronal firing patterns to transfer episodic representations into the neocortex for enduring long-term retention.\n\nSimultaneously, the glymphatic clearance pathway accelerates interstitial cerebrospinal fluid exchange by up to 60%, purging neurotoxic metabolic by-products, including amyloid-beta oligomers implicated in neurodegenerative pathologies.\n\nChronically truncated sleep architecture severely impedes prefrontal cortex perfusion, resulting in diminished emotional regulation, attenuated working memory capacity, and compromised executive functioning. Consequently, sleep optimization is recognized as an indispensable foundation for sustained intellectual performance.`,
    translation: `Giấc ngủ không chỉ đơn thuần là trạng thái nghỉ ngơi thụ động về mặt sinh học; đúng hơn, đó là một quá trình thần kinh hoạt động cực kỳ tích cực, mang tính bắt buộc đối với sự cân bằng nội môi synap và sự ổn định nhận thức.\n\nKỹ thuật đo đa ký giấc ngủ hiện đại phân chia giấc ngủ thành hai giai đoạn luân phiên: Giấc ngủ không chuyển động mắt nhanh (NREM) và Giấc ngủ chuyển động mắt nhanh (REM). Trong các giai đoạn sóng chậm của NREM—được đặc trưng bởi các dao động delta biên độ cao trên điện não đồ—vùng hồi hải mã đóng vai trò như một bộ nhớ đệm tạm thời, tái hiện một cách có hệ thống các chuỗi phát xung nơ-ron ban ngày để chuyển giao các ký ức sự kiện sang vỏ não mới nhằm lưu trữ lâu dài.\n\nĐồng thời, hệ thống đào thải glymphatic tăng tốc độ trao đổi dịch não tủy kẽ lên tới 60%, làm sạch các phụ phẩm chuyển hóa gây độc tế bào thần kinh, bao gồm các mảng amyloid-beta liên quan đến bệnh lý thoái hóa thần kinh.\n\nViệc cắt ngắn cấu trúc giấc ngủ mãn tính làm cản trở nghiêm trọng quá trình tưới máu vỏ não trước trán, dẫn đến suy giảm khả năng kiểm soát cảm xúc, suy giảm dung lượng trí nhớ làm việc và hạn chế chức năng điều hành nhận thức. Do đó, tối ưu hóa giấc ngủ được công nhận là nền tảng không thể thiếu cho hiệu suất trí tuệ bền vững.`,
    vocabularies: [
      { word: "quiescence", ipa: "/kwiˈes.əns/", pos: "n", meaning: "trạng thái yên tĩnh, tạm nghỉ ngơi" },
      { word: "homeostasis", ipa: "/ˌhoʊ.mi.oʊˈsteɪ.sɪs/", pos: "n", meaning: "sự cân bằng nội môi sinh học" },
      { word: "consolidation", ipa: "/kənˌsɑː.lɪˈdeɪ.ʃən/", pos: "n", meaning: "sự củng cố, làm vững chắc ký ức" },
      { word: "oligomer", ipa: "/əˈlɪɡ.ə.mɚ/", pos: "n", meaning: "chuỗi phân tử protein độc hại (mảng bám)" },
      { word: "perfusion", ipa: "/pɚˈfjuː.ʒən/", pos: "n", meaning: "sự tưới máu, lưu thông tuần hoàn máu não" },
    ],
    questions: [
      {
        id: "q17_1",
        text: "What primary role does the hippocampus play during slow-wave NREM sleep?",
        options: [
          "It permanently stores all sensory memories directly.",
          "It acts as a temporary buffer replaying neuronal patterns into the neocortex.",
          "It ceases all metabolic activity to conserve cranial energy.",
          "It produces delta oscillations to paralyze skeletal muscles."
        ],
        correct: 1,
        explanation: "Bài đọc nêu rõ: 'the hippocampus acts as a temporary buffer, systematically replaying daytime neuronal firing patterns to transfer episodic representations into the neocortex'."
      },
      {
        id: "q17_2",
        text: "By how much does the glymphatic pathway increase cerebrospinal fluid exchange during sleep?",
        options: ["Up to 20%", "Up to 40%", "Up to 60%", "Up to 80%"],
        correct: 2,
        explanation: "Dẫn chứng từ đoạn 3: 'the glymphatic clearance pathway accelerates interstitial cerebrospinal fluid exchange by up to 60%'."
      },
      {
        id: "q17_3",
        text: "Which cognitive deficit is associated with chronically truncated sleep architecture?",
        options: [
          "Hyper-accelerated linguistic acquisition",
          "Attenuated working memory capacity and diminished emotional regulation",
          "Permanent loss of autonomic respiratory reflexes",
          "Involuntary rapid eye movements during waking hours"
        ],
        correct: 1,
        explanation: "Dẫn chứng từ đoạn cuối: 'resulting in diminished emotional regulation, attenuated working memory capacity, and compromised executive functioning'."
      }
    ]
  },
  {
    id: "r18",
    title: "Deep-Sea Marine Archaeology & Autonomous Underwater Submersibles",
    category: "Exploration",
    level: "B2",
    icon: "🌊",
    coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80",
    duration: "5 min",
    wordCount: 220,
    passage: `Until recent decades, the abyssal plains of the world's oceans remained an insurmountable frontier for classical archaeologists. At depths exceeding 3,000 meters, crushing hydrostatic pressure, absolute darkness, and freezing temperatures precluded direct human scuba exploration.\n\nThe deployment of Autonomous Underwater Vehicles (AUVs) and fiber-optically tethered Remotely Operated Vehicles (ROVs) has revolutionized marine history. Equipped with synthetic aperture sonar and high-definition stereoscopic photogrammetry, robotic explorers can map underwater shipwreck sites with sub-centimeter accuracy without disturbing delicate organic artifacts.\n\nIn hyper-saline, anoxic maritime basins—such as the bottom layers of the Black Sea—the absence of wood-boring shipworms has preserved Roman and Byzantine merchant vessels in extraordinary states of preservation, including carved rudders, intact masts, and coiled hemp rigging undisturbed for twelve centuries.\n\nMaritime archaeologists are no longer mere salvage divers retrieving decorative bullion; they have become digital preservationists constructing high-fidelity three-dimensional archaeological archives that democratize deep-ocean heritage for global research institutions.`,
    translation: `Cho đến những thập kỷ gần đây, các đồng bằng biển thẳm của các đại dương trên thế giới vẫn là một ranh giới bất khả thi đối với các nhà khảo cổ học cổ điển. Ở độ sâu vượt quá 3.000 mét, áp suất thủy tĩnh khủng khiếp, bóng tối tuyệt đối và nhiệt độ đóng băng đã ngăn cản sự thám hiểm lặn biển trực tiếp của con người.\n\nViệc triển khai các Phương tiện tự hành dưới nước (AUV) và Phương tiện điều khiển từ xa có dây cáp quang (ROV) đã tạo ra cuộc cách mạng trong lịch sử hàng hải. Được trang bị sóng âm khẩu độ tổng hợp và kỹ thuật đo đạc quang trắc lập thể độ nét cao, các robot thám hiểm có thể lập bản đồ các địa điểm đắm tàu dưới nước với độ chính xác dưới một centimet mà không làm xáo trộn các cổ vật hữu cơ mỏng manh.\n\nTại các bồn trũng hàng hải siêu mặn, yếm khí (thiếu oxy)—chẳng hạn như các lớp đáy của Biển Đen—sự vắng mặt của loài hà đục gỗ đã bảo tồn các tàu buôn La Mã và Byzantine ở trạng thái bảo quản phi thường, bao gồm bánh lái chạm khắc, cột buồm nguyên vẹn và dây thừng bằng cây gai dầu cuộn tròn không hề suy chuyển suốt 12 thế kỷ.\n\nCác nhà khảo cổ học hàng hải ngày nay không còn là những thợ lặn trục vớt kim loại quý; họ đã trở thành những chuyên gia lưu trữ kỹ thuật số kiến tạo các kho lưu trữ khảo cổ học ba chiều độ trung thực cao, đưa di sản đại dương sâu đến với các viện nghiên cứu toàn cầu.`,
    vocabularies: [
      { word: "insurmountable", ipa: "/ˌɪn.sɚˈmaʊn.t̬ə.bəl/", pos: "adj", meaning: "không thể vượt qua, nan giải" },
      { word: "hydrostatic", ipa: "/ˌhaɪ.drəˈstæt̬.ɪk/", pos: "adj", meaning: "thủy tĩnh (áp lực chất lỏng tĩnh)" },
      { word: "photogrammetry", ipa: "/ˌfoʊ.toʊˈɡræm.ə.tri/", pos: "n", meaning: "kỹ thuật đo ảnh quang trắc 3D" },
      { word: "anoxic", ipa: "/ænˈɑːk.sɪk/", pos: "adj", meaning: "thiếu hụt oxy, yếm khí" },
      { word: "bullion", ipa: "/ˈbʊl.i.ən/", pos: "n", meaning: "vàng thỏi, bạc nén đúc khối" },
    ],
    questions: [
      {
        id: "q18_1",
        text: "Why were Roman and Byzantine merchant vessels uniquely preserved in the Black Sea?",
        options: [
          "The seabed was coated in artificial preservative resins.",
          "The anoxic and hyper-saline conditions prevented wood-boring organisms from surviving.",
          "The deep ocean currents washed away all abrasive sediment.",
          "Volcanic ash entombed the vessels completely."
        ],
        correct: 1,
        explanation: "Bài đọc chỉ rõ: 'the absence of wood-boring shipworms has preserved Roman and Byzantine merchant vessels in extraordinary states of preservation' do môi trường anoxic."
      },
      {
        id: "q18_2",
        text: "What technology enables robotic explorers to map shipwreck sites with sub-centimeter accuracy?",
        options: [
          "Nuclear magnetic resonance scanners",
          "Synthetic aperture sonar and high-definition stereoscopic photogrammetry",
          "Manual rope measuring grids dropped from surface barges",
          "Standard infrared flashlights mounted on scuba masks"
        ],
        correct: 1,
        explanation: "Dẫn chứng đoạn 2: 'Equipped with synthetic aperture sonar and high-definition stereoscopic photogrammetry'."
      }
    ]
  },
  {
    id: "r19",
    title: "Artificial Intelligence Ethics & Autonomous Algorithmic Governance",
    category: "Technology",
    level: "C2",
    icon: "⚖️",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    duration: "7 min",
    wordCount: 260,
    passage: `As artificial neural architectures transition from predictive analytics to autonomous sociotechnical arbiters, the ethical imperative of algorithmic transparency has superseded utilitarian deployment velocity.\n\nDeep learning models, particularly multi-billion-parameter foundation models, frequently operate as inscrutable 'black boxes.' In consequential domains—including judicial sentencing recidivism scoring, automated mortgage underwriting, and clinical triage diagnostics—unexamined training data distributions frequently re-inscribe and amplify historical structural biases under an erroneous veneer of mathematical objectivity.\n\nTo counter algorithmic opacity, legal scholars and computer scientists advocate for verifiable 'mechanistic interpretability' and formalized algorithmic auditability. Regulatory frameworks, such as the European Union's AI Act, mandate enforceable risk classifications, requiring high-risk autonomous systems to guarantee human-in-the-loop fail-safes, post-market surveillance, and verifiable provenance tracking for synthetic outputs.\n\nUltimately, ethical artificial intelligence cannot be reduced to ex-post alignment patches. It necessitates an ex-ante epistemological framework where algorithmic accountability, civil liberties protection, and democratic oversight are mathematically encoded into loss functions and optimization constraints prior to production inference.`,
    translation: `Khi các cấu trúc nơ-ron nhân tạo chuyển đổi từ phân tích dự đoán sang vai trò trọng tài kinh tế - xã hội tự chủ, yêu cầu bắt buộc mang tính đạo đức về tính minh bạch của thuật toán đã thay thế cho tốc độ triển khai vị lợi.\n\nCác mô hình học sâu, đặc biệt là các mô hình nền tảng hàng tỷ tham số, thường hoạt động như những 'hộp đen' khó hiểu. Trong các lĩnh vực mang tính quyết định số phận—bao gồm tính điểm nguy cơ tái phạm trong tư pháp, tự động phê duyệt vay thế chấp và phân loại chẩn đoán lâm sàng—sự phân bổ dữ liệu huấn luyện không được kiểm chứng thường tái hiện và khuếch đại những thiên kiến định kiến lịch sử dưới lớp vỏ bọc khách quan toán học sai lầm.\n\nĐể chống lại sự thiếu minh bạch của thuật toán, các học giả pháp lý và nhà khoa học máy tính ủng hộ 'khả năng diễn giải cơ chế' có thể kiểm chứng và tính có thể kiểm toán chính thức. Các khung pháp lý, chẳng hạn như Đạo luật AI của Liên minh Châu Âu, bắt buộc phân loại rủi ro có hiệu lực thi hành, yêu cầu các hệ thống tự trị rủi ro cao phải đảm bảo cơ chế an toàn có con người can thiệp (human-in-the-loop), giám sát hậu mãi và truy xuất nguồn gốc có thể xác minh cho các sản phẩm tổng hợp.\n\nSau cùng, trí tuệ nhân tạo có đạo đức không thể chỉ quy về những bản vá căn chỉnh sau khi triển khai. Nó đòi hỏi một khung nhận thức luận tiền kiểm, nơi trách nhiệm giải trình thuật toán, bảo vệ quyền tự do dân sự và sự giám sát dân chủ được mã hóa toán học vào các hàm mất mát (loss functions) và các ràng buộc tối ưu hóa trước khi đưa vào suy luận thực tế.`,
    vocabularies: [
      { word: "inscrutable", ipa: "/ɪnˈskruː.t̬ə.bəl/", pos: "adj", meaning: "bí ẩn, không thể nhìn thấu hay hiểu nổi" },
      { word: "recidivism", ipa: "/rɪˈsɪd.ə.vɪ.zəm/", pos: "n", meaning: "sự tái phạm tội" },
      { word: "underwriting", ipa: "/ˈʌn.dɚˌraɪ.t̬ɪŋ/", pos: "n", meaning: "nghiệp vụ bảo lãnh, thẩm định rủi ro tài chính" },
      { word: "provenance", ipa: "/ˈprɑː.və.nəns/", pos: "n", meaning: "nguồn gốc xuất xứ, lai lịch dữ liệu" },
      { word: "epistemological", ipa: "/ɪˌpɪs.tə.məˈlɑː.dʒɪ.kəl/", pos: "adj", meaning: "thuộc về nhận thức luận, tri thức luận" },
    ],
    questions: [
      {
        id: "q19_1",
        text: "What danger is highlighted regarding training data in consequential domains like judicial sentencing?",
        options: [
          "It is stored on outdated floppy disks susceptible to magnetic loss.",
          "It can re-inscribe and amplify historical structural biases under an illusion of objectivity.",
          "It takes excessive bandwidth to transmit across fiber optic cables.",
          "It forces algorithms to default to manual calculations."
        ],
        correct: 1,
        explanation: "Đoạn 2 nêu rõ: 'unexamined training data distributions frequently re-inscribe and amplify historical structural biases under an erroneous veneer of mathematical objectivity'."
      },
      {
        id: "q19_2",
        text: "What does the author suggest regarding ethical AI development?",
        options: [
          "It should rely exclusively on voluntary post-launch industry surveys.",
          "It requires ethical and democratic principles encoded ex-ante into loss functions and optimization constraints.",
          "It should ban all neural network development permanently.",
          "It is unnecessary because foundation models are inherently free of human flaws."
        ],
        correct: 1,
        explanation: "Đoạn cuối nhấn mạnh: 'necessitates an ex-ante epistemological framework where algorithmic accountability... are mathematically encoded into loss functions... prior to production inference'."
      }
    ]
  },
  {
    id: "r20",
    title: "Urban Rewilding & Ecological Corridors in Contemporary Megacities",
    category: "Environment",
    level: "B2",
    icon: "🌿",
    coverImage: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80",
    duration: "5 min",
    wordCount: 215,
    passage: `Rapid urbanization has transformed global metropolitan landscapes into expansive thermal heat islands characterized by impermeable asphalt, fragmented ecosystems, and plummeting native biodiversity.\n\nIn response, pioneering urban planners in cities such as Singapore, Medellín, and London are implementing ambitious 'urban rewilding' initiatives. Unlike manicured municipal ornamental parks, rewilding deliberately reintroduces native flora, bioswales, and uncurated green corridors designed to replicate indigenous biomes.\n\nThese interconnected living arteries facilitate animal migration, reduce stormwater runoff by up to 45%, and lower ambient summer street temperatures through vegetative evapotranspiration by as much as 3.5 degrees Celsius.\n\nFurthermore, empirical psychological studies consistently reveal that visual and sensory immersion in biodiversity-rich urban forests correlates with statistically significant declines in salivary cortisol levels, alleviated anxiety, and enhanced subjective well-being among urban inhabitants.\n\nBy integrating biophilic architectural facades, pollinator pathways, and micro-wetlands into high-density zoning ordinances, 21st-century cities can evolve from ecological deserts into flourishing human-nature symbioses.`,
    translation: `Quá trình đô thị hóa nhanh chóng đã biến cảnh quan các đại đô thị toàn cầu thành các đảo nhiệt mở rộng đặc trưng bởi nhựa đường không thấm nước, các hệ sinh thái bị phân mảnh và sự suy giảm mạnh mẽ của đa dạng sinh học bản địa.\n\nĐể đối phó, các nhà quy hoạch đô thị tiên phong tại các thành phố như Singapore, Medellín và London đang thực hiện các sáng kiến 'tái hoang dã đô thị' đầy tham vọng. Khác với các công viên cảnh quan đô thị được cắt tỉa cầu kỳ, việc tái hoang dã chủ động tái du nhập hệ thực vật bản địa, rãnh thấm sinh học (bioswales) và các hành lang xanh tự nhiên nhằm mô phỏng lại các quần xã sinh vật nguyên bản.\n\nCác mạch nối sống này tạo điều kiện cho sự di chuyển của động vật, giảm lượng nước mưa chảy tràn bề mặt tới 45% và hạ nhiệt độ đường phố xung quanh vào mùa hè thông qua quá trình thoát hơi nước của thực vật lên tới 3,5 độ C.\n\nHơn nữa, các nghiên cứu tâm lý học thực nghiệm liên tục chứng minh rằng việc tiếp xúc thị giác và giác quan với rừng đô thị giàu tính đa dạng sinh học tương quan thuận với sự sụt giảm có ý nghĩa thống kê của nồng độ cortisol trong nước bọt, giảm lo âu và nâng cao mức độ hạnh phúc chủ quan của cư dân đô thị.`,
    vocabularies: [
      { word: "impermeable", ipa: "/ɪmˈpɝː.mi.ə.bəl/", pos: "adj", meaning: "không thấm qua được (nhựa đường, bê tông)" },
      { word: "bioswale", ipa: "/ˈbaɪ.oʊˌsweɪl/", pos: "n", meaning: "rãnh thoát nước sinh học lọc nước mưa" },
      { word: "evapotranspiration", ipa: "/ɪˌvæp.oʊˌtræn.spəˈreɪ.ʃən/", pos: "n", meaning: "quá trình bốc thoát hơi nước của thực vật" },
      { word: "biophilic", ipa: "/ˌbaɪ.oʊˈfɪl.ɪk/", pos: "adj", meaning: "ưa thiên nhiên, gắn kết kiến trúc với sinh thái" },
      { word: "symbiosis", ipa: "/ˌsɪm.baɪˈoʊ.sɪs/", pos: "n", meaning: "mối quan hệ cộng sinh" },
    ],
    questions: [
      {
        id: "q20_1",
        text: "How does urban rewilding differ from traditional manicured city parks?",
        options: [
          "It uses plastic turf and artificial trees to minimize maintenance costs.",
          "It deliberately reintroduces native flora and uncurated green corridors replicating indigenous biomes.",
          "It forbids pedestrians from entering any green spaces.",
          "It focuses entirely on commercial advertising billboards covered in moss."
        ],
        correct: 1,
        explanation: "Đoạn 2 nêu rõ: 'rewilding deliberately reintroduces native flora, bioswales, and uncurated green corridors designed to replicate indigenous biomes'."
      },
      {
        id: "q20_2",
        text: "What environmental and psychological benefits are linked to green corridors?",
        options: [
          "Increased asphalt hardness and higher noise pollution",
          "Lower ambient temperatures, reduced stormwater runoff, and decreased salivary cortisol",
          "Complete elimination of urban vehicle traffic",
          "Higher residential electricity consumption for irrigation"
        ],
        correct: 1,
        explanation: "Bài đọc liệt kê: 'reduce stormwater runoff by up to 45%, lower ambient summer street temperatures... declines in salivary cortisol levels'."
      }
    ]
  },
  {
    id: "r21",
    title: "Quantum Cryptography & Post-Quantum Network Security",
    category: "Technology",
    level: "C1",
    icon: "🔐",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    duration: "6 min",
    wordCount: 235,
    passage: `The foundational architecture of global e-commerce, banking authentication, and defense communications currently relies on asymmetric public-key cryptography, predominantly RSA and Elliptic Curve algorithms.\n\nThese protocols depend on the computational intractability of prime factorization and discrete logarithms for classical supercomputers. However, the theoretical realization of fault-tolerant quantum computing—employing Shor's algorithm—threatens to render these mathematical barriers obsolete within minutes.\n\nTo pre-empt the looming 'quantum apocalypse,' cybersecurity agencies have initiated global migrations toward Post-Quantum Cryptography (PQC). The National Institute of Standards and Technology (NIST) has standardized quantum-resistant lattice-based mathematical algorithms, such as Kyber for key encapsulation and Dilithium for digital signatures.\n\nConcurrently, physics-based Quantum Key Distribution (QKD) leverages the fundamental quantum principle of superposition and the Heisenberg Uncertainty Principle: any interception or eavesdropping on polarized single photons alters their quantum state, immediately notifying communicating parties of an interception.\n\nEnterprises that defer cryptographic modernization risk retrospective decryption vulnerabilities, where adversaries harvest encrypted corporate data today to decrypt it once quantum hardware reaches commercial maturity.`,
    translation: `Cấu trúc nền tảng của thương mại điện tử toàn cầu, xác thực ngân hàng và liên lạc quốc phòng hiện đang dựa vào mật mã khóa công khai bất đối xứng, chủ yếu là thuật toán RSA và Đường cong Elliptic.\n\nCác giao thức này dựa trên tính chất toán học nan giải của việc phân tích thừa số nguyên tố và logarit rời rạc đối với các siêu máy tính cổ điển. Tuy nhiên, sự xuất hiện lý thuyết của máy tính lượng tử có khả năng chịu lỗi—áp dụng thuật toán của Shor—đe dọa sẽ phá vỡ các rào cản toán học này chỉ trong vài phút.\n\nĐể đón đầu 'ngày tận thế lượng tử' đang cận kề, các cơ quan an ninh mạng đã khởi động quá trình chuyển đổi toàn cầu sang Mật mã học hậu lượng tử (PQC). Viện Tiêu chuẩn và Công nghệ Quốc gia Hoa Kỳ (NIST) đã chuẩn hóa các thuật toán toán học dựa trên cấu trúc mạng tinh thể (lattice) kháng lượng tử, chẳng hạn như Kyber để đóng gói khóa và Dilithium cho chữ ký số.\n\nĐồng thời, Phân phối khóa lượng tử (QKD) dựa trên vật lý tận dụng nguyên lý chồng chập lượng tử và Nguyên lý bất định Heisenberg: bất kỳ sự can thiệp hoặc nghe lén nào đối với các photon đơn lẻ phân cực đều làm thay đổi trạng thái lượng tử của chúng, ngay lập tức cảnh báo cho các bên liên lạc về hành vi can thiệp.\n\nCác doanh nghiệp trì hoãn hiện đại hóa mật mã sẽ đối mặt với rủi ro bị giải mã hồi cứu, nơi kẻ tấn công thu thập dữ liệu mã hóa của doanh nghiệp ngay hôm nay để giải mã khi phần cứng lượng tử đạt độ chín muồi thương mại.`,
    vocabularies: [
      { word: "intractability", ipa: "/ˌɪn.træk.təˈbɪl.ə.t̬i/", pos: "n", meaning: "tính chất nan giải, cực kỳ khó giải quyết" },
      { word: "factorization", ipa: "/ˌfæk.tɚ.əˈzeɪ.ʃən/", pos: "n", meaning: "sự phân tích nhân tử / thừa số nguyên tố" },
      { word: "lattice", ipa: "/ˈlæt̬.ɪs/", pos: "n", meaning: "cấu trúc mạng tinh thể không gian đa chiều" },
      { word: "superposition", ipa: "/ˌsuː.pɚ.pəˈzɪʃ.ən/", pos: "n", meaning: "nguyên lý chồng chập lượng tử" },
      { word: "retrospective", ipa: "/ˌret.roʊˈspek.tɪv/", pos: "adj", meaning: "có tính hồi cứu, nhìn lại quá khứ" },
    ],
    questions: [
      {
        id: "q21_1",
        text: "Why is classical public-key cryptography (like RSA) vulnerable to quantum computers?",
        options: [
          "Quantum computers do not use electricity and bypass firewall hardware.",
          "Shor's algorithm can solve prime factorization problems rapidly.",
          "RSA algorithms are open-source and easy to copy.",
          "Quantum hardware operates under seawater where satellites cannot reach."
        ],
        correct: 1,
        explanation: "Bài đọc nêu rõ: 'the theoretical realization of fault-tolerant quantum computing—employing Shor's algorithm—threatens to render these mathematical barriers obsolete within minutes'."
      },
      {
        id: "q21_2",
        text: "What is 'retrospective decryption' risk?",
        options: [
          "Hackers returning stolen passwords to original owners.",
          "Adversaries harvesting encrypted data today to decrypt it later once quantum hardware arrives.",
          "Encrypting data backwards in time to change past financial records.",
          "Erasing quantum memory accidentally during power outages."
        ],
        correct: 1,
        explanation: "Dẫn chứng từ câu cuối: 'adversaries harvest encrypted corporate data today to decrypt it once quantum hardware reaches commercial maturity'."
      }
    ]
  },
  {
    id: "r22",
    title: "Atmospheric Geoengineering: Solar Radiation Management Feasibility",
    category: "Science",
    level: "C1",
    icon: "☀️",
    coverImage: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&auto=format&fit=crop&q=80",
    duration: "6 min",
    wordCount: 240,
    passage: `As anthropogenic greenhouse gas concentrations continue to outpace global emission abatement commitments, scientists and policymakers are scrutinizing once-taboo technological interventions: Solar Radiation Management (SRM).\n\nAmong proposed SRM technologies, Stratospheric Aerosol Injection (SAI) has garnered intense empirical modeling interest. Inspired by historical volcanic eruptions—such as Mount Pinatubo in 1991, which injected 20 million tons of sulfur dioxide into the upper atmosphere and cooled global temperatures by 0.5 degrees Celsius for over a year—SAI envisions deploying modified aircraft to disperse reflective sulfate aerosols into the stratosphere.\n\nWhile radiative climate models demonstrate that SAI could rapidly depress global mean temperatures and arrest Arctic permafrost thaw, critics warn of profound ecological externalities.\n\nAltering solar irradiance patterns could severely disrupt monsoonal precipitation cycles in South Asia and Sub-Saharan Africa, jeopardizing agricultural yields for billions. Furthermore, SAI does not mitigate ocean acidification caused by dissolved atmospheric carbon dioxide.\n\nCrucially, humanity would face the existential catastrophe of 'termination shock': if a sustained SAI regime were abruptly halted due to geopolitical conflict or technical failure, accumulated greenhouse warming would rebound within decades, inducing catastrophic climate shifts far more severe than gradual warming.`,
    translation: `Khi nồng độ khí nhà kính do con người gây ra tiếp tục vượt qua các cam kết cắt giảm phát thải toàn cầu, các nhà khoa học và nhà hoạch định chính sách đang xem xét kỹ lưỡng các biện pháp can thiệp công nghệ từng bị xem là điều cấm kỵ: Quản lý bức xạ mặt trời (SRM).\n\nTrong số các công nghệ SRM được đề xuất, Phương pháp Bơm sol khí vào tầng bình lưu (SAI) đã thu hút sự quan tâm lớn về mô hình thực nghiệm. Lấy cảm hứng từ các đợt phun trào núi lửa trong lịch sử—chẳng hạn như Núi Pinatubo năm 1991, đã phun 20 triệu tấn lưu huỳnh dioxit vào tầng khí quyển trên và làm mát nhiệt độ toàn cầu 0,5 độ C trong hơn một năm—SAI dự kiến triển khai máy bay chuyên dụng để phân tán các hạt sol khí sunfat phản xạ vào tầng bình lưu.\n\nMặc dù các mô hình khí hậu bức xạ chứng minh rằng SAI có thể nhanh chóng làm giảm nhiệt độ trung bình toàn cầu và ngăn chặn sự tan băng vĩnh cửu ở Bắc Cực, các nhà phê bình cảnh báo về những tác động ngoại ứng sinh thái sâu sắc.\n\nViệc thay đổi các mô hình bức xạ mặt trời có thể làm gián đoạn nghiêm trọng chu kỳ mưa gió mùa ở Nam Á và Châu Phi cận Sahara, đe dọa sản lượng nông nghiệp của hàng tỷ người. Hơn nữa, SAI không làm giảm hiện tượng axit hóa đại dương do carbon dioxide hòa tan trong khí quyển.\n\nQuan trọng hơn cả, nhân loại sẽ phải đối mặt với thảm họa sinh tồn mang tên 'sốc chấm dứt' (termination shock): nếu một chế độ SAI đang duy trì bị dừng đột ngột do xung đột địa chính trị hoặc lỗi kỹ thuật, nhiệt lượng khí nhà kính tích tụ sẽ bật tăng trở lại chỉ trong vài thập kỷ, gây ra những biến đổi khí hậu thảm khốc hơn nhiều so với quá trình ấm lên từ từ.`,
    vocabularies: [
      { word: "abatement", ipa: "/əˈbeɪt.mənt/", pos: "n", meaning: "sự cắt giảm, giảm bớt phát thải" },
      { word: "stratospheric", ipa: "/ˌstræt̬.əˈsfɪr.ɪk/", pos: "adj", meaning: "thuộc tầng bình lưu khí quyển" },
      { word: "irradiance", ipa: "/ɪˈreɪ.di.əns/", pos: "n", meaning: "độ chiếu xạ năng lượng mặt trời" },
      { word: "acidification", ipa: "/əˌsɪd.ə.fəˈkeɪ.ʃən/", pos: "n", meaning: "sự axit hóa (nước biển)" },
      { word: "termination", ipa: "/ˌtɝː.məˈneɪ.ʃən/", pos: "n", meaning: "sự chấm dứt, ngừng hoạt động" },
    ],
    questions: [
      {
        id: "q22_1",
        text: "What historical event inspired the concept of Stratospheric Aerosol Injection (SAI)?",
        options: [
          "The Industrial Revolution coal boom in Manchester",
          "The 1991 eruption of Mount Pinatubo, which cooled the planet by 0.5°C",
          "The Apollo 11 lunar landing rocket emissions",
          "The Chernobyl nuclear containment dome construction"
        ],
        correct: 1,
        explanation: "Bài đọc nêu rõ: 'Inspired by historical volcanic eruptions—such as Mount Pinatubo in 1991, which... cooled global temperatures by 0.5 degrees Celsius'."
      },
      {
        id: "q22_2",
        text: "What is 'termination shock' in the context of geoengineering?",
        options: [
          "A sudden electrical power cut to solar panels during a thunderstorm",
          "A rapid rebound of accumulated global warming if an ongoing SAI program is abruptly stopped",
          "The immediate freezing of oceans upon aerosol injection",
          "The economic bankruptcy of geoengineering startups"
        ],
        correct: 1,
        explanation: "Đoạn cuối định nghĩa rõ: 'if a sustained SAI regime were abruptly halted... accumulated greenhouse warming would rebound within decades'."
      }
    ]
  },
  {
    id: "r23",
    title: "Corporate Mergers & Acquisitions: Antitrust Regulatory Disclosure",
    category: "Business",
    level: "B2",
    icon: "💼",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    duration: "5 min",
    wordCount: 210,
    passage: `Notice of Proposed Transaction & Regulatory Review Timeline\n\nTo: Institutional Shareholders & Market Regulators\nFrom: Meridian Telecommunications Group & NexaCom Networks\n\nMeridian Group today announced the formal submission of a definitive merger agreement under which Meridian will acquire NexaCom Networks in a cash-and-stock transaction valued at approximately $14.2 billion.\n\nThe combined entity expects to unlock annualized cost synergies of $650 million within 24 months post-closure, primarily driven by network infrastructure consolidation, automated customer care migration, and joint procurement scale.\n\nHowever, the proposed transaction remains contingent upon statutory antitrust clearances from the Federal Trade Commission (FTC) and the European Commission. Regulators have expressed preliminary scrutiny regarding spectrum concentration in urban broadband markets, where the combined firm would command a 54% market share.\n\nTo address competition concerns proactively, Meridian has submitted a formal divestiture package agreeing to sell regional prepaid mobile assets to an independent telecommunications competitor.\n\nThe closing of the transaction is anticipated in the third quarter of the upcoming fiscal year, subject to customary closing conditions.`,
    translation: `Thông báo về Giao dịch được Đề xuất & Tiến trình Thẩm định của Cơ quan Quản lý\n\nKính gửi: Các Cổ đông Thể chế & Cơ quan Quản lý Thị trường\nTừ: Tập đoàn Viễn thông Meridian & Mạng lưới NexaCom\n\nTập đoàn Meridian hôm nay thông báo về việc chính thức đệ trình thỏa thuận sáp nhập dứt khoát, theo đó Meridian sẽ mua lại NexaCom Networks trong một giao dịch tiền mặt kết hợp cổ phiếu trị giá xấp xỉ 14,2 tỷ USD.\n\nThực thể hợp nhất dự kiến sẽ tạo ra sức mạnh cộng hưởng chi phí hàng năm đạt 650 triệu USD trong vòng 24 tháng sau khi hoàn tất, chủ yếu nhờ vào việc hợp nhất cơ sở hạ tầng mạng, chuyển đổi tự động hóa dịch vụ khách hàng và quy mô mua sắm chung.\n\nTuy nhiên, giao dịch đề xuất vẫn phụ thuộc vào sự phê duyệt chống độc quyền theo luật định từ Ủy ban Thương mại Liên bang (FTC) và Ủy ban Châu Âu. Các cơ quan quản lý đã bày tỏ sự xem xét sơ bộ liên quan đến việc tập trung băng tần tại các thị trường băng thông rộng đô thị, nơi công ty hợp nhất sẽ nắm giữ 54% thị phần.\n\nĐể chủ động giải quyết các lo ngại về cạnh tranh, Meridian đã đệ trình gói thoái vốn chính thức, đồng ý bán các tài sản di động trả trước khu vực cho một đối thủ viễn thông độc lập.\n\nViệc hoàn tất giao dịch dự kiến diễn ra vào quý 3 của năm tài chính sắp tới, tùy thuộc vào các điều kiện hoàn tất thông thường.`,
    vocabularies: [
      { word: "definitive", ipa: "/dɪˈfɪn.ə.t̬ɪv/", pos: "adj", meaning: "dứt khoát, mang tính quyết định cuối cùng" },
      { word: "synergy", ipa: "/ˈsɪn.ɚ.dʒi/", pos: "n", meaning: "sự cộng hưởng sức mạnh, tối ưu chi phí" },
      { word: "antitrust", ipa: "/ˌæn.tiˈtrʌst/", pos: "adj", meaning: "chống độc quyền thương mại" },
      { word: "divestiture", ipa: "/daɪˈves.tə.tʃɚ/", pos: "n", meaning: "sự thoái vốn, bán bớt tài sản" },
      { word: "contingent", ipa: "/kənˈtɪn.dʒənt/", pos: "adj", meaning: "phụ thuộc vào điều kiện kèm theo" },
    ],
    questions: [
      {
        id: "q23_1",
        text: "What is the total valuation of the Meridian-NexaCom transaction?",
        options: ["$650 million", "$1.4 billion", "$14.2 billion", "$54 billion"],
        correct: 2,
        explanation: "Văn bản nêu: 'in a cash-and-stock transaction valued at approximately $14.2 billion'."
      },
      {
        id: "q23_2",
        text: "What remedial action has Meridian offered to address regulatory antitrust concerns?",
        options: [
          "Doubling subscriber rates immediately",
          "Selling regional prepaid mobile assets to an independent competitor",
          "Relocating their headquarters outside the country",
          "Cancelling all existing employee contracts"
        ],
        correct: 1,
        explanation: "Đoạn 4 nêu rõ: 'Meridian has submitted a formal divestiture package agreeing to sell regional prepaid mobile assets to an independent telecommunications competitor'."
      }
    ]
  },
  {
    id: "r24",
    title: "Enterprise Cloud Migration & Multi-Vendor Hybrid Infrastructure RFP",
    category: "Business",
    level: "B2",
    icon: "☁️",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    duration: "5 min",
    wordCount: 225,
    passage: `Request for Proposal (RFP) - Global Banking Infrastructure Modernization\n\nIssued by: Atlantic International Financial Corporation\nProject: Multi-Region Hybrid Cloud Infrastructure Migration\n\nAtlantic International is soliciting comprehensive proposals from qualified Tier-1 cloud service providers and systems integrators to facilitate the phased migration of legacy on-premises core banking mainframes to an enterprise multi-cloud hybrid ecosystem.\n\nMandatory Technical Requirements:\n1. Zero Downtime Continuity: The migration architecture must guarantee active-active cross-region failover with a Recovery Time Objective (RTO) of less than 30 seconds and a Recovery Point Objective (RPO) of zero data loss for transactional relational databases.\n2. Regulatory Compliance: Full adherence to ISO 27001, SOC 2 Type II, and European GDPR data sovereignty mandates, including automated cryptographic data residency isolation.\n3. Latency Constraints: Internal microservices inter-region interconnect latency must not exceed 15 milliseconds under peak trading volumes.\n\nProposal Submission Guidelines:\nVendor submissions must include detailed pricing matrices covering compute, egress bandwidth, and 24/7 enterprise technical account management. Submissions must be uploaded through our secure procurement portal no later than Friday, November 14th, at 5:00 PM EST. Late tenders will be rejected automatically without evaluation.`,
    translation: `Yêu cầu Báo giá (RFP) - Hiện đại hóa Cơ sở hạ tầng Ngân hàng Toàn cầu\n\nĐược phát hành bởi: Tập đoàn Tài chính Quốc tế Atlantic\nDự án: Di chuyển Cơ sở hạ tầng Đám mây Lai Đa khu vực\n\nAtlantic International đang kêu gọi các đề xuất toàn diện từ các nhà cung cấp dịch vụ đám mây Tier-1 và các nhà tích hợp hệ thống đủ điều kiện nhằm tạo điều kiện thuận lợi cho quá trình chuyển đổi theo giai đoạn các hệ thống máy chủ lớn (mainframe) ngân hàng cốt lõi tại chỗ sang một hệ sinh thái đám mây lai đa nhà cung cấp.\n\nYêu cầu Kỹ thuật Bắt buộc:\n1. Tính liên tục Không gián đoạn (Zero Downtime): Kiến trúc chuyển đổi phải đảm bảo khả năng dự phòng chuyển đổi hoạt động (active-active) giữa các vùng với Mục tiêu Thời gian Phục hồi (RTO) dưới 30 giây và Mục tiêu Điểm Phục hồi (RPO) bằng không (không mất mát dữ liệu giao dịch).\n2. Tuân thủ Quy định: Tuân thủ đầy đủ các quy định về chủ quyền dữ liệu ISO 27001, SOC 2 Loại II và GDPR Châu Âu, bao gồm việc cô lập vị trí lưu trữ dữ liệu bằng mã hóa tự động.\n3. Ràng buộc về Độ trễ: Độ trễ kết nối giữa các vùng của các dịch vụ vi mô nội bộ không được vượt quá 15 mili-giây trong thời gian khối lượng giao dịch cao điểm.`,
    vocabularies: [
      { word: "solicit", ipa: "/səˈlɪs.ɪt/", pos: "v", meaning: "kêu gọi, trưng cầu đề xuất" },
      { word: "failover", ipa: "/ˈfeɪlˌoʊ.vɚ/", pos: "n", meaning: "cơ chế tự động chuyển đổi dự phòng khi gặp sự cố" },
      { word: "sovereignty", ipa: "/ˈsɑːv.rən.ti/", pos: "n", meaning: "chủ quyền (dữ liệu quốc gia)" },
      { word: "egress", ipa: "/ˈiː.ɡres/", pos: "n", meaning: "lưu lượng mạng truyền ra ngoài (băng thông tải ra)" },
      { word: "interconnect", ipa: "/ˌɪn.t̬ɚ.kəˈnekt/", pos: "n", meaning: "kết nối liên mạng giữa các hạ tầng" },
    ],
    questions: [
      {
        id: "q24_1",
        text: "What is the required Recovery Point Objective (RPO) for transactional databases in the RFP?",
        options: ["Less than 30 seconds", "Zero data loss", "15 milliseconds", "24 hours"],
        correct: 1,
        explanation: "Dẫn chứng từ Yêu cầu 1: 'and a Recovery Point Objective (RPO) of zero data loss for transactional relational databases'."
      },
      {
        id: "q24_2",
        text: "When is the strict deadline for submitting the vendor proposal?",
        options: [
          "Friday, November 14th, at 5:00 PM EST",
          "Monday, December 1st, at midnight",
          "Within 24 months post-contract signing",
          "At the annual shareholder meeting"
        ],
        correct: 0,
        explanation: "Đoạn cuối nêu rõ: 'no later than Friday, November 14th, at 5:00 PM EST. Late tenders will be rejected automatically'."
      }
    ]
  },
  {
    id: "r25",
    title: "Commercial Aviation Fleet Decarbonization & Sustainable Jet Fuels",
    category: "Travel",
    level: "B1",
    icon: "✈️",
    coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop&q=80",
    duration: "4 min",
    wordCount: 190,
    passage: `Commercial aviation accounts for approximately 2.5% of global carbon dioxide emissions. With passenger numbers projected to double over the next two decades, major international carriers are racing to decarbonize their fleets.\n\nWhile hydrogen and battery-electric aircraft offer zero-emission promises for short regional hops, battery weight penalties make them unviable for long-haul intercontinental routes. Consequently, airlines consider Sustainable Aviation Fuels (SAF)—derived from non-food biological feedstocks, used cooking oils, and agricultural waste—as the indispensable near-term bridge.\n\nDrop-in SAF can be blended seamlessly with conventional fossil kerosene up to 50% without requiring any retrofitting of aircraft engines or airport fueling infrastructure. Crucially, neat SAF reduces lifecycle carbon emissions by up to 80% compared to traditional jet A-1 fuel.\n\nHowever, market availability remains the dominant bottleneck: SAF currently accounts for less than 0.2% of worldwide jet fuel consumption. Scaling refinery output and implementing regulatory blending mandates will be decisive in achieving the airline industry's net-zero 2050 target.`,
    translation: `Hàng không thương mại chiếm khoảng 2,5% lượng khí thải carbon dioxide toàn cầu. Với số lượng hành khách dự kiến sẽ tăng gấp đôi trong hai thập kỷ tới, các hãng hàng không quốc tế lớn đang chạy đua để khử carbon cho các đội bay của mình.\n\nTrong khi máy bay chạy bằng hydro và pin điện mang lại triển vọng không phát thải cho các chặng bay ngắn trong khu vực, nhược điểm về trọng lượng pin khiến chúng không khả thi cho các chặng bay xuyên lục địa đường dài. Do đó, các hãng hàng không coi Nhiên liệu hàng không bền vững (SAF)—được chiết xuất từ nguyên liệu sinh học phi thực phẩm, dầu ăn đã qua sử dụng và phụ phẩm nông nghiệp—là cầu nối ngắn hạn không thể thiếu.\n\nNhiên liệu SAF có thể pha trộn liền mạch với dầu hỏa hóa thạch thông thường lên tới 50% mà không yêu cầu bất kỳ sự cải tiến nào đối với động cơ máy bay hoặc cơ sở hạ tầng tiếp nhiên liệu của sân bay. Quan trọng là, SAF nguyên chất giúp giảm lượng khí thải carbon trong suốt vòng đời lên tới 80% so với nhiên liệu phản lực A-1 truyền thống.\n\nTuy nhiên, sự sẵn có trên thị trường vẫn là điểm nghẽn chính: SAF hiện chỉ chiếm chưa đến 0,2% mức tiêu thụ nhiên liệu máy bay toàn cầu. Việc mở rộng quy mô lọc dầu và thực thi các quy định bắt buộc về tỷ lệ pha trộn sẽ mang tính quyết định để đạt được mục tiêu phát thải ròng bằng 0 vào năm 2050 của ngành hàng không.`,
    vocabularies: [
      { word: "decarbonize", ipa: "/diːˈkɑːr.bə.naɪz/", pos: "v", meaning: "khử carbon, giảm thiểu khí thải nhà kính" },
      { word: "feedstock", ipa: "/ˈfiːd.stɑːk/", pos: "n", meaning: "nguyên liệu đầu vào cho quá trình sản xuất" },
      { word: "retrofit", ipa: "/ˈret.roʊ.fɪt/", pos: "v", meaning: "cải tạo, trang bị thêm linh kiện mới cho thiết bị cũ" },
      { word: "bottleneck", ipa: "/ˈbɑː.t̬əl.nek/", pos: "n", meaning: "điểm nghẽn gây ách tắc quy trình" },
    ],
    questions: [
      {
        id: "q25_1",
        text: "Why are battery-electric planes currently unviable for long-haul intercontinental flights?",
        options: [
          "Batteries freeze and crack at high cruising altitudes.",
          "Excessive battery weight limits the range and payload capacity of the aircraft.",
          "Electric motors are completely banned by aviation authorities.",
          "Pilots refuse to fly aircraft without manual gasoline pumps."
        ],
        correct: 1,
        explanation: "Đoạn 2 nêu: 'battery weight penalties make them unviable for long-haul intercontinental routes'."
      },
      {
        id: "q25_2",
        text: "By what percentage can neat Sustainable Aviation Fuel reduce lifecycle carbon emissions?",
        options: ["Up to 25%", "Up to 50%", "Up to 80%", "Up to 100%"],
        correct: 2,
        explanation: "Dẫn chứng đoạn 3: 'neat SAF reduces lifecycle carbon emissions by up to 80% compared to traditional jet A-1 fuel'."
      }
    ]
  },
  {
    id: "r26",
    title: "Corporate ESG Reporting & Supply Chain Human Rights Due Diligence",
    category: "Business",
    level: "B2",
    icon: "🌱",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
    duration: "5 min",
    wordCount: 215,
    passage: `Environmental, Social, and Governance (ESG) compliance has evolved from voluntary public relations brochures into legally enforceable corporate governance frameworks.\n\nUnder new legislation—such as the European Corporate Sustainability Due Diligence Directive (CSDDD)—multinational enterprises are legally liable for identifying, preventing, and remedying adverse human rights and environmental violations not only across their direct facilities, but throughout their entire upstream supplier networks.\n\nFailure to establish robust audit traceability can result in fines exceeding 5% of global turnover and exclusion from government procurement contracts. Consequently, manufacturing conglomerates are deploying blockchain-verified ledger tracking and independent third-party labor audits across tier-2 and tier-3 raw material extractors.\n\nInstitutional asset managers now routinely withhold capital or vote against board re-elections for corporations exhibiting subpar ESG disclosures, recognizing that transparent labor practices and climate adaptation strategies are directly correlated with long-term enterprise resilience.`,
    translation: `Việc tuân thủ Môi trường, Xã hội và Quản trị (ESG) đã phát triển từ những tập tài liệu quan hệ công chúng tự nguyện thành các khung quản trị doanh nghiệp có hiệu lực pháp lý bắt buộc.\n\nTheo luật mới—chẳng hạn như Chỉ thị Thẩm định Tính bền vững của Doanh nghiệp Châu Âu (CSDDD)—các doanh nghiệp đa quốc gia phải chịu trách nhiệm pháp lý trong việc xác định, ngăn ngừa và khắc phục các vi phạm về nhân quyền và môi trường bất lợi không chỉ tại các cơ sở trực tiếp của họ, mà còn trên toàn bộ mạng lưới nhà cung cấp thượng nguồn.\n\nViệc không thiết lập được khả năng truy xuất nguồn gốc kiểm toán chặt chẽ có thể dẫn đến mức phạt vượt quá 5% doanh thu toàn cầu và bị loại khỏi các hợp đồng mua sắm chính phủ. Do đó, các tập đoàn sản xuất đang triển khai việc theo dõi sổ cái được xác minh bằng blockchain và kiểm toán lao động độc lập từ bên thứ ba trên các nhà khai thác nguyên liệu thô cấp 2 và cấp 3.`,
    vocabularies: [
      { word: "enforceable", ipa: "/ɪnˈfɔːr.sə.bəl/", pos: "adj", meaning: "có thể thi hành theo luật định" },
      { word: "diligence", ipa: "/ˈdɪl.ə.dʒəns/", pos: "n", meaning: "sự thẩm định cẩn trọng, chu đáo" },
      { word: "conglomerate", ipa: "/kənˈɡlɑː.mɚ.ət/", pos: "n", meaning: "tập đoàn đa ngành khổng lồ" },
      { word: "subpar", ipa: "/ˌsʌbˈpɑːr/", pos: "adj", meaning: "dưới mức tiêu chuẩn, kém chất lượng" },
    ],
    questions: [
      {
        id: "q26_1",
        text: "What risk do corporations face for failing to conduct proper supply chain due diligence under CSDDD?",
        options: [
          "A mandatory 50% increase in executive bonuses",
          "Fines exceeding 5% of global turnover and exclusion from government tenders",
          "Automatic shutdown of all internet communication lines",
          "Complete confiscation of physical factory machinery"
        ],
        correct: 1,
        explanation: "Đoạn 3 nêu rõ: 'Failure to establish robust audit traceability can result in fines exceeding 5% of global turnover and exclusion from government procurement contracts'."
      }
    ]
  },
  {
    id: "r27",
    title: "The Psychology of Habit Loops & Behavioral Micro-Interventions",
    category: "Psychology",
    level: "B1",
    icon: "🔄",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80",
    duration: "4 min",
    wordCount: 195,
    passage: `Behavioral scientists studying neuroplasticity have determined that nearly 40% of our daily actions are governed by automated habit routines rather than conscious deliberation.\n\nAt the core of neurological automation lies the 'habit loop'—a tripartite structure consisting of a cue, a routine, and a reward. A cue triggers the brain into automatic mode; the routine is the physical, mental, or emotional behavior executed; and the reward signals the brain whether this particular sequence is worth remembering for future repetition.\n\nAttempting to break an ingrained habit through sheer willpower frequently fails because neural pathways remain physically etched in the basal ganglia. Instead, researchers recommend the Golden Rule of Habit Change: keep the cue and the reward constant, but substitute the routine.\n\nMoreover, implementing 'micro-habits'—such as studying English vocabulary for just five minutes immediately after morning coffee—reduces cognitive friction and builds self-reinforcing momentum that easily transitions into lifelong mastery.`,
    translation: `Các nhà khoa học hành vi nghiên cứu về tính mềm dẻo của não bộ đã xác định rằng gần 40% hành động hàng ngày của chúng ta được chi phối bởi các thói quen tự động thay vì sự cân nhắc có ý thức.\n\nCốt lõi của sự tự động hóa thần kinh là 'vòng lặp thói quen'—một cấu trúc gồm ba phần: tín hiệu kích hoạt (cue), thói quen thực hiện (routine) và phần thưởng (reward). Tín hiệu kích hoạt não bộ vào chế độ tự động; thói quen là hành vi thể chất, tinh thần hoặc cảm xúc được thực hiện; và phần thưởng báo hiệu cho não bộ biết liệu chuỗi hành động này có đáng ghi nhớ để lặp lại trong tương lai hay không.\n\nCố gắng phá vỡ một thói quen ăn sâu chỉ bằng ý chí đơn thuần thường thất bại vì các đường dẫn nơ-ron vẫn được khắc sâu về mặt vật lý trong hạch nền não bộ. Thay vào đó, các nhà nghiên cứu khuyên nên áp dụng Quy tắc vàng thay đổi thói quen: giữ nguyên tín hiệu và phần thưởng, nhưng thay thế thói quen hành động.`,
    vocabularies: [
      { word: "deliberation", ipa: "/dɪˌlɪb.əˈreɪ.ʃən/", pos: "n", meaning: "sự cân nhắc kỹ lưỡng, thận trọng" },
      { word: "tripartite", ipa: "/traɪˈpɑːr.taɪt/", pos: "adj", meaning: "gồm ba bên, chia làm ba phần" },
      { word: "substitute", ipa: "/ˈsʌb.stə.tuːt/", pos: "v", meaning: "thay thế, thế chỗ" },
      { word: "momentum", ipa: "/moʊˈmen.t̬əm/", pos: "n", meaning: "đà tiến, quán tính phát triển" },
    ],
    questions: [
      {
        id: "q27_1",
        text: "What are the three components of the neurological 'habit loop'?",
        options: [
          "Willpower, punishment, and fatigue",
          "Cue, routine, and reward",
          "Reading, writing, and speaking",
          "Desire, hesitation, and regret"
        ],
        correct: 1,
        explanation: "Bài đọc nêu: 'a tripartite structure consisting of a cue, a routine, and a reward'."
      }
    ]
  },
  {
    id: "r28",
    title: "Smart Home Ambient Computing & Edge Machine Learning Sensors",
    category: "Technology",
    level: "A2",
    icon: "🏠",
    coverImage: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80",
    duration: "3 min",
    wordCount: 160,
    passage: `Modern homes are rapidly changing with the arrival of smart ambient technology. In the past, people had to control each light and appliance with manual wall switches or complex smartphone apps.\n\nToday, new ambient smart homes use small sensors placed quietly around rooms. These sensors run tiny machine learning models directly on the device, known as 'edge computing.' Because the data does not travel to distant internet servers, processing happens in real time and user privacy is protected.\n\nFor example, smart thermostats learn when family members wake up and automatically adjust the room temperature for comfort. In the kitchen, smart refrigerators can detect when milk is running low and add it to your digital grocery list.\n\nThese automated systems save up to 20% on monthly electricity bills while making daily household life much easier and safer for everyone.`,
    translation: `Những ngôi nhà hiện đại đang thay đổi nhanh chóng với sự xuất hiện của công nghệ môi trường thông minh. Trước đây, mọi người phải điều khiển từng bóng đèn và thiết bị bằng công tắc gắn tường thủ công hoặc các ứng dụng điện thoại thông minh phức tạp.\n\nNgày nay, các ngôi nhà thông minh mới sử dụng các cảm biến nhỏ được đặt kín đáo xung quanh các phòng. Các cảm biến này chạy các mô hình máy học nhỏ gọn trực tiếp trên thiết bị, được gọi là 'điện toán biên'. Vì dữ liệu không cần truyền đến các máy chủ internet xa xôi, việc xử lý diễn ra theo thời gian thực và quyền riêng tư của người dùng được bảo vệ.\n\nVí dụ, máy điều nhiệt thông minh học được thời điểm các thành viên trong gia đình thức dậy và tự động điều chỉnh nhiệt độ phòng cho thoải mái.`,
    vocabularies: [
      { word: "ambient", ipa: "/ˈæm.bi.ənt/", pos: "adj", meaning: "xung quanh, môi trường xung quanh" },
      { word: "appliance", ipa: "/əˈplaɪ.əns/", pos: "n", meaning: "thiết bị gia dụng trong nhà" },
      { word: "thermostat", ipa: "/ˈθɝː.mə.stæt/", pos: "n", meaning: "máy điều hòa cảm biến nhiệt độ" },
    ],
    questions: [
      {
        id: "q28_1",
        text: "Why is 'edge computing' beneficial for smart home privacy?",
        options: [
          "It sends all audio recordings directly to public forums.",
          "The data is processed directly on the device without traveling to distant servers.",
          "It turns off all internet connections permanently.",
          "It costs five times more than standard cloud computing."
        ],
        correct: 1,
        explanation: "Bài đọc nêu rõ: 'Because the data does not travel to distant internet servers, processing happens in real time and user privacy is protected'."
      }
    ]
  },
  {
    id: "r29",
    title: "Workplace Ergonomics, Sedentary Physiology & Cognitive Stamina",
    category: "Health",
    level: "B1",
    icon: "🪑",
    coverImage: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&auto=format&fit=crop&q=80",
    duration: "4 min",
    wordCount: 190,
    passage: `In contemporary knowledge-worker economies, prolonged sitting has emerged as a silent occupational health hazard. Epidemiological data indicates that sitting for more than seven hours daily elevates cardiovascular risks and impairs insulin sensitivity.\n\nFrom an anatomical standpoint, poor workstation ergonomics—such as viewing non-adjustable laptop screens with downward head tilt—multiplies cervical spine stress from 12 pounds in neutral posture up to 60 pounds at a 60-degree forward angle.\n\nProgressive employers are addressing this issue by supplying height-adjustable sit-stand desks and active ergonomic chairs. Ergonomists recommend following the '20-8-2 formula': for every 30 minutes at work, spend 20 minutes sitting with neutral posture, 8 minutes standing, and 2 minutes walking or stretching.\n\nThis simple rhythmic alteration restores venous blood return from the lower limbs, stimulates brain oxygenation, and sustains sharp cognitive focus throughout long afternoons.`,
    translation: `Trong nền kinh tế lao động tri thức hiện đại, việc ngồi kéo dài đã nổi lên như một mối nguy hại thầm lặng cho sức khỏe nghề nghiệp. Dữ liệu dịch tễ học chỉ ra rằng ngồi hơn bảy giờ mỗi ngày làm tăng nguy cơ tim mạch và làm suy giảm độ nhạy insulin.\n\nTừ góc độ giải phẫu, công thái học nơi làm việc kém—chẳng hạn như việc nhìn vào màn hình máy tính xách tay không thể điều chỉnh với góc cúi đầu xuống—làm tăng áp lực lên cột sống cổ từ 12 pound ở tư thế trung tính lên tới 60 pound ở góc nghiêng 60 độ về phía trước.\n\nCác chuyên gia công thái học khuyên nên tuân thủ 'công thức 20-8-2': trong mỗi 30 phút làm việc, hãy dành 20 phút ngồi với tư thế trung tính, 8 phút đứng và 2 phút đi lại hoặc vươn vai vận động.`,
    vocabularies: [
      { word: "sedentary", ipa: "/ˈsed.ən.ter.i/", pos: "adj", meaning: "ít vận động, ngồi một chỗ nhiều" },
      { word: "cervical", ipa: "/ˈsɝː.vɪ.kəl/", pos: "adj", meaning: "thuộc đốt sống cổ" },
      { word: "ergonomics", ipa: "/ˌɝː.ɡəˈnɑː.mɪks/", pos: "n", meaning: "công thái học (thiết kế tối ưu cho cơ thể)" },
      { word: "oxygenation", ipa: "/ˌɑːk.sɪ.dʒəˈneɪ.ʃən/", pos: "n", meaning: "sự cung cấp oxy cho các mô" },
    ],
    questions: [
      {
        id: "q29_1",
        text: "What does the '20-8-2 formula' recommend for every 30 minutes of office work?",
        options: [
          "20 minutes standing, 8 minutes running, 2 minutes sleeping",
          "20 minutes sitting, 8 minutes standing, 2 minutes walking or stretching",
          "20 minutes eating, 8 minutes typing, 2 minutes resting",
          "20 minutes on social media, 8 minutes working, 2 minutes coffee"
        ],
        correct: 1,
        explanation: "Bài đọc nêu rõ: 'spend 20 minutes sitting with neutral posture, 8 minutes standing, and 2 minutes walking or stretching'."
      }
    ]
  },
  {
    id: "r30",
    title: "Ecotourism Certification & Indigenous Community Stewardship",
    category: "Travel",
    level: "B1",
    icon: "🗺️",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    duration: "4 min",
    wordCount: 185,
    passage: `As mass tourism increasingly threatens fragile ecosystems worldwide, community-based ecotourism has emerged as a sustainable economic alternative that empowers local inhabitants.\n\nRather than directing profits to overseas resort conglomerates, community ecotourism lodges are owned and staffed by indigenous residents. Visitors are offered authentic cultural immersions, traditional craft workshops, and guided rainforest excursions led by village elders possessing encyclopedic knowledge of regional biodiversity.\n\nRevenue generated from eco-tariffs is channeled directly into village healthcare clinics, clean water filtration plants, and anti-poaching patrols. Moreover, certified eco-resorts adhere to strict environmental standards, operating off-grid with solar microgrids, zero single-use plastics, and biological wastewater reed beds.\n\nConscientious travelers are encouraged to verify certifications from recognized bodies—such as the Global Sustainable Tourism Council—to ensure their vacation dollars actively support conservation rather than performative 'greenwashing.'`,
    translation: `Khi du lịch đại chúng ngày càng đe dọa các hệ sinh thái mong manh trên toàn thế giới, du lịch sinh thái dựa vào cộng đồng đã nổi lên như một giải pháp kinh tế bền vững giúp trao quyền cho người dân địa phương.\n\nThay vì chuyển lợi nhuận đến các tập đoàn khu nghỉ dưỡng nước ngoài, các khu nhà trọ sinh thái cộng đồng được sở hữu và vận hành bởi chính các cư dân bản địa. Du khách được trải nghiệm sự hòa nhập văn hóa chân thực, các xưởng thủ công truyền thống và các chuyến du ngoạn rừng nhiệt đới có hướng dẫn viên là các già làng am hiểu sâu sắc về đa dạng sinh học trong vùng.\n\nDoanh thu tạo ra từ các khoản phí sinh thái được chuyển trực tiếp vào các trạm y tế thôn bản, nhà máy lọc nước sạch và các đội tuần tra chống săn trộm.`,
    vocabularies: [
      { word: "stewardship", ipa: "/ˈstuː.ɚd.ʃɪp/", pos: "n", meaning: "sự quản lý và bảo tồn có trách nhiệm" },
      { word: "indigenous", ipa: "/ɪnˈdɪdʒ.ə.nəs/", pos: "adj", meaning: "bản địa, thổ cư" },
      { word: "poaching", ipa: "/ˈpoʊ.tʃɪŋ/", pos: "n", meaning: "nạn săn bắt động vật hoang dã trái phép" },
      { word: "greenwashing", ipa: "/ˈɡriːnˌwɑː.ʃɪŋ/", pos: "n", meaning: "quảng cáo xanh giả tạo, đánh bóng hình ảnh" },
    ],
    questions: [
      {
        id: "q30_1",
        text: "Where are revenues from community eco-tariffs directly reinvested?",
        options: [
          "Overseas private bank accounts of resort CEOs",
          "Village healthcare clinics, clean water filtration, and anti-poaching patrols",
          "Building international commercial airports",
          "Purchasing luxury speedboats for wealthy tourists"
        ],
        correct: 1,
        explanation: "Dẫn chứng đoạn 3: 'channeled directly into village healthcare clinics, clean water filtration plants, and anti-poaching patrols'."
      }
    ]
  },
  {
    id: "r31",
    title: "The Economics of Subscription Models & Digital Customer Retention",
    category: "Business",
    level: "B2",
    icon: "💳",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    duration: "5 min",
    wordCount: 210,
    passage: `Over the past decade, the global software and media landscape has undergone an unprecedented transformation from transactional perpetual licenses to recurring subscription revenue models.\n\nFrom cloud software (SaaS) and streaming entertainment to fitness memberships and meal kits, enterprises prioritize Customer Lifetime Value (LTV) over single-event transactions. Subscription revenue provides predictable cash flows, facilitating aggressive long-term research and development investments.\n\nHowever, maintaining recurring profitability requires rigorous management of Customer Acquisition Cost (CAC) and monthly churn rates. If the cost to acquire a subscriber exceeds three times their projected lifetime contribution, or if churn surpasses critical thresholds, the business faces acute financial strain.\n\nLeading subscription platforms utilize predictive behavioral analytics to detect early signals of user disengagement. By proactively offering personalized feature walkthroughs, flexible billing pauses, or customized incentive tiers before cancellations occur, businesses protect their recurring revenue base and maximize enterprise valuation multiples.`,
    translation: `Trong thập kỷ qua, bối cảnh phần mềm và truyền thông toàn cầu đã trải qua một sự chuyển đổi chưa từng có từ các giấy phép vĩnh viễn mang tính giao dịch đơn lẻ sang các mô hình doanh thu định kỳ theo gói đăng ký thuê bao.\n\nTừ phần mềm đám mây (SaaS) và giải trí phát trực tuyến đến thẻ thành viên phòng tập và suất ăn giao tận nơi, các doanh nghiệp ưu tiên Giá trị Vòng đời Khách hàng (LTV) hơn là các giao dịch mua một lần. Doanh thu đăng ký thuê bao mang lại dòng tiền có thể dự đoán được, tạo điều kiện thuận lợi cho việc đầu tư mạnh mẽ vào nghiên cứu và phát triển dài hạn.\n\nTuy nhiên, việc duy trì khả năng sinh lời định kỳ đòi hỏi phải quản lý chặt chẽ Chi phí Thu hút Khách hàng (CAC) và tỷ lệ rời bỏ hàng tháng (churn rate).`,
    vocabularies: [
      { word: "perpetual", ipa: "/pɚˈpetʃ.u.əl/", pos: "adj", meaning: "vĩnh viễn, trọn đời" },
      { word: "recurring", ipa: "/rɪˈkɝː.ɪŋ/", pos: "adj", meaning: "định kỳ lặp lại" },
      { word: "churn", ipa: "/tʃɝːn/", pos: "n", meaning: "tỷ lệ khách hàng rời bỏ dịch vụ" },
      { word: "disengagement", ipa: "/ˌdɪs.ɪnˈɡeɪdʒ.mənt/", pos: "n", meaning: "sự suy giảm tương tác, thờ ơ" },
    ],
    questions: [
      {
        id: "q31_1",
        text: "Why do businesses prefer subscription models over perpetual licensing?",
        options: [
          "Subscription models provide predictable recurring cash flows that support long-term R&D.",
          "Customers are legally prohibited from ever canceling subscriptions.",
          "It eliminates the need for software customer service entirely.",
          "Subscription businesses are exempt from corporate income taxes."
        ],
        correct: 0,
        explanation: "Đoạn 2 chỉ ra: 'Subscription revenue provides predictable cash flows, facilitating aggressive long-term research and development investments'."
      }
    ]
  },
  {
    id: "r32",
    title: "Cognitive Benefits of Lifelong Bilingualism in Aging Populations",
    category: "Science",
    level: "B2",
    icon: "🗣️",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    duration: "5 min",
    wordCount: 220,
    passage: `For decades, researchers investigated whether learning multiple languages placed undue cognitive strain on children. Today, clinical cognitive neuroscientists have decisively reversed that assumption: lifelong bilingualism serves as a formidable neuroprotective shield against age-related mental decline.\n\nConstantly navigating between two linguistic systems requires active inhibitory control—the mental ability to suppress the unattended language while simultaneously retrieving vocabulary from the active tongue. This perpetual mental workout builds robust 'cognitive reserve' within the frontostriatal brain networks.\n\nRemarkably, extensive epidemiological studies conducted across multiple continents indicate that bilingual patients with Alzheimer's disease exhibit symptoms of clinical dementia an average of four to five years later than matched monolingual peers, despite possessing identical amounts of physical brain tissue pathology.\n\nIn essence, while language acquisition cannot prevent the underlying biological onset of neurodegenerative disease, it equips the human brain with resilient alternative neural pathways that maintain functional independence and lucid cognition well into advanced age.`,
    translation: `Trong nhiều thập kỷ, các nhà nghiên cứu đã đặt câu hỏi liệu việc học nhiều ngôn ngữ có gây ra căng thẳng nhận thức quá mức cho trẻ em hay không. Ngày nay, các nhà thần kinh học nhận thức lâm sàng đã đảo ngược hoàn toàn giả định đó: việc sử dụng song ngữ suốt đời đóng vai trò như một lá chắn bảo vệ thần kinh đáng gờm chống lại sự suy giảm trí tuệ do tuổi tác.\n\nViệc liên tục điều hướng giữa hai hệ thống ngôn ngữ đòi hỏi sự kiểm soát ức chế tích cực—khả năng tinh thần nhằm ngăn chặn ngôn ngữ không được chú ý trong khi đồng thời truy xuất từ vựng từ ngôn ngữ đang hoạt động. Bài tập rèn luyện tinh thần liên tục này xây dựng một 'kho dự trữ nhận thức' vững chắc trong mạng lưới não bộ trán - thể vân.\n\nĐáng chú ý, các nghiên cứu dịch tễ học sâu rộng được tiến hành trên nhiều châu lục chỉ ra rằng những bệnh nhân mắc bệnh Alzheimer biết song ngữ biểu hiện các triệu chứng sa sút trí tuệ lâm sàng muộn hơn trung bình từ 4 đến 5 năm so với những người cùng trang lứa chỉ nói một thứ tiếng, mặc dù có cùng mức độ tổn thương bệnh lý mô não.`,
    vocabularies: [
      { word: "inhibitory", ipa: "/ɪnˈhɪb.ə.tɔːr.i/", pos: "adj", meaning: "thuộc về ức chế, kiềm chế xung thần kinh" },
      { word: "frontostriatal", ipa: "/ˌfrʌn.toʊ.straɪˈeɪ.t̬əl/", pos: "adj", meaning: "mạng lưới liên kết thùy trán và thể vân não" },
      { word: "dementia", ipa: "/dɪˈmen.ʃə/", pos: "n", meaning: "hội chứng sa sút trí tuệ, suy giảm trí nhớ" },
      { word: "lucid", ipa: "/ˈluː.sɪd/", pos: "adj", meaning: "minh mẫn, tỉnh táo, rõ ràng" },
    ],
    questions: [
      {
        id: "q32_1",
        text: "By how many years on average do bilingual individuals delay clinical dementia symptoms compared to monolinguals?",
        options: ["One year", "Two to three years", "Four to five years", "Ten years"],
        correct: 2,
        explanation: "Dẫn chứng đoạn 3: 'bilingual patients with Alzheimer's disease exhibit symptoms of clinical dementia an average of four to five years later than matched monolingual peers'."
      },
      {
        id: "q32_2",
        text: "What cognitive mechanism builds 'cognitive reserve' in bilingual speakers?",
        options: [
          "Continuous active inhibitory control between competing linguistic systems",
          "Memorizing thousands of phone numbers daily",
          "Speaking at twice the speed of standard speakers",
          "Avoiding reading books in either language"
        ],
        correct: 0,
        explanation: "Đoạn 2 nêu rõ: 'requires active inhibitory control—the mental ability to suppress the unattended language while simultaneously retrieving vocabulary... builds robust cognitive reserve'."
      }
    ]
  }
];
