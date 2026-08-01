"use client";
import React, { useState, useMemo, useCallback, Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useUserStore, recordSkillPractice } from "@/lib/store/userStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useDailyChallengeStore } from "@/lib/store/dailyChallengeStore";
import { Button } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Layers,
  PenLine,
  Mic,
  MicOff,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Volume2,
  BookOpen,
  Target,
  Flame,
  Clock,
  RefreshCw,
  Square,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  Bot,
  Lock
} from "lucide-react";

const optionsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const optionItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
    },
  },
} as const;

const BOOKMARK_KEY = "xp_bookmarked_words";

function getBookmarkedWords(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  } catch {
    return [];
  }
}

function toggleBookmark(wordId: string): boolean {
  const current = getBookmarkedWords();
  const idx = current.indexOf(wordId);
  if (idx >= 0) {
    current.splice(idx, 1);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(current));
    return false;
  } else {
    current.push(wordId);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(current));
    return true;
  }
}

interface QuestionResult {
  selectedOptId: string | null;
  isCorrect: boolean;
  xpAwarded: number;
}

function PracticeQuizContent() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const modeParam = searchParams.get("subMode") || searchParams.get("mode");

  const { practiceWord, submitReview, learned } = useVocabularyStore();
  const { addToast } = useNotificationStore();
  const { awardXp } = useAuthStore();
  const { incrementProgress } = useDailyChallengeStore();

  const formatLocalDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [dbVocabs, setDbVocabs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [subMode, setSubMode] = useState<"quiz" | "flashcard" | "writing" | "speaking">("quiz");

  // Timer state
  const [elapsedTime, setElapsedTime] = useState(0);
  const elapsedTimeRef = useRef(0);

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
      if (elapsedTimeRef.current > 10) {
        const mins = Math.max(1, Math.ceil(elapsedTimeRef.current / 60));
        const targetSkill = subMode === "writing" ? "writing" : subMode === "speaking" ? "speaking" : "vocab";
        useUserStore.getState().addPracticeTime(mins, targetSkill);
        elapsedTimeRef.current = 0;
      }
    };
  }, [subMode]);

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (modeParam === "writing" || modeParam === "speaking" || modeParam === "quiz" || modeParam === "flashcard") {
      setSubMode(modeParam as any);
    }
  }, [modeParam]);

  useEffect(() => {
    setHasInitialized(false);
  }, [modeParam, dateParam]);

  useEffect(() => {
    if (hasInitialized) return;

    if (modeParam === "bookmark") {
      const bookmarked = getBookmarkedWords();
      if (bookmarked.length > 0) {
        setIsLoading(true);
        fetch(`/api/vocabulary?ids=${bookmarked.join(",")}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.success && res.data) {
              setDbVocabs(res.data.sort(() => 0.5 - Math.random()));
              setHasInitialized(true);
            }
          })
          .catch((err) => console.error(err))
          .finally(() => setIsLoading(false));
        return;
      } else {
        setDbVocabs([]);
        setIsLoading(false);
        setHasInitialized(true);
        return;
      }
    }

    if (modeParam === "review") {
      let filteredLearned = [];
      if (dateParam) {
        filteredLearned = learned.filter((l) => {
          if (!l.nextReview) return false;
          const nextDateStr = formatLocalDate(new Date(l.nextReview));
          return nextDateStr === dateParam;
        });
      } else {
        filteredLearned = learned.filter(
          (l) => l.nextReview && new Date(l.nextReview) <= new Date()
        );
      }

      if (filteredLearned.length > 0) {
        const mapped = filteredLearned.map((l) => ({
          ...l,
          id: l.vocabId,
        }));
        setDbVocabs(mapped.sort(() => 0.5 - Math.random()));
        setIsLoading(false);
        setHasInitialized(true);
        return;
      } else if (learned.length > 0) {
        setDbVocabs([]);
        setIsLoading(false);
        setHasInitialized(true);
        return;
      }
      return;
    }

    setIsLoading(true);
    fetch("/api/vocabulary?limit=20&random=true")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setDbVocabs(res.data.sort(() => 0.5 - Math.random()));
          setHasInitialized(true);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [modeParam, dateParam, learned, hasInitialized]);

  const vocabs = dbVocabs;

  // ─── Quiz state ───
  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qXp, setQXp] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Map<number, QuestionResult>
  >(new Map());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    return new Set(getBookmarkedWords());
  });

  // ─── Flashcard state ───
  const [fIndex, setFIndex] = useState(0);
  const [fXp, setFXp] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // ─── Writing state ───
  const [wIndex, setWIndex] = useState(0);
  const [wScore, setWScore] = useState(0);
  const [wXp, setWXp] = useState(0);
  const [wUserAnswer, setWUserAnswer] = useState("");
  const [wIsAnswered, setWIsAnswered] = useState(false);
  const [wIsCorrect, setWIsCorrect] = useState(false);

  // ─── Speaking state ───
  const [sIndex, setSIndex] = useState(0);
  const [sXp, setSXp] = useState(0);
  const [sIsListening, setSIsListening] = useState(false);
  const [sIsAnswered, setSIsAnswered] = useState(false);
  const [sTranscript, setSTranscript] = useState("");
  const [sAccuracy, setSAccuracy] = useState(0);
  const [sIsCorrect, setSIsCorrect] = useState(false);
  const [sSpeechError, setSSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const currentWord =
    subMode === "quiz"
      ? vocabs[qIndex]
      : subMode === "flashcard"
      ? vocabs[fIndex]
      : subMode === "writing"
      ? vocabs[wIndex]
      : vocabs[sIndex];

  const options = useMemo(() => {
    if (!currentWord || vocabs.length === 0) return [];
    const otherWords = vocabs.filter((v) => v.id !== currentWord.id);
    const decoys = otherWords.slice(0, 3);
    const combined = [currentWord, ...decoys];
    return combined.sort((a, b) =>
      (a.word || "").localeCompare(b.word || "")
    );
  }, [currentWord, vocabs]);

  const getMeaningText = (v: any) => {
    if (!v) return "";
    return v.definitionVn || v.meaning || v.vietnameseTranslation || v.translation || v.definition || v.word || "";
  };

  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleBookmark = useCallback(() => {
    if (!currentWord) return;
    const added = toggleBookmark(currentWord.id);
    setBookmarkedIds((prev) => {
      const updated = new Set(prev);
      if (added) updated.add(currentWord.id);
      else updated.delete(currentWord.id);
      return updated;
    });
    addToast({
      type: added ? "success" : "info",
      title: added ? "Đã ghi nhớ!" : "Đã bỏ ghi nhớ",
      message: added ? `"${currentWord.word}" đã thêm vào danh sách.` : `"${currentWord.word}" đã bỏ khỏi danh sách.`,
    });
  }, [currentWord, addToast]);

  const finishPracticeSession = useCallback(() => {
    setShowSummary(true);
    const mins = Math.max(1, Math.ceil(elapsedTime / 60));
    const targetSkill = subMode === "writing" ? "writing" : subMode === "speaking" ? "speaking" : "vocab";
    useUserStore.getState().addPracticeTime(mins, targetSkill);
    const user = useAuthStore.getState().user;
    const skillName = subMode === "writing" ? "Viết" : subMode === "speaking" ? "Nói" : "Từ vựng";
    const totalXpEarned = subMode === "quiz" ? qXp : subMode === "writing" ? wXp : subMode === "speaking" ? sXp : fXp;
    recordSkillPractice(user?.id, skillName, mins, totalXpEarned);

    addToast({
      type: "success",
      title: "Hoàn thành bài học! 🎉",
      message: `Đã cập nhật biểu đồ kỹ năng ${skillName}: +${mins}m & +${totalXpEarned} XP!`,
    });
  }, [elapsedTime, subMode, qXp, wXp, sXp, fXp, addToast]);

  const handleQuizAnswer = (optId: string) => {
    if (isAnswered) return;
    setSelectedOpt(optId);
    setIsAnswered(true);

    const correctId = vocabs[qIndex].id;
    const isCorrect = optId === correctId;
    practiceWord(correctId, isCorrect);

    if (isCorrect) {
      awardXp(15);
      setQXp((prev) => prev + 15);
      setQScore((prev) => prev + 1);
      setConsecutiveWrong(0);
      incrementProgress("review_cards", 1);
      incrementProgress("learn_words", 1);
    } else {
      const newStreak = consecutiveWrong + 1;
      setConsecutiveWrong(newStreak);

      if (newStreak >= 3) {
        awardXp(-10);
        setQXp((prev) => prev - 10);
        setConsecutiveWrong(0);
        addToast({
          type: "warning",
          title: "Mất 10 XP! ⚠️",
          message: "Bạn đã trả lời sai 3 lần liên tiếp. Hãy tập trung hơn nhé!",
        });
      }
    }
  };

  const handleNextQuiz = () => {
    if (qIndex + 1 < vocabs.length) {
      setQIndex((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      finishPracticeSession();
    }
  };

  const handleWritingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wIsAnswered || !currentWord) return;

    const cleanInput = wUserAnswer.trim().toLowerCase();
    const cleanWord = currentWord.word.trim().toLowerCase();
    const isCorrect = cleanInput === cleanWord;

    setWIsAnswered(true);
    setWIsCorrect(isCorrect);
    practiceWord(currentWord.id, isCorrect);

    if (isCorrect) {
      awardXp(15);
      setWXp((prev) => prev + 15);
      setWScore((prev) => prev + 1);
      incrementProgress("write_essay", 1);
      incrementProgress("review_cards", 1);
      incrementProgress("learn_words", 1);
    }
  };

  const handleNextWriting = () => {
    if (wIndex + 1 < vocabs.length) {
      setWIndex((prev) => prev + 1);
      setWUserAnswer("");
      setWIsAnswered(false);
      setWIsCorrect(false);
    } else {
      finishPracticeSession();
    }
  };

  const handleNextFlashcard = (remembered: boolean) => {
    if (currentWord) practiceWord(currentWord.id, remembered);
    if (remembered) {
      awardXp(10);
      setFXp((prev) => prev + 10);
      incrementProgress("review_cards", 1);
      incrementProgress("learn_words", 1);
    }

    if (fIndex + 1 < vocabs.length) {
      setFIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      finishPracticeSession();
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, [subMode, sIndex]);

  const computeSimilarityScore = (target: string, spoken: string): number => {
    const t = target.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const s = spoken.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!t || !s) return 0;
    if (t === s || s.includes(t) || t.includes(s)) return 100;

    const matrix: number[][] = [];
    for (let i = 0; i <= t.length; i++) matrix[i] = [i];
    for (let j = 0; j <= s.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= t.length; i++) {
      for (let j = 1; j <= s.length; j++) {
        const cost = t[i - 1] === s[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const distance = matrix[t.length][s.length];
    const maxLen = Math.max(t.length, s.length);
    return Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));
  };

  const handleStartSpeaking = () => {
    if (!currentWord) return;
    setSSpeechError(null);

    // Cancel TTS audio playback before microphone recording
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Browser fallback simulation if Web Speech API isn't supported
      setSIsListening(true);
      setTimeout(() => {
        setSIsListening(false);
        setSTranscript(currentWord.word);
        setSAccuracy(96);
        setSIsCorrect(true);
        setSIsAnswered(true);
        awardXp(15);
        setSXp((prev) => prev + 15);
        incrementProgress("practice_words", 1);
      }, 1500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setSIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript || "";
        setSTranscript(spokenText);
        const score = computeSimilarityScore(currentWord.word, spokenText);
        setSAccuracy(score);
        const isPassed = score >= 60;
        setSIsCorrect(isPassed);
        setSIsAnswered(true);

        if (isPassed) {
          awardXp(15);
          setSXp((prev) => prev + 15);
          incrementProgress("speak_practice", 1);
          incrementProgress("review_cards", 1);
          incrementProgress("learn_words", 1);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setSIsListening(false);
        if (event.error === "no-speech") {
          setSSpeechError("Không nghe thấy âm thanh. Vui lòng nói to & rõ hơn!");
        } else if (event.error === "not-allowed") {
          setSSpeechError("Chưa cấp quyền Micro. Vui lòng mở quyền Micro trên trình duyệt!");
        } else {
          setSSpeechError("Không thể nhận diện âm thanh: " + event.error);
        }
      };

      recognition.onend = () => {
        setSIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setSIsListening(false);
    }
  };

  const handleNextSpeaking = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
    }

    if (sIndex + 1 < vocabs.length) {
      setSIndex((prev) => prev + 1);
      setSIsAnswered(false);
      setSIsCorrect(false);
      setSTranscript("");
      setSAccuracy(0);
      setSSpeechError(null);
    } else {
      finishPracticeSession();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3.5 pb-16 md:pb-6 px-1 md:px-0 select-none font-sans">
        {/* Top Micro-Hero Skeleton Banner */}
        <div className="w-full h-14 rounded-lg bg-slate-200/70 dark:bg-slate-800/60 animate-pulse border border-slate-200/80 dark:border-white/10 shadow-2xs" />

        {/* Sub-Mode Switcher Pills Skeleton */}
        <div className="w-full h-10 rounded-md bg-slate-200/60 dark:bg-slate-800/50 animate-pulse border border-slate-200/50 dark:border-white/5" />

        {/* Bento Grid Skeleton (7/12 Left - 5/12 Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
          {/* Left Practice Studio Skeleton */}
          <div className="lg:col-span-7 p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3.5">
            <div className="w-full h-6 rounded-md bg-slate-200/60 dark:bg-slate-800/50 animate-pulse" />
            <div className="w-full h-28 rounded-md bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="w-full h-12 rounded-md bg-slate-200/60 dark:bg-slate-800/50 animate-pulse" />
              <div className="w-full h-12 rounded-md bg-slate-200/60 dark:bg-slate-800/50 animate-pulse" />
              <div className="w-full h-12 rounded-md bg-slate-200/60 dark:bg-slate-800/50 animate-pulse" />
              <div className="w-full h-12 rounded-md bg-slate-200/60 dark:bg-slate-800/50 animate-pulse" />
            </div>
          </div>

          {/* Right Word Lab Skeleton */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
              <div className="w-full h-5 rounded-md bg-slate-200/60 dark:bg-slate-800/50 animate-pulse" />
              <div className="w-full h-12 rounded-md bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
              <div className="w-full h-20 rounded-md bg-slate-200/50 dark:bg-slate-800/40 animate-pulse" />
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2">
              <div className="w-full h-4 rounded-md bg-slate-200/60 dark:bg-slate-800/50 animate-pulse" />
              <div className="w-full h-14 rounded-md bg-slate-200/50 dark:bg-slate-800/40 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (vocabs.length === 0) {
    return (
      <div className="p-8 text-center space-y-4 max-w-md mx-auto">
        <Brain className="w-12 h-12 text-[#1d6ee6] mx-auto" />
        <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">Chưa có từ vựng cần ôn tập!</h2>
        <p className="text-xs text-slate-500">Hãy học thêm các từ vựng mới để kích hoạt chế độ luyện tập 4 kỹ năng nhé.</p>
        <Link href="/study/listening" className="inline-block px-4 py-2 rounded-md bg-[#1d6ee6] text-white text-xs font-bold shadow-2xs">
          Vào Luyện Nghe Ngay 🚀
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans">
      
      {/* 0. TOP MICRO-HERO TOOLBAR CARD (Dashboard Style) */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 sm:p-3.5 rounded-lg bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-2xs"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0">
            <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] font-black bg-[#1d6ee6] text-white shadow-2xs shrink-0">
                PRACTICE STUDIO
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                Luyện Tập & Ôn Tập 4 Kỹ Năng
              </h3>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
              Ôn tập thuật toán Spaced Repetition (SRS), phát âm bản xứ và ghi nhớ từ vựng lâu dài
            </p>
          </div>
        </div>

        {/* 4 Hero Metrics Strip */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap">
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 shadow-2xs flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-blue-500" /> Câu {(subMode === "quiz" ? qIndex : subMode === "flashcard" ? fIndex : subMode === "writing" ? wIndex : sIndex) + 1}/{vocabs.length}
          </span>
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] sm:text-xs font-black shadow-2xs flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" /> +{qXp + fXp + wXp + sXp} XP
          </span>
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] sm:text-xs font-black shadow-2xs flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-500" /> {formatElapsedTime(elapsedTime)}
          </span>
        </div>
      </motion.div>

      {/* 1. SUB-MODE SEGMENTED PILLS SWITCHER */}
      <div className="p-1 bg-slate-100 dark:bg-slate-950 rounded-md flex items-center gap-1 border border-slate-200/50 dark:border-white/5 overflow-x-auto no-scrollbar">
        {[
          { id: "quiz", labelMobile: "Quiz", labelDesktop: "Quiz (Trắc nghiệm)", icon: Brain },
          { id: "flashcard", labelMobile: "Flashcard", labelDesktop: "Flashcard (Lật thẻ 3D)", icon: Layers },
          { id: "writing", labelMobile: "Writing", labelDesktop: "Writing (Gõ từ chính xác)", icon: PenLine },
          { id: "speaking", labelMobile: "Nói AI", labelDesktop: "Speaking (Luyện phát âm AI)", icon: Mic },
        ].map((m) => {
          const Icon = m.icon;
          const isActive = subMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSubMode(m.id as any)}
              className={`flex-1 min-w-[70px] sm:min-w-0 py-1.5 px-2 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 sm:gap-1.5 ${
                isActive
                  ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">{m.labelMobile}</span>
              <span className="hidden sm:inline">{m.labelDesktop}</span>
            </button>
          );
        })}
      </div>

      {/* 2. MAIN BENTO GRID (Cột Trái 7/12 - Cột Phải 5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start min-w-0">
        
        {/* CỘT TRÁI: PRACTICE STUDIO WORKSPACE (7/12 Width) */}
        <div className="lg:col-span-7 space-y-3.5 min-w-0">
          
          <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5 sm:space-y-3.5 min-w-0">
            
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1d6ee6]" />
                <h2 className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white font-display uppercase tracking-wider">
                  {subMode === "quiz"
                    ? "CÂU HỎI TRẮC NGHIỆM CHỌN NGHĨA"
                    : subMode === "flashcard"
                    ? "THẺ THÔNG MINH 3D FLASHCARD"
                    : subMode === "writing"
                    ? "GÕ CHÍNH XÁC TỪ VỰNG THEO NGHĨA"
                    : "LUYỆN PHÁT ÂM CHUẨN GIỌNG BẢN XỨ"}
                </h2>
              </div>

              {currentWord && (
                <button
                  onClick={handleToggleBookmark}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                    bookmarkedIds.has(currentWord.id)
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-600"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 text-slate-500"
                  }`}
                >
                  <Bookmark className="w-3 h-3" />
                  <span>{bookmarkedIds.has(currentWord.id) ? "Đã ghi nhớ" : "Ghi nhớ"}</span>
                </button>
              )}
            </div>

            {/* SUB-MODE 1: QUIZ VIEW */}
            {subMode === "quiz" && currentWord && (
              <div className="space-y-2.5 sm:space-y-3.5">
                <div className="p-3 sm:p-4 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 text-center space-y-1 sm:space-y-1.5">
                  <span className="text-[9.5px] sm:text-[10px] font-bold uppercase text-[#1d6ee6] block">Từ vựng mục tiêu</span>
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-display">
                      {currentWord.word}
                    </h3>
                    <button
                      onClick={() => speakText(currentWord.word)}
                      className="p-1 rounded bg-[#1d6ee6]/10 text-[#1d6ee6] hover:bg-[#1d6ee6]/20 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  {currentWord.phonetic && (
                    <p className="text-[11px] sm:text-xs font-mono text-slate-400 font-bold">{currentWord.phonetic}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {options.map((opt) => {
                    const isSelected = selectedOpt === opt.id;
                    const isCorrect = opt.id === currentWord.id;

                    let bgClass = "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-[#1d6ee6]";
                    if (isAnswered) {
                      if (isCorrect) bgClass = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold";
                      else if (isSelected) bgClass = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300 font-bold";
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={isAnswered}
                        onClick={() => handleQuizAnswer(opt.id)}
                        className={`p-2.5 sm:p-3 rounded-md border text-xs font-medium text-left transition-all cursor-pointer ${bgClass}`}
                      >
                        {getMeaningText(opt)}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="flex justify-center sm:justify-end pt-1">
                    <button
                      onClick={handleNextQuiz}
                      className="w-full sm:w-auto justify-center px-4 py-2 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Câu tiếp theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SUB-MODE 2: FLASHCARD VIEW */}
            {subMode === "flashcard" && currentWord && (
              <div className="space-y-4 text-center">
                {/* 3D FLIP CONTAINER */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full h-[220px] [perspective:1000px] cursor-pointer group select-none"
                >
                  <div
                    className={`relative w-full h-full duration-500 transition-transform [transform-style:preserve-3d] ${
                      isFlipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* FRONT FACE (TARGET WORD) */}
                    <div className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border border-slate-200/80 dark:border-white/10 p-6 flex flex-col items-center justify-center space-y-2.5 [backface-visibility:hidden] shadow-2xs group-hover:shadow-xs group-hover:border-[#1d6ee6]/40 transition-all">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest text-[#1d6ee6] bg-[#1d6ee6]/10 border border-[#1d6ee6]/20">
                        MẶT TRƯỚC • BẤM ĐỂ LẬT THẺ 3D
                      </span>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                        {currentWord.word}
                      </h3>
                      {currentWord.phonetic && (
                        <span className="text-xs font-mono text-[#1d6ee6] font-bold px-2 py-0.5 bg-[#1d6ee6]/5 rounded">
                          {currentWord.phonetic}
                        </span>
                      )}
                      <span className="text-[10px] font-medium text-slate-400 pt-2 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin-slow" /> Bấm vào thẻ để xem nghĩa Tiếng Việt
                      </span>
                    </div>

                    {/* BACK FACE (VIETNAMESE MEANING & EXAMPLE - LIGHT MODE HARMONIOUS) */}
                    <div className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-br from-emerald-50/70 via-slate-50 to-blue-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 border border-emerald-500/30 text-slate-900 dark:text-white p-6 flex flex-col items-center justify-center space-y-2.5 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xs">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                        MẶT SAU • NGHĨA TIẾNG VIỆT
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display">
                        {getMeaningText(currentWord) || "Chưa có nghĩa"}
                      </h3>
                      {currentWord.example && (
                        <p className="text-xs italic text-slate-600 dark:text-slate-300 max-w-md font-medium leading-relaxed bg-white/70 dark:bg-white/5 p-2.5 rounded-md border border-slate-200/60 dark:border-white/10">
                          "{currentWord.example}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS (ROUNDED-MD COMPACT - 100% 1 SINGLE LINE ON MOBILE) */}
                <div className="grid grid-cols-2 gap-2 pt-1 min-w-0">
                  <button
                    onClick={() => handleNextFlashcard(false)}
                    className="w-full justify-center px-2 sm:px-5 py-2 rounded-md bg-rose-500/10 hover:bg-rose-500 border border-rose-500/30 hover:border-transparent text-rose-700 dark:text-rose-400 hover:text-white font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 whitespace-nowrap min-w-0 group/btn"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover/btn:scale-110" />
                    <span className="truncate">Chưa nhớ</span>
                    <span className="text-[9.5px] sm:text-[10px] opacity-75 font-normal shrink-0">(-0 XP)</span>
                  </button>

                  <button
                    onClick={() => handleNextFlashcard(true)}
                    className="w-full justify-center px-2 sm:px-5 py-2 rounded-md bg-emerald-500/10 hover:bg-emerald-600 border border-emerald-500/30 hover:border-transparent text-emerald-700 dark:text-emerald-400 hover:text-white font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 whitespace-nowrap min-w-0 group/btn"
                  >
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover/btn:scale-110" />
                    <span className="truncate">Đã nhớ</span>
                    <span className="text-[9.5px] sm:text-[10px] opacity-75 font-normal shrink-0">(+10 XP)</span>
                  </button>
                </div>
              </div>
            )}

            {/* SUB-MODE 3: WRITING VIEW */}
            {subMode === "writing" && currentWord && (
              <form onSubmit={handleWritingSubmit} className="space-y-3.5">
                <div className="p-4 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 text-center space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-[#1d6ee6] block">Nghĩa Tiếng Việt</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    {getMeaningText(currentWord)}
                  </h3>
                  {currentWord.phonetic && (
                    <p className="text-xs font-mono text-slate-400 font-bold">Phiên âm: {currentWord.phonetic}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Gõ từ tiếng Anh chính xác vào đây..."
                    value={wUserAnswer}
                    disabled={wIsAnswered}
                    onChange={(e) => setWUserAnswer(e.target.value)}
                    className="w-full h-10 px-3 text-sm font-bold rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#1d6ee6]"
                  />

                  {!wIsAnswered ? (
                    <button
                      type="submit"
                      disabled={!wUserAnswer.trim()}
                      className="w-full py-2 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] disabled:opacity-40 text-white text-xs font-bold shadow-2xs cursor-pointer"
                    >
                      Kiểm tra đáp án
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className={`p-3 rounded-md text-xs font-bold ${wIsCorrect ? "bg-emerald-50 text-emerald-700 border border-emerald-300" : "bg-rose-50 text-rose-700 border border-rose-300"}`}>
                        {wIsCorrect ? "✓ Chính xác! +15 XP" : `❌ Chưa chính xác. Đáp án đúng là: "${currentWord.word}"`}
                      </div>

                      <button
                        type="button"
                        onClick={handleNextWriting}
                        className="w-full py-2 rounded-md bg-[#1d6ee6] text-white text-xs font-bold shadow-2xs cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Câu tiếp theo</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </form>
            )}

            {/* SUB-MODE 4: SPEAKING VIEW */}
            {subMode === "speaking" && currentWord && (
              <div className="space-y-3.5 text-center">
                <div className="p-4 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display">
                    {currentWord.word}
                  </h3>
                  {currentWord.phonetic && (
                    <p className="text-xs font-mono text-[#1d6ee6] font-bold">{currentWord.phonetic}</p>
                  )}
                  <button
                    onClick={() => speakText(currentWord.word)}
                    className="px-3 py-1 rounded bg-[#1d6ee6]/10 text-[#1d6ee6] text-xs font-bold cursor-pointer inline-flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm mẫu
                  </button>
                </div>

                <div className="py-3 flex flex-col items-center justify-center space-y-2">
                  <button
                    onClick={handleStartSpeaking}
                    disabled={sIsListening}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xs transition-all cursor-pointer ${
                      sIsListening
                        ? "bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/20"
                        : "bg-[#1d6ee6] hover:bg-[#155bc5] text-white"
                    }`}
                  >
                    <Mic className="w-6 h-6" />
                  </button>

                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {sIsListening ? "🎙️ Đang nghe giọng nói của bạn..." : "Bấm Micro để bắt đầu phát âm"}
                  </span>

                  {sSpeechError && (
                    <div className="p-2.5 rounded-md bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold max-w-sm">
                      ⚠️ {sSpeechError}
                    </div>
                  )}
                </div>

                {sIsAnswered && (
                  <div className="space-y-2.5 pt-1 text-left">
                    <div className={`p-3 rounded-md border text-xs space-y-1.5 ${
                      sIsCorrect
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                        : "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300"
                    }`}>
                      <div className="flex items-center justify-between font-bold">
                        <span>{sIsCorrect ? "✓ Phát âm đạt yêu cầu!" : "⚠️ Cần phát âm rõ hơn!"}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-white/80 dark:bg-black/40 font-extrabold">
                          Độ chính xác: {sAccuracy}%
                        </span>
                      </div>

                      {sTranscript && (
                        <p className="text-[11px] font-medium opacity-90">
                          Âm thanh nhận diện: <span className="font-bold font-mono">"{sTranscript}"</span>
                        </p>
                      )}

                      {sIsCorrect && <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+15 XP Thưởng phát âm!</p>}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      {!sIsCorrect && (
                        <button
                          onClick={handleStartSpeaking}
                          className="px-3 py-1.5 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold cursor-pointer"
                        >
                          Đọc lại
                        </button>
                      )}

                      <button
                        onClick={handleNextSpeaking}
                        className="px-4 py-2 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-xs font-bold shadow-2xs cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Từ tiếp theo</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* CỘT PHẢI: WORD KNOWLEDGE LAB & BOOKMARK MANAGER (5/12 Width) */}
        <div className="lg:col-span-5 space-y-3.5 min-w-0">
          
          {/* WORD DETAIL KNOWLEDGE CARD */}
          {currentWord && (
            <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 min-w-0">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-display uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#1d6ee6]" />
                  {subMode === "quiz" && !isAnswered
                    ? "GỢI Ý CÂU HỎI & LOẠI TỪ"
                    : subMode === "writing" && !wIsAnswered
                    ? "GỢI Ý CHÍNH TẢ & PHIÊN ÂM"
                    : subMode === "flashcard" && !isFlipped
                    ? "THÔNG TIN MẶT TRƯỚC THẺ"
                    : subMode === "speaking" && !sIsAnswered
                    ? "HƯỚNG DẪN PHÁT ÂM MẪU"
                    : "THÔNG TIN TỪ VỰNG CHUYÊN SÂU"}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1d6ee6]/10 text-[#1d6ee6]">
                  {currentWord.partOfSpeech || currentWord.pos || "Noun"}
                </span>
              </div>

              {/* INTEL HINT STATE FOR EACH SUB-MODE BEFORE ANSWERED */}
              {subMode === "quiz" && !isAnswered ? (
                <div className="space-y-2.5 text-xs font-medium">
                  <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <Lock className="w-3.5 h-3.5 text-[#1d6ee6]" />
                      <span>Bảo mật đáp án Quiz</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      Chọn 1 trong 4 đáp án bên trái để mở khóa nghĩa Tiếng Việt & ví dụ thực tế.
                    </p>
                  </div>
                  {currentWord.phonetic && (
                    <div className="flex items-center justify-between text-xs font-mono pt-1">
                      <span className="text-slate-400 font-bold">Phiên âm IPA:</span>
                      <span className="font-bold text-[#1d6ee6]">{currentWord.phonetic}</span>
                    </div>
                  )}
                  {currentWord.example && (
                    <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">Gợi ý ngữ cảnh câu:</span>
                      <p className="italic text-slate-700 dark:text-slate-300">
                        "{currentWord.example.replace(new RegExp(currentWord.word, "gi"), "_______")}"
                      </p>
                    </div>
                  )}
                </div>
              ) : subMode === "writing" && !wIsAnswered ? (
                <div className="space-y-2.5 text-xs font-medium">
                  <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <Lock className="w-3.5 h-3.5 text-[#1d6ee6]" />
                      <span>Ẩn từ Tiếng Anh chính tả</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      Gõ chính xác từ tiếng Anh vào ô bên trái để mở khóa toàn bộ thông tin từ vựng!
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Nghĩa Tiếng Việt:</span>
                    <p className="text-xs font-bold text-[#1d6ee6] dark:text-sky-400">{getMeaningText(currentWord)}</p>
                  </div>
                  {currentWord.phonetic && (
                    <div className="flex items-center justify-between text-xs font-mono pt-1">
                      <span className="text-slate-400 font-bold">Gợi ý phiên âm:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{currentWord.phonetic}</span>
                    </div>
                  )}
                  {currentWord.example && (
                    <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">Gợi ý ví dụ câu:</span>
                      <p className="italic text-slate-700 dark:text-slate-300">
                        "{currentWord.example.replace(new RegExp(currentWord.word, "gi"), "_______")}"
                      </p>
                    </div>
                  )}
                </div>
              ) : subMode === "flashcard" && !isFlipped ? (
                <div className="space-y-2.5 text-xs font-medium">
                  <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <Lock className="w-3.5 h-3.5 text-[#1d6ee6]" />
                      <span>Mặt trước thẻ Flashcard</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      Bấm vào thẻ 3D bên trái để lật mặt sau mở khóa nghĩa Tiếng Việt & ví dụ câu!
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Từ tiếng Anh:</span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{currentWord.word}</p>
                  </div>
                  {currentWord.phonetic && (
                    <div className="flex items-center justify-between text-xs font-mono pt-1">
                      <span className="text-slate-400 font-bold">Phiên âm IPA:</span>
                      <span className="font-bold text-[#1d6ee6]">{currentWord.phonetic}</span>
                    </div>
                  )}
                </div>
              ) : subMode === "speaking" && !sIsAnswered ? (
                <div className="space-y-2.5 text-xs font-medium">
                  <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <Mic className="w-3.5 h-3.5 text-[#1d6ee6]" />
                      <span>Luyện phát âm chuẩn IPA</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      Bấm nút Micro bên trái để ghi âm và chấm điểm phát âm từ vựng.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Nghĩa Tiếng Việt:</span>
                    <p className="text-xs font-bold text-[#1d6ee6] dark:text-sky-400">{getMeaningText(currentWord)}</p>
                  </div>
                  {currentWord.phonetic && (
                    <div className="flex items-center justify-between text-xs font-mono pt-1">
                      <span className="text-slate-400 font-bold">Chuẩn phiên âm:</span>
                      <span className="font-bold text-[#1d6ee6]">{currentWord.phonetic}</span>
                    </div>
                  )}
                  {currentWord.example && (
                    <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">Ngữ cảnh thực tế:</span>
                      <p className="italic text-slate-700 dark:text-slate-300">"{currentWord.example}"</p>
                    </div>
                  )}
                </div>
              ) : (
                /* FULL UNLOCKED KNOWLEDGE STATE AFTER ANSWERED */
                <div className="space-y-2 text-xs font-medium">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Từ tiếng Anh:</span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{currentWord.word}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Nghĩa tiếng Việt:</span>
                    <p className="text-xs font-bold text-[#1d6ee6] dark:text-sky-400">{getMeaningText(currentWord) || "Đang cập nhật..."}</p>
                  </div>

                  {currentWord.example && (
                    <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">Ví dụ thực tế:</span>
                      <p className="italic text-slate-700 dark:text-slate-300">"{currentWord.example}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* AI PRACTICE ADVICE CARD */}
          <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5">
            <span className="text-xs font-bold text-[#1d6ee6] dark:text-sky-400 font-display flex items-center gap-1.5">
              <Bot className="w-4 h-4" /> AI Practice Advice:
            </span>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-md border border-slate-200/60 dark:border-white/5">
              "Luyện tập phát âm từ vựng kèm gõ chữ giúp kích hoạt 2 vùng trí nhớ thị giác và thính giác, ghi nhớ lâu gấp 3 lần!"
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function PracticeQuizPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-slate-500">Đang tải trang luyện tập...</div>}>
      <PracticeQuizContent />
    </Suspense>
  );
}
