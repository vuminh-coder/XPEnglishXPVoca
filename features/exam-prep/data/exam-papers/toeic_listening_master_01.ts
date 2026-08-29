import { ExamPaper, ExamQuestion } from "./types";

export const toeicListeningMaster01Paper: ExamPaper = {
  id: "toeic_listening_master_01",
  title: "TOEIC Listening Master 100 #01",
  type: "TOEIC_LR",
  level: "Advanced",
  timeLimitMinutes: 45,
  totalQuestions: 100,
  maxScore: 495,
  description: "Trọn bộ 100 câu hỏi luyện tốc độ chuyên sâu Kỹ năng Nghe (Listening Master): Parts 1-4 chuẩn ETS TOEIC 2026 bao quát đàm phán vi mạch Tokyo, chuỗi cung ứng lạnh Bắc Âu, an ninh sinh trắc học Heathrow và tự động hóa nhà máy Frankfurt.",
  categoryBadge: "TOEIC Listening",
  tags: ["TOEIC", "Listening Only", "ETS 2026", "Master Series"],
  supportedSkills: ["LISTENING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
        // =========================================================================
    // PART 1: PHOTOGRAPHS (Q1 - Q6)
    // =========================================================================
    const part1Items = [
      {
        id: "tlm1_q1",
        text: "Look at the photograph marked No. 1 in your test book.",
        img: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        opts: [
          { key: "A", text: "Automated robotic arms are manufacturing precision 3nm semiconductor chips." },
          { key: "B", text: "Workers are planting flowers in a suburban park." },
          { key: "C", text: "Chefs are baking bread in a commercial bakery oven." },
          { key: "D", text: "Books are stacked neatly on a wooden library shelf." }
        ],
        a: "A",
        exp: "🎯 **Đáp án đúng: A** (Automated robotic arms are manufacturing precision 3nm semiconductor chips.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Các cánh tay robot tự động đang sản xuất chip bán dẫn chính xác. (Đúng với khung cảnh nhà máy công nghệ cao)\n- (B) Công nhân đang trồng hoa trong công viên ngoại ô. (Sai bối cảnh)\n- (C) Các đầu bếp đang nướng bánh mì trong lò nướng thương mại. (Sai đối tượng)\n- (D) Sách được xếp ngay ngắn trên kệ thư viện bằng gỗ. (Sai đối tượng)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy đối tượng và hành vi: Dây chuyền sản xuất tự động hóa chip bán dẫn công nghệ cao không có sự tham gia thủ công của đầu bếp (C) hay người làm vườn (B).\n\n💡 **Từ vựng trọng tâm:**\n- `automated robotic arms` (/ˈɔːtəmeɪtɪd rəʊˈbɒtɪk ɑːmz/): cánh tay robot tự động hóa\n- `semiconductor chips` (/ˌsɛmikənˈdʌktər tʃɪps/): chip bán dẫn vi mạch"
      },
      {
        id: "tlm1_q2",
        text: "Look at the photograph marked No. 2 in your test book.",
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        opts: [
          { key: "A", text: "Shoppers are browsing clothing racks in a boutique." },
          { key: "B", text: "Automated guided forklifts (AGVs) are transporting pallets across a distribution warehouse." },
          { key: "C", text: "Vehicles are stalled in heavy highway traffic during rush hour." },
          { key: "D", text: "Sailboats are anchored in a recreational harbor marina." }
        ],
        a: "B",
        exp: "🎯 **Đáp án đúng: B** (Automated guided forklifts (AGVs) are transporting pallets across a distribution warehouse.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Người mua sắm đang xem các giá treo quần áo trong cửa hàng thời trang. (Sai bối cảnh)\n- (B) Xe nâng tự hành (AGVs) đang vận chuyển các kiện hàng pallet qua nhà kho phân phối. (Đúng hành động và không gian kho)\n- (C) Xe cộ đang bị chết máy trong tình trạng tắc đường giờ cao điểm. (Sai bối cảnh)\n- (D) Thuyền buồm đang neo đậu trong bến cảng giải trí. (Sai đối tượng)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy bối cảnh: Kho vận logistics với các dãy kệ cao tầng chứa hàng pallet và phương tiện nâng chuyển hàng hóa.\n\n💡 **Từ vựng trọng tâm:**\n- `automated guided forklift (AGV)` (/ˈɔːtəmeɪtɪd ˈɡaɪdɪd ˈfɔːklɪft/): xe nâng tự hành thông minh\n- `distribution warehouse` (/ˌdɪstrɪˈbjuːʃn ˈweəhaʊs/): trung tâm phân phối kho hàng"
      },
      {
        id: "tlm1_q3",
        text: "Look at the photograph marked No. 3 in your test book.",
        img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        opts: [
          { key: "A", text: "Athletes are competing in an indoor gymnasium tournament." },
          { key: "B", text: "Construction scaffolding is being erected outside a residential villa." },
          { key: "C", text: "Corporate executives are signing a bilateral trade agreement across a conference table." },
          { key: "D", text: "Flight attendants are assisting passengers with overhead baggage bins." }
        ],
        a: "C",
        exp: "🎯 **Đáp án đúng: C** (Corporate executives are signing a bilateral trade agreement across a conference table.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Các vận động viên đang thi đấu trong giải đấu tại nhà thi đấu thể thao. (Sai bối cảnh)\n- (B) Giàn giáo xây dựng đang được dựng lên bên ngoài biệt thự dân cư. (Sai hành động)\n- (C) Các giám đốc doanh nghiệp đang ký kết thỏa thuận thương mại song phương qua bàn hội nghị. (Đúng hành động và trang phục)\n- (D) Tiếp viên hàng không đang hỗ trợ hành khách với khoang hành lý phía trên. (Sai đối tượng)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy trang phục và nghi thức: Hình ảnh các nhà lãnh đạo trang trọng ngồi quanh bàn họp thực hiện nghi thức ký kết thỏa thuận kinh doanh.\n\n💡 **Từ vựng trọng tâm:**\n- `corporate executives` (/ˈkɔːpərət ɪɡˈzɛkjətɪvz/): các giám đốc/lãnh đạo doanh nghiệp\n- `bilateral trade agreement` (/baɪˈlætərəl treɪd əˈɡriːmənt/): hiệp định thương mại song phương\n- `conference table` (/ˈkɒnfərəns ˈteɪbl/): bàn họp hội nghị"
      },
      {
        id: "tlm1_q4",
        text: "Look at the photograph marked No. 4 in your test book.",
        img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        opts: [
          { key: "A", text: "Tourists are riding horses along a sandy ocean beach." },
          { key: "B", text: "Painters are restoring an antique portrait in an art gallery." },
          { key: "C", text: "Waiters are setting dining tables in an upscale banquet hall." },
          { key: "D", text: "Railway maintenance technicians are inspecting a high-speed bullet train track." }
        ],
        a: "D",
        exp: "🎯 **Đáp án đúng: D** (Railway maintenance technicians are inspecting a high-speed bullet train track.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Khách du lịch đang cưỡi ngựa dọc bãi biển đại dương đầy cát. (Sai bối cảnh)\n- (B) Các họa sĩ đang phục chế bức chân dung cổ trong phòng trưng bày nghệ thuật. (Sai đối tượng)\n- (C) Nhân viên phục vụ đang sắp xếp bàn ăn trong phòng tiệc sang trọng. (Sai hành động)\n- (D) Kỹ thuật viên bảo trì đường sắt đang kiểm tra đường ray tàu cao tốc. (Đúng khung cảnh)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy đối tượng: Khung cảnh đường sắt cao tốc hiện đại với cơ sở hạ tầng giao thông đường ray.\n\n💡 **Từ vựng trọng tâm:**\n- `railway maintenance technician` (/ˈreɪlweɪ ˈmeɪntənəns tɛkˈnɪʃn/): kỹ thuật viên bảo trì đường sắt\n- `high-speed bullet train track` (/ˈbʊlɪt treɪn træk/): tuyến đường ray tàu cao tốc"
      },
      {
        id: "tlm1_q5",
        text: "Look at the photograph marked No. 1 in your test book.",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        opts: [
          { key: "A", text: "A laboratory researcher is calibrating an electron microscope in a sterile cleanroom." },
          { key: "B", text: "Gardeners are pruning tree branches in a fruit orchard." },
          { key: "C", text: "Cashiers are counting banknotes at a retail register." },
          { key: "D", text: "Musicians are tuning acoustic violins in an orchestra." }
        ],
        a: "A",
        exp: "🎯 **Đáp án đúng: A** (A laboratory researcher is calibrating an electron microscope in a sterile cleanroom.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Một nhà nghiên cứu phòng thí nghiệm đang hiệu chuẩn kính hiển vi điện tử trong phòng sạch vô trùng. (Đúng trang phục và thao tác)\n- (B) Những người làm vườn đang cắt tỉa cành cây trong vườn cây ăn quả. (Sai bối cảnh)\n- (C) Nhân viên thu ngân đang đếm tiền giấy tại quầy bán lẻ. (Sai đối tượng)\n- (D) Các nhạc sĩ đang chỉnh dây đàn vĩ cầm trong dàn nhạc giao hưởng. (Sai bối cảnh)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy bối cảnh và nghề nghiệp: Chuyên gia công nghệ cao làm việc trong môi trường phòng sạch (cleanroom) với thiết bị quang học chính xác.\n\n💡 **Từ vựng trọng tâm:**\n- `sterile cleanroom` (/ˈstɛraɪl ˈkliːnruːm/): phòng sạch vô trùng\n- `calibrate` (/ˈkælɪbreɪt/): hiệu chuẩn, căn chỉnh chính xác\n- `electron microscope` (/ɪˈlɛktrɒn ˈmaɪkrəskəʊp/): kính hiển vi điện tử"
      },
      {
        id: "tlm1_q6",
        text: "Look at the photograph marked No. 6 in your test book.",
        img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        opts: [
          { key: "A", text: "Campers are setting up a tent in a dense forest." },
          { key: "B", text: "Delegates are scanning their biometric registration QR codes at the conference kiosk." },
          { key: "C", text: "Swimmers are diving into an Olympic-sized indoor pool." },
          { key: "D", text: "Baristas are brewing espresso in a crowded coffee shop." }
        ],
        a: "B",
        exp: "🎯 **Đáp án đúng: B** (Delegates are scanning their biometric registration QR codes at the conference kiosk.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Những người cắm trại đang dựng lều trong khu rừng rậm rạp. (Sai bối cảnh)\n- (B) Các đại biểu đang quét mã QR đăng ký sinh trắc học tại quầy thông tin hội nghị. (Đúng khung cảnh)\n- (C) Các vận động viên bơi lội đang lặn xuống bể bơi trong nhà chuẩn Olympic. (Sai bối cảnh)\n- (D) Nhân viên pha chế đang pha cà phê espresso trong quán cà phê đông đúc. (Sai đối tượng)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy hành vi: Quầy tiếp đón và đăng ký hội nghị nơi các đại biểu tương tác tại quầy làm thủ tục.\n\n💡 **Từ vựng trọng tâm:**\n- `delegates` (/ˈdɛlɪɡəts/): các đại biểu tham dự hội nghị\n- `biometric registration QR code` (/ˌbaɪəʊˈmɛtrɪk rɛdʒɪˈstreɪʃn/): mã QR đăng ký sinh trắc học\n- `conference kiosk` (/ˈkɒnfərəns ˈkiːɒsk/): quầy thông tin hội nghị"
      }
    ];

    part1Items.forEach((item, idx) => {
      qs.push({
        id: item.id,
        partNumber: 1,
        partTitle: "Listening Part 1: Photographs",
        section: "LISTENING",
        imageUrl: item.img,
        audioUrl: item.audioUrl || `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(idx % 4) + 1}.mp3`,
        passageText: `[Audio Transcript - Question ${idx + 1}]\n(A) ${item.opts[0].text}\n(B) ${item.opts[1].text}\n(C) ${item.opts[2].text}\n(D) ${item.opts[3].text}`,
        questionText: `Question ${idx + 1}: ${item.text}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
    });

    // =========================================================================
    // PART 2: QUESTION-RESPONSE (Q7 - Q31: 25 Questions)
    // =========================================================================
    const part2Items = [
      {
        q: "Where will the new cloud computing server cluster be deployed?",
        opts: [{ key: "A", text: "At our Frankfurt data center facility." }, { key: "B", text: "Yes, it is very fast." }, { key: "C", text: "About twenty terabytes." }], a: "A",
        exp: "Câu hỏi 'Where' -> Phương án A chỉ địa điểm trung tâm dữ liệu Frankfurt."
      },
      {
        q: "Who is responsible for auditing our corporate carbon offset credits?",
        opts: [{ key: "A", text: "In the accounting office on the second floor." }, { key: "B", text: "Dr. Martinez from the Sustainability Governance Committee." }, { key: "C", text: "By next Friday afternoon." }], a: "B",
        exp: "Câu hỏi 'Who' -> Phương án B chỉ rõ người phụ trách: Tiến sĩ Martinez từ ban quản trị bền vững."
      },
      {
        q: "When will the prototype quantum processor undergo cryogenic testing?",
        opts: [{ key: "A", text: "Under two Kelvin." }, { key: "B", text: "No, I haven't tested it." }, { key: "C", text: "Tomorrow morning at 8:30 AM in Lab 4." }], a: "C",
        exp: "Câu hỏi 'When' -> Phương án A chỉ thời gian: sáng mai lúc 8:30 AM."
      },
      {
        q: "Why was the cross-border software shipment delayed at customs?",
        opts: [{ key: "A", text: "The export licensing certificate was missing from the cargo manifest." }, { key: "B", text: "Yes, the delivery is ready." }, { key: "C", text: "Inside the blue container." }], a: "A",
        exp: "Câu hỏi 'Why' -> Phương án A nêu rõ nguyên nhân thiếu giấy phép xuất khẩu."
      },
      {
        q: "Would you rather schedule the client briefing for Tuesday morning or Wednesday afternoon?",
        opts: [{ key: "A", text: "Yes, I like mornings." }, { key: "B", text: "Wednesday afternoon gives us more time to finalize the financial slides." }, { key: "C", text: "In Conference Room 402." }], a: "B",
        exp: "Câu hỏi lựa chọn -> Phương án A chọn chiều thứ Tư kèm theo lý do hợp lý."
      },
      {
        q: "Has the chief financial officer signed off on the revised capital expenditure budget?",
        opts: [{ key: "A", text: "Ten million dollars." }, { key: "B", text: "In the main boardroom." }, { key: "C", text: "She approved the final allocation spreadsheet during the executive lunch." }], a: "C",
        exp: "Câu hỏi Yes/No -> Phương án A xác nhận CFO đã phê duyệt trong bữa trưa."
      },
      {
        q: "Should we outsource the software penetration testing or conduct it internally?",
        opts: [{ key: "A", text: "Hiring an external certified security firm guarantees unbiased audit results." }, { key: "B", text: "Yes, the test passed." }, { key: "C", text: "Next Tuesday." }], a: "A",
        exp: "Câu hỏi lựa chọn phương án -> Phương án A ủng hộ thuê ngoài để đảm bảo khách quan."
      },
      {
        q: "How many engineers were assigned to the autonomous drone navigation project?",
        opts: [{ key: "A", text: "The drone has a flight radius of 15 kilometers." }, { key: "B", text: "A dedicated cross-functional team of eighteen software and robotics specialists." }, { key: "C", text: "Yes, they began last month." }], a: "B",
        exp: "Câu hỏi 'How many' -> Phương án B nêu đúng số lượng: 18 chuyên gia phần mềm và robot."
      },
      {
        q: "Haven't the new workplace ergonomic guidelines been distributed to staff yet?",
        opts: [{ key: "A", text: "Ergonomic chairs are height-adjustable." }, { key: "B", text: "The office renovation took three weeks." }, { key: "C", text: "Actually, HR circulated the digital PDF handbook via email yesterday." }], a: "C",
        exp: "Câu hỏi đuôi phủ định -> Phương án A đính chính: phòng nhân sự đã gửi sổ tay qua email hôm qua."
      },
      {
        q: "What time is the international patent filing consultation scheduled for?",
        opts: [{ key: "A", text: "Our patent attorney will join the video conference at 2:15 PM." }, { key: "B", text: "The patent covers twelve European countries." }, { key: "C", text: "In the legal department archives." }], a: "A",
        exp: "Câu hỏi 'What time' -> Phương án A trả lời chính xác giờ họp: 2:15 PM."
      },
      {
        q: "Which vendor provided the lowest quotation for our warehouse conveyor upgrade?",
        opts: [{ key: "A", text: "Conveyor belts operate continuously for 16 hours daily." }, { key: "B", text: "Nordic Automation Systems submitted the most competitive bid." }, { key: "C", text: "Delivery will take six weeks." }], a: "B",
        exp: "Câu hỏi 'Which vendor' -> Phương án B nêu tên nhà thầu có mức giá cạnh tranh nhất: Nordic Automation Systems."
      },
      {
        q: "Could you help me set up the audiovisual equipment in the auditorium before 10:00 AM?",
        opts: [{ key: "A", text: "The auditorium seats 300 guests." }, { key: "B", text: "The presentation is on supply chain resilience." }, { key: "C", text: "I'll head over with the wireless microphone kit right away." }], a: "C",
        exp: "Lời nhờ giúp đỡ -> Phương án A đồng ý và mang thiết bị sang ngay lập tức."
      },
      {
        q: "Why did the manufacturing plant replace the hydraulic press valves?",
        opts: [{ key: "A", text: "Routine ultrasonic inspection detected micro-cracks in the intake seals." }, { key: "B", text: "The press exerts 500 tonnes of force." }, { key: "C", text: "Three technicians were on duty." }], a: "A",
        exp: "Câu hỏi 'Why' -> Phương án B giải thích nguyên nhân: kiểm tra siêu âm phát hiện vết nứt vi mô."
      },
      {
        q: "Do you know if the Tokyo branch manager confirmed his attendance for next week's summit?",
        opts: [{ key: "A", text: "Tokyo is in the Japan Standard Time zone." }, { key: "B", text: "Yes, he registered for all plenary sessions on the event portal yesterday." }, { key: "C", text: "The summit program includes four panel discussions." }], a: "B",
        exp: "Câu hỏi xác nhận -> Phương án B xác nhận ông ấy đã đăng ký tham dự đầy đủ hôm qua."
      },
      {
        q: "I'm worried that our raw material supplier won't be able to meet the accelerated delivery schedule.",
        opts: [{ key: "A", text: "Raw materials are stored in dry warehouse bins." }, { key: "B", text: "The contract was signed in January." }, { key: "C", text: "Their account executive assured us that their second factory has ramped up production." }], a: "C",
        exp: "Phản hồi bày tỏ lo ngại -> Phương án A trấn an: đối tác đã tăng công suất tại nhà máy thứ 2."
      },
      {
        q: "Where should I file the completed non-disclosure agreements from our prospective investors?",
        opts: [{ key: "A", text: "Upload them to the encrypted legal compliance repository on the corporate intranet." }, { key: "B", text: "The investors represent three venture capital funds." }, { key: "C", text: "Agreements are valid for five years." }], a: "A",
        exp: "Câu hỏi 'Where' -> Phương án A hướng dẫn tải lên kho lưu trữ mã hóa của phòng pháp chế."
      },
      {
        q: "When will the quarterly financial report be published on the investor relations portal?",
        opts: [{ key: "A", text: "The report is 45 pages long." }, { key: "B", text: "Our media relations team will post it at 4:00 PM today following market close." }, { key: "C", text: "Investor relations is managed by Ms. Zhao." }], a: "B",
        exp: "Câu hỏi 'When' -> Phương án B trả lời thời gian cụ thể: 4:00 PM chiều nay sau khi thị trường đóng cửa."
      },
      {
        q: "Who authorized the emergency procurement of backup power generator units?",
        opts: [{ key: "A", text: "The generators run on diesel and biofuel blends." }, { key: "B", text: "In the utility basement of Building 3." }, { key: "C", text: "Vice President Kowalski issued the authorization during Monday's crisis meeting." }], a: "C",
        exp: "Câu hỏi 'Who' -> Phương án A chỉ rõ người phê duyệt: Phó Chủ tịch Kowalski trong cuộc họp khẩn cấp."
      },
      {
        q: "Can we review the customer onboarding feedback before submitting the product feature roadmap?",
        opts: [{ key: "A", text: "Sure, let's look over the analytics dashboard together in Room 2B." }, { key: "B", text: "The roadmap covers the next four fiscal quarters." }, { key: "C", text: "Customer satisfaction scores increased by 8 percent." }], a: "A",
        exp: "Lời đề xuất phối hợp -> Phương án A đồng ý và mời xem dashboard phân tích tại phòng 2B."
      },
      {
        q: "Why hasn't the environmental impact assessment for the offshore wind farm been released?",
        opts: [{ key: "A", text: "The wind turbines have a generating capacity of 15 megawatts each." }, { key: "B", text: "The maritime regulatory agency requested supplemental marine biodiversity surveys." }, { key: "C", text: "Construction is slated to begin in 2028." }], a: "B",
        exp: "Câu hỏi 'Why' -> Phương án B giải thích nguyên nhân: cơ quan quản lý hàng hải yêu cầu khảo sát bổ sung đa dạng sinh học."
      },
      {
        q: "Would you prefer to fly directly to Singapore or take a connecting flight with a shorter layover?",
        opts: [{ key: "A", text: "Singapore Changi Airport has four passenger terminals." }, { key: "B", text: "Yes, airline tickets were booked through our corporate travel portal." }, { key: "C", text: "The direct flight is preferable so we arrive well-rested for the conference keynote." }], a: "C",
        exp: "Câu hỏi lựa chọn chuyến bay -> Phương án A chọn bay thẳng (direct flight) để đảm bảo sức khỏe."
      },
      {
        q: "How often are the cleanroom air filtration systems subjected to particulate particle counting?",
        opts: [{ key: "A", text: "Continuous automated sensors log particulate data every fifteen minutes around the clock." }, { key: "B", text: "Cleanrooms are rated under ISO 14644-1 international standards." }, { key: "C", text: "Four certified HVAC technicians are on duty." }], a: "A",
        exp: "Câu hỏi 'How often' -> Phương án B nêu tần suất: cảm biến tự động ghi nhận dữ liệu 15 phút một lần liên tục."
      },
      {
        q: "Should we renew our commercial lease at the current tech park or relocate to the downtown innovation hub?",
        opts: [{ key: "A", text: "Our current lease expires in December 2027." }, { key: "B", text: "The downtown facility offers significantly better public transit connectivity for our workforce." }, { key: "C", text: "Office rent is paid on the first of each month." }], a: "B",
        exp: "Câu hỏi lựa chọn địa điểm -> Phương án A đưa ra đề xuất chuyển về trung tâm vì giao thông công cộng thuận tiện hơn."
      },
      {
        q: "The supply chain director has already reviewed the freight forwarding quotations, hasn't she?",
        opts: [{ key: "A", text: "Ocean freight transit times average twenty-two days." }, { key: "B", text: "Shipping containers must be sealed at the terminal." }, { key: "C", text: "Yes, she highlighted her preferred ocean carrier options on the summary sheet." }], a: "C",
        exp: "Câu hỏi đuôi xác nhận -> Phương án A khẳng định bà ấy đã đánh dấu các phương án vận tải biển ưu tiên."
      },
      {
        q: "What caused the temporary network outage on the third-floor trading desk this morning?",
        opts: [{ key: "A", text: "A damaged fiber-optic transponder was replaced by our network engineering team at 9:15 AM." }, { key: "B", text: "Forty equity traders were working on the floor." }, { key: "C", text: "Stock market trading commenced at 9:30 AM." }], a: "A",
        exp: "Câu hỏi 'What caused' -> Phương án A giải thích nguyên nhân: bộ phát quang cáp quang bị hỏng và đã được thay thế lúc 9:15 AM."
      }
    ];

    part2Items.forEach((item, idx) => {
      const qNum = idx + 7;
      qs.push({
        id: `tlm1_q${qNum}`,
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
        explanation: item.exp
      });
    });

    // =========================================================================
    // PART 3: SHORT CONVERSATIONS (Q32 - Q70: 39 Questions, 13 Dialogues)
    // =========================================================================
    const part3Dialogues = [
      {
        title: "Dialogue 1: Tokyo 3nm Microchip Supply Chain Agreement",
        script: "Man: Kenji, did the procurement committee finalize the long-term wafer supply contract with Tokyo Microelectronics?\nWoman: Yes, Mr. Davis. We secured 50,000 extreme ultraviolet wafer substrates per quarter with guaranteed delivery within five business days.\nMan: That provides our manufacturing lines with absolute supply security. When does the first shipment arrive at our Yokohama fab?\nWoman: The initial batch is scheduled to clear customs and arrive at our cleanroom on Thursday morning.",
        questions: [
          { q: "What business contract was finalized?", opts: [{ key: "A", text: "Office cleaning" }, { key: "B", text: "Truck leasing" }, { key: "C", text: "Long-term 3nm wafer supply contract" }, { key: "D", text: "Catering service" }], a: "C", exp: "Hợp đồng: 'long-term wafer supply contract with Tokyo Microelectronics'." },
          { q: "How many wafer substrates are secured per quarter?", opts: [{ key: "A", text: "1,000" }, { key: "B", text: "500" }, { key: "C", text: "10" }, { key: "D", text: "50,000 extreme ultraviolet wafer substrates" }], a: "D", exp: "Số lượng cung ứng: 'secured 50,000 extreme ultraviolet wafer substrates per quarter'." },
          { q: "When will the initial batch arrive at the Yokohama cleanroom?", opts: [{ key: "A", text: "On Thursday morning" }, { key: "B", text: "Next year" }, { key: "C", text: "On Friday night" }, { key: "D", text: "In two weeks" }], a: "A", exp: "Thời gian giao hàng: 'arrive at our cleanroom on Thursday morning'." }
        ]
      },
      {
        title: "Dialogue 2: Nordic Cold Chain Logistics & Temperature Monitoring",
        script: "Woman: Lars, our satellite telemetry shows temperature fluctuations in refrigerated container 402 en route to Stockholm.\nMan: Let me check the telemetry logs. It appears the backup compressor activated when the ambient temperature rose, keeping the core at minus twenty degrees Celsius.\nWoman: That is a relief. Are the biologics inside guaranteed to maintain pharmaceutical potency?\nMan: Absolutely. The redundant cooling system prevented any thermal excursion, and the delivery to Karolinska Hospital remains on schedule for 4:00 PM.",
        questions: [
          { q: "What issue did the woman identify through satellite telemetry?", opts: [{ key: "A", text: "A flat tire on the delivery vehicle" }, { key: "B", text: "Temperature fluctuations in a refrigerated container" }, { key: "C", text: "Lost cargo paperwork at the toll booth" }, { key: "D", text: "A delayed ferry crossing" }], a: "B", exp: "Vấn đề: 'satellite telemetry shows temperature fluctuations in refrigerated container 402'." },
          { q: "How did the system prevent damage to the pharmaceutical cargo?", opts: [{ key: "A", text: "The driver stopped at an ice factory" }, { key: "B", text: "The cargo was transferred to an airplane" }, { key: "C", text: "A backup secondary compressor activated automatically" }, { key: "D", text: "The destination was changed to a closer city" }], a: "C", exp: "Cơ chế bảo vệ: 'backup compressor activated... keeping the core at minus twenty degrees Celsius'." },
          { q: "Where is the shipment scheduled to be delivered at 4:00 PM?", opts: [{ key: "A", text: "To a central retail pharmacy" }, { key: "B", text: "To a regional distribution warehouse" }, { key: "C", text: "To a medical university laboratory in Oslo" }, { key: "D", text: "To Karolinska Hospital in Stockholm" }], a: "D", exp: "Điểm đến: 'delivery to Karolinska Hospital remains on schedule for 4:00 PM'." }
        ]
      },
      {
        title: "Dialogue 3: Heathrow Biometric Security & Passenger Flow",
        script: "Airport Director: Captain Reynolds, how did the initial trial of our automated biometric facial recognition gates perform at Terminal 5?\nSecurity Lead: The results were outstanding. We processed over 14,000 international passengers during peak morning departures with an average transit time of under twenty seconds per passenger.\nAirport Director: Did the system encounter any verification false-rejection anomalies during high-concurrency periods?\nSecurity Lead: Less than 0.04%, which well exceeds international civil aviation security benchmarks. We recommend expanding the system across all departure gates by Q3.",
        questions: [
          { q: "What technology was evaluated during the trial at Terminal 5?", opts: [{ key: "A", text: "Automated biometric facial recognition gates" }, { key: "B", text: "Automated baggage sorting conveyers" }, { key: "C", text: "Electric passenger shuttle buses" }, { key: "D", text: "Solar canopy power arrays" }], a: "A", exp: "Công nghệ thử nghiệm: 'automated biometric facial recognition gates at Terminal 5'." },
          { q: "What was the average passenger processing transit time?", opts: [{ key: "A", text: "Approximately two minutes" }, { key: "B", text: "Under twenty seconds per passenger" }, { key: "C", text: "Five minutes" }, { key: "D", text: "Ten seconds per group" }], a: "B", exp: "Thời gian xử lý bình quân: 'average transit time of under twenty seconds per passenger'." },
          { q: "What recommendation did the Security Lead make for Q3?", opts: [{ key: "A", text: "Cancel all facial recognition contracts" }, { key: "B", text: "Increase airport security staffing by 50 percent" }, { key: "C", text: "Expand the biometric system across all departure gates" }, { key: "D", text: "Switch to manual passport stamping only" }], a: "C", exp: "Khuyến nghị: 'recommend expanding the system across all departure gates by Q3'." }
        ]
      },
      {
        title: "Dialogue 4: Zurich Asset Management & ESG Investment Portfolio",
        script: "Portfolio Manager: Beatrice, have our institutional clients approved the reallocation toward sustainable renewable infrastructure bonds?\nAnalyst: Yes, three major pension funds voted to allocate 250 million Swiss francs into our clean hydrogen and offshore wind bond portfolio.\nPortfolio Manager: What is the projected annual yield compared to traditional sovereign fixed-income instruments?\nAnalyst: The portfolio yields 4.65% with an AAA credit rating, delivering an eighty-basis-point premium over Swiss government debt.",
        questions: [
          { q: "What investment asset class are the speakers discussing?", opts: [{ key: "A", text: "Commercial real estate mortgages" }, { key: "B", text: "Cryptocurrency hedge funds" }, { key: "C", text: "Precious metals mining equities" }, { key: "D", text: "Sustainable renewable infrastructure bonds" }], a: "D", exp: "Tài sản thảo luận: 'sustainable renewable infrastructure bonds'." },
          { q: "How much capital did the pension funds commit to the portfolio?", opts: [{ key: "A", text: "250 million Swiss francs" }, { key: "B", text: "50 million Swiss francs" }, { key: "C", text: "500 million Swiss francs" }, { key: "D", text: "1 billion Swiss francs" }], a: "A", exp: "Số vốn cam kết: 'allocate 250 million Swiss francs into our clean hydrogen and offshore wind bond portfolio'." },
          { q: "What annual yield does the portfolio deliver?", opts: [{ key: "A", text: "2.15%" }, { key: "B", text: "4.65% with an AAA rating" }, { key: "C", text: "3.50%" }, { key: "D", text: "6.80%" }], a: "B", exp: "Lợi suất hàng năm: 'portfolio yields 4.65% with an AAA credit rating'." }
        ]
      },
      {
        title: "Dialogue 5: Silicon Valley AI Semiconductor Architecture",
        script: "Lead Architect: Dr. Chen, have we finalized the memory bus bandwidth specifications for our next-generation neural processing unit?\nDr. Chen: We integrated High Bandwidth Memory 3E (HBM3E) delivering 1.2 terabytes per second of bidirectional throughput.\nLead Architect: That will effectively eliminate the memory bottleneck during large language model inference training.\nDr. Chen: Indeed. Our tape-out submission to the foundry is scheduled for November 12th, with engineering test silicon expected by early February.",
        questions: [
          { q: "What component specification was finalized for the neural processing unit?", opts: [{ key: "A", text: "Plastic packaging material" }, { key: "B", text: "External cooling fan dimensions" }, { key: "C", text: "High Bandwidth Memory 3E (HBM3E) bus bandwidth" }, { key: "D", text: "Power cord length" }], a: "C", exp: "Thông số kỹ thuật: 'integrated High Bandwidth Memory 3E (HBM3E) delivering 1.2 terabytes per second'." },
          { q: "What primary performance benefit does the memory architecture provide?", opts: [{ key: "A", text: "Reduces manufacturing cost to zero" }, { key: "B", text: "Allows the chip to operate without electricity" }, { key: "C", text: "Shrinks computer monitors" }, { key: "D", text: "Eliminates memory bottlenecks during AI language model training" }], a: "D", exp: "Lợi ích hiệu năng: 'eliminate the memory bottleneck during large language model inference training'." },
          { q: "When is the foundry tape-out submission scheduled?", opts: [{ key: "A", text: "On November 12th" }, { key: "B", text: "Immediately this afternoon" }, { key: "C", text: "In late December" }, { key: "D", text: "Next February" }], a: "A", exp: "Lịch trình gửi foundry: 'tape-out submission to the foundry is scheduled for November 12th'." }
        ]
      },
      {
        title: "Dialogue 6: Corporate Facilities Energy Microgrid & Carbon Neutrality",
        script: "Facilities Director: Amanda, what was our total electrical utility reduction following the installation of the rooftop solar canopies?\nAmanda: The solar array generated 640 megawatt-hours last month, reducing our grid electricity dependence by sixty-eight percent.\nFacilities Director: That represents an impressive cost savings. How is the battery energy storage system performing during peak evening tariff hours?\nAmanda: The lithium-iron-phosphate battery discharged flawlessly between 5:00 PM and 9:00 PM, saving the company an additional $32,000 in peak demand surcharges.",
        questions: [
          { q: "By what percentage did the solar installation reduce grid electricity dependence?", opts: [{ key: "A", text: "35 percent" }, { key: "B", text: "68 percent" }, { key: "C", text: "50 percent" }, { key: "D", text: "90 percent" }], a: "B", exp: "Mức giảm phụ thuộc lưới: 'reducing our grid electricity dependence by sixty-eight percent'." },
          { q: "During what hours does the battery storage system discharge energy?", opts: [{ key: "A", text: "From midnight to 4:00 AM" }, { key: "B", text: "All day on weekends only" }, { key: "C", text: "Between 5:00 PM and 9:00 PM during peak tariff hours" }, { key: "D", text: "During morning staff meetings" }], a: "C", exp: "Thời gian xả pin: 'discharged flawlessly between 5:00 PM and 9:00 PM'." },
          { q: "How much money did the battery peak shaving save the company last month?", opts: [{ key: "A", text: "$5,000" }, { key: "B", text: "$12,000" }, { key: "C", text: "$85,000" }, { key: "D", text: "$32,000 in peak demand surcharges" }], a: "D", exp: "Số tiền tiết kiệm: 'saving the company an additional $32,000 in peak demand surcharges'." }
        ]
      },
      {
        title: "Dialogue 7: Commercial Aviation Maintenance & Fleet Electrification",
        script: "Chief Engineer: Captain Novak, has maintenance completed the pre-flight avionics diagnostic on the hybrid-electric regional turboprop?\nCaptain Novak: Yes, all electric propulsion motors and battery thermal management loops passed diagnostic checks with zero error codes.\nChief Engineer: Excellent. Flight Operations has cleared aircraft Tail-88 for its inaugural commercial passenger service from Munich to Vienna.\nCaptain Novak: Wonderful. Passenger boarding commences at Gate B14 in forty-five minutes.",
        questions: [
          { q: "What aircraft type was inspected by maintenance?", opts: [{ key: "A", text: "A hybrid-electric regional turboprop" }, { key: "B", text: "A four-engine supersonic jet" }, { key: "C", text: "A medical rescue helicopter" }, { key: "D", text: "A single-seat private glider" }], a: "A", exp: "Loại máy bay: 'hybrid-electric regional turboprop'." },
          { q: "What route will the inaugural passenger flight operate?", opts: [{ key: "A", text: "London to Paris" }, { key: "B", text: "Munich to Vienna" }, { key: "C", text: "Frankfurt to Zurich" }, { key: "D", text: "Berlin to Warsaw" }], a: "B", exp: "Tuyến bay khai trương: 'inaugural commercial passenger service from Munich to Vienna'." },
          { q: "When does passenger boarding begin at Gate B14?", opts: [{ key: "A", text: "In fifteen minutes" }, { key: "B", text: "At 6:00 PM" }, { key: "C", text: "In forty-five minutes" }, { key: "D", text: "Tomorrow morning" }], a: "C", exp: "Thời gian lên máy bay: 'Passenger boarding commences at Gate B14 in forty-five minutes'." }
        ]
      },
      {
        title: "Dialogue 8: Pharmaceutical Clinical Trial Data Telemetry",
        script: "Lead Biostatistician: Dr. O'Connor, our interim analysis of the phase II oncology clinical trial is ready for your review.\nDr. O'Connor: What are the primary endpoint progression-free survival results among the cohort receiving the combination therapy?\nLead Biostatistician: The median progression-free survival reached 18.4 months compared to 9.2 months in the standard-of-care control arm, achieving statistical significance with a p-value below 0.001.\nDr. O'Connor: That is a remarkable therapeutic improvement. Let us schedule a briefing with the FDA regulatory liaison office next Tuesday.",
        questions: [
          { q: "What clinical trial results are being evaluated?", opts: [{ key: "A", text: "Hospital bed manufacturing costs" }, { key: "B", text: "Pharmacy employee attendance logs" }, { key: "C", text: "Laboratory cleaning chemical safety" }, { key: "D", text: "Phase II oncology trial progression-free survival results" }], a: "D", exp: "Kết quả lâm sàng: 'phase II oncology clinical trial... median progression-free survival reached 18.4 months'." },
          { q: "How did the combination therapy compare to standard care?", opts: [{ key: "A", text: "It doubled progression-free survival from 9.2 to 18.4 months" }, { key: "B", text: "It showed no measurable difference" }, { key: "C", text: "It caused severe trial termination" }, { key: "D", text: "It required three times higher dosage" }], a: "A", exp: "Hiệu quả điều trị: '18.4 months compared to 9.2 months in the standard-of-care control arm'." },
          { q: "What meeting is scheduled for next Tuesday?", opts: [{ key: "A", text: "A press conference in London" }, { key: "B", text: "A briefing with the FDA regulatory liaison office" }, { key: "C", text: "A shareholder dividend vote" }, { key: "D", text: "A hospital foundation gala" }], a: "B", exp: "Kế hoạch cuộc họp: 'schedule a briefing with the FDA regulatory liaison office next Tuesday'." }
        ]
      },
      {
        title: "Dialogue 9: Precision Agriculture & Autonomous Drone Fleet",
        script: "Agronomist: Mateo, how did our autonomous multispectral drone survey of the vineyard perform yesterday?\nMateo: The normalized difference vegetation index (NDVI) mapping detected early fungal moisture stress across Sector 4 before any visible canopy symptoms appeared.\nAgronomist: That allows us to deploy targeted biological fungicides exclusively to the affected three hectares rather than spraying the entire eighty-hectare estate.\nMateo: Exactly. We estimate an 85% reduction in chemical fungicide usage and significant cost savings.",
        questions: [
          { q: "What technology was used to survey the vineyard?", opts: [{ key: "A", text: "Satellite radio antennas" }, { key: "B", text: "Handheld magnifiers" }, { key: "C", text: "Autonomous multispectral drones" }, { key: "D", text: "Tractor-mounted cameras" }], a: "C", exp: "Công nghệ khảo sát: 'autonomous multispectral drone survey of the vineyard'." },
          { q: "What early condition was identified in Sector 4?", opts: [{ key: "A", text: "Insect infestation on tree trunks" }, { key: "B", text: "Broken irrigation pipes" }, { key: "C", text: "Soil nutrient depletion" }, { key: "D", text: "Early fungal moisture stress" }], a: "D", exp: "Hiện tượng phát hiện: 'detected early fungal moisture stress across Sector 4'." },
          { q: "What benefit will the targeted fungicide deployment achieve?", opts: [{ key: "A", text: "An 85% reduction in chemical fungicide usage" }, { key: "B", text: "Immediate grape harvesting" }, { key: "C", text: "Elimination of all vineyard workers" }, { key: "D", text: "Planting new grape varieties" }], a: "A", exp: "Lợi ích: 'estimate an 85% reduction in chemical fungicide usage and significant cost savings'." }
        ]
      },
      {
        title: "Dialogue 10: FinTech Cross-Border Payment Security & Fraud Prevention",
        script: "Security Officer: Ms. Varma, our machine learning fraud detection system flagged a suspicious wire transfer pattern from an overseas account.\nMs. Varma: What behavioral anomaly triggered the transaction hold?\nSecurity Officer: The account attempted six consecutive rapid-fire transfers of $49,999 to offshore entities within three minutes, circumventing standard $50,000 automated reporting thresholds.\nMs. Varma: Excellent catch. Freeze the transactions immediately and submit a Suspicious Activity Report to the financial regulatory authority.",
        questions: [
          { q: "What system detected the suspicious transaction pattern?", opts: [{ key: "A", text: "A paper bank ledger" }, { key: "B", text: "A machine learning fraud detection system" }, { key: "C", text: "An anonymous telephone tipster" }, { key: "D", text: "A routine annual audit letter" }], a: "B", exp: "Hệ thống phát hiện: 'machine learning fraud detection system flagged a suspicious wire transfer pattern'." },
          { q: "Why did the transactions trigger an automated hold?", opts: [{ key: "A", text: "The bank branch was closed for a holiday" }, { key: "B", text: "The sender used an expired credit card" }, { key: "C", text: "Six rapid transfers of $49,999 were attempted to circumvent reporting thresholds" }, { key: "D", text: "The receiver changed their physical address" }], a: "C", exp: "Lý do cảnh báo: 'attempted six consecutive rapid-fire transfers of $49,999... circumventing standard $50,000 automated reporting thresholds'." },
          { q: "What regulatory action did Ms. Varma instruct?", opts: [{ key: "A", text: "Approve the transfers immediately with a bonus fee" }, { key: "B", text: "Close the bank branch permanently" }, { key: "C", text: "Send a warning letter by registered postal mail" }, { key: "D", text: "Freeze the transactions and submit a Suspicious Activity Report" }], a: "D", exp: "Hành động pháp lý: 'Freeze the transactions immediately and submit a Suspicious Activity Report'." }
        ]
      },
      {
        title: "Dialogue 11: Global Maritime Supply Chain Port Automation",
        script: "Port Operations Director: Sean, how did the newly automated container stacking yard perform during the unloading of the 20,000 TEU vessel?\nSean: The automated rail-mounted gantry cranes maintained an average of 34 container moves per hour per crane, exceeding our target by twelve percent.\nPort Operations Director: Did the automated guided vehicles encounter any traffic congestion at the quay transfer zone?\nSean: None at all. The dynamic fleet dispatch software balanced container flow across all eight berths seamlessly.",
        questions: [
          { q: "What container handling performance rate was achieved by the automated cranes?", opts: [{ key: "A", text: "34 container moves per hour per crane (exceeding target by 12%)" }, { key: "B", text: "15 moves per hour" }, { key: "C", text: "50 moves per day" }, { key: "D", text: "100 moves per shift" }], a: "A", exp: "Tốc độ bốc dỡ: 'average of 34 container moves per hour per crane, exceeding our target by twelve percent'." },
          { q: "How was congestion prevented at the quay transfer zone?", opts: [{ key: "A", text: "By hiring manual forklift operators" }, { key: "B", text: "Through dynamic fleet dispatch software balancing flow" }, { key: "C", text: "By closing four container berths" }, { key: "D", text: "By delaying incoming vessels in the harbor" }], a: "B", exp: "Giải pháp tránh ùn tắc: 'dynamic fleet dispatch software balanced container flow across all eight berths seamlessly'." },
          { q: "How large was the container vessel mentioned in the dialogue?", opts: [{ key: "A", text: "5,000 TEU" }, { key: "B", text: "10,000 TEU" }, { key: "C", text: "20,000 TEU" }, { key: "D", text: "50,000 TEU" }], a: "C", exp: "Kích thước tàu: 'unloading of the 20,000 TEU vessel'." }
        ]
      },
      {
        title: "Dialogue 12: Advanced Manufacturing Laser Welding Quality Assurance",
        script: "Plant Quality Lead: Dr. Hoffman, how are the laser weld seam inspections progressing for the electric vehicle battery enclosures?\nDr. Hoffman: Our high-speed optical coherence tomography system inspected all 1,200 weld seams on the chassis line with sub-millimeter precision.\nPlant Quality Lead: Did we identify any porosity or lack-of-fusion defects in the aluminum alloy joints?\nDr. Hoffman: Only two localized micro-porosity spots were flagged, and the automated laser re-melt station repaired them in-line in under fifteen seconds.",
        questions: [
          { q: "What component is being inspected by the laser system?", opts: [{ key: "A", text: "Commercial aircraft passenger seats" }, { key: "B", text: "Office desktop computer monitors" }, { key: "C", text: "Warehouse concrete floor slabs" }, { key: "D", text: "Electric vehicle battery enclosure weld seams" }], a: "D", exp: "Chi tiết kiểm tra: 'laser weld seam inspections... for the electric vehicle battery enclosures'." },
          { q: "How many weld seams were inspected on the chassis line?", opts: [{ key: "A", text: "1,200 weld seams" }, { key: "B", text: "120 seams" }, { key: "C", text: "500 seams" }, { key: "D", text: "5,000 seams" }], a: "A", exp: "Số lượng mối hàn: 'inspected all 1,200 weld seams on the chassis line'." },
          { q: "How were the minor micro-porosity defects repaired?", opts: [{ key: "A", text: "The entire battery pack was scrapped" }, { key: "B", text: "An automated laser re-melt station repaired them in-line in 15 seconds" }, { key: "C", text: "Technicians applied epoxy glue manually" }, { key: "D", text: "The chassis was sent to an off-site welding vendor" }], a: "B", exp: "Phương pháp sửa lỗi: 'automated laser re-melt station repaired them in-line in under fifteen seconds'." }
        ]
      },
      {
        title: "Dialogue 13: Corporate Talent Development & Executive Leadership",
        script: "HR Director: Mr. Castillo, we have finalized the curriculum for the Global Executive Leadership Masterclass in Geneva.\nMr. Castillo: Excellent. Does the program incorporate modules on artificial intelligence ethics, geopolitical risk management, and carbon accounting?\nHR Director: Yes, we engaged professors from IMD Business School and the London School of Economics to facilitate each of those core pillars.\nMr. Castillo: Outstanding. Let us open enrollment for our top fifty senior directors on Monday morning.",
        questions: [
          { q: "Where will the Global Executive Leadership Masterclass take place?", opts: [{ key: "A", text: "In New York" }, { key: "B", text: "In Singapore" }, { key: "C", text: "In Geneva" }, { key: "D", text: "In Tokyo" }], a: "C", exp: "Địa điểm: 'Global Executive Leadership Masterclass in Geneva'." },
          { q: "Which institutions provided faculty for the core curriculum pillars?", opts: [{ key: "A", text: "Local community colleges" }, { key: "B", text: "Online commercial tutorial websites" }, { key: "C", text: "A private vocational trade academy" }, { key: "D", text: "IMD Business School and London School of Economics" }], a: "D", exp: "Đơn vị giảng dạy: 'engaged professors from IMD Business School and the London School of Economics'." },
          { q: "When will enrollment open for senior directors?", opts: [{ key: "A", text: "On Monday morning" }, { key: "B", text: "Next year in January" }, { key: "C", text: "At the end of this month" }, { key: "D", text: "Immediately after the shareholder vote" }], a: "A", exp: "Thời gian mở đăng ký: 'open enrollment for our top fifty senior directors on Monday morning'." }
        ]
      }
    ];

    let p3Counter = 32;
    part3Dialogues.forEach((dialogue) => {
      dialogue.questions.forEach((qItem) => {
        qs.push({
          id: `tlm1_q${p3Counter}`,
          partNumber: 3,
          partTitle: "Listening Part 3: Short Conversations",
          section: "LISTENING",
          passageText: `[Audio Transcript - ${dialogue.title}]\n${dialogue.script}`,
          questionText: `Question ${p3Counter}: ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a as any,
          explanation: qItem.exp
        });
        p3Counter++;
      });
    });

    // =========================================================================
    // PART 4: SHORT TALKS (Q71 - Q100: 30 Questions, 10 Talks)
    // =========================================================================
    const part4Talks = [
      {
        title: "Talk 1: Keynote at Frankfurt Digital Transformation Summit",
        script: "Good afternoon, esteemed business leaders and technology delegates. Welcome to the Frankfurt Digital Enterprise Summit. Today, we are proud to announce our next-generation automated robotic process automation (RPA) framework. By integrating generative AI copilot models into existing ERP architectures, our clients have achieved a 74 percent reduction in invoice reconciliation turnaround times while maintaining zero clerical errors. Please visit our interactive demonstration booth in Hall B at 3:00 PM for a hands-on live trial.",
        questions: [
          { q: "Where is the business summit taking place?", opts: [{ key: "A", text: "In London" }, { key: "B", text: "In Frankfurt" }, { key: "C", text: "In New York" }, { key: "D", text: "In Tokyo" }], a: "B", exp: "Địa điểm: 'Frankfurt Digital Enterprise Summit'." },
          { q: "What efficiency gain was achieved by the RPA framework?", opts: [{ key: "A", text: "10 percent" }, { key: "B", text: "No change" }, { key: "C", text: "A 74 percent reduction in invoice reconciliation times" }, { key: "D", text: "Increased errors" }], a: "C", exp: "Hiệu quả: '74 percent reduction in invoice reconciliation turnaround times'." },
          { q: "What is scheduled for 3:00 PM in Hall B?", opts: [{ key: "A", text: "A gala dinner" }, { key: "B", text: "A concert" }, { key: "C", text: "Book sale" }, { key: "D", text: "An interactive hands-on live trial demonstration" }], a: "D", exp: "Hoạt động lúc 3:00 PM: 'interactive demonstration booth in Hall B at 3:00 PM for a hands-on live trial'." }
        ]
      },
      {
        title: "Talk 2: Plant Operations Advisory on Automated Pallet Wrapping",
        script: "Attention all logistics shift personnel and automated warehouse technicians. Beginning tonight at 11:00 PM, maintenance contractors will service the main robotic pallet stretch-wrapping lines in Bay 4. During this four-hour maintenance window, all outgoing palletized freight should be routed through the auxiliary semi-automated wrapping turntable in Bay 2. Full high-speed automated operations in Bay 4 will resume promptly at 3:30 AM before the morning line-haul freight dispatch.",
        questions: [
          { q: "What equipment will undergo scheduled maintenance tonight?", opts: [{ key: "A", text: "The main robotic pallet stretch-wrapping lines in Bay 4" }, { key: "B", text: "The cafeteria espresso machines" }, { key: "C", text: "The executive parking gate" }, { key: "D", text: "The office lighting timers" }], a: "A", exp: "Thiết bị bảo trì: 'service the main robotic pallet stretch-wrapping lines in Bay 4'." },
          { q: "Where should outgoing palletized freight be routed during maintenance?", opts: [{ key: "A", text: "Outside in the truck yard" }, { key: "B", text: "Through the auxiliary semi-automated wrapping turntable in Bay 2" }, { key: "C", text: "Into the customer service lounge" }, { key: "D", text: "To a neighboring warehouse" }], a: "B", exp: "Hướng tuyến vận chuyển: 'routed through the auxiliary semi-automated wrapping turntable in Bay 2'." },
          { q: "When will full automated operations resume in Bay 4?", opts: [{ key: "A", text: "Tomorrow noon" }, { key: "B", text: "Next Friday evening" }, { key: "C", text: "Promptly at 3:30 AM before morning dispatch" }, { key: "D", text: "In two days" }], a: "C", exp: "Thời gian phục hồi: 'resume promptly at 3:30 AM before the morning line-haul freight dispatch'." }
        ]
      },
      {
        title: "Talk 3: Quarterly Corporate Earnings Conference Call",
        script: "Good morning, analysts and institutional shareholders. I am David Thorne, Chief Executive Officer of Apex Semiconductor Technologies. In the third quarter of fiscal year 2026, our consolidated gross revenue expanded thirty-two percent year-over-year to 4.2 billion euros. Operating profit margins reached 38.5%, driven by accelerating commercial orders for our 2-nanometer extreme ultraviolet logic chips and automotive power semiconductors. We project sustained revenue expansion as our new cleanroom fabrication facility in Dresden commences high-volume commercial production in Q1 2027.",
        questions: [
          { q: "What was Apex Semiconductor Technologies' Q3 consolidated revenue?", opts: [{ key: "A", text: "1.5 billion euros" }, { key: "B", text: "2.8 billion euros" }, { key: "C", text: "6.0 billion euros" }, { key: "D", text: "4.2 billion euros" }], a: "D", exp: "Doanh thu Q3: 'consolidated gross revenue expanded thirty-two percent... to 4.2 billion euros'." },
          { q: "What operating profit margin was achieved in the quarter?", opts: [{ key: "A", text: "38.5%" }, { key: "B", text: "15.0%" }, { key: "C", text: "25.2%" }, { key: "D", text: "50.0%" }], a: "A", exp: "Biên lợi nhuận hoạt động: 'Operating profit margins reached 38.5%'." },
          { q: "When will the new fabrication facility in Dresden commence high-volume production?", opts: [{ key: "A", text: "Next month" }, { key: "B", text: "In Q1 2027" }, { key: "C", text: "In 2030" }, { key: "D", text: "Late 2029" }], a: "B", exp: "Thời điểm sản xuất quy mô lớn tại Dresden: 'commences high-volume commercial production in Q1 2027'." }
        ]
      },
      {
        title: "Talk 4: Airport Terminal Upgrade Passenger Announcement",
        script: "Attention passengers traveling on international departures at Singapore Changi Airport. Terminal 2 has officially completed its multi-million-dollar digital modernization program. All passengers traveling on Star Alliance carriers may now utilize our automated biometric self-service bag drops and contactless immigration corridors in Departure Hall 3. If you require assistance with oversized luggage or specialized customs declarations, our bilingual customer service ambassadors are available at Information Counter C.",
        questions: [
          { q: "What facility upgrade was completed at Singapore Changi Airport?", opts: [{ key: "A", text: "Construction of a new runway" }, { key: "B", text: "A parking garage expansion" }, { key: "C", text: "Terminal 2 digital modernization program" }, { key: "D", text: "A hotel renovation" }], a: "C", exp: "Công trình nâng cấp: 'Terminal 2 has officially completed its multi-million-dollar digital modernization program'." },
          { q: "What automated services are available in Departure Hall 3?", opts: [{ key: "A", text: "Free duty-free shopping vouchers" }, { key: "B", text: "Helicopter sightseeing tours" }, { key: "C", text: "Manual paper ticket counters only" }, { key: "D", text: "Biometric self-service bag drops and contactless immigration" }], a: "D", exp: "Dịch vụ tự động hóa: 'automated biometric self-service bag drops and contactless immigration corridors'." },
          { q: "Where can passengers find assistance for oversized luggage?", opts: [{ key: "A", text: "At Information Counter C" }, { key: "B", text: "In the central train station" }, { key: "C", text: "At Gate A1" }, { key: "D", text: "Outside the terminal on the bus concourse" }], a: "A", exp: "Nơi hỗ trợ hành lý quá khổ: 'customer service ambassadors are available at Information Counter C'." }
        ]
      },
      {
        title: "Talk 5: Internal Corporate IT Cybersecurity Training Briefing",
        script: "Good morning, team members. As part of Cybersecurity Awareness Month, all full-time employees and technical contractors are required to complete the updated Phishing Defense and Data Classification training module by Friday, October 30th. This 25-minute interactive course covers zero-trust network principles, multi-factor authentication hardware security keys, and safe handling of sensitive client financial records. Employees who complete the course with a passing score of ninety percent or higher will receive a certificate of compliance and be entered into our annual IT tech raffle.",
        questions: [
          { q: "By when must employees complete the mandatory training module?", opts: [{ key: "A", text: "By tomorrow noon" }, { key: "B", text: "By Friday, October 30th" }, { key: "C", text: "Next January" }, { key: "D", text: "In two weeks" }], a: "B", exp: "Hạn chót hoàn thành: 'complete the updated... training module by Friday, October 30th'." },
          { q: "How long is the interactive training course?", opts: [{ key: "A", text: "5 minutes" }, { key: "B", text: "Two hours" }, { key: "C", text: "25 minutes" }, { key: "D", text: "A full day" }], a: "C", exp: "Thời lượng khóa học: 'This 25-minute interactive course covers zero-trust network principles'." },
          { q: "What passing score is required to receive compliance certification?", opts: [{ key: "A", text: "60 percent" }, { key: "B", text: "75 percent" }, { key: "C", text: "100 percent only" }, { key: "D", text: "90 percent or higher" }], a: "D", exp: "Điểm đạt yêu cầu: 'passing score of ninety percent or higher'." }
        ]
      },
      {
        title: "Talk 6: Medical Device Regulatory Symposium Opening Remarks",
        script: "Distinguished biomedical engineers, clinical regulatory directors, and government officials: Welcome to the 2026 International Symposium on AI-Driven Medical Devices. I am Dr. Rebecca Patel, Chair of the European MedTech Regulatory Council. Over the next three days, more than eighty expert panels will explore harmonized validation frameworks for machine learning diagnostic software, cybersecurity standards for implantable cardiac devices, and real-world clinical telemetry governance under the revised EU MDR guidelines. Please note that all keynote plenary slide decks will be available on our symposium portal following each afternoon session.",
        questions: [
          { q: "What is the central focus of the three-day symposium?", opts: [{ key: "A", text: "AI-driven medical devices and regulatory validation frameworks" }, { key: "B", text: "Hospital architectural interior design" }, { key: "C", text: "Pharmaceutical commercial television advertising" }, { key: "D", text: "Nursing uniform fabric procurement" }], a: "A", exp: "Chủ đề hội nghị: 'AI-Driven Medical Devices... harmonized validation frameworks for machine learning diagnostic software'." },
          { q: "Who is delivering the opening remarks?", opts: [{ key: "A", text: "A hospital patient advocate" }, { key: "B", text: "Dr. Rebecca Patel, Chair of the European MedTech Regulatory Council" }, { key: "C", text: "A commercial insurance salesperson" }, { key: "D", text: "A software programmer intern" }], a: "B", exp: "Người phát biểu: 'Dr. Rebecca Patel, Chair of the European MedTech Regulatory Council'." },
          { q: "Where can delegates access keynote presentation slides?", opts: [{ key: "A", text: "Printed on paper at the entrance" }, { key: "B", text: "By postal mail next month" }, { key: "C", text: "On the symposium portal following each afternoon session" }, { key: "D", text: "Via a paid USB drive at the gift shop" }], a: "C", exp: "Nơi tải bài thuyết trình: 'available on our symposium portal following each afternoon session'." }
        ]
      },
      {
        title: "Talk 7: Renewable Energy Infrastructure Project Groundbreaking",
        script: "Good afternoon, civic leaders, energy analysts, and community members. Today marks the official groundbreaking of the Texas Solaria Clean Energy Center in Pecos County. Once completed in late 2027, this 400-megawatt solar photovoltaic facility paired with a 150-megawatt battery storage complex will generate sufficient zero-carbon electricity to power over 120,000 homes across West Texas. The project represents a 450-million-dollar capital investment, creating approximately 600 construction jobs and generating forty million dollars in local tax revenues for regional school districts over its thirty-year operating life.",
        questions: [
          { q: "What is the total solar generation capacity of the Texas Solaria project?", opts: [{ key: "A", text: "50 megawatts" }, { key: "B", text: "150 megawatts" }, { key: "C", text: "1,000 megawatts" }, { key: "D", text: "400 megawatts" }], a: "D", exp: "Công suất phát điện mặt trời: '400-megawatt solar photovoltaic facility paired with a 150-megawatt battery storage complex'." },
          { q: "How many homes will the clean energy complex power?", opts: [{ key: "A", text: "Over 120,000 homes" }, { key: "B", text: "12,000 homes" }, { key: "C", text: "50,000 homes" }, { key: "D", text: "1 million homes" }], a: "A", exp: "Số hộ gia đình cấp điện: 'power over 120,000 homes across West Texas'." },
          { q: "What is the total capital investment for the project?", opts: [{ key: "A", text: "100 million dollars" }, { key: "B", text: "450 million dollars" }, { key: "C", text: "250 million dollars" }, { key: "D", text: "1 billion dollars" }], a: "B", exp: "Tổng mức đầu tư: 'represents a 450-million-dollar capital investment'." }
        ]
      },
      {
        title: "Talk 8: Public Transit Authority Electrification Expansion",
        script: "Good morning, commuters. The Metropolitan Transit Authority is pleased to announce that as of this morning, Route 42 connecting Downtown Financial Plaza with the University Innovation Campus is now one hundred percent serviced by our new fleet of zero-emission electric articulated buses. These vehicles feature ultra-quiet electric drivetrains, complimentary onboard high-speed Wi-Fi, USB-C rapid charging ports at every seat, and low-floor accessibility ramps. Passenger ridership on Route 42 has already increased by eighteen percent during peak commute hours.",
        questions: [
          { q: "What transition was implemented on bus Route 42?", opts: [{ key: "A", text: "Route cancellation due to road repairs" }, { key: "B", text: "A doubling of passenger ticket prices" }, { key: "C", text: "100% conversion to zero-emission electric articulated buses" }, { key: "D", text: "Elimination of weekend services" }], a: "C", exp: "Chuyển đổi trên tuyến 42: 'now one hundred percent serviced by our new fleet of zero-emission electric articulated buses'." },
          { q: "What passenger convenience features are available on the new buses?", opts: [{ key: "A", text: "Complimentary breakfast and hot coffee" }, { key: "B", text: "Private sleeping cabins" }, { key: "C", text: "Printed daily newspapers only" }, { key: "D", text: "Free onboard Wi-Fi and USB-C charging ports at every seat" }], a: "D", exp: "Tiện ích cho hành khách: 'complimentary onboard high-speed Wi-Fi, USB-C rapid charging ports at every seat'." },
          { q: "By how much has peak ridership increased on Route 42?", opts: [{ key: "A", text: "18 percent" }, { key: "B", text: "5 percent" }, { key: "C", text: "12 percent" }, { key: "D", text: "35 percent" }], a: "A", exp: "Mức tăng lượng hành khách: 'ridership on Route 42 has already increased by eighteen percent'." }
        ]
      },
      {
        title: "Talk 9: Commercial Space Aerospace Supply Chain Briefing",
        script: "Good afternoon, engineering teams and project leads. This is a technical briefing regarding our satellite launch fairing manufacturing milestones. The composite structures division in Seattle successfully completed ultrasonic non-destructive testing on the 5-meter carbon-fiber payload fairing for the upcoming orbital mission. The fairing demonstrated zero structural delamination under acoustic vibration stress equivalent to 145 decibels. The payload fairing will be crated and shipped via specialized climate-controlled transport to Cape Canaveral on Friday for final launch vehicle integration.",
        questions: [
          { q: "What aerospace component completed non-destructive testing in Seattle?", opts: [{ key: "A", text: "An airplane passenger window" }, { key: "B", text: "A 5-meter carbon-fiber satellite payload fairing" }, { key: "C", text: "A helicopter tail rotor" }, { key: "D", text: "An airport luggage cart" }], a: "B", exp: "Bộ phận hoàn thành kiểm tra: '5-meter carbon-fiber payload fairing for the upcoming orbital mission'." },
          { q: "What acoustic vibration stress level did the fairing withstand without delamination?", opts: [{ key: "A", text: "90 decibels" }, { key: "B", text: "110 decibels" }, { key: "C", text: "145 decibels" }, { key: "D", text: "200 decibels" }], a: "C", exp: "Áp lực âm thanh chịu đựng: 'under acoustic vibration stress equivalent to 145 decibels'." },
          { q: "Where will the fairing be shipped on Friday for final integration?", opts: [{ key: "A", text: "To Houston, Texas" }, { key: "B", text: "To Paris, France" }, { key: "C", text: "To Tokyo, Japan" }, { key: "D", text: "To Cape Canaveral, Florida" }], a: "D", exp: "Địa điểm chuyển hàng: 'shipped via specialized... transport to Cape Canaveral on Friday'." }
        ]
      },
      {
        title: "Talk 10: Human Resources Wellness & Mental Health Initiative",
        script: "Hello everyone, and welcome to our quarterly employee town hall. We are excited to introduce our expanded Employee Wellness and Mental Health Support Program, effective immediately across all international offices. Under the enhanced benefit plan, all full-time employees and their eligible dependents have access to up to twelve confidential counseling sessions annually with licensed therapists at zero out-of-pocket cost. Additionally, the company is providing a $500 annual fitness and mindfulness reimbursement stipend that can be applied toward gym memberships, yoga classes, or wellness subscriptions. To learn more or schedule a session, visit the wellness portal on the intranet.",
        questions: [
          { q: "How many confidential counseling sessions are provided annually at zero cost?", opts: [{ key: "A", text: "Up to twelve sessions" }, { key: "B", text: "Four sessions" }, { key: "C", text: "Eight sessions" }, { key: "D", text: "Unlimited daily sessions" }], a: "A", exp: "Số buổi tư vấn miễn phí: 'up to twelve confidential counseling sessions annually... at zero out-of-pocket cost'." },
          { q: "What is the annual employee fitness and mindfulness reimbursement stipend?", opts: [{ key: "A", text: "$100" }, { key: "B", text: "$500" }, { key: "C", text: "$250" }, { key: "D", text: "$1,000" }], a: "B", exp: "Mức hỗ trợ thể dục & tinh thần: '$500 annual fitness and mindfulness reimbursement stipend'." },
          { q: "Where can employees learn more or schedule counseling sessions?", opts: [{ key: "A", text: "At the front security desk" }, { key: "B", text: "By calling the city health department" }, { key: "C", text: "On the company intranet wellness portal" }, { key: "D", text: "In the local newspaper" }], a: "C", exp: "Kênh truy cập: 'visit the wellness portal on the intranet'." }
        ]
      }
    ];

    let p4Counter = 71;
    part4Talks.forEach((talk) => {
      talk.questions.forEach((qItem) => {
        qs.push({
          id: `tlm1_q${p4Counter}`,
          partNumber: 4,
          partTitle: "Listening Part 4: Short Talks",
          section: "LISTENING",
          passageText: `[Audio Transcript - ${talk.title}]\n${talk.script}`,
          questionText: `Question ${p4Counter}: ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a as any,
          explanation: qItem.exp
        });
        p4Counter++;
      });
    });

    return qs;
  })()
};
