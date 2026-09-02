"use client";
import React, { use, useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { BASIC_VOCABULARY_THEMES, BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARY_THEMES, ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";
import { getSemanticThemeIcon } from "../VocabularyThemesClientList";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, recordSkillPractice } from "@/stores/userStore";
import { useDailyChallengeStore } from "@/stores/dailyChallengeStore";
import { useUiStore } from "@/stores/uiStore";
import { safeSpeakText } from "@/shared/utils/mobileAudio";
import { motion, AnimatePresence } from "framer-motion";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  ArrowLeft,
  ListOrdered,
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
  BookMarked,
  Clock,
  HelpCircle,
} from "lucide-react";

import { containerVariants, itemVariants } from "@/shared/components/feedback/PageEntranceAnimation";

export default function ThemeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Instant local dataset fallback for 0ms instant render
  const localInitialVocabs = useMemo(() => {
    const basicList = BASIC_VOCABULARIES.filter((v) => v.themeId === id);
    if (basicList.length > 0) return basicList;
    return ADVANCED_VOCABULARIES.filter((v) => v.themeId === id);
  }, [id]);

  const [vocabs, setVocabs] = useState<any[]>(localInitialVocabs);
  const [isLoading, setIsLoading] = useState(localInitialVocabs.length === 0);
  const { toggleFavorite, learned, practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();
  const { setSidebarCollapsed } = useUiStore();

  // Find theme metadata from basic or advanced data files
  const theme = useMemo(() => {
    const basicFound = BASIC_VOCABULARY_THEMES.find((t) => t.id === id);
    if (basicFound) return basicFound;
    const advancedFound = ADVANCED_VOCABULARY_THEMES.find((t) => t.id === id);
    if (advancedFound) return advancedFound;
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
    let isMounted = true;
    fetch(`/api/vocabulary?themeId=${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setVocabs(res.data);
        }
      })
      .catch((err) => console.error("Error fetching vocabs:", err))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Page States
  const [toast, setToast] = useState<{ title: string; body: string } | null>(null);
  const [viewMode, setViewMode] = useState<"flashcard" | "list" | "quiz" | "ai">("flashcard");

  // Automatically manage sidebar collapse when in interactive vocabulary study/quiz mode
  useEffect(() => {
    if (viewMode === "flashcard" || viewMode === "quiz" || viewMode === "ai") {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
    return () => {
      setSidebarCollapsed(false);
    };
  }, [viewMode, setSidebarCollapsed]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Flashcard Interactive Studio States
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

  // Real-time backend practice time tracker for Vocabulary
  useStudyTimeTracker("vocab", {
    activeCondition: !!activeVocab,
  });

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

  const handlePrevQuizQuestion = () => {
    setQuizIndex((prev) => (prev > 0 ? prev - 1 : vocabs.length - 1));
    setSelectedAnswer(null);
    setIsQuizSubmitted(false);
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

  // Keyboard navigation for Flashcard 3D & Quiz modes
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      // Flashcard Mode Shortcuts
      if (viewMode === "flashcard" && vocabs.length > 0 && activeVocab) {
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
        } else if (e.code === "KeyP" || e.code === "KeyA") {
          e.preventDefault();
          speak(activeVocab.word);
        } else if (e.code === "KeyM") {
          e.preventDefault();
          setIsWordMasked((prev) => !prev);
        } else if (e.code === "KeyF") {
          e.preventDefault();
          toggleFavorite(activeVocab.id);
          showToastMsg(
            "Yêu thích",
            !isCurrentFav
              ? "Đã thêm từ vào mục yêu thích"
              : "Đã bỏ từ khỏi mục yêu thích"
          );
        } else if (e.code === "KeyS") {
          e.preventDefault();
          const shuffled = [...vocabs].sort(() => Math.random() - 0.5);
          setVocabs(shuffled);
          setCurrentIndex(0);
          setIsFlipped(false);
          showToastMsg("Trộn thẻ", "Đã trộn ngẫu nhiên danh sách Flashcard!");
        }
      }

      // Quiz Mode Shortcuts (1, 2, 3, 4, A, B, C, D, Space, Enter, Arrows, P)
      if (viewMode === "quiz" && !quizFinished) {
        if (e.code === "ArrowLeft") {
          e.preventDefault();
          handlePrevQuizQuestion();
          return;
        }

        if (!isQuizSubmitted) {
          if (["Digit1", "Numpad1", "KeyA"].includes(e.code) && quizOptions[0]) {
            e.preventDefault();
            handleAnswerQuiz(0);
          } else if (["Digit2", "Numpad2", "KeyB"].includes(e.code) && quizOptions[1]) {
            e.preventDefault();
            handleAnswerQuiz(1);
          } else if (["Digit3", "Numpad3", "KeyC"].includes(e.code) && quizOptions[2]) {
            e.preventDefault();
            handleAnswerQuiz(2);
          } else if (["Digit4", "Numpad4", "KeyD"].includes(e.code) && quizOptions[3]) {
            e.preventDefault();
            handleAnswerQuiz(3);
          }
        } else {
          if (["Space", "Enter", "ArrowRight"].includes(e.code)) {
            e.preventDefault();
            handleNextQuizQuestion();
          }
        }

        if (e.code === "KeyP" && currentQuizItem) {
          e.preventDefault();
          speak(currentQuizItem.word);
        }
      }
    },
    [
      viewMode,
      vocabs,
      activeVocab,
      isCurrentFav,
      toggleFavorite,
      quizFinished,
      isQuizSubmitted,
      quizOptions,
      currentQuizItem,
      handleAnswerQuiz,
      handlePrevQuizQuestion,
      handleNextQuizQuestion,
    ]
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

  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      
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
            <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200/90 dark:border-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-md">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={2} />
              <div>
                <div className="text-xs font-bold font-display text-slate-900 dark:text-white">{toast.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{toast.body}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 0. BRAND TOP HEADER (Unified 56px Baseline with 4 Mode Switcher Pills) */}
      <AppTopHeader
        rightDesktopContent={
          <button
            type="button"
            onClick={() => {
              if (activeVocab) {
                practiceWord(activeVocab.id, true);
                awardXp(15);
                showToastMsg("Bắt đầu ôn tập", "Đã khởi động bài luyện tập! +15 XP");
              }
            }}
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer font-display active:scale-95 shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Luyện Ngay +15 XP</span>
          </button>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            href="/vocabulary"
            icon={<ListOrdered className="w-3.5 h-3.5 text-emerald-500" />}
            label="Danh sách từ"
          />
          <HeaderPillItem
            active={viewMode === "flashcard"}
            onClick={() => setViewMode("flashcard")}
            icon={<Layers className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Flashcard"
          />
          <HeaderPillItem
            active={viewMode === "list"}
            onClick={() => setViewMode("list")}
            icon={<List className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
            label="Danh Sách"
          />
          <HeaderPillItem
            active={viewMode === "quiz"}
            onClick={() => setViewMode("quiz")}
            icon={<Zap className="w-3.5 h-3.5 text-amber-500" />}
            label="Kiểm Tra"
          />
          <HeaderPillItem
            active={viewMode === "ai"}
            onClick={() => setViewMode("ai")}
            icon={<Bot className="w-3.5 h-3.5 text-purple-500" />}
            label="AI Coach"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">

        {/* 1. COMPACT HERO STUDIO BANNER & 4 INLINE METRIC PILLS */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs relative overflow-hidden space-y-2.5"
        >
          {/* Top ambient blue accent glow */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#0059bb]/60 to-transparent" />

          {/* Unified Compact Row: Topic Info on Left, 4 Inline Metrics on Right */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Left: Topic Title & Details */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                {getSemanticThemeIcon(theme)}
              </div>

              <div className="min-w-0">
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
                  {theme.name}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                  {theme.nameEn} • Chuẩn IPA & ví dụ song ngữ
                </p>
              </div>
            </div>

            {/* Right: 4 Sleek Micro Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold block leading-none">Tổng Từ</span>
                  <span className="text-xs sm:text-sm font-black font-display text-[#0059bb] dark:text-sky-400 leading-tight">
                    {vocabs.length} Từ
                  </span>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold block leading-none">Đã Thuộc</span>
                  <span className="text-xs sm:text-sm font-black font-display text-emerald-600 dark:text-emerald-400 leading-tight">
                    {learnedCount} Từ
                  </span>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                  <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold block leading-none">Yêu Thích</span>
                  <span className="text-xs sm:text-sm font-black font-display text-rose-500 dark:text-rose-400 leading-tight">
                    {favoriteCount} Từ
                  </span>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold block leading-none">Tiến Độ</span>
                  <span className="text-xs sm:text-sm font-black font-display text-purple-600 dark:text-purple-400 leading-tight">
                    {progressPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. MODE CONTENT PANELS */}

        {/* MODE 1: FLASHCARD 3D - AGENCY STAGE */}
        {viewMode === "flashcard" && activeVocab && (
          <div className="max-w-2xl mx-auto space-y-4">
            
            {/* 3D Perspective Flashcard Container */}
            <div className="perspective-[1500px] w-full">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 75, damping: 16 }}
                className="relative w-full min-h-[300px] sm:min-h-[330px] rounded-2xl cursor-pointer select-none [transform-style:preserve-3d] shadow-sm hover:shadow-xl transition-shadow duration-300"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* FRONT SIDE */}
                <div
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-between text-center border border-slate-200/90 dark:border-slate-800 [backface-visibility:hidden]"
                  style={{ transform: "rotateY(0deg)" }}
                >
                  {/* Upper Card Header Row */}
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40">
                        {activeVocab.pos}
                      </span>
                      <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
                        CEFR B1
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsWordMasked(!isWordMasked);
                        }}
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          isWordMasked
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                            : "text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                        title={isWordMasked ? "Hiện từ" : "Ẩn bớt ký tự"}
                      >
                        {isWordMasked ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
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
                        className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                        title="Yêu thích"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isCurrentFav ? "text-rose-500 fill-rose-500" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Main Word Center Display */}
                  <div className="my-auto py-3 space-y-2">
                    <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                      {isWordMasked ? getMaskedWord(activeVocab.word) : activeVocab.word}
                    </h2>

                    <div className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium tracking-wide">
                      {activeVocab.phonetic}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(activeVocab.word);
                      }}
                      className="h-11 px-6 rounded-2xl bg-blue-50/90 dark:bg-blue-950/60 hover:bg-[#0059bb] dark:hover:bg-[#0059bb] border border-blue-200/80 dark:border-blue-800/80 hover:border-[#0059bb] text-[#0059bb] hover:text-white dark:text-sky-300 dark:hover:text-white font-bold text-xs sm:text-sm shadow-2xs hover:shadow-md hover:shadow-[#0059bb]/20 transition-all duration-300 inline-flex items-center gap-2.5 group cursor-pointer mt-1 active:scale-95"
                    >
                      <div className="w-6 h-6 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 group-hover:bg-white/20 flex items-center justify-center text-[#0059bb] dark:text-sky-300 group-hover:text-white transition-colors">
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                      <span>Phát âm chuẩn bản xứ</span>
                    </button>
                  </div>

                  {/* Bottom Flip Hint (Tinh giản & Sang trọng) */}
                  <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center">
                    <div className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5 opacity-80">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Nhấp vào thẻ hoặc bấm phím Space để lật xem nghĩa</span>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-[#ebf3fe] to-indigo-50/80 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-between text-center border border-[#0059bb]/30 dark:border-slate-800 [backface-visibility:hidden] shadow-sm"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  {/* Back Upper Header */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                      Nghĩa Tiếng Việt
                    </span>

                    <span className="text-xs font-medium text-slate-400">
                      Nhấp để lật lại
                    </span>
                  </div>

                  {/* Back Main Content */}
                  <div className="my-auto py-2 space-y-2.5 max-w-md">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                      {activeVocab.definitionVn}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {activeVocab.definition}
                    </p>

                    {activeVocab.examples?.[0] && (
                      <div className="bg-white/90 dark:bg-slate-850 px-4 py-3 rounded-xl border border-blue-200/60 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium shadow-2xs text-left">
                        &quot;{activeVocab.examples[0]}&quot;
                      </div>
                    )}
                  </div>

                  {/* Back Footer Action - Equal Width Buttons */}
                  <div className="w-full pt-3 border-t border-blue-200/40 dark:border-slate-800 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(activeVocab.word);
                      }}
                      className="w-full h-11 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm font-bold transition-all border border-slate-200/90 dark:border-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <Volume2 className="w-4 h-4 text-[#0059bb]" />
                      <span>Nghe Lại (P)</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        practiceWord(activeVocab.id, true);
                        awardXp(15);
                        showToastMsg("Đã thuộc từ!", "+15 XP đã được cộng.");
                      }}
                      className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Đã Thuộc +15 XP</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Flashcard Bottom Control Bar */}
            <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Previous Button with Prominent Left Arrow Icon */}
              <button
                type="button"
                onClick={() => {
                  setIsFlipped(false);
                  setTimeout(() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : vocabs.length - 1));
                  }, 100);
                }}
                className="h-11 px-4 sm:px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-2xs"
              >
                <ChevronLeft className="w-4.5 h-4.5 stroke-[2.5] text-slate-700 dark:text-slate-200" />
                <span>Từ Trước</span>
              </button>

              {/* Center: Shuffle & Counter */}
              <div className="flex items-center justify-center gap-2">
                {/* Shuffle Button */}
                <button
                  type="button"
                  onClick={() => {
                    const shuffled = [...vocabs].sort(() => Math.random() - 0.5);
                    setVocabs(shuffled);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                    showToastMsg("Trộn thẻ", "Đã trộn ngẫu nhiên danh sách Flashcard!");
                  }}
                  className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <Shuffle className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold">Trộn Thẻ</span>
                </button>

                {/* Counter Pill */}
                <div className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    {currentIndex + 1} <span className="text-slate-400">/</span> {vocabs.length}
                  </span>
                </div>
              </div>

              {/* Next Button with Prominent Right Chevron Icon */}
              <button
                type="button"
                onClick={() => {
                  setIsFlipped(false);
                  setTimeout(() => {
                    setCurrentIndex((prev) => (prev < vocabs.length - 1 ? prev + 1 : 0));
                  }, 100);
                }}
                className="h-11 px-5 sm:px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white transition-all cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0059bb]/20 shrink-0 font-display active:scale-95"
              >
                <span>Từ Tiếp Theo</span>
                <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: RICH LIST VIEW WITH SEARCH & FILTER */}
        {viewMode === "list" && (
          <div className="space-y-4">
            
            {/* Search & Filter Toolbar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative w-full md:w-80 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm từ vựng, phiên âm hoặc nghĩa..."
                  className="w-full h-10 pl-10 pr-8 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filter Status Chips */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: "all", label: `Tất cả (${vocabs.length})` },
                  { id: "unlearned", label: `Chưa thuộc (${unlearnedCount})` },
                  { id: "learned", label: `Đã thuộc (${learnedCount})` },
                  { id: "favorite", label: `Yêu thích (${favoriteCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilterStatus(tab.id as any)}
                    className={`h-9 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                      filterStatus === tab.id
                        ? "bg-[#0059bb] text-white shadow-md shadow-[#0059bb]/20 font-display"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            {filteredVocabs.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Không tìm thấy từ vựng nào phù hợp
                </h3>
                <p className="text-xs text-slate-500">
                  Thử thay đổi từ khóa hoặc chọn trạng thái lọc &ldquo;Tất cả&rdquo; ở thanh công cụ.
                </p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4"
              >
                {filteredVocabs.map((v) => {
                  const state = learned.find((l) => l.vocabId === v.id);
                  const isFav = state?.isFavorite || false;
                  const prof = state?.proficiency || 0;
                  const isLearned = state?.isLearned || false;

                  return (
                    <motion.div key={v.id} variants={itemVariants}>
                      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-[#0059bb]/50 transition-all duration-300 flex flex-col justify-between h-full space-y-3 group relative overflow-hidden">
                        
                        <div className="space-y-2">
                          {/* Upper row: Word title, POS & Action tools */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display truncate group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                                  {v.word}
                                </h3>
                                <span className="text-[10px] bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 px-2 py-0.5 rounded-md font-mono font-bold uppercase shrink-0">
                                  {v.pos}
                                </span>
                                {isLearned && (
                                  <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-mono font-bold border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
                                    ✓ thuộc
                                  </span>
                                )}
                              </div>
                              {v.phonetic && (
                                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-0.5 truncate">
                                  {v.phonetic}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => speak(v.word)}
                                className="w-8 h-8 rounded-xl text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                                title="Phát âm từ"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  toggleFavorite(v.id);
                                  showToastMsg(
                                    "Yêu thích",
                                    !isFav
                                      ? "Đã thêm vào yêu thích"
                                      : "Đã xóa khỏi yêu thích"
                                  );
                                }}
                                className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                                title="Thêm yêu thích"
                              >
                                <Heart
                                  className={`w-4 h-4 ${
                                    isFav ? "text-rose-500 fill-rose-500" : ""
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          {/* Highlighted Primary Vietnamese Translation */}
                          <div className="text-sm font-bold text-[#0059bb] dark:text-sky-400 line-clamp-1 font-display">
                            {v.definitionVn}
                          </div>

                          {/* English Definition */}
                          {v.definition && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">
                              {v.definition}
                            </div>
                          )}

                          {/* Example Sentence */}
                          {v.examples?.[0] && (
                            <div className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 line-clamp-2 mt-1">
                              &quot;{v.examples[0]}&quot;
                            </div>
                          )}
                        </div>

                        {/* Card Footer: Proficiency Stars & Action Button */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                          <div className="flex items-center gap-1">
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
                            type="button"
                            onClick={() => {
                              practiceWord(v.id, true);
                              awardXp(15);
                              showToastMsg("Ôn tập thành công!", "+15 XP cho từ " + v.word);
                            }}
                            className="h-7 px-3 rounded-lg bg-[#0059bb] hover:bg-[#004899] text-white text-[11px] font-bold shadow-2xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                          >
                            <Zap className="w-3 h-3 fill-current" />
                            <span>Luyện</span>
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
          <div className="max-w-2xl mx-auto space-y-4">
            {!quizFinished ? (
              <>
                {/* 1. KHỐI TỪ RIÊNG (Dedicated Question Studio Card) */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
                  {/* Quiz Header Bar */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
                        Câu {quizIndex + 1} / {vocabs.length}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        Điểm: <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">{quizScore}</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetQuiz}
                      className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Làm lại</span>
                    </button>
                  </div>

                  {/* Question Word Studio */}
                  {currentQuizItem && (
                    <div className="text-center py-3 space-y-2.5">
                      <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                        Chọn nghĩa đúng của từ tiếng Anh bên dưới:
                      </div>
                      <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                        {currentQuizItem.word}
                      </h2>
                      <div className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium tracking-wide flex items-center justify-center gap-2">
                        <span>{currentQuizItem.phonetic}</span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="uppercase text-xs font-bold text-[#0059bb] dark:text-sky-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800/40">
                          {currentQuizItem.pos}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => speak(currentQuizItem.word)}
                        className="h-9 px-4 rounded-xl bg-blue-50/90 dark:bg-blue-950/60 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-300 font-bold text-xs border border-blue-200/80 dark:border-blue-800/80 transition-all inline-flex items-center gap-2 cursor-pointer shadow-2xs group active:scale-95 mt-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe phát âm</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. KHỐI 4 ĐÁP ÁN CHIA RA 2 CỘT (2-Column Options Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {quizOptions.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = opt === currentQuizItem?.definitionVn;
                    const optionLetter = ["A", "B", "C", "D"][idx];

                    let cardStyle =
                      "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#0059bb] hover:bg-blue-50/40 dark:hover:bg-slate-850 shadow-2xs";
                    let badgeStyle = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";

                    if (isQuizSubmitted) {
                      if (isCorrect) {
                        cardStyle = "bg-emerald-500 text-white border-emerald-600 font-bold shadow-md shadow-emerald-500/20";
                        badgeStyle = "bg-white/20 text-white";
                      } else if (isSelected && !isCorrect) {
                        cardStyle = "bg-rose-500 text-white border-rose-600 font-bold shadow-md shadow-rose-500/20";
                        badgeStyle = "bg-white/20 text-white";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswerQuiz(idx)}
                        disabled={isQuizSubmitted}
                        className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer min-h-[64px] active:scale-[0.98] ${cardStyle}`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs ${badgeStyle}`}>
                            {optionLetter}
                          </span>
                          <span className="text-sm font-semibold">{opt}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <kbd className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                            isQuizSubmitted && (isCorrect || isSelected)
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                          }`}>
                            {idx + 1}
                          </kbd>
                          {isQuizSubmitted && isCorrect && <Check className="w-5 h-5 text-white shrink-0" />}
                          {isQuizSubmitted && isSelected && !isCorrect && (
                            <X className="w-5 h-5 text-white shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* 3. Quiz Bottom Control Bar (Khớp chuẩn xác với Flashcard) */}
                <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Previous Question Button */}
                  <button
                    type="button"
                    onClick={handlePrevQuizQuestion}
                    className="h-11 px-4 sm:px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-2xs"
                  >
                    <ChevronLeft className="w-4.5 h-4.5 stroke-[2.5] text-slate-700 dark:text-slate-200" />
                    <span>Câu Trước</span>
                  </button>

                  {/* Center: Counter & Score Badges */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                      <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                        {quizIndex + 1} <span className="text-slate-400">/</span> {vocabs.length}
                      </span>
                    </div>

                    <div className="h-11 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        Điểm: <strong className="font-mono">{quizScore}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Next Question Button */}
                  <button
                    type="button"
                    onClick={handleNextQuizQuestion}
                    className="h-11 px-5 sm:px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white transition-all cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0059bb]/20 shrink-0 font-display active:scale-95"
                  >
                    <span>{quizIndex < vocabs.length - 1 ? "Câu Tiếp Theo" : "Xem Kết Quả"}</span>
                    <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
                  </button>
                </div>
              </>
            ) : (
              /* Quiz Summary Screen */
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-2xs">
                  🏆
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    Hoàn thành bài luyện tập trắc nghiệm!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Bạn đã trả lời đúng <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{quizScore}</strong> / {vocabs.length} câu hỏi.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="h-11 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold transition-all shadow-md shadow-[#0059bb]/20 inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Luyện tập lại</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODE 4: AI COACH MODE */}
        {viewMode === "ai" && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    Cố Vấn Học Tập AI Tutor
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                    Hỏi đáp về nghĩa, cách dùng hoặc nhờ AI đặt câu mẫu cho từ trong chủ đề {theme.name}.
                  </p>
                </div>
              </div>

              {/* 1-Click Quick Prompts */}
              <div className="space-y-2">
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Gợi ý câu hỏi 1-Click:</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      const q = `Hãy cho 3 câu ví dụ thực tế giao tiếp tiếng Anh với các từ thuộc chủ đề ${theme.name}`;
                      setAiQuestion(q);
                      handleAiAsk(q);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-purple-50/90 dark:bg-purple-950/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Cho 3 ví dụ thực tế</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const q = `Phân biệt cách dùng và ngữ cảnh cụ thể của các từ vựng tiêu biểu trong chủ đề ${theme.name}`;
                      setAiQuestion(q);
                      handleAiAsk(q);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-blue-50/90 dark:bg-blue-950/40 hover:bg-blue-100 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
                  >
                    <Search className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                    <span>Phân biệt ngữ cảnh</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const q = `Chia sẻ mẹo ghi nhớ nhanh và phản xạ từ vựng dễ hiểu cho bộ từ ${theme.name}`;
                      setAiQuestion(q);
                      handleAiAsk(q);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Mẹo ghi nhớ nhanh</span>
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAiAsk();
                }}
                className="space-y-3 pt-2"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                    Đặt câu hỏi tự do cho AI Tutor:
                  </label>
                  <textarea
                    rows={3}
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder={`Ví dụ: Hãy phân biệt cách dùng các từ vựng trong chủ đề ${theme.name} hoặc cho tôi 3 câu ví dụ giao tiếp thực tế...`}
                    className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAiLoading || !aiQuestion.trim()}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95 font-display"
                >
                  {isAiLoading ? (
                    <span>Đang suy nghĩ câu trả lời...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Gửi Câu Hỏi (+10 XP)</span>
                    </>
                  )}
                </button>
              </form>

              {aiResponse && (
                <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 text-xs text-slate-800 dark:text-slate-200 space-y-2">
                  <div className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span>Câu trả lời từ Cố Vấn AI:</span>
                  </div>
                  <div className="whitespace-pre-wrap leading-relaxed pt-1 font-medium">{aiResponse}</div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}