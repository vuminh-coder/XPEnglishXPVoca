import React from "react";
import { 
  Utensils, 
  Briefcase, 
  Plane, 
  Cpu, 
  ShoppingBag, 
  Navigation,
  Stethoscope,
  Hotel,
  Handshake,
  GraduationCap,
  Home,
  Wrench,
  Dumbbell,
  Coffee,
  TrendingUp,
  ShieldAlert,
  Landmark,
  Car,
  FileCheck,
  MessageCircle
} from "lucide-react";
import { Topic } from "../types";

export const TOPIC_ICONS: Record<string, React.ReactNode> = {
  at1: React.createElement(Utensils, { className: "w-4 h-4 text-amber-500", strokeWidth: 1.8 }),
  at2: React.createElement(Briefcase, { className: "w-4 h-4 text-[#0059bb]", strokeWidth: 1.8 }),
  at3: React.createElement(Plane, { className: "w-4 h-4 text-emerald-500", strokeWidth: 1.8 }),
  at4: React.createElement(Cpu, { className: "w-4 h-4 text-purple-500", strokeWidth: 1.8 }),
  at5: React.createElement(ShoppingBag, { className: "w-4 h-4 text-rose-500", strokeWidth: 1.8 }),
  at6: React.createElement(Navigation, { className: "w-4 h-4 text-sky-500", strokeWidth: 1.8 }),
  at7: React.createElement(Stethoscope, { className: "w-4 h-4 text-red-500", strokeWidth: 1.8 }),
  at8: React.createElement(Hotel, { className: "w-4 h-4 text-indigo-500", strokeWidth: 1.8 }),
  at9: React.createElement(Handshake, { className: "w-4 h-4 text-emerald-600", strokeWidth: 1.8 }),
  at10: React.createElement(GraduationCap, { className: "w-4 h-4 text-blue-600", strokeWidth: 1.8 }),
  at11: React.createElement(Home, { className: "w-4 h-4 text-amber-600", strokeWidth: 1.8 }),
  at12: React.createElement(Wrench, { className: "w-4 h-4 text-cyan-600", strokeWidth: 1.8 }),
  at13: React.createElement(Dumbbell, { className: "w-4 h-4 text-orange-500", strokeWidth: 1.8 }),
  at14: React.createElement(Coffee, { className: "w-4 h-4 text-amber-700", strokeWidth: 1.8 }),
  at15: React.createElement(TrendingUp, { className: "w-4 h-4 text-emerald-500", strokeWidth: 1.8 }),
  at16: React.createElement(ShieldAlert, { className: "w-4 h-4 text-rose-600", strokeWidth: 1.8 }),
  at17: React.createElement(Landmark, { className: "w-4 h-4 text-emerald-600", strokeWidth: 1.8 }),
  at18: React.createElement(Car, { className: "w-4 h-4 text-blue-500", strokeWidth: 1.8 }),
  at19: React.createElement(FileCheck, { className: "w-4 h-4 text-indigo-600", strokeWidth: 1.8 }),
  at20: React.createElement(MessageCircle, { className: "w-4 h-4 text-amber-600", strokeWidth: 1.8 }),
};

export const aiTopics: Topic[] = [
  {
    id: "at1",
    name: "Đặt món tại nhà hàng",
    nameEn: "Ordering at a Restaurant",
    description: "Tập gọi món, yêu cầu đặc biệt và thanh toán hóa đơn.",
    level: "Beginner",
    goals: [
      { id: "at1_g1", name: "Gọi ít nhất 1 món ăn", nameEn: "Order a dish", keywords: ["order", "like", "have", "salad", "pizza", "pasta", "steak", "soup"] },
      { id: "at1_g2", name: "Yêu cầu đồ uống", nameEn: "Ask for a drink", keywords: ["drink", "water", "juice", "coffee", "tea", "coke", "wine", "beer"] },
      { id: "at1_g3", name: "Hỏi hóa đơn thanh toán", nameEn: "Ask for the bill", keywords: ["bill", "check", "pay", "card", "cash", "how much"] },
    ],
    welcomeMessage: {
      text: "Welcome to The Bistro! Are you ready to order, or would you like to see our special menu today?",
      vi: "Chào mừng quý khách đến với The Bistro! Quý khách đã sẵn sàng gọi món hay muốn xem thực đơn đặc biệt hôm nay?"
    },
    suggestions: [
      "I'd like to order a fresh garden salad, please.",
      "Could I get a glass of sparkling water?",
      "Could we have the bill, please?"
    ],
    suggestedWords: [
      { word: "order", meaning: "gọi món" },
      { word: "salad", meaning: "món rau trộn" },
      { word: "delicious", meaning: "thơm ngon" }
    ],
    advice: "Dùng 'I would like...' hoặc 'Could I have...' để giao tiếp lịch sự hơn."
  },
  {
    id: "at2",
    name: "Phỏng vấn xin việc",
    nameEn: "Job Interview",
    description: "Thực hành giới thiệu bản thân và kinh nghiệm làm việc.",
    level: "Intermediate",
    goals: [
      { id: "at2_g1", name: "Giới thiệu bản thân & nền tảng", nameEn: "Introduce yourself", keywords: ["name", "graduated", "background", "years", "study", "experience", "work"] },
      { id: "at2_g2", name: "Nêu điểm mạnh chính", nameEn: "State your strength", keywords: ["strength", "good at", "skill", "teamwork", "communication", "problem", "lead"] },
      { id: "at2_g3", name: "Lý do muốn làm việc tại công ty", nameEn: "Why this company", keywords: ["company", "culture", "grow", "opportunity", "passion", "value", "contribute"] },
    ],
    welcomeMessage: {
      text: "Hello! Thank you for coming today. Could you please introduce yourself and tell me a bit about your background?",
      vi: "Xin chào! Cảm ơn bạn đã đến hôm nay. Bạn có thể giới thiệu về bản thân và nền tảng công việc của mình không?"
    },
    suggestions: [
      "I have over 3 years of experience in software development.",
      "My greatest strength is solving complex problems under pressure.",
      "I admire your company's innovative culture and want to contribute."
    ],
    suggestedWords: [
      { word: "experience", meaning: "kinh nghiệm" },
      { word: "interview", meaning: "phỏng vấn" },
      { word: "improve", meaning: "cải thiện" }
    ],
    advice: "Trả lời theo cấu trúc STAR (Situation - Task - Action - Result) để tạo ấn tượng mạnh."
  },
  {
    id: "at3",
    name: "Thủ tục tại sân bay",
    nameEn: "Airport Check-in",
    description: "Luyện tập làm thủ tục check-in, chọn chỗ ngồi và qua cửa an ninh.",
    level: "Beginner",
    goals: [
      { id: "at3_g1", name: "Xuất trình hộ chiếu & vé", nameEn: "Show passport & ticket", keywords: ["passport", "ticket", "flight", "here", "booking", "seat"] },
      { id: "at3_g2", name: "Chọn chỗ ngồi (cửa sổ / lối đi)", nameEn: "Choose your seat", keywords: ["window", "aisle", "seat", "prefer", "front", "middle"] },
      { id: "at3_g3", name: "Gửi hành lý ký gửi", nameEn: "Check in baggage", keywords: ["bag", "luggage", "suitcase", "check", "carry", "weight"] },
    ],
    welcomeMessage: {
      text: "Good morning! Welcome to SkyWings. May I see your passport and flight booking reference, please?",
      vi: "Chào buổi sáng! Chào mừng quý khách đến với SkyWings. Tôi có thể xem hộ chiếu và mã đặt vé của quý khách không?"
    },
    suggestions: [
      "Here is my passport and booking confirmation.",
      "Could I please get a window seat if available?",
      "I only have one check-in bag and one carry-on."
    ],
    suggestedWords: [
      { word: "passport", meaning: "hộ chiếu" },
      { word: "window", meaning: "cửa sổ" },
      { word: "seat", meaning: "chỗ ngồi" }
    ],
    advice: "Nhớ từ 'aisle' (lối đi) phát âm là /aɪl/ (âm 's' câm)."
  },
  {
    id: "at4",
    name: "Thảo luận công nghệ & AI",
    nameEn: "Tech & AI Trends",
    description: "Bàn luận về trí tuệ nhân tạo, tương lai công việc và đổi mới.",
    level: "Advanced",
    goals: [
      { id: "at4_g1", name: "Nêu quan điểm về AI hiện nay", nameEn: "State your AI view", keywords: ["ai", "artificial", "intelligence", "think", "believe", "technology", "transform"] },
      { id: "at4_g2", name: "Nêu 1 cơ hội hoặc rủi ro", nameEn: "Mention benefit/risk", keywords: ["risk", "opportunity", "benefit", "job", "automate", "replace", "future", "ethics"] },
      { id: "at4_g3", name: "Đưa ra dự đoán tương lai", nameEn: "Give a prediction", keywords: ["predict", "will", "future", "decade", "evolve", "human", "society"] },
    ],
    welcomeMessage: {
      text: "Generative AI is changing how everyone works and learns. What's your personal perspective on this technological revolution?",
      vi: "AI tạo sinh đang thay đổi cách mọi người làm việc và học tập. Góc nhìn cá nhân của bạn về cuộc cách mạng công nghệ này là gì?"
    },
    suggestions: [
      "I believe AI will augment human productivity rather than completely replace us.",
      "One major challenge is addressing algorithmic bias and ethical concerns.",
      "In the next decade, education will become hyper-personalized."
    ],
    suggestedWords: [
      { word: "artificial", meaning: "nhân tạo" },
      { word: "intelligence", meaning: "trí tuệ" },
      { word: "technology", meaning: "công nghệ" }
    ],
    advice: "Sử dụng các từ nối học thuật như 'Consequently', 'Furthermore', 'From my standpoint'."
  },
  {
    id: "at5",
    name: "Mua sắm & Hỏi giá",
    nameEn: "Shopping & Bargaining",
    description: "Hỏi size, chất liệu, hỏi giảm giá và chính sách đổi trả.",
    level: "Beginner",
    goals: [
      { id: "at5_g1", name: "Hỏi kích cỡ hoặc màu sắc", nameEn: "Ask for size/color", keywords: ["size", "color", "medium", "large", "small", "blue", "black", "have"] },
      { id: "at5_g2", name: "Hỏi giá hoặc xin giảm giá", nameEn: "Ask for price/discount", keywords: ["how much", "price", "cost", "discount", "deal", "expensive", "cheap"] },
      { id: "at5_g3", name: "Quyết định mua và thanh toán", nameEn: "Decide to buy", keywords: ["take", "buy", "pay", "cash", "card", "receipt"] },
    ],
    welcomeMessage: {
      text: "Hi there! Let me know if you need any help finding something or trying on a different size.",
      vi: "Xin chào! Hãy cho tôi biết nếu bạn cần giúp tìm đồ hoặc thử kích cỡ khác nhé."
    },
    suggestions: [
      "Do you have this jacket in a medium size?",
      "Is there any discount available on this item?",
      "I'll take this one! Can I pay with credit card?"
    ],
    suggestedWords: [
      { word: "discount", meaning: "giảm giá" },
      { word: "order", meaning: "đặt hàng" },
      { word: "want", meaning: "muốn" }
    ],
    advice: "Cụm 'I will take it' là cách tự nhiên nhất để nói 'Tôi sẽ lấy món này'."
  },
  {
    id: "at6",
    name: "Hỏi đường khi đi du lịch",
    nameEn: "Asking for Directions",
    description: "Hỏi đường đến địa danh nổi tiếng, trạm xe buýt hoặc khách sạn.",
    level: "Beginner",
    goals: [
      { id: "at6_g1", name: "Hỏi vị trí của một địa điểm", nameEn: "Ask where something is", keywords: ["where", "how to get", "find", "station", "museum", "hotel", "street"] },
      { id: "at6_g2", name: "Hỏi về khoảng cách hoặc thời gian", nameEn: "Ask distance/time", keywords: ["far", "walk", "minutes", "bus", "taxi", "how long", "distance"] },
      { id: "at6_g3", name: "Cảm ơn sự giúp đỡ", nameEn: "Thank for help", keywords: ["thank", "appreciate", "helpful", "grateful", "have a nice day"] },
    ],
    welcomeMessage: {
      text: "Excuse me, you look a bit lost! Are you looking for a specific landmark around here?",
      vi: "Xin lỗi, trông bạn có vẻ đang lạc đường! Bạn đang tìm một địa danh cụ thể quanh đây phải không?"
    },
    suggestions: [
      "Excuse me, could you tell me how to get to the central train station?",
      "Is it within walking distance or should I take a bus?",
      "Thank you so much for your kind help! Have a great day."
    ],
    suggestedWords: [
      { word: "direction", meaning: "phương hướng" },
      { word: "travel", meaning: "du lịch" },
      { word: "beautiful", meaning: "xinh đẹp" }
    ],
    advice: "Luôn bắt đầu bằng 'Excuse me...' trước khi hỏi đường để giữ thái độ lịch thiệp."
  },
  {
    id: "at7",
    name: "Tư vấn sức khỏe & Khám bệnh",
    nameEn: "Doctor & Medical Consultation",
    description: "Mô tả triệu chứng bệnh, tiền sử dị ứng và nhận chỉ định điều trị từ bác sĩ.",
    level: "Intermediate",
    goals: [
      { id: "at7_g1", name: "Mô tả ít nhất 2 triệu chứng bệnh", nameEn: "Describe symptoms", keywords: ["headache", "fever", "pain", "cough", "sore", "dizzy", "fatigue", "stomach", "ache"] },
      { id: "at7_g2", name: "Nói về thời gian bị triệu chứng", nameEn: "State duration", keywords: ["days", "since", "yesterday", "started", "hours", "week", "morning"] },
      { id: "at7_g3", name: "Hỏi về đơn thuốc hoặc lưu ý", nameEn: "Ask about prescription", keywords: ["prescription", "medicine", "pills", "dose", "side effects", "rest", "diet"] },
    ],
    welcomeMessage: {
      text: "Good morning. I'm Dr. Evans. Please take a seat. What seems to be the problem today?",
      vi: "Chào bạn. Tôi là Bác sĩ Evans. Mời bạn ngồi. Hôm nay bạn cảm thấy không khỏe ở đâu?"
    },
    suggestions: [
      "I've had a severe headache and a mild fever for the past three days.",
      "My throat feels very sore and it hurts whenever I swallow.",
      "Are there any side effects with this medication?"
    ],
    suggestedWords: [
      { word: "symptom", meaning: "triệu chứng" },
      { word: "prescription", meaning: "đơn thuốc" },
      { word: "allergic", meaning: "dị ứng" }
    ],
    advice: "Dùng cấu trúc thì Hiện tại Hoàn thành (e.g., 'I have felt dizzy for two days') để mô tả triệu chứng kéo dài từ quá khứ đến nay."
  },
  {
    id: "at8",
    name: "Khiếu nại khách sạn & Dịch vụ phòng",
    nameEn: "Hotel Concierge & Room Issue",
    description: "Báo sự cố phòng (máy lạnh hỏng, thiếu khăn) và yêu cầu dịch vụ đặc biệt.",
    level: "Beginner",
    goals: [
      { id: "at8_g1", name: "Nêu số phòng và sự cố", nameEn: "State room and problem", keywords: ["room", "air conditioner", "broken", "leak", "towel", "hot water", "noisy", "remote"] },
      { id: "at8_g2", name: "Yêu cầu đổi phòng hoặc sửa chữa", nameEn: "Request fix/change", keywords: ["fix", "change", "send", "repair", "someone", "replace", "switch"] },
      { id: "at8_g3", name: "Hỏi về dịch vụ tiện ích bổ sung", nameEn: "Ask about amenities", keywords: ["breakfast", "wifi", "taxi", "shuttle", "luggage", "checkout", "pool"] },
    ],
    welcomeMessage: {
      text: "Front desk, this is Michael speaking. How may I assist you this evening?",
      vi: "Quầy lễ tân xin nghe, tôi là Michael. Tôi có thể hỗ trợ gì cho quý khách tối nay ạ?"
    },
    suggestions: [
      "Hello, I'm calling from Room 402. The air conditioning unit isn't cooling properly.",
      "Could you please send someone to check it or move us to another room?",
      "Also, what time is breakfast served tomorrow morning?"
    ],
    suggestedWords: [
      { word: "maintenance", meaning: "bảo trì" },
      { word: "complimentary", meaning: "miễn phí" },
      { word: "inconvenience", meaning: "sự bất tiện" }
    ],
    advice: "Luôn nói số phòng trước (e.g., 'I'm calling from room 305') để lễ tân hỗ trợ nhanh nhất."
  },
  {
    id: "at9",
    name: "Đàm phán lương & Thỏa thuận hợp đồng",
    nameEn: "Salary & Contract Negotiation",
    description: "Thương lượng mức lương, phúc lợi và đãi ngộ với nhà tuyển dụng.",
    level: "Advanced",
    goals: [
      { id: "at9_g1", name: "Đề xuất mức đãi ngộ kỳ vọng", nameEn: "Propose target salary", keywords: ["salary", "range", "expect", "annual", "compensation", "market", "package"] },
      { id: "at9_g2", name: "Đưa ra dẫn chứng năng lực và giá trị", nameEn: "Justify value", keywords: ["experience", "deliver", "track record", "value", "growth", "revenue", "skills"] },
      { id: "at9_g3", name: "Thương lượng phúc lợi bổ sung", nameEn: "Negotiate benefits", keywords: ["bonus", "remote", "vacation", "insurance", "equity", "stocks", "flexibility"] },
    ],
    welcomeMessage: {
      text: "We were very impressed by your interview and we'd love to offer you the Senior Product Manager position. What are your expectations regarding total compensation?",
      vi: "Chúng tôi rất ấn tượng với buổi phỏng vấn của bạn và muốn mời bạn vào vị trí Trưởng nhóm Sản phẩm Cấp cao. Bạn có kỳ vọng thế nào về mức đãi ngộ tổng thể?"
    },
    suggestions: [
      "Based on my seven years of experience and market benchmarks for this role, I am targeting a base range of $95,000 to $105,000.",
      "In my previous position, I drove a 40% increase in product adoption, which I am confident I can replicate here.",
      "Would there be flexibility regarding an annual performance bonus and hybrid remote working days?"
    ],
    suggestedWords: [
      { word: "benchmark", meaning: "tiêu chuẩn so sánh" },
      { word: "compensation", meaning: "chế độ đãi ngộ" },
      { word: "flexibility", meaning: "sự linh hoạt" }
    ],
    advice: "Dùng 'Based on market research...' thay vì 'I want...' để tạo sự chuyên nghiệp và khách quan."
  },
  {
    id: "at10",
    name: "Gặp giáo sư du học & Bảo vệ đề tài",
    nameEn: "Academic Office Hours & Research",
    description: "Thảo luận luận văn, xin gia hạn nộp bài và nhận nhận xét từ giáo sư đại học.",
    level: "Advanced",
    goals: [
      { id: "at10_g1", name: "Nêu chủ đề bài luận hoặc thắc mắc", nameEn: "State thesis topic", keywords: ["thesis", "research", "paper", "methodology", "literature", "data", "hypothesis"] },
      { id: "at10_g2", name: "Trình bày khó khăn cụ thể", nameEn: "Explain challenge", keywords: ["struggling", "unclear", "sample size", "delay", "challenge", "findings", "analysis"] },
      { id: "at10_g3", name: "Xin phản hồi hoặc gia hạn", nameEn: "Request feedback/extension", keywords: ["feedback", "extension", "advice", "deadline", "draft", "revise", "recommend"] },
    ],
    welcomeMessage: {
      text: "Come in! Take a seat. How is your research paper on behavioral economics coming along?",
      vi: "Mời vào! Hãy ngồi đi. Bài nghiên cứu của em về kinh tế học hành vi tiến triển đến đâu rồi?"
    },
    suggestions: [
      "Professor, I have finalized my literature review, but I am facing challenges with the empirical data sample.",
      "Would it be possible to get an extension of three days to refine the statistical analysis?",
      "Could you recommend any specific academic journals that focus on this methodology?"
    ],
    suggestedWords: [
      { word: "methodology", meaning: "phương pháp luận" },
      { word: "empirical", meaning: "thực nghiệm" },
      { word: "extension", meaning: "sự gia hạn" }
    ],
    advice: "Giữ văn phong học thuật trang trọng (Formal Academic Register), dùng 'Would you mind if...' hoặc 'I would appreciate your guidance on...'."
  },
  {
    id: "at11",
    name: "Thuê nhà & Khảo sát căn hộ",
    nameEn: "Apartment Viewing & Tenancy",
    description: "Hỏi giá thuê, tiền cọc, chi phí tiện ích và quy định thú cưng với chủ nhà.",
    level: "Intermediate",
    goals: [
      { id: "at11_g1", name: "Hỏi về giá thuê và tiền đặt cọc", nameEn: "Ask rent and deposit", keywords: ["rent", "deposit", "month", "utilities", "cost", "price", "included"] },
      { id: "at11_g2", name: "Hỏi về tiện nghi và hợp đồng", nameEn: "Ask lease/amenities", keywords: ["lease", "furnished", "parking", "pet", "balcony", "laundry", "gym"] },
      { id: "at11_g3", name: "Thảo luận ngày có thể dọn vào", nameEn: "Discuss move-in date", keywords: ["move in", "available", "start", "contract", "sign", "inspect"] },
    ],
    welcomeMessage: {
      text: "Welcome to Maple Court Apartments! This is the two-bedroom unit on the 5th floor. Feel free to look around! What do you think?",
      vi: "Chào mừng bạn đến với chung cư Maple Court! Đây là căn hộ hai phòng ngủ ở tầng 5. Cứ tự nhiên quan sát nhé! Bạn thấy thế nào?"
    },
    suggestions: [
      "The natural lighting is wonderful! Is the monthly rent inclusive of water and building maintenance fees?",
      "How much is the security deposit, and what is the minimum lease term?",
      "Are pets allowed, and is an underground parking spot included?"
    ],
    suggestedWords: [
      { word: "lease", meaning: "hợp đồng thuê nhà" },
      { word: "utilities", meaning: "chi phí điện nước dịch vụ" },
      { word: "deposit", meaning: "tiền đặt cọc" }
    ],
    advice: "Hỏi rõ từ 'inclusive of' (đã bao gồm) để tránh các khoản phí ẩn về sau."
  },
  {
    id: "at12",
    name: "Hỗ trợ kỹ thuật IT & Xử lý lỗi",
    nameEn: "IT Support & Troubleshooting",
    description: "Báo cáo lỗi máy chủ, gián đoạn mạng hoặc vấn đề cấp quyền phần mềm.",
    level: "Intermediate",
    goals: [
      { id: "at12_g1", name: "Mô tả thông báo lỗi hoặc hành vi lạ", nameEn: "Describe error", keywords: ["error", "crash", "code", "freeze", "server", "access", "timeout", "bug"] },
      { id: "at12_g2", name: "Nêu các bước đã tự thử khắc phục", nameEn: "State steps taken", keywords: ["restarted", "cleared cache", "tried", "rebooted", "browser", "password"] },
      { id: "at12_g3", name: "Yêu cầu hỗ trợ khẩn hoặc cấp quyền", nameEn: "Request urgent fix", keywords: ["urgent", "access", "ticket", "permission", "deploy", "restore", "database"] },
    ],
    welcomeMessage: {
      text: "IT Service Desk, David speaking. I understand you're experiencing an outage with the staging database?",
      vi: "Bộ phận hỗ trợ kỹ thuật IT, tôi là David. Tôi được biết bạn đang gặp sự cố gián đoạn với cơ sở dữ liệu môi trường thử nghiệm?"
    },
    suggestions: [
      "Yes, when I run the migration script, I receive a 504 Gateway Timeout error code.",
      "I have already cleared the local cache and restarted the VPN tunnel, but the error persists.",
      "Could you please check if my IP address is whitelisted in the cloud firewall rules?"
    ],
    suggestedWords: [
      { word: "troubleshoot", meaning: "xử lý sự cố" },
      { word: "whitelist", meaning: "danh sách cho phép truy cập" },
      { word: "persists", meaning: "vẫn tiếp tục diễn ra" }
    ],
    advice: "Luôn cung cấp mã lỗi chính xác (Error code/Screenshot) để kỹ sư IT bắt bệnh nhanh hơn."
  },
  {
    id: "at13",
    name: "Tư vấn thể hình & Dinh dưỡng",
    nameEn: "Gym, Fitness & Nutrition Coaching",
    description: "Xây dựng giáo án tập luyện, tăng cơ giảm mỡ và chế độ ăn với HLV cá nhân.",
    level: "Beginner",
    goals: [
      { id: "at13_g1", name: "Nêu mục tiêu thể hình", nameEn: "State fitness goal", keywords: ["muscle", "lose weight", "stamina", "fat", "gain", "stronger", "tone", "bulk"] },
      { id: "at13_g2", name: "Nói về số buổi tập hàng tuần", nameEn: "State frequency", keywords: ["days", "week", "hours", "workout", "cardio", "weights", "schedule"] },
      { id: "at13_g3", name: "Hỏi về chế độ ăn và protein", nameEn: "Ask nutrition/diet", keywords: ["diet", "protein", "calories", "carbs", "meal", "water", "supplement"] },
    ],
    welcomeMessage: {
      text: "Hey there! Welcome to Apex Fitness. I'm Coach Marcus. Let's talk about your personal health goals. What would you like to achieve over the next six months?",
      vi: "Chào bạn! Chào mừng bạn đến với Apex Fitness. Tôi là Huấn luyện viên Marcus. Hãy nói về mục tiêu sức khỏe của bạn nhé. Bạn muốn đạt được điều gì trong 6 tháng tới?"
    },
    suggestions: [
      "I want to build lean muscle mass while reducing my body fat percentage.",
      "I can commit to training four days a week, mostly in the evenings.",
      "What should my daily protein intake be, and do you recommend creatine?"
    ],
    suggestedWords: [
      { word: "metabolism", meaning: "sự trao đổi chất" },
      { word: "nutrition", meaning: "dinh dưỡng" },
      { word: "consistency", meaning: "tính kiên trì đều đặn" }
    ],
    advice: "Dùng từ 'commit to' để thể hiện sự quyết tâm trong luyện tập thể thao."
  },
  {
    id: "at14",
    name: "Giao lưu văn phòng quốc tế",
    nameEn: "International Networking & Small Talk",
    description: "Trò chuyện xã giao, chia sẻ văn hóa và kết nối đồng nghiệp đa quốc gia.",
    level: "Intermediate",
    goals: [
      { id: "at14_g1", name: "Mở đầu cuộc trò chuyện tự nhiên", nameEn: "Start conversation", keywords: ["first time", "event", "talk", "session", "coffee", "enjoying", "meet"] },
      { id: "at14_g2", name: "Chia sẻ về công việc hoặc dự án", nameEn: "Share work/project", keywords: ["work on", "team", "design", "marketing", "code", "responsible", "remote"] },
      { id: "at14_g3", name: "Trao đổi thông tin liên lạc (LinkedIn)", nameEn: "Exchange contacts", keywords: ["linkedin", "connect", "card", "stay in touch", "email", "coffee", "chat"] },
    ],
    welcomeMessage: {
      text: "Hi! That keynote presentation on renewable energy was fascinating, wasn't it? Have you traveled far for the summit?",
      vi: "Chào bạn! Bài thuyết trình mở màn về năng lượng tái tạo vừa rồi cuốn hút thật đấy nhỉ? Bạn có phải bay từ xa đến dự hội nghị thượng đỉnh này không?"
    },
    suggestions: [
      "It truly was! I flew in from Hanoi yesterday morning. The insights on battery storage were eye-opening.",
      "I lead our company's sustainable packaging initiative. What area do you specialize in?",
      "Let's connect on LinkedIn so we can exchange research papers on this topic!"
    ],
    suggestedWords: [
      { word: "fascinating", meaning: "lôi cuốn, hấp dẫn" },
      { word: "initiative", meaning: "sáng kiến, dự án mới" },
      { word: "collaborate", meaning: "hợp tác" }
    ],
    advice: "Đặt câu hỏi mở dạng 'What do you think about...' để đối phương thoải mái chia sẻ ý kiến."
  },
  {
    id: "at15",
    name: "Thuyết trình gọi vốn khởi nghiệp",
    nameEn: "Startup Pitching & VC Investor Q&A",
    description: "Trình bày quy mô thị trường, mô hình kinh doanh và trả lời chất vấn của quỹ đầu tư.",
    level: "Advanced",
    goals: [
      { id: "at15_g1", name: "Nêu quy mô thị trường (TAM/SAM)", nameEn: "State market size", keywords: ["market", "billion", "growth", "opportunity", "demand", "tam", "sam"] },
      { id: "at15_g2", name: "Giải thích lợi thế cạnh tranh độc quyền", nameEn: "Explain competitive moat", keywords: ["advantage", "moat", "proprietary", "patent", "ai", "retention", "different"] },
      { id: "at15_g3", name: "Nêu số vốn cần huy động và mục đích", nameEn: "State funding ask", keywords: ["raising", "seed", "series a", "valuation", "runway", "hire", "expand", "scale"] },
    ],
    welcomeMessage: {
      text: "Thanks for joining our investment committee meeting today. Your deck looks promising. Can you walk us through your unit economics and customer acquisition cost?",
      vi: "Cảm ơn bạn đã tham gia buổi họp hội đồng đầu tư hôm nay. Bản thuyết trình của bạn rất hứa hẹn. Bạn có thể phân tích chi tiết về kinh tế đơn vị và chi phí thu hút khách hàng không?"
    },
    suggestions: [
      "Our current Customer Acquisition Cost is $24, while our projected Lifetime Value is $180, giving us a healthy 7.5x LTV-to-CAC ratio.",
      "Our proprietary AI algorithm reduces content generation latency by 70%, creating a substantial technological moat against incumbents.",
      "We are raising a $1.5 million Seed round to expand our engineering team and achieve $2M in annual recurring revenue within 18 months."
    ],
    suggestedWords: [
      { word: "traction", meaning: "sự tăng trưởng thực tế có người dùng" },
      { word: "scalable", meaning: "có thể mở rộng quy mô dễ dàng" },
      { word: "retention", meaning: "tỷ lệ giữ chân người dùng" }
    ],
    advice: "Sử dụng các số liệu thực tế (Hard Metrics: LTV, CAC, MRR, Churn) để tăng tính thuyết phục trước nhà đầu tư."
  },
  {
    id: "at16",
    name: "Trình báo khẩn cấp & Cứu trợ",
    nameEn: "Emergency Assistance & Police Report",
    description: "Báo mất hộ chiếu, tai nạn giao thông hoặc yêu cầu hỗ trợ cảnh sát khẩn cấp.",
    level: "Intermediate",
    goals: [
      { id: "at16_g1", name: "Nêu tình huống khẩn cấp và địa điểm", nameEn: "State emergency and location", keywords: ["emergency", "lost", "stolen", "accident", "police", "street", "passport", "injured"] },
      { id: "at16_g2", name: "Cung cấp chi tiết nhận dạng tài sản/người", nameEn: "Provide details", keywords: ["black", "leather", "bag", "license plate", "cash", "tall", "wearing", "number"] },
      { id: "at16_g3", name: "Nhận mã biên bản trình báo (Police report)", nameEn: "Request report number", keywords: ["report", "embassy", "insurance", "claim", "officer", "document", "copy"] },
    ],
    welcomeMessage: {
      text: "Metropolitan Police Service, Officer Campbell speaking. What is your emergency, and where are you currently located?",
      vi: "Cơ quan Cảnh sát Đô thị xin nghe, tôi là Cảnh sát Campbell. Bạn đang gặp tình huống khẩn cấp gì và hiện đang ở vị trí nào?"
    },
    suggestions: [
      "Officer, my backpack containing my passport and wallet was stolen at the central subway station ten minutes ago.",
      "The bag is dark blue with a silver zipper. It contains my national ID card, credit cards, and cash.",
      "I need an official police report reference number so I can apply for an emergency travel document at my embassy."
    ],
    suggestedWords: [
      { word: "confiscate", meaning: "tịch thu" },
      { word: "statement", meaning: "lời khai chính thức" },
      { word: "incident", meaning: "sự cố, vụ việc" }
    ],
    advice: "Giữ bình tĩnh, nói rõ mốc thời gian và địa điểm chính xác nhất có thể ('at the corner of Oxford Street...')."
  },
  {
    id: "at17",
    name: "Mở tài khoản ngân hàng & Dịch vụ thẻ",
    nameEn: "Bank Account Opening & Advisory",
    description: "Thực hành mở tài khoản quốc tế, kích hoạt Internet Banking và làm thẻ thanh toán.",
    level: "Intermediate",
    goals: [
      { id: "at17_g1", name: "Nêu nhu cầu mở tài khoản", nameEn: "State account purpose", keywords: ["open", "account", "checking", "savings", "card", "debit", "credit"] },
      { id: "at17_g2", name: "Hỏi về biểu phí và số dư tối thiểu", nameEn: "Inquire about fees", keywords: ["fee", "monthly", "minimum", "balance", "maintenance", "charge", "interest"] },
      { id: "at17_g3", name: "Đăng ký ngân hàng điện tử", nameEn: "Setup mobile banking", keywords: ["app", "online", "mobile", "banking", "transfer", "activate", "password"] },
    ],
    welcomeMessage: {
      text: "Good afternoon, welcome to Metro International Bank. How can I assist with your personal banking today?",
      vi: "Xin chào buổi chiều, chào mừng quý khách đến với Ngân hàng Quốc tế Metro. Tôi có thể hỗ trợ gì về dịch vụ ngân hàng cá nhân hôm nay ạ?"
    },
    suggestions: [
      "I would like to open a checking account with an international debit card.",
      "Could you please explain the monthly maintenance fees and minimum balance requirements?",
      "Can I set up mobile banking on my smartphone right away?"
    ],
    suggestedWords: [
      { word: "maintenance fee", meaning: "phí duy trì hàng tháng" },
      { word: "overdraft", meaning: "thấu chi tài khoản" },
      { word: "statement", meaning: "sao kê giao dịch" }
    ],
    advice: "Hỏi rõ về 'foreign transaction fees' (phí giao dịch ngoại tệ) nếu thường xuyên đi công tác hoặc du lịch nước ngoài."
  },
  {
    id: "at18",
    name: "Thuê xe tự lái & Hỗ trợ kỹ thuật",
    nameEn: "Car Rental & Roadside Support",
    description: "Chọn loại xe, mua bảo hiểm thân vỏ và gọi hỗ trợ khi gặp sự cố xẹp lốp hoặc động cơ.",
    level: "Intermediate",
    goals: [
      { id: "at18_g1", name: "Chọn mẫu xe và thời hạn thuê", nameEn: "Select vehicle & rental period", keywords: ["rent", "car", "suv", "sedan", "days", "drop-off", "pickup", "transmission"] },
      { id: "at18_g2", name: "Hỏi về gói bảo hiểm toàn diện", nameEn: "Inquire about insurance", keywords: ["insurance", "collision", "damage", "waiver", "liability", "coverage", "full"] },
      { id: "at18_g3", name: "Yêu cầu cứu hộ khẩn cấp trên đường", nameEn: "Call roadside assistance", keywords: ["flat tire", "engine", "breakdown", "tow", "assistance", "highway", "smoke"] },
    ],
    welcomeMessage: {
      text: "Welcome to Apex Mobility Car Rental. Are you looking to pick up a reservation or make a new car hire booking today?",
      vi: "Chào mừng quý khách đến với Dịch vụ thuê xe Apex Mobility. Quý khách muốn nhận xe đã đặt trước hay muốn thuê xe mới hôm nay ạ?"
    },
    suggestions: [
      "I need a mid-size SUV with automatic transmission for five days starting tomorrow.",
      "I'd like to opt for full comprehensive insurance coverage with zero deductible.",
      "Hello, my rental vehicle has a flat tire on Interstate 95; I need roadside assistance."
    ],
    suggestedWords: [
      { word: "deductible", meaning: "mức miễn bồi thường khấu trừ" },
      { word: "mileage", meaning: "số dặm/km di chuyển" },
      { word: "breakdown", meaning: "hỏng hóc giữa đường" }
    ],
    advice: "Luôn kiểm tra kỹ vết trầy xước bên ngoài xe (pre-existing scratches) trước khi ký nhận chìa khóa."
  },
  {
    id: "at19",
    name: "Phỏng vấn Visa & Thủ tục nhập cảnh",
    nameEn: "Visa & Border Control Interview",
    description: "Trả lời mạch lạc các câu hỏi của viên chức lãnh sự hoặc hải quan về mục đích chuyến đi.",
    level: "Advanced",
    goals: [
      { id: "at19_g1", name: "Nêu rõ mục đích và độ dài chuyến đi", nameEn: "State purpose and duration", keywords: ["purpose", "visit", "conference", "study", "tourism", "weeks", "months", "return"] },
      { id: "at19_g2", name: "Chứng minh tài chính và nơi lưu trú", nameEn: "Prove funds and accommodation", keywords: ["hotel", "sponsor", "funds", "bank", "booking", "staying", "address"] },
      { id: "at19_g3", name: "Chứng minh sự ràng buộc trở về nước", nameEn: "Demonstrate home ties", keywords: ["job", "company", "family", "property", "return ticket", "employer", "contract"] },
    ],
    welcomeMessage: {
      text: "Good morning. Please present your passport and customs declaration. What is the primary purpose of your visit to the United Kingdom?",
      vi: "Chào buổi sáng. Xin vui lòng xuất trình hộ chiếu và tờ khai hải quan. Mục đích chính của chuyến đi đến Vương quốc Anh lần này là gì?"
    },
    suggestions: [
      "I am attending an international renewable energy symposium in Manchester for seven days.",
      "Here is my return flight ticket, hotel confirmation letter, and employer sponsorship grant.",
      "I have strong professional and familial ties in Vietnam, where I manage a regional software development team."
    ],
    suggestedWords: [
      { word: "declaration", meaning: "tờ khai hải quan" },
      { word: "itinerary", meaning: "lịch trình chi tiết" },
      { word: "ties", meaning: "sự ràng buộc pháp lý/gia đình với quê hương" }
    ],
    advice: "Trả lời ngắn gọn, trung thực, mắt nhìn thẳng vào viên chức và không nói vòng vo ngoài phạm vi câu hỏi."
  },
  {
    id: "at20",
    name: "Quán cà phê đặc sản & Small Talk",
    nameEn: "Specialty Coffee Shop & Casual Chat",
    description: "Tập gọi các loại hạt cà phê pha máy/pha thủ công và trò chuyện làm quen nhẹ nhàng.",
    level: "Beginner",
    goals: [
      { id: "at20_g1", name: "Gọi loại đồ uống và cỡ ly", nameEn: "Order beverage & cup size", keywords: ["latte", "cappuccino", "cold brew", "espresso", "oat milk", "medium", "large"] },
      { id: "at20_g2", name: "Tùy chỉnh độ ngọt và loại sữa", nameEn: "Customize sweetness & milk", keywords: ["sugar", "sweet", "milk", "syrup", "ice", "dairy-free", "decaf"] },
      { id: "at20_g3", name: "Bắt đầu cuộc trò chuyện ngắn thân thiện", nameEn: "Initiate casual small talk", keywords: ["weather", "work", "laptop", "book", "busy", "weekend", "place"] },
    ],
    welcomeMessage: {
      text: "Hi there! Welcome to Artisan Roasters. What can I brew fresh for you this morning?",
      vi: "Xin chào! Chào mừng bạn đến với Artisan Roasters. Sáng nay mình có thể pha chế món đồ uống tươi ngon nào cho bạn đây?"
    },
    suggestions: [
      "Can I get an iced oat milk latte with less ice and half sugar, please?",
      "Do you offer any single-origin Ethiopian beans for pour-over filter brew?",
      "It looks pretty cozy in here today. Do you happen to have a spare power outlet near the window?"
    ],
    suggestedWords: [
      { word: "single-origin", meaning: "cà phê đơn nguồn gốc" },
      { word: "dairy-free", meaning: "không chứa sữa động vật" },
      { word: "cozy", meaning: "ấm cúng, dễ chịu" }
    ],
    advice: "Dùng các cụm từ đệm tự nhiên như 'Can I get...' hoặc 'Could I have...' thay vì câu mệnh lệnh cứng nhắc."
  }
];

