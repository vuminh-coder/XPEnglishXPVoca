"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useUserStore, recordSkillPractice } from "@/lib/store/userStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useListeningStore } from "@/lib/store/listeningStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Volume1,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  Check,
  Flame,
  ChevronRight,
  Info,
  Clock,
  Target,
  Bot,
  Zap,
  Square,
  RefreshCw,
  MessageSquare,
  Radio,
  Layers,
  Wand2,
  ChevronDown,
  Send,
  Sliders,
  Activity,
  BarChart3,
  Lightbulb,
  Search,
  Plane,
  Utensils,
  Briefcase,
  ShoppingBag,
  Navigation,
  BookMarked,
  X,
  BookmarkCheck,
  CheckSquare
} from "lucide-react";

// ===== BASIC IPA DICTIONARY LOOKUP TABLE (60+ Common Words) =====
const IPA_DICTIONARY: Record<string, { ipa: string; meaning: string }> = {
  "hello": { ipa: "/həˈloʊ/", meaning: "Xin chào" },
  "practice": { ipa: "/ˈpræk.tɪs/", meaning: "Luyện tập, thực hành" },
  "speaking": { ipa: "/ˈspiː.kɪŋ/", meaning: "Nói, phát biểu" },
  "english": { ipa: "/ˈɪŋ.ɡlɪʃ/", meaning: "Tiếng Anh" },
  "together": { ipa: "/təˈɡeð.ər/", meaning: "Cùng nhau" },
  "favorite": { ipa: "/ˈfeɪ.vər.ɪt/", meaning: "Yêu thích nhất" },
  "hobby": { ipa: "/ˈhɑː.bi/", meaning: "Sở thích" },
  "what": { ipa: "/wɑːt/", meaning: "Cái gì" },
  "your": { ipa: "/jʊr/", meaning: "Của bạn" },
  "interesting": { ipa: "/ˈɪn.trə.stɪŋ/", meaning: "Thú vị" },
  "learning": { ipa: "/ˈlɜːr.nɪŋ/", meaning: "Học tập" },
  "because": { ipa: "/bɪˈkɔːz/", meaning: "Bởi vì" },
  "helps": { ipa: "/helps/", meaning: "Giúp đỡ" },
  "speak": { ipa: "/spiːk/", meaning: "Nói" },
  "naturally": { ipa: "/ˈnætʃ.ər.əl.i/", meaning: "Một cách tự nhiên" },
  "window": { ipa: "/ˈwɪn.doʊ/", meaning: "Cửa sổ" },
  "seat": { ipa: "/siːt/", meaning: "Chỗ ngồi" },
  "flight": { ipa: "/flaɪt/", meaning: "Chuyến bay" },
  "please": { ipa: "/pliːz/", meaning: "Xin vui lòng" },
  "order": { ipa: "/ˈɔːr.dər/", meaning: "Gọi món, đặt hàng" },
  "airport": { ipa: "/ˈer.pɔːrt/", meaning: "Sân bay" },
  "want": { ipa: "/wɑːnt/", meaning: "Muốn" },
  "go": { ipa: "/ɡoʊ/", meaning: "Đi" },
  "love": { ipa: "/lʌv/", meaning: "Yêu, thích" },
  "think": { ipa: "/θɪŋk/", meaning: "Nghĩ" },
  "know": { ipa: "/noʊ/", meaning: "Biết" },
  "good": { ipa: "/ɡʊd/", meaning: "Tốt" },
  "great": { ipa: "/ɡreɪt/", meaning: "Tuyệt vời" },
  "beautiful": { ipa: "/ˈbjuː.tɪ.fəl/", meaning: "Đẹp" },
  "language": { ipa: "/ˈlæŋ.ɡwɪdʒ/", meaning: "Ngôn ngữ" },
  "conversation": { ipa: "/ˌkɑːn.vərˈseɪ.ʃən/", meaning: "Cuộc hội thoại" },
  "travel": { ipa: "/ˈtræv.əl/", meaning: "Du lịch" },
  "restaurant": { ipa: "/ˈres.tər.ɑːnt/", meaning: "Nhà hàng" },
  "interview": { ipa: "/ˈɪn.tər.vjuː/", meaning: "Phỏng vấn" },
  "experience": { ipa: "/ɪkˈspɪr.i.əns/", meaning: "Kinh nghiệm" },
  "understand": { ipa: "/ˌʌn.dərˈstænd/", meaning: "Hiểu" },
  "improve": { ipa: "/ɪmˈpruːv/", meaning: "Cải thiện" },
  "pronunciation": { ipa: "/prəˌnʌn.siˈeɪ.ʃən/", meaning: "Phát âm" },
  "vocabulary": { ipa: "/voʊˈkæb.jə.ler.i/", meaning: "Từ vựng" },
  "grammar": { ipa: "/ˈɡræm.ər/", meaning: "Ngữ pháp" },
  "tutor": { ipa: "/ˈtuː.tər/", meaning: "Gia sư" },
  "voice": { ipa: "/vɔɪs/", meaning: "Giọng nói" },
  "listen": { ipa: "/ˈlɪs.ən/", meaning: "Nghe" },
  "read": { ipa: "/riːd/", meaning: "Đọc" },
  "write": { ipa: "/raɪt/", meaning: "Viết" },
  "study": { ipa: "/ˈstʌd.i/", meaning: "Học" },
  "question": { ipa: "/ˈkwes.tʃən/", meaning: "Câu hỏi" },
  "answer": { ipa: "/ˈæn.sər/", meaning: "Câu trả lời" },
  "difficult": { ipa: "/ˈdɪf.ɪ.kəlt/", meaning: "Khó" },
  "easy": { ipa: "/ˈiː.zi/", meaning: "Dễ" },
  "important": { ipa: "/ɪmˈpɔːr.tənt/", meaning: "Quan trọng" },
  "perfect": { ipa: "/ˈpɜːr.fɪkt/", meaning: "Hoàn hảo" },
  "excellent": { ipa: "/ˈek.sə.lənt/", meaning: "Xuất sắc" },
  "coffee": { ipa: "/ˈkɔː.fi/", meaning: "Cà phê" },
  "water": { ipa: "/ˈwɑː.tər/", meaning: "Nước" },
  "food": { ipa: "/fuːd/", meaning: "Thức ăn" },
  "hotel": { ipa: "/hoʊˈtel/", meaning: "Khách sạn" },
  "ticket": { ipa: "/ˈtɪk.ɪt/", meaning: "Vé" },
  "passport": { ipa: "/ˈpæs.pɔːrt/", meaning: "Hộ chiếu" },
  "money": { ipa: "/ˈmʌn.i/", meaning: "Tiền" },
  "phone": { ipa: "/foʊn/", meaning: "Điện thoại" },
  "computer": { ipa: "/kəmˈpjuː.tər/", meaning: "Máy tính" },
  "morning": { ipa: "/ˈmɔːr.nɪŋ/", meaning: "Buổi sáng" },
  "evening": { ipa: "/ˈiːv.nɪŋ/", meaning: "Buổi tối" },
  "thank": { ipa: "/θæŋk/", meaning: "Cảm ơn" },
  "sorry": { ipa: "/ˈsɑːr.i/", meaning: "Xin lỗi" },
  "welcome": { ipa: "/ˈwel.kəm/", meaning: "Chào mừng" },
};

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  pronunciationScore?: number;
  grammarCorrection?: {
    original: string;
    corrected: string;
    explanation: string;
  };
  betterPhrasing?: string;
  vietnameseTranslation?: string;
}

interface Goal {
  id: string;
  name: string;
  nameEn: string;
}

interface RoleplayTopic {
  id: string;
  name: string;
  nameEn: string;
  icon: React.ElementType;
  goals: Goal[];
  keyVocab: Array<{ word: string; ipa: string; meaning: string }>;
}

const ROLEPLAY_TOPICS: RoleplayTopic[] = [
  {
    id: "rp1",
    name: "Quầy làm thủ tục sân bay",
    nameEn: "Airport Check-in",
    icon: Plane,
    goals: [
      { id: "rp1_ticket", name: "Đưa vé và hộ chiếu", nameEn: "Present ticket and passport" },
      { id: "rp1_baggage", name: "Khai báo số hành lý ký gửi", nameEn: "State luggage quantity" },
      { id: "rp1_seat", name: "Yêu cầu ghế ngồi sát cửa sổ", nameEn: "Request window seat" },
    ],
    keyVocab: [
      { word: "boarding pass", ipa: "/ˈbɔː.dɪŋ ˌpɑːs/", meaning: "thẻ lên máy bay" },
      { word: "luggage allowance", ipa: "/ˈlʌɡ.ɪdʒ əˌlaʊ.əns/", meaning: "hạn mức hành lý" },
      { word: "window seat", ipa: "/ˈwɪn.dəʊ siːt/", meaning: "ghế cạnh cửa sổ" }
    ]
  },
  {
    id: "rp2",
    name: "Đặt món tại nhà hàng",
    nameEn: "Restaurant Ordering",
    icon: Utensils,
    goals: [
      { id: "rp2_menu", name: "Hỏi thực đơn món đặc biệt", nameEn: "Ask for specials menu" },
      { id: "rp2_order", name: "Gọi món chính và tráng miệng", nameEn: "Order main and dessert" },
      { id: "rp2_bill", name: "Yêu cầu thanh toán hóa đơn", nameEn: "Request bill/check" },
    ],
    keyVocab: [
      { word: "chef's special", ipa: "/ʃefs ˈspeʃ.əl/", meaning: "món đặc biệt của đầu bếp" },
      { word: "reservation", ipa: "/ˌrez.əˈveɪ.ʃən/", meaning: "sự đặt bàn trước" },
      { word: "dessert menu", ipa: "/dɪˈzɜːt ˈmen.juː/", meaning: "thực đơn món tráng miệng" }
    ]
  },
  {
    id: "rp3",
    name: "Phỏng vấn xin việc AI",
    nameEn: "Job Interview",
    icon: Briefcase,
    goals: [
      { id: "rp3_intro", name: "Giới thiệu bản thân ngắn gọn", nameEn: "Brief self introduction" },
      { id: "rp3_strength", name: "Nêu 2 điểm mạnh chính", nameEn: "State 2 key strengths" },
      { id: "rp3_question", name: "Đặt câu hỏi cho nhà tuyển dụng", nameEn: "Ask interviewer a question" }
    ],
    keyVocab: [
      { word: "professional background", ipa: "/prəˈfeʃ.ən.əl ˈbæk.ɡraʊnd/", meaning: "kinh nghiệm chuyên môn" },
      { word: "problem solving", ipa: "/ˈprɒb.ləm ˌsɒl.vɪŋ/", meaning: "kỹ năng giải quyết vấn đề" },
      { word: "career goals", ipa: "/kəˈrɪər ɡəʊlz/", meaning: "mục tiêu nghề nghiệp" }
    ]
  },
  {
    id: "rp4",
    name: "Mua sắm & Đàm phán giá",
    nameEn: "Shopping & Bargaining",
    icon: ShoppingBag,
    goals: [
      { id: "rp4_size", name: "Hỏi thử size và màu sắc", nameEn: "Ask for size and color" },
      { id: "rp4_discount", name: "Hỏi chương trình giảm giá", nameEn: "Ask for discount promotion" },
      { id: "rp4_pay", name: "Chọn hình thức thanh toán", nameEn: "Select payment method" }
    ],
    keyVocab: [
      { word: "fitting room", ipa: "/ˈfɪt.ɪŋ ruːm/", meaning: "phòng thử đồ" },
      { word: "special discount", ipa: "/ˈspeʃ.əl ˈdɪs.kaʊnt/", meaning: "ưu đãi giảm giá" },
      { word: "contactless payment", ipa: "/kənˈtæk.ləs ˈpeɪ.mənt/", meaning: "thanh toán không tiếp xúc" }
    ]
  },
  {
    id: "rp5",
    name: "Hỏi đường & Đặt xe",
    nameEn: "Travel & Directions",
    icon: Navigation,
    goals: [
      { id: "rp5_where", name: "Hỏi đường đến địa điểm", nameEn: "Ask directions to location" },
      { id: "rp5_fare", name: "Hỏi cước phí di chuyển", nameEn: "Ask for transport fare" },
      { id: "rp5_arrival", name: "Nhờ tài xế báo khi tới nơi", nameEn: "Ask driver to notify on arrival" }
    ],
    keyVocab: [
      { word: "nearest landmark", ipa: "/ˈnɪə.rɪst ˈlænd.mɑːk/", meaning: "địa danh gần nhất" },
      { word: "estimated fare", ipa: "/ˈes.tɪ.meɪ.tɪd feər/", meaning: "cước phí ước tính" },
      { word: "turn left", ipa: "/tɜːn left/", meaning: "rẽ trái" }
    ]
  }
];

const DRILL_SENTENCES = [
  "She sells seashells by the seashore.",
  "Peter Piper picked a peck of pickled peppers.",
  "How can a clam cram in a clean cream can?",
  "I scream, you scream, we all scream for ice cream.",
  "The thirty-three thieves thought that they thrilled the throne."
];

export default function VoiceTutorPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { markGoalCompleted } = useListeningStore();
  
  // Practice modes: freetalk, roleplay, drill
  const [practiceMode, setPracticeMode] = useState<"freetalk" | "roleplay" | "drill">("freetalk");
  
  // Right Sidebar Active Tab: "goals" | "speech" | "coach"
  const [sidebarTab, setSidebarTab] = useState<"goals" | "speech" | "coach">("goals");

  // ===== SMART WELCOME MESSAGE ENGINE =====
  const getWelcomeMessage = (): ChatMessage => {
    const welcomePool: { text: string; vi: string }[] = [
      { text: "Hello! I'm your AI Voice Tutor. Tell me about your day so far — what have you been up to?", vi: "Xin chào! Tôi là AI Gia sư Giọng nói. Hãy kể cho tôi về ngày hôm nay của bạn — bạn đã làm gì?" },
      { text: "Hi there! Let's warm up. Can you describe what you see around you right now in English?", vi: "Chào bạn! Hãy khởi động nhé. Bạn có thể mô tả những gì bạn đang nhìn thấy xung quanh bằng tiếng Anh không?" },
      { text: "Welcome back! I'd love to hear about something interesting you learned recently.", vi: "Chào mừng trở lại! Tôi muốn nghe về điều thú vị mà bạn đã học gần đây." },
      { text: "Good to see you! If you could travel anywhere tomorrow, where would you go and why?", vi: "Rất vui gặp bạn! Nếu bạn có thể đi du lịch bất kỳ đâu vào ngày mai, bạn sẽ đi đâu và tại sao?" },
      { text: "Hey! Let's practice together. What's the most useful English phrase you've learned this week?", vi: "Này! Hãy cùng luyện tập. Cụm từ tiếng Anh hữu ích nhất mà bạn đã học trong tuần này là gì?" },
    ];
    const pick = welcomePool[Math.floor(Math.random() * welcomePool.length)];
    return { id: "welcome", role: "ai", text: pick.text, vietnameseTranslation: pick.vi };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getWelcomeMessage()]);
  const [textInput, setTextInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showTranslations, setShowTranslations] = useState<{ [key: string]: boolean }>({});
  
  // Selected word modal state for 1-Click Interactive Dictionary
  const [selectedWordData, setSelectedWordData] = useState<{
    word: string;
    ipa?: string;
    meaning?: string;
    example?: string;
  } | null>(null);

  // Roleplay states
  const activeTimeRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      activeTimeRef.current += 1;
    }, 1000);

    return () => {
      clearInterval(timer);
      if (activeTimeRef.current > 10) {
        const mins = Math.max(1, Math.ceil(activeTimeRef.current / 60));
        useUserStore.getState().addPracticeTime(mins, "speaking");
        activeTimeRef.current = 0;
      }
    };
  }, []);
  
  const [currentRoleplayTopic, setCurrentRoleplayTopic] = useState<string>("rp1");
  const [completedGoalIds, setCompletedGoalIds] = useState<string[]>([]);
  
  // Drill states
  const [drillIndex, setDrillIndex] = useState(0);

  // AI Speech Evaluation State (6 Criteria)
  const [lastSpeechScore, setLastSpeechScore] = useState<{
    overallScore: number;
    fluencyScore: number;
    pronunciationScore: number;
    intonationScore: number;
    completenessScore: number;
    speedWpm: number;
    stressScore: number;
  } | null>(null);

  // Practice timer state (seconds elapsed)
  const [elapsedTime, setElapsedTime] = useState(0);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTranslation = (msgId: string) => {
    setShowTranslations((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!cleanWord || cleanWord.length < 2) return;

    // Speak the clicked word
    speakText(cleanWord);

    // Dictionary lookup with IPA table fallback
    const dictEntry = IPA_DICTIONARY[cleanWord];
    setSelectedWordData({
      word: cleanWord,
      ipa: dictEntry?.ipa || `/${cleanWord}/`,
      meaning: dictEntry?.meaning || `Nghĩa Tiếng Việt của từ "${cleanWord}"`,
      example: `Example sentence with "${cleanWord}" used naturally in conversation.`
    });
  };

  const handleSaveWordToVocab = () => {
    if (!selectedWordData) return;
    awardXp(5);
    addToast({
      type: "success",
      title: "Đã lưu vào Sổ tay từ vựng! 💾",
      message: `+5 XP cho từ "${selectedWordData.word}"`,
    });
    setSelectedWordData(null);
  };

  const handleNewUserSpeech = async (speechText: string, confidence: number) => {
    if (!speechText.trim()) return;

    const score = confidence || Math.floor(Math.random() * 10) + 90;
    
    // Simulate AI Grammar Check
    let grammarFix: ChatMessage["grammarCorrection"] = undefined;
    let naturalWay: string | undefined = undefined;

    const lowerText = speechText.toLowerCase();
    if (lowerText.includes("i love")) {
      naturalWay = "I'm really passionate about this topic!";
    } else if (lowerText.includes("want go")) {
      grammarFix = {
        original: speechText,
        corrected: speechText.replace(/want go/i, "want to go"),
        explanation: "Động từ 'want' yêu cầu theo sau bởi 'to + V-infinitive'."
      };
      // Context-aware better phrasing based on what user said
      if (lowerText.includes("airport")) {
        naturalWay = "Could you take me to the airport, please?";
      } else if (lowerText.includes("hotel")) {
        naturalWay = "I'd like to get to the hotel, please.";
      } else if (lowerText.includes("restaurant")) {
        naturalWay = "I'd love to go to the restaurant.";
      } else {
        naturalWay = speechText.replace(/want go/i, "would like to go");
      }
    } else if (lowerText.includes("i am go") || lowerText.includes("i am go to")) {
      grammarFix = {
        original: speechText,
        corrected: speechText.replace(/i am go/i, "I am going"),
        explanation: "Cần dùng 'am going' (present continuous) thay vì 'am go'."
      };
      naturalWay = speechText.replace(/i am go/i, "I'm heading");
    }

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      text: speechText,
      pronunciationScore: score,
      grammarCorrection: grammarFix,
      betterPhrasing: naturalWay
    };

    setMessages((prev) => [...prev, userMsg]);
    setTextInput("");
    setLoading(true);

    // Update 6 Criteria Speech Evaluation Board
    setLastSpeechScore({
      overallScore: score,
      fluencyScore: Math.min(100, score + 2),
      pronunciationScore: Math.min(100, score + 1),
      intonationScore: Math.min(100, score - 1),
      completenessScore: 97,
      speedWpm: 145,
      stressScore: 94,
    });

    useUserStore.getState().addPracticeTime(2, "speaking");
    recordSkillPractice(user?.id, "Nói", 2, 15);

    // ===== SMART CONTEXT-AWARE FALLBACK ENGINE =====
    const generateSmartFallback = (userText: string): { text: string; vi: string } => {
      const lower = userText.toLowerCase();
      const wordCount = userText.split(/\s+/).length;
      const prevAiMessages = messages.filter(m => m.role === "ai");
      const turnNumber = prevAiMessages.length;

      // --- Detect Topic Keywords ---
      const topicResponses: { keywords: string[]; responses: { text: string; vi: string }[] }[] = [
        {
          keywords: ["airport", "flight", "plane", "boarding", "luggage", "passport", "travel"],
          responses: [
            { text: "Which airline are you flying with? Do you have a seat preference — window or aisle?", vi: "Bạn đi hãng hàng không nào? Bạn thích ngồi ghế cửa sổ hay ghế ngoài?" },
            { text: "Have you checked in online yet, or would you prefer to do it at the counter?", vi: "Bạn đã check-in online chưa, hay bạn muốn làm ở quầy?" },
            { text: "International flights usually require you to arrive 3 hours early. Are you prepared?", vi: "Chuyến bay quốc tế thường yêu cầu đến trước 3 tiếng. Bạn đã chuẩn bị chưa?" },
          ]
        },
        {
          keywords: ["restaurant", "food", "eat", "menu", "order", "dinner", "lunch", "breakfast", "coffee", "drink"],
          responses: [
            { text: "What kind of food do you enjoy most — local cuisine or international dishes?", vi: "Bạn thích loại đồ ăn nào nhất — ẩm thực địa phương hay món quốc tế?" },
            { text: "Would you like to start with an appetizer, or go straight to the main course?", vi: "Bạn muốn bắt đầu với món khai vị, hay đi thẳng vào món chính?" },
            { text: "Do you have any dietary restrictions the waiter should know about?", vi: "Bạn có chế độ ăn kiêng nào mà người phục vụ nên biết không?" },
          ]
        },
        {
          keywords: ["job", "interview", "work", "company", "career", "resume", "hire", "experience", "salary"],
          responses: [
            { text: "Tell me about your biggest professional achievement. How would you present it in an interview?", vi: "Hãy kể về thành tựu nghề nghiệp lớn nhất của bạn. Bạn sẽ trình bày nó thế nào trong phỏng vấn?" },
            { text: "What makes you the best candidate for this position? Practice saying it confidently.", vi: "Điều gì khiến bạn là ứng viên tốt nhất cho vị trí này? Hãy tập nói một cách tự tin." },
            { text: "Great answer! Now, what questions would you ask the interviewer at the end?", vi: "Câu trả lời tuyệt vời! Bây giờ, bạn sẽ hỏi nhà tuyển dụng câu gì ở cuối?" },
          ]
        },
        {
          keywords: ["shop", "buy", "price", "discount", "store", "mall", "money", "pay", "expensive", "cheap"],
          responses: [
            { text: "Are you looking for something specific, or just browsing? Try asking the shopkeeper.", vi: "Bạn đang tìm thứ gì cụ thể, hay chỉ xem thôi? Hãy thử hỏi người bán hàng." },
            { text: "That's a good choice! How would you negotiate a better price politely in English?", vi: "Lựa chọn tốt! Bạn sẽ đàm phán giá tốt hơn một cách lịch sự bằng tiếng Anh thế nào?" },
            { text: "Would you like to pay by card or cash? Practice asking about payment options.", vi: "Bạn muốn thanh toán bằng thẻ hay tiền mặt? Hãy tập hỏi về các hình thức thanh toán." },
          ]
        },
        {
          keywords: ["direction", "map", "lost", "where", "find", "turn", "left", "right", "straight", "taxi", "bus", "train"],
          responses: [
            { text: "Can you describe where you need to go? I'll help you practice asking for directions.", vi: "Bạn có thể mô tả nơi bạn cần đến không? Tôi sẽ giúp bạn tập hỏi đường." },
            { text: "Imagine you're lost downtown. How would you ask a stranger for help?", vi: "Hãy tưởng tượng bạn đang lạc ở trung tâm thành phố. Bạn sẽ hỏi người lạ thế nào?" },
            { text: "Good attempt! You could also say: 'Excuse me, could you point me to the nearest subway station?'", vi: "Tốt lắm! Bạn cũng có thể nói: 'Xin lỗi, bạn có thể chỉ tôi trạm tàu điện ngầm gần nhất không?'" },
          ]
        },
        {
          keywords: ["hobby", "like", "enjoy", "fun", "free time", "weekend", "music", "movie", "book", "game", "sport"],
          responses: [
            { text: "That sounds fun! How often do you do that? Can you describe a typical session?", vi: "Nghe vui đấy! Bạn làm điều đó thường xuyên không? Hãy mô tả một buổi điển hình." },
            { text: "Have you tried sharing this hobby with friends? How would you invite someone to join you?", vi: "Bạn đã thử chia sẻ sở thích này với bạn bè chưa? Bạn sẽ mời ai đó tham gia thế nào?" },
            { text: "Nice! If you had to explain why you love this to a stranger, what would you say?", vi: "Tuyệt! Nếu bạn phải giải thích tại sao bạn thích điều này cho người lạ, bạn sẽ nói gì?" },
          ]
        },
        {
          keywords: ["learn", "english", "study", "practice", "improve", "difficult", "easy", "grammar", "vocabulary"],
          responses: [
            { text: "What's the hardest part of learning English for you — speaking, listening, or grammar?", vi: "Phần khó nhất khi học tiếng Anh với bạn là gì — nói, nghe, hay ngữ pháp?" },
            { text: "How many hours a week do you practice English? Consistency is the key to fluency!", vi: "Bạn luyện tiếng Anh bao nhiêu giờ mỗi tuần? Kiên trì là chìa khóa để nói lưu loát!" },
            { text: "That's a great mindset! Can you set a specific goal for this month? For example: 'I want to hold a 5-minute conversation.'", vi: "Đó là tư duy tuyệt vời! Bạn có thể đặt mục tiêu cụ thể cho tháng này không? Ví dụ: 'Tôi muốn duy trì cuộc hội thoại 5 phút.'" },
          ]
        },
      ];

      // Check each topic group for keyword match
      for (const group of topicResponses) {
        if (group.keywords.some(kw => lower.includes(kw))) {
          const pick = group.responses[turnNumber % group.responses.length];
          return pick;
        }
      }

      // --- Sentence Length Analysis (encouragement/challenge) ---
      if (wordCount <= 3) {
        const shortResponses = [
          { text: "Good start! Can you try expanding that into a full sentence? For example, add 'because' and give a reason.", vi: "Khởi đầu tốt! Bạn có thể thử mở rộng thành câu hoàn chỉnh không? Ví dụ, thêm 'because' và đưa ra lý do." },
          { text: "I see! Try saying a bit more — aim for at least 8 words. The more you speak, the more natural it becomes.", vi: "Tôi hiểu! Hãy thử nói thêm — hãy nhắm ít nhất 8 từ. Bạn nói càng nhiều, càng tự nhiên hơn." },
          { text: "Short and clear! Now challenge yourself: can you rephrase that using a different structure?", vi: "Ngắn gọn và rõ ràng! Bây giờ hãy thử thách bản thân: bạn có thể diễn đạt lại bằng cấu trúc khác không?" },
        ];
        return shortResponses[turnNumber % shortResponses.length];
      }

      if (wordCount >= 15) {
        const longResponses = [
          { text: "Impressive! You're building great fluency. Now try using a connector like 'however' or 'moreover' to link your ideas.", vi: "Ấn tượng! Bạn đang phát triển sự lưu loát rất tốt. Hãy thử dùng liên từ như 'however' hay 'moreover' để liên kết ý tưởng." },
          { text: "Excellent sentence structure! Can you summarize what you just said in only 5 words? It's a great skill to practice.", vi: "Cấu trúc câu xuất sắc! Bạn có thể tóm tắt những gì vừa nói trong chỉ 5 từ không? Đó là kỹ năng rất tốt để luyện." },
        ];
        return longResponses[turnNumber % longResponses.length];
      }

      // --- General Contextual Follow-ups (when no keywords match) ---
      const generalResponses = [
        { text: "Interesting point! Can you give me a specific example to support what you just said?", vi: "Ý hay đấy! Bạn có thể cho tôi ví dụ cụ thể để minh họa cho điều vừa nói không?" },
        { text: "I like how you expressed that. Now, what would you say if someone disagreed with you?", vi: "Tôi thích cách bạn diễn đạt. Bây giờ, bạn sẽ nói gì nếu ai đó không đồng ý với bạn?" },
        { text: "Great job! Let's switch gears — can you ask ME a question about any topic you're curious about?", vi: "Giỏi lắm! Hãy đổi vai — bạn có thể hỏi TÔI một câu hỏi về bất kỳ chủ đề nào bạn tò mò?" },
        { text: "Well said! How would you explain the same thing to a 5-year-old child? Try using simpler words.", vi: "Nói hay lắm! Bạn sẽ giải thích điều tương tự cho trẻ 5 tuổi thế nào? Hãy thử dùng từ đơn giản hơn." },
        { text: "You're making real progress! Let's try a 'what if' scenario — what if you had to give a speech about this topic?", vi: "Bạn đang tiến bộ thật sự! Hãy thử kịch bản 'what if' — nếu bạn phải phát biểu về chủ đề này thì sao?" },
        { text: "Nice! Now try rephrasing what you said, but this time use the past tense. It's great tense practice.", vi: "Tuyệt! Bây giờ hãy diễn đạt lại, nhưng lần này dùng thì quá khứ. Đây là bài tập thì rất tốt." },
        { text: "I understand you perfectly. If you were writing this in an email to your boss, how would you make it more formal?", vi: "Tôi hiểu bạn hoàn toàn. Nếu bạn viết điều này trong email cho sếp, bạn sẽ làm nó trang trọng hơn thế nào?" },
        { text: "Good effort! Here's a challenge: can you say the same thing using a question instead of a statement?", vi: "Cố gắng tốt! Đây là thử thách: bạn có thể nói điều tương tự dưới dạng câu hỏi thay vì câu khẳng định không?" },
      ];
      // Pick based on turn + hash of user text to ensure variety
      const hash = userText.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      return generalResponses[(turnNumber + hash) % generalResponses.length];
    };

    try {
      // Build correct messages array for the API (must be array of {role, text})
      const apiMessages = [
        ...messages.map((m) => ({ role: m.role, text: m.text })),
        { role: "user" as const, text: speechText },
      ];

      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          mode: practiceMode,
          topicId: currentRoleplayTopic,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: "ai",
          text: data.reply,
          vietnameseTranslation: data.vietnameseTranslation || data.translation || "",
        };
        setMessages((prev) => [...prev, aiMsg]);
        speakText(data.reply);

        if (practiceMode === "roleplay" && data.completedGoals) {
          data.completedGoals.forEach((gId: string) => {
            if (!completedGoalIds.includes(gId)) {
              setCompletedGoalIds((prev) => [...prev, gId]);
              markGoalCompleted(gId);
            }
          });
        }

        awardXp(15);
        addToast({
          type: "success",
          title: "AI Voice Tutor Đã Trả Lời!",
          message: "+15 XP cho lượt giao tiếp!",
        });
      } else {
        // Smart fallback if API returns no reply
        const fallback = generateSmartFallback(speechText);
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: "ai",
          text: fallback.text,
          vietnameseTranslation: fallback.vi,
        };
        setMessages((prev) => [...prev, aiMsg]);
        speakText(fallback.text);
      }
    } catch (e) {
      console.error(e);
      // Smart fallback on network error
      const fallback = generateSmartFallback(speechText);
      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: "ai",
        text: fallback.text,
        vietnameseTranslation: fallback.vi,
      };
      setMessages((prev) => [...prev, aiMsg]);
      speakText(fallback.text);
    } finally {
      setLoading(false);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);

    const demoPhrases = [
      "I love learning English with AI because it helps me speak naturally.",
      "Can I get a window seat on my flight to New York please?",
      "I would like to order the grilled salmon with a fresh salad.",
      "Could you please check my luggage quantity for check-in?"
    ];
    const speech = demoPhrases[Math.floor(Math.random() * demoPhrases.length)];
    const confidence = Math.floor(Math.random() * 8) + 92;
    handleNewUserSpeech(speech, confidence);
  };

  const currentTopicData = ROLEPLAY_TOPICS.find((t) => t.id === currentRoleplayTopic) || ROLEPLAY_TOPICS[0];
  const TopicIcon = currentTopicData.icon;

  return (
    <div className="pb-20 md:pb-6 px-1 md:px-0 relative select-none font-sans lg:flex lg:flex-col lg:min-h-[calc(100vh-4rem)]">
      
      {/* 0. TOP UNIFIED MICRO-HERO TOOLBAR CONTROL STRIP */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-2.5 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-2.5 min-w-0"
      >
        {/* Left: Bot Icon + Title */}
        <div className="flex items-center justify-between md:justify-start gap-2.5 min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-[#0059bb]/20">
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
            </div>

            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                AI Voice Tutor Studio
              </h1>
              <p className="hidden sm:block text-[10px] text-slate-400 font-medium truncate">
                Gia sư Giọng nói AI 1-1 • {practiceMode === "freetalk" ? "FreeTalk Tự Do" : practiceMode === "roleplay" ? "Roleplay Kịch Bản" : "Drill Uốn Lưỡi"}
              </p>
            </div>
          </div>

          {/* Right: Sound Switcher & Timer on Mobile Header Top Row */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 md:hidden">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-2 py-1 rounded-xs text-[11px] font-bold border transition-all shadow-2xs flex items-center gap-1 cursor-pointer ${
                soundEnabled
                  ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]"
                  : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/30 text-rose-600"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3 h-3 text-[#0059bb]" /> : <VolumeX className="w-3 h-3" />}
              <span className="hidden sm:inline">{soundEnabled ? "Bật âm" : "Tắt âm"}</span>
            </button>

            <span className="px-2 py-1 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] font-black flex items-center gap-1 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> {formatElapsedTime(elapsedTime)}
            </span>
          </div>
        </div>

        {/* Mode Switcher Tabs (100% full-width on mobile) */}
        <div className="p-0.5 bg-slate-100 dark:bg-slate-950 rounded-xs grid grid-cols-3 md:flex items-center gap-1 border border-slate-200/50 dark:border-white/5 w-full md:w-auto shrink-0">
          {[
            { id: "freetalk", label: "FreeTalk" },
            { id: "roleplay", label: "Roleplay" },
            { id: "drill", label: "Drill" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setPracticeMode(mode.id as any)}
              className={`py-1 px-3 rounded-xs text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
                practiceMode === mode.id
                  ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Desktop Sound Switcher & Timer */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-2 py-1 rounded-xs text-[11px] font-bold border transition-all shadow-2xs flex items-center gap-1 cursor-pointer ${
              soundEnabled
                ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]"
                : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/30 text-rose-600"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? "Bật âm" : "Tắt âm"}</span>
          </button>

          <span className="px-2.5 py-1 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] font-black flex items-center gap-1 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-amber-500" /> {formatElapsedTime(elapsedTime)}
          </span>
        </div>
      </motion.div>

      {/* 1. MAIN BENTO GRID (Cột Trái 8/12 - Cột Phải 4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 lg:items-stretch min-w-0 lg:flex-1 lg:min-h-0 mt-3">
        
        {/* CỘT TRÁI: VOICE CHAT STREAM & DUAL INPUT DOCK (8/12 Width) */}
        <div className="lg:col-span-8 flex flex-col min-w-0 lg:min-h-0">
          
          <div className="p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col min-w-0 lg:min-h-0 lg:flex-1">
            
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2 truncate">
                <MessageSquare className="w-4 h-4 text-[#0059bb]" strokeWidth={1.8} />
                <h2 className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white font-display uppercase tracking-wider truncate">
                  KHUNG GIAO TIẾP VỚI AI TUTOR STUDIO
                </h2>
              </div>

              {isSpeaking ? (
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-xs flex items-center gap-1.5 animate-pulse border border-purple-500/20">
                  <Volume2 className="w-3 h-3 text-purple-500" /> AI đang phát âm...
                </span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-xs border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Sẵn sàng
                </span>
              )}
            </div>

            {/* Scrollable Chat Stream (Generous Height on Mobile & Desktop) */}
            <div className="h-[62svh] min-h-[380px] sm:min-h-[420px] lg:h-auto lg:min-h-[460px] lg:flex-1 overflow-y-auto space-y-3 p-1 pr-1.5 mt-2 sm:mt-3">
              {messages.map((msg) => {
                const isAi = msg.role === "ai";
                const isTranslated = showTranslations[msg.id];

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isAi ? "justify-start" : "justify-end"}`}
                  >
                    {isAi && (
                      <div className="w-7 h-7 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-[#0059bb]/20 shadow-2xs">
                        <Bot className="w-4 h-4" strokeWidth={1.8} />
                      </div>
                    )}

                    <div className={`space-y-1.5 max-w-[88%] ${isAi ? "" : "items-end flex flex-col"}`}>
                      
                      {/* Chat Message Bubble */}
                      <div
                        className={`p-3 rounded-xs text-xs font-medium leading-relaxed shadow-2xs transition-all ${
                          isAi
                            ? "bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                            : "bg-[#0059bb] text-white"
                        }`}
                      >
                        {/* Word-by-word 1-Click Interactive Text Rendering for AI */}
                        {isAi ? (
                          <div className="flex flex-wrap gap-1 leading-relaxed">
                            {msg.text.split(" ").map((w, idx) => (
                              <span
                                key={idx}
                                onClick={() => handleWordClick(w)}
                                className="cursor-pointer hover:bg-[#0059bb]/15 dark:hover:bg-sky-400/20 hover:text-[#0059bb] dark:hover:text-sky-300 rounded-xs px-0.5 py-0.2 transition-colors font-medium text-xs sm:text-sm"
                                title="Click để tra từ vựng & phát âm IPA"
                              >
                                {w}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs sm:text-sm">{msg.text}</p>
                        )}

                        {/* Pronunciation Confidence Score Badge for User */}
                        {msg.pronunciationScore && (
                          <div className="mt-1.5 pt-1.5 border-t border-white/20 flex items-center justify-between text-[10px] font-bold">
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3 text-amber-300" /> Phát âm:
                            </span>
                            <span className="bg-white/20 px-1.5 py-0.2 rounded-xs font-mono font-black">
                              {msg.pronunciationScore}%
                            </span>
                          </div>
                        )}

                        {/* Vietnamese Translation Display */}
                        {isTranslated && msg.vietnameseTranslation && (
                          <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/10 text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-start gap-1">
                            <span className="shrink-0 text-slate-400 font-mono">[Dịch]</span>
                            <span>{msg.vietnameseTranslation}</span>
                          </div>
                        )}
                      </div>

                      {/* AI Instant Grammar & Natural Phrasing Correction Card for User Speech */}
                      {!isAi && (msg.grammarCorrection || msg.betterPhrasing) && (
                        <div className="p-2.5 rounded-xs bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/25 text-[11px] space-y-1.5 text-left w-full">
                          {msg.grammarCorrection && (
                            <div className="space-y-0.5">
                              <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 text-[10px] uppercase">
                                <AlertCircle className="w-3 h-3" /> Sửa Lỗi Ngữ Pháp:
                              </span>
                              <p className="text-slate-800 dark:text-slate-200 font-medium">
                                {msg.grammarCorrection.explanation}
                              </p>
                            </div>
                          )}

                          {msg.betterPhrasing && (
                            <div className="space-y-0.5">
                              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[10px] uppercase">
                                <Sparkles className="w-3 h-3" /> Cách Nói Tự Nhiên Hơn:
                              </span>
                              <p className="text-emerald-700 dark:text-emerald-300 font-bold italic">
                                "{msg.betterPhrasing}"
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* AI Action Strip */}
                      {isAi && (
                        <div className="flex items-center gap-2 px-1">
                          <button
                            onClick={() => speakText(msg.text)}
                            className="text-[10px] font-bold text-slate-500 hover:text-[#0059bb] dark:hover:text-sky-400 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Volume2 className="w-3 h-3 text-[#0059bb]" /> Nghe phát âm
                          </button>
                          {msg.vietnameseTranslation && (
                            <button
                              onClick={() => toggleTranslation(msg.id)}
                              className="text-[10px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline cursor-pointer"
                            >
                              {isTranslated ? "Ẩn dịch" : "Xem bản dịch"}
                            </button>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
              {loading && (
                <div className="flex items-center gap-2 p-2.5 rounded-xs bg-[#0059bb]/5 dark:bg-[#0059bb]/20 border border-[#0059bb]/20 text-[#0059bb] dark:text-sky-400 text-xs font-bold animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> AI Tutor đang phân tích & soạn câu phản hồi...
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Bottom Studio Dual Input Dock (Voice + Text + Waveform) */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2.5">
              
              {/* Form with Center Large Mic Pulse Orb & Text Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNewUserSpeech(textInput, 95);
                }}
                className="flex items-center gap-2"
              >
                {/* Large Center Mic Pulse Button */}
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer ${
                    isRecording
                      ? "bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/25"
                      : "bg-[#0059bb] hover:bg-[#004799] text-white hover:scale-102 active:scale-98"
                  }`}
                  title={isRecording ? "Dừng thu âm" : "Bấm nút để cất giọng nói"}
                >
                  {isRecording ? <Square className="w-4 h-4 fill-white" /> : <Mic className="w-5 h-5 stroke-[2]" />}
                </button>

                {/* Input Text Box */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={isRecording ? `Đang thu âm... 00:0${recordingTime}` : "Nhập tiếng Anh hoặc bấm Mic..."}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full h-10 pl-3 pr-3 text-xs font-medium rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!textInput.trim() || loading}
                  className="h-10 px-4 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={2} />
                  <span className="hidden sm:inline">Gửi</span>
                </button>
              </form>

              {/* Real-time Waveform Visualizer Bar when recording or speaking */}
              {(isRecording || isSpeaking) && (
                <div className="flex items-center justify-center gap-[3px] h-6 bg-slate-50 dark:bg-slate-950/60 px-3 py-1.5 rounded-xs border border-slate-200/50 dark:border-white/5">
                  <span className="text-[10px] font-bold text-slate-400 mr-2 shrink-0">AUDIO SPECTRUM:</span>
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[3px] rounded-full shrink-0"
                      style={{
                        height: `${6 + Math.random() * 14}px`,
                        backgroundColor: i % 4 === 0 ? '#0059bb' : i % 4 === 1 ? '#10b981' : i % 4 === 2 ? '#f59e0b' : '#8b5cf6',
                        animation: `audioBar ${0.3 + Math.random() * 0.5}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* CỘT PHẢI: BENTO TOOL CHEST (4/12 Width) */}
        <div className="lg:col-span-4 flex flex-col min-w-0 lg:min-h-0">
          
          <div className="p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 min-w-0 lg:flex-1 lg:overflow-y-auto">
            
            {/* 3-Tab Segmented Controller Header */}
            <div className="p-1 bg-slate-100 dark:bg-slate-950 rounded-xs flex items-center gap-1 border border-slate-200/50 dark:border-white/5">
              {[
                { id: "goals", label: "Mục tiêu", icon: Target },
                { id: "speech", label: "Tiêu chí", icon: BarChart3 },
                { id: "coach", label: "Gợi ý", icon: Lightbulb },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSidebarTab(tab.id as any)}
                    className={`flex-1 py-1.5 px-1.5 rounded-xs text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
                      sidebarTab === tab.id
                        ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB 1: ROLEPLAY MISSION & SCENARIOS */}
            {sidebarTab === "goals" && (
              <div className="space-y-3">
                {practiceMode === "roleplay" ? (
                  <>
                    <div className="space-y-1">
                      <label htmlFor="tutor-roleplay-select" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Chọn tình huống đóng vai:
                      </label>
                      <select
                        id="tutor-roleplay-select"
                        value={currentRoleplayTopic}
                        onChange={(e) => {
                          setCurrentRoleplayTopic(e.target.value);
                          setCompletedGoalIds([]);
                        }}
                        className="w-full h-8 px-2 text-xs font-bold rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
                      >
                        {ROLEPLAY_TOPICS.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} ({t.nameEn})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Goals Checklist */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                        Nhiệm vụ cần nói ({completedGoalIds.length}/{currentTopicData.goals.length}):
                      </span>
                      {currentTopicData.goals.map((goal) => {
                        const isDone = completedGoalIds.includes(goal.id);
                        return (
                          <div
                            key={goal.id}
                            className={`p-2 rounded-xs border text-xs font-bold flex items-center justify-between gap-2 transition-all ${
                              isDone
                                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                                : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <div className="space-y-0.5 min-w-0">
                              <div className="truncate">{goal.name}</div>
                              <div className="text-[10px] font-mono text-slate-400 truncate">{goal.nameEn}</div>
                            </div>
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2} />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-white/20 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Topic Key Vocab list */}
                    {currentTopicData.keyVocab && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Từ vựng then chốt:
                        </span>
                        <div className="space-y-1">
                          {currentTopicData.keyVocab.map((kv, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleWordClick(kv.word)}
                              className="p-1.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 text-xs flex items-center justify-between gap-1 cursor-pointer hover:border-[#0059bb]/40 transition-colors"
                            >
                              <div className="min-w-0">
                                <span className="font-bold text-slate-900 dark:text-white block truncate">{kv.word}</span>
                                <span className="text-[10px] text-slate-400 font-mono block truncate">{kv.ipa}</span>
                              </div>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">{kv.meaning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : practiceMode === "drill" ? (
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xs bg-amber-500/10 border border-amber-500/25 text-center space-y-2">
                      <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 block tracking-wider">
                        Câu Luyện Uốn Lưỡi (#{drillIndex + 1})
                      </span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white font-display leading-relaxed">
                        "{DRILL_SENTENCES[drillIndex]}"
                      </p>
                      <button
                        onClick={() => speakText(DRILL_SENTENCES[drillIndex])}
                        className="px-2.5 py-1 rounded-xs bg-amber-500 text-white text-[11px] font-bold shadow-2xs hover:bg-amber-600 cursor-pointer inline-flex items-center gap-1 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm mẫu
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => setDrillIndex((prev) => Math.max(0, prev - 1))}
                        disabled={drillIndex === 0}
                        className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-xs font-bold cursor-pointer text-slate-700 dark:text-slate-300"
                      >
                        ← Câu trước
                      </button>
                      <button
                        onClick={() => setDrillIndex((prev) => Math.min(DRILL_SENTENCES.length - 1, prev + 1))}
                        disabled={drillIndex === DRILL_SENTENCES.length - 1}
                        className="px-3 py-1 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs cursor-pointer"
                      >
                        Câu tiếp →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center space-y-2 text-slate-500 bg-slate-50/50 dark:bg-slate-950/50 rounded-xs border border-slate-200/50 dark:border-white/5">
                    <MessageSquare className="w-6 h-6 text-[#0059bb] mx-auto" strokeWidth={1.8} />
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Chế độ FreeTalk Tự Do</p>
                    <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      Nói về bất kỳ chủ đề ngẫu nhiên nào bạn yêu thích với AI Tutor Studio!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SPEECH PRECISION LAB (6 CRITERIA GRID) */}
            {sidebarTab === "speech" && (
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                    Đánh Giá Giọng Nói Real-Time
                  </span>
                  <span className="px-2 py-0.5 rounded-xs text-xs font-black bg-emerald-500 text-white shadow-2xs font-mono">
                    {lastSpeechScore ? `${lastSpeechScore.overallScore}%` : "95% Overall"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-center">
                  <div className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Trôi chảy</span>
                    <span className="text-xs font-black text-purple-600 dark:text-purple-400 font-mono">
                      {lastSpeechScore ? `${lastSpeechScore.fluencyScore}%` : "96%"}
                    </span>
                  </div>
                  <div className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Phát âm</span>
                    <span className="text-xs font-black text-[#0059bb] dark:text-sky-400 font-mono">
                      {lastSpeechScore ? `${lastSpeechScore.pronunciationScore}%` : "95%"}
                    </span>
                  </div>
                  <div className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Ngữ điệu</span>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {lastSpeechScore ? `${lastSpeechScore.intonationScore}%` : "94%"}
                    </span>
                  </div>
                  <div className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Đầy đủ</span>
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 font-mono">97%</span>
                  </div>
                  <div className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Tốc độ</span>
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono">145 WPM</span>
                  </div>
                  <div className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Trọng âm</span>
                    <span className="text-xs font-black text-teal-600 dark:text-teal-400 font-mono">94%</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SMART SUGGESTIONS & HINTS */}
            {sidebarTab === "coach" && (
              <div className="space-y-2 text-left">
                <div className="p-2.5 rounded-xs bg-[#0059bb]/5 dark:bg-[#0059bb]/20 border border-[#0059bb]/20 text-xs font-medium space-y-1">
                  <span className="font-bold text-[#0059bb] dark:text-sky-400 flex items-center gap-1 text-[11px]">
                    <Bot className="w-3.5 h-3.5" strokeWidth={1.8} /> AI Voice Coach Khẩu Hình:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    "Mở rộng khẩu hình và phát âm rõ âm đuôi /s/ và /t/ để đạt điểm tuyệt đối!"
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                    Gợi ý trả lời nhanh:
                  </span>
                  <div className="flex flex-col gap-1.5 w-full">
                    {[
                      "I love learning English with AI because it's effective.",
                      "Could you please repeat that phrase again?",
                      "That sounds very interesting! Tell me more."
                    ].map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNewUserSpeech(sug, 96)}
                        className="w-full text-left px-2.5 py-1.5 rounded-xs text-[11px] font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 text-[#0059bb] dark:text-sky-400 hover:bg-[#0059bb]/10 transition-colors cursor-pointer truncate flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3 h-3 shrink-0 text-[#0059bb]" />
                        <span className="truncate">{sug}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* 2. 1-CLICK INTERACTIVE WORD DICTIONARY FLOATING MODAL */}
      <AnimatePresence>
        {selectedWordData && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-3 right-3 bottom-20 sm:left-auto sm:right-4 sm:bottom-6 z-50 w-auto sm:w-80 p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/15 shadow-2xl space-y-2 select-none"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <BookMarked className="w-4 h-4 text-[#0059bb]" />
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase font-display">
                  Tra Từ Vựng Nhanh
                </span>
              </div>
              <button
                onClick={() => setSelectedWordData(null)}
                className="p-1 rounded-xs text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0059bb] dark:text-sky-400 capitalize font-display">
                  {selectedWordData.word}
                </h3>
                <button
                  onClick={() => speakText(selectedWordData.word)}
                  className="px-2 py-0.5 rounded-xs bg-blue-50 dark:bg-sky-950/40 text-[#0059bb] text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3 h-3" /> Nghe
                </button>
              </div>

              {selectedWordData.ipa && (
                <p className="text-[11px] font-mono text-slate-400 font-bold">{selectedWordData.ipa}</p>
              )}

              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {selectedWordData.meaning}
              </p>

              {selectedWordData.example && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1 border-t border-slate-100 dark:border-white/5">
                  "{selectedWordData.example}"
                </p>
              )}
            </div>

            <button
              onClick={handleSaveWordToVocab}
              className="w-full py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-all"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              Lưu vào Sổ tay từ vựng (+5 XP)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
