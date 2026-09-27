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
  "id": "shadow_ext_003",
  "title": "Hospital Emergency Admission & Clinical Triage",
  "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "level": "Intermediate",
  "duration": "3:15",
  "category": "Healthcare & Medicine",
  "tags": [
    "Medical",
    "Hospital",
    "Triage",
    "Doctor-Patient"
  ],
  "vocabularyList": [
    {
      "word": "triage",
      "ipa": "/ˈtriː.ɑːʒ/",
      "pos": "n",
      "vietnamese": "sự phân loại bệnh nhân cấp cứu",
      "example": "The triage nurse evaluated patient vitals immediately."
    },
    {
      "word": "respiratory",
      "ipa": "/ˈres.pə.rə.tɔːr.i/",
      "pos": "adj",
      "vietnamese": "thuộc hệ hô hấp",
      "example": "He showed signs of acute respiratory distress."
    },
    {
      "word": "intravenous",
      "ipa": "/ˌɪn.trəˈviː.nəs/",
      "pos": "adj",
      "vietnamese": "tiêm/truyền tĩnh mạch (IV)",
      "example": "The paramedic administered intravenous fluids."
    },
    {
      "word": "stabilize",
      "ipa": "/ˈsteɪ.bə.laɪz/",
      "pos": "v",
      "vietnamese": "ổn định chỉ số sinh tồn",
      "example": "Blood pressure began to stabilize after medication."
    },
    {
      "word": "infarction",
      "ipa": "/ɪnˈfɑːrk.ʃən/",
      "pos": "n",
      "vietnamese": "sự nhồi máu",
      "example": "The ECG confirmed an acute myocardial infarction."
    }
  ],
  "transcript": [
    {
      "id": "s3_1",
      "speaker": "Doctor",
      "text": "Good evening nurse, what do we have incoming from ambulance bay two?",
      "vietnamese": "Chào y tá, chúng ta đang tiếp nhận ca cấp cứu nào từ xe cứu thương số 2 vậy?",
      "startTime": 0,
      "endTime": 4.5
    },
    {
      "id": "s3_2",
      "speaker": "Triage Nurse",
      "text": "We have a forty-five-year-old male presenting with acute chest discomfort and shortness of breath.",
      "vietnamese": "Chúng ta có một bệnh nhân nam 45 tuổi nhập viện với triệu chứng đau tức ngực dữ dội và khó thở.",
      "startTime": 5,
      "endTime": 11.2
    },
    {
      "id": "s3_3",
      "speaker": "Doctor",
      "text": "Let's hook him up to the twelve-lead electrocardiogram immediately and start supplemental oxygen.",
      "vietnamese": "Hãy kết nối máy đo điện tim 12 chuyển đạo ngay lập tức và cho thở oxy hỗ trợ.",
      "startTime": 12,
      "endTime": 17.8
    },
    {
      "id": "s3_4",
      "speaker": "Triage Nurse",
      "text": "Blood pressure is 150 over 95, heart rate is 110 beats per minute, and oxygen saturation is at 94 percent.",
      "vietnamese": "Huyết áp là 150/95, nhịp tim 110 lần/phút, và độ bão hòa oxy SpO2 ở mức 94%.",
      "startTime": 18.5,
      "endTime": 26
    },
    {
      "id": "s3_5",
      "speaker": "Doctor",
      "text": "Understood. Administer three hundred milligrams of chewable aspirin and draw stat cardiac troponin markers.",
      "vietnamese": "Rõ rồi. Hãy cho uống 300 miligram aspirin nhai và lấy máu xét nghiệm khẩn cấp chỉ số men tim troponin.",
      "startTime": 27,
      "endTime": 33.5
    },
    {
      "id": "s3_6",
      "speaker": "Doctor",
      "text": "The twelve-lead ECG tracing reveals ST-segment elevation in leads V2 through V5, confirming an acute anterior myocardial infarction.",
      "vietnamese": "Bản ghi điện tim 12 chuyển đạo cho thấy đoạn ST chênh lên ở các chuyển đạo V2 đến V5, xác nhận nhồi máu cơ tim cấp thành trước.",
      "startTime": 34.5,
      "endTime": 42.8
    },
    {
      "id": "s3_7",
      "speaker": "Triage Nurse",
      "text": "Should I activate our cardiac catheterization lab team immediately for emergency percutaneous coronary intervention?",
      "vietnamese": "Tôi có nên kích hoạt ngay kíp can thiệp tim mạch khẩn cấp để chuẩn bị can thiệp mạch vành qua da không?",
      "startTime": 43.5,
      "endTime": 50.5
    },
    {
      "id": "s3_8",
      "speaker": "Doctor",
      "text": "Yes, trigger Code STEMI without delay because our door-to-balloon benchmark is strictly under sixty minutes.",
      "vietnamese": "Đúng vậy, kích hoạt mã Code STEMI ngay không chậm trễ vì mục tiêu thời gian từ cửa đến nong bóng của chúng ta là dưới 60 phút.",
      "startTime": 51.5,
      "endTime": 58.5
    },
    {
      "id": "s3_9",
      "speaker": "Paramedic",
      "text": "Doctor, his family confirms he has no history of intracranial bleeding or bleeding diathesis, but has hypertension.",
      "vietnamese": "Thưa bác sĩ, gia đình xác nhận anh ấy không có tiền sử chảy máu nội sọ hay rối loạn đông máu, nhưng bị cao huyết áp.",
      "startTime": 59.5,
      "endTime": 67.2
    },
    {
      "id": "s3_10",
      "speaker": "Doctor",
      "text": "That verifies eligibility for dual antiplatelet therapy; let's load him with ticagrelor alongside intravenous unfractionated heparin.",
      "vietnamese": "Thông tin đó xác nhận đủ điều kiện dùng kháng tiểu cầu kép; hãy cho dùng liều nạp ticagrelor kết hợp với heparin không phân đoạn.",
      "startTime": 68,
      "endTime": 76.5
    },
    {
      "id": "s3_11",
      "speaker": "Triage Nurse",
      "text": "Two wide-bore peripheral intravenous lines are functioning, and the patient reports chest pressure decreasing to four over ten.",
      "vietnamese": "Hai đường truyền tĩnh mạch ngoại vi kim lớn đang hoạt động tốt, và bệnh nhân báo cơn đau ngực đã giảm xuống mức 4/10.",
      "startTime": 77.5,
      "endTime": 85
    },
    {
      "id": "s3_12",
      "speaker": "Doctor",
      "text": "Keep monitoring continuous telemetry rhythms and place external defibrillator pads in case malignant ventricular arrhythmias manifest.",
      "vietnamese": "Tiếp tục theo dõi nhịp điện tim liên tục và dán sẵn miếng dán máy phá rung đề phòng trường hợp xuất hiện loạn nhịp thất nguy hiểm.",
      "startTime": 86,
      "endTime": 94.2
    },
    {
      "id": "s3_13",
      "speaker": "Triage Nurse",
      "text": "The catheterization surgical suite on the third floor is prepped, and the transport gurney is rolling out now.",
      "vietnamese": "Phòng phẫu thuật can thiệp tim mạch ở tầng ba đã sẵn sàng, và cáng vận chuyển đang được đẩy đi ngay bây giờ.",
      "startTime": 95,
      "endTime": 102
    },
    {
      "id": "s3_14",
      "speaker": "Doctor",
      "text": "Outstanding teamwork everyone; rapid clinical triage and protocol compliance are decisive in saving cardiac muscle tissue.",
      "vietnamese": "Tinh thần đồng đội xuất sắc lắm mọi người; phân loại lâm sàng nhanh và tuân thủ phác đồ chính là yếu tố quyết định cứu sống cơ tim.",
      "startTime": 103,
      "endTime": 110.5
    }
  ],
  "quizList": [
    {
      "question": "What diagnostic test does the doctor order immediately upon arrival?",
      "options": [
        "A brain MRI scan",
        "A 12-lead electrocardiogram (ECG)",
        "A routine dental examination",
        "An abdominal ultrasound"
      ],
      "correctIndex": 1,
      "explanation": "The doctor orders: 'Let's hook him up to the twelve-lead electrocardiogram immediately'."
    }
  ]
},
  {
  "id": "shadow_ext_004",
  "title": "Fintech Architecture Design & Microservices Review",
  "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "level": "Hard",
  "duration": "3:30",
  "category": "Software Engineering & Cloud",
  "tags": [
    "Fintech",
    "Microservices",
    "System Design",
    "Engineering"
  ],
  "vocabularyList": [
    {
      "word": "idempotency",
      "ipa": "/ˌaɪ.dəmˈpoʊ.tən.si/",
      "pos": "n",
      "vietnamese": "tính lũy thỏa (xử lý nhiều lần không đổi kết quả)",
      "example": "Payment APIs must ensure absolute idempotency."
    },
    {
      "word": "throughput",
      "ipa": "/ˈθruː.pʊt/",
      "pos": "n",
      "vietnamese": "thông lượng xử lý dữ liệu",
      "example": "The database handles high throughput during market open."
    },
    {
      "word": "sharding",
      "ipa": "/ˈʃɑːr.dɪŋ/",
      "pos": "n",
      "vietnamese": "phân vùng cơ sở dữ liệu ngang",
      "example": "Database sharding prevented server memory bottlenecks."
    },
    {
      "word": "resiliency",
      "ipa": "/rɪˈzɪl.jən.si/",
      "pos": "n",
      "vietnamese": "khả năng phục hồi hệ thống khi có lỗi",
      "example": "Multi-region replication maximizes system resiliency."
    }
  ],
  "transcript": [
    {
      "id": "s4_1",
      "speaker": "Chief Architect",
      "text": "Thanks for joining the technical architecture review for our distributed payment processing gateway.",
      "vietnamese": "Cảm ơn các bạn đã tham gia buổi đánh giá kiến trúc kỹ thuật cho cổng thanh toán phân tán của chúng ta.",
      "startTime": 0,
      "endTime": 5.8
    },
    {
      "id": "s4_2",
      "speaker": "Lead Backend Engineer",
      "text": "We have finalized the event-driven pub-sub pipeline using Apache Kafka for high-throughput order ingestion.",
      "vietnamese": "Chúng tôi đã hoàn thiện luồng xử lý pub-sub hướng sự kiện sử dụng Apache Kafka để nạp đơn hàng với thông lượng cao.",
      "startTime": 6.5,
      "endTime": 13
    },
    {
      "id": "s4_3",
      "speaker": "Chief Architect",
      "text": "How are we guaranteeing payment idempotency in case network timeouts trigger client-side retries?",
      "vietnamese": "Chúng ta đang đảm bảo tính lũy thỏa thanh toán như thế nào nếu trường hợp nghẽn mạng gây ra yêu cầu gửi lại từ phía client?",
      "startTime": 14,
      "endTime": 20.2
    },
    {
      "id": "s4_4",
      "speaker": "Lead Backend Engineer",
      "text": "Each transaction payload includes a unique cryptographic idempotency key stored in distributed Redis cache with a twenty-four-hour TTL.",
      "vietnamese": "Mỗi gói dữ liệu giao dịch đều chứa một khóa lũy thỏa mã hóa duy nhất được lưu trong bộ đệm Redis phân tán với thời gian sống 24 giờ.",
      "startTime": 21,
      "endTime": 29.5
    },
    {
      "id": "s4_5",
      "speaker": "Chief Architect",
      "text": "Excellent design. That completely eliminates the risk of double-charging users during gateway retries.",
      "vietnamese": "Thiết kế xuất sắc. Điều đó triệt tiêu hoàn toàn nguy cơ trừ tiền hai lần của người dùng trong các lần thử lại cổng thanh toán.",
      "startTime": 30.5,
      "endTime": 36.8
    },
    {
      "id": "s4_6",
      "speaker": "Lead Backend Engineer",
      "text": "For managing multi-service workflows, we implemented the Saga pattern with event choreography instead of heavy two-phase locking.",
      "vietnamese": "Để quản lý quy trình nhiều dịch vụ, chúng tôi đã triển khai mô hình Saga phối hợp sự kiện thay vì khóa cam kết hai pha nặng nề.",
      "startTime": 37.5,
      "endTime": 45.2
    },
    {
      "id": "s4_7",
      "speaker": "Chief Architect",
      "text": "How does the payment orchestrator behave when an downstream ledger reconciliation service reports a transient database failure?",
      "vietnamese": "Hệ thống điều phối thanh toán sẽ phản ứng thế nào khi dịch vụ đối soát sổ cái phía sau báo lỗi cơ sở dữ liệu tạm thời?",
      "startTime": 46,
      "endTime": 53.5
    },
    {
      "id": "s4_8",
      "speaker": "Lead Backend Engineer",
      "text": "It routes the payload to an exponential backoff dead-letter queue while publishing a compensating reversal event.",
      "vietnamese": "Nó sẽ chuyển gói tin vào hàng đợi dead-letter với độ lùi hàm mũ đồng thời phát ra một sự kiện bồi hoàn đảo ngược.",
      "startTime": 54.5,
      "endTime": 62
    },
    {
      "id": "s4_9",
      "speaker": "DevOps Lead",
      "text": "Our stress test simulated sixty thousand concurrent transactions per second across four availability zones without memory degradation.",
      "vietnamese": "Bài kiểm tra tải nặng của chúng tôi đã mô phỏng 60.000 giao dịch đồng thời mỗi giây trên 4 vùng sẵn sàng mà không bị suy giảm bộ nhớ.",
      "startTime": 63,
      "endTime": 71.2
    },
    {
      "id": "s4_10",
      "speaker": "Chief Architect",
      "text": "What does our percentile ninety-nine latency look like when database connections experience elevated concurrency?",
      "vietnamese": "Độ trễ phân vị p99 của chúng ta trông như thế nào khi các kết nối cơ sở dữ liệu gặp phải mức độ đồng thời cao?",
      "startTime": 72,
      "endTime": 78.5
    },
    {
      "id": "s4_11",
      "speaker": "DevOps Lead",
      "text": "Thanks to connection pooling and read replicas, our p99 response duration consistently remains under eighty-five milliseconds.",
      "vietnamese": "Nhờ cơ chế connection pooling và bản sao chỉ đọc read replicas, thời gian phản hồi p99 luôn duy trì dưới 85 mili giây.",
      "startTime": 79.5,
      "endTime": 87.5
    },
    {
      "id": "s4_12",
      "speaker": "Security Lead",
      "text": "All customer cardholder data is tokenized using AES-256 GCM with keys managed in our dedicated cloud HSM enclave.",
      "vietnamese": "Toàn bộ dữ liệu chủ thẻ của khách hàng được mã hóa token bằng AES-256 GCM với các khóa bảo mật được quản lý trong enclave HSM đám mây chuyên biệt.",
      "startTime": 88.5,
      "endTime": 96.8
    },
    {
      "id": "s4_13",
      "speaker": "Chief Architect",
      "text": "This satisfies our stringent requirements for Level-One Payment Card Industry Data Security Standard certification.",
      "vietnamese": "Điều này đáp ứng các yêu cầu khắt khe của chúng ta cho chứng nhận Tiêu chuẩn bảo mật dữ liệu thẻ thanh toán cấp độ một PCI DSS.",
      "startTime": 97.5,
      "endTime": 104.8
    },
    {
      "id": "s4_14",
      "speaker": "Lead Backend Engineer",
      "text": "We are greenlit to proceed with the canary deployment rollout on production clusters this coming Sunday evening.",
      "vietnamese": "Chúng ta đã được bật đèn xanh để tiến hành triển khai thử nghiệm canary trên các cụm máy chủ production vào tối Chủ nhật tới.",
      "startTime": 105.5,
      "endTime": 112.5
    }
  ],
  "quizList": [
    {
      "question": "How does the backend team prevent double-charging during network retries?",
      "options": [
        "By shutting down the servers every hour",
        "By using unique cryptographic idempotency keys cached in distributed Redis",
        "By asking customers to write paper receipts",
        "By limiting transactions to once a week"
      ],
      "correctIndex": 1,
      "explanation": "The lead engineer states: 'Each transaction payload includes a unique cryptographic idempotency key stored in distributed Redis cache'."
    }
  ]
},
  {
  "id": "shadow_ext_005",
  "title": "Five-Star Luxury Hotel Concierge & Fine Dining Booking",
  "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "level": "Intermediate",
  "duration": "3:10",
  "category": "Hospitality & Travel",
  "tags": [
    "Concierge",
    "Hotel",
    "Luxury",
    "Customer Service"
  ],
  "vocabularyList": [
    {
      "word": "concierge",
      "ipa": "/koʊn.siˈerʒ/",
      "pos": "n",
      "vietnamese": "nhân viên hỗ trợ khách hàng cao cấp",
      "example": "The concierge secured hard-to-get opera tickets."
    },
    {
      "word": "itinerary",
      "ipa": "/aɪˈtɪn.ə.rer.i/",
      "pos": "n",
      "vietnamese": "lịch trình chuyến đi",
      "example": "We customized an exclusive sightseeing itinerary."
    },
    {
      "word": "reservation",
      "ipa": "/ˌrez.ɚˈveɪ.ʃən/",
      "pos": "n",
      "vietnamese": "sự đặt chỗ trước",
      "example": "A confirmed dinner reservation at a Michelin restaurant."
    },
    {
      "word": "chauffeur",
      "ipa": "/ʃoʊˈfɝː/",
      "pos": "n",
      "vietnamese": "tài xế xe riêng cao cấp",
      "example": "A private chauffeur will wait outside the lobby."
    }
  ],
  "transcript": [
    {
      "id": "s5_1",
      "speaker": "Concierge",
      "text": "Good morning Mr. Henderson, welcome back to the Grand Regency. How may the concierge team assist you today?",
      "vietnamese": "Chào buổi sáng ông Henderson, chào mừng ông quay trở lại Grand Regency. Đội ngũ lễ tân có thể hỗ trợ gì cho ông hôm nay?",
      "startTime": 0,
      "endTime": 6.2
    },
    {
      "id": "s5_2",
      "speaker": "Guest",
      "text": "Good morning Julian. My wife and I are celebrating our wedding anniversary tonight. We would love a table at a premier seafood restaurant.",
      "vietnamese": "Chào Julian. Tối nay vợ chồng tôi kỷ niệm ngày cưới. Chúng tôi muốn đặt một bàn tại một nhà hàng hải sản cao cấp hàng đầu.",
      "startTime": 7,
      "endTime": 15
    },
    {
      "id": "s5_3",
      "speaker": "Concierge",
      "text": "Warmest congratulations! I would highly recommend Le Dauphin overlooking the harbor. I can reserve the private terrace table at eight o'clock.",
      "vietnamese": "Xin gửi lời chúc mừng nồng nhiệt nhất tới ông bà! Tôi xin đặc biệt giới thiệu nhà hàng Le Dauphin nhìn ra cảng. Tôi có thể giữ bàn sân thượng riêng vào lúc 8 giờ tối.",
      "startTime": 16,
      "endTime": 23.5
    },
    {
      "id": "s5_4",
      "speaker": "Guest",
      "text": "That sounds enchanting. Could you also arrange private chauffeur transportation from the hotel lobby at seven-thirty?",
      "vietnamese": "Nghe thật tuyệt vời. Bạn có thể sắp xếp xe riêng đón từ sảnh khách sạn lúc 7 giờ 30 luôn được không?",
      "startTime": 24.5,
      "endTime": 31
    },
    {
      "id": "s5_5",
      "speaker": "Concierge",
      "text": "Consider it done, sir. A black Mercedes S-Class will be waiting for you. I will personally notify the executive chef of your celebration.",
      "vietnamese": "Mọi việc đã được sắp xếp chu đáo thưa ông. Một chiếc Mercedes S-Class màu đen sẽ đợi sẵn. Tôi sẽ đích thân thông báo cho bếp trưởng về ngày kỷ niệm của quý khách.",
      "startTime": 32,
      "endTime": 39.5
    },
    {
      "id": "s5_6",
      "speaker": "Guest",
      "text": "My wife has a severe crustacean allergy, so please verify that the culinary team prepares a bespoke multi-course pairing.",
      "vietnamese": "Vợ tôi bị dị ứng nặng với các loài giáp xác, xin vui lòng kiểm tra để đội ngũ ẩm thực chuẩn bị thực đơn kết hợp món riêng biệt.",
      "startTime": 40.5,
      "endTime": 48
    },
    {
      "id": "s5_7",
      "speaker": "Concierge",
      "text": "I will contact Chef Laurent directly to ensure separate kitchen preparation and dedicated vintage champagne selections.",
      "vietnamese": "Tôi sẽ liên hệ trực tiếp với Bếp trưởng Laurent để bảo đảm khu nấu nướng tách biệt và lựa chọn các dòng sâm panh thượng hạng riêng.",
      "startTime": 49,
      "endTime": 56.5
    },
    {
      "id": "s5_8",
      "speaker": "Guest",
      "text": "We are also hoping to attend the Royal Philharmonic Gala concert tomorrow evening if private balcony seats remain available.",
      "vietnamese": "Chúng tôi cũng hy vọng được tham dự buổi hòa nhạc dạ tiệc Royal Philharmonic vào tối mai nếu ghế ban công riêng vẫn còn chỗ.",
      "startTime": 57.5,
      "endTime": 65
    },
    {
      "id": "s5_9",
      "speaker": "Concierge",
      "text": "The box office is technically sold out, but our premier hotel concierge guild reserves an exclusive tier for our private guests.",
      "vietnamese": "Phòng vé về mặt kỹ thuật đã bán hết, nhưng hiệp hội lễ tân khách sạn hàng đầu của chúng tôi luôn giữ một khu vực độc quyền cho khách VIP.",
      "startTime": 66,
      "endTime": 74
    },
    {
      "id": "s5_10",
      "speaker": "Guest",
      "text": "You are truly extraordinary Julian; what is the proper evening attire and ideal arrival hour for the private reception?",
      "vietnamese": "Bạn thực sự phi thường đấy Julian; trang phục dạ hội phù hợp và giờ đến lý tưởng cho buổi tiếp tân riêng là khi nào?",
      "startTime": 75,
      "endTime": 82.2
    },
    {
      "id": "s5_11",
      "speaker": "Concierge",
      "text": "Formal black-tie dress is customary, and arriving forty minutes before the overture will allow you to enjoy complimentary refreshments.",
      "vietnamese": "Trang phục dạ tiệc trang trọng là thông lệ, và đến 40 phút trước khúc mở màn sẽ giúp quý khách thưởng thức đồ uống nhẹ miễn phí.",
      "startTime": 83,
      "endTime": 91.2
    },
    {
      "id": "s5_12",
      "speaker": "Guest",
      "text": "Please invoice all concert admissions, chauffeur charges, and dining incidentals straight to our presidential penthouse account.",
      "vietnamese": "Xin hãy xuất hóa đơn toàn bộ vé hòa nhạc, chi phí tài xế và các khoản ăn uống trực tiếp vào tài khoản phòng penthouse tổng thống của chúng tôi.",
      "startTime": 92,
      "endTime": 99.8
    },
    {
      "id": "s5_13",
      "speaker": "Concierge",
      "text": "All expenditures will be posted transparently to your folio, and I will hand-deliver your golden embossed tickets by four o'clock.",
      "vietnamese": "Mọi khoản chi tiêu sẽ được ghi nhận minh bạch vào hồ sơ phòng của ông, và tôi sẽ trao tận tay vé mạ vàng trước 4 giờ chiều.",
      "startTime": 100.5,
      "endTime": 108.5
    },
    {
      "id": "s5_14",
      "speaker": "Guest",
      "text": "Your white-glove hospitality is precisely why the Grand Regency is our family's favorite sanctuary in the city.",
      "vietnamese": "Lòng hiếu khách chu đáo của các bạn chính là lý do Grand Regency luôn là điểm dừng chân yêu thích của gia đình chúng tôi tại thành phố.",
      "startTime": 109.5,
      "endTime": 116.5
    }
  ],
  "quizList": [
    {
      "question": "What special occasion is the hotel guest celebrating?",
      "options": [
        "A college graduation",
        "A wedding anniversary",
        "A corporate retirement",
        "A real estate purchase"
      ],
      "correctIndex": 1,
      "explanation": "The guest mentions: 'My wife and I are celebrating our wedding anniversary tonight'."
    }
  ]
},
  {
  "id": "shadow_ext_006",
  "title": "University Thesis Advisory & Research Methodology Defense",
  "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "level": "Hard",
  "duration": "3:25",
  "category": "Academic & Higher Education",
  "tags": [
    "Thesis",
    "University",
    "Professor",
    "Methodology"
  ],
  "vocabularyList": [
    {
      "word": "methodology",
      "ipa": "/ˌmeθ.əˈdɑː.lə.dʒi/",
      "pos": "n",
      "vietnamese": "phương pháp luận nghiên cứu",
      "example": "The qualitative research methodology was rigorous."
    },
    {
      "word": "statistical",
      "ipa": "/stəˈtɪs.tɪ.kəl/",
      "pos": "adj",
      "vietnamese": "thuộc về thống kê học",
      "example": "The findings achieved high statistical significance."
    },
    {
      "word": "dissertation",
      "ipa": "/ˌdɪs.ɚˈteɪ.ʃən/",
      "pos": "n",
      "vietnamese": "luận văn tiến sĩ / thạc sĩ",
      "example": "She defended her doctoral dissertation with distinction."
    },
    {
      "word": "variable",
      "ipa": "/ˈver.i.ə.bəl/",
      "pos": "n",
      "vietnamese": "biến số trong mô hình nghiên cứu",
      "example": "Income was treated as an independent variable."
    }
  ],
  "transcript": [
    {
      "id": "s6_1",
      "speaker": "Professor",
      "text": "Please come in, Marcus. I have thoroughly reviewed the preliminary draft of your master's dissertation on renewable energy microgrids.",
      "vietnamese": "Mời em vào, Marcus. Thầy đã đọc kỹ bản thảo sơ bộ luận văn thạc sĩ của em về lưới điện vi mô năng lượng tái tạo.",
      "startTime": 0,
      "endTime": 7
    },
    {
      "id": "s6_2",
      "speaker": "Student",
      "text": "Thank you for taking the time to review it, Professor Higgins. I was slightly anxious about the statistical validation section.",
      "vietnamese": "Em cảm ơn thầy đã dành thời gian đọc ạ, thưa Giáo sư Higgins. Em có chút lo lắng về phần kiểm định thống kê.",
      "startTime": 8,
      "endTime": 14.5
    },
    {
      "id": "s6_3",
      "speaker": "Professor",
      "text": "Your regression analysis is methodologically sound, but I suggest expanding your sample size to encompass rural decentralized installations.",
      "vietnamese": "Phân tích hồi quy của em rất vững về mặt phương pháp luận, nhưng thầy khuyên em nên mở rộng cỡ mẫu để bao quát cả các hệ thống lắp đặt phân tán ở nông thôn.",
      "startTime": 15.5,
      "endTime": 23.5
    },
    {
      "id": "s6_4",
      "speaker": "Student",
      "text": "That makes total sense. I can incorporate dataset telemetry from the Northern Regional cooperative over the past three quarters.",
      "vietnamese": "Điều đó rất hợp lý ạ. Em có thể bổ sung dữ liệu đo từ xa từ hợp tác xã khu vực phía Bắc trong 3 quý vừa qua.",
      "startTime": 24.5,
      "endTime": 31.8
    },
    {
      "id": "s6_5",
      "speaker": "Professor",
      "text": "Excellent. With that empirical enhancement, your research will be in prime condition for the departmental oral defense in November.",
      "vietnamese": "Rất tốt. Với sự bổ sung thực nghiệm đó, công trình của em sẽ ở điều kiện tối ưu cho buổi bảo vệ miệng cấp khoa vào tháng 11.",
      "startTime": 33,
      "endTime": 40.5
    },
    {
      "id": "s6_6",
      "speaker": "Student",
      "text": "Should I also compute cross-sectional econometric models to evaluate capital expenditure sensitivity under volatile fossil fuel tariffs?",
      "vietnamese": "Em có nên tính toán thêm các mô hình kinh tế lượng cắt ngang để đánh giá độ nhạy của chi phí vốn dưới biểu giá nhiên liệu hóa thạch biến động không ạ?",
      "startTime": 41.5,
      "endTime": 49.5
    },
    {
      "id": "s6_7",
      "speaker": "Professor",
      "text": "Conducting sensitivity analysis across differing interest rate scenarios will illuminate the fiscal viability of your smart microgrid architecture.",
      "vietnamese": "Thực hiện phân tích độ nhạy qua các kịch bản lãi suất khác nhau sẽ làm sáng tỏ tính khả thi về mặt tài chính của kiến trúc lưới điện vi mô thông minh của em.",
      "startTime": 50.5,
      "endTime": 59
    },
    {
      "id": "s6_8",
      "speaker": "Student",
      "text": "I was somewhat hesitant whether my qualitative interviews with grid distribution managers might be judged as overly subjective.",
      "vietnamese": "Em có chút đắn đo liệu các cuộc phỏng vấn định tính của em với các giám đốc phân phối lưới điện có bị đánh giá là quá chủ quan không ạ.",
      "startTime": 60,
      "endTime": 67.5
    },
    {
      "id": "s6_9",
      "speaker": "Professor",
      "text": "Triangulating semi-structured interview qualitative transcripts with real-time supervisory control and data acquisition logs provides rock-solid validity.",
      "vietnamese": "Việc đối chiếu chéo các bản ghi phỏng vấn bán cấu trúc với nhật ký dữ liệu giám sát SCADA thời gian thực sẽ mang lại độ giá trị xác thực cực kỳ vững chắc.",
      "startTime": 68.5,
      "endTime": 77.2
    },
    {
      "id": "s6_10",
      "speaker": "Student",
      "text": "That methodological triangulation resolves my primary concern and reinforces the academic rigor of my analytical framework.",
      "vietnamese": "Sự đối chiếu phương pháp luận đó giải quyết hoàn toàn mối lo lớn nhất của em và tăng cường tính chặt chẽ học thuật cho khung phân tích của em.",
      "startTime": 78,
      "endTime": 85.5
    },
    {
      "id": "s6_11",
      "speaker": "Professor",
      "text": "How are your conference presentation slides shaping up for the upcoming symposium evaluation session?",
      "vietnamese": "Các trang slide thuyết trình hội thảo của em đang được hoàn thiện ra sao cho buổi đánh giá hội nghị chuyên đề sắp tới?",
      "startTime": 86.5,
      "endTime": 93
    },
    {
      "id": "s6_12",
      "speaker": "Student",
      "text": "I have translated multi-variable differential equations into interactive visual dashboards demonstrating energy dispatch trade-offs dynamically.",
      "vietnamese": "Em đã chuyển đổi các phương trình vi phân đa biến thành các bảng điều khiển trực quan tương tác minh họa động sự cân bằng khi điều độ năng lượng.",
      "startTime": 94,
      "endTime": 102.5
    },
    {
      "id": "s6_13",
      "speaker": "Professor",
      "text": "Conveying technical complexity with communicative elegance will impress both visiting external examiners and university peers.",
      "vietnamese": "Truyền tải sự phức tạp về mặt kỹ thuật bằng phong thái diễn đạt tao nhã sẽ gây ấn tượng mạnh với cả ban giám khảo bên ngoài lẫn các bạn học.",
      "startTime": 103.5,
      "endTime": 111
    },
    {
      "id": "s6_14",
      "speaker": "Student",
      "text": "Thank you profoundly for your persistent guidance Professor; I will submit the updated thesis compilation by Friday.",
      "vietnamese": "Em xin chân thành cảm ơn sự hướng dẫn tận tình của Giáo sư; em sẽ nộp bản thảo luận văn cập nhật trước thứ Sáu.",
      "startTime": 112,
      "endTime": 119.5
    }
  ],
  "quizList": [
    {
      "question": "What enhancement does Professor Higgins recommend for the student's dissertation?",
      "options": [
        "Deleting the entire literature review",
        "Expanding the sample size to encompass rural decentralized installations",
        "Translating the paper into Latin",
        "Using only fictional case studies"
      ],
      "correctIndex": 1,
      "explanation": "The professor advises: 'I suggest expanding your sample size to encompass rural decentralized installations'."
    }
  ]
},
  {
  "id": "shadow_ext_007",
  "title": "Global Maritime Supply Chain Disruption Meeting",
  "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "level": "Advanced",
  "duration": "3:20",
  "category": "Logistics & Trade",
  "tags": [
    "Supply Chain",
    "Maritime",
    "Logistics",
    "IELTS Band 8"
  ],
  "vocabularyList": [
    {
      "word": "chokepoint",
      "ipa": "/ˈtʃoʊk.pɔɪnt/",
      "pos": "n",
      "vietnamese": "điểm nghẽn giao thông chiến lược",
      "example": "The canal acts as a critical chokepoint for crude oil transport."
    },
    {
      "word": "demurrage",
      "ipa": "/dɪˈmɝː.ɪdʒ/",
      "pos": "n",
      "vietnamese": "phí phạt lưu kho bãi / giữ tàu quá hạn",
      "example": "Shipping delays resulted in exorbitant container demurrage charges."
    },
    {
      "word": "reroute",
      "ipa": "/ˌriːˈruːt/",
      "pos": "v",
      "vietnamese": "chuyển hướng hành trình",
      "example": "Freighters had to reroute around the Cape of Good Hope."
    },
    {
      "word": "contingency",
      "ipa": "/kənˈtɪn.dʒən.si/",
      "pos": "n",
      "vietnamese": "phương án xử lý khẩn cấp",
      "example": "We activated our emergency supply contingency protocol."
    }
  ],
  "transcript": [
    {
      "id": "s7_1",
      "speaker": "Logistics Director",
      "text": "Geopolitical tensions have shut down maritime transit through the primary canal chokepoint.",
      "vietnamese": "Căng thẳng địa chính trị đã làm đình trệ toàn bộ tuyến vận tải hàng hải qua điểm nghẽn kênh đào huyết mạch.",
      "startTime": 0,
      "endTime": 7.5
    },
    {
      "id": "s7_2",
      "speaker": "Operations Chief",
      "text": "How severely will this reroute impact our quarterly transit schedules and fuel surcharges?",
      "vietnamese": "Việc chuyển hướng tuyến đường này sẽ tác động nặng nề thế nào đến lịch trình quý và phụ phí nhiên liệu của chúng ta?",
      "startTime": 8.5,
      "endTime": 14.5
    },
    {
      "id": "s7_3",
      "speaker": "Logistics Director",
      "text": "Vessels circumnavigating the southern cape will add fourteen transit days and incur steep demurrage penalties.",
      "vietnamese": "Các tàu đi vòng qua mũi phía nam sẽ mất thêm 14 ngày hải trình và chịu các khoản phạt lưu bãi rất đắt đỏ.",
      "startTime": 15.5,
      "endTime": 24
    },
    {
      "id": "s7_4",
      "speaker": "Operations Chief",
      "text": "We must immediately trigger multi-modal air freight contingencies for priority semiconductor consignments.",
      "vietnamese": "Chúng ta phải lập tức kích hoạt phương án vận tải hàng không đa phương thức khẩn cấp cho các lô hàng bán dẫn ưu tiên.",
      "startTime": 25,
      "endTime": 32.5
    },
    {
      "id": "s7_5",
      "speaker": "Logistics Director",
      "text": "Agreed. I will brief the supply chain committee and coordinate with our freight forwarders.",
      "vietnamese": "Nhất trí. Tôi sẽ báo cáo nhanh với ban chuỗi cung ứng và điều phối cùng các đại lý giao nhận vận tải.",
      "startTime": 33.5,
      "endTime": 40
    },
    {
      "id": "s7_6",
      "speaker": "Operations Chief",
      "text": "What is our current exposure regarding inventory holding capacity at our European distribution fulfillment hubs?",
      "vietnamese": "Mức độ rủi ro hiện tại của chúng ta liên quan đến sức chứa hàng tồn kho tại các trung tâm phân phối châu Âu là bao nhiêu?",
      "startTime": 41,
      "endTime": 48
    },
    {
      "id": "s7_7",
      "speaker": "Logistics Director",
      "text": "We hold approximately three weeks of buffer stock for automotive electronic sub-assemblies before assembly lines encounter parts shortages.",
      "vietnamese": "Chúng ta có lượng tồn kho đệm khoảng ba tuần cho các cụm phụ kiện điện tử ô tô trước khi dây chuyền lắp ráp gặp phải tình trạng thiếu linh kiện.",
      "startTime": 49,
      "endTime": 57.5
    },
    {
      "id": "s7_8",
      "speaker": "Operations Chief",
      "text": "If maritime bottlenecks persist past twenty-one days, manufacturing facilities across Germany and Poland will face severe idling.",
      "vietnamese": "Nếu điểm nghẽn hàng hải kéo dài quá 21 ngày, các cơ sở sản xuất tại Đức và Ba Lan sẽ đối mặt với tình trạng ngừng trệ nghiêm trọng.",
      "startTime": 58.5,
      "endTime": 66.8
    },
    {
      "id": "s7_9",
      "speaker": "Logistics Director",
      "text": "I propose chartering three cargo aircraft on a weekly rotation to bypass ocean lanes for our highest-margin customer orders.",
      "vietnamese": "Tôi đề xuất thuê bao trọn gói ba chuyến bay chở hàng luân phiên hàng tuần để bỏ qua đường biển cho các đơn hàng có biên lợi nhuận cao nhất.",
      "startTime": 67.5,
      "endTime": 76
    },
    {
      "id": "s7_10",
      "speaker": "Operations Chief",
      "text": "Although air charter fuel tariffs are elevated, the expense is negligible compared to punitive late delivery contractual fines.",
      "vietnamese": "Dù phụ phí nhiên liệu thuê máy bay chở hàng tăng cao, chi phí đó vẫn không đáng kể so với các khoản phạt hợp đồng do giao hàng chậm trễ.",
      "startTime": 77,
      "endTime": 85
    },
    {
      "id": "s7_11",
      "speaker": "Logistics Director",
      "text": "Our forwarding agents have simultaneously secured extra bonded container yard storage space adjacent to Rotterdam harbor terminals.",
      "vietnamese": "Các đại lý giao nhận của chúng ta cũng đã đồng thời đảm bảo được thêm diện tích bãi chứa container ngoại quan gần cảng Rotterdam.",
      "startTime": 86,
      "endTime": 94.2
    },
    {
      "id": "s7_12",
      "speaker": "Operations Chief",
      "text": "Have our legal and risk teams formally invoked force majeure provisions in our ocean carrier partnership agreements?",
      "vietnamese": "Các đội ngũ pháp chế và quản trị rủi ro đã chính thức viện dẫn điều khoản bất khả kháng trong thỏa thuận với các hãng tàu biển chưa?",
      "startTime": 95,
      "endTime": 102.5
    },
    {
      "id": "s7_13",
      "speaker": "Logistics Director",
      "text": "Yes, corporate legal confirms maritime blockades qualify as insurmountable disruptions, shielding our organization from civil non-performance damages.",
      "vietnamese": "Vâng, bộ phận pháp chế xác nhận sự phong tỏa hàng hải được coi là sự kiện gián đoạn bất khả kháng, bảo vệ tổ chức của chúng ta khỏi các khoản bồi thường vi phạm.",
      "startTime": 103.5,
      "endTime": 112.5
    },
    {
      "id": "s7_14",
      "speaker": "Operations Chief",
      "text": "Proactive crisis navigation demonstrates why resilient supply networks are our firm's greatest competitive advantage.",
      "vietnamese": "Khả năng xử lý khủng hoảng chủ động chính là minh chứng cho thấy mạng lưới cung ứng linh hoạt là lợi thế cạnh tranh lớn nhất của công ty chúng ta.",
      "startTime": 113.5,
      "endTime": 121
    }
  ],
  "quizList": [
    {
      "question": "Why are shipping vessels being rerouted around the southern cape?",
      "options": [
        "To test new engine fuel efficiency",
        "Because geopolitical tensions closed the primary canal chokepoint",
        "To avoid routine harbor inspections",
        "Because all crew members requested a longer voyage"
      ],
      "correctIndex": 1,
      "explanation": "The Logistics Director states that geopolitical tensions shut down maritime transit through the primary canal chokepoint."
    }
  ]
},
  {
  "id": "shadow_ext_008",
  "title": "Silicon Valley Venture Capital Term Sheet Negotiation",
  "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "level": "Advanced",
  "duration": "3:30",
  "category": "Startups & Investment",
  "tags": [
    "Venture Capital",
    "Term Sheet",
    "Startups",
    "Negotiation"
  ],
  "vocabularyList": [
    {
      "word": "liquidation preference",
      "ipa": "/ˌlɪk.wəˈdeɪ.ʃən ˈpref.ər.əns/",
      "pos": "n",
      "vietnamese": "quyền ưu tiên thanh lý tài sản",
      "example": "Investors asked for a 2x participating liquidation preference."
    },
    {
      "word": "pro-rata",
      "ipa": "/ˌproʊ ˈrɑː.t̬ə/",
      "pos": "adj",
      "vietnamese": "quyền góp vốn theo tỷ lệ sở hữu",
      "example": "The fund exercised its pro-rata right in the subsequent round."
    },
    {
      "word": "dilution",
      "ipa": "/daɪˈluː.ʃən/",
      "pos": "n",
      "vietnamese": "sự pha loãng cổ phần",
      "example": "Founders sought to minimize unnecessary equity dilution."
    },
    {
      "word": "valuation",
      "ipa": "/ˌvæl.juˈeɪ.ʃən/",
      "pos": "n",
      "vietnamese": "định giá doanh nghiệp",
      "example": "The firm achieved a $30M post-money valuation."
    }
  ],
  "transcript": [
    {
      "id": "s8_1",
      "speaker": "Lead Investor",
      "text": "We are prepared to issue a five million dollar Series A term sheet at a thirty million post-money valuation.",
      "vietnamese": "Chúng tôi đã sẵn sàng phát hành bản điều khoản đầu tư Series A trị giá 5 triệu đô la với định giá sau gọi vốn là 30 triệu đô la.",
      "startTime": 0,
      "endTime": 8
    },
    {
      "id": "s8_2",
      "speaker": "Startup Founder",
      "text": "We appreciate the strong endorsement, though we have reservations regarding the two-times participating liquidation preference.",
      "vietnamese": "Chúng tôi rất trân trọng sự ủng hộ mạnh mẽ của các bạn, dù chúng tôi còn e ngại về điều khoản ưu tiên thanh lý gấp 2 lần có chia lợi nhuận bổ sung.",
      "startTime": 9,
      "endTime": 17.5
    },
    {
      "id": "s8_3",
      "speaker": "Lead Investor",
      "text": "Our partners consider that downside protection standard, alongside guaranteed pro-rata follow-on rights.",
      "vietnamese": "Các đối tác của chúng tôi coi đó là điều khoản bảo vệ rủi ro tiêu chuẩn, song hành với quyền ưu tiên góp vốn theo tỷ lệ vòng sau.",
      "startTime": 18.5,
      "endTime": 25.5
    },
    {
      "id": "s8_4",
      "speaker": "Startup Founder",
      "text": "We can concede on pro-rata participation if you adjust to a non-participating single-multiple liquidation preference.",
      "vietnamese": "Chúng tôi có thể đồng ý quyền góp vốn pro-rata nếu bên bạn điều chỉnh về mức thanh lý ưu tiên 1x không kèm chia thêm lợi nhuận.",
      "startTime": 26.5,
      "endTime": 34
    },
    {
      "id": "s8_5",
      "speaker": "Lead Investor",
      "text": "That sounds like an equitable compromise. Let's formalize the draft agreement with counsel.",
      "vietnamese": "Đó là một sự thỏa hiệp công bằng và hợp lý. Chúng ta hãy cùng luật sư chính thức hóa bản thảo thỏa thuận nhé.",
      "startTime": 35,
      "endTime": 41.5
    },
    {
      "id": "s8_6",
      "speaker": "Startup Founder",
      "text": "Moving to board governance structures, your draft currently requests two investor seats out of a five-member board.",
      "vietnamese": "Chuyển sang cơ cấu quản trị hội đồng, bản thảo của các bạn hiện yêu cầu hai ghế nhà đầu tư trên tổng số năm thành viên.",
      "startTime": 42.5,
      "endTime": 50
    },
    {
      "id": "s8_7",
      "speaker": "Lead Investor",
      "text": "We recommend one partner seat for our fund, two founder seats, one independent industry luminary, and one mutually approved technical advisor.",
      "vietnamese": "Chúng tôi đề xuất một ghế cho quỹ của mình, hai ghế sáng lập viên, một chuyên gia đầu ngành độc lập, và một cố vấn kỹ thuật được hai bên đồng thuận.",
      "startTime": 51,
      "endTime": 60.5
    },
    {
      "id": "s8_8",
      "speaker": "Startup Founder",
      "text": "That balanced composition preserves founding autonomy while providing seasoned enterprise software advisory perspective.",
      "vietnamese": "Cơ cấu cân bằng đó vừa gìn giữ quyền tự chủ của các nhà sáng lập, vừa mang lại góc nhìn cố vấn dày dặn kinh nghiệm về phần mềm doanh nghiệp.",
      "startTime": 61.5,
      "endTime": 69.2
    },
    {
      "id": "s8_9",
      "speaker": "Lead Investor",
      "text": "What about the unallocated employee stock ownership pool; we suggest establishing a fifteen percent post-closing reserve.",
      "vietnamese": "Thế còn quỹ quyền chọn cổ phần ESOP cho nhân viên chưa phân bổ; chúng tôi đề xuất thiết lập lượng dự phòng mười lăm phần trăm sau gọi vốn.",
      "startTime": 70,
      "endTime": 78
    },
    {
      "id": "s8_10",
      "speaker": "Startup Founder",
      "text": "A twelve percent reserve is fully adequate for our targeted engineering hiring plan without inflicting undue equity dilution on early staff.",
      "vietnamese": "Mức dự phòng mười hai phần trăm đã hoàn toàn đáp ứng kế hoạch tuyển dụng kỹ sư mục tiêu mà không gây pha loãng cổ phần quá mức cho nhân viên thời kỳ đầu.",
      "startTime": 79,
      "endTime": 87.5
    },
    {
      "id": "s8_11",
      "speaker": "Lead Investor",
      "text": "We can align on twelve percent, provided founders agree to a conventional four-year vesting schedule with a twelve-month cliff.",
      "vietnamese": "Chúng tôi có thể đồng thuận mức mười hai phần trăm, với điều kiện các sáng lập viên chấp thuận lịch trình trao quyền bốn năm tiêu chuẩn với kỳ thử thách mười hai tháng.",
      "startTime": 88.5,
      "endTime": 97.2
    },
    {
      "id": "s8_12",
      "speaker": "Startup Founder",
      "text": "That founder vesting framework aligns all incentives toward sustainable enterprise valuation growth over the long run.",
      "vietnamese": "Khung trao quyền sáng lập đó gắn kết mọi lợi ích hướng tới sự tăng trưởng định giá doanh nghiệp bền vững trong dài hạn.",
      "startTime": 98,
      "endTime": 105.5
    },
    {
      "id": "s8_13",
      "speaker": "Lead Investor",
      "text": "Our investment committee will issue the binding signature copy this afternoon, followed by formal closing mechanics next week.",
      "vietnamese": "Hội đồng đầu tư của chúng tôi sẽ phát hành bản sao có tính ràng buộc pháp lý vào chiều nay, và tiến hành các thủ tục hoàn tất chính thức vào tuần tới.",
      "startTime": 106.5,
      "endTime": 114.5
    },
    {
      "id": "s8_14",
      "speaker": "Startup Founder",
      "text": "We are thrilled to partner with your firm to scale our cognitive automation enterprise platform to global dominance.",
      "vietnamese": "Chúng tôi rất vui mừng được hợp tác với quỹ của bạn để mở rộng nền tảng tự động hóa nhận thức doanh nghiệp ra thị trường quốc tế.",
      "startTime": 115.5,
      "endTime": 123
    }
  ],
  "quizList": [
    {
      "question": "What compromise does the startup founder propose regarding the liquidation preference?",
      "options": [
        "Demanding a 10x liquidation preference",
        "Conceding on pro-rata rights in exchange for a non-participating 1x preference",
        "Refusing all venture capital investment completely",
        "Selling the entire company for cash immediately"
      ],
      "correctIndex": 1,
      "explanation": "The founder proposes: 'We can concede on pro-rata participation if you adjust to a non-participating single-multiple liquidation preference'."
    }
  ]
},
  {
  "id": "shadow_ext_009",
  "title": "Artificial Intelligence Ethics & Autonomous Systems Governance",
  "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "level": "Advanced",
  "duration": "3:30",
  "category": "AI & Modern Ethics",
  "tags": [
    "Artificial Intelligence",
    "Ethics",
    "Governance",
    "Machine Learning"
  ],
  "vocabularyList": [
    {
      "word": "algorithmic bias",
      "ipa": "/ˌæl.ɡəˈrɪð.mɪk ˈbaɪ.əs/",
      "pos": "n",
      "vietnamese": "thiên vị thuật toán",
      "example": "Auditors inspected model training sets for algorithmic bias."
    },
    {
      "word": "explainability",
      "ipa": "/ɪkˌspleɪ.nəˈbɪl.ə.t̬i/",
      "pos": "n",
      "vietnamese": "khả năng giải thích được của mô hình AI",
      "example": "Regulatory compliance mandates high model explainability."
    },
    {
      "word": "hallucination",
      "ipa": "/həˌluː.səˈneɪ.ʃən/",
      "pos": "n",
      "vietnamese": "hiện tượng ảo giác (thông tin sai bịa đặt của AI)",
      "example": "Guardrails were designed to minimize generative hallucination."
    },
    {
      "word": "governance",
      "ipa": "/ˈɡʌv.ɚ.nəns/",
      "pos": "n",
      "vietnamese": "cơ chế quản trị và giám sát",
      "example": "Corporate AI governance requires third-party ethical reviews."
    }
  ],
  "transcript": [
    {
      "id": "s9_1",
      "speaker": "Chief Ethics Officer",
      "text": "Welcome colleagues to this session on implementing our corporate governance charter for autonomous artificial intelligence models.",
      "vietnamese": "Chào mừng các đồng nghiệp đến với phiên họp triển khai hiến chương quản trị doanh nghiệp cho các mô hình trí tuệ nhân tạo tự hành.",
      "startTime": 0,
      "endTime": 7.5
    },
    {
      "id": "s9_2",
      "speaker": "Principal AI Scientist",
      "text": "We have finalized our red-teaming safety evaluations to detect cognitive bias and unintended harmful outputs in neural weights.",
      "vietnamese": "Chúng tôi đã hoàn thành các đợt đánh giá an toàn red-team nhằm phát hiện thiên kiến nhận thức và kết quả đầu ra có hại trong trọng số mạng neuron.",
      "startTime": 8.5,
      "endTime": 16.5
    },
    {
      "id": "s9_3",
      "speaker": "Chief Ethics Officer",
      "text": "How are we guaranteeing explainability when autonomous decision models approve or deny enterprise commercial loan requests?",
      "vietnamese": "Chúng ta đảm bảo khả năng giải thích thế nào khi các mô hình ra quyết định tự hành phê duyệt hoặc từ chối các khoản vay thương mại?",
      "startTime": 17.5,
      "endTime": 25
    },
    {
      "id": "s9_4",
      "speaker": "Principal AI Scientist",
      "text": "We integrated Shapley additive feature attributions so loan applicants receive mathematically transparent reasons for every credit determination.",
      "vietnamese": "Chúng tôi đã tích hợp phân tích thuộc tính Shapley để người nộp đơn nhận được các lý do minh bạch về mặt toán học cho mọi quyết định tín dụng.",
      "startTime": 26,
      "endTime": 34.5
    },
    {
      "id": "s9_5",
      "speaker": "Compliance Director",
      "text": "That satisfies emerging regulatory frameworks such as the European Union Artificial Intelligence Act and international data privacy norms.",
      "vietnamese": "Điều này đáp ứng các khung pháp lý mới ban hành như Đạo luật Trí tuệ nhân tạo của Liên minh châu Âu và các chuẩn mực bảo mật quốc tế.",
      "startTime": 35.5,
      "endTime": 43.5
    },
    {
      "id": "s9_6",
      "speaker": "Chief Ethics Officer",
      "text": "What safeguards are instituted to mitigate generative hallucinations in our clinical medical advisory copilot interface?",
      "vietnamese": "Những biện pháp bảo vệ nào được thiết lập để giảm thiểu ảo giác của AI tạo sinh trong giao diện trợ lý cố vấn y tế lâm sàng?",
      "startTime": 44.5,
      "endTime": 52
    },
    {
      "id": "s9_7",
      "speaker": "Principal AI Scientist",
      "text": "We implemented strict retrieval-augmented generation grounded exclusively in peer-reviewed medical publications with citation verification.",
      "vietnamese": "Chúng tôi đã triển khai kỹ thuật RAG tạo sinh tăng cường truy xuất dữ liệu chỉ dựa vào các công trình y khoa bình duyệt kèm xác thực trích dẫn.",
      "startTime": 53,
      "endTime": 61.5
    },
    {
      "id": "s9_8",
      "speaker": "Compliance Director",
      "text": "If confidence scores fall below ninety-eight percent, does the autonomous pipeline enforce mandatory human-in-the-loop clinical review?",
      "vietnamese": "Nếu điểm tin cậy giảm xuống dưới chín mươi tám phần trăm, quy trình tự hành có bắt buộc phải chuyển sang bác sĩ lâm sàng xét duyệt không?",
      "startTime": 62.5,
      "endTime": 70.5
    },
    {
      "id": "s9_9",
      "speaker": "Principal AI Scientist",
      "text": "Yes, automated circuit breakers immediately escalate ambiguous outputs to credentialed medical specialists before clinical advice is displayed.",
      "vietnamese": "Có chứ, các bộ ngắt mạch tự động sẽ ngay lập tức chuyển các kết quả chưa rõ ràng tới các chuyên gia y tế có chứng chỉ trước khi hiển thị.",
      "startTime": 71.5,
      "endTime": 80
    },
    {
      "id": "s9_10",
      "speaker": "Chief Ethics Officer",
      "text": "How frequently will our independent algorithmic fairness oversight committee audit production fine-tuning datasets for demographic drift?",
      "vietnamese": "Ủy ban giám sát tính công bằng thuật toán độc lập sẽ kiểm toán bộ dữ liệu tinh chỉnh production để phát hiện sai lệch nhân khẩu học bao lâu một lần?",
      "startTime": 81,
      "endTime": 89.2
    },
    {
      "id": "s9_11",
      "speaker": "Compliance Director",
      "text": "Audits are slated on a bi-weekly cadence, backed by automated continuous metric dashboards tracking parity across protected demographic classes.",
      "vietnamese": "Các cuộc kiểm toán được lên lịch định kỳ hai tuần một lần, hỗ trợ bởi bảng điều khiển số liệu liên tục theo dõi sự công bằng trên các nhóm đối tượng.",
      "startTime": 90,
      "endTime": 98.8
    },
    {
      "id": "s9_12",
      "speaker": "Principal AI Scientist",
      "text": "All training artifacts, model weights, and alignment prompts are immutably versioned in our cryptographically signed model registry.",
      "vietnamese": "Mọi hiện vật huấn luyện, trọng số mô hình và lời nhắc căn chỉnh đều được lập phiên bản bất biến trong sổ đăng ký có chữ ký mật mã.",
      "startTime": 99.5,
      "endTime": 107.5
    },
    {
      "id": "s9_13",
      "speaker": "Chief Ethics Officer",
      "text": "This comprehensive ethical architecture proves that breakthrough technological innovation and human-centric responsibility can advance synergistically.",
      "vietnamese": "Kiến trúc đạo đức toàn diện này chứng minh rằng đổi mới công nghệ đột phá và trách nhiệm lấy con người làm trung tâm hoàn toàn có thể song hành.",
      "startTime": 108.5,
      "endTime": 116.8
    },
    {
      "id": "s9_14",
      "speaker": "Compliance Director",
      "text": "Let us ratify this governance framework and publish our open-source transparency report for academic and industry stakeholders.",
      "vietnamese": "Chúng ta hãy cùng phê chuẩn khung quản trị này và xuất bản báo cáo minh bạch mã nguồn mở cho các đối tác học thuật và giới công nghệ.",
      "startTime": 117.5,
      "endTime": 125
    }
  ],
  "quizList": [
    {
      "question": "How does the AI science team ensure explainability in commercial loan decisions?",
      "options": [
        "By deleting customer bank history",
        "By utilizing Shapley additive feature attributions for mathematical transparency",
        "By guessing randomly based on customer names",
        "By printing paper forms for manual voting"
      ],
      "correctIndex": 1,
      "explanation": "The scientist states they integrated Shapley additive feature attributions so applicants receive mathematically transparent reasons."
    }
  ]
},
  {
  "id": "shadow_ext_010",
  "title": "Cross-Border Mergers & Acquisitions Financial Due Diligence",
  "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "level": "Advanced",
  "duration": "3:30",
  "category": "Corporate Finance & M&A",
  "tags": [
    "Mergers",
    "Acquisitions",
    "Finance",
    "Due Diligence"
  ],
  "vocabularyList": [
    {
      "word": "due diligence",
      "ipa": "/ˌduː ˈdɪl.ə.dʒəns/",
      "pos": "n",
      "vietnamese": "thẩm định chuyên sâu doanh nghiệp",
      "example": "Financial due diligence uncovered hidden contingent liabilities."
    },
    {
      "word": "synergy",
      "ipa": "/ˈsɪn.ɚ.dʒi/",
      "pos": "n",
      "vietnamese": "hiệu ứng cộng hưởng",
      "example": "Post-merger synergies reduced operational overhead by 20%."
    },
    {
      "word": "ebitda",
      "ipa": "/iːˈbɪt.dɑː/",
      "pos": "n",
      "vietnamese": "lợi nhuận trước lãi vay, thuế và khấu hao",
      "example": "The buyout target was valued at ten times EBITDA."
    },
    {
      "word": "escrow",
      "ipa": "/ˈes.kroʊ/",
      "pos": "n",
      "vietnamese": "tài khoản ký quỹ bảo chứng",
      "example": "Ten percent of purchase funds were held in third-party escrow."
    }
  ],
  "transcript": [
    {
      "id": "s10_1",
      "speaker": "Managing Director",
      "text": "Good morning team, let us review the preliminary due diligence findings for our proposed four hundred million dollar European cross-border acquisition.",
      "vietnamese": "Chào buổi sáng cả đội, chúng ta hãy xem xét các kết quả thẩm định sơ bộ cho thương vụ mua lại xuyên biên giới 400 triệu đô la tại châu Âu.",
      "startTime": 0,
      "endTime": 8.5
    },
    {
      "id": "s10_2",
      "speaker": "Senior M&A Associate",
      "text": "We have scrutinized their audited financials over the preceding five years and adjusted earnings before interest, taxes, and depreciation.",
      "vietnamese": "Chúng tôi đã soi xét kỹ các báo cáo tài chính đã kiểm toán trong 5 năm qua và điều chỉnh chỉ số EBITDA.",
      "startTime": 9.5,
      "endTime": 17.5
    },
    {
      "id": "s10_3",
      "speaker": "Managing Director",
      "text": "Did forensic analysis uncover any undisclosed off-balance-sheet liabilities or unresolved regulatory litigation proceedings?",
      "vietnamese": "Phân tích điều tra tài chính có phát hiện bất kỳ nghĩa vụ nợ ngoài bảng cân đối kế toán chưa khai báo hay vụ kiện tụng pháp lý nào chưa giải quyết không?",
      "startTime": 18.5,
      "endTime": 26
    },
    {
      "id": "s10_4",
      "speaker": "Senior M&A Associate",
      "text": "We discovered an unaccrued environmental remediation liability amounting to twelve million euros stemming from an older chemical storage depot.",
      "vietnamese": "Chúng tôi đã phát hiện một khoản nợ xử lý ô nhiễm môi trường chưa trích lập trị giá 12 triệu euro bắt nguồn từ một kho chứa hóa chất cũ.",
      "startTime": 27,
      "endTime": 35.5
    },
    {
      "id": "s10_5",
      "speaker": "Managing Director",
      "text": "We must insist on a specific indemnity clause and withhold twenty million euros in an escrow account for thirty-six months.",
      "vietnamese": "Chúng ta phải yêu cầu điều khoản bồi thường cụ thể và giữ lại 20 triệu euro trong tài khoản ký quỹ bảo chứng trong 36 tháng.",
      "startTime": 36.5,
      "endTime": 44.5
    },
    {
      "id": "s10_6",
      "speaker": "Tax Counsel",
      "text": "Regarding cross-border tax harmonization, we modeled an intellectual property holding structure that optimizes post-merger effective tax rates.",
      "vietnamese": "Về việc hài hòa thuế xuyên biên giới, chúng tôi đã mô hình hóa cấu trúc nắm giữ sở hữu trí tuệ giúp tối ưu thuế suất thực tế sau sáp nhập.",
      "startTime": 45.5,
      "endTime": 53.5
    },
    {
      "id": "s10_7",
      "speaker": "Managing Director",
      "text": "How defensible is that cross-border transfer pricing architecture under current OECD base erosion and profit shifting regulations?",
      "vietnamese": "Kiến trúc định giá chuyển nhượng xuyên biên giới đó vững chắc đến mức nào dưới các quy định chống xói mòn cơ sở tính thuế BEPS của OECD?",
      "startTime": 54.5,
      "endTime": 62.5
    },
    {
      "id": "s10_8",
      "speaker": "Tax Counsel",
      "text": "The transfer pricing mechanism is fully backed by economic arm's-length comparability studies and bilateral advance pricing agreements.",
      "vietnamese": "Cơ chế định giá chuyển nhượng được hỗ trợ đầy đủ bởi các nghiên cứu so sánh giá thị trường độc lập và thỏa thuận trước về phương pháp xác định giá APA.",
      "startTime": 63.5,
      "endTime": 72
    },
    {
      "id": "s10_9",
      "speaker": "Senior M&A Associate",
      "text": "Our operational synergy model forecasts annual cost savings of thirty-five million euros through supply chain consolidation within eighteen months.",
      "vietnamese": "Mô hình cộng hưởng vận hành dự báo tiết kiệm chi phí 35 triệu euro hàng năm thông qua việc hợp nhất chuỗi cung ứng trong 18 tháng.",
      "startTime": 73,
      "endTime": 81.5
    },
    {
      "id": "s10_10",
      "speaker": "Managing Director",
      "text": "What integration risks exist concerning key executive retention across the engineering and product development departments?",
      "vietnamese": "Có những rủi ro hội nhập nào liên quan đến việc giữ chân các giám đốc điều hành chủ chốt ở các bộ phận kỹ thuật và phát triển sản phẩm?",
      "startTime": 82.5,
      "endTime": 90
    },
    {
      "id": "s10_11",
      "speaker": "Senior M&A Associate",
      "text": "We designed a performance-based retention earn-out package vesting over three years for the top twenty technological leaders.",
      "vietnamese": "Chúng tôi đã thiết kế một gói thưởng giữ chân dựa trên hiệu suất kinh doanh earn-out giải ngân trong ba năm cho 20 lãnh đạo công nghệ hàng đầu.",
      "startTime": 91,
      "endTime": 99
    },
    {
      "id": "s10_12",
      "speaker": "Tax Counsel",
      "text": "Antitrust filings have been submitted concurrently to the Federal Trade Commission and European Competition Commission for regulatory clearance.",
      "vietnamese": "Hồ sơ chống độc quyền đã được nộp đồng thời lên Ủy ban Thương mại Liên bang và Ủy ban Cạnh tranh châu Âu để xin chấp thuận pháp lý.",
      "startTime": 100,
      "endTime": 108.2
    },
    {
      "id": "s10_13",
      "speaker": "Managing Director",
      "text": "Excellent thoroughness team; disciplined financial due diligence protects shareholder value and ensures value-accretive integration.",
      "vietnamese": "Sự thấu đáo tuyệt vời cả đội; thẩm định tài chính kỷ luật sẽ bảo vệ giá trị cổ đông và bảo đảm quá trình sáp nhập gia tăng giá trị.",
      "startTime": 109,
      "endTime": 117
    },
    {
      "id": "s10_14",
      "speaker": "Senior M&A Associate",
      "text": "We will compile the final confidential investment memorandum for the board of directors meeting this coming Thursday.",
      "vietnamese": "Chúng tôi sẽ tổng hợp bản ghi nhớ đầu tư mật cuối cùng cho cuộc họp hội đồng quản trị vào thứ Năm tuần này.",
      "startTime": 118,
      "endTime": 125.5
    }
  ],
  "quizList": [
    {
      "question": "What undisclosed liability was discovered during financial due diligence?",
      "options": [
        "An unpaid electricity bill of fifty dollars",
        "An unaccrued environmental remediation liability of twelve million euros",
        "A lost shipping pallet of books",
        "An overdue parking citation"
      ],
      "correctIndex": 1,
      "explanation": "The associate reports uncovering an unaccrued environmental remediation liability of twelve million euros."
    }
  ]
},
  {
  "id": "shadow_ext_011",
  "title": "Renewable Clean Energy Transition & Smart Grid Infrastructure",
  "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "level": "Intermediate",
  "duration": "3:25",
  "category": "Energy & Sustainability",
  "tags": [
    "Renewable Energy",
    "Smart Grid",
    "Sustainability",
    "Engineering"
  ],
  "vocabularyList": [
    {
      "word": "photovoltaic",
      "ipa": "/ˌfoʊ.toʊ.vɑːlˈteɪ.ɪk/",
      "pos": "adj",
      "vietnamese": "thuộc quang điện mặt trời",
      "example": "Utility-scale photovoltaic installations achieved record generation."
    },
    {
      "word": "intermittency",
      "ipa": "/ˌɪn.t̬ɚˈmɪt.əns.i/",
      "pos": "n",
      "vietnamese": "tính ngắt quãng, không liên tục",
      "example": "Battery storage mitigates the intermittency of wind power."
    },
    {
      "word": "decarbonization",
      "ipa": "/diːˌkɑːr.bən.əˈzeɪ.ʃən/",
      "pos": "n",
      "vietnamese": "quá trình phi carbon hóa",
      "example": "Industrial decarbonization targets require clean hydrogen fuel."
    },
    {
      "word": "curtailment",
      "ipa": "/kɚˈteɪl.mənt/",
      "pos": "n",
      "vietnamese": "sự cắt giảm công suất phát điện",
      "example": "Grid congestion forced temporary renewable energy curtailment."
    }
  ],
  "transcript": [
    {
      "id": "s11_1",
      "speaker": "Energy Policy Director",
      "text": "Good morning team, let us evaluate the master plan for transitioning our regional municipal power network to eighty percent renewables.",
      "vietnamese": "Chào buổi sáng cả đội, chúng ta hãy đánh giá kế hoạch tổng thể chuyển đổi mạng lưới điện đô thị khu vực sang tám mươi phần trăm năng lượng tái tạo.",
      "startTime": 0,
      "endTime": 8
    },
    {
      "id": "s11_2",
      "speaker": "Chief Grid Engineer",
      "text": "Our utility-scale solar photovoltaic arrays and offshore wind farms generated over twelve hundred megawatt-hours during peak generation hours.",
      "vietnamese": "Các mảng pin mặt trời quy mô lưới và các trang trại điện gió ngoài khơi đã tạo ra hơn một nghìn hai trăm megawatt-giờ trong những giờ cao điểm.",
      "startTime": 9,
      "endTime": 17.5
    },
    {
      "id": "s11_3",
      "speaker": "Energy Policy Director",
      "text": "How are we overcoming generation intermittency during calm wind periods and nocturnal evening consumption surges?",
      "vietnamese": "Chúng ta khắc phục tính ngắt quãng của nguồn điện thế nào trong những giai đoạn lặng gió và những đợt tăng vọt tiêu thụ ban đêm?",
      "startTime": 18.5,
      "endTime": 25.5
    },
    {
      "id": "s11_4",
      "speaker": "Chief Grid Engineer",
      "text": "We deployed a four-hour utility battery energy storage system pairing lithium iron phosphate chemistry with rapid grid-forming inverters.",
      "vietnamese": "Chúng tôi đã triển khai hệ thống lưu trữ năng lượng pin 4 giờ kết hợp công nghệ lithium sắt photphat với các bộ biến tần tạo lưới phản hồi nhanh.",
      "startTime": 26.5,
      "endTime": 35
    },
    {
      "id": "s11_5",
      "speaker": "Infrastructure Planner",
      "text": "This battery capacity prevents unnecessary renewable power curtailment and balances dynamic frequency fluctuations across high-voltage transmission lines.",
      "vietnamese": "Dung lượng pin này ngăn ngừa việc cắt giảm công suất phát điện tái tạo không cần thiết và cân bằng dao động tần số động trên các đường dây truyền tải cao thế.",
      "startTime": 36,
      "endTime": 44.5
    },
    {
      "id": "s11_6",
      "speaker": "Energy Policy Director",
      "text": "What is our deployment roadmap for smart bidirectional electric vehicle charging infrastructure across commercial parking facilities?",
      "vietnamese": "Lộ trình triển khai hạ tầng sạc xe điện hai chiều thông minh V2G của chúng ta tại các bãi đỗ xe thương mại đang ra sao?",
      "startTime": 45.5,
      "endTime": 53
    },
    {
      "id": "s11_7",
      "speaker": "Infrastructure Planner",
      "text": "Phase one equips two thousand public charging hubs with vehicle-to-grid capabilities, allowing parked electric cars to supply power during peak brownout risks.",
      "vietnamese": "Giai đoạn một trang bị tính năng sạc hai chiều V2G cho hai nghìn điểm sạc công cộng, cho phép xe điện đang đỗ phát điện ngược lại lưới khi có nguy cơ mất điện.",
      "startTime": 54,
      "endTime": 63.5
    },
    {
      "id": "s11_8",
      "speaker": "Chief Grid Engineer",
      "text": "Our AI-powered supervisory control software dynamically forecasts local consumer load profiles using micro-climate atmospheric satellite telemetry.",
      "vietnamese": "Phần mềm điều khiển giám sát ứng dụng AI của chúng tôi dự báo linh hoạt biểu đồ phụ tải tiêu dùng dựa trên dữ liệu vi khí hậu vệ tinh khí quyển.",
      "startTime": 64.5,
      "endTime": 73
    },
    {
      "id": "s11_9",
      "speaker": "Energy Policy Director",
      "text": "How resilient is our transmission backbone against extreme meteorological disasters and severe winter freeze events?",
      "vietnamese": "Xương sống truyền tải của chúng ta có khả năng chống chịu thế nào trước các thảm họa khí tượng cực đoan và các đợt đóng băng mùa đông khắc nghiệt?",
      "startTime": 74,
      "endTime": 81.5
    },
    {
      "id": "s11_10",
      "speaker": "Chief Grid Engineer",
      "text": "We have reinforced overhead towers, installed self-healing automated reclosers, and undergrounded thirty percent of urban distribution circuits.",
      "vietnamese": "Chúng tôi đã gia cố các cột điện trên cao, lắp đặt thiết bị tự đóng lại thông minh tự phục hồi, và ngầm hóa ba mươi phần trăm mạch phân phối đô thị.",
      "startTime": 82.5,
      "endTime": 91
    },
    {
      "id": "s11_11",
      "speaker": "Infrastructure Planner",
      "text": "Industrial manufacturing partners participating in demand-response programs receive tiered tariff incentives for shifting heavy smelter loads to midday.",
      "vietnamese": "Các đối tác sản xuất công nghiệp tham gia chương trình điều chỉnh phụ tải nhận được ưu đãi biểu giá theo bậc khi chuyển ca nấu luyện sang giữa trưa.",
      "startTime": 92,
      "endTime": 100.5
    },
    {
      "id": "s11_12",
      "speaker": "Energy Policy Director",
      "text": "Decarbonizing our municipal energy footprint while safeguarding grid reliability will attract clean technology enterprises to our metropolitan corridor.",
      "vietnamese": "Việc phi carbon hóa dấu chân năng lượng đô thị song hành với bảo đảm độ tin cậy lưới điện sẽ thu hút các doanh nghiệp công nghệ sạch đến khu vực chúng ta.",
      "startTime": 101.5,
      "endTime": 109.8
    },
    {
      "id": "s11_13",
      "speaker": "Chief Grid Engineer",
      "text": "The telemetry indicators confirm that carbon emissions per kilowatt-hour generated have dropped by forty-two percent year over year.",
      "vietnamese": "Các chỉ số đo từ xa xác nhận rằng lượng phát thải carbon trên mỗi kilowatt-giờ tạo ra đã giảm bốn mươi hai phần trăm so với cùng kỳ năm trước.",
      "startTime": 110.5,
      "endTime": 118.8
    },
    {
      "id": "s11_14",
      "speaker": "Energy Policy Director",
      "text": "Outstanding progress everyone. Let us deliver our quarterly sustainability executive report to the municipal oversight council.",
      "vietnamese": "Tiến độ vô cùng ấn tượng mọi người. Chúng ta hãy chuyển giao báo cáo điều hành phát triển bền vững quý cho hội đồng giám sát thành phố.",
      "startTime": 119.5,
      "endTime": 127
    }
  ],
  "quizList": [
    {
      "question": "How does the grid team address renewable energy intermittency?",
      "options": [
        "By burning coal continuously every night",
        "By deploying a four-hour lithium iron phosphate battery energy storage system with grid-forming inverters",
        "By shutting down electricity to all hospitals",
        "By telling citizens not to use appliances"
      ],
      "correctIndex": 1,
      "explanation": "The engineer confirms deploying a 4-hour battery energy storage system pairing lithium iron phosphate chemistry."
    }
  ]
},
  {
  "id": "shadow_ext_012",
  "title": "Crisis Communication & Corporate PR Press Conference",
  "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "level": "Advanced",
  "duration": "3:30",
  "category": "PR & Communications",
  "tags": [
    "Crisis Management",
    "Public Relations",
    "Press Conference",
    "Media"
  ],
  "vocabularyList": [
    {
      "word": "containment",
      "ipa": "/kənˈteɪn.mənt/",
      "pos": "n",
      "vietnamese": "sự kiểm soát, ngăn chặn sự cố lan rộng",
      "example": "Cybersecurity containment protocols stopped unauthorized data exfiltration."
    },
    {
      "word": "transparency",
      "ipa": "/trænˈspær.ən.si/",
      "pos": "n",
      "vietnamese": "sự minh bạch thông tin",
      "example": "Corporate transparency restored stakeholder confidence."
    },
    {
      "word": "remediation",
      "ipa": "/rɪˌmiː.diˈeɪ.ʃən/",
      "pos": "n",
      "vietnamese": "biện pháp khắc phục, sửa chữa sai sót",
      "example": "Immediate software remediation patched the zero-day vulnerability."
    },
    {
      "word": "accountability",
      "ipa": "/əˌkaʊn.t̬əˈbɪl.ə.t̬i/",
      "pos": "n",
      "vietnamese": "tinh thần chịu trách nhiệm",
      "example": "Leadership demonstrated complete accountability during the press briefing."
    }
  ],
  "transcript": [
    {
      "id": "s12_1",
      "speaker": "Chief Communications Officer",
      "text": "Good afternoon journalists and members of the press. Thank you for assembling for this urgent corporate press briefing.",
      "vietnamese": "Xin chào quý nhà báo và đại diện các cơ quan thông tấn. Cảm ơn quý vị đã có mặt trong buổi họp báo khẩn cấp của doanh nghiệp hôm nay.",
      "startTime": 0,
      "endTime": 7.5
    },
    {
      "id": "s12_2",
      "speaker": "Chief Information Security Officer",
      "text": "Early yesterday morning, our telemetry systems detected an unauthorized credential stuffing attack targeting an isolated legacy customer portal.",
      "vietnamese": "Sáng sớm hôm qua, hệ thống giám sát của chúng tôi đã phát hiện một cuộc tấn công nhồi thông tin xác thực nhắm vào một cổng thông tin khách hàng cũ biệt lập.",
      "startTime": 8.5,
      "endTime": 17
    },
    {
      "id": "s12_3",
      "speaker": "Chief Communications Officer",
      "text": "We want to state unequivocally that all core transactional databases and customer financial credentials remain uncompromised.",
      "vietnamese": "Chúng tôi muốn khẳng định một cách rõ ràng và dứt khoát rằng toàn bộ cơ sở dữ liệu giao dịch cốt lõi và thông tin tài chính khách hàng vẫn an toàn tuyệt đối.",
      "startTime": 18,
      "endTime": 26.5
    },
    {
      "id": "s12_4",
      "speaker": "Investigative Journalist",
      "text": "Can you confirm precisely how many user profile records were exposed, and why multi-factor authentication was not universally enforced?",
      "vietnamese": "Ông có thể xác nhận chính xác bao nhiêu hồ sơ người dùng đã bị lộ, và tại sao xác thực đa yếu tố không được áp dụng bắt buộc trên toàn hệ thống?",
      "startTime": 27.5,
      "endTime": 35.8
    },
    {
      "id": "s12_5",
      "speaker": "Chief Information Security Officer",
      "text": "Approximately fourteen thousand non-financial contact records were accessed, and multi-factor authentication has now been made mandatory company-wide.",
      "vietnamese": "Khoảng mười bốn nghìn hồ sơ liên lạc phi tài chính đã bị truy cập, và xác thực hai bước hiện đã được bắt buộc áp dụng trên toàn công ty.",
      "startTime": 36.8,
      "endTime": 46
    },
    {
      "id": "s12_6",
      "speaker": "Chief Communications Officer",
      "text": "Within forty-five minutes of alert confirmation, our incident response team severed the compromised endpoint and deployed specialized security patches.",
      "vietnamese": "Trong vòng 45 phút kể từ khi xác nhận cảnh báo, đội ngũ ứng phó sự cố đã ngắt kết nối điểm cuối bị xâm phạm và triển khai các bản vá bảo mật chuyên biệt.",
      "startTime": 47,
      "endTime": 56
    },
    {
      "id": "s12_7",
      "speaker": "Financial Reporter",
      "text": "What legal notification steps are being executed regarding regulatory data protection authorities and affected account holders?",
      "vietnamese": "Những bước thông báo pháp lý nào đang được thực hiện đối với các cơ quan quản lý bảo vệ dữ liệu và các chủ tài khoản bị ảnh hưởng?",
      "startTime": 57,
      "endTime": 64.5
    },
    {
      "id": "s12_8",
      "speaker": "Chief Communications Officer",
      "text": "We notified law enforcement cyber divisions within two hours and initiated direct personalized email notices detailing remediation guidance.",
      "vietnamese": "Chúng tôi đã thông báo cho các cơ quan an ninh mạng thực thi pháp luật trong vòng hai giờ và bắt đầu gửi email trực tiếp hướng dẫn chi tiết cách khắc phục.",
      "startTime": 65.5,
      "endTime": 74.5
    },
    {
      "id": "s12_9",
      "speaker": "Chief Information Security Officer",
      "text": "We have retained a premier third-party forensic cybersecurity firm to conduct an exhaustive independent technical audit of all network perimeters.",
      "vietnamese": "Chúng tôi đã thuê một công ty an ninh mạng điều tra hàng đầu để tiến hành kiểm toán kỹ thuật độc lập toàn diện trên toàn bộ vành đai mạng.",
      "startTime": 75.5,
      "endTime": 84.5
    },
    {
      "id": "s12_10",
      "speaker": "Investigative Journalist",
      "text": "Is the corporation providing complimentary identity theft monitoring and credit freeze services for all affected consumers?",
      "vietnamese": "Công ty có cung cấp dịch vụ giám sát chống trộm danh tính và đóng băng tín dụng miễn phí cho tất cả khách hàng bị ảnh hưởng không?",
      "startTime": 85.5,
      "endTime": 93
    },
    {
      "id": "s12_11",
      "speaker": "Chief Communications Officer",
      "text": "Yes, every impacted customer is provided twenty-four months of complimentary credit protection and access to a dedicated telephone hotline.",
      "vietnamese": "Có chứ, mỗi khách hàng bị ảnh hưởng đều được cung cấp hai mươi bốn tháng bảo vệ tín dụng miễn phí và quyền liên hệ đường dây nóng chuyên trách.",
      "startTime": 94,
      "endTime": 102.5
    },
    {
      "id": "s12_12",
      "speaker": "Chief Information Security Officer",
      "text": "Our cryptographic infrastructure has transitioned to zero-trust architecture, requiring hardware security key verification for all employee access.",
      "vietnamese": "Hạ tầng mật mã của chúng tôi đã chuyển sang kiến trúc zero-trust, yêu cầu xác thực bằng khóa bảo mật phần cứng cho mọi quyền truy cập của nhân viên.",
      "startTime": 103.5,
      "endTime": 112.5
    },
    {
      "id": "s12_13",
      "speaker": "Chief Communications Officer",
      "text": "Uncompromising transparency and total accountability are the founding pillars upon which our organization will regain your complete trust.",
      "vietnamese": "Sự minh bạch kiên định và tinh thần chịu trách nhiệm tuyệt đối chính là những nền tảng giúp tổ chức của chúng tôi lấy lại niềm tin trọn vẹn từ quý vị.",
      "startTime": 113.5,
      "endTime": 121.8
    },
    {
      "id": "s12_14",
      "speaker": "Chief Communications Officer",
      "text": "We will release regular hourly updates on our press portal as the forensic investigation reaches completion. Thank you.",
      "vietnamese": "Chúng tôi sẽ phát hành các bản cập nhật định kỳ hàng giờ trên cổng thông tin báo chí khi cuộc điều tra kỹ thuật hoàn tất. Xin cảm ơn quý vị.",
      "startTime": 122.5,
      "endTime": 130
    }
  ],
  "quizList": [
    {
      "question": "What protective service is offered to customers affected by the incident?",
      "options": [
        "A free coffee coupon",
        "Twenty-four months of complimentary credit protection and a dedicated telephone hotline",
        "A discount on future computer purchases",
        "Nothing at all"
      ],
      "correctIndex": 1,
      "explanation": "The Chief Communications Officer confirms providing 24 months of complimentary credit protection and access to a hotline."
    }
  ]
}
];
