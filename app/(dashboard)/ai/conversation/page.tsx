'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useUserStore } from '@/lib/store/userStore';
import { useNotificationStore } from '@/lib/store/notificationStore';
import { useListeningStore } from '@/lib/store/listeningStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Utensils, 
  Briefcase, 
  Plane, 
  Cpu, 
  Send, 
  MessageSquare, 
  Mic, 
  MicOff, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ChevronRight,
  Sparkles,
  Star,
  Clock,
  Award,
  RefreshCw,
  Square,
  Check,
  X,
  Flame,
  Wand2,
  Filter,
  Languages,
  BookMarked,
  BookmarkCheck,
  Target,
  ShoppingBag,
  Navigation,
  Lightbulb
} from 'lucide-react';

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

interface Goal {
  id: string;
  name: string;
  nameEn: string;
  keywords: string[];
}

interface Topic {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  goals: Goal[];
  welcomeMessage: { text: string; vi: string };
  suggestions: string[];
  advice: string;
}

interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
  vietnameseTranslation?: string;
  grammarCorrection?: {
    original: string;
    corrected: string;
    explanation: string;
  };
  betterPhrasing?: string;
  suggestions?: string[];
}

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  'at1': <Utensils className="w-4.5 h-4.5 text-[#0059bb]" strokeWidth={1.8} />,
  'at2': <Briefcase className="w-4.5 h-4.5 text-[#0059bb]" strokeWidth={1.8} />,
  'at3': <Plane className="w-4.5 h-4.5 text-[#0059bb]" strokeWidth={1.8} />,
  'at4': <Cpu className="w-4.5 h-4.5 text-[#0059bb]" strokeWidth={1.8} />,
  'at5': <ShoppingBag className="w-4.5 h-4.5 text-[#0059bb]" strokeWidth={1.8} />,
  'at6': <Navigation className="w-4.5 h-4.5 text-[#0059bb]" strokeWidth={1.8} />,
};

const aiTopics: Topic[] = [
  {
    id: 'at1',
    name: 'Gọi đồ ăn',
    nameEn: 'Ordering Food',
    description: 'Luyện đặt món tại nhà hàng',
    level: 'Beginner',
    welcomeMessage: {
      text: "Hello! Welcome to our restaurant. Are you ready to order, or would you like a few more minutes with the menu?",
      vi: "Xin chào! Chào mừng quý khách tới nhà hàng. Bạn đã sẵn sàng đặt món chưa hay muốn xem thực đơn thêm vài phút?"
    },
    suggestions: ["I'd like to order a fresh salad please.", "Can I get an orange juice without ice?", "What is the chef's special today?"],
    advice: "Tự tin sử dụng các cấu trúc lịch sự khi đặt món như 'I would like to order...' hoặc 'Could I get... without ice?'.",
    goals: [
      { id: 'at1_salad', name: 'Gọi món salad', nameEn: 'Order a salad', keywords: ['salad', 'vegetable'] },
      { id: 'at1_orange', name: 'Gọi nước cam', nameEn: 'Order orange juice', keywords: ['orange', 'juice', 'drink'] },
      { id: 'at1_no_ice', name: 'Yêu cầu không đá', nameEn: 'Request no ice', keywords: ['no ice', 'without ice', 'less ice'] },
    ]
  },
  {
    id: 'at2',
    name: 'Phỏng vấn xin việc',
    nameEn: 'Job Interview',
    description: 'Chuẩn bị cho buổi phỏng vấn',
    level: 'Intermediate',
    welcomeMessage: {
      text: "Good morning! Thank you for coming in today. Could you please introduce yourself and share your background?",
      vi: "Chào buổi sáng! Cảm ơn bạn đã tới phỏng vấn hôm nay. Bạn có thể giới thiệu bản thân và kinh nghiệm của mình không?"
    },
    suggestions: ["I have 3 years of experience in software development.", "My biggest strength is problem solving under pressure.", "What is the expected career growth for this role?"],
    advice: "Sử dụng thì quá khứ đơn để nói về thành tựu đạt được và thì hiện tại hoàn thành cho các kỹ năng đã tích lũy.",
    goals: [
      { id: 'at2_intro', name: 'Giới thiệu bản thân', nameEn: 'Introduce yourself', keywords: ['experience', 'background', 'name', 'myself'] },
      { id: 'at2_skills', name: 'Mô tả kỹ năng/kinh nghiệm', nameEn: 'Describe skills/experience', keywords: ['skill', 'strength', 'problem solving', 'teamwork'] },
      { id: 'at2_salary', name: 'Đề cập mức lương mong muốn', nameEn: 'Mention salary expectation', keywords: ['salary', 'pay', 'expectation', 'compensation'] },
    ]
  },
  {
    id: 'at3',
    name: 'Du lịch & Khách sạn',
    nameEn: 'Traveling & Hotel',
    description: 'Hỏi đường, đặt phòng khách sạn',
    level: 'Beginner',
    welcomeMessage: {
      text: "Welcome to the Grand Hotel! How may I assist you with your travel and booking plans today?",
      vi: "Chào mừng tới Khách sạn Grand! Tôi có thể giúp gì cho kế hoạch đặt phòng và đi lại của bạn hôm nay?"
    },
    suggestions: ["I have a reservation under my name.", "Could you point me to the nearest bus station?", "How much is a single room per night?"],
    advice: "Luyện tập các mẫu câu hỏi đường thông dụng như 'Could you point me to...' và mẫu câu hỏi giá 'How much per night?'.",
    goals: [
      { id: 'at3_directions', name: 'Hỏi đường/địa điểm', nameEn: 'Ask for directions', keywords: ['direction', 'where', 'bus', 'station', 'map', 'nearest'] },
      { id: 'at3_hotel', name: 'Thảo luận đặt phòng khách sạn', nameEn: 'Discuss hotel room booking', keywords: ['hotel', 'room', 'booking', 'reservation', 'check-in'] },
      { id: 'at3_price', name: 'Hỏi giá vé/giá phòng', nameEn: 'Ask about price', keywords: ['price', 'cost', 'rate', 'how much', 'dollar'] },
    ]
  },
  {
    id: 'at4',
    name: 'Thảo luận công nghệ',
    nameEn: 'Tech & AI Discussion',
    description: 'Nói về AI, ứng dụng và công nghệ',
    level: 'Advanced',
    welcomeMessage: {
      text: "Hey there! Artificial Intelligence is transforming every industry. What's your favorite AI tool or tech app recently?",
      vi: "Chào bạn! Trí tuệ nhân tạo đang biến đổi mọi ngành nghề. Ứng dụng công nghệ hoặc công cụ AI yêu thích của bạn là gì?"
    },
    suggestions: ["AI helps me write code and learn languages faster.", "In my opinion, automation will create more creative jobs.", "The future of technology will heavily rely on quantum computing."],
    advice: "Dùng các từ liên kết luận điểm như 'In my opinion', 'Furthermore', 'On the other hand' để bài nói lưu loát.",
    goals: [
      { id: 'at4_explain_ai', name: 'Giải thích về ứng dụng/AI', nameEn: 'Explain an app/AI tool', keywords: ['ai', 'tool', 'app', 'code', 'software', 'technology'] },
      { id: 'at4_opinion', name: 'Nêu quan điểm về công nghệ', nameEn: 'Share tech opinions', keywords: ['opinion', 'think', 'believe', 'automation', 'future'] },
      { id: 'at4_future', name: 'Mô tả tương lai công nghệ', nameEn: 'Describe future tech vision', keywords: ['future', 'vision', 'next decade', 'quantum', 'innovation'] },
    ]
  },
  {
    id: 'at5',
    name: 'Mua sắm & Đàm phán',
    nameEn: 'Shopping & Bargaining',
    description: 'Hỏi giá, đổi trả và ưu đãi',
    level: 'Intermediate',
    welcomeMessage: {
      text: "Hi! Welcome to our boutique. We have a special discount today. Are you looking for anything in particular?",
      vi: "Xin chào! Chào mừng bạn tới cửa hàng. Hôm nay chúng tôi có ưu đãi đặc biệt. Bạn có đang tìm món đồ nào cụ thể không?"
    },
    suggestions: ["Do you have this jacket in medium size?", "Is there any special discount on this item?", "Can I pay with contactless credit card?"],
    advice: "Nắm vững vốn từ mua sắm: 'fitting room', 'medium size', 'special discount', 'contactless payment'.",
    goals: [
      { id: 'at5_size', name: 'Hỏi kích cỡ & màu sắc', nameEn: 'Ask for size & color', keywords: ['size', 'medium', 'large', 'color', 'fitting room'] },
      { id: 'at5_discount', name: 'Hỏi giảm giá', nameEn: 'Ask for discount promotion', keywords: ['discount', 'sale', 'cheaper', 'offer', 'price'] },
      { id: 'at5_pay', name: 'Chọn hình thức thanh toán', nameEn: 'Select payment method', keywords: ['pay', 'card', 'cash', 'contactless', 'credit'] },
    ]
  },
  {
    id: 'at6',
    name: 'Check-in Sân bay',
    nameEn: 'Airport Check-in',
    description: 'Làm thủ tục chuyến bay & hành lý',
    level: 'Beginner',
    welcomeMessage: {
      text: "Good day! Welcome to the airport check-in desk. May I please see your passport and flight booking reference?",
      vi: "Xin chào! Chào mừng tới quầy làm thủ tục sân bay. Tôi có thể xem hộ chiếu và mã đặt vé của bạn được không?"
    },
    suggestions: ["Here is my passport and boarding reference.", "Can I request a window seat please?", "I have two check-in bags and one carry-on."],
    advice: "Luyện phát âm chuẩn các thuật ngữ hàng không: 'boarding pass', 'window seat', 'baggage allowance'.",
    goals: [
      { id: 'at6_ticket', name: 'Đưa vé & hộ chiếu', nameEn: 'Present ticket & passport', keywords: ['passport', 'ticket', 'reference', 'boarding pass'] },
      { id: 'at6_seat', name: 'Yêu cầu ghế cửa sổ', nameEn: 'Request window seat', keywords: ['window seat', 'aisle seat', 'seat'] },
      { id: 'at6_baggage', name: 'Khai báo hành lý', nameEn: 'State luggage quantity', keywords: ['bag', 'luggage', 'suitcase', 'carry-on', 'check-in'] },
    ]
  }
];

export default function ConversationPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { markGoalCompleted } = useListeningStore();
  
  const [selectedTopicId, setSelectedTopicId] = useState<string>('at1');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');

  const activeTimeRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      activeTimeRef.current += 1;
    }, 1000);

    return () => {
      clearInterval(timer);
      if (activeTimeRef.current > 10) {
        const mins = Math.max(1, Math.ceil(activeTimeRef.current / 60));
        useUserStore.getState().addPracticeTime(mins, "writing");
        activeTimeRef.current = 0;
      }
    };
  }, []);

  const currentTopic = aiTopics.find((t) => t.id === selectedTopicId) || aiTopics[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      text: currentTopic.welcomeMessage.text,
      vietnameseTranslation: currentTopic.welcomeMessage.vi,
      suggestions: currentTopic.suggestions
    }
  ]);
  const [input, setInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showTranslations, setShowTranslations] = useState<{ [key: string]: boolean }>({});
  
  // Interactive 1-Click Word Dictionary Modal State
  const [selectedWordData, setSelectedWordData] = useState<{
    word: string;
    ipa?: string;
    meaning?: string;
    example?: string;
  } | null>(null);

  // Dynamic study states
  const [completedGoalIds, setCompletedGoalIds] = useState<string[]>([]);
  
  // Voice state
  const [isListening, setIsListening] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Review & Rating Modal states
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);

  // Practice timer
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // When switching topic, reset conversation to topic's welcome message
  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopicId(topic.id);
    setMessages([
      {
        id: `welcome_${topic.id}_${Date.now()}`,
        role: 'ai',
        text: topic.welcomeMessage.text,
        vietnameseTranslation: topic.welcomeMessage.vi,
        suggestions: topic.suggestions
      }
    ]);
    addToast({ type: "info", title: `Đã đổi chủ đề: ${topic.name}` });
  };

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const filteredTopics = aiTopics.filter((t) => {
    return levelFilter === 'ALL' || t.level.toUpperCase() === levelFilter.toUpperCase();
  });

  const toggleTranslation = (msgId: string) => {
    setShowTranslations((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!cleanWord || cleanWord.length < 2) return;

    speakText(cleanWord);

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

  // Real-time Goal Detection
  const checkGoalCompletion = (userText: string) => {
    const lower = userText.toLowerCase();
    currentTopic.goals.forEach((goal) => {
      if (!completedGoalIds.includes(goal.id)) {
        const isMatched = goal.keywords.some((kw) => lower.includes(kw));
        if (isMatched) {
          setCompletedGoalIds((prev) => [...prev, goal.id]);
          markGoalCompleted(goal.id);
          awardXp(10);
          addToast({
            type: "success",
            title: `Đạt Mục Tiêu: ${goal.name}! 🎯`,
            message: "+10 XP cho thành tích hội thoại!",
          });
        }
      }
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isAiTyping) return;

    // Check goal completion in user input
    checkGoalCompletion(messageText);

    // Simulate Grammar Correction
    let grammarFix: Message["grammarCorrection"] = undefined;
    let naturalWay: string | undefined = undefined;

    const lower = messageText.toLowerCase();
    if (lower.includes("i want order")) {
      grammarFix = {
        original: messageText,
        corrected: messageText.replace(/i want order/i, "I would like to order"),
        explanation: "Dùng 'would like to order' lịch sự hơn 'want order' trong giao tiếp."
      };
      naturalWay = messageText.replace(/i want order/i, "I'd like to get");
    } else if (lower.includes("i am go")) {
      grammarFix = {
        original: messageText,
        corrected: messageText.replace(/i am go/i, "I am going"),
        explanation: "Thì hiện tại tiếp diễn cần 'going' thay vì 'go'."
      };
      naturalWay = messageText.replace(/i am go/i, "I'm heading");
    }

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: messageText,
      grammarCorrection: grammarFix,
      betterPhrasing: naturalWay,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsAiTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, text: m.text })),
            { role: 'user', text: messageText },
          ],
          topicId: selectedTopicId,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const aiMsg: Message = {
          id: `ai_${Date.now()}`,
          role: 'ai',
          text: data.reply,
          vietnameseTranslation: data.vietnameseTranslation || data.translation || "",
          suggestions: data.suggestions && data.suggestions.length > 0 ? data.suggestions : currentTopic.suggestions,
        };

        setMessages((prev) => [...prev, aiMsg]);
        speakText(data.reply);

        if (data.goalsCompleted && Array.isArray(data.goalsCompleted)) {
          data.goalsCompleted.forEach((gId: string) => {
            if (!completedGoalIds.includes(gId)) {
              setCompletedGoalIds((prev) => [...prev, gId]);
              markGoalCompleted(gId);
            }
          });
        }

        awardXp(10);
        useUserStore.getState().addPracticeTime(1, "writing");
      } else {
        // Fallback response generator matching topic
        const fallbackMsg: Message = {
          id: `ai_${Date.now()}`,
          role: 'ai',
          text: `That's very interesting! Regarding "${messageText}", how would you elaborate further?`,
          vietnameseTranslation: `Điều đó thật thú vị! Liên quan tới "${messageText}", bạn có thể diễn giải thêm không?`,
          suggestions: currentTopic.suggestions,
        };
        setMessages((prev) => [...prev, fallbackMsg]);
        speakText(fallbackMsg.text);
      }
    } catch (err) {
      console.error(err);
      const errMsg: Message = {
        id: `ai_${Date.now()}`,
        role: 'ai',
        text: "I heard you clearly! Keep practicing speaking English every day!",
        vietnameseTranslation: "Tôi đã nghe rõ bạn! Hãy tiếp tục luyện nói tiếng Anh hàng ngày nhé!",
        suggestions: currentTopic.suggestions,
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const startListening = () => {
    setIsListening(true);
    setRecordingTime(0);
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopListening = () => {
    setIsListening(false);
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);

    const demoPhrases = [
      "I'd like to order a fresh salad and orange juice without ice please.",
      "I have 3 years of software development experience and good teamwork skills.",
      "Could you please tell me where the nearest hotel is?",
      "I think artificial intelligence is transforming modern technology."
    ];
    const demoText = demoPhrases[Math.floor(Math.random() * demoPhrases.length)];
    setInput(demoText);
    handleSendMessage(demoText);
  };

  const handleFinishConversation = () => {
    setShowRatingModal(true);
  };

  const handleSubmitRating = () => {
    awardXp(30);
    setShowRatingModal(false);
    addToast({
      type: "success",
      title: "Đánh Giá Hoàn Tất! 🎉",
      message: "+30 XP cho buổi luyện giao tiếp thành công!",
    });
  };

  return (
    <div className="pb-20 md:pb-6 px-1 md:px-0 relative select-none font-sans lg:flex lg:flex-col lg:min-h-[calc(100vh-4rem)]">
      
      {/* 0. Top Hero Announcement Banner Card (Dashboard Proportional Sizing) */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 sm:p-4 rounded-xs bg-[#0059bb]/5 dark:bg-blue-950/40 border border-[#0059bb]/15 dark:border-blue-900/50 flex flex-row items-center justify-between gap-3 shadow-2xs shrink-0"
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-[#0059bb]/20">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-xs text-[10px] sm:text-xs font-black bg-[#0059bb] text-white">
                AI CONVERSATION
              </span>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display truncate">
                Luyện Giao Tiếp AI 1-1 Theo Chủ Đề
              </h1>
            </div>
            <p className="hidden sm:block text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium truncate">
              Trò chuyện thực tế với AI, tự động chấm điểm mục tiêu, sửa lỗi ngữ pháp & tra từ 1-click
            </p>
          </div>
        </div>

        {/* Right Actions: Complete Session & Timer */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleFinishConversation}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xs bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Hoàn thành & Chấm điểm</span>
            <span className="sm:hidden">Chấm điểm</span>
          </button>

          <span className="px-2.5 py-1.5 sm:py-2 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-2xs font-mono">
            <Clock className="w-4 h-4 text-amber-500" strokeWidth={1.8} /> {formatElapsedTime(elapsedTime)}
          </span>
        </div>
      </motion.div>

      {/* 1. TOPIC SELECTION CARDS GRID (Proportional Text Scale) */}
      <div className="space-y-2 mt-3 shrink-0">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#0059bb]" strokeWidth={1.8} />
            <span className="hidden sm:inline">CHỌN CHỦ ĐỀ GIAO TIẾP ({aiTopics.length} CHỦ ĐỀ)</span>
            <span className="sm:hidden">Chủ đề giao tiếp</span>
          </h2>

          {/* Level Filter Pills */}
          <div className="flex items-center gap-1.5">
            {[
              { id: 'ALL', label: 'Tất cả' },
              { id: 'Beginner', label: 'Cơ bản' },
              { id: 'Intermediate', label: 'Trung cấp' },
              { id: 'Advanced', label: 'Nâng cao' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setLevelFilter(lvl.id)}
                className={`px-2 sm:px-2.5 py-1 rounded-xs text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  levelFilter === lvl.id
                    ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {filteredTopics.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            const completedCount = completedGoalIds.filter((id) => id.startsWith(topic.id)).length;
            const levelLabel = topic.level === 'Beginner' ? 'Cơ bản' : topic.level === 'Intermediate' ? 'Trung cấp' : 'Nâng cao';

            return (
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className={`p-2.5 sm:p-3 rounded-xs border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-[#0059bb] ring-2 ring-[#0059bb]/20 shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-white/10 hover:border-[#0059bb]/40 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-xs bg-[#0059bb]/10 flex items-center justify-center shrink-0 border border-[#0059bb]/20">
                    {TOPIC_ICONS[topic.id] || <MessageSquare className="w-4 h-4 text-[#0059bb]" strokeWidth={1.8} />}
                  </div>
                  <span className="px-1.5 py-0.5 rounded-xs text-[10px] sm:text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {levelLabel}
                  </span>
                </div>

                <div className="mt-2 space-y-0.5">
                  <h3 className={`text-xs sm:text-sm font-bold font-display truncate ${
                    isSelected ? "text-[#0059bb] dark:text-sky-400 font-extrabold" : "text-slate-900 dark:text-white"
                  }`}>
                    {topic.name}
                  </h3>
                  <p className="hidden sm:block text-[11px] sm:text-xs text-slate-400 font-medium truncate">
                    {topic.description}
                  </p>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-500">
                  <span>{completedCount}/{topic.goals.length} Đạt</span>
                  {isSelected && <span className="text-[#0059bb] font-black">✓ Đang học</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN BENTO GRID (Cột Trái 8/12 - Cột Phải 4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 lg:items-stretch min-w-0 lg:flex-1 lg:min-h-0 mt-3">
        
        {/* CỘT TRÁI: AI CHAT COMPANION WORKSPACE (8/12 Width) */}
        <div className="lg:col-span-8 flex flex-col min-w-0 lg:min-h-0">
          
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col min-w-0 lg:min-h-0 lg:flex-1">
            
            {/* Header Active Topic Indicator */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2 truncate">
                <Bot className="w-4.5 h-4.5 text-[#0059bb]" strokeWidth={1.8} />
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display uppercase tracking-wider truncate">
                  CHỦ ĐỀ: {currentTopic.name} ({currentTopic.nameEn})
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-xs text-xs font-bold bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 shrink-0">
                1-1 AI Companion
              </span>
            </div>

            {/* Scrollable Conversation Stream (Generous Height on Mobile & Desktop) */}
            <div className="h-[62svh] min-h-[380px] sm:min-h-[420px] lg:h-auto lg:min-h-[460px] lg:flex-1 overflow-y-auto space-y-3.5 p-1 pr-1.5 mt-2 sm:mt-3">
              {messages.map((msg) => {
                const isAi = msg.role === 'ai';
                const isTranslated = showTranslations[msg.id];

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAi && (
                      <div className="w-8 h-8 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-[#0059bb]/20 shadow-2xs">
                        <Bot className="w-4.5 h-4.5" strokeWidth={1.8} />
                      </div>
                    )}

                    <div className={`space-y-1.5 max-w-[88%] ${isAi ? '' : 'items-end flex flex-col'}`}>
                      <div
                        className={`p-3 sm:p-3.5 rounded-xs text-xs sm:text-sm font-medium leading-relaxed shadow-2xs transition-all ${
                          isAi
                            ? 'bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white'
                            : 'bg-[#0059bb] text-white'
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

                        {/* Vietnamese Translation */}
                        {isTranslated && msg.vietnameseTranslation && (
                          <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                            <Languages className="w-4 h-4 text-[#0059bb] shrink-0 mt-0.5" strokeWidth={1.8} />
                            <span>{msg.vietnameseTranslation}</span>
                          </div>
                        )}
                      </div>

                      {/* AI Instant Grammar & Phrasing Correction Card for User */}
                      {!isAi && (msg.grammarCorrection || msg.betterPhrasing) && (
                        <div className="p-3 rounded-xs bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/25 text-xs sm:text-sm space-y-1.5 text-left w-full">
                          {msg.grammarCorrection && (
                            <div className="space-y-0.5">
                              <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 text-xs uppercase">
                                <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.8} /> Sửa Lỗi Ngữ Pháp:
                              </span>
                              <p className="text-slate-800 dark:text-slate-200 font-medium">
                                {msg.grammarCorrection.explanation}
                              </p>
                            </div>
                          )}

                          {msg.betterPhrasing && (
                            <div className="space-y-0.5">
                              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-xs uppercase">
                                <Sparkles className="w-3.5 h-3.5" strokeWidth={1.8} /> Cách Nói Tự Nhiên Hơn:
                              </span>
                              <p className="text-emerald-700 dark:text-emerald-300 font-bold italic">
                                "{msg.betterPhrasing}"
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* AI Suggestions Chips (1-Click Reply) */}
                      {isAi && msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="text-[10px] sm:text-xs font-bold text-slate-400 block w-full">Gợi ý phản hồi nhanh:</span>
                          {msg.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSendMessage(sug)}
                              className="px-2.5 py-1.5 rounded-xs text-xs font-bold bg-[#0059bb]/5 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 hover:bg-[#0059bb]/10 transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-[#0059bb]" strokeWidth={1.8} />
                              <span>{sug}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* AI Action Strip */}
                      {isAi && (
                        <div className="flex items-center gap-3 px-1">
                          <button
                            onClick={() => speakText(msg.text)}
                            className="text-xs font-bold text-slate-500 hover:text-[#0059bb] flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" strokeWidth={1.8} /> Nghe đọc
                          </button>
                          {msg.vietnameseTranslation && (
                            <button
                              onClick={() => toggleTranslation(msg.id)}
                              className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline cursor-pointer"
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
              {isAiTyping && (
                <div className="flex items-center gap-2.5 p-3 rounded-xs bg-[#0059bb]/5 dark:bg-[#0059bb]/20 border border-[#0059bb]/20 text-[#0059bb] dark:text-sky-400 text-xs sm:text-sm font-bold animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.8} /> AI Companion đang suy nghĩ & soạn phản hồi...
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Message Input & Live Speech Form */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={isListening ? `Đang thu âm... 00:0${recordingTime}` : "Nhập tiếng Anh hoặc bấm Mic để cất giọng..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-10.5 pl-3.5 pr-10 text-xs sm:text-sm font-medium rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
                  />
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`absolute right-2 top-2 p-1.5 rounded-xs transition-colors cursor-pointer ${
                      isListening
                        ? "text-rose-500 animate-pulse bg-rose-50 dark:bg-rose-950/40"
                        : "text-slate-400 hover:text-[#0059bb]"
                    }`}
                  >
                    <Mic className="w-4 h-4" strokeWidth={1.8} />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || isAiTyping}
                  className="h-10.5 px-4.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-40 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" strokeWidth={1.8} />
                  <span className="hidden sm:inline">Gửi</span>
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* CỘT PHẢI: TOPIC GOALS & CONVERSATION ANALYTICS (4/12 Width) */}
        <div className="lg:col-span-4 flex flex-col min-w-0 lg:min-h-0 space-y-3.5">
          
          {/* Topic Mission Goals Checklist Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#0059bb]" strokeWidth={1.8} /> MỤC TIÊU NÓI
              </span>
              <span className="px-2.5 py-0.5 rounded-xs text-xs font-bold bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20">
                {completedGoalIds.filter((id) => id.startsWith(currentTopic.id)).length}/{currentTopic.goals.length} Đạt
              </span>
            </div>

            <div className="space-y-2">
              {currentTopic.goals.map((goal) => {
                const isDone = completedGoalIds.includes(goal.id);

                return (
                  <div
                    key={goal.id}
                    className={`p-2.5 sm:p-3 rounded-xs border text-xs sm:text-sm font-bold flex items-center justify-between gap-2 transition-all ${
                      isDone
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="truncate">{goal.name}</div>
                      <div className="text-xs font-mono text-slate-400 truncate">{goal.nameEn}</div>
                    </div>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={1.8} />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-white/20 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Grammar & Vocabulary Coach Advice Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2">
            <span className="text-xs sm:text-sm font-bold text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" strokeWidth={1.8} /> Lời Khuyên Giao Tiếp:
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xs border border-slate-200/60 dark:border-white/5">
              "{currentTopic.advice}"
            </p>
          </div>

        </div>

      </div>

      {/* 3. 1-CLICK INTERACTIVE WORD DICTIONARY FLOATING MODAL */}
      <AnimatePresence>
        {selectedWordData && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-3 right-3 bottom-20 sm:left-auto sm:right-4 sm:bottom-6 z-50 w-auto sm:w-80 p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/15 shadow-2xl space-y-2.5 select-none"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <BookMarked className="w-4 h-4 text-[#0059bb]" strokeWidth={1.8} />
                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase font-display">
                  Tra Từ Vựng Nhanh
                </span>
              </div>
              <button
                onClick={() => setSelectedWordData(null)}
                className="p-1 rounded-xs text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.8} />
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-[#0059bb] dark:text-sky-400 capitalize font-display">
                  {selectedWordData.word}
                </h3>
                <button
                  onClick={() => speakText(selectedWordData.word)}
                  className="px-2 py-0.5 rounded-xs bg-blue-50 dark:bg-sky-950/40 text-[#0059bb] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" strokeWidth={1.8} /> Nghe
                </button>
              </div>

              {selectedWordData.ipa && (
                <p className="text-xs font-mono text-slate-400 font-bold">{selectedWordData.ipa}</p>
              )}

              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                {selectedWordData.meaning}
              </p>

              {selectedWordData.example && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1.5 border-t border-slate-100 dark:border-white/5">
                  "{selectedWordData.example}"
                </p>
              )}
            </div>

            <button
              onClick={handleSaveWordToVocab}
              className="w-full py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-all"
            >
              <BookmarkCheck className="w-4 h-4" strokeWidth={1.8} />
              Lưu vào Sổ tay từ vựng (+5 XP)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RATING & REVIEW MODAL */}
      <AnimatePresence>
        {showRatingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl space-y-4 font-sans text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto shadow-2xs border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6 stroke-[1.8]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Hoàn Thành Buổi Luyện Nói! 🎉
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Bạn đã luyện tập giao tiếp trong {formatElapsedTime(elapsedTime)}. Bạn đánh giá thế nào về buổi học?
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 dark:text-slate-700"
                      }`}
                      strokeWidth={1.8}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleSubmitRating}
                className="w-full py-2.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs sm:text-sm font-bold shadow-2xs cursor-pointer"
              >
                Nhận +30 XP & Hoàn tất
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
