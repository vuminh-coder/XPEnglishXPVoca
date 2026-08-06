"use client";
import React, { use, useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { MOCK_THEMES } from "@/lib/constants";
import { getSemanticThemeIcon } from "../VocabularyThemesClientList";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useUserStore, recordSkillPractice } from "@/lib/store/userStore";
import { useDailyChallengeStore } from "@/lib/store/dailyChallengeStore";
import { safeSpeakText } from "@/lib/utils/mobileAudio";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Layers,
  List,
  Heart,
  Volume2,
  Volume1,
  Zap,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Target,
  Search,
  Bot,
  Send,
  RotateCw,
  Check,
  X,
  Sparkles,
  Bookmark,
  Eye,
  EyeOff,
  Lightbulb,
  Shuffle,
  Globe,
  Flame,
  Award,
  VolumeX,
} from "lucide-react";

import { containerVariants, itemVariants } from "@/components/shared/PageEntranceAnimation";

export default function ThemeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [vocabs, setVocabs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toggleFavorite, learned, practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();

  // Find theme metadata or fallback
  const theme = useMemo(() => {
    const found = MOCK_THEMES.find((t) => t.id === id);
    if (found) return found;
    return {
      id,
      name: `Chủ đề ${id.toUpperCase()}`,
      nameEn: `Theme ${id}`,
      icon: "⛺",
      difficulty: 2,
      totalVocabs: vocabs.length || 20,
      color: "#0059bb",
    };
  }, [id, vocabs.length]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/vocabulary?themeId=${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setVocabs(res.data);
        }
      })
      .catch((err) => console.error("Error fetching vocabs:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

  // Page States
  const [toast, setToast] = useState<{ title: string; body: string } | null>(null);
  const [viewMode, setViewMode] = useState<"flashcard" | "list" | "quiz" | "ai">("flashcard");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Flashcard Interactive Studio States
  const [showAiHint, setShowAiHint] = useState(false);
  const [isWordMasked, setIsWordMasked] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // List Mode Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "unlearned" | "learned" | "favorite">("all");

  // Quiz Mode States
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // AI Coach States
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Computed Theme Metrics
  const learnedCount = useMemo(() => {
    if (!vocabs.length) return 0;
    const vocabIds = new Set(vocabs.map((v) => v.id));
    return learned.filter(
      (l) => vocabIds.has(l.vocabId) && (l.isLearned || (l.proficiency && l.proficiency > 0))
    ).length;
  }, [vocabs, learned]);

  const favoriteCount = useMemo(() => {
    if (!vocabs.length) return 0;
    const vocabIds = new Set(vocabs.map((v) => v.id));
    return learned.filter((l) => vocabIds.has(l.vocabId) && l.isFavorite).length;
  }, [vocabs, learned]);

  const unlearnedCount = useMemo(() => {
    return Math.max(0, vocabs.length - learnedCount);
  }, [vocabs.length, learnedCount]);

  const progressPercent = useMemo(() => {
    if (!vocabs.length) return 0;
    return Math.round((learnedCount / vocabs.length) * 100);
  }, [vocabs, learnedCount]);

  const activeVocab = vocabs[currentIndex];
  const activeState = useMemo(
    () => (activeVocab ? learned.find((l) => l.vocabId === activeVocab.id) : null),
    [activeVocab, learned]
  );
  const isCurrentFav = activeState?.isFavorite || false;
  const isCurrentBookmarked = activeVocab ? bookmarkedIds.includes(activeVocab.id) : false;

  const activeTimeRef = React.useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      activeTimeRef.current += 1;
    }, 1000);

    return () => {
      clearInterval(timer);
      if (activeTimeRef.current > 10) {
        const mins = Math.max(1, Math.ceil(activeTimeRef.current / 60));
        useUserStore.getState().addPracticeTime(mins, "vocab");
        activeTimeRef.current = 0;
      }
    };
  }, []);

  const showToastMsg = (title: string, body: string) => {
    setToast({ title, body });
    setTimeout(() => setToast(null), 3000);
  };

  const speak = (word: string, rate = 0.9, lang = "en-US") => {
    safeSpeakText(word, { rate, lang });
  };

  // Auto-play audio when switching cards if autoPlayAudio is enabled
  useEffect(() => {
    if (autoPlayAudio && activeVocab && viewMode === "flashcard" && !isFlipped) {
      speak(activeVocab.word, 0.9);
    }
  }, [currentIndex, autoPlayAudio, viewMode]);

  // Keyboard navigation for Flashcard 3D mode
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (viewMode === "flashcard" && vocabs.length > 0) {
        if (e.code === "Space") {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        } else if (e.code === "ArrowLeft") {
          e.preventDefault();
          setIsFlipped(false);
          setCurrentIndex((prev) => (prev > 0 ? prev - 1 : vocabs.length - 1));
        } else if (e.code === "ArrowRight") {
          e.preventDefault();
          setIsFlipped(false);
          setCurrentIndex((prev) => (prev < vocabs.length - 1 ? prev + 1 : 0));
        }
      }
    },
    [viewMode, vocabs.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Filtered Vocabularies for List View
  const filteredVocabs = useMemo(() => {
    return vocabs.filter((v) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        v.word.toLowerCase().includes(q) ||
        (v.phonetic && v.phonetic.toLowerCase().includes(q)) ||
        (v.definitionVn && v.definitionVn.toLowerCase().includes(q)) ||
        (v.definition && v.definition.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      const state = learned.find((l) => l.vocabId === v.id);
      if (filterStatus === "learned") return !!state?.isLearned;
      if (filterStatus === "unlearned") return !state?.isLearned;
      if (filterStatus === "favorite") return !!state?.isFavorite;

      return true;
    });
  }, [vocabs, searchQuery, filterStatus, learned]);

  // Generate Quiz Options for Current Question
  const currentQuizItem = vocabs[quizIndex];
  const quizOptions = useMemo(() => {
    if (!currentQuizItem || vocabs.length < 2) return [];

    const correctDef = currentQuizItem.definitionVn;
    const distractors = vocabs
      .filter((v) => v.id !== currentQuizItem.id)
      .map((v) => v.definitionVn)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const all = [correctDef, ...distractors].sort(() => Math.random() - 0.5);
    return all;
  }, [currentQuizItem, vocabs, quizIndex]);

  const handleAnswerQuiz = (optIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswer(optIndex);
    setIsQuizSubmitted(true);

    const isCorrect = quizOptions[optIndex] === currentQuizItem.definitionVn;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      practiceWord(currentQuizItem.id, true);
      useDailyChallengeStore.getState().incrementProgress("review_cards", 1);
      useDailyChallengeStore.getState().incrementProgress("learn_words", 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex < vocabs.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsQuizSubmitted(false);
    } else {
      setQuizFinished(true);
      const bonusXp = quizScore * 5 + 10;
      awardXp(bonusXp);
      useUserStore.getState().addPracticeTime(3, "vocab");
      const currentUser = useAuthStore.getState().user;
      recordSkillPractice(currentUser?.id, "Từ vựng", 3, bonusXp);
      useDailyChallengeStore.getState().incrementProgress("review_cards", 1);
      useDailyChallengeStore.getState().incrementProgress("learn_words", 1);
      showToastMsg("Hoàn thành bài tập! 🎉", `Bạn đã nhận +${bonusXp} XP thưởng & +3 phút học!`);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setIsQuizSubmitted(false);
    setQuizFinished(false);
  };

  const handleAiAsk = async (queryText?: string) => {
    const textToSend = queryText || aiQuestion;
    if (!textToSend.trim() || isAiLoading) return;

    setIsAiLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              text: `Hỏi về từ vựng thuộc chủ đề ${theme.name} (${theme.nameEn}): ${textToSend}`,
            },
          ],
        }),
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setAiResponse(data.reply);
        awardXp(10);
        showToastMsg("AI Tutor trả lời! 🤖", "+10 XP chủ động học hỏi.");
      } else {
        setAiResponse("Hệ thống AI đang bận. Vui lòng thử lại sau giây lát!");
      }
    } catch (err) {
      console.error(err);
      setAiResponse("Không có kết nối mạng. Vui lòng kiểm tra lại kết nối.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const toggleBookmark = (vocabId: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(vocabId);
      if (exists) {
        showToastMsg("Đánh dấu", "Đã gỡ bookmark từ vựng.");
        return prev.filter((id) => id !== vocabId);
      } else {
        showToastMsg("Đánh dấu 🔖", "Đã lưu vào danh sách xem lại.");
        return [...prev, vocabId];
      }
    });
  };

  const getMaskedWord = (word: string) => {
    if (!word) return "";
    return word
      .split("")
      .map((char, i) => (i === 0 || i === word.length - 1 || char === " " ? char : "_ "))
      .join("");
  };

  // Rule 1: Skeleton Loading State
  if (isLoading) {
    return (
      <div className="space-y-4 pb-16 md:pb-6 select-none animate-pulse">
        <div className="p-5 rounded-xs bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-2">
                <div className="h-6 w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
            <div className="h-9 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-xs bg-slate-100 dark:bg-slate-800/50" />
            ))}
          </div>
        </div>
        <div className="h-10 w-80 rounded-xs bg-slate-200 dark:bg-slate-900/60" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 rounded-xs bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-16 md:pb-6 px-1 md:px-0 select-none font-sans" suppressHydrationWarning>
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed bottom-6 right-6 z-[600]"
          >
            <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200/90 dark:border-white/10 p-3.5 rounded-xs shadow-xl flex items-center gap-3 max-w-md">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={2} />
              <div>
                <div className="text-xs font-bold font-display text-slate-900 dark:text-white">{toast.title}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{toast.body}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO HEADER CARD (Dashboard Bento Style) */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 110, damping: 20 }}
        className="p-3.5 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 sm:space-y-4"
      >
        {/* Upper Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link
              href="/vocabulary"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs flex items-center justify-center border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shrink-0"
              title="Quay lại danh sách chủ đề"
              aria-label="Quay lại danh sách từ vựng"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
            </Link>

            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              {/* Theme Icon Avatar Badge */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-gradient-to-br from-[#0059bb]/10 to-indigo500/10 dark:from-[#0059bb]/20 dark:to-indigo-500/20 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs">
                {getSemanticThemeIcon(theme)}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
                    {theme.name}
                  </h1>
                  <span className="px-1.5 py-0.5 rounded-xs text-[8.5px] sm:text-[9px] font-black uppercase bg-[#0059bb]/10 dark:bg-sky-500/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 dark:border-sky-500/20">
                    Cấp độ {theme.difficulty}/5
                  </span>
                  <span className="px-1.5 py-0.5 rounded-xs text-[8.5px] sm:text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    CEFR B1-B2
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {theme.nameEn} • Tổng hợp từ vựng thông dụng chuẩn bản ngữ
                </p>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (vocabs.length > 0) {
                  practiceWord(vocabs[0].id, true);
                  awardXp(15);
                  showToastMsg("Bắt đầu ôn tập", "Đã khởi động bài luyện tập! +15 XP");
                }
              }}
              className="w-full sm:w-auto py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-[11px] sm:text-xs font-extrabold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Luyện ngay +15 XP
            </button>
          </div>
        </div>

        {/* Hero Metrics Strip (4 Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-0.5">
          <div className="p-2.5 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
            <div>
              <div className="text-[9.5px] sm:text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                Tổng từ vựng
              </div>
              <div className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white font-display mt-0.5">
                {vocabs.length} <span className="text-[10px] sm:text-xs font-medium text-slate-400">từ</span>
              </div>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
            <div>
              <div className="text-[9.5px] sm:text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                Đã thành thạo
              </div>
              <div className="text-sm sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 font-display mt-0.5">
                {learnedCount} <span className="text-[10px] sm:text-xs font-medium text-slate-400">từ</span>
              </div>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
            <div>
              <div className="text-[9.5px] sm:text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                Từ yêu thích
              </div>
              <div className="text-sm sm:text-lg font-bold text-rose-500 dark:text-rose-400 font-display mt-0.5">
                {favoriteCount} <span className="text-[10px] sm:text-xs font-medium text-slate-400">từ</span>
              </div>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-rose-500/20" />
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
            <div className="flex-1 pr-2">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] sm:text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
                  Tiến độ
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-1 sm:mt-1.5">
                <div
                  className="h-full bg-gradient-to-r from-[#0059bb] to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. MODE NAVIGATION TABS - SPLIT BAR DASHBOARD STYLE */}
      {/* 2. MODE NAVIGATION TABS - SPLIT BAR DASHBOARD STYLE */}
      <div className="p-1 sm:p-1.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
        {/* Left Side: 2 Main View Modes */}
        <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/60 p-1 rounded-xs w-full sm:w-auto">
          <button
            onClick={() => setViewMode("flashcard")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xs transition-all select-none cursor-pointer ${
              viewMode === "flashcard"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-black"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
            }`}
          >
            <Layers className="w-3.5 h-3.5 stroke-[2] shrink-0" />
            <span>Flashcard 3D</span>
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xs transition-all select-none cursor-pointer ${
              viewMode === "list"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-black"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
            }`}
          >
            <List className="w-3.5 h-3.5 stroke-[2] shrink-0" />
            <span>Danh sách từ ({filteredVocabs.length})</span>
          </button>
        </div>

        {/* Right Side: 2 Interactive Practice & AI Tools */}
        <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/60 p-1 rounded-xs w-full sm:w-auto">
          <button
            onClick={() => setViewMode("quiz")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xs transition-all select-none cursor-pointer ${
              viewMode === "quiz"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-black"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
            }`}
          >
            <Zap className="w-3.5 h-3.5 stroke-[2] text-amber-500 shrink-0" />
            <span>Kiểm tra nhanh</span>
          </button>

          <button
            onClick={() => setViewMode("ai")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xs transition-all select-none cursor-pointer ${
              viewMode === "ai"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-black"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
            }`}
          >
            <Bot className="w-3.5 h-3.5 stroke-[2] text-purple-500 shrink-0" />
            <span>AI Coach</span>
          </button>
        </div>
      </div>

      {/* 3. MODE CONTENT PANELS */}

      {/* MODE 1: FLASHCARD 3D - CLEAN MINIMALIST DASHBOARD DESIGN */}
      {viewMode === "flashcard" && activeVocab && (
        <div className="max-w-md sm:max-w-lg mx-auto space-y-3.5 sm:space-y-4">
          {/* 3D Perspective Flashcard Container */}
          <div className="perspective-[1500px] w-full">
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 75, damping: 16 }}
              className="relative w-full min-h-[270px] sm:min-h-[300px] rounded-xs cursor-pointer select-none [transform-style:preserve-3d] shadow-2xs hover:shadow-xs transition-shadow"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* FRONT SIDE */}
              <div
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xs p-4 sm:p-6 flex flex-col items-center justify-between text-center border border-slate-200/80 dark:border-white/10 [backface-visibility:hidden]"
                style={{ transform: "rotateY(0deg)" }}
              >
                {/* Upper Card Header Row */}
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-xs text-[9px] sm:text-[10px] font-black uppercase bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20">
                      {activeVocab.pos}
                    </span>
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-xs text-[9px] sm:text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      CEFR B1
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(activeVocab.id);
                      showToastMsg(
                        "Yêu thích",
                        !isCurrentFav
                          ? "Đã thêm từ vào mục yêu thích"
                          : "Đã bỏ từ khỏi mục yêu thích"
                      );
                    }}
                    className="p-1 sm:p-1.5 rounded-xs text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Yêu thích"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isCurrentFav ? "text-rose-500 fill-rose-500" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Main Word Center Display */}
                <div className="my-auto py-2 sm:py-2.5 space-y-1.5 sm:space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                    {activeVocab.word}
                  </h2>

                  <div className="text-slate-400 dark:text-slate-500 text-[11px] sm:text-xs font-mono font-bold">
                    {activeVocab.phonetic}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(activeVocab.word);
                    }}
                    className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 text-[11px] sm:text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer mt-1"
                  >
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0059bb]" /> Nghe phát âm
                  </button>
                </div>

                {/* Bottom Card Flip Hint */}
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
                  <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Bấm vào thẻ hoặc phím Space để lật xem nghĩa
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-[#ebf3fe] to-indigo-50/80 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white rounded-xs p-4 sm:p-6 flex flex-col items-center justify-between text-center border border-[#0059bb]/20 dark:border-white/10 [backface-visibility:hidden] shadow-2xs"
                style={{ transform: "rotateY(180deg)" }}
              >
                {/* Back Upper Header */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 rounded-xs border border-emerald-500/20">
                    Nghĩa Tiếng Việt
                  </span>

                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400">
                    Bấm để lật lại
                  </span>
                </div>

                {/* Back Main Content */}
                <div className="my-auto py-1.5 sm:py-2 space-y-1.5 sm:space-y-2 max-w-md">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                    {activeVocab.definitionVn}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {activeVocab.definition}
                  </p>

                  {activeVocab.examples?.[0] && (
                    <div className="bg-white/80 dark:bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xs border border-blue-200/60 dark:border-white/10 text-[10.5px] sm:text-xs text-slate-700 dark:text-slate-300 italic shadow-2xs">
                      &quot;{activeVocab.examples[0]}&quot;
                    </div>
                  )}
                </div>

                {/* Back Footer Action - Equal Width 50/50 Buttons */}
                <div className="w-full pt-2 border-t border-blue-200/40 dark:border-white/10 grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(activeVocab.word);
                    }}
                    className="w-full py-1.5 sm:py-2 rounded-xs bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-[11px] sm:text-xs font-bold transition-all border border-slate-200/80 dark:border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0059bb]" /> Nghe lại
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      practiceWord(activeVocab.id, true);
                      awardXp(15);
                      showToastMsg("Đã thuộc từ!", "+15 XP đã được cộng.");
                    }}
                    className="w-full py-1.5 sm:py-2 rounded-xs bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-extrabold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Đã thuộc +15 XP
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Flashcard Bottom Control Bar */}
          <div className="p-2.5 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setTimeout(() => {
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : vocabs.length - 1));
                }, 100);
              }}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-[11px] sm:text-xs font-bold flex items-center gap-1 shrink-0"
              title="Từ trước (Mũi tên phím trái ←)"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Từ </span>trước
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  const shuffled = [...vocabs].sort(() => Math.random() - 0.5);
                  setVocabs(shuffled);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                  showToastMsg("Trộn thẻ", "Đã trộn ngẫu nhiên danh sách Flashcard!");
                }}
                className="p-1.5 sm:p-2 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                title="Trộn ngẫu nhiên"
              >
                <Shuffle className="w-3.5 h-3.5 text-indigo-500" />
              </button>

              <span className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 font-display">
                {currentIndex + 1} / {vocabs.length}
              </span>
            </div>

            <button
              onClick={() => {
                setIsFlipped(false);
                setTimeout(() => {
                  setCurrentIndex((prev) => (prev < vocabs.length - 1 ? prev + 1 : 0));
                }, 100);
              }}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white transition-colors cursor-pointer text-[11px] sm:text-xs font-extrabold flex items-center gap-1 shadow-2xs shrink-0"
              title="Từ tiếp theo (Mũi tên phím phải →)"
            >
              <span className="hidden xs:inline">Từ </span>tiếp <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: RICH LIST VIEW WITH SEARCH & FILTER */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar (Rule 2 & Rule 6 Compliance) */}
          <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm từ vựng, phiên âm hoặc nghĩa tiếng Việt..."
                className="w-full pl-9 pr-3 py-2 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Status Chips with Exact Counter Badges */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === "all"
                    ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Tất cả ({vocabs.length})
              </button>
              <button
                onClick={() => setFilterStatus("unlearned")}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === "unlearned"
                    ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Chưa thuộc ({unlearnedCount})
              </button>
              <button
                onClick={() => setFilterStatus("learned")}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === "learned"
                    ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Đã thuộc ({learnedCount})
              </button>
              <button
                onClick={() => setFilterStatus("favorite")}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === "favorite"
                    ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Yêu thích ({favoriteCount})
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredVocabs.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xs border border-slate-200/80 dark:border-white/10 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Không tìm thấy từ vựng phù hợp
              </h3>
              <p className="text-xs text-slate-500">
                Thử thay đổi từ khóa hoặc bộ lọc tìm kiếm phía trên.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5"
            >
              {filteredVocabs.map((v) => {
                const state = learned.find((l) => l.vocabId === v.id);
                const isFav = state?.isFavorite || false;
                const prof = state?.proficiency || 0;
                const isLearned = state?.isLearned || false;
                const hasValidDefinition =
                  v.definition &&
                  !v.definition.toLowerCase().startsWith("english vocabulary word") &&
                  v.definition.trim().toLowerCase() !== v.word.trim().toLowerCase();

                return (
                  <motion.div key={v.id} variants={itemVariants}>
                    <div className="p-3 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs hover:shadow-xs hover:border-[#0059bb]/50 dark:hover:border-sky-500/40 transition-all space-y-2 flex flex-col justify-between h-full group">
                      <div className="space-y-1.5">
                        {/* Upper row: Word title, POS & Action tools */}
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display truncate group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                                {v.word}
                              </h3>
                              <span className="text-[9px] bg-[#0059bb]/10 dark:bg-sky-500/10 text-[#0059bb] dark:text-sky-400 px-1.5 py-0.5 rounded-xs font-black uppercase tracking-wider shrink-0">
                                {v.pos}
                              </span>
                              {isLearned && (
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-xs font-bold border border-emerald-500/20 shrink-0">
                                  ✓ thuộc
                                </span>
                              )}
                            </div>
                            {v.phonetic && (
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-medium mt-0.5 truncate">
                                {v.phonetic}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-0.5 shrink-0">
                            <button
                              onClick={() => speak(v.word)}
                              className="p-1 rounded-xs text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Phát âm từ"
                            >
                              <Volume2 className="w-3.5 h-3.5 stroke-[2]" />
                            </button>
                            <button
                              onClick={() => {
                                toggleFavorite(v.id);
                                showToastMsg(
                                  "Yêu thích",
                                  !isFav
                                    ? "Đã thêm vào yêu thích"
                                    : "Đã xóa khỏi yêu thích"
                                );
                              }}
                              className="p-1 rounded-xs text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Thêm yêu thích"
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${
                                  isFav ? "text-rose-500 fill-rose-500" : ""
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Highlighted Primary Vietnamese Translation */}
                        <div className="text-xs font-black text-[#0059bb] dark:text-sky-400 line-clamp-1">
                          {v.definitionVn}
                        </div>

                        {/* Optional English Definition if not repetitive filler */}
                        {hasValidDefinition && (
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                            {v.definition}
                          </div>
                        )}

                        {/* Example Sentence inside Micro-Sharp Box */}
                        {v.examples?.[0] && (
                          <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2 rounded-xs border border-slate-200/50 dark:border-white/5 italic line-clamp-2 mt-1">
                            &quot;{v.examples[0]}&quot;
                          </div>
                        )}
                      </div>

                      {/* Card Footer: Dots proficiency & Micro-Sharp CTA Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 mt-1.5">
                        <div className="flex items-center gap-0.5">
                          {Array(5)
                            .fill(0)
                            .map((_, idx) => (
                              <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  idx < prof
                                    ? "bg-emerald-500"
                                    : "bg-slate-200 dark:bg-slate-800"
                                }`}
                              />
                            ))}
                        </div>

                        <button
                          onClick={() => {
                            practiceWord(v.id, true);
                            awardXp(15);
                            showToastMsg("Ôn tập thành công!", "+15 XP cho từ " + v.word);
                          }}
                          className="px-2.5 py-1 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-[10px] font-extrabold shadow-2xs hover:shadow-xs transition-all active:scale-98 flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <Zap className="w-3 h-3 fill-current" /> Luyện
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      )}

      {/* MODE 3: QUICK QUIZ MODE */}
      {viewMode === "quiz" && (
        <div className="max-w-xl mx-auto space-y-4">
          <div className="p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
            {!quizFinished ? (
              <>
                {/* Quiz Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      Câu {quizIndex + 1} / {vocabs.length}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Điểm: <strong className="text-emerald-600">{quizScore}</strong>
                    </span>
                  </div>
                  <button
                    onClick={handleResetQuiz}
                    className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" /> Làm lại
                  </button>
                </div>

                {/* Question Box */}
                {currentQuizItem && (
                  <div className="text-center py-4 space-y-2">
                    <div className="text-[11px] uppercase font-bold text-slate-400">
                      Chọn nghĩa đúng của từ từ vựng bên dưới
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white font-display">
                      {currentQuizItem.word}
                    </h2>
                    <div className="text-xs text-slate-400 font-mono font-bold">
                      {currentQuizItem.phonetic} ({currentQuizItem.pos})
                    </div>
                  </div>
                )}

                {/* Options List */}
                <div className="space-y-2.5">
                  {quizOptions.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = opt === currentQuizItem?.definitionVn;

                    let btnStyle =
                      "bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-blue-50/60 dark:hover:bg-slate-800 hover:border-blue-300";
                    if (isQuizSubmitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-500 text-white border-emerald-600 font-bold shadow-2xs";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-500 text-white border-rose-600 font-bold shadow-2xs";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerQuiz(idx)}
                        disabled={isQuizSubmitted}
                        className={`w-full p-3.5 rounded-xs border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isQuizSubmitted && isCorrect && <Check className="w-4 h-4 text-white" />}
                        {isQuizSubmitted && isSelected && !isCorrect && (
                          <X className="w-4 h-4 text-white" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                {isQuizSubmitted && (
                  <button
                    onClick={handleNextQuizQuestion}
                    className="w-full py-2.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-extrabold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer mt-3"
                  >
                    <span>{quizIndex < vocabs.length - 1 ? "Câu tiếp theo" : "Xem kết quả"}</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                )}
              </>
            ) : (
              /* Quiz Summary Screen */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-2xl">
                  🏆
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    Hoàn thành bài luyện tập!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Bạn đã trả lời đúng <strong className="text-emerald-600">{quizScore}</strong> / {vocabs.length} câu hỏi.
                  </p>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="px-5 py-2.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-extrabold transition-all shadow-2xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" /> Luyện tập lại
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 4: AI COACH MODE */}
      {viewMode === "ai" && (
        <div className="max-w-xl mx-auto space-y-4">
          <div className="p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-3">
              <div className="w-9 h-9 rounded-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                  Hỏi đáp từ vựng với AI Coach 🤖
                </h3>
                <p className="text-[11px] text-slate-500">
                  Đặt câu hỏi về nghĩa, cách dùng hoặc nhờ AI đặt câu mẫu cho từ trong chủ đề {theme.name}.
                </p>
              </div>
            </div>

            {/* 1-Click Quick Prompts */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-400">Gợi ý nhanh 1-Click:</div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    const q = `Hãy cho 3 câu ví dụ thực tế giao tiếp tiếng Anh với các từ thuộc chủ đề ${theme.name}`;
                    setAiQuestion(q);
                    handleAiAsk(q);
                  }}
                  className="px-2.5 py-1 rounded-xs bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-purple-500" /> Cho 3 ví dụ thực tế
                </button>

                <button
                  onClick={() => {
                    const q = `Phân biệt cách dùng và ngữ cảnh cụ thể của các từ vựng tiêu biểu trong chủ đề ${theme.name}`;
                    setAiQuestion(q);
                    handleAiAsk(q);
                  }}
                  className="px-2.5 py-1 rounded-xs bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  🔍 Phân biệt ngữ cảnh
                </button>

                <button
                  onClick={() => {
                    const q = `Chia sẻ mẹo ghi nhớ nhanh và phản xạ từ vựng dễ hiểu cho bộ từ ${theme.name}`;
                    setAiQuestion(q);
                    handleAiAsk(q);
                  }}
                  className="px-2.5 py-1 rounded-xs bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  🧠 Mẹo ghi nhớ từ
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAiAsk();
              }}
              className="space-y-3 pt-1"
            >
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Đặt câu hỏi tự do cho AI:
                </label>
                <textarea
                  rows={3}
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder={`Ví dụ: Hãy phân biệt cách dùng các từ vựng trong chủ đề ${theme.name} hoặc cho tôi 3 câu ví dụ...`}
                  className="w-full p-3 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]"
                />
              </div>

              <button
                type="submit"
                disabled={isAiLoading || !aiQuestion.trim()}
                className="w-full py-2.5 rounded-xs bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isAiLoading ? (
                  <span>Đang suy nghĩ...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Gửi câu hỏi (+10 XP)
                  </>
                )}
              </button>
            </form>

            {aiResponse && (
              <div className="p-4 rounded-xs bg-[#ebf3fe] dark:bg-purple-950/40 border border-[#0059bb]/20 dark:border-purple-500/20 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                <div className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-purple-600" /> Trả lời từ AI Coach:
                </div>
                <div className="whitespace-pre-wrap leading-relaxed pt-1">{aiResponse}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}