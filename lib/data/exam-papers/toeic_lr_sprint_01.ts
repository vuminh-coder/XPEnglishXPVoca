import { ExamPaper, ExamQuestion } from "./types";

export const toeicLrSprint01Paper: ExamPaper = {
  id: "toeic_lr_sprint_01",
  title: "TOEIC LR Speed Sprint #02 (100 Questions)",
  type: "TOEIC_LR",
  level: "Advanced",
  timeLimitMinutes: 60,
  totalQuestions: 100,
  maxScore: 990,
  description: "Bộ đề luyện phản xạ tốc độ 2 Kỹ năng Nghe & Đọc (Listening & Reading Duo): 50 câu Listening Parts 1-4 (Chuỗi cung ứng FinTech Singapore, Xe điện tự hành Austin, Bán dẫn bán tự động) và 50 câu Reading Parts 5-7 (Hợp đồng vi mạch, Biên bản hội đồng quản trị, Tự động hóa kho vận).",
  categoryBadge: "ETS TOEIC L&R",
  tags: ["TOEIC", "Listening & Reading", "100 Questions", "Sprint Test", "Dual Skills"],
  supportedSkills: ["LISTENING", "READING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
        // =========================================================================
    // LISTENING PART 1: Photographs (Q1 - Q3)
    // =========================================================================
    qs.push({
      id: "tlrs2_q1",
      partNumber: 1,
      partTitle: "Listening Part 1: Photographs",
      section: "LISTENING",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      passageText: "[Audio Transcript - Question 1]\n(A) Electric forklifts are transporting palletized cargo along the main warehouse corridor.\n(B) Workers are planting saplings along a suburban park walkway.\n(C) Commercial airliners are parked on a snow-covered airport tarmac.\n(D) Waiters are laying tablecloths on outdoor restaurant patio tables.",
      questionText: "Question 1: Look at the photograph marked No. 1 in your test book.",
      options: [
        { key: "A", text: "Electric forklifts are transporting palletized cargo along the main warehouse corridor." },
        { key: "B", text: "Workers are planting saplings along a suburban park walkway." },
        { key: "C", text: "Commercial airliners are parked on a snow-covered airport tarmac." },
        { key: "D", text: "Waiters are laying tablecloths on outdoor restaurant patio tables." }
      ],
      correctAnswer: "A",
      explanation: "🎯 **Đáp án đúng: A** (Electric forklifts are transporting palletized cargo along the main warehouse corridor.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Xe nâng điện đang vận chuyển các kiện hàng pallet dọc hành lang chính của nhà kho. (Đúng với hoạt động kho bãi)\n- (B) Công nhân đang trồng cây non dọc lối đi công viên ngoại ô. (Sai bối cảnh)\n- (C) Máy bay thương mại đang đỗ trên đường băng sân bay phủ tuyết. (Sai đối tượng)\n- (D) Nhân viên phục vụ đang trải khăn bàn trên các bàn tiệc ngoài trời của nhà hàng. (Sai hành động)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy bối cảnh và hành động: Nhà kho logistics với giá kệ pallet và xe nâng hàng di chuyển.\n\n💡 **Từ vựng trọng tâm:**\n- `electric forklift` (/ɪˈlɛktrɪk ˈfɔːklɪft/): xe nâng điện\n- `palletized cargo` (/ˈpælɪtaɪzd ˈkɑːɡəʊ/): hàng hóa đóng trên pallet\n- `warehouse corridor` (/ˈweəhaʊs ˈkɒrɪdɔːr/): hành lang nhà kho"
    });

    qs.push({
      id: "tlrs2_q2",
      partNumber: 1,
      partTitle: "Listening Part 1: Photographs",
      section: "LISTENING",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      passageText: "[Audio Transcript - Question 2]\n(A) Customers are browsing garments in a retail boutique.\n(B) A cleanroom engineer is inspecting silicon semiconductor wafers under a high-power microscope.\n(C) Cooks are preparing food ingredients in a bustling commercial kitchen.\n(D) Boats are docked in a recreational marina during a regatta.",
      questionText: "Question 2: Look at the photograph marked No. 2 in your test book.",
      options: [
        { key: "A", text: "Customers are browsing garments in a retail boutique." },
        { key: "B", text: "A cleanroom engineer is inspecting silicon semiconductor wafers under a high-power microscope." },
        { key: "C", text: "Cooks are preparing food ingredients in a bustling commercial kitchen." },
        { key: "D", text: "Boats are docked in a recreational marina during a regatta." }
      ],
      correctAnswer: "B",
      explanation: "🎯 **Đáp án đúng: B** (A cleanroom engineer is inspecting silicon semiconductor wafers under a high-power microscope.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Khách hàng đang xem quần áo trong cửa hàng thời trang bán lẻ. (Sai bối cảnh)\n- (B) Một kỹ sư phòng sạch đang kiểm tra các phiến silicon bán dẫn dưới kính hiển vi công suất cao. (Đúng trang phục và thao tác)\n- (C) Các đầu bếp đang chuẩn bị nguyên liệu thực phẩm trong bếp thương mại nhộn nhịp. (Sai đối tượng)\n- (D) Thuyền đang neo đậu trong bến du thuyền giải trí trong một cuộc đua thuyền. (Sai bối cảnh)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy trang phục chuyên dụng: Kỹ sư mặc đồ phòng sạch (cleanroom suit) thao tác với thiết bị vi mạch chính xác.\n\n💡 **Từ vựng trọng tâm:**\n- `cleanroom engineer` (/ˈkliːnruːm ˌɛndʒɪˈnɪər/): kỹ sư phòng sạch vi điện tử\n- `semiconductor wafers` (/ˌsɛmikənˈdʌktər ˈweɪfəz/): phiến bán dẫn vi mạch\n- `high-power microscope` (/ˈmaɪkrəskəʊp/): kính hiển vi công suất lớn"
    });

    qs.push({
      id: "tlrs2_q3",
      partNumber: 1,
      partTitle: "Listening Part 1: Photographs",
      section: "LISTENING",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      passageText: "[Audio Transcript - Question 3]\n(A) Firefighters are practicing water hose deployment in a training facility.\n(B) Musicians are tuning acoustic instruments on a theater stage.\n(C) An executive is presenting market analytics on a wall-mounted digital display to colleagues.\n(D) Carpenters are cutting lumber with power saws at a residential construction site.",
      questionText: "Question 3: Look at the photograph marked No. 3 in your test book.",
      options: [
        { key: "A", text: "Firefighters are practicing water hose deployment in a training facility." },
        { key: "B", text: "Musicians are tuning acoustic instruments on a theater stage." },
        { key: "C", text: "An executive is presenting market analytics on a wall-mounted digital display to colleagues." },
        { key: "D", text: "Carpenters are cutting lumber with power saws at a residential construction site." }
      ],
      correctAnswer: "C",
      explanation: "🎯 **Đáp án đúng: C** (An executive is presenting market analytics on a wall-mounted digital display to colleagues.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Lính cứu hỏa đang thực hành triển khai vòi nước trong cơ sở huấn luyện. (Sai đối tượng)\n- (B) Các nhạc sĩ đang chỉnh dây nhạc cụ acoustic trên sân khấu nhà hát. (Sai bối cảnh)\n- (C) Một giám đốc đang thuyết trình dữ liệu phân tích thị trường trên màn hình kỹ thuật số gắn tường cho đồng nghiệp. (Đúng hành động chính)\n- (D) Thợ mộc đang cưa gỗ bằng máy cưa tại công trường xây dựng nhà ở. (Sai hành động)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy hành động công sở: Buổi họp báo cáo chiến lược doanh nghiệp với sự tương tác giữa người thuyết trình và người nghe.\n\n💡 **Từ vựng trọng tâm:**\n- `market analytics` (/ˈmɑːkɪt ˌænəˈlɪtɪks/): phân tích dữ liệu thị trường\n- `wall-mounted digital display` (/wɔːl ˈmaʊntɪd ˈdɪdʒɪtl dɪˈspleɪ/): màn hình hiển thị kỹ thuật số treo tường"
    });

    // =========================================================================
    // LISTENING PART 2: Question-Response (Q4 - Q18: 15 Questions)
    // =========================================================================
    const part2Items = [
      { q: "Where will the new automated distribution center be established?", opts: [{"key":"A","text":"Near the Jurong logistics port in western Singapore."},{"key":"B","text":"Yes, automated sorting increases throughput by 40%."},{"key":"C","text":"About five hundred engineering contractors."}], a: "A", exp: "Câu hỏi 'Where' -> Phương án A trả lời địa điểm: gần cảng logistics Jurong tại phía tây Singapore." },
      { q: "When is the procurement department scheduled to finalize the supplier contracts?", opts: [{"key":"A","text":"The contract spans three consecutive calendar years."},{"key":"B","text":"By 5:00 PM this Friday before the quarter closes."},{"key":"C","text":"Raw materials have increased in price."}], a: "B", exp: "Câu hỏi 'When' -> Phương án B nêu mốc thời gian: trước 5 giờ chiều thứ Sáu tuần này." },
      { q: "Who was selected to lead the autonomous vehicle fleet testing in Austin?", opts: [{"key":"A","text":"The test fleet consists of twenty-four electric sedans."},{"key":"B","text":"Testing will commence on public roadways."},{"key":"C","text":"Dr. Marcus Vance from the Advanced Robotics division."}], a: "C", exp: "Câu hỏi 'Who' -> Phương án C chỉ rõ người phụ trách: Tiến sĩ Marcus Vance từ bộ phận Robot cao cấp." },
      { q: "Has the corporate legal team reviewed the intellectual property clauses in the merger agreement?", opts: [{"key":"A","text":"Yes, Senior Counsel Davies returned the annotated draft yesterday morning."},{"key":"B","text":"The merger is valued at 1.2 billion dollars."},{"key":"C","text":"Both companies specialize in cloud software."}], a: "A", exp: "Câu hỏi Yes/No -> Phương án A xác nhận luật sư Davies đã chuyển bản dự thảo có chú thích vào sáng hôm qua." },
      { q: "Why was the cross-border payment gateway launch rescheduled to next month?", opts: [{"key":"A","text":"The gateway processes multi-currency transactions."},{"key":"B","text":"To allow additional time for third-party penetration security testing."},{"key":"C","text":"Transaction fees are set at 0.5 percent."}], a: "B", exp: "Câu hỏi 'Why' -> Phương án B đưa ra lý do: dành thêm thời gian kiểm thử an ninh thâm nhập của bên thứ ba." },
      { q: "Would you rather review the financial audit report now or wait until the CFO joins us?", opts: [{"key":"A","text":"The quarterly net profit rose fifteen percent."},{"key":"B","text":"Auditing standards are established by the board."},{"key":"C","text":"Let's wait for the CFO so we can address executive questions together."}], a: "C", exp: "Câu hỏi lựa chọn 'now or wait' -> Phương án C chọn chờ CFO kèm theo lý do hợp tác rõ ràng." },
      { q: "The client from Munich hasn't confirmed their flight arrival details yet, have they?", opts: [{"key":"A","text":"Actually, their executive assistant emailed their itinerary an hour ago."},{"key":"B","text":"Flight LH450 departs from Terminal 2."},{"key":"C","text":"Munich is the capital of Bavaria."}], a: "A", exp: "Câu hỏi đuôi phủ định -> Phương án A đính chính: trợ lý điều hành của họ đã gửi lịch trình qua email 1 giờ trước." },
      { q: "How many units of the high-voltage power inverter were manufactured during the night shift?", opts: [{"key":"A","text":"The night shift operates from 10:00 PM to 6:00 AM."},{"key":"B","text":"The shift supervisor reported a total output of 1,420 units."},{"key":"C","text":"Inverter efficiency ratings exceed 98 percent."}], a: "B", exp: "Câu hỏi 'How many' -> Phương án B trả lời chính xác số lượng: 1.420 đơn vị sản phẩm." },
      { q: "Which cloud infrastructure vendor did our chief technology officer recommend?", opts: [{"key":"A","text":"Server uptime is guaranteed at 99.99 percent."},{"key":"B","text":"Data migration will take approximately three weeks."},{"key":"C","text":"He recommended Apex Cloud Enterprise because of their regional data centers."}], a: "C", exp: "Câu hỏi 'Which vendor' -> Phương án C nêu đích danh nhà cung cấp Apex Cloud Enterprise và lý do." },
      { q: "I'm concerned that the raw material shipping delays will impact our quarterly delivery targets.", opts: [{"key":"A","text":"Don't worry, the logistics team has already rerouted the consignments via air freight."},{"key":"B","text":"Shipping rates have remained relatively stable."},{"key":"C","text":"The delivery dock is located on North Avenue."}], a: "A", exp: "Phản hồi một phát biểu lo ngại -> Phương án A trấn an bằng giải pháp đã thực hiện: chuyển hướng hàng qua đường hàng không." },
      { q: "What time does the keynote session on AI in semiconductor fabrication begin?", opts: [{"key":"A","text":"Over four hundred industry engineers have registered."},{"key":"B","text":"It is scheduled to commence at 9:30 AM in the Grand Ballroom."},{"key":"C","text":"Semiconductors are manufactured in vacuum cleanrooms."}], a: "B", exp: "Câu hỏi 'What time' -> Phương án B nêu rõ giờ (9:30 AM) và địa điểm (Grand Ballroom)." },
      { q: "Shouldn't we verify the export compliance documentation before releasing the shipment?", opts: [{"key":"A","text":"The cargo weighs twenty-five metric tonnes."},{"key":"B","text":"Export tariffs were updated last fiscal year."},{"key":"C","text":"Yes, our trade compliance officer is conducting the final verification now."}], a: "C", exp: "Câu hỏi đề xuất thủ tục -> Phương án C đồng tình và báo cáo nhân viên tuân thủ đang thực hiện kiểm tra cuối cùng." },
      { q: "Could you print ten copies of the revised budget spreadsheet for the strategy committee?", opts: [{"key":"A","text":"I'll print and collate them in the conference room immediately."},{"key":"B","text":"The spreadsheet was created using standard accounting templates."},{"key":"C","text":"Budget allocations rose eight percent."}], a: "A", exp: "Lời nhờ in ấn -> Phương án A sẵn sàng in và sắp xếp ngay tại phòng họp." },
      { q: "Why did the manufacturing plant suspend assembly Line 2 yesterday afternoon?", opts: [{"key":"A","text":"Line 2 manufactures electric motor stators."},{"key":"B","text":"Because a robotic weld arm required emergency hydraulic sensor replacement."},{"key":"C","text":"Thirty workers are assigned to that section."}], a: "B", exp: "Câu hỏi 'Why' -> Phương án B giải thích nguyên nhân kỹ thuật: cánh tay hàn robot cần thay thế khẩn cấp cảm biến thủy lực." },
      { q: "Do you know if the annual shareholder dividend payout rate has been approved by the board?", opts: [{"key":"A","text":"The annual report is published in four languages."},{"key":"B","text":"Dividends are paid out through direct bank deposit."},{"key":"C","text":"Yes, the board voted unanimously to approve a dividend of $2.40 per share."}], a: "C", exp: "Câu hỏi thông tin -> Phương án C xác nhận hội đồng quản trị đã bỏ phiếu nhất trí thông qua mức cổ tức 2,40 USD/cổ phiếu." }
    ];

    part2Items.forEach((item, idx) => {
      const qNum = idx + 4;
      qs.push({
        id: `tlrs2_q${qNum}`,
        partNumber: 2,
        partTitle: "Listening Part 2: Question-Response",
        section: "LISTENING",
        audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(idx % 4) + 1}.mp3`,
        passageText: `[Audio Transcript - Question ${qNum}]\nQuestion: "${item.q}"\n(A) ${item.opts[0].text}\n(B) ${item.opts[1].text}\n(C) ${item.opts[2].text}`,
        questionText: item.q,
        options: [
          { key: "A", text: item.opts[0].text },
          { key: "B", text: item.opts[1].text },
          { key: "C", text: item.opts[2].text },
          { key: "D", text: "(Not Applicable in Part 2)" }
        ] as any,
        correctAnswer: item.a as any,
        explanation: `🎯 **Đáp án đúng: ${item.a}** (${item.opts.find(o => o.key === item.a)?.text || ''})\n\n🔍 **Dịch câu hỏi & các phương án:**\n- **Hỏi:** ${item.q}\n- (A) ${item.opts[0].text}\n- (B) ${item.opts[1].text}\n- (C) ${item.opts[2].text}\n\n💡 **Phân tích chiến lược ETS:** ${item.exp}`
      });
    });

    // =========================================================================
    // LISTENING PART 3: Short Conversations (Q19 - Q36: 6 Convos x 3 Qs = 18 Qs)
    // =========================================================================
    const part3Conversations = [
      {
        passage: `[Audio Transcript - FinTech Product Strategy]\nProduct Lead: Good morning, Clara. Did the mobile payment application pass the stress testing for high-concurrency transactions?\nClara: Yes, our backend engineering team simulated 50,000 transactions per second, and the settlement latency remained consistently below 180 milliseconds.\nProduct Lead: That exceeds our contractual benchmark for the Southeast Asian digital banking consortium. We should prepare the executive release deck for Friday's steering committee.\nClara: I'll synthesize the performance telemetry into executive summary slides by tomorrow afternoon.`,
        questions: [
          { q: "What engineering milestone was successfully achieved?", opts: [{"key":"A","text":"The company acquired a commercial bank in Singapore."},{"key":"B","text":"New office workstations were deployed across the engineering wing."},{"key":"C","text":"A patent lawsuit with a competitor was settled out of court."},{"key":"D","text":"The mobile payment app passed high-concurrency stress testing with sub-180ms latency."}], a: "D", exp: "Cột mốc kỹ thuật: 'simulated 50,000 transactions per second, and the settlement latency remained consistently below 180 milliseconds'." },
          { q: "What client group is the technology designed for?", opts: [{"key":"A","text":"A Southeast Asian digital banking consortium"},{"key":"B","text":"Local government municipal water utilities"},{"key":"C","text":"University student scholarship administrators"},{"key":"D","text":"Hospital emergency room dispatchers"}], a: "A", exp: "Nhóm khách hàng: 'Southeast Asian digital banking consortium'." },
          { q: "What will Clara deliver by tomorrow afternoon?", opts: [{"key":"A","text":"A signed commercial partnership contract"},{"key":"B","text":"Performance telemetry synthesized into executive summary slides"},{"key":"C","text":"An invoice for third-party cloud hosting servers"},{"key":"D","text":"A redesigned user interface prototype"}], a: "B", exp: "Nhiệm vụ của Clara: 'synthesize the performance telemetry into executive summary slides by tomorrow afternoon'." }
        ]
      },
      {
        passage: `[Audio Transcript - Autonomous Fleet Operations in Austin]\nOperations Director: Henry, how did the initial pilot testing of our autonomous delivery vans perform in downtown Austin yesterday?\nHenry: We operated twelve electric vans across sixty commercial delivery routes. Overall navigation accuracy was 99.4%, but two vehicles experienced GPS signal degradation near the high-rise financial district.\nOperations Director: Did our onboard LiDAR and visual inertial odometry compensate for the loss of satellite signal?\nHenry: Perfectly. Both vans maintained lane discipline and completed all scheduled package handoffs without human safety intervention.`,
        questions: [
          { q: "How many autonomous electric vans were deployed in the pilot test?", opts: [{"key":"A","text":"Six vans"},{"key":"B","text":"Twenty-four vans"},{"key":"C","text":"Twelve vans"},{"key":"D","text":"Sixty vans"}], a: "C", exp: "Số lượng xe: 'operated twelve electric vans across sixty commercial delivery routes'." },
          { q: "What operational challenge occurred during the test?", opts: [{"key":"A","text":"Battery overheating in high summer temperatures"},{"key":"B","text":"Tire blowouts on urban asphalt roads"},{"key":"C","text":"Customer refusal to accept automated deliveries"},{"key":"D","text":"GPS signal degradation near high-rise buildings in the financial district"}], a: "D", exp: "Sự cố: 'two vehicles experienced GPS signal degradation near the high-rise financial district'." },
          { q: "How did the vehicles respond to the signal loss?", opts: [{"key":"A","text":"Onboard LiDAR and vision sensors maintained lane discipline and completed deliveries."},{"key":"B","text":"They stopped immediately and waited for tow trucks."},{"key":"C","text":"Human safety drivers took over manual control."},{"key":"D","text":"They returned to the charging depot empty."}], a: "A", exp: "Phản ứng của xe: 'maintained lane discipline and completed all scheduled package handoffs without human safety intervention'." }
        ]
      },
      {
        passage: `[Audio Transcript - Semiconductor Manufacturing Procurement]\nProcurement Manager: Dr. Zhang, we received quotation packages from three precision robotics suppliers for the new cleanroom wafer handling line in Dresden.\nDr. Zhang: Is there a significant variance in delivery lead times and ISO Class 1 cleanroom particle emission ratings?\nProcurement Manager: Apex Robotics quoted a 14-week lead time with certified sub-0.1 micron particle containment, whereas the competitor from Tokyo requires 22 weeks but offers a 5% discount.\nDr. Zhang: Given our aggressive semiconductor fabrication schedule, the 14-week lead time is essential. Let us proceed with Apex Robotics.`,
        questions: [
          { q: "What equipment is the company procuring for its Dresden facility?", opts: [{"key":"A","text":"High-voltage electrical substation transformers"},{"key":"B","text":"Precision robotics for a cleanroom wafer handling line"},{"key":"C","text":"Commercial office furniture and conference tables"},{"key":"D","text":"Employee cafeteria catering appliances"}], a: "B", exp: "Thiết bị mua sắm: 'precision robotics suppliers for the new cleanroom wafer handling line'." },
          { q: "What advantage does Apex Robotics offer over the competitor?", opts: [{"key":"A","text":"A 20 percent bulk purchase price discount"},{"key":"B","text":"Free on-site cafeteria installation"},{"key":"C","text":"A significantly shorter 14-week delivery lead time"},{"key":"D","text":"Extended ten-year equipment warranties"}], a: "C", exp: "Ưu thế của Apex Robotics: 'Apex Robotics quoted a 14-week lead time... whereas the competitor... requires 22 weeks'." },
          { q: "What decision does Dr. Zhang make?", opts: [{"key":"A","text":"Cancel the cleanroom expansion project"},{"key":"B","text":"Wait for a third quotation from a domestic manufacturer"},{"key":"C","text":"Request the Tokyo supplier to lower their price further"},{"key":"D","text":"Proceed with Apex Robotics to meet the aggressive schedule"}], a: "D", exp: "Quyết định của Dr. Zhang: 'Given our aggressive... schedule, the 14-week lead time is essential. Let us proceed with Apex Robotics'." }
        ]
      },
      {
        passage: `[Audio Transcript - Corporate Facilities & Renewable Energy]\nSustainability Director: Linda, our commercial rooftop solar array in Austin generated 420 megawatt-hours of clean electricity last month.\nLinda: That covered approximately 78% of the manufacturing facility's total power consumption, resulting in a utility savings of over $48,000.\nSustainability Director: That is fantastic. When can we expect Phase 2, which includes the battery energy storage system, to go online?\nLinda: The battery installation technicians are completing the grid interconnection testing this week. The entire microgrid should be fully operational by November 15th.`,
        questions: [
          { q: "What percentage of the facility's power consumption was covered by solar energy?", opts: [{"key":"A","text":"78 percent"},{"key":"B","text":"45 percent"},{"key":"C","text":"60 percent"},{"key":"D","text":"95 percent"}], a: "A", exp: "Tỷ lệ điện mặt trời đáp ứng: 'covered approximately 78% of the manufacturing facility's total power consumption'." },
          { q: "How much money did the company save on electricity bills last month?", opts: [{"key":"A","text":"Approximately $25,000"},{"key":"B","text":"Over $48,000"},{"key":"C","text":"$100,000"},{"key":"D","text":"$12,000"}], a: "B", exp: "Tiết kiệm chi phí: 'resulting in a utility savings of over $48,000'." },
          { q: "When will the battery storage microgrid become fully operational?", opts: [{"key":"A","text":"In early January"},{"key":"B","text":"At the end of this week"},{"key":"C","text":"By November 15th"},{"key":"D","text":"Next spring"}], a: "C", exp: "Thời điểm vận hành hoàn tất: 'microgrid should be fully operational by November 15th'." }
        ]
      },
      {
        passage: `[Audio Transcript - Human Resources & Talent Development]\nHR Manager: David, we had eighty-five internal candidates apply for the new Agile Project Management certification programme.\nDavid: That is strong employee engagement. How many participants can our corporate training budget accommodate in the initial cohort?\nHR Manager: We have funding allocated for thirty participants in Cohort 1. Selection will be based on managerial endorsement and demonstrated project leadership in cross-functional technical initiatives.\nDavid: Let us finalize the participant roster by Friday so we can distribute the preparatory digital learning modules on Monday.`,
        questions: [
          { q: "How many employees applied for the training programme?", opts: [{"key":"A","text":"Thirty employees"},{"key":"B","text":"Fifty employees"},{"key":"C","text":"One hundred employees"},{"key":"D","text":"Eighty-five employees"}], a: "D", exp: "Số lượng ứng tuyển: 'eighty-five internal candidates apply'." },
          { q: "How many participants will be enrolled in the first cohort?", opts: [{"key":"A","text":"Thirty participants"},{"key":"B","text":"Fifteen participants"},{"key":"C","text":"Forty-five participants"},{"key":"D","text":"Eighty-five participants"}], a: "A", exp: "Quy mô khóa 1: 'funding allocated for thirty participants in Cohort 1'." },
          { q: "What will happen on Monday?", opts: [{"key":"A","text":"The company will conduct final employee performance reviews."},{"key":"B","text":"Preparatory digital learning modules will be distributed to selected participants."},{"key":"C","text":"The training budget will be renegotiated with finance."},{"key":"D","text":"A new HR manager will be appointed."}], a: "B", exp: "Hoạt động vào thứ Hai: 'distribute the preparatory digital learning modules on Monday'." }
        ]
      },
      {
        passage: `[Audio Transcript - Global Logistics & Freight Tracking]\nLogistics Coordinator: Mr. Alvarez, the maritime shipment of high-precision CNC milling machinery from Yokohama has docked at the Port of Long Beach.\nMr. Alvarez: Excellent. Has the customs broker submitted the import duty clearance paperwork, and is dedicated flatbed transport arranged?\nLogistics Coordinator: Yes, customs clearance was completed electronically this morning. Three heavy-haul flatbed trucks are scheduled to load the machinery at 8:00 AM tomorrow for transit to our Dallas assembly plant.\nMr. Alvarez: Please notify the Dallas facility manager so the receiving bay and overhead crane crews are fully prepared.`,
        questions: [
          { q: "What cargo arrived at the Port of Long Beach?", opts: [{"key":"A","text":"Commercial automotive tires"},{"key":"B","text":"Office desktop computers"},{"key":"C","text":"High-precision CNC milling machinery from Yokohama"},{"key":"D","text":"Industrial paint and chemical solvents"}], a: "C", exp: "Hàng hóa: 'shipment of high-precision CNC milling machinery from Yokohama'." },
          { q: "When will the machinery be loaded onto flatbed trucks?", opts: [{"key":"A","text":"This afternoon at 2:00 PM"},{"key":"B","text":"Next Monday morning"},{"key":"C","text":"In three weeks"},{"key":"D","text":"At 8:00 AM tomorrow"}], a: "D", exp: "Thời gian bốc hàng: 'scheduled to load the machinery at 8:00 AM tomorrow'." },
          { q: "What destination is the cargo traveling to?", opts: [{"key":"A","text":"An assembly plant in Dallas"},{"key":"B","text":"A retail store in Los Angeles"},{"key":"C","text":"A storage facility in Chicago"},{"key":"D","text":"An airport warehouse in Seattle"}], a: "A", exp: "Điểm đến: 'for transit to our Dallas assembly plant'." }
        ]
      }
    ];

    let p3Num = 19;
    part3Conversations.forEach(convo => {
      convo.questions.forEach(item => {
        qs.push({
          id: `tlrs2_q${p3Num}`,
          partNumber: 3,
          partTitle: "Listening Part 3: Short Conversations",
          section: "LISTENING",
          audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(p3Num % 4) + 1}.mp3`,
          passageText: convo.passage,
          questionText: `Question ${p3Num}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
        p3Num++;
      });
    });

    // =========================================================================
    // LISTENING PART 4: Short Talks (Q37 - Q50: 14 Questions)
    // =========================================================================
    const part4Talks = [
      {
        passage: `[Audio Transcript - Conference Keynote Address]\nWelcome, distinguished delegates, to the 2026 Asia-Pacific FinTech Summit in Singapore. I am Jason Lin, Chief Technology Officer at Nexus Settlement Networks. Today, I am proud to announce the commercial deployment of our next-generation cross-border settlement gateway. Utilizing distributed cryptographic ledger protocols and automated liquidity balancing algorithms, our network executes instant foreign exchange settlements with sub-second finality across seventeen currency corridors. In our pilot testing with six major commercial banks, the system reduced transaction processing overhead by forty-two percent and eliminated settlement counterparty risk entirely. We invite all participating institutions to join our technical sandbox demonstration at Booth 402 during the afternoon exhibition session.`,
        questions: [
          { q: "What technology innovation did Jason Lin announce in his speech?", opts: [{"key":"A","text":"A paper-based check verification system"},{"key":"B","text":"A next-generation instant cross-border settlement gateway with sub-second finality"},{"key":"C","text":"New plastic credit card designs"},{"key":"D","text":"Commercial bank branch closure plans"}], a: "B", exp: "Công nghệ công bố: 'next-generation cross-border settlement gateway... instant foreign exchange settlements with sub-second finality'." },
          { q: "By what percentage did the system reduce transaction processing overhead?", opts: [{"key":"A","text":"Eighteen percent"},{"key":"B","text":"Twenty-five percent"},{"key":"C","text":"Forty-two percent"},{"key":"D","text":"Sixty percent"}], a: "C", exp: "Tỷ lệ giảm chi phí: 'reduced transaction processing overhead by forty-two percent'." },
          { q: "Where can delegates see the technical demonstration?", opts: [{"key":"A","text":"At the airport departure lounge"},{"key":"B","text":"In the central hotel lobby"},{"key":"C","text":"Via a televised evening broadcast"},{"key":"D","text":"At Booth 402 in the afternoon exhibition session"}], a: "D", exp: "Địa điểm trình diễn: 'join our technical sandbox demonstration at Booth 402 during the afternoon exhibition session'." }
        ]
      },
      {
        passage: `[Audio Transcript - Corporate Plant Tour / Factory Announcement]\nGood afternoon, visiting engineers and investors. Welcome to the Apex Advanced Robotics Manufacturing Plant here in Austin, Texas. This 65,000-square-meter facility produces high-precision autonomous guided vehicles and robotic arms for aerospace and semiconductor manufacturing clients globally. Our assembly lines operate under a lean Industry 4.0 architecture, where automated optical inspection cameras and vibration sensors monitor every assembly stage in real time. Last quarter, our plant achieved a 99.85% first-pass manufacturing yield while operating on one hundred percent renewable electricity. During today's tour, please remain behind the yellow safety lines and keep your safety glasses and ear protection on at all times.`,
        questions: [
          { q: "What products are manufactured at the Austin facility?", opts: [{"key":"A","text":"Autonomous guided vehicles and robotic arms for aerospace and semiconductor clients"},{"key":"B","text":"Commercial residential furniture"},{"key":"C","text":"Plastic consumer toys and games"},{"key":"D","text":"Handheld agricultural tools"}], a: "A", exp: "Sản phẩm chế tạo: 'high-precision autonomous guided vehicles and robotic arms for aerospace and semiconductor manufacturing clients'." },
          { q: "What manufacturing yield did the plant achieve last quarter?", opts: [{"key":"A","text":"92.5%"},{"key":"B","text":"99.85%"},{"key":"C","text":"95.0%"},{"key":"D","text":"97.8%"}], a: "B", exp: "Hiệu suất sản xuất: 'achieved a 99.85% first-pass manufacturing yield'." },
          { q: "What safety requirement is emphasized for the tour participants?", opts: [{"key":"A","text":"Wearing sterile white cleanroom suits"},{"key":"B","text":"Turning off all cellular phones and radios"},{"key":"C","text":"Wearing safety glasses, ear protection, and staying behind yellow safety lines"},{"key":"D","text":"Refraining from speaking to tour guides"}], a: "C", exp: "Yêu cầu an toàn: 'remain behind the yellow safety lines and keep your safety glasses and ear protection on at all times'." }
        ]
      },
      {
        passage: `[Audio Transcript - Quarterly Financial Earnings Webcast]\nGood morning, analysts and institutional shareholders. I am Victoria Thorne, Chief Financial Officer of Horizon Energy Solutions. I am pleased to share our third-quarter financial results for fiscal year 2026. Consolidated net revenue expanded by twenty-four percent year-over-year to 1.85 billion dollars, driven by unprecedented commercial demand for our grid-scale battery storage units and industrial rooftop solar installations. Operating income rose thirty-one percent to 340 million dollars, reflecting strong gross margins and disciplined supply chain cost management. In light of our robust free cash flow generation, our board of directors has authorized an expanded 200-million-dollar share repurchase programme and increased our quarterly dividend by eight percent to 45 cents per share.`,
        questions: [
          { q: "What was Horizon Energy Solutions' Q3 net revenue?", opts: [{"key":"A","text":"850 million dollars"},{"key":"B","text":"1.2 billion dollars"},{"key":"C","text":"2.5 billion dollars"},{"key":"D","text":"1.85 billion dollars"}], a: "D", exp: "Doanh thu thuần: 'consolidated net revenue expanded by twenty-four percent... to 1.85 billion dollars'." },
          { q: "What major drivers contributed to the revenue growth?", opts: [{"key":"A","text":"Demand for grid-scale battery storage and industrial rooftop solar"},{"key":"B","text":"Sales of petroleum drilling equipment"},{"key":"C","text":"Merger with a foreign airline company"},{"key":"D","text":"Government tax subsidy payouts"}], a: "A", exp: "Động lực tăng trưởng: 'unprecedented commercial demand for our grid-scale battery storage units and industrial rooftop solar installations'." },
          { q: "What shareholder return initiatives were authorized by the board?", opts: [{"key":"A","text":"Issuing additional common shares to raise cash"},{"key":"B","text":"A 200-million-dollar share repurchase programme and an 8% dividend increase"},{"key":"C","text":"Suspending all dividend payouts for two fiscal years"},{"key":"D","text":"A mandatory one-for-two stock split"}], a: "B", exp: "Chính sách cổ đông: '200-million-dollar share repurchase programme and increased our quarterly dividend by eight percent'." }
        ]
      },
      {
        passage: `[Audio Transcript - Internal Corporate Safety Notification]\nAttention all logistics personnel and warehouse shift supervisors. This is an urgent advisory from the Facilities Management Office regarding warehouse HVAC maintenance. Starting Saturday at 8:00 AM through Sunday at 6:00 PM, maintenance contractors will service the central climate control units and replace primary air filtration ductwork in Logistics Building 4. During this thirty-four-hour maintenance period, the temperature in Section B will be actively regulated by supplemental industrial fans, and all moisture-sensitive electronic components must be staged in the climate-controlled vault in Building 1. Normal automated conveyor operations in Building 4 will resume promptly at 7:00 AM on Monday morning.`,
        questions: [
          { q: "What maintenance work is scheduled to take place over the weekend?", opts: [{"key":"A","text":"Repainting exterior parking lot lines"},{"key":"B","text":"Installing new automated security turnstiles"},{"key":"C","text":"Servicing central climate control units and replacing air filtration ductwork in Building 4"},{"key":"D","text":"Replacing all computer servers in the IT data room"}], a: "C", exp: "Công việc bảo trì: 'service the central climate control units and replace primary air filtration ductwork in Logistics Building 4'." },
          { q: "Where must moisture-sensitive components be relocated during maintenance?", opts: [{"key":"A","text":"Outside on the loading dock under tarpaulins"},{"key":"B","text":"To the executive administrative offices"},{"key":"C","text":"Inside employee break rooms"},{"key":"D","text":"To the climate-controlled vault in Building 1"}], a: "D", exp: "Nơi chuyển linh kiện nhạy cảm ẩm: 'staged in the climate-controlled vault in Building 1'." },
          { q: "When will normal automated conveyor operations resume in Building 4?", opts: [{"key":"A","text":"Monday morning promptly at 7:00 AM"},{"key":"B","text":"Saturday evening at 8:00 PM"},{"key":"C","text":"Sunday at noon"},{"key":"D","text":"Next Wednesday afternoon"}], a: "A", exp: "Thời gian phục hồi hoạt động: 'resume promptly at 7:00 AM on Monday morning'." }
        ]
      },
      {
        passage: `[Audio Transcript - Human Resources Town Hall Announcement]\nGood morning, team members. As part of our annual corporate sustainability initiative, the Human Resources department is launching the 'Green Commute Challenge' throughout the month of October. Employees who commute to our Austin corporate campus via public transit, carpooling, bicycling, or electric vehicles can log their daily mileage on the company intranet portal. For every 100 sustainable commute kilometers logged, our company will donate twenty-five dollars to the Texas Urban Forestry Foundation and provide participants with complimentary cafeteria lunch vouchers. At the end of the month, the three departments with the highest participation percentages will receive additional team development budget allocations of five thousand dollars each.`,
        questions: [
          { q: "What initiative is Human Resources launching in October?", opts: [{"key":"A","text":"A mandatory overtime shift schedule"},{"key":"B","text":"The Green Commute Challenge promoting sustainable transportation"},{"key":"C","text":"An annual health insurance fee reduction campaign"},{"key":"D","text":"A corporate office desk reassignment policy"}], a: "B", exp: "Chiến dịch HR: 'launching the Green Commute Challenge throughout the month of October'." },
          { q: "What incentive is provided to the top three participating departments?", opts: [{"key":"A","text":"One week of mandatory remote work"},{"key":"B","text":"Free airline tickets to international conferences"},{"key":"C","text":"Five thousand dollars each in additional team development budget allocations"},{"key":"D","text":"New executive office chairs"}], a: "C", exp: "Phần thưởng cho 3 phòng ban dẫn đầu: 'additional team development budget allocations of five thousand dollars each'." }
        ]
      }
    ];

    let p4Num = 37;
    part4Talks.forEach(talk => {
      talk.questions.forEach(item => {
        qs.push({
          id: `tlrs2_q${p4Num}`,
          partNumber: 4,
          partTitle: "Listening Part 4: Short Talks",
          section: "LISTENING",
          audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(p4Num % 4) + 1}.mp3`,
          passageText: talk.passage,
          questionText: `Question ${p4Num}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
        p4Num++;
      });
    });

    // =========================================================================
    // READING PART 5: Incomplete Sentences (Q51 - Q65: 15 Questions)
    // =========================================================================
    const part5Items = [
      { q: "The senior procurement officer commended the vendor for _______ delivering the custom server racks ahead of the contractual deadline.", opts: [{"key":"A","text":"prompt"},{"key":"B","text":"prompting"},{"key":"C","text":"promptness"},{"key":"D","text":"promptly"}], a: "D", exp: "Cần trạng từ `promptly` để bổ nghĩa cho động từ phân từ `delivering`." },
      { q: "All employees seeking reimbursement for overseas business travel expenses must submit their receipts _______ thirty days of returning.", opts: [{"key":"A","text":"within"},{"key":"B","text":"among"},{"key":"C","text":"beside"},{"key":"D","text":"between"}], a: "A", exp: "Giới từ chỉ khoảng thời gian: `within thirty days` (trong vòng 30 ngày)." },
      { q: "The chief financial officer's presentation provided a _______ analysis of quarterly revenue fluctuations across all European subsidiaries.", opts: [{"key":"A","text":"comprehend"},{"key":"B","text":"comprehensive"},{"key":"C","text":"comprehension"},{"key":"D","text":"comprehensively"}], a: "B", exp: "Cần tính từ `comprehensive` (toàn diện, sâu sắc) để bổ nghĩa cho danh từ `analysis`." },
      { q: "Although semiconductor component prices increased sharply, our manufacturing margins remained _______ throughout the fiscal quarter.", opts: [{"key":"A","text":"stability"},{"key":"B","text":"stably"},{"key":"C","text":"stable"},{"key":"D","text":"stabilize"}], a: "C", exp: "Sau động từ nối `remained` cần tính từ `stable` (ổn định) làm vị ngữ." },
      { q: "The executive committee decided to _______ the launch of the electric crossover vehicle until consumer safety validation is complete.", opts: [{"key":"A","text":"postponement"},{"key":"B","text":"postponed"},{"key":"C","text":"postponing"},{"key":"D","text":"postpone"}], a: "D", exp: "Cấu trúc `decided to + V_infinitive` -> cần động từ nguyên mẫu `postpone` (hoãn lại)." },
      { q: "The commercial real estate broker negotiated _______ on behalf of the technology firm to secure favorable multi-year lease terms.", opts: [{"key":"A","text":"skillfully"},{"key":"B","text":"skillful"},{"key":"C","text":"skillfulness"},{"key":"D","text":"skilled"}], a: "A", exp: "Cần trạng từ `skillfully` để bổ nghĩa cho động từ `negotiated`." },
      { q: "Each prospective bidder must demonstrate that their enterprise possesses _______ financial resources to complete the municipal infrastructure project.", opts: [{"key":"A","text":"sufficiently"},{"key":"B","text":"sufficient"},{"key":"C","text":"sufficiency"},{"key":"D","text":"suffice"}], a: "B", exp: "Cần tính từ `sufficient` (đủ, thích đáng) bổ nghĩa cho cụm danh từ `financial resources`." },
      { q: "The software development team worked around the clock to ensure that all critical security patches were deployed _______ .", opts: [{"key":"A","text":"success"},{"key":"B","text":"successful"},{"key":"C","text":"successfully"},{"key":"D","text":"succeed"}], a: "C", exp: "Cần trạng từ `successfully` để bổ nghĩa cho động từ bị động `were deployed`." },
      { q: "_______ the sudden transit strike in the metropolitan area, over ninety percent of corporate headquarters employees arrived on time.", opts: [{"key":"A","text":"Although"},{"key":"B","text":"Because"},{"key":"C","text":"Unless"},{"key":"D","text":"Despite"}], a: "D", exp: "`Despite + noun phrase` (mặc dù cuộc đình công giao thông đột ngột) chỉ sự nhượng bộ." },
      { q: "The human resources director announced that annual performance evaluations would be conducted _______ the first two weeks of December.", opts: [{"key":"A","text":"during"},{"key":"B","text":"while"},{"key":"C","text":"onto"},{"key":"D","text":"along"}], a: "A", exp: "Giới từ `during + time period` (trong suốt 2 tuần đầu tháng 12)." },
      { q: "The newly installed robotic packaging system has significantly _______ the warehouse's daily carton fulfillment throughput.", opts: [{"key":"A","text":"enhance"},{"key":"B","text":"enhanced"},{"key":"C","text":"enhancing"},{"key":"D","text":"enhancement"}], a: "B", exp: "Thì hiện tại hoàn thành `has significantly enhanced` -> cần quá khứ phân từ `enhanced`." },
      { q: "Technical support specialists are available around the clock to assist clients with _______ network configuration inquiries.", opts: [{"key":"A","text":"they"},{"key":"B","text":"them"},{"key":"C","text":"their"},{"key":"D","text":"themselves"}], a: "C", exp: "Cần tính từ sở hữu `their` đứng trước cụm danh từ `network configuration inquiries`." },
      { q: "The legal compliance department distributed an updated handbook outlining company _______ regarding data privacy and cybersecurity.", opts: [{"key":"A","text":"policed"},{"key":"B","text":"policying"},{"key":"C","text":"politely"},{"key":"D","text":"policies"}], a: "D", exp: "Cần danh từ số nhiều `policies` (các chính sách công ty) làm tân ngữ." },
      { q: "Due to rising raw material costs, the board recommended that the quarterly production targets be adjusted _______ .", opts: [{"key":"A","text":"accordingly"},{"key":"B","text":"according"},{"key":"C","text":"accordance"},{"key":"D","text":"accorded"}], a: "A", exp: "Cần trạng từ `accordingly` (theo đó, một cách tương ứng) để bổ nghĩa cho `adjusted`." },
      { q: "The lead architect insisted on inspecting the structural foundation _______ before authorizing subsequent concrete pours.", opts: [{"key":"A","text":"personal"},{"key":"B","text":"personally"},{"key":"C","text":"personality"},{"key":"D","text":"person"}], a: "B", exp: "Cần trạng từ `personally` (đích thân) bổ nghĩa cho hành động `inspecting`." }
    ];

    part5Items.forEach((item, idx) => {
      qs.push({
        id: `tlrs2_q${idx + 51}`,
        partNumber: 5,
        partTitle: "Reading Part 5: Incomplete Sentences",
        section: "READING",
        questionText: `Question ${idx + 51}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // READING PART 6: Text Completion (Q66 - Q73: 8 Questions)
    // =========================================================================
    const part6Sets = [
      {
        passage: `MEMORANDUM ON ENTERPRISE CLOUD MIGRATION\n\nTo: All Department Heads\nFrom: Chief Information Officer\nDate: October 14, 2026\nSubject: Scheduled Core Database Migration Window\n\nPlease be advised that our enterprise IT department will execute the final phase of our cloud database migration this coming weekend. The migration procedure is scheduled to begin at 10:00 PM on Saturday and conclude _______ (Q66) 6:00 AM on Sunday.\n\nDuring this transition window, access to the internal ERP software, customer billing portal, and digital project repositories will be temporarily _______ (Q67). All department supervisors must ensure that team members save their active files to local hard drives before leaving on Friday afternoon.\n\nOur technical team has conducted three successful trial migrations, and we anticipate minimal disruption to Monday morning operations. Should you experience any system anomalies following the cutover, please contact the dedicated IT emergency hotline _______ (Q68) extension 8800. We appreciate your patience and cooperation as we upgrade our digital _______ (Q69) to support continued global expansion.`,
        questions: [
          { q: "Select the best preposition for blank (Q66).", opts: [{"key":"A","text":"over"},{"key":"B","text":"from"},{"key":"C","text":"by"},{"key":"D","text":"into"}], a: "C", exp: "`Conclude by 6:00 AM` (hoàn tất trước 6 giờ sáng Chủ nhật)." },
          { q: "Select the best word for blank (Q67).", opts: [{"key":"A","text":"suspending"},{"key":"B","text":"suspension"},{"key":"C","text":"suspends"},{"key":"D","text":"suspended"}], a: "D", exp: "Cấu trúc bị động `will be temporarily suspended` (sẽ tạm thời bị tạm dừng)." },
          { q: "Select the best word for blank (Q68).", opts: [{"key":"A","text":"at"},{"key":"B","text":"in"},{"key":"C","text":"on"},{"key":"D","text":"with"}], a: "A", exp: "Giới từ chỉ số máy nội bộ: `contact... at extension 8800`." },
          { q: "Select the best word for blank (Q69).", opts: [{"key":"A","text":"recreational"},{"key":"B","text":"infrastructure"},{"key":"C","text":"landscaping"},{"key":"D","text":"furniture"}], a: "B", exp: "`Digital infrastructure` (hạ tầng kỹ thuật số) là thuật ngữ CNTT chính xác." }
        ]
      },
      {
        passage: `PRESS RELEASE: RENEWABLE ENERGY PARTNERSHIP\n\nAUSTIN, TX — October 18, 2026 — Apex Clean Energy Solutions today announced that it has _______ (Q70) a long-term power purchase agreement with municipal utility authorities in Travis County. Under the terms of the agreement, Apex will construct a 120-megawatt solar photovoltaic installation paired with a 40-megawatt utility-scale battery energy storage system.\n\nThe project will generate sufficient renewable electricity to power approximately 45,000 residential homes while eliminating 180,000 metric tonnes of annual carbon emissions. Construction of the solar facility is slated to begin in January 2027, and commercial operations will _______ (Q71) commence in the fourth quarter of that year.\n\n"This landmark agreement demonstrates our shared commitment to scalable clean energy infrastructure," stated Apex Chief Executive Officer Sarah Lin. "By combining high-efficiency solar generation with advanced battery storage, we are providing the Austin metropolitan area with reliable, _______ (Q72) priced green electricity."\n\nLocal civic leaders have commended the initiative, noting that the project will _______ (Q73) over three hundred well-paying union construction jobs during its 18-month buildout.`,
        questions: [
          { q: "Select the best word for blank (Q70).", opts: [{"key":"A","text":"finalizing"},{"key":"B","text":"finalize"},{"key":"C","text":"finalized"},{"key":"D","text":"finalization"}], a: "C", exp: "Thì hiện tại hoàn thành `has finalized` (đã hoàn tất ký kết)." },
          { q: "Select the best word for blank (Q71).", opts: [{"key":"A","text":"official"},{"key":"B","text":"officiate"},{"key":"C","text":"officer"},{"key":"D","text":"officially"}], a: "D", exp: "Trạng từ `officially` bổ nghĩa cho động từ `commence` (chính thức bắt đầu)." },
          { q: "Select the best word for blank (Q72).", opts: [{"key":"A","text":"competitively"},{"key":"B","text":"competitive"},{"key":"C","text":"competition"},{"key":"D","text":"competitor"}], a: "A", exp: "Trạng từ `competitively` bổ nghĩa cho phân từ/tính từ `priced` (được định giá cạnh tranh)." },
          { q: "Select the best word for blank (Q73).", opts: [{"key":"A","text":"creates"},{"key":"B","text":"create"},{"key":"C","text":"created"},{"key":"D","text":"creating"}], a: "B", exp: "Sau trợ động từ `will` cần động từ nguyên mẫu `create` (tạo ra)." }
        ]
      }
    ];

    let p6Num = 66;
    part6Sets.forEach(set => {
      set.questions.forEach(item => {
        qs.push({
          id: `tlrs2_q${p6Num}`,
          partNumber: 6,
          partTitle: "Reading Part 6: Text Completion",
          section: "READING",
          passageText: set.passage,
          questionText: `Question ${p6Num}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
        p6Num++;
      });
    });

    // =========================================================================
    // READING PART 7: Reading Comprehension (Q74 - Q100: 27 Questions)
    // =========================================================================
    const part7Passages = [
      {
        passage: `COMMERCIAL SOLAR CONTRACT SUMMARY\n\nProject Name: Austin Industrial Park Microgrid & Solar Facility\nContract Reference: AEP-TX-2026-894\nEffective Date: October 1, 2026\nParties: Apex Clean Energy Solutions (Contractor) & City of Austin Municipal Utility Authority (Client)\n\nContract Value & Payment Schedule:\nThe total turnkey lump-sum contract value is $25,000,000 USD. Payments are tied to milestone verifications:\n- Milestone 1: Engineering design approval & environmental permits (15% - $3,750,000)\n- Milestone 2: Foundation racking completion & inverter delivery (35% - $8,750,000)\n- Milestone 3: Photovoltaic module installation (30% - $7,500,000)\n- Milestone 4: Substation grid synchronization & commercial operation acceptance (20% - $5,000,000)\n\nTechnical Specifications:\n- Total Installed Capacity: 100 Megawatts direct current (MWdc)\n- Panel Type: High-efficiency bifacial monocrystalline silicon modules\n- Expected Annual Generation: 175,000 Megawatt-hours (MWh)\n- Guaranteed Performance Ratio: 84.5% during the initial 10-year warranty period\n\nProject Schedule:\nCivil site grading commenced in November 2026. Photovoltaic panel assembly will begin in March 2027, with targeted commercial operation date (COD) mandated on or before October 31, 2027. Liquidated damages of $15,000 per day apply for unexcused contractor delays.`,
        questions: [
          { q: "What is the total value of the turnkey solar contract?", opts: [{"key":"A","text":"$3,750,000"},{"key":"B","text":"$8,750,000"},{"key":"C","text":"$25,000,000"},{"key":"D","text":"$100,000,000"}], a: "C", exp: "Giá trị hợp đồng: 'turnkey lump-sum contract value is $25,000,000 USD'." },
          { q: "What percentage of the contract value is paid upon Milestone 2 completion?", opts: [{"key":"A","text":"15 percent"},{"key":"B","text":"30 percent"},{"key":"C","text":"20 percent"},{"key":"D","text":"35 percent"}], a: "D", exp: "Tỷ lệ giải ngân Milestone 2: 'Milestone 2: Foundation racking... (35% - $8,750,000)'." },
          { q: "What is the expected annual electricity generation of the facility?", opts: [{"key":"A","text":"175,000 Megawatt-hours"},{"key":"B","text":"100 Megawatts"},{"key":"C","text":"84.5 Megawatt-hours"},{"key":"D","text":"45,000 Megawatt-hours"}], a: "A", exp: "Sản lượng điện hàng năm: 'Expected Annual Generation: 175,000 Megawatt-hours (MWh)'." },
          { q: "By what date must commercial operation be achieved?", opts: [{"key":"A","text":"November 2026"},{"key":"B","text":"October 31, 2027"},{"key":"C","text":"March 2027"},{"key":"D","text":"December 31, 2028"}], a: "B", exp: "Hạn chót vận hành thương mại: 'mandated on or before October 31, 2027'." },
          { q: "What financial penalty applies for unexcused contractor delays?", opts: [{"key":"A","text":"$5,000 per day"},{"key":"B","text":"$10,000 per week"},{"key":"C","text":"$15,000 per day"},{"key":"D","text":"Cancellation of the entire contract without payment"}], a: "C", exp: "Mức phạt chậm tiến độ: 'Liquidated damages of $15,000 per day apply for unexcused contractor delays'." }
        ]
      },
      {
        passage: `JOB ADVERTISEMENT: SENIOR LOGISTICS & AUTOMATION MANAGER\n\nCompany: GlobalTech Supply Solutions\nLocation: Jurong Logistics Hub, Singapore\nEmployment Type: Full-Time, Permanent\nSalary Range: SGD 12,000 - SGD 16,000 per month (plus performance bonus)\n\nAbout the Role:\nGlobalTech is seeking an experienced Senior Logistics & Automation Manager to lead operational digitalization across our 85,000-square-meter regional fulfillment center in Singapore. The successful candidate will oversee automated storage and retrieval systems (ASRS), a fleet of 150 autonomous mobile robots (AMRs), and an engineering maintenance crew of 45 specialists.\n\nKey Responsibilities:\n- Optimize daily warehouse order throughput, targeting minimum 99.7% order accuracy\n- Lead predictive maintenance strategies for automated conveyor sorters and robotic cranes\n- Manage supplier vendor agreements for replacement robotics components and software licenses\n- Coordinate with cross-border freight forwarding teams to minimize container dwell times at the port\n- Present quarterly efficiency and capital expenditure metrics to the APAC Executive Board\n\nRequired Qualifications:\n- Bachelor's degree in Industrial Engineering, Supply Chain Management, or related technical discipline (Master's preferred)\n- Minimum 8 years of progressive management experience in automated logistics or manufacturing\n- Demonstrated mastery of SAP Warehouse Management (S/4HANA EWM) and PLC industrial automation protocols\n- Six Sigma Black Belt certification is highly desirable\n- Exceptional bilingual fluency in English and Mandarin for regional stakeholder management\n\nBenefits:\nComprehensive family healthcare coverage, annual performance bonus (up to 25% of base salary), 24 days annual paid leave, and professional development tuition reimbursement.\n\nTo apply, submit your curriculum vitae and cover letter to careers@globaltechlogistics.sg by November 30, 2026.`,
        questions: [
          { q: "Where is the job position physically located?", opts: [{"key":"A","text":"Austin, Texas"},{"key":"B","text":"Munich, Germany"},{"key":"C","text":"Dresden, Germany"},{"key":"D","text":"Jurong Logistics Hub, Singapore"}], a: "D", exp: "Địa điểm làm việc: 'Jurong Logistics Hub, Singapore'." },
          { q: "How many autonomous mobile robots does the manager oversee?", opts: [{"key":"A","text":"150 robots"},{"key":"B","text":"45 robots"},{"key":"C","text":"85 robots"},{"key":"D","text":"300 robots"}], a: "A", exp: "Số lượng robot tự hành: 'fleet of 150 autonomous mobile robots (AMRs)'." },
          { q: "How many years of relevant progressive management experience are required?", opts: [{"key":"A","text":"3 years"},{"key":"B","text":"8 years"},{"key":"C","text":"5 years"},{"key":"D","text":"12 years"}], a: "B", exp: "Số năm kinh nghiệm: 'Minimum 8 years of progressive management experience'." },
          { q: "What is the maximum potential annual performance bonus?", opts: [{"key":"A","text":"10% of base salary"},{"key":"B","text":"15% of base salary"},{"key":"C","text":"25% of base salary"},{"key":"D","text":"50% of base salary"}], a: "C", exp: "Mức thưởng tối đa: 'up to 25% of base salary'." },
          { q: "When is the deadline to submit job applications?", opts: [{"key":"A","text":"October 14, 2026"},{"key":"B","text":"November 15, 2026"},{"key":"C","text":"December 31, 2026"},{"key":"D","text":"November 30, 2026"}], a: "D", exp: "Hạn chót ứng tuyển: 'by November 30, 2026'." }
        ]
      },
      {
        passage: `INTERNAL EMAIL CHAIN: CORPORATE TRAVEL & EXPENSE POLICY UPDATE\n\nFrom: Marcus Vance, Corporate Director of Human Resources\nTo: All Employees, Americas & APAC\nDate: October 20, 2026\nSubject: Updated Business Travel Reimbursement Guidelines (Effective Nov 1)\n\nDear Colleagues,\n\nIn our continuous effort to streamline operational accounting and ensure compliance with updated international corporate governance standards, executive management has finalized revisions to our Corporate Travel & Expense Policy, effective November 1, 2026.\n\nKey Revisions Summary:\n1. Lodging Allowance: Nightly hotel accommodation caps have been adjusted to $240 USD in Tier-1 metropolitan cities (e.g., New York, Singapore, London, Tokyo) and $175 USD in Tier-2 locations.\n2. Meal Stipend: Daily per diem for meals is standardized at $75 USD per day, with no individual receipt itemization required for meals under $25 USD.\n3. Airfare Policy: Economy Class remains mandatory for flights under 6 hours duration. For intercontinental flights exceeding 6 hours, Premium Economy or Business Class authorization requires written approval from a Senior Vice President prior to ticket booking.\n4. Submission Deadline: All expense reimbursement claims must be submitted via the Concur digital portal within twenty-one (21) calendar days following trip completion. Claims submitted after 30 days will require Chief Financial Officer sign-off.\n\nPlease direct any policy questions to expense-helpdesk@globaltech.com.\n\nBest regards,\nMarcus Vance, Corporate HR Director`,
        questions: [
          { q: "What is the effective date of the updated corporate travel policy?", opts: [{"key":"A","text":"November 1, 2026"},{"key":"B","text":"October 20, 2026"},{"key":"C","text":"November 30, 2026"},{"key":"D","text":"January 1, 2027"}], a: "A", exp: "Ngày hiệu lực: 'effective November 1, 2026'." },
          { q: "What is the nightly hotel lodging cap for Tier-1 metropolitan cities?", opts: [{"key":"A","text":"$75 USD"},{"key":"B","text":"$240 USD"},{"key":"C","text":"$175 USD"},{"key":"D","text":"$350 USD"}], a: "B", exp: "Hạn mức khách sạn nhóm 1: 'caps have been adjusted to $240 USD in Tier-1 metropolitan cities'." },
          { q: "When is Business Class airfare travel permitted?", opts: [{"key":"A","text":"On all domestic flights exceeding 2 hours"},{"key":"B","text":"Whenever an employee travels on weekends"},{"key":"C","text":"On intercontinental flights exceeding 6 hours with prior written SVP approval"},{"key":"D","text":"Only for the Chief Executive Officer"}], a: "C", exp: "Quy định vé thương gia: 'exceeding 6 hours, Premium Economy or Business Class authorization requires written approval from a Senior Vice President'." },
          { q: "Within how many calendar days must expense reimbursement claims normally be submitted?", opts: [{"key":"A","text":"7 days"},{"key":"B","text":"14 days"},{"key":"C","text":"30 days"},{"key":"D","text":"21 days"}], a: "D", exp: "Thời hạn nộp thông thường: 'within twenty-one (21) calendar days following trip completion'." }
        ]
      },
      {
        passage: `COMPANY NEWSLETTER: ANNUAL INNOVATION EXCELLENCE AWARDS\n\nIssue 44 — Fourth Quarter 2026\n\nLast Friday, GlobalTech celebrated our annual Innovation Excellence Awards at the Marina Bay Convention Centre. Over six hundred employees, board directors, and research partners attended the gala banquet honoring outstanding technological and commercial achievements across our international business units.\n\nThe prestigious 'Breakthrough Product of the Year' was awarded to the Semiconductor Micro-Optics Engineering Team in Dresden. Led by Principal Optical Physicist Dr. Elena Becker, the Dresden team successfully developed a 2-nanometer extreme ultraviolet (EUV) optical pellicle capable of withstanding 600-watt laser exposure without thermal degradation. This scientific breakthrough increases wafer manufacturing yield by 14% while lowering consumable replacement costs by twenty-two million dollars annually for semiconductor foundries.\n\nThe 'Operational Sustainability Award' went to the Austin Manufacturing Plant for its microgrid electrification project. Plant Manager Thomas Miller and his facilities crew completed a 100-megawatt rooftop solar installation paired with battery storage that reduced facility carbon emissions by 82% in 2026.\n\nFinally, the 'Global Team Spirit Award' recognized the Singapore Logistics Digitalization Squad for achieving 99.8% order accuracy across 1.2 million automated warehouse deliveries during the peak holiday fulfillment period. Congratulations to all award recipients!`,
        questions: [
          { q: "Where was the annual Innovation Excellence Awards ceremony held?", opts: [{"key":"A","text":"At the Marina Bay Convention Centre in Singapore"},{"key":"B","text":"In Austin, Texas"},{"key":"C","text":"At the Dresden Opera House"},{"key":"D","text":"In London, United Kingdom"}], a: "A", exp: "Địa điểm trao giải: 'at the Marina Bay Convention Centre'." },
          { q: "Which team won the 'Breakthrough Product of the Year' award?", opts: [{"key":"A","text":"The Austin Facilities Maintenance Crew"},{"key":"B","text":"The Semiconductor Micro-Optics Engineering Team in Dresden"},{"key":"C","text":"The Singapore Human Resources Department"},{"key":"D","text":"The Legal Compliance Team in London"}], a: "B", exp: "Nhóm đạt giải sản phẩm đột phá: 'Semiconductor Micro-Optics Engineering Team in Dresden'." },
          { q: "What financial impact does the Dresden team's EUV pellicle deliver for foundries?", opts: [{"key":"A","text":"Generates ten million dollars in tax rebates"},{"key":"B","text":"Reduces employee salaries by 15 percent"},{"key":"C","text":"Lowers consumable replacement costs by twenty-two million dollars annually"},{"key":"D","text":"Increases packaging costs by 5 percent"}], a: "C", exp: "Tác động tài chính: 'lowering consumable replacement costs by twenty-two million dollars annually'." },
          { q: "By what percentage did the Austin plant reduce its carbon emissions in 2026?", opts: [{"key":"A","text":"50 percent"},{"key":"B","text":"75 percent"},{"key":"C","text":"99.8 percent"},{"key":"D","text":"82 percent"}], a: "D", exp: "Mức giảm phát thải của nhà máy Austin: 'reduced facility carbon emissions by 82% in 2026'." }
        ]
      },
      {
        passage: `EXECUTIVE MEMORANDUM ON WORKPLACE CYBERSECURITY\n\nTo: All Network Users and Subcontractors\nFrom: Chief Information Security Officer (CISO)\nDate: October 25, 2026\nSubject: Mandatory Implementation of FIDO2 Hardware Security Keys\n\nIn response to sophisticated multi-vector credential phishing attacks targeting international technology corporations, GlobalTech is mandating the deployment of FIDO2-compliant physical hardware security keys for all enterprise network access, effective November 15, 2026.\n\nImplementation Steps:\n1. Key Collection: All corporate staff must collect two registered hardware security keys (one primary, one backup) from their regional IT Service Desk between November 1 and November 10.\n2. Device Registration: Follow the automated setup guide on the security portal (https://security.globaltech.internal/fido-enroll) to register your hardware keys with your biometric workstation profile.\n3. Phase-out of SMS Verification: Beginning November 15, SMS text message one-time passcodes and phone-based authenticator apps will be permanently disabled for VPN and single sign-on (SSO) logins.\n4. Lost Key Protocol: In the event of a misplaced key, immediately report the incident to the Security Operations Centre (SOC) at ext. 9111 to revoke cryptographic certificates.\n\nThank you for your active collaboration in fortifying our enterprise digital defense perimeter.`,
        questions: [
          { q: "What cybersecurity measure is being mandated by the CISO?", opts: [{"key":"A","text":"Mandatory deployment of FIDO2 physical hardware security keys"},{"key":"B","text":"Changing alphanumeric passwords every Monday"},{"key":"C","text":"Banning all laptop use outside company premises"},{"key":"D","text":"Eliminating all remote working privileges"}], a: "A", exp: "Biện pháp an ninh mạng bắt buộc: 'mandating the deployment of FIDO2-compliant physical hardware security keys'." },
          { q: "How many hardware security keys will each employee receive?", opts: [{"key":"A","text":"One key"},{"key":"B","text":"Two keys (one primary, one backup)"},{"key":"C","text":"Three keys"},{"key":"D","text":"Five keys"}], a: "B", exp: "Số lượng khóa: 'two registered hardware security keys (one primary, one backup)'." },
          { q: "What authentication method will be permanently disabled on November 15?", opts: [{"key":"A","text":"Fingerprint scanner recognition"},{"key":"B","text":"Hardware cryptographic tokens"},{"key":"C","text":"SMS text message one-time passcodes and phone authenticator apps"},{"key":"D","text":"Physical badge tapping"}], a: "C", exp: "Phương thức bị vô hiệu hóa: 'SMS text message one-time passcodes and phone-based authenticator apps will be permanently disabled'." },
          { q: "What extension number should employees call if they misplace a hardware key?", opts: [{"key":"A","text":"Ext. 4200"},{"key":"B","text":"Ext. 8800"},{"key":"C","text":"Ext. 9999"},{"key":"D","text":"Ext. 9111"}], a: "D", exp: "Số máy báo mất khóa: 'Security Operations Centre (SOC) at ext. 9111'." }
        ]
      },
      {
        passage: `PRODUCT SPECIFICATION NOTICE: AUTOMATED GUIDED VEHICLE (AGV-X800)\n\nModel: Apex AGV-X800 Heavy-Payload Autonomous Guided Vehicle\nManufacturer: Apex Advanced Robotics LLC\nIntended Application: Palletized goods transport in high-density automated warehouses and manufacturing plants\n\nTechnical Specifications:\n- Maximum Payload Capacity: 1,500 kilograms (3,300 lbs)\n- Travel Speed: Up to 2.2 meters per second (adjustable based on aisle congestion)\n- Navigation System: Dual 360-degree safety LiDAR sensors combined with optical floor SLAM mapping (no magnetic floor tape required)\n- Battery Technology: 48V 100Ah Lithium Iron Phosphate (LiFePO4) battery pack\n- Operating Duration: 10 hours continuous operation per full charge\n- Fast-Charging Capability: Automated opportunity charging from 20% to 80% state of charge in 25 minutes\n- Operating Temperature Range: -10°C to +45°C (suitable for cold-storage and ambient warehouses)\n- Safety Certification: Fully compliant with ISO 3691-4 industrial unmanned vehicle safety standards, featuring automatic obstacle avoidance and emergency mechanical bumper stops.\n\nWarranty: 3-year comprehensive warranty covering drivetrain, chassis, and electronic control modules.`,
        questions: [
          { q: "What is the maximum payload capacity of the AGV-X800?", opts: [{"key":"A","text":"1,500 kilograms"},{"key":"B","text":"500 kilograms"},{"key":"C","text":"1,000 kilograms"},{"key":"D","text":"3,000 kilograms"}], a: "A", exp: "Tải trọng tối đa: 'Maximum Payload Capacity: 1,500 kilograms (3,300 lbs)'." },
          { q: "How fast can the vehicle charge from 20% to 80% battery capacity?", opts: [{"key":"A","text":"In 10 minutes"},{"key":"B","text":"In 25 minutes"},{"key":"C","text":"In 45 minutes"},{"key":"D","text":"In 2 hours"}], a: "B", exp: "Thời gian sạc nhanh: 'charging from 20% to 80% state of charge in 25 minutes'." },
          { q: "What navigation method eliminates the need for magnetic floor tape?", opts: [{"key":"A","text":"Overhead radio antenna cables"},{"key":"B","text":"Manual remote control steering by forklift operators"},{"key":"C","text":"Dual 360-degree safety LiDAR combined with optical SLAM mapping"},{"key":"D","text":"Underfloor copper wiring"}], a: "C", exp: "Công nghệ điều hướng: 'Dual 360-degree safety LiDAR sensors combined with optical floor SLAM mapping'." },
          { q: "What is the duration of the manufacturer warranty?", opts: [{"key":"A","text":"1 year"},{"key":"B","text":"2 years"},{"key":"C","text":"5 years"},{"key":"D","text":"3 years"}], a: "D", exp: "Thời hạn bảo hành: '3-year comprehensive warranty'." },
          { q: "In what temperature range can the AGV-X800 operate effectively?", opts: [{"key":"A","text":"-10°C to +45°C"},{"key":"B","text":"0°C to +30°C"},{"key":"C","text":"-30°C to 0°C"},{"key":"D","text":"+20°C to +60°C"}], a: "A", exp: "Dải nhiệt độ hoạt động: 'Operating Temperature Range: -10°C to +45°C'." }
        ]
      }
    ];

    let p7Num = 74;
    part7Passages.forEach(passageSet => {
      passageSet.questions.forEach(item => {
        qs.push({
          id: `tlrs2_q${p7Num}`,
          partNumber: 7,
          partTitle: "Reading Part 7: Reading Comprehension",
          section: "READING",
          passageText: passageSet.passage,
          questionText: `Question ${p7Num}: ${item.q}`,
          options: item.opts as any,
          correctAnswer: item.a as any,
          explanation: item.exp
        });
        p7Num++;
      });
    });

    return qs;
  })()
};
