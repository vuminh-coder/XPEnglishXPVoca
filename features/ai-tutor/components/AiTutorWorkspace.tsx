"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import { useAiSessionStore, getInitialTutorSessionProbe } from "@/stores/aiSessionStore";
import { motion, AnimatePresence } from "framer-motion";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { lookupWordDeep } from "@/features/vocabulary/data/deepDictionary";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { AiSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

import {
  Mic,
  Volume2,
  Sparkles,
  CheckCircle2,
  Clock,
  Shuffle,
  Bot,
  Square,
  Send,
  BookMarked,
  Bookmark,
  X,
  BookmarkCheck,
  MessageSquare,
  Award,
  Lightbulb,
  Check,
  RotateCcw,
  History,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

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

function ensureUniqueMessageIds(msgs: ChatMessage[]): ChatMessage[] {
  const seenIds = new Set<string>();
  return msgs.map((m, index) => {
    let id = m.id;
    if (!id || seenIds.has(id)) {
      id = `${m.role || "msg"}_${Date.now()}_${index}_${Math.random().toString(36).slice(2, 7)}`;
    }
    seenIds.add(id);
    return id === m.id ? m : { ...m, id };
  });
}

export default function AiTutorWorkspace() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { setSidebarCollapsed } = useUiStore();

  // Session ID for current practice turn (Frame 0 Probe)
  const [sessionId, setSessionId] = useState<string>(() => {
    const probe = getInitialTutorSessionProbe();
    return probe?.sessionId || `ai_tutor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  });
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [pastSessions, setPastSessions] = useState<any[]>([]);
  const [selectedPastSession, setSelectedPastSession] = useState<any | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Persona & Voice Settings (Frame 0 Probe)
  const [currentPersona, setCurrentPersona] = useState<"emma" | "alex" | "chloe">(() => {
    const probe = getInitialTutorSessionProbe();
    if (probe?.personaId) return probe.personaId;
    if (typeof window !== "undefined") {
      const savedPersona = localStorage.getItem("xp_voca_ai_tutor_persona");
      if (savedPersona === "emma" || savedPersona === "alex" || savedPersona === "chloe") {
        return savedPersona;
      }
    }
    return "emma";
  });
  const [speechSpeed, setSpeechSpeed] = useState<number>(() => {
    const probe = getInitialTutorSessionProbe();
    if (probe?.speechSpeed) return probe.speechSpeed;
    if (typeof window !== "undefined") {
      const savedSpeed = localStorage.getItem("xp_voca_ai_tutor_speed");
      if (savedSpeed) {
        const num = parseFloat(savedSpeed);
        if (!isNaN(num) && num >= 0.5 && num <= 2.0) return num;
      }
    }
    return 1.0;
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const probe = getInitialTutorSessionProbe();
    return probe?.soundEnabled ?? true;
  });

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

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const probe = getInitialTutorSessionProbe();
    if (probe?.messages && probe.messages.length > 0) {
      return ensureUniqueMessageIds(probe.messages as ChatMessage[]);
    }
    return [initialWelcome];
  });

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

  // Active turn suggestions (Frame 0 Probe)
  const [currentSuggestions, setCurrentSuggestions] = useState<{
    words: SuggestedWord[];
    phrases: string[];
  }>(() => {
    const probe = getInitialTutorSessionProbe();
    if (probe?.currentSuggestions && (probe.currentSuggestions.words?.length || probe.currentSuggestions.phrases?.length)) {
      return probe.currentSuggestions as { words: SuggestedWord[]; phrases: string[] };
    }
    return {
      words: initialWelcome.suggestedWords || [],
      phrases: initialWelcome.suggestedPhrases || [],
    };
  });

  // Selected word modal state for 1-Click Interactive Deep Dictionary
  const [selectedWordData, setSelectedWordData] = useState<{
    word: string;
    ipa?: string;
    meaning?: string;
    example?: string;
  } | null>(null);

  // In-Place Completion & Scorecard State
  const [isSessionCompleted, setIsSessionCompleted] = useState(() => {
    const probe = getInitialTutorSessionProbe();
    return probe?.isSessionCompleted ?? false;
  });
  const [showChatHistoryInSummary, setShowChatHistoryInSummary] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  // Practice timer state (Frame 0 Probe)
  const [elapsedTime, setElapsedTime] = useState(() => {
    const probe = getInitialTutorSessionProbe();
    return probe?.elapsedTime ?? 0;
  });

  // Refs to avoid stale closures in syncActiveSessionToDb
  const sessionIdRef = useRef(sessionId);
  const elapsedTimeRef = useRef(elapsedTime);
  const currentPersonaRef = useRef(currentPersona);
  const hasUserInteractedRef = useRef(false);
  const msgCounterRef = useRef(0);
  const generateMsgId = (prefix: "user" | "ai") =>
    `${prefix}_${Date.now()}_${msgCounterRef.current++}_${Math.random().toString(36).slice(2, 7)}`;
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

  useEffect(() => { sessionIdRef.current = sessionId; }, [sessionId]);
  useEffect(() => { elapsedTimeRef.current = elapsedTime; }, [elapsedTime]);
  useEffect(() => { currentPersonaRef.current = currentPersona; }, [currentPersona]);

  // Helper to sync in-progress session to DB & LocalStorage immediately
  const syncActiveSessionToDb = useCallback((newMessages: ChatMessage[], newElapsed?: number) => {
    const elapsed = newElapsed ?? elapsedTimeRef.current;
    const sid = sessionIdRef.current;
    const persona = currentPersonaRef.current;

    // Realtime RAM store sync
    useAiSessionStore.getState().setTutorSession({
      sessionId: sid,
      personaId: persona,
      messages: newMessages,
      elapsedTime: elapsed,
    });

    try {
      localStorage.setItem(
        "xp_active_tutor_session",
        JSON.stringify({
          sessionId: sid,
          personaId: persona,
          messages: newMessages,
          elapsedTime: elapsed,
          savedAt: Date.now(),
        })
      );
    } catch {}

    fetch("/api/ai/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sid,
        mode: "tutor",
        personaId: persona,
        messages: newMessages,
        timeSpentSeconds: elapsed,
        status: "IN_PROGRESS",
      }),
    }).catch(() => {});
  }, []);

  // Auto collapse sidebar when entering AI Tutor
  useEffect(() => {
    setSidebarCollapsed(true);
    return () => {
      setSidebarCollapsed(false);
    };
  }, [setSidebarCollapsed]);

  // Hydrate persona and speed settings from localStorage
  /* eslint-disable react-hooks/set-state-in-effect -- Hydrating UI state from localStorage on mount */
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
  /* eslint-enable react-hooks/set-state-in-effect */

  // Hydrate active session from Database & LocalStorage on initial load
  /* eslint-disable react-hooks/set-state-in-effect -- Hydrating session state from localStorage/DB on mount */
  useEffect(() => {
    // 1. Immediate zero-latency fallback check
    const ramMessages = useAiSessionStore.getState().tutorSession?.messages;
    if (!ramMessages || ramMessages.length <= 1) {
      try {
        const localStr = localStorage.getItem("xp_active_tutor_session");
        if (localStr) {
          const parsed = JSON.parse(localStr);
          if (parsed.sessionId && Array.isArray(parsed.messages) && parsed.messages.length > 1) {
            setSessionId(parsed.sessionId);
            setMessages(ensureUniqueMessageIds(parsed.messages));
            if (parsed.personaId === "emma" || parsed.personaId === "alex" || parsed.personaId === "chloe") {
              setCurrentPersona(parsed.personaId);
            }
            if (typeof parsed.elapsedTime === "number") {
              setElapsedTime(parsed.elapsedTime);
            }
          }
        }
      } catch {}
    }

    // 2. Authoritative sync from backend
    fetch("/api/ai/sessions?mode=tutor&status=active")
      .then((res) => res.json())
      .then((data) => {
        // Don't overwrite if user has already started interacting
        if (hasUserInteractedRef.current) return;

        if (
          data.success &&
          data.activeSession &&
          Array.isArray(data.activeSession.messages) &&
          data.activeSession.messages.length > 1 &&
          data.activeSession.messages.some((m: any) => m.role === "user")
        ) {
          const act = data.activeSession;
          const currentCount = useAiSessionStore.getState().tutorSession?.messages?.length || 0;
          if (act.messages.length > currentCount) {
            setSessionId(act.sessionId);
            setMessages(ensureUniqueMessageIds(act.messages));
            if (act.personaId === "emma" || act.personaId === "alex" || act.personaId === "chloe") {
              setCurrentPersona(act.personaId);
            }
            if (typeof act.timeSpentSeconds === "number") {
              setElapsedTime(act.timeSpentSeconds);
            }
            const lastAi = [...act.messages].reverse().find((m: any) => m.role === "ai");
            if (lastAi?.suggestedWords?.length || lastAi?.suggestedPhrases?.length) {
              setCurrentSuggestions({
                words: lastAi.suggestedWords || [],
                phrases: lastAi.suggestedPhrases || [],
              });
            }
            useAiSessionStore.getState().setTutorSession({
              sessionId: act.sessionId,
              personaId: act.personaId,
              messages: act.messages,
              elapsedTime: act.timeSpentSeconds,
            });
            addToast({
              type: "info",
              title: "Khôi phục buổi trò chuyện ✨",
              message: "Đã tải lại toàn bộ kịch bản luyện nói dở dang của bạn.",
            });
          }
        }
      })
      .catch((err) => console.warn("[AiTutor] Active session hydration notice:", err));
  }, [addToast]);
  /* eslint-enable react-hooks/set-state-in-effect */

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

  const handleSelectPersona = (id: "emma" | "alex" | "chloe") => {
    setCurrentPersona(id);
    useAiSessionStore.getState().setTutorSession({ personaId: id });
    try {
      localStorage.setItem("xp_voca_ai_tutor_persona", id);
    } catch {}
  };

  const handleSelectSpeed = (spd: number) => {
    setSpeechSpeed(spd);
    useAiSessionStore.getState().setTutorSession({ speechSpeed: spd });
    try {
      localStorage.setItem("xp_voca_ai_tutor_speed", String(spd));
    } catch {}
  };

  // Real-time backend practice time tracker
  useStudyTimeTracker("speaking", {
    activeCondition: !isSessionCompleted,
  });

  // Auto-track study time
  useEffect(() => {
    if (isSessionCompleted) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        const next = prev + 1;
        useAiSessionStore.getState().setTutorSession({ elapsedTime: next });
        return next;
      });
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

  const speakText = (
    text: string,
    customSpeed?: number,
    targetPersona?: Persona
  ) => {
    if (!soundEnabled || !text) return;
    const persona = targetPersona || activePersonaObj;
    setIsSpeaking(true);
    speakLessonText(text, {
      lessonId: `ai_tutor_${persona.id}`,
      speakerIndex: persona.speakerIndex,
      accent: persona.accent,
      rate: customSpeed || speechSpeed,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleCycleNextPersona = () => {
    const personaIds: ("emma" | "alex" | "chloe")[] = ["emma", "alex", "chloe"];
    const currentIndex = personaIds.indexOf(currentPersona);
    const nextIndex = (currentIndex + 1) % personaIds.length;
    const nextId = personaIds[nextIndex];
    handleSelectPersona(nextId);

    const nextPersona = PERSONAS.find((p) => p.id === nextId);
    if (nextPersona) {
      addToast({
        type: "info",
        title: `Đổi giọng: ${nextPersona.name} (${nextPersona.countryName} ${nextPersona.flag})`,
        message: `${nextPersona.role} • Giọng chuẩn ${nextPersona.accent}`,
      });
      if (soundEnabled) {
        speakText(
          `Hello! I'm ${nextPersona.name}. Let's practice English together!`,
          speechSpeed,
          nextPersona
        );
      }
    }
  };

  // 1-Click Interactive Dictionary with lookupWordDeep
  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!cleanWord || cleanWord.length < 2) return;

    speakText(cleanWord);

    const deepDef = lookupWordDeep(cleanWord);
    const cleanMeaning = (deepDef.meaning || `Nghĩa Tiếng Việt của từ "${cleanWord}"`)
      .replace(/\s*\([^)]*\)/g, "")
      .trim();
    const cleanIpa = (deepDef.ipa || `/${cleanWord}/`).replace(/[()]/g, "").trim();
    setSelectedWordData({
      word: cleanWord,
      ipa: cleanIpa,
      meaning: cleanMeaning,
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
        } catch {}
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
          } catch {
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
      } catch {}
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

    const userMsgId = generateMsgId("user");
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: "user",
      text: textToSend,
      pronunciationScore: 90 + (textToSend.length % 8),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    hasUserInteractedRef.current = true; // BUG #5 FIX: Mark user has interacted
    syncActiveSessionToDb(updatedMessages);
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

      let currentList = updatedMessages;
      if (data.grammarCorrection || data.betterPhrasing) {
        currentList = currentList.map((m) =>
          m.id === userMsgId
            ? {
                ...m,
                grammarCorrection: data.grammarCorrection,
                betterPhrasing: data.betterPhrasing,
              }
            : m
        );
        setMessages(currentList);
      }

      if (data.reply) {
        const aiMsg: ChatMessage = {
          id: generateMsgId("ai"),
          role: "ai",
          text: data.reply,
          vietnameseTranslation: data.vietnameseTranslation,
          suggestedWords: (data.suggestedWords || []).slice(0, 3),
          suggestedPhrases: (data.suggestedPhrases || []).slice(0, 2),
        };

        const finalMessages = [...currentList, aiMsg];
        setMessages(finalMessages);
        syncActiveSessionToDb(finalMessages);
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
        id: generateMsgId("ai"),
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
      const fallbackMessages = [...updatedMessages, aiMsg];
      setMessages(fallbackMessages);
      syncActiveSessionToDb(fallbackMessages);
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

  // Aggregate all suggested words across all messages for potential future use
  // const allSuggestedWords = useMemo(() => {
  //   const map = new Map<string, string>();
  //   messages.forEach((m) => {
  //     m.suggestedWords?.forEach((w) => {
  //       if (w.word && !map.has(w.word)) {
  //         map.set(w.word, w.meaning || "");
  //       }
  //     });
  //   });
  //   return Array.from(map.entries()).map(([word, meaning]) => ({ word, meaning }));
  // }, [messages]);

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
    if (currentPersona === "emma") {
      coachFeedback =
        overallScore >= 85
          ? "Excellent speaking flow and natural British rhythm! Your articulation was clear and vocabulary choice was sophisticated."
          : "Good effort! Try focusing on sentence connection and linking words smoothly to elevate your fluency.";
    } else if (currentPersona === "alex") {
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
  }, [userTurnsCount, userMessages, grammarCorrections, currentPersona]);

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
      try {
        localStorage.removeItem("xp_active_tutor_session");
      } catch {}

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
    // Clean up previous active session from database & localStorage
    useAiSessionStore.getState().resetTutorSession();
    try {
      localStorage.removeItem("xp_active_tutor_session");
    } catch {}

    fetch(`/api/ai/sessions?sessionId=${sessionId}`, { method: "DELETE" }).catch(() => {});

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
    <div className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
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
        customMobileSearchReplacement={
          <button
            type="button"
            onClick={handleOpenHistoryDrawer}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full sm:rounded-xl bg-transparent sm:bg-slate-100/90 hover:bg-transparent sm:hover:bg-slate-200/90 dark:bg-transparent dark:sm:bg-slate-800/90 dark:sm:hover:bg-slate-700/90 text-slate-800 dark:text-slate-200 border-0 sm:border sm:border-slate-200/60 dark:border-0 dark:sm:border-slate-700/60 shadow-none sm:shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0"
            title="Lịch sử buổi học"
            aria-label="Lịch sử buổi học"
          >
            <History className="w-5 h-5 sm:w-4.5 sm:h-4.5 stroke-[2.2] sm:stroke-[2]" />
          </button>
        }
      >
        <AiSuiteNavTabs />
      </AppTopHeader>

      {/* 2. MAIN DASHBOARD-STYLE VIEWPORT CANVAS (FITS IN 1 SCREEN ON DESKTOP & DOCKED ABOVE BOTTOMNAV ON MOBILE) */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-2 sm:px-5 lg:px-6 pt-1.5 sm:pt-3 lg:pt-3 pb-[50px] lg:pb-3 flex flex-col min-h-0 overflow-hidden space-y-1.5 sm:space-y-3">
        {/* 2.1. SLIM HERO STATUS STRIP (DASHBOARD BENTO STYLE - HIDDEN ON MOBILE, VISIBLE ON DESKTOP) */}
        <div className="hidden lg:flex p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => setShowVoiceModal(true)}
              className="shrink-0 relative cursor-pointer group"
              title="Nhấp để đổi giọng nói / huấn luyện viên AI"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 group-hover:bg-blue-100 dark:bg-blue-950/60 dark:group-hover:bg-blue-900/50 border border-blue-200/80 dark:border-blue-800/50 flex items-center justify-center text-xs font-black text-[#0059bb] dark:text-sky-400 shadow-2xs font-mono transition-colors">
                <span>{activePersonaObj.countryCode}</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  {isSessionCompleted
                    ? "Báo Cáo Buổi Luyện Nói"
                    : `Đang trò chuyện cùng ${activePersonaObj.name}`}
                </span>
                <button
                  type="button"
                  onClick={() => setShowVoiceModal(true)}
                  className="px-2.5 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:group-hover:bg-blue-900/50 text-[#0059bb] dark:text-sky-300 text-xs font-bold font-mono border border-blue-200/60 dark:border-blue-800/40 shadow-2xs flex items-center gap-1 cursor-pointer transition-all"
                  title="Nhấp để đổi giọng nói / huấn luyện viên AI"
                >
                  <span>{activePersonaObj.role}</span>
                  <ChevronDown className="w-3 h-3 text-[#0059bb] dark:text-sky-400" />
                </button>
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                {isSessionCompleted
                  ? `Đã hoàn thành buổi đánh giá cùng ${activePersonaObj.name} (${activePersonaObj.accent})`
                  : "Nói tự do bằng Micro • Bấm Micro lần 1 để nói, bấm lại lần 2 để gửi tự động"}
              </p>
            </div>
          </div>
        </div>

        {/* 2.2. MAIN BENTO GRID: FITS STRICTLY IN DESKTOP VIEWPORT */}
        {!isSessionCompleted ? (
          /* ===== VIEW 1: STUDIO BENTO GRID (8/12 - 4/12) ===== */
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-3.5 items-stretch min-w-0 overflow-hidden">
            {/* CỘT TRÁI: VOICE CHAT STREAM & INPUT DOCK (8/12) */}
            <div className="lg:col-span-8 flex flex-col min-w-0 h-full min-h-0 overflow-hidden">
              <div className="p-2 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col min-w-0 flex-1 h-full min-h-0 space-y-1.5 sm:space-y-2.5 overflow-hidden">
                {/* Header Trong Khung Chat */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowVoiceModal(true)}
                    className="flex items-center gap-2 min-w-0 text-left hover:opacity-85 transition-opacity cursor-pointer group"
                    title="Nhấp để đổi giọng nói / huấn luyện viên AI"
                  >
                    <span className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold text-xs font-mono border border-blue-200/60 dark:border-blue-800/40 flex items-center justify-center shrink-0">
                      {activePersonaObj.countryCode}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                      {activePersonaObj.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0059bb] transition-colors shrink-0" />
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* 1. Thời Gian Luyện Nói (Luôn hiện trên mobile < lg, desktop đã có ở AppTopHeader) */}
                    <span className="lg:hidden h-7 px-2 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-xs font-bold font-mono tabular-nums flex items-center gap-1 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>{formatElapsedTime(elapsedTime)}</span>
                    </span>

                    {/* 2. Nút Chấm Bài / Buổi Mới (Luôn hiện trên mobile < lg, desktop đã có ở AppTopHeader) */}
                    <div className="lg:hidden shrink-0">
                      {isSessionCompleted ? (
                        <button
                          type="button"
                          onClick={handleRestartNewSession}
                          className="h-7 w-7 sm:w-auto sm:px-2.5 rounded-md bg-[#0059bb] hover:bg-[#004899] text-white border border-[#0059bb] text-xs font-bold flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer"
                          title="Bắt đầu buổi luyện mới"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Buổi mới</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleFinishConversation}
                          className="h-7 w-7 sm:w-auto sm:px-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 text-xs font-bold flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer"
                          title="Hoàn thành và chấm điểm buổi nói"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2]" />
                          <span className="hidden sm:inline">Chấm điểm</span>
                        </button>
                      )}
                    </div>

                    {/* 3. Nút Đổi Giọng Nói: 1-Chạm Đổi Ngay Luân Phiên (Emma -> Alex -> Chloe) */}
                    <button
                      type="button"
                      onClick={handleCycleNextPersona}
                      className="h-7 w-7 sm:w-auto sm:px-2.5 rounded-md text-xs font-bold border border-blue-200/80 dark:border-blue-800/50 bg-blue-50/80 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer active:scale-95 shrink-0"
                      title={`Đang là ${activePersonaObj.name} (${activePersonaObj.countryName}) • Bấm để đổi ngay sang giọng tiếp theo`}
                    >
                      <Shuffle className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                      <span className="hidden sm:inline">Đổi giọng</span>
                    </button>
                  </div>
                </div>

                {/* Scrollable Chat Stream Box */}
                <div className="flex-1 min-h-0 overflow-y-auto space-y-2.5 sm:space-y-3 p-1 pr-1.5 scrollbar-thin overscroll-contain">
                  {messages.map((msg, idx) => {
                    const isAi = msg.role === "ai";
                    const isTranslated = showTranslations[msg.id];

                    return (
                      <div
                        key={`${msg.id || "msg"}_${idx}`}
                        className={`flex items-start gap-2.5 ${
                          isAi ? "justify-start" : "justify-end"
                        }`}
                      >
                        {isAi && (
                          <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/80 dark:border-blue-800/50 shadow-2xs text-xs font-mono font-bold">
                            <span>{activePersonaObj.countryCode}</span>
                          </div>
                        )}

                        <div
                          className={`space-y-1.5 max-w-[92%] sm:max-w-[85%] ${
                            isAi ? "w-fit" : "items-end flex flex-col ml-auto w-fit"
                          }`}
                        >
                          {/* Chat Bubble with Asymmetrical Speech Tail Shape */}
                          <div
                            className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-xs transition-all w-fit ${
                              isAi
                                ? "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white rounded-tl-xs"
                                : "bg-gradient-to-r from-[#0059bb] to-blue-600 text-white shadow-xs rounded-tr-xs"
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
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-bold w-fit shadow-2xs">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span>{activePersonaObj.name} đang suy nghĩ phản hồi...</span>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Dải Gợi Ý Thuần Chữ (Shrink-0) */}
                {(currentSuggestions.words.length > 0 ||
                  currentSuggestions.phrases.length > 0) && (
                  <div className="pt-2 pb-0.5 border-t border-slate-100 dark:border-slate-800 shrink-0 min-w-0">
                    {/* BẢN DESKTOP (lg:flex): Giữ nguyên vẹn 100% bố cục dòng linh hoạt */}
                    <div className="hidden lg:flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 flex-wrap">
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

                    {/* BẢN MOBILE (< lg): Đúng 2 dòng, lướt ngang mượt mà nếu độ dài vượt quá width điện thoại */}
                    <div className="lg:hidden flex flex-col gap-1 text-xs text-slate-700 dark:text-slate-300 min-w-0">
                      {currentSuggestions.words.length > 0 ? (
                        <>
                          {/* Dòng 1: Gợi ý + Từ vựng (lướt ngang nếu dài hơn màn hình) */}
                          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap min-w-0 pr-1 py-0.5">
                            <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider flex items-center gap-1 shrink-0 select-none">
                              <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> Gợi ý:
                            </span>

                            {currentSuggestions.words.slice(0, 3).map((w, idx) => (
                              <React.Fragment key={`mob_w_${idx}`}>
                                {idx > 0 && (
                                  <span className="text-slate-300 dark:text-slate-600 select-none shrink-0">
                                    •
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => speakText(w.word)}
                                  className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-400 active:opacity-70 cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors shrink-0"
                                >
                                  {w.word}
                                </button>
                              </React.Fragment>
                            ))}
                          </div>

                          {/* Dòng 2: Mẫu câu mở đầu (lướt ngang nếu dài hơn màn hình) */}
                          {currentSuggestions.phrases.length > 0 && (
                            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap min-w-0 pr-1 py-0.5">
                              {currentSuggestions.phrases.slice(0, 2).map((phrase, idx) => (
                                <React.Fragment key={`mob_p_${idx}`}>
                                  {idx > 0 && (
                                    <span className="text-slate-300 dark:text-slate-600 select-none shrink-0">
                                      •
                                    </span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => speakText(phrase)}
                                    className="text-xs text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 active:opacity-70 font-semibold cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors shrink-0"
                                  >
                                    "{phrase}"
                                  </button>
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        /* Trường hợp không có words, chỉ có phrases */
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap min-w-0 pr-1 py-0.5">
                          <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider flex items-center gap-1 shrink-0 select-none">
                            <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> Gợi ý:
                          </span>
                          {currentSuggestions.phrases.slice(0, 2).map((phrase, idx) => (
                            <React.Fragment key={`mob_p_only_${idx}`}>
                              {idx > 0 && (
                                <span className="text-slate-300 dark:text-slate-600 select-none shrink-0">
                                  •
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => speakText(phrase)}
                                className="text-xs text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 active:opacity-70 font-semibold cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors shrink-0"
                              >
                                "{phrase}"
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Voice Input Dock (Pinned to bottom of left card) */}
                <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                  <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                    {/* Nút Micro Toggle-to-Send */}
                    <button
                      type="button"
                      onClick={handleMicrophoneToggle}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                        isRecording
                          ? "bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/25 shadow-md"
                          : spokenText.trim()
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-xs"
                          : "bg-[#0059bb] hover:bg-[#004899] text-white hover:scale-105 active:scale-95 shadow-md"
                      }`}
                      title={
                        isRecording
                          ? "Đang thu âm • Bấm lại nút Micro để DỪNG VÀ TỰ ĐỘNG GỬI ĐI"
                          : spokenText.trim()
                          ? "Bấm để thu âm bổ sung"
                          : "Nhấn nút Micro và bắt đầu nói tiếng Anh"
                      }
                    >
                      {isRecording ? (
                        <Square className="w-4 h-4 fill-white" />
                      ) : (
                        <Mic className="w-4.5 h-4.5 stroke-[2]" />
                      )}
                    </button>

                    {/* Khung Hiển Thị & Nhập Liệu Lời Nói */}
                    <div className="relative flex-1">
                      <input
                        type="text"
                        readOnly={isRecording}
                        onChange={(e) => setSpokenText(e.target.value)}
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
                            ? "Đã có nội dung (Có thể gõ phím chỉnh sửa hoặc bấm Gửi)"
                            : "Nói qua Micro hoặc gõ tiếng Anh tại đây (Enter để gửi)..."
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
                      className={`h-9 px-3.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs shrink-0 transition-all ${
                        spokenText.trim() && !loading
                          ? "bg-[#0059bb] hover:bg-[#004899] text-white shadow-md active:scale-95 cursor-pointer"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-40 cursor-not-allowed"
                      }`}
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
            <div className="hidden lg:flex lg:col-span-4 flex-col min-w-0 lg:h-full lg:min-h-0">
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
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 border ${
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
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-blue-800 flex items-center justify-center text-xs font-black text-[#0059bb] dark:text-sky-400 shrink-0 shadow-2xs font-mono">
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

      {/* 2.9. MODAL CHỌN GIỌNG NÓI & HUẤN LUYỆN VIÊN AI (VOICE & SPEED PICKER MODAL) */}
      <AnimatePresence>
        {showVoiceModal && (
          <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-4 sm:p-5 pb-8 sm:pb-5 space-y-4 max-h-[85vh] overflow-y-auto select-none"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/40">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                      Đổi Giọng Nói & Huấn Luyện Viên AI
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Chọn chất giọng bản xứ và tốc độ đàm thoại phù hợp
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVoiceModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                  title="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1. Danh Sách 3 Giọng Nói / Huấn Luyện Viên */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> Giọng Đọc Bản Xứ
                </label>
                <div className="space-y-2">
                  {PERSONAS.map((p) => {
                    const isActive = currentPersona === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          handleSelectPersona(p.id);
                          speakText(`Hello, I'm ${p.name}, ready to practice with you!`);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "bg-blue-50/90 dark:bg-blue-950/60 border-[#0059bb] text-[#0059bb] dark:text-sky-300 font-bold shadow-xs"
                            : "bg-slate-50/70 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 border ${
                              isActive
                                ? "bg-[#0059bb] text-white border-[#0059bb]"
                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                            }`}
                          >
                            {p.countryCode}
                          </span>
                          <div className="truncate">
                            <div className="text-sm font-bold font-display truncate text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{p.name}</span>
                              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                • {p.countryName}
                              </span>
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate">
                              {p.role}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-slate-400 hover:text-[#0059bb] flex items-center gap-1 font-medium">
                            <Volume2 className="w-3.5 h-3.5" /> Nghe thử
                          </span>
                          {isActive && (
                            <Check className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[3]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Tốc Độ Nói */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Tốc Độ Đàm Thoại
                  </label>
                  <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-mono">
                    {speechSpeed}x
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { spd: 0.75, label: "0.75x Chậm" },
                    { spd: 1.0, label: "1.0x Chuẩn" },
                    { spd: 1.25, label: "1.25x Nhanh" },
                  ].map(({ spd, label }) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => handleSelectSpeed(spd)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        speechSpeed === spd
                          ? "bg-[#0059bb] text-white border-[#0059bb] shadow-xs"
                          : "bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Nút Áp Dụng */}
              <button
                type="button"
                onClick={() => setShowVoiceModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer active:scale-98 transition-all"
              >
                Áp Dụng & Tiếp Tục Nói
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. 1-CLICK INTERACTIVE DEEP WORD DICTIONARY COMPACT FLOATING CARD */}
      <AnimatePresence>
        {selectedWordData && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed right-3 bottom-28 sm:right-6 sm:bottom-6 z-50 w-[275px] xs:w-[290px] sm:w-[310px] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-2 select-none"
          >
            {/* Top Row: Word, Phonetic, Meaning & Top Right Actions (Bookmark & Close) */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <h3 className="text-base font-bold text-[#0059bb] dark:text-sky-400 capitalize font-display leading-tight">
                    {selectedWordData.word}
                  </h3>
                  {selectedWordData.ipa && (
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                      {selectedWordData.ipa.replace(/[()]/g, "")}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 leading-snug">
                  {selectedWordData.meaning.replace(/\s*\([^)]*\)/g, "")}
                </p>
              </div>

              {/* Action Buttons: Lưu Sổ Tay, Đóng (Có viền đồng bộ) */}
              <div className="flex items-center gap-1.5 shrink-0 -mt-0.5">
                <button
                  type="button"
                  onClick={handleSaveWordToVocab}
                  className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/50 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center transition-colors cursor-pointer active:scale-90 shadow-2xs"
                  title="Lưu vào Sổ tay từ vựng"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedWordData(null)}
                  className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-700/60 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200/90 dark:border-slate-700 flex items-center justify-center transition-colors cursor-pointer active:scale-90 shadow-2xs"
                  title="Đóng"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom Row: Example Sentence & Speaker Icon in Bottom Corner */}
            <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1 min-w-0">
                {selectedWordData.example || `Luyện tập phát âm chuẩn với "${selectedWordData.word}"`}
              </p>
              <button
                type="button"
                onClick={() => speakText(selectedWordData.word)}
                className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/50 text-[#0059bb] dark:text-sky-300 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center transition-colors cursor-pointer active:scale-90 shadow-2xs shrink-0"
                title="Nghe phát âm chuẩn"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
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
                  <div className="space-y-2.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 space-y-2.5 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <ShimmerBox className="w-32 h-4 rounded" />
                          <ShimmerBox className="w-20 h-5 rounded-md" />
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-700/60">
                          <ShimmerBox className="w-16 h-3.5 rounded" />
                          <ShimmerBox className="w-12 h-3.5 rounded" />
                          <ShimmerBox className="w-14 h-3.5 rounded" />
                        </div>
                      </div>
                    ))}
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
