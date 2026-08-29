import { ExamPaper, ExamQuestion } from "./types";

export const toeicLr202604Paper: ExamPaper = {
  id: "toeic_lr_2026_04",
  title: "ETS TOEIC 2026 Official Test #04",
  type: "TOEIC_LR",
  level: "Advanced",
  timeLimitMinutes: 120,
  totalQuestions: 200,
  maxScore: 990,
  description: "Trọn bộ 200 câu hỏi Nghe & Đọc chuẩn ETS TOEIC 2026: 100 câu Listening (Parts 1-4) và 100 câu Reading (Parts 5-7) bao quát chuỗi cung ứng công nghệ, tản nhiệt trung tâm dữ liệu AI Dublin, đấu thầu máy quang khắc EUV Dresden 210 triệu Euro và kiểm toán năng lượng xanh ESG.",
  categoryBadge: "ETS TOEIC L&R",
  tags: ["TOEIC", "ETS 2026", "Full Test", "Listening & Reading"],
  supportedSkills: ["LISTENING", "READING"],
  questions: (() => {
    const qs: ExamQuestion[] = [];

    // =========================================================================
        // =========================================================================
    // PART 1: PHOTOGRAPHS (Q1 - Q6)
    // =========================================================================
    const part1Items = [
      {
        id: "tlr4_q1",
        text: "Look at the photograph marked No. 1 in your test book.",
        img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        opts: [
          { key: "A", text: "Electric trucks are plugged into charging tethers at the automated terminal." },
          { key: "B", text: "Workers are repairing the warehouse roof in rainy weather." },
          { key: "C", text: "Cargo ships are departing from the dry dock into open water." },
          { key: "D", text: "Boxes are being manually carried up the concrete stairs." }
        ],
        a: "A",
        exp: "🎯 **Đáp án đúng: A** (Electric trucks are plugged into charging tethers at the automated terminal.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Các xe tải điện đang được cắm vào dây sạc tại trạm cảng tự động. (Đúng với khung cảnh và trạng thái xe)\n- (B) Công nhân đang sửa chữa mái nhà kho trong thời tiết mưa. (Sai bối cảnh)\n- (C) Tàu chở hàng đang rời ụ tàu ra vùng nước mở. (Sai đối tượng)\n- (D) Các thùng hàng đang được khiêng thủ công lên bậc thang bê tông. (Sai hành động)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy đối tượng và hành vi: Trạm sạc tự động của đội xe điện vận tải không có cảnh bốc vác thủ công (D) hay sửa mái (B).\n\n💡 **Từ vựng trọng tâm:**\n- `electric truck` (/ɪˈlɛktrɪk trʌk/): xe tải chạy điện\n- `charging tether` (/ˈtʃɑːdʒɪŋ ˈtɛðər/): dây cáp trụ sạc điện\n- `automated terminal` (/ˈɔːtəmeɪtɪd ˈtɜːmɪnl/): trạm cảng tự động hóa"
      },
      {
        id: "tlr4_q2",
        text: "Look at the photograph marked No. 2 in your test book.",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        opts: [
          { key: "A", text: "A laboratory scientist is washing glassware in the sink." },
          { key: "B", text: "A technician in a protective cleanroom suit is inspecting a silicon wafer under a microscope." },
          { key: "C", text: "Engineers are disassembling a desktop computer monitor." },
          { key: "D", text: "Safety helmets are hanging on the wooden coat rack." }
        ],
        a: "B",
        exp: "🎯 **Đáp án đúng: B** (A technician in a protective cleanroom suit is inspecting a silicon wafer under a microscope.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Nhà khoa học phòng thí nghiệm đang rửa đồ thủy tinh trong bồn rửa. (Sai hành động)\n- (B) Một kỹ thuật viên mặc đồ bảo hộ phòng sạch đang kiểm tra phiến silicon dưới kính hiển vi. (Đúng trang phục và hành động)\n- (C) Các kỹ sư đang tháo rời màn hình máy tính để bàn. (Sai đối tượng)\n- (D) Mũ bảo hộ đang được treo trên giá treo quần áo bằng gỗ. (Sai trạng thái)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy hành động thường gặp: Kỹ thuật viên đang ngồi soi kính hiển vi chứ không phải rửa dụng cụ thủy tinh (A) hay tháo dỡ máy tính (C).\n\n💡 **Từ vựng trọng tâm:**\n- `protective cleanroom suit` (/prəˈtɛktɪv ˈkliːnruːm suːt/): bộ quần áo bảo hộ phòng sạch\n- `silicon wafer` (/ˈsɪlɪkən ˈweɪfər/): tấm phiến bán dẫn silicon\n- `under a microscope` (/ˈmaɪkrəskəʊp/): dưới kính hiển vi quang học"
      },
      {
        id: "tlr4_q3",
        text: "Look at the photograph marked No. 3 in your test book.",
        img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        opts: [
          { key: "A", text: "Fishermen are casting nets into the open sea." },
          { key: "B", text: "A submarine is docking near the civilian harbor." },
          { key: "C", text: "A civil engineer is surveying an offshore wind turbine installation with digital telemetry instruments." },
          { key: "D", text: "Tourists are sunbathing on the sandy resort beach." }
        ],
        a: "C",
        exp: "🎯 **Đáp án đúng: C** (A civil engineer is surveying an offshore wind turbine installation with digital telemetry instruments.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Ngư dân đang quăng lưới ra vùng biển khơi. (Sai đối tượng)\n- (B) Tàu ngầm đang cập cảng gần bến cảng dân sự. (Sai bối cảnh)\n- (C) Kỹ sư xây dựng đang khảo sát lắp đặt tuabin điện gió ngoài khơi bằng thiết bị đo xa kỹ thuật số. (Đúng khung cảnh công trình)\n- (D) Khách du lịch đang tắm nắng trên bãi biển khu nghỉ dưỡng. (Sai bối cảnh)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy bối cảnh biển: Đề thi sử dụng khung cảnh biển để gây nhiễu các phương án liên quan đến du lịch/ngư nghiệp (A, D), nhưng trọng tâm là tuabin gió ngoài khơi (offshore wind turbine).\n\n💡 **Từ vựng trọng tâm:**\n- `offshore wind turbine` (/ˈɒfʃɔːr wɪnd ˈtɜːbaɪn/): tuabin điện gió ngoài khơi\n- `surveying an installation` (/səˈveɪɪŋ/): khảo sát việc lắp đặt công trình"
      },
      {
        id: "tlr4_q4",
        text: "Look at the photograph marked No. 4 in your test book.",
        img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        opts: [
          { key: "A", text: "Spectators are cheering inside an outdoor sports arena." },
          { key: "B", text: "Chefs are preparing banquet meals in a commercial kitchen." },
          { key: "C", text: "Chairs are stacked haphazardly against the hallway wall." },
          { key: "D", text: "A financial analyst is presenting quarterly data on an interactive digital whiteboard." }
        ],
        a: "D",
        exp: "🎯 **Đáp án đúng: D** (A financial analyst is presenting quarterly data on an interactive digital whiteboard.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Khán giả đang reo hò bên trong đấu trường thể thao ngoài trời. (Sai bối cảnh)\n- (B) Các đầu bếp đang chuẩn bị bữa ăn tiệc trong bếp thương mại. (Sai đối tượng)\n- (C) Ghế được xếp chồng lộn xộn dọc theo tường hành lang. (Sai trạng thái)\n- (D) Chuyên viên phân tích tài chính đang thuyết trình dữ liệu quý trên bảng trắng kỹ thuật số tương tác. (Đúng hành động chính)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy đối tượng và khung cảnh: Người thuyết trình đang trực tiếp đứng trước bảng trình chiếu giải thích số liệu biểu đồ cho người tham dự.\n\n💡 **Từ vựng trọng tâm:**\n- `financial analyst` (/faɪˈnænʃl ˈænəlɪst/): chuyên viên phân tích tài chính\n- `interactive digital whiteboard` (/ˌɪntərˈæktɪv ˈwaɪtbɔːd/): bảng kỹ thuật số tương tác\n- `quarterly data` (/ˈkwɔːtəli ˈdeɪtə/): số liệu thống kê theo quý"
      },
      {
        id: "tlr4_q5",
        text: "Look at the photograph marked No. 5 in your test book.",
        img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        opts: [
          { key: "A", text: "A receptionist is handing a contactless room key card to a business hotel guest." },
          { key: "B", text: "Luggage is being loaded onto an airplane baggage conveyor." },
          { key: "C", text: "Carpenters are varnishing wooden floorboards in a gallery." },
          { key: "D", text: "Customers are waiting in line at a commercial bank teller window." }
        ],
        a: "A",
        exp: "🎯 **Đáp án đúng: A** (A receptionist is handing a contactless room key card to a business hotel guest.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Nhân viên lễ tân đang trao thẻ khóa phòng không tiếp xúc cho khách khách sạn công tác. (Đúng hành động và bối cảnh)\n- (B) Hành lý đang được bốc lên băng chuyền hành lý máy bay. (Sai bối cảnh)\n- (C) Thợ mộc đang đánh véc-ni ván sàn gỗ trong phòng trưng bày. (Sai hành động)\n- (D) Khách hàng đang xếp hàng tại cửa giao dịch của ngân hàng thương mại. (Sai đối tượng)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy quầy giao dịch: Dễ nhầm giữa quầy tiếp tân khách sạn (hotel front desk) và quầy giao dịch ngân hàng (bank teller window).\n\n💡 **Từ vựng trọng tâm:**\n- `receptionist` (/rɪˈsɛpʃənɪst/): nhân viên lễ tân\n- `contactless room key card` (/ˈkɒntæktləs ruːm kiː kɑːd/): thẻ phòng từ không tiếp xúc\n- `hotel guest` (/həʊˈtɛl ɡɛst/): khách lưu trú khách sạn"
      },
      {
        id: "tlr4_q6",
        text: "Look at the photograph marked No. 6 in your test book.",
        img: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        opts: [
          { key: "A", text: "Mechanics are changing vehicle tires on a service ramp." },
          { key: "B", text: "Robotic articulation arms are assembling aerospace fuselage components on a precision conveyor." },
          { key: "C", text: "Office desks are separated by soundproof glass cubicle partitions." },
          { key: "D", text: "Gardeners are trimming ornamental bushes in an office park courtyard." }
        ],
        a: "B",
        exp: "🎯 **Đáp án đúng: B** (Robotic articulation arms are assembling aerospace fuselage components on a precision conveyor.)\n\n🔍 **Dịch nghĩa các lựa chọn:**\n- (A) Thợ máy đang thay lốp xe trên bục nâng bảo dưỡng. (Sai đối tượng)\n- (B) Các cánh tay khớp nối robot đang lắp ráp các thành phần thân máy bay trên băng chuyền chính xác. (Đúng hành động tự động hóa)\n- (C) Bàn văn phòng được ngăn cách bởi các vách ngăn kính cách âm. (Sai bối cảnh)\n- (D) Những người làm vườn đang cắt tỉa bụi cây cảnh trong sân khu văn phòng. (Sai hành động)\n\n⚠️ **Phân tích bẫy thi ETS:** Bẫy dây chuyền công nghiệp: Không có sự tham gia thủ công của thợ máy (A), các cánh tay robot tự động hoạt động chính xác trên băng chuyền.\n\n💡 **Từ vựng trọng tâm:**\n- `robotic articulation arms` (/rəʊˈbɒtɪk ɑːˌtɪkjʊˈleɪʃn ɑːmz/): cánh tay robot đa khớp nối\n- `fuselage components` (/ˈfjuːzəlɑːʒ kəmˈpəʊnənts/): linh kiện thân máy bay\n- `precision conveyor` (/prɪˈsɪʒn kənˈveɪər/): băng chuyền chính xác"
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
      { q: "Where will the international cybersecurity summit take place this year?", opts: [{"key":"A","text":"At the Convention Center in Dublin."},{"key":"B","text":"Yes, it was very informative."},{"key":"C","text":"About forty-five attendees."}], a: "A", exp: "Câu hỏi 'Where' chỉ địa điểm -> Phương án A chỉ trung tâm hội nghị tại Dublin." },
      { q: "Who is in charge of reviewing the vendor SLA agreements?", opts: [{"key":"A","text":"In the conference room on the second floor."},{"key":"B","text":"Ms. Patel from the legal procurement department."},{"key":"C","text":"By five o'clock tomorrow afternoon."}], a: "B", exp: "Câu hỏi 'Who' hỏi người chịu trách nhiệm -> Phương án B chỉ bà Patel phòng pháp chế." },
      { q: "When are the quarterly financial statements scheduled for release?", opts: [{"key":"A","text":"Over three million dollars."},{"key":"B","text":"No, I haven't seen them yet."},{"key":"C","text":"They will be published on Friday morning."}], a: "C", exp: "Câu hỏi 'When' chỉ thời gian -> Phương án C trả lời sáng thứ Sáu." },
      { q: "Why did the cloud migration team postpone the server maintenance window?", opts: [{"key":"A","text":"To avoid interrupting peak customer trading hours."},{"key":"B","text":"Yes, the servers are online."},{"key":"C","text":"Every Tuesday afternoon."}], a: "A", exp: "Câu hỏi 'Why' hỏi lý do -> Phương án A nêu mục đích tránh gián đoạn giờ giao dịch cao điểm." },
      { q: "Would you prefer to fly directly to Munich or take the morning high-speed train?", opts: [{"key":"A","text":"Yes, I like airplanes."},{"key":"B","text":"The flight saves nearly four hours of travel time."},{"key":"C","text":"Platform number seven."}], a: "B", exp: "Câu hỏi lựa chọn phương tiện -> Phương án B chọn bay để tiết kiệm 4 giờ." },
      { q: "Has the commercial building permit been approved by city hall yet?", opts: [{"key":"A","text":"A thirty-story office tower."},{"key":"B","text":"Across from the subway station."},{"key":"C","text":"Our chief architect is expecting the confirmation email this afternoon."}], a: "C", exp: "Câu hỏi xác nhận -> Phương án C báo kiến trúc sư trưởng đang đợi email xác nhận chiều nay." },
      { q: "Could you send the updated budget spreadsheet to the regional directors?", opts: [{"key":"A","text":"I already emailed it to them before the morning briefing."},{"key":"B","text":"Yes, spreadsheets are useful."},{"key":"C","text":"About fifteen percent higher."}], a: "A", exp: "Lời nhờ -> Phương án A báo đã gửi trước giờ họp sáng." },
      { q: "How often does the data center conduct off-site backup synchronizations?", opts: [{"key":"A","text":"In the server rack."},{"key":"B","text":"Every fifteen minutes automatically."},{"key":"C","text":"Because of security regulations."}], a: "B", exp: "Câu hỏi tần suất 'How often' -> Phương án B trả lời 15 phút một lần tự động." },
      { q: "Should we order organic catering for the executive retreat or book a restaurant downtown?", opts: [{"key":"A","text":"Twelve participants in total."},{"key":"B","text":"No, thank you, I'm full."},{"key":"C","text":"The board members preferred dining at the lakeside restaurant."}], a: "C", exp: "Câu hỏi lựa chọn -> Phương án C chọn nhà hàng ven hồ theo sở thích hội đồng quản trị." },
      { q: "Why hasn't the shipment of optical sensor components arrived at warehouse four?", opts: [{"key":"A","text":"Customs clearance at the harbor took longer than anticipated."},{"key":"B","text":"Inside the wooden shipping crates."},{"key":"C","text":"Five hundred units per pallet."}], a: "A", exp: "Câu hỏi lý do trễ hàng -> Phương án A giải thích thủ tục hải quan kéo dài hơn dự kiến." },
      { q: "Are you attending Dr. Chen's keynote speech on artificial intelligence in medicine?", opts: [{"key":"A","text":"Yes, she is a great speaker."},{"key":"B","text":"I have a mandatory client conference call at that exact time."},{"key":"C","text":"In auditorium C."}], a: "B", exp: "Câu trả lời gián tiếp từ chối khéo léo do bận họp với khách hàng." },
      { q: "Where can I pick up my biometric access badge for the new research laboratory?", opts: [{"key":"A","text":"It is valid for one year."},{"key":"B","text":"At nine o'clock sharp."},{"key":"C","text":"At the security desk on the ground floor."}], a: "C", exp: "Câu hỏi 'Where' -> Phương án C chỉ bàn bảo vệ tầng trệt." },
      { q: "The new ERP software interface is much more intuitive than the legacy system, isn't it?", opts: [{"key":"A","text":"Our department has cut order processing time in half."},{"key":"B","text":"Yes, we installed new monitors."},{"key":"C","text":"To the software vendor."}], a: "A", exp: "Câu hỏi đuôi đồng thuận -> Phương án A nêu kết quả thực tế giảm 50% thời gian xử lý." },
      { q: "How much did the company invest in the rooftop solar panel array?", opts: [{"key":"A","text":"On top of building B."},{"key":"B","text":"Approximately 350,000 euros after government rebates."},{"key":"C","text":"Clean renewable energy."}], a: "B", exp: "Câu hỏi chi phí 'How much' -> Phương án B trả lời khoảng 350.000 euro." },
      { q: "Did Mr. Tanaka approve the revised marketing timeline for the spring campaign?", opts: [{"key":"A","text":"In the Tokyo office."},{"key":"B","text":"Digital billboard advertising."},{"key":"C","text":"He signed off on the final proposal this morning."}], a: "C", exp: "Câu hỏi phê duyệt -> Phương án C xác nhận ông ấy đã ký duyệt sáng nay." },
      { q: "Who should I contact if I encounter network connectivity issues on the third floor?", opts: [{"key":"A","text":"Dial extension 4402 for the IT help desk."},{"key":"B","text":"High-speed optical fiber."},{"key":"C","text":"Yes, the Wi-Fi is fast."}], a: "A", exp: "Câu hỏi liên hệ ai -> Phương án A hướng dẫn gọi số máy nhánh 4402 của IT help desk." },
      { q: "When will the facility management team replace the air conditioning filters?", opts: [{"key":"A","text":"In the ventilation duct."},{"key":"B","text":"Over the coming weekend during non-working hours."},{"key":"C","text":"Because of dust accumulation."}], a: "B", exp: "Câu hỏi thời gian -> Phương án B trả lời vào cuối tuần ngoài giờ làm việc." },
      { q: "Isn't the quarterly sales target due for revision after the merger?", opts: [{"key":"A","text":"About twenty percent growth."},{"key":"B","text":"No, I haven't sold it yet."},{"key":"C","text":"The executive committee is addressing that in tomorrow's session."}], a: "C", exp: "Câu hỏi phủ định -> Phương án C báo ban điều hành sẽ bàn trong phiên họp ngày mai." },
      { q: "Where did you file the confidential audit report for the ESG compliance review?", opts: [{"key":"A","text":"In the encrypted compliance folder on the secure server."},{"key":"B","text":"Yes, it passed all standards."},{"key":"C","text":"Last Wednesday afternoon."}], a: "A", exp: "Câu hỏi nơi lưu tài liệu -> Phương án A chỉ thư mục mã hóa trên máy chủ bảo mật." },
      { q: "Would you like me to reserve a rental car for your commute from the airport?", opts: [{"key":"A","text":"A compact electric sedan."},{"key":"B","text":"Thank you, but the regional branch manager is picking me up."},{"key":"C","text":"Terminal two arrivals."}], a: "B", exp: "Lời đề nghị hỗ trợ -> Phương án B từ chối lịch sự do có người đón." },
      { q: "How can we increase customer participation in the annual satisfaction survey?", opts: [{"key":"A","text":"Over five thousand responses."},{"key":"B","text":"Yes, the survey was short."},{"key":"C","text":"By offering a fifteen percent discount coupon on their next purchase."}], a: "C", exp: "Câu hỏi giải pháp -> Phương án C đề xuất tặng mã giảm giá 15% cho lần mua kế tiếp." },
      { q: "Is the overseas delegation arriving on Tuesday or Wednesday morning?", opts: [{"key":"A","text":"Their flight was rescheduled to Wednesday at 9:00 AM."},{"key":"B","text":"From the Zurich headquarters."},{"key":"C","text":"Six senior executives."}], a: "A", exp: "Câu hỏi lựa chọn ngày -> Phương án A chọn sáng thứ Tư lúc 9:00 AM." },
      { q: "Why are all the conference rooms on the fourth floor locked today?", opts: [{"key":"A","text":"On the top floor."},{"key":"B","text":"Contractors are installing soundproofing acoustic panels."},{"key":"C","text":"Until five o'clock."}], a: "B", exp: "Câu hỏi lý do khóa phòng -> Phương án B giải thích đang thi công tấm cách âm." },
      { q: "Have you submitted your travel expense reimbursement receipts yet?", opts: [{"key":"A","text":"Flight to Singapore."},{"key":"B","text":"Four hundred dollars."},{"key":"C","text":"I uploaded the scanned PDFs to the accounting portal yesterday."}], a: "C", exp: "Câu hỏi hoàn tiền công tác -> Phương án C báo đã tải file PDF lên cổng kế toán hôm qua." },
      { q: "The keynote speaker's flight has been delayed by three hours, hasn't it?", opts: [{"key":"A","text":"Yes, so we adjusted the workshop schedule accordingly."},{"key":"B","text":"In the grand ballroom."},{"key":"C","text":"A very inspiring presentation."}], a: "A", exp: "Câu hỏi đuôi hoãn chuyến bay -> Phương án A xác nhận đã điều chỉnh lại lịch hội thảo." }
    ];

    part2Items.forEach((item, idx) => {
      const qNum = idx + 7;
      qs.push({
        id: `tlr4_q${qNum}`,
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
        title: "Dialogue 1: Data Center Liquid Cooling Upgrade in Dublin",
        script: "Man: Good morning, Brenda. Have you reviewed the engineering proposal for retrofitting our Dublin server clusters with direct-to-chip liquid cooling loops?\nWoman: Yes, Liam. The immersion thermal cooling system reduces server rack electricity consumption by 38 percent and allows us to handle high-density AI computational workloads without thermal throttling.\nMan: That will significantly lower our operational carbon footprint. When can the certified HVAC contractors begin the phase-one installation?\nWoman: They are scheduled to commence installation next Monday evening at 10:00 PM to minimize any potential latency on our client transactions.",
        questions: [
          { q: "What infrastructure project are the speakers discussing?", opts: [{"key":"A","text":"Building a new office cafeteria"},{"key":"B","text":"Retrofitting server clusters with direct-to-chip liquid cooling loops"},{"key":"C","text":"Purchasing new company laptops"},{"key":"D","text":"Painting the exterior parking garage"}], a: "B", exp: "Dự án: 'retrofitting our Dublin server clusters with direct-to-chip liquid cooling loops'." },
          { q: "By how much will the immersion cooling system reduce server electricity consumption?", opts: [{"key":"A","text":"15 percent"},{"key":"B","text":"50 percent"},{"key":"C","text":"By 38 percent"},{"key":"D","text":"75 percent"}], a: "C", exp: "Mức tiết kiệm điện năng: 'reduces server rack electricity consumption by 38 percent'." },
          { q: "When will the installation work begin?", opts: [{"key":"A","text":"Friday morning at 8:00 AM"},{"key":"B","text":"Next month"},{"key":"C","text":"During the weekend"},{"key":"D","text":"Next Monday evening at 10:00 PM"}], a: "D", exp: "Thời gian thi công: 'next Monday evening at 10:00 PM'." }
        ]
      },
      {
        title: "Dialogue 2: Biomedical Trade Expo Booth Negotiation in Basel",
        script: "Woman: Herr Weber, our marketing team wants to upgrade our exhibition booth at the Basel Life Sciences Expo from a standard 20-square-meter inline space to a 60-square-meter corner island stand in Hall 4.\nMan: That is a premier location with high foot traffic near the main keynote stage, Frau Müller. However, the corner island booth fee is 18,500 Swiss francs, which is 6,000 francs above our initial quarterly trade show budget.\nWoman: If we sign the contract before the early-bird deadline this Friday, the organizers provide a 15 percent rebate and complimentary promotional sponsorship on their mobile app.\nMan: In that case, the net cost fits within our revised marketing allocation. Please finalize the paperwork and wire the deposit.",
        questions: [
          { q: "Where does the marketing team want to move their exhibition booth?", opts: [{"key":"A","text":"To a 60-square-meter corner island stand in Hall 4"},{"key":"B","text":"To the outdoor parking lot"},{"key":"C","text":"To the basement entrance"},{"key":"D","text":"To the secondary hallway"}], a: "A", exp: "Vị trí gian hàng: '60-square-meter corner island stand in Hall 4'." },
          { q: "What is the standard fee for the corner island booth?", opts: [{"key":"A","text":"5,000 francs"},{"key":"B","text":"18,500 Swiss francs"},{"key":"C","text":"30,000 francs"},{"key":"D","text":"50,000 francs"}], a: "B", exp: "Chi phí gian hàng góc: '18,500 Swiss francs'." },
          { q: "What discount incentive is offered for early contract signing by Friday?", opts: [{"key":"A","text":"Free airline tickets"},{"key":"B","text":"Free hotel rooms for five nights"},{"key":"C","text":"A 15 percent rebate and complimentary mobile app sponsorship"},{"key":"D","text":"Half price booth rental"}], a: "C", exp: "Ưu đãi ký sớm: '15 percent rebate and complimentary promotional sponsorship on their mobile app'." }
        ]
      },
      {
        title: "Dialogue 3: Real-Time RFID Warehouse Automation Rollout",
        script: "Man: Sandra, how did the pilot test of our automated RFID conveyor scanning system perform in the Seattle distribution center?\nWoman: It was a massive success, Kevin. Scanning accuracy reached 99.94 percent, and pallet processing speed improved from twelve minutes down to just ninety seconds per shipment.\nMan: That exceeds our logistics performance targets. What is the next phase of the implementation plan?\nWoman: We are rolling out the handheld RFID scanners and robotic palletizers to our Chicago and Dallas logistics hubs starting next month.",
        questions: [
          { q: "What technology was pilot-tested at the Seattle distribution center?", opts: [{"key":"A","text":"Manual barcode clipboards"},{"key":"B","text":"Drone delivery to homes"},{"key":"C","text":"Voice-activated phones"},{"key":"D","text":"Automated RFID conveyor scanning system"}], a: "D", exp: "Công nghệ thử nghiệm: 'automated RFID conveyor scanning system'." },
          { q: "To what duration did pallet processing speed improve?", opts: [{"key":"A","text":"From twelve minutes down to just ninety seconds"},{"key":"B","text":"From 1 hour to 30 minutes"},{"key":"C","text":"From 5 minutes to 4 minutes"},{"key":"D","text":"No speed improvement"}], a: "A", exp: "Tốc độ xử lý pallet: 'improved from twelve minutes down to just ninety seconds per shipment'." },
          { q: "Which two cities will receive the next rollout of RFID equipment next month?", opts: [{"key":"A","text":"Boston and Atlanta"},{"key":"B","text":"Chicago and Dallas logistics hubs"},{"key":"C","text":"Miami and New York"},{"key":"D","text":"Denver and Phoenix"}], a: "B", exp: "Địa điểm triển khai tiếp theo: 'rolling out... to our Chicago and Dallas logistics hubs'." }
        ]
      },
      {
        title: "Dialogue 4: Corporate Mental Health & Dental Benefit Enhancements",
        script: "Woman: David, the employee benefits committee completed its annual review of our corporate health coverage. We are recommending expanding mental health counseling coverage to twenty fully subsidized sessions per year and adding comprehensive adult orthodontic benefits.\nMan: That aligns perfectly with our talent retention objectives. How will this adjustment impact our annual healthcare premium budget?\nWoman: By switching our underwriter to Apex Health Global, the premium increase is capped at only 3.2 percent while significantly enhancing coverage depth.\nMan: Wonderful. Let's present this to the executive board at Thursday's compensation meeting.",
        questions: [
          { q: "What benefit enhancements are proposed by the committee?", opts: [{"key":"A","text":"Free gym shoes only"},{"key":"B","text":"Unlimited paid vacation"},{"key":"C","text":"Twenty subsidized mental health counseling sessions and adult orthodontic benefits"},{"key":"D","text":"Free lunches on Fridays only"}], a: "C", exp: "Phúc lợi đề xuất: 'twenty fully subsidized sessions per year and adding comprehensive adult orthodontic benefits'." },
          { q: "How is the company keeping the premium cost increase to only 3.2 percent?", opts: [{"key":"A","text":"By cutting salaries"},{"key":"B","text":"By eliminating dental coverage"},{"key":"C","text":"By reducing employee headcounts"},{"key":"D","text":"By switching the underwriter to Apex Health Global"}], a: "D", exp: "Biện pháp kiểm soát chi phí: 'switching our underwriter to Apex Health Global'." },
          { q: "When will the proposal be presented to the executive board?", opts: [{"key":"A","text":"At Thursday's compensation meeting"},{"key":"B","text":"Next year"},{"key":"C","text":"On Friday afternoon"},{"key":"D","text":"During the annual general meeting"}], a: "A", exp: "Thời gian trình bày: 'present this to the executive board at Thursday's compensation meeting'." }
        ]
      },
      {
        title: "Dialogue 5: Solid-State Battery R&D Progress in Yokohama",
        script: "Man: Dr. Sato, how did the thermal cycle stress tests perform on our 500-watt-hour solid-state battery pouch cells?\nWoman: We completed 1,200 continuous rapid charging cycles at 45 degrees Celsius with less than 2.8% capacity degradation.\nMan: That is industry-leading stability. Has the patent application for the ceramic electrolyte separator been filed in Japan and the US?\nWoman: Yes, our intellectual property counsel confirmed simultaneous filings with JPO and USPTO yesterday.",
        questions: [
          { q: "What milestone was achieved in the battery tests?", opts: [{"key":"A","text":"Complete battery failure"},{"key":"B","text":"1,200 cycles with under 2.8% degradation"},{"key":"C","text":"Project cancellation"},{"key":"D","text":"Reduced charging speed"}], a: "B", exp: "Mốc đạt được: '1,200 continuous rapid charging cycles... with less than 2.8% capacity degradation'." },
          { q: "What component is covered under the patent filing?", opts: [{"key":"A","text":"Plastic outer casing"},{"key":"B","text":"Copper wire connectors"},{"key":"C","text":"Ceramic electrolyte separator"},{"key":"D","text":"Car dashboard display"}], a: "C", exp: "Bộ phận sáng chế: 'ceramic electrolyte separator'." },
          { q: "Where were the patent applications filed?", opts: [{"key":"A","text":"In Germany and France"},{"key":"B","text":"In China only"},{"key":"C","text":"At the World Bank"},{"key":"D","text":"Simultaneously in Japan (JPO) and the US (USPTO)"}], a: "D", exp: "Cơ quan cấp bằng: 'filings with JPO and USPTO yesterday'." }
        ]
      },
      {
        title: "Dialogue 6: Autonomous Fleet Telematics in Seoul",
        script: "Woman: Min-jun, how is the autonomous delivery shuttle pilot progressing in the Gangnam commercial district?\nMan: Our fleet of twenty electric shuttles has completed 4,500 passenger trips with an average on-time arrival rate of 98.7%.\nWoman: Have we resolved the sensor interference issue near the underground subway ventilation shafts?\nMan: Yes, we updated the onboard sensor fusion software with dual-polarization radar filtering last Friday.",
        questions: [
          { q: "How many passenger trips did the shuttle fleet complete?", opts: [{"key":"A","text":"4,500 passenger trips"},{"key":"B","text":"500 trips"},{"key":"C","text":"10,000 trips"},{"key":"D","text":"20,000 trips"}], a: "A", exp: "Số chuyến xe: 'completed 4,500 passenger trips'." },
          { q: "What is the on-time arrival rate of the shuttle fleet?", opts: [{"key":"A","text":"85.2%"},{"key":"B","text":"98.7%"},{"key":"C","text":"90.0%"},{"key":"D","text":"75.5%"}], a: "B", exp: "Tỷ lệ đúng giờ: 'average on-time arrival rate of 98.7%'." },
          { q: "How was the sensor interference issue resolved?", opts: [{"key":"A","text":"By hiring manual drivers"},{"key":"B","text":"By shutting down the route"},{"key":"C","text":"Through dual-polarization radar filtering software update"},{"key":"D","text":"By changing the shuttle tires"}], a: "C", exp: "Giải pháp: 'updated the onboard sensor fusion software with dual-polarization radar filtering'." }
        ]
      },
      {
        title: "Dialogue 7: Corporate Carbon Accounting & Renewable PPA",
        script: "Man: Laura, did our sustainability steering committee finalize the 10-year offshore wind power purchase agreement in Scotland?\nWoman: Yes, Keith. The agreement covers 85 megawatts of generation capacity, which will supply 100% of the electricity required for our Edinburgh and Glasgow campuses.\nMan: What impact does this have on our Scope 2 greenhouse gas emissions?\nWoman: It eliminates approximately 42,000 metric tonnes of CO2 equivalents annually and earns us full RE100 compliance certification.",
        questions: [
          { q: "What renewable energy source is contracted under the agreement?", opts: [{"key":"A","text":"Rooftop solar"},{"key":"B","text":"Geothermal energy"},{"key":"C","text":"Biomass incineration"},{"key":"D","text":"Offshore wind power in Scotland"}], a: "D", exp: "Nguồn năng lượng: '10-year offshore wind power purchase agreement in Scotland'." },
          { q: "Which facilities will be powered by the wind agreement?", opts: [{"key":"A","text":"Edinburgh and Glasgow campuses"},{"key":"B","text":"Offices in London and Dublin"},{"key":"C","text":"Factories in Munich"},{"key":"D","text":"Warehouses in Madrid"}], a: "A", exp: "Cơ sở thụ hưởng: 'Edinburgh and Glasgow campuses'." },
          { q: "How much annual carbon emissions will be eliminated?", opts: [{"key":"A","text":"5,000 metric tonnes"},{"key":"B","text":"Approximately 42,000 metric tonnes"},{"key":"C","text":"100,000 metric tonnes"},{"key":"D","text":"1 million tonnes"}], a: "B", exp: "Mức giảm phát thải: 'eliminates approximately 42,000 metric tonnes of CO2 equivalents annually'." }
        ]
      },
      {
        title: "Dialogue 8: High-Precision CNC Machinery Calibration in Stuttgart",
        script: "Woman: Klaus, has the calibration technician verified the 5-axis CNC milling centers for the titanium aerospace turbine contract?\nMan: Yes, Frau Schneider. Laser interferometry measurements show spatial tolerances within 1.5 microns across all three coordinate axes.\nWoman: Excellent. Can we initiate the pre-production sample batch for Rolls-Royce inspection on Wednesday?\nMan: The raw titanium ingots are already staged in Bay 2, so machining will begin promptly at 7:00 AM on Wednesday.",
        questions: [
          { q: "What spatial tolerance was verified on the CNC milling centers?", opts: [{"key":"A","text":"Within 10 microns"},{"key":"B","text":"50 millimeters"},{"key":"C","text":"Within 1.5 microns across all three axes"},{"key":"D","text":"Zero tolerance"}], a: "C", exp: "Độ chính xác không gian: 'spatial tolerances within 1.5 microns'." },
          { q: "Who is the prospective client inspecting the pre-production batch?", opts: [{"key":"A","text":"A commercial bicycle maker"},{"key":"B","text":"A consumer electronics store"},{"key":"C","text":"A medical clinic"},{"key":"D","text":"Rolls-Royce"}], a: "D", exp: "Khách hàng thẩm định: 'pre-production sample batch for Rolls-Royce inspection'." },
          { q: "When will sample machining begin?", opts: [{"key":"A","text":"Promptly at 7:00 AM on Wednesday"},{"key":"B","text":"Next Friday afternoon"},{"key":"C","text":"Next month"},{"key":"D","text":"Immediately this evening"}], a: "A", exp: "Thời gian gia công: 'machining will begin promptly at 7:00 AM on Wednesday'." }
        ]
      },
      {
        title: "Dialogue 9: International Clinical Drug Trial Coordination in Basel",
        script: "Man: Dr. Meier, how many clinical sites have obtained local ethics committee approval for our Phase III pediatric oncology study?\nWoman: We have secured approval across 18 hospital centers in Switzerland, Germany, and France, with 120 patients enrolled to date.\nMan: Has the cold chain logistics vendor confirmed dry-ice delivery protocols for the mRNA vaccine candidate?\nWoman: Yes, Apex BioLogistics validated continuous minus 80 degrees Celsius temperature integrity throughout the distribution pipeline.",
        questions: [
          { q: "How many hospital centers have secured ethics committee approval?", opts: [{"key":"A","text":"5 centers"},{"key":"B","text":"18 hospital centers across 3 countries"},{"key":"C","text":"50 centers"},{"key":"D","text":"100 centers"}], a: "B", exp: "Số lượng trung tâm: 'secured approval across 18 hospital centers'." },
          { q: "What storage temperature is required for the clinical vaccine candidate?", opts: [{"key":"A","text":"Room temperature (20°C)"},{"key":"B","text":"Zero degrees"},{"key":"C","text":"Minus 80 degrees Celsius"},{"key":"D","text":"Minus 10 degrees"}], a: "C", exp: "Nhiệt độ bảo quản: 'continuous minus 80 degrees Celsius temperature integrity'." },
          { q: "How many patients are currently enrolled in the trial?", opts: [{"key":"A","text":"12 patients"},{"key":"B","text":"500 patients"},{"key":"C","text":"1,000 patients"},{"key":"D","text":"120 patients enrolled to date"}], a: "D", exp: "Số lượng bệnh nhân: '120 patients enrolled to date'." }
        ]
      },
      {
        title: "Dialogue 10: Automated Container Port Berthing in Singapore",
        script: "Woman: Captain Tan, what is the berthing sequence for the 24,000 TEU container vessel arriving from Rotterdam tonight?\nMan: The automated mooring system will lock the vessel into Berth 8 at 11:30 PM, and eight dual-trolley ship-to-shore cranes will begin unloading simultaneously.\nWoman: Are all automated guided vehicles (AGVs) synced with the terminal operating system?\nMan: All forty-eight AGVs completed diagnostic connectivity tests at 4:00 PM with zero network latency.",
        questions: [
          { q: "At what time will the vessel be locked into Berth 8?", opts: [{"key":"A","text":"At 11:30 PM tonight"},{"key":"B","text":"At 6:00 PM"},{"key":"C","text":"Tomorrow morning"},{"key":"D","text":"Next Friday"}], a: "A", exp: "Thời gian cập bến: 'lock the vessel into Berth 8 at 11:30 PM'." },
          { q: "How many ship-to-shore cranes will operate simultaneously?", opts: [{"key":"A","text":"Two cranes"},{"key":"B","text":"Eight dual-trolley ship-to-shore cranes"},{"key":"C","text":"Twenty cranes"},{"key":"D","text":"Fifty cranes"}], a: "B", exp: "Số lượng cần cẩu: 'eight dual-trolley ship-to-shore cranes will begin unloading simultaneously'." },
          { q: "How many AGVs are deployed for the unloading operation?", opts: [{"key":"A","text":"12 AGVs"},{"key":"B","text":"100 AGVs"},{"key":"C","text":"Forty-eight AGVs"},{"key":"D","text":"200 AGVs"}], a: "C", exp: "Số lượng xe tự hành: 'All forty-eight AGVs completed diagnostic connectivity tests'." }
        ]
      },
      {
        title: "Dialogue 11: FinTech Mobile Payment Security & Biometrics",
        script: "Man: Rachel, our biometric payment authentication feature recorded a 99.98% fraud-prevention rating during Q3.\nWoman: That is impressive, Thomas. How did users respond to the facial recognition checkout flow in our consumer surveys?\nMan: Over 91% of respondents praised the sub-second checkout speed compared to traditional SMS passcodes.\nWoman: Great. Let's schedule the global rollout for iOS and Android on November 15th.",
        questions: [
          { q: "What fraud-prevention rating was achieved during Q3?", opts: [{"key":"A","text":"75.0%"},{"key":"B","text":"85.5%"},{"key":"C","text":"50.0%"},{"key":"D","text":"99.98%"}], a: "D", exp: "Tỷ lệ phòng chống gian lận: '99.98% fraud-prevention rating during Q3'." },
          { q: "What percentage of surveyed users praised checkout speed?", opts: [{"key":"A","text":"Over 91% of respondents"},{"key":"B","text":"45%"},{"key":"C","text":"60%"},{"key":"D","text":"30%"}], a: "A", exp: "Tỷ lệ hài lòng: 'Over 91% of respondents praised the sub-second checkout speed'." },
          { q: "When is the global mobile rollout scheduled?", opts: [{"key":"A","text":"Next year in March"},{"key":"B","text":"On November 15th"},{"key":"C","text":"In January 2028"},{"key":"D","text":"Immediately today"}], a: "B", exp: "Ngày phát hành toàn cầu: 'global rollout... on November 15th'." }
        ]
      },
      {
        title: "Dialogue 12: Commercial Real Estate Lease Renegotiation in London",
        script: "Woman: Arthur, did the building management company accept our proposal for a 5-year lease extension on our Canary Wharf office floors?\nMan: Yes, Victoria. They agreed to freeze the annual rent at £65 per square foot and provide a £250,000 tenant improvement allowance for our green office retrofit.\nWoman: Does the contract permit sub-leasing fifty percent of the fourth floor if our hybrid telecommuting numbers remain high?\nMan: Yes, the sub-leasing clause was approved with no penalty fees provided we give ninety days written notice.",
        questions: [
          { q: "Where is the office property located?", opts: [{"key":"A","text":"In Manchester"},{"key":"B","text":"In Edinburgh"},{"key":"C","text":"In Canary Wharf, London"},{"key":"D","text":"In Dublin"}], a: "C", exp: "Vị trí tòa nhà: 'Canary Wharf office floors'." },
          { q: "What tenant improvement allowance did the landlord provide?", opts: [{"key":"A","text":"£50,000"},{"key":"B","text":"£1,000,000"},{"key":"C","text":"Zero allowance"},{"key":"D","text":"£250,000 allowance for green retrofit"}], a: "D", exp: "Trợ cấp cải tạo: '£250,000 tenant improvement allowance'." },
          { q: "How much written notice is required for sub-leasing?", opts: [{"key":"A","text":"Ninety days written notice"},{"key":"B","text":"30 days"},{"key":"C","text":"Six months"},{"key":"D","text":"One year"}], a: "A", exp: "Thời gian báo trước: 'provided we give ninety days written notice'." }
        ]
      },
      {
        title: "Dialogue 13: Corporate Talent Acquisition for Quantum Computing",
        script: "Man: Ms. Novak, we interviewed five shortlisted candidates for the Senior Quantum Algorithms Researcher position.\nWoman: Did any candidate have extensive experience with fault-tolerant quantum error correction codes?\nMan: Dr. Julian Sterling from MIT published three benchmark papers on surface codes and built practical quantum simulators in Python and Q#.\nWoman: He sounds like an exceptional match. Let's extend an official employment offer with a competitive relocation stipend by Friday afternoon.",
        questions: [
          { q: "What technical specialty is required for the research position?", opts: [{"key":"A","text":"Web design"},{"key":"B","text":"Fault-tolerant quantum error correction codes"},{"key":"C","text":"Office accounting"},{"key":"D","text":"Hotel management"}], a: "B", exp: "Chuyên môn yêu cầu: 'fault-tolerant quantum error correction codes'." },
          { q: "What notable background does Dr. Julian Sterling have?", opts: [{"key":"A","text":"He worked at a retail bank"},{"key":"B","text":"He is a high school teacher"},{"key":"C","text":"MIT researcher with 3 benchmark papers on surface codes"},{"key":"D","text":"He designed consumer mobile apps"}], a: "C", exp: "Hồ sơ của Dr. Sterling: 'from MIT published three benchmark papers on surface codes'." },
          { q: "When will the official employment offer be extended?", opts: [{"key":"A","text":"Next month"},{"key":"B","text":"Next year"},{"key":"C","text":"In two weeks"},{"key":"D","text":"By Friday afternoon"}], a: "D", exp: "Thời gian gửi thư mời nhận việc: 'extend an official employment offer... by Friday afternoon'." }
        ]
      }
    ];

    let p3QCounter = 32;
    part3Dialogues.forEach((d) => {
      d.questions.forEach((qItem) => {
        qs.push({
          id: `tlr4_q${p3QCounter}`,
          partNumber: 3,
          partTitle: "Listening Part 3: Short Conversations",
          section: "LISTENING",
          audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(p3QCounter % 4) + 1}.mp3`,
          passageText: `[Audio Transcript - ${d.title}]\n${d.script}`,
          questionText: `Question ${p3QCounter}: ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a as any,
          explanation: qItem.exp
        });
        p3QCounter++;
      });
    });

    // =========================================================================
    // PART 4: SHORT TALKS (Q71 - Q100: 30 Questions, 10 Talks)
    // =========================================================================
    const part4Talks = [
      {
        title: "Talk 1: Keynote at London FinTech & AI Summit",
        script: "Good morning, global financial delegates and innovators. Welcome to the opening session of the London Global FinTech Summit. My name is Dr. Jonathan Reed, chief technology officer at Quantum Ledger Capital. Today, we are unveiling our decentralized cross-border payment gateway powered by zero-knowledge cryptographic proof. This protocol settles multi-currency trade transactions in under two seconds with 99.999 percent uptime, reducing banking transaction intermediary fees by 82 percent. Please join us at Booth 104 in the exhibition atrium at 2:00 PM for live interactive demonstrations.",
        questions: [
          { q: "Who is the speaker?", opts: [{"key":"A","text":"Dr. Jonathan Reed, CTO at Quantum Ledger Capital"},{"key":"B","text":"A hotel concierge"},{"key":"C","text":"A government tax inspector"},{"key":"D","text":"An airline pilot"}], a: "A", exp: "Diễn giả: 'Dr. Jonathan Reed, chief technology officer at Quantum Ledger Capital'." },
          { q: "What technical feature characterizes the new payment gateway?", opts: [{"key":"A","text":"Requires paper bank checks"},{"key":"B","text":"Settles multi-currency transactions in under two seconds with zero-knowledge cryptography"},{"key":"C","text":"Takes five business days to clear"},{"key":"D","text":"Operates only during bank hours"}], a: "B", exp: "Tính năng: 'settles multi-currency trade transactions in under two seconds'." },
          { q: "What will happen at 2:00 PM at Booth 104?", opts: [{"key":"A","text":"A book signing"},{"key":"B","text":"A catered dinner"},{"key":"C","text":"Live interactive technology demonstrations"},{"key":"D","text":"A press conference for journalists only"}], a: "C", exp: "Hoạt động lúc 2:00 PM: 'join us at Booth 104... for live interactive demonstrations'." }
        ]
      },
      {
        title: "Talk 2: Safety Briefing at Munich EV Gigafactory",
        script: "Attention all visiting engineering delegation members. Before we step onto the automated battery manufacturing floor at Gigafactory Munich, please observe these strict safety protocols. High-visibility safety vests, steel-toed boots, and laser-protective safety goggles must be worn at all times. Please remain within the yellow floor boundary lines, as automated guided transport vehicles (AGVs) navigate these aisles autonomously using LIDAR sensors. Photography and video recording of proprietary cell assembly stations are strictly prohibited. In case of an emergency alarm, proceed directly to Assembly Exit Gate D.",
        questions: [
          { q: "What facility is the delegation visiting?", opts: [{"key":"A","text":"A pharmaceutical laboratory"},{"key":"B","text":"A textile clothing mill"},{"key":"C","text":"A food canning plant"},{"key":"D","text":"Automated battery manufacturing floor at Gigafactory Munich"}], a: "D", exp: "Địa điểm: 'battery manufacturing floor at Gigafactory Munich'." },
          { q: "Why must visitors stay within yellow floor lines?", opts: [{"key":"A","text":"Because automated guided vehicles (AGVs) navigate aisles autonomously"},{"key":"B","text":"To avoid wet paint"},{"key":"C","text":"To take better photos"},{"key":"D","text":"To hear the guide better"}], a: "A", exp: "Lý do: 'automated guided transport vehicles (AGVs) navigate these aisles autonomously'." },
          { q: "What action is strictly prohibited on the manufacturing floor?", opts: [{"key":"A","text":"Wearing safety goggles"},{"key":"B","text":"Photography and video recording of cell assembly stations"},{"key":"C","text":"Asking questions"},{"key":"D","text":"Walking slowly"}], a: "B", exp: "Hành vi bị cấm: 'Photography and video recording... are strictly prohibited'." }
        ]
      },
      {
        title: "Talk 3: Annual Shareholder Meeting & Financial Readout",
        script: "Good afternoon, esteemed shareholders and institutional partners. In fiscal year 2026, Horizon Global Technologies achieved gross operating revenue of 5.8 billion euros, representing a twenty-six percent year-over-year increase. Our operating margin expanded to 34.2%, driven by strong demand for our cloud AI infrastructure solutions and enterprise cybersecurity software. Our board of directors has approved a 15% increase in annual cash dividends to 3.20 euros per share.",
        questions: [
          { q: "What was the company's fiscal 2026 gross revenue?", opts: [{"key":"A","text":"2.1 billion euros"},{"key":"B","text":"10 billion euros"},{"key":"C","text":"5.8 billion euros"},{"key":"D","text":"500 million euros"}], a: "C", exp: "Doanh thu: 'gross operating revenue of 5.8 billion euros'." },
          { q: "What operating margin was achieved?", opts: [{"key":"A","text":"12.5%"},{"key":"B","text":"50.0%"},{"key":"C","text":"20.1%"},{"key":"D","text":"34.2%"}], a: "D", exp: "Biên lợi nhuận: 'operating margin expanded to 34.2%'." },
          { q: "What dividend payout was approved by the board?", opts: [{"key":"A","text":"3.20 euros per share (15% increase)"},{"key":"B","text":"1.00 euro per share"},{"key":"C","text":"5.00 euros per share"},{"key":"D","text":"Zero dividends"}], a: "A", exp: "Cổ tức: 'increase in annual cash dividends to 3.20 euros per share'." }
        ]
      },
      {
        title: "Talk 4: Airport Modernization & Contactless Passenger Corridor",
        script: "Welcome to Zurich Airport Terminal 2. As part of our digital transformation initiative, all international passengers departing on Swiss International Air Lines may now use our contactless biometric facial-recognition gates in Departure Hall B. Baggage drop-off can be completed in under 45 seconds at self-service kiosks 1 through 12. If you require special mobility assistance or oversized baggage verification, please visit Counter A4.",
        questions: [
          { q: "What new service is available in Departure Hall B?", opts: [{"key":"A","text":"Free duty-free chocolate samples"},{"key":"B","text":"Contactless biometric facial-recognition boarding gates"},{"key":"C","text":"Helicopter rental desks"},{"key":"D","text":"Manual passport stamping only"}], a: "B", exp: "Dịch vụ mới: 'contactless biometric facial-recognition gates in Departure Hall B'." },
          { q: "How fast can automated baggage drop-off be completed?", opts: [{"key":"A","text":"In 10 minutes"},{"key":"B","text":"In 5 minutes"},{"key":"C","text":"In under 45 seconds"},{"key":"D","text":"In 2 minutes"}], a: "C", exp: "Tốc độ gửi hành lý tự động: 'completed in under 45 seconds at self-service kiosks'." },
          { q: "Where should passengers go for oversized baggage verification?", opts: [{"key":"A","text":"Information desk B"},{"key":"B","text":"Terminal 1 arrivals"},{"key":"C","text":"The parking garage"},{"key":"D","text":"Counter A4"}], a: "D", exp: "Quầy hỗ trợ hành lý quá khổ: 'visit Counter A4'." }
        ]
      },
      {
        title: "Talk 5: Corporate IT Phishing Defense Webinar Briefing",
        script: "Good morning, team members. All corporate personnel must complete our mandatory interactive Cybersecurity Defense module on the intranet before November 30. The 20-minute course reviews multi-factor authentication hardware keys, zero-trust network protocols, and how to spot spear-phishing email scams targeting executive accounts. Employees achieving a 100% score on the quiz will be entered into our quarterly wellness prize draw.",
        questions: [
          { q: "By when must employees complete the training module?", opts: [{"key":"A","text":"Before November 30"},{"key":"B","text":"By tomorrow noon"},{"key":"C","text":"Next year in June"},{"key":"D","text":"In two months"}], a: "A", exp: "Hạn chót: 'before November 30'." },
          { q: "How long is the interactive training course?", opts: [{"key":"A","text":"5 minutes"},{"key":"B","text":"20 minutes"},{"key":"C","text":"2 hours"},{"key":"D","text":"A full working day"}], a: "B", exp: "Thời lượng: '20-minute course reviews multi-factor authentication'." },
          { q: "What topics are covered in the module?", opts: [{"key":"A","text":"Office desktop computer purchasing"},{"key":"B","text":"Cafeteria lunch ordering"},{"key":"C","text":"Hardware security keys, zero-trust protocols, and phishing defense"},{"key":"D","text":"Travel booking guidelines"}], a: "C", exp: "Nội dung: 'multi-factor authentication hardware keys, zero-trust network protocols, and how to spot spear-phishing'." }
        ]
      },
      {
        title: "Talk 6: Renewable Hydrogen Electrolyzer Facility Launch",
        script: "Distinguished guests, today marks the groundbreaking of the Rotterdam Green Hydrogen Electrolyzer Park. This 200-megawatt PEM electrolyzer facility will produce 25,000 metric tonnes of zero-carbon green hydrogen annually powered entirely by North Sea offshore wind. Commercial delivery of pipeline hydrogen to regional petrochemical refineries is scheduled to begin in October 2027.",
        questions: [
          { q: "What is the capacity of the green hydrogen electrolyzer facility?", opts: [{"key":"A","text":"50 megawatts"},{"key":"B","text":"1,000 megawatts"},{"key":"C","text":"10 megawatts"},{"key":"D","text":"200-megawatt PEM electrolyzer facility"}], a: "D", exp: "Công suất nhà máy: '200-megawatt PEM electrolyzer facility'." },
          { q: "How much green hydrogen will be produced annually?", opts: [{"key":"A","text":"25,000 metric tonnes annually"},{"key":"B","text":"5,000 tonnes"},{"key":"C","text":"100,000 tonnes"},{"key":"D","text":"1 million tonnes"}], a: "A", exp: "Sản lượng hàng năm: 'produce 25,000 metric tonnes of zero-carbon green hydrogen annually'." },
          { q: "When will commercial pipeline delivery begin?", opts: [{"key":"A","text":"Next month"},{"key":"B","text":"In October 2027"},{"key":"C","text":"In 2035"},{"key":"D","text":"Immediately today"}], a: "B", exp: "Thời điểm vận hành thương mại: 'scheduled to begin in October 2027'." }
        ]
      },
      {
        title: "Talk 7: Automotive Telematics & Over-the-Air Software Update",
        script: "Attention service directors and software engineers. Version 5.4 over-the-air firmware update will be pushed to our entire global electric SUV fleet starting tonight at midnight. This update optimizes battery thermal pre-conditioning algorithms, extending cold-weather driving range by twelve percent and decreasing DC ultra-fast charging times from 28 minutes down to 18 minutes.",
        questions: [
          { q: "What vehicle system is optimized in the Version 5.4 update?", opts: [{"key":"A","text":"Windshield wiper speed"},{"key":"B","text":"Radio volume settings"},{"key":"C","text":"Battery thermal pre-conditioning algorithms"},{"key":"D","text":"Door lock sounds"}], a: "C", exp: "Hệ thống tối ưu: 'optimizes battery thermal pre-conditioning algorithms'." },
          { q: "By how much does cold-weather driving range increase?", opts: [{"key":"A","text":"2 percent"},{"key":"B","text":"25 percent"},{"key":"C","text":"50 percent"},{"key":"D","text":"Twelve percent"}], a: "D", exp: "Mức tăng phạm vi hoạt động: 'extending cold-weather driving range by twelve percent'." },
          { q: "To what duration was DC fast-charging time reduced?", opts: [{"key":"A","text":"Down to 18 minutes"},{"key":"B","text":"Down to 5 minutes"},{"key":"C","text":"Down to 1 hour"},{"key":"D","text":"No change"}], a: "A", exp: "Thời gian sạc nhanh mới: 'decreasing DC ultra-fast charging times... down to 18 minutes'." }
        ]
      },
      {
        title: "Talk 8: Medical Device Regulatory Compliance Briefing",
        script: "Good afternoon, clinical trials team. The European Medicines Agency has issued its finalized guidance on artificial intelligence algorithms in diagnostic radiology devices. All technical verification documentation for our AI chest radiograph scanner must be updated to comply with ISO 13485 standards before our annual surveillance audit on January 15, 2027.",
        questions: [
          { q: "What regulatory topic was addressed in the guidance?", opts: [{"key":"A","text":"Hospital catering sanitation"},{"key":"B","text":"AI algorithms in diagnostic radiology devices"},{"key":"C","text":"Wheelchair manufacturing"},{"key":"D","text":"Surgical glove sizing"}], a: "B", exp: "Chủ đề quy định: 'artificial intelligence algorithms in diagnostic radiology devices'." },
          { q: "What international quality standard must the documentation comply with?", opts: [{"key":"A","text":"ISO 9001 only"},{"key":"B","text":"Local building code"},{"key":"C","text":"ISO 13485 standards"},{"key":"D","text":"OSHA generic"}], a: "C", exp: "Tiêu chuẩn chất lượng: 'comply with ISO 13485 standards'." },
          { q: "When is the annual surveillance audit scheduled?", opts: [{"key":"A","text":"Next Friday"},{"key":"B","text":"In late 2029"},{"key":"C","text":"Tomorrow morning"},{"key":"D","text":"On January 15, 2027"}], a: "D", exp: "Thời điểm kiểm toán: 'annual surveillance audit on January 15, 2027'." }
        ]
      },
      {
        title: "Talk 9: Global Supply Chain Port Congestion Advisory",
        script: "This is an urgent operational advisory for all logistics forwarders. Dense fog in the English Channel has caused temporary navigation delays affecting vessel arrivals at the Port of Rotterdam. Container dwell times at Terminal 3 are projected to increase by 24 to 36 hours. Freight forwarders are advised to utilize our intermodal rail shuttle to inland dry ports in Germany to avoid road transport bottlenecks.",
        questions: [
          { q: "What weather condition caused navigation delays at Rotterdam?", opts: [{"key":"A","text":"Dense fog in the English Channel"},{"key":"B","text":"Heavy blizzard"},{"key":"C","text":"Extreme heatwave"},{"key":"D","text":"Flooding rivers"}], a: "A", exp: "Hiện tượng thời tiết: 'Dense fog in the English Channel'." },
          { q: "By how much are container dwell times expected to increase?", opts: [{"key":"A","text":"1 hour"},{"key":"B","text":"24 to 36 hours"},{"key":"C","text":"One week"},{"key":"D","text":"Ten days"}], a: "B", exp: "Thời gian trễ: 'projected to increase by 24 to 36 hours'." },
          { q: "What alternative transit solution is recommended?", opts: [{"key":"A","text":"Air cargo charter flights only"},{"key":"B","text":"Canceling all shipments"},{"key":"C","text":"Intermodal rail shuttle to inland dry ports in Germany"},{"key":"D","text":"Storing cargo on barges indefinitely"}], a: "C", exp: "Giải pháp thay thế: 'utilize our intermodal rail shuttle to inland dry ports in Germany'." }
        ]
      },
      {
        title: "Talk 10: Employee Wellness Program & Flexible Work Policy",
        script: "Good morning, team. We are excited to announce our enhanced Work-Life Balance and Wellness policy effective January 1. Employees in eligible hybrid roles can now elect core remote hours and access a 600-euro annual reimbursement stipend for ergonomic home office equipment or accredited gym memberships. Please submit your equipment receipts via the HR benefits portal by February 15.",
        questions: [
          { q: "What is the annual reimbursement stipend amount?", opts: [{"key":"A","text":"100 euros"},{"key":"B","text":"1,500 euros"},{"key":"C","text":"50 euros"},{"key":"D","text":"600 euros annually"}], a: "D", exp: "Mức hỗ trợ: '600-euro annual reimbursement stipend'." },
          { q: "What eligible items can be reimbursed under the stipend?", opts: [{"key":"A","text":"Ergonomic home office equipment or accredited gym memberships"},{"key":"B","text":"Restaurant dinners"},{"key":"C","text":"Airline tickets"},{"key":"D","text":"Video game consoles"}], a: "A", exp: "Hạng mục thanh toán: 'ergonomic home office equipment or accredited gym memberships'." },
          { q: "By when must receipts be submitted to the HR portal?", opts: [{"key":"A","text":"By tomorrow"},{"key":"B","text":"By February 15"},{"key":"C","text":"Next December"},{"key":"D","text":"In two years"}], a: "B", exp: "Hạn chót nộp hóa đơn: 'via the HR benefits portal by February 15'." }
        ]
      }
    ];

    let p4QCounter = 71;
    part4Talks.forEach((talk) => {
      talk.questions.forEach((qItem) => {
        qs.push({
          id: `tlr4_q${p4QCounter}`,
          partNumber: 4,
          partTitle: "Listening Part 4: Short Talks",
          section: "LISTENING",
          audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(p4QCounter % 4) + 1}.mp3`,
          passageText: `[Audio Transcript - ${talk.title}]\n${talk.script}`,
          questionText: `Question ${p4QCounter}: ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a as any,
          explanation: qItem.exp
        });
        p4QCounter++;
      });
    });

    // =========================================================================
    // PART 5: INCOMPLETE SENTENCES (Q101 - Q130: 30 Questions)
    // =========================================================================
    const part5Items = [
      { q: "The executive committee praised the engineering division for _______ delivering the subsea cable project ahead of the scheduled deadline.", opts: [{"key":"A","text":"successful"},{"key":"B","text":"success"},{"key":"C","text":"successfully"},{"key":"D","text":"succeed"}], a: "C", exp: "Cần trạng từ `successfully` để bổ nghĩa cho động từ phân từ `delivering`." },
      { q: "All prospective vendors must submit their technical proposals _______ 5:00 PM on Friday to be considered for the public infrastructure contract.", opts: [{"key":"A","text":"until"},{"key":"B","text":"while"},{"key":"C","text":"among"},{"key":"D","text":"by"}], a: "D", exp: "Dùng giới từ `by` chỉ mốc thời hạn chót (trước 5:00 PM thứ Sáu)." },
      { q: "Ms. Thornton has demonstrated _______ leadership abilities during the recent enterprise software transition.", opts: [{"key":"A","text":"exceptional"},{"key":"B","text":"exception"},{"key":"C","text":"exceptionally"},{"key":"D","text":"except"}], a: "A", exp: "Cần tính từ `exceptional` (xuất chúng) bổ nghĩa cho danh từ `leadership abilities`." },
      { q: "Neither the regional branch managers _______ the corporate compliance officer anticipated the rapid shift in consumer banking habits.", opts: [{"key":"A","text":"or"},{"key":"B","text":"nor"},{"key":"C","text":"and"},{"key":"D","text":"but"}], a: "B", exp: "Cặp liên từ tương hỗ: `Neither... nor...`." },
      { q: "The new electric vehicle model is _______ more energy-efficient than previous generations due to its advanced solid-state battery.", opts: [{"key":"A","text":"significance"},{"key":"B","text":"signify"},{"key":"C","text":"significantly"},{"key":"D","text":"significant"}], a: "C", exp: "Cần trạng từ `significantly` để bổ nghĩa cho tính từ so sánh hơn `more energy-efficient`." },
      { q: "Employees interested in the remote telecommuting program must obtain written _______ from their department supervisor.", opts: [{"key":"A","text":"approve"},{"key":"B","text":"approving"},{"key":"C","text":"approved"},{"key":"D","text":"approval"}], a: "D", exp: "Cần danh từ `approval` sau tính từ `written`." },
      { q: "_______ the adverse weather conditions at the port, maritime shipping operations resumed without major disruptions.", opts: [{"key":"A","text":"Despite"},{"key":"B","text":"Although"},{"key":"C","text":"Even"},{"key":"D","text":"Whereas"}], a: "A", exp: "Dùng `Despite` đứng trước cụm danh từ (`the adverse weather conditions`)." },
      { q: "The human resources department organized a comprehensive seminar to familiarize new employees _______ corporate data security policies.", opts: [{"key":"A","text":"for"},{"key":"B","text":"with"},{"key":"C","text":"at"},{"key":"D","text":"to"}], a: "B", exp: "Cụm cố định: `familiarize someone with something`." },
      { q: "The quarterly revenue report indicated that online retail sales expanded _______ in the Asia-Pacific territory.", opts: [{"key":"A","text":"substance"},{"key":"B","text":"substantial"},{"key":"C","text":"substantially"},{"key":"D","text":"substantiate"}], a: "C", exp: "Cần trạng từ `substantially` bổ nghĩa cho động từ `expanded`." },
      { q: "Dr. Vance will deliver the keynote address _______ the international logistics conference in Zurich next month.", opts: [{"key":"A","text":"on"},{"key":"B","text":"into"},{"key":"C","text":"from"},{"key":"D","text":"at"}], a: "D", exp: "Dùng giới từ `at` chỉ địa điểm hội nghị (`at the conference`)." },
      { q: "The legal team advised that the commercial lease agreement is contingent _______ city zoning approval.", opts: [{"key":"A","text":"upon"},{"key":"B","text":"into"},{"key":"C","text":"with"},{"key":"D","text":"under"}], a: "A", exp: "Cụm cố định: `contingent upon / on` (tùy thuộc vào)." },
      { q: "The newly installed robotic packaging system operates _______ than the previous manual assembly line.", opts: [{"key":"A","text":"more efficient"},{"key":"B","text":"more efficiently"},{"key":"C","text":"efficiency"},{"key":"D","text":"most efficient"}], a: "B", exp: "So sánh hơn của trạng từ: `more efficiently than`." },
      { q: "All confidential financial files must be stored in _______ encrypted digital archives.", opts: [{"key":"A","text":"secure"},{"key":"B","text":"security"},{"key":"C","text":"securely"},{"key":"D","text":"securing"}], a: "C", exp: "Trạng từ `securely` bổ nghĩa cho phân từ `encrypted`." },
      { q: "The chief technology officer's visionary roadmap has _______ inspired our software development team.", opts: [{"key":"A","text":"great"},{"key":"B","text":"greatness"},{"key":"C","text":"greater"},{"key":"D","text":"greatly"}], a: "D", exp: "Trạng từ `greatly` bổ nghĩa cho động từ `inspired`." },
      { q: "Each prospective bidder must provide three professional _______ from previous municipal projects.", opts: [{"key":"A","text":"references"},{"key":"B","text":"refer"},{"key":"C","text":"referred"},{"key":"D","text":"referring"}], a: "A", exp: "Cần danh từ số nhiều `references` (thư giới thiệu)." },
      { q: "The laboratory cleanroom maintains an environment _______ free of airborne particulate contaminants.", opts: [{"key":"A","text":"virtual"},{"key":"B","text":"virtually"},{"key":"C","text":"virtuality"},{"key":"D","text":"virtualize"}], a: "B", exp: "Trạng từ `virtually` bổ nghĩa cho tính từ `free`." },
      { q: "Because of maintenance on the train tracks, commuters are advised to seek _______ routes.", opts: [{"key":"A","text":"alternatively"},{"key":"B","text":"alternate"},{"key":"C","text":"alternative"},{"key":"D","text":"alternation"}], a: "C", exp: "Tính từ `alternative` (thay thế) bổ nghĩa cho danh từ `routes`." },
      { q: "The marketing director suggested _______ a consumer focus group before launching the advertising campaign.", opts: [{"key":"A","text":"convene"},{"key":"B","text":"convened"},{"key":"C","text":"convention"},{"key":"D","text":"convening"}], a: "D", exp: "Cấu trúc `suggest + V_ing` -> cần `convening`." },
      { q: "The airline passenger was grateful for the flight attendant's _______ assistance during the flight delay.", opts: [{"key":"A","text":"courteous"},{"key":"B","text":"courteously"},{"key":"C","text":"courtesy"},{"key":"D","text":"court"}], a: "A", exp: "Tính từ `courteous` (lịch sự, nhã nhặn) bổ nghĩa cho `assistance`." },
      { q: "Please ensure that your travel insurance policy _______ medical evacuation coverage for international trips.", opts: [{"key":"A","text":"include"},{"key":"B","text":"includes"},{"key":"C","text":"including"},{"key":"D","text":"inclusion"}], a: "B", exp: "Động từ số ít ở hiện tại đơn `includes` hòa hợp với chủ ngữ `policy`." },
      { q: "The financial auditor discovered a minor _______ between the purchase orders and the supplier invoices.", opts: [{"key":"A","text":"discrepant"},{"key":"B","text":"discrepantly"},{"key":"C","text":"discrepancy"},{"key":"D","text":"discrete"}], a: "C", exp: "Cần danh từ `discrepancy` (sự sai lệch, khác biệt)." },
      { q: "The commercial real estate broker negotiated _______ to secure the lowest square-foot rental rate.", opts: [{"key":"A","text":"tireless"},{"key":"B","text":"tired"},{"key":"C","text":"tiredness"},{"key":"D","text":"tirelessly"}], a: "D", exp: "Trạng từ `tirelessly` (không mệt mỏi) bổ nghĩa cho `negotiated`." },
      { q: "Our corporate headquarters is located _______ walking distance of the central railway station.", opts: [{"key":"A","text":"within"},{"key":"B","text":"among"},{"key":"C","text":"between"},{"key":"D","text":"along"}], a: "A", exp: "Cụm từ: `within walking distance of` (trong khoảng cách đi bộ đến)." },
      { q: "The newly hired biomedical engineer has demonstrated _______ competence in mass spectrometry analysis.", opts: [{"key":"A","text":"remarkably"},{"key":"B","text":"remarkable"},{"key":"C","text":"remark"},{"key":"D","text":"remarked"}], a: "B", exp: "Tính từ `remarkable` (đáng kinh ngạc) bổ nghĩa cho danh từ `competence`." },
      { q: "The executive committee decided to _______ the launch of the smart thermostat until software bugs are resolved.", opts: [{"key":"A","text":"delayed"},{"key":"B","text":"delaying"},{"key":"C","text":"delay"},{"key":"D","text":"delays"}], a: "C", exp: "Cấu trúc `decided to + V_infinitive` -> cần `delay`." },
      { q: "The factory's daily output reached an _______ high level following the installation of automated conveyor belts.", opts: [{"key":"A","text":"unprecedentedly"},{"key":"B","text":"precedent"},{"key":"C","text":"precedents"},{"key":"D","text":"unprecedented"}], a: "D", exp: "Tính từ `unprecedented` (chưa từng có) bổ nghĩa cho cụm danh từ `high level`." },
      { q: "The customer service department responded to user inquiries _______ and professionally.", opts: [{"key":"A","text":"promptly"},{"key":"B","text":"prompt"},{"key":"C","text":"promptness"},{"key":"D","text":"prompting"}], a: "A", exp: "Trạng từ `promptly` song hành với `professionally` bổ nghĩa cho `responded`." },
      { q: "Neither the CEO _______ the CFO attended the preliminary vendor demonstration.", opts: [{"key":"A","text":"or"},{"key":"B","text":"nor"},{"key":"C","text":"and"},{"key":"D","text":"but"}], a: "B", exp: "Cấu trúc tương hỗ: `Neither... nor...`." },
      { q: "The research team published their findings in a prestigious _______ journal of biomedical sciences.", opts: [{"key":"A","text":"peer-reviewing"},{"key":"B","text":"peer review"},{"key":"C","text":"peer-reviewed"},{"key":"D","text":"peers reviewed"}], a: "C", exp: "Tính từ ghép `peer-reviewed` (được thẩm định bởi chuyên gia cùng ngành)." },
      { q: "Employees who work overtime on national holidays will be compensated _______ double their standard hourly rate.", opts: [{"key":"A","text":"in"},{"key":"B","text":"on"},{"key":"C","text":"with"},{"key":"D","text":"at"}], a: "D", exp: "Giới từ chỉ mức tỷ lệ: `compensated at double their standard rate`." }
    ];

    let p5QCounter = 101;
    part5Items.forEach((item) => {
      qs.push({
        id: `tlr4_q${p5QCounter}`,
        partNumber: 5,
        partTitle: "Reading Part 5: Incomplete Sentences",
        section: "READING",
        questionText: `Question ${p5QCounter}: ${item.q}`,
        options: item.opts as any,
        correctAnswer: item.a as any,
        explanation: item.exp
      });
      p5QCounter++;
    });

    // =========================================================================
    // PART 6: TEXT COMPLETION (Q131 - Q146: 16 Questions, 4 Passages)
    // =========================================================================
    const part6Passages = [
      {
        title: "Memo 1: Enterprise Cloud ERP Platform Migration",
        text: "MEMORANDUM\nTO: All Operational Staff\nFROM: Chief Information Officer\nDATE: October 14, 2026\nSUBJECT: Scheduled Enterprise Cloud ERP Platform Migration\n\nWe are pleased to announce that our transition to the SAP S/4HANA Cloud ERP suite will take place this weekend. This unified platform will _______ (Q131) departmental workflows across procurement, financial auditing, and logistics tracking. The legacy database will become read-only starting Friday at 6:00 PM. _______ (Q132). All employees are required to complete the mandatory interactive video tutorial on the intranet portal prior to Monday morning. Should you encounter any access permissions errors, please submit a ticket to the IT help desk _______ (Q133). We anticipate that this platform will significantly enhance our operational _______ (Q134) throughout the upcoming fiscal year.",
        questions: [
          { q: "Select the word that best fits blank (Q131).", opts: [{"key":"A","text":"streamline"},{"key":"B","text":"streamlined"},{"key":"C","text":"streamlining"},{"key":"D","text":"streamlines"}], a: "A", exp: "Sau trợ động từ `will` cần động từ nguyên mẫu `streamline` (tinh giản hóa)." },
          { q: "Select the sentence that best fits blank (Q132).", opts: [{"key":"A","text":"We are closing the cafeteria for renovation."},{"key":"B","text":"The new platform will go live automatically on Monday at 7:00 AM."},{"key":"C","text":"Please submit your vacation requests."},{"key":"D","text":"The parking lot is full."}], a: "B", exp: "Câu nối logic thông báo thời điểm hệ thống mới hoạt động lúc 7:00 AM thứ Hai." },
          { q: "Select the word that best fits blank (Q133).", opts: [{"key":"A","text":"prompt"},{"key":"B","text":"prompting"},{"key":"C","text":"promptly"},{"key":"D","text":"promptness"}], a: "C", exp: "Cần trạng từ `promptly` (nhanh chóng) để bổ nghĩa cho hành động `submit a ticket`." },
          { q: "Select the word that best fits blank (Q134).", opts: [{"key":"A","text":"efficient"},{"key":"B","text":"efficiently"},{"key":"C","text":"efficiencies"},{"key":"D","text":"efficiency"}], a: "D", exp: "Cần danh từ `efficiency` (hiệu quả hoạt động) sau tính từ `operational`." }
        ]
      },
      {
        title: "Memo 2: Corporate Facility Energy Retrofit Notice",
        text: "FACILITY MANAGEMENT BULLETIN\nTO: All Building Inhabitants\nFROM: Director of Corporate Sustainability\nDATE: October 20, 2026\nSUBJECT: High-Efficiency LED & HVAC Retrofit Window\n\nBeginning Saturday at 8:00 AM, contractors will install energy-saving LED fixtures and smart thermostatic dampers in Building 3. This modernization will _______ (Q135) facility energy consumption by twenty-two percent. Power to secondary lighting circuits will be _______ (Q136) intermittently throughout the weekend. _______ (Q137). All staff members must shut down desktop workstations before departing on Friday. Normal building occupancy will resume _______ (Q138) on Monday morning at 6:30 AM.",
        questions: [
          { q: "Select the word that best fits blank (Q135).", opts: [{"key":"A","text":"reduce"},{"key":"B","text":"reduction"},{"key":"C","text":"reducing"},{"key":"D","text":"reduced"}], a: "A", exp: "Sau `will` cần động từ nguyên mẫu `reduce` (cắt giảm điện năng tiêu thụ)." },
          { q: "Select the word that best fits blank (Q136).", opts: [{"key":"A","text":"interrupt"},{"key":"B","text":"interrupted"},{"key":"C","text":"interrupting"},{"key":"D","text":"interruption"}], a: "B", exp: "Cấu trúc bị động `will be interrupted` (sẽ bị gián đoạn ngắt quãng)." },
          { q: "Select the sentence that best fits blank (Q137).", opts: [{"key":"A","text":"The executive boardroom has new carpet."},{"key":"B","text":"Lunch will be delivered to personal desks."},{"key":"C","text":"Emergency battery backup lighting will remain fully functional at all times."},{"key":"D","text":"Parking passes are expired."}], a: "C", exp: "Câu bổ trợ an toàn: hệ thống chiếu sáng sự cố dự phòng bằng pin vẫn hoạt động đầy đủ." },
          { q: "Select the word that best fits blank (Q138).", opts: [{"key":"A","text":"smooth"},{"key":"B","text":"smoothness"},{"key":"C","text":"smoothed"},{"key":"D","text":"smoothly"}], a: "D", exp: "Cần trạng từ `smoothly` (một cách suôn sẻ) bổ nghĩa cho động từ `resume`." }
        ]
      },
      {
        title: "Memo 3: Pharmaceutical Quality Assurance Protocol Update",
        text: "QUALITY CONTROL DIRECTIVE\nTO: Cleanroom Manufacturing Supervisors\nFROM: Head of Regulatory Compliance\nDATE: October 28, 2026\nSUBJECT: Implementation of Automated Electronic Batch Records\n\nEffective November 1, all sterile fill-finish operations on Line 2 must _______ (Q139) with the newly established Electronic Batch Record (eBR) protocols. This digital workflow eliminates manual paper transcription errors and guarantees _______ (Q140) data integrity for regulatory audits. _______ (Q141). Shift technicians who have not completed their certification training must contact the training coordinator _______ (Q142) to schedule an orientation session.",
        questions: [
          { q: "Select the word that best fits blank (Q139).", opts: [{"key":"A","text":"comply"},{"key":"B","text":"compliance"},{"key":"C","text":"compliant"},{"key":"D","text":"complying"}], a: "A", exp: "Cụm động từ: `must comply with` (phải tuân thủ theo)." },
          { q: "Select the word that best fits blank (Q140).", opts: [{"key":"A","text":"absolutely"},{"key":"B","text":"absolute"},{"key":"C","text":"absoluteness"},{"key":"D","text":"absolve"}], a: "B", exp: "Cần tính từ `absolute` (tuyệt đối) để bổ nghĩa cho danh từ `data integrity`." },
          { q: "Select the sentence that best fits blank (Q141).", opts: [{"key":"A","text":"The employee breakroom coffee machine is being repaired."},{"key":"B","text":"Safety boots can be purchased in the lobby."},{"key":"C","text":"Real-time sensor telemetry will automatically sync with the federal compliance database."},{"key":"D","text":"Office keys must be returned upon departure."}], a: "C", exp: "Câu bổ trợ công nghệ eBR: cảm biến thời gian thực tự động đồng bộ hóa với cơ sở dữ liệu tuân thủ." },
          { q: "Select the word that best fits blank (Q142).", opts: [{"key":"A","text":"immediate"},{"key":"B","text":"immediacy"},{"key":"C","text":"immediateness"},{"key":"D","text":"immediately"}], a: "D", exp: "Trạng từ `immediately` (ngay lập tức) bổ nghĩa cho hành động liên hệ." }
        ]
      },
      {
        title: "Memo 4: Cross-Border Logistics Freight Insurance Advisory",
        text: "SHIPPING ADVISORY NOTICE\nTO: International Freight Forwarding Partners\nFROM: Global Logistics Directorate\nDATE: November 2, 2026\nSUBJECT: Enhanced Transit Insurance Requirements for High-Value Electronics\n\nPlease note that all international maritime cargo shipments containing semiconductor wafers or micro-optical assemblies must carry all-risk comprehensive transit insurance _______ (Q143) to 110% of CIF value. This requirement protects consignees against _______ (Q144) temperature excursions or mechanical shock during transit. _______ (Q145). Forwarders must upload verified certificates of insurance to the single-window port portal _______ (Q146) before vessel departure.",
        questions: [
          { q: "Select the word that best fits blank (Q143).", opts: [{"key":"A","text":"equivalent"},{"key":"B","text":"equivalently"},{"key":"C","text":"equivalence"},{"key":"D","text":"equate"}], a: "A", exp: "Cụm tính từ: `insurance equivalent to 110% of CIF value` (bảo hiểm tương đương 110% giá trị CIF)." },
          { q: "Select the word that best fits blank (Q144).", opts: [{"key":"A","text":"unforeseeable"},{"key":"B","text":"unforeseen"},{"key":"C","text":"unforeseeing"},{"key":"D","text":"unforesaw"}], a: "B", exp: "Tính từ phân từ `unforeseen` (không lường trước được) bổ nghĩa cho `temperature excursions`." },
          { q: "Select the sentence that best fits blank (Q145).", opts: [{"key":"A","text":"The ship captain is celebrating ten years of service."},{"key":"B","text":"New uniforms will be issued to dock workers next month."},{"key":"C","text":"Containers without verified telemetry logs will be rejected at the terminal gate."},{"key":"D","text":"Harbor crane operators work eight-hour shifts."}], a: "C", exp: "Câu chế tài quy định: container không có nhật ký telemetry xác thực sẽ bị từ chối tại cổng cảng." },
          { q: "Select the word that best fits blank (Q146).", opts: [{"key":"A","text":"direct"},{"key":"B","text":"direction"},{"key":"C","text":"directness"},{"key":"D","text":"directly"}], a: "D", exp: "Trạng từ `directly` (trực tiếp) bổ nghĩa cho động từ `upload`." }
        ]
      }
    ];

    let p6QCounter = 131;
    part6Passages.forEach((p) => {
      p.questions.forEach((qItem) => {
        qs.push({
          id: `tlr4_q${p6QCounter}`,
          partNumber: 6,
          partTitle: "Reading Part 6: Text Completion",
          section: "READING",
          passageText: p.text,
          questionText: qItem.q,
          options: qItem.opts as any,
          correctAnswer: qItem.a as any,
          explanation: qItem.exp
        });
        p6QCounter++;
      });
    });

    // =========================================================================
    // PART 7: READING COMPREHENSION (Q147 - Q200: 54 Questions)
    // =========================================================================
    const part7Passages = [
      {
        type: "Single Passage (Bill of Lading)",
        passage: `PACIFIC HORIZON LOGISTICS — COMMERCIAL BILL OF LADING\n\nTracking Number: PHL-2026-88914\nCarrier: Pacific Horizon Maritime Lines\nVessel: MV Northern Voyager (Voyage 42B)\nPort of Loading: Port of Yokohama, Japan\nPort of Discharge: Port of Vancouver, Canada\nEstimated Arrival Date: November 12, 2026\n\nConsignee: Apex Microelectronics Canada Ltd., 450 Innovation Parkway, Richmond, BC\nShipper: Kyoto Optical Components Corp., Kyoto, Japan\n\nCargo Details:\n• Container No: CRXU-992014-8 (40ft High Cube Climate-Controlled Reefer)\n• Description: Precision Optical Wafer Inspection Lenses & Laser Sensors\n• Gross Weight: 14,250 kg\n• Temperature Setting: Maintained at a constant 20°C (±0.5°C)\n• Declared Customs Value: $1,850,000 CAD\n• Special Handling: Fragile electronic optical instruments. Do not expose to moisture.`,
        questions: [
          { q: "What is the destination port of the shipment?", opts: [{"key":"A","text":"Port of Vancouver, Canada"},{"key":"B","text":"Port of Yokohama"},{"key":"C","text":"Port of Seattle"},{"key":"D","text":"Port of Los Angeles"}], a: "A", exp: "Cảng đích: 'Port of Discharge: Port of Vancouver, Canada'." },
          { q: "What temperature requirement is specified for the cargo container?", opts: [{"key":"A","text":"Frozen below 0°C"},{"key":"B","text":"Maintained at a constant 20°C (±0.5°C)"},{"key":"C","text":"Ambient outdoor temperature"},{"key":"D","text":"Heated above 40°C"}], a: "B", exp: "Nhiệt độ quy định: 'Maintained at a constant 20°C (±0.5°C)'." },
          { q: "What type of goods are contained in the shipment?", opts: [{"key":"A","text":"Fresh seafood"},{"key":"B","text":"Automobile tires"},{"key":"C","text":"Precision Optical Wafer Inspection Lenses & Laser Sensors"},{"key":"D","text":"Furniture lumber"}], a: "C", exp: "Hàng hóa: 'Precision Optical Wafer Inspection Lenses & Laser Sensors'." }
        ]
      },
      {
        type: "Single Passage (Conference Schedule)",
        passage: `DUBLIN AI HARDWARE SUMMIT — OFFICIAL AGENDA\nVenue: Royal Dublin Convention Palace, Dublin, Ireland\nDate: Thursday, November 19, 2026\n\nMorning Sessions (Auditorium 1):\n• 08:30 – 09:00: Registration & Delegate Coffee Reception\n• 09:00 – 10:15: Keynote: 'Next-Generation Direct-to-Chip Liquid Cooling for AI Datacenters' by Dr. Liam O'Connor\n• 10:15 – 10:45: Morning Networking Break & Exhibition Booth Tours\n• 10:45 – 12:15: Executive Panel: Mitigating High-Density Thermal Throttling in 3nm Semiconductor Arrays\n\nAfternoon Workshops (Breakout Rooms):\n• 12:15 – 13:45: Delegate Luncheon (Grand Dining Hall)\n• 13:45 – 15:15: Track A: Immersion Cooling Fluid Chemistry & Environmental Safety (Room 204)\n• 13:45 – 15:15: Track B: Microgrid Power Distribution & 48V Rack Architecture (Room 208)\n• 15:30 – 17:00: Closing Keynote: Sustainable Hyperscale Infrastructure by 2030\n• 17:00 – 18:30: Evening Cocktail Reception & Networking Gala (Terrace Lounge)`,
        questions: [
          { q: "What is the topic of Dr. Liam O'Connor's morning keynote speech?", opts: [{"key":"A","text":"Office furniture procurement"},{"key":"B","text":"Mobile phone software design"},{"key":"C","text":"Hotel catering management"},{"key":"D","text":"Direct-to-Chip Liquid Cooling for AI Datacenters"}], a: "D", exp: "Chủ đề bài phát biểu: 'Direct-to-Chip Liquid Cooling for AI Datacenters'." },
          { q: "Where will the delegate luncheon take place at 12:15?", opts: [{"key":"A","text":"In the Grand Dining Hall"},{"key":"B","text":"In Breakout Room 204"},{"key":"C","text":"At the Terrace Lounge"},{"key":"D","text":"In Auditorium 1"}], a: "A", exp: "Địa điểm ăn trưa: 'Delegate Luncheon (Grand Dining Hall)'." },
          { q: "Which afternoon workshop session will be held in Room 204?", opts: [{"key":"A","text":"Track B: Microgrid Power Distribution"},{"key":"B","text":"Track A: Immersion Cooling Fluid Chemistry & Environmental Safety"},{"key":"C","text":"Registration reception"},{"key":"D","text":"The evening cocktail gala"}], a: "B", exp: "Phiên hội thảo phòng 204: 'Track A: Immersion Cooling Fluid Chemistry & Environmental Safety'." },
          { q: "Where will the concluding evening cocktail reception be held at 17:00?", opts: [{"key":"A","text":"In the parking lot"},{"key":"B","text":"In Room 208"},{"key":"C","text":"At the Terrace Lounge"},{"key":"D","text":"At Dublin Airport"}], a: "C", exp: "Địa điểm tiệc tối: 'Evening Cocktail Reception & Networking Gala (Terrace Lounge)'." }
        ]
      },
      {
        type: "Double Passage (Job Advert & Application Email)",
        passage: `[DOCUMENT 1: JOB OPENING ADVERTISEMENT]\nPosition: Senior Power Systems Engineer\nEmployer: Apex Clean Energy Solutions (Austin, TX)\nDepartment: Grid Storage & Renewable Microgrids\n\nJob Description:\nApex Clean Energy is seeking a Senior Power Systems Engineer to lead the design and grid interconnection of utility-scale battery energy storage systems (BESS, 50MW+ capacity) across Texas and the Southwest. Key duties include load flow simulation, PSCAD modeling, and compliance filings with ERCOT grid interconnection standards.\n\nQualifications:\n- B.S. or M.S. in Electrical Engineering (Power Systems focus preferred)\n- Minimum 6 years of experience in high-voltage utility substation or renewable grid integration\n- Active Professional Engineer (PE) license in Texas is highly desirable\n- Submit CV and cover letter to careers@apexcleanenergy.com before November 20, 2026.\n\n[DOCUMENT 2: APPLICANT COVER LETTER EMAIL]\nTo: careers@apexcleanenergy.com\nFrom: michael.chang@gridtech.net\nDate: November 10, 2026\nSubject: Senior Power Systems Engineer Application — Michael Chang, PE\n\nDear Hiring Committee,\n\nI am writing to apply for the Senior Power Systems Engineer role at Apex Clean Energy. I am a licensed Professional Engineer in the State of Texas with eight years of experience specializing in high-voltage utility interconnection for 100MW+ solar and battery microgrids.\n\nIn my previous role at Lone Star Power Engineering, I led PSCAD transient stability modeling for three ERCOT-connected 60MW battery storage projects, securing full interconnection approval with zero technical deficiency notices. I am excited about the opportunity to contribute my power engineering expertise to Apex Clean Energy's expanding portfolio.\n\nSincerely,\nMichael Chang, PE`,
        questions: [
          { q: "What capacity battery energy storage systems will the engineer work on at Apex Clean Energy?", opts: [{"key":"A","text":"Under 5MW"},{"key":"B","text":"Small residential batteries only"},{"key":"C","text":"Automotive 12V batteries"},{"key":"D","text":"Utility-scale systems (50MW+ capacity)"}], a: "D", exp: "Quy mô hệ thống lưu trữ: 'utility-scale battery energy storage systems (BESS, 50MW+ capacity)'." },
          { q: "How many years of relevant power engineering experience does Michael Chang possess?", opts: [{"key":"A","text":"8 years of experience"},{"key":"B","text":"2 years"},{"key":"C","text":"15 years"},{"key":"D","text":"20 years"}], a: "A", exp: "Số năm kinh nghiệm: 'licensed Professional Engineer... with eight years of experience'." },
          { q: "What software modeling expertise did Michael Chang emphasize in his email?", opts: [{"key":"A","text":"Graphic photo editing"},{"key":"B","text":"PSCAD transient stability modeling"},{"key":"C","text":"Spreadsheet accounting"},{"key":"D","text":"Website coding in HTML"}], a: "B", exp: "Kỹ năng phần mềm mô phỏng: 'led PSCAD transient stability modeling'." },
          { q: "When did Michael Chang submit his application cover letter?", opts: [{"key":"A","text":"October 14, 2026"},{"key":"B","text":"November 20, 2026"},{"key":"C","text":"November 10, 2026"},{"key":"D","text":"December 1, 2026"}], a: "C", exp: "Ngày nộp hồ sơ: 'Date: November 10, 2026'." },
          { q: "What professional credential does Michael Chang hold in the State of Texas?", opts: [{"key":"A","text":"Commercial truck driver's license"},{"key":"B","text":"Certified public accountant"},{"key":"C","text":"Medical doctor"},{"key":"D","text":"Licensed Professional Engineer (PE)"}], a: "D", exp: "Chứng chỉ hành nghề: 'licensed Professional Engineer (PE) in the State of Texas'." }
        ]
      },
      {
        type: "Double Passage (Commercial Real Estate Lease & Tenant Notice)",
        passage: `[DOCUMENT 1: OFFICE LEASE AGREEMENT SUMMARY]\nProperty: Apex Innovation Tower, Floors 14–16 (75,000 sq ft)\nLandlord: Horizon Commercial Real Estate Ltd., London\nTenant: Quantum Ledger Capital UK\n\nKey Commercial Terms:\n- Lease Term: 7 Years (Commencing January 1, 2027)\n- Annual Rent: £62.50 per square foot (£4,687,500 annually)\n- Tenant Improvement Allowance: £450,000 contributed by Landlord for LEED Platinum office interior retrofit\n- Sub-Leasing Rights: Tenant may sub-lease up to 35% of leased space with 60 days prior written notice to Landlord\n- Security Deposit: £780,000 held in an escrow account with Barclays Bank.\n\n[DOCUMENT 2: TENANT SUB-LEASING NOTIFICATION]\nTo: Horizon Commercial Real Estate Ltd.\nFrom: Facilities Director, Quantum Ledger Capital UK\nDate: November 15, 2026\nSubject: Official Notice of Sub-Lease for Floor 16 (North Wing)\n\nDear Landlord Management Team,\n\nIn accordance with Section 8.2 of our Master Lease Agreement, we hereby give official written notice that Quantum Ledger Capital intends to sub-lease 18,000 square feet on Floor 16 (North Wing) to BioTech Synthetics Ltd., effective March 1, 2027. BioTech Synthetics is a certified corporate tenant in good standing, and full corporate financial statements are attached for your standard underwriting review.`,
        questions: [
          { q: "What is the total leased floor space across Floors 14–16?", opts: [{"key":"A","text":"75,000 sq ft"},{"key":"B","text":"25,000 sq ft"},{"key":"C","text":"150,000 sq ft"},{"key":"D","text":"500,000 sq ft"}], a: "A", exp: "Diện tích thuê: 'Floors 14–16 (75,000 sq ft)'." },
          { q: "How much did the Landlord contribute for the tenant improvement allowance?", opts: [{"key":"A","text":"£100,000"},{"key":"B","text":"£450,000 for LEED Platinum retrofit"},{"key":"C","text":"£1,000,000"},{"key":"D","text":"Zero"}], a: "B", exp: "Khoản hỗ trợ cải tạo: 'Tenant Improvement Allowance: £450,000'." },
          { q: "What company will sub-lease space on Floor 16 starting March 1, 2027?", opts: [{"key":"A","text":"Apex Clean Energy"},{"key":"B","text":"Barclays Bank"},{"key":"C","text":"BioTech Synthetics Ltd."},{"key":"D","text":"Horizon Real Estate"}], a: "C", exp: "Đơn vị thuê lại: 'sub-lease 18,000 square feet on Floor 16... to BioTech Synthetics Ltd.'." },
          { q: "How much square footage is being sub-leased on Floor 16?", opts: [{"key":"A","text":"5,000 sq ft"},{"key":"B","text":"35,000 sq ft"},{"key":"C","text":"75,000 sq ft"},{"key":"D","text":"18,000 sq ft"}], a: "D", exp: "Diện tích cho thuê lại: 'sub-lease 18,000 square feet'." },
          { q: "How much notice is required under the contract for sub-leasing?", opts: [{"key":"A","text":"60 days prior written notice"},{"key":"B","text":"30 days"},{"key":"C","text":"90 days"},{"key":"D","text":"One year"}], a: "A", exp: "Thời gian báo trước: 'with 60 days prior written notice to Landlord'." }
        ]
      },
      {
        type: "Triple Passage: Semiconductor Fab Equipment Procurement (Q186 - Q190)",
        passage: `[DOCUMENT 1: REQUEST FOR TENDER (RFT)]\nApex Semiconductor Foundry (Dresden, Germany) invites competitive sealed bids for the procurement of six Advanced Extreme Ultraviolet (EUV) Wafer Stepper Lithography Systems for our Cleanroom Module 5 expansion. Bids must include equipment delivery, calibration, and a 3-year comprehensive on-site service level agreement (SLA) with guaranteed 99.8% machine uptime. Deadline: September 30, 2026.\n\n[DOCUMENT 2: TECHNICAL PROPOSAL SUMMARY]\nASML Optical Systems Inc. (Veldhoven, Netherlands)\nProposal Ref: ASML-EUV-2026-44\nEquipment: 6x Twinscan EUV Lithography Scanners (Model NXE:3800E)\nTotal Contract Value: €210,000,000 (includes precision installation, cleanroom robotics, and 24/7 dedicated engineering support staff on-site in Dresden).\nDelivery Timeline: Staged delivery commencing January 15, 2027, with final operational sign-off by April 30, 2027.\n\n[DOCUMENT 3: CONTRACT AWARD NOTIFICATION LETTER]\nOctober 12, 2026\nTo: ASML Optical Systems Inc.\nWe are pleased to inform you that Apex Semiconductor Foundry has formally selected your proposal (ASML-EUV-2026-44) for our Cleanroom Module 5 expansion. Our procurement committee was particularly impressed with your guaranteed 4-hour emergency technician dispatch SLA. Please find enclosed the bilateral master purchase agreement.`,
        questions: [
          { q: "Where is the Cleanroom Module 5 expansion located?", opts: [{"key":"A","text":"In Veldhoven"},{"key":"B","text":"In Dresden, Germany"},{"key":"C","text":"In Tokyo"},{"key":"D","text":"In Austin"}], a: "B", exp: "Địa điểm nhà máy: 'Apex Semiconductor Foundry (Dresden, Germany)'." },
          { q: "How many EUV lithography scanner units were ordered?", opts: [{"key":"A","text":"2 units"},{"key":"B","text":"10 units"},{"key":"C","text":"Six Advanced EUV Wafer Stepper systems"},{"key":"D","text":"20 units"}], a: "C", exp: "Số lượng thiết bị: 'procurement of six Advanced Extreme Ultraviolet (EUV) Wafer Stepper Lithography Systems'." },
          { q: "What is the total contract value of the winning proposal?", opts: [{"key":"A","text":"€50,000,000"},{"key":"B","text":"€500,000,000"},{"key":"C","text":"€1,000,000,000"},{"key":"D","text":"€210,000,000"}], a: "D", exp: "Giá trị hợp đồng: 'Total Contract Value: €210,000,000'." },
          { q: "When is the final operational sign-off expected?", opts: [{"key":"A","text":"By April 30, 2027"},{"key":"B","text":"January 15, 2027"},{"key":"C","text":"September 30, 2026"},{"key":"D","text":"December 2028"}], a: "A", exp: "Thời hạn nghiệm thu cuối cùng: 'final operational sign-off by April 30, 2027'." },
          { q: "What feature of the proposal was especially praised in Document 3?", opts: [{"key":"A","text":"Cheapest price"},{"key":"B","text":"Guaranteed 4-hour emergency technician dispatch SLA"},{"key":"C","text":"Free spare parts"},{"key":"D","text":"Color of the machines"}], a: "B", exp: "Điểm được khen ngợi: 'particularly impressed with your guaranteed 4-hour emergency technician dispatch SLA'." }
        ]
      },
      {
        type: "Triple Passage: Automated Cold Chain Logistics Infrastructure",
        passage: `[DOCUMENT 1: COLD CHAIN WAREHOUSE NOTICE]\nNordic Logistics AB (Stockholm, Sweden) announces the opening of its 40,000-square-meter automated pharmaceutical cold-storage warehouse at Arlanda Logistics Hub. The facility features automated storage and retrieval systems (ASRS) operating across three temperature chambers: ambient (+15°C to +25°C), cold (+2°C to +8°C), and ultra-low cryogenic (-80°C).\n\n[DOCUMENT 2: CLIENT QUALITY AUDIT SUMMARY]\nClient: Karolinska Biologics International\nAudit Scope: Validation of -80°C Cryogenic Chamber and Automated AGV Transfer Lines\nFindings: Temperature logging telemetry showed zero excursions during 72-hour stress testing. Automated liquid nitrogen backup injection activated within 12 seconds during simulated power interruption tests.\nRecommendation: Issue full vendor qualification certificate.\n\n[DOCUMENT 3: EXECUTIVE MEMO]\nTo: Karolinska Biologics Board\nFrom: Director of Global Supply Chain\nDate: November 18, 2026\nSubject: Master Storage Agreement Execution with Nordic Logistics AB\n\nFollowing our successful audit at the Arlanda facility, we have signed a 3-year master storage contract guaranteeing 5,000 cryogenic pallet positions for our oncology biologic pipeline, delivering 32% annual cost efficiency over our previous distributor.`,
        questions: [
          { q: "Where is the automated cold chain facility located?", opts: [{"key":"A","text":"In Dublin, Ireland"},{"key":"B","text":"In Munich, Germany"},{"key":"C","text":"At Arlanda Logistics Hub in Stockholm, Sweden"},{"key":"D","text":"In Paris, France"}], a: "C", exp: "Địa điểm kho lạnh: 'Arlanda Logistics Hub (Stockholm, Sweden)'." },
          { q: "What temperature chambers are available at the facility?", opts: [{"key":"A","text":"Heated chambers only"},{"key":"B","text":"Underwater storage"},{"key":"C","text":"Open air storage only"},{"key":"D","text":"Ambient (+15°C to +25°C), cold (+2°C to +8°C), and ultra-low cryogenic (-80°C)"}], a: "D", exp: "Các phân khu nhiệt độ: 'ambient (+15°C to +25°C), cold (+2°C to +8°C), and ultra-low cryogenic (-80°C)'." },
          { q: "How fast did backup liquid nitrogen injection activate during simulated power loss?", opts: [{"key":"A","text":"Within 12 seconds"},{"key":"B","text":"In 10 minutes"},{"key":"C","text":"In 1 hour"},{"key":"D","text":"It failed to activate"}], a: "A", exp: "Thời gian kích hoạt nito lỏng dự phòng: 'activated within 12 seconds during simulated power interruption tests'." },
          { q: "How many cryogenic pallet positions are secured under the 3-year master contract?", opts: [{"key":"A","text":"500 positions"},{"key":"B","text":"5,000 cryogenic pallet positions"},{"key":"C","text":"10,000 positions"},{"key":"D","text":"50,000 positions"}], a: "B", exp: "Số lượng vị trí pallet: 'guaranteeing 5,000 cryogenic pallet positions'." },
          { q: "What cost efficiency will Karolinska Biologics achieve annually?", opts: [{"key":"A","text":"5 percent"},{"key":"B","text":"50 percent"},{"key":"C","text":"32% annual cost efficiency"},{"key":"D","text":"75 percent"}], a: "C", exp: "Hiệu quả tiết kiệm chi phí: 'delivering 32% annual cost efficiency'." }
        ]
      },
      {
        type: "Single Passage (Corporate ESG Environmental Audit Report)",
        passage: `ESG SUSTAINABILITY AUDIT SUMMARY\nAudited Entity: Horizon Global Technologies AG\nReporting Period: Fiscal Year 2026\nAuditing Agency: SGS Environmental Certification Services (Geneva)\n\nKey Verification Highlights:\n1. Renewable Electricity: Verified that 94.2% of electricity consumed across international manufacturing plants was sourced from certified wind and solar power purchase agreements (PPAs).\n2. Water Recirculation: Cleanroom semiconductor wastewater recycling systems achieved an 88.5% recovery rate, conserving 3.4 million cubic meters of municipal water in 2026.\n3. Carbon Footprint Reduction: Total Scope 1 and Scope 2 greenhouse gas emissions decreased by 28.4% compared to the 2023 baseline year.\n\nCertification Recommendation: Full renewal of ISO 14001 and ISO 50001 certifications with commendations for industrial water stewardship.`,
        questions: [
          { q: "What percentage of consumed electricity was sourced from wind and solar PPAs?", opts: [{"key":"A","text":"50.0%"},{"key":"B","text":"75.5%"},{"key":"C","text":"100%"},{"key":"D","text":"94.2%"}], a: "D", exp: "Tỷ lệ điện tái tạo: '94.2% of electricity consumed... was sourced from certified wind and solar'." },
          { q: "What wastewater recovery rate was achieved by semiconductor cleanrooms?", opts: [{"key":"A","text":"88.5% recovery rate"},{"key":"B","text":"35.0%"},{"key":"C","text":"50.0%"},{"key":"D","text":"99.9%"}], a: "A", exp: "Tỷ lệ tái chế nước: 'wastewater recycling systems achieved an 88.5% recovery rate'." },
          { q: "By what percentage did Scope 1 and Scope 2 greenhouse gas emissions decrease?", opts: [{"key":"A","text":"10.0%"},{"key":"B","text":"28.4% compared to 2023 baseline"},{"key":"C","text":"50.0%"},{"key":"D","text":"70.0%"}], a: "B", exp: "Mức giảm phát thải nhà kính: 'decreased by 28.4% compared to the 2023 baseline year'." },
          { q: "Which international environmental certifications were recommended for renewal?", opts: [{"key":"A","text":"Local driver license"},{"key":"B","text":"Food safety license only"},{"key":"C","text":"ISO 14001 and ISO 50001"},{"key":"D","text":"Building construction permit"}], a: "C", exp: "Chứng nhận được gia hạn: 'Full renewal of ISO 14001 and ISO 50001 certifications'." }
        ]
      },
      {
        type: "Single Passage (Automated Robotics Maintenance Manual Excerpt)",
        passage: `MAINTENANCE MANUAL EXCERPT: 6-AXIS ARTICULATED ROBOT ARM (MODEL AR-600)\nManufacturer: Apex Robotics GmbH, Stuttgart\nSection: Preventative Maintenance & Lubrication Protocols\n\n1. Harmonic Drive Gearbox Servicing:\nEvery 5,000 operating hours, the synthetic fluoropolymer grease in Joint Axes 1 through 3 must be purged and replaced with certified Tribol-600 grease. Inspection of mechanical backlash must not exceed 0.8 arc-minutes.\n\n2. Optical Encoder Alignment:\nLaser optical position encoders on Joints 4, 5, and 6 require automated recalibration during annual shutdowns using the Apex Calibration Wand (Part #CW-992).\n\n3. Emergency Braking Verification:\nElectromagnetic failsafe brakes on all six axes must engage within 35 milliseconds upon power loss, stopping full payload inertial movement within 15 millimeters of travel.`,
        questions: [
          { q: "How often must the gearbox grease in Joint Axes 1–3 be purged and replaced?", opts: [{"key":"A","text":"Every 500 hours"},{"key":"B","text":"Once every ten years"},{"key":"C","text":"Every month"},{"key":"D","text":"Every 5,000 operating hours"}], a: "D", exp: "Chu kỳ thay mỡ hộp số: 'Every 5,000 operating hours'." },
          { q: "What is the maximum permissible mechanical backlash in the gearbox?", opts: [{"key":"A","text":"Must not exceed 0.8 arc-minutes"},{"key":"B","text":"10 degrees"},{"key":"C","text":"5 centimeters"},{"key":"D","text":"No limit specified"}], a: "A", exp: "Độ rơ cơ học tối đa cho phép: 'must not exceed 0.8 arc-minutes'." },
          { q: "How quickly must electromagnetic failsafe brakes engage upon power loss?", opts: [{"key":"A","text":"In 2 seconds"},{"key":"B","text":"Within 35 milliseconds"},{"key":"C","text":"In 100 milliseconds"},{"key":"D","text":"In 5 seconds"}], a: "B", exp: "Thời gian đóng phanh an toàn: 'engage within 35 milliseconds upon power loss'." },
          { q: "What tool is required for recalibrating optical position encoders?", opts: [{"key":"A","text":"A standard metal hammer"},{"key":"B","text":"A screwdriver"},{"key":"C","text":"Apex Calibration Wand (Part #CW-992)"},{"key":"D","text":"A flashlight"}], a: "C", exp: "Dụng cụ hiệu chuẩn chuyên dụng: 'Apex Calibration Wand (Part #CW-992)'." }
        ]
      },
      {
        type: "Single Passage (International Travel Policy Directive)",
        passage: `CORPORATE DIRECTIVE: SUSTAINABLE BUSINESS TRAVEL GUIDELINES\nTo: All International Division Staff\nEffective Date: January 1, 2027\n\n1. Rail-Over-Flight Mandate:\nFor all domestic and European business travel journeys under 4.5 hours door-to-door, high-speed passenger rail is mandatory in place of commercial airline flights. Business Class train bookings are authorized for trips exceeding 2 hours.\n\n2. Hotel Sustainability Benchmarks:\nEmployees booking accommodations must select green-certified hotels participating in our corporate carbon offset program with average nightly rates capped at €195 in major European cities.\n\n3. Expense Reimbursement Timelines:\nAll electronic receipts must be submitted via the Concur mobile app within twenty-one calendar days of trip conclusion. Late claims will require written Vice President authorization.`,
        questions: [
          { q: "When is passenger rail mandatory instead of commercial flights?", opts: [{"key":"A","text":"Only on weekends"},{"key":"B","text":"For trips over 10 hours"},{"key":"C","text":"Never"},{"key":"D","text":"For journeys under 4.5 hours door-to-door"}], a: "D", exp: "Quy định đi tàu hỏa: 'journeys under 4.5 hours door-to-door, high-speed passenger rail is mandatory'." },
          { q: "What is the nightly hotel room rate cap in major European cities?", opts: [{"key":"A","text":"Capped at €195"},{"key":"B","text":"€100"},{"key":"C","text":"€350"},{"key":"D","text":"€500"}], a: "A", exp: "Hạn mức khách sạn: 'average nightly rates capped at €195'." },
          { q: "Within how many calendar days must travel expenses be submitted?", opts: [{"key":"A","text":"7 days"},{"key":"B","text":"Within twenty-one calendar days"},{"key":"C","text":"30 days"},{"key":"D","text":"60 days"}], a: "B", exp: "Hạn nộp chi phí công tác: 'within twenty-one calendar days of trip conclusion'." },
          { q: "Whose authorization is required for late expense reimbursement claims?", opts: [{"key":"A","text":"The office receptionist"},{"key":"B","text":"The security guard"},{"key":"C","text":"Written Vice President authorization"},{"key":"D","text":"No authorization required"}], a: "C", exp: "Cấp phê duyệt nộp muộn: 'written Vice President authorization'." }
        ]
      },
      {
        type: "Double Passage (High-Speed Rail Tunnel Engineering Contract)",
        passage: `[DOCUMENT 1: INVITATION FOR ENGINEERING TENDER]\nClient: Trans-European Transport Infrastructure Agency (Brussels)\nProject: Fehmarn Sound High-Speed Subsea Rail Tunnel\nTender Reference: TETI-EU-2026-880\n\nScope of Work:\nTurnkey geotechnical engineering, concrete immersion pre-casting, and dual-track high-speed railway electrification for an 18-kilometer immersed tunnel connecting Germany and Denmark. All structural designs must guarantee a 120-year operational design life with zero marine water ingress under 35 meters of hydrostatic pressure.\n\nSubmission Deadline: October 30, 2026 | Estimated Contract Value: €850,000,000.\n\n[DOCUMENT 2: FORMAL SELECTION AWARD NOTICE]\nNovember 15, 2026\nTo: Nordic-Baltic Infrastructure Consortium (Copenhagen)\n\nThe Trans-European Transport Infrastructure Agency is pleased to announce that your joint-venture proposal (€842,000,000) has been officially awarded the Fehmarn Sound Rail Tunnel contract. The evaluation committee specifically commended your proprietary self-healing underwater concrete mix and seismic dampening joints as key technical differentiators. Mobilization begins January 15, 2027.`,
        questions: [
          { q: "What is the length of the planned immersed subsea rail tunnel?", opts: [{"key":"A","text":"5 kilometers"},{"key":"B","text":"50 kilometers"},{"key":"C","text":"100 kilometers"},{"key":"D","text":"18-kilometer immersed tunnel"}], a: "D", exp: "Chiều dài đường hầm ngầm: '18-kilometer immersed tunnel connecting Germany and Denmark'." },
          { q: "What design life duration must the tunnel structure guarantee?", opts: [{"key":"A","text":"120-year operational design life"},{"key":"B","text":"25 years"},{"key":"C","text":"50 years"},{"key":"D","text":"200 years"}], a: "A", exp: "Tuổi thọ thiết kế: 'guarantee a 120-year operational design life'." },
          { q: "What was the winning contract value submitted by the consortium?", opts: [{"key":"A","text":"€500,000,000"},{"key":"B","text":"€842,000,000"},{"key":"C","text":"€850,000,000"},{"key":"D","text":"€1,000,000,000"}], a: "B", exp: "Giá trị trúng thầu: 'joint-venture proposal (€842,000,000)'." },
          { q: "What proprietary material technology was commended in Document 2?", opts: [{"key":"A","text":"Plastic tunnel lining"},{"key":"B","text":"Wooden support pillars"},{"key":"C","text":"Self-healing underwater concrete mix and seismic joints"},{"key":"D","text":"Standard asphalt paving"}], a: "C", exp: "Công nghệ vật liệu khen ngợi: 'proprietary self-healing underwater concrete mix and seismic dampening joints'." },
          { q: "When does on-site contractor mobilization begin?", opts: [{"key":"A","text":"October 30, 2026"},{"key":"B","text":"November 15, 2026"},{"key":"C","text":"March 2028"},{"key":"D","text":"January 15, 2027"}], a: "D", exp: "Thời gian triển khai: 'Mobilization begins January 15, 2027'." }
        ]
      },
      {
        type: "Triple Passage (Hydrogen Fuel Cell Bus Fleet Deployment)",
        passage: `[DOCUMENT 1: MUNICIPAL TRANSPORT TRANSITION PLAN]\nCity of Amsterdam Public Transit Directorate\nInitiative: Zero-Emission Public Bus Fleet 2027\nObjective: Replace 80 diesel articulated buses on metropolitan express routes with 350-bar hydrogen fuel cell electric buses (FCEBs) by Q2 2027.\n\n[DOCUMENT 2: FLEET TRIAL PERFORMANCE LOG]\nVehicle: Solaris Urbino 18 Hydrogen (Fleet Unit #H-104)\nRoute: Amsterdam Centraal to Schiphol Airport Express\nTest Duration: 90 Days (August 1 – October 31, 2026)\n• Total Mileage: 42,000 km\n• Average Hydrogen Consumption: 8.2 kg per 100 km (18% below projected threshold)\n• Full Tank Driving Range: 460 km on a single 12-minute hydrogen refueling cycle\n• Fleet Availability Rate: 99.4% with zero roadside propulsion breakdowns.\n\n[DOCUMENT 3: TRANSIT DIRECTORATE RESOLUTION]\nNovember 18, 2026\nThe Municipal Transit Board has unanimously approved a €62,000,000 capital purchase order for 65 Solaris hydrogen articulated buses, with deliveries phased between March and June 2027.`,
        questions: [
          { q: "What route was tested during the 90-day trial in Document 2?", opts: [{"key":"A","text":"Amsterdam Centraal to Schiphol Airport Express"},{"key":"B","text":"Rotterdam Harbor Shuttle"},{"key":"C","text":"Utrecht City Ring"},{"key":"D","text":"The Hague Coastal Loop"}], a: "A", exp: "Tuyến xe buýt thử nghiệm: 'Amsterdam Centraal to Schiphol Airport Express'." },
          { q: "What is the driving range on a single 12-minute hydrogen refueling cycle?", opts: [{"key":"A","text":"150 km"},{"key":"B","text":"460 km"},{"key":"C","text":"250 km"},{"key":"D","text":"800 km"}], a: "B", exp: "Quãng đường di chuyển sau một lần sạc: '460 km on a single 12-minute hydrogen refueling cycle'." },
          { q: "What fleet availability rate was achieved during the 90-day test?", opts: [{"key":"A","text":"85.0%"},{"key":"B","text":"92.4%"},{"key":"C","text":"99.4%"},{"key":"D","text":"100%"}], a: "C", exp: "Tỷ lệ sẵn sàng vận hành: 'Fleet Availability Rate: 99.4%'." },
          { q: "How many hydrogen articulated buses were ordered in Document 3?", opts: [{"key":"A","text":"20 buses"},{"key":"B","text":"80 buses"},{"key":"C","text":"150 buses"},{"key":"D","text":"65 Solaris hydrogen articulated buses"}], a: "D", exp: "Số lượng xe đặt mua: 'purchase order for 65 Solaris hydrogen articulated buses'." },
          { q: "What was the total approved purchase order value?", opts: [{"key":"A","text":"€62,000,000"},{"key":"B","text":"€15,000,000"},{"key":"C","text":"€35,000,000"},{"key":"D","text":"€100,000,000"}], a: "A", exp: "Tổng giá trị đơn hàng: 'approved a €62,000,000 capital purchase order'." }
        ]
      },
      {
        type: "Triple Passage (Microelectronics Cleanroom ISO Certification & AGV Wafer Transport)",
        passage: `[DOCUMENT 1: CLEANROOM EXPANSION SPECIFICATION]\nApex Semiconductor Foundry (Munich Fab 3)\nFacility: Module 4 Ultra-Clean Lithography Bay (ISO Class 1 Cleanliness)\nRequirements: Airborne particulate limits of less than 10 particles of 0.1-micron diameter per cubic meter of air. Temperature must be controlled at 21.0°C (±0.1°C) with relative humidity at 45.0% (±1.0%).\n\n[DOCUMENT 2: CERTIFIED ENVIRONMENTAL AUDIT REPORT]\nAuditor: TÜV SÜD Industrial Safety & Metrology\nAudit Date: November 12, 2026\nVerification Summary:\n• HEPA/ULPA Filter Integrity: 100% leak-free across 480 ceiling filter fan units.\n• Automated Wafer Handling: Fleet of 16 ceiling-mounted Automated Material Handling Systems (AMHS) transported 24,000 silicon wafer front-opening unified pods (FOUPs) with zero vibration damage.\n• Particulate Reading: Averaged 2.4 particles/m³, comfortably meeting ISO Class 1 benchmarks.\n\n[DOCUMENT 3: FABRICATION LAUNCH EXECUTIVE MEMO]\nTo: Board of Directors, Apex Semiconductor Technologies\nFrom: Executive Vice President of Foundry Operations\nDate: November 19, 2026\n\nTÜV SÜD has officially issued full ISO Class 1 certification for Munich Fab 3 Module 4. Commercial pilot production of 2nm high-performance computing logic dies will commence on December 1, 2026, on track for high-volume delivery to global automotive and hyperscale AI clients in Q1 2027.`,
        questions: [
          { q: "What cleanroom cleanliness classification was certified for Munich Fab 3 Module 4?", opts: [{"key":"A","text":"ISO Class 8 (Standard)"},{"key":"B","text":"ISO Class 1 (Ultra-Clean Lithography)"},{"key":"C","text":"ISO Class 5"},{"key":"D","text":"Non-classified space"}], a: "B", exp: "Cấp độ phòng sạch: 'full ISO Class 1 certification for Munich Fab 3 Module 4'." },
          { q: "What average particulate density was recorded during the TÜV SÜD audit?", opts: [{"key":"A","text":"10 particles/m³"},{"key":"B","text":"50 particles/m³"},{"key":"C","text":"2.4 particles/m³"},{"key":"D","text":"100 particles/m³"}], a: "C", exp: "Mật độ hạt bụi đo được: 'Averaged 2.4 particles/m³, comfortably meeting ISO Class 1 benchmarks'." },
          { q: "How many ceiling filter fan units were inspected for leaks?", opts: [{"key":"A","text":"50 units"},{"key":"B","text":"100 units"},{"key":"C","text":"1,000 units"},{"key":"D","text":"480 ceiling filter fan units"}], a: "D", exp: "Số lượng quạt lọc: '100% leak-free across 480 ceiling filter fan units'." },
          { q: "When will commercial pilot production of 2nm logic dies commence?", opts: [{"key":"A","text":"On December 1, 2026"},{"key":"B","text":"Next year in June"},{"key":"C","text":"In 2029"},{"key":"D","text":"Immediately today"}], a: "A", exp: "Thời điểm chạy thử thương mại: 'commence on December 1, 2026'." },
          { q: "What client sectors will receive high-volume chip deliveries in Q1 2027?", opts: [{"key":"A","text":"Toy and game retailers only"},{"key":"B","text":"Automotive and hyperscale AI computing clients"},{"key":"C","text":"Residential home builders"},{"key":"D","text":"Agricultural farm equipment"}], a: "B", exp: "Khách hàng nhận hàng: 'global automotive and hyperscale AI clients in Q1 2027'." }
        ]
      }
    ];

    let p7QCounter = 147;
    part7Passages.forEach((pSet) => {
      pSet.questions.forEach((qItem) => {
        qs.push({
          id: `tlr4_q${p7QCounter}`,
          partNumber: 7,
          partTitle: `Reading Part 7: ${pSet.type}`,
          section: "READING",
          passageText: pSet.passage,
          questionText: `Question ${p7QCounter}: ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a as any,
          explanation: qItem.exp
        });
        p7QCounter++;
      });
    });

    return qs;
  })()
};
