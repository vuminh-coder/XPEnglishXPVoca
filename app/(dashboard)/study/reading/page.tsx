"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Headphones,
  Mic,
  Search,
  RefreshCw,
  Clock,
  Check,
  CheckCircle2,
  XCircle,
  Play,
  ArrowLeft,
  Eye,
  EyeOff,
  Sparkles,
  Trophy,
  Volume2,
  X,
  GraduationCap,
  Layers,
  Target,
  FileText,
  RotateCcw,
  Zap,
  Bookmark,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  Share2,
} from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import { safeSpeakText } from "@/shared/utils/mobileAudio";
import { stopTTS } from "@/shared/utils/ttsEngine";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  READING_PASSAGES_DATA,
  ReadingPassage,
  ReadingVocab,
} from "@/features/reading/data/readingMockData";
import {
  ReadingListingSkeleton,
  ReadingStudioSkeleton,
} from "@/features/reading/components/LoadingSkeletons";

function ReadingStudioContent() {
  const searchParams = useSearchParams();
  const rawIdFromUrl = searchParams.get("id") || searchParams.get("lessonId");

  const { addToast } = useNotificationStore();
  const { awardXp } = useUserStore();

  // Selected Passage State
  const [selectedPassageId, setSelectedPassageId] = useState<string | null>(null);
  const [listingSearch, setListingSearch] = useState("");
  const [showLessonModal, setShowLessonModal] = useState(false);

  // Active Passage Quiz & UI States
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFullTranslation, setShowFullTranslation] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<"sm" | "base" | "lg">("base");
  const [selectedWord, setSelectedWord] = useState<ReadingVocab | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [completedPassageIds, setCompletedPassageIds] = useState<string[]>([]);

  // 1. Synchronize URL query params
  useEffect(() => {
    if (rawIdFromUrl) {
      const match = READING_PASSAGES_DATA.find((p) => p.id === rawIdFromUrl);
      if (match) {
        setSelectedPassageId(match.id);
        useUiStore.getState().setSidebarCollapsed(true);
      }
    }
  }, [rawIdFromUrl]);

  // Synchronize BottomNav & Sidebar when in studio mode
  useEffect(() => {
    if (selectedPassageId) {
      useUiStore.getState().setSidebarCollapsed(true);
      useUiStore.getState().setHideBottomNav(true);
    } else {
      useUiStore.getState().setHideBottomNav(false);
    }
  }, [selectedPassageId]);

  // Cleanup: restore BottomNav when leaving the page
  useEffect(() => {
    return () => useUiStore.getState().setHideBottomNav(false);
  }, []);

  // Current Active Passage Object
  const currentPassage = useMemo(() => {
    if (!selectedPassageId) return null;
    return READING_PASSAGES_DATA.find((p) => p.id === selectedPassageId) || null;
  }, [selectedPassageId]);

  // Level label mapping
  const getLevelLabel = (level?: string): string => {
    const map: Record<string, string> = {
      Easy: "A1-A2",
      Beginner: "A1",
      A1: "A1",
      A2: "A2",
      Intermediate: "B1-B2",
      B1: "B1",
      B2: "B2",
      Hard: "C1-C2",
      Advanced: "C1",
      C1: "C1",
      C2: "C2",
    };
    return map[level || ""] || level || "A1";
  };

  // Dual Row Picker State: Row 1 Basic & Row 2 Advanced
  const BASIC_LEVELS = new Set(["Easy", "Beginner", "A1", "A2"]);
  const ADVANCED_LEVELS = new Set(["Hard", "Advanced", "C1", "C2"]);

  const [displayedBasicPassages, setDisplayedBasicPassages] = useState<ReadingPassage[]>([]);
  const [displayedAdvancedPassages, setDisplayedAdvancedPassages] = useState<ReadingPassage[]>([]);

  // Random picker helper
  const pickRandomPassages = (pool: ReadingPassage[], count: number) => {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const easyPool = READING_PASSAGES_DATA.filter((p) => BASIC_LEVELS.has(p.level || ""));
    const hardPool = READING_PASSAGES_DATA.filter((p) => ADVANCED_LEVELS.has(p.level || ""));
    const midPool = READING_PASSAGES_DATA.filter((p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2");
    const midHalf = Math.ceil(midPool.length / 2);

    const basicPool = [...easyPool, ...midPool.slice(0, midHalf)];
    const advPool = [...hardPool, ...midPool.slice(midHalf)];

    const safeBasic = basicPool.length > 0 ? basicPool : READING_PASSAGES_DATA.slice(0, Math.ceil(READING_PASSAGES_DATA.length / 2));
    const safeAdv = advPool.length > 0 ? advPool : READING_PASSAGES_DATA.slice(Math.ceil(READING_PASSAGES_DATA.length / 2));

    if (listingSearch.trim()) {
      const q = listingSearch.toLowerCase();
      setDisplayedBasicPassages(
        safeBasic.filter((p) => p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)).slice(0, 8)
      );
      setDisplayedAdvancedPassages(
        safeAdv.filter((p) => p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)).slice(0, 8)
      );
    } else {
      setDisplayedBasicPassages(pickRandomPassages(safeBasic, 8));
      setDisplayedAdvancedPassages(pickRandomPassages(safeAdv, 8));
    }
  }, [listingSearch]);

  const handleShuffleBasic = () => {
    const easyPool = READING_PASSAGES_DATA.filter((p) => BASIC_LEVELS.has(p.level || ""));
    const midPool = READING_PASSAGES_DATA.filter((p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2");
    const basicPool = [...easyPool, ...midPool.slice(0, Math.ceil(midPool.length / 2))];
    const safeBasic = basicPool.length > 0 ? basicPool : READING_PASSAGES_DATA.slice(0, Math.ceil(READING_PASSAGES_DATA.length / 2));
    setDisplayedBasicPassages(pickRandomPassages(safeBasic, 8));
    addToast({ type: "info", title: "Đã đổi 8 bài đọc cơ bản ngẫu nhiên mới!" });
  };

  const handleShuffleAdvanced = () => {
    const hardPool = READING_PASSAGES_DATA.filter((p) => ADVANCED_LEVELS.has(p.level || ""));
    const midPool = READING_PASSAGES_DATA.filter((p) => p.level === "Intermediate" || p.level === "B1" || p.level === "B2");
    const advPool = [...hardPool, ...midPool.slice(Math.ceil(midPool.length / 2))];
    const safeAdv = advPool.length > 0 ? advPool : READING_PASSAGES_DATA.slice(Math.ceil(READING_PASSAGES_DATA.length / 2));
    setDisplayedAdvancedPassages(pickRandomPassages(safeAdv, 8));
    addToast({ type: "info", title: "Đã đổi 8 bài đọc nâng cao ngẫu nhiên mới!" });
  };

  // Select Passage handler
  const handleSelectPassage = (passageId: string) => {
    setSelectedPassageId(passageId);
    setAnswers({});
    setIsSubmitted(false);
    setShowFullTranslation(false);
    setSelectedWord(null);
    setElapsedSeconds(0);

    const newUrl = `${window.location.pathname}?id=${passageId}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    useUiStore.getState().setSidebarCollapsed(true);
  };

  const handleBackToListing = () => {
    setSelectedPassageId(null);
    setIsSubmitted(false);
    window.history.pushState({}, "", window.location.pathname);
  };

  // Timer Effect in Studio Mode
  useEffect(() => {
    if (!selectedPassageId || isSubmitted) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedPassageId, isSubmitted]);

  // Submit and Scoring
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!currentPassage) return;
    const totalQuestions = currentPassage.questions.length;
    const answeredCount = Object.keys(answers).length;

    if (answeredCount < totalQuestions) {
      addToast({
        type: "warning",
        title: "Chưa hoàn thành hết câu hỏi",
        message: `Bạn mới trả lời ${answeredCount}/${totalQuestions} câu. Hãy chọn đáp án cho tất cả các câu nhé!`,
      });
      return;
    }

    setIsSubmitted(true);
    let correctCount = 0;
    currentPassage.questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount += 1;
      }
    });

    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const xpReward = correctCount * 15 + 20;

    awardXp(xpReward);
    if (!completedPassageIds.includes(currentPassage.id)) {
      setCompletedPassageIds((prev) => [...prev, currentPassage.id]);
    }

    if (scorePercent >= 80) {
      addToast({
        type: "success",
        title: `🎉 XUẤT SẮC! Đạt ${scorePercent}% (${correctCount}/${totalQuestions})`,
        message: `Bạn nhận được +${xpReward} XP đọc hiểu!`,
      });
    } else {
      addToast({
        type: "info",
        title: `Kết quả: ${scorePercent}% (${correctCount}/${totalQuestions})`,
        message: `Xem giải thích chi tiết bên dưới để rút kinh nghiệm nhé! +${xpReward} XP`,
      });
    }
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setIsSubmitted(false);
    setElapsedSeconds(0);
    addToast({ type: "info", title: "Đã đặt lại bài làm. Bạn có thể làm lại từ đầu!" });
  };

  // Word Click / Vocabulary Lookup
  const handleWordClick = (wordText: string) => {
    if (!currentPassage) return;
    const clean = wordText.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'\n]/g, "").trim().toLowerCase();
    if (!clean) return;

    // Check in vocabularies list
    const found = currentPassage.vocabularies?.find((v) => v.word.toLowerCase() === clean);
    if (found) {
      setSelectedWord(found);
    } else {
      setSelectedWord({
        word: clean,
        meaning: `Từ trong văn cảnh bài đọc: "${wordText.trim()}"`,
      });
    }
  };

  const speakWord = (word: string) => {
    safeSpeakText(word, { lang: "en-US", rate: 1.0 });
    addToast({ type: "info", title: `🔊 Phát âm: "${word}"` });
  };

  // Format digital timer
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Score calculation for finish screen
  const quizScore = useMemo(() => {
    if (!currentPassage || !isSubmitted) return { correct: 0, total: 0, percent: 0 };
    let c = 0;
    currentPassage.questions.forEach((q) => {
      if (answers[q.id] === q.correct) c += 1;
    });
    return {
      correct: c,
      total: currentPassage.questions.length,
      percent: Math.round((c / currentPassage.questions.length) * 100),
    };
  }, [currentPassage, isSubmitted, answers]);

  if (rawIdFromUrl && !currentPassage) {
    return <ReadingStudioSkeleton />;
  }

  return (
    <div
      className={`w-full min-w-0 max-w-none font-sans relative ${
        selectedPassageId
          ? "h-full max-h-screen overflow-hidden p-0"
          : "min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col"
      }`}
    >
      {/* 1. TOP HEADER (AppTopHeader) */}
      {selectedPassageId ? (
        <AppTopHeader
          onBack={handleBackToListing}
          leftContent={
            currentPassage ? (
              <div className="flex items-center gap-2 truncate">
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-200/60 dark:border-emerald-800/40">
                  {getLevelLabel(currentPassage.level)}
                </span>
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate max-w-xs xl:max-w-md">
                  {currentPassage.title}
                </h2>
              </div>
            ) : null
          }
          rightDesktopContent={
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Digital Timer */}
              <div className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{formatTimer(elapsedSeconds)}</span>
              </div>

              {/* Font Size Zoomer */}
              <div className="hidden sm:flex items-center rounded-lg border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 p-0.5">
                <button
                  onClick={() => setFontSizeLevel("sm")}
                  className={`px-2 py-0.5 text-xs font-bold rounded ${
                    fontSizeLevel === "sm" ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : "text-slate-500"
                  }`}
                  title="Cỡ chữ nhỏ"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSizeLevel("base")}
                  className={`px-2 py-0.5 text-xs font-bold rounded ${
                    fontSizeLevel === "base" ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : "text-slate-500"
                  }`}
                  title="Cỡ chữ chuẩn"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSizeLevel("lg")}
                  className={`px-2 py-0.5 text-xs font-bold rounded ${
                    fontSizeLevel === "lg" ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : "text-slate-500"
                  }`}
                  title="Cỡ chữ lớn"
                >
                  A+
                </button>
              </div>

              {/* Toggle Full Translation */}
              <button
                onClick={() => setShowFullTranslation((prev) => !prev)}
                className={`h-8.5 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  showFullTranslation
                    ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-700 dark:text-emerald-300"
                    : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                }`}
              >
                {showFullTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{showFullTranslation ? "Ẩn dịch" : "Dịch toàn bài"}</span>
              </button>
            </div>
          }
        />
      ) : (
        <AppTopHeader
          rightDesktopContent={
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="relative w-44 xs:w-56 sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm bài đọc theo tên, chủ đề..."
                  value={listingSearch}
                  onChange={(e) => setListingSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 text-xs sm:text-sm font-medium rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 transition-all"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowLessonModal(true)}
                className="h-9 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Khám phá 100+ bài</span>
                <span className="sm:hidden">100+ bài</span>
              </button>
            </div>
          }
        >
          <HeaderPillContainer>
            <HeaderPillItem
              active
              icon={<BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
              label="Luyện đọc"
            />
            <HeaderPillItem
              href="/study/listening"
              icon={<Headphones className="w-3.5 h-3.5 text-indigo-500" />}
              label="Dictation"
            />
            <HeaderPillItem
              href="/study/shadowing"
              icon={<Mic className="w-3.5 h-3.5 text-sky-500" />}
              label="Shadowing"
            />
          </HeaderPillContainer>
        </AppTopHeader>
      )}

      {/* 2. EXPLORER LISTING MODE (WHEN NOT IN A PASSAGE) */}
      {!selectedPassageId && (
        <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-7 pb-20">
          {/* HÀNG 1: BÀI ĐỌC CƠ BẢN (A1 - A2) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
                  A1 - A2
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                  Bài đọc cơ bản <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">(Email, Thông báo & Đời sống)</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={handleShuffleBasic}
                className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Đổi bài ngẫu nhiên</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {displayedBasicPassages.map((passage) => {
                const isSelected = passage.id === selectedPassageId;
                const isCompleted = completedPassageIds.includes(passage.id);

                return (
                  <motion.div
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    key={passage.id}
                    onClick={() => handleSelectPassage(passage.id)}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-0 group ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                        : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md shadow-2xs"
                    }`}
                  >
                    <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                      {passage.coverImage ? (
                        <img
                          src={passage.coverImage}
                          alt={passage.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-teal-500/20 text-3xl">
                          {passage.icon}
                        </div>
                      )}

                      <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-xs z-20 shadow-2xs border border-white/10">
                        {getLevelLabel(passage.level)}
                      </span>

                      {isCompleted && (
                        <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-0.5 sm:gap-1 shadow-2xs">
                          <Check className="w-3 h-3 stroke-[3]" /> <span className="hidden xs:inline sm:inline">Đã đọc</span>
                        </span>
                      )}
                    </div>

                    <div className="py-0.5 sm:py-0 sm:mt-2.5 space-y-1.5 flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {passage.category && (
                          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block truncate mb-1 sm:hidden">
                            {passage.category}
                          </span>
                        )}
                        <h3
                          className={`text-[14.5px] xs:text-[15.5px] sm:text-[13px] font-bold sm:font-semibold font-sans line-clamp-2 leading-snug transition-colors ${
                            isSelected
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-slate-900 dark:text-white group-hover:text-emerald-600"
                          }`}
                        >
                          {passage.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                        <span className="flex items-center gap-1.5 font-bold font-mono tabular-nums text-xs xs:text-[13px] sm:text-[11px] text-slate-700 dark:text-slate-200">
                          <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5] shrink-0" />{" "}
                          {passage.duration || "4 min"}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs xs:text-[12.5px] sm:text-[11px] font-mono tabular-nums border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                          {passage.wordCount} từ · {passage.questions?.length || 3} câu
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* HÀNG 2: BÀI ĐỌC NÂNG CAO (B1 - C2) */}
          <div className="space-y-4 pt-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shadow-2xs">
                  B1 - C2
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                  Bài đọc nâng cao <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">(Kinh tế, Khoa học & Báo chí)</span>
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
              {displayedAdvancedPassages.map((passage) => {
                const isSelected = passage.id === selectedPassageId;
                const isCompleted = completedPassageIds.includes(passage.id);

                return (
                  <motion.div
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    key={passage.id}
                    onClick={() => handleSelectPassage(passage.id)}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-0 group ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-purple-500 ring-2 ring-purple-500/20 shadow-md"
                        : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-purple-500 hover:shadow-md shadow-2xs"
                    }`}
                  >
                    <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                      {passage.coverImage ? (
                        <img
                          src={passage.coverImage}
                          alt={passage.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-indigo-500/20 text-3xl">
                          {passage.icon}
                        </div>
                      )}

                      <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-xs z-20 shadow-2xs border border-white/10">
                        {getLevelLabel(passage.level)}
                      </span>

                      {isCompleted && (
                        <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-0.5 sm:gap-1 shadow-2xs">
                          <Check className="w-3 h-3 stroke-[3]" /> <span className="hidden xs:inline sm:inline">Đã đọc</span>
                        </span>
                      )}
                    </div>

                    <div className="py-0.5 sm:py-0 sm:mt-2.5 space-y-1.5 flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {passage.category && (
                          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 block truncate mb-1 sm:hidden">
                            {passage.category}
                          </span>
                        )}
                        <h3
                          className={`text-[14.5px] xs:text-[15.5px] sm:text-[13px] font-bold sm:font-semibold font-sans line-clamp-2 leading-snug transition-colors ${
                            isSelected
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-slate-900 dark:text-white group-hover:text-purple-600"
                          }`}
                        >
                          {passage.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                        <span className="flex items-center gap-1.5 font-bold font-mono tabular-nums text-xs xs:text-[13px] sm:text-[11px] text-slate-700 dark:text-slate-200">
                          <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400 stroke-[2.5] shrink-0" />{" "}
                          {passage.duration || "5 min"}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs xs:text-[12.5px] sm:text-[11px] font-mono tabular-nums border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                          {passage.wordCount} từ · {passage.questions?.length || 3} câu
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. FOCUS DUAL-PANE READING STUDIO WORKSPACE (`?id=...`) */}
      {selectedPassageId && currentPassage && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-50/50 dark:bg-slate-950">
          {/* LEFT PANE: PASSAGE TEXT & VOCABULARY HIGHLIGHTS (60% Desktop) */}
          <div className="flex-1 lg:flex-[6] h-full overflow-y-auto p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 space-y-5">
            {/* Passage Meta Ribbon */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl">{currentPassage.icon}</span>
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                    {currentPassage.title}
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>{currentPassage.category}</span>
                    <span>•</span>
                    <span className="font-mono">{currentPassage.wordCount} từ vựng</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Chạm vào từ bất kỳ để tra nghĩa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Passage Paragraphs Rendering */}
            <div
              className={`space-y-4 font-sans text-slate-800 dark:text-slate-200 leading-relaxed ${
                fontSizeLevel === "sm"
                  ? "text-xs sm:text-sm"
                  : fontSizeLevel === "lg"
                  ? "text-base sm:text-lg"
                  : "text-sm sm:text-base"
              }`}
            >
              {currentPassage.passage.split("\n\n").map((paragraph, pIdx) => (
                <div key={pIdx} className="space-y-1.5">
                  {paragraph.split("\n").map((line, lIdx) => (
                    <p key={lIdx} className="leading-relaxed">
                      {line.split(" ").map((word, wIdx) => {
                        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").toLowerCase();
                        const isKeyVocab = currentPassage.vocabularies?.some(
                          (v) => v.word.toLowerCase() === cleanWord
                        );

                        return (
                          <span
                            key={wIdx}
                            onClick={() => handleWordClick(word)}
                            className={`inline-block mr-1 rounded cursor-pointer transition-all hover:bg-emerald-100 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 ${
                              isKeyVocab
                                ? "border-b-2 border-emerald-400 dark:border-emerald-600 font-semibold text-emerald-800 dark:text-emerald-300 px-0.5"
                                : ""
                            }`}
                          >
                            {word}
                          </span>
                        );
                      })}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Full Vietnamese Translation Box (When toggled) */}
            <AnimatePresence>
              {showFullTranslation && currentPassage.translation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 sm:p-5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 space-y-2 font-sans"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-display">
                    <Eye className="w-4 h-4" /> Bản dịch nghĩa tiếng Việt toàn bài
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentPassage.translation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Key Vocabulary Shelf */}
            {currentPassage.vocabularies && currentPassage.vocabularies.length > 0 && (
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Từ vựng quan trọng trong bài ({currentPassage.vocabularies.length} từ)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentPassage.vocabularies.map((v, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedWord(v)}
                      className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 flex items-center justify-between gap-2 cursor-pointer transition-all shadow-2xs"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white capitalize">{v.word}</span>
                          {v.pos && <span className="text-[10px] text-slate-400 font-medium font-mono">({v.pos})</span>}
                          {v.ipa && <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">{v.ipa}</span>}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">{v.meaning}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWord(v.word);
                        }}
                        className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-emerald-600 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANE: INTERACTIVE QUESTIONS & SUBMISSION (40% Desktop) */}
          <div className="flex-1 lg:flex-[4] h-full overflow-y-auto p-4 sm:p-6 lg:p-7 bg-white dark:bg-slate-900 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Questions Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                    Bộ câu hỏi đọc hiểu ({currentPassage.questions.length} câu)
                  </h3>
                </div>

                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  {Object.keys(answers).length}/{currentPassage.questions.length} đã chọn
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-5">
                {currentPassage.questions.map((q, qIdx) => {
                  const selectedOption = answers[q.id];
                  const isCorrect = isSubmitted && selectedOption === q.correct;
                  const isWrong = isSubmitted && selectedOption !== undefined && selectedOption !== q.correct;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border transition-all space-y-3 ${
                        isCorrect
                          ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800"
                          : isWrong
                          ? "bg-rose-50/40 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800"
                          : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800"
                      }`}
                    >
                      {/* Question Text */}
                      <div className="flex items-start gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-mono font-bold text-xs shrink-0">
                          Câu {qIdx + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          {q.text}
                        </p>
                      </div>

                      {/* 4 Options */}
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isOptionChosen = selectedOption === optIdx;
                          const isThisCorrect = isSubmitted && optIdx === q.correct;
                          const isThisWrongChosen = isSubmitted && isOptionChosen && optIdx !== q.correct;

                          return (
                            <button
                              key={optIdx}
                              disabled={isSubmitted}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full p-2.5 rounded-lg border text-left text-xs sm:text-sm font-medium flex items-center justify-between gap-2 transition-all cursor-pointer ${
                                isThisCorrect
                                  ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs"
                                  : isThisWrongChosen
                                  ? "bg-rose-600 text-white border-rose-600 font-bold shadow-xs"
                                  : isOptionChosen
                                  ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold"
                                  : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-mono font-bold shrink-0 ${
                                    isThisCorrect || isThisWrongChosen
                                      ? "bg-white/20 text-white"
                                      : isOptionChosen
                                      ? "bg-emerald-600 text-white"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>

                              {isThisCorrect && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                              {isThisWrongChosen && <XCircle className="w-4 h-4 text-white shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box after submission */}
                      {isSubmitted && (
                        <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-display">
                            💡 Giải thích đáp án:
                          </span>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submission Action Bar */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Nộp bài & Chấm điểm tức thì</span>
                </button>
              ) : (
                <div className="space-y-3">
                  {/* Results Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                        {quizScore.percent}%
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          Đúng {quizScore.correct}/{quizScore.total} câu hỏi
                        </p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          +{quizScore.correct * 15 + 20} XP Đọc hiểu
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetQuiz}
                      className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Làm lại</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleBackToListing}
                    className="w-full h-10 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Xem danh sách bài đọc khác ➔</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. DICTIONARY POPUP MODAL (WHEN A WORD IS CLICKED) */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[88vw] max-w-[320px] p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-3 font-sans"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white capitalize truncate">
                    {selectedWord.word}
                  </h4>
                  {selectedWord.pos && <span className="text-xs text-slate-400 font-mono font-semibold">{selectedWord.pos}</span>}
                </div>
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedWord.ipa && (
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-200/70 dark:border-slate-700">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  {selectedWord.ipa}
                </span>
                <button
                  onClick={() => speakWord(selectedWord.word)}
                  className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3 h-3 fill-white" /> Phát âm
                </button>
              </div>
            )}

            <div className="p-3 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30">
              <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {selectedWord.meaning}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. EXPLORE ALL PASSAGES MODAL */}
      <AnimatePresence>
        {showLessonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden font-sans"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                      Kho Bài Đọc Hiểu (Reading Passages)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Tổng số: {READING_PASSAGES_DATA.length} bài đọc chuẩn TOEIC Part 7 & IELTS
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLessonModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable List */}
              <div className="p-4 overflow-y-auto max-h-[55vh] space-y-2">
                {READING_PASSAGES_DATA.map((passage) => {
                  const isSelected = passage.id === selectedPassageId;
                  return (
                    <div
                      key={passage.id}
                      onClick={() => {
                        handleSelectPassage(passage.id);
                        setShowLessonModal(false);
                        addToast({
                          type: "info",
                          title: `Đã mở bài đọc: ${passage.title}`,
                        });
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20"
                          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-emerald-400"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl shrink-0">
                          {passage.icon}
                        </div>
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {getLevelLabel(passage.level)}
                            </span>
                            <span className="text-xs font-mono text-slate-400">
                              {passage.wordCount} từ · {passage.duration || "4 min"}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold font-sans truncate text-slate-900 dark:text-white">
                            {passage.title}
                          </h4>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-2xs shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Đang chọn
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 px-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex justify-end">
                <button
                  onClick={() => setShowLessonModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReadingPage() {
  return (
    <Suspense fallback={<ReadingListingSkeleton />}>
      <ReadingStudioContent />
    </Suspense>
  );
}
