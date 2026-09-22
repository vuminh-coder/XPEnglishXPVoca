import { ListeningLesson } from "@/features/listening/utils/listeningParser";

export const EXTENDED_SHADOWING_LESSONS: ListeningLesson[] = [
  {
    id: "shadow_ext_001",
    title: "International Airport Flight Disruption & Rebooking",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    level: "Intermediate",
    duration: "2:45",
    category: "Travel & Business",
    tags: ["Flight", "Airport", "Roleplay", "Customer Service"],
    vocabularyList: [
      { word: "disruption", ipa: "/dɪsˈrʌp.ʃən/", pos: "n", vietnamese: "sự gián đoạn", englishDef: "An interruption to a regular process or activity.", example: "Severe weather caused major flight disruptions." },
      { word: "unforeseen", ipa: "/ˌʌn.fɔːrˈsiːn/", pos: "adj", vietnamese: "không lường trước được", englishDef: "Not anticipated or predicted.", example: "Unforeseen technical issues delayed our departure." },
      { word: "compensation", ipa: "/ˌkɑːm.pənˈseɪ.ʃən/", pos: "n", vietnamese: "sự bồi thường", englishDef: "Money awarded to someone as recompense for loss.", example: "Passengers received meal vouchers as compensation." },
      { word: "itinerary", ipa: "/aɪˈtɪn.ə.rer.i/", pos: "n", vietnamese: "hành trình, lịch trình", example: "Check your updated flight itinerary online." },
      { word: "accommodate", ipa: "/əˈkɑː.mə.deɪt/", pos: "v", vietnamese: "sắp xếp chỗ ở / hỗ trợ", example: "We will accommodate all affected passengers in local hotels." }
    ],
    transcript: [
      {
        id: "s1",
        speaker: "Speaker A",
        text: "Good afternoon, passengers. May I have your attention for an urgent flight update?",
        vietnamese: "Xin chào quý hành khách. Tôi xin phép được thu hút sự chú ý của quý vị cho một cập nhật chuyến bay khẩn cấp.",
        startTime: 0,
        endTime: 4.5,
        wordTimings: [
          { word: "Good", start: 0, end: 400 },
          { word: "afternoon,", start: 450, end: 1100 },
          { word: "passengers.", start: 1200, end: 1800 },
          { word: "May", start: 2200, end: 2500 },
          { word: "I", start: 2550, end: 2700 },
          { word: "have", start: 2750, end: 3000 },
          { word: "your", start: 3050, end: 3200 },
          { word: "attention", start: 3250, end: 3800 },
          { word: "for", start: 3850, end: 4000 },
          { word: "an", start: 4050, end: 4150 },
          { word: "urgent", start: 4200, end: 4600 },
          { word: "flight", start: 4650, end: 5000 },
          { word: "update?", start: 5050, end: 5500 }
        ]
      },
      {
        id: "s2",
        speaker: "Speaker A",
        text: "Due to unforeseen thunderstorm activity over the eastern corridor, Flight 842 has been delayed.",
        vietnamese: "Do hoạt động dông bão không lường trước được ở hành lang phía đông, Chuyến bay 842 đã bị hoãn.",
        startTime: 5.5,
        endTime: 12.0,
        wordTimings: [
          { word: "Due", start: 0, end: 300 },
          { word: "to", start: 350, end: 500 },
          { word: "unforeseen", start: 550, end: 1400 },
          { word: "thunderstorm", start: 1450, end: 2400 },
          { word: "activity", start: 2450, end: 3100 },
          { word: "over", start: 3150, end: 3500 },
          { word: "the", start: 3550, end: 3700 },
          { word: "eastern", start: 3750, end: 4300 },
          { word: "corridor,", start: 4350, end: 5100 },
          { word: "Flight", start: 5500, end: 5900 },
          { word: "842", start: 5950, end: 6600 },
          { word: "has", start: 6650, end: 6850 },
          { word: "been", start: 6900, end: 7150 },
          { word: "delayed.", start: 7200, end: 7800 }
        ]
      },
      {
        id: "s3",
        speaker: "Speaker B",
        text: "Excuse me, officer. I have a connecting flight in Frankfurt that departs in two hours.",
        vietnamese: "Xin lỗi nhân viên. Tôi có một chuyến bay nối chuyến ở Frankfurt sẽ khởi hành trong hai giờ nữa.",
        startTime: 13.0,
        endTime: 19.5,
        wordTimings: [
          { word: "Excuse", start: 0, end: 500 },
          { word: "me,", start: 550, end: 850 },
          { word: "officer.", start: 900, end: 1500 },
          { word: "I", start: 1800, end: 2000 },
          { word: "have", start: 2050, end: 2300 },
          { word: "a", start: 2350, end: 2450 },
          { word: "connecting", start: 2500, end: 3200 },
          { word: "flight", start: 3250, end: 3700 },
          { word: "in", start: 3750, end: 3900 },
          { word: "Frankfurt", start: 3950, end: 4700 },
          { word: "that", start: 4750, end: 4950 },
          { word: "departs", start: 5000, end: 5600 },
          { word: "in", start: 5650, end: 5800 },
          { word: "two", start: 5850, end: 6200 },
          { word: "hours.", start: 6250, end: 6800 }
        ]
      },
      {
        id: "s4",
        speaker: "Speaker B",
        text: "Will the airline be able to rebook me on an alternative route if I miss it?",
        vietnamese: "Liệu hãng hàng không có thể đặt lại cho tôi một tuyến đường thay thế nếu tôi bị lỡ chuyến không?",
        startTime: 20.5,
        endTime: 26.0,
        wordTimings: [
          { word: "Will", start: 0, end: 300 },
          { word: "the", start: 350, end: 500 },
          { word: "airline", start: 550, end: 1100 },
          { word: "be", start: 1150, end: 1300 },
          { word: "able", start: 1350, end: 1650 },
          { word: "to", start: 1700, end: 1850 },
          { word: "rebook", start: 1900, end: 2400 },
          { word: "me", start: 2450, end: 2650 },
          { word: "on", start: 2700, end: 2850 },
          { word: "an", start: 2900, end: 3000 },
          { word: "alternative", start: 3050, end: 3800 },
          { word: "route", start: 3850, end: 4300 },
          { word: "if", start: 4350, end: 4500 },
          { word: "I", start: 4550, end: 4700 },
          { word: "miss", start: 4750, end: 5100 },
          { word: "it?", start: 5150, end: 5500 }
        ]
      },
      {
        id: "s5",
        speaker: "Speaker A",
        text: "Don't worry, sir. We are actively arranging rebooking options for all connecting passengers.",
        vietnamese: "Xin đừng lo lắng, thưa ông. Chúng tôi đang tích cực sắp xếp các tùy chọn đặt lại vé cho tất cả hành khách nối chuyến.",
        startTime: 27.0,
        endTime: 33.5,
        wordTimings: [
          { word: "Don't", start: 0, end: 400 },
          { word: "worry,", start: 450, end: 900 },
          { word: "sir.", start: 950, end: 1300 },
          { word: "We", start: 1600, end: 1800 },
          { word: "are", start: 1850, end: 2000 },
          { word: "actively", start: 2050, end: 2650 },
          { word: "arranging", start: 2700, end: 3350 },
          { word: "rebooking", start: 3400, end: 4100 },
          { word: "options", start: 4150, end: 4700 },
          { word: "for", start: 4750, end: 4900 },
          { word: "all", start: 4950, end: 5200 },
          { word: "connecting", start: 5250, end: 5900 },
          { word: "passengers.", start: 5950, end: 6600 }
        ]
      },
      {
        id: "s6",
        speaker: "Speaker A",
        text: "If your flight is delayed for more than three hours, complimentary hotel vouchers will be provided.",
        vietnamese: "Nếu chuyến bay của bạn bị hoãn quá ba giờ, phiếu lưu trú khách sạn miễn phí sẽ được cung cấp.",
        startTime: 34.5,
        endTime: 41.5,
        wordTimings: [
          { word: "If", start: 0, end: 250 },
          { word: "your", start: 300, end: 500 },
          { word: "flight", start: 550, end: 950 },
          { word: "is", start: 1000, end: 1150 },
          { word: "delayed", start: 1200, end: 1750 },
          { word: "for", start: 1800, end: 1950 },
          { word: "more", start: 2000, end: 2300 },
          { word: "than", start: 2350, end: 2550 },
          { word: "three", start: 2600, end: 3000 },
          { word: "hours,", start: 3050, end: 3600 },
          { word: "complimentary", start: 3900, end: 4800 },
          { word: "hotel", start: 4850, end: 5300 },
          { word: "vouchers", start: 5350, end: 6000 },
          { word: "will", start: 6050, end: 6250 },
          { word: "be", start: 6300, end: 6450 },
          { word: "provided.", start: 6500, end: 7100 }
        ]
      },
      {
        id: "s7",
        speaker: "Speaker B",
        text: "That sounds reassuring. Should I head to Customer Service Desk 4 right now?",
        vietnamese: "Nghe vậy tôi cũng yên tâm phần nào. Tôi có nên đến Quầy Phục vụ Khách hàng số 4 ngay bây giờ không?",
        startTime: 42.5,
        endTime: 48.0,
        wordTimings: [
          { word: "That", start: 0, end: 300 },
          { word: "sounds", start: 350, end: 800 },
          { word: "reassuring.", start: 850, end: 1600 },
          { word: "Should", start: 1900, end: 2200 },
          { word: "I", start: 2250, end: 2400 },
          { word: "head", start: 2450, end: 2750 },
          { word: "to", start: 2800, end: 2950 },
          { word: "Customer", start: 3000, end: 3500 },
          { word: "Service", start: 3550, end: 4000 },
          { word: "Desk", start: 4050, end: 4400 },
          { word: "4", start: 4450, end: 4750 },
          { word: "right", start: 4800, end: 5100 },
          { word: "now?", start: 5150, end: 5500 }
        ]
      },
      {
        id: "s8",
        speaker: "Speaker A",
        text: "Yes, please present your boarding pass and passport to the agent at Desk 4.",
        vietnamese: "Vâng, xin vui lòng xuất trình thẻ lên máy bay và hộ chiếu của bạn cho nhân viên tại Quầy 4.",
        startTime: 49.0,
        endTime: 55.0,
        wordTimings: [
          { word: "Yes,", start: 0, end: 500 },
          { word: "please", start: 600, end: 1000 },
          { word: "present", start: 1050, end: 1600 },
          { word: "your", start: 1650, end: 1850 },
          { word: "boarding", start: 1900, end: 2450 },
          { word: "pass", start: 2500, end: 2900 },
          { word: "and", start: 2950, end: 3150 },
          { word: "passport", start: 3200, end: 3850 },
          { word: "to", start: 3900, end: 4050 },
          { word: "the", start: 4100, end: 4250 },
          { word: "agent", start: 4300, end: 4750 },
          { word: "at", start: 4800, end: 4950 },
          { word: "Desk", start: 5000, end: 5350 },
          { word: "4.", start: 5400, end: 5800 }
        ]
      },
      {
        id: "s9",
        speaker: "Speaker B",
        text: "Thank you for your prompt assistance. I appreciate your clear guidance.",
        vietnamese: "Cảm ơn bạn vì sự hỗ trợ kịp thời. Tôi rất trân trọng sự hướng dẫn rõ ràng của bạn.",
        startTime: 56.0,
        endTime: 61.5,
        wordTimings: [
          { word: "Thank", start: 0, end: 350 },
          { word: "you", start: 400, end: 600 },
          { word: "for", start: 650, end: 800 },
          { word: "your", start: 850, end: 1050 },
          { word: "prompt", start: 1100, end: 1600 },
          { word: "assistance.", start: 1650, end: 2500 },
          { word: "I", start: 2800, end: 3000 },
          { word: "appreciate", start: 3050, end: 3750 },
          { word: "your", start: 3800, end: 4000 },
          { word: "clear", start: 4050, end: 4450 },
          { word: "guidance.", start: 4500, end: 5200 }
        ]
      },
      {
        id: "s10",
        speaker: "Speaker A",
        text: "You're very welcome. Have a safe journey, and we wish you a pleasant flight once rebooked.",
        vietnamese: "Không có gì thưa ông. Chúc ông có một hành trình an toàn và chuyến bay tốt đẹp sau khi được đặt lại vé.",
        startTime: 62.5,
        endTime: 69.5,
        wordTimings: [
          { word: "You're", start: 0, end: 350 },
          { word: "very", start: 400, end: 700 },
          { word: "welcome.", start: 750, end: 1400 },
          { word: "Have", start: 1700, end: 1950 },
          { word: "a", start: 2000, end: 2100 },
          { word: "safe", start: 2150, end: 2550 },
          { word: "journey,", start: 2600, end: 3200 },
          { word: "and", start: 3400, end: 3600 },
          { word: "we", start: 3650, end: 3850 },
          { word: "wish", start: 3900, end: 4200 },
          { word: "you", start: 4250, end: 4450 },
          { word: "a", start: 4500, end: 4600 },
          { word: "pleasant", start: 4650, end: 5150 },
          { word: "flight", start: 5200, end: 5650 },
          { word: "once", start: 5700, end: 5950 },
          { word: "rebooked.", start: 6000, end: 6700 }
        ]
      },
      {
        id: "s11",
        speaker: "Speaker B",
        text: "Will my luggage be automatically transferred to the new aircraft?",
        vietnamese: "Hành lý của tôi có tự động được chuyển sang máy bay mới không?",
        startTime: 70.5,
        endTime: 75.5,
        wordTimings: [
          { word: "Will", start: 0, end: 300 },
          { word: "my", start: 350, end: 550 },
          { word: "luggage", start: 600, end: 1100 },
          { word: "be", start: 1150, end: 1300 },
          { word: "automatically", start: 1350, end: 2200 },
          { word: "transferred", start: 2250, end: 2950 },
          { word: "to", start: 3000, end: 3150 },
          { word: "the", start: 3200, end: 3350 },
          { word: "new", start: 3400, end: 3700 },
          { word: "aircraft?", start: 3750, end: 4400 }
        ]
      },
      {
        id: "s12",
        speaker: "Speaker A",
        text: "Yes, our ground crew will handle your checked bags directly without requiring you to re-check them.",
        vietnamese: "Vâng, đội ngũ nhân viên mặt đất của chúng tôi sẽ xử lý hành lý ký gửi của bạn trực tiếp mà không cần bạn phải làm thủ tục lại.",
        startTime: 76.5,
        endTime: 83.5,
        wordTimings: [
          { word: "Yes,", start: 0, end: 400 },
          { word: "our", start: 500, end: 700 },
          { word: "ground", start: 750, end: 1200 },
          { word: "crew", start: 1250, end: 1600 },
          { word: "will", start: 1650, end: 1850 },
          { word: "handle", start: 1900, end: 2350 },
          { word: "your", start: 2400, end: 2600 },
          { word: "checked", start: 2650, end: 3150 },
          { word: "bags", start: 3200, end: 3600 },
          { word: "directly", start: 3650, end: 4300 },
          { word: "without", start: 4350, end: 4750 },
          { word: "requiring", start: 4800, end: 5400 },
          { word: "you", start: 5450, end: 5650 },
          { word: "to", start: 5700, end: 5850 },
          { word: "re-check", start: 5900, end: 6450 },
          { word: "them.", start: 6500, end: 6900 }
        ]
      },
      {
        id: "s13",
        speaker: "Speaker B",
        text: "That is wonderful news. Thank you again for your outstanding service.",
        vietnamese: "Đó là một tin tuyệt vời. Cảm ơn bạn một lần nữa vì sự phục vụ tuyệt vời.",
        startTime: 84.5,
        endTime: 89.5,
        wordTimings: [
          { word: "That", start: 0, end: 300 },
          { word: "is", start: 350, end: 500 },
          { word: "wonderful", start: 550, end: 1200 },
          { word: "news.", start: 1250, end: 1700 },
          { word: "Thank", start: 2000, end: 2350 },
          { word: "you", start: 2400, end: 2600 },
          { word: "again", start: 2650, end: 3000 },
          { word: "for", start: 3050, end: 3200 },
          { word: "your", start: 3250, end: 3450 },
          { word: "outstanding", start: 3500, end: 4250 },
          { word: "service.", start: 4300, end: 4900 }
        ]
      },
      {
        id: "s14",
        speaker: "Speaker A",
        text: "It is our absolute pleasure. Enjoy your flight and stay safe!",
        vietnamese: "Đó hoàn toàn là niềm vinh hạnh của chúng tôi. Chúc bạn có một chuyến bay vui vẻ và an toàn!",
        startTime: 90.5,
        endTime: 95.5,
        wordTimings: [
          { word: "It", start: 0, end: 200 },
          { word: "is", start: 250, end: 400 },
          { word: "our", start: 450, end: 650 },
          { word: "absolute", start: 700, end: 1300 },
          { word: "pleasure.", start: 1350, end: 1950 },
          { word: "Enjoy", start: 2200, end: 2600 },
          { word: "your", start: 2650, end: 2850 },
          { word: "flight", start: 2900, end: 3300 },
          { word: "and", start: 3350, end: 3500 },
          { word: "stay", start: 3550, end: 3900 },
          { word: "safe!", start: 3950, end: 4400 }
        ]
      }
    ],
    quizList: [
      {
        question: "Why was Flight 842 delayed?",
        options: ["Mechanical maintenance", "Unforeseen thunderstorm activity", "Crew shortage", "Airport security check"],
        correctIndex: 1,
        explanation: "The announcement states that the delay was due to unforeseen thunderstorm activity over the eastern corridor."
      },
      {
        question: "What compensation is provided if the flight is delayed for more than 3 hours?",
        options: ["Cash refund", "Free upgrade to First Class", "Complimentary hotel vouchers", "Free airline miles"],
        correctIndex: 2,
        explanation: "Speaker A mentions that complimentary hotel vouchers will be provided if delayed for over 3 hours."
      }
    ]
  },
  {
    id: "shadow_ext_002",
    title: "Executive Quarterly Strategy & Remote Team Alignment",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    level: "Hard",
    duration: "3:15",
    category: "Business Leadership",
    tags: ["Strategy", "Presentation", "Executive", "AI & Tech"],
    vocabularyList: [
      { word: "alignment", ipa: "/əˈlaɪn.mənt/", pos: "n", vietnamese: "sự đồng nhất, căn chỉnh", example: "We need complete strategic alignment across departments." },
      { word: "scalability", ipa: "/ˌskeɪ.ləˈbɪl.ə.t̬i/", pos: "n", vietnamese: "khả năng mở rộng", example: "Our software architecture ensures high scalability." },
      { word: "milestone", ipa: "/ˈmaɪl.stoʊn/", pos: "n", vietnamese: "cột mốc quan trọng", example: "Reaching 100,000 active users is a key milestone." },
      { word: "benchmark", ipa: "/ˈbentʃ.mɑːrk/", pos: "n", vietnamese: "tiêu chuẩn so sánh", example: "Our performance benchmarks exceed industry standards." }
    ],
    transcript: [
      {
        id: "s1",
        speaker: "Speaker A",
        text: "Good morning team, and welcome to our third quarter executive strategic alignment presentation.",
        vietnamese: "Xin chào toàn đội ngũ, và chào mừng các bạn đến với buổi thuyết trình định hướng chiến lược ban điều hành quý 3 của chúng ta.",
        startTime: 0,
        endTime: 5.5
      },
      {
        id: "s2",
        speaker: "Speaker A",
        text: "Over the past three months, our product innovation team has achieved remarkable milestones in scaling our cloud infrastructure.",
        vietnamese: "Trong ba tháng qua, đội ngũ đổi mới sản phẩm của chúng ta đã đạt được những cột mốc đáng chú ý trong việc mở rộng hạ tầng điện toán đám mây.",
        startTime: 6.5,
        endTime: 13.5
      },
      {
        id: "s3",
        speaker: "Speaker B",
        text: "That is impressive progress. Could you elaborate on how this impacts our operational budget for Q4?",
        vietnamese: "Đó là tiến độ rất ấn tượng. Anh/chị có thể giải thích thêm điều này ảnh hưởng thế nào tới ngân sách vận hành quý 4 không?",
        startTime: 14.5,
        endTime: 21.0
      },
      {
        id: "s4",
        speaker: "Speaker A",
        text: "By optimizing server utilization and automated load balancing, we reduced operational expenditure by eighteen percent.",
        vietnamese: "Bằng cách tối ưu hóa hiệu suất máy chủ và cân bằng tải tự động, chúng ta đã giảm chi phí vận hành đi mười tám phần trăm.",
        startTime: 22.0,
        endTime: 29.5
      },
      {
        id: "s5",
        speaker: "Speaker B",
        text: "That provides significant financial flexibility to invest more heavily in our artificial intelligence research division.",
        vietnamese: "Điều đó mang lại sự linh hoạt tài chính đáng kể để đầu tư mạnh mẽ hơn vào bộ phận nghiên cứu trí tuệ nhân tạo.",
        startTime: 30.5,
        endTime: 37.5
      },
      {
        id: "s6",
        speaker: "Speaker A",
        text: "Precisely. Our primary objective for the upcoming quarter is to launch our personalized AI learning engine.",
        vietnamese: "Chính xác là như vậy. Mục tiêu hàng đầu của chúng ta trong quý tới là công bố công cụ học tập AI cá nhân hóa.",
        startTime: 38.5,
        endTime: 45.0
      },
      {
        id: "s7",
        speaker: "Speaker B",
        text: "What steps are we taking to guarantee data privacy and compliance with international regulatory standards?",
        vietnamese: "Chúng ta đang thực hiện các bước nào để đảm bảo bảo mật dữ liệu và tuân thủ các tiêu chuẩn quy định quốc tế?",
        startTime: 46.0,
        endTime: 53.0
      },
      {
        id: "s8",
        speaker: "Speaker A",
        text: "We have conducted comprehensive third-party cybersecurity audits and implemented end-to-end encryption protocols.",
        vietnamese: "Chúng ta đã tiến hành đánh giá an ninh mạng độc lập toàn diện và triển khai các giao thức mã hóa đầu-cuối.",
        startTime: 54.0,
        endTime: 61.5
      },
      {
        id: "s9",
        speaker: "Speaker B",
        text: "Excellent. I will coordinate with the legal department to ensure seamless global certification before launch.",
        vietnamese: "Tuyệt vời. Tôi sẽ phối hợp với bộ phận pháp lý để đảm bảo chứng nhận toàn cầu liền mạch trước khi ra mắt.",
        startTime: 62.5,
        endTime: 69.5
      },
      {
        id: "s10",
        speaker: "Speaker A",
        text: "Thank you all for your unwavering dedication. Let us continue setting new benchmarks for industry excellence.",
        vietnamese: "Cảm ơn tất cả các bạn vì sự cống hiến không ngừng nghỉ. Hãy tiếp tục thiết lập những tiêu chuẩn mới cho sự xuất sắc trong ngành.",
        startTime: 70.5,
        endTime: 78.0
      },
      {
        id: "s11",
        speaker: "Speaker B",
        text: "Agreed. Our team is fully aligned and ready to execute this vision flawlessly.",
        vietnamese: "Đồng ý. Đội ngũ của chúng ta hoàn toàn đồng thuận và sẵn sàng thực thi tầm nhìn này một cách hoàn hảo.",
        startTime: 79.0,
        endTime: 85.0
      },
      {
        id: "s12",
        speaker: "Speaker A",
        text: "Let us schedule weekly progress syncs every Tuesday morning to track key performance metrics.",
        vietnamese: "Chúng ta hãy lên lịch họp đồng bộ tiến độ hàng tuần vào mỗi sáng Thứ Ba để theo dõi các chỉ số hiệu suất chính.",
        startTime: 86.0,
        endTime: 92.5
      },
      {
        id: "s13",
        speaker: "Speaker B",
        text: "I will distribute the agenda and updated dashboard metrics to all regional leads by tomorrow afternoon.",
        vietnamese: "Tôi sẽ gửi chương trình cuộc họp và các chỉ số bảng điều khiển cập nhật cho tất cả trưởng bộ phận khu vực vào chiều mai.",
        startTime: 93.5,
        endTime: 100.0
      },
      {
        id: "s14",
        speaker: "Speaker A",
        text: "Perfect. Meeting adjourned. Have a productive week everyone!",
        vietnamese: "Hoàn hảo. Cuộc họp kết thúc. Chúc mọi người có một tuần làm việc hiệu quả!",
        startTime: 101.0,
        endTime: 106.0
      }
    ],
    quizList: [
      {
        question: "By how much did operational expenditure decrease?",
        options: ["10%", "15%", "18%", "25%"],
        correctIndex: 2,
        explanation: "Speaker A confirms expenditure was reduced by 18% through automated load balancing."
      }
    ]
  },
  {
    id: "shadow_ext_003",
    title: "Hospital Emergency Admission & Clinical Triage",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    level: "Intermediate",
    duration: "2:50",
    category: "Healthcare & Medicine",
    tags: ["Medical", "Hospital", "Triage", "Doctor-Patient"],
    vocabularyList: [
      { word: "triage", ipa: "/ˈtriː.ɑːʒ/", pos: "n", vietnamese: "sự phân loại bệnh nhân cấp cứu", example: "The triage nurse evaluated patient vitals immediately." },
      { word: "respiratory", ipa: "/ˈres.pə.rə.tɔːr.i/", pos: "adj", vietnamese: "thuộc hệ hô hấp", example: "He showed signs of acute respiratory distress." },
      { word: "intravenous", ipa: "/ˌɪn.trəˈviː.nəs/", pos: "adj", vietnamese: "tiêm/truyền tĩnh mạch (IV)", example: "The paramedic administered intravenous fluids." },
      { word: "stabilize", ipa: "/ˈsteɪ.bə.laɪz/", pos: "v", vietnamese: "ổn định chỉ số sinh tồn", example: "Blood pressure began to stabilize after medication." }
    ],
    transcript: [
      {
        id: "s3_1",
        speaker: "Doctor",
        text: "Good evening nurse, what do we have incoming from ambulance bay two?",
        vietnamese: "Chào y tá, chúng ta đang tiếp nhận ca cấp cứu nào từ xe cứu thương số 2 vậy?",
        startTime: 0,
        endTime: 4.5,
        wordTimings: [
          { word: "Good", start: 0, end: 400 },
          { word: "evening", start: 450, end: 900 },
          { word: "nurse,", start: 950, end: 1400 },
          { word: "what", start: 1600, end: 1850 },
          { word: "do", start: 1900, end: 2050 },
          { word: "we", start: 2100, end: 2250 },
          { word: "have", start: 2300, end: 2550 },
          { word: "incoming", start: 2600, end: 3200 },
          { word: "from", start: 3250, end: 3500 },
          { word: "ambulance", start: 3550, end: 4050 },
          { word: "bay", start: 4100, end: 4300 },
          { word: "two?", start: 4350, end: 4800 }
        ]
      },
      {
        id: "s3_2",
        speaker: "Triage Nurse",
        text: "We have a forty-five-year-old male presenting with acute chest discomfort and shortness of breath.",
        vietnamese: "Chúng ta có một bệnh nhân nam 45 tuổi nhập viện với triệu chứng đau tức ngực dữ dội và khó thở.",
        startTime: 5.0,
        endTime: 11.2,
        wordTimings: [
          { word: "We", start: 5000, end: 5200 },
          { word: "have", start: 5250, end: 5450 },
          { word: "a", start: 5500, end: 5600 },
          { word: "forty-five-year-old", start: 5650, end: 6800 },
          { word: "male", start: 6850, end: 7200 },
          { word: "presenting", start: 7300, end: 7900 },
          { word: "with", start: 7950, end: 8150 },
          { word: "acute", start: 8200, end: 8650 },
          { word: "chest", start: 8700, end: 9100 },
          { word: "discomfort", start: 9150, end: 9850 },
          { word: "and", start: 9900, end: 10100 },
          { word: "shortness", start: 10150, end: 10650 },
          { word: "of", start: 10700, end: 10850 },
          { word: "breath.", start: 10900, end: 11400 }
        ]
      },
      {
        id: "s3_3",
        speaker: "Doctor",
        text: "Let's hook him up to the twelve-lead electrocardiogram immediately and start supplemental oxygen.",
        vietnamese: "Hãy kết nối máy đo điện tim 12 chuyển đạo ngay lập tức và cho thở oxy hỗ trợ.",
        startTime: 12.0,
        endTime: 17.8
      },
      {
        id: "s3_4",
        speaker: "Triage Nurse",
        text: "Blood pressure is 150 over 95, heart rate is 110 beats per minute, and oxygen saturation is at 94 percent.",
        vietnamese: "Huyết áp là 150/95, nhịp tim 110 lần/phút, và độ bão hòa oxy SpO2 ở mức 94%.",
        startTime: 18.5,
        endTime: 26.0
      },
      {
        id: "s3_5",
        speaker: "Doctor",
        text: "Understood. Administer three hundred milligrams of chewable aspirin and draw stat cardiac troponin markers.",
        vietnamese: "Rõ rồi. Hãy cho uống 300 miligram aspirin nhai và lấy máu xét nghiệm khẩn cấp chỉ số men tim troponin.",
        startTime: 27.0,
        endTime: 33.5
      }
    ],
    quizList: [
      {
        question: "What diagnostic test does the doctor order immediately upon arrival?",
        options: ["A brain MRI scan", "A 12-lead electrocardiogram (ECG)", "A routine dental examination", "An abdominal ultrasound"],
        correctIndex: 1,
        explanation: "The doctor orders: 'Let's hook him up to the twelve-lead electrocardiogram immediately'."
      }
    ]
  },
  {
    id: "shadow_ext_004",
    title: "Fintech Architecture Design & Microservices Review",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    level: "Hard",
    duration: "3:10",
    category: "Software Engineering & Cloud",
    tags: ["Fintech", "Microservices", "System Design", "Engineering"],
    vocabularyList: [
      { word: "idempotency", ipa: "/ˌaɪ.dəmˈpoʊ.tən.si/", pos: "n", vietnamese: "tính lũy thỏa (xử lý nhiều lần không đổi kết quả)", example: "Payment APIs must ensure absolute idempotency." },
      { word: "throughput", ipa: "/ˈθruː.pʊt/", pos: "n", vietnamese: "thông lượng xử lý dữ liệu", example: "The database handles high throughput during market open." },
      { word: "sharding", ipa: "/ˈʃɑːr.dɪŋ/", pos: "n", vietnamese: "phân vùng cơ sở dữ liệu ngang", example: "Database sharding prevented server memory bottlenecks." },
      { word: "resiliency", ipa: "/rɪˈzɪl.jən.si/", pos: "n", vietnamese: "khả năng phục hồi hệ thống khi có lỗi", example: "Multi-region replication maximizes system resiliency." }
    ],
    transcript: [
      {
        id: "s4_1",
        speaker: "Chief Architect",
        text: "Thanks for joining the technical architecture review for our distributed payment processing gateway.",
        vietnamese: "Cảm ơn các bạn đã tham gia buổi đánh giá kiến trúc kỹ thuật cho cổng thanh toán phân tán của chúng ta.",
        startTime: 0,
        endTime: 5.8
      },
      {
        id: "s4_2",
        speaker: "Lead Backend Engineer",
        text: "We have finalized the event-driven pub-sub pipeline using Apache Kafka for high-throughput order ingestion.",
        vietnamese: "Chúng tôi đã hoàn thiện luồng xử lý pub-sub hướng sự kiện sử dụng Apache Kafka để nạp đơn hàng với thông lượng cao.",
        startTime: 6.5,
        endTime: 13.0
      },
      {
        id: "s4_3",
        speaker: "Chief Architect",
        text: "How are we guaranteeing payment idempotency in case network timeouts trigger client-side retries?",
        vietnamese: "Chúng ta đang đảm bảo tính lũy thỏa thanh toán như thế nào nếu trường hợp nghẽn mạng gây ra yêu cầu gửi lại từ phía client?",
        startTime: 14.0,
        endTime: 20.2
      },
      {
        id: "s4_4",
        speaker: "Lead Backend Engineer",
        text: "Each transaction payload includes a unique cryptographic idempotency key stored in distributed Redis cache with a twenty-four-hour TTL.",
        vietnamese: "Mỗi gói dữ liệu giao dịch đều chứa một khóa lũy thỏa mã hóa duy nhất được lưu trong bộ đệm Redis phân tán với thời gian sống 24 giờ.",
        startTime: 21.0,
        endTime: 29.5
      },
      {
        id: "s4_5",
        speaker: "Chief Architect",
        text: "Excellent design. That completely eliminates the risk of double-charging users during gateway retries.",
        vietnamese: "Thiết kế xuất sắc. Điều đó triệt tiêu hoàn toàn nguy cơ trừ tiền hai lần của người dùng trong các lần thử lại cổng thanh toán.",
        startTime: 30.5,
        endTime: 36.8
      }
    ],
    quizList: [
      {
        question: "How does the backend team prevent double-charging during network retries?",
        options: [
          "By shutting down the servers every hour",
          "By using unique cryptographic idempotency keys cached in distributed Redis",
          "By asking customers to write paper receipts",
          "By limiting transactions to once a week"
        ],
        correctIndex: 1,
        explanation: "The lead engineer states: 'Each transaction payload includes a unique cryptographic idempotency key stored in distributed Redis cache'."
      }
    ]
  },
  {
    id: "shadow_ext_005",
    title: "Five-Star Luxury Hotel Concierge & Fine Dining Booking",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    level: "Intermediate",
    duration: "2:40",
    category: "Hospitality & Travel",
    tags: ["Concierge", "Hotel", "Luxury", "Customer Service"],
    vocabularyList: [
      { word: "concierge", ipa: "/koʊn.siˈerʒ/", pos: "n", vietnamese: "nhân viên hỗ trợ khách hàng cao cấp", example: "The concierge secured hard-to-get opera tickets." },
      { word: "itinerary", ipa: "/aɪˈtɪn.ə.rer.i/", pos: "n", vietnamese: "lịch trình chuyến đi", example: "We customized an exclusive sightseeing itinerary." },
      { word: "reservation", ipa: "/ˌrez.ɚˈveɪ.ʃən/", pos: "n", vietnamese: "sự đặt chỗ trước", example: "A confirmed dinner reservation at a Michelin restaurant." },
      { word: "chauffeur", ipa: "/ʃoʊˈfɝː/", pos: "n", vietnamese: "tài xế xe riêng cao cấp", example: "A private chauffeur will wait outside the lobby." }
    ],
    transcript: [
      {
        id: "s5_1",
        speaker: "Concierge",
        text: "Good morning Mr. Henderson, welcome back to the Grand Regency. How may the concierge team assist you today?",
        vietnamese: "Chào buổi sáng ông Henderson, chào mừng ông quay trở lại Grand Regency. Đội ngũ lễ tân có thể hỗ trợ gì cho ông hôm nay?",
        startTime: 0,
        endTime: 6.2
      },
      {
        id: "s5_2",
        speaker: "Guest",
        text: "Good morning Julian. My wife and I are celebrating our wedding anniversary tonight. We would love a table at a premier seafood restaurant.",
        vietnamese: "Chào Julian. Tối nay vợ chồng tôi kỷ niệm ngày cưới. Chúng tôi muốn đặt một bàn tại một nhà hàng hải sản cao cấp hàng đầu.",
        startTime: 7.0,
        endTime: 15.0
      },
      {
        id: "s5_3",
        speaker: "Concierge",
        text: "Warmest congratulations! I would highly recommend Le Dauphin overlooking the harbor. I can reserve the private terrace table at eight o'clock.",
        vietnamese: "Xin gửi lời chúc mừng nồng nhiệt nhất tới ông bà! Tôi xin đặc biệt giới thiệu nhà hàng Le Dauphin nhìn ra cảng. Tôi có thể giữ bàn sân thượng riêng vào lúc 8 giờ tối.",
        startTime: 16.0,
        endTime: 23.5
      },
      {
        id: "s5_4",
        speaker: "Guest",
        text: "That sounds enchanting. Could you also arrange private chauffeur transportation from the hotel lobby at seven-thirty?",
        vietnamese: "Nghe thật tuyệt vời. Bạn có thể sắp xếp xe riêng đón từ sảnh khách sạn lúc 7 giờ 30 luôn được không?",
        startTime: 24.5,
        endTime: 31.0
      },
      {
        id: "s5_5",
        speaker: "Concierge",
        text: "Consider it done, sir. A black Mercedes S-Class will be waiting for you. I will personally notify the executive chef of your celebration.",
        vietnamese: "Mọi việc đã được sắp xếp chu đáo thưa ông. Một chiếc Mercedes S-Class màu đen sẽ đợi sẵn. Tôi sẽ đích thân thông báo cho bếp trưởng về ngày kỷ niệm của quý khách.",
        startTime: 32.0,
        endTime: 39.5
      }
    ],
    quizList: [
      {
        question: "What special occasion is the hotel guest celebrating?",
        options: ["A college graduation", "A wedding anniversary", "A corporate retirement", "A real estate purchase"],
        correctIndex: 1,
        explanation: "The guest mentions: 'My wife and I are celebrating our wedding anniversary tonight'."
      }
    ]
  },
  {
    id: "shadow_ext_006",
    title: "University Thesis Advisory & Research Methodology Defense",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    level: "Hard",
    duration: "3:00",
    category: "Academic & Higher Education",
    tags: ["Thesis", "University", "Professor", "Methodology"],
    vocabularyList: [
      { word: "methodology", ipa: "/ˌmeθ.əˈdɑː.lə.dʒi/", pos: "n", vietnamese: "phương pháp luận nghiên cứu", example: "The qualitative research methodology was rigorous." },
      { word: "statistical", ipa: "/stəˈtɪs.tɪ.kəl/", pos: "adj", vietnamese: "thuộc về thống kê học", example: "The findings achieved high statistical significance." },
      { word: "dissertation", ipa: "/ˌdɪs.ɚˈteɪ.ʃən/", pos: "n", vietnamese: "luận văn tiến sĩ / thạc sĩ", example: "She defended her doctoral dissertation with distinction." },
      { word: "variable", ipa: "/ˈver.i.ə.bəl/", pos: "n", vietnamese: "biến số trong mô hình nghiên cứu", example: "Income was treated as an independent variable." }
    ],
    transcript: [
      {
        id: "s6_1",
        speaker: "Professor",
        text: "Please come in, Marcus. I have thoroughly reviewed the preliminary draft of your master's dissertation on renewable energy microgrids.",
        vietnamese: "Mời em vào, Marcus. Thầy đã đọc kỹ bản thảo sơ bộ luận văn thạc sĩ của em về lưới điện vi mô năng lượng tái tạo.",
        startTime: 0,
        endTime: 7.0
      },
      {
        id: "s6_2",
        speaker: "Student",
        text: "Thank you for taking the time to review it, Professor Higgins. I was slightly anxious about the statistical validation section.",
        vietnamese: "Em cảm ơn thầy đã dành thời gian đọc ạ, thưa Giáo sư Higgins. Em có chút lo lắng về phần kiểm định thống kê.",
        startTime: 8.0,
        endTime: 14.5
      },
      {
        id: "s6_3",
        speaker: "Professor",
        text: "Your regression analysis is methodologically sound, but I suggest expanding your sample size to encompass rural decentralized installations.",
        vietnamese: "Phân tích hồi quy của em rất vững về mặt phương pháp luận, nhưng thầy khuyên em nên mở rộng cỡ mẫu để bao quát cả các hệ thống lắp đặt phân tán ở nông thôn.",
        startTime: 15.5,
        endTime: 23.5
      },
      {
        id: "s6_4",
        speaker: "Student",
        text: "That makes total sense. I can incorporate dataset telemetry from the Northern Regional cooperative over the past three quarters.",
        vietnamese: "Điều đó rất hợp lý ạ. Em có thể bổ sung dữ liệu đo từ xa từ hợp tác xã khu vực phía Bắc trong 3 quý vừa qua.",
        startTime: 24.5,
        endTime: 31.8
      },
      {
        id: "s6_5",
        speaker: "Professor",
        text: "Excellent. With that empirical enhancement, your research will be in prime condition for the departmental oral defense in November.",
        vietnamese: "Rất tốt. Với sự bổ sung thực nghiệm đó, công trình của em sẽ ở điều kiện tối ưu cho buổi bảo vệ miệng cấp khoa vào tháng 11.",
        startTime: 33.0,
        endTime: 40.5
      }
    ],
    quizList: [
      {
        question: "What enhancement does Professor Higgins recommend for the student's dissertation?",
        options: [
          "Deleting the entire literature review",
          "Expanding the sample size to encompass rural decentralized installations",
          "Translating the paper into Latin",
          "Using only fictional case studies"
        ],
        correctIndex: 1,
        explanation: "The professor advises: 'I suggest expanding your sample size to encompass rural decentralized installations'."
      }
    ]
  },
  {
    id: "shadow_ext_007",
    title: "Global Maritime Supply Chain Disruption Meeting",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    level: "Advanced",
    duration: "0:44",
    category: "Logistics & Trade",
    tags: ["Supply Chain", "Maritime", "Logistics", "IELTS Band 8"],
    vocabularyList: [
      { word: "chokepoint", ipa: "/ˈtʃoʊk.pɔɪnt/", pos: "n", vietnamese: "điểm nghẽn giao thông chiến lược", example: "The canal acts as a critical chokepoint for crude oil transport." },
      { word: "demurrage", ipa: "/dɪˈmɝː.ɪdʒ/", pos: "n", vietnamese: "phí phạt lưu kho bãi / giữ tàu quá hạn", example: "Shipping delays resulted in exorbitant container demurrage charges." },
      { word: "reroute", ipa: "/ˌriːˈruːt/", pos: "v", vietnamese: "chuyển hướng hành trình", example: "Freighters had to reroute around the Cape of Good Hope." },
      { word: "contingency", ipa: "/kənˈtɪn.dʒən.si/", pos: "n", vietnamese: "phương án xử lý khẩn cấp", example: "We activated our emergency supply contingency protocol." }
    ],
    transcript: [
      {
        id: "s7_1",
        speaker: "Logistics Director",
        text: "Geopolitical tensions have shut down maritime transit through the primary canal chokepoint.",
        vietnamese: "Căng thẳng địa chính trị đã làm đình trệ toàn bộ tuyến vận tải hàng hải qua điểm nghẽn kênh đào huyết mạch.",
        startTime: 0,
        endTime: 7.5,
        wordTimings: [
          { word: "Geopolitical", start: 0, end: 1100 },
          { word: "tensions", start: 1150, end: 1750 },
          { word: "have", start: 1800, end: 2000 },
          { word: "shut", start: 2050, end: 2350 },
          { word: "down", start: 2400, end: 2700 },
          { word: "maritime", start: 2750, end: 3400 },
          { word: "transit", start: 3450, end: 4100 },
          { word: "through", start: 4150, end: 4450 },
          { word: "the", start: 4500, end: 4650 },
          { word: "primary", start: 4700, end: 5300 },
          { word: "canal", start: 5350, end: 5850 },
          { word: "chokepoint.", start: 5900, end: 7200 }
        ]
      },
      {
        id: "s7_2",
        speaker: "Operations Chief",
        text: "How severely will this reroute impact our quarterly transit schedules and fuel surcharges?",
        vietnamese: "Việc chuyển hướng tuyến đường này sẽ tác động nặng nề thế nào đến lịch trình quý và phụ phí nhiên liệu của chúng ta?",
        startTime: 8.5,
        endTime: 14.5
      },
      {
        id: "s7_3",
        speaker: "Logistics Director",
        text: "Vessels circumnavigating the southern cape will add fourteen transit days and incur steep demurrage penalties.",
        vietnamese: "Các tàu đi vòng qua mũi phía nam sẽ mất thêm 14 ngày hải trình và chịu các khoản phạt lưu bãi rất đắt đỏ.",
        startTime: 15.5,
        endTime: 24.0
      },
      {
        id: "s7_4",
        speaker: "Operations Chief",
        text: "We must immediately trigger multi-modal air freight contingencies for priority semiconductor consignments.",
        vietnamese: "Chúng ta phải lập tức kích hoạt phương án vận tải hàng không đa phương thức khẩn cấp cho các lô hàng bán dẫn ưu tiên.",
        startTime: 25.0,
        endTime: 32.5
      },
      {
        id: "s7_5",
        speaker: "Logistics Director",
        text: "Agreed. I will brief the supply chain committee and coordinate with our freight forwarders.",
        vietnamese: "Nhất trí. Tôi sẽ báo cáo nhanh với ban chuỗi cung ứng và điều phối cùng các đại lý giao nhận vận tải.",
        startTime: 33.5,
        endTime: 40.0
      }
    ],
    quizList: [
      {
        question: "Why are shipping vessels being rerouted around the southern cape?",
        options: [
          "To test new engine fuel efficiency",
          "Because geopolitical tensions closed the primary canal chokepoint",
          "To avoid routine harbor inspections",
          "Because all crew members requested a longer voyage"
        ],
        correctIndex: 1,
        explanation: "The Logistics Director states that geopolitical tensions shut down maritime transit through the primary canal chokepoint."
      }
    ]
  },
  {
    id: "shadow_ext_008",
    title: "Silicon Valley Venture Capital Term Sheet Negotiation",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    level: "Advanced",
    duration: "0:42",
    category: "Startups & Investment",
    tags: ["Venture Capital", "Term Sheet", "Startups", "Negotiation"],
    vocabularyList: [
      { word: "liquidation preference", ipa: "/ˌlɪk.wəˈdeɪ.ʃən ˈpref.ər.əns/", pos: "n", vietnamese: "quyền ưu tiên thanh lý tài sản", example: "Investors asked for a 2x participating liquidation preference." },
      { word: "pro-rata", ipa: "/ˌproʊ ˈrɑː.t̬ə/", pos: "adj", vietnamese: "quyền góp vốn theo tỷ lệ sở hữu", example: "The fund exercised its pro-rata right in the subsequent round." },
      { word: "dilution", ipa: "/daɪˈluː.ʃən/", pos: "n", vietnamese: "sự pha loãng cổ phần", example: "Founders sought to minimize unnecessary equity dilution." },
      { word: "valuation", ipa: "/ˌvæl.juˈeɪ.ʃən/", pos: "n", vietnamese: "định giá doanh nghiệp", example: "The firm achieved a $30M post-money valuation." }
    ],
    transcript: [
      {
        id: "s8_1",
        speaker: "Lead Investor",
        text: "We are prepared to issue a five million dollar Series A term sheet at a thirty million post-money valuation.",
        vietnamese: "Chúng tôi đã sẵn sàng phát hành bản điều khoản đầu tư Series A trị giá 5 triệu đô la với định giá sau gọi vốn là 30 triệu đô la.",
        startTime: 0,
        endTime: 8.0,
        wordTimings: [
          { word: "We", start: 0, end: 200 },
          { word: "are", start: 250, end: 450 },
          { word: "prepared", start: 500, end: 1100 },
          { word: "to", start: 1150, end: 1300 },
          { word: "issue", start: 1350, end: 1750 },
          { word: "a", start: 1800, end: 1900 },
          { word: "five", start: 1950, end: 2350 },
          { word: "million", start: 2400, end: 2850 },
          { word: "dollar", start: 2900, end: 3350 },
          { word: "Series", start: 3400, end: 3900 },
          { word: "A", start: 3950, end: 4200 },
          { word: "term", start: 4250, end: 4600 },
          { word: "sheet.", start: 4650, end: 5300 }
        ]
      },
      {
        id: "s8_2",
        speaker: "Startup Founder",
        text: "We appreciate the strong endorsement, though we have reservations regarding the two-times participating liquidation preference.",
        vietnamese: "Chúng tôi rất trân trọng sự ủng hộ mạnh mẽ của các bạn, dù chúng tôi còn e ngại về điều khoản ưu tiên thanh lý gấp 2 lần có chia lợi nhuận bổ sung.",
        startTime: 9.0,
        endTime: 17.5
      },
      {
        id: "s8_3",
        speaker: "Lead Investor",
        text: "Our partners consider that downside protection standard, alongside guaranteed pro-rata follow-on rights.",
        vietnamese: "Các đối tác của chúng tôi coi đó là điều khoản bảo vệ rủi ro tiêu chuẩn, song hành với quyền ưu tiên góp vốn theo tỷ lệ vòng sau.",
        startTime: 18.5,
        endTime: 25.5
      },
      {
        id: "s8_4",
        speaker: "Startup Founder",
        text: "We can concede on pro-rata participation if you adjust to a non-participating single-multiple liquidation preference.",
        vietnamese: "Chúng tôi có thể đồng ý quyền góp vốn pro-rata nếu bên bạn điều chỉnh về mức thanh lý ưu tiên 1x không kèm chia thêm lợi nhuận.",
        startTime: 26.5,
        endTime: 34.0
      },
      {
        id: "s8_5",
        speaker: "Lead Investor",
        text: "That sounds like an equitable compromise. Let's formalize the draft agreement with counsel.",
        vietnamese: "Đó là một sự thỏa hiệp công bằng và hợp lý. Chúng ta hãy cùng luật sư chính thức hóa bản thảo thỏa thuận nhé.",
        startTime: 35.0,
        endTime: 41.5
      }
    ],
    quizList: [
      {
        question: "What compromise does the startup founder propose regarding the liquidation preference?",
        options: [
          "Demanding a 10x liquidation preference",
          "Conceding on pro-rata rights in exchange for a non-participating 1x preference",
          "Refusing all venture capital investment completely",
          "Selling the entire company for cash immediately"
        ],
        correctIndex: 1,
        explanation: "The founder proposes: 'We can concede on pro-rata participation if you adjust to a non-participating single-multiple liquidation preference'."
      }
    ]
  }
];

