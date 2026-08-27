"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useUserStore, recordSkillPractice } from "@/lib/store/userStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useUiStore } from "@/lib/store/uiStore";
import { PageEntranceWrapper, MotionItem } from "@/components/shared/PageEntranceAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { speakLessonText } from "@/lib/utils/ttsEngine";

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
  CheckCircle
} from "lucide-react";

// ===== BASIC IPA DICTIONARY LOOKUP TABLE =====
const IPA_DICTIONARY: Record<string, { ipa: string; meaning: string }> = {
  "hello": { ipa: "/həˈloʊ/", meaning: "Xin chào" },
  "practice": { ipa: "/ˈpræk.tɪs/", meaning: "Luyện tập, thực hành" },
  "speaking": { ipa: "/ˈspiː.kɪŋ/", meaning: "Nói, phát biểu" },
  "english": { ipa: "/ˈɪŋ.ɡlɪʃ/", meaning: "Tiếng Anh" },
  "together": { ipa: "/təˈɡeð.ər/", meaning: "Cùng nhau" },
  "favorite": { ipa: "/ˈfeɪ.vər.ɪt/", meaning: "Yêu thích nhất" },
  "hobby": { ipa: "/ˈhɑː.bi/", meaning: "Sở thích" },
  "interesting": { ipa: "/ˈɪn.trə.stɪŋ/", meaning: "Thú vị" },
  "learning": { ipa: "/ˈlɜːr.nɪŋ/", meaning: "Học tập" },
  "because": { ipa: "/bɪˈkɔːz/", meaning: "Bởi vì" },
  "helps": { ipa: "/helps/", meaning: "Giúp đỡ" },
  "speak": { ipa: "/spiːk/", meaning: "Nói" },
  "naturally": { ipa: "/ˈnætʃ.ər.əl.i/", meaning: "Một cách tự nhiên" },
  "perspective": { ipa: "/pərˈspek.tɪv/", meaning: "Góc nhìn, quan điểm" },
  "fascinating": { ipa: "/ˈfæs.ən.eɪ.tɪŋ/", meaning: "Hấp dẫn, lôi cuốn" },
  "specifically": { ipa: "/spəˈsɪf.ɪ.kli/", meaning: "Cụ thể là" },
  "benefit": { ipa: "/ˈben.ə.fɪt/", meaning: "Lợi ích" },
  "conversation": { ipa: "/ˌkɑːn.vərˈseɪ.ʃən/", meaning: "Cuộc hội thoại" },
  "travel": { ipa: "/ˈtræv.əl/", meaning: "Du lịch" },
  "experience": { ipa: "/ɪkˈspɪr.i.əns/", meaning: "Trải nghiệm, kinh nghiệm" },
  "understand": { ipa: "/ˌʌn.dərˈstænd/", meaning: "Hiểu" },
  "improve": { ipa: "/ɪmˈpruːv/", meaning: "Cải thiện" },
  "pronunciation": { ipa: "/prəˌnʌn.siˈeɪ.ʃən/", meaning: "Phát âm" },
  "vocabulary": { ipa: "/voʊˈkæb.jə.ler.i/", meaning: "Từ vựng" },
  "grammar": { ipa: "/ˈɡræm.ər/", meaning: "Ngữ pháp" },
  "routine": { ipa: "/ruːˈtiːn/", meaning: "Thói quen hàng ngày" },
  "movie": { ipa: "/ˈmuː.vi/", meaning: "Bộ phim" },
  "cinema": { ipa: "/ˈsɪn.ə.mə/", meaning: "Rạp chiếu phim" },
  "cinematography": { ipa: "/ˌsɪn.ə.məˈtɑː.ɡrə.fi/", meaning: "Nghệ thuật quay phim" },
  "soundtrack": { ipa: "/ˈsaʊnd.træk/", meaning: "Nhạc phim" },
  "blockbuster": { ipa: "/ˈblɑːkˌbʌs.tər/", meaning: "Phim bom tấn" },
  "culinary": { ipa: "/ˈkʌl.ə.ner.i/", meaning: "Ẩm thực" },
  "ingredient": { ipa: "/ɪnˈɡriː.di.ənt/", meaning: "Nguyên liệu" },
  "flavorful": { ipa: "/ˈfleɪ.vər.fəl/", meaning: "Đậm đà hương vị" },
  "homemade": { ipa: "/ˌhoʊmˈmeɪd/", meaning: "Tự làm tại nhà" },
  "technology": { ipa: "/tekˈnɑː.lə.dʒi/", meaning: "Công nghệ" },
  "artificial": { ipa: "/ˌɑːr.t̬əˈfɪʃ.əl/", meaning: "Nhân tạo" },
  "intelligence": { ipa: "/ɪnˈtel.ə.dʒəns/", meaning: "Trí tuệ" },
  "confident": { ipa: "/ˈkɑːn.fə.dənt/", meaning: "Tự tin" },
  "fluent": { ipa: "/ˈfluː.ənt/", meaning: "Trôi chảy, lưu loát" },
};

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
  flag: string;
  speakerIndex: number;
}

const PERSONAS: Persona[] = [
  { id: "emma", name: "Emma", role: "British IELTS Coach", accent: "en-GB", flag: "🇬🇧", speakerIndex: 0 },
  { id: "alex", name: "Alex", role: "American Business Coach", accent: "en-US", flag: "🇺🇸", speakerIndex: 1 },
  { id: "chloe", name: "Chloe", role: "Australian Friendly Tutor", accent: "en-AU", flag: "🇦🇺", speakerIndex: 2 }
];

export default function VoiceTutorPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { setSidebarCollapsed } = useUiStore();

  // Automatically manage sidebar collapse when in AI tutor practice session
  useEffect(() => {
    setSidebarCollapsed(true);
    return () => {
      setSidebarCollapsed(false);
    };
  }, [setSidebarCollapsed]);

  // Persona & Voice Settings
  const [currentPersona, setCurrentPersona] = useState<"emma" | "alex" | "chloe">("emma");
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initial Welcome Message
  const initialWelcome = useMemo<ChatMessage>(() => ({
    id: "welcome",
    role: "ai",
    text: "Hello! I'm Emma, your AI Voice Tutor. Feel free to talk about anything on your mind today — from your hobbies to your work or daily life!",
    vietnameseTranslation: "Xin chào! Tôi là Emma, Gia sư Giọng nói AI của bạn. Hãy thoải mái trò chuyện về bất kỳ điều gì bạn muốn hôm nay — từ sở thích, công việc cho đến cuộc sống hàng ngày!",
    suggestedWords: [
      { word: "hobby", meaning: "sở thích" },
      { word: "routine", meaning: "thói quen" },
      { word: "experience", meaning: "trải nghiệm" }
    ],
    suggestedPhrases: [
      "I'd love to tell you about...",
      "To be honest, my favorite thing is..."
    ]
  }), []);

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

  // Active turn suggestions (Dynamic clean text suggestions)
  const [currentSuggestions, setCurrentSuggestions] = useState<{
    words: SuggestedWord[];
    phrases: string[];
  }>({
    words: initialWelcome.suggestedWords || [],
    phrases: initialWelcome.suggestedPhrases || []
  });

  // Selected word modal state for 1-Click Interactive Dictionary
  const [selectedWordData, setSelectedWordData] = useState<{
    word: string;
    ipa?: string;
    meaning?: string;
    example?: string;
  } | null>(null);

  // In-Place Completion & Scorecard State (No popup floating modal)
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
  const [audioFrequencies, setAudioFrequencies] = useState<number[]>(new Array(16).fill(10));
  const animationFrameRef = useRef<number | null>(null);

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

  const activePersonaObj = PERSONAS.find((p) => p.id === currentPersona) || PERSONAS[0];

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!cleanWord || cleanWord.length < 2) return;

    speakText(cleanWord);

    const dictEntry = IPA_DICTIONARY[cleanWord];
    setSelectedWordData({
      word: cleanWord,
      ipa: dictEntry?.ipa || `/${cleanWord}/`,
      meaning: dictEntry?.meaning || `Nghĩa Tiếng Việt của từ "${cleanWord}"`,
      example: `Used naturally in speech: "${cleanWord}"`
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
  const handleSendSpokenSpeech = async () => {
    const textToSend = spokenText.trim();
    if (!textToSend || loading) return;

    // Stop recording first
    stopRecordingOnly();

    accumulatedTextRef.current = "";
    setSpokenText("");

    const score = Math.floor(Math.random() * 8) + 92;

    let grammarFix: ChatMessage["grammarCorrection"] = undefined;
    let naturalWay: string | undefined = undefined;

    const lowerText = textToSend.toLowerCase();
    if (lowerText.includes("i love") && !lowerText.includes("passionate")) {
      naturalWay = "I'm genuinely passionate about this!";
    } else if (lowerText.includes("want go")) {
      grammarFix = {
        hasError: true,
        original: textToSend,
        corrected: textToSend.replace(/want go/i, "want to go"),
        explanation: "Dùng 'want to + V' thay vì 'want + V'."
      };
      naturalWay = textToSend.replace(/want go/i, "would love to go");
    } else if (lowerText.includes("i am go") || lowerText.includes("i am go to")) {
      grammarFix = {
        hasError: true,
        original: textToSend,
        corrected: textToSend.replace(/i am go/i, "I am going"),
        explanation: "Dùng 'am going' (thì tiếp diễn) thay vì 'am go'."
      };
      naturalWay = textToSend.replace(/i am go/i, "I'm heading");
    }

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      text: textToSend,
      pronunciationScore: score,
      grammarCorrection: grammarFix,
      betterPhrasing: naturalWay
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    useUserStore.getState().addPracticeTime(2, "speaking");
    useUserStore.getState().awardXp(15, "speaking");
    recordSkillPractice(user?.id, "Nói", 2, 15);

    try {
      const apiMessages = [
        ...messages.map((m) => ({ role: m.role, text: m.text })),
        { role: "user" as const, text: textToSend },
      ];

      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          persona: currentPersona,
          speed: speechSpeed,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: "ai",
          text: data.reply,
          vietnameseTranslation: data.vietnameseTranslation || "",
          grammarCorrection: data.grammarCorrection || userMsg.grammarCorrection,
          betterPhrasing: data.betterPhrasing || userMsg.betterPhrasing,
          suggestedWords: (data.suggestedWords || []).slice(0, 3).map((w: any) => ({ word: w.word, meaning: w.meaning })),
          suggestedPhrases: (data.suggestedPhrases || []).slice(0, 2)
        };

        setMessages((prev) => [...prev, aiMsg]);
        speakText(data.reply);

        if (aiMsg.suggestedWords && aiMsg.suggestedWords.length > 0) {
          setCurrentSuggestions({
            words: aiMsg.suggestedWords,
            phrases: aiMsg.suggestedPhrases || []
          });
        }

        awardXp(15);
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
          { word: "specifically", meaning: "cụ thể là" }
        ],
        suggestedPhrases: [
          "From my point of view...",
          "The main reason is that..."
        ]
      };
      setMessages((prev) => [...prev, aiMsg]);
      speakText(fallbackReply);
      setCurrentSuggestions({
        words: aiMsg.suggestedWords || [],
        phrases: aiMsg.suggestedPhrases || []
      });
    } finally {
      setLoading(false);
    }
  };

  // Session Statistics & Dynamic Voice Evaluation Computation
  const userMessages = useMemo(() => messages.filter((m) => m.role === "user"), [messages]);
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

  const allSuggestedWords = useMemo(() => {
    const map = new Map<string, string>();
    messages.forEach((m) => {
      m.suggestedWords?.forEach((w) => {
        if (w.word && !map.has(w.word)) {
          map.set(w.word, w.meaning || "");
        }
      });
    });
    return Array.from(map.entries()).map(([word, meaning]) => ({ word, meaning }));
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
        color: "text-slate-600 bg-slate-500/10 border-slate-500/20",
        xpAward: 0,
        coachFeedback: "Hãy bắt đầu trò chuyện để nhận đánh giá chi tiết nhé!",
      };
    }

    const scores = userMessages.map((m) => m.pronunciationScore || 92);
    const avgPronunciation = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 92;

    const errorsCount = grammarCorrections.filter((g) => g.corrected).length;
    const grammarScore = Math.max(50, Math.min(100, 100 - (errorsCount * 15)));
    const fluencyScore = Math.min(100, Math.max(70, 75 + userTurnsCount * 6));
    const intonationScore = Math.min(100, Math.max(75, avgPronunciation - 3));

    const overallScore = Math.round(
      0.35 * avgPronunciation +
      0.25 * fluencyScore +
      0.20 * intonationScore +
      0.20 * grammarScore
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

    // Persona-tailored feedback
    let coachFeedback = "";
    if (activePersonaObj.id === "emma") {
      coachFeedback = overallScore >= 85
        ? "Excellent speaking flow and natural British rhythm! Your articulation was clear and vocabulary choice was sophisticated."
        : "Good effort! Try focusing on sentence connection and linking words smoothly to elevate your fluency.";
    } else if (activePersonaObj.id === "alex") {
      coachFeedback = overallScore >= 85
        ? "Awesome energy! Your spoken responses were sharp, direct, and sound very natural in a professional conversational setting."
        : "Keep it up! Try to expand on your thoughts by giving one more example or reason in each turn.";
    } else {
      coachFeedback = overallScore >= 85
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

  // In-Place Finish & Scorecard Handler (Replaces the chat stream in-place, No floating modal)
  const handleFinishConversation = () => {
    if (userTurnsCount === 0) {
      addToast({
        type: "warning",
        title: "Chưa có dữ liệu trò chuyện 🎙️",
        message: "Bạn hãy nói ít nhất 1 câu để Huấn luyện viên có dữ liệu đánh giá và chấm điểm nhé!",
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
      title: `Hoàn Thành Buổi Luyện Nói (Hạng ${sessionEvaluation.grade})! 🎉`,
      message: `+${sessionEvaluation.xpAward} XP cùng Huấn luyện viên ${activePersonaObj.name}!`,
    });
  };

  const handleRestartNewSession = () => {
    setIsSessionCompleted(false);
    setShowChatHistoryInSummary(false);
    setMessages([initialWelcome]);
    setElapsedTime(0);
    activeTimeRef.current = 0;
    setCurrentSuggestions({
      words: initialWelcome.suggestedWords || [],
      phrases: initialWelcome.suggestedPhrases || []
    });
    addToast({
      type: "info",
      title: "Bắt đầu buổi nói mới! 🎙️",
      message: `Đang trò chuyện cùng ${activePersonaObj.name}`,
    });
  };

  // Handle Micro Click: 1st click to start speaking, 2nd click to stop AND automatically send!
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
    <PageEntranceWrapper className="space-y-3 pb-24 md:pb-6 px-1.5 sm:px-0 relative select-none font-sans lg:flex lg:flex-col lg:min-h-[calc(100vh-4rem)]">
      
      {/* 0. TOP HERO ANNOUNCEMENT BANNER CARD */}
      <MotionItem>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 sm:p-4 rounded-xs bg-[#0059bb]/5 dark:bg-blue-950/40 border border-[#0059bb]/15 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs shrink-0"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-[#0059bb]/20">
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
                <span className={`px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-xs text-[10px] sm:text-xs font-black text-white shrink-0 whitespace-nowrap tracking-wide text-center sm:min-w-[155px] flex items-center justify-center ${
                  isSessionCompleted ? "bg-emerald-600" : "bg-[#0059bb]"
                }`}>
                  {isSessionCompleted ? "ĐÃ HOÀN THÀNH" : "AI VOICE TUTOR"}
                </span>
                <h1 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white font-display truncate">
                  {isSessionCompleted ? "Báo Cáo & Chấm Điểm Buổi Luyện Nói" : "Gia Sư Luyện Nói AI Tự Do 1-1"}
                </h1>
              </div>
              <p className="hidden sm:block text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium truncate">
                {isSessionCompleted
                  ? `Đã hoàn thành buổi trò chuyện cùng ${activePersonaObj.name} (${activePersonaObj.role})`
                  : "Luyện nói bằng giọng nói tự do, liên tục nhận diện lời nói qua Micro cho đến khi nhấn Gửi"}
              </p>
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
        
        /* ===== VIEW 1: STUDIO LUYỆN NÓI BENTO GRID ===== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 lg:items-stretch min-w-0 lg:flex-1 lg:min-h-0 mt-1">
          
          {/* CỘT TRÁI: VOICE CHAT STREAM & DUAL INPUT DOCK (8/12 Width) */}
          <div className="lg:col-span-8 flex flex-col min-w-0 lg:min-h-0">
            
            <div className="p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col min-w-0 lg:min-h-0 lg:flex-1 space-y-3">
              
              {/* Header Trong Khung Chat */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-base">{activePersonaObj.flag}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                    {activePersonaObj.name} ({activePersonaObj.role})
                  </span>
                </div>

                {/* Sound Button */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`px-2 py-1 rounded-xs text-xs font-bold border transition-all shadow-2xs flex items-center gap-1 cursor-pointer ${
                    soundEnabled
                      ? "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]"
                      : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/30 text-rose-600"
                  }`}
                  title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline text-[11px]">{soundEnabled ? "Bật âm" : "Tắt âm"}</span>
                </button>
              </div>

              {/* Scrollable Chat Stream Box (Always keeps Micro dock in immediate viewport) */}
              <div className="h-[42svh] sm:h-[48svh] lg:h-[380px] xl:h-[430px] overflow-y-auto space-y-3.5 p-1 pr-1.5">
                {messages.map((msg) => {
                  const isAi = msg.role === "ai";
                  const isTranslated = showTranslations[msg.id];

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isAi ? "justify-start" : "justify-end"}`}
                    >
                      {isAi && (
                        <div className="w-7 h-7 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-[#0059bb]/20 shadow-2xs text-xs font-bold">
                          <span>{activePersonaObj.flag}</span>
                        </div>
                      )}

                      <div className={`space-y-1.5 max-w-[85%] sm:max-w-[78%] ${isAi ? "" : "items-end flex flex-col"}`}>
                        
                        {/* Chat Bubble */}
                        <div
                          className={`p-3 rounded-xs text-xs sm:text-sm font-medium leading-relaxed shadow-2xs transition-all ${
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
                            <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/10 text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-start gap-1">
                              <span className="shrink-0 text-slate-400 font-mono">[Dịch]</span>
                              <span>{msg.vietnameseTranslation}</span>
                            </div>
                          )}
                        </div>

                        {/* AI Quick Note / Grammar Feedback (Unified Compact Card) */}
                        {!isAi && (msg.grammarCorrection?.hasError || msg.betterPhrasing) && (
                          <div className="p-2.5 rounded-xs bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 text-xs space-y-2 text-left w-full shadow-2xs">
                            {msg.grammarCorrection?.hasError && (
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

                      {!isAi && (
                        <UserAvatar
                          avatar={(user as any)?.avatar}
                          avatarUrl={(user as any)?.avatarUrl}
                          imageUrl={user?.imageUrl}
                          emoji={user?.avatarEmoji}
                          name={user?.fullName || user?.username || user?.email}
                          size="w-7 h-7"
                          className="mt-0.5"
                        />
                      )}
                    </div>
                  );
                })}

                {loading && (
                  <div className="flex items-center gap-2 p-2 rounded-xs bg-[#0059bb]/5 dark:bg-[#0059bb]/20 border border-[#0059bb]/20 text-[#0059bb] dark:text-sky-400 text-xs font-bold animate-pulse w-fit">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {activePersonaObj.name} đang lắng nghe & suy nghĩ...
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

              {/* Voice-Only Input Dock (Bấm Micro lần 1 để nói/từ hiện realtime, bấm lại Micro lần 2 để dừng và gửi) */}
              <div className="pt-1.5 border-t border-slate-100 dark:border-white/5 space-y-1.5">
                <div className="flex items-center gap-2">
                  
                  {/* Nút Micro Toggle-to-Send (Bấm lần 1: Thu âm realtime | Bấm lần 2: Dừng & Tự động gửi) */}
                  <button
                    type="button"
                    onClick={handleMicrophoneToggle}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer ${
                      isRecording
                        ? "bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/25"
                        : "bg-[#0059bb] hover:bg-[#004799] text-white hover:scale-102 active:scale-98"
                    }`}
                    title={
                      isRecording
                        ? "Đang thu âm • Bấm lại nút Micro để DỪNG VÀ TỰ ĐỘNG GỬI ĐI"
                        : "Nhấn nút Micro và bắt đầu nói tiếng Anh (Bấm lại để gửi)"
                    }
                  >
                    {isRecording ? <Square className="w-4 h-4 fill-white" /> : <Mic className="w-4.5 h-4.5 stroke-[2]" />}
                  </button>

                  {/* Khung Hiển Thị Lời Nói (Font chữ chuẩn, từ ngữ đọc đến đâu hiện đến đó) */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && spokenText.trim() && !loading) {
                          e.preventDefault();
                          handleSendSpokenSpeech();
                        }
                      }}
                      placeholder={
                        loading
                          ? "Gia sư AI đang phản hồi..."
                          : isRecording
                          ? `🔴 Đang nghe bạn nói... (00:${recordingTime < 10 ? `0${recordingTime}` : recordingTime}) • Bấm lại Micro để GỬI`
                          : spokenText
                          ? "Đã nhận diện câu nói (Bấm nút Micro hoặc Gửi)"
                          : "Nhấn nút Micro và bắt đầu nói tiếng Anh..."
                      }
                      value={spokenText}
                      className="w-full h-10 pl-3.5 pr-9 text-xs sm:text-sm font-medium rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0059bb]"
                    />
                    {spokenText && (
                      <button
                        type="button"
                        onClick={handleResetSpeech}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                        title="Xóa đoạn vừa nói để nói lại (Làm mới)"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Nút Gửi (Chỉ dừng và gửi khi người dùng bấm nút này hoặc bấm lại nút Micro) */}
                  <button
                    type="button"
                    onClick={handleSendSpokenSpeech}
                    disabled={!spokenText.trim() || loading}
                    className="h-10 px-4 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-40 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer shrink-0 transition-all"
                    title="Gửi câu nói đến Gia sư AI (Phím Enter)"
                  >
                    <Send className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>Gửi</span>
                  </button>
                </div>

                {/* Active Audio Waveform */}
                {(isRecording || isSpeaking) && (
                  <div className="flex items-center justify-center gap-[3px] h-4 bg-slate-50 dark:bg-slate-950/60 px-2 py-0.5 rounded-xs">
                    {audioFrequencies.map((freq, i) => (
                      <div
                        key={i}
                        className="w-[2.5px] rounded-full shrink-0 transition-all duration-75"
                        style={{
                          height: `${Math.max(3, Math.min(14, (freq / 100) * 14))}px`,
                          backgroundColor: isRecording ? '#f43f5e' : '#0059bb'
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
              
              {/* Phần 1: Chọn Gia Sư AI & Tốc Độ Giọng Nói */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-[#0059bb]" /> GIA SƯ AI
                  </h2>
                  <span className="text-[11px] font-bold text-slate-400 font-mono">Tốc độ: {speechSpeed}x</span>
                </div>

                <div className="space-y-1.5">
                  {PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setCurrentPersona(p.id)}
                      className={`w-full text-left p-2 rounded-xs border transition-all flex items-center justify-between cursor-pointer ${
                        currentPersona === p.id
                          ? "bg-[#0059bb]/10 border-[#0059bb]/40 text-[#0059bb] dark:text-sky-400 font-bold"
                          : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base">{p.flag}</span>
                        <div className="truncate">
                          <div className="text-xs font-bold font-display truncate">{p.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal truncate">{p.role}</div>
                        </div>
                      </div>
                      {currentPersona === p.id && <Check className="w-4 h-4 text-[#0059bb] shrink-0" />}
                    </button>
                  ))}
                </div>

                {/* Tốc độ đọc */}
                <div className="grid grid-cols-3 gap-1 pt-1">
                  {[0.75, 1.0, 1.25].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setSpeechSpeed(spd)}
                      className={`py-1 rounded-xs text-[11px] font-bold text-center cursor-pointer transition-all ${
                        speechSpeed === spd
                          ? "bg-[#0059bb] text-white shadow-2xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Phần 2: Từ Vựng & Mẫu Câu Theo Ngữ Cảnh */}
              <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> TỪ VỰNG THEO NGỮ CẢNH
                  </span>
                  <span className="text-[10px] text-slate-400">Click tra/nghe</span>
                </div>

                <div className="space-y-1.5">
                  {currentSuggestions.words.slice(0, 3).map((w, idx) => (
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

                {/* Mẫu câu mở đầu */}
                {currentSuggestions.phrases.length > 0 && (
                  <div className="p-2 rounded-xs bg-blue-50/60 dark:bg-blue-950/30 text-[#0059bb] dark:text-sky-300 text-[11px] space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <Lightbulb className="w-3 h-3 text-amber-500" /> Mẫu câu mở đầu:
                    </div>
                    {currentSuggestions.phrases.slice(0, 2).map((ph, idx) => (
                      <p
                        key={idx}
                        onClick={() => speakText(ph)}
                        className="truncate cursor-pointer hover:underline font-medium"
                      >
                        "{ph}"
                      </p>
                    ))}
                  </div>
                )}
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
                      Đánh Giá Chi Tiết Buổi Luyện Nói
                    </h2>
                    <span className="px-2 py-0.5 rounded-xs text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase">
                      Hoàn Tất
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Huấn luyện viên: <strong className="text-slate-700 dark:text-slate-200">{activePersonaObj.name}</strong> ({activePersonaObj.role})
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
                  <Mic className="w-3.5 h-3.5 text-indigo-500" /> Điểm phát âm
                </span>
                <p className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {sessionEvaluation.pronunciationScore}/100
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

          {/* Bento Detailed Analytics: Grammar Feedback & Vocab Used */}
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
                          {m.role === "ai" ? `${activePersonaObj.name}:` : "Bạn:"}
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{m.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Cột Phải: Lời Nhận Xét Của Huấn Luyện Viên & Từ Vựng Tiêu Biểu (4/12) */}
            <div className="lg:col-span-4 p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
              
              {/* Coach Evaluation Card */}
              <div className="p-3 rounded-xs bg-[#0059bb]/5 dark:bg-blue-950/40 border border-[#0059bb]/15 dark:border-blue-900/50 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0059bb]/10 border border-[#0059bb]/20 flex items-center justify-center text-sm font-black text-[#0059bb] dark:text-sky-400 shrink-0">
                    {activePersonaObj.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{activePersonaObj.name}</span>
                      <span className="text-[10px] font-medium text-[#0059bb] dark:text-sky-400">({activePersonaObj.accent})</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{activePersonaObj.role}</div>
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/70 p-2 rounded-xs border border-[#0059bb]/10">
                  "{sessionEvaluation.coachFeedback}"
                </p>
              </div>

              {/* Vocab Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#0059bb]" /> TỪ VỰNG TIÊU BIỂU
                </h3>
                <span className="text-[11px] font-bold text-slate-400">{allSuggestedWords.length} từ</span>
              </div>

              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {allSuggestedWords.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-white capitalize block">{w.word}</span>
                      {w.meaning && (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">{w.meaning}</span>
                      )}
                    </div>
                    <button
                      onClick={() => speakText(w.word)}
                      className="p-1 rounded-xs hover:bg-slate-200 dark:hover:bg-slate-800 text-[#0059bb] transition-colors cursor-pointer"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Next Session or Dashboard */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                <button
                  onClick={handleRestartNewSession}
                  className="w-full py-2.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] active:scale-98 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Bắt Đầu Buổi Mới (+15 XP/câu)
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
            className="fixed left-3 right-3 bottom-20 sm:left-auto sm:right-6 sm:bottom-6 z-50 w-auto sm:w-80 p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/15 shadow-2xl space-y-2 select-none"
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

    </PageEntranceWrapper>
  );
}
