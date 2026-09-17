import React from "react";
import { 
  Utensils, 
  Briefcase, 
  Plane, 
  Cpu, 
  ShoppingBag, 
  Navigation 
} from "lucide-react";
import { Topic } from "../types";

export const TOPIC_ICONS: Record<string, React.ReactNode> = {
  at1: React.createElement(Utensils, { className: "w-4 h-4 text-amber-500", strokeWidth: 1.8 }),
  at2: React.createElement(Briefcase, { className: "w-4 h-4 text-[#0059bb]", strokeWidth: 1.8 }),
  at3: React.createElement(Plane, { className: "w-4 h-4 text-emerald-500", strokeWidth: 1.8 }),
  at4: React.createElement(Cpu, { className: "w-4 h-4 text-purple-500", strokeWidth: 1.8 }),
  at5: React.createElement(ShoppingBag, { className: "w-4 h-4 text-rose-500", strokeWidth: 1.8 }),
  at6: React.createElement(Navigation, { className: "w-4 h-4 text-sky-500", strokeWidth: 1.8 }),
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
  }
];
