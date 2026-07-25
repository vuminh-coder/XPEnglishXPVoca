'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
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
  Filter
} from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  nameEn: string;
}

interface Topic {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  goals: Goal[];
}

interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
  vietnameseTranslation?: string;
  corrections?: string[];
  suggestions?: string[];
}

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  'at1': <Utensils className="w-4 h-4 text-amber-500" strokeWidth={2} />,
  'at2': <Briefcase className="w-4 h-4 text-blue-500" strokeWidth={2} />,
  'at3': <Plane className="w-4 h-4 text-emerald-500" strokeWidth={2} />,
  'at4': <Cpu className="w-4 h-4 text-purple-500" strokeWidth={2} />,
};

const aiTopics: Topic[] = [
  {
    id: 'at1',
    name: 'Gọi đồ ăn',
    nameEn: 'Ordering Food',
    description: 'Luyện đặt món tại nhà hàng',
    level: 'Beginner',
    goals: [
      { id: 'at1_salad', name: 'Gọi món salad', nameEn: 'Order a salad' },
      { id: 'at1_orange', name: 'Gọi nước cam', nameEn: 'Order orange juice' },
      { id: 'at1_no_ice', name: 'Yêu cầu không đá', nameEn: 'Request no ice' },
    ]
  },
  {
    id: 'at2',
    name: 'Phỏng vấn xin việc',
    nameEn: 'Job Interview',
    description: 'Chuẩn bị cho buổi phỏng vấn',
    level: 'Intermediate',
    goals: [
      { id: 'at2_intro', name: 'Giới thiệu bản thân', nameEn: 'Introduce yourself' },
      { id: 'at2_skills', name: 'Mô tả kỹ năng/kinh nghiệm', nameEn: 'Describe skills/experience' },
      { id: 'at2_salary', name: 'Đề cập mức lương mong muốn', nameEn: 'Mention salary expectation' },
    ]
  },
  {
    id: 'at3',
    name: 'Du lịch',
    nameEn: 'Traveling',
    description: 'Hỏi đường, đặt khách sạn',
    level: 'Beginner',
    goals: [
      { id: 'at3_directions', name: 'Hỏi đường/địa điểm', nameEn: 'Ask for directions' },
      { id: 'at3_hotel', name: 'Thảo luận đặt phòng khách sạn', nameEn: 'Discuss hotel room booking' },
      { id: 'at3_price', name: 'Hỏi giá vé/giá phòng', nameEn: 'Ask about price' },
    ]
  },
  {
    id: 'at4',
    name: 'Thảo luận công nghệ',
    nameEn: 'Tech Discussion',
    description: 'Nói về AI, blockchain, apps',
    level: 'Advanced',
    goals: [
      { id: 'at4_explain_ai', name: 'Giải thích về ứng dụng/AI', nameEn: 'Explain an app/AI tool' },
      { id: 'at4_opinion', name: 'Nêu quan điểm về công nghệ', nameEn: 'Share tech opinions' },
      { id: 'at4_future', name: 'Mô tả tương lai công nghệ', nameEn: 'Describe future tech vision' },
    ]
  }
];

export default function ConversationPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { completedRoleplayGoalIds, markGoalCompleted } = useListeningStore();
  
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>('at1');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      text: "Hi! I'm your AI speaking companion. Please select a topic to start practicing, or write anything you want!",
      vietnameseTranslation: "Xin chào! Tôi là người bạn đồng hành AI của bạn. Hãy chọn một chủ đề để bắt đầu luyện tập!",
      suggestions: ["I'd like to order food please.", "Can you tell me about the menu?", "What is the best dish here?"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showTranslations, setShowTranslations] = useState<{ [key: string]: boolean }>({});
  
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
  const [reviewText, setReviewText] = useState("");

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

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTopic = aiTopics.find((t) => t.id === selectedTopicId) || aiTopics[0];

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
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isAiTyping) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: messageText,
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
          vietnameseTranslation: data.translation || "Bản dịch tự động...",
          suggestions: data.suggestions || ["Can you explain that again?", "That sounds great!", "What do you think?"],
          corrections: data.corrections || [],
        };

        setMessages((prev) => [...prev, aiMsg]);
        speakText(data.reply);

        // Auto mark goal completion simulate
        if (currentTopic.goals.length > completedGoalIds.length) {
          const nextGoal = currentTopic.goals.find((g) => !completedGoalIds.includes(g.id));
          if (nextGoal) {
            markGoalCompleted(nextGoal.id);
          }
        }

        awardXp(10);
      } else {
        const fallbackMsg: Message = {
          id: `ai_${Date.now()}`,
          role: 'ai',
          text: "I understand! That's a great point. How else would you like to continue our conversation?",
          vietnameseTranslation: "Tôi hiểu! Đó là một ý kiến tuyệt vời. Bạn muốn tiếp tục cuộc trò chuyện thế nào?",
          suggestions: ["Let me tell you more.", "What is your advice?", "Can we switch topics?"],
        };
        setMessages((prev) => [...prev, fallbackMsg]);
        speakText(fallbackMsg.text);
      }
    } catch (err) {
      console.error(err);
      const errMsg: Message = {
        id: `ai_${Date.now()}`,
        role: 'ai',
        text: "Thanks for sharing! Keep practicing speaking English every day!",
        vietnameseTranslation: "Cảm ơn bạn đã chia sẻ! Hãy tiếp tục luyện nói tiếng Anh hàng ngày nhé!",
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

    const demoText = "I'd like to order a fresh salad and orange juice without ice please.";
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
    <div className="space-y-3.5 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans">
      
      {/* 0. Top Hero Announcement Banner Card (Dashboard Style) */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3.5 rounded-lg bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-2xs"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-md bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4 stroke-[2]" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-[#1d6ee6] text-white shadow-2xs">
                AI CONVERSATION COMPANION
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                Luyện Giao Tiếp Tiếng Anh Theo Chủ Đề AI Thực Tế
              </h3>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
              💬 Trò chuyện 1-1 với AI, nhận phản hồi tức thì, gợi ý câu nói & sửa lỗi ngữ pháp tự động
            </p>
          </div>
        </div>

        {/* Right Actions: Complete Session & Timer */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <button
            onClick={handleFinishConversation}
            className="px-3 py-1.5 rounded-md bg-[#20b26c] hover:bg-[#1b9a5d] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn thành & Chấm điểm
          </button>

          <span className="px-2.5 py-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-black flex items-center gap-1 shadow-2xs">
            ⏱️ {formatElapsedTime(elapsedTime)}
          </span>
        </div>
      </motion.div>

      {/* 1. TOPIC SELECTION CARDS GRID (Compact 4 Horizontal Cards) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#1d6ee6] dark:text-sky-400 font-display flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#1d6ee6]" /> CHỌN CHỦ ĐỀ GIAO TIẾP ({aiTopics.length} CHỦ ĐỀ)
          </h2>

          {/* Level Filter Pills */}
          <div className="flex items-center gap-1">
            {['ALL', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  levelFilter === lvl
                    ? "bg-[#1d6ee6] text-white shadow-2xs font-black"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {lvl === 'ALL' ? 'Tất cả' : lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {filteredTopics.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            const completedCount = completedGoalIds.filter((id) => id.startsWith(topic.id)).length;

            return (
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  addToast({ type: "info", title: `Đã đổi chủ đề: ${topic.name}` });
                }}
                className={`p-3 rounded-lg border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-[#1d6ee6] ring-2 ring-[#1d6ee6]/20 shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-white/10 hover:border-[#1d6ee6]/40 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    {TOPIC_ICONS[topic.id] || <MessageSquare className="w-4 h-4 text-[#1d6ee6]" />}
                  </div>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {topic.level}
                  </span>
                </div>

                <div className="mt-2 space-y-0.5">
                  <h3 className={`text-xs font-bold font-display truncate ${
                    isSelected ? "text-[#1d6ee6] dark:text-sky-400" : "text-slate-900 dark:text-white"
                  }`}>
                    {topic.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium truncate">
                    {topic.description}
                  </p>
                </div>

                <div className="mt-2 pt-1 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span>{completedCount}/{topic.goals.length} Mục tiêu</span>
                  {isSelected && <span className="text-[#1d6ee6] font-black">✓ Đang chọn</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN BENTO GRID (Cột Trái 7/12 - Cột Phải 5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start pt-1">
        
        {/* CỘT TRÁI: AI CHAT COMPANION WORKSPACE (7/12 Width) */}
        <div className="lg:col-span-7 space-y-3.5">
          
          <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 min-w-0">
            
            {/* Header Active Topic Indicator */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2 truncate">
                <Bot className="w-4 h-4 text-[#1d6ee6]" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white font-display uppercase tracking-wider truncate">
                  CHỦ ĐỀ: {currentTopic.name} ({currentTopic.nameEn})
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1d6ee6]/10 text-[#1d6ee6] shrink-0">
                1-1 Companion
              </span>
            </div>

            {/* Scrollable Conversation Stream */}
            <div className="max-h-[380px] overflow-y-auto space-y-3 p-1">
              {messages.map((msg) => {
                const isAi = msg.role === 'ai';
                const isTranslated = showTranslations[msg.id];

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAi && (
                      <div className="w-7 h-7 rounded-md bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-[#1d6ee6]/20">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`space-y-1.5 max-w-[85%] ${isAi ? '' : 'items-end'}`}>
                      <div
                        className={`p-3 rounded-lg text-xs font-medium leading-relaxed shadow-2xs ${
                          isAi
                            ? 'bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/10 text-slate-900 dark:text-white'
                            : 'bg-[#1d6ee6] text-white'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Vietnamese Translation */}
                        {isTranslated && msg.vietnameseTranslation && (
                          <div className="mt-2 pt-1.5 border-t border-slate-200/40 dark:border-white/10 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                            🇻🇳 {msg.vietnameseTranslation}
                          </div>
                        )}
                      </div>

                      {/* AI Suggestions Chips (1-Click Reply) */}
                      {isAi && msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          <span className="text-[9px] font-bold text-slate-400 block w-full">Gợi ý trả lời nhanh:</span>
                          {msg.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSendMessage(sug)}
                              className="px-2 py-1 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-[#1d6ee6] dark:text-sky-400 border border-blue-200/50 hover:bg-blue-100 transition-colors cursor-pointer"
                            >
                              💬 {sug}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* AI Action Strip */}
                      {isAi && (
                        <div className="flex items-center gap-2 px-1">
                          <button
                            onClick={() => speakText(msg.text)}
                            className="text-[10px] font-bold text-slate-400 hover:text-[#1d6ee6] flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3 h-3" /> Nghe đọc
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
              {isAiTyping && (
                <div className="flex items-center gap-2 p-2.5 rounded-md bg-blue-50/50 dark:bg-blue-950/30 text-[#1d6ee6] dark:text-sky-400 text-xs font-bold animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> AI đang gõ câu trả lời...
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Message Input & Live Speech Form */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
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
                    placeholder="Nhập nội dung trò chuyện bằng tiếng Anh..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-9 pl-3 pr-9 text-xs font-medium rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#1d6ee6]"
                  />
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`absolute right-2 top-1.5 p-1 rounded-md transition-colors cursor-pointer ${
                      isListening
                        ? "text-rose-500 animate-pulse bg-rose-50 dark:bg-rose-950/40"
                        : "text-slate-400 hover:text-[#1d6ee6]"
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || isAiTyping}
                  className="h-9 px-3.5 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" /> Gửi
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* CỘT PHẢI: TOPIC GOALS & CONVERSATION ANALYTICS (5/12 Width) */}
        <div className="lg:col-span-5 space-y-3.5">
          
          {/* Topic Mission Goals Checklist Card */}
          <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white font-display uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1d6ee6]" /> MỤC TIÊU CẦN NÓI
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1d6ee6]/10 text-[#1d6ee6]">
                {completedGoalIds.filter((id) => id.startsWith(currentTopic.id)).length}/{currentTopic.goals.length} Đạt
              </span>
            </div>

            <div className="space-y-1.5">
              {currentTopic.goals.map((goal) => {
                const isDone = completedGoalIds.includes(goal.id);

                return (
                  <div
                    key={goal.id}
                    className={`p-2.5 rounded-md border text-xs font-bold flex items-center justify-between gap-2 transition-all ${
                      isDone
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div>{goal.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{goal.nameEn}</div>
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
          </div>

          {/* AI Grammar & Vocabulary Coach Card */}
          <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5">
            <span className="text-xs font-bold text-[#1d6ee6] dark:text-sky-400 font-display flex items-center gap-1.5">
              <Bot className="w-4 h-4" /> AI Grammar & Vocabulary Advice:
            </span>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-md border border-slate-200/60 dark:border-white/5">
              "Hãy tự tin sử dụng các thì hiện tại tiếp diễn và cấu trúc lịch sự như 'I would like to...' khi đặt món hoặc giao tiếp!"
            </p>
          </div>

        </div>

      </div>

      {/* RATING & REVIEW MODAL */}
      <AnimatePresence>
        {showRatingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl space-y-4 font-sans text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-6 h-6 stroke-[2]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Hoàn Thành Buổi Luyện Nói! 🎉
                </h3>
                <p className="text-xs text-slate-500 font-medium">
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
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleSubmitRating}
                className="w-full py-2 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-xs font-bold shadow-2xs cursor-pointer"
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
