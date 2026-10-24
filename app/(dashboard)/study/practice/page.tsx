"use client";

import React, { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import {
  usePracticeSession,
  usePracticeKeyboard,
  PracticeSubModeBar,
  PracticeQuizArena,
  PracticeFlashcardArena,
  PracticeWritingArena,
  PracticeSpeakingArena,
  PracticeMatchPairsArena,
  PracticeSentenceBuilderArena,
  PracticeScoreCard,
  PracticeCompanionSpeech,
  PracticeWordLabDrawer,
  PracticeBottomBar,
} from "@/features/practice";
import { gameAudio } from "@/features/games/utils/gameAudio";
import PracticeLoading from "./loading";

const DEDICATED_PRACTICE_ROUTES: Record<string, string> = {
  match_pairs: "/study/word-link",
  sentence_builder: "/study/sentence-builder",
};

function PracticeContent() {
  const session = usePracticeSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isWordLabOpen, setIsWordLabOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(gameAudio.isMuted());
  }, []);

  const toggleAudio = () => {
    setIsMuted(gameAudio.toggleMute());
  };

  // Nối từ & Ghép câu là trang riêng: điều hướng thay vì render inline
  const goDedicatedPage = useCallback(
    (mode: string) => {
      const base = DEDICATED_PRACTICE_ROUTES[mode];
      if (!base) return false;
      const theme = searchParams.get("themeId") || searchParams.get("theme");
      const unit = searchParams.get("unit");
      const qs = new URLSearchParams();
      if (theme) qs.set("theme", theme);
      if (unit) qs.set("unit", unit);
      const query = qs.toString();
      router.push(query ? `${base}?${query}` : base);
      return true;
    },
    [router, searchParams]
  );

  const handleSubModeChange = (mode: typeof session.subMode) => {
    if (goDedicatedPage(mode)) return;
    session.setSubMode(mode);
  };

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam && DEDICATED_PRACTICE_ROUTES[modeParam]) {
      goDedicatedPage(modeParam);
    }
  }, [searchParams, goDedicatedPage]);

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

  const progressPct = useMemo(() => {
    if (!session.vocabs.length) return 0;
    return ((session.currentIndex + 1) / session.vocabs.length) * 100;
  }, [session.currentIndex, session.vocabs.length]);

  // Bottom action states
  const { isAnswered, isCorrect, canSubmit, correctAnswerText } = useMemo(() => {
    if (!session.currentWord) {
      return { isAnswered: false, isCorrect: false, canSubmit: false, correctAnswerText: "" };
    }

    if (session.subMode === "quiz") {
      return {
        isAnswered: session.qIsAnswered,
        isCorrect: session.qIsCorrect,
        canSubmit: session.qSelectedOpt !== null,
        correctAnswerText: session.currentWord.meaning,
      };
    }

    if (session.subMode === "writing") {
      return {
        isAnswered: session.wIsAnswered,
        isCorrect: session.wIsCorrect,
        canSubmit: session.wInput.trim().length > 0,
        correctAnswerText: session.currentWord.word,
      };
    }

    if (session.subMode === "speaking") {
      return {
        isAnswered: session.speech.isAnswered,
        isCorrect: session.speech.isCorrect,
        canSubmit: session.speech.isAnswered,
        correctAnswerText: session.currentWord.word,
      };
    }

    return {
      isAnswered: false,
      isCorrect: false,
      canSubmit: false,
      correctAnswerText: session.currentWord.meaning,
    };
  }, [
    session.subMode,
    session.currentWord,
    session.qIsAnswered,
    session.qIsCorrect,
    session.qSelectedOpt,
    session.wIsAnswered,
    session.wIsCorrect,
    session.wInput,
    session.speech.isAnswered,
    session.speech.isCorrect,
  ]);

  const handleSubmit = () => {
    if (session.subMode === "writing") {
      session.handleCheckWriting();
    }
  };

  return (
    <div className="w-full min-h-dvh h-dvh flex flex-col justify-between bg-[#fffefb] dark:bg-slate-950 font-sans select-none overflow-hidden">
      {/* Centered Single-Column Studio Arena Container */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-between py-2 sm:py-3.5 min-h-0">
        {/* 1. TOP STUDIO BAR (Matching SentenceBuilder & WordLink) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 py-1">
          {/* Exit Button [X] */}
          <button
            type="button"
            onClick={() => router.push("/roadmap")}
            title="Thoát về Lộ trình"
            aria-label="Thoát về Lộ trình"
            className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors active:scale-90"
          >
            <X className="w-6 h-6 stroke-[2.6]" />
          </button>

          {/* Emerald Duolingo Progress Bar */}
          <div className="relative flex-1 h-3.5 sm:h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300 relative shadow-xs"
              style={{ width: `${Math.max(progressPct, 4)}%` }}
            >
              <div className="absolute inset-x-2 top-[3px] h-[3px] rounded-full bg-white/40" />
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleAudio}
              title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
              aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
              className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors active:scale-90"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-300" />
              )}
            </button>

            {/* Word Lab Sổ Tay Drawer Button */}
            {session.currentWord && !session.isCompleted && (
              <button
                type="button"
                onClick={() => setIsWordLabOpen(true)}
                title="Mở sổ tay từ vựng & ví dụ"
                aria-label="Mở sổ tay từ vựng"
                className="h-7 sm:h-8 px-2 sm:px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-[#0059bb] hover:text-[#0059bb] text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                <span className="hidden xs:inline">Sổ tay</span>
              </button>
            )}

            {/* Question Counter Badge */}
            <div className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-extrabold font-display text-xs sm:text-sm tabular-nums shadow-2xs">
              <span className="text-[#0059bb] dark:text-sky-400">
                {Math.min(session.vocabs.length, session.currentIndex + 1)}
              </span>
              <span className="text-slate-300 dark:text-slate-600 font-light">/</span>
              <span>{session.vocabs.length}</span>
            </div>

            {/* Reset / Restart Session */}
            <button
              type="button"
              onClick={session.handleRestartSession}
              title="Luyện lại từ đầu"
              aria-label="Luyện lại từ đầu"
              className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors active:scale-90"
            >
              <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-500 dark:text-slate-300 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* 2. SUB-MODE SELECTOR TABS */}
        {!session.isCompleted && (
          <PracticeSubModeBar
            subMode={session.subMode}
            onSubModeChange={handleSubModeChange}
            currentIndex={session.currentIndex}
            totalWords={session.vocabs.length}
          />
        )}

        {/* 3. MAIN ARENA VIEWPORT */}
        {!session.isCompleted && session.currentWord ? (
          <div className="flex-1 flex flex-col justify-between min-h-0 gap-2 sm:gap-3 py-1">
            {/* 3.1 3D COMPANION MASCOT & SPEECH BUBBLE */}
            <PracticeCompanionSpeech
              currentWord={session.currentWord}
              subMode={session.subMode}
              characterIdx={session.currentIndex % 7}
              isAnswered={isAnswered}
              isCorrect={isCorrect}
              onPlayAudio={session.playWordAudio}
            />

            {/* 3.2 SUB-MODES INTERACTIVE STAGE WITH FLUID CHOREOGRAPHY */}
            <div className="flex-1 flex flex-col justify-center min-h-0 relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${session.subMode}-${session.currentIndex}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 flex flex-col justify-center min-h-0"
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

                  {session.subMode === "match_pairs" && (
                    <PracticeMatchPairsArena
                      vocabs={session.vocabs}
                      playWordAudio={session.playWordAudio}
                      onNextStage={session.handleNextQuestion}
                    />
                  )}

                  {session.subMode === "sentence_builder" && session.currentWord && (
                    <PracticeSentenceBuilderArena
                      currentWord={session.currentWord}
                      vocabs={session.vocabs}
                      playWordAudio={session.playWordAudio}
                      onNextQuestion={session.handleNextQuestion}
                      currentIndex={session.currentIndex}
                      totalWords={session.vocabs.length}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3.3 DUOLINGO-STYLE STICKY BOTTOM ACTION SHEET */}
            {session.subMode !== "match_pairs" &&
              session.subMode !== "sentence_builder" &&
              session.subMode !== "flashcard" && (
                <PracticeBottomBar
                  canSubmit={canSubmit}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  correctAnswerText={correctAnswerText}
                  targetWord={session.currentWord.word}
                  subMode={session.subMode}
                  onSubmit={handleSubmit}
                  onNext={session.handleNextQuestion}
                  onSkip={session.handleNextQuestion}
                  onOpenDetails={() => setIsWordLabOpen(true)}
                  onPlayAudio={() => session.playWordAudio(session.currentWord.word)}
                />
              )}
          </div>
        ) : (
          /* 4. STUDIO SCORECARD SUMMARY */
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

      {/* 5. SLIDE-OVER WORD LAB DRAWER */}
      {session.currentWord && (
        <PracticeWordLabDrawer
          isOpen={isWordLabOpen}
          onClose={() => setIsWordLabOpen(false)}
          currentWord={session.currentWord}
          isCurrentBookmarked={session.isCurrentBookmarked}
          onToggleBookmark={session.handleToggleBookmark}
          onPlayAudio={session.playWordAudio}
        />
      )}
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
