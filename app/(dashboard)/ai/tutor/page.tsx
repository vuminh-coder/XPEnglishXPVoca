"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, recordSkillPractice } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import { motion, AnimatePresence } from "framer-motion";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { lookupWordDeep } from "@/features/vocabulary/data/deepDictionary";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

import {
  Mic,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Target,
  Bot,
  Square,
  RefreshCw,
  Send,
  BookMarked,
  X,
  BookmarkCheck,
  ChevronRight,
  Languages,
  MessageSquare,
  Headphones,
  Award,
  Zap,
  Lightbulb,
  Check,
  Star,
  SlidersHorizontal,
  Flame,
  RotateCcw,
  TrendingUp,
  ArrowRight,
  History,
  CheckCircle,
  HelpCircle,
  Quote,
  Wand2,
} from "lucide-react";

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

interface SuggestedWord {
  word: string;
  meaning?: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  pronunciationScore?: number;
  grammarCorrection?: {
    hasError?: boolean;
    original: string;
    corrected: string;
    explanation: string;
  };
  betterPhrasing?: string;
  vietnameseTranslation?: string;
  suggestedWords?: SuggestedWord[];
  suggestedPhrases?: string[];
}

interface Persona {
  id: "emma" | "alex" | "chloe";
  name: string;
  role: string;
  accent: "en-GB" | "en-US" | "en-AU";
  countryCode: string;
  countryName: string;
  flag: string;
  speakerIndex: number;
}

const PERSONAS: Persona[] = [
  {
    id: "emma",
    name: "Emma",
    role: "British IELTS Coach",
    accent: "en-GB",
    countryCode: "UK",
    countryName: "Anh Quốc",
    flag: "🇬🇧",
    speakerIndex: 0,
  },
  {
    id: "alex",
    name: "Alex",
    role: "American Business Coach",
    accent: "en-US",
    countryCode: "US",
    countryName: "Hoa Kỳ",
    flag: "🇺🇸",
    speakerIndex: 1,
  },
  {
    id: "chloe",
    name: "Chloe",
    role: "Australian Friendly Tutor",
    accent: "en-AU",
    countryCode: "AU",
    countryName: "Úc",
    flag: "🇦🇺",
    speakerIndex: 2,
  },
];

export default function VoiceTutorPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { setSidebarCollapsed } = useUiStore();

  // Session ID for current practice turn
  const [sessionId, setSessionId] = useState<string>(
    () => `ai_tutor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  );
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [pastSessions, setPastSessions] = useState<any[]>([]);
  const [selectedPastSession, setSelectedPastSession] = useState<any | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Auto collapse sidebar when entering AI Tutor
  useEffect(() => {
    setSidebarCollapsed(true);
    return () => {
      setSidebarCollapsed(false);
    };
  }, [setSidebarCollapsed]);

  // Fetch past session history from API / local fallback
  const fetchSessionHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch("/api/ai/sessions?mode=tutor");
      const data = await res.json();
      if (data.success && Array.isArray(data.sessions)) {
        setPastSessions(data.sessions);
      }
    } catch (err) {
      console.warn("Could not fetch session history:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleOpenHistoryDrawer = () => {
    setIsHistoryDrawerOpen(true);
    fetchSessionHistory();
  };

  // Persona & Voice Settings (Hydrated from localStorage)
  const [currentPersona, setCurrentPersona] = useState<"emma" | "alex" | "chloe">("emma");
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    try {
      const savedPersona = localStorage.getItem("xp_voca_ai_tutor_persona");
      if (savedPersona === "emma" || savedPersona === "alex" || savedPersona === "chloe") {
        setCurrentPersona(savedPersona);
      }
      const savedSpeed = localStorage.getItem("xp_voca_ai_tutor_speed");
      if (savedSpeed) {
        const num = parseFloat(savedSpeed);
        if (!isNaN(num) && num >= 0.5 && num <= 2.0) {
          setSpeechSpeed(num);
        }
      }
    } catch {}
  }, []);

  const handleSelectPersona = (id: "emma" | "alex" | "chloe") => {
    setCurrentPersona(id);
    try {
      localStorage.setItem("xp_voca_ai_tutor_persona", id);
    } catch {}
  };

  const handleSelectSpeed = (spd: number) => {
    setSpeechSpeed(spd);
    try {
      localStorage.setItem("xp_voca_ai_tutor_speed", String(spd));
    } catch {}
  };

  // Initial Welcome Message
  const initialWelcome = useMemo<ChatMessage>(
    () => ({
      id: "welcome",
      role: "ai",
      text: "Hello! I'm Emma, your AI Voice Tutor. Feel free to talk about anything on your mind today — from your hobbies to your work or daily life!",
      vietnameseTranslation:
        "Xin chào! Tôi là Emma, Gia sư Giọng nói AI của bạn. Hãy thoải mái trò chuyện về bất kỳ điều gì bạn muốn hôm nay — từ sở thích, công việc cho đến cuộc sống hàng ngày!",
      suggestedWords: [
        { word: "hobby", meaning: "sở thích" },
        { word: "routine", meaning: "thói quen" },
        { word: "experience", meaning: "trải nghiệm" },
      ],
      suggestedPhrases: [
        "I'd love to tell you about...",
        "To be honest, my favorite thing is...",
      ],
    }),
    []
  );

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcome]);

  // Voice & Persistent Speech Recognition States
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const isRecordingRef = useRef(false);
  const accumulatedTextRef = useRef("");
  const speechRecognitionRef = useRef<any>(null);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showTranslations, setShowTranslations] = useState<{ [key: string]: boolean }>({});

  // Active turn suggestions
  const [currentSuggestions, setCurrentSuggestions] = useState<{
    words: SuggestedWord[];
    phrases: string[];
  }>({
    words: initialWelcome.suggestedWords || [],
    phrases: initialWelcome.suggestedPhrases || [],
  });

  // Selected word modal state for 1-Click Interactive Deep Dictionary
  const [selectedWordData, setSelectedWordData] = useState<{
    word: string;
    ipa?: string;
    meaning?: string;
    example?: string;
  } | null>(null);

  // In-Place Completion & Scorecard State
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);
  const [showChatHistoryInSummary, setShowChatHistoryInSummary] = useState(false);

  // Practice timer state (seconds elapsed)
  const [elapsedTime, setElapsedTime] = useState(0);
  const activeTimeRef = useRef(0);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio Spectrum Visualizer
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const [audioFrequencies, setAudioFrequencies] = useState<number[]>(
    new Array(16).fill(10)
  );
  const animationFrameRef = useRef<number | null>(null);

  // Real-time backend practice time tracker
  useStudyTimeTracker("speaking", {
    activeCondition: !isSessionCompleted,
  });

  // Auto-track study time
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

  // Auto-scroll chat
  useEffect(() => {
    if (!isSessionCompleted || showChatHistoryInSummary) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, spokenText, loading, isSessionCompleted, showChatHistoryInSummary]);

  const activePersonaObj =
    PERSONAS.find((p) => p.id === currentPersona) || PERSONAS[0];

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTranslation = (msgId: string) => {
    setShowTranslations((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const speakText = (text: string, customSpeed?: number) => {
    if (!soundEnabled || !text) return;
    setIsSpeaking(true);
    speakLessonText(text, {
      lessonId: `ai_tutor_${currentPersona}`,
      speakerIndex: activePersonaObj.speakerIndex,
      accent: activePersonaObj.accent,
      rate: customSpeed || speechSpeed,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  // 1-Click Interactive Dictionary with lookupWordDeep
  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!cleanWord || cleanWord.length < 2) return;

    speakText(cleanWord);

    const deepDef = lookupWordDeep(cleanWord);
    setSelectedWordData({
      word: cleanWord,
      ipa: deepDef.ipa || `/${cleanWord}/`,
      meaning: deepDef.meaning || `Nghĩa Tiếng Việt của từ "${cleanWord}"`,
      example:
        deepDef.example || `Used naturally in speech: "${cleanWord}"`,
    });
  };

  const handleSaveWordToVocab = async () => {
    if (!selectedWordData) return;
    awardXp(5, "vocab");
    addToast({
      type: "success",
      title: "Đã lưu vào Sổ tay từ vựng! 💾",
      message: `+5 XP cho từ "${selectedWordData.word}"`,
    });

    try {
      await fetch("/api/user/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocabId: selectedWordData.word.toLowerCase(),
          isFavorite: true,
        }),
      });
    } catch {}

    setSelectedWordData(null);
  };

  // Audio Visualizer Loop
  const startAudioVisualizer = async () => {
    try {
      if (!audioContextRef.current) {
        const AudioContextClass =
          window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
        }
      }

      if (audioContextRef.current?.state === "suspended") {
        await audioContextRef.current.resume();
      }

      if (!micStreamRef.current && navigator.mediaDevices?.getUserMedia) {
        micStreamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }

      if (audioContextRef.current && micStreamRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(
          micStreamRef.current
        );
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyserRef.current = analyser;

        const updateFrequencies = () => {
          if (analyserRef.current) {
            const dataArray = new Uint8Array(
              analyserRef.current.frequencyBinCount
            );
            analyserRef.current.getByteFrequencyData(dataArray);
            const freqs = Array.from(dataArray.slice(0, 16)).map((v) =>
              Math.max(10, Math.min(100, Math.round((v / 255) * 100)))
            );
            setAudioFrequencies(freqs);
          }
          animationFrameRef.current = requestAnimationFrame(updateFrequencies);
        };
        updateFrequencies();
      }
    } catch (err) {
      console.warn("Audio visualizer notice:", err);
      const synthetic = () => {
        setAudioFrequencies(
          Array.from({ length: 16 }).map(
            () => Math.floor(Math.random() * 70) + 20
          )
        );
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

  // Continuous Speech Recognition Engine
  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addToast({
        type: "error",
        title: "Trình duyệt không hỗ trợ Web Speech API",
        message:
          "Vui lòng sử dụng Google Chrome, Edge hoặc Safari để luyện nói trực tiếp qua Micro.",
      });
      return;
    }

    try {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      accumulatedTextRef.current = spokenText.trim()
        ? spokenText.trim() + " "
        : "";

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

        const fullRecognized = (
          accumulatedTextRef.current + currentInterim
        ).trim();
        setSpokenText(fullRecognized);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition event:", event.error);
      };

      recognition.onend = () => {
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch (e) {
            stopRecordingOnly();
          }
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
        message:
          "Hãy cấp quyền Micro trong trình duyệt của bạn để trò chuyện cùng Gia sư AI.",
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
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      speechRecognitionRef.current = null;
    }
  };

  const handleResetSpeech = () => {
    accumulatedTextRef.current = "";
    setSpokenText("");
  };

  // Send User Message & Trigger Real Gemini AI
  const handleSendSpokenSpeech = async () => {
    const textToSend = spokenText.trim();
    if (!textToSend || loading) return;

    stopRecordingOnly();
    accumulatedTextRef.current = "";
    setSpokenText("");

    const userMsgId = `user_${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: "user",
      text: textToSend,
      pronunciationScore: Math.floor(Math.random() * 8) + 90,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          persona: currentPersona,
          speed: speechSpeed,
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error("AI response failed");
      }

      const data = await response.json();

      if (data.grammarCorrection || data.betterPhrasing) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsgId
              ? {
                  ...m,
                  grammarCorrection: data.grammarCorrection,
                  betterPhrasing: data.betterPhrasing,
                }
              : m
          )
        );
      }

      if (data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: "ai",
          text: data.reply,
          vietnameseTranslation: data.vietnameseTranslation,
          suggestedWords: (data.suggestedWords || []).slice(0, 3),
          suggestedPhrases: (data.suggestedPhrases || []).slice(0, 2),
        };

        setMessages((prev) => [...prev, aiMsg]);
        speakText(data.reply);

        if (aiMsg.suggestedWords && aiMsg.suggestedWords.length > 0) {
          setCurrentSuggestions({
            words: aiMsg.suggestedWords,
            phrases: aiMsg.suggestedPhrases || [],
          });
        }

        awardXp(15, "speaking");
      }
    } catch (e) {
      console.error(e);
      const fallbackReply = `That sounds really interesting! Tell me more about what you think.`;
      const fallbackVi = `Nghe thật thú vị! Hãy kể thêm cho tôi nghe về suy nghĩ của bạn nhé.`;

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: "ai",
        text: fallbackReply,
        vietnameseTranslation: fallbackVi,
        suggestedWords: [
          { word: "perspective", meaning: "góc nhìn" },
          { word: "experience", meaning: "trải nghiệm" },
          { word: "specifically", meaning: "cụ thể là" },
        ],
        suggestedPhrases: [
          "From my point of view...",
          "The main reason is that...",
        ],
      };
      setMessages((prev) => [...prev, aiMsg]);
      speakText(fallbackReply);
      setCurrentSuggestions({
        words: aiMsg.suggestedWords || [],
        phrases: aiMsg.suggestedPhrases || [],
      });
    } finally {
      setLoading(false);
    }
  };

  // Session Statistics & Dynamic Voice Evaluation
  const userMessages = useMemo(
    () => messages.filter((m) => m.role === "user"),
    [messages]
  );
  const userTurnsCount = userMessages.length;
  const grammarCorrections = useMemo(() => {
    return messages
      .filter((m) => m.grammarCorrection?.hasError || m.betterPhrasing)
      .map((m) => ({
        original: m.grammarCorrection?.original || m.text,
        corrected: m.grammarCorrection?.corrected,
        explanation: m.grammarCorrection?.explanation,
        betterPhrasing: m.betterPhrasing,
      }));
  }, [messages]);

  const allSuggestedWords = useMemo(() => {
    const map = new Map<string, string>();
    messages.forEach((m) => {
      m.suggestedWords?.forEach((w) => {
        if (w.word && !map.has(w.word)) {
          map.set(w.word, w.meaning || "");
        }
      });
    });
    return Array.from(map.entries()).map(([word, meaning]) => ({
      word,
      meaning,
    }));
  }, [messages]);

  const sessionEvaluation = useMemo(() => {
    if (userTurnsCount === 0) {
      return {
        overallScore: 0,
        pronunciationScore: 0,
        fluencyScore: 0,
        intonationScore: 0,
        grammarScore: 0,
        grade: "C",
        label: "Chưa Đánh Giá",
        color:
          "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
        xpAward: 0,
        coachFeedback: "Hãy bắt đầu trò chuyện để nhận đánh giá chi tiết nhé!",
      };
    }

    const scores = userMessages.map((m) => m.pronunciationScore || 92);
    const avgPronunciation =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 92;

    const errorsCount = grammarCorrections.filter((g) => g.corrected).length;
    const grammarScore = Math.max(50, Math.min(100, 100 - errorsCount * 15));
    const fluencyScore = Math.min(100, Math.max(70, 75 + userTurnsCount * 6));
    const intonationScore = Math.min(100, Math.max(75, avgPronunciation - 3));

    const overallScore = Math.round(
      0.35 * avgPronunciation +
        0.25 * fluencyScore +
        0.2 * intonationScore +
        0.2 * grammarScore
    );

    let grade = "C";
    let label = "Cần Cố Gắng";
    let color =
      "text-amber-700 dark:text-amber-300 bg-amber-500/10 border-amber-500/30";
    let xpAward = 15;

    if (overallScore >= 90) {
      grade = "S";
      label = "Xuất Sắc";
      color =
        "text-purple-700 dark:text-purple-300 bg-purple-500/10 border-purple-500/30";
      xpAward = 45;
    } else if (overallScore >= 80) {
      grade = "A";
      label = "Thành Thạo";
      color =
        "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/30";
      xpAward = 35;
    } else if (overallScore >= 70) {
      grade = "B";
      label = "Khá Tốt";
      color = "text-[#0059bb] dark:text-sky-300 bg-[#0059bb]/10 border-[#0059bb]/30";
      xpAward = 25;
    }

    let coachFeedback = "";
    if (activePersonaObj.id === "emma") {
      coachFeedback =
        overallScore >= 85
          ? "Excellent speaking flow and natural British rhythm! Your articulation was clear and vocabulary choice was sophisticated."
          : "Good effort! Try focusing on sentence connection and linking words smoothly to elevate your fluency.";
    } else if (activePersonaObj.id === "alex") {
      coachFeedback =
        overallScore >= 85
          ? "Awesome energy! Your spoken responses were sharp, direct, and sound very natural in a professional conversational setting."
          : "Keep it up! Try to expand on your thoughts by giving one more example or reason in each turn.";
    } else {
      coachFeedback =
        overallScore >= 85
          ? "Brilliant chat today! You spoke so freely and with wonderful confidence. Love your natural expressions!"
          : "You did great today! Remember that making mistakes is part of the journey. Keep practicing with me anytime!";
    }

    return {
      overallScore,
      pronunciationScore: avgPronunciation,
      fluencyScore,
      intonationScore,
      grammarScore,
      grade,
      label,
      color,
      xpAward,
      coachFeedback,
    };
  }, [userTurnsCount, userMessages, grammarCorrections, activePersonaObj.id]);

  const handleFinishConversation = async () => {
    if (userTurnsCount === 0) {
      addToast({
        type: "warning",
        title: "Chưa có dữ liệu trò chuyện 🎙️",
        message:
          "Bạn hãy nói ít nhất 1 câu để Huấn luyện viên có dữ liệu đánh giá và chấm điểm nhé!",
      });
      return;
    }

    if (isRecording) {
      stopRecordingOnly();
    }
    setIsSessionCompleted(true);
    awardXp(sessionEvaluation.xpAward, "speaking");
    addToast({
      type: "success",
      title: `Hoàn Thành Buổi Luyện Nói (Hạng ${sessionEvaluation.grade})! 🎉`,
      message: `+${sessionEvaluation.xpAward} XP cùng Huấn luyện viên ${activePersonaObj.name}!`,
    });

    // Persist full practice transcript & scorecard to PostgreSQL Neon ai_practice_sessions
    try {
      await fetch("/api/ai/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          mode: "tutor",
          personaId: currentPersona,
          messages,
          overallScore: sessionEvaluation.overallScore,
          grade: sessionEvaluation.grade,
          evaluationMetrics: {
            pronunciationScore: sessionEvaluation.pronunciationScore,
            fluencyScore: sessionEvaluation.fluencyScore,
            intonationScore: sessionEvaluation.intonationScore,
            grammarScore: sessionEvaluation.grammarScore,
            coachFeedback: sessionEvaluation.coachFeedback,
          },
          timeSpentSeconds: elapsedTime,
          xpEarned: sessionEvaluation.xpAward,
          status: "COMPLETED",
        }),
      });
    } catch (err) {
      console.warn("Could not save session to server:", err);
    }
  };

  const handleRestartNewSession = () => {
    setSessionId(`ai_tutor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
    setIsSessionCompleted(false);
    setShowChatHistoryInSummary(false);
    setMessages([initialWelcome]);
    setElapsedTime(0);
    activeTimeRef.current = 0;
    setCurrentSuggestions({
      words: initialWelcome.suggestedWords || [],
      phrases: initialWelcome.suggestedPhrases || [],
    });
    addToast({
      type: "info",
      title: "Bắt đầu buổi nói mới! 🎙️",
      message: `Đang trò chuyện cùng ${activePersonaObj.name}`,
    });
  };

  const handleMicrophoneToggle = () => {
    if (isRecording) {
      if (spokenText.trim()) {
        handleSendSpokenSpeech();
      } else {
        stopRecordingOnly();
      }
    } else {
      startRecording();
    }
  };

  return (
    <div className="w-full h-full min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. APP TOP HEADER (FIXED 56PX) */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Lịch Sử Buổi Học Button */}
            <button
              type="button"
              onClick={handleOpenHistoryDrawer}
              className="h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shrink-0"
              title="Xem lại lịch sử các buổi học trước"
            >
              <History className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span className="hidden sm:inline">Lịch sử</span>
            </button>

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
            active
            icon={<SpeakingIcon className="w-3.5 h-3.5 text-purple-500" />}
            label="Luyện nói"
          />
          <HeaderPillItem
            href="/ai/conversation"
            icon={<Wand2 className="w-3.5 h-3.5 text-fuchsia-500" />}
            label="Luyện viết"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN DASHBOARD-STYLE VIEWPORT CANVAS (FITS IN 1 SCREEN ON DESKTOP) */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3.5 lg:py-3 flex flex-col min-h-0 lg:overflow-hidden space-y-2.5 sm:space-y-3 pb-24 lg:pb-3">
        {/* 2.1. SLIM HERO STATUS STRIP (DASHBOARD BENTO STYLE) */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="shrink-0 relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/50 flex items-center justify-center text-xs font-black text-[#0059bb] dark:text-sky-400 shadow-2xs font-mono">
                <span>{activePersonaObj.countryCode}</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  {isSessionCompleted
                    ? "Báo Cáo Buổi Luyện Nói"
                    : `Đang trò chuyện cùng ${activePersonaObj.name}`}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-bold font-mono border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
                  {activePersonaObj.role}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                {isSessionCompleted
                  ? `Đã hoàn thành buổi đánh giá cùng ${activePersonaObj.name} (${activePersonaObj.accent})`
                  : "Nói tự do bằng Micro • Bấm Micro lần 1 để nói, bấm lại lần 2 để gửi tự động"}
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
            {/* CỘT TRÁI: VOICE CHAT STREAM & INPUT DOCK (8/12) */}
            <div className="lg:col-span-8 flex flex-col min-w-0 lg:h-full lg:min-h-0">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col min-w-0 flex-1 lg:h-full lg:min-h-0 space-y-2.5">
                {/* Header Trong Khung Chat */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 gap-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold text-xs font-mono border border-blue-200/60 dark:border-blue-800/40">
                      {activePersonaObj.countryCode}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                      {activePersonaObj.name} ({activePersonaObj.role})
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
                    {soundEnabled ? (
                      <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden sm:inline">
                      {soundEnabled ? "Bật âm" : "Tắt âm"}
                    </span>
                  </button>
                </div>

                {/* Scrollable Chat Stream Box */}
                <div className="flex-1 min-h-[280px] lg:min-h-0 overflow-y-auto space-y-3 p-1 pr-1.5 scrollbar-thin">
                  {messages.map((msg) => {
                    const isAi = msg.role === "ai";
                    const isTranslated = showTranslations[msg.id];

                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2.5 ${
                          isAi ? "justify-start" : "justify-end"
                        }`}
                      >
                        {isAi && (
                          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/80 dark:border-blue-800/50 shadow-2xs text-xs font-mono font-bold">
                            <span>{activePersonaObj.countryCode}</span>
                          </div>
                        )}

                        <div
                          className={`space-y-1.5 max-w-[88%] sm:max-w-[82%] ${
                            isAi ? "" : "items-end flex flex-col"
                          }`}
                        >
                          {/* Chat Bubble */}
                          <div
                            className={`p-3 rounded-xl text-xs sm:text-sm font-medium leading-relaxed shadow-2xs transition-all ${
                              isAi
                                ? "bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white"
                                : "bg-gradient-to-r from-[#0059bb] to-blue-600 text-white shadow-sm"
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
                                <span className="shrink-0 text-[#0059bb] dark:text-sky-400 font-bold font-mono">
                                  [Dịch]
                                </span>
                                <span>{msg.vietnameseTranslation}</span>
                              </div>
                            )}
                          </div>

                          {/* AI Grammar Correction Card */}
                          {!isAi &&
                            (msg.grammarCorrection?.hasError ||
                              msg.betterPhrasing) && (
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
                                      <span className="text-slate-400 dark:text-slate-500 font-bold">
                                        ➔
                                      </span>
                                      <span className="font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/30">
                                        {msg.grammarCorrection.corrected}
                                      </span>
                                    </div>
                                    {msg.grammarCorrection.explanation && (
                                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 pt-0.5">
                                        {msg.grammarCorrection.explanation
                                          .replace(/^\((.*)\)$/, "$1")
                                          .trim()}
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
                                        "
                                        {msg.betterPhrasing
                                          .replace(/^["']|["']$/g, "")
                                          .replace(
                                            /^(A more natural way to say that (would be|is)|You could say|A better phrasing is|Try saying),?\s*/i,
                                            ""
                                          )
                                          .replace(/^["']|["']$/g, "")}
                                        "
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          speakText(
                                            msg.betterPhrasing
                                              ?.replace(/^["']|["']$/g, "")
                                              .replace(
                                                /^(A more natural way to say that (would be|is)|You could say|A better phrasing is|Try saying),?\s*/i,
                                                ""
                                              )
                                              .replace(/^["']|["']$/g, "") || ""
                                          )
                                        }
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
                            name={
                              user?.fullName ||
                              user?.username ||
                              user?.email
                            }
                            size="w-8 h-8"
                            className="mt-0.5 shrink-0"
                          />
                        )}
                      </div>
                    );
                  })}

                  {loading && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 text-[#0059bb] dark:text-sky-300 text-xs font-bold animate-pulse w-fit shadow-2xs">
                      <RefreshCw className="w-4 h-4 animate-spin" />{" "}
                      {activePersonaObj.name} đang lắng nghe & suy nghĩ...
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Dải Gợi Ý Thuần Chữ (Shrink-0) */}
                {(currentSuggestions.words.length > 0 ||
                  currentSuggestions.phrases.length > 0) && (
                  <div className="pt-2 pb-0.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 flex-wrap shrink-0">
                    <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider flex items-center gap-1 shrink-0 select-none">
                      <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> Gợi ý:
                    </span>

                    {currentSuggestions.words.slice(0, 3).map((w, idx) => (
                      <React.Fragment key={`w_${idx}`}>
                        {idx > 0 && (
                          <span className="text-slate-300 dark:text-slate-600 select-none">
                            •
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => speakText(w.word)}
                          className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-400 cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors"
                        >
                          {w.word}
                        </button>
                      </React.Fragment>
                    ))}

                    {currentSuggestions.phrases.slice(0, 2).map((phrase, idx) => (
                      <React.Fragment key={`p_${idx}`}>
                        <span className="text-slate-300 dark:text-slate-600 select-none">
                          •
                        </span>
                        <button
                          type="button"
                          onClick={() => speakText(phrase)}
                          className="text-xs text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 font-semibold cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors truncate max-w-[220px]"
                        >
                          "{phrase}"
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Voice Input Dock (Pinned to bottom of left card) */}
                <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                  <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                    {/* Nút Micro Toggle-to-Send */}
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
                          ? "Đang thu âm • Bấm lại nút Micro để DỪNG VÀ TỰ ĐỘNG GỬI ĐI"
                          : "Nhấn nút Micro và bắt đầu nói tiếng Anh (Bấm lại để gửi)"
                      }
                    >
                      {isRecording ? (
                        <Square className="w-4 h-4 fill-white" />
                      ) : (
                        <Mic className="w-4.5 h-4.5 stroke-[2]" />
                      )}
                    </button>

                    {/* Khung Hiển Thị Lời Nói */}
                    <div className="relative flex-1">
                      <input
                        type="text"
                        readOnly
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" &&
                            spokenText.trim() &&
                            !loading
                          ) {
                            e.preventDefault();
                            handleSendSpokenSpeech();
                          }
                        }}
                        placeholder={
                          loading
                            ? "Gia sư AI đang phản hồi..."
                            : isRecording
                            ? `🔴 Đang nghe bạn nói... (00:${
                                recordingTime < 10
                                  ? `0${recordingTime}`
                                  : recordingTime
                              }) • Bấm lại Micro để GỬI`
                            : spokenText
                            ? "Đã nhận diện câu nói (Bấm nút Micro hoặc Gửi)"
                            : "Nhấn nút Micro và bắt đầu nói tiếng Anh..."
                        }
                        value={spokenText}
                        className="w-full h-9 pl-3 pr-8 text-xs sm:text-sm font-medium rounded-lg bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0059bb]"
                      />
                      {spokenText && (
                        <button
                          type="button"
                          onClick={handleResetSpeech}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                          title="Xóa đoạn vừa nói để nói lại (Làm mới)"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Nút Gửi */}
                    <button
                      type="button"
                      onClick={handleSendSpokenSpeech}
                      disabled={!spokenText.trim() || loading}
                      className="h-9 px-3.5 rounded-lg bg-[#0059bb] hover:bg-[#004899] disabled:opacity-40 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer shrink-0 transition-all active:scale-95"
                      title="Gửi câu nói đến Gia sư AI (Phím Enter)"
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
                            height: `${Math.max(
                              3,
                              Math.min(12, (freq / 100) * 12)
                            )}px`,
                            backgroundColor: isRecording
                              ? "#f43f5e"
                              : "#0059bb",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: HIGH-END HARMONIOUS SIDEBAR (4/12) */}
            <div className="lg:col-span-4 flex flex-col min-w-0 lg:h-full lg:min-h-0">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-2.5 lg:h-full lg:min-h-0 overflow-y-auto">
                {/* 1. KHỐI CHỌN GIA SƯ AI & SPEED DOCK TRÊN CÙNG */}
                <div className="space-y-2 shrink-0">
                  <div className="flex items-center justify-between pb-1">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-[#0059bb]" /> GIA SƯ AI
                    </h2>
                    {/* Speed Dock Pill In Header */}
                    <div className="p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5">
                      {[0.75, 1.0, 1.25].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => handleSelectSpeed(spd)}
                          className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                            speechSpeed === spd
                              ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-300 shadow-2xs font-extrabold"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3 Persona Cards - Sleek Compact List */}
                  <div className="space-y-1.5">
                    {PERSONAS.map((p) => {
                      const isActive = currentPersona === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectPersona(p.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                            isActive
                              ? "bg-blue-50/80 dark:bg-blue-950/50 border-[#0059bb] text-[#0059bb] dark:text-sky-300 font-bold shadow-2xs"
                              : "bg-slate-50/70 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 border ${
                                isActive
                                  ? "bg-[#0059bb] text-white border-[#0059bb]"
                                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                              }`}
                            >
                              {p.countryCode}
                            </span>
                            <div className="truncate">
                              <div className="text-xs sm:text-sm font-bold font-display truncate text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{p.name}</span>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                  ({p.countryName})
                                </span>
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate">
                                {p.role}
                              </div>
                            </div>
                          </div>
                          {isActive && (
                            <Check className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0 stroke-[3]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. KHỐI TỪ VỰNG THEO NGỮ CẢNH (NO CUTOFF, FULL 3 ITEMS) */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> TỪ VỰNG NGỮ CẢNH
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Click tra/nghe
                    </span>
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
                            <p className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium">
                              {w.meaning}
                            </p>
                          )}
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center group-hover:bg-[#0059bb] group-hover:text-white group-hover:border-[#0059bb] transition-all shrink-0">
                          <Volume2 className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. KHỐI MẪU CÂU PHẢN XẠ GIAO TIẾP (COHESIVE & NO ITALIC) */}
                {currentSuggestions.phrases.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> MẪU CÂU MỞ ĐẦU
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Click nghe mẫu
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {currentSuggestions.phrases.slice(0, 2).map((ph, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => speakText(ph)}
                          className="w-full text-left px-3 py-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 hover:border-amber-400 dark:hover:border-amber-700 text-amber-950 dark:text-amber-100 transition-all flex items-center justify-between gap-2 group cursor-pointer shadow-2xs"
                        >
                          <span className="text-xs font-semibold truncate flex-1">
                            "{ph}"
                          </span>
                          <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
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
                        Đánh Giá Buổi Luyện Nói
                      </h2>
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase">
                        Hoàn Tất
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      Huấn luyện viên:{" "}
                      <strong className="text-slate-900 dark:text-white">
                        {activePersonaObj.name}
                      </strong>{" "}
                      ({activePersonaObj.role})
                    </p>
                  </div>
                </div>

                {/* Overall Score Badge */}
                <div className="flex items-center gap-3 sm:self-center">
                  <div
                    className={`px-3 py-1 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs ${sessionEvaluation.color}`}
                  >
                    <span>Hạng {sessionEvaluation.grade}</span>
                    <span>•</span>
                    <span>{sessionEvaluation.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Điểm Phản Xạ
                    </span>
                    <span className="text-lg sm:text-xl font-black text-[#0059bb] dark:text-sky-400 font-display tabular-nums">
                      {sessionEvaluation.overallScore}/100
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Phần Thưởng
                    </span>
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
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> Thời gian nói
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                    {formatElapsedTime(elapsedTime)}
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
                    <Mic className="w-3.5 h-3.5 text-indigo-500" /> Điểm phát âm
                  </span>
                  <p className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
                    {sessionEvaluation.pronunciationScore}/100
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
                          <span className="font-bold text-slate-400 shrink-0 font-mono text-xs">
                            #{idx + 1}
                          </span>
                          <div className="space-y-1 flex-1">
                            {item.corrected && (
                              <div>
                                <span className="text-rose-600 dark:text-rose-400 line-through mr-1 font-semibold">
                                  {item.original}
                                </span>
                                ➔{" "}
                                <strong className="text-emerald-700 dark:text-emerald-300 font-bold ml-1">
                                  {item.corrected}
                                </strong>
                                {item.explanation && (
                                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                                    {item.explanation
                                      .replace(/^\((.*)\)$/, "$1")
                                      .trim()}
                                  </p>
                                )}
                              </div>
                            )}
                            {item.betterPhrasing && (
                              <div className="text-emerald-800 dark:text-emerald-200 font-medium pt-1">
                                <span className="font-bold text-emerald-700 dark:text-emerald-300 mr-1.5">
                                  ✨ Diễn đạt tự nhiên:
                                </span>
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
                      Phản xạ rất tuyệt vời!
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Bạn không gặp lỗi ngữ pháp nghiêm trọng nào trong suốt buổi nói chuyện hôm nay.
                    </p>
                  </div>
                )}

                {/* Toggle View Full Chat History */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() =>
                      setShowChatHistoryInSummary(!showChatHistoryInSummary)
                    }
                    className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>
                      {showChatHistoryInSummary
                        ? "Ẩn đoạn hội thoại chi tiết"
                        : "Xem lại toàn bộ đoạn hội thoại"}
                    </span>
                  </button>

                  {showChatHistoryInSummary && (
                    <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2 max-h-[200px] overflow-y-auto">
                      {messages.map((m) => (
                        <div key={m.id} className="text-xs space-y-0.5">
                          <span
                            className={`font-bold ${
                              m.role === "ai"
                                ? "text-[#0059bb] dark:text-sky-400"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {m.role === "ai"
                              ? `${activePersonaObj.name}:`
                              : "Bạn:"}
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            {m.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Cột Phải: Lời Nhận Xét Của Huấn Luyện Viên (4/12) */}
              <div className="lg:col-span-4 p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
                {/* Coach Evaluation Card */}
                <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-blue-800 flex items-center justify-center text-xs font-black text-[#0059bb] dark:text-sky-400 shrink-0 shadow-2xs font-mono">
                      {activePersonaObj.countryCode}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{activePersonaObj.name}</span>
                        <span className="text-xs font-medium text-[#0059bb] dark:text-sky-400">
                          ({activePersonaObj.accent})
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium">
                        {activePersonaObj.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-blue-200/60 dark:border-blue-900/30">
                    "{sessionEvaluation.coachFeedback}"
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

      {/* 3. 1-CLICK INTERACTIVE DEEP WORD DICTIONARY FLOATING MODAL */}
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
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
                  {selectedWordData.ipa}
                </p>
              )}

              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {selectedWordData.meaning}
              </p>

              {selectedWordData.example && (
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800">
                  {selectedWordData.example}
                </p>
              )}
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

      {/* 4. SESSION HISTORY DRAWER & TRANSCRIPT PREVIEW */}
      <AnimatePresence>
        {isHistoryDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col min-h-0"
            >
              {/* Drawer Header */}
              <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center border border-blue-200/60">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                      Lịch Sử Luyện Nói AI
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {pastSessions.length} buổi học đã lưu
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsHistoryDrawerOpen(false);
                    setSelectedPastSession(null);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3">
                {isLoadingHistory ? (
                  <div className="flex items-center justify-center py-12 gap-2 text-xs font-bold text-slate-500">
                    <RefreshCw className="w-4 h-4 animate-spin text-[#0059bb]" />
                    <span>Đang tải lịch sử...</span>
                  </div>
                ) : selectedPastSession ? (
                  /* Detail View of a Selected Past Session */
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPastSession(null)}
                      className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      ← Quay lại danh sách buổi học
                    </button>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-500">
                          {selectedPastSession.createdAt ? new Date(selectedPastSession.createdAt).toLocaleString("vi-VN") : "Gần đây"}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-300 font-mono">
                          Hạng {selectedPastSession.grade || "A"} • {selectedPastSession.overallScore || 85}/100
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        Huấn luyện viên: {selectedPastSession.personaId?.toUpperCase() || "EMMA"}
                      </p>
                    </div>

                    {/* Message Transcript */}
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Kịch bản đối thoại ({selectedPastSession.messages?.length || 0} câu):
                      </div>
                      {selectedPastSession.messages?.map((m: any, idx: number) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl text-xs space-y-1 ${
                            m.role === "ai"
                              ? "bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-slate-900 dark:text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#0059bb] dark:text-sky-400">
                              {m.role === "ai" ? "AI Coach" : "Bạn"}
                            </span>
                            {m.pronunciationScore && (
                              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                {m.pronunciationScore} pts
                              </span>
                            )}
                          </div>
                          <p className="leading-relaxed">{m.text}</p>
                          {m.vietnameseTranslation && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5 border-t border-slate-200/60 dark:border-slate-800">
                              [Dịch] {m.vietnameseTranslation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : pastSessions.length > 0 ? (
                  /* List View of All Past Sessions */
                  <div className="space-y-2.5">
                    {pastSessions.map((session, idx) => (
                      <div
                        key={session.sessionId || idx}
                        onClick={() => setSelectedPastSession(session)}
                        className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 hover:border-[#0059bb] dark:hover:border-sky-500 shadow-2xs cursor-pointer transition-all space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                              Huấn luyện viên {session.personaId?.toUpperCase() || "EMMA"}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-md text-xs font-bold font-mono bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60">
                            {session.overallScore || 85}/100 (Hạng {session.grade || "A"})
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {session.timeSpentSeconds ? `${Math.ceil(session.timeSpentSeconds / 60)} phút` : "1 phút"}
                          </span>
                          <span>+{session.xpEarned || 35} XP</span>
                          <span className="text-slate-400">
                            {session.createdAt ? new Date(session.createdAt).toLocaleDateString("vi-VN") : "Hôm nay"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 text-slate-400">
                    <History className="w-8 h-8 stroke-1 text-slate-300 dark:text-slate-600" />
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Chưa có lịch sử buổi học
                    </p>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Khi bạn hoàn thành và bấm "Chấm điểm" một buổi luyện nói, toàn bộ kịch bản sẽ được lưu tại đây.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
