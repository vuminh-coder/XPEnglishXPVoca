'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useUserStore } from '@/lib/store/userStore';
import { useNotificationStore } from '@/lib/store/notificationStore';
import { useListeningStore } from '@/lib/store/listeningStore';
import { useUiStore } from '@/lib/store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { PageEntranceWrapper, MotionItem } from "@/components/shared/PageEntranceAnimation";
import { speakLessonText } from '@/lib/utils/ttsEngine';

import { 
  Bot, 
  Utensils, 
  Briefcase, 
  Plane, 
  Cpu, 
  Send, 
  MessageSquare, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown,
  Sparkles,
  Clock,
  Award,
  RefreshCw,
  Square,
  Check,
  X,
  BookMarked,
  BookmarkCheck,
  Target,
  ShoppingBag,
  Navigation,
  Lightbulb,
  RotateCcw,
  History,
  CheckCircle
} from 'lucide-react';

// ===== BASIC IPA DICTIONARY LOOKUP TABLE =====
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
  "routine": { ipa: "/ruːˈtiːn/", meaning: "Thói quen" },
  "salad": { ipa: "/ˈsæl.əd/", meaning: "Món salad" },
  "juice": { ipa: "/dʒuːs/", meaning: "Nước ép" },
  "delicious": { ipa: "/dɪˈlɪʃ.əs/", meaning: "Ngon miệng" },
  "direction": { ipa: "/daɪˈrek.ʃən/", meaning: "Phương hướng" },
  "reservation": { ipa: "/ˌrez.ərˈveɪ.ʃən/", meaning: "Đặt chỗ" },
  "artificial": { ipa: "/ˌɑːr.t̬əˈfɪʃ.əl/", meaning: "Nhân tạo" },
  "intelligence": { ipa: "/ɪnˈtel.ə.dʒəns/", meaning: "Trí tuệ" },
  "discount": { ipa: "/ˈdɪs.kaʊnt/", meaning: "Giảm giá" },
  "passport": { ipa: "/ˈpæs.pɔːrt/", meaning: "Hộ chiếu" },
};

interface Goal {
  id: string;
  name: string;
  nameEn: string;
  keywords: string[];
}

interface SuggestedWord {
  word: string;
  meaning?: string;
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
  suggestedWords: SuggestedWord[];
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
  suggestedWords?: SuggestedWord[];
  suggestedPhrases?: string[];
}

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  at1: <Utensils className="w-4 h-4 text-amber-500" strokeWidth={1.8} />,
  at2: <Briefcase className="w-4 h-4 text-[#0059bb]" strokeWidth={1.8} />,
  at3: <Plane className="w-4 h-4 text-emerald-500" strokeWidth={1.8} />,
  at4: <Cpu className="w-4 h-4 text-purple-500" strokeWidth={1.8} />,
  at5: <ShoppingBag className="w-4 h-4 text-rose-500" strokeWidth={1.8} />,
  at6: <Navigation className="w-4 h-4 text-sky-500" strokeWidth={1.8} />,
};

const aiTopics: Topic[] = [
  {
    id: 'at1',
    name: 'Nhà hàng & Gọi món',
    nameEn: 'Ordering Food & Drinks',
    description: 'Gọi món, hỏi thực đơn và thanh toán',
    level: 'Beginner',
    welcomeMessage: {
      text: "Hello! Welcome to our bistro. May I start you off with something refreshing to drink, or are you ready to order?",
      vi: "Xin chào! Chào mừng tới nhà hàng. Tôi có thể bắt đầu với món đồ uống tươi mát, hoặc bạn đã sẵn sàng gọi món chưa?"
    },
    suggestedWords: [
      { word: "salad", meaning: "món salad" },
      { word: "juice", meaning: "nước ép" },
      { word: "delicious", meaning: "ngon miệng" }
    ],
    suggestions: [
      "I'd like to order a salad, please.",
      "What do you recommend for lunch?"
    ],
    advice: "Dùng 'I would like to have...' hoặc 'Could I please get...' để gọi món lịch sự.",
    goals: [
      { id: 'at1_greeting', name: 'Chào hỏi & Yêu cầu thực đơn', nameEn: 'Greeting & Ask for menu', keywords: ['hello', 'hi', 'menu', 'please', 'table'] },
      { id: 'at1_ordering', name: 'Gọi ít nhất 1 món ăn/nước', nameEn: 'Order at least 1 dish/drink', keywords: ['order', 'salad', 'coffee', 'juice', 'water', 'burger', 'steak'] },
      { id: 'at1_paying', name: 'Hỏi thanh toán hoặc xin hóa đơn', nameEn: 'Ask for the bill', keywords: ['bill', 'check', 'pay', 'card', 'cash', 'how much'] },
    ]
  },
  {
    id: 'at2',
    name: 'Phỏng vấn xin việc',
    nameEn: 'Job Interview Practice',
    description: 'Giới thiệu bản thân và kinh nghiệm',
    level: 'Intermediate',
    welcomeMessage: {
      text: "Welcome to the interview! To get started, could you briefly introduce yourself and share your core experience?",
      vi: "Chào mừng bạn tới buổi phỏng vấn! Để bắt đầu, bạn có thể giới thiệu ngắn gọn về bản thân và kinh nghiệm cốt lõi không?"
    },
    suggestedWords: [
      { word: "experience", meaning: "kinh nghiệm" },
      { word: "confident", meaning: "tự tin" },
      { word: "improve", meaning: "cải thiện" }
    ],
    suggestions: [
      "I have three years of experience in software.",
      "My strongest skill is problem solving."
    ],
    advice: "Dùng cấu trúc STAR: Situation (Tình huống) - Task (Nhiệm vụ) - Action (Hành động) - Result (Kết quả).",
    goals: [
      { id: 'at2_intro', name: 'Tự giới thiệu bản thân', nameEn: 'Self-introduction', keywords: ['name', 'years', 'experience', 'background', 'graduate'] },
      { id: 'at2_strength', name: 'Nêu điểm mạnh chuyên môn', nameEn: 'State key strengths', keywords: ['strength', 'skill', 'lead', 'problem', 'creative'] },
      { id: 'at2_why', name: 'Lý do ứng tuyển vị trí này', nameEn: 'Reason for applying', keywords: ['company', 'grow', 'passion', 'opportunity', 'career'] },
    ]
  },
  {
    id: 'at3',
    name: 'Du lịch & Khách sạn',
    nameEn: 'Hotel & Travel Check-in',
    description: 'Hỏi đường, đặt phòng khách sạn',
    level: 'Beginner',
    welcomeMessage: {
      text: "Welcome to the Grand Hotel! How may I assist you with your travel and booking plans today?",
      vi: "Chào mừng tới Khách sạn Grand! Tôi có thể giúp gì cho kế hoạch đặt phòng và đi lại của bạn hôm nay?"
    },
    suggestedWords: [
      { word: "reservation", meaning: "đặt chỗ" },
      { word: "direction", meaning: "phương hướng" },
      { word: "travel", meaning: "du lịch" }
    ],
    suggestions: [
      "I have a reservation under my name.",
      "Could you point me to the bus station?"
    ],
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
    suggestedWords: [
      { word: "artificial", meaning: "nhân tạo" },
      { word: "intelligence", meaning: "trí tuệ" },
      { word: "learning", meaning: "học tập" }
    ],
    suggestions: [
      "AI helps me write code and learn languages faster.",
      "In my opinion, technology creates new opportunities."
    ],
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
    suggestedWords: [
      { word: "discount", meaning: "giảm giá" },
      { word: "beautiful", meaning: "đẹp" },
      { word: "favorite", meaning: "yêu thích" }
    ],
    suggestions: [
      "Do you have this in medium size?",
      "Is there any special discount on this item?"
    ],
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
    suggestedWords: [
      { word: "passport", meaning: "hộ chiếu" },
      { word: "window", meaning: "cửa sổ" },
      { word: "flight", meaning: "chuyến bay" }
    ],
    suggestions: [
      "Here is my passport and boarding reference.",
      "Can I request a window seat please?"
    ],
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
  const { setSidebarCollapsed } = useUiStore();

  // Automatically manage sidebar collapse when in AI conversation writing practice
  useEffect(() => {
    setSidebarCollapsed(true);
    return () => {
      setSidebarCollapsed(false);
    };
  }, [setSidebarCollapsed]);
  
  const [selectedTopicId, setSelectedTopicId] = useState<string>('at1');
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeTimeRef = useRef(0);
  const currentTopic = aiTopics.find((t) => t.id === selectedTopicId) || aiTopics[0];

  // Conversation Turn Messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      text: currentTopic.welcomeMessage.text,
      vietnameseTranslation: currentTopic.welcomeMessage.vi,
      suggestedWords: currentTopic.suggestedWords,
      suggestedPhrases: currentTopic.suggestions
    }
  ]);

  // Voice-First & Persistent Speech Recognition States
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const isRecordingRef = useRef(false);
  const accumulatedTextRef = useRef("");
  const speechRecognitionRef = useRef<any>(null);

  const [isAiTyping, setIsAiTyping] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
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
  
  // In-Place Completion & Scorecard State (No popup floating modal)
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);
  const [showChatHistoryInSummary, setShowChatHistoryInSummary] = useState(false);

  // Practice timer
  const [elapsedTime, setElapsedTime] = useState(0);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio Spectrum Visualizer
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const [audioFrequencies, setAudioFrequencies] = useState<number[]>(new Array(16).fill(10));
  const animationFrameRef = useRef<number | null>(null);

  // Active suggestions
  const [currentSuggestions, setCurrentSuggestions] = useState<{
    words: SuggestedWord[];
    phrases: string[];
  }>({
    words: currentTopic.suggestedWords,
    phrases: currentTopic.suggestions
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTopicDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSessionCompleted) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
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
  }, [isSessionCompleted]);

  useEffect(() => {
    if (!isSessionCompleted || showChatHistoryInSummary) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, spokenText, isSessionCompleted, showChatHistoryInSummary]);

  // When switching topic, reset conversation to topic's welcome message
  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopicId(topic.id);
    setIsTopicDropdownOpen(false);
    setIsSessionCompleted(false);
    setShowChatHistoryInSummary(false);
    setMessages([
      {
        id: `welcome_${topic.id}_${Date.now()}`,
        role: 'ai',
        text: topic.welcomeMessage.text,
        vietnameseTranslation: topic.welcomeMessage.vi,
        suggestedWords: topic.suggestedWords,
        suggestedPhrases: topic.suggestions
      }
    ]);
    setCurrentSuggestions({
      words: topic.suggestedWords,
      phrases: topic.suggestions
    });
    addToast({ type: "info", title: `Đã chọn: ${topic.name}` });
  };

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTranslation = (msgId: string) => {
    setShowTranslations((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const speakText = (text: string, speakerIndex: number = 0) => {
    speakLessonText(text, {
      lessonId: selectedTopicId || "ai_conversation",
      speakerIndex: speakerIndex,
      rate: 1.0,
    });
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

  // Audio Visualizer Loop
  const startAudioVisualizer = async () => {
    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
        }
      }

      if (audioContextRef.current?.state === "suspended") {
        await audioContextRef.current.resume();
      }

      if (!micStreamRef.current && navigator.mediaDevices?.getUserMedia) {
        micStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      if (audioContextRef.current && micStreamRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(micStreamRef.current);
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyserRef.current = analyser;

        const updateFrequencies = () => {
          if (analyserRef.current) {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            const freqs = Array.from(dataArray.slice(0, 16)).map((v) => Math.max(10, Math.min(100, Math.round((v / 255) * 100))));
            setAudioFrequencies(freqs);
          }
          animationFrameRef.current = requestAnimationFrame(updateFrequencies);
        };
        updateFrequencies();
      }
    } catch (err) {
      console.warn("Audio visualizer notice:", err);
      const synthetic = () => {
        setAudioFrequencies(Array.from({ length: 16 }).map(() => Math.floor(Math.random() * 70) + 20));
        animationFrameRef.current = requestAnimationFrame(synthetic);
      };
      synthetic();
    }
  };

  const stopAudioVisualizer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    setAudioFrequencies(new Array(16).fill(10));
  };

  // Continuous Persistent Web Speech Recognition (Voice-First Stream)
  const startRecording = () => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      addToast({
        type: "warning",
        title: "Trình duyệt chưa hỗ trợ 🎙️",
        message: "Vui lòng sử dụng Google Chrome, Edge hoặc Safari để trải nghiệm nhận diện giọng nói tốt nhất!"
      });
      return;
    }

    isRecordingRef.current = true;
    setIsRecording(true);
    setRecordingTime(0);

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    startAudioVisualizer();

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            const cleaned = transcript.trim();
            if (cleaned) {
              accumulatedTextRef.current = (accumulatedTextRef.current ? accumulatedTextRef.current + " " : "") + cleaned;
            }
          } else {
            interim += transcript;
          }
        }

        const combined = (accumulatedTextRef.current ? accumulatedTextRef.current + " " : "") + interim;
        setSpokenText(combined.trim());
      };

      // Seamless Auto-restart on silent pauses as long as user hasn't clicked Stop or Send
      recognition.onend = () => {
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch (err) {
            console.warn("Recognition restart buffer:", err);
          }
        }
      };

      recognition.onerror = (e: any) => {
        if (e.error === 'not-allowed') {
          addToast({
            type: "error",
            title: "Chưa cấp quyền Microphone 🎙️",
            message: "Vui lòng cấp quyền Micro trong cài đặt trình duyệt để tiếp tục luyện nói."
          });
          stopRecordingOnly();
          return;
        }
        console.warn("Speech recognition event:", e);
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch (err) {}
        }
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn("Speech recognition initialization error:", err);
      stopRecordingOnly();
    }
  };

  const stopRecordingOnly = () => {
    isRecordingRef.current = false;
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      speechRecognitionRef.current = null;
    }

    stopAudioVisualizer();
  };

  const handleResetSpeech = () => {
    accumulatedTextRef.current = "";
    setSpokenText("");
    if (isRecording) {
      stopRecordingOnly();
    }
    addToast({
      type: "info",
      title: "Đã làm mới ô nói 🔄",
      message: "Nhấn nút Micro để nói lại từ đầu."
    });
  };

  // Submit User Speech (Only when user explicitly clicks "Gửi")
  const handleSendSpokenSpeech = async (customText?: string) => {
    const messageText = customText || spokenText.trim();
    if (!messageText || isAiTyping) return;

    // Stop recording first
    stopRecordingOnly();

    accumulatedTextRef.current = "";
    setSpokenText("");

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
        const dynamicWords: SuggestedWord[] = data.suggestedWords && data.suggestedWords.length > 0
          ? data.suggestedWords.slice(0, 3)
          : currentTopic.suggestedWords.slice(0, 3);

        const dynamicPhrases: string[] = data.suggestedPhrases && data.suggestedPhrases.length > 0
          ? data.suggestedPhrases.slice(0, 2)
          : currentTopic.suggestions.slice(0, 2);

        const aiMsg: Message = {
          id: `ai_${Date.now()}`,
          role: 'ai',
          text: data.reply,
          vietnameseTranslation: data.vietnameseTranslation || data.translation || "",
          suggestedWords: dynamicWords,
          suggestedPhrases: dynamicPhrases,
        };

        // Update user message with AI grammar analysis if returned by backend
        if (data.grammarCorrection?.hasError || data.betterPhrasing) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === userMsg.id
                ? {
                    ...m,
                    grammarCorrection: data.grammarCorrection?.hasError ? data.grammarCorrection : m.grammarCorrection,
                    betterPhrasing: data.betterPhrasing || m.betterPhrasing,
                  }
                : m
            )
          );
        }

        setMessages((prev) => [...prev, aiMsg]);
        speakText(data.reply);

        setCurrentSuggestions({
          words: dynamicWords,
          phrases: dynamicPhrases
        });

        if (data.goalsCompleted && Array.isArray(data.goalsCompleted)) {
          data.goalsCompleted.forEach((gId: string) => {
            if (!completedGoalIds.includes(gId)) {
              setCompletedGoalIds((prev) => [...prev, gId]);
              markGoalCompleted(gId);
            }
          });
        }

        awardXp(10, "writing");
        useUserStore.getState().addPracticeTime(1, "writing");
      } else {
        const fallbackMsg: Message = {
          id: `ai_${Date.now()}`,
          role: 'ai',
          text: `That's very interesting! Regarding "${messageText}", how would you elaborate further?`,
          vietnameseTranslation: `Điều đó thật thú vị! Liên quan tới "${messageText}", bạn có thể diễn giải thêm không?`,
          suggestedWords: currentTopic.suggestedWords,
          suggestedPhrases: currentTopic.suggestions.slice(0, 2),
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
        suggestedWords: currentTopic.suggestedWords,
        suggestedPhrases: currentTopic.suggestions.slice(0, 2),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Session Statistics & Dynamic Evaluation Computation
  const userMessages = useMemo(() => messages.filter((m) => m.role === 'user'), [messages]);
  const userTurnsCount = userMessages.length;
  const grammarCorrections = useMemo(() => {
    return messages
      .filter((m) => m.grammarCorrection?.corrected || m.betterPhrasing)
      .map((m) => ({
        original: m.grammarCorrection?.original || m.text,
        corrected: m.grammarCorrection?.corrected,
        explanation: m.grammarCorrection?.explanation,
        betterPhrasing: m.betterPhrasing
      }));
  }, [messages]);

  const completedGoalsCount = useMemo(() => {
    return completedGoalIds.filter((id) => id.startsWith(currentTopic.id)).length;
  }, [completedGoalIds, currentTopic.id]);

  const sessionEvaluation = useMemo(() => {
    if (userTurnsCount === 0) {
      return {
        overallScore: 0,
        goalsScore: 0,
        grammarScore: 0,
        interactionScore: 0,
        vocabScore: 0,
        grade: "C",
        label: "Chưa Đánh Giá",
        color: "text-slate-600 bg-slate-500/10 border-slate-500/20",
        xpAward: 0,
      };
    }

    const totalGoals = currentTopic.goals.length || 3;
    const goalsScore = Math.min(100, Math.round((completedGoalsCount / totalGoals) * 100));
    const errorsCount = grammarCorrections.filter((g) => g.corrected).length;
    const grammarScore = Math.max(50, Math.min(100, 100 - (errorsCount * 15)));
    const interactionScore = Math.min(100, Math.max(60, userTurnsCount * 25));
    const vocabScore = Math.min(100, Math.max(65, 60 + userTurnsCount * 10));

    const overallScore = Math.round(
      0.40 * goalsScore +
      0.30 * grammarScore +
      0.20 * interactionScore +
      0.10 * vocabScore
    );

    let grade = "C";
    let label = "Cần Cố Gắng";
    let color = "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";
    let xpAward = 15;

    if (overallScore >= 90) {
      grade = "S";
      label = "Xuất Sắc";
      color = "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20";
      xpAward = 45;
    } else if (overallScore >= 80) {
      grade = "A";
      label = "Thành Thạo";
      color = "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      xpAward = 35;
    } else if (overallScore >= 70) {
      grade = "B";
      label = "Khá Tốt";
      color = "text-[#0059bb] dark:text-sky-400 bg-[#0059bb]/10 border-[#0059bb]/20";
      xpAward = 25;
    }

    return {
      overallScore,
      goalsScore,
      grammarScore,
      interactionScore,
      vocabScore,
      grade,
      label,
      color,
      xpAward,
    };
  }, [userTurnsCount, completedGoalsCount, currentTopic.goals.length, grammarCorrections]);

  // In-Place Finish & Scorecard Handler (Replaces chat stream in-place, No popup floating modal)
  const handleFinishConversation = () => {
    if (userTurnsCount === 0) {
      addToast({
        type: "warning",
        title: "Chưa có dữ liệu trò chuyện 🎙️",
        message: "Bạn hãy nhập hoặc nói ít nhất 1 câu để AI có thể đánh giá và chấm điểm nhé!",
      });
      return;
    }

    if (isRecording) {
      stopRecordingOnly();
    }
    setIsSessionCompleted(true);
    awardXp(sessionEvaluation.xpAward);
    addToast({
      type: "success",
      title: `Hoàn Thành Buổi Hội Thoại (Hạng ${sessionEvaluation.grade})! 🎉`,
      message: `+${sessionEvaluation.xpAward} XP cho thành tích xuất sắc!`,
    });
  };

  const handleRestartNewSession = () => {
    setIsSessionCompleted(false);
    setShowChatHistoryInSummary(false);
    setMessages([
      {
        id: `welcome_${currentTopic.id}_${Date.now()}`,
        role: 'ai',
        text: currentTopic.welcomeMessage.text,
        vietnameseTranslation: currentTopic.welcomeMessage.vi,
        suggestedWords: currentTopic.suggestedWords,
        suggestedPhrases: currentTopic.suggestions
      }
    ]);
    setElapsedTime(0);
    activeTimeRef.current = 0;
    setCurrentSuggestions({
      words: currentTopic.suggestedWords,
      phrases: currentTopic.suggestions
    });
    addToast({
      type: "info",
      title: "Bắt đầu buổi mới! 🎙️",
      message: `Chủ đề: ${currentTopic.name}`,
    });
  };

  return (
    <PageEntranceWrapper className="space-y-3 pb-24 md:pb-6 px-1.5 sm:px-0 relative select-none font-sans lg:flex lg:flex-col lg:min-h-[calc(100vh-4rem)]">
      
      {/* 0. TOP HERO ANNOUNCEMENT BANNER CARD (Minimalist Zen Studio) */}
      <MotionItem>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 sm:p-4 rounded-xs bg-[#0059bb]/5 dark:bg-blue-950/40 border border-[#0059bb]/15 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs shrink-0"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-[#0059bb]/20">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
            </div>
            
            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className={`px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-xs text-[10px] sm:text-xs font-black text-white shrink-0 whitespace-nowrap tracking-wide text-center sm:min-w-[155px] flex items-center justify-center ${
                  isSessionCompleted ? "bg-emerald-600" : "bg-[#0059bb]"
                }`}>
                  {isSessionCompleted ? "ĐÃ HOÀN THÀNH" : "AI CONVERSATION"}
                </span>

                {/* Compact Dropdown Topic Selector (Mở rộng dài hơn và thoáng hơn trên Desktop) */}
                {!isSessionCompleted ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                      className="px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-[#0059bb] text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between gap-2.5 sm:min-w-[220px] md:min-w-[250px] shadow-2xs cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="shrink-0">{TOPIC_ICONS[currentTopic.id]}</span>
                        <span className="truncate max-w-[140px] sm:max-w-[190px]">{currentTopic.name}</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isTopicDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isTopicDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          className="absolute left-0 top-full mt-1.5 z-50 w-64 sm:w-72 max-w-[calc(100vw-2rem)] p-1.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/15 shadow-2xl space-y-1"
                        >
                          <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Chọn chủ đề luyện nói:
                          </div>
                          {aiTopics.map((topic) => {
                            const isSelected = topic.id === selectedTopicId;
                            return (
                              <button
                                key={topic.id}
                                onClick={() => handleSelectTopic(topic)}
                                className={`w-full text-left p-2 rounded-xs flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 font-bold"
                                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span>{TOPIC_ICONS[topic.id]}</span>
                                  <div className="truncate">
                                    <div className="truncate">{topic.name}</div>
                                    <div className="text-[10px] text-slate-400 font-normal truncate">{topic.description}</div>
                                  </div>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#0059bb] shrink-0" />}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <h1 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white font-display truncate">
                    Báo Cáo & Chấm Điểm Buổi Luyện Nói
                  </h1>
                )}
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
            {isSessionCompleted ? (
              <button
                onClick={handleRestartNewSession}
                className="flex-1 sm:flex-initial px-3.5 py-1.5 sm:py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] active:scale-98 text-white text-xs sm:text-sm font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Luyện Buổi Mới</span>
              </button>
            ) : (
              <button
                onClick={handleFinishConversation}
                className="flex-1 sm:flex-initial px-3 py-1.5 sm:py-2 rounded-xs bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs sm:text-sm font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <CheckCircle2 className="w-4 h-4" strokeWidth={1.8} />
                <span className="hidden sm:inline">Hoàn thành & Chấm điểm</span>
                <span className="sm:hidden">Chấm điểm</span>
              </button>
            )}

            <span className="px-2.5 py-1.5 sm:py-2 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-2xs font-mono whitespace-nowrap shrink-0">
              <Clock className="w-4 h-4 text-amber-500" strokeWidth={1.8} /> {formatElapsedTime(elapsedTime)}
            </span>
          </div>
        </motion.div>
      </MotionItem>

      {/* 1. CHẾ ĐỘ THẾ CHỖ (IN-PLACE SWAP): CHAT STUDIO HOẶC BẢNG ĐÁNH GIÁ TỔNG KẾT */}
      {!isSessionCompleted ? (
        
        /* ===== VIEW 1: STUDIO HỘI THOẠI BENTO GRID (8/12 & 4/12) ===== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 lg:items-stretch min-w-0 lg:flex-1 lg:min-h-0 mt-1">
          
          {/* CỘT TRÁI: AI CHAT COMPANION WORKSPACE (8/12 Width) */}
          <div className="lg:col-span-8 flex flex-col min-w-0 lg:min-h-0">
            
            <div className="p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col min-w-0 lg:min-h-0 lg:flex-1 space-y-3">
              
              {/* Header Khung Chat Tối Giản */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span>{TOPIC_ICONS[currentTopic.id]}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                    {currentTopic.name} ({currentTopic.nameEn})
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 shrink-0 font-mono">
                  {completedGoalIds.filter((id) => id.startsWith(currentTopic.id)).length}/{currentTopic.goals.length} Mục tiêu
                </span>
              </div>

              {/* Scrollable Conversation Stream (Always keeps Micro dock in immediate viewport) */}
              <div className="h-[42svh] sm:h-[48svh] lg:h-[380px] xl:h-[430px] overflow-y-auto space-y-3.5 p-1 pr-1.5">
                {messages.map((msg) => {
                  const isAi = msg.role === 'ai';
                  const isTranslated = showTranslations[msg.id];

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                    >
                      {isAi && (
                        <div className="w-7 h-7 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-[#0059bb]/20 shadow-2xs text-xs font-bold">
                          <Bot className="w-4 h-4" strokeWidth={1.8} />
                        </div>
                      )}

                      <div className={`space-y-1.5 max-w-[85%] sm:max-w-[78%] ${isAi ? '' : 'items-end flex flex-col'}`}>
                        <div
                          className={`p-3 rounded-xs text-xs sm:text-sm font-medium leading-relaxed shadow-2xs transition-all ${
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
                            <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/10 text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-start gap-1">
                              <span className="shrink-0 text-slate-400 font-mono">[Dịch]</span>
                              <span>{msg.vietnameseTranslation}</span>
                            </div>
                          )}
                        </div>

                        {/* AI Instant Grammar & Phrasing Correction Card for User */}
                        {!isAi && (msg.grammarCorrection || msg.betterPhrasing) && (
                          <div className="p-2.5 rounded-xs bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 text-xs space-y-2 text-left w-full shadow-2xs">
                            {msg.grammarCorrection && (
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                                  <span>Sửa ngữ pháp:</span>
                                </div>
                                <div className="flex items-center flex-wrap gap-1.5 text-xs font-medium">
                                  <span className="line-through text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded-xs border border-rose-200/60 dark:border-rose-900/30">
                                    {msg.grammarCorrection.original}
                                  </span>
                                  <span className="text-slate-400 dark:text-slate-500 font-bold">→</span>
                                  <span className="font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-xs border border-emerald-200/60 dark:border-emerald-900/30">
                                    {msg.grammarCorrection.corrected}
                                  </span>
                                </div>
                                {msg.grammarCorrection.explanation && (
                                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 pt-0.5">
                                    {msg.grammarCorrection.explanation.replace(/^\((.*)\)$/, "$1").trim()}
                                  </p>
                                )}
                              </div>
                            )}

                            {msg.betterPhrasing && (
                              <div className="pt-1.5 border-t border-slate-200/60 dark:border-white/5 space-y-0.5">
                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0059bb] dark:text-sky-400">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#0059bb] dark:bg-sky-400 shrink-0"></span>
                                  <span>Diễn đạt tự nhiên hơn:</span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                    "{msg.betterPhrasing.replace(/^["']|["']$/g, '').replace(/^(A more natural way to say that (would be|is)|You could say|A better phrasing is|Try saying),?\s*/i, '').replace(/^["']|["']$/g, '')}"
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => speakText(msg.betterPhrasing?.replace(/^["']|["']$/g, '').replace(/^(A more natural way to say that (would be|is)|You could say|A better phrasing is|Try saying),?\s*/i, '').replace(/^["']|["']$/g, '') || "")}
                                    className="p-1 text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors shrink-0 cursor-pointer"
                                    title="Nghe phát âm câu tự nhiên"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* AI Action Strip */}
                        {isAi && (
                          <div className="flex items-center gap-2.5 px-0.5">
                            <button
                              onClick={() => speakText(msg.text)}
                              className="text-[10px] sm:text-[11px] font-bold text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Volume2 className="w-3 h-3 text-[#0059bb]" /> Nghe lại
                            </button>
                            {msg.vietnameseTranslation && (
                              <button
                                onClick={() => toggleTranslation(msg.id)}
                                className="text-[10px] sm:text-[11px] font-bold text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 cursor-pointer"
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
                  <div className="flex items-center gap-2 p-2 rounded-xs bg-[#0059bb]/5 dark:bg-[#0059bb]/20 border border-[#0059bb]/20 text-[#0059bb] dark:text-sky-400 text-xs font-bold animate-pulse w-fit">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> AI Companion đang suy nghĩ...
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Dải Gợi Ý Thuần Chữ (Hover không hiện gì, Click tự động đọc lên) */}
              {(currentSuggestions.words.length > 0 || currentSuggestions.phrases.length > 0) && (
                <div className="pt-2 pb-1 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex-wrap">
                  <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider flex items-center gap-1 shrink-0 select-none">
                    <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> Gợi ý:
                  </span>

                  {/* 3 Từ vựng: Hover không hiện gì, Click phát âm đọc lên */}
                  {currentSuggestions.words.slice(0, 3).map((w, idx) => (
                    <React.Fragment key={`w_${idx}`}>
                      {idx > 0 && <span className="text-slate-300 dark:text-slate-600 select-none">•</span>}
                      <button
                        type="button"
                        onClick={() => speakText(w.word)}
                        className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                      >
                        {w.word}
                      </button>
                    </React.Fragment>
                  ))}

                  {/* 2 Cụm câu mở đầu: Hover không hiện gì, Click phát âm đọc lên */}
                  {currentSuggestions.phrases.slice(0, 2).map((phrase, idx) => (
                    <React.Fragment key={`p_${idx}`}>
                      <span className="text-slate-300 dark:text-slate-600 select-none">•</span>
                      <button
                        type="button"
                        onClick={() => speakText(phrase)}
                        className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                      >
                        "{phrase}"
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* Text / Voice Typing Input Dock (Cho phép gõ phím tự do, hỗ trợ nhấn Enter để gửi) */}
              <div className="pt-1.5 border-t border-slate-100 dark:border-white/5 space-y-1.5">
                <div className="flex items-center gap-2">
                  
                  {/* Nút Micro hỗ trợ nhập liệu nhanh */}
                  <button
                    type="button"
                    onClick={isRecording ? stopRecordingOnly : startRecording}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer ${
                      isRecording
                        ? "bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/25"
                        : "bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                    }`}
                    title={isRecording ? "Đang thu âm (Nhấn để dừng)" : "Nhấn Micro để nói thay vì gõ phím"}
                  >
                    {isRecording ? <Square className="w-4 h-4 fill-white" /> : <Mic className="w-4.5 h-4.5 stroke-[2]" />}
                  </button>

                  {/* Khung Nhập Liệu Bàn Phím (Gõ phím tự do, nhấn Enter để gửi) */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={spokenText}
                      onChange={(e) => setSpokenText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && spokenText.trim() && !isAiTyping) {
                          e.preventDefault();
                          handleSendSpokenSpeech();
                        }
                      }}
                      placeholder={
                        isAiTyping
                          ? "AI Companion đang phản hồi..."
                          : isRecording
                          ? `🔴 Đang lắng nghe giọng nói... (00:${recordingTime < 10 ? `0${recordingTime}` : recordingTime})`
                          : "Nhập tin nhắn tiếng Anh của bạn (Nhấn Enter để gửi)..."
                      }
                      className="w-full h-10 pl-3.5 pr-9 text-xs sm:text-sm font-medium rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0059bb]"
                    />
                    {spokenText && (
                      <button
                        type="button"
                        onClick={handleResetSpeech}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                        title="Xóa nội dung ô nhập"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Nút Gửi */}
                  <button
                    type="button"
                    onClick={() => handleSendSpokenSpeech()}
                    disabled={!spokenText.trim() || isAiTyping}
                    className="h-10 px-4 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-40 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer shrink-0 transition-all"
                    title="Gửi câu trả lời (Phím Enter)"
                  >
                    <Send className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>Gửi</span>
                  </button>
                </div>

                {/* Active Audio Waveform */}
                {isRecording && (
                  <div className="flex items-center justify-center gap-[3px] h-4 bg-slate-50 dark:bg-slate-950/60 px-2 py-0.5 rounded-xs">
                    {audioFrequencies.map((freq, i) => (
                      <div
                        key={i}
                        className="w-[2.5px] rounded-full shrink-0 transition-all duration-75"
                        style={{
                          height: `${Math.max(3, Math.min(14, (freq / 100) * 14))}px`,
                          backgroundColor: '#f43f5e'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* CỘT PHẢI: UNIFIED SINGLE SIDEBAR CARD (4/12 Width) */}
          <div className="lg:col-span-4 flex flex-col min-w-0 lg:min-h-0">
            
            <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3.5 flex-1 flex flex-col justify-between">
              
              {/* Phần 1: Mục Tiêu Nói */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <span className="text-xs sm:text-sm font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#0059bb]" strokeWidth={1.8} /> MỤC TIÊU NÓI
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 font-mono">
                    {completedGoalIds.filter((id) => id.startsWith(currentTopic.id)).length}/{currentTopic.goals.length} Đạt
                  </span>
                </div>

                <div className="space-y-1.5">
                  {currentTopic.goals.map((goal) => {
                    const isDone = completedGoalIds.includes(goal.id);

                    return (
                      <div
                        key={goal.id}
                        className={`p-2 rounded-xs border text-xs font-semibold flex items-center justify-between gap-2 transition-all ${
                          isDone
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                            : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div className="truncate min-w-0">
                          <div className="truncate">{goal.name}</div>
                          <div className="text-[10px] text-slate-400 truncate">{goal.nameEn}</div>
                        </div>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={1.8} />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-white/20 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Phần 2: Từ Vựng Then Chốt & Mẹo Ngắn Gọn */}
              <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> TỪ VỰNG CHỦ ĐỀ
                  </span>
                  <span className="text-[10px] text-slate-400">Click tra/nghe</span>
                </div>

                <div className="space-y-1.5">
                  {currentTopic.suggestedWords.map((w, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleWordClick(w.word)}
                      className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-between gap-2 cursor-pointer group"
                    >
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0059bb]">
                          {w.word}
                        </span>
                        {w.meaning && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{w.meaning}</p>
                        )}
                      </div>
                      <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0059bb] shrink-0" />
                    </div>
                  ))}
                </div>

                {/* Mẹo 1 câu ngắn gọn */}
                <div className="p-2 rounded-xs bg-blue-50/60 dark:bg-blue-950/30 text-slate-600 dark:text-slate-300 text-[11px] flex items-start gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-700 dark:text-slate-300 leading-snug">"{currentTopic.advice}"</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      ) : (

        /* ===== VIEW 2: BẢNG TỔNG KẾT & CHẤM ĐIỂM THAY THẾ TRỰC TIẾP (IN-PLACE SCORECARD) ===== */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="space-y-3 mt-1"
        >
          {/* Top Overall Score Card */}
          <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                      Đánh Giá Chi Tiết Buổi Hội Thoại
                    </h2>
                    <span className="px-2 py-0.5 rounded-xs text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase">
                      Hoàn Tất
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Chủ đề: <strong className="text-slate-700 dark:text-slate-200">{currentTopic.name}</strong> ({currentTopic.nameEn})
                  </p>
                </div>
              </div>

              {/* Overall Score Badge */}
              <div className="flex items-center gap-3 sm:self-center">
                <div className={`px-2.5 py-1 rounded-xs border text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${sessionEvaluation.color}`}>
                  <span>Hạng {sessionEvaluation.grade}</span>
                  <span>•</span>
                  <span>{sessionEvaluation.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Điểm Phản Xạ</span>
                  <span className="text-xl sm:text-2xl font-black text-[#0059bb] dark:text-sky-400 font-display">
                    {sessionEvaluation.overallScore}/100
                  </span>
                </div>
                <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block" />
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phần Thưởng</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-500 font-display">
                    +{sessionEvaluation.xpAward} XP
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Quick Stat Metric Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Thời gian nói
                </span>
                <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
                  {formatElapsedTime(elapsedTime)}
                </p>
              </div>

              <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0059bb]" /> Lượt tương tác
                </span>
                <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
                  {userTurnsCount} câu
                </p>
              </div>

              <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-purple-500" /> Mục tiêu chủ đề
                </span>
                <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
                  {completedGoalsCount}/{currentTopic.goals.length} ({sessionEvaluation.goalsScore}%)
                </p>
              </div>

              <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Chuẩn ngữ pháp
                </span>
                <p className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {sessionEvaluation.grammarScore}%
                </p>
              </div>
            </div>

          </div>

          {/* Bento Detailed Analytics: Grammar Feedback & Mission Goals */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5">
            
            {/* Cột Trái: Lỗi Ngữ Pháp & Gợi Ý Phrasing Tự Nhiên (8/12) */}
            <div className="lg:col-span-8 p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" /> TỔNG HỢP NGỮ PHÁP & CÁCH DIỄN ĐẠT TỰ NHIÊN
                </h3>
                <span className="text-[11px] font-bold text-slate-400">
                  {grammarCorrections.length} ghi chú
                </span>
              </div>

              {grammarCorrections.length > 0 ? (
                <div className="space-y-2.5">
                  {grammarCorrections.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1.5 text-xs sm:text-sm"
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-slate-400 shrink-0">#{idx + 1}</span>
                        <div className="space-y-1 flex-1">
                          {item.corrected && (
                            <div>
                              <span className="text-rose-500 line-through mr-1.5">{item.original}</span>
                              ➔ <strong className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">{item.corrected}</strong>
                              {item.explanation && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.explanation.replace(/^\((.*)\)$/, "$1").trim()}</p>
                              )}
                            </div>
                          )}
                          {item.betterPhrasing && (
                            <div className="text-emerald-700 dark:text-emerald-300 font-medium">
                              <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-1">✨ Diễn đạt tự nhiên hơn:</span>
                              "{item.betterPhrasing}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xs bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-center space-y-1">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <p className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    Phản xạ rất tuyệt vời!
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Bạn không gặp lỗi ngữ pháp nghiêm trọng nào trong suốt buổi nói chuyện hôm nay.
                  </p>
                </div>
              )}

              {/* Toggle View Full Chat History */}
              <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setShowChatHistoryInSummary(!showChatHistoryInSummary)}
                  className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <History className="w-3.5 h-3.5" />
                  {showChatHistoryInSummary ? "Ẩn đoạn hội thoại chi tiết" : "Xem lại toàn bộ đoạn hội thoại"}
                </button>

                {showChatHistoryInSummary && (
                  <div className="mt-3 p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-2.5 max-h-[300px] overflow-y-auto">
                    {messages.map((m) => (
                      <div key={m.id} className="text-xs space-y-0.5">
                        <span className={`font-bold ${m.role === "ai" ? "text-[#0059bb]" : "text-slate-800 dark:text-slate-200"}`}>
                          {m.role === "ai" ? "AI Companion:" : "Bạn:"}
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{m.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Cột Phải: Mục Tiêu Đạt Được & Hành Động Tiếp Theo (4/12) */}
            <div className="lg:col-span-4 p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#0059bb]" /> MỤC TIÊU CHỦ ĐỀ
                </h3>
                <span className="text-[11px] font-bold text-slate-400 font-mono">
                  {completedGoalIds.filter((id) => id.startsWith(currentTopic.id)).length}/{currentTopic.goals.length} Đạt
                </span>
              </div>

              <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                {currentTopic.goals.map((goal) => {
                  const isDone = completedGoalIds.includes(goal.id);

                  return (
                    <div
                      key={goal.id}
                      className={`p-2 rounded-xs border text-xs font-bold flex items-center justify-between gap-2 ${
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
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={1.8} />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-white/20 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                <button
                  onClick={handleRestartNewSession}
                  className="w-full py-2.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] active:scale-98 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Bắt Đầu Buổi Mới (+10 XP/câu)
                </button>

                <Link
                  href="/dashboard"
                  className="w-full py-2 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  Về Bảng Điều Khiển
                </Link>
              </div>
            </div>

          </div>

        </motion.div>
      )}

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
                <BookMarked className="w-4 h-4 text-[#0059bb]" strokeWidth={1.8} />
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase font-display">
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

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0059bb] dark:text-sky-400 capitalize font-display">
                  {selectedWordData.word}
                </h3>
                <button
                  onClick={() => speakText(selectedWordData.word)}
                  className="px-2 py-0.5 rounded-xs bg-blue-50 dark:bg-sky-950/40 text-[#0059bb] text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3 h-3" strokeWidth={1.8} /> Nghe
                </button>
              </div>

              {selectedWordData.ipa && (
                <p className="text-[11px] font-mono text-slate-400 font-bold">{selectedWordData.ipa}</p>
              )}

              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {selectedWordData.meaning}
              </p>
            </div>

            <button
              onClick={handleSaveWordToVocab}
              className="w-full py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-all"
            >
              <BookmarkCheck className="w-3.5 h-3.5" strokeWidth={1.8} />
              Lưu vào Sổ tay từ vựng (+5 XP)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </PageEntranceWrapper>
  );
}
