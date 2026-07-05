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
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  pronunciationScore?: number;
}

export default function VoiceTutorPage() {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
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
  const [textInput, setTextInput] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);

  const recognitionRef = useRef<any>(null);

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
            await handleNewUserSpeech(resultText, confidence);
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
  }, []);

  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    // Pick English voice
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

    // Calculate Speech XP points
    const xpEarned = Math.round(confidence / 10);
    if (xpEarned > 0) {
      awardXp(xpEarned);
      addToast({
        type: "xp",
        title: `+${xpEarned} XP!`,
        message: `Phát âm chính xác: ${confidence}%`,
      });
    }

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      if (data.success && data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: "ai",
          text: data.reply,
        };
        setMessages((prev) => [...prev, aiMsg]);
        speakText(data.reply);
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

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-6 pb-20 md:pb-6">
      <div className="page-header animate-fade-in-down flex items-center justify-between">
        <div>
          <h1 className="page-title text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Mic className="h-7 w-7 text-emerald-500" /> Trợ Lý Đàm Thoại Giọng Nói AI
          </h1>
          <p className="page-subtitle text-muted mt-1">
            Giao tiếp tự nhiên bằng tiếng Anh. Phát âm của bạn sẽ được đánh giá độ chuẩn và chỉnh sửa trực tiếp.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4 text-emerald-500" />
          ) : (
            <VolumeX className="h-4 w-4 text-rose-500" />
          )}
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Voice session panel */}
        <Card variant="bezel" className="md:col-span-2 flex flex-col justify-between p-6 min-h-[450px]">
          {/* Wave animation display */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 py-10">
            {/* Visual soundwave animation */}
            <div className="flex items-center justify-center gap-1.5 h-16">
              {[...Array(9)].map((_, i) => {
                let waveHeight = "h-3";
                if (isSpeaking) {
                  waveHeight = i % 2 === 0 ? "h-12 animate-pulse" : "h-6 animate-pulse";
                } else if (isRecording) {
                  waveHeight = i % 3 === 0 ? "h-16 animate-bounce" : "h-8 animate-bounce";
                }
                return (
                  <span
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-300 bg-gradient-to-t ${
                      isSpeaking
                        ? "from-emerald-500 to-teal-400"
                        : isRecording
                        ? "from-violet-500 to-indigo-500"
                        : "from-slate-300 to-slate-200 dark:from-neutral-700 dark:to-neutral-800"
                    } ${waveHeight}`}
                  />
                );
              })}
            </div>

            <div className="text-center">
              {isSpeaking ? (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-extrabold animate-pulse">
                  Gia sư AI đang nói...
                </p>
              ) : isRecording ? (
                <p className="text-xs text-violet-600 dark:text-violet-400 font-extrabold animate-pulse">
                  Đang lắng nghe... Hãy nói ngay bây giờ
                </p>
              ) : (
                <p className="text-xs text-muted">Bấm giữ hoặc nhấn nút Micro bên dưới để nói</p>
              )}
            </div>
          </div>

          {/* Interactive action controls */}
          <div className="flex items-center justify-center gap-4 border-t border-slate-100 dark:border-neutral-800 pt-6">
            {!isRecording ? (
              <Button
                variant="primary"
                size="lg"
                className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={startListening}
              >
                <Mic className="h-6 w-6" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg bg-rose-500 hover:bg-rose-600 text-white animate-pulse"
                onClick={stopListening}
              >
                <MicOff className="h-6 w-6" />
              </Button>
            )}
          </div>
        </Card>

        {/* Conversation transcript feed */}
        <Card variant="bezel" className="p-4 flex flex-col justify-between h-[450px]">
          <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">Lịch sử hội thoại</h3>
          
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
            {messages.map((m) => (
              <div key={m.id} className={`space-y-1 ${m.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-3 rounded-2xl text-xs font-medium leading-relaxed max-w-[90%] ${
                  m.role === "user"
                    ? "bg-violet-500 text-white rounded-tr-none"
                    : "bg-slate-100 dark:bg-neutral-800 text-slate-800 dark:text-slate-100 rounded-tl-none"
                }`}>
                  {m.text}
                </div>
                {m.pronunciationScore !== undefined && (
                  <div className="text-[9px] text-muted flex items-center justify-end gap-1.5 mt-0.5">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    Phát âm: <span className="font-extrabold text-violet-600">{m.pronunciationScore}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="mt-4 justify-center"
            onClick={() => setMessages([messages[0]])}
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Thiết lập lại cuộc hội thoại
          </Button>
        </Card>
      </div>
    </div>
  );
}
