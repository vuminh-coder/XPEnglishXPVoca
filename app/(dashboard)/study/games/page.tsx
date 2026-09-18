"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, Shuffle, Layers, SpellCheck } from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  GameMode,
  GameHeroBanner,
  GameCatalogGrid,
  WordScrambleGame,
  MemoryMatchGame,
  WordleEnglishGame,
} from "@/features/games";

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
  const [pool, setPool] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/vocabulary?limit=100&random=true")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setPool(res.data);
        }
      })
      .catch((err) => console.warn("Could not load dynamic vocabulary pool:", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 pb-20 md:pb-6 select-none animate-pulse">
        <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="w-48 h-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </header>
        <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
          <div className="h-36 sm:h-44 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-[260px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
            <div className="h-[260px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
            <div className="h-[260px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
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
            active={activeGame === "scramble"}
            onClick={() => setActiveGame("scramble")}
            layoutId="gamesModeFilterPill"
            icon={<Shuffle className="w-3.5 h-3.5 text-[#0059bb]" />}
            label="Word Scramble"
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
            icon={<SpellCheck className="w-3.5 h-3.5 text-amber-500" />}
            label="Wordle"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. Fluid Ultra-Wide Main Container */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 sm:space-y-6 pt-1">
        <AnimatePresence mode="wait">
          {activeGame === "scramble" && (
            <motion.div
              key="scramble-panel"
              variants={pageTransitionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-2xl mx-auto"
            >
              <WordScrambleGame pool={pool} onBack={() => setActiveGame(null)} />
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
              <MemoryMatchGame pool={pool} onBack={() => setActiveGame(null)} />
            </motion.div>
          )}

          {activeGame === "wordle" && (
            <motion.div
              key="wordle-panel"
              variants={pageTransitionVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-2xl mx-auto"
            >
              <WordleEnglishGame pool={pool} onBack={() => setActiveGame(null)} />
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

              {/* Game Cards Bento Grid */}
              <GameCatalogGrid onSelectGame={(mode) => setActiveGame(mode)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
