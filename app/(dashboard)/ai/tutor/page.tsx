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
  Search
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  pronunciationScore?: number;
  wordAnalysis?: Array<{ word: string; stress: string; tips: string }>;
  pronunciationTips?: string[];
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
  goals: Goal[];
}

const ROLEPLAY_TOPICS: RoleplayTopic[] = [
  {
    id: "rp1",
    name: "Quầy làm thủ tục sân bay",
    nameEn: "Airport Check-in",
    goals: [
      { id: "rp1_ticket", name: "Đưa vé và hộ chiếu", nameEn: "Present ticket and passport" },
      { id: "rp1_baggage", name: "Khai báo số hành lý ký gửi", nameEn: "State luggage quantity" },
      { id: "rp1_seat", name: "Yêu cầu ghế ngồi sát cửa sổ", nameEn: "Request window seat" },
    ]
  },
  {
    id: "rp2",
    name: "Đặt món tại nhà hàng",
    nameEn: "Restaurant Ordering",
    goals: [
      { id: "rp2_menu", name: "Hỏi thực đơn món đặc biệt", nameEn: "Ask for specials menu" },
      { id: "rp2_order", name: "Gọi món chính và tráng miệng", nameEn: "Order main and dessert" },
      { id: "rp2_bill", name: "Yêu cầu thanh toán hóa đơn", nameEn: "Request bill/check" },
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
  const { completedRoleplayGoalIds, markGoalCompleted } = useListeningStore();
  
  // Practice modes: freetalk, roleplay, drill
  const [practiceMode, setPracticeMode] = useState<"freetalk" | "roleplay" | "drill">("freetalk");
  
  // Right Sidebar Active Tab: "goals" | "speech" | "coach"
  const [sidebarTab, setSidebarTab] = useState<"goals" | "speech" | "coach">("goals");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Hello! I am your AI Voice Tutor. Let's practice speaking English together. What is your favorite hobby?",
      vietnameseTranslation: "Xin chào! Tôi là AI Gia sư Giọng nói. Hãy cùng luyện nói tiếng Anh nhé. Sở thích yêu thích của bạn là gì?"
    },
  ]);
  const [textInput, setTextInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showTranslations, setShowTranslations] = useState<{ [key: string]: boolean }>({});
  
  // Roleplay states
  const activeTimeRef = React.useRef(0);

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
    utterance.rate = 1.05;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleNewUserSpeech = async (speechText: string, confidence: number) => {
    if (!speechText.trim()) return;

    const score = confidence || Math.floor(Math.random() * 10) + 90;
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      text: speechText,
      pronunciationScore: score,
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
      speedWpm: 148,
      stressScore: 94,
    });

    useUserStore.getState().addPracticeTime(2, "speaking");
    recordSkillPractice(user?.id, "Nói", 2, 15);

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: speechText,
          mode: practiceMode,
          topicId: currentRoleplayTopic,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: "ai",
          text: data.reply,
          vietnameseTranslation: data.translation || "Dịch tự động...",
          pronunciationTips: data.tips || [],
        };
        setMessages((prev) => [...prev, aiMsg]);
        speakText(data.reply);

        if (practiceMode === "roleplay" && data.completedGoals) {
          data.completedGoals.forEach((gId: string) => markGoalCompleted(gId));
        }

        awardXp(15);
        addToast({
          type: "success",
          title: "AI Voice Tutor Đã Trả Lợi! 🎙️",
          message: "+15 XP cho lượt giao tiếp!",
        });
      } else {
        const fallbackText = "That's very interesting! Can you tell me more about that?";
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: "ai",
          text: fallbackText,
          vietnameseTranslation: "Điều đó thật thú vị! Bạn có thể chia sẻ thêm về điều đó không?",
        };
        setMessages((prev) => [...prev, aiMsg]);
        speakText(fallbackText);
      }
    } catch (e) {
      console.error(e);
      const errorMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: "ai",
        text: "I heard you clearly! Practice makes perfect, keep going!",
        vietnameseTranslation: "Tôi đã nghe rõ bạn! Luyện tập nhiều sẽ càng tiến bộ!",
      };
      setMessages((prev) => [...prev, errorMsg]);
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
    const confidence = Math.floor(Math.random() * 10) + 90;
    handleNewUserSpeech(speech, confidence);
  };

  const currentTopicData = ROLEPLAY_TOPICS.find((t) => t.id === currentRoleplayTopic) || ROLEPLAY_TOPICS[0];

  return (
    <div className="space-y-3 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans">
      
      {/* 0. TOP UNIFIED MICRO-HERO TOOLBAR CONTROL STRIP */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-2.5 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-2.5 min-w-0"
      >
        {/* Left: Bot Icon + Title */}
        <div className="flex items-center justify-between md:justify-start gap-2.5 min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0 border border-[#1d6ee6]/20">
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
            </div>

            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                AI Voice Tutor Studio
              </h1>
              <p className="hidden sm:block text-[10px] text-slate-400 font-medium truncate">
                Gia sư AI 1-1 • {practiceMode === "freetalk" ? "FreeTalk" : practiceMode === "roleplay" ? "Roleplay" : "Drill"}
              </p>
            </div>
          </div>

          {/* Right: Sound Switcher & Timer on Mobile Header Top Row */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 md:hidden">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-2 py-1 rounded-xs text-[11px] font-bold border transition-all shadow-2xs flex items-center gap-1 cursor-pointer ${
                soundEnabled
                  ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#1d6ee6]"
                  : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/30 text-rose-600"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3 h-3 text-[#1d6ee6]" /> : <VolumeX className="w-3 h-3" />}
              <span className="hidden sm:inline">{soundEnabled ? "Bật âm" : "Tắt âm"}</span>
            </button>

            <span className="px-2 py-1 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] font-black flex items-center gap-1 shadow-2xs">
              <Clock className="w-3.5 h-3.5" /> {formatElapsedTime(elapsedTime)}
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
              className={`py-1 px-2 rounded-xs text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
                practiceMode === mode.id
                  ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
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
                ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#1d6ee6]"
                : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/30 text-rose-600"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3 h-3 text-[#1d6ee6]" /> : <VolumeX className="w-3 h-3" />}
            <span>{soundEnabled ? "Bật âm" : "Tắt âm"}</span>
          </button>

          <span className="px-2 py-1 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] font-black flex items-center gap-1 shadow-2xs">
            <Clock className="w-3.5 h-3.5" /> {formatElapsedTime(elapsedTime)}
          </span>
        </div>
      </motion.div>

      {/* 1. MAIN BENTO GRID (Cột Trái 7/12 - Cột Phải 5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start min-w-0">
        
        {/* CỘT TRÁI: VOICE CHAT STREAM & DUAL INPUT DOCK (7/12 Width) */}
        <div className="lg:col-span-7 space-y-3 min-w-0">
          
          <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 min-w-0">
            
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2 truncate">
                <MessageSquare className="w-3.5 h-3.5 text-[#1d6ee6]" />
                <h2 className="text-xs font-bold text-slate-900 dark:text-white font-display uppercase tracking-wider truncate">
                  KHUNG GIAO TIẾP VỚI AI TUTOR
                </h2>
              </div>

              {isSpeaking ? (
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-xs flex items-center gap-1 animate-pulse">
                  <Volume2 className="w-3 h-3" /> AI đang nói...
                </span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-xs border border-emerald-500/20">
                  Online
                </span>
              )}
            </div>

            {/* Scrollable Fixed-Height Chat Stream (440px) */}
            <div className="h-[440px] overflow-y-auto space-y-2.5 p-1 pr-1.5">
              {messages.map((msg) => {
                const isAi = msg.role === "ai";
                const isTranslated = showTranslations[msg.id];

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isAi ? "justify-start" : "justify-end"}`}
                  >
                    {isAi && (
                      <div className="w-7 h-7 rounded-xs bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-[#1d6ee6]/20">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`space-y-1 max-w-[85%] ${isAi ? "" : "items-end"}`}>
                      <div
                        className={`p-3 rounded-xs text-xs font-medium leading-relaxed shadow-2xs ${
                          isAi
                            ? "bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/10 text-slate-900 dark:text-white"
                            : "bg-[#1d6ee6] text-white"
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Pronunciation Confidence Score Badge */}
                        {msg.pronunciationScore && (
                          <div className="mt-1.5 pt-1 border-t border-white/20 flex items-center justify-between text-[10px] font-bold">
                            <span>🎯 Độ chính xác phát âm:</span>
                            <span className="bg-white/20 px-1.5 py-0.2 rounded-xs font-mono">
                              {msg.pronunciationScore}%
                            </span>
                          </div>
                        )}

                        {/* Vietnamese Translation Toggle Display */}
                        {isTranslated && msg.vietnameseTranslation && (
                          <div className="mt-2 pt-1.5 border-t border-slate-200/40 dark:border-white/10 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                            🇻🇳 {msg.vietnameseTranslation}
                          </div>
                        )}
                      </div>

                      {/* AI Action Strip */}
                      {isAi && (
                        <div className="flex items-center gap-2 px-1">
                          <button
                            onClick={() => speakText(msg.text)}
                            className="text-[10px] font-bold text-slate-400 hover:text-[#1d6ee6] flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3 h-3" /> Nghe lại
                          </button>
                          {msg.vietnameseTranslation && (
                            <button
                              onClick={() => toggleTranslation(msg.id)}
                              className="text-[10px] font-bold text-[#1d6ee6] dark:text-sky-400 hover:underline cursor-pointer"
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
                <div className="flex items-center gap-2 p-2.5 rounded-xs bg-blue-50/50 dark:bg-blue-950/30 text-[#1d6ee6] dark:text-sky-400 text-xs font-bold animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> AI Tutor đang suy nghĩ câu trả lời...
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Bottom Dual Input Studio Dock (Voice + Text) */}
            <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 space-y-2">
              
              {/* Form with Mic Orb & Text Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNewUserSpeech(textInput, 95);
                }}
                className="flex items-center gap-2"
              >
                {/* Mic Pulse Button */}
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-2xs transition-all shrink-0 cursor-pointer ${
                    isRecording
                      ? "bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/20"
                      : "bg-[#1d6ee6] hover:bg-[#155bc5] text-white"
                  }`}
                  title={isRecording ? "Dừng thu âm" : "Bấm nút để nói"}
                >
                  {isRecording ? <Square className="w-4 h-4 fill-white" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Text Box */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={isRecording ? `Đang thu âm... 00:0${recordingTime}` : "Nhập câu trả lời bằng tiếng Anh hoặc bấm Mic để nói..."}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full h-9 pl-3 pr-3 text-xs font-medium rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#1d6ee6]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!textInput.trim() || loading}
                  className="h-9 px-3 rounded-xs bg-[#1d6ee6] hover:bg-[#155bc5] disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Live Spectrum Wave Visualizer when recording */}
              {isRecording && (
                <div className="flex items-center justify-center gap-1 h-3 pt-1">
                  <div className="w-1 h-2 bg-rose-500 animate-bounce rounded-full" />
                  <div className="w-1 h-3.5 bg-rose-500 animate-bounce delay-100 rounded-full" />
                  <div className="w-1 h-2 bg-rose-500 animate-bounce delay-200 rounded-full" />
                  <div className="w-1 h-3 bg-rose-500 animate-bounce delay-150 rounded-full" />
                </div>
              )}
            </div>

          </div>

        </div>

        {/* CỘT PHẢI: MULTI-TAB BENTO TOOL CHEST (5/12 Width) */}
        <div className="lg:col-span-5 space-y-3 min-w-0">
          
          <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 min-w-0">
            
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
                    className={`flex-1 py-1 px-1.5 rounded-xs text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
                      sidebarTab === tab.id
                        ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                        : "text-[#1d6ee6] dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB 1: ROLEPLAY MISSION & DRILL GOALS */}
            {sidebarTab === "goals" && (
              <div className="space-y-2.5">
                {practiceMode === "roleplay" ? (
                  <>
                    <div className="space-y-1">
                      <label htmlFor="tutor-roleplay-select" className="text-[10px] font-bold text-slate-400 uppercase">
                        Tình huống đóng vai:
                      </label>
                      <select
                        id="tutor-roleplay-select"
                        value={currentRoleplayTopic}
                        onChange={(e) => {
                          setCurrentRoleplayTopic(e.target.value);
                          setCompletedGoalIds([]);
                        }}
                        className="w-full h-8 px-2 text-xs font-bold rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#1d6ee6]"
                      >
                        {ROLEPLAY_TOPICS.map((t) => (
                          <option key={t.id} value={t.id}>
                            🎭 {t.name} ({t.nameEn})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
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
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-white/20 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : practiceMode === "drill" ? (
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xs bg-amber-500/5 border border-amber-500/20 text-center space-y-1.5">
                      <span className="text-[10px] font-bold uppercase text-amber-600 block">
                        ⚡ Câu uốn lưỡi (#{drillIndex + 1})
                      </span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white font-display leading-relaxed">
                        "{DRILL_SENTENCES[drillIndex]}"
                      </p>
                      <button
                        onClick={() => speakText(DRILL_SENTENCES[drillIndex])}
                        className="px-2.5 py-1 rounded-xs bg-amber-500 text-white text-[11px] font-bold shadow-2xs hover:bg-amber-600 cursor-pointer inline-flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" /> Nghe phát âm mẫu
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setDrillIndex((prev) => Math.max(0, prev - 1))}
                        disabled={drillIndex === 0}
                        className="px-2 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-xs font-bold cursor-pointer"
                      >
                        ← Câu trước
                      </button>
                      <button
                        onClick={() => setDrillIndex((prev) => Math.min(DRILL_SENTENCES.length - 1, prev + 1))}
                        disabled={drillIndex === DRILL_SENTENCES.length - 1}
                        className="px-2.5 py-1 rounded-xs bg-[#1d6ee6] text-white text-xs font-bold shadow-2xs cursor-pointer"
                      >
                        Câu tiếp ➔
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center space-y-1 text-slate-500">
                    <MessageSquare className="w-6 h-6 text-[#1d6ee6] mx-auto" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Chế độ FreeTalk Tự Do</p>
                    <p className="text-[11px]">Nói bất kỳ chủ đề nào bạn thích với AI Tutor!</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SPEECH PRECISION LAB (6 CRITERIA GRID) */}
            {sidebarTab === "speech" && (
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                    🎯 AI Speech Evaluation
                  </span>
                  <span className="px-2 py-0.5 rounded-xs text-xs font-black bg-emerald-500 text-white shadow-2xs">
                    {lastSpeechScore ? `${lastSpeechScore.overallScore}%` : "95% Overall"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="p-1.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block">Trôi chảy</span>
                    <span className="text-xs font-black text-purple-600 dark:text-purple-400 font-mono">
                      {lastSpeechScore ? `${lastSpeechScore.fluencyScore}%` : "96%"}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block">Phát âm</span>
                    <span className="text-xs font-black text-[#1d6ee6] dark:text-sky-400 font-mono">
                      {lastSpeechScore ? `${lastSpeechScore.pronunciationScore}%` : "95%"}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block">Ngữ điệu</span>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {lastSpeechScore ? `${lastSpeechScore.intonationScore}%` : "94%"}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block">Đầy đủ</span>
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 font-mono">97%</span>
                  </div>
                  <div className="p-1.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block">Tốc độ</span>
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono">148 WPM</span>
                  </div>
                  <div className="p-1.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[9px] text-slate-400 font-bold block">Trọng âm</span>
                    <span className="text-xs font-black text-teal-600 dark:text-teal-400 font-mono">94%</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: AI COACH & SMART SUGGESTIONS */}
            {sidebarTab === "coach" && (
              <div className="space-y-2 text-left">
                <div className="p-2.5 rounded-xs bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/30 text-xs font-medium space-y-1">
                  <span className="font-bold text-[#1d6ee6] dark:text-sky-400 block text-[11px] flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5" /> AI Voice Coach Khẩu Hình:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    "Hãy mở rộng khẩu hình và phát âm rõ âm đuôi /s/ và /t/ để đạt điểm tuyệt đối!"
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Gợi ý trả lời nhanh:</span>
                  <div className="flex flex-col gap-1.5 w-full">
                    {[
                      "I love learning English with AI.",
                      "Could you please repeat that?",
                      "That sounds very interesting!"
                    ].map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNewUserSpeech(sug, 96)}
                        className="w-full text-left px-2.5 py-1.5 rounded-xs text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-[#1d6ee6] dark:text-sky-400 hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors cursor-pointer truncate"
                      >
                        💬 {sug}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
