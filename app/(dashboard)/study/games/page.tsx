"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Gamepad2,
  Shuffle,
  Layers,
  SpellCheck,
  Flame,
  BookOpen,
  Image as ImageIcon,
  Headphones,
  Home,
  Swords,
  Trophy,
} from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  GameMode,
  VocabDeckType,
  GameHeroBanner,
  GameCatalogGrid,
  WordScrambleGame,
  MemoryMatchGame,
  WordleEnglishGame,
  SpeedBlitzGame,
  SentenceBuilderGame,
  PictureWordGame,
  AudioEarGame,
} from "@/features/games";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";

const pageTransitionVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 },
  },
} as const;

const GAME_TITLE_MAP: Record<GameMode, { title: string; icon: React.ReactNode }> = {
  picture: { title: "PictoWord", icon: <ImageIcon className="w-3.5 h-3.5 text-cyan-500" /> },
  audio: { title: "Audio Ear", icon: <Headphones className="w-3.5 h-3.5 text-emerald-500" /> },
  scramble: { title: "Word Scramble", icon: <Shuffle className="w-3.5 h-3.5 text-[#0059bb]" /> },
  blitz: { title: "Speed Blitz", icon: <Flame className="w-3.5 h-3.5 text-amber-500" /> },
  memory: { title: "Memory Match", icon: <Layers className="w-3.5 h-3.5 text-emerald-500" /> },
  wordle: { title: "Wordle", icon: <SpellCheck className="w-3.5 h-3.5 text-purple-500" /> },
  sentence: { title: "Sentence Builder", icon: <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> },
};

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<GameMode | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<VocabDeckType>("all");
  const [basePool, setBasePool] = useState<any[]>([]);
  const [activePool, setActivePool] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useNotificationStore();

  // Track study time when playing mini-games
  useStudyTimeTracker("vocab", { activeCondition: activeGame !== null });

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/vocabulary?limit=150&random=true")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setBasePool(res.data);
          setActivePool(res.data);
        }
      })
      .catch((err) => console.warn("Could not load dynamic vocabulary pool:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Update active pool whenever selected deck or base pool changes
  useEffect(() => {
    if (basePool.length === 0) return;

    if (selectedDeck === "all") {
      setActivePool(basePool);
    } else if (selectedDeck === "toeic") {
      const filtered = basePool.filter((w) => (w.difficulty || 1) <= 2);
      if (filtered.length >= 8) {
        setActivePool(filtered);
      } else {
        setActivePool(basePool);
        addToast({ type: "info", title: "Kho từ", message: "Bộ TOEIC chưa đủ từ, đang dùng kho tổng hợp." });
      }
    } else if (selectedDeck === "ielts") {
      const filtered = basePool.filter((w) => (w.difficulty || 1) >= 2);
      if (filtered.length >= 8) {
        setActivePool(filtered);
      } else {
        setActivePool(basePool);
        addToast({ type: "info", title: "Kho từ", message: "Bộ IELTS chưa đủ từ, đang dùng kho tổng hợp." });
      }
    } else if (selectedDeck === "bookmarks") {
      const learned = useVocabularyStore.getState().learned;
      const favSet = new Set(
        learned
          .filter((l) => l.isFavorite)
          .map((l) => l.vocabId || l.word?.toLowerCase())
      );
      const filtered = basePool.filter(
        (w) => favSet.has(w.id) || favSet.has(w.word?.toLowerCase())
      );
      if (filtered.length >= 6) {
        setActivePool(filtered);
      } else {
        setActivePool(basePool);
        addToast({ type: "info", title: "Sổ tay", message: `Sổ tay yêu thích chỉ có ${filtered.length} từ. Hãy gắn sao thêm từ vựng, hiện đang dùng kho tổng hợp.` });
      }
    } else if (selectedDeck === "weak") {
      const learned = useVocabularyStore.getState().learned;
      const weakSet = new Set(
        learned
          .filter((l) => (l.proficiency || 0) <= 2 || ((l as any).masteryLevel || 0) <= 2)
          .map((l) => l.vocabId || l.word?.toLowerCase())
      );
      const filtered = basePool.filter(
        (w) => weakSet.has(w.id) || weakSet.has(w.word?.toLowerCase())
      );
      if (filtered.length >= 6) {
        setActivePool(filtered);
      } else {
        setActivePool(basePool);
        addToast({ type: "info", title: "Ôn tập", message: `Chỉ có ${filtered.length} từ hay quên. Hãy ôn tập thêm, hiện đang dùng kho tổng hợp.` });
      }
    }
  }, [selectedDeck, basePool, addToast]);


  if (isLoading) return null; // Skeleton handled by loading.tsx Suspense boundary


  return (
    <PageEntranceWrapper className="space-y-4 pb-28 sm:pb-36 font-sans antialiased" suppressHydrationWarning>
      {/* 1. Universal Top Navigation & Action Header (Dashboard Standard - Max 4 Tabs) */}
      <AppTopHeader
        onBack={activeGame ? () => setActiveGame(null) : undefined}
        showGamificationStats={true}
        rightDesktopContent={
          activeGame ? (
            <button
              type="button"
              onClick={() => setActiveGame(null)}
              className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer font-display"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#0059bb]" />
              <span>Đổi trò chơi</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/study/pvp"
                className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 font-display"
              >
                <Swords className="w-3.5 h-3.5 text-sky-200" />
                <span>Đấu Trường 1v1</span>
              </Link>
            </div>
          )
        }
      >
        {activeGame === null ? (
          <HeaderPillContainer>
            <HeaderPillItem
              href="/dashboard"
              icon={<Home className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
              label="Trang chủ"
            />
            <HeaderPillItem
              active
              layoutId="gamesHeaderActiveTab"
              icon={<Gamepad2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
              label="Mini Games"
            />
            <HeaderPillItem
              href="/study/pvp"
              icon={<Swords className="w-3.5 h-3.5 text-rose-500" />}
              label="Đấu trường 1v1"
              hideOnSmall
            />
            <HeaderPillItem
              href="/community/leaderboard"
              icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
              label="Xếp hạng"
              hideOnSmall
            />
          </HeaderPillContainer>
        ) : (
          <HeaderPillContainer>
            <HeaderPillItem
              onClick={() => setActiveGame(null)}
              icon={<Gamepad2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
              label="Mini Games"
            />
            <div className="text-slate-300 dark:text-slate-600 font-bold text-xs px-1 select-none">
              /
            </div>
            <HeaderPillItem
              active
              icon={GAME_TITLE_MAP[activeGame].icon}
              label={GAME_TITLE_MAP[activeGame].title}
            />
          </HeaderPillContainer>
        )}
      </AppTopHeader>

      {/* 2. Fluid Ultra-Wide Main Container */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 sm:space-y-6 pt-1">
        <AnimatePresence mode="wait">
          {activeGame === "picture" && (
            <motion.div
              key="picture-panel"
              variants={pageTransitionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-xl mx-auto"
            >
              <PictureWordGame onBack={() => setActiveGame(null)} />
            </motion.div>
          )}

          {activeGame === "audio" && (
            <motion.div
              key="audio-panel"
              variants={pageTransitionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-2xl mx-auto"
            >
              <AudioEarGame pool={activePool} onBack={() => setActiveGame(null)} />
            </motion.div>
          )}

          {activeGame === "scramble" && (
            <motion.div
              key="scramble-panel"
              variants={pageTransitionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-2xl mx-auto"
            >
              <WordScrambleGame pool={activePool} onBack={() => setActiveGame(null)} />
            </motion.div>
          )}

          {activeGame === "blitz" && (
            <motion.div
              key="blitz-panel"
              variants={pageTransitionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-xl mx-auto"
            >
              <SpeedBlitzGame pool={activePool} onBack={() => setActiveGame(null)} />
            </motion.div>
          )}

          {activeGame === "memory" && (
            <motion.div
              key="memory-panel"
              variants={pageTransitionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-2xl mx-auto"
            >
              <MemoryMatchGame pool={activePool} onBack={() => setActiveGame(null)} />
            </motion.div>
          )}

          {activeGame === "wordle" && (
            <motion.div
              key="wordle-panel"
              variants={pageTransitionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-lg mx-auto"
            >
              <WordleEnglishGame pool={activePool} onBack={() => setActiveGame(null)} />
            </motion.div>
          )}

          {activeGame === "sentence" && (
            <motion.div
              key="sentence-panel"
              variants={pageTransitionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-2xl mx-auto"
            >
              <SentenceBuilderGame pool={activePool} onBack={() => setActiveGame(null)} />
            </motion.div>
          )}

          {activeGame === null && (
            <motion.div
              key="menu-panel"
              variants={pageTransitionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="space-y-4 sm:space-y-6"
            >
              {/* Hero Spotlight Stage */}
              <GameHeroBanner />

              {/* Game Cards Bento Grid with Integrated Studio Toolbar */}
              <GameCatalogGrid
                onSelectGame={(mode) => setActiveGame(mode)}
                selectedDeck={selectedDeck}
                onSelectDeck={setSelectedDeck}
                activePoolCount={activePool.length}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageEntranceWrapper>
  );
}
