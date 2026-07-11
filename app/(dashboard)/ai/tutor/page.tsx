"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
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
  Info
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
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  
  // Practice modes: freetalk, roleplay, drill
  const [practiceMode, setPracticeMode] = useState<"freetalk" | "roleplay" | "drill">("freetalk");
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Hello! I am your AI Voice Tutor. Let's practice speaking English together. What is your favorite hobby?",
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Roleplay states
  const [currentRoleplayTopic, setCurrentRoleplayTopic] = useState<string>("rp1");
  const [completedGoalIds, setCompletedGoalIds] = useState<string[]>([]);
  const [isGoalsExpanded, setIsGoalsExpanded] = useState(false);

  // Drill states
  const [drillIndex, setDrillIndex] = useState(0);
  const [drillFeedback, setDrillFeedback] = useState<{
    score: number;
    studentWords: string[];
    targetWords: string[];
  } | null>(null);
  const [lastSpeechInput, setLastSpeechInput] = useState("");

  const recognitionRef = useRef<any>(null);

  // Clean strings for sentence comparison
  const getNormalizedWords = (text: string) => {
    return text.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      .trim()
      .split(/\s+/);
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => {
          setIsRecording(true);
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        rec.onresult = async (event: any) => {
          const resultText = event.results[0][0].transcript;
          const confidence = Math.round(event.results[0][0].confidence * 100);
          if (resultText.trim()) {
            setLastSpeechInput(resultText);
            
            if (practiceMode === "drill") {
              // Sentence drill comparison matching
              const target = DRILL_SENTENCES[drillIndex];
              const studentWords = getNormalizedWords(resultText);
              const targetWords = getNormalizedWords(target);
              const matches = targetWords.filter(w => studentWords.includes(w));
              const score = Math.round((matches.length / targetWords.length) * 100);
              
              setDrillFeedback({ score, studentWords, targetWords });
              
              // Award XP based on pronunciation match score
              const xp = Math.round(score / 5);
              if (xp > 0) {
                awardXp(xp);
                addToast({
                  type: "xp",
                  title: `+${xp} XP!`,
                  message: `Đọc đúng khớp: ${score}% số từ mẫu.`,
                });
              }
            } else {
              // Regular convo flow
              await handleNewUserSpeech(resultText, confidence);
            }
          }
        };

        rec.onerror = (e: any) => {
          console.error("Speech recognition error:", e);
          setIsRecording(false);
          addToast({
            type: "error",
            title: "Lỗi Micro",
            message: "Không thể nhận diện được giọng nói. Vui lòng thử lại.",
          });
        };

        recognitionRef.current = rec;
      }
    }
  }, [practiceMode, drillIndex]);

  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95; // Slightly slower for better tutor listening
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.startsWith("en"));
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  };

  const handleNewUserSpeech = async (speechText: string, confidence: number) => {
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      text: speechText,
      pronunciationScore: confidence,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const xpEarned = Math.round(confidence / 10);
    if (xpEarned > 0) {
      awardXp(xpEarned);
      addToast({
        type: "xp",
        title: `+${xpEarned} XP!`,
        message: `Độ tự tin phát âm: ${confidence}%`,
      });
    }

    try {
      const response = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: practiceMode,
          topicId: practiceMode === "roleplay" ? currentRoleplayTopic : "freetalk",
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      if (data.success && data.reply) {
        // Update user message with phonetic feedback
        setMessages((prev) => {
          const updated = [...prev];
          const lastUserIndex = updated.map(m => m.role).lastIndexOf("user");
          if (lastUserIndex !== -1) {
            updated[lastUserIndex] = {
              ...updated[lastUserIndex],
              wordAnalysis: data.wordAnalysis || [],
              pronunciationTips: data.pronunciationTips || []
            };
          }
          return [...updated, {
            id: `ai_${Date.now()}`,
            role: "ai",
            text: data.reply,
            vietnameseTranslation: data.vietnameseTranslation
          }];
        });
        
        speakText(data.reply);

        // Process Goals completed in roleplay topic
        if (practiceMode === "roleplay" && data.goalsCompleted) {
          setCompletedGoalIds(prev => {
            const updated = [...prev];
            data.goalsCompleted.forEach((g: string) => {
              if (!updated.includes(g)) updated.push(g);
            });
            return updated;
          });
        }
      } else {
        throw new Error(data.error || "Failed to get reply");
      }
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `ai_err_${Date.now()}`,
        role: "ai",
        text: "Sorry, I had trouble processing that response. Could you try speaking again?",
      };
      setMessages((prev) => [...prev, errorMsg]);
      speakText(errorMsg.text);
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    } else {
      addToast({
        type: "error",
        title: "Trình duyệt không hỗ trợ",
        message: "Tính năng nhận diện giọng nói không khả dụng trên trình duyệt này.",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const switchMode = (mode: "freetalk" | "roleplay" | "drill") => {
    setPracticeMode(mode);
    setMessages([
      {
        id: "welcome",
        role: "ai",
        text: mode === "freetalk" 
          ? "Hello! I am your AI Voice Tutor. Let's practice speaking English together. What is your favorite hobby?"
          : mode === "roleplay"
          ? `Welcome to the Roleplay Challenge! Let's practice airport customs check-in. Tell me: "Here is my passport and ticket."`
          : "Welcome to Sentence Drills! Click the microphone button and read the sentence displayed on the screen."
      }
    ]);
    setCompletedGoalIds([]);
    setDrillFeedback(null);
    setLastSpeechInput("");
    setActiveFeedbackIndexForConvo(null);
  };

  const startNextDrill = () => {
    const nextIdx = (drillIndex + 1) % DRILL_SENTENCES.length;
    setDrillIndex(nextIdx);
    setDrillFeedback(null);
    setLastSpeechInput("");
  };

  // Keep focus on the active user sentence's feedback card
  const [activeFeedbackIndexForConvo, setActiveFeedbackIndexForConvo] = useState<number | null>(null);
  
  const lastUserConvoMessage = messages.slice().reverse().find(m => m.role === "user");

  return (
    <div className="animate-fade-in space-y-6">
      {/* Page Header */}
      <div className="bezel overflow-hidden">
        <div className="bezel-inner bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-cyan-950/20 p-6 relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-450/10 dark:bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 z-10 relative">
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-250 dark:border-emerald-500/30 bg-emerald-100/60 dark:bg-emerald-500/15 text-[9px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 animate-pulse">
                <Mic className="h-3.5 w-3.5" /> ai speech coach
              </span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">Gia sư Giọng nói AI chuyên sâu</h1>
              <p className="text-slate-650 dark:text-white/70 text-xs md:text-sm mt-2 max-w-2xl font-medium leading-relaxed">
                Luyện phát âm chuẩn xác, phản xạ hội thoại không chạm bàn phím. AI tự động đo đạc ngữ điệu, nhấn âm tiết bản xứ.
              </p>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="shrink-0 cursor-pointer active:scale-95 transition-all select-none"
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <VolumeX className="h-4 w-4 text-rose-500" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Split Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max">
        
        {/* Column 1: Speaking Controls & Mode Selectors (col-span-1) */}
        <div className="lg:col-span-1 order-1 lg:order-1 space-y-6">
          
          {/* Practice Modes Selector Card */}
          <Card variant="bezel">
            <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Lựa chọn chế độ</span>
              
              <div className="space-y-2.5">
                {[
                  { id: "freetalk", label: "Hội thoại Tự do", desc: "Nói bất cứ điều gì bạn thích", icon: <HelpCircle className="h-4 w-4 text-amber-500" /> },
                  { id: "roleplay", label: "Tình huống kịch bản", desc: "Giao tiếp nhiệm vụ cụ thể", icon: <UserCheck className="h-4 w-4 text-blue-500" /> },
                  { id: "drill", label: "Luyện đọc câu mẫu", desc: "Chấm điểm chuẩn xác từ vựng", icon: <Award className="h-4 w-4 text-purple-500" /> }
                ].map((modeItem) => {
                  const active = practiceMode === modeItem.id;
                  return (
                    <button
                      key={modeItem.id}
                      type="button"
                      onClick={() => switchMode(modeItem.id as any)}
                      className={`bezel w-full text-left cursor-pointer transition-all ${
                        active ? "ring-2 ring-emerald-500" : ""
                      }`}
                    >
                      <div className={`bezel-inner p-3 flex items-center gap-3 transition-all ${
                        active ? "bg-emerald-50/10 dark:bg-emerald-950/15" : "bg-white/40 dark:bg-neutral-900/40"
                      }`}>
                        <div className="h-8 w-8 rounded-xl bg-slate-50 dark:bg-neutral-950 flex items-center justify-center shrink-0">
                          {modeItem.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">{modeItem.label}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5 truncate font-medium">{modeItem.desc}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Conditional context panels */}
          {practiceMode === "roleplay" && (
            <div className="space-y-4 animate-fade-in">
              {/* Roleplay Topic Dropdown */}
              <Card variant="bezel">
                <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Chọn tình huống</span>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLEPLAY_TOPICS.map(t => {
                      const selected = currentRoleplayTopic === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setCurrentRoleplayTopic(t.id);
                            setCompletedGoalIds([]);
                            setMessages([
                              {
                                id: "welcome_rp",
                                role: "ai",
                                text: `Let's practice the topic: "${t.nameEn}". I am the helper, please talk with me.`
                              }
                            ]);
                          }}
                          className={`px-3 py-2 text-center text-[10px] font-black rounded-xl border cursor-pointer active:scale-95 transition-all leading-normal ${
                            selected 
                              ? 'bg-emerald-500 border-emerald-400 text-white shadow-sm' 
                              : 'bg-slate-50 dark:bg-neutral-950 border-slate-200/60 dark:border-neutral-850 text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-neutral-850'
                          }`}
                        >
                          {t.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Goals list */}
              <div className="bezel">
                <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-4">
                  <button
                    type="button"
                    onClick={() => setIsGoalsExpanded(!isGoalsExpanded)}
                    className="w-full text-left flex items-center justify-between lg:cursor-default"
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Mục tiêu kịch bản</span>
                    <ChevronRight className={`h-4.5 w-4.5 text-slate-450 transition-all duration-300 lg:hidden ${isGoalsExpanded ? 'transform rotate-90' : ''}`} />
                  </button>

                  <div className={`space-y-3 lg:block ${isGoalsExpanded ? 'block animate-fade-in-down' : 'hidden'}`}>
                    {ROLEPLAY_TOPICS.find(t => t.id === currentRoleplayTopic)?.goals.map(goal => {
                      const completed = completedGoalIds.includes(goal.id);
                      return (
                        <div 
                          key={goal.id} 
                          className={`flex items-start gap-2.5 p-3 rounded-2xl border transition-all duration-300 ${
                            completed 
                              ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-250/50' 
                              : 'bg-slate-50/50 dark:bg-neutral-950/20 border-slate-150/40 dark:border-neutral-850'
                          }`}
                        >
                          <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${completed ? 'text-emerald-500' : 'text-slate-300'}`} />
                          <div>
                            <h5 className={`text-xs font-bold ${completed ? 'text-emerald-600 dark:text-emerald-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>{goal.name}</h5>
                            <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5">{goal.nameEn}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {practiceMode === "drill" && (
            <Card variant="bezel" className="animate-fade-in">
              <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Thư viện câu mẫu</span>
                <div className="space-y-2">
                  {DRILL_SENTENCES.map((sent, idx) => {
                    const active = drillIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setDrillIndex(idx);
                          setDrillFeedback(null);
                          setLastSpeechInput("");
                        }}
                        className={`w-full text-left p-2.5 text-[11px] font-semibold border rounded-xl cursor-pointer transition-all ${
                          active 
                            ? 'border-emerald-350 bg-emerald-50/10 text-emerald-600 dark:text-emerald-400 font-extrabold ring-1 ring-emerald-500/30' 
                            : 'border-slate-100 dark:border-neutral-850 bg-transparent text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-neutral-850'
                        }`}
                      >
                        {idx + 1}. {sent}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>
          )}

          {practiceMode === "freetalk" && (
            <Card variant="bezel" className="animate-fade-in">
              <div className="bezel-inner bg-slate-50/65 dark:bg-neutral-950/60 p-5 border border-slate-100 dark:border-neutral-850 text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed flex items-start gap-2.5">
                <Info className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Tại chế độ này, bạn có thể hỏi AI bất cứ thứ gì bằng tiếng Anh. Hệ thống sẽ lắng nghe câu phát âm của bạn, dịch tự động, chỉnh trọng âm và đề xuất các mẹo giao tiếp tự nhiên bản xứ.
                </span>
              </div>
            </Card>
          )}
        </div>

        {/* Column 2: Active Speaking Arena (col-span-2, row-span-2) */}
        <div className="lg:col-span-2 lg:row-span-2 order-2 lg:order-2 flex flex-col">
          <Card variant="bezel" className="h-full flex flex-col">
            <div className="bezel-inner bg-white dark:bg-neutral-900 p-4 sm:p-6 flex flex-col justify-between h-full min-h-[460px] sm:min-h-[550px] relative overflow-hidden">
              
              {/* Context header */}
              <div className="border-b border-slate-100 dark:border-neutral-850 pb-3 flex flex-wrap justify-between items-center gap-2">
                <span className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-wider">Võ đài giọng nói</span>
                {practiceMode === "drill" && (
                  <Badge variant="success" className="animate-pulse">Drill #{drillIndex + 1}</Badge>
                )}
              </div>

              {/* Glowing Pulsing Voice Visualizer */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 sm:space-y-8 py-6 sm:py-8">
                
                {/* Voice Halo Pulsing Ring */}
                <div className="relative flex items-center justify-center h-40 w-40 sm:h-48 sm:w-48 mx-auto">
                  {/* Outer glowing halo ring 1 */}
                  <div className={`absolute inset-0 rounded-full blur-2xl opacity-40 transition-all duration-700 ${
                    isSpeaking ? 'bg-emerald-400 animate-pulse scale-110' :
                    isRecording ? 'bg-violet-400 animate-pulse scale-110' :
                    'bg-slate-200 dark:bg-neutral-800'
                  }`} />
                  
                  {/* Outer glowing halo ring 2 */}
                  <div className={`absolute -inset-4 rounded-full blur-md opacity-25 transition-all duration-700 ${
                    isSpeaking ? 'bg-emerald-300 animate-ping scale-105' :
                    isRecording ? 'bg-violet-300 animate-ping scale-105' :
                    'bg-slate-100 dark:bg-neutral-850'
                  }`} />
                  
                  {/* Core ring */}
                  <div className={`h-32 w-32 sm:h-36 sm:w-36 rounded-full flex flex-col items-center justify-center relative z-10 border transition-all duration-500 bg-white dark:bg-neutral-900 ${
                    isSpeaking ? 'border-emerald-500 shadow-emerald-500/20 shadow-lg' :
                    isRecording ? 'border-violet-500 shadow-violet-500/20 shadow-lg' :
                    'border-slate-200 dark:border-neutral-800'
                  }`}>
                    {/* Action mic button */}
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startListening}
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full flex items-center justify-center shadow-md bg-gradient-to-tr from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white cursor-pointer active:scale-90 transition-all select-none"
                        title="Bấm để nói"
                      >
                        <Mic className="h-8 w-8" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopListening}
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full flex items-center justify-center shadow-md bg-gradient-to-tr from-rose-500 to-red-600 text-white cursor-pointer animate-pulse active:scale-90 transition-all select-none"
                        title="Đang ghi âm... Bấm để dừng"
                      >
                        <MicOff className="h-8 w-8" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Speech status description */}
                <div className="text-center space-y-1">
                  {isSpeaking ? (
                    <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 animate-pulse flex items-center gap-1.5 justify-center">
                      <Volume2 className="h-4 w-4 shrink-0" /> Gia sư đang nói phát âm mẫu...
                    </p>
                  ) : isRecording ? (
                    <p className="text-xs font-black text-violet-600 dark:text-violet-400 animate-pulse">
                      🎙 Lắng nghe tiếng Anh... Hãy phát âm câu thoại của bạn!
                    </p>
                  ) : (
                    <p className="text-xs text-slate-450 dark:text-slate-500 font-bold">
                      Nhấn vòng tròn Micro ở trên để bắt đầu đối thoại bằng giọng nói
                    </p>
                  )}
                </div>
              </div>

              {/* Target / Output Speech visualization box */}
              <div className="mt-auto space-y-4">
                {practiceMode === "drill" ? (
                  <div className="bg-slate-50 dark:bg-neutral-955 p-5 rounded-2xl border border-slate-100 dark:border-neutral-850 text-center space-y-3.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Mẫu câu tập đọc</span>
                    
                    {/* Sentence word-by-word visualizer */}
                    <div className="text-base md:text-lg font-black text-slate-800 dark:text-white leading-relaxed flex flex-wrap justify-center gap-1.5">
                      {DRILL_SENTENCES[drillIndex].split(" ").map((w, idx) => {
                        const cleanW = w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
                        const isMatch = drillFeedback?.studentWords.includes(cleanW);
                        return (
                          <span 
                            key={idx} 
                            className={`transition-colors duration-300 ${
                              drillFeedback 
                                ? isMatch 
                                  ? 'text-emerald-500 scale-105' 
                                  : 'text-rose-400 italic' 
                                : 'text-slate-850 dark:text-slate-100'
                            }`}
                          >
                            {w}
                          </span>
                        );
                      })}
                    </div>

                    {/* Drill Score statistics */}
                    {drillFeedback ? (
                      <div className="pt-2 border-t border-slate-200/50 dark:border-neutral-850 space-y-2">
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-[10px] text-slate-400 font-semibold">Giọng nói ghi âm: <span className="text-slate-700 italic">"{lastSpeechInput}"</span></span>
                          <span className="text-xs font-black text-emerald-600">Độ chuẩn khớp: {drillFeedback.score}%</span>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button variant="secondary" size="sm" onClick={() => speakText(DRILL_SENTENCES[drillIndex])} className="flex-1 justify-center py-2.5">
                            <Volume2 className="h-3.5 w-3.5 mr-1" /> Nghe lại phát âm mẫu
                          </Button>
                          <Button variant="primary" size="sm" onClick={startNextDrill} className="flex-1 justify-center py-2.5 bg-emerald-500 hover:bg-emerald-600">
                            Luyện câu tiếp theo <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button variant="secondary" size="sm" onClick={() => speakText(DRILL_SENTENCES[drillIndex])} className="mx-auto flex items-center justify-center">
                        <Volume2 className="h-3.5 w-3.5 mr-1" /> Phát âm thanh mẫu (TTS)
                      </Button>
                    )}
                  </div>
                ) : (
                  // Convo last user speech display
                  lastUserConvoMessage && (
                    <div className="bg-slate-50 dark:bg-neutral-955 p-4 rounded-2xl border border-slate-100 dark:border-neutral-850">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Nhận diện câu thoại của bạn</span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 italic">
                        "{lastUserConvoMessage.text}"
                      </p>
                      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between text-[10px] text-slate-450 dark:text-slate-500 mt-2 pt-2 border-t border-slate-200/50 dark:border-neutral-850">
                        <span>Độ tự tin STT: <span className="font-extrabold text-emerald-500">{lastUserConvoMessage.pronunciationScore || 90}%</span></span>
                        {(lastUserConvoMessage.wordAnalysis && lastUserConvoMessage.wordAnalysis.length > 0) && (
                          <button
                            type="button"
                            onClick={() => setActiveFeedbackIndexForConvo(messages.indexOf(lastUserConvoMessage))}
                            className="text-emerald-600 dark:text-emerald-450 font-black cursor-pointer"
                          >
                            Xem phân tích âm tiết & Mẹo phông âm
                          </button>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>

            </div>
          </Card>
        </div>

        {/* Column 3: AI Speech Coach Feedback (col-span-1) */}
        <div className="lg:col-span-1 order-3 lg:order-3">
          <Card variant="bezel" className="h-full">
            <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-5 flex flex-col justify-between h-full min-h-[500px]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">Đánh giá Phát âm</span>

                {practiceMode === "drill" ? (
                  <div className="space-y-4 opacity-50 flex flex-col items-center justify-center py-20 text-center">
                    <BookOpen className="h-10 w-10 text-slate-400" />
                    <p className="text-[11px] font-semibold">
                      Chế độ Luyện câu mẫu đánh giá khớp từ vựng trực quan ở khung sóng âm chính. Hãy nhấp chọn Microphone để đọc.
                    </p>
                  </div>
                ) : (
                  // Convo custom feedback
                  lastUserConvoMessage ? (
                    <div className="space-y-4 animate-fade-in">
                      {/* Stress words check */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-wide flex items-center gap-1">
                          <Flame className="h-3.5 w-3.5 text-amber-500 animate-pulse" /> Trọng âm & Nhấn từ
                        </span>
                        {lastUserConvoMessage.wordAnalysis && lastUserConvoMessage.wordAnalysis.length > 0 ? (
                          <div className="space-y-2">
                            {lastUserConvoMessage.wordAnalysis.map((item, idx) => (
                              <div key={idx} className="bg-slate-50 dark:bg-neutral-955 border border-slate-100 dark:border-neutral-850 p-3 rounded-xl space-y-1 text-xs">
                                <div className="flex justify-between items-center">
                                  <span className="font-black text-slate-800 dark:text-slate-100">"{item.word}"</span>
                                  <Badge variant="neutral" className="text-[9px] font-bold">{item.stress}</Badge>
                                </div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                  {item.tips}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 italic px-1">
                            Từ vựng câu phát âm đơn giản, không có từ phức tạp cần nhấn trọng âm đặc biệt.
                          </p>
                        )}
                      </div>

                      {/* Phonics tips */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-black text-indigo-500 uppercase tracking-wide flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5" /> Mẹo nối âm & Ngữ điệu
                        </span>
                        {lastUserConvoMessage.pronunciationTips && lastUserConvoMessage.pronunciationTips.length > 0 ? (
                          <div className="space-y-1.5">
                            {lastUserConvoMessage.pronunciationTips.map((tip, idx) => (
                              <div key={idx} className="bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-950/45 p-2.5 rounded-xl text-[11px] font-semibold text-indigo-750 dark:text-indigo-400 leading-normal">
                                {tip}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 italic px-1">
                            Đang chuẩn bị mẹo nối âm...
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-40 px-4">
                      <HelpCircle className="h-9 w-9 text-slate-400 mb-2.5" />
                      <p className="text-[11px] font-semibold leading-normal text-slate-700 dark:text-slate-350">
                        Bấm nói tiếng Anh để gia sư AI nhận dạng và đưa ra gợi ý điều chỉnh trọng âm từng từ tại đây!
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* AI translation reference overlay if AI reply is displayed */}
              {messages.length > 0 && messages[messages.length - 1].role === "ai" && messages[messages.length - 1].vietnameseTranslation && (
                <div className="bg-slate-50 dark:bg-neutral-955 p-3.5 rounded-2xl border border-slate-100 dark:border-neutral-850 text-[10px] text-slate-500 font-semibold leading-relaxed">
                  <span className="text-[9px] font-black text-slate-400 block uppercase mb-0.5">Ý nghĩa phản hồi AI</span>
                  "{messages[messages.length - 1].text}"
                  <p className="mt-1 text-emerald-600 dark:text-emerald-450 italic leading-tight font-medium">
                    (Dịch: {messages[messages.length - 1].vietnameseTranslation})
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>

      {/* Slide Drawer for mobile to view analysis details */}
      {activeFeedbackIndexForConvo !== null && messages[activeFeedbackIndexForConvo] && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center lg:hidden" onClick={() => setActiveFeedbackIndexForConvo(null)}>
          <div 
            className="bg-white dark:bg-neutral-900 w-full rounded-t-[30px] p-6 max-h-[85%] overflow-y-auto space-y-4 border-t border-slate-200 dark:border-neutral-850 shadow-2xl animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-slate-200 dark:bg-neutral-800 rounded-full mx-auto mb-2" />
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-850 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">Chi tiết phân tích âm tiết</span>
              <button 
                type="button" 
                onClick={() => setActiveFeedbackIndexForConvo(null)}
                className="px-3 py-1 bg-slate-100 dark:bg-neutral-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                Đóng
              </button>
            </div>

            {/* Word stress list */}
            <div className="space-y-2">
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-wide flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-amber-500" /> Trọng âm & Nhấn từ
              </span>
              {messages[activeFeedbackIndexForConvo].wordAnalysis?.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-neutral-955 border border-slate-100 dark:border-neutral-850 p-3 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-slate-855 dark:text-white">"{item.word}"</span>
                    <Badge variant="neutral" className="text-[9px] font-bold">{item.stress}</Badge>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-450 font-medium leading-relaxed">
                    {item.tips}
                  </p>
                </div>
              ))}
            </div>

            {/* Phonics tips */}
            <div className="space-y-2">
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Mẹo nối âm & Ngữ điệu
              </span>
              {messages[activeFeedbackIndexForConvo].pronunciationTips?.map((tip, idx) => (
                <div key={idx} className="bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-150 p-3 rounded-xl text-xs font-semibold text-indigo-750 dark:text-indigo-400">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
