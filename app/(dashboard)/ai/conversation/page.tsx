'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
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
  Star
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
  role: 'ai' | 'user';
  text: string;
  vietnameseTranslation?: string;
  corrections?: string[];
  suggestions?: string[];
}

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  'at1': <Utensils className="w-5 h-5 text-amber-500" strokeWidth={1.8} />,
  'at2': <Briefcase className="w-5 h-5 text-blue-500" strokeWidth={1.8} />,
  'at3': <Plane className="w-5 h-5 text-emerald-500" strokeWidth={1.8} />,
  'at4': <Cpu className="w-5 h-5 text-purple-500" strokeWidth={1.8} />,
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
  const { awardXp } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm your AI speaking companion. Please select a topic to start practicing, or write anything you want!" }
  ]);
  const [input, setInput] = useState('');
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  
  // Dynamic study states
  const [completedGoalIds, setCompletedGoalIds] = useState<string[]>([]);
  const [activeFeedbackIndex, setActiveFeedbackIndex] = useState<number | null>(null);
  const [isGoalsExpanded, setIsGoalsExpanded] = useState(false);
  
  // Voice state
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Review & Rating Modal states
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Initialize Speech Recognition on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onstart = () => {
          setIsListening(true);
        };

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
        };

        rec.onerror = (e: any) => {
          console.error("Speech recognition error:", e);
          setIsListening(false);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. Hãy dùng Google Chrome hoặc Microsoft Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const playMessageSpeech = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const startTopic = (topicId: string) => {
    const topic = aiTopics.find(t => t.id === topicId);
    if (!topic) return;

    setCurrentTopic(topicId);
    setIsAiTyping(true);
    setMessages([]);
    setCompletedGoalIds([]);
    setActiveFeedbackIndex(null);
    setIsGoalsExpanded(false);

    setTimeout(() => {
      setIsAiTyping(false);
      const welcomeMsg = `Let's practice the topic: "${topic.nameEn}". I will start: "Hello, ready to talk about this topic?"`;
      setMessages([
        { role: 'ai', text: welcomeMsg }
      ]);
      playMessageSpeech(welcomeMsg);
    }, 1000);
  };

  const sendMessage = async () => {
    if (!input.trim() || isAiTyping) return;

    const userMsg: Message = { role: 'user', text: input };
    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    setInput('');
    setIsAiTyping(true);
    
    // Set feedback focus to the latest user message index we are sending
    const sentMessageIndex = currentMessages.length - 1;

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages, topicId: currentTopic })
      });
      const data = await res.json();
      
      setIsAiTyping(false);
      if (data.success) {
        // Update user message with suggestions and corrections if returned
        setMessages(prev => {
          const updated = [...prev];
          updated[sentMessageIndex] = {
            ...updated[sentMessageIndex],
            corrections: data.corrections || [],
            suggestions: data.suggestions || []
          };
          return [...updated, { 
            role: 'ai', 
            text: data.reply,
            vietnameseTranslation: data.vietnameseTranslation
          }];
        });
        
        // Auto play TTS audio
        playMessageSpeech(data.reply);
        
        // Highlight active feedback
        setActiveFeedbackIndex(sentMessageIndex);

        // Process completed goals
        if (data.goalsCompleted && Array.isArray(data.goalsCompleted)) {
          setCompletedGoalIds(prev => {
            const updated = [...prev];
            data.goalsCompleted.forEach((g: string) => {
              if (!updated.includes(g)) updated.push(g);
            });
            return updated;
          });
        }
        
        awardXp(10);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I had trouble understanding that. Let's try again!" }]);
      }
    } catch (err) {
      console.error("AI chat error:", err);
      setIsAiTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: "Network connection is unstable. Please check your network and try again!" }]);
    }
  };

  const handleRatingSubmit = () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao để đánh giá!");
      return;
    }

    setShowConfetti(true);
    awardXp(15); // Reward 15 XP

    setTimeout(() => {
      setShowRatingModal(false);
      setShowConfetti(false);
      setRating(0);
      setSelectedTags([]);
      setReviewText("");
    }, 2800);
  };

  useEffect(() => {
    const container = document.getElementById('ai-messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isAiTyping]);

  const activeTopicObj = aiTopics.find(t => t.id === currentTopic);
  const activeFeedbackMessage = activeFeedbackIndex !== null ? messages[activeFeedbackIndex] : null;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Page Header */}
      <div className="bezel overflow-hidden">
        <div className="bezel-inner bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-indigo-950 dark:to-cyan-950 p-6 relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 z-10 relative">
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-500/30 bg-cyan-100/60 dark:bg-cyan-500/15 text-[9px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-400 animate-pulse">
                <Bot className="h-3.5 w-3.5" /> companion ai partner
              </span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">Hội thoại thông minh cùng AI</h1>
              <p className="text-slate-650 dark:text-white/70 text-xs md:text-sm mt-2 max-w-2xl font-medium leading-relaxed">
                Luyện nói và viết tiếng Anh phản xạ 2 chiều. Hệ thống tự động phân tích phát âm, chỉnh sửa ngữ pháp và gợi ý nâng cấp từ vựng ngay trong đoạn thoại.
              </p>
            </div>
            
            {/* Rating trigger button */}
            <button
              type="button"
              onClick={() => setShowRatingModal(true)}
              className="inline-flex flex-row items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-neutral-850 active:scale-95 transition-all whitespace-nowrap shadow-sm select-none shrink-0"
            >
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>Đánh giá UI/UX</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max">
        
        {/* Column 1: Topics & Goals scenarios (col-span-1) */}
        <div className="lg:col-span-1 order-1 lg:order-1 space-y-6">
          {/* Topics Card */}
          <div className="bezel">
            <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Chủ đề hội thoại</span>
              
              {/* Horizontal Scroll on mobile, vertical stack on desktop */}
              <div className="flex flex-row overflow-x-auto pb-2 gap-3 lg:flex-col lg:overflow-x-visible lg:pb-0 lg:space-y-2.5 scrollbar-thin">
                {aiTopics.map(t => {
                  const isActive = currentTopic === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => startTopic(t.id)}
                      className={`bezel shrink-0 w-[200px] lg:w-full text-left cursor-pointer transition-all ${
                        isActive ? "ring-2 ring-cyan-500" : ""
                      }`}
                    >
                      <div className={`bezel-inner p-3.5 flex items-center gap-3 transition-all ${
                        isActive ? "bg-cyan-50/15 dark:bg-cyan-950/20" : "bg-white/40 dark:bg-neutral-900/40"
                      }`}>
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-cyan-100/50 dark:bg-cyan-950/30' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
                          {TOPIC_ICONS[t.id]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">{t.name}</h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">{t.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Goals Checklist Card (Only shows if topic is selected) */}
          {activeTopicObj && (
            <div className="bezel animate-fade-in">
              <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-4">
                
                {/* Title bar toggle on mobile */}
                <button
                  type="button"
                  onClick={() => setIsGoalsExpanded(!isGoalsExpanded)}
                  className="w-full text-left flex items-center justify-between lg:cursor-default"
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Nhiệm vụ kịch bản</span>
                  <ChevronRight className={`h-4.5 w-4.5 text-slate-400 transition-all duration-300 lg:hidden ${isGoalsExpanded ? 'transform rotate-90' : ''}`} />
                </button>
                
                <div className={`space-y-3 lg:block ${isGoalsExpanded ? 'block animate-fade-in-down' : 'hidden'}`}>
                  {activeTopicObj.goals.map(goal => {
                    const isCompleted = completedGoalIds.includes(goal.id);
                    return (
                      <div 
                        key={goal.id}
                        className={`flex items-start gap-2.5 p-3 rounded-2xl border transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40' 
                            : 'bg-slate-50/50 dark:bg-neutral-950/30 border-slate-100 dark:border-neutral-850'
                        }`}
                      >
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 transition-all ${
                          isCompleted ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'
                        }`} />
                        <div>
                          <p className={`text-xs font-bold leading-tight ${isCompleted ? 'text-emerald-600 dark:text-emerald-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                            {goal.name}
                          </p>
                          <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5 font-medium">
                            {goal.nameEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Column 2: Chat Arena (col-span-2, row-span-2) */}
        <div className="lg:col-span-2 lg:row-span-2 order-2 lg:order-2 flex flex-col">
          <div className="bezel h-full flex flex-col">
            <div className="bezel-inner bg-white dark:bg-neutral-900 flex flex-col h-full min-h-[460px] sm:min-h-[550px] relative overflow-hidden">
              {/* Header Info */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-neutral-850">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center relative">
                    {isAiTyping && (
                      <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50"></span>
                    )}
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">Companion AI</h4>
                    <p className="text-[10px] text-slate-555 mt-0.5 font-semibold flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isAiTyping ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></span>
                      {isAiTyping ? 'AI đang phân tích & soạn câu trả lời...' : 'Đang trực tuyến'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages viewport */}
              <div 
                id="ai-messages-container"
                className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 min-h-[300px] sm:min-h-[350px]"
              >
                {messages.length === 0 && !isAiTyping && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-40 select-none">
                    <MessageSquare className="w-12 h-12 mb-3 text-slate-400" strokeWidth={1.2} />
                    <p className="text-xs font-black text-slate-550">Chọn chủ đề bên trái để bắt đầu luyện phản xạ!</p>
                  </div>
                )}

                {messages.map((m, idx) => {
                  const isAi = m.role === 'ai';
                  const hasFeedback = !isAi && ((m.corrections && m.corrections.length > 0) || (m.suggestions && m.suggestions.length > 0));
                  const isSelectedFeedback = activeFeedbackIndex === idx;

                  return (
                    <div 
                      key={idx}
                      className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} space-y-1 animate-fade-in-up`}
                    >
                      <div className="flex items-end gap-2 max-w-[85%]">
                        {isAi && (
                          <button
                            type="button"
                            onClick={() => playMessageSpeech(m.text)}
                            className="h-7 w-7 rounded-lg bg-slate-50 dark:bg-neutral-955 border border-slate-100 dark:border-neutral-850 hover:bg-slate-100 dark:hover:bg-neutral-850 flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-all text-slate-500 dark:text-slate-400"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                        )}

                        <div 
                          onClick={() => {
                            if (!isAi) {
                              setActiveFeedbackIndex(idx);
                            }
                          }}
                          className={`min-w-0 break-words rounded-[1.25rem] p-3.5 sm:p-4 text-xs md:text-sm border transition-all relative ${
                            isAi 
                              ? 'bg-slate-50 dark:bg-neutral-950/60 text-slate-800 dark:text-slate-200 rounded-tl-md border-slate-100 dark:border-neutral-850 shadow-sm' 
                              : `text-white rounded-tr-md border-cyan-400/20 shadow-sm font-medium cursor-pointer ${
                                  isSelectedFeedback 
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-450 ring-2 ring-cyan-500/50' 
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-500/90'
                                }`
                          }`}
                        >
                          {m.text}
                          
                          {/* Indicator badge if this user bubble has grammar feedback */}
                          {hasFeedback && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-550 border border-white dark:border-neutral-900 text-[8px] font-black text-white shadow-sm animate-pulse">
                              !
                            </span>
                          )}
                        </div>
                      </div>

                      {/* AI Translation helper for Beginner level */}
                      {isAi && m.vietnameseTranslation && (
                        <p className="text-[10px] text-slate-450 dark:text-slate-500 px-9 italic leading-tight">
                          Dịch: {m.vietnameseTranslation}
                        </p>
                      )}
                    </div>
                  );
                })}

                {isAiTyping && (
                  <div className="flex justify-start animate-fade-in-up">
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-neutral-955 rounded-[1.25rem] rounded-tl-md py-3 px-5 border border-slate-100 dark:border-neutral-850">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input panel */}
              <div className="p-4 border-t border-slate-100 dark:border-neutral-850 space-y-2">
                <div className="flex items-center gap-2 sm:gap-3 p-1.5 bg-slate-50 dark:bg-neutral-955 rounded-full border border-slate-200/50 dark:border-neutral-850">
                  {/* Web Speech micro recorder */}
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-all text-white ${
                      isListening 
                        ? 'bg-rose-500 hover:bg-rose-600 animate-pulse' 
                        : 'bg-slate-400 dark:bg-neutral-800 hover:bg-slate-500 text-slate-100'
                    }`}
                    title={isListening ? "Đang lắng nghe... bấm để dừng" : "Nói tiếng Anh (STT)"}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </button>

                  <input 
                    type="text" 
                    className="flex-1 pl-2 bg-transparent border-none focus:outline-none focus:ring-0 text-xs md:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400" 
                    placeholder={isAiTyping ? "Vui lòng chờ AI trả lời..." : isListening ? "Đang lắng nghe giọng nói tiếng Anh của bạn..." : "Gõ câu thoại bằng tiếng Anh..."} 
                    value={input}
                    disabled={isAiTyping}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                  />
                  <button 
                    type="button"
                    className="h-9 w-9 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white cursor-pointer disabled:opacity-40 select-none active:scale-95 transition-all"
                    onClick={sendMessage}
                    disabled={isAiTyping || !input.trim()}
                    title="Gửi"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {isListening && (
                  <p className="text-[10px] text-rose-500 text-center font-bold animate-pulse">
                    Đang ghi âm giọng nói tiếng Anh... Hãy phát âm rõ ràng.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: AI Tutor Feedback card (col-span-1) */}
        <div className="lg:col-span-1 order-3 lg:order-3">
          <div className="bezel h-full">
            <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-5 flex flex-col justify-between h-full min-h-[500px]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">Đánh giá từ AI</span>
                
                {activeFeedbackMessage ? (
                  <div className="space-y-4 animate-fade-in">
                    {/* Original sentence bubble */}
                    <div className="bg-slate-50 dark:bg-neutral-955 p-3 rounded-2xl border border-slate-100/80 dark:border-neutral-850">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Câu thoại của bạn</span>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 italic">
                        "{activeFeedbackMessage.text}"
                      </p>
                    </div>

                    {/* Section 1: Grammar corrections */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-rose-500 uppercase tracking-wide flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" /> Sửa lỗi ngữ pháp
                      </span>
                      {activeFeedbackMessage.corrections && activeFeedbackMessage.corrections.length > 0 ? (
                        <div className="space-y-1.5">
                          {activeFeedbackMessage.corrections.map((corr, idx) => (
                            <div key={idx} className="bg-rose-50/40 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-950/40 p-2.5 rounded-xl text-[11px] font-medium text-rose-700 dark:text-rose-455 leading-normal">
                              {corr}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-950/40 p-2.5 rounded-xl text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 leading-normal">
                          ✓ Không phát hiện lỗi ngữ pháp! Diễn đạt chuẩn xác.
                        </div>
                      )}
                    </div>

                    {/* Section 2: Vocabulary recommendations */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-sky-500 uppercase tracking-wide flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5" /> Diễn đạt tự nhiên hơn
                      </span>
                      {activeFeedbackMessage.suggestions && activeFeedbackMessage.suggestions.length > 0 ? (
                        <div className="space-y-1.5">
                          {activeFeedbackMessage.suggestions.map((sug, idx) => (
                            <div key={idx} className="bg-sky-50/40 dark:bg-sky-950/10 border border-sky-100 dark:border-sky-950/40 p-2.5 rounded-xl text-[11px] font-medium text-sky-700 dark:text-sky-400 leading-normal">
                              {sug}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 italic px-1">
                          (Cách dùng từ đã rất tốt, không có gợi ý nâng cấp thêm).
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center opacity-30 px-4">
                    <Info className="h-8 w-8 text-slate-450 mb-2.5" />
                    <p className="text-[11px] font-semibold leading-normal text-slate-700 dark:text-slate-355">
                      Nhấp vào bất kỳ tin nhắn đã gửi nào của bạn để xem phân tích ngữ pháp và gợi ý nâng cấp từ vựng tại đây!
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 dark:bg-neutral-955 p-3 rounded-2xl border border-slate-100/85 dark:border-neutral-850 text-[10px] text-slate-500 font-semibold leading-relaxed flex items-start gap-2">
                <Info className="h-4 w-4 shrink-0 text-cyan-500" />
                <span>
                  Bảng đánh giá giúp bạn sửa lỗi viết tức thời. Hãy thử cố ý gõ sai ngữ pháp để kiểm chứng phân tích của Companion AI nhé!
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Slide-up Bottom Sheet for AI Feedback details */}
      {activeFeedbackMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center lg:hidden" onClick={() => setActiveFeedbackIndex(null)}>
          <div 
            className="bg-white dark:bg-neutral-900 w-full rounded-t-[30px] p-6 max-h-[85%] overflow-y-auto space-y-4 border-t border-slate-200 dark:border-neutral-850 shadow-2xl animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Drag indicator handle */}
            <div className="w-12 h-1 bg-slate-200 dark:bg-neutral-800 rounded-full mx-auto mb-2" />
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-850 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">Chi tiết phản hồi ngữ pháp AI</span>
              <button 
                type="button" 
                onClick={() => setActiveFeedbackIndex(null)}
                className="px-3 py-1 bg-slate-100 dark:bg-neutral-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                Đóng
              </button>
            </div>

            {/* Original Text */}
            <div className="bg-slate-50 dark:bg-neutral-955 p-3 rounded-2xl border border-slate-100/80 dark:border-neutral-850">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Câu thoại của bạn</span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 italic">
                "{activeFeedbackMessage.text}"
              </p>
            </div>

            {/* Grammar corrections section */}
            <div className="space-y-2">
              <span className="text-[9px] font-black text-rose-500 uppercase tracking-wide flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> Sửa lỗi ngữ pháp
              </span>
              {activeFeedbackMessage.corrections && activeFeedbackMessage.corrections.length > 0 ? (
                <div className="space-y-2">
                  {activeFeedbackMessage.corrections.map((corr, idx) => (
                    <div key={idx} className="bg-rose-50/40 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-950/40 p-3 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-400 leading-relaxed">
                      {corr}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-950/40 p-3 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  ✓ Không phát hiện lỗi ngữ pháp! Diễn đạt chuẩn xác.
                </div>
              )}
            </div>

            {/* Suggestions section */}
            <div className="space-y-2">
              <span className="text-[9px] font-black text-sky-500 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Diễn đạt tự nhiên hơn
              </span>
              {activeFeedbackMessage.suggestions && activeFeedbackMessage.suggestions.length > 0 ? (
                <div className="space-y-2">
                  {activeFeedbackMessage.suggestions.map((sug, idx) => (
                    <div key={idx} className="bg-sky-50/40 dark:bg-sky-950/10 border border-sky-100 dark:border-sky-950/40 p-3 rounded-xl text-xs font-semibold text-sky-700 dark:text-sky-400 leading-relaxed">
                      {sug}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-500 italic pl-1">
                  (Cách dùng từ đã rất tốt, không có gợi ý nâng cấp thêm).
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interactive UI/UX Evaluation Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bezel-outer p-1 bg-slate-200/50 dark:bg-white/5 rounded-3xl max-w-md w-full animate-scale-up">
            <div className="bezel-inner rounded-[calc(1.5rem-6px)] bg-white dark:bg-neutral-900 p-6 space-y-6 text-center">
              {showConfetti ? (
                <div className="space-y-4 py-8 animate-fade-in">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 border border-emerald-100 dark:border-emerald-950/40">
                    <CheckCircle2 className="h-8 w-8 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-black text-emerald-600 dark:text-emerald-400">Đã nhận phản hồi!</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-450 font-semibold leading-relaxed px-4">
                    Cảm ơn ý kiến quý báu của bạn để cải tiến giao diện. Phần thưởng **+15 XP** đã được cộng vào tài khoản của bạn! 🎉
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900 dark:text-white">Đánh giá Trải nghiệm UI/UX</h3>
                    <p className="text-[11px] text-slate-450 dark:text-slate-500 font-semibold">Góp ý kiến của bạn để giúp chúng tôi thiết kế giao diện tốt hơn</p>
                  </div>

                  {/* Star Rating selector */}
                  <div className="flex justify-center items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = star <= (hoverRating || rating);
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="text-2xl cursor-pointer focus:outline-none transition-all hover:scale-125 select-none"
                        >
                          <span className={`text-3xl ${active ? 'text-amber-500 font-bold' : 'text-slate-200 dark:text-slate-800'}`}>
                            ★
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Tags Selection */}
                  <div className="space-y-2 text-left">
                    <span className="text-[9px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-wide block">Giao diện thế nào?</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Giao diện đẹp mắt ✨",
                        "Tốc độ AI nhanh ⚡",
                        "Dễ sử dụng 📱",
                        "Ghi âm nhạy 🎙️",
                        "Chưa mượt di động 📱",
                        "Cần thêm chủ đề 📚"
                      ].map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              setSelectedTags(prev => 
                                prev.includes(tag) 
                                  ? prev.filter(t => t !== tag) 
                                  : [...prev, tag]
                              );
                            }}
                            className={`px-3 py-1.5 rounded-full border text-[10px] font-bold cursor-pointer transition-all select-none ${
                              isSelected 
                                ? 'bg-cyan-500 border-cyan-400 text-white' 
                                : 'bg-slate-50 dark:bg-neutral-950 border-slate-200/60 dark:border-neutral-850 text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-neutral-800'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Comment text area */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="comments" className="text-[9px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-wide block">Nhận xét chi tiết</label>
                    <textarea
                      id="comments"
                      rows={3}
                      value={reviewText}
                      onChange={e => setReviewText(e.target.value)}
                      placeholder="Nhập ý kiến của bạn về giao diện, lỗi, hoặc tính năng mong muốn..."
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950/50 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRatingModal(false)}
                      className="flex-1 py-2.5 border border-slate-200 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-850 text-xs font-bold text-slate-555 rounded-xl cursor-pointer active:scale-95 transition-all select-none"
                    >
                      Đóng
                    </button>
                    <button
                      type="button"
                      onClick={handleRatingSubmit}
                      className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-xs font-black text-white rounded-xl cursor-pointer active:scale-95 transition-all select-none shadow-glow"
                    >
                      Gửi đánh giá (+15 XP)
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
