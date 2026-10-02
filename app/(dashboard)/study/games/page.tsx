"use client";

import React, { useState, useEffect } from "react";
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
  GameDeckSelector,
} from "@/features/games";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";

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

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<GameMode | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<VocabDeckType>("all");
  const [basePool, setBasePool] = useState<any[]>([]);
  const [activePool, setActivePool] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setActivePool(filtered.length >= 8 ? filtered : basePool);
    } else if (selectedDeck === "ielts") {
      const filtered = basePool.filter((w) => (w.difficulty || 1) >= 2);
      setActivePool(filtered.length >= 8 ? filtered : basePool);
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
      setActivePool(filtered.length >= 6 ? filtered : basePool);
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
      setActivePool(filtered.length >= 6 ? filtered : basePool);
    }
  }, [selectedDeck, basePool]);

  if (isLoading) {
    return (
      <div className="space-y-4 pb-20 md:pb-6 select-none animate-pulse">
        <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="w-48 h-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </header>
        <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
          <div className="h-36 sm:h-44 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-[270px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
            <div className="h-[270px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
            <div className="h-[270px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 md:pb-6 font-sans antialiased" suppressHydrationWarning>
      {/* 1. Standardized AppTopHeader with Game Switching Tabs & Gamification Badges */}
      <AppTopHeader
        onBack={activeGame ? () => setActiveGame(null) : undefined}
        showGamificationStats={true}
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={activeGame === null}
            onClick={() => setActiveGame(null)}
            layoutId="gamesModeFilterPill"
            icon={<Gamepad2 className="w-3.5 h-3.5 text-rose-500" />}
            label="Tất Cả Games"
          />
          <HeaderPillItem
            active={activeGame === "picture"}
            onClick={() => setActiveGame("picture")}
            layoutId="gamesModeFilterPill"
            icon={<ImageIcon className="w-3.5 h-3.5 text-rose-500" />}
            label="PictoWord (Ảnh)"
          />
          <HeaderPillItem
            active={activeGame === "audio"}
            onClick={() => setActiveGame("audio")}
            layoutId="gamesModeFilterPill"
            icon={<Headphones className="w-3.5 h-3.5 text-emerald-500" />}
            label="Audio Ear"
          />
          <HeaderPillItem
            active={activeGame === "scramble"}
            onClick={() => setActiveGame("scramble")}
            layoutId="gamesModeFilterPill"
            icon={<Shuffle className="w-3.5 h-3.5 text-[#0059bb]" />}
            label="Word Scramble"
          />
          <HeaderPillItem
            active={activeGame === "blitz"}
            onClick={() => setActiveGame("blitz")}
            layoutId="gamesModeFilterPill"
            icon={<Flame className="w-3.5 h-3.5 text-amber-500" />}
            label="Speed Blitz"
          />
          <HeaderPillItem
            active={activeGame === "memory"}
            onClick={() => setActiveGame("memory")}
            layoutId="gamesModeFilterPill"
            icon={<Layers className="w-3.5 h-3.5 text-emerald-500" />}
            label="Memory Match"
          />
          <HeaderPillItem
            active={activeGame === "wordle"}
            onClick={() => setActiveGame("wordle")}
            layoutId="gamesModeFilterPill"
            icon={<SpellCheck className="w-3.5 h-3.5 text-purple-500" />}
            label="Wordle"
          />
          <HeaderPillItem
            active={activeGame === "sentence"}
            onClick={() => setActiveGame("sentence")}
            layoutId="gamesModeFilterPill"
            icon={<BookOpen className="w-3.5 h-3.5 text-indigo-500" />}
            label="Sentence Builder"
          />
        </HeaderPillContainer>
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

              {/* Dynamic Vocabulary Deck Selector Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                  <GameDeckSelector
                    currentDeck={selectedDeck}
                    onSelectDeck={setSelectedDeck}
                    poolCount={activePool.length}
                  />
                  <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Kho nạp: <strong className="text-slate-800 dark:text-slate-100 font-extrabold">{activePool.length}</strong> từ vựng sẵn sàng
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-slate-700/60">
                    🎯 7 Chế độ Luyện Não
                  </span>
                </div>
              </div>

              {/* Game Cards Bento Grid with Categories */}
              <GameCatalogGrid onSelectGame={(mode) => setActiveGame(mode)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
