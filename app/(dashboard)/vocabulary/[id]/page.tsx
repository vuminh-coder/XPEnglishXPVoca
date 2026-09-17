"use client";

import React, { use, useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Layers, List, Zap, Bot } from "lucide-react";

import { BASIC_VOCABULARY_THEMES, BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARY_THEMES, ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useUiStore } from "@/stores/uiStore";
import { safeSpeakText } from "@/shared/utils/mobileAudio";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

// Modular Feature Components & Hooks
import {
  ThemeDetailHeaderBanner,
  FlashcardStudioPane,
  VocabularyListPane,
  QuizArenaPane,
  AiCoachPane,
  useVocabularyFlashcard,
  useVocabularyQuiz,
  useVocabularyAiCoach,
} from "@/features/vocabulary";

export default function ThemeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  // Instant local dataset fallback for 0ms instant render
  const localInitialVocabs = useMemo(() => {
    const basicList = BASIC_VOCABULARIES.filter((v) => v.themeId === id);
    if (basicList.length > 0) return basicList;
    return ADVANCED_VOCABULARIES.filter((v) => v.themeId === id);
  }, [id]);

  const [vocabs, setVocabs] = useState<any[]>(localInitialVocabs);
  const [toast, setToast] = useState<{ title: string; body: string } | null>(null);
  const [viewMode, setViewMode] = useState<"flashcard" | "list" | "quiz" | "ai">("flashcard");

  const { toggleFavorite, learned, practiceWord } = useVocabularyStore();
  const { awardXp } = useAuthStore();
  const { setSidebarCollapsed } = useUiStore();

  // Theme metadata from basic or advanced data files
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

  // Fetch vocabs from API with fallback
  useEffect(() => {
    let isMounted = true;
    fetch(`/api/vocabulary?themeId=${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setVocabs(res.data);
        }
      })
      .catch((err) => console.error("Error fetching vocabs:", err));
    return () => {
      isMounted = false;
    };
  }, [id]);

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

  const showToastMsg = useCallback((title: string, body: string) => {
    setToast({ title, body });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const speak = useCallback((word: string, rate = 0.9, lang = "en-US") => {
    safeSpeakText(word, { rate, lang });
  }, []);

  // Hook 1: 3D Flashcard State & Logic
  const {
    currentIndex,
    setCurrentIndex,
    isFlipped,
    setIsFlipped,
    isWordMasked,
    setIsWordMasked,
    activeVocab,
    handleNext: handleNextCard,
    handlePrev: handlePrevCard,
    handleShuffle: handleShuffleCards,
  } = useVocabularyFlashcard({
    vocabs,
    setVocabs,
    viewMode,
    onSpeak: speak,
    showToastMsg,
  });

  // Hook 2: Quiz Arena State & Logic
  const {
    quizIndex,
    quizScore,
    selectedAnswer,
    isQuizSubmitted,
    quizFinished,
    currentQuizItem,
    quizOptions,
    handleAnswerQuiz,
    handlePrevQuizQuestion,
    handleNextQuizQuestion,
    handleResetQuiz,
  } = useVocabularyQuiz({
    vocabs,
    practiceWord,
    awardXp,
    showToastMsg,
  });

  // Hook 3: AI Tutor State & Logic
  const {
    aiQuestion,
    setAiQuestion,
    aiResponse,
    isAiLoading,
    handleAiAsk,
  } = useVocabularyAiCoach({
    themeName: theme.name,
    themeNameEn: theme.nameEn,
    awardXp,
    showToastMsg,
  });

  // Real-time backend practice time tracker for Vocabulary
  useStudyTimeTracker("vocab", {
    activeCondition: !!activeVocab,
  });

  const activeTimeRef = useRef(0);
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

  const activeState = useMemo(
    () => (activeVocab ? learned.find((l) => l.vocabId === activeVocab.id) : null),
    [activeVocab, learned]
  );
  const isCurrentFav = activeState?.isFavorite || false;

  // List Mode Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "unlearned" | "learned" | "favorite">("all");

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
          handleShuffleCards();
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
      setIsFlipped,
      setCurrentIndex,
      setIsWordMasked,
      handleShuffleCards,
      speak,
      showToastMsg,
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
        onBack={() => router.push("/vocabulary")}
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
            active={viewMode === "flashcard"}
            onClick={() => setViewMode("flashcard")}
            icon={<Layers className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Flashcard"
            layoutId="vocabDetailViewModePill"
          />
          <HeaderPillItem
            active={viewMode === "list"}
            onClick={() => setViewMode("list")}
            icon={<List className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
            label="Danh Sách"
            layoutId="vocabDetailViewModePill"
          />
          <HeaderPillItem
            active={viewMode === "quiz"}
            onClick={() => setViewMode("quiz")}
            icon={<Zap className="w-3.5 h-3.5 text-amber-500" />}
            label="Kiểm Tra"
            layoutId="vocabDetailViewModePill"
          />
          <HeaderPillItem
            active={viewMode === "ai"}
            onClick={() => setViewMode("ai")}
            icon={<Bot className="w-3.5 h-3.5 text-purple-500" />}
            label="AI Coach"
            layoutId="vocabDetailViewModePill"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* 1. COMPACT HERO STUDIO BANNER & 4 INLINE METRIC PILLS */}
        <ThemeDetailHeaderBanner
          theme={theme}
          totalVocabs={vocabs.length}
          learnedCount={learnedCount}
          favoriteCount={favoriteCount}
          progressPercent={progressPercent}
        />

        {/* 2. MODE CONTENT PANELS */}
        {/* MODE 1: FLASHCARD 3D */}
        {viewMode === "flashcard" && activeVocab && (
          <FlashcardStudioPane
            activeVocab={activeVocab}
            currentIndex={currentIndex}
            totalVocabs={vocabs.length}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
            isWordMasked={isWordMasked}
            setIsWordMasked={setIsWordMasked}
            isFavorite={isCurrentFav}
            onToggleFavorite={(vocabId) => {
              toggleFavorite(vocabId);
              showToastMsg(
                "Yêu thích",
                !isCurrentFav
                  ? "Đã thêm từ vào mục yêu thích"
                  : "Đã bỏ từ khỏi mục yêu thích"
              );
            }}
            onSpeak={speak}
            onMarkLearned={(vocabId) => {
              practiceWord(vocabId, true);
              awardXp(15);
              showToastMsg("Đã thuộc từ!", "+15 XP đã được cộng.");
            }}
            onPrev={handlePrevCard}
            onNext={handleNextCard}
            onShuffle={handleShuffleCards}
          />
        )}

        {/* MODE 2: RICH LIST VIEW WITH SEARCH & FILTER */}
        {viewMode === "list" && (
          <VocabularyListPane
            vocabs={vocabs}
            filteredVocabs={filteredVocabs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            unlearnedCount={unlearnedCount}
            learnedCount={learnedCount}
            favoriteCount={favoriteCount}
            learnedState={learned}
            onSpeak={speak}
            onToggleFavorite={(vocabId) => {
              const state = learned.find((l) => l.vocabId === vocabId);
              const isFav = state?.isFavorite || false;
              toggleFavorite(vocabId);
              showToastMsg(
                "Yêu thích",
                !isFav ? "Đã thêm vào yêu thích" : "Đã xóa khỏi yêu thích"
              );
            }}
            onPractice={(vocabId) => {
              practiceWord(vocabId, true);
              awardXp(15);
              const v = vocabs.find((x) => x.id === vocabId);
              showToastMsg("Ôn tập thành công!", "+15 XP cho từ " + (v?.word || ""));
            }}
          />
        )}

        {/* MODE 3: QUICK QUIZ MODE */}
        {viewMode === "quiz" && (
          <QuizArenaPane
            quizFinished={quizFinished}
            currentQuizItem={currentQuizItem}
            quizIndex={quizIndex}
            totalQuestions={vocabs.length}
            quizScore={quizScore}
            quizOptions={quizOptions}
            selectedAnswer={selectedAnswer}
            isQuizSubmitted={isQuizSubmitted}
            onAnswerQuiz={handleAnswerQuiz}
            onPrevQuestion={handlePrevQuizQuestion}
            onNextQuestion={handleNextQuizQuestion}
            onResetQuiz={handleResetQuiz}
            onSpeak={speak}
          />
        )}

        {/* MODE 4: AI COACH MODE */}
        {viewMode === "ai" && (
          <AiCoachPane
            themeName={theme.name}
            aiQuestion={aiQuestion}
            setAiQuestion={setAiQuestion}
            aiResponse={aiResponse}
            isAiLoading={isAiLoading}
            onAiAsk={handleAiAsk}
          />
        )}
      </div>
    </div>
  );
}