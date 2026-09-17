"use client";

import React, { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { StudySuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import {
  usePracticeSession,
  usePracticeKeyboard,
  PracticeSubModeBar,
  PracticeArenaHeader,
  PracticeQuizArena,
  PracticeFlashcardArena,
  PracticeWritingArena,
  PracticeSpeakingArena,
  PracticeArenaNavigation,
  PracticeWordLabSidebar,
  PracticeScoreCard,
} from "@/features/practice";
import PracticeLoading from "./loading";
import {
  BookOpen,
  Headphones,
  Mic,
  FileText,
  Target,
  Trophy,
  Clock,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

function PracticeContent() {
  const session = usePracticeSession();

  // Connect global and mode-specific keyboard shortcuts
  usePracticeKeyboard({
    subMode: session.subMode,
    currentIndex: session.currentIndex,
    qIsAnswered: session.qIsAnswered,
    quizOptions: session.quizOptions,
    handleSelectQuizOption: session.handleSelectQuizOption,
    setFIsFlipped: session.setFIsFlipped,
    handleFlashcardRating: session.handleFlashcardRating,
    sIsAnswered: session.speech.isAnswered,
    sIsListening: session.speech.isListening,
    handleStartSpeaking: session.handleStartSpeaking,
    handlePrevQuestion: session.handlePrevQuestion,
    handleNextQuestion: session.handleNextQuestion,
  });

  return (
    <div className="w-full h-full min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. MASTER TOP HEADER (FIXED 56PX) WITH GAMIFICATION STATS & PROFILE POPOVER */}
      <AppTopHeader
        showGamificationStats={true}
        rightDesktopContent={
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Progress Counter Badge */}
            <span className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 text-xs font-bold font-mono tabular-nums items-center gap-1.5 shadow-2xs">
              <Target className="w-3.5 h-3.5 text-[#0059bb]" />
              <span>
                Câu {Math.min(session.vocabs.length, session.currentIndex + 1)}/
                {session.vocabs.length}
              </span>
            </span>

            {/* Total XP Badge */}
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-xs font-bold font-mono tabular-nums flex items-center gap-1.5 shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>+{session.totalEarnedXp} XP</span>
            </span>

            {/* Timer Badge */}
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 text-xs font-bold font-mono tabular-nums flex items-center gap-1.5 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{session.formatElapsedTime(session.elapsedTime)}</span>
            </span>

            {session.isCompleted ? (
              <button
                type="button"
                onClick={session.handleRestartSession}
                className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Luyện lại</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => session.setIsCompleted(true)}
                className="h-9 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kết thúc</span>
              </button>
            )}
          </div>
        }
      >
        <StudySuiteNavTabs />
      </AppTopHeader>

      {/* 2. MAIN DASHBOARD-STYLE VIEWPORT CANVAS */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3.5 lg:py-3 flex flex-col min-h-0 lg:overflow-hidden space-y-2.5 sm:space-y-3 pb-24 lg:pb-3">
        {/* 2.1. SUB-MODE SEGMENTED TOOLBAR (QUIZ / FLASHCARD / WRITING / SPEAKING) */}
        <PracticeSubModeBar
          subMode={session.subMode}
          onSubModeChange={session.setSubMode}
          currentIndex={session.currentIndex}
          totalWords={session.vocabs.length}
        />

        {/* 2.2. MAIN BENTO GRID */}
        {!session.isCompleted ? (
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 items-stretch min-w-0">
            {/* CỘT TRÁI: PRACTICE ARENA (8/12) */}
            <div className="lg:col-span-8 flex flex-col min-w-0 lg:h-full lg:min-h-0">
              <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between min-w-0 flex-1 lg:h-full lg:min-h-0 space-y-3">
                {/* Arena Sub-Header */}
                <PracticeArenaHeader
                  subMode={session.subMode}
                  currentWord={session.currentWord}
                  questionTimeLeft={session.questionTimeLeft}
                  isCurrentBookmarked={session.isCurrentBookmarked}
                  onToggleBookmark={session.handleToggleBookmark}
                  onPlayAudio={session.playWordAudio}
                />

                {/* SUB-MODES ARENA CONTENT WITH FLUID ANIMATEPRESENCE CHOREOGRAPHY */}
                <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={session.subMode}
                      initial={{ opacity: 0, y: 4, scale: 0.998 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.998 }}
                      transition={{ duration: 0.09, ease: [0.2, 0, 0, 1] }}
                      className="flex-1 flex flex-col justify-between min-h-0"
                    >
                      {session.subMode === "quiz" && (
                        <PracticeQuizArena
                          currentWord={session.currentWord}
                          quizOptions={session.quizOptions}
                          qSelectedOpt={session.qSelectedOpt}
                          qIsAnswered={session.qIsAnswered}
                          questionTimeLeft={session.questionTimeLeft}
                          isCurrentBookmarked={session.isCurrentBookmarked}
                          onToggleBookmark={session.handleToggleBookmark}
                          onPlayAudio={session.playWordAudio}
                          onSelectOption={session.handleSelectQuizOption}
                        />
                      )}

                      {session.subMode === "flashcard" && (
                        <PracticeFlashcardArena
                          currentWord={session.currentWord}
                          fIsFlipped={session.fIsFlipped}
                          questionTimeLeft={session.questionTimeLeft}
                          isCurrentBookmarked={session.isCurrentBookmarked}
                          onToggleBookmark={session.handleToggleBookmark}
                          onPlayAudio={session.playWordAudio}
                          onFlipCard={() => {
                            session.setFIsFlipped((prev) => !prev);
                            session.playWordAudio(session.currentWord.word);
                          }}
                          onRateFlashcard={session.handleFlashcardRating}
                        />
                      )}

                      {session.subMode === "writing" && (
                        <PracticeWritingArena
                          currentWord={session.currentWord}
                          writingInputRef={session.writingInputRef}
                          wInput={session.wInput}
                          setWInput={session.setWInput}
                          wIsAnswered={session.wIsAnswered}
                          wIsCorrect={session.wIsCorrect}
                          wShowHint={session.wShowHint}
                          setWShowHint={session.setWShowHint}
                          questionTimeLeft={session.questionTimeLeft}
                          isCurrentBookmarked={session.isCurrentBookmarked}
                          onToggleBookmark={session.handleToggleBookmark}
                          onCheckWriting={session.handleCheckWriting}
                        />
                      )}

                      {session.subMode === "speaking" && (
                        <PracticeSpeakingArena
                          currentWord={session.currentWord}
                          isListening={session.speech.isListening}
                          transcript={session.speech.transcript}
                          accuracy={session.speech.accuracy}
                          isCorrect={session.speech.isCorrect}
                          isAnswered={session.speech.isAnswered}
                          speechError={session.speech.speechError}
                          questionTimeLeft={session.questionTimeLeft}
                          isCurrentBookmarked={session.isCurrentBookmarked}
                          onToggleBookmark={session.handleToggleBookmark}
                          onPlayAudio={session.playWordAudio}
                          onStartSpeaking={session.handleStartSpeaking}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* BOTTOM NAVIGATION ROW */}
                <PracticeArenaNavigation
                  currentIndex={session.currentIndex}
                  totalWords={session.vocabs.length}
                  subMode={session.subMode}
                  currentWord={session.currentWord}
                  qIsAnswered={session.qIsAnswered}
                  qIsCorrect={session.qIsCorrect}
                  wIsAnswered={session.wIsAnswered}
                  wIsCorrect={session.wIsCorrect}
                  sIsAnswered={session.speech.isAnswered}
                  sIsCorrect={session.speech.isCorrect}
                  sAccuracy={session.speech.accuracy}
                  onPrevQuestion={session.handlePrevQuestion}
                  onNextQuestion={session.handleNextQuestion}
                />
              </div>
            </div>

            {/* CỘT PHẢI: WORD LAB & CONTEXT INSIGHTS (4/12) */}
            <PracticeWordLabSidebar
              currentWord={session.currentWord}
              isCurrentBookmarked={session.isCurrentBookmarked}
              onToggleBookmark={session.handleToggleBookmark}
              onPlayAudio={session.playWordAudio}
            />
          </div>
        ) : (
          /* VIEW 2: IN-PLACE SCORECARD */
          <PracticeScoreCard
            totalWords={session.vocabs.length}
            totalEarnedXp={session.totalEarnedXp}
            elapsedTime={session.elapsedTime}
            formatElapsedTime={session.formatElapsedTime}
            correctCount={
              session.qCorrectCount + session.wCorrectCount + session.sCorrectCount
            }
            onRestartSession={session.handleRestartSession}
          />
        )}
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<PracticeLoading />}>
      <PracticeContent />
    </Suspense>
  );
}
