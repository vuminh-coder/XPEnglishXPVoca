import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_LESSONS = [
  {
    id: "listen_toeic_q3_101",
    title: "Hotel Housekeeping Quality Audit & Room Inspections",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Executive Housekeeper",
        text: "Good morning housekeeping staff, here is our operational brief for today's high-occupancy checkout schedule.",
        translation: "Chào buổi sáng nhân viên buồng phòng, đây là điểm tin vận hành cho lịch trả phòng mật độ cao ngày hôm nay.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈhaʊsˌkiː.pɪŋ stɑːf hɪər ɪz ˈaʊər ˌɒp.ərˈeɪ.ʃən.əl briːf fɔːr təˈdeɪz haɪ-ˈɒk.jə.pən.si ˈtʃek.aʊt ˈʃed.juːl/"
      },
      {
        id: 2,
        speaker: "Executive Housekeeper",
        text: "We have over one hundred and fifty guest checkouts scheduled, and all rooms must be sanitized and restocked before 2 PM check-in.",
        translation: "Chúng ta có hơn 150 lượt trả phòng được lên lịch, và tất cả các phòng phải được khử trùng và bổ sung đồ dùng trước giờ nhận phòng 2 giờ chiều.",
        timestamp: [5.3, 10.8],
        ipa: "/wiː hæv ˈəʊ.vər wʌn ˈhʌn.drəd ænd ˈfɪf.ti ɡest ˈtʃek.aʊts ˈʃed.juːld ænd ɔːl ruːmz mʌst biː ˈsæn.ɪ.taɪzd ænd ˌriːˈstɒkt bɪˈfɔː tuː piː-em ˈtʃek.ɪn/"
      },
      {
        id: 3,
        speaker: "Executive Housekeeper",
        text: "Floor supervisors will conduct random quality inspections across all floors to ensure international cleanliness standards.",
        translation: "Các giám sát viên tầng sẽ tiến hành kiểm tra chất lượng ngẫu nhiên trên tất cả các tầng để đảm bảo các tiêu chuẩn vệ sinh quốc tế.",
        timestamp: [10.8, 16.1],
        ipa: "/flɔːr ˈsuː.pə.vaɪ.zəz wɪl kənˈdʌkt ˈræn.dəm ˈkwɒl.ə.ti ɪnˈspek.ʃənz əˈkrɒs ɔːl flɔːz tuː ɪnˈʃʊər ˌɪn.təˈnæʃ.ən.əl ˈklen.li.nəs ˈstæn.dədz/"
      },
      {
        id: 4,
        speaker: "Executive Housekeeper",
        text: "Housekeeping attendants who achieve a top rating this week will receive a fifty dollar performance voucher.",
        translation: "Nhân viên buồng phòng đạt được đánh giá hàng đầu trong tuần này sẽ nhận được một phiếu quà tặng hiệu năng 50 đô la.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈhaʊsˌkiː.pɪŋ əˈten.dənts huː əˈtʃiːv ə tɒp ˈreɪ.tɪŋ ðɪs wiːk wɪl rɪˈsiːv ə ˈfɪf.ti ˈdɒl.ər pəˈfɔː.məns ˈvaʊ.tʃər/"
      }
    ],
    vocabList: [
      {
        word: "housekeeping",
        ipa: "/ˈhaʊsˌkiː.pɪŋ/",
        pos: "Noun",
        meaning: "Bộ phận buồng phòng khách sạn",
        detailMeaning: "Đội ngũ chuyên trách dọn dẹp vệ sinh phòng lưu trú.",
        collocations: ["housekeeping staff", "housekeeping team"],
        example: "The housekeeping team cleans and inspects over two hundred guest rooms daily."
      },
      {
        word: "sanitation",
        ipa: "/ˌsæn.əˈteɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự vệ sinh, khử trùng",
        detailMeaning: "Khử trùng bề mặt phòng khách sạn theo chuẩn.",
        collocations: ["sanitation procedures", "room sanitation"],
        example: "High-touch bathroom surfaces undergo strict sanitation procedures."
      },
      {
        word: "turn-down service",
        ipa: "/ˈtɝːn.daʊn ˈsɝː.vɪs/",
        pos: "Noun",
        meaning: "Dịch vụ dọn phòng buổi tối",
        detailMeaning: "Dọn dẹp ga trải giường và chuẩn bị phòng trước giờ ngủ.",
        collocations: ["evening turn-down", "complimentary turn-down"],
        example: "VIP suites receive complimentary evening turn-down service."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Lịch kiểm tra: random room quality audits will be conducted by + Noun",
        explanation: "Thông báo kiểm tra chất lượng vệ sinh phòng ngẫu nhiên.",
        example: "Room audits will be conducted by floor supervisors.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Yêu cầu Chuẩn hóa: all guest rooms must be fully inspected and marked ready before + [Time]",
        explanation: "Quy định giờ hoàn tất dọn phòng trước giờ check-in.",
        example: "Rooms must be marked ready before 2 PM check-in.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_100",
    title: "Corporate Legal Contract Review & Nondisclosure Agreements",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Chief Legal Counsel",
        text: "Good morning department managers, this is a legal compliance reminder regarding corporate partnership contracts.",
        translation: "Chào buổi sáng các quản lý phòng ban, đây là nhắc nhở tuân thủ pháp lý liên quan đến các hợp đồng đối tác doanh nghiệp.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ dɪˈpɑːt.mənt ˈmæn.ɪdʒ.əz ðɪs ɪz ə ˈliː.ɡəl kəmˈplaɪ.əns rɪˈmaɪn.dər rɪˈɡɑː.dɪŋ ˈkɔː.pər.ət ˈpɑːt.nə.ʃɪp ˈkɒn.trækts/"
      },
      {
        id: 2,
        speaker: "Chief Legal Counsel",
        text: "All third-party vendors and external consultants must execute a standard mutual Nondisclosure Agreement before receiving proprietary project data.",
        translation: "Tất cả các nhà cung cấp bên thứ ba và cố vấn bên ngoài phải ký một Thỏa thuận Bảo mật Thông tin song phương tiêu chuẩn trước khi nhận dữ liệu dự án độc quyền.",
        timestamp: [5.3, 10.8],
        ipa: "/ɔːl θɜːd-ˈpɑː.ti ˈven.dəz ænd ɪkˈstɜː.nəl kənˈsʌl.tənts mʌst ˈek.sɪ.kjuːt ə ˈstæn.dəd ˈmjuː.tʃu.əl ˌnɒn.dɪsˈkləʊ.ʒər əˈɡriː.mənt bɪˈfɔː rɪˈsiːv.ɪŋ prəˈpraɪə.tr.i ˈprɒd.ʒekt ˈdeɪ.tə/"
      },
      {
        id: 3,
        speaker: "Chief Legal Counsel",
        text: "Standard approved NDA templates are readily downloadable from the internal corporate legal portal.",
        translation: "Các mẫu NDA tiêu chuẩn đã được phê duyệt có thể dễ dàng tải xuống từ cổng thông tin pháp lý doanh nghiệp nội bộ.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈstæn.dəd əˈpruːvd en-diː-eɪ ˈtem.plɪts ɑːr ˈred.ɪ.li ˌdaʊnˈləʊ.də.bəl frəm ðɪ ɪnˈtɜː.nəl ˈkɔː.pər.ət ˈliː.ɡəl ˈpɔː.təl/"
      },
      {
        id: 4,
        speaker: "Chief Legal Counsel",
        text: "Any customized contract modifications must be submitted to our legal counsel team at least three business days prior to signing.",
        translation: "Bất kỳ sự sửa đổi hợp đồng tùy chỉnh nào cũng phải được nộp cho đội ngũ cố vấn pháp lý của chúng tôi ít nhất ba ngày làm việc trước khi ký.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈen.i ˈkʌs.təm.aɪzd ˈkɒn.trækt ˌmɒd.ɪ.fɪˈkeɪ.ʃənz mʌst biː səbˈmɪt.ɪd tuː ˈaʊər ˈliː.ɡəl ˈkaʊn.səl tiːm æt liːst θriː ˈbɪz.nɪs deɪz praɪər tuː ˈsaɪn.ɪŋ/"
      }
    ],
    vocabList: [
      {
        word: "Nondisclosure Agreement",
        ipa: "/ˌnɑːn.dɪˈskloʊ.ʒɚ əˈɡriː.mənt/",
        pos: "Noun (NDA)",
        meaning: "Thỏa thuận bảo mật thông tin",
        detailMeaning: "Hợp đồng cam kết giữ bí mật thông tin kinh doanh.",
        collocations: ["sign NDA", "execute mutual NDA"],
        example: "External contractors must sign a binding nondisclosure agreement before starting work."
      },
      {
        word: "confidentiality",
        ipa: "/ˌkɑːn.fə.den.ʃiˈæl.ə.t̬i/",
        pos: "Noun",
        meaning: "Tính bảo mật thông tin",
        detailMeaning: "Quy định giữ kín dữ liệu khách hàng và bí mật công nghệ.",
        collocations: ["maintain confidentiality", "confidentiality clause"],
        example: "Maintaining client confidentiality is mandatory for all legal counsel."
      },
      {
        word: "legal counsel",
        ipa: "/ˈliː.ɡəl ˈkaʊn.səl/",
        pos: "Noun",
        meaning: "Cố vấn/Đội ngũ pháp lý",
        detailMeaning: "Luật sư nội bộ tư vấn và duyệt hợp đồng.",
        collocations: ["submit to legal counsel", "chief legal counsel"],
        example: "All contracts must be reviewed by internal legal counsel."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bắt buộc Ký kết: all parties are required to execute [Document] prior to + V-ing/Noun",
        explanation: "Quy định an toàn pháp lý trước khi chia sẻ thông tin.",
        example: "Partners are required to execute an NDA prior to sharing proprietary data.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Yêu cầu Sửa đổi: contract drafts must be reviewed by + Noun",
        explanation: "Quy trình phê duyệt sửa đổi hợp đồng.",
        example: "Drafts must be reviewed by the legal department.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_099",
    title: "Intermodal Freight Transport & Railway Terminal Scheduling",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Intermodal Operations Manager",
        text: "Attention shipping clients, this is an update from Pacific Rail and Intermodal Logistics Services.",
        translation: "Xin chú ý các khách hàng gửi hàng, đây là thông báo cập nhật từ Dịch vụ Logistics Đa phương thức và Đường sắt Thái Bình Dương.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ˈʃɪp.ɪŋ ˈklaɪ.ənts ðɪs ɪz æn ʌpˈdeɪt frəm pəˈsɪf.ɪk reɪl ænd ˌɪn.təˈməʊ.dəl ləˈdʒɪs.tɪks ˈsɜː.vɪs.ɪz/"
      },
      {
        id: 2,
        speaker: "Intermodal Operations Manager",
        text: "Our expanded intermodal transfer terminal at Berth 5 is now fully operational for sea-to-rail cargo transfers.",
        translation: "Bến trung chuyển đa phương thức mở rộng của chúng tôi tại Bến 5 hiện đã đi vào hoạt động hoàn toàn cho việc chuyển giao hàng hóa từ đường biển sang đường sắt.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈaʊər ɪkˈspæn.dɪd ˌɪn.təˈməʊ.dəl ˈtræn.sfɜː ˈtɜː.mɪ.nəl æt bɜːθ faɪv ɪz naʊ ˈfʊl.i ˌɒp.ərˈeɪ.ʃən.əl fɔːr siː-tuː-reɪl ˈkɑː.ɡəʊ ˈtræn.sfɜːz/"
      },
      {
        id: 3,
        speaker: "Intermodal Operations Manager",
        text: "Automated gantry cranes now transfer shipping containers directly from cargo vessels onto freight trains in under ninety minutes.",
        translation: "Cần cẩu giàn tự động giờ đây chuyển các container hàng trực tiếp từ tàu chở hàng lên tàu hỏa chở hàng trong chưa đầy 90 phút.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈɔː.tə.meɪ.tɪd ˈɡæn.tri kreɪnz naʊ ˈtræn.sfɜː ˈʃɪp.ɪŋ kənˈteɪ.nəz dɪˈrekt.li frəm ˈkɑː.ɡəʊ ˈves.əlz ˈɒn.tuː freɪt treɪnz ɪn ˈʌn.dər ˈnaɪn.ti ˈmɪn.ɪts/"
      },
      {
        id: 4,
        speaker: "Intermodal Operations Manager",
        text: "This seamless intermodal route cuts total transit time to inland distribution hubs by two full business days.",
        translation: "Tuyến đường đa phương thức liền mạch này giúp cắt giảm tổng thời gian di chuyển đến các trung tâm phân phối nội địa đi hai ngày làm việc trọn vẹn.",
        timestamp: [16.1, 23.0],
        ipa: "/ðɪs ˈsiːm.ləs ˌɪn.təˈməʊ.dəl ruːt kʌts ˈtəʊ.təl ˈtræn.zɪt taɪm tuː ˈɪn.lənd ˌdɪs.trɪˈbjuː.ʃən hʌbz baɪ tuː fʊl ˈbɪz.nɪs deɪz/"
      }
    ],
    vocabList: [
      {
        word: "intermodal",
        ipa: "/ˌɪn.t̬ɚˈmoʊ.dəl/",
        pos: "Adj",
        meaning: "Vận tải đa phương thức",
        detailMeaning: "Kết hợp vận tải đường biển, đường sắt và đường bộ.",
        collocations: ["intermodal freight", "intermodal terminal"],
        example: "Intermodal freight shipping reduces overall transport costs and transit time."
      },
      {
        word: "transfer terminal",
        ipa: "/ˈtræn.sfɝː ˈtɝː.mə.nəl/",
        pos: "Noun",
        meaning: "Ga/bến trung chuyển hàng",
        detailMeaning: "Nơi cẩu bốc xếp container từ tàu sang toa xe lửa.",
        collocations: ["sea-to-rail transfer", "rail terminal"],
        example: "The transfer terminal speeds up cargo distribution across states."
      },
      {
        word: "freight train",
        ipa: "/freɪt treɪn/",
        pos: "Noun",
        meaning: "Tàu hỏa chở hàng",
        detailMeaning: "Đoàn tàu chuyên chở container đường dài.",
        collocations: ["load freight train", "cargo train"],
        example: "Freight trains transport agricultural goods across the country."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Tự động hóa: containers are automatically transferred from [Origin] to [Destination]",
        explanation: "Mô tả quy trình trung chuyển hàng hóa tự động.",
        example: "Cargo is automatically loaded onto rail cars.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Cam kết Thời gian Transit: total transit time from [Place] to [Place] is reduced to + Time",
        explanation: "Khẳng định hiệu suất rút ngắn thời gian vận chuyển.",
        example: "Total transit time is reduced to three days.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_098",
    title: "Organic Agriculture Farm Certification Audit",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Agricultural Inspection Director",
        text: "Good morning regional growers, this is a announcement from the Department of Organic Standards and Compliance.",
        translation: "Chào buổi sáng các người trồng trọt trong khu vực, đây là thông báo từ Cục Tiêu chuẩn và Tuân thủ Hữu cơ.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈriː.dʒən.əl ˈɡrəʊ.əz ðɪs ɪz ə əˈnaʊns.mənt frəm ðə dɪˈpɑːt.mənt əv ɔːˈɡæn.ɪk ˈstæn.dədz ænd kəmˈplaɪ.əns/"
      },
      {
        id: 2,
        speaker: "Agricultural Inspection Director",
        text: "Annual soil and crop inspections for farms applying for organic renewal will take place throughout next month.",
        translation: "Các cuộc kiểm tra đất và cây trồng hàng năm cho các trang trại nộp đơn xin gia hạn chứng nhận hữu cơ sẽ diễn ra trong suốt tháng tới.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈæn.ju.əl sɔɪl ænd krɒp ɪnˈspek.ʃənz fɔːr fɑːmz əˈplaɪ.ɪŋ fɔːr ɔːˈɡæn.ɪk rɪˈnjuː.əl wɪl teɪk pleɪs θruːˈaʊt nekst mʌnθ/"
      },
      {
        id: 3,
        speaker: "Agricultural Inspection Director",
        text: "Certified inspectors will verify that all crop fields have remained completely free of prohibited synthetic chemicals for three years.",
        translation: "Các thanh tra viên được chứng nhận sẽ xác minh rằng tất cả các cánh đồng trồng trọt đã hoàn toàn không sử dụng hóa chất tổng hợp bị cấm trong ba năm.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈsɜː.tɪ.faɪd ɪnˈspek.təz wɪl ˈver.ɪ.faɪ ðæt ɔːl krɒp fiːldz hæv rɪˈmeɪnd kəmˈpliːt.li friː əv prəˈhɪb.ɪ.tɪd sɪnˈθet.ɪk ˈkem.ɪ.kəlz fɔːr θriː jɪəz/"
      },
      {
        id: 4,
        speaker: "Agricultural Inspection Director",
        text: "Growers who pass the inspection audit will receive their official organic certificate renewal before October 31st.",
        translation: "Những người trồng trọt vượt qua kỳ kiểm tra sẽ nhận được giấy gia hạn chứng nhận hữu cơ chính thức trước ngày 31 tháng 10.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈɡrəʊ.əz huː pɑːs ðɪ ɪnˈspek.ʃən ˈɔː.dɪt wɪl rɪˈsiːv ðeər əˈfɪʃ.əl ɔːˈɡæn.ɪk səˈtɪf.ɪ.kət rɪˈnjuː.əl bɪˈfɔː ɒkˈtəʊ.bər ˈθɜː.ti-fɜːst/"
      }
    ],
    vocabList: [
      {
        word: "pesticide",
        ipa: "/ˈpes.tə.saɪd/",
        pos: "Noun",
        meaning: "Thuốc trừ sâu hóa học",
        detailMeaning: "Hóa chất tổng hợp bị cấm trong tiêu chuẩn nông nghiệp hữu cơ.",
        collocations: ["synthetic pesticide", "free of pesticides"],
        example: "Organic farming standards prohibit synthetic chemical pesticides."
      },
      {
        word: "compliance audit",
        ipa: "/kəmˈplaɪ.əns ˈɔː.dɪt/",
        pos: "Noun",
        meaning: "Kỳ kiểm tra tuân thủ",
        detailMeaning: "Thanh tra mẫu đất và dư lượng hóa chất tại nông trại.",
        collocations: ["inspection audit", "pass compliance audit"],
        example: "Soil testing verified full compliance with national organic criteria."
      },
      {
        word: "renewal",
        ipa: "/rɪˈnuː.əl/",
        pos: "Noun",
        meaning: "Sự gia hạn chứng nhận",
        detailMeaning: "Cấp lại chứng chỉ nông sản sạch định kỳ.",
        collocations: ["organic renewal", "certificate renewal"],
        example: "Receiving official organic certification opens access to premium export markets."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Thì Hiện tại Hoàn thành: soil samples have been collected from + Location",
        explanation: "Báo cáo công tác lấy mẫu xét nghiệm đất.",
        example: "Soil samples have been collected from all active farming fields.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Diễn tả Kết quả Đánh giá: farms that meet [Criteria] will be awarded + Noun",
        explanation: "Quyền lợi khi hoàn tất thanh tra chứng nhận hữu cơ.",
        example: "Qualified farms will be awarded the official green seal.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_097",
    title: "Electronics Retail Store Extended Warranty Policy",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Retail Store Customer Service Manager",
        text: "Attention shoppers, welcome to the customer service counter at Megatech Electronics.",
        translation: "Xin chú ý quý khách hàng, chào mừng quý vị đến với quầy dịch vụ khách hàng tại Megatech Electronics.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ˈʃɒp.əz ˈwel.kəm tuː ðə ˈkʌs.tə.mər ˈsɜː.vɪs ˈkaʊn.tər æt ˈmeg.ə.tek ˌɪl.ekˈtrɒn.ɪks/"
      },
      {
        id: 2,
        speaker: "Retail Store Customer Service Manager",
        text: "We are pleased to introduce our updated extended warranty protection plan for all home appliances and laptops.",
        translation: "Chúng tôi rất vui mừng giới thiệu chương trình bảo vệ bảo hành mở rộng đã được cập nhật cho tất cả các thiết bị gia dụng và máy tính xách tay.",
        timestamp: [5.3, 10.8],
        ipa: "/wiː ɑːr pliːzd tuː ˌɪn.trəˈdjuːs ˈaʊər ʌpˈdeɪ.tɪd ɪkˈsten.dɪd ˈwɒr.ən.ti prəˈtek.ʃən plæn fɔːr ɔːl həʊm əˈplaɪ.ən sɪz ænd ˈlæp.tɒps/"
      },
      {
        id: 3,
        speaker: "Retail Store Customer Service Manager",
        text: "Customers who sign up for the three-year plan will receive free annual hardware checkups and priority repair service.",
        translation: "Khách hàng đăng ký gói 3 năm sẽ nhận được các đợt kiểm tra phần cứng hàng năm miễn phí và dịch vụ sửa chữa ưu tiên.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈkʌs.tə.məz huː saɪn ʌp fɔːr ðə θriː-jɪər plæn wɪl rɪˈsiːv friː ˈæn.ju.əl ˈhɑːd.weər ˈtʃek.ʌps ænd praɪˈɒr.ə.ti rɪˈpeər ˈsɜː.vɪs/"
      },
      {
        id: 4,
        speaker: "Retail Store Customer Service Manager",
        text: "If a defective product cannot be fixed within forty-eight hours, an immediate store replacement will be provided.",
        translation: "Nếu một sản phẩm bị lỗi không thể sửa chữa trong vòng 48 giờ, một sản phẩm thay thế tại cửa hàng sẽ được cung cấp ngay lập tức.",
        timestamp: [16.1, 23.0],
        ipa: "/ɪf ə dɪˈfek.tɪd ˈprɒd.ʌkt ˈkæn.ɒt biː fɪkst wɪðˈɪn ˈfɔː.ti-eɪt ˈaʊəz æn ɪˈmiː.di.ət stɔːr rɪˈpleɪs.mənt wɪl biː prəˈvaɪ.dɪd/"
      }
    ],
    vocabList: [
      {
        word: "extended warranty",
        ipa: "/ɪkˈsten.dɪd ˈwɔːr.ən.t̬i/",
        pos: "Noun",
        meaning: "Bảo hành mở rộng",
        detailMeaning: "Gói dịch vụ bảo vệ thiết bị ngoài thời gian chuẩn.",
        collocations: ["extended warranty plan", "warranty coverage"],
        example: "The extended warranty coverage includes accidental screen damage."
      },
      {
        word: "replacement",
        ipa: "/rɪˈpleɪs.mənt/",
        pos: "Noun",
        meaning: "Sản phẩm đổi mới thay thế",
        detailMeaning: "Đổi thiết bị mới nếu không sửa được trong 48h.",
        collocations: ["store replacement", "immediate replacement"],
        example: "Unrepairable devices qualify for an immediate store replacement."
      },
      {
        word: "defective",
        ipa: "/dɪˈfek.tɪv/",
        pos: "Adj",
        meaning: "Bị lỗi nhà sản xuất",
        detailMeaning: "Hàng hóa gặp sự cố kỹ thuật hỏng hóc.",
        collocations: ["defective product", "defective unit"],
        example: "The store replaces defective products free of charge."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Quyền lợi Bảo hành: customers who purchase [N/NP] are entitled to receive + Noun",
        explanation: "Thông báo quyền lợi ưu tiên sửa chữa thiết bị.",
        example: "Buyers are entitled to receive free technical support for one year.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Bị động Điều kiện: repairs will be completed within + Time + upon presenting + Noun",
        explanation: "Cam kết xử lý đổi trả hàng lỗi.",
        example: "Repairs will be completed upon presenting proof of purchase.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_096",
    title: "Video Game Development & Closed Beta Testing",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Game Development Lead",
        text: "Hello gaming community, I am thrilled to announce an exciting update regarding our upcoming multiplayer title, Cyber Realm.",
        translation: "Xin chào cộng đồng game thủ, tôi rất vui mừng được thông báo một thông tin cập nhật thú vị liên quan đến tựa game nhiều người chơi sắp tới của chúng tôi, Cyber Realm.",
        timestamp: [0, 5.3],
        ipa: "/həˈləʊ ˈɡeɪm.ɪŋ kəˈmjuː.nə.ti aɪ æm θrɪld tuː əˈnaʊns æn ɪkˈsaɪt.ɪŋ ʌpˈdeɪt rɪˈɡɑː.dɪŋ ˈaʊər ˈʌpˌkʌm.ɪŋ ˌmʌl.tiˈpleɪ.ər ˈtaɪ.təl ˈsaɪ.bər relm/"
      },
      {
        id: 2,
        speaker: "Game Development Lead",
        text: "Registration for our closed beta testing phase is now officially open on our community web portal starting today.",
        translation: "Việc đăng ký cho giai đoạn thử nghiệm closed beta của chúng tôi hiện đã chính thức mở trên cổng thông tin điện tử cộng đồng bắt đầu từ hôm nay.",
        timestamp: [5.3, 10.8],
        ipa: "/ˌredʒ.ɪˈstreɪ.ʃən fɔːr ˈaʊər kləʊzd ˈbiː.tə ˈtest.ɪŋ feɪz ɪz naʊ əˈfɪʃ.əl.i ˈəʊ.pən ɒn ˈaʊər kəˈmjuː.nə.ti web ˈpɔː.təl ˈstɑːt.ɪŋ təˈdeɪ/"
      },
      {
        id: 3,
        speaker: "Game Development Lead",
        text: "Ten thousand selected testers will be granted early access next Friday to help us stress-test our multiplayer server capacity.",
        translation: "10.000 người thử nghiệm được chọn sẽ được trao quyền truy cập sớm vào Thứ Sáu tuần tới để giúp chúng tôi kiểm tra sức chịu tải của máy chủ nhiều người chơi.",
        timestamp: [10.8, 16.1],
        ipa: "/ten ˈθaʊ.zənd sɪˈlek.tɪd ˈtes.təz wɪl biː ˈɡrɑːn.tɪd ˈɜː.li ˈæk.ses nekst ˈfraɪ.deɪ tuː help ʌs stres-test ˈaʊər ˌmʌl.tiˈpleɪ.ər ˈsɜː.vər kəˈpæs.ə.ti/"
      },
      {
        id: 4,
        speaker: "Game Development Lead",
        text: "Testers who submit detailed bug reports will earn an exclusive in-game cosmetic item upon official release.",
        translation: "Những người thử nghiệm gửi báo cáo lỗi chi tiết sẽ nhận được một vật phẩm trang trí độc quyền trong game khi ra mắt chính thức.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈtes.təz huː səbˈmɪt ˈdiː.teɪld bʌɡ rɪˈpɔːts wɪl ɜːn æn ɪkˈskluː.sɪv ɪn-ɡeɪm kɒzˈmet.ɪk ˈaɪ.təm əˈpɒn əˈfɪʃ.əl rɪˈliːs/"
      }
    ],
    vocabList: [
      {
        word: "beta testing",
        ipa: "/ˈbeɪ.t̬ə ˈtest.ɪŋ/",
        pos: "Noun",
        meaning: "Thử nghiệm phần mềm bản Beta",
        detailMeaning: "Cho người dùng chơi trước để phát hiện lỗi game.",
        collocations: ["closed beta testing", "beta tester"],
        example: "Closed beta testing helps developers identify gameplay bugs before official release."
      },
      {
        word: "stress-test",
        ipa: "/stres test/",
        pos: "Verb, Noun",
        meaning: "Kiểm tra chịu tải máy chủ",
        detailMeaning: "Tạo lượng truy cập cực lớn để test khả năng chống sập server.",
        collocations: ["stress-test server", "server capacity test"],
        example: "We stress-test our servers to handle high peak player traffic."
      },
      {
        word: "cosmetic item",
        ipa: "/kɒzˈmet.ɪk ˈaɪ.təm/",
        pos: "Noun",
        meaning: "Vật phẩm trang trí trong game",
        detailMeaning: "Trang phục vật phẩm đẹp không ảnh hưởng sức mạnh game.",
        collocations: ["in-game cosmetic", "exclusive cosmetic"],
        example: "Testers earn an exclusive in-game cosmetic item upon release."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Tuyên bố Mở Beta: registration for closed beta testing is now open on + Location",
        explanation: "Mở cổng đăng ký trải nghiệm thử nghiệm phần mềm.",
        example: "Beta signups are now open on the community forum.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Diễn tả Mục tiêu Thử nghiệm: designed to evaluate [N/NP] under [Conditions]",
        explanation: "Giải thích mục đích test quá tải hệ thống game.",
        example: "Testing is designed to evaluate server stability under heavy traffic.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_095",
    title: "Airport Terminal Runway Renovation & Gate Reassignment",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Airport Duty Manager",
        text: "Attention airport passengers and airline personnel, this is an operational announcement from Terminal Administration.",
        translation: "Xin chú ý các hành khách tại sân bay và nhân viên hãng hàng không, đây là thông báo vận hành từ Ban Quản lý Nhà ga.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ˈeə.pɔːt ˈpæs.ən.dʒəz ænd ˈeə.laɪn ˌpɜː.sənˈel ðɪs ɪz æn ˌɒp.ərˈeɪ.ʃən.əl əˈnaʊns.mənt frəm ˈtɜː.mɪ.nəl ədˌmɪn.ɪˈstreɪ.ʃən/"
      },
      {
        id: 2,
        speaker: "Airport Duty Manager",
        text: "Runway 2 North will be temporarily closed for scheduled asphalt resurfacing starting midnight tonight until 5 AM tomorrow.",
        translation: "Đường băng 2 Phía Bắc sẽ tạm thời đóng cửa để trải lại mặt đường nhựa theo kế hoạch bắt đầu từ nửa đêm nay cho đến 5 giờ sáng mai.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈrʌn.weɪ tuː nɔːθ wɪl biː ˈtem.pər.ər.əl.i kləʊzd fɔːr ˈʃed.juːld ˈæs.fælt ˌriːˈsɜː.fɪs.ɪŋ ˈstɑːt.ɪŋ ˈmɪd.naɪt təˈnaɪt ənˈtɪl faɪv eɪ-em təˈmɒr.əʊ/"
      },
      {
        id: 3,
        speaker: "Airport Duty Manager",
        text: "During this maintenance window, all departing and arriving flights will be rerouted through Runway 1 South.",
        translation: "Trong khung thời gian bảo trì này, tất cả các chuyến bay cất cánh và hạ cánh sẽ được chuyển hướng qua Đường băng 1 Phía Nam.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈdjʊə.rɪŋ ðɪs ˈmeɪn.tən.əns ˈwɪn.dəʊ ɔːl dɪˈpɑːt.ɪŋ ænd əˈraɪv.ɪŋ flaɪts wɪl biː ˌriːˈruːt.ɪd θruː ˈrʌn.weɪ wʌn saʊθ/"
      },
      {
        id: 4,
        speaker: "Airport Duty Manager",
        text: "Passengers should check flight information display screens frequently for potential gate reassignment notices.",
        translation: "Hành khách nên kiểm tra màn hình hiển thị thông tin chuyến bay thường xuyên để biết các thông báo phân công lại cửa khởi hành nếu có.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈpæs.ən.dʒəz ʃʊd tʃek flaɪt ˌɪn.fəˈmeɪ.ʃən dɪˈspleɪ skriːnz ˈfriː.kwənt.li fɔːr pəˈten.ʃəl ɡeɪt ˌriː.əˈsaɪn.mənt ˈnəʊ.tɪs.ɪz/"
      }
    ],
    vocabList: [
      {
        word: "runway",
        ipa: "/ˈrʌn.weɪ/",
        pos: "Noun",
        meaning: "Đường băng sân bay",
        detailMeaning: "Đường nhựa cho máy bay cất cánh và hạ cánh.",
        collocations: ["runway resurfacing", "closed runway"],
        example: "Runway 2 North is temporarily closed for surface resurfacing."
      },
      {
        word: "gate reassignment",
        ipa: "/ɡeɪt ˌriː.əˈsaɪn.mənt/",
        pos: "Noun",
        meaning: "Sự phân lại cửa lên máy bay",
        detailMeaning: "Thay đổi cổng ra máy bay do sửa chữa đường băng.",
        collocations: ["gate reassignment notice", "check gate"],
        example: "Gate reassignments will be displayed on flight information monitors."
      },
      {
        word: "reroute",
        ipa: "/ˌriːˈruːt/",
        pos: "Verb",
        meaning: "Chuyển hướng đường bay/đường lăn",
        detailMeaning: "Điều hướng máy bay sang đường băng dự phòng.",
        collocations: ["reroute flights", "reroute traffic"],
        example: "Flights were rerouted due to heavy crosswinds."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Tạm dừng: Runway 14 South will be closed for resurfacing from [Date] to [Date]",
        explanation: "Thông báo sửa chữa đường băng cất hạ cánh.",
        example: "The main terminal will be closed for cleaning overnight.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Nhắc nhở Theo dõi Thông tin: passengers are advised to check + Noun + for updates",
        explanation: "Khuyên hành khách kiểm tra bảng điện tử sân bay.",
        example: "Passengers are advised to check flight screens for gate changes.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_094",
    title: "Commercial Property Fire Insurance & Safety Compliance",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Commercial Insurance Risk Inspector",
        text: "Attention commercial building owners, this is an advisory notice from National Fire and Property Insurance.",
        translation: "Xin chú ý các chủ tòa nhà thương mại, đây là thông báo tư vấn từ Bảo hiểm Tài sản và Cháy nổ Quốc gia.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən kəˈmɜː.ʃəl ˈbɪl.dɪŋ ˈəʊ.nəz ðɪs ɪz æn ədˈvaɪ.zər.i ˈnəʊ.tɪs frəm ˈnæʃ.ən.əl faɪər ænd ˈprɒp.ə.ti ɪnˈʃʊə.rəns/"
      },
      {
        id: 2,
        speaker: "Commercial Insurance Risk Inspector",
        text: "Annual fire safety audits for all insured industrial properties will begin across the metro region next Monday.",
        translation: "Các cuộc kiểm tra an toàn cháy nổ hàng năm cho tất cả các bất động sản công nghiệp được bảo hiểm sẽ bắt đầu trên toàn khu vực đô thị vào Thứ Hai tuần tới.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈæn.ju.əl faɪər ˈseɪf.ti ˈɔː.dɪts fɔːr ɔːl ɪnˈʃʊəd ɪnˈdʌs.tri.əl ˈprɒp.ə.tiz wɪl bɪˈɡɪn əˈkrɒs ðə ˈmet.rəʊ ˈriː.dʒən nekst ˈmʌn.deɪ/"
      },
      {
        id: 3,
        speaker: "Commercial Insurance Risk Inspector",
        text: "Inspectors will verify the operational readiness of automated water sprinklers, smoke detectors, and emergency exit doors.",
        translation: "Các giám định viên sẽ xác minh trạng thái sẵn sàng vận hành của hệ thống phun nước tự động, máy báo khói và các cửa thoát hiểm khẩn cấp.",
        timestamp: [10.8, 16.1],
        ipa: "/ɪnˈspek.təz wɪl ˈver.ɪ.faɪ ðɪ ˌɒp.ərˈeɪ.ʃən.əl ˈred.i.nəs əv ˈɔː.tə.meɪ.tɪd ˈwɔː.tər ˈsprɪŋ.kləz sməʊk dɪˈtek.təz ænd ɪˈmɜː.dʒən.si ˈek.sɪt dɔːz/"
      },
      {
        id: 4,
        speaker: "Commercial Insurance Risk Inspector",
        text: "Policyholders who pass the audit without compliance violations will receive a ten percent credit on their annual premium.",
        translation: "Các chủ hợp đồng vượt qua kỳ kiểm tra mà không vi phạm tuân thủ sẽ nhận được khoản tín dụng 10% trên phí bảo hiểm hàng năm của họ.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈpɒl.ə.siˌhəʊl.dəz huː pɑːs ðɪ ˈɔː.dɪt wɪðˈaʊt kəmˈplaɪ.əns ˌvaɪ.əˈleɪ.ʃənz wɪl rɪˈsiːv ə ten pəˈsent ˈkred.ɪt ɒn ðeər ˈæn.ju.əl ˈpriː.mi.əm/"
      }
    ],
    vocabList: [
      {
        word: "sprinkler system",
        ipa: "/ˈsprɪŋ.klɚ ˈsɪs.təm/",
        pos: "Noun",
        meaning: "Hệ thống vòi phun nước chữa cháy tự động",
        detailMeaning: "Thiết bị PCCC gắn trần tự động xả nước khi có khói.",
        collocations: ["water sprinkler", "operational sprinkler"],
        example: "Building inspection verified that all emergency sprinkler systems are operational."
      },
      {
        word: "premium credit",
        ipa: "/ˈpriː.mi.əm ˈkred.ɪt/",
        pos: "Noun",
        meaning: "Khoản giảm trừ phí bảo hiểm",
        detailMeaning: "Giảm 10% chi phí hợp đồng bảo hiểm do đạt chuẩn an toàn.",
        collocations: ["annual premium", "receive premium credit"],
        example: "Maintaining fire safety compliance qualifies property owners for lower premiums."
      },
      {
        word: "compliance violation",
        ipa: "/kəmˈplaɪ.əns ˌvaɪ.əˈleɪ.ʃən/",
        pos: "Noun",
        meaning: "Lỗi vi phạm tuân thủ quy định PCCC",
        detailMeaning: "Không lắp đủ bình chữa cháy hoặc chèn cửa thoát hiểm.",
        collocations: ["without violation", "safety violation"],
        example: "Properties with zero compliance violations earn maximum insurance discounts."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Điều kiện Giảm Phí: premium discounts will be granted provided that + Clause",
        explanation: "Lợi ích tài chính khi đạt chuẩn kiểm định an toàn cháy nổ.",
        example: "Policy discounts will be granted provided that fire alarms pass inspection.",
        sentenceId: 4
      },
      {
        title: "Cấu trúc Yêu cầu Bắt buộc: property owners are required to inspect + Noun + annually",
        explanation: "Quy định bắt buộc đối với chủ tài sản công nghiệp.",
        example: "Owners are required to inspect fire extinguishers annually.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_093",
    title: "Smart Agriculture Monitoring & Cattle Health Tracking",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Agritech Solutions Director",
        text: "Hello agricultural tech representatives, welcome to our demonstration of the Smart Farm Livestock Collar.",
        translation: "Xin chào các đại diện công nghệ nông nghiệp, chào mừng đến với buổi trình diễn Vòng đeo cổ Gia súc Thông minh của chúng tôi.",
        timestamp: [0, 5.3],
        ipa: "/həˈləʊ ˌæɡ.rɪˈkʌl.tʃər.əl tek ˌrep.rɪˈzen.tə.tɪvz ˈwel.kəm tuː ˈaʊər ˌdem.ənˈstreɪ.ʃən əv ðə smɑːt fɑːm ˈlaɪv.stɒk ˈkɒl.ər/"
      },
      {
        id: 2,
        speaker: "Agritech Solutions Director",
        text: "Each waterproof collar contains biometric sensors that monitor cattle body temperature and movement activity every ten minutes.",
        translation: "Mỗi vòng đeo cổ chống nước đều chứa các cảm biến sinh trắc học để theo dõi nhiệt độ cơ thể và hoạt động di chuyển của gia súc mỗi 10 phút một lần.",
        timestamp: [5.3, 10.8],
        ipa: "/iːtʃ ˈwɔː.tə.pruːf ˈkɒl.ər kənˈteɪnz ˌbaɪ.əʊˈmet.rɪk ˈsen.səz ðæt ˈmɒn.ɪ.tər ˈkæt.əl ˈbɒd.i ˈtem.prə.tʃər ænd ˈmuːv.mənt ækˈtɪv.ə.ti ˈev.ri ten ˈmɪn.ɪts/"
      },
      {
        id: 3,
        speaker: "Agritech Solutions Director",
        text: "If an animal shows early signs of illness or stress, an automated alert is transmitted directly to the farmer's smartphone.",
        translation: "Nếu một con vật có dấu hiệu bị bệnh hoặc căng thẳng sớm, một cảnh báo tự động sẽ được truyền trực tiếp đến điện thoại thông minh của người nông dân.",
        timestamp: [10.8, 16.1],
        ipa: "/ɪf æn ˈæn.ɪ.məl ʃəʊz ˈɜː.li saɪnz əv ˈɪl.nəs ɔːr stres æn ˈɔː.tə.meɪ.tɪd əˈlɜːt ɪz trænzˈmɪt.ɪd dɪˈrekt.li tuː ðə ˈfɑː.məz ˈsmɑːt.fəʊn/"
      },
      {
        id: 4,
        speaker: "Agritech Solutions Director",
        text: "Field tests demonstrated that early health intervention reduced herd medical treatment costs by thirty percent.",
        translation: "Các đợt kiểm thử thực địa đã chứng minh rằng việc can thiệp sức khỏe sớm đã làm giảm 30% chi phí điều trị y tế cho toàn đàn.",
        timestamp: [16.1, 23.0],
        ipa: "/fiːld tests ˈdem.ən.streɪ.tɪd ðæt ˈɜː.li helθ ˌɪn.təˈven.ʃən rɪˈdjuːst hɜːd ˈmed.ɪ.kəl ˈtriːt.mənt kɒsts baɪ ˈθɜː.ti pəˈsent/"
      }
    ],
    vocabList: [
      {
        word: "livestock",
        ipa: "/ˈlaɪv.stɑːk/",
        pos: "Noun",
        meaning: "Vật nuôi gia súc (bò, cừu)",
        detailMeaning: "Gia súc nuôi tại trang trại quy mô lớn.",
        collocations: ["livestock collar", "livestock health"],
        example: "Wearable IoT sensors monitor livestock vital signs around the clock."
      },
      {
        word: "biometric sensor",
        ipa: "/ˌbaɪ.oʊˈmet.rɪk ˈsen.sɚ/",
        pos: "Noun",
        meaning: "Cảm biến sinh trắc học",
        detailMeaning: "Cảm biến đeo cổ theo dõi nhịp tim và nhiệt độ động vật.",
        collocations: ["waterproof sensor", "biometric tracking"],
        example: "Smart collars contain biometric sensors that record body temperature."
      },
      {
        word: "herd",
        ipa: "/hɝːd/",
        pos: "Noun",
        meaning: "Đàn gia súc",
        detailMeaning: "Tập hợp hàng trăm con bò trong nông trại thông minh.",
        collocations: ["entire herd", "herd health"],
        example: "The software tracks the daily movement patterns of the entire herd."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Tính năng Giám sát: allows farmers to track [N/NP] in real time",
        explanation: "Giải thích ứng dụng IoT theo dõi sức khỏe vật nuôi.",
        example: "The dashboard allows farmers to track animal health in real time.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Tự động Phát hiện Dấu hiệu: when body temperature exceeds [Threshold], an alert is sent",
        explanation: "Cảnh báo tự động gửi về điện thoại người quản lý.",
        example: "An alert is sent when abnormal vitals are detected.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_092",
    title: "Luxury Beach Resort Grand Opening & VIP Amenities",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Resort General Manager",
        text: "Good morning travel partners, I am thrilled to present our newest luxury property, the Azure Beach Resort.",
        translation: "Chào buổi sáng các đối tác du lịch, tôi rất vui mừng được giới thiệu bất động sản nghỉ dưỡng cao cấp mới nhất của chúng tôi, Azure Beach Resort.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈtræv.əl ˈpɑːt.nəz aɪ æm θrɪld tuː prɪˈzent ˈaʊər ˈnjuː.ɪst ˈlʌk.ʃər.i ˈprɒp.ə.ti ðɪ ˈæʒ.ər biːtʃ rɪˈzɔːt/"
      },
      {
        id: 2,
        speaker: "Resort General Manager",
        text: "Situated on fifty acres of coastline, the resort features sixty private villas, an infinity pool, and a world-class spa.",
        translation: "Nằm trên 50 mẫu Anh bờ biển, khu nghỉ dưỡng có 60 biệt thự riêng tư, một hồ bơi vô cực và một spa đẳng cấp thế giới.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈsɪtʃ.u.eɪ.tɪd ɒn ˈfɪf.ti ˈeɪ.kəz əv ˈkəʊst.laɪn ðə rɪˈzɔːt ˈfiː.tʃəz ˈsɪks.ti ˈpraɪ.vət ˈvɪl.əz æn ɪnˈfɪn.ə.ti puːl ænd ə wɜːld-klɑːs spɑː/"
      },
      {
        id: 3,
        speaker: "Resort General Manager",
        text: "Our official grand opening celebration is scheduled for November 15th, followed by full operational booking access.",
        translation: "Lễ khai trương chính thức của chúng tôi được lên lịch vào ngày 15 tháng 11, tiếp theo là việc mở cổng đặt phòng vận hành toàn diện.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈaʊər əˈfɪʃ.əl ɡrænd ˈəʊ.pən.ɪŋ ˌsel.ɪˈbreɪ.ʃən ɪz ˈʃed.juːld fɔːr nəʊˈvem.bər ˌfɪfˈtiːnθ ˈfɒl.əʊd baɪ fʊl ˌɒp.ərˈeɪ.ʃən.əl ˈbʊk.ɪŋ ˈæk.ses/"
      },
      {
        id: 4,
        speaker: "Resort General Manager",
        text: "Travel agents who register guest bookings before October 30th will receive an additional five percent commission bonus.",
        translation: "Các đại lý du lịch đăng ký đặt phòng cho khách trước ngày 30 tháng 10 sẽ nhận được thêm 5% tiền thưởng hoa hồng.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈtræv.əl ˈeɪ.dʒənts huː ˈredʒ.ɪ.stər ɡest ˈbʊk.ɪŋz bɪˈfɔː ɒkˈtəʊ.bər ˈθɜː.ti.əθ wɪl rɪˈsiːv æn əˈdɪʃ.ən.əl faɪv pəˈsent kəˈmɪʃ.ən ˈbəʊ.nəs/"
      }
    ],
    vocabList: [
      {
        word: "beachfront villa",
        ipa: "/ˈbiːtʃ.frʌnt ˈvɪl.ə/",
        pos: "Noun",
        meaning: "Biệt thự sát biển nghỉ dưỡng",
        detailMeaning: "Khu nhà biệt thự riêng tư nằm ngay sát bờ biển.",
        collocations: ["luxury beachfront", "private villa"],
        example: "The resort features fifty luxury beachfront villas with private pools."
      },
      {
        word: "grand opening",
        ipa: "/ɡrænd ˈəʊ.pən.ɪŋ/",
        pos: "Noun",
        meaning: "Lễ khai trương trọng thể",
        detailMeaning: "Sự kiện khánh thành bắt đầu đón khách thương mại.",
        collocations: ["grand opening celebration", "official grand opening"],
        example: "The official grand opening is scheduled for November 15th."
      },
      {
        word: "commission bonus",
        ipa: "/kəˈmɪʃ.ən ˈboʊ.nəs/",
        pos: "Noun",
        meaning: "Thưởng hoa hồng đại lý",
        detailMeaning: "Tăng 5% phần trăm thưởng cho đối tác lữ hành.",
        collocations: ["five percent bonus", "receive commission"],
        example: "Travel agents earn extra commission bonuses during launch month."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Tuyên bố Khai trương: is officially scheduled to open on + Date",
        explanation: "Thông báo sự kiện khánh thành dự án du lịch.",
        example: "The luxury hotel is officially scheduled to open on December 1st.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Diễn tả Ưu đãi Đặt chỗ: guests who book before [Date] will receive + Noun",
        explanation: "Khuyến mại hoa hồng cho đối tác du lịch.",
        example: "Guests who book before Friday will receive complimentary spa vouchers.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_091",
    title: "Food Supply Chain Traceability & QR Code Tracking",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1615865417236-d67f57a3e6f9?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Supply Chain Quality Assurance Director",
        text: "Attention retail operations partners, here is an update on our farm-to-table food safety tracking initiative.",
        translation: "Xin chú ý các đối tác vận hành bán lẻ, đây là thông báo cập nhật về sáng kiến theo dõi an toàn thực phẩm từ trang trại đến bàn ăn của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ˈriː.teɪl ˌɒp.ərˈeɪ.ʃənz ˈpɑːt.nəz hɪər ɪz æn ʌpˈdeɪt ɒn ˈaʊər fɑːm-tuː-ˈteɪ.bəl fuːd ˈseɪf.ti ˈtræk.ɪŋ ɪˈnɪʃ.ə.tɪv/"
      },
      {
        id: 2,
        speaker: "Supply Chain Quality Assurance Director",
        text: "All fresh organic produce containers leaving our distribution centers now display a unique tracking QR code.",
        translation: "Tất cả các thùng nông sản hữu cơ tươi xuất kho khỏi các trung tâm phân phối của chúng ta giờ đây đều hiển thị một mã QR truy xuất độc nhất.",
        timestamp: [5.3, 10.8],
        ipa: "/ɔːl freʃ ɔːˈɡæn.ɪk ˈprɒd.juːs kənˈteɪ.nəz ˈliːv.ɪŋ ˈaʊər ˌdɪs.trɪˈbjuː.ʃən ˈsen.təz naʊ dɪˈspleɪ ə juːˈniːk ˈtræk.ɪŋ kjuː-ɑː kəʊd/"
      },
      {
        id: 3,
        speaker: "Supply Chain Quality Assurance Director",
        text: "Consumers can scan the code with their smartphones to view origin farm details, harvest dates, and temperature logs.",
        translation: "Người tiêu dùng có thể quét mã bằng điện thoại thông minh để xem chi tiết trang trại xuất xứ, ngày thu hoạch và nhật ký nhiệt độ.",
        timestamp: [10.8, 16.1],
        ipa: "/kənˈsjuː.məz kæn skæn ðə kəʊd wɪð ðeər ˈsmɑːt.fəʊnz tuː vjuː ˈɒr.ɪ.dʒɪn fɑːm ˈdiː.teɪlz ˈhɑː.vɪst deɪts ænd ˈtem.prə.tʃər lɒɡz/"
      },
      {
        id: 4,
        speaker: "Supply Chain Quality Assurance Director",
        text: "This digital traceability system has reduced inventory verification times at receiving docks by forty percent.",
        translation: "Hệ thống truy xuất nguồn gốc kỹ thuật số này đã giảm 40% thời gian xác minh hàng tồn kho tại các cầu cảng tiếp nhận.",
        timestamp: [16.1, 23.0],
        ipa: "/ðɪs ˈdɪdʒ.ɪ.təl ˌtreɪ.səˈbɪl.ə.ti ˈsɪs.təm hæz rɪˈdjuːst ˈɪn.vən.tər.i ˌver.ɪ.fɪˈkeɪ.ʃən taɪmz æt rɪˈsiːv.ɪŋ dɒks baɪ ˈfɔː.ti pəˈsent/"
      }
    ],
    vocabList: [
      {
        word: "traceability",
        ipa: "/ˌtreɪ.səˈbɪl.ə.t̬i/",
        pos: "Noun",
        meaning: "Khả năng truy xuất nguồn gốc",
        detailMeaning: "Theo dõi quy trình từ nông trại đến siêu thị bán lẻ.",
        collocations: ["food traceability", "digital traceability"],
        example: "QR codes provide complete farm-to-table food supply chain traceability."
      },
      {
        word: "distribution center",
        ipa: "/ˌdɪs.trɪˈbjuː.ʃən ˈsen.t̬ɚ/",
        pos: "Noun",
        meaning: "Trung tâm phân phối hàng hóa",
        detailMeaning: "Kho tổng trung chuyển hàng nông sản tươi.",
        collocations: ["leave distribution center", "regional center"],
        example: "Produce shipments are inspected before leaving the distribution center."
      },
      {
        word: "verification",
        ipa: "/ˌver.ə.fəˈkeɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự đối soát, xác minh",
        detailMeaning: "Quét mã đối soát thông tin lô hàng nhập kho.",
        collocations: ["inventory verification", "verification time"],
        example: "The digital system speeds up inventory verification at receiving docks."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Công nghệ Truy xuất: allows consumers to scan [N/NP] to verify + Noun",
        explanation: "Giải thích tính năng quét mã QR kiểm tra nông sản.",
        example: "Scanning the QR code allows buyers to verify organic origin.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Bị động Yêu cầu In Mã: all food packaging is required to display + Noun",
        explanation: "Quy định dán tem truy xuất nguồn gốc.",
        example: "All meat products are required to display origin tracking barcodes.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_090",
    title: "EdTech Learning Management System & Interactive Modules",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "EdTech Product Director",
        text: "Hello instructional designers, I want to highlight the performance results of our upgraded learning platform.",
        translation: "Xin chào các nhà thiết kế chương trình học, tôi muốn điểm qua kết quả hiệu năng của nền tảng học tập nâng cấp của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/həˈləʊ ɪnˈstrʌk.ʃən.əl dɪˈzaɪ.nəz aɪ wɒnt tuː ˈhaɪ.laɪt ðə pəˈfɔː.məns rɪˈzʌlts əv ˈaʊər ʌpˈɡreɪ.dɪd ˈlɜːn.ɪŋ ˈplæt.fɔːm/"
      },
      {
        id: 2,
        speaker: "EdTech Product Director",
        text: "Following the integration of interactive video modules, overall student course completion rates rose by twenty-two percent.",
        translation: "Sau khi tích hợp các học phần video tương tác, tỷ lệ hoàn thành khóa học tổng thể của học viên đã tăng 22%.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈfɒl.əʊ.ɪŋ ðɪ ˌɪn.tɪˈɡreɪ.ʃən əv ˌɪn.tərˈæk.tɪv ˈvɪd.i.əʊ ˈmɒd.juːlz ˌəʊ.vərˈɔːl ˈstjuː.dənt kɔːs kəmˈpliː.ʃən reɪts rəʊz baɪ ˈtwen.ti-tuː pəˈsent/"
      },
      {
        id: 3,
        speaker: "EdTech Product Director",
        text: "Furthermore, our new AI dashboard allows instructors to identify struggling students early and send automated study reminders.",
        translation: "Hơn nữa, bảng điều khiển AI mới của chúng ta cho phép các giảng viên phát hiện sớm học viên gặp khó khăn và gửi nhắc nhở học tập tự động.",
        timestamp: [10.8, 16.1],
        ipa: "/ˌfɜː.ðəˈmɔːr ˈaʊər njuː eɪ-aɪ ˈdæʃ.bɔːd əˈlaʊz ɪnˈstrʌk.təz tuː aɪˈden.tɪ.faɪ ˈstrʌɡ.lɪŋ ˈstjuː.dənts ˈɜː.li ænd send ˈɔː.tə.meɪ.tɪd ˈstʌd.i rɪˈmaɪn.dəz/"
      },
      {
        id: 4,
        speaker: "EdTech Product Director",
        text: "We will deploy the new mobile offline learning feature across all iOS and Android devices by the end of July.",
        translation: "Chúng ta sẽ triển khai tính năng học ngoại tuyến trên di động mới trên tất cả thiết bị iOS và Android trước cuối tháng 7.",
        timestamp: [16.1, 23.0],
        ipa: "/wiː wɪl dɪˈplɔɪ ðə njuː ˈməʊ.baɪl ɒfˈlaɪn ˈlɜːn.ɪŋ ˈfiː.tʃər əˈkrɒs ɔːl aɪ-əʊ-es ænd ˈæn.drɔɪd dɪˈvaɪs.ɪz baɪ ðɪ end əv dʒuːˈlaɪ/"
      }
    ],
    vocabList: [
      {
        word: "Learning Management System",
        ipa: "/ˈlɝː.nɪŋ ˈmæn.ədʒ.mənt ˈsɪs.təm/",
        pos: "Noun (LMS)",
        meaning: "Hệ thống quản lý học tập",
        detailMeaning: "Phần mềm quản lý bài giảng và tiến độ học sinh.",
        collocations: ["online LMS platform", "LMS analytics"],
        example: "Teachers track student progress using the online LMS portal."
      },
      {
        word: "completion rate",
        ipa: "/kəmˈpliː.ʃən reɪt/",
        pos: "Noun",
        meaning: "Tỷ lệ hoàn thành khóa học",
        detailMeaning: "Số lượng học viên học xong 100% học phần.",
        collocations: ["course completion rate", "boost completion"],
        example: "Interactive video quizzes improve course completion rates."
      },
      {
        word: "analytics",
        ipa: "/ˌæn.əlˈɪt.ɪks/",
        pos: "Noun",
        meaning: "Dữ liệu phân tích học tập",
        detailMeaning: "Số liệu báo cáo thời lượng học và điểm số.",
        collocations: ["learning analytics", "AI analytics"],
        example: "Course analytics show where students spend the most study time."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Tính năng Mới: the platform now offers [N/NP] allowing users to + V-bare",
        explanation: "Mô tả trải nghiệm học tập ứng dụng EdTech.",
        example: "The LMS offers video tools allowing students to practice speaking.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Bị động Chỉ Tiến độ: new content modules have been uploaded to + Location",
        explanation: "Cập nhật tài liệu giảng dạy trên cổng học trực tuyến.",
        example: "Updated practice tests have been uploaded to the student portal.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_089",
    title: "Nuclear Power Plant Radiation Safety & Inspection",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Nuclear Safety Director",
        text: "Attention all plant personnel, this is a safety announcement from the Health Physics and Safety Office.",
        translation: "Xin chú ý toàn thể nhân viên nhà máy, đây là thông báo an toàn từ Văn phòng An toàn Bức xạ Y tế.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ɔːl plɑːnt ˌpɜː.sənˈel ðɪs ɪz ə ˈseɪf.ti əˈnaʊns.mənt frəm ðə helθ ˈfɪz.ɪks ænd ˈseɪf.ti ˈɒf.ɪs/"
      },
      {
        id: 2,
        speaker: "Nuclear Safety Director",
        text: "Annual containment vessel integrity testing and radiation sensor calibrations were successfully completed this morning.",
        translation: "Việc kiểm tra tính toàn vẹn của vỏ bọc an toàn và hiệu chuẩn cảm biến bức xạ hàng năm đã hoàn thành thành công vào sáng nay.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈæn.ju.əl kənˈteɪn.mənt ˈves.əl ɪnˈteɡ.rə.ti ˈtest.ɪŋ ænd ˌreɪ.diˈeɪ.ʃən ˈsen.sər ˌkæl.ɪˈbreɪ.ʃənz wɜː səkˈses.fəl.i kəmˈpliː.tɪd ðɪs ˈmɔː.nɪŋ/"
      },
      {
        id: 3,
        speaker: "Nuclear Safety Director",
        text: "All environmental radiation readings across Reactors 1 and 2 remain well below federal safety thresholds.",
        translation: "Tất cả các chỉ số bức xạ môi trường tại Lò phản ứng 1 và 2 đều nằm dưới mức ngưỡng an toàn của liên bang.",
        timestamp: [10.8, 16.1],
        ipa: "/ɔːl ɪnˌvaɪ.rənˈmen.təl ˌreɪ.diˈeɪ.ʃən ˈriː.dɪŋz əˈkrɒs riˈæk.təz wʌn ænd tuː rɪˈmeɪn wel bɪˈləʊ ˈfed.ər.əl ˈseɪf.ti ˈθreʃ.həʊldz/"
      },
      {
        id: 4,
        speaker: "Nuclear Safety Director",
        text: "Technicians entering Reactor Building B are reminded to scan their electronic dosimeter badges at the airlock exit.",
        translation: "Các kỹ thuật viên đi vào Nhà lò phản ứng B được nhắc nhở quét thẻ đo liều lượng bức xạ điện tử tại cửa xả khí.",
        timestamp: [16.1, 23.0],
        ipa: "/tekˈnɪʃ.ənz ˈen.tr.ɪŋ riˈæk.tər ˈbɪl.dɪŋ biː ɑːr rɪˈmaɪn.dɪd tuː skæn ðeər ˌɪl.ekˈtrɒn.ɪk dəʊˈsɪm.ɪ.tər bædʒ.ɪz æt ðɪ ˈeə.lɒk ˈek.sɪt/"
      }
    ],
    vocabList: [
      {
        word: "radiation",
        ipa: "/ˌreɪ.diˈeɪ.ʃən/",
        pos: "Noun",
        meaning: "Bức xạ, phóng xạ hạt nhân",
        detailMeaning: "Số liệu đo đạc chỉ số an toàn tại lò phản ứng.",
        collocations: ["radiation level", "background radiation"],
        example: "Automated sensors continuously monitor background radiation levels."
      },
      {
        word: "containment vessel",
        ipa: "/kənˈteɪn.mənt ˈves.əl/",
        pos: "Noun",
        meaning: "Vỏ bọc an toàn lò phản ứng",
        detailMeaning: "Khối bê tông bảo vệ lõi lò phản ứng hạt nhân.",
        collocations: ["vessel integrity", "containment structure"],
        example: "Engineers inspected the integrity of the concrete containment vessel."
      },
      {
        word: "dosimeter",
        ipa: "/doʊˈsɪm.ə.t̬ɚ/",
        pos: "Noun",
        meaning: "Thẻ đo liều lượng bức xạ",
        detailMeaning: "Thiết bị đeo cá nhân đo tích tụ bức xạ kỹ thuật viên.",
        collocations: ["dosimeter badge", "scan dosimeter"],
        example: "Technicians must wear dosimeter badges in active zones."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Thì Hiện tại Hoàn thành: routine radiation checks have been conducted by + Noun",
        explanation: "Báo cáo kiểm định an toàn bức xạ định kỳ.",
        example: "Containment inspections have been conducted by federal authorities.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Mệnh lệnh An toàn: all technical staff must wear + Noun",
        explanation: "Yêu cầu đo đạc mức nhiễm xạ cá nhân.",
        example: "Technicians must wear dosimeter badges in active zones.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_088",
    title: "Cross-Border E-Commerce & Overseas Customs Duties",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67daf4005a?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Cross-Border Logistics Lead",
        text: "Attention international operations team, here is a briefing on our cross-border retail shipping integration.",
        translation: "Xin chú ý đội ngũ vận hành quốc tế, đây là buổi phổ biến thông tin về việc tích hợp vận chuyển bán lẻ xuyên biên giới của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ˌɪn.təˈnæʃ.ən.əl ˌɒp.ərˈeɪ.ʃənz tiːm hɪər ɪz ə ˈbriː.fɪŋ ɒn ˈaʊər krɒs-ˈbɔː.dər ˈriː.teɪl ˈʃɪp.ɪŋ ˌɪn.tɪˈɡreɪ.ʃən/"
      },
      {
        id: 2,
        speaker: "Cross-Border Logistics Lead",
        text: "We have updated our online checkout engine to calculate real-time foreign customs duties and import taxes automatically.",
        translation: "Chúng ta đã cập nhật công cụ thanh toán trực tuyến để tự động tính toán thuế hải quan và thuế nhập khẩu nước ngoài theo thời gian thực.",
        timestamp: [5.3, 10.8],
        ipa: "/wiː hæv ʌpˈdeɪ.tɪd ˈaʊər ˈɒn.laɪn ˈtʃek.aʊt ˈen.dʒɪn tuː ˈkæl.kjə.leɪt rɪəl-taɪm ˈfɒr.ən ˈkʌs.təmz ˈdjuː.tiz ænd ˈɪm.pɔːt tæk.sɪz ˌɔː.təˈmæt.ɪk.li/"
      },
      {
        id: 3,
        speaker: "Cross-Border Logistics Lead",
        text: "Customers can now choose Delivered Duty Paid options, eliminating unexpected tax collection fees upon package arrival.",
        translation: "Khách hàng giờ đây có thể chọn tùy chọn \"Đã trả thuế khi giao hàng\", loại bỏ các khoản phí thu thuế bất ngờ khi kiện hàng đến nơi.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈkʌs.tə.məz kæn naʊ tʃuːz dɪˈlɪv.əd ˈdjuː.ti peɪd ˈɒp.ʃənz ɪˈlɪm.ɪ.neɪt.ɪŋ ˌʌn.ɪkˈspek.tɪd tæks kəˈlek.ʃən fiːz əˈpɒn ˈpæk.ɪdʒ əˈraɪ.vəl/"
      },
      {
        id: 4,
        speaker: "Cross-Border Logistics Lead",
        text: "This automated clearance feature is expected to reduce overseas package return rates by thirty-five percent.",
        translation: "Tính năng thông quan tự động này dự kiến sẽ giảm tỷ lệ trả lại hàng từ nước ngoài 35%.",
        timestamp: [16.1, 23.0],
        ipa: "/ðɪs ˈɔː.tə.meɪ.tɪd ˈklɪər.əns ˈfiː.tʃər ɪz ɪkˈspek.tɪd tuː rɪˈdjuːs ˌəʊ.vəˈsiːz ˈpæk.ɪdʒ rɪˈtɜːn reɪts baɪ ˈθɜː.ti-faɪv pəˈsent/"
      }
    ],
    vocabList: [
      {
        word: "cross-border",
        ipa: "/krɑːs ˈbɔːr.dɚ/",
        pos: "Adj",
        meaning: "Xuyên biên giới",
        detailMeaning: "Thương mại giao dịch bán lẻ giữa các quốc gia.",
        collocations: ["cross-border e-commerce", "cross-border trade"],
        example: "Cross-border e-commerce sales expanded rapidly across Asian markets."
      },
      {
        word: "customs duty",
        ipa: "/ˈkʌs.təmz ˈduː.ti/",
        pos: "Noun",
        meaning: "Thuế hải quan nhập khẩu",
        detailMeaning: "Thuế áp lên hàng bưu phẩm mua từ nước ngoài.",
        collocations: ["calculate customs duty", "import duty"],
        example: "Calculating accurate customs duty upfront speeds up package clearance."
      },
      {
        word: "Delivered Duty Paid",
        ipa: "/dɪˈlɪv.ɚd ˈduː.ti peɪd/",
        pos: "Noun (DDP)",
        meaning: "Đã trả thuế khi giao hàng",
        detailMeaning: "Điều khoản người bán chịu toàn bộ phí thuế hải quan.",
        collocations: ["DDP shipping", "DDP option"],
        example: "Choosing DDP shipping guarantees no surprise fees at delivery."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Tự động hóa Chi phí: duties will be calculated automatically at + Noun",
        explanation: "Tự động tính thuế xuất nhập khẩu khi đặt hàng.",
        example: "Import taxes will be calculated automatically at checkout.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Yêu cầu Khai báo: importers are required to declare + Noun",
        explanation: "Quy định khai báo hải quan quốc tế.",
        example: "Retailers are required to declare package contents accurately.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_087",
    title: "Intellectual Property Patent Filing & Trademark Protection",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "IP Legal Counsel",
        text: "Good morning executive board, I have an important update regarding our international intellectual property portfolio.",
        translation: "Chào buổi sáng ban điều hành, tôi có một thông báo cập nhật quan trọng liên quan đến danh mục sở hữu trí tuệ quốc tế của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ɪɡˈzek.jə.tɪv bɔːd aɪ hæv æn ɪmˈpɔː.tənt ʌpˈdeɪt rɪˈɡɑː.dɪŋ ˈaʊər ˌɪn.təˈnæʃ.ən.əl ˌɪn.təlˈek.tʃu.əl ˈprɒp.ə.ti pɔːtˈfəʊ.li.əʊ/"
      },
      {
        id: 2,
        speaker: "IP Legal Counsel",
        text: "Our patent application for the core autonomous driving algorithm was officially approved by the Patent Office yesterday.",
        translation: "Đơn xin cấp bằng sáng chế của chúng ta cho thuật toán lái xe tự động cốt lõi đã được Cơ quan Bằng sáng chế chính thức phê duyệt vào ngày hôm qua.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈaʊər ˈpeɪ.tənt ˌæp.lɪˈkeɪ.ʃən fɔːr ðə kɔː ɔːˈtɒn.ə.məs ˈdraɪv.ɪŋ ˈæl.ɡə.rɪ.ðəm wɒz əˈfɪʃ.əl.i əˈpruːvd baɪ ðə ˈpeɪ.tənt ˈɒf.ɪs ˈjes.tə.deɪ/"
      },
      {
        id: 3,
        speaker: "IP Legal Counsel",
        text: "This global patent protection secures our proprietary technology across twenty-five member countries for twenty years.",
        translation: "Việc bảo hộ bằng sáng chế toàn cầu này đảm bảo công nghệ độc quyền của chúng ta trên 25 quốc gia thành viên trong 20 năm.",
        timestamp: [10.8, 16.1],
        ipa: "/ðɪs ˈɡləʊ.bəl ˈpeɪ.tənt prəˈtek.ʃən sɪˈkjʊəz ˈaʊər prəˈpraɪə.tr.i tekˈnɒl.ə.dʒi əˈkrɒs ˈtwen.ti-faɪv ˈmem.bər ˈkʌn.triz fɔːr ˈtwen.ti jɪəz/"
      },
      {
        id: 4,
        speaker: "IP Legal Counsel",
        text: "Our legal team will now finalize European trademark registrations for our updated product logo next week.",
        translation: "Đội ngũ pháp lý của chúng ta bây giờ sẽ hoàn tất việc đăng ký nhãn hiệu Châu Âu cho logo sản phẩm đã cập nhật vào tuần tới.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈaʊər ˈliː.ɡəl tiːm wɪl naʊ ˈfaɪ.nəl.aɪz ˌjʊə.rəˈpiː.ən ˈtreɪd.mɑːk ˌredʒ.ɪˈstreɪ.ʃənz fɔːr ˈaʊər ʌpˈdeɪ.tɪd ˈprɒd.ʌkt ˈləʊ.ɡəʊ nekst wiːk/"
      }
    ],
    vocabList: [
      {
        word: "patent",
        ipa: "/ˈpæt.ənt/",
        pos: "Noun",
        meaning: "Bằng sáng chế công nghệ",
        detailMeaning: "Quyền sở hữu độc quyền thuật toán phần mềm.",
        collocations: ["patent application", "approve patent"],
        example: "Filing an international patent application protects corporate technological innovations."
      },
      {
        word: "trademark",
        ipa: "/ˈtreɪd.mɑːrk/",
        pos: "Noun",
        meaning: "Nhãn hiệu độc quyền",
        detailMeaning: "Đăng ký thương hiệu nhận diện logo công ty.",
        collocations: ["trademark registration", "product trademark"],
        example: "Registering our brand trademark prevents counterfeit market imitation."
      },
      {
        word: "proprietary technology",
        ipa: "/prəˈpraɪə.tr.i tekˈnɒl.ə.dʒi/",
        pos: "Noun",
        meaning: "Công nghệ độc quyền",
        detailMeaning: "Sở hữu trí tuệ tự phát triển không thể bị sao chép.",
        collocations: ["secure technology", "proprietary algorithm"],
        example: "Our proprietary technology gives us a competitive edge in the market."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Trạng thái Hồ sơ: the patent application has been submitted to + Noun",
        explanation: "Báo cáo tiến độ duyệt bằng sáng chế.",
        example: "The trademark application has been submitted to the international office.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Yêu cầu Rà soát: all engineering designs must be reviewed for + Noun",
        explanation: "Rà soát tính hợp pháp tránh vi phạm bằng sáng chế.",
        example: "All software code must be reviewed for potential patent infringement.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_086",
    title: "Pharma Cold Chain Logistics & Temperature Monitoring",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Pharma Logistics Director",
        text: "Attention warehouse logistics operators, here is an urgent reminder regarding our pharmaceutical cold chain transport shipments.",
        translation: "Xin chú ý các nhà vận hành logistics kho hàng, đây là nhắc nhở khẩn cấp liên quan đến các chuyến hàng vận chuyển chuỗi cung ứng lạnh dược phẩm của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ˈweə.haʊs ləˈdʒɪs.tɪks ˈɒp.ər.eɪ.təz hɪər ɪz æn ˈɜː.dʒənt rɪˈmaɪn.dər rɪˈɡɑː.dɪŋ ˈaʊər ˌfɑː.məˈsjuː.tɪ.kəl kəʊld tʃeɪn ˈtræn.spɔːt ˈʃɪp.mənts/"
      },
      {
        id: 2,
        speaker: "Pharma Logistics Director",
        text: "All temperature-sensitive vaccine shipments must be stored strictly between two and eight degrees Celsius throughout transit.",
        translation: "Tất cả các chuyến hàng vắc-xin nhạy cảm với nhiệt độ phải được bảo quản nghiêm ngặt từ 2 đến 8 độ C trong suốt quá trình vận chuyển.",
        timestamp: [5.3, 10.8],
        ipa: "/ɔːl ˈtem.prə.tʃər-ˈsen.sɪ.tɪv ˈvæk.siːn ˈʃɪp.mənts mʌst biː stɔːd ˈstrɪkt.li bɪˈtwiːn tuː ænd eɪt dɪˈɡriːz ˈsel.si.əs θruːˈaʊt ˈtræn.zɪt/"
      },
      {
        id: 3,
        speaker: "Pharma Logistics Director",
        text: "Refrigerated transport trucks are now fitted with automated IoT sensors that log temperature data every five minutes.",
        translation: "Xe tải vận chuyển làm lạnh hiện đã được trang bị cảm biến IoT tự động ghi lại dữ liệu nhiệt độ mỗi 5 phút một lần.",
        timestamp: [10.8, 16.1],
        ipa: "/rɪˈfrɪdʒ.ər.eɪ.tɪd ˈtræn.spɔːt trʌks ɑːr naʊ ˈfɪt.ɪd wɪð ˈɔː.tə.meɪ.tɪd aɪ-oʊ-tiː ˈsen.səz ðæt lɒɡ ˈtem.prə.tʃər ˈdeɪ.tə ˈev.ri faɪv ˈmɪn.ɪts/"
      },
      {
        id: 4,
        speaker: "Pharma Logistics Director",
        text: "Any shipments showing a temperature deviation exceeding fifteen minutes will be flagged for immediate laboratory inspection.",
        translation: "Bất kỳ chuyến hàng nào có độ lệch nhiệt độ vượt quá 15 phút sẽ bị đánh dấu để kiểm tra phòng thí nghiệm ngay lập tức.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈen.i ˈʃɪp.mənts ˈʃəʊ.ɪŋ ə ˈtem.prə.tʃər ˌdiː.viˈeɪ.ʃən ɪkˈsiːd.ɪŋ ˌfɪfˈtiːn ˈmɪn.ɪts wɪl biː flæɡd fɔːr ɪˈmiː.di.ət ləˈbɒr.ə.tr.i ɪnˈspek.ʃən/"
      }
    ],
    vocabList: [
      {
        word: "cold chain",
        ipa: "/koʊld tʃeɪn/",
        pos: "Noun",
        meaning: "Chuỗi cung ứng lạnh",
        detailMeaning: "Hệ thống bảo quản vắc xin ở nhiệt độ chuẩn liên tục.",
        collocations: ["cold chain transport", "cold chain logistics"],
        example: "Vaccine delivery requires an unbroken cold chain."
      },
      {
        word: "sensor",
        ipa: "/ˈsen.sɚ/",
        pos: "Noun",
        meaning: "Cảm biến đo nhiệt độ",
        detailMeaning: "Cảm biến IoT ghi nhận nhiệt độ thùng xe tự động.",
        collocations: ["IoT sensor", "temperature sensor"],
        example: "Wireless sensors record temperature fluctuations during transit."
      },
      {
        word: "deviation",
        ipa: "/ˌdiː.viˈeɪ.ʃən/",
        pos: "Noun",
        meaning: "Độ lệch so với tiêu chuẩn",
        detailMeaning: "Sự thay đổi nhiệt độ ngoài khoảng 2-8 độ C.",
        collocations: ["temperature deviation", "flag deviation"],
        example: "Any temperature deviation triggers an automated alert."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Yêu cầu Bảo quản: vaccines are required to be kept at + Temperature",
        explanation: "Quy chuẩn nhiệt độ bảo quản sinh phẩm y tế.",
        example: "Vaccines are required to be kept between two and eight degrees Celsius.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Diễn tả Cảnh báo Tự động: if temperature exceeds [Threshold], an alert is transmitted",
        explanation: "Xử lý sự cố lệch nhiệt độ trong vận tải lạnh.",
        example: "An alert is transmitted if cooling fails.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_085",
    title: "Wind Turbine Offshore Farm Expansion & Grid Output",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Renewable Energy Project Manager",
        text: "Good afternoon stakeholders, I am pleased to report on Phase Two of our offshore wind farm installation project.",
        translation: "Chào buổi chiều các bên liên quan, tôi rất vui mừng được báo cáo về Giai đoạn 2 của dự án lắp đặt trang trại điện gió ngoài khơi của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˌɑːf.təˈnuːn ˈsteɪkˌhəʊl.dəz aɪ æm pliːzd tuː rɪˈpɔːt ɒn feɪz tuː əv ˈaʊər ɒfˈʃɔː wɪnd fɑːm ˌɪn.stəˈleɪ.ʃən ˈprɒd.ʒekt/"
      },
      {
        id: 2,
        speaker: "Renewable Energy Project Manager",
        text: "Mechanics successfully erected fifteen new heavy-duty wind turbines off the northern coastline this past month.",
        translation: "Các thợ cơ khí đã dựng thành công 15 tua-bin gió hạng nặng mới ngoài khơi bờ biển phía bắc trong tháng qua.",
        timestamp: [5.3, 10.8],
        ipa: "/mɪˈkæn.ɪks səkˈses.fəl.i ɪˈrek.tɪd ˌfɪfˈtiːn njuː ˈhev.i-ˈdjuː.ti wɪnd ˈtɜː.baɪnz ɒf ðə ˈnɔː.ðən ˈkəʊst.laɪn ðɪs pɑːst mʌnθ/"
      },
      {
        id: 3,
        speaker: "Renewable Energy Project Manager",
        text: "Once high-voltage undersea cables are connected, these turbines will boost our total renewable grid output by thirty percent.",
        translation: "Sau khi các đường cáp ngầm dưới biển cao thế được kết nối, các tua-bin này sẽ tăng tổng sản lượng điện tái tạo hòa lưới của chúng ta lên 30%.",
        timestamp: [10.8, 16.1],
        ipa: "/wʌns haɪ-ˈvəʊl.tɪdʒ ˌʌn.dəˈsiː ˈkeɪ.bəlz ɑːr kəˈnek.tɪd ðiːz ˈtɜː.baɪnz wɪl buːst ˈaʊər ˈtəʊ.təl rɪˈnjuː.ə.bəl ɡrɪd ˈaʊt.pʊt baɪ ˈθɜː.ti pəˈsent/"
      },
      {
        id: 4,
        speaker: "Renewable Energy Project Manager",
        text: "Full commercial operation and energy distribution are scheduled to begin officially on October 1st.",
        translation: "Hoạt động thương mại toàn diện và phân phối năng lượng được lên lịch bắt đầu chính thức vào ngày 1 tháng 10.",
        timestamp: [16.1, 23.0],
        ipa: "/fʊl kəˈmɜː.ʃəl ˌɒp.ərˈeɪ.ʃən ænd ˈen.ə.dʒi ˌdɪs.trɪˈbjuː.ʃən ɑːr ˈʃed.juːld tuː bɪˈɡɪn əˈfɪʃ.əl.i ɒn ɒkˈtəʊ.bər fɜːst/"
      }
    ],
    vocabList: [
      {
        word: "wind turbine",
        ipa: "/wɪnd ˈtɝː.baɪn/",
        pos: "Noun",
        meaning: "Tua-bin điện gió",
        detailMeaning: "Cột tua-bin phát điện ngoài khơi bờ biển.",
        collocations: ["offshore wind turbine", "erect turbine"],
        example: "Modern offshore wind turbines generate clean electricity efficiently."
      },
      {
        word: "grid output",
        ipa: "/ɡrɪd ˈaʊt.pʊt/",
        pos: "Noun",
        meaning: "Sản lượng điện hòa lưới",
        detailMeaning: "Tổng công suất điện sạch cấp vào mạng lưới quốc gia.",
        collocations: ["boost grid output", "renewable output"],
        example: "The wind farm expanded its total power generation capacity."
      },
      {
        word: "undersea cable",
        ipa: "/ˌʌn.dɚˈsiː ˈkeɪ.bəl/",
        pos: "Noun",
        meaning: "Đường cáp ngầm dưới biển",
        detailMeaning: "Cáp dẫn điện từ tua-bin ngoài khơi vào đất liền.",
        collocations: ["high-voltage cable", "undersea cable connection"],
        example: "High-voltage undersea cables transmit power to mainland stations."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Công suất Tăng trưởng: has increased power output by + Percentage",
        explanation: "Báo cáo mức tăng sản lượng điện hòa lưới.",
        example: "The facility increased power output by fifteen percent.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Bị động Tương lai Hoàn thành: will have been connected to + Noun + by [Date]",
        explanation: "Khẳng định mốc hoàn thành hòa lưới tua-bin gió.",
        example: "All offshore turbines will have been connected to the grid by December.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_084",
    title: "Commercial Credit Risk & Borrower Appraisal",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Chief Credit Risk Officer",
        text: "Good morning underwriting committee, I want to review the credit risk assessment for the Apex Logistics loan application.",
        translation: "Chào buổi sáng ủy ban thẩm định, tôi muốn xem xét bản đánh giá rủi ro tín dụng cho đơn xin vay của Apex Logistics.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈʌn.də.raɪt.ɪŋ kəˈmɪt.i aɪ wɒnt tuː rɪˈvjuː ðə ˈkred.ɪt rɪsk əˈses.mənt fɔːr ðɪ ˈeɪ.peks ləˈdʒɪs.tɪks ləʊn ˌæp.lɪˈkeɪ.ʃən/"
      },
      {
        id: 2,
        speaker: "Chief Credit Risk Officer",
        text: "Our financial audit confirmed that the borrower possesses strong liquidity and healthy debt coverage ratios.",
        translation: "Kiểm toán tài chính của chúng tôi xác nhận rằng bên vay sở hữu tính thanh khoản mạnh và tỷ lệ đảm bảo nợ lành mạnh.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈaʊər faɪˈnæn.ʃəl ˈɔː.dɪt kənˈfɜːmd ðæt ðə ˈbɒr.əʊ.ər pəˈzes.ɪz strɒŋ lɪˈkwɪd.ə.ti ænd ˈhel.θi det ˈkʌv.ər.ɪdʒ ˈreɪ.ʃi.əʊz/"
      },
      {
        id: 3,
        speaker: "Chief Credit Risk Officer",
        text: "However, due to recent market fluctuations, we recommend capping the total revolving credit limit at five million dollars.",
        translation: "Tuy nhiên, do những biến động thị trường gần đây, chúng tôi đề xuất khống chế hạn mức tín dụng quay vòng tổng thể ở mức 5 triệu đô la.",
        timestamp: [10.8, 16.1],
        ipa: "/haʊˈev.ər djuː tuː ˈriː.sənt ˈmɑː.kɪt ˌflʌk.tʃuˈeɪ.ʃənz wiː ˌrek.əˈmend ˈkæp.ɪŋ ðə ˈtəʊ.təl rɪˈvɒlv.ɪŋ ˈkred.ɪt ˈmɪl.ɪt æt faɪv ˈmɪl.jən ˈdɒl.əz/"
      },
      {
        id: 4,
        speaker: "Chief Credit Risk Officer",
        text: "Final loan disbursement is conditional upon receiving an updated real estate appraisal for their main warehouse property.",
        translation: "Việc giải ngân khoản vay cuối cùng phụ thuộc vào việc nhận được bản thẩm định bất động sản cập nhật cho tài sản kho chính của họ.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈfaɪ.nəl ləʊn dɪsˈbɜːs.mənt ɪz kənˈdɪʃ.ən.əl əˈpɒn rɪˈsiːv.ɪŋ æn ʌpˈdeɪ.tɪd rɪəl ɪˈsteɪt əˈpreɪ.zəl fɔːr ðeər meɪn ˈweə.haʊs ˈprɒp.ə.ti/"
      }
    ],
    vocabList: [
      {
        word: "appraisal",
        ipa: "/əˈpreɪ.zəl/",
        pos: "Noun",
        meaning: "Sự thẩm định giá trị tài sản",
        detailMeaning: "Đánh giá giá trị bất động sản thế chấp khoản vay.",
        collocations: ["property appraisal", "real estate appraisal"],
        example: "Independent real estate appraisal verified the collateral's market value."
      },
      {
        word: "liquidity",
        ipa: "/lɪˈkwɪd.ə.t̬i/",
        pos: "Noun",
        meaning: "Tính thanh khoản tài chính",
        detailMeaning: "Khả năng chuyển đổi tài sản thành tiền mặt trả nợ.",
        collocations: ["strong liquidity", "maintain liquidity"],
        example: "The company maintained high liquidity to cover short-term debt obligations."
      },
      {
        word: "disbursement",
        ipa: "/dɪsˈbɝːs.mənt/",
        pos: "Noun",
        meaning: "Sự giải ngân tiền vay",
        detailMeaning: "Chuyển tiền vay ngân hàng vào tài khoản doanh nghiệp.",
        collocations: ["loan disbursement", "conditional disbursement"],
        example: "Loan disbursement will proceed after receiving all required documents."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Phê duyệt vay: the loan application was approved subject to + Noun",
        explanation: "Điều kiện phê duyệt cấp vốn doanh nghiệp.",
        example: "The commercial loan was approved subject to personal guarantees.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Diễn tả Khả năng Tài chính: demonstrate adequate cash flow to service + Noun",
        explanation: "Đánh giá dòng tiền trả nợ ngân hàng.",
        example: "Borrowers must demonstrate cash flow to service monthly interest payments.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_083",
    title: "Media Production Schedule & Location Shooting Permits",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Film Production Manager",
        text: "Attention production crew, here is our filming schedule update for scene twelve at City Hall Park.",
        translation: "Xin chú ý toàn thể đoàn làm phim, đây là bản cập nhật lịch quay cho cảnh số 12 tại Công viên Tòa thị chính.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən prəˈdʌk.ʃən kruː hɪər ɪz ˈaʊər ˈfɪlm.ɪŋ ˈʃed.juːl ʌpˈdeɪt fɔːr siːn twelv æt ˈsɪt.i hɔːl pɑːk/"
      },
      {
        id: 2,
        speaker: "Film Production Manager",
        text: "City officials have officially granted our municipal filming permits for Thursday and Friday morning.",
        translation: "Các quan chức thành phố đã chính thức cấp giấy phép quay phim của thành phố cho sáng Thứ Năm và Thứ Sáu.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈsɪt.i əˈfɪʃ.əlz hæv əˈfɪʃ.əl.i ˈɡrɑːn.tɪd ˈaʊər mjuːˈnɪs.ɪ.pəl ˈfɪlm.ɪŋ ˈpɜː.mɪts fɔːr ˈθɜːz.deɪ ænd ˈfraɪ.deɪ ˈmɔː.nɪŋ/"
      },
      {
        id: 3,
        speaker: "Film Production Manager",
        text: "To take advantage of natural morning lighting, all camera setups and sound equipment must be ready by 6 AM.",
        translation: "Để tận dụng ánh sáng tự nhiên buổi sáng, tất cả việc lắp đặt máy ảnh và thiết bị âm thanh phải sẵn sàng trước 6 giờ sáng.",
        timestamp: [10.8, 16.1],
        ipa: "/tuː teɪk ədˈvɑːn.tɪdʒ əv ˈnætʃ.ər.əl ˈmɔː.nɪŋ ˈlaɪt.ɪŋ ɔːl ˈkæm.rə ˈset.ʌps ænd saʊnd ɪˈkwɪp.mənt mʌst biː ˈred.i baɪ sɪks eɪ-em/"
      },
      {
        id: 4,
        speaker: "Film Production Manager",
        text: "Catering trucks will provide hot breakfast for the cast and crew near the north park entrance starting at 5:15 AM.",
        translation: "Xe phục vụ ăn uống sẽ cung cấp bữa sáng nóng cho diễn viên và đoàn phim gần lối vào phía bắc công viên bắt đầu từ 5:15 sáng.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈkeɪ.tər.ɪŋ trʌks wɪl prəˈvaɪd hɒt ˈbrek.fəst fɔːr ðə kɑːst ænd kruː nɪər ðə nɔːθ pɑːk ˈen.trəns ˈstɑː.tɪŋ æt faɪv-ˌfɪfˈtiːn eɪ-em/"
      }
    ],
    vocabList: [
      {
        word: "permit",
        ipa: "/ˈpɝː.mɪt/",
        pos: "Noun",
        meaning: "Giấy phép quay phim",
        detailMeaning: "Giấy phép cấp từ chính quyền cho phép ghi hình ngoại cảnh.",
        collocations: ["filming permit", "municipal permit"],
        example: "The crew secured municipal permits for shooting in the historic district."
      },
      {
        word: "crew",
        ipa: "/kruː/",
        pos: "Noun",
        meaning: "Đoàn làm phim, đội kỹ thuật",
        detailMeaning: "Toàn bộ quay phim và kỹ thuật viên âm thanh.",
        collocations: ["production crew", "camera crew"],
        example: "The camera crew prepared equipment for the morning scene."
      },
      {
        word: "cast",
        ipa: "/kæst/",
        pos: "Noun",
        meaning: "Dàn diễn viên",
        detailMeaning: "Các diễn viên đóng chính và diễn viên quần chúng.",
        collocations: ["cast and crew", "film cast"],
        example: "The director briefed the cast and crew before the first take."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Điều kiện: filming will proceed provided that + Clause",
        explanation: "Điều kiện bấm máy khi có giấy phép thời tiết.",
        example: "Filming will proceed provided that weather permits remain clear.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Yêu cầu Di chuyển Thiết bị: all camera equipment must be packed and moved to + Location",
        explanation: "Chỉ đạo chuẩn bị máy móc hậu cần đoàn phim.",
        example: "All sound gear must be moved to Location B.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_082",
    title: "Aircraft Maintenance Inspection & Flight Safety Standards",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Aviation Maintenance Supervisor",
        text: "Good morning hangar mechanics, here is our briefing on the routine servicing for Boeing Flight 602.",
        translation: "Chào buổi sáng các thợ máy nhà hầm, đây là điểm tin về việc bảo dưỡng định kỳ cho Chuyến bay Boeing 602.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈhæŋ.ər mɪˈkæn.ɪks hɪər ɪz ˈaʊər ˈbriː.fɪŋ ɒn ðə ruːˈtiːn ˈsɜː.vɪs.ɪŋ fɔːr ˈbəʊ.ɪŋ flaɪt sɪks-oʊ-tuː/"
      },
      {
        id: 2,
        speaker: "Aviation Maintenance Supervisor",
        text: "Our avionics team completed the radar sensor check, and all flight control systems are functioning normally.",
        translation: "Đội ngũ điện tử hàng không của chúng ta đã hoàn thành việc kiểm tra cảm biến ra-đa và tất cả các hệ thống điều khiển bay đều hoạt động bình thường.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈaʊər ˌeɪ.viˈɒn.ɪks tiːm kəmˈpliː.tɪd ðə ˈreɪ.dɑː ˈsen.sər tʃek ænd ɔːl flaɪt kənˈtrəʊl ˈsɪs.təmz ɑːr ˈfʌŋk.ʃən.ɪŋ ˈmɔː.məl.i/"
      },
      {
        id: 3,
        speaker: "Aviation Maintenance Supervisor",
        text: "However, we detected a minor hydraulic fluid leak near engine number two that requires immediate seal replacement.",
        translation: "Tuy nhiên, chúng tôi đã phát hiện một điểm rò rỉ dầu thủy lực nhỏ gần động cơ số 2 cần phải thay vòng đệm ngay lập tức.",
        timestamp: [10.8, 16.1],
        ipa: "/haʊˈev.ər wiː dɪˈtek.tɪd ə ˈmaɪ.nər haɪˈdrɔː.lɪk ˈfluː.ɪd liːk nɪər ˈen.dʒɪn ˈnʌm.bər tuː ðæt rɪˈkwaɪəz ɪˈmiː.di.ət siːl rɪˈpleɪs.mənt/"
      },
      {
        id: 4,
        speaker: "Aviation Maintenance Supervisor",
        text: "Final flight clearance will be granted once technicians complete pressure testing by 3 PM.",
        translation: "Cấp phép bay cuối cùng sẽ được trao sau khi các kỹ thuật viên hoàn tất việc kiểm tra áp suất trước 3 giờ chiều.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈfaɪ.nəl flaɪt ˈklɪər.əns wɪl biː ˈɡrɑːn.tɪd wʌns tekˈnɪʃ.ənz kəmˈpliːt ˈpreʃ.ər ˈtest.ɪŋ baɪ θriː piː-em/"
      }
    ],
    vocabList: [
      {
        word: "clearance",
        ipa: "/ˈklɪr.əns/",
        pos: "Noun",
        meaning: "Sự cấp phép cất cánh",
        detailMeaning: "Chữ ký phê duyệt an toàn bay từ thợ máy nhà hầm.",
        collocations: ["flight clearance", "grant clearance"],
        example: "The plane received maintenance clearance for departure."
      },
      {
        word: "hydraulic",
        ipa: "/haɪˈdrɑː.lɪk/",
        pos: "Adj",
        meaning: "Thuộc hệ thống thủy lực",
        detailMeaning: "Dầu áp suất điều khiển cánh máy bay.",
        collocations: ["hydraulic fluid leak", "hydraulic system"],
        example: "Mechanics inspected the aircraft's hydraulic fluid levels."
      },
      {
        word: "avionics",
        ipa: "/ˌeɪ.viˈɑː.nɪks/",
        pos: "Noun",
        meaning: "Điện tử hàng không",
        detailMeaning: "Đội ngũ chuyên trách cảm biến và ra-đa máy bay.",
        collocations: ["avionics team", "avionics check"],
        example: "The avionics technician repaired the faulty altitude sensor."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Thì Hiện tại Hoàn thành: has undergone + Noun",
        explanation: "Thông báo hoàn thành quy trình bảo dưỡng kỹ thuật.",
        example: "Aircraft 402 has undergone a comprehensive safety audit.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Diễn tả Mục đích Kỹ thuật: inspected in order to verify + Noun",
        explanation: "Giải thích quy trình kiểm tra rò rỉ thủy lực.",
        example: "Landing gear was inspected in order to verify structural integrity.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_081",
    title: "MICE International Convention & Catering Setup",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Hotel Event Operations Manager",
        text: "Good morning event staff, here is our operational brief for the International Tech Summit opening today.",
        translation: "Chào buổi sáng nhân viên sự kiện, đây là điểm tin vận hành cho buổi khai mạc Hội nghị Tượng đỉnh Công nghệ Quốc tế hôm nay.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ɪˈvent stɑːf hɪər ɪz ˈaʊər ˌɒp.ərˈeɪ.ʃən.əl briːf fɔːr ðɪ ˌɪn.təˈnæʃ.ən.əl tek ˈsʌm.ɪt ˈəʊ.pən.ɪŋ təˈdeɪ/"
      },
      {
        id: 2,
        speaker: "Hotel Event Operations Manager",
        text: "We are expecting over eight hundred delegates in the Grand Ballroom for the morning opening ceremony at 9 AM.",
        translation: "Chúng ta đang đón tiếp hơn 800 đại biểu tại Phòng đại tiệc cho lễ khai mạc buổi sáng vào lúc 9 giờ sáng.",
        timestamp: [5.3, 10.8],
        ipa: "/wiː ɑːr ɪkˈspekt.ɪŋ ˈəʊ.vər eɪt ˈhʌn.drəd ˈdel.ɪ.ɡəts ɪn ðə ɡrænd ˈbɔːl.ruːm fɔːr ðə ˈmɔː.nɪŋ ˈəʊ.pən.ɪŋ ˈser.ɪ.mə.ni æt naɪn eɪ-em/"
      },
      {
        id: 3,
        speaker: "Hotel Event Operations Manager",
        text: "Following the keynote address, a catered buffet lunch will be served in the adjoining Exhibition Hall from noon.",
        translation: "Sau bài phát biểu chính, tiệc buffet phục vụ tận nơi sẽ được cung cấp tại Nhà Triển lãm kế bên bắt đầu từ giữa trưa.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈfɒl.əʊ.ɪŋ ðə ˈkiː.nəʊt əˈdres ə ˈkeɪ.təd ˈbʊf.eɪ lʌntʃ wɪl biː sɜːvd ɪn ðɪ əˈdʒɔɪn.ɪŋ ˌek.sɪˈbɪʃ.ən hɔːl frəm nuːn/"
      },
      {
        id: 4,
        speaker: "Hotel Event Operations Manager",
        text: "Banqueting staff must ensure all coffee refresh stations are fully restocked during the 10:30 AM mid-morning break.",
        translation: "Nhân viên tiệc phải đảm bảo tất cả các trạm cà phê phục vụ lại được nạp đầy hoàn toàn trong giờ nghỉ giải lao giữa buổi sáng lúc 10:30.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈbæŋ.kwɪt.ɪŋ stɑːf mʌst ɪnˈʃʊər ɔːl ˈkɒf.i rɪˈfreʃ ˈsteɪ.ʃənz ɑːr ˈfʊl.i ˌriːˈstɒkt ˈdjʊə.rɪŋ ðə ten-ˈθɜː.ti eɪ-em mɪd-ˈmɔː.nɪŋ breɪk/"
      }
    ],
    vocabList: [
      {
        word: "delegate",
        ipa: "/ˈdel.ə.ɡət/",
        pos: "Noun",
        meaning: "Đại biểu tham dự hội nghị",
        detailMeaning: "Khách mời quốc tế đăng ký tham dự hội thảo.",
        collocations: ["registered delegate", "international delegates"],
        example: "The annual medical convention attracted two thousand delegates."
      },
      {
        word: "catering setup",
        ipa: "/ˈkeɪ.t̬ɚ.ɪŋ ˈset.ʌp/",
        pos: "Noun",
        meaning: "Sắp xếp tiệc ăn uống",
        detailMeaning: "Chuẩn bị bàn tiệc buffet và tiệc trà nghỉ giải lao.",
        collocations: ["catered buffet", "refresh station"],
        example: "Banquet staff prepared the catering setup in Grand Ballroom A."
      },
      {
        word: "keynote address",
        ipa: "/ˈkiː.noʊt əˈdres/",
        pos: "Noun",
        meaning: "Bài phát biểu chủ đề chính",
        detailMeaning: "Bài nói khai mạc quan trọng nhất của hội nghị.",
        collocations: ["keynote speaker", "deliver keynote address"],
        example: "The CEO delivered an inspiring keynote address at the summit."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Lịch trình Tiệc: buffet lunch will be served in [Location] starting at [Time]",
        explanation: "Thông báo lịch trình ăn uống trong sự kiện.",
        example: "Dinner will be served in the main dining hall starting at 7 PM.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Hướng dẫn Di chuyển: delegates are requested to move to [Location] for [Event]",
        explanation: "Chỉ dẫn đại biểu di chuyển tới sảnh tiệc.",
        example: "Attendees are requested to move to Hall B for the breakout session.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_080",
    title: "Corporate Credit Facility & Line of Credit Renewal",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Corporate Banking Relationship Manager",
        text: "Hello Mr. Sterling, this is Evelyn from Commercial Banking Relationship Services following up on your account.",
        translation: "Xin chào ông Sterling, đây là Evelyn từ Bộ phận Dịch vụ Quan hệ Khách hàng Doanh nghiệp gọi điện theo dõi tài khoản của ông.",
        timestamp: [0, 5.3],
        ipa: "/həˈləʊ ˈmɪs.tər ˈstɜː.lɪŋ ðɪs ɪz ˈev.ə.lɪn frəm kəˈmɜː.ʃəl ˈbæŋk.ɪŋ rɪˈleɪ.ʃən.ʃɪp ˈsɜː.vɪs.ɪz ˈfɒl.əʊ.ɪŋ ʌp ɒn jɔːr əˈkaʊnt/"
      },
      {
        id: 2,
        speaker: "Corporate Banking Relationship Manager",
        text: "I am pleased to inform you that our credit committee has approved the annual renewal of your ten-million-dollar line of credit.",
        translation: "Tôi rất vui được thông báo với ông rằng ủy ban tín dụng của chúng tôi đã phê duyệt việc gia hạn hàng năm cho hạn mức tín dụng 10 triệu đô la của ông.",
        timestamp: [5.3, 10.8],
        ipa: "/aɪ æm pliːzd tuː ɪnˈfɔːm juː ðæt ˈaʊər ˈkred.ɪt kəˈmɪt.i hæz əˈpruːvd ðɪ ˈæn.ju.əl rɪˈnjuː.əl əv jɔːr ten-ˈmɪl.jən-ˈdɒl.ər laɪn əv ˈkred.ɪt/"
      },
      {
        id: 3,
        speaker: "Corporate Banking Relationship Manager",
        text: "Based on your company's strong credit score, we lowered your floating interest rate by twenty-five basis points.",
        translation: "Dựa trên điểm tín dụng tốt của công ty ông, chúng tôi đã giảm lãi suất thả nổi của ông xuống 25 điểm cơ bản.",
        timestamp: [10.8, 16.1],
        ipa: "/beɪst ɒn jɔːr ˈkʌm.pə.niz strɒŋ ˈkred.ɪt skɔː wiː ˈləʊ.əd jɔːr ˈfləʊt.ɪŋ ˈɪn.trɪst reɪt baɪ ˈtwen.ti-faɪv ˈbeɪ.sɪs pɔɪnts/"
      },
      {
        id: 4,
        speaker: "Corporate Banking Relationship Manager",
        text: "Please sign the attached credit renewal agreement and return it to our central office before the end of the month.",
        translation: "Vui lòng ký hợp đồng gia hạn tín dụng đính kèm và gửi lại cho văn phòng trung tâm của chúng tôi trước cuối tháng.",
        timestamp: [16.1, 23.0],
        ipa: "/pliːz saɪn ðɪ əˈtætʃt ˈkred.ɪt rɪˈnjuː.əl əˈɡriː.mənt ænd rɪˈtɜːn ɪt tuː ˈaʊər ˈsen.trəl ˈɒf.ɪs bɪˈfɔː ðɪ end əv ðə mʌnθ/"
      }
    ],
    vocabList: [
      {
        word: "line of credit",
        ipa: "/laɪn əv ˈkred.ɪt/",
        pos: "Noun",
        meaning: "Hạn mức tín dụng doanh nghiệp",
        detailMeaning: "Hạn mức vay vốn lưu động ngân hàng cấp cho công ty.",
        collocations: ["revolving line of credit", "renew credit line"],
        example: "The bank approved an extension on the company's revolving line of credit."
      },
      {
        word: "basis points",
        ipa: "/ˈbeɪ.sɪs pɔɪnts/",
        pos: "Noun",
        meaning: "Điểm cơ bản lãi suất (1 bps = 0.01%)",
        detailMeaning: "Đơn vị đo lường biến động lãi suất ngân hàng.",
        collocations: ["twenty-five basis points", "lower rate by basis points"],
        example: "The central bank reduced interest rates by fifty basis points."
      },
      {
        word: "covenant",
        ipa: "/ˈkʌv.ə.nənt/",
        pos: "Noun",
        meaning: "Điều khoản cam kết tài chính",
        detailMeaning: "Ràng buộc chỉ số nợ trong hợp đồng tín dụng.",
        collocations: ["loan covenant", "financial covenant"],
        example: "Maintaining a healthy debt-to-equity ratio satisfies loan covenants."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Phê duyệt Tín dụng: your application for a credit renewal has been approved by + Noun",
        explanation: "Thông báo kết quả gia hạn tín dụng từ ngân hàng.",
        example: "Your revolving credit line has been approved by the credit committee.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Điều kiện Bắt buộc: terms will take effect upon returning + Noun",
        explanation: "Quy định điều kiện có hiệu lực của hợp đồng vay.",
        example: "New interest rates will take effect upon returning the signed agreement.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_079",
    title: "IT Project Migration & System Downtime Notification",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "IT Infrastructure Manager",
        text: "Good afternoon employees, this is an important technical alert from the IT Infrastructure Department.",
        translation: "Chào buổi chiều toàn thể nhân viên, đây là thông báo kỹ thuật quan trọng từ Bộ phận Hạ tầng CNTT.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˌɑːf.təˈnuːn ɛmˈplɔɪ.iːz ðɪs ɪz æn ɪmˈpɔː.tənt ˈtek.nɪ.kəl əˈlɜːt frəm ðɪ aɪ-tiː ˈɪn.frəˌstrʌk.tʃər dɪˈpɑːt.mənt/"
      },
      {
        id: 2,
        speaker: "IT Infrastructure Manager",
        text: "Our scheduled cloud database migration is set to take place this Saturday from 10 PM until 2 AM.",
        translation: "Việc di dời cơ sở dữ liệu đám mây theo kế hoạch của chúng ta dự kiến diễn ra vào Thứ Bảy tuần này từ 10 giờ đêm đến 2 giờ sáng.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈaʊər ˈʃed.juːld klaʊd ˈdeɪ.tə.beɪs maɪˈɡreɪ.ʃən ɪz set tuː teɪk pleɪs ðɪs ˈsæt.ə.deɪ frəm ten piː-em ənˈtɪl tuː eɪ-em/"
      },
      {
        id: 3,
        speaker: "IT Infrastructure Manager",
        text: "During this four-hour downtime window, internal email and customer database applications will be completely inaccessible.",
        translation: "Trong khung thời gian ngừng hoạt động kéo dài 4 tiếng này, email nội bộ và các ứng dụng cơ sở dữ liệu khách hàng sẽ hoàn toàn không thể truy cập.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈdjʊə.rɪŋ ðɪs fɔːr-ˈaʊər ˈdaʊn.taɪm ˈwɪn.dəʊ ɪnˈtɜː.nəl ˈiː.meɪl ænd ˈkʌs.tə.mər ˈdeɪ.tə.beɪs ˌæp.lɪˈkeɪ.ʃənz wɪl biː kəmˈpliːt.li ˌɪn.ækˈses.ə.bəl/"
      },
      {
        id: 4,
        speaker: "IT Infrastructure Manager",
        text: "All staff are strongly advised to log out of their workstations and save all active files before leaving on Friday.",
        translation: "Tất cả nhân viên được khuyến nghị nên đăng xuất khỏi máy làm việc và lưu tất cả các tệp đang mở trước khi ra về vào Thứ Sáu.",
        timestamp: [16.1, 23.0],
        ipa: "/ɔːl stɑːf ɑːr ˈstrɒŋ.li ədˈvaɪzd tuː lɒɡ aʊt əv ðeər ˈwɜːkˌsteɪ.ʃənz ænd seɪv ɔːl ˈæk.tɪv faɪlz bɪˈfɔː ˈliːv.ɪŋ ɒn ˈfraɪ.deɪ/"
      }
    ],
    vocabList: [
      {
        word: "downtime",
        ipa: "/ˈdaʊn.taɪm/",
        pos: "Noun",
        meaning: "Thời gian máy chủ ngắt kết nối",
        detailMeaning: "Khung thời gian hệ thống tạm ngắt để nâng cấp bảo trì.",
        collocations: ["downtime window", "system downtime"],
        example: "Scheduled server maintenance downtime will last two hours."
      },
      {
        word: "migration",
        ipa: "/maɪˈɡreɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự di chuyển dữ liệu máy chủ",
        detailMeaning: "Chuyển dữ liệu từ server cũ lên đám mây.",
        collocations: ["cloud migration", "database migration"],
        example: "The cloud database migration was completed with zero data loss."
      },
      {
        word: "workstation",
        ipa: "/ˈwɝːkˌsteɪ.ʃən/",
        pos: "Noun",
        meaning: "Máy tính làm việc nhân viên",
        detailMeaning: "Trạm máy tính làm việc cá nhân trong công ty.",
        collocations: ["log out of workstation", "desktop workstation"],
        example: "Please log out of your workstation before leaving the office."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Lịch bảo trì: scheduled maintenance is set to take place between [Time] and [Time]",
        explanation: "Thông báo gián đoạn hệ thống kỹ thuật định kỳ.",
        example: "Network maintenance is set to take place between midnight and 4 AM.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Khuyên bảo Bắt buộc: users are strongly advised to save + Noun + before [Time]",
        explanation: "Nhắc nhở sao lưu và lưu tài liệu trước khi ngắt máy chủ.",
        example: "Users are strongly advised to save all open files before system shutdown.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_078",
    title: "Port Container Unloading & Cargo Crane Operations",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Port Operations Supervisor",
        text: "Attention terminal workers, this is a safety announcement from the Port Authority Operations Center.",
        translation: "Xin chú ý toàn thể công nhân bến cảng, đây là thông báo an toàn từ Trung tâm Vận hành Cảng vụ.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ˈtɜː.mɪ.nəl ˈwɜː.kəz ðɪs ɪz ə ˈseɪf.ti əˈnaʊns.mənt frəm ðə pɔːt ɔːˈθɒr.ə.ti ˌɒp.ərˈeɪ.ʃənz ˈsen.tər/"
      },
      {
        id: 2,
        speaker: "Port Operations Supervisor",
        text: "Heavy ocean fog has significantly reduced visibility across the main shipping channel and container berths.",
        translation: "Sương mù biển dày đặc đã làm giảm đáng kể tầm nhìn trên toàn bộ luồng hàng hải chính và các bến container.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈhev.i ˈəʊ.ʃən fɒɡ hæz sɪɡˈnɪf.ɪ.kənt.li rɪˈdjuːst ˌvɪz.əˈbɪl.ə.ti əˈkrɒs ðə meɪn ˈʃɪp.ɪŋ ˈtʃæn.əl ænd kənˈteɪ.nər bɜːθs/"
      },
      {
        id: 3,
        speaker: "Port Operations Supervisor",
        text: "Consequently, all automated gantry crane operations are temporarily suspended until environmental conditions improve.",
        translation: "Do đó, tất cả các hoạt động cẩu giàn tự động sẽ tạm thời bị đình chỉ cho đến khi điều kiện môi trường cải thiện.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈkɒn.sɪ.kwənt.li ɔːl ˈɔː.tə.meɪ.tɪd ˈɡæn.tri kreɪn ˌɒp.ərˈeɪ.ʃənz ɑːr ˈtem.pər.ər.əl.i səˈspen.dɪd ənˈtɪl ɪnˌvaɪ.rənˈmen.təl kənˈdɪʃ.ənz ɪmˈpruːv/"
      },
      {
        id: 4,
        speaker: "Port Operations Supervisor",
        text: "Truck drivers waiting for container loading are instructed to remain parked in Holding Area B.",
        translation: "Các lái xe tải đang chờ bốc xếp container được chỉ dẫn tiếp tục đỗ tại Khu vực Chờ B.",
        timestamp: [16.1, 23.0],
        ipa: "/trʌk ˈdraɪ.vəz ˈweɪt.ɪŋ fɔːr kənˈteɪ.nər ˈləʊd.ɪŋ ɑːr ɪnˈstrʌkt.ɪd tuː rɪˈmeɪn pɑːkt ɪn ˈhəʊld.ɪŋ ˈeə.ri.ə biː/"
      }
    ],
    vocabList: [
      {
        word: "berth",
        ipa: "/bɜːθ/",
        pos: "Noun",
        meaning: "Bến đậu tàu biển",
        detailMeaning: "Vị trí tàu container neo đậu dỡ hàng tại bến cảng.",
        collocations: ["container berth", "dock at berth"],
        example: "The container vessel docked at Berth 4 early this morning."
      },
      {
        word: "gantry crane",
        ipa: "/ˈɡæn.tri kreɪn/",
        pos: "Noun",
        meaning: "Cần cẩu giàn container",
        detailMeaning: "Hệ thống cẩu công suất lớn nâng container từ tàu lên xe.",
        collocations: ["automated gantry crane", "crane operation"],
        example: "High-speed gantry cranes accelerated container unloading operations."
      },
      {
        word: "visibility",
        ipa: "/ˌvɪz.əˈbɪl.ə.t̬i/",
        pos: "Noun",
        meaning: "Tầm nhìn quan sát",
        detailMeaning: "Tầm nhìn bị hạn chế do sương mù biển dày đặc.",
        collocations: ["reduced visibility", "poor visibility"],
        example: "Dense fog reduced visibility across the harbor to less than fifty meters."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Sự gián đoạn do Thời tiết: crane operations have been temporarily suspended due to + Noun",
        explanation: "Giải thích lý do gián đoạn vận hành bến cảng do sương mù.",
        example: "Port operations have been suspended due to dense fog.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Bị động Thì Tương lai Đơn: unloading will resume once + Clause",
        explanation: "Điều kiện tiếp tục dỡ hàng container.",
        example: "Unloading will resume once wind speeds drop below safety limits.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_077",
    title: "Commercial Office Building Expansion & Parking Facilities",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Property Leasing Director",
        text: "Good morning tenants, I am pleased to share an important update regarding our commercial property development.",
        translation: "Chào buổi sáng các đơn vị thuê, tôi rất vui mừng được chia sẻ một thông báo cập nhật quan trọng liên quan đến việc phát triển bất động sản thương mại của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈten.ənts aɪ æm pliːzd tuː ʃeər æn ɪmˈpɔː.tənt ʌpˈdeɪt rɪˈɡɑː.dɪŋ ˈaʊər kəˈmɜː.ʃəl ˈprɒp.ə.ti dɪˈvel.əp.mənt/"
      },
      {
        id: 2,
        speaker: "Property Leasing Director",
        text: "Construction on the new West Wing expansion is progressing smoothly and remains on schedule for completion in November.",
        translation: "Việc xây dựng khu mở rộng Cánh Tây mới đang diễn ra thuận lợi và vẫn đúng tiến độ để hoàn thành vào tháng 11.",
        timestamp: [5.3, 10.8],
        ipa: "/kənˈstrʌk.ʃən ɒn ðə njuː west wɪŋ ɪkˈspæn.ʃən ɪz prəˈɡres.ɪŋ smuːð.li ænd rɪˈmeɪnz ɒn ˈʃed.juːl fɔːr kəmˈpliː.ʃən ɪn nəʊˈvem.bər/"
      },
      {
        id: 3,
        speaker: "Property Leasing Director",
        text: "To support increased tenant capacity, a two-story underground parking garage will open next month.",
        translation: "Để hỗ trợ sức chứa tăng thêm của người thuê, một bãi đỗ xe ngầm hai tầng sẽ mở cửa vào tháng tới.",
        timestamp: [10.8, 16.1],
        ipa: "/tuː səˈpɔːt ɪnˈkriːst ˈten.ənt kəˈpæs.ə.ti ə tuː-ˈstɔː.ri ˌʌn.dəˈɡraʊnd ˈpɑːk.ɪŋ ˈɡær.ɑːʒ wɪl ˈəʊ.pən nekst mʌnθ/"
      },
      {
        id: 4,
        speaker: "Property Leasing Director",
        text: "Registered business occupants can request monthly parking passes at the building management office starting Monday.",
        translation: "Các doanh nghiệp đã đăng ký thuê có thể yêu cầu thẻ đỗ xe theo tháng tại văn phòng quản lý tòa nhà bắt đầu từ Thứ Hai.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈredʒ.ɪ.stəd ˈbɪz.nɪs ˈɒk.jə.pənts kæn rɪˈkwest ˈmʌnθ.li ˈpɑːk.ɪŋ ˈpɑːs.ɪz æt ðə ˈbɪl.dɪŋ ˈmæn.ɪdʒ.mənt ˈɒf.ɪs ˈstɑːt.ɪŋ ˈmʌn.deɪ/"
      }
    ],
    vocabList: [
      {
        word: "expansion",
        ipa: "/ɪkˈspæn.ʃən/",
        pos: "Noun",
        meaning: "Sự mở rộng diện tích tòa nhà",
        detailMeaning: "Xây dựng thêm khu nhà mới để tăng chỗ làm việc.",
        collocations: ["building expansion", "West Wing expansion"],
        example: "The commercial office building expansion will double available desk capacity."
      },
      {
        word: "underground parking",
        ipa: "/ˌʌn.dɚˈɡraʊnd ˈpɑːr.kɪŋ/",
        pos: "Noun",
        meaning: "Bãi đỗ xe ngầm",
        detailMeaning: "Hầm để xe nhiều tầng dành cho nhân viên tòa nhà.",
        collocations: ["underground parking garage", "parking pass"],
        example: "The multi-level underground parking facility accommodates five hundred vehicles."
      },
      {
        word: "occupant",
        ipa: "/ˈɑː.kjə.pənt/",
        pos: "Noun",
        meaning: "Người/doanh nghiệp thuê diện tích",
        detailMeaning: "Các đơn vị công ty đăng ký hoạt động trong tòa nhà.",
        collocations: ["business occupant", "building occupant"],
        example: "Registered business occupants can request monthly parking passes starting Monday."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Thì Tương lai Đơn: will be constructed to accommodate + Noun",
        explanation: "Thông báo quy hoạch công trình hầm giữ xe ngầm.",
        example: "A new parking garage will be constructed to accommodate employees.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Diễn tả Mục đích: in order to meet growing demand for [N/NP]",
        explanation: "Lý do mở rộng thêm sảnh và hầm xe tòa nhà thương mại.",
        example: "The owner expanded the lobby in order to meet growing visitor demand.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_076",
    title: "Corporate Rebranding Launch & Media Kit Distribution",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Brand Strategy Director",
        text: "Good morning marketing staff, today marks the official launch of our global corporate rebranding initiative.",
        translation: "Chào buổi sáng nhân viên marketing, hôm nay đánh dấu ngày ra mắt chính thức chiến dịch tái định vị thương hiệu doanh nghiệp toàn cầu của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈmɑː.kɪt.ɪŋ stɑːf təˈdeɪ mɑːks ðɪ əˈfɪʃ.əl lɔːntʃ əv ˈaʊər ˈɡləʊ.bəl ˈkɔː.pər.ət ˌriːˈbræn.dɪŋ ɪˈnɪʃ.ə.tɪv/"
      },
      {
        id: 2,
        speaker: "Brand Strategy Director",
        text: "Our updated logo, vibrant color palette, and modern brand guidelines are now live on our media portal.",
        translation: "Logo đã cập nhật, bảng màu rực rỡ và các hướng dẫn thương hiệu hiện đại của chúng ta hiện đã trực tuyến trên cổng thông tin truyền thông.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈaʊər ʌpˈdeɪ.tɪd ˈləʊ.ɡəʊ ˈvaɪ.brənt ˈkʌl.ər ˈpæl.ət ænd ˈmɒd.ən brænd ˈɡaɪd.laɪnz ɑːr naʊ laɪv ɒn ˈaʊər ˈmiː.di.ə ˈpɔː.təl/"
      },
      {
        id: 3,
        speaker: "Brand Strategy Director",
        text: "All regional marketing teams must replace legacy templates and digital assets with the new versions immediately.",
        translation: "Tất cả các đội ngũ marketing khu vực phải thay thế các mẫu cũ và tài sản kỹ thuật số bằng các phiên bản mới ngay lập tức.",
        timestamp: [10.8, 16.1],
        ipa: "/ɔːl ˈriː.dʒən.əl ˈmɑː.kɪt.ɪŋ tiːmz mʌst rɪˈpleɪs ˈleg.ə.si ˈtem.plət/s ænd ˈdɪdʒ.ɪ.təl ˈæt.sets wɪð ðə njuː ˈvɜː.ʃənz ɪˈmiː.di.ət.li/"
      },
      {
        id: 4,
        speaker: "Brand Strategy Director",
        text: "An official press release and digital media kit will be distributed to major industry news outlets at 10 AM.",
        translation: "Thông cáo báo chí chính thức và bộ tài liệu truyền thông kỹ thuật số sẽ được gửi tới các cơ quan tin tức ngành lớn vào lúc 10 giờ sáng.",
        timestamp: [16.1, 23.0],
        ipa: "/æn əˈfɪʃ.əl pres rɪˈliːs ænd ˈdɪdʒ.ɪ.təl ˈmiː.di.ə kɪt wɪl biː dɪˈstrɪb.jʊ.tɪd tuː ˈmeɪ.dʒər ˈɪn.də.stri njuːz ˈaʊt.lets æt ten eɪ-em/"
      }
    ],
    vocabList: [
      {
        word: "rebranding",
        ipa: "/ˌriːˈbræn.dɪŋ/",
        pos: "Noun",
        meaning: "Sự tái định vị thương hiệu",
        detailMeaning: "Thay đổi logo, màu sắc và chiến lược nhận diện.",
        collocations: ["corporate rebranding", "rebranding launch"],
        example: "The corporate rebranding includes a new logo and modern website redesign."
      },
      {
        word: "media kit",
        ipa: "/ˈmiː.di.ə kɪt/",
        pos: "Noun",
        meaning: "Bộ tài liệu truyền thông",
        detailMeaning: "Bộ công cụ báo chí chứa logo và thông cáo.",
        collocations: ["digital media kit", "media kit distribution"],
        example: "The media kit contains high-resolution brand logos and executive bios."
      },
      {
        word: "brand identity",
        ipa: "/brænd aɪˈden.t̬ə.t̬i/",
        pos: "Noun",
        meaning: "Nhận diện thương hiệu",
        detailMeaning: "Hệ thống hình ảnh đặc trưng của doanh nghiệp.",
        collocations: ["strong brand identity", "unveil brand identity"],
        example: "Establishing a strong brand identity helps stand out in competitive markets."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Sự kiện Ra mắt: we are excited to unveil our new [Noun] to the public",
        explanation: "Thông báo sự kiện nhận diện thương hiệu mới.",
        example: "We are excited to unveil our new corporate identity tomorrow.",
        sentenceId: 1
      },
      {
        title: "Cấu trúc Bị động Yêu cầu Thay thế: all old materials must be replaced with + Noun",
        explanation: "Yêu cầu chuẩn hóa toàn bộ tư liệu truyền thông.",
        example: "Old brochures must be replaced with updated branded assets.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_075",
    title: "E-Commerce Payment Gateway Integration & Fraud Detection",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67daf4005a?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Fintech Product Manager",
        text: "Hello e-commerce development team, I have an important update regarding our online payment processing infrastructure.",
        translation: "Xin chào đội ngũ phát triển thương mại điện tử, tôi có một thông báo cập nhật quan trọng liên quan đến hạ tầng xử lý thanh toán trực tuyến của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/həˈləʊ iː-ˈkɒm.ɜːs dɪˈvel.əp.mənt tiːm aɪ hæv æn ɪmˈpɔː.tənt ʌpˈdeɪt rɪˈɡɑː.dɪŋ ˈaʊər ˈɒn.laɪn ˈpeɪ.mənt ˈprəʊ.ses.ɪŋ ˈɪn.frəˌstrʌk.tʃər/"
      },
      {
        id: 2,
        speaker: "Fintech Product Manager",
        text: "We have successfully integrated a new AI-driven fraud detection tool into our main checkout payment gateway.",
        translation: "Chúng ta đã tích hợp thành công một công cụ phát hiện gian lận dựa trên AI mới vào cổng thanh toán khi đặt hàng chính.",
        timestamp: [5.3, 10.8],
        ipa: "/wiː hæv səkˈses.fəl.i ˈɪn.tɪ.ɡreɪt.ɪd ə njuː eɪ-aɪ-ˈdrɪv.ən frɔːd dɪˈtek.ʃən tuːl ˈɪn.tuː ˈaʊər meɪn ˈtʃek.aʊt ˈpeɪ.mənt ˈɡeɪt.weɪ/"
      },
      {
        id: 3,
        speaker: "Fintech Product Manager",
        text: "This system analyzes buyer location and card authorization patterns in real time to block fraudulent transactions.",
        translation: "Hệ thống này phân tích vị trí người mua và các mẫu xác thực thẻ theo thời gian thực để ngăn chặn các giao dịch gian lận.",
        timestamp: [10.8, 16.1],
        ipa: "/ðɪs ˈsɪs.təm ˈæn.əl.aɪz/ɪz ˈbaɪ.ər ləʊˈkeɪ.ʃən ænd kɑːd ˌɔː.θər.aɪˈzeɪ.ʃən ˈpæt.ənz ɪn rɪəl taɪm tuː blɒk ˈfrɔː.dʒə.lənt trænˈzæk.ʃənz/"
      },
      {
        id: 4,
        speaker: "Fintech Product Manager",
        text: "Initial benchmark testing indicates that chargeback dispute rates will drop by over forty percent this month.",
        translation: "Kiểm thử đánh giá ban đầu chỉ ra rằng tỷ lệ tranh chấp hoàn tiền sẽ giảm hơn 40% trong tháng này.",
        timestamp: [16.1, 23.0],
        ipa: "/ɪˈnɪʃ.əl ˈbentʃ.mɑːk ˈtest.ɪŋ ˈɪn.dɪ.keɪts ðæt ˈtʃɑːdʒ.bæk dɪˈspjuːt reɪts wɪl drɒp baɪ ˈəʊ.vər ˈfɔː.ti pəˈsent ðɪs mʌnθ/"
      }
    ],
    vocabList: [
      {
        word: "payment gateway",
        ipa: "/ˈpeɪ.mənt ˈɡeɪt.weɪ/",
        pos: "Noun",
        meaning: "Cổng thanh toán trực tuyến",
        detailMeaning: "Hệ thống trung gian kết nối xử lý giao dịch ngân hàng.",
        collocations: ["integrate payment gateway", "checkout gateway"],
        example: "Integrating a new payment gateway allows customers to pay via digital wallets."
      },
      {
        word: "fraud detection",
        ipa: "/frɑːd dɪˈtek.ʃən/",
        pos: "Noun",
        meaning: "Phát hiện gian lận thanh toán",
        detailMeaning: "Sử dụng trí tuệ nhân tạo chặn giao dịch thẻ giả mạo.",
        collocations: ["AI fraud detection", "fraud detection tool"],
        example: "AI-powered fraud detection flags suspicious credit card transactions."
      },
      {
        word: "chargeback",
        ipa: "/ˈtʃɑːrdʒ.bæk/",
        pos: "Noun",
        meaning: "Sự hoàn tiền do tranh chấp",
        detailMeaning: "Khoản tiền ngân hàng đòi lại do khách báo thẻ bị lừa đảo.",
        collocations: ["chargeback dispute", "reduce chargebacks"],
        example: "Reducing merchant chargeback rates improves payment processor standing."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Thì Hiện tại Hoàn thành: has been integrated into + Noun",
        explanation: "Thông báo hoàn thành tích hợp công nghệ mới.",
        example: "A new fraud detection tool has been integrated into the checkout system.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Tương lai Chỉ Kết quả: will reduce [N/NP] by [Percentage]",
        explanation: "Dự báo hiệu quả giảm thiểu rủi ro gian lận.",
        example: "The system will reduce fraudulent transactions by thirty percent.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_074",
    title: "Hotel Dynamic Pricing & Overbooking Strategy",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Hotel Revenue Manager",
        text: "Good afternoon executive committee, here is our revenue management report for the third quarter.",
        translation: "Chào buổi chiều ban điều hành, đây là báo cáo quản lý doanh thu của chúng ta trong quý 3.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˌɑːf.təˈnuːn ɪɡˈzek.jə.tɪv kəˈmɪt.i hɪər ɪz ˈaʊər ˈrev.ən.juː ˈmæn.ɪdʒ.mənt rɪˈpɔːt fɔːr ðə θɜːd ˈkwɔː.tər/"
      },
      {
        id: 2,
        speaker: "Hotel Revenue Manager",
        text: "By implementing automated dynamic pricing algorithms, our average daily room rate increased by fourteen percent.",
        translation: "Nhờ triển khai các thuật toán định giá linh hoạt tự động, giá phòng trung bình hàng ngày của chúng ta đã tăng 14%.",
        timestamp: [5.3, 10.8],
        ipa: "/baɪ ˈɪm.plɪ.ment.ɪŋ ˈɔː.tə.meɪ.tɪd daɪˈnæm.ɪk ˈpraɪ.sɪŋ ˈæl.ɡə.rɪ.ðəmz ˈaʊər ˈæv.ər.ɪdʒ ˈdeɪ.li ruːm reɪt ɪnˈkriːst baɪ ˈfɔː.tiːn pəˈsent/"
      },
      {
        id: 3,
        speaker: "Hotel Revenue Manager",
        text: "Furthermore, overall hotel occupancy maintained an impressive ninety-one percent throughout the summer season.",
        translation: "Hơn nữa, tỷ lệ lấp đầy phòng tổng thể của khách sạn đã duy trì ở mức ấn tượng 91% trong suốt mùa hè.",
        timestamp: [10.8, 16.1],
        ipa: "/ˌfɜː.ðəˈmɔːr ˌəʊ.vərˈɔːl həʊˈtel ˈɒk.jə.pən.si meɪnˈteɪnd æn ɪmˈpres.ɪv ˈnaɪn.ti-wʌn pəˈsent θruːˈaʊt ðə ˈsʌm.ər ˈsiː.zən/"
      },
      {
        id: 4,
        speaker: "Hotel Revenue Manager",
        text: "We will adjust our autumn pricing strategy next week to capture corporate travel bookings for upcoming conferences.",
        translation: "Chúng ta sẽ điều chỉnh chiến lược giá mùa thu vào tuần tới để thu hút các đơn đặt phòng du lịch công tác cho các hội nghị sắp tới.",
        timestamp: [16.1, 23.0],
        ipa: "/wiː wɪl əˈdʒʌst ˈaʊər ˈɔː.təm ˈpraɪ.sɪŋ ˈstræt.ə.dʒi nekst wiːk tuː ˈkæp.tʃər ˈkɔː.pər.ət ˈtræv.əl ˈbʊk.ɪŋz fɔːr ʌpˈkʌm.ɪŋ ˈkɒn.fər.əns.ɪz/"
      }
    ],
    vocabList: [
      {
        word: "dynamic pricing",
        ipa: "/daɪˈnæm.ɪk ˈpraɪ.sɪŋ/",
        pos: "Noun",
        meaning: "Định giá linh hoạt",
        detailMeaning: "Tự động điều chỉnh giá phòng theo biến động nhu cầu thị trường.",
        collocations: ["dynamic pricing algorithm", "rate optimization"],
        example: "Dynamic pricing algorithms adjust room rates during peak holiday seasons."
      },
      {
        word: "occupancy rate",
        ipa: "/ˈɑː.kjə.pən.si reɪt/",
        pos: "Noun",
        meaning: "Tỷ lệ lấp đầy phòng",
        detailMeaning: "Tỷ lệ phần trăm số phòng được đặt trên tổng số phòng.",
        collocations: ["high occupancy rate", "average occupancy"],
        example: "Our weekend occupancy rate reached ninety-eight percent."
      },
      {
        word: "RevPAR",
        ipa: "/ˈrev.ə.nuː pɚ əˈveɪ.lə.bəl ruːm/",
        pos: "Noun",
        meaning: "Doanh thu phòng sẵn có",
        detailMeaning: "Chỉ số doanh thu trung bình trên mỗi phòng hiện có.",
        collocations: ["increase RevPAR", "RevPAR performance"],
        example: "RevPAR increased by twelve percent following rate optimization."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc So sánh Tăng trưởng Doanh thu: increased by [Percentage] compared to [Period]",
        explanation: "Báo cáo chỉ số tăng trưởng doanh thu khách sạn.",
        example: "Occupancy increased by ten percent compared to last quarter.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Điều chỉnh Giá: room rates will be adjusted dynamically based on + Noun",
        explanation: "Nguyên lý điều chỉnh giá phòng theo mùa.",
        example: "Room rates will be adjusted based on local event demand.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_073",
    title: "UI/UX Design Sprint & Mobile App Accessibility",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Product Design Lead",
        text: "Good morning product team, I want to share the user testing feedback from our mobile app redesign sprint.",
        translation: "Chào buổi sáng đội ngũ sản phẩm, tôi muốn chia sẻ phản hồi kiểm thử người dùng từ chu kỳ thiết kế lại ứng dụng di động của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈprɒd.ʌkt tiːm aɪ wɒnt tuː ʃeər ðə ˈjuː.zər ˈtest.ɪŋ ˈfiːd.bæk frəm ˈaʊər ˈməʊ.baɪl æp ˌriː.dɪˈzaɪn sprɪnt/"
      },
      {
        id: 2,
        speaker: "Product Design Lead",
        text: "Eighty-five percent of test participants praised the new streamlined checkout flow and enlarged font sizes.",
        translation: "85% người tham gia kiểm thử đã khen ngợi quy trình thanh toán mới được tinh gọn và kích thước phông chữ được phóng to.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈeɪ.ti-faɪv pəˈsent əv test pɑːˈtɪs.ɪ.pənts preɪzd ðə njuː ˈstriːm.laɪnd ˈtʃek.aʊt fləʊ ænd ɪnˈlɑːdʒd fɒnt saɪz.ɪz/"
      },
      {
        id: 3,
        speaker: "Product Design Lead",
        text: "However, we need to improve screen contrast ratios to comply fully with mobile accessibility guidelines.",
        translation: "Tuy nhiên, chúng ta cần cải thiện tỷ lệ tương phản màn hình để tuân thủ hoàn toàn các hướng dẫn về khả năng truy cập ứng dụng di động.",
        timestamp: [10.8, 16.1],
        ipa: "/haʊˈev.ər wiː niːd tuː ɪmˈpruːv skriːn ˈkɒn.trɑːst ˈreɪ.ʃi.əʊz tuː kəmˈplaɪ ˈfʊl.i wɪð ˈməʊ.baɪl əkˌses.əˈbɪl.ə.ti ˈɡaɪd.laɪnz/"
      },
      {
        id: 4,
        speaker: "Product Design Lead",
        text: "The UI team will update the interactive wireframes and share them on Figma by tomorrow afternoon.",
        translation: "Đội ngũ UI sẽ cập nhật các bản phác thảo giao diện tương tác và chia sẻ chúng trên Figma trước chiều mai.",
        timestamp: [16.1, 23.0],
        ipa: "/ðə juː-aɪ tiːm wɪl ʌpˈdeɪt ðɪ ˌɪn.tərˈæk.tɪv ˈwaɪə.freɪmz ænd ʃeər ðəm ɒn ˈfɪɡ.mə baɪ təˈmɒr.əʊ ˌɑːf.təˈnuːn/"
      }
    ],
    vocabList: [
      {
        word: "accessibility",
        ipa: "/əkˌses.əˈbɪl.ə.t̬i/",
        pos: "Noun",
        meaning: "Khả năng truy cập/sử dụng ứng dụng",
        detailMeaning: "Tiêu chuẩn thiết kế giúp người khiếm thị hay cao tuổi dùng ứng dụng dễ dàng.",
        collocations: ["app accessibility", "accessibility guidelines"],
        example: "App accessibility standards ensure visually impaired users can navigate easily."
      },
      {
        word: "wireframe",
        ipa: "/ˈwaɪər.freɪm/",
        pos: "Noun",
        meaning: "Bản phác thảo giao diện",
        detailMeaning: "Khung giao diện cơ bản dựng trước khi code app.",
        collocations: ["interactive wireframes", "Figma wireframes"],
        example: "The UX designer created interactive wireframes for testing."
      },
      {
        word: "usability testing",
        ipa: "/juː.zəˈbɪl.ə.t̬i ˈtest.ɪŋ/",
        pos: "Noun",
        meaning: "Kiểm thử khả năng sử dụng",
        detailMeaning: "Cho người dùng thật trải nghiệm thử giao diện để thu thập góp ý.",
        collocations: ["conduct usability testing", "user feedback"],
        example: "Usability testing revealed navigation confusion among elderly users."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Mục tiêu Thiết kế: designed to enhance [N/NP] for [Users]",
        explanation: "Mô tả công năng giao diện mới.",
        example: "The new interface is designed to enhance readability for all users.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Chỉ Tiến độ: prototypes have been submitted to + Noun + for review",
        explanation: "Báo cáo tiến độ hoàn thiện UI/UX.",
        example: "Interactive prototypes have been submitted to developers for review.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_072",
    title: "Airline Premium Lounge & Boarding Gate Announcement",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Airport Service Gate Agent",
        text: "Attention passengers on Horizon Airways Flight 308 to Tokyo, we are ready to begin boarding at Gate 15.",
        translation: "Xin chú ý các hành khách trên Chuyến bay 308 của Horizon Airways đi Tokyo, chúng tôi đã sẵn sàng bắt đầu cho lên máy bay tại Cửa 15.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ˈpæs.ən.dʒəz ɒn həˈraɪ.zən ˈeə.weɪz flaɪt ˈθriː-oʊ-eɪt tuː ˈtəʊ.ki.əʊ wiː ɑːr ˈred.i tuː bɪˈɡɪn ˈbɔːd.ɪŋ æt ɡeɪt ˈfɪf.tiːn/"
      },
      {
        id: 2,
        speaker: "Airport Service Gate Agent",
        text: "We now invite first-class passengers and active loyalty club members to proceed to the priority lane.",
        translation: "Bây giờ chúng tôi mời các hành khách hạng nhất và hội viên câu lạc bộ khách hàng thân thiết di chuyển đến làn ưu tiên.",
        timestamp: [5.3, 10.8],
        ipa: "/wiː naʊ ɪnˈvaɪt ˌfɜːst-ˈklɑːs ˈpæs.ən.dʒəz ænd ˈæk.tɪv ˈlɔɪ.əl.ti klʌb ˈmem.bəz tuː prəˈsiːd tuː ðə praɪˈɒr.ə.ti leɪn/"
      },
      {
        id: 3,
        speaker: "Airport Service Gate Agent",
        text: "Please have your passport and digital boarding pass open on your smartphone to ensure a smooth boarding process.",
        translation: "Vui lòng mở sẵn hộ chiếu và thẻ lên máy bay điện tử trên điện thoại thông minh của quý vị để đảm bảo quá trình lên máy bay diễn ra suôn sẻ.",
        timestamp: [10.8, 16.1],
        ipa: "/pliːz hæv jɔːr ˈpɑːs.pɔːt ænd ˈdɪdʒ.ɪ.təl ˈbɔːd.ɪŋ pɑːs ˈəʊ.pən ɒn jɔːr ˈsmɑːt.fəʊn tuː ɪnˈʃʊər ə smuːð ˈbɔːd.ɪŋ ˈprəʊ.ses/"
      },
      {
        id: 4,
        speaker: "Airport Service Gate Agent",
        text: "Passengers requiring special assistance or traveling with young children may also board at this time.",
        translation: "Hành khách cần sự trợ giúp đặc biệt hoặc đi cùng trẻ nhỏ cũng có thể lên máy bay vào lúc này.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈpæs.ən.dʒəz rɪˈkwaɪə.rɪŋ ˈspeʃ.əl əˈsɪs.təns ɔː ˈtræv.əl.ɪŋ wɪð jʌŋ ˈtʃɪl.drən meɪ ˈɔːl.səʊ bɔːd æt ðɪs taɪm/"
      }
    ],
    vocabList: [
      {
        word: "priority boarding",
        ipa: "/praɪˈɔːr.ə.t̬i ˈbɔːr.dɪŋ/",
        pos: "Noun",
        meaning: "Lên máy bay ưu tiên",
        detailMeaning: "Quyền lên máy bay trước dành cho thương gia và khách thân thiết.",
        collocations: ["priority boarding lane", "enjoy priority boarding"],
        example: "Business class passengers enjoy priority boarding at Gate 12."
      },
      {
        word: "boarding pass",
        ipa: "/ˈbɔːr.dɪŋ ˌpæs/",
        pos: "Noun",
        meaning: "Thẻ lên máy bay",
        detailMeaning: "Thẻ quét mã vạch lên máy bay điện tử hoặc giấy.",
        collocations: ["digital boarding pass", "scan boarding pass"],
        example: "Please present your digital boarding pass at the gate scanner."
      },
      {
        word: "lounge",
        ipa: "/laʊndʒ/",
        pos: "Noun",
        meaning: "Phòng chờ thương gia sân bay",
        detailMeaning: "Phòng nghỉ VIP phục vụ ăn uống miễn phí trước chuyến bay.",
        collocations: ["premium lounge", "airport lounge"],
        example: "The premium lounge offers quiet workspaces and complimentary dining."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Mời lên máy bay theo lượt: passengers sitting in Rows [X] to [Y] are now invited to board",
        explanation: "Thông báo điều phối hành khách lên máy bay trật tự.",
        example: "Passengers in Rows 15 to 30 are invited to board.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Điều kiện: priority status will be verified upon + V-ing/Noun",
        explanation: "Quy trình đối soát thẻ ưu tiên cửa khởi hành.",
        example: "Priority status will be verified upon presenting your ticket.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_071",
    title: "HVAC System Maintenance & Building Energy Efficiency",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Facilities Management Director",
        text: "Attention all office tenants, this is an announcement from the Facilities Management Office regarding Building B.",
        translation: "Xin chú ý toàn thể các đơn vị thuê văn phòng, đây là thông báo từ Văn phòng Quản lý Cơ sở Hạ tầng liên quan đến Tòa nhà B.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ɔːl ˈɒf.ɪs ˈten.ənts ðɪs ɪz æn əˈnaʊns.mənt frəm ðə fəˈsɪl.ə.tiz ˈmæn.ɪdʒ.mənt ˈɒf.ɪs rɪˈɡɑː.dɪŋ ˈbɪl.dɪŋ biː/"
      },
      {
        id: 2,
        speaker: "Facilities Management Director",
        text: "Routine maintenance and air filter replacement for the central HVAC system is scheduled for this Saturday.",
        translation: "Việc bảo trì định kỳ và thay thế bộ lọc không khí cho hệ thống HVAC trung tâm được lên lịch vào Thứ Bảy tuần này.",
        timestamp: [5.3, 10.8],
        ipa: "/ruːˈtiːn ˈmeɪn.tən.əns ænd eər ˈfɪl.tər rɪˈpleɪs.mənt fɔːr ðə ˈsen.trəl ˈeɪtʃ-viː-eɪ-siː ˈsɪs.təm ɪz ˈʃed.juːld fɔːr ðɪs ˈsæt.ə.deɪ/"
      },
      {
        id: 3,
        speaker: "Facilities Management Director",
        text: "Air conditioning and heating services will be temporarily shut off between 8 AM and 2 PM during servicing.",
        translation: "Dịch vụ điều hòa và sưởi ấm sẽ tạm thời bị ngắt trong khoảng từ 8 giờ sáng đến 2 giờ chiều trong quá trình bảo trì.",
        timestamp: [10.8, 16.1],
        ipa: "/eər kənˈdɪʃ.ən.ɪŋ ænd ˈhiːt.ɪŋ ˈsɜː.vɪs.ɪz wɪl biː ˈtem.pər.ər.əl.i ʃʌt ɒf bɪˈtwiːn eɪt eɪ-em ænd tuː piː-em ˈdjʊə.rɪŋ ˈsɜː.vɪs.ɪŋ/"
      },
      {
        id: 4,
        speaker: "Facilities Management Director",
        text: "We apologize for any inconvenience and encourage staff working on Saturday to adjust their attire accordingly.",
        translation: "Chúng tôi xin lỗi vì bất kỳ sự bất tiện nào và khuyến khích nhân viên làm việc vào Thứ Bảy điều chỉnh trang phục phù hợp.",
        timestamp: [16.1, 23.0],
        ipa: "/wiː əˈpɒl.ə.dʒaɪz fɔːr ˈen.i ˌɪn.kənˈviː.ni.əns ænd ɪnˈkʌr.ɪdʒ stɑːf ˈwɜːk.ɪŋ ɒn ˈsæt.ə.deɪ tuː əˈdʒʌst ðeər əˈtaɪər əˈkɔː.dɪŋ.li/"
      }
    ],
    vocabList: [
      {
        word: "HVAC",
        ipa: "/ˌeɪtʃ.væk/",
        pos: "Noun",
        meaning: "Hệ thống điều hòa & sưởi tòa nhà",
        detailMeaning: "Hệ thống thông gió, sưởi ấm và làm mát tòa nhà văn phòng.",
        collocations: ["central HVAC system", "HVAC maintenance"],
        example: "Routine HVAC filter replacements improve indoor air quality."
      },
      {
        word: "maintenance window",
        ipa: "/ˈmeɪn.tən.əns ˈwɪn.doʊ/",
        pos: "Noun",
        meaning: "Khung thời gian bảo trì",
        detailMeaning: "Khoảng thời gian ngắt điện/điều hòa kỹ thuật cuối tuần.",
        collocations: ["scheduled maintenance window", "servicing window"],
        example: "System updates will take place during the weekend maintenance window."
      },
      {
        word: "tenant",
        ipa: "/ˈten.ənt/",
        pos: "Noun",
        meaning: "Đơn vị thuê văn phòng",
        detailMeaning: "Các công ty thuê diện tích làm việc trong tòa nhà.",
        collocations: ["office tenant", "building tenant"],
        example: "Building management notified all office tenants of the scheduled power outage."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Thông báo Lịch bảo trì: routine maintenance is scheduled to take place on + [Date]",
        explanation: "Thông báo lịch bảo trì kỹ thuật cho cư dân/văn phòng.",
        example: "Elevator maintenance is scheduled to take place on Saturday.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Yêu cầu Hợp tác: tenants are kindly requested to close + Noun",
        explanation: "Đề nghị khách thuê phối hợp đảm bảo tiết kiệm điện.",
        example: "Tenants are requested to close windows when air conditioning is running.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_070",
    title: "Corporate Upskilling Program & Leadership Seminar",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Corporate Learning Director",
        text: "Good morning team, I am excited to announce our new executive leadership upskilling program for junior managers.",
        translation: "Chào buổi sáng cả đội, tôi rất vui mừng được thông báo về chương trình nâng cao kỹ năng lãnh đạo điều hành mới dành cho các quản lý cấp trung.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ tiːm aɪ æm ɪkˈsaɪ.tɪd tuː əˈnaʊns ˈaʊər njuː ɪɡˈzek.jə.tɪv ˈliː.də.ʃɪp ˈʌpˌskɪl.ɪŋ ˈprəʊ.ɡræm fɔːr ˈdʒuː.ni.ər ˈmæn.ɪdʒ.əz/"
      },
      {
        id: 2,
        speaker: "Corporate Learning Director",
        text: "The four-week online curriculum covers strategic decision-making, financial forecasting, and team conflict resolution.",
        translation: "Chương trình học trực tuyến 4 tuần bao gồm ra quyết định chiến lược, dự báo tài chính và giải quyết xung đột trong đội ngũ.",
        timestamp: [5.3, 10.8],
        ipa: "/ðə fɔːr-wiːk ˈɒn.laɪn kəˈrɪk.jə.ləm ˈkʌv.əz strəˈtiː.dʒɪk dɪˈsɪʒ.ən-ˌmeɪk.ɪŋ faɪˈnæn.ʃəl ˈfɔː.kɑːst.ɪŋ ænd tiːm ˈkɒn.flɪkt ˌrez.əˈluː.ʃən/"
      },
      {
        id: 3,
        speaker: "Corporate Learning Director",
        text: "Employees who complete all interactive modules will earn a recognized professional management certificate.",
        translation: "Những nhân viên hoàn thành tất cả các học phần tương tác sẽ nhận được chứng chỉ quản lý chuyên nghiệp được công nhận.",
        timestamp: [10.8, 16.1],
        ipa: "/ɛmˈplɔɪ.iːz huː kəmˈpliːt ɔːl ˌɪn.tərˈæk.tɪv ˈmɒd.juːlz wɪl ɜːn ə ˈrek.əɡ.naɪzd prəˈfeʃ.ən.əl ˈmæn.ɪdʒ.mənt səˈtɪf.ɪ.kət/"
      },
      {
        id: 4,
        speaker: "Corporate Learning Director",
        text: "Registration opens tomorrow on the employee intranet, with only thirty seats available for the first cohort.",
        translation: "Cổng đăng ký sẽ mở vào ngày mai trên mạng nội bộ nhân viên, chỉ có 30 chỗ trống cho khóa học đầu tiên.",
        timestamp: [16.1, 23.0],
        ipa: "/ˌredʒ.ɪˈstreɪ.ʃən ˈəʊ.pənz təˈmɒr.əʊ ɒn ðɪ ɛmˈplɔɪ.iː ˈɪn.trə.net wɪð ˈəʊn.li ˈθɜː.ti siːts əˈveɪ.lə.bəl fɔːr ðə fɜːst ˈkəʊ.hɔːt/"
      }
    ],
    vocabList: [
      {
        word: "upskilling",
        ipa: "/ˈʌpˌskɪl.ɪŋ/",
        pos: "Noun",
        meaning: "Nâng cao kỹ năng nhân viên",
        detailMeaning: "Đào tạo bổ sung kiến thức quản lý mới cho đội ngũ nhân sự.",
        collocations: ["upskilling program", "employee upskilling"],
        example: "Investing in employee upskilling boosts company productivity and retention."
      },
      {
        word: "curriculum",
        ipa: "/kəˈrɪk.jə.ləm/",
        pos: "Noun",
        meaning: "Chương trình đào tạo",
        detailMeaning: "Nội dung khóa học quản trị chiến lược.",
        collocations: ["training curriculum", "online curriculum"],
        example: "The leadership curriculum includes project management workshops."
      },
      {
        word: "cohort",
        ipa: "/ˈkoʊ.hoːrt/",
        pos: "Noun",
        meaning: "Khóa học, nhóm học viên",
        detailMeaning: "Đợt nhân viên tham gia lớp đào tạo đợt 1.",
        collocations: ["first cohort", "cohort group"],
        example: "The first cohort of trainees completed the management seminar yesterday."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Lợi ích Khóa học: participants who complete the program will receive + Noun",
        explanation: "Quyền lợi nhận chứng chỉ sau khóa đào tạo.",
        example: "Employees who complete the course will receive a digital credential.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Hướng dẫn Đăng ký: to enroll in the seminar, please visit + Link",
        explanation: "Chỉ dẫn đăng ký lớp học trên Intranet.",
        example: "To enroll in the workshop, please visit the internal learning portal.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_069",
    title: "Annual Corporate Tax Audit & Deductible Expenses",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Corporate Tax Controller",
        text: "Hello finance staff, this is an important reminder regarding our upcoming fiscal year-end tax filings.",
        translation: "Xin chào nhân viên tài chính, đây là nhắc nhở quan trọng liên quan đến việc kê khai thuế cuối năm tài chính sắp tới của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/həˈləʊ faɪˈnæns stɑːf ðɪs ɪz æn ɪmˈpɔː.tənt rɪˈmaɪn.dər rɪˈɡɑː.dɪŋ ˈaʊər ʌpˈkʌm.ɪŋ ˈfɪs.kəl jɪər-end tæks ˈfaɪ.lɪŋz/"
      },
      {
        id: 2,
        speaker: "Corporate Tax Controller",
        text: "All department expense reports along with itemized original receipts must be submitted to accounting by October 15th.",
        translation: "Tất cả báo cáo chi phí của các phòng ban cùng với hóa đơn gốc chi tiết phải được nộp cho bộ phận kế toán trước ngày 15 tháng 10.",
        timestamp: [5.3, 10.8],
        ipa: "/ɔːl dɪˈpɑːt.mənt ɪkˈspens rɪˈpɔːts əˈlɒŋ wɪð ˈaɪ.təm.aɪzd əˈrɪdʒ.ən.əl rɪˈsiːts mʌst biː səbˈmɪt.ɪd tuː əˈkaʊnt.ɪŋ baɪ ɒkˈtəʊ.bər ˌfɪfˈtiːnθ/"
      },
      {
        id: 3,
        speaker: "Corporate Tax Controller",
        text: "Late submissions will not be eligible for corporate tax deductions and may result in internal budget cuts.",
        translation: "Các khoản nộp trễ sẽ không đủ điều kiện được khấu trừ thuế doanh nghiệp và có thể dẫn đến việc bị cắt giảm ngân sách nội bộ.",
        timestamp: [10.8, 16.1],
        ipa: "/leɪt səbˈmɪʃ.ənz wɪl nɒt biː ˈel.ɪ.dʒə.bəl fɔːr ˈkɔː.pər.ət tæks dɪˈdʌk.ʃənz ænd meɪ rɪˈzʌlt ɪn ɪnˈtɜː.nəl ˈbʌdʒ.ɪt kʌts/"
      },
      {
        id: 4,
        speaker: "Corporate Tax Controller",
        text: "Please schedule a review session with your assigned accountant if you have questions about expense eligibility.",
        translation: "Vui lòng lên lịch một buổi làm việc với kế toán viên được phân công nếu bạn có thắc mắc về tính hợp lệ của chi phí.",
        timestamp: [16.1, 23.0],
        ipa: "/pliːz ˈʃed.juːl ə rɪˈvjuː ˈseʃ.ən wɪð jɔːr əˈsaɪnd əˈkaʊn.tənt ɪf juː hæv ˈkwes.tʃənz əˈbaʊt ɪkˈspens ˌel.ɪ.dʒəˈbɪl.ə.ti/"
      }
    ],
    vocabList: [
      {
        word: "deductible",
        ipa: "/dɪˈdʌk.tə.bəl/",
        pos: "Adj / Noun",
        meaning: "Khoản chi phí được trừ khi tính thuế",
        detailMeaning: "Hóa đơn chi phí doanh nghiệp được quyết toán giảm trừ thuế.",
        collocations: ["tax deductible", "deductible expense"],
        example: "Business travel expenses are tax deductible if backed by receipts."
      },
      {
        word: "tax filing",
        ipa: "/tæks ˈfaɪ.lɪŋ/",
        pos: "Noun",
        meaning: "Việc nộp hồ sơ kê khai thuế",
        detailMeaning: "Nộp báo cáo tài chính tài khóa cho cơ quan thuế.",
        collocations: ["annual tax filing", "year-end filing"],
        example: "The accounting department finalized all corporate tax filings today."
      },
      {
        word: "itemized receipt",
        ipa: "/ˈaɪ.t̬ə.maɪzd rɪˈsiːt/",
        pos: "Noun",
        meaning: "Hóa đơn thanh toán chi tiết",
        detailMeaning: "Chứng từ liệt kê đầy đủ hạng mục chi tiêu.",
        collocations: ["submit itemized receipts", "original receipt"],
        example: "Itemized receipts are required for all business meal reimbursements."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Yêu cầu Nộp Chứng từ: must submit all original receipts for + Noun",
        explanation: "Quy định quy chuẩn chứng từ tài chính kế toán.",
        example: "Employees must submit all original receipts for reimbursement.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Điều kiện Phạt: penalties will be incurred if + Clause",
        explanation: "Cảnh báo vi phạm quy định kê khai thuế.",
        example: "Penalties will be incurred if tax filings are submitted past the deadline.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_068",
    title: "Same-Day Courier Delivery & Fleet Management",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Logistics Dispatch Manager",
        text: "Good morning dispatch team, I want to go over our new same-day delivery service protocols.",
        translation: "Chào buổi sáng đội ngũ điều phối, tôi muốn điểm qua các quy trình dịch vụ giao hàng trong ngày mới của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ dɪˈspætʃ tiːm aɪ wɒnt tuː ɡəʊ ˈəʊ.vər ˈaʊər njuː seɪm-deɪ dɪˈlɪv.ər.i ˈsɜː.vɪs ˈprəʊ.tə.kɒlz/"
      },
      {
        id: 2,
        speaker: "Logistics Dispatch Manager",
        text: "Our mobile app now dynamically optimizes delivery routes based on real-time city traffic data.",
        translation: "Ứng dụng di động của chúng ta giờ đây tự động tối ưu hóa các tuyến đường giao hàng dựa trên dữ liệu giao thông thành phố theo thời gian thực.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈaʊər ˈməʊ.baɪl æp naʊ daɪˈnæm.ɪk.li ˈɒp.tɪ.maɪz/ɪz dɪˈlɪv.ər.i ruːts beɪst ɒn rɪəl-taɪm ˈsɪt.i ˈtræf.ɪk ˈdeɪ.tə/"
      },
      {
        id: 3,
        speaker: "Logistics Dispatch Manager",
        text: "Drivers are required to obtain digital customer signatures on their handheld tablets for every completed package delivery.",
        translation: "Lái xe được yêu cầu phải thu thập chữ ký số của khách hàng trên máy tính bảng cầm tay cho mỗi đơn hàng đã hoàn thành.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈdraɪ.vəz ɑːr rɪˈkwaɪəd tuː əbˈteɪn ˈdɪdʒ.ɪ.təl ˈkʌs.tə.mər ˈsɪɡ.nə.tʃəz ɒn ðeər ˈhænd.held ˈtæb.ləts fɔːr ˈev.ri kəmˈpliː.tɪd ˈpæk.ɪdʒ dɪˈlɪv.ər.i/"
      },
      {
        id: 4,
        speaker: "Logistics Dispatch Manager",
        text: "Any packages that cannot be delivered after two attempts must be returned to the main depot by 7 PM.",
        translation: "Bất kỳ kiện hàng nào không thể giao sau hai lần thử phải được đưa trở lại kho chính trước 7 giờ tối.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈen.i ˈpæk.ɪdʒ.ɪz ðæt ˈkæn.ɒt biː dɪˈlɪv.əd ˈɑːf.tər tuː əˈtempts mʌst biː rɪˈtɜːnd tuː ðə meɪn ˈdep.əʊ baɪ sev.ən piː-em/"
      }
    ],
    vocabList: [
      {
        word: "courier",
        ipa: "/ˈkʊr.i.ɚ/",
        pos: "Noun",
        meaning: "Nhân viên/ đơn vị chuyển phát nhanh",
        detailMeaning: "Dịch vụ giao nhận bưu phẩm hỏa tốc đô thị.",
        collocations: ["express courier", "courier service"],
        example: "Express couriers handle urgent medical package deliveries."
      },
      {
        word: "dispatch",
        ipa: "/dɪˈspætʃ/",
        pos: "Noun / Verb",
        meaning: "Sự điều phối xe/hàng hóa",
        detailMeaning: "Tự động phân tuyến cho tài xế giao hàng hỏa tốc.",
        collocations: ["central dispatch", "dispatch manager"],
        example: "The central dispatch unit assigns routes to drivers automatically."
      },
      {
        word: "fleet",
        ipa: "/fliːt/",
        pos: "Noun",
        meaning: "Đội xe giao hàng",
        detailMeaning: "Toàn bộ xe máy/ô tô tải thuộc sở hữu công ty chuyển phát.",
        collocations: ["delivery fleet", "electric fleet"],
        example: "Transitioning our delivery fleet to electric vehicles cuts operational costs."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Tự động hóa Route: routes are dynamically optimized based on + Noun",
        explanation: "Giải thích thuật toán phân tuyến cho tài xế hỏa tốc.",
        example: "Delivery routes are optimized based on live traffic patterns.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bắt buộc Báo cáo: drivers are required to log + Noun + upon [Action]",
        explanation: "Quy định quy trình xác nhận giao hàng qua máy tính bảng.",
        example: "Drivers are required to log digital signatures upon package handover.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_067",
    title: "Seasonal Apparel Launch & Store Display Guidelines",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Retail Merchandising Director",
        text: "Attention all store managers, this is a briefing on the upcoming release of our winter apparel collection.",
        translation: "Xin chú ý toàn thể các quản lý cửa hàng, đây là buổi phổ biến thông tin về đợt ra mắt bộ sưu tập trang phục mùa đông sắp tới.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ɔːl stɔːr ˈmæn.ɪdʒ.əz ðɪs ɪz ə ˈbriː.fɪŋ ɒn ðɪ ʌpˈkʌm.ɪŋ rɪˈliːs əv ˈaʊər ˈwɪn.tər əˈpær.əl kəˈlek.ʃən/"
      },
      {
        id: 2,
        speaker: "Retail Merchandising Director",
        text: "Shipments of the new jacket line will arrive at regional retail outlets by Wednesday afternoon.",
        translation: "Các chuyến hàng thuộc dòng áo khoác mới sẽ đến các đại lý bán lẻ trong khu vực trước chiều Thứ Tư.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈʃɪp.mənts əv ðə njuː ˈdʒæk.ɪt laɪn wɪl əˈraɪv æt ˈriː.dʒən.əl ˈriː.teɪl ˈaʊt.lets baɪ ˈwenz.deɪ ˌɑːf.təˈnuːn/"
      },
      {
        id: 3,
        speaker: "Retail Merchandising Director",
        text: "All front display windows must be updated according to the new visual merchandising guide before doors open on Thursday.",
        translation: "Tất cả các cửa kính trưng bày phía trước phải được cập nhật theo hướng dẫn trưng bày hình ảnh mới trước khi mở cửa vào Thứ Năm.",
        timestamp: [10.8, 16.1],
        ipa: "/ɔːl frʌnt dɪˈspleɪ ˈwɪn.dəʊz mʌst biː ʌpˈdeɪ.tɪd əˈkɔː.dɪŋ tuː ðə njuː ˈvɪʒ.u.əl ˈmɜː.tʃən.daɪz.ɪŋ ɡaɪd bɪˈfɔː dɔːz ˈəʊ.pən ɒn ˈθɜːz.deɪ/"
      },
      {
        id: 4,
        speaker: "Retail Merchandising Director",
        text: "Promotional discount signs should remain hidden in storage until the official campaign launches on Friday morning.",
        translation: "Biển quảng cáo giảm giá nên được cất giấu trong kho cho đến khi chiến dịch chính thức bắt đầu vào sáng Thứ Sáu.",
        timestamp: [16.1, 23.0],
        ipa: "/prəˈməʊ.ʃən.əl ˈdɪs.kaʊnt saɪnz ʃʊd rɪˈmeɪn ˈhɪd.ən ɪn ˈstɔː.rɪdʒ ənˈtɪl ðɪ əˈfɪʃ.əl kæmˈpeɪn lɔːntʃ.ɪz ɒn ˈfraɪ.deɪ ˈmɔː.nɪŋ/"
      }
    ],
    vocabList: [
      {
        word: "apparel",
        ipa: "/əˈpær.əl/",
        pos: "Noun",
        meaning: "Trang phục, quần áo thời trang",
        detailMeaning: "Sản phẩm thời trang dòng áo khoác mùa đông.",
        collocations: ["winter apparel", "apparel line"],
        example: "The new winter apparel line will arrive in stores next week."
      },
      {
        word: "visual merchandising",
        ipa: "/ˈvɪʒ.u.əl ˈmɝː.tʃən.daɪz.ɪŋ/",
        pos: "Noun",
        meaning: "Nghệ thuật trưng bày bán lẻ",
        detailMeaning: "Sắp xếp ma-nơ-canh và kệ hàng thu hút khách.",
        collocations: ["visual merchandising guide", "display window"],
        example: "Store staff should merchandise window displays according to visual guidelines."
      },
      {
        word: "outlet",
        ipa: "/ˈaʊt.let/",
        pos: "Noun",
        meaning: "Đại lý, cửa hàng bán lẻ",
        detailMeaning: "Cửa hàng bán sản phẩm trực tiếp cho người tiêu dùng.",
        collocations: ["retail outlet", "regional outlet"],
        example: "The company operates over fifty retail outlets nationwide."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Yêu cầu Trưng bày: display windows are required to feature + Noun",
        explanation: "Quy định trưng bày sản phẩm chuẩn cửa hàng.",
        example: "Front windows are required to feature top-selling jackets.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Diễn tả Thời gian Bắt đầu: sales campaign is scheduled to launch on + Date",
        explanation: "Thông báo lịch trình chiến dịch khuyến mãi.",
        example: "The promotion is scheduled to launch on Friday morning.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_066",
    title: "Enterprise Risk Assessment & Business Continuity Plan",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Chief Risk Officer",
        text: "Good morning executive committee, I am presenting our annual enterprise risk management review for this year.",
        translation: "Chào buổi sáng ủy ban điều hành, tôi xin trình bày bản đánh giá quản lý rủi ro doanh nghiệp hàng năm của chúng ta cho năm nay.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ɪɡˈzek.jə.tɪv kəˈmɪt.i aɪ æm prɪˈzent.ɪŋ ˈaʊər ˈæn.ju.əl ˈen.tə.praɪz rɪsk ˈmæn.ɪdʒ.mənt rɪˈvjuː fɔːr ðɪs jɪər/"
      },
      {
        id: 2,
        speaker: "Chief Risk Officer",
        text: "Recent simulation tests confirmed that our offsite data backup systems can restore full operational capability within fifteen minutes.",
        translation: "Các bài kiểm tra mô phỏng gần đây đã xác nhận rằng hệ thống sao lưu dữ liệu bên ngoài của chúng ta có thể khôi phục hoàn toàn khả năng vận hành trong vòng 15 phút.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈriː.sənt ˌsɪm.jəˈleɪ.ʃən tests kənˈfɜːmd ðæt ˈaʊər ɒfˈsaɪt ˈdeɪ.tə ˈbæk.ʌp ˈsɪs.təmz kæn rɪˈstɔː fʊl ˌɒp.ərˈeɪ.ʃən.əl ˌkeɪ.pəˈbɪl.ə.ti wɪðˈɪn ˌfɪfˈtiːn ˈmɪn.ɪts/"
      },
      {
        id: 3,
        speaker: "Chief Risk Officer",
        text: "To further strengthen business continuity, we are updating our emergency response protocols across all regional branch offices.",
        translation: "Để tăng cường hơn nữa tính liên tục trong kinh doanh, chúng tôi đang cập nhật các quy trình ứng phó khẩn cấp trên tất cả các văn phòng chi nhánh khu vực.",
        timestamp: [10.8, 16.1],
        ipa: "/tuː ˈfɜː.ðər strɛŋk.θən ˈbɪz.nɪs kən.tɪˈnjuː.ə.ti wiː ɑːr ʌpˈdeɪt.ɪŋ ˈaʊər ɪˈmɜː.dʒən.si rɪˈspɒns ˈprəʊ.tə.kɒlz əˈkrɒs ɔːl ˈriː.dʒən.əl brɑːntʃ ˈɒf.ɪs.ɪz/"
      },
      {
        id: 4,
        speaker: "Chief Risk Officer",
        text: "Department heads must submit their updated risk mitigation checklists to my office by Friday afternoon.",
        translation: "Trưởng các bộ phận phải nộp danh mục kiểm tra giảm thiểu rủi ro đã cập nhật cho văn phòng tôi trước chiều Thứ Sáu.",
        timestamp: [16.1, 23.0],
        ipa: "/dɪˈpɑːt.mənt hedz mʌst səbˈmɪt ðeər ʌpˈdeɪ.tɪd rɪsk ˌmɪt.ɪˈɡeɪ.ʃən ˈtʃek.lɪsts tuː maɪ ˈɒf.ɪs baɪ ˈfraɪ.deɪ ˌɑːf.təˈnuːn/"
      }
    ],
    vocabList: [
      {
        word: "business continuity",
        ipa: "/ˈbɪz.nɪs kən.təˈnuː.ə.t̬i/",
        pos: "Noun",
        meaning: "Duy trì hoạt động kinh doanh liên tục",
        detailMeaning: "Khả năng khôi phục vận hành khi gặp sự cố thiên tai/mạng.",
        collocations: ["business continuity plan", "ensure continuity"],
        example: "A robust business continuity plan protects operations during power outages."
      },
      {
        word: "mitigation",
        ipa: "/ˌmɪt̬.əˈɡeɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự giảm thiểu rủi ro",
        detailMeaning: "Biện pháp phòng ngừa thiệt hại cho doanh nghiệp.",
        collocations: ["risk mitigation checklist", "mitigation strategy"],
        example: "Risk mitigation strategies reduce potential financial losses."
      },
      {
        word: "simulation",
        ipa: "/ˌsɪm.jəˈleɪ.ʃən/",
        pos: "Noun",
        meaning: "Bài kiểm tra diễn tập mô phỏng",
        detailMeaning: "Giả định sự cố khẩn cấp để kiểm tra hệ thống sao lưu.",
        collocations: ["simulation test", "disaster simulation"],
        example: "Annual disaster simulation tests ensure staff emergency readiness."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Kế hoạch Dự phòng: in the event of [Incident], the backup system will automatically activate",
        explanation: "Nguyên tắc kích hoạt hệ thống dự phòng khi xảy ra sự cố.",
        example: "In the event of a server crash, backup cloud databases will activate.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Yêu cầu Rà soát: all department managers are required to review + Noun",
        explanation: "Chỉ đạo rà soát quy trình ứng phó khẩn cấp.",
        example: "Department managers are required to review emergency protocols annually.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_065",
    title: "Restaurant Menu Redesign & Food Safety Standards",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Executive Head Chef",
        text: "Good afternoon kitchen staff, I want to briefly go over the launch of our new autumn dinner menu starting tonight.",
        translation: "Chào buổi chiều nhân viên bếp, tôi muốn điểm qua nhanh việc ra mắt thực đơn tối mùa thu mới của chúng ta bắt đầu từ tối nay.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˌɑːf.təˈnuːn ˈkɪtʃ.ən stɑːf aɪ wɒnt tuː briːf.li ɡəʊ ˈəʊ.vər ðə lɔːntʃ əv ˈaʊər njuː ˈɔː.təm ˈdɪn.ər ˈmen.juː ˈstɑː.tɪŋ təˈnaɪt/"
      },
      {
        id: 2,
        speaker: "Executive Head Chef",
        text: "We have introduced five seasonal seafood dishes, all prepared using organic ingredients from local suppliers.",
        translation: "Chúng ta đã đưa vào 5 món hải sản theo mùa, tất cả đều được chế biến từ các nguyên liệu hữu cơ từ các nhà cung cấp địa phương.",
        timestamp: [5.3, 10.8],
        ipa: "/wiː hæv ˌɪn.trəˈdjuːst faɪv ˈsiː.zən.əl ˈsiː.fuːd dɪʃ.ɪz ɔːl prɪˈpeəd ˈjuːz.ɪŋ ɔːˈɡæn.ɪk ɪnˈɡriː.di.ənts frəm ˈləʊ.kəl səˈplaɪ.əz/"
      },
      {
        id: 3,
        speaker: "Executive Head Chef",
        text: "To accommodate guests with dietary restrictions, clear allergen labels have been added to our printed menus.",
        translation: "Để đáp ứng những khách hàng có chế độ ăn kiêng đặc biệt, các nhãn cảnh báo chất gây dị ứng rõ ràng đã được thêm vào thực đơn in.",
        timestamp: [10.8, 16.1],
        ipa: "/tuː əˈkɒm.ə.deɪt ɡests wɪð ˈdaɪ.ə.ter.i rɪˈstrɪk.ʃənz klɪər ˈæl.ə.dʒən ˈleɪ.bəlz hæv biːn ˈæd.ɪd tuː ˈaʊər ˈprɪn.tɪd ˈmen.juːz/"
      },
      {
        id: 4,
        speaker: "Executive Head Chef",
        text: "Please remember that color-coded prep stations must be used strictly to avoid raw ingredient cross-contamination.",
        translation: "Xin nhớ rằng các trạm sơ chế phân màu phải được sử dụng nghiêm ngặt để tránh nhiễm khuẩn chéo nguyên liệu sống.",
        timestamp: [16.1, 23.0],
        ipa: "/pliːz rɪˈmem.bər ðæt ˈkʌl.ər-kəʊd.ɪd prep ˈsteɪ.ʃənz mʌst biː ˈjuːzd ˈstrɪkt.li tuː əˈvɔɪd rɔː ɪnˈɡriː.di.ənt krɒs-kənˌtæm.ɪˈneɪ.ʃən/"
      }
    ],
    vocabList: [
      {
        word: "cross-contamination",
        ipa: "/krɑːs kənˌtæm.əˈneɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự nhiễm khuẩn chéo trong nhà bếp",
        detailMeaning: "Lây nhiễm vi khuẩn từ thịt sống sang rau quả.",
        collocations: ["avoid cross-contamination", "prep station"],
        example: "Separate cutting boards prevent cross-contamination between raw meat and vegetables."
      },
      {
        word: "dietary restriction",
        ipa: "/ˈdaɪ.ə.ter.i rɪˈstrɪk.ʃən/",
        pos: "Noun",
        meaning: "Chế độ ăn kiêng/mẫn cảm",
        detailMeaning: "Nhu cầu ăn chay hoặc ứng phó dị ứng hải sản/gluten.",
        collocations: ["accommodate dietary restrictions", "allergen label"],
        example: "Inform the waiter if you have any severe gluten dietary restrictions."
      },
      {
        word: "organic ingredients",
        ipa: "/ɔːrˈɡæn.ɪk ɪnˈɡriː.di.ənts/",
        pos: "Noun",
        meaning: "Nguyên liệu thực phẩm hữu cơ",
        detailMeaning: "Thực phẩm tươi sạch mua từ các trang trại địa phương.",
        collocations: ["local ingredients", "seasonal menu"],
        example: "Our autumn menu features locally sourced seasonal organic ingredients."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Sự thay đổi Thực đơn: we are excited to launch our new [Season] menu featuring + Noun",
        explanation: "Giới thiệu các món ăn mới trong thực đơn nhà hàng.",
        example: "We are excited to launch our new spring menu featuring fresh seafood.",
        sentenceId: 1
      },
      {
        title: "Cấu trúc Nhắc nhở Vệ sinh Bắt buộc: all kitchen staff must sanitize + Noun + before [Action]",
        explanation: "Quy chuẩn vệ sinh an toàn thực phẩm.",
        example: "Kitchen staff must sanitize preparation surfaces before switching tasks.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_064",
    title: "Construction Site Safety & Project Timeline Update",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Site Construction Manager",
        text: "Attention all site supervisors, here is our weekly progress and safety brief for the Plaza Tower construction site.",
        translation: "Xin chú ý tất cả các giám sát công trường, đây là điểm tin tiến độ và an toàn hàng tuần cho công trường xây dựng Tòa nhà Plaza.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ɔːl saɪt ˈsuː.pə.vaɪ.zəz hɪər ɪz ˈaʊər ˈwiːk.li ˈprəʊ.ɡres ænd ˈseɪf.ti briːf fɔːr ðə ˈplɑː.zə ˈtaʊ.ər kənˈstrʌk.ʃən saɪt/"
      },
      {
        id: 2,
        speaker: "Site Construction Manager",
        text: "Structural steel framing for floors ten through fifteen was finished yesterday, keeping us two days ahead of schedule.",
        translation: "Việc lắp dựng khung thép kết cấu cho các tầng từ 10 đến 15 đã hoàn tất vào ngày hôm qua, giúp chúng ta vượt tiến độ 2 ngày.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈstrʌk.tʃər.əl stiːl ˈfreɪm.ɪŋ fɔːr flɔːz ten θruː ˌfɪfˈtiːn wɒz ˈfɪn.ɪʃt ˈjes.tə.deɪ ˈkiːp.ɪŋ ʌs tuː deɪz əˈhed əv ˈʃed.juːl/"
      },
      {
        id: 3,
        speaker: "Site Construction Manager",
        text: "However, due to high forecasted wind speeds tomorrow, all crane operations and scaffolding assembly will be suspended.",
        translation: "Tuy nhiên, do dự báo tốc độ gió cao vào ngày mai, tất cả các hoạt động cẩu hàng và lắp dựng giàn giáo sẽ bị tạm dừng.",
        timestamp: [10.8, 16.1],
        ipa: "/haʊˈev.ər djuː tuː haɪ ˈfɔː.kɑːst.ɪd wɪnd spiːdz təˈmɒr.əʊ ɔːl kreɪn ˌɒp.ərˈeɪ.ʃənz ænd ˈskæf.əl.dɪŋ əˈsem.bli wɪl biː səˈspen.dɪd/"
      },
      {
        id: 4,
        speaker: "Site Construction Manager",
        text: "Please ensure ground crew focus on indoor concrete pouring and interior electrical wiring instead.",
        translation: "Vui lòng đảm bảo đội ngũ dưới mặt đất tập trung vào việc đổ bê tông trong nhà và đi dây điện nội thất thay thế.",
        timestamp: [16.1, 23.0],
        ipa: "/pliːz ɪnˈʃʊər ɡraʊnd kruː ˈfəʊ.kəs ɒn ˌɪnˈdɔː ˈkɒŋ.kriːt ˈpɔː.rɪŋ ænd ɪnˈtɪə.ri.ər ɪˈlek.trɪ.kəl ˈwaɪə.rɪŋ ɪnˈsted/"
      }
    ],
    vocabList: [
      {
        word: "scaffolding",
        ipa: "/ˈskæf.əl.dɪŋ/",
        pos: "Noun",
        meaning: "Giàn giáo xây dựng",
        detailMeaning: "Hệ thống khung đỡ tạm thời cho công nhân làm việc trên cao.",
        collocations: ["scaffolding assembly", "inspect scaffolding"],
        example: "Inspect all scaffolding structures before allowing workers on upper levels."
      },
      {
        word: "framing",
        ipa: "/ˈfreɪ.mɪŋ/",
        pos: "Noun",
        meaning: "Khung kết cấu thép tòa nhà",
        detailMeaning: "Dựng bộ khung chịu lực cho các tầng cao tầng.",
        collocations: ["steel framing", "structural framing"],
        example: "Completing the steel framing keeps the construction project ahead of schedule."
      },
      {
        word: "crane operations",
        ipa: "/kreɪn ˌɑː.pəˈreɪ.ʃənz/",
        pos: "Noun",
        meaning: "Hoạt động nâng cẩu vật liệu",
        detailMeaning: "Vận hành cần cẩu tháp đưa vật liệu lên cao.",
        collocations: ["suspend crane operations", "crane operator"],
        example: "High wind speeds forced the supervisor to suspend crane operations."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Tương lai Hoàn thành: will have been completed + by [Date]",
        explanation: "Cam kết mốc tiến độ thi công công trình.",
        example: "Structural framing will have been completed by the end of May.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Mệnh lệnh An toàn: ensure that all workers wear + Noun",
        explanation: "Yêu cầu đảm bảo an toàn lao động công trường.",
        example: "Ensure that all workers wear harness safety lines at elevated heights.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_063",
    title: "Air Freight Temperature-Controlled Cargo & Delivery",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Air Cargo Operations Manager",
        text: "Hello logistics team, this is an operational update regarding Express Flight 704 to London.",
        translation: "Xin chào đội ngũ logistics, đây là bản cập nhật vận hành liên quan đến Chuyến bay Chuyển phát nhanh 704 đi Luân Đôn.",
        timestamp: [0, 5.3],
        ipa: "/həˈləʊ ləˈdʒɪs.tɪks tiːm ðɪs ɪz æn ˌɒp.ərˈeɪ.ʃən.əl ʌpˈdeɪt rɪˈɡɑː.dɪŋ ɪkˈspres flaɪt ˈsev.ən-oʊ-fɔːr tuː ˈlʌn.dən/"
      },
      {
        id: 2,
        speaker: "Air Cargo Operations Manager",
        text: "All temperature-controlled pharmaceutical containers have passed pre-flight safety audits and are loaded into the cargo hold.",
        translation: "Tất cả các container dược phẩm kiểm soát nhiệt độ đã vượt qua kiểm tra an toàn trước chuyến bay và đã được đưa vào khoang hàng.",
        timestamp: [5.3, 10.8],
        ipa: "/ɔːl ˈtem.prə.tʃər-kənˈtrəʊld ˌfɑː.məˈsjuː.tɪ.kəl kənˈteɪ.nəz hæv pɑːst priː-flaɪt ˈseɪf.ti ˈɔː.dɪts ænd ɑːr ˈləʊ.dɪd ˈɪn.tuː ðə ˈkɑː.ɡəʊ həʊld/"
      },
      {
        id: 3,
        speaker: "Air Cargo Operations Manager",
        text: "Internal storage temperatures will be monitored continuously via automated satellite telemetry throughout the eight-hour flight.",
        translation: "Nhiệt độ bảo quản bên trong sẽ được giám sát liên tục qua đo đạc từ xa bằng vệ tinh tự động trong suốt chuyến bay kéo dài 8 tiếng.",
        timestamp: [10.8, 16.1],
        ipa: "/ɪnˈtɜː.nəl ˈstɔː.rɪdʒ ˈtem.prə.tʃəz wɪl biː ˈmɒn.ɪ.təd kənˈtɪn.ju.əs.li ˈvaɪə ˈɔː.tə.meɪ.tɪd ˈsæt.əl.aɪt tɪˈlem.ə.tri θruːˈaʊt ðɪ eɪt-ˈaʊər flaɪt/"
      },
      {
        id: 4,
        speaker: "Air Cargo Operations Manager",
        text: "Ground handling teams at Heathrow Airport have been notified to clear the cargo immediately upon arrival.",
        translation: "Đội ngũ xử lý mặt đất tại Sân bay Heathrow đã được thông báo để giải phóng hàng hóa ngay khi máy bay đáp xuống.",
        timestamp: [16.1, 23.0],
        ipa: "/ɡraʊnd ˈhænd.lɪŋ tiːmz æt ˌhiːθˈrəʊ ˈeə.pɔːt hæv biːn ˈnəʊ.tɪ.faɪd tuː klɪər ðə ˈkɑː.ɡəʊ ɪˈmiː.di.ət.li əˈpɒn əˈraɪ.vəl/"
      }
    ],
    vocabList: [
      {
        word: "temperature-controlled",
        ipa: "/ˈtem.pɚ.ə.tʃɚ kənˈtroʊld/",
        pos: "Adj",
        meaning: "Kiểm soát nhiệt độ bảo quản",
        detailMeaning: "Hàng container lạnh chở vắc xin và dược phẩm.",
        collocations: ["temperature-controlled cargo", "cold chain"],
        example: "Pharmaceutical products require temperature-controlled air freight containers."
      },
      {
        word: "telemetry",
        ipa: "/təˈlem.ə.tri/",
        pos: "Noun",
        meaning: "Hệ thống đo đạc dữ liệu từ xa",
        detailMeaning: "Giám sát nhiệt độ container qua định vị vệ tinh.",
        collocations: ["satellite telemetry", "automated telemetry"],
        example: "Temperatures are monitored continuously via automated satellite telemetry."
      },
      {
        word: "cargo hold",
        ipa: "/ˈkɑːr.ɡoʊ hoʊld/",
        pos: "Noun",
        meaning: "Khoang chứa hàng hóa máy bay",
        detailMeaning: "Khoang máy bay chuyên biệt đựng các kiện container lạnh.",
        collocations: ["load into cargo hold", "aircraft hold"],
        example: "The pharmaceutical containers were carefully loaded into the aircraft cargo hold."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Thì Hiện tại Tiếp diễn: is currently being loaded + into",
        explanation: "Báo cáo tiến độ bốc xếp hàng hóa lên máy bay.",
        example: "Cargo is currently being loaded into the climate-controlled hold.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Cam kết Thời gian: guarantees delivery within + Time",
        explanation: "Cam kết tốc độ giải phóng hàng tại sân bay đến.",
        example: "Our express service guarantees delivery within twenty-four hours.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_062",
    title: "Residential Property Open House & Mortgage Options",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Real Estate Broker",
        text: "Good morning prospective buyers, welcome to the open house showcase for Mapleside Estates.",
        translation: "Chào buổi sáng các người mua tiềm năng, chào mừng đến với buổi tham quan căn hộ mẫu tại Mapleside Estates.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ prəˈspek.tɪv ˈbaɪ.əz ˈwel.kəm tuː ðɪ ˈəʊ.pən haʊs ˈʃəʊ.keɪs fɔːr ˈmeɪ.pəl.saɪd ɪˈsteɪts/"
      },
      {
        id: 2,
        speaker: "Real Estate Broker",
        text: "This newly constructed two-story home features four spacious bedrooms, energy-efficient appliances, and a private backyard.",
        translation: "Căn nhà hai tầng mới xây này có bốn phòng ngủ rộng rãi, các thiết bị tiết kiệm năng lượng và sân sau riêng tư.",
        timestamp: [5.3, 10.8],
        ipa: "/ðɪs ˈnjuː.li kənˈstrʌk.tɪd tuː-ˈstɔː.ri həʊm ˈfiː.tʃəz fɔːr ˈspeɪ.ʃəs ˈbed.ruːmz ˈen.ə.dʒi-ɪˈfɪʃ.ənt əˈplaɪ.əns.ɪz ænd ə ˈpraɪ.vət ˌbækˈjɑːd/"
      },
      {
        id: 3,
        speaker: "Real Estate Broker",
        text: "Our preferred lending partners are stationed in the living room today to offer free mortgage consultations.",
        translation: "Các đối tác cho vay ưu tiên của chúng tôi đang có mặt tại phòng khách hôm nay để tư vấn khoản vay thế chấp miễn phí.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈaʊər prɪˈfɜːd ˈlend.ɪŋ ˈpɑːt.nəz ɑːr ˈsteɪ.ʃənd ɪn ðə ˈlɪv.ɪŋ ruːm təˈdeɪ tuː ˈɒf.ər friː ˈmɔː.ɡɪdʒ ˌkɒn.sʌlˈteɪ.ʃənz/"
      },
      {
        id: 4,
        speaker: "Real Estate Broker",
        text: "If you submit a purchase offer before 5 PM today, the developer will cover all closing costs.",
        translation: "Nếu quý vị nộp đề nghị mua trước 5 giờ chiều nay, nhà phát triển sẽ chi trả toàn bộ chi phí hoàn tất thủ tục.",
        timestamp: [16.1, 23.0],
        ipa: "/ɪf juː səbˈmɪt ə ˈpɜː.tʃəs ˈɒf.ər bɪˈfɔː faɪv piː-em təˈdeɪ ðə dɪˈvel.ə.pər wɪl ˈkʌv.ər ɔːl ˈkləʊ.zɪŋ kɒsts/"
      }
    ],
    vocabList: [
      {
        word: "open house",
        ipa: "/ˈoʊ.pən haʊs/",
        pos: "Noun",
        meaning: "Sự kiện mở cửa cho khách xem nhà",
        detailMeaning: "Buổi tiếp đón người mua nhà đến tham quan trực tiếp.",
        collocations: ["open house showcase", "hold an open house"],
        example: "The real estate agency is holding an open house this Sunday."
      },
      {
        word: "mortgage",
        ipa: "/ˈmɔːr.ɡɪdʒ/",
        pos: "Noun",
        meaning: "Khoản vay thế chấp mua nhà",
        detailMeaning: "Gói vay ngân hàng mua nhà trả góp hàng tháng.",
        collocations: ["mortgage consultation", "preferred lending partner"],
        example: "Buyers can choose between fixed-rate and adjustable-rate mortgages."
      },
      {
        word: "closing costs",
        ipa: "/ˈkloʊ.zɪŋ kɑːsts/",
        pos: "Noun",
        meaning: "Chi phí hoàn tất thủ tục sang tên",
        detailMeaning: "Phí công chứng và làm giấy tờ sổ đỏ khi mua nhà.",
        collocations: ["cover closing costs", "submit purchase offer"],
        example: "The seller agreed to cover all closing costs for the homebuyer."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Mời tham gia sự kiện: you are cordially invited to attend + Event",
        explanation: "Lời mời tham gia sự kiện xem nhà thương mại.",
        example: "You are cordially invited to attend our weekend open house showcase.",
        sentenceId: 1
      },
      {
        title: "Cấu trúc Bị động Điều kiện Ưu đãi: qualifying buyers will be offered + Benefit",
        explanation: "Ưu đãi chi trả toàn bộ phí làm sổ đỏ nếu chốt giao dịch sớm.",
        example: "Qualifying buyers will be offered reduced closing cost rates.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_061",
    title: "Customer Support Resolution & Refund Processing",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Customer Care Lead",
        text: "Hello Ms. Adams, this is Eric from Client Support following up on ticket number 8902 regarding your order.",
        translation: "Xin chào bà Adams, đây là Eric từ Bộ phận Hỗ trợ Khách hàng theo dõi mã yêu cầu số 8902 liên quan đến đơn hàng của bà.",
        timestamp: [0, 5.2],
        ipa: "/həˈləʊ ˈmɪz ˈæd.əmz ðɪs ɪz ˈer.ɪk frəm ˈklaɪ.ənt səˈpɔːt ˈfɒl.əʊ.ɪŋ ʌp ɒn ˈtɪk.ɪt ˈnʌm.bər ˈeɪt-naɪn-oʊ-tuː rɪˈɡɑː.dɪŋ jɔːr ˈɔː.dər/"
      },
      {
        id: 2,
        speaker: "Customer Care Lead",
        text: "We sincerely apologize for the shipping discrepancy where an incorrect item size was delivered to your address last week.",
        translation: "Chúng tôi chân thành xin lỗi vì sự sai sót trong vận chuyển khi một sản phẩm sai kích thước đã được giao đến địa chỉ của bà tuần trước.",
        timestamp: [5.2, 10.7],
        ipa: "/wiː sɪnˈsɪə.li əˈpɒl.ə.dʒaɪz fɔːr ðə ˈʃɪp.ɪŋ dɪˈskrep.ən.si weər æn ˌɪn.kəˈrekt ˈaɪ.təm saɪz wɒz dɪˈlɪv.əd tuː jɔːr əˈdres lɑːst wiːk/"
      },
      {
        id: 3,
        speaker: "Customer Care Lead",
        text: "A replacement item in the correct size has been dispatched today via express courier at no additional cost.",
        translation: "Sản phẩm thay thế đúng kích thước đã được gửi đi hôm nay qua dịch vụ chuyển phát nhanh mà không tốn thêm bất kỳ chi phí nào.",
        timestamp: [10.7, 16.1],
        ipa: "/ə rɪˈpleɪs.mənt ˈaɪ.təm ɪn ðə kəˈrekt saɪz hæz biːn dɪˈspætʃt təˈdeɪ ˈvaɪə ɪkˈspres ˈkʊr.i.ər æt nəʊ əˈdɪʃ.ən.əl kɒst/"
      },
      {
        id: 4,
        speaker: "Customer Care Lead",
        text: "In addition, we have issued a twenty-dollar store voucher to your online account for future purchases.",
        translation: "Ngoài ra, chúng tôi đã phát hành một phiếu giảm giá 20 đô la vào tài khoản trực tuyến của bà cho các lần mua sắm trong tương lai.",
        timestamp: [16.1, 23.0],
        ipa: "/ɪn əˈdɪʃ.ən wiː hæv ˈɪʃ.uːd ə ˈtwen.ti-ˈdɒl.ər stɔːr ˈvaʊ.tʃər tuː jɔːr ˈɒn.laɪn əˈkaʊnt fɔːr ˈfjuː.tʃər ˈpɜː.tʃəs.ɪz/"
      }
    ],
    vocabList: [
      {
        word: "resolution",
        ipa: "/ˌrez.əˈluː.ʃən/",
        pos: "Noun",
        meaning: "Sự giải quyết khiếu nại",
        detailMeaning: "Xử lý triệt để thỏa đáng sự cố từ phía khách hàng.",
        collocations: ["swift resolution", "customer resolution"],
        example: "Our goal is to achieve swift resolution for all customer inquiries."
      },
      {
        word: "discrepancy",
        ipa: "/dɪˈskrep.ən.si/",
        pos: "Noun",
        meaning: "Sự sai sót đơn hàng",
        detailMeaning: "Sự khác biệt ngoài ý muốn trong đơn hàng giao.",
        collocations: ["shipping discrepancy", "billing discrepancy"],
        example: "We apologize for the billing discrepancy on your monthly statement."
      },
      {
        word: "store credit",
        ipa: "/stɔːr ˈkred.ɪt/",
        pos: "Noun",
        meaning: "Tiền tín dụng mua hàng",
        detailMeaning: "Phiếu hoặc tài khoản voucher bù đắp cho khách hàng.",
        collocations: ["issue store credit", "store voucher"],
        example: "Customers can choose between a full refund or store credit."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Xin lỗi và Đưa ra Giải pháp: we sincerely apologize for [Issue] and have processed [Action]",
        explanation: "Mẫu câu ứng xử chuyên nghiệp trong dịch vụ khách hàng.",
        example: "We apologize for the delay and have issued a full refund.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Khảo sát Hài lòng: please take a moment to complete + Noun",
        explanation: "Mời khách hàng đánh giá sau khi xử lý khiếu nại.",
        example: "Please take a moment to complete our short feedback survey.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_060",
    title: "Cruise Ship Itinerary Modification & Shore Excursions",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Cruise Director",
        text: "Good morning valued guests, this is your Cruise Director with an important announcement regarding our sailing itinerary.",
        translation: "Chào buổi sáng quý khách hàng thân thiết, đây là Giám đốc Chuyến hải trình với thông báo quan trọng liên quan đến lịch trình di chuyển của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈvæl.juːd ɡests ðɪs ɪz jɔːr kruːz dɪˈrek.tər wɪð æn ɪmˈpɔː.tənt əˈnaʊns.mənt rɪˈɡɑː.dɪŋ ˈaʊər ˈseɪl.ɪŋ aɪˈtɪn.ər.ər.i/"
      },
      {
        id: 2,
        speaker: "Cruise Director",
        text: "Due to unfavorable weather conditions in the region, our planned stop at St. Thomas tomorrow has been canceled for safety.",
        translation: "Do điều kiện thời tiết không thuận lợi trong khu vực, điểm dừng chân dự kiến tại St. Thomas vào ngày mai đã bị hủy vì lý do an toàn.",
        timestamp: [5.3, 10.8],
        ipa: "/djuː tuː ʌnˈfeɪ.vər.ə.bəl ˈweð.ər kənˈdɪʃ.ənz ɪn ðə ˈriː.dʒən ˈaʊər plænd stɒp æt seɪnt ˈtɒm.əs təˈmɒr.əʊ hæz biːn ˈkæn.səld fɔːr ˈseɪf.ti/"
      },
      {
        id: 3,
        speaker: "Cruise Director",
        text: "Instead, we will spend an extended day at sea before arriving at our final port of call in San Juan on Friday.",
        translation: "Thay vào đó, chúng ta sẽ dành thêm một ngày trên biển trước khi đến cảng dừng chân cuối cùng ở San Juan vào Thứ Sáu.",
        timestamp: [10.8, 16.1],
        ipa: "/ɪnˈsted wiː wɪl spend æn ɪkˈstend.ɪd deɪ æt siː bɪˈfɔːr əˈraɪv.ɪŋ æt ˈaʊər ˈfaɪ.nəl pɔːt əv kɔːl ɪn sæn hwɑːn ɒn ˈfraɪ.deɪ/"
      },
      {
        id: 4,
        speaker: "Cruise Director",
        text: "All pre-booked shore excursion fees for St. Thomas will be automatically credited to your onboard accounts today.",
        translation: "Tất cả chi phí chuyến tham quan bờ biển đã đặt trước cho St. Thomas sẽ được tự động hoàn lại vào tài khoản trên tàu của quý vị trong hôm nay.",
        timestamp: [16.1, 23.0],
        ipa: "/ɔːl priː-bʊkt ʃɔːr ɪkˈskɜː.ʃən fiːz fɔːr seɪnt ˈtɒm.əs wɪl biː ˌɔː.təˈmæt.ɪk.li ˈkred.ɪ.tɪd tuː jɔːr ˈɒn.bɔːd əˈkaʊnts təˈdeɪ/"
      }
    ],
    vocabList: [
      {
        word: "itinerary",
        ipa: "/aɪˈtɪn.ə.rer.i/",
        pos: "Noun",
        meaning: "Hành trình, lịch trình",
        detailMeaning: "Danh sách địa điểm và thời gian cập cảng của tàu.",
        collocations: ["sailing itinerary", "alter itinerary"],
        example: "Severe sea conditions forced the captain to alter our sailing itinerary."
      },
      {
        word: "excursion",
        ipa: "/ɪkˈskɝː.ʒən/",
        pos: "Noun",
        meaning: "Chuyến tham quan bờ biển",
        detailMeaning: "Tour du lịch ngắn hạn trên đất liền khi tàu cập bến.",
        collocations: ["shore excursion", "excursion fees"],
        example: "Passengers can book shore excursions at the guest services desk."
      },
      {
        word: "port of call",
        ipa: "/pɔːrt əv kɑːl/",
        pos: "Noun",
        meaning: "Cảng dừng chân",
        detailMeaning: "Điểm dừng trong hải trình của du thuyền.",
        collocations: ["final port of call", "next port of call"],
        example: "Our next port of call will be the island of Cozumel."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Sự Thay đổi Lịch trình: due to unfavorable weather, our visit to [Place] has been replaced with [Place]",
        explanation: "Thông báo điều chỉnh lịch trình du lịch do thời tiết.",
        example: "Due to rough seas, our stop in Nassau has been replaced with Freeport.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Tự động Hoàn tiền: refunds will be credited directly to + Account",
        explanation: "Cam kết xử lý hoàn tiền tự động.",
        example: "Excursion fees will be credited directly to your onboard account.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_059",
    title: "Electric Vehicle Battery Manufacturing & Assembly Line",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1558441719-443b38631ad9?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "EV Plant Operations Director",
        text: "Good morning engineers, I am pleased to share a major milestone achieved at our electric vehicle battery plant.",
        translation: "Chào buổi sáng các kỹ sư, tôi rất vui mừng được chia sẻ một cột mốc quan trọng đạt được tại nhà máy sản xuất pin xe điện của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˌen.dʒɪˈnɪəz aɪ æm pliːzd tuː ʃeər ə ˈmeɪ.dʒər ˈmaɪl.stəʊn əˈtʃiːvd æt ˈaʊər ɪˈlek.trɪk ˈviː.ə.kəl ˈbæt.ər.i plɑːnt/"
      },
      {
        id: 2,
        speaker: "EV Plant Operations Director",
        text: "By integrating advanced robotic assembly cells, we have increased our daily lithium-ion pack throughput by twenty-five percent.",
        translation: "Bằng cách tích hợp các ô lắp ráp robot tiên tiến, chúng ta đã tăng năng suất bộ pin lithium-ion hàng ngày lên 25%.",
        timestamp: [5.3, 10.8],
        ipa: "/baɪ ˈɪn.tɪ.ɡreɪt.ɪŋ ədˈvɑːnst rəʊˈbɒt.ɪk əˈsem.bli selz wiː hæv ɪnˈkriːst ˈaʊər ˈdeɪ.li ˌlɪθ.i.əm-ˈaɪ.ɒn pæk ˈθruː.pʊt baɪ ˈtwen.ti-faɪv pəˈsent/"
      },
      {
        id: 3,
        speaker: "EV Plant Operations Director",
        text: "Furthermore, our defect testing failure rate dropped to an all-time low of point zero two percent this quarter.",
        translation: "Hơn nữa, tỷ lệ lỗi trong kiểm tra sản phẩm của chúng ta đã giảm xuống mức thấp kỷ lục là 0,02% trong quý này.",
        timestamp: [10.8, 16.1],
        ipa: "/ˌfɜː.ðəˈmɔːr ˈaʊər ˈdiː.fekt ˈtest.ɪŋ ˈfeɪ.ljər reɪt drɒpt tuː æn ɔːl-taɪm ləʊ əv pɔɪnt ˈzɪə.rəʊ tuː pəˈsent ðɪs ˈkwɔː.tər/"
      },
      {
        id: 4,
        speaker: "EV Plant Operations Director",
        text: "We will launch a second production shift starting next month to fulfill contract orders for two major automotive manufacturers.",
        translation: "Chúng ta sẽ triển khai ca sản xuất thứ hai bắt đầu từ tháng tới để hoàn tất các đơn đặt hàng theo hợp đồng cho hai nhà sản xuất ô tô lớn.",
        timestamp: [16.1, 23.0],
        ipa: "/wiː wɪl lɔːntʃ ə ˈsek.ənd prəˈdʌk.ʃən ʃɪft ˈstɑː.tɪŋ nekst mʌnθ tuː fʊlˈfɪl ˈkɒn.trækt ˈɔː.dəz fɔːr tuː ˈmeɪ.dʒər ˌɔː.təˈməʊ.tɪv ˌmæn.jəˈfæk.tʃər.əz/"
      }
    ],
    vocabList: [
      {
        word: "lithium-ion",
        ipa: "/ˌlɪθ.i.əm ˈaɪ.ɑːn/",
        pos: "Noun / Adj",
        meaning: "Pin lithium-ion",
        detailMeaning: "Công nghệ pin điện dung lượng cao chuyên cho xe điện.",
        collocations: ["lithium-ion battery pack", "battery module"],
        example: "The facility specializes in assembling high-density lithium-ion battery packs."
      },
      {
        word: "throughput",
        ipa: "/ˈθruː.pʊt/",
        pos: "Noun",
        meaning: "Năng suất sản xuất",
        detailMeaning: "Khối lượng bộ pin hoàn thành trong một ca.",
        collocations: ["daily throughput", "increase throughput"],
        example: "Upgrading robotic arms increased daily battery pack throughput by twenty percent."
      },
      {
        word: "quality control",
        ipa: "/ˈkwɑː.lə.t̬i kənˈtroʊl/",
        pos: "Noun",
        meaning: "Kiểm soát chất lượng",
        detailMeaning: "Thử nghiệm khắt khe tiêu chuẩn an toàn cháy nổ pin.",
        collocations: ["quality control testing", "quality assurance"],
        example: "Every battery module undergoes rigorous quality control testing."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Tiến độ Sản xuất: has expanded production capacity to + Quantity",
        explanation: "Báo cáo tăng trưởng công suất nhà máy.",
        example: "The plant has expanded production capacity to five thousand units per month.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Chỉ Mục đích: is designed to meet growing demand for + Noun",
        explanation: "Giải thích lý do mở rộng dây chuyền sản xuất pin.",
        example: "The new line is designed to meet growing demand for electric SUVs.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_058",
    title: "Workplace Safety Audit & Personal Protective Equipment",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Safety Compliance Officer",
        text: "Attention all plant personnel, this is an urgent announcement from the Environment and Safety Department.",
        translation: "Xin chú ý toàn thể nhân viên nhà máy, đây là thông báo khẩn cấp từ Bộ phận Môi trường và An toàn Lao động.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ɔːl plɑːnt ˌpɜː.sənˈel ðɪs ɪz æn ˈɜː.dʒənt əˈnaʊns.mənt frəm ðə ɪnˈvaɪ.rən.mənt ænd ˈseɪf.ti dɪˈpɑːt.mənt/"
      },
      {
        id: 2,
        speaker: "Safety Compliance Officer",
        text: "Following an unannounced safety inspection, all workers are reminded that high-visibility vests and steel-toe boots are mandatory.",
        translation: "Sau một buổi kiểm tra an toàn đột xuất, tất cả công nhân được nhắc nhở rằng áo phản quang và giày bảo hộ mũi thép là bắt buộc.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈfɒl.əʊ.ɪŋ æn ˌʌn.əˈnaʊnst ˈseɪf.ti ɪnˈspek.ʃən ɔːl ˈwɜː.kəz ɑːr rɪˈmaɪn.dɪd ðæt haɪ-ˌvɪz.əˈbɪl.ə.ti vests ænd stiːl-təʊ buːts ɑːr ˈmæn.də.tər.i/"
      },
      {
        id: 3,
        speaker: "Safety Compliance Officer",
        text: "These regulations apply everywhere inside the active loading dock and machinery manufacturing zones without exception.",
        translation: "Các quy định này áp dụng tại mọi nơi bên trong khu vực bốc dỡ hàng và khu vực sản xuất máy móc mà không có ngoại lệ.",
        timestamp: [10.8, 16.0],
        ipa: "/ðiːz ˌreɡ.jəˈleɪ.ʃənz əˈplaɪ ˈev.ri.weər ɪnˈsaɪd ðə ˈæk.tɪv ˈləʊd.ɪŋ dɒk ænd məˈʃiːn.ər.i ˌmæn.jəˈfæk.tʃə.rɪŋ zəʊnz wɪðˈaʊt ɪkˈsep.ʃən/"
      },
      {
        id: 4,
        speaker: "Safety Compliance Officer",
        text: "Anyone found without required protective gear will be temporarily suspended from the floor pending safety review.",
        translation: "Bất kỳ ai bị phát hiện không mang thiết bị bảo hộ theo quy định sẽ bị tạm thời đình chỉ làm việc để chờ xem xét an toàn.",
        timestamp: [16.0, 23.0],
        ipa: "/ˈen.i.wʌn faʊnd wɪðˈaʊt rɪˈkwaɪəd prəˈtek.tɪv ɡɪər wɪl biː ˈtem.pər.ər.əl.i səˈspen.dɪd frəm ðə flɔːr ˈpen.dɪŋ ˈseɪf.ti rɪˈvjuː/"
      }
    ],
    vocabList: [
      {
        word: "Personal Protective Equipment",
        ipa: "/ˈpɜːr.sən.əl prəˈtek.tɪv ɪˈkwɪp.mənt/",
        pos: "Noun (PPE)",
        meaning: "Thiết bị bảo hộ cá nhân",
        detailMeaning: "Trang phục và thiết bị an toàn bảo vệ công nhân.",
        collocations: ["wear PPE", "required PPE"],
        example: "Wearing required PPE is mandatory inside the chemical processing zone."
      },
      {
        word: "compliance",
        ipa: "/kəmˈplaɪ.əns/",
        pos: "Noun",
        meaning: "Sự tuân thủ quy định an toàn",
        detailMeaning: "Tuân thủ tiêu chuẩn an toàn lao động quốc gia.",
        collocations: ["safety compliance", "full compliance"],
        example: "Regular safety audits guarantee full compliance with government regulations."
      },
      {
        word: "hazard",
        ipa: "/ˈhæz.ɚd/",
        pos: "Noun",
        meaning: "Mối nguy hiểm, rủi ro",
        detailMeaning: "Yếu tố đe dọa an toàn trong xưởng sản xuất.",
        collocations: ["safety hazard", "tripping hazard"],
        example: "Report any potential tripping hazards to the maintenance team immediately."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Mệnh lệnh Bắt buộc: all employees must wear + Noun + at all times",
        explanation: "Quy định quy chuẩn bảo hộ lao động.",
        example: "All personnel must wear safety helmets at all times inside the warehouse.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Điều kiện: violators will be subject to + Noun",
        explanation: "Chế tài xử phạt nếu vi phạm quy định an toàn.",
        example: "Violators will be subject to formal disciplinary action.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_057",
    title: "Supermarket Supply Chain & Shelf Inventory Management",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Retail Operations Manager",
        text: "Attention all floor supervisors, here is a quick operational update regarding our fresh produce section.",
        translation: "Xin chú ý toàn thể các giám sát ca, đây là thông báo cập nhật vận hành nhanh liên quan đến khu vực thực phẩm tươi sống.",
        timestamp: [0, 5.2],
        ipa: "/əˈten.ʃən ɔːl flɔːr ˈsuː.pə.vaɪ.zəz hɪər ɪz ə kwɪk ˌɒp.ərˈeɪ.ʃən.əl ʌpˈdeɪt rɪˈɡɑː.dɪŋ ˈaʊər freʃ ˈprɒd.juːs ˈsek.ʃən/"
      },
      {
        id: 2,
        speaker: "Retail Operations Manager",
        text: "To minimize waste of perishable items, we are implementing an automated inventory replenishment system starting today.",
        translation: "Để giảm thiểu hao hụt các mặt hàng dễ hư hỏng, chúng ta sẽ triển khai hệ thống bổ sung hàng hóa tự động bắt đầu từ hôm nay.",
        timestamp: [5.2, 10.7],
        ipa: "/tuː ˈmɪn.ɪ.maɪz weɪst əv ˈper.ɪ.ʃə.bəl ˈaɪ.təmz wiː ɑːr ˈɪm.plɪ.ment.ɪŋ æn ˈɔː.tə.meɪ.tɪd ˈɪn.vən.tər.i rɪˈplen.ɪʃ.mənt ˈsɪs.təm ˈstɑː.tɪŋ təˈdeɪ/"
      },
      {
        id: 3,
        speaker: "Retail Operations Manager",
        text: "Floor staff must scan item barcodes whenever restocking display shelves to ensure accuracy in central stock counts.",
        translation: "Nhân viên gian hàng phải quét mã vạch sản phẩm mỗi khi chất thêm hàng lên kệ trưng bày để đảm bảo độ chính xác của số lượng tồn kho trung tâm.",
        timestamp: [10.7, 16.1],
        ipa: "/flɔːr stɑːf mʌst skæn ˈaɪ.təm ˈbɑː.kəʊdz wenˈev.ər ˌriːˈstɒk.ɪŋ dɪˈspleɪ ʃelvz tuː ɪnˈʃʊər ˈæk.jə.rə.si ɪn ˈsen.trəl stɒk kaʊnts/"
      },
      {
        id: 4,
        speaker: "Retail Operations Manager",
        text: "Mandatory fifteen-minute training sessions on the new handheld scanners will take place in the breakroom at 2 PM.",
        translation: "Các buổi đào tạo 15 phút bắt buộc về máy quét cầm tay mới sẽ diễn ra tại phòng nghỉ vào lúc 2 giờ chiều.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈmæn.də.tər.i ˌfɪfˈtiːn-ˈmɪn.ɪt ˈtreɪn.ɪŋ ˈseʃ.ənz ɒn ðə njuː ˈhænd.held ˈskæn.əz wɪl teɪk pleɪs ɪn ðə ˈbreɪk.ruːm æt tuː piː-em/"
      }
    ],
    vocabList: [
      {
        word: "perishable",
        ipa: "/ˈper.ɪ.ʃə.bəl/",
        pos: "Adj",
        meaning: "Dễ hư hỏng",
        detailMeaning: "Hàng thực phẩm tươi sống có thời hạn sử dụng ngắn.",
        collocations: ["perishable goods", "perishable items"],
        example: "Perishable goods must be stored in refrigerated units immediately."
      },
      {
        word: "replenishment",
        ipa: "/rɪˈplen.ɪʃ.mənt/",
        pos: "Noun",
        meaning: "Sự bổ sung hàng hóa",
        detailMeaning: "Chất thêm hàng lên kệ siêu thị tự động.",
        collocations: ["inventory replenishment", "shelf replenishment"],
        example: "Overnight shelf replenishment ensures full availability for morning shoppers."
      },
      {
        word: "automated tracking",
        ipa: "/ˌɑː.t̬ə.meɪ.t̬ɪd ˈtræk.ɪŋ/",
        pos: "Noun",
        meaning: "Theo dõi tồn kho tự động",
        detailMeaning: "Báo động tự động khi mặt hàng trên kệ hết.",
        collocations: ["automated tracking system", "barcode tracking"],
        example: "Automated tracking alerts staff when product inventory runs low."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Quy trình Bắt buộc: all store staff are required to check + Noun",
        explanation: "Quy trình kiểm tra hạn sử dụng thực phẩm siêu thị.",
        example: "Staff are required to check expiration dates twice daily.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Điều kiện Tự động: once stock drops below [Level], an order is triggered",
        explanation: "Quy trình tự động hóa chuỗi cung ứng siêu thị.",
        example: "An order is triggered once inventory falls below twenty units.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_056",
    title: "Agricultural Commodities Market & Grain Export Limits",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Commodity Market Analyst",
        text: "Hello commodity traders, here is your daily market report on international agricultural grain futures.",
        translation: "Xin chào các nhà giao dịch hàng hóa, đây là bản tin thị trường hàng ngày về hợp đồng tương lai nông sản quốc tế.",
        timestamp: [0, 5.2],
        ipa: "/həˈləʊ kəˈmɒd.ə.ti ˈtreɪ.dəz hɪər ɪz jɔːr ˈdeɪ.li ˈmɑː.kɪt rɪˈpɔːt ɒn ˌɪn.təˈnæʃ.ən.əl ˌæɡ.rɪˈkʌl.tʃər.əl ɡreɪn ˈfjuː.tʃəz/"
      },
      {
        id: 2,
        speaker: "Commodity Market Analyst",
        text: "Wheat prices surged by eight percent this morning following news of unexpected drought conditions in South America.",
        translation: "Giá lúa mì đã tăng vọt 8% vào sáng nay sau tin tức về tình trạng hạn hán bất ngờ tại Nam Mỹ.",
        timestamp: [5.2, 10.7],
        ipa: "/wiːt praɪsɪz sɜːdʒd baɪ eɪt pəˈsent ðɪs ˈmɔː.nɪŋ ˈfɒl.əʊ.ɪŋ njuːz əv ˌʌn.ɪkˈspek.tɪd draʊt kənˈdɪʃ.ənz ɪn saʊθ əˈmer.ɪ.kə/"
      },
      {
        id: 3,
        speaker: "Commodity Market Analyst",
        text: "In response, major exporting nations have introduced seasonal export quotas to stabilize domestic food supplies.",
        translation: "Để ứng phó, các quốc gia xuất khẩu lớn đã áp dụng hạn ngạch xuất khẩu theo mùa nhằm ổn định nguồn cung thực phẩm trong nước.",
        timestamp: [10.7, 16.1],
        ipa: "/ɪn rɪˈspɒns ˈmeɪ.dʒər ɪkˈspɔːt.ɪŋ ˈneɪ.ʃənz hæv ˌɪn.trəˈdjuːst ˈsiː.zən.əl ˈek.spɔːt ˈkwəʊ.təz tuː ˈsteɪ.bɪ.laɪz dəˈmes.tɪk fuːd səˈplaɪz/"
      },
      {
        id: 4,
        speaker: "Commodity Market Analyst",
        text: "Analysts predict that grain price volatility will remain high until official harvest projections are released next Tuesday.",
        translation: "Các nhà phân tích dự báo sự biến động giá ngũ cốc sẽ tiếp tục ở mức cao cho đến khi báo cáo dự báo thu hoạch chính thức được công bố vào Thứ Ba tuần tới.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈæn.əl.ɪsts prɪˈdɪkt ðæt ɡreɪn praɪs ˌvɒl.əˈtɪl.ə.ti wɪl rɪˈmeɪn haɪ ənˈtɪl əˈfɪʃ.əl ˈhɑː.vɪst prəˈdʒek.ʃənz ɑːr rɪˈliːst nekst ˈtjuːz.deɪ/"
      }
    ],
    vocabList: [
      {
        word: "commodity",
        ipa: "/kəˈmɑː.də.t̬i/",
        pos: "Noun",
        meaning: "Hàng hóa thương phẩm",
        detailMeaning: "Nông sản và khoáng sản giao dịch trên sàn hàng hóa.",
        collocations: ["agricultural commodity", "commodity market"],
        example: "Wheat and soybeans are key agricultural commodities traded globally."
      },
      {
        word: "quota",
        ipa: "/ˈkwoʊ.t̬ə/",
        pos: "Noun",
        meaning: "Hạn ngạch xuất nhập khẩu",
        detailMeaning: "Giới hạn khối lượng xuất khẩu nông sản.",
        collocations: ["export quota", "seasonal quota"],
        example: "The government imposed a seasonal export quota on grain shipments."
      },
      {
        word: "fluctuation",
        ipa: "/ˌflʌk.tʃuˈeɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự biến động giá cả",
        detailMeaning: "Mức độ tăng giảm giá nông sản do thời tiết.",
        collocations: ["price fluctuation", "market fluctuation"],
        example: "Severe droughts caused dramatic fluctuations in crop market prices."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Nguyên nhân - Tác động Giá: due to severe drought, prices have surged by + Percentage",
        explanation: "Giải thích nguyên nhân biến động giá hàng hóa.",
        example: "Grain prices have surged by fifteen percent due to poor harvests.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Thông báo Chính sách: the ministry has announced a quota of + Quantity",
        explanation: "Trình bày quy định quản lý hạn ngạch xuất khẩu.",
        example: "The ministry has announced a quota of two million metric tons.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_055",
    title: "5G Infrastructure Expansion & Fiber Optic Network",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Telecom Network Director",
        text: "Good afternoon shareholders, I am pleased to share an update on our regional telecommunications network upgrade.",
        translation: "Chào buổi chiều các cổ đông, tôi rất hân hạnh được chia sẻ thông tin cập nhật về việc nâng cấp mạng viễn thông khu vực của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˌɑːf.təˈnuːn ˈʃeəˌhəʊl.dəz aɪ æm pliːzd tuː ʃeər æn ʌpˈdeɪt ɒn ˈaʊər ˈriː.dʒən.əl ˌtel.ɪ.kə-mjuː.nɪˈkeɪ.ʃənz ˈnet.wɜːk ʌpˈɡreɪd/"
      },
      {
        id: 2,
        speaker: "Telecom Network Director",
        text: "Over the past quarter, our engineering team installed two hundred new 5G cellular towers across the metro area.",
        translation: "Trong quý qua, đội ngũ kỹ thuật của chúng tôi đã lắp đặt 200 trạm phát sóng 5G mới trên khắp khu vực đô thị.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈəʊ.vər ðə pɑːst ˈkwɔː.tər ˈaʊər ˌen.dʒɪˈnɪə.rɪŋ tiːm ɪnˈstɔːld tuː ˈhʌn.drəd njuː faɪv-dʒiː ˈsel.jə.lər ˈtaʊ.əz əˈkrɒs ðə ˈmet.rəʊ ˈeə.ri.ə/"
      },
      {
        id: 3,
        speaker: "Telecom Network Director",
        text: "This infrastructure expansion has expanded high-speed mobile data coverage to an additional three hundred thousand residents.",
        translation: "Việc mở rộng hạ tầng này đã mở rộng vùng phủ sóng dữ liệu di động tốc độ cao tới thêm 300.000 người dân.",
        timestamp: [10.8, 16.1],
        ipa: "/ðɪs ˈɪn.frəˌstrʌk.tʃər ɪkˈspæn.ʃən hæz ɪkˈspæn.dɪd haɪ-spiːd ˈməʊ.baɪl ˈdeɪ.tə ˈkʌv.ər.ɪdʒ tuː æn əˈdɪʃ.ən.əl θriː ˈhʌn.drəd ˈθaʊ.zənd ˈrez.ɪ.dənts/"
      },
      {
        id: 4,
        speaker: "Telecom Network Director",
        text: "Next month, we will begin upgrading our backbone fiber optic cables to support growing enterprise bandwidth demands.",
        translation: "Tháng tới, chúng tôi sẽ bắt đầu nâng cấp hệ thống cáp quang trục chính để đáp ứng nhu cầu băng thông doanh nghiệp đang gia tăng.",
        timestamp: [16.1, 23.0],
        ipa: "/nekst mʌnθ wiː wɪl bɪˈɡɪn ʌpˈɡreɪd.ɪŋ ˈaʊər ˈbæk.bəʊn ˈfaɪ.bər ˈɒp.tɪk ˈkeɪ.bəlz tuː səˈpɔːt ˈɡrəʊ.ɪŋ ˈen.tə.praɪz ˈbænd.wɪdθ dɪˈmɑːndz/"
      }
    ],
    vocabList: [
      {
        word: "bandwidth",
        ipa: "/ˈbænd.wɪdθ/",
        pos: "Noun",
        meaning: "Băng thông mạng",
        detailMeaning: "Tốc độ và dung lượng truyền dữ liệu qua mạng.",
        collocations: ["network bandwidth", "enterprise bandwidth"],
        example: "Upgrading fiber optic lines increases network bandwidth significantly."
      },
      {
        word: "coverage",
        ipa: "/ˈkʌv.ɚ.ɪdʒ/",
        pos: "Noun",
        meaning: "Vùng phủ sóng",
        detailMeaning: "Phạm vi kết nối mạng di động.",
        collocations: ["mobile data coverage", "5G coverage"],
        example: "The expansion project aims to broaden 5G coverage across rural districts."
      },
      {
        word: "infrastructure",
        ipa: "/ˈɪn.frəˌstrʌk.tʃɚ/",
        pos: "Noun",
        meaning: "Hạ tầng kỹ thuật viễn thông",
        detailMeaning: "Hệ thống trạm phát sóng và mạng cáp quang.",
        collocations: ["telecom infrastructure", "infrastructure expansion"],
        example: "Investing in modern telecom infrastructure enhances data connection stability."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Tiến độ Dự án: has successfully deployed + Noun + in [Place]",
        explanation: "Báo cáo kết quả mở rộng hạ tầng viễn thông.",
        example: "The company has successfully deployed new 5G towers in downtown areas.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Diễn tả Mục tiêu Hiệu năng: designed to deliver speeds up to + Metric",
        explanation: "Mô tả thông số tốc độ của mạng cáp quang.",
        example: "The fiber network is designed to deliver speeds up to 1 Gbps.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_054",
    title: "Global Supply Chain Audit & Supplier Compliance",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Supply Chain Vice President",
        text: "Good morning management team, I would like to review our global supply chain sustainability goals for next year.",
        translation: "Chào buổi sáng ban quản lý, tôi muốn điểm qua các mục tiêu phát triển bền vững chuỗi cung ứng toàn cầu cho năm tới.",
        timestamp: [0, 5.2],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈmæn.ɪdʒ.mənt tiːm aɪ wʊd laɪk tuː rɪˈvjuː ˈaʊər ˈɡləʊ.bəl səˈplaɪ tʃeɪn səˌsteɪ.nəˈbɪl.ə.ti ɡəʊlz fɔːr nekst jɪər/"
      },
      {
        id: 2,
        speaker: "Supply Chain Vice President",
        text: "Starting in January, all overseas manufacturing vendors will undergo mandatory third-party labor and safety audits.",
        translation: "Bắt đầu từ tháng 1, tất cả các nhà cung ứng sản xuất tại nước ngoài sẽ phải trải qua các cuộc kiểm tra lao động và an toàn bắt buộc từ bên thứ ba.",
        timestamp: [5.2, 10.7],
        ipa: "/ˈstɑː.tɪŋ ɪn ˈdʒæn.ju.ər.i ɔːl ˌəʊ.vəˈsiːz ˌmæn.jəˈfæk.tʃər.ɪŋ ˈven.dəz wɪl ˌʌn.dəˈɡəʊ ˈmæn.də.tər.i θɜːd-ˈpɑː.ti ˈleɪ.bər ænd ˈseɪf.ti ˈɔː.dɪts/"
      },
      {
        id: 3,
        speaker: "Supply Chain Vice President",
        text: "Vendors who fail to meet our compliance benchmarks within sixty days will have their contracts suspended immediately.",
        translation: "Các nhà cung ứng không đạt chuẩn tuân thủ của chúng ta trong vòng 60 ngày sẽ bị đình chỉ hợp đồng ngay lập tức.",
        timestamp: [10.7, 16.1],
        ipa: "/ˈven.dəz huː feɪl tuː miːt ˈaʊər kəmˈplaɪ.əns ˈbentʃ.mɑːks wɪðˈɪn ˈsɪk.sti deɪz wɪl hæv ðeər ˈkɒn.trækts səˈspen.dɪd ɪˈmiː.di.ət.li/"
      },
      {
        id: 4,
        speaker: "Supply Chain Vice President",
        text: "Our regional procurement managers will conduct informational webinars next week to assist vendors with preparation.",
        translation: "Các quản lý cung ứng khu vực của chúng ta sẽ tổ chức các buổi hội thảo trực tuyến hướng dẫn vào tuần tới để hỗ trợ các nhà cung ứng chuẩn bị.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈaʊər ˈriː.dʒən.əl prəˈkjʊə.mənt ˈmæn.ɪdʒ.əz wɪl kənˈdʌkt ˌɪn.fəˈmeɪ.ʃən.əl ˈweb.ɪ.nɑːz nekst wiːk tuː əˈsɪst ˈven.dəz wɪð ˌprep.ərˈeɪ.ʃən/"
      }
    ],
    vocabList: [
      {
        word: "vendor",
        ipa: "/ˈven.dɚ/",
        pos: "Noun",
        meaning: "Nhà cung ứng",
        detailMeaning: "Đối tác sản xuất gia công linh kiện trong chuỗi cung ứng.",
        collocations: ["manufacturing vendor", "overseas vendor"],
        example: "All overseas vendors must comply with international labor regulations."
      },
      {
        word: "audit",
        ipa: "/ˈɑː.dɪt/",
        pos: "Noun / Verb",
        meaning: "Cuộc kiểm tra đánh giá",
        detailMeaning: "Đánh giá điều kiện an toàn và môi trường làm việc độc lập.",
        collocations: ["safety audit", "third-party audit"],
        example: "Annual vendor audits ensure ethical sourcing standards."
      },
      {
        word: "procurement",
        ipa: "/prəˈkjʊr.mənt/",
        pos: "Noun",
        meaning: "Sự thu mua, cung ứng vật tư",
        detailMeaning: "Hoạt động tìm kiếm và quản lý nhà cung ứng.",
        collocations: ["procurement manager", "global procurement"],
        example: "The procurement department negotiated better bulk material pricing."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Yêu cầu Tuân thủ: all suppliers are required to pass + Noun",
        explanation: "Yêu cầu bắt buộc đối với nhà cung ứng.",
        example: "All suppliers are required to pass environmental safety audits.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Mệnh đề Chỉ Kết quả: failure to comply will result in + Noun",
        explanation: "Hậu quả bị chấm dứt hợp đồng nếu vi phạm quy định.",
        example: "Failure to comply will result in contract termination.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_053",
    title: "Rail Freight Schedule & Container Tracking",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Rail Logistics Coordinator",
        text: "Attention shipping clients, this is an update from Trans-Continental Freight Services regarding Train 801.",
        translation: "Xin chú ý các khách hàng gửi hàng, đây là thông báo cập nhật từ Dịch vụ Vận tải Hàng hóa Xuyên lục địa liên quan đến Chuyến tàu 801.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ˈʃɪp.ɪŋ ˈklaɪ.ənts ðɪs ɪz æn ʌpˈdeɪt frəm trænz-ˌkɒn.tɪˈnen.təl freɪt ˈsɜː.vɪs.ɪz rɪˈɡɑː.dɪŋ treɪn ˈeɪt-oʊ-wʌn/"
      },
      {
        id: 2,
        speaker: "Rail Logistics Coordinator",
        text: "Freight Train 801 carrying your industrial cargo is scheduled to depart from the Chicago yard tomorrow at 6 AM.",
        translation: "Tàu chở hàng 801 mang hàng hóa công nghiệp của quý vị được lên lịch khởi hành từ ga Chicago vào 6 giờ sáng mai.",
        timestamp: [5.3, 10.7],
        ipa: "/freɪt treɪn ˈeɪt-oʊ-wʌn ˈkær.i.ɪŋ jɔːr ɪnˈdʌs.tri.əl ˈkɑː.ɡəʊ ɪz ˈʃed.juːld tuː dɪˈpɑːt frəm ðə ʃɪˈkɑː.ɡəʊ jɑːd təˈmɒr.əʊ æt sɪks eɪ-em/"
      },
      {
        id: 3,
        speaker: "Rail Logistics Coordinator",
        text: "Due to track upgrades in the Midwest region, total transit time to the West Coast will be extended by twelve hours.",
        translation: "Do việc nâng cấp đường sắt tại khu vực Trung Tây, tổng thời gian di chuyển đến Bờ Tây sẽ kéo dài thêm 12 tiếng.",
        timestamp: [10.7, 16.0],
        ipa: "/djuː tuː træk ʌpˈɡreɪdz ɪn ðə ˈmɪd.west ˈriː.dʒən ˈtəʊ.təl ˈtræn.zɪt taɪm tuː ðə west kəʊst wɪl biː ɪkˈstend.ɪd baɪ twelv ˈaʊəz/"
      },
      {
        id: 4,
        speaker: "Rail Logistics Coordinator",
        text: "Live GPS tracking links for all registered containers are now accessible through our online portal.",
        translation: "Đường liên kết theo dõi GPS trực tiếp cho tất cả các container đã đăng ký hiện có thể truy cập qua cổng thông tin trực tuyến của chúng tôi.",
        timestamp: [16.0, 23.0],
        ipa: "/laɪv dʒiː-piː-es ˈtræk.ɪŋ lɪŋks fɔːr ɔːl ˈredʒ.ɪ.stəd kənˈteɪ.nəz ɑːr naʊ əkˈses.ə.bəl θruː ˈaʊər ˈɒn.laɪn ˈpɔː.təl/"
      }
    ],
    vocabList: [
      {
        word: "cargo",
        ipa: "/ˈkɑːr.ɡoʊ/",
        pos: "Noun",
        meaning: "Hàng hóa vận chuyển",
        detailMeaning: "Hàng hóa đóng container chở trên đường sắt.",
        collocations: ["industrial cargo", "cargo train"],
        example: "Intermodal cargo trains carry goods across continental trade routes."
      },
      {
        word: "departure",
        ipa: "/dɪˈpɑːr.tʃɚ/",
        pos: "Noun",
        meaning: "Sự khởi hành",
        detailMeaning: "Thời gian tàu hàng rời ga.",
        collocations: ["scheduled departure", "train departure"],
        example: "The scheduled departure was delayed due to track maintenance."
      },
      {
        word: "consignment",
        ipa: "/kənˈsaɪn.mənt/",
        pos: "Noun",
        meaning: "Lô hàng gửi",
        detailMeaning: "Lô hàng giao cho công ty vận tải đường sắt.",
        collocations: ["track consignment", "freight consignment"],
        example: "You can track the real-time location of your consignment online."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Chỉ Lịch trình: is scheduled to depart from [Place] at [Time]",
        explanation: "Thông báo lịch xuất phát của tàu hàng.",
        example: "Freight Train 801 is scheduled to depart from Chicago at 6 AM.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Nguyên nhân - Tạm dừng: service has been suspended due to + Noun",
        explanation: "Giải thích lý do chậm trễ do sửa chữa đường ray.",
        example: "Rail service has been suspended due to track repairs.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_052",
    title: "Health Insurance Policy Renewal & Wellness Discounts",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Insurance Service Agent",
        text: "Hello Ms. Vance, this is Apex Mutual Insurance calling regarding your annual health coverage renewal.",
        translation: "Xin chào bà Vance, đây là Bảo hiểm Apex Mutual gọi điện liên quan đến việc gia hạn hợp đồng bảo hiểm sức khỏe hàng năm của bà.",
        timestamp: [0, 5.2],
        ipa: "/həˈləʊ ˈmɪz væns ðɪs ɪz ˈeɪ.peks ˈmjuː.tʃu.əl ɪnˈʃʊə.rəns ˈkɔːl.ɪŋ rɪˈɡɑː.dɪŋ jɔːr ˈæn.ju.əl helθ ˈkʌv.ər.ɪdʒ rɪˈnjuː.əl/"
      },
      {
        id: 2,
        speaker: "Insurance Service Agent",
        text: "Your current group health policy is set to expire at the end of next month on November 30th.",
        translation: "Hợp đồng bảo hiểm sức khỏe nhóm hiện tại của bà dự kiến sẽ hết hạn vào cuối tháng tới, ngày 30 tháng 11.",
        timestamp: [5.2, 10.6],
        ipa: "/jɔːr ˈkʌr.ənt ɡruːp helθ ˈpɒl.ə.si ɪz set tuː ɪkˈspaɪər æt ðə end əv nekst mʌnθ ɒn nəʊˈvem.bər ˈθɜː.ti.əθ/"
      },
      {
        id: 3,
        speaker: "Insurance Service Agent",
        text: "By completing your online health assessment before Friday, you can unlock a ten percent discount on your premium.",
        translation: "Bằng cách hoàn thành đánh giá sức khỏe trực tuyến trước Thứ Sáu, bà có thể nhận được mức giảm giá 10% cho phí bảo hiểm của mình.",
        timestamp: [10.6, 15.9],
        ipa: "/baɪ kəmˈpliːt.ɪŋ jɔːr ˈɒn.laɪn helθ əˈses.mənt bɪˈfɔː ˈfraɪ.deɪ juː kæn ʌnˈlɒk ə ten pəˈsent ˈdɪs.kaʊnt ɒn jɔːr ˈpriː.mi.əm/"
      },
      {
        id: 4,
        speaker: "Insurance Service Agent",
        text: "Please log into your member portal or contact your account representative to finalize your renewal terms.",
        translation: "Vui lòng đăng nhập vào cổng thông tin hội viên hoặc liên hệ với đại diện tài khoản của bà để hoàn tất các điều khoản gia hạn.",
        timestamp: [15.9, 23.0],
        ipa: "/pliːz lɒɡ ˈɪn.tuː jɔːr ˈmem.bər ˈpɔː.təl ɔː ˈkɒn.tækt jɔːr əˈkaʊnt ˌrep.rɪˈzen.tə.tɪv tuː ˈfaɪ.nəl.aɪz jɔːr rɪˈnjuː.əl tɜːmz/"
      }
    ],
    vocabList: [
      {
        word: "coverage",
        ipa: "/ˈkʌv.ɚ.ɪdʒ/",
        pos: "Noun",
        meaning: "Phạm vi bảo hiểm",
        detailMeaning: "Quyền lợi chi trả chăm sóc sức khỏe của hợp đồng.",
        collocations: ["health coverage", "comprehensive coverage"],
        example: "Comprehensive health coverage includes dental and vision care."
      },
      {
        word: "premium",
        ipa: "/ˈpriː.mi.əm/",
        pos: "Noun",
        meaning: "Phí bảo hiểm",
        detailMeaning: "Khoản tiền đóng định kỳ duy trì hợp đồng bảo hiểm.",
        collocations: ["insurance premium", "monthly premium"],
        example: "Policyholders can lower their monthly premiums by participating in wellness programs."
      },
      {
        word: "beneficiary",
        ipa: "/ˌben.əˈfɪʃ.i.er.i/",
        pos: "Noun",
        meaning: "Người thụ hưởng",
        detailMeaning: "Người nhận tiền bồi thường bảo hiểm chỉ định.",
        collocations: ["primary beneficiary", "update beneficiary"],
        example: "Please ensure your primary beneficiary details are updated."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Nhắc nhở Đáo hạn: your policy is set to expire on + [Date]",
        explanation: "Thông báo thời hạn hết hiệu lực của hợp đồng bảo hiểm.",
        example: "Your health insurance policy is set to expire on November 30th.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Điều kiện: discounts will be applied once + Clause",
        explanation: "Điều kiện tham gia khám sức khỏe nhận giảm phí bảo hiểm.",
        example: "Discounts will be applied once the health checkup form is submitted.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_051",
    title: "Agritech Smart Farming & Automated Irrigation",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Agritech Project Director",
        text: "Welcome everyone to our demonstration of the Smart Farm Precision Irrigation System.",
        translation: "Chào mừng mọi người đến với buổi trình diễn Hệ thống Tưới tiêu Chính xác Nông nghiệp Thông minh của chúng tôi.",
        timestamp: [0, 5.2],
        ipa: "/ˈwel.kəm ˈev.ri.wʌn tuː ˈaʊər ˌdem.ənˈstreɪ.ʃən əv ðə smɑːt fɑːm prɪˈsɪʒ.ən ˌɪr.ɪˈɡeɪ.ʃən ˈsɪs.təm/"
      },
      {
        id: 2,
        speaker: "Agritech Project Director",
        text: "Soil moisture sensors embedded throughout the field analyze ground conditions every fifteen minutes.",
        translation: "Các cảm biến độ ẩm đất được gắn khắp cánh đồng sẽ phân tích điều kiện lòng đất mỗi 15 phút một lần.",
        timestamp: [5.2, 10.6],
        ipa: "/sɔɪl ˈmɔɪs.tʃər ˈsen.səz ɪmˈbed.ɪd θruːˈaʊt ðə fiːld ˈæn.əl.aɪz ɡraʊnd kənˈdɪʃ.ənz ˈev.ri ˌfɪfˈtiːn ˈmɪn.ɪts/"
      },
      {
        id: 3,
        speaker: "Agritech Project Director",
        text: "When moisture levels drop below optimum thresholds, the system triggers targeted drip irrigation automatically.",
        translation: "Khi mức độ ẩm giảm xuống dưới ngưỡng tối ưu, hệ thống sẽ tự động kích hoạt tưới nhỏ giọt theo mục tiêu.",
        timestamp: [10.6, 16.1],
        ipa: "/wen ˈmɔɪs.tʃər ˈlev.əlz drɒp bɪˈləʊ ˈɒp.tɪ.məm ˈθreʃ.həʊldz ðə ˈsɪs.təm ˈtrɪɡ.əz ˈtɑː.ɡɪt.ɪd drɪp ˌɪr.ɪˈɡeɪ.ʃən ˌɔː.təˈmæt.ɪk.li/"
      },
      {
        id: 4,
        speaker: "Agritech Project Director",
        text: "This smart technology reduces water consumption by thirty-five percent while improving crop yield.",
        translation: "Công nghệ thông minh này giúp giảm 35% lượng nước tiêu thụ đồng thời nâng cao năng suất cây trồng.",
        timestamp: [16.1, 23.0],
        ipa: "/ðɪs smɑːt tekˈnɒl.ə.dʒi rɪˈdjuːsɪz ˈwɔː.tər kənˈsʌmp.ʃən baɪ ˈθɜː.ti-faɪv pəˈsent waɪl ɪmˈpruːv.ɪŋ krɒp jiːld/"
      }
    ],
    vocabList: [
      {
        word: "irrigation",
        ipa: "/ˌɪr.əˈɡeɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự tưới tiêu",
        detailMeaning: "Hệ thống cấp nước tự động thông minh cho cây trồng.",
        collocations: ["drip irrigation", "precision irrigation"],
        example: "Automated drip irrigation conserves water while maximizing crop yield."
      },
      {
        word: "moisture",
        ipa: "/ˈmɔɪs.tʃɚ/",
        pos: "Noun",
        meaning: "Độ ẩm đất",
        detailMeaning: "Hàm lượng nước trong đất nông nghiệp đo bằng cảm biến.",
        collocations: ["soil moisture", "moisture sensor"],
        example: "Soil moisture sensors send real-time data to the farmer's tablet."
      },
      {
        word: "yield",
        ipa: "/jiːld/",
        pos: "Noun",
        meaning: "Năng suất thu hoạch",
        detailMeaning: "Sản lượng nông sản thu hoạch được trên diện tích đất.",
        collocations: ["crop yield", "maximize yield"],
        example: "Smart farming techniques boosted overall crop yield by twenty percent."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Tính năng Công nghệ: allow farmers to monitor [N/NP] remotely",
        explanation: "Ứng dụng IoT nông nghiệp theo dõi sức khỏe cây trồng.",
        example: "IoT sensors allow farmers to monitor soil health remotely.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Tương lai Chỉ Kết quả: will optimize [Noun] and reduce [Noun]",
        explanation: "Dự báo hiệu quả tiết kiệm nước nhờ công nghệ Agritech.",
        example: "The system will optimize water consumption and reduce utility expenses.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_050",
    title: "Automated Warehouse & Inventory Management",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Warehouse Logistics Manager",
        text: "Good morning warehouse staff, please pay attention to this brief update regarding our inventory management system.",
        translation: "Chào buổi sáng nhân viên kho, vui lòng chú ý đến bản cập nhật ngắn này liên quan đến hệ thống quản lý kho của chúng ta.",
        timestamp: [0, 5.2],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈweə.haʊs stɑːf pliːz peɪ əˈten.ʃən tuː ðɪs briːf ʌpˈdeɪt rɪˈɡɑː.dɪŋ ˈaʊər ˈɪn.vən.tər.i ˈmæn.ɪdʒ.mənt ˈsɪs.təm/"
      },
      {
        id: 2,
        speaker: "Warehouse Logistics Manager",
        text: "Starting next Monday, we are transitioning to a fully automated barcode scanning system in Sector 4.",
        translation: "Bắt đầu từ Thứ Hai tuần tới, chúng ta sẽ chuyển sang hệ thống quét mã vạch tự động hoàn toàn tại Khu vực 4.",
        timestamp: [5.2, 10.7],
        ipa: "/ˈstɑː.tɪŋ nekst ˈmʌn.deɪ wiː ɑːr trænˈzɪʃ.ən.ɪŋ tuː ə ˈfʊl.i ˈɔː.tə.meɪ.tɪd ˈbɑː.kəʊd ˈskæn.ɪŋ ˈsɪs.təm ɪn ˈsek.tər fɔːr/"
      },
      {
        id: 3,
        speaker: "Warehouse Logistics Manager",
        text: "All incoming pallets will be scanned automatically upon entry to update inventory levels instantly.",
        translation: "Tất cả các kiện hàng pallet nhập kho sẽ được quét tự động ngay khi vào cửa để cập nhật số lượng tồn kho tức thì.",
        timestamp: [10.7, 16.0],
        ipa: "/ɔːl ˈɪnˌkʌm.ɪŋ ˈpæl.ɪts wɪl biː skænd ˌɔː.təˈmæt.ɪk.li əˈpɒn ˈen.tri tuː ʌpˈdeɪt ˈɪn.vən.tər.i ˈlev.əlz ˈɪn.stənt.li/"
      },
      {
        id: 4,
        speaker: "Warehouse Logistics Manager",
        text: "Brief hands-on training sessions will be conducted during your regular shifts over the next two days.",
        translation: "Các buổi đào tạo thực hành ngắn sẽ được tổ chức trong các ca làm việc thường lệ của các bạn trong 2 ngày tới.",
        timestamp: [16.0, 23.0],
        ipa: "/briːf hændz-ɒn ˈtreɪn.ɪŋ ˈseʃ.ənz wɪl biː kənˈdʌkt.ɪd ˈdjʊə.rɪŋ jɔːr ˈreɡ.jə.lər ʃɪfts ˈəʊ.vər ðə nekst tuː deɪz/"
      }
    ],
    vocabList: [
      {
        word: "automated",
        ipa: "/ˈɑː.t̬ə.meɪ.t̬ɪd/",
        pos: "Adj",
        meaning: "Tự động hóa",
        detailMeaning: "Hệ thống kho vận hành tự động hóa không cần thao tác tay.",
        collocations: ["automated system", "fully automated"],
        example: "The automated storage and retrieval system increased packing speed."
      },
      {
        word: "barcode",
        ipa: "/ˈbɑːr.koʊd/",
        pos: "Noun",
        meaning: "Mã vạch",
        detailMeaning: "Mã định danh sản phẩm dán trên kiện pallet nhập kho.",
        collocations: ["barcode scanner", "scan barcode"],
        example: "Workers scan item barcodes to update stock levels in real time."
      },
      {
        word: "inventory audit",
        ipa: "/ˈɪn.vən.tɔːr.i ˈɑː.dɪt/",
        pos: "Noun",
        meaning: "Kiểm kê hàng tồn kho",
        detailMeaning: "Hoạt động đối soát số lượng tồn kho tự động.",
        collocations: ["conduct inventory audit", "annual audit"],
        example: "The annual inventory audit will begin this Saturday."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Sự nâng cấp Hệ thống: be equipped with + Noun",
        explanation: "Trang bị phương tiện vận tải tự động trong kho hàng.",
        example: "The new facility is equipped with automated guided vehicles.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Thì Tương lai Đơn: will be scanned and logged + into",
        explanation: "Quy trình quét mã tự động khi kiện hàng nhập kho.",
        example: "All incoming crates will be scanned and logged into the database.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_049",
    title: "Corporate Property Insurance & Claim Assessment",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Insurance Claims Adjuster",
        text: "Hello Mr. Gallagher, this is Brenda from Commercial Claims Insurance following up on claim number 408.",
        translation: "Xin chào ông Gallagher, đây là Brenda từ Công ty Bảo hiểm Bồi thường Thương mại theo dõi hồ sơ bồi thường số 408.",
        timestamp: [0, 5.2],
        ipa: "/həˈləʊ ˈmɪs.tər ˈɡæl.ə.ɡər ðɪs ɪz ˈbren.də frəm kəˈmɜː.ʃəl kleɪmz ɪnˈʃʊə.rəns ˈfɒl.əʊ.ɪŋ ʌp ɒn kleɪm ˈnʌm.bər fɔːr-oʊ-eɪt/"
      },
      {
        id: 2,
        speaker: "Insurance Claims Adjuster",
        text: "Our field adjuster has completed the assessment of the water damage at your warehouse location.",
        translation: "Giám định viên hiện trường của chúng tôi đã hoàn thành việc đánh giá thiệt hại do nước tại khu vực kho hàng của ông.",
        timestamp: [5.2, 10.7],
        ipa: "/ˈaʊər fiːld əˈdʒʌs.tər hæz kəmˈpliː.tɪd ðə əˈses.mənt əv ðə ˈwɔː.tər ˈdæm.ɪdʒ æt jɔːr ˈweə.haʊs ləʊˈkeɪ.ʃən/"
      },
      {
        id: 3,
        speaker: "Insurance Claims Adjuster",
        text: "The total approved repair cost is forty-five thousand dollars, minus your five-hundred-dollar deductible.",
        translation: "Tổng chi phí sửa chữa được phê duyệt là 45.000 đô la, trừ đi 500 đô la mức miễn thường của ông.",
        timestamp: [10.7, 16.1],
        ipa: "/ðə ˈtəʊ.təl əˈpruːvd rɪˈpeər kɒst ɪz ˈfɔː.ti-faɪv ˈθaʊ.zənd ˈdɒl.əz ˈmaɪ.nəs jɔːr faɪv-ˈhʌn.drəd-ˈdɒl.ər dɪˈdʌk.tə.bəl/"
      },
      {
        id: 4,
        speaker: "Insurance Claims Adjuster",
        text: "A reimbursement check will be mailed to your business address within three business days.",
        translation: "Séc hoàn trả chi phí sẽ được gửi qua bưu điện đến địa chỉ kinh doanh của ông trong vòng 3 ngày làm việc.",
        timestamp: [16.1, 23.0],
        ipa: "/ə ˌriː.ɪmˈbɜːs.mənt tʃek wɪl biː meɪld tuː jɔːr ˈbɪz.nɪs əˈdres wɪðˈɪn θriː ˈbɪz.nɪs deɪz/"
      }
    ],
    vocabList: [
      {
        word: "policyholder",
        ipa: "/ˈpɑː.lə.siˌhoʊl.dɚ/",
        pos: "Noun",
        meaning: "Chủ hợp đồng bảo hiểm",
        detailMeaning: "Khách hàng doanh nghiệp đứng tên hợp đồng bảo hiểm.",
        collocations: ["corporate policyholder", "file a claim"],
        example: "The policyholder filed a claim following the heavy storm damage."
      },
      {
        word: "deductible",
        ipa: "/dɪˈdʌk.tə.bəl/",
        pos: "Noun",
        meaning: "Mức miễn thường bảo hiểm",
        detailMeaning: "Khoản tiền chủ hợp đồng tự chi trả khi phát sinh sự cố.",
        collocations: ["insurance deductible", "subtract deductible"],
        example: "The claim payment will be issued after subtracting the insurance deductible."
      },
      {
        word: "premium",
        ipa: "/ˈpriː.mi.əm/",
        pos: "Noun",
        meaning: "Phí bảo hiểm",
        detailMeaning: "Số tiền đóng bảo hiểm tài sản doanh nghiệp hàng kỳ.",
        collocations: ["annual premium", "policy coverage"],
        example: "Paying annual premiums on time ensures continuous policy coverage."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Thì Hiện tại Hoàn thành: has been evaluated by + Noun",
        explanation: "Thông báo kết quả thẩm định bồi thường từ công ty bảo hiểm.",
        example: "The damage estimate has been evaluated by our claims team.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Điều kiện Giải ngân: funds will be disbursed upon receipt of + Noun",
        explanation: "Điều kiện nhận séc bồi thường tài sản.",
        example: "Funds will be disbursed upon receipt of repair invoices.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_048",
    title: "Renewable Energy Transition & Solar Panel Installation",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Sustainability Officer",
        text: "Good morning colleagues, I am excited to announce our new green energy initiative for the manufacturing plant.",
        translation: "Chào buổi sáng các đồng nghiệp, tôi rất vui mừng được thông báo về sáng kiến năng lượng xanh mới cho nhà máy sản xuất của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈkɒl.iːɡz aɪ æm ɪkˈsaɪ.tɪd tuː əˈnaʊns ˈaʊər njuː ɡriːn ˈen.ə.dʒi ɪˈnɪʃ.ə.tɪv fɔːr ðə ˌmæn.jəˈfæk.tʃər.ɪŋ plɑːnt/"
      },
      {
        id: 2,
        speaker: "Sustainability Officer",
        text: "Next month, we will begin installing commercial solar panels across the entire rooftop of Facility A.",
        translation: "Tháng tới, chúng ta sẽ bắt đầu lắp đặt các tấm pin năng lượng mặt trời thương mại trên toàn bộ mái nhà của Cơ sở A.",
        timestamp: [5.3, 10.8],
        ipa: "/nekst mʌnθ wiː wɪl bɪˈɡɪn ɪnˈstɔːl.ɪŋ kəˈmɜː.ʃəl ˈsəʊ.lər ˈpæn.əlz əˈkrɒs ðə ɪnˈtaɪər ˈruːf.tɒp əv fəˈsɪl.ə.ti eɪ/"
      },
      {
        id: 3,
        speaker: "Sustainability Officer",
        text: "This renewable system is expected to generate thirty percent of our daily electricity requirements.",
        translation: "Hệ thống năng lượng tái tạo này dự kiến sẽ tạo ra 30% nhu cầu điện hàng ngày của chúng ta.",
        timestamp: [10.8, 16.0],
        ipa: "/ðɪs rɪˈnjuː.ə.bəl ˈsɪs.təm ɪz ɪkˈspek.tɪd tuː ˈdʒen.ə.reɪt ˈθɜː.ti pəˈsent əv ˈaʊər ˈdeɪ.li ɪˌlekˈtrɪs.ə.ti rɪˈkwaɪə.mənts/"
      },
      {
        id: 4,
        speaker: "Sustainability Officer",
        text: "By reducing our dependence on traditional power grids, we will lower carbon emissions and operational costs.",
        translation: "Bằng cách giảm sự phụ thuộc vào lưới điện truyền thống, chúng ta sẽ giảm lượng khí thải carbon và chi phí vận hành.",
        timestamp: [16.0, 23.0],
        ipa: "/baɪ rɪˈdjuːs.ɪŋ ˈaʊər dɪˈpen.dəns ɒn trəˈdɪʃ.ən.əl ˈpaʊər ɡrɪdz wiː wɪl ˈləʊ.ər ˈkɑː.bən ɪˈmɪʃ.ənz ænd ˌɒp.ərˈeɪ.ʃən.əl kɒsts/"
      }
    ],
    vocabList: [
      {
        word: "renewable energy",
        ipa: "/rɪˈnuː.ə.bəl ˈen.ɚ.dʒi/",
        pos: "Noun",
        meaning: "Năng lượng tái tạo",
        detailMeaning: "Nguồn điện mặt trời xanh chuyển đổi nhà máy bền vững.",
        collocations: ["green energy initiative", "renewable energy system"],
        example: "The factory plans to transition entirely to renewable energy by 2030."
      },
      {
        word: "footprint",
        ipa: "/ˈfʊt.prɪnt/",
        pos: "Noun",
        meaning: "Dấu chân carbon",
        detailMeaning: "Tổng lượng khí thải nhà kính công ty thải ra môi trường.",
        collocations: ["carbon footprint", "reduce footprint"],
        example: "Rooftop solar panels significantly reduce our corporate carbon footprint."
      },
      {
        word: "grid",
        ipa: "/ɡrɪd/",
        pos: "Noun",
        meaning: "Mạng lưới điện",
        detailMeaning: "Mạng lưới phân phối điện thương mại truyền thống.",
        collocations: ["power grid", "electricity grid"],
        example: "Excess solar power will be fed back into the regional electricity grid."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Mục tiêu Giảm xả thải: aim to reduce [N/NP] by [Percentage]",
        explanation: "Trình bày các chỉ số cam kết bảo vệ môi trường.",
        example: "We aim to reduce greenhouse gas emissions by forty percent.",
        sentenceId: 4
      },
      {
        title: "Cấu trúc Tương lai Hoàn thành: will have completed + Noun + by [Year]",
        explanation: "Khẳng định mốc hoàn thành lắp đặt điện mặt trời.",
        example: "We will have installed solar panels by the end of next month.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_047",
    title: "Press Conference & Corporate Crisis Communication",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Public Relations Director",
        text: "Good afternoon members of the press, thank you for attending this emergency briefing today.",
        translation: "Chào buổi chiều các nhà báo, cảm ơn quý vị đã đến tham dự buổi họp báo khẩn cấp hôm nay.",
        timestamp: [0, 5.2],
        ipa: "/ɡʊd ˌɑːf.təˈnuːn ˈmem.bəz əv ðə pres θæŋk juː fɔːr əˈtend.ɪŋ ðɪs ɪˈmɜː.dʒən.si ˈbriː.fɪŋ təˈdeɪ/"
      },
      {
        id: 2,
        speaker: "Public Relations Director",
        text: "Our company has released an official press statement regarding the temporary service disruption experienced yesterday.",
        translation: "Công ty chúng tôi đã phát hành một thông cáo báo chí chính thức liên quan đến sự gián đoạn dịch vụ tạm thời xảy ra vào ngày hôm qua.",
        timestamp: [5.2, 10.7],
        ipa: "/ˈaʊər ˈkʌm.pə.ni hæz rɪˈliːst æn əˈfɪʃ.əl pres ˈsteɪt.mənt rɪˈɡɑː.dɪŋ ðə ˈtem.pər.ər.i ˈsɜː.vɪs dɪsˈrʌp.ʃən ɪkˈspɪə.ri.ənst ˈjes.tə.deɪ/"
      },
      {
        id: 3,
        speaker: "Public Relations Director",
        text: "Our technical teams have fully restored all network operations and implemented secondary security safeguards.",
        translation: "Đội ngũ kỹ thuật của chúng tôi đã khôi phục hoàn toàn mọi hoạt động mạng và triển khai các lớp bảo vệ an ninh thứ cấp.",
        timestamp: [10.7, 16.1],
        ipa: "/ˈaʊər ˈtek.nɪ.kəl tiːmz hæv ˈfʊl.i rɪˈstɔːd ɔːl ˈnet.wɜːk ˌɒp.ərˈeɪ.ʃənz ænd ˈɪm.plɪ.ment.ɪd ˈsek.ən.dr.i sɪˈkjʊə.rə.ti ˈseɪf.ɡɑːdz/"
      },
      {
        id: 4,
        speaker: "Public Relations Director",
        text: "Our corporate spokesperson will now open the floor to answer questions from accredited journalists.",
        translation: "Người phát ngôn doanh nghiệp của chúng tôi bây giờ sẽ dành thời gian để trả lời câu hỏi từ các nhà báo được cấp phép.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈaʊər ˈkɔː.pər.ət ˈspoʊksˌpɜː.sən wɪl naʊ ˈəʊ.pən ðə flɔːr tuː ˈɑːn.sər ˈkwes.tʃənz frəm əˈkred.ɪ.tɪd ˈdʒɜː.nə.lɪsts/"
      }
    ],
    vocabList: [
      {
        word: "press release",
        ipa: "/pres rɪˈliːs/",
        pos: "Noun",
        meaning: "Thông cáo báo chí",
        detailMeaning: "Văn bản chính thức công ty phát hành cho báo giới.",
        collocations: ["official press release", "press statement"],
        example: "The PR department issued an official press release this morning."
      },
      {
        word: "spokesperson",
        ipa: "/ˈspoʊksˌpɜːr.sən/",
        pos: "Noun",
        meaning: "Người phát ngôn doanh nghiệp",
        detailMeaning: "Đại diện công ty trả lời phỏng vấn báo chí.",
        collocations: ["corporate spokesperson", "media spokesperson"],
        example: "Our corporate spokesperson will address media inquiries at 2 PM."
      },
      {
        word: "statement",
        ipa: "/ˈsteɪt.mənt/",
        pos: "Noun",
        meaning: "Tuyên bố chính thức",
        detailMeaning: "Thông báo phản hồi sự cố gián đoạn dịch vụ khẩn cấp.",
        collocations: ["formal statement", "press statement"],
        example: "The CEO issued a formal statement regarding the product recall."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Lịch trình Họp báo: a press conference is scheduled to begin at + [time]",
        explanation: "Thông báo thời gian bắt đầu buổi họp báo khẩn cấp.",
        example: "A press conference is scheduled to begin at two o'clock.",
        sentenceId: 1
      },
      {
        title: "Cấu trúc Bị động Yêu cầu: journalists are required to present + Noun",
        explanation: "Quy định điều kiện vào cửa dành cho phóng viên.",
        example: "Journalists are required to present media credentials at the entrance.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_046",
    title: "E-Commerce Fulfillment Center & Express Delivery Options",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "E-Commerce Operations Director",
        text: "Good morning operations team, I want to review our performance metrics for the holiday shopping weekend.",
        translation: "Chào buổi sáng đội ngũ vận hành, tôi muốn điểm qua các chỉ số hiệu suất trong cuối tuần mua sắm lễ hội vừa qua.",
        timestamp: [0, 5.2],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˌɒp.ərˈeɪ.ʃənz tiːm aɪ wɒnt tuː rɪˈvjuː ˈaʊər pəˈfɔː.məns ˈmet.rɪks fɔːr ðə ˈhɒl.ə.deɪ ˈʃɒp.ɪŋ ˈwiːk.end/"
      },
      {
        id: 2,
        speaker: "E-Commerce Operations Director",
        text: "Thanks to our automated sorting system, our regional fulfillment centers processed over fifty thousand orders.",
        translation: "Nhờ hệ thống phân loại tự động, các trung tâm xử lý đơn hàng theo khu vực của chúng ta đã xử lý hơn 50.000 đơn hàng.",
        timestamp: [5.2, 10.6],
        ipa: "/θæŋks tuː ˈaʊər ˈɔː.tə.meɪ.tɪd ˈsɔː.tɪŋ ˈsɪs.təm ˈaʊər ˈriː.dʒən.əl fʊlˈfɪl.mənt ˈsen.təz ˈprəʊ.sest ˈəʊ.vər ˈfɪf.ti ˈθaʊ.zənd ˈɔː.dəz/"
      },
      {
        id: 3,
        speaker: "E-Commerce Operations Director",
        text: "Furthermore, ninety-five percent of express delivery orders were dispatched within three hours of customer checkout.",
        translation: "Hơn nữa, 95% các đơn hàng giao tận nơi hỏa tốc đã được xuất kho trong vòng 3 tiếng kể từ khi khách hàng thanh toán.",
        timestamp: [10.6, 16.0],
        ipa: "/ˌfɜː.ðəˈmɔːr ˈnaɪn.ti-faɪv pəˈsent əv ɪkˈspres dɪˈlɪv.ər.i ˈɔː.dəz wɜː dɪˈspætʃt wɪðˈɪn θriː ˈaʊəz əv ˈkʌs.tə.mər ˈtʃek.aʊt/"
      },
      {
        id: 4,
        speaker: "E-Commerce Operations Director",
        text: "We will maintain these extra operational shifts through the end of December to handle high order volumes.",
        translation: "Chúng ta sẽ duy trì các ca làm việc tăng cường này cho đến hết tháng 12 để xử lý lượng đơn hàng lớn.",
        timestamp: [16.0, 23.0],
        ipa: "/wiː wɪl meɪnˈteɪn ðiːz ˈek.strə ˌɒp.ərˈeɪ.ʃən.əl ʃɪfts θruː ðə end əv dɪˈsem.bər tuː ˈhæn.dəl haɪ ˈɔː.dər ˈvɒl.juːmz/"
      }
    ],
    vocabList: [
      {
        word: "fulfillment center",
        ipa: "/fʊlˈfɪl.mənt ˌsen.t̬ɚ/",
        pos: "Noun",
        meaning: "Trung tâm xử lý đơn hàng",
        detailMeaning: "Kho hàng tự động hóa đóng gói và xuất kho sản phẩm.",
        collocations: ["regional fulfillment center", "automated fulfillment"],
        example: "Our new automated fulfillment center processes ten thousand orders daily."
      },
      {
        word: "dispatch",
        ipa: "/dɪˈspætʃ/",
        pos: "Verb / Noun",
        meaning: "Gửi đi, xuất kho",
        detailMeaning: "Bắt đầu giao đơn hàng cho đơn vị vận chuyển.",
        collocations: ["dispatch orders", "same-day dispatch"],
        example: "Orders placed before noon are dispatched on the same day."
      },
      {
        word: "courier",
        ipa: "/ˈkʊr.i.ɚ/",
        pos: "Noun",
        meaning: "Đơn vị chuyển phát nhanh",
        detailMeaning: "Đối tác chịu trách nhiệm chặng giao cuối cho người tiêu dùng.",
        collocations: ["local courier", "express courier"],
        example: "The local courier guarantees next-day delivery within urban areas."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Cam kết Thời gian: orders placed before [Time] will be dispatched + Time",
        explanation: "Cam kết tốc độ xử lý đơn hàng thương mại điện tử.",
        example: "Orders placed before 2 PM will be dispatched the same business day.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Điều kiện Khuyến mãi Giao hàng: free express shipping applies to orders over + Amount",
        explanation: "Mức áp dụng ưu đãi vận chuyển.",
        example: "Free express shipping applies to orders exceeding $50.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_045",
    title: "Flight Cancellation & Passenger Compensation Policy",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Airline Customer Service Manager",
        text: "Attention passengers on Skylink Flight 402 bound for Chicago, we have an important gate update.",
        translation: "Xin chú ý các hành khách trên chuyến bay Skylink 402 đi Chicago, chúng tôi có thông báo cập nhật quan trọng tại cửa khởi hành.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ˈpæs.ən.dʒəz ɒn ˈskaɪ.lɪŋk flaɪt fɔːr ˈoʊ tuː baʊnd fɔːr ʃɪˈkɑː.ɡoʊ wiː hæv æn ɪmˈpɔː.tənt ɡeɪt ʌpˈdeɪt/"
      },
      {
        id: 2,
        speaker: "Airline Customer Service Manager",
        text: "Due to severe thunderstorms along our flight path, Flight 402 has been canceled for safety reasons.",
        translation: "Do dông bão nghiêm trọng dọc theo đường bay, Chuyến bay 402 đã bị hủy vì lý do an toàn.",
        timestamp: [5.3, 10.7],
        ipa: "/djuː tuː sɪˈvɪər ˈθʌn.də.stɔːmz əˈlɒŋ ˈaʊər flaɪt pɑːθ flaɪt fɔːr ˈoʊ tuː hæz biːn ˈkæn.səld fɔːr ˈseɪf.ti ˈriː.zənz/"
      },
      {
        id: 3,
        speaker: "Airline Customer Service Manager",
        text: "All passengers are entitled to be rebooked on tomorrow morning's departure at no additional charge.",
        translation: "Tất cả hành khách đều có quyền được đặt lại vé sang chuyến bay sáng mai mà không tốn thêm phí.",
        timestamp: [10.7, 16.0],
        ipa: "/ɔːl ˈpæs.ən.dʒəz ɑːr ɪnˈtaɪ.təld tuː biː ˌriːˈbʊkt ɒn təˈmɒr.əʊ ˈmɔː.nɪŋz dɪˈpɑː.tʃər æt nəʊ əˈdɪʃ.ən.əl tʃɑːdʒ/"
      },
      {
        id: 4,
        speaker: "Airline Customer Service Manager",
        text: "Please proceed to Service Desk B to collect your hotel accommodation vouchers and revised boarding passes.",
        translation: "Vui lòng di chuyển đến Quầy Dịch vụ B để nhận phiếu phòng khách sạn và thẻ lên máy bay đã được điều chỉnh.",
        timestamp: [16.0, 23.0],
        ipa: "/pliːz prəˈsiːd tuː ˈsɜː.vɪs desk biː tuː kəˈlekt jɔːr həʊˈtel əˌkɒm.əˈdeɪ.ʃən ˈvaʊ.tʃəz ænd rɪˈvaɪzd ˈbɔː.dɪŋ pɑːsɪz/"
      }
    ],
    vocabList: [
      {
        word: "compensation",
        ipa: "/ˌkɑːm.penˈseɪ.ʃən/",
        pos: "Noun",
        meaning: "Khoản bồi thường",
        detailMeaning: "Quyền lợi chi trả hỗ trợ khi chuyến bay bị hủy.",
        collocations: ["financial compensation", "compensation policy"],
        example: "Passengers are entitled to financial compensation for overnight delays."
      },
      {
        word: "rebook",
        ipa: "/ˌriːˈbʊk/",
        pos: "Verb",
        meaning: "Đặt lại vé chuyến bay",
        detailMeaning: "Chuyển vé hành khách sang chuyến bay khác.",
        collocations: ["rebook flight", "rebook on alternative flight"],
        example: "Gate agents will assist passengers to rebook on alternative flights."
      },
      {
        word: "voucher",
        ipa: "/ˈvaʊ.tʃər/",
        pos: "Noun",
        meaning: "Phiếu dịch vụ ăn uống/ khách sạn",
        detailMeaning: "Phiếu ưu đãi dịch vụ hỗ trợ sự cố hủy chuyến.",
        collocations: ["hotel voucher", "meal voucher"],
        example: "The airline provided meal vouchers to all affected passengers."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Quyền lợi Khách hàng: passengers are entitled to + Noun/V-ing",
        explanation: "Quyền lợi bồi thường theo quy định hàng không.",
        example: "Passengers are entitled to receive complimentary hotel accommodations.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Hướng dẫn Hành động: please proceed to + Location + to receive",
        explanation: "Chỉ dẫn hành khách làm thủ tục nhận phòng khách sạn.",
        example: "Please proceed to Customer Desk 4 to collect your vouchers.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_044",
    title: "Assembly Line Inspection & Defect Rate Reduction",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Quality Control Inspector",
        text: "Attention plant supervisors, this is a report from the quality assurance team regarding Production Line B.",
        translation: "Xin chú ý các giám sát nhà máy, đây là báo cáo từ đội ngũ đảm bảo chất lượng liên quan đến Dây chuyền Sản xuất B.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən plɑːnt ˈsuː.pə.vaɪ.zəz ðɪs ɪz ə rɪˈpɔːt frəm ðə ˈkwɒl.ə.ti əˈʃʊə.rəns tiːm rɪˈɡɑː.dɪŋ prəˈdʌk.ʃən laɪn biː/"
      },
      {
        id: 2,
        speaker: "Quality Control Inspector",
        text: "During our morning audit, we detected a slight increase in the component defect rate above our acceptable threshold.",
        translation: "Trong buổi kiểm tra sáng nay, chúng tôi đã phát hiện tỷ lệ lỗi linh kiện tăng nhẹ vượt quá ngưỡng cho phép.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈdjʊə.rɪŋ ˈaʊər ˈmɔː.nɪŋ ˈɔː.dɪt wiː dɪˈtek.tɪd ə slaɪt ɪnˈkriːs ɪn ðə kəmˈpəʊ.nənt ˈdiː.fekt reɪt əˈbʌv ˈaʊər əkˈsep.tə.bəl ˈθreʃ.həʊld/"
      },
      {
        id: 3,
        speaker: "Quality Control Inspector",
        text: "Preliminary investigation indicates that robotic arm number three requires recalibration to restore precision alignment.",
        translation: "Điều tra sơ bộ chỉ ra rằng cánh tay robot số 3 cần được hiệu chỉnh lại để khôi phục độ căn chỉnh chính xác.",
        timestamp: [10.8, 16.1],
        ipa: "/prɪˈlɪm.ɪ.nər.i ɪnˌves.tɪˈɡeɪ.ʃən ˈɪn.dɪ.keɪts ðæt rəʊˈbɒt.ɪk ɑːm ˈnʌm.bər θriː rɪˈkwaɪəz ˌriː.kæl.ɪˈbreɪ.ʃən tuː rɪˈstɔː prɪˈsɪʒ.ən əˈlaɪn.mənt/"
      },
      {
        id: 4,
        speaker: "Quality Control Inspector",
        text: "Line B will be paused for two hours starting at 1 PM to allow technicians to complete the service.",
        translation: "Dây chuyền B sẽ tạm dừng trong 2 tiếng bắt đầu từ 1 giờ chiều để các kỹ thuật viên hoàn tất việc bảo trì.",
        timestamp: [16.1, 23.0],
        ipa: "/laɪn biː wɪl biː pɔːzd fɔːr tuː ˈaʊəz ˈstɑː.tɪŋ æt wʌn piː-em tuː əˈlaʊ tekˈnɪʃ.ənz tuː kəmˈpliːt ðə ˈsɜː.vɪs/"
      }
    ],
    vocabList: [
      {
        word: "defect",
        ipa: "/ˈdiː.fekt/",
        pos: "Noun",
        meaning: "Lỗi, khuyết tật sản phẩm",
        detailMeaning: "Lỗi kỹ thuật xuất hiện trong dây chuyền sản xuất.",
        collocations: ["defect rate", "surface defect"],
        example: "Automated sensors help detect surface defects on the assembly line."
      },
      {
        word: "calibration",
        ipa: "/ˌkæl.əˈbreɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự hiệu chỉnh máy móc",
        detailMeaning: "Căn chỉnh tham số robot đảm bảo độ chính xác.",
        collocations: ["machine calibration", "recalibration"],
        example: "Monthly machine calibration maintains high manufacturing precision."
      },
      {
        word: "output",
        ipa: "/ˈaʊt.pʊt/",
        pos: "Noun",
        meaning: "Sản lượng nhà máy",
        detailMeaning: "Tổng số lượng sản phẩm hoàn thành trong ca.",
        collocations: ["plant output", "manufacturing output"],
        example: "Plant output increased by fifteen percent after upgrading machinery."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Nguyên nhân Kỹ thuật: due to improper calibration, components were + V3/ed",
        explanation: "Giải thích sự cố phát sinh tại nhà máy.",
        example: "Components were damaged due to improper machine calibration.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Yêu cầu Tạm dừng: have ordered a temporary suspension of + Noun",
        explanation: "Quyết định tạm ngưng hoạt động nhà máy để sửa chữa.",
        example: "Management ordered a temporary suspension of production line B.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_043",
    title: "Commercial Lease Negotiation & Building Facilities",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Property Leasing Manager",
        text: "Hello Mr. Zhao, I am following up on your inquiry about leasing the sixth floor of Commerce Tower.",
        translation: "Xin chào ông Zhao, tôi gọi điện theo dõi yêu cầu của ông về việc thuê tầng 6 của Tòa nhà Commerce Tower.",
        timestamp: [0, 5.2],
        ipa: "/həˈləʊ ˈmɪs.tər dʒaʊ aɪ æm ˈfɒl.əʊ.ɪŋ ʌp ɒn jɔːr ɪnˈkwaɪə.ri əˈbaʊt ˈliːs.ɪŋ ðə sɪksθ flɔːr əv ˈkɒm.ɜːs ˈtaʊ.ər/"
      },
      {
        id: 2,
        speaker: "Property Leasing Manager",
        text: "The property owner has reviewed your proposed counter-offer regarding the monthly rental rate per square foot.",
        translation: "Chủ sở hữu bất động sản đã xem xét đề xuất thương lượng lại của ông về giá thuê hàng tháng trên mỗi foot vuông.",
        timestamp: [5.2, 10.6],
        ipa: "/ðə ˈprɒp.ə.ti ˈəʊ.nər hæz rɪˈvjuːd jɔːr prəˈpəʊzd ˈkaʊn.tər-ˈɒf.ər rɪˈɡɑː.dɪŋ ðə ˈmʌnθ.li ˈren.təl reɪt pɜː skweər fʊt/"
      },
      {
        id: 3,
        speaker: "Property Leasing Manager",
        text: "They agreed to lower the base rent by five percent if you commit to a minimum three-year lease term.",
        translation: "Họ đã đồng ý giảm 5% giá thuê cơ bản nếu ông cam kết thời hạn hợp đồng tối thiểu 3 năm.",
        timestamp: [10.6, 15.9],
        ipa: "/ðeɪ əˈɡriːd tuː ˈləʊ.ər ðə beɪs rent baɪ faɪv pəˈsent ɪf juː kəˈmɪt tuː ə ˈmɪn.ɪ.məm θriː-jɪər liːs tɜːm/"
      },
      {
        id: 4,
        speaker: "Property Leasing Manager",
        text: "I will send the revised lease draft to your legal counsel this afternoon for final review before signing.",
        translation: "Tôi sẽ gửi bản thảo hợp đồng thuê đã chỉnh sửa cho cố vấn pháp lý của ông vào chiều nay để rà soát lần cuối trước khi ký.",
        timestamp: [15.9, 23.0],
        ipa: "/aɪ wɪl send ðə rɪˈvaɪzd liːs drɑːft tuː jɔːr ˈliː.ɡəl ˈkaʊn.səl ðɪs ˌɑːf.təˈnuːn fɔːr ˈfaɪ.nəl rɪˈvjuː bɪˈfɔː ˈsaɪn.ɪŋ/"
      }
    ],
    vocabList: [
      {
        word: "tenant",
        ipa: "/ˈten.ənt/",
        pos: "Noun",
        meaning: "Người/ đơn vị thuê",
        detailMeaning: "Khách hàng thuê sử dụng diện tích văn phòng.",
        collocations: ["prospective tenant", "tenant agreement"],
        example: "Prospective tenants must provide commercial credit references."
      },
      {
        word: "renovation",
        ipa: "/ˌren.əˈveɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự cải tạo sửa chữa",
        detailMeaning: "Sửa chữa nội thất mặt bằng trước khi bàn giao.",
        collocations: ["office renovation", "cover renovation costs"],
        example: "The landlord agreed to cover partial office renovation costs."
      },
      {
        word: "square footage",
        ipa: "/skwer ˈfʊt.ɪdʒ/",
        pos: "Noun",
        meaning: "Diện tích tính bằng foot vuông",
        detailMeaning: "Đơn vị đo lường quy mô diện tích mặt bằng thuê.",
        collocations: ["available square footage", "rental per square foot"],
        example: "The total available square footage includes ten private offices."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Điều khoản Hợp đồng: the agreement includes a clause stating that + Clause",
        explanation: "Giải thích các điều khoản thương lượng thuê văn phòng.",
        example: "The lease agreement includes a clause covering annual rent escalation.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Bị động Yêu cầu: be required to pay + Noun",
        explanation: "Quy định tiền cọc và nghĩa vụ của bên thuê.",
        example: "Tenants are required to pay a two-month security deposit.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_042",
    title: "Pharmaceutical Clinical Trial & Regulatory Approval",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Clinical Research Director",
        text: "Good morning research team, I have a significant milestone to report regarding our new cardiovascular medication.",
        translation: "Chào buổi sáng đội ngũ nghiên cứu, tôi có một cột mốc quan trọng cần báo cáo liên quan đến loại thuốc tim mạch mới của chúng ta.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ rɪˈsɜːtʃ tiːm aɪ hæv ə sɪɡˈnɪf.ɪ.kənt ˈmaɪl.stəʊn tuː rɪˈpɔːt rɪˈɡɑː.dɪŋ ˈaʊər njuː ˌkɑː.di.əʊˈvæs.kjə.lər ˌmed.ɪˈkeɪ.ʃən/"
      },
      {
        id: 2,
        speaker: "Clinical Research Director",
        text: "Phase three clinical trials have officially concluded with a ninety-two percent efficacy rate among participants.",
        translation: "Các cuộc thử nghiệm lâm sàng Giai đoạn 3 đã chính thức kết thúc với tỷ lệ hiệu quả 92% trong số những người tham gia.",
        timestamp: [5.3, 10.8],
        ipa: "/feɪz θriː ˈklɪn.ɪ.kəl traɪəlz hæv əˈfɪʃ.əl.i kənˈkluː.dɪd wɪð ə ˈnaɪn.ti-tuː pəˈsent ˈef.ɪ.kə.si reɪt əˈmʌŋ pɑːˈtɪs.ɪ.pənts/"
      },
      {
        id: 3,
        speaker: "Clinical Research Director",
        text: "Our regulatory affairs team is currently assembling the documentation for health authority approval next month.",
        translation: "Đội ngũ phụ trách pháp lý của chúng ta hiện đang hoàn thiện bộ hồ sơ để xin phê duyệt từ cơ quan y tế vào tháng tới.",
        timestamp: [10.8, 16.1],
        ipa: "/ˈaʊər ˈreɡ.jə.lə.tər.i əˈfeəz tiːm ɪz ˈkʌr.ənt.li əˈsem.blɪŋ ðə ˌdɒk.jə.menˈteɪ.ʃən fɔːr helθ ɔːˈθɒr.ə.ti əˈpruː.vəl nekst mʌnθ/"
      },
      {
        id: 4,
        speaker: "Clinical Research Director",
        text: "Pending authorization, commercial manufacturing is scheduled to commence at our main facility in November.",
        translation: "Trong lúc chờ cấp phép, việc sản xuất thương mại được lên lịch bắt đầu tại nhà máy chính của chúng ta vào tháng 11.",
        timestamp: [16.1, 23.0],
        ipa: "/ˈpen.dɪŋ ˌɔː.θə.raɪˈzeɪ.ʃən kəˈmɜː.ʃəl ˌmæn.jəˈfæk.tʃə.rɪŋ ɪz ˈʃed.juːld tuː kəˈmens æt ˈaʊər meɪn fəˈsɪl.ə.ti ɪn nəʊˈvem.bər/"
      }
    ],
    vocabList: [
      {
        word: "clinical trial",
        ipa: "/ˈklɪn.ɪ.kəl traɪəl/",
        pos: "Noun",
        meaning: "Thử nghiệm lâm sàng",
        detailMeaning: "Thử nghiệm hiệu quả thuốc trên bệnh nhân thực tế.",
        collocations: ["Phase 3 clinical trial", "conduct trials"],
        example: "The drug entered Phase 3 clinical trials last month."
      },
      {
        word: "efficacy",
        ipa: "/ˈef.ə.kə.si/",
        pos: "Noun",
        meaning: "Hiệu quả điều trị thuốc",
        detailMeaning: "Tỷ lệ đáp ứng chữa bệnh của dược phẩm.",
        collocations: ["efficacy rate", "treatment efficacy"],
        example: "Preliminary data demonstrated high treatment efficacy."
      },
      {
        word: "compliance",
        ipa: "/kəmˈplaɪ.əns/",
        pos: "Noun",
        meaning: "Sự tuân thủ tiêu chuẩn y tế",
        detailMeaning: "Đáp ứng đầy đủ quy định cơ quan y tế khắt khe.",
        collocations: ["regulatory compliance", "strict compliance"],
        example: "Strict compliance with safety standards is mandatory."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Thì Hiện tại Hoàn thành: has been approved by + Noun",
        explanation: "Thông báo về việc thuốc được cơ quan y tế phê duyệt.",
        example: "The trial protocol has been approved by the health authority.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Diễn tả Mục đích Y tế: in order to evaluate + Noun",
        explanation: "Giải thích mục đích đo lường tác dụng phụ của thuốc.",
        example: "Data is gathered in order to evaluate long-term side effects.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_041",
    title: "M&A Acquisition Due Diligence & Financial Audit",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "M&A Advisory Lead",
        text: "Hello executive team, this is an update regarding the ongoing financial due diligence for Project Titan.",
        translation: "Xin chào ban điều hành, đây là bản cập nhật liên quan đến quá trình thẩm định tài chính đang diễn ra cho Dự án Titan.",
        timestamp: [0, 5.3],
        ipa: "/həˈləʊ ɪɡˈzek.jə.tɪv tiːm ðɪs ɪz æn ʌpˈdeɪt rɪˈɡɑː.dɪŋ ðə ˈɒnˌɡəʊ.ɪŋ faɪˈnæn.ʃəl djuː ˈdɪl.ɪ.dʒəns fɔːr ˈprɒdʒ.ekt ˈtaɪ.tən/"
      },
      {
        id: 2,
        speaker: "M&A Advisory Lead",
        text: "Our audit team completed the review of the target firm's balance sheets and historical tax filings.",
        translation: "Đội ngũ kiểm toán của chúng tôi đã hoàn thành việc xem xét bảng cân đối kế toán và hồ sơ kê khai thuế lịch sử của công ty mục tiêu.",
        timestamp: [5.3, 10.7],
        ipa: "/ˈaʊər ˈɔː.dɪt tiːm kəmˈpliː.tɪd ðə rɪˈvjuː əv ðə ˈtɑː.ɡɪt fɜːmz ˈbæl.əns ʃiːts ænd hɪˈstɒr.ɪ.kəl tæks ˈfaɪ.lɪŋz/"
      },
      {
        id: 3,
        speaker: "M&A Advisory Lead",
        text: "While overall revenue growth is verified, we uncovered two million dollars in undisclosed contingent liabilities.",
        translation: "Trong khi mức tăng trưởng doanh thu tổng thể đã được xác minh, chúng tôi phát hiện 2 triệu đô la các khoản nợ tiềm tàng chưa được tiết lộ.",
        timestamp: [10.7, 16.1],
        ipa: "/waɪl ˌəʊ.vərˈɔːl ˈrev.ən.juː ɡrəʊθ ɪz ˈver.ɪ.faɪd wiː ʌnˈkʌv.əd tuː ˈmɪl.jən ˈdɒl.əz ɪn ˌʌn.dɪsˈkləʊzd kənˈtɪn.dʒənt ˌlaɪ.əˈbɪl.ə.tiːz/"
      },
      {
        id: 4,
        speaker: "M&A Advisory Lead",
        text: "We strongly advise renegotiating the final purchase price or including an indemnity clause in the definitive agreement.",
        translation: "Chúng tôi khuyến nghị khẩn thiết nên đàm phán lại giá mua cuối cùng hoặc đưa điều khoản bồi thường vào hợp đồng chính thức.",
        timestamp: [16.1, 23.0],
        ipa: "/wiː strɒŋ.li ədˈvaɪz ˌriː.nɪˈɡəʊ.ʃi.eɪ.tɪŋ ðə ˈfaɪ.nəl ˈpɜː.tʃəs praɪs ɔːr ɪnˈkluː.dɪŋ æn ɪnˈdem.nə.ti klɔːz ɪn ðə dɪˈfɪn.ɪ.tɪv əˈɡriː.mənt/"
      }
    ],
    vocabList: [
      {
        word: "due diligence",
        ipa: "/duː ˈdɪl.ə.dʒəns/",
        pos: "Noun",
        meaning: "Thẩm định toàn diện M&A",
        detailMeaning: "Kiểm tra toàn bộ hồ sơ sổ sách pháp lý & tài chính doanh nghiệp.",
        collocations: ["financial due diligence", "conduct due diligence"],
        example: "Conducting thorough due diligence minimizes post-acquisition risks."
      },
      {
        word: "liability",
        ipa: "/ˌlaɪ.əˈbɪl.ə.ti/",
        pos: "Noun",
        meaning: "Khoản nợ tiềm tàng",
        detailMeaning: "Nghĩa vụ nợ tài chính phải chi trả.",
        collocations: ["undisclosed liability", "tax liability"],
        example: "The audit uncovered undisclosed tax liabilities on the balance sheet."
      },
      {
        word: "synergy",
        ipa: "/ˈsɪn.ɚ.dʒi/",
        pos: "Noun",
        meaning: "Hiệu ứng cộng hưởng",
        detailMeaning: "Lợi ích cắt giảm chi phí sinh ra sau khi hai công ty sáp nhập.",
        collocations: ["cost synergy", "operational synergy"],
        example: "Merging operational teams will create significant cost synergies."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Báo cáo Phát hiện Thẩm định: due diligence revealed that + Clause",
        explanation: "Trình bày các rủi ro nợ phát hiện sau kiểm toán sáp nhập.",
        example: "Due diligence revealed that the target firm carries undisclosed debt.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Khuyên bảo Hợp đồng: recommend inserting an indemnity clause to protect + Noun",
        explanation: "Khuyên đưa điều khoản bồi thường vào hợp đồng M&A.",
        example: "We recommend inserting an indemnity clause into the final agreement.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_040",
    title: "Corporate Venture Capital & Series B Funding Round",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Venture Capitalist",
        text: "Good morning investors, I am thrilled to announce the successful closing of our Series B funding round.",
        translation: "Chào buổi sáng các nhà đầu tư, tôi rất vui mừng thông báo việc đóng thành công vòng gọi vốn Series B của chúng tôi.",
        timestamp: [0, 5.2],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ɪnˈves.təz aɪ æm θrɪld tuː əˈnaʊns ðə səkˈses.fəl ˈkləʊ.zɪŋ əv ˈaʊər ˈsɪə.riːz biː ˈfʌn.dɪŋ raʊnd/"
      },
      {
        id: 2,
        speaker: "Venture Capitalist",
        text: "We raised twenty-five million dollars led by Horizon Venture Partners at a pre-money valuation of eighty million.",
        translation: "Chúng tôi đã huy động được 25 triệu đô la do Horizon Venture Partners dẫn đầu với mức định giá trước khi gọi vốn là 80 triệu.",
        timestamp: [5.2, 10.7],
        ipa: "/wiː reɪzd ˈtwen.ti-faɪv ˈmɪl.jən ˈdɒl.əz led baɪ həˈraɪ.zən ˈven.tʃər ˈpɑːt.nəz æt ə priː-ˈmʌn.i ˌvæl.juˈeɪ.ʃən əv ˈeɪ.ti ˈmɪl.jən/"
      },
      {
        id: 3,
        speaker: "Venture Capitalist",
        text: "This capital injection will primarily fund research and development for our autonomous software algorithms.",
        translation: "Nguồn vốn bơm bổ sung này sẽ chủ yếu tài trợ cho việc nghiên cứu và phát triển các thuật toán phần mềm tự hành của chúng tôi.",
        timestamp: [10.7, 16.0],
        ipa: "/ðɪs ˈkæp.ɪ.təl ɪnˈdʒek.ʃən wɪl ˈpraɪ.mər.əl.i fʌnd rɪˈsɜːtʃ ænd dɪˈvel.əp.mənt fɔːr ˈaʊər ɔːˈtɒn.ə.məs ˈsɒft.weər ˈæl.ɡə.rɪ.ðəmz/"
      },
      {
        id: 4,
        speaker: "Venture Capitalist",
        text: "We also plan to expand our sales presence across the European market over the next eighteen months.",
        translation: "Chúng tôi cũng dự định mở rộng sự hiện diện bán hàng trên khắp thị trường Châu Âu trong 18 tháng tới.",
        timestamp: [16.0, 23.0],
        ipa: "/wiː ˈɔːl.səʊ plæn tuː ɪkˈspænd ˈaʊər seɪlz ˈprez.əns əˈkrɒs ðə ˌjʊə.rəˈpiː.ən ˈmɑː.kɪt ˈəʊ.vər ðə nekst ˌeɪˈtiːn mʌnθs/"
      }
    ],
    vocabList: [
      {
        word: "valuation",
        ipa: "/ˌvæl.juˈeɪ.ʃən/",
        pos: "Noun",
        meaning: "Định giá doanh nghiệp",
        detailMeaning: "Giá trị thị trường ước tính của startup khi gọi vốn.",
        collocations: ["pre-money valuation", "company valuation"],
        example: "The startup achieved a hundred-million-dollar valuation after Series B."
      },
      {
        word: "equity stake",
        ipa: "/ˈek.wə.t̬i steɪk/",
        pos: "Noun",
        meaning: "Tỷ lệ cổ phần sở hữu",
        detailMeaning: "Phần trăm quyền sở hữu công ty của quỹ đầu tư.",
        collocations: ["acquire equity stake", "minority equity stake"],
        example: "Investors acquired a fifteen percent equity stake in exchange for venture capital."
      },
      {
        word: "capital injection",
        ipa: "/ˈkæp.ə.t̬əl ɪnˈdʒek.ʃən/",
        pos: "Noun",
        meaning: "Nguồn vốn bơm bổ sung",
        detailMeaning: "Dòng tiền mới rót vào doanh nghiệp để mở rộng quy mô.",
        collocations: ["receive capital injection", "fund expansion"],
        example: "The capital injection will accelerate international market expansion."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Thông báo Huy động Vốn: successfully closed + Amount + in Series [Letter]",
        explanation: "Thông báo kết quả gọi vốn từ các quỹ mạo hiểm.",
        example: "The firm successfully closed $20 million in Series B financing.",
        sentenceId: 1
      },
      {
        title: "Cấu trúc Diễn tả Mục đích Bơm Vốn: funds will be allocated toward + V-ing",
        explanation: "Giải thích mục tiêu phân bổ nguồn vốn mới.",
        example: "Funds will be allocated toward scaling engineering teams.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_039",
    title: "Mutual Fund Asset Allocation & Risk Diversification",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Wealth Management Advisor",
        text: "Hello Ms. Gable, thank you for coming in today for your annual portfolio review session.",
        translation: "Xin chào bà Gable, cảm ơn bà đã đến tham dự buổi đánh giá danh mục đầu tư hàng năm hôm nay.",
        timestamp: [0, 5.1],
        ipa: "/həˈləʊ ˈmɪz ˈɡeɪ.bəl θæŋk juː fɔːr ˈkʌm.ɪŋ ɪn təˈdeɪ fɔːr jɔːr ˈæn.ju.əl pɔːtˈfəʊ.li.əʊ rɪˈvjuː ˈseʃ.ən/"
      },
      {
        id: 2,
        speaker: "Wealth Management Advisor",
        text: "Given recent interest rate adjustments, I recommend rebalancing your current mutual fund holdings.",
        translation: "Dựa trên những điều chỉnh lãi suất gần đây, tôi đề xuất tái cơ cấu các khoản nắm giữ quỹ tương hỗ hiện tại của bà.",
        timestamp: [5.1, 10.5],
        ipa: "/ɡɪv.ən ˈriː.sənt ˈɪn.trest reɪt əˈdʒʌst.mənts aɪ ˌrek.əˈmend ˌriːˈbæl.əns.ɪŋ jɔːr ˈkʌr.ənt ˈmjuː.tʃu.əl fʌnd ˈhəʊl.dɪŋz/"
      },
      {
        id: 3,
        speaker: "Wealth Management Advisor",
        text: "Shifting fifteen percent of your capital from growth equities into fixed-income bonds will reduce overall portfolio volatility.",
        translation: "Việc chuyển 15% vốn từ cổ phiếu tăng trưởng sang trái phiếu có thu nhập cố định sẽ giúp giảm biến động tổng thể của danh mục.",
        timestamp: [10.5, 15.9],
        ipa: "/ʃɪft.ɪŋ ˌfɪfˈtiːn pəˈsent əv jɔːr ˈkæp.ɪ.təl frəm ɡrəʊθ ˈek.wɪ.tiːz ˈɪn.tuː fɪkst-ˈɪn.kʌm bɒndz wɪl rɪˈdjuːs ˌəʊ.vərˈɔːl pɔːtˈfəʊ.li.əʊ ˌvɒl.əˈtɪl.ə.ti/"
      },
      {
        id: 4,
        speaker: "Wealth Management Advisor",
        text: "This strategy ensures steady dividend yield while preserving your principal investment over the long term.",
        translation: "Chiến lược này đảm bảo tỷ suất cổ tức ổn định trong khi bảo toàn vốn đầu tư ban đầu của bà trong dài hạn.",
        timestamp: [15.9, 23.0],
        ipa: "/ðɪs ˈstræt.ə.dʒi ɪnˈʃʊəz ˈsted.i ˈdɪv.ɪ.dend jiːld waɪl prɪˈzɜːv.ɪŋ jɔːr ˈprɪn.sə.pəl ɪnˈvest.mənt ˈəʊ.vər ðə lɒŋ tɜːm/"
      }
    ],
    vocabList: [
      {
        word: "asset allocation",
        ipa: "/ˈæs.et ˌæl.əˈkeɪ.ʃən/",
        pos: "Noun",
        meaning: "Phân bổ tài sản đầu tư",
        detailMeaning: "Chia tỷ lệ vốn vào cổ phiếu, trái phiếu và tiền mặt.",
        collocations: ["proper asset allocation", "portfolio allocation"],
        example: "Proper asset allocation balances equity growth with fixed-income security."
      },
      {
        word: "yield",
        ipa: "/jiːld/",
        pos: "Noun / Verb",
        meaning: "Lợi suất, tỷ suất sinh lời",
        detailMeaning: "Mức cổ tức hoặc lãi suất thực tế nhận được từ khoản đầu tư.",
        collocations: ["dividend yield", "high-yield bond"],
        example: "High-yield corporate bonds offer attractive interest rates but carry higher credit risk."
      },
      {
        word: "volatility",
        ipa: "/ˌvɑː.ləˈtɪl.ə.ti/",
        pos: "Noun",
        meaning: "Biến động giá thị trường",
        detailMeaning: "Mức độ tăng giảm giá nhanh của cổ phiếu.",
        collocations: ["portfolio volatility", "market volatility"],
        example: "Government securities shield capital during periods of equity market volatility."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Đề xuất Tái cơ cấu: recommend rebalancing + Noun",
        explanation: "Lời khuyên thay đổi tỷ trọng danh mục đầu tư.",
        example: "We recommend rebalancing your portfolio to reduce equity exposure.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc So sánh Tương quan: allocate more toward [Asset] to stabilize [Metric]",
        explanation: "Chiến lược chuyển vốn giảm thiểu rủi ro biến động.",
        example: "Allocate more toward bonds to stabilize overall returns.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_038",
    title: "Quarterly Earnings Report & Dividend Announcement",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Investor Relations Director",
        text: "Welcome shareholders, I am pleased to present the strategic highlights from our Q2 financial results webcast.",
        translation: "Chào mừng quý cổ đông, tôi rất hân hạnh được trình bày các điểm sáng chiến lược từ buổi phát trực tuyến kết quả tài chính Quý 2.",
        timestamp: [0, 5.3],
        ipa: "/ˈwel.kəm ˈʃeəˌhəʊl.dəz aɪ æm pliːzd tuː prɪˈzent ðə strəˈtiː.dʒɪk ˈhaɪ.laɪts frəm ˈaʊər kjuː-tuː faɪˈnæn.ʃəl rɪˈzʌlts ˈweb.kɑːst/"
      },
      {
        id: 2,
        speaker: "Investor Relations Director",
        text: "Driven by strong profit margins, the board of directors has declared a cash dividend of fifty cents per share.",
        translation: "Nhờ tỷ suất lợi nhuận đạt mức cao, Hội đồng quản trị đã tuyên bố chia cổ tức bằng tiền mặt 50 cent cho mỗi cổ phiếu.",
        timestamp: [5.3, 10.8],
        ipa: "/drɪv.ən baɪ strɒŋ ˈprɒf.ɪt ˈmɑː.dʒɪnz ðə bɔːd əv dɪˈrek.təz hæz dɪˈkleəd ə kæʃ ˈdɪv.ɪ.dend əv ˈfɪf.ti sents pɜː ʃeər/"
      },
      {
        id: 3,
        speaker: "Investor Relations Director",
        text: "This payout represents a ten percent increase compared to the dividend distributed during the previous quarter.",
        translation: "Khoản chi trả này đại diện cho mức tăng 10% so với đợt cổ tức được phân phối trong quý trước.",
        timestamp: [10.8, 16.1],
        ipa: "/ðɪs ˈpeɪ.aʊt ˌrep.rɪˈzents ə ten pəˈsent ɪnˈkriːs kəmˈpeəd tuː ðə ˈdɪv.ɪ.dend dɪˈstrɪb.juː.tɪd ˈdjʊə.rɪŋ ðə ˈpriː.vi.əs ˈkwɔː.tər/"
      },
      {
        id: 4,
        speaker: "Investor Relations Director",
        text: "The dividend will be payable on August 20th to all shareholders registered as of the record date of August 5th.",
        translation: "Cổ tức sẽ được thanh toán vào ngày 20 tháng 8 cho tất cả cổ đông đăng ký tính đến ngày chốt danh sách là ngày 5 tháng 8.",
        timestamp: [16.1, 23.0],
        ipa: "/ðə ˈdɪv.ɪ.dend wɪl biː ˈpeɪ.ə.bəl ɒn ˈɔː.ɡəst ˈtwen.ti.əθ tuː ɔːl ˈʃeəˌhəʊl.dəz ˈredʒ.ɪ.stəd æz əv ðə ˈrek.ɔːd deɪt əv ˈɔː.ɡəst fɪfθ/"
      }
    ],
    vocabList: [
      {
        word: "dividend",
        ipa: "/ˈdɪv.ə.dend/",
        pos: "Noun",
        meaning: "Cổ tức",
        detailMeaning: "Khoản lợi nhuận doanh nghiệp chi trả cho cổ đông.",
        collocations: ["cash dividend", "declare dividend"],
        example: "Board members approved a quarterly dividend payout to common shareholders."
      },
      {
        word: "payout",
        ipa: "/ˈpeɪ.aʊt/",
        pos: "Noun",
        meaning: "Khoản chi trả tiền mặt",
        detailMeaning: "Tổng số tiền cổ tức được phân phối.",
        collocations: ["dividend payout", "payout ratio"],
        example: "The dividend payout ratio remains consistent with last year's guidance."
      },
      {
        word: "portfolio",
        ipa: "/ˌpɔːrtˈfoʊ.li.oʊ/",
        pos: "Noun",
        meaning: "Danh mục đầu tư",
        detailMeaning: "Tập hợp tài sản tài chính nắm giữ.",
        collocations: ["asset portfolio", "diversify portfolio"],
        example: "Diversifying your asset portfolio helps mitigate equity market volatility."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Tương lai với Quyết định HĐQT: the board has declared + Noun",
        explanation: "Thông báo chính thức về việc chia cổ tức.",
        example: "The board of directors has declared a cash dividend.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bổ nghĩa chỉ mốc thời gian chốt quyền: payable on [Date] to shareholders of record on [Date]",
        explanation: "Quy định ngày chi trả và ngày chốt quyền nhận cổ tức.",
        example: "Dividends are payable on August 15th.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_037",
    title: "Commercial Loan Application & Credit Risk Assessment",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Commercial Risk Officer",
        text: "Good morning Mr. Harrison, this is Corporate Lending Services following up on your commercial loan request.",
        translation: "Chào buổi sáng ông Harrison, đây là Bộ phận Dịch vụ Cho vay Doanh nghiệp theo dõi yêu cầu vay thương mại của ông.",
        timestamp: [0, 5.2],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈmɪs.tər ˈhær.ɪ.sən ðɪs ɪz ˈkɔː.pər.ət ˈlend.ɪŋ ˈsɜː.vɪs.ɪz ˈfɒl.əʊ.ɪŋ ʌp ɒn jɔːr kəˈmɜː.ʃəl ləʊn rɪˈkwest/"
      },
      {
        id: 2,
        speaker: "Commercial Risk Officer",
        text: "Our underwriting committee has reviewed your business expansion plan and preliminary financial statements.",
        translation: "Ủy ban thẩm định của chúng tôi đã xem xét kế hoạch mở rộng kinh doanh và báo cáo tài chính sơ bộ của ông.",
        timestamp: [5.2, 10.6],
        ipa: "/ˈaʊər ˈʌn.dəˌraɪ.tɪŋ kəˈmɪt.i hæz rɪˈvjuːd jɔːr ˈbɪz.nɪs ɪkˈspæn.ʃən plæn ænd prɪˈlɪm.ɪ.nər.i faɪˈnæn.ʃəl ˈsteɪt.mənts/"
      },
      {
        id: 3,
        speaker: "Commercial Risk Officer",
        text: "While your cash flow projections look strong, final approval is subject to an independent appraisal of the collateral.",
        translation: "Mặc dù dự báo dòng tiền của ông rất khả quan, việc phê duyệt cuối cùng vẫn phụ thuộc vào kết quả thẩm định tài sản thế chấp độc lập.",
        timestamp: [10.6, 16.0],
        ipa: "/waɪl jɔːr kæʃ fləʊ prəˈdʒek.ʃənz lʊk strɒŋ ˈfaɪ.nəl əˈpruː.vəl ɪz ˈsʌb.dʒɪkt tuː æn ˌɪn.dɪˈpen.dənt əˈpreɪ.zəl əv ðə kəˈlæt.ər.əl/"
      },
      {
        id: 4,
        speaker: "Commercial Risk Officer",
        text: "Please submit the property title deeds to our branch office by Thursday to complete the credit assessment.",
        translation: "Vui lòng nộp giấy chứng nhận quyền sở hữu tài sản cho văn phòng chi nhánh của chúng tôi trước Thứ Năm để hoàn tất đánh giá tín dụng.",
        timestamp: [16.0, 23.0],
        ipa: "/pliːz səbˈmɪt ðə ˈprɒp.ə.ti ˈtaɪ.təl diːdz tuː ˈaʊər brɑːntʃ ˈɒf.ɪs baɪ ˈθɜːz.deɪ tuː kəmˈpliːt ðə ˈkred.ɪt əˈses.mənt/"
      }
    ],
    vocabList: [
      {
        word: "collateral",
        ipa: "/kəˈlæt̬.ɚ.əl/",
        pos: "Noun",
        meaning: "Tài sản thế chấp",
        detailMeaning: "Tài sản thuộc quyền sở hữu dùng đảm bảo cho khoản vay.",
        collocations: ["loan collateral", "property collateral"],
        example: "Real estate properties are frequently used as loan collateral."
      },
      {
        word: "creditworthiness",
        ipa: "/ˈkred.ɪtˌwɝː.ði.nəs/",
        pos: "Noun",
        meaning: "Mức độ uy tín tín dụng",
        detailMeaning: "Khả năng hoàn trả khoản vay đúng hạn của doanh nghiệp.",
        collocations: ["evaluate creditworthiness", "creditworthiness score"],
        example: "The bank evaluates corporate creditworthiness before approval."
      },
      {
        word: "amortization",
        ipa: "/əˌmɔːr.t̬əˈzeɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự trả góp gốc và lãi",
        detailMeaning: "Lịch trình khấu hao chi trả theo kỳ.",
        collocations: ["amortization schedule", "loan amortization"],
        example: "The loan features a fixed monthly amortization schedule over five years."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả điều kiện phê duyệt: subject to + Noun",
        explanation: "Điều kiện bắt buộc để khoản vay được phê duyệt chính thức.",
        example: "Approval is subject to a satisfactory property appraisal.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Bị động Yêu cầu Bổ sung: be required to furnish + Noun",
        explanation: "Yêu cầu doanh nghiệp nộp chứng từ tài chính.",
        example: "Applicants are required to furnish audited financial statements.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_036",
    title: "Letter of Credit Verification & Payment Guarantee",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "International Trade Banker",
        text: "Good morning Ms. Chen, I am calling from International Trade Operations regarding your irrevocable Letter of Credit.",
        translation: "Chào buổi sáng bà Chen, tôi gọi từ Bộ phận Nghiệp vụ Thương mại Quốc tế liên quan đến Thư tín dụng không thể hủy ngang của bà.",
        timestamp: [0, 5.3],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈmɪz tʃen aɪ æm ˈkɔː.lɪŋ frəm ˌɪn.təˈnæʃ.ən.əl treɪd ˌɒp.ərˈeɪ.ʃənz rɪˈɡɑː.dɪŋ jɔːr ɪˈrev.ə.kə.bəl ˈlet.ər əv ˈkred.ɪt/"
      },
      {
        id: 2,
        speaker: "International Trade Banker",
        text: "We received the shipping documents submitted by your seller, but our audit revealed two minor discrepancies.",
        translation: "Chúng tôi đã nhận được bộ chứng từ vận chuyển do bên bán của bà nộp, nhưng kiểm toán của chúng tôi phát hiện hai bất biệt nhỏ.",
        timestamp: [5.3, 10.7],
        ipa: "/wiː rɪˈsiːvd ðə ˈʃɪp.ɪŋ ˈdɒk.jə.mənts səbˈmɪt.ɪd baɪ jɔːr ˈsel.ər bʌt ˈaʊər ˈɔː.dɪt rɪˈviːld tuː ˈmaɪ.nər dɪˈskrep.ən.siːz/"
      },
      {
        id: 3,
        speaker: "International Trade Banker",
        text: "Specifically, the bill of lading shipment date is two days past the latest shipment date specified in the L/C.",
        translation: "Cụ thể, ngày xếp hàng trên vận đơn trễ hai ngày so với ngày xếp hàng muộn nhất được quy định trong L/C.",
        timestamp: [10.7, 16.1],
        ipa: "/spəˈsɪf.ɪ.kəl.i ðə bɪl əv ˈleɪ.dɪŋ ˈʃɪp.mənt deɪt ɪz tuː deɪz pɑːst ðə ˈleɪ.tɪst ˈʃɪp.mənt deɪt spəˈsɪf.aɪd ɪn ðə el-siː/"
      },
      {
        id: 4,
        speaker: "International Trade Banker",
        text: "To process the payment, we require an official waiver authorization from your company by 3 PM today.",
        translation: "Để tiến hành thanh toán, chúng tôi cần văn bản chấp nhận bất biệt chính thức từ công ty bà trước 3 giờ chiều nay.",
        timestamp: [16.1, 23.0],
        ipa: "/tuː ˈprəʊ.ses ðə ˈpeɪ.mənt wiː rɪˈkwaɪər æn əˈfɪʃ.əl ˈweɪ.vər ˌɔː.θə.raɪˈzeɪ.ʃən frəm jɔːr ˈkʌm.pə.ni baɪ θriː piː-em təˈdeɪ/"
      }
    ],
    vocabList: [
      {
        word: "Letter of Credit",
        ipa: "/ˈlet.ɚ əv ˈkred.ɪt/",
        pos: "Noun",
        meaning: "Thư tín dụng (L/C)",
        detailMeaning: "Cam kết thanh toán của ngân hàng mở cho bên thụ hưởng.",
        collocations: ["irrevocable Letter of Credit", "open L/C"],
        example: "Payment will be released upon presentation of valid documents under the Letter of Credit."
      },
      {
        word: "beneficiary",
        ipa: "/ˌben.əˈfɪʃ.i.er.i/",
        pos: "Noun",
        meaning: "Người thụ hưởng",
        detailMeaning: "Bên xuất khẩu được nhận tiền thanh toán theo L/C.",
        collocations: ["named beneficiary", "L/C beneficiary"],
        example: "The exporter is named as the beneficiary in the L/C agreement."
      },
      {
        word: "discrepancy",
        ipa: "/dɪˈskrep.ən.si/",
        pos: "Noun",
        meaning: "Sự bất đồng, sai lệch chứng từ",
        detailMeaning: "Lỗi không khớp thông tin giữa chứng từ và L/C.",
        collocations: ["minor discrepancy", "document discrepancy"],
        example: "Any discrepancy in document dates can cause payment delays."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Điều kiện Thanh toán Ngân hàng: payment will be executed once + Clause",
        explanation: "Điều kiện ngân hàng giải ngân tiền L/C cho bên bán.",
        example: "Payment will be executed once all compliant documents are presented.",
        sentenceId: 4
      },
      {
        title: "Cấu trúc Bị động Yêu cầu Sửa đổi: the L/C needs to be amended by + Noun",
        explanation: "Thông báo tu chỉnh điều khoản L/C.",
        example: "The L/C needs to be amended by the issuing bank.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_035",
    title: "Port Congestion & Container Terminal Surcharge",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Shipping Line Director",
        text: "Attention all regional clients, this is an official advisory notice from Pacific Cargo Lines.",
        translation: "Xin chú ý toàn thể khách hàng trong khu vực, đây là thông báo tư vấn chính thức từ hãng tàu Pacific Cargo Lines.",
        timestamp: [0, 5.1],
        ipa: "/əˈten.ʃən ɔːl ˈriː.dʒən.əl ˈklaɪ.ənts ðɪs ɪz æn əˈfɪʃ.əl ədˈvaɪ.zər.i ˈnəʊ.tɪs frəm pəˈsɪf.ɪk ˈkɑː.ɡəʊ laɪnz/"
      },
      {
        id: 2,
        speaker: "Shipping Line Director",
        text: "Due to severe port congestion at the West Coast terminal, vessel wait times have increased significantly.",
        translation: "Do tình trạng ùn tắc nghiêm trọng tại cảng bờ Tây, thời gian chờ của tàu đã tăng lên đáng kể.",
        timestamp: [5.1, 10.4],
        ipa: "/djuː tuː sɪˈvɪər pɔːt kənˈdʒes.tʃən æt ðə west kəʊst ˈtɜː.mɪ.nəl ˈves.əl weɪt taɪmz hæv ɪnˈkriːst sɪɡˈnɪf.ɪ.kənt.li/"
      },
      {
        id: 3,
        speaker: "Shipping Line Director",
        text: "Consequently, a temporary congestion surcharge of two hundred dollars per container will take effect on August 1st.",
        translation: "Do đó, khoản phụ phí ùn tắc tạm thời là 200 đô la cho mỗi container sẽ có hiệu lực từ ngày 1 tháng 8.",
        timestamp: [10.4, 15.8],
        ipa: "/ˈkɒn.sɪ.kwənt.li ə ˈtem.pər.ər.i kənˈdʒes.tʃən ˈsɜː.tʃɑːdʒ əv tuː ˈhʌn.drəd ˈdɒl.əz pɜː kənˈteɪ.nər wɪl teɪk ɪˈfekt ɒn ˈɔː.ɡəst fɜːst/"
      },
      {
        id: 4,
        speaker: "Shipping Line Director",
        text: "We encourage shippers to reroute urgent shipments through alternative ports on the Gulf Coast.",
        translation: "Chúng tôi khuyến khích các chủ hàng chuyển hướng các lô hàng gấp qua các cảng thay thế ở Vùng vịnh.",
        timestamp: [15.8, 22.0],
        ipa: "/wiː ɪnˈkʌr.ɪdʒ ˈʃɪp.əz tuː riːˈruːt ˈɜː.dʒənt ˈʃɪp.mənts θruː ɔːlˈtɜː.nə.tɪv pɔːts ɒn ðə ɡʌlf kəʊst/"
      }
    ],
    vocabList: [
      {
        word: "congestion",
        ipa: "/kənˈdʒes.tʃən/",
        pos: "Noun",
        meaning: "Sự ùn tắc, tắc nghẽn cảng",
        detailMeaning: "Tình trạng tàu chờ giải phóng hàng quá đông tại bến cảng.",
        collocations: ["port congestion", "severe congestion"],
        example: "Heavy port congestion delayed vessel unloading by four days."
      },
      {
        word: "surcharge",
        ipa: "/ˈsɜːr.tʃɑːrdʒ/",
        pos: "Noun",
        meaning: "Phụ phí",
        detailMeaning: "Khoản phí thu thêm ngoài cước vận tải cơ bản.",
        collocations: ["congestion surcharge", "fuel surcharge"],
        example: "A peak season surcharge will be added to ocean freight rates."
      },
      {
        word: "demurrage",
        ipa: "/dɪˈmɜːr.ɪdʒ/",
        pos: "Noun",
        meaning: "Phí lưu container quá hạn",
        detailMeaning: "Khoản phạt khi không nhận container ra khỏi cảng đúng hạn.",
        collocations: ["demurrage charges", "avoid demurrage"],
        example: "Avoid demurrage charges by picking up containers within three days."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả Phụ phí Phát sinh: a surcharge will be applied to + Noun",
        explanation: "Thông báo điều chỉnh phụ phí cước vận tải biển.",
        example: "A congestion surcharge will be applied to all inbound containers.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Nguyên nhân - Kết quả: due to congestion, vessels are forced to + V-bare",
        explanation: "Diễn tả hệ quả của việc ùn tắc cảng.",
        example: "Vessels are forced to anchor offshore for several days.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_034",
    title: "Incoterms Negotiation & CIF vs. FOB Terms",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Export Manager",
        text: "Good afternoon team, I want to update you on the contract negotiations with our distributor in Japan.",
        translation: "Chào buổi chiều cả đội, tôi muốn cập nhật về cuộc đàm phán hợp đồng với nhà phân phối của chúng ta tại Nhật Bản.",
        timestamp: [0, 5.2],
        ipa: "/ɡʊd ˌɑːf.təˈnuːn tiːm aɪ wɒnt tuː ʌpˈdeɪt juː ɒn ðə ˈkɒn.trækt nɪˌɡəʊ.ʃiˈeɪ.ʃənz wɪð ˈaʊər dɪˈstrɪb.jə.tər ɪn dʒəˈpæn/"
      },
      {
        id: 2,
        speaker: "Export Manager",
        text: "They originally requested FOB terms, meaning they would handle ocean freight and marine insurance arrangements.",
        translation: "Ban đầu họ yêu cầu điều khoản FOB, nghĩa là họ sẽ tự thu xếp vận tải đường biển và bảo hiểm hàng hải.",
        timestamp: [5.2, 10.6],
        ipa: "/ðeɪ əˈrɪdʒ.ən.əl.i rɪˈkwest.ɪd ef-əʊ-biː tɜːmz ˈmiː.nɪŋ ðeɪ wʊd ˈhæn.dəl ˈəʊ.ʃən freɪt ænd məˈriːn ɪnˈʃʊə.rəns əˈreɪndʒ.mənts/"
      },
      {
        id: 3,
        speaker: "Export Manager",
        text: "However, we agreed to switch to CIF terms so that our logistics team can maintain control over shipping schedules.",
        translation: "Tuy nhiên, chúng ta đã đồng ý chuyển sang điều khoản CIF để đội ngũ logistics của chúng ta có thể kiểm soát lịch trình vận chuyển.",
        timestamp: [10.6, 16.0],
        ipa: "/haʊˈev.ər wiː əˈɡriːd tuː swɪtʃ tuː siː-aɪ-ef tɜːmz səʊ ðæt ˈaʊər ləˈdʒɪs.tɪks tiːm kæn meɪnˈteɪn kənˈtrəʊl ˈəʊ.vər ˈʃɪp.ɪŋ ˈʃed.juːlz/"
      },
      {
        id: 4,
        speaker: "Export Manager",
        text: "We will include the insurance premium and ocean freight costs directly into the final commercial invoice.",
        translation: "Chúng ta sẽ tính phí bảo hiểm và cước phí vận tải biển trực tiếp vào hóa đơn thương mại cuối cùng.",
        timestamp: [16.0, 23.0],
        ipa: "/wiː wɪl ɪnˈkluːd ðə ɪnˈʃʊə.rəns ˈpriː.mi.əm ænd ˈəʊ.ʃən freɪt kɒsts daɪˈrekt.li ˈɪn.tuː ðə ˈfaɪ.nəl kəˈmɜː.ʃəl ˈɪn.vɔɪs/"
      }
    ],
    vocabList: [
      {
        word: "Incoterms",
        ipa: "/ˈɪn.koʊ.tɜːrmz/",
        pos: "Noun",
        meaning: "Điều khoản thương mại quốc tế",
        detailMeaning: "Quy tắc tiêu chuẩn xác định chi phí và rủi ro giữa người bán và mua.",
        collocations: ["FOB terms", "CIF terms"],
        example: "Choosing the right Incoterms determines who pays for ocean freight."
      },
      {
        word: "premium",
        ipa: "/ˈpriː.mi.əm/",
        pos: "Noun",
        meaning: "Phí bảo hiểm",
        detailMeaning: "Khoản chi phí chi trả cho hợp đồng bảo hiểm hàng hải.",
        collocations: ["insurance premium", "pay premium"],
        example: "Under CIF terms, the seller pays the insurance premium."
      },
      {
        word: "liability",
        ipa: "/ˌlaɪ.əˈbɪl.ə.ti/",
        pos: "Noun",
        meaning: "Trách nhiệm rủi ro",
        detailMeaning: "Trách nhiệm về tổn thất hàng hóa trong quá trình vận chuyển.",
        collocations: ["transfer liability", "legal liability"],
        example: "Liability transfers to the buyer once goods are loaded onto the vessel."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc So sánh Điều khoản: under [Term], the [Party] is responsible for + V-ing",
        explanation: "Phân định nghĩa vụ và chi phí hợp đồng xuất nhập khẩu.",
        example: "Under FOB terms, the buyer is responsible for arranging ocean freight.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Đề xuất Thay đổi: propose that we switch to + Noun",
        explanation: "Đưa ra phương án thương lượng điều khoản mới.",
        example: "We propose that we switch to CIF terms to simplify insurance.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_033",
    title: "Bill of Lading & Freight Forwarding Instructions",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Logistics Specialist",
        text: "Hello Jason, I am reviewing the draft shipping documents for our upcoming export to Germany.",
        translation: "Chào Jason, tôi đang rà soát bản thảo chứng từ vận chuyển cho lô hàng xuất khẩu sắp tới sang Đức.",
        timestamp: [0, 5.1],
        ipa: "/həˈləʊ ˈdʒeɪ.sən aɪ æm rɪˈvjuː.ɪŋ ðə drɑːft ˈʃɪp.ɪŋ ˈdɒk.jə.mənts fɔːr ˈaʊər ˈʌpˌkʌm.ɪŋ ˈek.spɔːt tuː ˈdʒɜː.mə.ni/"
      },
      {
        id: 2,
        speaker: "Logistics Specialist",
        text: "I noticed a discrepancy in the weight listed on the draft bill of lading compared to our packing list.",
        translation: "Tôi nhận thấy có sự sai lệch về trọng lượng ghi trên vận đơn bản thảo so với phiếu đóng gói (packing list) của chúng ta.",
        timestamp: [5.1, 10.4],
        ipa: "/aɪ ˈnəʊ.tɪst ə dɪˈskrep.ən.si ɪn ðə weɪt ˈlɪs.tɪd ɒn ðə drɑːft bɪl əv ˈleɪ.dɪŋ kəmˈpeəd tuː ˈaʊər ˈpæk.ɪŋ lɪst/"
      },
      {
        id: 3,
        speaker: "Logistics Specialist",
        text: "The bill of lading states twelve metric tons, whereas our actual net weight is fourteen metric tons.",
        translation: "Vận đơn ghi 12 tấn mét, trong khi trọng lượng tịnh thực tế của chúng ta là 14 tấn mét.",
        timestamp: [10.4, 15.8],
        ipa: "/ðə bɪl əv ˈleɪ.dɪŋ steɪts twelv ˈmet.rɪk tʌnz weərˈæz ˈaʊər ˈæk.tʃu.əl net weɪt ɪz ˌfɔːˈtiːn ˈmet.rɪk tʌnz/"
      },
      {
        id: 4,
        speaker: "Logistics Specialist",
        text: "Please contact the freight forwarder immediately to correct this error before the vessel departs on Friday.",
        translation: "Vui lòng liên hệ với bên giao nhận vận tải ngay lập tức để sửa lỗi này trước khi tàu khởi hành vào Thứ Sáu.",
        timestamp: [15.8, 23.0],
        ipa: "/pliːz ˈkɒn.tækt ðə freɪt ˈfɔː.wə.dər ɪˈmiː.di.ət.li tuː kəˈrekt ðɪs ˈer.ər bɪˈfɔː ðə ˈves.əl dɪˈpɑːts ɒn ˈfraɪ.deɪ/"
      }
    ],
    vocabList: [
      {
        word: "bill of lading",
        ipa: "/bɪl əv ˈleɪ.dɪŋ/",
        pos: "Noun",
        meaning: "Vận đơn đường biển (B/L)",
        detailMeaning: "Chứng từ do hãng tàu cấp xác nhận nhận hàng để vận chuyển.",
        collocations: ["draft bill of lading", "original B/L"],
        example: "The bill of lading acts as a receipt of goods shipped."
      },
      {
        word: "freight forwarder",
        ipa: "/freɪt ˈfɔːr.wɚ.dɚ/",
        pos: "Noun",
        meaning: "Công ty giao nhận vận tải",
        detailMeaning: "Đơn vị trung gian thu xếp quy trình vận chuyển logistics.",
        collocations: ["contact freight forwarder", "forwarding agent"],
        example: "Our freight forwarder arranged the sea transport."
      },
      {
        word: "consignee",
        ipa: "/ˌkɑːn.saɪˈniː/",
        pos: "Noun",
        meaning: "Người nhận hàng",
        detailMeaning: "Tên cá nhân/ doanh nghiệp nhận lô hàng tại cảng đích.",
        collocations: ["consignee address", "notify consignee"],
        example: "The consignee's contact details must match the invoice exactly."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Nhắc nhở Đối chiếu Dữ liệu: make sure that + Clause",
        explanation: "Đảm bảo tính chính xác thông tin trên bộ chứng từ xuất khẩu.",
        example: "Make sure that the consignee address matches the contract.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị động Thì Quá khứ Đơn: was issued by + Noun",
        explanation: "Thông báo về việc cấp chứng từ vận tải.",
        example: "The original bill of lading was issued by the shipping line.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_032",
    title: "Customs Clearance Delay & Tariff Compliance",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Customs Broker",
        text: "Good morning Mr. Vance, this is Clara from Apex Customs Brokerage regarding your inbound cargo container.",
        translation: "Chào buổi sáng ông Vance, đây là Clara từ Công ty Khai thuê Hải quan Apex liên quan đến thùng hàng nhập khẩu của ông.",
        timestamp: [0, 5.2],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈmɪs.tər væns ðɪs ɪz ˈklæ.rə frəm ˈeɪ.peks ˈkʌs.təmz ˈbrəʊ.kər.ɪdʒ rɪˈɡɑː.dɪŋ jɔːr ˈɪn.baʊnd ˈkɑː.ɡəʊ kənˈteɪ.nər/"
      },
      {
        id: 2,
        speaker: "Customs Broker",
        text: "Your shipment from South Korea is currently held up at the port pending customs clearance inspection.",
        translation: "Lô hàng của ông từ Hàn Quốc hiện đang bị giữ lại tại cảng để chờ kiểm tra thông quan hải quan.",
        timestamp: [5.2, 10.5],
        ipa: "/jɔːr ˈʃɪp.mənt frəm saʊθ kəˈriː.ə ɪz ˈkʌr.ənt.li held ʌp æt ðə pɔːt ˈpen.dɪŋ ˈkʌs.təmz ˈklɪr.əns ɪnˈspek.ʃən/"
      },
      {
        id: 3,
        speaker: "Customs Broker",
        text: "Customs officials require an updated Certificate of Origin to verify the applicable tariff rates.",
        translation: "Cán bộ hải quan yêu cầu Giấy chứng nhận xuất xứ (C/O) cập nhật để xác minh mức thuế suất áp dụng.",
        timestamp: [10.5, 15.9],
        ipa: "/ˈkʌs.təmz əˈfɪʃ.əlz rɪˈkwaɪər æn ʌpˈdeɪ.tɪd səˈtɪf.ɪ.kət əv ˈɒr.ɪ.dʒɪn tuː ˈver.ɪ.faɪ ðə əˈplɪk.ə.bəl ˈtær.ɪf reɪts/"
      },
      {
        id: 4,
        speaker: "Customs Broker",
        text: "Please email the signed document to our office today so we can release the goods without penalty.",
        translation: "Vui lòng gửi email tài liệu đã ký cho văn phòng chúng tôi trong hôm nay để chúng tôi có thể giải phóng hàng mà không bị phạt.",
        timestamp: [15.9, 23.0],
        ipa: "/pliːz ˈiː.meɪl ðə saɪnd ˈdɒk.jə.mənt tuː ˈaʊər ˈɒf.ɪs təˈdeɪ səʊ wiː kæn rɪˈliːs ðə ɡʊdz wɪðˈaʊt ˈpen.əl.ti/"
      }
    ],
    vocabList: [
      {
        word: "customs clearance",
        ipa: "/ˈkʌs.təmz ˈklɪr.əns/",
        pos: "Noun",
        meaning: "Sự thông quan hải quan",
        detailMeaning: "Quy trình làm thủ tục cho phép xuất/nhập khẩu hàng hóa qua biên giới.",
        collocations: ["customs clearance inspection", "pending clearance"],
        example: "The shipment is held up pending customs clearance."
      },
      {
        word: "tariff",
        ipa: "/ˈtær.ɪf/",
        pos: "Noun",
        meaning: "Thuế xuất nhập khẩu",
        detailMeaning: "Mức thuế chính phủ áp dụng cho hàng hóa nhập khẩu.",
        collocations: ["tariff rates", "applicable tariff"],
        example: "New tariffs were applied to imported electronic components."
      },
      {
        word: "documentation",
        ipa: "/ˌdɑː.kjə.menˈteɪ.ʃən/",
        pos: "Noun",
        meaning: "Bộ chứng từ hải quan",
        detailMeaning: "Các tài liệu giấy tờ bắt buộc trình nộp hải quan.",
        collocations: ["shipping documentation", "customs documentation"],
        example: "Ensure all shipping documentation is complete and accurate."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả nguyên nhân đọng hàng: held up due to + Noun",
        explanation: "Diễn tả lý do hàng hóa bị giữ lại tại cảng.",
        example: "The container was held up due to missing origin certificates.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bắt buộc Bổ sung Chứng từ: be required to submit + Noun",
        explanation: "Yêu cầu chính thức từ cơ quan hải quan.",
        example: "Importers are required to submit an official invoice.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_031",
    title: "Corporate Conference Keynote & Venue Direction",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Event Coordinator",
        text: "Good morning attendees, welcome to the opening day of the Global Tech Leadership Summit.",
        translation: "Chào buổi sáng các tham dự viên, chào mừng đến với ngày khai mạc Hội nghị Khai phóng Lãnh đạo Công nghệ Toàn cầu.",
        timestamp: [0, 5.2],
        ipa: "/ɡʊd ˈmɔː.nɪŋ əˈten.diːz ˈwel.kəm tuː ðə ˈəʊ.pən.ɪŋ deɪ əv ðə ˈɡləʊ.bəl tek ˈliː.də.ʃɪp ˈsʌm.ɪt/"
      },
      {
        id: 2,
        speaker: "Event Coordinator",
        text: "Please remember to collect your identification badge at the registration desk in the main lobby.",
        translation: "Xin lưu ý nhận thẻ đeo nhận diện của bạn tại quầy đăng ký ở sảnh chính.",
        timestamp: [5.2, 10.5],
        ipa: "/pliːz rɪˈmem.bər tuː kəˈlekt jɔːr aɪˌden.tɪ.fɪˈkeɪ.ʃən bædʒ æt ðə ˌredʒ.ɪˈstreɪ.ʃən desk ɪn ðə meɪn ˈlɒb.i/"
      },
      {
        id: 3,
        speaker: "Event Coordinator",
        text: "Our keynote speech on AI innovation will begin promptly at nine AM in the central auditorium.",
        translation: "Bài phát biểu chủ đạo của chúng ta về đổi mới AI sẽ bắt đầu đúng 9 giờ sáng tại khán phòng trung tâm.",
        timestamp: [10.5, 15.9],
        ipa: "/ˈaʊər ˈkiː.nəʊt spiːtʃ ɒn eɪ-aɪ ˌɪn.əˈveɪ.ʃən wɪl bɪˈɡɪn ˈprɒmpt.li æt naɪn eɪ-em ɪn ðə ˈsen.trəl ˌɔː.dɪˈtɔː.ri.əm/"
      },
      {
        id: 4,
        speaker: "Event Coordinator",
        text: "Complementary refreshments and networking sessions will follow immediately after the speech in Hall B.",
        translation: "Đồ ăn nhẹ miễn phí và các phiên kết nối giao lưu sẽ diễn ra ngay sau bài phát biểu tại Hội trường B.",
        timestamp: [15.9, 23.0],
        ipa: "/ˌkɒm.plɪˈmen.tər.i rɪˈfreʃ.mənts ænd ˈnet.wɜː.kɪŋ ˈseʃ.ənz wɪl ˈfɒl.əʊ ɪˈmiː.di.ət.li ˈɑːf.tər ðə spiːtʃ ɪn hɔːl biː/"
      }
    ],
    vocabList: [
      {
        word: "keynote",
        ipa: "/ˈkiː.noʊt/",
        pos: "Noun",
        meaning: "Bài phát biểu chủ đạo",
        detailMeaning: "Bài phát biểu chính khai mạc sự kiện hội nghị.",
        collocations: ["keynote speech", "keynote speaker"],
        example: "The keynote address will be delivered by the industry CEO."
      },
      {
        word: "auditorium",
        ipa: "/ˌɑː.dəˈtɔːr.i.əm/",
        pos: "Noun",
        meaning: "Khán phòng, hội trường lớn",
        detailMeaning: "Phòng tổ chức hội thảo có quy mô chỗ ngồi lớn.",
        collocations: ["central auditorium", "main auditorium"],
        example: "Attendees are requested to gather in the main auditorium."
      },
      {
        word: "badge",
        ipa: "/bædʒ/",
        pos: "Noun",
        meaning: "Thẻ đeo sự kiện",
        detailMeaning: "Thẻ nhận diện đại biểu tham gia hội nghị.",
        collocations: ["identification badge", "conference badge"],
        example: "Please wear your conference identification badge at all times."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Yêu cầu Đeo Thẻ: are required to wear + Noun",
        explanation: "Yêu cầu an ninh sự kiện đối với tham dự viên.",
        example: "All attendees are required to wear their conference badges.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Thì Tương lai Đơn Chỉ Sự kiện Lên lịch: will take place in + Location",
        explanation: "Thông báo thời gian và địa điểm diễn ra hoạt động.",
        example: "The opening ceremony will take place in Hall A.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_030",
    title: "Commercial Property Lease & Office Space Inspection",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Real Estate Agent",
        text: "Hello Ms. Jenkins, this is Mark from City Realty regarding the commercial space on Fifth Avenue.",
        translation: "Xin chào bà Jenkins, đây là Mark từ City Realty liên quan đến mặt bằng thương mại trên Đại lộ Số 5.",
        timestamp: [0, 5.2],
        ipa: "/həˈləʊ ˈmɪz ˈdʒeŋ.kɪns ðɪs ɪz mɑːk frəm ˈsɪt.i riː.əl.ti rɪˈɡɑː.dɪŋ ðə kəˈmɜː.ʃəl speɪs ɒn fɪfθ ˈæv.ə.njuː/"
      },
      {
        id: 2,
        speaker: "Real Estate Agent",
        text: "The office space spans approximately two thousand square feet and features three private meeting rooms.",
        translation: "Văn phòng có diện tích khoảng 2.000 feet vuông và có sẵn ba phòng họp riêng.",
        timestamp: [5.2, 10.6],
        ipa: "/ðə ˈɒf.ɪs speɪs spænz əˈprɒk.sɪ.mət.li tuː ˈθaʊ.zənd skweər fiːt ænd ˈfiː.tʃəz θriː ˈpraɪ.vət ˈmiː.tɪŋ ruːmz/"
      },
      {
        id: 3,
        speaker: "Real Estate Agent",
        text: "The monthly rent includes high-speed internet access and daily janitorial cleaning services.",
        translation: "Tiền thuê hàng tháng đã bao gồm internet tốc độ cao và dịch vụ vệ sinh dọn dẹp hàng ngày.",
        timestamp: [10.6, 15.9],
        ipa: "/ðə ˈmʌnθ.li rent ɪnˈkluːdz haɪ-spiːd ˈɪn.tə.net ˈæk.ses ænd ˈdeɪ.li ˌdʒæn.ɪˈtɔː.ri.əl ˈkliː.nɪŋ ˈsɜː.vɪs.ɪz/"
      },
      {
        id: 4,
        speaker: "Real Estate Agent",
        text: "Let me know if you would like to arrange a site walkthrough with the property owner this Friday.",
        translation: "Hãy cho tôi biết nếu bà muốn sắp xếp một buổi đi tham quan thực tế cùng chủ sở hữu tòa nhà vào Thứ Sáu này.",
        timestamp: [15.9, 23.0],
        ipa: "/let miː nəʊ ɪf juː wʊd laɪk tuː əˈreɪndʒ ə saɪt ˈwɔːk.θruː wɪð ðə ˈprɒp.ə.ti ˈəʊ.nər ðɪs ˈfraɪ.deɪ/"
      }
    ],
    vocabList: [
      {
        word: "lease",
        ipa: "/liːs/",
        pos: "Noun / Verb",
        meaning: "Hợp đồng cho thuê",
        detailMeaning: "Văn bản thỏa thuận thuê mặt bằng văn phòng.",
        collocations: ["lease agreement", "commercial lease"],
        example: "The commercial lease agreement covers a minimum duration of two years."
      },
      {
        word: "occupant",
        ipa: "/ˈɑː.kjə.pənt/",
        pos: "Noun",
        meaning: "Người sử dụng, người thuê văn phòng",
        detailMeaning: "Doanh nghiệp hoặc cá nhân thuê sử dụng diện tích tòa nhà.",
        collocations: ["building occupant", "office occupant"],
        example: "The building offers dedicated parking spaces for all occupants."
      },
      {
        word: "square feet",
        ipa: "/skwer fiːt/",
        pos: "Noun",
        meaning: "Feet vuông (đơn vị diện tích)",
        detailMeaning: "Đơn vị đo diện tích văn phòng phổ biến.",
        collocations: ["square footage", "thousand square feet"],
        example: "The open-plan office space spans three thousand square feet."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Chỉ Khả năng: is suitable for + Noun/V-ing",
        explanation: "Đánh giá mức độ đáp ứng quy mô của mặt bằng.",
        example: "The floor plan is suitable for accommodating up to fifty employees.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Mệnh lệnh Lịch sự: feel free to + V-bare",
        explanation: "Mời khách hàng chủ động đề xuất thời gian tham quan.",
        example: "Feel free to contact us to schedule a site walkthrough.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_029",
    title: "Candidate Interview Screening & Recruitment Process",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Talent Acquisition Specialist",
        text: "Hello David, thank you for applying for the Senior Graphic Designer position at our agency.",
        translation: "Xin chào David, cảm ơn bạn đã ứng tuyển vào vị trí Thiết kế Đồ họa Cao cấp tại công ty chúng tôi.",
        timestamp: [0, 5.1],
        ipa: "/həˈləʊ ˈdeɪ.vɪd θæŋk juː fɔːr əˈplaɪ.ɪŋ fɔːr ðə ˈsiː.ni.ər ˈɡræf.ɪk dɪˈzaɪ.nər pəˈzɪʃ.ən æt ˈaʊər ˈeɪ.dʒən.si/"
      },
      {
        id: 2,
        speaker: "Talent Acquisition Specialist",
        text: "We were very impressed with your background and would like to invite you for a virtual interview.",
        translation: "Chúng tôi rất ấn tượng với hồ sơ của bạn và muốn mời bạn tham gia một buổi phỏng vấn trực tuyến.",
        timestamp: [5.1, 10.5],
        ipa: "/wiː wɜː ˈver.i ɪmˈprest wɪð jɔːr ˈbæk.ɡraʊnd ænd wʊd laɪk tuː ɪnˈvaɪt juː fɔːr ə ˈvɜː.tʃu.əl ˈɪn.tə.vjuː/"
      },
      {
        id: 3,
        speaker: "Talent Acquisition Specialist",
        text: "The interview is scheduled for next Wednesday at 10 AM via our online video conferencing link.",
        translation: "Buổi phỏng vấn được lên lịch vào 10 giờ sáng Thứ Tư tuần tới thông qua liên kết họp video trực tuyến của chúng tôi.",
        timestamp: [10.5, 15.9],
        ipa: "/ðə ˈɪn.tə.vjuː ɪz ˈʃed.juːld fɔːr nekst ˈwenz.deɪ æt ten eɪ-em ˈvaɪ.ə ˈaʊər ˈɒn.laɪn ˈvɪd.i.əʊ ˈkɒn.fər.əns.ɪŋ lɪŋk/"
      },
      {
        id: 4,
        speaker: "Talent Acquisition Specialist",
        text: "Please reply to this email by tomorrow evening to confirm your availability and submit your updated portfolio.",
        translation: "Vui lòng phản hồi email này trước chiều tối mai để xác nhận sự có mặt của bạn và gửi hồ sơ năng lực cập nhật.",
        timestamp: [15.9, 23.0],
        ipa: "/pliːz rɪˈplaɪ tuː ðɪs ˈiː.meɪl baɪ təˈmɒr.əʊ ˈiːv.nɪŋ tuː kənˈfɜːm jɔːr əˌveɪ.ləˈbɪl.ə.ti ænd səbˈmɪt jɔːr ʌpˈdeɪ.tɪd pɔːtˈfəʊ.li.əʊ/"
      }
    ],
    vocabList: [
      {
        word: "candidate",
        ipa: "/ˈkæn.də.deɪt/",
        pos: "Noun",
        meaning: "Ứng viên",
        detailMeaning: "Người nộp hồ sơ xin việc làm.",
        collocations: ["shortlisted candidate", "qualified candidate"],
        example: "Shortlisted candidates will be invited for a second-round interview."
      },
      {
        word: "qualification",
        ipa: "/ˌkwɑː.lə.fəˈkeɪ.ʃən/",
        pos: "Noun",
        meaning: "Trình độ chuyên môn",
        detailMeaning: "Bằng cấp và kỹ năng đáp ứng công việc.",
        collocations: ["meet qualifications", "technical qualifications"],
        example: "Applicants must meet all technical qualifications for the role."
      },
      {
        word: "portfolio",
        ipa: "/pɔːrtˈfoʊ.li.oʊ/",
        pos: "Noun",
        meaning: "Hồ sơ năng lực",
        detailMeaning: "Tập hợp các sản phẩm thiết kế/ dự án đã thực hiện.",
        collocations: ["submit portfolio", "online portfolio"],
        example: "Designers should submit a link to their online portfolio."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả quy trình tuyển dụng: be invited to + V-bare",
        explanation: "Thông báo bước tiếp theo cho ứng viên trúng tuyển vòng sơ loại.",
        example: "Qualified candidates will be invited to complete a technical assessment.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Điều kiện Yêu cầu hồ sơ: please attach + Noun + when + V-ing",
        explanation: "Hướng dẫn nộp hồ sơ bổ sung qua email.",
        example: "Please attach your updated resume when replying to this email.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_028",
    title: "Retail Store Grand Opening & Promotional Discount",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Store Manager",
        text: "Attention shoppers, welcome to the grand opening of our flagship electronics store in the city center!",
        translation: "Xin chú ý quý khách hàng, chào mừng quý khách đến với lễ khai trương cửa hàng thiết bị điện tử chủ lực của chúng tôi tại trung tâm thành phố!",
        timestamp: [0, 5.2],
        ipa: "/əˈten.ʃən ˈʃɒp.əz ˈwel.kəm tuː ðə ɡrænd ˈəʊ.pən.ɪŋ əv ˈaʊər ˈflæɡ.ʃɪp ɪˌlekˈtrɒn.ɪks stɔːr ɪn ðə ˈsɪt.i ˈsen.tər/"
      },
      {
        id: 2,
        speaker: "Store Manager",
        text: "To celebrate our opening, all home appliances are discounted by twenty percent today only.",
        translation: "Để chào mừng ngày khai trương, tất cả các thiết bị gia dụng đều được giảm giá 20% duy nhất trong hôm nay.",
        timestamp: [5.2, 10.4],
        ipa: "/tuː ˈsel.ə.breɪt ˈaʊər ˈəʊ.pən.ɪŋ ɔːl həʊm əˈplaɪ.ənnsɪz ɑːr dɪsˈkaʊn.tɪd baɪ ˈtwen.ti pəˈsent təˈdeɪ ˈəʊn.li/"
      },
      {
        id: 3,
        speaker: "Store Manager",
        text: "In addition, the first fifty customers at the checkout counter will receive a complimentary gift bag.",
        translation: "Ngoài ra, 50 khách hàng đầu tiên tại quầy thanh toán sẽ nhận được một túi quà tặng miễn phí.",
        timestamp: [10.4, 15.7],
        ipa: "/ɪn əˈdɪʃ.ən ðə fɜːst ˈfɪf.ti ˈkʌs.tə.məz æt ðə ˈtʃek.aʊt ˈkaʊn.tər wɪl rɪˈsiːv ə ˌkɒm.plɪˈmen.tər.i ɡɪft bæɡ/"
      },
      {
        id: 4,
        speaker: "Store Manager",
        text: "Don't forget to sign up for our free loyalty membership to earn points on future purchases.",
        translation: "Đừng quên đăng ký tài khoản thành viên thân thiết miễn phí để tích điểm cho các lần mua sắm trong tương lai.",
        timestamp: [15.7, 22.0],
        ipa: "/dəʊnt fəˈɡet tuː saɪn ʌp fɔːr ˈaʊər friː ˈlɔɪ.əl.ti ˈmem.bə.ʃɪp tuː ɜːn pɔɪnts ɒn ˈfjuː.tʃər ˈpɜː.tʃəs.ɪz/"
      }
    ],
    vocabList: [
      {
        word: "promotion",
        ipa: "/prəˈmoʊ.ʃən/",
        pos: "Noun",
        meaning: "Chương trình khuyến mãi",
        detailMeaning: "Chuỗi hoạt động giảm giá thu hút người mua.",
        collocations: ["opening promotion", "special promotion"],
        example: "Our special opening promotion offers huge discounts across all departments."
      },
      {
        word: "voucher",
        ipa: "/ˈvaʊ.tʃɚ/",
        pos: "Noun",
        meaning: "Phiếu quà tặng, mã giảm giá",
        detailMeaning: "Phiếu mua hàng quy đổi thành tiền mặt/ ưu đãi.",
        collocations: ["store voucher", "discount voucher"],
        example: "The first fifty shoppers will receive a twenty-dollar store voucher."
      },
      {
        word: "clearance",
        ipa: "/ˈklɪr.əns/",
        pos: "Noun",
        meaning: "Sự xả kho, bán hạ giá",
        detailMeaning: "Hoạt động thanh lý toàn bộ hàng tồn kho.",
        collocations: ["clearance sale", "seasonal clearance"],
        example: "Check out the seasonal clearance section on the second floor."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả hành động nhận thưởng: receive + Noun + upon + V-ing/Noun",
        explanation: "Diễn tả điều kiện để người mua nhận quà tặng.",
        example: "Customers receive a gift voucher upon entering the store.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc So sánh Nhấn mạnh Khuyến mãi: up to + [percentage] off",
        explanation: "Chỉ mức giảm giá tối đa cho danh mục hàng hóa.",
        example: "Selected electronics are discounted up to fifty percent off.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_027",
    title: "Hotel Reservation Confirmation & Guest Services",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Front Desk Agent",
        text: "Good morning Mr. Miller, I am calling to confirm your reservation at the Ocean View Resort.",
        translation: "Chào buổi sáng ông Miller, tôi gọi điện để xác nhận thông tin đặt phòng của ông tại Ocean View Resort.",
        timestamp: [0, 5.1],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈmɪs.tər ˈmɪl.ər aɪ æm ˈkɔː.lɪŋ tuː kənˈfɜːm jɔːr ˌrez.ərˈveɪ.ʃən æt ðə ˈəʊ.ʃən vjuː rɪˈzɔːt/"
      },
      {
        id: 2,
        speaker: "Front Desk Agent",
        text: "Your deluxe suite is booked for three nights starting this Thursday, including complimentary breakfast.",
        translation: "Phòng suite cao cấp của ông đã được đặt trong ba đêm bắt đầu từ Thứ Năm tuần này, bao gồm cả bữa sáng miễn phí.",
        timestamp: [5.1, 10.5],
        ipa: "/jɔːr dɪˈlʌks swiːt ɪz bʊkt fɔːr θriː naɪts ˈstɑː.tɪŋ ðɪs ˈθɜːz.deɪ ɪnˈkluː.dɪŋ ˌkɒm.plɪˈmen.tər.i ˈbrek.fəst/"
      },
      {
        id: 3,
        speaker: "Front Desk Agent",
        text: "Please note that our airport shuttle bus departs from Terminal 2 every thirty minutes.",
        translation: "Xin lưu ý rằng xe đưa đón sân bay của chúng tôi khởi hành từ Nhà ga 2 mỗi 30 phút một chuyến.",
        timestamp: [10.5, 15.8],
        ipa: "/pliːz nəʊt ðæt ˈaʊər ˈeə.pɔːt ˈʃʌt.əl bʌs dɪˈpɑːts frəm ˈtɜː.mɪ.nəl tuː ˈev.ri ˈθɜː.ti ˈmɪn.ɪts/"
      },
      {
        id: 4,
        speaker: "Front Desk Agent",
        text: "Should you require any special room arrangements, please notify our front desk team prior to arrival.",
        translation: "Nếu ông cần bất kỳ sự sắp xếp phòng đặc biệt nào, vui lòng thông báo cho đội ngũ lễ tân của chúng tôi trước khi đến.",
        timestamp: [15.8, 23.0],
        ipa: "/ʃʊd juː rɪˈkwaɪər ˈen.i ˈspeʃ.əl ruːm əˈreɪndʒ.mənts pliːz ˈnəʊ.tɪ.faɪ ˈaʊər frʌnt desk tiːm ˈpraɪ.ər tuː əˈraɪ.vəl/"
      }
    ],
    vocabList: [
      {
        word: "complimentary",
        ipa: "/ˌkɑːm.pləˈmen.t̬ɚ.i/",
        pos: "Adj",
        meaning: "Miễn phí (dịch vụ kèm theo)",
        detailMeaning: "Dịch vụ/ đồ ăn được cung cấp không tính tiền.",
        collocations: ["complimentary breakfast", "complimentary shuttle"],
        example: "All guests enjoy complimentary breakfast at the hotel restaurant."
      },
      {
        word: "shuttle",
        ipa: "/ˈʃʌt̬.əl/",
        pos: "Noun",
        meaning: "Xe đưa đón tuyến ngắn",
        detailMeaning: "Phương tiện đưa đón khách giữa sân bay và khách sạn.",
        collocations: ["airport shuttle", "shuttle bus"],
        example: "The airport shuttle operates every thirty minutes."
      },
      {
        word: "amenity",
        ipa: "/əˈmen.ə.t̬i/",
        pos: "Noun",
        meaning: "Tiện nghi khách sạn",
        detailMeaning: "Các tiện ích bổ trợ như hồ bơi, phòng gym, spa.",
        collocations: ["hotel amenities", "modern amenities"],
        example: "The resort offers modern amenities including a spa and fitness center."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Thì Hiện tại Hoàn thành: has been confirmed + for",
        explanation: "Thông báo về việc phòng đã được đặt giữ chỗ thành công.",
        example: "Your reservation for a deluxe suite has been confirmed.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Diễn tả dịch vụ có sẵn: be available for + Noun/V-ing",
        explanation: "Giới thiệu tiện ích phục vụ khách lưu trú.",
        example: "Room service is available for twenty-four hours daily.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_026",
    title: "API Gateway Upgrade & System Integration",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Backend Lead",
        text: "Hello engineers, I want to share the performance results of our new API Gateway integration.",
        translation: "Xin chào các kỹ sư, tôi muốn chia sẻ kết quả hiệu năng của việc tích hợp API Gateway mới của chúng ta.",
        timestamp: [0, 5.2],
        ipa: "/həˈləʊ ˌen.dʒɪˈnɪəz aɪ wɒnt tuː ʃeər ðə pəˈfɔː.məns rɪˈzʌlts əv ˈaʊər njuː eɪ-piː-aɪ ˈɡeɪt.weɪ ˌɪn.təˈɡreɪ.ʃən/"
      },
      {
        id: 2,
        speaker: "Backend Lead",
        text: "Thanks to the updated routing architecture, average request latency has dropped by forty percent.",
        translation: "Nhờ kiến trúc định tuyến được cập nhật, độ trễ yêu cầu trung bình đã giảm 40%.",
        timestamp: [5.2, 10.6],
        ipa: "/θæŋks tuː ðə ʌpˈdeɪ.tɪd ˈruː.tɪŋ ˈɑː.kɪ.tek.tʃər ˈæv.ər.ɪdʒ rɪˈkwest ˈleɪ.tən.si hæz drɒpt baɪ ˈfɔː.ti pəˈsent/"
      },
      {
        id: 3,
        speaker: "Backend Lead",
        text: "We also upgraded our OAuth authentication tokens to enhance security across all third-party endpoints.",
        translation: "Chúng tôi cũng đã nâng cấp các mã xác thực OAuth để tăng cường bảo mật trên tất cả các đầu cuối (endpoint) bên thứ ba.",
        timestamp: [10.6, 16.0],
        ipa: "/wiː ˈɔːl.səʊ ʌpˈɡreɪ.dɪd ˈaʊər əʊ-ɔːθ ɔːˌθen.tɪˈkeɪ.ʃən ˈtəʊ.kənz tuː ɪnˈhɑːns sɪˈkjʊə.rə.ti əˈkrɒs ɔːl θɜːd-ˈpɑː.ti ˈend.pɔɪnts/"
      },
      {
        id: 4,
        speaker: "Backend Lead",
        text: "Developers can access the updated API documentation and code samples on our internal Wiki today.",
        translation: "Các nhà phát triển có thể truy cập tài liệu API cập nhật và mã mẫu trên trang Wiki nội bộ của chúng ta ngay hôm nay.",
        timestamp: [16.0, 23.0],
        ipa: "/dɪˈvel.ə.pəz kæn ˈæk.ses ðə ʌpˈdeɪ.tɪd eɪ-piː-aɪ ˌdɒk.jə.menˈteɪ.ʃən ænd kəʊd ˈsɑːm.pəlz ɒn ˈaʊər ɪnˈtɜː.nəl ˈwɪk.i təˈdeɪ/"
      }
    ],
    vocabList: [
      {
        word: "integration",
        ipa: "/ˌɪn.təˈɡreɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự tích hợp hệ thống",
        detailMeaning: "Kết nối các hệ thống phần mềm làm việc với nhau.",
        collocations: ["system integration", "API integration"],
        example: "Third-party payment integration is now fully functional."
      },
      {
        word: "authentication",
        ipa: "/ɔːˌθen.tɪˈkeɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự xác thực tài khoản",
        detailMeaning: "Quy trình kiểm tra quyền truy cập hệ thống.",
        collocations: ["OAuth authentication", "user authentication"],
        example: "Two-factor authentication adds a layer of account security."
      },
      {
        word: "latency",
        ipa: "/ˈleɪ.tən.si/",
        pos: "Noun",
        meaning: "Độ trễ mạng/ truy vấn",
        detailMeaning: "Khoảng thời gian phản hồi giữa client và server.",
        collocations: ["request latency", "network latency"],
        example: "The API upgrade significantly reduced network latency."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bổ nghĩa chỉ sự tối ưu: designed to + V-bare",
        explanation: "Mô tả công dụng và mục tiêu kiến trúc kỹ thuật.",
        example: "The new architecture is designed to handle heavy traffic.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc So sánh Tăng cường: significantly lower than + Noun",
        explanation: "Khẳng định mức độ cải thiện của chỉ số kỹ thuật.",
        example: "Response time is significantly lower than before.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_025",
    title: "Cybersecurity Incident & Phishing Awareness Training",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Chief Information Security Officer",
        text: "Attention all employees, this is an urgent security reminder regarding recent email phishing attempts.",
        translation: "Xin chú ý tới tất cả nhân viên, đây là nhắc nhở bảo mật khẩn cấp liên quan đến các cuộc tấn công lừa đảo qua email gần đây.",
        timestamp: [0, 5.3],
        ipa: "/əˈten.ʃən ɔːl ɪmˈplɔɪ.iːz ðɪs ɪz æn ˈɜː.dʒənt sɪˈkjʊə.rə.ti rɪˈmaɪn.dər rɪˈɡɑː.dɪŋ ˈriː.sənt ˈiː.meɪl ˈfɪʃ.ɪŋ əˈtempts/"
      },
      {
        id: 2,
        speaker: "Chief Information Security Officer",
        text: "Several fake messages pretending to be from bank representatives have been detected in our network.",
        translation: "Một số tin nhắn giả mạo danh nghĩa đại diện ngân hàng đã được phát hiện trong hệ thống mạng của chúng ta.",
        timestamp: [5.3, 10.8],
        ipa: "/ˈsev.ər.əl feɪk ˈmes.ɪ.dʒɪz prɪˈten.dɪŋ tuː biː frəm bæŋk ˌrep.rɪˈzen.tə.tɪvz hæv biːn dɪˈtek.tɪd ɪn ˈaʊər ˈnet.wɜːk/"
      },
      {
        id: 3,
        speaker: "Chief Information Security Officer",
        text: "Never click on unverified links or open external attachments from unknown senders.",
        translation: "Tuyệt đối không nhấp vào các liên kết chưa xác minh hoặc mở tệp đính kèm bên ngoài từ những người gửi không rõ danh tính.",
        timestamp: [10.8, 15.9],
        ipa: "/ˈnev.ər klɪk ɒn ʌnˈver.ɪ.faɪd lɪŋks ɔːr ˈəʊ.pən ɪkˈstɜː.nəl əˈtætʃ.mənts frəm ʌnˈnəʊn ˈsen.dəz/"
      },
      {
        id: 4,
        speaker: "Chief Information Security Officer",
        text: "If you receive a suspicious email, please forward it to the security desk using the Report button immediately.",
        translation: "Nếu bạn nhận được email nghi ngờ, vui lòng chuyển tiếp ngay cho bộ phận bảo mật bằng nút 'Report' (Báo cáo).",
        timestamp: [15.9, 23.0],
        ipa: "/ɪf juː rɪˈsiːv ə səˈspɪʃ.əs ˈiː.meɪl pliːz ˈfɔː.wəd ɪt tuː ðə sɪˈkjʊə.rə.ti desk ˈjuː.zɪŋ ðə rɪˈpɔːt ˈbʌt.ən ɪˈmiː.di.ət.li/"
      }
    ],
    vocabList: [
      {
        word: "phishing",
        ipa: "/ˈfɪʃ.ɪŋ/",
        pos: "Noun",
        meaning: "Lừa đảo trực tuyến qua email",
        detailMeaning: "Hành vi giả mạo nhằm lấy cắp thông tin tài khoản.",
        collocations: ["email phishing", "phishing attempt"],
        example: "Be cautious of phishing emails asking for your password."
      },
      {
        word: "suspicious",
        ipa: "/səˈspɪʃ.əs/",
        pos: "Adj",
        meaning: "Khả nghi, đáng nghi",
        detailMeaning: "Có dấu hiệu bất thường không an toàn.",
        collocations: ["suspicious email", "suspicious attachment"],
        example: "Do not click on unexpected external links or suspicious attachments."
      },
      {
        word: "protocol",
        ipa: "/ˈproʊ.tə.kɑːl/",
        pos: "Noun",
        meaning: "Quy trình, giao thức",
        detailMeaning: "Các bước ứng phó sự cố an ninh mạng.",
        collocations: ["security protocol", "follow protocol"],
        example: "Follow company protocols when reporting security threats."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bắt buộc Thực hiện: are required to + V-bare",
        explanation: "Yêu cầu nhân viên tuân thủ quy trình an toàn thông tin.",
        example: "Employees are required to report suspicious emails immediately.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Mệnh lệnh phủ định: Do not + V-bare",
        explanation: "Cảnh báo và ngăn ngừa hành vi nguy cơ rủi ro.",
        example: "Do not download unauthorized file attachments.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_024",
    title: "Data Analytics Platform & Customer Behavior Insights",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Data Science Lead",
        text: "Hello team, I'd like to demonstrate the new features of our internal customer analytics platform.",
        translation: "Xin chào cả đội, tôi muốn demo các tính năng mới của nền tảng phân tích khách hàng nội bộ của chúng ta.",
        timestamp: [0, 5.0],
        ipa: "/həˈləʊ tiːm aɪd laɪk tuː ˈdem.ən.streɪt ðə njuː ˈfiː.tʃəz əv ˈaʊər ɪnˈtɜː.nəl ˈkʌs.tə.mər ˌæn.əlˈɪt.ɪks ˈplæt.fɔːm/"
      },
      {
        id: 2,
        speaker: "Data Science Lead",
        text: "The updated dashboard now aggregates real-time purchasing data across all online channels.",
        translation: "Bảng điều khiển mới cập nhật hiện gom dữ liệu mua sắm theo thời gian thực từ tất cả các kênh trực tuyến.",
        timestamp: [5.0, 10.3],
        ipa: "/ðə ʌpˈdeɪ.tɪd ˈdæʃ.bɔːd naʊ ˈæɡ.rɪ.ɡeɪts rɪəl-taɪm ˈpɜː.tʃəs.ɪŋ ˈdeɪ.tə əˈkrɒs ɔːl ˈɒn.laɪn ˈtʃæn.əlz/"
      },
      {
        id: 3,
        speaker: "Data Science Lead",
        text: "Furthermore, we integrated a predictive machine learning model to identify potential customer churn early.",
        translation: "Hơn nữa, chúng tôi đã tích hợp một mô hình máy học dự báo để phát hiện sớm nguy cơ khách hàng ngừng sử dụng dịch vụ.",
        timestamp: [10.3, 15.7],
        ipa: "/ˌfɜː.ðəˈmɔːr wiː ˈɪn.tɪ.ɡreɪ.tɪd ə prɪˈdɪk.tɪv məˈʃiːn ˈlɜː.nɪŋ ˈmɒd.əl tuː aɪˈden.tɪ.faɪ pəˈten.ʃəl ˈkʌs.tə.mər tʃɜːn ˈɜː.li/"
      },
      {
        id: 4,
        speaker: "Data Science Lead",
        text: "A comprehensive user guide has been uploaded to the shared engineering folder for reference.",
        translation: "Tài liệu hướng dẫn sử dụng toàn diện đã được tải lên thư mục kỹ thuật dùng chung để mọi người tham khảo.",
        timestamp: [15.7, 22.0],
        ipa: "/ə ˌkɒm.prɪˈhen.sɪv ˈjuː.zər ɡaɪd hæz biːn ʌpˈləʊ.dɪd tuː ðə ʃeəd ˌen.dʒɪˈnɪə.rɪŋ ˈfəʊl.dər fɔːr ˈref.ər.əns/"
      }
    ],
    vocabList: [
      {
        word: "analytics",
        ipa: "/ˌæn.əlˈɪt.ɪks/",
        pos: "Noun",
        meaning: "Phân tích dữ liệu",
        detailMeaning: "Phân tích xu hướng thông số hoạt động số.",
        collocations: ["customer analytics", "data analytics"],
        example: "Real-time analytics help us track user conversion rates."
      },
      {
        word: "predictive",
        ipa: "/prɪˈdɪk.tɪv/",
        pos: "Adj",
        meaning: "Dự báo",
        detailMeaning: "Khả năng đưa ra dự đoán xu hướng dựa trên AI.",
        collocations: ["predictive model", "predictive analytics"],
        example: "Predictive models allow us to forecast quarterly churn rates."
      },
      {
        word: "dashboard",
        ipa: "/ˈdæʃ.bɔːrd/",
        pos: "Noun",
        meaning: "Bảng điều khiển thông số",
        detailMeaning: "Giao diện theo dõi biểu đồ chỉ số trực quan.",
        collocations: ["analytics dashboard", "updated dashboard"],
        example: "The updated analytics dashboard displays key metric trends."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả khả năng hệ thống: allow someone to + V-bare",
        explanation: "Giải thích công dụng nền tảng phân tích.",
        example: "The platform allows analysts to query massive datasets in seconds.",
        sentenceId: 3
      },
      {
        title: "Trạng từ liên kết bổ sung: Furthermore, ...",
        explanation: "Bổ sung thêm luận điểm tính năng mới.",
        example: "Furthermore, machine learning models predict future user behavior.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_023",
    title: "Agile Sprint Review & Software Release Schedule",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Scrum Master",
        text: "Hi everyone, welcome to our bi-weekly sprint review meeting for version two point four.",
        translation: "Chào mọi người, chào mừng đến với buổi họp đánh giá sprint hai tuần một lần cho phiên bản 2.4.",
        timestamp: [0, 5.1],
        ipa: "/haɪ ˈev.ri.wʌn ˈwel.kəm tuː ˈaʊər baɪ-ˈwiːk.li sprɪnt rɪˈvjuː ˈmiː.tɪŋ fɔːr ˈvɜː.ʃən tuː pɔɪnt fɔːr/"
      },
      {
        id: 2,
        speaker: "Scrum Master",
        text: "Our engineering team has completed all user stories and resolved twelve critical bug fixes this sprint.",
        translation: "Đội ngũ kỹ sư của chúng ta đã hoàn thành tất cả user story và xử lý xong 12 lỗi nghiêm trọng trong sprint này.",
        timestamp: [5.1, 10.5],
        ipa: "/ˈaʊər ˌen.dʒɪˈnɪə.rɪŋ tiːm hæz kəmˈpliː.tɪd ɔːl ˈjuː.zər ˈstɔː.riːz ænd rɪˈzɒlvd twelv ˈkrɪt.ɪ.kəl bʌɡ fɪksɪz ðɪs sprɪnt/"
      },
      {
        id: 3,
        speaker: "Scrum Master",
        text: "Code freeze will begin tomorrow at 5 PM, followed by automated staging tests over the weekend.",
        translation: "Việc đóng băng mã nguồn (code freeze) sẽ bắt đầu vào 5 giờ chiều mai, tiếp theo là các bài kiểm tra tự động trên môi trường staging vào cuối tuần.",
        timestamp: [10.5, 16.0],
        ipa: "/kəʊd friːz wɪl bɪˈɡɪn təˈmɒr.əʊ æt faɪv piː-em ˈfɒl.əʊd baɪ ˈɔː.tə.meɪ.tɪd ˈsteɪ.dʒɪŋ tests ˈəʊ.vər ðə ˈwiːk.end/"
      },
      {
        id: 4,
        speaker: "Scrum Master",
        text: "If all tests pass, the final production deployment will take place early Monday morning.",
        translation: "Nếu tất cả bài kiểm tra đều vượt qua, việc triển khai lên môi trường thực tế (production) sẽ diễn ra vào sáng sớm Thứ Hai.",
        timestamp: [16.0, 23.0],
        ipa: "/ɪf ɔːl tests pɑːs ðə ˈfaɪ.nəl prəˈdʌk.ʃən dɪˈplɔɪ.mənt wɪl teɪk pleɪs ˈɜː.li ˈmʌn.deɪ ˈmɔː.nɪŋ/"
      }
    ],
    vocabList: [
      {
        word: "deployment",
        ipa: "/dɪˈplɔɪ.mənt/",
        pos: "Noun",
        meaning: "Sự triển khai phần mềm",
        detailMeaning: "Đưa bản phát hành phần mềm mới lên môi trường thực tế.",
        collocations: ["production deployment", "scheduled deployment"],
        example: "Production deployment is scheduled for Thursday night."
      },
      {
        word: "backlog",
        ipa: "/ˈbæk.lɑːɡ/",
        pos: "Noun",
        meaning: "Danh sách công việc chờ",
        detailMeaning: "Danh sách các yêu cầu/ lỗi đang đợi xử lý.",
        collocations: ["product backlog", "sprint backlog"],
        example: "The team prioritized fixing critical bugs from the product backlog."
      },
      {
        word: "bug fix",
        ipa: "/ˈbʌɡ fɪks/",
        pos: "Noun",
        meaning: "Sự sửa lỗi phần mềm",
        detailMeaning: "Hành động vá lỗi giúp phần mềm chạy ổn định.",
        collocations: ["critical bug fix", "apply bug fix"],
        example: "The latest patch contains several key bug fixes for mobile users."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Hiện tại Hoàn thành Chỉ Kết quả: have completed + Noun",
        explanation: "Tổng kết kết quả đạt được sau mỗi chu kỳ Sprint.",
        example: "We have completed all high-priority tasks in Sprint 12.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Mệnh đề Quan hệ Rút gọn: tasks assigned to + Team",
        explanation: "Bổ nghĩa cho đối tượng chịu trách nhiệm triển khai.",
        example: "Features assigned to the mobile team are ready for testing.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_022",
    title: "Cloud Migration Strategy & Infrastructure Security",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Cloud Architect",
        text: "Good morning dev team, I am pleased to update you on our cloud infrastructure migration progress.",
        translation: "Chào buổi sáng đội phát triển, tôi rất vui được cập nhật cho các bạn về tiến độ di dời hạ tầng đám mây của chúng ta.",
        timestamp: [0, 4.9],
        ipa: "/ɡʊd ˈmɔː.nɪŋ dev tiːm aɪ æm pliːzd tuː ʌpˈdeɪt juː ɒn ˈaʊər klaʊd ˈɪn.frəˌstrʌk.tʃər maɪˈɡreɪ.ʃən ˈprəʊ.ɡres/"
      },
      {
        id: 2,
        speaker: "Cloud Architect",
        text: "Over seventy percent of our legacy database services have been successfully transferred to AWS.",
        translation: "Hơn 70% các dịch vụ cơ sở dữ liệu cũ của chúng ta đã được chuyển sang AWS thành công.",
        timestamp: [4.9, 10.2],
        ipa: "/ˈəʊ.vər ˈsev.ən.ti pəˈsent əv ˈaʊər ˈleg.ə.si ˈdeɪ.tə.beɪs ˈsɜː.vɪs.ɪz hæv biːn səkˈses.fəl.i trænsˈfɜːd tuː eɪ-dʌb.əl-juː-es/"
      },
      {
        id: 3,
        speaker: "Cloud Architect",
        text: "In addition, end-to-end encryption protocols have been activated to secure all user data in transit.",
        translation: "Ngoài ra, các giao thức mã hóa đầu-cuối đã được kích hoạt để bảo vệ toàn bộ dữ liệu người dùng đang truyền tải.",
        timestamp: [10.2, 15.6],
        ipa: "/ɪn əˈdɪʃ.ən end-tuː-end ɪnˈkrɪp.ʃən ˈprəʊ.tə.kɒlz hæv biːn ˈæk.tɪ.veɪ.tɪd tuː sɪˈkjʊər ɔːl ˈjuː.zər ˈdeɪ.tə ɪn ˈtræn.zɪt/"
      },
      {
        id: 4,
        speaker: "Cloud Architect",
        text: "We expect the entire migration process to finish by midnight without interrupting active services.",
        translation: "Chúng tôi dự kiến toàn bộ quá trình di dời sẽ hoàn tất trước nửa đêm mà không làm gián đoạn các dịch vụ đang hoạt động.",
        timestamp: [15.6, 22.0],
        ipa: "/wiː ɪkˈspekt ðə ɪnˈtaɪər maɪˈɡreɪ.ʃən ˈprəʊ.ses tuː ˈfɪn.ɪʃ baɪ ˈmɪd.naɪt wɪðˈaʊt ˌɪn.təˈrʌpt.ɪŋ ˈæk.tɪv ˈsɜː.vɪs.ɪz/"
      }
    ],
    vocabList: [
      {
        word: "migration",
        ipa: "/maɪˈɡreɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự chuyển đổi hệ thống",
        detailMeaning: "Quá trình di dời dịch vụ sang nền tảng đám mây.",
        collocations: ["cloud migration", "database migration"],
        example: "Database migration to the cloud will happen overnight."
      },
      {
        word: "infrastructure",
        ipa: "/ˈɪn.frəˌstrʌk.tʃər/",
        pos: "Noun",
        meaning: "Hạ tầng máy chủ/ mạng",
        detailMeaning: "Hệ thống phần cứng và mạng lõi.",
        collocations: ["cloud infrastructure", "server infrastructure"],
        example: "Moving to a cloud infrastructure reduces server maintenance costs."
      },
      {
        word: "encryption",
        ipa: "/ɪnˈkrɪp.ʃən/",
        pos: "Noun",
        meaning: "Sự mã hóa dữ liệu",
        detailMeaning: "Bảo vệ thông tin truyền tải bằng mã hóa.",
        collocations: ["data encryption", "end-to-end encryption"],
        example: "All sensitive customer data must undergo end-to-end encryption."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị động Hiện tại tiếp diễn: is being moved + to",
        explanation: "Chỉ hành động di dời hệ thống đang trong quá trình thực hiện.",
        example: "Our main server infrastructure is currently being moved to AWS.",
        sentenceId: 2
      },
      {
        title: "Động từ nguyên mẫu chỉ mục đích: to prevent + Noun",
        explanation: "Diễn tả mục tiêu an ninh mạng.",
        example: "Encryption is applied to prevent unauthorized data access.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_020",
    title: "Quarterly Marketing Campaign & Social Media Strategy",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Marketing Lead",
        text: "Good morning everyone, today I want to highlight the results of our recent social media campaign.",
        translation: "Chào buổi sáng mọi người, hôm nay tôi muốn điểm qua kết quả của chiến dịch truyền thông xã hội gần đây của chúng ta.",
        timestamp: [0, 5.1],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈev.ri.wʌn təˈdeɪ aɪ wɒnt tuː ˈhaɪ.laɪt ðə rɪˈzʌlts əv ˈaʊər ˈriː.sənt ˈsəʊ.ʃəl ˈmiː.di.ə kæmˈpeɪn/"
      },
      {
        id: 2,
        speaker: "Marketing Lead",
        text: "By focusing on short video content, we successfully increased our brand engagement by forty percent.",
        translation: "Bằng cách tập trung vào nội dung video ngắn, chúng ta đã tăng mức độ tương tác thương hiệu lên 40% một cách thành công.",
        timestamp: [5.1, 10.5],
        ipa: "/baɪ ˈfəʊ.kəs.ɪŋ ɒn ʃɔːt ˈvɪd.i.əʊ ˈkɒn.tent wiː səkˈses.fəl.i ɪnˈkriːst ˈaʊər brænd ɪnˈɡeɪdʒ.mənt baɪ ˈfɔː.ti pəˈsent/"
      },
      {
        id: 3,
        speaker: "Marketing Lead",
        text: "Furthermore, our targeted ad strategy helped us reach over fifty thousand new potential clients this month.",
        translation: "Hơn nữa, chiến lược quảng cáo nhắm mục tiêu đã giúp chúng ta tiếp cận hơn 50.000 khách hàng tiềm năng mới trong tháng này.",
        timestamp: [10.5, 15.9],
        ipa: "/ˌfɜː.ðəˈmɔːr ˈaʊər ˈtɑː.ɡɪ.tɪd æd ˈstræt.ə.dʒi helpt ʌs riːtʃ ˈəʊ.vər ˈfɪf.ti ˈθaʊ.zənd njuː pəˈten.ʃəl ˈklaɪ.ənts ðɪs mʌnθ/"
      },
      {
        id: 4,
        speaker: "Marketing Lead",
        text: "We will double our video production budget next quarter to sustain this rapid digital growth.",
        translation: "Chúng ta sẽ gấp đôi ngân sách sản xuất video vào quý tới để duy trì sự tăng trưởng kỹ thuật số nhanh chóng này.",
        timestamp: [15.9, 23.0],
        ipa: "/wiː wɪl ˈdʌb.əl ˈaʊər ˈvɪd.i.əʊ prəˈdʌk.ʃən ˈbʌdʒ.ɪt nekst ˈkwɔː.tər tuː səˈsteɪn ðɪs ˈræp.ɪd ˈdɪdʒ.ɪ.təl ɡrəʊθ/"
      }
    ],
    vocabList: [
      {
        word: "outreach",
        ipa: "/ˈaʊt.riːtʃ/",
        pos: "Noun",
        meaning: "Sự tiếp cận, hoạt động cộng đồng",
        detailMeaning: "Mở rộng tầm ảnh hưởng truyền thông tới khách hàng.",
        collocations: ["media outreach", "outreach strategy"],
        example: "Our social media outreach strategy doubled our online engagement."
      },
      {
        word: "campaign",
        ipa: "/kæmˈpeɪn/",
        pos: "Noun",
        meaning: "Chiến dịch",
        detailMeaning: "Chuỗi hoạt động quảng cáo hoặc tiếp thị.",
        collocations: ["social media campaign", "marketing campaign"],
        example: "The summer promotional campaign was a massive success."
      },
      {
        word: "target audience",
        ipa: "/ˈtɑːr.ɡɪt ˈɑː.di.əns/",
        pos: "Noun",
        meaning: "Khách hàng mục tiêu",
        detailMeaning: "Nhóm người tiêu dùng cụ thể chiến dịch hướng tới.",
        collocations: ["reach target audience", "identify target audience"],
        example: "We customized our video ads to appeal to a younger target audience."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả mục tiêu: aim to + V-bare",
        explanation: "Dùng để trình bày mục tiêu ngắn và dài hạn của chiến dịch.",
        example: "We aim to expand our customer base in the upcoming quarter.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Nhấn mạnh kết quả: result in + Noun/V-ing",
        explanation: "Dùng để chỉ tác động tích cực của giải pháp.",
        example: "The video ads resulted in higher conversion rates.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_019",
    title: "Customer Loyalty Program & Points Redemption System",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Marketing Manager",
        text: "Attention valued customers, we are excited to launch our upgraded VIP loyalty rewards program today.",
        translation: "Xin chú ý tới quý khách hàng thân thiết, chúng tôi rất vui mừng ra mắt chương trình ưu đãi thành viên VIP nâng cấp vào hôm nay.",
        timestamp: [0, 5.2],
        ipa: "/əˈten.ʃən ˈvæl.juːd ˈkʌs.tə.məz wiː ɑːr ɪkˈsaɪ.tɪd tuː lɔːntʃ ˈaʊər ʌpˈɡreɪ.dɪd vɪp ˈlɔɪ.əl.ti rɪˈwɔːdz ˈprəʊ.ɡræm təˈdeɪ/"
      },
      {
        id: 2,
        speaker: "Marketing Manager",
        text: "Under the new system, every purchase earns you points that can be redeemed for instant discount vouchers.",
        translation: "Theo hệ thống mới, mỗi đơn hàng sẽ giúp quý khách tích điểm để quy đổi thành các phiếu giảm giá trực tiếp.",
        timestamp: [5.2, 10.6],
        ipa: "/ˈʌn.dər ðə njuː ˈsɪs.təm ˈev.ri ˈpɜː.tʃəs ɜːnz juː pɔɪnts ðæt kæn biː rɪˈdiːmd fɔːr ˈɪn.stənt ˈdɪs.kaʊnt ˈvaʊ.tʃəz/"
      },
      {
        id: 3,
        speaker: "Marketing Manager",
        text: "Members who reach the Platinum tier will also enjoy free express shipping on all online orders.",
        translation: "Các thành viên đạt hạng Platinum cũng sẽ được hưởng dịch vụ giao hàng hỏa tốc miễn phí cho mọi đơn hàng trực tuyến.",
        timestamp: [10.6, 15.9],
        ipa: "/ˈmem.bəz huː riːtʃ ðə ˈplæt.ɪ.nəm tɪər wɪl ˈɔːl.səʊ ɪnˈdʒɔɪ friː ɪkˈspres ˈʃɪp.ɪŋ ɒn ɔːl ˈɒn.laɪn ˈɔː.dəz/"
      },
      {
        id: 4,
        speaker: "Marketing Manager",
        text: "Download our official mobile app now to check your points balance and explore exclusive member rewards.",
        translation: "Tải ngay ứng dụng di động chính thức của chúng tôi để kiểm tra số dư điểm và khám phá các phần thưởng dành riêng cho thành viên.",
        timestamp: [15.9, 23.0],
        ipa: "/ˌdaʊnˈləʊd ˈaʊər əˈfɪʃ.əl ˈməʊ.baɪl æp naʊ tuː tʃek jɔːr pɔɪnts ˈbæl.əns ænd ɪkˈsplɔːr ɪkˈskluː.sɪv ˈmem.bər rɪˈwɔːdz/"
      }
    ],
    vocabList: [
      {
        word: "redemption",
        ipa: "/rɪˈdemp.ʃən/",
        pos: "Noun",
        meaning: "Sự quy đổi, sự chuộc lại",
        detailMeaning: "Hành động sử dụng điểm thưởng lấy quà tặng/ giảm giá.",
        collocations: ["points redemption", "instant redemption"],
        example: "Points redemption can be done directly through our mobile app."
      },
      {
        word: "tier",
        ipa: "/tɪr/",
        pos: "Noun",
        meaning: "Cấp độ, hạng thành viên",
        detailMeaning: "Hạng mức thành viên dựa trên mức tiêu dùng.",
        collocations: ["membership tier", "platinum tier"],
        example: "Gold tier members enjoy exclusive perks and discount codes."
      },
      {
        word: "accumulate",
        ipa: "/əˈkjuː.mjə.leɪt/",
        pos: "Verb",
        meaning: "Tích lũy",
        detailMeaning: "Gia tăng số lượng điểm thưởng theo thời gian.",
        collocations: ["accumulate points", "accumulate rewards"],
        example: "Customers accumulate reward points with every eligible purchase."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả quyền lợi: allow someone to + V-bare",
        explanation: "Dùng để giải thích tính năng/quyền lợi của chương trình.",
        example: "The new system allows users to redeem points instantly at checkout.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc So sánh Càng... Càng...: The higher... the more...",
        explanation: "Diễn tả mối quan hệ giữa hạng thành viên và ưu đãi.",
        example: "The higher your membership tier, the more rewards you unlock.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_018",
    title: "New Software Implementation & User Training Session",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "IT Trainer",
        text: "Good morning team, as announced earlier, we are about to upgrade our primary project management software.",
        translation: "Chào buổi sáng cả đội, như đã thông báo trước đó, chúng ta sắp sửa nâng cấp phần mềm quản lý dự án chính của mình.",
        timestamp: [0, 5.1],
        ipa: "/ɡʊd ˈmɔː.nɪŋ tiːm æz əˈnaʊnst ˈɜː.li.ər wiː ɑːr əˈbaʊt tuː ʌpˈɡreɪd ˈaʊər ˈpraɪ.mər.i ˈprɒdʒ.ekt ˈmæn.ɪdʒ.mənt ˈsɒft.weər/"
      },
      {
        id: 2,
        speaker: "IT Trainer",
        text: "The full data migration process is scheduled to take place this coming Saturday from midnight.",
        translation: "Toàn bộ quá trình chuyển đổi dữ liệu được lên lịch diễn ra vào nửa đêm Thứ Bảy tuần này.",
        timestamp: [5.1, 10.3],
        ipa: "/ðə fʊl ˈdeɪ.tə maɪˈɡreɪ.ʃən ˈprəʊ.ses ɪz ˈʃed.juːld tuː teɪk pleɪs ðɪs ˈkʌm.ɪŋ ˈsæt.ə.deɪ frəm ˈmɪd.naɪt/"
      },
      {
        id: 3,
        speaker: "IT Trainer",
        text: "Mandatory training webinars will be held next Monday to help everyone get familiar with the new interface.",
        translation: "Các buổi hội thảo đào tạo trực tuyến bắt buộc sẽ được tổ chức vào Thứ Hai tuần tới để giúp mọi người làm quen với giao diện mới.",
        timestamp: [10.3, 15.8],
        ipa: "/ˈmæn.də.tɔːr.i ˈtreɪ.nɪŋ ˈweb.ɪ.nɑːz wɪl biː held nekst ˈmʌn.deɪ tuː help ˈev.ri.wʌn ɡet fəˈmɪl.i.ər wɪð ðə njuː ˈɪn.tə.feɪs/"
      },
      {
        id: 4,
        speaker: "IT Trainer",
        text: "Links to join the sessions and quick-start user guides are now available on the staff portal.",
        translation: "Đường liên kết tham gia các buổi học và tài liệu hướng dẫn sử dụng nhanh hiện đã có trên cổng thông tin nhân viên.",
        timestamp: [15.8, 22.0],
        ipa: "/lɪŋks tuː dʒɔɪn ðə ˈseʃ.ənz ænd kwɪk-stɑːt ˈjuː.zər ɡaɪdz ɑːr naʊ əˈveɪ.lə.bəl ɒn ðə stɑːf ˈpɔː.təl/"
      }
    ],
    vocabList: [
      {
        word: "implementation",
        ipa: "/ˌɪm.plə.menˈteɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự triển khai, thi hành",
        detailMeaning: "Hành động đưa một phần mềm/ quy trình mới vào vận hành.",
        collocations: ["software implementation", "system implementation"],
        example: "The implementation of the new software will start next month."
      },
      {
        word: "migration",
        ipa: "/maɪˈɡreɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự chuyển đổi dữ liệu",
        detailMeaning: "Quá trình di chuyển dữ liệu sang hệ thống máy chủ mới.",
        collocations: ["data migration", "system migration"],
        example: "Data migration will be completed over the weekend."
      },
      {
        word: "portal",
        ipa: "/ˈpɔːr.təl/",
        pos: "Noun",
        meaning: "Cổng thông tin nội bộ",
        detailMeaning: "Website truy cập thông tin tập trung của doanh nghiệp.",
        collocations: ["staff portal", "employee portal"],
        example: "You can access your training materials via the staff portal."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Dự định gần: be about to + V-bare",
        explanation: "Diễn tả hành động sắp sửa diễn ra ngay lập tức.",
        example: "We are about to transition to our new project management tool.",
        sentenceId: 1
      },
      {
        title: "Cấu trúc Khuyên bảo / Đề nghị: be strongly advised to + V-bare",
        explanation: "Khuyên nhân viên thực hiện quy trình quan trọng.",
        example: "All users are strongly advised to back up their local files.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_017",
    title: "Quarterly Performance Review & Employee Recognition",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Department Head",
        text: "Good afternoon everyone, I want to take a moment to discuss our upcoming performance review cycle.",
        translation: "Chào buổi chiều mọi người, tôi muốn dành ít phút để thảo luận về chu kỳ đánh giá hiệu suất sắp tới của chúng ta.",
        timestamp: [0, 5.1],
        ipa: "/ɡʊd ˌɑːf.təˈnuːn ˈev.ri.wʌn aɪ wɒnt tuː teɪk ə ˈməʊ.mənt tuː dɪˈskʌs ˈaʊər ʌpˈkʌm.ɪŋ pəˈfɔː.məns rɪˈvjuː ˈsaɪ.kəl/"
      },
      {
        id: 2,
        speaker: "Department Head",
        text: "Starting next week, managers will schedule individual evaluation meetings with all team members.",
        translation: "Bắt đầu từ tuần tới, các quản lý sẽ lên lịch các buổi họp đánh giá cá nhân với tất cả các thành viên trong đội.",
        timestamp: [5.1, 10.5],
        ipa: "/ˈstɑː.tɪŋ nekst wiːk ˈmæn.ɪ.dʒəz wɪl ˈʃed.juːl ˌɪn.dɪˈvɪdʒ.u.əl ɪˌvæl.juˈeɪ.ʃən ˈmiː.tɪŋz wɪð ɔːl tiːm ˈmem.bəz/"
      },
      {
        id: 3,
        speaker: "Department Head",
        text: "In addition, we will announce the recipients of this quarter's Employee Recognition Award on Friday.",
        translation: "Ngoài ra, chúng tôi sẽ công bố những người nhận Giải thưởng Ghi nhận Nhân viên của quý này vào Thứ Sáu.",
        timestamp: [10.5, 15.9],
        ipa: "/ɪn əˈdɪʃ.ən wiː wɪl əˈnaʊns ðə rɪˈsɪp.i.ənts əv ðɪs ˈkwɔː.təz ɪmˈplɔɪ.iː ˌrek.əɡˈnɪʃ.ən əˈwɔːd ɒn ˈfraɪ.deɪ/"
      },
      {
        id: 4,
        speaker: "Department Head",
        text: "Recipients will receive a certificate of excellence alongside a performance bonus in their next paycheck.",
        translation: "Những người nhận giải sẽ nhận được chứng nhận xuất sắc cùng với một khoản tiền thưởng hiệu suất trong kỳ lương tiếp theo.",
        timestamp: [15.9, 23.0],
        ipa: "/rɪˈsɪp.i.ənts wɪl rɪˈsiːv ə səˈtɪf.ɪ.kət əv ˈek.səl.əns əˈlɒŋ.saɪd ə pəˈfɔː.məns ˈbəʊ.nəs ɪn ðeər nekst ˈpeɪ.tʃek/"
      }
    ],
    vocabList: [
      {
        word: "recognition",
        ipa: "/ˌrek.əɡˈnɪʃ.ən/",
        pos: "Noun",
        meaning: "Sự ghi nhận, sự công nhận",
        detailMeaning: "Hành động tuyên dương thành tích của nhân viên.",
        collocations: ["employee recognition", "special recognition"],
        example: "Outstanding performance deserves proper company recognition."
      },
      {
        word: "contribution",
        ipa: "/ˌkɑːn.trəˈbjuː.ʃən/",
        pos: "Noun",
        meaning: "Sự đóng góp",
        detailMeaning: "Nỗ lực đóng góp cho sự thành công chung.",
        collocations: ["valuable contribution", "significant contribution"],
        example: "We appreciate your valuable contribution to the project."
      },
      {
        word: "evaluation",
        ipa: "/ɪˌvæl.juˈeɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự đánh giá",
        detailMeaning: "Cuộc họp review hiệu suất công việc định kỳ.",
        collocations: ["performance evaluation", "annual evaluation"],
        example: "Annual evaluations help track employee progress over time."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả sự công nhận: would like to recognize someone for + Noun/V-ing",
        explanation: "Dùng trong thông báo khen thưởng cá nhân xuất sắc.",
        example: "I would like to recognize John for his exceptional work.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Mệnh đề Quan hệ: who have demonstrated + Noun",
        explanation: "Bổ nghĩa cho nhóm nhân sự xuất sắc.",
        example: "Employees who have demonstrated strong leadership will receive bonuses.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_016",
    title: "Client Meeting Schedule & Conference Room Reservation",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Executive Assistant",
        text: "Hi Sarah, I'm calling about our upcoming presentation with the delegates from overseas tomorrow.",
        translation: "Chào Sarah, tôi gọi điện về buổi thuyết trình sắp tới với các đại biểu từ nước ngoài vào ngày mai.",
        timestamp: [0, 4.8],
        ipa: "/haɪ ˈseə.rə aɪm ˈkɔː.lɪŋ əˈbaʊt ˈaʊər ˈʌpˌkʌm.ɪŋ ˌprez.ənˈteɪ.ʃən wɪð ðə ˈdel.ɪ.ɡəts frəm ˌəʊ.vəˈsiːz təˈmɒr.əʊ/"
      },
      {
        id: 2,
        speaker: "Executive Assistant",
        text: "Due to a double-booking issue, Conference Room B is no longer available at two o'clock.",
        translation: "Do sự cố trùng lịch đặt phòng, Phòng họp B không còn trống vào lúc hai giờ nữa.",
        timestamp: [4.8, 9.9],
        ipa: "/djuː tuː ə ˈdʌb.əl-ˈbʊk.ɪŋ ˈɪʃ.uː ˈkɒn.fər.əns ruːm biː ɪz nəʊ ˈlɒŋ.ɡər əˈveɪ.lə.bəl æt tuː əˈklɒk/"
      },
      {
        id: 3,
        speaker: "Executive Assistant",
        text: "I have rescheduled our session to Conference Room A on the fifth floor for the same time.",
        translation: "Tôi đã chuyển lịch buổi họp của chúng ta sang Phòng họp A ở tầng 5 vào cùng khung giờ đó.",
        timestamp: [9.9, 15.1],
        ipa: "/aɪ hæv ˌriːˈʃed.juːld ˈaʊər ˈseʃ.ən tuː ˈkɒn.fər.əns ruːm eɪ ɒn ðə fɪfθ flɔːr fɔːr ðə seɪm taɪm/"
      },
      {
        id: 4,
        speaker: "Executive Assistant",
        text: "Could you please update the calendar invite and inform the rest of the team right away?",
        translation: "Bạn có thể cập nhật lời mời trên lịch và thông báo cho phần còn lại của đội ngay lập tức được không?",
        timestamp: [15.1, 22.0],
        ipa: "/kʊd juː pliːz ʌpˈdeɪt ðə ˈkæl.ən.dər ɪnˈvaɪt ænd ɪnˈfɔːm ðə rest əv ðə tiːm raɪt əˈweɪ/"
      }
    ],
    vocabList: [
      {
        word: "reservation",
        ipa: "/ˌrez.ərˈveɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự đặt trước",
        detailMeaning: "Hành động giữ chỗ trước cho phòng họp.",
        collocations: ["room reservation", "confirm reservation"],
        example: "Please confirm your conference room reservation in advance."
      },
      {
        word: "executive",
        ipa: "/ɪɡˈzek.jə.tɪv/",
        pos: "Adj / Noun",
        meaning: "Cấp quản lý, điều hành",
        detailMeaning: "Ban lãnh đạo cấp cao của công ty.",
        collocations: ["executive assistant", "executive board"],
        example: "The executive board will join the call at 2 PM."
      },
      {
        word: "conflicting",
        ipa: "/kənˈflɪk.tɪŋ/",
        pos: "Adj",
        meaning: "Trùng lặp, xung đột",
        detailMeaning: "Lịch trình bị trùng lặp thời gian.",
        collocations: ["conflicting schedule", "conflicting times"],
        example: "We need to resolve the conflicting meeting times."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Nhắc nhở lịch trình: be scheduled to meet + with",
        explanation: "Dùng để thông báo lịch hẹn làm việc với đối tác.",
        example: "Our team is scheduled to meet with the representatives from Tokyo.",
        sentenceId: 1
      },
      {
        title: "Cấu trúc Bị động Hiện tại hoàn thành: has been moved + to",
        explanation: "Thông báo sự thay đổi phòng họp/ thời gian.",
        example: "The meeting room has been moved to Floor 5.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_015",
    title: "Upcoming Office Relocation & Packing Guidelines",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Office Manager",
        text: "Good morning everyone, as you know, our official relocation to the new office building is next week.",
        translation: "Chào buổi sáng mọi người, như các bạn đã biết, việc chính thức chuyển sang tòa nhà văn phòng mới sẽ diễn ra vào tuần tới.",
        timestamp: [0, 5.1],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈev.ri.wʌn æz juː nəʊ ˈaʊər əˈfɪʃ.əl ˌriː.loʊˈkeɪ.ʃən tuː ðə njuː ˈɒf.ɪs ˈbɪl.dɪŋ ɪz nekst wiːk/"
      },
      {
        id: 2,
        speaker: "Office Manager",
        text: "Professional movers will arrive this Friday at five PM to transport all packed crates and furniture.",
        translation: "Đơn vị vận chuyển chuyên nghiệp sẽ đến vào 5 giờ chiều Thứ Sáu tuần này để vận chuyển tất cả các thùng hàng đã đóng gói và đồ nội thất.",
        timestamp: [5.1, 10.4],
        ipa: "/prəˈfeʃ.ən.əl ˈmuː.vəz wɪl əˈraɪv ðɪs ˈfraɪ.deɪ æt faɪv piː-em tuː trænˈspɔːt ɔːl pækt kreɪts ænd ˈfɜː.nɪ.tʃər/"
      },
      {
        id: 3,
        speaker: "Office Manager",
        text: "Please ensure all personal items are securely boxed and labeled with your name and department code.",
        translation: "Vui lòng đảm bảo tất cả đồ dùng cá nhân được đóng hộp an toàn và dán nhãn ghi rõ tên cũng như mã phòng ban của bạn.",
        timestamp: [10.4, 15.8],
        ipa: "/pliːz ɪnˈʃʊər ɔːl ˈpɜː.sən.əl ˈaɪ.təmz ɑːr sɪˈkjʊə.li bɒkst ænd ˈleɪ.bəld wɪð jɔːr neɪm ænd dɪˈpɑːt.mənt kəʊd/"
      },
      {
        id: 4,
        speaker: "Office Manager",
        text: "Unlabeled boxes will be placed in the main storage area and may experience delays in delivery.",
        translation: "Các thùng hàng không dán nhãn sẽ được đưa vào khu vực lưu trữ chính và có thể bị chậm trễ trong việc bàn giao.",
        timestamp: [15.8, 23.0],
        ipa: "/ʌnˈleɪ.bəld bɒksɪz wɪl biː pleɪst ɪn ðə meɪn ˈstɔː.rɪdʒ ˈeə.ri.ə ænd meɪ ɪkˈspɪə.ri.əns dɪˈleɪz ɪn dɪˈlɪv.ər.i/"
      }
    ],
    vocabList: [
      {
        word: "relocation",
        ipa: "/ˌriː.loʊˈkeɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự di dời, chuyển văn phòng",
        detailMeaning: "Hành động di chuyển văn phòng sang trụ sở mới.",
        collocations: ["office relocation", "planned relocation"],
        example: "The relocation to the new downtown building is planned for August."
      },
      {
        word: "label",
        ipa: "/ˈleɪ.bəl/",
        pos: "Verb / Noun",
        meaning: "Dán nhãn, nhãn mác",
        detailMeaning: "Ghi tên và mã phòng ban lên thùng carton.",
        collocations: ["clearly label", "storage label"],
        example: "Please clearly label all personal storage boxes."
      },
      {
        word: "fragile",
        ipa: "/ˈfrædʒ.əl/",
        pos: "Adj",
        meaning: "Dễ vỡ",
        detailMeaning: "Đồ đạc cần chú ý cẩn thận khi di dời.",
        collocations: ["fragile items", "fragile equipment"],
        example: "Handle fragile equipment with extra care during the move."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bắt buộc Dán nhãn: make sure to + V-bare",
        explanation: "Yêu cầu thực hiện quy trình đóng gói văn phòng.",
        example: "Make sure to write your name on each box.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Thời gian Bắt đầu: scheduled to begin + at [time]",
        explanation: "Thông báo thời gian xe chuyển nhà đến.",
        example: "The moving crew is scheduled to arrive on Friday evening.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_014",
    title: "Employee Wellness Program & Gym Membership Subsidy",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "HR Director",
        text: "Attention all staff, I am thrilled to introduce our new corporate wellness initiative for this year.",
        translation: "Xin chú ý toàn thể nhân viên, tôi rất vui mừng được giới thiệu chương trình sức khỏe doanh nghiệp mới của chúng ta trong năm nay.",
        timestamp: [0, 4.9],
        ipa: "/əˈten.ʃən ɔːl stɑːf aɪ æm θrɪld tuː ˌɪn.trəˈdjuːs ˈaʊər njuː ˈkɔː.pər.ət ˈwel.nəs ɪˈnɪʃ.ə.tɪv fɔːr ðɪs jɪər/"
      },
      {
        id: 2,
        speaker: "HR Director",
        text: "Starting next month, the company will offer a fifty percent subsidy on local fitness center memberships.",
        translation: "Bắt đầu từ tháng tới, công ty sẽ hỗ trợ 50% chi phí đăng ký hội viên tại các trung tâm thể hình địa phương.",
        timestamp: [4.9, 10.1],
        ipa: "/ˈstɑː.tɪŋ nekst mʌnθ ðə ˈkʌm.pə.ni wɪl ˈɒf.ər ə ˈfɪf.ti pəˈsent ˈsʌb.sə.di ɒn ˈləʊ.kəl ˈfɪt.nəs ˈsen.tər ˈmem.bə.ʃɪps/"
      },
      {
        id: 3,
        speaker: "HR Director",
        text: "All full-time employees who have completed their probationary period are eligible to participate.",
        translation: "Tất cả nhân viên chính thức đã hoàn thành thời gian thử việc đều đủ điều kiện tham gia.",
        timestamp: [10.1, 15.2],
        ipa: "/ɔːl fʊl-taɪm ɪmˈplɔɪ.iːz huː hæv kəmˈpliː.tɪd ðeər prəˈbeɪ.ʃən.ər.i ˈpɪə.ri.əd ɑːr ˈel.ədʒ.ə.bəl tuː pɑːˈtɪs.ɪ.peɪt/"
      },
      {
        id: 4,
        speaker: "HR Director",
        text: "Please submit your application form through the HR portal before the end of the month.",
        translation: "Vui lòng nộp mẫu đơn đăng ký của bạn thông qua cổng thông tin HR trước cuối tháng.",
        timestamp: [15.2, 22.0],
        ipa: "/pliːz səbˈmɪt jɔːr ˌæp.lɪˈkeɪ.ʃən fɔːm θruː ðə eɪtʃ-ɑː ˈpɔː.təl bɪˈfɔː ðə end əv ðə mʌnθ/"
      }
    ],
    vocabList: [
      {
        word: "subsidy",
        ipa: "/ˈsʌb.sə.di/",
        pos: "Noun",
        meaning: "Tiền trợ cấp, hỗ trợ chi phí",
        detailMeaning: "Khoản tiền hỗ trợ nhân viên đăng ký tập gym.",
        collocations: ["gym subsidy", "provide a subsidy"],
        example: "The company provides a monthly subsidy for gym memberships."
      },
      {
        word: "wellness",
        ipa: "/ˈwel.nəs/",
        pos: "Noun",
        meaning: "Sức khỏe tổng thể",
        detailMeaning: "Chương trình chăm sóc sức khỏe thể chất & tinh thần.",
        collocations: ["wellness program", "corporate wellness"],
        example: "We are launching a new corporate wellness program next month."
      },
      {
        word: "eligible",
        ipa: "/ˈel.ədʒ.ə.bəl/",
        pos: "Adj",
        meaning: "Đủ điều kiện",
        detailMeaning: "Đủ tiêu chuẩn nhân sự để hưởng trợ cấp.",
        collocations: ["eligible for benefit", "eligible to participate"],
        example: "All full-time employees are eligible for the benefit."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Khẳng định Tiêu chuẩn: be eligible for + Noun",
        explanation: "Chỉ đối tượng được hưởng chế độ phúc lợi.",
        example: "Full-time staff are eligible for wellness subsidies.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Hướng dẫn Đăng ký: to register, please + V-bare",
        explanation: "Dùng trong các thông báo nhân sự.",
        example: "To register for the class, please visit the internal portal.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_013",
    title: "New Product Packaging & Environmental Sustainability",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Product Manager",
        text: "Good morning team, I want to share an exciting update on our flagship product line redesign.",
        translation: "Chào buổi sáng cả đội, tôi muốn chia sẻ một cập nhật thú vị về việc thiết kế lại dòng sản phẩm chủ lực của chúng ta.",
        timestamp: [0, 4.8],
        ipa: "/ɡʊd ˈmɔː.nɪŋ tiːm aɪ wɒnt tuː ʃeər æn ɪkˈsaɪ.tɪŋ ʌpˈdeɪt ɒn ˈaʊər ˈflæɡ.ʃɪp ˈprɒd.ʌkt laɪn ˌriː.dɪˈzaɪn/"
      },
      {
        id: 2,
        speaker: "Product Manager",
        text: "Starting next month, all consumer goods will be shipped in one hundred percent recyclable packaging.",
        translation: "Bắt đầu từ tháng tới, tất cả hàng tiêu dùng sẽ được vận chuyển trong bao bì có thể tái chế 100%.",
        timestamp: [4.8, 9.9],
        ipa: "/ˈstɑː.tɪŋ nekst mʌnθ ɔːl kənˈsjuː.mər ɡʊdz wɪl biː ʃɪpt ɪn wʌn ˈhʌn.drəd pəˈsent ˌriːˈsaɪ.klə.bəl ˈpæk.ɪ.dʒɪŋ/"
      },
      {
        id: 3,
        speaker: "Product Manager",
        text: "This eco-friendly transition is expected to reduce our overall plastic waste by thirty percent this year.",
        translation: "Sự chuyển đổi thân thiện với môi trường này dự kiến sẽ giảm 30% tổng lượng rác thải nhựa của chúng ta trong năm nay.",
        timestamp: [9.9, 15.3],
        ipa: "/ðɪs ˌiː.koʊˈfrend.li trænˈzɪʃ.ən ɪz ɪkˈspek.tɪd tuː rɪˈdjuːs ˈaʊər ˌəʊ.vərˈɔːl ˈplæs.tɪk weɪst baɪ ˈθɜː.ti pəˈsent ðɪs jɪər/"
      },
      {
        id: 4,
        speaker: "Product Manager",
        text: "A press release highlighting our sustainability efforts will be issued to the media on Friday.",
        translation: "Thông cáo báo chí nổi bật về những nỗ lực phát triển bền vững của chúng ta sẽ được phát hành tới truyền thông vào Thứ Sáu.",
        timestamp: [15.3, 22.0],
        ipa: "/ə pres rɪˈliːs ˈhaɪ.laɪ.tɪŋ ˈaʊər səˌsteɪ.nəˈbɪl.ə.ti ˈef.əts wɪl biː ˈɪʃ.uːd tuː ðə ˈmiː.di.ə ɒn ˈfraɪ.deɪ/"
      }
    ],
    vocabList: [
      {
        word: "eco-friendly",
        ipa: "/ˌiː.koʊˈfrend.li/",
        pos: "Adj",
        meaning: "Thân thiện với môi trường",
        detailMeaning: "Không gây hại cho môi trường tự nhiên.",
        collocations: ["eco-friendly packaging", "eco-friendly material"],
        example: "We are transitioning to 100% eco-friendly materials."
      },
      {
        word: "recyclable",
        ipa: "/ˌriːˈsaɪ.klə.bəl/",
        pos: "Adj",
        meaning: "Có thể tái chế",
        detailMeaning: "Được thiết kế để tái sử dụng lại qua quy trình xử lý rác.",
        collocations: ["recyclable plastic", "recyclable packaging"],
        example: "The new plastic bottles are fully recyclable."
      },
      {
        word: "reduction",
        ipa: "/rɪˈdʌk.ʃən/",
        pos: "Noun",
        meaning: "Sự cắt giảm, giảm thiểu",
        detailMeaning: "Hành động làm giảm bớt số lượng rác thải.",
        collocations: ["waste reduction", "cost reduction"],
        example: "This initiative led to a significant reduction in waste."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả hành động đang chuyển đổi: transition to + Noun",
        explanation: "Chỉ sự thay đổi phương pháp hoặc vật liệu sang loại mới.",
        example: "The company is transitioning to biodegradable materials.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Diễn tả kết quả kỳ vọng: help reduce + Noun",
        explanation: "Dùng để giải thích mục đích bảo vệ môi trường.",
        example: "The new design will help reduce carbon emissions.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_012",
    title: "New Product Packaging & Environmental Sustainability",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Product Manager",
        text: "Good morning team, I want to share an exciting update on our flagship product line redesign.",
        translation: "Chào buổi sáng cả đội, tôi muốn chia sẻ một cập nhật thú vị về việc thiết kế lại dòng sản phẩm chủ lực của chúng ta.",
        timestamp: [0, 4.8],
        ipa: "/ɡʊd ˈmɔː.nɪŋ tiːm aɪ wɒnt tuː ʃeər æn ɪkˈsaɪ.tɪŋ ʌpˈdeɪt ɒn ˈaʊər ˈflæɡ.ʃɪp ˈprɒd.ʌkt laɪn ˌriː.dɪˈzaɪn/"
      },
      {
        id: 2,
        speaker: "Product Manager",
        text: "Starting next month, all consumer goods will be shipped in one hundred percent recyclable packaging.",
        translation: "Bắt đầu từ tháng tới, tất cả hàng tiêu dùng sẽ được vận chuyển trong bao bì có thể tái chế 100%.",
        timestamp: [4.8, 9.9],
        ipa: "/ˈstɑː.tɪŋ nekst mʌnθ ɔːl kənˈsjuː.mər ɡʊdz wɪl biː ʃɪpt ɪn wʌn ˈhʌn.drəd pəˈsent ˌriːˈsaɪ.klə.bəl ˈpæk.ɪ.dʒɪŋ/"
      },
      {
        id: 3,
        speaker: "Product Manager",
        text: "This eco-friendly transition is expected to reduce our overall plastic waste by thirty percent this year.",
        translation: "Sự chuyển đổi thân thiện với môi trường này dự kiến sẽ giảm 30% tổng lượng rác thải nhựa của chúng ta trong năm nay.",
        timestamp: [9.9, 15.3],
        ipa: "/ðɪs ˌiː.koʊˈfrend.li trænˈzɪʃ.ən ɪz ɪkˈspek.tɪd tuː rɪˈdjuːs ˈaʊər ˌəʊ.vərˈɔːl ˈplæs.tɪk weɪst baɪ ˈθɜː.ti pəˈsent ðɪs jɪər/"
      },
      {
        id: 4,
        speaker: "Product Manager",
        text: "A press release highlighting our sustainability efforts will be issued to the media on Friday.",
        translation: "Thông cáo báo chí nổi bật về những nỗ lực phát triển bền vững của chúng ta sẽ được phát hành tới truyền thông vào Thứ Sáu.",
        timestamp: [15.3, 22.0],
        ipa: "/ə pres rɪˈliːs ˈhaɪ.laɪ.tɪŋ ˈaʊər səˌsteɪ.nəˈbɪl.ə.ti ˈef.əts wɪl biː ˈɪʃ.uːd tuː ðə ˈmiː.di.ə ɒn ˈfraɪ.deɪ/"
      }
    ],
    vocabList: [
      {
        word: "eco-friendly",
        ipa: "/ˌiː.koʊˈfrend.li/",
        pos: "Adj",
        meaning: "Thân thiện với môi trường",
        detailMeaning: "Không gây hại cho môi trường tự nhiên.",
        collocations: ["eco-friendly packaging", "eco-friendly material"],
        example: "We are transitioning to 100% eco-friendly materials."
      },
      {
        word: "recyclable",
        ipa: "/ˌriːˈsaɪ.klə.bəl/",
        pos: "Adj",
        meaning: "Có thể tái chế",
        detailMeaning: "Được thiết kế để tái sử dụng lại qua quy trình xử lý rác.",
        collocations: ["recyclable plastic", "recyclable packaging"],
        example: "The new plastic bottles are fully recyclable."
      },
      {
        word: "reduction",
        ipa: "/rɪˈdʌk.ʃən/",
        pos: "Noun",
        meaning: "Sự cắt giảm, giảm thiểu",
        detailMeaning: "Hành động làm giảm bớt số lượng rác thải.",
        collocations: ["waste reduction", "cost reduction"],
        example: "This initiative led to a significant reduction in waste."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả hành động đang chuyển đổi: transition to + Noun",
        explanation: "Chỉ sự thay đổi phương pháp hoặc vật liệu sang loại mới.",
        example: "The company is transitioning to biodegradable materials.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Diễn tả kết quả kỳ vọng: help reduce + Noun",
        explanation: "Dùng để giải thích mục đích bảo vệ môi trường.",
        example: "The new design will help reduce carbon emissions.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_012",
    title: "Software System Maintenance & Network Downtime",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "IT Director",
        text: "Attention all staff, please note that routine network maintenance is scheduled for tonight.",
        translation: "Xin chú ý toàn thể nhân viên, xin lưu ý rằng việc bảo trì mạng định kỳ được lên lịch vào tối nay.",
        timestamp: [0, 4.7],
        ipa: "/əˈten.ʃən ɔːl stɑːf pliːz nəʊt ðæt ruːˈtiːn ˈnet.wɜːk ˈmeɪn.tən.əns ɪz ˈʃed.juːld fɔːr təˈnaɪt/"
      },
      {
        id: 2,
        speaker: "IT Director",
        text: "Starting at ten PM, our primary servers will experience temporary downtime for security updates.",
        translation: "Bắt đầu từ 10 giờ tối, các máy chủ chính của chúng ta sẽ tạm dừng hoạt động để cập nhật bảo mật.",
        timestamp: [4.7, 10.0],
        ipa: "/ˈstɑː.tɪŋ æt ten piː-em ˈaʊər ˈpraɪ.mər.i ˈsɜː.vəz wɪl ɪkˈspɪə.ri.əns ˈtem.pər.ər.i ˈdaʊn.taɪm fɔːr sɪˈkjʊə.rɪ.ti ʌpˈdeɪts/"
      },
      {
        id: 3,
        speaker: "IT Director",
        text: "All internal databases and email services will be unavailable until six AM tomorrow morning.",
        translation: "Tất cả cơ sở dữ liệu nội bộ và dịch vụ email sẽ không thể truy cập cho đến 6 giờ sáng mai.",
        timestamp: [10.0, 15.2],
        ipa: "/ɔːl ɪnˈtɜː.nəl ˈdeɪ.tə.beɪ.sɪz ænd ˈiː.meɪl ˈsɜː.vɪ.sɪz wɪl biː ˌʌn.əˈveɪ.lə.bəl ənˈtɪl sɪks eɪ-em təˈmɒr.əʊ ˈmɔː.nɪŋ/"
      },
      {
        id: 4,
        speaker: "IT Director",
        text: "We strongly encourage everyone to save their active work and log off before leaving today.",
        translation: "Chúng tôi rất khuyến khích mọi người lưu lại công việc đang làm và đăng xuất trước khi ra về hôm nay.",
        timestamp: [15.2, 22.0],
        ipa: "/wiː ˈstrɒŋ.li ɪnˈkʌr.ɪdʒ ˈev.ri.wʌn tuː seɪv ðeər ˈæk.tɪv wɜːk ænd lɒɡ ɒf bɪˈfɔː ˈliː.vɪŋ təˈdeɪ/"
      }
    ],
    vocabList: [
      {
        word: "downtime",
        ipa: "/ˈdaʊn.taɪm/",
        pos: "Noun",
        meaning: "Thời gian ngừng hoạt động",
        detailMeaning: "Khoảng thời gian hệ thống máy tính dừng hoạt động.",
        collocations: ["temporary downtime", "system downtime"],
        example: "The planned downtime will last for approximately two hours."
      },
      {
        word: "backup",
        ipa: "/ˈbæk.ʌp/",
        pos: "Noun / Verb",
        meaning: "Sao lưu dữ liệu",
        detailMeaning: "Hành động lưu lại bản sao dữ liệu phòng rủi ro.",
        collocations: ["backup files", "data backup"],
        example: "Please backup all critical files before leaving the office."
      },
      {
        word: "server",
        ipa: "/ˈsɜːr.vər/",
        pos: "Noun",
        meaning: "Máy chủ",
        detailMeaning: "Hệ thống máy tính trung tâm lưu trữ dữ liệu.",
        collocations: ["primary server", "database server"],
        example: "The main application server will be restarted tonight."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Khuyên bảo / Yêu cầu: strongly encourage someone to + V-bare",
        explanation: "Dùng để nhắc nhở quy trình hệ thống quan trọng.",
        example: "We strongly encourage all users to save their progress.",
        sentenceId: 4
      },
      {
        title: "Cấu trúc Bị động Thì Tương lai đơn: will be affected + by",
        explanation: "Chỉ phạm vi chịu ảnh hưởng bảo trì.",
        example: "Internal tools will be affected during the maintenance window.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_011",
    title: "Quarterly Financial Results & Revenue Growth",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Chief Financial Officer",
        text: "Good morning shareholders, I am pleased to present our financial performance for the third quarter.",
        translation: "Chào buổi sáng các cổ đông, tôi rất hân hạnh được trình bày kết quả tài chính của chúng ta trong quý ba.",
        timestamp: [0, 4.9],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈʃerˌhoʊl.dəz aɪ æm pliːzd tuː prɪˈzent ˈaʊər faɪˈnæn.ʃəl pəˈfɔː.məns fɔːr ðə θɜːd ˈkwɔː.tər/"
      },
      {
        id: 2,
        speaker: "Chief Financial Officer",
        text: "Total net revenue reached forty million dollars, representing a fourteen percent increase year-over-year.",
        translation: "Tổng doanh thu thuần đạt 40 triệu đô la, đại diện cho mức tăng 14% so với cùng kỳ năm ngoái.",
        timestamp: [4.9, 10.1],
        ipa: "/ˈtəʊ.təl net ˈrev.ə.nuː riːtʃt ˈfɔː.ti ˈmɪl.jən ˈdɒl.əz ˌrep.rɪˈzent.ɪŋ ə ˌfɔːˈtiːn pəˈsent ɪnˈkriːs jɪər-əʊ.vər-jɪər/"
      },
      {
        id: 3,
        speaker: "Chief Financial Officer",
        text: "This growth was primary driven by strong demand for our cloud subscription services.",
        translation: "Sự tăng trưởng này chủ yếu được thúc đẩy bởi nhu cầu mạnh mẽ đối với các dịch vụ đăng ký điện toán đám mây.",
        timestamp: [10.1, 15.3],
        ipa: "/ðɪs ɡrəʊθ wɒz ˈpraɪ.mər.i ˈdrɪv.ən baɪ strɒŋ dɪˈmɑːnd fɔːr ˈaʊər klaʊd səbˈskrɪp.ʃən ˈsɜː.vɪ.sɪz/"
      },
      {
        id: 4,
        speaker: "Chief Financial Officer",
        text: "Detailed financial breakdowns will be available on our investor relations website this afternoon.",
        translation: "Báo cáo tài chính chi tiết sẽ có trên trang web quan hệ cổ đông của chúng tôi vào chiều nay.",
        timestamp: [15.3, 22.0],
        ipa: "/ˈdiː.teɪld faɪˈnæn.ʃəl ˈbreɪk.daʊnz wɪl biː əˈveɪ.lə.bəl ɒn ˈaʊər ɪnˈves.tər rɪˈleɪ.ʃənz ˈweb.saɪt ðɪs ˌɑːf.təˈnuːn/"
      }
    ],
    vocabList: [
      {
        word: "profitability",
        ipa: "/ˌprɑː.fɪ.təˈbɪl.ə.ti/",
        pos: "Noun",
        meaning: "Khả năng sinh lời, lợi nhuận",
        detailMeaning: "Khả năng tạo ra thu nhập cao hơn chi phí.",
        collocations: ["record profitability", "company profitability"],
        example: "The company achieved record profitability this quarter."
      },
      {
        word: "expansion",
        ipa: "/ɪkˈspæn.ʃən/",
        pos: "Noun",
        meaning: "Sự mở rộng",
        detailMeaning: "Mở rộng thị trường hoặc chi nhánh bán hàng.",
        collocations: ["overseas expansion", "market expansion"],
        example: "Overseas expansion contributed significantly to sales."
      },
      {
        word: "shareholder",
        ipa: "/ˈʃerˌhoʊl.dər/",
        pos: "Noun",
        meaning: "Cổ đông",
        detailMeaning: "Cá nhân hoặc tổ chức sở hữu cổ phần công ty.",
        collocations: ["company shareholder", "shareholder meeting"],
        example: "The financial report will be presented to all shareholders."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả sự đóng góp: contribute to + Noun/V-ing",
        explanation: "Giải thích nguyên nhân dẫn tới sự tăng trưởng.",
        example: "Strong online sales contributed to our overall profit margin.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc So sánh nhất: the highest + Noun",
        explanation: "Khẳng định kỷ lục doanh thu đạt được.",
        example: "We recorded the highest quarterly revenue in company history.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_010",
    title: "New Employee Onboarding & Orientation Schedule",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "HR Specialist",
        text: "Good morning everyone, welcome to the official orientation session for our new team members.",
        translation: "Chào buổi sáng mọi người, chào mừng các bạn đến với buổi hội nhập chính thức dành cho các thành viên mới.",
        timestamp: [0, 4.8],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈev.ri.wʌn ˈwel.kəm tuː ðə əˈfɪʃ.əl ˌɔː.ri.enˈteɪ.ʃən ˈseʃ.ən fɔːr ˈaʊər njuː tiːm ˈmem.bəz/"
      },
      {
        id: 2,
        speaker: "HR Specialist",
        text: "Before we begin, please make sure you have filled out all the required HR compliance forms.",
        translation: "Trước khi bắt đầu, vui lòng đảm bảo bạn đã điền đầy đủ tất cả các biểu mẫu tuân thủ nhân sự theo yêu cầu.",
        timestamp: [4.8, 9.9],
        ipa: "/bɪˈfɔː wiː bɪˈɡɪn pliːz meɪk ʃʊər juː hæv fɪld aʊt ɔːl ðə rɪˈkwaɪəd eɪtʃ-ɑː kəmˈplaɪ.əns fɔːmz/"
      },
      {
        id: 3,
        speaker: "HR Specialist",
        text: "This afternoon, each of you will be paired with a senior mentor from your department.",
        translation: "Chiều nay, mỗi người trong số các bạn sẽ được ghép cặp với một người hướng dẫn cấp cao từ phòng ban của mình.",
        timestamp: [9.9, 15.1],
        ipa: "/ðɪs ˌɑːf.təˈnuːn iːtʃ əv juː wɪl biː peəd wɪð ə ˈsiː.ni.ər ˈmen.tɔːr frəm jɔːr dɪˈpɑːt.mənt/"
      },
      {
        id: 4,
        speaker: "HR Specialist",
        text: "They will assist you with setting up your workstation and accessing the internal software systems.",
        translation: "Họ sẽ hỗ trợ bạn thiết lập vị trí làm việc và truy cập vào các hệ thống phần mềm nội bộ.",
        timestamp: [15.1, 22.0],
        ipa: "/ðeɪ wɪl əˈsɪst juː wɪð ˈset.ɪŋ ʌp jɔːr ˈwɜːkˌsteɪ.ʃən ænd ækˈses.ɪŋ ðə ɪnˈtɜː.nəl ˈsɒft.weər ˈsɪs.təmz/"
      }
    ],
    vocabList: [
      {
        word: "orientation",
        ipa: "/ˌɔː.ri.enˈteɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự định hướng, buổi hội nhập",
        detailMeaning: "Buổi giới thiệu công ty cho nhân viên mới.",
        collocations: ["orientation session", "new hire orientation"],
        example: "The orientation session begins at 9:00 AM in the main hall."
      },
      {
        word: "compliance",
        ipa: "/kəmˈplaɪ.əns/",
        pos: "Noun",
        meaning: "Sự tuân thủ",
        detailMeaning: "Thực hiện theo đúng các quy định nhân sự.",
        collocations: ["compliance training", "HR compliance"],
        example: "New hires must complete the compliance training modules."
      },
      {
        word: "mentor",
        ipa: "/ˈmen.tɔːr/",
        pos: "Noun",
        meaning: "Người hướng dẫn",
        detailMeaning: "Nhân sự kinh nghiệm hỗ trợ người mới.",
        collocations: ["senior mentor", "assigned mentor"],
        example: "Each new employee will be assigned a senior mentor."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Yêu cầu bắt buộc: be required to + V-bare",
        explanation: "Thông báo nghĩa vụ nhân viên mới phải thực hiện.",
        example: "All new staff are required to complete the safety module.",
        sentenceId: 2
      },
      {
        title: "Thì Tương lai đơn với Will để cam kết hỗ trợ",
        explanation: "Dùng để cam kết người cố vấn sẽ hướng dẫn.",
        example: "Your designated mentor will guide you through the first week.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_009",
    title: "Facility Maintenance & Office Air Conditioning",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:21",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Facility Manager",
        text: "Attention all staff, please be advised of scheduled maintenance work this Saturday.",
        translation: "Xin chú ý toàn thể nhân viên, xin lưu ý về công việc bảo trì theo kế hoạch vào Thứ Bảy tuần này.",
        timestamp: [0, 4.5],
        ipa: "/əˈten.ʃən ɔːl stɑːf pliːz biː ədˈvaɪzd əv ˈʃed.juːld ˈmeɪn.tən.əns wɜːk ðɪs ˈsæt.ə.deɪ/"
      },
      {
        id: 2,
        speaker: "Facility Manager",
        text: "The central air conditioning unit on the fourth floor will be serviced from 9 AM to 2 PM.",
        translation: "Hệ thống điều hòa trung tâm tại tầng 4 sẽ được bảo dưỡng từ 9 giờ sáng đến 2 giờ chiều.",
        timestamp: [4.5, 9.8],
        ipa: "/ðə ˈsen.trəl eər kənˈdɪʃ.ən.ɪŋ ˈjuː.nɪt ɒn ðə fɔːθ flɔːr wɪl biː ˈsɜː.vɪst frəm naɪn eɪ-em tuː tuː piː-em/"
      },
      {
        id: 3,
        speaker: "Facility Manager",
        text: "During this window, temperatures in the office may rise higher than usual.",
        translation: "Trong khoảng thời gian này, nhiệt độ trong văn phòng có thể tăng cao hơn bình thường.",
        timestamp: [9.8, 14.7],
        ipa: "/ˈdjʊə.rɪŋ ðɪs ˈwɪn.dəʊ ˈtem.prə.tʃəz ɪn ðə ˈɒf.ɪs meɪ raɪz ˈhaɪ.ər ðæn ˈjuː.ʒu.əl/"
      },
      {
        id: 4,
        speaker: "Facility Manager",
        text: "We encourage employees working overtime to use the designated quiet spaces on the third floor.",
        translation: "Chúng tôi khuyến khích những nhân viên làm tăng ca sử dụng các không gian yên tĩnh đã chỉ định tại tầng ba.",
        timestamp: [14.7, 21.0],
        ipa: "/wiː ɪnˈkʌr.ɪdʒ ɪmˈplɔɪ.iːz ˈwɜːk.ɪŋ ˈəʊ.və.taɪm tuː juːz ðə ˈdez.ɪɡ.neɪ.tɪd kwaɪət ˈspeɪ.sɪz ɒn ðə θɜːd flɔːr/"
      }
    ],
    vocabList: [
      {
        word: "maintenance",
        ipa: "/ˈmeɪn.tən.əns/",
        pos: "Noun",
        meaning: "Sự bảo trì, bảo dưỡng",
        detailMeaning: "Hoạt động sửa chữa bảo dưỡng thiết bị.",
        collocations: ["routine maintenance", "scheduled maintenance"],
        example: "Routine maintenance is required for all HVAC systems."
      },
      {
        word: "temporary",
        ipa: "/ˈtem.pə.rer.i/",
        pos: "Adj",
        meaning: "Tạm thời",
        detailMeaning: "Diễn ra trong khoảng thời gian ngắn.",
        collocations: ["temporary disruption", "temporary fix"],
        example: "There will be a temporary disruption in the cooling system."
      },
      {
        word: "ventilation",
        ipa: "/ˌven.tɪˈleɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự thông gió",
        detailMeaning: "Hệ thống lưu thông không khí.",
        collocations: ["proper ventilation", "ventilation system"],
        example: "Portable fans will be provided to ensure proper ventilation."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả công việc đang tiến hành: will be undergoing + Noun",
        explanation: "Thông báo bảo dưỡng diễn ra trong thời gian ngắn.",
        example: "The central air conditioning will be undergoing maintenance.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Yêu cầu khuyên bảo: advisable to + V-bare",
        explanation: "Khuyên nhân viên nên chuẩn bị trang phục phù hợp.",
        example: "It is advisable to dress in layered clothing.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_008",
    title: "Quarterly Sales Meeting & Regional Performance",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Sales Director",
        text: "Welcome everyone to our quarterly sales review. I have some encouraging news to share.",
        translation: "Chào mừng mọi người đến với buổi đánh giá doanh số hàng quý. Tôi có một vài tin tức rất đáng phấn khởi muốn chia sẻ.",
        timestamp: [0, 4.9],
        ipa: "/ˈwel.kəm ˈev.ri.wʌn tuː ˈaʊər ˈkwɔː.tə.li seɪlz rɪˈvjuː aɪ hæv sʌm ɪnˈkʌr.ɪ.dʒɪŋ njuːz tuː ʃeər/"
      },
      {
        id: 2,
        speaker: "Sales Director",
        text: "Overall revenue has increased by twelve percent compared to the previous quarter.",
        translation: "Tổng doanh thu đã tăng 12% so với quý trước.",
        timestamp: [4.9, 9.6],
        ipa: "/ˌəʊ.vərˈɔːl ˈrev.ə.nuː hæz ɪnˈkriːst baɪ twelv pəˈsent kəmˈpeəd tuː ðə ˈpriː.vi.əs ˈkwɔː.tər/"
      },
      {
        id: 3,
        speaker: "Sales Director",
        text: "The Northern region was our top performer, mostly driven by the new product line expansion.",
        translation: "Khu vực phía Bắc là nơi đạt kết quả tốt nhất, phần lớn nhờ vào việc mở rộng dòng sản phẩm mới.",
        timestamp: [9.6, 15.2],
        ipa: "/ðə ˈnɔː.ðən ˈriː.dʒən wɒz ˈaʊər tɒp pəˈfɔː.mər ˈməʊst.li ˈdrɪv.ən baɪ ðə njuː ˈprɒd.ʌkt laɪn ɪkˈspæn.ʃən/"
      },
      {
        id: 4,
        speaker: "Sales Director",
        text: "Next month, we plan to roll out similar marketing strategies in the Southern region.",
        translation: "Tháng tới, chúng ta dự định sẽ triển khai các chiến lược marketing tương tự tại khu vực phía Nam.",
        timestamp: [15.2, 23.0],
        ipa: "/nekst mʌnθ wiː plæn tuː rəʊl aʊt ˈsɪm.ɪ.lər ˈmɑː.kɪ.tɪŋ ˈstræt.ə.dʒiz ɪn ðə ˈsʌð.ən ˈriː.dʒən/"
      }
    ],
    vocabList: [
      {
        word: "surpass",
        ipa: "/sərˈpæs/",
        pos: "Verb",
        meaning: "Vượt qua, vượt trội",
        detailMeaning: "Đạt kết quả lớn hơn mức mong đợi.",
        collocations: ["surpass expectations", "surpass target"],
        example: "Sales in the Northern region surpassed our expectations."
      },
      {
        word: "expansion",
        ipa: "/ɪkˈspæn.ʃən/",
        pos: "Noun",
        meaning: "Sự mở rộng",
        detailMeaning: "Hành động phát triển quy mô kinh doanh hoặc quy trình.",
        collocations: ["product line expansion", "retail expansion"],
        example: "The retail expansion plan will begin next quarter."
      },
      {
        word: "revenue",
        ipa: "/ˈrev.ə.nuː/",
        pos: "Noun",
        meaning: "Doanh thu",
        detailMeaning: "Tổng số tiền thu được từ hoạt động kinh doanh.",
        collocations: ["total revenue", "annual revenue"],
        example: "Total company revenue saw a steady growth this quarter."
      }
    ],
    grammarNotes: [
      {
        title: "Thì Quá khứ đơn đối lập với Hiện tại hoàn thành",
        explanation: "Diễn tả hành động đã hoàn thành trong quá khứ đối sánh với kết quả đạt được tính đến hiện tại.",
        example: "Total revenue has increased by twelve percent since last quarter.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc So sánh hơn: higher than expected",
        explanation: "Chỉ kết quả vượt mức dự kiến.",
        example: "Performance was significantly higher than target.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_007",
    title: "Supply Chain Delay & Inventory Update",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Logistics Supervisor",
        text: "Good afternoon team, I want to inform you about a delay with our incoming material shipment.",
        translation: "Chào buổi chiều cả đội, tôi muốn thông báo tới các bạn về sự chậm trễ của lô nguyên vật liệu đang chuyển đến.",
        timestamp: [0, 4.7],
        ipa: "/ɡʊd ˌɑːf.təˈnuːn tiːm aɪ wɒnt tuː ɪnˈfɔːm juː əˈbaʊt ə dɪˈleɪ wɪð ˈaʊər ˌɪnˈkʌm.ɪŋ məˈtɪə.ri.əl ˈʃɪp.mənt/"
      },
      {
        id: 2,
        speaker: "Logistics Supervisor",
        text: "Due to unexpected severe weather at the port, the delivery will be delayed by three days.",
        translation: "Do thời tiết xấu đột xuất tại cảng, việc giao hàng sẽ bị chậm trễ ba ngày.",
        timestamp: [4.7, 9.9],
        ipa: "/djuː tuː ˌʌn.ɪkˈspek.tɪd sɪˈvɪər ˈweð.ər æt ðə pɔːt ðə dɪˈlɪv.ər.i wɪl biː dɪˈleɪd baɪ θriː deɪz/"
      },
      {
        id: 3,
        speaker: "Logistics Supervisor",
        text: "We are currently adjusting our production schedule to prioritize existing inventory.",
        translation: "Chúng ta hiện đang điều chỉnh lịch trình sản xuất để ưu tiên lượng hàng tồn kho hiện có.",
        timestamp: [9.9, 15.1],
        ipa: "/wiː ɑːr ˈkʌr.ənt.li əˈdʒʌst.ɪŋ ˈaʊər prəˈdʌk.ʃən ˈʃed.juːl tuː praɪˈɒr.ɪ.taɪz ɪɡˈzɪst.ɪŋ ˈɪn.vən.tɔːr.i/"
      },
      {
        id: 4,
        speaker: "Logistics Supervisor",
        text: "Please notify your respective client representatives if any order fulfillments are affected.",
        translation: "Vui lòng thông báo cho đại diện khách hàng tương ứng nếu việc hoàn thành đơn hàng bị ảnh hưởng.",
        timestamp: [15.1, 22.0],
        ipa: "/pliːz ˈnəʊ.tɪ.faɪ jɔːr rɪˈspek.tɪv ˈklaɪ.ənt ˌrep.rɪˈzen.tə.tɪvz ɪf ˈen.i ˈɔː.dər fʊlˈfɪl.mənts ɑːr əˈfek.tɪd/"
      }
    ],
    vocabList: [
      {
        word: "shipment",
        ipa: "/ˈʃɪp.mənt/",
        pos: "Noun",
        meaning: "Lô hàng, sự giao hàng",
        detailMeaning: "Hàng hóa được vận chuyển bằng tàu/ xe.",
        collocations: ["material shipment", "incoming shipment"],
        example: "The incoming shipment of raw materials has been delayed."
      },
      {
        word: "inventory",
        ipa: "/ˈɪn.vən.tɔːr.i/",
        pos: "Noun",
        meaning: "Hàng tồn kho",
        detailMeaning: "Toàn bộ số lượng hàng hóa còn trong kho.",
        collocations: ["existing inventory", "inventory check"],
        example: "We must check our current inventory levels."
      },
      {
        word: "alternative",
        ipa: "/ɑːlˈtɜːr.nə.tɪv/",
        pos: "Noun / Adj",
        meaning: "Phương án thay thế",
        detailMeaning: "Lựa chọn khác có thể thay thế khi cần.",
        collocations: ["alternative supplier", "alternative option"],
        example: "We are seeking alternative suppliers in the region."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Diễn tả nguyên nhân: due to + Noun/NP",
        explanation: "Diễn tả lý do của sự việc.",
        example: "Due to severe weather conditions, the delivery was postponed.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Tương lai tiếp diễn: will be + V-ing",
        explanation: "Diễn tả hành động diễn ra tại thời điểm tương lai.",
        example: "Our team will be monitoring the shipment status closely.",
        sentenceId: 3
      }
    ]
  },
  {
    id: "listen_toeic_q3_006",
    title: "IT Security Guidelines & Password Policy",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:21",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "IT Manager",
        text: "Attention all employees, this is an important message from the IT department.",
        translation: "Xin chú ý tới tất cả nhân viên, đây là thông báo quan trọng từ bộ phận CNTT.",
        timestamp: [0, 4.3],
        ipa: "/əˈten.ʃən ɔːl ɪmˈplɔɪ.iːz ðɪs ɪz æn ɪmˈpɔː.tənt ˈmes.ɪdʒ frəm ðə aɪ-tiː dɪˈpɑːt.mənt/"
      },
      {
        id: 2,
        speaker: "IT Manager",
        text: "To enhance our network security, all passwords must be updated by the end of this week.",
        translation: "Để tăng cường bảo mật mạng, tất cả mật khẩu phải được cập nhật trước cuối tuần này.",
        timestamp: [4.3, 9.5],
        ipa: "/tuː ɪnˈhɑːns ˈaʊər ˈnet.wɜːk sɪˈkjʊə.rɪ.ti ɔːl ˈpɑːs.wɜːdz mʌst biː ʌpˈdeɪ.tɪd baɪ ðə end əv ðɪs wiːk/"
      },
      {
        id: 3,
        speaker: "IT Manager",
        text: "Your new password must contain at least eight characters, including numbers and symbols.",
        translation: "Mật khẩu mới của bạn phải chứa ít nhất tám ký tự, bao gồm chữ số và ký tự đặc biệt.",
        timestamp: [9.5, 14.8],
        ipa: "/jɔːr njuː ˈpɑːs.wɜːd mʌst kənˈteɪn æt liːst eɪt ˈkær.ək.təz ɪnˈkluː.dɪŋ ˈnʌm.bəz ænd ˈsɪm.bəlz/"
      },
      {
        id: 4,
        speaker: "IT Manager",
        text: "Failure to update your account in time will result in a temporary lockout on Monday.",
        translation: "Việc không cập nhật tài khoản đúng hạn sẽ dẫn đến việc bị khóa tài khoản tạm thời vào Thứ Hai.",
        timestamp: [14.8, 21.0],
        ipa: "/ˈfeɪ.ljər tuː ʌpˈdeɪt jɔːr əˈkaʊnt ɪn taɪm wɪl rɪˈzʌlt ɪn ə ˈtem.pər.ər.i ˈlɒk.aʊt ɒn ˈmʌn.deɪ/"
      }
    ],
    vocabList: [
      {
        word: "credential",
        ipa: "/krɪˈden.ʃəl/",
        pos: "Noun",
        meaning: "Thông tin đăng nhập, chứng chỉ",
        detailMeaning: "Tên người dùng và mật khẩu để xác thực tài khoản.",
        collocations: ["login credentials", "user credentials"],
        example: "Do not share your login credentials with anyone."
      },
      {
        word: "unauthorized",
        ipa: "/ʌnˈɑː.θə.raɪzd/",
        pos: "Adj",
        meaning: "Không được phép, trái phép",
        detailMeaning: "Truy cập không được sự cho phép hợp lệ.",
        collocations: ["unauthorized access", "unauthorized user"],
        example: "Prevent unauthorized access to company files."
      },
      {
        word: "mandatory",
        ipa: "/ˈmæn.də.tɔːr.i/",
        pos: "Adj",
        meaning: "Bắt buộc",
        detailMeaning: "Yêu cầu phải thực hiện theo quy định.",
        collocations: ["mandatory training", "mandatory policy"],
        example: "Completing the security module is mandatory."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Nhắc nhở / Yêu cầu: remind someone to + V-bare",
        explanation: "Dùng để nhắc nhở nhân viên thực hiện nhiệm vụ.",
        example: "I would like to remind all staff to update their passwords.",
        sentenceId: 2
      },
      {
        title: "Cấu trúc Bị Động Khuyết Thiếu: must be + V3/ed",
        explanation: "Chỉ quy định chuẩn bắt buộc cần được hoàn tất.",
        example: "New passwords must be updated every ninety days.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_005",
    title: "Quarterly Budget Review & Expense Policy Update",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Finance Manager",
        text: "Good morning everyone, I have a quick update regarding our department's quarterly budget.",
        translation: "Chào buổi sáng mọi người, tôi có thông tin cập nhật nhanh liên quan đến ngân sách quý của phòng ban chúng ta.",
        timestamp: [0, 4.6],
        ipa: "/ɡʊd ˈmɔː.nɪŋ ˈev.ri.wʌn aɪ hæv ə kwɪk ʌpˈdeɪt rɪˈɡɑː.dɪŋ ˈaʊər dɪˈpɑːt.mənts ˈkwɔː.tə.li ˈbʌdʒ.ɪt/"
      },
      {
        id: 2,
        speaker: "Finance Manager",
        text: "Due to increased operational costs, we are revising our business travel reimbursement policy.",
        translation: "Do chi phí vận hành tăng lên, chúng ta đang sửa đổi chính sách hoàn trả chi phí công tác.",
        timestamp: [4.6, 9.9],
        ipa: "/djuː tuː ɪnˈkriːst ˌɒp.ərˈeɪ.ʃən.əl kɒsts wiː ɑːr rɪˈvaɪz.ɪŋ ˈaʊər ˈbɪz.nɪs ˈtræv.əl ˌriː.ɪmˈbɜːs.mənt ˈpɒl.ə.si/"
      },
      {
        id: 3,
        speaker: "Finance Manager",
        text: "Starting next month, all expense receipts must be submitted within five business days.",
        translation: "Bắt đầu từ tháng tới, tất cả hóa đơn chi tiêu phải được nộp trong vòng năm ngày làm việc.",
        timestamp: [9.9, 15.3],
        ipa: "/ˈstɑː.tɪŋ nekst mʌnθ ɔːl ɪkˈspens rɪˈsiːts mʌst biː səbˈmɪt.ɪd wɪˈðɪn faɪv ˈbɪz.nɪs deɪz/"
      },
      {
        id: 4,
        speaker: "Finance Manager",
        text: "Late submissions will require approval from the regional finance director before processing.",
        translation: "Các trường hợp nộp trễ sẽ cần sự phê duyệt từ Giám đốc Tài chính khu vực trước khi được xử lý.",
        timestamp: [15.3, 22.0],
        ipa: "/leɪt səbˈmɪʃ.ənz wɪl rɪˈkwaɪər əˈpruː.vəl frəm ðə ˈriː.dʒən.əl faɪˈnæns daɪˈrek.tər bɪˈfɔː prəˈses.ɪŋ/"
      }
    ],
    vocabList: [
      {
        word: "expenditure",
        ipa: "/ɪkˈspen.dɪ.tʃər/",
        pos: "Noun",
        meaning: "Chi phí, sự tiêu dùng",
        detailMeaning: "Khoản chi tiêu cho công việc hoặc vận hành.",
        collocations: ["travel expenditure", "reduce expenditure"],
        example: "We need to reduce unnecessary travel expenditures."
      },
      {
        word: "reimbursement",
        ipa: "/ˌriː.ɪmˈbɜːs.mənt/",
        pos: "Noun",
        meaning: "Sự hoàn tiền, khoản thanh toán lại",
        detailMeaning: "Khoản hoàn trả chi phí công tác nhân viên đã ứng trước.",
        collocations: ["reimbursement policy", "claim reimbursement"],
        example: "Submit all receipts to claim your reimbursement."
      },
      {
        word: "policy",
        ipa: "/ˈpɑː.lə.si/",
        pos: "Noun",
        meaning: "Quy định, chính sách",
        detailMeaning: "Nguyên tắc và chính sách làm việc chính thức.",
        collocations: ["travel policy", "revised policy"],
        example: "The revised travel policy will take effect next month."
      }
    ],
    grammarNotes: [
      {
        title: "Động từ khuyết thiếu bắt buộc: must + V-bare",
        explanation: "Dùng để quy định điều khoản công ty bắt buộc tuân thủ.",
        example: "Employees must submit their expense receipts within five business days.",
        sentenceId: 3
      },
      {
        title: "Cấu trúc Thời gian có hiệu lực: take effect + [date]",
        explanation: "Dùng trong thông báo quy định hoặc chính sách mới.",
        example: "The new policy will take effect on August 1st.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_004",
    title: "Annual Company Retreat & Location Announcement",
    category: "TOEIC Part 2",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "HR Director",
        text: "Attention team, I am excited to announce the location for our annual company retreat.",
        translation: "Xin chú ý cả đội, tôi rất vui mừng được thông báo địa điểm cho chuyến nghỉ dưỡng hàng năm của công ty chúng ta.",
        timestamp: [0, 4.8],
        ipa: "/əˈten.ʃən tiːm aɪ æm ɪkˈsaɪ.tɪd tuː əˈnaʊns ðə ləʊˈkeɪ.ʃən fɔːr ˈaʊər ˈæn.ju.əl ˈkʌm.pə.ni rɪˈtriːt/"
      },
      {
        id: 2,
        speaker: "HR Director",
        text: "This year, we will be staying at the Grand Beach Resort in Danang for three days.",
        translation: "Năm nay, chúng ta sẽ ở tại Grand Beach Resort ở Đà Nẵng trong vòng ba ngày.",
        timestamp: [4.9, 9.7],
        ipa: "/ðɪs jɪər wiː wɪl biː ˈsteɪ.ɪŋ æt ðə ɡrænd biːtʃ rɪˈzɔːt ɪn ðəˈnæŋ fɔːr θriː deɪz/"
      },
      {
        id: 3,
        speaker: "HR Director",
        text: "The event is scheduled for the second week of September to promote team building.",
        translation: "Sự kiện được lên lịch vào tuần thứ hai của tháng 9 nhằm thúc đẩy tinh thần đoàn kết đồng đội.",
        timestamp: [9.8, 15.2],
        ipa: "/ðə ɪˈvent ɪz ˈʃed.juːld fɔːr ðə ˈsek.ənd wiːk əv sepˈtem.bər tuː prəˈməʊt tiːm ˈbɪl.dɪŋ/"
      },
      {
        id: 4,
        speaker: "HR Director",
        text: "Human Resources will send out the detailed itinerary and flight details by Friday.",
        translation: "Phòng Nhân sự sẽ gửi lịch trình chi tiết và thông tin chuyến bay trước Thứ Sáu.",
        timestamp: [15.3, 22.0],
        ipa: "/ˈhjuː.mən rɪˈzɔː.sɪz wɪl send aʊt ðə ˈdiː.teɪld aɪˈtɪn.ər.ər.i ænd flaɪt ˈdiː.teɪlz baɪ ˈfraɪ.deɪ/"
      }
    ],
    vocabList: [
      {
        word: "retreat",
        ipa: "/rɪˈtriːt/",
        pos: "Noun",
        meaning: "Chuyến dã ngoại, đợt nghỉ dưỡng công ty",
        detailMeaning: "Chuyến đi nghỉ mát tập thể nhằm gắn kết nhân viên.",
        collocations: ["company retreat", "staff retreat"],
        example: "The annual staff retreat is scheduled for next month."
      },
      {
        word: "venue",
        ipa: "/ˈven.juː/",
        pos: "Noun",
        meaning: "Địa điểm tổ chức sự kiện",
        detailMeaning: "Vị trí được lựa chọn để diễn ra hội nghị hoặc dã ngoại.",
        collocations: ["event venue", "select a venue"],
        example: "We have selected a seaside resort as our event venue."
      },
      {
        word: "itinerary",
        ipa: "/aɪˈtɪn.ə.rer.i/",
        pos: "Noun",
        meaning: "Lịch trình chuyến đi",
        detailMeaning: "Bản kế hoạch chi tiết về thời gian và các địa điểm ghé thăm.",
        collocations: ["detailed itinerary", "travel itinerary"],
        example: "HR will distribute the detailed itinerary by Thursday."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Dự định / Kế hoạch: be scheduled to + V-bare",
        explanation: "Dùng để thông báo lịch trình hoặc kế hoạch đã chốt thời gian.",
        example: "The retreat is scheduled to take place in September.",
        sentenceId: 3
      },
      {
        title: "Cụm trạng từ chỉ vị trí: located in + location",
        explanation: "Mô tả vị trí địa lý của khách sạn/ resort.",
        example: "Located in Danang / at the Grand Beach Resort.",
        sentenceId: 2
      }
    ]
  },
  {
    id: "listen_toeic_q3_003",
    title: "Customer Support Training & System Upgrade",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "00:23",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Operations Lead",
        text: "Good afternoon team, I have an important update regarding our support ticketing system.",
        translation: "Chào buổi chiều cả đội, tôi có một cập nhật quan trọng liên quan đến hệ thống quản lý yêu cầu hỗ trợ của chúng ta.",
        timestamp: [0, 4.7],
        ipa: "/ɡʊd ˌɑːf.təˈnuːn tiːm aɪ hæv æn ɪmˈpɔː.tənt ˌʌpˈdeɪt rɪˈɡɑː.dɪŋ ˈaʊər səˈpɔːt ˈtɪk.ɪt.ɪŋ ˈsɪs.təm/"
      },
      {
        id: 2,
        speaker: "Operations Lead",
        text: "We are launching our new online support portal next Monday morning.",
        translation: "Chúng ta sẽ chính thức ra mắt cổng hỗ trợ trực tuyến mới vào sáng Thứ Hai tuần tới.",
        timestamp: [4.8, 9.4],
        ipa: "/wiː ɑːr ˈlɔːntʃ.ɪŋ ˈaʊər njuː ˈɒn.laɪn səˈpɔːt ˈpɔː.təl nekst ˈmʌn.deɪ ˈmɔː.nɪŋ/"
      },
      {
        id: 3,
        speaker: "Operations Lead",
        text: "All representatives must attend a mandatory thirty-minute training session tomorrow.",
        translation: "Tất cả đại diện chăm sóc khách hàng phải tham gia một buổi đào tạo bắt buộc kéo dài 30 phút vào ngày mai.",
        timestamp: [9.5, 15.0],
        ipa: "/ɔːl ˌrep.rɪˈzen.tə.tɪvz mʌst əˈtend ə mænˈdæ.tər.i ˈθɜː.ti ˈmɪn.ɪt ˈtreɪ.nɪŋ ˈseʃ.ən təˈmɒr.əʊ/"
      },
      {
        id: 4,
        speaker: "Operations Lead",
        text: "This will ensure everyone knows how to navigate the updated database efficiently.",
        translation: "Điều này sẽ đảm bảo mọi người đều biết cách thao tác trên cơ sở dữ liệu mới cập nhật một cách hiệu quả.",
        timestamp: [15.1, 23.0],
        ipa: "/ðɪs wɪl ɪnˈʃɔːr ˈev.ri.wʌn nəʊz haʊ tuː ˈnæv.ɪ.ɡeɪt ðə ˌʌpˈdeɪ.tɪd ˈdeɪ.tə.beɪs ɪˈfɪʃ.ənt.li/"
      }
    ],
    vocabList: [
      {
        word: "system upgrade",
        ipa: "/ˈsɪs.təm ʌp.ɡreɪd/",
        pos: "Noun",
        meaning: "Sự nâng cấp hệ thống",
        detailMeaning: "Nâng cấp phần mềm hoặc hạ tầng máy tính lên phiên bản mới hơn.",
        collocations: ["scheduled system upgrade", "perform system upgrade"],
        example: "The scheduled system upgrade will take place this weekend."
      },
      {
        word: "representative",
        ipa: "/ˌrep.rɪˈzen.tə.tɪv/",
        pos: "Noun",
        meaning: "Đại diện chăm sóc khách hàng",
        detailMeaning: "Nhân viên chịu trách nhiệm trực tiếp trao đổi và hỗ trợ người dùng.",
        collocations: ["customer representative", "sales representative"],
        example: "Our customer service representatives are available 24/7."
      },
      {
        word: "navigate",
        ipa: "/ˈnæv.ɪ.ɡeɪt/",
        pos: "Verb",
        meaning: "Thao tác, điều hướng sử dụng",
        detailMeaning: "Tìm kiếm và di chuyển giữa các chức năng trong phần mềm/website.",
        collocations: ["navigate the database", "easy to navigate"],
        example: "The new portal makes it easier for users to navigate."
      }
    ],
    grammarNotes: [
      {
        title: "Hiện tại tiếp diễn chỉ kế hoạch tương lai: Be + V-ing",
        explanation: "Dùng để thông báo một lịch trình đã được lên kế hoạch và chốt thời gian cụ thể.",
        example: "We are launching our new support portal next Monday.",
        sentenceId: 2
      },
      {
        title: "Động từ nguyên mẫu chỉ mục đích: to + V-bare",
        explanation: "Dùng để giải thích lý do thực hiện một hành động.",
        example: "Attend a session to learn / to ensure everyone knows.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_002",
    title: "Product Launch Event & Customer Feedback Analysis",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:22",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Manager",
        text: "Welcome everyone. Today I'd like to review the results from our recent product launch.",
        translation: "Chào mừng mọi người. Hôm nay tôi muốn điểm lại các kết quả từ đợt ra mắt sản phẩm gần đây của chúng ta.",
        timestamp: [0, 4.4],
        ipa: "/ˈwel.kəm ˈev.ri.wʌn təˈdeɪ aɪd laɪk tuː rɪˈvjuː ðə rɪˈzʌlts frɒm ˈaʊər ˈriː.sənt ˈprɒd.ʌkt lɔːntʃ/"
      },
      {
        id: 2,
        speaker: "Manager",
        text: "Overall, initial sales exceeded our expectations by twenty percent in the first week.",
        translation: "Nhìn chung, doanh số ban đầu đã vượt kỳ vọng của chúng ta 20% trong tuần đầu tiên.",
        timestamp: [4.5, 9.7],
        ipa: "/ˌəʊ.vərˈɔːl ɪˈnɪʃ.əl seɪlz ɪkˈsiː.dɪd ˈaʊər ˌek.spekˈteɪ.ʃənz baɪ ˈtwen.ti pəˈsent ɪn ðə fɜːst wiːk/"
      },
      {
        id: 3,
        speaker: "Manager",
        text: "However, several customers reported minor bugs in the user interface during setup.",
        translation: "Tuy nhiên, một số khách hàng đã báo cáo các lỗi nhỏ ở giao diện người dùng trong quá trình cài đặt.",
        timestamp: [9.8, 15.1],
        ipa: "/haʊˈev.ər ˈsev.ər.əl ˈkʌs.tə.məz rɪˈpɔː.tɪd ˈmaɪ.nər bʌɡz ɪn ðə ˈjuː.zər ˈɪn.tə.feɪs ˈdjʊə.rɪŋ ˈset.ʌp/"
      },
      {
        id: 4,
        speaker: "Manager",
        text: "Our technical team is currently preparing a software update to resolve these issues promptly.",
        translation: "Đội ngũ kỹ thuật của chúng ta hiện đang chuẩn bị một bản cập nhật phần mềm để xử lý dứt điểm các vấn đề này nhanh chóng.",
        timestamp: [15.2, 22.0],
        ipa: "/ˈaʊər ˈtek.nɪ.kəl tiːm ɪz ˈkʌr.ənt.li prɪˈpeər.ɪŋ ə ˈsɒft.weər ˌʌpˈdeɪt tuː rɪˈzɒlv ðiːz ˈɪʃ.uːz ˈprɒmpt.li/"
      }
    ],
    vocabList: [
      {
        word: "launch",
        ipa: "/lɔːntʃ/",
        pos: "Verb / Noun",
        meaning: "Ra mắt, sự ra mắt sản phẩm",
        detailMeaning: "Giới thiệu sản phẩm hoặc dịch vụ mới ra thị trường.",
        collocations: ["product launch", "official launch"],
        example: "The official launch event will take place next month."
      },
      {
        word: "survey",
        ipa: "/ˈsɜː.veɪ/",
        pos: "Noun",
        meaning: "Cuộc khảo sát",
        detailMeaning: "Thu thập ý kiến đánh giá từ khách hàng.",
        collocations: ["customer survey", "conduct a survey"],
        example: "We collected data through a customer satisfaction survey."
      },
      {
        word: "feature",
        ipa: "/ˈfiː.tʃər/",
        pos: "Noun",
        meaning: "Tính năng, đặc điểm",
        detailMeaning: "Thành phần hoặc chức năng quan trọng của sản phẩm.",
        collocations: ["new feature", "security feature"],
        example: "Users really like the new security feature."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị Động Quá Khứ Đơn: was/were + V3/ed",
        explanation: "Dùng để báo cáo về các sự kiện hoặc hành động đã diễn ra trong quá khứ.",
        example: "Initial sales exceeded expectations / survey was distributed.",
        sentenceId: 2
      },
      {
        title: "Cụm chỉ mục đích: in order to + V-bare / to + V-bare",
        explanation: "Dùng để diễn tả mục đích thực hiện hành động.",
        example: "In order to gather early feedback, we sent a survey / to resolve these issues.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "listen_toeic_q3_001",
    title: "Q3 Marketing Strategy & Customer Response Times",
    category: "TOEIC Part 4",
    level: "Intermediate",
    duration: "00:21",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800",
    orderIndex: 0,
    transcript: [
      {
        id: 1,
        speaker: "Narrator",
        text: "Good morning, team. We have a lot to cover regarding our Q3 marketing strategy.",
        translation: "Chào buổi sáng cả đội. Chúng ta có rất nhiều việc cần giải quyết liên quan đến chiến lược marketing Quý 3.",
        timestamp: [0, 4.1],
        ipa: "/ɡʊd ˈmɔː.nɪŋ tiːm wiː hæv ə lɒt tuː ˈkʌv.ər rɪˈɡɑː.dɪŋ ˈaʊər kjuː θriː ˈmɑː.kɪ.tɪŋ ˈstræt.ə.dʒi/"
      },
      {
        id: 2,
        speaker: "Narrator",
        text: "Our recent campaign saw a fifteen percent increase in engagement across all platforms.",
        translation: "Chiến dịch gần đây của chúng ta đã ghi nhận mức tăng 15% về lượng tương tác trên tất cả các nền tảng.",
        timestamp: [4.2, 9.4],
        ipa: "/ˈaʊər ˈriː.sənt kæmˈpeɪn sɔː ə ˌfɪfˈtiːn pəˈsent ˈɪn.kriːs ɪn ɪnˈɡeɪdʒ.mənt əˈkrɒs ɔːl ˈplæt.fɔːmz/"
      },
      {
        id: 3,
        speaker: "Narrator",
        text: "However, we need to address the feedback regarding our customer response times.",
        translation: "Tuy nhiên, chúng ta cần xử lý các phản hồi liên quan đến thời gian phản hồi khách hàng.",
        timestamp: [9.5, 14.2],
        ipa: "/haʊˈev.ər wiː niːd tuː əˈdres ðə ˈfiːd.bæk rɪˈɡɑː.dɪŋ ˈaʊər ˈkʌs.tə.mə rɪˈspɒns taɪmz/"
      },
      {
        id: 4,
        speaker: "Narrator",
        text: "Let's brainstorm ways to improve our efficiency before the next quarterly review.",
        translation: "Hãy cùng thảo luận các cách để cải thiện hiệu suất làm việc trước kỳ đánh giá quý tiếp theo.",
        timestamp: [14.3, 21.0],
        ipa: "/lets ˈbreɪn.stɔːm weɪz tuː ɪmˈpruːv ˈaʊər ɪˈfɪʃ.ən.si bɪˈfɔːr ðə nekst ˈkwɔː.təl.i rɪˈvjuː/"
      }
    ],
    vocabList: [
      {
        word: "strategy",
        ipa: "/ˈstræt.ə.dʒi/",
        pos: "Noun",
        meaning: "Chiến lược",
        detailMeaning: "Kế hoạch hành động dài hạn để đạt được mục tiêu.",
        collocations: ["marketing strategy", "business strategy"],
        example: "We need a solid Q3 marketing strategy."
      },
      {
        word: "engagement",
        ipa: "/ɪnˈɡeɪdʒ.mənt/",
        pos: "Noun",
        meaning: "Sự tương tác",
        detailMeaning: "Mức độ quan tâm và tương tác của khách hàng.",
        collocations: ["customer engagement", "increase engagement"],
        example: "The campaign increased engagement across all platforms."
      },
      {
        word: "efficiency",
        ipa: "/ɪˈfɪʃ.ən.si/",
        pos: "Noun",
        meaning: "Hiệu suất làm việc",
        detailMeaning: "Khả năng hoàn thành công việc nhanh chóng và hiệu quả.",
        collocations: ["improve efficiency", "work efficiency"],
        example: "Let's brainstorm ways to improve our efficiency."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Tăng/Giảm: increase in + [danh từ]",
        explanation: "Dùng để chỉ sự gia tăng trong một khía cạnh hoặc lĩnh vực cụ thể.",
        example: "A fifteen percent increase in engagement.",
        sentenceId: 2
      },
      {
        title: "Mệnh lệnh thức lịch sự với Let's + V-bare",
        explanation: "Dùng để rủ rê hoặc đề xuất cùng nhau thực hiện một hành động.",
        example: "Let's brainstorm ways to improve.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "toeic-p3-01",
    title: "Office Renovation Announcement & Relocation",
    category: "TOEIC Part 3",
    level: "Intermediate",
    duration: "03:45",
    accent: "en-US",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    orderIndex: 1,
    transcript: [
      {
        id: 1,
        speaker: "Narrator",
        text: "Attention all employees working on the third floor.",
        translation: "Xin chú ý tới tất cả nhân viên làm việc tại tầng ba.",
        timestamp: [0, 3.5],
        ipa: "/əˈten.ʃən ɔːl ɪmˈplɔɪ.iːz ˈwɜː.kɪŋ ɒn ðə θɜːd flɔːr/"
      },
      {
        id: 2,
        speaker: "Manager",
        text: "Due to upcoming building renovations, your department will be temporarily relocated to the second floor.",
        translation: "Do đợt tu sửa tòa nhà sắp tới, phòng ban của bạn sẽ tạm thời di dời xuống tầng hai.",
        timestamp: [3.6, 9.2],
        ipa: "/djuː tuː ˌʌpˈkʌm.ɪŋ ˈbɪl.dɪŋ ˌren.əˈveɪ.ʃənz jɔːr dɪˈpɑːt.mənt wɪl biː ˈtem.pər.ər.əl.i rɪəʊˈleɪ.tɪd/"
      },
      {
        id: 3,
        speaker: "Manager",
        text: "Please make sure to pack your belongings by Friday evening.",
        translation: "Vui lòng đảm bảo đóng gói vật dụng cá nhân trước chiều Thứ Sáu.",
        timestamp: [9.3, 13.5],
        ipa: "/pliːz meɪk ʃɔːr tuː pæk jɔːr bɪˈlɒŋ.ɪŋz baɪ ˈfraɪ.deɪ ˈiːv.nɪŋ/"
      },
      {
        id: 4,
        speaker: "Manager",
        text: "The renovation work is expected to take approximately two weeks.",
        translation: "Công việc tu sửa dự kiến sẽ mất khoảng hai tuần.",
        timestamp: [13.6, 17.8],
        ipa: "/ðə ˌren.əˈveɪ.ʃən wɜːk ɪz ɪkˈspek.tɪd tuː teɪk əˈprɒk.sɪ.mət.li tuː wiːks/"
      },
      {
        id: 5,
        speaker: "Narrator",
        text: "During this time, the main elevators will operate on a restricted schedule.",
        translation: "Trong thời gian này, thang máy chính sẽ hoạt động theo lịch trình hạn chế.",
        timestamp: [17.9, 22.4],
        ipa: "/ˈdjʊə.rɪŋ ðɪs taɪm ðə meɪn ˈel.ɪ.veɪ.təz wɪl ˈɒp.ər.eɪt ɒn ə rɪˈstrɪk.tɪd ˈʃed.juːl/"
      },
      {
        id: 6,
        speaker: "Narrator",
        text: "We appreciate your full cooperation and patience during this transition.",
        translation: "Chúng tôi rất trân trọng sự hợp tác và kiên nhẫn của bạn trong giai đoạn chuyển tiếp này.",
        timestamp: [22.5, 27.0],
        ipa: "/wiː əˈpriː.ʃi.eɪt jɔːr fʊl kəʊˌɒp.ərˈeɪ.ʃən ænd ˈpeɪ.ʃəns ˈdjʊə.rɪŋ ðɪs trænˈzɪʃ.ən/"
      }
    ],
    vocabList: [
      {
        word: "renovation",
        ipa: "/ˌren.əˈveɪ.ʃən/",
        pos: "Noun",
        meaning: "Sự tu sửa, cải tạo",
        detailMeaning: "Quá trình sửa chữa và nâng cấp tòa nhà hoặc cấu trúc.",
        collocations: ["building renovation", "major renovation"],
        example: "The office is closed for renovation."
      },
      {
        word: "relocated",
        ipa: "/rɪəʊˈleɪ.tɪd/",
        pos: "Verb (Past Participle)",
        meaning: "Di dời địa điểm",
        detailMeaning: "Chuyển trụ sở hoặc vị trí làm việc sang chỗ mới.",
        collocations: ["temporarily relocated", "relocate headquarters"],
        example: "The company relocated to London last year."
      },
      {
        word: "belongings",
        ipa: "/bɪˈlɒŋ.ɪŋz/",
        pos: "Noun (Plural)",
        meaning: "Đồ dùng cá nhân",
        detailMeaning: "Các tài sản, vật dụng cá nhân mang theo.",
        collocations: ["personal belongings", "pack belongings"],
        example: "Please take all your personal belongings with you."
      }
    ],
    grammarNotes: [
      {
        title: "Cấu trúc Bị Động Tương Lai: will be + V3/ed",
        explanation: "Dùng để diễn tả một hành động sẽ được thực hiện bởi tổ chức/cơ quan trong tương lai.",
        example: "Your department will be temporarily relocated.",
        sentenceId: 2
      },
      {
        title: "Cụm từ chỉ thời gian: During this time / Approximately",
        explanation: "Dùng để mô tả khoảng thời gian diễn ra một sự việc ước tính.",
        example: "Take approximately two weeks.",
        sentenceId: 4
      }
    ]
  },
  {
    id: "toeic-p1-02",
    title: "Customer Service Helpdesk Consultation",
    category: "TOEIC Part 1",
    level: "Basic",
    duration: "02:15",
    accent: "en-GB",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/office_environment.ogg",
    imageUrl: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=800",
    orderIndex: 2,
    transcript: [
      {
        id: 1,
        speaker: "Agent",
        text: "Thank you for contacting customer support. How may I assist you today?",
        translation: "Cảm ơn bạn đã liên hệ bộ phận hỗ trợ khách hàng. Tôi có thể giúp gì cho bạn hôm nay?",
        timestamp: [0, 4.0],
        ipa: "/θæŋk juː fɔː kənˈtæk.tɪŋ ˈkʌs.tə.mə səˈpɔːt. haʊ meɪ aɪ əˈsɪst juː təˈdeɪ/"
      },
      {
        id: 2,
        speaker: "Customer",
        text: "I would like to check the status of my order placed yesterday.",
        translation: "Tôi muốn kiểm tra trạng thái đơn hàng đã đặt ngày hôm qua.",
        timestamp: [4.1, 8.5],
        ipa: "/aɪ wʊd laɪk tuː tʃek ðə ˈsteɪ.təs əv maɪ ˈɔː.də pleɪst ˈjes.tə.deɪ/"
      }
    ],
    vocabList: [
      {
        word: "assist",
        ipa: "/əˈsɪst/",
        pos: "Verb",
        meaning: "Hỗ trợ, giúp đỡ",
        detailMeaning: "Cung cấp sự trợ giúp cho ai đó.",
        collocations: ["assist customers", "assist with"],
        example: "How can I assist you today?"
      }
    ],
    grammarNotes: [
      {
        title: "Lịch sự: How may I assist you / I would like to...",
        explanation: "Cấu trúc giao tiếp lịch sự trong môi trường làm việc chuyên nghiệp.",
        example: "I would like to check the status.",
        sentenceId: 2
      }
    ]
  }
];

async function seed() {
  console.log("🌱 Seeding Listening Lessons...");
  for (const lesson of SEED_LESSONS) {
    await prisma.listeningLesson.upsert({
      where: { id: lesson.id },
      update: lesson,
      create: lesson,
    });
  }
  console.log("✅ Listening Lessons Seeding Completed!");
}

seed()
  .catch((e) => {
    console.error("❌ Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
