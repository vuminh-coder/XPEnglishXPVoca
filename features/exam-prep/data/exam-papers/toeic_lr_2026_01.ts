import { ExamPaper, ExamQuestion } from "./types";

const buildToeicLR01Questions = (): ExamQuestion[] => {
  const qs: ExamQuestion[] = [];

  // PART 1: PHOTOGRAPHS (Q1 - Q6)
  const part1Photos = [
    {
      id: "tlr1_q1",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      questionText: "Look at the picture marked No. 1 in your test book.",
      options: [
        { key: "A", text: "They are reviewing documents around a conference table." },
        { key: "B", text: "They are typing on computer keyboards." },
        { key: "C", text: "They are adjusting the projector equipment." },
        { key: "D", text: "They are hanging artwork on the office wall." }
      ],
      correctAnswer: "A" as const,
      explanation: "🎯 **Đáp án đúng: A** (They are reviewing documents around a conference table).\n🔍 **Dịch nghĩa:**\n• (A) Họ đang cùng xem lại các tài liệu xung quanh bàn hội nghị.\n• (B) Họ đang gõ trên bàn phím máy tính.\n• (C) Họ đang điều chỉnh thiết bị máy chiếu.\n• (D) Họ đang treo tác phẩm nghệ thuật lên tường văn phòng.\n⚠️ **Phân tích bẫy thi ETS:**\n• Bẫy hành động sai: Bức ảnh thể hiện các nhân viên đang ngồi quanh bàn họp cùng đối chiếu tài liệu giấy tờ, không có ai đang gõ bàn phím (B) hay chỉnh máy chiếu (C).\n💡 **Từ vựng trọng tâm:**\n• `review documents` (/rɪˈvjuː ˈdɒkjʊmənts/): xem xét, duyệt tài liệu\n• `conference table` (/ˈkɒnfərəns ˈteɪbl/): bàn họp hội nghị"
    },
    {
      id: "tlr1_q2",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      questionText: "Look at the picture marked No. 2 in your test book.",
      options: [
        { key: "A", text: "Cargo boxes are being loaded onto a delivery truck." },
        { key: "B", text: "A worker is operating heavy machinery in a warehouse." },
        { key: "C", text: "Shelves are being assembled in an aisle." },
        { key: "D", text: "Merchandise is being scanned at a cash register." }
      ],
      correctAnswer: "B" as const,
      explanation: "🎯 **Đáp án đúng: B** (A worker is operating heavy machinery in a warehouse).\n🔍 **Dịch nghĩa:**\n• (A) Các thùng hàng đang được bốc lên xe tải giao hàng.\n• (B) Một công nhân đang vận hành máy móc hạng nặng trong kho hàng.\n• (C) Các kệ hàng đang được lắp ráp ở lối đi.\n• (D) Hàng hóa đang được quét tại quầy thu ngân.\n⚠️ **Phân tích bẫy thi ETS:**\n• Bẫy thì bị động 'being + V3': Trong kho không có hoạt động bốc hàng lên xe tải (A) hay lắp kệ (C), mà người nhân viên đang trực tiếp lái xe nâng hàng.\n💡 **Từ vựng trọng tâm:**\n• `operate heavy machinery` (/ˈɒpəreɪt ˈhɛvi məˈʃiːnəri/): vận hành máy móc hạng nặng\n• `warehouse` (/ˈweəhaʊs/): nhà kho, kho bãi"
    },
    {
      id: "tlr1_q3",
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      questionText: "Look at the picture marked No. 3 in your test book.",
      options: [
        { key: "A", text: "Engineers are inspecting blueprint plans outdoors." },
        { key: "B", text: "Scaffolding is being dismantled near a bridge." },
        { key: "C", text: "Construction workers wearing hard hats are examining a building site." },
        { key: "D", text: "Safety cones are blocking a residential driveway." }
      ],
      correctAnswer: "C" as const,
      explanation: "🎯 **Đáp án đúng: C** (Construction workers wearing hard hats are examining a building site).\n🔍 **Dịch nghĩa:**\n• (A) Các kỹ sư đang kiểm tra bản vẽ thiết kế ngoài trời.\n• (B) Giàn giáo đang được tháo dỡ gần một cây cầu.\n• (C) Các công nhân xây dựng đội mũ bảo hộ đang khảo sát một công trường xây dựng.\n• (D) Các cọc tiêu an toàn đang chặn lối vào khu dân cư.\n⚠️ **Phân tích bẫy thi ETS:**\n• Bẫy vật thể không có trong hình: Không có bản vẽ kỹ thuật (A) hay tháo dỡ giàn giáo (B). Chi tiết trực quan là các công nhân đội mũ bảo hộ (hard hats) đang quan sát công trường.\n💡 **Từ vựng trọng tâm:**\n• `hard hat` (/hɑːd hæt/): mũ bảo hộ lao động\n• `building site` (/ˈbɪldɪŋ saɪt/): công trường xây dựng"
    },
    {
      id: "tlr1_q4",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      questionText: "Look at the picture marked No. 4 in your test book.",
      options: [
        { key: "A", text: "Patrons are standing in line outside a cafe." },
        { key: "B", text: "Tables are being wiped down with clean towels." },
        { key: "C", text: "Coffee beans are being roasted in a large machine." },
        { key: "D", text: "A barista is preparing a hot beverage behind a counter." }
      ],
      correctAnswer: "D" as const,
      explanation: "🎯 **Đáp án đúng: D** (A barista is preparing a hot beverage behind a counter).\n🔍 **Dịch nghĩa:**\n• (A) Khách hàng đang xếp hàng bên ngoài quán cà phê.\n• (B) Bàn ghế đang được lau sạch bằng khăn.\n• (C) Hạt cà phê đang được rang trong một máy lớn.\n• (D) Nhân viên pha chế đang chuẩn bị đồ uống nóng đằng sau quầy phục vụ.\n⚠️ **Phân tích bẫy thi ETS:**\n• Bẫy đối tượng: Bức ảnh chụp nhân viên pha chế (barista) làm việc sau quầy, không có cảnh khách hàng xếp hàng (A) hay lau bàn (B).\n💡 **Từ vựng trọng tâm:**\n• `barista` (/bəˈriːstə/): nhân viên pha chế cà phê\n• `behind the counter` (/bɪˈhaɪnd ðə ˈkaʊntə/): đằng sau quầy phục vụ"
    },
    {
      id: "tlr1_q5",
      imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      questionText: "Look at the picture marked No. 5 in your test book.",
      options: [
        { key: "A", text: "An airplane is parked on a tarmac near an airport terminal gate." },
        { key: "B", text: "Passengers are stowing luggage in overhead compartments." },
        { key: "C", text: "Flight attendants are pushing service carts down the aisle." },
        { key: "D", text: "Travelers are waiting in an airport departure lounge." }
      ],
      correctAnswer: "A" as const,
      explanation: "🎯 **Đáp án đúng: A** (An airplane is parked on a tarmac near an airport terminal gate).\n🔍 **Dịch nghĩa:**\n• (A) Một chiếc máy bay đang đỗ trên đường băng/bãi đỗ gần cổng nhà ga sân bay.\n• (B) Hành khách đang cất hành lý vào khoang trên đầu.\n• (C) Tiếp viên hàng không đang đẩy xe đẩy phục vụ dọc lối đi.\n• (D) Hành khách đang ngồi chờ tại phòng chờ khởi hành của sân bay.\n⚠️ **Phân tích bẫy thi ETS:**\n• Bẫy bối cảnh bên trong máy bay: Các đáp án B, C, D mô tả khoang hành khách hoặc phòng chờ, trong khi bức ảnh thể hiện máy bay đỗ ngoài bãi đỗ (tarmac).\n💡 **Từ vựng trọng tâm:**\n• `tarmac` (/ˈtɑːmæk/): bãi đỗ/đường băng sân bay\n• `terminal gate` (/ˈtɜːmɪnl ɡeɪt/): cổng nhà ga sân bay"
    },
    {
      id: "tlr1_q6",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      questionText: "Look at the picture marked No. 6 in your test book.",
      options: [
        { key: "A", text: "A computer monitor is being unboxed from a cardboard crate." },
        { key: "B", text: "A professional is working on a laptop computer beside a desk lamp." },
        { key: "C", text: "Headphones are hanging from a metal microphone stand." },
        { key: "D", text: "Wires are being connected to an electrical outlet." }
      ],
      correctAnswer: "B" as const,
      explanation: "🎯 **Đáp án đúng: B** (A professional is working on a laptop computer beside a desk lamp).\n🔍 **Dịch nghĩa:**\n• (A) Màn hình máy tính đang được mở hộp từ thùng các tông.\n• (B) Một người đang làm việc trên máy tính xách tay bên cạnh đèn bàn.\n• (C) Tai nghe đang được treo trên giá đỡ micro bằng kim loại.\n• (D) Dây điện đang được cắm vào ổ cắm điện.\n⚠️ **Phân tích bẫy thi ETS:**\n• Bẫy hành động đang tiến hành: Không có hoạt động mở hộp (A) hay cắm dây điện (D). Miêu tả trạng thái ngồi làm việc với laptop bên đèn bàn là chuẩn xác nhất.\n💡 **Từ vựng trọng tâm:**\n• `desk lamp` (/dɛsk læmp/): đèn bàn làm việc\n• `laptop computer` (/ˈlæptɒp kəmˈpjuːtə/): máy tính xách tay"
    }
  ];

  part1Photos.forEach((p, idx) => {
    const optionsText = p.options.map((opt) => `(${opt.key}) ${opt.text}`).join("\n");
    qs.push({
      id: p.id,
      partNumber: 1,
      partTitle: "Part 1: Photographs",
      section: "LISTENING",
      imageUrl: p.imageUrl,
      audioUrl: p.audioUrl,
      passageText: `[Audio Transcript - Question ${idx + 1}]\n${optionsText}`,
      questionText: p.questionText,
      options: p.options as any,
      correctAnswer: p.correctAnswer,
      explanation: p.explanation
    });
  });

  // PART 2: QUESTION-RESPONSE (Q7 - Q31: 25 FULLY UNIQUE ETS-STANDARD QUESTIONS)
  const part2Questions: { q: string; a: "A" | "B" | "C"; options: { key: string; text: string }[]; exp: string }[] = [
    // Q7 - Wh-question (Where)
    {
      q: "Where is the new printer paper stored?",
      a: "A",
      options: [
        { key: "A", text: "In the supply closet on the second floor." },
        { key: "B", text: "Yes, I printed twenty copies." },
        { key: "C", text: "Tomorrow morning at nine o'clock." }
      ],
      exp: "🎯 **Đáp án đúng: A** (In the supply closet on the second floor).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Giấy in mới được cất ở đâu?\n• (A) Ở trong tủ đồ dùng tại tầng hai.\n• (B) Vâng, tôi đã in hai mươi bản sao.\n• (C) Sáng mai lúc chín giờ.\n⚠️ **Phân tích bẫy thi ETS:**\n• Bẫy câu hỏi Wh-question: Câu hỏi 'Where' không bao giờ trả lời bằng Yes/No (B) và không trả lời bằng thời gian (C).\n💡 **Từ vựng trọng tâm:**\n• `supply closet` (/səˈplaɪ ˈklɒzɪt/): tủ đựng vật tư, đồ dùng văn phòng"
    },
    // Q8 - Wh-question (Who)
    {
      q: "Who will be heading the regional sales team next month?",
      a: "B",
      options: [
        { key: "A", text: "At the headquarters in Chicago." },
        { key: "B", text: "Ms. Jenkins was selected by management." },
        { key: "C", text: "Sales grew by fifteen percent." }
      ],
      exp: "🎯 **Đáp án đúng: B** (Ms. Jenkins was selected by management).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Ai sẽ lãnh đạo đội ngũ bán hàng khu vực vào tháng tới?\n• (A) Tại trụ sở chính ở Chicago.\n• (B) Cô Jenkins đã được ban giám đốc lựa chọn.\n• (C) Doanh số đã tăng mười lăm phần trăm.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi 'Who' cần người chịu trách nhiệm: B nêu rõ người được chọn. (A) trả lời địa điểm, (C) là thông tin doanh thu lặp từ 'sales'.\n💡 **Từ vựng trọng tâm:**\n• `head a team` (/hɛd ə tiːm/): dẫn dắt, đứng đầu một đội ngũ"
    },
    // Q9 - Wh-question (When)
    {
      q: "When is the quarterly budget review meeting scheduled?",
      a: "C",
      options: [
        { key: "A", text: "In the main conference hall." },
        { key: "B", text: "We need more printer toner." },
        { key: "C", text: "This Thursday at 2:00 PM." }
      ],
      exp: "🎯 **Đáp án đúng: C** (This Thursday at 2:00 PM).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Cuộc họp đánh giá ngân sách hàng quý được xếp lịch khi nào?\n• (A) Ở hội trường chính.\n• (B) Chúng ta cần thêm mực in.\n• (C) Thứ Năm tuần này lúc 2:00 chiều.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi 'When' yêu cầu mốc thời gian cụ thể. (A) là địa điểm 'Where', (B) không liên quan.\n💡 **Từ vựng trọng tâm:**\n• `quarterly budget review` (/ˈkwɔːtəli ˈbʌdʒɪt rɪˈvjuː/): đánh giá ngân sách định kỳ quý"
    },
    // Q10 - Wh-question (Why)
    {
      q: "Why was the morning flight to Atlanta canceled?",
      a: "A",
      options: [
        { key: "A", text: "Due to severe thunderstorm warnings." },
        { key: "B", text: "Gate 14B near the food court." },
        { key: "C", text: "I bought a round-trip ticket." }
      ],
      exp: "🎯 **Đáp án đúng: A** (Due to severe thunderstorm warnings).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Tại sao chuyến bay buổi sáng tới Atlanta lại bị hủy?\n• (A) Do có cảnh báo bão giông nghiêm trọng.\n• (B) Cổng 14B gần khu ẩm thực.\n• (C) Tôi đã mua vé khứ hồi.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi 'Why' cần lý do nguyên nhân bắt đầu bằng 'Due to/Because'. (B) là địa điểm, (C) lạc đề.\n💡 **Từ vựng trọng tâm:**\n• `severe thunderstorm` (/sɪˈvɪə ˈθʌndəstɔːm/): bão dông sấm sét nghiêm trọng"
    },
    // Q11 - Yes/No question
    {
      q: "Has the client approved the revised building layout?",
      a: "B",
      options: [
        { key: "A", text: "Three stories high." },
        { key: "B", text: "Yes, they signed the document yesterday." },
        { key: "C", text: "Near the train station." }
      ],
      exp: "🎯 **Đáp án đúng: B** (Yes, they signed the document yesterday).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Khách hàng đã phê duyệt bản vẽ mặt bằng tòa nhà sửa đổi chưa?\n• (A) Cao ba tầng.\n• (B) Rồi, họ đã ký tài liệu vào ngày hôm qua.\n• (C) Gần nhà ga xe lửa.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi 'Has the client approved...' là câu hỏi xác nhận thì hiện tại hoàn thành, đáp án B xác nhận hành động đã hoàn tất bằng hành động ký tài liệu.\n💡 **Từ vựng trọng tâm:**\n• `revised layout` (/rɪˈvaɪzd ˈleɪaʊt/): bản vẽ bố cục sửa đổi"
    },
    // Q12 - Offer/Suggestion
    {
      q: "Would you like me to send you the meeting summary?",
      a: "A",
      options: [
        { key: "A", text: "That would be very helpful, thank you." },
        { key: "B", text: "About forty-five minutes long." },
        { key: "C", text: "I met him last week." }
      ],
      exp: "🎯 **Đáp án đúng: A** (That would be very helpful, thank you).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Bạn có muốn tôi gửi cho bạn bản tóm tắt cuộc họp không?\n• (A) Điều đó sẽ rất hữu ích, cảm ơn bạn.\n• (B) Dài khoảng bốn mươi lăm phút.\n• (C) Tôi đã gặp anh ấy tuần trước.\n⚠️ **Phân tích bẫy thi ETS:**\n• Lời đề nghị giúp đỡ 'Would you like me to...' được đón nhận lịch sự bằng 'That would be helpful'. (C) bẫy từ đồng âm 'met/meeting'.\n💡 **Từ vựng trọng tâm:**\n• `meeting summary` (/ˈmiːtɪŋ ˈsʌməri/): biên bản tóm tắt cuộc họp"
    },
    // Q13 - How long
    {
      q: "How long does the train journey to downtown take?",
      a: "C",
      options: [
        { key: "A", text: "Every fifteen minutes." },
        { key: "B", text: "Single ticket, please." },
        { key: "C", text: "Approximately thirty minutes." }
      ],
      exp: "🎯 **Đáp án đúng: C** (Approximately thirty minutes).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Chuyến đi tàu tới trung tâm thành phố mất bao lâu?\n• (A) Mỗi mười lăm phút một chuyến.\n• (B) Làm ơn cho một vé một chiều.\n• (C) Khoảng chừng ba mươi phút.\n⚠️ **Phân tích bẫy thi ETS:**\n• Bẫy tần suất vs Thời lượng: 'How long' hỏi khoảng thời gian kéo dài (C), không phải tần suất 'How often' (A).\n💡 **Từ vựng trọng tâm:**\n• `train journey` (/treɪn ˈdʒɜːni/): hành trình chuyến tàu\n• `approximately` (/əˈprɒksɪmətli/): xấp xỉ, khoảng chừng"
    },
    // Q14 - Request
    {
      q: "Could you help me set up the projector for the presentation?",
      a: "B",
      options: [
        { key: "A", text: "The presentation was informative." },
        { key: "B", text: "Sure, let me fetch the HDMI cable." },
        { key: "C", text: "At three o'clock in the room." }
      ],
      exp: "🎯 **Đáp án đúng: B** (Sure, let me fetch the HDMI cable).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Bạn có thể giúp tôi cài đặt máy chiếu cho bài thuyết trình không?\n• (A) Bài thuyết trình rất nhiều thông tin bổ ích.\n• (B) Chắc chắn rồi, để tôi đi lấy dây cáp HDMI.\n• (C) Lúc ba giờ ở trong phòng.\n⚠️ **Phân tích bẫy thi ETS:**\n• Lời yêu cầu giúp đỡ 'Could you help...' nhận lời trực tiếp bằng 'Sure' kèm hành động cụ thể.\n💡 **Từ vựng trọng tâm:**\n• `set up the projector` (/sɛt ʌp ðə prəˈdʒɛktə/): cài đặt/lắp máy chiếu"
    },
    // Q15 - Which (specific choice)
    {
      q: "Which catering company did we hire for the annual banquet?",
      a: "A",
      options: [
        { key: "A", text: "Gourmet Express Catering." },
        { key: "B", text: "Over two hundred guests attended." },
        { key: "C", text: "The food was delicious." }
      ],
      exp: "🎯 **Đáp án đúng: A** (Gourmet Express Catering).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Chúng ta đã thuê công ty phục vụ ăn uống nào cho bữa tiệc thường niên?\n• (A) Công ty Gourmet Express Catering.\n• (B) Hơn hai trăm khách đã tham dự.\n• (C) Đồ ăn rất ngon miệng.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi 'Which company' cần tên danh từ riêng chỉ đơn vị được thuê (A).\n💡 **Từ vựng trọng tâm:**\n• `catering company` (/ˈkeɪtərɪŋ ˈkʌmpəni/): công ty cung cấp dịch vụ ăn uống tiệc\n• `annual banquet` (/ˈænjʊəl ˈbæŋkwɪt/): yến tiệc thường niên"
    },
    // Q16 - Negative question (đố mẹo)
    {
      q: "Haven't you submitted your travel expense report yet?",
      a: "C",
      options: [
        { key: "A", text: "I flew economy class." },
        { key: "B", text: "To the conference in Seattle." },
        { key: "C", text: "I submitted it to accounting this morning." }
      ],
      exp: "🎯 **Đáp án đúng: C** (I submitted it to accounting this morning).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Bạn vẫn chưa nộp báo cáo chi phí công tác à?\n• (A) Tôi đã bay hạng phổ thông.\n• (B) Tới hội nghị ở Seattle.\n• (C) Tôi đã nộp nó cho phòng kế toán sáng nay rồi.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi phủ định 'Haven't you... yet?': Đáp án C đính chính thông tin đã hoàn thành việc nộp vào sáng nay.\n💡 **Từ vựng trọng tâm:**\n• `travel expense report` (/ˈtrævl ɪkˈspɛns rɪˈpɔːt/): báo cáo chi phí công tác"
    },
    // Q17 - Who (indirect)
    {
      q: "Who is responsible for inspecting the factory equipment?",
      a: "B",
      options: [
        { key: "A", text: "Every Friday afternoon." },
        { key: "B", text: "Mr. Davis, the chief maintenance engineer." },
        { key: "C", text: "The factory produces auto parts." }
      ],
      exp: "🎯 **Đáp án đúng: B** (Mr. Davis, the chief maintenance engineer).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Ai chịu trách nhiệm kiểm tra thiết bị nhà máy?\n• (A) Chiều thứ Sáu hàng tuần.\n• (B) Ông Davis, kỹ sư trưởng bộ phận bảo trì.\n• (C) Nhà máy sản xuất phụ tùng ô tô.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi 'Who is responsible' tìm đối tượng phụ trách. B cung cấp tên người cùng chức danh chuẩn xác.\n💡 **Từ vựng trọng tâm:**\n• `responsible for` (/rɪˈspɒnsəbl fɔː/): chịu trách nhiệm cho\n• `maintenance engineer` (/ˈmeɪntənəns ˌɛndʒɪˈnɪə/): kỹ sư bảo trì"
    },
    // Q18 - Why (reason)
    {
      q: "Why did the marketing team postpone the product launch?",
      a: "A",
      options: [
        { key: "A", text: "To conduct further market testing." },
        { key: "B", text: "In the new downtown showroom." },
        { key: "C", text: "The product price is fifty dollars." }
      ],
      exp: "🎯 **Đáp án đúng: A** (To conduct further market testing).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Tại sao đội ngũ tiếp thị lại hoãn ngày ra mắt sản phẩm?\n• (A) Để tiến hành thêm các thử nghiệm thị trường.\n• (B) Ở phòng trưng bày mới tại trung tâm thành phố.\n• (C) Giá sản phẩm là năm mươi đô la.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi 'Why' trả lời bằng mệnh đề chỉ mục đích 'To + V' (A). (B) là địa điểm 'Where'.\n💡 **Từ vựng trọng tâm:**\n• `postpone` (/pəʊstˈpəʊn/): hoãn lại, dời lịch\n• `conduct testing` (/kənˈdʌkt ˈtɛstɪŋ/): tiến hành thử nghiệm"
    },
    // Q19 - Indirect response (đố mẹo - trả lời gián tiếp)
    {
      q: "Do you know if Mr. Harrison is in his office?",
      a: "C",
      options: [
        { key: "A", text: "Yes, he signed the contract." },
        { key: "B", text: "The office is on the fourth floor." },
        { key: "C", text: "He just left for a client meeting." }
      ],
      exp: "🎯 **Đáp án đúng: C** (He just left for a client meeting).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Bạn có biết ông Harrison có ở trong văn phòng không?\n• (A) Có, ông ấy đã ký hợp đồng.\n• (B) Văn phòng ở tầng bốn.\n• (C) Ông ấy vừa rời đi họp với khách hàng rồi.\n⚠️ **Phân tích bẫy thi ETS:**\n• Dạng câu hỏi gián tiếp: C giải thích ông ấy không có mặt vì vừa đi họp. (A) bẫy từ 'Yes' nhưng nội dung sai lệch.\n💡 **Từ vựng trọng tâm:**\n• `leave for a meeting` (/liːv fɔːr ə ˈmiːtɪŋ/): rời đi dự cuộc họp"
    },
    // Q20 - Where
    {
      q: "Where should I park my car during the workshop?",
      a: "A",
      options: [
        { key: "A", text: "In the visitor lot behind Building B." },
        { key: "B", text: "The workshop starts at 9:00 AM." },
        { key: "C", text: "Yes, parking is free for attendees." }
      ],
      exp: "🎯 **Đáp án đúng: A** (In the visitor lot behind Building B).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Tôi nên đỗ xe ở đâu trong suốt buổi hội thảo?\n• (A) Ở bãi đỗ xe dành cho khách phía sau Tòa nhà B.\n• (B) Buổi hội thảo bắt đầu lúc 9:00 sáng.\n• (C) Vâng, việc đỗ xe là miễn phí cho người tham dự.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi 'Where' chỉ vị trí bãi đỗ xe cụ thể. (B) là giờ giấc, (C) bẫy lặp từ 'parking'.\n💡 **Từ vựng trọng tâm:**\n• `visitor lot` (/ˈvɪzɪtə lɒt/): bãi đỗ xe cho khách tham quan"
    },
    // Q21 - Should (suggestion)
    {
      q: "Should we order extra chairs for the seminar?",
      a: "B",
      options: [
        { key: "A", text: "The seminar topic is leadership." },
        { key: "B", text: "Yes, thirty more people registered today." },
        { key: "C", text: "They are made of leather." }
      ],
      exp: "🎯 **Đáp án đúng: B** (Yes, thirty more people registered today).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Chúng ta có nên đặt thêm ghế cho buổi hội thảo không?\n• (A) Chủ đề hội thảo là năng lực lãnh đạo.\n• (B) Có chứ, hôm nay có thêm ba mươi người đăng ký nữa.\n• (C) Chúng được làm bằng da.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi xin ý kiến đề xuất được đồng thuận bằng 'Yes' đi kèm lý do số người đăng ký tăng thêm.\n💡 **Từ vựng trọng tâm:**\n• `register` (/ˈrɛdʒɪstə/): đăng ký tham gia"
    },
    // Q22 - Tag question (đố mẹo)
    {
      q: "The shipment arrived on time, didn't it?",
      a: "C",
      options: [
        { key: "A", text: "About three hundred boxes." },
        { key: "B", text: "To the distribution center in Dallas." },
        { key: "C", text: "Actually, it was delayed by two hours." }
      ],
      exp: "🎯 **Đáp án đúng: C** (Actually, it was delayed by two hours).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Lô hàng đã đến đúng giờ, phải không?\n• (A) Khoảng ba trăm hộp.\n• (B) Tới trung tâm phân phối ở Dallas.\n• (C) Thực ra là nó đã bị trễ hai tiếng.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi đuôi xác nhận: C đính chính sự thật bằng 'Actually, it was delayed'. (A) là số lượng, (B) là địa điểm.\n💡 **Từ vựng trọng tâm:**\n• `on time` (/ɒn taɪm/): đúng giờ đã định\n• `delayed by` (/dɪˈleɪd baɪ/): bị trì hoãn một khoảng thời gian"
    },
    // Q23 - Choice question (đố mẹo - Or)
    {
      q: "Would you prefer the morning session or the afternoon session for the training?",
      a: "B",
      options: [
        { key: "A", text: "Yes, I would like to attend the training." },
        { key: "B", text: "The afternoon works better for my schedule." },
        { key: "C", text: "The training room is on the third floor." }
      ],
      exp: "🎯 **Đáp án đúng: B** (The afternoon works better for my schedule).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Bạn muốn chọn buổi đào tạo sáng hay buổi chiều hơn?\n• (A) Vâng, tôi muốn tham gia đào tạo.\n• (B) Buổi chiều phù hợp hơn với lịch trình của tôi.\n• (C) Phòng đào tạo ở tầng ba.\n⚠️ **Phân tích bẫy thi ETS:**\n• Bẫy câu hỏi lựa chọn 'Or': Tuyệt đối không chọn Yes/No (A). Đáp án B chọn buổi chiều.\n💡 **Từ vựng trọng tâm:**\n• `works better for my schedule`: phù hợp hơn với lịch làm việc của tôi"
    },
    // Q24 - Indirect response (đố mẹo)
    {
      q: "Where can I find the user manual for the new photocopier?",
      a: "C",
      options: [
        { key: "A", text: "It can make fifty copies per minute." },
        { key: "B", text: "We bought it last Thursday." },
        { key: "C", text: "Ms. Chen from IT should have a digital copy." }
      ],
      exp: "🎯 **Đáp án đúng: C** (Ms. Chen from IT should have a digital copy).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Tôi có thể tìm sách hướng dẫn sử dụng máy photocopy mới ở đâu?\n• (A) Nó có thể tạo ra năm mươi bản sao mỗi phút.\n• (B) Chúng tôi đã mua nó vào thứ Năm tuần trước.\n• (C) Cô Chen bên phòng CNTT chắc có bản sao kỹ thuật số đấy.\n⚠️ **Phân tích bẫy thi ETS:**\n• Trả lời gián tiếp: Thay vì chỉ vị trí, hướng dẫn người đang giữ tài liệu. Dạng đề kinh điển của ETS.\n💡 **Từ vựng trọng tâm:**\n• `user manual` (/ˈjuːzə ˈmænjʊəl/): sách hướng dẫn sử dụng"
    },
    // Q25 - Embedded question
    {
      q: "Do you know when the next staff meeting is?",
      a: "A",
      options: [
        { key: "A", text: "It has been moved to Friday at 10 AM." },
        { key: "B", text: "There were about twenty people." },
        { key: "C", text: "In the large conference room." }
      ],
      exp: "🎯 **Đáp án đúng: A** (It has been moved to Friday at 10 AM).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Bạn có biết cuộc họp nhân viên tiếp theo diễn ra khi nào không?\n• (A) Nó đã được chuyển sang thứ Sáu lúc 10 giờ sáng.\n• (B) Đã có khoảng hai mươi người.\n• (C) Ở phòng hội nghị lớn.\n⚠️ **Phân tích bẫy thi ETS:**\n• Trọng tâm câu hỏi nằm ở 'when' nên câu trả lời cung cấp thời gian chuyển lịch.\n💡 **Từ vựng trọng tâm:**\n• `move a meeting to`: dời/chuyển cuộc họp sang thời điểm khác"
    },
    // Q26 - How (manner)
    {
      q: "How should I submit the reimbursement request?",
      a: "B",
      options: [
        { key: "A", text: "About three hundred dollars." },
        { key: "B", text: "Fill out the online form on the company portal." },
        { key: "C", text: "By the end of this month." }
      ],
      exp: "🎯 **Đáp án đúng: B** (Fill out the online form on the company portal).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Tôi nên nộp yêu cầu hoàn tiền chi phí bằng cách nào?\n• (A) Khoảng ba trăm đô la.\n• (B) Hãy điền vào biểu mẫu trực tuyến trên cổng thông tin nội bộ công ty.\n• (C) Trước cuối tháng này.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi 'How' hỏi cách thức/quy trình thực hiện (B). (A) là số tiền 'How much', (C) là hạn chót 'When'.\n💡 **Từ vựng trọng tâm:**\n• `reimbursement request` (/ˌriːɪmˈbɜːsmənt rɪˈkwɛst/): phiếu yêu cầu hoàn chi phí"
    },
    // Q27 - Suggestion with Why don't (đố mẹo)
    {
      q: "The conference room is already booked for tomorrow. What should we do?",
      a: "C",
      options: [
        { key: "A", text: "It seats up to fifty people." },
        { key: "B", text: "The conference was about renewable energy." },
        { key: "C", text: "Why don't we use the executive boardroom on the fifth floor?" }
      ],
      exp: "🎯 **Đáp án đúng: C** (Why don't we use the executive boardroom on the fifth floor?).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Phòng hội nghị đã được đặt trước cho ngày mai rồi. Chúng ta nên làm gì bây giờ?\n• (A) Nó chứa được tới năm mươi người.\n• (B) Hội nghị là về năng lượng tái tạo.\n• (C) Tại sao chúng ta không sử dụng phòng họp ban giám đốc ở tầng năm nhỉ?\n⚠️ **Phân tích bẫy thi ETS:**\n• Giải quyết tình huống bằng câu gợi ý giải pháp thay thế 'Why don't we...'.\n💡 **Từ vựng trọng tâm:**\n• `executive boardroom` (/ɪɡˈzɛkjʊtɪv ˈbɔːdruːm/): phòng họp ban điều hành/ban giám đốc"
    },
    // Q28 - Polite request with mind
    {
      q: "Would you mind reviewing my draft proposal before the deadline?",
      a: "A",
      options: [
        { key: "A", text: "Not at all. Send it to my inbox and I will take a look." },
        { key: "B", text: "The deadline is next Wednesday." },
        { key: "C", text: "I submitted my proposal last week." }
      ],
      exp: "🎯 **Đáp án đúng: A** (Not at all. Send it to my inbox and I will take a look).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Bạn có phiền xem lại bản dự thảo đề xuất của tôi trước hạn chót không?\n• (A) Không phiền chút nào. Hãy gửi nó vào hòm thư và tôi sẽ xem qua.\n• (B) Hạn chót là thứ Tư tuần tới.\n• (C) Tôi đã nộp đề xuất của mình tuần trước rồi.\n⚠️ **Phân tích bẫy thi ETS:**\n• Cấu trúc 'Would you mind...?': Đồng ý giúp đỡ trả lời 'Not at all / No, not at all'. Nếu trả lời 'Yes' mang nghĩa 'Có, tôi thấy rất phiền'.\n💡 **Từ vựng trọng tâm:**\n• `draft proposal` (/drɑːft prəˈpəʊzl/): bản dự thảo đề xuất\n• `take a look at`: xem qua, duyệt qua"
    },
    // Q29 - What + suggestion context
    {
      q: "What time does the shuttle bus leave for the airport?",
      a: "B",
      options: [
        { key: "A", text: "Yes, the bus stops right outside." },
        { key: "B", text: "There is one departing at 6:15 and another at 7:30." },
        { key: "C", text: "The airport is about forty minutes away." }
      ],
      exp: "🎯 **Đáp án đúng: B** (There is one departing at 6:15 and another at 7:30).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Xe buýt đưa đón khởi hành đi sân bay lúc mấy giờ?\n• (A) Vâng, xe buýt dừng ngay bên ngoài.\n• (B) Có một chuyến khởi hành lúc 6:15 và một chuyến khác lúc 7:30.\n• (C) Sân bay cách đây khoảng bốn mươi phút.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi 'What time' hỏi mốc giờ chạy xe buýt. Đáp án B cung cấp các mốc giờ khởi hành rõ ràng.\n💡 **Từ vựng trọng tâm:**\n• `shuttle bus` (/ˈʃʌtl bʌs/): xe buýt đưa đón tuyến ngắn\n• `depart at` (/dɪˈpɑːt æt/): khởi hành lúc"
    },
    // Q30 - Negative question (đố mẹo)
    {
      q: "Isn't the new branch office opening next Monday?",
      a: "C",
      options: [
        { key: "A", text: "Yes, near the subway station." },
        { key: "B", text: "It has over thirty employees." },
        { key: "C", text: "No, the opening has been pushed back to the following week." }
      ],
      exp: "🎯 **Đáp án đúng: C** (No, the opening has been pushed back to the following week).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Không phải là chi nhánh mới sẽ khai trương vào thứ Hai tới sao?\n• (A) Vâng, ở gần ga tàu điện ngầm.\n• (B) Nó có hơn ba mươi nhân viên.\n• (C) Không phải đâu, ngày khai trương đã bị dời lùi lại sang tuần tiếp theo rồi.\n⚠️ **Phân tích bẫy thi ETS:**\n• Câu hỏi phủ định 'Isn't...?': C đính chính sự việc khai trương đã bị hoãn lùi lịch (pushed back).\n💡 **Từ vựng trọng tâm:**\n• `pushed back to` (/pʊʃt bæk tuː/): bị dời lùi lại đến thời điểm sau"
    },
    // Q31 - Indirect + offer (đố mẹo)
    {
      q: "I cannot seem to get the new accounting software to work properly.",
      a: "A",
      options: [
        { key: "A", text: "Let me call the IT help desk and schedule a technician for you." },
        { key: "B", text: "The software was purchased in January." },
        { key: "C", text: "We use it for quarterly financial reports." }
      ],
      exp: "🎯 **Đáp án đúng: A** (Let me call the IT help desk and schedule a technician for you).\n🔍 **Dịch nghĩa:**\n• Câu hỏi: Tôi dường như không thể làm cho phần mềm kế toán mới hoạt động bình thường được.\n• (A) Để tôi gọi cho bàn hỗ trợ CNTT và đặt lịch kỹ thuật viên hỗ trợ bạn nhé.\n• (B) Phần mềm đã được mua vào tháng Một.\n• (C) Chúng tôi sử dụng nó cho các báo cáo tài chính hàng quý.\n⚠️ **Phân tích bẫy thi ETS:**\n• Dạng câu trần thuật nêu khó khăn (statement of problem): Người đáp phản hồi bằng lời đề nghị giúp đỡ giải quyết vấn đề (A).\n💡 **Từ vựng trọng tâm:**\n• `IT help desk` (/aɪ tiː hɛlp dɛsk/): bộ phận hỗ trợ kỹ thuật CNTT\n• `schedule a technician` (/ˈskɛdʒuːl ə tɛkˈnɪʃn/): xếp lịch kỹ thuật viên đến hỗ trợ"
    }
  ];

  part2Questions.forEach((item, idx) => {
    const qNum = idx + 7;
    const optionsText = item.options.map((opt) => `(${opt.key}) ${opt.text}`).join("\n");
    qs.push({
      id: `tlr1_q${qNum}`,
      partNumber: 2,
      partTitle: "Part 2: Question-Response",
      section: "LISTENING",
      audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(qNum % 10) + 1}.mp3`,
      passageText: `[Audio Transcript - Question ${qNum}]\nQuestion: ${item.q}\n${optionsText}`,
      questionText: `Question ${qNum}: ${item.q}`,
      options: item.options as any,
      correctAnswer: item.a as any,
      explanation: item.exp
    });
  });

      // PART 3: CONVERSATIONS (Q32 - Q70: 13 SETS × 3 QUESTIONS = 39 UNIQUE ETS QUESTIONS)
      const part3Sets: { transcript: string; questions: { q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        // SET 1 (Q32-34): Warehouse delivery delay
        {
          transcript: "Man: Good morning Sandra, I am following up on the bulk shipment of 15 ergonomic executive chairs we ordered from Star Logistics last Thursday. Did the truck arrive at our main warehouse facility this morning?\nWoman: Hi Thomas. Unfortunately no, the logistics dispatcher called our office at 8:30 AM to report a minor delay caused by emergency road maintenance on Interstate 95. They assured us that the freight truck will arrive at our warehouse by 3:00 PM today.\nMan: Thanks for letting me know right away. Please notify the facilities management team immediately so they can clear out Storage Bay B and ensure our forklift operators are on standby for unloading.",
          questions: [
            { q: "What problem does the woman report?", opts: [{ key: "A", text: "The chairs were shipped to the wrong warehouse address." }, { key: "B", text: "The supplier increased the unit price without prior notice." }, { key: "C", text: "A traffic delay caused by emergency road maintenance on Interstate 95." }, { key: "D", text: "A damaged container was discovered upon arrival." }], a: "C", exp: "Người phụ nữ nói rõ: 'a minor delay caused by emergency road maintenance on Interstate 95'." },
            { q: "What does the man ask the woman to do?", opts: [{ key: "A", text: "Cancel the delivery contract with Star Logistics." }, { key: "B", text: "Contact the truck driver for a direct update." }, { key: "C", text: "Order additional chairs from an alternative supplier." }, { key: "D", text: "Notify the facilities team to prepare Storage Bay B." }], a: "D", exp: "Người đàn ông yêu cầu: 'notify the facilities management team immediately so they can clear out Storage Bay B'." },
            { q: "At what time does the woman say the delivery will arrive?", opts: [{ key: "A", text: "3:00 PM." }, { key: "B", text: "8:30 AM." }, { key: "C", text: "12:00 PM." }, { key: "D", text: "1:00 PM." }], a: "A", exp: "Bẫy: 8:30 AM là giờ gọi báo trì hoãn, không phải giờ giao hàng. Đáp án: 'arrive at our warehouse by 3:00 PM today'." }
          ]
        },
        // SET 2 (Q35-37): Catering inquiry for company gala
        {
          transcript: "Man: Good afternoon, I am calling from Apex Financial Group. I am inquiring about your commercial catering packages for our upcoming annual company gala on November 15th. We are expecting approximately 250 guests.\nWoman: Thank you for considering us! We offer three comprehensive buffet packages: Classic Gourmet at forty-five dollars per person, Mediterranean Deluxe at sixty-five dollars per person, and a Premium Seafood selection at eighty-five dollars per person. All packages include professional service staff, table setup, and cleanup.\nMan: The Mediterranean package sounds ideal for our budget. Could you please send me a detailed price quotation and menu breakdown by email before Friday afternoon so our executive committee can review it during Monday's board meeting?",
          questions: [
            { q: "Why is the man calling?", opts: [{ key: "A", text: "To complain about a previous catering experience." }, { key: "B", text: "To inquire about catering services for a corporate event." }, { key: "C", text: "To cancel a reservation for a company dinner." }, { key: "D", text: "To place an order for office lunch delivery." }], a: "B", exp: "Người đàn ông nói rõ mục đích: 'inquiring about your commercial catering packages for our upcoming annual company gala'." },
            { q: "How much does the Mediterranean Deluxe package cost per person?", opts: [{ key: "A", text: "Forty-five dollars." }, { key: "B", text: "Eighty-five dollars." }, { key: "C", text: "Sixty-five dollars." }, { key: "D", text: "One hundred dollars." }], a: "C", exp: "Bẫy: 3 mức giá dễ nhầm. Classic = $45, Mediterranean = $65, Seafood = $85." },
            { q: "When does the man need the quotation?", opts: [{ key: "A", text: "By Wednesday morning." }, { key: "B", text: "Before Thursday noon." }, { key: "C", text: "By Monday's board meeting." }, { key: "D", text: "Before Friday afternoon." }], a: "D", exp: "Bẫy: Monday là ngày họp hội đồng (mục đích review), nhưng deadline gửi báo giá là 'before Friday afternoon'." }
          ]
        },
        // SET 3 (Q38-40): Marketing brochure error
        {
          transcript: "Woman: Marcus, have you had a chance to review the final draft of our new enterprise software marketing brochure before we send it to the commercial printer? The print run is scheduled for Wednesday morning.\nMan: Yes, I went through the entire forty-two-page layout this morning. Overall the design looks fantastic and the client testimonials section is very compelling. However, I noticed a critical pricing error on page 3 regarding our annual cloud subscription tiers. The Enterprise plan is listed at three hundred dollars, but it should be three hundred and fifty dollars per month.\nWoman: Oh, good catch! That could have been a serious problem with our customers. I will correct the figures in the master document right away and have the updated PDF ready by end of business today.",
          questions: [
            { q: "What is the woman's main concern?", opts: [{ key: "A", text: "The brochure needs to be reviewed before printing." }, { key: "B", text: "The brochure design is not visually appealing." }, { key: "C", text: "The commercial printer has increased its rates." }, { key: "D", text: "The client testimonials section needs rewriting." }], a: "A", exp: "Người phụ nữ hỏi Marcus: 'have you had a chance to review the final draft... before we send it to the commercial printer?'" },
            { q: "What error did the man find?", opts: [{ key: "A", text: "A misspelled company name on the cover page." }, { key: "B", text: "An incorrect price for the Enterprise cloud plan." }, { key: "C", text: "A missing page in the testimonials section." }, { key: "D", text: "An outdated product photo on page 3." }], a: "B", exp: "Marcus phát hiện: 'a critical pricing error on page 3 regarding our annual cloud subscription tiers'." },
            { q: "What will the woman do next?", opts: [{ key: "A", text: "Contact the printer to delay the print run." }, { key: "B", text: "Ask Marcus to rewrite the testimonials." }, { key: "C", text: "Correct the figures and prepare an updated PDF." }, { key: "D", text: "Schedule a meeting with the design team." }], a: "C", exp: "Người phụ nữ nói: 'I will correct the figures in the master document right away and have the updated PDF ready'." }
          ]
        },
        // SET 4 (Q41-43): Car rental upgrade
        {
          transcript: "Man: Hello, I reserved a compact rental sedan under the name David Peterson for three days starting today. My confirmation number is R-47823. I have a meeting in the financial district at 2:00 PM and I need to pick up the vehicle as soon as possible.\nWoman: Let me check our reservation system for you, Mr. Peterson. I see your booking right here. Due to unusually high weekend demand, all our compact sedans have already been rented out this morning. However, we would like to offer you a complimentary upgrade to a premium midsize SUV, the Hyundai Tucson, at absolutely no extra charge.\nMan: Wow, that is wonderful! I really appreciate the upgrade. Where do I pick up the keys, and is the vehicle already in the garage?",
          questions: [
            { q: "What is the man's problem?", opts: [{ key: "A", text: "His reservation was accidentally canceled." }, { key: "B", text: "The rental price is higher than expected." }, { key: "C", text: "He cannot find the rental office location." }, { key: "D", text: "The vehicle type he reserved is unavailable." }], a: "D", exp: "Bẫy: A gần đúng nhưng đặt chỗ vẫn còn — chỉ là loại xe compact không còn. 'all our compact sedans have already been rented out'." },
            { q: "What solution does the woman offer?", opts: [{ key: "A", text: "A free upgrade to a premium midsize SUV." }, { key: "B", text: "A full refund of the deposit." }, { key: "C", text: "A discounted rate for the next rental." }, { key: "D", text: "Delivery of the car to his office." }], a: "A", exp: "Đáp án: 'a complimentary upgrade to a premium midsize SUV... at absolutely no extra charge'." },
            { q: "What does the man want to know?", opts: [{ key: "A", text: "Whether insurance is included in the rental." }, { key: "B", text: "Where to pick up the keys and if the car is ready." }, { key: "C", text: "How to extend his rental period." }, { key: "D", text: "What documents are required for the upgrade." }], a: "B", exp: "Cuối đoạn hội thoại, người đàn ông hỏi: 'Where do I pick up the keys, and is the vehicle already in the garage?'" }
          ]
        },
        // SET 5 (Q44-46): Office renovation schedule
        {
          transcript: "Woman: Good morning, Kevin. I wanted to discuss the timeline for the third-floor office renovation project. The construction crew from Pinnacle Builders is scheduled to begin demolition work next Monday, October 21st.\nMan: That is sooner than I expected. Have we arranged temporary workspaces for the twelve employees who currently sit on the third floor? We cannot have them working in an active construction zone.\nWoman: Absolutely. I have already coordinated with building management to reserve the empty conference rooms on the fifth floor. Each room will be equipped with temporary desks, monitors, and network cables. The entire renovation should be completed within six weeks.\nMan: Perfect planning. Please also send an internal memo to all affected staff by Wednesday, reminding them to pack their personal belongings and label their equipment before the weekend.",
          questions: [
            { q: "What is the main topic of the conversation?", opts: [{ key: "A", text: "Hiring a new construction company for the building." }, { key: "B", text: "Purchasing new furniture for the conference rooms." }, { key: "C", text: "The schedule and logistics of an office renovation." }, { key: "D", text: "Relocating the company to a different building." }], a: "C", exp: "Chủ đề chính: timeline và logistics cho dự án cải tạo văn phòng tầng 3." },
            { q: "Where will the affected employees work temporarily?", opts: [{ key: "A", text: "In a nearby coworking space." }, { key: "B", text: "At their homes via remote work." }, { key: "C", text: "On the second floor of the same building." }, { key: "D", text: "In conference rooms on the fifth floor." }], a: "D", exp: "Người phụ nữ: 'reserve the empty conference rooms on the fifth floor'." },
            { q: "What does the man ask the woman to do by Wednesday?", opts: [{ key: "A", text: "Send an internal memo to affected staff about packing." }, { key: "B", text: "Finalize the contractor's payment terms." }, { key: "C", text: "Order new monitors for the temporary desks." }, { key: "D", text: "Schedule a building safety inspection." }], a: "A", exp: "Người đàn ông yêu cầu: 'send an internal memo to all affected staff by Wednesday, reminding them to pack their personal belongings'." }
          ]
        },
        // SET 6 (Q47-49): Job interview scheduling
        {
          transcript: "Man: Hi Rachel, I need your help scheduling the final round of interviews for the Senior Marketing Analyst position. We have narrowed the candidate pool down to three finalists, and the hiring committee would like to complete all interviews by next Friday.\nWoman: Sure. I will reach out to each candidate today to confirm their availability. Do you want to allocate forty-five minutes per interview, or would you prefer a full hour to include the case study presentation?\nMan: Let us go with the full hour. Each candidate will present their market analysis case study for twenty minutes, followed by a forty-minute panel Q and A session with the committee. Also, please reserve Conference Room A for all three slots and make sure the projector and whiteboard markers are available.",
          questions: [
            { q: "What position are they hiring for?", opts: [{ key: "A", text: "Junior Sales Representative." }, { key: "B", text: "Senior Marketing Analyst." }, { key: "C", text: "Chief Financial Officer." }, { key: "D", text: "Human Resources Manager." }], a: "B", exp: "Đáp án rõ ràng: 'the Senior Marketing Analyst position'." },
            { q: "How long will each interview last?", opts: [{ key: "A", text: "Thirty minutes." }, { key: "B", text: "Forty-five minutes." }, { key: "C", text: "One full hour." }, { key: "D", text: "Ninety minutes." }], a: "C", exp: "Bẫy: 45 phút được đề cập nhưng bị từ chối. Đáp án: 'Let us go with the full hour'." },
            { q: "What will each candidate do during the interview?", opts: [{ key: "A", text: "Take a written examination followed by a group discussion." }, { key: "B", text: "Complete a skills assessment test on the computer." }, { key: "C", text: "Shadow a current employee for the full session." }, { key: "D", text: "Present a case study for 20 minutes and then answer panel questions for 40 minutes." }], a: "D", exp: "Chi tiết: 'present their market analysis case study for twenty minutes, followed by a forty-minute panel Q and A session'." }
          ]
        },
        // SET 7 (Q50-52): Supply chain disruption
        {
          transcript: "Woman: James, I just received an urgent email from our primary supplier in Taiwan. They are reporting a two-week production delay on the microprocessor chips due to an unexpected equipment malfunction at their manufacturing facility.\nMan: That is going to severely impact our Q4 production schedule. We have committed to delivering 10,000 units of the new tablet to our retail partners by December 15th. Have you contacted our backup supplier in South Korea?\nWoman: Yes, I reached out to SemiTech Korea this morning. They confirmed they can supply the same chip specification, but at a twelve percent price premium due to expedited manufacturing. They also need at least a five-business-day lead time before shipping.\nMan: Given the tight deadline, I think we should authorize the premium pricing. Please get a formal purchase order drafted and send it to my desk for approval by end of day.",
          questions: [
            { q: "What is the main problem discussed?", opts: [{ key: "A", text: "A production delay on microprocessor chips from Taiwan." }, { key: "B", text: "A data security breach at the Taiwan facility." }, { key: "C", text: "A shipping container lost during ocean transit." }, { key: "D", text: "A quality defect discovered in finished products." }], a: "A", exp: "Vấn đề chính: 'a two-week production delay on the microprocessor chips due to an unexpected equipment malfunction'." },
            { q: "What is the additional cost from the backup supplier?", opts: [{ key: "A", text: "A five percent surcharge." }, { key: "B", text: "A twelve percent price premium." }, { key: "C", text: "A ten percent premium." }, { key: "D", text: "A fifteen percent markup." }], a: "B", exp: "SemiTech Korea: 'at a twelve percent price premium due to expedited manufacturing'." },
            { q: "What does the man ask the woman to prepare?", opts: [{ key: "A", text: "A revised production timeline for the retail partners." }, { key: "B", text: "An insurance claim for the equipment malfunction." }, { key: "C", text: "A formal purchase order for his approval by end of day." }, { key: "D", text: "A report comparing all available chip suppliers." }], a: "C", exp: "Người đàn ông: 'get a formal purchase order drafted and send it to my desk for approval by end of day'." }
          ]
        },
        // SET 8 (Q53-55): Hotel conference room booking
        {
          transcript: "Man: Hello, I am calling from Meridian Consulting. We would like to book the Grand Ballroom at your hotel for a two-day corporate retreat on January 18th and 19th. We are expecting around 120 attendees.\nWoman: Thank you for your interest, sir. Unfortunately, the Grand Ballroom is already reserved for a wedding reception on January 18th. However, I can offer you the Executive Summit Hall, which accommodates up to 150 guests and includes built-in audiovisual equipment, complimentary Wi-Fi, and a dedicated events coordinator.\nMan: That actually sounds even better for our needs. What is the daily rental rate, and does it include catering services?\nWoman: The Summit Hall is 3,500 dollars per day. Catering is available as an add-on starting at 35 dollars per person for a full lunch buffet. I can send you a complete package proposal by tomorrow if you would like.",
          questions: [
            { q: "Why can the man not book the Grand Ballroom?", opts: [{ key: "A", text: "It is under renovation during that period." }, { key: "B", text: "It exceeds the group's budget limit." }, { key: "C", text: "It does not have audiovisual equipment." }, { key: "D", text: "It is already reserved for a wedding reception." }], a: "D", exp: "Đáp án: 'the Grand Ballroom is already reserved for a wedding reception on January 18th'." },
            { q: "How much does the Executive Summit Hall cost per day?", opts: [{ key: "A", text: "3,500 dollars." }, { key: "B", text: "2,500 dollars." }, { key: "C", text: "3,000 dollars." }, { key: "D", text: "4,000 dollars." }], a: "A", exp: "Giá phòng: 'The Summit Hall is 3,500 dollars per day'." },
            { q: "What does the woman offer to send?", opts: [{ key: "A", text: "A floor plan of the ballroom." }, { key: "B", text: "A complete package proposal by tomorrow." }, { key: "C", text: "A list of nearby hotels with availability." }, { key: "D", text: "A contract for immediate signature." }], a: "B", exp: "Người phụ nữ: 'I can send you a complete package proposal by tomorrow'." }
          ]
        },
        // SET 9 (Q56-58): Product return & refund process
        {
          transcript: "Woman: Good afternoon, I purchased a Vertex Pro wireless headset from your store two weeks ago, and the right earpiece has stopped producing sound. I have the original receipt and the product is still within the 30-day warranty period.\nMan: I am sorry to hear about that, ma'am. We can certainly help you with this. You have two options: we can either provide a direct replacement with a brand new unit from our current stock, or we can process a full refund to your original payment method, which typically takes three to five business days.\nWoman: I would prefer a replacement since I really like the headset overall. Could you also check if there is a newer model available? I would be willing to pay the price difference if there is an upgrade option.\nMan: Absolutely. The Vertex Pro 2 was just released last week at 89 dollars, which is 20 dollars more than what you paid. I can apply your original purchase as credit toward the upgrade.",
          questions: [
            { q: "What is wrong with the woman's headset?", opts: [{ key: "A", text: "The Bluetooth connection keeps dropping." }, { key: "B", text: "The battery no longer holds a charge." }, { key: "C", text: "The right earpiece has stopped producing sound." }, { key: "D", text: "The headband is cracked and uncomfortable." }], a: "C", exp: "Cụ thể: 'the right earpiece has stopped producing sound'." },
            { q: "What does the woman choose to do?", opts: [{ key: "A", text: "Request a full refund to her credit card." }, { key: "B", text: "File a complaint with the manufacturer." }, { key: "C", text: "Exchange it for a completely different brand." }, { key: "D", text: "Get a replacement and ask about an upgrade option." }], a: "D", exp: "Người phụ nữ: 'I would prefer a replacement... Could you also check if there is a newer model available?'" },
            { q: "How much more does the Vertex Pro 2 cost compared to the original?", opts: [{ key: "A", text: "20 dollars more." }, { key: "B", text: "10 dollars more." }, { key: "C", text: "15 dollars more." }, { key: "D", text: "25 dollars more." }], a: "A", exp: "Bẫy: tổng giá $89 được nêu nhưng câu hỏi hỏi chênh lệch. Đáp án: '20 dollars more than what you paid'." }
          ]
        },
        // SET 10 (Q59-61): 3-speaker office relocation discussion
        {
          transcript: "Woman 1: I have just received confirmation from the real estate agent. The lease for our new office space on Park Avenue has been finalized, and we can begin moving in starting February 1st.\nMan: That is excellent news, Lisa. How much larger is the new space compared to our current location?\nWoman 1: It is approximately 40 percent larger, with dedicated areas for the engineering lab, a rooftop terrace for employee breaks, and a client presentation theater on the ground floor.\nWoman 2: I have already contacted three moving companies for quotes. Atlas Movers offered the most competitive price at 8,200 dollars for the full relocation, including IT server migration and furniture assembly at the new site. They estimate the move will take two full days.\nMan: Let us go with Atlas Movers. Sarah, please coordinate the IT department to ensure all servers and network infrastructure are properly backed up before the physical move begins.",
          questions: [
            { q: "What has been finalized?", opts: [{ key: "A", text: "The purchase of a new office building." }, { key: "B", text: "The lease agreement for new office space on Park Avenue." }, { key: "C", text: "The renovation plan for the current office." }, { key: "D", text: "The merger with a competing company." }], a: "B", exp: "Lisa: 'The lease for our new office space on Park Avenue has been finalized'." },
            { q: "How much larger is the new office?", opts: [{ key: "A", text: "20 percent larger." }, { key: "B", text: "30 percent larger." }, { key: "C", text: "40 percent larger." }, { key: "D", text: "50 percent larger." }], a: "C", exp: "Đáp án: 'approximately 40 percent larger'." },
            { q: "What does the man ask Sarah to coordinate?", opts: [{ key: "A", text: "Booking a cleaning crew for the new office." }, { key: "B", text: "Ordering new furniture for the presentation theater." }, { key: "C", text: "Sending moving announcements to all clients." }, { key: "D", text: "Backing up servers and network infrastructure before the move." }], a: "D", exp: "Người đàn ông: 'coordinate the IT department to ensure all servers and network infrastructure are properly backed up'." }
          ]
        },
        // SET 11 (Q62-64): Training workshop feedback
        {
          transcript: "Man: Diana, how did the leadership development workshop go yesterday? I heard we had a record number of participants from across all regional offices.\nWoman: It went exceptionally well. We had 78 attendees, which is double the number from last year's session. The keynote speaker, Dr. Amanda Foster from Stanford Business School, received outstanding evaluations. Ninety-two percent of participants rated her presentation as excellent.\nMan: That is impressive. Were there any issues with the virtual participants joining through the video conferencing platform?\nWoman: Actually, yes. About fifteen remote participants experienced audio buffering during the first twenty minutes. Our IT team resolved the bandwidth issue by switching to a backup server, and the rest of the session ran smoothly. Several attendees have already requested that we schedule a follow-up advanced workshop in March.",
          questions: [
            { q: "How many people attended the workshop?", opts: [{ key: "A", text: "78 attendees." }, { key: "B", text: "39 attendees." }, { key: "C", text: "56 attendees." }, { key: "D", text: "92 attendees." }], a: "A", exp: "Bẫy: 92 là phần trăm đánh giá tốt, không phải số người. Đáp án: 'We had 78 attendees'." },
            { q: "What technical problem occurred?", opts: [{ key: "A", text: "The projector malfunctioned during the keynote." }, { key: "B", text: "Remote participants experienced audio buffering issues." }, { key: "C", text: "The video recording system failed completely." }, { key: "D", text: "The conference room's air conditioning broke down." }], a: "B", exp: "Sự cố: 'about fifteen remote participants experienced audio buffering during the first twenty minutes'." },
            { q: "What have some attendees requested?", opts: [{ key: "A", text: "A certificate of completion for the workshop." }, { key: "B", text: "A recording of Dr. Foster's presentation." }, { key: "C", text: "A follow-up advanced workshop in March." }, { key: "D", text: "A refund due to the technical difficulties." }], a: "C", exp: "Đáp án: 'Several attendees have already requested that we schedule a follow-up advanced workshop in March'." }
          ]
        },
        // SET 12 (Q65-67): Restaurant reservation for client dinner
        {
          transcript: "Woman: Hello, I would like to make a reservation for a private business dinner at your restaurant. We need a table for eight people this Saturday evening around 7:30 PM.\nMan: Thank you for calling La Maison Dorée. Let me check our availability for Saturday. We do have our Bordeaux Private Dining Room available that evening, which seats up to ten guests. It features a dedicated server, a curated five-course wine pairing menu, and floor-to-ceiling windows overlooking the harbor.\nWoman: That sounds perfect for impressing our international clients. What is the price per person for the five-course menu?\nMan: The prix fixe dinner is 185 dollars per person, including wine pairings. We also offer a premium upgrade to include champagne and artisanal desserts for an additional 40 dollars per person. Shall I reserve the room under your company name?",
          questions: [
            { q: "How many guests will attend the dinner?", opts: [{ key: "A", text: "Six guests." }, { key: "B", text: "Ten guests." }, { key: "C", text: "Twelve guests." }, { key: "D", text: "Eight guests." }], a: "D", exp: "Bẫy: 10 là sức chứa tối đa phòng, nhưng đặt cho 'eight people'. Câu đố mẹo kiểm tra đọc kỹ." },
            { q: "What is the base price per person?", opts: [{ key: "A", text: "185 dollars." }, { key: "B", text: "145 dollars." }, { key: "C", text: "225 dollars." }, { key: "D", text: "265 dollars." }], a: "A", exp: "Prix fixe: '185 dollars per person, including wine pairings'. Premium upgrade = +$40 nhưng đó là add-on." },
            { q: "What is the purpose of the dinner?", opts: [{ key: "A", text: "A family birthday celebration." }, { key: "B", text: "Impressing international clients." }, { key: "C", text: "A staff farewell party." }, { key: "D", text: "A wedding anniversary dinner." }], a: "B", exp: "Người phụ nữ: 'That sounds perfect for impressing our international clients'." }
          ]
        },
        // SET 13 (Q68-70): Merger announcement & staff communication
        {
          transcript: "Man: Patricia, I wanted to brief you before tomorrow's all-hands meeting. The board of directors officially approved the merger with Orion Technologies last night. The combined entity will operate under the new name Apex-Orion Global Solutions, effective January 1st.\nWoman: That is significant news. How will this affect our current employees? I have already been receiving concerned emails from several department heads about potential restructuring and layoffs.\nMan: No positions will be eliminated in the first twelve months. The merger is focused on expanding our product portfolio and entering the Asian-Pacific market. However, some roles may be reassigned to the new Singapore regional office that Orion currently operates.\nWoman: That is reassuring. Should I prepare talking points for department managers to share with their teams before the public announcement?\nMan: Yes, please draft a comprehensive FAQ document covering job security, benefits continuity, and the transition timeline. Have it ready for my review by 4 PM today.",
          questions: [
            { q: "What was recently approved?", opts: [{ key: "A", text: "The acquisition of a competitor's patent portfolio." }, { key: "B", text: "A new round of venture capital funding." }, { key: "C", text: "The merger with Orion Technologies." }, { key: "D", text: "The expansion of the Singapore office." }], a: "C", exp: "Đáp án: 'The board of directors officially approved the merger with Orion Technologies last night'." },
            { q: "What does the man say about current employees?", opts: [{ key: "A", text: "All employees will receive a 10 percent salary increase." }, { key: "B", text: "Some departments will be shut down immediately." }, { key: "C", text: "Everyone must reapply for their current roles." }, { key: "D", text: "No positions will be eliminated in the first twelve months." }], a: "D", exp: "Cam kết: 'No positions will be eliminated in the first twelve months'. Tuy nhiên 'some roles may be reassigned' (sắp xếp lại, không phải sa thải)." },
            { q: "What document does the man ask Patricia to prepare?", opts: [{ key: "A", text: "A comprehensive FAQ document for department managers." }, { key: "B", text: "A press release for the media." }, { key: "C", text: "A financial forecast for the merged company." }, { key: "D", text: "A new employee handbook for Orion staff." }], a: "A", exp: "Yêu cầu: 'draft a comprehensive FAQ document covering job security, benefits continuity, and the transition timeline'." }
          ]
        }
      ];

      let part3QNum = 32;
      part3Sets.forEach((set, setIndex) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr1_q${part3QNum}`,
            partNumber: 3,
            partTitle: "Part 3: Conversations",
            section: "LISTENING",
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(setIndex % 5) + 1}.mp3`,
            passageText: `[Audio Transcript - Conversation #${setIndex + 1}]\n${set.transcript}`,
            questionText: `Question ${part3QNum}: ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
          part3QNum++;
        });
      });

      // PART 4: SHORT TALKS (Q71 - Q100: 10 UNIQUE ETS DEEP SHORT TALKS)
      // PART 4: SHORT TALKS (Q71 - Q100: 10 SETS × 3 QUESTIONS = 30 UNIQUE ETS QUESTIONS)
      const part4Sets: { transcript: string; questions: { q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        // TALK 1 (Q71-73): Airport boarding announcement
        {
          transcript: "Attention all passengers traveling on TransGlobal Airways flight TG-320 bound for London Heathrow with non-stop service. Boarding is now commencing at Gate 14 on Departure Level 2. We kindly request that all passengers have your printed boarding pass and a valid passport or government-issued photo identification ready for scanning at the gate. Priority boarding is now available for First Class and Business Class ticket holders. General boarding for Economy Class passengers seated in rows 25 through 40 will begin in approximately ten minutes. Please note that carry-on baggage must fit in the overhead compartment or under the seat in front of you. TransGlobal Airways thanks you for choosing us and wishes you a pleasant flight.",
          questions: [
            { q: "What is the purpose of this announcement?", opts: [{ key: "A", text: "To inform travelers of an emergency flight cancellation." }, { key: "B", text: "To announce the commencement of flight boarding at Gate 14." }, { key: "C", text: "To offer dining discount vouchers for airport restaurants." }, { key: "D", text: "To request passengers to collect baggage at carousel 3." }], a: "B", exp: "Thông báo bắt đầu boarding: 'Boarding is now commencing at Gate 14 on Departure Level 2'." },
            { q: "What should passengers have ready?", opts: [{ key: "A", text: "A vaccination certificate and travel insurance." }, { key: "B", text: "A credit card for in-flight purchases." }, { key: "C", text: "A boarding pass and valid passport or photo ID." }, { key: "D", text: "A luggage claim ticket and customs form." }], a: "C", exp: "Yêu cầu: 'have your printed boarding pass and a valid passport or government-issued photo identification ready'." },
            { q: "When will Economy Class passengers in rows 25-40 begin boarding?", opts: [{ key: "A", text: "Immediately." }, { key: "B", text: "In approximately five minutes." }, { key: "C", text: "After all Business Class passengers have boarded." }, { key: "D", text: "In approximately ten minutes." }], a: "D", exp: "Đáp án: 'General boarding for Economy Class passengers seated in rows 25 through 40 will begin in approximately ten minutes'." }
          ]
        },
        // TALK 2 (Q74-76): Factory tour guide
        {
          transcript: "Welcome to the annual Apex National Manufacturing Facility tour. My name is David Miller, and I will be your guide through our state-of-the-art automated robotic assembly line today. Before we step onto the active production floor, please ensure that your safety goggles and ear protective gear are securely fastened at all times. Photography is strictly prohibited in Sections A through C due to proprietary technology. We will first examine the precision laser welding station at Bay 3, where robotic arms perform over 200 welds per minute. Following that, we will visit the quality control laboratory on the second floor, where every tenth unit undergoes a comprehensive 47-point inspection. The tour will conclude with a short presentation in the visitor center, where refreshments will be served.",
          questions: [
            { q: "Who is David Miller?", opts: [{ key: "A", text: "The tour guide for the facility visit." }, { key: "B", text: "The factory's chief executive officer." }, { key: "C", text: "A safety inspector from the government." }, { key: "D", text: "A robot engineer on the production line." }], a: "A", exp: "Đáp án: 'My name is David Miller, and I will be your guide'." },
            { q: "What is prohibited in Sections A through C?", opts: [{ key: "A", text: "Eating and drinking." }, { key: "B", text: "Taking photographs." }, { key: "C", text: "Using mobile phones for calls." }, { key: "D", text: "Wearing open-toe shoes." }], a: "B", exp: "Quy định: 'Photography is strictly prohibited in Sections A through C due to proprietary technology'." },
            { q: "What happens to every tenth unit produced?", opts: [{ key: "A", text: "It is donated to a charity organization." }, { key: "B", text: "It is shipped directly to overseas distributors." }, { key: "C", text: "It undergoes a comprehensive 47-point inspection." }, { key: "D", text: "It is disassembled for recycling materials." }], a: "C", exp: "Kiểm soát chất lượng: 'every tenth unit undergoes a comprehensive 47-point inspection'." }
          ]
        },
        // TALK 3 (Q77-79): Radio advertisement
        {
          transcript: "Are you looking to upgrade your office space with premium eco-friendly furniture? GreenSpace Designs is celebrating its 10th anniversary by offering an exclusive 30 percent discount on all ergonomic standing desks and adjustable mesh chairs throughout the entire month of October! Our products are crafted from sustainably sourced bamboo and recycled aluminum, and every piece comes with a 5-year manufacturer warranty. Visit our flagship showroom on 245 Oak Street in the downtown business district, or browse our complete catalog online at greenspace dot com. Use promo code GREEN10 at checkout for free nationwide shipping on orders over 500 dollars. Offer ends October 31st, so do not miss out!",
          questions: [
            { q: "What is GreenSpace Designs celebrating?", opts: [{ key: "A", text: "The opening of a second retail location." }, { key: "B", text: "A partnership with a major furniture chain." }, { key: "C", text: "Winning an environmental sustainability award." }, { key: "D", text: "Its 10th anniversary." }], a: "D", exp: "Đáp án: 'GreenSpace Designs is celebrating its 10th anniversary'." },
            { q: "What is the discount percentage being offered?", opts: [{ key: "A", text: "30 percent." }, { key: "B", text: "15 percent." }, { key: "C", text: "20 percent." }, { key: "D", text: "25 percent." }], a: "A", exp: "Ưu đãi: 'an exclusive 30 percent discount on all ergonomic standing desks and adjustable mesh chairs'." },
            { q: "What does promo code GREEN10 provide?", opts: [{ key: "A", text: "An additional 10 percent off the total price." }, { key: "B", text: "Free nationwide shipping on orders over 500 dollars." }, { key: "C", text: "A complimentary desk lamp with purchase." }, { key: "D", text: "A free extended warranty for 10 years." }], a: "B", exp: "Bẫy: mã GREEN10 không cho giảm thêm 10% — mà cho 'free nationwide shipping on orders over 500 dollars'." }
          ]
        },
        // TALK 4 (Q80-82): Museum tour guide
        {
          transcript: "Good afternoon, everyone, and welcome to the National Maritime Museum. I am your guide, Professor Elena Vasquez. Today's tour will focus on our newest permanent exhibition, 'Voyages of Discovery,' which chronicles 500 years of oceanic exploration from the 15th century to the modern era. We will begin in Gallery A on the ground floor, where you can see the original navigation instruments used by Portuguese explorers, including a rare 1492 astrolabe. Please note that the interactive shipbuilding simulator on the third floor will be temporarily closed for maintenance until next Thursday. Gift shop purchases receive a 15 percent discount with your museum admission ticket. The tour will last approximately 90 minutes.",
          questions: [
            { q: "What is the name of the new exhibition?", opts: [{ key: "A", text: "Masters of the Sea." }, { key: "B", text: "Ancient Civilizations." }, { key: "C", text: "Voyages of Discovery." }, { key: "D", text: "The Art of Navigation." }], a: "C", exp: "Triển lãm: 'our newest permanent exhibition, Voyages of Discovery'." },
            { q: "What is temporarily closed?", opts: [{ key: "A", text: "Gallery A on the ground floor." }, { key: "B", text: "The museum gift shop." }, { key: "C", text: "The café and dining area." }, { key: "D", text: "The interactive shipbuilding simulator on the third floor." }], a: "D", exp: "Đóng cửa: 'the interactive shipbuilding simulator on the third floor will be temporarily closed for maintenance until next Thursday'." },
            { q: "How long will the tour last?", opts: [{ key: "A", text: "90 minutes." }, { key: "B", text: "45 minutes." }, { key: "C", text: "60 minutes." }, { key: "D", text: "120 minutes." }], a: "A", exp: "Thời lượng: 'The tour will last approximately 90 minutes'." }
          ]
        },
        // TALK 5 (Q83-85): Weather report
        {
          transcript: "Good morning, this is Jennifer Walsh with your Greater Metro Area weather forecast for Tuesday, November 5th. We are currently seeing clear skies with temperatures around 52 degrees Fahrenheit. However, a cold front moving in from the northwest is expected to bring significant changes by this afternoon. Temperatures will drop to the low 40s, and there is an 80 percent chance of moderate rainfall starting around 3 PM and continuing through the evening commute. Winds will pick up to 25 miles per hour with gusts reaching 35 miles per hour. Drivers are advised to allow extra travel time and use headlights in reduced visibility. Tomorrow's outlook shows the rain clearing by mid-morning with partly cloudy skies returning by the afternoon.",
          questions: [
            { q: "What is the current weather condition?", opts: [{ key: "A", text: "Heavy rainfall with thunderstorms." }, { key: "B", text: "Clear skies with temperatures around 52 degrees." }, { key: "C", text: "Snow flurries with freezing temperatures." }, { key: "D", text: "Overcast with dense fog." }], a: "B", exp: "Hiện tại: 'clear skies with temperatures around 52 degrees Fahrenheit'." },
            { q: "What is expected this afternoon?", opts: [{ key: "A", text: "A heat wave with temperatures above 90 degrees." }, { key: "B", text: "Sunny skies and mild temperatures." }, { key: "C", text: "Temperature drop and moderate rainfall starting around 3 PM." }, { key: "D", text: "Tornado warnings for the metro area." }], a: "C", exp: "Dự báo: 'Temperatures will drop to the low 40s... 80 percent chance of moderate rainfall starting around 3 PM'." },
            { q: "What advice is given to drivers?", opts: [{ key: "A", text: "Avoid all highways until further notice." }, { key: "B", text: "Park vehicles in covered garages." }, { key: "C", text: "Take public transportation instead of driving." }, { key: "D", text: "Allow extra travel time and use headlights." }], a: "D", exp: "Lời khuyên: 'Drivers are advised to allow extra travel time and use headlights in reduced visibility'." }
          ]
        },
        // TALK 6 (Q86-88): Voicemail message
        {
          transcript: "Hello, Ms. Nakamura, this is Robert Chen from Sterling Architecture Associates returning your call about the residential renovation blueprints. I have completed the revised floor plans incorporating all the changes we discussed last Friday, including the expanded kitchen layout, the additional bathroom on the second floor, and the reinforced foundation specifications for the rooftop garden. I would like to schedule a meeting with you and the structural engineer, Mr. Patel, to review the updated drawings before we submit them to the city planning department for permit approval. The permit application deadline is November 30th, so we should meet no later than November 20th. Please call me back at 555-0147 or email me at robert at sterling arch dot com to confirm a convenient date and time.",
          questions: [
            { q: "Who is leaving the voicemail?", opts: [{ key: "A", text: "An architect from Sterling Architecture Associates." }, { key: "B", text: "A city planning department official." }, { key: "C", text: "A real estate agent selling the property." }, { key: "D", text: "A contractor bidding on the renovation project." }], a: "A", exp: "Đáp án: 'this is Robert Chen from Sterling Architecture Associates'." },
            { q: "What changes were made to the blueprints?", opts: [{ key: "A", text: "A swimming pool and outdoor patio were added." }, { key: "B", text: "An expanded kitchen, additional bathroom, and reinforced rooftop foundation." }, { key: "C", text: "The garage was converted into a home office." }, { key: "D", text: "The building was redesigned from two stories to three stories." }], a: "B", exp: "3 thay đổi: 'expanded kitchen layout, additional bathroom on the second floor, reinforced foundation specifications for the rooftop garden'." },
            { q: "By when does Robert suggest they should meet?", opts: [{ key: "A", text: "By October 30th." }, { key: "B", text: "By November 15th." }, { key: "C", text: "By November 20th." }, { key: "D", text: "By November 30th." }], a: "C", exp: "Bẫy: November 30th là deadline nộp permit, nhưng họp phải trước 'no later than November 20th'." }
          ]
        },
        // TALK 7 (Q89-91): News broadcast
        {
          transcript: "In business news today, Zenith Technologies, the Silicon Valley-based software company, announced a landmark acquisition of DataStream Analytics for 2.4 billion dollars. The deal, which is expected to close by the end of the first quarter of next year, will make Zenith the largest provider of cloud-based data analytics solutions in North America. DataStream's 3,500 employees will be integrated into Zenith's existing workforce, and the company has confirmed that no layoffs are planned as part of the transition. Industry analysts predict the combined entity will generate annual revenues exceeding 8 billion dollars. Zenith's stock price rose 7 percent in after-hours trading following the announcement.",
          questions: [
            { q: "How much is the acquisition worth?", opts: [{ key: "A", text: "1.2 billion dollars." }, { key: "B", text: "4.8 billion dollars." }, { key: "C", text: "8 billion dollars." }, { key: "D", text: "2.4 billion dollars." }], a: "D", exp: "Bẫy: $8 billion là doanh thu dự kiến, không phải giá mua. Đáp án: 'acquisition of DataStream Analytics for 2.4 billion dollars'." },
            { q: "What will happen to DataStream's employees?", opts: [{ key: "A", text: "They will be integrated with no layoffs planned." }, { key: "B", text: "They will receive severance packages." }, { key: "C", text: "They will be offered early retirement." }, { key: "D", text: "They will be relocated to a new headquarters." }], a: "A", exp: "Nhân viên: 'will be integrated into Zenith's existing workforce... no layoffs are planned'." },
            { q: "How did Zenith's stock price react?", opts: [{ key: "A", text: "It dropped 3 percent." }, { key: "B", text: "It rose 7 percent in after-hours trading." }, { key: "C", text: "It remained unchanged." }, { key: "D", text: "It was temporarily suspended from trading." }], a: "B", exp: "Cổ phiếu: 'Zenith's stock price rose 7 percent in after-hours trading'." }
          ]
        },
        // TALK 8 (Q92-94): Company meeting introduction
        {
          transcript: "Good morning, everyone. Thank you for joining this quarter's all-hands meeting. Before we get into the financial results, I have some exciting organizational announcements. First, I am pleased to welcome Ms. Karen Sullivan, who will be joining us as our new Vice President of Global Operations starting December 1st. Karen comes to us from Pinnacle Industries, where she led a team of 800 employees across 12 countries. Second, our employee satisfaction survey results are in, and I am thrilled to report that overall satisfaction has increased by 14 percentage points compared to last year, reaching an all-time high of 87 percent. Finally, our annual company retreat has been confirmed for February 8th through 10th at the Lakeview Grand Resort. Registration details will be sent via email by end of this week.",
          questions: [
            { q: "What is Karen Sullivan's new role?", opts: [{ key: "A", text: "Director of Human Resources." }, { key: "B", text: "Chief Technology Officer." }, { key: "C", text: "Vice President of Global Operations." }, { key: "D", text: "Regional Sales Manager." }], a: "C", exp: "Chức vụ: 'Ms. Karen Sullivan... our new Vice President of Global Operations'." },
            { q: "What is the current employee satisfaction score?", opts: [{ key: "A", text: "73 percent." }, { key: "B", text: "78 percent." }, { key: "C", text: "83 percent." }, { key: "D", text: "87 percent." }], a: "D", exp: "Bẫy: 14 phần trăm là mức tăng, không phải tổng. Đáp án: 'reaching an all-time high of 87 percent'." },
            { q: "When is the company retreat?", opts: [{ key: "A", text: "February 8th through 10th." }, { key: "B", text: "January 15th through 17th." }, { key: "C", text: "March 1st through 3rd." }, { key: "D", text: "December 1st through 3rd." }], a: "A", exp: "Bẫy: December 1st là ngày Karen bắt đầu. Retreat: 'February 8th through 10th at the Lakeview Grand Resort'." }
          ]
        },
        // TALK 9 (Q95-97): Company policy update
        {
          transcript: "Attention all employees. This is a reminder from the Human Resources department regarding the updated travel and expense reimbursement policy that takes effect on November 1st. Under the new guidelines, all domestic business trips must be approved by your department head at least five business days before the travel date, up from the previous three-day requirement. International travel now requires additional approval from the VP of Finance. Hotel accommodations are capped at 200 dollars per night for domestic travel and 300 dollars per night for international destinations. All expense reports must be submitted within 10 business days of returning from a trip, accompanied by original receipts or digital scans. Late submissions will not be processed until the following reimbursement cycle. For questions, contact HR at extension 4200.",
          questions: [
            { q: "When does the new policy take effect?", opts: [{ key: "A", text: "October 1st." }, { key: "B", text: "November 1st." }, { key: "C", text: "December 1st." }, { key: "D", text: "January 1st." }], a: "B", exp: "Đáp án: 'the updated travel and expense reimbursement policy that takes effect on November 1st'." },
            { q: "How far in advance must domestic trips be approved?", opts: [{ key: "A", text: "One business day." }, { key: "B", text: "Three business days." }, { key: "C", text: "Five business days." }, { key: "D", text: "Ten business days." }], a: "C", exp: "Bẫy: 3 ngày là quy định CŨ. Đáp án mới: 'at least five business days before the travel date, up from the previous three-day requirement'." },
            { q: "What is the hotel cap for international travel?", opts: [{ key: "A", text: "150 dollars per night." }, { key: "B", text: "200 dollars per night." }, { key: "C", text: "250 dollars per night." }, { key: "D", text: "300 dollars per night." }], a: "D", exp: "Bẫy: $200 là cap cho domestic. International: '300 dollars per night for international destinations'." }
          ]
        },
        // TALK 10 (Q98-100): Real estate listing presentation
        {
          transcript: "Thank you for joining today's virtual open house for 742 Riverside Drive, a stunning four-bedroom colonial-style residence in the highly sought-after Westlake neighborhood. This property was completely renovated in 2025 and features a gourmet kitchen with granite countertops and stainless steel appliances, hardwood floors throughout, a finished basement with a home theater, and a landscaped backyard with an in-ground heated swimming pool. The property sits on a quarter-acre lot and is located just a five-minute walk from Westlake Elementary School and the Metro Green Line station. It is listed at 875,000 dollars, and the sellers are open to reasonable offers. Private viewings can be arranged by contacting our office at 555-0298. Open house visits are available this Saturday and Sunday from 1 to 4 PM.",
          questions: [
            { q: "How many bedrooms does the property have?", opts: [{ key: "A", text: "Four bedrooms." }, { key: "B", text: "Two bedrooms." }, { key: "C", text: "Three bedrooms." }, { key: "D", text: "Five bedrooms." }], a: "A", exp: "Đáp án: 'a stunning four-bedroom colonial-style residence'." },
            { q: "What is the listing price?", opts: [{ key: "A", text: "675,000 dollars." }, { key: "B", text: "875,000 dollars." }, { key: "C", text: "775,000 dollars." }, { key: "D", text: "975,000 dollars." }], a: "B", exp: "Giá niêm yết: 'listed at 875,000 dollars'." },
            { q: "When are open house visits available?", opts: [{ key: "A", text: "Weekdays from 9 AM to 5 PM." }, { key: "B", text: "By appointment only on Mondays." }, { key: "C", text: "Saturday and Sunday from 1 to 4 PM." }, { key: "D", text: "Every evening from 6 to 8 PM." }], a: "C", exp: "Lịch tham quan: 'this Saturday and Sunday from 1 to 4 PM'." }
          ]
        }
      ];

      let part4QNum = 71;
      part4Sets.forEach((set, setIndex) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr1_q${part4QNum}`,
            partNumber: 4,
            partTitle: "Part 4: Short Talks",
            section: "LISTENING",
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(setIndex % 4) + 1}.mp3`,
            passageText: `[Audio Transcript - Short Talk #${setIndex + 1}]\n"${set.transcript}"`,
            questionText: `Question ${part4QNum}: ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
          part4QNum++;
        });
      });

      // PART 5: INCOMPLETE SENTENCES (Q101 - Q130: 30 UNIQUE ETS GRAMMAR & VOCAB QUESTIONS)
      const part5Data: { q: string; a: "A"|"B"|"C"|"D"; opts: { key: string; text: string }[]; exp: string }[] = [
        { q: "Mr. Henderson will review the annual budget proposal _______ submitting it to the board of directors.", a: "A", opts: [{ key: "A", text: "prior to" }, { key: "B", text: "ahead" }, { key: "C", text: "because" }, { key: "D", text: "instead" }], exp: "Cụm giới từ 'prior to' + V-ing mang nghĩa 'trước khi'. Cấu trúc phù hợp với ngữ cảnh câu hỏi." },
        { q: "Ms. Larson requested that the marketing report be sent directly to _______ before the client briefing.", a: "B", opts: [{ key: "A", text: "she" }, { key: "B", text: "her" }, { key: "C", text: "hers" }, { key: "D", text: "herself" }], exp: "Đại từ tân ngữ 'her' đứng sau giới từ 'to'. 'She' là chủ ngữ, 'hers' là đại từ sở hữu." },
        { q: "The newly installed air conditioning unit operates much more _______ than the previous model.", a: "C", opts: [{ key: "A", text: "quiet" }, { key: "B", text: "quietness" }, { key: "C", text: "quietly" }, { key: "D", text: "quieter" }], exp: "Trạng từ 'quietly' bổ nghĩa cho động từ 'operates' trong cấu trúc so sánh hơn 'more quietly than'." },
        { q: "All attendees must register at the reception desk _______ entering the main auditorium.", a: "D", opts: [{ key: "A", text: "during" }, { key: "B", text: "along" }, { key: "C", text: "since" }, { key: "D", text: "upon" }], exp: "Giới từ 'upon + V-ing' mang nghĩa 'ngay khi/khi'. 'Upon entering' = khi bước vào khán phòng." },
        { q: "The engineering department has successfully _______ the software integration ahead of schedule.", a: "A", opts: [{ key: "A", text: "completed" }, { key: "B", text: "completing" }, { key: "C", text: "completion" }, { key: "D", text: "complete" }], exp: "Thì hiện tại hoàn thành: 'has successfully + completed' (past participle)." },
        { q: "Please verify that all billing information is accurate _______ finalizing your online order.", a: "B", opts: [{ key: "A", text: "whereas" }, { key: "B", text: "when" }, { key: "C", text: "despite" }, { key: "D", text: "unless" }], exp: "Liên từ 'when' rút gọn cùng chủ ngữ (+ V-ing) = khi hoàn tất đơn hàng trực tuyến." },
        { q: "Dr. Vance gave an extremely _______ presentation on renewable energy initiatives in Southeast Asia.", a: "C", opts: [{ key: "A", text: "inform" }, { key: "B", text: "information" }, { key: "C", text: "informative" }, { key: "D", text: "informatively" }], exp: "Tính từ 'informative' đứng sau phó từ 'extremely' để bổ nghĩa cho danh từ 'presentation'." },
        { q: "Employees who demonstrate exceptional leadership skills may be eligible for _______ advancement.", a: "D", opts: [{ key: "A", text: "rapidly" }, { key: "B", text: "rapidity" }, { key: "C", text: "more rapid" }, { key: "D", text: "rapid" }], exp: "Tính từ 'rapid' bổ nghĩa cho danh từ 'advancement' (sự thăng tiến nhanh chóng)." },
        { q: "The factory supervisor emphasized the _______ of adhering strictly to occupational safety guidelines.", a: "A", opts: [{ key: "A", text: "importance" }, { key: "B", text: "important" }, { key: "C", text: "importantly" }, { key: "D", text: "import" }], exp: "Danh từ 'importance' đứng sau mạo từ 'the' trong cấu trúc 'the importance of...'" },
        { q: "The corporate merger is _______ upon receiving formal approval from international regulatory bodies.", a: "B", opts: [{ key: "A", text: "contingently" }, { key: "B", text: "contingent" }, { key: "C", text: "contingency" }, { key: "D", text: "contingencies" }], exp: "Cụm tính từ 'contingent upon' mang nghĩa 'tùy thuộc vào / dựa trên'." },
        { q: "Because of the heavy snowstorm, flight departures have been postponed _______ tomorrow morning.", a: "C", opts: [{ key: "A", text: "among" }, { key: "B", text: "between" }, { key: "C", text: "until" }, { key: "D", text: "across" }], exp: "Giới từ 'until' chỉ mốc thời gian kéo dài đến sáng mai: 'postponed until tomorrow morning'." },
        { q: "The keynote speaker will discuss innovative strategies for _______ customer retention rates.", a: "D", opts: [{ key: "A", text: "enhance" }, { key: "B", text: "enhancement" }, { key: "C", text: "enhanced" }, { key: "D", text: "enhancing" }], exp: "Sau giới từ 'for' cần V-ing: 'strategies for enhancing customer retention rates'." },
        { q: "The logistics coordinator ensured that the fragile equipment was handled _______ during transit.", a: "A", opts: [{ key: "A", text: "carefully" }, { key: "B", text: "careful" }, { key: "C", text: "care" }, { key: "D", text: "carefulness" }], exp: "Trạng từ 'carefully' bổ nghĩa cho động từ bị động 'was handled'." },
        { q: "Customers can track their shipments online _______ they have received the confirmation code.", a: "B", opts: [{ key: "A", text: "during" }, { key: "B", text: "once" }, { key: "C", text: "due to" }, { key: "D", text: "whether" }], exp: "Liên từ 'once' mang nghĩa 'một khi / ngay sau khi' nối hai mệnh đề hoàn chỉnh." },
        { q: "Neither the finance director _______ the senior accountant noticed the calculation discrepancy initially.", a: "C", opts: [{ key: "A", text: "or" }, { key: "B", text: "and" }, { key: "C", text: "nor" }, { key: "D", text: "also" }], exp: "Cặp liên từ tương quan 'Neither ... nor ...' (cả giám đốc tài chính lẫn kế toán trưởng đều không...)." },
        { q: "The refurbished conference facility is capable of _______ up to three hundred conference delegates.", a: "D", opts: [{ key: "A", text: "accommodate" }, { key: "B", text: "accommodation" }, { key: "C", text: "accommodated" }, { key: "D", text: "accommodating" }], exp: "Cấu trúc 'capable of + V-ing' mang nghĩa 'có khả năng chứa / phục vụ'." },
        { q: "Regular maintenance of manufacturing machinery helps _______ costly operational downtime.", a: "A", opts: [{ key: "A", text: "prevent" }, { key: "B", text: "prevention" }, { key: "C", text: "preventable" }, { key: "D", text: "preventive" }], exp: "Động từ 'helps (to) prevent' theo sau động từ 'help' mang nghĩa giúp ngăn ngừa sự cố." },
        { q: "We offer complimentary shuttle transportation _______ the international airport and downtown hotels.", a: "B", opts: [{ key: "A", text: "from" }, { key: "B", text: "between" }, { key: "C", text: "into" }, { key: "D", text: "through" }], exp: "Cấu trúc 'between A and B' chỉ tuyến xe buýt di chuyển giữa sân bay và các khách sạn." },
        { q: "The new healthcare benefits package will become _______ starting the first day of next month.", a: "C", opts: [{ key: "A", text: "effect" }, { key: "B", text: "effectively" }, { key: "C", text: "effective" }, { key: "D", text: "effectiveness" }], exp: "Sau linking verb 'become' cần tính từ 'effective' (có hiệu lực)." },
        { q: "Any employee seeking travel expense reimbursement must provide _______ sales receipts.", a: "D", opts: [{ key: "A", text: "item" }, { key: "B", text: "itemize" }, { key: "C", text: "itemizing" }, { key: "D", text: "itemized" }], exp: "Tính từ phân từ 'itemized receipts' mang nghĩa 'hóa đơn liệt kê chi tiết từng khoản mục'." },
        { q: "The committee reached a _______ decision regarding the architectural design of the new headquarters.", a: "A", opts: [{ key: "A", text: "unanimous" }, { key: "B", text: "unanimously" }, { key: "C", text: "unanimity" }, { key: "D", text: "unanimousness" }], exp: "Tính từ 'unanimous' bổ nghĩa cho danh từ 'decision' (quyết định đồng thuận tuyệt đối)." },
        { q: "Although sales dipped in the first quarter, the company remains _______ about annual profitability.", a: "B", opts: [{ key: "A", text: "optimism" }, { key: "B", text: "optimistic" }, { key: "C", text: "optimistically" }, { key: "D", text: "optimize" }], exp: "Sau linking verb 'remains' cần tính từ 'optimistic' (vẫn lạc quan về lợi nhuận)." },
        { q: "The IT support specialist resolved the network connectivity issue _______ within fifteen minutes.", a: "C", opts: [{ key: "A", text: "prompt" }, { key: "B", text: "promptness" }, { key: "C", text: "promptly" }, { key: "D", text: "prompter" }], exp: "Trạng từ 'promptly' bổ nghĩa cho động từ quá khứ 'resolved' (xử lý nhanh chóng)." },
        { q: "The terms and conditions outlined in the service agreement are subject to _______ without prior notice.", a: "D", opts: [{ key: "A", text: "modify" }, { key: "B", text: "modified" }, { key: "C", text: "modifying" }, { key: "D", text: "modification" }], exp: "Cấu trúc 'subject to + Noun' = có thể thay đổi / chịu sự điều chỉnh: 'subject to modification'." },
        { q: "To ensure product consistency, quality control inspectors examine random samples _______ each production run.", a: "A", opts: [{ key: "A", text: "throughout" }, { key: "B", text: "beside" }, { key: "C", text: "except" }, { key: "D", text: "opposite" }], exp: "Giới từ 'throughout' mang nghĩa 'xuyên suốt / trong suốt' toàn bộ ca sản xuất." },
        { q: "Ms. Tanaka is widely regarded as one of the most _______ negotiators in the commercial real estate sector.", a: "B", opts: [{ key: "A", text: "persuade" }, { key: "B", text: "persuasive" }, { key: "C", text: "persuasively" }, { key: "D", text: "persuasion" }], exp: "Cấu trúc so sánh nhất: 'the most + persuasive' (nhà đàm phán có sức thuyết phục nhất)." },
        { q: "The updated employee handbook contains comprehensive policies _______ remote work arrangements.", a: "C", opts: [{ key: "A", text: "concerns" }, { key: "B", text: "concerned" }, { key: "C", text: "concerning" }, { key: "D", text: "concern" }], exp: "Giới từ 'concerning' mang nghĩa 'liên quan đến / về' các quy chế làm việc từ xa." },
        { q: "After conducting extensive market research, the executive committee decided to _______ the product launch date.", a: "D", opts: [{ key: "A", text: "postponement" }, { key: "B", text: "postponing" }, { key: "C", text: "postponed" }, { key: "D", text: "postpone" }], exp: "Cấu trúc 'decided to + V-infinitive' = quyết định hoãn ngày ra mắt sản phẩm." },
        { q: "The newly appointed chief executive officer has _______ ambitious revenue expansion targets for next fiscal year.", a: "A", opts: [{ key: "A", text: "established" }, { key: "B", text: "establishing" }, { key: "C", text: "establishment" }, { key: "D", text: "establish" }], exp: "Thì hiện tại hoàn thành 'has + established' mang nghĩa đã thiết lập các chỉ tiêu doanh thu." },
        { q: "Had the delivery truck departed twenty minutes earlier, the supplies would have arrived _______ the morning shift began.", a: "B", opts: [{ key: "A", text: "until" }, { key: "B", text: "before" }, { key: "C", text: "during" }, { key: "D", text: "since" }], exp: "Liên từ thời gian 'before' (trước khi ca làm việc buổi sáng bắt đầu)." }
      ];

      part5Data.forEach((qItem, idx) => {
        qs.push({
          id: `tlr1_q${101 + idx}`,
          partNumber: 5,
          partTitle: "Part 5: Incomplete Sentences",
          section: "READING",
          questionText: `Question ${101 + idx}: ${qItem.q}`,
          options: qItem.opts as any,
          correctAnswer: qItem.a,
          explanation: qItem.exp
        });
      });

      // PART 6: TEXT COMPLETION (Q131 - Q146: 16 QUESTIONS ACROSS 4 PASSAGES)
      const part6Sets = [
        // PASSAGE 1: Company health plan announcement
        {
          passage: "MEMORANDUM\nTO: All Staff Members\nFROM: Human Resources Department\nDATE: October 15, 2026\nSUBJECT: Annual Health Insurance Open Enrollment\n\nThe annual open enrollment period for employee health insurance benefits will begin on Monday, November 3, and conclude on Friday, November 21. During this window, all eligible full-time employees may [131] _______ their current healthcare coverage, switch plan tiers, or add eligible family dependents.\n\n[132] _______, our insurance provider, BlueCross Horizon, has introduced a new Comprehensive Dental and Vision rider at no additional premium for the upcoming plan year.\n\n[133] _______ to submit your benefit selections before the November 21 deadline will result in automatic re-enrollment in your existing plan with no changes permitted until the 2027 enrollment cycle.\n\nIf you [134] _______ to schedule a one-on-one consultation with an HR benefits advisor, please visit the staff intranet portal to book a time slot.",
          questions: [
            { blank: 131, q: "Select the most appropriate word for blank [131].", opts: [{ key: "A", text: "modify" }, { key: "B", text: "modified" }, { key: "C", text: "modification" }, { key: "D", text: "modifying" }], a: "A", exp: "Sau modal verb 'may' cần động từ nguyên thể 'modify' (điều chỉnh gói bảo hiểm)." },
            { blank: 132, q: "Select the most appropriate word for blank [132].", opts: [{ key: "A", text: "Furthermore" }, { key: "B", text: "On the contrary" }, { key: "C", text: "Nevertheless" }, { key: "D", text: "For instance" }], a: "A", exp: "'Furthermore' bổ sung thêm quyền lợi nha khoa mới không tính thêm phí." },
            { blank: 133, q: "Select the most appropriate word for blank [133].", opts: [{ key: "A", text: "Neglect" }, { key: "B", text: "Failure" }, { key: "C", text: "Unable" }, { key: "D", text: "Failing" }], a: "B", exp: "Cấu trúc danh từ 'Failure to + V' = việc không nộp đúng hạn sẽ dẫn đến việc tự động gia hạn gói cũ." },
            { blank: 134, q: "Select the most appropriate word for blank [134].", opts: [{ key: "A", text: "learning more" }, { key: "B", text: "learn more" }, { key: "C", text: "would like" }, { key: "D", text: "have learned more" }], a: "C", exp: "Cấu trúc 'If you would like to schedule...' rất lịch sự trong văn bản hành chính." }
          ]
        },
        // PASSAGE 2: Job posting
        {
          passage: "JOB POSTING — REGIONAL SALES MANAGER\nCompany: Apex Global Solutions\nLocation: Singapore Office | Reports to: VP of Sales, Asia-Pacific\n\nApex Global Solutions is seeking an experienced Regional Sales Manager to lead our expanding operations in Southeast Asia. The [135] _______ candidate will have a minimum of 8 years of B2B sales experience in the technology sector, with a proven track record of exceeding annual revenue targets.\n\nKey responsibilities include developing and executing regional sales strategies, managing a team of 15 sales representatives, and [136] _______ strong relationships with enterprise clients across Singapore, Malaysia, and Indonesia.\n\nWe offer a competitive base salary plus performance bonuses, comprehensive relocation [137] _______ for candidates currently based outside Singapore, and generous annual leave allowance.\n\n[138] _______. Interested applicants should submit their résumé and a cover letter to careers@apexglobal.com by November 30, 2026.",
          questions: [
            { blank: 135, q: "Select the most appropriate word for blank [135].", opts: [{ key: "A", text: "ideally" }, { key: "B", text: "idealize" }, { key: "C", text: "idealism" }, { key: "D", text: "ideal" }], a: "D", exp: "Tính từ 'ideal' bổ nghĩa cho danh từ 'candidate'. 'Ideally' là trạng từ — sai vị trí." },
            { blank: 136, q: "Select the most appropriate word for blank [136].", opts: [{ key: "A", text: "building" }, { key: "B", text: "build" }, { key: "C", text: "built" }, { key: "D", text: "to build" }], a: "A", exp: "Cấu trúc song song: 'developing..., managing..., AND building...' — ba V-ing forms nối với nhau." },
            { blank: 137, q: "Select the most appropriate word for blank [137].", opts: [{ key: "A", text: "assistant" }, { key: "B", text: "assistance" }, { key: "C", text: "assist" }, { key: "D", text: "assisted" }], a: "B", exp: "Danh từ 'assistance' (sự hỗ trợ) sau 'relocation'. 'Assistant' = trợ lý (người), sai ngữ cảnh." },
            { blank: 138, q: "Select the best sentence for blank [138].", opts: [{ key: "A", text: "The office will be closed for renovations during December." }, { key: "B", text: "Previous applicants need not reapply for this position." }, { key: "C", text: "Only shortlisted candidates will be contacted for interviews within two weeks of the application deadline." }, { key: "D", text: "The company was founded in 1998 by two Stanford graduates." }], a: "C", exp: "Đoạn văn kết thúc bằng hướng dẫn ứng tuyển → câu D cung cấp thông tin về quy trình sau khi nộp hồ sơ (liên quan nhất)." }
          ]
        },
        // PASSAGE 3: Factory safety update
        {
          passage: "SAFETY BULLETIN — QUARTERLY UPDATE\nIssuance Date: October 1, 2026\nFacility: Apex National Manufacturing Plant — Building C\n\nFollowing the routine safety audit conducted on September 22, several areas for improvement were [139] _______. The fire suppression system in Assembly Hall 4 requires recalibration, and two emergency exit signs on the ground floor need [140] _______.\n\nAll floor supervisors are reminded to conduct weekly equipment inspections [141] _______ the updated Safety Protocol Manual, Version 4.2, which was distributed electronically last Friday. Hardcopy versions are available from the Safety Office upon request.\n\n[142] _______, all employees must complete the annual fire safety refresher course by October 31. Online registration is available through the employee training portal.",
          questions: [
            { blank: 139, q: "Select the most appropriate word for blank [139].", opts: [{ key: "A", text: "identify" }, { key: "B", text: "identifying" }, { key: "C", text: "identification" }, { key: "D", text: "identified" }], a: "D", exp: "Quá khứ phân từ 'identified' trong câu bị động 'were identified'. Chỗ trống cần past participle." },
            { blank: 140, q: "Select the most appropriate word for blank [140].", opts: [{ key: "A", text: "replacement" }, { key: "B", text: "replace" }, { key: "C", text: "replacing" }, { key: "D", text: "replaced" }], a: "A", exp: "Danh từ 'replacement' trong cấu trúc 'need + noun'. Cũng chấp nhận 'need replacing' / 'need to be replaced', nhưng 'replacement' phù hợp nhất trong danh sách." },
            { blank: 141, q: "Select the most appropriate word for blank [141].", opts: [{ key: "A", text: "in addition to" }, { key: "B", text: "in accordance with" }, { key: "C", text: "in contrast to" }, { key: "D", text: "in spite of" }], a: "B", exp: "'In accordance with' = theo đúng/phù hợp với. Kiểm tra theo sổ tay quy trình. Các cụm còn lại không hợp ngữ cảnh." },
            { blank: 142, q: "Select the most appropriate word for blank [142].", opts: [{ key: "A", text: "Consequently" }, { key: "B", text: "However" }, { key: "C", text: "In addition" }, { key: "D", text: "On the other hand" }], a: "C", exp: "'In addition' bổ sung yêu cầu mới (fire safety course). 'However' / 'On the other hand' dùng khi tương phản — sai logic." }
          ]
        },
        // PASSAGE 4: International seminar invitation
        {
          passage: "INVITATION — INTERNATIONAL LEADERSHIP SUMMIT 2027\n\nDear Valued Partner,\n\nWe are delighted to invite you to the 12th Annual International Leadership Summit, taking place from March 15 to 17, 2027, at the Grand Hyatt Convention Center in Tokyo, Japan.\n\nThis year's theme, 'Sustainable Innovation in the Digital Age,' will feature keynote addresses from [143] _______ recognized industry leaders, including Dr. Yuki Tanaka of the Tokyo Institute of Technology and Mr. Ricardo Alvarez, CEO of Alvarez Ventures.\n\nEarly bird registration at a 25% discounted rate is available for [144] _______ received before January 15, 2027. Standard registration [145] _______ $1,200 per attendee and includes all conference materials, lunches, and networking receptions.\n\n[146] _______. We look forward to welcoming you in Tokyo.",
          questions: [
            { blank: 143, q: "Select the most appropriate word for blank [143].", opts: [{ key: "A", text: "international" }, { key: "B", text: "internationalize" }, { key: "C", text: "internationalism" }, { key: "D", text: "internationally" }], a: "D", exp: "Trạng từ 'internationally' bổ nghĩa cho quá khứ phân từ/tính từ 'recognized'. 'Internationally recognized' = được công nhận quốc tế." },
            { blank: 144, q: "Select the most appropriate word for blank [144].", opts: [{ key: "A", text: "registrations" }, { key: "B", text: "register" }, { key: "C", text: "registered" }, { key: "D", text: "registering" }], a: "A", exp: "Danh từ 'registrations' là chủ ngữ của mệnh đề 'received before January 15'. Câu bị lược: 'registrations [that are] received'." },
            { blank: 145, q: "Select the most appropriate word for blank [145].", opts: [{ key: "A", text: "is costing" }, { key: "B", text: "costs" }, { key: "C", text: "costed" }, { key: "D", text: "has cost" }], a: "B", exp: "'Standard registration costs $1,200' — thì hiện tại đơn cho sự thật/quy định. 'Costed' không đúng dạng phổ biến." },
            { blank: 146, q: "Select the best sentence for blank [146].", opts: [{ key: "A", text: "The hotel was built in 1987 and has undergone several expansions." }, { key: "B", text: "The weather in Tokyo during March is typically mild with occasional rain showers." }, { key: "C", text: "To reserve your place, please complete the attached registration form and return it by email to events@leadershipsummit.org." }, { key: "D", text: "Dr. Tanaka's latest research paper was published in the Journal of Sustainable Technologies." }], a: "C", exp: "Đoạn cuối cần hướng dẫn hành động (call to action). Câu B: hướng dẫn đăng ký — phù hợp nhất." }
          ]
        }
      ];

      part6Sets.forEach((set, setIndex) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr1_q${qItem.blank}`,
            partNumber: 6,
            partTitle: "Part 6: Text Completion",
            section: "READING",
            passageText: set.passage,
            questionText: `${qItem.blank}. ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a as any,
            explanation: qItem.exp
          });
        });
      });

      // PART 7: READING COMPREHENSION (Q147 - Q200: 54 UNIQUE QUESTIONS)
      // SINGLE PASSAGES (Q147-Q175: 6 passages, ~29 questions)
      // DOUBLE/TRIPLE PASSAGES (Q176-Q200: 5 sets, 25 questions)
      const part7Sets: { passages: string; questions: { qNum: number; q: string; opts: { key: string; text: string }[]; a: "A"|"B"|"C"|"D"; exp: string }[] }[] = [
        // SINGLE 1 (Q147-151): Financial consulting advertisement
        {
          passages: "[ADVERTISEMENT]\n\nPRIME FINANCIAL ADVISORS — Your Trusted Partner Since 2005\n\nAre you planning for retirement, managing a growing investment portfolio, or navigating complex tax regulations? Prime Financial Advisors offers personalized wealth management solutions for individuals and small businesses.\n\nOur Services:\n• Comprehensive retirement planning and 401(k) optimization\n• Tax-efficient investment strategies for portfolios over $100,000\n• Estate planning and trust administration\n• Small business accounting and quarterly tax filing\n\nWhy Choose Us?\n— Over 200 certified financial planners across 15 offices nationwide\n— Named \"Top Regional Advisory Firm\" by Financial Weekly Magazine for three consecutive years (2024-2026)\n— Free 30-minute initial consultation for new clients\n\nSchedule your complimentary consultation today!\nCall: 1-800-555-PRIME | Visit: www.primefinancial.com\nOffice Hours: Monday-Friday 8:00 AM - 6:00 PM | Saturday 9:00 AM - 1:00 PM",
          questions: [
            { qNum: 147, q: "What is the purpose of this advertisement?", opts: [{ key: "A", text: "To recruit certified financial planners." }, { key: "B", text: "To announce a merger between two firms." }, { key: "C", text: "To report quarterly earnings results." }, { key: "D", text: "To promote financial advisory services." }], a: "D", exp: "Quảng cáo giới thiệu dịch vụ tư vấn tài chính cho khách hàng cá nhân và doanh nghiệp nhỏ." },
            { qNum: 148, q: "How long has Prime Financial Advisors been in operation?", opts: [{ key: "A", text: "Since 2005." }, { key: "B", text: "Since 2000." }, { key: "C", text: "Since 2010." }, { key: "D", text: "Since 2015." }], a: "A", exp: "Đáp án: 'Your Trusted Partner Since 2005'." },
            { qNum: 149, q: "What is offered to new clients at no charge?", opts: [{ key: "A", text: "A full portfolio analysis report." }, { key: "B", text: "A 30-minute initial consultation." }, { key: "C", text: "A one-year subscription to Financial Weekly." }, { key: "D", text: "A personalized retirement savings plan." }], a: "B", exp: "Miễn phí: 'Free 30-minute initial consultation for new clients'." },
            { qNum: 150, q: "What minimum portfolio size qualifies for tax-efficient strategies?", opts: [{ key: "A", text: "$50,000." }, { key: "B", text: "$75,000." }, { key: "C", text: "$100,000." }, { key: "D", text: "$200,000." }], a: "C", exp: "Đáp án: 'Tax-efficient investment strategies for portfolios over $100,000'." },
            { qNum: 151, q: "When is the office open on Saturdays?", opts: [{ key: "A", text: "8:00 AM - 6:00 PM." }, { key: "B", text: "10:00 AM - 2:00 PM." }, { key: "C", text: "It is closed on Saturdays." }, { key: "D", text: "9:00 AM - 1:00 PM." }], a: "D", exp: "Bẫy: giờ mở cửa ngày thường khác với thứ Bảy. Saturday: '9:00 AM - 1:00 PM'." }
          ]
        },
        // SINGLE 2 (Q152-155): Hotel booking confirmation email
        {
          passages: "[EMAIL]\nFrom: reservations@grandharborhotel.com\nTo: sarah.mitchell@apexconsulting.com\nDate: October 10, 2026\nSubject: Booking Confirmation — Reservation #GH-88421\n\nDear Ms. Mitchell,\n\nThank you for choosing the Grand Harbor Hotel for your upcoming business trip. Below are the details of your confirmed reservation:\n\n• Guest Name: Sarah Mitchell\n• Check-in: Wednesday, October 23, 2026 (3:00 PM)\n• Check-out: Friday, October 25, 2026 (11:00 AM)\n• Room Type: Executive Suite, 12th Floor, Harbor View\n• Rate: $289 per night (Corporate Rate — Apex Consulting discount applied)\n• Total: $578 (2 nights)\n• Breakfast: Complimentary full buffet breakfast included for all Executive Suite guests\n• Parking: Valet parking available at $25 per day\n\nPlease note that cancellations must be made at least 48 hours before check-in to avoid a one-night charge. If you need to modify your reservation, please call our front desk at (555) 234-8900 or reply to this email.\n\nWe look forward to welcoming you.\n\nBest regards,\nMaria Gonzalez\nReservations Manager",
          questions: [
            { qNum: 152, q: "How many nights will Ms. Mitchell stay?", opts: [{ key: "A", text: "Two nights." }, { key: "B", text: "One night." }, { key: "C", text: "Three nights." }, { key: "D", text: "Four nights." }], a: "A", exp: "Check-in Oct 23, check-out Oct 25 = 2 đêm. Total: '$578 (2 nights)' xác nhận." },
            { qNum: 153, q: "What is included with the Executive Suite?", opts: [{ key: "A", text: "Free airport shuttle service." }, { key: "B", text: "Complimentary full buffet breakfast." }, { key: "C", text: "A spa treatment voucher." }, { key: "D", text: "Free valet parking." }], a: "B", exp: "Bẫy: valet parking tính $25/ngày (không miễn phí). Đáp án: 'Complimentary full buffet breakfast included for all Executive Suite guests'." },
            { qNum: 154, q: "What happens if the reservation is canceled less than 48 hours before check-in?", opts: [{ key: "A", text: "A full refund is issued." }, { key: "B", text: "The reservation is automatically rescheduled." }, { key: "C", text: "A one-night charge will be applied." }, { key: "D", text: "A $50 administrative fee is charged." }], a: "C", exp: "Chính sách: 'cancellations must be made at least 48 hours before check-in to avoid a one-night charge'." },
            { qNum: 155, q: "Who sent the confirmation email?", opts: [{ key: "A", text: "Sarah Mitchell." }, { key: "B", text: "The front desk receptionist." }, { key: "C", text: "The hotel general manager." }, { key: "D", text: "Maria Gonzalez, Reservations Manager." }], a: "D", exp: "Người gửi: 'Maria Gonzalez, Reservations Manager'." }
          ]
        },
        // SINGLE 3 (Q156-159): Technology article
        {
          passages: "[ARTICLE]\n\nThe Rise of AI-Powered Customer Service in Retail Banking\nBy Jonathan Park | Financial Technology Review | October 8, 2026\n\nArtificial intelligence is rapidly transforming the way retail banks interact with their customers. A recent study by the Global Banking Research Institute found that 67 percent of major banks in North America have deployed AI-powered chatbot systems for handling routine customer inquiries such as account balance checks, transaction history, and password resets.\n\nAccording to the study, banks that implemented AI chatbots experienced a 42 percent reduction in average call center wait times and a 28 percent decrease in operational costs related to customer support. However, the study also noted that customer satisfaction scores remained higher for human-assisted interactions, particularly for complex issues like loan applications and fraud investigations.\n\nDr. Lisa Chen, director of the research institute, emphasized that AI should complement rather than replace human agents. \"The most effective model is a hybrid approach where AI handles simple, high-volume requests while human specialists focus on complex, emotionally sensitive matters,\" she explained.\n\nSeveral banks, including Meridian National and Pacific Coast Financial, have already adopted this hybrid model, reporting both cost savings and improved customer satisfaction ratings.",
          questions: [
            { qNum: 156, q: "What percentage of major North American banks use AI chatbots?", opts: [{ key: "A", text: "67 percent." }, { key: "B", text: "28 percent." }, { key: "C", text: "42 percent." }, { key: "D", text: "85 percent." }], a: "A", exp: "Bẫy: 42% là giảm thời gian chờ, 28% là giảm chi phí. Đáp án: '67 percent of major banks have deployed AI-powered chatbot systems'." },
            { qNum: 157, q: "What does Dr. Chen recommend?", opts: [{ key: "A", text: "Replacing all human agents with AI systems." }, { key: "B", text: "A hybrid model combining AI and human agents." }, { key: "C", text: "Discontinuing AI chatbot programs entirely." }, { key: "D", text: "Outsourcing customer service to third-party vendors." }], a: "B", exp: "Dr. Chen: 'The most effective model is a hybrid approach where AI handles simple, high-volume requests while human specialists focus on complex matters'." },
            { qNum: 158, q: "For which types of issues do customers prefer human agents?", opts: [{ key: "A", text: "Account balance checks and password resets." }, { key: "B", text: "Transaction history inquiries." }, { key: "C", text: "Loan applications and fraud investigations." }, { key: "D", text: "Branch location searches." }], a: "C", exp: "Đáp án: 'customer satisfaction scores remained higher for human-assisted interactions, particularly for complex issues like loan applications and fraud investigations'." },
            { qNum: 159, q: "What is the main topic of the article?", opts: [{ key: "A", text: "The decline of traditional banking branches." }, { key: "B", text: "New cybersecurity threats facing financial institutions." }, { key: "C", text: "Government regulations on automated trading systems." }, { key: "D", text: "The impact of AI on retail banking customer service." }], a: "D", exp: "Chủ đề chính: 'The Rise of AI-Powered Customer Service in Retail Banking'." }
          ]
        },
        // SINGLE 4 (Q160-163): Building maintenance notice
        {
          passages: "[NOTICE]\n\nATTENTION ALL TENANTS — PARKVIEW OFFICE TOWER\nBuilding Management Office\nDate: October 15, 2026\n\nRe: Scheduled Elevator Maintenance — November 4-6, 2026\n\nPlease be advised that elevators 1 and 2 (serving floors 1-15) will be out of service for mandatory safety inspection and modernization work from Monday, November 4 through Wednesday, November 6. During this period, elevator 3 (serving floors 1-20) will remain operational for all tenants.\n\nTo minimize inconvenience:\n• Tenants on floors 2-5 are encouraged to use the stairwell during the maintenance period\n• Deliveries exceeding 50 pounds should be scheduled before November 4 or after November 7\n• The freight elevator (accessible from the loading dock) will operate on a limited schedule from 7:00 AM to 12:00 PM daily during the maintenance window\n\nWe apologize for any inconvenience and appreciate your patience. For questions, please contact Building Management at extension 100 or email facilities@parkviewtower.com.\n\nRegards,\nParkview Building Management",
          questions: [
            { qNum: 160, q: "How long will elevators 1 and 2 be out of service?", opts: [{ key: "A", text: "Three days." }, { key: "B", text: "One day." }, { key: "C", text: "Two days." }, { key: "D", text: "One week." }], a: "A", exp: "Đáp án: 'from Monday, November 4 through Wednesday, November 6' = 3 ngày." },
            { qNum: 161, q: "Which elevator will continue to operate?", opts: [{ key: "A", text: "Elevator 1." }, { key: "B", text: "Elevator 3." }, { key: "C", text: "Elevator 2." }, { key: "D", text: "The freight elevator only." }], a: "B", exp: "Đáp án: 'elevator 3 (serving floors 1-20) will remain operational for all tenants'." },
            { qNum: 162, q: "When is the freight elevator available during maintenance?", opts: [{ key: "A", text: "24 hours a day." }, { key: "B", text: "8:00 AM to 5:00 PM." }, { key: "C", text: "7:00 AM to 12:00 PM." }, { key: "D", text: "It is completely shut down." }], a: "C", exp: "Lịch giới hạn: 'freight elevator will operate on a limited schedule from 7:00 AM to 12:00 PM daily'." },
            { qNum: 163, q: "What should tenants do with heavy deliveries?", opts: [{ key: "A", text: "Use elevator 3 exclusively." }, { key: "B", text: "Carry them up the stairwell." }, { key: "C", text: "Have them held at the front desk." }, { key: "D", text: "Schedule them before Nov 4 or after Nov 7." }], a: "D", exp: "Đáp án: 'Deliveries exceeding 50 pounds should be scheduled before November 4 or after November 7'." }
          ]
        },
        // SINGLE 5 (Q164-168): Product review on e-commerce site
        {
          passages: "[ONLINE PRODUCT REVIEW]\n\nProduct: Zenith UltraBook Pro 15 Laptop\nReviewer: TechEnthusiast_2026 | Rating: ★★★★☆ (4 out of 5)\nDate: September 28, 2026 | Verified Purchase\n\nI have been using the Zenith UltraBook Pro 15 for approximately three weeks now for both professional video editing and personal use, and overall I am very impressed with its performance.\n\nPros:\n• The 15.6-inch 4K OLED display is absolutely stunning — colors are vibrant and contrast ratios are excellent for editing high-resolution footage\n• The Intel i9 processor paired with 32GB of RAM handles multiple heavy applications simultaneously without any noticeable lag\n• Battery life consistently reaches 9-10 hours with moderate use, which is exceptional for a high-performance laptop\n• The aluminum unibody chassis feels premium and weighs only 4.2 pounds\n\nCons:\n• The built-in speakers are disappointingly weak for a laptop in this price range ($2,199) — external speakers or headphones are practically necessary\n• The webcam is only 720p, which is outdated for video conferencing in 2026\n• No SD card slot, which is inconvenient for photographers and videographers who frequently transfer files\n\nOverall, if you are a creative professional who needs a powerful, portable workstation with a gorgeous display, the UltraBook Pro 15 is an excellent choice. Just be prepared to invest in external speakers and a USB-C card reader.",
          questions: [
            { qNum: 164, q: "What is the reviewer's overall rating?", opts: [{ key: "A", text: "4 out of 5 stars." }, { key: "B", text: "3 out of 5 stars." }, { key: "C", text: "4.5 out of 5 stars." }, { key: "D", text: "5 out of 5 stars." }], a: "A", exp: "Rating: '★★★★☆ (4 out of 5)'." },
            { qNum: 165, q: "What does the reviewer praise most about the display?", opts: [{ key: "A", text: "Its touchscreen functionality." }, { key: "B", text: "Its vibrant colors and excellent contrast ratios." }, { key: "C", text: "Its anti-glare coating." }, { key: "D", text: "Its large 17-inch size." }], a: "B", exp: "Đáp án: 'colors are vibrant and contrast ratios are excellent for editing high-resolution footage'." },
            { qNum: 166, q: "What is a noted weakness of the laptop?", opts: [{ key: "A", text: "The processor is too slow for video editing." }, { key: "B", text: "The battery lasts less than 5 hours." }, { key: "C", text: "The built-in speakers are weak for the price point." }, { key: "D", text: "The laptop weighs over 7 pounds." }], a: "C", exp: "Nhược điểm: 'The built-in speakers are disappointingly weak for a laptop in this price range ($2,199)'." },
            { qNum: 167, q: "How much does the laptop cost?", opts: [{ key: "A", text: "$1,499." }, { key: "B", text: "$1,899." }, { key: "C", text: "$2,499." }, { key: "D", text: "$2,199." }], a: "D", exp: "Giá: '$2,199'." },
            { qNum: 168, q: "Who would benefit most from this laptop according to the reviewer?", opts: [{ key: "A", text: "Creative professionals who need a powerful portable workstation." }, { key: "B", text: "Students looking for a budget-friendly option." }, { key: "C", text: "Casual users who only browse the web and send emails." }, { key: "D", text: "Gamers who need a dedicated graphics card." }], a: "A", exp: "Đáp án: 'if you are a creative professional who needs a powerful, portable workstation with a gorgeous display'." }
          ]
        },
        // SINGLE 6 (Q169-175): Detailed job posting
        {
          passages: "[JOB POSTING]\n\nSENIOR DATA ENGINEER — Full-Time\nCompany: NovaTech Solutions | Location: Austin, TX (Hybrid — 3 days in-office)\nSalary Range: $135,000 - $165,000 annually + benefits\nPosted: October 1, 2026 | Application Deadline: November 15, 2026\n\nAbout the Role:\nNovaTech Solutions is seeking a Senior Data Engineer to design, build, and maintain our enterprise-scale data pipeline infrastructure. You will work closely with data scientists, product managers, and DevOps engineers to ensure reliable, scalable data delivery across all business units.\n\nRequired Qualifications:\n• Bachelor's degree in Computer Science, Data Engineering, or a related field\n• Minimum 5 years of professional experience with ETL/ELT pipeline development\n• Advanced proficiency in Python, SQL, and Apache Spark\n• Hands-on experience with cloud data platforms (AWS Redshift, Google BigQuery, or Snowflake)\n• Strong understanding of data governance and security best practices\n\nPreferred Qualifications:\n• Master's degree in a related field\n• Experience with real-time streaming technologies (Apache Kafka, Apache Flink)\n• AWS or GCP professional certification\n\nBenefits:\n• Comprehensive health, dental, and vision insurance\n• 401(k) with 6% company match\n• 20 days paid vacation + 10 paid holidays\n• $5,000 annual professional development budget\n• Flexible hybrid work schedule\n\nTo Apply: Submit your résumé and a portfolio of relevant projects to careers@novatech.com.",
          questions: [
            { qNum: 169, q: "What is the work arrangement for this position?", opts: [{ key: "A", text: "Fully remote." }, { key: "B", text: "Hybrid — three days in-office." }, { key: "C", text: "Fully in-office, five days per week." }, { key: "D", text: "Rotating shifts." }], a: "B", exp: "Đáp án: 'Hybrid — 3 days in-office'." },
            { qNum: 170, q: "What is the minimum required experience?", opts: [{ key: "A", text: "2 years." }, { key: "B", text: "3 years." }, { key: "C", text: "5 years." }, { key: "D", text: "8 years." }], a: "C", exp: "Đáp án: 'Minimum 5 years of professional experience with ETL/ELT pipeline development'." },
            { qNum: 171, q: "Which of the following is a PREFERRED rather than required qualification?", opts: [{ key: "A", text: "Bachelor's degree in Computer Science." }, { key: "B", text: "Proficiency in Python and SQL." }, { key: "C", text: "Understanding of data governance." }, { key: "D", text: "Experience with Apache Kafka." }], a: "D", exp: "Đố mẹo: phân biệt 'Required' vs 'Preferred'. Apache Kafka nằm trong mục Preferred Qualifications." },
            { qNum: 172, q: "How much is the company's 401(k) match?", opts: [{ key: "A", text: "6 percent." }, { key: "B", text: "3 percent." }, { key: "C", text: "4 percent." }, { key: "D", text: "5 percent." }], a: "A", exp: "Đáp án: '401(k) with 6% company match'." },
            { qNum: 173, q: "What is the salary range for this position?", opts: [{ key: "A", text: "$100,000 - $130,000." }, { key: "B", text: "$135,000 - $165,000." }, { key: "C", text: "$120,000 - $150,000." }, { key: "D", text: "$150,000 - $180,000." }], a: "B", exp: "Mức lương: '$135,000 - $165,000 annually + benefits'." },
            { qNum: 174, q: "What is the annual professional development budget?", opts: [{ key: "A", text: "$2,000." }, { key: "B", text: "$3,500." }, { key: "C", text: "$5,000." }, { key: "D", text: "$7,500." }], a: "C", exp: "Đáp án: '$5,000 annual professional development budget'." },
            { qNum: 175, q: "What must applicants submit?", opts: [{ key: "A", text: "A résumé and three references." }, { key: "B", text: "A cover letter and salary expectations." }, { key: "C", text: "A skills assessment test result." }, { key: "D", text: "A résumé and a portfolio of relevant projects." }], a: "D", exp: "Đáp án: 'Submit your résumé and a portfolio of relevant projects to careers@novatech.com'." }
          ]
        },
        // DOUBLE 1 (Q176-180): Complaint email + Company response email
        {
          passages: "[EMAIL 1]\nFrom: david.chen@email.com\nTo: support@novaelectronics.com\nDate: October 8, 2026\nSubject: Defective Wireless Headphones — Order #NE-77421\n\nDear Nova Electronics Support Team,\n\nI purchased a pair of Nova SoundMax Pro wireless headphones from your online store on September 25, 2026 (Order #NE-77421). Unfortunately, the noise-cancellation feature stopped working after only 10 days of use. I have already tried resetting the firmware as described in the user manual, but the issue persists.\n\nI would like to request either a replacement unit or a full refund. My original payment was made via credit card ending in 4821.\n\nPlease advise on the next steps, including whether I need to ship the defective unit back at my own expense.\n\nSincerely,\nDavid Chen\n\n---\n\n[EMAIL 2]\nFrom: support@novaelectronics.com\nTo: david.chen@email.com\nDate: October 9, 2026\nSubject: RE: Defective Wireless Headphones — Order #NE-77421\n\nDear Mr. Chen,\n\nThank you for reaching out. We sincerely apologize for the inconvenience. After reviewing your order, we are happy to offer the following options:\n\n1. Replacement: A brand-new Nova SoundMax Pro unit will be shipped to your address within 3-5 business days at no charge. A prepaid return shipping label will be emailed to you for the defective unit.\n\n2. Refund: A full refund of $149.99 will be processed to your credit card ending in 4821 within 7-10 business days.\n\n3. Upgrade: Exchange for the newer Nova SoundMax Elite model (retail price $199.99) with a 50% upgrade discount — you would only pay an additional $25.00.\n\nPlease reply to this email with your preferred option, and we will process it immediately. Again, we apologize for the inconvenience.\n\nBest regards,\nEmily Santos\nCustomer Support Specialist\nNova Electronics",
          questions: [
            { qNum: 176, q: "What is the problem with Mr. Chen's headphones?", opts: [{ key: "A", text: "The noise-cancellation feature stopped working." }, { key: "B", text: "The Bluetooth connection frequently drops." }, { key: "C", text: "The battery does not charge properly." }, { key: "D", text: "One earbud produces no sound." }], a: "A", exp: "Đáp án: 'the noise-cancellation feature stopped working after only 10 days of use'." },
            { qNum: 177, q: "How much did the original headphones cost?", opts: [{ key: "A", text: "$99.99." }, { key: "B", text: "$149.99." }, { key: "C", text: "$129.99." }, { key: "D", text: "$199.99." }], a: "B", exp: "Bẫy: $199.99 là giá Elite model. Giá SoundMax Pro: 'A full refund of $149.99'." },
            { qNum: 178, q: "How much would Mr. Chen pay for the upgrade option?", opts: [{ key: "A", text: "$15.00." }, { key: "B", text: "$50.00." }, { key: "C", text: "$25.00." }, { key: "D", text: "$99.99." }], a: "C", exp: "Đố mẹo tính toán: Elite = $199.99, 50% discount = $100. Trả $149.99 gốc → chênh '$25.00'. Email nói rõ 'you would only pay an additional $25.00'." },
            { qNum: 179, q: "Who responded to Mr. Chen's complaint?", opts: [{ key: "A", text: "The store manager." }, { key: "B", text: "The shipping department." }, { key: "C", text: "The product development team." }, { key: "D", text: "Emily Santos, Customer Support Specialist." }], a: "D", exp: "Ký tên: 'Emily Santos, Customer Support Specialist'." },
            { qNum: 180, q: "What has Mr. Chen already tried to fix the issue?", opts: [{ key: "A", text: "He reset the firmware as described in the manual." }, { key: "B", text: "He took the headphones to a repair shop." }, { key: "C", text: "He replaced the ear cushions." }, { key: "D", text: "He updated the Bluetooth driver on his phone." }], a: "A", exp: "Đáp án: 'I have already tried resetting the firmware as described in the user manual'." }
          ]
        },
        // DOUBLE 2 (Q181-185): Job advertisement + Application email
        {
          passages: "[DOCUMENT 1 — JOB ADVERTISEMENT]\n\nMARKETING COORDINATOR — Apex Hospitality Group\nLocation: Miami, FL | Type: Full-Time\nSalary: $52,000 - $60,000 per year\n\nApex Hospitality Group is seeking a creative Marketing Coordinator to join our brand team. The ideal candidate will have 2+ years of marketing experience in the hospitality or tourism industry, proficiency in Adobe Creative Suite and social media analytics tools, and a bachelor's degree in Marketing or Communications.\n\nKey Responsibilities:\n• Manage social media campaigns across Instagram, Facebook, and LinkedIn\n• Coordinate with external agencies on print and digital advertising\n• Analyze campaign performance metrics and prepare monthly reports\n• Organize promotional events and media partnerships\n\nApply by October 31, 2026 to hr@apexhospitality.com with your résumé, portfolio, and two professional references.\n\n---\n\n[DOCUMENT 2 — APPLICATION EMAIL]\nFrom: jessica.morales@email.com\nTo: hr@apexhospitality.com\nDate: October 18, 2026\nSubject: Application for Marketing Coordinator Position\n\nDear Hiring Manager,\n\nI am writing to express my interest in the Marketing Coordinator position at Apex Hospitality Group. I hold a bachelor's degree in Digital Marketing from the University of Miami and have three years of experience as a Marketing Assistant at Coral Bay Resort, where I managed social media accounts with a combined following of over 85,000 users and increased engagement rates by 34 percent.\n\nI am proficient in Adobe Photoshop, Illustrator, and InDesign, as well as analytics tools including Google Analytics, Hootsuite, and Sprout Social. I have attached my résumé, a digital portfolio showcasing recent campaign work, and contact information for two professional references.\n\nThank you for your consideration. I look forward to discussing how my experience aligns with your team's goals.\n\nBest regards,\nJessica Morales",
          questions: [
            { qNum: 181, q: "What industry experience is preferred for this position?", opts: [{ key: "A", text: "Healthcare or pharmaceutical." }, { key: "B", text: "Hospitality or tourism." }, { key: "C", text: "Financial services." }, { key: "D", text: "Technology or software." }], a: "B", exp: "Đáp án: '2+ years of marketing experience in the hospitality or tourism industry'." },
            { qNum: 182, q: "How many years of experience does Jessica have?", opts: [{ key: "A", text: "One year." }, { key: "B", text: "Two years." }, { key: "C", text: "Three years." }, { key: "D", text: "Five years." }], a: "C", exp: "Đáp án: 'three years of experience as a Marketing Assistant at Coral Bay Resort'." },
            { qNum: 183, q: "By how much did Jessica increase engagement rates?", opts: [{ key: "A", text: "15 percent." }, { key: "B", text: "24 percent." }, { key: "C", text: "44 percent." }, { key: "D", text: "34 percent." }], a: "D", exp: "Đáp án: 'increased engagement rates by 34 percent'." },
            { qNum: 184, q: "What did Jessica attach to her email?", opts: [{ key: "A", text: "A résumé, portfolio, and two references." }, { key: "B", text: "A cover letter and salary expectations." }, { key: "C", text: "Only a résumé." }, { key: "D", text: "A video introduction and college transcript." }], a: "A", exp: "Đáp án: 'I have attached my résumé, a digital portfolio... and contact information for two professional references'." },
            { qNum: 185, q: "Does Jessica meet the minimum experience requirement?", opts: [{ key: "A", text: "No, she has less than the required experience." }, { key: "B", text: "Yes, she exceeds the minimum requirement by one year." }, { key: "C", text: "Yes, she exactly meets the minimum requirement." }, { key: "D", text: "It cannot be determined from the documents." }], a: "B", exp: "Đố mẹo cross-reference: Job requires '2+ years', Jessica has '3 years' → exceeds by 1 year." }
          ]
        },
        // TRIPLE 1 (Q186-190): Conference invitation + Schedule + Registration email
        {
          passages: "[DOCUMENT 1 — CONFERENCE INVITATION]\n\nAPEX GLOBAL TECHNOLOGY SUMMIT 2026\nDates: November 12-14, 2026\nVenue: Moscone Convention Center, San Francisco, CA\n\nJoin 5,000+ technology leaders for three days of keynotes, workshops, and networking. Topics include AI & Machine Learning, Cloud Infrastructure, Cybersecurity, and Sustainable Tech Innovation.\n\nRegistration Rates:\n• Early Bird (before Oct 25): $799\n• Standard (Oct 25 - Nov 5): $999\n• On-Site: $1,199\n• Student/Academic: $399 (valid ID required)\n\nAll registrations include keynote sessions, workshop access, meals, and a conference welcome kit.\n\n---\n\n[DOCUMENT 2 — CONFERENCE SCHEDULE (Day 1)]\n\nNovember 12, 2026 — Day 1 Schedule\n8:00 AM - Registration & Welcome Coffee (Main Lobby)\n9:00 AM - Opening Keynote: \"The Future of AI in Enterprise\" — Dr. Sarah Kim, CTO of Zenith Labs (Grand Ballroom)\n10:30 AM - Break\n11:00 AM - Workshop A: Cloud Migration Strategies (Room 201) | Workshop B: Cybersecurity Threat Detection (Room 305)\n12:30 PM - Networking Lunch (Terrace Restaurant)\n2:00 PM - Panel Discussion: Sustainable Innovation in Tech (Grand Ballroom)\n3:30 PM - Break\n4:00 PM - Workshop C: Building Scalable AI Pipelines (Room 201)\n5:30 PM - Welcome Reception & Cocktail Hour (Rooftop Terrace)\n\n---\n\n[DOCUMENT 3 — REGISTRATION CONFIRMATION EMAIL]\nFrom: events@apextechsummit.com\nTo: michael.ross@novatech.com\nDate: October 20, 2026\nSubject: Registration Confirmed — Apex Global Technology Summit 2026\n\nDear Mr. Ross,\n\nYour registration for the Apex Global Technology Summit 2026 has been confirmed.\n\nRegistration Details:\n• Name: Michael Ross\n• Company: NovaTech Solutions\n• Registration Type: Early Bird\n• Amount Paid: $799\n• Registration ID: AGTS-28491\n\nPlease bring a printed or digital copy of this confirmation to the registration desk on arrival. We look forward to seeing you in San Francisco!\n\nBest,\nApex Events Team",
          questions: [
            { qNum: 186, q: "How much did Michael Ross pay for his registration?", opts: [{ key: "A", text: "$399." }, { key: "B", text: "$999." }, { key: "C", text: "$799." }, { key: "D", text: "$1,199." }], a: "C", exp: "Cross-reference: Michael registered as 'Early Bird' → $799. Confirmed in email: 'Amount Paid: $799'." },
            { qNum: 187, q: "Who is delivering the opening keynote on Day 1?", opts: [{ key: "A", text: "Michael Ross." }, { key: "B", text: "The conference organizer." }, { key: "C", text: "A panel of cybersecurity experts." }, { key: "D", text: "Dr. Sarah Kim, CTO of Zenith Labs." }], a: "D", exp: "Schedule: 'Opening Keynote: The Future of AI in Enterprise — Dr. Sarah Kim, CTO of Zenith Labs'." },
            { qNum: 188, q: "Where is Workshop B held?", opts: [{ key: "A", text: "Room 305." }, { key: "B", text: "Room 201." }, { key: "C", text: "The Grand Ballroom." }, { key: "D", text: "The Rooftop Terrace." }], a: "A", exp: "Bẫy: Room 201 = Workshop A. Workshop B: Cybersecurity Threat Detection in Room 305." },
            { qNum: 189, q: "What time does the Welcome Reception start?", opts: [{ key: "A", text: "4:00 PM." }, { key: "B", text: "5:30 PM." }, { key: "C", text: "5:00 PM." }, { key: "D", text: "6:00 PM." }], a: "B", exp: "Đáp án: '5:30 PM - Welcome Reception & Cocktail Hour (Rooftop Terrace)'." },
            { qNum: 190, q: "What must Michael bring to the registration desk?", opts: [{ key: "A", text: "His company badge and business cards." }, { key: "B", text: "A valid student ID." }, { key: "C", text: "A printed or digital copy of the confirmation." }, { key: "D", text: "Two forms of government-issued identification." }], a: "C", exp: "Đáp án: 'Please bring a printed or digital copy of this confirmation to the registration desk on arrival'." }
          ]
        },
        // TRIPLE 2 (Q191-195): Purchase order + Invoice + Shipping confirmation
        {
          passages: "[DOCUMENT 1 — PURCHASE ORDER]\nPURCHASE ORDER #PO-55210\nFrom: Apex Global Solutions (Purchasing Department)\nTo: Sterling Office Supply Co.\nDate: October 1, 2026\n\nItems Ordered:\n1. Premium Ergonomic Desk Chair (Model EC-500) — Qty: 25 @ $340/unit = $8,500\n2. Adjustable Standing Desk (Model SD-200) — Qty: 10 @ $520/unit = $5,200\n3. LED Desk Lamp (Model DL-100) — Qty: 50 @ $45/unit = $2,250\n\nSubtotal: $15,950\nShipping (Flat Rate): $350\nTotal: $16,300\n\nRequested Delivery Date: October 15, 2026\nShip To: Apex Global Solutions, 1200 Commerce Drive, Suite 400, Dallas, TX 75201\n\n---\n\n[DOCUMENT 2 — INVOICE]\nSTERLING OFFICE SUPPLY CO.\nINVOICE #INV-88340\nDate: October 3, 2026\nBill To: Apex Global Solutions\n\nPO Reference: #PO-55210\n\nItems:\n1. Premium Ergonomic Desk Chair (EC-500) x25 — $8,500.00\n2. Adjustable Standing Desk (SD-200) x10 — $5,200.00\n3. LED Desk Lamp (DL-100) x50 — $2,250.00\n\nSubtotal: $15,950.00\nShipping: $350.00\nSales Tax (8.25%): $1,315.88\nTotal Due: $17,615.88\n\nPayment Terms: Net 30 (Due by November 2, 2026)\n\n---\n\n[DOCUMENT 3 — SHIPPING CONFIRMATION]\nFrom: logistics@sterlingoffice.com\nTo: purchasing@apexglobal.com\nDate: October 12, 2026\nSubject: Shipment Notification — Order #PO-55210\n\nDear Apex Purchasing Team,\n\nYour order #PO-55210 has been shipped via FastTrack Logistics. Please note the following:\n\n• Tracking Number: FT-994821\n• Estimated Delivery: October 14, 2026\n• Shipment Contents: 25 desk chairs, 10 standing desks, 50 desk lamps (all items included)\n• Delivery Instructions: Loading dock access required; driver will call 30 minutes before arrival\n\nPlease ensure someone is available at the loading dock to sign for the delivery.\n\nRegards,\nSterling Logistics Team",
          questions: [
            { qNum: 191, q: "What is the difference between the PO total and the invoice total?", opts: [{ key: "A", text: "The invoice has a different shipping rate." }, { key: "B", text: "The invoice shows fewer items than ordered." }, { key: "C", text: "The invoice applies a bulk purchase discount." }, { key: "D", text: "The invoice includes sales tax not listed on the PO." }], a: "D", exp: "Đố mẹo cross-reference: PO total = $16,300 (no tax). Invoice total = $17,615.88 (includes 8.25% sales tax of $1,315.88). Chênh lệch = sales tax." },
            { qNum: 192, q: "When is payment due?", opts: [{ key: "A", text: "November 2, 2026." }, { key: "B", text: "Upon delivery." }, { key: "C", text: "October 15, 2026." }, { key: "D", text: "December 3, 2026." }], a: "A", exp: "Đáp án: 'Payment Terms: Net 30 (Due by November 2, 2026)'. Invoice date Oct 3 + 30 days = Nov 2." },
            { qNum: 193, q: "Will the order arrive before the requested delivery date?", opts: [{ key: "A", text: "Yes, three days early." }, { key: "B", text: "Yes, one day early." }, { key: "C", text: "No, it will be two days late." }, { key: "D", text: "The delivery date is not mentioned." }], a: "B", exp: "Cross-reference: PO requested Oct 15, shipping confirms estimated Oct 14 → 1 ngày sớm hơn." },
            { qNum: 194, q: "How many total items are being shipped?", opts: [{ key: "A", text: "25 items." }, { key: "B", text: "50 items." }, { key: "C", text: "85 items." }, { key: "D", text: "100 items." }], a: "C", exp: "Tính: 25 chairs + 10 desks + 50 lamps = 85 items total." },
            { qNum: 195, q: "What must be available at the delivery location?", opts: [{ key: "A", text: "A forklift operator." }, { key: "B", text: "A security guard for inspection." }, { key: "C", text: "A company credit card for payment." }, { key: "D", text: "Loading dock access and someone to sign." }], a: "D", exp: "Đáp án: 'Loading dock access required; driver will call 30 minutes before arrival' + 'someone is available to sign for the delivery'." }
          ]
        },
        // TRIPLE 3 (Q196-200): Restaurant review + Coupon + Reservation email
        {
          passages: "[DOCUMENT 1 — ONLINE RESTAURANT REVIEW]\n\nRestaurant: La Terrazza Italian Kitchen\nReviewer: FoodieExplorer | Rating: ★★★★★ (5 out of 5)\nDate: October 5, 2026\n\nAbsolutely phenomenal dining experience! My wife and I visited La Terrazza for our anniversary dinner last Saturday and were blown away. The handmade truffle ravioli ($28) was the best pasta dish I have ever had — rich, perfectly seasoned, and generously portioned. The sommelier recommended an excellent Barolo wine that paired beautifully with our main courses.\n\nThe private dining terrace overlooking the harbor was incredibly romantic. Service was impeccable — our server, Marco, was attentive without being intrusive. The only minor note: reservations are essential, especially on weekends. We booked two weeks in advance and they were nearly full.\n\nHighly recommended for special occasions. Plan to spend around $150-$200 per couple with wine.\n\n---\n\n[DOCUMENT 2 — PROMOTIONAL COUPON]\n\nLA TERRAZZA ITALIAN KITCHEN — EXCLUSIVE OFFER\nPresent this voucher to receive:\n• 20% OFF your total bill (food items only, excludes beverages and wine)\n• Valid Monday through Thursday only\n• Not valid on public holidays or in combination with other promotions\n• Minimum party size: 2 guests\n• Valid: October 1 - December 31, 2026\n• Voucher Code: TERRAZZA20\n\n---\n\n[DOCUMENT 3 — RESERVATION EMAIL]\nFrom: bookings@laterrazza.com\nTo: karen.wu@email.com\nDate: October 15, 2026\nSubject: Reservation Confirmed — November 8, 2026\n\nDear Ms. Wu,\n\nYour reservation at La Terrazza Italian Kitchen has been confirmed:\n\n• Date: Friday, November 8, 2026\n• Time: 7:30 PM\n• Party Size: 4 guests\n• Seating: Indoor main dining room\n• Special Request: One guest requires a gluten-free menu\n\nPlease note that tables are held for a maximum of 15 minutes past the reservation time. For changes or cancellations, please call (555) 789-4500 at least 24 hours in advance.\n\nWe look forward to welcoming you.\n\nWarm regards,\nLa Terrazza Reservations",
          questions: [
            { qNum: 196, q: "How much does the truffle ravioli cost?", opts: [{ key: "A", text: "$28." }, { key: "B", text: "$18." }, { key: "C", text: "$24." }, { key: "D", text: "$35." }], a: "A", exp: "Đáp án: 'The handmade truffle ravioli ($28)'." },
            { qNum: 197, q: "Can Ms. Wu use the promotional coupon for her reservation?", opts: [{ key: "A", text: "Yes, the coupon is valid for her Friday dinner." }, { key: "B", text: "No, the coupon is only valid Monday through Thursday." }, { key: "C", text: "Yes, but only if she orders wine with dinner." }, { key: "D", text: "No, the coupon has already expired." }], a: "B", exp: "Đố mẹo cross-reference: Ms. Wu's reservation = Friday, Nov 8. Coupon valid 'Monday through Thursday only' → KHÔNG áp dụng được." },
            { qNum: 198, q: "What special request was made for Ms. Wu's reservation?", opts: [{ key: "A", text: "A birthday cake for one guest." }, { key: "B", text: "A window seat overlooking the harbor." }, { key: "C", text: "One guest requires a gluten-free menu." }, { key: "D", text: "Live music during dinner." }], a: "C", exp: "Yêu cầu đặc biệt: 'One guest requires a gluten-free menu'." },
            { qNum: 199, q: "According to the review, what should diners do before visiting on weekends?", opts: [{ key: "A", text: "Arrive early to get a walk-in table." }, { key: "B", text: "Download the restaurant's mobile app." }, { key: "C", text: "Order food for takeout instead." }, { key: "D", text: "Book a reservation well in advance." }], a: "D", exp: "Đáp án: 'reservations are essential, especially on weekends. We booked two weeks in advance and they were nearly full'." },
            { qNum: 200, q: "How long will the restaurant hold Ms. Wu's table?", opts: [{ key: "A", text: "15 minutes past the reservation time." }, { key: "B", text: "5 minutes past the reservation time." }, { key: "C", text: "10 minutes past the reservation time." }, { key: "D", text: "30 minutes past the reservation time." }], a: "A", exp: "Chính sách: 'tables are held for a maximum of 15 minutes past the reservation time'." }
          ]
        }
      ];

      part7Sets.forEach((set) => {
        set.questions.forEach((qItem) => {
          qs.push({
            id: `tlr1_q${qItem.qNum}`,
            partNumber: 7,
            partTitle: "Part 7: Reading Comprehension",
            section: "READING",
            passageText: set.passages,
            questionText: `${qItem.qNum}. ${qItem.q}`,
            options: qItem.opts as any,
            correctAnswer: qItem.a,
            explanation: qItem.exp
          });
        });
      });

  return qs;
};

export const toeicLr202601Paper: ExamPaper = {
  id: "toeic_lr_2026_01",
  title: "ETS TOEIC 2026 Official Test #01",
  type: "TOEIC_FULL",
  level: "Intermediate",
  timeLimitMinutes: 120,
  totalQuestions: 200,
  maxScore: 990,
  description: "Bộ đề chuẩn ETS 2026 200 câu Nghe & Đọc phân tích đáp án Tiếng Việt chi tiết.",
  categoryBadge: "TOEIC 990",
  tags: ["ETS 2026", "Nghe & Đọc", "Full 200 Câu", "Chính Thức"],
  supportedSkills: ["LISTENING", "READING"],
  questions: buildToeicLR01Questions()
};
