"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Button, Badge } from "@/shared/components/ui";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useListeningStore } from "@/stores/listeningStore";
import { useUiStore } from "@/stores/uiStore";
import { motion, AnimatePresence } from "framer-motion";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";
import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";
import { DictationWorkspace } from "@/features/listening/components/DictationWorkspace";
import { StudioTopHeader } from "@/features/listening/components/StudioTopHeader";
import { StudioWaveformCard } from "@/features/listening/components/StudioWaveformCard";
import { InteractiveTranscriptSidebar } from "@/features/listening/components/InteractiveTranscriptSidebar";
import { ListeningListingSkeleton, ListeningStudioSkeleton } from "@/features/listening/components/LoadingSkeletons";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import {
  Headphones,
  Play,
  Pause,
  FastForward,
  Rewind,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Volume2,
  Trophy,
  Mic,
  Eye,
  EyeOff,
  BookOpen,
  ChevronRight,
  Sparkles,
  BookMarked,
  Check,
  RefreshCw,
  FileText,
  Plus,
  Clock,
  Brain,
  PenLine,
  GraduationCap,
  BookmarkPlus,
  Flag,
  Info,
  X,
  ListOrdered,
  Search,
  Layers,
  Target,
  Zap,
  Keyboard,
} from "lucide-react";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { lookupWordDeep, DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";
import { pick10RandomLessons } from "@/features/listening/utils/randomLessonPicker";

// Curated 44-bar acoustic waveform profile for realistic speech audio visualization
const SPEECH_WAVE_AMPLITUDES = [
  12, 16, 24, 38, 56, 74, 92, 80, 58, 42, 65, 88, 98, 86, 68, 48, 64, 84, 96, 78,
  55, 40, 62, 85, 95, 82, 60, 46, 70, 90, 84, 62, 45, 66, 82, 68, 50, 36, 28, 22,
  16, 14, 12, 10,
];

// Helper to resolve query id (e.g. ?id=1 -> 1st lesson or listen_001)
const resolveLessonId = (
  queryId: string | null | undefined,
  list: any[],
): string | null => {
  if (!queryId || !list || list.length === 0) return null;

  // 1. Direct match by lesson id
  const exact = list.find((l) => l.id === queryId);
  if (exact) return exact.id;

  // 2. Numeric match (e.g. ?id=1 -> 1st lesson or listen_001)
  const num = parseInt(queryId, 10);
  if (!isNaN(num)) {
    if (num >= 1 && num <= list.length) {
      return list[num - 1].id;
    }
    const formatted = `listen_${String(num).padStart(3, "0")}`;
    const foundFormatted = list.find((l) => l.id === formatted);
    if (foundFormatted) return foundFormatted.id;
  }

  return null;
};

// Generate initial character avatar and gradient
const getInitialAvatar = (title: string) => {
  const firstChar = title ? title.charAt(0).toUpperCase() : "E";
  const gradients = [
    "from-blue-600 to-indigo-600",
    "from-purple-600 to-pink-600",
    "from-emerald-600 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-600 to-red-600",
    "from-cyan-600 to-blue-600",
  ];
  const charCode = firstChar.charCodeAt(0);
  const gradient = gradients[charCode % gradients.length];
  return { firstChar, gradient };
};

function ListeningPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawIdParam = searchParams.get("id") || searchParams.get("lessonId");

  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const {
    currentLessonId,
    setCurrentLessonId,
    markLessonCompleted,
    completedLessonIds,
  } = useListeningStore();
  const { setSidebarCollapsed, setHideBottomNav } = useUiStore();

  // Lessons list state (combines mock data + user generated lessons)
  const [lessonsList, setLessonsList] = useState<any[]>(MOCK_LESSONS_DATA);

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(() => {
    return resolveLessonId(rawIdParam, MOCK_LESSONS_DATA);
  });

  const currentLesson =
    lessonsList.find((l) => l.id === selectedLessonId) || null;

  // Single-sentence focus states
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [playingSentenceText, setPlayingSentenceText] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [sentencePlaybackTime, setSentencePlaybackTime] = useState<number>(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [completedSentences, setCompletedSentences] = useState<{
    [idx: number]: boolean;
  }>({});
  const [revealedFullParagraphTranslation, setRevealedFullParagraphTranslation] =
    useState(false);
  const [mobileStudioTab, setMobileStudioTab] = useState<"dictation" | "transcript">("dictation");

  const currentSentence =
    currentLesson?.transcript?.[currentSentenceIndex] ||
    currentLesson?.transcript?.[0] ||
    null;
  const totalSentencesCount = currentLesson?.transcript?.length || 0;

  // Overall practice timer state (seconds elapsed)
  const [elapsedTime, setElapsedTime] = useState(0);
  const elapsedTimeRef = useRef(0);

  // Sentence Utility Toolbar States (matching user screenshot)
  const [savedSentenceKeys, setSavedSentenceKeys] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("xp_listening_saved_sentences");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [fontSizeLevel, setFontSizeLevel] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    try {
      const raw = localStorage.getItem("xp_listening_font_size");
      return raw ? parseInt(raw, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [autoNextSentence, setAutoNextSentence] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const raw = localStorage.getItem("xp_listening_auto_next");
      return raw !== null ? JSON.parse(raw) : true;
    } catch {
      return true;
    }
  });

  const [hideTranslation, setHideTranslation] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem("xp_listening_hide_trans");
      return raw !== null ? JSON.parse(raw) : false;
    } catch {
      return false;
    }
  });

  // Current sentence bookmark key
  const currentSentenceKey = `${selectedLessonId || "lesson"}_${currentSentenceIndex}`;
  const isCurrentSentenceBookmarked = savedSentenceKeys.includes(currentSentenceKey);

  const handleToggleBookmark = () => {
    let nextKeys: string[];
    if (isCurrentSentenceBookmarked) {
      nextKeys = savedSentenceKeys.filter((k) => k !== currentSentenceKey);
      addToast({ type: "info", title: "Đã bỏ lưu câu khỏi sổ tay! 🔖" });
    } else {
      nextKeys = [...savedSentenceKeys, currentSentenceKey];
      awardXp(5, "dictation");
      addToast({
        type: "success",
        title: "⭐ Đã lưu câu vào sổ tay luyện tập! (+5 XP)",
        message: currentSentence?.text
          ? `"${currentSentence.text.slice(0, 45)}..."`
          : "Đã lưu câu thành công!",
      });
    }
    setSavedSentenceKeys(nextKeys);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "xp_listening_saved_sentences",
        JSON.stringify(nextKeys),
      );
    }
  };

  const handleReportSentence = () => {
    addToast({
      type: "info",
      title: "🚩 Đã ghi nhận báo cáo!",
      message:
        "Cảm ơn bạn đã gửi phản ánh về câu này cho ban biên tập XP English.",
    });
  };

  const handleAdjustFontSize = (delta: number) => {
    const nextLevel = Math.max(0, Math.min(3, fontSizeLevel + delta));
    setFontSizeLevel(nextLevel);
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_listening_font_size", String(nextLevel));
    }
    const labels = [
      "Tiêu chuẩn (14px)",
      "Vừa (16px)",
      "Lớn (18px)",
      "Rất lớn (20px)",
    ];
    addToast({ type: "info", title: `Cỡ chữ: ${labels[nextLevel]}` });
  };

  const handleToggleAutoNext = () => {
    const next = !autoNextSentence;
    setAutoNextSentence(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_listening_auto_next", JSON.stringify(next));
    }
    addToast({
      type: "info",
      title: next
        ? "Bật: Tự động chuyển câu"
        : "Tắt: Không tự động chuyển câu",
    });
  };

  const handleToggleHideTranslation = () => {
    const next = !hideTranslation;
    setHideTranslation(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_listening_hide_trans", JSON.stringify(next));
    }
    addToast({
      type: "info",
      title: next
        ? "Đã bật Ẩn dịch (Tập trung luyện nghe)"
        : "Đã tắt Ẩn dịch",
    });
  };

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  // Real-time backend practice time tracker for Dictation / Listening
  useStudyTimeTracker("dictation", {
    activeCondition: !!selectedLessonId,
  });

  // Timer: Runs continuously during practice
  useEffect(() => {
    if (!selectedLessonId) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedLessonId]);

  // Sentence Audio Timer: Counts up ONLY when audio is actively playing with duration clamping
  useEffect(() => {
    if (!playingSentenceText || !currentSentence?.text) return;

    const sentenceDuration = Math.max(
      3,
      Math.ceil(currentSentence.text.trim().split(/\s+/).length / (2.2 * playbackSpeed))
    );

    const timer = setInterval(() => {
      setSentencePlaybackTime((prev) => {
        if (prev >= sentenceDuration) {
          return sentenceDuration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [playingSentenceText, currentSentence?.text, playbackSpeed]);

  // Helper to format seconds to mm:ss
  const formatElapsedTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Sync URL & Auto collapse sidebar
  useEffect(() => {
    if (rawIdParam) {
      const resolved = resolveLessonId(rawIdParam, lessonsList);
      if (resolved) {
        setSelectedLessonId(resolved);
        setCurrentLessonId(resolved);
        setSidebarCollapsed(true);
      }
    }
  }, [rawIdParam, lessonsList, setCurrentLessonId, setSidebarCollapsed]);

  // Automatically ensure sidebar is collapsed when in listening studio workspace
  useEffect(() => {
    if (selectedLessonId) {
      setSidebarCollapsed(true);
      setHideBottomNav(true);
    } else {
      setHideBottomNav(false);
    }
  }, [selectedLessonId, setSidebarCollapsed, setHideBottomNav]);

  // Cleanup: restore BottomNav when leaving the page
  useEffect(() => {
    return () => setHideBottomNav(false);
  }, [setHideBottomNav]);

  const [listingSearch, setListingSearch] = useState("");

  // Level display label mapping (actual data → user-friendly badge text)
  const getLevelLabel = (level?: string): string => {
    const map: Record<string, string> = {
      "Easy": "A1-A2", "Beginner": "A1", "A1": "A1", "A2": "A2",
      "Intermediate": "B1-B2", "B1": "B1", "B2": "B2",
      "Hard": "C1-C2", "Advanced": "C1", "C1": "C1", "C2": "C2",
    };
    return map[level || ""] || level || "A1";
  };

  // Dual Row Picker State: Row 1 Basic & Row 2 Advanced
  const BASIC_LEVELS = new Set(["Easy", "Beginner", "A1", "A2"]);
  const ADVANCED_LEVELS = new Set(["Hard", "Advanced", "C1", "C2"]);

  const [displayedBasicLessons, setDisplayedBasicLessons] = useState<any[]>([]);
  const [displayedAdvancedLessons, setDisplayedAdvancedLessons] = useState<any[]>([]);

  useEffect(() => {
    // Split: Easy → Basic, Hard → Advanced, Intermediate → split evenly
    const easyPool = lessonsList.filter((l) => BASIC_LEVELS.has(l.level));
    const hardPool = lessonsList.filter((l) => ADVANCED_LEVELS.has(l.level));
    const midPool = lessonsList.filter((l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2");
    const midHalf = Math.ceil(midPool.length / 2);

    const basicPool = [...easyPool, ...midPool.slice(0, midHalf)];
    const advPool = [...hardPool, ...midPool.slice(midHalf)];

    const safeBasic = basicPool.length > 0 ? basicPool : lessonsList.slice(0, Math.ceil(lessonsList.length / 2));
    const safeAdv = advPool.length > 0 ? advPool : lessonsList.slice(Math.ceil(lessonsList.length / 2));

    if (listingSearch.trim()) {
      const q = listingSearch.toLowerCase();
      setDisplayedBasicLessons(
        safeBasic.filter((l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q)).slice(0, 8)
      );
      setDisplayedAdvancedLessons(
        safeAdv.filter((l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q)).slice(0, 8)
      );
    } else {
      setDisplayedBasicLessons(pick10RandomLessons(safeBasic, completedLessonIds || []).slice(0, 8));
      setDisplayedAdvancedLessons(pick10RandomLessons(safeAdv, completedLessonIds || []).slice(0, 8));
    }
  }, [lessonsList, completedLessonIds, listingSearch]);

  const handleShuffleBasic = () => {
    const easyPool = lessonsList.filter((l) => BASIC_LEVELS.has(l.level));
    const midPool = lessonsList.filter((l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2");
    const basicPool = [...easyPool, ...midPool.slice(0, Math.ceil(midPool.length / 2))];
    const safeBasic = basicPool.length > 0 ? basicPool : lessonsList.slice(0, Math.ceil(lessonsList.length / 2));
    setDisplayedBasicLessons(pick10RandomLessons(safeBasic, completedLessonIds || []).slice(0, 8));
    addToast({ type: "info", title: "Đã đổi 8 bài cơ bản ngẫu nhiên mới!" });
  };

  const handleShuffleAdvanced = () => {
    const hardPool = lessonsList.filter((l) => ADVANCED_LEVELS.has(l.level));
    const midPool = lessonsList.filter((l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2");
    const advPool = [...hardPool, ...midPool.slice(Math.ceil(midPool.length / 2))];
    const safeAdv = advPool.length > 0 ? advPool : lessonsList.slice(Math.ceil(lessonsList.length / 2));
    setDisplayedAdvancedLessons(pick10RandomLessons(safeAdv, completedLessonIds || []).slice(0, 8));
    addToast({ type: "info", title: "Đã đổi 8 bài nâng cao ngẫu nhiên mới!" });
  };

  // Select lesson handler
  const handleSelectLesson = (lessonId: string) => {
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(lessonId);
    setCurrentLessonId(lessonId);
    setIsLessonFinished(false);
    setCurrentSentenceIndex(0);
    setSentencePlaybackTime(0);
    setSidebarCollapsed(true);
    localStorage.setItem("xp_voca_last_listening_lesson", lessonId);

    const lessonIdx = lessonsList.findIndex((l) => l.id === lessonId);
    if (lessonIdx !== -1) {
      router.push(`/study/listening?id=${lessonIdx + 1}`);
    } else {
      router.push(`/study/listening?id=${lessonId}`);
    }
  };

  // Back to listing handler
  const handleBackToListing = () => {
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(null);
    setCurrentLessonId("");
    setIsLessonFinished(false);
    setCurrentSentenceIndex(0);
    setSentencePlaybackTime(0);
    setSidebarCollapsed(false);
    localStorage.removeItem("xp_voca_last_listening_lesson");
    router.push("/study/listening");
  };

  // Form State: Create New Article
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");
  const [newAccent, setNewAccent] = useState("en-US");
  const [newLevel, setNewLevel] = useState("B1");

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) {
      addToast({
        type: "warning",
        title: "Vui lòng nhập đầy đủ tiêu đề và nội dung đoạn văn!",
      });
      return;
    }

    const sentences = newText
      .split(/(?<=[.?!])\s+/)
      .filter((s) => s.trim().length > 0)
      .map((s, idx) => ({
        id: idx + 1,
        text: s.trim(),
        translation: "Đoạn văn được tạo bởi AI (Chưa có bản dịch song ngữ)",
        startTime: idx * 5,
        endTime: (idx + 1) * 5,
      }));

    const newLesson = {
      id: `custom_${Date.now()}`,
      title: newTitle.trim(),
      category: "Bài học của bạn (Custom AI)",
      level: newLevel,
      accent: newAccent,
      duration: `${Math.max(1, Math.ceil(sentences.length * 0.4))} min`,
      coverImage:
        newThumbnail.trim() ||
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60",
      transcript: sentences,
      vocabulary: [],
      quizzes: [
        {
          id: 1,
          question: `What is the main theme of "${newTitle.trim()}"?`,
          options: [
            "General Knowledge & Practice",
            "Science and Technology",
            "Entertainment",
            "History and Culture",
          ],
          correctIndex: 0,
          explanation:
            "This custom listening lesson is created for listening comprehension practice.",
        },
      ],
    };

    setLessonsList((prev) => [newLesson, ...prev]);
    setShowCreateForm(false);
    setNewTitle("");
    setNewText("");
    setNewThumbnail("");

    handleSelectLesson(newLesson.id);
    awardXp(15, "dictation");
    addToast({
      type: "success",
      title: "🎉 Đã tạo bài nghe AI thành công! (+15 XP)",
    });
  };

  // Right sidebar tab state
  const [rightSidebarTab, setRightSidebarTab] = useState<
    "quiz" | "vocab" | "notes"
  >("quiz");
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});

  const handleSelectQuizOption = (
    qIdx: number,
    optionIdx: number,
    correctIdx: number,
  ) => {
    if (quizAnswers[qIdx] !== undefined) return;
    const nextAnswers = { ...quizAnswers, [qIdx]: optionIdx };
    setQuizAnswers(nextAnswers);

    const isCorrect = optionIdx === correctIdx;
    if (isCorrect) {
      awardXp(10, "dictation");
      addToast({ type: "success", title: "Chính xác! +10 XP 🎯" });
    } else {
      addToast({
        type: "error",
        title: "Chưa chính xác, hãy đọc kỹ giải thích!",
      });
    }

    if (currentLesson) {
      fetch("/api/listening/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "guest-user",
          lessonId: currentLesson.id,
          xpEarned: isCorrect ? 10 : 0,
        }),
      });
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    addToast({ type: "info", title: "Đã làm mới bài kiểm tra Quiz! 🔄" });
  };

  // Cloud notes state
  const [cloudNoteText, setCloudNoteText] = useState("");
  useEffect(() => {
    if (currentLesson) {
      const savedNote = localStorage.getItem(
        `xp_voca_note_${currentLesson.id}`,
      );
      setCloudNoteText(savedNote || "");
    }
  }, [currentLesson]);

  const saveUserNote = (val: string) => {
    if (currentLesson) {
      localStorage.setItem(`xp_voca_note_${currentLesson.id}`, val);
    }
  };

  // Deep Dictionary Modal State
  const [selectedWord, setSelectedWord] = useState<DeepWordDefinition | null>(null);

  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    if (!cleanWord) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
      speakLessonText(cleanWord, { lessonId: currentLesson?.id, rate: 1.0 });
      return;
    }

    const deepDef = lookupWordDeep(cleanWord);
    setSelectedWord(deepDef);
  };

  const vocabList =
    currentLesson?.vocabulary || currentLesson?.vocabularyList || [];

  // Space key to toggle play/pause & Arrow keys / shortcuts to navigate sentence audio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      const sentenceDuration = Math.max(
        3,
        Math.ceil(
          ((currentLesson?.transcript?.[currentSentenceIndex]?.text || "").trim().split(/\s+/).length) /
            (2.2 * playbackSpeed)
        )
      );

      if (e.code === "Space" && !isTyping) {
        e.preventDefault();
        if (playingSentenceText) {
          stopTTS();
          setPlayingSentenceText(null);
        } else {
          const sentence = currentLesson?.transcript?.[currentSentenceIndex];
          if (sentence?.text) {
            setPlayingSentenceText(sentence.text);
            speakLessonText(sentence.text, {
              rate: playbackSpeed,
              lessonId: currentLesson.id,
              speakerIndex: currentSentenceIndex % 2,
              accent: currentLesson.accent,
              onEnd: () => {
                setPlayingSentenceText(null);
                setSentencePlaybackTime(0);
              },
            });
          }
        }
      } else if ((e.key === "Control" || (e.ctrlKey && e.code === "KeyR")) && !isTyping) {
        e.preventDefault();
        stopTTS();
        setSentencePlaybackTime(0);
        const sentence = currentLesson?.transcript?.[currentSentenceIndex];
        if (sentence?.text) {
          setPlayingSentenceText(sentence.text);
          speakLessonText(sentence.text, {
            rate: playbackSpeed,
            lessonId: currentLesson.id,
            speakerIndex: currentSentenceIndex % 2,
            accent: currentLesson.accent,
            onEnd: () => {
              setPlayingSentenceText(null);
              setSentencePlaybackTime(0);
            },
          });
          addToast({ type: "info", title: "Nghe lại câu hiện tại (Ctrl)" });
        }
      } else if (e.code === "Enter" && !isTyping) {
        e.preventDefault();
        if (currentSentenceIndex < totalSentencesCount - 1) {
          stopTTS();
          setPlayingSentenceText(null);
          setSentencePlaybackTime(0);
          setCurrentSentenceIndex((prev) => prev + 1);
        }
      } else if (e.code === "ArrowLeft" && !isTyping) {
        e.preventDefault();
        setSentencePlaybackTime((prev) => Math.max(0, prev - 5));
        addToast({ type: "info", title: "Tua lùi 5s" });
      } else if (e.code === "ArrowRight" && !isTyping) {
        e.preventDefault();
        setSentencePlaybackTime((prev) => Math.min(sentenceDuration, prev + 5));
        addToast({ type: "info", title: "Tua nhanh 5s" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentLesson, currentSentenceIndex, playingSentenceText, playbackSpeed, totalSentencesCount, addToast]);

  if (rawIdParam && !currentLesson) {
    return <ListeningStudioSkeleton />;
  }

  return (
    <div
      className={`w-full min-w-0 max-w-none font-sans ${
        selectedLessonId
          ? "h-full max-h-screen overflow-hidden p-0"
          : "min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col"
      }`}
    >
      {/* 1. TOP HEADER & EXPLORER (WHEN IN LISTING MODE) */}
      {!selectedLessonId && (
        <>
          {/* 1.1 CONTINUOUS FULL-WIDTH TOP BAR (AppTopHeader) */}
          <AppTopHeader
            rightDesktopContent={
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="relative w-44 xs:w-56 sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài nghe..."
                    value={listingSearch}
                    onChange={(e) => setListingSearch(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 text-xs sm:text-sm font-medium rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreateForm((prev) => !prev)}
                  className="h-9 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span className="hidden sm:inline">{showCreateForm ? "Đóng tạo bài" : "Tạo bài AI"}</span>
                  <span className="sm:hidden">{showCreateForm ? "Đóng" : "Tạo bài"}</span>
                </button>
              </div>
            }
          >
            <HeaderPillContainer>
              <HeaderPillItem
                active
                icon={<Headphones className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />}
                label="Dictation"
              />
              <HeaderPillItem
                href="/study/shadowing"
                icon={<Mic className="w-3.5 h-3.5" />}
                label="Shadowing"
              />
              <HeaderPillItem
                href="/study/practice"
                icon={<BookOpen className="w-3.5 h-3.5" />}
                label="Luyện từ vựng"
              />
              <HeaderPillItem
                href="/study/exam-prep"
                icon={<FileText className="w-3.5 h-3.5" />}
                label="Thi thử đề"
              />
            </HeaderPillContainer>
          </AppTopHeader>

          {/* 1.2 MAIN LISTING CONTENT CANVAS */}
          <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-7 pb-20">
            {/* FORM TẠO BÀI NGHE AI (ACCORDION) */}
            <AnimatePresence>
              {showCreateForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCreateArticle}
                  className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5 overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <h3 className="text-xs font-bold uppercase text-blue-600 dark:text-sky-400 font-display flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> TẠO BÀI ĐỌC & BÓC TÁCH ÂM THANH MỚI
                    </h3>
                    <span className="text-xs font-medium text-slate-400">
                      Tự động tách câu và sinh audio AI
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label
                        htmlFor="new-article-title-input"
                        className="text-xs font-bold text-slate-700 dark:text-slate-300"
                      >
                        1. Tiêu đề bài đọc (Title):
                      </label>
                      <input
                        id="new-article-title-input"
                        type="text"
                        required
                        className="w-full h-10 px-3.5 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        placeholder="VD: Daily Morning Routine in London..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="new-article-thumbnail-input"
                        className="text-xs font-bold text-slate-700 dark:text-slate-300"
                      >
                        2. Link ảnh Thumbnail (Không bắt buộc):
                      </label>
                      <input
                        id="new-article-thumbnail-input"
                        type="url"
                        className="w-full h-10 px-3.5 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        placeholder="https://images.unsplash.com/..."
                        value={newThumbnail}
                        onChange={(e) => setNewThumbnail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="new-article-text-textarea"
                      className="text-xs font-bold text-slate-700 dark:text-slate-300"
                    >
                      3. Nội dung văn bản đoạn văn (English Text Content):
                    </label>
                    <textarea
                      id="new-article-text-textarea"
                      rows={3}
                      required
                      className="w-full p-3.5 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                      placeholder="Today is a beautiful day. I really love learning English with AI..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        aria-label="Chọn Accent"
                        value={newAccent}
                        onChange={(e) => setNewAccent(e.target.value)}
                        className="h-8 px-3 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="en-US">US Accent</option>
                        <option value="en-UK">UK Accent</option>
                        <option value="en-AU">AU Accent</option>
                      </select>

                      <select
                        aria-label="Chọn Trình độ Level"
                        value={newLevel}
                        onChange={(e) => setNewLevel(e.target.value)}
                        className="h-8 px-3 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="A1">Level A1</option>
                        <option value="A2">Level A2</option>
                        <option value="B1">Level B1</option>
                        <option value="B2">Level B2</option>
                        <option value="C1">Level C1</option>
                      </select>
                    </div>

                    <Button
                      variant="primary"
                      type="submit"
                      className="h-9 px-5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs active:scale-95 transition-transform cursor-pointer"
                    >
                      🚀 TẠO BÀI NGHE AI NGAY
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* HÀNG 1: BÀI HỌC CƠ BẢN (A1 - A2) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
                    A1 - A2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Bài học cơ bản <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">(Mẫu câu ngắn, giao tiếp nền tảng)</span>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleShuffleBasic}
                  className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                  <span>Đổi bài ngẫu nhiên</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                {displayedBasicLessons.map((lesson) => {
                  const isSelected = lesson.id === selectedLessonId;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-0 group ${
                        isSelected
                          ? "bg-white dark:bg-slate-900 border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-blue-500 hover:shadow-md shadow-2xs"
                      }`}
                    >
                      <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                        <LessonCoverImage lesson={lesson} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" showBadge={false} />

                        <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-xs z-20 shadow-2xs border border-white/10">
                          {getLevelLabel(lesson.level)}
                        </span>

                        {isCompleted && (
                          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-0.5 sm:gap-1 shadow-2xs">
                            <Check className="w-3 h-3 stroke-[3]" /> <span className="hidden xs:inline sm:inline">Đã học</span>
                          </span>
                        )}

                        {isSelected && (
                          <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white hidden sm:flex items-center gap-1 shadow-2xs">
                            <Play className="w-3 h-3 fill-white" /> Đang chọn
                          </span>
                        )}
                      </div>

                      <div className="py-0.5 sm:py-0 sm:mt-2.5 space-y-1.5 flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          {lesson.category && (
                            <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-sky-400 block truncate mb-1 sm:hidden">
                              {lesson.category}
                            </span>
                          )}
                          <h3
                            className={`text-[14.5px] xs:text-[15.5px] sm:text-[13px] font-bold sm:font-semibold font-sans line-clamp-2 leading-snug transition-colors ${
                              isSelected
                                ? "text-blue-600 dark:text-sky-400"
                                : "text-slate-900 dark:text-white group-hover:text-blue-600"
                            }`}
                          >
                            {lesson.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                          <span className="flex items-center gap-1.5 font-bold font-mono tabular-nums text-xs xs:text-[13px] sm:text-[11px] text-slate-700 dark:text-slate-200">
                            <Clock className="w-4 h-4 text-blue-600 dark:text-sky-400 stroke-[2.5] shrink-0" />{" "}
                            {lesson.duration || "5 min"}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs xs:text-[12.5px] sm:text-[11px] font-mono tabular-nums border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                            {lesson.transcript?.length || 10} câu
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* HÀNG 2: BÀI HỌC NÂNG CAO (B1 - C2) */}
            <div className="space-y-4 pt-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shadow-2xs">
                    B1 - C2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Bài học nâng cao <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">(Học thuật, Phỏng vấn & TED Talk)</span>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleShuffleAdvanced}
                  className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Đổi bài ngẫu nhiên</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                {displayedAdvancedLessons.map((lesson) => {
                  const isSelected = lesson.id === selectedLessonId;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-0 group ${
                        isSelected
                          ? "bg-white dark:bg-slate-900 border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-purple-500 hover:shadow-md shadow-2xs"
                      }`}
                    >
                      <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                        <LessonCoverImage lesson={lesson} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" showBadge={false} />

                        <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-xs z-20 shadow-2xs border border-white/10">
                          {getLevelLabel(lesson.level)}
                        </span>

                        {isCompleted && (
                          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-0.5 sm:gap-1 shadow-2xs">
                            <Check className="w-3 h-3 stroke-[3]" /> <span className="hidden xs:inline sm:inline">Đã học</span>
                          </span>
                        )}

                        {isSelected && (
                          <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white hidden sm:flex items-center gap-1 shadow-2xs">
                            <Play className="w-3 h-3 fill-white" /> Đang chọn
                          </span>
                        )}
                      </div>

                      <div className="py-0.5 sm:py-0 sm:mt-2.5 space-y-1.5 flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          {lesson.category && (
                            <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 block truncate mb-1 sm:hidden">
                              {lesson.category}
                            </span>
                          )}
                          <h3
                            className={`text-[14.5px] xs:text-[15.5px] sm:text-[13px] font-bold sm:font-semibold font-sans line-clamp-2 leading-snug transition-colors ${
                              isSelected
                                ? "text-blue-600 dark:text-sky-400"
                                : "text-slate-900 dark:text-white group-hover:text-purple-600"
                            }`}
                          >
                            {lesson.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                          <span className="flex items-center gap-1.5 font-bold font-mono tabular-nums text-xs xs:text-[13px] sm:text-[11px] text-slate-700 dark:text-slate-200">
                            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400 stroke-[2.5] shrink-0" />{" "}
                            {lesson.duration || "5 min"}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs xs:text-[12.5px] sm:text-[11px] font-mono tabular-nums border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                            {lesson.transcript?.length || 10} câu
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. MAIN WORKSPACE: SINGLE-SENTENCE FOCUS STUDIO OR UNIFIED COMPLETION SUMMARY */}
      {selectedLessonId && currentLesson && (
        <>
          {isLessonFinished ? (
            /* UNIFIED 1-BLOCK LESSON COMPLETION SUMMARY SCREEN */
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full p-5 sm:p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-6 font-sans"
            >
              {/* 1. Top Header: Back Button, Title, Timer */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={handleBackToListing}
                    className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display truncate">
                    {currentLesson.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatElapsedTime(elapsedTime)}</span>
                  </span>
                </div>
              </div>

              {/* 2. Celebration Header Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/60 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200/70 dark:border-emerald-800/40 flex items-center justify-between flex-wrap gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                      🎉 Chúc Mừng! Bạn Đã Hoàn Thành Toàn Bộ Bài Nghe!
                    </h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap text-xs font-medium text-slate-600 dark:text-slate-300">
                      <span>✓ Đã chép đúng <strong>{totalSentencesCount}/{totalSentencesCount}</strong> câu</span>
                      <span>•</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">⭐ +50 XP</span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">🎯 Độ chính xác: 100%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Full Transcript Review Section */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <span className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200 font-display flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Toàn Bộ Bản Ghi Bài Học (Full Transcript)
                  </span>
                  <button
                    type="button"
                    onClick={() => setRevealedFullParagraphTranslation((prev) => !prev)}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{revealedFullParagraphTranslation ? "Ẩn dịch nghĩa" : "Xem dịch nghĩa toàn bài"}</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {currentLesson.transcript?.map((sentence: any, sIdx: number) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1.5 transition-all hover:border-slate-400 dark:hover:border-slate-700 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white font-sans leading-relaxed">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 mr-2 font-mono font-bold text-xs border border-slate-200/80 dark:border-slate-700">#{sIdx + 1}</span>
                          {sentence.text}
                        </p>
                        <button
                          type="button"
                          onClick={() => speakLessonText(sentence.text, { rate: 1.0, lessonId: currentLesson.id, speakerIndex: sIdx % 2, accent: currentLesson.accent })}
                          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer shrink-0 transition-colors shadow-2xs"
                          title="Nghe lại câu này"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      {revealedFullParagraphTranslation && (
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 not-italic pl-6 border-l-2 border-slate-300 dark:border-slate-700">
                          {sentence.translation || sentence.vietnamese}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Bottom Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsLessonFinished(false);
                    setCurrentSentenceIndex(0);
                    setSentencePlaybackTime(0);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Luyện lại bài này</span>
                </button>

                <div className="flex items-center gap-2.5 flex-wrap">
                  {currentLesson.quizzes && currentLesson.quizzes.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsLessonFinished(false);
                        setRightSidebarTab("quiz");
                      }}
                      className="px-4 py-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 font-bold text-xs border border-purple-300 dark:border-purple-800/40 shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Brain className="w-3.5 h-3.5 text-purple-600" />
                      <span>Làm Quiz kiểm tra ({currentLesson.quizzes.length} câu)</span>
                    </button>
                  )}

                  {lessonsList.findIndex((l) => l.id === currentLesson.id) + 1 < lessonsList.length && (
                    <button
                      type="button"
                      onClick={() => {
                        const nextIdx = lessonsList.findIndex((l) => l.id === currentLesson.id) + 1;
                        const nextId = lessonsList[nextIdx].id;
                        handleSelectLesson(nextId);
                        setIsLessonFinished(false);
                        setCurrentSentenceIndex(0);
                        addToast({
                          type: "info",
                          title: `Đã chuyển sang Bài học #${nextIdx + 1}! 🎧`,
                        });
                      }}
                      className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-98"
                    >
                      <span>Bài học tiếp theo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <Link href={`/study/shadowing?lessonId=${currentLesson.id}`}>
                    <button className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition-all">
                      <Mic className="w-3.5 h-3.5 text-white" />
                      <span>Luyện Shadowing AI</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            /* 2-COLUMN SINGLE-SENTENCE STUDY MODE */
            <div
              id="active-listening-workspace"
              className="w-full h-full max-h-full flex flex-col overflow-hidden select-none"
            >
              {/* Top Unified Studio Navigation Bar (Border-Bottom Full-Width) */}
              <StudioTopHeader
                title={currentLesson.title}
                currentMode="listening"
                lessonQueryId={rawIdParam || selectedLessonId || "36"}
                isBookmarked={isCurrentSentenceBookmarked}
                onToggleBookmark={handleToggleBookmark}
                onBack={handleBackToListing}
                rightExtraActions={
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-1 shadow-2xs shrink-0 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatElapsedTime(elapsedTime)}</span>
                  </span>
                }
              />

              {/* Mobile/Tablet View Switcher Tab (Displayed ONLY on < lg, completely hidden on Desktop) */}
              <div className="flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-2.5 gap-6 shrink-0 select-none sticky top-0 z-20 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setMobileStudioTab("dictation")}
                  className={`pb-2.5 text-sm sm:text-[15px] flex items-center gap-2 cursor-pointer select-none transition-all relative ${
                    mobileStudioTab === "dictation"
                      ? "font-bold text-slate-900 dark:text-white"
                      : "font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  <Headphones className="w-4 h-4 shrink-0" />
                  <span>Luyện chép ({currentSentenceIndex + 1}/{totalSentencesCount})</span>
                  {mobileStudioTab === "dictation" && (
                    <motion.div
                      layoutId="activeMobileStudioTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-900 dark:bg-white rounded-t-full"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setMobileStudioTab("transcript")}
                  className={`pb-2.5 text-sm sm:text-[15px] flex items-center gap-2 cursor-pointer select-none transition-all relative ${
                    mobileStudioTab === "transcript"
                      ? "font-bold text-slate-900 dark:text-white"
                      : "font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  <ListOrdered className="w-4 h-4 shrink-0" />
                  <span>Danh sách phụ đề ({totalSentencesCount})</span>
                  {mobileStudioTab === "transcript" && (
                    <motion.div
                      layoutId="activeMobileStudioTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-900 dark:bg-white rounded-t-full"
                    />
                  )}
                </button>
              </div>

              {/* 2-Column Responsive Workspace: Left Main Dictation & Right Transcript Panel (Directly touching Header) */}
              <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
                {/* CỘT TRÁI: SINGLE-SENTENCE FOCUS WORKSPACE */}
                <div
                  className={`flex-1 min-w-0 p-3 sm:p-3.5 space-y-2.5 sm:space-y-3 overflow-y-auto hide-scrollbar ${
                    mobileStudioTab === "dictation" ? "block" : "hidden lg:block"
                  }`}
                >
                          {currentSentence && (
                            <div className="space-y-2.5 sm:space-y-3">
                              {/* 1. DEDICATED SENTENCE AUDIO STUDIO BLOCK WITH ACTIVE SPEECH ACOUSTIC WAVEFORM */}
                              {(() => {
                                const sentenceDuration = Math.max(
                                  3,
                                  Math.ceil((currentSentence.text.trim().split(/\s+/).length / (2.2 * playbackSpeed)))
                                );

                                return (
                                  <StudioWaveformCard
                                    segmentIndex={currentSentenceIndex}
                                    totalSegments={totalSentencesCount}
                                    playbackTime={sentencePlaybackTime}
                                    duration={sentenceDuration}
                                    isPlaying={playingSentenceText === currentSentence.text}
                                    playbackSpeed={playbackSpeed}
                                    onTogglePlay={() => {
                                      if (playingSentenceText === currentSentence.text) {
                                        stopTTS();
                                        setPlayingSentenceText(null);
                                      } else {
                                        setPlayingSentenceText(currentSentence.text);
                                        speakLessonText(currentSentence.text, {
                                          rate: playbackSpeed,
                                          lessonId: currentLesson.id,
                                          speakerIndex: currentSentenceIndex % 2,
                                          accent: currentLesson.accent,
                                          onEnd: () => {
                                            setPlayingSentenceText(null);
                                            setSentencePlaybackTime(0);
                                          },
                                        });
                                      }
                                    }}
                                    onPrev={() => {
                                      if (currentSentenceIndex > 0) {
                                        stopTTS();
                                        setPlayingSentenceText(null);
                                        setCurrentSentenceIndex((prev) => prev - 1);
                                        setSentencePlaybackTime(0);
                                      }
                                    }}
                                    onNext={() => {
                                      stopTTS();
                                      setPlayingSentenceText(null);
                                      setSentencePlaybackTime(0);
                                      if (currentSentenceIndex < totalSentencesCount - 1) {
                                        setCurrentSentenceIndex((prev) => prev + 1);
                                      } else {
                                        setIsLessonFinished(true);
                                        markLessonCompleted(currentLesson.id);
                                        awardXp(50, "dictation");
                                        addToast({
                                          type: "success",
                                          title: "🎉 HOÀN THÀNH BÀI HỌC!",
                                          message:
                                            "Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ bài nghe! +50 XP thưởng.",
                                        });
                                      }
                                    }}
                                    onRewind5s={() => {
                                      setSentencePlaybackTime((prev) =>
                                        Math.max(0, prev - 5),
                                      );
                                      addToast({ type: "info", title: "Tua lùi 5s" });
                                    }}
                                    onForward5s={() => {
                                      setSentencePlaybackTime((prev) =>
                                        Math.min(sentenceDuration, prev + 5),
                                      );
                                      addToast({ type: "info", title: "Tua nhanh 5s" });
                                    }}
                                    onSeek={(time) => {
                                      setSentencePlaybackTime(Math.min(sentenceDuration, Math.max(0, time)));
                                    }}
                                    onSpeedChange={(spd) => {
                                      setPlaybackSpeed(spd);
                                      if (playingSentenceText === currentSentence.text) {
                                        speakLessonText(currentSentence.text, {
                                          rate: spd,
                                          lessonId: currentLesson.id,
                                          speakerIndex: currentSentenceIndex % 2,
                                          accent: currentLesson.accent,
                                          onEnd: () => {
                                            setPlayingSentenceText(null);
                                            setSentencePlaybackTime(0);
                                          },
                                        });
                                      }
                                    }}
                                    isPrevDisabled={currentSentenceIndex === 0}
                                  />
                                );
                              })()}

                              {/* 1.2 META STATUS ROW */}
                              <div className="flex items-center justify-between px-1 text-xs font-semibold text-slate-600 dark:text-slate-400 flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono font-bold border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
                                    #{currentSentenceIndex + 1}
                                  </span>
                                  <span className="font-medium text-slate-600 dark:text-slate-400">
                                    0/{currentSentence.text.split(" ").length} từ
                                  </span>
                                  <span className="text-slate-300 dark:text-slate-700">•</span>
                                  <span className="text-slate-600 dark:text-slate-400 font-semibold">
                                    Khớp: 0%
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-sans">
                                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200/80 dark:border-slate-700">
                                    <kbd className="font-mono font-bold text-slate-700 dark:text-slate-300">Enter</kbd> để sang câu tiếp theo
                                  </span>
                                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200/80 dark:border-slate-700">
                                    <kbd className="font-mono font-bold text-slate-700 dark:text-slate-300">Ctrl</kbd> để nghe lại
                                  </span>
                                </div>
                              </div>

                              {/* 1.5 SENTENCE UTILITY TOOLBAR */}
                              <div className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs font-medium">
                                {/* Left Group: Lưu câu & Báo cáo */}
                                <div className="flex items-center gap-1.5 sm:gap-3">
                                  {/* 1. Lưu câu */}
                                  <button
                                    type="button"
                                    onClick={handleToggleBookmark}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                                      isCurrentSentenceBookmarked
                                        ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 shadow-xs"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                    title={
                                      isCurrentSentenceBookmarked
                                        ? "Đã lưu câu này vào sổ tay (Nhấp để hủy)"
                                        : "Lưu câu này vào sổ tay luyện tập"
                                    }
                                  >
                                    <BookmarkPlus
                                      className={`w-3.5 h-3.5 ${
                                        isCurrentSentenceBookmarked ? "fill-current" : ""
                                      }`}
                                    />
                                    <span>Lưu câu</span>
                                  </button>

                                  {/* 2. Báo cáo */}
                                  <button
                                    type="button"
                                    onClick={handleReportSentence}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer select-none active:scale-95"
                                    title="Báo cáo lỗi câu này"
                                  >
                                    <Flag className="w-3.5 h-3.5" />
                                    <span>Báo cáo</span>
                                  </button>
                                </div>

                                {/* Right Group: Chỉnh cỡ chữ, Tự động tiếp, Ẩn dịch */}
                                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                                  {/* 3. Chỉnh cỡ chữ: -A / +A */}
                                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                                    <button
                                      type="button"
                                      onClick={() => handleAdjustFontSize(-1)}
                                      disabled={fontSizeLevel <= 0}
                                      className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer rounded transition-colors"
                                      title="Giảm cỡ chữ"
                                    >
                                      -A
                                    </button>
                                    <span className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
                                    <button
                                      type="button"
                                      onClick={() => handleAdjustFontSize(1)}
                                      disabled={fontSizeLevel >= 3}
                                      className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer rounded transition-colors"
                                      title="Tăng cỡ chữ"
                                    >
                                      +A
                                    </button>
                                  </div>

                                  {/* 4. Tự động chuyển câu */}
                                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    <input
                                      type="checkbox"
                                      checked={autoNextSentence}
                                      onChange={(e) => setAutoNextSentence(e.target.checked)}
                                      className="sr-only"
                                    />
                                    <div
                                      className={`w-8 h-4 rounded-full transition-colors relative ${
                                        autoNextSentence
                                          ? "bg-slate-900 dark:bg-white"
                                          : "bg-slate-200 dark:bg-slate-700"
                                      }`}
                                    >
                                      <div
                                        className={`w-3 h-3 rounded-full transition-transform absolute top-0.5 left-0.5 ${
                                          autoNextSentence
                                            ? "translate-x-4 bg-white dark:bg-slate-900 shadow-2xs"
                                            : "bg-white dark:bg-slate-300"
                                        }`}
                                      />
                                    </div>
                                    <span className="hidden sm:inline">Tự động tiếp</span>
                                  </label>

                                  {/* 5. Ẩn bản dịch */}
                                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    <input
                                      type="checkbox"
                                      checked={hideTranslation}
                                      onChange={(e) => setHideTranslation(e.target.checked)}
                                      className="sr-only"
                                    />
                                    <div
                                      className={`w-8 h-4 rounded-full transition-colors relative ${
                                        hideTranslation
                                          ? "bg-slate-900 dark:bg-white"
                                          : "bg-slate-200 dark:bg-slate-700"
                                      }`}
                                    >
                                      <div
                                        className={`w-3 h-3 rounded-full transition-transform absolute top-0.5 left-0.5 ${
                                          hideTranslation
                                            ? "translate-x-4 bg-white dark:bg-slate-900 shadow-2xs"
                                            : "bg-white dark:bg-slate-300"
                                        }`}
                                      />
                                    </div>
                                    <span className="hidden sm:inline">Ẩn dịch (i)</span>
                                  </label>
                                </div>
                              </div>

                              {/* 2. MAIN DICTATION WORKSPACE (INPUT & WORD TOKENS) */}
                              <DictationWorkspace
                                key={`dict-${currentLesson.id}-${currentSentenceIndex}`}
                                sentenceText={currentSentence.text}
                                sentenceId={currentSentenceIndex}
                                translation={
                                  currentSentence.translation || currentSentence.vietnamese
                                }
                                ipa={currentSentence.ipa}
                                playbackSpeed={playbackSpeed}
                                fontSizeLevel={fontSizeLevel}
                                hideTranslation={hideTranslation}
                                onWordClick={handleWordClick}
                                onWordMatched={(word) => {
                                  awardXp(5, "dictation");
                                }}
                                onSentenceCompleted={() => {
                                  setCompletedSentences((prev) => ({
                                    ...prev,
                                    [currentSentenceIndex]: true,
                                  }));
                                  awardXp(20, "dictation");
                                  addToast({
                                    type: "success",
                                    title: "🎉 Hoàn thành câu!",
                                    message:
                                      "+20 XP! Bạn đã gõ chính xác 100% câu này.",
                                  });
                                  // Auto-advance if enabled
                                  if (
                                    autoNextSentence &&
                                    currentSentenceIndex < totalSentencesCount - 1
                                  ) {
                                    setTimeout(() => {
                                      stopTTS();
                                      setPlayingSentenceText(null);
                                      setCurrentSentenceIndex((prev) => prev + 1);
                                      setSentencePlaybackTime(0);
                                    }, 1400);
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>

                {/* CỘT PHẢI: INTERACTIVE TRANSCRIPT & PROGRESS PANEL (Full-Height with Border-L) */}
                <div
                  className={`w-full lg:w-[380px] xl:w-[400px] 2xl:w-[420px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/90 flex flex-col min-h-0 ${
                    mobileStudioTab === "transcript" ? "flex flex-1" : "hidden lg:flex"
                  }`}
                >
                  <InteractiveTranscriptSidebar
                    transcript={currentLesson.transcript || []}
                    currentIndex={currentSentenceIndex}
                    completedSentences={completedSentences}
                    isPlaying={!!playingSentenceText}
                    onSelectSentence={(idx) => {
                      stopTTS();
                      setPlayingSentenceText(null);
                      setCurrentSentenceIndex(idx);
                      setSentencePlaybackTime(0);
                      setMobileStudioTab("dictation");
                    }}
                    onReplaySentence={(idx) => {
                      stopTTS();
                      const targetS = currentLesson.transcript?.[idx];
                      if (targetS) {
                        setPlayingSentenceText(targetS.text);
                        speakLessonText(targetS.text, {
                          rate: playbackSpeed,
                          lessonId: currentLesson.id,
                          speakerIndex: idx % 2,
                          accent: currentLesson.accent,
                          onEnd: () => setPlayingSentenceText(null),
                        });
                      }
                    }}
                    onNextSentence={() => {
                      if (currentSentenceIndex < totalSentencesCount - 1) {
                        stopTTS();
                        setPlayingSentenceText(null);
                        setCurrentSentenceIndex((prev) => prev + 1);
                        setSentencePlaybackTime(0);
                      }
                    }}
                    onResetProgress={() => {
                      setCompletedSentences({});
                      addToast({
                        type: "info",
                        title: "Đã đặt lại tiến độ bài học! ↺",
                        message: "Tiến độ học câu của bài đã được làm mới về 0%.",
                      });
                    }}
                    recommendedLessons={lessonsList
                      .filter((l) => l.id !== selectedLessonId)
                      .slice(0, 6)}
                    completedLessonIds={completedLessonIds}
                    onSelectLesson={(lessonId) => handleSelectLesson(String(lessonId))}
                    onShuffleRecommendations={() => {
                      setLessonsList((prev) => [...prev].sort(() => 0.5 - Math.random()));
                      addToast({
                        type: "info",
                        title: "Đã làm mới danh sách gợi ý bài học! ↺",
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          )}
                </>
              )}

      {/* DEEP WORD DEFINITION DICTIONARY MODAL */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="fixed bottom-[72px] sm:bottom-6 right-4 sm:right-6 z-50 w-[86vw] max-w-[290px] sm:w-[400px] sm:max-w-[400px] p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-3 font-sans max-h-[55vh] sm:max-h-[80vh] overflow-y-auto"
          >
            {/* Header: Word + Close */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display capitalize truncate">
                    {selectedWord.word}
                  </h4>
                  <span className="text-xs font-semibold text-slate-400">
                    {selectedWord.pos || "Từ vựng"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* IPA + Pronounce */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <span className="font-mono text-blue-600 dark:text-sky-400 font-bold text-xs sm:text-sm">
                {selectedWord.ipa}
              </span>
              <button
                onClick={() =>
                  speakLessonText(selectedWord.word, { lessonId: currentLesson?.id, rate: 1.0 })
                }
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-transform"
              >
                <Volume2 className="w-3.5 h-3.5 fill-white" /> Phát âm
              </button>
            </div>

            {/* Clean Structured Definition Box */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 space-y-2.5">
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {selectedWord.meaning || "Chưa có bản dịch"}
                </p>
              </div>

              {selectedWord.detailMeaning && (
                <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40">
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed not-italic">
                    "{selectedWord.detailMeaning}"
                  </p>
                </div>
              )}

              {selectedWord.example && (
                <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40 text-xs text-slate-600 dark:text-slate-400 font-normal">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Ex:
                  </span>{" "}
                  {selectedWord.example}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ListeningPage() {
  return (
    <Suspense fallback={<ListeningListingSkeleton />}>
      <ListeningPageContent />
    </Suspense>
  );
}
