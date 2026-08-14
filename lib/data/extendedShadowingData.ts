import { ListeningLesson } from "../utils/listeningParser";

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
  }
];
