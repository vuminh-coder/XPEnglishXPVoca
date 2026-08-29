'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useUiStore } from '@/stores/uiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import { speakLessonText } from '@/shared/utils/ttsEngine';
import { useStudyTimeTracker } from '@/shared/hooks/useStudyTimeTracker';
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

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
  VolumeX,
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
  CheckCircle,
  Wand2,
} from 'lucide-react';

const SpeakingIcon = ({
  className = "w-3.5 h-3.5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 15a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
    <circle cx="9" cy="7" r="3" />
    <path d="M17 9a3 3 0 0 1 0 6" />
    <path d="M20 7a6 6 0 0 1 0 10" />
  </svg>
);

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
    hasError?: boolean;
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
    name: 'Đặt món tại nhà hàng',
    nameEn: 'Ordering at a Restaurant',
    description: 'Tập gọi món, yêu cầu đặc biệt và thanh toán hóa đơn.',
    level: 'Beginner',
    goals: [
      { id: 'at1_g1', name: 'Gọi ít nhất 1 món ăn', nameEn: 'Order a dish', keywords: ['order', 'like', 'have', 'salad', 'pizza', 'pasta', 'steak', 'soup'] },
      { id: 'at1_g2', name: 'Yêu cầu đồ uống', nameEn: 'Ask for a drink', keywords: ['drink', 'water', 'juice', 'coffee', 'tea', 'coke', 'wine', 'beer'] },
      { id: 'at1_g3', name: 'Hỏi hóa đơn thanh toán', nameEn: 'Ask for the bill', keywords: ['bill', 'check', 'pay', 'card', 'cash', 'how much'] },
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
    id: 'at2',
    name: 'Phỏng vấn xin việc',
    nameEn: 'Job Interview',
    description: 'Thực hành giới thiệu bản thân và kinh nghiệm làm việc.',
    level: 'Intermediate',
    goals: [
      { id: 'at2_g1', name: 'Giới thiệu bản thân & nền tảng', nameEn: 'Introduce yourself', keywords: ['name', 'graduated', 'background', 'years', 'study', 'experience', 'work'] },
      { id: 'at2_g2', name: 'Nêu điểm mạnh chính', nameEn: 'State your strength', keywords: ['strength', 'good at', 'skill', 'teamwork', 'communication', 'problem', 'lead'] },
      { id: 'at2_g3', name: 'Lý do muốn làm việc tại công ty', nameEn: 'Why this company', keywords: ['company', 'culture', 'grow', 'opportunity', 'passion', 'value', 'contribute'] },
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
    id: 'at3',
    name: 'Thủ tục tại sân bay',
    nameEn: 'Airport Check-in',
    description: 'Luyện tập làm thủ tục check-in, chọn chỗ ngồi và qua cửa an ninh.',
    level: 'Beginner',
    goals: [
      { id: 'at3_g1', name: 'Xuất trình hộ chiếu & vé', nameEn: 'Show passport & ticket', keywords: ['passport', 'ticket', 'flight', 'here', 'booking', 'seat'] },
      { id: 'at3_g2', name: 'Chọn chỗ ngồi (cửa sổ / lối đi)', nameEn: 'Choose your seat', keywords: ['window', 'aisle', 'seat', 'prefer', 'front', 'middle'] },
      { id: 'at3_g3', name: 'Gửi hành lý ký gửi', nameEn: 'Check in baggage', keywords: ['bag', 'luggage', 'suitcase', 'check', 'carry', 'weight'] },
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
    id: 'at4',
    name: 'Thảo luận công nghệ & AI',
    nameEn: 'Tech & AI Trends',
    description: 'Bàn luận về trí tuệ nhân tạo, tương lai công việc và đổi mới.',
    level: 'Advanced',
    goals: [
      { id: 'at4_g1', name: 'Nêu quan điểm về AI hiện nay', nameEn: 'State your AI view', keywords: ['ai', 'artificial', 'intelligence', 'think', 'believe', 'technology', 'transform'] },
      { id: 'at4_g2', name: 'Nêu 1 cơ hội hoặc rủi ro', nameEn: 'Mention benefit/risk', keywords: ['risk', 'opportunity', 'benefit', 'job', 'automate', 'replace', 'future', 'ethics'] },
      { id: 'at4_g3', name: 'Đưa ra dự đoán tương lai', nameEn: 'Give a prediction', keywords: ['predict', 'will', 'future', 'decade', 'evolve', 'human', 'society'] },
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
    id: 'at5',
    name: 'Mua sắm & Hỏi giá',
    nameEn: 'Shopping & Bargaining',
    description: 'Hỏi size, chất liệu, hỏi giảm giá và chính sách đổi trả.',
    level: 'Beginner',
    goals: [
      { id: 'at5_g1', name: 'Hỏi kích cỡ hoặc màu sắc', nameEn: 'Ask for size/color', keywords: ['size', 'color', 'medium', 'large', 'small', 'blue', 'black', 'have'] },
      { id: 'at5_g2', name: 'Hỏi giá hoặc xin giảm giá', nameEn: 'Ask for price/discount', keywords: ['how much', 'price', 'cost', 'discount', 'deal', 'expensive', 'cheap'] },
      { id: 'at5_g3', name: 'Quyết định mua và thanh toán', nameEn: 'Decide to buy', keywords: ['take', 'buy', 'pay', 'cash', 'card', 'receipt'] },
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
    id: 'at6',
    name: 'Hỏi đường khi đi du lịch',
    nameEn: 'Asking for Directions',
    description: 'Hỏi đường đến địa danh nổi tiếng, trạm xe buýt hoặc khách sạn.',
    level: 'Beginner',
    goals: [
      { id: 'at6_g1', name: 'Hỏi vị trí của một địa điểm', nameEn: 'Ask where something is', keywords: ['where', 'how to get', 'find', 'station', 'museum', 'hotel', 'street'] },
      { id: 'at6_g2', name: 'Hỏi về khoảng cách hoặc thời gian', nameEn: 'Ask distance/time', keywords: ['far', 'walk', 'minutes', 'bus', 'taxi', 'how long', 'distance'] },
      { id: 'at6_g3', name: 'Cảm ơn sự giúp đỡ', nameEn: 'Thank for help', keywords: ['thank', 'appreciate', 'helpful', 'grateful', 'have a nice day'] },
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

export default function AiConversationPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { setSidebarCollapsed } = useUiStore();

  // Auto collapse sidebar for focused studio space
  useEffect(() => {
    setSidebarCollapsed(true);
    return () => {
      setSidebarCollapsed(false);
    };
  }, [setSidebarCollapsed]);

  const [selectedTopicId, setSelectedTopicId] = useState<string>('at1');
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTopic = useMemo(() => {
    return aiTopics.find((t) => t.id === selectedTopicId) || aiTopics[0];
  }, [selectedTopicId]);

  // Initial welcome message per topic
  const [messages, setMessages] = useState<Message[]>([
    {
      id: `welcome_${aiTopics[0].id}`,
      role: 'ai',
      text: aiTopics[0].welcomeMessage.text,
      vietnameseTranslation: aiTopics[0].welcomeMessage.vi,
      suggestedWords: aiTopics[0].suggestedWords,
      suggestedPhrases: aiTopics[0].suggestions
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTranslations, setShowTranslations] = useState<{ [key: string]: boolean }>({});
  
  // Voice recording & input states
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const isRecordingRef = useRef(false);
  const accumulatedTextRef = useRef("");
  const speechRecognitionRef = useRef<any>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio spectrum visualizer
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const [audioFrequencies, setAudioFrequencies] = useState<number[]>(new Array(16).fill(10));
  const animationFrameRef = useRef<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Active suggestions & dictionary
  const [currentSuggestions, setCurrentSuggestions] = useState<{
    words: SuggestedWord[];
    phrases: string[];
  }>({
    words: aiTopics[0].suggestedWords,
    phrases: aiTopics[0].suggestions
  });

  const [selectedWordData, setSelectedWordData] = useState<{
    word: string;
    ipa?: string;
    meaning?: string;
    example?: string;
  } | null>(null);

  // Session stats & completion
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);
  const [showChatHistoryInSummary, setShowChatHistoryInSummary] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const activeTimeRef = useRef(0);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Real-time backend practice time tracker
  useStudyTimeTracker("speaking", {
    activeCondition: !isSessionCompleted,
  });

  // Track study time
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

  // Close topic dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsTopicDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto scroll chat
  useEffect(() => {
    if (!isSessionCompleted || showChatHistoryInSummary) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiTyping, spokenText, isSessionCompleted, showChatHistoryInSummary]);

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTranslation = (msgId: string) => {
    setShowTranslations((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const speakText = (text: string) => {
    if (!soundEnabled || !text) return;
    setIsSpeaking(true);
    speakLessonText(text, {
      lessonId: `ai_chat_${selectedTopicId}`,
      speakerIndex: 1,
      accent: 'en-US',
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (!cleanWord || cleanWord.length < 2) return;

    speakText(cleanWord);

    const dictEntry = IPA_DICTIONARY[cleanWord];
    setSelectedWordData({
      word: cleanWord,
      ipa: dictEntry?.ipa || `/${cleanWord}/`,
      meaning: dictEntry?.meaning || `Nghĩa Tiếng Việt của từ "${cleanWord}"`,
      example: `Used naturally: "${cleanWord}"`
    });
  };

  const handleSaveWordToVocab = () => {
    if (!selectedWordData) return;
    awardXp(5);
    addToast({
      type: 'success',
      title: 'Đã lưu vào Sổ tay từ vựng! 💾',
      message: `+5 XP cho từ "${selectedWordData.word}"`,
    });
    setSelectedWordData(null);
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

  // Continuous Speech Recognition
  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addToast({
        type: "error",
        title: "Trình duyệt không hỗ trợ Web Speech API",
        message: "Vui lòng sử dụng Google Chrome, Edge hoặc Safari để luyện nói trực tiếp qua Micro.",
      });
      return;
    }

    try {
      if (speechRecognitionRef.current) {
        try { speechRecognitionRef.current.stop(); } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      accumulatedTextRef.current = spokenText.trim() ? spokenText.trim() + " " : "";

      recognition.onstart = () => {
        setIsRecording(true);
        isRecordingRef.current = true;
        setRecordingTime(0);
        recordingTimerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
        startAudioVisualizer();
      };

      recognition.onresult = (event: any) => {
        let currentInterim = "";
        let newFinals = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            newFinals += transcript + " ";
          } else {
            currentInterim += transcript;
          }
        }

        if (newFinals) {
          accumulatedTextRef.current += newFinals;
        }

        const fullRecognized = (accumulatedTextRef.current + currentInterim).trim();
        setSpokenText(fullRecognized);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event.error);
      };

      recognition.onend = () => {
        if (isRecordingRef.current) {
          try { recognition.start(); } catch (e) { stopRecordingOnly(); }
        } else {
          stopRecordingOnly();
        }
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error("Speech Recognition initialization error:", e);
      addToast({
        type: "error",
        title: "Không thể kích hoạt Micro",
        message: "Hãy cấp quyền Micro trong trình duyệt để nói trực tiếp.",
      });
    }
  };

  const stopRecordingOnly = () => {
    isRecordingRef.current = false;
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    stopAudioVisualizer();
    if (speechRecognitionRef.current) {
      try { speechRecognitionRef.current.stop(); } catch (e) {}
      speechRecognitionRef.current = null;
    }
  };

  const handleResetSpeech = () => {
    accumulatedTextRef.current = "";
    setSpokenText("");
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopicId(topic.id);
    setIsTopicDropdownOpen(false);
    setIsSessionCompleted(false);
    setShowChatHistoryInSummary(false);
    setElapsedTime(0);
    activeTimeRef.current = 0;
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
    addToast({
      type: 'info',
      title: 'Đã chuyển chủ đề! ✨',
      message: `${topic.name} (${topic.nameEn})`,
    });
  };

  // Goal Tracking Engine
  const completedGoalIds = useMemo(() => {
    const completed = new Set<string>();
    const userTextCombined = messages
      .filter((m) => m.role === 'user')
      .map((m) => m.text.toLowerCase())
      .join(' ');

    currentTopic.goals.forEach((goal) => {
      const isMatched = goal.keywords.some((kw) => userTextCombined.includes(kw.toLowerCase()));
      if (isMatched) {
        completed.add(goal.id);
      }
    });

    return Array.from(completed);
  }, [messages, currentTopic.goals]);

  // Send Message (Text or Spoken)
  const handleSendMessage = async (customMessage?: string) => {
    const rawText = customMessage !== undefined ? customMessage : (spokenText.trim() || inputText.trim());
    const messageText = rawText.trim();
    if (!messageText || isAiTyping) return;

    if (isRecording) {
      stopRecordingOnly();
    }
    accumulatedTextRef.current = "";
    setSpokenText('');
    setInputText('');

    let grammarFix: { hasError?: boolean; original: string; corrected: string; explanation: string } | undefined = undefined;
    let naturalWay: string | undefined = undefined;

    if (/\bi go to\b/i.test(messageText) && /\byesterday\b/i.test(messageText)) {
      grammarFix = {
        hasError: true,
        original: messageText,
        corrected: messageText.replace(/i go to/i, "I went to"),
        explanation: "Dùng quá khứ đơn 'went' thay vì 'go' khi có trạng từ 'yesterday'."
      };
      naturalWay = messageText.replace(/i go to/i, "I visited");
    } else if (/\bi am go\b/i.test(messageText)) {
      grammarFix = {
        hasError: true,
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

        awardXp(15);
      }
    } catch (err) {
      console.error(err);
      const fallbackReply = `That's very clear! Could you elaborate a little more about your preference?`;
      const fallbackVi = `Ý của bạn rất rõ ràng! Bạn có thể chia sẻ thêm một chút về sở thích của mình không?`;

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        role: 'ai',
        text: fallbackReply,
        vietnameseTranslation: fallbackVi,
        suggestedWords: currentTopic.suggestedWords.slice(0, 3),
        suggestedPhrases: currentTopic.suggestions.slice(0, 2),
      };
      setMessages((prev) => [...prev, aiMsg]);
      speakText(fallbackReply);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleMicrophoneToggle = () => {
    if (isRecording) {
      if (spokenText.trim()) {
        handleSendMessage();
      } else {
        stopRecordingOnly();
      }
    } else {
      startRecording();
    }
  };

  // Session Statistics & Evaluation
  const userMessages = useMemo(() => messages.filter((m) => m.role === 'user'), [messages]);
  const userTurnsCount = userMessages.length;
  const grammarCorrections = useMemo(() => {
    return messages
      .filter((m) => m.grammarCorrection?.hasError || m.betterPhrasing)
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
        color: "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
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
    let color = "text-amber-700 dark:text-amber-300 bg-amber-500/10 border-amber-500/30";
    let xpAward = 15;

    if (overallScore >= 90) {
      grade = "S";
      label = "Xuất Sắc";
      color = "text-purple-700 dark:text-purple-300 bg-purple-500/10 border-purple-500/30";
      xpAward = 45;
    } else if (overallScore >= 80) {
      grade = "A";
      label = "Thành Thạo";
      color = "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/30";
      xpAward = 35;
    } else if (overallScore >= 70) {
      grade = "B";
      label = "Khá Tốt";
      color = "text-[#0059bb] dark:text-sky-300 bg-[#0059bb]/10 border-[#0059bb]/30";
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

  const handleFinishConversation = () => {
    if (userTurnsCount === 0) {
      addToast({
        type: "warning",
        title: "Chưa có dữ liệu trò chuyện ✍️",
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
      title: `Hoàn Thành Bài Luyện Viết (Hạng ${sessionEvaluation.grade})! 🎉`,
      message: `+${sessionEvaluation.xpAward} XP cho chủ đề "${currentTopic.name}"!`,
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
      title: "Bắt đầu buổi mới! ✨",
      message: `Chủ đề: ${currentTopic.name}`,
    });
  };

  return (
    <div className="w-full h-full min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      
      {/* 1. APP TOP HEADER (FIXED 56PX) */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-xs font-bold font-mono tabular-nums flex items-center gap-1.5 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{formatElapsedTime(elapsedTime)}</span>
            </span>

            {isSessionCompleted ? (
              <button
                type="button"
                onClick={handleRestartNewSession}
                className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Buổi mới</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishConversation}
                className="h-9 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Chấm điểm</span>
              </button>
            )}
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            href="/ai/tutor"
            icon={<SpeakingIcon className="w-3.5 h-3.5" />}
            label="Luyện nói"
          />
          <HeaderPillItem
            active
            icon={<Wand2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Luyện viết"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN DASHBOARD-STYLE VIEWPORT CANVAS (FITS IN 1 SCREEN ON DESKTOP) */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3.5 lg:py-3 flex flex-col min-h-0 lg:overflow-hidden space-y-2.5 sm:space-y-3 pb-24 lg:pb-3">
        
        {/* 2.1. SLIM HERO TOPIC STATUS STRIP */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="shrink-0 relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/50 flex items-center justify-center text-[#0059bb] dark:text-sky-400 shadow-2xs">
                {TOPIC_ICONS[currentTopic.id] || <MessageSquare className="w-4 h-4" />}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {!isSessionCompleted ? (
                  /* Topic Selector Dropdown */
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 hover:border-[#0059bb] text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 shadow-2xs cursor-pointer transition-all"
                    >
                      <span className="truncate max-w-[170px] sm:max-w-[240px] font-display">{currentTopic.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isTopicDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isTopicDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          className="absolute left-0 top-full mt-1.5 z-50 w-72 sm:w-80 max-w-[calc(100vw-2rem)] p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-1"
                        >
                          <div className="px-2.5 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Chọn chủ đề luyện viết:
                          </div>
                          {aiTopics.map((topic) => {
                            const isSelected = topic.id === selectedTopicId;
                            return (
                              <button
                                key={topic.id}
                                type="button"
                                onClick={() => handleSelectTopic(topic)}
                                className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold border border-blue-200/60 dark:border-blue-800/40"
                                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-transparent"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span>{TOPIC_ICONS[topic.id]}</span>
                                  <div className="truncate">
                                    <div className="text-xs font-bold truncate text-slate-900 dark:text-white">{topic.name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{topic.description}</div>
                                  </div>
                                </div>
                                {isSelected && <Check className="w-4 h-4 text-[#0059bb] shrink-0 stroke-[3]" />}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                    Báo Cáo Buổi Luyện Viết
                  </span>
                )}

                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-bold font-mono border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
                  {currentTopic.level}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                {isSessionCompleted
                  ? `Đã hoàn thành buổi đánh giá chủ đề "${currentTopic.name}"`
                  : currentTopic.description}
              </p>
            </div>
          </div>

          {/* Mobile Right Action */}
          <div className="flex sm:hidden items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-xs font-bold font-mono tabular-nums flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{formatElapsedTime(elapsedTime)}</span>
            </span>

            {isSessionCompleted ? (
              <button
                type="button"
                onClick={handleRestartNewSession}
                className="h-8 px-3 rounded-lg bg-[#0059bb] text-white text-xs font-bold flex items-center gap-1 shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Buổi mới</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishConversation}
                className="h-8 px-3 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Chấm điểm</span>
              </button>
            )}
          </div>
        </div>

        {/* 2.2. MAIN BENTO GRID: FITS STRICTLY IN DESKTOP VIEWPORT */}
        {!isSessionCompleted ? (

          /* ===== VIEW 1: STUDIO BENTO GRID (8/12 - 4/12) ===== */
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 items-stretch min-w-0">
            
            {/* CỘT TRÁI: AI CHAT COMPANION & INPUT DOCK (8/12) */}
            <div className="lg:col-span-8 flex flex-col min-w-0 lg:h-full lg:min-h-0">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col min-w-0 flex-1 lg:h-full lg:min-h-0 space-y-2.5">
                
                {/* Header Trong Khung Chat */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 gap-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold text-xs font-mono border border-blue-200/60 dark:border-blue-800/40">
                      AI Tutor
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                      {currentTopic.name} ({currentTopic.nameEn})
                    </span>
                  </div>

                  {/* Sound Button */}
                  <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer ${
                      soundEnabled
                        ? "bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#0059bb]"
                        : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400"
                    }`}
                    title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
                  >
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{soundEnabled ? "Bật âm" : "Tắt âm"}</span>
                  </button>
                </div>

                {/* Scrollable Chat Stream Box */}
                <div className="flex-1 min-h-[280px] lg:min-h-0 overflow-y-auto space-y-3 p-1 pr-1.5 scrollbar-thin">
                  {messages.map((msg) => {
                    const isAi = msg.role === 'ai';
                    const isTranslated = showTranslations[msg.id];

                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                      >
                        {isAi && (
                          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/80 dark:border-blue-800/50 shadow-2xs text-xs font-mono font-bold">
                            <Bot className="w-4 h-4 stroke-[2]" />
                          </div>
                        )}

                        <div className={`space-y-1.5 max-w-[88%] sm:max-w-[82%] ${isAi ? '' : 'items-end flex flex-col'}`}>
                          
                          {/* Chat Bubble */}
                          <div
                            className={`p-3 rounded-xl text-xs sm:text-sm font-medium leading-relaxed shadow-2xs transition-all ${
                              isAi
                                ? 'bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white'
                                : 'bg-gradient-to-r from-[#0059bb] to-blue-600 text-white shadow-sm'
                            }`}
                          >
                            {/* Word-by-word 1-Click Interactive Text Rendering for AI */}
                            {isAi ? (
                              <div className="flex flex-wrap gap-1 leading-relaxed">
                                {msg.text.split(" ").map((w, idx) => (
                                  <span
                                    key={idx}
                                    onClick={() => handleWordClick(w)}
                                    className="cursor-pointer hover:bg-blue-100 dark:hover:bg-sky-400/20 hover:text-[#0059bb] dark:hover:text-sky-300 rounded px-0.5 py-0.2 transition-colors font-medium text-xs sm:text-sm"
                                  >
                                    {w}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs sm:text-sm">{msg.text}</p>
                            )}

                            {/* Vietnamese Translation Display */}
                            {isTranslated && msg.vietnameseTranslation && (
                              <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-start gap-1.5">
                                <span className="shrink-0 text-[#0059bb] dark:text-sky-400 font-bold font-mono">[Dịch]</span>
                                <span>{msg.vietnameseTranslation}</span>
                              </div>
                            )}
                          </div>

                          {/* AI Grammar Correction Card */}
                          {!isAi && (msg.grammarCorrection?.hasError || msg.betterPhrasing) && (
                            <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-2 text-left w-full shadow-2xs">
                              {msg.grammarCorrection?.hasError && (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                    <span>Sửa ngữ pháp:</span>
                                  </div>
                                  <div className="flex items-center flex-wrap gap-1.5 text-xs font-semibold">
                                    <span className="line-through text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-200/60 dark:border-rose-900/30">
                                      {msg.grammarCorrection.original}
                                    </span>
                                    <span className="text-slate-400 dark:text-slate-500 font-bold">➔</span>
                                    <span className="font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/30">
                                      {msg.grammarCorrection.corrected}
                                    </span>
                                  </div>
                                  {msg.grammarCorrection.explanation && (
                                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 pt-0.5">
                                      {msg.grammarCorrection.explanation.replace(/^\((.*)\)$/, "$1").trim()}
                                    </p>
                                  )}
                                </div>
                              )}

                              {msg.betterPhrasing && (
                                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700 space-y-1">
                                  <div className="flex items-center gap-1 text-xs font-bold text-[#0059bb] dark:text-sky-400">
                                    <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" />
                                    <span>Diễn đạt tự nhiên hơn:</span>
                                  </div>
                                  <div className="flex items-center justify-between gap-2">
                                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                      "{msg.betterPhrasing.replace(/^["']|["']$/g, '').replace(/^(A more natural way to say that (would be|is)|You could say|A better phrasing is|Try saying),?\s*/i, '').replace(/^["']|["']$/g, '')}"
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => speakText(msg.betterPhrasing?.replace(/^["']|["']$/g, '').replace(/^(A more natural way to say that (would be|is)|You could say|A better phrasing is|Try saying),?\s*/i, '').replace(/^["']|["']$/g, '') || "")}
                                      className="p-1 rounded text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors shrink-0 cursor-pointer"
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
                            <div className="flex items-center gap-3 px-1">
                              <button
                                type="button"
                                onClick={() => speakText(msg.text)}
                                className="text-xs font-bold text-slate-600 hover:text-[#0059bb] dark:text-slate-300 dark:hover:text-sky-400 flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" /> Nghe lại
                              </button>
                              {msg.vietnameseTranslation && (
                                <button
                                  type="button"
                                  onClick={() => toggleTranslation(msg.id)}
                                  className="text-xs font-bold text-slate-600 hover:text-[#0059bb] dark:text-slate-300 dark:hover:text-sky-400 cursor-pointer"
                                >
                                  {isTranslated ? "Ẩn dịch" : "Xem bản dịch"}
                                </button>
                              )}
                            </div>
                          )}

                        </div>

                        {!isAi && (
                          <UserAvatar
                            avatar={(user as any)?.avatar}
                            avatarUrl={(user as any)?.avatarUrl}
                            imageUrl={user?.imageUrl}
                            emoji={user?.avatarEmoji}
                            name={user?.fullName || user?.username || user?.email}
                            size="w-8 h-8"
                            className="mt-0.5 shrink-0"
                          />
                        )}
                      </div>
                    );
                  })}

                  {isAiTyping && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 text-[#0059bb] dark:text-sky-300 text-xs font-bold animate-pulse w-fit shadow-2xs">
                      <RefreshCw className="w-4 h-4 animate-spin" /> AI đang suy nghĩ câu trả lời...
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Dải Gợi Ý Thuần Chữ (Shrink-0) */}
                {(currentSuggestions.words.length > 0 || currentSuggestions.phrases.length > 0) && (
                  <div className="pt-2 pb-0.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 flex-wrap shrink-0">
                    <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider flex items-center gap-1 shrink-0 select-none">
                      <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> Gợi ý:
                    </span>

                    {currentSuggestions.words.slice(0, 3).map((w, idx) => (
                      <React.Fragment key={`w_${idx}`}>
                        {idx > 0 && <span className="text-slate-300 dark:text-slate-600 select-none">•</span>}
                        <button
                          type="button"
                          onClick={() => handleSendMessage(w.word)}
                          className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-400 cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors"
                        >
                          {w.word}
                        </button>
                      </React.Fragment>
                    ))}

                    {currentSuggestions.phrases.slice(0, 2).map((phrase, idx) => (
                      <React.Fragment key={`p_${idx}`}>
                        <span className="text-slate-300 dark:text-slate-600 select-none">•</span>
                        <button
                          type="button"
                          onClick={() => handleSendMessage(phrase)}
                          className="text-xs text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 font-semibold cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors truncate max-w-[220px]"
                        >
                          "{phrase}"
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Voice & Text Input Dock (Pinned to bottom of left card) */}
                <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                  <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                    
                    {/* Micro Toggle-to-Send Button */}
                    <button
                      type="button"
                      onClick={handleMicrophoneToggle}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer ${
                        isRecording
                          ? "bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/25"
                          : "bg-[#0059bb] hover:bg-[#004899] text-white hover:scale-105 active:scale-95"
                      }`}
                      title={
                        isRecording
                          ? "Đang thu âm • Bấm lại Micro để DỪNG VÀ GỬI ĐI"
                          : "Nhấn nút Micro để nói tiếng Anh (Bấm lại để gửi)"
                      }
                    >
                      {isRecording ? <Square className="w-4 h-4 fill-white" /> : <Mic className="w-4.5 h-4.5 stroke-[2]" />}
                    </button>

                    {/* Text Input Box */}
                    <div className="relative flex-1">
                      <input
                        type="text"
                        disabled={isAiTyping}
                        value={isRecording ? spokenText : inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !isAiTyping) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder={
                          isAiTyping
                            ? "AI đang phản hồi..."
                            : isRecording
                            ? `🔴 Đang nghe bạn nói... (00:${recordingTime < 10 ? `0${recordingTime}` : recordingTime}) • Bấm lại Micro để GỬI`
                            : "Nhập câu trả lời bằng tiếng Anh hoặc bấm Micro để nói..."
                        }
                        className="w-full h-9 pl-3 pr-8 text-xs sm:text-sm font-medium rounded-lg bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0059bb]"
                      />
                      {(inputText || spokenText) && (
                        <button
                          type="button"
                          onClick={() => {
                            setInputText("");
                            handleResetSpeech();
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                          title="Xóa văn bản"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Send Button */}
                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      disabled={(!inputText.trim() && !spokenText.trim()) || isAiTyping}
                      className="h-9 px-3.5 rounded-lg bg-[#0059bb] hover:bg-[#004899] disabled:opacity-40 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer shrink-0 transition-all active:scale-95"
                      title="Gửi tin nhắn (Phím Enter)"
                    >
                      <Send className="w-3.5 h-3.5 stroke-[2]" />
                      <span className="hidden sm:inline">Gửi</span>
                    </button>
                  </div>

                  {/* Active Audio Waveform */}
                  {(isRecording || isSpeaking) && (
                    <div className="flex items-center justify-center gap-[3px] h-4 bg-slate-50 dark:bg-slate-950/60 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                      {audioFrequencies.map((freq, i) => (
                        <div
                          key={i}
                          className="w-[2.5px] rounded-full shrink-0 transition-all duration-75"
                          style={{
                            height: `${Math.max(3, Math.min(12, (freq / 100) * 12))}px`,
                            backgroundColor: isRecording ? "#f43f5e" : "#0059bb",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* CỘT PHẢI: GOALS & CONTEXTUAL VOCABULARY DECK (4/12) */}
            <div className="lg:col-span-4 flex flex-col min-w-0 lg:h-full lg:min-h-0">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-2.5 lg:h-full lg:min-h-0 overflow-y-auto">
                
                {/* 1. MỤC TIÊU PHẢN XẠ NGỮ CẢNH (GOALS CHECKLIST) */}
                <div className="space-y-2 shrink-0">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-[#0059bb]" /> MỤC TIÊU GIAO TIẾP
                    </h2>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-bold font-mono border border-blue-200/60 dark:border-blue-800/40">
                      {completedGoalsCount}/{currentTopic.goals.length} Đạt
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentTopic.goals.map((goal) => {
                      const isDone = completedGoalIds.includes(goal.id);
                      return (
                        <div
                          key={goal.id}
                          className={`p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                            isDone
                              ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500/30 text-emerald-800 dark:text-emerald-200 shadow-2xs"
                              : "bg-slate-50/70 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className={`text-xs font-bold ${isDone ? "text-emerald-900 dark:text-emerald-100" : "text-slate-900 dark:text-white"}`}>
                              {goal.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                              {goal.nameEn}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. TỪ VỰNG NGỮ CẢNH (3 ITEMS NO CUTOFF) */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> TỪ VỰNG NGỮ CẢNH
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Click tra/nghe</span>
                  </div>

                  <div className="space-y-1.5">
                    {currentSuggestions.words.slice(0, 3).map((w, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleWordClick(w.word)}
                        className="px-3 py-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800/80 transition-all flex items-center justify-between gap-2 cursor-pointer group shadow-2xs"
                      >
                        <div className="min-w-0">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-300 transition-colors">
                            {w.word}
                          </span>
                          {w.meaning && (
                            <p className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium">{w.meaning}</p>
                          )}
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center group-hover:bg-[#0059bb] group-hover:text-white group-hover:border-[#0059bb] transition-all shrink-0">
                          <Volume2 className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. MẪU CÂU GỢI Ý PHẢN XẠ (NO ITALIC & 1-CLICK SEND) */}
                {currentSuggestions.phrases.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> MẪU CÂU GỢI Ý
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Click để gửi</span>
                    </div>

                    <div className="space-y-1.5">
                      {currentSuggestions.phrases.slice(0, 2).map((ph, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(ph)}
                          className="w-full text-left px-3 py-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 hover:border-amber-400 dark:hover:border-amber-700 text-amber-950 dark:text-amber-100 transition-all flex items-center justify-between gap-2 group cursor-pointer shadow-2xs"
                        >
                          <span className="text-xs font-semibold truncate flex-1">
                            "{ph}"
                          </span>
                          <Send className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        ) : (

          /* ===== VIEW 2: IN-PLACE SCORECARD & SUMMARY (COMPACT & FITS IN VIEWPORT) ===== */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-h-0 overflow-y-auto space-y-3"
          >
            {/* Top Overall Score Card */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-2xs shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                        Đánh Giá Buổi Luyện Viết
                      </h2>
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase">
                        Hoàn Tất
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      Chủ đề: <strong className="text-slate-900 dark:text-white">{currentTopic.name}</strong> ({currentTopic.nameEn})
                    </p>
                  </div>
                </div>

                {/* Overall Score Badge */}
                <div className="flex items-center gap-3 sm:self-center">
                  <div className={`px-3 py-1 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs ${sessionEvaluation.color}`}>
                    <span>Hạng {sessionEvaluation.grade}</span>
                    <span>•</span>
                    <span>{sessionEvaluation.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Điểm Tổng Kết</span>
                    <span className="text-lg sm:text-xl font-black text-[#0059bb] dark:text-sky-400 font-display tabular-nums">
                      {sessionEvaluation.overallScore}/100
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Phần Thưởng</span>
                    <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 font-display tabular-nums">
                      +{sessionEvaluation.xpAward} XP
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Quick Stat Metric Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-amber-500" /> Mục tiêu hoàn thành
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                    {completedGoalsCount}/{currentTopic.goals.length} ({sessionEvaluation.goalsScore}%)
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#0059bb]" /> Lượt tương tác
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                    {userTurnsCount} câu
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Chuẩn ngữ pháp
                  </span>
                  <p className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                    {sessionEvaluation.grammarScore}%
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" /> Thời gian luyện
                  </span>
                  <p className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
                    {formatElapsedTime(elapsedTime)}
                  </p>
                </div>
              </div>

            </div>

            {/* Bento Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              
              {/* Cột Trái: Lỗi Ngữ Pháp & Gợi Ý Phrasing Tự Nhiên (8/12) */}
              <div className="lg:col-span-8 p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> TỔNG HỢP NGỮ PHÁP & DIỄN ĐẠT TỰ NHIÊN
                  </h3>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono">
                    {grammarCorrections.length} ghi chú
                  </span>
                </div>

                {grammarCorrections.length > 0 ? (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {grammarCorrections.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs sm:text-sm"
                      >
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-slate-400 shrink-0 font-mono text-xs">#{idx + 1}</span>
                          <div className="space-y-1 flex-1">
                            {item.corrected && (
                              <div>
                                <span className="text-rose-600 dark:text-rose-400 line-through mr-1 font-semibold">{item.original}</span>
                                ➔ <strong className="text-emerald-700 dark:text-emerald-300 font-bold ml-1">{item.corrected}</strong>
                                {item.explanation && (
                                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{item.explanation.replace(/^\((.*)\)$/, "$1").trim()}</p>
                                )}
                              </div>
                            )}
                            {item.betterPhrasing && (
                              <div className="text-emerald-800 dark:text-emerald-200 font-medium pt-1">
                                <span className="font-bold text-emerald-700 dark:text-emerald-300 mr-1.5">✨ Diễn đạt tự nhiên:</span>
                                "{item.betterPhrasing}"
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-center space-y-1.5">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto" />
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      Diễn đạt rất tốt!
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Bạn không gặp lỗi ngữ pháp nghiêm trọng nào trong suốt buổi đối thoại hôm nay.
                    </p>
                  </div>
                )}

                {/* Toggle View Full Chat History */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowChatHistoryInSummary(!showChatHistoryInSummary)}
                    className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>{showChatHistoryInSummary ? "Ẩn đoạn hội thoại chi tiết" : "Xem lại toàn bộ đoạn hội thoại"}</span>
                  </button>

                  {showChatHistoryInSummary && (
                    <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2 max-h-[200px] overflow-y-auto">
                      {messages.map((m) => (
                        <div key={m.id} className="text-xs space-y-0.5">
                          <span className={`font-bold ${m.role === 'ai' ? "text-[#0059bb] dark:text-sky-400" : "text-slate-900 dark:text-white"}`}>
                            {m.role === 'ai' ? "AI Tutor:" : "Bạn:"}
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">{m.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Cột Phải: Lời Khuyên & Nút Hành Động (4/12) */}
              <div className="lg:col-span-4 p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
                
                {/* Advice Card */}
                <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0059bb]" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Lời Khuyên Giao Tiếp
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-blue-200/60 dark:border-blue-900/30">
                    "{currentTopic.advice}"
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <button
                    type="button"
                    onClick={handleRestartNewSession}
                    className="w-full py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] active:scale-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-4 h-4" /> Bắt Đầu Buổi Mới (+15 XP/câu)
                  </button>

                  <Link
                    href="/dashboard"
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors block text-center"
                  >
                    Về Bảng Điều Khiển
                  </Link>
                </div>
              </div>

            </div>

          </motion.div>
        )}

      </div>

      {/* 3. 1-CLICK INTERACTIVE WORD DICTIONARY FLOATING MODAL */}
      <AnimatePresence>
        {selectedWordData && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-3 right-3 bottom-20 sm:left-auto sm:right-6 sm:bottom-6 z-50 w-auto sm:w-84 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-3 select-none"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <BookMarked className="w-4 h-4 text-[#0059bb]" />
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-display">
                  Tra Từ Vựng Nhanh
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedWordData(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-[#0059bb] dark:text-sky-400 capitalize font-display">
                  {selectedWordData.word}
                </h3>
                <button
                  type="button"
                  onClick={() => speakText(selectedWordData.word)}
                  className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-sky-950/40 text-[#0059bb] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe
                </button>
              </div>

              {selectedWordData.ipa && (
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">{selectedWordData.ipa}</p>
              )}

              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {selectedWordData.meaning}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSaveWordToVocab}
              className="w-full py-2 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all active:scale-95"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Lưu vào Sổ tay từ vựng (+5 XP)</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
